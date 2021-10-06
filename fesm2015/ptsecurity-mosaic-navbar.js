import * as i1 from '@angular/cdk/a11y';
import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Directive, ContentChild, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, ContentChildren, NgModule } from '@angular/core';
import * as i2 from '@ptsecurity/mosaic/icon';
import { McIcon, McIconModule } from '@ptsecurity/mosaic/icon';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { McButtonCssStyler } from '@ptsecurity/mosaic/button';
import { mixinDisabled, mixinTabIndex } from '@ptsecurity/mosaic/core';
import { Subject, merge } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { VerticalNavbarSizeStatesClosedWidth, VerticalNavbarSizeStatesOpenedWidth } from '@ptsecurity/mosaic/design-tokens';

class McNavbarLogo {
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
class McNavbarTitle {
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
class McNavbarBrand {
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
class McNavbarDivider {
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
class McNavbarItemBase {
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
const McNavbarMixinBase = mixinDisabled(McNavbarItemBase);
class McNavbarItem extends McNavbarMixinBase {
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
/** @nocollapse */ McNavbarItem.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McNavbarItem, selector: "mc-navbar-item, [mc-navbar-item]", inputs: { disabled: "disabled", collapsable: "collapsable", collapsed: "collapsed", collapsedTitle: "collapsedTitle" }, host: { properties: { "class.mc-navbar-item_collapsed": "collapsed", "class.mc-navbar-item_button": "button", "attr.title": "collapsedTitle", "attr.tabindex": "tabIndex", "attr.disabled": "disabled || null" }, classAttribute: "mc-navbar-item" }, queries: [{ propertyName: "button", first: true, predicate: McButtonCssStyler, descendants: true }, { propertyName: "title", first: true, predicate: McNavbarTitle, descendants: true }, { propertyName: "icon", first: true, predicate: McIcon, descendants: true }], exportAs: ["mcNavbarItem"], usesInheritance: true, ngImport: i0, template: `<ng-content></ng-content>`, isInline: true, styles: [".mc-navbar-title{display:inline-block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mc-navbar-item{position:relative;display:flex;align-items:center;height:48px;height:var(--mc-navbar-item-size-height, 48px);padding-left:16px;padding-left:var(--mc-navbar-item-size-padding, 16px);padding-right:16px;padding-right:var(--mc-navbar-item-size-padding, 16px)}.mc-navbar-item .mc-icon{min-width:16px;min-height:16px}.mc-navbar-item.mc-vertical .mc-navbar-title{padding-left:26px}.mc-navbar-item.mc-vertical .mc-icon+.mc-navbar-title,.mc-navbar-item.mc-vertical .mc-navbar-title+.mc-icon{padding-left:10px;padding-left:var(--mc-vertical-navbar-size-icon-margin, 10px)}.mc-navbar-item.mc-vertical .mc-badge{position:absolute;display:flex;align-items:center;justify-content:center}.mc-navbar-item.mc-vertical.mc-opened .mc-badge{right:16px;height:24px;padding-right:7px;padding-left:7px}.mc-navbar-item.mc-vertical.mc-closed .mc-badge{top:8px;right:8px;height:16px;padding-right:4px;padding-left:4px}.mc-navbar-item.mc-vertical.mc-closed .mc-navbar-title{display:none}.mc-navbar-item.mc-vertical.mc-closed.mc-navbar-item_button{padding-left:8px;padding-right:8px}.mc-navbar-item.mc-horizontal .mc-icon+.mc-navbar-title,.mc-navbar-item.mc-horizontal .mc-navbar-title+.mc-icon{padding-left:4px;padding-left:var(--mc-navbar-size-icon-margin, 4px)}.mc-navbar-item.mc-horizontal.mc-navbar-item_collapsed .mc-navbar-title{display:none}.mc-navbar-item.mc-navbar-item_button .mc-icon-button{flex:1}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper{justify-content:center}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_left{margin-left:unset}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_right{margin-right:unset}a.mc-navbar-item,a.mc-navbar-title{text-decoration:none}\n", ".mc-navbar-logo{display:flex}.mc-navbar-brand{position:relative;display:flex;align-items:center}.mc-navbar-brand .mc-navbar-title{cursor:pointer}a.mc-navbar-brand{text-decoration:none}.mc-navbar-brand.mc-horizontal{height:48px;height:var(--mc-navbar-item-size-height, 48px);padding-right:24px;padding-right:var(--mc-navbar-brand-size-margin-right, 24px)}.mc-navbar-brand.mc-horizontal .mc-navbar-title{padding-left:12px;padding-left:var(--mc-navbar-brand-size-padding, 12px);padding-right:0}.mc-navbar-brand.mc-vertical{flex-direction:column}.mc-navbar-brand.mc-vertical .mc-navbar-logo{flex-direction:column;height:48px;height:var(--mc-navbar-item-size-height, 48px)}.mc-navbar-brand.mc-vertical .mc-navbar-title{display:flex;align-items:center;height:48px;height:var(--mc-navbar-item-size-height, 48px);padding-left:0}.mc-navbar-brand.mc-vertical.mc-opened{align-items:unset}.mc-navbar-brand.mc-vertical.mc-opened .mc-navbar-item{position:absolute;top:0;right:0}.mc-navbar-brand.mc-vertical.mc-opened .mc-navbar-logo{padding-left:16px;justify-content:flex-end}.mc-navbar-brand.mc-vertical.mc-opened .mc-navbar-title{padding-left:16px}.mc-navbar-brand.mc-vertical.mc-closed{padding:0}.mc-navbar-brand.mc-vertical.mc-closed .mc-navbar-logo{align-items:center;justify-content:center;width:48px}.mc-navbar-brand.mc-vertical.mc-closed .mc-navbar-title{display:none}\n", ".mc-navbar-divider{display:block}.mc-navbar-divider.mc-vertical{height:1px;margin:8px 16px}.mc-navbar-divider.mc-vertical.mc-closed{margin-right:10px;margin-left:10px}.mc-navbar-divider.mc-horizontal{width:1px;height:28px;margin-left:8px;margin-right:8px}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarItem, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-navbar-item, [mc-navbar-item]',
                    exportAs: 'mcNavbarItem',
                    template: `<ng-content></ng-content>`,
                    styleUrls: [
                        './navbar-item.scss',
                        './navbar-brand.scss',
                        './navbar-divider.scss'
                    ],
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

class McNavbarContainer {
}
/** @nocollapse */ McNavbarContainer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarContainer, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McNavbarContainer.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McNavbarContainer, selector: "mc-navbar-container", host: { classAttribute: "mc-navbar-container" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarContainer, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-navbar-container',
                    host: {
                        class: 'mc-navbar-container'
                    }
                }]
        }] });
class McNavbar {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.resizeStream = new Subject();
        this.resizeDebounceInterval = 100;
        this.updateCollapsed = () => {
            const collapseDelta = this.totalItemsWidth - this.width;
            const needCollapse = collapseDelta > 0;
            if (needCollapse) {
                this.collapseItems(collapseDelta);
            }
            else {
                this.unCollapseItems(collapseDelta);
            }
        };
        this.setItemsState = () => {
            Promise.resolve().then(() => { var _a; return (_a = this.navbarBaseItems) === null || _a === void 0 ? void 0 : _a.forEach((item) => item.horizontal = true); });
        };
        this.resizeSubscription = this.resizeStream
            .pipe(debounceTime(this.resizeDebounceInterval))
            .subscribe(this.updateCollapsed);
    }
    get width() {
        return this.elementRef.nativeElement.getBoundingClientRect().width;
    }
    get totalItemsWidth() {
        return this.navbarBaseItems
            .reduce((acc, item) => acc + item.getOuterElementWidth(), 0);
    }
    get collapsableItems() {
        return this.navbarItems
            .toArray()
            .filter((item) => item.icon && item.title && item.collapsable)
            .reverse();
    }
    ngAfterContentInit() {
        this.setItemsState();
        this.navbarBaseItems.changes
            .subscribe(this.setItemsState);
    }
    ngAfterViewInit() {
        // Note: this wait is required for loading and rendering fonts for icons;
        // unfortunately we cannot control font rendering
        setTimeout(this.updateCollapsed);
    }
    ngOnDestroy() {
        this.resizeSubscription.unsubscribe();
    }
    collapseItems(collapseDelta) {
        let delta = collapseDelta;
        const unCollapsedItems = this.collapsableItems
            .filter((item) => !item.collapsed);
        for (const item of unCollapsedItems) {
            item.collapsed = true;
            delta -= item.getTitleWidth();
            if (delta < 0) {
                break;
            }
        }
    }
    unCollapseItems(collapseDelta) {
        let delta = collapseDelta;
        this.collapsableItems
            .filter((item) => item.collapsed)
            .forEach((item) => {
            if (delta + item.getTitleWidth() < 0) {
                item.collapsed = false;
                delta += item.getTitleWidth();
            }
        });
    }
}
/** @nocollapse */ McNavbar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbar, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McNavbar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McNavbar, selector: "mc-navbar", host: { listeners: { "window:resize": "resizeStream.next($event)" }, classAttribute: "mc-navbar" }, queries: [{ propertyName: "navbarBaseItems", predicate: McNavbarItemBase, descendants: true }, { propertyName: "navbarItems", predicate: McNavbarItem, descendants: true }], ngImport: i0, template: `<ng-content select="[mc-navbar-container], mc-navbar-container"></ng-content>`, isInline: true, styles: [".mc-navbar{position:relative;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar-container{display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbar, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-navbar',
                    template: `<ng-content select="[mc-navbar-container], mc-navbar-container"></ng-content>`,
                    styleUrls: ['./navbar.scss'],
                    host: {
                        class: 'mc-navbar',
                        '(window:resize)': 'resizeStream.next($event)'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { navbarBaseItems: [{
                type: ContentChildren,
                args: [McNavbarItemBase, { descendants: true }]
            }], navbarItems: [{
                type: ContentChildren,
                args: [McNavbarItem, { descendants: true }]
            }] } });

function toggleVerticalNavbarAnimation() {
    return trigger('toggle', [
        state('0', style({ width: `var(--mc-vertical-navbar-size-states-closed-width, ${VerticalNavbarSizeStatesClosedWidth})` })),
        state('1', style({ width: `var(--mc-vertical-navbar-size-states-opened-width, ${VerticalNavbarSizeStatesOpenedWidth})` })),
        transition('0 <=> 1', animate('200ms cubic-bezier(0, 1, 0.5, 1)'))
    ]);
}

class McVerticalNavbar {
    constructor() {
        this._expanded = false;
        this.setItemsState = () => {
            Promise.resolve().then(() => { var _a; return (_a = this.navbarBaseItems) === null || _a === void 0 ? void 0 : _a.forEach((item) => item.vertical = true); });
        };
    }
    get expanded() {
        return this._expanded;
    }
    set expanded(value) {
        this._expanded = coerceBooleanProperty(value);
        this.setClosedStateForItems(value);
    }
    toggle() {
        this.expanded = !this.expanded;
    }
    ngAfterContentInit() {
        this.setItemsState();
        this.setClosedStateForItems(this.expanded);
        this.navbarBaseItems.changes
            .subscribe(this.setItemsState);
    }
    setClosedStateForItems(value) {
        var _a;
        (_a = this.navbarBaseItems) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
            item.closed = !value;
            setTimeout(() => { var _a; return (_a = item.button) === null || _a === void 0 ? void 0 : _a.updateClassModifierForIcons(); });
        });
    }
}
/** @nocollapse */ McVerticalNavbar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McVerticalNavbar, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McVerticalNavbar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McVerticalNavbar, selector: "mc-vertical-navbar", inputs: { expanded: "expanded" }, host: { properties: { "class.mc-closed": "!expanded", "class.mc-opened": "expanded", "@toggle": "expanded" }, classAttribute: "mc-vertical-navbar" }, queries: [{ propertyName: "navbarBaseItems", predicate: McNavbarItemBase, descendants: true }], exportAs: ["McVerticalNavbar"], ngImport: i0, template: `
        <ng-content select="[mc-navbar-container], mc-navbar-container"></ng-content>
        <ng-content select="[mc-navbar-toggle], mc-navbar-toggle"></ng-content>
    `, isInline: true, styles: [".mc-vertical-navbar{display:flex;flex-direction:column}.mc-vertical-navbar .mc-navbar-container{flex-direction:column;align-items:unset}.mc-vertical-navbar.mc-opened{width:240px;width:var(--mc-vertical-navbar-size-states-opened-width, 240px)}.mc-vertical-navbar.mc-closed{width:48px;width:var(--mc-vertical-navbar-size-states-closed-width, 48px)}\n"], animations: [toggleVerticalNavbarAnimation()], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McVerticalNavbar, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-vertical-navbar',
                    exportAs: 'McVerticalNavbar',
                    template: `
        <ng-content select="[mc-navbar-container], mc-navbar-container"></ng-content>
        <ng-content select="[mc-navbar-toggle], mc-navbar-toggle"></ng-content>
    `,
                    styleUrls: ['./vertical-navbar.scss'],
                    host: {
                        class: 'mc-vertical-navbar',
                        '[class.mc-closed]': '!expanded',
                        '[class.mc-opened]': 'expanded',
                        '[@toggle]': 'expanded'
                    },
                    animations: [toggleVerticalNavbarAnimation()],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], propDecorators: { expanded: [{
                type: Input
            }], navbarBaseItems: [{
                type: ContentChildren,
                args: [McNavbarItemBase, { descendants: true }]
            }] } });
class McNavbarToggleBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
const McNavbarToggleMixinBase = mixinTabIndex(mixinDisabled(McNavbarToggleBase));
class McNavbarToggle extends McNavbarToggleMixinBase {
    constructor(mcNavbar, focusMonitor, elementRef) {
        super(elementRef);
        this.mcNavbar = mcNavbar;
        this.focusMonitor = focusMonitor;
        this.elementRef = elementRef;
    }
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }
    ngAfterContentInit() {
        this.focusMonitor.monitor(this.elementRef.nativeElement, true);
    }
}
/** @nocollapse */ McNavbarToggle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarToggle, deps: [{ token: McVerticalNavbar }, { token: i1.FocusMonitor }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McNavbarToggle.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McNavbarToggle, selector: "mc-navbar-toggle", inputs: { tabIndex: "tabIndex" }, host: { properties: { "attr.tabindex": "tabIndex", "attr.disabled": "disabled || null" }, classAttribute: "mc-navbar-item mc-navbar-toggle mc-vertical" }, queries: [{ propertyName: "customIcon", first: true, predicate: McIcon, descendants: true }], usesInheritance: true, ngImport: i0, template: `
        <i mc-icon
           [class.mc-angle-left-M_16]="mcNavbar.expanded"
           [class.mc-angle-right-M_16]="!mcNavbar.expanded"
           *ngIf="!customIcon">
        </i>

        <ng-content select="[mc-icon]"></ng-content>
        <ng-content select="mc-navbar-title" *ngIf="mcNavbar.expanded"></ng-content>
    `, isInline: true, styles: [".mc-navbar{position:relative;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar-container{display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center}\n"], components: [{ type: i2.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.McIconCSSStyler, selector: "[mc-icon]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarToggle, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-navbar-toggle',
                    template: `
        <i mc-icon
           [class.mc-angle-left-M_16]="mcNavbar.expanded"
           [class.mc-angle-right-M_16]="!mcNavbar.expanded"
           *ngIf="!customIcon">
        </i>

        <ng-content select="[mc-icon]"></ng-content>
        <ng-content select="mc-navbar-title" *ngIf="mcNavbar.expanded"></ng-content>
    `,
                    styleUrls: ['./navbar.scss'],
                    host: {
                        class: 'mc-navbar-item mc-navbar-toggle mc-vertical',
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.disabled]': 'disabled || null'
                    },
                    inputs: ['tabIndex'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: McVerticalNavbar }, { type: i1.FocusMonitor }, { type: i0.ElementRef }]; }, propDecorators: { customIcon: [{
                type: ContentChild,
                args: [McIcon]
            }] } });

