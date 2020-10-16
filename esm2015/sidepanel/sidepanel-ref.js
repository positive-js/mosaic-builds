/**
 * @fileoverview added by tsickle
 * Generated from: sidepanel-ref.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { merge, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { McSidepanelAnimationState } from './sidepanel-animations';
// Counter for unique sidepanel ids.
/** @type {?} */
let uniqueId = 0;
/**
 * @template T, R
 */
export class McSidepanelRef {
    /**
     * @param {?} containerInstance
     * @param {?} overlayRef
     * @param {?} config
     */
    constructor(containerInstance, overlayRef, config) {
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
        this.id = this.config.id || `mc-sidepanel-${uniqueId++}`;
        this.containerInstance.id = this.id;
        // Emit when opening animation completes
        containerInstance.animationStateChanged.pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        (event) => event.phaseName === 'done' && event.toState === McSidepanelAnimationState.Visible)), take(1)).subscribe((/**
         * @return {?}
         */
        () => {
            this.afterOpened$.next();
            this.afterOpened$.complete();
        }));
        // Dispose overlay when closing animation is complete
        containerInstance.animationStateChanged.pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        (event) => event.phaseName === 'done' && event.toState === McSidepanelAnimationState.Hidden)), take(1)).subscribe((/**
         * @return {?}
         */
        () => {
            overlayRef.dispose();
            this.afterClosed$.next(this.result);
            this.afterClosed$.complete();
        }));
        if (!containerInstance.sidepanelConfig.disableClose) {
            merge(overlayRef.backdropClick(), overlayRef.keydownEvents().pipe(
            // tslint:disable:deprecation
            // keyCode is deprecated, but IE11 and Edge don't support code property, which we need use instead
            filter((/**
             * @param {?} event
             * @return {?}
             */
            (event) => event.keyCode === ESCAPE)))).subscribe((/**
             * @return {?}
             */
            () => this.close()));
        }
    }
    /**
     * @param {?=} result
     * @return {?}
     */
    close(result) {
        if (!this.afterClosed$.closed) {
            // Transition the backdrop in parallel to the sidepanel.
            this.containerInstance.animationStateChanged.pipe(filter((/**
             * @param {?} event
             * @return {?}
             */
            (event) => event.phaseName === 'done')), take(1)).subscribe((/**
             * @return {?}
             */
            () => this.overlayRef.detachBackdrop()));
            this.result = result;
            this.containerInstance.exit();
        }
    }
    /**
     * Gets an observable that is notified when the sidepanel is finished closing.
     * @return {?}
     */
    afterClosed() {
        return this.afterClosed$.asObservable();
    }
    /**
     * Gets an observable that is notified when the sidepanel has opened and appeared.
     * @return {?}
     */
    afterOpened() {
        return this.afterOpened$.asObservable();
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLXJlZi5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL3NpZGVwYW5lbC8iLCJzb3VyY2VzIjpbInNpZGVwYW5lbC1yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLEtBQUssRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7O0lBTS9ELFFBQVEsR0FBRyxDQUFDOzs7O0FBRWhCLE1BQU0sT0FBTyxjQUFjOzs7Ozs7SUFldkIsWUFDVyxpQkFBZ0QsRUFDL0MsVUFBc0IsRUFDdkIsTUFBeUI7UUFGekIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUErQjtRQUMvQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3ZCLFdBQU0sR0FBTixNQUFNLENBQW1COzs7O1FBWG5CLGlCQUFZLEdBQUcsSUFBSSxPQUFPLEVBQWlCLENBQUM7Ozs7UUFHNUMsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBVWhELElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksZ0JBQWdCLFFBQVEsRUFBRSxFQUFFLENBQUM7UUFDekQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBRXBDLHdDQUF3QztRQUN4QyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQ3hDLE1BQU07Ozs7UUFDRixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyx5QkFBeUIsQ0FBQyxPQUFPLEVBQy9GLEVBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNWLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFO1lBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pDLENBQUMsRUFBQyxDQUFDO1FBRUgscURBQXFEO1FBQ3JELGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FDeEMsTUFBTTs7OztRQUNGLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLHlCQUF5QixDQUFDLE1BQU0sRUFDOUYsRUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1YsQ0FBQyxTQUFTOzs7UUFBQyxHQUFHLEVBQUU7WUFDYixVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakMsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRTtZQUNqRCxLQUFLLENBQ0QsVUFBVSxDQUFDLGFBQWEsRUFBRSxFQUMxQixVQUFVLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSTtZQUMzQiw2QkFBNkI7WUFDN0Isa0dBQWtHO1lBQ2xHLE1BQU07Ozs7WUFBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxNQUFNLEVBQUMsQ0FDOUMsQ0FDSixDQUFDLFNBQVM7OztZQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBQyxDQUFDO1NBQ25DO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxLQUFLLENBQUMsTUFBVTtRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTtZQUMzQix3REFBd0Q7WUFDeEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FDN0MsTUFBTTs7OztZQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLE1BQU0sRUFBQyxFQUM3QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1YsQ0FBQyxTQUFTOzs7WUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxFQUFDLENBQUM7WUFFcEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQzs7Ozs7SUFHRCxXQUFXO1FBQ1AsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzVDLENBQUM7Ozs7O0lBR0QsV0FBVztRQUNQLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0NBQ0o7OztJQS9FRyw0QkFBb0I7Ozs7O0lBR3BCLGtDQUFZOzs7Ozs7SUFHWixzQ0FBNkQ7Ozs7OztJQUc3RCxzQ0FBb0Q7Ozs7OztJQUdwRCxnQ0FBOEI7O0lBRzFCLDJDQUF1RDs7Ozs7SUFDdkQsb0NBQThCOztJQUM5QixnQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdmVybGF5UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgRVNDQVBFIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1jU2lkZXBhbmVsQW5pbWF0aW9uU3RhdGUgfSBmcm9tICcuL3NpZGVwYW5lbC1hbmltYXRpb25zJztcbmltcG9ydCB7IE1jU2lkZXBhbmVsQ29uZmlnIH0gZnJvbSAnLi9zaWRlcGFuZWwtY29uZmlnJztcbmltcG9ydCB7IE1jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9zaWRlcGFuZWwtY29udGFpbmVyLmNvbXBvbmVudCc7XG5cblxuLy8gQ291bnRlciBmb3IgdW5pcXVlIHNpZGVwYW5lbCBpZHMuXG5sZXQgdW5pcXVlSWQgPSAwO1xuXG5leHBvcnQgY2xhc3MgTWNTaWRlcGFuZWxSZWY8VCA9IGFueSwgUiA9IGFueT4ge1xuICAgIHJlYWRvbmx5IGlkOiBzdHJpbmc7XG5cbiAgICAvKiogSW5zdGFuY2Ugb2YgdGhlIGNvbXBvbmVudCBtYWtpbmcgdXAgdGhlIGNvbnRlbnQgb2YgdGhlIHNpZGVwYW5lbC4gKi9cbiAgICBpbnN0YW5jZTogVDtcblxuICAgIC8qKiBTdWJqZWN0IGZvciBub3RpZnlpbmcgdGhlIHVzZXIgdGhhdCB0aGUgc2lkZXBhbmVsIGhhcyBiZWVuIGNsb3NlZCBhbmQgZGlzbWlzc2VkLiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgYWZ0ZXJDbG9zZWQkID0gbmV3IFN1YmplY3Q8UiB8IHVuZGVmaW5lZD4oKTtcblxuICAgIC8qKiBTdWJqZWN0IGZvciBub3RpZnlpbmcgdGhlIHVzZXIgdGhhdCB0aGUgc2lkZXBhbmVsIGhhcyBvcGVuZWQgYW5kIGFwcGVhcmVkLiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgYWZ0ZXJPcGVuZWQkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKiBSZXN1bHQgdG8gYmUgcGFzc2VkIGRvd24gdG8gdGhlIGBhZnRlckRpc21pc3NlZGAgc3RyZWFtLiAqL1xuICAgIHByaXZhdGUgcmVzdWx0OiBSIHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBjb250YWluZXJJbnN0YW5jZTogTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQsXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZixcbiAgICAgICAgcHVibGljIGNvbmZpZzogTWNTaWRlcGFuZWxDb25maWcpIHtcblxuICAgICAgICB0aGlzLmlkID0gdGhpcy5jb25maWcuaWQgfHwgYG1jLXNpZGVwYW5lbC0ke3VuaXF1ZUlkKyt9YDtcbiAgICAgICAgdGhpcy5jb250YWluZXJJbnN0YW5jZS5pZCA9IHRoaXMuaWQ7XG5cbiAgICAgICAgLy8gRW1pdCB3aGVuIG9wZW5pbmcgYW5pbWF0aW9uIGNvbXBsZXRlc1xuICAgICAgICBjb250YWluZXJJbnN0YW5jZS5hbmltYXRpb25TdGF0ZUNoYW5nZWQucGlwZShcbiAgICAgICAgICAgIGZpbHRlcihcbiAgICAgICAgICAgICAgICAoZXZlbnQpID0+IGV2ZW50LnBoYXNlTmFtZSA9PT0gJ2RvbmUnICYmIGV2ZW50LnRvU3RhdGUgPT09IE1jU2lkZXBhbmVsQW5pbWF0aW9uU3RhdGUuVmlzaWJsZVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHRha2UoMSlcbiAgICAgICAgKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZnRlck9wZW5lZCQubmV4dCgpO1xuICAgICAgICAgICAgdGhpcy5hZnRlck9wZW5lZCQuY29tcGxldGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRGlzcG9zZSBvdmVybGF5IHdoZW4gY2xvc2luZyBhbmltYXRpb24gaXMgY29tcGxldGVcbiAgICAgICAgY29udGFpbmVySW5zdGFuY2UuYW5pbWF0aW9uU3RhdGVDaGFuZ2VkLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgICAgICAgKGV2ZW50KSA9PiBldmVudC5waGFzZU5hbWUgPT09ICdkb25lJyAmJiBldmVudC50b1N0YXRlID09PSBNY1NpZGVwYW5lbEFuaW1hdGlvblN0YXRlLkhpZGRlblxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHRha2UoMSlcbiAgICAgICAgKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgb3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLmFmdGVyQ2xvc2VkJC5uZXh0KHRoaXMucmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXMuYWZ0ZXJDbG9zZWQkLmNvbXBsZXRlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghY29udGFpbmVySW5zdGFuY2Uuc2lkZXBhbmVsQ29uZmlnLmRpc2FibGVDbG9zZSkge1xuICAgICAgICAgICAgbWVyZ2UoXG4gICAgICAgICAgICAgICAgb3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKCksXG4gICAgICAgICAgICAgICAgb3ZlcmxheVJlZi5rZXlkb3duRXZlbnRzKCkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGU6ZGVwcmVjYXRpb25cbiAgICAgICAgICAgICAgICAgICAgLy8ga2V5Q29kZSBpcyBkZXByZWNhdGVkLCBidXQgSUUxMSBhbmQgRWRnZSBkb24ndCBzdXBwb3J0IGNvZGUgcHJvcGVydHksIHdoaWNoIHdlIG5lZWQgdXNlIGluc3RlYWRcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyKChldmVudCkgPT4gZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9zZShyZXN1bHQ/OiBSKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5hZnRlckNsb3NlZCQuY2xvc2VkKSB7XG4gICAgICAgICAgICAvLyBUcmFuc2l0aW9uIHRoZSBiYWNrZHJvcCBpbiBwYXJhbGxlbCB0byB0aGUgc2lkZXBhbmVsLlxuICAgICAgICAgICAgdGhpcy5jb250YWluZXJJbnN0YW5jZS5hbmltYXRpb25TdGF0ZUNoYW5nZWQucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIoKGV2ZW50KSA9PiBldmVudC5waGFzZU5hbWUgPT09ICdkb25lJyksXG4gICAgICAgICAgICAgICAgdGFrZSgxKVxuICAgICAgICAgICAgKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5vdmVybGF5UmVmLmRldGFjaEJhY2tkcm9wKCkpO1xuXG4gICAgICAgICAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVySW5zdGFuY2UuZXhpdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEdldHMgYW4gb2JzZXJ2YWJsZSB0aGF0IGlzIG5vdGlmaWVkIHdoZW4gdGhlIHNpZGVwYW5lbCBpcyBmaW5pc2hlZCBjbG9zaW5nLiAqL1xuICAgIGFmdGVyQ2xvc2VkKCk6IE9ic2VydmFibGU8UiB8IHVuZGVmaW5lZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hZnRlckNsb3NlZCQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqIEdldHMgYW4gb2JzZXJ2YWJsZSB0aGF0IGlzIG5vdGlmaWVkIHdoZW4gdGhlIHNpZGVwYW5lbCBoYXMgb3BlbmVkIGFuZCBhcHBlYXJlZC4gKi9cbiAgICBhZnRlck9wZW5lZCgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWZ0ZXJPcGVuZWQkLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cbn1cbiJdfQ==