import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Attribute, ChangeDetectionStrategy, Component, ContentChildren, Directive, ElementRef, Input, QueryList, ViewEncapsulation } from '@angular/core';
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
                selector: 'a[mc-tab-link], a[mcTabLink]',
                exportAs: 'mcTabLink',
                inputs: ['disabled', 'tabIndex'],
                host: {
                    class: 'mc-tab-link',
                    '[attr.tabindex]': 'tabIndex',
                    '[class.mc-disabled]': 'disabled',
                    '[class.mc-active]': 'active',
                    '[class.mc-tab-label_vertical]': 'vertical',
                    '[class.mc-tab-label_horizontal]': '!vertical'
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
                template: "<div class=\"mc-tab-links\">\n    <ng-content></ng-content>\n</div>\n",
                host: {
                    class: 'mc-tab-nav-bar'
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link.cdk-keyboard-focused:after{display:block;content:\"\";position:absolute;top:0;right:calc(-1 * var(--mc-tabs-size-border-width, 1px));bottom:calc(-1 * var(--mc-tabs-size-border-width, 1px));left:calc(-1 * var(--mc-tabs-size-border-width, 1px))}.mc-tab-nav-bar.mc-tab-group_old .mc-tab-link.cdk-keyboard-focused:after{border-style:solid;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px);border-bottom:solid transparent;border-width:calc(var(--mc-tabs-size-border-width, 1px) * 2)}.mc-tab-link{vertical-align:top;text-decoration:none;-webkit-tap-highlight-color:transparent}.mc-tab-group_stretch-labels .mc-tab-link{flex-basis:0;flex-grow:1}.mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar{display:flex}.mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:var(--mc-tabs-size-height,40px);text-align:center;white-space:nowrap;cursor:pointer;padding-right:var(--mc-tabs-size-padding-horizontal,16px);padding-left:var(--mc-tabs-size-padding-horizontal,16px);outline:none}.mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link .mc-tab-overlay{position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none}.mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link.mc-active{cursor:default}.mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link.mc-active:before{display:block;content:\"\";position:absolute}.mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link.mc-active.mc-disabled .mc-tab-overlay{bottom:-1px}.mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link.cdk-keyboard-focused{z-index:1}.mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link:first-child.cdk-keyboard-focused:after{left:0}.mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link:last-child.cdk-keyboard-focused:after{right:0}.mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link .mc-tab-label__template{display:flex;flex-direction:row;align-items:baseline}.mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link .mc-tab-label__template>.mc-icon.mc-icon_left{margin-right:var(--mc-tabs-size-label-icon-margin,8px)}.mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link .mc-tab-label__template>.mc-icon.mc-icon_right{margin-left:var(--mc-tabs-size-label-icon-margin,8px)}.mc-tab-nav-bar.mc-tab-group_old .mc-tab-link{border-bottom-width:var(--mc-tabs-size-border-width,1px);border-top-width:var(--mc-tabs-size-border-width,1px);border-bottom-style:solid;border-top-style:solid;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px);border-left:transparent;border-right:transparent}.mc-tab-nav-bar.mc-tab-group_old .mc-tab-link.mc-active{border-width:var(--mc-tabs-size-border-width,1px);border-style:solid;padding-right:calc(var(--mc-tabs-size-padding-horizontal, 16px) - var(--mc-tabs-size-border-width, 1px));padding-left:calc(var(--mc-tabs-size-padding-horizontal, 16px) - var(--mc-tabs-size-border-width, 1px))}.mc-tab-nav-bar.mc-tab-group_old .mc-tab-link.mc-active.cdk-keyboard-focused:after{right:calc(-2 * var(--mc-tabs-size-border-width, 1px));left:calc(-2 * var(--mc-tabs-size-border-width, 1px))}.mc-tab-nav-bar.mc-tab-group_old .mc-tab-link.cdk-keyboard-focused:after{top:-1px}.mc-tab-nav-bar.mc-tab-group_old .mc-tab-link .mc-tab-overlay{top:-1px;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px)}.mc-tab-links{display:flex;position:relative;padding:1px 1px 0;flex-grow:1}.mc-tab-links .mc-tab-group_align-labels-center{justify-content:center}.mc-tab-links .mc-tab-group_align-labels-end{justify-content:flex-end}"]
            },] }
];
/** @nocollapse */
McTabNav.ctorParameters = () => [
    { type: String, decorators: [{ type: Attribute, args: ['vertical',] }] }
];
McTabNav.propDecorators = {
    links: [{ type: ContentChildren, args: [McTabLink,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLW5hdi1iYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdGFicy90YWItbmF2LWJhci90YWItbmF2LWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUVILFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsU0FBUyxFQUFFLGVBQWUsRUFDMUIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ00sU0FBUyxFQUNwQixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUtILGFBQWEsRUFDYixhQUFhLEVBQ2hCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3ZDLGdEQUFnRDtBQUNoRCxNQUFNLE9BQU8sYUFBYTtDQUFHO0FBQzdCLDZDQUE2QztBQUM3QyxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FDSixhQUFhLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7QUFFdkU7O0dBRUc7QUFjSCxNQUFNLE9BQU8sU0FBVSxTQUFRLGtCQUFrQjtJQWlCN0MsWUFDVyxVQUFzQixFQUNyQixZQUEwQjtRQUVsQyxLQUFLLEVBQUUsQ0FBQztRQUhELGVBQVUsR0FBVixVQUFVLENBQVk7UUFDckIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFMdEMsNkNBQTZDO1FBQ25DLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFRaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBckJELGtDQUFrQztJQUNsQyxJQUNJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUNELElBQUksTUFBTSxDQUFDLEtBQWM7UUFDckIsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztTQUN6QjtJQUNMLENBQUM7SUFjRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNwRSxDQUFDOzs7WUF6Q0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw4QkFBOEI7Z0JBQ3hDLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO2dCQUNoQyxJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLGFBQWE7b0JBQ3BCLGlCQUFpQixFQUFFLFVBQVU7b0JBQzdCLHFCQUFxQixFQUFFLFVBQVU7b0JBQ2pDLG1CQUFtQixFQUFFLFFBQVE7b0JBQzdCLCtCQUErQixFQUFFLFVBQVU7b0JBQzNDLGlDQUFpQyxFQUFFLFdBQVc7aUJBQ2pEO2FBQ0o7Ozs7WUFyQ0csVUFBVTtZQVJMLFlBQVk7OztxQkFrRGhCLEtBQUs7O0FBNEJWOztHQUVHO0FBWUgsTUFBTSxPQUFPLFFBQVE7SUFLakIsWUFBbUMsUUFBZ0I7UUFKbkQsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUtiLElBQUksQ0FBQyxRQUFRLEdBQUcscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELGtCQUFrQjtRQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTzthQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDZCxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFbEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNqQyxDQUFDOzs7WUExQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLGlGQUErQjtnQkFFL0IsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxnQkFBZ0I7aUJBQzFCO2dCQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7Ozs7eUNBTWdCLFNBQVMsU0FBQyxVQUFVOzs7b0JBRmhDLGVBQWUsU0FBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBdHRyaWJ1dGUsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LCBRdWVyeUxpc3QsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENhbkRpc2FibGUsXG4gICAgQ2FuRGlzYWJsZUN0b3IsXG4gICAgSGFzVGFiSW5kZXgsXG4gICAgSGFzVGFiSW5kZXhDdG9yLFxuICAgIG1peGluRGlzYWJsZWQsXG4gICAgbWl4aW5UYWJJbmRleFxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBkZWxheSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1jVGFiTGluay5cbmV4cG9ydCBjbGFzcyBNY1RhYkxpbmtCYXNlIHt9XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1RhYkxpbmtNaXhpbkJhc2U6IEhhc1RhYkluZGV4Q3RvciAmIENhbkRpc2FibGVDdG9yICZcbiAgICB0eXBlb2YgTWNUYWJMaW5rQmFzZSA9IG1peGluVGFiSW5kZXgobWl4aW5EaXNhYmxlZChNY1RhYkxpbmtCYXNlKSk7XG5cbi8qKlxuICogTGluayBpbnNpZGUgb2YgYSBgbWMtdGFiLW5hdi1iYXJgLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2FbbWMtdGFiLWxpbmtdLCBhW21jVGFiTGlua10nLFxuICAgIGV4cG9ydEFzOiAnbWNUYWJMaW5rJyxcbiAgICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAndGFiSW5kZXgnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdGFiLWxpbmsnLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWFjdGl2ZV0nOiAnYWN0aXZlJyxcbiAgICAgICAgJ1tjbGFzcy5tYy10YWItbGFiZWxfdmVydGljYWxdJzogJ3ZlcnRpY2FsJyxcbiAgICAgICAgJ1tjbGFzcy5tYy10YWItbGFiZWxfaG9yaXpvbnRhbF0nOiAnIXZlcnRpY2FsJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUYWJMaW5rIGV4dGVuZHMgTWNUYWJMaW5rTWl4aW5CYXNlIGltcGxlbWVudHMgT25EZXN0cm95LCBDYW5EaXNhYmxlLCBIYXNUYWJJbmRleCB7XG4gICAgdmVydGljYWw7XG5cbiAgICAvKiogV2hldGhlciB0aGUgbGluayBpcyBhY3RpdmUuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0FjdGl2ZTtcbiAgICB9XG4gICAgc2V0IGFjdGl2ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSB0YWIgbGluayBpcyBhY3RpdmUgb3Igbm90LiAqL1xuICAgIHByb3RlY3RlZCBpc0FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3IubW9uaXRvcih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBOYXZpZ2F0aW9uIGNvbXBvbmVudCBtYXRjaGluZyB0aGUgc3R5bGVzIG9mIHRoZSB0YWIgZ3JvdXAgaGVhZGVyLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1ttYy10YWItbmF2LWJhcl0nLFxuICAgIGV4cG9ydEFzOiAnbWNUYWJOYXZCYXIsIG1jVGFiTmF2JyxcbiAgICB0ZW1wbGF0ZVVybDogJ3RhYi1uYXYtYmFyLmh0bWwnLFxuICAgIHN0eWxlVXJsczogWyd0YWItbmF2LWJhci5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRhYi1uYXYtYmFyJ1xuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY1RhYk5hdiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgIHZlcnRpY2FsID0gZmFsc2U7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKE1jVGFiTGluaykgbGlua3M6IFF1ZXJ5TGlzdDxNY1RhYkxpbms+O1xuXG4gICAgY29uc3RydWN0b3IoQEF0dHJpYnV0ZSgndmVydGljYWwnKSB2ZXJ0aWNhbDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudmVydGljYWwgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmVydGljYWwpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5saW5rcy5jaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShkZWxheSgwKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGxpbmtzKSA9PiBsaW5rcy5mb3JFYWNoKChsaW5rKSA9PiBsaW5rLnZlcnRpY2FsID0gdGhpcy52ZXJ0aWNhbCkpO1xuXG4gICAgICAgIHRoaXMubGlua3Mubm90aWZ5T25DaGFuZ2VzKCk7XG4gICAgfVxufVxuIl19