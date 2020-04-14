/**
 * @fileoverview added by tsickle
 * Generated from: progress-bar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { ChangeDetectionStrategy, Component, ViewEncapsulation, ElementRef, Input } from '@angular/core';
import { mixinColor, ThemePalette } from '@ptsecurity/mosaic/core';
/** @type {?} */
var idIterator = 0;
/** @type {?} */
var MIN_PERCENT = 0;
/** @type {?} */
var MAX_PERCENT = 100;
var McProgressBarBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McProgressBarBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McProgressBarBase;
}());
export { McProgressBarBase };
if (false) {
    /** @type {?} */
    McProgressBarBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export var McProgressBarMixinBase = mixinColor(McProgressBarBase, ThemePalette.Primary);
var McProgressBar = /** @class */ (function (_super) {
    __extends(McProgressBar, _super);
    function McProgressBar(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.id = "mc-progress-bar-" + idIterator++;
        _this.value = 0;
        _this.mode = 'determinate';
        return _this;
    }
    Object.defineProperty(McProgressBar.prototype, "percentage", {
        get: /**
         * @return {?}
         */
        function () {
            return Math.max(MIN_PERCENT, Math.min(MAX_PERCENT, this.value)) / MAX_PERCENT;
        },
        enumerable: true,
        configurable: true
    });
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
    McProgressBar.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    McProgressBar.propDecorators = {
        id: [{ type: Input }],
        value: [{ type: Input }],
        mode: [{ type: Input }]
    };
    return McProgressBar;
}(McProgressBarMixinBase));
export { McProgressBar };
if (false) {
    /** @type {?} */
    McProgressBar.prototype.id;
    /** @type {?} */
    McProgressBar.prototype.value;
    /** @type {?} */
    McProgressBar.prototype.mode;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9wcm9ncmVzcy1iYXIvIiwic291cmNlcyI6WyJwcm9ncmVzcy1iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULGlCQUFpQixFQUNqQixVQUFVLEVBQ1YsS0FBSyxFQUNSLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBMEIsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDOztJQUt2RixVQUFVLEdBQUcsQ0FBQzs7SUFFWixXQUFXLEdBQUcsQ0FBQzs7SUFDZixXQUFXLEdBQUcsR0FBRztBQUV2QjtJQUNJLDZDQUE2QztJQUM3QywyQkFBbUIsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDO0lBQ2xELHdCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7Ozs7SUFEZSx3Q0FBOEI7Ozs7QUFJOUMsTUFBTSxLQUFPLHNCQUFzQixHQUNXLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDO0FBRWpHO0lBWW1DLGlDQUFzQjtJQUtyRCx1QkFBWSxVQUFzQjtRQUFsQyxZQUNJLGtCQUFNLFVBQVUsQ0FBQyxTQUNwQjtRQU5RLFFBQUUsR0FBVyxxQkFBbUIsVUFBVSxFQUFJLENBQUM7UUFDL0MsV0FBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixVQUFJLEdBQW9CLGFBQWEsQ0FBQzs7SUFJL0MsQ0FBQztJQUVELHNCQUFJLHFDQUFVOzs7O1FBQWQ7WUFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztRQUNsRixDQUFDOzs7T0FBQTs7Z0JBdkJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQiw0YUFBNEM7b0JBRTVDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO29CQUNqQixJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLGlCQUFpQjt3QkFDeEIsV0FBVyxFQUFFLElBQUk7cUJBQ3BCOztpQkFDSjs7OztnQkFqQ0csVUFBVTs7O3FCQW1DVCxLQUFLO3dCQUNMLEtBQUs7dUJBQ0wsS0FBSzs7SUFTVixvQkFBQztDQUFBLEFBeEJELENBWW1DLHNCQUFzQixHQVl4RDtTQVpZLGFBQWE7OztJQUN0QiwyQkFBd0Q7O0lBQ3hELDhCQUEyQjs7SUFDM0IsNkJBQStDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkNvbG9yLCBDYW5Db2xvckN0b3IsIG1peGluQ29sb3IsIFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuXG5leHBvcnQgdHlwZSBQcm9ncmVzc0Jhck1vZGUgPSAnZGV0ZXJtaW5hdGUnIHwgJ2luZGV0ZXJtaW5hdGUnO1xuXG5sZXQgaWRJdGVyYXRvciA9IDA7XG5cbmNvbnN0IE1JTl9QRVJDRU5UID0gMDtcbmNvbnN0IE1BWF9QRVJDRU5UID0gMTAwO1xuXG5leHBvcnQgY2xhc3MgTWNQcm9ncmVzc0JhckJhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNQcm9ncmVzc0Jhck1peGluQmFzZTpcbiAgICBDYW5Db2xvckN0b3IgJiB0eXBlb2YgTWNQcm9ncmVzc0JhckJhc2UgPSBtaXhpbkNvbG9yKE1jUHJvZ3Jlc3NCYXJCYXNlLCBUaGVtZVBhbGV0dGUuUHJpbWFyeSk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtcHJvZ3Jlc3MtYmFyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcHJvZ3Jlc3MtYmFyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wcm9ncmVzcy1iYXIuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaW5wdXRzOiBbJ2NvbG9yJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXByb2dyZXNzLWJhcicsXG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1Byb2dyZXNzQmFyIGV4dGVuZHMgTWNQcm9ncmVzc0Jhck1peGluQmFzZSBpbXBsZW1lbnRzIENhbkNvbG9yIHtcbiAgICBASW5wdXQoKSBpZDogc3RyaW5nID0gYG1jLXByb2dyZXNzLWJhci0ke2lkSXRlcmF0b3IrK31gO1xuICAgIEBJbnB1dCgpIHZhbHVlOiBudW1iZXIgPSAwO1xuICAgIEBJbnB1dCgpIG1vZGU6IFByb2dyZXNzQmFyTW9kZSA9ICdkZXRlcm1pbmF0ZSc7XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIH1cblxuICAgIGdldCBwZXJjZW50YWdlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChNSU5fUEVSQ0VOVCwgTWF0aC5taW4oTUFYX1BFUkNFTlQsIHRoaXMudmFsdWUpKSAvIE1BWF9QRVJDRU5UO1xuICAgIH1cbn1cbiJdfQ==