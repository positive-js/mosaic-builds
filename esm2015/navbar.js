/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __metadata } from 'tslib';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Component, Directive, ElementRef, HostBinding, Input, ViewEncapsulation, ContentChild, TemplateRef, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, NgModule } from '@angular/core';
import { FocusMonitor, A11yModule } from '@ptsecurity/cdk/a11y';
import { SPACE } from '@ptsecurity/cdk/keycodes';
import { Platform, PlatformModule } from '@ptsecurity/cdk/platform';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';
import { McIconModule } from '@ptsecurity/mosaic/icon';

const COLLAPSED_CLASS = 'mc-navbar-collapsed-title';
const MC_ICON = 'mc-icon';
const MC_NAVBAR = 'mc-navbar';
const MC_NAVBAR_CONTAINER = 'mc-navbar-container';
const MC_NAVBAR_ITEM = 'mc-navbar-item';
const MC_NAVBAR_BRAND = 'mc-navbar-brand';
const MC_NAVBAR_TITLE = 'mc-navbar-title';
const MC_NAVBAR_LOGO = 'mc-navbar-logo';
let McNavbarLogo = class McNavbarLogo {
};
McNavbarLogo = __decorate([
    Directive({
        selector: MC_NAVBAR_LOGO,
        host: {
            class: MC_NAVBAR_LOGO
        }
    })
], McNavbarLogo);
let McNavbarBrand = class McNavbarBrand {
};
McNavbarBrand = __decorate([
    Directive({
        selector: MC_NAVBAR_BRAND,
        host: {
            class: MC_NAVBAR_BRAND
        }
    })
], McNavbarBrand);
let McNavbarTitle = class McNavbarTitle {
};
McNavbarTitle = __decorate([
    Directive({
        selector: MC_NAVBAR_TITLE,
        host: {
            class: MC_NAVBAR_TITLE
        }
    })
], McNavbarTitle);
class McNavbarItemBase {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const _McNavbarMixinBase = mixinDisabled(McNavbarItemBase);
let McNavbarItem = class McNavbarItem extends _McNavbarMixinBase {
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
    set collapsedTitle(value) {
        this.elementRef.nativeElement.setAttribute('computedTitle', encodeURI(value));
    }
    get hasDropdownContent() {
        return this.dropdownItems.length > 0;
    }
    get _dropdownElements() {
        return this.dropdownContent ? this.dropdownContent.nativeElement.querySelectorAll('li > *') : [];
    }
    ngOnInit() {
        this.denyClickIfDisabled();
        this._focusMonitor$ = this._focusMonitor.monitor(this.elementRef.nativeElement, true);
        if (this.hasDropdownContent) {
            this.listenClickOutside();
        }
    }
    ngAfterViewInit() {
        if (!this.hasDropdownContent) {
            return;
        }
        this.startListenFocusDropdownItems();
    }
    ngOnDestroy() {
        this._subscription.unsubscribe();
        this._focusMonitor.stopMonitoring(this.elementRef.nativeElement);
        this.stopListenFocusDropdownItems();
    }
    isActiveDropdownLink(link) {
        if (!this._platform.isBrowser) {
            return false;
        }
        return window.location.href.indexOf(link) >= 0;
    }
    handleClickByItem() {
        this.toggleDropdown();
    }
    handleKeydown($event) {
        const isNavbarItem = $event.target.classList.contains(MC_NAVBAR_ITEM);
        if (this.hasDropdownContent && $event.keyCode === SPACE && isNavbarItem) {
            this.toggleDropdown();
        }
    }
    handleClickByDropdownItem() {
        this.forceCloseDropdown();
    }
    listenClickOutside() {
        this._subscription.add(this._focusMonitor$.subscribe((origin) => {
            if (origin === null) {
                this.forceCloseDropdown();
            }
        }));
    }
    toggleDropdown() {
        this.isCollapsed = !this.isCollapsed;
    }
    forceCloseDropdown() {
        this.isCollapsed = true;
        this._cdRef.detectChanges();
    }
    startListenFocusDropdownItems() {
        this._dropdownElements.forEach((el) => {
            this._focusMonitor.monitor(el, true);
        });
    }
    stopListenFocusDropdownItems() {
        this._dropdownElements.forEach((el) => {
            this._focusMonitor.stopMonitoring(el);
        });
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
};
__decorate([
    Input(),
    __metadata("design:type", Number)
], McNavbarItem.prototype, "tabIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], McNavbarItem.prototype, "dropdownItems", void 0);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], McNavbarItem.prototype, "collapsedTitle", null);
__decorate([
    ContentChild('dropdownItemTmpl', { read: TemplateRef }),
    __metadata("design:type", TemplateRef)
], McNavbarItem.prototype, "dropdownItemTmpl", void 0);
__decorate([
    ViewChild('dropdownContent', { read: ElementRef }),
    __metadata("design:type", ElementRef)
], McNavbarItem.prototype, "dropdownContent", void 0);
McNavbarItem = __decorate([
    Component({
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
    }),
    __metadata("design:paramtypes", [ElementRef,
        FocusMonitor,
        Platform,
        ChangeDetectorRef])
], McNavbarItem);
let McNavbarContainer = class McNavbarContainer {
    constructor() {
        this.position = 'left';
    }
    get cssClasses() {
        return this.position === 'left' ? 'mc-navbar-left' : 'mc-navbar-right';
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], McNavbarContainer.prototype, "position", void 0);
__decorate([
    HostBinding('class'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], McNavbarContainer.prototype, "cssClasses", null);
McNavbarContainer = __decorate([
    Directive({
        selector: MC_NAVBAR_CONTAINER
    })
], McNavbarContainer);
class CollapsibleItem {
    constructor(element, width) {
        this.element = element;
        this.width = width;
        this._collapsed = false;
    }
    processCollapsed(collapsed) {
        this._collapsed = collapsed;
        this.updateCollapsedClass();
    }
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
let McNavbar = class McNavbar {
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
        const resizeObserver = fromEvent(window, 'resize')
            .pipe(debounceTime(this.resizeDebounceInterval));
        this._resizeSubscription = resizeObserver.subscribe(this.updateCollapsed.bind(this));
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
        if (this._totalItemsWidths !== undefined && !this.forceRecalculateItemsWidth) {
            return this._totalItemsWidths;
        }
        this.calculateAndCacheTotalItemsWidth();
        return this._totalItemsWidths;
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
        this._resizeSubscription.unsubscribe();
    }
    calculateAndCacheTotalItemsWidth() {
        this._totalItemsWidths = this.itemsWidths
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
        const icon = element.querySelector(`[${MC_ICON}],${MC_NAVBAR_LOGO},[${MC_NAVBAR_LOGO}]`);
        if (!icon) {
            return [];
        }
        return Array.from(element.querySelectorAll(MC_NAVBAR_TITLE))
            .map((el) => new CollapsibleItem(el, el.getBoundingClientRect().width));
    }
};
McNavbar = __decorate([
    Component({
        selector: MC_NAVBAR,
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
        <nav class="mc-navbar">
            <ng-content select="[${MC_NAVBAR_CONTAINER}],${MC_NAVBAR_CONTAINER}"></ng-content>
        </nav>
    `,
        styles: [".mc-navbar-left,.mc-navbar-right,mc-navbar-container{height:100%;display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar{position:relative;height:48px;padding:0 0;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar [mc-icon]+mc-navbar-title{margin-left:8px}.mc-navbar mc-navbar-title:not(.mc-navbar-collapsed-title)+[mc-icon]{margin-left:8px}.mc-navbar-brand,.mc-navbar-item,.mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{height:100%;position:relative;display:flex;align-items:center;padding-left:16px;padding-right:16px;background-color:transparent;border:none}.mc-navbar-brand,mc-navbar-brand{padding-left:0;padding-right:12px;margin-right:24px}.mc-navbar-brand .mc-navbar-title,mc-navbar-brand .mc-navbar-title{padding-left:12px;padding-right:0}.mc-navbar-title{white-space:nowrap}.mc-navbar-item:not([disabled]){cursor:pointer}.mc-navbar-item .mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{padding:0}mc-navbar-item.mc-progress:not([disabled]){cursor:pointer}.mc-navbar-item[disabled],mc-navbar-item[disabled] .mc-navbar-item{cursor:default}mc-navbar-title.mc-navbar-collapsed-title{display:none}.mc-navbar-dropdown{position:absolute;top:100%;left:0;box-sizing:border-box;min-width:100%;height:auto;margin:0;list-style:none;padding-top:4px;padding-right:0;padding-bottom:4px;padding-left:0;border:1px solid;border-top:none;z-index:1}.mc-navbar-right .mc-navbar-dropdown{left:auto;right:0}.mc-navbar-dropdown-link{position:relative;display:block;box-sizing:border-box;padding-top:6px;padding-right:16px;padding-bottom:6px;padding-left:16px;border:2px solid transparent;text-decoration:none;white-space:nowrap}.mc-navbar-dropdown-link.is-active:hover::before{position:absolute;top:-2px;right:-2px;bottom:-2px;left:-2px;content:\"\"}.mc-navbar-dropdown.is-collapsed{display:none}"],
        encapsulation: ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [ElementRef])
], McNavbar);

let McNavbarModule = class McNavbarModule {
};
McNavbarModule = __decorate([
    NgModule({
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
    })
], McNavbarModule);

/**
 * Generated bundle index. Do not edit.
 */

export { McNavbarModule, McNavbarLogo, McNavbarBrand, McNavbarTitle, McNavbarItemBase, _McNavbarMixinBase, McNavbarItem, McNavbarContainer, McNavbar };
//# sourceMappingURL=navbar.js.map
