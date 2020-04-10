/**
 * @fileoverview added by tsickle
 * Generated from: link.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { Input, ElementRef, ChangeDetectorRef, Directive, Attribute } from '@angular/core';
import { mixinDisabled, mixinTabIndex, toBoolean } from '@ptsecurity/mosaic/core';
var McLinkBase = /** @class */ (function () {
    function McLinkBase(elementRef) {
        this.elementRef = elementRef;
    }
    return McLinkBase;
}());
export { McLinkBase };
if (false) {
    /** @type {?} */
    McLinkBase.prototype.elementRef;
}
// tslint:disable-next-line: naming-convention
/** @type {?} */
export var McLinkMixinBase = mixinTabIndex(mixinDisabled(McLinkBase));
var McLink = /** @class */ (function (_super) {
    __extends(McLink, _super);
    function McLink(elementRef, focusMonitor, changeDetector, tabIndex) {
        var _this = _super.call(this, elementRef) || this;
        _this.focusMonitor = focusMonitor;
        _this.changeDetector = changeDetector;
        _this._disabled = false;
        _this.tabIndex = parseInt(tabIndex) || 0;
        _this.focusMonitor.monitor(elementRef.nativeElement, true);
        return _this;
    }
    Object.defineProperty(McLink.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var newValue = toBoolean(value);
            if (newValue !== this._disabled) {
                this._disabled = newValue;
                this.changeDetector.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McLink.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    };
    /**
     * @return {?}
     */
    McLink.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.getHostElement().focus();
    };
    /**
     * @return {?}
     */
    McLink.prototype.getHostElement = /**
     * @return {?}
     */
    function () {
        return this.elementRef.nativeElement;
    };
    McLink.decorators = [
        { type: Directive, args: [{
                    selector: 'a.mc-link',
                    exportAs: 'mcLink',
                    inputs: ['disabled'],
                    host: {
                        '[attr.disabled]': 'disabled || null',
                        '[attr.tabindex]': 'tabIndex'
                    }
                },] }
    ];
    /** @nocollapse */
    McLink.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FocusMonitor },
        { type: ChangeDetectorRef },
        { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] }
    ]; };
    McLink.propDecorators = {
        disabled: [{ type: Input }]
    };
    return McLink;
}(McLinkMixinBase));
export { McLink };
if (false) {
    /**
     * @type {?}
     * @private
     */
    McLink.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    McLink.prototype.focusMonitor;
    /**
     * @type {?}
     * @private
     */
    McLink.prototype.changeDetector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvbGluay8iLCJzb3VyY2VzIjpbImxpbmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQ0gsS0FBSyxFQUNMLFVBQVUsRUFFVixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBR0gsYUFBYSxFQUNiLGFBQWEsRUFDYixTQUFTLEVBQ1osTUFBTSx5QkFBeUIsQ0FBQztBQUdqQztJQUNJLG9CQUFtQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUcsQ0FBQztJQUNqRCxpQkFBQztBQUFELENBQUMsQUFGRCxJQUVDOzs7O0lBRGUsZ0NBQTZCOzs7O0FBSTdDLE1BQU0sS0FBTyxlQUFlLEdBQ3RCLGFBQWEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFOUM7SUFVNEIsMEJBQWU7SUFrQnZDLGdCQUNJLFVBQXNCLEVBQ2QsWUFBMEIsRUFDMUIsY0FBaUMsRUFDbEIsUUFBZ0I7UUFKM0MsWUFNSSxrQkFBTSxVQUFVLENBQUMsU0FLcEI7UUFUVyxrQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixvQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFMckMsZUFBUyxHQUFHLEtBQUssQ0FBQztRQVV0QixLQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEMsS0FBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQzs7SUFDOUQsQ0FBQztJQTNCRCxzQkFDSSw0QkFBUTs7OztRQURaO1lBRUksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7Ozs7O1FBRUQsVUFBYSxLQUFVOztnQkFDYixRQUFRLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztZQUVqQyxJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUN0QztRQUNMLENBQUM7OztPQVRBOzs7O0lBMEJELDRCQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7OztJQUVELHNCQUFLOzs7SUFBTDtRQUNJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7O0lBRUQsK0JBQWM7OztJQUFkO1FBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztJQUN6QyxDQUFDOztnQkFuREosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUsUUFBUTtvQkFDbEIsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNwQixJQUFJLEVBQUU7d0JBQ0YsaUJBQWlCLEVBQUUsa0JBQWtCO3dCQUNyQyxpQkFBaUIsRUFBRSxVQUFVO3FCQUNoQztpQkFDSjs7OztnQkEvQkcsVUFBVTtnQkFITCxZQUFZO2dCQUtqQixpQkFBaUI7NkNBcURaLFNBQVMsU0FBQyxVQUFVOzs7MkJBcEJ4QixLQUFLOztJQXdDVixhQUFDO0NBQUEsQUFwREQsQ0FVNEIsZUFBZSxHQTBDMUM7U0ExQ1ksTUFBTTs7Ozs7O0lBZ0JmLDJCQUEwQjs7Ozs7SUFJdEIsOEJBQWtDOzs7OztJQUNsQyxnQ0FBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIElucHV0LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgT25EZXN0cm95LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIERpcmVjdGl2ZSxcbiAgICBBdHRyaWJ1dGVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENhbkRpc2FibGUsIENhbkRpc2FibGVDdG9yLFxuICAgIEhhc1RhYkluZGV4LCBIYXNUYWJJbmRleEN0b3IsXG4gICAgbWl4aW5EaXNhYmxlZCxcbiAgICBtaXhpblRhYkluZGV4LFxuICAgIHRvQm9vbGVhblxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cblxuZXhwb3J0IGNsYXNzIE1jTGlua0Jhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNMaW5rTWl4aW5CYXNlOiBIYXNUYWJJbmRleEN0b3IgJiBDYW5EaXNhYmxlQ3RvciAmIHR5cGVvZiBNY0xpbmtCYXNlXG4gICAgPSBtaXhpblRhYkluZGV4KG1peGluRGlzYWJsZWQoTWNMaW5rQmFzZSkpO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2EubWMtbGluaycsXG4gICAgZXhwb3J0QXM6ICdtY0xpbmsnLFxuICAgIGlucHV0czogWydkaXNhYmxlZCddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCdcbiAgICB9XG59KVxuXG5leHBvcnQgY2xhc3MgTWNMaW5rIGV4dGVuZHMgTWNMaW5rTWl4aW5CYXNlIGltcGxlbWVudHMgT25EZXN0cm95LCBIYXNUYWJJbmRleCwgQ2FuRGlzYWJsZSB7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYW55KSB7XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdG9Cb29sZWFuKHZhbHVlKTtcblxuICAgICAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMuX2Rpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBmb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcixcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIEBBdHRyaWJ1dGUoJ3RhYmluZGV4JykgdGFiSW5kZXg6IHN0cmluZ1xuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgICAgICB0aGlzLnRhYkluZGV4ID0gcGFyc2VJbnQodGFiSW5kZXgpIHx8IDA7XG5cbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3IubW9uaXRvcihlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRydWUpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2V0SG9zdEVsZW1lbnQoKS5mb2N1cygpO1xuICAgIH1cblxuICAgIGdldEhvc3RFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxufVxuIl19