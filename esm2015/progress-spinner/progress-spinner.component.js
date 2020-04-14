/**
 * @fileoverview added by tsickle
 * Generated from: progress-spinner.component.ts
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
                styles: ["@-webkit-keyframes mc-progress-spinner-indeterminate{100%{transform:rotateZ(270deg)}}@keyframes mc-progress-spinner-indeterminate{100%{transform:rotateZ(270deg)}}.mc-progress-spinner{display:inline-block;width:16px;height:16px;overflow:hidden}.mc-progress-spinner__circle{fill:none;stroke:#000;stroke-dasharray:273%;stroke-width:13%;transition:stroke-dashoffset .3s;transform-origin:center center}.mc-progress-spinner__inner{width:100%;height:100%;transform:rotateZ(-90deg)}.mc-progress-spinner__inner--indeterminate{-webkit-animation:1.5s cubic-bezier(.455,.03,.515,.955) infinite mc-progress-spinner-indeterminate;animation:1.5s cubic-bezier(.455,.03,.515,.955) infinite mc-progress-spinner-indeterminate}.mc-progress-spinner__inner--indeterminate .mc-progress-spinner__circle{stroke-dashoffset:80%}.mc-progress-spinner__svg{width:100%;height:100%}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3Mtc3Bpbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvcHJvZ3Jlc3Mtc3Bpbm5lci8iLCJzb3VyY2VzIjpbInByb2dyZXNzLXNwaW5uZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLFVBQVUsRUFDVixLQUFLLEVBQ1IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUEwQixVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7O0lBS3ZGLFVBQVUsR0FBRyxDQUFDOztNQUVaLFdBQVcsR0FBRyxDQUFDOztNQUNmLFdBQVcsR0FBRyxHQUFHO0FBRXZCLE1BQU0sT0FBTyxxQkFBcUI7Ozs7O0lBRTlCLFlBQW1CLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lBQUcsQ0FBQztDQUNqRDs7O0lBRGUsNENBQThCOzs7O0FBSTlDLE1BQU0sT0FBTywwQkFBMEIsR0FDVyxVQUFVLENBQUMscUJBQXFCLEVBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQzs7TUFFbkcsY0FBYyxHQUFHLEdBQUc7QUFjMUIsTUFBTSxPQUFPLGlCQUFrQixTQUFRLDBCQUEwQjs7OztJQUs3RCxZQUFZLFVBQXNCO1FBQzlCLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUxiLE9BQUUsR0FBVyx1QkFBdUIsVUFBVSxFQUFFLEVBQUUsQ0FBQztRQUNuRCxVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFNBQUksR0FBd0IsYUFBYSxDQUFDO0lBSW5ELENBQUM7Ozs7SUFFRCxJQUFJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztJQUNsRixDQUFDOzs7O0lBRUQsSUFBSSxpQkFBaUI7UUFDakIsT0FBTyxHQUFHLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLGNBQWMsR0FBRyxDQUFDO0lBQ25FLENBQUM7OztZQTNCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsZ2xCQUFnRDtnQkFFaEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUscUJBQXFCO29CQUM1QixXQUFXLEVBQUUsSUFBSTtpQkFDcEI7O2FBQ0o7Ozs7WUFuQ0csVUFBVTs7O2lCQXFDVCxLQUFLO29CQUNMLEtBQUs7bUJBQ0wsS0FBSzs7OztJQUZOLCtCQUE0RDs7SUFDNUQsa0NBQTJCOztJQUMzQixpQ0FBbUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuQ29sb3IsIENhbkNvbG9yQ3RvciwgbWl4aW5Db2xvciwgVGhlbWVQYWxldHRlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5cbmV4cG9ydCB0eXBlIFByb2dyZXNzU3Bpbm5lck1vZGUgPSAnZGV0ZXJtaW5hdGUnIHwgJ2luZGV0ZXJtaW5hdGUnO1xuXG5sZXQgaWRJdGVyYXRvciA9IDA7XG5cbmNvbnN0IE1JTl9QRVJDRU5UID0gMDtcbmNvbnN0IE1BWF9QRVJDRU5UID0gMTAwO1xuXG5leHBvcnQgY2xhc3MgTWNQcm9ncmVzc1NwaW5uZXJCYXNlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jUHJvZ3Jlc3NTcGlubmVyTWl4aW5CYXNlOlxuICAgIENhbkNvbG9yQ3RvciAmIHR5cGVvZiBNY1Byb2dyZXNzU3Bpbm5lckJhc2UgPSBtaXhpbkNvbG9yKE1jUHJvZ3Jlc3NTcGlubmVyQmFzZSwgVGhlbWVQYWxldHRlLlByaW1hcnkpO1xuXG5jb25zdCBNQVhfREFTSF9BUlJBWSA9IDI3MztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1wcm9ncmVzcy1zcGlubmVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcHJvZ3Jlc3Mtc3Bpbm5lci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcHJvZ3Jlc3Mtc3Bpbm5lci5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBpbnB1dHM6IFsnY29sb3InXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtcHJvZ3Jlc3Mtc3Bpbm5lcicsXG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1Byb2dyZXNzU3Bpbm5lciBleHRlbmRzIE1jUHJvZ3Jlc3NTcGlubmVyTWl4aW5CYXNlIGltcGxlbWVudHMgQ2FuQ29sb3Ige1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgbWMtcHJvZ3Jlc3Mtc3Bpbm5lci0ke2lkSXRlcmF0b3IrK31gO1xuICAgIEBJbnB1dCgpIHZhbHVlOiBudW1iZXIgPSAwO1xuICAgIEBJbnB1dCgpIG1vZGU6IFByb2dyZXNzU3Bpbm5lck1vZGUgPSAnZGV0ZXJtaW5hdGUnO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB9XG5cbiAgICBnZXQgcGVyY2VudGFnZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoTUlOX1BFUkNFTlQsIE1hdGgubWluKE1BWF9QRVJDRU5ULCB0aGlzLnZhbHVlKSkgLyBNQVhfUEVSQ0VOVDtcbiAgICB9XG5cbiAgICBnZXQgZGFzaE9mZnNldFBlcmNlbnQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke01BWF9EQVNIX0FSUkFZIC0gdGhpcy5wZXJjZW50YWdlICogTUFYX0RBU0hfQVJSQVl9JWA7XG4gICAgfVxufVxuIl19