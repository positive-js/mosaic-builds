import { FocusMonitor, A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { Directive, Component, ViewEncapsulation, ElementRef, Input, NgModule } from '@angular/core';
import { mixinTabIndex, mixinDisabled } from '@ptsecurity/mosaic/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const COLLAPSED_CLASS = 'mc-navbar-collapsed-title';
class McNavbarLogo {
}
McNavbarLogo.decorators = [
    { type: Directive, args: [{
                selector: 'mc-navbar-logo',
                host: {
                    class: 'mc-navbar-logo'
                }
            },] }
];
class McNavbarBrand {
}
McNavbarBrand.decorators = [
    { type: Directive, args: [{
                selector: 'mc-navbar-brand',
                host: {
                    class: 'mc-navbar-brand'
                }
            },] }
];
class McNavbarTitle {
}
McNavbarTitle.decorators = [
    { type: Directive, args: [{
                selector: 'mc-navbar-title',
                host: {
                    class: 'mc-navbar-title'
                }
            },] }
];
class McNavbarItemBase {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
// tslint:disable-next-line:naming-convention
const McNavbarMixinBase = mixinTabIndex(mixinDisabled(McNavbarItemBase));
class McNavbarItem extends McNavbarMixinBase {
    constructor(elementRef, _focusMonitor) {
        super(elementRef);
        this.elementRef = elementRef;
        this._focusMonitor = _focusMonitor;
    }
    set collapsedTitle(value) {
        this.elementRef.nativeElement.setAttribute('computedTitle', encodeURI(value));
    }
    ngOnInit() {
        this.denyClickIfDisabled();
        this._focusMonitor.monitor(this.elementRef.nativeElement, true);
    }
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }
    // This method is required due to angular 2 issue https://github.com/angular/angular/issues/11200
    denyClickIfDisabled() {
        const events = this.elementRef.nativeElement.eventListeners('click');
        events.forEach((event) => this.elementRef.nativeElement.removeEventListener('click', event));
        this.elementRef.nativeElement.addEventListener('click', (event) => {
            if (this.elementRef.nativeElement.hasAttribute('disabled')) {
                event.stopImmediatePropagation();
            }
        }, true);
        events.forEach((event) => this.elementRef.nativeElement.addEventListener('click', event));
    }
}
McNavbarItem.decorators = [
    { type: Component, args: [{
                selector: 'mc-navbar-item',
                template: `<ng-content></ng-content>`,
                encapsulation: ViewEncapsulation.None,
                inputs: ['disabled', 'tabIndex'],
                host: {
                    class: 'mc-navbar-item',
                    '[attr.tabindex]': 'tabIndex',
                    '[attr.disabled]': 'disabled || null'
                }
            },] }
];
/** @nocollapse */
McNavbarItem.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor }
];
McNavbarItem.propDecorators = {
    collapsedTitle: [{ type: Input }]
};
class McNavbarContainer {
    constructor() {
        this.position = 'left';
    }
}
McNavbarContainer.decorators = [
    { type: Directive, args: [{
                selector: 'mc-navbar-container',
                host: {
                    '[class.mc-navbar-left]': 'this.position === "left"',
                    '[class.mc-navbar-right]': 'this.position !== "left"'
                }
            },] }
];
McNavbarContainer.propDecorators = {
    position: [{ type: Input }]
};
class CollapsibleItem {
    constructor(element, width) {
        this.element = element;
        this.width = width;
        this.collapsed = false;
    }
    processCollapsed(collapsed) {
        this.collapsed = collapsed;
        this.updateCollapsedClass();
    }
    updateCollapsedClass() {
        if (this.collapsed) {
            this.element.classList.add(COLLAPSED_CLASS);
        }
        else {
            this.element.classList.remove(COLLAPSED_CLASS);
        }
    }
}
class CachedItemWidth {
    constructor(element, width, itemsForCollapse = []) {
        this.element = element;
        this.width = width;
        this.itemsForCollapse = itemsForCollapse;
    }
    get canCollapse() {
        return this.itemsForCollapse.length > 0;
    }
    get collapsedItemsWidth() {
        if (this._collapsedItemsWidth !== undefined) {
            return this._collapsedItemsWidth;
        }
        this.calculateAndCacheCollapsedItemsWidth();
        return this._collapsedItemsWidth;
    }
    processCollapsed(collapsed) {
        if (this.itemsForCollapse.length > 0) {
            this.updateTitle(collapsed);
        }
        this.itemsForCollapse.forEach((item) => item.processCollapsed(collapsed));
    }
    calculateAndCacheCollapsedItemsWidth() {
        this._collapsedItemsWidth = this.itemsForCollapse
            .reduce((acc, item) => acc + item.width, 0);
    }
    getTitle() {
        const computedTitle = this.element.getAttribute('computedTitle');
        return computedTitle
            ? decodeURI(computedTitle)
            : (this.itemsForCollapse.length > 0 ? this.itemsForCollapse[0].element.innerText : '');
    }
    updateTitle(collapsed) {
        if (collapsed) {
            this.element.setAttribute('title', this.getTitle());
        }
        else {
            this.element.removeAttribute('title');
        }
    }
}
class McNavbar {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this.forceRecalculateItemsWidth = false;
        this.resizeDebounceInterval = 100;
        this.firstLevelElement = 'mc-navbar-container';
        this.secondLevelElements = [
            'mc-navbar-item',
            'mc-navbar-brand',
            'mc-navbar-title'
        ];
        const resizeObserver = fromEvent(window, 'resize')
            .pipe(debounceTime(this.resizeDebounceInterval));
        this.resizeSubscription = resizeObserver.subscribe(this.updateCollapsed.bind(this));
    }
    get maxAllowedWidth() {
        return this._elementRef.nativeElement.querySelector('nav').getBoundingClientRect().width;
    }
    get itemsWidths() {
        if (this._itemsWidths !== undefined && !this.forceRecalculateItemsWidth) {
            return this._itemsWidths;
        }
        this.calculateAndCacheItemsWidth();
        return this._itemsWidths;
    }
    get totalItemsWidth() {
        if (this.totalItemsWidths !== undefined && !this.forceRecalculateItemsWidth) {
            return this.totalItemsWidths;
        }
        this.calculateAndCacheTotalItemsWidth();
        return this.totalItemsWidths;
    }
    updateCollapsed() {
        let collapseDelta = this.totalItemsWidth - this.maxAllowedWidth;
        for (let i = this.itemsWidths.length - 1; i >= 0; i--) {
            const item = this.itemsWidths[i];
            if (!item.canCollapse) {
                continue;
            }
            item.processCollapsed(collapseDelta > 0);
            collapseDelta -= item.collapsedItemsWidth;
        }
    }
    ngAfterViewInit() {
        // Note: this wait is required for loading and rendering fonts for icons;
        // unfortunately we cannot control font rendering
        setTimeout(() => this.updateCollapsed(), 0);
    }
    ngOnDestroy() {
        this.resizeSubscription.unsubscribe();
    }
    calculateAndCacheTotalItemsWidth() {
        this.totalItemsWidths = this.itemsWidths
            .reduce((acc, item) => acc + item.width, 0);
    }
    getOuterElementWidth(element) {
        const baseWidth = element.getBoundingClientRect().width;
        const marginRight = parseInt(getComputedStyle(element).getPropertyValue('margin-right'));
        const marginLeft = parseInt(getComputedStyle(element).getPropertyValue('margin-left'));
        return baseWidth + marginRight + marginLeft;
    }
    calculateAndCacheItemsWidth() {
        const allItemsSelector = this.secondLevelElements
            .map((e) => `${this.firstLevelElement}>${e}`);
        const allItems = Array.from(this._elementRef.nativeElement.querySelectorAll(allItemsSelector));
        this._itemsWidths = allItems
            .map((el) => new CachedItemWidth(el, this.getOuterElementWidth(el), this.getItemsForCollapse(el)));
    }
    getItemsForCollapse(element) {
        const icon = element.querySelector(`[mc-icon],mc-navbar-logo,[mc-navbar-logo]`);
        if (!icon) {
            return [];
        }
        return Array.from(element.querySelectorAll('mc-navbar-title'))
            .map((el) => new CollapsibleItem(el, el.getBoundingClientRect().width));
    }
}
McNavbar.decorators = [
    { type: Component, args: [{
                selector: 'mc-navbar',
                template: `
        <nav class="mc-navbar">
            <ng-content select="[mc-navbar-container], mc-navbar-container"></ng-content>
        </nav>
    `,
                encapsulation: ViewEncapsulation.None,
                styles: [".mc-navbar-left,.mc-navbar-right,mc-navbar-container{flex-shrink:0;height:100%}.mc-navbar,.mc-navbar-left,.mc-navbar-right,mc-navbar-container{display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar{position:relative;height:var(--mc-navbar-size-height,48px)}.mc-navbar [mc-icon]+mc-navbar-title{margin-left:var(--mc-navbar-size-icon-margin-left,8px)}.mc-navbar [mc-icon]{min-width:16px;min-height:16px}.mc-navbar mc-navbar-title:not(.mc-navbar-collapsed-title)+[mc-icon]{margin-left:var(--mc-navbar-size-icon-margin-left,8px)}.mc-navbar-brand,.mc-navbar-item,.mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{height:100%;position:relative;display:flex;align-items:center;padding-left:var(--mc-navbar-item-size-padding,16px);padding-right:var(--mc-navbar-item-size-padding,16px)}.mc-navbar-brand,mc-navbar-brand{padding-left:0;padding-right:var(--mc-navbar-brand-size-padding,12px);margin-right:var(--mc-navbar-brand-size-margin-right,24px)}.mc-navbar-brand .mc-navbar-title,mc-navbar-brand .mc-navbar-title{padding-left:var(--mc-navbar-brand-size-padding,12px);padding-right:0}.mc-navbar-title{white-space:nowrap}.mc-navbar-item:not([disabled]){cursor:pointer}.mc-navbar-item .mc-navbar-title,mc-navbar-brand{padding:0}mc-navbar-item.mc-progress:not([disabled]){cursor:pointer}.mc-navbar-item[disabled],mc-navbar-item[disabled] .mc-navbar-item{cursor:default}mc-navbar-title.mc-navbar-collapsed-title{display:none}"]
            },] }
];
/** @nocollapse */
McNavbar.ctorParameters = () => [
    { type: ElementRef }
];

class McNavbarModule {
}
McNavbarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    A11yModule,
                    PlatformModule
                ],
                exports: [
                    McNavbar,
                    McNavbarContainer,
                    McNavbarTitle,
                    McNavbarItem,
                    McNavbarBrand,
                    McNavbarLogo
                ],
                declarations: [
                    McNavbar,
                    McNavbarContainer,
                    McNavbarTitle,
                    McNavbarItem,
                    McNavbarBrand,
                    McNavbarLogo
                ]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { McNavbar, McNavbarBrand, McNavbarContainer, McNavbarItem, McNavbarItemBase, McNavbarLogo, McNavbarMixinBase, McNavbarModule, McNavbarTitle };
//# sourceMappingURL=ptsecurity-mosaic-navbar.js.map
