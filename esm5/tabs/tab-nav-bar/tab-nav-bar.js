/**
 * @fileoverview added by tsickle
 * Generated from: tab-nav-bar/tab-nav-bar.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, Directive, ElementRef, Input, ViewEncapsulation } from '@angular/core';
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
    function McTabLink(elementRef, focusMonitor) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.focusMonitor = focusMonitor;
        /**
         * Whether the tab link is active or not.
         */
        _this.isActive = false;
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
                        '[attr.tabindex]': 'tabIndex',
                        '[class.mc-disabled]': 'disabled',
                        '[class.mc-active]': 'active'
                    }
                },] }
    ];
    /** @nocollapse */
    McTabLink.ctorParameters = function () { return [
        { type: ElementRef },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLW5hdi1iYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvdGFicy8iLCJzb3VyY2VzIjpbInRhYi1uYXYtYmFyL3RhYi1uYXYtYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFFTCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQU9ILFVBQVUsRUFDVixhQUFhLEVBQ2IsYUFBYSxFQUNoQixNQUFNLHlCQUF5QixDQUFDOzs7OztBQUtqQzs7Ozs7O0lBQ0ksNkNBQTZDO0lBQzdDLHNCQUFtQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFHLENBQUM7SUFDbEQsbUJBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7Ozs7Ozs7SUFEZSxtQ0FBOEI7Ozs7QUFHOUMsTUFBTSxLQUFPLGlCQUFpQixHQUNKLFVBQVUsQ0FBQyxZQUFZLENBQUM7Ozs7QUFLbEQ7SUFVOEIsNEJBQWlCO0lBQzNDLGtCQUFZLFVBQXNCO2VBQzlCLGtCQUFNLFVBQVUsQ0FBQztJQUNyQixDQUFDOztnQkFiSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO29CQUNqQixpRkFBK0I7b0JBRS9CLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRTtvQkFDakMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDbEQ7Ozs7Z0JBeENHLFVBQVU7O0lBNkNiLGVBQUM7Q0FBQSxBQWRGLENBVThCLGlCQUFpQixHQUk3QztTQUpXLFFBQVE7O0FBT3JCOzs7SUFBQTtJQUE0QixDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQUFDLEFBQTdCLElBQTZCOzs7OztBQUU3QixNQUFNLEtBQU8sa0JBQWtCLEdBQ0osYUFBYSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7OztBQUt0RTtJQWErQiw2QkFBa0I7SUFnQjdDLG1CQUFtQixVQUFzQixFQUFVLFlBQTBCO1FBQTdFLFlBQ0ksaUJBQU8sU0FHVjtRQUprQixnQkFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFVLGtCQUFZLEdBQVosWUFBWSxDQUFjOzs7O1FBRm5FLGNBQVEsR0FBWSxLQUFLLENBQUM7UUFLaEMsS0FBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7SUFDN0QsQ0FBQztJQWpCRCxzQkFDSSw2QkFBTTtRQUZWLGtDQUFrQzs7Ozs7UUFDbEM7WUFFSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzs7Ozs7UUFDRCxVQUFXLEtBQWM7WUFDckIsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7YUFDekI7UUFDTCxDQUFDOzs7T0FMQTs7OztJQWdCRCwrQkFBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7O2dCQXJDSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7b0JBQ2hDLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsYUFBYTt3QkFDcEIscUJBQXFCLEVBQUUsUUFBUTt3QkFDL0Isc0JBQXNCLEVBQUUscUJBQXFCO3dCQUM3QyxpQkFBaUIsRUFBRSxVQUFVO3dCQUM3QixxQkFBcUIsRUFBRSxVQUFVO3dCQUNqQyxtQkFBbUIsRUFBRSxRQUFRO3FCQUNoQztpQkFDSjs7OztnQkFwRUcsVUFBVTtnQkFMTCxZQUFZOzs7eUJBNkVoQixLQUFLOztJQXNCVixnQkFBQztDQUFBLEFBdENELENBYStCLGtCQUFrQixHQXlCaEQ7U0F6QlksU0FBUzs7Ozs7OztJQWNsQiw2QkFBb0M7O0lBRXhCLCtCQUE2Qjs7Ozs7SUFBRSxpQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENhbkNvbG9yLFxuICAgIENhbkNvbG9yQ3RvcixcbiAgICBDYW5EaXNhYmxlLFxuICAgIENhbkRpc2FibGVDdG9yLFxuICAgIEhhc1RhYkluZGV4LFxuICAgIEhhc1RhYkluZGV4Q3RvcixcbiAgICBtaXhpbkNvbG9yLFxuICAgIG1peGluRGlzYWJsZWQsXG4gICAgbWl4aW5UYWJJbmRleFxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNY1RhYk5hdi5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY2xhc3MgTWNUYWJOYXZCYXNlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1RhYk5hdk1peGluQmFzZTogQ2FuQ29sb3JDdG9yICZcbiAgICB0eXBlb2YgTWNUYWJOYXZCYXNlID0gbWl4aW5Db2xvcihNY1RhYk5hdkJhc2UpO1xuXG4vKipcbiAqIE5hdmlnYXRpb24gY29tcG9uZW50IG1hdGNoaW5nIHRoZSBzdHlsZXMgb2YgdGhlIHRhYiBncm91cCBoZWFkZXIuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnW21jLXRhYi1uYXYtYmFyXScsXG4gICAgZXhwb3J0QXM6ICdtY1RhYk5hdkJhciwgbWNUYWJOYXYnLFxuICAgIGlucHV0czogWydjb2xvciddLFxuICAgIHRlbXBsYXRlVXJsOiAndGFiLW5hdi1iYXIuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3RhYi1uYXYtYmFyLnNjc3MnXSxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtdGFiLW5hdi1iYXInIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY1RhYk5hdiBleHRlbmRzIE1jVGFiTmF2TWl4aW5CYXNlIGltcGxlbWVudHMgQ2FuQ29sb3Ige1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgfVxuIH1cblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNY1RhYkxpbmsuXG5leHBvcnQgY2xhc3MgTWNUYWJMaW5rQmFzZSB7fVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNUYWJMaW5rTWl4aW5CYXNlOiBIYXNUYWJJbmRleEN0b3IgJiBDYW5EaXNhYmxlQ3RvciAmXG4gICAgdHlwZW9mIE1jVGFiTGlua0Jhc2UgPSBtaXhpblRhYkluZGV4KG1peGluRGlzYWJsZWQoTWNUYWJMaW5rQmFzZSkpO1xuXG4vKipcbiAqIExpbmsgaW5zaWRlIG9mIGEgYG1jLXRhYi1uYXYtYmFyYC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWMtdGFiLWxpbmtdLCBbbWNUYWJMaW5rXScsXG4gICAgZXhwb3J0QXM6ICdtY1RhYkxpbmsnLFxuICAgIGlucHV0czogWydkaXNhYmxlZCcsICd0YWJJbmRleCddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy10YWItbGluaycsXG4gICAgICAgICdbYXR0ci5hcmlhLWN1cnJlbnRdJzogJ2FjdGl2ZScsXG4gICAgICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZC50b1N0cmluZygpJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgICAgICdbY2xhc3MubWMtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1hY3RpdmVdJzogJ2FjdGl2ZSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVGFiTGluayBleHRlbmRzIE1jVGFiTGlua01peGluQmFzZVxuICAgIGltcGxlbWVudHMgT25EZXN0cm95LCBDYW5EaXNhYmxlLCBIYXNUYWJJbmRleCB7XG4gICAgLyoqIFdoZXRoZXIgdGhlIGxpbmsgaXMgYWN0aXZlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGFjdGl2ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNBY3RpdmU7XG4gICAgfVxuICAgIHNldCBhY3RpdmUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgdGFiIGxpbmsgaXMgYWN0aXZlIG9yIG5vdC4gKi9cbiAgICBwcm90ZWN0ZWQgaXNBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3IubW9uaXRvcih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG59XG4iXX0=