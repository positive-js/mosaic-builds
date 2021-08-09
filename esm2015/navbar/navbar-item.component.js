import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceNumberProperty } from '@angular/cdk/coercion';
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
                selector: 'mc-navbar-item, mc-navbar-divider, mc-navbar-brand',
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
        this.collapsed = false;
        this._collapsedTitle = null;
        this._tabIndex = 0;
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
                selector: 'mc-navbar-item',
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
                styles: [".mc-navbar-title{display:inline-block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mc-navbar-item{position:relative;display:flex;align-items:center;height:var(--mc-navbar-item-size-height,48px);padding-left:var(--mc-navbar-item-size-padding,16px);padding-right:var(--mc-navbar-item-size-padding,16px)}.mc-navbar-item .mc-icon{min-width:16px;min-height:16px}.mc-navbar-item.mc-vertical .mc-navbar-title{padding-left:26px}.mc-navbar-item.mc-vertical .mc-icon+.mc-navbar-title,.mc-navbar-item.mc-vertical .mc-navbar-title+.mc-icon{padding-left:var(--mc-vertical-navbar-size-icon-margin,10px)}.mc-navbar-item.mc-vertical .mc-badge{position:absolute;display:flex;align-items:center;justify-content:center}.mc-navbar-item.mc-vertical.mc-opened .mc-badge{right:16px;height:24px;padding-right:7px;padding-left:7px}.mc-navbar-item.mc-vertical.mc-closed .mc-badge{top:8px;right:8px;height:16px;padding-right:4px;padding-left:4px}.mc-navbar-item.mc-vertical.mc-closed .mc-navbar-title{display:none}.mc-navbar-item.mc-vertical.mc-closed.mc-navbar-item_button{padding-left:8px;padding-right:8px}.mc-navbar-item.mc-horizontal .mc-icon+.mc-navbar-title,.mc-navbar-item.mc-horizontal .mc-navbar-title+.mc-icon{padding-left:var(--mc-navbar-size-icon-margin,4px)}.mc-navbar-item.mc-horizontal.mc-navbar-item_collapsed .mc-navbar-title{display:none}.mc-navbar-item.mc-navbar-item_button .mc-icon-button{flex:1}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper{justify-content:center}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_left{margin-left:unset}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_right{margin-right:unset}", ".mc-navbar-logo{display:flex}.mc-navbar-brand{position:relative;display:flex;align-items:center}.mc-navbar-brand .mc-navbar-title{cursor:default}.mc-navbar-brand.mc-horizontal{height:100%;padding-right:var(--mc-navbar-brand-size-margin-right,24px)}.mc-navbar-brand.mc-horizontal .mc-navbar-title{padding-left:var(--mc-navbar-brand-size-padding,12px);padding-right:0;cursor:default}.mc-navbar-brand.mc-vertical{flex-direction:column;padding-left:16px}.mc-navbar-brand.mc-vertical .mc-navbar-logo{flex-direction:column;width:48px;height:48px}.mc-navbar-brand.mc-vertical .mc-navbar-title{display:flex;align-items:center;height:var(--mc-navbar-item-size-height,48px);padding-left:0}.mc-navbar-brand.mc-vertical.mc-opened{align-items:unset}.mc-navbar-brand.mc-vertical.mc-opened .mc-navbar-item{position:absolute;top:0;right:0}.mc-navbar-brand.mc-vertical.mc-opened .mc-navbar-logo{justify-content:flex-end}.mc-navbar-brand.mc-vertical.mc-closed{padding:0}.mc-navbar-brand.mc-vertical.mc-closed .mc-navbar-logo{align-items:center;justify-content:center}.mc-navbar-brand.mc-vertical.mc-closed .mc-navbar-title{display:none}", ".mc-navbar-divider{display:block}.mc-navbar-divider.mc-vertical{height:1px;margin:8px 16px}.mc-navbar-divider.mc-vertical.mc-closed{margin-right:10px;margin-left:10px}.mc-navbar-divider.mc-horizontal{width:1px;height:28px;margin-left:8px;margin-right:8px}"]
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
    collapsedTitle: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL25hdmJhci9uYXZiYXItaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFFSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFFTCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUE4QixhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFTakQsTUFBTSxPQUFPLFlBQVk7OztZQU54QixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtDQUFrQztnQkFDNUMsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxnQkFBZ0I7aUJBQzFCO2FBQ0o7O0FBVUQsTUFBTSxPQUFPLGFBQWE7SUFPdEIsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFHLENBQUM7SUFKOUMsSUFBSSxJQUFJO1FBQ0osT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7SUFDbkQsQ0FBQztJQUlELG9CQUFvQjtRQUNoQixNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVsRyxPQUFPLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBRUQsa0JBQWtCO1FBQ2QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQ3pELENBQUM7OztZQXZCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9DQUFvQztnQkFDOUMsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxpQkFBaUI7aUJBQzNCO2FBQ0o7Ozs7WUF4QkcsVUFBVTs7QUFvRGQsTUFBTSxPQUFPLGFBQWE7OztZQU56QixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9DQUFvQztnQkFDOUMsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxpQkFBaUI7aUJBQzNCO2FBQ0o7O0FBVUQsTUFBTSxPQUFPLGVBQWU7OztZQU4zQixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxtQkFBbUI7aUJBQzdCO2FBQ0o7O0FBYUQsTUFBTSxPQUFPLGdCQUFnQjtJQVF6QixZQUFtQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUcsQ0FBQztJQUU3QyxvQkFBb0I7UUFDaEIsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFbEcsT0FBTyxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzRixDQUFDOzs7WUF2QkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxvREFBb0Q7Z0JBQzlELElBQUksRUFBRTtvQkFDRixxQkFBcUIsRUFBRSxVQUFVO29CQUNqQyx1QkFBdUIsRUFBRSxZQUFZO29CQUNyQyxtQkFBbUIsRUFBRSxxQkFBcUI7b0JBQzFDLG1CQUFtQixFQUFFLG9CQUFvQjtpQkFDNUM7YUFDSjs7OztZQXhFRyxVQUFVOzs7cUJBMEVULFlBQVksU0FBQyxpQkFBaUI7O0FBZ0JuQyw2Q0FBNkM7QUFDN0MsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQTZDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBeUIzRyxNQUFNLE9BQU8sWUFBYSxTQUFRLGlCQUFpQjtJQTRCL0MsWUFBb0IsWUFBMEIsRUFBUyxVQUFzQjtRQUN6RSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFERixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFTLGVBQVUsR0FBVixVQUFVLENBQVk7UUF2QjdFLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFXVixvQkFBZSxHQUFrQixJQUFJLENBQUM7UUFVdEMsY0FBUyxHQUFXLENBQUMsQ0FBQztJQUk5QixDQUFDO0lBdkJELElBQUksY0FBYztRQUNkLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUM3RSxDQUFDO0lBRUQsSUFDSSxjQUFjLENBQUMsS0FBb0I7UUFDbkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7SUFDakMsQ0FBQztJQUlELElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsSUFBSSxRQUFRLENBQUMsS0FBYTtRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQVFELFdBQVc7UUFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxrQkFBa0I7UUFDZCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFFNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELGFBQWE7UUFDVCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUM7SUFDeEMsQ0FBQzs7O1lBbEVKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUUsY0FBYztnQkFDeEIsUUFBUSxFQUFFLDJCQUEyQjtnQkFNckMsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxnQkFBZ0I7b0JBQ3ZCLGtDQUFrQyxFQUFFLFdBQVc7b0JBQy9DLCtCQUErQixFQUFFLFFBQVE7b0JBRXpDLGNBQWMsRUFBRSxnQkFBZ0I7b0JBQ2hDLGlCQUFpQixFQUFFLFVBQVU7b0JBQzdCLGlCQUFpQixFQUFFLGtCQUFrQjtpQkFDeEM7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDO2dCQUNwQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3hDOzs7O1lBM0hRLFlBQVk7WUFRakIsVUFBVTs7O3FCQXFIVCxZQUFZLFNBQUMsaUJBQWlCO29CQUM5QixZQUFZLFNBQUMsYUFBYTttQkFDMUIsWUFBWSxTQUFDLE1BQU07NkJBUW5CLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBjb2VyY2VOdW1iZXJQcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNY0J1dHRvbkNzc1N0eWxlciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9idXR0b24nO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZSwgQ2FuRGlzYWJsZUN0b3IsIG1peGluRGlzYWJsZWQgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0ljb24gfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvaWNvbic7XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItbG9nbywgW21jLW5hdmJhci1sb2dvXScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLW5hdmJhci1sb2dvJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJMb2dvIHt9XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItdGl0bGUsIFttYy1uYXZiYXItdGl0bGVdJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLXRpdGxlJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJUaXRsZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgIG91dGVyRWxlbWVudFdpZHRoOiBudW1iZXI7XG5cbiAgICBnZXQgdGV4dCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICAgIGdldE91dGVyRWxlbWVudFdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHsgd2lkdGgsIG1hcmdpbkxlZnQsIG1hcmdpblJpZ2h0IH0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgcmV0dXJuIFt3aWR0aCwgbWFyZ2luTGVmdCwgbWFyZ2luUmlnaHRdLnJlZHVjZSgoYWNjLCBpdGVtKSA9PiBhY2MgKyBwYXJzZUludChpdGVtKSB8fCAwLCAwKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3V0ZXJFbGVtZW50V2lkdGggPSB0aGlzLmdldE91dGVyRWxlbWVudFdpZHRoKCk7XG4gICAgfVxufVxuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLWJyYW5kLCBbbWMtbmF2YmFyLWJyYW5kXScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLW5hdmJhci1icmFuZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyQnJhbmQge31cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1kaXZpZGVyJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWRpdmlkZXInXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhckRpdmlkZXIge31cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1pdGVtLCBtYy1uYXZiYXItZGl2aWRlciwgbWMtbmF2YmFyLWJyYW5kJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MubWMtdmVydGljYWxdJzogJ3ZlcnRpY2FsJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1ob3Jpem9udGFsXSc6ICdob3Jpem9udGFsJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1vcGVuZWRdJzogJ3ZlcnRpY2FsICYmICFjbG9zZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWNsb3NlZF0nOiAndmVydGljYWwgJiYgY2xvc2VkJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJJdGVtQmFzZSB7XG4gICAgQENvbnRlbnRDaGlsZChNY0J1dHRvbkNzc1N0eWxlcikgYnV0dG9uOiBNY0J1dHRvbkNzc1N0eWxlcjtcblxuICAgIHZlcnRpY2FsOiBib29sZWFuO1xuICAgIGhvcml6b250YWw6IGJvb2xlYW47XG5cbiAgICBjbG9zZWQ6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICAgIGdldE91dGVyRWxlbWVudFdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHsgd2lkdGgsIG1hcmdpbkxlZnQsIG1hcmdpblJpZ2h0IH0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgcmV0dXJuIFt3aWR0aCwgbWFyZ2luTGVmdCwgbWFyZ2luUmlnaHRdLnJlZHVjZSgoYWNjLCBpdGVtKSA9PiBhY2MgKyBwYXJzZUludChpdGVtKSwgMCk7XG4gICAgfVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY05hdmJhck1peGluQmFzZTogQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgTWNOYXZiYXJJdGVtQmFzZSA9IG1peGluRGlzYWJsZWQoTWNOYXZiYXJJdGVtQmFzZSk7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItaXRlbScsXG4gICAgZXhwb3J0QXM6ICdtY05hdmJhckl0ZW0nLFxuICAgIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG4gICAgc3R5bGVVcmxzOiBbXG4gICAgICAgICcuL25hdmJhci1pdGVtLnNjc3MnLFxuICAgICAgICAnLi9uYXZiYXItYnJhbmQuc2NzcycsXG4gICAgICAgICcuL25hdmJhci1kaXZpZGVyLnNjc3MnXG4gICAgXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWl0ZW0nLFxuICAgICAgICAnW2NsYXNzLm1jLW5hdmJhci1pdGVtX2NvbGxhcHNlZF0nOiAnY29sbGFwc2VkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1uYXZiYXItaXRlbV9idXR0b25dJzogJ2J1dHRvbicsXG5cbiAgICAgICAgJ1thdHRyLnRpdGxlXSc6ICdjb2xsYXBzZWRUaXRsZScsXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnXG4gICAgfSxcbiAgICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFySXRlbSBleHRlbmRzIE1jTmF2YmFyTWl4aW5CYXNlIGltcGxlbWVudHMgT25EZXN0cm95LCBDYW5EaXNhYmxlLCBBZnRlckNvbnRlbnRJbml0IHtcbiAgICBAQ29udGVudENoaWxkKE1jQnV0dG9uQ3NzU3R5bGVyKSBidXR0b246IE1jQnV0dG9uQ3NzU3R5bGVyO1xuICAgIEBDb250ZW50Q2hpbGQoTWNOYXZiYXJUaXRsZSkgdGl0bGU6IE1jTmF2YmFyVGl0bGU7XG4gICAgQENvbnRlbnRDaGlsZChNY0ljb24pIGljb246IE1jSWNvbjtcblxuICAgIGNvbGxhcHNlZCA9IGZhbHNlO1xuXG4gICAgZ2V0IGNvbGxhcHNlZFRpdGxlKCk6IHN0cmluZyB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xsYXBzZWQgPyAodGhpcy5fY29sbGFwc2VkVGl0bGUgfHwgdGhpcy50aXRsZS50ZXh0KSA6IG51bGw7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgY29sbGFwc2VkVGl0bGUodmFsdWU6IHN0cmluZyB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fY29sbGFwc2VkVGl0bGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jb2xsYXBzZWRUaXRsZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgICBnZXQgdGFiSW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5idXR0b24gPyAtMSA6IHRoaXMuX3RhYkluZGV4O1xuICAgIH1cblxuICAgIHNldCB0YWJJbmRleCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3RhYkluZGV4ID0gdmFsdWUgIT0gbnVsbCA/IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKSA6IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdGFiSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLCBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuYnV0dG9uKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRydWUpO1xuICAgIH1cblxuICAgIGdldFRpdGxlV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGl0bGUub3V0ZXJFbGVtZW50V2lkdGg7XG4gICAgfVxufVxuIl19