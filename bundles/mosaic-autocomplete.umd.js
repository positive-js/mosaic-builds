/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/cdk/a11y'), require('@ptsecurity/cdk/coercion'), require('@ptsecurity/mosaic/core'), require('@angular/common'), require('@angular/forms'), require('@ptsecurity/cdk/bidi'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/cdk/overlay'), require('@ptsecurity/cdk/portal'), require('@ptsecurity/cdk/scrolling'), require('@ptsecurity/mosaic/form-field'), require('rxjs'), require('rxjs/operators')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/autocomplete', ['exports', '@angular/core', '@ptsecurity/cdk/a11y', '@ptsecurity/cdk/coercion', '@ptsecurity/mosaic/core', '@angular/common', '@angular/forms', '@ptsecurity/cdk/bidi', '@ptsecurity/cdk/keycodes', '@ptsecurity/cdk/overlay', '@ptsecurity/cdk/portal', '@ptsecurity/cdk/scrolling', '@ptsecurity/mosaic/form-field', 'rxjs', 'rxjs/operators'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.autocomplete = {}),global.ng.core,global.ng.cdk.a11y,global.ng.cdk.coercion,global.ng.mosaic.core,global.ng.common,global.ng.forms,global.ng.cdk.bidi,global.ng.cdk.keycodes,global.ng.cdk.overlay,global.ng.cdk.portal,global.ng.cdk.scrolling,global.ng.mosaic.formField,global.rxjs,global.rxjs.operators));
}(this, (function (exports,core,a11y,coercion,core$1,common,forms,bidi,keycodes,overlay,portal,scrolling,formField,rxjs,operators) { 'use strict';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Autocomplete IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 * @type {?}
 */
var uniqueAutocompleteIdCounter = 0;
var McAutocompleteSelectedEvent = /** @class */ (function () {
    function McAutocompleteSelectedEvent(source, option) {
        this.source = source;
        this.option = option;
    }
    return McAutocompleteSelectedEvent;
}());
/**
 * Injection token to be used to override the default options for `mc-autocomplete`.
 * @type {?}
 */
var MC_AUTOCOMPLETE_DEFAULT_OPTIONS = new core.InjectionToken('mc-autocomplete-default-options', {
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
var McAutocomplete = /** @class */ (function () {
    function McAutocomplete(changeDetectorRef, elementRef, defaults) {
        this.changeDetectorRef = changeDetectorRef;
        this.elementRef = elementRef;
        /**
         * Unique ID to be used by autocomplete trigger's "aria-owns" property.
         */
        this.id = "mc-autocomplete-" + uniqueAutocompleteIdCounter++;
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
        this.optionSelected = new core.EventEmitter();
        /**
         * Event that is emitted when the autocomplete panel is opened.
         */
        this.opened = new core.EventEmitter();
        /**
         * Event that is emitted when the autocomplete panel is closed.
         */
        this.closed = new core.EventEmitter();
        this._classList = {};
        this._isOpen = false;
        this._autoActiveFirstOption = !!defaults.autoActiveFirstOption;
    }
    Object.defineProperty(McAutocomplete.prototype, "classList", {
        /**
         * Takes classes set on the host mc-autocomplete element and applies them to the panel
         * inside the overlay container to allow for easy styling.
         */
        get: /**
         * Takes classes set on the host mc-autocomplete element and applies them to the panel
         * inside the overlay container to allow for easy styling.
         * @return {?}
         */
        function () {
            return this._classList;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (value && value.length) {
                value.split(' ')
                    .forEach((/**
                 * @param {?} className
                 * @return {?}
                 */
                function (className) { return _this._classList[className.trim()] = true; }));
                this.elementRef.nativeElement.className = '';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McAutocomplete.prototype, "autoActiveFirstOption", {
        /**
         * Whether the first option should be highlighted when the autocomplete panel is opened.
         * Can be configured globally through the `MC_AUTOCOMPLETE_DEFAULT_OPTIONS` token.
         */
        get: /**
         * Whether the first option should be highlighted when the autocomplete panel is opened.
         * Can be configured globally through the `MC_AUTOCOMPLETE_DEFAULT_OPTIONS` token.
         * @return {?}
         */
        function () {
            return this._autoActiveFirstOption;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._autoActiveFirstOption = coercion.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McAutocomplete.prototype, "isOpen", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isOpen && this.showPanel;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._isOpen = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McAutocomplete.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.keyManager = new a11y.ActiveDescendantKeyManager(this.options);
        this.setVisibility();
    };
    /**
     * @param {?} scrollTop
     * @return {?}
     */
    McAutocomplete.prototype.setScrollTop = /**
     * @param {?} scrollTop
     * @return {?}
     */
    function (scrollTop) {
        if (this.panel) {
            this.panel.nativeElement.scrollTop = scrollTop;
        }
    };
    /**
     * @return {?}
     */
    McAutocomplete.prototype.getScrollTop = /**
     * @return {?}
     */
    function () {
        return this.panel ? this.panel.nativeElement.scrollTop : 0;
    };
    /**
     * @return {?}
     */
    McAutocomplete.prototype.setVisibility = /**
     * @return {?}
     */
    function () {
        this.showPanel = !!this.options.length;
        this._classList['mc-autocomplete_visible'] = this.showPanel;
        this._classList['mc-autocomplete_hidden'] = !this.showPanel;
        this.changeDetectorRef.markForCheck();
    };
    /**
     * @param {?} option
     * @return {?}
     */
    McAutocomplete.prototype.emitSelectEvent = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        /** @type {?} */
        var event = new McAutocompleteSelectedEvent(this, option);
        this.optionSelected.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McAutocomplete.prototype.onKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.keyManager.onKeydown(event);
    };
    McAutocomplete.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-autocomplete',
                    exportAs: 'mcAutocomplete',
                    template: "<ng-template><div class=\"mc-autocomplete-panel\" role=\"listbox\" [id]=\"id\" [ngClass]=\"classList\" #panel><ng-content></ng-content></div></ng-template>",
                    styles: [".mc-autocomplete-trigger{text-overflow:ellipsis}.mc-autocomplete-panel{visibility:hidden;position:relative;overflow:auto;-webkit-overflow-scrolling:touch;margin-top:-1px;min-width:100%;width:100%;max-width:none;max-height:256px;border-width:1px;border-style:solid;border-bottom-left-radius:3px;border-bottom-right-radius:3px;padding:4px 0}.mc-autocomplete-panel.mc-autocomplete_visible{visibility:visible}.mc-autocomplete-panel.mc-autocomplete_hidden{visibility:hidden}.mc-autocomplete-panel-above .mc-autocomplete-panel{border-radius:0;border-top-left-radius:3px;border-top-right-radius:3px}.mc-autocomplete-panel .mc-divider-horizontal{margin-top:-1px}@media screen and (-ms-high-contrast:active){.mc-autocomplete-panel{outline:solid 1px}}"],
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    host: { class: 'mc-autocomplete' },
                    providers: [
                        { provide: core$1.MC_OPTION_PARENT_COMPONENT, useExisting: McAutocomplete }
                    ]
                },] },
    ];
    /** @nocollapse */
    McAutocomplete.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef },
        { type: core.ElementRef },
        { type: undefined, decorators: [{ type: core.Inject, args: [MC_AUTOCOMPLETE_DEFAULT_OPTIONS,] }] }
    ]; };
    McAutocomplete.propDecorators = {
        template: [{ type: core.ViewChild, args: [core.TemplateRef, { static: true },] }],
        panel: [{ type: core.ViewChild, args: ['panel', { static: false },] }],
        options: [{ type: core.ContentChildren, args: [core$1.McOption, { descendants: true },] }],
        optionGroups: [{ type: core.ContentChildren, args: [core$1.McOptgroup,] }],
        displayWith: [{ type: core.Input }],
        panelWidth: [{ type: core.Input }],
        optionSelected: [{ type: core.Output }],
        opened: [{ type: core.Output }],
        closed: [{ type: core.Output }],
        classList: [{ type: core.Input, args: ['class',] }],
        autoActiveFirstOption: [{ type: core.Input }]
    };
    return McAutocomplete;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Directive applied to an element to make it usable
 * as a connection point for an autocomplete panel.
 */
var McAutocompleteOrigin = /** @class */ (function () {
    function McAutocompleteOrigin(elementRef) {
        this.elementRef = elementRef;
    }
    McAutocompleteOrigin.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mcAutocompleteOrigin]',
                    exportAs: 'mcAutocompleteOrigin'
                },] },
    ];
    /** @nocollapse */
    McAutocompleteOrigin.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    return McAutocompleteOrigin;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The height of each autocomplete option.
 * @type {?}
 */
var AUTOCOMPLETE_OPTION_HEIGHT = 32;
/**
 * The total height of the autocomplete panel.
 * @type {?}
 */
var AUTOCOMPLETE_PANEL_HEIGHT = 256;
/** @type {?} */
var AUTOCOMPLETE_BORDER_WIDTH = 2;
/**
 * Injection token that determines the scroll handling while the autocomplete panel is open.
 * @type {?}
 */
var MC_AUTOCOMPLETE_SCROLL_STRATEGY = new core.InjectionToken('mc-autocomplete-scroll-strategy');
// tslint:disable-next-line naming-convention
/**
 * @param {?} overlay
 * @return {?}
 */
function MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY(overlay$$1) {
    return (/**
     * @return {?}
     */
    function () { return overlay$$1.scrollStrategies.reposition(); });
}
/** @type {?} */
var MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_AUTOCOMPLETE_SCROLL_STRATEGY,
    deps: [overlay.Overlay],
    useFactory: MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY
};
/**
 * Provider that allows the autocomplete to register as a ControlValueAccessor.
 * \@docs-private
 * @type {?}
 */
