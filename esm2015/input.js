/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { InjectionToken, Attribute, Directive, ElementRef, Inject, Input, Optional, Self, forwardRef, NgModule } from '@angular/core';
import { __decorate, __metadata, __param } from 'tslib';
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
    return Error(`Input type "${inputType}" isn't supported by mcInput.`);
}

const MC_INPUT_VALUE_ACCESSOR = new InjectionToken('MC_INPUT_VALUE_ACCESSOR');

function sanitizeNumber(value) {
    return !isFinite(value) || isNaN(value)
        ? null
        : value;
}
function getPrecision(value) {
    const arr = value.toString().split('.');
    return arr.length === 1
        ? 1
        // tslint:disable-next-line:no-magic-numbers
        : Math.pow(10, arr[1].length);
}
function add(value1, value2) {
    const precision = Math.max(getPrecision(value1), getPrecision(value2));
    const res = (value1 * precision + value2 * precision) / precision;
    return sanitizeNumber(res);
}
const stepUp = (value, max, min, step) => {
    let res;
    if (value === null) {
        res = add(min, step);
        return res === null ? null : Math.min(res, max);
    }
    res = add(value, step);
    return res === null ? null : Math.max(Math.min(res, max), min);
};
const stepDown = (value, max, min, step) => {
    let res;
    if (value === null) {
        res = add(max, -step);
        return res === null ? null : Math.max(res, min);
    }
    res = add(value, -step);
    return res === null ? null : Math.min(Math.max(res, min), max);
};

