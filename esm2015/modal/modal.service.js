/**
 * @fileoverview added by tsickle
 * Generated from: modal.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { filter } from 'rxjs/operators';
import { McModalControlService } from './modal-control.service';
import { McModalComponent } from './modal.component';
// A builder used for managing service creating modals
export class ModalBuilderForService {
    /**
     * @param {?} overlay
     * @param {?=} options
     */
    constructor(overlay, options = {}) {
        this.overlay = overlay;
        this.createModal();
        if (!('mcGetContainer' in options)) {
            options.mcGetContainer = undefined;
        }
        this.changeProps(options);
        (/** @type {?} */ (this.modalRef)).instance.open();
        (/** @type {?} */ (this.modalRef)).instance.mcAfterClose.subscribe((/**
         * @return {?}
         */
        () => this.destroyModal()));
        this.overlayRef.keydownEvents()
            // @ts-ignore
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            // tslint:disable-next-line:deprecation replacement .key isn't supported in Edge
            return event.keyCode === ESCAPE && options.mcCloseByESC;
        })))
            .subscribe((/**
         * @return {?}
         */
        () => (/** @type {?} */ (this.modalRef)).instance.close()));
    }
    /**
     * @return {?}
     */
    getInstance() {
        return this.modalRef && this.modalRef.instance;
    }
    /**
     * @return {?}
     */
    destroyModal() {
        if (this.modalRef) {
            this.overlayRef.dispose();
            this.modalRef = null;
        }
    }
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    changeProps(options) {
        if (this.modalRef) {
            // here not limit user's inputs at runtime
            Object.assign(this.modalRef.instance, options);
        }
    }
    // Create component to ApplicationRef
    /**
     * @private
     * @return {?}
     */
    createModal() {
        this.overlayRef = this.overlay.create();
        this.modalRef = this.overlayRef.attach(new ComponentPortal(McModalComponent));
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ModalBuilderForService.prototype.modalRef;
    /**
     * @type {?}
     * @private
     */
    ModalBuilderForService.prototype.overlayRef;
    /**
     * @type {?}
     * @private
     */
    ModalBuilderForService.prototype.overlay;
}
export class McModalService {
    /**
     * @param {?} overlay
     * @param {?} modalControl
     */
    constructor(overlay, modalControl) {
        this.overlay = overlay;
        this.modalControl = modalControl;
    }
    // Track of the current close modals (we assume invisible is close this time)
    /**
     * @return {?}
     */
    get openModals() {
        return this.modalControl.openModals;
    }
    /**
     * @return {?}
     */
    get afterAllClose() {
        return this.modalControl.afterAllClose.asObservable();
    }
    // Closes all of the currently-open dialogs
    /**
     * @return {?}
     */
    closeAll() {
        this.modalControl.closeAll();
    }
    /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    create(options = {}) {
        if (typeof options.mcOnCancel !== 'function') {
            // Leave a empty function to close this modal by default
            // tslint:disable-next-line
            options.mcOnCancel = (/**
             * @return {?}
             */
            () => { });
        }
        if (!('mcCloseByESC' in options)) {
            options.mcCloseByESC = true;
        }
        if (!('mcWidth' in options)) {
            // tslint:disable-next-line
            options.mcWidth = 480;
        }
        return (/** @type {?} */ (new ModalBuilderForService(this.overlay, options).getInstance()));
    }
    /**
     * @template T
     * @param {?=} options
     * @param {?=} confirmType
     * @return {?}
     */
    confirm(options = {}, confirmType = 'confirm') {
        if ('mcFooter' in options) {
            console.warn(`The Confirm-Modal doesn't support "mcFooter", this property will be ignored.`);
        }
        // NOTE: only support function currently by calling confirm()
        if (typeof options.mcOnOk !== 'function') {
            // Leave a empty function to close this modal by default
            // tslint:disable-next-line
            options.mcOnOk = (/**
             * @return {?}
             */
            () => { });
        }
        options.mcModalType = 'confirm';
        options.mcClassName = `mc-confirm mc-confirm-${confirmType} ${options.mcClassName || ''}`;
        return this.create(options);
    }
    /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    open(options = {}) {
        options.mcModalType = 'custom';
        return this.create(options);
    }
    /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    success(options = {}) {
        return this.simpleConfirm(options, 'success');
    }
    // tslint:disable-next-line: no-reserved-keywords
    /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    delete(options = {}) {
        return this.simpleConfirm(options, 'warn');
    }
    /**
     * @private
     * @template T
     * @param {?=} options
     * @param {?=} confirmType
     * @return {?}
     */
    simpleConfirm(options = {}, confirmType) {
        // Remove the Cancel button if the user not specify a Cancel button
        if (!('mcCancelText' in options)) {
            // @ts-ignore
            options.mcCancelText = null;
        }
        return this.confirm(options, confirmType);
    }
}
McModalService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
McModalService.ctorParameters = () => [
    { type: Overlay },
    { type: McModalControlService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    McModalService.prototype.overlay;
    /**
     * @type {?}
     * @private
     */
    McModalService.prototype.modalControl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL21vZGFsLyIsInNvdXJjZXMiOlsibW9kYWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQWMsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFnQixVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWxELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFLckQsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7SUFNL0IsWUFBb0IsT0FBZ0IsRUFBRSxVQUFtQyxFQUFFO1FBQXZELFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRW5CLElBQUksQ0FBQyxDQUFDLGdCQUFnQixJQUFJLE9BQU8sQ0FBQyxFQUFFO1lBQ2hDLE9BQU8sQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO1NBQ3RDO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQixtQkFBQSxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9CLG1CQUFBLElBQUksQ0FBQyxRQUFRLEVBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFNBQVM7OztRQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBQyxDQUFDO1FBRTFFLElBQUksQ0FB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WUFPUCxxQkFBcUI7Ozs7Ozs7SUFzRXRCLGlDQUF3Qjs7Ozs7SUFDeEIsc0NBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3ZlcmxheSwgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50UmVmLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFU0NBUEUgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNY01vZGFsQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL21vZGFsLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBNY01vZGFsUmVmIH0gZnJvbSAnLi9tb2RhbC1yZWYuY2xhc3MnO1xuaW1wb3J0IHsgTWNNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpcm1UeXBlLCBJTW9kYWxPcHRpb25zLCBJTW9kYWxPcHRpb25zRm9yU2VydmljZSB9IGZyb20gJy4vbW9kYWwudHlwZSc7XG5cblxuLy8gQSBidWlsZGVyIHVzZWQgZm9yIG1hbmFnaW5nIHNlcnZpY2UgY3JlYXRpbmcgbW9kYWxzXG5leHBvcnQgY2xhc3MgTW9kYWxCdWlsZGVyRm9yU2VydmljZSB7XG5cbiAgICAvLyBNb2RhbCBDb21wb25lbnRSZWYsIFwibnVsbFwiIG1lYW5zIGl0IGhhcyBiZWVuIGRlc3Ryb3llZFxuICAgIHByaXZhdGUgbW9kYWxSZWY6IENvbXBvbmVudFJlZjxNY01vZGFsQ29tcG9uZW50PiB8IG51bGw7XG4gICAgcHJpdmF0ZSBvdmVybGF5UmVmOiBPdmVybGF5UmVmO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LCBvcHRpb25zOiBJTW9kYWxPcHRpb25zRm9yU2VydmljZSA9IHt9KSB7XG4gICAgICAgIHRoaXMuY3JlYXRlTW9kYWwoKTtcblxuICAgICAgICBpZiAoISgnbWNHZXRDb250YWluZXInIGluIG9wdGlvbnMpKSB7XG4gICAgICAgICAgICBvcHRpb25zLm1jR2V0Q29udGFpbmVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VQcm9wcyhvcHRpb25zKTtcbiAgICAgICAgdGhpcy5tb2RhbFJlZiEuaW5zdGFuY2Uub3BlbigpO1xuICAgICAgICB0aGlzLm1vZGFsUmVmIS5pbnN0YW5jZS5tY0FmdGVyQ2xvc2Uuc3Vic2NyaWJlKCgpID0+IHRoaXMuZGVzdHJveU1vZGFsKCkpO1xuXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5rZXlkb3duRXZlbnRzKClcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIC5waXBlKGZpbHRlcigoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb24gcmVwbGFjZW1lbnQgLmtleSBpc24ndCBzdXBwb3J0ZWQgaW4gRWRnZVxuICAgICAgICAgICAgICAgIHJldHVybiBldmVudC5rZXlDb2RlID09PSBFU0NBUEUgJiYgb3B0aW9ucy5tY0Nsb3NlQnlFU0M7XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5tb2RhbFJlZiEuaW5zdGFuY2UuY2xvc2UoKSk7XG4gICAgfVxuXG4gICAgZ2V0SW5zdGFuY2UoKTogTWNNb2RhbENvbXBvbmVudCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFJlZiAmJiB0aGlzLm1vZGFsUmVmLmluc3RhbmNlO1xuICAgIH1cblxuICAgIGRlc3Ryb3lNb2RhbCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubW9kYWxSZWYpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLm1vZGFsUmVmID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlUHJvcHMob3B0aW9uczogSU1vZGFsT3B0aW9ucyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5tb2RhbFJlZikge1xuICAgICAgICAgICAgLy8gaGVyZSBub3QgbGltaXQgdXNlcidzIGlucHV0cyBhdCBydW50aW1lXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMubW9kYWxSZWYuaW5zdGFuY2UsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIGNvbXBvbmVudCB0byBBcHBsaWNhdGlvblJlZlxuICAgIHByaXZhdGUgY3JlYXRlTW9kYWwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUoKTtcbiAgICAgICAgdGhpcy5tb2RhbFJlZiA9IHRoaXMub3ZlcmxheVJlZi5hdHRhY2gobmV3IENvbXBvbmVudFBvcnRhbChNY01vZGFsQ29tcG9uZW50KSk7XG4gICAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWNNb2RhbFNlcnZpY2Uge1xuICAgIC8vIFRyYWNrIG9mIHRoZSBjdXJyZW50IGNsb3NlIG1vZGFscyAod2UgYXNzdW1lIGludmlzaWJsZSBpcyBjbG9zZSB0aGlzIHRpbWUpXG4gICAgZ2V0IG9wZW5Nb2RhbHMoKTogTWNNb2RhbFJlZltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxDb250cm9sLm9wZW5Nb2RhbHM7XG4gICAgfVxuXG4gICAgZ2V0IGFmdGVyQWxsQ2xvc2UoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsQ29udHJvbC5hZnRlckFsbENsb3NlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgICAgIHByaXZhdGUgbW9kYWxDb250cm9sOiBNY01vZGFsQ29udHJvbFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICAvLyBDbG9zZXMgYWxsIG9mIHRoZSBjdXJyZW50bHktb3BlbiBkaWFsb2dzXG4gICAgY2xvc2VBbGwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubW9kYWxDb250cm9sLmNsb3NlQWxsKCk7XG4gICAgfVxuXG4gICAgY3JlYXRlPFQ+KG9wdGlvbnM6IElNb2RhbE9wdGlvbnNGb3JTZXJ2aWNlPFQ+ID0ge30pOiBNY01vZGFsUmVmPFQ+IHtcblxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubWNPbkNhbmNlbCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gTGVhdmUgYSBlbXB0eSBmdW5jdGlvbiB0byBjbG9zZSB0aGlzIG1vZGFsIGJ5IGRlZmF1bHRcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgICAgb3B0aW9ucy5tY09uQ2FuY2VsID0gKCkgPT4ge307XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoISgnbWNDbG9zZUJ5RVNDJyBpbiBvcHRpb25zKSkge1xuICAgICAgICAgICAgb3B0aW9ucy5tY0Nsb3NlQnlFU0MgPSB0cnVlO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAoISgnbWNXaWR0aCcgaW4gb3B0aW9ucykpIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgICAgb3B0aW9ucy5tY1dpZHRoID0gNDgwO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBNb2RhbEJ1aWxkZXJGb3JTZXJ2aWNlKHRoaXMub3ZlcmxheSwgb3B0aW9ucykuZ2V0SW5zdGFuY2UoKSE7XG4gICAgfVxuXG4gICAgY29uZmlybTxUPihvcHRpb25zOiBJTW9kYWxPcHRpb25zRm9yU2VydmljZTxUPiA9IHt9LCBjb25maXJtVHlwZTogQ29uZmlybVR5cGUgPSAnY29uZmlybScpOiBNY01vZGFsUmVmPFQ+IHtcbiAgICAgICAgaWYgKCdtY0Zvb3RlcicgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBUaGUgQ29uZmlybS1Nb2RhbCBkb2Vzbid0IHN1cHBvcnQgXCJtY0Zvb3RlclwiLCB0aGlzIHByb3BlcnR5IHdpbGwgYmUgaWdub3JlZC5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5PVEU6IG9ubHkgc3VwcG9ydCBmdW5jdGlvbiBjdXJyZW50bHkgYnkgY2FsbGluZyBjb25maXJtKClcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm1jT25PayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gTGVhdmUgYSBlbXB0eSBmdW5jdGlvbiB0byBjbG9zZSB0aGlzIG1vZGFsIGJ5IGRlZmF1bHRcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgICAgb3B0aW9ucy5tY09uT2sgPSAoKSA9PiB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMubWNNb2RhbFR5cGUgPSAnY29uZmlybSc7XG4gICAgICAgIG9wdGlvbnMubWNDbGFzc05hbWUgPSBgbWMtY29uZmlybSBtYy1jb25maXJtLSR7Y29uZmlybVR5cGV9ICR7b3B0aW9ucy5tY0NsYXNzTmFtZSB8fCAnJ31gO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZShvcHRpb25zKTtcbiAgICB9XG5cbiAgICBvcGVuPFQ+KG9wdGlvbnM6IElNb2RhbE9wdGlvbnNGb3JTZXJ2aWNlPFQ+ID0ge30pOiBNY01vZGFsUmVmPFQ+IHtcblxuICAgICAgICBvcHRpb25zLm1jTW9kYWxUeXBlID0gJ2N1c3RvbSc7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHN1Y2Nlc3M8VD4ob3B0aW9uczogSU1vZGFsT3B0aW9uc0ZvclNlcnZpY2U8VD4gPSB7fSk6IE1jTW9kYWxSZWY8VD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zaW1wbGVDb25maXJtKG9wdGlvbnMsICdzdWNjZXNzJyk7XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1yZXNlcnZlZC1rZXl3b3Jkc1xuICAgIGRlbGV0ZTxUPihvcHRpb25zOiBJTW9kYWxPcHRpb25zRm9yU2VydmljZTxUPiA9IHt9KTogTWNNb2RhbFJlZjxUPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNpbXBsZUNvbmZpcm0ob3B0aW9ucywgJ3dhcm4nKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNpbXBsZUNvbmZpcm08VD4ob3B0aW9uczogSU1vZGFsT3B0aW9uc0ZvclNlcnZpY2U8VD4gPSB7fSwgY29uZmlybVR5cGU6IENvbmZpcm1UeXBlKTogTWNNb2RhbFJlZjxUPiB7XG4gICAgICAgIC8vIFJlbW92ZSB0aGUgQ2FuY2VsIGJ1dHRvbiBpZiB0aGUgdXNlciBub3Qgc3BlY2lmeSBhIENhbmNlbCBidXR0b25cbiAgICAgICAgaWYgKCEoJ21jQ2FuY2VsVGV4dCcgaW4gb3B0aW9ucykpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIG9wdGlvbnMubWNDYW5jZWxUZXh0ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpcm0ob3B0aW9ucywgY29uZmlybVR5cGUpO1xuICAgIH1cbn1cbiJdfQ==