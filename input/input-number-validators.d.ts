import { OnChanges, Provider, SimpleChanges } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';
import * as i0 from "@angular/core";
export declare const MIN_VALIDATOR: Provider;
/**
 * A directive which installs the {@link MinValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `min` attribute.
 *
 * @experimental
 */
export declare class MinValidator implements Validator, OnChanges {
    min: number;
    private validator;
    private onChange;
    ngOnChanges(changes: SimpleChanges): void;
    validate(c: AbstractControl): ValidationErrors | null;
    registerOnValidatorChange(fn: () => void): void;
    private createValidator;
    static ɵfac: i0.ɵɵFactoryDeclaration<MinValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MinValidator, "[min][formControlName],[min][formControl],[min][ngModel]", never, { "min": "min"; }, {}, never>;
}
export declare const MAX_VALIDATOR: Provider;
/**
 * A directive which installs the {@link MaxValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `min` attribute.
 *
 * @experimental
 */
export declare class MaxValidator implements Validator, OnChanges {
    max: number | string;
    private validator;
    private onChange;
    ngOnChanges(changes: SimpleChanges): void;
    validate(c: AbstractControl): ValidationErrors | null;
    registerOnValidatorChange(fn: () => void): void;
    private createValidator;
    static ɵfac: i0.ɵɵFactoryDeclaration<MaxValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MaxValidator, "[max][formControlName],[max][formControl],[max][ngModel]", never, { "max": "max"; }, {}, never>;
}
