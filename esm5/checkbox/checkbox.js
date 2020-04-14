/**
 * @fileoverview added by tsickle
 * Generated from: checkbox.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { mixinColor, mixinDisabled, mixinTabIndex, toBoolean } from '@ptsecurity/mosaic/core';
import { MC_CHECKBOX_CLICK_ACTION } from './checkbox-config';
// Increasing integer for generating unique ids for checkbox components.
/** @type {?} */
var nextUniqueId = 0;
/**
 * Provider Expression that allows mc-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * \@docs-private
 * @type {?}
 */
export var MC_CHECKBOX_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return McCheckbox; })),
    multi: true
};
/** @enum {number} */
var TransitionCheckState = {
    /** The initial state of the component before any user interaction. */
    Init: 0,
    /** The state representing the component when it's becoming checked. */
    Checked: 1,
    /** The state representing the component when it's becoming unchecked. */
    Unchecked: 2,
    /** The state representing the component when it's becoming indeterminate. */
    Indeterminate: 3,
};
export { TransitionCheckState };
TransitionCheckState[TransitionCheckState.Init] = 'Init';
TransitionCheckState[TransitionCheckState.Checked] = 'Checked';
TransitionCheckState[TransitionCheckState.Unchecked] = 'Unchecked';
TransitionCheckState[TransitionCheckState.Indeterminate] = 'Indeterminate';
/**
 * Change event object emitted by McCheckbox.
 */
var /**
 * Change event object emitted by McCheckbox.
 */
McCheckboxChange = /** @class */ (function () {
    function McCheckboxChange() {
    }
    return McCheckboxChange;
}());
/**
 * Change event object emitted by McCheckbox.
 */
export { McCheckboxChange };
if (false) {
    /**
     * The source McCheckbox of the event.
     * @type {?}
     */
    McCheckboxChange.prototype.source;
    /**
     * The new `checked` value of the checkbox.
     * @type {?}
     */
    McCheckboxChange.prototype.checked;
}
// Boilerplate for applying mixins to McCheckbox.
/**
 * \@docs-private
 */
var 
// Boilerplate for applying mixins to McCheckbox.
/**
 * \@docs-private
 */
McCheckboxBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McCheckboxBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McCheckboxBase;
}());
// Boilerplate for applying mixins to McCheckbox.
/**
 * \@docs-private
 */
