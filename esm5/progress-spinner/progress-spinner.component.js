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
export var McProgressSpinnerMixinBase = mixinColor(McProgressSpinnerBase);
/** @type {?} */
var MAX_DASH_ARRAY = 273;
var McProgressSpinner = /** @class */ (function (_super) {
    __extends(McProgressSpinner, _super);
    function McProgressSpinner(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.id = "mc-progress-spinner-" + idIterator++;
        _this.value = 0;
        _this.mode = 'determinate';
        _this.color = ThemePalette.Primary;
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
        mode: [{ type: Input }],
        color: [{ type: Input }]
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
    /** @type {?} */
    McProgressSpinner.prototype.color;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3Mtc3Bpbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvcHJvZ3Jlc3Mtc3Bpbm5lci8iLCJzb3VyY2VzIjpbInByb2dyZXNzLXNwaW5uZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULGlCQUFpQixFQUNqQixVQUFVLEVBQ1YsS0FBSyxFQUNSLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBMEIsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDOztJQUt2RixVQUFVLEdBQUcsQ0FBQzs7SUFFWixXQUFXLEdBQUcsQ0FBQzs7SUFDZixXQUFXLEdBQUcsR0FBRztBQUV2QjtJQUNJLDZDQUE2QztJQUM3QywrQkFBbUIsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDO0lBQ2xELDRCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7Ozs7SUFEZSw0Q0FBOEI7Ozs7QUFJOUMsTUFBTSxLQUFPLDBCQUEwQixHQUcvQixVQUFVLENBQUMscUJBQXFCLENBQUM7O0lBRW5DLGNBQWMsR0FBRyxHQUFHO0FBRTFCO0lBV3VDLHFDQUEwQjtJQU03RCwyQkFBWSxVQUFzQjtRQUFsQyxZQUNJLGtCQUFNLFVBQVUsQ0FBQyxTQUNwQjtRQVBRLFFBQUUsR0FBVyx5QkFBdUIsVUFBVSxFQUFJLENBQUM7UUFDbkQsV0FBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixVQUFJLEdBQXdCLGFBQWEsQ0FBQztRQUMxQyxXQUFLLEdBQWlCLFlBQVksQ0FBQyxPQUFPLENBQUM7O0lBSXBELENBQUM7SUFFRCxzQkFBSSx5Q0FBVTs7OztRQUFkO1lBQ0ksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7UUFDbEYsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxnREFBaUI7Ozs7UUFBckI7WUFDSSxPQUFVLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLGNBQWMsTUFBRyxDQUFDO1FBQ25FLENBQUM7OztPQUFBOztnQkEzQkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLGdsQkFBZ0Q7b0JBRWhELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsSUFBSSxFQUFFO3dCQUNGLEtBQUssRUFBRSxxQkFBcUI7d0JBQzVCLFdBQVcsRUFBRSxJQUFJO3FCQUNwQjs7aUJBQ0o7Ozs7Z0JBcENHLFVBQVU7OztxQkFzQ1QsS0FBSzt3QkFDTCxLQUFLO3VCQUNMLEtBQUs7d0JBQ0wsS0FBSzs7SUFhVix3QkFBQztDQUFBLEFBNUJELENBV3VDLDBCQUEwQixHQWlCaEU7U0FqQlksaUJBQWlCOzs7SUFDMUIsK0JBQTREOztJQUM1RCxrQ0FBMkI7O0lBQzNCLGlDQUFtRDs7SUFDbkQsa0NBQW9EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkNvbG9yLCBDYW5Db2xvckN0b3IsIG1peGluQ29sb3IsIFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuXG5leHBvcnQgdHlwZSBQcm9ncmVzc1NwaW5uZXJNb2RlID0gJ2RldGVybWluYXRlJyB8ICdpbmRldGVybWluYXRlJztcblxubGV0IGlkSXRlcmF0b3IgPSAwO1xuXG5jb25zdCBNSU5fUEVSQ0VOVCA9IDA7XG5jb25zdCBNQVhfUEVSQ0VOVCA9IDEwMDtcblxuZXhwb3J0IGNsYXNzIE1jUHJvZ3Jlc3NTcGlubmVyQmFzZSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1Byb2dyZXNzU3Bpbm5lck1peGluQmFzZTpcbiAgICBDYW5Db2xvckN0b3IgJlxuICAgIHR5cGVvZiBNY1Byb2dyZXNzU3Bpbm5lckJhc2UgPVxuICAgICAgICBtaXhpbkNvbG9yKE1jUHJvZ3Jlc3NTcGlubmVyQmFzZSk7XG5cbmNvbnN0IE1BWF9EQVNIX0FSUkFZID0gMjczO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXByb2dyZXNzLXNwaW5uZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wcm9ncmVzcy1zcGlubmVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wcm9ncmVzcy1zcGlubmVyLnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1wcm9ncmVzcy1zcGlubmVyJyxcbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jUHJvZ3Jlc3NTcGlubmVyIGV4dGVuZHMgTWNQcm9ncmVzc1NwaW5uZXJNaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5Db2xvciB7XG4gICAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBtYy1wcm9ncmVzcy1zcGlubmVyLSR7aWRJdGVyYXRvcisrfWA7XG4gICAgQElucHV0KCkgdmFsdWU6IG51bWJlciA9IDA7XG4gICAgQElucHV0KCkgbW9kZTogUHJvZ3Jlc3NTcGlubmVyTW9kZSA9ICdkZXRlcm1pbmF0ZSc7XG4gICAgQElucHV0KCkgY29sb3I6IFRoZW1lUGFsZXR0ZSA9IFRoZW1lUGFsZXR0ZS5QcmltYXJ5O1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB9XG5cbiAgICBnZXQgcGVyY2VudGFnZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoTUlOX1BFUkNFTlQsIE1hdGgubWluKE1BWF9QRVJDRU5ULCB0aGlzLnZhbHVlKSkgLyBNQVhfUEVSQ0VOVDtcbiAgICB9XG5cbiAgICBnZXQgZGFzaE9mZnNldFBlcmNlbnQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke01BWF9EQVNIX0FSUkFZIC0gdGhpcy5wZXJjZW50YWdlICogTUFYX0RBU0hfQVJSQVl9JWA7XG4gICAgfVxufVxuIl19