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
        this.autocomplete.keyManager.setActiveItem(this.autocomplete.autoActiveFirstOption ? 0 : -1);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLXRyaWdnZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUtdHJpZ2dlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFHSCxPQUFPLEVBQ1AsYUFBYSxFQUloQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDSCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixVQUFVLEVBQ1YsSUFBSSxFQUNKLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BGLE9BQU8sRUFDSCw0QkFBNEIsRUFDNUIsdUJBQXVCLEVBRXZCLHVCQUF1QixFQUMxQixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFF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Z0JBQzNELElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUseUJBQXlCO29CQUNoQyxxQkFBcUIsRUFBRSx1QkFBdUI7b0JBQzlDLDRFQUE0RTtvQkFDNUUsa0ZBQWtGO29CQUNsRixXQUFXLEVBQUUsZUFBZTtvQkFDNUIsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFNBQVMsRUFBRSxxQkFBcUI7b0JBQ2hDLFdBQVcsRUFBRSx1QkFBdUI7b0JBQ3BDLFNBQVMsRUFBRSxxQkFBcUI7aUJBQ25DO2dCQUNELFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO2FBQy9DOzs7O1lBNUZHLFVBQVU7WUFTVixnQkFBZ0I7WUFYaEIsaUJBQWlCO1lBVmpCLE9BQU87WUFrQlAsTUFBTTs0Q0FzTEQsTUFBTSxTQUFDLCtCQUErQjtZQTdNdEMsY0FBYyx1QkE4TWQsUUFBUTtZQTFLUixXQUFXLHVCQTJLWCxRQUFRLFlBQUksSUFBSTs0Q0FDaEIsUUFBUSxZQUFJLE1BQU0sU0FBQyxRQUFRO1lBcE0zQixhQUFhOzs7MkJBOEhqQixLQUFLLFNBQUMsZ0JBQWdCOzBCQU10QixLQUFLLFNBQUMsMkJBQTJCO29DQU1qQyxLQUFLLFNBQUMsY0FBYzttQ0FNcEIsS0FBSyxTQUFDLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQ29ubmVjdGVkUG9zaXRpb24sXG4gICAgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5LFxuICAgIE92ZXJsYXksXG4gICAgT3ZlcmxheUNvbmZpZyxcbiAgICBPdmVybGF5UmVmLFxuICAgIFBvc2l0aW9uU3RyYXRlZ3ksXG4gICAgU2Nyb2xsU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgVGVtcGxhdGVQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IFZpZXdwb3J0UnVsZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgZm9yd2FyZFJlZixcbiAgICBIb3N0LFxuICAgIEluamVjdCxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxuICAgIE9wdGlvbmFsLFxuICAgIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBET1dOX0FSUk9XLCBFTlRFUiwgRVNDQVBFLCBUQUIsIFVQX0FSUk9XIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gICAgY291bnRHcm91cExhYmVsc0JlZm9yZU9wdGlvbixcbiAgICBnZXRPcHRpb25TY3JvbGxQb3NpdGlvbixcbiAgICBNY09wdGlvbixcbiAgICBNY09wdGlvblNlbGVjdGlvbkNoYW5nZVxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0Zvcm1GaWVsZCB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9mb3JtLWZpZWxkJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgZGVmZXIsIGZyb21FdmVudCwgbWVyZ2UsIG9mIGFzIG9ic2VydmFibGVPZiwgU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlLCBzd2l0Y2hNYXAsIGRlbGF5LCB0YXAsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWNBdXRvY29tcGxldGVPcmlnaW4gfSBmcm9tICcuL2F1dG9jb21wbGV0ZS1vcmlnaW4uZGlyZWN0aXZlJztcbmltcG9ydCB7IE1jQXV0b2NvbXBsZXRlIH0gZnJvbSAnLi9hdXRvY29tcGxldGUuY29tcG9uZW50JztcblxuXG4vKipcbiAqIFRoZSBmb2xsb3dpbmcgc3R5bGUgY29uc3RhbnRzIGFyZSBuZWNlc3NhcnkgdG8gc2F2ZSBoZXJlIGluIG9yZGVyXG4gKiB0byBwcm9wZXJseSBjYWxjdWxhdGUgdGhlIHNjcm9sbFRvcCBvZiB0aGUgcGFuZWwuIEJlY2F1c2Ugd2UgYXJlIG5vdFxuICogYWN0dWFsbHkgZm9jdXNpbmcgdGhlIGFjdGl2ZSBpdGVtLCBzY3JvbGwgbXVzdCBiZSBoYW5kbGVkIG1hbnVhbGx5LlxuICovXG5cbi8qKiBUaGUgaGVpZ2h0IG9mIGVhY2ggYXV0b2NvbXBsZXRlIG9wdGlvbi4gKi9cbmV4cG9ydCBjb25zdCBBVVRPQ09NUExFVEVfT1BUSU9OX0hFSUdIVCA9IDMyO1xuXG4vKiogVGhlIHRvdGFsIGhlaWdodCBvZiB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsLiAqL1xuZXhwb3J0IGNvbnN0IEFVVE9DT01QTEVURV9QQU5FTF9IRUlHSFQgPSAyNTY7XG5cbmV4cG9ydCBjb25zdCBBVVRPQ09NUExFVEVfQk9SREVSX1dJRFRIOiBudW1iZXIgPSAyO1xuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgZGV0ZXJtaW5lcyB0aGUgc2Nyb2xsIGhhbmRsaW5nIHdoaWxlIHRoZSBhdXRvY29tcGxldGUgcGFuZWwgaXMgb3Blbi4gKi9cbmV4cG9ydCBjb25zdCBNQ19BVVRPQ09NUExFVEVfU0NST0xMX1NUUkFURUdZID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+KCdtYy1hdXRvY29tcGxldGUtc2Nyb2xsLXN0cmF0ZWd5Jyk7XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGZ1bmN0aW9uIE1DX0FVVE9DT01QTEVURV9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWShvdmVybGF5OiBPdmVybGF5KTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3kge1xuICAgIHJldHVybiAoKSA9PiBvdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbigpO1xufVxuXG5leHBvcnQgY29uc3QgTUNfQVVUT0NPTVBMRVRFX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSID0ge1xuICAgIHByb3ZpZGU6IE1DX0FVVE9DT01QTEVURV9TQ1JPTExfU1RSQVRFR1ksXG4gICAgZGVwczogW092ZXJsYXldLFxuICAgIHVzZUZhY3Rvcnk6IE1DX0FVVE9DT01QTEVURV9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWVxufTtcblxuLyoqXG4gKiBQcm92aWRlciB0aGF0IGFsbG93cyB0aGUgYXV0b2NvbXBsZXRlIHRvIHJlZ2lzdGVyIGFzIGEgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBNQVRfQVVUT0NPTVBMRVRFX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWNBdXRvY29tcGxldGVUcmlnZ2VyKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGVycm9yIHRvIGJlIHRocm93biB3aGVuIGF0dGVtcHRpbmcgdG8gdXNlIGFuIGF1dG9jb21wbGV0ZSB0cmlnZ2VyIHdpdGhvdXQgYSBwYW5lbC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1jQXV0b2NvbXBsZXRlTWlzc2luZ1BhbmVsRXJyb3IoKTogRXJyb3Ige1xuICAgIHJldHVybiBFcnJvcignQXR0ZW1wdGluZyB0byBvcGVuIGFuIHVuZGVmaW5lZCBpbnN0YW5jZSBvZiBgbWMtYXV0b2NvbXBsZXRlYC4gJyArXG4gICAgICAgICdNYWtlIHN1cmUgdGhhdCB0aGUgaWQgcGFzc2VkIHRvIHRoZSBgbWNBdXRvY29tcGxldGVgIGlzIGNvcnJlY3QgYW5kIHRoYXQgJyArXG4gICAgICAgICd5b3VcXCdyZSBhdHRlbXB0aW5nIHRvIG9wZW4gaXQgYWZ0ZXIgdGhlIG5nQWZ0ZXJDb250ZW50SW5pdCBob29rLicpO1xufVxuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBgaW5wdXRbbWNBdXRvY29tcGxldGVdLCB0ZXh0YXJlYVttY0F1dG9jb21wbGV0ZV1gLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1hdXRvY29tcGxldGUtdHJpZ2dlcicsXG4gICAgICAgICdbYXR0ci5hdXRvY29tcGxldGVdJzogJ2F1dG9jb21wbGV0ZUF0dHJpYnV0ZScsXG4gICAgICAgIC8vIE5vdGU6IHdlIHVzZSBgZm9jdXNpbmAsIGFzIG9wcG9zZWQgdG8gYGZvY3VzYCwgaW4gb3JkZXIgdG8gb3BlbiB0aGUgcGFuZWxcbiAgICAgICAgLy8gYSBsaXR0bGUgZWFybGllci4gVGhpcyBhdm9pZHMgaXNzdWVzIHdoZXJlIElFIGRlbGF5cyB0aGUgZm9jdXNpbmcgb2YgdGhlIGlucHV0LlxuICAgICAgICAnKGZvY3VzaW4pJzogJ2hhbmRsZUZvY3VzKCknLFxuICAgICAgICAnKGJsdXIpJzogJ29uVG91Y2hlZCgpJyxcbiAgICAgICAgJyhpbnB1dCknOiAnaGFuZGxlSW5wdXQoJGV2ZW50KScsXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyhjbGljayknOiAnaGFuZGxlQ2xpY2soJGV2ZW50KSdcbiAgICB9LFxuICAgIGV4cG9ydEFzOiAnbWNBdXRvY29tcGxldGVUcmlnZ2VyJyxcbiAgICBwcm92aWRlcnM6IFtNQVRfQVVUT0NPTVBMRVRFX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBNY0F1dG9jb21wbGV0ZVRyaWdnZXIgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95IHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcmVhZG9ubHkgb3B0aW9uU2VsZWN0aW9uczogT2JzZXJ2YWJsZTxNY09wdGlvblNlbGVjdGlvbkNoYW5nZT4gPSBkZWZlcigoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9jb21wbGV0ZSAmJiB0aGlzLmF1dG9jb21wbGV0ZS5vcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gbWVyZ2UoLi4udGhpcy5hdXRvY29tcGxldGUub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gb3B0aW9uLm9uU2VsZWN0aW9uQ2hhbmdlKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgYW55IHN1YnNjcmliZXJzIGJlZm9yZSBgbmdBZnRlclZpZXdJbml0YCwgdGhlIGBhdXRvY29tcGxldGVgIHdpbGwgYmUgdW5kZWZpbmVkLlxuICAgICAgICAvLyBSZXR1cm4gYSBzdHJlYW0gdGhhdCB3ZSdsbCByZXBsYWNlIHdpdGggdGhlIHJlYWwgb25lIG9uY2UgZXZlcnl0aGluZyBpcyBpbiBwbGFjZS5cbiAgICAgICAgcmV0dXJuIHRoaXMuem9uZS5vblN0YWJsZVxuICAgICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpLCBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5vcHRpb25TZWxlY3Rpb25zKSk7XG4gICAgfSk7XG5cbiAgICAvKiogVGhlIGN1cnJlbnRseSBhY3RpdmUgb3B0aW9uLCBjb2VyY2VkIHRvIE1hdE9wdGlvbiB0eXBlLiAqL1xuICAgIGdldCBhY3RpdmVPcHRpb24oKTogTWNPcHRpb24gfCBudWxsIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b2NvbXBsZXRlICYmIHRoaXMuYXV0b2NvbXBsZXRlLmtleU1hbmFnZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmF1dG9jb21wbGV0ZS5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgcGFuZWxPcGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5QXR0YWNoZWQgJiYgdGhpcy5hdXRvY29tcGxldGUuc2hvd1BhbmVsO1xuICAgIH1cblxuICAgIC8qKiBUaGUgYXV0b2NvbXBsZXRlIHBhbmVsIHRvIGJlIGF0dGFjaGVkIHRvIHRoaXMgdHJpZ2dlci4gKi9cbiAgICBASW5wdXQoJ21jQXV0b2NvbXBsZXRlJykgYXV0b2NvbXBsZXRlOiBNY0F1dG9jb21wbGV0ZTtcblxuICAgIC8qKlxuICAgICAqIFJlZmVyZW5jZSByZWxhdGl2ZSB0byB3aGljaCB0byBwb3NpdGlvbiB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsLlxuICAgICAqIERlZmF1bHRzIHRvIHRoZSBhdXRvY29tcGxldGUgdHJpZ2dlciBlbGVtZW50LlxuICAgICAqL1xuICAgIEBJbnB1dCgnbWNBdXRvY29tcGxldGVDb25uZWN0ZWRUbycpIGNvbm5lY3RlZFRvOiBNY0F1dG9jb21wbGV0ZU9yaWdpbjtcblxuICAgIC8qKlxuICAgICAqIGBhdXRvY29tcGxldGVgIGF0dHJpYnV0ZSB0byBiZSBzZXQgb24gdGhlIGlucHV0IGVsZW1lbnQuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgnYXV0b2NvbXBsZXRlJykgYXV0b2NvbXBsZXRlQXR0cmlidXRlOiBzdHJpbmcgPSAnb2ZmJztcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGF1dG9jb21wbGV0ZSBpcyBkaXNhYmxlZC4gV2hlbiBkaXNhYmxlZCwgdGhlIGVsZW1lbnQgd2lsbFxuICAgICAqIGFjdCBhcyBhIHJlZ3VsYXIgaW5wdXQgYW5kIHRoZSB1c2VyIHdvbid0IGJlIGFibGUgdG8gb3BlbiB0aGUgcGFuZWwuXG4gICAgICovXG4gICAgQElucHV0KCdtY0F1dG9jb21wbGV0ZURpc2FibGVkJylcbiAgICBnZXQgYXV0b2NvbXBsZXRlRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRvY29tcGxldGVEaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgYXV0b2NvbXBsZXRlRGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fYXV0b2NvbXBsZXRlRGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2F1dG9jb21wbGV0ZURpc2FibGVkID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIG92ZXJsYXlBdHRhY2hlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBvdmVybGF5UmVmOiBPdmVybGF5UmVmIHwgbnVsbDtcblxuICAgIHByaXZhdGUgcG9ydGFsOiBUZW1wbGF0ZVBvcnRhbDtcblxuICAgIHByaXZhdGUgY29tcG9uZW50RGVzdHJveWVkID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIHNjcm9sbFN0cmF0ZWd5OiAoKSA9PiBTY3JvbGxTdHJhdGVneTtcblxuICAgIC8qKiBPbGQgdmFsdWUgb2YgdGhlIG5hdGl2ZSBpbnB1dC4gVXNlZCB0byB3b3JrIGFyb3VuZCBpc3N1ZXMgd2l0aCB0aGUgYGlucHV0YCBldmVudCBvbiBJRS4gKi9cbiAgICBwcml2YXRlIHByZXZpb3VzVmFsdWU6IHN0cmluZyB8IG51bWJlciB8IG51bGw7XG5cbiAgICAvKiogU3RyYXRlZ3kgdGhhdCBpcyB1c2VkIHRvIHBvc2l0aW9uIHRoZSBwYW5lbC4gKi9cbiAgICBwcml2YXRlIHBvc2l0aW9uU3RyYXRlZ3k6IEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneTtcblxuICAgIC8qKiBUaGUgc3Vic2NyaXB0aW9uIGZvciBjbG9zaW5nIGFjdGlvbnMgKHNvbWUgYXJlIGJvdW5kIHRvIGRvY3VtZW50KS4gKi9cbiAgICBwcml2YXRlIGNsb3NpbmdBY3Rpb25zU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICAvKiogU3Vic2NyaXB0aW9uIHRvIHZpZXdwb3J0IHNpemUgY2hhbmdlcy4gKi9cbiAgICBwcml2YXRlIHZpZXdwb3J0U3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgYXV0b2NvbXBsZXRlIGNhbiBvcGVuIHRoZSBuZXh0IHRpbWUgaXQgaXMgZm9jdXNlZC4gVXNlZCB0byBwcmV2ZW50IGEgZm9jdXNlZCxcbiAgICAgKiBjbG9zZWQgYXV0b2NvbXBsZXRlIGZyb20gYmVpbmcgcmVvcGVuZWQgaWYgdGhlIHVzZXIgc3dpdGNoZXMgdG8gYW5vdGhlciBicm93c2VyIHRhYiBhbmQgdGhlblxuICAgICAqIGNvbWVzIGJhY2suXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYW5PcGVuT25OZXh0Rm9jdXMgPSB0cnVlO1xuXG4gICAgLyoqIFN0cmVhbSBvZiBrZXlib2FyZCBldmVudHMgdGhhdCBjYW4gY2xvc2UgdGhlIHBhbmVsLiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY2xvc2VLZXlFdmVudFN0cmVhbSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LFxuICAgICAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgICAgICBASW5qZWN0KE1DX0FVVE9DT01QTEVURV9TQ1JPTExfU1RSQVRFR1kpIHNjcm9sbFN0cmF0ZWd5OiBhbnksXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBwcml2YXRlIGZvcm1GaWVsZDogTWNGb3JtRmllbGQsXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcbiAgICAgICAgLy8gQGJyZWFraW5nLWNoYW5nZSA4LjAuMCBNYWtlIGBfdmlld3BvcnRSdWxlcmAgcmVxdWlyZWQuXG4gICAgICAgIHByaXZhdGUgdmlld3BvcnRSdWxlcj86IFZpZXdwb3J0UnVsZXJcbiAgICApIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG5vLXR5cGVvZi11bmRlZmluZWRcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMud2luZG93Qmx1ckhhbmRsZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjcm9sbFN0cmF0ZWd5ID0gc2Nyb2xsU3RyYXRlZ3k7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBuby10eXBlb2YtdW5kZWZpbmVkXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLndpbmRvd0JsdXJIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmlld3BvcnRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnREZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmRlc3Ryb3lQYW5lbCgpO1xuICAgICAgICB0aGlzLmNsb3NlS2V5RXZlbnRTdHJlYW0uY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKiogYFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gdmFsdWUgY2hhbmdlc2AgKi9cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgICBvbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAgIC8qKiBgVmlldyAtPiBtb2RlbCBjYWxsYmFjayBjYWxsZWQgd2hlbiBhdXRvY29tcGxldGUgaGFzIGJlZW4gdG91Y2hlZGAgKi9cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgICBvblRvdWNoZWQ6ICgpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAgIC8qKiBPcGVucyB0aGUgYXV0b2NvbXBsZXRlIHN1Z2dlc3Rpb24gcGFuZWwuICovXG4gICAgb3BlblBhbmVsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmF0dGFjaE92ZXJsYXkoKTtcbiAgICB9XG5cbiAgICBjbG9zZVBhbmVsKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheUF0dGFjaGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmICh0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUuY2xvc2VkLmVtaXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLmlzT3BlbiA9IHRoaXMub3ZlcmxheUF0dGFjaGVkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVJlZiAmJiB0aGlzLm92ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgICAgICAgICAgdGhpcy5jbG9zaW5nQWN0aW9uc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTm90ZSB0aGF0IGluIHNvbWUgY2FzZXMgdGhpcyBjYW4gZW5kIHVwIGJlaW5nIGNhbGxlZCBhZnRlciB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZC5cbiAgICAgICAgLy8gQWRkIGEgY2hlY2sgdG8gZW5zdXJlIHRoYXQgd2UgZG9uJ3QgdHJ5IHRvIHJ1biBjaGFuZ2UgZGV0ZWN0aW9uIG9uIGEgZGVzdHJveWVkIHZpZXcuXG4gICAgICAgIGlmICghdGhpcy5jb21wb25lbnREZXN0cm95ZWQpIHtcbiAgICAgICAgICAgIC8vIFdlIG5lZWQgdG8gdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uIG1hbnVhbGx5LCBiZWNhdXNlXG4gICAgICAgICAgICAvLyBgZnJvbUV2ZW50YCBkb2Vzbid0IHNlZW0gdG8gZG8gaXQgYXQgdGhlIHByb3BlciB0aW1lLlxuICAgICAgICAgICAgLy8gVGhpcyBlbnN1cmVzIHRoYXQgdGhlIGxhYmVsIGlzIHJlc2V0IHdoZW4gdGhlXG4gICAgICAgICAgICAvLyB1c2VyIGNsaWNrcyBvdXRzaWRlLlxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgYXV0b2NvbXBsZXRlIHN1Z2dlc3Rpb24gcGFuZWwgdG8gZW5zdXJlIHRoYXQgaXQgZml0cyBhbGwgb3B0aW9uc1xuICAgICAqIHdpdGhpbiB0aGUgdmlld3BvcnQuXG4gICAgICovXG4gICAgdXBkYXRlUG9zaXRpb24oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlBdHRhY2hlZCkge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmIS51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBzdHJlYW0gb2YgYWN0aW9ucyB0aGF0IHNob3VsZCBjbG9zZSB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsLCBpbmNsdWRpbmdcbiAgICAgKiB3aGVuIGFuIG9wdGlvbiBpcyBzZWxlY3RlZCwgb24gYmx1ciwgYW5kIHdoZW4gVEFCIGlzIHByZXNzZWQuXG4gICAgICovXG4gICAgZ2V0IHBhbmVsQ2xvc2luZ0FjdGlvbnMoKTogT2JzZXJ2YWJsZTxNY09wdGlvblNlbGVjdGlvbkNoYW5nZSB8IG51bGw+IHtcbiAgICAgICAgcmV0dXJuIG1lcmdlKFxuICAgICAgICAgICAgdGhpcy5vcHRpb25TZWxlY3Rpb25zLFxuICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUua2V5TWFuYWdlci50YWJPdXQucGlwZShmaWx0ZXIoKCkgPT4gdGhpcy5vdmVybGF5QXR0YWNoZWQpKSxcbiAgICAgICAgICAgIHRoaXMuY2xvc2VLZXlFdmVudFN0cmVhbSxcbiAgICAgICAgICAgIHRoaXMuZ2V0T3V0c2lkZUNsaWNrU3RyZWFtKCksXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYgP1xuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2htZW50cygpLnBpcGUoZmlsdGVyKCgpID0+IHRoaXMub3ZlcmxheUF0dGFjaGVkKSkgOlxuICAgICAgICAgICAgICAgIG9ic2VydmFibGVPZigpXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICAgIC8vIE5vcm1hbGl6ZSB0aGUgb3V0cHV0IHNvIHdlIHJldHVybiBhIGNvbnNpc3RlbnQgdHlwZS5cbiAgICAgICAgICAgIG1hcCgoZXZlbnQpID0+IGV2ZW50IGluc3RhbmNlb2YgTWNPcHRpb25TZWxlY3Rpb25DaGFuZ2UgPyBldmVudCA6IG51bGwpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4gdGhpcy5zZXRUcmlnZ2VyVmFsdWUodmFsdWUpKTtcbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB7fSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgZGVwcmVjYXRpb25cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG5cbiAgICAgICAgLy8gUHJldmVudCB0aGUgZGVmYXVsdCBhY3Rpb24gb24gYWxsIGVzY2FwZSBrZXkgcHJlc3Nlcy4gVGhpcyBpcyBoZXJlIHByaW1hcmlseSB0byBicmluZyBJRVxuICAgICAgICAvLyBpbiBsaW5lIHdpdGggb3RoZXIgYnJvd3NlcnMuIEJ5IGRlZmF1bHQsIHByZXNzaW5nIGVzY2FwZSBvbiBJRSB3aWxsIGNhdXNlIGl0IHRvIHJldmVydFxuICAgICAgICAvLyB0aGUgaW5wdXQgdmFsdWUgdG8gdGhlIG9uZSB0aGF0IGl0IGhhZCBvbiBmb2N1cywgaG93ZXZlciBpdCB3b24ndCBkaXNwYXRjaCBhbnkgZXZlbnRzXG4gICAgICAgIC8vIHdoaWNoIG1lYW5zIHRoYXQgdGhlIG1vZGVsIHZhbHVlIHdpbGwgYmUgb3V0IG9mIHN5bmMgd2l0aCB0aGUgdmlldy5cbiAgICAgICAgaWYgKGtleUNvZGUgPT09IEVTQ0FQRSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZU9wdGlvbiAmJiBrZXlDb2RlID09PSBFTlRFUiAmJiB0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVPcHRpb24uc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTtcbiAgICAgICAgICAgIHRoaXMucmVzZXRBY3RpdmVJdGVtKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXV0b2NvbXBsZXRlKSB7XG4gICAgICAgICAgICBjb25zdCBwcmV2QWN0aXZlSXRlbSA9IHRoaXMuYXV0b2NvbXBsZXRlLmtleU1hbmFnZXIuYWN0aXZlSXRlbTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucGFuZWxPcGVuIHx8IGtleUNvZGUgPT09IFRBQikge1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLm9uS2V5ZG93bihldmVudCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IERPV05fQVJST1cgJiYgdGhpcy5jYW5PcGVuKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBpc0Fycm93S2V5ID0ga2V5Q29kZSA9PT0gVVBfQVJST1cgfHwga2V5Q29kZSA9PT0gRE9XTl9BUlJPVztcblxuICAgICAgICAgICAgaWYgKGlzQXJyb3dLZXkgfHwgdGhpcy5hdXRvY29tcGxldGUua2V5TWFuYWdlci5hY3RpdmVJdGVtICE9PSBwcmV2QWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9PcHRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUlucHV0KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgICBsZXQgdmFsdWU6IG51bWJlciB8IHN0cmluZyB8IG51bGwgPSB0YXJnZXQudmFsdWU7XG5cbiAgICAgICAgLy8gQmFzZWQgb24gYE51bWJlclZhbHVlQWNjZXNzb3JgIGZyb20gZm9ybXMuXG4gICAgICAgIGlmICh0YXJnZXQudHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgPT09ICcnID8gbnVsbCA6IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlIGlucHV0IGhhcyBhIHBsYWNlaG9sZGVyLCBJRSB3aWxsIGZpcmUgdGhlIGBpbnB1dGAgZXZlbnQgb24gcGFnZSBsb2FkLFxuICAgICAgICAvLyBmb2N1cyBhbmQgYmx1ciwgaW4gYWRkaXRpb24gdG8gd2hlbiB0aGUgdXNlciBhY3R1YWxseSBjaGFuZ2VkIHRoZSB2YWx1ZS4gVG9cbiAgICAgICAgLy8gZmlsdGVyIG91dCBhbGwgb2YgdGhlIGV4dHJhIGV2ZW50cywgd2Ugc2F2ZSB0aGUgdmFsdWUgb24gZm9jdXMgYW5kIGJldHdlZW5cbiAgICAgICAgLy8gYGlucHV0YCBldmVudHMsIGFuZCB3ZSBjaGVjayB3aGV0aGVyIGl0IGNoYW5nZWQuXG4gICAgICAgIC8vIFNlZTogaHR0cHM6Ly9jb25uZWN0Lm1pY3Jvc29mdC5jb20vSUUvZmVlZGJhY2svZGV0YWlscy84ODU3NDcvXG4gICAgICAgIGlmICh0aGlzLnByZXZpb3VzVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jYW5PcGVuKCkgJiYgdGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5jYW5PcGVuT25OZXh0Rm9jdXMpIHtcbiAgICAgICAgICAgIHRoaXMuY2FuT3Blbk9uTmV4dEZvY3VzID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNhbk9wZW4oKSkge1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91c1ZhbHVlID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaE92ZXJsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKCRldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5jYW5PcGVuKCkgJiYgdGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSAkZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFN0cmVhbSBvZiBjbGlja3Mgb3V0c2lkZSBvZiB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsLiAqL1xuICAgIHByaXZhdGUgZ2V0T3V0c2lkZUNsaWNrU3RyZWFtKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBtZXJnZShcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW5uZWNlc3NhcnktdHlwZS1hc3NlcnRpb25cbiAgICAgICAgICAgIGZyb21FdmVudCh0aGlzLmRvY3VtZW50LCAnY2xpY2snKSBhcyBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+LFxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bm5lY2Vzc2FyeS10eXBlLWFzc2VydGlvblxuICAgICAgICAgICAgZnJvbUV2ZW50KHRoaXMuZG9jdW1lbnQsICd0b3VjaGVuZCcpIGFzIE9ic2VydmFibGU8VG91Y2hFdmVudD5cbiAgICAgICAgKVxuICAgICAgICAgICAgLnBpcGUoZmlsdGVyKChldmVudCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgY2xpY2tUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybUZpZWxkID0gdGhpcy5mb3JtRmllbGQgPyB0aGlzLmZvcm1GaWVsZC5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IDogbnVsbDtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXN0b21PcmlnaW4gPSB0aGlzLmNvbm5lY3RlZFRvID8gdGhpcy5jb25uZWN0ZWRUby5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheUF0dGFjaGVkICYmXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrVGFyZ2V0ICE9PSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCAmJlxuICAgICAgICAgICAgICAgICAgICAoIWZvcm1GaWVsZCB8fCAhZm9ybUZpZWxkLmNvbnRhaW5zKGNsaWNrVGFyZ2V0KSkgJiZcbiAgICAgICAgICAgICAgICAgICAgKCFjdXN0b21PcmlnaW4gfHwgIWN1c3RvbU9yaWdpbi5jb250YWlucyhjbGlja1RhcmdldCkpICYmXG4gICAgICAgICAgICAgICAgICAgICghIXRoaXMub3ZlcmxheVJlZiAmJiAhdGhpcy5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LmNvbnRhaW5zKGNsaWNrVGFyZ2V0KSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXZlbnQgaGFuZGxlciBmb3Igd2hlbiB0aGUgd2luZG93IGlzIGJsdXJyZWQuIE5lZWRzIHRvIGJlIGFuXG4gICAgICogYXJyb3cgZnVuY3Rpb24gaW4gb3JkZXIgdG8gcHJlc2VydmUgdGhlIGNvbnRleHQuXG4gICAgICovXG4gICAgcHJpdmF0ZSB3aW5kb3dCbHVySGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgLy8gSWYgdGhlIHVzZXIgYmx1cnJlZCB0aGUgd2luZG93IHdoaWxlIHRoZSBhdXRvY29tcGxldGUgaXMgZm9jdXNlZCwgaXQgbWVhbnMgdGhhdCBpdCdsbCBiZVxuICAgICAgICAvLyByZWZvY3VzZWQgd2hlbiB0aGV5IGNvbWUgYmFjay4gSW4gdGhpcyBjYXNlIHdlIHdhbnQgdG8gc2tpcCB0aGUgZmlyc3QgZm9jdXMgZXZlbnQsIGlmIHRoZVxuICAgICAgICAvLyBwYW5lIHdhcyBjbG9zZWQsIGluIG9yZGVyIHRvIGF2b2lkIHJlb3BlbmluZyBpdCB1bmludGVudGlvbmFsbHkuXG4gICAgICAgIHRoaXMuY2FuT3Blbk9uTmV4dEZvY3VzID0gdGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCB8fCB0aGlzLnBhbmVsT3BlbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHaXZlbiB0aGF0IHdlIGFyZSBub3QgYWN0dWFsbHkgZm9jdXNpbmcgYWN0aXZlIG9wdGlvbnMsIHdlIG11c3QgbWFudWFsbHkgYWRqdXN0IHNjcm9sbFxuICAgICAqIHRvIHJldmVhbCBvcHRpb25zIGJlbG93IHRoZSBmb2xkLiBGaXJzdCwgd2UgZmluZCB0aGUgb2Zmc2V0IG9mIHRoZSBvcHRpb24gZnJvbSB0aGUgdG9wXG4gICAgICogb2YgdGhlIHBhbmVsLiBJZiB0aGF0IG9mZnNldCBpcyBiZWxvdyB0aGUgZm9sZCwgdGhlIG5ldyBzY3JvbGxUb3Agd2lsbCBiZSB0aGUgb2Zmc2V0IC1cbiAgICAgKiB0aGUgcGFuZWwgaGVpZ2h0ICsgdGhlIG9wdGlvbiBoZWlnaHQsIHNvIHRoZSBhY3RpdmUgb3B0aW9uIHdpbGwgYmUganVzdCB2aXNpYmxlIGF0IHRoZVxuICAgICAqIGJvdHRvbSBvZiB0aGUgcGFuZWwuIElmIHRoYXQgb2Zmc2V0IGlzIGFib3ZlIHRoZSB0b3Agb2YgdGhlIHZpc2libGUgcGFuZWwsIHRoZSBuZXcgc2Nyb2xsVG9wXG4gICAgICogd2lsbCBiZWNvbWUgdGhlIG9mZnNldC4gSWYgdGhhdCBvZmZzZXQgaXMgdmlzaWJsZSB3aXRoaW4gdGhlIHBhbmVsIGFscmVhZHksIHRoZSBzY3JvbGxUb3AgaXNcbiAgICAgKiBub3QgYWRqdXN0ZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzY3JvbGxUb09wdGlvbigpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmF1dG9jb21wbGV0ZS5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCB8fCAwO1xuICAgICAgICBjb25zdCBsYWJlbENvdW50ID0gY291bnRHcm91cExhYmVsc0JlZm9yZU9wdGlvbihcbiAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUub3B0aW9ucywgdGhpcy5hdXRvY29tcGxldGUub3B0aW9uR3JvdXBzXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgbmV3U2Nyb2xsUG9zaXRpb24gPSBnZXRPcHRpb25TY3JvbGxQb3NpdGlvbihcbiAgICAgICAgICAgIGluZGV4ICsgbGFiZWxDb3VudCxcbiAgICAgICAgICAgIEFVVE9DT01QTEVURV9PUFRJT05fSEVJR0hULFxuICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUuZ2V0U2Nyb2xsVG9wKCksXG4gICAgICAgICAgICBBVVRPQ09NUExFVEVfUEFORUxfSEVJR0hUXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGUuc2V0U2Nyb2xsVG9wKG5ld1Njcm9sbFBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBsaXN0ZW5zIHRvIGEgc3RyZWFtIG9mIHBhbmVsIGNsb3NpbmcgYWN0aW9ucyBhbmQgcmVzZXRzIHRoZVxuICAgICAqIHN0cmVhbSBldmVyeSB0aW1lIHRoZSBvcHRpb24gbGlzdCBjaGFuZ2VzLlxuICAgICAqL1xuICAgIHByaXZhdGUgc3Vic2NyaWJlVG9DbG9zaW5nQWN0aW9ucygpOiBTdWJzY3JpcHRpb24ge1xuICAgICAgICBjb25zdCBmaXJzdFN0YWJsZSA9IHRoaXMuem9uZS5vblN0YWJsZS5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSk7XG4gICAgICAgIGNvbnN0IG9wdGlvbkNoYW5nZXMgPSB0aGlzLmF1dG9jb21wbGV0ZS5vcHRpb25zLmNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRhcCgoKSA9PiB0aGlzLnBvc2l0aW9uU3RyYXRlZ3kucmVhcHBseUxhc3RQb3NpdGlvbigpKSxcbiAgICAgICAgICAgICAgICAvLyBEZWZlciBlbWl0dGluZyB0byB0aGUgc3RyZWFtIHVudGlsIHRoZSBuZXh0IHRpY2ssIGJlY2F1c2UgY2hhbmdpbmdcbiAgICAgICAgICAgICAgICAvLyBiaW5kaW5ncyBpbiBoZXJlIHdpbGwgY2F1c2UgXCJjaGFuZ2VkIGFmdGVyIGNoZWNrZWRcIiBlcnJvcnMuXG4gICAgICAgICAgICAgICAgZGVsYXkoMClcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgLy8gV2hlbiB0aGUgem9uZSBpcyBzdGFibGUgaW5pdGlhbGx5LCBhbmQgd2hlbiB0aGUgb3B0aW9uIGxpc3QgY2hhbmdlcy4uLlxuICAgICAgICByZXR1cm4gbWVyZ2UoZmlyc3RTdGFibGUsIG9wdGlvbkNoYW5nZXMpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgYSBuZXcgc3RyZWFtIG9mIHBhbmVsQ2xvc2luZ0FjdGlvbnMsIHJlcGxhY2luZyBhbnkgcHJldmlvdXMgc3RyZWFtc1xuICAgICAgICAgICAgICAgIC8vIHRoYXQgd2VyZSBjcmVhdGVkLCBhbmQgZmxhdHRlbiBpdCBzbyBvdXIgc3RyZWFtIG9ubHkgZW1pdHMgY2xvc2luZyBldmVudHMuLi5cbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB3YXNPcGVuID0gdGhpcy5wYW5lbE9wZW47XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRBY3RpdmVJdGVtKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLnNldFZpc2liaWxpdHkoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiEudXBkYXRlUG9zaXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIGBwYW5lbE9wZW5gIHN0YXRlIGNoYW5nZWQsIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHRvIGVtaXQgdGhlIGBvcGVuZWRgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBldmVudCwgYmVjYXVzZSB3ZSBtYXkgbm90IGhhdmUgZW1pdHRlZCBpdCB3aGVuIHRoZSBwYW5lbCB3YXMgYXR0YWNoZWQuIFRoaXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbiBoYXBwZW4gaWYgdGhlIHVzZXJzIG9wZW5zIHRoZSBwYW5lbCBhbmQgdGhlcmUgYXJlIG5vIG9wdGlvbnMsIGJ1dCB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9wdGlvbnMgY29tZSBpbiBzbGlnaHRseSBsYXRlciBvciBhcyBhIHJlc3VsdCBvZiB0aGUgdmFsdWUgY2hhbmdpbmcuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2FzT3BlbiAhPT0gdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5vcGVuZWQuZW1pdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFuZWxDbG9zaW5nQWN0aW9ucztcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAvLyB3aGVuIHRoZSBmaXJzdCBjbG9zaW5nIGV2ZW50IG9jY3Vycy4uLlxuICAgICAgICAgICAgICAgIHRha2UoMSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC8vIHNldCB0aGUgdmFsdWUsIGNsb3NlIHRoZSBwYW5lbCwgYW5kIGNvbXBsZXRlLlxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQpID0+IHRoaXMuc2V0VmFsdWVBbmRDbG9zZShldmVudCkpO1xuICAgIH1cblxuICAgIC8qKiBEZXN0cm95cyB0aGUgYXV0b2NvbXBsZXRlIHN1Z2dlc3Rpb24gcGFuZWwuICovXG4gICAgcHJpdmF0ZSBkZXN0cm95UGFuZWwoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFRyaWdnZXJWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRvRGlzcGxheSA9IHRoaXMuYXV0b2NvbXBsZXRlICYmIHRoaXMuYXV0b2NvbXBsZXRlLmRpc3BsYXlXaXRoID9cbiAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLmRpc3BsYXlXaXRoKHZhbHVlKSA6XG4gICAgICAgICAgICB2YWx1ZTtcblxuICAgICAgICAvLyBTaW1wbHkgZmFsbGluZyBiYWNrIHRvIGFuIGVtcHR5IHN0cmluZyBpZiB0aGUgZGlzcGxheSB2YWx1ZSBpcyBmYWxzeSBkb2VzIG5vdCB3b3JrIHByb3Blcmx5LlxuICAgICAgICAvLyBUaGUgZGlzcGxheSB2YWx1ZSBjYW4gYWxzbyBiZSB0aGUgbnVtYmVyIHplcm8gYW5kIHNob3VsZG4ndCBmYWxsIGJhY2sgdG8gYW4gZW1wdHkgc3RyaW5nLlxuICAgICAgICBjb25zdCBpbnB1dFZhbHVlID0gdG9EaXNwbGF5ICE9IG51bGwgPyB0b0Rpc3BsYXkgOiAnJztcblxuICAgICAgICAvLyBJZiBpdCdzIHVzZWQgd2l0aGluIGEgYE1hdEZvcm1GaWVsZGAsIHdlIHNob3VsZCBzZXQgaXQgdGhyb3VnaCB0aGUgcHJvcGVydHkgc28gaXQgY2FuIGdvXG4gICAgICAgIC8vIHRocm91Z2ggY2hhbmdlIGRldGVjdGlvbi5cbiAgICAgICAgaWYgKHRoaXMuZm9ybUZpZWxkKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1GaWVsZC5jb250cm9sLnZhbHVlID0gaW5wdXRWYWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlID0gaW5wdXRWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJldmlvdXNWYWx1ZSA9IGlucHV0VmFsdWU7XG4gICAgfVxuXG4gICAgLyoqIFRoaXMgbWV0aG9kIGNsb3NlcyB0aGUgcGFuZWwsIGFuZCBpZiBhIHZhbHVlIGlzIHNwZWNpZmllZCwgYWxzbyBzZXRzIHRoZSBhc3NvY2lhdGVkXG4gICAgICogY29udHJvbCB0byB0aGF0IHZhbHVlLiBJdCB3aWxsIGFsc28gbWFyayB0aGUgY29udHJvbCBhcyBkaXJ0eSBpZiB0aGlzIGludGVyYWN0aW9uXG4gICAgICogc3RlbW1lZCBmcm9tIHRoZSB1c2VyLlxuICAgICAqL1xuICAgIHByaXZhdGUgc2V0VmFsdWVBbmRDbG9zZShldmVudDogTWNPcHRpb25TZWxlY3Rpb25DaGFuZ2UgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5zb3VyY2UpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJQcmV2aW91c1NlbGVjdGVkT3B0aW9uKGV2ZW50LnNvdXJjZSk7XG4gICAgICAgICAgICB0aGlzLnNldFRyaWdnZXJWYWx1ZShldmVudC5zb3VyY2UudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZShldmVudC5zb3VyY2UudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUuZW1pdFNlbGVjdEV2ZW50KGV2ZW50LnNvdXJjZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICB9XG5cbiAgICAvKiogQ2xlYXIgYW55IHByZXZpb3VzIHNlbGVjdGVkIG9wdGlvbiBhbmQgZW1pdCBhIHNlbGVjdGlvbiBjaGFuZ2UgZXZlbnQgZm9yIHRoaXMgb3B0aW9uICovXG4gICAgcHJpdmF0ZSBjbGVhclByZXZpb3VzU2VsZWN0ZWRPcHRpb24oc2tpcDogTWNPcHRpb24pIHtcbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGUub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb24gIT09IHNraXAgJiYgb3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXR0YWNoT3ZlcmxheSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmF1dG9jb21wbGV0ZSkge1xuICAgICAgICAgICAgdGhyb3cgZ2V0TWNBdXRvY29tcGxldGVNaXNzaW5nUGFuZWxFcnJvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG92ZXJsYXlSZWYgPSB0aGlzLm92ZXJsYXlSZWY7XG5cbiAgICAgICAgaWYgKCFvdmVybGF5UmVmKSB7XG4gICAgICAgICAgICB0aGlzLnBvcnRhbCA9IG5ldyBUZW1wbGF0ZVBvcnRhbCh0aGlzLmF1dG9jb21wbGV0ZS50ZW1wbGF0ZSwgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgICAgIG92ZXJsYXlSZWYgPSB0aGlzLm92ZXJsYXkuY3JlYXRlKHRoaXMuZ2V0T3ZlcmxheUNvbmZpZygpKTtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IG92ZXJsYXlSZWY7XG5cbiAgICAgICAgICAgIC8vIFVzZSB0aGUgYGtleWRvd25FdmVudHNgIGluIG9yZGVyIHRvIHRha2UgYWR2YW50YWdlIG9mXG4gICAgICAgICAgICAvLyB0aGUgb3ZlcmxheSBldmVudCB0YXJnZXRpbmcgcHJvdmlkZWQgYnkgdGhlIENESyBvdmVybGF5LlxuICAgICAgICAgICAgb3ZlcmxheVJlZi5rZXlkb3duRXZlbnRzKCkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIENsb3NlIHdoZW4gcHJlc3NpbmcgRVNDQVBFIG9yIEFMVCArIFVQX0FSUk9XLCBiYXNlZCBvbiB0aGUgYTExeSBndWlkZWxpbmVzLlxuICAgICAgICAgICAgICAgIC8vIFNlZTogaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLXByYWN0aWNlcy0xLjEvI3RleHRib3gta2V5Ym9hcmQtaW50ZXJhY3Rpb25cbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgZGVwcmVjYXRpb25cbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFIHx8IChldmVudC5rZXlDb2RlID09PSBVUF9BUlJPVyAmJiBldmVudC5hbHRLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRBY3RpdmVJdGVtKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VLZXlFdmVudFN0cmVhbS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnZpZXdwb3J0UnVsZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdwb3J0U3Vic2NyaXB0aW9uID0gdGhpcy52aWV3cG9ydFJ1bGVyLmNoYW5nZSgpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhbmVsT3BlbiAmJiBvdmVybGF5UmVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5UmVmLnVwZGF0ZVNpemUoeyB3aWR0aDogdGhpcy5nZXRQYW5lbFdpZHRoKCkgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gb3ZlcmxheVJlZi5nZXRDb25maWcoKS5wb3NpdGlvblN0cmF0ZWd5IGFzIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneTtcblxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSB0cmlnZ2VyLCBwYW5lbCB3aWR0aCBhbmQgZGlyZWN0aW9uLCBpbiBjYXNlIGFueXRoaW5nIGhhcyBjaGFuZ2VkLlxuICAgICAgICAgICAgcG9zaXRpb24uc2V0T3JpZ2luKHRoaXMuZ2V0Q29ubmVjdGVkRWxlbWVudCgpKTtcbiAgICAgICAgICAgIG92ZXJsYXlSZWYudXBkYXRlU2l6ZSh7IHdpZHRoOiB0aGlzLmdldFBhbmVsV2lkdGgoKSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvdmVybGF5UmVmICYmICFvdmVybGF5UmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgIG92ZXJsYXlSZWYuYXR0YWNoKHRoaXMucG9ydGFsKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2luZ0FjdGlvbnNTdWJzY3JpcHRpb24gPSB0aGlzLnN1YnNjcmliZVRvQ2xvc2luZ0FjdGlvbnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHdhc09wZW4gPSB0aGlzLnBhbmVsT3BlbjtcblxuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5zZXRWaXNpYmlsaXR5KCk7XG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLmlzT3BlbiA9IHRoaXMub3ZlcmxheUF0dGFjaGVkID0gdHJ1ZTtcblxuICAgICAgICAvLyBXZSBuZWVkIHRvIGRvIGFuIGV4dHJhIGBwYW5lbE9wZW5gIGNoZWNrIGluIGhlcmUsIGJlY2F1c2UgdGhlXG4gICAgICAgIC8vIGF1dG9jb21wbGV0ZSB3b24ndCBiZSBzaG93biBpZiB0aGVyZSBhcmUgbm8gb3B0aW9ucy5cbiAgICAgICAgaWYgKHRoaXMucGFuZWxPcGVuICYmIHdhc09wZW4gIT09IHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5vcGVuZWQuZW1pdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRPdmVybGF5Q29uZmlnKCk6IE92ZXJsYXlDb25maWcge1xuICAgICAgICByZXR1cm4gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5nZXRPdmVybGF5UG9zaXRpb24oKSxcbiAgICAgICAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLnNjcm9sbFN0cmF0ZWd5KCksXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5nZXRQYW5lbFdpZHRoKCksXG4gICAgICAgICAgICBkaXJlY3Rpb246IHRoaXMuZGlyXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0T3ZlcmxheVBvc2l0aW9uKCk6IFBvc2l0aW9uU3RyYXRlZ3kge1xuICAgICAgICB0aGlzLnBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLm92ZXJsYXkucG9zaXRpb24oKVxuICAgICAgICAgICAgLmZsZXhpYmxlQ29ubmVjdGVkVG8odGhpcy5nZXRDb25uZWN0ZWRFbGVtZW50KCkpXG4gICAgICAgICAgICAud2l0aEZsZXhpYmxlRGltZW5zaW9ucyhmYWxzZSlcbiAgICAgICAgICAgIC53aXRoUHVzaChmYWxzZSlcbiAgICAgICAgICAgIC53aXRoUG9zaXRpb25zKFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVk6ICd0b3AnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVk6ICdib3R0b20nLFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBvdmVybGF5IGVkZ2UgY29ubmVjdGVkIHRvIHRoZSB0cmlnZ2VyIHNob3VsZCBoYXZlIHNxdWFyZWQgY29ybmVycywgd2hpbGVcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIG9wcG9zaXRlIGVuZCBoYXMgcm91bmRlZCBjb3JuZXJzLiBXZSBhcHBseSBhIENTUyBjbGFzcyB0byBzd2FwIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyBib3JkZXItcmFkaXVzIGJhc2VkIG9uIHRoZSBvdmVybGF5IHBvc2l0aW9uLlxuICAgICAgICAgICAgICAgICAgICBwYW5lbENsYXNzOiAnbWMtYXV0b2NvbXBsZXRlLXBhbmVsLWFib3ZlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0gYXMgQ29ubmVjdGVkUG9zaXRpb25bXSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb25TdHJhdGVneTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENvbm5lY3RlZEVsZW1lbnQoKTogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4ge1xuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWRUbykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdGVkVG8uZWxlbWVudFJlZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1GaWVsZCA/IHRoaXMuZm9ybUZpZWxkLmdldENvbm5lY3RlZE92ZXJsYXlPcmlnaW4oKSA6IHRoaXMuZWxlbWVudFJlZjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFBhbmVsV2lkdGgoKTogbnVtYmVyIHwgc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0b2NvbXBsZXRlLnBhbmVsV2lkdGggfHwgdGhpcy5nZXRIb3N0V2lkdGgoKSAtIEFVVE9DT01QTEVURV9CT1JERVJfV0lEVEg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRIb3N0V2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29ubmVjdGVkRWxlbWVudCgpLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXRzIHRoZSBhY3RpdmUgaXRlbSB0byAtMSBzbyBhcnJvdyBldmVudHMgd2lsbCBhY3RpdmF0ZSB0aGVcbiAgICAgKiBjb3JyZWN0IG9wdGlvbnMsIG9yIHRvIDAgaWYgdGhlIGNvbnN1bWVyIG9wdGVkIGludG8gaXQuXG4gICAgICovXG4gICAgcHJpdmF0ZSByZXNldEFjdGl2ZUl0ZW0oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbSh0aGlzLmF1dG9jb21wbGV0ZS5hdXRvQWN0aXZlRmlyc3RPcHRpb24gPyAwIDogLTEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FuT3BlbigpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIHJldHVybiAhZWxlbWVudC5yZWFkT25seSAmJiAhZWxlbWVudC5kaXNhYmxlZCAmJiAhdGhpcy5fYXV0b2NvbXBsZXRlRGlzYWJsZWQ7XG4gICAgfVxufVxuIl19