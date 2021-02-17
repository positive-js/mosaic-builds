/**
 * @fileoverview added by tsickle
 * Generated from: vertical-navbar-item.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, Directive, ElementRef, Optional, Self } from '@angular/core';
import { mixinDisabled, mixinTabIndex } from '@ptsecurity/mosaic/core';
import { McDropdownTrigger } from '@ptsecurity/mosaic/dropdown';
export class McVerticalNavbarItemIcon {
}
McVerticalNavbarItemIcon.decorators = [
    { type: Directive, args: [{
                selector: 'mc-vertical-navbar-item-icon',
                host: {
                    class: 'mc-vertical-navbar__item-icon'
                }
            },] }
];
export class McVerticalNavbarItemBadge {
}
McVerticalNavbarItemBadge.decorators = [
    { type: Component, args: [{
                selector: 'mc-vertical-navbar-badge',
                template: `
        <span class="mc-badge mc-badge_light">
            <ng-content></ng-content>
        </span>
    `,
                host: {
                    class: 'mc-vertical-navbar__badge'
                }
            }] }
];
class McVerticalNavbarItemBase {
    // tslint:disable-next-line:naming-convention
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
if (false) {
    /** @type {?} */
    McVerticalNavbarItemBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export const McVerticalNavbarMixinBase = mixinTabIndex(mixinDisabled(McVerticalNavbarItemBase));
