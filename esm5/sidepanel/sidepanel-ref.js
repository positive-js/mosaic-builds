/**
 * @fileoverview added by tsickle
 * Generated from: sidepanel-ref.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { merge, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { McSidepanelAnimationState } from './sidepanel-animations';
// Counter for unique sidepanel ids.
/** @type {?} */
var uniqueId = 0;
/**
 * @template T, R
 */
var /**
 * @template T, R
 */
McSidepanelRef = /** @class */ (function () {
    function McSidepanelRef(containerInstance, overlayRef, config) {
        var _this = this;
        this.containerInstance = containerInstance;
        this.overlayRef = overlayRef;
        this.config = config;
        /**
         * Subject for notifying the user that the sidepanel has been closed and dismissed.
         */
        this.afterClosed$ = new Subject();
        /**
         * Subject for notifying the user that the sidepanel has opened and appeared.
         */
        this.afterOpened$ = new Subject();
        this.id = this.config.id || "mc-sidepanel-" + uniqueId++;
        this.containerInstance.id = this.id;
        // Emit when opening animation completes
        containerInstance.animationStateChanged.pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event.phaseName === 'done' && event.toState === McSidepanelAnimationState.Visible; })), take(1)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.afterOpened$.next();
            _this.afterOpened$.complete();
        }));
        // Dispose overlay when closing animation is complete
        containerInstance.animationStateChanged.pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event.phaseName === 'done' && event.toState === McSidepanelAnimationState.Hidden; })), take(1)).subscribe((/**
         * @return {?}
         */
        function () {
            overlayRef.dispose();
            _this.afterClosed$.next(_this.result);
            _this.afterClosed$.complete();
        }));
        if (!containerInstance.sidepanelConfig.disableClose) {
            merge(overlayRef.backdropClick(), overlayRef.keydownEvents().pipe(
            // tslint:disable:deprecation
            // keyCode is deprecated, but IE11 and Edge don't support code property, which we need use instead
            filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event.keyCode === ESCAPE; })))).subscribe((/**
             * @return {?}
             */
            function () { return _this.close(); }));
        }
    }
    /**
     * @param {?=} result
     * @return {?}
     */
    McSidepanelRef.prototype.close = /**
     * @param {?=} result
     * @return {?}
     */
    function (result) {
        var _this = this;
        if (!this.afterClosed$.closed) {
            // Transition the backdrop in parallel to the sidepanel.
            this.containerInstance.animationStateChanged.pipe(filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event.phaseName === 'done'; })), take(1)).subscribe((/**
             * @return {?}
             */
            function () { return _this.overlayRef.detachBackdrop(); }));
            this.result = result;
            this.containerInstance.exit();
        }
    };
    /** Gets an observable that is notified when the sidepanel is finished closing. */
    /**
     * Gets an observable that is notified when the sidepanel is finished closing.
     * @return {?}
     */
    McSidepanelRef.prototype.afterClosed = /**
     * Gets an observable that is notified when the sidepanel is finished closing.
     * @return {?}
     */
    function () {
        return this.afterClosed$.asObservable();
    };
    /** Gets an observable that is notified when the sidepanel has opened and appeared. */
    /**
     * Gets an observable that is notified when the sidepanel has opened and appeared.
     * @return {?}
     */
    McSidepanelRef.prototype.afterOpened = /**
     * Gets an observable that is notified when the sidepanel has opened and appeared.
     * @return {?}
     */
    function () {
        return this.afterOpened$.asObservable();
    };
    return McSidepanelRef;
}());
/**
 * @template T, R
 */
