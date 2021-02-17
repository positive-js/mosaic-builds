/**
 * @fileoverview added by tsickle
 * Generated from: tab-nav-bar/tab-nav-bar.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, Directive, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { mixinColor, mixinDisabled, mixinTabIndex } from '@ptsecurity/mosaic/core';
// Boilerplate for applying mixins to McTabNav.
/**
 * \@docs-private
 */
export class McTabNavBase {
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
    McTabNavBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export const McTabNavMixinBase = mixinColor(McTabNavBase);
/**
 * Navigation component matching the styles of the tab group header.
 */
export class McTabNav extends McTabNavMixinBase {
    /**
     * @param {?} elementRef
     */
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
                styles: [".mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-active:before,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link:hover:before,.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused:after{content:\"\";display:block;position:absolute}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-active:before,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link:hover:before{bottom:calc(var(--mc-tabs-size-border-width, 1px)*-1);height:var(--mc-tabs-size-highlight-height,4px);left:0;right:0}.mc-tab-link{-webkit-tap-highlight-color:transparent;text-decoration:none;vertical-align:top}.mc-tab-group_stretch-labels .mc-tab-link{flex-basis:0;flex-grow:1}.mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar{display:flex}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link{align-items:center;border-bottom-style:solid;border-bottom-width:var(--mc-tabs-size-border-width,1px);border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px);border-top-style:solid;border-top-width:var(--mc-tabs-size-border-width,1px);box-sizing:border-box;cursor:pointer;display:inline-flex;height:var(--mc-tabs-size-height,40px);justify-content:center;outline:none;padding-left:var(--mc-tabs-size-padding-horizontal,16px);padding-right:var(--mc-tabs-size-padding-horizontal,16px);position:relative;text-align:center;white-space:nowrap}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused{z-index:1}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused:after{border-bottom:none;border-style:solid;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px);border-width:calc(var(--mc-tabs-size-border-width, $tabs-size-border-width)*2);bottom:calc(var(--mc-tabs-size-border-width, 1px)*-1);left:calc(var(--mc-tabs-size-border-width, 1px)*-1);right:calc(var(--mc-tabs-size-border-width, 1px)*-1);top:-calc(var(--mc-tabs-size-border-width,$tabs-size-border-width)*2)}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link .mc-tab-overlay{bottom:0;left:0;pointer-events:none;position:absolute;right:0;top:-1px}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-active{border-style:solid;border-width:var(--mc-tabs-size-border-width,1px);padding-left:calc(var(--mc-tabs-size-padding-horizontal, 16px) - var(--mc-tabs-size-border-width, 1px));padding-right:calc(var(--mc-tabs-size-padding-horizontal, 16px) - var(--mc-tabs-size-border-width, 1px))}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-active.cdk-keyboard-focused:after{left:-calc(var(--mc-tabs-size-border-width,$tabs-size-border-width)*2);right:-calc(var(--mc-tabs-size-border-width,$tabs-size-border-width)*2);z-index:1}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link .mc-tab-overlay{border-top:var(--mc-tabs-size-border-width,1px) solid transparent;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px)}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link{align-items:center;border-bottom-style:solid;border-bottom-width:var(--mc-tabs-size-border-width,1px);box-sizing:border-box;cursor:pointer;display:inline-flex;height:var(--mc-tabs-size-height,40px);justify-content:center;outline:none;padding-left:var(--mc-tabs-size-padding-horizontal,16px);padding-right:var(--mc-tabs-size-padding-horizontal,16px);position:relative;text-align:center;white-space:nowrap}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused{z-index:1}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after{border-bottom:none;border-style:solid;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px);border-width:calc(var(--mc-tabs-size-border-width, $tabs-size-border-width)*2);bottom:calc(var(--mc-tabs-size-border-width, 1px)*-1);left:calc(var(--mc-tabs-size-border-width, 1px)*-1);right:calc(var(--mc-tabs-size-border-width, 1px)*-1);top:-calc(var(--mc-tabs-size-border-width,$tabs-size-border-width)*2)}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link .mc-tab-overlay{bottom:0;left:0;pointer-events:none;right:0;top:-1px}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused+:hover:before{left:calc(var(--mc-tabs-size-border-width, $tabs-size-border-width)*2 - var(--mc-tabs-size-border-width, 1px))}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after{top:calc(var(--mc-tabs-size-border-width, 1px)*-1)}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link .mc-tab-overlay{position:absolute;top:0}.mc-tab-links{display:flex;flex-grow:1;padding:1px 1px 0;position:relative}.mc-tab-links .mc-tab-group_align-labels-center{justify-content:center}.mc-tab-links .mc-tab-group_align-labels-end{justify-content:flex-end}"]
            }] }
];
/** @nocollapse */
McTabNav.ctorParameters = () => [
    { type: ElementRef }
];
// Boilerplate for applying mixins to McTabLink.
export class McTabLinkBase {
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export const McTabLinkMixinBase = mixinTabIndex(mixinDisabled(McTabLinkBase));
/**
 * Link inside of a `mc-tab-nav-bar`.
 */
export class McTabLink extends McTabLinkMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} focusMonitor
     */
    constructor(elementRef, focusMonitor) {
        super();
        this.elementRef = elementRef;
        this.focusMonitor = focusMonitor;
        /**
         * Whether the tab link is active or not.
         */
        this.isActive = false;
        this.focusMonitor.monitor(this.elementRef.nativeElement);
    }
    /**
     * Whether the link is active.
     * @return {?}
     */
    get active() {
        return this.isActive;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set active(value) {
        if (value !== this.isActive) {
            this.isActive = value;
        }
    }
    /**
     * @return {?}
     */
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
if (false) {
    /**
     * Whether the tab link is active or not.
     * @type {?}
     * @protected
     */
    McTabLink.prototype.isActive;
    /** @type {?} */
    McTabLink.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    McTabLink.prototype.focusMonitor;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLW5hdi1iYXIuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy90YWJzLyIsInNvdXJjZXMiOlsidGFiLW5hdi1iYXIvdGFiLW5hdi1iYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBRUwsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFPSCxVQUFVLEVBQ1YsYUFBYSxFQUNiLGFBQWEsRUFDaEIsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7QUFLakMsTUFBTSxPQUFPLFlBQVk7Ozs7O0lBRXJCLFlBQW1CLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lBQUcsQ0FBQztDQUNqRDs7O0lBRGUsbUNBQThCOzs7O0FBRzlDLE1BQU0sT0FBTyxpQkFBaUIsR0FDSixVQUFVLENBQUMsWUFBWSxDQUFDOzs7O0FBZWxELE1BQU0sT0FBTyxRQUFTLFNBQVEsaUJBQWlCOzs7O0lBQzNDLFlBQVksVUFBc0I7UUFDOUIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7OztZQWJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLGlGQUErQjtnQkFFL0IsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFO2dCQUNqQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7O1lBeENHLFVBQVU7OztBQWdEZCxNQUFNLE9BQU8sYUFBYTtDQUFHOzs7QUFFN0IsTUFBTSxPQUFPLGtCQUFrQixHQUNKLGFBQWEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7Ozs7QUFrQnRFLE1BQU0sT0FBTyxTQUFVLFNBQVEsa0JBQWtCOzs7OztJQWdCN0MsWUFBbUIsVUFBc0IsRUFBVSxZQUEwQjtRQUN6RSxLQUFLLEVBQUUsQ0FBQztRQURPLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYzs7OztRQUZuRSxhQUFRLEdBQVksS0FBSyxDQUFDO1FBS2hDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7Ozs7SUFqQkQsSUFDSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBQ0QsSUFBSSxNQUFNLENBQUMsS0FBYztRQUNyQixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQzs7OztJQVdELFdBQVc7UUFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7OztZQXJDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDRCQUE0QjtnQkFDdEMsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7Z0JBQ2hDLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsYUFBYTtvQkFDcEIscUJBQXFCLEVBQUUsUUFBUTtvQkFDL0Isc0JBQXNCLEVBQUUscUJBQXFCO29CQUM3QyxpQkFBaUIsRUFBRSxVQUFVO29CQUM3QixxQkFBcUIsRUFBRSxVQUFVO29CQUNqQyxtQkFBbUIsRUFBRSxRQUFRO2lCQUNoQzthQUNKOzs7O1lBcEVHLFVBQVU7WUFMTCxZQUFZOzs7cUJBNkVoQixLQUFLOzs7Ozs7OztJQVdOLDZCQUFvQzs7SUFFeEIsK0JBQTZCOzs7OztJQUFFLGlDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQ2FuQ29sb3IsXG4gICAgQ2FuQ29sb3JDdG9yLFxuICAgIENhbkRpc2FibGUsXG4gICAgQ2FuRGlzYWJsZUN0b3IsXG4gICAgSGFzVGFiSW5kZXgsXG4gICAgSGFzVGFiSW5kZXhDdG9yLFxuICAgIG1peGluQ29sb3IsXG4gICAgbWl4aW5EaXNhYmxlZCxcbiAgICBtaXhpblRhYkluZGV4XG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1jVGFiTmF2LlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjbGFzcyBNY1RhYk5hdkJhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jVGFiTmF2TWl4aW5CYXNlOiBDYW5Db2xvckN0b3IgJlxuICAgIHR5cGVvZiBNY1RhYk5hdkJhc2UgPSBtaXhpbkNvbG9yKE1jVGFiTmF2QmFzZSk7XG5cbi8qKlxuICogTmF2aWdhdGlvbiBjb21wb25lbnQgbWF0Y2hpbmcgdGhlIHN0eWxlcyBvZiB0aGUgdGFiIGdyb3VwIGhlYWRlci5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbbWMtdGFiLW5hdi1iYXJdJyxcbiAgICBleHBvcnRBczogJ21jVGFiTmF2QmFyLCBtY1RhYk5hdicsXG4gICAgaW5wdXRzOiBbJ2NvbG9yJ10sXG4gICAgdGVtcGxhdGVVcmw6ICd0YWItbmF2LWJhci5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsndGFiLW5hdi1iYXIuc2NzcyddLFxuICAgIGhvc3Q6IHsgY2xhc3M6ICdtYy10YWItbmF2LWJhcicgfSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1jVGFiTmF2IGV4dGVuZHMgTWNUYWJOYXZNaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5Db2xvciB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB9XG4gfVxuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1jVGFiTGluay5cbmV4cG9ydCBjbGFzcyBNY1RhYkxpbmtCYXNlIHt9XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1RhYkxpbmtNaXhpbkJhc2U6IEhhc1RhYkluZGV4Q3RvciAmIENhbkRpc2FibGVDdG9yICZcbiAgICB0eXBlb2YgTWNUYWJMaW5rQmFzZSA9IG1peGluVGFiSW5kZXgobWl4aW5EaXNhYmxlZChNY1RhYkxpbmtCYXNlKSk7XG5cbi8qKlxuICogTGluayBpbnNpZGUgb2YgYSBgbWMtdGFiLW5hdi1iYXJgLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttYy10YWItbGlua10sIFttY1RhYkxpbmtdJyxcbiAgICBleHBvcnRBczogJ21jVGFiTGluaycsXG4gICAgaW5wdXRzOiBbJ2Rpc2FibGVkJywgJ3RhYkluZGV4J10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRhYi1saW5rJyxcbiAgICAgICAgJ1thdHRyLmFyaWEtY3VycmVudF0nOiAnYWN0aXZlJyxcbiAgICAgICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkLnRvU3RyaW5nKCknLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWFjdGl2ZV0nOiAnYWN0aXZlJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUYWJMaW5rIGV4dGVuZHMgTWNUYWJMaW5rTWl4aW5CYXNlXG4gICAgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIENhbkRpc2FibGUsIEhhc1RhYkluZGV4IHtcbiAgICAvKiogV2hldGhlciB0aGUgbGluayBpcyBhY3RpdmUuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0FjdGl2ZTtcbiAgICB9XG4gICAgc2V0IGFjdGl2ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSB0YWIgbGluayBpcyBhY3RpdmUgb3Igbm90LiAqL1xuICAgIHByb3RlY3RlZCBpc0FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbn1cbiJdfQ==