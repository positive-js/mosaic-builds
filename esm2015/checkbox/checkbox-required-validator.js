/**
 * @fileoverview added by tsickle
 * Generated from: checkbox-required-validator.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtcmVxdWlyZWQtdmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvY2hlY2tib3gvIiwic291cmNlcyI6WyJjaGVja2JveC1yZXF1aXJlZC12YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFVBQVUsRUFFYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0gseUJBQXlCLEVBQ3pCLGFBQWEsRUFDaEIsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFHeEIsTUFBTSxPQUFPLDhCQUE4QixHQUFhO0lBQ3BELE9BQU8sRUFBRSxhQUFhO0lBQ3RCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxHQUFHLEVBQUUsQ0FBQywyQkFBMkIsRUFBQztJQUMxRCxLQUFLLEVBQUUsSUFBSTtDQUNkOzs7Ozs7QUFhRCxNQUFNLE9BQU8sMkJBQTRCLFNBQVEseUJBQXlCOzs7WUFOekUsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRTtnRkFDa0U7Z0JBQzVFLFNBQVMsRUFBRSxDQUFDLDhCQUE4QixDQUFDO2dCQUMzQyxJQUFJLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxzQkFBc0IsRUFBRTthQUN0RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLFxuICAgIGZvcndhcmRSZWYsXG4gICAgUHJvdmlkZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENoZWNrYm94UmVxdWlyZWRWYWxpZGF0b3IsXG4gICAgTkdfVkFMSURBVE9SU1xufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cblxuZXhwb3J0IGNvbnN0IE1DX0NIRUNLQk9YX1JFUVVJUkVEX1ZBTElEQVRPUjogUHJvdmlkZXIgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNY0NoZWNrYm94UmVxdWlyZWRWYWxpZGF0b3IpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG4vKipcbiAqIFZhbGlkYXRvciBmb3IgTW9zYWljIGNoZWNrYm94J3MgcmVxdWlyZWQgYXR0cmlidXRlIGluIHRlbXBsYXRlLWRyaXZlbiBjaGVja2JveC5cbiAqIEN1cnJlbnQgQ2hlY2tib3hSZXF1aXJlZFZhbGlkYXRvciBvbmx5IHdvcmsgd2l0aCBgaW5wdXQgdHlwZT1jaGVja2JveGAgYW5kIGRvZXMgbm90XG4gKiB3b3JrIHdpdGggYG1jLWNoZWNrYm94YC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IGBtYy1jaGVja2JveFtyZXF1aXJlZF1bZm9ybUNvbnRyb2xOYW1lXSxcbiAgICAgICAgICAgICBtYy1jaGVja2JveFtyZXF1aXJlZF1bZm9ybUNvbnRyb2xdLCBtYy1jaGVja2JveFtyZXF1aXJlZF1bbmdNb2RlbF1gLFxuICAgIHByb3ZpZGVyczogW01DX0NIRUNLQk9YX1JFUVVJUkVEX1ZBTElEQVRPUl0sXG4gICAgaG9zdDogeyAnW2F0dHIucmVxdWlyZWRdJzogJ3JlcXVpcmVkID8gXCJcIiA6IG51bGwnIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNDaGVja2JveFJlcXVpcmVkVmFsaWRhdG9yIGV4dGVuZHMgQ2hlY2tib3hSZXF1aXJlZFZhbGlkYXRvciB7XG59XG4iXX0=