/**
 * @fileoverview added by tsickle
 * Generated from: validation/validation.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
export const MC_VALIDATION = new InjectionToken('McUseValidation', { factory: (/**
     * @return {?}
     */
    () => ({ useValidation: true })) });
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
    const ngControl = component.ngControl;
    if (!ngControl) {
        return;
    }
    /** @type {?} */
    const parentForm = component.parentForm || component.parentFormGroup;
    if (parentForm) {
        parentForm.ngSubmit.subscribe((/**
         * @return {?}
         */
        () => {
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
    (validator) => {
        // tslint:disable-next-line: no-unbound-method
        /** @type {?} */
        const originalValidate = validator.validate;
        if (validator instanceof RequiredValidator) {
            // changed required validation logic
            validator.validate = (/**
             * @param {?} control
             * @return {?}
             */
            (control) => {
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
            (control) => {
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
    const originalValidator = (/** @type {?} */ (ngControl.control)).validator;
    // changed required validation logic after initialization
    if (ngControl.invalid && (/** @type {?} */ (ngControl.errors)).required) {
        Promise.resolve().then((/**
         * @return {?}
         */
        () => setValidState((/** @type {?} */ (ngControl.control)), (/** @type {?} */ (originalValidator)))));
    }
    // check dynamic updates
    (/** @type {?} */ (ngControl.statusChanges)).subscribe((/**
     * @return {?}
     */
    () => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL2NvcmUvIiwic291cmNlcyI6WyJ2YWxpZGF0aW9uL3ZhbGlkYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFJSCxpQkFBaUIsRUFJcEIsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUl4Qix5Q0FFQzs7O0lBREcsNENBQXVCOzs7QUFHM0IsTUFBTSxPQUFPLGFBQWEsR0FBRyxJQUFJLGNBQWMsQ0FDM0MsaUJBQWlCLEVBQ2pCLEVBQUUsT0FBTzs7O0lBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBLEVBQUUsQ0FDM0M7Ozs7OztBQUdMLFNBQVMsYUFBYSxDQUFDLE9BQXdCLEVBQUUsU0FBc0I7SUFDbkUsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUFFLE9BQU87S0FBRTtJQUV6QixPQUFPLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDMUIsT0FBTyxDQUFDLHNCQUFzQixDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDckQsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNyQyxDQUFDOzs7Ozs7Ozs7QUFRRCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsU0FBUzs7VUFDbkMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTO0lBRXJDLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFBRSxPQUFPO0tBQUU7O1VBRXJCLFVBQVUsR0FBVyxTQUFTLENBQUMsVUFBVSxJQUFJLFNBQVMsQ0FBQyxlQUFlO0lBRTVFLElBQUksVUFBVSxFQUFFO1FBQ1osVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTOzs7UUFBQyxHQUFHLEVBQUU7WUFDL0IsMERBQTBEO1lBQzFELG1C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c291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQWJzdHJhY3RDb250cm9sLFxuICAgIE5nQ29udHJvbCxcbiAgICBOZ0Zvcm0sXG4gICAgUmVxdWlyZWRWYWxpZGF0b3IsXG4gICAgVmFsaWRhdGlvbkVycm9ycyxcbiAgICBWYWxpZGF0b3IsXG4gICAgVmFsaWRhdG9yRm5cbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBNY1ZhbGlkYXRpb25PcHRpb25zIHtcbiAgICB1c2VWYWxpZGF0aW9uOiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgTUNfVkFMSURBVElPTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxNY1ZhbGlkYXRpb25PcHRpb25zPihcbiAgICAnTWNVc2VWYWxpZGF0aW9uJyxcbiAgICB7IGZhY3Rvcnk6ICgpID0+ICh7IHVzZVZhbGlkYXRpb246IHRydWUgfSkgfVxuICAgICk7XG5cblxuZnVuY3Rpb24gc2V0VmFsaWRTdGF0ZShjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIHZhbGlkYXRvcjogVmFsaWRhdG9yRm4pOiB2b2lkIHtcbiAgICBpZiAoIWNvbnRyb2wpIHsgcmV0dXJuOyB9XG5cbiAgICBjb250cm9sLmNsZWFyVmFsaWRhdG9ycygpO1xuICAgIGNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgY29udHJvbC5zZXRWYWxpZGF0b3JzKHZhbGlkYXRvcik7XG59XG5cblxuLyoqIFRoaXMgZnVuY3Rpb24gZG8gbmV4dDpcbiAqIC0gcnVuIHZhbGlkYXRpb24gb24gc3VibWl0dGluZyBwYXJlbnQgZm9ybVxuICogLSBwcmV2ZW50IHZhbGlkYXRpb24gaW4gcmVxdWlyZWQgdmFsaWRhdG9yIGlmIGZvcm0gZG9lc24ndCBzdWJtaXR0ZWRcbiAqIC0gaWYgY29udHJvbCBoYXMgZm9jdXMgdmFsaWRhdGlvbiB3aWxsIGJlIHByZXZlbnRlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0TW9zYWljVmFsaWRhdGlvbihjb21wb25lbnQpIHtcbiAgICBjb25zdCBuZ0NvbnRyb2wgPSBjb21wb25lbnQubmdDb250cm9sO1xuXG4gICAgaWYgKCFuZ0NvbnRyb2wpIHsgcmV0dXJuOyB9XG5cbiAgICBjb25zdCBwYXJlbnRGb3JtOiBOZ0Zvcm0gPSBjb21wb25lbnQucGFyZW50Rm9ybSB8fCBjb21wb25lbnQucGFyZW50Rm9ybUdyb3VwO1xuXG4gICAgaWYgKHBhcmVudEZvcm0pIHtcbiAgICAgICAgcGFyZW50Rm9ybS5uZ1N1Ym1pdC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bm5lY2Vzc2FyeS10eXBlLWFzc2VydGlvblxuICAgICAgICAgICAgbmdDb250cm9sLmNvbnRyb2whLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoY29tcG9uZW50Lm5nTW9kZWwpIHtcbiAgICAgICAgc2V0TW9zYWljVmFsaWRhdGlvbkZvck1vZGVsQ29udHJvbChjb21wb25lbnQsIGNvbXBvbmVudC5yYXdWYWxpZGF0b3JzLCBwYXJlbnRGb3JtKTtcbiAgICB9IGVsc2UgaWYgKGNvbXBvbmVudC5mb3JtQ29udHJvbE5hbWUgfHwgY29tcG9uZW50Lm5nQ29udHJvbCkge1xuICAgICAgICBzZXRNb3NhaWNWYWxpZGF0aW9uRm9yRm9ybUNvbnRyb2woY29tcG9uZW50LCBwYXJlbnRGb3JtLCBuZ0NvbnRyb2wpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXRNb3NhaWNWYWxpZGF0aW9uRm9yTW9kZWxDb250cm9sKGNvbXBvbmVudCwgdmFsaWRhdG9yczogVmFsaWRhdG9yW10sIHBhcmVudEZvcm06IE5nRm9ybSkge1xuICAgIGlmICghdmFsaWRhdG9ycykgeyByZXR1cm47IH1cblxuICAgIHZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yOiBWYWxpZGF0b3IpID0+IHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bmJvdW5kLW1ldGhvZFxuICAgICAgICBjb25zdCBvcmlnaW5hbFZhbGlkYXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlO1xuXG4gICAgICAgIGlmICh2YWxpZGF0b3IgaW5zdGFuY2VvZiBSZXF1aXJlZFZhbGlkYXRvcikge1xuICAgICAgICAgICAgLy8gY2hhbmdlZCByZXF1aXJlZCB2YWxpZGF0aW9uIGxvZ2ljXG4gICAgICAgICAgICB2YWxpZGF0b3IudmFsaWRhdGUgPSAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnRGb3JtICYmICFwYXJlbnRGb3JtLnN1Ym1pdHRlZCkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsVmFsaWRhdGUuY2FsbCh2YWxpZGF0b3IsIGNvbnRyb2wpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNoYW5nZWQgYWxsIG90aGVyIHZhbGlkYXRpb24gbG9naWNcbiAgICAgICAgICAgIHZhbGlkYXRvci52YWxpZGF0ZSA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5mb2N1c2VkKSB7IHJldHVybiBudWxsOyB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gb3JpZ2luYWxWYWxpZGF0ZS5jYWxsKHZhbGlkYXRvciwgY29udHJvbCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRNb3NhaWNWYWxpZGF0aW9uRm9yRm9ybUNvbnRyb2woY29tcG9uZW50LCBwYXJlbnRGb3JtOiBOZ0Zvcm0sIG5nQ29udHJvbDogTmdDb250cm9sKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxWYWxpZGF0b3IgPSBuZ0NvbnRyb2wuY29udHJvbCEudmFsaWRhdG9yO1xuXG4gICAgLy8gY2hhbmdlZCByZXF1aXJlZCB2YWxpZGF0aW9uIGxvZ2ljIGFmdGVyIGluaXRpYWxpemF0aW9uXG4gICAgaWYgKG5nQ29udHJvbC5pbnZhbGlkICYmIG5nQ29udHJvbC5lcnJvcnMhLnJlcXVpcmVkKSB7XG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gc2V0VmFsaWRTdGF0ZShuZ0NvbnRyb2wuY29udHJvbCEsIG9yaWdpbmFsVmFsaWRhdG9yISkpO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGR5bmFtaWMgdXBkYXRlc1xuICAgIG5nQ29udHJvbC5zdGF0dXNDaGFuZ2VzIVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIC8vIGNoYW5nZWQgcmVxdWlyZWQgdmFsaWRhdGlvbiBsb2dpY1xuICAgICAgICAgICAgaWYgKG5nQ29udHJvbC5pbnZhbGlkICYmIChwYXJlbnRGb3JtICYmICFwYXJlbnRGb3JtLnN1Ym1pdHRlZCkgJiYgbmdDb250cm9sLmVycm9ycyEucmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICBzZXRWYWxpZFN0YXRlKG5nQ29udHJvbC5jb250cm9sISwgb3JpZ2luYWxWYWxpZGF0b3IhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2hhbmdlZCBhbGwgb3RoZXIgdmFsaWRhdGlvbiBsb2dpY1xuICAgICAgICAgICAgaWYgKG5nQ29udHJvbC5pbnZhbGlkICYmIGNvbXBvbmVudC5mb2N1c2VkKSB7XG4gICAgICAgICAgICAgICAgc2V0VmFsaWRTdGF0ZShuZ0NvbnRyb2wuY29udHJvbCEsIG9yaWdpbmFsVmFsaWRhdG9yISk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xufVxuIl19