import { TemplatePortal, DomPortalOutlet } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { Directive, TemplateRef, ComponentFactoryResolver, ApplicationRef, Injector, ViewContainerRef, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Dropdown content that will be rendered lazily once the dropdown is opened.
 */
export class McDropdownContent {
    constructor(template, componentFactoryResolver, appRef, injector, viewContainerRef, document) {
        this.template = template;
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
        this.viewContainerRef = viewContainerRef;
        this.document = document;
        /** Emits when the dropdown content has been attached. */
        this.attached = new Subject();
    }
    /**
     * Attaches the content with a particular context.
     * @docs-private
     */
    attach(context = {}) {
        if (!this.portal) {
            this.portal = new TemplatePortal(this.template, this.viewContainerRef);
        }
        this.detach();
        if (!this.outlet) {
            this.outlet = new DomPortalOutlet(this.document.createElement('div'), this.componentFactoryResolver, this.appRef, this.injector);
        }
        const element = this.template.elementRef.nativeElement;
        // Because we support opening the same dropdown from different triggers (which in turn have their
        // own `OverlayRef` panel), we have to re-insert the host element every time, otherwise we
        // risk it staying attached to a pane that's no longer in the DOM.
        element.parentNode.insertBefore(this.outlet.outletElement, element);
        this.portal.attach(this.outlet, context);
        this.attached.next();
    }
    /**
     * Detaches the content.
     * @docs-private
     */
    detach() {
        var _a;
        if ((_a = this.portal) === null || _a === void 0 ? void 0 : _a.isAttached) {
            this.portal.detach();
        }
    }
    ngOnDestroy() {
        var _a;
        (_a = this.outlet) === null || _a === void 0 ? void 0 : _a.dispose();
    }
}
/** @nocollapse */ McDropdownContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDropdownContent, deps: [{ token: i0.TemplateRef }, { token: i0.ComponentFactoryResolver }, { token: i0.ApplicationRef }, { token: i0.Injector }, { token: i0.ViewContainerRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McDropdownContent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McDropdownContent, selector: "ng-template[mcDropdownContent]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDropdownContent, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[mcDropdownContent]'
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }, { type: i0.ComponentFactoryResolver }, { type: i0.ApplicationRef }, { type: i0.Injector }, { type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tY29udGVudC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvZHJvcGRvd24vZHJvcGRvd24tY29udGVudC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUNILFNBQVMsRUFDVCxXQUFXLEVBQ1gsd0JBQXdCLEVBQ3hCLGNBQWMsRUFDZCxRQUFRLEVBQ1IsZ0JBQWdCLEVBQ2hCLE1BQU0sRUFFVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUcvQjs7R0FFRztBQUlILE1BQU0sT0FBTyxpQkFBaUI7SUFNMUIsWUFDWSxRQUEwQixFQUMxQix3QkFBa0QsRUFDbEQsTUFBc0IsRUFDdEIsUUFBa0IsRUFDbEIsZ0JBQWtDLEVBQ2hCLFFBQWE7UUFML0IsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFDMUIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDaEIsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQVgzQyx5REFBeUQ7UUFDekQsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7SUFXNUIsQ0FBQztJQUVKOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxVQUFlLEVBQUU7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDMUU7UUFFRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFZCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFlLENBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUNsQyxJQUFJLENBQUMsd0JBQXdCLEVBQzdCLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FDaEIsQ0FBQztTQUNMO1FBRUQsTUFBTSxPQUFPLEdBQWdCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUVwRSxpR0FBaUc7UUFDakcsMEZBQTBGO1FBQzFGLGtFQUFrRTtRQUNsRSxPQUFPLENBQUMsVUFBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7T0FHRztJQUNILE1BQU07O1FBQ0YsSUFBSSxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLFVBQVUsRUFBRTtZQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUVELFdBQVc7O1FBQ1AsTUFBQSxJQUFJLENBQUMsTUFBTSwwQ0FBRSxPQUFPLEVBQUUsQ0FBQztJQUMzQixDQUFDOztpSUF6RFEsaUJBQWlCLDJLQVlkLFFBQVE7cUhBWlgsaUJBQWlCOzJGQUFqQixpQkFBaUI7a0JBSDdCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGdDQUFnQztpQkFDN0M7OzBCQWFRLE1BQU07MkJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRlbXBsYXRlUG9ydGFsLCBEb21Qb3J0YWxPdXRsZXQgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgRGlyZWN0aXZlLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBBcHBsaWNhdGlvblJlZixcbiAgICBJbmplY3RvcixcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIEluamVjdCxcbiAgICBPbkRlc3Ryb3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cblxuLyoqXG4gKiBEcm9wZG93biBjb250ZW50IHRoYXQgd2lsbCBiZSByZW5kZXJlZCBsYXppbHkgb25jZSB0aGUgZHJvcGRvd24gaXMgb3BlbmVkLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW21jRHJvcGRvd25Db250ZW50XSdcbn0pXG5leHBvcnQgY2xhc3MgTWNEcm9wZG93bkNvbnRlbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSBkcm9wZG93biBjb250ZW50IGhhcyBiZWVuIGF0dGFjaGVkLiAqL1xuICAgIGF0dGFjaGVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICBwcml2YXRlIHBvcnRhbDogVGVtcGxhdGVQb3J0YWw7XG4gICAgcHJpdmF0ZSBvdXRsZXQ6IERvbVBvcnRhbE91dGxldDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgICAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueVxuICAgICkge31cblxuICAgIC8qKlxuICAgICAqIEF0dGFjaGVzIHRoZSBjb250ZW50IHdpdGggYSBwYXJ0aWN1bGFyIGNvbnRleHQuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGF0dGFjaChjb250ZXh0OiBhbnkgPSB7fSkge1xuICAgICAgICBpZiAoIXRoaXMucG9ydGFsKSB7XG4gICAgICAgICAgICB0aGlzLnBvcnRhbCA9IG5ldyBUZW1wbGF0ZVBvcnRhbCh0aGlzLnRlbXBsYXRlLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kZXRhY2goKTtcblxuICAgICAgICBpZiAoIXRoaXMub3V0bGV0KSB7XG4gICAgICAgICAgICB0aGlzLm91dGxldCA9IG5ldyBEb21Qb3J0YWxPdXRsZXQoXG4gICAgICAgICAgICAgICAgdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgICB0aGlzLmFwcFJlZixcbiAgICAgICAgICAgICAgICB0aGlzLmluamVjdG9yXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLnRlbXBsYXRlLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgICAvLyBCZWNhdXNlIHdlIHN1cHBvcnQgb3BlbmluZyB0aGUgc2FtZSBkcm9wZG93biBmcm9tIGRpZmZlcmVudCB0cmlnZ2VycyAod2hpY2ggaW4gdHVybiBoYXZlIHRoZWlyXG4gICAgICAgIC8vIG93biBgT3ZlcmxheVJlZmAgcGFuZWwpLCB3ZSBoYXZlIHRvIHJlLWluc2VydCB0aGUgaG9zdCBlbGVtZW50IGV2ZXJ5IHRpbWUsIG90aGVyd2lzZSB3ZVxuICAgICAgICAvLyByaXNrIGl0IHN0YXlpbmcgYXR0YWNoZWQgdG8gYSBwYW5lIHRoYXQncyBubyBsb25nZXIgaW4gdGhlIERPTS5cbiAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlIS5pbnNlcnRCZWZvcmUodGhpcy5vdXRsZXQub3V0bGV0RWxlbWVudCwgZWxlbWVudCk7XG4gICAgICAgIHRoaXMucG9ydGFsLmF0dGFjaCh0aGlzLm91dGxldCwgY29udGV4dCk7XG4gICAgICAgIHRoaXMuYXR0YWNoZWQubmV4dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGFjaGVzIHRoZSBjb250ZW50LlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBkZXRhY2goKSB7XG4gICAgICAgIGlmICh0aGlzLnBvcnRhbD8uaXNBdHRhY2hlZCkge1xuICAgICAgICAgICAgdGhpcy5wb3J0YWwuZGV0YWNoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5vdXRsZXQ/LmRpc3Bvc2UoKTtcbiAgICB9XG59XG4iXX0=