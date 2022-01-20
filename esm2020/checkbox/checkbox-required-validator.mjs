import { Directive, forwardRef } from '@angular/core';
import { CheckboxRequiredValidator, NG_VALIDATORS } from '@angular/forms';
import * as i0 from "@angular/core";
export const MC_CHECKBOX_REQUIRED_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => McCheckboxRequiredValidator),
    multi: true
};
/**
 * Validator for Mosaic checkbox's required attribute in template-driven checkbox.
 * Current CheckboxRequiredValidator only work with `input type=checkbox` and does not
 * work with `mc-checkbox`.
 */
export class McCheckboxRequiredValidator extends CheckboxRequiredValidator {
}
/** @nocollapse */ /** @nocollapse */ McCheckboxRequiredValidator.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McCheckboxRequiredValidator, deps: null, target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McCheckboxRequiredValidator.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: McCheckboxRequiredValidator, selector: "mc-checkbox[required][formControlName],\n             mc-checkbox[required][formControl], mc-checkbox[required][ngModel]", host: { properties: { "attr.required": "required ? \"\" : null" } }, providers: [MC_CHECKBOX_REQUIRED_VALIDATOR], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McCheckboxRequiredValidator, decorators: [{
            type: Directive,
            args: [{
                    selector: `mc-checkbox[required][formControlName],
             mc-checkbox[required][formControl], mc-checkbox[required][ngModel]`,
                    providers: [MC_CHECKBOX_REQUIRED_VALIDATOR],
                    host: { '[attr.required]': 'required ? "" : null' }
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtcmVxdWlyZWQtdmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2NoZWNrYm94L2NoZWNrYm94LXJlcXVpcmVkLXZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFVBQVUsRUFFYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0gseUJBQXlCLEVBQ3pCLGFBQWEsRUFDaEIsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFHeEIsTUFBTSxDQUFDLE1BQU0sOEJBQThCLEdBQWE7SUFDcEQsT0FBTyxFQUFFLGFBQWE7SUFDdEIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztJQUMxRCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFFRjs7OztHQUlHO0FBT0gsTUFBTSxPQUFPLDJCQUE0QixTQUFRLHlCQUF5Qjs7OEpBQTdELDJCQUEyQjtrSkFBM0IsMkJBQTJCLHdOQUh6QixDQUFDLDhCQUE4QixDQUFDOzJGQUdsQywyQkFBMkI7a0JBTnZDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFO2dGQUNrRTtvQkFDNUUsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7b0JBQzNDLElBQUksRUFBRSxFQUFFLGlCQUFpQixFQUFFLHNCQUFzQixFQUFFO2lCQUN0RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLFxuICAgIGZvcndhcmRSZWYsXG4gICAgUHJvdmlkZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENoZWNrYm94UmVxdWlyZWRWYWxpZGF0b3IsXG4gICAgTkdfVkFMSURBVE9SU1xufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cblxuZXhwb3J0IGNvbnN0IE1DX0NIRUNLQk9YX1JFUVVJUkVEX1ZBTElEQVRPUjogUHJvdmlkZXIgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNY0NoZWNrYm94UmVxdWlyZWRWYWxpZGF0b3IpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG4vKipcbiAqIFZhbGlkYXRvciBmb3IgTW9zYWljIGNoZWNrYm94J3MgcmVxdWlyZWQgYXR0cmlidXRlIGluIHRlbXBsYXRlLWRyaXZlbiBjaGVja2JveC5cbiAqIEN1cnJlbnQgQ2hlY2tib3hSZXF1aXJlZFZhbGlkYXRvciBvbmx5IHdvcmsgd2l0aCBgaW5wdXQgdHlwZT1jaGVja2JveGAgYW5kIGRvZXMgbm90XG4gKiB3b3JrIHdpdGggYG1jLWNoZWNrYm94YC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IGBtYy1jaGVja2JveFtyZXF1aXJlZF1bZm9ybUNvbnRyb2xOYW1lXSxcbiAgICAgICAgICAgICBtYy1jaGVja2JveFtyZXF1aXJlZF1bZm9ybUNvbnRyb2xdLCBtYy1jaGVja2JveFtyZXF1aXJlZF1bbmdNb2RlbF1gLFxuICAgIHByb3ZpZGVyczogW01DX0NIRUNLQk9YX1JFUVVJUkVEX1ZBTElEQVRPUl0sXG4gICAgaG9zdDogeyAnW2F0dHIucmVxdWlyZWRdJzogJ3JlcXVpcmVkID8gXCJcIiA6IG51bGwnIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNDaGVja2JveFJlcXVpcmVkVmFsaWRhdG9yIGV4dGVuZHMgQ2hlY2tib3hSZXF1aXJlZFZhbGlkYXRvciB7XG59XG4iXX0=