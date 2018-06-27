/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { Component, Directive, ElementRef, HostBinding, Input, ViewEncapsulation, NgModule } from '@angular/core';
import { FocusMonitor, A11yModule } from '@ptsecurity/cdk/a11y';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';
import { PlatformModule } from '@ptsecurity/cdk/platform';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
        this.elementRef.nativeElement.setAttribute('calculatedTitle', encodeURI(value));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._denyClickIfDisabled();
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
    _denyClickIfDisabled() {
        const /** @type {?} */ events = this.elementRef.nativeElement.eventListeners('click');
        for (const /** @type {?} */ event of events) {
            this.elementRef.nativeElement.removeEventListener('click', event);
        }
        this.elementRef.nativeElement.addEventListener('click', (event) => {
            if (this.elementRef.nativeElement.hasAttribute('disabled')) {
                event.stopImmediatePropagation();
            }
        }, true);
        for (const /** @type {?} */ event of events) {
            this.elementRef.nativeElement.addEventListener('click', event);
        }
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
    get getCssClasses() {
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
    "getCssClasses": [{ type: HostBinding, args: ['class',] },],
};
class McNavbar {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this.collapsedClass = 'mc-navbar-collapsed-title';
        this.firstLevelElement = MC_NAVBAR_CONTAINER;
        this.secondLevelElements = [
            MC_NAVBAR_ITEM,
            MC_NAVBAR_BRAND,
            MC_NAVBAR_TITLE
        ];
    }
    /**
     * @return {?}
     */
    collapse() {
        const /** @type {?} */ maxWidth = this._elementRef.nativeElement.querySelector('nav').getBoundingClientRect().width;
        this._uncollapseAll();
        const /** @type {?} */ allItemsSelector = this.secondLevelElements.map((e) => `${this.firstLevelElement}>${e}`);
        const /** @type {?} */ allItems = Array.from(this._elementRef.nativeElement.querySelectorAll(allItemsSelector));
        const /** @type {?} */ itemsWidth = allItems.reduce((acc, el) => acc + el.getBoundingClientRect().width, 0);
        if (itemsWidth <= maxWidth) {
            return;
        }
        let /** @type {?} */ collapseDelta = itemsWidth - maxWidth;
        const /** @type {?} */ firstLevelItems = this._elementRef.nativeElement.querySelectorAll(`${MC_NAVBAR_ITEM},${MC_NAVBAR_BRAND}`);
        for (let /** @type {?} */ i = firstLevelItems.length - 1; i >= 0; i--) {
            const /** @type {?} */ item = firstLevelItems[i];
            const /** @type {?} */ icon = item.querySelector(`[${MC_ICON}],${MC_NAVBAR_LOGO},[${MC_NAVBAR_LOGO}]`);
            if (!icon) {
                continue;
            }
            const /** @type {?} */ restElements = Array.from(item.querySelectorAll(MC_NAVBAR_TITLE));
            const /** @type {?} */ calculatedTitle = item.getAttribute('calculatedTitle');
            const /** @type {?} */ title = calculatedTitle
                ? decodeURI(calculatedTitle)
                : (restElements.length > 0 ? restElements[0].innerText : '');
            item.setAttribute('title', title);
            for (const /** @type {?} */ element of restElements) {
                collapseDelta -= element.getBoundingClientRect().width;
                element.classList.add(this.collapsedClass);
            }
            if (collapseDelta < 0) {
                return;
            }
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.collapse();
    }
    /**
     * @return {?}
     */
    _uncollapseAll() {
        const /** @type {?} */ titles = Array.from(this._elementRef.nativeElement.querySelectorAll(`${MC_NAVBAR_TITLE}.${this.collapsedClass}`));
        for (const /** @type {?} */ title of titles) {
            title.classList.remove(this.collapsedClass);
        }
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
                styles: [".mc-navbar-left,.mc-navbar-right,mc-navbar-container{height:100%;display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar{min-width:1280px;position:relative;height:48px;padding:0 0;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar [mc-icon]+mc-navbar-title{margin-left:8px}.mc-navbar mc-navbar-title:not(.mc-navbar-collapsed-title)+[mc-icon]{margin-left:8px}.mc-navbar-brand,.mc-navbar-item,.mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{height:100%;position:relative;display:flex;align-items:center;padding-left:16px;padding-right:16px}.mc-navbar-brand,mc-navbar-brand{padding-left:12px;padding-right:12px}.mc-navbar-title{white-space:nowrap}@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.mc-navbar-item:not([disabled]){cursor:pointer}.mc-navbar-item .mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{padding:0}mc-navbar-item.mc-progress:not([disabled]){cursor:pointer}.mc-navbar-item[disabled],mc-navbar-item[disabled] .mc-navbar-item{cursor:default}mc-navbar-title.mc-navbar-collapsed-title{display:none}"],
                encapsulation: ViewEncapsulation.None,
                host: {
                    '(window:resize)': 'collapse()'
                }
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
