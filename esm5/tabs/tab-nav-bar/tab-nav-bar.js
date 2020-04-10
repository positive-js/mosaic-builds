/**
 * @fileoverview added by tsickle
 * Generated from: tab-nav-bar/tab-nav-bar.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { Attribute, ChangeDetectionStrategy, Component, Directive, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { mixinColor, mixinDisabled, mixinTabIndex } from '@ptsecurity/mosaic/core';
// Boilerplate for applying mixins to McTabNav.
/**
 * \@docs-private
 */
var 
// Boilerplate for applying mixins to McTabNav.
/**
 * \@docs-private
 */
McTabNavBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McTabNavBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McTabNavBase;
}());
// Boilerplate for applying mixins to McTabNav.
/**
 * \@docs-private
 */
export { McTabNavBase };
if (false) {
    /** @type {?} */
    McTabNavBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export var McTabNavMixinBase = mixinColor(McTabNavBase);
/**
 * Navigation component matching the styles of the tab group header.
 */
var McTabNav = /** @class */ (function (_super) {
    __extends(McTabNav, _super);
    function McTabNav(elementRef) {
        return _super.call(this, elementRef) || this;
    }
    McTabNav.decorators = [
        { type: Component, args: [{
                    selector: '[mc-tab-nav-bar]',
                    exportAs: 'mcTabNavBar, mcTabNav',
                    inputs: ['color'],
                    template: "<div class=\"mc-tab-links\">\n    <ng-content></ng-content>\n</div>\n",
                    host: { class: 'mc-tab-nav-bar' },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-active:before,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link:hover:before,.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused:after{display:block;position:absolute;content:\"\"}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-active:before,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link:hover:before{bottom:-1px;left:0;height:4px;right:0}.mc-tab-link{vertical-align:top;text-decoration:none;-webkit-tap-highlight-color:transparent}.mc-tab-group_stretch-labels .mc-tab-link{flex-basis:0;flex-grow:1}.mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar{display:flex}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:40px;text-align:center;white-space:nowrap;cursor:pointer;padding-right:16px;padding-left:16px;outline:0;border-bottom-width:1px;border-bottom-style:solid;border-top-width:1px;border-top-style:solid;border-top-left-radius:3px;border-top-right-radius:3px}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused{z-index:1}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused:after{top:-2px;right:-1px;bottom:-1px;left:-1px;border-width:2px;border-style:solid;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom:none}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-active{padding-right:15px;padding-left:15px;border-width:1px;border-style:solid}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-active.cdk-keyboard-focused:after{z-index:1;right:-2px;left:-2px}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link .mc-tab-overlay{position:absolute;top:-1px;left:0;right:0;bottom:0;pointer-events:none;border-top-left-radius:3px;border-top-right-radius:3px;border-top:1px solid transparent}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:40px;text-align:center;white-space:nowrap;cursor:pointer;padding-right:16px;padding-left:16px;outline:0;border-bottom-width:1px;border-bottom-style:solid}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused{z-index:1}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after{right:-1px;bottom:-1px;left:-1px;border-width:2px;border-style:solid;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom:none;top:-1px}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link .mc-tab-overlay{left:0;right:0;bottom:0;pointer-events:none;position:absolute;top:0}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused+:hover:before{left:1px}.mc-tab-links{display:flex;position:relative;padding:1px 1px 0;flex-grow:1}.mc-tab-links .mc-tab-group_align-labels-center{justify-content:center}.mc-tab-links .mc-tab-group_align-labels-end{justify-content:flex-end}"]
                }] }
    ];
    /** @nocollapse */
    McTabNav.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return McTabNav;
}(McTabNavMixinBase));
export { McTabNav };
// Boilerplate for applying mixins to McTabLink.
var 
// Boilerplate for applying mixins to McTabLink.
McTabLinkBase = /** @class */ (function () {
    function McTabLinkBase() {
    }
    return McTabLinkBase;
}());
// Boilerplate for applying mixins to McTabLink.
export { McTabLinkBase };
// tslint:disable-next-line:naming-convention
/** @type {?} */
export var McTabLinkMixinBase = mixinTabIndex(mixinDisabled(McTabLinkBase));
/**
 * Link inside of a `mc-tab-nav-bar`.
 */
var McTabLink = /** @class */ (function (_super) {
    __extends(McTabLink, _super);
    function McTabLink(elementRef, tabIndex, focusMonitor) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.focusMonitor = focusMonitor;
        /**
         * Whether the tab link is active or not.
         */
        _this.isActive = false;
        _this.tabIndex = parseInt(tabIndex) || 0;
        _this.focusMonitor.monitor(_this.elementRef.nativeElement);
        return _this;
    }
    Object.defineProperty(McTabLink.prototype, "active", {
        /** Whether the link is active. */
        get: /**
         * Whether the link is active.
         * @return {?}
         */
        function () {
            return this.isActive;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this.isActive) {
                this.isActive = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McTabLink.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    };
    McTabLink.decorators = [
        { type: Directive, args: [{
                    selector: '[mc-tab-link], [mcTabLink]',
                    exportAs: 'mcTabLink',
                    inputs: ['disabled', 'tabIndex'],
                    host: {
                        class: 'mc-tab-link',
                        '[attr.aria-current]': 'active',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.tabIndex]': 'tabIndex',
                        '[class.mc-disabled]': 'disabled',
                        '[class.mc-active]': 'active'
                    }
                },] }
    ];
    /** @nocollapse */
    McTabLink.ctorParameters = function () { return [
        { type: ElementRef },
        { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
        { type: FocusMonitor }
    ]; };
    McTabLink.propDecorators = {
        active: [{ type: Input }]
    };
    return McTabLink;
}(McTabLinkMixinBase));
export { McTabLink };
if (false) {
    /**
     * Whether the tab link is active or not.
     * @type {?}
     * @protected
     */
    McTabLink.prototype.isActive;
    /** @type {?} */
    McTabLink.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    McTabLink.prototype.focusMonitor;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLW5hdi1iYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvdGFicy8iLCJzb3VyY2VzIjpbInRhYi1uYXYtYmFyL3RhYi1uYXYtYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQ0gsU0FBUyxFQUNULHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBRUwsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFPSCxVQUFVLEVBQ1YsYUFBYSxFQUNiLGFBQWEsRUFDaEIsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7QUFLakM7Ozs7OztJQUNJLDZDQUE2QztJQUM3QyxzQkFBbUIsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDO0lBQ2xELG1CQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7Ozs7Ozs7O0lBRGUsbUNBQThCOzs7O0FBRzlDLE1BQU0sS0FBTyxpQkFBaUIsR0FDSixVQUFVLENBQUMsWUFBWSxDQUFDOzs7O0FBS2xEO0lBVThCLDRCQUFpQjtJQUV2QyxrQkFBWSxVQUFzQjtlQUM5QixrQkFBTSxVQUFVLENBQUM7SUFDckIsQ0FBQzs7Z0JBZFIsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztvQkFDakIsaUZBQStCO29CQUUvQixJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUU7b0JBQ2pDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2xEOzs7O2dCQXhDRyxVQUFVOztJQThDVCxlQUFDO0NBQUEsQUFmTixDQVU4QixpQkFBaUIsR0FLekM7U0FMTyxRQUFROztBQVFyQjs7O0lBQUE7SUFBNEIsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FBQyxBQUE3QixJQUE2Qjs7Ozs7QUFFN0IsTUFBTSxLQUFPLGtCQUFrQixHQUNKLGFBQWEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7Ozs7QUFLdEU7SUFhK0IsNkJBQWtCO0lBZ0I3QyxtQkFDVyxVQUFzQixFQUNOLFFBQWdCLEVBQy9CLFlBQTBCO1FBSHRDLFlBS0ksaUJBQU8sU0FJVjtRQVJVLGdCQUFVLEdBQVYsVUFBVSxDQUFZO1FBRXJCLGtCQUFZLEdBQVosWUFBWSxDQUFjOzs7O1FBTDVCLGNBQVEsR0FBWSxLQUFLLENBQUM7UUFTaEMsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7O0lBQzdELENBQUM7SUF0QkQsc0JBQ0ksNkJBQU07UUFGVixrQ0FBa0M7Ozs7O1FBQ2xDO1lBRUksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7Ozs7O1FBQ0QsVUFBVyxLQUFjO1lBQ3JCLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2FBQ3pCO1FBQ0wsQ0FBQzs7O09BTEE7Ozs7SUFxQkQsK0JBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNwRSxDQUFDOztnQkExQ0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSw0QkFBNEI7b0JBQ3RDLFFBQVEsRUFBRSxXQUFXO29CQUNyQixNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO29CQUNoQyxJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLGFBQWE7d0JBQ3BCLHFCQUFxQixFQUFFLFFBQVE7d0JBQy9CLHNCQUFzQixFQUFFLHFCQUFxQjt3QkFDN0MsaUJBQWlCLEVBQUUsVUFBVTt3QkFDN0IscUJBQXFCLEVBQUUsVUFBVTt3QkFDakMsbUJBQW1CLEVBQUUsUUFBUTtxQkFDaEM7aUJBQ0o7Ozs7Z0JBckVHLFVBQVU7NkNBd0ZMLFNBQVMsU0FBQyxVQUFVO2dCQTlGcEIsWUFBWTs7O3lCQStFaEIsS0FBSzs7SUEyQlYsZ0JBQUM7Q0FBQSxBQTNDRCxDQWErQixrQkFBa0IsR0E4QmhEO1NBOUJZLFNBQVM7Ozs7Ozs7SUFjbEIsNkJBQW9DOztJQUdoQywrQkFBNkI7Ozs7O0lBRTdCLGlDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7XG4gICAgQXR0cmlidXRlLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENhbkNvbG9yLFxuICAgIENhbkNvbG9yQ3RvcixcbiAgICBDYW5EaXNhYmxlLFxuICAgIENhbkRpc2FibGVDdG9yLFxuICAgIEhhc1RhYkluZGV4LFxuICAgIEhhc1RhYkluZGV4Q3RvcixcbiAgICBtaXhpbkNvbG9yLFxuICAgIG1peGluRGlzYWJsZWQsXG4gICAgbWl4aW5UYWJJbmRleFxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNY1RhYk5hdi5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY2xhc3MgTWNUYWJOYXZCYXNlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1RhYk5hdk1peGluQmFzZTogQ2FuQ29sb3JDdG9yICZcbiAgICB0eXBlb2YgTWNUYWJOYXZCYXNlID0gbWl4aW5Db2xvcihNY1RhYk5hdkJhc2UpO1xuXG4vKipcbiAqIE5hdmlnYXRpb24gY29tcG9uZW50IG1hdGNoaW5nIHRoZSBzdHlsZXMgb2YgdGhlIHRhYiBncm91cCBoZWFkZXIuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnW21jLXRhYi1uYXYtYmFyXScsXG4gICAgZXhwb3J0QXM6ICdtY1RhYk5hdkJhciwgbWNUYWJOYXYnLFxuICAgIGlucHV0czogWydjb2xvciddLFxuICAgIHRlbXBsYXRlVXJsOiAndGFiLW5hdi1iYXIuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3RhYi1uYXYtYmFyLnNjc3MnXSxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtdGFiLW5hdi1iYXInIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY1RhYk5hdiBleHRlbmRzIE1jVGFiTmF2TWl4aW5CYXNlXG4gICAgaW1wbGVtZW50cyBDYW5Db2xvciB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgICAgICB9XG4gICAgIH1cblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNY1RhYkxpbmsuXG5leHBvcnQgY2xhc3MgTWNUYWJMaW5rQmFzZSB7fVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNUYWJMaW5rTWl4aW5CYXNlOiBIYXNUYWJJbmRleEN0b3IgJiBDYW5EaXNhYmxlQ3RvciAmXG4gICAgdHlwZW9mIE1jVGFiTGlua0Jhc2UgPSBtaXhpblRhYkluZGV4KG1peGluRGlzYWJsZWQoTWNUYWJMaW5rQmFzZSkpO1xuXG4vKipcbiAqIExpbmsgaW5zaWRlIG9mIGEgYG1jLXRhYi1uYXYtYmFyYC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWMtdGFiLWxpbmtdLCBbbWNUYWJMaW5rXScsXG4gICAgZXhwb3J0QXM6ICdtY1RhYkxpbmsnLFxuICAgIGlucHV0czogWydkaXNhYmxlZCcsICd0YWJJbmRleCddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy10YWItbGluaycsXG4gICAgICAgICdbYXR0ci5hcmlhLWN1cnJlbnRdJzogJ2FjdGl2ZScsXG4gICAgICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZC50b1N0cmluZygpJyxcbiAgICAgICAgJ1thdHRyLnRhYkluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgICAgICdbY2xhc3MubWMtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1hY3RpdmVdJzogJ2FjdGl2ZSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVGFiTGluayBleHRlbmRzIE1jVGFiTGlua01peGluQmFzZVxuICAgIGltcGxlbWVudHMgT25EZXN0cm95LCBDYW5EaXNhYmxlLCBIYXNUYWJJbmRleCB7XG4gICAgLyoqIFdoZXRoZXIgdGhlIGxpbmsgaXMgYWN0aXZlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGFjdGl2ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNBY3RpdmU7XG4gICAgfVxuICAgIHNldCBhY3RpdmUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgdGFiIGxpbmsgaXMgYWN0aXZlIG9yIG5vdC4gKi9cbiAgICBwcm90ZWN0ZWQgaXNBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgQEF0dHJpYnV0ZSgndGFiaW5kZXgnKSB0YWJJbmRleDogc3RyaW5nLFxuICAgICAgICBwcml2YXRlIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy50YWJJbmRleCA9IHBhcnNlSW50KHRhYkluZGV4KSB8fCAwO1xuICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbn1cbiJdfQ==