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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy92ZXJ0aWNhbC1uYXZiYXIvIiwic291cmNlcyI6WyJ2ZXJ0aWNhbC1uYXZiYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNqQixLQUFLLEVBQ0wsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBUzVFLE1BQU0sT0FBTyxzQkFBc0I7OztZQU5sQyxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHlEQUF5RDtnQkFDbkUsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSw0QkFBNEI7aUJBQ3RDO2FBQ0o7O0FBU0QsTUFBTSxPQUFPLHFCQUFxQjs7O1lBTmpDLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyxJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLDJCQUEyQjtpQkFDckM7YUFDSjs7QUFhRCxNQUFNLE9BQU8sZ0JBQWdCOzs7O0lBR3pCLFlBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBRmhDLGFBQVEsR0FBWSxLQUFLLENBQUM7SUFFUyxDQUFDOzs7O0lBRTdDLE1BQU07UUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMvQixJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQWxCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLCt0QkFBK0M7Z0JBRS9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxVQUFVLEVBQUU7b0JBQ1IsNkJBQTZCLEVBQUU7aUJBQ2xDOzthQUNKOzs7O1lBL0JHLGlCQUFpQjs7O3VCQWlDaEIsS0FBSzs7OztJQUFOLG9DQUFtQzs7Ozs7SUFFdkIsOEJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgRGlyZWN0aXZlLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIElucHV0LFxuICAgIENoYW5nZURldGVjdG9yUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyB0b2dnbGVWZXJ0aWNhbE5hdmJhckFuaW1hdGlvbiB9IGZyb20gJy4vdmVydGljYWwtbmF2YmFyLmFuaW1hdGlvbic7XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy12ZXJ0aWNhbC1uYXZiYXItaGVhZGVyLCBhW21jLXZlcnRpY2FsLW5hdmJhci1oZWFkZXJdJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdmVydGljYWwtbmF2YmFyX19oZWFkZXInXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1ZlcnRpY2FsTmF2YmFySGVhZGVyIHt9XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtdmVydGljYWwtbmF2YmFyLXRpdGxlJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdmVydGljYWwtbmF2YmFyX190aXRsZSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVmVydGljYWxOYXZiYXJUaXRsZSB7fVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXZlcnRpY2FsLW5hdmJhcicsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3ZlcnRpY2FsLW5hdmJhci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdmVydGljYWwtbmF2YmFyLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRvZ2dsZVZlcnRpY2FsTmF2YmFyQW5pbWF0aW9uKClcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jVmVydGljYWxOYXZiYXIge1xuICAgIEBJbnB1dCgpIGV4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbn1cbiJdfQ==