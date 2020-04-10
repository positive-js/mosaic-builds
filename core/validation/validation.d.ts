import { InjectionToken } from '@angular/core';
import { NgControl, NgForm, Validator } from '@angular/forms';
export interface McValidationOptions {
    useValidation: boolean;
}
export declare const MC_VALIDATION: InjectionToken<McValidationOptions>;
/** This function do next:
 * - run validation on submitting parent form
 * - prevent validation in required validator if form doesn't submitted
 * - if control has focus validation will be prevented
 */
export declare function setMosaicValidation(component: any): void;
export declare function setMosaicValidationForModelControl(component: any, validators: Validator[], parentForm: NgForm): void;
export declare function setMosaicValidationForFormControl(component: any, parentForm: NgForm, ngControl: NgControl): void;
