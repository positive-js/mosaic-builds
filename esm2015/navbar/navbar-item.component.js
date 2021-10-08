import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, ContentChild, Directive, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { McButtonCssStyler } from '@ptsecurity/mosaic/button';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
export class McNavbarLogo {
    constructor() {
        this.hovered = new Subject();
    }
}
/** @nocollapse */ McNavbarLogo.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarLogo, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McNavbarLogo.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McNavbarLogo, selector: "mc-navbar-logo, [mc-navbar-logo]", host: { listeners: { "mouseenter": "hovered.next(true)", "mouseleave": "hovered.next(false)" }, classAttribute: "mc-navbar-logo" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarLogo, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-navbar-logo, [mc-navbar-logo]',
                    host: {
                        class: 'mc-navbar-logo',
                        '(mouseenter)': 'hovered.next(true)',
                        '(mouseleave)': 'hovered.next(false)'
                    }
                }]
        }] });
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
/** @nocollapse */ McNavbarTitle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarTitle, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McNavbarTitle.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McNavbarTitle, selector: "mc-navbar-title, [mc-navbar-title]", host: { listeners: { "mouseenter": "hovered.next(true)", "mouseleave": "hovered.next(false)" }, classAttribute: "mc-navbar-title" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarTitle, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-navbar-title, [mc-navbar-title]',
                    host: {
                        class: 'mc-navbar-title',
                        '(mouseenter)': 'hovered.next(true)',
                        '(mouseleave)': 'hovered.next(false)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });
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
/** @nocollapse */ McNavbarBrand.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarBrand, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McNavbarBrand.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McNavbarBrand, selector: "mc-navbar-brand, [mc-navbar-brand]", host: { properties: { "class.mc-hovered": "hovered" }, classAttribute: "mc-navbar-brand" }, queries: [{ propertyName: "logo", first: true, predicate: McNavbarLogo, descendants: true }, { propertyName: "title", first: true, predicate: McNavbarTitle, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarBrand, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-navbar-brand, [mc-navbar-brand]',
                    host: {
                        class: 'mc-navbar-brand',
                        '[class.mc-hovered]': 'hovered'
                    }
                }]
        }], propDecorators: { logo: [{
                type: ContentChild,
                args: [McNavbarLogo]
            }], title: [{
                type: ContentChild,
                args: [McNavbarTitle]
            }] } });
export class McNavbarDivider {
}
/** @nocollapse */ McNavbarDivider.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarDivider, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McNavbarDivider.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McNavbarDivider, selector: "mc-navbar-divider", host: { classAttribute: "mc-navbar-divider" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarDivider, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-navbar-divider',
                    host: {
                        class: 'mc-navbar-divider'
                    }
                }]
        }] });
