/**
 * @fileoverview added by tsickle
 * Generated from: tab-label-wrapper.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef } from '@angular/core';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
// Boilerplate for applying mixins to McTabLabelWrapper.
/**
 * \@docs-private
 */
export class McTabLabelWrapperBase {
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export const McTabLabelWrapperMixinBase = mixinDisabled(McTabLabelWrapperBase);
/**
 * Used in the `mc-tab-group` view to display tab labels.
 * \@docs-private
 */
export class McTabLabelWrapper extends McTabLabelWrapperMixinBase {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super();
        this.elementRef = elementRef;
    }
    /**
     * Sets focus on the wrapper element
     * @return {?}
     */
    focus() {
        this.elementRef.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    getOffsetLeft() {
        return this.elementRef.nativeElement.offsetLeft;
    }
    /**
     * @return {?}
     */
    getOffsetWidth() {
        return this.elementRef.nativeElement.offsetWidth;
    }
}
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
McTabLabelWrapper.ctorParameters = () => [
    { type: ElementRef }
];
if (false) {
    /** @type {?} */
    McTabLabelWrapper.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxhYmVsLXdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy90YWJzLyIsInNvdXJjZXMiOlsidGFiLWxhYmVsLXdyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBR0gsYUFBYSxFQUNoQixNQUFNLHlCQUF5QixDQUFDOzs7OztBQUtqQyxNQUFNLE9BQU8scUJBQXFCO0NBQUc7OztBQUVyQyxNQUFNLE9BQU8sMEJBQTBCLEdBQ0osYUFBYSxDQUFDLHFCQUFxQixDQUFDOzs7OztBQWN2RSxNQUFNLE9BQU8saUJBQWtCLFNBQVEsMEJBQTBCOzs7O0lBQzdELFlBQW1CLFVBQXNCO1FBQ3JDLEtBQUssRUFBRSxDQUFDO1FBRE8sZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUV6QyxDQUFDOzs7OztJQUdELEtBQUs7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMxQyxDQUFDOzs7O0lBRUQsYUFBYTtRQUNULE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO0lBQ3BELENBQUM7Ozs7SUFFRCxjQUFjO1FBQ1YsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7SUFDckQsQ0FBQzs7O1lBeEJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3BCLElBQUksRUFBRTtvQkFDRixxQkFBcUIsRUFBRSxVQUFVO29CQUNqQyxzQkFBc0IsRUFBRSxZQUFZO2lCQUN2QzthQUNKOzs7O1lBMUJtQixVQUFVOzs7O0lBNEJkLHVDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDYW5EaXNhYmxlLFxuICAgIENhbkRpc2FibGVDdG9yLFxuICAgIG1peGluRGlzYWJsZWRcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWNUYWJMYWJlbFdyYXBwZXIuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNsYXNzIE1jVGFiTGFiZWxXcmFwcGVyQmFzZSB7fVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNUYWJMYWJlbFdyYXBwZXJNaXhpbkJhc2U6IENhbkRpc2FibGVDdG9yICZcbiAgICB0eXBlb2YgTWNUYWJMYWJlbFdyYXBwZXJCYXNlID0gbWl4aW5EaXNhYmxlZChNY1RhYkxhYmVsV3JhcHBlckJhc2UpO1xuXG4vKipcbiAqIFVzZWQgaW4gdGhlIGBtYy10YWItZ3JvdXBgIHZpZXcgdG8gZGlzcGxheSB0YWIgbGFiZWxzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY1RhYkxhYmVsV3JhcHBlcl0nLFxuICAgIGlucHV0czogWydkaXNhYmxlZCddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnISFkaXNhYmxlZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVGFiTGFiZWxXcmFwcGVyIGV4dGVuZHMgTWNUYWJMYWJlbFdyYXBwZXJNaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5EaXNhYmxlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8qKiBTZXRzIGZvY3VzIG9uIHRoZSB3cmFwcGVyIGVsZW1lbnQgKi9cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBnZXRPZmZzZXRMZWZ0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRMZWZ0O1xuICAgIH1cblxuICAgIGdldE9mZnNldFdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICB9XG59XG4iXX0=