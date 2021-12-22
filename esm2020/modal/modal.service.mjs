import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { filter } from 'rxjs/operators';
import { McModalControlService } from './modal-control.service';
import { McModalComponent } from './modal.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "./modal-control.service";
// A builder used for managing service creating modals
export class ModalBuilderForService {
    constructor(overlay, options = {}) {
        this.overlay = overlay;
        this.createModal();
        if (!('mcGetContainer' in options)) {
            options.mcGetContainer = undefined;
        }
        this.changeProps(options);
        this.modalRef.instance.open();
        this.modalRef.instance.mcAfterClose.subscribe(() => this.destroyModal());
        this.overlayRef.keydownEvents()
            // @ts-ignore
            .pipe(filter((event) => {
            // tslint:disable-next-line:deprecation replacement .key isn't supported in Edge
            return event.keyCode === ESCAPE && options.mcCloseByESC;
        }))
            .subscribe(() => this.modalRef.instance.close());
    }
    getInstance() {
        return this.modalRef && this.modalRef.instance;
    }
    destroyModal() {
        if (this.modalRef) {
            this.overlayRef.dispose();
            this.modalRef = null;
        }
    }
    changeProps(options) {
        if (this.modalRef) {
            // here not limit user's inputs at runtime
            Object.assign(this.modalRef.instance, options);
        }
    }
    // Create component to ApplicationRef
    createModal() {
        this.overlayRef = this.overlay.create();
        this.modalRef = this.overlayRef.attach(new ComponentPortal(McModalComponent));
    }
}
export class McModalService {
    constructor(overlay, modalControl) {
        this.overlay = overlay;
        this.modalControl = modalControl;
    }
    // Track of the current close modals (we assume invisible is close this time)
    get openModals() {
        return this.modalControl.openModals;
    }
    get afterAllClose() {
        return this.modalControl.afterAllClose.asObservable();
    }
    // Closes all of the currently-open dialogs
    closeAll() {
        this.modalControl.closeAll();
    }
    create(options = {}) {
        if (typeof options.mcOnCancel !== 'function') {
            // Leave a empty function to close this modal by default
            // tslint:disable-next-line
            options.mcOnCancel = () => { };
        }
        if (!('mcCloseByESC' in options)) {
            options.mcCloseByESC = true;
        }
        return new ModalBuilderForService(this.overlay, options).getInstance();
    }
    confirm(options = {}, confirmType = 'confirm') {
        if ('mcFooter' in options) {
            console.warn(`The Confirm-Modal doesn't support "mcFooter", this property will be ignored.`);
        }
        // NOTE: only support function currently by calling confirm()
        if (typeof options.mcOnOk !== 'function') {
            // Leave a empty function to close this modal by default
            // tslint:disable-next-line
            options.mcOnOk = () => { };
        }
        options.mcModalType = 'confirm';
        options.mcClassName = `mc-confirm mc-confirm-${confirmType} ${options.mcClassName || ''}`;
        return this.create(options);
    }
    open(options = {}) {
        options.mcModalType = 'custom';
        return this.create(options);
    }
    success(options = {}) {
        return this.simpleConfirm(options, 'success');
    }
    // tslint:disable-next-line: no-reserved-keywords
    delete(options = {}) {
        return this.simpleConfirm(options, 'warn');
    }
    simpleConfirm(options = {}, confirmType) {
        // Remove the Cancel button if the user not specify a Cancel button
        if (!('mcCancelText' in options)) {
            // @ts-ignore
            options.mcCancelText = null;
        }
        return this.confirm(options, confirmType);
    }
}
/** @nocollapse */ /** @nocollapse */ McModalService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McModalService, deps: [{ token: i1.Overlay }, { token: i2.McModalControlService }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ /** @nocollapse */ McModalService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McModalService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McModalService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i2.McModalControlService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9tb2RhbC9tb2RhbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQWMsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFnQixVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWxELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7OztBQUlyRCxzREFBc0Q7QUFDdEQsTUFBTSxPQUFPLHNCQUFzQjtJQUsvQixZQUFvQixPQUFnQixFQUFFLFVBQW1DLEVBQUU7UUFBdkQsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbkIsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLElBQUksT0FBTyxDQUFDLEVBQUU7WUFDaEMsT0FBTyxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7U0FDdEM7UUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFTLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFTLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7UUFFMUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUU7WUFDM0Is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QixXQUFXLElBQUksT0FBTyxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUUxRixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELElBQUksQ0FBSSxVQUFzQyxFQUFFO1FBRTVDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO1FBRS9CLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsT0FBTyxDQUFJLFVBQXNDLEVBQUU7UUFDL0MsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsaURBQWlEO0lBQ2pELE1BQU0sQ0FBSSxVQUFzQyxFQUFFO1FBQzlDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVPLGFBQWEsQ0FBSSxVQUFzQyxFQUFFLEVBQUUsV0FBd0I7UUFDdkYsbUVBQW1FO1FBQ25FLElBQUksQ0FBQyxDQUFDLGNBQWMsSUFBSSxPQUFPLENBQUMsRUFBRTtZQUM5QixhQUFhO1lBQ2IsT0FBTyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDL0I7UUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzlDLENBQUM7O2lKQTdFUSxjQUFjO3FKQUFkLGNBQWM7MkZBQWQsY0FBYztrQkFEMUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXksIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IENvbXBvbmVudFJlZiwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRVNDQVBFIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWNNb2RhbENvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi9tb2RhbC1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWNNb2RhbFJlZiB9IGZyb20gJy4vbW9kYWwtcmVmLmNsYXNzJztcbmltcG9ydCB7IE1jTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb25maXJtVHlwZSwgSU1vZGFsT3B0aW9ucywgSU1vZGFsT3B0aW9uc0ZvclNlcnZpY2UgfSBmcm9tICcuL21vZGFsLnR5cGUnO1xuXG5cbi8vIEEgYnVpbGRlciB1c2VkIGZvciBtYW5hZ2luZyBzZXJ2aWNlIGNyZWF0aW5nIG1vZGFsc1xuZXhwb3J0IGNsYXNzIE1vZGFsQnVpbGRlckZvclNlcnZpY2Uge1xuICAgIC8vIE1vZGFsIENvbXBvbmVudFJlZiwgXCJudWxsXCIgbWVhbnMgaXQgaGFzIGJlZW4gZGVzdHJveWVkXG4gICAgcHJpdmF0ZSBtb2RhbFJlZjogQ29tcG9uZW50UmVmPE1jTW9kYWxDb21wb25lbnQ+IHwgbnVsbDtcbiAgICBwcml2YXRlIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWY7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksIG9wdGlvbnM6IElNb2RhbE9wdGlvbnNGb3JTZXJ2aWNlID0ge30pIHtcbiAgICAgICAgdGhpcy5jcmVhdGVNb2RhbCgpO1xuXG4gICAgICAgIGlmICghKCdtY0dldENvbnRhaW5lcicgaW4gb3B0aW9ucykpIHtcbiAgICAgICAgICAgIG9wdGlvbnMubWNHZXRDb250YWluZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYW5nZVByb3BzKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLm1vZGFsUmVmIS5pbnN0YW5jZS5vcGVuKCk7XG4gICAgICAgIHRoaXMubW9kYWxSZWYhLmluc3RhbmNlLm1jQWZ0ZXJDbG9zZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kZXN0cm95TW9kYWwoKSk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmtleWRvd25FdmVudHMoKVxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgLnBpcGUoZmlsdGVyKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvbiByZXBsYWNlbWVudCAua2V5IGlzbid0IHN1cHBvcnRlZCBpbiBFZGdlXG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSAmJiBvcHRpb25zLm1jQ2xvc2VCeUVTQztcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLm1vZGFsUmVmIS5pbnN0YW5jZS5jbG9zZSgpKTtcbiAgICB9XG5cbiAgICBnZXRJbnN0YW5jZSgpOiBNY01vZGFsQ29tcG9uZW50IHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsUmVmICYmIHRoaXMubW9kYWxSZWYuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgZGVzdHJveU1vZGFsKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5tb2RhbFJlZikge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRoaXMubW9kYWxSZWYgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VQcm9wcyhvcHRpb25zOiBJTW9kYWxPcHRpb25zKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm1vZGFsUmVmKSB7XG4gICAgICAgICAgICAvLyBoZXJlIG5vdCBsaW1pdCB1c2VyJ3MgaW5wdXRzIGF0IHJ1bnRpbWVcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5tb2RhbFJlZi5pbnN0YW5jZSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgY29tcG9uZW50IHRvIEFwcGxpY2F0aW9uUmVmXG4gICAgcHJpdmF0ZSBjcmVhdGVNb2RhbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSgpO1xuICAgICAgICB0aGlzLm1vZGFsUmVmID0gdGhpcy5vdmVybGF5UmVmLmF0dGFjaChuZXcgQ29tcG9uZW50UG9ydGFsKE1jTW9kYWxDb21wb25lbnQpKTtcbiAgICB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNY01vZGFsU2VydmljZSB7XG4gICAgLy8gVHJhY2sgb2YgdGhlIGN1cnJlbnQgY2xvc2UgbW9kYWxzICh3ZSBhc3N1bWUgaW52aXNpYmxlIGlzIGNsb3NlIHRoaXMgdGltZSlcbiAgICBnZXQgb3Blbk1vZGFscygpOiBNY01vZGFsUmVmW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbENvbnRyb2wub3Blbk1vZGFscztcbiAgICB9XG5cbiAgICBnZXQgYWZ0ZXJBbGxDbG9zZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxDb250cm9sLmFmdGVyQWxsQ2xvc2UuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSBtb2RhbENvbnRyb2w6IE1jTW9kYWxDb250cm9sU2VydmljZVxuICAgICkge31cblxuICAgIC8vIENsb3NlcyBhbGwgb2YgdGhlIGN1cnJlbnRseS1vcGVuIGRpYWxvZ3NcbiAgICBjbG9zZUFsbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tb2RhbENvbnRyb2wuY2xvc2VBbGwoKTtcbiAgICB9XG5cbiAgICBjcmVhdGU8VD4ob3B0aW9uczogSU1vZGFsT3B0aW9uc0ZvclNlcnZpY2U8VD4gPSB7fSk6IE1jTW9kYWxSZWY8VD4ge1xuXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5tY09uQ2FuY2VsICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBMZWF2ZSBhIGVtcHR5IGZ1bmN0aW9uIHRvIGNsb3NlIHRoaXMgbW9kYWwgYnkgZGVmYXVsdFxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgICBvcHRpb25zLm1jT25DYW5jZWwgPSAoKSA9PiB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKCdtY0Nsb3NlQnlFU0MnIGluIG9wdGlvbnMpKSB7XG4gICAgICAgICAgICBvcHRpb25zLm1jQ2xvc2VCeUVTQyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IE1vZGFsQnVpbGRlckZvclNlcnZpY2UodGhpcy5vdmVybGF5LCBvcHRpb25zKS5nZXRJbnN0YW5jZSgpITtcbiAgICB9XG5cbiAgICBjb25maXJtPFQ+KG9wdGlvbnM6IElNb2RhbE9wdGlvbnNGb3JTZXJ2aWNlPFQ+ID0ge30sIGNvbmZpcm1UeXBlOiBDb25maXJtVHlwZSA9ICdjb25maXJtJyk6IE1jTW9kYWxSZWY8VD4ge1xuICAgICAgICBpZiAoJ21jRm9vdGVyJyBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYFRoZSBDb25maXJtLU1vZGFsIGRvZXNuJ3Qgc3VwcG9ydCBcIm1jRm9vdGVyXCIsIHRoaXMgcHJvcGVydHkgd2lsbCBiZSBpZ25vcmVkLmApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTk9URTogb25seSBzdXBwb3J0IGZ1bmN0aW9uIGN1cnJlbnRseSBieSBjYWxsaW5nIGNvbmZpcm0oKVxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubWNPbk9rICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBMZWF2ZSBhIGVtcHR5IGZ1bmN0aW9uIHRvIGNsb3NlIHRoaXMgbW9kYWwgYnkgZGVmYXVsdFxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgICBvcHRpb25zLm1jT25PayA9ICgpID0+IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9ucy5tY01vZGFsVHlwZSA9ICdjb25maXJtJztcbiAgICAgICAgb3B0aW9ucy5tY0NsYXNzTmFtZSA9IGBtYy1jb25maXJtIG1jLWNvbmZpcm0tJHtjb25maXJtVHlwZX0gJHtvcHRpb25zLm1jQ2xhc3NOYW1lIHx8ICcnfWA7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIG9wZW48VD4ob3B0aW9uczogSU1vZGFsT3B0aW9uc0ZvclNlcnZpY2U8VD4gPSB7fSk6IE1jTW9kYWxSZWY8VD4ge1xuXG4gICAgICAgIG9wdGlvbnMubWNNb2RhbFR5cGUgPSAnY3VzdG9tJztcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGUob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgc3VjY2VzczxUPihvcHRpb25zOiBJTW9kYWxPcHRpb25zRm9yU2VydmljZTxUPiA9IHt9KTogTWNNb2RhbFJlZjxUPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNpbXBsZUNvbmZpcm0ob3B0aW9ucywgJ3N1Y2Nlc3MnKTtcbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXJlc2VydmVkLWtleXdvcmRzXG4gICAgZGVsZXRlPFQ+KG9wdGlvbnM6IElNb2RhbE9wdGlvbnNGb3JTZXJ2aWNlPFQ+ID0ge30pOiBNY01vZGFsUmVmPFQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2ltcGxlQ29uZmlybShvcHRpb25zLCAnd2FybicpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2ltcGxlQ29uZmlybTxUPihvcHRpb25zOiBJTW9kYWxPcHRpb25zRm9yU2VydmljZTxUPiA9IHt9LCBjb25maXJtVHlwZTogQ29uZmlybVR5cGUpOiBNY01vZGFsUmVmPFQ+IHtcbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBDYW5jZWwgYnV0dG9uIGlmIHRoZSB1c2VyIG5vdCBzcGVjaWZ5IGEgQ2FuY2VsIGJ1dHRvblxuICAgICAgICBpZiAoISgnbWNDYW5jZWxUZXh0JyBpbiBvcHRpb25zKSkge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgb3B0aW9ucy5tY0NhbmNlbFRleHQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlybShvcHRpb25zLCBjb25maXJtVHlwZSk7XG4gICAgfVxufVxuIl19