/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { InjectionToken, Attribute, Directive, ElementRef, Inject, Input, Optional, Self, forwardRef, NgModule } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { getSupportedInputTypes, Platform } from '@angular/cdk/platform';
import { FormGroupDirective, NgControl, NgForm, NgModel, NG_VALIDATORS, Validators, FormsModule } from '@angular/forms';
import { END, C, V, X, A, DELETE, BACKSPACE, TAB, ENTER, ESCAPE, ZERO, NINE, NUMPAD_ZERO, NUMPAD_NINE, NUMPAD_MINUS, DASH, FF_MINUS, LEFT_ARROW, RIGHT_ARROW, HOME, UP_ARROW, DOWN_ARROW, F1, F12 } from '@ptsecurity/cdk/keycodes';
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
    return Error(`Input type "${inputType}" isn't supported by mcInput.`);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const MC_INPUT_VALUE_ACCESSOR = new InjectionToken('MC_INPUT_VALUE_ACCESSOR');

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
    /** @type {?} */
    const res = (value1 * precision + value2 * precision) / precision;
    return sanitizeNumber(res);
}
/** @type {?} */
const stepUp = (/**
 * @param {?} value
 * @param {?} max
 * @param {?} min
 * @param {?} step
 * @return {?}
 */
(value, max, min, step) => {
    /** @type {?} */
    let res;
    if (value === null) {
        res = add(min, step);
        return res === null ? null : Math.min(res, max);
    }
    res = add(value, step);
    return res === null ? null : Math.max(Math.min(res, max), min);
});
/** @type {?} */
const stepDown = (/**
 * @param {?} value
 * @param {?} max
 * @param {?} min
 * @param {?} step
 * @return {?}
 */
(value, max, min, step) => {
    /** @type {?} */
    let res;
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
const BIG_STEP = 10;
/** @type {?} */
const SMALL_STEP = 1;
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
// tslint:disable-next-line:naming-convention
/** @type {?} */
const McInputMixinBase = mixinErrorState(McInputBase);
class McNumberInput {
    /**
     * @param {?} _platform
     * @param {?} _elementRef
     * @param {?} _model
     * @param {?} step
     * @param {?} bigStep
     * @param {?} min
     * @param {?} max
     */
    constructor(_platform, _elementRef, _model, step, bigStep, min, max) {
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
        this.host = this._elementRef.nativeElement;
        /** @type {?} */
        const self = this;
        if ('valueAsNumber' in this.host) {
            Object.defineProperty(Object.getPrototypeOf(this.host), 'valueAsNumber', {
                // tslint:disable-next-line:no-reserved-keywords
                /**
                 * @return {?}
                 */
                get() {
                    /** @type {?} */
                    const res = parseFloat(self.normalizeSplitter(this.value));
                    return isNaN(res) ? null : res;
                }
            });
        }
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
        const minuses = [NUMPAD_MINUS, DASH, FF_MINUS];
        /** @type {?} */
        const serviceKeys = [DELETE, BACKSPACE, TAB, ESCAPE, ENTER];
        /** @type {?} */
        const arrows = [LEFT_ARROW, RIGHT_ARROW];
        /** @type {?} */
        const allowedKeys = [HOME, END].concat(arrows).concat(serviceKeys).concat(minuses);
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
        // Decimal is for IE
        /** @type {?} */
        const isPeriod = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => this._platform.EDGE || this._platform.TRIDENT
            ? isIEPeriod(e)
            : isNotIEPeriod(e));
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
        /** @type {?} */
        let value = event.clipboardData.getData('text');
        value = this.normalizeSplitter(value);
        if (!this.isDigit(value)) {
            event.preventDefault();
        }
    }
    /**
     * @param {?} step
     * @return {?}
     */
    stepUp(step) {
        this._elementRef.nativeElement.focus();
        /** @type {?} */
        const res = stepUp(this.host.valueAsNumber, this.max, this.min, step);
        this.host.value = res === null ? '' : res.toString();
        this._model.update.emit(this.host.valueAsNumber);
    }
    /**
     * @param {?} step
     * @return {?}
     */
    stepDown(step) {
        this._elementRef.nativeElement.focus();
        /** @type {?} */
        const res = stepDown(this.host.valueAsNumber, this.max, this.min, step);
        this.host.value = res === null ? '' : res.toString();
        this._model.update.emit(this.host.valueAsNumber);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    normalizeSplitter(value) {
        return value ? value.replace(/,/g, '.') : value;
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    isDigit(value) {
        return this.isFloat(value) || this.isInt(value);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    isFloat(value) {
        return /^-?\d+\.\d+$/.test(value);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    isInt(value) {
        return /^-?\d+$/.test(value);
    }
}
McNumberInput.decorators = [
    { type: Directive, args: [{
                selector: `input[mcInput][type="number"]`,
                exportAs: 'mcNumericalInput',
                providers: [NgModel, { provide: McFormFieldNumberControl, useExisting: McNumberInput }],
                host: {
                    '(blur)': 'focusChanged(false)',
                    '(focus)': 'focusChanged(true)',
                    '(paste)': 'onPaste($event)',
                    '(keydown)': 'onKeyDown($event)'
                }
            },] },
];
/** @nocollapse */
McNumberInput.ctorParameters = () => [
    { type: Platform },
    { type: ElementRef },
    { type: NgModel },
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
class McInput extends McInputMixinBase {
    // tslint:disable-next-line: naming-convention
    /**
     * @param {?} _elementRef
     * @param {?} ngControl
     * @param {?} parentForm
     * @param {?} parentFormGroup
     * @param {?} defaultErrorStateMatcher
     * @param {?} inputValueAccessor
     */
    constructor(_elementRef, ngControl, parentForm, parentFormGroup, defaultErrorStateMatcher, inputValueAccessor) {
        super(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);
        this._elementRef = _elementRef;
        this.ngControl = ngControl;
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
        this._inputValueAccessor = inputValueAccessor || this._elementRef.nativeElement;
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
            this._elementRef.nativeElement.type = this._type;
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
        this._elementRef.nativeElement.focus();
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
        return !this.isNeverEmpty() && !this._elementRef.nativeElement.value && !this.isBadInput();
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
        const validity = ((/** @type {?} */ (this._elementRef.nativeElement))).validity;
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
                    '[disabled]': 'disabled',
                    '[required]': 'required',
                    '(blur)': 'focusChanged(false)',
                    '(focus)': 'focusChanged(true)',
                    '(input)': 'onInput()'
                },
                providers: [{ provide: McFormFieldControl, useExisting: McInput }]
            },] },
];
/** @nocollapse */
McInput.ctorParameters = () => [
    { type: ElementRef },
    { type: NgControl, decorators: [{ type: Optional }, { type: Self }] },
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
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            },] },
];
MinValidator.propDecorators = {
    min: [{ type: Input }]
};
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
            },] },
];
MaxValidator.propDecorators = {
    max: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McInputModule {
}
McInputModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, A11yModule, McCommonModule, FormsModule],
                exports: [McInput, McNumberInput, McInputMono, MinValidator, MaxValidator],
                declarations: [McInput, McNumberInput, McInputMono, MinValidator, MaxValidator]
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

export { McInputModule, BIG_STEP, SMALL_STEP, McInputBase, McInputMixinBase, McNumberInput, McInput, McInputMono, stepUp, stepDown, MC_INPUT_VALUE_ACCESSOR, MAX_VALIDATOR as ɵc24, MIN_VALIDATOR as ɵa24, MaxValidator as ɵd24, MinValidator as ɵb24 };
//# sourceMappingURL=input.js.map
