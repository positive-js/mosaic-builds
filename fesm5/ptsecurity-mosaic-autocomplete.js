import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { InjectionToken, EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, Inject, ViewChild, TemplateRef, ContentChildren, Input, Output, Directive, forwardRef, ViewContainerRef, NgZone, Optional, Host, NgModule } from '@angular/core';
import { ActiveDescendantKeyManager } from '@ptsecurity/cdk/a11y';
import { MC_OPTION_PARENT_COMPONENT, McOption, McOptgroup, McOptionSelectionChange, countGroupLabelsBeforeOption, getOptionScrollPosition, McOptionModule, McCommonModule } from '@ptsecurity/mosaic/core';
import { Overlay, OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { DOCUMENT, CommonModule } from '@angular/common';
import { __spread } from 'tslib';
import { Directionality } from '@angular/cdk/bidi';
import { TemplatePortal } from '@angular/cdk/portal';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ESCAPE, ENTER, TAB, DOWN_ARROW, UP_ARROW } from '@ptsecurity/cdk/keycodes';
import { McFormField } from '@ptsecurity/mosaic/form-field';
import { defer, merge, Subscription, Subject, of, fromEvent } from 'rxjs';
import { take, switchMap, filter, map, tap, delay } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * Generated from: autocomplete.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
if (false) {
    /** @type {?} */
    McAutocompleteSelectedEvent.prototype.source;
    /** @type {?} */
    McAutocompleteSelectedEvent.prototype.option;
}
/**
 * Default `mc-autocomplete` options that can be overridden.
 * @record
 */
function McAutocompleteDefaultOptions() { }
if (false) {
    /**
     * Whether the first option should be highlighted when an autocomplete panel is opened.
     * @type {?|undefined}
     */
    McAutocompleteDefaultOptions.prototype.autoActiveFirstOption;
}
/**
 * Injection token to be used to override the default options for `mc-autocomplete`.
 * @type {?}
 */