export class McVerticalNavbarItem extends McVerticalNavbarMixinBase {
    /**
     * @param {?} element
     * @param {?} focusMonitor
     * @param {?} trigger
     */
    constructor(element, focusMonitor, trigger) {
        super(element);
        this.element = element;
        this.focusMonitor = focusMonitor;
        this.trigger = trigger;
        this.focusMonitor.monitor(this.element.nativeElement).subscribe();
    }
    /**
     * @return {?}
     */
    get hasDropdownAttached() {
        return !!this.trigger;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.element.nativeElement);
    }
}
McVerticalNavbarItem.decorators = [
    { type: Component, args: [{
                selector: 'a[mc-vertical-navbar-item], mc-vertical-navbar-item',
                template: "<div class=\"mc-vertical-navbar__item\">\n    <ng-content></ng-content>\n    <i *ngIf=\"hasDropdownAttached\" mc-icon=\"mc-angle-right-M_16\" class=\"mc-vertical-navbar__item-dropdown-icon\"></i>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                inputs: ['disabled', 'tabIndex'],
                host: {
                    class: 'mc-vertical-navbar-item',
                    '[attr.disabled]': 'disabled || null',
                    '[attr.tabindex]': 'tabIndex'
                },
                styles: [".mc-vertical-navbar__badge{left:0;position:absolute;top:0;width:var(--mc-navbar-badge-size-width,64px)}.mc-vertical-navbar__badge .mc-badge{position:absolute;right:4px;top:4px}.mc-vertical-navbar__item-icon{margin-right:var(--mc-vertical-navbar-item-size-icon-margin-right,16px)}.mc-vertical-navbar__item-icon .mc-icon{font-size:var(--mc-vertical-navbar-item-font-icon-size,32px)}.mc-vertical-navbar__title{white-space:nowrap}.mc-vertical-navbar__item-dropdown-icon{margin-left:auto;padding-left:var(--mc-vertical-navbar-item-size-padding-horizontal,16px)}a[mc-vertical-navbar-item],mc-vertical-navbar-item{align-items:center;box-sizing:border-box;cursor:pointer;display:flex;height:var(--mc-vertical-navbar-item-size-height,64px);margin:var(--mc-vertical-navbar-item-size-margin,1px 0);position:relative;text-decoration:none;width:100%}a[mc-vertical-navbar-item] .mc-vertical-navbar__item,mc-vertical-navbar-item .mc-vertical-navbar__item{align-items:center;display:flex;height:100%;padding-left:var(--mc-vertical-navbar-item-size-padding-horizontal,16px);padding-right:var(--mc-vertical-navbar-item-size-padding-horizontal,16px);width:100%}a[mc-vertical-navbar-item].mc-progress,mc-vertical-navbar-item.mc-progress{cursor:pointer}a[mc-vertical-navbar-item].mc-vertical-navbar__item_active,mc-vertical-navbar-item.mc-vertical-navbar__item_active{cursor:default}a[mc-vertical-navbar-item][disabled],mc-vertical-navbar-item[disabled]{cursor:default;pointer-events:none}"]
            }] }
];
/** @nocollapse */
McVerticalNavbarItem.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor },
    { type: McDropdownTrigger, decorators: [{ type: Optional }, { type: Self }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    McVerticalNavbarItem.prototype.element;
    /**
     * @type {?}
     * @private
     */
    McVerticalNavbarItem.prototype.focusMonitor;
    /**
     * @type {?}
     * @private
     */
    McVerticalNavbarItem.prototype.trigger;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2YmFyLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvdmVydGljYWwtbmF2YmFyLyIsInNvdXJjZXMiOlsidmVydGljYWwtbmF2YmFyLWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUVWLFFBQVEsRUFDUixJQUFJLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFjLGFBQWEsRUFBa0IsYUFBYSxFQUFtQixNQUFNLHlCQUF5QixDQUFDO0FBQ3BILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBU2hFLE1BQU0sT0FBTyx3QkFBd0I7OztZQU5wQyxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDhCQUE4QjtnQkFDeEMsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSwrQkFBK0I7aUJBQ3pDO2FBQ0o7O0FBZUQsTUFBTSxPQUFPLHlCQUF5Qjs7O1lBWHJDLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyxRQUFRLEVBQUU7Ozs7S0FJVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLDJCQUEyQjtpQkFDckM7YUFDSjs7QUFJRCxNQUFNLHdCQUF3Qjs7Ozs7SUFFMUIsWUFBbUIsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDO0NBQ2pEOzs7SUFEZSwrQ0FBOEI7Ozs7QUFJOUMsTUFBTSxPQUFPLHlCQUF5QixHQUNoQyxhQUFhLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFnQjVELE1BQU0sT0FBTyxvQkFBcUIsU0FBUSx5QkFBeUI7Ozs7OztJQUsvRCxZQUNZLE9BQW1CLEVBQ25CLFlBQTBCLEVBQ04sT0FBMEI7UUFFdEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBSlAsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUNOLFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBSXRELElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDdEUsQ0FBQzs7OztJQVpELElBQUksbUJBQW1CO1FBQ25CLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDMUIsQ0FBQzs7OztJQVlELFdBQVc7UUFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7OztZQTlCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFEQUFxRDtnQkFDL0QseU5BQW9EO2dCQUNwRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBRS9DLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7Z0JBQ2hDLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUseUJBQXlCO29CQUNoQyxpQkFBaUIsRUFBRSxrQkFBa0I7b0JBQ3JDLGlCQUFpQixFQUFFLFVBQVU7aUJBQ2hDOzthQUNKOzs7O1lBdERHLFVBQVU7WUFOTCxZQUFZO1lBWVosaUJBQWlCLHVCQXlEakIsUUFBUSxZQUFJLElBQUk7Ozs7Ozs7SUFGakIsdUNBQTJCOzs7OztJQUMzQiw0Q0FBa0M7Ozs7O0lBQ2xDLHVDQUFzRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIE9uRGVzdHJveSxcbiAgICBPcHRpb25hbCxcbiAgICBTZWxmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZSwgbWl4aW5EaXNhYmxlZCwgQ2FuRGlzYWJsZUN0b3IsIG1peGluVGFiSW5kZXgsIEhhc1RhYkluZGV4Q3RvciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IE1jRHJvcGRvd25UcmlnZ2VyIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2Ryb3Bkb3duJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLXZlcnRpY2FsLW5hdmJhci1pdGVtLWljb24nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy12ZXJ0aWNhbC1uYXZiYXJfX2l0ZW0taWNvbidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVmVydGljYWxOYXZiYXJJdGVtSWNvbiB7fVxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdmVydGljYWwtbmF2YmFyLWJhZGdlJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c3BhbiBjbGFzcz1cIm1jLWJhZGdlIG1jLWJhZGdlX2xpZ2h0XCI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvc3Bhbj5cbiAgICBgLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy12ZXJ0aWNhbC1uYXZiYXJfX2JhZGdlJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNWZXJ0aWNhbE5hdmJhckl0ZW1CYWRnZSB7fVxuXG5cbmNsYXNzIE1jVmVydGljYWxOYXZiYXJJdGVtQmFzZSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1ZlcnRpY2FsTmF2YmFyTWl4aW5CYXNlOiBIYXNUYWJJbmRleEN0b3IgJiBDYW5EaXNhYmxlQ3RvciAmIHR5cGVvZiBNY1ZlcnRpY2FsTmF2YmFySXRlbUJhc2VcbiAgICA9IG1peGluVGFiSW5kZXgobWl4aW5EaXNhYmxlZChNY1ZlcnRpY2FsTmF2YmFySXRlbUJhc2UpKTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FbbWMtdmVydGljYWwtbmF2YmFyLWl0ZW1dLCBtYy12ZXJ0aWNhbC1uYXZiYXItaXRlbScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3ZlcnRpY2FsLW5hdmJhci1pdGVtLmNvbXBvbmVudC5odG1sJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHN0eWxlVXJsczogWycuL3ZlcnRpY2FsLW5hdmJhci1pdGVtLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgaW5wdXRzOiBbJ2Rpc2FibGVkJywgJ3RhYkluZGV4J10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXZlcnRpY2FsLW5hdmJhci1pdGVtJyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVmVydGljYWxOYXZiYXJJdGVtIGV4dGVuZHMgTWNWZXJ0aWNhbE5hdmJhck1peGluQmFzZSBpbXBsZW1lbnRzIENhbkRpc2FibGUsIE9uRGVzdHJveSB7XG4gICAgZ2V0IGhhc0Ryb3Bkb3duQXR0YWNoZWQoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMudHJpZ2dlcjtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHByaXZhdGUgdHJpZ2dlcjogTWNEcm9wZG93blRyaWdnZXJcbiAgICApIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3IubW9uaXRvcih0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCkuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG59XG4iXX0=