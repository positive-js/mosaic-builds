import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Directive, ElementRef, Optional, Self, Attribute, Input, InjectionToken, Inject, forwardRef, NgModule } from '@angular/core';
import { NgControl, NG_VALIDATORS, NgModel, FormControlName, NgForm, FormGroupDirective, Validators, FormsModule } from '@angular/forms';
import { mixinErrorState, setMosaicValidation, MC_VALIDATION, ErrorStateMatcher, McCommonModule } from '@ptsecurity/mosaic/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Platform, getSupportedInputTypes } from '@angular/cdk/platform';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { Subject } from 'rxjs';
import { A, C, V, X, Z, F1, F12, ZERO, NINE, NUMPAD_ZERO, NUMPAD_NINE, NUMPAD_MINUS, DASH, FF_MINUS, DELETE, BACKSPACE, TAB, ESCAPE, ENTER, LEFT_ARROW, RIGHT_ARROW, HOME, END, UP_ARROW, DOWN_ARROW } from '@ptsecurity/cdk/keycodes';

/**
 * @fileoverview added by tsickle
 * Generated from: input-errors.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} inputType
 * @return {?}
 */
function getMcInputUnsupportedTypeError(inputType) {
    return Error(`Input type "${inputType}" isn't supported by mcInput.`);
}

/**
 * @fileoverview added by tsickle
 * Generated from: input-number.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const BIG_STEP = 10;
/** @type {?} */
const SMALL_STEP = 1;
/**
 * @param {?} value
 * @return {?}
 */
function normalizeSplitter(value) {
    return value ? value.replace(/,/g, '.') : value;
}
/**
 * @param {?} value
 * @return {?}
 */
function isFloat(value) {
    return /^-?\d+\.\d+$/.test(value);
}
/**
 * @param {?} value
 * @return {?}
 */
function isInt(value) {
    return /^-?\d+$/.test(value);
}
/**
 * @param {?} value
 * @return {?}
 */
function isDigit(value) {
    return isFloat(value) || isInt(value);
}
/**
 * @param {?} value
 * @return {?}
 */
