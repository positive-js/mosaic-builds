/**
 * @fileoverview added by tsickle
 * Generated from: progress-bar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation, ElementRef, Input } from '@angular/core';
import { mixinColor, ThemePalette } from '@ptsecurity/mosaic/core';
/** @type {?} */
let idIterator = 0;
/** @type {?} */
const MIN_PERCENT = 0;
/** @type {?} */
const MAX_PERCENT = 100;
export class McProgressBarBase {
    // tslint:disable-next-line:naming-convention
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
if (false) {
    /** @type {?} */
    McProgressBarBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export const McProgressBarMixinBase = mixinColor(McProgressBarBase, ThemePalette.Primary);
export class McProgressBar extends McProgressBarMixinBase {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.id = `mc-progress-bar-${idIterator++}`;
        this.value = 0;
        this.mode = 'determinate';
    }
    /**
     * @return {?}
     */
    get percentage() {
        return Math.max(MIN_PERCENT, Math.min(MAX_PERCENT, this.value)) / MAX_PERCENT;
    }
}
McProgressBar.decorators = [
    { type: Component, args: [{
                selector: 'mc-progress-bar',
                template: "\n<div class=\"mc-progress-bar__inner\" [ngSwitch]=\"mode\" [id]=\"id\">\n    <div\n        *ngSwitchCase=\"'indeterminate'\"\n        class=\"mc-progress-bar__line mc-progress-bar__line--indeterminate\">\n    </div>\n    <div\n        *ngSwitchDefault\n        class=\"mc-progress-bar__line mc-progress-bar__line--determinate\"\n        [ngStyle]=\"{transform: 'scaleX(' + percentage + ')'}\">\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                inputs: ['color'],
                host: {
                    class: 'mc-progress-bar',
                    '[attr.id]': 'id'
                },
                styles: ["@-webkit-keyframes mc-progress-bar-indeterminate{0%{transform:scaleX(.25) translateX(-150%)}100%{transform:scaleX(.4) translateX(250%)}}@keyframes mc-progress-bar-indeterminate{0%{transform:scaleX(.25) translateX(-150%)}100%{transform:scaleX(.4) translateX(250%)}}.mc-progress-bar{display:block;height:4px;overflow:hidden}.mc-progress-bar__inner{height:100%}.mc-progress-bar__line{height:100%;transform-origin:top left}.mc-progress-bar__line--determinate{transition:transform .3s}.mc-progress-bar__line--indeterminate{-webkit-animation:2.1s cubic-bezier(.455,.03,.515,.955) infinite mc-progress-bar-indeterminate;animation:2.1s cubic-bezier(.455,.03,.515,.955) infinite mc-progress-bar-indeterminate}"]
            }] }
];
/** @nocollapse */
McProgressBar.ctorParameters = () => [
    { type: ElementRef }
];
McProgressBar.propDecorators = {
    id: [{ type: Input }],
    value: [{ type: Input }],
    mode: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    McProgressBar.prototype.id;
    /** @type {?} */
    McProgressBar.prototype.value;
    /** @type {?} */
    McProgressBar.prototype.mode;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9wcm9ncmVzcy1iYXIvIiwic291cmNlcyI6WyJwcm9ncmVzcy1iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLFVBQVUsRUFDVixLQUFLLEVBQ1IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUEwQixVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7O0lBS3ZGLFVBQVUsR0FBRyxDQUFDOztNQUVaLFdBQVcsR0FBRyxDQUFDOztNQUNmLFdBQVcsR0FBRyxHQUFHO0FBRXZCLE1BQU0sT0FBTyxpQkFBaUI7Ozs7O0lBRTFCLFlBQW1CLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lBQUcsQ0FBQztDQUNqRDs7O0lBRGUsd0NBQThCOzs7O0FBSTlDLE1BQU0sT0FBTyxzQkFBc0IsR0FDVyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQztBQWNqRyxNQUFNLE9BQU8sYUFBYyxTQUFRLHNCQUFzQjs7OztJQUtyRCxZQUFZLFVBQXNCO1FBQzlCLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUxiLE9BQUUsR0FBVyxtQkFBbUIsVUFBVSxFQUFFLEVBQUUsQ0FBQztRQUMvQyxVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFNBQUksR0FBb0IsYUFBYSxDQUFDO0lBSS9DLENBQUM7Ozs7SUFFRCxJQUFJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztJQUNsRixDQUFDOzs7WUF2QkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLDRhQUE0QztnQkFFNUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsaUJBQWlCO29CQUN4QixXQUFXLEVBQUUsSUFBSTtpQkFDcEI7O2FBQ0o7Ozs7WUFqQ0csVUFBVTs7O2lCQW1DVCxLQUFLO29CQUNMLEtBQUs7bUJBQ0wsS0FBSzs7OztJQUZOLDJCQUF3RDs7SUFDeEQsOEJBQTJCOztJQUMzQiw2QkFBK0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuQ29sb3IsIENhbkNvbG9yQ3RvciwgbWl4aW5Db2xvciwgVGhlbWVQYWxldHRlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5cbmV4cG9ydCB0eXBlIFByb2dyZXNzQmFyTW9kZSA9ICdkZXRlcm1pbmF0ZScgfCAnaW5kZXRlcm1pbmF0ZSc7XG5cbmxldCBpZEl0ZXJhdG9yID0gMDtcblxuY29uc3QgTUlOX1BFUkNFTlQgPSAwO1xuY29uc3QgTUFYX1BFUkNFTlQgPSAxMDA7XG5cbmV4cG9ydCBjbGFzcyBNY1Byb2dyZXNzQmFyQmFzZSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1Byb2dyZXNzQmFyTWl4aW5CYXNlOlxuICAgIENhbkNvbG9yQ3RvciAmIHR5cGVvZiBNY1Byb2dyZXNzQmFyQmFzZSA9IG1peGluQ29sb3IoTWNQcm9ncmVzc0JhckJhc2UsIFRoZW1lUGFsZXR0ZS5QcmltYXJ5KTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1wcm9ncmVzcy1iYXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wcm9ncmVzcy1iYXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3Byb2dyZXNzLWJhci5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBpbnB1dHM6IFsnY29sb3InXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtcHJvZ3Jlc3MtYmFyJyxcbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jUHJvZ3Jlc3NCYXIgZXh0ZW5kcyBNY1Byb2dyZXNzQmFyTWl4aW5CYXNlIGltcGxlbWVudHMgQ2FuQ29sb3Ige1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgbWMtcHJvZ3Jlc3MtYmFyLSR7aWRJdGVyYXRvcisrfWA7XG4gICAgQElucHV0KCkgdmFsdWU6IG51bWJlciA9IDA7XG4gICAgQElucHV0KCkgbW9kZTogUHJvZ3Jlc3NCYXJNb2RlID0gJ2RldGVybWluYXRlJztcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgfVxuXG4gICAgZ2V0IHBlcmNlbnRhZ2UoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1JTl9QRVJDRU5ULCBNYXRoLm1pbihNQVhfUEVSQ0VOVCwgdGhpcy52YWx1ZSkpIC8gTUFYX1BFUkNFTlQ7XG4gICAgfVxufVxuIl19