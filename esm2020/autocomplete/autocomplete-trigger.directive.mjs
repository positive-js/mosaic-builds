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
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "@angular/cdk/bidi";
import * as i3 from "@ptsecurity/mosaic/form-field";
import * as i4 from "@angular/cdk/scrolling";
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
        else if (this.canOpen() && this.autocomplete.openOnFocus) {
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
/** @nocollapse */ /** @nocollapse */ McAutocompleteTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McAutocompleteTrigger, deps: [{ token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }, { token: i1.Overlay }, { token: i0.NgZone }, { token: MC_AUTOCOMPLETE_SCROLL_STRATEGY }, { token: i2.Directionality, optional: true }, { token: i3.McFormField, host: true, optional: true }, { token: DOCUMENT, optional: true }, { token: i4.ViewportRuler }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McAutocompleteTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: McAutocompleteTrigger, selector: "input[mcAutocomplete], textarea[mcAutocomplete]", inputs: { autocomplete: ["mcAutocomplete", "autocomplete"], connectedTo: ["mcAutocompleteConnectedTo", "connectedTo"], autocompleteAttribute: ["autocomplete", "autocompleteAttribute"], autocompleteDisabled: ["mcAutocompleteDisabled", "autocompleteDisabled"] }, host: { listeners: { "focusin": "handleFocus()", "blur": "onTouched()", "input": "handleInput($event)", "keydown": "handleKeydown($event)", "click": "handleClick($event)" }, properties: { "attr.autocomplete": "autocompleteAttribute" }, classAttribute: "mc-autocomplete-trigger" }, providers: [MAT_AUTOCOMPLETE_VALUE_ACCESSOR], exportAs: ["mcAutocompleteTrigger"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McAutocompleteTrigger, decorators: [{
            type: Directive,
            args: [{
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
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }, { type: i1.Overlay }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_AUTOCOMPLETE_SCROLL_STRATEGY]
                }] }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i3.McFormField, decorators: [{
                    type: Optional
                }, {
                    type: Host
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i4.ViewportRuler }]; }, propDecorators: { autocomplete: [{
                type: Input,
                args: ['mcAutocomplete']
            }], connectedTo: [{
                type: Input,
                args: ['mcAutocompleteConnectedTo']
            }], autocompleteAttribute: [{
                type: Input,
                args: ['autocomplete']
            }], autocompleteDisabled: [{
                type: Input,
                args: ['mcAutocompleteDisabled']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLXRyaWdnZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUtdHJpZ2dlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFHSCxPQUFPLEVBQ1AsYUFBYSxFQUloQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDSCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixVQUFVLEVBQ1YsSUFBSSxFQUNKLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BGLE9BQU8sRUFDSCw0QkFBNEIsRUFDNUIsdUJBQXVCLEVBRXZCLHVCQUF1QixFQUMxQixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxZQUFZLEVBQUUsT0FBTyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7O0FBRzFEOzs7O0dBSUc7QUFFSCw4Q0FBOEM7QUFDOUMsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQUcsRUFBRSxDQUFDO0FBRTdDLGtEQUFrRDtBQUNsRCxNQUFNLENBQUMsTUFBTSx5QkFBeUIsR0FBRyxHQUFHLENBQUM7QUFFN0MsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQVcsQ0FBQyxDQUFDO0FBRW5ELGdHQUFnRztBQUNoRyxNQUFNLENBQUMsTUFBTSwrQkFBK0IsR0FDeEMsSUFBSSxjQUFjLENBQXVCLGlDQUFpQyxDQUFDLENBQUM7QUFFaEYsNkNBQTZDO0FBQzdDLE1BQU0sVUFBVSx1Q0FBdUMsQ0FBQyxPQUFnQjtJQUNwRSxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUN2RCxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sZ0RBQWdELEdBQUc7SUFDNUQsT0FBTyxFQUFFLCtCQUErQjtJQUN4QyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDZixVQUFVLEVBQUUsdUNBQXVDO0NBQ3RELENBQUM7QUFFRjs7O0dBR0c7QUFDSCxNQUFNLENBQUMsTUFBTSwrQkFBK0IsR0FBUTtJQUNoRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMscUJBQXFCLENBQUM7SUFDcEQsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBRUY7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLGtDQUFrQztJQUM5QyxPQUFPLEtBQUssQ0FBQyxpRUFBaUU7UUFDMUUsMkVBQTJFO1FBQzNFLGtFQUFrRSxDQUFDLENBQUM7QUFDNUUsQ0FBQztBQW1CRCxNQUFNLE9BQU8scUJBQXFCO0lBeUY5QixZQUNZLFVBQXdDLEVBQ3hDLGdCQUFrQyxFQUNsQyxpQkFBb0MsRUFDcEMsT0FBZ0IsRUFDaEIsSUFBWSxFQUNxQixjQUFtQixFQUN4QyxHQUFtQixFQUNYLFNBQXNCLEVBQ1osUUFBYTtJQUNuRCx5REFBeUQ7SUFDakQsYUFBNkI7UUFWN0IsZUFBVSxHQUFWLFVBQVUsQ0FBOEI7UUFDeEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUVBLFFBQUcsR0FBSCxHQUFHLENBQWdCO1FBQ1gsY0FBUyxHQUFULFNBQVMsQ0FBYTtRQUNaLGFBQVEsR0FBUixRQUFRLENBQUs7UUFFM0Msa0JBQWEsR0FBYixhQUFhLENBQWdCO1FBbkd6QyxhQUFhO1FBQ0oscUJBQWdCLEdBQXdDLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDeEUsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFO2dCQUNoRCxPQUFPLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQzthQUN4RjtZQUVELCtGQUErRjtZQUMvRixvRkFBb0Y7WUFDcEYsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7aUJBQ3BCLFlBQVksRUFBRTtpQkFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQy9ELENBQUMsQ0FBQyxDQUFDO1FBd0JIOzs7V0FHRztRQUNvQiwwQkFBcUIsR0FBVyxLQUFLLENBQUM7UUFlckQsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBRTlCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBTWpDLHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQWFuQyw2Q0FBNkM7UUFDckMseUJBQW9CLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUVsRDs7OztXQUlHO1FBQ0ssdUJBQWtCLEdBQUcsSUFBSSxDQUFDO1FBRWxDLDBEQUEwRDtRQUN6Qyx3QkFBbUIsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBcUMzRCx5REFBeUQ7UUFDekQsb0NBQW9DO1FBQ3BDLGFBQVEsR0FBeUIsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRTFDLHlFQUF5RTtRQUN6RSxvQ0FBb0M7UUFDcEMsY0FBUyxHQUFlLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQStLakM7OztXQUdHO1FBQ0ssc0JBQWlCLEdBQUcsR0FBRyxFQUFFO1lBQzdCLDJGQUEyRjtZQUMzRiw0RkFBNEY7WUFDNUYsbUVBQW1FO1lBQ25FLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzlHLENBQUMsQ0FBQTtRQXBORywrQ0FBK0M7UUFDL0MsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtnQkFDeEIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM1RCxDQUFDLENBQUMsQ0FBQztTQUNOO1FBRUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDekMsQ0FBQztJQWhHRCw4REFBOEQ7SUFDOUQsSUFBSSxZQUFZO1FBQ1osSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFO1lBQ25ELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO1NBQ2xEO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELElBQUksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQztJQUMvRCxDQUFDO0lBaUJEOzs7T0FHRztJQUNILElBQ0ksb0JBQW9CO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDO0lBQ3RDLENBQUM7SUFFRCxJQUFJLG9CQUFvQixDQUFDLEtBQWM7UUFDbkMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUM7SUEyREQsV0FBVztRQUNQLCtDQUErQztRQUMvQyxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtZQUMvQixNQUFNLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQzlEO1FBRUQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBVUQsK0NBQStDO0lBQy9DLFNBQVM7UUFDTCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELFVBQVU7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUFFLE9BQU87U0FBRTtRQUV0QyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDbkM7UUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUV4RCxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUNsRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNqRDtRQUVELHlGQUF5RjtRQUN6Rix1RkFBdUY7UUFDdkYsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUMxQix3REFBd0Q7WUFDeEQsd0RBQXdEO1lBQ3hELGdEQUFnRDtZQUNoRCx1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQzFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILGNBQWM7UUFDVixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFVBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUNyQztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFJLG1CQUFtQjtRQUNuQixPQUFPLEtBQUssQ0FDUixJQUFJLENBQUMsZ0JBQWdCLEVBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUM1RSxJQUFJLENBQUMsbUJBQW1CLEVBQ3hCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxFQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RSxZQUFZLEVBQUUsQ0FDckIsQ0FBQyxJQUFJO1FBQ0YsdURBQXVEO1FBQ3ZELEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxZQUFZLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUMxRSxDQUFDO0lBQ04sQ0FBQztJQUVELCtDQUErQztJQUMvQyxVQUFVLENBQUMsS0FBVTtRQUNqQixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELCtDQUErQztJQUMvQyxnQkFBZ0IsQ0FBQyxFQUFzQjtRQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsK0NBQStDO0lBQy9DLGlCQUFpQixDQUFDLEVBQVk7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELCtDQUErQztJQUMvQyxnQkFBZ0IsQ0FBQyxVQUFtQjtRQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQ3hELENBQUM7SUFFRCxhQUFhLENBQUMsS0FBb0I7UUFDOUIsdUNBQXVDO1FBQ3ZDLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFFOUIsMkZBQTJGO1FBQzNGLHlGQUF5RjtRQUN6Rix3RkFBd0Y7UUFDeEYsc0VBQXNFO1FBQ3RFLElBQUksT0FBTyxLQUFLLE1BQU0sRUFBRTtZQUNwQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7UUFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksT0FBTyxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzFELElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQzFCO2FBQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzFCLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztZQUUvRCxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksT0FBTyxLQUFLLEdBQUcsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEM7aUJBQU0sSUFBSSxPQUFPLEtBQUssVUFBVSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDakQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ3BCO1lBRUQsTUFBTSxVQUFVLEdBQUcsT0FBTyxLQUFLLFFBQVEsSUFBSSxPQUFPLEtBQUssVUFBVSxDQUFDO1lBRWxFLElBQUksVUFBVSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFVBQVUsS0FBSyxjQUFjLEVBQUU7Z0JBQzFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN6QjtTQUNKO0lBQ0wsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFvQjtRQUM1QixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBMEIsQ0FBQztRQUNoRCxJQUFJLEtBQUssR0FBMkIsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUVqRCw2Q0FBNkM7UUFDN0MsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUMxQixLQUFLLEdBQUcsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkQ7UUFFRCwrRUFBK0U7UUFDL0UsOEVBQThFO1FBQzlFLDZFQUE2RTtRQUM3RSxtREFBbUQ7UUFDbkQsaUVBQWlFO1FBQ2pFLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxLQUFLLEVBQUU7WUFDOUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVyQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUNoRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDcEI7U0FDSjtJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUMxQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1NBQ2xDO2FBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUU7WUFDeEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7WUFDekQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUVELFdBQVcsQ0FBQyxNQUFrQjtRQUMxQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2pFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNwQjtJQUNMLENBQUM7SUFFRCwwREFBMEQ7SUFDbEQscUJBQXFCO1FBQ3pCLE9BQU8sS0FBSztRQUNSLDBEQUEwRDtRQUMxRCxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQTJCO1FBQzNELDBEQUEwRDtRQUMxRCxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQTJCLENBQ2pFO2FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBRW5CLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFxQixDQUFDO1lBQ2hELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ25GLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBRXpGLE9BQU8sSUFBSSxDQUFDLGVBQWU7Z0JBQ3ZCLFdBQVcsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWE7Z0JBQzdDLENBQUMsQ0FBQyxTQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNoRCxDQUFDLENBQUMsWUFBWSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDdEQsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3JGLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDWixDQUFDO0lBYUQ7Ozs7Ozs7O09BUUc7SUFDSyxjQUFjO1FBQ2xCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLGVBQWUsSUFBSSxDQUFDLENBQUM7UUFDaEUsTUFBTSxVQUFVLEdBQUcsNEJBQTRCLENBQzNDLEtBQUssRUFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FDNUQsQ0FBQztRQUVGLE1BQU0saUJBQWlCLEdBQUcsdUJBQXVCLENBQzdDLEtBQUssR0FBRyxVQUFVLEVBQ2xCLDBCQUEwQixFQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxFQUNoQyx5QkFBeUIsQ0FDNUIsQ0FBQztRQUVGLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVEOzs7T0FHRztJQUNLLHlCQUF5QjtRQUM3QixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7YUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25CLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU87YUFDbEQsSUFBSSxDQUNELEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN0RCxxRUFBcUU7UUFDckUsOERBQThEO1FBQzlELEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FDWCxDQUFDO1FBRU4seUVBQXlFO1FBQ3pFLE9BQU8sS0FBSyxDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUM7YUFDbkMsSUFBSTtRQUNELDZFQUE2RTtRQUM3RSwrRUFBK0U7UUFDL0UsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNYLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDL0IsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFbEMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNoQixJQUFJLENBQUMsVUFBVyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUVsQyw4RUFBOEU7Z0JBQzlFLDhFQUE4RTtnQkFDOUUsNEVBQTRFO2dCQUM1RSx1RUFBdUU7Z0JBQ3ZFLElBQUksT0FBTyxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQzVCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUNuQzthQUNKO1lBRUQsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7UUFDcEMsQ0FBQyxDQUFDO1FBQ0YseUNBQXlDO1FBQ3pDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDVjtZQUNELGdEQUFnRDthQUMvQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxrREFBa0Q7SUFDMUMsWUFBWTtRQUNoQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRU8sZUFBZSxDQUFDLEtBQVU7UUFDOUIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdEMsS0FBSyxDQUFDO1FBRVYsK0ZBQStGO1FBQy9GLDRGQUE0RjtRQUM1RixNQUFNLFVBQVUsR0FBRyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUV0RCwyRkFBMkY7UUFDM0YsNEJBQTRCO1FBQzVCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1NBQzdDO2FBQU07WUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1NBQ3BEO1FBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUM7SUFDcEMsQ0FBQztJQUVEOzs7T0FHRztJQUNLLGdCQUFnQixDQUFDLEtBQXFDO1FBQzFELElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDdkIsSUFBSSxDQUFDLDJCQUEyQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRXRDLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNuRDtRQUVELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsMkZBQTJGO0lBQ25GLDJCQUEyQixDQUFDLElBQWM7UUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDekMsSUFBSSxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Z0JBQ3BDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNyQjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLGFBQWE7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDcEIsTUFBTSxrQ0FBa0MsRUFBRSxDQUFDO1NBQzlDO1FBRUQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUVqQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNwRixVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUU3Qix3REFBd0Q7WUFDeEQsMkRBQTJEO1lBQzNELFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDM0MsOEVBQThFO2dCQUM5RSxrRkFBa0Y7Z0JBQ2xGLHVDQUF1QztnQkFDdkMsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDMUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO29CQUN2QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQ25DO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7b0JBQ25FLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxVQUFVLEVBQUU7d0JBQzlCLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztxQkFDMUQ7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDTjtTQUNKO2FBQU07WUFDSCxNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUMsZ0JBQXFELENBQUM7WUFFOUYsK0VBQStFO1lBQy9FLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztZQUMvQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDMUQ7UUFFRCxJQUFJLFVBQVUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUN6QyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7U0FDdEU7UUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRS9CLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFFdkQsZ0VBQWdFO1FBQ2hFLHVEQUF1RDtRQUN2RCxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksT0FBTyxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDbkM7SUFDTCxDQUFDO0lBRU8sZ0JBQWdCO1FBQ3BCLE9BQU8sSUFBSSxhQUFhLENBQUM7WUFDckIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzNDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3JDLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQzNCLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRztTQUN0QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sa0JBQWtCO1FBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTthQUMxQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUMvQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUM7YUFDN0IsUUFBUSxDQUFDLEtBQUssQ0FBQzthQUNmLGFBQWEsQ0FBQztZQUNYO2dCQUNJLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixPQUFPLEVBQUUsUUFBUTtnQkFDakIsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLFFBQVEsRUFBRSxLQUFLO2FBQ2xCO1lBQ0Q7Z0JBQ0ksT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsUUFBUTtnQkFFbEIsK0VBQStFO2dCQUMvRSx5RUFBeUU7Z0JBQ3pFLCtDQUErQztnQkFDL0MsVUFBVSxFQUFFLDZCQUE2QjthQUM1QztTQUNtQixDQUFDLENBQUM7UUFFOUIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDakMsQ0FBQztJQUVPLG1CQUFtQjtRQUN2QixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztTQUN0QztRQUVELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pGLENBQUM7SUFFTyxhQUFhO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFHLHlCQUF5QixDQUFDO0lBQzNGLENBQUM7SUFFTyxZQUFZO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxDQUFDO0lBQ2xGLENBQUM7SUFFRDs7O09BR0c7SUFDSyxlQUFlO1FBQ25CLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsRUFBRTtZQUN6QyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQ3JEO2FBQU07WUFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsRDtJQUNMLENBQUM7SUFFTyxPQUFPO1FBQ1gsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFFOUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO0lBQ2pGLENBQUM7O3dKQXhqQlEscUJBQXFCLDBKQStGbEIsK0JBQStCLGtIQUduQixRQUFROzRJQWxHdkIscUJBQXFCLHdtQkFGbkIsQ0FBQywrQkFBK0IsQ0FBQzsyRkFFbkMscUJBQXFCO2tCQWhCakMsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsaURBQWlEO29CQUMzRCxJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLHlCQUF5Qjt3QkFDaEMscUJBQXFCLEVBQUUsdUJBQXVCO3dCQUM5Qyw0RUFBNEU7d0JBQzVFLGtGQUFrRjt3QkFDbEYsV0FBVyxFQUFFLGVBQWU7d0JBQzVCLFFBQVEsRUFBRSxhQUFhO3dCQUN2QixTQUFTLEVBQUUscUJBQXFCO3dCQUNoQyxXQUFXLEVBQUUsdUJBQXVCO3dCQUNwQyxTQUFTLEVBQUUscUJBQXFCO3FCQUNuQztvQkFDRCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztpQkFDL0M7OzBCQWdHUSxNQUFNOzJCQUFDLCtCQUErQjs7MEJBQ3RDLFFBQVE7OzBCQUNSLFFBQVE7OzBCQUFJLElBQUk7OzBCQUNoQixRQUFROzswQkFBSSxNQUFNOzJCQUFDLFFBQVE7d0VBdEVQLFlBQVk7c0JBQXBDLEtBQUs7dUJBQUMsZ0JBQWdCO2dCQU1hLFdBQVc7c0JBQTlDLEtBQUs7dUJBQUMsMkJBQTJCO2dCQU1YLHFCQUFxQjtzQkFBM0MsS0FBSzt1QkFBQyxjQUFjO2dCQU9qQixvQkFBb0I7c0JBRHZCLEtBQUs7dUJBQUMsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBDb25uZWN0ZWRQb3NpdGlvbixcbiAgICBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3ksXG4gICAgT3ZlcmxheSxcbiAgICBPdmVybGF5Q29uZmlnLFxuICAgIE92ZXJsYXlSZWYsXG4gICAgUG9zaXRpb25TdHJhdGVneSxcbiAgICBTY3JvbGxTdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgVmlld3BvcnRSdWxlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBmb3J3YXJkUmVmLFxuICAgIEhvc3QsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3B0aW9uYWwsXG4gICAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERPV05fQVJST1csIEVOVEVSLCBFU0NBUEUsIFRBQiwgVVBfQVJST1cgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgICBjb3VudEdyb3VwTGFiZWxzQmVmb3JlT3B0aW9uLFxuICAgIGdldE9wdGlvblNjcm9sbFBvc2l0aW9uLFxuICAgIE1jT3B0aW9uLFxuICAgIE1jT3B0aW9uU2VsZWN0aW9uQ2hhbmdlXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IE1jRm9ybUZpZWxkIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBkZWZlciwgZnJvbUV2ZW50LCBtZXJnZSwgb2YgYXMgb2JzZXJ2YWJsZU9mLCBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2UsIHN3aXRjaE1hcCwgZGVsYXksIHRhcCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNY0F1dG9jb21wbGV0ZU9yaWdpbiB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLW9yaWdpbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWNBdXRvY29tcGxldGUgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xuXG5cbi8qKlxuICogVGhlIGZvbGxvd2luZyBzdHlsZSBjb25zdGFudHMgYXJlIG5lY2Vzc2FyeSB0byBzYXZlIGhlcmUgaW4gb3JkZXJcbiAqIHRvIHByb3Blcmx5IGNhbGN1bGF0ZSB0aGUgc2Nyb2xsVG9wIG9mIHRoZSBwYW5lbC4gQmVjYXVzZSB3ZSBhcmUgbm90XG4gKiBhY3R1YWxseSBmb2N1c2luZyB0aGUgYWN0aXZlIGl0ZW0sIHNjcm9sbCBtdXN0IGJlIGhhbmRsZWQgbWFudWFsbHkuXG4gKi9cblxuLyoqIFRoZSBoZWlnaHQgb2YgZWFjaCBhdXRvY29tcGxldGUgb3B0aW9uLiAqL1xuZXhwb3J0IGNvbnN0IEFVVE9DT01QTEVURV9PUFRJT05fSEVJR0hUID0gMzI7XG5cbi8qKiBUaGUgdG90YWwgaGVpZ2h0IG9mIHRoZSBhdXRvY29tcGxldGUgcGFuZWwuICovXG5leHBvcnQgY29uc3QgQVVUT0NPTVBMRVRFX1BBTkVMX0hFSUdIVCA9IDI1NjtcblxuZXhwb3J0IGNvbnN0IEFVVE9DT01QTEVURV9CT1JERVJfV0lEVEg6IG51bWJlciA9IDI7XG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBkZXRlcm1pbmVzIHRoZSBzY3JvbGwgaGFuZGxpbmcgd2hpbGUgdGhlIGF1dG9jb21wbGV0ZSBwYW5lbCBpcyBvcGVuLiAqL1xuZXhwb3J0IGNvbnN0IE1DX0FVVE9DT01QTEVURV9TQ1JPTExfU1RSQVRFR1kgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjwoKSA9PiBTY3JvbGxTdHJhdGVneT4oJ21jLWF1dG9jb21wbGV0ZS1zY3JvbGwtc3RyYXRlZ3knKTtcblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgZnVuY3Rpb24gTUNfQVVUT0NPTVBMRVRFX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZKG92ZXJsYXk6IE92ZXJsYXkpOiAoKSA9PiBTY3JvbGxTdHJhdGVneSB7XG4gICAgcmV0dXJuICgpID0+IG92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5yZXBvc2l0aW9uKCk7XG59XG5cbmV4cG9ydCBjb25zdCBNQ19BVVRPQ09NUExFVEVfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllfUFJPVklERVIgPSB7XG4gICAgcHJvdmlkZTogTUNfQVVUT0NPTVBMRVRFX1NDUk9MTF9TVFJBVEVHWSxcbiAgICBkZXBzOiBbT3ZlcmxheV0sXG4gICAgdXNlRmFjdG9yeTogTUNfQVVUT0NPTVBMRVRFX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZXG59O1xuXG4vKipcbiAqIFByb3ZpZGVyIHRoYXQgYWxsb3dzIHRoZSBhdXRvY29tcGxldGUgdG8gcmVnaXN0ZXIgYXMgYSBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9BVVRPQ09NUExFVEVfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNY0F1dG9jb21wbGV0ZVRyaWdnZXIpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gZXJyb3IgdG8gYmUgdGhyb3duIHdoZW4gYXR0ZW1wdGluZyB0byB1c2UgYW4gYXV0b2NvbXBsZXRlIHRyaWdnZXIgd2l0aG91dCBhIHBhbmVsLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWNBdXRvY29tcGxldGVNaXNzaW5nUGFuZWxFcnJvcigpOiBFcnJvciB7XG4gICAgcmV0dXJuIEVycm9yKCdBdHRlbXB0aW5nIHRvIG9wZW4gYW4gdW5kZWZpbmVkIGluc3RhbmNlIG9mIGBtYy1hdXRvY29tcGxldGVgLiAnICtcbiAgICAgICAgJ01ha2Ugc3VyZSB0aGF0IHRoZSBpZCBwYXNzZWQgdG8gdGhlIGBtY0F1dG9jb21wbGV0ZWAgaXMgY29ycmVjdCBhbmQgdGhhdCAnICtcbiAgICAgICAgJ3lvdVxcJ3JlIGF0dGVtcHRpbmcgdG8gb3BlbiBpdCBhZnRlciB0aGUgbmdBZnRlckNvbnRlbnRJbml0IGhvb2suJyk7XG59XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IGBpbnB1dFttY0F1dG9jb21wbGV0ZV0sIHRleHRhcmVhW21jQXV0b2NvbXBsZXRlXWAsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWF1dG9jb21wbGV0ZS10cmlnZ2VyJyxcbiAgICAgICAgJ1thdHRyLmF1dG9jb21wbGV0ZV0nOiAnYXV0b2NvbXBsZXRlQXR0cmlidXRlJyxcbiAgICAgICAgLy8gTm90ZTogd2UgdXNlIGBmb2N1c2luYCwgYXMgb3Bwb3NlZCB0byBgZm9jdXNgLCBpbiBvcmRlciB0byBvcGVuIHRoZSBwYW5lbFxuICAgICAgICAvLyBhIGxpdHRsZSBlYXJsaWVyLiBUaGlzIGF2b2lkcyBpc3N1ZXMgd2hlcmUgSUUgZGVsYXlzIHRoZSBmb2N1c2luZyBvZiB0aGUgaW5wdXQuXG4gICAgICAgICcoZm9jdXNpbiknOiAnaGFuZGxlRm9jdXMoKScsXG4gICAgICAgICcoYmx1ciknOiAnb25Ub3VjaGVkKCknLFxuICAgICAgICAnKGlucHV0KSc6ICdoYW5kbGVJbnB1dCgkZXZlbnQpJyxcbiAgICAgICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duKCRldmVudCknLFxuICAgICAgICAnKGNsaWNrKSc6ICdoYW5kbGVDbGljaygkZXZlbnQpJ1xuICAgIH0sXG4gICAgZXhwb3J0QXM6ICdtY0F1dG9jb21wbGV0ZVRyaWdnZXInLFxuICAgIHByb3ZpZGVyczogW01BVF9BVVRPQ09NUExFVEVfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIE1jQXV0b2NvbXBsZXRlVHJpZ2dlciBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkRlc3Ryb3kge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICByZWFkb25seSBvcHRpb25TZWxlY3Rpb25zOiBPYnNlcnZhYmxlPE1jT3B0aW9uU2VsZWN0aW9uQ2hhbmdlPiA9IGRlZmVyKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b2NvbXBsZXRlICYmIHRoaXMuYXV0b2NvbXBsZXRlLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBtZXJnZSguLi50aGlzLmF1dG9jb21wbGV0ZS5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiBvcHRpb24ub25TZWxlY3Rpb25DaGFuZ2UpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBhbnkgc3Vic2NyaWJlcnMgYmVmb3JlIGBuZ0FmdGVyVmlld0luaXRgLCB0aGUgYGF1dG9jb21wbGV0ZWAgd2lsbCBiZSB1bmRlZmluZWQuXG4gICAgICAgIC8vIFJldHVybiBhIHN0cmVhbSB0aGF0IHdlJ2xsIHJlcGxhY2Ugd2l0aCB0aGUgcmVhbCBvbmUgb25jZSBldmVyeXRoaW5nIGlzIGluIHBsYWNlLlxuICAgICAgICByZXR1cm4gdGhpcy56b25lLm9uU3RhYmxlXG4gICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSksIHN3aXRjaE1hcCgoKSA9PiB0aGlzLm9wdGlvblNlbGVjdGlvbnMpKTtcbiAgICB9KTtcblxuICAgIC8qKiBUaGUgY3VycmVudGx5IGFjdGl2ZSBvcHRpb24sIGNvZXJjZWQgdG8gTWF0T3B0aW9uIHR5cGUuICovXG4gICAgZ2V0IGFjdGl2ZU9wdGlvbigpOiBNY09wdGlvbiB8IG51bGwge1xuICAgICAgICBpZiAodGhpcy5hdXRvY29tcGxldGUgJiYgdGhpcy5hdXRvY29tcGxldGUua2V5TWFuYWdlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXV0b2NvbXBsZXRlLmtleU1hbmFnZXIuYWN0aXZlSXRlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGdldCBwYW5lbE9wZW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlBdHRhY2hlZCAmJiB0aGlzLmF1dG9jb21wbGV0ZS5zaG93UGFuZWw7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBhdXRvY29tcGxldGUgcGFuZWwgdG8gYmUgYXR0YWNoZWQgdG8gdGhpcyB0cmlnZ2VyLiAqL1xuICAgIEBJbnB1dCgnbWNBdXRvY29tcGxldGUnKSBhdXRvY29tcGxldGU6IE1jQXV0b2NvbXBsZXRlO1xuXG4gICAgLyoqXG4gICAgICogUmVmZXJlbmNlIHJlbGF0aXZlIHRvIHdoaWNoIHRvIHBvc2l0aW9uIHRoZSBhdXRvY29tcGxldGUgcGFuZWwuXG4gICAgICogRGVmYXVsdHMgdG8gdGhlIGF1dG9jb21wbGV0ZSB0cmlnZ2VyIGVsZW1lbnQuXG4gICAgICovXG4gICAgQElucHV0KCdtY0F1dG9jb21wbGV0ZUNvbm5lY3RlZFRvJykgY29ubmVjdGVkVG86IE1jQXV0b2NvbXBsZXRlT3JpZ2luO1xuXG4gICAgLyoqXG4gICAgICogYGF1dG9jb21wbGV0ZWAgYXR0cmlidXRlIHRvIGJlIHNldCBvbiB0aGUgaW5wdXQgZWxlbWVudC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQElucHV0KCdhdXRvY29tcGxldGUnKSBhdXRvY29tcGxldGVBdHRyaWJ1dGU6IHN0cmluZyA9ICdvZmYnO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgYXV0b2NvbXBsZXRlIGlzIGRpc2FibGVkLiBXaGVuIGRpc2FibGVkLCB0aGUgZWxlbWVudCB3aWxsXG4gICAgICogYWN0IGFzIGEgcmVndWxhciBpbnB1dCBhbmQgdGhlIHVzZXIgd29uJ3QgYmUgYWJsZSB0byBvcGVuIHRoZSBwYW5lbC5cbiAgICAgKi9cbiAgICBASW5wdXQoJ21jQXV0b2NvbXBsZXRlRGlzYWJsZWQnKVxuICAgIGdldCBhdXRvY29tcGxldGVEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F1dG9jb21wbGV0ZURpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBhdXRvY29tcGxldGVEaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9hdXRvY29tcGxldGVEaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYXV0b2NvbXBsZXRlRGlzYWJsZWQgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgb3ZlcmxheUF0dGFjaGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYgfCBudWxsO1xuXG4gICAgcHJpdmF0ZSBwb3J0YWw6IFRlbXBsYXRlUG9ydGFsO1xuXG4gICAgcHJpdmF0ZSBjb21wb25lbnREZXN0cm95ZWQgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgc2Nyb2xsU3RyYXRlZ3k6ICgpID0+IFNjcm9sbFN0cmF0ZWd5O1xuXG4gICAgLyoqIE9sZCB2YWx1ZSBvZiB0aGUgbmF0aXZlIGlucHV0LiBVc2VkIHRvIHdvcmsgYXJvdW5kIGlzc3VlcyB3aXRoIHRoZSBgaW5wdXRgIGV2ZW50IG9uIElFLiAqL1xuICAgIHByaXZhdGUgcHJldmlvdXNWYWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbDtcblxuICAgIC8qKiBTdHJhdGVneSB0aGF0IGlzIHVzZWQgdG8gcG9zaXRpb24gdGhlIHBhbmVsLiAqL1xuICAgIHByaXZhdGUgcG9zaXRpb25TdHJhdGVneTogRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5O1xuXG4gICAgLyoqIFRoZSBzdWJzY3JpcHRpb24gZm9yIGNsb3NpbmcgYWN0aW9ucyAoc29tZSBhcmUgYm91bmQgdG8gZG9jdW1lbnQpLiAqL1xuICAgIHByaXZhdGUgY2xvc2luZ0FjdGlvbnNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIC8qKiBTdWJzY3JpcHRpb24gdG8gdmlld3BvcnQgc2l6ZSBjaGFuZ2VzLiAqL1xuICAgIHByaXZhdGUgdmlld3BvcnRTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBhdXRvY29tcGxldGUgY2FuIG9wZW4gdGhlIG5leHQgdGltZSBpdCBpcyBmb2N1c2VkLiBVc2VkIHRvIHByZXZlbnQgYSBmb2N1c2VkLFxuICAgICAqIGNsb3NlZCBhdXRvY29tcGxldGUgZnJvbSBiZWluZyByZW9wZW5lZCBpZiB0aGUgdXNlciBzd2l0Y2hlcyB0byBhbm90aGVyIGJyb3dzZXIgdGFiIGFuZCB0aGVuXG4gICAgICogY29tZXMgYmFjay5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbk9wZW5Pbk5leHRGb2N1cyA9IHRydWU7XG5cbiAgICAvKiogU3RyZWFtIG9mIGtleWJvYXJkIGV2ZW50cyB0aGF0IGNhbiBjbG9zZSB0aGUgcGFuZWwuICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBjbG9zZUtleUV2ZW50U3RyZWFtID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4sXG4gICAgICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgICAgIEBJbmplY3QoTUNfQVVUT0NPTVBMRVRFX1NDUk9MTF9TVFJBVEVHWSkgc2Nyb2xsU3RyYXRlZ3k6IGFueSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICBAT3B0aW9uYWwoKSBASG9zdCgpIHByaXZhdGUgZm9ybUZpZWxkOiBNY0Zvcm1GaWVsZCxcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxuICAgICAgICAvLyBAYnJlYWtpbmctY2hhbmdlIDguMC4wIE1ha2UgYF92aWV3cG9ydFJ1bGVyYCByZXF1aXJlZC5cbiAgICAgICAgcHJpdmF0ZSB2aWV3cG9ydFJ1bGVyPzogVmlld3BvcnRSdWxlclxuICAgICkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbm8tdHlwZW9mLXVuZGVmaW5lZFxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy53aW5kb3dCbHVySGFuZGxlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2Nyb2xsU3RyYXRlZ3kgPSBzY3JvbGxTdHJhdGVneTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG5vLXR5cGVvZi11bmRlZmluZWRcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMud2luZG93Qmx1ckhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52aWV3cG9ydFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudERlc3Ryb3llZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZGVzdHJveVBhbmVsKCk7XG4gICAgICAgIHRoaXMuY2xvc2VLZXlFdmVudFN0cmVhbS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8qKiBgVmlldyAtPiBtb2RlbCBjYWxsYmFjayBjYWxsZWQgd2hlbiB2YWx1ZSBjaGFuZ2VzYCAqL1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICAgIG9uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gICAgLyoqIGBWaWV3IC0+IG1vZGVsIGNhbGxiYWNrIGNhbGxlZCB3aGVuIGF1dG9jb21wbGV0ZSBoYXMgYmVlbiB0b3VjaGVkYCAqL1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICAgIG9uVG91Y2hlZDogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gICAgLyoqIE9wZW5zIHRoZSBhdXRvY29tcGxldGUgc3VnZ2VzdGlvbiBwYW5lbC4gKi9cbiAgICBvcGVuUGFuZWwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXR0YWNoT3ZlcmxheSgpO1xuICAgIH1cblxuICAgIGNsb3NlUGFuZWwoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5QXR0YWNoZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5jbG9zZWQuZW1pdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGUuaXNPcGVuID0gdGhpcy5vdmVybGF5QXR0YWNoZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmICYmIHRoaXMub3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICAgICAgICB0aGlzLmNsb3NpbmdBY3Rpb25zU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBOb3RlIHRoYXQgaW4gc29tZSBjYXNlcyB0aGlzIGNhbiBlbmQgdXAgYmVpbmcgY2FsbGVkIGFmdGVyIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkLlxuICAgICAgICAvLyBBZGQgYSBjaGVjayB0byBlbnN1cmUgdGhhdCB3ZSBkb24ndCB0cnkgdG8gcnVuIGNoYW5nZSBkZXRlY3Rpb24gb24gYSBkZXN0cm95ZWQgdmlldy5cbiAgICAgICAgaWYgKCF0aGlzLmNvbXBvbmVudERlc3Ryb3llZCkge1xuICAgICAgICAgICAgLy8gV2UgbmVlZCB0byB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb24gbWFudWFsbHksIGJlY2F1c2VcbiAgICAgICAgICAgIC8vIGBmcm9tRXZlbnRgIGRvZXNuJ3Qgc2VlbSB0byBkbyBpdCBhdCB0aGUgcHJvcGVyIHRpbWUuXG4gICAgICAgICAgICAvLyBUaGlzIGVuc3VyZXMgdGhhdCB0aGUgbGFiZWwgaXMgcmVzZXQgd2hlbiB0aGVcbiAgICAgICAgICAgIC8vIHVzZXIgY2xpY2tzIG91dHNpZGUuXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSBhdXRvY29tcGxldGUgc3VnZ2VzdGlvbiBwYW5lbCB0byBlbnN1cmUgdGhhdCBpdCBmaXRzIGFsbCBvcHRpb25zXG4gICAgICogd2l0aGluIHRoZSB2aWV3cG9ydC5cbiAgICAgKi9cbiAgICB1cGRhdGVQb3NpdGlvbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheUF0dGFjaGVkKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYhLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIHN0cmVhbSBvZiBhY3Rpb25zIHRoYXQgc2hvdWxkIGNsb3NlIHRoZSBhdXRvY29tcGxldGUgcGFuZWwsIGluY2x1ZGluZ1xuICAgICAqIHdoZW4gYW4gb3B0aW9uIGlzIHNlbGVjdGVkLCBvbiBibHVyLCBhbmQgd2hlbiBUQUIgaXMgcHJlc3NlZC5cbiAgICAgKi9cbiAgICBnZXQgcGFuZWxDbG9zaW5nQWN0aW9ucygpOiBPYnNlcnZhYmxlPE1jT3B0aW9uU2VsZWN0aW9uQ2hhbmdlIHwgbnVsbD4ge1xuICAgICAgICByZXR1cm4gbWVyZ2UoXG4gICAgICAgICAgICB0aGlzLm9wdGlvblNlbGVjdGlvbnMsXG4gICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5rZXlNYW5hZ2VyLnRhYk91dC5waXBlKGZpbHRlcigoKSA9PiB0aGlzLm92ZXJsYXlBdHRhY2hlZCkpLFxuICAgICAgICAgICAgdGhpcy5jbG9zZUtleUV2ZW50U3RyZWFtLFxuICAgICAgICAgICAgdGhpcy5nZXRPdXRzaWRlQ2xpY2tTdHJlYW0oKSxcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiA/XG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaG1lbnRzKCkucGlwZShmaWx0ZXIoKCkgPT4gdGhpcy5vdmVybGF5QXR0YWNoZWQpKSA6XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZU9mKClcbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgLy8gTm9ybWFsaXplIHRoZSBvdXRwdXQgc28gd2UgcmV0dXJuIGEgY29uc2lzdGVudCB0eXBlLlxuICAgICAgICAgICAgbWFwKChldmVudCkgPT4gZXZlbnQgaW5zdGFuY2VvZiBNY09wdGlvblNlbGVjdGlvbkNoYW5nZSA/IGV2ZW50IDogbnVsbClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUobnVsbCkudGhlbigoKSA9PiB0aGlzLnNldFRyaWdnZXJWYWx1ZSh2YWx1ZSkpO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHt9KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSkge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBkZXByZWNhdGlvblxuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcblxuICAgICAgICAvLyBQcmV2ZW50IHRoZSBkZWZhdWx0IGFjdGlvbiBvbiBhbGwgZXNjYXBlIGtleSBwcmVzc2VzLiBUaGlzIGlzIGhlcmUgcHJpbWFyaWx5IHRvIGJyaW5nIElFXG4gICAgICAgIC8vIGluIGxpbmUgd2l0aCBvdGhlciBicm93c2Vycy4gQnkgZGVmYXVsdCwgcHJlc3NpbmcgZXNjYXBlIG9uIElFIHdpbGwgY2F1c2UgaXQgdG8gcmV2ZXJ0XG4gICAgICAgIC8vIHRoZSBpbnB1dCB2YWx1ZSB0byB0aGUgb25lIHRoYXQgaXQgaGFkIG9uIGZvY3VzLCBob3dldmVyIGl0IHdvbid0IGRpc3BhdGNoIGFueSBldmVudHNcbiAgICAgICAgLy8gd2hpY2ggbWVhbnMgdGhhdCB0aGUgbW9kZWwgdmFsdWUgd2lsbCBiZSBvdXQgb2Ygc3luYyB3aXRoIHRoZSB2aWV3LlxuICAgICAgICBpZiAoa2V5Q29kZSA9PT0gRVNDQVBFKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlT3B0aW9uICYmIGtleUNvZGUgPT09IEVOVEVSICYmIHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZU9wdGlvbi5zZWxlY3RWaWFJbnRlcmFjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5yZXNldEFjdGl2ZUl0ZW0oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvY29tcGxldGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZXZBY3RpdmVJdGVtID0gdGhpcy5hdXRvY29tcGxldGUua2V5TWFuYWdlci5hY3RpdmVJdGVtO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wYW5lbE9wZW4gfHwga2V5Q29kZSA9PT0gVEFCKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUub25LZXlkb3duKGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gRE9XTl9BUlJPVyAmJiB0aGlzLmNhbk9wZW4oKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGlzQXJyb3dLZXkgPSBrZXlDb2RlID09PSBVUF9BUlJPVyB8fCBrZXlDb2RlID09PSBET1dOX0FSUk9XO1xuXG4gICAgICAgICAgICBpZiAoaXNBcnJvd0tleSB8fCB0aGlzLmF1dG9jb21wbGV0ZS5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0gIT09IHByZXZBY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUb09wdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgIGxldCB2YWx1ZTogbnVtYmVyIHwgc3RyaW5nIHwgbnVsbCA9IHRhcmdldC52YWx1ZTtcblxuICAgICAgICAvLyBCYXNlZCBvbiBgTnVtYmVyVmFsdWVBY2Nlc3NvcmAgZnJvbSBmb3Jtcy5cbiAgICAgICAgaWYgKHRhcmdldC50eXBlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSA9PT0gJycgPyBudWxsIDogcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGUgaW5wdXQgaGFzIGEgcGxhY2Vob2xkZXIsIElFIHdpbGwgZmlyZSB0aGUgYGlucHV0YCBldmVudCBvbiBwYWdlIGxvYWQsXG4gICAgICAgIC8vIGZvY3VzIGFuZCBibHVyLCBpbiBhZGRpdGlvbiB0byB3aGVuIHRoZSB1c2VyIGFjdHVhbGx5IGNoYW5nZWQgdGhlIHZhbHVlLiBUb1xuICAgICAgICAvLyBmaWx0ZXIgb3V0IGFsbCBvZiB0aGUgZXh0cmEgZXZlbnRzLCB3ZSBzYXZlIHRoZSB2YWx1ZSBvbiBmb2N1cyBhbmQgYmV0d2VlblxuICAgICAgICAvLyBgaW5wdXRgIGV2ZW50cywgYW5kIHdlIGNoZWNrIHdoZXRoZXIgaXQgY2hhbmdlZC5cbiAgICAgICAgLy8gU2VlOiBodHRwczovL2Nvbm5lY3QubWljcm9zb2Z0LmNvbS9JRS9mZWVkYmFjay9kZXRhaWxzLzg4NTc0Ny9cbiAgICAgICAgaWYgKHRoaXMucHJldmlvdXNWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNhbk9wZW4oKSAmJiB0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVGb2N1cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmNhbk9wZW5Pbk5leHRGb2N1cykge1xuICAgICAgICAgICAgdGhpcy5jYW5PcGVuT25OZXh0Rm9jdXMgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2FuT3BlbigpICYmIHRoaXMuYXV0b2NvbXBsZXRlLm9wZW5PbkZvY3VzKSB7XG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzVmFsdWUgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuYXR0YWNoT3ZlcmxheSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soJGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmNhbk9wZW4oKSAmJiB0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09ICRldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogU3RyZWFtIG9mIGNsaWNrcyBvdXRzaWRlIG9mIHRoZSBhdXRvY29tcGxldGUgcGFuZWwuICovXG4gICAgcHJpdmF0ZSBnZXRPdXRzaWRlQ2xpY2tTdHJlYW0oKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG1lcmdlKFxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bm5lY2Vzc2FyeS10eXBlLWFzc2VydGlvblxuICAgICAgICAgICAgZnJvbUV2ZW50KHRoaXMuZG9jdW1lbnQsICdjbGljaycpIGFzIE9ic2VydmFibGU8TW91c2VFdmVudD4sXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVubmVjZXNzYXJ5LXR5cGUtYXNzZXJ0aW9uXG4gICAgICAgICAgICBmcm9tRXZlbnQodGhpcy5kb2N1bWVudCwgJ3RvdWNoZW5kJykgYXMgT2JzZXJ2YWJsZTxUb3VjaEV2ZW50PlxuICAgICAgICApXG4gICAgICAgICAgICAucGlwZShmaWx0ZXIoKGV2ZW50KSA9PiB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBjbGlja1RhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtRmllbGQgPSB0aGlzLmZvcm1GaWVsZCA/IHRoaXMuZm9ybUZpZWxkLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgOiBudWxsO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1c3RvbU9yaWdpbiA9IHRoaXMuY29ubmVjdGVkVG8gPyB0aGlzLmNvbm5lY3RlZFRvLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCA6IG51bGw7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5QXR0YWNoZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tUYXJnZXQgIT09IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50ICYmXG4gICAgICAgICAgICAgICAgICAgICghZm9ybUZpZWxkIHx8ICFmb3JtRmllbGQuY29udGFpbnMoY2xpY2tUYXJnZXQpKSAmJlxuICAgICAgICAgICAgICAgICAgICAoIWN1c3RvbU9yaWdpbiB8fCAhY3VzdG9tT3JpZ2luLmNvbnRhaW5zKGNsaWNrVGFyZ2V0KSkgJiZcbiAgICAgICAgICAgICAgICAgICAgKCEhdGhpcy5vdmVybGF5UmVmICYmICF0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuY29udGFpbnMoY2xpY2tUYXJnZXQpKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGVyIGZvciB3aGVuIHRoZSB3aW5kb3cgaXMgYmx1cnJlZC4gTmVlZHMgdG8gYmUgYW5cbiAgICAgKiBhcnJvdyBmdW5jdGlvbiBpbiBvcmRlciB0byBwcmVzZXJ2ZSB0aGUgY29udGV4dC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHdpbmRvd0JsdXJIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICAvLyBJZiB0aGUgdXNlciBibHVycmVkIHRoZSB3aW5kb3cgd2hpbGUgdGhlIGF1dG9jb21wbGV0ZSBpcyBmb2N1c2VkLCBpdCBtZWFucyB0aGF0IGl0J2xsIGJlXG4gICAgICAgIC8vIHJlZm9jdXNlZCB3aGVuIHRoZXkgY29tZSBiYWNrLiBJbiB0aGlzIGNhc2Ugd2Ugd2FudCB0byBza2lwIHRoZSBmaXJzdCBmb2N1cyBldmVudCwgaWYgdGhlXG4gICAgICAgIC8vIHBhbmUgd2FzIGNsb3NlZCwgaW4gb3JkZXIgdG8gYXZvaWQgcmVvcGVuaW5nIGl0IHVuaW50ZW50aW9uYWxseS5cbiAgICAgICAgdGhpcy5jYW5PcGVuT25OZXh0Rm9jdXMgPSB0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IHx8IHRoaXMucGFuZWxPcGVuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdpdmVuIHRoYXQgd2UgYXJlIG5vdCBhY3R1YWxseSBmb2N1c2luZyBhY3RpdmUgb3B0aW9ucywgd2UgbXVzdCBtYW51YWxseSBhZGp1c3Qgc2Nyb2xsXG4gICAgICogdG8gcmV2ZWFsIG9wdGlvbnMgYmVsb3cgdGhlIGZvbGQuIEZpcnN0LCB3ZSBmaW5kIHRoZSBvZmZzZXQgb2YgdGhlIG9wdGlvbiBmcm9tIHRoZSB0b3BcbiAgICAgKiBvZiB0aGUgcGFuZWwuIElmIHRoYXQgb2Zmc2V0IGlzIGJlbG93IHRoZSBmb2xkLCB0aGUgbmV3IHNjcm9sbFRvcCB3aWxsIGJlIHRoZSBvZmZzZXQgLVxuICAgICAqIHRoZSBwYW5lbCBoZWlnaHQgKyB0aGUgb3B0aW9uIGhlaWdodCwgc28gdGhlIGFjdGl2ZSBvcHRpb24gd2lsbCBiZSBqdXN0IHZpc2libGUgYXQgdGhlXG4gICAgICogYm90dG9tIG9mIHRoZSBwYW5lbC4gSWYgdGhhdCBvZmZzZXQgaXMgYWJvdmUgdGhlIHRvcCBvZiB0aGUgdmlzaWJsZSBwYW5lbCwgdGhlIG5ldyBzY3JvbGxUb3BcbiAgICAgKiB3aWxsIGJlY29tZSB0aGUgb2Zmc2V0LiBJZiB0aGF0IG9mZnNldCBpcyB2aXNpYmxlIHdpdGhpbiB0aGUgcGFuZWwgYWxyZWFkeSwgdGhlIHNjcm9sbFRvcCBpc1xuICAgICAqIG5vdCBhZGp1c3RlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNjcm9sbFRvT3B0aW9uKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuYXV0b2NvbXBsZXRlLmtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4IHx8IDA7XG4gICAgICAgIGNvbnN0IGxhYmVsQ291bnQgPSBjb3VudEdyb3VwTGFiZWxzQmVmb3JlT3B0aW9uKFxuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5vcHRpb25zLCB0aGlzLmF1dG9jb21wbGV0ZS5vcHRpb25Hcm91cHNcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBuZXdTY3JvbGxQb3NpdGlvbiA9IGdldE9wdGlvblNjcm9sbFBvc2l0aW9uKFxuICAgICAgICAgICAgaW5kZXggKyBsYWJlbENvdW50LFxuICAgICAgICAgICAgQVVUT0NPTVBMRVRFX09QVElPTl9IRUlHSFQsXG4gICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5nZXRTY3JvbGxUb3AoKSxcbiAgICAgICAgICAgIEFVVE9DT01QTEVURV9QQU5FTF9IRUlHSFRcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5zZXRTY3JvbGxUb3AobmV3U2Nyb2xsUG9zaXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIGxpc3RlbnMgdG8gYSBzdHJlYW0gb2YgcGFuZWwgY2xvc2luZyBhY3Rpb25zIGFuZCByZXNldHMgdGhlXG4gICAgICogc3RyZWFtIGV2ZXJ5IHRpbWUgdGhlIG9wdGlvbiBsaXN0IGNoYW5nZXMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdWJzY3JpYmVUb0Nsb3NpbmdBY3Rpb25zKCk6IFN1YnNjcmlwdGlvbiB7XG4gICAgICAgIGNvbnN0IGZpcnN0U3RhYmxlID0gdGhpcy56b25lLm9uU3RhYmxlLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKTtcbiAgICAgICAgY29uc3Qgb3B0aW9uQ2hhbmdlcyA9IHRoaXMuYXV0b2NvbXBsZXRlLm9wdGlvbnMuY2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgdGFwKCgpID0+IHRoaXMucG9zaXRpb25TdHJhdGVneS5yZWFwcGx5TGFzdFBvc2l0aW9uKCkpLFxuICAgICAgICAgICAgICAgIC8vIERlZmVyIGVtaXR0aW5nIHRvIHRoZSBzdHJlYW0gdW50aWwgdGhlIG5leHQgdGljaywgYmVjYXVzZSBjaGFuZ2luZ1xuICAgICAgICAgICAgICAgIC8vIGJpbmRpbmdzIGluIGhlcmUgd2lsbCBjYXVzZSBcImNoYW5nZWQgYWZ0ZXIgY2hlY2tlZFwiIGVycm9ycy5cbiAgICAgICAgICAgICAgICBkZWxheSgwKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAvLyBXaGVuIHRoZSB6b25lIGlzIHN0YWJsZSBpbml0aWFsbHksIGFuZCB3aGVuIHRoZSBvcHRpb24gbGlzdCBjaGFuZ2VzLi4uXG4gICAgICAgIHJldHVybiBtZXJnZShmaXJzdFN0YWJsZSwgb3B0aW9uQ2hhbmdlcylcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBzdHJlYW0gb2YgcGFuZWxDbG9zaW5nQWN0aW9ucywgcmVwbGFjaW5nIGFueSBwcmV2aW91cyBzdHJlYW1zXG4gICAgICAgICAgICAgICAgLy8gdGhhdCB3ZXJlIGNyZWF0ZWQsIGFuZCBmbGF0dGVuIGl0IHNvIG91ciBzdHJlYW0gb25seSBlbWl0cyBjbG9zaW5nIGV2ZW50cy4uLlxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdhc09wZW4gPSB0aGlzLnBhbmVsT3BlbjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldEFjdGl2ZUl0ZW0oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUuc2V0VmlzaWJpbGl0eSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmIS51cGRhdGVQb3NpdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgYHBhbmVsT3BlbmAgc3RhdGUgY2hhbmdlZCwgd2UgbmVlZCB0byBtYWtlIHN1cmUgdG8gZW1pdCB0aGUgYG9wZW5lZGBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV2ZW50LCBiZWNhdXNlIHdlIG1heSBub3QgaGF2ZSBlbWl0dGVkIGl0IHdoZW4gdGhlIHBhbmVsIHdhcyBhdHRhY2hlZC4gVGhpc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FuIGhhcHBlbiBpZiB0aGUgdXNlcnMgb3BlbnMgdGhlIHBhbmVsIGFuZCB0aGVyZSBhcmUgbm8gb3B0aW9ucywgYnV0IHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3B0aW9ucyBjb21lIGluIHNsaWdodGx5IGxhdGVyIG9yIGFzIGEgcmVzdWx0IG9mIHRoZSB2YWx1ZSBjaGFuZ2luZy5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3YXNPcGVuICE9PSB0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLm9wZW5lZC5lbWl0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYW5lbENsb3NpbmdBY3Rpb25zO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIC8vIHdoZW4gdGhlIGZpcnN0IGNsb3NpbmcgZXZlbnQgb2NjdXJzLi4uXG4gICAgICAgICAgICAgICAgdGFrZSgxKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLy8gc2V0IHRoZSB2YWx1ZSwgY2xvc2UgdGhlIHBhbmVsLCBhbmQgY29tcGxldGUuXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4gdGhpcy5zZXRWYWx1ZUFuZENsb3NlKGV2ZW50KSk7XG4gICAgfVxuXG4gICAgLyoqIERlc3Ryb3lzIHRoZSBhdXRvY29tcGxldGUgc3VnZ2VzdGlvbiBwYW5lbC4gKi9cbiAgICBwcml2YXRlIGRlc3Ryb3lQYW5lbCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0VHJpZ2dlclZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdG9EaXNwbGF5ID0gdGhpcy5hdXRvY29tcGxldGUgJiYgdGhpcy5hdXRvY29tcGxldGUuZGlzcGxheVdpdGggP1xuICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUuZGlzcGxheVdpdGgodmFsdWUpIDpcbiAgICAgICAgICAgIHZhbHVlO1xuXG4gICAgICAgIC8vIFNpbXBseSBmYWxsaW5nIGJhY2sgdG8gYW4gZW1wdHkgc3RyaW5nIGlmIHRoZSBkaXNwbGF5IHZhbHVlIGlzIGZhbHN5IGRvZXMgbm90IHdvcmsgcHJvcGVybHkuXG4gICAgICAgIC8vIFRoZSBkaXNwbGF5IHZhbHVlIGNhbiBhbHNvIGJlIHRoZSBudW1iZXIgemVybyBhbmQgc2hvdWxkbid0IGZhbGwgYmFjayB0byBhbiBlbXB0eSBzdHJpbmcuXG4gICAgICAgIGNvbnN0IGlucHV0VmFsdWUgPSB0b0Rpc3BsYXkgIT0gbnVsbCA/IHRvRGlzcGxheSA6ICcnO1xuXG4gICAgICAgIC8vIElmIGl0J3MgdXNlZCB3aXRoaW4gYSBgTWF0Rm9ybUZpZWxkYCwgd2Ugc2hvdWxkIHNldCBpdCB0aHJvdWdoIHRoZSBwcm9wZXJ0eSBzbyBpdCBjYW4gZ29cbiAgICAgICAgLy8gdGhyb3VnaCBjaGFuZ2UgZGV0ZWN0aW9uLlxuICAgICAgICBpZiAodGhpcy5mb3JtRmllbGQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUZpZWxkLmNvbnRyb2wudmFsdWUgPSBpbnB1dFZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSBpbnB1dFZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmV2aW91c1ZhbHVlID0gaW5wdXRWYWx1ZTtcbiAgICB9XG5cbiAgICAvKiogVGhpcyBtZXRob2QgY2xvc2VzIHRoZSBwYW5lbCwgYW5kIGlmIGEgdmFsdWUgaXMgc3BlY2lmaWVkLCBhbHNvIHNldHMgdGhlIGFzc29jaWF0ZWRcbiAgICAgKiBjb250cm9sIHRvIHRoYXQgdmFsdWUuIEl0IHdpbGwgYWxzbyBtYXJrIHRoZSBjb250cm9sIGFzIGRpcnR5IGlmIHRoaXMgaW50ZXJhY3Rpb25cbiAgICAgKiBzdGVtbWVkIGZyb20gdGhlIHVzZXIuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRWYWx1ZUFuZENsb3NlKGV2ZW50OiBNY09wdGlvblNlbGVjdGlvbkNoYW5nZSB8IG51bGwpOiB2b2lkIHtcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnNvdXJjZSkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclByZXZpb3VzU2VsZWN0ZWRPcHRpb24oZXZlbnQuc291cmNlKTtcbiAgICAgICAgICAgIHRoaXMuc2V0VHJpZ2dlclZhbHVlKGV2ZW50LnNvdXJjZS52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKGV2ZW50LnNvdXJjZS52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXG4gICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5lbWl0U2VsZWN0RXZlbnQoZXZlbnQuc291cmNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgIH1cblxuICAgIC8qKiBDbGVhciBhbnkgcHJldmlvdXMgc2VsZWN0ZWQgb3B0aW9uIGFuZCBlbWl0IGEgc2VsZWN0aW9uIGNoYW5nZSBldmVudCBmb3IgdGhpcyBvcHRpb24gKi9cbiAgICBwcml2YXRlIGNsZWFyUHJldmlvdXNTZWxlY3RlZE9wdGlvbihza2lwOiBNY09wdGlvbikge1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvbiAhPT0gc2tpcCAmJiBvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBvcHRpb24uZGVzZWxlY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhdHRhY2hPdmVybGF5KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuYXV0b2NvbXBsZXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRNY0F1dG9jb21wbGV0ZU1pc3NpbmdQYW5lbEVycm9yKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheVJlZjtcblxuICAgICAgICBpZiAoIW92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMucG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMuYXV0b2NvbXBsZXRlLnRlbXBsYXRlLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICAgICAgb3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUodGhpcy5nZXRPdmVybGF5Q29uZmlnKCkpO1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gb3ZlcmxheVJlZjtcblxuICAgICAgICAgICAgLy8gVXNlIHRoZSBga2V5ZG93bkV2ZW50c2AgaW4gb3JkZXIgdG8gdGFrZSBhZHZhbnRhZ2Ugb2ZcbiAgICAgICAgICAgIC8vIHRoZSBvdmVybGF5IGV2ZW50IHRhcmdldGluZyBwcm92aWRlZCBieSB0aGUgQ0RLIG92ZXJsYXkuXG4gICAgICAgICAgICBvdmVybGF5UmVmLmtleWRvd25FdmVudHMoKS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gQ2xvc2Ugd2hlbiBwcmVzc2luZyBFU0NBUEUgb3IgQUxUICsgVVBfQVJST1csIGJhc2VkIG9uIHRoZSBhMTF5IGd1aWRlbGluZXMuXG4gICAgICAgICAgICAgICAgLy8gU2VlOiBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtcHJhY3RpY2VzLTEuMS8jdGV4dGJveC1rZXlib2FyZC1pbnRlcmFjdGlvblxuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBkZXByZWNhdGlvblxuICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBFU0NBUEUgfHwgKGV2ZW50LmtleUNvZGUgPT09IFVQX0FSUk9XICYmIGV2ZW50LmFsdEtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldEFjdGl2ZUl0ZW0oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZUtleUV2ZW50U3RyZWFtLm5leHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMudmlld3BvcnRSdWxlcikge1xuICAgICAgICAgICAgICAgIHRoaXMudmlld3BvcnRTdWJzY3JpcHRpb24gPSB0aGlzLnZpZXdwb3J0UnVsZXIuY2hhbmdlKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGFuZWxPcGVuICYmIG92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXlSZWYudXBkYXRlU2l6ZSh7IHdpZHRoOiB0aGlzLmdldFBhbmVsV2lkdGgoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBvdmVybGF5UmVmLmdldENvbmZpZygpLnBvc2l0aW9uU3RyYXRlZ3kgYXMgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5O1xuXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHRyaWdnZXIsIHBhbmVsIHdpZHRoIGFuZCBkaXJlY3Rpb24sIGluIGNhc2UgYW55dGhpbmcgaGFzIGNoYW5nZWQuXG4gICAgICAgICAgICBwb3NpdGlvbi5zZXRPcmlnaW4odGhpcy5nZXRDb25uZWN0ZWRFbGVtZW50KCkpO1xuICAgICAgICAgICAgb3ZlcmxheVJlZi51cGRhdGVTaXplKHsgd2lkdGg6IHRoaXMuZ2V0UGFuZWxXaWR0aCgpIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG92ZXJsYXlSZWYgJiYgIW92ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgICAgICAgb3ZlcmxheVJlZi5hdHRhY2godGhpcy5wb3J0YWwpO1xuICAgICAgICAgICAgdGhpcy5jbG9zaW5nQWN0aW9uc1N1YnNjcmlwdGlvbiA9IHRoaXMuc3Vic2NyaWJlVG9DbG9zaW5nQWN0aW9ucygpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgd2FzT3BlbiA9IHRoaXMucGFuZWxPcGVuO1xuXG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLnNldFZpc2liaWxpdHkoKTtcbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGUuaXNPcGVuID0gdGhpcy5vdmVybGF5QXR0YWNoZWQgPSB0cnVlO1xuXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gZG8gYW4gZXh0cmEgYHBhbmVsT3BlbmAgY2hlY2sgaW4gaGVyZSwgYmVjYXVzZSB0aGVcbiAgICAgICAgLy8gYXV0b2NvbXBsZXRlIHdvbid0IGJlIHNob3duIGlmIHRoZXJlIGFyZSBubyBvcHRpb25zLlxuICAgICAgICBpZiAodGhpcy5wYW5lbE9wZW4gJiYgd2FzT3BlbiAhPT0gdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLm9wZW5lZC5lbWl0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE92ZXJsYXlDb25maWcoKTogT3ZlcmxheUNvbmZpZyB7XG4gICAgICAgIHJldHVybiBuZXcgT3ZlcmxheUNvbmZpZyh7XG4gICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLmdldE92ZXJsYXlQb3NpdGlvbigpLFxuICAgICAgICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuc2Nyb2xsU3RyYXRlZ3koKSxcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLmdldFBhbmVsV2lkdGgoKSxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogdGhpcy5kaXJcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRPdmVybGF5UG9zaXRpb24oKTogUG9zaXRpb25TdHJhdGVneSB7XG4gICAgICAgIHRoaXMucG9zaXRpb25TdHJhdGVneSA9IHRoaXMub3ZlcmxheS5wb3NpdGlvbigpXG4gICAgICAgICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLmdldENvbm5lY3RlZEVsZW1lbnQoKSlcbiAgICAgICAgICAgIC53aXRoRmxleGlibGVEaW1lbnNpb25zKGZhbHNlKVxuICAgICAgICAgICAgLndpdGhQdXNoKGZhbHNlKVxuICAgICAgICAgICAgLndpdGhQb3NpdGlvbnMoW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WTogJ3RvcCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WTogJ2JvdHRvbScsXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIG92ZXJsYXkgZWRnZSBjb25uZWN0ZWQgdG8gdGhlIHRyaWdnZXIgc2hvdWxkIGhhdmUgc3F1YXJlZCBjb3JuZXJzLCB3aGlsZVxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgb3Bwb3NpdGUgZW5kIGhhcyByb3VuZGVkIGNvcm5lcnMuIFdlIGFwcGx5IGEgQ1NTIGNsYXNzIHRvIHN3YXAgdGhlXG4gICAgICAgICAgICAgICAgICAgIC8vIGJvcmRlci1yYWRpdXMgYmFzZWQgb24gdGhlIG92ZXJsYXkgcG9zaXRpb24uXG4gICAgICAgICAgICAgICAgICAgIHBhbmVsQ2xhc3M6ICdtYy1hdXRvY29tcGxldGUtcGFuZWwtYWJvdmUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSBhcyBDb25uZWN0ZWRQb3NpdGlvbltdKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5wb3NpdGlvblN0cmF0ZWd5O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q29ubmVjdGVkRWxlbWVudCgpOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiB7XG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZFRvKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0ZWRUby5lbGVtZW50UmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybUZpZWxkID8gdGhpcy5mb3JtRmllbGQuZ2V0Q29ubmVjdGVkT3ZlcmxheU9yaWdpbigpIDogdGhpcy5lbGVtZW50UmVmO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UGFuZWxXaWR0aCgpOiBudW1iZXIgfCBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5hdXRvY29tcGxldGUucGFuZWxXaWR0aCB8fCB0aGlzLmdldEhvc3RXaWR0aCgpIC0gQVVUT0NPTVBMRVRFX0JPUkRFUl9XSURUSDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEhvc3RXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDb25uZWN0ZWRFbGVtZW50KCkubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIGFjdGl2ZSBpdGVtIHRvIC0xIHNvIGFycm93IGV2ZW50cyB3aWxsIGFjdGl2YXRlIHRoZVxuICAgICAqIGNvcnJlY3Qgb3B0aW9ucywgb3IgdG8gMCBpZiB0aGUgY29uc3VtZXIgb3B0ZWQgaW50byBpdC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHJlc2V0QWN0aXZlSXRlbSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b2NvbXBsZXRlLmF1dG9BY3RpdmVGaXJzdE9wdGlvbikge1xuICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUua2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbSgtMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbk9wZW4oKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgICByZXR1cm4gIWVsZW1lbnQucmVhZE9ubHkgJiYgIWVsZW1lbnQuZGlzYWJsZWQgJiYgIXRoaXMuX2F1dG9jb21wbGV0ZURpc2FibGVkO1xuICAgIH1cbn1cbiJdfQ==