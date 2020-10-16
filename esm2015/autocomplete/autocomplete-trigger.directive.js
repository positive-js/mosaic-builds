/**
 * @fileoverview added by tsickle
 * Generated from: autocomplete-trigger.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
 * The height of each autocomplete option.
 * @type {?}
 */
export const AUTOCOMPLETE_OPTION_HEIGHT = 32;
/**
 * The total height of the autocomplete panel.
 * @type {?}
 */
export const AUTOCOMPLETE_PANEL_HEIGHT = 256;
/** @type {?} */
export const AUTOCOMPLETE_BORDER_WIDTH = 2;
/**
 * Injection token that determines the scroll handling while the autocomplete panel is open.
 * @type {?}
 */
export const MC_AUTOCOMPLETE_SCROLL_STRATEGY = new InjectionToken('mc-autocomplete-scroll-strategy');
// tslint:disable-next-line naming-convention
/**
 * @param {?} overlay
 * @return {?}
 */
export function MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY(overlay) {
    return (/**
     * @return {?}
     */
    () => overlay.scrollStrategies.reposition());
}
/** @type {?} */
export const MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_AUTOCOMPLETE_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY
};
/**
 * Provider that allows the autocomplete to register as a ControlValueAccessor.
 * \@docs-private
 * @type {?}
 */
export const MAT_AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => McAutocompleteTrigger)),
    multi: true
};
/**
 * Creates an error to be thrown when attempting to use an autocomplete trigger without a panel.
 * \@docs-private
 * @return {?}
 */
