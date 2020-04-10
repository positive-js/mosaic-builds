/**
 * @fileoverview added by tsickle
 * Generated from: modal-ref.class.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * API class that public to users to handle the modal instance.
 * McModalRef is aim to avoid accessing to the modal instance directly by users.
 * @abstract
 * @template T, R
 */
// tslint:disable-next-line:naming-convention
export class McModalRef {
}
if (false) {
    /** @type {?} */
    McModalRef.prototype.afterOpen;
    /** @type {?} */
    McModalRef.prototype.afterClose;
    /**
     * @abstract
     * @return {?}
     */
    McModalRef.prototype.open = function () { };
    /**
     * @abstract
     * @param {?=} result
     * @return {?}
     */
    McModalRef.prototype.close = function (result) { };
    /**
     * @abstract
     * @param {?=} result
     * @return {?}
     */
    McModalRef.prototype.destroy = function (result) { };
    /**
     * Trigger the mcOnOk/mcOnCancel by manual
     * @abstract
     * @return {?}
     */
    McModalRef.prototype.triggerOk = function () { };
    /**
     * @abstract
     * @return {?}
     */
    McModalRef.prototype.triggerCancel = function () { };
    /**
     * Return the component instance of mcContent when specify mcContent as a Component
     * Note: this method may return undefined if the Component has not ready yet.
     * (it only available after Modal's ngOnInit)
     * @abstract
     * @return {?}
     */
    McModalRef.prototype.getContentComponent = function () { };
    /**
     * Get the dom element of this Modal
     * @abstract
     * @return {?}
     */
    McModalRef.prototype.getElement = function () { };
    /**
     * Get the instance of the Modal itself
     * @abstract
     * @return {?}
     */
    McModalRef.prototype.getInstance = function () { };
    /**
     * Call markForCheck for change detector
     * @abstract
     * @return {?}
     */
    McModalRef.prototype.markForCheck = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtcmVmLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL21vZGFsLyIsInNvdXJjZXMiOlsibW9kYWwtcmVmLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVVBLE1BQU0sT0FBZ0IsVUFBVTtDQTZDL0I7OztJQTVDRywrQkFBcUM7O0lBQ3JDLGdDQUFtQzs7Ozs7SUFFbkMsNENBQXNCOzs7Ozs7SUFFdEIsbURBQWlDOzs7Ozs7SUFFakMscURBQW1DOzs7Ozs7SUFLbkMsaURBQTJCOzs7OztJQUUzQixxREFBK0I7Ozs7Ozs7O0lBYy9CLDJEQUFrQzs7Ozs7O0lBS2xDLGtEQUFtQzs7Ozs7O0lBS25DLG1EQUF5Qzs7Ozs7O0lBS3pDLG9EQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTWNNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwuY29tcG9uZW50JztcblxuXG4vKipcbiAqIEFQSSBjbGFzcyB0aGF0IHB1YmxpYyB0byB1c2VycyB0byBoYW5kbGUgdGhlIG1vZGFsIGluc3RhbmNlLlxuICogTWNNb2RhbFJlZiBpcyBhaW0gdG8gYXZvaWQgYWNjZXNzaW5nIHRvIHRoZSBtb2RhbCBpbnN0YW5jZSBkaXJlY3RseSBieSB1c2Vycy5cbiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWNNb2RhbFJlZjxUID0gYW55LCBSID0gYW55PiB7XG4gICAgYWJzdHJhY3QgYWZ0ZXJPcGVuOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICAgIGFic3RyYWN0IGFmdGVyQ2xvc2U6IE9ic2VydmFibGU8Uj47XG5cbiAgICBhYnN0cmFjdCBvcGVuKCk6IHZvaWQ7XG5cbiAgICBhYnN0cmFjdCBjbG9zZShyZXN1bHQ/OiBSKTogdm9pZDtcblxuICAgIGFic3RyYWN0IGRlc3Ryb3kocmVzdWx0PzogUik6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyIHRoZSBtY09uT2svbWNPbkNhbmNlbCBieSBtYW51YWxcbiAgICAgKi9cbiAgICBhYnN0cmFjdCB0cmlnZ2VyT2soKTogdm9pZDtcblxuICAgIGFic3RyYWN0IHRyaWdnZXJDYW5jZWwoKTogdm9pZDtcblxuICAgIC8vIC8qKlxuICAgIC8vICAqIFJldHVybiB0aGUgQ29tcG9uZW50UmVmIG9mIG1jQ29udGVudCB3aGVuIHNwZWNpZnkgbWNDb250ZW50IGFzIGEgQ29tcG9uZW50XG4gICAgLy8gICogTm90ZTogdGhpcyBtZXRob2QgbWF5IHJldHVybiB1bmRlZmluZWQgaWYgdGhlIENvbXBvbmVudCBoYXMgbm90IHJlYWR5IHlldC5cbiAgICAvLyAgICAoaXQgb25seSBhdmFpbGFibGUgYWZ0ZXIgTW9kYWwncyBuZ09uSW5pdClcbiAgICAvLyAgKi9cbiAgICAvLyBhYnN0cmFjdCBnZXRDb250ZW50Q29tcG9uZW50UmVmKCk6IENvbXBvbmVudFJlZjx7fT47XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIGNvbXBvbmVudCBpbnN0YW5jZSBvZiBtY0NvbnRlbnQgd2hlbiBzcGVjaWZ5IG1jQ29udGVudCBhcyBhIENvbXBvbmVudFxuICAgICAqIE5vdGU6IHRoaXMgbWV0aG9kIG1heSByZXR1cm4gdW5kZWZpbmVkIGlmIHRoZSBDb21wb25lbnQgaGFzIG5vdCByZWFkeSB5ZXQuXG4gICAgICogKGl0IG9ubHkgYXZhaWxhYmxlIGFmdGVyIE1vZGFsJ3MgbmdPbkluaXQpXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0Q29udGVudENvbXBvbmVudCgpOiBUO1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBkb20gZWxlbWVudCBvZiB0aGlzIE1vZGFsXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0RWxlbWVudCgpOiBIVE1MRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgaW5zdGFuY2Ugb2YgdGhlIE1vZGFsIGl0c2VsZlxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldEluc3RhbmNlKCk6IE1jTW9kYWxDb21wb25lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBDYWxsIG1hcmtGb3JDaGVjayBmb3IgY2hhbmdlIGRldGVjdG9yXG4gICAgICovXG4gICAgYWJzdHJhY3QgbWFya0ZvckNoZWNrKCk7XG59XG4iXX0=