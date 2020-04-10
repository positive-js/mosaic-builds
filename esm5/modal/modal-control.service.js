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
var McModalControlService = /** @class */ (function () {
    function McModalControlService(parentService) {
        this.parentService = parentService;
        // @ts-ignore
        this.rootOpenModals = this.parentService ? null : [];
        // @ts-ignore
        this.rootAfterAllClose = this.parentService ? null : new Subject();
        // @ts-ignore
        this.rootRegisteredMetaMap = this.parentService ? null : new Map();
    }
    Object.defineProperty(McModalControlService.prototype, "afterAllClose", {
        // Track singleton afterAllClose through over the injection tree
        get: 
        // Track singleton afterAllClose through over the injection tree
        /**
         * @return {?}
         */
        function () {
            return this.parentService ? this.parentService.afterAllClose : this.rootAfterAllClose;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalControlService.prototype, "openModals", {
        // Track singleton openModals array through over the injection tree
        get: 
        // Track singleton openModals array through over the injection tree
        /**
         * @return {?}
         */
        function () {
            return this.parentService ? this.parentService.openModals : this.rootOpenModals;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalControlService.prototype, "registeredMetaMap", {
        // Registered modal for later usage
        get: 
        // Registered modal for later usage
        /**
         * @private
         * @return {?}
         */
        function () {
            return this.parentService ? this.parentService.registeredMetaMap : this.rootRegisteredMetaMap;
        },
        enumerable: true,
        configurable: true
    });
    // Register a modal to listen its open/close
    // Register a modal to listen its open/close
    /**
     * @param {?} modalRef
     * @return {?}
     */
    McModalControlService.prototype.registerModal = 
    // Register a modal to listen its open/close
    /**
     * @param {?} modalRef
     * @return {?}
     */
    function (modalRef) {
        var _this = this;
        if (!this.hasRegistered(modalRef)) {
            /** @type {?} */
            var afterOpenSubscription = modalRef.afterOpen.subscribe((/**
             * @return {?}
             */
            function () { return _this.openModals.push(modalRef); }));
            /** @type {?} */
            var afterCloseSubscription = modalRef.afterClose.subscribe((/**
             * @return {?}
             */
            function () { return _this.removeOpenModal(modalRef); }));
            this.registeredMetaMap.set(modalRef, { modalRef: modalRef, afterOpenSubscription: afterOpenSubscription, afterCloseSubscription: afterCloseSubscription });
        }
    };
    /**
     * @param {?} modalRef
     * @return {?}
     */
    McModalControlService.prototype.hasRegistered = /**
     * @param {?} modalRef
     * @return {?}
     */
    function (modalRef) {
        return this.registeredMetaMap.has(modalRef);
    };
    // Close all registered opened modals
    // Close all registered opened modals
    /**
     * @return {?}
     */
    McModalControlService.prototype.closeAll = 
    // Close all registered opened modals
    /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var i = this.openModals.length;
        while (i--) {
            this.openModals[i].close();
        }
    };
    /**
     * @private
     * @param {?} modalRef
     * @return {?}
     */
    McModalControlService.prototype.removeOpenModal = /**
     * @private
     * @param {?} modalRef
     * @return {?}
     */
    function (modalRef) {
        /** @type {?} */
        var index = this.openModals.indexOf(modalRef);
        if (index > -1) {
            this.openModals.splice(index, 1);
            if (!this.openModals.length) {
                this.afterAllClose.next();
            }
        }
    };
    McModalControlService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    McModalControlService.ctorParameters = function () { return [
        { type: McModalControlService, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
    return McModalControlService;
}());
export { McModalControlService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udHJvbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL21vZGFsLyIsInNvdXJjZXMiOlsibW9kYWwtY29udHJvbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDOzs7O0FBSzdDLDhCQUlDOzs7SUFIRyxtQ0FBcUI7O0lBQ3JCLGdEQUFvQzs7SUFDcEMsaURBQXFDOztBQUd6QztJQXlCSSwrQkFDb0MsYUFBb0M7UUFBcEMsa0JBQWEsR0FBYixhQUFhLENBQXVCOztRQVpoRSxtQkFBYyxHQUFpQixJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7UUFFOUQsc0JBQWlCLEdBQWtCLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLEVBQVEsQ0FBQzs7UUFFbkYsMEJBQXFCLEdBQXFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQVN4RyxDQUFDO0lBdkJELHNCQUFJLGdEQUFhO1FBRGpCLGdFQUFnRTs7Ozs7O1FBQ2hFO1lBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQzFGLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksNkNBQVU7UUFEZCxtRUFBbUU7Ozs7OztRQUNuRTtZQUNJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDcEYsQ0FBQzs7O09BQUE7SUFVRCxzQkFBWSxvREFBaUI7UUFEN0IsbUNBQW1DOzs7Ozs7O1FBQ25DO1lBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUM7UUFDbEcsQ0FBQzs7O09BQUE7SUFNRCw0Q0FBNEM7Ozs7OztJQUM1Qyw2Q0FBYTs7Ozs7O0lBQWIsVUFBYyxRQUFvQjtRQUFsQyxpQkFPQztRQU5HLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFOztnQkFDekIscUJBQXFCLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTOzs7WUFBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQTlCLENBQThCLEVBQUM7O2dCQUMxRixzQkFBc0IsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVM7OztZQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxFQUE5QixDQUE4QixFQUFDO1lBRWxHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUMsUUFBUSxVQUFBLEVBQUUscUJBQXFCLHVCQUFBLEVBQUUsc0JBQXNCLHdCQUFBLEVBQUMsQ0FBQyxDQUFDO1NBQ25HO0lBQ0wsQ0FBQzs7Ozs7SUFFRCw2Q0FBYTs7OztJQUFiLFVBQWMsUUFBb0I7UUFDOUIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxxQ0FBcUM7Ozs7O0lBQ3JDLHdDQUFROzs7OztJQUFSOztZQUNRLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU07UUFFOUIsT0FBTyxDQUFDLEVBQUUsRUFBRTtZQUNSLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDOUI7SUFDTCxDQUFDOzs7Ozs7SUFFTywrQ0FBZTs7Ozs7SUFBdkIsVUFBd0IsUUFBb0I7O1lBQ2xDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFFL0MsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDWixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFakMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO2dCQUN6QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQzdCO1NBQ0o7SUFDTCxDQUFDOztnQkE5REosVUFBVTs7OztnQkEwQjRDLHFCQUFxQix1QkFBbkUsUUFBUSxZQUFJLFFBQVE7O0lBcUM3Qiw0QkFBQztDQUFBLEFBL0RELElBK0RDO1NBOURZLHFCQUFxQjs7Ozs7O0lBYTlCLCtDQUFzRTs7Ozs7SUFFdEUsa0RBQTJGOzs7OztJQUUzRixzREFBd0c7Ozs7O0lBUXBHLDhDQUFvRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE1jTW9kYWxSZWYgfSBmcm9tICcuL21vZGFsLXJlZi5jbGFzcyc7XG5cblxuaW50ZXJmYWNlIElSZWdpc3RlcmVkTWV0YSB7XG4gICAgbW9kYWxSZWY6IE1jTW9kYWxSZWY7XG4gICAgYWZ0ZXJPcGVuU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgYWZ0ZXJDbG9zZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWNNb2RhbENvbnRyb2xTZXJ2aWNlIHtcblxuICAgIC8vIFRyYWNrIHNpbmdsZXRvbiBhZnRlckFsbENsb3NlIHRocm91Z2ggb3ZlciB0aGUgaW5qZWN0aW9uIHRyZWVcbiAgICBnZXQgYWZ0ZXJBbGxDbG9zZSgpOiBTdWJqZWN0PHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2VydmljZSA/IHRoaXMucGFyZW50U2VydmljZS5hZnRlckFsbENsb3NlIDogdGhpcy5yb290QWZ0ZXJBbGxDbG9zZTtcbiAgICB9XG5cbiAgICAvLyBUcmFjayBzaW5nbGV0b24gb3Blbk1vZGFscyBhcnJheSB0aHJvdWdoIG92ZXIgdGhlIGluamVjdGlvbiB0cmVlXG4gICAgZ2V0IG9wZW5Nb2RhbHMoKTogTWNNb2RhbFJlZltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2VydmljZSA/IHRoaXMucGFyZW50U2VydmljZS5vcGVuTW9kYWxzIDogdGhpcy5yb290T3Blbk1vZGFscztcbiAgICB9XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcHJpdmF0ZSByb290T3Blbk1vZGFsczogTWNNb2RhbFJlZltdID0gdGhpcy5wYXJlbnRTZXJ2aWNlID8gbnVsbCA6IFtdO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwcml2YXRlIHJvb3RBZnRlckFsbENsb3NlOiBTdWJqZWN0PHZvaWQ+ID0gdGhpcy5wYXJlbnRTZXJ2aWNlID8gbnVsbCA6IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHByaXZhdGUgcm9vdFJlZ2lzdGVyZWRNZXRhTWFwOiBNYXA8TWNNb2RhbFJlZiwgSVJlZ2lzdGVyZWRNZXRhPiA9IHRoaXMucGFyZW50U2VydmljZSA/IG51bGwgOiBuZXcgTWFwKCk7XG5cbiAgICAvLyBSZWdpc3RlcmVkIG1vZGFsIGZvciBsYXRlciB1c2FnZVxuICAgIHByaXZhdGUgZ2V0IHJlZ2lzdGVyZWRNZXRhTWFwKCk6IE1hcDxNY01vZGFsUmVmLCBJUmVnaXN0ZXJlZE1ldGE+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2VydmljZSA/IHRoaXMucGFyZW50U2VydmljZS5yZWdpc3RlcmVkTWV0YU1hcCA6IHRoaXMucm9vdFJlZ2lzdGVyZWRNZXRhTWFwO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwcml2YXRlIHBhcmVudFNlcnZpY2U6IE1jTW9kYWxDb250cm9sU2VydmljZSkge1xuICAgIH1cblxuICAgIC8vIFJlZ2lzdGVyIGEgbW9kYWwgdG8gbGlzdGVuIGl0cyBvcGVuL2Nsb3NlXG4gICAgcmVnaXN0ZXJNb2RhbChtb2RhbFJlZjogTWNNb2RhbFJlZik6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuaGFzUmVnaXN0ZXJlZChtb2RhbFJlZikpIHtcbiAgICAgICAgICAgIGNvbnN0IGFmdGVyT3BlblN1YnNjcmlwdGlvbiA9IG1vZGFsUmVmLmFmdGVyT3Blbi5zdWJzY3JpYmUoKCkgPT4gdGhpcy5vcGVuTW9kYWxzLnB1c2gobW9kYWxSZWYpKTtcbiAgICAgICAgICAgIGNvbnN0IGFmdGVyQ2xvc2VTdWJzY3JpcHRpb24gPSBtb2RhbFJlZi5hZnRlckNsb3NlLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlbW92ZU9wZW5Nb2RhbChtb2RhbFJlZikpO1xuXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyZWRNZXRhTWFwLnNldChtb2RhbFJlZiwge21vZGFsUmVmLCBhZnRlck9wZW5TdWJzY3JpcHRpb24sIGFmdGVyQ2xvc2VTdWJzY3JpcHRpb259KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc1JlZ2lzdGVyZWQobW9kYWxSZWY6IE1jTW9kYWxSZWYpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXJlZE1ldGFNYXAuaGFzKG1vZGFsUmVmKTtcbiAgICB9XG5cbiAgICAvLyBDbG9zZSBhbGwgcmVnaXN0ZXJlZCBvcGVuZWQgbW9kYWxzXG4gICAgY2xvc2VBbGwoKTogdm9pZCB7XG4gICAgICAgIGxldCBpID0gdGhpcy5vcGVuTW9kYWxzLmxlbmd0aDtcblxuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5Nb2RhbHNbaV0uY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlT3Blbk1vZGFsKG1vZGFsUmVmOiBNY01vZGFsUmVmKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5vcGVuTW9kYWxzLmluZGV4T2YobW9kYWxSZWYpO1xuXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5Nb2RhbHMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLm9wZW5Nb2RhbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZnRlckFsbENsb3NlLm5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==