export { McCheckboxBase };
if (false) {
    /** @type {?} */
    McCheckboxBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export var McCheckboxMixinBase = mixinTabIndex(mixinColor(mixinDisabled(McCheckboxBase)));
/**
 * A mosaic checkbox component. Supports all of the functionality of an HTML5 checkbox,
 * and exposes a similar API. A McCheckbox can be either checked, unchecked, indeterminate, or
 * disabled. Note that all additional accessibility attributes are taken care of by the component,
 * so there is no need to provide them yourself. However, if you want to omit a label and still
 * have the checkbox be accessible, you may supply an [aria-label] input.
 */
var McCheckbox = /** @class */ (function (_super) {
    __extends(McCheckbox, _super);
    function McCheckbox(elementRef, _changeDetectorRef, _focusMonitor, _clickAction) {
        var _this = _super.call(this, elementRef) || this;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._focusMonitor = _focusMonitor;
        _this._clickAction = _clickAction;
        /**
         * Attached to the aria-label attribute of the host element. In most cases, arial-labelledby will
         * take precedence so this may be omitted.
         */
        _this.ariaLabel = '';
        /**
         * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
         */
        _this.ariaLabelledby = null;
        /**
         * Whether the label should appear after or before the checkbox. Defaults to 'after'
         */
        _this.labelPosition = 'after';
        /**
         * Name value will be applied to the input element if present
         */
        _this.name = null;
        /**
         * Event emitted when the checkbox's `checked` value changes.
         */
        _this.change = new EventEmitter();
        /**
         * Event emitted when the checkbox's `indeterminate` value changes.
         */
        _this.indeterminateChange = new EventEmitter();
        _this._checked = false;
        _this._disabled = false;
        _this._indeterminate = false;
        _this.uniqueId = "mc-checkbox-" + ++nextUniqueId;
        _this.currentAnimationClass = '';
        _this.currentCheckState = TransitionCheckState.Init;
        /**
         * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
         * \@docs-private
         */
        // tslint:disable-next-line:no-empty
        _this.onTouched = (/**
         * @return {?}
         */
        function () { });
        // tslint:disable-next-line:no-empty
        _this.controlValueAccessorChangeFn = (/**
         * @return {?}
         */
        function () { });
        _this.id = _this.uniqueId;
        return _this;
    }
    Object.defineProperty(McCheckbox.prototype, "inputId", {
        /** Returns the unique id for the visual hidden input. */
        get: /**
         * Returns the unique id for the visual hidden input.
         * @return {?}
         */
        function () {
            return (this.id || this.uniqueId) + "-input";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCheckbox.prototype, "required", {
        /** Whether the checkbox is required. */
        get: /**
         * Whether the checkbox is required.
         * @return {?}
         */
        function () {
            return this._required;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._required = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCheckbox.prototype, "checked", {
        /**
         * Whether the checkbox is checked.
         */
        get: /**
         * Whether the checkbox is checked.
         * @return {?}
         */
        function () {
            return this._checked;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this.checked) {
                this._checked = value;
                this._changeDetectorRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCheckbox.prototype, "disabled", {
        /**
         * Whether the checkbox is disabled. This fully overrides the implementation provided by
         * mixinDisabled, but the mixin is still required because mixinTabIndex requires it.
         */
        get: /**
         * Whether the checkbox is disabled. This fully overrides the implementation provided by
         * mixinDisabled, but the mixin is still required because mixinTabIndex requires it.
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this.disabled) {
                this._disabled = value;
                this._changeDetectorRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCheckbox.prototype, "indeterminate", {
        /**
         * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
         * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
         * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
         * set to false.
         */
        get: /**
         * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
         * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
         * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
         * set to false.
         * @return {?}
         */
        function () {
            return this._indeterminate;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var changed = value !== this._indeterminate;
            this._indeterminate = value;
            if (changed) {
                if (this._indeterminate) {
                    this.transitionCheckState(TransitionCheckState.Indeterminate);
                }
                else {
                    this.transitionCheckState(this.checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
                }
                this.indeterminateChange.emit(this._indeterminate);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McCheckbox.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._focusMonitor
            .monitor(this.inputElement.nativeElement)
            .subscribe((/**
         * @param {?} focusOrigin
         * @return {?}
         */
        function (focusOrigin) { return _this.onInputFocusChange(focusOrigin); }));
    };
    /**
     * @return {?}
     */
    McCheckbox.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._focusMonitor.stopMonitoring(this.inputElement.nativeElement);
    };
    /** Method being called whenever the label text changes. */
    /**
     * Method being called whenever the label text changes.
     * @return {?}
     */
    McCheckbox.prototype.onLabelTextChange = /**
     * Method being called whenever the label text changes.
     * @return {?}
     */
    function () {
        // This method is getting called whenever the label of the checkbox changes.
        // Since the checkbox uses the OnPush strategy we need to notify it about the change
        // that has been recognized by the cdkObserveContent directive.
        this._changeDetectorRef.markForCheck();
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} value
     * @return {?}
     */
    McCheckbox.prototype.writeValue = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.checked = !!value;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    McCheckbox.prototype.registerOnChange = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.controlValueAccessorChangeFn = fn;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    McCheckbox.prototype.registerOnTouched = 
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
    McCheckbox.prototype.setDisabledState = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @return {?}
     */
    McCheckbox.prototype.getAriaChecked = /**
     * @return {?}
     */
    function () {
        return this.checked ? 'true' : (this.indeterminate ? 'mixed' : 'false');
    };
    /** Toggles the `checked` state of the checkbox. */
    /**
     * Toggles the `checked` state of the checkbox.
     * @return {?}
     */
    McCheckbox.prototype.toggle = /**
     * Toggles the `checked` state of the checkbox.
     * @return {?}
     */
    function () {
        this.checked = !this.checked;
    };
    /**
     * Event handler for checkbox input element.
     * Toggles checked state if element is not disabled.
     * Do not toggle on (change) event since IE doesn't fire change event when
     *   indeterminate checkbox is clicked.
     * @param event Input click event
     */
    /**
     * Event handler for checkbox input element.
     * Toggles checked state if element is not disabled.
     * Do not toggle on (change) event since IE doesn't fire change event when
     *   indeterminate checkbox is clicked.
     * @param {?} event Input click event
     * @return {?}
     */
    McCheckbox.prototype.onInputClick = /**
     * Event handler for checkbox input element.
     * Toggles checked state if element is not disabled.
     * Do not toggle on (change) event since IE doesn't fire change event when
     *   indeterminate checkbox is clicked.
     * @param {?} event Input click event
     * @return {?}
     */
    function (event) {
        var _this = this;
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `checkbox` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
        // If resetIndeterminate is false, and the current state is indeterminate, do nothing on click
        if (!this.disabled && this._clickAction !== 'noop') {
            // When user manually click on the checkbox, `indeterminate` is set to false.
            if (this.indeterminate && this._clickAction !== 'check') {
                Promise.resolve().then((/**
                 * @return {?}
                 */
                function () {
                    _this._indeterminate = false;
                    _this.indeterminateChange.emit(_this._indeterminate);
                }));
            }
            this.toggle();
            this.transitionCheckState(this._checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
            // Emit our custom change event if the native input emitted one.
            // It is important to only emit it, if the native input triggered one, because
            // we don't want to trigger a change event, when the `checked` variable changes for example.
            this.emitChangeEvent();
        }
        else if (!this.disabled && this._clickAction === 'noop') {
            // Reset native input when clicked with noop. The native checkbox becomes checked after
            // click, reset it to be align with `checked` value of `mc-checkbox`.
            this.inputElement.nativeElement.checked = this.checked;
            this.inputElement.nativeElement.indeterminate = this.indeterminate;
        }
    };
    /** Focuses the checkbox. */
    /**
     * Focuses the checkbox.
     * @return {?}
     */
    McCheckbox.prototype.focus = /**
     * Focuses the checkbox.
     * @return {?}
     */
    function () {
        this._focusMonitor.focusVia(this.inputElement.nativeElement, 'keyboard');
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McCheckbox.prototype.onInteractionEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
    };
    /**
     * @private
     * @param {?} newState
     * @return {?}
     */
    McCheckbox.prototype.transitionCheckState = /**
     * @private
     * @param {?} newState
     * @return {?}
     */
    function (newState) {
        /** @type {?} */
        var oldState = this.currentCheckState;
        /** @type {?} */
        var element = this._elementRef.nativeElement;
        if (oldState === newState) {
            return;
        }
        if (this.currentAnimationClass.length > 0) {
            element.classList.remove(this.currentAnimationClass);
        }
        this.currentCheckState = newState;
        if (this.currentAnimationClass.length > 0) {
            element.classList.add(this.currentAnimationClass);
        }
    };
    /**
     * @private
     * @return {?}
     */
    McCheckbox.prototype.emitChangeEvent = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var event = new McCheckboxChange();
        event.source = this;
        event.checked = this.checked;
        this.controlValueAccessorChangeFn(this.checked);
        this.change.emit(event);
    };
    /** Function is called whenever the focus changes for the input element. */
    /**
     * Function is called whenever the focus changes for the input element.
     * @private
     * @param {?} focusOrigin
     * @return {?}
     */
    McCheckbox.prototype.onInputFocusChange = /**
     * Function is called whenever the focus changes for the input element.
     * @private
     * @param {?} focusOrigin
     * @return {?}
     */
    function (focusOrigin) {
        if (focusOrigin) {
            this.onTouched();
        }
    };
    McCheckbox.decorators = [
        { type: Component, args: [{
                    selector: 'mc-checkbox',
                    exportAs: 'mcCheckbox',
                    template: "<label [attr.for]=\"inputId\" class=\"mc-checkbox-layout\" #label>\n    <div class=\"mc-checkbox-inner-container\"\n         [class.mc-checkbox-inner-container-no-side-margin]=\"!checkboxLabel.textContent || !checkboxLabel.textContent.trim()\">\n        <input #input\n               type=\"checkbox\"\n               class=\"mc-checkbox-input cdk-visually-hidden\"\n               [id]=\"inputId\"\n               [required]=\"required\"\n               [checked]=\"checked\"\n               [attr.value]=\"value\"\n               [disabled]=\"disabled\"\n               [attr.name]=\"name\"\n               [tabIndex]=\"tabIndex\"\n               [indeterminate]=\"indeterminate\"\n               [attr.aria-label]=\"ariaLabel || null\"\n               [attr.aria-labelledby]=\"ariaLabelledby\"\n               [attr.aria-checked]=\"getAriaChecked()\"\n               (change)=\"onInteractionEvent($event)\"\n               (click)=\"onInputClick($event)\">\n        <div class=\"mc-checkbox-frame\">\n            <i class=\"mc-checkbox-checkmark mc mc-check_16\"></i>\n            <i class=\"mc-checkbox-mixedmark mc mc-minus_16\"></i>\n        </div>\n    </div>\n\n    <span class=\"mc-checkbox-label\" #checkboxLabel (cdkObserveContent)=\"onLabelTextChange()\">\n    <ng-content></ng-content>\n  </span>\n</label>\n",
                    host: {
                        class: 'mc-checkbox',
                        '[id]': 'id',
                        '[attr.id]': 'id',
                        '[class.mc-indeterminate]': 'indeterminate',
                        '[class.mc-checked]': 'checked',
                        '[class.mc-disabled]': 'disabled',
                        '[class.mc-checkbox-label-before]': 'labelPosition == "before"'
                    },
                    providers: [MC_CHECKBOX_CONTROL_VALUE_ACCESSOR],
                    inputs: ['color', 'tabIndex'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mc-checkbox-frame{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:3px;box-sizing:border-box;pointer-events:none;background-color:transparent;border-width:1px;border-style:solid;box-shadow:inset 0 0 1px 0 rgba(0,0,0,.2)}.mc-checkbox-checkmark,.mc-checkbox-mixedmark{display:none;position:absolute;top:-1px;left:-1px;right:0;bottom:0}.mc-checkbox{display:inline-block;cursor:pointer;-webkit-tap-highlight-color:transparent}.mc-checkbox.mc-checked .mc-checkbox-checkmark{display:block}.mc-checkbox.mc-checked .mc-checkbox-mixedmark,.mc-checkbox.mc-indeterminate .mc-checkbox-checkmark{display:none}.mc-checkbox.mc-indeterminate .mc-checkbox-mixedmark{display:block}.mc-checkbox.mc-disabled{cursor:default}.mc-checkbox.mc-disabled .mc-checkbox-frame{box-shadow:none}.mc-checkbox-layout{cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap;width:100%}.mc-checkbox-inner-container{display:inline-block;height:16px;line-height:0;margin-right:8px;order:0;position:relative;-ms-grid-row-align:center;align-self:center;white-space:nowrap;width:16px;flex-shrink:0}[dir=rtl] .mc-checkbox-inner-container{margin-left:8px;margin-right:auto}.mc-checkbox-inner-container-no-side-margin{margin-left:0;margin-right:0}.mc-checkbox-label-before .mc-checkbox-inner-container{order:1;margin-left:8px;margin-right:auto}[dir=rtl] .mc-checkbox-label-before .mc-checkbox-inner-container{margin-left:auto;margin-right:8px}"]
                }] }
    ];
    /** @nocollapse */
    McCheckbox.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: FocusMonitor },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_CHECKBOX_CLICK_ACTION,] }] }
    ]; };
    McCheckbox.propDecorators = {
        ariaLabel: [{ type: Input, args: ['aria-label',] }],
        ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }],
        id: [{ type: Input }],
        labelPosition: [{ type: Input }],
        name: [{ type: Input }],
        change: [{ type: Output }],
        indeterminateChange: [{ type: Output }],
        value: [{ type: Input }],
        inputElement: [{ type: ViewChild, args: ['input', { static: false },] }],
        required: [{ type: Input }],
        checked: [{ type: Input }],
        disabled: [{ type: Input }],
        indeterminate: [{ type: Input }]
    };
    return McCheckbox;
}(McCheckboxMixinBase));
export { McCheckbox };
if (false) {
    /**
     * Attached to the aria-label attribute of the host element. In most cases, arial-labelledby will
     * take precedence so this may be omitted.
     * @type {?}
     */
    McCheckbox.prototype.ariaLabel;
    /**
     * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
     * @type {?}
     */
    McCheckbox.prototype.ariaLabelledby;
    /**
     * A unique id for the checkbox input. If none is supplied, it will be auto-generated.
     * @type {?}
     */
    McCheckbox.prototype.id;
    /**
     * Whether the label should appear after or before the checkbox. Defaults to 'after'
     * @type {?}
     */
    McCheckbox.prototype.labelPosition;
    /**
     * Name value will be applied to the input element if present
     * @type {?}
     */
    McCheckbox.prototype.name;
    /**
     * Event emitted when the checkbox's `checked` value changes.
     * @type {?}
     */
    McCheckbox.prototype.change;
    /**
     * Event emitted when the checkbox's `indeterminate` value changes.
     * @type {?}
     */
    McCheckbox.prototype.indeterminateChange;
    /**
     * The value attribute of the native input element
     * @type {?}
     */
    McCheckbox.prototype.value;
    /**
     * The native `<input type="checkbox">` element
     * @type {?}
     */
    McCheckbox.prototype.inputElement;
    /**
     * @type {?}
     * @private
     */
    McCheckbox.prototype._required;
    /**
     * @type {?}
     * @private
     */
    McCheckbox.prototype._checked;
    /**
     * @type {?}
     * @private
     */
    McCheckbox.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    McCheckbox.prototype._indeterminate;
    /**
     * @type {?}
     * @private
     */
    McCheckbox.prototype.uniqueId;
    /**
     * @type {?}
     * @private
     */
    McCheckbox.prototype.currentAnimationClass;
    /**
     * @type {?}
     * @private
     */
    McCheckbox.prototype.currentCheckState;
    /**
     * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
     * \@docs-private
     * @type {?}
     */
    McCheckbox.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    McCheckbox.prototype.controlValueAccessorChangeFn;
    /**
     * @type {?}
     * @private
     */
    McCheckbox.prototype._changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    McCheckbox.prototype._focusMonitor;
    /**
     * @type {?}
     * @private
     */
    McCheckbox.prototype._clickAction;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvY2hlY2tib3gvIiwic291cmNlcyI6WyJjaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFDOUQsT0FBTyxFQUVILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBT0gsVUFBVSxFQUNWLGFBQWEsRUFDYixhQUFhLEVBQ2IsU0FBUyxFQUNaLE1BQU0seUJBQXlCLENBQUM7QUFFakMsT0FBTyxFQUFFLHdCQUF3QixFQUF5QixNQUFNLG1CQUFtQixDQUFDOzs7SUFJaEYsWUFBWSxHQUFHLENBQUM7Ozs7Ozs7QUFPcEIsTUFBTSxLQUFPLGtDQUFrQyxHQUFRO0lBQ25ELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLGNBQU0sT0FBQSxVQUFVLEVBQVYsQ0FBVSxFQUFDO0lBQ3pDLEtBQUssRUFBRSxJQUFJO0NBQ2Q7O0FBTUQsSUFBWSxvQkFBb0I7SUFDNUIsc0VBQXNFO0lBQ3RFLElBQUksR0FBQTtJQUNKLHVFQUF1RTtJQUN2RSxPQUFPLEdBQUE7SUFDUCx5RUFBeUU7SUFDekUsU0FBUyxHQUFBO0lBQ1QsNkVBQTZFO0lBQzdFLGFBQWEsR0FBQTtFQUNoQjs7Ozs7Ozs7O0FBR0Q7Ozs7SUFBQTtJQUtBLENBQUM7SUFBRCx1QkFBQztBQUFELENBQUMsQUFMRCxJQUtDOzs7Ozs7Ozs7O0lBSEcsa0NBQW1COzs7OztJQUVuQixt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QUFnRTs7Ozs7SUFpQmhFLCtCQUEyQjs7Ozs7SUFpQjNCLDhCQUFrQzs7Ozs7SUFrQmxDLCtCQUFtQzs7Ozs7SUE2Qm5DLG9DQUF3Qzs7Ozs7SUFFeEMsOEJBQTJEOzs7OztJQUUzRCwyQ0FBMkM7Ozs7O0lBRTNDLHVDQUE0RTs7Ozs7O0lBbUI1RSwrQkFBZ0M7Ozs7O0lBeUdoQyxrREFBc0U7Ozs7O0lBeEhsRSx3Q0FBNkM7Ozs7O0lBQzdDLG1DQUFtQzs7Ozs7SUFDbkMsa0NBQzJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNNb25pdG9yLCBGb2N1c09yaWdpbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICAgIENhbkNvbG9yLFxuICAgIENhbkNvbG9yQ3RvcixcbiAgICBDYW5EaXNhYmxlLFxuICAgIENhbkRpc2FibGVDdG9yLFxuICAgIEhhc1RhYkluZGV4LFxuICAgIEhhc1RhYkluZGV4Q3RvcixcbiAgICBtaXhpbkNvbG9yLFxuICAgIG1peGluRGlzYWJsZWQsXG4gICAgbWl4aW5UYWJJbmRleCxcbiAgICB0b0Jvb2xlYW5cbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5pbXBvcnQgeyBNQ19DSEVDS0JPWF9DTElDS19BQ1RJT04sIE1jQ2hlY2tib3hDbGlja0FjdGlvbiB9IGZyb20gJy4vY2hlY2tib3gtY29uZmlnJztcblxuXG4vLyBJbmNyZWFzaW5nIGludGVnZXIgZm9yIGdlbmVyYXRpbmcgdW5pcXVlIGlkcyBmb3IgY2hlY2tib3ggY29tcG9uZW50cy5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG4vKipcbiAqIFByb3ZpZGVyIEV4cHJlc3Npb24gdGhhdCBhbGxvd3MgbWMtY2hlY2tib3ggdG8gcmVnaXN0ZXIgYXMgYSBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAqIFRoaXMgYWxsb3dzIGl0IHRvIHN1cHBvcnQgWyhuZ01vZGVsKV0uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBNQ19DSEVDS0JPWF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWNDaGVja2JveCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgZGlmZmVyZW50IHN0YXRlcyB0aGF0IHJlcXVpcmUgY3VzdG9tIHRyYW5zaXRpb25zIGJldHdlZW4gdGhlbS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGVudW0gVHJhbnNpdGlvbkNoZWNrU3RhdGUge1xuICAgIC8qKiBUaGUgaW5pdGlhbCBzdGF0ZSBvZiB0aGUgY29tcG9uZW50IGJlZm9yZSBhbnkgdXNlciBpbnRlcmFjdGlvbi4gKi9cbiAgICBJbml0LFxuICAgIC8qKiBUaGUgc3RhdGUgcmVwcmVzZW50aW5nIHRoZSBjb21wb25lbnQgd2hlbiBpdCdzIGJlY29taW5nIGNoZWNrZWQuICovXG4gICAgQ2hlY2tlZCxcbiAgICAvKiogVGhlIHN0YXRlIHJlcHJlc2VudGluZyB0aGUgY29tcG9uZW50IHdoZW4gaXQncyBiZWNvbWluZyB1bmNoZWNrZWQuICovXG4gICAgVW5jaGVja2VkLFxuICAgIC8qKiBUaGUgc3RhdGUgcmVwcmVzZW50aW5nIHRoZSBjb21wb25lbnQgd2hlbiBpdCdzIGJlY29taW5nIGluZGV0ZXJtaW5hdGUuICovXG4gICAgSW5kZXRlcm1pbmF0ZVxufVxuXG4vKiogQ2hhbmdlIGV2ZW50IG9iamVjdCBlbWl0dGVkIGJ5IE1jQ2hlY2tib3guICovXG5leHBvcnQgY2xhc3MgTWNDaGVja2JveENoYW5nZSB7XG4gICAgLyoqIFRoZSBzb3VyY2UgTWNDaGVja2JveCBvZiB0aGUgZXZlbnQuICovXG4gICAgc291cmNlOiBNY0NoZWNrYm94O1xuICAgIC8qKiBUaGUgbmV3IGBjaGVja2VkYCB2YWx1ZSBvZiB0aGUgY2hlY2tib3guICovXG4gICAgY2hlY2tlZDogYm9vbGVhbjtcbn1cblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNY0NoZWNrYm94LlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjbGFzcyBNY0NoZWNrYm94QmFzZSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY0NoZWNrYm94TWl4aW5CYXNlOlxuICAgIEhhc1RhYkluZGV4Q3RvciAmXG4gICAgQ2FuQ29sb3JDdG9yICZcbiAgICBDYW5EaXNhYmxlQ3RvciAmXG4gICAgdHlwZW9mIE1jQ2hlY2tib3hCYXNlID0gbWl4aW5UYWJJbmRleChtaXhpbkNvbG9yKG1peGluRGlzYWJsZWQoTWNDaGVja2JveEJhc2UpKSk7XG5cblxuLyoqXG4gKiBBIG1vc2FpYyBjaGVja2JveCBjb21wb25lbnQuIFN1cHBvcnRzIGFsbCBvZiB0aGUgZnVuY3Rpb25hbGl0eSBvZiBhbiBIVE1MNSBjaGVja2JveCxcbiAqIGFuZCBleHBvc2VzIGEgc2ltaWxhciBBUEkuIEEgTWNDaGVja2JveCBjYW4gYmUgZWl0aGVyIGNoZWNrZWQsIHVuY2hlY2tlZCwgaW5kZXRlcm1pbmF0ZSwgb3JcbiAqIGRpc2FibGVkLiBOb3RlIHRoYXQgYWxsIGFkZGl0aW9uYWwgYWNjZXNzaWJpbGl0eSBhdHRyaWJ1dGVzIGFyZSB0YWtlbiBjYXJlIG9mIGJ5IHRoZSBjb21wb25lbnQsXG4gKiBzbyB0aGVyZSBpcyBubyBuZWVkIHRvIHByb3ZpZGUgdGhlbSB5b3Vyc2VsZi4gSG93ZXZlciwgaWYgeW91IHdhbnQgdG8gb21pdCBhIGxhYmVsIGFuZCBzdGlsbFxuICogaGF2ZSB0aGUgY2hlY2tib3ggYmUgYWNjZXNzaWJsZSwgeW91IG1heSBzdXBwbHkgYW4gW2FyaWEtbGFiZWxdIGlucHV0LlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLWNoZWNrYm94JyxcbiAgICBleHBvcnRBczogJ21jQ2hlY2tib3gnLFxuICAgIHRlbXBsYXRlVXJsOiAnY2hlY2tib3guaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2NoZWNrYm94LnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtY2hlY2tib3gnLFxuICAgICAgICAnW2lkXSc6ICdpZCcsXG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWluZGV0ZXJtaW5hdGVdJzogJ2luZGV0ZXJtaW5hdGUnLFxuICAgICAgICAnW2NsYXNzLm1jLWNoZWNrZWRdJzogJ2NoZWNrZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgICAgICdbY2xhc3MubWMtY2hlY2tib3gtbGFiZWwtYmVmb3JlXSc6ICdsYWJlbFBvc2l0aW9uID09IFwiYmVmb3JlXCInXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtNQ19DSEVDS0JPWF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBpbnB1dHM6IFsnY29sb3InLCAndGFiSW5kZXgnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1jQ2hlY2tib3ggZXh0ZW5kcyBNY0NoZWNrYm94TWl4aW5CYXNlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBDYW5Db2xvciwgQ2FuRGlzYWJsZSwgSGFzVGFiSW5kZXgge1xuXG4gICAgLyoqXG4gICAgICogQXR0YWNoZWQgdG8gdGhlIGFyaWEtbGFiZWwgYXR0cmlidXRlIG9mIHRoZSBob3N0IGVsZW1lbnQuIEluIG1vc3QgY2FzZXMsIGFyaWFsLWxhYmVsbGVkYnkgd2lsbFxuICAgICAqIHRha2UgcHJlY2VkZW5jZSBzbyB0aGlzIG1heSBiZSBvbWl0dGVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBVc2VycyBjYW4gc3BlY2lmeSB0aGUgYGFyaWEtbGFiZWxsZWRieWAgYXR0cmlidXRlIHdoaWNoIHdpbGwgYmUgZm9yd2FyZGVkIHRvIHRoZSBpbnB1dCBlbGVtZW50XG4gICAgICovXG4gICAgQElucHV0KCdhcmlhLWxhYmVsbGVkYnknKSBhcmlhTGFiZWxsZWRieTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgICAvKiogQSB1bmlxdWUgaWQgZm9yIHRoZSBjaGVja2JveCBpbnB1dC4gSWYgbm9uZSBpcyBzdXBwbGllZCwgaXQgd2lsbCBiZSBhdXRvLWdlbmVyYXRlZC4gKi9cbiAgICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGxhYmVsIHNob3VsZCBhcHBlYXIgYWZ0ZXIgb3IgYmVmb3JlIHRoZSBjaGVja2JveC4gRGVmYXVsdHMgdG8gJ2FmdGVyJyAqL1xuICAgIEBJbnB1dCgpIGxhYmVsUG9zaXRpb246ICdiZWZvcmUnIHwgJ2FmdGVyJyA9ICdhZnRlcic7XG5cbiAgICAvKiogTmFtZSB2YWx1ZSB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIGlucHV0IGVsZW1lbnQgaWYgcHJlc2VudCAqL1xuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgY2hlY2tib3gncyBgY2hlY2tlZGAgdmFsdWUgY2hhbmdlcy4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8TWNDaGVja2JveENoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1jQ2hlY2tib3hDaGFuZ2U+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBjaGVja2JveCdzIGBpbmRldGVybWluYXRlYCB2YWx1ZSBjaGFuZ2VzLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBpbmRldGVybWluYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICAvKiogVGhlIHZhbHVlIGF0dHJpYnV0ZSBvZiB0aGUgbmF0aXZlIGlucHV0IGVsZW1lbnQgKi9cbiAgICBASW5wdXQoKSB2YWx1ZTogc3RyaW5nO1xuXG4gICAgLyoqIFRoZSBuYXRpdmUgYDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIj5gIGVsZW1lbnQgKi9cbiAgICBAVmlld0NoaWxkKCdpbnB1dCcsIHsgc3RhdGljOiBmYWxzZSB9KSBpbnB1dEVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgICAvKiogUmV0dXJucyB0aGUgdW5pcXVlIGlkIGZvciB0aGUgdmlzdWFsIGhpZGRlbiBpbnB1dC4gKi9cbiAgICBnZXQgaW5wdXRJZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5pZCB8fCB0aGlzLnVuaXF1ZUlkfS1pbnB1dGA7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGNoZWNrYm94IGlzIHJlcXVpcmVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7XG4gICAgfVxuXG4gICAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlcXVpcmVkID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXF1aXJlZDogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGNoZWNrYm94IGlzIGNoZWNrZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgY2hlY2tlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoZWNrZWQ7XG4gICAgfVxuXG4gICAgc2V0IGNoZWNrZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgY2hlY2tib3ggaXMgZGlzYWJsZWQuIFRoaXMgZnVsbHkgb3ZlcnJpZGVzIHRoZSBpbXBsZW1lbnRhdGlvbiBwcm92aWRlZCBieVxuICAgICAqIG1peGluRGlzYWJsZWQsIGJ1dCB0aGUgbWl4aW4gaXMgc3RpbGwgcmVxdWlyZWQgYmVjYXVzZSBtaXhpblRhYkluZGV4IHJlcXVpcmVzIGl0LlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgY2hlY2tib3ggaXMgaW5kZXRlcm1pbmF0ZS4gVGhpcyBpcyBhbHNvIGtub3duIGFzIFwibWl4ZWRcIiBtb2RlIGFuZCBjYW4gYmUgdXNlZCB0b1xuICAgICAqIHJlcHJlc2VudCBhIGNoZWNrYm94IHdpdGggdGhyZWUgc3RhdGVzLCBlLmcuIGEgY2hlY2tib3ggdGhhdCByZXByZXNlbnRzIGEgbmVzdGVkIGxpc3Qgb2ZcbiAgICAgKiBjaGVja2FibGUgaXRlbXMuIE5vdGUgdGhhdCB3aGVuZXZlciBjaGVja2JveCBpcyBtYW51YWxseSBjbGlja2VkLCBpbmRldGVybWluYXRlIGlzIGltbWVkaWF0ZWx5XG4gICAgICogc2V0IHRvIGZhbHNlLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGluZGV0ZXJtaW5hdGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmRldGVybWluYXRlO1xuICAgIH1cblxuICAgIHNldCBpbmRldGVybWluYXRlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZWQgPSB2YWx1ZSAhPT0gdGhpcy5faW5kZXRlcm1pbmF0ZTtcbiAgICAgICAgdGhpcy5faW5kZXRlcm1pbmF0ZSA9IHZhbHVlO1xuXG4gICAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkNoZWNrU3RhdGUoVHJhbnNpdGlvbkNoZWNrU3RhdGUuSW5kZXRlcm1pbmF0ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkNoZWNrU3RhdGUoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tlZCA/IFRyYW5zaXRpb25DaGVja1N0YXRlLkNoZWNrZWQgOiBUcmFuc2l0aW9uQ2hlY2tTdGF0ZS5VbmNoZWNrZWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmluZGV0ZXJtaW5hdGVDaGFuZ2UuZW1pdCh0aGlzLl9pbmRldGVybWluYXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2luZGV0ZXJtaW5hdGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgdW5pcXVlSWQ6IHN0cmluZyA9IGBtYy1jaGVja2JveC0keysrbmV4dFVuaXF1ZUlkfWA7XG5cbiAgICBwcml2YXRlIGN1cnJlbnRBbmltYXRpb25DbGFzczogc3RyaW5nID0gJyc7XG5cbiAgICBwcml2YXRlIGN1cnJlbnRDaGVja1N0YXRlOiBUcmFuc2l0aW9uQ2hlY2tTdGF0ZSA9IFRyYW5zaXRpb25DaGVja1N0YXRlLkluaXQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIF9mb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcixcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQ19DSEVDS0JPWF9DTElDS19BQ1RJT04pXG4gICAgICAgIHByaXZhdGUgX2NsaWNrQWN0aW9uOiBNY0NoZWNrYm94Q2xpY2tBY3Rpb25cbiAgICApIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG5cbiAgICAgICAgdGhpcy5pZCA9IHRoaXMudW5pcXVlSWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gdGhlIGNoZWNrYm94IGlzIGJsdXJyZWQuIE5lZWRlZCB0byBwcm9wZXJseSBpbXBsZW1lbnQgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eVxuICAgIG9uVG91Y2hlZDogKCkgPT4gYW55ID0gKCkgPT4ge307XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvclxuICAgICAgICAgICAgLm1vbml0b3IodGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGZvY3VzT3JpZ2luKSA9PiB0aGlzLm9uSW5wdXRGb2N1c0NoYW5nZShmb2N1c09yaWdpbikpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgLyoqIE1ldGhvZCBiZWluZyBjYWxsZWQgd2hlbmV2ZXIgdGhlIGxhYmVsIHRleHQgY2hhbmdlcy4gKi9cbiAgICBvbkxhYmVsVGV4dENoYW5nZSgpIHtcbiAgICAgICAgLy8gVGhpcyBtZXRob2QgaXMgZ2V0dGluZyBjYWxsZWQgd2hlbmV2ZXIgdGhlIGxhYmVsIG9mIHRoZSBjaGVja2JveCBjaGFuZ2VzLlxuICAgICAgICAvLyBTaW5jZSB0aGUgY2hlY2tib3ggdXNlcyB0aGUgT25QdXNoIHN0cmF0ZWd5IHdlIG5lZWQgdG8gbm90aWZ5IGl0IGFib3V0IHRoZSBjaGFuZ2VcbiAgICAgICAgLy8gdGhhdCBoYXMgYmVlbiByZWNvZ25pemVkIGJ5IHRoZSBjZGtPYnNlcnZlQ29udGVudCBkaXJlY3RpdmUuXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9ICEhdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCkge1xuICAgICAgICB0aGlzLmNvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4gPSBmbjtcbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICBnZXRBcmlhQ2hlY2tlZCgpOiAndHJ1ZScgfCAnZmFsc2UnIHwgJ21peGVkJyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrZWQgPyAndHJ1ZScgOiAodGhpcy5pbmRldGVybWluYXRlID8gJ21peGVkJyA6ICdmYWxzZScpO1xuICAgIH1cblxuICAgIC8qKiBUb2dnbGVzIHRoZSBgY2hlY2tlZGAgc3RhdGUgb2YgdGhlIGNoZWNrYm94LiAqL1xuICAgIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGVyIGZvciBjaGVja2JveCBpbnB1dCBlbGVtZW50LlxuICAgICAqIFRvZ2dsZXMgY2hlY2tlZCBzdGF0ZSBpZiBlbGVtZW50IGlzIG5vdCBkaXNhYmxlZC5cbiAgICAgKiBEbyBub3QgdG9nZ2xlIG9uIChjaGFuZ2UpIGV2ZW50IHNpbmNlIElFIGRvZXNuJ3QgZmlyZSBjaGFuZ2UgZXZlbnQgd2hlblxuICAgICAqICAgaW5kZXRlcm1pbmF0ZSBjaGVja2JveCBpcyBjbGlja2VkLlxuICAgICAqIEBwYXJhbSBldmVudCBJbnB1dCBjbGljayBldmVudFxuICAgICAqL1xuICAgIG9uSW5wdXRDbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgLy8gV2UgaGF2ZSB0byBzdG9wIHByb3BhZ2F0aW9uIGZvciBjbGljayBldmVudHMgb24gdGhlIHZpc3VhbCBoaWRkZW4gaW5wdXQgZWxlbWVudC5cbiAgICAgICAgLy8gQnkgZGVmYXVsdCwgd2hlbiBhIHVzZXIgY2xpY2tzIG9uIGEgbGFiZWwgZWxlbWVudCwgYSBnZW5lcmF0ZWQgY2xpY2sgZXZlbnQgd2lsbCBiZVxuICAgICAgICAvLyBkaXNwYXRjaGVkIG9uIHRoZSBhc3NvY2lhdGVkIGlucHV0IGVsZW1lbnQuIFNpbmNlIHdlIGFyZSB1c2luZyBhIGxhYmVsIGVsZW1lbnQgYXMgb3VyXG4gICAgICAgIC8vIHJvb3QgY29udGFpbmVyLCB0aGUgY2xpY2sgZXZlbnQgb24gdGhlIGBjaGVja2JveGAgd2lsbCBiZSBleGVjdXRlZCB0d2ljZS5cbiAgICAgICAgLy8gVGhlIHJlYWwgY2xpY2sgZXZlbnQgd2lsbCBidWJibGUgdXAsIGFuZCB0aGUgZ2VuZXJhdGVkIGNsaWNrIGV2ZW50IGFsc28gdHJpZXMgdG8gYnViYmxlIHVwLlxuICAgICAgICAvLyBUaGlzIHdpbGwgbGVhZCB0byBtdWx0aXBsZSBjbGljayBldmVudHMuXG4gICAgICAgIC8vIFByZXZlbnRpbmcgYnViYmxpbmcgZm9yIHRoZSBzZWNvbmQgZXZlbnQgd2lsbCBzb2x2ZSB0aGF0IGlzc3VlLlxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAvLyBJZiByZXNldEluZGV0ZXJtaW5hdGUgaXMgZmFsc2UsIGFuZCB0aGUgY3VycmVudCBzdGF0ZSBpcyBpbmRldGVybWluYXRlLCBkbyBub3RoaW5nIG9uIGNsaWNrXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiB0aGlzLl9jbGlja0FjdGlvbiAhPT0gJ25vb3AnKSB7XG4gICAgICAgICAgICAvLyBXaGVuIHVzZXIgbWFudWFsbHkgY2xpY2sgb24gdGhlIGNoZWNrYm94LCBgaW5kZXRlcm1pbmF0ZWAgaXMgc2V0IHRvIGZhbHNlLlxuICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXRlcm1pbmF0ZSAmJiB0aGlzLl9jbGlja0FjdGlvbiAhPT0gJ2NoZWNrJykge1xuXG4gICAgICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRldGVybWluYXRlQ2hhbmdlLmVtaXQodGhpcy5faW5kZXRlcm1pbmF0ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgICAgICAgICB0aGlzLnRyYW5zaXRpb25DaGVja1N0YXRlKFxuICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrZWQgPyBUcmFuc2l0aW9uQ2hlY2tTdGF0ZS5DaGVja2VkIDogVHJhbnNpdGlvbkNoZWNrU3RhdGUuVW5jaGVja2VkKTtcblxuICAgICAgICAgICAgLy8gRW1pdCBvdXIgY3VzdG9tIGNoYW5nZSBldmVudCBpZiB0aGUgbmF0aXZlIGlucHV0IGVtaXR0ZWQgb25lLlxuICAgICAgICAgICAgLy8gSXQgaXMgaW1wb3J0YW50IHRvIG9ubHkgZW1pdCBpdCwgaWYgdGhlIG5hdGl2ZSBpbnB1dCB0cmlnZ2VyZWQgb25lLCBiZWNhdXNlXG4gICAgICAgICAgICAvLyB3ZSBkb24ndCB3YW50IHRvIHRyaWdnZXIgYSBjaGFuZ2UgZXZlbnQsIHdoZW4gdGhlIGBjaGVja2VkYCB2YXJpYWJsZSBjaGFuZ2VzIGZvciBleGFtcGxlLlxuICAgICAgICAgICAgdGhpcy5lbWl0Q2hhbmdlRXZlbnQoKTtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5kaXNhYmxlZCAmJiB0aGlzLl9jbGlja0FjdGlvbiA9PT0gJ25vb3AnKSB7XG4gICAgICAgICAgICAvLyBSZXNldCBuYXRpdmUgaW5wdXQgd2hlbiBjbGlja2VkIHdpdGggbm9vcC4gVGhlIG5hdGl2ZSBjaGVja2JveCBiZWNvbWVzIGNoZWNrZWQgYWZ0ZXJcbiAgICAgICAgICAgIC8vIGNsaWNrLCByZXNldCBpdCB0byBiZSBhbGlnbiB3aXRoIGBjaGVja2VkYCB2YWx1ZSBvZiBgbWMtY2hlY2tib3hgLlxuICAgICAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGVja2VkID0gdGhpcy5jaGVja2VkO1xuICAgICAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5pbmRldGVybWluYXRlID0gdGhpcy5pbmRldGVybWluYXRlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEZvY3VzZXMgdGhlIGNoZWNrYm94LiAqL1xuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9mb2N1c01vbml0b3IuZm9jdXNWaWEodGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2tleWJvYXJkJyk7XG4gICAgfVxuXG4gICAgb25JbnRlcmFjdGlvbkV2ZW50KGV2ZW50OiBFdmVudCkge1xuICAgICAgICAvLyBXZSBhbHdheXMgaGF2ZSB0byBzdG9wIHByb3BhZ2F0aW9uIG9uIHRoZSBjaGFuZ2UgZXZlbnQuXG4gICAgICAgIC8vIE90aGVyd2lzZSB0aGUgY2hhbmdlIGV2ZW50LCBmcm9tIHRoZSBpbnB1dCBlbGVtZW50LCB3aWxsIGJ1YmJsZSB1cCBhbmRcbiAgICAgICAgLy8gZW1pdCBpdHMgZXZlbnQgb2JqZWN0IHRvIHRoZSBgY2hhbmdlYCBvdXRwdXQuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcbiAgICBwcml2YXRlIGNvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm46ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgICBwcml2YXRlIHRyYW5zaXRpb25DaGVja1N0YXRlKG5ld1N0YXRlOiBUcmFuc2l0aW9uQ2hlY2tTdGF0ZSkge1xuICAgICAgICBjb25zdCBvbGRTdGF0ZSA9IHRoaXMuY3VycmVudENoZWNrU3RhdGU7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIGlmIChvbGRTdGF0ZSA9PT0gbmV3U3RhdGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jdXJyZW50QW5pbWF0aW9uQ2xhc3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY3VycmVudEFuaW1hdGlvbkNsYXNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3VycmVudENoZWNrU3RhdGUgPSBuZXdTdGF0ZTtcblxuICAgICAgICBpZiAodGhpcy5jdXJyZW50QW5pbWF0aW9uQ2xhc3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY3VycmVudEFuaW1hdGlvbkNsYXNzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZW1pdENoYW5nZUV2ZW50KCkge1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBNY0NoZWNrYm94Q2hhbmdlKCk7XG4gICAgICAgIGV2ZW50LnNvdXJjZSA9IHRoaXM7XG4gICAgICAgIGV2ZW50LmNoZWNrZWQgPSB0aGlzLmNoZWNrZWQ7XG5cbiAgICAgICAgdGhpcy5jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuKHRoaXMuY2hlY2tlZCk7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKiBGdW5jdGlvbiBpcyBjYWxsZWQgd2hlbmV2ZXIgdGhlIGZvY3VzIGNoYW5nZXMgZm9yIHRoZSBpbnB1dCBlbGVtZW50LiAqL1xuICAgIHByaXZhdGUgb25JbnB1dEZvY3VzQ2hhbmdlKGZvY3VzT3JpZ2luOiBGb2N1c09yaWdpbikge1xuICAgICAgICBpZiAoZm9jdXNPcmlnaW4pIHtcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=