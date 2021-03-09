import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, Directive, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { mixinColor, mixinDisabled, mixinTabIndex } from '@ptsecurity/mosaic/core';
// Boilerplate for applying mixins to McTabNav.
/** @docs-private */
export class McTabNavBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
export const McTabNavMixinBase = mixinColor(McTabNavBase);
/**
 * Navigation component matching the styles of the tab group header.
 */
export class McTabNav extends McTabNavMixinBase {
    constructor(elementRef) {
        super(elementRef);
    }
}
McTabNav.decorators = [
    { type: Component, args: [{
                selector: '[mc-tab-nav-bar]',
                exportAs: 'mcTabNavBar, mcTabNav',
                inputs: ['color'],
                template: "<div class=\"mc-tab-links\">\n    <ng-content></ng-content>\n</div>\n",
                host: { class: 'mc-tab-nav-bar' },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-active:before,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link:hover:before,.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused:after{display:block;position:absolute;content:\"\"}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-active:before,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link:hover:before{bottom:calc(-1 * var(--mc-tabs-size-border-width, 1px));left:0;height:var(--mc-tabs-size-highlight-height,4px);right:0}.mc-tab-link{vertical-align:top;text-decoration:none;-webkit-tap-highlight-color:transparent}.mc-tab-group_stretch-labels .mc-tab-link{flex-basis:0;flex-grow:1}.mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar{display:flex}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:var(--mc-tabs-size-height,40px);text-align:center;white-space:nowrap;cursor:pointer;padding-right:var(--mc-tabs-size-padding-horizontal,16px);padding-left:var(--mc-tabs-size-padding-horizontal,16px);outline:none;border-bottom-width:var(--mc-tabs-size-border-width,1px);border-bottom-style:solid;border-top-width:var(--mc-tabs-size-border-width,1px);border-top-style:solid;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px)}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused{z-index:1}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused:after{top:-calc(var(--mc-tabs-size-border-width,$tabs-size-border-width) * 2);right:calc(-1 * var(--mc-tabs-size-border-width, 1px));bottom:calc(-1 * var(--mc-tabs-size-border-width, 1px));left:calc(-1 * var(--mc-tabs-size-border-width, 1px));border-width:calc(var(--mc-tabs-size-border-width, $tabs-size-border-width) * 2);border-style:solid;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px);border-bottom:none}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link .mc-tab-overlay{position:absolute;top:-1px;left:0;right:0;bottom:0;pointer-events:none}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-active{padding-right:calc(var(--mc-tabs-size-padding-horizontal, 16px) - var(--mc-tabs-size-border-width, 1px));padding-left:calc(var(--mc-tabs-size-padding-horizontal, 16px) - var(--mc-tabs-size-border-width, 1px));border-width:var(--mc-tabs-size-border-width,1px);border-style:solid}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-active.cdk-keyboard-focused:after{z-index:1;right:-calc(var(--mc-tabs-size-border-width,$tabs-size-border-width) * 2);left:-calc(var(--mc-tabs-size-border-width,$tabs-size-border-width) * 2)}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link .mc-tab-overlay{border-top:var(--mc-tabs-size-border-width,1px) solid transparent;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px)}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:var(--mc-tabs-size-height,40px);text-align:center;white-space:nowrap;cursor:pointer;padding-right:var(--mc-tabs-size-padding-horizontal,16px);padding-left:var(--mc-tabs-size-padding-horizontal,16px);outline:none;border-bottom-width:var(--mc-tabs-size-border-width,1px);border-bottom-style:solid}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused{z-index:1}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after{top:-calc(var(--mc-tabs-size-border-width,$tabs-size-border-width) * 2);right:calc(-1 * var(--mc-tabs-size-border-width, 1px));bottom:calc(-1 * var(--mc-tabs-size-border-width, 1px));left:calc(-1 * var(--mc-tabs-size-border-width, 1px));border-width:calc(var(--mc-tabs-size-border-width, $tabs-size-border-width) * 2);border-style:solid;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px);border-bottom:none}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link .mc-tab-overlay{top:-1px;left:0;right:0;bottom:0;pointer-events:none}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused+:hover:before{left:calc(calc(var(--mc-tabs-size-border-width, $tabs-size-border-width) * 2) - var(--mc-tabs-size-border-width, 1px))}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after{top:calc(-1 * var(--mc-tabs-size-border-width, 1px))}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link .mc-tab-overlay{position:absolute;top:0}.mc-tab-links{display:flex;position:relative;padding:1px 1px 0;flex-grow:1}.mc-tab-links .mc-tab-group_align-labels-center{justify-content:center}.mc-tab-links .mc-tab-group_align-labels-end{justify-content:flex-end}"]
            },] }
];
/** @nocollapse */
McTabNav.ctorParameters = () => [
    { type: ElementRef }
];
// Boilerplate for applying mixins to McTabLink.
export class McTabLinkBase {
}
// tslint:disable-next-line:naming-convention
export const McTabLinkMixinBase = mixinTabIndex(mixinDisabled(McTabLinkBase));
/**
 * Link inside of a `mc-tab-nav-bar`.
 */
