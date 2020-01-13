import { InjectionToken } from '@angular/core';
import { NgControl, NgForm, Validator } from '@angular/forms';
export interface McValidationOptions {
    useValidation: boolean;
}
export declare const MC_VALIDATION: InjectionToken<McValidationOptions>;
export declare enum ControlTypes {
    FormControl = "FormControlDirective",
    FormControlName = "FormControlName",
    ModelControl = "NgModel"
}
/** This function do next:
 * - run validation on submitting parent form
 * - prevent validation in required validator if form doesn't submitted
 * - if control focused and untouched validation will be prevented
 */
export declare function setMosaicValidation(validators: Validator[], parentForm: NgForm, ngControl: NgControl): void;
