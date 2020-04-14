/**
 * @fileoverview added by tsickle
 * Generated from: input.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvaW5wdXQvIiwic291cmNlcyI6WyJpbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQy9ELE9BQU8sRUFFSCxTQUFTLEVBRVQsVUFBVSxFQUVWLE1BQU0sRUFDTixLQUFLLEVBR0wsUUFBUSxFQUNSLElBQUksRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0gsZUFBZSxFQUNmLGtCQUFrQixFQUNsQixhQUFhLEVBQ2IsU0FBUyxFQUNULE1BQU0sRUFDTixPQUFPLEVBRVYsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBR0gsaUJBQWlCLEVBQ2pCLGFBQWEsRUFFYixlQUFlLEVBQ2YsbUJBQW1CLEVBQ3RCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbkUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7O01BRzNELHNCQUFzQixHQUFHO0lBQzNCLFFBQVE7SUFDUixVQUFVO0lBQ1YsTUFBTTtJQUNOLFFBQVE7SUFDUixPQUFPO0lBQ1AsT0FBTztJQUNQLE9BQU87SUFDUCxPQUFPO0lBQ1AsUUFBUTtDQUNYOztJQUVHLFlBQVksR0FBRyxDQUFDO0FBRXBCLE1BQU0sT0FBTyxXQUFXOzs7Ozs7O0lBQ3BCLFlBQ1csd0JBQTJDLEVBQzNDLFVBQWtCLEVBQ2xC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Qyw4QkFBNkI7Ozs7O0lBRTdCLHNCQUE2Qzs7Ozs7SUFDN0Msc0NBQW1DOzs7OztJQUNuQyx1Q0FPaUQ7Ozs7O0lBMEJqRCw0QkFBMEI7Ozs7O0lBZTFCLHNCQUFvQjs7Ozs7SUFlcEIsNEJBQTBCOzs7OztJQXNCMUIsd0JBQXVCOzs7OztJQW1CdkIsc0NBQTRDOzs7OztJQUl4Qyw2QkFBZ0M7O0lBQ2hDLGdDQUE0RTs7Ozs7SUFDNUUsK0JBQTRFOztJQUU1RSw4QkFBcUQ7O0lBQ3JELDBCQUEyQzs7SUFDM0Msa0NBQTJEOztBQXNJbkUsTUFBTSxPQUFPLFdBQVc7OztZQUx2QixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixFQUFFO2FBQ3hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IGdldFN1cHBvcnRlZElucHV0VHlwZXMgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIERpcmVjdGl2ZSxcbiAgICBEb0NoZWNrLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9wdGlvbmFsLFxuICAgIFNlbGZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEZvcm1Db250cm9sTmFtZSxcbiAgICBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgTkdfVkFMSURBVE9SUyxcbiAgICBOZ0NvbnRyb2wsXG4gICAgTmdGb3JtLFxuICAgIE5nTW9kZWwsXG4gICAgVmFsaWRhdG9yXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gICAgQ2FuVXBkYXRlRXJyb3JTdGF0ZSxcbiAgICBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvcixcbiAgICBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICBNQ19WQUxJREFUSU9OLFxuICAgIE1jVmFsaWRhdGlvbk9wdGlvbnMsXG4gICAgbWl4aW5FcnJvclN0YXRlLFxuICAgIHNldE1vc2FpY1ZhbGlkYXRpb25cbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNGb3JtRmllbGRDb250cm9sIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBnZXRNY0lucHV0VW5zdXBwb3J0ZWRUeXBlRXJyb3IgfSBmcm9tICcuL2lucHV0LWVycm9ycyc7XG5pbXBvcnQgeyBNY051bWJlcklucHV0IH0gZnJvbSAnLi9pbnB1dC1udW1iZXInO1xuaW1wb3J0IHsgTUNfSU5QVVRfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICcuL2lucHV0LXZhbHVlLWFjY2Vzc29yJztcblxuXG5jb25zdCBNQ19JTlBVVF9JTlZBTElEX1RZUEVTID0gW1xuICAgICdidXR0b24nLFxuICAgICdjaGVja2JveCcsXG4gICAgJ2ZpbGUnLFxuICAgICdoaWRkZW4nLFxuICAgICdpbWFnZScsXG4gICAgJ3JhZGlvJyxcbiAgICAncmFuZ2UnLFxuICAgICdyZXNldCcsXG4gICAgJ3N1Ym1pdCdcbl07XG5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG5leHBvcnQgY2xhc3MgTWNJbnB1dEJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICAgICAgcHVibGljIHBhcmVudEZvcm06IE5nRm9ybSxcbiAgICAgICAgcHVibGljIHBhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgICAgICBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2xcbiAgICApIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jSW5wdXRNaXhpbkJhc2U6IENhblVwZGF0ZUVycm9yU3RhdGVDdG9yICYgdHlwZW9mIE1jSW5wdXRCYXNlID0gbWl4aW5FcnJvclN0YXRlKE1jSW5wdXRCYXNlKTtcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogYGlucHV0W21jSW5wdXRdYCxcbiAgICBleHBvcnRBczogJ21jSW5wdXQnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1pbnB1dCcsXG4gICAgICAgIC8vIE5hdGl2ZSBpbnB1dCBwcm9wZXJ0aWVzIHRoYXQgYXJlIG92ZXJ3cml0dGVuIGJ5IEFuZ3VsYXIgaW5wdXRzIG5lZWQgdG8gYmUgc3luY2VkIHdpdGhcbiAgICAgICAgLy8gdGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50LiBPdGhlcndpc2UgcHJvcGVydHkgYmluZGluZ3MgZm9yIHRob3NlIGRvbid0IHdvcmsuXG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgICAgICAnW2F0dHIucGxhY2Vob2xkZXJdJzogJ3BsYWNlaG9sZGVyJyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAgICAgJ1tyZXF1aXJlZF0nOiAncmVxdWlyZWQnLFxuICAgICAgICAnKGJsdXIpJzogJ29uQmx1cigpJyxcbiAgICAgICAgJyhmb2N1cyknOiAnZm9jdXNDaGFuZ2VkKHRydWUpJyxcbiAgICAgICAgJyhpbnB1dCknOiAnb25JbnB1dCgpJ1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbe1xuICAgICAgICBwcm92aWRlOiBNY0Zvcm1GaWVsZENvbnRyb2wsIHVzZUV4aXN0aW5nOiBNY0lucHV0XG4gICAgfV1cbn0pXG5leHBvcnQgY2xhc3MgTWNJbnB1dCBleHRlbmRzIE1jSW5wdXRNaXhpbkJhc2UgaW1wbGVtZW50cyBNY0Zvcm1GaWVsZENvbnRyb2w8YW55PiwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIERvQ2hlY2ssXG4gICAgQ2FuVXBkYXRlRXJyb3JTdGF0ZSwgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzIHtcblxuICAgIC8qKiBBbiBvYmplY3QgdXNlZCB0byBjb250cm9sIHdoZW4gZXJyb3IgbWVzc2FnZXMgYXJlIHNob3duLiAqL1xuICAgIEBJbnB1dCgpIGVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcjtcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgcmVhZG9ubHkgc3RhdGVDaGFuZ2VzOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBjb250cm9sVHlwZTogc3RyaW5nID0gJ21jLWlucHV0JztcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgcHJvdGVjdGVkIHVpZCA9IGBtYy1pbnB1dC0ke25leHRVbmlxdWVJZCsrfWA7XG4gICAgcHJvdGVjdGVkIHByZXZpb3VzTmF0aXZlVmFsdWU6IGFueTtcbiAgICBwcm90ZWN0ZWQgbmV2ZXJFbXB0eUlucHV0VHlwZXMgPSBbXG4gICAgICAgICdkYXRlJyxcbiAgICAgICAgJ2RhdGV0aW1lJyxcbiAgICAgICAgJ2RhdGV0aW1lLWxvY2FsJyxcbiAgICAgICAgJ21vbnRoJyxcbiAgICAgICAgJ3RpbWUnLFxuICAgICAgICAnd2VlaydcbiAgICBdLmZpbHRlcigodCkgPT4gZ2V0U3VwcG9ydGVkSW5wdXRUeXBlcygpLmhhcyh0KSk7XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLm5nQ29udHJvbCAmJiB0aGlzLm5nQ29udHJvbC5kaXNhYmxlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmdDb250cm9sLmRpc2FibGVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgLy8gQnJvd3NlcnMgbWF5IG5vdCBmaXJlIHRoZSBibHVyIGV2ZW50IGlmIHRoZSBpbnB1dCBpcyBkaXNhYmxlZCB0b28gcXVpY2tseS5cbiAgICAgICAgLy8gUmVzZXQgZnJvbSBoZXJlIHRvIGVuc3VyZSB0aGF0IHRoZSBlbGVtZW50IGRvZXNuJ3QgYmVjb21lIHN0dWNrLlxuICAgICAgICBpZiAodGhpcy5mb2N1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cblxuICAgIHNldCBpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2lkID0gdmFsdWUgfHwgdGhpcy51aWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVpcmVkO1xuICAgIH1cblxuICAgIHNldCByZXF1aXJlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9yZXF1aXJlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVxdWlyZWQgPSBmYWxzZTtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlIG5vLXJlc2VydmVkLWtleXdvcmRzXG4gICAgLyoqIElucHV0IHR5cGUgb2YgdGhlIGVsZW1lbnQuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgdHlwZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgICB9XG5cbiAgICBzZXQgdHlwZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3R5cGUgPSB2YWx1ZSB8fCAndGV4dCc7XG4gICAgICAgIHRoaXMudmFsaWRhdGVUeXBlKCk7XG5cbiAgICAgICAgLy8gV2hlbiB1c2luZyBBbmd1bGFyIGlucHV0cywgZGV2ZWxvcGVycyBhcmUgbm8gbG9uZ2VyIGFibGUgdG8gc2V0IHRoZSBwcm9wZXJ0aWVzIG9uIHRoZSBuYXRpdmVcbiAgICAgICAgLy8gaW5wdXQgZWxlbWVudC4gVG8gZW5zdXJlIHRoYXQgYmluZGluZ3MgZm9yIGB0eXBlYCB3b3JrLCB3ZSBuZWVkIHRvIHN5bmMgdGhlIHNldHRlclxuICAgICAgICAvLyB3aXRoIHRoZSBuYXRpdmUgcHJvcGVydHkuIFRleHRhcmVhIGVsZW1lbnRzIGRvbid0IHN1cHBvcnQgdGhlIHR5cGUgcHJvcGVydHkgb3IgYXR0cmlidXRlLlxuICAgICAgICBpZiAoZ2V0U3VwcG9ydGVkSW5wdXRUeXBlcygpLmhhcyh0aGlzLl90eXBlKSkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudHlwZSA9IHRoaXMuX3R5cGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gdHNsaW50OmVuYWJsZSBuby1yZXNlcnZlZC1rZXl3b3Jkc1xuXG4gICAgcHJpdmF0ZSBfdHlwZSA9ICd0ZXh0JztcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5wdXRWYWx1ZUFjY2Vzc29yLnZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5faW5wdXRWYWx1ZUFjY2Vzc29yLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG9ydGhvZG94LWdldHRlci1hbmQtc2V0dGVyXG4gICAgcHJpdmF0ZSBfaW5wdXRWYWx1ZUFjY2Vzc29yOiB7IHZhbHVlOiBhbnkgfTtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgQEluamVjdChOR19WQUxJREFUT1JTKSBwdWJsaWMgcmF3VmFsaWRhdG9yczogVmFsaWRhdG9yW10sXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfVkFMSURBVElPTikgcHJpdmF0ZSBtY1ZhbGlkYXRpb246IE1jVmFsaWRhdGlvbk9wdGlvbnMsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIG51bWJlcklucHV0OiBNY051bWJlcklucHV0LFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHB1YmxpYyBuZ01vZGVsOiBOZ01vZGVsLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHB1YmxpYyBmb3JtQ29udHJvbE5hbWU6IEZvcm1Db250cm9sTmFtZSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcGFyZW50Rm9ybTogTmdGb3JtLFxuICAgICAgICBAT3B0aW9uYWwoKSBwYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICAgICAgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE1DX0lOUFVUX1ZBTFVFX0FDQ0VTU09SKSBpbnB1dFZhbHVlQWNjZXNzb3I6IGFueVxuICAgICkge1xuICAgICAgICBzdXBlcihkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXIsIHBhcmVudEZvcm0sIHBhcmVudEZvcm1Hcm91cCwgbmdDb250cm9sKTtcblxuICAgICAgICAvLyBJZiBubyBpbnB1dCB2YWx1ZSBhY2Nlc3NvciB3YXMgZXhwbGljaXRseSBzcGVjaWZpZWQsIHVzZSB0aGUgZWxlbWVudCBhcyB0aGUgaW5wdXQgdmFsdWVcbiAgICAgICAgLy8gYWNjZXNzb3IuXG4gICAgICAgIHRoaXMuX2lucHV0VmFsdWVBY2Nlc3NvciA9IGlucHV0VmFsdWVBY2Nlc3NvciB8fCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgICB0aGlzLnByZXZpb3VzTmF0aXZlVmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgICAgIC8vIEZvcmNlIHNldHRlciB0byBiZSBjYWxsZWQgaW4gY2FzZSBpZCB3YXMgbm90IHNwZWNpZmllZC5cbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuaWQ7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMubmdDb250cm9sKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmICh0aGlzLm1jVmFsaWRhdGlvbi51c2VWYWxpZGF0aW9uKSB7XG4gICAgICAgICAgICBzZXRNb3NhaWNWYWxpZGF0aW9uKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoKSB7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBuZ0RvQ2hlY2soKSB7XG4gICAgICAgIGlmICh0aGlzLm5nQ29udHJvbCkge1xuICAgICAgICAgICAgLy8gV2UgbmVlZCB0byByZS1ldmFsdWF0ZSB0aGlzIG9uIGV2ZXJ5IGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUsIGJlY2F1c2UgdGhlcmUgYXJlIHNvbWVcbiAgICAgICAgICAgIC8vIGVycm9yIHRyaWdnZXJzIHRoYXQgd2UgY2FuJ3Qgc3Vic2NyaWJlIHRvIChlLmcuIHBhcmVudCBmb3JtIHN1Ym1pc3Npb25zKS4gVGhpcyBtZWFuc1xuICAgICAgICAgICAgLy8gdGhhdCB3aGF0ZXZlciBsb2dpYyBpcyBpbiBoZXJlIGhhcyB0byBiZSBzdXBlciBsZWFuIG9yIHdlIHJpc2sgZGVzdHJveWluZyB0aGUgcGVyZm9ybWFuY2UuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUVycm9yU3RhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gZGlydHktY2hlY2sgdGhlIG5hdGl2ZSBlbGVtZW50J3MgdmFsdWUsIGJlY2F1c2UgdGhlcmUgYXJlIHNvbWUgY2FzZXMgd2hlcmVcbiAgICAgICAgLy8gd2Ugd29uJ3QgYmUgbm90aWZpZWQgd2hlbiBpdCBjaGFuZ2VzIChlLmcuIHRoZSBjb25zdW1lciBpc24ndCB1c2luZyBmb3JtcyBvciB0aGV5J3JlXG4gICAgICAgIC8vIHVwZGF0aW5nIHRoZSB2YWx1ZSB1c2luZyBgZW1pdEV2ZW50OiBmYWxzZWApLlxuICAgICAgICB0aGlzLmRpcnR5Q2hlY2tOYXRpdmVWYWx1ZSgpO1xuICAgIH1cblxuICAgIC8qKiBGb2N1c2VzIHRoZSBpbnB1dC4gKi9cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBvbkJsdXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9jdXNDaGFuZ2VkKGZhbHNlKTtcblxuICAgICAgICBpZiAodGhpcy5uZ0NvbnRyb2wgJiYgdGhpcy5uZ0NvbnRyb2wuY29udHJvbCkge1xuICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMubmdDb250cm9sLmNvbnRyb2w7XG5cbiAgICAgICAgICAgIGNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgICAgICAgICAoY29udHJvbC5zdGF0dXNDaGFuZ2VzIGFzIEV2ZW50RW1pdHRlcjxzdHJpbmc+KS5lbWl0KGNvbnRyb2wuc3RhdHVzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBDYWxsYmFjayBmb3IgdGhlIGNhc2VzIHdoZXJlIHRoZSBmb2N1c2VkIHN0YXRlIG9mIHRoZSBpbnB1dCBjaGFuZ2VzLiAqL1xuICAgIGZvY3VzQ2hhbmdlZChpc0ZvY3VzZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKGlzRm9jdXNlZCAhPT0gdGhpcy5mb2N1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSBpc0ZvY3VzZWQ7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbklucHV0KCkge1xuICAgICAgICAvLyBUaGlzIGlzIGEgbm9vcCBmdW5jdGlvbiBhbmQgaXMgdXNlZCB0byBsZXQgQW5ndWxhciBrbm93IHdoZW5ldmVyIHRoZSB2YWx1ZSBjaGFuZ2VzLlxuICAgICAgICAvLyBBbmd1bGFyIHdpbGwgcnVuIGEgbmV3IGNoYW5nZSBkZXRlY3Rpb24gZWFjaCB0aW1lIHRoZSBgaW5wdXRgIGV2ZW50IGhhcyBiZWVuIGRpc3BhdGNoZWQuXG4gICAgICAgIC8vIEl0J3MgbmVjZXNzYXJ5IHRoYXQgQW5ndWxhciByZWNvZ25pemVzIHRoZSB2YWx1ZSBjaGFuZ2UsIGJlY2F1c2Ugd2hlbiBmbG9hdGluZ0xhYmVsXG4gICAgICAgIC8vIGlzIHNldCB0byBmYWxzZSBhbmQgQW5ndWxhciBmb3JtcyBhcmVuJ3QgdXNlZCwgdGhlIHBsYWNlaG9sZGVyIHdvbid0IHJlY29nbml6ZSB0aGVcbiAgICAgICAgLy8gdmFsdWUgY2hhbmdlcyBhbmQgd2lsbCBub3QgZGlzYXBwZWFyLlxuICAgICAgICAvLyBMaXN0ZW5pbmcgdG8gdGhlIGlucHV0IGV2ZW50IHdvdWxkbid0IGJlIG5lY2Vzc2FyeSB3aGVuIHRoZSBpbnB1dCBpcyB1c2luZyB0aGVcbiAgICAgICAgLy8gRm9ybXNNb2R1bGUgb3IgUmVhY3RpdmVGb3Jtc01vZHVsZSwgYmVjYXVzZSBBbmd1bGFyIGZvcm1zIGFsc28gbGlzdGVucyB0byBpbnB1dCBldmVudHMuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldCBlbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzTmV2ZXJFbXB0eSgpICYmICF0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSAmJiAhdGhpcy5pc0JhZElucHV0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uQ29udGFpbmVyQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvKiogRG9lcyBzb21lIG1hbnVhbCBkaXJ0eSBjaGVja2luZyBvbiB0aGUgbmF0aXZlIGlucHV0IGB2YWx1ZWAgcHJvcGVydHkuICovXG4gICAgcHJvdGVjdGVkIGRpcnR5Q2hlY2tOYXRpdmVWYWx1ZSgpIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLnByZXZpb3VzTmF0aXZlVmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzTmF0aXZlVmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBNYWtlIHN1cmUgdGhlIGlucHV0IGlzIGEgc3VwcG9ydGVkIHR5cGUuICovXG4gICAgcHJvdGVjdGVkIHZhbGlkYXRlVHlwZSgpIHtcbiAgICAgICAgaWYgKE1DX0lOUFVUX0lOVkFMSURfVFlQRVMuaW5kZXhPZih0aGlzLl90eXBlKSA+IC0xKSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRNY0lucHV0VW5zdXBwb3J0ZWRUeXBlRXJyb3IodGhpcy5fdHlwZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IHR5cGUgaXMgb25lIG9mIHRoZSB0eXBlcyB0aGF0IGFyZSBuZXZlciBlbXB0eS4gKi9cbiAgICBwcm90ZWN0ZWQgaXNOZXZlckVtcHR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uZXZlckVtcHR5SW5wdXRUeXBlcy5pbmRleE9mKHRoaXMuX3R5cGUpID4gLTE7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBpbnZhbGlkIGJhc2VkIG9uIHRoZSBuYXRpdmUgdmFsaWRhdGlvbi4gKi9cbiAgICBwcm90ZWN0ZWQgaXNCYWRJbnB1dCgpIHtcbiAgICAgICAgLy8gVGhlIGB2YWxpZGl0eWAgcHJvcGVydHkgd29uJ3QgYmUgcHJlc2VudCBvbiBwbGF0Zm9ybS1zZXJ2ZXIuXG4gICAgICAgIGNvbnN0IHZhbGlkaXR5ID0gKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbGlkaXR5O1xuXG4gICAgICAgIHJldHVybiB2YWxpZGl0eSAmJiB2YWxpZGl0eS5iYWRJbnB1dDtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnaW5wdXRbbWNJbnB1dE1vbm9zcGFjZV0nLFxuICAgIGV4cG9ydEFzOiAnTWNJbnB1dE1vbm9zcGFjZScsXG4gICAgaG9zdDogeyBjbGFzczogJ21jLWlucHV0X21vbm9zcGFjZScgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0lucHV0TW9ubyB7fVxuIl19