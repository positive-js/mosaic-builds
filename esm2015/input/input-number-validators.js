/**
 * @fileoverview added by tsickle
 * Generated from: input-number-validators.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, Validators } from '@angular/forms';
/** @type {?} */
export const MIN_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => MinValidator)),
    multi: true
};
/**
 * A directive which installs the {\@link MinValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `min` attribute.
 *
 * \@experimental
 */
export class MinValidator {
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if ('min' in changes) {
            this.createValidator();
            if (this.onChange) {
                this.onChange();
            }
        }
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) { return this.validator(c); }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnValidatorChange(fn) { this.onChange = fn; }
    /**
     * @private
     * @return {?}
     */
    createValidator() { this.validator = Validators.min(parseInt(this.min, 10)); }
}
MinValidator.decorators = [
    { type: Directive, args: [{
                selector: '[min][formControlName],[min][formControl],[min][ngModel]',
                providers: [MIN_VALIDATOR],
                host: { '[attr.min]': 'min ? min : null' }
            },] }
];
MinValidator.propDecorators = {
    min: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    MinValidator.prototype.min;
    /**
     * @type {?}
     * @private
     */
    MinValidator.prototype.validator;
    /**
     * @type {?}
     * @private
     */
    MinValidator.prototype.onChange;
}
/** @type {?} */
export const MAX_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => MaxValidator)),
    multi: true
};
/**
 * A directive which installs the {\@link MaxValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `min` attribute.
 *
 * \@experimental
 */
