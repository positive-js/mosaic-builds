/**
 * @fileoverview added by tsickle
 * Generated from: validation/validation.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
import { RequiredValidator } from '@angular/forms';
/**
 * @record
 */
export function McValidationOptions() { }
if (false) {
    /** @type {?} */
    McValidationOptions.prototype.useValidation;
}
/** @type {?} */
export var MC_VALIDATION = new InjectionToken('McUseValidation', { factory: (/**
     * @return {?}
     */
    function () { return ({ useValidation: true }); }) });
/**
 * @param {?} control
 * @param {?} validator
 * @return {?}
 */
function setValidState(control, validator) {
    if (!control) {
        return;
    }
    control.clearValidators();
    control.updateValueAndValidity({ emitEvent: false });
    control.setValidators(validator);
}
/**
 * This function do next:
 * - run validation on submitting parent form
 * - prevent validation in required validator if form doesn't submitted
 * - if control has focus validation will be prevented
 * @param {?} component
 * @return {?}
 */
export function setMosaicValidation(component) {
    /** @type {?} */
    var ngControl = component.ngControl;
    if (!ngControl) {
        return;
    }
    /** @type {?} */
    var parentForm = component.parentForm || component.parentFormGroup;
    if (parentForm) {
        parentForm.ngSubmit.subscribe((/**
         * @return {?}
         */
        function () {
            // tslint:disable-next-line: no-unnecessary-type-assertion
            (/** @type {?} */ (ngControl.control)).updateValueAndValidity({ emitEvent: false });
        }));
    }
    if (component.ngModel) {
        setMosaicValidationForModelControl(component, component.rawValidators, parentForm);
    }
    else if (component.formControlName || component.ngControl) {
        setMosaicValidationForFormControl(component, parentForm, ngControl);
    }
}
/**
 * @param {?} component
 * @param {?} validators
 * @param {?} parentForm
 * @return {?}
 */
export function setMosaicValidationForModelControl(component, validators, parentForm) {
    if (!validators) {
        return;
    }
    validators.forEach((/**
     * @param {?} validator
     * @return {?}
     */
    function (validator) {
        // tslint:disable-next-line: no-unbound-method
        /** @type {?} */
        var originalValidate = validator.validate;
        if (validator instanceof RequiredValidator) {
            // changed required validation logic
            validator.validate = (/**
             * @param {?} control
             * @return {?}
             */
            function (control) {
                if (parentForm && !parentForm.submitted) {
                    return null;
                }
                return originalValidate.call(validator, control);
            });
        }
        else {
            // changed all other validation logic
            validator.validate = (/**
             * @param {?} control
             * @return {?}
             */
            function (control) {
                if (component.focused) {
                    return null;
                }
                return originalValidate.call(validator, control);
            });
        }
    }));
}
/**
 * @param {?} component
 * @param {?} parentForm
 * @param {?} ngControl
 * @return {?}
 */
