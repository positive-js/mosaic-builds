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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlLyIsInNvdXJjZXMiOlsidmFsaWRhdGlvbi92YWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBSUgsaUJBQWlCLEVBSXBCLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFJeEIseUNBRUM7OztJQURHLDRDQUF1Qjs7O0FBRzNCLE1BQU0sT0FBTyxhQUFhLEdBQUcsSUFBSSxjQUFjLENBQzNDLGlCQUFpQixFQUNqQixFQUFFLE9BQU87OztJQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQSxFQUFFLENBQzNDOzs7Ozs7QUFHTCxTQUFTLGFBQWEsQ0FBQyxPQUF3QixFQUFFLFNBQXNCO0lBQ25FLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFBRSxPQUFPO0tBQUU7SUFFekIsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzFCLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDckMsQ0FBQzs7Ozs7Ozs7O0FBUUQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLFNBQVM7O1VBQ25DLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUztJQUVyQyxJQUFJLENBQUMsU0FBUyxFQUFFO1FBQUUsT0FBTztLQUFFOztVQUVyQixVQUFVLEdBQVcsU0FBUyxDQUFDLFVBQVUsSUFBSSxTQUFTLENBQUMsZUFBZTtJQUU1RSxJQUFJLFVBQVUsRUFBRTtRQUNaLFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFO1lBQy9CLDBEQUEwRDtZQUMxRCxtQkFBQSxTQUFTLENBQUMs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IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEFic3RyYWN0Q29udHJvbCxcbiAgICBOZ0NvbnRyb2wsXG4gICAgTmdGb3JtLFxuICAgIFJlcXVpcmVkVmFsaWRhdG9yLFxuICAgIFZhbGlkYXRpb25FcnJvcnMsXG4gICAgVmFsaWRhdG9yLFxuICAgIFZhbGlkYXRvckZuXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgTWNWYWxpZGF0aW9uT3B0aW9ucyB7XG4gICAgdXNlVmFsaWRhdGlvbjogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IE1DX1ZBTElEQVRJT04gPSBuZXcgSW5qZWN0aW9uVG9rZW48TWNWYWxpZGF0aW9uT3B0aW9ucz4oXG4gICAgJ01jVXNlVmFsaWRhdGlvbicsXG4gICAgeyBmYWN0b3J5OiAoKSA9PiAoeyB1c2VWYWxpZGF0aW9uOiB0cnVlIH0pIH1cbiAgICApO1xuXG5cbmZ1bmN0aW9uIHNldFZhbGlkU3RhdGUoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCB2YWxpZGF0b3I6IFZhbGlkYXRvckZuKTogdm9pZCB7XG4gICAgaWYgKCFjb250cm9sKSB7IHJldHVybjsgfVxuXG4gICAgY29udHJvbC5jbGVhclZhbGlkYXRvcnMoKTtcbiAgICBjb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuICAgIGNvbnRyb2wuc2V0VmFsaWRhdG9ycyh2YWxpZGF0b3IpO1xufVxuXG5cbi8qKiBUaGlzIGZ1bmN0aW9uIGRvIG5leHQ6XG4gKiAtIHJ1biB2YWxpZGF0aW9uIG9uIHN1Ym1pdHRpbmcgcGFyZW50IGZvcm1cbiAqIC0gcHJldmVudCB2YWxpZGF0aW9uIGluIHJlcXVpcmVkIHZhbGlkYXRvciBpZiBmb3JtIGRvZXNuJ3Qgc3VibWl0dGVkXG4gKiAtIGlmIGNvbnRyb2wgaGFzIGZvY3VzIHZhbGlkYXRpb24gd2lsbCBiZSBwcmV2ZW50ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldE1vc2FpY1ZhbGlkYXRpb24oY29tcG9uZW50KSB7XG4gICAgY29uc3QgbmdDb250cm9sID0gY29tcG9uZW50Lm5nQ29udHJvbDtcblxuICAgIGlmICghbmdDb250cm9sKSB7IHJldHVybjsgfVxuXG4gICAgY29uc3QgcGFyZW50Rm9ybTogTmdGb3JtID0gY29tcG9uZW50LnBhcmVudEZvcm0gfHwgY29tcG9uZW50LnBhcmVudEZvcm1Hcm91cDtcblxuICAgIGlmIChwYXJlbnRGb3JtKSB7XG4gICAgICAgIHBhcmVudEZvcm0ubmdTdWJtaXQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW5uZWNlc3NhcnktdHlwZS1hc3NlcnRpb25cbiAgICAgICAgICAgIG5nQ29udHJvbC5jb250cm9sIS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbXBvbmVudC5uZ01vZGVsKSB7XG4gICAgICAgIHNldE1vc2FpY1ZhbGlkYXRpb25Gb3JNb2RlbENvbnRyb2woY29tcG9uZW50LCBjb21wb25lbnQucmF3VmFsaWRhdG9ycywgcGFyZW50Rm9ybSk7XG4gICAgfSBlbHNlIGlmIChjb21wb25lbnQuZm9ybUNvbnRyb2xOYW1lIHx8IGNvbXBvbmVudC5uZ0NvbnRyb2wpIHtcbiAgICAgICAgc2V0TW9zYWljVmFsaWRhdGlvbkZvckZvcm1Db250cm9sKGNvbXBvbmVudCwgcGFyZW50Rm9ybSwgbmdDb250cm9sKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gc2V0TW9zYWljVmFsaWRhdGlvbkZvck1vZGVsQ29udHJvbChjb21wb25lbnQsIHZhbGlkYXRvcnM6IFZhbGlkYXRvcltdLCBwYXJlbnRGb3JtOiBOZ0Zvcm0pIHtcbiAgICBpZiAoIXZhbGlkYXRvcnMpIHsgcmV0dXJuOyB9XG5cbiAgICB2YWxpZGF0b3JzLmZvckVhY2goKHZhbGlkYXRvcjogVmFsaWRhdG9yKSA9PiB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW5ib3VuZC1tZXRob2RcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxWYWxpZGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZTtcblxuICAgICAgICBpZiAodmFsaWRhdG9yIGluc3RhbmNlb2YgUmVxdWlyZWRWYWxpZGF0b3IpIHtcbiAgICAgICAgICAgIC8vIGNoYW5nZWQgcmVxdWlyZWQgdmFsaWRhdGlvbiBsb2dpY1xuICAgICAgICAgICAgdmFsaWRhdG9yLnZhbGlkYXRlID0gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50Rm9ybSAmJiAhcGFyZW50Rm9ybS5zdWJtaXR0ZWQpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbFZhbGlkYXRlLmNhbGwodmFsaWRhdG9yLCBjb250cm9sKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjaGFuZ2VkIGFsbCBvdGhlciB2YWxpZGF0aW9uIGxvZ2ljXG4gICAgICAgICAgICB2YWxpZGF0b3IudmFsaWRhdGUgPSAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnQuZm9jdXNlZCkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsVmFsaWRhdGUuY2FsbCh2YWxpZGF0b3IsIGNvbnRyb2wpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0TW9zYWljVmFsaWRhdGlvbkZvckZvcm1Db250cm9sKGNvbXBvbmVudCwgcGFyZW50Rm9ybTogTmdGb3JtLCBuZ0NvbnRyb2w6IE5nQ29udHJvbCkge1xuICAgIGNvbnN0IG9yaWdpbmFsVmFsaWRhdG9yID0gbmdDb250cm9sLmNvbnRyb2whLnZhbGlkYXRvcjtcblxuICAgIC8vIGNoYW5nZWQgcmVxdWlyZWQgdmFsaWRhdGlvbiBsb2dpYyBhZnRlciBpbml0aWFsaXphdGlvblxuICAgIGlmIChuZ0NvbnRyb2wuaW52YWxpZCAmJiBuZ0NvbnRyb2wuZXJyb3JzIS5yZXF1aXJlZCkge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHNldFZhbGlkU3RhdGUobmdDb250cm9sLmNvbnRyb2whLCBvcmlnaW5hbFZhbGlkYXRvciEpKTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayBkeW5hbWljIHVwZGF0ZXNcbiAgICBuZ0NvbnRyb2wuc3RhdHVzQ2hhbmdlcyFcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAvLyBjaGFuZ2VkIHJlcXVpcmVkIHZhbGlkYXRpb24gbG9naWNcbiAgICAgICAgICAgIGlmIChuZ0NvbnRyb2wuaW52YWxpZCAmJiAocGFyZW50Rm9ybSAmJiAhcGFyZW50Rm9ybS5zdWJtaXR0ZWQpICYmIG5nQ29udHJvbC5lcnJvcnMhLnJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgc2V0VmFsaWRTdGF0ZShuZ0NvbnRyb2wuY29udHJvbCEsIG9yaWdpbmFsVmFsaWRhdG9yISk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNoYW5nZWQgYWxsIG90aGVyIHZhbGlkYXRpb24gbG9naWNcbiAgICAgICAgICAgIGlmIChuZ0NvbnRyb2wuaW52YWxpZCAmJiBjb21wb25lbnQuZm9jdXNlZCkge1xuICAgICAgICAgICAgICAgIHNldFZhbGlkU3RhdGUobmdDb250cm9sLmNvbnRyb2whLCBvcmlnaW5hbFZhbGlkYXRvciEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbn1cbiJdfQ==