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
export const McProgressBarMixinBase = mixinColor(McProgressBarBase);
export class McProgressBar extends McProgressBarMixinBase {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.id = `mc-progress-bar-${idIterator++}`;
        this.value = 0;
        this.mode = 'determinate';
        this.color = ThemePalette.Primary;
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
    mode: [{ type: Input }],
    color: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    McProgressBar.prototype.id;
    /** @type {?} */
    McProgressBar.prototype.value;
    /** @type {?} */
    McProgressBar.prototype.mode;
    /** @type {?} */
    McProgressBar.prototype.color;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9wcm9ncmVzcy1iYXIvIiwic291cmNlcyI6WyJwcm9ncmVzcy1iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLFVBQVUsRUFDVixLQUFLLEVBQ1IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUEwQixVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7O0lBS3ZGLFVBQVUsR0FBRyxDQUFDOztNQUVaLFdBQVcsR0FBRyxDQUFDOztNQUNmLFdBQVcsR0FBRyxHQUFHO0FBRXZCLE1BQU0sT0FBTyxpQkFBaUI7Ozs7O0lBRTFCLFlBQW1CLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lBQUcsQ0FBQztDQUNqRDs7O0lBRGUsd0NBQThCOzs7O0FBSTlDLE1BQU0sT0FBTyxzQkFBc0IsR0FHM0IsVUFBVSxDQUFDLGlCQUFpQixDQUFDO0FBYXJDLE1BQU0sT0FBTyxhQUFjLFNBQVEsc0JBQXNCOzs7O0lBTXJELFlBQVksVUFBc0I7UUFDOUIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBTmIsT0FBRSxHQUFXLG1CQUFtQixVQUFVLEVBQUUsRUFBRSxDQUFDO1FBQy9DLFVBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsU0FBSSxHQUFvQixhQUFhLENBQUM7UUFDdEMsVUFBSyxHQUFpQixZQUFZLENBQUMsT0FBTyxDQUFDO0lBSXBELENBQUM7Ozs7SUFFRCxJQUFJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztJQUNsRixDQUFDOzs7WUF2QkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLDRhQUE0QztnQkFFNUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLGlCQUFpQjtvQkFDeEIsV0FBVyxFQUFFLElBQUk7aUJBQ3BCOzthQUNKOzs7O1lBbENHLFVBQVU7OztpQkFvQ1QsS0FBSztvQkFDTCxLQUFLO21CQUNMLEtBQUs7b0JBQ0wsS0FBSzs7OztJQUhOLDJCQUF3RDs7SUFDeEQsOEJBQTJCOztJQUMzQiw2QkFBK0M7O0lBQy9DLDhCQUFvRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5Db2xvciwgQ2FuQ29sb3JDdG9yLCBtaXhpbkNvbG9yLCBUaGVtZVBhbGV0dGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cblxuZXhwb3J0IHR5cGUgUHJvZ3Jlc3NCYXJNb2RlID0gJ2RldGVybWluYXRlJyB8ICdpbmRldGVybWluYXRlJztcblxubGV0IGlkSXRlcmF0b3IgPSAwO1xuXG5jb25zdCBNSU5fUEVSQ0VOVCA9IDA7XG5jb25zdCBNQVhfUEVSQ0VOVCA9IDEwMDtcblxuZXhwb3J0IGNsYXNzIE1jUHJvZ3Jlc3NCYXJCYXNlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jUHJvZ3Jlc3NCYXJNaXhpbkJhc2U6XG4gICAgQ2FuQ29sb3JDdG9yICZcbiAgICB0eXBlb2YgTWNQcm9ncmVzc0JhckJhc2UgPVxuICAgICAgICBtaXhpbkNvbG9yKE1jUHJvZ3Jlc3NCYXJCYXNlKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1wcm9ncmVzcy1iYXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wcm9ncmVzcy1iYXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3Byb2dyZXNzLWJhci5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtcHJvZ3Jlc3MtYmFyJyxcbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jUHJvZ3Jlc3NCYXIgZXh0ZW5kcyBNY1Byb2dyZXNzQmFyTWl4aW5CYXNlIGltcGxlbWVudHMgQ2FuQ29sb3Ige1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgbWMtcHJvZ3Jlc3MtYmFyLSR7aWRJdGVyYXRvcisrfWA7XG4gICAgQElucHV0KCkgdmFsdWU6IG51bWJlciA9IDA7XG4gICAgQElucHV0KCkgbW9kZTogUHJvZ3Jlc3NCYXJNb2RlID0gJ2RldGVybWluYXRlJztcbiAgICBASW5wdXQoKSBjb2xvcjogVGhlbWVQYWxldHRlID0gVGhlbWVQYWxldHRlLlByaW1hcnk7XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIH1cblxuICAgIGdldCBwZXJjZW50YWdlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChNSU5fUEVSQ0VOVCwgTWF0aC5taW4oTUFYX1BFUkNFTlQsIHRoaXMudmFsdWUpKSAvIE1BWF9QRVJDRU5UO1xuICAgIH1cbn1cbiJdfQ==