/**
 * @fileoverview added by tsickle
 * Generated from: modal-ref.class.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtcmVmLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvbW9kYWwvIiwic291cmNlcyI6WyJtb2RhbC1yZWYuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBVUEsTUFBTSxPQUFnQixVQUFVO0NBNkMvQjs7O0lBNUNHLCtCQUFxQzs7SUFDckMsZ0NBQW1DOzs7OztJQUVuQyw0Q0FBc0I7Ozs7OztJQUV0QixtREFBaUM7Ozs7OztJQUVqQyxxREFBbUM7Ozs7OztJQUtuQyxpREFBMkI7Ozs7O0lBRTNCLHFEQUErQjs7Ozs7Ozs7SUFjL0IsMkRBQWtDOzs7Ozs7SUFLbEMsa0RBQW1DOzs7Ozs7SUFLbkMsbURBQXlDOzs7Ozs7SUFLekMsb0RBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBNY01vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC5jb21wb25lbnQnO1xuXG5cbi8qKlxuICogQVBJIGNsYXNzIHRoYXQgcHVibGljIHRvIHVzZXJzIHRvIGhhbmRsZSB0aGUgbW9kYWwgaW5zdGFuY2UuXG4gKiBNY01vZGFsUmVmIGlzIGFpbSB0byBhdm9pZCBhY2Nlc3NpbmcgdG8gdGhlIG1vZGFsIGluc3RhbmNlIGRpcmVjdGx5IGJ5IHVzZXJzLlxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNY01vZGFsUmVmPFQgPSBhbnksIFIgPSBhbnk+IHtcbiAgICBhYnN0cmFjdCBhZnRlck9wZW46IE9ic2VydmFibGU8dm9pZD47XG4gICAgYWJzdHJhY3QgYWZ0ZXJDbG9zZTogT2JzZXJ2YWJsZTxSPjtcblxuICAgIGFic3RyYWN0IG9wZW4oKTogdm9pZDtcblxuICAgIGFic3RyYWN0IGNsb3NlKHJlc3VsdD86IFIpOiB2b2lkO1xuXG4gICAgYWJzdHJhY3QgZGVzdHJveShyZXN1bHQ/OiBSKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXIgdGhlIG1jT25Pay9tY09uQ2FuY2VsIGJ5IG1hbnVhbFxuICAgICAqL1xuICAgIGFic3RyYWN0IHRyaWdnZXJPaygpOiB2b2lkO1xuXG4gICAgYWJzdHJhY3QgdHJpZ2dlckNhbmNlbCgpOiB2b2lkO1xuXG4gICAgLy8gLyoqXG4gICAgLy8gICogUmV0dXJuIHRoZSBDb21wb25lbnRSZWYgb2YgbWNDb250ZW50IHdoZW4gc3BlY2lmeSBtY0NvbnRlbnQgYXMgYSBDb21wb25lbnRcbiAgICAvLyAgKiBOb3RlOiB0aGlzIG1ldGhvZCBtYXkgcmV0dXJuIHVuZGVmaW5lZCBpZiB0aGUgQ29tcG9uZW50IGhhcyBub3QgcmVhZHkgeWV0LlxuICAgIC8vICAgIChpdCBvbmx5IGF2YWlsYWJsZSBhZnRlciBNb2RhbCdzIG5nT25Jbml0KVxuICAgIC8vICAqL1xuICAgIC8vIGFic3RyYWN0IGdldENvbnRlbnRDb21wb25lbnRSZWYoKTogQ29tcG9uZW50UmVmPHt9PjtcblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgY29tcG9uZW50IGluc3RhbmNlIG9mIG1jQ29udGVudCB3aGVuIHNwZWNpZnkgbWNDb250ZW50IGFzIGEgQ29tcG9uZW50XG4gICAgICogTm90ZTogdGhpcyBtZXRob2QgbWF5IHJldHVybiB1bmRlZmluZWQgaWYgdGhlIENvbXBvbmVudCBoYXMgbm90IHJlYWR5IHlldC5cbiAgICAgKiAoaXQgb25seSBhdmFpbGFibGUgYWZ0ZXIgTW9kYWwncyBuZ09uSW5pdClcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXRDb250ZW50Q29tcG9uZW50KCk6IFQ7XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGRvbSBlbGVtZW50IG9mIHRoaXMgTW9kYWxcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXRFbGVtZW50KCk6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBpbnN0YW5jZSBvZiB0aGUgTW9kYWwgaXRzZWxmXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0SW5zdGFuY2UoKTogTWNNb2RhbENvbXBvbmVudDtcblxuICAgIC8qKlxuICAgICAqIENhbGwgbWFya0ZvckNoZWNrIGZvciBjaGFuZ2UgZGV0ZWN0b3JcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBtYXJrRm9yQ2hlY2soKTtcbn1cbiJdfQ==