/**
 * @fileoverview added by tsickle
 * Generated from: vertical-navbar-item.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, Directive, ElementRef, Optional, Self } from '@angular/core';
import { mixinDisabled, mixinTabIndex } from '@ptsecurity/mosaic/core';
import { McDropdownTrigger } from '@ptsecurity/mosaic/dropdown';
var McVerticalNavbarItemIcon = /** @class */ (function () {
    function McVerticalNavbarItemIcon() {
    }
    McVerticalNavbarItemIcon.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-vertical-navbar-item-icon',
                    host: {
                        class: 'mc-vertical-navbar__item-icon'
                    }
                },] }
    ];
    return McVerticalNavbarItemIcon;
}());
export { McVerticalNavbarItemIcon };
var McVerticalNavbarItemBadge = /** @class */ (function () {
    function McVerticalNavbarItemBadge() {
    }
    McVerticalNavbarItemBadge.decorators = [
        { type: Component, args: [{
                    selector: 'mc-vertical-navbar-badge',
                    template: "\n        <span class=\"mc-badge mc-badge_light\">\n            <ng-content></ng-content>\n        </span>\n    ",
                    host: {
                        class: 'mc-vertical-navbar__badge'
                    }
                }] }
    ];
    return McVerticalNavbarItemBadge;
}());
export { McVerticalNavbarItemBadge };
var McVerticalNavbarItemBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McVerticalNavbarItemBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McVerticalNavbarItemBase;
}());
if (false) {
    /** @type {?} */
    McVerticalNavbarItemBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export var McVerticalNavbarMixinBase = mixinTabIndex(mixinDisabled(McVerticalNavbarItemBase));
var McVerticalNavbarItem = /** @class */ (function (_super) {
    __extends(McVerticalNavbarItem, _super);
    function McVerticalNavbarItem(element, focusMonitor, trigger) {
        var _this = _super.call(this, element) || this;
        _this.element = element;
        _this.focusMonitor = focusMonitor;
        _this.trigger = trigger;
        _this.focusMonitor.monitor(_this.element.nativeElement).subscribe();
        return _this;
    }
    Object.defineProperty(McVerticalNavbarItem.prototype, "hasDropdownAttached", {
        get: /**
         * @return {?}
         */
        function () {
            return !!this.trigger;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McVerticalNavbarItem.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.focusMonitor.stopMonitoring(this.element.nativeElement);
    };
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
                    styles: [".mc-vertical-navbar__badge{position:absolute;width:64px;top:0;left:0}.mc-vertical-navbar__badge .mc-badge{position:absolute;right:4px;top:4px}.mc-vertical-navbar__item-icon{margin-right:16px}.mc-vertical-navbar__item-icon .mc-icon{font-size:32px}.mc-vertical-navbar__title{white-space:nowrap}.mc-vertical-navbar__item-dropdown-icon{margin-left:auto;padding-left:16px}a[mc-vertical-navbar-item],mc-vertical-navbar-item{height:64px;margin:1px 0;width:100%;position:relative;display:flex;align-items:center;box-sizing:border-box;cursor:pointer;text-decoration:none}a[mc-vertical-navbar-item] .mc-vertical-navbar__item,mc-vertical-navbar-item .mc-vertical-navbar__item{padding-left:16px;padding-right:16px;display:flex;align-items:center;width:100%;height:100%}a[mc-vertical-navbar-item].mc-progress,mc-vertical-navbar-item.mc-progress{cursor:pointer}a[mc-vertical-navbar-item].mc-vertical-navbar__item_active,mc-vertical-navbar-item.mc-vertical-navbar__item_active{cursor:default}a[mc-vertical-navbar-item][disabled],mc-vertical-navbar-item[disabled]{cursor:default;pointer-events:none}"]
                }] }
    ];
    /** @nocollapse */
    McVerticalNavbarItem.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FocusMonitor },
        { type: McDropdownTrigger, decorators: [{ type: Optional }, { type: Self }] }
    ]; };
    return McVerticalNavbarItem;
}(McVerticalNavbarMixinBase));
export { McVerticalNavbarItem };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2YmFyLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3ZlcnRpY2FsLW5hdmJhci8iLCJzb3VyY2VzIjpbInZlcnRpY2FsLW5hdmJhci1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBRVYsUUFBUSxFQUNSLElBQUksRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWMsYUFBYSxFQUFrQixhQUFhLEVBQW1CLE1BQU0seUJBQXlCLENBQUM7QUFDcEgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHaEU7SUFBQTtJQU11QyxDQUFDOztnQkFOdkMsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSw4QkFBOEI7b0JBQ3hDLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsK0JBQStCO3FCQUN6QztpQkFDSjs7SUFDc0MsK0JBQUM7Q0FBQSxBQU54QyxJQU13QztTQUEzQix3QkFBd0I7QUFHckM7SUFBQTtJQVd3QyxDQUFDOztnQkFYeEMsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLFFBQVEsRUFBRSxrSEFJVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLDJCQUEyQjtxQkFDckM7aUJBQ0o7O0lBQ3VDLGdDQUFDO0NBQUEsQUFYekMsSUFXeUM7U0FBNUIseUJBQXlCO0FBR3RDO0lBQ0ksNkNBQTZDO0lBQzdDLGtDQUFtQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFHLENBQUM7SUFDbEQsK0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7O0lBRGUsK0NBQThCOzs7O0FBSTlDLE1BQU0sS0FBTyx5QkFBeUIsR0FDaEMsYUFBYSxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBRzVEO0lBYTBDLHdDQUF5QjtJQUsvRCw4QkFDWSxPQUFtQixFQUNuQixZQUEwQixFQUNOLE9BQTBCO1FBSDFELFlBS0ksa0JBQU0sT0FBTyxDQUFDLFNBR2pCO1FBUFcsYUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixrQkFBWSxHQUFaLFlBQVksQ0FBYztRQUNOLGFBQU8sR0FBUCxPQUFPLENBQW1CO1FBSXRELEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7O0lBQ3RFLENBQUM7SUFaRCxzQkFBSSxxREFBbUI7Ozs7UUFBdkI7WUFDSSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzFCLENBQUM7OztPQUFBOzs7O0lBWUQsMENBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNqRSxDQUFDOztnQkE5QkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxxREFBcUQ7b0JBQy9ELHlOQUFvRDtvQkFDcEQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUUvQyxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO29CQUNoQyxJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLHlCQUF5Qjt3QkFDaEMsaUJBQWlCLEVBQUUsa0JBQWtCO3dCQUNyQyxpQkFBaUIsRUFBRSxVQUFVO3FCQUNoQzs7aUJBQ0o7Ozs7Z0JBdERHLFVBQVU7Z0JBTkwsWUFBWTtnQkFZWixpQkFBaUIsdUJBeURqQixRQUFRLFlBQUksSUFBSTs7SUFVekIsMkJBQUM7Q0FBQSxBQS9CRCxDQWEwQyx5QkFBeUIsR0FrQmxFO1NBbEJZLG9CQUFvQjs7Ozs7O0lBTXpCLHVDQUEyQjs7Ozs7SUFDM0IsNENBQWtDOzs7OztJQUNsQyx1Q0FBc0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3B0aW9uYWwsXG4gICAgU2VsZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkRpc2FibGUsIG1peGluRGlzYWJsZWQsIENhbkRpc2FibGVDdG9yLCBtaXhpblRhYkluZGV4LCBIYXNUYWJJbmRleEN0b3IgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0Ryb3Bkb3duVHJpZ2dlciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9kcm9wZG93bic7XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy12ZXJ0aWNhbC1uYXZiYXItaXRlbS1pY29uJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdmVydGljYWwtbmF2YmFyX19pdGVtLWljb24nXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1ZlcnRpY2FsTmF2YmFySXRlbUljb24ge31cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXZlcnRpY2FsLW5hdmJhci1iYWRnZScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJtYy1iYWRnZSBtYy1iYWRnZV9saWdodFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L3NwYW4+XG4gICAgYCxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdmVydGljYWwtbmF2YmFyX19iYWRnZSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVmVydGljYWxOYXZiYXJJdGVtQmFkZ2Uge31cblxuXG5jbGFzcyBNY1ZlcnRpY2FsTmF2YmFySXRlbUJhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNWZXJ0aWNhbE5hdmJhck1peGluQmFzZTogSGFzVGFiSW5kZXhDdG9yICYgQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgTWNWZXJ0aWNhbE5hdmJhckl0ZW1CYXNlXG4gICAgPSBtaXhpblRhYkluZGV4KG1peGluRGlzYWJsZWQoTWNWZXJ0aWNhbE5hdmJhckl0ZW1CYXNlKSk7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhW21jLXZlcnRpY2FsLW5hdmJhci1pdGVtXSwgbWMtdmVydGljYWwtbmF2YmFyLWl0ZW0nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi92ZXJ0aWNhbC1uYXZiYXItaXRlbS5jb21wb25lbnQuaHRtbCcsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBzdHlsZVVybHM6IFsnLi92ZXJ0aWNhbC1uYXZiYXItaXRlbS5jb21wb25lbnQuc2NzcyddLFxuICAgIGlucHV0czogWydkaXNhYmxlZCcsICd0YWJJbmRleCddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy12ZXJ0aWNhbC1uYXZiYXItaXRlbScsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXgnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1ZlcnRpY2FsTmF2YmFySXRlbSBleHRlbmRzIE1jVmVydGljYWxOYXZiYXJNaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5EaXNhYmxlLCBPbkRlc3Ryb3kge1xuICAgIGdldCBoYXNEcm9wZG93bkF0dGFjaGVkKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLnRyaWdnZXI7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBmb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcixcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwcml2YXRlIHRyaWdnZXI6IE1jRHJvcGRvd25UcmlnZ2VyXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpLnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgfVxufVxuIl19