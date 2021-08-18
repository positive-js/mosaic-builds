import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, ContentChild, Directive, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { McButtonCssStyler } from '@ptsecurity/mosaic/button';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export class McNavbarLogo {
    constructor() {
        this.hovered = new Subject();
    }
}
McNavbarLogo.decorators = [
    { type: Directive, args: [{
                selector: 'mc-navbar-logo, [mc-navbar-logo]',
                host: {
                    class: 'mc-navbar-logo',
                    '(mouseenter)': 'hovered.next(true)',
                    '(mouseleave)': 'hovered.next(false)'
                }
            },] }
];
export class McNavbarTitle {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.hovered = new Subject();
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
                    class: 'mc-navbar-title',
                    '(mouseenter)': 'hovered.next(true)',
                    '(mouseleave)': 'hovered.next(false)'
                }
            },] }
];
/** @nocollapse */
McNavbarTitle.ctorParameters = () => [
    { type: ElementRef }
];
export class McNavbarBrand {
    constructor() {
        this.hovered = false;
        this.destroyed = new Subject();
    }
    ngAfterContentInit() {
        merge(this.logo.hovered, this.title.hovered)
            .pipe(takeUntil(this.destroyed))
            .subscribe((value) => this.hovered = value);
    }
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
}
McNavbarBrand.decorators = [
    { type: Directive, args: [{
                selector: 'mc-navbar-brand, [mc-navbar-brand]',
                host: {
                    class: 'mc-navbar-brand',
                    '[class.mc-hovered]': 'hovered'
                }
            },] }
];
McNavbarBrand.propDecorators = {
    logo: [{ type: ContentChild, args: [McNavbarLogo,] }],
    title: [{ type: ContentChild, args: [McNavbarTitle,] }]
};
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
        this.focusMonitor.stopMonitoring(this.elementRef);
    }
    ngAfterContentInit() {
        if (this.button) {
            return;
        }
        this.focusMonitor.monitor(this.elementRef, true);
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
                styles: [".mc-navbar-title{display:inline-block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mc-navbar-item{position:relative;display:flex;align-items:center;height:var(--mc-navbar-item-size-height,48px);padding-left:var(--mc-navbar-item-size-padding,16px);padding-right:var(--mc-navbar-item-size-padding,16px)}.mc-navbar-item .mc-icon{min-width:16px;min-height:16px}.mc-navbar-item.mc-vertical .mc-navbar-title{padding-left:26px}.mc-navbar-item.mc-vertical .mc-icon+.mc-navbar-title,.mc-navbar-item.mc-vertical .mc-navbar-title+.mc-icon{padding-left:var(--mc-vertical-navbar-size-icon-margin,10px)}.mc-navbar-item.mc-vertical .mc-badge{position:absolute;display:flex;align-items:center;justify-content:center}.mc-navbar-item.mc-vertical.mc-opened .mc-badge{right:16px;height:24px;padding-right:7px;padding-left:7px}.mc-navbar-item.mc-vertical.mc-closed .mc-badge{top:8px;right:8px;height:16px;padding-right:4px;padding-left:4px}.mc-navbar-item.mc-vertical.mc-closed .mc-navbar-title{display:none}.mc-navbar-item.mc-vertical.mc-closed.mc-navbar-item_button{padding-left:8px;padding-right:8px}.mc-navbar-item.mc-horizontal .mc-icon+.mc-navbar-title,.mc-navbar-item.mc-horizontal .mc-navbar-title+.mc-icon{padding-left:var(--mc-navbar-size-icon-margin,4px)}.mc-navbar-item.mc-horizontal.mc-navbar-item_collapsed .mc-navbar-title{display:none}.mc-navbar-item.mc-navbar-item_button .mc-icon-button{flex:1}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper{justify-content:center}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_left{margin-left:unset}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_right{margin-right:unset}a.mc-navbar-item,a.mc-navbar-title{text-decoration:none}", ".mc-navbar-logo{display:flex}.mc-navbar-brand{position:relative;display:flex;align-items:center}.mc-navbar-brand .mc-navbar-title{cursor:pointer}a.mc-navbar-brand{text-decoration:none}.mc-navbar-brand.mc-horizontal{height:var(--mc-navbar-item-size-height,48px);padding-right:var(--mc-navbar-brand-size-margin-right,24px)}.mc-navbar-brand.mc-horizontal .mc-navbar-title{padding-left:var(--mc-navbar-brand-size-padding,12px);padding-right:0}.mc-navbar-brand.mc-vertical{flex-direction:column}.mc-navbar-brand.mc-vertical .mc-navbar-logo{flex-direction:column;height:var(--mc-navbar-item-size-height,48px)}.mc-navbar-brand.mc-vertical .mc-navbar-title{display:flex;align-items:center;height:var(--mc-navbar-item-size-height,48px);padding-left:0}.mc-navbar-brand.mc-vertical.mc-opened{align-items:unset}.mc-navbar-brand.mc-vertical.mc-opened .mc-navbar-item{position:absolute;top:0;right:0}.mc-navbar-brand.mc-vertical.mc-opened .mc-navbar-logo{padding-left:16px;justify-content:flex-end}.mc-navbar-brand.mc-vertical.mc-opened .mc-navbar-title{padding-left:16px}.mc-navbar-brand.mc-vertical.mc-closed{padding:0}.mc-navbar-brand.mc-vertical.mc-closed .mc-navbar-logo{align-items:center;justify-content:center;width:48px}.mc-navbar-brand.mc-vertical.mc-closed .mc-navbar-title{display:none}", ".mc-navbar-divider{display:block}.mc-navbar-divider.mc-vertical{height:1px;margin:8px 16px}.mc-navbar-divider.mc-vertical.mc-closed{margin-right:10px;margin-left:10px}.mc-navbar-divider.mc-horizontal{width:1px;height:28px;margin-left:8px;margin-right:8px}"]
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
    collapsed: [{ type: Input }],
    collapsedTitle: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL25hdmJhci9uYXZiYXItaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BGLE9BQU8sRUFFSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFFTCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUE4QixhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBVzNDLE1BQU0sT0FBTyxZQUFZO0lBUnpCO1FBU2EsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7SUFDOUMsQ0FBQzs7O1lBVkEsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQ0FBa0M7Z0JBQzVDLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsZ0JBQWdCO29CQUN2QixjQUFjLEVBQUUsb0JBQW9CO29CQUNwQyxjQUFjLEVBQUUscUJBQXFCO2lCQUN4QzthQUNKOztBQWNELE1BQU0sT0FBTyxhQUFhO0lBU3RCLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFSakMsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFX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R25CLEtBQUs7d0JBV0wsS0FBSzs2QkFNTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5LCBjb2VyY2VOdW1iZXJQcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNY0J1dHRvbkNzc1N0eWxlciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9idXR0b24nO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZSwgQ2FuRGlzYWJsZUN0b3IsIG1peGluRGlzYWJsZWQgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0ljb24gfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvaWNvbic7XG5pbXBvcnQgeyBtZXJnZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLWxvZ28sIFttYy1uYXZiYXItbG9nb10nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXItbG9nbycsXG4gICAgICAgICcobW91c2VlbnRlciknOiAnaG92ZXJlZC5uZXh0KHRydWUpJyxcbiAgICAgICAgJyhtb3VzZWxlYXZlKSc6ICdob3ZlcmVkLm5leHQoZmFsc2UpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJMb2dvIHtcbiAgICByZWFkb25seSBob3ZlcmVkID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci10aXRsZSwgW21jLW5hdmJhci10aXRsZV0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXItdGl0bGUnLFxuICAgICAgICAnKG1vdXNlZW50ZXIpJzogJ2hvdmVyZWQubmV4dCh0cnVlKScsXG4gICAgICAgICcobW91c2VsZWF2ZSknOiAnaG92ZXJlZC5uZXh0KGZhbHNlKSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyVGl0bGUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICByZWFkb25seSBob3ZlcmVkID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICAgIG91dGVyRWxlbWVudFdpZHRoOiBudW1iZXI7XG5cbiAgICBnZXQgdGV4dCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICAgIGdldE91dGVyRWxlbWVudFdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHsgd2lkdGgsIG1hcmdpbkxlZnQsIG1hcmdpblJpZ2h0IH0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgcmV0dXJuIFt3aWR0aCwgbWFyZ2luTGVmdCwgbWFyZ2luUmlnaHRdLnJlZHVjZSgoYWNjLCBpdGVtKSA9PiBhY2MgKyBwYXJzZUludChpdGVtKSB8fCAwLCAwKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3V0ZXJFbGVtZW50V2lkdGggPSB0aGlzLmdldE91dGVyRWxlbWVudFdpZHRoKCk7XG4gICAgfVxufVxuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLWJyYW5kLCBbbWMtbmF2YmFyLWJyYW5kXScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLW5hdmJhci1icmFuZCcsXG4gICAgICAgICdbY2xhc3MubWMtaG92ZXJlZF0nOiAnaG92ZXJlZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyQnJhbmQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIEBDb250ZW50Q2hpbGQoTWNOYXZiYXJMb2dvKSBsb2dvOiBNY05hdmJhckxvZ287XG4gICAgQENvbnRlbnRDaGlsZChNY05hdmJhclRpdGxlKSB0aXRsZTogTWNOYXZiYXJUaXRsZTtcblxuICAgIGhvdmVyZWQgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgbWVyZ2UoXG4gICAgICAgICAgICB0aGlzLmxvZ28uaG92ZXJlZCxcbiAgICAgICAgICAgIHRoaXMudGl0bGUuaG92ZXJlZFxuICAgICAgICApXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKHZhbHVlOiBib29sZWFuKSA9PiB0aGlzLmhvdmVyZWQgPSB2YWx1ZSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkLm5leHQoKTtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgICB9XG59XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItZGl2aWRlcicsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLW5hdmJhci1kaXZpZGVyJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJEaXZpZGVyIHt9XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItaXRlbSwgW21jLW5hdmJhci1pdGVtXSwgbWMtbmF2YmFyLWRpdmlkZXIsIG1jLW5hdmJhci1icmFuZCwgW21jLW5hdmJhci1icmFuZF0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5tYy12ZXJ0aWNhbF0nOiAndmVydGljYWwnLFxuICAgICAgICAnW2NsYXNzLm1jLWhvcml6b250YWxdJzogJ2hvcml6b250YWwnLFxuICAgICAgICAnW2NsYXNzLm1jLW9wZW5lZF0nOiAndmVydGljYWwgJiYgIWNsb3NlZCcsXG4gICAgICAgICdbY2xhc3MubWMtY2xvc2VkXSc6ICd2ZXJ0aWNhbCAmJiBjbG9zZWQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhckl0ZW1CYXNlIHtcbiAgICBAQ29udGVudENoaWxkKE1jQnV0dG9uQ3NzU3R5bGVyKSBidXR0b246IE1jQnV0dG9uQ3NzU3R5bGVyO1xuXG4gICAgdmVydGljYWw6IGJvb2xlYW47XG4gICAgaG9yaXpvbnRhbDogYm9vbGVhbjtcblxuICAgIGNsb3NlZDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgZ2V0T3V0ZXJFbGVtZW50V2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgeyB3aWR0aCwgbWFyZ2luTGVmdCwgbWFyZ2luUmlnaHQgfSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICByZXR1cm4gW3dpZHRoLCBtYXJnaW5MZWZ0LCBtYXJnaW5SaWdodF0ucmVkdWNlKChhY2MsIGl0ZW0pID0+IGFjYyArIHBhcnNlSW50KGl0ZW0pLCAwKTtcbiAgICB9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jTmF2YmFyTWl4aW5CYXNlOiBDYW5EaXNhYmxlQ3RvciAmIHR5cGVvZiBNY05hdmJhckl0ZW1CYXNlID0gbWl4aW5EaXNhYmxlZChNY05hdmJhckl0ZW1CYXNlKTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1pdGVtLCBbbWMtbmF2YmFyLWl0ZW1dJyxcbiAgICBleHBvcnRBczogJ21jTmF2YmFySXRlbScsXG4gICAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbiAgICBzdHlsZVVybHM6IFtcbiAgICAgICAgJy4vbmF2YmFyLWl0ZW0uc2NzcycsXG4gICAgICAgICcuL25hdmJhci1icmFuZC5zY3NzJyxcbiAgICAgICAgJy4vbmF2YmFyLWRpdmlkZXIuc2NzcydcbiAgICBdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXItaXRlbScsXG4gICAgICAgICdbY2xhc3MubWMtbmF2YmFyLWl0ZW1fY29sbGFwc2VkXSc6ICdjb2xsYXBzZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLW5hdmJhci1pdGVtX2J1dHRvbl0nOiAnYnV0dG9uJyxcblxuICAgICAgICAnW2F0dHIudGl0bGVdJzogJ2NvbGxhcHNlZFRpdGxlJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCdcbiAgICB9LFxuICAgIGlucHV0czogWydkaXNhYmxlZCddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJJdGVtIGV4dGVuZHMgTWNOYXZiYXJNaXhpbkJhc2UgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIENhbkRpc2FibGUsIEFmdGVyQ29udGVudEluaXQge1xuICAgIEBDb250ZW50Q2hpbGQoTWNCdXR0b25Dc3NTdHlsZXIpIGJ1dHRvbjogTWNCdXR0b25Dc3NTdHlsZXI7XG4gICAgQENvbnRlbnRDaGlsZChNY05hdmJhclRpdGxlKSB0aXRsZTogTWNOYXZiYXJUaXRsZTtcbiAgICBAQ29udGVudENoaWxkKE1jSWNvbikgaWNvbjogTWNJY29uO1xuXG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBjb2xsYXBzYWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbGxhcHNhYmxlO1xuICAgIH1cblxuICAgIHNldCBjb2xsYXBzYWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9jb2xsYXBzYWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY29sbGFwc2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgY29sbGFwc2VkID0gZmFsc2U7XG5cbiAgICBnZXQgY29sbGFwc2VkVGl0bGUoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxhcHNlZCA/ICh0aGlzLl9jb2xsYXBzZWRUaXRsZSB8fCB0aGlzLnRpdGxlLnRleHQpIDogbnVsbDtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBjb2xsYXBzZWRUaXRsZSh2YWx1ZTogc3RyaW5nIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9jb2xsYXBzZWRUaXRsZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NvbGxhcHNlZFRpdGxlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgIGdldCB0YWJJbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCB8fCB0aGlzLmJ1dHRvbiA/IC0xIDogdGhpcy5fdGFiSW5kZXg7XG4gICAgfVxuXG4gICAgc2V0IHRhYkluZGV4KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fdGFiSW5kZXggPSB2YWx1ZSAhPSBudWxsID8gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpIDogMDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF90YWJJbmRleDogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLmVsZW1lbnRSZWYpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuYnV0dG9uKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5lbGVtZW50UmVmLCB0cnVlKTtcbiAgICB9XG5cbiAgICBnZXRUaXRsZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpdGxlLm91dGVyRWxlbWVudFdpZHRoO1xuICAgIH1cbn1cbiJdfQ==