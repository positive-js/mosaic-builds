/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Component, Directive, ElementRef, HostBinding, Input, ViewEncapsulation, NgModule } from '@angular/core';
import { FocusMonitor, A11yModule } from '@ptsecurity/cdk/a11y';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';
import { PlatformModule } from '@ptsecurity/cdk/platform';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ COLLAPSED_CLASS = 'mc-navbar-collapsed-title';
const /** @type {?} */ MC_ICON = 'mc-icon';
const /** @type {?} */ MC_NAVBAR = 'mc-navbar';
const /** @type {?} */ MC_NAVBAR_CONTAINER = 'mc-navbar-container';
const /** @type {?} */ MC_NAVBAR_ITEM = 'mc-navbar-item';
const /** @type {?} */ MC_NAVBAR_BRAND = 'mc-navbar-brand';
const /** @type {?} */ MC_NAVBAR_TITLE = 'mc-navbar-title';
const /** @type {?} */ MC_NAVBAR_LOGO = 'mc-navbar-logo';
class McNavbarLogo {
}
McNavbarLogo.decorators = [
    { type: Directive, args: [{
                selector: MC_NAVBAR_LOGO,
                host: {
                    class: MC_NAVBAR_LOGO
                }
            },] },
];
class McNavbarBrand {
}
McNavbarBrand.decorators = [
    { type: Directive, args: [{
                selector: MC_NAVBAR_BRAND,
                host: {
                    class: MC_NAVBAR_BRAND
                }
            },] },
];
class McNavbarTitle {
}
McNavbarTitle.decorators = [
    { type: Directive, args: [{
                selector: MC_NAVBAR_TITLE,
                host: {
                    class: MC_NAVBAR_TITLE
                }
            },] },
];
class McNavbarItemBase {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const /** @type {?} */ _McNavbarMixinBase = mixinDisabled(McNavbarItemBase);
class McNavbarItem extends _McNavbarMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} _focusMonitor
     */
    constructor(elementRef, _focusMonitor) {
        super(elementRef);
        this.elementRef = elementRef;
        this._focusMonitor = _focusMonitor;
        this.tabIndex = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set collapsedTitle(value) {
        this.elementRef.nativeElement.setAttribute('computedTitle', encodeURI(value));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.denyClickIfDisabled();
        this._focusMonitor.monitor(this.elementRef.nativeElement, true);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }
    /**
     * @return {?}
     */
    denyClickIfDisabled() {
        const /** @type {?} */ events = this.elementRef.nativeElement.eventListeners('click');
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
                selector: MC_NAVBAR_ITEM,
                template: `
        <a [attr.tabindex]="disabled ? -1 : tabIndex" class="mc-navbar-item">
            <ng-content>
            </ng-content>
        </a>
    `,
                encapsulation: ViewEncapsulation.None,
                inputs: ['disabled'],
                host: {
                    '[attr.disabled]': 'disabled || null'
                }
            },] },
];
/** @nocollapse */
McNavbarItem.ctorParameters = () => [
    { type: ElementRef, },
    { type: FocusMonitor, },
];
McNavbarItem.propDecorators = {
    "tabIndex": [{ type: Input },],
    "collapsedTitle": [{ type: Input },],
};
class McNavbarContainer {
    constructor() {
        this.position = 'left';
    }
    /**
     * @return {?}
     */
    get cssClasses() {
        return this.position === 'left' ? 'mc-navbar-left' : 'mc-navbar-right';
    }
}
McNavbarContainer.decorators = [
    { type: Directive, args: [{
                selector: MC_NAVBAR_CONTAINER
            },] },
];
/** @nocollapse */
McNavbarContainer.propDecorators = {
    "position": [{ type: Input },],
    "cssClasses": [{ type: HostBinding, args: ['class',] },],
};
class CollapsibleItem {
    /**
     * @param {?} element
     * @param {?} width
     */
    constructor(element, width) {
        this.element = element;
        this.width = width;
        this._collapsed = false;
    }
    /**
     * @param {?} collapsed
     * @return {?}
     */
    processCollapsed(collapsed) {
        this._collapsed = collapsed;
        this.updateCollapsedClass();
    }
    /**
     * @return {?}
     */
    updateCollapsedClass() {
        if (this._collapsed) {
            this.element.classList.add(COLLAPSED_CLASS);
        }
        else {
            this.element.classList.remove(COLLAPSED_CLASS);
        }
    }
}
class CachedItemWidth {
    /**
     * @param {?} element
     * @param {?} width
     * @param {?=} itemsForCollapse
     */
    constructor(element, width, itemsForCollapse = []) {
        this.element = element;
        this.width = width;
        this.itemsForCollapse = itemsForCollapse;
    }
    /**
     * @return {?}
     */
    get canCollapse() {
        return this.itemsForCollapse.length > 0;
    }
    /**
     * @return {?}
     */
    get collapsedItemsWidth() {
        if (this._collapsedItemsWidth !== undefined) {
            return this._collapsedItemsWidth;
        }
        this.calculateAndCacheCollapsedItemsWidth();
        return this._collapsedItemsWidth;
    }
    /**
     * @param {?} collapsed
     * @return {?}
     */
    processCollapsed(collapsed) {
        if (this.itemsForCollapse.length > 0) {
            this.updateTitle(collapsed);
        }
        this.itemsForCollapse.forEach((item) => item.processCollapsed(collapsed));
    }
    /**
     * @return {?}
     */
    calculateAndCacheCollapsedItemsWidth() {
        this._collapsedItemsWidth = this.itemsForCollapse
            .reduce((acc, item) => acc + item.width, 0);
    }
    /**
     * @return {?}
     */
    getTitle() {
        const /** @type {?} */ computedTitle = this.element.getAttribute('computedTitle');
        return computedTitle
            ? decodeURI(computedTitle)
            : (this.itemsForCollapse.length > 0 ? this.itemsForCollapse[0].element.innerText : '');
    }
    /**
     * @param {?} collapsed
     * @return {?}
     */
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
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this.forceRecalculateItemsWidth = false;
        this.resizeDebounceInterval = 100;
        this.firstLevelElement = MC_NAVBAR_CONTAINER;
        this.secondLevelElements = [
            MC_NAVBAR_ITEM,
            MC_NAVBAR_BRAND,
            MC_NAVBAR_TITLE
        ];
        const /** @type {?} */ resizeObserver = fromEvent(window, 'resize')
            .pipe(debounceTime(this.resizeDebounceInterval));
        this._resizeSubscription = resizeObserver.subscribe(this.updateCollapsed.bind(this));
    }
    /**
     * @return {?}
     */
    get maxAllowedWidth() {
        return this._elementRef.nativeElement.querySelector('nav').getBoundingClientRect().width;
    }
    /**
     * @return {?}
     */
    get itemsWidths() {
        if (this._itemsWidths !== undefined && !this.forceRecalculateItemsWidth) {
            return this._itemsWidths;
        }
        this.calculateAndCacheItemsWidth();
        return this._itemsWidths;
    }
    /**
     * @return {?}
     */
    get totalItemsWidth() {
        if (this._totalItemsWidths !== undefined && !this.forceRecalculateItemsWidth) {
            return this._totalItemsWidths;
        }
        this.calculateAndCacheTotalItemsWidth();
        return this._totalItemsWidths;
    }
    /**
     * @return {?}
     */
    updateCollapsed() {
        let /** @type {?} */ collapseDelta = this.totalItemsWidth - this.maxAllowedWidth;
        for (let /** @type {?} */ i = this.itemsWidths.length - 1; i >= 0; i--) {
            const /** @type {?} */ item = this.itemsWidths[i];
            if (!item.canCollapse) {
                continue;
            }
            item.processCollapsed(collapseDelta > 0);
            collapseDelta -= item.collapsedItemsWidth;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // Note: this wait is required for loading and rendering fonts for icons;
        // unfortunately we cannot control font rendering
        setTimeout(() => this.updateCollapsed(), 0);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._resizeSubscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    calculateAndCacheTotalItemsWidth() {
        this._totalItemsWidths = this.itemsWidths
            .reduce((acc, item) => acc + item.width, 0);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    getOuterElementWidth(element) {
        const /** @type {?} */ baseWidth = element.getBoundingClientRect().width;
        const /** @type {?} */ marginRight = parseInt(getComputedStyle(element).getPropertyValue('margin-right'));
        const /** @type {?} */ marginLeft = parseInt(getComputedStyle(element).getPropertyValue('margin-left'));
        return baseWidth + marginRight + marginLeft;
    }
    /**
     * @return {?}
     */
    calculateAndCacheItemsWidth() {
        const /** @type {?} */ allItemsSelector = this.secondLevelElements
            .map((e) => `${this.firstLevelElement}>${e}`);
        const /** @type {?} */ allItems = Array.from(this._elementRef.nativeElement.querySelectorAll(allItemsSelector));
        this._itemsWidths = allItems
            .map((el) => new CachedItemWidth(el, this.getOuterElementWidth(el), this.getItemsForCollapse(el)));
    }
    /**
     * @param {?} element
     * @return {?}
     */
    getItemsForCollapse(element) {
        const /** @type {?} */ icon = element.querySelector(`[${MC_ICON}],${MC_NAVBAR_LOGO},[${MC_NAVBAR_LOGO}]`);
        if (!icon) {
            return [];
        }
        return Array.from(element.querySelectorAll(MC_NAVBAR_TITLE))
            .map((el) => new CollapsibleItem(/** @type {?} */ (el), el.getBoundingClientRect().width));
    }
}
McNavbar.decorators = [
    { type: Component, args: [{
                selector: MC_NAVBAR,
                template: `
        <nav class="mc-navbar">
            <ng-content select="[${MC_NAVBAR_CONTAINER}],${MC_NAVBAR_CONTAINER}"></ng-content>
        </nav>
    `,
                styles: [".mc-navbar-left,.mc-navbar-right,mc-navbar-container{height:100%;display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar{position:relative;height:48px;padding:0 0;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar [mc-icon]+mc-navbar-title{margin-left:8px}.mc-navbar mc-navbar-title:not(.mc-navbar-collapsed-title)+[mc-icon]{margin-left:8px}.mc-navbar-brand,.mc-navbar-item,.mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{height:100%;position:relative;display:flex;align-items:center;padding-left:16px;padding-right:16px}.mc-navbar-brand,mc-navbar-brand{padding-left:0;padding-right:12px;margin-right:24px}.mc-navbar-brand .mc-navbar-title,mc-navbar-brand .mc-navbar-title{padding-left:12px;padding-right:0}.mc-navbar-title{white-space:nowrap}@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.mc-navbar-item:not([disabled]){cursor:pointer}.mc-navbar-item .mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{padding:0}mc-navbar-item.mc-progress:not([disabled]){cursor:pointer}.mc-navbar-item[disabled],mc-navbar-item[disabled] .mc-navbar-item{cursor:default}mc-navbar-title.mc-navbar-collapsed-title{display:none}"],
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
McNavbar.ctorParameters = () => [
    { type: ElementRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { McNavbarModule, McNavbarLogo, McNavbarBrand, McNavbarTitle, McNavbarItemBase, _McNavbarMixinBase, McNavbarItem, McNavbarContainer, McNavbar };
//# sourceMappingURL=navbar.js.map