var MC_AUTOCOMPLETE_DEFAULT_OPTIONS = new InjectionToken('mc-autocomplete-default-options', {
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
            this._autoActiveFirstOption = coerceBooleanProperty(value);
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
        this.keyManager = new ActiveDescendantKeyManager(this.options);
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
        { type: Component, args: [{
                    selector: 'mc-autocomplete',
                    exportAs: 'mcAutocomplete',
                    template: "<ng-template>\n    <div class=\"mc-autocomplete-panel\" role=\"listbox\" [id]=\"id\" [ngClass]=\"classList\" #panel>\n        <ng-content></ng-content>\n    </div>\n</ng-template>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: { class: 'mc-autocomplete' },
                    providers: [
                        { provide: MC_OPTION_PARENT_COMPONENT, useExisting: McAutocomplete }
                    ],
                    styles: [".mc-autocomplete-trigger{text-overflow:ellipsis}.mc-autocomplete-panel{visibility:hidden;position:relative;overflow:auto;-webkit-overflow-scrolling:touch;margin-top:-1px;min-width:100%;width:100%;max-width:none;max-height:256px;border-width:1px;border-style:solid;border-bottom-left-radius:3px;border-bottom-right-radius:3px;padding:4px 0}.mc-autocomplete-panel.mc-autocomplete_visible{visibility:visible}.mc-autocomplete-panel.mc-autocomplete_hidden{visibility:hidden}.mc-autocomplete-panel-above .mc-autocomplete-panel{border-radius:3px 3px 0 0}.mc-autocomplete-panel .mc-divider-horizontal{margin-top:-1px}.cdk-high-contrast-active .mc-autocomplete-panel{outline:solid 1px}.cdk-high-contrast-active :host .mc-autocomplete-panel{outline:solid 1px}"]
                }] }
    ];
    /** @nocollapse */
    McAutocomplete.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [MC_AUTOCOMPLETE_DEFAULT_OPTIONS,] }] }
    ]; };
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
    return McAutocomplete;
}());
if (false) {
    /**
     * Unique ID to be used by autocomplete trigger's "aria-owns" property.
     * @type {?}
     */
    McAutocomplete.prototype.id;
    /**
     * Manages active item in option list based on key events.
     * @type {?}
     */
    McAutocomplete.prototype.keyManager;
    /**
     * Whether the autocomplete panel should be visible, depending on option length.
     * @type {?}
     */
    McAutocomplete.prototype.showPanel;
    /** @type {?} */
    McAutocomplete.prototype.template;
    /** @type {?} */
    McAutocomplete.prototype.panel;
    /** @type {?} */
    McAutocomplete.prototype.options;
    /** @type {?} */
    McAutocomplete.prototype.optionGroups;
    /**
     * Function that maps an option's control value to its display value in the trigger.
     * @type {?}
     */
    McAutocomplete.prototype.displayWith;
    /**
     * Specify the width of the autocomplete panel.  Can be any CSS sizing value, otherwise it will
     * match the width of its host.
     * @type {?}
     */
    McAutocomplete.prototype.panelWidth;
    /**
     * Event that is emitted whenever an option from the list is selected.
     * @type {?}
     */
    McAutocomplete.prototype.optionSelected;
    /**
     * Event that is emitted when the autocomplete panel is opened.
     * @type {?}
     */
    McAutocomplete.prototype.opened;
    /**
     * Event that is emitted when the autocomplete panel is closed.
     * @type {?}
     */
    McAutocomplete.prototype.closed;
    /**
     * @type {?}
     * @private
     */
    McAutocomplete.prototype._classList;
    /**
     * @type {?}
     * @private
     */
    McAutocomplete.prototype._autoActiveFirstOption;
    /**
     * @type {?}
     * @private
     */
    McAutocomplete.prototype._isOpen;
    /**
     * @type {?}
     * @private
     */
    McAutocomplete.prototype.changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    McAutocomplete.prototype.elementRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: autocomplete-origin.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        { type: Directive, args: [{
                    selector: '[mcAutocompleteOrigin]',
                    exportAs: 'mcAutocompleteOrigin'
                },] }
    ];
    /** @nocollapse */
    McAutocompleteOrigin.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return McAutocompleteOrigin;
}());
if (false) {
    /** @type {?} */
    McAutocompleteOrigin.prototype.elementRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: autocomplete-trigger.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
var MC_AUTOCOMPLETE_SCROLL_STRATEGY = new InjectionToken('mc-autocomplete-scroll-strategy');
// tslint:disable-next-line naming-convention
/**
 * @param {?} overlay
 * @return {?}
 */
function MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY(overlay) {
    return (/**
     * @return {?}
     */
    function () { return overlay.scrollStrategies.reposition(); });
}
/** @type {?} */
var MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_AUTOCOMPLETE_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY
};
/**
 * Provider that allows the autocomplete to register as a ControlValueAccessor.
 * \@docs-private
 * @type {?}
 */
var MAT_AUTOCOMPLETE_VALUE_ACCESSOR = {
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
function getMcAutocompleteMissingPanelError() {
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
                of()).pipe(
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

/**
 * @fileoverview added by tsickle
 * Generated from: autocomplete.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McAutocompleteModule = /** @class */ (function () {
    function McAutocompleteModule() {
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
                },] }
    ];
    return McAutocompleteModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ptsecurity-mosaic-autocomplete.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AUTOCOMPLETE_BORDER_WIDTH, AUTOCOMPLETE_OPTION_HEIGHT, AUTOCOMPLETE_PANEL_HEIGHT, MAT_AUTOCOMPLETE_VALUE_ACCESSOR, MC_AUTOCOMPLETE_DEFAULT_OPTIONS, MC_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY, MC_AUTOCOMPLETE_SCROLL_STRATEGY, MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY, MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER, McAutocomplete, McAutocompleteModule, McAutocompleteOrigin, McAutocompleteSelectedEvent, McAutocompleteTrigger, getMcAutocompleteMissingPanelError };
//# sourceMappingURL=ptsecurity-mosaic-autocomplete.js.map