export function getMcAutocompleteMissingPanelError() {
    return Error('Attempting to open an undefined instance of `mc-autocomplete`. ' +
        'Make sure that the id passed to the `mcAutocomplete` is correct and that ' +
        'you\'re attempting to open it after the ngAfterContentInit hook.');
}
export class McAutocompleteTrigger {
    /**
     * @param {?} elementRef
     * @param {?} viewContainerRef
     * @param {?} changeDetectorRef
     * @param {?} overlay
     * @param {?} zone
     * @param {?} scrollStrategy
     * @param {?} dir
     * @param {?} formField
     * @param {?} document
     * @param {?=} viewportRuler
     */
    constructor(elementRef, viewContainerRef, changeDetectorRef, overlay, zone, scrollStrategy, dir, formField, document, viewportRuler) {
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
        this.optionSelections = defer((/**
         * @return {?}
         */
        () => {
            if (this.autocomplete && this.autocomplete.options) {
                return merge(...this.autocomplete.options.map((/**
                 * @param {?} option
                 * @return {?}
                 */
                (option) => option.onSelectionChange)));
            }
            // If there are any subscribers before `ngAfterViewInit`, the `autocomplete` will be undefined.
            // Return a stream that we'll replace with the real one once everything is in place.
            return this.zone.onStable
                .asObservable()
                .pipe(take(1), switchMap((/**
             * @return {?}
             */
            () => this.optionSelections)));
        }));
        /**
         * `autocomplete` attribute to be set on the input element.
         * \@docs-private
         */
        this.autocompleteAttribute = 'off';
        this._autocompleteDisabled = false;
        this.overlayAttached = false;
        this.componentDestroyed = false;
        /**
         * Subscription to viewport size changes.
         */
        this.viewportSubscription = Subscription.EMPTY;
        /**
         * Whether the autocomplete can open the next time it is focused. Used to prevent a focused,
         * closed autocomplete from being reopened if the user switches to another browser tab and then
         * comes back.
         */
        this.canOpenOnNextFocus = true;
        /**
         * Stream of keyboard events that can close the panel.
         */
        this.closeKeyEventStream = new Subject();
        /**
         * `View -> model callback called when value changes`
         */
        // tslint:disable-next-line no-empty
        this.onChange = (/**
         * @return {?}
         */
        () => { });
        /**
         * `View -> model callback called when autocomplete has been touched`
         */
        // tslint:disable-next-line no-empty
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
        /**
         * Event handler for when the window is blurred. Needs to be an
         * arrow function in order to preserve the context.
         */
        this.windowBlurHandler = (/**
         * @return {?}
         */
        () => {
            // If the user blurred the window while the autocomplete is focused, it means that it'll be
            // refocused when they come back. In this case we want to skip the first focus event, if the
            // pane was closed, in order to avoid reopening it unintentionally.
            this.canOpenOnNextFocus = this.document.activeElement !== this.elementRef.nativeElement || this.panelOpen;
        });
        // tslint:disable-next-line no-typeof-undefined
        if (typeof window !== 'undefined') {
            zone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                window.addEventListener('blur', this.windowBlurHandler);
            }));
        }
        this.scrollStrategy = scrollStrategy;
    }
    /**
     * The currently active option, coerced to MatOption type.
     * @return {?}
     */
    get activeOption() {
        if (this.autocomplete && this.autocomplete.keyManager) {
            return this.autocomplete.keyManager.activeItem;
        }
        return null;
    }
    /**
     * @return {?}
     */
    get panelOpen() {
        return this.overlayAttached && this.autocomplete.showPanel;
    }
    /**
     * Whether the autocomplete is disabled. When disabled, the element will
     * act as a regular input and the user won't be able to open the panel.
     * @return {?}
     */
    get autocompleteDisabled() {
        return this._autocompleteDisabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set autocompleteDisabled(value) {
        this._autocompleteDisabled = coerceBooleanProperty(value);
    }
    /**
     * @return {?}
     */
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
    /**
     * Opens the autocomplete suggestion panel.
     * @return {?}
     */
    openPanel() {
        this.attachOverlay();
    }
    /**
     * @return {?}
     */
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
     * @return {?}
     */
    updatePosition() {
        if (this.overlayAttached) {
            (/** @type {?} */ (this.overlayRef)).updatePosition();
        }
    }
    /**
     * A stream of actions that should close the autocomplete panel, including
     * when an option is selected, on blur, and when TAB is pressed.
     * @return {?}
     */
    get panelClosingActions() {
        return merge(this.optionSelections, this.autocomplete.keyManager.tabOut.pipe(filter((/**
         * @return {?}
         */
        () => this.overlayAttached))), this.closeKeyEventStream, this.getOutsideClickStream(), this.overlayRef ?
            this.overlayRef.detachments().pipe(filter((/**
             * @return {?}
             */
            () => this.overlayAttached))) :
            observableOf()).pipe(
        // Normalize the output so we return a consistent type.
        map((/**
         * @param {?} event
         * @return {?}
         */
        (event) => event instanceof McOptionSelectionChange ? event : null)));
    }
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        Promise.resolve(null).then((/**
         * @return {?}
         */
        () => this.setTriggerValue(value)));
    }
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.elementRef.nativeElement.disabled = isDisabled;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleKeydown(event) {
        // tslint:disable-next-line deprecation
        /** @type {?} */
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
            /** @type {?} */
            const prevActiveItem = this.autocomplete.keyManager.activeItem;
            if (this.panelOpen || keyCode === TAB) {
                this.autocomplete.onKeydown(event);
            }
            else if (keyCode === DOWN_ARROW && this.canOpen()) {
                this.openPanel();
            }
            /** @type {?} */
            const isArrowKey = keyCode === UP_ARROW || keyCode === DOWN_ARROW;
            if (isArrowKey || this.autocomplete.keyManager.activeItem !== prevActiveItem) {
                this.scrollToOption();
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleInput(event) {
        /** @type {?} */
        const target = (/** @type {?} */ (event.target));
        /** @type {?} */
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
    /**
     * @return {?}
     */
    handleFocus() {
        if (!this.canOpenOnNextFocus) {
            this.canOpenOnNextFocus = true;
        }
        else if (this.canOpen()) {
            this.previousValue = this.elementRef.nativeElement.value;
            this.attachOverlay();
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    handleClick($event) {
        if (this.canOpen() && this.document.activeElement === $event.target) {
            this.openPanel();
        }
    }
    /**
     * Stream of clicks outside of the autocomplete panel.
     * @private
     * @return {?}
     */
    getOutsideClickStream() {
        return merge((/** @type {?} */ (
        // tslint:disable-next-line: no-unnecessary-type-assertion
        fromEvent(this.document, 'click'))), (/** @type {?} */ (
        // tslint:disable-next-line: no-unnecessary-type-assertion
        fromEvent(this.document, 'touchend'))))
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const clickTarget = (/** @type {?} */ (event.target));
            /** @type {?} */
            const formField = this.formField ?
                this.formField._elementRef.nativeElement : null;
            return this.overlayAttached &&
                clickTarget !== this.elementRef.nativeElement &&
                (!formField || !formField.contains(clickTarget)) &&
                (!!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget));
        })));
    }
    /**
     * Given that we are not actually focusing active options, we must manually adjust scroll
     * to reveal options below the fold. First, we find the offset of the option from the top
     * of the panel. If that offset is below the fold, the new scrollTop will be the offset -
     * the panel height + the option height, so the active option will be just visible at the
     * bottom of the panel. If that offset is above the top of the visible panel, the new scrollTop
     * will become the offset. If that offset is visible within the panel already, the scrollTop is
     * not adjusted.
     * @private
     * @return {?}
     */
    scrollToOption() {
        /** @type {?} */
        const index = this.autocomplete.keyManager.activeItemIndex || 0;
        /** @type {?} */
        const labelCount = countGroupLabelsBeforeOption(index, this.autocomplete.options, this.autocomplete.optionGroups);
        /** @type {?} */
        const newScrollPosition = getOptionScrollPosition(index + labelCount, AUTOCOMPLETE_OPTION_HEIGHT, this.autocomplete.getScrollTop(), AUTOCOMPLETE_PANEL_HEIGHT);
        this.autocomplete.setScrollTop(newScrollPosition);
    }
    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     * @private
     * @return {?}
     */
    subscribeToClosingActions() {
        /** @type {?} */
        const firstStable = this.zone.onStable.asObservable()
            .pipe(take(1));
        /** @type {?} */
        const optionChanges = this.autocomplete.options.changes
            .pipe(tap((/**
         * @return {?}
         */
        () => this.positionStrategy.reapplyLastPosition())), 
        // Defer emitting to the stream until the next tick, because changing
        // bindings in here will cause "changed after checked" errors.
        delay(0));
        // When the zone is stable initially, and when the option list changes...
        return merge(firstStable, optionChanges)
            .pipe(
        // create a new stream of panelClosingActions, replacing any previous streams
        // that were created, and flatten it so our stream only emits closing events...
        switchMap((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const wasOpen = this.panelOpen;
            this.resetActiveItem();
            this.autocomplete.setVisibility();
            if (this.panelOpen) {
                (/** @type {?} */ (this.overlayRef)).updatePosition();
                // If the `panelOpen` state changed, we need to make sure to emit the `opened`
                // event, because we may not have emitted it when the panel was attached. This
                // can happen if the users opens the panel and there are no options, but the
                // options come in slightly later or as a result of the value changing.
                if (wasOpen !== this.panelOpen) {
                    this.autocomplete.opened.emit();
                }
            }
            return this.panelClosingActions;
        })), 
        // when the first closing event occurs...
        take(1))
            // set the value, close the panel, and complete.
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.setValueAndClose(event)));
    }
    /**
     * Destroys the autocomplete suggestion panel.
     * @private
     * @return {?}
     */
    destroyPanel() {
        if (this.overlayRef) {
            this.closePanel();
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    setTriggerValue(value) {
        /** @type {?} */
        const toDisplay = this.autocomplete && this.autocomplete.displayWith ?
            this.autocomplete.displayWith(value) :
            value;
        // Simply falling back to an empty string if the display value is falsy does not work properly.
        // The display value can also be the number zero and shouldn't fall back to an empty string.
        /** @type {?} */
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
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     * @private
     * @param {?} event
     * @return {?}
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
    /**
     * Clear any previous selected option and emit a selection change event for this option
     * @private
     * @param {?} skip
     * @return {?}
     */
    clearPreviousSelectedOption(skip) {
        this.autocomplete.options.forEach((/**
         * @param {?} option
         * @return {?}
         */
        (option) => {
            if (option !== skip && option.selected) {
                option.deselect();
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    attachOverlay() {
        if (!this.autocomplete) {
            throw getMcAutocompleteMissingPanelError();
        }
        /** @type {?} */
        let overlayRef = this.overlayRef;
        if (!overlayRef) {
            this.portal = new TemplatePortal(this.autocomplete.template, this.viewContainerRef);
            overlayRef = this.overlay.create(this.getOverlayConfig());
            this.overlayRef = overlayRef;
            // Use the `keydownEvents` in order to take advantage of
            // the overlay event targeting provided by the CDK overlay.
            overlayRef.keydownEvents().subscribe((/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                // Close when pressing ESCAPE or ALT + UP_ARROW, based on the a11y guidelines.
                // See: https://www.w3.org/TR/wai-aria-practices-1.1/#textbox-keyboard-interaction
                // tslint:disable-next-line deprecation
                if (event.keyCode === ESCAPE || (event.keyCode === UP_ARROW && event.altKey)) {
                    this.resetActiveItem();
                    this.closeKeyEventStream.next();
                }
            }));
            if (this.viewportRuler) {
                this.viewportSubscription = this.viewportRuler.change().subscribe((/**
                 * @return {?}
                 */
                () => {
                    if (this.panelOpen && overlayRef) {
                        overlayRef.updateSize({ width: this.getPanelWidth() });
                    }
                }));
            }
        }
        else {
            /** @type {?} */
            const position = (/** @type {?} */ (overlayRef.getConfig().positionStrategy));
            // Update the trigger, panel width and direction, in case anything has changed.
            position.setOrigin(this.getConnectedElement());
            overlayRef.updateSize({ width: this.getPanelWidth() });
        }
        if (overlayRef && !overlayRef.hasAttached()) {
            overlayRef.attach(this.portal);
            this.closingActionsSubscription = this.subscribeToClosingActions();
        }
        /** @type {?} */
        const wasOpen = this.panelOpen;
        this.autocomplete.setVisibility();
        this.autocomplete.isOpen = this.overlayAttached = true;
        // We need to do an extra `panelOpen` check in here, because the
        // autocomplete won't be shown if there are no options.
        if (this.panelOpen && wasOpen !== this.panelOpen) {
            this.autocomplete.opened.emit();
        }
    }
    /**
     * @private
     * @return {?}
     */
    getOverlayConfig() {
        return new OverlayConfig({
            positionStrategy: this.getOverlayPosition(),
            scrollStrategy: this.scrollStrategy(),
            width: this.getPanelWidth(),
            direction: this.dir
        });
    }
    /**
     * @private
     * @return {?}
     */
    getOverlayPosition() {
        this.positionStrategy = this.overlay.position()
            .flexibleConnectedTo(this.getConnectedElement())
            .withFlexibleDimensions(false)
            .withPush(false)
            .withPositions((/** @type {?} */ ([
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
        ])));
        return this.positionStrategy;
    }
    /**
     * @private
     * @return {?}
     */
    getConnectedElement() {
        if (this.connectedTo) {
            return this.connectedTo.elementRef;
        }
        return this.formField ? this.formField.getConnectedOverlayOrigin() : this.elementRef;
    }
    /**
     * @private
     * @return {?}
     */
    getPanelWidth() {
        return this.autocomplete.panelWidth || this.getHostWidth() - AUTOCOMPLETE_BORDER_WIDTH;
    }
    /**
     * @private
     * @return {?}
     */
    getHostWidth() {
        return this.getConnectedElement().nativeElement.getBoundingClientRect().width;
    }
    /**
     * Resets the active item to -1 so arrow events will activate the
     * correct options, or to 0 if the consumer opted into it.
     * @private
     * @return {?}
     */
    resetActiveItem() {
        this.autocomplete.keyManager.setActiveItem(this.autocomplete.autoActiveFirstOption ? 0 : -1);
    }
    /**
     * @private
     * @return {?}
     */
    canOpen() {
        /** @type {?} */
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
if (false) {
    /** @type {?} */
    McAutocompleteTrigger.prototype.optionSelections;
    /**
     * The autocomplete panel to be attached to this trigger.
     * @type {?}
     */
    McAutocompleteTrigger.prototype.autocomplete;
    /**
     * Reference relative to which to position the autocomplete panel.
     * Defaults to the autocomplete trigger element.
     * @type {?}
     */
    McAutocompleteTrigger.prototype.connectedTo;
    /**
     * `autocomplete` attribute to be set on the input element.
     * \@docs-private
     * @type {?}
     */
    McAutocompleteTrigger.prototype.autocompleteAttribute;
    /**
     * @type {?}
     * @private
     */
    McAutocompleteTrigger.prototype._autocompleteDisabled;
    /**
     * @type {?}
     * @private
     */
    McAutocompleteTrigger.prototype.overlayAttached;
    /**
     * @type {?}
     * @private
     */
    McAutocompleteTrigger.prototype.overlayRef;
    /**
     * @type {?}
     * @private
     */
    McAutocompleteTrigger.prototype.portal;
    /**
     * @type {?}
     * @private
     */
    McAutocompleteTrigger.prototype.componentDestroyed;
    /**
     * @type {?}
     * @private
     */
    McAutocompleteTrigger.prototype.scrollStrategy;
    /**
     * Old value of the native input. Used to work around issues with the `input` event on IE.
     * @type {?}
     * @private
     */
    McAutocompleteTrigger.prototype.previousValue;
    /**
     * Strategy that is used to position the panel.
     * @type {?}
     * @private
     */
    McAutocompleteTrigger.prototype.positionStrategy;
    /**
     * The subscription for closing actions (some are bound to document).
     * @type {?}
     * @private
     */
    McAutocompleteTrigger.prototype.closingActionsSubscription;
    /**
     * Subscription to viewport size changes.
     * @type {?}
     * @private
     */
    McAutocompleteTrigger.prototype.viewportSubscription;
    /**
     * Whether the autocomplete can open the next time it is focused. Used to prevent a focused,
     * closed autocomplete from being reopened if the user switches to another browser tab and then
     * comes back.
     * @type {?}
     * @private
     */
    McAutocompleteTrigger.prototype.canOpenOnNextFocus;
    /**
     * Stream of keyboard events that can close the panel.
     * @type {?}
     * @private
     */
    McAutocompleteTrigger.prototype.closeKeyEventStream;
    /**
     * `View -> model callback called when value changes`
     * @type {?}
     */
    McAutocompleteTrigger.prototype.onChange;
    /**
     * `View -> model callback called when autocomplete has been touched`
     * @type {?}
     */
    McAutocompleteTrigger.prototype.onTouched;
    /**
     * Event handler for when the window is blurred. Needs to be an
     * arrow function in order to preserve the context.
     * @type {?}
     * @private
     */
    McAutocompleteTrigger.prototype.windowBlurHandler;
    /**
     * @type {?}
     * @private
     */
    McAutocompleteTrigger.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    McAutocompleteTrigger.prototype.viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    McAutocompleteTrigger.prototype.changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    McAutocompleteTrigger.prototype.overlay;
    /**
     * @type {?}
     * @private
     */
    McAutocompleteTrigger.prototype.zone;
    /**
     * @type {?}
     * @private
     */
    McAutocompleteTrigger.prototype.dir;
    /**
     * @type {?}
     * @private
     */
    McAutocompleteTrigger.prototype.formField;
    /**
     * @type {?}
     * @private
     */
    McAutocompleteTrigger.prototype.document;
    /**
     * @type {?}
     * @private
     */
    McAutocompleteTrigger.prototype.viewportRuler;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLXRyaWdnZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvYXV0b2NvbXBsZXRlLyIsInNvdXJjZXMiOlsiYXV0b2NvbXBsZXRlLXRyaWdnZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFHSCxPQUFPLEVBQ1AsYUFBYSxFQUloQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDSCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixVQUFVLEVBQ1YsSUFBSSxFQUNKLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BGLE9BQU8sRUFDSCw0QkFBNEIsRUFDNUIsdUJBQXVCLEVBRXZCLHVCQUF1QixFQUMxQixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxTQUFT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NUMvQixpREFVRzs7Ozs7SUFnQkgsNkNBQXNEOzs7Ozs7SUFNdEQsNENBQXNFOzs7Ozs7SUFNdEUsc0RBQTZEOzs7OztJQWU3RCxzREFBc0M7Ozs7O0lBRXRDLGdEQUF5Qzs7Ozs7SUFFekMsMkNBQXNDOzs7OztJQUV0Qyx1Q0FBK0I7Ozs7O0lBRS9CLG1EQUFtQzs7Ozs7SUFFbkMsK0NBQTZDOzs7Ozs7SUFHN0MsOENBQThDOzs7Ozs7SUFHOUMsaURBQTREOzs7Ozs7SUFHNUQsMkRBQWlEOzs7Ozs7SUFHakQscURBQWtEOzs7Ozs7OztJQU9sRCxtREFBa0M7Ozs7OztJQUdsQyxvREFBMkQ7Ozs7O0lBdUMzRCx5Q0FBMEM7Ozs7O0lBSTFDLDBDQUFpQzs7Ozs7OztJQWlMakMsa0RBS0M7Ozs7O0lBOU5HLDJDQUFnRDs7Ozs7SUFDaEQsaURBQTBDOzs7OztJQUMxQyxrREFBNEM7Ozs7O0lBQzVDLHdDQUF3Qjs7Ozs7SUFDeEIscUNBQW9COzs7OztJQUVwQixvQ0FBdUM7Ozs7O0lBQ3ZDLDBDQUFrRDs7Ozs7SUFDbEQseUNBQW1EOzs7OztJQUVuRCw4Q0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIENvbm5lY3RlZFBvc2l0aW9uLFxuICAgIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSxcbiAgICBPdmVybGF5LFxuICAgIE92ZXJsYXlDb25maWcsXG4gICAgT3ZlcmxheVJlZixcbiAgICBQb3NpdGlvblN0cmF0ZWd5LFxuICAgIFNjcm9sbFN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBWaWV3cG9ydFJ1bGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSG9zdCxcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPcHRpb25hbCxcbiAgICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRE9XTl9BUlJPVywgRU5URVIsIEVTQ0FQRSwgVEFCLCBVUF9BUlJPVyB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICAgIGNvdW50R3JvdXBMYWJlbHNCZWZvcmVPcHRpb24sXG4gICAgZ2V0T3B0aW9uU2Nyb2xsUG9zaXRpb24sXG4gICAgTWNPcHRpb24sXG4gICAgTWNPcHRpb25TZWxlY3Rpb25DaGFuZ2Vcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNGb3JtRmllbGQgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIGRlZmVyLCBmcm9tRXZlbnQsIG1lcmdlLCBvZiBhcyBvYnNlcnZhYmxlT2YsIFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZSwgc3dpdGNoTWFwLCBkZWxheSwgdGFwLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1jQXV0b2NvbXBsZXRlT3JpZ2luIH0gZnJvbSAnLi9hdXRvY29tcGxldGUtb3JpZ2luLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNY0F1dG9jb21wbGV0ZSB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLmNvbXBvbmVudCc7XG5cblxuLyoqXG4gKiBUaGUgZm9sbG93aW5nIHN0eWxlIGNvbnN0YW50cyBhcmUgbmVjZXNzYXJ5IHRvIHNhdmUgaGVyZSBpbiBvcmRlclxuICogdG8gcHJvcGVybHkgY2FsY3VsYXRlIHRoZSBzY3JvbGxUb3Agb2YgdGhlIHBhbmVsLiBCZWNhdXNlIHdlIGFyZSBub3RcbiAqIGFjdHVhbGx5IGZvY3VzaW5nIHRoZSBhY3RpdmUgaXRlbSwgc2Nyb2xsIG11c3QgYmUgaGFuZGxlZCBtYW51YWxseS5cbiAqL1xuXG4vKiogVGhlIGhlaWdodCBvZiBlYWNoIGF1dG9jb21wbGV0ZSBvcHRpb24uICovXG5leHBvcnQgY29uc3QgQVVUT0NPTVBMRVRFX09QVElPTl9IRUlHSFQgPSAzMjtcblxuLyoqIFRoZSB0b3RhbCBoZWlnaHQgb2YgdGhlIGF1dG9jb21wbGV0ZSBwYW5lbC4gKi9cbmV4cG9ydCBjb25zdCBBVVRPQ09NUExFVEVfUEFORUxfSEVJR0hUID0gMjU2O1xuXG5leHBvcnQgY29uc3QgQVVUT0NPTVBMRVRFX0JPUkRFUl9XSURUSDogbnVtYmVyID0gMjtcblxuLyoqIEluamVjdGlvbiB0b2tlbiB0aGF0IGRldGVybWluZXMgdGhlIHNjcm9sbCBoYW5kbGluZyB3aGlsZSB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsIGlzIG9wZW4uICovXG5leHBvcnQgY29uc3QgTUNfQVVUT0NPTVBMRVRFX1NDUk9MTF9TVFJBVEVHWSA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPCgpID0+IFNjcm9sbFN0cmF0ZWd5PignbWMtYXV0b2NvbXBsZXRlLXNjcm9sbC1zdHJhdGVneScpO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBmdW5jdGlvbiBNQ19BVVRPQ09NUExFVEVfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUlkob3ZlcmxheTogT3ZlcmxheSk6ICgpID0+IFNjcm9sbFN0cmF0ZWd5IHtcbiAgICByZXR1cm4gKCkgPT4gb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oKTtcbn1cblxuZXhwb3J0IGNvbnN0IE1DX0FVVE9DT01QTEVURV9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUiA9IHtcbiAgICBwcm92aWRlOiBNQ19BVVRPQ09NUExFVEVfU0NST0xMX1NUUkFURUdZLFxuICAgIGRlcHM6IFtPdmVybGF5XSxcbiAgICB1c2VGYWN0b3J5OiBNQ19BVVRPQ09NUExFVEVfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllcbn07XG5cbi8qKlxuICogUHJvdmlkZXIgdGhhdCBhbGxvd3MgdGhlIGF1dG9jb21wbGV0ZSB0byByZWdpc3RlciBhcyBhIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgTUFUX0FVVE9DT01QTEVURV9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1jQXV0b2NvbXBsZXRlVHJpZ2dlciksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBlcnJvciB0byBiZSB0aHJvd24gd2hlbiBhdHRlbXB0aW5nIHRvIHVzZSBhbiBhdXRvY29tcGxldGUgdHJpZ2dlciB3aXRob3V0IGEgcGFuZWwuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNY0F1dG9jb21wbGV0ZU1pc3NpbmdQYW5lbEVycm9yKCk6IEVycm9yIHtcbiAgICByZXR1cm4gRXJyb3IoJ0F0dGVtcHRpbmcgdG8gb3BlbiBhbiB1bmRlZmluZWQgaW5zdGFuY2Ugb2YgYG1jLWF1dG9jb21wbGV0ZWAuICcgK1xuICAgICAgICAnTWFrZSBzdXJlIHRoYXQgdGhlIGlkIHBhc3NlZCB0byB0aGUgYG1jQXV0b2NvbXBsZXRlYCBpcyBjb3JyZWN0IGFuZCB0aGF0ICcgK1xuICAgICAgICAneW91XFwncmUgYXR0ZW1wdGluZyB0byBvcGVuIGl0IGFmdGVyIHRoZSBuZ0FmdGVyQ29udGVudEluaXQgaG9vay4nKTtcbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogYGlucHV0W21jQXV0b2NvbXBsZXRlXSwgdGV4dGFyZWFbbWNBdXRvY29tcGxldGVdYCxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtYXV0b2NvbXBsZXRlLXRyaWdnZXInLFxuICAgICAgICAnW2F0dHIuYXV0b2NvbXBsZXRlXSc6ICdhdXRvY29tcGxldGVBdHRyaWJ1dGUnLFxuICAgICAgICAvLyBOb3RlOiB3ZSB1c2UgYGZvY3VzaW5gLCBhcyBvcHBvc2VkIHRvIGBmb2N1c2AsIGluIG9yZGVyIHRvIG9wZW4gdGhlIHBhbmVsXG4gICAgICAgIC8vIGEgbGl0dGxlIGVhcmxpZXIuIFRoaXMgYXZvaWRzIGlzc3VlcyB3aGVyZSBJRSBkZWxheXMgdGhlIGZvY3VzaW5nIG9mIHRoZSBpbnB1dC5cbiAgICAgICAgJyhmb2N1c2luKSc6ICdoYW5kbGVGb2N1cygpJyxcbiAgICAgICAgJyhibHVyKSc6ICdvblRvdWNoZWQoKScsXG4gICAgICAgICcoaW5wdXQpJzogJ2hhbmRsZUlucHV0KCRldmVudCknLFxuICAgICAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleWRvd24oJGV2ZW50KScsXG4gICAgICAgICcoY2xpY2spJzogJ2hhbmRsZUNsaWNrKCRldmVudCknXG4gICAgfSxcbiAgICBleHBvcnRBczogJ21jQXV0b2NvbXBsZXRlVHJpZ2dlcicsXG4gICAgcHJvdmlkZXJzOiBbTUFUX0FVVE9DT01QTEVURV9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgTWNBdXRvY29tcGxldGVUcmlnZ2VyIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHJlYWRvbmx5IG9wdGlvblNlbGVjdGlvbnM6IE9ic2VydmFibGU8TWNPcHRpb25TZWxlY3Rpb25DaGFuZ2U+ID0gZGVmZXIoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5hdXRvY29tcGxldGUgJiYgdGhpcy5hdXRvY29tcGxldGUub3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIG1lcmdlKC4uLnRoaXMuYXV0b2NvbXBsZXRlLm9wdGlvbnMubWFwKChvcHRpb24pID0+IG9wdGlvbi5vblNlbGVjdGlvbkNoYW5nZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlcmUgYXJlIGFueSBzdWJzY3JpYmVycyBiZWZvcmUgYG5nQWZ0ZXJWaWV3SW5pdGAsIHRoZSBgYXV0b2NvbXBsZXRlYCB3aWxsIGJlIHVuZGVmaW5lZC5cbiAgICAgICAgLy8gUmV0dXJuIGEgc3RyZWFtIHRoYXQgd2UnbGwgcmVwbGFjZSB3aXRoIHRoZSByZWFsIG9uZSBvbmNlIGV2ZXJ5dGhpbmcgaXMgaW4gcGxhY2UuXG4gICAgICAgIHJldHVybiB0aGlzLnpvbmUub25TdGFibGVcbiAgICAgICAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSwgc3dpdGNoTWFwKCgpID0+IHRoaXMub3B0aW9uU2VsZWN0aW9ucykpO1xuICAgIH0pO1xuXG4gICAgLyoqIFRoZSBjdXJyZW50bHkgYWN0aXZlIG9wdGlvbiwgY29lcmNlZCB0byBNYXRPcHRpb24gdHlwZS4gKi9cbiAgICBnZXQgYWN0aXZlT3B0aW9uKCk6IE1jT3B0aW9uIHwgbnVsbCB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9jb21wbGV0ZSAmJiB0aGlzLmF1dG9jb21wbGV0ZS5rZXlNYW5hZ2VyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hdXRvY29tcGxldGUua2V5TWFuYWdlci5hY3RpdmVJdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZ2V0IHBhbmVsT3BlbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheUF0dGFjaGVkICYmIHRoaXMuYXV0b2NvbXBsZXRlLnNob3dQYW5lbDtcbiAgICB9XG5cbiAgICAvKiogVGhlIGF1dG9jb21wbGV0ZSBwYW5lbCB0byBiZSBhdHRhY2hlZCB0byB0aGlzIHRyaWdnZXIuICovXG4gICAgQElucHV0KCdtY0F1dG9jb21wbGV0ZScpIGF1dG9jb21wbGV0ZTogTWNBdXRvY29tcGxldGU7XG5cbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2UgcmVsYXRpdmUgdG8gd2hpY2ggdG8gcG9zaXRpb24gdGhlIGF1dG9jb21wbGV0ZSBwYW5lbC5cbiAgICAgKiBEZWZhdWx0cyB0byB0aGUgYXV0b2NvbXBsZXRlIHRyaWdnZXIgZWxlbWVudC5cbiAgICAgKi9cbiAgICBASW5wdXQoJ21jQXV0b2NvbXBsZXRlQ29ubmVjdGVkVG8nKSBjb25uZWN0ZWRUbzogTWNBdXRvY29tcGxldGVPcmlnaW47XG5cbiAgICAvKipcbiAgICAgKiBgYXV0b2NvbXBsZXRlYCBhdHRyaWJ1dGUgdG8gYmUgc2V0IG9uIHRoZSBpbnB1dCBlbGVtZW50LlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoJ2F1dG9jb21wbGV0ZScpIGF1dG9jb21wbGV0ZUF0dHJpYnV0ZTogc3RyaW5nID0gJ29mZic7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBhdXRvY29tcGxldGUgaXMgZGlzYWJsZWQuIFdoZW4gZGlzYWJsZWQsIHRoZSBlbGVtZW50IHdpbGxcbiAgICAgKiBhY3QgYXMgYSByZWd1bGFyIGlucHV0IGFuZCB0aGUgdXNlciB3b24ndCBiZSBhYmxlIHRvIG9wZW4gdGhlIHBhbmVsLlxuICAgICAqL1xuICAgIEBJbnB1dCgnbWNBdXRvY29tcGxldGVEaXNhYmxlZCcpXG4gICAgZ2V0IGF1dG9jb21wbGV0ZURpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXV0b2NvbXBsZXRlRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGF1dG9jb21wbGV0ZURpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2F1dG9jb21wbGV0ZURpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hdXRvY29tcGxldGVEaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBvdmVybGF5QXR0YWNoZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZiB8IG51bGw7XG5cbiAgICBwcml2YXRlIHBvcnRhbDogVGVtcGxhdGVQb3J0YWw7XG5cbiAgICBwcml2YXRlIGNvbXBvbmVudERlc3Ryb3llZCA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBzY3JvbGxTdHJhdGVneTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3k7XG5cbiAgICAvKiogT2xkIHZhbHVlIG9mIHRoZSBuYXRpdmUgaW5wdXQuIFVzZWQgdG8gd29yayBhcm91bmQgaXNzdWVzIHdpdGggdGhlIGBpbnB1dGAgZXZlbnQgb24gSUUuICovXG4gICAgcHJpdmF0ZSBwcmV2aW91c1ZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsO1xuXG4gICAgLyoqIFN0cmF0ZWd5IHRoYXQgaXMgdXNlZCB0byBwb3NpdGlvbiB0aGUgcGFuZWwuICovXG4gICAgcHJpdmF0ZSBwb3NpdGlvblN0cmF0ZWd5OiBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3k7XG5cbiAgICAvKiogVGhlIHN1YnNjcmlwdGlvbiBmb3IgY2xvc2luZyBhY3Rpb25zIChzb21lIGFyZSBib3VuZCB0byBkb2N1bWVudCkuICovXG4gICAgcHJpdmF0ZSBjbG9zaW5nQWN0aW9uc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byB2aWV3cG9ydCBzaXplIGNoYW5nZXMuICovXG4gICAgcHJpdmF0ZSB2aWV3cG9ydFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGF1dG9jb21wbGV0ZSBjYW4gb3BlbiB0aGUgbmV4dCB0aW1lIGl0IGlzIGZvY3VzZWQuIFVzZWQgdG8gcHJldmVudCBhIGZvY3VzZWQsXG4gICAgICogY2xvc2VkIGF1dG9jb21wbGV0ZSBmcm9tIGJlaW5nIHJlb3BlbmVkIGlmIHRoZSB1c2VyIHN3aXRjaGVzIHRvIGFub3RoZXIgYnJvd3NlciB0YWIgYW5kIHRoZW5cbiAgICAgKiBjb21lcyBiYWNrLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2FuT3Blbk9uTmV4dEZvY3VzID0gdHJ1ZTtcblxuICAgIC8qKiBTdHJlYW0gb2Yga2V5Ym9hcmQgZXZlbnRzIHRoYXQgY2FuIGNsb3NlIHRoZSBwYW5lbC4gKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IGNsb3NlS2V5RXZlbnRTdHJlYW0gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICAgICAgQEluamVjdChNQ19BVVRPQ09NUExFVEVfU0NST0xMX1NUUkFURUdZKSBzY3JvbGxTdHJhdGVneTogYW55LFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgcHJpdmF0ZSBmb3JtRmllbGQ6IE1jRm9ybUZpZWxkLFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXG4gICAgICAgIC8vIEBicmVha2luZy1jaGFuZ2UgOC4wLjAgTWFrZSBgX3ZpZXdwb3J0UnVsZXJgIHJlcXVpcmVkLlxuICAgICAgICBwcml2YXRlIHZpZXdwb3J0UnVsZXI/OiBWaWV3cG9ydFJ1bGVyXG4gICAgKSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBuby10eXBlb2YtdW5kZWZpbmVkXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLndpbmRvd0JsdXJIYW5kbGVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY3JvbGxTdHJhdGVneSA9IHNjcm9sbFN0cmF0ZWd5O1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbm8tdHlwZW9mLXVuZGVmaW5lZFxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy53aW5kb3dCbHVySGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZpZXdwb3J0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50RGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kZXN0cm95UGFuZWwoKTtcbiAgICAgICAgdGhpcy5jbG9zZUtleUV2ZW50U3RyZWFtLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLyoqIGBWaWV3IC0+IG1vZGVsIGNhbGxiYWNrIGNhbGxlZCB3aGVuIHZhbHVlIGNoYW5nZXNgICovXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5XG4gICAgb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgICAvKiogYFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gYXV0b2NvbXBsZXRlIGhhcyBiZWVuIHRvdWNoZWRgICovXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5XG4gICAgb25Ub3VjaGVkOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgICAvKiogT3BlbnMgdGhlIGF1dG9jb21wbGV0ZSBzdWdnZXN0aW9uIHBhbmVsLiAqL1xuICAgIG9wZW5QYW5lbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hdHRhY2hPdmVybGF5KCk7XG4gICAgfVxuXG4gICAgY2xvc2VQYW5lbCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlBdHRhY2hlZCkgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAodGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLmNsb3NlZC5lbWl0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5pc09wZW4gPSB0aGlzLm92ZXJsYXlBdHRhY2hlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYgJiYgdGhpcy5vdmVybGF5UmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2luZ0FjdGlvbnNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5vdGUgdGhhdCBpbiBzb21lIGNhc2VzIHRoaXMgY2FuIGVuZCB1cCBiZWluZyBjYWxsZWQgYWZ0ZXIgdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuXG4gICAgICAgIC8vIEFkZCBhIGNoZWNrIHRvIGVuc3VyZSB0aGF0IHdlIGRvbid0IHRyeSB0byBydW4gY2hhbmdlIGRldGVjdGlvbiBvbiBhIGRlc3Ryb3llZCB2aWV3LlxuICAgICAgICBpZiAoIXRoaXMuY29tcG9uZW50RGVzdHJveWVkKSB7XG4gICAgICAgICAgICAvLyBXZSBuZWVkIHRvIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiBtYW51YWxseSwgYmVjYXVzZVxuICAgICAgICAgICAgLy8gYGZyb21FdmVudGAgZG9lc24ndCBzZWVtIHRvIGRvIGl0IGF0IHRoZSBwcm9wZXIgdGltZS5cbiAgICAgICAgICAgIC8vIFRoaXMgZW5zdXJlcyB0aGF0IHRoZSBsYWJlbCBpcyByZXNldCB3aGVuIHRoZVxuICAgICAgICAgICAgLy8gdXNlciBjbGlja3Mgb3V0c2lkZS5cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgcG9zaXRpb24gb2YgdGhlIGF1dG9jb21wbGV0ZSBzdWdnZXN0aW9uIHBhbmVsIHRvIGVuc3VyZSB0aGF0IGl0IGZpdHMgYWxsIG9wdGlvbnNcbiAgICAgKiB3aXRoaW4gdGhlIHZpZXdwb3J0LlxuICAgICAqL1xuICAgIHVwZGF0ZVBvc2l0aW9uKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5QXR0YWNoZWQpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiEudXBkYXRlUG9zaXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgc3RyZWFtIG9mIGFjdGlvbnMgdGhhdCBzaG91bGQgY2xvc2UgdGhlIGF1dG9jb21wbGV0ZSBwYW5lbCwgaW5jbHVkaW5nXG4gICAgICogd2hlbiBhbiBvcHRpb24gaXMgc2VsZWN0ZWQsIG9uIGJsdXIsIGFuZCB3aGVuIFRBQiBpcyBwcmVzc2VkLlxuICAgICAqL1xuICAgIGdldCBwYW5lbENsb3NpbmdBY3Rpb25zKCk6IE9ic2VydmFibGU8TWNPcHRpb25TZWxlY3Rpb25DaGFuZ2UgfCBudWxsPiB7XG4gICAgICAgIHJldHVybiBtZXJnZShcbiAgICAgICAgICAgIHRoaXMub3B0aW9uU2VsZWN0aW9ucyxcbiAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLmtleU1hbmFnZXIudGFiT3V0LnBpcGUoZmlsdGVyKCgpID0+IHRoaXMub3ZlcmxheUF0dGFjaGVkKSksXG4gICAgICAgICAgICB0aGlzLmNsb3NlS2V5RXZlbnRTdHJlYW0sXG4gICAgICAgICAgICB0aGlzLmdldE91dHNpZGVDbGlja1N0cmVhbSgpLFxuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID9cbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNobWVudHMoKS5waXBlKGZpbHRlcigoKSA9PiB0aGlzLm92ZXJsYXlBdHRhY2hlZCkpIDpcbiAgICAgICAgICAgICAgICBvYnNlcnZhYmxlT2YoKVxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgICAvLyBOb3JtYWxpemUgdGhlIG91dHB1dCBzbyB3ZSByZXR1cm4gYSBjb25zaXN0ZW50IHR5cGUuXG4gICAgICAgICAgICBtYXAoKGV2ZW50KSA9PiBldmVudCBpbnN0YW5jZW9mIE1jT3B0aW9uU2VsZWN0aW9uQ2hhbmdlID8gZXZlbnQgOiBudWxsKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHRoaXMuc2V0VHJpZ2dlclZhbHVlKHZhbHVlKSk7XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4ge30pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIGRlcHJlY2F0aW9uXG4gICAgICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuXG4gICAgICAgIC8vIFByZXZlbnQgdGhlIGRlZmF1bHQgYWN0aW9uIG9uIGFsbCBlc2NhcGUga2V5IHByZXNzZXMuIFRoaXMgaXMgaGVyZSBwcmltYXJpbHkgdG8gYnJpbmcgSUVcbiAgICAgICAgLy8gaW4gbGluZSB3aXRoIG90aGVyIGJyb3dzZXJzLiBCeSBkZWZhdWx0LCBwcmVzc2luZyBlc2NhcGUgb24gSUUgd2lsbCBjYXVzZSBpdCB0byByZXZlcnRcbiAgICAgICAgLy8gdGhlIGlucHV0IHZhbHVlIHRvIHRoZSBvbmUgdGhhdCBpdCBoYWQgb24gZm9jdXMsIGhvd2V2ZXIgaXQgd29uJ3QgZGlzcGF0Y2ggYW55IGV2ZW50c1xuICAgICAgICAvLyB3aGljaCBtZWFucyB0aGF0IHRoZSBtb2RlbCB2YWx1ZSB3aWxsIGJlIG91dCBvZiBzeW5jIHdpdGggdGhlIHZpZXcuXG4gICAgICAgIGlmIChrZXlDb2RlID09PSBFU0NBUEUpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hY3RpdmVPcHRpb24gJiYga2V5Q29kZSA9PT0gRU5URVIgJiYgdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlT3B0aW9uLnNlbGVjdFZpYUludGVyYWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLnJlc2V0QWN0aXZlSXRlbSgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmF1dG9jb21wbGV0ZSkge1xuICAgICAgICAgICAgY29uc3QgcHJldkFjdGl2ZUl0ZW0gPSB0aGlzLmF1dG9jb21wbGV0ZS5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnBhbmVsT3BlbiB8fCBrZXlDb2RlID09PSBUQUIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5vbktleWRvd24oZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBET1dOX0FSUk9XICYmIHRoaXMuY2FuT3BlbigpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgaXNBcnJvd0tleSA9IGtleUNvZGUgPT09IFVQX0FSUk9XIHx8IGtleUNvZGUgPT09IERPV05fQVJST1c7XG5cbiAgICAgICAgICAgIGlmIChpc0Fycm93S2V5IHx8IHRoaXMuYXV0b2NvbXBsZXRlLmtleU1hbmFnZXIuYWN0aXZlSXRlbSAhPT0gcHJldkFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvT3B0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVJbnB1dChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgICAgbGV0IHZhbHVlOiBudW1iZXIgfCBzdHJpbmcgfCBudWxsID0gdGFyZ2V0LnZhbHVlO1xuXG4gICAgICAgIC8vIEJhc2VkIG9uIGBOdW1iZXJWYWx1ZUFjY2Vzc29yYCBmcm9tIGZvcm1zLlxuICAgICAgICBpZiAodGFyZ2V0LnR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlID09PSAnJyA/IG51bGwgOiBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZSBpbnB1dCBoYXMgYSBwbGFjZWhvbGRlciwgSUUgd2lsbCBmaXJlIHRoZSBgaW5wdXRgIGV2ZW50IG9uIHBhZ2UgbG9hZCxcbiAgICAgICAgLy8gZm9jdXMgYW5kIGJsdXIsIGluIGFkZGl0aW9uIHRvIHdoZW4gdGhlIHVzZXIgYWN0dWFsbHkgY2hhbmdlZCB0aGUgdmFsdWUuIFRvXG4gICAgICAgIC8vIGZpbHRlciBvdXQgYWxsIG9mIHRoZSBleHRyYSBldmVudHMsIHdlIHNhdmUgdGhlIHZhbHVlIG9uIGZvY3VzIGFuZCBiZXR3ZWVuXG4gICAgICAgIC8vIGBpbnB1dGAgZXZlbnRzLCBhbmQgd2UgY2hlY2sgd2hldGhlciBpdCBjaGFuZ2VkLlxuICAgICAgICAvLyBTZWU6IGh0dHBzOi8vY29ubmVjdC5taWNyb3NvZnQuY29tL0lFL2ZlZWRiYWNrL2RldGFpbHMvODg1NzQ3L1xuICAgICAgICBpZiAodGhpcy5wcmV2aW91c1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91c1ZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY2FuT3BlbigpICYmIHRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUZvY3VzKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuY2FuT3Blbk9uTmV4dEZvY3VzKSB7XG4gICAgICAgICAgICB0aGlzLmNhbk9wZW5Pbk5leHRGb2N1cyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jYW5PcGVuKCkpIHtcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNWYWx1ZSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5hdHRhY2hPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljaygkZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FuT3BlbigpICYmIHRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gJGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBTdHJlYW0gb2YgY2xpY2tzIG91dHNpZGUgb2YgdGhlIGF1dG9jb21wbGV0ZSBwYW5lbC4gKi9cbiAgICBwcml2YXRlIGdldE91dHNpZGVDbGlja1N0cmVhbSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gbWVyZ2UoXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVubmVjZXNzYXJ5LXR5cGUtYXNzZXJ0aW9uXG4gICAgICAgICAgICBmcm9tRXZlbnQodGhpcy5kb2N1bWVudCwgJ2NsaWNrJykgYXMgT2JzZXJ2YWJsZTxNb3VzZUV2ZW50PixcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW5uZWNlc3NhcnktdHlwZS1hc3NlcnRpb25cbiAgICAgICAgICAgIGZyb21FdmVudCh0aGlzLmRvY3VtZW50LCAndG91Y2hlbmQnKSBhcyBPYnNlcnZhYmxlPFRvdWNoRXZlbnQ+XG4gICAgICAgIClcbiAgICAgICAgICAgIC5waXBlKGZpbHRlcigoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjbGlja1RhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtRmllbGQgPSB0aGlzLmZvcm1GaWVsZCA/XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybUZpZWxkLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheUF0dGFjaGVkICYmXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrVGFyZ2V0ICE9PSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCAmJlxuICAgICAgICAgICAgICAgICAgICAoIWZvcm1GaWVsZCB8fCAhZm9ybUZpZWxkLmNvbnRhaW5zKGNsaWNrVGFyZ2V0KSkgJiZcbiAgICAgICAgICAgICAgICAgICAgKCEhdGhpcy5vdmVybGF5UmVmICYmICF0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuY29udGFpbnMoY2xpY2tUYXJnZXQpKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGVyIGZvciB3aGVuIHRoZSB3aW5kb3cgaXMgYmx1cnJlZC4gTmVlZHMgdG8gYmUgYW5cbiAgICAgKiBhcnJvdyBmdW5jdGlvbiBpbiBvcmRlciB0byBwcmVzZXJ2ZSB0aGUgY29udGV4dC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHdpbmRvd0JsdXJIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICAvLyBJZiB0aGUgdXNlciBibHVycmVkIHRoZSB3aW5kb3cgd2hpbGUgdGhlIGF1dG9jb21wbGV0ZSBpcyBmb2N1c2VkLCBpdCBtZWFucyB0aGF0IGl0J2xsIGJlXG4gICAgICAgIC8vIHJlZm9jdXNlZCB3aGVuIHRoZXkgY29tZSBiYWNrLiBJbiB0aGlzIGNhc2Ugd2Ugd2FudCB0byBza2lwIHRoZSBmaXJzdCBmb2N1cyBldmVudCwgaWYgdGhlXG4gICAgICAgIC8vIHBhbmUgd2FzIGNsb3NlZCwgaW4gb3JkZXIgdG8gYXZvaWQgcmVvcGVuaW5nIGl0IHVuaW50ZW50aW9uYWxseS5cbiAgICAgICAgdGhpcy5jYW5PcGVuT25OZXh0Rm9jdXMgPSB0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IHx8IHRoaXMucGFuZWxPcGVuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdpdmVuIHRoYXQgd2UgYXJlIG5vdCBhY3R1YWxseSBmb2N1c2luZyBhY3RpdmUgb3B0aW9ucywgd2UgbXVzdCBtYW51YWxseSBhZGp1c3Qgc2Nyb2xsXG4gICAgICogdG8gcmV2ZWFsIG9wdGlvbnMgYmVsb3cgdGhlIGZvbGQuIEZpcnN0LCB3ZSBmaW5kIHRoZSBvZmZzZXQgb2YgdGhlIG9wdGlvbiBmcm9tIHRoZSB0b3BcbiAgICAgKiBvZiB0aGUgcGFuZWwuIElmIHRoYXQgb2Zmc2V0IGlzIGJlbG93IHRoZSBmb2xkLCB0aGUgbmV3IHNjcm9sbFRvcCB3aWxsIGJlIHRoZSBvZmZzZXQgLVxuICAgICAqIHRoZSBwYW5lbCBoZWlnaHQgKyB0aGUgb3B0aW9uIGhlaWdodCwgc28gdGhlIGFjdGl2ZSBvcHRpb24gd2lsbCBiZSBqdXN0IHZpc2libGUgYXQgdGhlXG4gICAgICogYm90dG9tIG9mIHRoZSBwYW5lbC4gSWYgdGhhdCBvZmZzZXQgaXMgYWJvdmUgdGhlIHRvcCBvZiB0aGUgdmlzaWJsZSBwYW5lbCwgdGhlIG5ldyBzY3JvbGxUb3BcbiAgICAgKiB3aWxsIGJlY29tZSB0aGUgb2Zmc2V0LiBJZiB0aGF0IG9mZnNldCBpcyB2aXNpYmxlIHdpdGhpbiB0aGUgcGFuZWwgYWxyZWFkeSwgdGhlIHNjcm9sbFRvcCBpc1xuICAgICAqIG5vdCBhZGp1c3RlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNjcm9sbFRvT3B0aW9uKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuYXV0b2NvbXBsZXRlLmtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4IHx8IDA7XG4gICAgICAgIGNvbnN0IGxhYmVsQ291bnQgPSBjb3VudEdyb3VwTGFiZWxzQmVmb3JlT3B0aW9uKGluZGV4LFxuICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUub3B0aW9ucywgdGhpcy5hdXRvY29tcGxldGUub3B0aW9uR3JvdXBzKTtcblxuICAgICAgICBjb25zdCBuZXdTY3JvbGxQb3NpdGlvbiA9IGdldE9wdGlvblNjcm9sbFBvc2l0aW9uKFxuICAgICAgICAgICAgaW5kZXggKyBsYWJlbENvdW50LFxuICAgICAgICAgICAgQVVUT0NPTVBMRVRFX09QVElPTl9IRUlHSFQsXG4gICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5nZXRTY3JvbGxUb3AoKSxcbiAgICAgICAgICAgIEFVVE9DT01QTEVURV9QQU5FTF9IRUlHSFRcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5zZXRTY3JvbGxUb3AobmV3U2Nyb2xsUG9zaXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIGxpc3RlbnMgdG8gYSBzdHJlYW0gb2YgcGFuZWwgY2xvc2luZyBhY3Rpb25zIGFuZCByZXNldHMgdGhlXG4gICAgICogc3RyZWFtIGV2ZXJ5IHRpbWUgdGhlIG9wdGlvbiBsaXN0IGNoYW5nZXMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdWJzY3JpYmVUb0Nsb3NpbmdBY3Rpb25zKCk6IFN1YnNjcmlwdGlvbiB7XG4gICAgICAgIGNvbnN0IGZpcnN0U3RhYmxlID0gdGhpcy56b25lLm9uU3RhYmxlLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKTtcbiAgICAgICAgY29uc3Qgb3B0aW9uQ2hhbmdlcyA9IHRoaXMuYXV0b2NvbXBsZXRlLm9wdGlvbnMuY2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgdGFwKCgpID0+IHRoaXMucG9zaXRpb25TdHJhdGVneS5yZWFwcGx5TGFzdFBvc2l0aW9uKCkpLFxuICAgICAgICAgICAgICAgIC8vIERlZmVyIGVtaXR0aW5nIHRvIHRoZSBzdHJlYW0gdW50aWwgdGhlIG5leHQgdGljaywgYmVjYXVzZSBjaGFuZ2luZ1xuICAgICAgICAgICAgICAgIC8vIGJpbmRpbmdzIGluIGhlcmUgd2lsbCBjYXVzZSBcImNoYW5nZWQgYWZ0ZXIgY2hlY2tlZFwiIGVycm9ycy5cbiAgICAgICAgICAgICAgICBkZWxheSgwKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAvLyBXaGVuIHRoZSB6b25lIGlzIHN0YWJsZSBpbml0aWFsbHksIGFuZCB3aGVuIHRoZSBvcHRpb24gbGlzdCBjaGFuZ2VzLi4uXG4gICAgICAgIHJldHVybiBtZXJnZShmaXJzdFN0YWJsZSwgb3B0aW9uQ2hhbmdlcylcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBzdHJlYW0gb2YgcGFuZWxDbG9zaW5nQWN0aW9ucywgcmVwbGFjaW5nIGFueSBwcmV2aW91cyBzdHJlYW1zXG4gICAgICAgICAgICAgICAgLy8gdGhhdCB3ZXJlIGNyZWF0ZWQsIGFuZCBmbGF0dGVuIGl0IHNvIG91ciBzdHJlYW0gb25seSBlbWl0cyBjbG9zaW5nIGV2ZW50cy4uLlxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdhc09wZW4gPSB0aGlzLnBhbmVsT3BlbjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldEFjdGl2ZUl0ZW0oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUuc2V0VmlzaWJpbGl0eSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmIS51cGRhdGVQb3NpdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgYHBhbmVsT3BlbmAgc3RhdGUgY2hhbmdlZCwgd2UgbmVlZCB0byBtYWtlIHN1cmUgdG8gZW1pdCB0aGUgYG9wZW5lZGBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV2ZW50LCBiZWNhdXNlIHdlIG1heSBub3QgaGF2ZSBlbWl0dGVkIGl0IHdoZW4gdGhlIHBhbmVsIHdhcyBhdHRhY2hlZC4gVGhpc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FuIGhhcHBlbiBpZiB0aGUgdXNlcnMgb3BlbnMgdGhlIHBhbmVsIGFuZCB0aGVyZSBhcmUgbm8gb3B0aW9ucywgYnV0IHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3B0aW9ucyBjb21lIGluIHNsaWdodGx5IGxhdGVyIG9yIGFzIGEgcmVzdWx0IG9mIHRoZSB2YWx1ZSBjaGFuZ2luZy5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3YXNPcGVuICE9PSB0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLm9wZW5lZC5lbWl0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYW5lbENsb3NpbmdBY3Rpb25zO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIC8vIHdoZW4gdGhlIGZpcnN0IGNsb3NpbmcgZXZlbnQgb2NjdXJzLi4uXG4gICAgICAgICAgICAgICAgdGFrZSgxKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLy8gc2V0IHRoZSB2YWx1ZSwgY2xvc2UgdGhlIHBhbmVsLCBhbmQgY29tcGxldGUuXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4gdGhpcy5zZXRWYWx1ZUFuZENsb3NlKGV2ZW50KSk7XG4gICAgfVxuXG4gICAgLyoqIERlc3Ryb3lzIHRoZSBhdXRvY29tcGxldGUgc3VnZ2VzdGlvbiBwYW5lbC4gKi9cbiAgICBwcml2YXRlIGRlc3Ryb3lQYW5lbCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0VHJpZ2dlclZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdG9EaXNwbGF5ID0gdGhpcy5hdXRvY29tcGxldGUgJiYgdGhpcy5hdXRvY29tcGxldGUuZGlzcGxheVdpdGggP1xuICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUuZGlzcGxheVdpdGgodmFsdWUpIDpcbiAgICAgICAgICAgIHZhbHVlO1xuXG4gICAgICAgIC8vIFNpbXBseSBmYWxsaW5nIGJhY2sgdG8gYW4gZW1wdHkgc3RyaW5nIGlmIHRoZSBkaXNwbGF5IHZhbHVlIGlzIGZhbHN5IGRvZXMgbm90IHdvcmsgcHJvcGVybHkuXG4gICAgICAgIC8vIFRoZSBkaXNwbGF5IHZhbHVlIGNhbiBhbHNvIGJlIHRoZSBudW1iZXIgemVybyBhbmQgc2hvdWxkbid0IGZhbGwgYmFjayB0byBhbiBlbXB0eSBzdHJpbmcuXG4gICAgICAgIGNvbnN0IGlucHV0VmFsdWUgPSB0b0Rpc3BsYXkgIT0gbnVsbCA/IHRvRGlzcGxheSA6ICcnO1xuXG4gICAgICAgIC8vIElmIGl0J3MgdXNlZCB3aXRoaW4gYSBgTWF0Rm9ybUZpZWxkYCwgd2Ugc2hvdWxkIHNldCBpdCB0aHJvdWdoIHRoZSBwcm9wZXJ0eSBzbyBpdCBjYW4gZ29cbiAgICAgICAgLy8gdGhyb3VnaCBjaGFuZ2UgZGV0ZWN0aW9uLlxuICAgICAgICBpZiAodGhpcy5mb3JtRmllbGQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUZpZWxkLmNvbnRyb2wudmFsdWUgPSBpbnB1dFZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSBpbnB1dFZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmV2aW91c1ZhbHVlID0gaW5wdXRWYWx1ZTtcbiAgICB9XG5cbiAgICAvKiogVGhpcyBtZXRob2QgY2xvc2VzIHRoZSBwYW5lbCwgYW5kIGlmIGEgdmFsdWUgaXMgc3BlY2lmaWVkLCBhbHNvIHNldHMgdGhlIGFzc29jaWF0ZWRcbiAgICAgKiBjb250cm9sIHRvIHRoYXQgdmFsdWUuIEl0IHdpbGwgYWxzbyBtYXJrIHRoZSBjb250cm9sIGFzIGRpcnR5IGlmIHRoaXMgaW50ZXJhY3Rpb25cbiAgICAgKiBzdGVtbWVkIGZyb20gdGhlIHVzZXIuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRWYWx1ZUFuZENsb3NlKGV2ZW50OiBNY09wdGlvblNlbGVjdGlvbkNoYW5nZSB8IG51bGwpOiB2b2lkIHtcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnNvdXJjZSkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclByZXZpb3VzU2VsZWN0ZWRPcHRpb24oZXZlbnQuc291cmNlKTtcbiAgICAgICAgICAgIHRoaXMuc2V0VHJpZ2dlclZhbHVlKGV2ZW50LnNvdXJjZS52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKGV2ZW50LnNvdXJjZS52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXG4gICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5lbWl0U2VsZWN0RXZlbnQoZXZlbnQuc291cmNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgIH1cblxuICAgIC8qKiBDbGVhciBhbnkgcHJldmlvdXMgc2VsZWN0ZWQgb3B0aW9uIGFuZCBlbWl0IGEgc2VsZWN0aW9uIGNoYW5nZSBldmVudCBmb3IgdGhpcyBvcHRpb24gKi9cbiAgICBwcml2YXRlIGNsZWFyUHJldmlvdXNTZWxlY3RlZE9wdGlvbihza2lwOiBNY09wdGlvbikge1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvbiAhPT0gc2tpcCAmJiBvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBvcHRpb24uZGVzZWxlY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhdHRhY2hPdmVybGF5KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuYXV0b2NvbXBsZXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRNY0F1dG9jb21wbGV0ZU1pc3NpbmdQYW5lbEVycm9yKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheVJlZjtcblxuICAgICAgICBpZiAoIW92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMucG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMuYXV0b2NvbXBsZXRlLnRlbXBsYXRlLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICAgICAgb3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUodGhpcy5nZXRPdmVybGF5Q29uZmlnKCkpO1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gb3ZlcmxheVJlZjtcblxuICAgICAgICAgICAgLy8gVXNlIHRoZSBga2V5ZG93bkV2ZW50c2AgaW4gb3JkZXIgdG8gdGFrZSBhZHZhbnRhZ2Ugb2ZcbiAgICAgICAgICAgIC8vIHRoZSBvdmVybGF5IGV2ZW50IHRhcmdldGluZyBwcm92aWRlZCBieSB0aGUgQ0RLIG92ZXJsYXkuXG4gICAgICAgICAgICBvdmVybGF5UmVmLmtleWRvd25FdmVudHMoKS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gQ2xvc2Ugd2hlbiBwcmVzc2luZyBFU0NBUEUgb3IgQUxUICsgVVBfQVJST1csIGJhc2VkIG9uIHRoZSBhMTF5IGd1aWRlbGluZXMuXG4gICAgICAgICAgICAgICAgLy8gU2VlOiBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtcHJhY3RpY2VzLTEuMS8jdGV4dGJveC1rZXlib2FyZC1pbnRlcmFjdGlvblxuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBkZXByZWNhdGlvblxuICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBFU0NBUEUgfHwgKGV2ZW50LmtleUNvZGUgPT09IFVQX0FSUk9XICYmIGV2ZW50LmFsdEtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldEFjdGl2ZUl0ZW0oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZUtleUV2ZW50U3RyZWFtLm5leHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMudmlld3BvcnRSdWxlcikge1xuICAgICAgICAgICAgICAgIHRoaXMudmlld3BvcnRTdWJzY3JpcHRpb24gPSB0aGlzLnZpZXdwb3J0UnVsZXIuY2hhbmdlKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGFuZWxPcGVuICYmIG92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXlSZWYudXBkYXRlU2l6ZSh7IHdpZHRoOiB0aGlzLmdldFBhbmVsV2lkdGgoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBvdmVybGF5UmVmLmdldENvbmZpZygpLnBvc2l0aW9uU3RyYXRlZ3kgYXMgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5O1xuXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHRyaWdnZXIsIHBhbmVsIHdpZHRoIGFuZCBkaXJlY3Rpb24sIGluIGNhc2UgYW55dGhpbmcgaGFzIGNoYW5nZWQuXG4gICAgICAgICAgICBwb3NpdGlvbi5zZXRPcmlnaW4odGhpcy5nZXRDb25uZWN0ZWRFbGVtZW50KCkpO1xuICAgICAgICAgICAgb3ZlcmxheVJlZi51cGRhdGVTaXplKHsgd2lkdGg6IHRoaXMuZ2V0UGFuZWxXaWR0aCgpIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG92ZXJsYXlSZWYgJiYgIW92ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgICAgICAgb3ZlcmxheVJlZi5hdHRhY2godGhpcy5wb3J0YWwpO1xuICAgICAgICAgICAgdGhpcy5jbG9zaW5nQWN0aW9uc1N1YnNjcmlwdGlvbiA9IHRoaXMuc3Vic2NyaWJlVG9DbG9zaW5nQWN0aW9ucygpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgd2FzT3BlbiA9IHRoaXMucGFuZWxPcGVuO1xuXG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLnNldFZpc2liaWxpdHkoKTtcbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGUuaXNPcGVuID0gdGhpcy5vdmVybGF5QXR0YWNoZWQgPSB0cnVlO1xuXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gZG8gYW4gZXh0cmEgYHBhbmVsT3BlbmAgY2hlY2sgaW4gaGVyZSwgYmVjYXVzZSB0aGVcbiAgICAgICAgLy8gYXV0b2NvbXBsZXRlIHdvbid0IGJlIHNob3duIGlmIHRoZXJlIGFyZSBubyBvcHRpb25zLlxuICAgICAgICBpZiAodGhpcy5wYW5lbE9wZW4gJiYgd2FzT3BlbiAhPT0gdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLm9wZW5lZC5lbWl0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE92ZXJsYXlDb25maWcoKTogT3ZlcmxheUNvbmZpZyB7XG4gICAgICAgIHJldHVybiBuZXcgT3ZlcmxheUNvbmZpZyh7XG4gICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLmdldE92ZXJsYXlQb3NpdGlvbigpLFxuICAgICAgICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuc2Nyb2xsU3RyYXRlZ3koKSxcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLmdldFBhbmVsV2lkdGgoKSxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogdGhpcy5kaXJcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRPdmVybGF5UG9zaXRpb24oKTogUG9zaXRpb25TdHJhdGVneSB7XG4gICAgICAgIHRoaXMucG9zaXRpb25TdHJhdGVneSA9IHRoaXMub3ZlcmxheS5wb3NpdGlvbigpXG4gICAgICAgICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLmdldENvbm5lY3RlZEVsZW1lbnQoKSlcbiAgICAgICAgICAgIC53aXRoRmxleGlibGVEaW1lbnNpb25zKGZhbHNlKVxuICAgICAgICAgICAgLndpdGhQdXNoKGZhbHNlKVxuICAgICAgICAgICAgLndpdGhQb3NpdGlvbnMoW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WTogJ3RvcCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WTogJ2JvdHRvbScsXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIG92ZXJsYXkgZWRnZSBjb25uZWN0ZWQgdG8gdGhlIHRyaWdnZXIgc2hvdWxkIGhhdmUgc3F1YXJlZCBjb3JuZXJzLCB3aGlsZVxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgb3Bwb3NpdGUgZW5kIGhhcyByb3VuZGVkIGNvcm5lcnMuIFdlIGFwcGx5IGEgQ1NTIGNsYXNzIHRvIHN3YXAgdGhlXG4gICAgICAgICAgICAgICAgICAgIC8vIGJvcmRlci1yYWRpdXMgYmFzZWQgb24gdGhlIG92ZXJsYXkgcG9zaXRpb24uXG4gICAgICAgICAgICAgICAgICAgIHBhbmVsQ2xhc3M6ICdtYy1hdXRvY29tcGxldGUtcGFuZWwtYWJvdmUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSBhcyBDb25uZWN0ZWRQb3NpdGlvbltdKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5wb3NpdGlvblN0cmF0ZWd5O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q29ubmVjdGVkRWxlbWVudCgpOiBFbGVtZW50UmVmIHtcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkVG8pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RlZFRvLmVsZW1lbnRSZWY7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtRmllbGQgPyB0aGlzLmZvcm1GaWVsZC5nZXRDb25uZWN0ZWRPdmVybGF5T3JpZ2luKCkgOiB0aGlzLmVsZW1lbnRSZWY7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRQYW5lbFdpZHRoKCk6IG51bWJlciB8IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmF1dG9jb21wbGV0ZS5wYW5lbFdpZHRoIHx8IHRoaXMuZ2V0SG9zdFdpZHRoKCkgLSBBVVRPQ09NUExFVEVfQk9SREVSX1dJRFRIO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SG9zdFdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbm5lY3RlZEVsZW1lbnQoKS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgYWN0aXZlIGl0ZW0gdG8gLTEgc28gYXJyb3cgZXZlbnRzIHdpbGwgYWN0aXZhdGUgdGhlXG4gICAgICogY29ycmVjdCBvcHRpb25zLCBvciB0byAwIGlmIHRoZSBjb25zdW1lciBvcHRlZCBpbnRvIGl0LlxuICAgICAqL1xuICAgIHByaXZhdGUgcmVzZXRBY3RpdmVJdGVtKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0odGhpcy5hdXRvY29tcGxldGUuYXV0b0FjdGl2ZUZpcnN0T3B0aW9uID8gMCA6IC0xKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbk9wZW4oKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgICByZXR1cm4gIWVsZW1lbnQucmVhZE9ubHkgJiYgIWVsZW1lbnQuZGlzYWJsZWQgJiYgIXRoaXMuX2F1dG9jb21wbGV0ZURpc2FibGVkO1xuICAgIH1cbn1cbiJdfQ==