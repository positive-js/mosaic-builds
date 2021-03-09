import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { mixinDisabled } from '../common-behaviors/index';
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
                styles: [".mc-optgroup-label{padding-left:var(--mc-optgroup-size-padding-left,17px);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}"]
            },] }
];
McOptgroup.propDecorators = {
    label: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0Z3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvY29yZS9vcHRpb24vb3B0Z3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFN0YsT0FBTyxFQUFFLGFBQWEsRUFBOEIsTUFBTSwyQkFBMkIsQ0FBQztBQUd0RixvQkFBb0I7QUFDcEIsTUFBTSxPQUFPLGNBQWM7Q0FBRztBQUU5Qiw4Q0FBOEM7QUFDOUMsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQTJDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUV6RyxJQUFJLHVCQUF1QixHQUFHLENBQUMsQ0FBQztBQUVoQzs7R0FFRztBQWNILE1BQU0sT0FBTyxVQUFXLFNBQVEsbUJBQW1CO0lBYm5EOztRQWdCSSwwQ0FBMEM7UUFDMUMsWUFBTyxHQUFXLHFCQUFxQix1QkFBdUIsRUFBRSxFQUFFLENBQUM7SUFDdkUsQ0FBQzs7O1lBbEJBLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLG1LQUE0QjtnQkFFNUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3BCLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsYUFBYTtvQkFDcEIscUJBQXFCLEVBQUUsVUFBVTtpQkFDcEM7O2FBQ0o7OztvQkFFSSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IG1peGluRGlzYWJsZWQsIENhbkRpc2FibGUsIENhbkRpc2FibGVDdG9yIH0gZnJvbSAnLi4vY29tbW9uLWJlaGF2aW9ycy9pbmRleCc7XG5cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjbGFzcyBNY09wdGdyb3VwQmFzZSB7fVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNPcHRncm91cE1peGluQmFzZTogQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgTWNPcHRncm91cEJhc2UgPSBtaXhpbkRpc2FibGVkKE1jT3B0Z3JvdXBCYXNlKTtcblxubGV0IHVuaXF1ZU9wdGdyb3VwSWRDb3VudGVyID0gMDtcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBpcyB1c2VkIHRvIGdyb3VwIGluc3RhbmNlcyBvZiBgbWMtb3B0aW9uYC5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1vcHRncm91cCcsXG4gICAgZXhwb3J0QXM6ICdtY09wdGdyb3VwJyxcbiAgICB0ZW1wbGF0ZVVybDogJ29wdGdyb3VwLmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL29wdGdyb3VwLnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGlucHV0czogWydkaXNhYmxlZCddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1vcHRncm91cCcsXG4gICAgICAgICdbY2xhc3MubWMtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNPcHRncm91cCBleHRlbmRzIE1jT3B0Z3JvdXBNaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5EaXNhYmxlIHtcbiAgICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuXG4gICAgLyoqIFVuaXF1ZSBpZCBmb3IgdGhlIHVuZGVybHlpbmcgbGFiZWwuICovXG4gICAgbGFiZWxJZDogc3RyaW5nID0gYG1jLW9wdGdyb3VwLWxhYmVsLSR7dW5pcXVlT3B0Z3JvdXBJZENvdW50ZXIrK31gO1xufVxuIl19