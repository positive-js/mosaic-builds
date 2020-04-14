/**
 * @fileoverview added by tsickle
 * Generated from: link.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { Input, ElementRef, ChangeDetectorRef, Directive } from '@angular/core';
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
    function McLink(elementRef, focusMonitor, changeDetector) {
        var _this = _super.call(this, elementRef) || this;
        _this.focusMonitor = focusMonitor;
        _this.changeDetector = changeDetector;
        _this._disabled = false;
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
                    inputs: ['tabIndex'],
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
        { type: ChangeDetectorRef }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvbGluay8iLCJzb3VyY2VzIjpbImxpbmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQ0gsS0FBSyxFQUNMLFVBQVUsRUFFVixpQkFBaUIsRUFDakIsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHSCxhQUFhLEVBQ2IsYUFBYSxFQUNiLFNBQVMsRUFDWixNQUFNLHlCQUF5QixDQUFDO0FBR2pDO0lBQ0ksb0JBQW1CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBRyxDQUFDO0lBQ2pELGlCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7Ozs7SUFEZSxnQ0FBNkI7Ozs7QUFJN0MsTUFBTSxLQUFPLGVBQWUsR0FDSixhQUFhLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRWhFO0lBVTRCLDBCQUFlO0lBaUJ2QyxnQkFDSSxVQUFzQixFQUNkLFlBQTBCLEVBQzFCLGNBQWlDO1FBSDdDLFlBS0ksa0JBQU0sVUFBVSxDQUFDLFNBR3BCO1FBTlcsa0JBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsb0JBQWMsR0FBZCxjQUFjLENBQW1CO1FBTHJDLGVBQVMsR0FBRyxLQUFLLENBQUM7UUFTdEIsS0FBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQzs7SUFDOUQsQ0FBQztJQXhCRCxzQkFDSSw0QkFBUTs7OztRQURaO1lBRUksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7Ozs7O1FBRUQsVUFBYSxLQUFVOztnQkFDYixRQUFRLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztZQUVqQyxJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUN0QztRQUNMLENBQUM7OztPQVRBOzs7O0lBdUJELDRCQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7OztJQUVELHNCQUFLOzs7SUFBTDtRQUNJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7O0lBRUQsK0JBQWM7OztJQUFkO1FBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztJQUN6QyxDQUFDOztnQkEvQ0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUsUUFBUTtvQkFDbEIsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNwQixJQUFJLEVBQUU7d0JBQ0YsaUJBQWlCLEVBQUUsa0JBQWtCO3dCQUNyQyxpQkFBaUIsRUFBRSxVQUFVO3FCQUNoQztpQkFDSjs7OztnQkE5QkcsVUFBVTtnQkFITCxZQUFZO2dCQUtqQixpQkFBaUI7OzsyQkErQmhCLEtBQUs7O0lBcUNWLGFBQUM7Q0FBQSxBQWhERCxDQVU0QixlQUFlLEdBc0MxQztTQXRDWSxNQUFNOzs7Ozs7SUFlZiwyQkFBMEI7Ozs7O0lBSXRCLDhCQUFrQzs7Ozs7SUFDbEMsZ0NBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtcbiAgICBJbnB1dCxcbiAgICBFbGVtZW50UmVmLFxuICAgIE9uRGVzdHJveSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBEaXJlY3RpdmVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENhbkRpc2FibGUsIENhbkRpc2FibGVDdG9yLFxuICAgIEhhc1RhYkluZGV4LCBIYXNUYWJJbmRleEN0b3IsXG4gICAgbWl4aW5EaXNhYmxlZCxcbiAgICBtaXhpblRhYkluZGV4LFxuICAgIHRvQm9vbGVhblxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cblxuZXhwb3J0IGNsYXNzIE1jTGlua0Jhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNMaW5rTWl4aW5CYXNlOiBIYXNUYWJJbmRleEN0b3IgJiBDYW5EaXNhYmxlQ3RvciAmXG4gICAgdHlwZW9mIE1jTGlua0Jhc2UgPSBtaXhpblRhYkluZGV4KG1peGluRGlzYWJsZWQoTWNMaW5rQmFzZSkpO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2EubWMtbGluaycsXG4gICAgZXhwb3J0QXM6ICdtY0xpbmsnLFxuICAgIGlucHV0czogWyd0YWJJbmRleCddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCdcbiAgICB9XG59KVxuXG5leHBvcnQgY2xhc3MgTWNMaW5rIGV4dGVuZHMgTWNMaW5rTWl4aW5CYXNlIGltcGxlbWVudHMgT25EZXN0cm95LCBIYXNUYWJJbmRleCwgQ2FuRGlzYWJsZSB7XG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGFueSkge1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRvQm9vbGVhbih2YWx1ZSk7XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuXG4gICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLm1vbml0b3IoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0cnVlKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdldEhvc3RFbGVtZW50KCkuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBnZXRIb3N0RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cbn1cbiJdfQ==