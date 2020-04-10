/**
 * @fileoverview added by tsickle
 * Generated from: tab-label-wrapper.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { Directive, ElementRef } from '@angular/core';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
// Boilerplate for applying mixins to McTabLabelWrapper.
/**
 * \@docs-private
 */
var 
// Boilerplate for applying mixins to McTabLabelWrapper.
/**
 * \@docs-private
 */
McTabLabelWrapperBase = /** @class */ (function () {
    function McTabLabelWrapperBase() {
    }
    return McTabLabelWrapperBase;
}());
// Boilerplate for applying mixins to McTabLabelWrapper.
/**
 * \@docs-private
 */
export { McTabLabelWrapperBase };
// tslint:disable-next-line:naming-convention
/** @type {?} */
export var McTabLabelWrapperMixinBase = mixinDisabled(McTabLabelWrapperBase);
/**
 * Used in the `mc-tab-group` view to display tab labels.
 * \@docs-private
 */
var McTabLabelWrapper = /** @class */ (function (_super) {
    __extends(McTabLabelWrapper, _super);
    function McTabLabelWrapper(elementRef) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        return _this;
    }
    /** Sets focus on the wrapper element */
    /**
     * Sets focus on the wrapper element
     * @return {?}
     */
    McTabLabelWrapper.prototype.focus = /**
     * Sets focus on the wrapper element
     * @return {?}
     */
    function () {
        this.elementRef.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    McTabLabelWrapper.prototype.getOffsetLeft = /**
     * @return {?}
     */
    function () {
        return this.elementRef.nativeElement.offsetLeft;
    };
    /**
     * @return {?}
     */
    McTabLabelWrapper.prototype.getOffsetWidth = /**
     * @return {?}
     */
    function () {
        return this.elementRef.nativeElement.offsetWidth;
    };
    McTabLabelWrapper.decorators = [
        { type: Directive, args: [{
                    selector: '[mcTabLabelWrapper]',
                    inputs: ['disabled'],
                    host: {
                        '[class.mc-disabled]': 'disabled',
                        '[attr.aria-disabled]': '!!disabled'
                    }
                },] }
    ];
    /** @nocollapse */
    McTabLabelWrapper.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return McTabLabelWrapper;
}(McTabLabelWrapperMixinBase));
export { McTabLabelWrapper };
if (false) {
    /** @type {?} */
    McTabLabelWrapper.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxhYmVsLXdyYXBwZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvdGFicy8iLCJzb3VyY2VzIjpbInRhYi1sYWJlbC13cmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFHSCxhQUFhLEVBQ2hCLE1BQU0seUJBQXlCLENBQUM7Ozs7O0FBS2pDOzs7Ozs7SUFBQTtJQUFvQyxDQUFDO0lBQUQsNEJBQUM7QUFBRCxDQUFDLEFBQXJDLElBQXFDOzs7Ozs7OztBQUVyQyxNQUFNLEtBQU8sMEJBQTBCLEdBQ0osYUFBYSxDQUFDLHFCQUFxQixDQUFDOzs7OztBQU12RTtJQVF1QyxxQ0FBMEI7SUFDN0QsMkJBQW1CLFVBQXNCO1FBQXpDLFlBQ0ksaUJBQU8sU0FDVjtRQUZrQixnQkFBVSxHQUFWLFVBQVUsQ0FBWTs7SUFFekMsQ0FBQztJQUVELHdDQUF3Qzs7Ozs7SUFDeEMsaUNBQUs7Ozs7SUFBTDtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzFDLENBQUM7Ozs7SUFFRCx5Q0FBYTs7O0lBQWI7UUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztJQUNwRCxDQUFDOzs7O0lBRUQsMENBQWM7OztJQUFkO1FBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7SUFDckQsQ0FBQzs7Z0JBeEJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7b0JBQ3BCLElBQUksRUFBRTt3QkFDRixxQkFBcUIsRUFBRSxVQUFVO3dCQUNqQyxzQkFBc0IsRUFBRSxZQUFZO3FCQUN2QztpQkFDSjs7OztnQkExQm1CLFVBQVU7O0lBNEM5Qix3QkFBQztDQUFBLEFBekJELENBUXVDLDBCQUEwQixHQWlCaEU7U0FqQlksaUJBQWlCOzs7SUFDZCx1Q0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQ2FuRGlzYWJsZSxcbiAgICBDYW5EaXNhYmxlQ3RvcixcbiAgICBtaXhpbkRpc2FibGVkXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1jVGFiTGFiZWxXcmFwcGVyLlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjbGFzcyBNY1RhYkxhYmVsV3JhcHBlckJhc2Uge31cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jVGFiTGFiZWxXcmFwcGVyTWl4aW5CYXNlOiBDYW5EaXNhYmxlQ3RvciAmXG4gICAgdHlwZW9mIE1jVGFiTGFiZWxXcmFwcGVyQmFzZSA9IG1peGluRGlzYWJsZWQoTWNUYWJMYWJlbFdyYXBwZXJCYXNlKTtcblxuLyoqXG4gKiBVc2VkIGluIHRoZSBgbWMtdGFiLWdyb3VwYCB2aWV3IHRvIGRpc3BsYXkgdGFiIGxhYmVscy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNUYWJMYWJlbFdyYXBwZXJdJyxcbiAgICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MubWMtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAgICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJyEhZGlzYWJsZWQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1RhYkxhYmVsV3JhcHBlciBleHRlbmRzIE1jVGFiTGFiZWxXcmFwcGVyTWl4aW5CYXNlIGltcGxlbWVudHMgQ2FuRGlzYWJsZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICAvKiogU2V0cyBmb2N1cyBvbiB0aGUgd3JhcHBlciBlbGVtZW50ICovXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZ2V0T2Zmc2V0TGVmdCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0TGVmdDtcbiAgICB9XG5cbiAgICBnZXRPZmZzZXRXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgfVxufVxuIl19