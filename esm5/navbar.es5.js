/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __extends } from 'tslib';
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
var /** @type {?} */ COLLAPSED_CLASS = 'mc-navbar-collapsed-title';
var /** @type {?} */ MC_ICON = 'mc-icon';
var /** @type {?} */ MC_NAVBAR = 'mc-navbar';
var /** @type {?} */ MC_NAVBAR_CONTAINER = 'mc-navbar-container';
var /** @type {?} */ MC_NAVBAR_ITEM = 'mc-navbar-item';
var /** @type {?} */ MC_NAVBAR_BRAND = 'mc-navbar-brand';
var /** @type {?} */ MC_NAVBAR_TITLE = 'mc-navbar-title';
var /** @type {?} */ MC_NAVBAR_LOGO = 'mc-navbar-logo';
var McNavbarLogo = /** @class */ (function () {
    function McNavbarLogo() {
    }
    McNavbarLogo.decorators = [
        { type: Directive, args: [{
                    selector: MC_NAVBAR_LOGO,
                    host: {
                        class: MC_NAVBAR_LOGO
                    }
                },] },
    ];
    return McNavbarLogo;
}());
var McNavbarBrand = /** @class */ (function () {
    function McNavbarBrand() {
    }
    McNavbarBrand.decorators = [
        { type: Directive, args: [{
                    selector: MC_NAVBAR_BRAND,
                    host: {
                        class: MC_NAVBAR_BRAND
                    }
                },] },
    ];
    return McNavbarBrand;
}());
var McNavbarTitle = /** @class */ (function () {
    function McNavbarTitle() {
    }
    McNavbarTitle.decorators = [
        { type: Directive, args: [{
                    selector: MC_NAVBAR_TITLE,
                    host: {
                        class: MC_NAVBAR_TITLE
                    }
                },] },
    ];
    return McNavbarTitle;
}());
var McNavbarItemBase = /** @class */ (function () {
    function McNavbarItemBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McNavbarItemBase;
}());
var /** @type {?} */ _McNavbarMixinBase = mixinDisabled(McNavbarItemBase);
var McNavbarItem = /** @class */ (function (_super) {
    __extends(McNavbarItem, _super);
    function McNavbarItem(elementRef, _focusMonitor) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        _this._focusMonitor = _focusMonitor;
        _this.tabIndex = 0;
        return _this;
    }
    Object.defineProperty(McNavbarItem.prototype, "collapsedTitle", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.elementRef.nativeElement.setAttribute('computedTitle', encodeURI(value));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McNavbarItem.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.denyClickIfDisabled();
        this._focusMonitor.monitor(this.elementRef.nativeElement, true);
    };
    /**
     * @return {?}
     */
    McNavbarItem.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    };
    /**
     * @return {?}
     */
    McNavbarItem.prototype.denyClickIfDisabled = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ events = this.elementRef.nativeElement.eventListeners('click');
        events.forEach(function (event) { return _this.elementRef.nativeElement.removeEventListener('click', event); });
        this.elementRef.nativeElement.addEventListener('click', function (event) {
            if (_this.elementRef.nativeElement.hasAttribute('disabled')) {
                event.stopImmediatePropagation();
            }
        }, true);
        events.forEach(function (event) { return _this.elementRef.nativeElement.addEventListener('click', event); });
    };
    McNavbarItem.decorators = [
        { type: Component, args: [{
                    selector: MC_NAVBAR_ITEM,
                    template: "\n        <a [attr.tabindex]=\"disabled ? -1 : tabIndex\" class=\"mc-navbar-item\">\n            <ng-content>\n            </ng-content>\n        </a>\n    ",
                    encapsulation: ViewEncapsulation.None,
                    inputs: ['disabled'],
                    host: {
                        '[attr.disabled]': 'disabled || null'
                    }
                },] },
    ];
    /** @nocollapse */
    McNavbarItem.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: FocusMonitor, },
    ]; };
    McNavbarItem.propDecorators = {
        "tabIndex": [{ type: Input },],
        "collapsedTitle": [{ type: Input },],
    };
    return McNavbarItem;
}(_McNavbarMixinBase));
var McNavbarContainer = /** @class */ (function () {
    function McNavbarContainer() {
        this.position = 'left';
    }
    Object.defineProperty(McNavbarContainer.prototype, "cssClasses", {
        get: /**
         * @return {?}
         */
        function () {
            return this.position === 'left' ? 'mc-navbar-left' : 'mc-navbar-right';
        },
        enumerable: true,
        configurable: true
    });
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
    return McNavbarContainer;
}());
var CollapsibleItem = /** @class */ (function () {
    function CollapsibleItem(element, width) {
        this.element = element;
        this.width = width;
        this._collapsed = false;
    }
    /**
     * @param {?} collapsed
     * @return {?}
     */
    CollapsibleItem.prototype.processCollapsed = /**
     * @param {?} collapsed
     * @return {?}
     */
    function (collapsed) {
        this._collapsed = collapsed;
        this.updateCollapsedClass();
    };
    /**
     * @return {?}
     */
    CollapsibleItem.prototype.updateCollapsedClass = /**
     * @return {?}
     */
    function () {
        if (this._collapsed) {
            this.element.classList.add(COLLAPSED_CLASS);
        }
        else {
            this.element.classList.remove(COLLAPSED_CLASS);
        }
    };
    return CollapsibleItem;
}());
var CachedItemWidth = /** @class */ (function () {
    function CachedItemWidth(element, width, itemsForCollapse) {
        if (itemsForCollapse === void 0) { itemsForCollapse = []; }
        this.element = element;
        this.width = width;
        this.itemsForCollapse = itemsForCollapse;
    }
    Object.defineProperty(CachedItemWidth.prototype, "canCollapse", {
        get: /**
         * @return {?}
         */
        function () {
            return this.itemsForCollapse.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CachedItemWidth.prototype, "collapsedItemsWidth", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._collapsedItemsWidth !== undefined) {
                return this._collapsedItemsWidth;
            }
            this.calculateAndCacheCollapsedItemsWidth();
            return this._collapsedItemsWidth;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} collapsed
     * @return {?}
     */
    CachedItemWidth.prototype.processCollapsed = /**
     * @param {?} collapsed
     * @return {?}
     */
    function (collapsed) {
        if (this.itemsForCollapse.length > 0) {
            this.updateTitle(collapsed);
        }
        this.itemsForCollapse.forEach(function (item) { return item.processCollapsed(collapsed); });
    };
    /**
     * @return {?}
     */
    CachedItemWidth.prototype.calculateAndCacheCollapsedItemsWidth = /**
     * @return {?}
     */
    function () {
        this._collapsedItemsWidth = this.itemsForCollapse
            .reduce(function (acc, item) { return acc + item.width; }, 0);
    };
    /**
     * @return {?}
     */
    CachedItemWidth.prototype.getTitle = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ computedTitle = this.element.getAttribute('computedTitle');
        return computedTitle
            ? decodeURI(computedTitle)
            : (this.itemsForCollapse.length > 0 ? this.itemsForCollapse[0].element.innerText : '');
    };
    /**
     * @param {?} collapsed
     * @return {?}
     */
    CachedItemWidth.prototype.updateTitle = /**
     * @param {?} collapsed
     * @return {?}
     */
    function (collapsed) {
        if (collapsed) {
            this.element.setAttribute('title', this.getTitle());
        }
        else {
            this.element.removeAttribute('title');
        }
    };
    return CachedItemWidth;
}());
var McNavbar = /** @class */ (function () {
    function McNavbar(_elementRef) {
        this._elementRef = _elementRef;
        this.forceRecalculateItemsWidth = false;
        this.resizeDebounceInterval = 100;
        this.firstLevelElement = MC_NAVBAR_CONTAINER;
        this.secondLevelElements = [
            MC_NAVBAR_ITEM,
            MC_NAVBAR_BRAND,
            MC_NAVBAR_TITLE
        ];
        var /** @type {?} */ resizeObserver = fromEvent(window, 'resize')
            .pipe(debounceTime(this.resizeDebounceInterval));
        this._resizeSubscription = resizeObserver.subscribe(this.updateCollapsed.bind(this));
    }
    Object.defineProperty(McNavbar.prototype, "maxAllowedWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return this._elementRef.nativeElement.querySelector('nav').getBoundingClientRect().width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McNavbar.prototype, "itemsWidths", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._itemsWidths !== undefined && !this.forceRecalculateItemsWidth) {
                return this._itemsWidths;
            }
            this.calculateAndCacheItemsWidth();
            return this._itemsWidths;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McNavbar.prototype, "totalItemsWidth", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._totalItemsWidths !== undefined && !this.forceRecalculateItemsWidth) {
                return this._totalItemsWidths;
            }
            this.calculateAndCacheTotalItemsWidth();
            return this._totalItemsWidths;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McNavbar.prototype.updateCollapsed = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ collapseDelta = this.totalItemsWidth - this.maxAllowedWidth;
        for (var /** @type {?} */ i = this.itemsWidths.length - 1; i >= 0; i--) {
            var /** @type {?} */ item = this.itemsWidths[i];
            if (!item.canCollapse) {
                continue;
            }
            item.processCollapsed(collapseDelta > 0);
            collapseDelta -= item.collapsedItemsWidth;
        }
    };
    /**
     * @return {?}
     */
    McNavbar.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Note: this wait is required for loading and rendering fonts for icons;
        // unfortunately we cannot control font rendering
        setTimeout(function () { return _this.updateCollapsed(); }, 0);
    };
    /**
     * @return {?}
     */
    McNavbar.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._resizeSubscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    McNavbar.prototype.calculateAndCacheTotalItemsWidth = /**
     * @return {?}
     */
    function () {
        this._totalItemsWidths = this.itemsWidths
            .reduce(function (acc, item) { return acc + item.width; }, 0);
    };
    /**
     * @param {?} element
     * @return {?}
     */
    McNavbar.prototype.getOuterElementWidth = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        var /** @type {?} */ baseWidth = element.getBoundingClientRect().width;
        var /** @type {?} */ marginRight = parseInt(getComputedStyle(element).getPropertyValue('margin-right'));
        var /** @type {?} */ marginLeft = parseInt(getComputedStyle(element).getPropertyValue('margin-left'));
        return baseWidth + marginRight + marginLeft;
    };
    /**
     * @return {?}
     */
    McNavbar.prototype.calculateAndCacheItemsWidth = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ allItemsSelector = this.secondLevelElements
            .map(function (e) { return _this.firstLevelElement + ">" + e; });
        var /** @type {?} */ allItems = Array.from(this._elementRef.nativeElement.querySelectorAll(allItemsSelector));
        this._itemsWidths = allItems
            .map(function (el) { return new CachedItemWidth(el, _this.getOuterElementWidth(el), _this.getItemsForCollapse(el)); });
    };
    /**
     * @param {?} element
     * @return {?}
     */
    McNavbar.prototype.getItemsForCollapse = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        var /** @type {?} */ icon = element.querySelector("[" + MC_ICON + "]," + MC_NAVBAR_LOGO + ",[" + MC_NAVBAR_LOGO + "]");
        if (!icon) {
            return [];
        }
        return Array.from(element.querySelectorAll(MC_NAVBAR_TITLE))
            .map(function (el) { return new CollapsibleItem(/** @type {?} */ (el), el.getBoundingClientRect().width); });
    };
    McNavbar.decorators = [
        { type: Component, args: [{
                    selector: MC_NAVBAR,
                    template: "\n        <nav class=\"mc-navbar\">\n            <ng-content select=\"[" + MC_NAVBAR_CONTAINER + "]," + MC_NAVBAR_CONTAINER + "\"></ng-content>\n        </nav>\n    ",
                    styles: [".mc-navbar-left,.mc-navbar-right,mc-navbar-container{height:100%;display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar{min-width:1280px;position:relative;height:48px;padding:0 0;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar [mc-icon]+mc-navbar-title{margin-left:8px}.mc-navbar mc-navbar-title:not(.mc-navbar-collapsed-title)+[mc-icon]{margin-left:8px}.mc-navbar-brand,.mc-navbar-item,.mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{height:100%;position:relative;display:flex;align-items:center;padding-left:16px;padding-right:16px}.mc-navbar-brand,mc-navbar-brand{padding-left:0;padding-right:12px;margin-right:24px}.mc-navbar-brand .mc-navbar-title,mc-navbar-brand .mc-navbar-title{padding-left:12px;padding-right:0}.mc-navbar-title{white-space:nowrap}@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.mc-navbar-item:not([disabled]){cursor:pointer}.mc-navbar-item .mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{padding:0}mc-navbar-item.mc-progress:not([disabled]){cursor:pointer}.mc-navbar-item[disabled],mc-navbar-item[disabled] .mc-navbar-item{cursor:default}mc-navbar-title.mc-navbar-collapsed-title{display:none}"],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    McNavbar.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    return McNavbar;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var McNavbarModule = /** @class */ (function () {
    function McNavbarModule() {
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
    return McNavbarModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { McNavbarModule, McNavbarLogo, McNavbarBrand, McNavbarTitle, McNavbarItemBase, _McNavbarMixinBase, McNavbarItem, McNavbarContainer, McNavbar };
//# sourceMappingURL=navbar.es5.js.map
