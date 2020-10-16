/**
 * @fileoverview added by tsickle
 * Generated from: progress-spinner.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation, ElementRef, Input } from '@angular/core';
import { mixinColor, ThemePalette } from '@ptsecurity/mosaic/core';
/** @type {?} */
let idIterator = 0;
/** @type {?} */
const MIN_PERCENT = 0;
/** @type {?} */
const MAX_PERCENT = 100;
export class McProgressSpinnerBase {
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
    McProgressSpinnerBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export const McProgressSpinnerMixinBase = mixinColor(McProgressSpinnerBase, ThemePalette.Primary);
/** @type {?} */
const MAX_DASH_ARRAY = 273;
export class McProgressSpinner extends McProgressSpinnerMixinBase {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.id = `mc-progress-spinner-${idIterator++}`;
        this.value = 0;
        this.mode = 'determinate';
    }
    /**
     * @return {?}
     */
    get percentage() {
        return Math.max(MIN_PERCENT, Math.min(MAX_PERCENT, this.value)) / MAX_PERCENT;
    }
    /**
     * @return {?}
     */
    get dashOffsetPercent() {
        return `${MAX_DASH_ARRAY - this.percentage * MAX_DASH_ARRAY}%`;
    }
}
McProgressSpinner.decorators = [
    { type: Component, args: [{
                selector: 'mc-progress-spinner',
                template: "<div class=\"mc-progress-spinner__inner\"\n     [ngClass]=\"{'mc-progress-spinner__inner--indeterminate': mode === 'indeterminate'}\">\n    <svg focusable=\"false\"\n         preserveAspectRatio=\"xMidYMid meet\"\n         viewBox=\"0 0 100 100\"\n         class=\"mc-progress-spinner__svg\">\n        <circle cx=\"50%\"\n                cy=\"50%\"\n                r=\"42.5%\"\n                class=\"mc-progress-spinner__circle\"\n                [ngStyle]=\"{'stroke-dashoffset': mode === 'determinate' ? dashOffsetPercent : null}\">\n        </circle>\n    </svg>\n</div>\n\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                inputs: ['color'],
                host: {
                    class: 'mc-progress-spinner',
                    '[attr.id]': 'id'
                },
                styles: ["@-webkit-keyframes mc-progress-spinner-indeterminate{to{transform:rotate(270deg)}}@keyframes mc-progress-spinner-indeterminate{to{transform:rotate(270deg)}}.mc-progress-spinner{display:inline-block;height:16px;overflow:hidden;width:16px}.mc-progress-spinner__circle{fill:none;stroke:#000;stroke-dasharray:273%;stroke-width:13%;transform-origin:center center;transition:stroke-dashoffset .3s}.mc-progress-spinner__inner{height:100%;transform:rotate(-90deg);width:100%}.mc-progress-spinner__inner--indeterminate{-webkit-animation:mc-progress-spinner-indeterminate 1.5s cubic-bezier(.455,.03,.515,.955) infinite;animation:mc-progress-spinner-indeterminate 1.5s cubic-bezier(.455,.03,.515,.955) infinite}.mc-progress-spinner__inner--indeterminate .mc-progress-spinner__circle{stroke-dashoffset:80%}.mc-progress-spinner__svg{height:100%;width:100%}"]
            }] }
];
/** @nocollapse */
McProgressSpinner.ctorParameters = () => [
    { type: ElementRef }
];
McProgressSpinner.propDecorators = {
    id: [{ type: Input }],
    value: [{ type: Input }],
    mode: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    McProgressSpinner.prototype.id;
    /** @type {?} */
    McProgressSpinner.prototype.value;
    /** @type {?} */
    McProgressSpinner.prototype.mode;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3Mtc3Bpbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9wcm9ncmVzcy1zcGlubmVyLyIsInNvdXJjZXMiOlsicHJvZ3Jlc3Mtc3Bpbm5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsVUFBVSxFQUNWLEtBQUssRUFDUixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQTBCLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7SUFLdkYsVUFBVSxHQUFHLENBQUM7O01BRVosV0FBVyxHQUFHLENBQUM7O01BQ2YsV0FBVyxHQUFHLEdBQUc7QUFFdkIsTUFBTSxPQUFPLHFCQUFxQjs7Ozs7SUFFOUIsWUFBbUIsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDO0NBQ2pEOzs7SUFEZSw0Q0FBOEI7Ozs7QUFJOUMsTUFBTSxPQUFPLDBCQUEwQixHQUNXLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDOztNQUVuRyxjQUFjLEdBQUcsR0FBRztBQWMxQixNQUFNLE9BQU8saUJBQWtCLFNBQVEsMEJBQTBCOzs7O0lBSzdELFlBQVksVUFBc0I7UUFDOUIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBTGIsT0FBRSxHQUFXLHVCQUF1QixVQUFVLEVBQUUsRUFBRSxDQUFDO1FBQ25ELFVBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsU0FBSSxHQUF3QixhQUFhLENBQUM7SUFJbkQsQ0FBQzs7OztJQUVELElBQUksVUFBVTtRQUNWLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDO0lBQ2xGLENBQUM7Ozs7SUFFRCxJQUFJLGlCQUFpQjtRQUNqQixPQUFPLEdBQUcsY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsY0FBYyxHQUFHLENBQUM7SUFDbkUsQ0FBQzs7O1lBM0JKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixnbEJBQWdEO2dCQUVoRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxxQkFBcUI7b0JBQzVCLFdBQVcsRUFBRSxJQUFJO2lCQUNwQjs7YUFDSjs7OztZQW5DRyxVQUFVOzs7aUJBcUNULEtBQUs7b0JBQ0wsS0FBSzttQkFDTCxLQUFLOzs7O0lBRk4sK0JBQTREOztJQUM1RCxrQ0FBMkI7O0lBQzNCLGlDQUFtRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5Db2xvciwgQ2FuQ29sb3JDdG9yLCBtaXhpbkNvbG9yLCBUaGVtZVBhbGV0dGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cblxuZXhwb3J0IHR5cGUgUHJvZ3Jlc3NTcGlubmVyTW9kZSA9ICdkZXRlcm1pbmF0ZScgfCAnaW5kZXRlcm1pbmF0ZSc7XG5cbmxldCBpZEl0ZXJhdG9yID0gMDtcblxuY29uc3QgTUlOX1BFUkNFTlQgPSAwO1xuY29uc3QgTUFYX1BFUkNFTlQgPSAxMDA7XG5cbmV4cG9ydCBjbGFzcyBNY1Byb2dyZXNzU3Bpbm5lckJhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNQcm9ncmVzc1NwaW5uZXJNaXhpbkJhc2U6XG4gICAgQ2FuQ29sb3JDdG9yICYgdHlwZW9mIE1jUHJvZ3Jlc3NTcGlubmVyQmFzZSA9IG1peGluQ29sb3IoTWNQcm9ncmVzc1NwaW5uZXJCYXNlLCBUaGVtZVBhbGV0dGUuUHJpbWFyeSk7XG5cbmNvbnN0IE1BWF9EQVNIX0FSUkFZID0gMjczO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXByb2dyZXNzLXNwaW5uZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wcm9ncmVzcy1zcGlubmVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wcm9ncmVzcy1zcGlubmVyLnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGlucHV0czogWydjb2xvciddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1wcm9ncmVzcy1zcGlubmVyJyxcbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jUHJvZ3Jlc3NTcGlubmVyIGV4dGVuZHMgTWNQcm9ncmVzc1NwaW5uZXJNaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5Db2xvciB7XG4gICAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBtYy1wcm9ncmVzcy1zcGlubmVyLSR7aWRJdGVyYXRvcisrfWA7XG4gICAgQElucHV0KCkgdmFsdWU6IG51bWJlciA9IDA7XG4gICAgQElucHV0KCkgbW9kZTogUHJvZ3Jlc3NTcGlubmVyTW9kZSA9ICdkZXRlcm1pbmF0ZSc7XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIH1cblxuICAgIGdldCBwZXJjZW50YWdlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChNSU5fUEVSQ0VOVCwgTWF0aC5taW4oTUFYX1BFUkNFTlQsIHRoaXMudmFsdWUpKSAvIE1BWF9QRVJDRU5UO1xuICAgIH1cblxuICAgIGdldCBkYXNoT2Zmc2V0UGVyY2VudCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7TUFYX0RBU0hfQVJSQVkgLSB0aGlzLnBlcmNlbnRhZ2UgKiBNQVhfREFTSF9BUlJBWX0lYDtcbiAgICB9XG59XG4iXX0=