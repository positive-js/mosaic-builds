/**
 * @fileoverview added by tsickle
 * Generated from: vertical-navbar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Directive, ViewEncapsulation, Input, ChangeDetectorRef } from '@angular/core';
import { toggleVerticalNavbarAnimation } from './vertical-navbar.animation';
var McVerticalNavbarHeader = /** @class */ (function () {
    function McVerticalNavbarHeader() {
    }
    McVerticalNavbarHeader.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-vertical-navbar-header, a[mc-vertical-navbar-header]',
                    host: {
                        class: 'mc-vertical-navbar__header'
                    }
                },] }
    ];
    return McVerticalNavbarHeader;
}());
export { McVerticalNavbarHeader };
var McVerticalNavbarTitle = /** @class */ (function () {
    function McVerticalNavbarTitle() {
    }
    McVerticalNavbarTitle.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-vertical-navbar-title',
                    host: {
                        class: 'mc-vertical-navbar__title'
                    }
                },] }
    ];
    return McVerticalNavbarTitle;
}());
export { McVerticalNavbarTitle };
var McVerticalNavbar = /** @class */ (function () {
    function McVerticalNavbar(cd) {
        this.cd = cd;
        this.expanded = false;
    }
    /**
     * @return {?}
     */
    McVerticalNavbar.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.expanded = !this.expanded;
        this.cd.markForCheck();
    };
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
    McVerticalNavbar.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    McVerticalNavbar.propDecorators = {
        expanded: [{ type: Input }]
    };
    return McVerticalNavbar;
}());
export { McVerticalNavbar };
if (false) {
    /** @type {?} */
    McVerticalNavbar.prototype.expanded;
    /**
     * @type {?}
     * @private
     */
    McVerticalNavbar.prototype.cd;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy92ZXJ0aWNhbC1uYXZiYXIvIiwic291cmNlcyI6WyJ2ZXJ0aWNhbC1uYXZiYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNqQixLQUFLLEVBQ0wsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRzVFO0lBQUE7SUFNcUMsQ0FBQzs7Z0JBTnJDLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUseURBQXlEO29CQUNuRSxJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLDRCQUE0QjtxQkFDdEM7aUJBQ0o7O0lBQ29DLDZCQUFDO0NBQUEsQUFOdEMsSUFNc0M7U0FBekIsc0JBQXNCO0FBRW5DO0lBQUE7SUFNb0MsQ0FBQzs7Z0JBTnBDLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLDJCQUEyQjtxQkFDckM7aUJBQ0o7O0lBQ21DLDRCQUFDO0NBQUEsQUFOckMsSUFNcUM7U0FBeEIscUJBQXFCO0FBRWxDO0lBYUksMEJBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBRmhDLGFBQVEsR0FBWSxLQUFLLENBQUM7SUFFUyxDQUFDOzs7O0lBRTdDLGlDQUFNOzs7SUFBTjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQy9CLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7Z0JBbEJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsK3RCQUErQztvQkFFL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFVBQVUsRUFBRTt3QkFDUiw2QkFBNkIsRUFBRTtxQkFDbEM7O2lCQUNKOzs7O2dCQS9CRyxpQkFBaUI7OzsyQkFpQ2hCLEtBQUs7O0lBUVYsdUJBQUM7Q0FBQSxBQW5CRCxJQW1CQztTQVRZLGdCQUFnQjs7O0lBQ3pCLG9DQUFtQzs7Ozs7SUFFdkIsOEJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgRGlyZWN0aXZlLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIElucHV0LFxuICAgIENoYW5nZURldGVjdG9yUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyB0b2dnbGVWZXJ0aWNhbE5hdmJhckFuaW1hdGlvbiB9IGZyb20gJy4vdmVydGljYWwtbmF2YmFyLmFuaW1hdGlvbic7XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy12ZXJ0aWNhbC1uYXZiYXItaGVhZGVyLCBhW21jLXZlcnRpY2FsLW5hdmJhci1oZWFkZXJdJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdmVydGljYWwtbmF2YmFyX19oZWFkZXInXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1ZlcnRpY2FsTmF2YmFySGVhZGVyIHt9XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtdmVydGljYWwtbmF2YmFyLXRpdGxlJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdmVydGljYWwtbmF2YmFyX190aXRsZSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVmVydGljYWxOYXZiYXJUaXRsZSB7fVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXZlcnRpY2FsLW5hdmJhcicsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3ZlcnRpY2FsLW5hdmJhci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdmVydGljYWwtbmF2YmFyLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRvZ2dsZVZlcnRpY2FsTmF2YmFyQW5pbWF0aW9uKClcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jVmVydGljYWxOYXZiYXIge1xuICAgIEBJbnB1dCgpIGV4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbn1cbiJdfQ==