var McNumberInput_1, McInput_1;
const MC_INPUT_INVALID_TYPES = [
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
const BIG_STEP = 10;
const SMALL_STEP = 1;
let nextUniqueId = 0;
class McInputBase {
    constructor(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
}
const _McInputMixinBase = mixinErrorState(McInputBase);
let McNumberInput = McNumberInput_1 = class McNumberInput {
    constructor(_platform, _elementRef, _model, step, bigStep, min, max) {
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
        const self = this;
        if ('valueAsNumber' in this._host) {
            Object.defineProperty(Object.getPrototypeOf(this._host), 'valueAsNumber', {
                // tslint:disable-next-line:no-reserved-keywords
                get() {
                    const res = parseFloat(self.normalizeSplitter(this.value));
                    return isNaN(res) ? null : res;
                }
            });
        }
    }
    _focusChanged(isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    }
    onKeyDown(event) {
        // tslint:disable-next-line:deprecation
        const keyCode = event.keyCode;
        const isCtrlA = (e) => e.keyCode === A && (e.ctrlKey || e.metaKey);
        const isCtrlC = (e) => e.keyCode === C && (e.ctrlKey || e.metaKey);
        const isCtrlV = (e) => e.keyCode === V && (e.ctrlKey || e.metaKey);
        const isCtrlX = (e) => e.keyCode === X && (e.ctrlKey || e.metaKey);
        const isFKey = (e) => e.keyCode >= F1 && e.keyCode <= F12;
        const isNumber = (e) => (e.keyCode >= ZERO && e.keyCode <= NINE) ||
            (e.keyCode >= NUMPAD_ZERO && e.keyCode <= NUMPAD_NINE);
        const minuses = [NUMPAD_MINUS, DASH, FF_MINUS];
        const serviceKeys = [DELETE, BACKSPACE, TAB, ESCAPE, ENTER];
        const arrows = [LEFT_ARROW, RIGHT_ARROW];
        const allowedKeys = [HOME, END].concat(arrows).concat(serviceKeys).concat(minuses);
        const isIEPeriod = (e) => e.key === '.' || e.key === 'Decimal';
        const isNotIEPeriod = (e) => e.key === '.' || e.key === ',';
        // Decimal is for IE
        const isPeriod = (e) => this._platform.EDGE || this._platform.TRIDENT
            ? isIEPeriod(e)
            : isNotIEPeriod(e);
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
            const step = event.shiftKey ? this.bigStep : this.step;
            if (keyCode === UP_ARROW) {
                this.stepUp(step);
            }
            if (keyCode === DOWN_ARROW) {
                this.stepDown(step);
            }
        }
    }
    onPaste(event) {
        let value = event.clipboardData.getData('text');
        value = this.normalizeSplitter(value);
        if (!this.isDigit(value)) {
            event.preventDefault();
        }
    }
    stepUp(step) {
        this._elementRef.nativeElement.focus();
        const res = stepUp(this._host.valueAsNumber, this.max, this.min, step);
        this._host.value = res === null ? '' : res.toString();
        this._model.update.emit(this._host.valueAsNumber);
    }
    stepDown(step) {
        this._elementRef.nativeElement.focus();
        const res = stepDown(this._host.valueAsNumber, this.max, this.min, step);
        this._host.value = res === null ? '' : res.toString();
        this._model.update.emit(this._host.valueAsNumber);
    }
    normalizeSplitter(value) {
        return value ? value.replace(/,/g, '.') : value;
    }
    isDigit(value) {
        return this.isFloat(value) || this.isInt(value);
    }
    isFloat(value) {
        return /^-?\d+\.\d+$/.test(value);
    }
    isInt(value) {
        return /^-?\d+$/.test(value);
    }
};
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
        selector: `input[mcInput][type="number"]`,
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
let McInput = McInput_1 = class McInput extends _McInputMixinBase {
    constructor(_elementRef, ngControl, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, inputValueAccessor) {
        super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
        this._elementRef = _elementRef;
        this.ngControl = ngControl;
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        this.focused = false;
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        this.stateChanges = new Subject();
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        this.controlType = 'mc-input';
        this._uid = `mc-input-${nextUniqueId++}`;
        this._disabled = false;
        this._required = false;
        this._type = 'text';
        this._neverEmptyInputTypes = [
            'date',
            'datetime',
            'datetime-local',
            'month',
            'time',
            'week'
        ].filter((t) => getSupportedInputTypes().has(t));
        // If no input value accessor was explicitly specified, use the element as the input value
        // accessor.
        this._inputValueAccessor = inputValueAccessor || this._elementRef.nativeElement;
        this._previousNativeValue = this.value;
        // Force setter to be called in case id was not specified.
        this.id = this.id;
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get disabled() {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        // Browsers may not fire the blur event if the input is disabled too quickly.
        // Reset from here to ensure that the element doesn't become stuck.
        if (this.focused) {
            this.focused = false;
            this.stateChanges.next();
        }
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value || this._uid;
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
    }
    // tslint:disable no-reserved-keywords
    /** Input type of the element. */
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value || 'text';
        this._validateType();
        // When using Angular inputs, developers are no longer able to set the properties on the native
        // input element. To ensure that bindings for `type` work, we need to sync the setter
        // with the native property. Textarea elements don't support the type property or attribute.
        if (getSupportedInputTypes().has(this._type)) {
            this._elementRef.nativeElement.type = this._type;
        }
    }
    // tslint:enable no-reserved-keywords
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get value() {
        return this._inputValueAccessor.value;
    }
    set value(value) {
        if (value !== this.value) {
            this._inputValueAccessor.value = value;
            this.stateChanges.next();
        }
    }
    ngOnChanges() {
        this.stateChanges.next();
    }
    ngOnDestroy() {
        this.stateChanges.complete();
    }
    ngDoCheck() {
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
    }
    /** Focuses the input. */
    focus() {
        this._elementRef.nativeElement.focus();
    }
    /** Callback for the cases where the focused state of the input changes. */
    _focusChanged(isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    }
    _onInput() {
        // This is a noop function and is used to let Angular know whenever the value changes.
        // Angular will run a new change detection each time the `input` event has been dispatched.
        // It's necessary that Angular recognizes the value change, because when floatingLabel
        // is set to false and Angular forms aren't used, the placeholder won't recognize the
        // value changes and will not disappear.
        // Listening to the input event wouldn't be necessary when the input is using the
        // FormsModule or ReactiveFormsModule, because Angular forms also listens to input events.
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get empty() {
        return !this._isNeverEmpty() && !this._elementRef.nativeElement.value && !this._isBadInput();
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    onContainerClick() {
        this.focus();
    }
    /** Does some manual dirty checking on the native input `value` property. */
    _dirtyCheckNativeValue() {
        const newValue = this.value;
        if (this._previousNativeValue !== newValue) {
            this._previousNativeValue = newValue;
            this.stateChanges.next();
        }
    }
    /** Make sure the input is a supported type. */
    _validateType() {
        if (MC_INPUT_INVALID_TYPES.indexOf(this._type) > -1) {
            throw getMcInputUnsupportedTypeError(this._type);
        }
    }
    /** Checks whether the input type is one of the types that are never empty. */
    _isNeverEmpty() {
        return this._neverEmptyInputTypes.indexOf(this._type) > -1;
    }
    /** Checks whether the input is invalid based on the native validation. */
    _isBadInput() {
        // The `validity` property won't be present on platform-server.
        const validity = this._elementRef.nativeElement.validity;
        return validity && validity.badInput;
    }
};
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
        selector: `input[mcInput]`,
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
let McInputMono = class McInputMono {
};
McInputMono = __decorate([
    Directive({
        selector: 'input[mcInputMonospace]',
        exportAs: 'McInputMonospace',
        host: { class: 'mc-input_monospace' }
    })
], McInputMono);

const MIN_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MinValidator),
    multi: true
};
/**
 * A directive which installs the {@link MinValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `min` attribute.
 *
 * @experimental
 */
let MinValidator = class MinValidator {
    ngOnChanges(changes) {
        if ('min' in changes) {
            this._createValidator();
            if (this._onChange) {
                this._onChange();
            }
        }
    }
    validate(c) { return this._validator(c); }
    registerOnValidatorChange(fn) { this._onChange = fn; }
    _createValidator() { this._validator = Validators.min(parseInt(this.min, 10)); }
};
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
const MAX_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MaxValidator),
    multi: true
};
/**
 * A directive which installs the {@link MaxValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `min` attribute.
 *
 * @experimental
 */
