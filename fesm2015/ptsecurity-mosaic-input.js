import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Directive, ElementRef, Optional, Self, Attribute, Input, InjectionToken, Inject, forwardRef, NgModule } from '@angular/core';
import { NgControl, NG_VALIDATORS, NgModel, FormControlName, NgForm, FormGroupDirective, Validators, FormsModule } from '@angular/forms';
import { mixinErrorState, setMosaicValidation, MC_VALIDATION, ErrorStateMatcher, McCommonModule } from '@ptsecurity/mosaic/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { getSupportedInputTypes } from '@angular/cdk/platform';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { Subject } from 'rxjs';
import { A, C, V, X, Z, F1, F12, ZERO, NINE, NUMPAD_ZERO, NUMPAD_NINE, NUMPAD_MINUS, DASH, FF_MINUS, DELETE, BACKSPACE, TAB, ESCAPE, ENTER, LEFT_ARROW, RIGHT_ARROW, HOME, END, UP_ARROW, DOWN_ARROW } from '@ptsecurity/cdk/keycodes';

function getMcInputUnsupportedTypeError(inputType) {
    return Error(`Input type "${inputType}" isn't supported by mcInput.`);
}

const BIG_STEP = 10;
const SMALL_STEP = 1;
function normalizeSplitter(value) {
    return value ? value.replace(/,/g, '.') : value;
}
function isFloat(value) {
    return /^-?\d+\.\d+$/.test(value);
}
function isInt(value) {
    return /^-?\d+$/.test(value);
}
function isDigit(value) {
    return isFloat(value) || isInt(value);
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
    return (value1 * precision + value2 * precision) / precision;
}
class McNumberInput {
    constructor(elementRef, ngControl, step, bigStep, min, max) {
        this.elementRef = elementRef;
        this.ngControl = ngControl;
        this.focused = false;
        this.stateChanges = new Subject();
        this.step = isDigit(step) ? parseFloat(step) : SMALL_STEP;
        this.bigStep = isDigit(bigStep) ? parseFloat(bigStep) : BIG_STEP;
        this.min = isDigit(min) ? parseFloat(min) : -Infinity;
        this.max = isDigit(max) ? parseFloat(max) : Infinity;
        if ('valueAsNumber' in this.nativeElement) {
            Object.defineProperty(Object.getPrototypeOf(this.nativeElement), 'valueAsNumber', {
                // tslint:disable-next-line:no-reserved-keywords
                get() {
                    const res = parseFloat(normalizeSplitter(this.value));
                    return isNaN(res) ? null : res;
                }
            });
        }
    }
    get nativeElement() {
        return this.elementRef.nativeElement;
    }
    focusChanged(isFocused) {
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
        const isCtrlZ = (e) => e.keyCode === Z && (e.ctrlKey || e.metaKey);
        const isFKey = (e) => e.keyCode >= F1 && e.keyCode <= F12;
        const isNumber = (e) => (e.keyCode >= ZERO && e.keyCode <= NINE) ||
            (e.keyCode >= NUMPAD_ZERO && e.keyCode <= NUMPAD_NINE);
        const isPeriod = (e) => e.key === '.' || e.key === ',';
        const minuses = [NUMPAD_MINUS, DASH, FF_MINUS];
        const serviceKeys = [DELETE, BACKSPACE, TAB, ESCAPE, ENTER];
        const arrows = [LEFT_ARROW, RIGHT_ARROW];
        const allowedKeys = [HOME, END].concat(arrows).concat(serviceKeys).concat(minuses);
        if (allowedKeys.indexOf(keyCode) !== -1 ||
            isCtrlA(event) ||
            isCtrlC(event) ||
            isCtrlV(event) ||
            isCtrlX(event) ||
            isCtrlZ(event) ||
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
        if (!isDigit(normalizeSplitter(event.clipboardData.getData('text')))) {
            event.preventDefault();
        }
    }
    stepUp(step) {
        this.elementRef.nativeElement.focus();
        const res = Math.max(Math.min(add(this.nativeElement.valueAsNumber || 0, step), this.max), this.min);
        this.nativeElement.value = res.toString();
        this.viewToModelUpdate(this.nativeElement.valueAsNumber);
    }
    stepDown(step) {
        this.elementRef.nativeElement.focus();
        const res = Math.min(Math.max(add(this.nativeElement.valueAsNumber || 0, -step), this.min), this.max);
        this.nativeElement.value = res.toString();
        this.viewToModelUpdate(this.nativeElement.valueAsNumber);
    }
    viewToModelUpdate(value) {
        if (this.ngControl) {
            this.ngControl.control.setValue(value);
        }
    }
}
McNumberInput.decorators = [
    { type: Directive, args: [{
                selector: `input[mcInput][type="number"]`,
                exportAs: 'mcNumericalInput',
                host: {
                    '(blur)': 'focusChanged(false)',
                    '(focus)': 'focusChanged(true)',
                    '(paste)': 'onPaste($event)',
                    '(keydown)': 'onKeyDown($event)'
                }
            },] }
];
/** @nocollapse */
McNumberInput.ctorParameters = () => [
    { type: ElementRef },
    { type: NgControl, decorators: [{ type: Optional }, { type: Self }] },
    { type: String, decorators: [{ type: Attribute, args: ['step',] }] },
    { type: String, decorators: [{ type: Attribute, args: ['big-step',] }] },
    { type: String, decorators: [{ type: Attribute, args: ['min',] }] },
    { type: String, decorators: [{ type: Attribute, args: ['max',] }] }
];
McNumberInput.propDecorators = {
    bigStep: [{ type: Input }],
    step: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }]
};