export class McNavbarItemBase {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    getOuterElementWidth() {
        const { width, marginLeft, marginRight } = window.getComputedStyle(this.elementRef.nativeElement);
        return [width, marginLeft, marginRight].reduce((acc, item) => acc + parseInt(item), 0);
    }
}
/** @nocollapse */ McNavbarItemBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarItemBase, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McNavbarItemBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McNavbarItemBase, selector: "mc-navbar-item, [mc-navbar-item], mc-navbar-divider, mc-navbar-brand, [mc-navbar-brand]", host: { properties: { "class.mc-vertical": "vertical", "class.mc-horizontal": "horizontal", "class.mc-opened": "vertical && !closed", "class.mc-closed": "vertical && closed" } }, queries: [{ propertyName: "button", first: true, predicate: McButtonCssStyler, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarItemBase, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-navbar-item, [mc-navbar-item], mc-navbar-divider, mc-navbar-brand, [mc-navbar-brand]',
                    host: {
                        '[class.mc-vertical]': 'vertical',
                        '[class.mc-horizontal]': 'horizontal',
                        '[class.mc-opened]': 'vertical && !closed',
                        '[class.mc-closed]': 'vertical && closed'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { button: [{
                type: ContentChild,
                args: [McButtonCssStyler]
            }] } });
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
/** @nocollapse */ McNavbarItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarItem, deps: [{ token: i1.FocusMonitor }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McNavbarItem.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McNavbarItem, selector: "mc-navbar-item, [mc-navbar-item]", inputs: { disabled: "disabled", collapsable: "collapsable", collapsed: "collapsed", collapsedTitle: "collapsedTitle" }, host: { properties: { "class.mc-navbar-item_collapsed": "collapsed", "class.mc-navbar-item_button": "button", "attr.title": "collapsedTitle", "attr.tabindex": "tabIndex", "attr.disabled": "disabled || null" }, classAttribute: "mc-navbar-item" }, queries: [{ propertyName: "button", first: true, predicate: McButtonCssStyler, descendants: true }, { propertyName: "title", first: true, predicate: McNavbarTitle, descendants: true }, { propertyName: "icon", first: true, predicate: McIcon, descendants: true }], exportAs: ["mcNavbarItem"], usesInheritance: true, ngImport: i0, template: `<ng-content></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarItem, decorators: [{
            type: Component,
            args: [{
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
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i1.FocusMonitor }, { type: i0.ElementRef }]; }, propDecorators: { button: [{
                type: ContentChild,
                args: [McButtonCssStyler]
            }], title: [{
                type: ContentChild,
                args: [McNavbarTitle]
            }], icon: [{
                type: ContentChild,
                args: [McIcon]
            }], collapsable: [{
                type: Input
            }], collapsed: [{
                type: Input
            }], collapsedTitle: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL25hdmJhci9uYXZiYXItaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BGLE9BQU8sRUFFSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFFTCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUE4QixhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFXM0MsTUFBTSxPQUFPLFlBQVk7SUFSekI7UUFTYSxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztLQUM3Qzs7NEhBRlksWUFBWTtnSEFBWixZQUFZOzJGQUFaLFlBQVk7a0JBUnhCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGtDQUFrQztvQkFDNUMsSUFBSSxFQUFFO3dCQUNGLEtBQUssRUFBRSxnQkFBZ0I7d0JBQ3ZCLGNBQWMsRUFBRSxvQkFBb0I7d0JBQ3BDLGNBQWMsRUFBRSxxQkFBcUI7cUJBQ3hDO2lCQUNKOztBQWNELE1BQU0sT0FBTyxhQUFhO0lBU3RCLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENB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QkFDL0MsK0JBQStCLEVBQUUsUUFBUTt3QkFFekMsY0FBYyxFQUFFLGdCQUFnQjt3QkFDaEMsaUJBQWlCLEVBQUUsVUFBVTt3QkFDN0IsaUJBQWlCLEVBQUUsa0JBQWtCO3FCQUN4QztvQkFDRCxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7b0JBQ3BCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtpQkFDeEM7NEhBRW9DLE1BQU07c0JBQXRDLFlBQVk7dUJBQUMsaUJBQWlCO2dCQUNGLEtBQUs7c0JBQWpDLFlBQVk7dUJBQUMsYUFBYTtnQkFDTCxJQUFJO3NCQUF6QixZQUFZO3VCQUFDLE1BQU07Z0JBSWhCLFdBQVc7c0JBRGQsS0FBSztnQkFXRyxTQUFTO3NCQUFqQixLQUFLO2dCQU9GLGNBQWM7c0JBRGpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHksIGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1jQnV0dG9uQ3NzU3R5bGVyIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2J1dHRvbic7XG5pbXBvcnQgeyBDYW5EaXNhYmxlLCBDYW5EaXNhYmxlQ3RvciwgbWl4aW5EaXNhYmxlZCB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IE1jSWNvbiB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9pY29uJztcbmltcG9ydCB7IG1lcmdlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItbG9nbywgW21jLW5hdmJhci1sb2dvXScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLW5hdmJhci1sb2dvJyxcbiAgICAgICAgJyhtb3VzZWVudGVyKSc6ICdob3ZlcmVkLm5leHQodHJ1ZSknLFxuICAgICAgICAnKG1vdXNlbGVhdmUpJzogJ2hvdmVyZWQubmV4dChmYWxzZSknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhckxvZ28ge1xuICAgIHJlYWRvbmx5IGhvdmVyZWQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xufVxuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLXRpdGxlLCBbbWMtbmF2YmFyLXRpdGxlXScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLW5hdmJhci10aXRsZScsXG4gICAgICAgICcobW91c2VlbnRlciknOiAnaG92ZXJlZC5uZXh0KHRydWUpJyxcbiAgICAgICAgJyhtb3VzZWxlYXZlKSc6ICdob3ZlcmVkLm5leHQoZmFsc2UpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJUaXRsZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgIHJlYWRvbmx5IGhvdmVyZWQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gICAgb3V0ZXJFbGVtZW50V2lkdGg6IG51bWJlcjtcblxuICAgIGdldCB0ZXh0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pbm5lclRleHQ7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgZ2V0T3V0ZXJFbGVtZW50V2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgeyB3aWR0aCwgbWFyZ2luTGVmdCwgbWFyZ2luUmlnaHQgfSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICByZXR1cm4gW3dpZHRoLCBtYXJnaW5MZWZ0LCBtYXJnaW5SaWdodF0ucmVkdWNlKChhY2MsIGl0ZW0pID0+IGFjYyArIHBhcnNlSW50KGl0ZW0pIHx8IDAsIDApO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vdXRlckVsZW1lbnRXaWR0aCA9IHRoaXMuZ2V0T3V0ZXJFbGVtZW50V2lkdGgoKTtcbiAgICB9XG59XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItYnJhbmQsIFttYy1uYXZiYXItYnJhbmRdJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWJyYW5kJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1ob3ZlcmVkXSc6ICdob3ZlcmVkJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJCcmFuZCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gICAgQENvbnRlbnRDaGlsZChNY05hdmJhckxvZ28pIGxvZ286IE1jTmF2YmFyTG9nbztcbiAgICBAQ29udGVudENoaWxkKE1jTmF2YmFyVGl0bGUpIHRpdGxlOiBNY05hdmJhclRpdGxlO1xuXG4gICAgaG92ZXJlZCA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBkZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICBtZXJnZShcbiAgICAgICAgICAgIHRoaXMubG9nby5ob3ZlcmVkLFxuICAgICAgICAgICAgdGhpcy50aXRsZS5ob3ZlcmVkXG4gICAgICAgIClcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgLnN1YnNjcmliZSgodmFsdWU6IGJvb2xlYW4pID0+IHRoaXMuaG92ZXJlZCA9IHZhbHVlKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQubmV4dCgpO1xuICAgICAgICB0aGlzLmRlc3Ryb3llZC5jb21wbGV0ZSgpO1xuICAgIH1cbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1kaXZpZGVyJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWRpdmlkZXInXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhckRpdmlkZXIge31cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1pdGVtLCBbbWMtbmF2YmFyLWl0ZW1dLCBtYy1uYXZiYXItZGl2aWRlciwgbWMtbmF2YmFyLWJyYW5kLCBbbWMtbmF2YmFyLWJyYW5kXScsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm1jLXZlcnRpY2FsXSc6ICd2ZXJ0aWNhbCcsXG4gICAgICAgICdbY2xhc3MubWMtaG9yaXpvbnRhbF0nOiAnaG9yaXpvbnRhbCcsXG4gICAgICAgICdbY2xhc3MubWMtb3BlbmVkXSc6ICd2ZXJ0aWNhbCAmJiAhY2xvc2VkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1jbG9zZWRdJzogJ3ZlcnRpY2FsICYmIGNsb3NlZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFySXRlbUJhc2Uge1xuICAgIEBDb250ZW50Q2hpbGQoTWNCdXR0b25Dc3NTdHlsZXIpIGJ1dHRvbjogTWNCdXR0b25Dc3NTdHlsZXI7XG5cbiAgICB2ZXJ0aWNhbDogYm9vbGVhbjtcbiAgICBob3Jpem9udGFsOiBib29sZWFuO1xuXG4gICAgY2xvc2VkOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBnZXRPdXRlckVsZW1lbnRXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCB7IHdpZHRoLCBtYXJnaW5MZWZ0LCBtYXJnaW5SaWdodCB9ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiBbd2lkdGgsIG1hcmdpbkxlZnQsIG1hcmdpblJpZ2h0XS5yZWR1Y2UoKGFjYywgaXRlbSkgPT4gYWNjICsgcGFyc2VJbnQoaXRlbSksIDApO1xuICAgIH1cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNOYXZiYXJNaXhpbkJhc2U6IENhbkRpc2FibGVDdG9yICYgdHlwZW9mIE1jTmF2YmFySXRlbUJhc2UgPSBtaXhpbkRpc2FibGVkKE1jTmF2YmFySXRlbUJhc2UpO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLWl0ZW0sIFttYy1uYXZiYXItaXRlbV0nLFxuICAgIGV4cG9ydEFzOiAnbWNOYXZiYXJJdGVtJyxcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXItaXRlbScsXG4gICAgICAgICdbY2xhc3MubWMtbmF2YmFyLWl0ZW1fY29sbGFwc2VkXSc6ICdjb2xsYXBzZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLW5hdmJhci1pdGVtX2J1dHRvbl0nOiAnYnV0dG9uJyxcblxuICAgICAgICAnW2F0dHIudGl0bGVdJzogJ2NvbGxhcHNlZFRpdGxlJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCdcbiAgICB9LFxuICAgIGlucHV0czogWydkaXNhYmxlZCddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJJdGVtIGV4dGVuZHMgTWNOYXZiYXJNaXhpbkJhc2UgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIENhbkRpc2FibGUsIEFmdGVyQ29udGVudEluaXQge1xuICAgIEBDb250ZW50Q2hpbGQoTWNCdXR0b25Dc3NTdHlsZXIpIGJ1dHRvbjogTWNCdXR0b25Dc3NTdHlsZXI7XG4gICAgQENvbnRlbnRDaGlsZChNY05hdmJhclRpdGxlKSB0aXRsZTogTWNOYXZiYXJUaXRsZTtcbiAgICBAQ29udGVudENoaWxkKE1jSWNvbikgaWNvbjogTWNJY29uO1xuXG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBjb2xsYXBzYWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbGxhcHNhYmxlO1xuICAgIH1cblxuICAgIHNldCBjb2xsYXBzYWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9jb2xsYXBzYWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY29sbGFwc2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgY29sbGFwc2VkID0gZmFsc2U7XG5cbiAgICBnZXQgY29sbGFwc2VkVGl0bGUoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxhcHNlZCA/ICh0aGlzLl9jb2xsYXBzZWRUaXRsZSB8fCB0aGlzLnRpdGxlLnRleHQpIDogbnVsbDtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBjb2xsYXBzZWRUaXRsZSh2YWx1ZTogc3RyaW5nIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9jb2xsYXBzZWRUaXRsZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NvbGxhcHNlZFRpdGxlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgIGdldCB0YWJJbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCB8fCB0aGlzLmJ1dHRvbiA/IC0xIDogdGhpcy5fdGFiSW5kZXg7XG4gICAgfVxuXG4gICAgc2V0IHRhYkluZGV4KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fdGFiSW5kZXggPSB2YWx1ZSAhPSBudWxsID8gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpIDogMDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF90YWJJbmRleDogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLmVsZW1lbnRSZWYpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuYnV0dG9uKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5lbGVtZW50UmVmLCB0cnVlKTtcbiAgICB9XG5cbiAgICBnZXRUaXRsZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpdGxlLm91dGVyRWxlbWVudFdpZHRoO1xuICAgIH1cbn1cbiJdfQ==