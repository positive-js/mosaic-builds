/**
 * @fileoverview added by tsickle
 * Generated from: form-field-control.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An interface which allows a control to work inside of a `MсFormField`.
 * @abstract
 * @template T
 */
// tslint:disable-next-line:naming-convention
var /**
 * An interface which allows a control to work inside of a `MсFormField`.
 * @abstract
 * @template T
 */
// tslint:disable-next-line:naming-convention
McFormFieldControl = /** @class */ (function () {
    function McFormFieldControl() {
    }
    return McFormFieldControl;
}());
/**
 * An interface which allows a control to work inside of a `MсFormField`.
 * @abstract
 * @template T
 */
// tslint:disable-next-line:naming-convention
export { McFormFieldControl };
if (false) {
    /**
     * The value of the control.
     * @type {?}
     */
    McFormFieldControl.prototype.value;
    /**
     * Stream that emits whenever the state of the control changes such that the parent `MсFormField`
     * needs to run change detection.
     * @type {?}
     */
    McFormFieldControl.prototype.stateChanges;
    /**
     * The element ID for this control.
     * @type {?}
     */
    McFormFieldControl.prototype.id;
    /**
     * The placeholder for this control.
     * @type {?}
     */
    McFormFieldControl.prototype.placeholder;
    /**
     * Gets the NgControl for this control.
     * @type {?}
     */
    McFormFieldControl.prototype.ngControl;
    /**
     * Whether the control is focused.
     * @type {?}
     */
    McFormFieldControl.prototype.focused;
    /**
     * Whether the control is empty.
     * @type {?}
     */
    McFormFieldControl.prototype.empty;
    /**
     * Whether the control is required.
     * @type {?}
     */
    McFormFieldControl.prototype.required;
    /**
     * Whether the control is disabled.
     * @type {?}
     */
    McFormFieldControl.prototype.disabled;
    /**
     * Whether the control is in an error state.
     * @type {?}
     */
    McFormFieldControl.prototype.errorState;
    /**
     * An optional name for the control type that can be used to distinguish `mc-form-field` elements
     * based on their control type. The form field will add a class,
     * `mc-form-field-type-{{controlType}}` to its root element.
     * @type {?}
     */
    McFormFieldControl.prototype.controlType;
    /**
     * Handles a click on the control's container.
     * @abstract
     * @param {?} event
     * @return {?}
     */
    McFormFieldControl.prototype.onContainerClick = function (event) { };
    /**
     * @abstract
     * @return {?}
     */
    McFormFieldControl.prototype.focus = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC1jb250cm9sLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL2Zvcm0tZmllbGQvIiwic291cmNlcyI6WyJmb3JtLWZpZWxkLWNvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFNQTs7Ozs7OztJQUFBO0lBNkNBLENBQUM7SUFBRCx5QkFBQztBQUFELENBQUMsQUE3Q0QsSUE2Q0M7Ozs7Ozs7Ozs7Ozs7SUEzQ0csbUNBQWdCOzs7Ozs7SUFNaEIsMENBQXdDOzs7OztJQUd4QyxnQ0FBb0I7Ozs7O0lBR3BCLHlDQUE2Qjs7Ozs7SUFHN0IsdUNBQXFDOzs7OztJQUdyQyxxQ0FBMEI7Ozs7O0lBRzFCLG1DQUF3Qjs7Ozs7SUFHeEIsc0NBQTJCOzs7OztJQUczQixzQ0FBMkI7Ozs7O0lBRzNCLHdDQUE2Qjs7Ozs7OztJQU83Qix5Q0FBOEI7Ozs7Ozs7SUFHOUIscUVBQW1EOzs7OztJQUVuRCxxREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cblxuLyoqIEFuIGludGVyZmFjZSB3aGljaCBhbGxvd3MgYSBjb250cm9sIHRvIHdvcmsgaW5zaWRlIG9mIGEgYE3RgUZvcm1GaWVsZGAuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNY0Zvcm1GaWVsZENvbnRyb2w8VD4ge1xuICAgIC8qKiBUaGUgdmFsdWUgb2YgdGhlIGNvbnRyb2wuICovXG4gICAgdmFsdWU6IFQgfCBudWxsO1xuXG4gICAgLyoqXG4gICAgICogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbmV2ZXIgdGhlIHN0YXRlIG9mIHRoZSBjb250cm9sIGNoYW5nZXMgc3VjaCB0aGF0IHRoZSBwYXJlbnQgYE3RgUZvcm1GaWVsZGBcbiAgICAgKiBuZWVkcyB0byBydW4gY2hhbmdlIGRldGVjdGlvbi5cbiAgICAgKi9cbiAgICByZWFkb25seSBzdGF0ZUNoYW5nZXM6IE9ic2VydmFibGU8dm9pZD47XG5cbiAgICAvKiogVGhlIGVsZW1lbnQgSUQgZm9yIHRoaXMgY29udHJvbC4gKi9cbiAgICByZWFkb25seSBpZDogc3RyaW5nO1xuXG4gICAgLyoqIFRoZSBwbGFjZWhvbGRlciBmb3IgdGhpcyBjb250cm9sLiAqL1xuICAgIHJlYWRvbmx5IHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICAvKiogR2V0cyB0aGUgTmdDb250cm9sIGZvciB0aGlzIGNvbnRyb2wuICovXG4gICAgcmVhZG9ubHkgbmdDb250cm9sOiBOZ0NvbnRyb2wgfCBudWxsO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGNvbnRyb2wgaXMgZm9jdXNlZC4gKi9cbiAgICByZWFkb25seSBmb2N1c2VkOiBib29sZWFuO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGNvbnRyb2wgaXMgZW1wdHkuICovXG4gICAgcmVhZG9ubHkgZW1wdHk6IGJvb2xlYW47XG5cbiAgICAvKiogV2hldGhlciB0aGUgY29udHJvbCBpcyByZXF1aXJlZC4gKi9cbiAgICByZWFkb25seSByZXF1aXJlZDogYm9vbGVhbjtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBjb250cm9sIGlzIGRpc2FibGVkLiAqL1xuICAgIHJlYWRvbmx5IGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGNvbnRyb2wgaXMgaW4gYW4gZXJyb3Igc3RhdGUuICovXG4gICAgcmVhZG9ubHkgZXJyb3JTdGF0ZTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEFuIG9wdGlvbmFsIG5hbWUgZm9yIHRoZSBjb250cm9sIHR5cGUgdGhhdCBjYW4gYmUgdXNlZCB0byBkaXN0aW5ndWlzaCBgbWMtZm9ybS1maWVsZGAgZWxlbWVudHNcbiAgICAgKiBiYXNlZCBvbiB0aGVpciBjb250cm9sIHR5cGUuIFRoZSBmb3JtIGZpZWxkIHdpbGwgYWRkIGEgY2xhc3MsXG4gICAgICogYG1jLWZvcm0tZmllbGQtdHlwZS17e2NvbnRyb2xUeXBlfX1gIHRvIGl0cyByb290IGVsZW1lbnQuXG4gICAgICovXG4gICAgcmVhZG9ubHkgY29udHJvbFR5cGU/OiBzdHJpbmc7XG5cbiAgICAvKiogSGFuZGxlcyBhIGNsaWNrIG9uIHRoZSBjb250cm9sJ3MgY29udGFpbmVyLiAqL1xuICAgIGFic3RyYWN0IG9uQ29udGFpbmVyQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkO1xuXG4gICAgYWJzdHJhY3QgZm9jdXMoKTogdm9pZDtcbn1cbiJdfQ==