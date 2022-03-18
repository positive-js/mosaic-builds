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
        // Remove the Cancel button if the user not specify a Cancel button
        if (!('mcCancelText' in options)) {
            options.mcCancelText = undefined;
        }
        // Remove the Ok button if the user not specify a Ok button
        if (!('mcOkText' in options)) {
            options.mcOkText = undefined;
        }
        // Remove the footer if the user not specify a footer
        if (!('mcFooter' in options)) {
            options.mcFooter = undefined;
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
        return this.confirm(options, confirmType);
    }
}
/** @nocollapse */ /** @nocollapse */ McModalService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McModalService, deps: [{ token: i1.Overlay }, { token: i2.McModalControlService }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ /** @nocollapse */ McModalService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McModalService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McModalService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i2.McModalControlService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9tb2RhbC9tb2RhbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQWMsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFnQixVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWxELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7OztBQUlyRCxzREFBc0Q7QUFDdEQsTUFBTSxPQUFPLHNCQUFzQjtJQUsvQixZQUFvQixPQUFnQixFQUFFLFVBQW1DLEVBQUU7UUFBdkQsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbkIsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLElBQUksT0FBTyxDQUFDLEVBQUU7WUFDaEMsT0FBTyxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7U0FDdEM7UUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFTLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFTLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7UUFFMUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUU7WUFDM0Is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eyBPdmVybGF5LCBPdmVybGF5UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBDb21wb25lbnRSZWYsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVTQ0FQRSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1jTW9kYWxDb250cm9sU2VydmljZSB9IGZyb20gJy4vbW9kYWwtY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IE1jTW9kYWxSZWYgfSBmcm9tICcuL21vZGFsLXJlZi5jbGFzcyc7XG5pbXBvcnQgeyBNY01vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlybVR5cGUsIElNb2RhbE9wdGlvbnMsIElNb2RhbE9wdGlvbnNGb3JTZXJ2aWNlIH0gZnJvbSAnLi9tb2RhbC50eXBlJztcblxuXG4vLyBBIGJ1aWxkZXIgdXNlZCBmb3IgbWFuYWdpbmcgc2VydmljZSBjcmVhdGluZyBtb2RhbHNcbmV4cG9ydCBjbGFzcyBNb2RhbEJ1aWxkZXJGb3JTZXJ2aWNlIHtcbiAgICAvLyBNb2RhbCBDb21wb25lbnRSZWYsIFwibnVsbFwiIG1lYW5zIGl0IGhhcyBiZWVuIGRlc3Ryb3llZFxuICAgIHByaXZhdGUgbW9kYWxSZWY6IENvbXBvbmVudFJlZjxNY01vZGFsQ29tcG9uZW50PiB8IG51bGw7XG4gICAgcHJpdmF0ZSBvdmVybGF5UmVmOiBPdmVybGF5UmVmO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LCBvcHRpb25zOiBJTW9kYWxPcHRpb25zRm9yU2VydmljZSA9IHt9KSB7XG4gICAgICAgIHRoaXMuY3JlYXRlTW9kYWwoKTtcblxuICAgICAgICBpZiAoISgnbWNHZXRDb250YWluZXInIGluIG9wdGlvbnMpKSB7XG4gICAgICAgICAgICBvcHRpb25zLm1jR2V0Q29udGFpbmVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VQcm9wcyhvcHRpb25zKTtcbiAgICAgICAgdGhpcy5tb2RhbFJlZiEuaW5zdGFuY2Uub3BlbigpO1xuICAgICAgICB0aGlzLm1vZGFsUmVmIS5pbnN0YW5jZS5tY0FmdGVyQ2xvc2Uuc3Vic2NyaWJlKCgpID0+IHRoaXMuZGVzdHJveU1vZGFsKCkpO1xuXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5rZXlkb3duRXZlbnRzKClcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIC5waXBlKGZpbHRlcigoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb24gcmVwbGFjZW1lbnQgLmtleSBpc24ndCBzdXBwb3J0ZWQgaW4gRWRnZVxuICAgICAgICAgICAgICAgIHJldHVybiBldmVudC5rZXlDb2RlID09PSBFU0NBUEUgJiYgb3B0aW9ucy5tY0Nsb3NlQnlFU0M7XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5tb2RhbFJlZiEuaW5zdGFuY2UuY2xvc2UoKSk7XG4gICAgfVxuXG4gICAgZ2V0SW5zdGFuY2UoKTogTWNNb2RhbENvbXBvbmVudCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFJlZiAmJiB0aGlzLm1vZGFsUmVmLmluc3RhbmNlO1xuICAgIH1cblxuICAgIGRlc3Ryb3lNb2RhbCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubW9kYWxSZWYpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLm1vZGFsUmVmID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlUHJvcHMob3B0aW9uczogSU1vZGFsT3B0aW9ucyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5tb2RhbFJlZikge1xuICAgICAgICAgICAgLy8gaGVyZSBub3QgbGltaXQgdXNlcidzIGlucHV0cyBhdCBydW50aW1lXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMubW9kYWxSZWYuaW5zdGFuY2UsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIGNvbXBvbmVudCB0byBBcHBsaWNhdGlvblJlZlxuICAgIHByaXZhdGUgY3JlYXRlTW9kYWwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUoKTtcbiAgICAgICAgdGhpcy5tb2RhbFJlZiA9IHRoaXMub3ZlcmxheVJlZi5hdHRhY2gobmV3IENvbXBvbmVudFBvcnRhbChNY01vZGFsQ29tcG9uZW50KSk7XG4gICAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWNNb2RhbFNlcnZpY2Uge1xuICAgIC8vIFRyYWNrIG9mIHRoZSBjdXJyZW50IGNsb3NlIG1vZGFscyAod2UgYXNzdW1lIGludmlzaWJsZSBpcyBjbG9zZSB0aGlzIHRpbWUpXG4gICAgZ2V0IG9wZW5Nb2RhbHMoKTogTWNNb2RhbFJlZltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxDb250cm9sLm9wZW5Nb2RhbHM7XG4gICAgfVxuXG4gICAgZ2V0IGFmdGVyQWxsQ2xvc2UoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsQ29udHJvbC5hZnRlckFsbENsb3NlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgICAgIHByaXZhdGUgbW9kYWxDb250cm9sOiBNY01vZGFsQ29udHJvbFNlcnZpY2VcbiAgICApIHt9XG5cbiAgICAvLyBDbG9zZXMgYWxsIG9mIHRoZSBjdXJyZW50bHktb3BlbiBkaWFsb2dzXG4gICAgY2xvc2VBbGwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubW9kYWxDb250cm9sLmNsb3NlQWxsKCk7XG4gICAgfVxuXG4gICAgY3JlYXRlPFQ+KG9wdGlvbnM6IElNb2RhbE9wdGlvbnNGb3JTZXJ2aWNlPFQ+ID0ge30pOiBNY01vZGFsUmVmPFQ+IHtcblxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubWNPbkNhbmNlbCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gTGVhdmUgYSBlbXB0eSBmdW5jdGlvbiB0byBjbG9zZSB0aGlzIG1vZGFsIGJ5IGRlZmF1bHRcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgICAgb3B0aW9ucy5tY09uQ2FuY2VsID0gKCkgPT4ge307XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoISgnbWNDbG9zZUJ5RVNDJyBpbiBvcHRpb25zKSkge1xuICAgICAgICAgICAgb3B0aW9ucy5tY0Nsb3NlQnlFU0MgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlbW92ZSB0aGUgQ2FuY2VsIGJ1dHRvbiBpZiB0aGUgdXNlciBub3Qgc3BlY2lmeSBhIENhbmNlbCBidXR0b25cbiAgICAgICAgaWYgKCEoJ21jQ2FuY2VsVGV4dCcgaW4gb3B0aW9ucykpIHtcbiAgICAgICAgICAgIG9wdGlvbnMubWNDYW5jZWxUZXh0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlbW92ZSB0aGUgT2sgYnV0dG9uIGlmIHRoZSB1c2VyIG5vdCBzcGVjaWZ5IGEgT2sgYnV0dG9uXG4gICAgICAgIGlmICghKCdtY09rVGV4dCcgaW4gb3B0aW9ucykpIHtcbiAgICAgICAgICAgIG9wdGlvbnMubWNPa1RleHQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBmb290ZXIgaWYgdGhlIHVzZXIgbm90IHNwZWNpZnkgYSBmb290ZXJcbiAgICAgICAgaWYgKCEoJ21jRm9vdGVyJyBpbiBvcHRpb25zKSkge1xuICAgICAgICAgICAgb3B0aW9ucy5tY0Zvb3RlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgTW9kYWxCdWlsZGVyRm9yU2VydmljZSh0aGlzLm92ZXJsYXksIG9wdGlvbnMpLmdldEluc3RhbmNlKCkhO1xuICAgIH1cblxuICAgIGNvbmZpcm08VD4ob3B0aW9uczogSU1vZGFsT3B0aW9uc0ZvclNlcnZpY2U8VD4gPSB7fSwgY29uZmlybVR5cGU6IENvbmZpcm1UeXBlID0gJ2NvbmZpcm0nKTogTWNNb2RhbFJlZjxUPiB7XG4gICAgICAgIGlmICgnbWNGb290ZXInIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgVGhlIENvbmZpcm0tTW9kYWwgZG9lc24ndCBzdXBwb3J0IFwibWNGb290ZXJcIiwgdGhpcyBwcm9wZXJ0eSB3aWxsIGJlIGlnbm9yZWQuYCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBOT1RFOiBvbmx5IHN1cHBvcnQgZnVuY3Rpb24gY3VycmVudGx5IGJ5IGNhbGxpbmcgY29uZmlybSgpXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5tY09uT2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIExlYXZlIGEgZW1wdHkgZnVuY3Rpb24gdG8gY2xvc2UgdGhpcyBtb2RhbCBieSBkZWZhdWx0XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgIG9wdGlvbnMubWNPbk9rID0gKCkgPT4ge307XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zLm1jTW9kYWxUeXBlID0gJ2NvbmZpcm0nO1xuICAgICAgICBvcHRpb25zLm1jQ2xhc3NOYW1lID0gYG1jLWNvbmZpcm0gbWMtY29uZmlybS0ke2NvbmZpcm1UeXBlfSAke29wdGlvbnMubWNDbGFzc05hbWUgfHwgJyd9YDtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGUob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgb3BlbjxUPihvcHRpb25zOiBJTW9kYWxPcHRpb25zRm9yU2VydmljZTxUPiA9IHt9KTogTWNNb2RhbFJlZjxUPiB7XG5cbiAgICAgICAgb3B0aW9ucy5tY01vZGFsVHlwZSA9ICdjdXN0b20nO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZShvcHRpb25zKTtcbiAgICB9XG5cbiAgICBzdWNjZXNzPFQ+KG9wdGlvbnM6IElNb2RhbE9wdGlvbnNGb3JTZXJ2aWNlPFQ+ID0ge30pOiBNY01vZGFsUmVmPFQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2ltcGxlQ29uZmlybShvcHRpb25zLCAnc3VjY2VzcycpO1xuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tcmVzZXJ2ZWQta2V5d29yZHNcbiAgICBkZWxldGU8VD4ob3B0aW9uczogSU1vZGFsT3B0aW9uc0ZvclNlcnZpY2U8VD4gPSB7fSk6IE1jTW9kYWxSZWY8VD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zaW1wbGVDb25maXJtKG9wdGlvbnMsICd3YXJuJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaW1wbGVDb25maXJtPFQ+KG9wdGlvbnM6IElNb2RhbE9wdGlvbnNGb3JTZXJ2aWNlPFQ+ID0ge30sIGNvbmZpcm1UeXBlOiBDb25maXJtVHlwZSk6IE1jTW9kYWxSZWY8VD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maXJtKG9wdGlvbnMsIGNvbmZpcm1UeXBlKTtcbiAgICB9XG59XG4iXX0=