export { McSidepanelRef };
if (false) {
    /** @type {?} */
    McSidepanelRef.prototype.id;
    /**
     * Instance of the component making up the content of the sidepanel.
     * @type {?}
     */
    McSidepanelRef.prototype.instance;
    /**
     * Subject for notifying the user that the sidepanel has been closed and dismissed.
     * @type {?}
     * @private
     */
    McSidepanelRef.prototype.afterClosed$;
    /**
     * Subject for notifying the user that the sidepanel has opened and appeared.
     * @type {?}
     * @private
     */
    McSidepanelRef.prototype.afterOpened$;
    /**
     * Result to be passed down to the `afterDismissed` stream.
     * @type {?}
     * @private
     */
    McSidepanelRef.prototype.result;
    /** @type {?} */
    McSidepanelRef.prototype.containerInstance;
    /**
     * @type {?}
     * @private
     */
    McSidepanelRef.prototype.overlayRef;
    /** @type {?} */
    McSidepanelRef.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLXJlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9zaWRlcGFuZWwvIiwic291cmNlcyI6WyJzaWRlcGFuZWwtcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxLQUFLLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7OztJQU0vRCxRQUFRLEdBQUcsQ0FBQzs7OztBQUVoQjs7OztJQWVJLHdCQUNXLGlCQUFnRCxFQUMvQyxVQUFzQixFQUN2QixNQUF5QjtRQUhwQyxpQkF5Q0M7UUF4Q1Usc0JBQWlCLEdBQWpCLGlCQUFpQixDQUErQjtRQUMvQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3ZCLFdBQU0sR0FBTixNQUFNLENBQW1COzs7O1FBWG5CLGlCQUFZLEdBQUcsSUFBSSxPQUFPLEVBQWlCLENBQUM7Ozs7UUFHNUMsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBVWhELElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksa0JBQWdCLFFBQVEsRUFBSSxDQUFDO1FBQ3pELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUVwQyx3Q0FBd0M7UUFDeEMsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUN4QyxNQUFNOzs7O1FBQ0YsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFLLENBQUMsU0FBUyxLQUFLLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLHlCQUF5QixDQUFDLE9BQU8sRUFBakYsQ0FBaUYsRUFDL0YsRUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1YsQ0FBQyxTQUFTOzs7UUFBQztZQUNSLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDekIsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqQyxDQUFDLEVBQUMsQ0FBQztRQUVILHFEQUFxRDtRQUNyRCxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQ3hDLE1BQU07Ozs7UUFDRixVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUssQ0FBQyxTQUFTLEtBQUssTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUsseUJBQXlCLENBQUMsTUFBTSxFQUFoRixDQUFnRixFQUM5RixFQUNELElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDVixDQUFDLFNBQVM7OztRQUFDO1lBQ1IsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3JCLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQyxLQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pDLENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUU7WUFDakQsS0FBSyxDQUNELFVBQVUsQ0FBQyxhQUFhLEVBQUUsRUFDMUIsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUk7WUFDM0IsNkJBQTZCO1lBQzdCLGtHQUFrRztZQUNsRyxNQUFNOzs7O1lBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFLLENBQUMsT0FBTyxLQUFLLE1BQU0sRUFBeEIsQ0FBd0IsRUFBQyxDQUM5QyxDQUNKLENBQUMsU0FBUzs7O1lBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBWixDQUFZLEVBQUMsQ0FBQztTQUNuQztJQUNMLENBQUM7Ozs7O0lBRUQsOEJBQUs7Ozs7SUFBTCxVQUFNLE1BQVU7UUFBaEIsaUJBV0M7UUFWRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7WUFDM0Isd0RBQXdEO1lBQ3hELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQzdDLE1BQU07Ozs7WUFBQyxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUssQ0FBQyxTQUFTLEtBQUssTUFBTSxFQUExQixDQUEwQixFQUFDLEVBQzdDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDVixDQUFDLFNBQVM7OztZQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxFQUFoQyxDQUFnQyxFQUFDLENBQUM7WUFFcEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztJQUVELGtGQUFrRjs7Ozs7SUFDbEYsb0NBQVc7Ozs7SUFBWDtRQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBRUQsc0ZBQXNGOzs7OztJQUN0RixvQ0FBVzs7OztJQUFYO1FBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUFoRkQsSUFnRkM7Ozs7Ozs7SUEvRUcsNEJBQW9COzs7OztJQUdwQixrQ0FBWTs7Ozs7O0lBR1osc0NBQTZEOzs7Ozs7SUFHN0Qsc0NBQW9EOzs7Ozs7SUFHcEQsZ0NBQThCOztJQUcxQiwyQ0FBdUQ7Ozs7O0lBQ3ZELG9DQUE4Qjs7SUFDOUIsZ0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IEVTQ0FQRSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNY1NpZGVwYW5lbEFuaW1hdGlvblN0YXRlIH0gZnJvbSAnLi9zaWRlcGFuZWwtYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBNY1NpZGVwYW5lbENvbmZpZyB9IGZyb20gJy4vc2lkZXBhbmVsLWNvbmZpZyc7XG5pbXBvcnQgeyBNY1NpZGVwYW5lbENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vc2lkZXBhbmVsLWNvbnRhaW5lci5jb21wb25lbnQnO1xuXG5cbi8vIENvdW50ZXIgZm9yIHVuaXF1ZSBzaWRlcGFuZWwgaWRzLlxubGV0IHVuaXF1ZUlkID0gMDtcblxuZXhwb3J0IGNsYXNzIE1jU2lkZXBhbmVsUmVmPFQgPSBhbnksIFIgPSBhbnk+IHtcbiAgICByZWFkb25seSBpZDogc3RyaW5nO1xuXG4gICAgLyoqIEluc3RhbmNlIG9mIHRoZSBjb21wb25lbnQgbWFraW5nIHVwIHRoZSBjb250ZW50IG9mIHRoZSBzaWRlcGFuZWwuICovXG4gICAgaW5zdGFuY2U6IFQ7XG5cbiAgICAvKiogU3ViamVjdCBmb3Igbm90aWZ5aW5nIHRoZSB1c2VyIHRoYXQgdGhlIHNpZGVwYW5lbCBoYXMgYmVlbiBjbG9zZWQgYW5kIGRpc21pc3NlZC4gKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IGFmdGVyQ2xvc2VkJCA9IG5ldyBTdWJqZWN0PFIgfCB1bmRlZmluZWQ+KCk7XG5cbiAgICAvKiogU3ViamVjdCBmb3Igbm90aWZ5aW5nIHRoZSB1c2VyIHRoYXQgdGhlIHNpZGVwYW5lbCBoYXMgb3BlbmVkIGFuZCBhcHBlYXJlZC4gKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IGFmdGVyT3BlbmVkJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICAvKiogUmVzdWx0IHRvIGJlIHBhc3NlZCBkb3duIHRvIHRoZSBgYWZ0ZXJEaXNtaXNzZWRgIHN0cmVhbS4gKi9cbiAgICBwcml2YXRlIHJlc3VsdDogUiB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgY29udGFpbmVySW5zdGFuY2U6IE1jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICBwcml2YXRlIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsXG4gICAgICAgIHB1YmxpYyBjb25maWc6IE1jU2lkZXBhbmVsQ29uZmlnKSB7XG5cbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuY29uZmlnLmlkIHx8IGBtYy1zaWRlcGFuZWwtJHt1bmlxdWVJZCsrfWA7XG4gICAgICAgIHRoaXMuY29udGFpbmVySW5zdGFuY2UuaWQgPSB0aGlzLmlkO1xuXG4gICAgICAgIC8vIEVtaXQgd2hlbiBvcGVuaW5nIGFuaW1hdGlvbiBjb21wbGV0ZXNcbiAgICAgICAgY29udGFpbmVySW5zdGFuY2UuYW5pbWF0aW9uU3RhdGVDaGFuZ2VkLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgICAgICAgKGV2ZW50KSA9PiBldmVudC5waGFzZU5hbWUgPT09ICdkb25lJyAmJiBldmVudC50b1N0YXRlID09PSBNY1NpZGVwYW5lbEFuaW1hdGlvblN0YXRlLlZpc2libGVcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICB0YWtlKDEpXG4gICAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWZ0ZXJPcGVuZWQkLm5leHQoKTtcbiAgICAgICAgICAgIHRoaXMuYWZ0ZXJPcGVuZWQkLmNvbXBsZXRlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIERpc3Bvc2Ugb3ZlcmxheSB3aGVuIGNsb3NpbmcgYW5pbWF0aW9uIGlzIGNvbXBsZXRlXG4gICAgICAgIGNvbnRhaW5lckluc3RhbmNlLmFuaW1hdGlvblN0YXRlQ2hhbmdlZC5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKFxuICAgICAgICAgICAgICAgIChldmVudCkgPT4gZXZlbnQucGhhc2VOYW1lID09PSAnZG9uZScgJiYgZXZlbnQudG9TdGF0ZSA9PT0gTWNTaWRlcGFuZWxBbmltYXRpb25TdGF0ZS5IaWRkZW5cbiAgICAgICAgICAgICksXG4gICAgICAgICAgICB0YWtlKDEpXG4gICAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIG92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5hZnRlckNsb3NlZCQubmV4dCh0aGlzLnJlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLmFmdGVyQ2xvc2VkJC5jb21wbGV0ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNvbnRhaW5lckluc3RhbmNlLnNpZGVwYW5lbENvbmZpZy5kaXNhYmxlQ2xvc2UpIHtcbiAgICAgICAgICAgIG1lcmdlKFxuICAgICAgICAgICAgICAgIG92ZXJsYXlSZWYuYmFja2Ryb3BDbGljaygpLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlSZWYua2V5ZG93bkV2ZW50cygpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlOmRlcHJlY2F0aW9uXG4gICAgICAgICAgICAgICAgICAgIC8vIGtleUNvZGUgaXMgZGVwcmVjYXRlZCwgYnV0IElFMTEgYW5kIEVkZ2UgZG9uJ3Qgc3VwcG9ydCBjb2RlIHByb3BlcnR5LCB3aGljaCB3ZSBuZWVkIHVzZSBpbnN0ZWFkXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcigoZXZlbnQpID0+IGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2UocmVzdWx0PzogUik6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuYWZ0ZXJDbG9zZWQkLmNsb3NlZCkge1xuICAgICAgICAgICAgLy8gVHJhbnNpdGlvbiB0aGUgYmFja2Ryb3AgaW4gcGFyYWxsZWwgdG8gdGhlIHNpZGVwYW5lbC5cbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVySW5zdGFuY2UuYW5pbWF0aW9uU3RhdGVDaGFuZ2VkLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKChldmVudCkgPT4gZXZlbnQucGhhc2VOYW1lID09PSAnZG9uZScpLFxuICAgICAgICAgICAgICAgIHRha2UoMSlcbiAgICAgICAgICAgICkuc3Vic2NyaWJlKCgpID0+IHRoaXMub3ZlcmxheVJlZi5kZXRhY2hCYWNrZHJvcCgpKTtcblxuICAgICAgICAgICAgdGhpcy5yZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lckluc3RhbmNlLmV4aXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBHZXRzIGFuIG9ic2VydmFibGUgdGhhdCBpcyBub3RpZmllZCB3aGVuIHRoZSBzaWRlcGFuZWwgaXMgZmluaXNoZWQgY2xvc2luZy4gKi9cbiAgICBhZnRlckNsb3NlZCgpOiBPYnNlcnZhYmxlPFIgfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWZ0ZXJDbG9zZWQkLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIC8qKiBHZXRzIGFuIG9ic2VydmFibGUgdGhhdCBpcyBub3RpZmllZCB3aGVuIHRoZSBzaWRlcGFuZWwgaGFzIG9wZW5lZCBhbmQgYXBwZWFyZWQuICovXG4gICAgYWZ0ZXJPcGVuZWQoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFmdGVyT3BlbmVkJC5hc09ic2VydmFibGUoKTtcbiAgICB9XG59XG4iXX0=