let MaxValidator = class MaxValidator {
    ngOnChanges(changes) {
        if ('max' in changes) {
            this._createValidator();
            if (this._onChange) {
                this._onChange();
            }
        }
    }
    validate(c) { return this._validator(c); }
    registerOnValidatorChange(fn) { this._onChange = fn; }
    _createValidator() { this._validator = Validators.max(parseInt(this.max, 10)); }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], MaxValidator.prototype, "max", void 0);
MaxValidator = __decorate([
    Directive({
        selector: '[max][formControlName],[max][formControl],[max][ngModel]',
        providers: [MAX_VALIDATOR],
        host: { '[attr.max]': 'max ? max : null' }
    })
], MaxValidator);

let McInputModule = class McInputModule {
};
McInputModule = __decorate([
    NgModule({
        imports: [CommonModule, A11yModule, McCommonModule, FormsModule],
        exports: [McInput, McNumberInput, McInputMono, MinValidator, MaxValidator],
        declarations: [McInput, McNumberInput, McInputMono, MinValidator, MaxValidator]
    })
], McInputModule);

/**
 * Generated bundle index. Do not edit.
 */

export { MAX_VALIDATOR as ɵd18, MIN_VALIDATOR as ɵb18, MaxValidator as ɵe18, MinValidator as ɵc18, MC_INPUT_VALUE_ACCESSOR as ɵa18, McInputModule, BIG_STEP, SMALL_STEP, McInputBase, _McInputMixinBase, McNumberInput, McInput, McInputMono, stepUp, stepDown };
//# sourceMappingURL=input.js.map
