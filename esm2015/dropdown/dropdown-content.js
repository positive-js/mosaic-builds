/**
 * @fileoverview added by tsickle
 * Generated from: dropdown-content.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { TemplatePortal, DomPortalOutlet } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { Directive, TemplateRef, ComponentFactoryResolver, ApplicationRef, Injector, ViewContainerRef, Inject } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * Dropdown content that will be rendered lazily once the dropdown is opened.
 */
export class McDropdownContent {
    /**
     * @param {?} _template
     * @param {?} _componentFactoryResolver
     * @param {?} _appRef
     * @param {?} _injector
     * @param {?} _viewContainerRef
     * @param {?} _document
     */
    constructor(_template, _componentFactoryResolver, _appRef, _injector, _viewContainerRef, _document) {
        this._template = _template;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._appRef = _appRef;
        this._injector = _injector;
        this._viewContainerRef = _viewContainerRef;
        this._document = _document;
        /**
         * Emits when the dropdown content has been attached.
         */
        this.attached = new Subject();
    }
    /**
     * Attaches the content with a particular context.
     * \@docs-private
     * @param {?=} context
     * @return {?}
     */
    attach(context = {}) {
        if (!this.portal) {
            this.portal = new TemplatePortal(this._template, this._viewContainerRef);
        }
        this.detach();
        if (!this.outlet) {
            this.outlet = new DomPortalOutlet(this._document.createElement('div'), this._componentFactoryResolver, this._appRef, this._injector);
        }
        /** @type {?} */
        const element = this._template.elementRef.nativeElement;
        // Because we support opening the same dropdown from different triggers (which in turn have their
        // own `OverlayRef` panel), we have to re-insert the host element every time, otherwise we
        // risk it staying attached to a pane that's no longer in the DOM.
        (/** @type {?} */ (element.parentNode)).insertBefore(this.outlet.outletElement, element);
        this.portal.attach(this.outlet, context);
        this.attached.next();
    }
    /**
     * Detaches the content.
     * \@docs-private
     * @return {?}
     */
    detach() {
        if (this.portal.isAttached) {
            this.portal.detach();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.outlet) {
            this.outlet.dispose();
        }
    }
}
McDropdownContent.decorators = [
    { type: Directive, args: [{
                selector: 'ng-template[mcDropdownContent]'
            },] }
];
/** @nocollapse */
McDropdownContent.ctorParameters = () => [
    { type: TemplateRef },
    { type: ComponentFactoryResolver },
    { type: ApplicationRef },
    { type: Injector },
    { type: ViewContainerRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
if (false) {
    /**
     * Emits when the dropdown content has been attached.
     * @type {?}
     */
    McDropdownContent.prototype.attached;
    /**
     * @type {?}
     * @private
     */
    McDropdownContent.prototype.portal;
    /**
     * @type {?}
     * @private
     */
    McDropdownContent.prototype.outlet;
    /**
     * @type {?}
     * @private
     */
    McDropdownContent.prototype._template;
    /**
     * @type {?}
     * @private
     */
    McDropdownContent.prototype._componentFactoryResolver;
    /**
     * @type {?}
     * @private
     */
    McDropdownContent.prototype._appRef;
    /**
     * @type {?}
     * @private
     */
    McDropdownContent.prototype._injector;
    /**
     * @type {?}
     * @private
     */
    McDropdownContent.prototype._viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    McDropdownContent.prototype._document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9kcm9wZG93bi8iLCJzb3VyY2VzIjpbImRyb3Bkb3duLWNvbnRlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQ0gsU0FBUyxFQUNULFdBQVcsRUFDWCx3QkFBd0IsRUFDeEIsY0FBYyxFQUNkLFFBQVEsRUFDUixnQkFBZ0IsRUFDaEIsTUFBTSxFQUVULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7QUFTL0IsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7Ozs7O0lBTzFCLFlBQ1ksU0FBMkIsRUFDM0IseUJBQW1ELEVBQ25ELE9BQXVCLEVBQ3ZCLFNBQW1CLEVBQ25CLGlCQUFtQyxFQUNqQixTQUFjO1FBTGhDLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzNCLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMEI7UUFDbkQsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUNuQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ2pCLGNBQVMsR0FBVCxTQUFTLENBQUs7Ozs7UUFWNUMsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7SUFXNUIsQ0FBQzs7Ozs7OztJQU1KLE1BQU0sQ0FBQyxVQUFlLEVBQUU7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDNUU7UUFFRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFZCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFlLENBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUNuQyxJQUFJLENBQUMseUJBQXlCLEVBQzlCLElBQUksQ0FBQyxPQUFPLEVBQ1osSUFBSSxDQUFDLFNBQVMsQ0FDakIsQ0FBQztTQUNMOztjQUVLLE9BQU8sR0FBZ0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsYUFBYTtRQUVwRSxpR0FBaUc7UUFDakcsMEZBQTBGO1FBQzFGLGtFQUFrRTtRQUNsRSxtQkFBQSxPQUFPLENBQUMsVUFBVSxFQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QixDQUFDOzs7Ozs7SUFNRCxNQUFNO1FBQ0YsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQzs7O1lBL0RKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0NBQWdDO2FBQzdDOzs7O1lBaEJHLFdBQVc7WUFDWCx3QkFBd0I7WUFDeEIsY0FBYztZQUNkLFFBQVE7WUFDUixnQkFBZ0I7NENBMEJYLE1BQU0sU0FBQyxRQUFROzs7Ozs7O0lBVnBCLHFDQUErQjs7Ozs7SUFDL0IsbUNBQStCOzs7OztJQUMvQixtQ0FBZ0M7Ozs7O0lBRzVCLHNDQUFtQzs7Ozs7SUFDbkMsc0RBQTJEOzs7OztJQUMzRCxvQ0FBK0I7Ozs7O0lBQy9CLHNDQUEyQjs7Ozs7SUFDM0IsOENBQTJDOzs7OztJQUMzQyxzQ0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCwgRG9tUG9ydGFsT3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIERpcmVjdGl2ZSxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgQXBwbGljYXRpb25SZWYsXG4gICAgSW5qZWN0b3IsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBJbmplY3QsXG4gICAgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5cbi8qKlxuICogRHJvcGRvd24gY29udGVudCB0aGF0IHdpbGwgYmUgcmVuZGVyZWQgbGF6aWx5IG9uY2UgdGhlIGRyb3Bkb3duIGlzIG9wZW5lZC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVttY0Ryb3Bkb3duQ29udGVudF0nXG59KVxuZXhwb3J0IGNsYXNzIE1jRHJvcGRvd25Db250ZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSBkcm9wZG93biBjb250ZW50IGhhcyBiZWVuIGF0dGFjaGVkLiAqL1xuICAgIGF0dGFjaGVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICBwcml2YXRlIHBvcnRhbDogVGVtcGxhdGVQb3J0YWw7XG4gICAgcHJpdmF0ZSBvdXRsZXQ6IERvbVBvcnRhbE91dGxldDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF90ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PixcbiAgICAgICAgcHJpdmF0ZSBfY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgIHByaXZhdGUgX2FwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgICAgIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueVxuICAgICkge31cblxuICAgIC8qKlxuICAgICAqIEF0dGFjaGVzIHRoZSBjb250ZW50IHdpdGggYSBwYXJ0aWN1bGFyIGNvbnRleHQuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGF0dGFjaChjb250ZXh0OiBhbnkgPSB7fSkge1xuICAgICAgICBpZiAoIXRoaXMucG9ydGFsKSB7XG4gICAgICAgICAgICB0aGlzLnBvcnRhbCA9IG5ldyBUZW1wbGF0ZVBvcnRhbCh0aGlzLl90ZW1wbGF0ZSwgdGhpcy5fdmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRldGFjaCgpO1xuXG4gICAgICAgIGlmICghdGhpcy5vdXRsZXQpIHtcbiAgICAgICAgICAgIHRoaXMub3V0bGV0ID0gbmV3IERvbVBvcnRhbE91dGxldChcbiAgICAgICAgICAgICAgICB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwUmVmLFxuICAgICAgICAgICAgICAgIHRoaXMuX2luamVjdG9yXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLl90ZW1wbGF0ZS5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgLy8gQmVjYXVzZSB3ZSBzdXBwb3J0IG9wZW5pbmcgdGhlIHNhbWUgZHJvcGRvd24gZnJvbSBkaWZmZXJlbnQgdHJpZ2dlcnMgKHdoaWNoIGluIHR1cm4gaGF2ZSB0aGVpclxuICAgICAgICAvLyBvd24gYE92ZXJsYXlSZWZgIHBhbmVsKSwgd2UgaGF2ZSB0byByZS1pbnNlcnQgdGhlIGhvc3QgZWxlbWVudCBldmVyeSB0aW1lLCBvdGhlcndpc2Ugd2VcbiAgICAgICAgLy8gcmlzayBpdCBzdGF5aW5nIGF0dGFjaGVkIHRvIGEgcGFuZSB0aGF0J3Mgbm8gbG9uZ2VyIGluIHRoZSBET00uXG4gICAgICAgIGVsZW1lbnQucGFyZW50Tm9kZSEuaW5zZXJ0QmVmb3JlKHRoaXMub3V0bGV0Lm91dGxldEVsZW1lbnQsIGVsZW1lbnQpO1xuICAgICAgICB0aGlzLnBvcnRhbC5hdHRhY2godGhpcy5vdXRsZXQsIGNvbnRleHQpO1xuICAgICAgICB0aGlzLmF0dGFjaGVkLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRhY2hlcyB0aGUgY29udGVudC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgZGV0YWNoKCkge1xuICAgICAgICBpZiAodGhpcy5wb3J0YWwuaXNBdHRhY2hlZCkge1xuICAgICAgICAgICAgdGhpcy5wb3J0YWwuZGV0YWNoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMub3V0bGV0KSB7XG4gICAgICAgICAgICB0aGlzLm91dGxldC5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=