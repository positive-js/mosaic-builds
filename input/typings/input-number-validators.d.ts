import { OnChanges, Provider, SimpleChanges } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';
export declare const MIN_VALIDATOR: Provider;
/**
 * A directive which installs the {@link MinValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `min` attribute.
 *
 * @experimental
 */
export declare class MinValidator implements Validator, OnChanges {
    min: string;
    private validator;
    private onChange;
    ngOnChanges(changes: SimpleChanges): void;
    validate(c: AbstractControl): ValidationErrors | null;
    registerOnValidatorChange(fn: () => void): void;
    private createValidator;
}
export declare const MAX_VALIDATOR: Provider;
/**
 * A directive which installs the {@link MaxValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `min` attribute.
 *
 * @experimental
 */
export declare class MaxValidator implements Validator, OnChanges {
    max: string;
    private validator;
    private onChange;
    ngOnChanges(changes: SimpleChanges): void;
    validate(c: AbstractControl): ValidationErrors | null;
    registerOnValidatorChange(fn: () => void): void;
    private createValidator;
}
