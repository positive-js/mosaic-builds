import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Directive, ElementRef, forwardRef, Host, Inject, InjectionToken, Input, NgZone, Optional, ViewContainerRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOWN_ARROW, ENTER, ESCAPE, TAB, UP_ARROW } from '@ptsecurity/cdk/keycodes';
import { countGroupLabelsBeforeOption, getOptionScrollPosition, McOptionSelectionChange } from '@ptsecurity/mosaic/core';
import { McFormField } from '@ptsecurity/mosaic/form-field';
import { Subscription, defer, fromEvent, merge, of as observableOf, Subject } from 'rxjs';
import { filter, take, switchMap, delay, tap, map } from 'rxjs/operators';
import { McAutocompleteOrigin } from './autocomplete-origin.directive';
import { McAutocomplete } from './autocomplete.component';
/**
 * The following style constants are necessary to save here in order
 * to properly calculate the scrollTop of the panel. Because we are not
 * actually focusing the active item, scroll must be handled manually.
 */
/** The height of each autocomplete option. */
export const AUTOCOMPLETE_OPTION_HEIGHT = 32;
/** The total height of the autocomplete panel. */
export const AUTOCOMPLETE_PANEL_HEIGHT = 256;
export const AUTOCOMPLETE_BORDER_WIDTH = 2;
/** Injection token that determines the scroll handling while the autocomplete panel is open. */
export const MC_AUTOCOMPLETE_SCROLL_STRATEGY = new InjectionToken('mc-autocomplete-scroll-strategy');
// tslint:disable-next-line naming-convention
export function MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY(overlay) {
    return () => overlay.scrollStrategies.reposition();
}
export const MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_AUTOCOMPLETE_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY
};
/**
 * Provider that allows the autocomplete to register as a ControlValueAccessor.
 * @docs-private
 */
export const MAT_AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => McAutocompleteTrigger),
    multi: true
};
/**
 * Creates an error to be thrown when attempting to use an autocomplete trigger without a panel.
 * @docs-private
 */
