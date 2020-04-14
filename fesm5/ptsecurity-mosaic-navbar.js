import { FocusMonitor, A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { Directive, Component, ViewEncapsulation, ElementRef, Input, NgModule } from '@angular/core';
import { __extends } from 'tslib';
import { mixinTabIndex, mixinDisabled } from '@ptsecurity/mosaic/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * Generated from: navbar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var COLLAPSED_CLASS = 'mc-navbar-collapsed-title';
var McNavbarLogo = /** @class */ (function () {
    function McNavbarLogo() {
    }
    McNavbarLogo.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-navbar-logo',
                    host: {
                        class: 'mc-navbar-logo'
                    }
                },] }
    ];
    return McNavbarLogo;
}());
var McNavbarBrand = /** @class */ (function () {
    function McNavbarBrand() {
    }
    McNavbarBrand.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-navbar-brand',
                    host: {
                        class: 'mc-navbar-brand'
                    }
                },] }
    ];
    return McNavbarBrand;
}());
var McNavbarTitle = /** @class */ (function () {
    function McNavbarTitle() {
    }
    McNavbarTitle.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-navbar-title',
                    host: {
                        class: 'mc-navbar-title'
                    }
                },] }
    ];
    return McNavbarTitle;
}());
var McNavbarItemBase = /** @class */ (function () {
    function McNavbarItemBase(elementRef) {
        this.elementRef = elementRef;
    }
    return McNavbarItemBase;
}());
if (false) {
    /** @type {?} */
    McNavbarItemBase.prototype.elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
var McNavbarMixinBase = mixinTabIndex(mixinDisabled(McNavbarItemBase));
var McNavbarItem = /** @class */ (function (_super) {
    __extends(McNavbarItem, _super);
    function McNavbarItem(elementRef, _focusMonitor) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        _this._focusMonitor = _focusMonitor;
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
    // This method is required due to angular 2 issue https://github.com/angular/angular/issues/11200
    // This method is required due to angular 2 issue https://github.com/angular/angular/issues/11200
    /**
     * @private
     * @return {?}
     */
    McNavbarItem.prototype.denyClickIfDisabled = 
    // This method is required due to angular 2 issue https://github.com/angular/angular/issues/11200
    /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var events = this.elementRef.nativeElement.eventListeners('click');
        events.forEach((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.elementRef.nativeElement.removeEventListener('click', event); }));
        this.elementRef.nativeElement.addEventListener('click', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (_this.elementRef.nativeElement.hasAttribute('disabled')) {
                event.stopImmediatePropagation();
            }
        }), true);
        events.forEach((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.elementRef.nativeElement.addEventListener('click', event); }));
    };
    McNavbarItem.decorators = [
        { type: Component, args: [{
                    selector: 'mc-navbar-item',
                    template: "<ng-content></ng-content>",
                    encapsulation: ViewEncapsulation.None,
                    inputs: ['disabled', 'tabIndex'],
                    host: {
                        class: 'mc-navbar-item',
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.disabled]': 'disabled || null'
                    }
                }] }
    ];
    /** @nocollapse */
    McNavbarItem.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FocusMonitor }
    ]; };
    McNavbarItem.propDecorators = {
        collapsedTitle: [{ type: Input }]
    };
    return McNavbarItem;
}(McNavbarMixinBase));
if (false) {
    /** @type {?} */
    McNavbarItem.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    McNavbarItem.prototype._focusMonitor;
}
var McNavbarContainer = /** @class */ (function () {
    function McNavbarContainer() {
        this.position = 'left';
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
    return McNavbarContainer;
}());
if (false) {
    /** @type {?} */
    McNavbarContainer.prototype.position;
}
var CollapsibleItem = /** @class */ (function () {
    function CollapsibleItem(element, width) {
        this.element = element;
        this.width = width;
        this.collapsed = false;
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
        this.collapsed = collapsed;
        this.updateCollapsedClass();
    };
    /**
     * @private
     * @return {?}
     */
    CollapsibleItem.prototype.updateCollapsedClass = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.collapsed) {
            this.element.classList.add(COLLAPSED_CLASS);
        }
        else {
            this.element.classList.remove(COLLAPSED_CLASS);
        }
    };
    return CollapsibleItem;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    CollapsibleItem.prototype.collapsed;
    /** @type {?} */
    CollapsibleItem.prototype.element;
    /** @type {?} */
    CollapsibleItem.prototype.width;
}
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
        this.itemsForCollapse.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.processCollapsed(collapsed); }));
    };
    /**
     * @private
     * @return {?}
     */
    CachedItemWidth.prototype.calculateAndCacheCollapsedItemsWidth = /**
     * @private
     * @return {?}
     */
    function () {
        this._collapsedItemsWidth = this.itemsForCollapse
            .reduce((/**
         * @param {?} acc
         * @param {?} item
         * @return {?}
         */
        function (acc, item) { return acc + item.width; }), 0);
    };
    /**
     * @private
     * @return {?}
     */
    CachedItemWidth.prototype.getTitle = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var computedTitle = this.element.getAttribute('computedTitle');
        return computedTitle
            ? decodeURI(computedTitle)
            : (this.itemsForCollapse.length > 0 ? this.itemsForCollapse[0].element.innerText : '');
    };
    /**
     * @private
     * @param {?} collapsed
     * @return {?}
     */
    CachedItemWidth.prototype.updateTitle = /**
     * @private
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    CachedItemWidth.prototype._collapsedItemsWidth;
    /** @type {?} */
    CachedItemWidth.prototype.element;
    /** @type {?} */
    CachedItemWidth.prototype.width;
    /** @type {?} */
    CachedItemWidth.prototype.itemsForCollapse;
}
var McNavbar = /** @class */ (function () {
    function McNavbar(_elementRef) {
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
        var resizeObserver = fromEvent(window, 'resize')
            .pipe(debounceTime(this.resizeDebounceInterval));
        this.resizeSubscription = resizeObserver.subscribe(this.updateCollapsed.bind(this));
    }
    Object.defineProperty(McNavbar.prototype, "maxAllowedWidth", {
        get: /**
         * @private
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
         * @private
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
         * @private
         * @return {?}
         */
        function () {
            if (this.totalItemsWidths !== undefined && !this.forceRecalculateItemsWidth) {
                return this.totalItemsWidths;
            }
            this.calculateAndCacheTotalItemsWidth();
            return this.totalItemsWidths;
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
        /** @type {?} */
        var collapseDelta = this.totalItemsWidth - this.maxAllowedWidth;
        for (var i = this.itemsWidths.length - 1; i >= 0; i--) {
            /** @type {?} */
            var item = this.itemsWidths[i];
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
        setTimeout((/**
         * @return {?}
         */
        function () { return _this.updateCollapsed(); }), 0);
    };
    /**
     * @return {?}
     */
    McNavbar.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.resizeSubscription.unsubscribe();
    };
    /**
     * @private
     * @return {?}
     */
    McNavbar.prototype.calculateAndCacheTotalItemsWidth = /**
     * @private
     * @return {?}
     */
    function () {
        this.totalItemsWidths = this.itemsWidths
            .reduce((/**
         * @param {?} acc
         * @param {?} item
         * @return {?}
         */
        function (acc, item) { return acc + item.width; }), 0);
    };
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    McNavbar.prototype.getOuterElementWidth = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var baseWidth = element.getBoundingClientRect().width;
        /** @type {?} */
        var marginRight = parseInt(getComputedStyle(element).getPropertyValue('margin-right'));
        /** @type {?} */
        var marginLeft = parseInt(getComputedStyle(element).getPropertyValue('margin-left'));
        return baseWidth + marginRight + marginLeft;
    };
    /**
     * @private
     * @return {?}
     */
    McNavbar.prototype.calculateAndCacheItemsWidth = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var allItemsSelector = this.secondLevelElements
            .map((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.firstLevelElement + ">" + e; }));
        /** @type {?} */
        var allItems = Array.from(this._elementRef.nativeElement.querySelectorAll(allItemsSelector));
        this._itemsWidths = allItems
            .map((/**
         * @param {?} el
         * @return {?}
         */
        function (el) { return new CachedItemWidth(el, _this.getOuterElementWidth(el), _this.getItemsForCollapse(el)); }));
    };
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    McNavbar.prototype.getItemsForCollapse = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var icon = element.querySelector("[mc-icon],mc-navbar-logo,[mc-navbar-logo]");
        if (!icon) {
            return [];
        }
        return Array.from(element.querySelectorAll('mc-navbar-title'))
            .map((/**
         * @param {?} el
         * @return {?}
         */
        function (el) { return new CollapsibleItem((/** @type {?} */ (el)), el.getBoundingClientRect().width); }));
    };
    McNavbar.decorators = [
        { type: Component, args: [{
                    selector: 'mc-navbar',
                    template: "\n        <nav class=\"mc-navbar\">\n            <ng-content select=\"[mc-navbar-container], mc-navbar-container\"></ng-content>\n        </nav>\n    ",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".mc-navbar-left,.mc-navbar-right,mc-navbar-container{height:100%;display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar{position:relative;height:48px;padding:0;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar [mc-icon]+mc-navbar-title{margin-left:8px}.mc-navbar [mc-icon]{min-width:16px;min-height:16px}.mc-navbar mc-navbar-title:not(.mc-navbar-collapsed-title)+[mc-icon]{margin-left:8px}.mc-navbar-brand,.mc-navbar-item,.mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{height:100%;position:relative;display:flex;align-items:center;padding-left:16px;padding-right:16px}.mc-navbar-brand,mc-navbar-brand{padding-left:0;padding-right:12px;margin-right:24px}.mc-navbar-brand .mc-navbar-title,mc-navbar-brand .mc-navbar-title{padding-left:12px;padding-right:0}.mc-navbar-title{white-space:nowrap}.mc-navbar-item:not([disabled]){cursor:pointer}.mc-navbar-item .mc-navbar-title,mc-navbar-brand{padding:0}mc-navbar-item.mc-progress:not([disabled]){cursor:pointer}.mc-navbar-item[disabled],mc-navbar-item[disabled] .mc-navbar-item{cursor:default}mc-navbar-title.mc-navbar-collapsed-title{display:none}"]
                }] }
    ];
    /** @nocollapse */
    McNavbar.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return McNavbar;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    McNavbar.prototype.forceRecalculateItemsWidth;
    /**
     * @type {?}
     * @private
     */
    McNavbar.prototype.resizeDebounceInterval;
    /**
     * @type {?}
     * @private
     */
    McNavbar.prototype.firstLevelElement;
    /**
     * @type {?}
     * @private
     */
    McNavbar.prototype.secondLevelElements;
    /**
     * @type {?}
     * @private
     */
    McNavbar.prototype.totalItemsWidths;
    /**
     * @type {?}
     * @private
     */
    McNavbar.prototype._itemsWidths;
    /**
     * @type {?}
     * @private
     */
    McNavbar.prototype.resizeSubscription;
    /**
     * @type {?}
     * @private
     */
    McNavbar.prototype._elementRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: navbar.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                },] }
    ];
    return McNavbarModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ptsecurity-mosaic-navbar.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McNavbar, McNavbarBrand, McNavbarContainer, McNavbarItem, McNavbarItemBase, McNavbarLogo, McNavbarMixinBase, McNavbarModule, McNavbarTitle };
//# sourceMappingURL=ptsecurity-mosaic-navbar.js.map
