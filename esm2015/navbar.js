/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { FocusMonitor, A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { Directive, Component, ViewEncapsulation, ElementRef, Input, HostBinding, NgModule } from '@angular/core';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const COLLAPSED_CLASS = 'mc-navbar-collapsed-title';
class McNavbarLogo {
}
McNavbarLogo.decorators = [
    { type: Directive, args: [{
                selector: 'mc-navbar-logo',
                host: {
                    class: 'mc-navbar-logo'
                }
            },] },
];
class McNavbarBrand {
}
McNavbarBrand.decorators = [
    { type: Directive, args: [{
                selector: 'mc-navbar-brand',
                host: {
                    class: 'mc-navbar-brand'
                }
            },] },
];
class McNavbarTitle {
}
McNavbarTitle.decorators = [
    { type: Directive, args: [{
                selector: 'mc-navbar-title',
                host: {
                    class: 'mc-navbar-title'
                }
            },] },
];
class McNavbarItemBase {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
const McNavbarMixinBase = mixinDisabled(McNavbarItemBase);
class McNavbarItem extends McNavbarMixinBase {
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
    // This method is required due to angular 2 issue https://github.com/angular/angular/issues/11200
    /**
     * @private
     * @return {?}
     */
    denyClickIfDisabled() {
        /** @type {?} */
        const events = this.elementRef.nativeElement.eventListeners('click');
        events.forEach((/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.elementRef.nativeElement.removeEventListener('click', event)));
        this.elementRef.nativeElement.addEventListener('click', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (this.elementRef.nativeElement.hasAttribute('disabled')) {
                event.stopImmediatePropagation();
            }
        }), true);
        events.forEach((/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.elementRef.nativeElement.addEventListener('click', event)));
    }
}
McNavbarItem.decorators = [
    { type: Component, args: [{
                selector: 'mc-navbar-item',
                template: `<ng-content></ng-content>`,
                encapsulation: ViewEncapsulation.None,
                inputs: ['disabled'],
                host: {
                    '[attr.tabIndex]': 'disabled ? -1 : tabIndex',
                    '[attr.disabled]': 'disabled || null',
                    class: 'mc-navbar-item'
                }
            },] },
];
/** @nocollapse */
McNavbarItem.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor }
];
McNavbarItem.propDecorators = {
    tabIndex: [{ type: Input }],
    collapsedTitle: [{ type: Input }]
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
                selector: 'mc-navbar-container'
            },] },
];
McNavbarContainer.propDecorators = {
    position: [{ type: Input }],
    cssClasses: [{ type: HostBinding, args: ['class',] }]
};
class CollapsibleItem {
    /**
     * @param {?} element
     * @param {?} width
     */
    constructor(element, width) {
        this.element = element;
        this.width = width;
        this.collapsed = false;
    }
    /**
     * @param {?} collapsed
     * @return {?}
     */
    processCollapsed(collapsed) {
        this.collapsed = collapsed;
        this.updateCollapsedClass();
    }
    /**
     * @private
     * @return {?}
     */
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
        this.itemsForCollapse.forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item.processCollapsed(collapsed)));
    }
    /**
     * @private
     * @return {?}
     */
    calculateAndCacheCollapsedItemsWidth() {
        this._collapsedItemsWidth = this.itemsForCollapse
            .reduce((/**
         * @param {?} acc
         * @param {?} item
         * @return {?}
         */
        (acc, item) => acc + item.width), 0);
    }
    /**
     * @private
     * @return {?}
     */
    getTitle() {
        /** @type {?} */
        const computedTitle = this.element.getAttribute('computedTitle');
        return computedTitle
            ? decodeURI(computedTitle)
            : (this.itemsForCollapse.length > 0 ? this.itemsForCollapse[0].element.innerText : '');
    }
    /**
     * @private
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
        this.firstLevelElement = 'mc-navbar-container';
        this.secondLevelElements = [
            'mc-navbar-item',
            'mc-navbar-brand',
            'mc-navbar-title'
        ];
        /** @type {?} */
        const resizeObserver = fromEvent(window, 'resize')
            .pipe(debounceTime(this.resizeDebounceInterval));
        this.resizeSubscription = resizeObserver.subscribe(this.updateCollapsed.bind(this));
    }
    /**
     * @private
     * @return {?}
     */
    get maxAllowedWidth() {
        return this._elementRef.nativeElement.querySelector('nav').getBoundingClientRect().width;
    }
    /**
     * @private
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
     * @private
     * @return {?}
     */
    get totalItemsWidth() {
        if (this.totalItemsWidths !== undefined && !this.forceRecalculateItemsWidth) {
            return this.totalItemsWidths;
        }
        this.calculateAndCacheTotalItemsWidth();
        return this.totalItemsWidths;
    }
    /**
     * @return {?}
     */
    updateCollapsed() {
        /** @type {?} */
        let collapseDelta = this.totalItemsWidth - this.maxAllowedWidth;
        for (let i = this.itemsWidths.length - 1; i >= 0; i--) {
            /** @type {?} */
            const item = this.itemsWidths[i];
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
        setTimeout((/**
         * @return {?}
         */
        () => this.updateCollapsed()), 0);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.resizeSubscription.unsubscribe();
    }
    /**
     * @private
     * @return {?}
     */
    calculateAndCacheTotalItemsWidth() {
        this.totalItemsWidths = this.itemsWidths
            .reduce((/**
         * @param {?} acc
         * @param {?} item
         * @return {?}
         */
        (acc, item) => acc + item.width), 0);
    }
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    getOuterElementWidth(element) {
        /** @type {?} */
        const baseWidth = element.getBoundingClientRect().width;
        /** @type {?} */
        const marginRight = parseInt(getComputedStyle(element).getPropertyValue('margin-right'));
        /** @type {?} */
        const marginLeft = parseInt(getComputedStyle(element).getPropertyValue('margin-left'));
        return baseWidth + marginRight + marginLeft;
    }
    /**
     * @private
     * @return {?}
     */
    calculateAndCacheItemsWidth() {
        /** @type {?} */
        const allItemsSelector = this.secondLevelElements
            .map((/**
         * @param {?} e
         * @return {?}
         */
        (e) => `${this.firstLevelElement}>${e}`));
        /** @type {?} */
        const allItems = Array.from(this._elementRef.nativeElement.querySelectorAll(allItemsSelector));
        this._itemsWidths = allItems
            .map((/**
         * @param {?} el
         * @return {?}
         */
        (el) => new CachedItemWidth(el, this.getOuterElementWidth(el), this.getItemsForCollapse(el))));
    }
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    getItemsForCollapse(element) {
        /** @type {?} */
        const icon = element.querySelector(`[mc-icon],mc-navbar-logo,[mc-navbar-logo]`);
        if (!icon) {
            return [];
        }
        return Array.from(element.querySelectorAll('mc-navbar-title'))
            .map((/**
         * @param {?} el
         * @return {?}
         */
        (el) => new CollapsibleItem((/** @type {?} */ (el)), el.getBoundingClientRect().width)));
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
                styles: [".mc-navbar-left,.mc-navbar-right,mc-navbar-container{height:100%;display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar{position:relative;height:48px;padding:0 0;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar [mc-icon]+mc-navbar-title{margin-left:8px}.mc-navbar [mc-icon]{min-width:16px;min-height:16px}.mc-navbar mc-navbar-title:not(.mc-navbar-collapsed-title)+[mc-icon]{margin-left:8px}.mc-navbar-brand,.mc-navbar-item,.mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{height:100%;position:relative;display:flex;align-items:center;padding-left:16px;padding-right:16px}.mc-navbar-brand,mc-navbar-brand{padding-left:0;padding-right:12px;margin-right:24px}.mc-navbar-brand .mc-navbar-title,mc-navbar-brand .mc-navbar-title{padding-left:12px;padding-right:0}.mc-navbar-title{white-space:nowrap}.mc-navbar-item:not([disabled]){cursor:pointer}.mc-navbar-item .mc-navbar-title,mc-navbar-brand{padding:0}mc-navbar-item.mc-progress:not([disabled]){cursor:pointer}.mc-navbar-item[disabled],mc-navbar-item[disabled] .mc-navbar-item{cursor:default}mc-navbar-title.mc-navbar-collapsed-title{display:none}"],
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
McNavbar.ctorParameters = () => [
    { type: ElementRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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

export { McNavbar, McNavbarBrand, McNavbarContainer, McNavbarItem, McNavbarItemBase, McNavbarLogo, McNavbarMixinBase, McNavbarModule, McNavbarTitle };
//# sourceMappingURL=navbar.js.map
