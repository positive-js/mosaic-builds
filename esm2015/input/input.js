/**
 * @fileoverview added by tsickle
 * Generated from: input.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { getSupportedInputTypes } from '@angular/cdk/platform';
import { Directive, ElementRef, Inject, Input, Optional, Self } from '@angular/core';
import { FormControlName, FormGroupDirective, NG_VALIDATORS, NgControl, NgForm, NgModel } from '@angular/forms';
import { ErrorStateMatcher, MC_VALIDATION, mixinErrorState, setMosaicValidation } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { Subject } from 'rxjs';
import { getMcInputUnsupportedTypeError } from './input-errors';
import { McNumberInput } from './input-number';
import { MC_INPUT_VALUE_ACCESSOR } from './input-value-accessor';
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
export class McInputBase {
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
export const McInputMixinBase = mixinErrorState(McInputBase);
export class McInput extends McInputMixinBase {
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
export class McInputMono {
}
McInputMono.decorators = [
    { type: Directive, args: [{
                selector: 'input[mcInputMonospace]',
                exportAs: 'McInputMonospace',
                host: { class: 'mc-input_monospace' }
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9pbnB1dC8iLCJzb3VyY2VzIjpbImlucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDL0QsT0FBTyxFQUVILFNBQVMsRUFFVCxVQUFVLEVBRVYsTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsSUFBSSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCxlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLGFBQWEsRUFDYixTQUFTLEVBQ1QsTUFBTSxFQUNOLE9BQU8sRUFFVixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFHSCxpQkFBaUIsRUFDakIsYUFBYSxFQUViLGVBQWUsRUFDZixtQkFBbUIsRUFDdEIsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7TUFHM0Qsc0JBQXNCLEdBQUc7SUFDM0IsUUFBUTtJQUNSLFVBQVU7SUFDVixNQUFNO0lBQ04sUUFBUTtJQUNSLE9BQU87SUFDUCxPQUFPO0lBQ1AsT0FBTztJQUNQLE9BQU87SUFDUCxRQUFRO0NBQ1g7O0lBRUcsWUFBWSxHQUFHLENBQUM7QUFFcEIsTUFBTSxPQUFPLFdBQVc7Ozs7Ozs7SUFDcEIsWUFDVyx3QkFBMkMsRUFD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QUFpQzs7Ozs7O0lBTWpDLDhCQUE2Qjs7Ozs7SUFFN0Isc0JBQTZDOzs7OztJQUM3QyxzQ0FBbUM7Ozs7O0lBQ25DLHVDQU9pRDs7Ozs7SUEwQmpELDRCQUEwQjs7Ozs7SUFlMUIsc0JBQW9COzs7OztJQWVwQiw0QkFBMEI7Ozs7O0lBc0IxQix3QkFBdUI7Ozs7O0lBbUJ2QixzQ0FBNEM7Ozs7O0lBSXhDLDZCQUFnQzs7SUFDaEMsZ0NBQTRFOzs7OztJQUM1RSwrQkFBNEU7O0lBRTVFLDhCQUFxRDs7SUFDckQsMEJBQTJDOztJQUMzQyxrQ0FBMkQ7O0FBc0luRSxNQUFNLE9BQU8sV0FBVzs7O1lBTHZCLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUU7YUFDeEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgZ2V0U3VwcG9ydGVkSW5wdXRUeXBlcyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgRGlyZWN0aXZlLFxuICAgIERvQ2hlY2ssXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3B0aW9uYWwsXG4gICAgU2VsZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgRm9ybUNvbnRyb2xOYW1lLFxuICAgIEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICBOR19WQUxJREFUT1JTLFxuICAgIE5nQ29udHJvbCxcbiAgICBOZ0Zvcm0sXG4gICAgTmdNb2RlbCxcbiAgICBWYWxpZGF0b3Jcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgICBDYW5VcGRhdGVFcnJvclN0YXRlLFxuICAgIENhblVwZGF0ZUVycm9yU3RhdGVDdG9yLFxuICAgIEVycm9yU3RhdGVNYXRjaGVyLFxuICAgIE1DX1ZBTElEQVRJT04sXG4gICAgTWNWYWxpZGF0aW9uT3B0aW9ucyxcbiAgICBtaXhpbkVycm9yU3RhdGUsXG4gICAgc2V0TW9zYWljVmFsaWRhdGlvblxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0Zvcm1GaWVsZENvbnRyb2wgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IGdldE1jSW5wdXRVbnN1cHBvcnRlZFR5cGVFcnJvciB9IGZyb20gJy4vaW5wdXQtZXJyb3JzJztcbmltcG9ydCB7IE1jTnVtYmVySW5wdXQgfSBmcm9tICcuL2lucHV0LW51bWJlcic7XG5pbXBvcnQgeyBNQ19JTlBVVF9WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJy4vaW5wdXQtdmFsdWUtYWNjZXNzb3InO1xuXG5cbmNvbnN0IE1DX0lOUFVUX0lOVkFMSURfVFlQRVMgPSBbXG4gICAgJ2J1dHRvbicsXG4gICAgJ2NoZWNrYm94JyxcbiAgICAnZmlsZScsXG4gICAgJ2hpZGRlbicsXG4gICAgJ2ltYWdlJyxcbiAgICAncmFkaW8nLFxuICAgICdyYW5nZScsXG4gICAgJ3Jlc2V0JyxcbiAgICAnc3VibWl0J1xuXTtcblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBNY0lucHV0QmFzZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICAgICAgICBwdWJsaWMgcGFyZW50Rm9ybTogTmdGb3JtLFxuICAgICAgICBwdWJsaWMgcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgICAgIHB1YmxpYyBuZ0NvbnRyb2w6IE5nQ29udHJvbFxuICAgICkge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNJbnB1dE1peGluQmFzZTogQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IgJiB0eXBlb2YgTWNJbnB1dEJhc2UgPSBtaXhpbkVycm9yU3RhdGUoTWNJbnB1dEJhc2UpO1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBgaW5wdXRbbWNJbnB1dF1gLFxuICAgIGV4cG9ydEFzOiAnbWNJbnB1dCcsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWlucHV0JyxcbiAgICAgICAgLy8gTmF0aXZlIGlucHV0IHByb3BlcnRpZXMgdGhhdCBhcmUgb3ZlcndyaXR0ZW4gYnkgQW5ndWxhciBpbnB1dHMgbmVlZCB0byBiZSBzeW5jZWQgd2l0aFxuICAgICAgICAvLyB0aGUgbmF0aXZlIGlucHV0IGVsZW1lbnQuIE90aGVyd2lzZSBwcm9wZXJ0eSBiaW5kaW5ncyBmb3IgdGhvc2UgZG9uJ3Qgd29yay5cbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCcsXG4gICAgICAgICdbYXR0ci5wbGFjZWhvbGRlcl0nOiAncGxhY2Vob2xkZXInLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICAgICAnW3JlcXVpcmVkXSc6ICdyZXF1aXJlZCcsXG4gICAgICAgICcoYmx1ciknOiAnb25CbHVyKCknLFxuICAgICAgICAnKGZvY3VzKSc6ICdmb2N1c0NoYW5nZWQodHJ1ZSknLFxuICAgICAgICAnKGlucHV0KSc6ICdvbklucHV0KCknXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFt7XG4gICAgICAgIHByb3ZpZGU6IE1jRm9ybUZpZWxkQ29udHJvbCwgdXNlRXhpc3Rpbmc6IE1jSW5wdXRcbiAgICB9XVxufSlcbmV4cG9ydCBjbGFzcyBNY0lucHV0IGV4dGVuZHMgTWNJbnB1dE1peGluQmFzZSBpbXBsZW1lbnRzIE1jRm9ybUZpZWxkQ29udHJvbDxhbnk+LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgRG9DaGVjayxcbiAgICBDYW5VcGRhdGVFcnJvclN0YXRlLCBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMge1xuXG4gICAgLyoqIEFuIG9iamVjdCB1c2VkIHRvIGNvbnRyb2wgd2hlbiBlcnJvciBtZXNzYWdlcyBhcmUgc2hvd24uICovXG4gICAgQElucHV0KCkgZXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICByZWFkb25seSBzdGF0ZUNoYW5nZXM6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGNvbnRyb2xUeXBlOiBzdHJpbmcgPSAnbWMtaW5wdXQnO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICBwcm90ZWN0ZWQgdWlkID0gYG1jLWlucHV0LSR7bmV4dFVuaXF1ZUlkKyt9YDtcbiAgICBwcm90ZWN0ZWQgcHJldmlvdXNOYXRpdmVWYWx1ZTogYW55O1xuICAgIHByb3RlY3RlZCBuZXZlckVtcHR5SW5wdXRUeXBlcyA9IFtcbiAgICAgICAgJ2RhdGUnLFxuICAgICAgICAnZGF0ZXRpbWUnLFxuICAgICAgICAnZGF0ZXRpbWUtbG9jYWwnLFxuICAgICAgICAnbW9udGgnLFxuICAgICAgICAndGltZScsXG4gICAgICAgICd3ZWVrJ1xuICAgIF0uZmlsdGVyKCh0KSA9PiBnZXRTdXBwb3J0ZWRJbnB1dFR5cGVzKCkuaGFzKHQpKTtcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMubmdDb250cm9sICYmIHRoaXMubmdDb250cm9sLmRpc2FibGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uZ0NvbnRyb2wuZGlzYWJsZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgICAgICAvLyBCcm93c2VycyBtYXkgbm90IGZpcmUgdGhlIGJsdXIgZXZlbnQgaWYgdGhlIGlucHV0IGlzIGRpc2FibGVkIHRvbyBxdWlja2x5LlxuICAgICAgICAvLyBSZXNldCBmcm9tIGhlcmUgdG8gZW5zdXJlIHRoYXQgdGhlIGVsZW1lbnQgZG9lc24ndCBiZWNvbWUgc3R1Y2suXG4gICAgICAgIGlmICh0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBpZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfVxuXG4gICAgc2V0IGlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faWQgPSB2YWx1ZSB8fCB0aGlzLnVpZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pZDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7XG4gICAgfVxuXG4gICAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXF1aXJlZCA9IGZhbHNlO1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUgbm8tcmVzZXJ2ZWQta2V5d29yZHNcbiAgICAvKiogSW5wdXQgdHlwZSBvZiB0aGUgZWxlbWVudC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCB0eXBlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xuICAgIH1cblxuICAgIHNldCB0eXBlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fdHlwZSA9IHZhbHVlIHx8ICd0ZXh0JztcbiAgICAgICAgdGhpcy52YWxpZGF0ZVR5cGUoKTtcblxuICAgICAgICAvLyBXaGVuIHVzaW5nIEFuZ3VsYXIgaW5wdXRzLCBkZXZlbG9wZXJzIGFyZSBubyBsb25nZXIgYWJsZSB0byBzZXQgdGhlIHByb3BlcnRpZXMgb24gdGhlIG5hdGl2ZVxuICAgICAgICAvLyBpbnB1dCBlbGVtZW50LiBUbyBlbnN1cmUgdGhhdCBiaW5kaW5ncyBmb3IgYHR5cGVgIHdvcmssIHdlIG5lZWQgdG8gc3luYyB0aGUgc2V0dGVyXG4gICAgICAgIC8vIHdpdGggdGhlIG5hdGl2ZSBwcm9wZXJ0eS4gVGV4dGFyZWEgZWxlbWVudHMgZG9uJ3Qgc3VwcG9ydCB0aGUgdHlwZSBwcm9wZXJ0eSBvciBhdHRyaWJ1dGUuXG4gICAgICAgIGlmIChnZXRTdXBwb3J0ZWRJbnB1dFR5cGVzKCkuaGFzKHRoaXMuX3R5cGUpKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC50eXBlID0gdGhpcy5fdHlwZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyB0c2xpbnQ6ZW5hYmxlIG5vLXJlc2VydmVkLWtleXdvcmRzXG5cbiAgICBwcml2YXRlIF90eXBlID0gJ3RleHQnO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnB1dFZhbHVlQWNjZXNzb3IudmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnB1dFZhbHVlQWNjZXNzb3IudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogb3J0aG9kb3gtZ2V0dGVyLWFuZC1zZXR0ZXJcbiAgICBwcml2YXRlIF9pbnB1dFZhbHVlQWNjZXNzb3I6IHsgdmFsdWU6IGFueSB9O1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE5HX1ZBTElEQVRPUlMpIHB1YmxpYyByYXdWYWxpZGF0b3JzOiBWYWxpZGF0b3JbXSxcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQ19WQUxJREFUSU9OKSBwcml2YXRlIG1jVmFsaWRhdGlvbjogTWNWYWxpZGF0aW9uT3B0aW9ucyxcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBuZ0NvbnRyb2w6IE5nQ29udHJvbCxcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgbnVtYmVySW5wdXQ6IE1jTnVtYmVySW5wdXQsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIG5nTW9kZWw6IE5nTW9kZWwsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIGZvcm1Db250cm9sTmFtZTogRm9ybUNvbnRyb2xOYW1lLFxuICAgICAgICBAT3B0aW9uYWwoKSBwYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgICAgIEBPcHRpb25hbCgpIHBhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgICAgICBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIEBJbmplY3QoTUNfSU5QVVRfVkFMVUVfQUNDRVNTT1IpIGlucHV0VmFsdWVBY2Nlc3NvcjogYW55XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlciwgcGFyZW50Rm9ybSwgcGFyZW50Rm9ybUdyb3VwLCBuZ0NvbnRyb2wpO1xuXG4gICAgICAgIC8vIElmIG5vIGlucHV0IHZhbHVlIGFjY2Vzc29yIHdhcyBleHBsaWNpdGx5IHNwZWNpZmllZCwgdXNlIHRoZSBlbGVtZW50IGFzIHRoZSBpbnB1dCB2YWx1ZVxuICAgICAgICAvLyBhY2Nlc3Nvci5cbiAgICAgICAgdGhpcy5faW5wdXRWYWx1ZUFjY2Vzc29yID0gaW5wdXRWYWx1ZUFjY2Vzc29yIHx8IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIHRoaXMucHJldmlvdXNOYXRpdmVWYWx1ZSA9IHRoaXMudmFsdWU7XG5cbiAgICAgICAgLy8gRm9yY2Ugc2V0dGVyIHRvIGJlIGNhbGxlZCBpbiBjYXNlIGlkIHdhcyBub3Qgc3BlY2lmaWVkLlxuICAgICAgICB0aGlzLmlkID0gdGhpcy5pZDtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5uZ0NvbnRyb2wpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKHRoaXMubWNWYWxpZGF0aW9uLnVzZVZhbGlkYXRpb24pIHtcbiAgICAgICAgICAgIHNldE1vc2FpY1ZhbGlkYXRpb24odGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgaWYgKHRoaXMubmdDb250cm9sKSB7XG4gICAgICAgICAgICAvLyBXZSBuZWVkIHRvIHJlLWV2YWx1YXRlIHRoaXMgb24gZXZlcnkgY2hhbmdlIGRldGVjdGlvbiBjeWNsZSwgYmVjYXVzZSB0aGVyZSBhcmUgc29tZVxuICAgICAgICAgICAgLy8gZXJyb3IgdHJpZ2dlcnMgdGhhdCB3ZSBjYW4ndCBzdWJzY3JpYmUgdG8gKGUuZy4gcGFyZW50IGZvcm0gc3VibWlzc2lvbnMpLiBUaGlzIG1lYW5zXG4gICAgICAgICAgICAvLyB0aGF0IHdoYXRldmVyIGxvZ2ljIGlzIGluIGhlcmUgaGFzIHRvIGJlIHN1cGVyIGxlYW4gb3Igd2UgcmlzayBkZXN0cm95aW5nIHRoZSBwZXJmb3JtYW5jZS5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlRXJyb3JTdGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgbmVlZCB0byBkaXJ0eS1jaGVjayB0aGUgbmF0aXZlIGVsZW1lbnQncyB2YWx1ZSwgYmVjYXVzZSB0aGVyZSBhcmUgc29tZSBjYXNlcyB3aGVyZVxuICAgICAgICAvLyB3ZSB3b24ndCBiZSBub3RpZmllZCB3aGVuIGl0IGNoYW5nZXMgKGUuZy4gdGhlIGNvbnN1bWVyIGlzbid0IHVzaW5nIGZvcm1zIG9yIHRoZXkncmVcbiAgICAgICAgLy8gdXBkYXRpbmcgdGhlIHZhbHVlIHVzaW5nIGBlbWl0RXZlbnQ6IGZhbHNlYCkuXG4gICAgICAgIHRoaXMuZGlydHlDaGVja05hdGl2ZVZhbHVlKCk7XG4gICAgfVxuXG4gICAgLyoqIEZvY3VzZXMgdGhlIGlucHV0LiAqL1xuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIG9uQmx1cigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb2N1c0NoYW5nZWQoZmFsc2UpO1xuXG4gICAgICAgIGlmICh0aGlzLm5nQ29udHJvbCAmJiB0aGlzLm5nQ29udHJvbC5jb250cm9sKSB7XG4gICAgICAgICAgICBjb25zdCBjb250cm9sID0gdGhpcy5uZ0NvbnRyb2wuY29udHJvbDtcblxuICAgICAgICAgICAgY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICAgICAgICAgIChjb250cm9sLnN0YXR1c0NoYW5nZXMgYXMgRXZlbnRFbWl0dGVyPHN0cmluZz4pLmVtaXQoY29udHJvbC5zdGF0dXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIENhbGxiYWNrIGZvciB0aGUgY2FzZXMgd2hlcmUgdGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIGlucHV0IGNoYW5nZXMuICovXG4gICAgZm9jdXNDaGFuZ2VkKGlzRm9jdXNlZDogYm9vbGVhbikge1xuICAgICAgICBpZiAoaXNGb2N1c2VkICE9PSB0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IGlzRm9jdXNlZDtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5wdXQoKSB7XG4gICAgICAgIC8vIFRoaXMgaXMgYSBub29wIGZ1bmN0aW9uIGFuZCBpcyB1c2VkIHRvIGxldCBBbmd1bGFyIGtub3cgd2hlbmV2ZXIgdGhlIHZhbHVlIGNoYW5nZXMuXG4gICAgICAgIC8vIEFuZ3VsYXIgd2lsbCBydW4gYSBuZXcgY2hhbmdlIGRldGVjdGlvbiBlYWNoIHRpbWUgdGhlIGBpbnB1dGAgZXZlbnQgaGFzIGJlZW4gZGlzcGF0Y2hlZC5cbiAgICAgICAgLy8gSXQncyBuZWNlc3NhcnkgdGhhdCBBbmd1bGFyIHJlY29nbml6ZXMgdGhlIHZhbHVlIGNoYW5nZSwgYmVjYXVzZSB3aGVuIGZsb2F0aW5nTGFiZWxcbiAgICAgICAgLy8gaXMgc2V0IHRvIGZhbHNlIGFuZCBBbmd1bGFyIGZvcm1zIGFyZW4ndCB1c2VkLCB0aGUgcGxhY2Vob2xkZXIgd29uJ3QgcmVjb2duaXplIHRoZVxuICAgICAgICAvLyB2YWx1ZSBjaGFuZ2VzIGFuZCB3aWxsIG5vdCBkaXNhcHBlYXIuXG4gICAgICAgIC8vIExpc3RlbmluZyB0byB0aGUgaW5wdXQgZXZlbnQgd291bGRuJ3QgYmUgbmVjZXNzYXJ5IHdoZW4gdGhlIGlucHV0IGlzIHVzaW5nIHRoZVxuICAgICAgICAvLyBGb3Jtc01vZHVsZSBvciBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBiZWNhdXNlIEFuZ3VsYXIgZm9ybXMgYWxzbyBsaXN0ZW5zIHRvIGlucHV0IGV2ZW50cy5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuaXNOZXZlckVtcHR5KCkgJiYgIXRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlICYmICF0aGlzLmlzQmFkSW5wdXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgb25Db250YWluZXJDbGljaygpIHtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cblxuICAgIC8qKiBEb2VzIHNvbWUgbWFudWFsIGRpcnR5IGNoZWNraW5nIG9uIHRoZSBuYXRpdmUgaW5wdXQgYHZhbHVlYCBwcm9wZXJ0eS4gKi9cbiAgICBwcm90ZWN0ZWQgZGlydHlDaGVja05hdGl2ZVZhbHVlKCkge1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMudmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMucHJldmlvdXNOYXRpdmVWYWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNOYXRpdmVWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIE1ha2Ugc3VyZSB0aGUgaW5wdXQgaXMgYSBzdXBwb3J0ZWQgdHlwZS4gKi9cbiAgICBwcm90ZWN0ZWQgdmFsaWRhdGVUeXBlKCkge1xuICAgICAgICBpZiAoTUNfSU5QVVRfSU5WQUxJRF9UWVBFUy5pbmRleE9mKHRoaXMuX3R5cGUpID4gLTEpIHtcbiAgICAgICAgICAgIHRocm93IGdldE1jSW5wdXRVbnN1cHBvcnRlZFR5cGVFcnJvcih0aGlzLl90eXBlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgdHlwZSBpcyBvbmUgb2YgdGhlIHR5cGVzIHRoYXQgYXJlIG5ldmVyIGVtcHR5LiAqL1xuICAgIHByb3RlY3RlZCBpc05ldmVyRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5ldmVyRW1wdHlJbnB1dFR5cGVzLmluZGV4T2YodGhpcy5fdHlwZSkgPiAtMTtcbiAgICB9XG5cbiAgICAvKiogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IGlzIGludmFsaWQgYmFzZWQgb24gdGhlIG5hdGl2ZSB2YWxpZGF0aW9uLiAqL1xuICAgIHByb3RlY3RlZCBpc0JhZElucHV0KCkge1xuICAgICAgICAvLyBUaGUgYHZhbGlkaXR5YCBwcm9wZXJ0eSB3b24ndCBiZSBwcmVzZW50IG9uIHBsYXRmb3JtLXNlcnZlci5cbiAgICAgICAgY29uc3QgdmFsaWRpdHkgPSAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsaWRpdHk7XG5cbiAgICAgICAgcmV0dXJuIHZhbGlkaXR5ICYmIHZhbGlkaXR5LmJhZElucHV0O1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdpbnB1dFttY0lucHV0TW9ub3NwYWNlXScsXG4gICAgZXhwb3J0QXM6ICdNY0lucHV0TW9ub3NwYWNlJyxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtaW5wdXRfbW9ub3NwYWNlJyB9XG59KVxuZXhwb3J0IGNsYXNzIE1jSW5wdXRNb25vIHt9XG4iXX0=