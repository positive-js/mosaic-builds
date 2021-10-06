import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { mixinDisabled } from '../common-behaviors/index';
import * as i0 from "@angular/core";
/** @docs-private */
export class McOptgroupBase {
}
// tslint:disable-next-line: naming-convention
export const McOptgroupMixinBase = mixinDisabled(McOptgroupBase);
let uniqueOptgroupIdCounter = 0;
/**
 * Component that is used to group instances of `mc-option`.
 */
export class McOptgroup extends McOptgroupMixinBase {
    constructor() {
        super(...arguments);
        /** Unique id for the underlying label. */
        this.labelId = `mc-optgroup-label-${uniqueOptgroupIdCounter++}`;
    }
}
/** @nocollapse */ McOptgroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McOptgroup, deps: null, target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McOptgroup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McOptgroup, selector: "mc-optgroup", inputs: { disabled: "disabled", label: "label" }, host: { properties: { "class.mc-disabled": "disabled" }, classAttribute: "mc-optgroup" }, exportAs: ["mcOptgroup"], usesInheritance: true, ngImport: i0, template: "<label class=\"mc-optgroup-label\" [id]=\"labelId\">{{ label }}</label>\n<ng-content select=\"mc-option, mc-list-option, ng-container\"></ng-content>\n", styles: [".mc-optgroup-label{padding-left:17px;padding-left:var(--mc-optgroup-size-padding-left, 17px);-webkit-user-select:none;user-select:none;cursor:default}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McOptgroup, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-optgroup',
                    exportAs: 'mcOptgroup',
                    templateUrl: 'optgroup.html',
                    styleUrls: ['./optgroup.scss'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    inputs: ['disabled'],
                    host: {
                        class: 'mc-optgroup',
                        '[class.mc-disabled]': 'disabled'
                    }
                }]
        }], propDecorators: { label: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0Z3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvY29yZS9vcHRpb24vb3B0Z3JvdXAudHMiLCIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvY29yZS9vcHRpb24vb3B0Z3JvdXAuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU3RixPQUFPLEVBQUUsYUFBYSxFQUE4QixNQUFNLDJCQUEyQixDQUFDOztBQUd0RixvQkFBb0I7QUFDcEIsTUFBTSxPQUFPLGNBQWM7Q0FBRztBQUU5Qiw4Q0FBOEM7QUFDOUMsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQTJDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUV6RyxJQUFJLHVCQUF1QixHQUFHLENBQUMsQ0FBQztBQUVoQzs7R0FFRztBQWNILE1BQU0sT0FBTyxVQUFXLFNBQVEsbUJBQW1CO0lBYm5EOztRQWdCSSwwQ0FBMEM7UUFDMUMsWUFBTyxHQUFXLHFCQUFxQix1QkFBdUIsRUFBRSxFQUFFLENBQUM7S0FDdEU7OzBIQUxZLFVBQVU7OEdBQVYsVUFBVSxnUEM3QnZCLHlKQUVBOzJGRDJCYSxVQUFVO2tCQWJ0QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsWUFBWTtvQkFDdEIsV0FBVyxFQUFFLGVBQWU7b0JBQzVCLFNBQVMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO29CQUM5QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQztvQkFDcEIsSUFBSSxFQUFFO3dCQUNGLEtBQUssRUFBRSxhQUFhO3dCQUNwQixxQkFBcUIsRUFBRSxVQUFVO3FCQUNwQztpQkFDSjs4QkFFWSxLQUFLO3NCQUFiLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgbWl4aW5EaXNhYmxlZCwgQ2FuRGlzYWJsZSwgQ2FuRGlzYWJsZUN0b3IgfSBmcm9tICcuLi9jb21tb24tYmVoYXZpb3JzL2luZGV4JztcblxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNsYXNzIE1jT3B0Z3JvdXBCYXNlIHt9XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY09wdGdyb3VwTWl4aW5CYXNlOiBDYW5EaXNhYmxlQ3RvciAmIHR5cGVvZiBNY09wdGdyb3VwQmFzZSA9IG1peGluRGlzYWJsZWQoTWNPcHRncm91cEJhc2UpO1xuXG5sZXQgdW5pcXVlT3B0Z3JvdXBJZENvdW50ZXIgPSAwO1xuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGlzIHVzZWQgdG8gZ3JvdXAgaW5zdGFuY2VzIG9mIGBtYy1vcHRpb25gLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLW9wdGdyb3VwJyxcbiAgICBleHBvcnRBczogJ21jT3B0Z3JvdXAnLFxuICAgIHRlbXBsYXRlVXJsOiAnb3B0Z3JvdXAuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vb3B0Z3JvdXAuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgaW5wdXRzOiBbJ2Rpc2FibGVkJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLW9wdGdyb3VwJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY09wdGdyb3VwIGV4dGVuZHMgTWNPcHRncm91cE1peGluQmFzZSBpbXBsZW1lbnRzIENhbkRpc2FibGUge1xuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG5cbiAgICAvKiogVW5pcXVlIGlkIGZvciB0aGUgdW5kZXJseWluZyBsYWJlbC4gKi9cbiAgICBsYWJlbElkOiBzdHJpbmcgPSBgbWMtb3B0Z3JvdXAtbGFiZWwtJHt1bmlxdWVPcHRncm91cElkQ291bnRlcisrfWA7XG59XG4iLCI8bGFiZWwgY2xhc3M9XCJtYy1vcHRncm91cC1sYWJlbFwiIFtpZF09XCJsYWJlbElkXCI+e3sgbGFiZWwgfX08L2xhYmVsPlxuPG5nLWNvbnRlbnQgc2VsZWN0PVwibWMtb3B0aW9uLCBtYy1saXN0LW9wdGlvbiwgbmctY29udGFpbmVyXCI+PC9uZy1jb250ZW50PlxuIl19