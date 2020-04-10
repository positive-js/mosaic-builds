/**
 * @fileoverview added by tsickle
 * Generated from: autocomplete-trigger.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __spread } from "tslib";
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
export var AUTOCOMPLETE_OPTION_HEIGHT = 32;
/**
 * The total height of the autocomplete panel.
 * @type {?}
 */
export var AUTOCOMPLETE_PANEL_HEIGHT = 256;
/** @type {?} */
export var AUTOCOMPLETE_BORDER_WIDTH = 2;
/**
 * Injection token that determines the scroll handling while the autocomplete panel is open.
 * @type {?}
 */
export var MC_AUTOCOMPLETE_SCROLL_STRATEGY = new InjectionToken('mc-autocomplete-scroll-strategy');
// tslint:disable-next-line naming-convention
/**
 * @param {?} overlay
 * @return {?}
 */
export function MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY(overlay) {
    return (/**
     * @return {?}
     */
    function () { return overlay.scrollStrategies.reposition(); });
}
/** @type {?} */
export var MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_AUTOCOMPLETE_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY
};
/**
 * Provider that allows the autocomplete to register as a ControlValueAccessor.
 * \@docs-private
 * @type {?}
 */
export var MAT_AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return McAutocompleteTrigger; })),
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
var McAutocompleteTrigger = /** @class */ (function () {
    function McAutocompleteTrigger(elementRef, viewContainerRef, changeDetectorRef, overlay, zone, scrollStrategy, dir, formField, document, viewportRuler) {
        var _this = this;
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
        function () {
            if (_this.autocomplete && _this.autocomplete.options) {
                return merge.apply(void 0, __spread(_this.autocomplete.options.map((/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) { return option.onSelectionChange; }))));
            }
            // If there are any subscribers before `ngAfterViewInit`, the `autocomplete` will be undefined.
            // Return a stream that we'll replace with the real one once everything is in place.
            return _this.zone.onStable
                .asObservable()
                .pipe(take(1), switchMap((/**
             * @return {?}
             */
            function () { return _this.optionSelections; })));
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
        function () { });
        /**
         * `View -> model callback called when autocomplete has been touched`
         */
        // tslint:disable-next-line no-empty
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
        /**
         * Event handler for when the window is blurred. Needs to be an
         * arrow function in order to preserve the context.
         */
        this.windowBlurHandler = (/**
         * @return {?}
         */
        function () {
            // If the user blurred the window while the autocomplete is focused, it means that it'll be
            // refocused when they come back. In this case we want to skip the first focus event, if the
            // pane was closed, in order to avoid reopening it unintentionally.
            _this.canOpenOnNextFocus = _this.document.activeElement !== _this.elementRef.nativeElement || _this.panelOpen;
        });
        // tslint:disable-next-line no-typeof-undefined
        if (typeof window !== 'undefined') {
            zone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                window.addEventListener('blur', _this.windowBlurHandler);
            }));
        }
        this.scrollStrategy = scrollStrategy;
    }
    Object.defineProperty(McAutocompleteTrigger.prototype, "activeOption", {
        /** The currently active option, coerced to MatOption type. */
        get: /**
         * The currently active option, coerced to MatOption type.
         * @return {?}
         */
        function () {
            if (this.autocomplete && this.autocomplete.keyManager) {
                return this.autocomplete.keyManager.activeItem;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McAutocompleteTrigger.prototype, "panelOpen", {
        get: /**
         * @return {?}
         */
        function () {
            return this.overlayAttached && this.autocomplete.showPanel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McAutocompleteTrigger.prototype, "autocompleteDisabled", {
        /**
         * Whether the autocomplete is disabled. When disabled, the element will
         * act as a regular input and the user won't be able to open the panel.
         */
        get: /**
         * Whether the autocomplete is disabled. When disabled, the element will
         * act as a regular input and the user won't be able to open the panel.
         * @return {?}
         */
        function () {
            return this._autocompleteDisabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._autocompleteDisabled = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McAutocompleteTrigger.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        // tslint:disable-next-line no-typeof-undefined
        if (typeof window !== 'undefined') {
            window.removeEventListener('blur', this.windowBlurHandler);
        }
        this.viewportSubscription.unsubscribe();
        this.componentDestroyed = true;
        this.destroyPanel();
        this.closeKeyEventStream.complete();
    };
    /** Opens the autocomplete suggestion panel. */
    /**
     * Opens the autocomplete suggestion panel.
     * @return {?}
     */
    McAutocompleteTrigger.prototype.openPanel = /**
     * Opens the autocomplete suggestion panel.
     * @return {?}
     */
    function () {
        this.attachOverlay();
    };
    /**
     * @return {?}
     */
    McAutocompleteTrigger.prototype.closePanel = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * Updates the position of the autocomplete suggestion panel to ensure that it fits all options
     * within the viewport.
     */
    /**
     * Updates the position of the autocomplete suggestion panel to ensure that it fits all options
     * within the viewport.
     * @return {?}
     */
    McAutocompleteTrigger.prototype.updatePosition = /**
     * Updates the position of the autocomplete suggestion panel to ensure that it fits all options
     * within the viewport.
     * @return {?}
     */
    function () {
        if (this.overlayAttached) {
            (/** @type {?} */ (this.overlayRef)).updatePosition();
        }
    };
    Object.defineProperty(McAutocompleteTrigger.prototype, "panelClosingActions", {
        /**
         * A stream of actions that should close the autocomplete panel, including
         * when an option is selected, on blur, and when TAB is pressed.
         */
        get: /**
         * A stream of actions that should close the autocomplete panel, including
         * when an option is selected, on blur, and when TAB is pressed.
         * @return {?}
         */
        function () {
            var _this = this;
            return merge(this.optionSelections, this.autocomplete.keyManager.tabOut.pipe(filter((/**
             * @return {?}
             */
            function () { return _this.overlayAttached; }))), this.closeKeyEventStream, this.getOutsideClickStream(), this.overlayRef ?
                this.overlayRef.detachments().pipe(filter((/**
                 * @return {?}
                 */
                function () { return _this.overlayAttached; }))) :
                observableOf()).pipe(
            // Normalize the output so we return a consistent type.
            map((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event instanceof McOptionSelectionChange ? event : null; })));
        },
        enumerable: true,
        configurable: true
    });
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} value
     * @return {?}
     */
    McAutocompleteTrigger.prototype.writeValue = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        Promise.resolve(null).then((/**
         * @return {?}
         */
        function () { return _this.setTriggerValue(value); }));
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    McAutocompleteTrigger.prototype.registerOnChange = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    McAutocompleteTrigger.prototype.registerOnTouched = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    McAutocompleteTrigger.prototype.setDisabledState = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.elementRef.nativeElement.disabled = isDisabled;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McAutocompleteTrigger.prototype.handleKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // tslint:disable-next-line deprecation
        /** @type {?} */
        var keyCode = event.keyCode;
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
            var prevActiveItem = this.autocomplete.keyManager.activeItem;
            if (this.panelOpen || keyCode === TAB) {
                this.autocomplete.onKeydown(event);
            }
            else if (keyCode === DOWN_ARROW && this.canOpen()) {
                this.openPanel();
            }
            /** @type {?} */
            var isArrowKey = keyCode === UP_ARROW || keyCode === DOWN_ARROW;
            if (isArrowKey || this.autocomplete.keyManager.activeItem !== prevActiveItem) {
                this.scrollToOption();
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McAutocompleteTrigger.prototype.handleInput = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var target = (/** @type {?} */ (event.target));
        /** @type {?} */
        var value = target.value;
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
    };
    /**
     * @return {?}
     */
    McAutocompleteTrigger.prototype.handleFocus = /**
     * @return {?}
     */
    function () {
        if (!this.canOpenOnNextFocus) {
            this.canOpenOnNextFocus = true;
        }
        else if (this.canOpen()) {
            this.previousValue = this.elementRef.nativeElement.value;
            this.attachOverlay();
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    McAutocompleteTrigger.prototype.handleClick = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (this.canOpen() && this.document.activeElement === $event.target) {
            this.openPanel();
        }
    };
    /** Stream of clicks outside of the autocomplete panel. */
    /**
     * Stream of clicks outside of the autocomplete panel.
     * @private
     * @return {?}
     */
    McAutocompleteTrigger.prototype.getOutsideClickStream = /**
     * Stream of clicks outside of the autocomplete panel.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return merge((/** @type {?} */ (
        // tslint:disable-next-line: no-unnecessary-type-assertion
        fromEvent(this.document, 'click'))), (/** @type {?} */ (
        // tslint:disable-next-line: no-unnecessary-type-assertion
        fromEvent(this.document, 'touchend'))))
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var clickTarget = (/** @type {?} */ (event.target));
            /** @type {?} */
            var formField = _this.formField ?
                _this.formField._elementRef.nativeElement : null;
            return _this.overlayAttached &&
                clickTarget !== _this.elementRef.nativeElement &&
                (!formField || !formField.contains(clickTarget)) &&
                (!!_this.overlayRef && !_this.overlayRef.overlayElement.contains(clickTarget));
        })));
    };
    /**
     * Given that we are not actually focusing active options, we must manually adjust scroll
     * to reveal options below the fold. First, we find the offset of the option from the top
     * of the panel. If that offset is below the fold, the new scrollTop will be the offset -
     * the panel height + the option height, so the active option will be just visible at the
     * bottom of the panel. If that offset is above the top of the visible panel, the new scrollTop
     * will become the offset. If that offset is visible within the panel already, the scrollTop is
     * not adjusted.
     */
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
    McAutocompleteTrigger.prototype.scrollToOption = /**
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
    function () {
        /** @type {?} */
        var index = this.autocomplete.keyManager.activeItemIndex || 0;
        /** @type {?} */
        var labelCount = countGroupLabelsBeforeOption(index, this.autocomplete.options, this.autocomplete.optionGroups);
        /** @type {?} */
        var newScrollPosition = getOptionScrollPosition(index + labelCount, AUTOCOMPLETE_OPTION_HEIGHT, this.autocomplete.getScrollTop(), AUTOCOMPLETE_PANEL_HEIGHT);
        this.autocomplete.setScrollTop(newScrollPosition);
    };
    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     */
    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     * @private
     * @return {?}
     */
    McAutocompleteTrigger.prototype.subscribeToClosingActions = /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var firstStable = this.zone.onStable.asObservable()
            .pipe(take(1));
        /** @type {?} */
        var optionChanges = this.autocomplete.options.changes
            .pipe(tap((/**
         * @return {?}
         */
        function () { return _this.positionStrategy.reapplyLastPosition(); })), 
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
        function () {
            /** @type {?} */
            var wasOpen = _this.panelOpen;
            _this.resetActiveItem();
            _this.autocomplete.setVisibility();
            if (_this.panelOpen) {
                (/** @type {?} */ (_this.overlayRef)).updatePosition();
                // If the `panelOpen` state changed, we need to make sure to emit the `opened`
                // event, because we may not have emitted it when the panel was attached. This
                // can happen if the users opens the panel and there are no options, but the
                // options come in slightly later or as a result of the value changing.
                if (wasOpen !== _this.panelOpen) {
                    _this.autocomplete.opened.emit();
                }
            }
            return _this.panelClosingActions;
        })), 
        // when the first closing event occurs...
        take(1))
            // set the value, close the panel, and complete.
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.setValueAndClose(event); }));
    };
    /** Destroys the autocomplete suggestion panel. */
    /**
     * Destroys the autocomplete suggestion panel.
     * @private
     * @return {?}
     */
    McAutocompleteTrigger.prototype.destroyPanel = /**
     * Destroys the autocomplete suggestion panel.
     * @private
     * @return {?}
     */
    function () {
        if (this.overlayRef) {
            this.closePanel();
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    McAutocompleteTrigger.prototype.setTriggerValue = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var toDisplay = this.autocomplete && this.autocomplete.displayWith ?
            this.autocomplete.displayWith(value) :
            value;
        // Simply falling back to an empty string if the display value is falsy does not work properly.
        // The display value can also be the number zero and shouldn't fall back to an empty string.
        /** @type {?} */
        var inputValue = toDisplay != null ? toDisplay : '';
        // If it's used within a `MatFormField`, we should set it through the property so it can go
        // through change detection.
        if (this.formField) {
            this.formField.control.value = inputValue;
        }
        else {
            this.elementRef.nativeElement.value = inputValue;
        }
        this.previousValue = inputValue;
    };
    /** This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     * @private
     * @param {?} event
     * @return {?}
     */
    McAutocompleteTrigger.prototype.setValueAndClose = /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event && event.source) {
            this.clearPreviousSelectedOption(event.source);
            this.setTriggerValue(event.source.value);
            this.onChange(event.source.value);
            this.elementRef.nativeElement.focus();
            this.autocomplete.emitSelectEvent(event.source);
        }
        this.closePanel();
    };
    /** Clear any previous selected option and emit a selection change event for this option */
    /**
     * Clear any previous selected option and emit a selection change event for this option
     * @private
     * @param {?} skip
     * @return {?}
     */
    McAutocompleteTrigger.prototype.clearPreviousSelectedOption = /**
     * Clear any previous selected option and emit a selection change event for this option
     * @private
     * @param {?} skip
     * @return {?}
     */
    function (skip) {
        this.autocomplete.options.forEach((/**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            if (option !== skip && option.selected) {
                option.deselect();
            }
        }));
    };
    /**
     * @private
     * @return {?}
     */
    McAutocompleteTrigger.prototype.attachOverlay = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.autocomplete) {
            throw getMcAutocompleteMissingPanelError();
        }
        /** @type {?} */
        var overlayRef = this.overlayRef;
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
            function (event) {
                // Close when pressing ESCAPE or ALT + UP_ARROW, based on the a11y guidelines.
                // See: https://www.w3.org/TR/wai-aria-practices-1.1/#textbox-keyboard-interaction
                // tslint:disable-next-line deprecation
                if (event.keyCode === ESCAPE || (event.keyCode === UP_ARROW && event.altKey)) {
                    _this.resetActiveItem();
                    _this.closeKeyEventStream.next();
                }
            }));
            if (this.viewportRuler) {
                this.viewportSubscription = this.viewportRuler.change().subscribe((/**
                 * @return {?}
                 */
                function () {
                    if (_this.panelOpen && overlayRef) {
                        overlayRef.updateSize({ width: _this.getPanelWidth() });
                    }
                }));
            }
        }
        else {
            /** @type {?} */
            var position = (/** @type {?} */ (overlayRef.getConfig().positionStrategy));
            // Update the trigger, panel width and direction, in case anything has changed.
            position.setOrigin(this.getConnectedElement());
            overlayRef.updateSize({ width: this.getPanelWidth() });
        }
        if (overlayRef && !overlayRef.hasAttached()) {
            overlayRef.attach(this.portal);
            this.closingActionsSubscription = this.subscribeToClosingActions();
        }
        /** @type {?} */
        var wasOpen = this.panelOpen;
        this.autocomplete.setVisibility();
        this.autocomplete.isOpen = this.overlayAttached = true;
        // We need to do an extra `panelOpen` check in here, because the
        // autocomplete won't be shown if there are no options.
        if (this.panelOpen && wasOpen !== this.panelOpen) {
            this.autocomplete.opened.emit();
        }
    };
    /**
     * @private
     * @return {?}
     */
    McAutocompleteTrigger.prototype.getOverlayConfig = /**
     * @private
     * @return {?}
     */
    function () {
        return new OverlayConfig({
            positionStrategy: this.getOverlayPosition(),
            scrollStrategy: this.scrollStrategy(),
            width: this.getPanelWidth(),
            direction: this.dir
        });
    };
    /**
     * @private
     * @return {?}
     */
    McAutocompleteTrigger.prototype.getOverlayPosition = /**
     * @private
     * @return {?}
     */
    function () {
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
    };
    /**
     * @private
     * @return {?}
     */
    McAutocompleteTrigger.prototype.getConnectedElement = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.connectedTo) {
            return this.connectedTo.elementRef;
        }
        return this.formField ? this.formField.getConnectedOverlayOrigin() : this.elementRef;
    };
    /**
     * @private
     * @return {?}
     */
    McAutocompleteTrigger.prototype.getPanelWidth = /**
     * @private
     * @return {?}
     */
    function () {
        return this.autocomplete.panelWidth || this.getHostWidth() - AUTOCOMPLETE_BORDER_WIDTH;
    };
    /**
     * @private
     * @return {?}
     */
    McAutocompleteTrigger.prototype.getHostWidth = /**
     * @private
     * @return {?}
     */
    function () {
        return this.getConnectedElement().nativeElement.getBoundingClientRect().width;
    };
    /**
     * Resets the active item to -1 so arrow events will activate the
     * correct options, or to 0 if the consumer opted into it.
     */
    /**
     * Resets the active item to -1 so arrow events will activate the
     * correct options, or to 0 if the consumer opted into it.
     * @private
     * @return {?}
     */
    McAutocompleteTrigger.prototype.resetActiveItem = /**
     * Resets the active item to -1 so arrow events will activate the
     * correct options, or to 0 if the consumer opted into it.
     * @private
     * @return {?}
     */
    function () {
        this.autocomplete.keyManager.setActiveItem(this.autocomplete.autoActiveFirstOption ? 0 : -1);
    };
    /**
     * @private
     * @return {?}
     */
    McAutocompleteTrigger.prototype.canOpen = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = this.elementRef.nativeElement;
        return !element.readOnly && !element.disabled && !this._autocompleteDisabled;
    };
    McAutocompleteTrigger.decorators = [
        { type: Directive, args: [{
                    selector: "input[mcAutocomplete], textarea[mcAutocomplete]",
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
    McAutocompleteTrigger.ctorParameters = function () { return [
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
    ]; };
    McAutocompleteTrigger.propDecorators = {
        autocomplete: [{ type: Input, args: ['mcAutocomplete',] }],
        connectedTo: [{ type: Input, args: ['mcAutocompleteConnectedTo',] }],
        autocompleteAttribute: [{ type: Input, args: ['autocomplete',] }],
        autocompleteDisabled: [{ type: Input, args: ['mcAutocompleteDisabled',] }]
    };
    return McAutocompleteTrigger;
}());
export { McAutocompleteTrigger };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLXRyaWdnZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL2F1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbImF1dG9jb21wbGV0ZS10cmlnZ2VyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUdILE9BQU8sRUFDUCxhQUFhLEVBSWhCLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUNILGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFVBQVUsRUFDVixJQUFJLEVBQ0osTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBQ0wsTUFBTSxFQUVOLFFBQVEsRUFDUixnQkFBZ0IsRUFDbkIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEYsT0FBTyxFQUNILDRCQUE0QixFQUM1Qix1QkFBdUIsRUFFdkIsdUJBQXVCLEVBQzFCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVB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Qzs7Ozs7SUE5TkcsMkNBQWdEOzs7OztJQUNoRCxpREFBMEM7Ozs7O0lBQzFDLGtEQUE0Qzs7Ozs7SUFDNUMsd0NBQXdCOzs7OztJQUN4QixxQ0FBb0I7Ozs7O0lBRXBCLG9DQUF1Qzs7Ozs7SUFDdkMsMENBQWtEOzs7OztJQUNsRCx5Q0FBbUQ7Ozs7O0lBRW5ELDhDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQ29ubmVjdGVkUG9zaXRpb24sXG4gICAgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5LFxuICAgIE92ZXJsYXksXG4gICAgT3ZlcmxheUNvbmZpZyxcbiAgICBPdmVybGF5UmVmLFxuICAgIFBvc2l0aW9uU3RyYXRlZ3ksXG4gICAgU2Nyb2xsU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgVGVtcGxhdGVQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IFZpZXdwb3J0UnVsZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgZm9yd2FyZFJlZixcbiAgICBIb3N0LFxuICAgIEluamVjdCxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxuICAgIE9wdGlvbmFsLFxuICAgIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBET1dOX0FSUk9XLCBFTlRFUiwgRVNDQVBFLCBUQUIsIFVQX0FSUk9XIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gICAgY291bnRHcm91cExhYmVsc0JlZm9yZU9wdGlvbixcbiAgICBnZXRPcHRpb25TY3JvbGxQb3NpdGlvbixcbiAgICBNY09wdGlvbixcbiAgICBNY09wdGlvblNlbGVjdGlvbkNoYW5nZVxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0Zvcm1GaWVsZCB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9mb3JtLWZpZWxkJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgZGVmZXIsIGZyb21FdmVudCwgbWVyZ2UsIG9mIGFzIG9ic2VydmFibGVPZiwgU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlLCBzd2l0Y2hNYXAsIGRlbGF5LCB0YXAsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWNBdXRvY29tcGxldGVPcmlnaW4gfSBmcm9tICcuL2F1dG9jb21wbGV0ZS1vcmlnaW4uZGlyZWN0aXZlJztcbmltcG9ydCB7IE1jQXV0b2NvbXBsZXRlIH0gZnJvbSAnLi9hdXRvY29tcGxldGUuY29tcG9uZW50JztcblxuXG4vKipcbiAqIFRoZSBmb2xsb3dpbmcgc3R5bGUgY29uc3RhbnRzIGFyZSBuZWNlc3NhcnkgdG8gc2F2ZSBoZXJlIGluIG9yZGVyXG4gKiB0byBwcm9wZXJseSBjYWxjdWxhdGUgdGhlIHNjcm9sbFRvcCBvZiB0aGUgcGFuZWwuIEJlY2F1c2Ugd2UgYXJlIG5vdFxuICogYWN0dWFsbHkgZm9jdXNpbmcgdGhlIGFjdGl2ZSBpdGVtLCBzY3JvbGwgbXVzdCBiZSBoYW5kbGVkIG1hbnVhbGx5LlxuICovXG5cbi8qKiBUaGUgaGVpZ2h0IG9mIGVhY2ggYXV0b2NvbXBsZXRlIG9wdGlvbi4gKi9cbmV4cG9ydCBjb25zdCBBVVRPQ09NUExFVEVfT1BUSU9OX0hFSUdIVCA9IDMyO1xuXG4vKiogVGhlIHRvdGFsIGhlaWdodCBvZiB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsLiAqL1xuZXhwb3J0IGNvbnN0IEFVVE9DT01QTEVURV9QQU5FTF9IRUlHSFQgPSAyNTY7XG5cbmV4cG9ydCBjb25zdCBBVVRPQ09NUExFVEVfQk9SREVSX1dJRFRIOiBudW1iZXIgPSAyO1xuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgZGV0ZXJtaW5lcyB0aGUgc2Nyb2xsIGhhbmRsaW5nIHdoaWxlIHRoZSBhdXRvY29tcGxldGUgcGFuZWwgaXMgb3Blbi4gKi9cbmV4cG9ydCBjb25zdCBNQ19BVVRPQ09NUExFVEVfU0NST0xMX1NUUkFURUdZID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+KCdtYy1hdXRvY29tcGxldGUtc2Nyb2xsLXN0cmF0ZWd5Jyk7XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGZ1bmN0aW9uIE1DX0FVVE9DT01QTEVURV9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWShvdmVybGF5OiBPdmVybGF5KTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3kge1xuICAgIHJldHVybiAoKSA9PiBvdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbigpO1xufVxuXG5leHBvcnQgY29uc3QgTUNfQVVUT0NPTVBMRVRFX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSID0ge1xuICAgIHByb3ZpZGU6IE1DX0FVVE9DT01QTEVURV9TQ1JPTExfU1RSQVRFR1ksXG4gICAgZGVwczogW092ZXJsYXldLFxuICAgIHVzZUZhY3Rvcnk6IE1DX0FVVE9DT01QTEVURV9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWVxufTtcblxuLyoqXG4gKiBQcm92aWRlciB0aGF0IGFsbG93cyB0aGUgYXV0b2NvbXBsZXRlIHRvIHJlZ2lzdGVyIGFzIGEgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBNQVRfQVVUT0NPTVBMRVRFX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWNBdXRvY29tcGxldGVUcmlnZ2VyKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGVycm9yIHRvIGJlIHRocm93biB3aGVuIGF0dGVtcHRpbmcgdG8gdXNlIGFuIGF1dG9jb21wbGV0ZSB0cmlnZ2VyIHdpdGhvdXQgYSBwYW5lbC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1jQXV0b2NvbXBsZXRlTWlzc2luZ1BhbmVsRXJyb3IoKTogRXJyb3Ige1xuICAgIHJldHVybiBFcnJvcignQXR0ZW1wdGluZyB0byBvcGVuIGFuIHVuZGVmaW5lZCBpbnN0YW5jZSBvZiBgbWMtYXV0b2NvbXBsZXRlYC4gJyArXG4gICAgICAgICdNYWtlIHN1cmUgdGhhdCB0aGUgaWQgcGFzc2VkIHRvIHRoZSBgbWNBdXRvY29tcGxldGVgIGlzIGNvcnJlY3QgYW5kIHRoYXQgJyArXG4gICAgICAgICd5b3VcXCdyZSBhdHRlbXB0aW5nIHRvIG9wZW4gaXQgYWZ0ZXIgdGhlIG5nQWZ0ZXJDb250ZW50SW5pdCBob29rLicpO1xufVxuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBgaW5wdXRbbWNBdXRvY29tcGxldGVdLCB0ZXh0YXJlYVttY0F1dG9jb21wbGV0ZV1gLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1hdXRvY29tcGxldGUtdHJpZ2dlcicsXG4gICAgICAgICdbYXR0ci5hdXRvY29tcGxldGVdJzogJ2F1dG9jb21wbGV0ZUF0dHJpYnV0ZScsXG4gICAgICAgIC8vIE5vdGU6IHdlIHVzZSBgZm9jdXNpbmAsIGFzIG9wcG9zZWQgdG8gYGZvY3VzYCwgaW4gb3JkZXIgdG8gb3BlbiB0aGUgcGFuZWxcbiAgICAgICAgLy8gYSBsaXR0bGUgZWFybGllci4gVGhpcyBhdm9pZHMgaXNzdWVzIHdoZXJlIElFIGRlbGF5cyB0aGUgZm9jdXNpbmcgb2YgdGhlIGlucHV0LlxuICAgICAgICAnKGZvY3VzaW4pJzogJ2hhbmRsZUZvY3VzKCknLFxuICAgICAgICAnKGJsdXIpJzogJ29uVG91Y2hlZCgpJyxcbiAgICAgICAgJyhpbnB1dCknOiAnaGFuZGxlSW5wdXQoJGV2ZW50KScsXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyhjbGljayknOiAnaGFuZGxlQ2xpY2soJGV2ZW50KSdcbiAgICB9LFxuICAgIGV4cG9ydEFzOiAnbWNBdXRvY29tcGxldGVUcmlnZ2VyJyxcbiAgICBwcm92aWRlcnM6IFtNQVRfQVVUT0NPTVBMRVRFX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBNY0F1dG9jb21wbGV0ZVRyaWdnZXIgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95IHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcmVhZG9ubHkgb3B0aW9uU2VsZWN0aW9uczogT2JzZXJ2YWJsZTxNY09wdGlvblNlbGVjdGlvbkNoYW5nZT4gPSBkZWZlcigoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9jb21wbGV0ZSAmJiB0aGlzLmF1dG9jb21wbGV0ZS5vcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gbWVyZ2UoLi4udGhpcy5hdXRvY29tcGxldGUub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gb3B0aW9uLm9uU2VsZWN0aW9uQ2hhbmdlKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgYW55IHN1YnNjcmliZXJzIGJlZm9yZSBgbmdBZnRlclZpZXdJbml0YCwgdGhlIGBhdXRvY29tcGxldGVgIHdpbGwgYmUgdW5kZWZpbmVkLlxuICAgICAgICAvLyBSZXR1cm4gYSBzdHJlYW0gdGhhdCB3ZSdsbCByZXBsYWNlIHdpdGggdGhlIHJlYWwgb25lIG9uY2UgZXZlcnl0aGluZyBpcyBpbiBwbGFjZS5cbiAgICAgICAgcmV0dXJuIHRoaXMuem9uZS5vblN0YWJsZVxuICAgICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpLCBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5vcHRpb25TZWxlY3Rpb25zKSk7XG4gICAgfSk7XG5cbiAgICAvKiogVGhlIGN1cnJlbnRseSBhY3RpdmUgb3B0aW9uLCBjb2VyY2VkIHRvIE1hdE9wdGlvbiB0eXBlLiAqL1xuICAgIGdldCBhY3RpdmVPcHRpb24oKTogTWNPcHRpb24gfCBudWxsIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b2NvbXBsZXRlICYmIHRoaXMuYXV0b2NvbXBsZXRlLmtleU1hbmFnZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmF1dG9jb21wbGV0ZS5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgcGFuZWxPcGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5QXR0YWNoZWQgJiYgdGhpcy5hdXRvY29tcGxldGUuc2hvd1BhbmVsO1xuICAgIH1cblxuICAgIC8qKiBUaGUgYXV0b2NvbXBsZXRlIHBhbmVsIHRvIGJlIGF0dGFjaGVkIHRvIHRoaXMgdHJpZ2dlci4gKi9cbiAgICBASW5wdXQoJ21jQXV0b2NvbXBsZXRlJykgYXV0b2NvbXBsZXRlOiBNY0F1dG9jb21wbGV0ZTtcblxuICAgIC8qKlxuICAgICAqIFJlZmVyZW5jZSByZWxhdGl2ZSB0byB3aGljaCB0byBwb3NpdGlvbiB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsLlxuICAgICAqIERlZmF1bHRzIHRvIHRoZSBhdXRvY29tcGxldGUgdHJpZ2dlciBlbGVtZW50LlxuICAgICAqL1xuICAgIEBJbnB1dCgnbWNBdXRvY29tcGxldGVDb25uZWN0ZWRUbycpIGNvbm5lY3RlZFRvOiBNY0F1dG9jb21wbGV0ZU9yaWdpbjtcblxuICAgIC8qKlxuICAgICAqIGBhdXRvY29tcGxldGVgIGF0dHJpYnV0ZSB0byBiZSBzZXQgb24gdGhlIGlucHV0IGVsZW1lbnQuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgnYXV0b2NvbXBsZXRlJykgYXV0b2NvbXBsZXRlQXR0cmlidXRlOiBzdHJpbmcgPSAnb2ZmJztcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGF1dG9jb21wbGV0ZSBpcyBkaXNhYmxlZC4gV2hlbiBkaXNhYmxlZCwgdGhlIGVsZW1lbnQgd2lsbFxuICAgICAqIGFjdCBhcyBhIHJlZ3VsYXIgaW5wdXQgYW5kIHRoZSB1c2VyIHdvbid0IGJlIGFibGUgdG8gb3BlbiB0aGUgcGFuZWwuXG4gICAgICovXG4gICAgQElucHV0KCdtY0F1dG9jb21wbGV0ZURpc2FibGVkJylcbiAgICBnZXQgYXV0b2NvbXBsZXRlRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRvY29tcGxldGVEaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgYXV0b2NvbXBsZXRlRGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fYXV0b2NvbXBsZXRlRGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2F1dG9jb21wbGV0ZURpc2FibGVkID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIG92ZXJsYXlBdHRhY2hlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBvdmVybGF5UmVmOiBPdmVybGF5UmVmIHwgbnVsbDtcblxuICAgIHByaXZhdGUgcG9ydGFsOiBUZW1wbGF0ZVBvcnRhbDtcblxuICAgIHByaXZhdGUgY29tcG9uZW50RGVzdHJveWVkID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIHNjcm9sbFN0cmF0ZWd5OiAoKSA9PiBTY3JvbGxTdHJhdGVneTtcblxuICAgIC8qKiBPbGQgdmFsdWUgb2YgdGhlIG5hdGl2ZSBpbnB1dC4gVXNlZCB0byB3b3JrIGFyb3VuZCBpc3N1ZXMgd2l0aCB0aGUgYGlucHV0YCBldmVudCBvbiBJRS4gKi9cbiAgICBwcml2YXRlIHByZXZpb3VzVmFsdWU6IHN0cmluZyB8IG51bWJlciB8IG51bGw7XG5cbiAgICAvKiogU3RyYXRlZ3kgdGhhdCBpcyB1c2VkIHRvIHBvc2l0aW9uIHRoZSBwYW5lbC4gKi9cbiAgICBwcml2YXRlIHBvc2l0aW9uU3RyYXRlZ3k6IEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneTtcblxuICAgIC8qKiBUaGUgc3Vic2NyaXB0aW9uIGZvciBjbG9zaW5nIGFjdGlvbnMgKHNvbWUgYXJlIGJvdW5kIHRvIGRvY3VtZW50KS4gKi9cbiAgICBwcml2YXRlIGNsb3NpbmdBY3Rpb25zU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICAvKiogU3Vic2NyaXB0aW9uIHRvIHZpZXdwb3J0IHNpemUgY2hhbmdlcy4gKi9cbiAgICBwcml2YXRlIHZpZXdwb3J0U3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgYXV0b2NvbXBsZXRlIGNhbiBvcGVuIHRoZSBuZXh0IHRpbWUgaXQgaXMgZm9jdXNlZC4gVXNlZCB0byBwcmV2ZW50IGEgZm9jdXNlZCxcbiAgICAgKiBjbG9zZWQgYXV0b2NvbXBsZXRlIGZyb20gYmVpbmcgcmVvcGVuZWQgaWYgdGhlIHVzZXIgc3dpdGNoZXMgdG8gYW5vdGhlciBicm93c2VyIHRhYiBhbmQgdGhlblxuICAgICAqIGNvbWVzIGJhY2suXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYW5PcGVuT25OZXh0Rm9jdXMgPSB0cnVlO1xuXG4gICAgLyoqIFN0cmVhbSBvZiBrZXlib2FyZCBldmVudHMgdGhhdCBjYW4gY2xvc2UgdGhlIHBhbmVsLiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY2xvc2VLZXlFdmVudFN0cmVhbSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LFxuICAgICAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgICAgICBASW5qZWN0KE1DX0FVVE9DT01QTEVURV9TQ1JPTExfU1RSQVRFR1kpIHNjcm9sbFN0cmF0ZWd5OiBhbnksXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBwcml2YXRlIGZvcm1GaWVsZDogTWNGb3JtRmllbGQsXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcbiAgICAgICAgLy8gQGJyZWFraW5nLWNoYW5nZSA4LjAuMCBNYWtlIGBfdmlld3BvcnRSdWxlcmAgcmVxdWlyZWQuXG4gICAgICAgIHByaXZhdGUgdmlld3BvcnRSdWxlcj86IFZpZXdwb3J0UnVsZXJcbiAgICApIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG5vLXR5cGVvZi11bmRlZmluZWRcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMud2luZG93Qmx1ckhhbmRsZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjcm9sbFN0cmF0ZWd5ID0gc2Nyb2xsU3RyYXRlZ3k7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBuby10eXBlb2YtdW5kZWZpbmVkXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLndpbmRvd0JsdXJIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmlld3BvcnRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnREZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmRlc3Ryb3lQYW5lbCgpO1xuICAgICAgICB0aGlzLmNsb3NlS2V5RXZlbnRTdHJlYW0uY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKiogYFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gdmFsdWUgY2hhbmdlc2AgKi9cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgICBvbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAgIC8qKiBgVmlldyAtPiBtb2RlbCBjYWxsYmFjayBjYWxsZWQgd2hlbiBhdXRvY29tcGxldGUgaGFzIGJlZW4gdG91Y2hlZGAgKi9cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgICBvblRvdWNoZWQ6ICgpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAgIC8qKiBPcGVucyB0aGUgYXV0b2NvbXBsZXRlIHN1Z2dlc3Rpb24gcGFuZWwuICovXG4gICAgb3BlblBhbmVsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmF0dGFjaE92ZXJsYXkoKTtcbiAgICB9XG5cbiAgICBjbG9zZVBhbmVsKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheUF0dGFjaGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmICh0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUuY2xvc2VkLmVtaXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLmlzT3BlbiA9IHRoaXMub3ZlcmxheUF0dGFjaGVkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVJlZiAmJiB0aGlzLm92ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgICAgICAgICAgdGhpcy5jbG9zaW5nQWN0aW9uc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTm90ZSB0aGF0IGluIHNvbWUgY2FzZXMgdGhpcyBjYW4gZW5kIHVwIGJlaW5nIGNhbGxlZCBhZnRlciB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZC5cbiAgICAgICAgLy8gQWRkIGEgY2hlY2sgdG8gZW5zdXJlIHRoYXQgd2UgZG9uJ3QgdHJ5IHRvIHJ1biBjaGFuZ2UgZGV0ZWN0aW9uIG9uIGEgZGVzdHJveWVkIHZpZXcuXG4gICAgICAgIGlmICghdGhpcy5jb21wb25lbnREZXN0cm95ZWQpIHtcbiAgICAgICAgICAgIC8vIFdlIG5lZWQgdG8gdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uIG1hbnVhbGx5LCBiZWNhdXNlXG4gICAgICAgICAgICAvLyBgZnJvbUV2ZW50YCBkb2Vzbid0IHNlZW0gdG8gZG8gaXQgYXQgdGhlIHByb3BlciB0aW1lLlxuICAgICAgICAgICAgLy8gVGhpcyBlbnN1cmVzIHRoYXQgdGhlIGxhYmVsIGlzIHJlc2V0IHdoZW4gdGhlXG4gICAgICAgICAgICAvLyB1c2VyIGNsaWNrcyBvdXRzaWRlLlxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgYXV0b2NvbXBsZXRlIHN1Z2dlc3Rpb24gcGFuZWwgdG8gZW5zdXJlIHRoYXQgaXQgZml0cyBhbGwgb3B0aW9uc1xuICAgICAqIHdpdGhpbiB0aGUgdmlld3BvcnQuXG4gICAgICovXG4gICAgdXBkYXRlUG9zaXRpb24oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlBdHRhY2hlZCkge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmIS51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBzdHJlYW0gb2YgYWN0aW9ucyB0aGF0IHNob3VsZCBjbG9zZSB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsLCBpbmNsdWRpbmdcbiAgICAgKiB3aGVuIGFuIG9wdGlvbiBpcyBzZWxlY3RlZCwgb24gYmx1ciwgYW5kIHdoZW4gVEFCIGlzIHByZXNzZWQuXG4gICAgICovXG4gICAgZ2V0IHBhbmVsQ2xvc2luZ0FjdGlvbnMoKTogT2JzZXJ2YWJsZTxNY09wdGlvblNlbGVjdGlvbkNoYW5nZSB8IG51bGw+IHtcbiAgICAgICAgcmV0dXJuIG1lcmdlKFxuICAgICAgICAgICAgdGhpcy5vcHRpb25TZWxlY3Rpb25zLFxuICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUua2V5TWFuYWdlci50YWJPdXQucGlwZShmaWx0ZXIoKCkgPT4gdGhpcy5vdmVybGF5QXR0YWNoZWQpKSxcbiAgICAgICAgICAgIHRoaXMuY2xvc2VLZXlFdmVudFN0cmVhbSxcbiAgICAgICAgICAgIHRoaXMuZ2V0T3V0c2lkZUNsaWNrU3RyZWFtKCksXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYgP1xuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2htZW50cygpLnBpcGUoZmlsdGVyKCgpID0+IHRoaXMub3ZlcmxheUF0dGFjaGVkKSkgOlxuICAgICAgICAgICAgICAgIG9ic2VydmFibGVPZigpXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICAgIC8vIE5vcm1hbGl6ZSB0aGUgb3V0cHV0IHNvIHdlIHJldHVybiBhIGNvbnNpc3RlbnQgdHlwZS5cbiAgICAgICAgICAgIG1hcCgoZXZlbnQpID0+IGV2ZW50IGluc3RhbmNlb2YgTWNPcHRpb25TZWxlY3Rpb25DaGFuZ2UgPyBldmVudCA6IG51bGwpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4gdGhpcy5zZXRUcmlnZ2VyVmFsdWUodmFsdWUpKTtcbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB7fSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgZGVwcmVjYXRpb25cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG5cbiAgICAgICAgLy8gUHJldmVudCB0aGUgZGVmYXVsdCBhY3Rpb24gb24gYWxsIGVzY2FwZSBrZXkgcHJlc3Nlcy4gVGhpcyBpcyBoZXJlIHByaW1hcmlseSB0byBicmluZyBJRVxuICAgICAgICAvLyBpbiBsaW5lIHdpdGggb3RoZXIgYnJvd3NlcnMuIEJ5IGRlZmF1bHQsIHByZXNzaW5nIGVzY2FwZSBvbiBJRSB3aWxsIGNhdXNlIGl0IHRvIHJldmVydFxuICAgICAgICAvLyB0aGUgaW5wdXQgdmFsdWUgdG8gdGhlIG9uZSB0aGF0IGl0IGhhZCBvbiBmb2N1cywgaG93ZXZlciBpdCB3b24ndCBkaXNwYXRjaCBhbnkgZXZlbnRzXG4gICAgICAgIC8vIHdoaWNoIG1lYW5zIHRoYXQgdGhlIG1vZGVsIHZhbHVlIHdpbGwgYmUgb3V0IG9mIHN5bmMgd2l0aCB0aGUgdmlldy5cbiAgICAgICAgaWYgKGtleUNvZGUgPT09IEVTQ0FQRSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZU9wdGlvbiAmJiBrZXlDb2RlID09PSBFTlRFUiAmJiB0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVPcHRpb24uc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTtcbiAgICAgICAgICAgIHRoaXMucmVzZXRBY3RpdmVJdGVtKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXV0b2NvbXBsZXRlKSB7XG4gICAgICAgICAgICBjb25zdCBwcmV2QWN0aXZlSXRlbSA9IHRoaXMuYXV0b2NvbXBsZXRlLmtleU1hbmFnZXIuYWN0aXZlSXRlbTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucGFuZWxPcGVuIHx8IGtleUNvZGUgPT09IFRBQikge1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLm9uS2V5ZG93bihldmVudCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IERPV05fQVJST1cgJiYgdGhpcy5jYW5PcGVuKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBpc0Fycm93S2V5ID0ga2V5Q29kZSA9PT0gVVBfQVJST1cgfHwga2V5Q29kZSA9PT0gRE9XTl9BUlJPVztcblxuICAgICAgICAgICAgaWYgKGlzQXJyb3dLZXkgfHwgdGhpcy5hdXRvY29tcGxldGUua2V5TWFuYWdlci5hY3RpdmVJdGVtICE9PSBwcmV2QWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9PcHRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUlucHV0KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgICBsZXQgdmFsdWU6IG51bWJlciB8IHN0cmluZyB8IG51bGwgPSB0YXJnZXQudmFsdWU7XG5cbiAgICAgICAgLy8gQmFzZWQgb24gYE51bWJlclZhbHVlQWNjZXNzb3JgIGZyb20gZm9ybXMuXG4gICAgICAgIGlmICh0YXJnZXQudHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgPT09ICcnID8gbnVsbCA6IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlIGlucHV0IGhhcyBhIHBsYWNlaG9sZGVyLCBJRSB3aWxsIGZpcmUgdGhlIGBpbnB1dGAgZXZlbnQgb24gcGFnZSBsb2FkLFxuICAgICAgICAvLyBmb2N1cyBhbmQgYmx1ciwgaW4gYWRkaXRpb24gdG8gd2hlbiB0aGUgdXNlciBhY3R1YWxseSBjaGFuZ2VkIHRoZSB2YWx1ZS4gVG9cbiAgICAgICAgLy8gZmlsdGVyIG91dCBhbGwgb2YgdGhlIGV4dHJhIGV2ZW50cywgd2Ugc2F2ZSB0aGUgdmFsdWUgb24gZm9jdXMgYW5kIGJldHdlZW5cbiAgICAgICAgLy8gYGlucHV0YCBldmVudHMsIGFuZCB3ZSBjaGVjayB3aGV0aGVyIGl0IGNoYW5nZWQuXG4gICAgICAgIC8vIFNlZTogaHR0cHM6Ly9jb25uZWN0Lm1pY3Jvc29mdC5jb20vSUUvZmVlZGJhY2svZGV0YWlscy84ODU3NDcvXG4gICAgICAgIGlmICh0aGlzLnByZXZpb3VzVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jYW5PcGVuKCkgJiYgdGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5jYW5PcGVuT25OZXh0Rm9jdXMpIHtcbiAgICAgICAgICAgIHRoaXMuY2FuT3Blbk9uTmV4dEZvY3VzID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNhbk9wZW4oKSkge1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91c1ZhbHVlID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaE92ZXJsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKCRldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5jYW5PcGVuKCkgJiYgdGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSAkZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFN0cmVhbSBvZiBjbGlja3Mgb3V0c2lkZSBvZiB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsLiAqL1xuICAgIHByaXZhdGUgZ2V0T3V0c2lkZUNsaWNrU3RyZWFtKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBtZXJnZShcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW5uZWNlc3NhcnktdHlwZS1hc3NlcnRpb25cbiAgICAgICAgICAgIGZyb21FdmVudCh0aGlzLmRvY3VtZW50LCAnY2xpY2snKSBhcyBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+LFxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bm5lY2Vzc2FyeS10eXBlLWFzc2VydGlvblxuICAgICAgICAgICAgZnJvbUV2ZW50KHRoaXMuZG9jdW1lbnQsICd0b3VjaGVuZCcpIGFzIE9ic2VydmFibGU8VG91Y2hFdmVudD5cbiAgICAgICAgKVxuICAgICAgICAgICAgLnBpcGUoZmlsdGVyKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNsaWNrVGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1GaWVsZCA9IHRoaXMuZm9ybUZpZWxkID9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtRmllbGQuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCA6IG51bGw7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5QXR0YWNoZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tUYXJnZXQgIT09IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50ICYmXG4gICAgICAgICAgICAgICAgICAgICghZm9ybUZpZWxkIHx8ICFmb3JtRmllbGQuY29udGFpbnMoY2xpY2tUYXJnZXQpKSAmJlxuICAgICAgICAgICAgICAgICAgICAoISF0aGlzLm92ZXJsYXlSZWYgJiYgIXRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5jb250YWlucyhjbGlja1RhcmdldCkpO1xuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGhhbmRsZXIgZm9yIHdoZW4gdGhlIHdpbmRvdyBpcyBibHVycmVkLiBOZWVkcyB0byBiZSBhblxuICAgICAqIGFycm93IGZ1bmN0aW9uIGluIG9yZGVyIHRvIHByZXNlcnZlIHRoZSBjb250ZXh0LlxuICAgICAqL1xuICAgIHByaXZhdGUgd2luZG93Qmx1ckhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgIC8vIElmIHRoZSB1c2VyIGJsdXJyZWQgdGhlIHdpbmRvdyB3aGlsZSB0aGUgYXV0b2NvbXBsZXRlIGlzIGZvY3VzZWQsIGl0IG1lYW5zIHRoYXQgaXQnbGwgYmVcbiAgICAgICAgLy8gcmVmb2N1c2VkIHdoZW4gdGhleSBjb21lIGJhY2suIEluIHRoaXMgY2FzZSB3ZSB3YW50IHRvIHNraXAgdGhlIGZpcnN0IGZvY3VzIGV2ZW50LCBpZiB0aGVcbiAgICAgICAgLy8gcGFuZSB3YXMgY2xvc2VkLCBpbiBvcmRlciB0byBhdm9pZCByZW9wZW5pbmcgaXQgdW5pbnRlbnRpb25hbGx5LlxuICAgICAgICB0aGlzLmNhbk9wZW5Pbk5leHRGb2N1cyA9IHRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgfHwgdGhpcy5wYW5lbE9wZW47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gdGhhdCB3ZSBhcmUgbm90IGFjdHVhbGx5IGZvY3VzaW5nIGFjdGl2ZSBvcHRpb25zLCB3ZSBtdXN0IG1hbnVhbGx5IGFkanVzdCBzY3JvbGxcbiAgICAgKiB0byByZXZlYWwgb3B0aW9ucyBiZWxvdyB0aGUgZm9sZC4gRmlyc3QsIHdlIGZpbmQgdGhlIG9mZnNldCBvZiB0aGUgb3B0aW9uIGZyb20gdGhlIHRvcFxuICAgICAqIG9mIHRoZSBwYW5lbC4gSWYgdGhhdCBvZmZzZXQgaXMgYmVsb3cgdGhlIGZvbGQsIHRoZSBuZXcgc2Nyb2xsVG9wIHdpbGwgYmUgdGhlIG9mZnNldCAtXG4gICAgICogdGhlIHBhbmVsIGhlaWdodCArIHRoZSBvcHRpb24gaGVpZ2h0LCBzbyB0aGUgYWN0aXZlIG9wdGlvbiB3aWxsIGJlIGp1c3QgdmlzaWJsZSBhdCB0aGVcbiAgICAgKiBib3R0b20gb2YgdGhlIHBhbmVsLiBJZiB0aGF0IG9mZnNldCBpcyBhYm92ZSB0aGUgdG9wIG9mIHRoZSB2aXNpYmxlIHBhbmVsLCB0aGUgbmV3IHNjcm9sbFRvcFxuICAgICAqIHdpbGwgYmVjb21lIHRoZSBvZmZzZXQuIElmIHRoYXQgb2Zmc2V0IGlzIHZpc2libGUgd2l0aGluIHRoZSBwYW5lbCBhbHJlYWR5LCB0aGUgc2Nyb2xsVG9wIGlzXG4gICAgICogbm90IGFkanVzdGVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgc2Nyb2xsVG9PcHRpb24oKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5hdXRvY29tcGxldGUua2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggfHwgMDtcbiAgICAgICAgY29uc3QgbGFiZWxDb3VudCA9IGNvdW50R3JvdXBMYWJlbHNCZWZvcmVPcHRpb24oaW5kZXgsXG4gICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5vcHRpb25zLCB0aGlzLmF1dG9jb21wbGV0ZS5vcHRpb25Hcm91cHMpO1xuXG4gICAgICAgIGNvbnN0IG5ld1Njcm9sbFBvc2l0aW9uID0gZ2V0T3B0aW9uU2Nyb2xsUG9zaXRpb24oXG4gICAgICAgICAgICBpbmRleCArIGxhYmVsQ291bnQsXG4gICAgICAgICAgICBBVVRPQ09NUExFVEVfT1BUSU9OX0hFSUdIVCxcbiAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLmdldFNjcm9sbFRvcCgpLFxuICAgICAgICAgICAgQVVUT0NPTVBMRVRFX1BBTkVMX0hFSUdIVFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLnNldFNjcm9sbFRvcChuZXdTY3JvbGxQb3NpdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgbGlzdGVucyB0byBhIHN0cmVhbSBvZiBwYW5lbCBjbG9zaW5nIGFjdGlvbnMgYW5kIHJlc2V0cyB0aGVcbiAgICAgKiBzdHJlYW0gZXZlcnkgdGltZSB0aGUgb3B0aW9uIGxpc3QgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBwcml2YXRlIHN1YnNjcmliZVRvQ2xvc2luZ0FjdGlvbnMoKTogU3Vic2NyaXB0aW9uIHtcbiAgICAgICAgY29uc3QgZmlyc3RTdGFibGUgPSB0aGlzLnpvbmUub25TdGFibGUuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpO1xuICAgICAgICBjb25zdCBvcHRpb25DaGFuZ2VzID0gdGhpcy5hdXRvY29tcGxldGUub3B0aW9ucy5jaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YXAoKCkgPT4gdGhpcy5wb3NpdGlvblN0cmF0ZWd5LnJlYXBwbHlMYXN0UG9zaXRpb24oKSksXG4gICAgICAgICAgICAgICAgLy8gRGVmZXIgZW1pdHRpbmcgdG8gdGhlIHN0cmVhbSB1bnRpbCB0aGUgbmV4dCB0aWNrLCBiZWNhdXNlIGNoYW5naW5nXG4gICAgICAgICAgICAgICAgLy8gYmluZGluZ3MgaW4gaGVyZSB3aWxsIGNhdXNlIFwiY2hhbmdlZCBhZnRlciBjaGVja2VkXCIgZXJyb3JzLlxuICAgICAgICAgICAgICAgIGRlbGF5KDApXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIC8vIFdoZW4gdGhlIHpvbmUgaXMgc3RhYmxlIGluaXRpYWxseSwgYW5kIHdoZW4gdGhlIG9wdGlvbiBsaXN0IGNoYW5nZXMuLi5cbiAgICAgICAgcmV0dXJuIG1lcmdlKGZpcnN0U3RhYmxlLCBvcHRpb25DaGFuZ2VzKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IHN0cmVhbSBvZiBwYW5lbENsb3NpbmdBY3Rpb25zLCByZXBsYWNpbmcgYW55IHByZXZpb3VzIHN0cmVhbXNcbiAgICAgICAgICAgICAgICAvLyB0aGF0IHdlcmUgY3JlYXRlZCwgYW5kIGZsYXR0ZW4gaXQgc28gb3VyIHN0cmVhbSBvbmx5IGVtaXRzIGNsb3NpbmcgZXZlbnRzLi4uXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2FzT3BlbiA9IHRoaXMucGFuZWxPcGVuO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0QWN0aXZlSXRlbSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5zZXRWaXNpYmlsaXR5KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYhLnVwZGF0ZVBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBgcGFuZWxPcGVuYCBzdGF0ZSBjaGFuZ2VkLCB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0byBlbWl0IHRoZSBgb3BlbmVkYFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXZlbnQsIGJlY2F1c2Ugd2UgbWF5IG5vdCBoYXZlIGVtaXR0ZWQgaXQgd2hlbiB0aGUgcGFuZWwgd2FzIGF0dGFjaGVkLiBUaGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYW4gaGFwcGVuIGlmIHRoZSB1c2VycyBvcGVucyB0aGUgcGFuZWwgYW5kIHRoZXJlIGFyZSBubyBvcHRpb25zLCBidXQgdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvcHRpb25zIGNvbWUgaW4gc2xpZ2h0bHkgbGF0ZXIgb3IgYXMgYSByZXN1bHQgb2YgdGhlIHZhbHVlIGNoYW5naW5nLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdhc09wZW4gIT09IHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUub3BlbmVkLmVtaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhbmVsQ2xvc2luZ0FjdGlvbnM7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgLy8gd2hlbiB0aGUgZmlyc3QgY2xvc2luZyBldmVudCBvY2N1cnMuLi5cbiAgICAgICAgICAgICAgICB0YWtlKDEpXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAvLyBzZXQgdGhlIHZhbHVlLCBjbG9zZSB0aGUgcGFuZWwsIGFuZCBjb21wbGV0ZS5cbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB0aGlzLnNldFZhbHVlQW5kQ2xvc2UoZXZlbnQpKTtcbiAgICB9XG5cbiAgICAvKiogRGVzdHJveXMgdGhlIGF1dG9jb21wbGV0ZSBzdWdnZXN0aW9uIHBhbmVsLiAqL1xuICAgIHByaXZhdGUgZGVzdHJveVBhbmVsKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRUcmlnZ2VyVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBjb25zdCB0b0Rpc3BsYXkgPSB0aGlzLmF1dG9jb21wbGV0ZSAmJiB0aGlzLmF1dG9jb21wbGV0ZS5kaXNwbGF5V2l0aCA/XG4gICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5kaXNwbGF5V2l0aCh2YWx1ZSkgOlxuICAgICAgICAgICAgdmFsdWU7XG5cbiAgICAgICAgLy8gU2ltcGx5IGZhbGxpbmcgYmFjayB0byBhbiBlbXB0eSBzdHJpbmcgaWYgdGhlIGRpc3BsYXkgdmFsdWUgaXMgZmFsc3kgZG9lcyBub3Qgd29yayBwcm9wZXJseS5cbiAgICAgICAgLy8gVGhlIGRpc3BsYXkgdmFsdWUgY2FuIGFsc28gYmUgdGhlIG51bWJlciB6ZXJvIGFuZCBzaG91bGRuJ3QgZmFsbCBiYWNrIHRvIGFuIGVtcHR5IHN0cmluZy5cbiAgICAgICAgY29uc3QgaW5wdXRWYWx1ZSA9IHRvRGlzcGxheSAhPSBudWxsID8gdG9EaXNwbGF5IDogJyc7XG5cbiAgICAgICAgLy8gSWYgaXQncyB1c2VkIHdpdGhpbiBhIGBNYXRGb3JtRmllbGRgLCB3ZSBzaG91bGQgc2V0IGl0IHRocm91Z2ggdGhlIHByb3BlcnR5IHNvIGl0IGNhbiBnb1xuICAgICAgICAvLyB0aHJvdWdoIGNoYW5nZSBkZXRlY3Rpb24uXG4gICAgICAgIGlmICh0aGlzLmZvcm1GaWVsZCkge1xuICAgICAgICAgICAgdGhpcy5mb3JtRmllbGQuY29udHJvbC52YWx1ZSA9IGlucHV0VmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSA9IGlucHV0VmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByZXZpb3VzVmFsdWUgPSBpbnB1dFZhbHVlO1xuICAgIH1cblxuICAgIC8qKiBUaGlzIG1ldGhvZCBjbG9zZXMgdGhlIHBhbmVsLCBhbmQgaWYgYSB2YWx1ZSBpcyBzcGVjaWZpZWQsIGFsc28gc2V0cyB0aGUgYXNzb2NpYXRlZFxuICAgICAqIGNvbnRyb2wgdG8gdGhhdCB2YWx1ZS4gSXQgd2lsbCBhbHNvIG1hcmsgdGhlIGNvbnRyb2wgYXMgZGlydHkgaWYgdGhpcyBpbnRlcmFjdGlvblxuICAgICAqIHN0ZW1tZWQgZnJvbSB0aGUgdXNlci5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNldFZhbHVlQW5kQ2xvc2UoZXZlbnQ6IE1jT3B0aW9uU2VsZWN0aW9uQ2hhbmdlIHwgbnVsbCk6IHZvaWQge1xuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc291cmNlKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyUHJldmlvdXNTZWxlY3RlZE9wdGlvbihldmVudC5zb3VyY2UpO1xuICAgICAgICAgICAgdGhpcy5zZXRUcmlnZ2VyVmFsdWUoZXZlbnQuc291cmNlLnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UoZXZlbnQuc291cmNlLnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLmVtaXRTZWxlY3RFdmVudChldmVudC5zb3VyY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgfVxuXG4gICAgLyoqIENsZWFyIGFueSBwcmV2aW91cyBzZWxlY3RlZCBvcHRpb24gYW5kIGVtaXQgYSBzZWxlY3Rpb24gY2hhbmdlIGV2ZW50IGZvciB0aGlzIG9wdGlvbiAqL1xuICAgIHByaXZhdGUgY2xlYXJQcmV2aW91c1NlbGVjdGVkT3B0aW9uKHNraXA6IE1jT3B0aW9uKSB7XG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9uICE9PSBza2lwICYmIG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIG9wdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGF0dGFjaE92ZXJsYXkoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5hdXRvY29tcGxldGUpIHtcbiAgICAgICAgICAgIHRocm93IGdldE1jQXV0b2NvbXBsZXRlTWlzc2luZ1BhbmVsRXJyb3IoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvdmVybGF5UmVmID0gdGhpcy5vdmVybGF5UmVmO1xuXG4gICAgICAgIGlmICghb3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5wb3J0YWwgPSBuZXcgVGVtcGxhdGVQb3J0YWwodGhpcy5hdXRvY29tcGxldGUudGVtcGxhdGUsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgICAgICBvdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh0aGlzLmdldE92ZXJsYXlDb25maWcoKSk7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYgPSBvdmVybGF5UmVmO1xuXG4gICAgICAgICAgICAvLyBVc2UgdGhlIGBrZXlkb3duRXZlbnRzYCBpbiBvcmRlciB0byB0YWtlIGFkdmFudGFnZSBvZlxuICAgICAgICAgICAgLy8gdGhlIG92ZXJsYXkgZXZlbnQgdGFyZ2V0aW5nIHByb3ZpZGVkIGJ5IHRoZSBDREsgb3ZlcmxheS5cbiAgICAgICAgICAgIG92ZXJsYXlSZWYua2V5ZG93bkV2ZW50cygpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBDbG9zZSB3aGVuIHByZXNzaW5nIEVTQ0FQRSBvciBBTFQgKyBVUF9BUlJPVywgYmFzZWQgb24gdGhlIGExMXkgZ3VpZGVsaW5lcy5cbiAgICAgICAgICAgICAgICAvLyBTZWU6IGh0dHBzOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS1wcmFjdGljZXMtMS4xLyN0ZXh0Ym94LWtleWJvYXJkLWludGVyYWN0aW9uXG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIGRlcHJlY2F0aW9uXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSB8fCAoZXZlbnQua2V5Q29kZSA9PT0gVVBfQVJST1cgJiYgZXZlbnQuYWx0S2V5KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0QWN0aXZlSXRlbSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlS2V5RXZlbnRTdHJlYW0ubmV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy52aWV3cG9ydFJ1bGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3cG9ydFN1YnNjcmlwdGlvbiA9IHRoaXMudmlld3BvcnRSdWxlci5jaGFuZ2UoKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wYW5lbE9wZW4gJiYgb3ZlcmxheVJlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVJlZi51cGRhdGVTaXplKHsgd2lkdGg6IHRoaXMuZ2V0UGFuZWxXaWR0aCgpIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IG92ZXJsYXlSZWYuZ2V0Q29uZmlnKCkucG9zaXRpb25TdHJhdGVneSBhcyBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3k7XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgdHJpZ2dlciwgcGFuZWwgd2lkdGggYW5kIGRpcmVjdGlvbiwgaW4gY2FzZSBhbnl0aGluZyBoYXMgY2hhbmdlZC5cbiAgICAgICAgICAgIHBvc2l0aW9uLnNldE9yaWdpbih0aGlzLmdldENvbm5lY3RlZEVsZW1lbnQoKSk7XG4gICAgICAgICAgICBvdmVybGF5UmVmLnVwZGF0ZVNpemUoeyB3aWR0aDogdGhpcy5nZXRQYW5lbFdpZHRoKCkgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3ZlcmxheVJlZiAmJiAhb3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgICBvdmVybGF5UmVmLmF0dGFjaCh0aGlzLnBvcnRhbCk7XG4gICAgICAgICAgICB0aGlzLmNsb3NpbmdBY3Rpb25zU3Vic2NyaXB0aW9uID0gdGhpcy5zdWJzY3JpYmVUb0Nsb3NpbmdBY3Rpb25zKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB3YXNPcGVuID0gdGhpcy5wYW5lbE9wZW47XG5cbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGUuc2V0VmlzaWJpbGl0eSgpO1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5pc09wZW4gPSB0aGlzLm92ZXJsYXlBdHRhY2hlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gV2UgbmVlZCB0byBkbyBhbiBleHRyYSBgcGFuZWxPcGVuYCBjaGVjayBpbiBoZXJlLCBiZWNhdXNlIHRoZVxuICAgICAgICAvLyBhdXRvY29tcGxldGUgd29uJ3QgYmUgc2hvd24gaWYgdGhlcmUgYXJlIG5vIG9wdGlvbnMuXG4gICAgICAgIGlmICh0aGlzLnBhbmVsT3BlbiAmJiB3YXNPcGVuICE9PSB0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUub3BlbmVkLmVtaXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0T3ZlcmxheUNvbmZpZygpOiBPdmVybGF5Q29uZmlnIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPdmVybGF5Q29uZmlnKHtcbiAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMuZ2V0T3ZlcmxheVBvc2l0aW9uKCksXG4gICAgICAgICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5zY3JvbGxTdHJhdGVneSgpLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMuZ2V0UGFuZWxXaWR0aCgpLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiB0aGlzLmRpclxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE92ZXJsYXlQb3NpdGlvbigpOiBQb3NpdGlvblN0cmF0ZWd5IHtcbiAgICAgICAgdGhpcy5wb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5vdmVybGF5LnBvc2l0aW9uKClcbiAgICAgICAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHRoaXMuZ2V0Q29ubmVjdGVkRWxlbWVudCgpKVxuICAgICAgICAgICAgLndpdGhGbGV4aWJsZURpbWVuc2lvbnMoZmFsc2UpXG4gICAgICAgICAgICAud2l0aFB1c2goZmFsc2UpXG4gICAgICAgICAgICAud2l0aFBvc2l0aW9ucyhbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAndG9wJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5ZOiAndG9wJyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJyxcblxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgb3ZlcmxheSBlZGdlIGNvbm5lY3RlZCB0byB0aGUgdHJpZ2dlciBzaG91bGQgaGF2ZSBzcXVhcmVkIGNvcm5lcnMsIHdoaWxlXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBvcHBvc2l0ZSBlbmQgaGFzIHJvdW5kZWQgY29ybmVycy4gV2UgYXBwbHkgYSBDU1MgY2xhc3MgdG8gc3dhcCB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gYm9yZGVyLXJhZGl1cyBiYXNlZCBvbiB0aGUgb3ZlcmxheSBwb3NpdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgcGFuZWxDbGFzczogJ21jLWF1dG9jb21wbGV0ZS1wYW5lbC1hYm92ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdIGFzIENvbm5lY3RlZFBvc2l0aW9uW10pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uU3RyYXRlZ3k7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDb25uZWN0ZWRFbGVtZW50KCk6IEVsZW1lbnRSZWYge1xuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWRUbykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdGVkVG8uZWxlbWVudFJlZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1GaWVsZCA/IHRoaXMuZm9ybUZpZWxkLmdldENvbm5lY3RlZE92ZXJsYXlPcmlnaW4oKSA6IHRoaXMuZWxlbWVudFJlZjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFBhbmVsV2lkdGgoKTogbnVtYmVyIHwgc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0b2NvbXBsZXRlLnBhbmVsV2lkdGggfHwgdGhpcy5nZXRIb3N0V2lkdGgoKSAtIEFVVE9DT01QTEVURV9CT1JERVJfV0lEVEg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRIb3N0V2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29ubmVjdGVkRWxlbWVudCgpLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXRzIHRoZSBhY3RpdmUgaXRlbSB0byAtMSBzbyBhcnJvdyBldmVudHMgd2lsbCBhY3RpdmF0ZSB0aGVcbiAgICAgKiBjb3JyZWN0IG9wdGlvbnMsIG9yIHRvIDAgaWYgdGhlIGNvbnN1bWVyIG9wdGVkIGludG8gaXQuXG4gICAgICovXG4gICAgcHJpdmF0ZSByZXNldEFjdGl2ZUl0ZW0oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbSh0aGlzLmF1dG9jb21wbGV0ZS5hdXRvQWN0aXZlRmlyc3RPcHRpb24gPyAwIDogLTEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FuT3BlbigpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIHJldHVybiAhZWxlbWVudC5yZWFkT25seSAmJiAhZWxlbWVudC5kaXNhYmxlZCAmJiAhdGhpcy5fYXV0b2NvbXBsZXRlRGlzYWJsZWQ7XG4gICAgfVxufVxuIl19