var MAT_AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef((/**
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
function getMcAutocompleteMissingPanelError() {
    return Error('Attempting to open an undefined instance of `mc-autocomplete`. ' +
        'Make sure that the id passed to the `mcAutocomplete` is correct and that ' +
        'you\'re attempting to open it after the ngAfterContentInit hook.');
}
var McAutocompleteTrigger = /** @class */ (function () {
    function McAutocompleteTrigger(elementRef, viewContainerRef, changeDetectorRef, overlay$$1, zone, scrollStrategy, dir, formField$$1, document, viewportRuler) {
        var _this = this;
        this.elementRef = elementRef;
        this.viewContainerRef = viewContainerRef;
        this.changeDetectorRef = changeDetectorRef;
        this.overlay = overlay$$1;
        this.zone = zone;
        this.dir = dir;
        this.formField = formField$$1;
        this.document = document;
        this.viewportRuler = viewportRuler;
        // @ts-ignore
        this.optionSelections = rxjs.defer((/**
         * @return {?}
         */
        function () {
            if (_this.autocomplete && _this.autocomplete.options) {
                return rxjs.merge.apply(void 0, _this.autocomplete.options.map((/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) { return option.onSelectionChange; })));
            }
            // If there are any subscribers before `ngAfterViewInit`, the `autocomplete` will be undefined.
            // Return a stream that we'll replace with the real one once everything is in place.
            return _this.zone.onStable
                .asObservable()
                .pipe(operators.take(1), operators.switchMap((/**
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
        this.viewportSubscription = rxjs.Subscription.EMPTY;
        /**
         * Whether the autocomplete can open the next time it is focused. Used to prevent a focused,
         * closed autocomplete from being reopened if the user switches to another browser tab and then
         * comes back.
         */
        this.canOpenOnNextFocus = true;
        /**
         * Stream of keyboard events that can close the panel.
         */
        this.closeKeyEventStream = new rxjs.Subject();
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
            this._autocompleteDisabled = coercion.coerceBooleanProperty(value);
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
            return rxjs.merge(this.optionSelections, this.autocomplete.keyManager.tabOut.pipe(operators.filter((/**
             * @return {?}
             */
            function () { return _this.overlayAttached; }))), this.closeKeyEventStream, this.getOutsideClickStream(), this.overlayRef ?
                this.overlayRef.detachments().pipe(operators.filter((/**
                 * @return {?}
                 */
                function () { return _this.overlayAttached; }))) :
                rxjs.of()).pipe(
            // Normalize the output so we return a consistent type.
            operators.map((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event instanceof core$1.McOptionSelectionChange ? event : null; })));
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
        if (keyCode === keycodes.ESCAPE) {
            event.preventDefault();
        }
        if (this.activeOption && keyCode === keycodes.ENTER && this.panelOpen) {
            this.activeOption.selectViaInteraction();
            this.resetActiveItem();
            event.preventDefault();
        }
        else if (this.autocomplete) {
            /** @type {?} */
            var prevActiveItem = this.autocomplete.keyManager.activeItem;
            if (this.panelOpen || keyCode === keycodes.TAB) {
                this.autocomplete.onKeydown(event);
            }
            else if (keyCode === keycodes.DOWN_ARROW && this.canOpen()) {
                this.openPanel();
            }
            /** @type {?} */
            var isArrowKey = keyCode === keycodes.UP_ARROW || keyCode === keycodes.DOWN_ARROW;
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
        if (!this.document) {
            return rxjs.of(null);
        }
        return rxjs.fromEvent(this.document, 'click')
            .pipe(operators.filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var clickTarget = (/** @type {?} */ (event.target));
            /** @type {?} */
            var formField$$1 = _this.formField ?
                _this.formField._elementRef.nativeElement : null;
            return _this.overlayAttached &&
                clickTarget !== _this.elementRef.nativeElement &&
                (!formField$$1 || !formField$$1.contains(clickTarget)) &&
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
        var labelCount = core$1.countGroupLabelsBeforeOption(index, this.autocomplete.options, this.autocomplete.optionGroups);
        /** @type {?} */
        var newScrollPosition = core$1.getOptionScrollPosition(index + labelCount, AUTOCOMPLETE_OPTION_HEIGHT, this.autocomplete.getScrollTop(), AUTOCOMPLETE_PANEL_HEIGHT);
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
            .pipe(operators.take(1));
        /** @type {?} */
        var optionChanges = this.autocomplete.options.changes
            .pipe(operators.tap((/**
         * @return {?}
         */
        function () { return _this.positionStrategy.reapplyLastPosition(); })), 
        // Defer emitting to the stream until the next tick, because changing
        // bindings in here will cause "changed after checked" errors.
        operators.delay(0));
        // When the zone is stable initially, and when the option list changes...
        return rxjs.merge(firstStable, optionChanges)
            .pipe(
        // create a new stream of panelClosingActions, replacing any previous streams
        // that were created, and flatten it so our stream only emits closing events...
        operators.switchMap((/**
         * @return {?}
         */
        function () {
            _this.resetActiveItem();
            _this.autocomplete.setVisibility();
            if (_this.panelOpen) {
                (/** @type {?} */ (_this.overlayRef)).updatePosition();
            }
            return _this.panelClosingActions;
        })), 
        // when the first closing event occurs...
        operators.take(1))
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
            this.formField._control.value = inputValue;
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
            this.portal = new portal.TemplatePortal(this.autocomplete.template, this.viewContainerRef);
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
                if (event.keyCode === keycodes.ESCAPE || (event.keyCode === keycodes.UP_ARROW && event.altKey)) {
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
        return new overlay.OverlayConfig({
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
        { type: core.Directive, args: [{
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
                },] },
    ];
    /** @nocollapse */
    McAutocompleteTrigger.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ViewContainerRef },
        { type: core.ChangeDetectorRef },
        { type: overlay.Overlay },
        { type: core.NgZone },
        { type: undefined, decorators: [{ type: core.Inject, args: [MC_AUTOCOMPLETE_SCROLL_STRATEGY,] }] },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
        { type: formField.McFormField, decorators: [{ type: core.Optional }, { type: core.Host }] },
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [common.DOCUMENT,] }] },
        { type: scrolling.ViewportRuler }
    ]; };
    McAutocompleteTrigger.propDecorators = {
        autocomplete: [{ type: core.Input, args: ['mcAutocomplete',] }],
        connectedTo: [{ type: core.Input, args: ['mcAutocompleteConnectedTo',] }],
        autocompleteAttribute: [{ type: core.Input, args: ['autocomplete',] }],
        autocompleteDisabled: [{ type: core.Input, args: ['mcAutocompleteDisabled',] }]
    };
    return McAutocompleteTrigger;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McAutocompleteModule = /** @class */ (function () {
    function McAutocompleteModule() {
    }
    McAutocompleteModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [core$1.McOptionModule, overlay.OverlayModule, core$1.McCommonModule, common.CommonModule],
                    exports: [
                        McAutocomplete,
                        core$1.McOptionModule,
                        McAutocompleteTrigger,
                        McAutocompleteOrigin,
                        core$1.McCommonModule
                    ],
                    declarations: [McAutocomplete, McAutocompleteTrigger, McAutocompleteOrigin],
                    providers: [MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER]
                },] },
    ];
    return McAutocompleteModule;
}());

exports.MC_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY = MC_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY;
exports.McAutocompleteSelectedEvent = McAutocompleteSelectedEvent;
exports.MC_AUTOCOMPLETE_DEFAULT_OPTIONS = MC_AUTOCOMPLETE_DEFAULT_OPTIONS;
exports.McAutocomplete = McAutocomplete;
exports.McAutocompleteModule = McAutocompleteModule;
exports.MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY = MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY;
exports.getMcAutocompleteMissingPanelError = getMcAutocompleteMissingPanelError;
exports.AUTOCOMPLETE_OPTION_HEIGHT = AUTOCOMPLETE_OPTION_HEIGHT;
exports.AUTOCOMPLETE_PANEL_HEIGHT = AUTOCOMPLETE_PANEL_HEIGHT;
exports.AUTOCOMPLETE_BORDER_WIDTH = AUTOCOMPLETE_BORDER_WIDTH;
exports.MC_AUTOCOMPLETE_SCROLL_STRATEGY = MC_AUTOCOMPLETE_SCROLL_STRATEGY;
exports.MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER = MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER;
exports.MAT_AUTOCOMPLETE_VALUE_ACCESSOR = MAT_AUTOCOMPLETE_VALUE_ACCESSOR;
exports.McAutocompleteTrigger = McAutocompleteTrigger;
exports.McAutocompleteOrigin = McAutocompleteOrigin;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-autocomplete.umd.js.map
