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
export class McFormFieldControl {
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC1jb250cm9sLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL2Zvcm0tZmllbGQvIiwic291cmNlcyI6WyJmb3JtLWZpZWxkLWNvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFNQSxNQUFNLE9BQWdCLGtCQUFrQjtDQTZDdkM7Ozs7OztJQTNDRyxtQ0FBZ0I7Ozs7OztJQU1oQiwwQ0FBd0M7Ozs7O0lBR3hDLGdDQUFvQjs7Ozs7SUFHcEIseUNBQTZCOzs7OztJQUc3Qix1Q0FBcUM7Ozs7O0lBR3JDLHFDQUEwQjs7Ozs7SUFHMUIsbUNBQXdCOzs7OztJQUd4QixzQ0FBMkI7Ozs7O0lBRzNCLHNDQUEyQjs7Ozs7SUFHM0Isd0NBQTZCOzs7Ozs7O0lBTzdCLHlDQUE4Qjs7Ozs7OztJQUc5QixxRUFBbUQ7Ozs7O0lBRW5ELHFEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuXG4vKiogQW4gaW50ZXJmYWNlIHdoaWNoIGFsbG93cyBhIGNvbnRyb2wgdG8gd29yayBpbnNpZGUgb2YgYSBgTdGBRm9ybUZpZWxkYC4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1jRm9ybUZpZWxkQ29udHJvbDxUPiB7XG4gICAgLyoqIFRoZSB2YWx1ZSBvZiB0aGUgY29udHJvbC4gKi9cbiAgICB2YWx1ZTogVCB8IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuZXZlciB0aGUgc3RhdGUgb2YgdGhlIGNvbnRyb2wgY2hhbmdlcyBzdWNoIHRoYXQgdGhlIHBhcmVudCBgTdGBRm9ybUZpZWxkYFxuICAgICAqIG5lZWRzIHRvIHJ1biBjaGFuZ2UgZGV0ZWN0aW9uLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IHN0YXRlQ2hhbmdlczogT2JzZXJ2YWJsZTx2b2lkPjtcblxuICAgIC8qKiBUaGUgZWxlbWVudCBJRCBmb3IgdGhpcyBjb250cm9sLiAqL1xuICAgIHJlYWRvbmx5IGlkOiBzdHJpbmc7XG5cbiAgICAvKiogVGhlIHBsYWNlaG9sZGVyIGZvciB0aGlzIGNvbnRyb2wuICovXG4gICAgcmVhZG9ubHkgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIC8qKiBHZXRzIHRoZSBOZ0NvbnRyb2wgZm9yIHRoaXMgY29udHJvbC4gKi9cbiAgICByZWFkb25seSBuZ0NvbnRyb2w6IE5nQ29udHJvbCB8IG51bGw7XG5cbiAgICAvKiogV2hldGhlciB0aGUgY29udHJvbCBpcyBmb2N1c2VkLiAqL1xuICAgIHJlYWRvbmx5IGZvY3VzZWQ6IGJvb2xlYW47XG5cbiAgICAvKiogV2hldGhlciB0aGUgY29udHJvbCBpcyBlbXB0eS4gKi9cbiAgICByZWFkb25seSBlbXB0eTogYm9vbGVhbjtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBjb250cm9sIGlzIHJlcXVpcmVkLiAqL1xuICAgIHJlYWRvbmx5IHJlcXVpcmVkOiBib29sZWFuO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGNvbnRyb2wgaXMgZGlzYWJsZWQuICovXG4gICAgcmVhZG9ubHkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICAvKiogV2hldGhlciB0aGUgY29udHJvbCBpcyBpbiBhbiBlcnJvciBzdGF0ZS4gKi9cbiAgICByZWFkb25seSBlcnJvclN0YXRlOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogQW4gb3B0aW9uYWwgbmFtZSBmb3IgdGhlIGNvbnRyb2wgdHlwZSB0aGF0IGNhbiBiZSB1c2VkIHRvIGRpc3Rpbmd1aXNoIGBtYy1mb3JtLWZpZWxkYCBlbGVtZW50c1xuICAgICAqIGJhc2VkIG9uIHRoZWlyIGNvbnRyb2wgdHlwZS4gVGhlIGZvcm0gZmllbGQgd2lsbCBhZGQgYSBjbGFzcyxcbiAgICAgKiBgbWMtZm9ybS1maWVsZC10eXBlLXt7Y29udHJvbFR5cGV9fWAgdG8gaXRzIHJvb3QgZWxlbWVudC5cbiAgICAgKi9cbiAgICByZWFkb25seSBjb250cm9sVHlwZT86IHN0cmluZztcblxuICAgIC8qKiBIYW5kbGVzIGEgY2xpY2sgb24gdGhlIGNvbnRyb2wncyBjb250YWluZXIuICovXG4gICAgYWJzdHJhY3Qgb25Db250YWluZXJDbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQ7XG5cbiAgICBhYnN0cmFjdCBmb2N1cygpOiB2b2lkO1xufVxuIl19