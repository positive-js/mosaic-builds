/**
 * @fileoverview added by tsickle
 * Generated from: vertical-navbar-item.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, Directive, ElementRef, Optional, Self } from '@angular/core';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
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
export var McVerticalNavbarMixinBase = mixinDisabled(McVerticalNavbarItemBase);
var McVerticalNavbarItem = /** @class */ (function (_super) {
    __extends(McVerticalNavbarItem, _super);
    function McVerticalNavbarItem(element, focusMonitor, trigger) {
        var _this = _super.call(this, element) || this;
        _this.element = element;
        _this.focusMonitor = focusMonitor;
        _this.trigger = trigger;
        _this.tabIndex = 0;
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
                    inputs: ['disabled'],
                    host: {
                        class: 'mc-vertical-navbar-item',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.tabindex]': 'disabled ? -1 : 0'
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
    McVerticalNavbarItem.propDecorators = {
        tabIndex: [{ type: Input }]
    };
    return McVerticalNavbarItem;
}(McVerticalNavbarMixinBase));
export { McVerticalNavbarItem };
if (false) {
    /** @type {?} */
    McVerticalNavbarItem.prototype.tabIndex;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2YmFyLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3ZlcnRpY2FsLW5hdmJhci8iLCJzb3VyY2VzIjpbInZlcnRpY2FsLW5hdmJhci1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsS0FBSyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUVWLFFBQVEsRUFDUixJQUFJLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFjLGFBQWEsRUFBa0IsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUdoRTtJQUFBO0lBTXVDLENBQUM7O2dCQU52QyxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLDhCQUE4QjtvQkFDeEMsSUFBSSxFQUFFO3dCQUNGLEtBQUssRUFBRSwrQkFBK0I7cUJBQ3pDO2lCQUNKOztJQUNzQywrQkFBQztDQUFBLEFBTnhDLElBTXdDO1NBQTNCLHdCQUF3QjtBQUdyQztJQUFBO0lBV3dDLENBQUM7O2dCQVh4QyxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLDBCQUEwQjtvQkFDcEMsUUFBUSxFQUFFLGtIQUlUO29CQUNELElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsMkJBQTJCO3FCQUNyQztpQkFDSjs7SUFDdUMsZ0NBQUM7Q0FBQSxBQVh6QyxJQVd5QztTQUE1Qix5QkFBeUI7QUFHdEM7SUFDSSw2Q0FBNkM7SUFDN0Msa0NBQW1CLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lBQUcsQ0FBQztJQUNsRCwrQkFBQztBQUFELENBQUMsQUFIRCxJQUdDOzs7SUFEZSwrQ0FBOEI7Ozs7QUFJOUMsTUFBTSxLQUFPLHlCQUF5QixHQUNoQyxhQUFhLENBQUMsd0JBQXdCLENBQUM7QUFHN0M7SUFhMEMsd0NBQXlCO0lBRy9ELDhCQUNZLE9BQW1CLEVBQ25CLFlBQTBCLEVBQ04sT0FBMEI7UUFIMUQsWUFLSSxrQkFBTSxPQUFPLENBQUMsU0FHakI7UUFQVyxhQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGtCQUFZLEdBQVosWUFBWSxDQUFjO1FBQ04sYUFBTyxHQUFQLE9BQU8sQ0FBbUI7UUFMakQsY0FBUSxHQUFXLENBQUMsQ0FBQztRQVMxQixLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDOztJQUN0RSxDQUFDO0lBRUQsc0JBQUkscURBQW1COzs7O1FBQXZCO1lBQ0ksT0FBTyxDQUFDLENBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUMzQixDQUFDOzs7T0FBQTs7OztJQUVELDBDQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDakUsQ0FBQzs7Z0JBaENKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscURBQXFEO29CQUMvRCx5TkFBb0Q7b0JBQ3BELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFFL0MsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNwQixJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLHlCQUF5Qjt3QkFDaEMsaUJBQWlCLEVBQUUsa0JBQWtCO3dCQUNyQyxpQkFBaUIsRUFBRSxtQkFBbUI7cUJBQ3pDOztpQkFDSjs7OztnQkF0REcsVUFBVTtnQkFQTCxZQUFZO2dCQWFaLGlCQUFpQix1QkF1RGpCLFFBQVEsWUFBSSxJQUFJOzs7MkJBTHBCLEtBQUs7O0lBbUJWLDJCQUFDO0NBQUEsQUFqQ0QsQ0FhMEMseUJBQXlCLEdBb0JsRTtTQXBCWSxvQkFBb0I7OztJQUM3Qix3Q0FBOEI7Ozs7O0lBRzFCLHVDQUEyQjs7Ozs7SUFDM0IsNENBQWtDOzs7OztJQUNsQyx1Q0FBc0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3B0aW9uYWwsXG4gICAgU2VsZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkRpc2FibGUsIG1peGluRGlzYWJsZWQsIENhbkRpc2FibGVDdG9yIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNEcm9wZG93blRyaWdnZXIgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvZHJvcGRvd24nO1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtdmVydGljYWwtbmF2YmFyLWl0ZW0taWNvbicsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXZlcnRpY2FsLW5hdmJhcl9faXRlbS1pY29uJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNWZXJ0aWNhbE5hdmJhckl0ZW1JY29uIHt9XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy12ZXJ0aWNhbC1uYXZiYXItYmFkZ2UnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzcGFuIGNsYXNzPVwibWMtYmFkZ2UgbWMtYmFkZ2VfbGlnaHRcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9zcGFuPlxuICAgIGAsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXZlcnRpY2FsLW5hdmJhcl9fYmFkZ2UnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1ZlcnRpY2FsTmF2YmFySXRlbUJhZGdlIHt9XG5cblxuY2xhc3MgTWNWZXJ0aWNhbE5hdmJhckl0ZW1CYXNlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jVmVydGljYWxOYXZiYXJNaXhpbkJhc2U6IENhbkRpc2FibGVDdG9yICYgdHlwZW9mIE1jVmVydGljYWxOYXZiYXJJdGVtQmFzZVxuICAgID0gbWl4aW5EaXNhYmxlZChNY1ZlcnRpY2FsTmF2YmFySXRlbUJhc2UpO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYVttYy12ZXJ0aWNhbC1uYXZiYXItaXRlbV0sIG1jLXZlcnRpY2FsLW5hdmJhci1pdGVtJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdmVydGljYWwtbmF2YmFyLWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgc3R5bGVVcmxzOiBbJy4vdmVydGljYWwtbmF2YmFyLWl0ZW0uY29tcG9uZW50LnNjc3MnXSxcbiAgICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdmVydGljYWwtbmF2YmFyLWl0ZW0nLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ2Rpc2FibGVkID8gLTEgOiAwJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNWZXJ0aWNhbE5hdmJhckl0ZW0gZXh0ZW5kcyBNY1ZlcnRpY2FsTmF2YmFyTWl4aW5CYXNlIGltcGxlbWVudHMgQ2FuRGlzYWJsZSwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSB0YWJJbmRleDogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHJpdmF0ZSB0cmlnZ2VyOiBNY0Ryb3Bkb3duVHJpZ2dlclxuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50KTtcblxuICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KS5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBnZXQgaGFzRHJvcGRvd25BdHRhY2hlZCgpIHtcbiAgICAgICAgcmV0dXJuICEhIHRoaXMudHJpZ2dlcjtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbn1cbiJdfQ==