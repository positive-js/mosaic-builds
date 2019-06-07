/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Inject, InjectionToken, Input, Output, TemplateRef, ViewChild, ViewEncapsulation, Directive, forwardRef, Host, NgZone, Optional, ViewContainerRef, NgModule } from '@angular/core';
import { ActiveDescendantKeyManager } from '@ptsecurity/cdk/a11y';
import { coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { MC_OPTION_PARENT_COMPONENT, McOptgroup, McOption, countGroupLabelsBeforeOption, getOptionScrollPosition, McOptionSelectionChange, McOptionModule, McCommonModule } from '@ptsecurity/mosaic/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Directionality } from '@ptsecurity/cdk/bidi';
import { DOWN_ARROW, ENTER, ESCAPE, TAB, UP_ARROW } from '@ptsecurity/cdk/keycodes';
import { Overlay, OverlayConfig, OverlayModule } from '@ptsecurity/cdk/overlay';
import { TemplatePortal } from '@ptsecurity/cdk/portal';
import { ViewportRuler } from '@ptsecurity/cdk/scrolling';
import { McFormField } from '@ptsecurity/mosaic/form-field';
import { Subscription, defer, fromEvent, merge, of, Subject } from 'rxjs';
import { filter, take, switchMap, delay, tap, map } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Autocomplete IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 * @type {?}
 */
let uniqueAutocompleteIdCounter = 0;
class McAutocompleteSelectedEvent {
    /**
     * @param {?} source
     * @param {?} option
     */
    constructor(source, option) {
        this.source = source;
        this.option = option;
    }
}
/**
 * Injection token to be used to override the default options for `mc-autocomplete`.
 * @type {?}
 */
const MC_AUTOCOMPLETE_DEFAULT_OPTIONS = new InjectionToken('mc-autocomplete-default-options', {
    providedIn: 'root',
    factory: MC_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY
});
// tslint:disable-next-line naming-convention
/**
 * @return {?}
 */
function MC_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY() {
    return { autoActiveFirstOption: true };
}
class McAutocomplete {
    /**
     * @param {?} changeDetectorRef
     * @param {?} elementRef
     * @param {?} defaults
     */
    constructor(changeDetectorRef, elementRef, defaults) {
        this.changeDetectorRef = changeDetectorRef;
        this.elementRef = elementRef;
        /**
         * Unique ID to be used by autocomplete trigger's "aria-owns" property.
         */
        this.id = `mc-autocomplete-${uniqueAutocompleteIdCounter++}`;
        /**
         * Whether the autocomplete panel should be visible, depending on option length.
         */
        this.showPanel = false;
        /**
         * Function that maps an option's control value to its display value in the trigger.
         */
        this.displayWith = null;
        /**
         * Event that is emitted whenever an option from the list is selected.
         */
        this.optionSelected = new EventEmitter();
        /**
         * Event that is emitted when the autocomplete panel is opened.
         */
        this.opened = new EventEmitter();
        /**
         * Event that is emitted when the autocomplete panel is closed.
         */
        this.closed = new EventEmitter();
        this._classList = {};
        this._isOpen = false;
        this._autoActiveFirstOption = !!defaults.autoActiveFirstOption;
    }
    /**
     * Takes classes set on the host mc-autocomplete element and applies them to the panel
     * inside the overlay container to allow for easy styling.
     * @return {?}
     */
    get classList() {
        return this._classList;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set classList(value) {
        if (value && value.length) {
            value.split(' ')
                .forEach((/**
             * @param {?} className
             * @return {?}
             */
            (className) => this._classList[className.trim()] = true));
            this.elementRef.nativeElement.className = '';
        }
    }
    /**
     * Whether the first option should be highlighted when the autocomplete panel is opened.
     * Can be configured globally through the `MC_AUTOCOMPLETE_DEFAULT_OPTIONS` token.
     * @return {?}
     */
    get autoActiveFirstOption() {
        return this._autoActiveFirstOption;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set autoActiveFirstOption(value) {
        this._autoActiveFirstOption = coerceBooleanProperty(value);
    }
    /**
     * @return {?}
     */
    get isOpen() {
        return this._isOpen && this.showPanel;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isOpen(value) {
        this._isOpen = value;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.keyManager = new ActiveDescendantKeyManager(this.options);
        this.setVisibility();
    }
    /**
     * @param {?} scrollTop
     * @return {?}
     */
    setScrollTop(scrollTop) {
        if (this.panel) {
            this.panel.nativeElement.scrollTop = scrollTop;
        }
    }
    /**
     * @return {?}
     */
    getScrollTop() {
        return this.panel ? this.panel.nativeElement.scrollTop : 0;
    }
    /**
     * @return {?}
     */
    setVisibility() {
        this.showPanel = !!this.options.length;
        this._classList['mc-autocomplete_visible'] = this.showPanel;
        this._classList['mc-autocomplete_hidden'] = !this.showPanel;
        this.changeDetectorRef.markForCheck();
    }
    /**
     * @param {?} option
     * @return {?}
     */
    emitSelectEvent(option) {
        /** @type {?} */
        const event = new McAutocompleteSelectedEvent(this, option);
        this.optionSelected.emit(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeydown(event) {
        this.keyManager.onKeydown(event);
    }
}
McAutocomplete.decorators = [
    { type: Component, args: [{
                selector: 'mc-autocomplete',
                exportAs: 'mcAutocomplete',
                template: "<ng-template><div class=\"mc-autocomplete-panel\" role=\"listbox\" [id]=\"id\" [ngClass]=\"classList\" #panel><ng-content></ng-content></div></ng-template>",
                styles: [".mc-autocomplete-trigger{text-overflow:ellipsis}.mc-autocomplete-panel{visibility:hidden;position:relative;overflow:auto;-webkit-overflow-scrolling:touch;margin-top:-1px;min-width:100%;width:100%;max-width:none;max-height:256px;border-width:1px;border-style:solid;border-bottom-left-radius:3px;border-bottom-right-radius:3px;padding:4px 0}.mc-autocomplete-panel.mc-autocomplete_visible{visibility:visible}.mc-autocomplete-panel.mc-autocomplete_hidden{visibility:hidden}.mc-autocomplete-panel-above .mc-autocomplete-panel{border-radius:0;border-top-left-radius:3px;border-top-right-radius:3px}.mc-autocomplete-panel .mc-divider-horizontal{margin-top:-1px}@media screen and (-ms-high-contrast:active){.mc-autocomplete-panel{outline:solid 1px}}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: { class: 'mc-autocomplete' },
                providers: [
                    { provide: MC_OPTION_PARENT_COMPONENT, useExisting: McAutocomplete }
                ]
            },] },
];
/** @nocollapse */
McAutocomplete.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [MC_AUTOCOMPLETE_DEFAULT_OPTIONS,] }] }
];
McAutocomplete.propDecorators = {
    template: [{ type: ViewChild, args: [TemplateRef, { static: true },] }],
    panel: [{ type: ViewChild, args: ['panel', { static: false },] }],
    options: [{ type: ContentChildren, args: [McOption, { descendants: true },] }],
    optionGroups: [{ type: ContentChildren, args: [McOptgroup,] }],
    displayWith: [{ type: Input }],
    panelWidth: [{ type: Input }],
    optionSelected: [{ type: Output }],
    opened: [{ type: Output }],
    closed: [{ type: Output }],
    classList: [{ type: Input, args: ['class',] }],
    autoActiveFirstOption: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Directive applied to an element to make it usable
 * as a connection point for an autocomplete panel.
 */
class McAutocompleteOrigin {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
McAutocompleteOrigin.decorators = [
    { type: Directive, args: [{
                selector: '[mcAutocompleteOrigin]',
                exportAs: 'mcAutocompleteOrigin'
            },] },
];
/** @nocollapse */
McAutocompleteOrigin.ctorParameters = () => [
    { type: ElementRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The height of each autocomplete option.
 * @type {?}
 */
const AUTOCOMPLETE_OPTION_HEIGHT = 32;
/**
 * The total height of the autocomplete panel.
 * @type {?}
 */
const AUTOCOMPLETE_PANEL_HEIGHT = 256;
/** @type {?} */
const AUTOCOMPLETE_BORDER_WIDTH = 2;
/**
 * Injection token that determines the scroll handling while the autocomplete panel is open.
 * @type {?}
 */
const MC_AUTOCOMPLETE_SCROLL_STRATEGY = new InjectionToken('mc-autocomplete-scroll-strategy');
// tslint:disable-next-line naming-convention
/**
 * @param {?} overlay
 * @return {?}
 */
function MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY(overlay) {
    return (/**
     * @return {?}
     */
    () => overlay.scrollStrategies.reposition());
}
/** @type {?} */
const MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_AUTOCOMPLETE_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY
};
/**
 * Provider that allows the autocomplete to register as a ControlValueAccessor.
 * \@docs-private
 * @type {?}
 */
const MAT_AUTOCOMPLETE_VALUE_ACCESSOR = {
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
function getMcAutocompleteMissingPanelError() {
    return Error('Attempting to open an undefined instance of `mc-autocomplete`. ' +
        'Make sure that the id passed to the `mcAutocomplete` is correct and that ' +
        'you\'re attempting to open it after the ngAfterContentInit hook.');
}
class McAutocompleteTrigger {
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
            of()).pipe(
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
        if (!this.document) {
            return of(null);
        }
        return fromEvent(this.document, 'click')
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
            this.resetActiveItem();
            this.autocomplete.setVisibility();
            if (this.panelOpen) {
                (/** @type {?} */ (this.overlayRef)).updatePosition();
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
            this.formField._control.value = inputValue;
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
            },] },
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McAutocompleteModule {
}
McAutocompleteModule.decorators = [
    { type: NgModule, args: [{
                imports: [McOptionModule, OverlayModule, McCommonModule, CommonModule],
                exports: [
                    McAutocomplete,
                    McOptionModule,
                    McAutocompleteTrigger,
                    McAutocompleteOrigin,
                    McCommonModule
                ],
                declarations: [McAutocomplete, McAutocompleteTrigger, McAutocompleteOrigin],
                providers: [MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { MC_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY, McAutocompleteSelectedEvent, MC_AUTOCOMPLETE_DEFAULT_OPTIONS, McAutocomplete, McAutocompleteModule, MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY, getMcAutocompleteMissingPanelError, AUTOCOMPLETE_OPTION_HEIGHT, AUTOCOMPLETE_PANEL_HEIGHT, AUTOCOMPLETE_BORDER_WIDTH, MC_AUTOCOMPLETE_SCROLL_STRATEGY, MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER, MAT_AUTOCOMPLETE_VALUE_ACCESSOR, McAutocompleteTrigger, McAutocompleteOrigin };
//# sourceMappingURL=autocomplete.js.map
