/**
 * @fileoverview added by tsickle
 * Generated from: option/optgroup.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { mixinDisabled } from '../common-behaviors/index';
/**
 * \@docs-private
 */
var /**
 * \@docs-private
 */
McOptgroupBase = /** @class */ (function () {
    function McOptgroupBase() {
    }
    return McOptgroupBase;
}());
/**
 * \@docs-private
 */
export { McOptgroupBase };
// tslint:disable-next-line: naming-convention
/** @type {?} */
export var McOptgroupMixinBase = mixinDisabled(McOptgroupBase);
/** @type {?} */
var uniqueOptgroupIdCounter = 0;
/**
 * Component that is used to group instances of `mc-option`.
 */
var McOptgroup = /** @class */ (function (_super) {
    __extends(McOptgroup, _super);
    function McOptgroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Unique id for the underlying label.
         */
        _this.labelId = "mc-optgroup-label-" + uniqueOptgroupIdCounter++;
        return _this;
    }
    McOptgroup.decorators = [
        { type: Component, args: [{
                    selector: 'mc-optgroup',
                    exportAs: 'mcOptgroup',
                    template: "<label class=\"mc-optgroup-label\" [id]=\"labelId\">{{ label }}</label>\n<ng-content select=\"mc-option, mc-list-option, ng-container\"></ng-content>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    inputs: ['disabled'],
                    host: {
                        class: 'mc-optgroup',
                        '[class.mc-disabled]': 'disabled'
                    },
                    styles: [".mc-optgroup-label{padding-left:17px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}"]
                }] }
    ];
    McOptgroup.propDecorators = {
        label: [{ type: Input }]
    };
    return McOptgroup;
}(McOptgroupMixinBase));
export { McOptgroup };
if (false) {
    /** @type {?} */
    McOptgroup.prototype.label;
    /**
     * Unique id for the underlying label.
     * @type {?}
     */
    McOptgroup.prototype.labelId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0Z3JvdXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvY29yZS8iLCJzb3VyY2VzIjpbIm9wdGlvbi9vcHRncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU3RixPQUFPLEVBQUUsYUFBYSxFQUE4QixNQUFNLDJCQUEyQixDQUFDOzs7O0FBSXRGOzs7O0lBQUE7SUFBNkIsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FBQyxBQUE5QixJQUE4Qjs7Ozs7OztBQUc5QixNQUFNLEtBQU8sbUJBQW1CLEdBQTJDLGFBQWEsQ0FBQyxjQUFjLENBQUM7O0lBRXBHLHVCQUF1QixHQUFHLENBQUM7Ozs7QUFLL0I7SUFhZ0MsOEJBQW1CO0lBYm5EO1FBQUEscUVBa0JDOzs7O1FBREcsYUFBTyxHQUFXLHVCQUFxQix1QkFBdUIsRUFBSSxDQUFDOztJQUN2RSxDQUFDOztnQkFsQkEsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsWUFBWTtvQkFDdEIsbUtBQTRCO29CQUU1QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQztvQkFDcEIsSUFBSSxFQUFFO3dCQUNGLEtBQUssRUFBRSxhQUFhO3dCQUNwQixxQkFBcUIsRUFBRSxVQUFVO3FCQUNwQzs7aUJBQ0o7Ozt3QkFFSSxLQUFLOztJQUlWLGlCQUFDO0NBQUEsQUFsQkQsQ0FhZ0MsbUJBQW1CLEdBS2xEO1NBTFksVUFBVTs7O0lBQ25CLDJCQUF1Qjs7Ozs7SUFHdkIsNkJBQW1FIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IG1peGluRGlzYWJsZWQsIENhbkRpc2FibGUsIENhbkRpc2FibGVDdG9yIH0gZnJvbSAnLi4vY29tbW9uLWJlaGF2aW9ycy9pbmRleCc7XG5cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjbGFzcyBNY09wdGdyb3VwQmFzZSB7fVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNPcHRncm91cE1peGluQmFzZTogQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgTWNPcHRncm91cEJhc2UgPSBtaXhpbkRpc2FibGVkKE1jT3B0Z3JvdXBCYXNlKTtcblxubGV0IHVuaXF1ZU9wdGdyb3VwSWRDb3VudGVyID0gMDtcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBpcyB1c2VkIHRvIGdyb3VwIGluc3RhbmNlcyBvZiBgbWMtb3B0aW9uYC5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1vcHRncm91cCcsXG4gICAgZXhwb3J0QXM6ICdtY09wdGdyb3VwJyxcbiAgICB0ZW1wbGF0ZVVybDogJ29wdGdyb3VwLmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL29wdGdyb3VwLnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGlucHV0czogWydkaXNhYmxlZCddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1vcHRncm91cCcsXG4gICAgICAgICdbY2xhc3MubWMtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNPcHRncm91cCBleHRlbmRzIE1jT3B0Z3JvdXBNaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5EaXNhYmxlIHtcbiAgICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuXG4gICAgLyoqIFVuaXF1ZSBpZCBmb3IgdGhlIHVuZGVybHlpbmcgbGFiZWwuICovXG4gICAgbGFiZWxJZDogc3RyaW5nID0gYG1jLW9wdGdyb3VwLWxhYmVsLSR7dW5pcXVlT3B0Z3JvdXBJZENvdW50ZXIrK31gO1xufVxuIl19