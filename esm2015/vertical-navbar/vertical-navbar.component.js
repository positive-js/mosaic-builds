/**
 * @fileoverview added by tsickle
 * Generated from: vertical-navbar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                styles: [".mc-vertical-navbar{height:100%;position:fixed;left:0;top:0;z-index:100;display:flex;flex-direction:column;align-items:flex-start;min-height:100%;overflow:hidden}.mc-vertical-navbar .mc-vertical-navbar__header-area{display:flex;width:100%;align-items:stretch;box-sizing:border-box;min-height:64px}.mc-vertical-navbar .mc-vertical-navbar__header-area .mc-vertical-navbar__header{display:flex;height:100%;justify-content:stretch;text-decoration:none;align-self:stretch;align-items:center}.mc-vertical-navbar .mc-vertical-navbar__header-area .mc-vertical-navbar__toggle-button{cursor:pointer;display:flex;flex:0 0 auto;justify-content:center;align-items:center;align-self:stretch;width:64px}.mc-vertical-navbar .mc-vertical-navbar__header-area .mc-vertical-navbar__title{padding:0 16px}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy92ZXJ0aWNhbC1uYXZiYXIvIiwic291cmNlcyI6WyJ2ZXJ0aWNhbC1uYXZiYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNqQixLQUFLLEVBQ0wsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBUzVFLE1BQU0sT0FBTyxzQkFBc0I7OztZQU5sQyxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHlEQUF5RDtnQkFDbkUsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSw0QkFBNEI7aUJBQ3RDO2FBQ0o7O0FBU0QsTUFBTSxPQUFPLHFCQUFxQjs7O1lBTmpDLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyxJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLDJCQUEyQjtpQkFDckM7YUFDSjs7QUFhRCxNQUFNLE9BQU8sZ0JBQWdCOzs7O0lBSXpCLFlBQ1ksRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFIeEIsYUFBUSxHQUFZLEtBQUssQ0FBQztJQUloQyxDQUFDOzs7O0lBRUosTUFBTTtRQUNGLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQy9CLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7O1lBckJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsK3RCQUErQztnQkFFL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFVBQVUsRUFBRTtvQkFDUiw2QkFBNkIsRUFBRTtpQkFDbEM7O2FBQ0o7Ozs7WUEvQkcsaUJBQWlCOzs7dUJBa0NoQixLQUFLOzs7O0lBQU4sb0NBQW1DOzs7OztJQUcvQiw4QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgSW5wdXQsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IHRvZ2dsZVZlcnRpY2FsTmF2YmFyQW5pbWF0aW9uIH0gZnJvbSAnLi92ZXJ0aWNhbC1uYXZiYXIuYW5pbWF0aW9uJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLXZlcnRpY2FsLW5hdmJhci1oZWFkZXIsIGFbbWMtdmVydGljYWwtbmF2YmFyLWhlYWRlcl0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy12ZXJ0aWNhbC1uYXZiYXJfX2hlYWRlcidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVmVydGljYWxOYXZiYXJIZWFkZXIge31cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy12ZXJ0aWNhbC1uYXZiYXItdGl0bGUnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy12ZXJ0aWNhbC1uYXZiYXJfX3RpdGxlJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNWZXJ0aWNhbE5hdmJhclRpdGxlIHt9XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdmVydGljYWwtbmF2YmFyJyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdmVydGljYWwtbmF2YmFyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi92ZXJ0aWNhbC1uYXZiYXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdG9nZ2xlVmVydGljYWxOYXZiYXJBbmltYXRpb24oKVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNWZXJ0aWNhbE5hdmJhciB7XG5cbiAgICBASW5wdXQoKSBleHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7fVxuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLmV4cGFuZGVkID0gIXRoaXMuZXhwYW5kZWQ7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxufVxuIl19