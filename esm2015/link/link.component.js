/**
 * @fileoverview added by tsickle
 * Generated from: link.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { Input, ElementRef, ChangeDetectorRef, Directive } from '@angular/core';
import { mixinDisabled, mixinTabIndex, toBoolean } from '@ptsecurity/mosaic/core';
export class McLinkBase {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
if (false) {
    /** @type {?} */
    McLinkBase.prototype.elementRef;
}
// tslint:disable-next-line: naming-convention
/** @type {?} */
export const McLinkMixinBase = mixinTabIndex(mixinDisabled(McLinkBase));
export class McLink extends McLinkMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} focusMonitor
     * @param {?} changeDetector
     */
    constructor(elementRef, focusMonitor, changeDetector) {
        super(elementRef);
        this.focusMonitor = focusMonitor;
        this.changeDetector = changeDetector;
        this._disabled = false;
        this.focusMonitor.monitor(elementRef.nativeElement, true);
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        /** @type {?} */
        const newValue = toBoolean(value);
        if (newValue !== this._disabled) {
            this._disabled = newValue;
            this.changeDetector.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }
    /**
     * @return {?}
     */
    focus() {
        this.getHostElement().focus();
    }
    /**
     * @return {?}
     */
    getHostElement() {
        return this.elementRef.nativeElement;
    }
}
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
McLink.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor },
    { type: ChangeDetectorRef }
];
McLink.propDecorators = {
    disabled: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvbGluay8iLCJzb3VyY2VzIjpbImxpbmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFDSCxLQUFLLEVBQ0wsVUFBVSxFQUVWLGlCQUFpQixFQUNqQixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUdILGFBQWEsRUFDYixhQUFhLEVBQ2IsU0FBUyxFQUNaLE1BQU0seUJBQXlCLENBQUM7QUFHakMsTUFBTSxPQUFPLFVBQVU7Ozs7SUFDbkIsWUFBbUIsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFHLENBQUM7Q0FDaEQ7OztJQURlLGdDQUE2Qjs7OztBQUk3QyxNQUFNLE9BQU8sZUFBZSxHQUNKLGFBQWEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7QUFZaEUsTUFBTSxPQUFPLE1BQU8sU0FBUSxlQUFlOzs7Ozs7SUFpQnZDLFlBQ0ksVUFBc0IsRUFDZCxZQUEwQixFQUMxQixjQUFpQztRQUV6QyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFIVixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFMckMsY0FBUyxHQUFHLEtBQUssQ0FBQztRQVN0QixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUM7Ozs7SUF4QkQsSUFDSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7Ozs7O0lBRUQsSUFBSSxRQUFRLENBQUMsS0FBVTs7Y0FDYixRQUFRLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUVqQyxJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdEM7SUFDTCxDQUFDOzs7O0lBY0QsV0FBVztRQUNQLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7OztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7OztJQUVELGNBQWM7UUFDVixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQ3pDLENBQUM7OztZQS9DSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3BCLElBQUksRUFBRTtvQkFDRixpQkFBaUIsRUFBRSxrQkFBa0I7b0JBQ3JDLGlCQUFpQixFQUFFLFVBQVU7aUJBQ2hDO2FBQ0o7Ozs7WUE5QkcsVUFBVTtZQUhMLFlBQVk7WUFLakIsaUJBQWlCOzs7dUJBK0JoQixLQUFLOzs7Ozs7O0lBY04sMkJBQTBCOzs7OztJQUl0Qiw4QkFBa0M7Ozs7O0lBQ2xDLGdDQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7XG4gICAgSW5wdXQsXG4gICAgRWxlbWVudFJlZixcbiAgICBPbkRlc3Ryb3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgRGlyZWN0aXZlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDYW5EaXNhYmxlLCBDYW5EaXNhYmxlQ3RvcixcbiAgICBIYXNUYWJJbmRleCwgSGFzVGFiSW5kZXhDdG9yLFxuICAgIG1peGluRGlzYWJsZWQsXG4gICAgbWl4aW5UYWJJbmRleCxcbiAgICB0b0Jvb2xlYW5cbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5cbmV4cG9ydCBjbGFzcyBNY0xpbmtCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jTGlua01peGluQmFzZTogSGFzVGFiSW5kZXhDdG9yICYgQ2FuRGlzYWJsZUN0b3IgJlxuICAgIHR5cGVvZiBNY0xpbmtCYXNlID0gbWl4aW5UYWJJbmRleChtaXhpbkRpc2FibGVkKE1jTGlua0Jhc2UpKTtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdhLm1jLWxpbmsnLFxuICAgIGV4cG9ydEFzOiAnbWNMaW5rJyxcbiAgICBpbnB1dHM6IFsndGFiSW5kZXgnXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXgnXG4gICAgfVxufSlcblxuZXhwb3J0IGNsYXNzIE1jTGluayBleHRlbmRzIE1jTGlua01peGluQmFzZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgSGFzVGFiSW5kZXgsIENhbkRpc2FibGUge1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0b0Jvb2xlYW4odmFsdWUpO1xuXG4gICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gbmV3VmFsdWU7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5tb25pdG9yKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nZXRIb3N0RWxlbWVudCgpLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZ2V0SG9zdEVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG59XG4iXX0=