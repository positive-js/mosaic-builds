/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Component, Directive, ElementRef, HostBinding, Input, ViewEncapsulation, ContentChild, TemplateRef, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, NgModule } from '@angular/core';
import { FocusMonitor, A11yModule } from '@ptsecurity/cdk/a11y';
import { SPACE } from '@ptsecurity/cdk/keycodes';
import { Platform, PlatformModule } from '@ptsecurity/cdk/platform';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';
import { McIconModule } from '@ptsecurity/mosaic/icon';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const COLLAPSED_CLASS = 'mc-navbar-collapsed-title';
/** @type {?} */
const MC_ICON = 'mc-icon';
/** @type {?} */
const MC_NAVBAR = 'mc-navbar';
/** @type {?} */
const MC_NAVBAR_CONTAINER = 'mc-navbar-container';
/** @type {?} */
const MC_NAVBAR_ITEM = 'mc-navbar-item';
/** @type {?} */
const MC_NAVBAR_BRAND = 'mc-navbar-brand';
/** @type {?} */
const MC_NAVBAR_TITLE = 'mc-navbar-title';
/** @type {?} */
const MC_NAVBAR_LOGO = 'mc-navbar-logo';
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
/** @type {?} */
const _McNavbarMixinBase = mixinDisabled(McNavbarItemBase);
class McNavbarItem extends _McNavbarMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} _focusMonitor
     * @param {?} _platform
     * @param {?} _cdRef
     */
    constructor(elementRef, _focusMonitor, _platform, _cdRef) {
        super(elementRef);
        this.elementRef = elementRef;
        this._focusMonitor = _focusMonitor;
        this._platform = _platform;
        this._cdRef = _cdRef;
        this.tabIndex = 0;
        this.dropdownItems = [];
        this.isCollapsed = true;
        this._subscription = new Subscription();
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
    get hasDropdownContent() {
        return this.dropdownItems.length > 0;
    }
    /**
     * @return {?}
     */
    get _dropdownElements() {
        return this.dropdownContent ? this.dropdownContent.nativeElement.querySelectorAll('li > *') : [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.denyClickIfDisabled();
        this._focusMonitor$ = this._focusMonitor.monitor(this.elementRef.nativeElement, true);
        if (this.hasDropdownContent) {
            this.listenClickOutside();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this.hasDropdownContent) {
            return;
        }
        this.startListenFocusDropdownItems();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
        this._focusMonitor.stopMonitoring(this.elementRef.nativeElement);
        this.stopListenFocusDropdownItems();
    }
    /**
     * @param {?} link
     * @return {?}
     */
    isActiveDropdownLink(link) {
        if (!this._platform.isBrowser) {
            return false;
        }
        return window.location.href.indexOf(link) >= 0;
    }
    /**
     * @return {?}
     */
    handleClickByItem() {
        this.toggleDropdown();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    handleKeydown($event) {
        /** @type {?} */
        const isNavbarItem = (/** @type {?} */ ($event.target)).classList.contains(MC_NAVBAR_ITEM);
        if (this.hasDropdownContent && $event.keyCode === SPACE && isNavbarItem) {
            this.toggleDropdown();
        }
    }
    /**
     * @return {?}
     */
    handleClickByDropdownItem() {
        this.forceCloseDropdown();
    }
    /**
     * @return {?}
     */
    listenClickOutside() {
        this._subscription.add(this._focusMonitor$.subscribe((origin) => {
            if (origin === null) {
                this.forceCloseDropdown();
            }
        }));
    }
    /**
     * @return {?}
     */
    toggleDropdown() {
        this.isCollapsed = !this.isCollapsed;
    }
    /**
     * @return {?}
     */
    forceCloseDropdown() {
        this.isCollapsed = true;
        this._cdRef.detectChanges();
    }
    /**
     * @return {?}
     */
    startListenFocusDropdownItems() {
        this._dropdownElements.forEach((el) => {
            this._focusMonitor.monitor(el, true);
        });
    }
    /**
     * @return {?}
     */
    stopListenFocusDropdownItems() {
        this._dropdownElements.forEach((el) => {
            this._focusMonitor.stopMonitoring(el);
        });
    }
    /**
     * @return {?}
     */
    denyClickIfDisabled() {
        /** @type {?} */
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
                selector: MC_NAVBAR_ITEM,
                template: `
        <a
            [attr.tabindex]=\"disabled ? -1 : tabIndex\"
            (click)="handleClickByItem()"
            (keydown)="handleKeydown($event)"
            class="mc-navbar-item"
        >
            <ng-content></ng-content>
            <i *ngIf="hasDropdownContent" mc-icon="mc-angle-M_16"></i>
        </a>
        <ul
            #dropdownContent
            *ngIf="hasDropdownContent"
            [ngClass]="{ 'is-collapsed': isCollapsed }"
            class="mc-navbar-dropdown"
        >
            <li
                *ngFor="let item of dropdownItems"
                (click)="handleClickByDropdownItem()"
                class="mc-navbar-dropdown-item"
            >
                <ng-container *ngIf="dropdownItemTmpl">
                    <ng-container *ngTemplateOutlet="dropdownItemTmpl; context: { $implicit: item }"></ng-container>
                </ng-container>
                <a
                    *ngIf="!dropdownItemTmpl"
                    [attr.href]="item.link"
                    [ngClass]="{ 'is-active': isActiveDropdownLink(item.link) }"
                    class="mc-navbar-dropdown-link"
                >{{ item.text }}</a>
            </li>
        </ul>
    `,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                inputs: ['disabled'],
                host: {
                    '[attr.disabled]': 'disabled || null',
                    '[attr.tabindex]': '-1'
                }
            },] },
];
/** @nocollapse */
McNavbarItem.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor },
    { type: Platform },
    { type: ChangeDetectorRef }
];
McNavbarItem.propDecorators = {
    tabIndex: [{ type: Input }],
    dropdownItems: [{ type: Input }],
    collapsedTitle: [{ type: Input }],
    dropdownItemTmpl: [{ type: ContentChild, args: ['dropdownItemTmpl', { read: TemplateRef },] }],
    dropdownContent: [{ type: ViewChild, args: ['dropdownContent', { read: ElementRef },] }]
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
        /** @type {?} */
        const computedTitle = this.element.getAttribute('computedTitle');
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
        /** @type {?} */
        const resizeObserver = fromEvent(window, 'resize')
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
        /** @type {?} */
        const baseWidth = element.getBoundingClientRect().width;
        /** @type {?} */
        const marginRight = parseInt(getComputedStyle(element).getPropertyValue('margin-right'));
        /** @type {?} */
        const marginLeft = parseInt(getComputedStyle(element).getPropertyValue('margin-left'));
        return baseWidth + marginRight + marginLeft;
    }
    /**
     * @return {?}
     */
    calculateAndCacheItemsWidth() {
        /** @type {?} */
        const allItemsSelector = this.secondLevelElements
            .map((e) => `${this.firstLevelElement}>${e}`);
        /** @type {?} */
        const allItems = Array.from(this._elementRef.nativeElement.querySelectorAll(allItemsSelector));
        this._itemsWidths = allItems
            .map((el) => new CachedItemWidth(el, this.getOuterElementWidth(el), this.getItemsForCollapse(el)));
    }
    /**
     * @param {?} element
     * @return {?}
     */
    getItemsForCollapse(element) {
        /** @type {?} */
        const icon = element.querySelector(`[${MC_ICON}],${MC_NAVBAR_LOGO},[${MC_NAVBAR_LOGO}]`);
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
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
        <nav class="mc-navbar">
            <ng-content select="[${MC_NAVBAR_CONTAINER}],${MC_NAVBAR_CONTAINER}"></ng-content>
        </nav>
    `,
                styles: [".mc-navbar-left,.mc-navbar-right,mc-navbar-container{height:100%;display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar{position:relative;height:48px;padding:0 0;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar [mc-icon]+mc-navbar-title{margin-left:8px}.mc-navbar mc-navbar-title:not(.mc-navbar-collapsed-title)+[mc-icon]{margin-left:8px}.mc-navbar-brand,.mc-navbar-item,.mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{height:100%;position:relative;display:flex;align-items:center;padding-left:16px;padding-right:16px;background-color:transparent;border:none}.mc-navbar-brand,mc-navbar-brand{padding-left:0;padding-right:12px;margin-right:24px}.mc-navbar-brand .mc-navbar-title,mc-navbar-brand .mc-navbar-title{padding-left:12px;padding-right:0}.mc-navbar-title{white-space:nowrap}.mc-navbar-item:not([disabled]){cursor:pointer}.mc-navbar-item .mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{padding:0}mc-navbar-item.mc-progress:not([disabled]){cursor:pointer}.mc-navbar-item[disabled],mc-navbar-item[disabled] .mc-navbar-item{cursor:default}mc-navbar-title.mc-navbar-collapsed-title{display:none}.mc-navbar-dropdown{position:absolute;top:100%;left:0;box-sizing:border-box;min-width:100%;height:auto;margin:0;list-style:none;padding-top:4px;padding-right:0;padding-bottom:4px;padding-left:0;border:1px solid;border-top:none;z-index:1}.mc-navbar-right .mc-navbar-dropdown{left:auto;right:0}.mc-navbar-dropdown-link{position:relative;display:block;box-sizing:border-box;padding-top:6px;padding-right:16px;padding-bottom:6px;padding-left:16px;border:2px solid transparent;text-decoration:none;white-space:nowrap}.mc-navbar-dropdown-link.is-active:hover::before{position:absolute;top:-2px;right:-2px;bottom:-2px;left:-2px;content:\"\"}.mc-navbar-dropdown.is-collapsed{display:none}"],
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
McNavbar.ctorParameters = () => [
    { type: ElementRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class McNavbarModule {
}
McNavbarModule.decorators = [
    { type: NgModule, args: [{
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { McNavbarModule, McNavbarLogo, McNavbarBrand, McNavbarTitle, McNavbarItemBase, _McNavbarMixinBase, McNavbarItem, McNavbarContainer, McNavbar };
//# sourceMappingURL=navbar.js.map
