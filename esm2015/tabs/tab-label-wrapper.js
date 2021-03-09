import { Directive, ElementRef } from '@angular/core';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
// Boilerplate for applying mixins to McTabLabelWrapper.
/** @docs-private */
export class McTabLabelWrapperBase {
}
// tslint:disable-next-line:naming-convention
export const McTabLabelWrapperMixinBase = mixinDisabled(McTabLabelWrapperBase);
/**
 * Used in the `mc-tab-group` view to display tab labels.
 * @docs-private
 */
export class McTabLabelWrapper extends McTabLabelWrapperMixinBase {
    constructor(elementRef) {
        super();
        this.elementRef = elementRef;
    }
    /** Sets focus on the wrapper element */
    focus() {
        this.elementRef.nativeElement.focus();
    }
    getOffsetLeft() {
        return this.elementRef.nativeElement.offsetLeft;
    }
    getOffsetWidth() {
        return this.elementRef.nativeElement.offsetWidth;
    }
}
McTabLabelWrapper.decorators = [
    { type: Directive, args: [{
                selector: '[mcTabLabelWrapper]',
                inputs: ['disabled'],
                host: {
                    '[class.mc-disabled]': 'disabled',
                    '[attr.aria-disabled]': '!!disabled'
                }
            },] }
];
/** @nocollapse */
McTabLabelWrapper.ctorParameters = () => [
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxhYmVsLXdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdGFicy90YWItbGFiZWwtd3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBR0gsYUFBYSxFQUNoQixNQUFNLHlCQUF5QixDQUFDO0FBR2pDLHdEQUF3RDtBQUN4RCxvQkFBb0I7QUFDcEIsTUFBTSxPQUFPLHFCQUFxQjtDQUFHO0FBQ3JDLDZDQUE2QztBQUM3QyxNQUFNLENBQUMsTUFBTSwwQkFBMEIsR0FDSixhQUFhLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUV4RTs7O0dBR0c7QUFTSCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsMEJBQTBCO0lBQzdELFlBQW1CLFVBQXNCO1FBQ3JDLEtBQUssRUFBRSxDQUFDO1FBRE8sZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUV6QyxDQUFDO0lBRUQsd0NBQXdDO0lBQ3hDLEtBQUs7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQsYUFBYTtRQUNULE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO0lBQ3BELENBQUM7SUFFRCxjQUFjO1FBQ1YsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7SUFDckQsQ0FBQzs7O1lBeEJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3BCLElBQUksRUFBRTtvQkFDRixxQkFBcUIsRUFBRSxVQUFVO29CQUNqQyxzQkFBc0IsRUFBRSxZQUFZO2lCQUN2QzthQUNKOzs7O1lBMUJtQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENhbkRpc2FibGUsXG4gICAgQ2FuRGlzYWJsZUN0b3IsXG4gICAgbWl4aW5EaXNhYmxlZFxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNY1RhYkxhYmVsV3JhcHBlci5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY2xhc3MgTWNUYWJMYWJlbFdyYXBwZXJCYXNlIHt9XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1RhYkxhYmVsV3JhcHBlck1peGluQmFzZTogQ2FuRGlzYWJsZUN0b3IgJlxuICAgIHR5cGVvZiBNY1RhYkxhYmVsV3JhcHBlckJhc2UgPSBtaXhpbkRpc2FibGVkKE1jVGFiTGFiZWxXcmFwcGVyQmFzZSk7XG5cbi8qKlxuICogVXNlZCBpbiB0aGUgYG1jLXRhYi1ncm91cGAgdmlldyB0byBkaXNwbGF5IHRhYiBsYWJlbHMuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jVGFiTGFiZWxXcmFwcGVyXScsXG4gICAgaW5wdXRzOiBbJ2Rpc2FibGVkJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm1jLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICchIWRpc2FibGVkJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUYWJMYWJlbFdyYXBwZXIgZXh0ZW5kcyBNY1RhYkxhYmVsV3JhcHBlck1peGluQmFzZSBpbXBsZW1lbnRzIENhbkRpc2FibGUge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgLyoqIFNldHMgZm9jdXMgb24gdGhlIHdyYXBwZXIgZWxlbWVudCAqL1xuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIGdldE9mZnNldExlZnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldExlZnQ7XG4gICAgfVxuXG4gICAgZ2V0T2Zmc2V0V2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgIH1cbn1cbiJdfQ==