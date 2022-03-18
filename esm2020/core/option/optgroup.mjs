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
/** @nocollapse */ /** @nocollapse */ McOptgroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McOptgroup, deps: null, target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McOptgroup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McOptgroup, selector: "mc-optgroup", inputs: { disabled: "disabled", label: "label" }, host: { properties: { "class.mc-disabled": "disabled" }, classAttribute: "mc-optgroup" }, exportAs: ["mcOptgroup"], usesInheritance: true, ngImport: i0, template: "<label class=\"mc-optgroup-label\" [id]=\"labelId\">{{ label }}</label>\n<ng-content select=\"mc-option, mc-list-option, ng-container\"></ng-content>\n", styles: [".mc-optgroup-label{padding-left:var(--mc-optgroup-size-padding-left, 17px);-webkit-user-select:none;user-select:none;cursor:default}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McOptgroup, decorators: [{
            type: Component,
            args: [{ selector: 'mc-optgroup', exportAs: 'mcOptgroup', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, inputs: ['disabled'], host: {
                        class: 'mc-optgroup',
                        '[class.mc-disabled]': 'disabled'
                    }, template: "<label class=\"mc-optgroup-label\" [id]=\"labelId\">{{ label }}</label>\n<ng-content select=\"mc-option, mc-list-option, ng-container\"></ng-content>\n", styles: [".mc-optgroup-label{padding-left:var(--mc-optgroup-size-padding-left, 17px);-webkit-user-select:none;user-select:none;cursor:default}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0Z3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvY29yZS9vcHRpb24vb3B0Z3JvdXAudHMiLCIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvY29yZS9vcHRpb24vb3B0Z3JvdXAuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU3RixPQUFPLEVBQUUsYUFBYSxFQUE4QixNQUFNLDJCQUEyQixDQUFDOztBQUd0RixvQkFBb0I7QUFDcEIsTUFBTSxPQUFPLGNBQWM7Q0FBRztBQUU5Qiw4Q0FBOEM7QUFDOUMsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQTJDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUV6RyxJQUFJLHVCQUF1QixHQUFHLENBQUMsQ0FBQztBQUVoQzs7R0FFRztBQWNILE1BQU0sT0FBTyxVQUFXLFNBQVEsbUJBQW1CO0lBYm5EOztRQWdCSSwwQ0FBMEM7UUFDMUMsWUFBTyxHQUFXLHFCQUFxQix1QkFBdUIsRUFBRSxFQUFFLENBQUM7S0FDdEU7OzZJQUxZLFVBQVU7aUlBQVYsVUFBVSxnUEM3QnZCLHlKQUVBOzJGRDJCYSxVQUFVO2tCQWJ0QixTQUFTOytCQUNJLGFBQWEsWUFDYixZQUFZLGlCQUdQLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU0sVUFDdkMsQ0FBQyxVQUFVLENBQUMsUUFDZDt3QkFDRixLQUFLLEVBQUUsYUFBYTt3QkFDcEIscUJBQXFCLEVBQUUsVUFBVTtxQkFDcEM7OEJBR1EsS0FBSztzQkFBYixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IG1peGluRGlzYWJsZWQsIENhbkRpc2FibGUsIENhbkRpc2FibGVDdG9yIH0gZnJvbSAnLi4vY29tbW9uLWJlaGF2aW9ycy9pbmRleCc7XG5cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjbGFzcyBNY09wdGdyb3VwQmFzZSB7fVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNPcHRncm91cE1peGluQmFzZTogQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgTWNPcHRncm91cEJhc2UgPSBtaXhpbkRpc2FibGVkKE1jT3B0Z3JvdXBCYXNlKTtcblxubGV0IHVuaXF1ZU9wdGdyb3VwSWRDb3VudGVyID0gMDtcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBpcyB1c2VkIHRvIGdyb3VwIGluc3RhbmNlcyBvZiBgbWMtb3B0aW9uYC5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1vcHRncm91cCcsXG4gICAgZXhwb3J0QXM6ICdtY09wdGdyb3VwJyxcbiAgICB0ZW1wbGF0ZVVybDogJ29wdGdyb3VwLmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL29wdGdyb3VwLnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGlucHV0czogWydkaXNhYmxlZCddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1vcHRncm91cCcsXG4gICAgICAgICdbY2xhc3MubWMtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNPcHRncm91cCBleHRlbmRzIE1jT3B0Z3JvdXBNaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5EaXNhYmxlIHtcbiAgICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuXG4gICAgLyoqIFVuaXF1ZSBpZCBmb3IgdGhlIHVuZGVybHlpbmcgbGFiZWwuICovXG4gICAgbGFiZWxJZDogc3RyaW5nID0gYG1jLW9wdGdyb3VwLWxhYmVsLSR7dW5pcXVlT3B0Z3JvdXBJZENvdW50ZXIrK31gO1xufVxuIiwiPGxhYmVsIGNsYXNzPVwibWMtb3B0Z3JvdXAtbGFiZWxcIiBbaWRdPVwibGFiZWxJZFwiPnt7IGxhYmVsIH19PC9sYWJlbD5cbjxuZy1jb250ZW50IHNlbGVjdD1cIm1jLW9wdGlvbiwgbWMtbGlzdC1vcHRpb24sIG5nLWNvbnRhaW5lclwiPjwvbmctY29udGVudD5cbiJdfQ==