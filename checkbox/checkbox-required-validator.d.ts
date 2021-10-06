import { Provider } from '@angular/core';
import { CheckboxRequiredValidator } from '@angular/forms';
import * as i0 from "@angular/core";
export declare const MC_CHECKBOX_REQUIRED_VALIDATOR: Provider;
/**
 * Validator for Mosaic checkbox's required attribute in template-driven checkbox.
 * Current CheckboxRequiredValidator only work with `input type=checkbox` and does not
 * work with `mc-checkbox`.
 */
export declare class McCheckboxRequiredValidator extends CheckboxRequiredValidator {
    static ɵfac: i0.ɵɵFactoryDeclaration<McCheckboxRequiredValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McCheckboxRequiredValidator, "mc-checkbox[required][formControlName],             mc-checkbox[required][formControl], mc-checkbox[required][ngModel]", never, {}, {}, never>;
}