function getPrecision(value) {
    /** @type {?} */
    const arr = value.toString().split('.');
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
    const precision = Math.max(getPrecision(value1), getPrecision(value2));
    return (value1 * precision + value2 * precision) / precision;
}
class McNumberInput {
    /**
     * @param {?} platform
     * @param {?} elementRef
     * @param {?} ngControl
     * @param {?} step
     * @param {?} bigStep
     * @param {?} min
     * @param {?} max
     */
    constructor(platform, elementRef, ngControl, step, bigStep, min, max) {
        this.platform = platform;
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
                /**
                 * @return {?}
                 */
                get() {
                    /** @type {?} */
                    const res = parseFloat(normalizeSplitter(this.value));
                    return isNaN(res) ? null : res;
                }
            });
        }
    }
    /**
     * @return {?}
     */
    get nativeElement() {
        return this.elementRef.nativeElement;
    }
    /**
     * @param {?} isFocused
     * @return {?}
     */
    focusChanged(isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        // tslint:disable-next-line:deprecation
        /** @type {?} */
        const keyCode = event.keyCode;
        /** @type {?} */
        const isCtrlA = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => e.keyCode === A && (e.ctrlKey || e.metaKey));
        /** @type {?} */
        const isCtrlC = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => e.keyCode === C && (e.ctrlKey || e.metaKey));
        /** @type {?} */
        const isCtrlV = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => e.keyCode === V && (e.ctrlKey || e.metaKey));
        /** @type {?} */
        const isCtrlX = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => e.keyCode === X && (e.ctrlKey || e.metaKey));
        /** @type {?} */
        const isCtrlZ = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => e.keyCode === Z && (e.ctrlKey || e.metaKey));
        /** @type {?} */
        const isFKey = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => e.keyCode >= F1 && e.keyCode <= F12);
        /** @type {?} */
        const isNumber = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => (e.keyCode >= ZERO && e.keyCode <= NINE) ||
            (e.keyCode >= NUMPAD_ZERO && e.keyCode <= NUMPAD_NINE));
        /** @type {?} */
        const isIEPeriod = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => e.key === '.' || e.key === 'Decimal');
        /** @type {?} */
        const isNotIEPeriod = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => e.key === '.' || e.key === ',');
        /** @type {?} */
        const minuses = [NUMPAD_MINUS, DASH, FF_MINUS];
        /** @type {?} */
        const serviceKeys = [DELETE, BACKSPACE, TAB, ESCAPE, ENTER];
        /** @type {?} */
        const arrows = [LEFT_ARROW, RIGHT_ARROW];
        /** @type {?} */
        const allowedKeys = [HOME, END].concat(arrows).concat(serviceKeys).concat(minuses);
        // Decimal is for IE
        /** @type {?} */
        const isPeriod = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => this.platform.EDGE || this.platform.TRIDENT
            ? isIEPeriod(e)
            : isNotIEPeriod(e));
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
            /** @type {?} */
            const step = event.shiftKey ? this.bigStep : this.step;
            if (keyCode === UP_ARROW) {
                this.stepUp(step);
            }
            if (keyCode === DOWN_ARROW) {
                this.stepDown(step);
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onPaste(event) {
        if (!isDigit(normalizeSplitter(event.clipboardData.getData('text')))) {
            event.preventDefault();
        }
    }
    /**
     * @param {?} step
     * @return {?}
     */
    stepUp(step) {
        this.elementRef.nativeElement.focus();
        /** @type {?} */
        const res = Math.max(Math.min(add(this.nativeElement.valueAsNumber || 0, step), this.max), this.min);
        this.nativeElement.value = res.toString();
        this.viewToModelUpdate(this.nativeElement.valueAsNumber);
    }
    /**
     * @param {?} step
     * @return {?}
     */
    stepDown(step) {
        this.elementRef.nativeElement.focus();
        /** @type {?} */
        const res = Math.min(Math.max(add(this.nativeElement.valueAsNumber || 0, -step), this.min), this.max);
        this.nativeElement.value = res.toString();
        this.viewToModelUpdate(this.nativeElement.valueAsNumber);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    viewToModelUpdate(value) {
        if (this.ngControl) {
            (/** @type {?} */ (this.ngControl.control)).setValue(value);
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
    { type: Platform },
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
if (false) {
    /** @type {?} */
    McNumberInput.prototype.bigStep;
    /** @type {?} */
    McNumberInput.prototype.step;
    /** @type {?} */
    McNumberInput.prototype.min;
    /** @type {?} */
    McNumberInput.prototype.max;
    /** @type {?} */
    McNumberInput.prototype.value;
    /** @type {?} */
    McNumberInput.prototype.focused;
    /** @type {?} */
    McNumberInput.prototype.stateChanges;
    /**
     * @type {?}
     * @private
     */
    McNumberInput.prototype.platform;
    /**
     * @type {?}
     * @private
     */
    McNumberInput.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    McNumberInput.prototype.ngControl;
}

/**
 * @fileoverview added by tsickle
 * Generated from: input-value-accessor.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const MC_INPUT_VALUE_ACCESSOR = new InjectionToken('MC_INPUT_VALUE_ACCESSOR');

/**
 * @fileoverview added by tsickle
 * Generated from: input.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
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
/** @type {?} */
let nextUniqueId = 0;
class McInputBase {
    /**
     * @param {?} defaultErrorStateMatcher
     * @param {?} parentForm
     * @param {?} parentFormGroup
     * @param {?} ngControl
     */
    constructor(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
        this.defaultErrorStateMatcher = defaultErrorStateMatcher;
        this.parentForm = parentForm;
        this.parentFormGroup = parentFormGroup;
        this.ngControl = ngControl;
    }
}
if (false) {
    /** @type {?} */
    McInputBase.prototype.defaultErrorStateMatcher;
    /** @type {?} */
    McInputBase.prototype.parentForm;
    /** @type {?} */
    McInputBase.prototype.parentFormGroup;
    /** @type {?} */
    McInputBase.prototype.ngControl;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
const McInputMixinBase = mixinErrorState(McInputBase);
class McInput extends McInputMixinBase {
    // tslint:disable-next-line: naming-convention
    /**
     * @param {?} elementRef
     * @param {?} rawValidators
     * @param {?} mcValidation
     * @param {?} ngControl
     * @param {?} numberInput
     * @param {?} ngModel
     * @param {?} formControlName
     * @param {?} parentForm
     * @param {?} parentFormGroup
     * @param {?} defaultErrorStateMatcher
     * @param {?} inputValueAccessor
     */
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
         * \@docs-private
         */
        this.focused = false;
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         */
        this.stateChanges = new Subject();
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         */
        this.controlType = 'mc-input';
        this.uid = `mc-input-${nextUniqueId++}`;
        this.neverEmptyInputTypes = [
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
        (t) => getSupportedInputTypes().has(t)));
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
     * \@docs-private
     * @return {?}
     */
    get disabled() {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
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
     * \@docs-private
     * @return {?}
     */
    get id() {
        return this._id;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set id(value) {
        this._id = value || this.uid;
    }
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    get required() {
        return this._required;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) {
        this._required = coerceBooleanProperty(value);
    }
    // tslint:disable no-reserved-keywords
    /**
     * Input type of the element.
     * @return {?}
     */
    get type() {
        return this._type;
    }
    /**
     * @param {?} value
     * @return {?}
     */
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
     * \@docs-private
     * @return {?}
     */
    get value() {
        return this._inputValueAccessor.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        if (value !== this.value) {
            this._inputValueAccessor.value = value;
            this.stateChanges.next();
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (!this.ngControl) {
            return;
        }
        if (this.mcValidation.useValidation) {
            setMosaicValidation(this);
        }
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.stateChanges.next();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stateChanges.complete();
    }
    /**
     * @return {?}
     */
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
    /**
     * Focuses the input.
     * @return {?}
     */
    focus() {
        this.elementRef.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    onBlur() {
        this.focusChanged(false);
        if (this.ngControl && this.ngControl.control) {
            /** @type {?} */
            const control = this.ngControl.control;
            control.updateValueAndValidity({ emitEvent: false });
            ((/** @type {?} */ (control.statusChanges))).emit(control.status);
        }
    }
    /**
     * Callback for the cases where the focused state of the input changes.
     * @param {?} isFocused
     * @return {?}
     */
    focusChanged(isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    }
    /**
     * @return {?}
     */
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
     * \@docs-private
     * @return {?}
     */
    get empty() {
        return !this.isNeverEmpty() && !this.elementRef.nativeElement.value && !this.isBadInput();
    }
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    onContainerClick() {
        this.focus();
    }
    /**
     * Does some manual dirty checking on the native input `value` property.
     * @protected
     * @return {?}
     */
    dirtyCheckNativeValue() {
        /** @type {?} */
        const newValue = this.value;
        if (this.previousNativeValue !== newValue) {
            this.previousNativeValue = newValue;
            this.stateChanges.next();
        }
    }
    /**
     * Make sure the input is a supported type.
     * @protected
     * @return {?}
     */
    validateType() {
        if (MC_INPUT_INVALID_TYPES.indexOf(this._type) > -1) {
            throw getMcInputUnsupportedTypeError(this._type);
        }
    }
    /**
     * Checks whether the input type is one of the types that are never empty.
     * @protected
     * @return {?}
     */
    isNeverEmpty() {
        return this.neverEmptyInputTypes.indexOf(this._type) > -1;
    }
    /**
     * Checks whether the input is invalid based on the native validation.
     * @protected
     * @return {?}
     */
    isBadInput() {
        // The `validity` property won't be present on platform-server.
        /** @type {?} */
        const validity = ((/** @type {?} */ (this.elementRef.nativeElement))).validity;
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
if (false) {
    /**
     * An object used to control when error messages are shown.
     * @type {?}
     */
    McInput.prototype.errorStateMatcher;
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @type {?}
     */
    McInput.prototype.focused;
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @type {?}
     */
    McInput.prototype.stateChanges;
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @type {?}
     */
    McInput.prototype.controlType;
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @type {?}
     */
    McInput.prototype.placeholder;
    /**
     * @type {?}
     * @protected
     */
    McInput.prototype.uid;
    /**
     * @type {?}
     * @protected
     */
    McInput.prototype.previousNativeValue;
    /**
     * @type {?}
     * @protected
     */
    McInput.prototype.neverEmptyInputTypes;
    /**
     * @type {?}
     * @private
     */
    McInput.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    McInput.prototype._id;
    /**
     * @type {?}
     * @private
     */
    McInput.prototype._required;
    /**
     * @type {?}
     * @private
     */
    McInput.prototype._type;
    /**
     * @type {?}
     * @private
     */
    McInput.prototype._inputValueAccessor;
    /**
     * @type {?}
     * @protected
     */
    McInput.prototype.elementRef;
    /** @type {?} */
    McInput.prototype.rawValidators;
    /**
     * @type {?}
     * @private
     */
    McInput.prototype.mcValidation;
    /** @type {?} */
    McInput.prototype.numberInput;
    /** @type {?} */
    McInput.prototype.ngModel;
    /** @type {?} */
    McInput.prototype.formControlName;
}
class McInputMono {
}
McInputMono.decorators = [
    { type: Directive, args: [{
                selector: 'input[mcInputMonospace]',
                exportAs: 'McInputMonospace',
                host: { class: 'mc-input_monospace' }
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: input-number-validators.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const MIN_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => MinValidator)),
    multi: true
};
/**
 * A directive which installs the {\@link MinValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `min` attribute.
 *
 * \@experimental
 */
class MinValidator {
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if ('min' in changes) {
            this.createValidator();
            if (this.onChange) {
                this.onChange();
            }
        }
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) { return this.validator(c); }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnValidatorChange(fn) { this.onChange = fn; }
    /**
     * @private
     * @return {?}
     */
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
if (false) {
    /** @type {?} */
    MinValidator.prototype.min;
    /**
     * @type {?}
     * @private
     */
    MinValidator.prototype.validator;
    /**
     * @type {?}
     * @private
     */
    MinValidator.prototype.onChange;
}
/** @type {?} */
const MAX_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => MaxValidator)),
    multi: true
};
/**
 * A directive which installs the {\@link MaxValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `min` attribute.
 *
 * \@experimental
 */
class MaxValidator {
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if ('max' in changes) {
            this.createValidator();
            if (this.onChange) {
                this.onChange();
            }
        }
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) { return this.validator(c); }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnValidatorChange(fn) { this.onChange = fn; }
    /**
     * @private
     * @return {?}
     */
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
if (false) {
    /** @type {?} */
    MaxValidator.prototype.max;
    /**
     * @type {?}
     * @private
     */
    MaxValidator.prototype.validator;
    /**
     * @type {?}
     * @private
     */
    MaxValidator.prototype.onChange;
}

/**
 * @fileoverview added by tsickle
 * Generated from: input.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
 * Generated from: ptsecurity-mosaic-input.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { BIG_STEP, MC_INPUT_VALUE_ACCESSOR, McInput, McInputBase, McInputMixinBase, McInputModule, McInputMono, McNumberInput, SMALL_STEP, add, getPrecision, isDigit, isFloat, isInt, normalizeSplitter, MIN_VALIDATOR as ɵa, MinValidator as ɵb, MAX_VALIDATOR as ɵc, MaxValidator as ɵd };
//# sourceMappingURL=ptsecurity-mosaic-input.js.map
