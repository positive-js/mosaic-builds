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
                styles: [".mc-navbar-title{display:inline-block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mc-navbar-item{position:relative;display:flex;align-items:center;height:var(--mc-navbar-item-size-height,48px);padding-left:var(--mc-navbar-item-size-padding,16px);padding-right:var(--mc-navbar-item-size-padding,16px)}.mc-navbar-item .mc-icon{min-width:16px;min-height:16px}.mc-navbar-item.mc-vertical .mc-navbar-title{padding-left:26px}.mc-navbar-item.mc-vertical .mc-icon+.mc-navbar-title,.mc-navbar-item.mc-vertical .mc-navbar-title+.mc-icon{padding-left:var(--mc-vertical-navbar-size-icon-margin,10px)}.mc-navbar-item.mc-vertical .mc-badge{position:absolute;display:flex;align-items:center;justify-content:center}.mc-navbar-item.mc-vertical.mc-opened .mc-badge{right:16px;height:24px;padding-right:7px;padding-left:7px}.mc-navbar-item.mc-vertical.mc-closed .mc-badge{top:8px;right:8px;height:16px;padding-right:4px;padding-left:4px}.mc-navbar-item.mc-vertical.mc-closed .mc-navbar-title{display:none}.mc-navbar-item.mc-vertical.mc-closed.mc-navbar-item_button{padding-left:8px;padding-right:8px}.mc-navbar-item.mc-horizontal .mc-icon+.mc-navbar-title,.mc-navbar-item.mc-horizontal .mc-navbar-title+.mc-icon{padding-left:var(--mc-navbar-size-icon-margin,4px)}.mc-navbar-item.mc-horizontal.mc-navbar-item_collapsed .mc-navbar-title{display:none}.mc-navbar-item.mc-navbar-item_button .mc-icon-button{flex:1}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper{justify-content:center}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_left{margin-left:unset}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_right{margin-right:unset}a.mc-navbar-item,a.mc-navbar-title{text-decoration:none}", ".mc-navbar-logo{display:flex}.mc-navbar-brand{position:relative;display:flex;align-items:center}.mc-navbar-brand .mc-navbar-title{cursor:pointer}a.mc-navbar-brand{text-decoration:none}.mc-navbar-brand.mc-horizontal{height:var(--mc-navbar-item-size-height,48px);padding-right:var(--mc-navbar-brand-size-margin-right,24px)}.mc-navbar-brand.mc-horizontal .mc-navbar-title{padding-left:var(--mc-navbar-brand-size-padding,12px);padding-right:0}.mc-navbar-brand.mc-vertical{flex-direction:column}.mc-navbar-brand.mc-vertical .mc-navbar-logo{flex-direction:column;height:48px}.mc-navbar-brand.mc-vertical .mc-navbar-title{display:flex;align-items:center;height:var(--mc-navbar-item-size-height,48px);padding-left:0}.mc-navbar-brand.mc-vertical.mc-opened{align-items:unset}.mc-navbar-brand.mc-vertical.mc-opened .mc-navbar-item{position:absolute;top:0;right:0}.mc-navbar-brand.mc-vertical.mc-opened .mc-navbar-logo{padding-left:16px;justify-content:flex-end}.mc-navbar-brand.mc-vertical.mc-opened .mc-navbar-title{padding-left:16px}.mc-navbar-brand.mc-vertical.mc-closed{padding:0}.mc-navbar-brand.mc-vertical.mc-closed .mc-navbar-logo{align-items:center;justify-content:center;width:48px}.mc-navbar-brand.mc-vertical.mc-closed .mc-navbar-title{display:none}", ".mc-navbar-divider{display:block}.mc-navbar-divider.mc-vertical{height:1px;margin:8px 16px}.mc-navbar-divider.mc-vertical.mc-closed{margin-right:10px;margin-left:10px}.mc-navbar-divider.mc-horizontal{width:1px;height:28px;margin-left:8px;margin-right:8px}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL25hdmJhci9uYXZiYXItaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BGLE9BQU8sRUFFSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFFTCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUE4QixhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBVzNDLE1BQU0sT0FBTyxZQUFZO0lBUnpCO1FBU2EsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7SUFDOUMsQ0FBQzs7O1lBVkEsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQ0FBa0M7Z0JBQzVDLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsZ0JBQWdCO29CQUN2QixjQUFjLEVBQUUsb0JBQW9CO29CQUNwQyxjQUFjLEVBQUUscUJBQXFCO2lCQUN4QzthQUNKOztBQWNELE1BQU0sT0FBTyxhQUFhO0lBU3RCLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFSakMsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFX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bkIsS0FBSzs2QkFpQkwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSwgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWNCdXR0b25Dc3NTdHlsZXIgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvYnV0dG9uJztcbmltcG9ydCB7IENhbkRpc2FibGUsIENhbkRpc2FibGVDdG9yLCBtaXhpbkRpc2FibGVkIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNJY29uIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2ljb24nO1xuaW1wb3J0IHsgbWVyZ2UsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1sb2dvLCBbbWMtbmF2YmFyLWxvZ29dJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWxvZ28nLFxuICAgICAgICAnKG1vdXNlZW50ZXIpJzogJ2hvdmVyZWQubmV4dCh0cnVlKScsXG4gICAgICAgICcobW91c2VsZWF2ZSknOiAnaG92ZXJlZC5uZXh0KGZhbHNlKSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyTG9nbyB7XG4gICAgcmVhZG9ubHkgaG92ZXJlZCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG59XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItdGl0bGUsIFttYy1uYXZiYXItdGl0bGVdJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLXRpdGxlJyxcbiAgICAgICAgJyhtb3VzZWVudGVyKSc6ICdob3ZlcmVkLm5leHQodHJ1ZSknLFxuICAgICAgICAnKG1vdXNlbGVhdmUpJzogJ2hvdmVyZWQubmV4dChmYWxzZSknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhclRpdGxlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgcmVhZG9ubHkgaG92ZXJlZCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgICBvdXRlckVsZW1lbnRXaWR0aDogbnVtYmVyO1xuXG4gICAgZ2V0IHRleHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmlubmVyVGV4dDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBnZXRPdXRlckVsZW1lbnRXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCB7IHdpZHRoLCBtYXJnaW5MZWZ0LCBtYXJnaW5SaWdodCB9ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiBbd2lkdGgsIG1hcmdpbkxlZnQsIG1hcmdpblJpZ2h0XS5yZWR1Y2UoKGFjYywgaXRlbSkgPT4gYWNjICsgcGFyc2VJbnQoaXRlbSkgfHwgMCwgMCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLm91dGVyRWxlbWVudFdpZHRoID0gdGhpcy5nZXRPdXRlckVsZW1lbnRXaWR0aCgpO1xuICAgIH1cbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1icmFuZCwgW21jLW5hdmJhci1icmFuZF0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXItYnJhbmQnLFxuICAgICAgICAnW2NsYXNzLm1jLWhvdmVyZWRdJzogJ2hvdmVyZWQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhckJyYW5kIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICBAQ29udGVudENoaWxkKE1jTmF2YmFyTG9nbykgbG9nbzogTWNOYXZiYXJMb2dvO1xuICAgIEBDb250ZW50Q2hpbGQoTWNOYXZiYXJUaXRsZSkgdGl0bGU6IE1jTmF2YmFyVGl0bGU7XG5cbiAgICBob3ZlcmVkID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGRlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIG1lcmdlKFxuICAgICAgICAgICAgdGhpcy5sb2dvLmhvdmVyZWQsXG4gICAgICAgICAgICB0aGlzLnRpdGxlLmhvdmVyZWRcbiAgICAgICAgKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAuc3Vic2NyaWJlKCh2YWx1ZTogYm9vbGVhbikgPT4gdGhpcy5ob3ZlcmVkID0gdmFsdWUpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRlc3Ryb3llZC5uZXh0KCk7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gICAgfVxufVxuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLWRpdmlkZXInLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXItZGl2aWRlcidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyRGl2aWRlciB7fVxuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLWl0ZW0sIFttYy1uYXZiYXItaXRlbV0sIG1jLW5hdmJhci1kaXZpZGVyLCBtYy1uYXZiYXItYnJhbmQsIFttYy1uYXZiYXItYnJhbmRdJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MubWMtdmVydGljYWxdJzogJ3ZlcnRpY2FsJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1ob3Jpem9udGFsXSc6ICdob3Jpem9udGFsJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1vcGVuZWRdJzogJ3ZlcnRpY2FsICYmICFjbG9zZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWNsb3NlZF0nOiAndmVydGljYWwgJiYgY2xvc2VkJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJJdGVtQmFzZSB7XG4gICAgQENvbnRlbnRDaGlsZChNY0J1dHRvbkNzc1N0eWxlcikgYnV0dG9uOiBNY0J1dHRvbkNzc1N0eWxlcjtcblxuICAgIHZlcnRpY2FsOiBib29sZWFuO1xuICAgIGhvcml6b250YWw6IGJvb2xlYW47XG5cbiAgICBjbG9zZWQ6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICAgIGdldE91dGVyRWxlbWVudFdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHsgd2lkdGgsIG1hcmdpbkxlZnQsIG1hcmdpblJpZ2h0IH0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgcmV0dXJuIFt3aWR0aCwgbWFyZ2luTGVmdCwgbWFyZ2luUmlnaHRdLnJlZHVjZSgoYWNjLCBpdGVtKSA9PiBhY2MgKyBwYXJzZUludChpdGVtKSwgMCk7XG4gICAgfVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY05hdmJhck1peGluQmFzZTogQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgTWNOYXZiYXJJdGVtQmFzZSA9IG1peGluRGlzYWJsZWQoTWNOYXZiYXJJdGVtQmFzZSk7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItaXRlbSwgW21jLW5hdmJhci1pdGVtXScsXG4gICAgZXhwb3J0QXM6ICdtY05hdmJhckl0ZW0nLFxuICAgIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG4gICAgc3R5bGVVcmxzOiBbXG4gICAgICAgICcuL25hdmJhci1pdGVtLnNjc3MnLFxuICAgICAgICAnLi9uYXZiYXItYnJhbmQuc2NzcycsXG4gICAgICAgICcuL25hdmJhci1kaXZpZGVyLnNjc3MnXG4gICAgXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWl0ZW0nLFxuICAgICAgICAnW2NsYXNzLm1jLW5hdmJhci1pdGVtX2NvbGxhcHNlZF0nOiAnY29sbGFwc2VkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1uYXZiYXItaXRlbV9idXR0b25dJzogJ2J1dHRvbicsXG5cbiAgICAgICAgJ1thdHRyLnRpdGxlXSc6ICdjb2xsYXBzZWRUaXRsZScsXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnXG4gICAgfSxcbiAgICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFySXRlbSBleHRlbmRzIE1jTmF2YmFyTWl4aW5CYXNlIGltcGxlbWVudHMgT25EZXN0cm95LCBDYW5EaXNhYmxlLCBBZnRlckNvbnRlbnRJbml0IHtcbiAgICBAQ29udGVudENoaWxkKE1jQnV0dG9uQ3NzU3R5bGVyKSBidXR0b246IE1jQnV0dG9uQ3NzU3R5bGVyO1xuICAgIEBDb250ZW50Q2hpbGQoTWNOYXZiYXJUaXRsZSkgdGl0bGU6IE1jTmF2YmFyVGl0bGU7XG4gICAgQENvbnRlbnRDaGlsZChNY0ljb24pIGljb246IE1jSWNvbjtcblxuXG4gICAgQElucHV0KClcbiAgICBnZXQgY29sbGFwc2FibGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xsYXBzYWJsZTtcbiAgICB9XG5cbiAgICBzZXQgY29sbGFwc2FibGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fY29sbGFwc2FibGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NvbGxhcHNhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbGxhcHNlZCA9IGZhbHNlO1xuXG4gICAgZ2V0IGNvbGxhcHNlZFRpdGxlKCk6IHN0cmluZyB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xsYXBzZWQgPyAodGhpcy5fY29sbGFwc2VkVGl0bGUgfHwgdGhpcy50aXRsZS50ZXh0KSA6IG51bGw7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgY29sbGFwc2VkVGl0bGUodmFsdWU6IHN0cmluZyB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fY29sbGFwc2VkVGl0bGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jb2xsYXBzZWRUaXRsZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgICBnZXQgdGFiSW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5idXR0b24gPyAtMSA6IHRoaXMuX3RhYkluZGV4O1xuICAgIH1cblxuICAgIHNldCB0YWJJbmRleCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3RhYkluZGV4ID0gdmFsdWUgIT0gbnVsbCA/IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKSA6IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdGFiSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLCBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5lbGVtZW50UmVmKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmJ1dHRvbikgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuZWxlbWVudFJlZiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZ2V0VGl0bGVXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy50aXRsZS5vdXRlckVsZW1lbnRXaWR0aDtcbiAgICB9XG59XG4iXX0=