import { Provider } from '@angular/core';
import { CheckboxRequiredValidator } from '@angular/forms';
export declare const MC_CHECKBOX_REQUIRED_VALIDATOR: Provider;
/**
 * Validator for Mosaic checkbox's required attribute in template-driven checkbox.
 * Current CheckboxRequiredValidator only work with `input type=checkbox` and does not
 * work with `mc-checkbox`.
 */
export declare class McCheckboxRequiredValidator extends CheckboxRequiredValidator {
}