export function setMosaicValidationForFormControl(component, parentForm, ngControl) {
    /** @type {?} */
    var originalValidator = (/** @type {?} */ (ngControl.control)).validator;
    // changed required validation logic after initialization
    if (ngControl.invalid && (/** @type {?} */ (ngControl.errors)).required) {
        Promise.resolve().then((/**
         * @return {?}
         */
        function () { return setValidState((/** @type {?} */ (ngControl.control)), (/** @type {?} */ (originalValidator))); }));
    }
    // check dynamic updates
    (/** @type {?} */ (ngControl.statusChanges)).subscribe((/**
     * @return {?}
     */
    function () {
        // changed required validation logic
        if (ngControl.invalid && (parentForm && !parentForm.submitted) && (/** @type {?} */ (ngControl.errors)).required) {
            setValidState((/** @type {?} */ (ngControl.control)), (/** @type {?} */ (originalValidator)));
        }
        // changed all other validation logic
        if (ngControl.invalid && component.focused) {
            setValidState((/** @type {?} */ (ngControl.control)), (/** @type {?} */ (originalValidator)));
        }
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlLyIsInNvdXJjZXMiOlsidmFsaWRhdGlvbi92YWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBSUgsaUJBQWlCLEVBSXBCLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFJeEIseUNBRUM7OztJQURHLDRDQUF1Qjs7O0FBRzNCLE1BQU0sS0FBTyxhQUFhLEdBQUcsSUFBSSxjQUFjLENBQzNDLGlCQUFpQixFQUNqQixFQUFFLE9BQU87OztJQUFFLGNBQU0sT0FBQSxDQUFDLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQXpCLENBQXlCLENBQUEsRUFBRSxDQUMzQzs7Ozs7O0FBR0wsU0FBUyxhQUFhLENBQUMsT0FBd0IsRUFBRSxTQUFzQjtJQUNuRSxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQUUsT0FBTztLQUFFO0lBRXpCLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMxQixPQUFPLENBQUMsc0JBQXNCLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNyRCxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3JDLENBQUM7Ozs7Ozs7OztBQVFELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxTQUFTOztRQUNuQyxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVM7SUFFckMsSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUFFLE9BQU87S0FBRTs7UUFFckIsVUFBVSxHQUFXLFNBQVMsQ0FBQyxVQUFVLElBQUksU0FBUyxDQUFDLGVBQWU7SUFFNUUsSUFBSSxVQUFVLEVBQUU7UUFDWixVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVM7OztRQUFDO1lBQzFCLDBEQUEwRDtZQUMxRCxtQkFBQSxTQUFTLENBQUMsT0FB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bmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBBYnN0cmFjdENvbnRyb2wsXG4gICAgTmdDb250cm9sLFxuICAgIE5nRm9ybSxcbiAgICBSZXF1aXJlZFZhbGlkYXRvcixcbiAgICBWYWxpZGF0aW9uRXJyb3JzLFxuICAgIFZhbGlkYXRvcixcbiAgICBWYWxpZGF0b3JGblxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIE1jVmFsaWRhdGlvbk9wdGlvbnMge1xuICAgIHVzZVZhbGlkYXRpb246IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjb25zdCBNQ19WQUxJREFUSU9OID0gbmV3IEluamVjdGlvblRva2VuPE1jVmFsaWRhdGlvbk9wdGlvbnM+KFxuICAgICdNY1VzZVZhbGlkYXRpb24nLFxuICAgIHsgZmFjdG9yeTogKCkgPT4gKHsgdXNlVmFsaWRhdGlvbjogdHJ1ZSB9KSB9XG4gICAgKTtcblxuXG5mdW5jdGlvbiBzZXRWYWxpZFN0YXRlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgdmFsaWRhdG9yOiBWYWxpZGF0b3JGbik6IHZvaWQge1xuICAgIGlmICghY29udHJvbCkgeyByZXR1cm47IH1cblxuICAgIGNvbnRyb2wuY2xlYXJWYWxpZGF0b3JzKCk7XG4gICAgY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICBjb250cm9sLnNldFZhbGlkYXRvcnModmFsaWRhdG9yKTtcbn1cblxuXG4vKiogVGhpcyBmdW5jdGlvbiBkbyBuZXh0OlxuICogLSBydW4gdmFsaWRhdGlvbiBvbiBzdWJtaXR0aW5nIHBhcmVudCBmb3JtXG4gKiAtIHByZXZlbnQgdmFsaWRhdGlvbiBpbiByZXF1aXJlZCB2YWxpZGF0b3IgaWYgZm9ybSBkb2Vzbid0IHN1Ym1pdHRlZFxuICogLSBpZiBjb250cm9sIGhhcyBmb2N1cyB2YWxpZGF0aW9uIHdpbGwgYmUgcHJldmVudGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRNb3NhaWNWYWxpZGF0aW9uKGNvbXBvbmVudCkge1xuICAgIGNvbnN0IG5nQ29udHJvbCA9IGNvbXBvbmVudC5uZ0NvbnRyb2w7XG5cbiAgICBpZiAoIW5nQ29udHJvbCkgeyByZXR1cm47IH1cblxuICAgIGNvbnN0IHBhcmVudEZvcm06IE5nRm9ybSA9IGNvbXBvbmVudC5wYXJlbnRGb3JtIHx8IGNvbXBvbmVudC5wYXJlbnRGb3JtR3JvdXA7XG5cbiAgICBpZiAocGFyZW50Rm9ybSkge1xuICAgICAgICBwYXJlbnRGb3JtLm5nU3VibWl0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVubmVjZXNzYXJ5LXR5cGUtYXNzZXJ0aW9uXG4gICAgICAgICAgICBuZ0NvbnRyb2wuY29udHJvbCEudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChjb21wb25lbnQubmdNb2RlbCkge1xuICAgICAgICBzZXRNb3NhaWNWYWxpZGF0aW9uRm9yTW9kZWxDb250cm9sKGNvbXBvbmVudCwgY29tcG9uZW50LnJhd1ZhbGlkYXRvcnMsIHBhcmVudEZvcm0pO1xuICAgIH0gZWxzZSBpZiAoY29tcG9uZW50LmZvcm1Db250cm9sTmFtZSB8fCBjb21wb25lbnQubmdDb250cm9sKSB7XG4gICAgICAgIHNldE1vc2FpY1ZhbGlkYXRpb25Gb3JGb3JtQ29udHJvbChjb21wb25lbnQsIHBhcmVudEZvcm0sIG5nQ29udHJvbCk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHNldE1vc2FpY1ZhbGlkYXRpb25Gb3JNb2RlbENvbnRyb2woY29tcG9uZW50LCB2YWxpZGF0b3JzOiBWYWxpZGF0b3JbXSwgcGFyZW50Rm9ybTogTmdGb3JtKSB7XG4gICAgaWYgKCF2YWxpZGF0b3JzKSB7IHJldHVybjsgfVxuXG4gICAgdmFsaWRhdG9ycy5mb3JFYWNoKCh2YWxpZGF0b3I6IFZhbGlkYXRvcikgPT4ge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVuYm91bmQtbWV0aG9kXG4gICAgICAgIGNvbnN0IG9yaWdpbmFsVmFsaWRhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGU7XG5cbiAgICAgICAgaWYgKHZhbGlkYXRvciBpbnN0YW5jZW9mIFJlcXVpcmVkVmFsaWRhdG9yKSB7XG4gICAgICAgICAgICAvLyBjaGFuZ2VkIHJlcXVpcmVkIHZhbGlkYXRpb24gbG9naWNcbiAgICAgICAgICAgIHZhbGlkYXRvci52YWxpZGF0ZSA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudEZvcm0gJiYgIXBhcmVudEZvcm0uc3VibWl0dGVkKSB7IHJldHVybiBudWxsOyB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gb3JpZ2luYWxWYWxpZGF0ZS5jYWxsKHZhbGlkYXRvciwgY29udHJvbCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY2hhbmdlZCBhbGwgb3RoZXIgdmFsaWRhdGlvbiBsb2dpY1xuICAgICAgICAgICAgdmFsaWRhdG9yLnZhbGlkYXRlID0gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50LmZvY3VzZWQpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbFZhbGlkYXRlLmNhbGwodmFsaWRhdG9yLCBjb250cm9sKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldE1vc2FpY1ZhbGlkYXRpb25Gb3JGb3JtQ29udHJvbChjb21wb25lbnQsIHBhcmVudEZvcm06IE5nRm9ybSwgbmdDb250cm9sOiBOZ0NvbnRyb2wpIHtcbiAgICBjb25zdCBvcmlnaW5hbFZhbGlkYXRvciA9IG5nQ29udHJvbC5jb250cm9sIS52YWxpZGF0b3I7XG5cbiAgICAvLyBjaGFuZ2VkIHJlcXVpcmVkIHZhbGlkYXRpb24gbG9naWMgYWZ0ZXIgaW5pdGlhbGl6YXRpb25cbiAgICBpZiAobmdDb250cm9sLmludmFsaWQgJiYgbmdDb250cm9sLmVycm9ycyEucmVxdWlyZWQpIHtcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiBzZXRWYWxpZFN0YXRlKG5nQ29udHJvbC5jb250cm9sISwgb3JpZ2luYWxWYWxpZGF0b3IhKSk7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgZHluYW1pYyB1cGRhdGVzXG4gICAgbmdDb250cm9sLnN0YXR1c0NoYW5nZXMhXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgLy8gY2hhbmdlZCByZXF1aXJlZCB2YWxpZGF0aW9uIGxvZ2ljXG4gICAgICAgICAgICBpZiAobmdDb250cm9sLmludmFsaWQgJiYgKHBhcmVudEZvcm0gJiYgIXBhcmVudEZvcm0uc3VibWl0dGVkKSAmJiBuZ0NvbnRyb2wuZXJyb3JzIS5yZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgIHNldFZhbGlkU3RhdGUobmdDb250cm9sLmNvbnRyb2whLCBvcmlnaW5hbFZhbGlkYXRvciEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjaGFuZ2VkIGFsbCBvdGhlciB2YWxpZGF0aW9uIGxvZ2ljXG4gICAgICAgICAgICBpZiAobmdDb250cm9sLmludmFsaWQgJiYgY29tcG9uZW50LmZvY3VzZWQpIHtcbiAgICAgICAgICAgICAgICBzZXRWYWxpZFN0YXRlKG5nQ29udHJvbC5jb250cm9sISwgb3JpZ2luYWxWYWxpZGF0b3IhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG59XG4iXX0=