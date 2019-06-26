/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { InjectionToken, Attribute, Directive, ElementRef, Inject, Input, Optional, Self, forwardRef, NgModule } from '@angular/core';
import { __extends } from 'tslib';
import { FormGroupDirective, NgControl, NgForm, NgModel, NG_VALIDATORS, Validators, FormsModule } from '@angular/forms';
import { coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { END, C, V, X, A, DELETE, BACKSPACE, TAB, ENTER, ESCAPE, ZERO, NINE, NUMPAD_ZERO, NUMPAD_NINE, NUMPAD_MINUS, DASH, FF_MINUS, LEFT_ARROW, RIGHT_ARROW, HOME, UP_ARROW, DOWN_ARROW, F1, F12 } from '@ptsecurity/cdk/keycodes';
import { getSupportedInputTypes, Platform } from '@ptsecurity/cdk/platform';
import { ErrorStateMatcher, mixinErrorState, McCommonModule } from '@ptsecurity/mosaic/core';
import { McFormFieldControl, McFormFieldNumberControl } from '@ptsecurity/mosaic/form-field';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@ptsecurity/cdk/a11y';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} inputType
 * @return {?}
 */
function getMcInputUnsupportedTypeError(inputType) {
    return Error("Input type \"" + inputType + "\" isn't supported by mcInput.");
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var MC_INPUT_VALUE_ACCESSOR = new InjectionToken('MC_INPUT_VALUE_ACCESSOR');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} value
 * @return {?}
 */
function sanitizeNumber(value) {
    return !isFinite(value) || isNaN(value)
        ? null
        : value;
}
/**
 * @param {?} value
 * @return {?}
 */
function getPrecision(value) {
    /** @type {?} */
    var arr = value.toString().split('.');
    return arr.length === 1
        ? 1
        // tslint:disable-next-line:no-magic-numbers
        : Math.pow(10, arr[1].length);
}
/**
 * @param {?} value1
 * @param {?} value2
 * @return {?}
 */
function add(value1, value2) {
    /** @type {?} */
    var precision = Math.max(getPrecision(value1), getPrecision(value2));
    /** @type {?} */
    var res = (value1 * precision + value2 * precision) / precision;
    return sanitizeNumber(res);
}
/** @type {?} */
var stepUp = (/**
 * @param {?} value
 * @param {?} max
 * @param {?} min
 * @param {?} step
 * @return {?}
 */
function (value, max, min, step) {
    /** @type {?} */
    var res;
    if (value === null) {
        res = add(min, step);
        return res === null ? null : Math.min(res, max);
    }
    res = add(value, step);
    return res === null ? null : Math.max(Math.min(res, max), min);
});
/** @type {?} */
var stepDown = (/**
 * @param {?} value
 * @param {?} max
 * @param {?} min
 * @param {?} step
 * @return {?}
 */
function (value, max, min, step) {
    /** @type {?} */
    var res;
    if (value === null) {
        res = add(max, -step);
        return res === null ? null : Math.max(res, min);
    }
    res = add(value, -step);
    return res === null ? null : Math.min(Math.max(res, min), max);
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var MC_INPUT_INVALID_TYPES = [
    'button',
    'checkbox',
    'file',
    'hidden',
    'image',
    'radio',
    'range',
    'reset',
    'submit'
];
/** @type {?} */
var BIG_STEP = 10;
/** @type {?} */
var SMALL_STEP = 1;
/** @type {?} */
var nextUniqueId = 0;
var McInputBase = /** @class */ (function () {
    function McInputBase(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
        this.defaultErrorStateMatcher = defaultErrorStateMatcher;
        this.parentForm = parentForm;
        this.parentFormGroup = parentFormGroup;
        this.ngControl = ngControl;
    }
    return McInputBase;
}());
/** @type {?} */
var _McInputMixinBase = mixinErrorState(McInputBase);
var McNumberInput = /** @class */ (function () {
    function McNumberInput(_platform, _elementRef, _model, step, bigStep, min, max) {
        this._platform = _platform;
        this._elementRef = _elementRef;
        this._model = _model;
        /**
         * Implemented as part of McFormFieldNumberControl.
         * \@docs-private
         */
        this.focused = false;
        /**
         * Implemented as part of McFormFieldNumberControl.
         * \@docs-private
         */
        this.stateChanges = new Subject();
        this.step = this.isDigit(step) ? parseFloat(step) : SMALL_STEP;
        this.bigStep = this.isDigit(bigStep) ? parseFloat(bigStep) : BIG_STEP;
        this.min = this.isDigit(min) ? parseFloat(min) : -Infinity;
        this.max = this.isDigit(max) ? parseFloat(max) : Infinity;
        this._host = this._elementRef.nativeElement;
        /** @type {?} */
        var self = this;
        if ('valueAsNumber' in this._host) {
            Object.defineProperty(Object.getPrototypeOf(this._host), 'valueAsNumber', {
                // tslint:disable-next-line:no-reserved-keywords
                get: 
                // tslint:disable-next-line:no-reserved-keywords
                /**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var res = parseFloat(self.normalizeSplitter(this.value));
                    return isNaN(res) ? null : res;
                }
            });
        }
    }
    /**
     * @param {?} isFocused
     * @return {?}
     */
    McNumberInput.prototype._focusChanged = /**
     * @param {?} isFocused
     * @return {?}
     */
    function (isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McNumberInput.prototype.onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        // tslint:disable-next-line:deprecation
        /** @type {?} */
        var keyCode = event.keyCode;
        /** @type {?} */
        var isCtrlA = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.keyCode === A && (e.ctrlKey || e.metaKey); });
        /** @type {?} */
        var isCtrlC = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.keyCode === C && (e.ctrlKey || e.metaKey); });
        /** @type {?} */
        var isCtrlV = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.keyCode === V && (e.ctrlKey || e.metaKey); });
        /** @type {?} */
        var isCtrlX = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.keyCode === X && (e.ctrlKey || e.metaKey); });
        /** @type {?} */
        var isFKey = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.keyCode >= F1 && e.keyCode <= F12; });
        /** @type {?} */
        var isNumber = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return (e.keyCode >= ZERO && e.keyCode <= NINE) ||
            (e.keyCode >= NUMPAD_ZERO && e.keyCode <= NUMPAD_NINE); });
        /** @type {?} */
        var minuses = [NUMPAD_MINUS, DASH, FF_MINUS];
        /** @type {?} */
        var serviceKeys = [DELETE, BACKSPACE, TAB, ESCAPE, ENTER];
        /** @type {?} */
        var arrows = [LEFT_ARROW, RIGHT_ARROW];
        /** @type {?} */
        var allowedKeys = [HOME, END].concat(arrows).concat(serviceKeys).concat(minuses);
        /** @type {?} */
        var isIEPeriod = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.key === '.' || e.key === 'Decimal'; });
        /** @type {?} */
        var isNotIEPeriod = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.key === '.' || e.key === ','; });
        // Decimal is for IE
        /** @type {?} */
        var isPeriod = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this._platform.EDGE || _this._platform.TRIDENT
            ? isIEPeriod(e)
            : isNotIEPeriod(e); });
        if (allowedKeys.indexOf(keyCode) !== -1 ||
            isCtrlA(event) ||
            isCtrlC(event) ||
            isCtrlV(event) ||
            isCtrlX(event) ||
            isFKey(event) ||
            isPeriod(event)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is not a number and stop the keypress
        if (event.shiftKey || !isNumber(event)) {
            event.preventDefault();
            // process steps
            /** @type {?} */
            var step = event.shiftKey ? this.bigStep : this.step;
            if (keyCode === UP_ARROW) {
                this.stepUp(step);
            }
            if (keyCode === DOWN_ARROW) {
                this.stepDown(step);
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McNumberInput.prototype.onPaste = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var value = event.clipboardData.getData('text');
        value = this.normalizeSplitter(value);
        if (!this.isDigit(value)) {
            event.preventDefault();
        }
    };
    /**
     * @param {?} step
     * @return {?}
     */
    McNumberInput.prototype.stepUp = /**
     * @param {?} step
     * @return {?}
     */
    function (step) {
        this._elementRef.nativeElement.focus();
        /** @type {?} */
        var res = stepUp(this._host.valueAsNumber, this.max, this.min, step);
        this._host.value = res === null ? '' : res.toString();
        this._model.update.emit(this._host.valueAsNumber);
    };
    /**
     * @param {?} step
     * @return {?}
     */
    McNumberInput.prototype.stepDown = /**
     * @param {?} step
     * @return {?}
     */
    function (step) {
        this._elementRef.nativeElement.focus();
        /** @type {?} */
        var res = stepDown(this._host.valueAsNumber, this.max, this.min, step);
        this._host.value = res === null ? '' : res.toString();
        this._model.update.emit(this._host.valueAsNumber);
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    McNumberInput.prototype.normalizeSplitter = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value ? value.replace(/,/g, '.') : value;
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    McNumberInput.prototype.isDigit = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.isFloat(value) || this.isInt(value);
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    McNumberInput.prototype.isFloat = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return /^-?\d+\.\d+$/.test(value);
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    McNumberInput.prototype.isInt = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return /^-?\d+$/.test(value);
    };
    McNumberInput.decorators = [
        { type: Directive, args: [{
                    selector: "input[mcInput][type=\"number\"]",
                    exportAs: 'mcNumericalInput',
                    providers: [NgModel, { provide: McFormFieldNumberControl, useExisting: McNumberInput }],
                    host: {
                        '(blur)': '_focusChanged(false)',
                        '(focus)': '_focusChanged(true)',
                        '(paste)': 'onPaste($event)',
                        '(keydown)': 'onKeyDown($event)'
                    }
                },] },
    ];
    /** @nocollapse */
    McNumberInput.ctorParameters = function () { return [
        { type: Platform },
        { type: ElementRef },
        { type: NgModel },
        { type: String, decorators: [{ type: Attribute, args: ['step',] }] },
        { type: String, decorators: [{ type: Attribute, args: ['big-step',] }] },
        { type: String, decorators: [{ type: Attribute, args: ['min',] }] },
        { type: String, decorators: [{ type: Attribute, args: ['max',] }] }
    ]; };
    McNumberInput.propDecorators = {
        bigStep: [{ type: Input }],
        step: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }]
    };
    return McNumberInput;
}());
var McInput = /** @class */ (function (_super) {
    __extends(McInput, _super);
    function McInput(_elementRef, ngControl, parentForm, parentFormGroup, defaultErrorStateMatcher, inputValueAccessor) {
        var _this = _super.call(this, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) || this;
        _this._elementRef = _elementRef;
        _this.ngControl = ngControl;
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         */
        _this.focused = false;
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         */
        _this.stateChanges = new Subject();
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         */
        _this.controlType = 'mc-input';
        _this._uid = "mc-input-" + nextUniqueId++;
        _this._disabled = false;
        _this._required = false;
        _this._type = 'text';
        _this._neverEmptyInputTypes = [
            'date',
            'datetime',
            'datetime-local',
            'month',
            'time',
            'week'
        ].filter((/**
         * @param {?} t
         * @return {?}
         */
        function (t) { return getSupportedInputTypes().has(t); }));
        // If no input value accessor was explicitly specified, use the element as the input value
        // accessor.
        _this._inputValueAccessor = inputValueAccessor || _this._elementRef.nativeElement;
        _this._previousNativeValue = _this.value;
        // Force setter to be called in case id was not specified.
        _this.id = _this.id;
        return _this;
    }
    Object.defineProperty(McInput.prototype, "disabled", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            if (this.ngControl && this.ngControl.disabled !== null) {
                return this.ngControl.disabled;
            }
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = coerceBooleanProperty(value);
            // Browsers may not fire the blur event if the input is disabled too quickly.
            // Reset from here to ensure that the element doesn't become stuck.
            if (this.focused) {
                this.focused = false;
                this.stateChanges.next();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McInput.prototype, "id", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            return this._id;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._id = value || this._uid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McInput.prototype, "required", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
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
            this._required = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McInput.prototype, "type", {
        // tslint:disable no-reserved-keywords
        /** Input type of the element. */
        get: 
        // tslint:disable no-reserved-keywords
        /**
         * Input type of the element.
         * @return {?}
         */
        function () {
            return this._type;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._type = value || 'text';
            this._validateType();
            // When using Angular inputs, developers are no longer able to set the properties on the native
            // input element. To ensure that bindings for `type` work, we need to sync the setter
            // with the native property. Textarea elements don't support the type property or attribute.
            if (getSupportedInputTypes().has(this._type)) {
                this._elementRef.nativeElement.type = this._type;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McInput.prototype, "value", {
        // tslint:enable no-reserved-keywords
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: 
        // tslint:enable no-reserved-keywords
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            return this._inputValueAccessor.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this.value) {
                this._inputValueAccessor.value = value;
                this.stateChanges.next();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McInput.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.stateChanges.next();
    };
    /**
     * @return {?}
     */
    McInput.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stateChanges.complete();
    };
    /**
     * @return {?}
     */
    McInput.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
        // We need to dirty-check the native element's value, because there are some cases where
        // we won't be notified when it changes (e.g. the consumer isn't using forms or they're
        // updating the value using `emitEvent: false`).
        this._dirtyCheckNativeValue();
    };
    /** Focuses the input. */
    /**
     * Focuses the input.
     * @return {?}
     */
    McInput.prototype.focus = /**
     * Focuses the input.
     * @return {?}
     */
    function () {
        this._elementRef.nativeElement.focus();
    };
    /** Callback for the cases where the focused state of the input changes. */
    /**
     * Callback for the cases where the focused state of the input changes.
     * @param {?} isFocused
     * @return {?}
     */
    McInput.prototype._focusChanged = /**
     * Callback for the cases where the focused state of the input changes.
     * @param {?} isFocused
     * @return {?}
     */
    function (isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    };
    /**
     * @return {?}
     */
    McInput.prototype._onInput = /**
     * @return {?}
     */
    function () {
        // This is a noop function and is used to let Angular know whenever the value changes.
        // Angular will run a new change detection each time the `input` event has been dispatched.
        // It's necessary that Angular recognizes the value change, because when floatingLabel
        // is set to false and Angular forms aren't used, the placeholder won't recognize the
        // value changes and will not disappear.
        // Listening to the input event wouldn't be necessary when the input is using the
        // FormsModule or ReactiveFormsModule, because Angular forms also listens to input events.
    };
    Object.defineProperty(McInput.prototype, "empty", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            return !this._isNeverEmpty() && !this._elementRef.nativeElement.value && !this._isBadInput();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    McInput.prototype.onContainerClick = /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    function () {
        this.focus();
    };
    /** Does some manual dirty checking on the native input `value` property. */
    /**
     * Does some manual dirty checking on the native input `value` property.
     * @protected
     * @return {?}
     */
    McInput.prototype._dirtyCheckNativeValue = /**
     * Does some manual dirty checking on the native input `value` property.
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var newValue = this.value;
        if (this._previousNativeValue !== newValue) {
            this._previousNativeValue = newValue;
            this.stateChanges.next();
        }
    };
    /** Make sure the input is a supported type. */
    /**
     * Make sure the input is a supported type.
     * @protected
     * @return {?}
     */
    McInput.prototype._validateType = /**
     * Make sure the input is a supported type.
     * @protected
     * @return {?}
     */
    function () {
        if (MC_INPUT_INVALID_TYPES.indexOf(this._type) > -1) {
            throw getMcInputUnsupportedTypeError(this._type);
        }
    };
    /** Checks whether the input type is one of the types that are never empty. */
    /**
     * Checks whether the input type is one of the types that are never empty.
     * @protected
     * @return {?}
     */
    McInput.prototype._isNeverEmpty = /**
     * Checks whether the input type is one of the types that are never empty.
     * @protected
     * @return {?}
     */
    function () {
        return this._neverEmptyInputTypes.indexOf(this._type) > -1;
    };
    /** Checks whether the input is invalid based on the native validation. */
    /**
     * Checks whether the input is invalid based on the native validation.
     * @protected
     * @return {?}
     */
    McInput.prototype._isBadInput = /**
     * Checks whether the input is invalid based on the native validation.
     * @protected
     * @return {?}
     */
    function () {
        // The `validity` property won't be present on platform-server.
        /** @type {?} */
        var validity = ((/** @type {?} */ (this._elementRef.nativeElement))).validity;
        return validity && validity.badInput;
    };
    McInput.decorators = [
        { type: Directive, args: [{
                    selector: "input[mcInput]",
                    exportAs: 'mcInput',
                    host: {
                        class: 'mc-input',
                        // Native input properties that are overwritten by Angular inputs need to be synced with
                        // the native input element. Otherwise property bindings for those don't work.
                        '[attr.id]': 'id',
                        '[attr.placeholder]': 'placeholder',
                        '[disabled]': 'disabled',
                        '[required]': 'required',
                        '(blur)': '_focusChanged(false)',
                        '(focus)': '_focusChanged(true)',
                        '(input)': '_onInput()'
                    },
                    providers: [{ provide: McFormFieldControl, useExisting: McInput }]
                },] },
    ];
    /** @nocollapse */
    McInput.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgControl, decorators: [{ type: Optional }, { type: Self }] },
        { type: NgForm, decorators: [{ type: Optional }] },
        { type: FormGroupDirective, decorators: [{ type: Optional }] },
        { type: ErrorStateMatcher },
        { type: undefined, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [MC_INPUT_VALUE_ACCESSOR,] }] }
    ]; };
    McInput.propDecorators = {
        errorStateMatcher: [{ type: Input }],
        disabled: [{ type: Input }],
        id: [{ type: Input }],
        placeholder: [{ type: Input }],
        required: [{ type: Input }],
        type: [{ type: Input }],
        value: [{ type: Input }]
    };
    return McInput;
}(_McInputMixinBase));
var McInputMono = /** @class */ (function () {
    function McInputMono() {
    }
    McInputMono.decorators = [
        { type: Directive, args: [{
                    selector: 'input[mcInputMonospace]',
                    exportAs: 'McInputMonospace',
                    host: { class: 'mc-input_monospace' }
                },] },
    ];
    return McInputMono;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var MIN_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return MinValidator; })),
    multi: true
};
/**
 * A directive which installs the {\@link MinValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `min` attribute.
 *
 * \@experimental
 */
