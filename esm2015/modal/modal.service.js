/**
 * @fileoverview added by tsickle
 * Generated from: modal.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9tb2RhbC8iLCJzb3VyY2VzIjpbIm1vZGFsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBZ0IsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBS3JELE1BQU0sT0FBTyxzQkFBc0I7Ozs7O0lBTS9CLFlBQW9CLE9BQWdCLEVBQUUsVUFBbUMsRUFBRTtRQUF2RCxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVuQixJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsSUFBSSxPQUFPLENBQUMsRUFBRTtZQUNoQyxPQUFPLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztTQUN0QztRQUVELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUIsbUJBQUEsSUFBSSxDQUFDLFFBQVEsRUFBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMvQixtQkFBQSxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxTQUFTOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUMsQ0FBQztRQUUxRSxJQUFJLENBQUMsVUFBVSxDQUFDLGFB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Ozs7O0lBc0V0QixpQ0FBd0I7Ozs7O0lBQ3hCLHNDQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXksIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IENvbXBvbmVudFJlZiwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRVNDQVBFIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWNNb2RhbENvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi9tb2RhbC1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWNNb2RhbFJlZiB9IGZyb20gJy4vbW9kYWwtcmVmLmNsYXNzJztcbmltcG9ydCB7IE1jTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb25maXJtVHlwZSwgSU1vZGFsT3B0aW9ucywgSU1vZGFsT3B0aW9uc0ZvclNlcnZpY2UgfSBmcm9tICcuL21vZGFsLnR5cGUnO1xuXG5cbi8vIEEgYnVpbGRlciB1c2VkIGZvciBtYW5hZ2luZyBzZXJ2aWNlIGNyZWF0aW5nIG1vZGFsc1xuZXhwb3J0IGNsYXNzIE1vZGFsQnVpbGRlckZvclNlcnZpY2Uge1xuXG4gICAgLy8gTW9kYWwgQ29tcG9uZW50UmVmLCBcIm51bGxcIiBtZWFucyBpdCBoYXMgYmVlbiBkZXN0cm95ZWRcbiAgICBwcml2YXRlIG1vZGFsUmVmOiBDb21wb25lbnRSZWY8TWNNb2RhbENvbXBvbmVudD4gfCBudWxsO1xuICAgIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSwgb3B0aW9uczogSU1vZGFsT3B0aW9uc0ZvclNlcnZpY2UgPSB7fSkge1xuICAgICAgICB0aGlzLmNyZWF0ZU1vZGFsKCk7XG5cbiAgICAgICAgaWYgKCEoJ21jR2V0Q29udGFpbmVyJyBpbiBvcHRpb25zKSkge1xuICAgICAgICAgICAgb3B0aW9ucy5tY0dldENvbnRhaW5lciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhbmdlUHJvcHMob3B0aW9ucyk7XG4gICAgICAgIHRoaXMubW9kYWxSZWYhLmluc3RhbmNlLm9wZW4oKTtcbiAgICAgICAgdGhpcy5tb2RhbFJlZiEuaW5zdGFuY2UubWNBZnRlckNsb3NlLnN1YnNjcmliZSgoKSA9PiB0aGlzLmRlc3Ryb3lNb2RhbCgpKTtcblxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYua2V5ZG93bkV2ZW50cygpXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAucGlwZShmaWx0ZXIoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uIHJlcGxhY2VtZW50IC5rZXkgaXNuJ3Qgc3VwcG9ydGVkIGluIEVkZ2VcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFICYmIG9wdGlvbnMubWNDbG9zZUJ5RVNDO1xuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMubW9kYWxSZWYhLmluc3RhbmNlLmNsb3NlKCkpO1xuICAgIH1cblxuICAgIGdldEluc3RhbmNlKCk6IE1jTW9kYWxDb21wb25lbnQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxSZWYgJiYgdGhpcy5tb2RhbFJlZi5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBkZXN0cm95TW9kYWwoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm1vZGFsUmVmKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5tb2RhbFJlZiA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZVByb3BzKG9wdGlvbnM6IElNb2RhbE9wdGlvbnMpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubW9kYWxSZWYpIHtcbiAgICAgICAgICAgIC8vIGhlcmUgbm90IGxpbWl0IHVzZXIncyBpbnB1dHMgYXQgcnVudGltZVxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLm1vZGFsUmVmLmluc3RhbmNlLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIENyZWF0ZSBjb21wb25lbnQgdG8gQXBwbGljYXRpb25SZWZcbiAgICBwcml2YXRlIGNyZWF0ZU1vZGFsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm92ZXJsYXlSZWYgPSB0aGlzLm92ZXJsYXkuY3JlYXRlKCk7XG4gICAgICAgIHRoaXMubW9kYWxSZWYgPSB0aGlzLm92ZXJsYXlSZWYuYXR0YWNoKG5ldyBDb21wb25lbnRQb3J0YWwoTWNNb2RhbENvbXBvbmVudCkpO1xuICAgIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1jTW9kYWxTZXJ2aWNlIHtcbiAgICAvLyBUcmFjayBvZiB0aGUgY3VycmVudCBjbG9zZSBtb2RhbHMgKHdlIGFzc3VtZSBpbnZpc2libGUgaXMgY2xvc2UgdGhpcyB0aW1lKVxuICAgIGdldCBvcGVuTW9kYWxzKCk6IE1jTW9kYWxSZWZbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsQ29udHJvbC5vcGVuTW9kYWxzO1xuICAgIH1cblxuICAgIGdldCBhZnRlckFsbENsb3NlKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbENvbnRyb2wuYWZ0ZXJBbGxDbG9zZS5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcml2YXRlIG1vZGFsQ29udHJvbDogTWNNb2RhbENvbnRyb2xTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgLy8gQ2xvc2VzIGFsbCBvZiB0aGUgY3VycmVudGx5LW9wZW4gZGlhbG9nc1xuICAgIGNsb3NlQWxsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1vZGFsQ29udHJvbC5jbG9zZUFsbCgpO1xuICAgIH1cblxuICAgIGNyZWF0ZTxUPihvcHRpb25zOiBJTW9kYWxPcHRpb25zRm9yU2VydmljZTxUPiA9IHt9KTogTWNNb2RhbFJlZjxUPiB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm1jT25DYW5jZWwgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIExlYXZlIGEgZW1wdHkgZnVuY3Rpb24gdG8gY2xvc2UgdGhpcyBtb2RhbCBieSBkZWZhdWx0XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgIG9wdGlvbnMubWNPbkNhbmNlbCA9ICgpID0+IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEoJ21jQ2xvc2VCeUVTQycgaW4gb3B0aW9ucykpIHtcbiAgICAgICAgICAgIG9wdGlvbnMubWNDbG9zZUJ5RVNDID0gdHJ1ZTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKCEoJ21jV2lkdGgnIGluIG9wdGlvbnMpKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgIG9wdGlvbnMubWNXaWR0aCA9IDQ4MDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgTW9kYWxCdWlsZGVyRm9yU2VydmljZSh0aGlzLm92ZXJsYXksIG9wdGlvbnMpLmdldEluc3RhbmNlKCkhO1xuICAgIH1cblxuICAgIGNvbmZpcm08VD4ob3B0aW9uczogSU1vZGFsT3B0aW9uc0ZvclNlcnZpY2U8VD4gPSB7fSwgY29uZmlybVR5cGU6IENvbmZpcm1UeXBlID0gJ2NvbmZpcm0nKTogTWNNb2RhbFJlZjxUPiB7XG4gICAgICAgIGlmICgnbWNGb290ZXInIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgVGhlIENvbmZpcm0tTW9kYWwgZG9lc24ndCBzdXBwb3J0IFwibWNGb290ZXJcIiwgdGhpcyBwcm9wZXJ0eSB3aWxsIGJlIGlnbm9yZWQuYCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBOT1RFOiBvbmx5IHN1cHBvcnQgZnVuY3Rpb24gY3VycmVudGx5IGJ5IGNhbGxpbmcgY29uZmlybSgpXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5tY09uT2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIExlYXZlIGEgZW1wdHkgZnVuY3Rpb24gdG8gY2xvc2UgdGhpcyBtb2RhbCBieSBkZWZhdWx0XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgIG9wdGlvbnMubWNPbk9rID0gKCkgPT4ge307XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zLm1jTW9kYWxUeXBlID0gJ2NvbmZpcm0nO1xuICAgICAgICBvcHRpb25zLm1jQ2xhc3NOYW1lID0gYG1jLWNvbmZpcm0gbWMtY29uZmlybS0ke2NvbmZpcm1UeXBlfSAke29wdGlvbnMubWNDbGFzc05hbWUgfHwgJyd9YDtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGUob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgb3BlbjxUPihvcHRpb25zOiBJTW9kYWxPcHRpb25zRm9yU2VydmljZTxUPiA9IHt9KTogTWNNb2RhbFJlZjxUPiB7XG5cbiAgICAgICAgb3B0aW9ucy5tY01vZGFsVHlwZSA9ICdjdXN0b20nO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZShvcHRpb25zKTtcbiAgICB9XG5cbiAgICBzdWNjZXNzPFQ+KG9wdGlvbnM6IElNb2RhbE9wdGlvbnNGb3JTZXJ2aWNlPFQ+ID0ge30pOiBNY01vZGFsUmVmPFQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2ltcGxlQ29uZmlybShvcHRpb25zLCAnc3VjY2VzcycpO1xuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tcmVzZXJ2ZWQta2V5d29yZHNcbiAgICBkZWxldGU8VD4ob3B0aW9uczogSU1vZGFsT3B0aW9uc0ZvclNlcnZpY2U8VD4gPSB7fSk6IE1jTW9kYWxSZWY8VD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zaW1wbGVDb25maXJtKG9wdGlvbnMsICd3YXJuJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaW1wbGVDb25maXJtPFQ+KG9wdGlvbnM6IElNb2RhbE9wdGlvbnNGb3JTZXJ2aWNlPFQ+ID0ge30sIGNvbmZpcm1UeXBlOiBDb25maXJtVHlwZSk6IE1jTW9kYWxSZWY8VD4ge1xuICAgICAgICAvLyBSZW1vdmUgdGhlIENhbmNlbCBidXR0b24gaWYgdGhlIHVzZXIgbm90IHNwZWNpZnkgYSBDYW5jZWwgYnV0dG9uXG4gICAgICAgIGlmICghKCdtY0NhbmNlbFRleHQnIGluIG9wdGlvbnMpKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBvcHRpb25zLm1jQ2FuY2VsVGV4dCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5jb25maXJtKG9wdGlvbnMsIGNvbmZpcm1UeXBlKTtcbiAgICB9XG59XG4iXX0=