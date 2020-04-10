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
export var McProgressBarMixinBase = mixinColor(McProgressBarBase);
var McProgressBar = /** @class */ (function (_super) {
    __extends(McProgressBar, _super);
    function McProgressBar(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.id = "mc-progress-bar-" + idIterator++;
        _this.value = 0;
        _this.mode = 'determinate';
        _this.color = ThemePalette.Primary;
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
        mode: [{ type: Input }],
        color: [{ type: Input }]
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
    /** @type {?} */
    McProgressBar.prototype.color;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9wcm9ncmVzcy1iYXIvIiwic291cmNlcyI6WyJwcm9ncmVzcy1iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULGlCQUFpQixFQUNqQixVQUFVLEVBQ1YsS0FBSyxFQUNSLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBMEIsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDOztJQUt2RixVQUFVLEdBQUcsQ0FBQzs7SUFFWixXQUFXLEdBQUcsQ0FBQzs7SUFDZixXQUFXLEdBQUcsR0FBRztBQUV2QjtJQUNJLDZDQUE2QztJQUM3QywyQkFBbUIsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDO0lBQ2xELHdCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7Ozs7SUFEZSx3Q0FBOEI7Ozs7QUFJOUMsTUFBTSxLQUFPLHNCQUFzQixHQUczQixVQUFVLENBQUMsaUJBQWlCLENBQUM7QUFFckM7SUFXbUMsaUNBQXNCO0lBTXJELHVCQUFZLFVBQXNCO1FBQWxDLFlBQ0ksa0JBQU0sVUFBVSxDQUFDLFNBQ3BCO1FBUFEsUUFBRSxHQUFXLHFCQUFtQixVQUFVLEVBQUksQ0FBQztRQUMvQyxXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFVBQUksR0FBb0IsYUFBYSxDQUFDO1FBQ3RDLFdBQUssR0FBaUIsWUFBWSxDQUFDLE9BQU8sQ0FBQzs7SUFJcEQsQ0FBQztJQUVELHNCQUFJLHFDQUFVOzs7O1FBQWQ7WUFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztRQUNsRixDQUFDOzs7T0FBQTs7Z0JBdkJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQiw0YUFBNEM7b0JBRTVDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsSUFBSSxFQUFFO3dCQUNGLEtBQUssRUFBRSxpQkFBaUI7d0JBQ3hCLFdBQVcsRUFBRSxJQUFJO3FCQUNwQjs7aUJBQ0o7Ozs7Z0JBbENHLFVBQVU7OztxQkFvQ1QsS0FBSzt3QkFDTCxLQUFLO3VCQUNMLEtBQUs7d0JBQ0wsS0FBSzs7SUFTVixvQkFBQztDQUFBLEFBeEJELENBV21DLHNCQUFzQixHQWF4RDtTQWJZLGFBQWE7OztJQUN0QiwyQkFBd0Q7O0lBQ3hELDhCQUEyQjs7SUFDM0IsNkJBQStDOztJQUMvQyw4QkFBb0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuQ29sb3IsIENhbkNvbG9yQ3RvciwgbWl4aW5Db2xvciwgVGhlbWVQYWxldHRlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5cbmV4cG9ydCB0eXBlIFByb2dyZXNzQmFyTW9kZSA9ICdkZXRlcm1pbmF0ZScgfCAnaW5kZXRlcm1pbmF0ZSc7XG5cbmxldCBpZEl0ZXJhdG9yID0gMDtcblxuY29uc3QgTUlOX1BFUkNFTlQgPSAwO1xuY29uc3QgTUFYX1BFUkNFTlQgPSAxMDA7XG5cbmV4cG9ydCBjbGFzcyBNY1Byb2dyZXNzQmFyQmFzZSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1Byb2dyZXNzQmFyTWl4aW5CYXNlOlxuICAgIENhbkNvbG9yQ3RvciAmXG4gICAgdHlwZW9mIE1jUHJvZ3Jlc3NCYXJCYXNlID1cbiAgICAgICAgbWl4aW5Db2xvcihNY1Byb2dyZXNzQmFyQmFzZSk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtcHJvZ3Jlc3MtYmFyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcHJvZ3Jlc3MtYmFyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wcm9ncmVzcy1iYXIuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXByb2dyZXNzLWJhcicsXG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1Byb2dyZXNzQmFyIGV4dGVuZHMgTWNQcm9ncmVzc0Jhck1peGluQmFzZSBpbXBsZW1lbnRzIENhbkNvbG9yIHtcbiAgICBASW5wdXQoKSBpZDogc3RyaW5nID0gYG1jLXByb2dyZXNzLWJhci0ke2lkSXRlcmF0b3IrK31gO1xuICAgIEBJbnB1dCgpIHZhbHVlOiBudW1iZXIgPSAwO1xuICAgIEBJbnB1dCgpIG1vZGU6IFByb2dyZXNzQmFyTW9kZSA9ICdkZXRlcm1pbmF0ZSc7XG4gICAgQElucHV0KCkgY29sb3I6IFRoZW1lUGFsZXR0ZSA9IFRoZW1lUGFsZXR0ZS5QcmltYXJ5O1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB9XG5cbiAgICBnZXQgcGVyY2VudGFnZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoTUlOX1BFUkNFTlQsIE1hdGgubWluKE1BWF9QRVJDRU5ULCB0aGlzLnZhbHVlKSkgLyBNQVhfUEVSQ0VOVDtcbiAgICB9XG59XG4iXX0=