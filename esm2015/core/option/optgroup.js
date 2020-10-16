/**
 * @fileoverview added by tsickle
 * Generated from: option/optgroup.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { mixinDisabled } from '../common-behaviors/index';
/**
 * \@docs-private
 */
export class McOptgroupBase {
}
// tslint:disable-next-line: naming-convention
/** @type {?} */
export const McOptgroupMixinBase = mixinDisabled(McOptgroupBase);
/** @type {?} */
let uniqueOptgroupIdCounter = 0;
/**
 * Component that is used to group instances of `mc-option`.
 */
export class McOptgroup extends McOptgroupMixinBase {
    constructor() {
        super(...arguments);
        /**
         * Unique id for the underlying label.
         */
        this.labelId = `mc-optgroup-label-${uniqueOptgroupIdCounter++}`;
    }
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
                styles: [".mc-optgroup-label{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;cursor:default;padding-left:17px;user-select:none}"]
            }] }
];
McOptgroup.propDecorators = {
    label: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    McOptgroup.prototype.label;
    /**
     * Unique id for the underlying label.
     * @type {?}
     */
    McOptgroup.prototype.labelId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0Z3JvdXAuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9jb3JlLyIsInNvdXJjZXMiOlsib3B0aW9uL29wdGdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFN0YsT0FBTyxFQUFFLGFBQWEsRUFBOEIsTUFBTSwyQkFBMkIsQ0FBQzs7OztBQUl0RixNQUFNLE9BQU8sY0FBYztDQUFHOzs7QUFHOUIsTUFBTSxPQUFPLG1CQUFtQixHQUEyQyxhQUFhLENBQUMsY0FBYyxDQUFDOztJQUVwRyx1QkFBdUIsR0FBRyxDQUFDOzs7O0FBa0IvQixNQUFNLE9BQU8sVUFBVyxTQUFRLG1CQUFtQjtJQWJuRDs7Ozs7UUFpQkksWUFBTyxHQUFXLHFCQUFxQix1QkFBdUIsRUFBRSxFQUFFLENBQUM7SUFDdkUsQ0FBQzs7O1lBbEJBLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLG1LQUE0QjtnQkFFNUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3BCLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsYUFBYTtvQkFDcEIscUJBQXFCLEVBQUUsVUFBVTtpQkFDcEM7O2FBQ0o7OztvQkFFSSxLQUFLOzs7O0lBQU4sMkJBQXVCOzs7OztJQUd2Qiw2QkFBbUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgbWl4aW5EaXNhYmxlZCwgQ2FuRGlzYWJsZSwgQ2FuRGlzYWJsZUN0b3IgfSBmcm9tICcuLi9jb21tb24tYmVoYXZpb3JzL2luZGV4JztcblxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNsYXNzIE1jT3B0Z3JvdXBCYXNlIHt9XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY09wdGdyb3VwTWl4aW5CYXNlOiBDYW5EaXNhYmxlQ3RvciAmIHR5cGVvZiBNY09wdGdyb3VwQmFzZSA9IG1peGluRGlzYWJsZWQoTWNPcHRncm91cEJhc2UpO1xuXG5sZXQgdW5pcXVlT3B0Z3JvdXBJZENvdW50ZXIgPSAwO1xuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGlzIHVzZWQgdG8gZ3JvdXAgaW5zdGFuY2VzIG9mIGBtYy1vcHRpb25gLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLW9wdGdyb3VwJyxcbiAgICBleHBvcnRBczogJ21jT3B0Z3JvdXAnLFxuICAgIHRlbXBsYXRlVXJsOiAnb3B0Z3JvdXAuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vb3B0Z3JvdXAuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgaW5wdXRzOiBbJ2Rpc2FibGVkJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLW9wdGdyb3VwJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY09wdGdyb3VwIGV4dGVuZHMgTWNPcHRncm91cE1peGluQmFzZSBpbXBsZW1lbnRzIENhbkRpc2FibGUge1xuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG5cbiAgICAvKiogVW5pcXVlIGlkIGZvciB0aGUgdW5kZXJseWluZyBsYWJlbC4gKi9cbiAgICBsYWJlbElkOiBzdHJpbmcgPSBgbWMtb3B0Z3JvdXAtbGFiZWwtJHt1bmlxdWVPcHRncm91cElkQ291bnRlcisrfWA7XG59XG4iXX0=