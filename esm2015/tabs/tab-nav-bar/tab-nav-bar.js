import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Attribute, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, Input, QueryList, Renderer2, ViewEncapsulation } from '@angular/core';
import { mixinDisabled, mixinTabIndex } from '@ptsecurity/mosaic/core';
import { delay } from 'rxjs/operators';
// Boilerplate for applying mixins to McTabLink.
export class McTabLinkBase {
}
// tslint:disable-next-line:naming-convention
export const McTabLinkMixinBase = mixinTabIndex(mixinDisabled(McTabLinkBase));
/**
 * Link inside of a `mc-tab-nav-bar`.
 */
export class McTabLink extends McTabLinkMixinBase {
    constructor(elementRef, focusMonitor, renderer) {
        super();
        this.elementRef = elementRef;
        this.focusMonitor = focusMonitor;
        this.renderer = renderer;
        this.vertical = false;
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
    ngAfterViewInit() {
        this.addClassModifierForIcons(Array.from(this.elementRef.nativeElement.querySelectorAll('.mc-icon')));
    }
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }
    addClassModifierForIcons(icons) {
        const twoIcons = 2;
        const [firstIconElement, secondIconElement] = icons;
        if (icons.length === 1) {
            const COMMENT_NODE = 8;
            if (firstIconElement.nextSibling && firstIconElement.nextSibling.nodeType !== COMMENT_NODE) {
                this.renderer.addClass(firstIconElement, 'mc-icon_left');
            }
            if (firstIconElement.previousSibling && firstIconElement.previousSibling.nodeType !== COMMENT_NODE) {
                this.renderer.addClass(firstIconElement, 'mc-icon_right');
            }
        }
        else if (icons.length === twoIcons) {
            this.renderer.addClass(firstIconElement, 'mc-icon_left');
            this.renderer.addClass(secondIconElement, 'mc-icon_right');
        }
    }
}
McTabLink.decorators = [
    { type: Component, args: [{
                selector: 'a[mc-tab-link], a[mcTabLink]',
                exportAs: 'mcTabLink',
                template: '<ng-content></ng-content><div class="mc-tab-overlay"></div>',
                inputs: ['disabled', 'tabIndex'],
                host: {
                    class: 'mc-tab-link',
                    '[class.mc-active]': 'active',
                    '[class.mc-tab-label_vertical]': 'vertical',
                    '[class.mc-tab-label_horizontal]': '!vertical',
                    '[attr.tabindex]': 'tabIndex',
                    '[attr.disabled]': 'disabled || null'
                }
            },] }
];
/** @nocollapse */
McTabLink.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor },
    { type: Renderer2 }
];
McTabLink.propDecorators = {
    active: [{ type: Input }]
};
/**
 * Navigation component matching the styles of the tab group header.
 */
export class McTabNav {
    constructor(vertical) {
        this.vertical = false;
        this.vertical = coerceBooleanProperty(vertical);
    }
    ngAfterContentInit() {
        this.links.changes
            .pipe(delay(0))
            .subscribe((links) => links.forEach((link) => link.vertical = this.vertical));
        this.links.notifyOnChanges();
    }
}
McTabNav.decorators = [
    { type: Component, args: [{
                selector: '[mc-tab-nav-bar]',
                exportAs: 'mcTabNavBar, mcTabNav',
                template: '<ng-content></ng-content>',
                host: {
                    class: 'mc-tab-nav-bar'
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mc-tab-link.cdk-keyboard-focused:after{display:block;content:\"\";position:absolute;top:0;right:calc(-1 * var(--mc-tabs-size-border-width, 1px));bottom:calc(-1 * var(--mc-tabs-size-border-width, 1px));left:calc(-1 * var(--mc-tabs-size-border-width, 1px))}.mc-tab-link{vertical-align:top;text-decoration:none;-webkit-tap-highlight-color:transparent;position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:var(--mc-tabs-size-height,40px);text-align:center;white-space:nowrap;cursor:pointer;padding-right:var(--mc-tabs-size-padding-horizontal,16px);padding-left:var(--mc-tabs-size-padding-horizontal,16px);outline:none}.mc-tab-link .mc-tab-overlay{position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none}.mc-tab-link.mc-active{cursor:default}.mc-tab-link.mc-active:before{display:block;content:\"\";position:absolute}.mc-tab-link.mc-active[disabled] .mc-tab-overlay{bottom:-1px}.mc-tab-link.cdk-keyboard-focused{z-index:1}.mc-tab-link:first-child.cdk-keyboard-focused:after{left:0}.mc-tab-link:last-child.cdk-keyboard-focused:after{right:0}.mc-tab-link[disabled]{pointer-events:none}.mc-tab-link .mc-tab-label__template{display:flex;flex-direction:row;align-items:baseline}.mc-tab-link .mc-tab-label__template>.mc-icon.mc-icon_left{margin-right:var(--mc-tabs-size-label-icon-margin,8px)}.mc-tab-link .mc-tab-label__template>.mc-icon.mc-icon_right{margin-left:var(--mc-tabs-size-label-icon-margin,8px)}.mc-tab-link .mc-tab-group_stretch-labels .mc-tab-link{flex-basis:0;flex-grow:1}.mc-tab-link>.mc-icon.mc-icon_left{margin-right:var(--mc-tabs-size-label-icon-margin,8px)}.mc-tab-link>.mc-icon.mc-icon_right{margin-left:var(--mc-tabs-size-label-icon-margin,8px)}.mc-tab-nav-bar{display:flex;flex-grow:1;position:relative;padding:1px 1px 0}.mc-tab-nav-bar .mc-tab-group_align-labels-center{justify-content:center}.mc-tab-nav-bar .mc-tab-group_align-labels-end{justify-content:flex-end}.mc-tab-nav-bar.mc-tab-group_vertical{flex-direction:column;flex-grow:0}"]
            },] }
];
/** @nocollapse */
McTabNav.ctorParameters = () => [
    { type: String, decorators: [{ type: Attribute, args: ['vertical',] }] }
];
McTabNav.propDecorators = {
    links: [{ type: ContentChildren, args: [McTabLink,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLW5hdi1iYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdGFicy90YWItbmF2LWJhci90YWItbmF2LWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUVILFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsS0FBSyxFQUVMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFLSCxhQUFhLEVBQ2IsYUFBYSxFQUNoQixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd2QyxnREFBZ0Q7QUFDaEQsTUFBTSxPQUFPLGFBQWE7Q0FBRztBQUM3Qiw2Q0FBNkM7QUFDN0MsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQ0osYUFBYSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0FBRXZFOztHQUVHO0FBZ0JILE1BQU0sT0FBTyxTQUFVLFNBQVEsa0JBQWtCO0lBa0I3QyxZQUNXLFVBQXNCLEVBQ1osWUFBMEIsRUFDMUIsUUFBbUI7UUFFcEMsS0FBSyxFQUFFLENBQUM7UUFKRCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ1osaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQXBCeEMsYUFBUSxHQUFHLEtBQUssQ0FBQztRQWNqQiw2Q0FBNkM7UUFDbkMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQVNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEs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QUVsRixJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ2pDLENBQUM7OztZQTFCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsUUFBUSxFQUFFLDJCQUEyQjtnQkFFckMsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxnQkFBZ0I7aUJBQzFCO2dCQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7Ozs7eUNBTWdCLFNBQVMsU0FBQyxVQUFVOzs7b0JBRmhDLGVBQWUsU0FBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBdHRyaWJ1dGUsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBRdWVyeUxpc3QsXG4gICAgUmVuZGVyZXIyLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDYW5EaXNhYmxlLFxuICAgIENhbkRpc2FibGVDdG9yLFxuICAgIEhhc1RhYkluZGV4LFxuICAgIEhhc1RhYkluZGV4Q3RvcixcbiAgICBtaXhpbkRpc2FibGVkLFxuICAgIG1peGluVGFiSW5kZXhcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgZGVsYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNY1RhYkxpbmsuXG5leHBvcnQgY2xhc3MgTWNUYWJMaW5rQmFzZSB7fVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNUYWJMaW5rTWl4aW5CYXNlOiBIYXNUYWJJbmRleEN0b3IgJiBDYW5EaXNhYmxlQ3RvciAmXG4gICAgdHlwZW9mIE1jVGFiTGlua0Jhc2UgPSBtaXhpblRhYkluZGV4KG1peGluRGlzYWJsZWQoTWNUYWJMaW5rQmFzZSkpO1xuXG4vKipcbiAqIExpbmsgaW5zaWRlIG9mIGEgYG1jLXRhYi1uYXYtYmFyYC5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhW21jLXRhYi1saW5rXSwgYVttY1RhYkxpbmtdJyxcbiAgICBleHBvcnRBczogJ21jVGFiTGluaycsXG4gICAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+PGRpdiBjbGFzcz1cIm1jLXRhYi1vdmVybGF5XCI+PC9kaXY+JyxcbiAgICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAndGFiSW5kZXgnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdGFiLWxpbmsnLFxuICAgICAgICAnW2NsYXNzLm1jLWFjdGl2ZV0nOiAnYWN0aXZlJyxcbiAgICAgICAgJ1tjbGFzcy5tYy10YWItbGFiZWxfdmVydGljYWxdJzogJ3ZlcnRpY2FsJyxcbiAgICAgICAgJ1tjbGFzcy5tYy10YWItbGFiZWxfaG9yaXpvbnRhbF0nOiAnIXZlcnRpY2FsJyxcblxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUYWJMaW5rIGV4dGVuZHMgTWNUYWJMaW5rTWl4aW5CYXNlIGltcGxlbWVudHMgT25EZXN0cm95LCBDYW5EaXNhYmxlLCBIYXNUYWJJbmRleCB7XG4gICAgdmVydGljYWwgPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBsaW5rIGlzIGFjdGl2ZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzQWN0aXZlO1xuICAgIH1cblxuICAgIHNldCBhY3RpdmUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgdGFiIGxpbmsgaXMgYWN0aXZlIG9yIG5vdC4gKi9cbiAgICBwcm90ZWN0ZWQgaXNBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBmb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcixcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3IubW9uaXRvcih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFkZENsYXNzTW9kaWZpZXJGb3JJY29ucyhBcnJheS5mcm9tKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tYy1pY29uJykpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkQ2xhc3NNb2RpZmllckZvckljb25zKGljb25zOiBIVE1MRWxlbWVudFtdKSB7XG4gICAgICAgIGNvbnN0IHR3b0ljb25zID0gMjtcbiAgICAgICAgY29uc3QgW2ZpcnN0SWNvbkVsZW1lbnQsIHNlY29uZEljb25FbGVtZW50XSA9IGljb25zO1xuXG4gICAgICAgIGlmIChpY29ucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IENPTU1FTlRfTk9ERSA9IDg7XG5cbiAgICAgICAgICAgIGlmIChmaXJzdEljb25FbGVtZW50Lm5leHRTaWJsaW5nICYmIGZpcnN0SWNvbkVsZW1lbnQubmV4dFNpYmxpbmcubm9kZVR5cGUgIT09IENPTU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZmlyc3RJY29uRWxlbWVudCwgJ21jLWljb25fbGVmdCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZmlyc3RJY29uRWxlbWVudC5wcmV2aW91c1NpYmxpbmcgJiYgZmlyc3RJY29uRWxlbWVudC5wcmV2aW91c1NpYmxpbmcubm9kZVR5cGUgIT09IENPTU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZmlyc3RJY29uRWxlbWVudCwgJ21jLWljb25fcmlnaHQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpY29ucy5sZW5ndGggPT09IHR3b0ljb25zKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGZpcnN0SWNvbkVsZW1lbnQsICdtYy1pY29uX2xlZnQnKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Moc2Vjb25kSWNvbkVsZW1lbnQsICdtYy1pY29uX3JpZ2h0Jyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLyoqXG4gKiBOYXZpZ2F0aW9uIGNvbXBvbmVudCBtYXRjaGluZyB0aGUgc3R5bGVzIG9mIHRoZSB0YWIgZ3JvdXAgaGVhZGVyLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1ttYy10YWItbmF2LWJhcl0nLFxuICAgIGV4cG9ydEFzOiAnbWNUYWJOYXZCYXIsIG1jVGFiTmF2JyxcbiAgICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAgIHN0eWxlVXJsczogWyd0YWItbmF2LWJhci5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRhYi1uYXYtYmFyJ1xuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY1RhYk5hdiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgIHZlcnRpY2FsID0gZmFsc2U7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKE1jVGFiTGluaykgbGlua3M6IFF1ZXJ5TGlzdDxNY1RhYkxpbms+O1xuXG4gICAgY29uc3RydWN0b3IoQEF0dHJpYnV0ZSgndmVydGljYWwnKSB2ZXJ0aWNhbDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudmVydGljYWwgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmVydGljYWwpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5saW5rcy5jaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShkZWxheSgwKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGxpbmtzKSA9PiBsaW5rcy5mb3JFYWNoKChsaW5rKSA9PiBsaW5rLnZlcnRpY2FsID0gdGhpcy52ZXJ0aWNhbCkpO1xuXG4gICAgICAgIHRoaXMubGlua3Mubm90aWZ5T25DaGFuZ2VzKCk7XG4gICAgfVxufVxuIl19