export class McTabLink extends McTabLinkMixinBase {
    constructor(elementRef, focusMonitor) {
        super();
        this.elementRef = elementRef;
        this.focusMonitor = focusMonitor;
        /** Whether the tab link is active or not. */
        this.isActive = false;
        this.focusMonitor.monitor(this.elementRef.nativeElement);
    }
    /** Whether the link is active. */
    get active() {
        return this.isActive;
    }
    set active(value) {
        if (value !== this.isActive) {
            this.isActive = value;
        }
    }
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }
}
McTabLink.decorators = [
    { type: Directive, args: [{
                selector: '[mc-tab-link], [mcTabLink]',
                exportAs: 'mcTabLink',
                inputs: ['disabled', 'tabIndex'],
                host: {
                    class: 'mc-tab-link',
                    '[attr.aria-current]': 'active',
                    '[attr.aria-disabled]': 'disabled.toString()',
                    '[attr.tabindex]': 'tabIndex',
                    '[class.mc-disabled]': 'disabled',
                    '[class.mc-active]': 'active'
                }
            },] }
];
/** @nocollapse */
McTabLink.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor }
];
McTabLink.propDecorators = {
    active: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLW5hdi1iYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdGFicy90YWItbmF2LWJhci90YWItbmF2LWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBRUwsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFPSCxVQUFVLEVBQ1YsYUFBYSxFQUNiLGFBQWEsRUFDaEIsTUFBTSx5QkFBeUIsQ0FBQztBQUdqQywrQ0FBK0M7QUFDL0Msb0JBQW9CO0FBQ3BCLE1BQU0sT0FBTyxZQUFZO0lBQ3JCLDZDQUE2QztJQUM3QyxZQUFtQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFHLENBQUM7Q0FDakQ7QUFDRCw2Q0FBNkM7QUFDN0MsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQ0osVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRW5EOztHQUVHO0FBV0gsTUFBTSxPQUFPLFFBQVMsU0FBUSxpQkFBaUI7SUFDM0MsWUFBWSxVQUFzQjtRQUM5QixLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEIsQ0FBQzs7O1lBYkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsaUZBQStCO2dCQUUvQixJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUU7Z0JBQ2pDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7Ozs7WUF4Q0csVUFBVTs7QUErQ2QsZ0RBQWdEO0FBQ2hELE1BQU0sT0FBTyxhQUFhO0NBQUc7QUFDN0IsNkNBQTZDO0FBQzdDLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUNKLGFBQWEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztBQUV2RTs7R0FFRztBQWNILE1BQU0sT0FBTyxTQUFVLFNBQVEsa0JBQWtCO0lBZ0I3QyxZQUFtQixVQUFzQixFQUFVLFlBQTBCO1FBQ3pFLEtBQUssRUFBRSxDQUFDO1FBRE8sZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBSDdFLDZDQUE2QztRQUNuQyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBS2hDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQWxCRCxrQ0FBa0M7SUFDbEMsSUFDSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFDRCxJQUFJLE1BQU0sQ0FBQyxLQUFjO1FBQ3JCLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBV0QsV0FBVztRQUNQLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7O1lBckNKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsNEJBQTRCO2dCQUN0QyxRQUFRLEVBQUUsV0FBVztnQkFDckIsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQztnQkFDaEMsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxhQUFhO29CQUNwQixxQkFBcUIsRUFBRSxRQUFRO29CQUMvQixzQkFBc0IsRUFBRSxxQkFBcUI7b0JBQzdDLGlCQUFpQixFQUFFLFVBQVU7b0JBQzdCLHFCQUFxQixFQUFFLFVBQVU7b0JBQ2pDLG1CQUFtQixFQUFFLFFBQVE7aUJBQ2hDO2FBQ0o7Ozs7WUFwRUcsVUFBVTtZQUxMLFlBQVk7OztxQkE2RWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENhbkNvbG9yLFxuICAgIENhbkNvbG9yQ3RvcixcbiAgICBDYW5EaXNhYmxlLFxuICAgIENhbkRpc2FibGVDdG9yLFxuICAgIEhhc1RhYkluZGV4LFxuICAgIEhhc1RhYkluZGV4Q3RvcixcbiAgICBtaXhpbkNvbG9yLFxuICAgIG1peGluRGlzYWJsZWQsXG4gICAgbWl4aW5UYWJJbmRleFxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNY1RhYk5hdi5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY2xhc3MgTWNUYWJOYXZCYXNlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1RhYk5hdk1peGluQmFzZTogQ2FuQ29sb3JDdG9yICZcbiAgICB0eXBlb2YgTWNUYWJOYXZCYXNlID0gbWl4aW5Db2xvcihNY1RhYk5hdkJhc2UpO1xuXG4vKipcbiAqIE5hdmlnYXRpb24gY29tcG9uZW50IG1hdGNoaW5nIHRoZSBzdHlsZXMgb2YgdGhlIHRhYiBncm91cCBoZWFkZXIuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnW21jLXRhYi1uYXYtYmFyXScsXG4gICAgZXhwb3J0QXM6ICdtY1RhYk5hdkJhciwgbWNUYWJOYXYnLFxuICAgIGlucHV0czogWydjb2xvciddLFxuICAgIHRlbXBsYXRlVXJsOiAndGFiLW5hdi1iYXIuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3RhYi1uYXYtYmFyLnNjc3MnXSxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtdGFiLW5hdi1iYXInIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY1RhYk5hdiBleHRlbmRzIE1jVGFiTmF2TWl4aW5CYXNlIGltcGxlbWVudHMgQ2FuQ29sb3Ige1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgfVxuIH1cblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNY1RhYkxpbmsuXG5leHBvcnQgY2xhc3MgTWNUYWJMaW5rQmFzZSB7fVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNUYWJMaW5rTWl4aW5CYXNlOiBIYXNUYWJJbmRleEN0b3IgJiBDYW5EaXNhYmxlQ3RvciAmXG4gICAgdHlwZW9mIE1jVGFiTGlua0Jhc2UgPSBtaXhpblRhYkluZGV4KG1peGluRGlzYWJsZWQoTWNUYWJMaW5rQmFzZSkpO1xuXG4vKipcbiAqIExpbmsgaW5zaWRlIG9mIGEgYG1jLXRhYi1uYXYtYmFyYC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWMtdGFiLWxpbmtdLCBbbWNUYWJMaW5rXScsXG4gICAgZXhwb3J0QXM6ICdtY1RhYkxpbmsnLFxuICAgIGlucHV0czogWydkaXNhYmxlZCcsICd0YWJJbmRleCddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy10YWItbGluaycsXG4gICAgICAgICdbYXR0ci5hcmlhLWN1cnJlbnRdJzogJ2FjdGl2ZScsXG4gICAgICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZC50b1N0cmluZygpJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgICAgICdbY2xhc3MubWMtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1hY3RpdmVdJzogJ2FjdGl2ZSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVGFiTGluayBleHRlbmRzIE1jVGFiTGlua01peGluQmFzZVxuICAgIGltcGxlbWVudHMgT25EZXN0cm95LCBDYW5EaXNhYmxlLCBIYXNUYWJJbmRleCB7XG4gICAgLyoqIFdoZXRoZXIgdGhlIGxpbmsgaXMgYWN0aXZlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGFjdGl2ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNBY3RpdmU7XG4gICAgfVxuICAgIHNldCBhY3RpdmUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgdGFiIGxpbmsgaXMgYWN0aXZlIG9yIG5vdC4gKi9cbiAgICBwcm90ZWN0ZWQgaXNBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3IubW9uaXRvcih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG59XG4iXX0=