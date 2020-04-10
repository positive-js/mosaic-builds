/**
 * @fileoverview added by tsickle
 * Generated from: checkbox-required-validator.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, forwardRef } from '@angular/core';
import { CheckboxRequiredValidator, NG_VALIDATORS } from '@angular/forms';
/** @type {?} */
export const MC_CHECKBOX_REQUIRED_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => McCheckboxRequiredValidator)),
    multi: true
};
/**
 * Validator for Mosaic checkbox's required attribute in template-driven checkbox.
 * Current CheckboxRequiredValidator only work with `input type=checkbox` and does not
 * work with `mc-checkbox`.
 */
export class McCheckboxRequiredValidator extends CheckboxRequiredValidator {
}
McCheckboxRequiredValidator.decorators = [
    { type: Directive, args: [{
                selector: `mc-checkbox[required][formControlName],
             mc-checkbox[required][formControl], mc-checkbox[required][ngModel]`,
                providers: [MC_CHECKBOX_REQUIRED_VALIDATOR],
                host: { '[attr.required]': 'required ? "" : null' }
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtcmVxdWlyZWQtdmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL2NoZWNrYm94LyIsInNvdXJjZXMiOlsiY2hlY2tib3gtcmVxdWlyZWQtdmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxVQUFVLEVBRWIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILHlCQUF5QixFQUN6QixhQUFhLEVBQ2hCLE1BQU0sZ0JBQWdCLENBQUM7O0FBR3hCLE1BQU0sT0FBTyw4QkFBOEIsR0FBYTtJQUNwRCxPQUFPLEVBQUUsYUFBYTtJQUN0QixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsR0FBRyxFQUFFLENBQUMsMkJBQTJCLEVBQUM7SUFDMUQsS0FBSyxFQUFFLElBQUk7Q0FDZDs7Ozs7O0FBYUQsTUFBTSxPQUFPLDJCQUE0QixTQUFRLHlCQUF5Qjs7O1lBTnpFLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUU7Z0ZBQ2tFO2dCQUM1RSxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztnQkFDM0MsSUFBSSxFQUFFLEVBQUUsaUJBQWlCLEVBQUUsc0JBQXNCLEVBQUU7YUFDdEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSxcbiAgICBmb3J3YXJkUmVmLFxuICAgIFByb3ZpZGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDaGVja2JveFJlcXVpcmVkVmFsaWRhdG9yLFxuICAgIE5HX1ZBTElEQVRPUlNcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5cbmV4cG9ydCBjb25zdCBNQ19DSEVDS0JPWF9SRVFVSVJFRF9WQUxJREFUT1I6IFByb3ZpZGVyID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWNDaGVja2JveFJlcXVpcmVkVmFsaWRhdG9yKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqXG4gKiBWYWxpZGF0b3IgZm9yIE1vc2FpYyBjaGVja2JveCdzIHJlcXVpcmVkIGF0dHJpYnV0ZSBpbiB0ZW1wbGF0ZS1kcml2ZW4gY2hlY2tib3guXG4gKiBDdXJyZW50IENoZWNrYm94UmVxdWlyZWRWYWxpZGF0b3Igb25seSB3b3JrIHdpdGggYGlucHV0IHR5cGU9Y2hlY2tib3hgIGFuZCBkb2VzIG5vdFxuICogd29yayB3aXRoIGBtYy1jaGVja2JveGAuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBgbWMtY2hlY2tib3hbcmVxdWlyZWRdW2Zvcm1Db250cm9sTmFtZV0sXG4gICAgICAgICAgICAgbWMtY2hlY2tib3hbcmVxdWlyZWRdW2Zvcm1Db250cm9sXSwgbWMtY2hlY2tib3hbcmVxdWlyZWRdW25nTW9kZWxdYCxcbiAgICBwcm92aWRlcnM6IFtNQ19DSEVDS0JPWF9SRVFVSVJFRF9WQUxJREFUT1JdLFxuICAgIGhvc3Q6IHsgJ1thdHRyLnJlcXVpcmVkXSc6ICdyZXF1aXJlZCA/IFwiXCIgOiBudWxsJyB9XG59KVxuZXhwb3J0IGNsYXNzIE1jQ2hlY2tib3hSZXF1aXJlZFZhbGlkYXRvciBleHRlbmRzIENoZWNrYm94UmVxdWlyZWRWYWxpZGF0b3Ige1xufVxuIl19