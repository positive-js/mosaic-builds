/**
 * @fileoverview added by tsickle
 * Generated from: vertical-navbar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Directive, ViewEncapsulation, Input, ChangeDetectorRef } from '@angular/core';
import { toggleVerticalNavbarAnimation } from './vertical-navbar.animation';
export class McVerticalNavbarHeader {
}
McVerticalNavbarHeader.decorators = [
    { type: Directive, args: [{
                selector: 'mc-vertical-navbar-header, a[mc-vertical-navbar-header]',
                host: {
                    class: 'mc-vertical-navbar__header'
                }
            },] }
];
export class McVerticalNavbarTitle {
}
McVerticalNavbarTitle.decorators = [
    { type: Directive, args: [{
                selector: 'mc-vertical-navbar-title',
                host: {
                    class: 'mc-vertical-navbar__title'
                }
            },] }
];
export class McVerticalNavbar {
    /**
     * @param {?} cd
     */
    constructor(cd) {
        this.cd = cd;
        this.expanded = false;
    }
    /**
     * @return {?}
     */
    toggle() {
        this.expanded = !this.expanded;
        this.cd.markForCheck();
    }
}
McVerticalNavbar.decorators = [
    { type: Component, args: [{
                selector: 'mc-vertical-navbar',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: "<nav class=\"mc-vertical-navbar\" [@toggle]=\"expanded\">\n    <div class=\"mc-vertical-navbar__header-area\">\n        <div cdkMonitorElementFocus tabindex=\"0\" class=\"mc-vertical-navbar__toggle-button\"\n             (click)=\"toggle()\"\n             (keydown.space)=\"toggle()\"\n             (keydown.enter)=\"toggle()\"\n        >\n            <i mc-icon=\"mc-hamburger_32\" *ngIf=\"!expanded\"></i>\n            <i mc-icon=\"mc-close-L_32\" *ngIf=\"expanded\"></i>\n        </div>\n        <div cdkMonitorSubtreeFocus *ngIf=\"expanded\">\n            <ng-content select=\"mc-vertical-navbar-header, a[mc-vertical-navbar-header]\"></ng-content>\n        </div>\n    </div>\n\n    <ng-content></ng-content>\n</nav>\n",
                encapsulation: ViewEncapsulation.None,
                animations: [
                    toggleVerticalNavbarAnimation()
                ],
                styles: [".mc-vertical-navbar{align-items:flex-start;display:flex;flex-direction:column;height:100%;left:0;min-height:100%;overflow:hidden;position:fixed;top:0;z-index:100}.mc-vertical-navbar .mc-vertical-navbar__header-area{align-items:stretch;box-sizing:border-box;display:flex;min-height:64px;width:100%}.mc-vertical-navbar .mc-vertical-navbar__header-area .mc-vertical-navbar__header{-ms-grid-row-align:stretch;align-items:center;align-self:stretch;display:flex;height:100%;justify-content:stretch;text-decoration:none}.mc-vertical-navbar .mc-vertical-navbar__header-area .mc-vertical-navbar__toggle-button{-ms-grid-row-align:stretch;align-items:center;align-self:stretch;cursor:pointer;display:flex;flex:0 0 auto;justify-content:center;width:64px}.mc-vertical-navbar .mc-vertical-navbar__header-area .mc-vertical-navbar__title{padding:0 16px}"]
            }] }
];
/** @nocollapse */
McVerticalNavbar.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
McVerticalNavbar.propDecorators = {
    expanded: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    McVerticalNavbar.prototype.expanded;
    /**
     * @type {?}
     * @private
     */
    McVerticalNavbar.prototype.cd;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL3ZlcnRpY2FsLW5hdmJhci8iLCJzb3VyY2VzIjpbInZlcnRpY2FsLW5hdmJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLEtBQUssRUFDTCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFTNUUsTUFBTSxPQUFPLHNCQUFzQjs7O1lBTmxDLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUseURBQXlEO2dCQUNuRSxJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLDRCQUE0QjtpQkFDdEM7YUFDSjs7QUFTRCxNQUFNLE9BQU8scUJBQXFCOzs7WUFOakMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsMkJBQTJCO2lCQUNyQzthQUNKOztBQWFELE1BQU0sT0FBTyxnQkFBZ0I7Ozs7SUFHekIsWUFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFGaEMsYUFBUSxHQUFZLEtBQUssQ0FBQztJQUVTLENBQUM7Ozs7SUFFN0MsTUFBTTtRQUNGLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQy9CLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7O1lBbEJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsK3RCQUErQztnQkFFL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFVBQVUsRUFBRTtvQkFDUiw2QkFBNkIsRUFBRTtpQkFDbEM7O2FBQ0o7Ozs7WUEvQkcsaUJBQWlCOzs7dUJBaUNoQixLQUFLOzs7O0lBQU4sb0NBQW1DOzs7OztJQUV2Qiw4QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgSW5wdXQsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IHRvZ2dsZVZlcnRpY2FsTmF2YmFyQW5pbWF0aW9uIH0gZnJvbSAnLi92ZXJ0aWNhbC1uYXZiYXIuYW5pbWF0aW9uJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLXZlcnRpY2FsLW5hdmJhci1oZWFkZXIsIGFbbWMtdmVydGljYWwtbmF2YmFyLWhlYWRlcl0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy12ZXJ0aWNhbC1uYXZiYXJfX2hlYWRlcidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVmVydGljYWxOYXZiYXJIZWFkZXIge31cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy12ZXJ0aWNhbC1uYXZiYXItdGl0bGUnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy12ZXJ0aWNhbC1uYXZiYXJfX3RpdGxlJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNWZXJ0aWNhbE5hdmJhclRpdGxlIHt9XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdmVydGljYWwtbmF2YmFyJyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdmVydGljYWwtbmF2YmFyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi92ZXJ0aWNhbC1uYXZiYXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdG9nZ2xlVmVydGljYWxOYXZiYXJBbmltYXRpb24oKVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNWZXJ0aWNhbE5hdmJhciB7XG4gICAgQElucHV0KCkgZXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLmV4cGFuZGVkID0gIXRoaXMuZXhwYW5kZWQ7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxufVxuIl19