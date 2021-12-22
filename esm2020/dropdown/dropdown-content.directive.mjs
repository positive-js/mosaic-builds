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
        if (this.portal?.isAttached) {
            this.portal.detach();
        }
    }
    ngOnDestroy() {
        this.outlet?.dispose();
    }
}
/** @nocollapse */ /** @nocollapse */ McDropdownContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McDropdownContent, deps: [{ token: i0.TemplateRef }, { token: i0.ComponentFactoryResolver }, { token: i0.ApplicationRef }, { token: i0.Injector }, { token: i0.ViewContainerRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McDropdownContent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: McDropdownContent, selector: "ng-template[mcDropdownContent]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McDropdownContent, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[mcDropdownContent]'
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }, { type: i0.ComponentFactoryResolver }, { type: i0.ApplicationRef }, { type: i0.Injector }, { type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tY29udGVudC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvZHJvcGRvd24vZHJvcGRvd24tY29udGVudC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUNILFNBQVMsRUFDVCxXQUFXLEVBQ1gsd0JBQXdCLEVBQ3hCLGNBQWMsRUFDZCxRQUFRLEVBQ1IsZ0JBQWdCLEVBQ2hCLE1BQU0sRUFFVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUcvQjs7R0FFRztBQUlILE1BQU0sT0FBTyxpQkFBaUI7SUFNMUIsWUFDWSxRQUEwQixFQUMxQix3QkFBa0QsRUFDbEQsTUFBc0IsRUFDdEIsUUFBa0IsRUFDbEIsZ0JBQWtDLEVBQ2hCLFFBQWE7UUFML0IsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFDMUIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDaEIsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQVgzQyx5REFBeUQ7UUFDekQsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7SUFXNUIsQ0FBQztJQUVKOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxVQUFlLEVBQUU7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDMUU7UUFFRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFZCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFlLENBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUNsQyxJQUFJLENBQUMsd0JBQXdCLEVBQzdCLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FDaEIsQ0FBQztTQUNMO1FBRUQsTUFBTSxPQUFPLEdBQWdCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUVwRSxpR0FBaUc7UUFDakcsMEZBQTBGO1FBQzFGLGtFQUFrRTtRQUNsRSxPQUFPLENBQUMsVUFBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7T0FHRztJQUNILE1BQU07UUFDRixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7b0pBekRRLGlCQUFpQiwyS0FZZCxRQUFRO3dJQVpYLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQUg3QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxnQ0FBZ0M7aUJBQzdDOzswQkFhUSxNQUFNOzJCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCwgRG9tUG9ydGFsT3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIERpcmVjdGl2ZSxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgQXBwbGljYXRpb25SZWYsXG4gICAgSW5qZWN0b3IsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBJbmplY3QsXG4gICAgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5cbi8qKlxuICogRHJvcGRvd24gY29udGVudCB0aGF0IHdpbGwgYmUgcmVuZGVyZWQgbGF6aWx5IG9uY2UgdGhlIGRyb3Bkb3duIGlzIG9wZW5lZC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVttY0Ryb3Bkb3duQ29udGVudF0nXG59KVxuZXhwb3J0IGNsYXNzIE1jRHJvcGRvd25Db250ZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgZHJvcGRvd24gY29udGVudCBoYXMgYmVlbiBhdHRhY2hlZC4gKi9cbiAgICBhdHRhY2hlZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgcHJpdmF0ZSBwb3J0YWw6IFRlbXBsYXRlUG9ydGFsO1xuICAgIHByaXZhdGUgb3V0bGV0OiBEb21Qb3J0YWxPdXRsZXQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PixcbiAgICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxuICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnlcbiAgICApIHt9XG5cbiAgICAvKipcbiAgICAgKiBBdHRhY2hlcyB0aGUgY29udGVudCB3aXRoIGEgcGFydGljdWxhciBjb250ZXh0LlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBhdHRhY2goY29udGV4dDogYW55ID0ge30pIHtcbiAgICAgICAgaWYgKCF0aGlzLnBvcnRhbCkge1xuICAgICAgICAgICAgdGhpcy5wb3J0YWwgPSBuZXcgVGVtcGxhdGVQb3J0YWwodGhpcy50ZW1wbGF0ZSwgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGV0YWNoKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLm91dGxldCkge1xuICAgICAgICAgICAgdGhpcy5vdXRsZXQgPSBuZXcgRG9tUG9ydGFsT3V0bGV0KFxuICAgICAgICAgICAgICAgIHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBSZWYsXG4gICAgICAgICAgICAgICAgdGhpcy5pbmplY3RvclxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy50ZW1wbGF0ZS5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgLy8gQmVjYXVzZSB3ZSBzdXBwb3J0IG9wZW5pbmcgdGhlIHNhbWUgZHJvcGRvd24gZnJvbSBkaWZmZXJlbnQgdHJpZ2dlcnMgKHdoaWNoIGluIHR1cm4gaGF2ZSB0aGVpclxuICAgICAgICAvLyBvd24gYE92ZXJsYXlSZWZgIHBhbmVsKSwgd2UgaGF2ZSB0byByZS1pbnNlcnQgdGhlIGhvc3QgZWxlbWVudCBldmVyeSB0aW1lLCBvdGhlcndpc2Ugd2VcbiAgICAgICAgLy8gcmlzayBpdCBzdGF5aW5nIGF0dGFjaGVkIHRvIGEgcGFuZSB0aGF0J3Mgbm8gbG9uZ2VyIGluIHRoZSBET00uXG4gICAgICAgIGVsZW1lbnQucGFyZW50Tm9kZSEuaW5zZXJ0QmVmb3JlKHRoaXMub3V0bGV0Lm91dGxldEVsZW1lbnQsIGVsZW1lbnQpO1xuICAgICAgICB0aGlzLnBvcnRhbC5hdHRhY2godGhpcy5vdXRsZXQsIGNvbnRleHQpO1xuICAgICAgICB0aGlzLmF0dGFjaGVkLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRhY2hlcyB0aGUgY29udGVudC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgZGV0YWNoKCkge1xuICAgICAgICBpZiAodGhpcy5wb3J0YWw/LmlzQXR0YWNoZWQpIHtcbiAgICAgICAgICAgIHRoaXMucG9ydGFsLmRldGFjaCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMub3V0bGV0Py5kaXNwb3NlKCk7XG4gICAgfVxufVxuIl19