const MC_INPUT_VALUE_ACCESSOR = new InjectionToken('MC_INPUT_VALUE_ACCESSOR');

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
let nextUniqueId = 0;
class McInputBase {
    constructor(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
        this.defaultErrorStateMatcher = defaultErrorStateMatcher;
        this.parentForm = parentForm;
        this.parentFormGroup = parentFormGroup;
        this.ngControl = ngControl;
    }
}
// tslint:disable-next-line:naming-convention
const McInputMixinBase = mixinErrorState(McInputBase);
class McInput extends McInputMixinBase {
    // tslint:disable-next-line: naming-convention
    constructor(elementRef, rawValidators, mcValidation, ngControl, numberInput, ngModel, formControlName, parentForm, parentFormGroup, defaultErrorStateMatcher, inputValueAccessor) {
        super(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);
        this.elementRef = elementRef;
        this.rawValidators = rawValidators;
        this.mcValidation = mcValidation;
        this.numberInput = numberInput;
        this.ngModel = ngModel;
        this.formControlName = formControlName;
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
        this.controlType = 'input';
        this.uid = `mc-input-${nextUniqueId++}`;
        this.neverEmptyInputTypes = [
            'date',
            'datetime',
            'datetime-local',
            'month',
            'time',
            'week'
        ].filter((t) => getSupportedInputTypes().has(t));
        this._disabled = false;
        this._required = false;
        // tslint:enable no-reserved-keywords
        this._type = 'text';
        // If no input value accessor was explicitly specified, use the element as the input value
        // accessor.
        this._inputValueAccessor = inputValueAccessor || this.elementRef.nativeElement;
        this.previousNativeValue = this.value;
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
        this._id = value || this.uid;
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
        this.validateType();
        // When using Angular inputs, developers are no longer able to set the properties on the native
        // input element. To ensure that bindings for `type` work, we need to sync the setter
        // with the native property. Textarea elements don't support the type property or attribute.
        if (getSupportedInputTypes().has(this._type)) {
            this.elementRef.nativeElement.type = this._type;
        }
    }
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
    ngAfterContentInit() {
        if (!this.ngControl) {
            return;
        }
        if (this.mcValidation.useValidation) {
            setMosaicValidation(this);
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
        this.dirtyCheckNativeValue();
    }
    /** Focuses the input. */
    focus() {
        this.elementRef.nativeElement.focus();
    }
    onBlur() {
        this.focusChanged(false);
        if (this.ngControl && this.ngControl.control) {
            const control = this.ngControl.control;
            control.updateValueAndValidity({ emitEvent: false });
            control.statusChanges.emit(control.status);
        }
    }
    /** Callback for the cases where the focused state of the input changes. */
    focusChanged(isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    }
    onInput() {
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
        return !this.isNeverEmpty() && !this.elementRef.nativeElement.value && !this.isBadInput();
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    onContainerClick() {
        this.focus();
    }
    /** Does some manual dirty checking on the native input `value` property. */
    dirtyCheckNativeValue() {
        const newValue = this.value;
        if (this.previousNativeValue !== newValue) {
            this.previousNativeValue = newValue;
            this.stateChanges.next();
        }
    }
    /** Make sure the input is a supported type. */
    validateType() {
        if (MC_INPUT_INVALID_TYPES.indexOf(this._type) > -1) {
            throw getMcInputUnsupportedTypeError(this._type);
        }
    }
    /** Checks whether the input type is one of the types that are never empty. */
    isNeverEmpty() {
        return this.neverEmptyInputTypes.indexOf(this._type) > -1;
    }
    /** Checks whether the input is invalid based on the native validation. */
    isBadInput() {
        // The `validity` property won't be present on platform-server.
        const validity = this.elementRef.nativeElement.validity;
        return validity && validity.badInput;
    }
}
McInput.decorators = [
    { type: Directive, args: [{
                selector: `input[mcInput]`,
                exportAs: 'mcInput',
                host: {
                    class: 'mc-input',
                    // Native input properties that are overwritten by Angular inputs need to be synced with
                    // the native input element. Otherwise property bindings for those don't work.
                    '[attr.id]': 'id',
                    '[attr.placeholder]': 'placeholder',
                    '[attr.disabled]': 'disabled || null',
                    '[required]': 'required',
                    '(blur)': 'onBlur()',
                    '(focus)': 'focusChanged(true)',
                    '(input)': 'onInput()'
                },
                providers: [{
                        provide: McFormFieldControl, useExisting: McInput
                    }]
            },] }
];
/** @nocollapse */
McInput.ctorParameters = () => [
    { type: ElementRef },
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_VALIDATORS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_VALIDATION,] }] },
    { type: NgControl, decorators: [{ type: Optional }, { type: Self }] },
    { type: McNumberInput, decorators: [{ type: Optional }, { type: Self }] },
    { type: NgModel, decorators: [{ type: Optional }, { type: Self }] },
    { type: FormControlName, decorators: [{ type: Optional }, { type: Self }] },
    { type: NgForm, decorators: [{ type: Optional }] },
    { type: FormGroupDirective, decorators: [{ type: Optional }] },
    { type: ErrorStateMatcher },
    { type: undefined, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [MC_INPUT_VALUE_ACCESSOR,] }] }
];
McInput.propDecorators = {
    errorStateMatcher: [{ type: Input }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    id: [{ type: Input }],
    required: [{ type: Input }],
    type: [{ type: Input }],
    value: [{ type: Input }]
};
class McInputMono {
}
McInputMono.decorators = [
    { type: Directive, args: [{
                selector: 'input[mcInputMonospace]',
                exportAs: 'McInputMonospace',
                host: { class: 'mc-input_monospace' }
            },] }
];

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
class MinValidator {
    ngOnChanges(changes) {
        if ('min' in changes) {
            this.createValidator();
            if (this.onChange) {
                this.onChange();
            }
        }
    }
    validate(c) { return this.validator(c); }
    registerOnValidatorChange(fn) { this.onChange = fn; }
    createValidator() { this.validator = Validators.min(parseInt(this.min, 10)); }
}
MinValidator.decorators = [
    { type: Directive, args: [{
                selector: '[min][formControlName],[min][formControl],[min][ngModel]',
                providers: [MIN_VALIDATOR],
                host: { '[attr.min]': 'min ? min : null' }
            },] }
];
MinValidator.propDecorators = {
    min: [{ type: Input }]
};
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
class MaxValidator {
    ngOnChanges(changes) {
        if ('max' in changes) {
            this.createValidator();
            if (this.onChange) {
                this.onChange();
            }
        }
    }
    validate(c) { return this.validator(c); }
    registerOnValidatorChange(fn) { this.onChange = fn; }
    createValidator() { this.validator = Validators.max(parseInt(this.max, 10)); }
}
MaxValidator.decorators = [
    { type: Directive, args: [{
                selector: '[max][formControlName],[max][formControl],[max][ngModel]',
                providers: [MAX_VALIDATOR],
                host: {
                    '[attr.max]': 'max ? max : null'
                }
            },] }
];
MaxValidator.propDecorators = {
    max: [{ type: Input }]
};

class McInputModule {
}
McInputModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, A11yModule, McCommonModule, FormsModule],
                exports: [McInput, McNumberInput, McInputMono, MinValidator, MaxValidator],
                declarations: [McInput, McNumberInput, McInputMono, MinValidator, MaxValidator]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { BIG_STEP, MC_INPUT_VALUE_ACCESSOR, McInput, McInputBase, McInputMixinBase, McInputModule, McInputMono, McNumberInput, SMALL_STEP, add, getPrecision, isDigit, isFloat, isInt, normalizeSplitter, MIN_VALIDATOR as ɵa, MinValidator as ɵb, MAX_VALIDATOR as ɵc, MaxValidator as ɵd };
//# sourceMappingURL=ptsecurity-mosaic-input.js.map
