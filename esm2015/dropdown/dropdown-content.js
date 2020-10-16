/**
 * @fileoverview added by tsickle
 * Generated from: dropdown-content.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL2Ryb3Bkb3duLyIsInNvdXJjZXMiOlsiZHJvcGRvd24tY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDSCxTQUFTLEVBQ1QsV0FBVyxFQUNYLHdCQUF3QixFQUN4QixjQUFjLEVBQ2QsUUFBUSxFQUNSLGdCQUFnQixFQUNoQixNQUFNLEVBRVQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7OztBQVMvQixNQUFNLE9BQU8saUJBQWlCOzs7Ozs7Ozs7SUFPMUIsWUFDWSxTQUEyQixFQUMzQix5QkFBbUQsRUFDbkQsT0FBdUIsRUFDdkIsU0FBbUIsRUFDbkIsaUJBQW1DLEVBQ2pCLFNBQWM7UUFMaEMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFDM0IsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEwQjtRQUNuRCxZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUN2QixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDakIsY0FBUyxHQUFULFNBQVMsQ0FBSzs7OztRQVY1QyxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQVc1QixDQUFDOzs7Ozs7O0lBTUosTUFBTSxDQUFDLFVBQWUsRUFBRTtRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUM1RTtRQUVELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVkLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQ25DLElBQUksQ0FBQyx5QkFBeUIsRUFDOUIsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsU0FBUyxDQUNqQixDQUFDO1NBQ0w7O2NBRUssT0FBTyxHQUFnQixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxhQUFhO1FBRXBFLGlHQUFpRztRQUNqRywwRkFBMEY7UUFDMUYsa0VBQWtFO1FBQ2xFLG1CQUFBLE9BQU8sQ0FBQyxVQUFVLEVBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7Ozs7OztJQU1ELE1BQU07UUFDRixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDekI7SUFDTCxDQUFDOzs7WUEvREosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQ0FBZ0M7YUFDN0M7Ozs7WUFoQkcsV0FBVztZQUNYLHdCQUF3QjtZQUN4QixjQUFjO1lBQ2QsUUFBUTtZQUNSLGdCQUFnQjs0Q0EwQlgsTUFBTSxTQUFDLFFBQVE7Ozs7Ozs7SUFWcEIscUNBQStCOzs7OztJQUMvQixtQ0FBK0I7Ozs7O0lBQy9CLG1DQUFnQzs7Ozs7SUFHNUIsc0NBQW1DOzs7OztJQUNuQyxzREFBMkQ7Ozs7O0lBQzNELG9DQUErQjs7Ozs7SUFDL0Isc0NBQTJCOzs7OztJQUMzQiw4Q0FBMkM7Ozs7O0lBQzNDLHNDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRlbXBsYXRlUG9ydGFsLCBEb21Qb3J0YWxPdXRsZXQgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgRGlyZWN0aXZlLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBBcHBsaWNhdGlvblJlZixcbiAgICBJbmplY3RvcixcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIEluamVjdCxcbiAgICBPbkRlc3Ryb3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cblxuLyoqXG4gKiBEcm9wZG93biBjb250ZW50IHRoYXQgd2lsbCBiZSByZW5kZXJlZCBsYXppbHkgb25jZSB0aGUgZHJvcGRvd24gaXMgb3BlbmVkLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW21jRHJvcGRvd25Db250ZW50XSdcbn0pXG5leHBvcnQgY2xhc3MgTWNEcm9wZG93bkNvbnRlbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIGRyb3Bkb3duIGNvbnRlbnQgaGFzIGJlZW4gYXR0YWNoZWQuICovXG4gICAgYXR0YWNoZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAgIHByaXZhdGUgcG9ydGFsOiBUZW1wbGF0ZVBvcnRhbDtcbiAgICBwcml2YXRlIG91dGxldDogRG9tUG9ydGFsT3V0bGV0O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX3RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgICAgICBwcml2YXRlIF9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgcHJpdmF0ZSBfYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICAgICAgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55XG4gICAgKSB7fVxuXG4gICAgLyoqXG4gICAgICogQXR0YWNoZXMgdGhlIGNvbnRlbnQgd2l0aCBhIHBhcnRpY3VsYXIgY29udGV4dC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgYXR0YWNoKGNvbnRleHQ6IGFueSA9IHt9KSB7XG4gICAgICAgIGlmICghdGhpcy5wb3J0YWwpIHtcbiAgICAgICAgICAgIHRoaXMucG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMuX3RlbXBsYXRlLCB0aGlzLl92aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGV0YWNoKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLm91dGxldCkge1xuICAgICAgICAgICAgdGhpcy5vdXRsZXQgPSBuZXcgRG9tUG9ydGFsT3V0bGV0KFxuICAgICAgICAgICAgICAgIHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgICB0aGlzLl9hcHBSZWYsXG4gICAgICAgICAgICAgICAgdGhpcy5faW5qZWN0b3JcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuX3RlbXBsYXRlLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgICAvLyBCZWNhdXNlIHdlIHN1cHBvcnQgb3BlbmluZyB0aGUgc2FtZSBkcm9wZG93biBmcm9tIGRpZmZlcmVudCB0cmlnZ2VycyAod2hpY2ggaW4gdHVybiBoYXZlIHRoZWlyXG4gICAgICAgIC8vIG93biBgT3ZlcmxheVJlZmAgcGFuZWwpLCB3ZSBoYXZlIHRvIHJlLWluc2VydCB0aGUgaG9zdCBlbGVtZW50IGV2ZXJ5IHRpbWUsIG90aGVyd2lzZSB3ZVxuICAgICAgICAvLyByaXNrIGl0IHN0YXlpbmcgYXR0YWNoZWQgdG8gYSBwYW5lIHRoYXQncyBubyBsb25nZXIgaW4gdGhlIERPTS5cbiAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlIS5pbnNlcnRCZWZvcmUodGhpcy5vdXRsZXQub3V0bGV0RWxlbWVudCwgZWxlbWVudCk7XG4gICAgICAgIHRoaXMucG9ydGFsLmF0dGFjaCh0aGlzLm91dGxldCwgY29udGV4dCk7XG4gICAgICAgIHRoaXMuYXR0YWNoZWQubmV4dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGFjaGVzIHRoZSBjb250ZW50LlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBkZXRhY2goKSB7XG4gICAgICAgIGlmICh0aGlzLnBvcnRhbC5pc0F0dGFjaGVkKSB7XG4gICAgICAgICAgICB0aGlzLnBvcnRhbC5kZXRhY2goKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5vdXRsZXQpIHtcbiAgICAgICAgICAgIHRoaXMub3V0bGV0LmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==