class McNavbarModule {
}
/** @nocollapse */ McNavbarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McNavbarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarModule, declarations: [McNavbar,
        McNavbarContainer,
        McNavbarTitle,
        McNavbarItem,
        McNavbarBrand,
        McNavbarLogo,
        McNavbarToggle,
        McVerticalNavbar,
        McNavbarDivider,
        McNavbarItemBase], imports: [CommonModule,
        A11yModule,
        PlatformModule,
        McIconModule], exports: [McNavbar,
        McNavbarContainer,
        McNavbarTitle,
        McNavbarItem,
        McNavbarBrand,
        McNavbarLogo,
        McNavbarToggle,
        McVerticalNavbar,
        McNavbarDivider,
        McNavbarItemBase] });
/** @nocollapse */ McNavbarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarModule, imports: [[
            CommonModule,
            A11yModule,
            PlatformModule,
            McIconModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        A11yModule,
                        PlatformModule,
                        McIconModule
                    ],
                    exports: [
                        McNavbar,
                        McNavbarContainer,
                        McNavbarTitle,
                        McNavbarItem,
                        McNavbarBrand,
                        McNavbarLogo,
                        McNavbarToggle,
                        McVerticalNavbar,
                        McNavbarDivider,
                        McNavbarItemBase
                    ],
                    declarations: [
                        McNavbar,
                        McNavbarContainer,
                        McNavbarTitle,
                        McNavbarItem,
                        McNavbarBrand,
                        McNavbarLogo,
                        McNavbarToggle,
                        McVerticalNavbar,
                        McNavbarDivider,
                        McNavbarItemBase
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { McNavbar, McNavbarBrand, McNavbarContainer, McNavbarDivider, McNavbarItem, McNavbarItemBase, McNavbarLogo, McNavbarMixinBase, McNavbarModule, McNavbarTitle, McNavbarToggle, McNavbarToggleBase, McNavbarToggleMixinBase, McVerticalNavbar };
//# sourceMappingURL=ptsecurity-mosaic-navbar.js.map
