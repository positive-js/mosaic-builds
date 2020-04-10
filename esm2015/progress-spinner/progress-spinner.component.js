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
export const McProgressSpinnerMixinBase = mixinColor(McProgressSpinnerBase);
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
        this.color = ThemePalette.Primary;
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
    mode: [{ type: Input }],
    color: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3Mtc3Bpbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvcHJvZ3Jlc3Mtc3Bpbm5lci8iLCJzb3VyY2VzIjpbInByb2dyZXNzLXNwaW5uZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLFVBQVUsRUFDVixLQUFLLEVBQ1IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUEwQixVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7O0lBS3ZGLFVBQVUsR0FBRyxDQUFDOztNQUVaLFdBQVcsR0FBRyxDQUFDOztNQUNmLFdBQVcsR0FBRyxHQUFHO0FBRXZCLE1BQU0sT0FBTyxxQkFBcUI7Ozs7O0lBRTlCLFlBQW1CLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lBQUcsQ0FBQztDQUNqRDs7O0lBRGUsNENBQThCOzs7O0FBSTlDLE1BQU0sT0FBTywwQkFBMEIsR0FHL0IsVUFBVSxDQUFDLHFCQUFxQixDQUFDOztNQUVuQyxjQUFjLEdBQUcsR0FBRztBQWExQixNQUFNLE9BQU8saUJBQWtCLFNBQVEsMEJBQTBCOzs7O0lBTTdELFlBQVksVUFBc0I7UUFDOUIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBTmIsT0FBRSxHQUFXLHVCQUF1QixVQUFVLEVBQUUsRUFBRSxDQUFDO1FBQ25ELFVBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsU0FBSSxHQUF3QixhQUFhLENBQUM7UUFDMUMsVUFBSyxHQUFpQixZQUFZLENBQUMsT0FBTyxDQUFDO0lBSXBELENBQUM7Ozs7SUFFRCxJQUFJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztJQUNsRixDQUFDOzs7O0lBRUQsSUFBSSxpQkFBaUI7UUFDakIsT0FBTyxHQUFHLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLGNBQWMsR0FBRyxDQUFDO0lBQ25FLENBQUM7OztZQTNCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsZ2xCQUFnRDtnQkFFaEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLHFCQUFxQjtvQkFDNUIsV0FBVyxFQUFFLElBQUk7aUJBQ3BCOzthQUNKOzs7O1lBcENHLFVBQVU7OztpQkFzQ1QsS0FBSztvQkFDTCxLQUFLO21CQUNMLEtBQUs7b0JBQ0wsS0FBSzs7OztJQUhOLCtCQUE0RDs7SUFDNUQsa0NBQTJCOztJQUMzQixpQ0FBbUQ7O0lBQ25ELGtDQUFvRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5Db2xvciwgQ2FuQ29sb3JDdG9yLCBtaXhpbkNvbG9yLCBUaGVtZVBhbGV0dGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cblxuZXhwb3J0IHR5cGUgUHJvZ3Jlc3NTcGlubmVyTW9kZSA9ICdkZXRlcm1pbmF0ZScgfCAnaW5kZXRlcm1pbmF0ZSc7XG5cbmxldCBpZEl0ZXJhdG9yID0gMDtcblxuY29uc3QgTUlOX1BFUkNFTlQgPSAwO1xuY29uc3QgTUFYX1BFUkNFTlQgPSAxMDA7XG5cbmV4cG9ydCBjbGFzcyBNY1Byb2dyZXNzU3Bpbm5lckJhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNQcm9ncmVzc1NwaW5uZXJNaXhpbkJhc2U6XG4gICAgQ2FuQ29sb3JDdG9yICZcbiAgICB0eXBlb2YgTWNQcm9ncmVzc1NwaW5uZXJCYXNlID1cbiAgICAgICAgbWl4aW5Db2xvcihNY1Byb2dyZXNzU3Bpbm5lckJhc2UpO1xuXG5jb25zdCBNQVhfREFTSF9BUlJBWSA9IDI3MztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1wcm9ncmVzcy1zcGlubmVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcHJvZ3Jlc3Mtc3Bpbm5lci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcHJvZ3Jlc3Mtc3Bpbm5lci5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtcHJvZ3Jlc3Mtc3Bpbm5lcicsXG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1Byb2dyZXNzU3Bpbm5lciBleHRlbmRzIE1jUHJvZ3Jlc3NTcGlubmVyTWl4aW5CYXNlIGltcGxlbWVudHMgQ2FuQ29sb3Ige1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgbWMtcHJvZ3Jlc3Mtc3Bpbm5lci0ke2lkSXRlcmF0b3IrK31gO1xuICAgIEBJbnB1dCgpIHZhbHVlOiBudW1iZXIgPSAwO1xuICAgIEBJbnB1dCgpIG1vZGU6IFByb2dyZXNzU3Bpbm5lck1vZGUgPSAnZGV0ZXJtaW5hdGUnO1xuICAgIEBJbnB1dCgpIGNvbG9yOiBUaGVtZVBhbGV0dGUgPSBUaGVtZVBhbGV0dGUuUHJpbWFyeTtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgfVxuXG4gICAgZ2V0IHBlcmNlbnRhZ2UoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1JTl9QRVJDRU5ULCBNYXRoLm1pbihNQVhfUEVSQ0VOVCwgdGhpcy52YWx1ZSkpIC8gTUFYX1BFUkNFTlQ7XG4gICAgfVxuXG4gICAgZ2V0IGRhc2hPZmZzZXRQZXJjZW50KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHtNQVhfREFTSF9BUlJBWSAtIHRoaXMucGVyY2VudGFnZSAqIE1BWF9EQVNIX0FSUkFZfSVgO1xuICAgIH1cbn1cbiJdfQ==