export class MaxValidator {
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if ('max' in changes) {
            this.createValidator();
            if (this.onChange) {
                this.onChange();
            }
        }
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) { return this.validator(c); }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnValidatorChange(fn) { this.onChange = fn; }
    /**
     * @private
     * @return {?}
     */
    createValidator() { this.validator = Validators.max(parseInt(this.max, 10)); }
}
MaxValidator.decorators = [
    { type: Directive, args: [{
                selector: '[max][formControlName],[max][formControl],[max][ngModel]',
                providers: [MAX_VALIDATOR],
                host: {
                    '[attr.max]': 'max ? max : null'
                }
            },] }
];
MaxValidator.propDecorators = {
    max: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    MaxValidator.prototype.max;
    /**
     * @type {?}
     * @private
     */
    MaxValidator.prototype.validator;
    /**
     * @type {?}
     * @private
     */
    MaxValidator.prototype.onChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtbnVtYmVyLXZhbGlkYXRvcnMuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9pbnB1dC8iLCJzb3VyY2VzIjpbImlucHV0LW51bWJlci12YWxpZGF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFzQyxNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQW1CLGFBQWEsRUFBNEMsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBR3RILE1BQU0sT0FBTyxhQUFhLEdBQWE7SUFDbkMsT0FBTyxFQUFFLGFBQWE7SUFDdEIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLEdBQUcsRUFBRSxDQUFDLFlBQVksRUFBQztJQUMzQyxLQUFLLEVBQUUsSUFBSTtDQUNkOzs7Ozs7O0FBYUQsTUFBTSxPQUFPLFlBQVk7Ozs7O0lBTXJCLFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLEtBQUssSUFBSSxPQUFPLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3ZCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFBRTtTQUMxQztJQUNMLENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLENBQWtCLElBQTZCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRW5GLHlCQUF5QixDQUFDLEVBQWMsSUFBVSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRS9ELGVBQWUsS0FBVyxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7OztZQXRCL0YsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwwREFBMEQ7Z0JBQ3BFLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDMUIsSUFBSSxFQUFFLEVBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUFDO2FBQzNDOzs7a0JBR0ksS0FBSzs7OztJQUFOLDJCQUFxQjs7Ozs7SUFDckIsaUNBQStCOzs7OztJQUMvQixnQ0FBNkI7OztBQWlCakMsTUFBTSxPQUFPLGFBQWEsR0FBYTtJQUNuQyxPQUFPLEVBQUUsYUFBYTtJQUN0QixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsR0FBRyxFQUFFLENBQUMsWUFBWSxFQUFDO0lBQzNDLEtBQUssRUFBRSxJQUFJO0NBQ2Q7Ozs7Ozs7QUFlRCxNQUFNLE9BQU8sWUFBWTs7Ozs7SUFPckIsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksS0FBSyxJQUFJLE9BQU8sRUFBRTtZQUNsQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUFFO1NBQzFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsQ0FBa0IsSUFBNkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFFbkYseUJBQXlCLENBQUMsRUFBYyxJQUFVLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFFL0QsZUFBZSxLQUFXLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O1lBekIvRixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDBEQUEwRDtnQkFDcEUsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDO2dCQUMxQixJQUFJLEVBQUU7b0JBQ0YsWUFBWSxFQUFFLGtCQUFrQjtpQkFDbkM7YUFDSjs7O2tCQUlJLEtBQUs7Ozs7SUFBTiwyQkFBcUI7Ozs7O0lBQ3JCLGlDQUErQjs7Ozs7SUFDL0IsZ0NBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBQcm92aWRlciwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTLCBWYWxpZGF0aW9uRXJyb3JzLCBWYWxpZGF0b3IsIFZhbGlkYXRvckZuLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5cbmV4cG9ydCBjb25zdCBNSU5fVkFMSURBVE9SOiBQcm92aWRlciA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1pblZhbGlkYXRvciksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgd2hpY2ggaW5zdGFsbHMgdGhlIHtAbGluayBNaW5WYWxpZGF0b3J9IGZvciBhbnkgYGZvcm1Db250cm9sTmFtZWAsXG4gKiBgZm9ybUNvbnRyb2xgLCBvciBjb250cm9sIHdpdGggYG5nTW9kZWxgIHRoYXQgYWxzbyBoYXMgYSBgbWluYCBhdHRyaWJ1dGUuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttaW5dW2Zvcm1Db250cm9sTmFtZV0sW21pbl1bZm9ybUNvbnRyb2xdLFttaW5dW25nTW9kZWxdJyxcbiAgICBwcm92aWRlcnM6IFtNSU5fVkFMSURBVE9SXSxcbiAgICBob3N0OiB7J1thdHRyLm1pbl0nOiAnbWluID8gbWluIDogbnVsbCd9XG59KVxuZXhwb3J0IGNsYXNzIE1pblZhbGlkYXRvciBpbXBsZW1lbnRzIFZhbGlkYXRvciwgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpIG1pbjogc3RyaW5nO1xuICAgIHByaXZhdGUgdmFsaWRhdG9yOiBWYWxpZGF0b3JGbjtcbiAgICBwcml2YXRlIG9uQ2hhbmdlOiAoKSA9PiB2b2lkO1xuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAoJ21pbicgaW4gY2hhbmdlcykge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVWYWxpZGF0b3IoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9uQ2hhbmdlKSB7IHRoaXMub25DaGFuZ2UoKTsgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgeyByZXR1cm4gdGhpcy52YWxpZGF0b3IoYyk7IH1cblxuICAgIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2UoZm46ICgpID0+IHZvaWQpOiB2b2lkIHsgdGhpcy5vbkNoYW5nZSA9IGZuOyB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVZhbGlkYXRvcigpOiB2b2lkIHsgdGhpcy52YWxpZGF0b3IgPSBWYWxpZGF0b3JzLm1pbihwYXJzZUludCh0aGlzLm1pbiwgMTApKTsgfVxufVxuXG5cbmV4cG9ydCBjb25zdCBNQVhfVkFMSURBVE9SOiBQcm92aWRlciA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1heFZhbGlkYXRvciksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgd2hpY2ggaW5zdGFsbHMgdGhlIHtAbGluayBNYXhWYWxpZGF0b3J9IGZvciBhbnkgYGZvcm1Db250cm9sTmFtZWAsXG4gKiBgZm9ybUNvbnRyb2xgLCBvciBjb250cm9sIHdpdGggYG5nTW9kZWxgIHRoYXQgYWxzbyBoYXMgYSBgbWluYCBhdHRyaWJ1dGUuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttYXhdW2Zvcm1Db250cm9sTmFtZV0sW21heF1bZm9ybUNvbnRyb2xdLFttYXhdW25nTW9kZWxdJyxcbiAgICBwcm92aWRlcnM6IFtNQVhfVkFMSURBVE9SXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdbYXR0ci5tYXhdJzogJ21heCA/IG1heCA6IG51bGwnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNYXhWYWxpZGF0b3IgaW1wbGVtZW50cyBWYWxpZGF0b3IsXG4gICAgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpIG1heDogc3RyaW5nO1xuICAgIHByaXZhdGUgdmFsaWRhdG9yOiBWYWxpZGF0b3JGbjtcbiAgICBwcml2YXRlIG9uQ2hhbmdlOiAoKSA9PiB2b2lkO1xuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAoJ21heCcgaW4gY2hhbmdlcykge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVWYWxpZGF0b3IoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9uQ2hhbmdlKSB7IHRoaXMub25DaGFuZ2UoKTsgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgeyByZXR1cm4gdGhpcy52YWxpZGF0b3IoYyk7IH1cblxuICAgIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2UoZm46ICgpID0+IHZvaWQpOiB2b2lkIHsgdGhpcy5vbkNoYW5nZSA9IGZuOyB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVZhbGlkYXRvcigpOiB2b2lkIHsgdGhpcy52YWxpZGF0b3IgPSBWYWxpZGF0b3JzLm1heChwYXJzZUludCh0aGlzLm1heCwgMTApKTsgfVxufVxuIl19