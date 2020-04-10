/**
 * @fileoverview added by tsickle
 * Generated from: input-number-validators.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, Validators } from '@angular/forms';
/** @type {?} */
export var MIN_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return MinValidator; })),
    multi: true
};
/**
 * A directive which installs the {\@link MinValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `min` attribute.
 *
 * \@experimental
 */
var MinValidator = /** @class */ (function () {
    function MinValidator() {
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    MinValidator.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if ('min' in changes) {
            this.createValidator();
            if (this.onChange) {
                this.onChange();
            }
        }
    };
    /**
     * @param {?} c
     * @return {?}
     */
    MinValidator.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) { return this.validator(c); };
    /**
     * @param {?} fn
     * @return {?}
     */
    MinValidator.prototype.registerOnValidatorChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onChange = fn; };
    /**
     * @private
     * @return {?}
     */
    MinValidator.prototype.createValidator = /**
     * @private
     * @return {?}
     */
    function () { this.validator = Validators.min(parseInt(this.min, 10)); };
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
    return MinValidator;
}());
export { MinValidator };
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
export var MAX_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return MaxValidator; })),
    multi: true
};
/**
 * A directive which installs the {\@link MaxValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `min` attribute.
 *
 * \@experimental
 */
var MaxValidator = /** @class */ (function () {
    function MaxValidator() {
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    MaxValidator.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if ('max' in changes) {
            this.createValidator();
            if (this.onChange) {
                this.onChange();
            }
        }
    };
    /**
     * @param {?} c
     * @return {?}
     */
    MaxValidator.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) { return this.validator(c); };
    /**
     * @param {?} fn
     * @return {?}
     */
    MaxValidator.prototype.registerOnValidatorChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onChange = fn; };
    /**
     * @private
     * @return {?}
     */
    MaxValidator.prototype.createValidator = /**
     * @private
     * @return {?}
     */
    function () { this.validator = Validators.max(parseInt(this.max, 10)); };
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
    return MaxValidator;
}());
export { MaxValidator };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtbnVtYmVyLXZhbGlkYXRvcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvaW5wdXQvIiwic291cmNlcyI6WyJpbnB1dC1udW1iZXItdmFsaWRhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBc0MsTUFBTSxlQUFlLENBQUM7QUFDakcsT0FBTyxFQUFtQixhQUFhLEVBQTRDLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUd0SCxNQUFNLEtBQU8sYUFBYSxHQUFhO0lBQ25DLE9BQU8sRUFBRSxhQUFhO0lBQ3RCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxjQUFNLE9BQUEsWUFBWSxFQUFaLENBQVksRUFBQztJQUMzQyxLQUFLLEVBQUUsSUFBSTtDQUNkOzs7Ozs7O0FBUUQ7SUFBQTtJQXVCQSxDQUFDOzs7OztJQVpHLGtDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUM5QixJQUFJLEtBQUssSUFBSSxPQUFPLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3ZCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFBRTtTQUMxQztJQUNMLENBQUM7Ozs7O0lBRUQsK0JBQVE7Ozs7SUFBUixVQUFTLENBQWtCLElBQTZCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRW5GLGdEQUF5Qjs7OztJQUF6QixVQUEwQixFQUFjLElBQVUsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7OztJQUUvRCxzQ0FBZTs7OztJQUF2QixjQUFrQyxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQXRCL0YsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSwwREFBMEQ7b0JBQ3BFLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQztvQkFDMUIsSUFBSSxFQUFFLEVBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUFDO2lCQUMzQzs7O3NCQUdJLEtBQUs7O0lBZ0JWLG1CQUFDO0NBQUEsQUF2QkQsSUF1QkM7U0FsQlksWUFBWTs7O0lBRXJCLDJCQUFxQjs7Ozs7SUFDckIsaUNBQStCOzs7OztJQUMvQixnQ0FBNkI7OztBQWlCakMsTUFBTSxLQUFPLGFBQWEsR0FBYTtJQUNuQyxPQUFPLEVBQUUsYUFBYTtJQUN0QixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsY0FBTSxPQUFBLFlBQVksRUFBWixDQUFZLEVBQUM7SUFDM0MsS0FBSyxFQUFFLElBQUk7Q0FDZDs7Ozs7OztBQVFEO0lBQUE7SUEwQkEsQ0FBQzs7Ozs7SUFaRyxrQ0FBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFDOUIsSUFBSSxLQUFLLElBQUksT0FBTyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQUU7U0FDMUM7SUFDTCxDQUFDOzs7OztJQUVELCtCQUFROzs7O0lBQVIsVUFBUyxDQUFrQixJQUE2QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztJQUVuRixnREFBeUI7Ozs7SUFBekIsVUFBMEIsRUFBYyxJQUFVLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFFL0Qsc0NBQWU7Ozs7SUFBdkIsY0FBa0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkF6Qi9GLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsMERBQTBEO29CQUNwRSxTQUFTLEVBQUUsQ0FBQyxhQUFhLENBQUM7b0JBQzFCLElBQUksRUFBRTt3QkFDRixZQUFZLEVBQUUsa0JBQWtCO3FCQUNuQztpQkFDSjs7O3NCQUlJLEtBQUs7O0lBZ0JWLG1CQUFDO0NBQUEsQUExQkQsSUEwQkM7U0FuQlksWUFBWTs7O0lBR3JCLDJCQUFxQjs7Ozs7SUFDckIsaUNBQStCOzs7OztJQUMvQixnQ0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYsIElucHV0LCBPbkNoYW5nZXMsIFByb3ZpZGVyLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMsIFZhbGlkYXRpb25FcnJvcnMsIFZhbGlkYXRvciwgVmFsaWRhdG9yRm4sIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cblxuZXhwb3J0IGNvbnN0IE1JTl9WQUxJREFUT1I6IFByb3ZpZGVyID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWluVmFsaWRhdG9yKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB3aGljaCBpbnN0YWxscyB0aGUge0BsaW5rIE1pblZhbGlkYXRvcn0gZm9yIGFueSBgZm9ybUNvbnRyb2xOYW1lYCxcbiAqIGBmb3JtQ29udHJvbGAsIG9yIGNvbnRyb2wgd2l0aCBgbmdNb2RlbGAgdGhhdCBhbHNvIGhhcyBhIGBtaW5gIGF0dHJpYnV0ZS5cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21pbl1bZm9ybUNvbnRyb2xOYW1lXSxbbWluXVtmb3JtQ29udHJvbF0sW21pbl1bbmdNb2RlbF0nLFxuICAgIHByb3ZpZGVyczogW01JTl9WQUxJREFUT1JdLFxuICAgIGhvc3Q6IHsnW2F0dHIubWluXSc6ICdtaW4gPyBtaW4gOiBudWxsJ31cbn0pXG5leHBvcnQgY2xhc3MgTWluVmFsaWRhdG9yIGltcGxlbWVudHMgVmFsaWRhdG9yLCBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KCkgbWluOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSB2YWxpZGF0b3I6IFZhbGlkYXRvckZuO1xuICAgIHByaXZhdGUgb25DaGFuZ2U6ICgpID0+IHZvaWQ7XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmICgnbWluJyBpbiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZhbGlkYXRvcigpO1xuICAgICAgICAgICAgaWYgKHRoaXMub25DaGFuZ2UpIHsgdGhpcy5vbkNoYW5nZSgpOyB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7IHJldHVybiB0aGlzLnZhbGlkYXRvcihjKTsgfVxuXG4gICAgcmVnaXN0ZXJPblZhbGlkYXRvckNoYW5nZShmbjogKCkgPT4gdm9pZCk6IHZvaWQgeyB0aGlzLm9uQ2hhbmdlID0gZm47IH1cblxuICAgIHByaXZhdGUgY3JlYXRlVmFsaWRhdG9yKCk6IHZvaWQgeyB0aGlzLnZhbGlkYXRvciA9IFZhbGlkYXRvcnMubWluKHBhcnNlSW50KHRoaXMubWluLCAxMCkpOyB9XG59XG5cblxuZXhwb3J0IGNvbnN0IE1BWF9WQUxJREFUT1I6IFByb3ZpZGVyID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF4VmFsaWRhdG9yKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB3aGljaCBpbnN0YWxscyB0aGUge0BsaW5rIE1heFZhbGlkYXRvcn0gZm9yIGFueSBgZm9ybUNvbnRyb2xOYW1lYCxcbiAqIGBmb3JtQ29udHJvbGAsIG9yIGNvbnRyb2wgd2l0aCBgbmdNb2RlbGAgdGhhdCBhbHNvIGhhcyBhIGBtaW5gIGF0dHJpYnV0ZS5cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21heF1bZm9ybUNvbnRyb2xOYW1lXSxbbWF4XVtmb3JtQ29udHJvbF0sW21heF1bbmdNb2RlbF0nLFxuICAgIHByb3ZpZGVyczogW01BWF9WQUxJREFUT1JdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLm1heF0nOiAnbWF4ID8gbWF4IDogbnVsbCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1heFZhbGlkYXRvciBpbXBsZW1lbnRzIFZhbGlkYXRvcixcbiAgICBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KCkgbWF4OiBzdHJpbmc7XG4gICAgcHJpdmF0ZSB2YWxpZGF0b3I6IFZhbGlkYXRvckZuO1xuICAgIHByaXZhdGUgb25DaGFuZ2U6ICgpID0+IHZvaWQ7XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmICgnbWF4JyBpbiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZhbGlkYXRvcigpO1xuICAgICAgICAgICAgaWYgKHRoaXMub25DaGFuZ2UpIHsgdGhpcy5vbkNoYW5nZSgpOyB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7IHJldHVybiB0aGlzLnZhbGlkYXRvcihjKTsgfVxuXG4gICAgcmVnaXN0ZXJPblZhbGlkYXRvckNoYW5nZShmbjogKCkgPT4gdm9pZCk6IHZvaWQgeyB0aGlzLm9uQ2hhbmdlID0gZm47IH1cblxuICAgIHByaXZhdGUgY3JlYXRlVmFsaWRhdG9yKCk6IHZvaWQgeyB0aGlzLnZhbGlkYXRvciA9IFZhbGlkYXRvcnMubWF4KHBhcnNlSW50KHRoaXMubWF4LCAxMCkpOyB9XG59XG4iXX0=