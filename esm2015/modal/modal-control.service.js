/**
 * @fileoverview added by tsickle
 * Generated from: modal-control.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * @record
 */
function IRegisteredMeta() { }
if (false) {
    /** @type {?} */
    IRegisteredMeta.prototype.modalRef;
    /** @type {?} */
    IRegisteredMeta.prototype.afterOpenSubscription;
    /** @type {?} */
    IRegisteredMeta.prototype.afterCloseSubscription;
}
export class McModalControlService {
    /**
     * @param {?} parentService
     */
    constructor(parentService) {
        this.parentService = parentService;
        // @ts-ignore
        this.rootOpenModals = this.parentService ? null : [];
        // @ts-ignore
        this.rootAfterAllClose = this.parentService ? null : new Subject();
        // @ts-ignore
        this.rootRegisteredMetaMap = this.parentService ? null : new Map();
    }
    // Track singleton afterAllClose through over the injection tree
    /**
     * @return {?}
     */
    get afterAllClose() {
        return this.parentService ? this.parentService.afterAllClose : this.rootAfterAllClose;
    }
    // Track singleton openModals array through over the injection tree
    /**
     * @return {?}
     */
    get openModals() {
        return this.parentService ? this.parentService.openModals : this.rootOpenModals;
    }
    // Registered modal for later usage
    /**
     * @private
     * @return {?}
     */
    get registeredMetaMap() {
        return this.parentService ? this.parentService.registeredMetaMap : this.rootRegisteredMetaMap;
    }
    // Register a modal to listen its open/close
    /**
     * @param {?} modalRef
     * @return {?}
     */
    registerModal(modalRef) {
        if (!this.hasRegistered(modalRef)) {
            /** @type {?} */
            const afterOpenSubscription = modalRef.afterOpen.subscribe((/**
             * @return {?}
             */
            () => this.openModals.push(modalRef)));
            /** @type {?} */
            const afterCloseSubscription = modalRef.afterClose.subscribe((/**
             * @return {?}
             */
            () => this.removeOpenModal(modalRef)));
            this.registeredMetaMap.set(modalRef, { modalRef, afterOpenSubscription, afterCloseSubscription });
        }
    }
    /**
     * @param {?} modalRef
     * @return {?}
     */
    hasRegistered(modalRef) {
        return this.registeredMetaMap.has(modalRef);
    }
    // Close all registered opened modals
    /**
     * @return {?}
     */
    closeAll() {
        /** @type {?} */
        let i = this.openModals.length;
        while (i--) {
            this.openModals[i].close();
        }
    }
    /**
     * @private
     * @param {?} modalRef
     * @return {?}
     */
    removeOpenModal(modalRef) {
        /** @type {?} */
        const index = this.openModals.indexOf(modalRef);
        if (index > -1) {
            this.openModals.splice(index, 1);
            if (!this.openModals.length) {
                this.afterAllClose.next();
            }
        }
    }
}
McModalControlService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
McModalControlService.ctorParameters = () => [
    { type: McModalControlService, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    McModalControlService.prototype.rootOpenModals;
    /**
     * @type {?}
     * @private
     */
    McModalControlService.prototype.rootAfterAllClose;
    /**
     * @type {?}
     * @private
     */
    McModalControlService.prototype.rootRegisteredMetaMap;
    /**
     * @type {?}
     * @private
     */
    McModalControlService.prototype.parentService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udHJvbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL21vZGFsLyIsInNvdXJjZXMiOlsibW9kYWwtY29udHJvbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDOzs7O0FBSzdDLDhCQUlDOzs7SUFIRyxtQ0FBcUI7O0lBQ3JCLGdEQUFvQzs7SUFDcEMsaURBQXFDOztBQUl6QyxNQUFNLE9BQU8scUJBQXFCOzs7O0lBd0I5QixZQUNvQyxhQUFvQztRQUFwQyxrQkFBYSxHQUFiLGFBQWEsQ0FBdUI7O1FBWmhFLG1CQUFjLEdBQWlCLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDOztRQUU5RCxzQkFBaUIsR0FBa0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sRUFBUSxDQUFDOztRQUVuRiwwQkFBcUIsR0FBcUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBU3hHLENBQUM7Ozs7O0lBdkJELElBQUksYUFBYTtRQUNiLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUMxRixDQUFDOzs7OztJQUdELElBQUksVUFBVTtRQUNWLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDcEYsQ0FBQzs7Ozs7O0lBVUQsSUFBWSxpQkFBaUI7UUFDekIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUM7SUFDbEcsQ0FBQzs7Ozs7O0lBT0QsYUFBYSxDQUFDLFFBQW9CO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFOztrQkFDekIscUJBQXFCLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTOzs7WUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQzs7a0JBQzFGLHNCQUFzQixHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUzs7O1lBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsRUFBQztZQUVsRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFDLFFBQVEsRUFBRSxxQkFBcUIsRUFBRSxzQkFBc0IsRUFBQyxDQUFDLENBQUM7U0FDbkc7SUFDTCxDQUFDOzs7OztJQUVELGFBQWEsQ0FBQyxRQUFvQjtRQUM5QixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7Ozs7SUFHRCxRQUFROztZQUNBLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU07UUFFOUIsT0FBTyxDQUFDLEVBQUUsRUFBRTtZQUNSLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDOUI7SUFDTCxDQUFDOzs7Ozs7SUFFTyxlQUFlLENBQUMsUUFBb0I7O2NBQ2xDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFFL0MsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDWixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFakMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO2dCQUN6QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQzdCO1NBQ0o7SUFDTCxDQUFDOzs7WUE5REosVUFBVTs7OztZQTBCNEMscUJBQXFCLHVCQUFuRSxRQUFRLFlBQUksUUFBUTs7Ozs7OztJQVp6QiwrQ0FBc0U7Ozs7O0lBRXRFLGtEQUEyRjs7Ozs7SUFFM0Ysc0RBQXdHOzs7OztJQVFwRyw4Q0FBb0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBNY01vZGFsUmVmIH0gZnJvbSAnLi9tb2RhbC1yZWYuY2xhc3MnO1xuXG5cbmludGVyZmFjZSBJUmVnaXN0ZXJlZE1ldGEge1xuICAgIG1vZGFsUmVmOiBNY01vZGFsUmVmO1xuICAgIGFmdGVyT3BlblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIGFmdGVyQ2xvc2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1jTW9kYWxDb250cm9sU2VydmljZSB7XG5cbiAgICAvLyBUcmFjayBzaW5nbGV0b24gYWZ0ZXJBbGxDbG9zZSB0aHJvdWdoIG92ZXIgdGhlIGluamVjdGlvbiB0cmVlXG4gICAgZ2V0IGFmdGVyQWxsQ2xvc2UoKTogU3ViamVjdDx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNlcnZpY2UgPyB0aGlzLnBhcmVudFNlcnZpY2UuYWZ0ZXJBbGxDbG9zZSA6IHRoaXMucm9vdEFmdGVyQWxsQ2xvc2U7XG4gICAgfVxuXG4gICAgLy8gVHJhY2sgc2luZ2xldG9uIG9wZW5Nb2RhbHMgYXJyYXkgdGhyb3VnaCBvdmVyIHRoZSBpbmplY3Rpb24gdHJlZVxuICAgIGdldCBvcGVuTW9kYWxzKCk6IE1jTW9kYWxSZWZbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNlcnZpY2UgPyB0aGlzLnBhcmVudFNlcnZpY2Uub3Blbk1vZGFscyA6IHRoaXMucm9vdE9wZW5Nb2RhbHM7XG4gICAgfVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHByaXZhdGUgcm9vdE9wZW5Nb2RhbHM6IE1jTW9kYWxSZWZbXSA9IHRoaXMucGFyZW50U2VydmljZSA/IG51bGwgOiBbXTtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcHJpdmF0ZSByb290QWZ0ZXJBbGxDbG9zZTogU3ViamVjdDx2b2lkPiA9IHRoaXMucGFyZW50U2VydmljZSA/IG51bGwgOiBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwcml2YXRlIHJvb3RSZWdpc3RlcmVkTWV0YU1hcDogTWFwPE1jTW9kYWxSZWYsIElSZWdpc3RlcmVkTWV0YT4gPSB0aGlzLnBhcmVudFNlcnZpY2UgPyBudWxsIDogbmV3IE1hcCgpO1xuXG4gICAgLy8gUmVnaXN0ZXJlZCBtb2RhbCBmb3IgbGF0ZXIgdXNhZ2VcbiAgICBwcml2YXRlIGdldCByZWdpc3RlcmVkTWV0YU1hcCgpOiBNYXA8TWNNb2RhbFJlZiwgSVJlZ2lzdGVyZWRNZXRhPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNlcnZpY2UgPyB0aGlzLnBhcmVudFNlcnZpY2UucmVnaXN0ZXJlZE1ldGFNYXAgOiB0aGlzLnJvb3RSZWdpc3RlcmVkTWV0YU1hcDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcHJpdmF0ZSBwYXJlbnRTZXJ2aWNlOiBNY01vZGFsQ29udHJvbFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICAvLyBSZWdpc3RlciBhIG1vZGFsIHRvIGxpc3RlbiBpdHMgb3Blbi9jbG9zZVxuICAgIHJlZ2lzdGVyTW9kYWwobW9kYWxSZWY6IE1jTW9kYWxSZWYpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc1JlZ2lzdGVyZWQobW9kYWxSZWYpKSB7XG4gICAgICAgICAgICBjb25zdCBhZnRlck9wZW5TdWJzY3JpcHRpb24gPSBtb2RhbFJlZi5hZnRlck9wZW4uc3Vic2NyaWJlKCgpID0+IHRoaXMub3Blbk1vZGFscy5wdXNoKG1vZGFsUmVmKSk7XG4gICAgICAgICAgICBjb25zdCBhZnRlckNsb3NlU3Vic2NyaXB0aW9uID0gbW9kYWxSZWYuYWZ0ZXJDbG9zZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZW1vdmVPcGVuTW9kYWwobW9kYWxSZWYpKTtcblxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlcmVkTWV0YU1hcC5zZXQobW9kYWxSZWYsIHttb2RhbFJlZiwgYWZ0ZXJPcGVuU3Vic2NyaXB0aW9uLCBhZnRlckNsb3NlU3Vic2NyaXB0aW9ufSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNSZWdpc3RlcmVkKG1vZGFsUmVmOiBNY01vZGFsUmVmKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyZWRNZXRhTWFwLmhhcyhtb2RhbFJlZik7XG4gICAgfVxuXG4gICAgLy8gQ2xvc2UgYWxsIHJlZ2lzdGVyZWQgb3BlbmVkIG1vZGFsc1xuICAgIGNsb3NlQWxsKCk6IHZvaWQge1xuICAgICAgICBsZXQgaSA9IHRoaXMub3Blbk1vZGFscy5sZW5ndGg7XG5cbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgdGhpcy5vcGVuTW9kYWxzW2ldLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZU9wZW5Nb2RhbChtb2RhbFJlZjogTWNNb2RhbFJlZik6IHZvaWQge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMub3Blbk1vZGFscy5pbmRleE9mKG1vZGFsUmVmKTtcblxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5vcGVuTW9kYWxzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5vcGVuTW9kYWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWZ0ZXJBbGxDbG9zZS5uZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=