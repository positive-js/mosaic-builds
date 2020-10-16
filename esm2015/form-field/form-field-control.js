/**
 * @fileoverview added by tsickle
 * Generated from: form-field-control.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC1jb250cm9sLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvZm9ybS1maWVsZC8iLCJzb3VyY2VzIjpbImZvcm0tZmllbGQtY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQU1BLE1BQU0sT0FBZ0Isa0JBQWtCO0NBNkN2Qzs7Ozs7O0lBM0NHLG1DQUFnQjs7Ozs7O0lBTWhCLDBDQUF3Qzs7Ozs7SUFHeEMsZ0NBQW9COzs7OztJQUdwQix5Q0FBNkI7Ozs7O0lBRzdCLHVDQUFxQzs7Ozs7SUFHckMscUNBQTBCOzs7OztJQUcxQixtQ0FBd0I7Ozs7O0lBR3hCLHNDQUEyQjs7Ozs7SUFHM0Isc0NBQTJCOzs7OztJQUczQix3Q0FBNkI7Ozs7Ozs7SUFPN0IseUNBQThCOzs7Ozs7O0lBRzlCLHFFQUFtRDs7Ozs7SUFFbkQscURBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5cbi8qKiBBbiBpbnRlcmZhY2Ugd2hpY2ggYWxsb3dzIGEgY29udHJvbCB0byB3b3JrIGluc2lkZSBvZiBhIGBN0YFGb3JtRmllbGRgLiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWNGb3JtRmllbGRDb250cm9sPFQ+IHtcbiAgICAvKiogVGhlIHZhbHVlIG9mIHRoZSBjb250cm9sLiAqL1xuICAgIHZhbHVlOiBUIHwgbnVsbDtcblxuICAgIC8qKlxuICAgICAqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSBzdGF0ZSBvZiB0aGUgY29udHJvbCBjaGFuZ2VzIHN1Y2ggdGhhdCB0aGUgcGFyZW50IGBN0YFGb3JtRmllbGRgXG4gICAgICogbmVlZHMgdG8gcnVuIGNoYW5nZSBkZXRlY3Rpb24uXG4gICAgICovXG4gICAgcmVhZG9ubHkgc3RhdGVDaGFuZ2VzOiBPYnNlcnZhYmxlPHZvaWQ+O1xuXG4gICAgLyoqIFRoZSBlbGVtZW50IElEIGZvciB0aGlzIGNvbnRyb2wuICovXG4gICAgcmVhZG9ubHkgaWQ6IHN0cmluZztcblxuICAgIC8qKiBUaGUgcGxhY2Vob2xkZXIgZm9yIHRoaXMgY29udHJvbC4gKi9cbiAgICByZWFkb25seSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgLyoqIEdldHMgdGhlIE5nQ29udHJvbCBmb3IgdGhpcyBjb250cm9sLiAqL1xuICAgIHJlYWRvbmx5IG5nQ29udHJvbDogTmdDb250cm9sIHwgbnVsbDtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBjb250cm9sIGlzIGZvY3VzZWQuICovXG4gICAgcmVhZG9ubHkgZm9jdXNlZDogYm9vbGVhbjtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBjb250cm9sIGlzIGVtcHR5LiAqL1xuICAgIHJlYWRvbmx5IGVtcHR5OiBib29sZWFuO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGNvbnRyb2wgaXMgcmVxdWlyZWQuICovXG4gICAgcmVhZG9ubHkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgICAvKiogV2hldGhlciB0aGUgY29udHJvbCBpcyBkaXNhYmxlZC4gKi9cbiAgICByZWFkb25seSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBjb250cm9sIGlzIGluIGFuIGVycm9yIHN0YXRlLiAqL1xuICAgIHJlYWRvbmx5IGVycm9yU3RhdGU6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBBbiBvcHRpb25hbCBuYW1lIGZvciB0aGUgY29udHJvbCB0eXBlIHRoYXQgY2FuIGJlIHVzZWQgdG8gZGlzdGluZ3Vpc2ggYG1jLWZvcm0tZmllbGRgIGVsZW1lbnRzXG4gICAgICogYmFzZWQgb24gdGhlaXIgY29udHJvbCB0eXBlLiBUaGUgZm9ybSBmaWVsZCB3aWxsIGFkZCBhIGNsYXNzLFxuICAgICAqIGBtYy1mb3JtLWZpZWxkLXR5cGUte3tjb250cm9sVHlwZX19YCB0byBpdHMgcm9vdCBlbGVtZW50LlxuICAgICAqL1xuICAgIHJlYWRvbmx5IGNvbnRyb2xUeXBlPzogc3RyaW5nO1xuXG4gICAgLyoqIEhhbmRsZXMgYSBjbGljayBvbiB0aGUgY29udHJvbCdzIGNvbnRhaW5lci4gKi9cbiAgICBhYnN0cmFjdCBvbkNvbnRhaW5lckNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZDtcblxuICAgIGFic3RyYWN0IGZvY3VzKCk6IHZvaWQ7XG59XG4iXX0=