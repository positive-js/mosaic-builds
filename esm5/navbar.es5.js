/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __extends, __metadata } from 'tslib';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Component, Directive, ElementRef, HostBinding, Input, ViewEncapsulation, ContentChild, TemplateRef, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, NgModule } from '@angular/core';
import { FocusMonitor, A11yModule } from '@ptsecurity/cdk/a11y';
import { SPACE } from '@ptsecurity/cdk/keycodes';
import { Platform, PlatformModule } from '@ptsecurity/cdk/platform';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';
import { McIconModule } from '@ptsecurity/mosaic/icon';

var COLLAPSED_CLASS = 'mc-navbar-collapsed-title';
var MC_ICON = 'mc-icon';
var MC_NAVBAR = 'mc-navbar';
var MC_NAVBAR_CONTAINER = 'mc-navbar-container';
var MC_NAVBAR_ITEM = 'mc-navbar-item';
var MC_NAVBAR_BRAND = 'mc-navbar-brand';
var MC_NAVBAR_TITLE = 'mc-navbar-title';
var MC_NAVBAR_LOGO = 'mc-navbar-logo';
var McNavbarLogo = /** @class */ (function () {
    function McNavbarLogo() {
    }
    McNavbarLogo = __decorate([
        Directive({
            selector: MC_NAVBAR_LOGO,
            host: {
                class: MC_NAVBAR_LOGO
            }
        })
    ], McNavbarLogo);
    return McNavbarLogo;
}());
var McNavbarBrand = /** @class */ (function () {
    function McNavbarBrand() {
    }
    McNavbarBrand = __decorate([
        Directive({
            selector: MC_NAVBAR_BRAND,
            host: {
                class: MC_NAVBAR_BRAND
            }
        })
    ], McNavbarBrand);
    return McNavbarBrand;
}());
var McNavbarTitle = /** @class */ (function () {
    function McNavbarTitle() {
    }
    McNavbarTitle = __decorate([
        Directive({
            selector: MC_NAVBAR_TITLE,
            host: {
                class: MC_NAVBAR_TITLE
            }
        })
    ], McNavbarTitle);
    return McNavbarTitle;
}());
var McNavbarItemBase = /** @class */ (function () {
    function McNavbarItemBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McNavbarItemBase;
}());
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
        set: function (value) {
            this.elementRef.nativeElement.setAttribute('computedTitle', encodeURI(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McNavbarItem.prototype, "hasDropdownContent", {
        get: function () {
            return this.dropdownItems.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McNavbarItem.prototype, "_dropdownElements", {
        get: function () {
            return this.dropdownContent ? this.dropdownContent.nativeElement.querySelectorAll('li > *') : [];
        },
        enumerable: true,
        configurable: true
    });
    McNavbarItem.prototype.ngOnInit = function () {
        this.denyClickIfDisabled();
        this._focusMonitor$ = this._focusMonitor.monitor(this.elementRef.nativeElement, true);
        if (this.hasDropdownContent) {
            this.listenClickOutside();
        }
    };
    McNavbarItem.prototype.ngAfterViewInit = function () {
        if (!this.hasDropdownContent) {
            return;
        }
        this.startListenFocusDropdownItems();
    };
    McNavbarItem.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
        this._focusMonitor.stopMonitoring(this.elementRef.nativeElement);
        this.stopListenFocusDropdownItems();
    };
    McNavbarItem.prototype.isActiveDropdownLink = function (link) {
        if (!this._platform.isBrowser) {
            return false;
        }
        return window.location.href.indexOf(link) >= 0;
    };
    McNavbarItem.prototype.handleClickByItem = function () {
        this.toggleDropdown();
    };
    McNavbarItem.prototype.handleKeydown = function ($event) {
        var isNavbarItem = $event.target.classList.contains(MC_NAVBAR_ITEM);
        // tslint:disable-next-line
        if (this.hasDropdownContent && $event.keyCode === SPACE && isNavbarItem) {
            this.toggleDropdown();
        }
    };
    McNavbarItem.prototype.handleClickByDropdownItem = function () {
        this.forceCloseDropdown();
    };
    McNavbarItem.prototype.listenClickOutside = function () {
        var _this = this;
        this._subscription.add(this._focusMonitor$.subscribe(function (origin) {
            if (origin === null) {
                _this.forceCloseDropdown();
            }
        }));
    };
    McNavbarItem.prototype.toggleDropdown = function () {
        this.isCollapsed = !this.isCollapsed;
    };
    McNavbarItem.prototype.forceCloseDropdown = function () {
        this.isCollapsed = true;
        this._cdRef.detectChanges();
    };
    McNavbarItem.prototype.startListenFocusDropdownItems = function () {
        var _this = this;
        this._dropdownElements.forEach(function (el) {
            _this._focusMonitor.monitor(el, true);
        });
    };
    McNavbarItem.prototype.stopListenFocusDropdownItems = function () {
        var _this = this;
        this._dropdownElements.forEach(function (el) {
            _this._focusMonitor.stopMonitoring(el);
        });
    };
    // This method is required due to angular 2 issue https://github.com/angular/angular/issues/11200
    McNavbarItem.prototype.denyClickIfDisabled = function () {
        var _this = this;
        var events = this.elementRef.nativeElement.eventListeners('click');
        events.forEach(function (event) { return _this.elementRef.nativeElement.removeEventListener('click', event); });
        this.elementRef.nativeElement.addEventListener('click', function (event) {
            if (_this.elementRef.nativeElement.hasAttribute('disabled')) {
                event.stopImmediatePropagation();
            }
        }, true);
        events.forEach(function (event) { return _this.elementRef.nativeElement.addEventListener('click', event); });
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
            template: "\n        <a\n            [attr.tabindex]=\"disabled ? -1 : tabIndex\"\n            (click)=\"handleClickByItem()\"\n            (keydown)=\"handleKeydown($event)\"\n            class=\"mc-navbar-item\"\n        >\n            <ng-content></ng-content>\n            <i *ngIf=\"hasDropdownContent\" mc-icon=\"mc-angle-down-M_16\"></i>\n        </a>\n        <ul\n            #dropdownContent\n            *ngIf=\"hasDropdownContent\"\n            [ngClass]=\"{ 'is-collapsed': isCollapsed }\"\n            class=\"mc-navbar-dropdown\"\n        >\n            <li\n                *ngFor=\"let item of dropdownItems\"\n                (click)=\"handleClickByDropdownItem()\"\n                class=\"mc-navbar-dropdown-item\"\n            >\n                <ng-container *ngIf=\"dropdownItemTmpl\">\n                    <ng-container *ngTemplateOutlet=\"dropdownItemTmpl; context: { $implicit: item }\"></ng-container>\n                </ng-container>\n                <a\n                    *ngIf=\"!dropdownItemTmpl\"\n                    [attr.href]=\"item.link\"\n                    [ngClass]=\"{ 'is-active': isActiveDropdownLink(item.link) }\"\n                    class=\"mc-navbar-dropdown-link\"\n                >{{ item.text }}</a>\n            </li>\n        </ul>\n    ",
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
    return McNavbarItem;
}(_McNavbarMixinBase));
var McNavbarContainer = /** @class */ (function () {
    function McNavbarContainer() {
        this.position = 'left';
    }
    Object.defineProperty(McNavbarContainer.prototype, "cssClasses", {
        get: function () {
            return this.position === 'left' ? 'mc-navbar-left' : 'mc-navbar-right';
        },
        enumerable: true,
        configurable: true
    });
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
    return McNavbarContainer;
}());
var CollapsibleItem = /** @class */ (function () {
    function CollapsibleItem(element, width) {
        this.element = element;
        this.width = width;
        this._collapsed = false;
    }
    CollapsibleItem.prototype.processCollapsed = function (collapsed) {
        this._collapsed = collapsed;
        this.updateCollapsedClass();
    };
    CollapsibleItem.prototype.updateCollapsedClass = function () {
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
        get: function () {
            return this.itemsForCollapse.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CachedItemWidth.prototype, "collapsedItemsWidth", {
        get: function () {
            if (this._collapsedItemsWidth !== undefined) {
                return this._collapsedItemsWidth;
            }
            this.calculateAndCacheCollapsedItemsWidth();
            return this._collapsedItemsWidth;
        },
        enumerable: true,
        configurable: true
    });
    CachedItemWidth.prototype.processCollapsed = function (collapsed) {
        if (this.itemsForCollapse.length > 0) {
            this.updateTitle(collapsed);
        }
        this.itemsForCollapse.forEach(function (item) { return item.processCollapsed(collapsed); });
    };
    CachedItemWidth.prototype.calculateAndCacheCollapsedItemsWidth = function () {
        this._collapsedItemsWidth = this.itemsForCollapse
            .reduce(function (acc, item) { return acc + item.width; }, 0);
    };
    CachedItemWidth.prototype.getTitle = function () {
        var computedTitle = this.element.getAttribute('computedTitle');
        return computedTitle
            ? decodeURI(computedTitle)
            : (this.itemsForCollapse.length > 0 ? this.itemsForCollapse[0].element.innerText : '');
    };
    CachedItemWidth.prototype.updateTitle = function (collapsed) {
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
        var resizeObserver = fromEvent(window, 'resize')
            .pipe(debounceTime(this.resizeDebounceInterval));
        this._resizeSubscription = resizeObserver.subscribe(this.updateCollapsed.bind(this));
    }
    Object.defineProperty(McNavbar.prototype, "maxAllowedWidth", {
        get: function () {
            return this._elementRef.nativeElement.querySelector('nav').getBoundingClientRect().width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McNavbar.prototype, "itemsWidths", {
        get: function () {
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
        get: function () {
            if (this._totalItemsWidths !== undefined && !this.forceRecalculateItemsWidth) {
                return this._totalItemsWidths;
            }
            this.calculateAndCacheTotalItemsWidth();
            return this._totalItemsWidths;
        },
        enumerable: true,
        configurable: true
    });
    McNavbar.prototype.updateCollapsed = function () {
        var collapseDelta = this.totalItemsWidth - this.maxAllowedWidth;
        for (var i = this.itemsWidths.length - 1; i >= 0; i--) {
            var item = this.itemsWidths[i];
            if (!item.canCollapse) {
                continue;
            }
            item.processCollapsed(collapseDelta > 0);
            collapseDelta -= item.collapsedItemsWidth;
        }
    };
    McNavbar.prototype.ngAfterViewInit = function () {
        var _this = this;
        // Note: this wait is required for loading and rendering fonts for icons;
        // unfortunately we cannot control font rendering
        setTimeout(function () { return _this.updateCollapsed(); }, 0);
    };
    McNavbar.prototype.ngOnDestroy = function () {
        this._resizeSubscription.unsubscribe();
    };
    McNavbar.prototype.calculateAndCacheTotalItemsWidth = function () {
        this._totalItemsWidths = this.itemsWidths
            .reduce(function (acc, item) { return acc + item.width; }, 0);
    };
    McNavbar.prototype.getOuterElementWidth = function (element) {
        var baseWidth = element.getBoundingClientRect().width;
        var marginRight = parseInt(getComputedStyle(element).getPropertyValue('margin-right'));
        var marginLeft = parseInt(getComputedStyle(element).getPropertyValue('margin-left'));
        return baseWidth + marginRight + marginLeft;
    };
    McNavbar.prototype.calculateAndCacheItemsWidth = function () {
        var _this = this;
        var allItemsSelector = this.secondLevelElements
            .map(function (e) { return _this.firstLevelElement + ">" + e; });
        var allItems = Array.from(this._elementRef.nativeElement.querySelectorAll(allItemsSelector));
        this._itemsWidths = allItems
            .map(function (el) { return new CachedItemWidth(el, _this.getOuterElementWidth(el), _this.getItemsForCollapse(el)); });
    };
    McNavbar.prototype.getItemsForCollapse = function (element) {
        var icon = element.querySelector("[" + MC_ICON + "]," + MC_NAVBAR_LOGO + ",[" + MC_NAVBAR_LOGO + "]");
        if (!icon) {
            return [];
        }
        return Array.from(element.querySelectorAll(MC_NAVBAR_TITLE))
            .map(function (el) { return new CollapsibleItem(el, el.getBoundingClientRect().width); });
    };
    McNavbar = __decorate([
        Component({
            selector: MC_NAVBAR,
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: "\n        <nav class=\"mc-navbar\">\n            <ng-content select=\"[" + MC_NAVBAR_CONTAINER + "]," + MC_NAVBAR_CONTAINER + "\"></ng-content>\n        </nav>\n    ",
            styles: [".mc-navbar-left,.mc-navbar-right,mc-navbar-container{height:100%;display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar{position:relative;height:48px;padding:0 0;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar [mc-icon]+mc-navbar-title{margin-left:8px}.mc-navbar mc-navbar-title:not(.mc-navbar-collapsed-title)+[mc-icon]{margin-left:8px}.mc-navbar-brand,.mc-navbar-item,.mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{height:100%;position:relative;display:flex;align-items:center;padding-left:16px;padding-right:16px;background-color:transparent;border:none}.mc-navbar-brand,mc-navbar-brand{padding-left:0;padding-right:12px;margin-right:24px}.mc-navbar-brand .mc-navbar-title,mc-navbar-brand .mc-navbar-title{padding-left:12px;padding-right:0}.mc-navbar-title{white-space:nowrap}.mc-navbar-item:not([disabled]){cursor:pointer}.mc-navbar-item .mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{padding:0}mc-navbar-item.mc-progress:not([disabled]){cursor:pointer}.mc-navbar-item[disabled],mc-navbar-item[disabled] .mc-navbar-item{cursor:default}mc-navbar-title.mc-navbar-collapsed-title{display:none}.mc-navbar-dropdown{position:absolute;top:100%;left:0;box-sizing:border-box;min-width:100%;height:auto;margin:0;list-style:none;padding-top:4px;padding-right:0;padding-bottom:4px;padding-left:0;border:1px solid;border-top:none;z-index:1}.mc-navbar-right .mc-navbar-dropdown{left:auto;right:0}.mc-navbar-dropdown-link{position:relative;display:block;box-sizing:border-box;padding-top:6px;padding-right:16px;padding-bottom:6px;padding-left:16px;border:2px solid transparent;text-decoration:none;white-space:nowrap}.mc-navbar-dropdown-link.is-active:hover::before{position:absolute;top:-2px;right:-2px;bottom:-2px;left:-2px;content:\"\"}.mc-navbar-dropdown.is-collapsed{display:none}"],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], McNavbar);
    return McNavbar;
}());

var McNavbarModule = /** @class */ (function () {
    function McNavbarModule() {
    }
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
    return McNavbarModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { McNavbarModule, McNavbarLogo, McNavbarBrand, McNavbarTitle, McNavbarItemBase, _McNavbarMixinBase, McNavbarItem, McNavbarContainer, McNavbar };
//# sourceMappingURL=navbar.es5.js.map
