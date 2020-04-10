/**
 * @fileoverview added by tsickle
 * Generated from: input-number-validators.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtbnVtYmVyLXZhbGlkYXRvcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvaW5wdXQvIiwic291cmNlcyI6WyJpbnB1dC1udW1iZXItdmFsaWRhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBc0MsTUFBTSxlQUFlLENBQUM7QUFDakcsT0FBTyxFQUFtQixhQUFhLEVBQTRDLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUd0SCxNQUFNLE9BQU8sYUFBYSxHQUFhO0lBQ25DLE9BQU8sRUFBRSxhQUFhO0lBQ3RCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxHQUFHLEVBQUUsQ0FBQyxZQUFZLEVBQUM7SUFDM0MsS0FBSyxFQUFFLElBQUk7Q0FDZDs7Ozs7OztBQWFELE1BQU0sT0FBTyxZQUFZOzs7OztJQU1yQixXQUFXLENBQUMsT0FBc0I7UUFDOUIsSUFBSSxLQUFLLElBQUksT0FBTyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQUU7U0FDMUM7SUFDTCxDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxDQUFrQixJQUE2QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztJQUVuRix5QkFBeUIsQ0FBQyxFQUFjLElBQVUsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7OztJQUUvRCxlQUFlLEtBQVcsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7WUF0Qi9GLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsMERBQTBEO2dCQUNwRSxTQUFTLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0JBQzFCLElBQUksRUFBRSxFQUFDLFlBQVksRUFBRSxrQkFBa0IsRUFBQzthQUMzQzs7O2tCQUdJLEtBQUs7Ozs7SUFBTiwyQkFBcUI7Ozs7O0lBQ3JCLGlDQUErQjs7Ozs7SUFDL0IsZ0NBQTZCOzs7QUFpQmpDLE1BQU0sT0FBTyxhQUFhLEdBQWE7SUFDbkMsT0FBTyxFQUFFLGFBQWE7SUFDdEIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLEdBQUcsRUFBRSxDQUFDLFlBQVksRUFBQztJQUMzQyxLQUFLLEVBQUUsSUFBSTtDQUNkOzs7Ozs7O0FBZUQsTUFBTSxPQUFPLFlBQVk7Ozs7O0lBT3JCLFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLEtBQUssSUFBSSxPQUFPLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3ZCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFBRTtTQUMxQztJQUNMLENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLENBQWtCLElBQTZCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRW5GLHlCQUF5QixDQUFDLEVBQWMsSUFBVSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRS9ELGVBQWUsS0FBVyxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7OztZQXpCL0YsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwwREFBMEQ7Z0JBQ3BFLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDMUIsSUFBSSxFQUFFO29CQUNGLFlBQVksRUFBRSxrQkFBa0I7aUJBQ25DO2FBQ0o7OztrQkFJSSxLQUFLOzs7O0lBQU4sMkJBQXFCOzs7OztJQUNyQixpQ0FBK0I7Ozs7O0lBQy9CLGdDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgUHJvdmlkZXIsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgTkdfVkFMSURBVE9SUywgVmFsaWRhdGlvbkVycm9ycywgVmFsaWRhdG9yLCBWYWxpZGF0b3JGbiwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuXG5leHBvcnQgY29uc3QgTUlOX1ZBTElEQVRPUjogUHJvdmlkZXIgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNaW5WYWxpZGF0b3IpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHdoaWNoIGluc3RhbGxzIHRoZSB7QGxpbmsgTWluVmFsaWRhdG9yfSBmb3IgYW55IGBmb3JtQ29udHJvbE5hbWVgLFxuICogYGZvcm1Db250cm9sYCwgb3IgY29udHJvbCB3aXRoIGBuZ01vZGVsYCB0aGF0IGFsc28gaGFzIGEgYG1pbmAgYXR0cmlidXRlLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWluXVtmb3JtQ29udHJvbE5hbWVdLFttaW5dW2Zvcm1Db250cm9sXSxbbWluXVtuZ01vZGVsXScsXG4gICAgcHJvdmlkZXJzOiBbTUlOX1ZBTElEQVRPUl0sXG4gICAgaG9zdDogeydbYXR0ci5taW5dJzogJ21pbiA/IG1pbiA6IG51bGwnfVxufSlcbmV4cG9ydCBjbGFzcyBNaW5WYWxpZGF0b3IgaW1wbGVtZW50cyBWYWxpZGF0b3IsIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKSBtaW46IHN0cmluZztcbiAgICBwcml2YXRlIHZhbGlkYXRvcjogVmFsaWRhdG9yRm47XG4gICAgcHJpdmF0ZSBvbkNoYW5nZTogKCkgPT4gdm9pZDtcblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKCdtaW4nIGluIGNoYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmFsaWRhdG9yKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5vbkNoYW5nZSkgeyB0aGlzLm9uQ2hhbmdlKCk7IH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHsgcmV0dXJuIHRoaXMudmFsaWRhdG9yKGMpOyB9XG5cbiAgICByZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7IHRoaXMub25DaGFuZ2UgPSBmbjsgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVWYWxpZGF0b3IoKTogdm9pZCB7IHRoaXMudmFsaWRhdG9yID0gVmFsaWRhdG9ycy5taW4ocGFyc2VJbnQodGhpcy5taW4sIDEwKSk7IH1cbn1cblxuXG5leHBvcnQgY29uc3QgTUFYX1ZBTElEQVRPUjogUHJvdmlkZXIgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXhWYWxpZGF0b3IpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHdoaWNoIGluc3RhbGxzIHRoZSB7QGxpbmsgTWF4VmFsaWRhdG9yfSBmb3IgYW55IGBmb3JtQ29udHJvbE5hbWVgLFxuICogYGZvcm1Db250cm9sYCwgb3IgY29udHJvbCB3aXRoIGBuZ01vZGVsYCB0aGF0IGFsc28gaGFzIGEgYG1pbmAgYXR0cmlidXRlLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWF4XVtmb3JtQ29udHJvbE5hbWVdLFttYXhdW2Zvcm1Db250cm9sXSxbbWF4XVtuZ01vZGVsXScsXG4gICAgcHJvdmlkZXJzOiBbTUFYX1ZBTElEQVRPUl0sXG4gICAgaG9zdDoge1xuICAgICAgICAnW2F0dHIubWF4XSc6ICdtYXggPyBtYXggOiBudWxsJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWF4VmFsaWRhdG9yIGltcGxlbWVudHMgVmFsaWRhdG9yLFxuICAgIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKSBtYXg6IHN0cmluZztcbiAgICBwcml2YXRlIHZhbGlkYXRvcjogVmFsaWRhdG9yRm47XG4gICAgcHJpdmF0ZSBvbkNoYW5nZTogKCkgPT4gdm9pZDtcblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKCdtYXgnIGluIGNoYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmFsaWRhdG9yKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5vbkNoYW5nZSkgeyB0aGlzLm9uQ2hhbmdlKCk7IH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHsgcmV0dXJuIHRoaXMudmFsaWRhdG9yKGMpOyB9XG5cbiAgICByZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7IHRoaXMub25DaGFuZ2UgPSBmbjsgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVWYWxpZGF0b3IoKTogdm9pZCB7IHRoaXMudmFsaWRhdG9yID0gVmFsaWRhdG9ycy5tYXgocGFyc2VJbnQodGhpcy5tYXgsIDEwKSk7IH1cbn1cbiJdfQ==