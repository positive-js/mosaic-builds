import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, ContentChild, Directive, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { McButtonCssStyler } from '@ptsecurity/mosaic/button';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
export class McNavbarLogo {
}
McNavbarLogo.decorators = [
    { type: Directive, args: [{
                selector: 'mc-navbar-logo, [mc-navbar-logo]',
                host: {
                    class: 'mc-navbar-logo'
                }
            },] }
];
export class McNavbarTitle {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    get text() {
        return this.elementRef.nativeElement.innerText;
    }
    getOuterElementWidth() {
        const { width, marginLeft, marginRight } = window.getComputedStyle(this.elementRef.nativeElement);
        return [width, marginLeft, marginRight].reduce((acc, item) => acc + parseInt(item) || 0, 0);
    }
    ngAfterContentInit() {
        this.outerElementWidth = this.getOuterElementWidth();
    }
}
McNavbarTitle.decorators = [
    { type: Directive, args: [{
                selector: 'mc-navbar-title, [mc-navbar-title]',
                host: {
                    class: 'mc-navbar-title'
                }
            },] }
];
/** @nocollapse */
McNavbarTitle.ctorParameters = () => [
    { type: ElementRef }
];
export class McNavbarBrand {
}
McNavbarBrand.decorators = [
    { type: Directive, args: [{
                selector: 'mc-navbar-brand, [mc-navbar-brand]',
                host: {
                    class: 'mc-navbar-brand'
                }
            },] }
];
export class McNavbarDivider {
}
McNavbarDivider.decorators = [
    { type: Directive, args: [{
                selector: 'mc-navbar-divider',
                host: {
                    class: 'mc-navbar-divider'
                }
            },] }
];
export class McNavbarItemBase {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    getOuterElementWidth() {
        const { width, marginLeft, marginRight } = window.getComputedStyle(this.elementRef.nativeElement);
        return [width, marginLeft, marginRight].reduce((acc, item) => acc + parseInt(item), 0);
    }
}
McNavbarItemBase.decorators = [
    { type: Directive, args: [{
                selector: 'mc-navbar-item, [mc-navbar-item], mc-navbar-divider, mc-navbar-brand, [mc-navbar-brand]',
                host: {
                    '[class.mc-vertical]': 'vertical',
                    '[class.mc-horizontal]': 'horizontal',
                    '[class.mc-opened]': 'vertical && !closed',
                    '[class.mc-closed]': 'vertical && closed'
                }
            },] }
];
/** @nocollapse */
McNavbarItemBase.ctorParameters = () => [
    { type: ElementRef }
];
McNavbarItemBase.propDecorators = {
    button: [{ type: ContentChild, args: [McButtonCssStyler,] }]
};
// tslint:disable-next-line:naming-convention
export const McNavbarMixinBase = mixinDisabled(McNavbarItemBase);
export class McNavbarItem extends McNavbarMixinBase {
    constructor(focusMonitor, elementRef) {
        super(elementRef);
        this.focusMonitor = focusMonitor;
        this.elementRef = elementRef;
        this._collapsable = true;
        this.collapsed = false;
        this._collapsedTitle = null;
        this._tabIndex = 0;
    }
    get collapsable() {
        return this._collapsable;
    }
    set collapsable(value) {
        this._collapsable = coerceBooleanProperty(value);
    }
    get collapsedTitle() {
        return this.collapsed ? (this._collapsedTitle || this.title.text) : null;
    }
    set collapsedTitle(value) {
        this._collapsedTitle = value;
    }
    get tabIndex() {
        return this.disabled || this.button ? -1 : this._tabIndex;
    }
    set tabIndex(value) {
        this._tabIndex = value != null ? coerceNumberProperty(value) : 0;
    }
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }
    ngAfterContentInit() {
        if (this.button) {
            return;
        }
        this.focusMonitor.monitor(this.elementRef.nativeElement, true);
    }
    getTitleWidth() {
        return this.title.outerElementWidth;
    }
}
McNavbarItem.decorators = [
    { type: Component, args: [{
                selector: 'mc-navbar-item, [mc-navbar-item]',
                exportAs: 'mcNavbarItem',
                template: `<ng-content></ng-content>`,
                host: {
                    class: 'mc-navbar-item',
                    '[class.mc-navbar-item_collapsed]': 'collapsed',
                    '[class.mc-navbar-item_button]': 'button',
                    '[attr.title]': 'collapsedTitle',
                    '[attr.tabindex]': 'tabIndex',
                    '[attr.disabled]': 'disabled || null'
                },
                inputs: ['disabled'],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".mc-navbar-title{display:inline-block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mc-navbar-item{position:relative;display:flex;align-items:center;height:var(--mc-navbar-item-size-height,48px);padding-left:var(--mc-navbar-item-size-padding,16px);padding-right:var(--mc-navbar-item-size-padding,16px)}.mc-navbar-item .mc-icon{min-width:16px;min-height:16px}a.mc-navbar-item{text-decoration:none}.mc-navbar-item.mc-vertical .mc-navbar-title{padding-left:26px}.mc-navbar-item.mc-vertical .mc-icon+.mc-navbar-title,.mc-navbar-item.mc-vertical .mc-navbar-title+.mc-icon{padding-left:var(--mc-vertical-navbar-size-icon-margin,10px)}.mc-navbar-item.mc-vertical .mc-badge{position:absolute;display:flex;align-items:center;justify-content:center}.mc-navbar-item.mc-vertical.mc-opened .mc-badge{right:16px;height:24px;padding-right:7px;padding-left:7px}.mc-navbar-item.mc-vertical.mc-closed .mc-badge{top:8px;right:8px;height:16px;padding-right:4px;padding-left:4px}.mc-navbar-item.mc-vertical.mc-closed .mc-navbar-title{display:none}.mc-navbar-item.mc-vertical.mc-closed.mc-navbar-item_button{padding-left:8px;padding-right:8px}.mc-navbar-item.mc-horizontal .mc-icon+.mc-navbar-title,.mc-navbar-item.mc-horizontal .mc-navbar-title+.mc-icon{padding-left:var(--mc-navbar-size-icon-margin,4px)}.mc-navbar-item.mc-horizontal.mc-navbar-item_collapsed .mc-navbar-title{display:none}.mc-navbar-item.mc-navbar-item_button .mc-icon-button{flex:1}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper{justify-content:center}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_left{margin-left:unset}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_right{margin-right:unset}", ".mc-navbar-logo{display:flex}.mc-navbar-brand{position:relative;display:flex;align-items:center}.mc-navbar-brand .mc-navbar-title{cursor:default}.mc-navbar-brand.mc-horizontal{height:100%;padding-right:var(--mc-navbar-brand-size-margin-right,24px)}.mc-navbar-brand.mc-horizontal .mc-navbar-title{padding-left:var(--mc-navbar-brand-size-padding,12px);padding-right:0;cursor:default}.mc-navbar-brand.mc-vertical{flex-direction:column;padding-left:16px}.mc-navbar-brand.mc-vertical .mc-navbar-logo{flex-direction:column;width:48px;height:48px}.mc-navbar-brand.mc-vertical .mc-navbar-title{display:flex;align-items:center;height:var(--mc-navbar-item-size-height,48px);padding-left:0}.mc-navbar-brand.mc-vertical.mc-opened{align-items:unset}.mc-navbar-brand.mc-vertical.mc-opened .mc-navbar-item{position:absolute;top:0;right:0}.mc-navbar-brand.mc-vertical.mc-opened .mc-navbar-logo{justify-content:flex-end}.mc-navbar-brand.mc-vertical.mc-closed{padding:0}.mc-navbar-brand.mc-vertical.mc-closed .mc-navbar-logo{align-items:center;justify-content:center}.mc-navbar-brand.mc-vertical.mc-closed .mc-navbar-title{display:none}", ".mc-navbar-divider{display:block}.mc-navbar-divider.mc-vertical{height:1px;margin:8px 16px}.mc-navbar-divider.mc-vertical.mc-closed{margin-right:10px;margin-left:10px}.mc-navbar-divider.mc-horizontal{width:1px;height:28px;margin-left:8px;margin-right:8px}"]
            },] }
];
/** @nocollapse */
McNavbarItem.ctorParameters = () => [
    { type: FocusMonitor },
    { type: ElementRef }
];
McNavbarItem.propDecorators = {
    button: [{ type: ContentChild, args: [McButtonCssStyler,] }],
    title: [{ type: ContentChild, args: [McNavbarTitle,] }],
    icon: [{ type: ContentChild, args: [McIcon,] }],
    collapsable: [{ type: Input }],
    collapsedTitle: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL25hdmJhci9uYXZiYXItaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BGLE9BQU8sRUFFSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFFTCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUE4QixhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFTakQsTUFBTSxPQUFPLFlBQVk7OztZQU54QixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtDQUFrQztnQkFDNUMsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxnQkFBZ0I7aUJBQzFCO2FBQ0o7O0FBVUQsTUFBTSxPQUFPLGFBQWE7SUFPdEIsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFHLENBQUM7SUFKOUMsSUFBSSxJQUFJO1FBQ0osT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7SUFDbkQsQ0FBQztJQUlELG9CQUFvQjtRQUNoQixNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVsRyxPQUFPLENBQUMs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ZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN4Qzs7OztZQTNIUSxZQUFZO1lBUWpCLFVBQVU7OztxQkFxSFQsWUFBWSxTQUFDLGlCQUFpQjtvQkFDOUIsWUFBWSxTQUFDLGFBQWE7bUJBQzFCLFlBQVksU0FBQyxNQUFNOzBCQUduQixLQUFLOzZCQWlCTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5LCBjb2VyY2VOdW1iZXJQcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNY0J1dHRvbkNzc1N0eWxlciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9idXR0b24nO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZSwgQ2FuRGlzYWJsZUN0b3IsIG1peGluRGlzYWJsZWQgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0ljb24gfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvaWNvbic7XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItbG9nbywgW21jLW5hdmJhci1sb2dvXScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLW5hdmJhci1sb2dvJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJMb2dvIHt9XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItdGl0bGUsIFttYy1uYXZiYXItdGl0bGVdJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLXRpdGxlJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJUaXRsZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgIG91dGVyRWxlbWVudFdpZHRoOiBudW1iZXI7XG5cbiAgICBnZXQgdGV4dCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICAgIGdldE91dGVyRWxlbWVudFdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHsgd2lkdGgsIG1hcmdpbkxlZnQsIG1hcmdpblJpZ2h0IH0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgcmV0dXJuIFt3aWR0aCwgbWFyZ2luTGVmdCwgbWFyZ2luUmlnaHRdLnJlZHVjZSgoYWNjLCBpdGVtKSA9PiBhY2MgKyBwYXJzZUludChpdGVtKSB8fCAwLCAwKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3V0ZXJFbGVtZW50V2lkdGggPSB0aGlzLmdldE91dGVyRWxlbWVudFdpZHRoKCk7XG4gICAgfVxufVxuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLWJyYW5kLCBbbWMtbmF2YmFyLWJyYW5kXScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLW5hdmJhci1icmFuZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyQnJhbmQge31cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1kaXZpZGVyJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWRpdmlkZXInXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhckRpdmlkZXIge31cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1pdGVtLCBbbWMtbmF2YmFyLWl0ZW1dLCBtYy1uYXZiYXItZGl2aWRlciwgbWMtbmF2YmFyLWJyYW5kLCBbbWMtbmF2YmFyLWJyYW5kXScsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm1jLXZlcnRpY2FsXSc6ICd2ZXJ0aWNhbCcsXG4gICAgICAgICdbY2xhc3MubWMtaG9yaXpvbnRhbF0nOiAnaG9yaXpvbnRhbCcsXG4gICAgICAgICdbY2xhc3MubWMtb3BlbmVkXSc6ICd2ZXJ0aWNhbCAmJiAhY2xvc2VkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1jbG9zZWRdJzogJ3ZlcnRpY2FsICYmIGNsb3NlZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFySXRlbUJhc2Uge1xuICAgIEBDb250ZW50Q2hpbGQoTWNCdXR0b25Dc3NTdHlsZXIpIGJ1dHRvbjogTWNCdXR0b25Dc3NTdHlsZXI7XG5cbiAgICB2ZXJ0aWNhbDogYm9vbGVhbjtcbiAgICBob3Jpem9udGFsOiBib29sZWFuO1xuXG4gICAgY2xvc2VkOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBnZXRPdXRlckVsZW1lbnRXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCB7IHdpZHRoLCBtYXJnaW5MZWZ0LCBtYXJnaW5SaWdodCB9ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiBbd2lkdGgsIG1hcmdpbkxlZnQsIG1hcmdpblJpZ2h0XS5yZWR1Y2UoKGFjYywgaXRlbSkgPT4gYWNjICsgcGFyc2VJbnQoaXRlbSksIDApO1xuICAgIH1cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNOYXZiYXJNaXhpbkJhc2U6IENhbkRpc2FibGVDdG9yICYgdHlwZW9mIE1jTmF2YmFySXRlbUJhc2UgPSBtaXhpbkRpc2FibGVkKE1jTmF2YmFySXRlbUJhc2UpO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLWl0ZW0sIFttYy1uYXZiYXItaXRlbV0nLFxuICAgIGV4cG9ydEFzOiAnbWNOYXZiYXJJdGVtJyxcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxuICAgIHN0eWxlVXJsczogW1xuICAgICAgICAnLi9uYXZiYXItaXRlbS5zY3NzJyxcbiAgICAgICAgJy4vbmF2YmFyLWJyYW5kLnNjc3MnLFxuICAgICAgICAnLi9uYXZiYXItZGl2aWRlci5zY3NzJ1xuICAgIF0sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLW5hdmJhci1pdGVtJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1uYXZiYXItaXRlbV9jb2xsYXBzZWRdJzogJ2NvbGxhcHNlZCcsXG4gICAgICAgICdbY2xhc3MubWMtbmF2YmFyLWl0ZW1fYnV0dG9uXSc6ICdidXR0b24nLFxuXG4gICAgICAgICdbYXR0ci50aXRsZV0nOiAnY29sbGFwc2VkVGl0bGUnLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJ1xuICAgIH0sXG4gICAgaW5wdXRzOiBbJ2Rpc2FibGVkJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhckl0ZW0gZXh0ZW5kcyBNY05hdmJhck1peGluQmFzZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQ2FuRGlzYWJsZSwgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgQENvbnRlbnRDaGlsZChNY0J1dHRvbkNzc1N0eWxlcikgYnV0dG9uOiBNY0J1dHRvbkNzc1N0eWxlcjtcbiAgICBAQ29udGVudENoaWxkKE1jTmF2YmFyVGl0bGUpIHRpdGxlOiBNY05hdmJhclRpdGxlO1xuICAgIEBDb250ZW50Q2hpbGQoTWNJY29uKSBpY29uOiBNY0ljb247XG5cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGNvbGxhcHNhYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sbGFwc2FibGU7XG4gICAgfVxuXG4gICAgc2V0IGNvbGxhcHNhYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2NvbGxhcHNhYmxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jb2xsYXBzYWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBjb2xsYXBzZWQgPSBmYWxzZTtcblxuICAgIGdldCBjb2xsYXBzZWRUaXRsZSgpOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGFwc2VkID8gKHRoaXMuX2NvbGxhcHNlZFRpdGxlIHx8IHRoaXMudGl0bGUudGV4dCkgOiBudWxsO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGNvbGxhcHNlZFRpdGxlKHZhbHVlOiBzdHJpbmcgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX2NvbGxhcHNlZFRpdGxlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY29sbGFwc2VkVGl0bGU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgZ2V0IHRhYkluZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkIHx8IHRoaXMuYnV0dG9uID8gLTEgOiB0aGlzLl90YWJJbmRleDtcbiAgICB9XG5cbiAgICBzZXQgdGFiSW5kZXgodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl90YWJJbmRleCA9IHZhbHVlICE9IG51bGwgPyBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSkgOiAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RhYkluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBmb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvciwgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmJ1dHRvbikgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0cnVlKTtcbiAgICB9XG5cbiAgICBnZXRUaXRsZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpdGxlLm91dGVyRWxlbWVudFdpZHRoO1xuICAgIH1cbn1cbiJdfQ==