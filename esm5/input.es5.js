/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { InjectionToken, Attribute, Directive, ElementRef, Inject, Input, Optional, Self, forwardRef, NgModule } from '@angular/core';
import { __decorate, __metadata, __param, __extends } from 'tslib';
import { FormGroupDirective, NgControl, NgForm, NgModel, NG_VALIDATORS, Validators, FormsModule } from '@angular/forms';
import { coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { END, C, V, X, A, DELETE, BACKSPACE, TAB, ENTER, ESCAPE, ZERO, NINE, NUMPAD_ZERO, NUMPAD_NINE, NUMPAD_MINUS, DASH, FF_MINUS, LEFT_ARROW, RIGHT_ARROW, HOME, UP_ARROW, DOWN_ARROW, F1, F12 } from '@ptsecurity/cdk/keycodes';
import { getSupportedInputTypes, Platform } from '@ptsecurity/cdk/platform';
import { ErrorStateMatcher, mixinErrorState, McCommonModule } from '@ptsecurity/mosaic/core';
import { McFormFieldControl, McFormFieldNumberControl } from '@ptsecurity/mosaic/form-field';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@ptsecurity/cdk/a11y';

function getMcInputUnsupportedTypeError(inputType) {
    return Error("Input type \"" + inputType + "\" isn't supported by mcInput.");
}

var MC_INPUT_VALUE_ACCESSOR = new InjectionToken('MC_INPUT_VALUE_ACCESSOR');

function sanitizeNumber(value) {
    return !isFinite(value) || isNaN(value)
        ? null
        : value;
}
function getPrecision(value) {
    var arr = value.toString().split('.');
    return arr.length === 1
        ? 1
        // tslint:disable-next-line:no-magic-numbers
        : Math.pow(10, arr[1].length);
}
function add(value1, value2) {
    var precision = Math.max(getPrecision(value1), getPrecision(value2));
    var res = (value1 * precision + value2 * precision) / precision;
    return sanitizeNumber(res);
}
var stepUp = function (value, max, min, step) {
    var res;
    if (value === null) {
        res = add(min, step);
        return res === null ? null : Math.min(res, max);
    }
    res = add(value, step);
    return res === null ? null : Math.max(Math.min(res, max), min);
};
var stepDown = function (value, max, min, step) {
    var res;
    if (value === null) {
        res = add(max, -step);
        return res === null ? null : Math.max(res, min);
    }
    res = add(value, -step);
    return res === null ? null : Math.min(Math.max(res, min), max);
};

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
var BIG_STEP = 10;
var SMALL_STEP = 1;
var nextUniqueId = 0;
var McInputBase = /** @class */ (function () {
    function McInputBase(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
    return McInputBase;
}());
var _McInputMixinBase = mixinErrorState(McInputBase);
var McNumberInput = /** @class */ (function () {
    function McNumberInput(_platform, _elementRef, _model, step, bigStep, min, max) {
        this._platform = _platform;
        this._elementRef = _elementRef;
        this._model = _model;
        /**
         * Implemented as part of McFormFieldNumberControl.
         * @docs-private
         */
        this.focused = false;
        /**
         * Implemented as part of McFormFieldNumberControl.
         * @docs-private
         */
        this.stateChanges = new Subject();
        this.step = this.isDigit(step) ? parseFloat(step) : SMALL_STEP;
        this.bigStep = this.isDigit(bigStep) ? parseFloat(bigStep) : BIG_STEP;
        this.min = this.isDigit(min) ? parseFloat(min) : -Infinity;
        this.max = this.isDigit(max) ? parseFloat(max) : Infinity;
        this._host = this._elementRef.nativeElement;
        var self = this;
        if ('valueAsNumber' in this._host) {
            Object.defineProperty(Object.getPrototypeOf(this._host), 'valueAsNumber', {
                // tslint:disable-next-line:no-reserved-keywords
                get: function () {
                    var res = parseFloat(self.normalizeSplitter(this.value));
                    return isNaN(res) ? null : res;
                }
            });
        }
    }
    McNumberInput_1 = McNumberInput;
    McNumberInput.prototype._focusChanged = function (isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    };
    McNumberInput.prototype.onKeyDown = function (event) {
        var _this = this;
        // tslint:disable-next-line:deprecation
        var keyCode = event.keyCode;
        var isCtrlA = function (e) { return e.keyCode === A && (e.ctrlKey || e.metaKey); };
        var isCtrlC = function (e) { return e.keyCode === C && (e.ctrlKey || e.metaKey); };
        var isCtrlV = function (e) { return e.keyCode === V && (e.ctrlKey || e.metaKey); };
        var isCtrlX = function (e) { return e.keyCode === X && (e.ctrlKey || e.metaKey); };
        var isFKey = function (e) { return e.keyCode >= F1 && e.keyCode <= F12; };
        var isNumber = function (e) { return (e.keyCode >= ZERO && e.keyCode <= NINE) ||
            (e.keyCode >= NUMPAD_ZERO && e.keyCode <= NUMPAD_NINE); };
        var minuses = [NUMPAD_MINUS, DASH, FF_MINUS];
        var serviceKeys = [DELETE, BACKSPACE, TAB, ESCAPE, ENTER];
        var arrows = [LEFT_ARROW, RIGHT_ARROW];
        var allowedKeys = [HOME, END].concat(arrows).concat(serviceKeys).concat(minuses);
        var isIEPeriod = function (e) { return e.key === '.' || e.key === 'Decimal'; };
        var isNotIEPeriod = function (e) { return e.key === '.' || e.key === ','; };
        // Decimal is for IE
        var isPeriod = function (e) { return _this._platform.EDGE || _this._platform.TRIDENT
            ? isIEPeriod(e)
            : isNotIEPeriod(e); };
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
            var step = event.shiftKey ? this.bigStep : this.step;
            if (keyCode === UP_ARROW) {
                this.stepUp(step);
            }
            if (keyCode === DOWN_ARROW) {
                this.stepDown(step);
            }
        }
    };
    McNumberInput.prototype.onPaste = function (event) {
        var value = event.clipboardData.getData('text');
        value = this.normalizeSplitter(value);
        if (!this.isDigit(value)) {
            event.preventDefault();
        }
    };
    McNumberInput.prototype.stepUp = function (step) {
        this._elementRef.nativeElement.focus();
        var res = stepUp(this._host.valueAsNumber, this.max, this.min, step);
        this._host.value = res === null ? '' : res.toString();
        this._model.update.emit(this._host.valueAsNumber);
    };
    McNumberInput.prototype.stepDown = function (step) {
        this._elementRef.nativeElement.focus();
        var res = stepDown(this._host.valueAsNumber, this.max, this.min, step);
        this._host.value = res === null ? '' : res.toString();
        this._model.update.emit(this._host.valueAsNumber);
    };
    McNumberInput.prototype.normalizeSplitter = function (value) {
        return value ? value.replace(/,/g, '.') : value;
    };
    McNumberInput.prototype.isDigit = function (value) {
        return this.isFloat(value) || this.isInt(value);
    };
    McNumberInput.prototype.isFloat = function (value) {
        return /^-?\d+\.\d+$/.test(value);
    };
    McNumberInput.prototype.isInt = function (value) {
        return /^-?\d+$/.test(value);
    };
    var McNumberInput_1;
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], McNumberInput.prototype, "bigStep", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], McNumberInput.prototype, "step", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], McNumberInput.prototype, "min", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], McNumberInput.prototype, "max", void 0);
    McNumberInput = McNumberInput_1 = __decorate([
        Directive({
            selector: "input[mcInput][type=\"number\"]",
            exportAs: 'mcNumericalInput',
            providers: [NgModel, { provide: McFormFieldNumberControl, useExisting: McNumberInput_1 }],
            host: {
                '(blur)': '_focusChanged(false)',
                '(focus)': '_focusChanged(true)',
                '(paste)': 'onPaste($event)',
                '(keydown)': 'onKeyDown($event)'
            }
        }),
        __param(3, Attribute('step')),
        __param(4, Attribute('big-step')),
        __param(5, Attribute('min')),
        __param(6, Attribute('max')),
        __metadata("design:paramtypes", [Platform,
            ElementRef,
            NgModel, String, String, String, String])
    ], McNumberInput);
    return McNumberInput;
}());
var McInput = /** @class */ (function (_super) {
    __extends(McInput, _super);
    function McInput(_elementRef, ngControl, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, inputValueAccessor) {
        var _this = _super.call(this, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) || this;
        _this._elementRef = _elementRef;
        _this.ngControl = ngControl;
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        _this.focused = false;
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        _this.stateChanges = new Subject();
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
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
        ].filter(function (t) { return getSupportedInputTypes().has(t); });
        // If no input value accessor was explicitly specified, use the element as the input value
        // accessor.
        _this._inputValueAccessor = inputValueAccessor || _this._elementRef.nativeElement;
        _this._previousNativeValue = _this.value;
        // Force setter to be called in case id was not specified.
        _this.id = _this.id;
        return _this;
    }
    McInput_1 = McInput;
    Object.defineProperty(McInput.prototype, "disabled", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: function () {
            if (this.ngControl && this.ngControl.disabled !== null) {
                return this.ngControl.disabled;
            }
            return this._disabled;
        },
        set: function (value) {
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
        get: function () {
            return this._id;
        },
        set: function (value) {
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
        get: function () {
            return this._required;
        },
        set: function (value) {
            this._required = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McInput.prototype, "type", {
        // tslint:disable no-reserved-keywords
        /** Input type of the element. */
        get: function () {
            return this._type;
        },
        set: function (value) {
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
        get: function () {
            return this._inputValueAccessor.value;
        },
        set: function (value) {
            if (value !== this.value) {
                this._inputValueAccessor.value = value;
                this.stateChanges.next();
            }
        },
        enumerable: true,
        configurable: true
    });
    McInput.prototype.ngOnChanges = function () {
        this.stateChanges.next();
    };
    McInput.prototype.ngOnDestroy = function () {
        this.stateChanges.complete();
    };
    McInput.prototype.ngDoCheck = function () {
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
    McInput.prototype.focus = function () {
        this._elementRef.nativeElement.focus();
    };
    /** Callback for the cases where the focused state of the input changes. */
    McInput.prototype._focusChanged = function (isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    };
    McInput.prototype._onInput = function () {
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
        get: function () {
            return !this._isNeverEmpty() && !this._elementRef.nativeElement.value && !this._isBadInput();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    McInput.prototype.onContainerClick = function () {
        this.focus();
    };
    /** Does some manual dirty checking on the native input `value` property. */
    McInput.prototype._dirtyCheckNativeValue = function () {
        var newValue = this.value;
        if (this._previousNativeValue !== newValue) {
            this._previousNativeValue = newValue;
            this.stateChanges.next();
        }
    };
    /** Make sure the input is a supported type. */
    McInput.prototype._validateType = function () {
        if (MC_INPUT_INVALID_TYPES.indexOf(this._type) > -1) {
            throw getMcInputUnsupportedTypeError(this._type);
        }
    };
    /** Checks whether the input type is one of the types that are never empty. */
    McInput.prototype._isNeverEmpty = function () {
        return this._neverEmptyInputTypes.indexOf(this._type) > -1;
    };
    /** Checks whether the input is invalid based on the native validation. */
    McInput.prototype._isBadInput = function () {
        // The `validity` property won't be present on platform-server.
        var validity = this._elementRef.nativeElement.validity;
        return validity && validity.badInput;
    };
    var McInput_1;
    __decorate([
        Input(),
        __metadata("design:type", ErrorStateMatcher)
    ], McInput.prototype, "errorStateMatcher", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McInput.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McInput.prototype, "id", null);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], McInput.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McInput.prototype, "required", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McInput.prototype, "type", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McInput.prototype, "value", null);
    McInput = McInput_1 = __decorate([
        Directive({
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
            providers: [{ provide: McFormFieldControl, useExisting: McInput_1 }]
        }),
        __param(1, Optional()), __param(1, Self()),
        __param(2, Optional()),
        __param(3, Optional()),
        __param(5, Optional()), __param(5, Self()), __param(5, Inject(MC_INPUT_VALUE_ACCESSOR)),
        __metadata("design:paramtypes", [ElementRef,
            NgControl,
            NgForm,
            FormGroupDirective,
            ErrorStateMatcher, Object])
    ], McInput);
    return McInput;
}(_McInputMixinBase));
var McInputMono = /** @class */ (function () {
    function McInputMono() {
    }
    McInputMono = __decorate([
        Directive({
            selector: 'input[mcInputMonospace]',
            exportAs: 'McInputMonospace',
            host: { class: 'mc-input_monospace' }
        })
    ], McInputMono);
    return McInputMono;
}());

var MIN_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return MinValidator; }),
    multi: true
};
/**
 * A directive which installs the {@link MinValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `min` attribute.
 *
 * @experimental
 */
var MinValidator = /** @class */ (function () {
    function MinValidator() {
    }
    MinValidator.prototype.ngOnChanges = function (changes) {
        if ('min' in changes) {
            this._createValidator();
            if (this._onChange) {
                this._onChange();
            }
        }
    };
    MinValidator.prototype.validate = function (c) { return this._validator(c); };
    MinValidator.prototype.registerOnValidatorChange = function (fn) { this._onChange = fn; };
    MinValidator.prototype._createValidator = function () { this._validator = Validators.min(parseInt(this.min, 10)); };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MinValidator.prototype, "min", void 0);
    MinValidator = __decorate([
        Directive({
            selector: '[min][formControlName],[min][formControl],[min][ngModel]',
            providers: [MIN_VALIDATOR],
            host: { '[attr.min]': 'min ? min : null' }
        })
    ], MinValidator);
    return MinValidator;
}());
var MAX_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return MaxValidator; }),
    multi: true
};
/**
 * A directive which installs the {@link MaxValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `min` attribute.
 *
 * @experimental
 */
