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
            },] }
];
class McVerticalNavbarItemBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
export const McVerticalNavbarMixinBase = mixinTabIndex(mixinDisabled(McVerticalNavbarItemBase));
export class McVerticalNavbarItem extends McVerticalNavbarMixinBase {
    constructor(element, focusMonitor, trigger) {
        super(element);
        this.element = element;
        this.focusMonitor = focusMonitor;
        this.trigger = trigger;
        this.focusMonitor.monitor(this.element.nativeElement).subscribe();
    }
    get hasDropdownAttached() {
        return !!this.trigger;
    }
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
                styles: [".mc-vertical-navbar__badge{position:absolute;width:var(--mc-navbar-badge-size-width,64px);top:0;left:0}.mc-vertical-navbar__badge .mc-badge{position:absolute;right:4px;top:4px}.mc-vertical-navbar__item-icon{margin-right:var(--mc-vertical-navbar-item-size-icon-margin-right,16px)}.mc-vertical-navbar__item-icon .mc-icon{font-size:var(--mc-vertical-navbar-item-font-icon-size,32px)}.mc-vertical-navbar__title{white-space:nowrap}.mc-vertical-navbar__item-dropdown-icon{margin-left:auto;padding-left:var(--mc-vertical-navbar-item-size-padding-horizontal,16px)}a[mc-vertical-navbar-item],mc-vertical-navbar-item{display:flex;align-items:center;box-sizing:border-box;position:relative;margin:var(--mc-vertical-navbar-item-size-margin,1px 0);width:100%;height:var(--mc-vertical-navbar-item-size-height,64px);cursor:pointer;text-decoration:none}a[mc-vertical-navbar-item] .mc-vertical-navbar__item,mc-vertical-navbar-item .mc-vertical-navbar__item{display:flex;align-items:center;width:100%;height:100%;padding-left:var(--mc-vertical-navbar-item-size-padding-horizontal,16px);padding-right:var(--mc-vertical-navbar-item-size-padding-horizontal,16px)}a[mc-vertical-navbar-item].mc-progress,mc-vertical-navbar-item.mc-progress{cursor:pointer}a[mc-vertical-navbar-item].mc-vertical-navbar__item_active,mc-vertical-navbar-item.mc-vertical-navbar__item_active{cursor:default}a[mc-vertical-navbar-item][disabled],mc-vertical-navbar-item[disabled]{cursor:default;pointer-events:none}"]
            },] }
];
/** @nocollapse */
McVerticalNavbarItem.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor },
    { type: McDropdownTrigger, decorators: [{ type: Optional }, { type: Self }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2YmFyLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3ZlcnRpY2FsLW5hdmJhci92ZXJ0aWNhbC1uYXZiYXItaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUVWLFFBQVEsRUFDUixJQUFJLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFjLGFBQWEsRUFBa0IsYUFBYSxFQUFtQixNQUFNLHlCQUF5QixDQUFDO0FBQ3BILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBU2hFLE1BQU0sT0FBTyx3QkFBd0I7OztZQU5wQyxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDhCQUE4QjtnQkFDeEMsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSwrQkFBK0I7aUJBQ3pDO2FBQ0o7O0FBZUQsTUFBTSxPQUFPLHlCQUF5Qjs7O1lBWHJDLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyxRQUFRLEVBQUU7Ozs7S0FJVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLDJCQUEyQjtpQkFDckM7YUFDSjs7QUFJRCxNQUFNLHdCQUF3QjtJQUMxQiw2Q0FBNkM7SUFDN0MsWUFBbUIsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDO0NBQ2pEO0FBRUQsNkNBQTZDO0FBQzdDLE1BQU0sQ0FBQyxNQUFNLHlCQUF5QixHQUNoQyxhQUFhLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztBQWdCN0QsTUFBTSxPQUFPLG9CQUFxQixTQUFRLHlCQUF5QjtJQUsvRCxZQUNZLE9BQW1CLEVBQ25CLFlBQTBCLEVBQ04sT0FBMEI7UUFFdEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBSlAsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUNOLFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBSXRELElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDdEUsQ0FBQztJQVpELElBQUksbUJBQW1CO1FBQ25CLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDMUIsQ0FBQztJQVlELFdBQVc7UUFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7OztZQTlCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFEQUFxRDtnQkFDL0QseU5BQW9EO2dCQUNwRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBRS9DLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7Z0JBQ2hDLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUseUJBQXlCO29CQUNoQyxpQkFBaUIsRUFBRSxrQkFBa0I7b0JBQ3JDLGlCQUFpQixFQUFFLFVBQVU7aUJBQ2hDOzthQUNKOzs7O1lBdERHLFVBQVU7WUFOTCxZQUFZO1lBWVosaUJBQWlCLHVCQXlEakIsUUFBUSxZQUFJLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3B0aW9uYWwsXG4gICAgU2VsZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkRpc2FibGUsIG1peGluRGlzYWJsZWQsIENhbkRpc2FibGVDdG9yLCBtaXhpblRhYkluZGV4LCBIYXNUYWJJbmRleEN0b3IgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0Ryb3Bkb3duVHJpZ2dlciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9kcm9wZG93bic7XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy12ZXJ0aWNhbC1uYXZiYXItaXRlbS1pY29uJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdmVydGljYWwtbmF2YmFyX19pdGVtLWljb24nXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1ZlcnRpY2FsTmF2YmFySXRlbUljb24ge31cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXZlcnRpY2FsLW5hdmJhci1iYWRnZScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJtYy1iYWRnZSBtYy1iYWRnZV9saWdodFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L3NwYW4+XG4gICAgYCxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdmVydGljYWwtbmF2YmFyX19iYWRnZSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVmVydGljYWxOYXZiYXJJdGVtQmFkZ2Uge31cblxuXG5jbGFzcyBNY1ZlcnRpY2FsTmF2YmFySXRlbUJhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNWZXJ0aWNhbE5hdmJhck1peGluQmFzZTogSGFzVGFiSW5kZXhDdG9yICYgQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgTWNWZXJ0aWNhbE5hdmJhckl0ZW1CYXNlXG4gICAgPSBtaXhpblRhYkluZGV4KG1peGluRGlzYWJsZWQoTWNWZXJ0aWNhbE5hdmJhckl0ZW1CYXNlKSk7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhW21jLXZlcnRpY2FsLW5hdmJhci1pdGVtXSwgbWMtdmVydGljYWwtbmF2YmFyLWl0ZW0nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi92ZXJ0aWNhbC1uYXZiYXItaXRlbS5jb21wb25lbnQuaHRtbCcsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBzdHlsZVVybHM6IFsnLi92ZXJ0aWNhbC1uYXZiYXItaXRlbS5jb21wb25lbnQuc2NzcyddLFxuICAgIGlucHV0czogWydkaXNhYmxlZCcsICd0YWJJbmRleCddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy12ZXJ0aWNhbC1uYXZiYXItaXRlbScsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXgnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1ZlcnRpY2FsTmF2YmFySXRlbSBleHRlbmRzIE1jVmVydGljYWxOYXZiYXJNaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5EaXNhYmxlLCBPbkRlc3Ryb3kge1xuICAgIGdldCBoYXNEcm9wZG93bkF0dGFjaGVkKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLnRyaWdnZXI7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBmb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcixcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwcml2YXRlIHRyaWdnZXI6IE1jRHJvcGRvd25UcmlnZ2VyXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpLnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgfVxufVxuIl19