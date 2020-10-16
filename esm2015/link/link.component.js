/**
 * @fileoverview added by tsickle
 * Generated from: link.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9saW5rLyIsInNvdXJjZXMiOlsibGluay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUNILEtBQUssRUFDTCxVQUFVLEVBRVYsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBR0gsYUFBYSxFQUNiLGFBQWEsRUFDYixTQUFTLEVBQ1osTUFBTSx5QkFBeUIsQ0FBQztBQUdqQyxNQUFNLE9BQU8sVUFBVTs7OztJQUNuQixZQUFtQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUcsQ0FBQztDQUNoRDs7O0lBRGUsZ0NBQTZCOzs7O0FBSTdDLE1BQU0sT0FBTyxlQUFlLEdBQ0osYUFBYSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQVloRSxNQUFNLE9BQU8sTUFBTyxTQUFRLGVBQWU7Ozs7OztJQWlCdkMsWUFDSSxVQUFzQixFQUNkLFlBQTBCLEVBQzFCLGNBQWlDO1FBRXpDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUhWLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUxyQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBU3RCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQzs7OztJQXhCRCxJQUNJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFVOztjQUNiLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBRWpDLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN0QztJQUNMLENBQUM7Ozs7SUFjRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNwRSxDQUFDOzs7O0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7O0lBRUQsY0FBYztRQUNWLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7SUFDekMsQ0FBQzs7O1lBL0NKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDcEIsSUFBSSxFQUFFO29CQUNGLGlCQUFpQixFQUFFLGtCQUFrQjtvQkFDckMsaUJBQWlCLEVBQUUsVUFBVTtpQkFDaEM7YUFDSjs7OztZQTlCRyxVQUFVO1lBSEwsWUFBWTtZQUtqQixpQkFBaUI7Ozt1QkErQmhCLEtBQUs7Ozs7Ozs7SUFjTiwyQkFBMEI7Ozs7O0lBSXRCLDhCQUFrQzs7Ozs7SUFDbEMsZ0NBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtcbiAgICBJbnB1dCxcbiAgICBFbGVtZW50UmVmLFxuICAgIE9uRGVzdHJveSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBEaXJlY3RpdmVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENhbkRpc2FibGUsIENhbkRpc2FibGVDdG9yLFxuICAgIEhhc1RhYkluZGV4LCBIYXNUYWJJbmRleEN0b3IsXG4gICAgbWl4aW5EaXNhYmxlZCxcbiAgICBtaXhpblRhYkluZGV4LFxuICAgIHRvQm9vbGVhblxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cblxuZXhwb3J0IGNsYXNzIE1jTGlua0Jhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNMaW5rTWl4aW5CYXNlOiBIYXNUYWJJbmRleEN0b3IgJiBDYW5EaXNhYmxlQ3RvciAmXG4gICAgdHlwZW9mIE1jTGlua0Jhc2UgPSBtaXhpblRhYkluZGV4KG1peGluRGlzYWJsZWQoTWNMaW5rQmFzZSkpO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2EubWMtbGluaycsXG4gICAgZXhwb3J0QXM6ICdtY0xpbmsnLFxuICAgIGlucHV0czogWyd0YWJJbmRleCddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCdcbiAgICB9XG59KVxuXG5leHBvcnQgY2xhc3MgTWNMaW5rIGV4dGVuZHMgTWNMaW5rTWl4aW5CYXNlIGltcGxlbWVudHMgT25EZXN0cm95LCBIYXNUYWJJbmRleCwgQ2FuRGlzYWJsZSB7XG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGFueSkge1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRvQm9vbGVhbih2YWx1ZSk7XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuXG4gICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLm1vbml0b3IoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0cnVlKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdldEhvc3RFbGVtZW50KCkuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBnZXRIb3N0RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cbn1cbiJdfQ==