var MinValidator = /** @class */ (function () {
    function MinValidator() {
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    MinValidator.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if ('min' in changes) {
            this._createValidator();
            if (this._onChange) {
                this._onChange();
            }
        }
    };
    /**
     * @param {?} c
     * @return {?}
     */
    MinValidator.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) { return this._validator(c); };
    /**
     * @param {?} fn
     * @return {?}
     */
    MinValidator.prototype.registerOnValidatorChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onChange = fn; };
    /**
     * @private
     * @return {?}
     */
    MinValidator.prototype._createValidator = /**
     * @private
     * @return {?}
     */
    function () { this._validator = Validators.min(parseInt(this.min, 10)); };
    MinValidator.decorators = [
        { type: Directive, args: [{
                    selector: '[min][formControlName],[min][formControl],[min][ngModel]',
                    providers: [MIN_VALIDATOR],
                    host: { '[attr.min]': 'min ? min : null' }
                },] },
    ];
    MinValidator.propDecorators = {
        min: [{ type: Input }]
    };
    return MinValidator;
}());
/** @type {?} */
var MAX_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return MaxValidator; })),
    multi: true
};
/**
 * A directive which installs the {\@link MaxValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `min` attribute.
 *
 * \@experimental
 */
var MaxValidator = /** @class */ (function () {
    function MaxValidator() {
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    MaxValidator.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if ('max' in changes) {
            this._createValidator();
            if (this._onChange) {
                this._onChange();
            }
        }
    };
    /**
     * @param {?} c
     * @return {?}
     */
    MaxValidator.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) { return this._validator(c); };
    /**
     * @param {?} fn
     * @return {?}
     */
    MaxValidator.prototype.registerOnValidatorChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onChange = fn; };
    /**
     * @private
     * @return {?}
     */
    MaxValidator.prototype._createValidator = /**
     * @private
     * @return {?}
     */
    function () { this._validator = Validators.max(parseInt(this.max, 10)); };
    MaxValidator.decorators = [
        { type: Directive, args: [{
                    selector: '[max][formControlName],[max][formControl],[max][ngModel]',
                    providers: [MAX_VALIDATOR],
                    host: {
                        '[attr.max]': 'max ? max : null'
                    }
                },] },
    ];
    MaxValidator.propDecorators = {
        max: [{ type: Input }]
    };
    return MaxValidator;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McInputModule = /** @class */ (function () {
    function McInputModule() {
    }
    McInputModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, A11yModule, McCommonModule, FormsModule],
                    exports: [McInput, McNumberInput, McInputMono, MinValidator, MaxValidator],
                    declarations: [McInput, McNumberInput, McInputMono, MinValidator, MaxValidator]
                },] },
    ];
    return McInputModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McInputModule, BIG_STEP, SMALL_STEP, McInputBase, _McInputMixinBase, McNumberInput, McInput, McInputMono, stepUp, stepDown, MC_INPUT_VALUE_ACCESSOR, MAX_VALIDATOR as ɵc24, MIN_VALIDATOR as ɵa24, MaxValidator as ɵd24, MinValidator as ɵb24 };
//# sourceMappingURL=input.es5.js.map
