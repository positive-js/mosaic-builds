/**
 * @fileoverview added by tsickle
 * Generated from: progress-spinner.component.ts
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
var McProgressSpinnerBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McProgressSpinnerBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McProgressSpinnerBase;
}());
export { McProgressSpinnerBase };
if (false) {
    /** @type {?} */
    McProgressSpinnerBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export var McProgressSpinnerMixinBase = mixinColor(McProgressSpinnerBase, ThemePalette.Primary);
/** @type {?} */
var MAX_DASH_ARRAY = 273;
var McProgressSpinner = /** @class */ (function (_super) {
    __extends(McProgressSpinner, _super);
    function McProgressSpinner(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.id = "mc-progress-spinner-" + idIterator++;
        _this.value = 0;
        _this.mode = 'determinate';
        return _this;
    }
    Object.defineProperty(McProgressSpinner.prototype, "percentage", {
        get: /**
         * @return {?}
         */
        function () {
            return Math.max(MIN_PERCENT, Math.min(MAX_PERCENT, this.value)) / MAX_PERCENT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McProgressSpinner.prototype, "dashOffsetPercent", {
        get: /**
         * @return {?}
         */
        function () {
            return MAX_DASH_ARRAY - this.percentage * MAX_DASH_ARRAY + "%";
        },
        enumerable: true,
        configurable: true
    });
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
                    styles: ["@-webkit-keyframes mc-progress-spinner-indeterminate{100%{transform:rotateZ(270deg)}}@keyframes mc-progress-spinner-indeterminate{100%{transform:rotateZ(270deg)}}.mc-progress-spinner{display:inline-block;width:16px;height:16px;overflow:hidden}.mc-progress-spinner__circle{fill:none;stroke:#000;stroke-dasharray:273%;stroke-width:13%;transition:stroke-dashoffset .3s;transform-origin:center center}.mc-progress-spinner__inner{width:100%;height:100%;transform:rotateZ(-90deg)}.mc-progress-spinner__inner--indeterminate{-webkit-animation:1.5s cubic-bezier(.455,.03,.515,.955) infinite mc-progress-spinner-indeterminate;animation:1.5s cubic-bezier(.455,.03,.515,.955) infinite mc-progress-spinner-indeterminate}.mc-progress-spinner__inner--indeterminate .mc-progress-spinner__circle{stroke-dashoffset:80%}.mc-progress-spinner__svg{width:100%;height:100%}"]
                }] }
    ];
    /** @nocollapse */
    McProgressSpinner.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    McProgressSpinner.propDecorators = {
        id: [{ type: Input }],
        value: [{ type: Input }],
        mode: [{ type: Input }]
    };
    return McProgressSpinner;
}(McProgressSpinnerMixinBase));
export { McProgressSpinner };
if (false) {
    /** @type {?} */
    McProgressSpinner.prototype.id;
    /** @type {?} */
    McProgressSpinner.prototype.value;
    /** @type {?} */
    McProgressSpinner.prototype.mode;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3Mtc3Bpbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvcHJvZ3Jlc3Mtc3Bpbm5lci8iLCJzb3VyY2VzIjpbInByb2dyZXNzLXNwaW5uZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULGlCQUFpQixFQUNqQixVQUFVLEVBQ1YsS0FBSyxFQUNSLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBMEIsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDOztJQUt2RixVQUFVLEdBQUcsQ0FBQzs7SUFFWixXQUFXLEdBQUcsQ0FBQzs7SUFDZixXQUFXLEdBQUcsR0FBRztBQUV2QjtJQUNJLDZDQUE2QztJQUM3QywrQkFBbUIsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDO0lBQ2xELDRCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7Ozs7SUFEZSw0Q0FBOEI7Ozs7QUFJOUMsTUFBTSxLQUFPLDBCQUEwQixHQUNXLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDOztJQUVuRyxjQUFjLEdBQUcsR0FBRztBQUUxQjtJQVl1QyxxQ0FBMEI7SUFLN0QsMkJBQVksVUFBc0I7UUFBbEMsWUFDSSxrQkFBTSxVQUFVLENBQUMsU0FDcEI7UUFOUSxRQUFFLEdBQVcseUJBQXVCLFVBQVUsRUFBSSxDQUFDO1FBQ25ELFdBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsVUFBSSxHQUF3QixhQUFhLENBQUM7O0lBSW5ELENBQUM7SUFFRCxzQkFBSSx5Q0FBVTs7OztRQUFkO1lBQ0ksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7UUFDbEYsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxnREFBaUI7Ozs7UUFBckI7WUFDSSxPQUFVLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLGNBQWMsTUFBRyxDQUFDO1FBQ25FLENBQUM7OztPQUFBOztnQkEzQkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLGdsQkFBZ0Q7b0JBRWhELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO29CQUNqQixJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLHFCQUFxQjt3QkFDNUIsV0FBVyxFQUFFLElBQUk7cUJBQ3BCOztpQkFDSjs7OztnQkFuQ0csVUFBVTs7O3FCQXFDVCxLQUFLO3dCQUNMLEtBQUs7dUJBQ0wsS0FBSzs7SUFhVix3QkFBQztDQUFBLEFBNUJELENBWXVDLDBCQUEwQixHQWdCaEU7U0FoQlksaUJBQWlCOzs7SUFDMUIsK0JBQTREOztJQUM1RCxrQ0FBMkI7O0lBQzNCLGlDQUFtRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5Db2xvciwgQ2FuQ29sb3JDdG9yLCBtaXhpbkNvbG9yLCBUaGVtZVBhbGV0dGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cblxuZXhwb3J0IHR5cGUgUHJvZ3Jlc3NTcGlubmVyTW9kZSA9ICdkZXRlcm1pbmF0ZScgfCAnaW5kZXRlcm1pbmF0ZSc7XG5cbmxldCBpZEl0ZXJhdG9yID0gMDtcblxuY29uc3QgTUlOX1BFUkNFTlQgPSAwO1xuY29uc3QgTUFYX1BFUkNFTlQgPSAxMDA7XG5cbmV4cG9ydCBjbGFzcyBNY1Byb2dyZXNzU3Bpbm5lckJhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNQcm9ncmVzc1NwaW5uZXJNaXhpbkJhc2U6XG4gICAgQ2FuQ29sb3JDdG9yICYgdHlwZW9mIE1jUHJvZ3Jlc3NTcGlubmVyQmFzZSA9IG1peGluQ29sb3IoTWNQcm9ncmVzc1NwaW5uZXJCYXNlLCBUaGVtZVBhbGV0dGUuUHJpbWFyeSk7XG5cbmNvbnN0IE1BWF9EQVNIX0FSUkFZID0gMjczO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXByb2dyZXNzLXNwaW5uZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wcm9ncmVzcy1zcGlubmVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wcm9ncmVzcy1zcGlubmVyLnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGlucHV0czogWydjb2xvciddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1wcm9ncmVzcy1zcGlubmVyJyxcbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jUHJvZ3Jlc3NTcGlubmVyIGV4dGVuZHMgTWNQcm9ncmVzc1NwaW5uZXJNaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5Db2xvciB7XG4gICAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBtYy1wcm9ncmVzcy1zcGlubmVyLSR7aWRJdGVyYXRvcisrfWA7XG4gICAgQElucHV0KCkgdmFsdWU6IG51bWJlciA9IDA7XG4gICAgQElucHV0KCkgbW9kZTogUHJvZ3Jlc3NTcGlubmVyTW9kZSA9ICdkZXRlcm1pbmF0ZSc7XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIH1cblxuICAgIGdldCBwZXJjZW50YWdlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChNSU5fUEVSQ0VOVCwgTWF0aC5taW4oTUFYX1BFUkNFTlQsIHRoaXMudmFsdWUpKSAvIE1BWF9QRVJDRU5UO1xuICAgIH1cblxuICAgIGdldCBkYXNoT2Zmc2V0UGVyY2VudCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7TUFYX0RBU0hfQVJSQVkgLSB0aGlzLnBlcmNlbnRhZ2UgKiBNQVhfREFTSF9BUlJBWX0lYDtcbiAgICB9XG59XG4iXX0=