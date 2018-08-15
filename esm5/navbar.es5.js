/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __extends } from 'tslib';
import { Attribute, ChangeDetectionStrategy, Component, Directive, ElementRef, ViewEncapsulation, NgModule, HostBinding, Input, ContentChild, TemplateRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { mixinColor, mixinDisabled } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';
import { A11yModule, FocusMonitor } from '@ptsecurity/cdk/a11y';
import { PlatformModule, Platform } from '@ptsecurity/cdk/platform';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SPACE } from '@ptsecurity/cdk/keycodes';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var McIconCSSStyler = /** @class */ (function () {
    function McIconCSSStyler() {
    }
    McIconCSSStyler.decorators = [
        { type: Directive, args: [{
                    selector: '[mc-icon]',
                    host: { class: 'mc mc-icon' }
                },] },
    ];
    return McIconCSSStyler;
}());
var McIconBase = /** @class */ (function () {
    function McIconBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McIconBase;
}());
/** @type {?} */
var _McIconMixinBase = mixinColor(McIconBase);
var McIcon = /** @class */ (function (_super) {
    __extends(McIcon, _super);
    function McIcon(elementRef, iconName) {
        var _this = _super.call(this, elementRef) || this;
        elementRef.nativeElement.classList.add(iconName);
        return _this;
    }
    /**
     * @return {?}
     */
    McIcon.prototype._getHostElement = /**
     * @return {?}
     */
    function () {
        return this._elementRef.nativeElement;
    };
    McIcon.decorators = [
        { type: Component, args: [{
                    selector: "[mc-icon]",
                    template: '<ng-content></ng-content>',
                    styles: [""],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    McIcon.ctorParameters = function () { return [
        { type: ElementRef },
        { type: String, decorators: [{ type: Attribute, args: ['mc-icon',] }] }
    ]; };
    return McIcon;
}(_McIconMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var McIconModule = /** @class */ (function () {
    function McIconModule() {
    }
    McIconModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        A11yModule,
                        PlatformModule
                    ],
                    exports: [
                        McIcon,
                        McIconCSSStyler
                    ],
                    declarations: [
                        McIcon,
                        McIconCSSStyler
                    ]
                },] },
    ];
    return McIconModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var COLLAPSED_CLASS = 'mc-navbar-collapsed-title';
/** @type {?} */
var MC_ICON = 'mc-icon';
/** @type {?} */
var MC_NAVBAR = 'mc-navbar';
/** @type {?} */
var MC_NAVBAR_CONTAINER = 'mc-navbar-container';
/** @type {?} */
var MC_NAVBAR_ITEM = 'mc-navbar-item';
/** @type {?} */
var MC_NAVBAR_BRAND = 'mc-navbar-brand';
/** @type {?} */
var MC_NAVBAR_TITLE = 'mc-navbar-title';
/** @type {?} */
var MC_NAVBAR_LOGO = 'mc-navbar-logo';
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
/** @type {?} */
var _McNavbarMixinBase = mixinDisabled(McNavbarItemBase);
var McNavbarItem = /** @class */ (function (_super) {
    __extends(McNavbarItem, _super);
    function McNavbarItem(elementRef, _focusMonitor, _platform, _cdRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        _this._focusMonitor = _focusMonitor;
        _this._platform = _platform;
        _this._cdRef = _cdRef;
        _this.tabIndex = 0;
        _this.dropdownItems = [];
        _this.isCollapsed = true;
        _this._subscription = new Subscription();
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
    Object.defineProperty(McNavbarItem.prototype, "hasDropdownContent", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dropdownItems.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McNavbarItem.prototype, "_dropdownElements", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dropdownContent ? this.dropdownContent.nativeElement.querySelectorAll('li > *') : [];
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
        this._focusMonitor$ = this._focusMonitor.monitor(this.elementRef.nativeElement, true);
        if (this.hasDropdownContent) {
            this.listenClickOutside();
        }
    };
    /**
     * @return {?}
     */
    McNavbarItem.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (!this.hasDropdownContent) {
            return;
        }
        this.startListenFocusDropdownItems();
    };
    /**
     * @return {?}
     */
    McNavbarItem.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
        this._focusMonitor.stopMonitoring(this.elementRef.nativeElement);
        this.stopListenFocusDropdownItems();
    };
    /**
     * @param {?} link
     * @return {?}
     */
    McNavbarItem.prototype.isActiveDropdownLink = /**
     * @param {?} link
     * @return {?}
     */
    function (link) {
        if (!this._platform.isBrowser) {
            return false;
        }
        return window.location.href.indexOf(link) >= 0;
    };
    /**
     * @return {?}
     */
    McNavbarItem.prototype.handleClickByItem = /**
     * @return {?}
     */
    function () {
        this.toggleDropdown();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    McNavbarItem.prototype.handleKeydown = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var isNavbarItem = (/** @type {?} */ ($event.target)).classList.contains(MC_NAVBAR_ITEM);
        if (this.hasDropdownContent && $event.keyCode === SPACE && isNavbarItem) {
            this.toggleDropdown();
        }
    };
    /**
     * @return {?}
     */
    McNavbarItem.prototype.handleClickByDropdownItem = /**
     * @return {?}
     */
    function () {
        this.forceCloseDropdown();
    };
    /**
     * @return {?}
     */
    McNavbarItem.prototype.listenClickOutside = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._subscription.add(this._focusMonitor$.subscribe(function (origin) {
            if (origin === null) {
                _this.forceCloseDropdown();
            }
        }));
    };
    /**
     * @return {?}
     */
    McNavbarItem.prototype.toggleDropdown = /**
     * @return {?}
     */
    function () {
        this.isCollapsed = !this.isCollapsed;
    };
    /**
     * @return {?}
     */
    McNavbarItem.prototype.forceCloseDropdown = /**
     * @return {?}
     */
    function () {
        this.isCollapsed = true;
        this._cdRef.detectChanges();
    };
    /**
     * @return {?}
     */
    McNavbarItem.prototype.startListenFocusDropdownItems = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._dropdownElements.forEach(function (el) {
            _this._focusMonitor.monitor(el, true);
        });
    };
    /**
     * @return {?}
     */
    McNavbarItem.prototype.stopListenFocusDropdownItems = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._dropdownElements.forEach(function (el) {
            _this._focusMonitor.stopMonitoring(el);
        });
    };
    /**
     * @return {?}
     */
    McNavbarItem.prototype.denyClickIfDisabled = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var events = this.elementRef.nativeElement.eventListeners('click');
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
                    template: "\n        <a\n            [attr.tabindex]=\"disabled ? -1 : tabIndex\"\n            (click)=\"handleClickByItem()\"\n            (keydown)=\"handleKeydown($event)\"\n            class=\"mc-navbar-item\"\n        >\n            <ng-content></ng-content>\n            <i *ngIf=\"hasDropdownContent\" mc-icon=\"mc-angle-M_16\"></i>\n        </a>\n        <ul\n            #dropdownContent\n            *ngIf=\"hasDropdownContent\"\n            [ngClass]=\"{ 'is-collapsed': isCollapsed }\"\n            class=\"mc-navbar-dropdown\"\n        >\n            <li\n                *ngFor=\"let item of dropdownItems\"\n                (click)=\"handleClickByDropdownItem()\"\n                class=\"mc-navbar-dropdown-item\"\n            >\n                <ng-container *ngIf=\"dropdownItemTmpl\">\n                    <ng-container *ngTemplateOutlet=\"dropdownItemTmpl; context: { $implicit: item }\"></ng-container>\n                </ng-container>\n                <a\n                    *ngIf=\"!dropdownItemTmpl\"\n                    [attr.href]=\"item.link\"\n                    [ngClass]=\"{ 'is-active': isActiveDropdownLink(item.link) }\"\n                    class=\"mc-navbar-dropdown-link\"\n                >{{ item.text }}</a>\n            </li>\n        </ul>\n    ",
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
    McNavbarItem.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FocusMonitor },
        { type: Platform },
        { type: ChangeDetectorRef }
    ]; };
    McNavbarItem.propDecorators = {
        tabIndex: [{ type: Input }],
        dropdownItems: [{ type: Input }],
        collapsedTitle: [{ type: Input }],
        dropdownItemTmpl: [{ type: ContentChild, args: ['dropdownItemTmpl', { read: TemplateRef },] }],
        dropdownContent: [{ type: ViewChild, args: ['dropdownContent', { read: ElementRef },] }]
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
    McNavbarContainer.propDecorators = {
        position: [{ type: Input }],
        cssClasses: [{ type: HostBinding, args: ['class',] }]
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
        /** @type {?} */
        var computedTitle = this.element.getAttribute('computedTitle');
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
        /** @type {?} */
        var resizeObserver = fromEvent(window, 'resize')
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
        /** @type {?} */
        var baseWidth = element.getBoundingClientRect().width;
        /** @type {?} */
        var marginRight = parseInt(getComputedStyle(element).getPropertyValue('margin-right'));
        /** @type {?} */
        var marginLeft = parseInt(getComputedStyle(element).getPropertyValue('margin-left'));
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
        /** @type {?} */
        var allItemsSelector = this.secondLevelElements
            .map(function (e) { return _this.firstLevelElement + ">" + e; });
        /** @type {?} */
        var allItems = Array.from(this._elementRef.nativeElement.querySelectorAll(allItemsSelector));
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
        /** @type {?} */
        var icon = element.querySelector("[" + MC_ICON + "]," + MC_NAVBAR_LOGO + ",[" + MC_NAVBAR_LOGO + "]");
        if (!icon) {
            return [];
        }
        return Array.from(element.querySelectorAll(MC_NAVBAR_TITLE))
            .map(function (el) { return new CollapsibleItem(/** @type {?} */ (el), el.getBoundingClientRect().width); });
    };
    McNavbar.decorators = [
        { type: Component, args: [{
                    selector: MC_NAVBAR,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n        <nav class=\"mc-navbar\">\n            <ng-content select=\"[" + MC_NAVBAR_CONTAINER + "]," + MC_NAVBAR_CONTAINER + "\"></ng-content>\n        </nav>\n    ",
                    styles: [".mc-navbar-left,.mc-navbar-right,mc-navbar-container{height:100%;display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar{position:relative;height:48px;padding:0 0;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar [mc-icon]+mc-navbar-title{margin-left:8px}.mc-navbar mc-navbar-title:not(.mc-navbar-collapsed-title)+[mc-icon]{margin-left:8px}.mc-navbar-brand,.mc-navbar-item,.mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{height:100%;position:relative;display:flex;align-items:center;padding-left:16px;padding-right:16px;background-color:transparent;border:none}.mc-navbar-brand,mc-navbar-brand{padding-left:0;padding-right:12px;margin-right:24px}.mc-navbar-brand .mc-navbar-title,mc-navbar-brand .mc-navbar-title{padding-left:12px;padding-right:0}.mc-navbar-title{white-space:nowrap}@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.mc-navbar-item:not([disabled]){cursor:pointer}.mc-navbar-item .mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{padding:0}mc-navbar-item.mc-progress:not([disabled]){cursor:pointer}.mc-navbar-item[disabled],mc-navbar-item[disabled] .mc-navbar-item{cursor:default}mc-navbar-title.mc-navbar-collapsed-title{display:none}.mc-navbar-dropdown{position:absolute;top:100%;left:0;box-sizing:border-box;min-width:100%;height:auto;margin:0;list-style:none;padding-top:4px;padding-right:0;padding-bottom:4px;padding-left:0;border:1px solid;border-top:none;z-index:1}.mc-navbar-right .mc-navbar-dropdown{left:auto;right:0}.mc-navbar-dropdown-link{position:relative;display:block;box-sizing:border-box;padding-top:6px;padding-right:16px;padding-bottom:6px;padding-left:16px;border:2px solid transparent;text-decoration:none;white-space:nowrap}.mc-navbar-dropdown-link.is-active:hover::before{position:absolute;top:-2px;right:-2px;bottom:-2px;left:-2px;content:\"\"}.mc-navbar-dropdown.is-collapsed{display:none}"],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    McNavbar.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return McNavbar;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var McNavbarModule = /** @class */ (function () {
    function McNavbarModule() {
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
    return McNavbarModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { McNavbarModule, McNavbarLogo, McNavbarBrand, McNavbarTitle, McNavbarItemBase, _McNavbarMixinBase, McNavbarItem, McNavbarContainer, McNavbar, McIcon as ɵe9, McIconBase as ɵc9, McIconCSSStyler as ɵb9, _McIconMixinBase as ɵd9, McIconModule as ɵa9 };
//# sourceMappingURL=navbar.es5.js.map