var MaxValidator = /** @class */ (function () {
    function MaxValidator() {
    }
    MaxValidator.prototype.ngOnChanges = function (changes) {
        if ('max' in changes) {
            this._createValidator();
            if (this._onChange) {
                this._onChange();
            }
        }
    };
    MaxValidator.prototype.validate = function (c) { return this._validator(c); };
    MaxValidator.prototype.registerOnValidatorChange = function (fn) { this._onChange = fn; };
    MaxValidator.prototype._createValidator = function () { this._validator = Validators.max(parseInt(this.max, 10)); };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MaxValidator.prototype, "max", void 0);
    MaxValidator = __decorate([
        Directive({
            selector: '[max][formControlName],[max][formControl],[max][ngModel]',
            providers: [MAX_VALIDATOR],
            host: {
                '[attr.max]': 'max ? max : null'
            }
        })
    ], MaxValidator);
    return MaxValidator;
}());

var McInputModule = /** @class */ (function () {
    function McInputModule() {
    }
    McInputModule = __decorate([
        NgModule({
            imports: [CommonModule, A11yModule, McCommonModule, FormsModule],
            exports: [McInput, McNumberInput, McInputMono, MinValidator, MaxValidator],
            declarations: [McInput, McNumberInput, McInputMono, MinValidator, MaxValidator]
        })
    ], McInputModule);
    return McInputModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { MAX_VALIDATOR as ɵc22, MIN_VALIDATOR as ɵa22, MaxValidator as ɵd22, MinValidator as ɵb22, McInputModule, BIG_STEP, SMALL_STEP, McInputBase, _McInputMixinBase, McNumberInput, McInput, McInputMono, stepUp, stepDown, MC_INPUT_VALUE_ACCESSOR };
//# sourceMappingURL=input.es5.js.map