export function getMcAutocompleteMissingPanelError() {
    return Error('Attempting to open an undefined instance of `mc-autocomplete`. ' +
        'Make sure that the id passed to the `mcAutocomplete` is correct and that ' +
        'you\'re attempting to open it after the ngAfterContentInit hook.');
}
export class McAutocompleteTrigger {
    constructor(elementRef, viewContainerRef, changeDetectorRef, overlay, zone, scrollStrategy, dir, formField, document, 
    // @breaking-change 8.0.0 Make `_viewportRuler` required.
    viewportRuler) {
        this.elementRef = elementRef;
        this.viewContainerRef = viewContainerRef;
        this.changeDetectorRef = changeDetectorRef;
        this.overlay = overlay;
        this.zone = zone;
        this.dir = dir;
        this.formField = formField;
        this.document = document;
        this.viewportRuler = viewportRuler;
        // @ts-ignore
        this.optionSelections = defer(() => {
            if (this.autocomplete && this.autocomplete.options) {
                return merge(...this.autocomplete.options.map((option) => option.onSelectionChange));
            }
            // If there are any subscribers before `ngAfterViewInit`, the `autocomplete` will be undefined.
            // Return a stream that we'll replace with the real one once everything is in place.
            return this.zone.onStable
                .asObservable()
                .pipe(take(1), switchMap(() => this.optionSelections));
        });
        /**
         * `autocomplete` attribute to be set on the input element.
         * @docs-private
         */
        this.autocompleteAttribute = 'off';
        this._autocompleteDisabled = false;
        this.overlayAttached = false;
        this.componentDestroyed = false;
        /** Subscription to viewport size changes. */
        this.viewportSubscription = Subscription.EMPTY;
        /**
         * Whether the autocomplete can open the next time it is focused. Used to prevent a focused,
         * closed autocomplete from being reopened if the user switches to another browser tab and then
         * comes back.
         */
        this.canOpenOnNextFocus = true;
        /** Stream of keyboard events that can close the panel. */
        this.closeKeyEventStream = new Subject();
        /** `View -> model callback called when value changes` */
        // tslint:disable-next-line no-empty
        this.onChange = () => { };
        /** `View -> model callback called when autocomplete has been touched` */
        // tslint:disable-next-line no-empty
        this.onTouched = () => { };
        /**
         * Event handler for when the window is blurred. Needs to be an
         * arrow function in order to preserve the context.
         */
        this.windowBlurHandler = () => {
            // If the user blurred the window while the autocomplete is focused, it means that it'll be
            // refocused when they come back. In this case we want to skip the first focus event, if the
            // pane was closed, in order to avoid reopening it unintentionally.
            this.canOpenOnNextFocus = this.document.activeElement !== this.elementRef.nativeElement || this.panelOpen;
        };
        // tslint:disable-next-line no-typeof-undefined
        if (typeof window !== 'undefined') {
            zone.runOutsideAngular(() => {
                window.addEventListener('blur', this.windowBlurHandler);
            });
        }
        this.scrollStrategy = scrollStrategy;
    }
    /** The currently active option, coerced to MatOption type. */
    get activeOption() {
        if (this.autocomplete && this.autocomplete.keyManager) {
            return this.autocomplete.keyManager.activeItem;
        }
        return null;
    }
    get panelOpen() {
        return this.overlayAttached && this.autocomplete.showPanel;
    }
    /**
     * Whether the autocomplete is disabled. When disabled, the element will
     * act as a regular input and the user won't be able to open the panel.
     */
    get autocompleteDisabled() {
        return this._autocompleteDisabled;
    }
    set autocompleteDisabled(value) {
        this._autocompleteDisabled = coerceBooleanProperty(value);
    }
    ngOnDestroy() {
        // tslint:disable-next-line no-typeof-undefined
        if (typeof window !== 'undefined') {
            window.removeEventListener('blur', this.windowBlurHandler);
        }
        this.viewportSubscription.unsubscribe();
        this.componentDestroyed = true;
        this.destroyPanel();
        this.closeKeyEventStream.complete();
    }
    /** Opens the autocomplete suggestion panel. */
    openPanel() {
        this.attachOverlay();
    }
    closePanel() {
        if (!this.overlayAttached) {
            return;
        }
        if (this.panelOpen) {
            this.autocomplete.closed.emit();
        }
        this.autocomplete.isOpen = this.overlayAttached = false;
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
            this.closingActionsSubscription.unsubscribe();
        }
        // Note that in some cases this can end up being called after the component is destroyed.
        // Add a check to ensure that we don't try to run change detection on a destroyed view.
        if (!this.componentDestroyed) {
            // We need to trigger change detection manually, because
            // `fromEvent` doesn't seem to do it at the proper time.
            // This ensures that the label is reset when the
            // user clicks outside.
            this.changeDetectorRef.detectChanges();
        }
    }
    /**
     * Updates the position of the autocomplete suggestion panel to ensure that it fits all options
     * within the viewport.
     */
    updatePosition() {
        if (this.overlayAttached) {
            this.overlayRef.updatePosition();
        }
    }
    /**
     * A stream of actions that should close the autocomplete panel, including
     * when an option is selected, on blur, and when TAB is pressed.
     */
    get panelClosingActions() {
        return merge(this.optionSelections, this.autocomplete.keyManager.tabOut.pipe(filter(() => this.overlayAttached)), this.closeKeyEventStream, this.getOutsideClickStream(), this.overlayRef ?
            this.overlayRef.detachments().pipe(filter(() => this.overlayAttached)) :
            observableOf()).pipe(
        // Normalize the output so we return a consistent type.
        map((event) => event instanceof McOptionSelectionChange ? event : null));
    }
    // Implemented as part of ControlValueAccessor.
    writeValue(value) {
        Promise.resolve(null).then(() => this.setTriggerValue(value));
    }
    // Implemented as part of ControlValueAccessor.
    registerOnChange(fn) {
        this.onChange = fn;
    }
    // Implemented as part of ControlValueAccessor.
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    // Implemented as part of ControlValueAccessor.
    setDisabledState(isDisabled) {
        this.elementRef.nativeElement.disabled = isDisabled;
    }
    handleKeydown(event) {
        // tslint:disable-next-line deprecation
        const keyCode = event.keyCode;
        // Prevent the default action on all escape key presses. This is here primarily to bring IE
        // in line with other browsers. By default, pressing escape on IE will cause it to revert
        // the input value to the one that it had on focus, however it won't dispatch any events
        // which means that the model value will be out of sync with the view.
        if (keyCode === ESCAPE) {
            event.preventDefault();
        }
        if (this.activeOption && keyCode === ENTER && this.panelOpen) {
            this.activeOption.selectViaInteraction();
            this.resetActiveItem();
            event.preventDefault();
        }
        else if (this.autocomplete) {
            const prevActiveItem = this.autocomplete.keyManager.activeItem;
            if (this.panelOpen || keyCode === TAB) {
                this.autocomplete.onKeydown(event);
            }
            else if (keyCode === DOWN_ARROW && this.canOpen()) {
                this.openPanel();
            }
            const isArrowKey = keyCode === UP_ARROW || keyCode === DOWN_ARROW;
            if (isArrowKey || this.autocomplete.keyManager.activeItem !== prevActiveItem) {
                this.scrollToOption();
            }
        }
    }
    handleInput(event) {
        const target = event.target;
        let value = target.value;
        // Based on `NumberValueAccessor` from forms.
        if (target.type === 'number') {
            value = value === '' ? null : parseFloat(value);
        }
        // If the input has a placeholder, IE will fire the `input` event on page load,
        // focus and blur, in addition to when the user actually changed the value. To
        // filter out all of the extra events, we save the value on focus and between
        // `input` events, and we check whether it changed.
        // See: https://connect.microsoft.com/IE/feedback/details/885747/
        if (this.previousValue !== value) {
            this.previousValue = value;
            this.onChange(value);
            if (this.canOpen() && this.document.activeElement === event.target) {
                this.openPanel();
            }
        }
    }
    handleFocus() {
        if (!this.canOpenOnNextFocus) {
            this.canOpenOnNextFocus = true;
        }
        else if (this.canOpen()) {
            this.previousValue = this.elementRef.nativeElement.value;
            this.attachOverlay();
        }
    }
    handleClick($event) {
        if (this.canOpen() && this.document.activeElement === $event.target) {
            this.openPanel();
        }
    }
    /** Stream of clicks outside of the autocomplete panel. */
    getOutsideClickStream() {
        return merge(
        // tslint:disable-next-line: no-unnecessary-type-assertion
        fromEvent(this.document, 'click'), 
        // tslint:disable-next-line: no-unnecessary-type-assertion
        fromEvent(this.document, 'touchend'))
            .pipe(filter((event) => {
            const clickTarget = event.target;
            const formField = this.formField ? this.formField._elementRef.nativeElement : null;
            const customOrigin = this.connectedTo ? this.connectedTo.elementRef.nativeElement : null;
            return this.overlayAttached &&
                clickTarget !== this.elementRef.nativeElement &&
                (!formField || !formField.contains(clickTarget)) &&
                (!customOrigin || !customOrigin.contains(clickTarget)) &&
                (!!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget));
        }));
    }
    /**
     * Given that we are not actually focusing active options, we must manually adjust scroll
     * to reveal options below the fold. First, we find the offset of the option from the top
     * of the panel. If that offset is below the fold, the new scrollTop will be the offset -
     * the panel height + the option height, so the active option will be just visible at the
     * bottom of the panel. If that offset is above the top of the visible panel, the new scrollTop
     * will become the offset. If that offset is visible within the panel already, the scrollTop is
     * not adjusted.
     */
    scrollToOption() {
        const index = this.autocomplete.keyManager.activeItemIndex || 0;
        const labelCount = countGroupLabelsBeforeOption(index, this.autocomplete.options, this.autocomplete.optionGroups);
        const newScrollPosition = getOptionScrollPosition(index + labelCount, AUTOCOMPLETE_OPTION_HEIGHT, this.autocomplete.getScrollTop(), AUTOCOMPLETE_PANEL_HEIGHT);
        this.autocomplete.setScrollTop(newScrollPosition);
    }
    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     */
    subscribeToClosingActions() {
        const firstStable = this.zone.onStable.asObservable()
            .pipe(take(1));
        const optionChanges = this.autocomplete.options.changes
            .pipe(tap(() => this.positionStrategy.reapplyLastPosition()), 
        // Defer emitting to the stream until the next tick, because changing
        // bindings in here will cause "changed after checked" errors.
        delay(0));
        // When the zone is stable initially, and when the option list changes...
        return merge(firstStable, optionChanges)
            .pipe(
        // create a new stream of panelClosingActions, replacing any previous streams
        // that were created, and flatten it so our stream only emits closing events...
        switchMap(() => {
            const wasOpen = this.panelOpen;
            this.resetActiveItem();
            this.autocomplete.setVisibility();
            if (this.panelOpen) {
                this.overlayRef.updatePosition();
                // If the `panelOpen` state changed, we need to make sure to emit the `opened`
                // event, because we may not have emitted it when the panel was attached. This
                // can happen if the users opens the panel and there are no options, but the
                // options come in slightly later or as a result of the value changing.
                if (wasOpen !== this.panelOpen) {
                    this.autocomplete.opened.emit();
                }
            }
            return this.panelClosingActions;
        }), 
        // when the first closing event occurs...
        take(1))
            // set the value, close the panel, and complete.
            .subscribe((event) => this.setValueAndClose(event));
    }
    /** Destroys the autocomplete suggestion panel. */
    destroyPanel() {
        if (this.overlayRef) {
            this.closePanel();
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    }
    setTriggerValue(value) {
        const toDisplay = this.autocomplete && this.autocomplete.displayWith ?
            this.autocomplete.displayWith(value) :
            value;
        // Simply falling back to an empty string if the display value is falsy does not work properly.
        // The display value can also be the number zero and shouldn't fall back to an empty string.
        const inputValue = toDisplay != null ? toDisplay : '';
        // If it's used within a `MatFormField`, we should set it through the property so it can go
        // through change detection.
        if (this.formField) {
            this.formField.control.value = inputValue;
        }
        else {
            this.elementRef.nativeElement.value = inputValue;
        }
        this.previousValue = inputValue;
    }
    /** This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    setValueAndClose(event) {
        if (event && event.source) {
            this.clearPreviousSelectedOption(event.source);
            this.setTriggerValue(event.source.value);
            this.onChange(event.source.value);
            this.elementRef.nativeElement.focus();
            this.autocomplete.emitSelectEvent(event.source);
        }
        this.closePanel();
    }
    /** Clear any previous selected option and emit a selection change event for this option */
    clearPreviousSelectedOption(skip) {
        this.autocomplete.options.forEach((option) => {
            if (option !== skip && option.selected) {
                option.deselect();
            }
        });
    }
    attachOverlay() {
        if (!this.autocomplete) {
            throw getMcAutocompleteMissingPanelError();
        }
        let overlayRef = this.overlayRef;
        if (!overlayRef) {
            this.portal = new TemplatePortal(this.autocomplete.template, this.viewContainerRef);
            overlayRef = this.overlay.create(this.getOverlayConfig());
            this.overlayRef = overlayRef;
            // Use the `keydownEvents` in order to take advantage of
            // the overlay event targeting provided by the CDK overlay.
            overlayRef.keydownEvents().subscribe((event) => {
                // Close when pressing ESCAPE or ALT + UP_ARROW, based on the a11y guidelines.
                // See: https://www.w3.org/TR/wai-aria-practices-1.1/#textbox-keyboard-interaction
                // tslint:disable-next-line deprecation
                if (event.keyCode === ESCAPE || (event.keyCode === UP_ARROW && event.altKey)) {
                    this.resetActiveItem();
                    this.closeKeyEventStream.next();
                }
            });
            if (this.viewportRuler) {
                this.viewportSubscription = this.viewportRuler.change().subscribe(() => {
                    if (this.panelOpen && overlayRef) {
                        overlayRef.updateSize({ width: this.getPanelWidth() });
                    }
                });
            }
        }
        else {
            const position = overlayRef.getConfig().positionStrategy;
            // Update the trigger, panel width and direction, in case anything has changed.
            position.setOrigin(this.getConnectedElement());
            overlayRef.updateSize({ width: this.getPanelWidth() });
        }
        if (overlayRef && !overlayRef.hasAttached()) {
            overlayRef.attach(this.portal);
            this.closingActionsSubscription = this.subscribeToClosingActions();
        }
        const wasOpen = this.panelOpen;
        this.autocomplete.setVisibility();
        this.autocomplete.isOpen = this.overlayAttached = true;
        // We need to do an extra `panelOpen` check in here, because the
        // autocomplete won't be shown if there are no options.
        if (this.panelOpen && wasOpen !== this.panelOpen) {
            this.autocomplete.opened.emit();
        }
    }
    getOverlayConfig() {
        return new OverlayConfig({
            positionStrategy: this.getOverlayPosition(),
            scrollStrategy: this.scrollStrategy(),
            width: this.getPanelWidth(),
            direction: this.dir
        });
    }
    getOverlayPosition() {
        this.positionStrategy = this.overlay.position()
            .flexibleConnectedTo(this.getConnectedElement())
            .withFlexibleDimensions(false)
            .withPush(false)
            .withPositions([
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom',
                // The overlay edge connected to the trigger should have squared corners, while
                // the opposite end has rounded corners. We apply a CSS class to swap the
                // border-radius based on the overlay position.
                panelClass: 'mc-autocomplete-panel-above'
            }
        ]);
        return this.positionStrategy;
    }
    getConnectedElement() {
        if (this.connectedTo) {
            return this.connectedTo.elementRef;
        }
        return this.formField ? this.formField.getConnectedOverlayOrigin() : this.elementRef;
    }
    getPanelWidth() {
        return this.autocomplete.panelWidth || this.getHostWidth() - AUTOCOMPLETE_BORDER_WIDTH;
    }
    getHostWidth() {
        return this.getConnectedElement().nativeElement.getBoundingClientRect().width;
    }
    /**
     * Resets the active item to -1 so arrow events will activate the
     * correct options, or to 0 if the consumer opted into it.
     */
    resetActiveItem() {
        if (this.autocomplete.autoActiveFirstOption) {
            this.autocomplete.keyManager.setFirstItemActive();
        }
        else {
            this.autocomplete.keyManager.setActiveItem(-1);
        }
    }
    canOpen() {
        const element = this.elementRef.nativeElement;
        return !element.readOnly && !element.disabled && !this._autocompleteDisabled;
    }
}
McAutocompleteTrigger.decorators = [
    { type: Directive, args: [{
                selector: `input[mcAutocomplete], textarea[mcAutocomplete]`,
                host: {
                    class: 'mc-autocomplete-trigger',
                    '[attr.autocomplete]': 'autocompleteAttribute',
                    // Note: we use `focusin`, as opposed to `focus`, in order to open the panel
                    // a little earlier. This avoids issues where IE delays the focusing of the input.
                    '(focusin)': 'handleFocus()',
                    '(blur)': 'onTouched()',
                    '(input)': 'handleInput($event)',
                    '(keydown)': 'handleKeydown($event)',
                    '(click)': 'handleClick($event)'
                },
                exportAs: 'mcAutocompleteTrigger',
                providers: [MAT_AUTOCOMPLETE_VALUE_ACCESSOR]
            },] }
];
/** @nocollapse */
McAutocompleteTrigger.ctorParameters = () => [
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: ChangeDetectorRef },
    { type: Overlay },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [MC_AUTOCOMPLETE_SCROLL_STRATEGY,] }] },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: McFormField, decorators: [{ type: Optional }, { type: Host }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] },
    { type: ViewportRuler }
];
McAutocompleteTrigger.propDecorators = {
    autocomplete: [{ type: Input, args: ['mcAutocomplete',] }],
    connectedTo: [{ type: Input, args: ['mcAutocompleteConnectedTo',] }],
    autocompleteAttribute: [{ type: Input, args: ['autocomplete',] }],
    autocompleteDisabled: [{ type: Input, args: ['mcAutocompleteDisabled',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLXRyaWdnZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUtdHJpZ2dlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFHSCxPQUFPLEVBQ1AsYUFBYSxFQUloQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDSCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixVQUFVLEVBQ1YsSUFBSSxFQUNKLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BGLE9BQU8sRUFDSCw0QkFBNEIsRUFDNUIsdUJBQXVCLEVBRXZCLHVCQUF1QixFQUMxQixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFF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RixDQUFDOzs7WUF4a0JKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaURBQWlEO2dCQUMzRCxJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLHlCQUF5QjtvQkFDaEMscUJBQXFCLEVBQUUsdUJBQXVCO29CQUM5Qyw0RUFBNEU7b0JBQzVFLGtGQUFrRjtvQkFDbEYsV0FBVyxFQUFFLGVBQWU7b0JBQzVCLFFBQVEsRUFBRSxhQUFhO29CQUN2QixTQUFTLEVBQUUscUJBQXFCO29CQUNoQyxXQUFXLEVBQUUsdUJBQXVCO29CQUNwQyxTQUFTLEVBQUUscUJBQXFCO2lCQUNuQztnQkFDRCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQzthQUMvQzs7OztZQTVGRyxVQUFVO1lBU1YsZ0JBQWdCO1lBWGhCLGlCQUFpQjtZQVZqQixPQUFPO1lBa0JQLE1BQU07NENBc0xELE1BQU0sU0FBQywrQkFBK0I7WUE3TXRDLGNBQWMsdUJBOE1kLFFBQVE7WUExS1IsV0FBVyx1QkEyS1gsUUFBUSxZQUFJLElBQUk7NENBQ2hCLFFBQVEsWUFBSSxNQUFNLFNBQUMsUUFBUTtZQXBNM0IsYUFBYTs7OzJCQThIakIsS0FBSyxTQUFDLGdCQUFnQjswQkFNdEIsS0FBSyxTQUFDLDJCQUEyQjtvQ0FNakMsS0FBSyxTQUFDLGNBQWM7bUNBTXBCLEtBQUssU0FBQyx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIENvbm5lY3RlZFBvc2l0aW9uLFxuICAgIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSxcbiAgICBPdmVybGF5LFxuICAgIE92ZXJsYXlDb25maWcsXG4gICAgT3ZlcmxheVJlZixcbiAgICBQb3NpdGlvblN0cmF0ZWd5LFxuICAgIFNjcm9sbFN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBWaWV3cG9ydFJ1bGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSG9zdCxcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPcHRpb25hbCxcbiAgICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRE9XTl9BUlJPVywgRU5URVIsIEVTQ0FQRSwgVEFCLCBVUF9BUlJPVyB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICAgIGNvdW50R3JvdXBMYWJlbHNCZWZvcmVPcHRpb24sXG4gICAgZ2V0T3B0aW9uU2Nyb2xsUG9zaXRpb24sXG4gICAgTWNPcHRpb24sXG4gICAgTWNPcHRpb25TZWxlY3Rpb25DaGFuZ2Vcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNGb3JtRmllbGQgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIGRlZmVyLCBmcm9tRXZlbnQsIG1lcmdlLCBvZiBhcyBvYnNlcnZhYmxlT2YsIFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZSwgc3dpdGNoTWFwLCBkZWxheSwgdGFwLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1jQXV0b2NvbXBsZXRlT3JpZ2luIH0gZnJvbSAnLi9hdXRvY29tcGxldGUtb3JpZ2luLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNY0F1dG9jb21wbGV0ZSB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLmNvbXBvbmVudCc7XG5cblxuLyoqXG4gKiBUaGUgZm9sbG93aW5nIHN0eWxlIGNvbnN0YW50cyBhcmUgbmVjZXNzYXJ5IHRvIHNhdmUgaGVyZSBpbiBvcmRlclxuICogdG8gcHJvcGVybHkgY2FsY3VsYXRlIHRoZSBzY3JvbGxUb3Agb2YgdGhlIHBhbmVsLiBCZWNhdXNlIHdlIGFyZSBub3RcbiAqIGFjdHVhbGx5IGZvY3VzaW5nIHRoZSBhY3RpdmUgaXRlbSwgc2Nyb2xsIG11c3QgYmUgaGFuZGxlZCBtYW51YWxseS5cbiAqL1xuXG4vKiogVGhlIGhlaWdodCBvZiBlYWNoIGF1dG9jb21wbGV0ZSBvcHRpb24uICovXG5leHBvcnQgY29uc3QgQVVUT0NPTVBMRVRFX09QVElPTl9IRUlHSFQgPSAzMjtcblxuLyoqIFRoZSB0b3RhbCBoZWlnaHQgb2YgdGhlIGF1dG9jb21wbGV0ZSBwYW5lbC4gKi9cbmV4cG9ydCBjb25zdCBBVVRPQ09NUExFVEVfUEFORUxfSEVJR0hUID0gMjU2O1xuXG5leHBvcnQgY29uc3QgQVVUT0NPTVBMRVRFX0JPUkRFUl9XSURUSDogbnVtYmVyID0gMjtcblxuLyoqIEluamVjdGlvbiB0b2tlbiB0aGF0IGRldGVybWluZXMgdGhlIHNjcm9sbCBoYW5kbGluZyB3aGlsZSB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsIGlzIG9wZW4uICovXG5leHBvcnQgY29uc3QgTUNfQVVUT0NPTVBMRVRFX1NDUk9MTF9TVFJBVEVHWSA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPCgpID0+IFNjcm9sbFN0cmF0ZWd5PignbWMtYXV0b2NvbXBsZXRlLXNjcm9sbC1zdHJhdGVneScpO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBmdW5jdGlvbiBNQ19BVVRPQ09NUExFVEVfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUlkob3ZlcmxheTogT3ZlcmxheSk6ICgpID0+IFNjcm9sbFN0cmF0ZWd5IHtcbiAgICByZXR1cm4gKCkgPT4gb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oKTtcbn1cblxuZXhwb3J0IGNvbnN0IE1DX0FVVE9DT01QTEVURV9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUiA9IHtcbiAgICBwcm92aWRlOiBNQ19BVVRPQ09NUExFVEVfU0NST0xMX1NUUkFURUdZLFxuICAgIGRlcHM6IFtPdmVybGF5XSxcbiAgICB1c2VGYWN0b3J5OiBNQ19BVVRPQ09NUExFVEVfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllcbn07XG5cbi8qKlxuICogUHJvdmlkZXIgdGhhdCBhbGxvd3MgdGhlIGF1dG9jb21wbGV0ZSB0byByZWdpc3RlciBhcyBhIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgTUFUX0FVVE9DT01QTEVURV9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1jQXV0b2NvbXBsZXRlVHJpZ2dlciksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBlcnJvciB0byBiZSB0aHJvd24gd2hlbiBhdHRlbXB0aW5nIHRvIHVzZSBhbiBhdXRvY29tcGxldGUgdHJpZ2dlciB3aXRob3V0IGEgcGFuZWwuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNY0F1dG9jb21wbGV0ZU1pc3NpbmdQYW5lbEVycm9yKCk6IEVycm9yIHtcbiAgICByZXR1cm4gRXJyb3IoJ0F0dGVtcHRpbmcgdG8gb3BlbiBhbiB1bmRlZmluZWQgaW5zdGFuY2Ugb2YgYG1jLWF1dG9jb21wbGV0ZWAuICcgK1xuICAgICAgICAnTWFrZSBzdXJlIHRoYXQgdGhlIGlkIHBhc3NlZCB0byB0aGUgYG1jQXV0b2NvbXBsZXRlYCBpcyBjb3JyZWN0IGFuZCB0aGF0ICcgK1xuICAgICAgICAneW91XFwncmUgYXR0ZW1wdGluZyB0byBvcGVuIGl0IGFmdGVyIHRoZSBuZ0FmdGVyQ29udGVudEluaXQgaG9vay4nKTtcbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogYGlucHV0W21jQXV0b2NvbXBsZXRlXSwgdGV4dGFyZWFbbWNBdXRvY29tcGxldGVdYCxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtYXV0b2NvbXBsZXRlLXRyaWdnZXInLFxuICAgICAgICAnW2F0dHIuYXV0b2NvbXBsZXRlXSc6ICdhdXRvY29tcGxldGVBdHRyaWJ1dGUnLFxuICAgICAgICAvLyBOb3RlOiB3ZSB1c2UgYGZvY3VzaW5gLCBhcyBvcHBvc2VkIHRvIGBmb2N1c2AsIGluIG9yZGVyIHRvIG9wZW4gdGhlIHBhbmVsXG4gICAgICAgIC8vIGEgbGl0dGxlIGVhcmxpZXIuIFRoaXMgYXZvaWRzIGlzc3VlcyB3aGVyZSBJRSBkZWxheXMgdGhlIGZvY3VzaW5nIG9mIHRoZSBpbnB1dC5cbiAgICAgICAgJyhmb2N1c2luKSc6ICdoYW5kbGVGb2N1cygpJyxcbiAgICAgICAgJyhibHVyKSc6ICdvblRvdWNoZWQoKScsXG4gICAgICAgICcoaW5wdXQpJzogJ2hhbmRsZUlucHV0KCRldmVudCknLFxuICAgICAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleWRvd24oJGV2ZW50KScsXG4gICAgICAgICcoY2xpY2spJzogJ2hhbmRsZUNsaWNrKCRldmVudCknXG4gICAgfSxcbiAgICBleHBvcnRBczogJ21jQXV0b2NvbXBsZXRlVHJpZ2dlcicsXG4gICAgcHJvdmlkZXJzOiBbTUFUX0FVVE9DT01QTEVURV9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgTWNBdXRvY29tcGxldGVUcmlnZ2VyIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHJlYWRvbmx5IG9wdGlvblNlbGVjdGlvbnM6IE9ic2VydmFibGU8TWNPcHRpb25TZWxlY3Rpb25DaGFuZ2U+ID0gZGVmZXIoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5hdXRvY29tcGxldGUgJiYgdGhpcy5hdXRvY29tcGxldGUub3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIG1lcmdlKC4uLnRoaXMuYXV0b2NvbXBsZXRlLm9wdGlvbnMubWFwKChvcHRpb24pID0+IG9wdGlvbi5vblNlbGVjdGlvbkNoYW5nZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlcmUgYXJlIGFueSBzdWJzY3JpYmVycyBiZWZvcmUgYG5nQWZ0ZXJWaWV3SW5pdGAsIHRoZSBgYXV0b2NvbXBsZXRlYCB3aWxsIGJlIHVuZGVmaW5lZC5cbiAgICAgICAgLy8gUmV0dXJuIGEgc3RyZWFtIHRoYXQgd2UnbGwgcmVwbGFjZSB3aXRoIHRoZSByZWFsIG9uZSBvbmNlIGV2ZXJ5dGhpbmcgaXMgaW4gcGxhY2UuXG4gICAgICAgIHJldHVybiB0aGlzLnpvbmUub25TdGFibGVcbiAgICAgICAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSwgc3dpdGNoTWFwKCgpID0+IHRoaXMub3B0aW9uU2VsZWN0aW9ucykpO1xuICAgIH0pO1xuXG4gICAgLyoqIFRoZSBjdXJyZW50bHkgYWN0aXZlIG9wdGlvbiwgY29lcmNlZCB0byBNYXRPcHRpb24gdHlwZS4gKi9cbiAgICBnZXQgYWN0aXZlT3B0aW9uKCk6IE1jT3B0aW9uIHwgbnVsbCB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9jb21wbGV0ZSAmJiB0aGlzLmF1dG9jb21wbGV0ZS5rZXlNYW5hZ2VyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hdXRvY29tcGxldGUua2V5TWFuYWdlci5hY3RpdmVJdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZ2V0IHBhbmVsT3BlbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheUF0dGFjaGVkICYmIHRoaXMuYXV0b2NvbXBsZXRlLnNob3dQYW5lbDtcbiAgICB9XG5cbiAgICAvKiogVGhlIGF1dG9jb21wbGV0ZSBwYW5lbCB0byBiZSBhdHRhY2hlZCB0byB0aGlzIHRyaWdnZXIuICovXG4gICAgQElucHV0KCdtY0F1dG9jb21wbGV0ZScpIGF1dG9jb21wbGV0ZTogTWNBdXRvY29tcGxldGU7XG5cbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2UgcmVsYXRpdmUgdG8gd2hpY2ggdG8gcG9zaXRpb24gdGhlIGF1dG9jb21wbGV0ZSBwYW5lbC5cbiAgICAgKiBEZWZhdWx0cyB0byB0aGUgYXV0b2NvbXBsZXRlIHRyaWdnZXIgZWxlbWVudC5cbiAgICAgKi9cbiAgICBASW5wdXQoJ21jQXV0b2NvbXBsZXRlQ29ubmVjdGVkVG8nKSBjb25uZWN0ZWRUbzogTWNBdXRvY29tcGxldGVPcmlnaW47XG5cbiAgICAvKipcbiAgICAgKiBgYXV0b2NvbXBsZXRlYCBhdHRyaWJ1dGUgdG8gYmUgc2V0IG9uIHRoZSBpbnB1dCBlbGVtZW50LlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoJ2F1dG9jb21wbGV0ZScpIGF1dG9jb21wbGV0ZUF0dHJpYnV0ZTogc3RyaW5nID0gJ29mZic7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBhdXRvY29tcGxldGUgaXMgZGlzYWJsZWQuIFdoZW4gZGlzYWJsZWQsIHRoZSBlbGVtZW50IHdpbGxcbiAgICAgKiBhY3QgYXMgYSByZWd1bGFyIGlucHV0IGFuZCB0aGUgdXNlciB3b24ndCBiZSBhYmxlIHRvIG9wZW4gdGhlIHBhbmVsLlxuICAgICAqL1xuICAgIEBJbnB1dCgnbWNBdXRvY29tcGxldGVEaXNhYmxlZCcpXG4gICAgZ2V0IGF1dG9jb21wbGV0ZURpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXV0b2NvbXBsZXRlRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGF1dG9jb21wbGV0ZURpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2F1dG9jb21wbGV0ZURpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hdXRvY29tcGxldGVEaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBvdmVybGF5QXR0YWNoZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZiB8IG51bGw7XG5cbiAgICBwcml2YXRlIHBvcnRhbDogVGVtcGxhdGVQb3J0YWw7XG5cbiAgICBwcml2YXRlIGNvbXBvbmVudERlc3Ryb3llZCA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBzY3JvbGxTdHJhdGVneTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3k7XG5cbiAgICAvKiogT2xkIHZhbHVlIG9mIHRoZSBuYXRpdmUgaW5wdXQuIFVzZWQgdG8gd29yayBhcm91bmQgaXNzdWVzIHdpdGggdGhlIGBpbnB1dGAgZXZlbnQgb24gSUUuICovXG4gICAgcHJpdmF0ZSBwcmV2aW91c1ZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsO1xuXG4gICAgLyoqIFN0cmF0ZWd5IHRoYXQgaXMgdXNlZCB0byBwb3NpdGlvbiB0aGUgcGFuZWwuICovXG4gICAgcHJpdmF0ZSBwb3NpdGlvblN0cmF0ZWd5OiBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3k7XG5cbiAgICAvKiogVGhlIHN1YnNjcmlwdGlvbiBmb3IgY2xvc2luZyBhY3Rpb25zIChzb21lIGFyZSBib3VuZCB0byBkb2N1bWVudCkuICovXG4gICAgcHJpdmF0ZSBjbG9zaW5nQWN0aW9uc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byB2aWV3cG9ydCBzaXplIGNoYW5nZXMuICovXG4gICAgcHJpdmF0ZSB2aWV3cG9ydFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGF1dG9jb21wbGV0ZSBjYW4gb3BlbiB0aGUgbmV4dCB0aW1lIGl0IGlzIGZvY3VzZWQuIFVzZWQgdG8gcHJldmVudCBhIGZvY3VzZWQsXG4gICAgICogY2xvc2VkIGF1dG9jb21wbGV0ZSBmcm9tIGJlaW5nIHJlb3BlbmVkIGlmIHRoZSB1c2VyIHN3aXRjaGVzIHRvIGFub3RoZXIgYnJvd3NlciB0YWIgYW5kIHRoZW5cbiAgICAgKiBjb21lcyBiYWNrLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2FuT3Blbk9uTmV4dEZvY3VzID0gdHJ1ZTtcblxuICAgIC8qKiBTdHJlYW0gb2Yga2V5Ym9hcmQgZXZlbnRzIHRoYXQgY2FuIGNsb3NlIHRoZSBwYW5lbC4gKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IGNsb3NlS2V5RXZlbnRTdHJlYW0gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICAgICAgQEluamVjdChNQ19BVVRPQ09NUExFVEVfU0NST0xMX1NUUkFURUdZKSBzY3JvbGxTdHJhdGVneTogYW55LFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgcHJpdmF0ZSBmb3JtRmllbGQ6IE1jRm9ybUZpZWxkLFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXG4gICAgICAgIC8vIEBicmVha2luZy1jaGFuZ2UgOC4wLjAgTWFrZSBgX3ZpZXdwb3J0UnVsZXJgIHJlcXVpcmVkLlxuICAgICAgICBwcml2YXRlIHZpZXdwb3J0UnVsZXI/OiBWaWV3cG9ydFJ1bGVyXG4gICAgKSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBuby10eXBlb2YtdW5kZWZpbmVkXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLndpbmRvd0JsdXJIYW5kbGVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY3JvbGxTdHJhdGVneSA9IHNjcm9sbFN0cmF0ZWd5O1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbm8tdHlwZW9mLXVuZGVmaW5lZFxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy53aW5kb3dCbHVySGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZpZXdwb3J0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50RGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kZXN0cm95UGFuZWwoKTtcbiAgICAgICAgdGhpcy5jbG9zZUtleUV2ZW50U3RyZWFtLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLyoqIGBWaWV3IC0+IG1vZGVsIGNhbGxiYWNrIGNhbGxlZCB3aGVuIHZhbHVlIGNoYW5nZXNgICovXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5XG4gICAgb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgICAvKiogYFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gYXV0b2NvbXBsZXRlIGhhcyBiZWVuIHRvdWNoZWRgICovXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5XG4gICAgb25Ub3VjaGVkOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgICAvKiogT3BlbnMgdGhlIGF1dG9jb21wbGV0ZSBzdWdnZXN0aW9uIHBhbmVsLiAqL1xuICAgIG9wZW5QYW5lbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hdHRhY2hPdmVybGF5KCk7XG4gICAgfVxuXG4gICAgY2xvc2VQYW5lbCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlBdHRhY2hlZCkgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAodGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLmNsb3NlZC5lbWl0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5pc09wZW4gPSB0aGlzLm92ZXJsYXlBdHRhY2hlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYgJiYgdGhpcy5vdmVybGF5UmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2luZ0FjdGlvbnNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5vdGUgdGhhdCBpbiBzb21lIGNhc2VzIHRoaXMgY2FuIGVuZCB1cCBiZWluZyBjYWxsZWQgYWZ0ZXIgdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuXG4gICAgICAgIC8vIEFkZCBhIGNoZWNrIHRvIGVuc3VyZSB0aGF0IHdlIGRvbid0IHRyeSB0byBydW4gY2hhbmdlIGRldGVjdGlvbiBvbiBhIGRlc3Ryb3llZCB2aWV3LlxuICAgICAgICBpZiAoIXRoaXMuY29tcG9uZW50RGVzdHJveWVkKSB7XG4gICAgICAgICAgICAvLyBXZSBuZWVkIHRvIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiBtYW51YWxseSwgYmVjYXVzZVxuICAgICAgICAgICAgLy8gYGZyb21FdmVudGAgZG9lc24ndCBzZWVtIHRvIGRvIGl0IGF0IHRoZSBwcm9wZXIgdGltZS5cbiAgICAgICAgICAgIC8vIFRoaXMgZW5zdXJlcyB0aGF0IHRoZSBsYWJlbCBpcyByZXNldCB3aGVuIHRoZVxuICAgICAgICAgICAgLy8gdXNlciBjbGlja3Mgb3V0c2lkZS5cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgcG9zaXRpb24gb2YgdGhlIGF1dG9jb21wbGV0ZSBzdWdnZXN0aW9uIHBhbmVsIHRvIGVuc3VyZSB0aGF0IGl0IGZpdHMgYWxsIG9wdGlvbnNcbiAgICAgKiB3aXRoaW4gdGhlIHZpZXdwb3J0LlxuICAgICAqL1xuICAgIHVwZGF0ZVBvc2l0aW9uKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5QXR0YWNoZWQpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiEudXBkYXRlUG9zaXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgc3RyZWFtIG9mIGFjdGlvbnMgdGhhdCBzaG91bGQgY2xvc2UgdGhlIGF1dG9jb21wbGV0ZSBwYW5lbCwgaW5jbHVkaW5nXG4gICAgICogd2hlbiBhbiBvcHRpb24gaXMgc2VsZWN0ZWQsIG9uIGJsdXIsIGFuZCB3aGVuIFRBQiBpcyBwcmVzc2VkLlxuICAgICAqL1xuICAgIGdldCBwYW5lbENsb3NpbmdBY3Rpb25zKCk6IE9ic2VydmFibGU8TWNPcHRpb25TZWxlY3Rpb25DaGFuZ2UgfCBudWxsPiB7XG4gICAgICAgIHJldHVybiBtZXJnZShcbiAgICAgICAgICAgIHRoaXMub3B0aW9uU2VsZWN0aW9ucyxcbiAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLmtleU1hbmFnZXIudGFiT3V0LnBpcGUoZmlsdGVyKCgpID0+IHRoaXMub3ZlcmxheUF0dGFjaGVkKSksXG4gICAgICAgICAgICB0aGlzLmNsb3NlS2V5RXZlbnRTdHJlYW0sXG4gICAgICAgICAgICB0aGlzLmdldE91dHNpZGVDbGlja1N0cmVhbSgpLFxuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID9cbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNobWVudHMoKS5waXBlKGZpbHRlcigoKSA9PiB0aGlzLm92ZXJsYXlBdHRhY2hlZCkpIDpcbiAgICAgICAgICAgICAgICBvYnNlcnZhYmxlT2YoKVxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgICAvLyBOb3JtYWxpemUgdGhlIG91dHB1dCBzbyB3ZSByZXR1cm4gYSBjb25zaXN0ZW50IHR5cGUuXG4gICAgICAgICAgICBtYXAoKGV2ZW50KSA9PiBldmVudCBpbnN0YW5jZW9mIE1jT3B0aW9uU2VsZWN0aW9uQ2hhbmdlID8gZXZlbnQgOiBudWxsKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHRoaXMuc2V0VHJpZ2dlclZhbHVlKHZhbHVlKSk7XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4ge30pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIGRlcHJlY2F0aW9uXG4gICAgICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuXG4gICAgICAgIC8vIFByZXZlbnQgdGhlIGRlZmF1bHQgYWN0aW9uIG9uIGFsbCBlc2NhcGUga2V5IHByZXNzZXMuIFRoaXMgaXMgaGVyZSBwcmltYXJpbHkgdG8gYnJpbmcgSUVcbiAgICAgICAgLy8gaW4gbGluZSB3aXRoIG90aGVyIGJyb3dzZXJzLiBCeSBkZWZhdWx0LCBwcmVzc2luZyBlc2NhcGUgb24gSUUgd2lsbCBjYXVzZSBpdCB0byByZXZlcnRcbiAgICAgICAgLy8gdGhlIGlucHV0IHZhbHVlIHRvIHRoZSBvbmUgdGhhdCBpdCBoYWQgb24gZm9jdXMsIGhvd2V2ZXIgaXQgd29uJ3QgZGlzcGF0Y2ggYW55IGV2ZW50c1xuICAgICAgICAvLyB3aGljaCBtZWFucyB0aGF0IHRoZSBtb2RlbCB2YWx1ZSB3aWxsIGJlIG91dCBvZiBzeW5jIHdpdGggdGhlIHZpZXcuXG4gICAgICAgIGlmIChrZXlDb2RlID09PSBFU0NBUEUpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hY3RpdmVPcHRpb24gJiYga2V5Q29kZSA9PT0gRU5URVIgJiYgdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlT3B0aW9uLnNlbGVjdFZpYUludGVyYWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLnJlc2V0QWN0aXZlSXRlbSgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmF1dG9jb21wbGV0ZSkge1xuICAgICAgICAgICAgY29uc3QgcHJldkFjdGl2ZUl0ZW0gPSB0aGlzLmF1dG9jb21wbGV0ZS5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnBhbmVsT3BlbiB8fCBrZXlDb2RlID09PSBUQUIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5vbktleWRvd24oZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBET1dOX0FSUk9XICYmIHRoaXMuY2FuT3BlbigpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgaXNBcnJvd0tleSA9IGtleUNvZGUgPT09IFVQX0FSUk9XIHx8IGtleUNvZGUgPT09IERPV05fQVJST1c7XG5cbiAgICAgICAgICAgIGlmIChpc0Fycm93S2V5IHx8IHRoaXMuYXV0b2NvbXBsZXRlLmtleU1hbmFnZXIuYWN0aXZlSXRlbSAhPT0gcHJldkFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvT3B0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVJbnB1dChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgICAgbGV0IHZhbHVlOiBudW1iZXIgfCBzdHJpbmcgfCBudWxsID0gdGFyZ2V0LnZhbHVlO1xuXG4gICAgICAgIC8vIEJhc2VkIG9uIGBOdW1iZXJWYWx1ZUFjY2Vzc29yYCBmcm9tIGZvcm1zLlxuICAgICAgICBpZiAodGFyZ2V0LnR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlID09PSAnJyA/IG51bGwgOiBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZSBpbnB1dCBoYXMgYSBwbGFjZWhvbGRlciwgSUUgd2lsbCBmaXJlIHRoZSBgaW5wdXRgIGV2ZW50IG9uIHBhZ2UgbG9hZCxcbiAgICAgICAgLy8gZm9jdXMgYW5kIGJsdXIsIGluIGFkZGl0aW9uIHRvIHdoZW4gdGhlIHVzZXIgYWN0dWFsbHkgY2hhbmdlZCB0aGUgdmFsdWUuIFRvXG4gICAgICAgIC8vIGZpbHRlciBvdXQgYWxsIG9mIHRoZSBleHRyYSBldmVudHMsIHdlIHNhdmUgdGhlIHZhbHVlIG9uIGZvY3VzIGFuZCBiZXR3ZWVuXG4gICAgICAgIC8vIGBpbnB1dGAgZXZlbnRzLCBhbmQgd2UgY2hlY2sgd2hldGhlciBpdCBjaGFuZ2VkLlxuICAgICAgICAvLyBTZWU6IGh0dHBzOi8vY29ubmVjdC5taWNyb3NvZnQuY29tL0lFL2ZlZWRiYWNrL2RldGFpbHMvODg1NzQ3L1xuICAgICAgICBpZiAodGhpcy5wcmV2aW91c1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91c1ZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY2FuT3BlbigpICYmIHRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUZvY3VzKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuY2FuT3Blbk9uTmV4dEZvY3VzKSB7XG4gICAgICAgICAgICB0aGlzLmNhbk9wZW5Pbk5leHRGb2N1cyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jYW5PcGVuKCkpIHtcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNWYWx1ZSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5hdHRhY2hPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljaygkZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FuT3BlbigpICYmIHRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gJGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBTdHJlYW0gb2YgY2xpY2tzIG91dHNpZGUgb2YgdGhlIGF1dG9jb21wbGV0ZSBwYW5lbC4gKi9cbiAgICBwcml2YXRlIGdldE91dHNpZGVDbGlja1N0cmVhbSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gbWVyZ2UoXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVubmVjZXNzYXJ5LXR5cGUtYXNzZXJ0aW9uXG4gICAgICAgICAgICBmcm9tRXZlbnQodGhpcy5kb2N1bWVudCwgJ2NsaWNrJykgYXMgT2JzZXJ2YWJsZTxNb3VzZUV2ZW50PixcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW5uZWNlc3NhcnktdHlwZS1hc3NlcnRpb25cbiAgICAgICAgICAgIGZyb21FdmVudCh0aGlzLmRvY3VtZW50LCAndG91Y2hlbmQnKSBhcyBPYnNlcnZhYmxlPFRvdWNoRXZlbnQ+XG4gICAgICAgIClcbiAgICAgICAgICAgIC5waXBlKGZpbHRlcigoZXZlbnQpID0+IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGNsaWNrVGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1GaWVsZCA9IHRoaXMuZm9ybUZpZWxkID8gdGhpcy5mb3JtRmllbGQuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCA6IG51bGw7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VzdG9tT3JpZ2luID0gdGhpcy5jb25uZWN0ZWRUbyA/IHRoaXMuY29ubmVjdGVkVG8uZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IDogbnVsbDtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlBdHRhY2hlZCAmJlxuICAgICAgICAgICAgICAgICAgICBjbGlja1RhcmdldCAhPT0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgJiZcbiAgICAgICAgICAgICAgICAgICAgKCFmb3JtRmllbGQgfHwgIWZvcm1GaWVsZC5jb250YWlucyhjbGlja1RhcmdldCkpICYmXG4gICAgICAgICAgICAgICAgICAgICghY3VzdG9tT3JpZ2luIHx8ICFjdXN0b21PcmlnaW4uY29udGFpbnMoY2xpY2tUYXJnZXQpKSAmJlxuICAgICAgICAgICAgICAgICAgICAoISF0aGlzLm92ZXJsYXlSZWYgJiYgIXRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5jb250YWlucyhjbGlja1RhcmdldCkpO1xuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGhhbmRsZXIgZm9yIHdoZW4gdGhlIHdpbmRvdyBpcyBibHVycmVkLiBOZWVkcyB0byBiZSBhblxuICAgICAqIGFycm93IGZ1bmN0aW9uIGluIG9yZGVyIHRvIHByZXNlcnZlIHRoZSBjb250ZXh0LlxuICAgICAqL1xuICAgIHByaXZhdGUgd2luZG93Qmx1ckhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgIC8vIElmIHRoZSB1c2VyIGJsdXJyZWQgdGhlIHdpbmRvdyB3aGlsZSB0aGUgYXV0b2NvbXBsZXRlIGlzIGZvY3VzZWQsIGl0IG1lYW5zIHRoYXQgaXQnbGwgYmVcbiAgICAgICAgLy8gcmVmb2N1c2VkIHdoZW4gdGhleSBjb21lIGJhY2suIEluIHRoaXMgY2FzZSB3ZSB3YW50IHRvIHNraXAgdGhlIGZpcnN0IGZvY3VzIGV2ZW50LCBpZiB0aGVcbiAgICAgICAgLy8gcGFuZSB3YXMgY2xvc2VkLCBpbiBvcmRlciB0byBhdm9pZCByZW9wZW5pbmcgaXQgdW5pbnRlbnRpb25hbGx5LlxuICAgICAgICB0aGlzLmNhbk9wZW5Pbk5leHRGb2N1cyA9IHRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgfHwgdGhpcy5wYW5lbE9wZW47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gdGhhdCB3ZSBhcmUgbm90IGFjdHVhbGx5IGZvY3VzaW5nIGFjdGl2ZSBvcHRpb25zLCB3ZSBtdXN0IG1hbnVhbGx5IGFkanVzdCBzY3JvbGxcbiAgICAgKiB0byByZXZlYWwgb3B0aW9ucyBiZWxvdyB0aGUgZm9sZC4gRmlyc3QsIHdlIGZpbmQgdGhlIG9mZnNldCBvZiB0aGUgb3B0aW9uIGZyb20gdGhlIHRvcFxuICAgICAqIG9mIHRoZSBwYW5lbC4gSWYgdGhhdCBvZmZzZXQgaXMgYmVsb3cgdGhlIGZvbGQsIHRoZSBuZXcgc2Nyb2xsVG9wIHdpbGwgYmUgdGhlIG9mZnNldCAtXG4gICAgICogdGhlIHBhbmVsIGhlaWdodCArIHRoZSBvcHRpb24gaGVpZ2h0LCBzbyB0aGUgYWN0aXZlIG9wdGlvbiB3aWxsIGJlIGp1c3QgdmlzaWJsZSBhdCB0aGVcbiAgICAgKiBib3R0b20gb2YgdGhlIHBhbmVsLiBJZiB0aGF0IG9mZnNldCBpcyBhYm92ZSB0aGUgdG9wIG9mIHRoZSB2aXNpYmxlIHBhbmVsLCB0aGUgbmV3IHNjcm9sbFRvcFxuICAgICAqIHdpbGwgYmVjb21lIHRoZSBvZmZzZXQuIElmIHRoYXQgb2Zmc2V0IGlzIHZpc2libGUgd2l0aGluIHRoZSBwYW5lbCBhbHJlYWR5LCB0aGUgc2Nyb2xsVG9wIGlzXG4gICAgICogbm90IGFkanVzdGVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgc2Nyb2xsVG9PcHRpb24oKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5hdXRvY29tcGxldGUua2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggfHwgMDtcbiAgICAgICAgY29uc3QgbGFiZWxDb3VudCA9IGNvdW50R3JvdXBMYWJlbHNCZWZvcmVPcHRpb24oXG4gICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLm9wdGlvbnMsIHRoaXMuYXV0b2NvbXBsZXRlLm9wdGlvbkdyb3Vwc1xuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IG5ld1Njcm9sbFBvc2l0aW9uID0gZ2V0T3B0aW9uU2Nyb2xsUG9zaXRpb24oXG4gICAgICAgICAgICBpbmRleCArIGxhYmVsQ291bnQsXG4gICAgICAgICAgICBBVVRPQ09NUExFVEVfT1BUSU9OX0hFSUdIVCxcbiAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLmdldFNjcm9sbFRvcCgpLFxuICAgICAgICAgICAgQVVUT0NPTVBMRVRFX1BBTkVMX0hFSUdIVFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLnNldFNjcm9sbFRvcChuZXdTY3JvbGxQb3NpdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgbGlzdGVucyB0byBhIHN0cmVhbSBvZiBwYW5lbCBjbG9zaW5nIGFjdGlvbnMgYW5kIHJlc2V0cyB0aGVcbiAgICAgKiBzdHJlYW0gZXZlcnkgdGltZSB0aGUgb3B0aW9uIGxpc3QgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBwcml2YXRlIHN1YnNjcmliZVRvQ2xvc2luZ0FjdGlvbnMoKTogU3Vic2NyaXB0aW9uIHtcbiAgICAgICAgY29uc3QgZmlyc3RTdGFibGUgPSB0aGlzLnpvbmUub25TdGFibGUuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpO1xuICAgICAgICBjb25zdCBvcHRpb25DaGFuZ2VzID0gdGhpcy5hdXRvY29tcGxldGUub3B0aW9ucy5jaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YXAoKCkgPT4gdGhpcy5wb3NpdGlvblN0cmF0ZWd5LnJlYXBwbHlMYXN0UG9zaXRpb24oKSksXG4gICAgICAgICAgICAgICAgLy8gRGVmZXIgZW1pdHRpbmcgdG8gdGhlIHN0cmVhbSB1bnRpbCB0aGUgbmV4dCB0aWNrLCBiZWNhdXNlIGNoYW5naW5nXG4gICAgICAgICAgICAgICAgLy8gYmluZGluZ3MgaW4gaGVyZSB3aWxsIGNhdXNlIFwiY2hhbmdlZCBhZnRlciBjaGVja2VkXCIgZXJyb3JzLlxuICAgICAgICAgICAgICAgIGRlbGF5KDApXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIC8vIFdoZW4gdGhlIHpvbmUgaXMgc3RhYmxlIGluaXRpYWxseSwgYW5kIHdoZW4gdGhlIG9wdGlvbiBsaXN0IGNoYW5nZXMuLi5cbiAgICAgICAgcmV0dXJuIG1lcmdlKGZpcnN0U3RhYmxlLCBvcHRpb25DaGFuZ2VzKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IHN0cmVhbSBvZiBwYW5lbENsb3NpbmdBY3Rpb25zLCByZXBsYWNpbmcgYW55IHByZXZpb3VzIHN0cmVhbXNcbiAgICAgICAgICAgICAgICAvLyB0aGF0IHdlcmUgY3JlYXRlZCwgYW5kIGZsYXR0ZW4gaXQgc28gb3VyIHN0cmVhbSBvbmx5IGVtaXRzIGNsb3NpbmcgZXZlbnRzLi4uXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2FzT3BlbiA9IHRoaXMucGFuZWxPcGVuO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0QWN0aXZlSXRlbSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5zZXRWaXNpYmlsaXR5KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYhLnVwZGF0ZVBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBgcGFuZWxPcGVuYCBzdGF0ZSBjaGFuZ2VkLCB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0byBlbWl0IHRoZSBgb3BlbmVkYFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXZlbnQsIGJlY2F1c2Ugd2UgbWF5IG5vdCBoYXZlIGVtaXR0ZWQgaXQgd2hlbiB0aGUgcGFuZWwgd2FzIGF0dGFjaGVkLiBUaGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYW4gaGFwcGVuIGlmIHRoZSB1c2VycyBvcGVucyB0aGUgcGFuZWwgYW5kIHRoZXJlIGFyZSBubyBvcHRpb25zLCBidXQgdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvcHRpb25zIGNvbWUgaW4gc2xpZ2h0bHkgbGF0ZXIgb3IgYXMgYSByZXN1bHQgb2YgdGhlIHZhbHVlIGNoYW5naW5nLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdhc09wZW4gIT09IHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUub3BlbmVkLmVtaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhbmVsQ2xvc2luZ0FjdGlvbnM7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgLy8gd2hlbiB0aGUgZmlyc3QgY2xvc2luZyBldmVudCBvY2N1cnMuLi5cbiAgICAgICAgICAgICAgICB0YWtlKDEpXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAvLyBzZXQgdGhlIHZhbHVlLCBjbG9zZSB0aGUgcGFuZWwsIGFuZCBjb21wbGV0ZS5cbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB0aGlzLnNldFZhbHVlQW5kQ2xvc2UoZXZlbnQpKTtcbiAgICB9XG5cbiAgICAvKiogRGVzdHJveXMgdGhlIGF1dG9jb21wbGV0ZSBzdWdnZXN0aW9uIHBhbmVsLiAqL1xuICAgIHByaXZhdGUgZGVzdHJveVBhbmVsKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRUcmlnZ2VyVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBjb25zdCB0b0Rpc3BsYXkgPSB0aGlzLmF1dG9jb21wbGV0ZSAmJiB0aGlzLmF1dG9jb21wbGV0ZS5kaXNwbGF5V2l0aCA/XG4gICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5kaXNwbGF5V2l0aCh2YWx1ZSkgOlxuICAgICAgICAgICAgdmFsdWU7XG5cbiAgICAgICAgLy8gU2ltcGx5IGZhbGxpbmcgYmFjayB0byBhbiBlbXB0eSBzdHJpbmcgaWYgdGhlIGRpc3BsYXkgdmFsdWUgaXMgZmFsc3kgZG9lcyBub3Qgd29yayBwcm9wZXJseS5cbiAgICAgICAgLy8gVGhlIGRpc3BsYXkgdmFsdWUgY2FuIGFsc28gYmUgdGhlIG51bWJlciB6ZXJvIGFuZCBzaG91bGRuJ3QgZmFsbCBiYWNrIHRvIGFuIGVtcHR5IHN0cmluZy5cbiAgICAgICAgY29uc3QgaW5wdXRWYWx1ZSA9IHRvRGlzcGxheSAhPSBudWxsID8gdG9EaXNwbGF5IDogJyc7XG5cbiAgICAgICAgLy8gSWYgaXQncyB1c2VkIHdpdGhpbiBhIGBNYXRGb3JtRmllbGRgLCB3ZSBzaG91bGQgc2V0IGl0IHRocm91Z2ggdGhlIHByb3BlcnR5IHNvIGl0IGNhbiBnb1xuICAgICAgICAvLyB0aHJvdWdoIGNoYW5nZSBkZXRlY3Rpb24uXG4gICAgICAgIGlmICh0aGlzLmZvcm1GaWVsZCkge1xuICAgICAgICAgICAgdGhpcy5mb3JtRmllbGQuY29udHJvbC52YWx1ZSA9IGlucHV0VmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSA9IGlucHV0VmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByZXZpb3VzVmFsdWUgPSBpbnB1dFZhbHVlO1xuICAgIH1cblxuICAgIC8qKiBUaGlzIG1ldGhvZCBjbG9zZXMgdGhlIHBhbmVsLCBhbmQgaWYgYSB2YWx1ZSBpcyBzcGVjaWZpZWQsIGFsc28gc2V0cyB0aGUgYXNzb2NpYXRlZFxuICAgICAqIGNvbnRyb2wgdG8gdGhhdCB2YWx1ZS4gSXQgd2lsbCBhbHNvIG1hcmsgdGhlIGNvbnRyb2wgYXMgZGlydHkgaWYgdGhpcyBpbnRlcmFjdGlvblxuICAgICAqIHN0ZW1tZWQgZnJvbSB0aGUgdXNlci5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNldFZhbHVlQW5kQ2xvc2UoZXZlbnQ6IE1jT3B0aW9uU2VsZWN0aW9uQ2hhbmdlIHwgbnVsbCk6IHZvaWQge1xuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc291cmNlKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyUHJldmlvdXNTZWxlY3RlZE9wdGlvbihldmVudC5zb3VyY2UpO1xuICAgICAgICAgICAgdGhpcy5zZXRUcmlnZ2VyVmFsdWUoZXZlbnQuc291cmNlLnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UoZXZlbnQuc291cmNlLnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLmVtaXRTZWxlY3RFdmVudChldmVudC5zb3VyY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgfVxuXG4gICAgLyoqIENsZWFyIGFueSBwcmV2aW91cyBzZWxlY3RlZCBvcHRpb24gYW5kIGVtaXQgYSBzZWxlY3Rpb24gY2hhbmdlIGV2ZW50IGZvciB0aGlzIG9wdGlvbiAqL1xuICAgIHByaXZhdGUgY2xlYXJQcmV2aW91c1NlbGVjdGVkT3B0aW9uKHNraXA6IE1jT3B0aW9uKSB7XG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9uICE9PSBza2lwICYmIG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIG9wdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGF0dGFjaE92ZXJsYXkoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5hdXRvY29tcGxldGUpIHtcbiAgICAgICAgICAgIHRocm93IGdldE1jQXV0b2NvbXBsZXRlTWlzc2luZ1BhbmVsRXJyb3IoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvdmVybGF5UmVmID0gdGhpcy5vdmVybGF5UmVmO1xuXG4gICAgICAgIGlmICghb3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5wb3J0YWwgPSBuZXcgVGVtcGxhdGVQb3J0YWwodGhpcy5hdXRvY29tcGxldGUudGVtcGxhdGUsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgICAgICBvdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh0aGlzLmdldE92ZXJsYXlDb25maWcoKSk7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYgPSBvdmVybGF5UmVmO1xuXG4gICAgICAgICAgICAvLyBVc2UgdGhlIGBrZXlkb3duRXZlbnRzYCBpbiBvcmRlciB0byB0YWtlIGFkdmFudGFnZSBvZlxuICAgICAgICAgICAgLy8gdGhlIG92ZXJsYXkgZXZlbnQgdGFyZ2V0aW5nIHByb3ZpZGVkIGJ5IHRoZSBDREsgb3ZlcmxheS5cbiAgICAgICAgICAgIG92ZXJsYXlSZWYua2V5ZG93bkV2ZW50cygpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBDbG9zZSB3aGVuIHByZXNzaW5nIEVTQ0FQRSBvciBBTFQgKyBVUF9BUlJPVywgYmFzZWQgb24gdGhlIGExMXkgZ3VpZGVsaW5lcy5cbiAgICAgICAgICAgICAgICAvLyBTZWU6IGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS1wcmFjdGljZXMtMS4xLyN0ZXh0Ym94LWtleWJvYXJkLWludGVyYWN0aW9uXG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIGRlcHJlY2F0aW9uXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSB8fCAoZXZlbnQua2V5Q29kZSA9PT0gVVBfQVJST1cgJiYgZXZlbnQuYWx0S2V5KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0QWN0aXZlSXRlbSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlS2V5RXZlbnRTdHJlYW0ubmV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy52aWV3cG9ydFJ1bGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3cG9ydFN1YnNjcmlwdGlvbiA9IHRoaXMudmlld3BvcnRSdWxlci5jaGFuZ2UoKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wYW5lbE9wZW4gJiYgb3ZlcmxheVJlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVJlZi51cGRhdGVTaXplKHsgd2lkdGg6IHRoaXMuZ2V0UGFuZWxXaWR0aCgpIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IG92ZXJsYXlSZWYuZ2V0Q29uZmlnKCkucG9zaXRpb25TdHJhdGVneSBhcyBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3k7XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgdHJpZ2dlciwgcGFuZWwgd2lkdGggYW5kIGRpcmVjdGlvbiwgaW4gY2FzZSBhbnl0aGluZyBoYXMgY2hhbmdlZC5cbiAgICAgICAgICAgIHBvc2l0aW9uLnNldE9yaWdpbih0aGlzLmdldENvbm5lY3RlZEVsZW1lbnQoKSk7XG4gICAgICAgICAgICBvdmVybGF5UmVmLnVwZGF0ZVNpemUoeyB3aWR0aDogdGhpcy5nZXRQYW5lbFdpZHRoKCkgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3ZlcmxheVJlZiAmJiAhb3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgICBvdmVybGF5UmVmLmF0dGFjaCh0aGlzLnBvcnRhbCk7XG4gICAgICAgICAgICB0aGlzLmNsb3NpbmdBY3Rpb25zU3Vic2NyaXB0aW9uID0gdGhpcy5zdWJzY3JpYmVUb0Nsb3NpbmdBY3Rpb25zKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB3YXNPcGVuID0gdGhpcy5wYW5lbE9wZW47XG5cbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGUuc2V0VmlzaWJpbGl0eSgpO1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5pc09wZW4gPSB0aGlzLm92ZXJsYXlBdHRhY2hlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gV2UgbmVlZCB0byBkbyBhbiBleHRyYSBgcGFuZWxPcGVuYCBjaGVjayBpbiBoZXJlLCBiZWNhdXNlIHRoZVxuICAgICAgICAvLyBhdXRvY29tcGxldGUgd29uJ3QgYmUgc2hvd24gaWYgdGhlcmUgYXJlIG5vIG9wdGlvbnMuXG4gICAgICAgIGlmICh0aGlzLnBhbmVsT3BlbiAmJiB3YXNPcGVuICE9PSB0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUub3BlbmVkLmVtaXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0T3ZlcmxheUNvbmZpZygpOiBPdmVybGF5Q29uZmlnIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPdmVybGF5Q29uZmlnKHtcbiAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMuZ2V0T3ZlcmxheVBvc2l0aW9uKCksXG4gICAgICAgICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5zY3JvbGxTdHJhdGVneSgpLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMuZ2V0UGFuZWxXaWR0aCgpLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiB0aGlzLmRpclxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE92ZXJsYXlQb3NpdGlvbigpOiBQb3NpdGlvblN0cmF0ZWd5IHtcbiAgICAgICAgdGhpcy5wb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5vdmVybGF5LnBvc2l0aW9uKClcbiAgICAgICAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHRoaXMuZ2V0Q29ubmVjdGVkRWxlbWVudCgpKVxuICAgICAgICAgICAgLndpdGhGbGV4aWJsZURpbWVuc2lvbnMoZmFsc2UpXG4gICAgICAgICAgICAud2l0aFB1c2goZmFsc2UpXG4gICAgICAgICAgICAud2l0aFBvc2l0aW9ucyhbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAndG9wJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5ZOiAndG9wJyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJyxcblxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgb3ZlcmxheSBlZGdlIGNvbm5lY3RlZCB0byB0aGUgdHJpZ2dlciBzaG91bGQgaGF2ZSBzcXVhcmVkIGNvcm5lcnMsIHdoaWxlXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBvcHBvc2l0ZSBlbmQgaGFzIHJvdW5kZWQgY29ybmVycy4gV2UgYXBwbHkgYSBDU1MgY2xhc3MgdG8gc3dhcCB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gYm9yZGVyLXJhZGl1cyBiYXNlZCBvbiB0aGUgb3ZlcmxheSBwb3NpdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgcGFuZWxDbGFzczogJ21jLWF1dG9jb21wbGV0ZS1wYW5lbC1hYm92ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdIGFzIENvbm5lY3RlZFBvc2l0aW9uW10pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uU3RyYXRlZ3k7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDb25uZWN0ZWRFbGVtZW50KCk6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+IHtcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkVG8pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RlZFRvLmVsZW1lbnRSZWY7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtRmllbGQgPyB0aGlzLmZvcm1GaWVsZC5nZXRDb25uZWN0ZWRPdmVybGF5T3JpZ2luKCkgOiB0aGlzLmVsZW1lbnRSZWY7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRQYW5lbFdpZHRoKCk6IG51bWJlciB8IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmF1dG9jb21wbGV0ZS5wYW5lbFdpZHRoIHx8IHRoaXMuZ2V0SG9zdFdpZHRoKCkgLSBBVVRPQ09NUExFVEVfQk9SREVSX1dJRFRIO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SG9zdFdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbm5lY3RlZEVsZW1lbnQoKS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgYWN0aXZlIGl0ZW0gdG8gLTEgc28gYXJyb3cgZXZlbnRzIHdpbGwgYWN0aXZhdGUgdGhlXG4gICAgICogY29ycmVjdCBvcHRpb25zLCBvciB0byAwIGlmIHRoZSBjb25zdW1lciBvcHRlZCBpbnRvIGl0LlxuICAgICAqL1xuICAgIHByaXZhdGUgcmVzZXRBY3RpdmVJdGVtKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5hdXRvY29tcGxldGUuYXV0b0FjdGl2ZUZpcnN0T3B0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5rZXlNYW5hZ2VyLnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKC0xKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2FuT3BlbigpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIHJldHVybiAhZWxlbWVudC5yZWFkT25seSAmJiAhZWxlbWVudC5kaXNhYmxlZCAmJiAhdGhpcy5fYXV0b2NvbXBsZXRlRGlzYWJsZWQ7XG4gICAgfVxufVxuIl19