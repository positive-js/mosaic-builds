/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __extends } from 'tslib';
import { Component, Directive, ElementRef, HostBinding, Input, ViewEncapsulation, NgModule } from '@angular/core';
import { FocusMonitor, A11yModule } from '@ptsecurity/cdk/a11y';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';
import { PlatformModule } from '@ptsecurity/cdk/platform';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
            this.elementRef.nativeElement.setAttribute('calculatedTitle', encodeURI(value));
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
        this._denyClickIfDisabled();
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
    McNavbarItem.prototype._denyClickIfDisabled = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ events = this.elementRef.nativeElement.eventListeners('click');
        for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
            var event_1 = events_1[_i];
            this.elementRef.nativeElement.removeEventListener('click', event_1);
        }
        this.elementRef.nativeElement.addEventListener('click', function (event) {
            if (_this.elementRef.nativeElement.hasAttribute('disabled')) {
                event.stopImmediatePropagation();
            }
        }, true);
        for (var _a = 0, events_2 = events; _a < events_2.length; _a++) {
            var event_2 = events_2[_a];
            this.elementRef.nativeElement.addEventListener('click', event_2);
        }
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
    Object.defineProperty(McNavbarContainer.prototype, "getCssClasses", {
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
        "getCssClasses": [{ type: HostBinding, args: ['class',] },],
    };
    return McNavbarContainer;
}());
var McNavbar = /** @class */ (function () {
    function McNavbar(_elementRef) {
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
    McNavbar.prototype.collapse = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ maxWidth = this._elementRef.nativeElement.querySelector('nav').getBoundingClientRect().width;
        this._uncollapseAll();
        var /** @type {?} */ allItemsSelector = this.secondLevelElements.map(function (e) { return _this.firstLevelElement + ">" + e; });
        var /** @type {?} */ allItems = Array.from(this._elementRef.nativeElement.querySelectorAll(allItemsSelector));
        var /** @type {?} */ itemsWidth = allItems.reduce(function (acc, el) { return acc + el.getBoundingClientRect().width; }, 0);
        if (itemsWidth <= maxWidth) {
            return;
        }
        var /** @type {?} */ collapseDelta = itemsWidth - maxWidth;
        var /** @type {?} */ firstLevelItems = this._elementRef.nativeElement.querySelectorAll(MC_NAVBAR_ITEM + "," + MC_NAVBAR_BRAND);
        for (var /** @type {?} */ i = firstLevelItems.length - 1; i >= 0; i--) {
            var /** @type {?} */ item = firstLevelItems[i];
            var /** @type {?} */ icon = item.querySelector("[" + MC_ICON + "]," + MC_NAVBAR_LOGO + ",[" + MC_NAVBAR_LOGO + "]");
            if (!icon) {
                continue;
            }
            var /** @type {?} */ restElements = Array.from(item.querySelectorAll(MC_NAVBAR_TITLE));
            var /** @type {?} */ calculatedTitle = item.getAttribute('calculatedTitle');
            var /** @type {?} */ title = calculatedTitle
                ? decodeURI(calculatedTitle)
                : (restElements.length > 0 ? restElements[0].innerText : '');
            item.setAttribute('title', title);
            for (var _i = 0, restElements_1 = restElements; _i < restElements_1.length; _i++) {
                var element = restElements_1[_i];
                collapseDelta -= element.getBoundingClientRect().width;
                element.classList.add(this.collapsedClass);
            }
            if (collapseDelta < 0) {
                return;
            }
        }
    };
    /**
     * @return {?}
     */
    McNavbar.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.collapse();
    };
    /**
     * @return {?}
     */
    McNavbar.prototype._uncollapseAll = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ titles = Array.from(this._elementRef.nativeElement.querySelectorAll(MC_NAVBAR_TITLE + "." + this.collapsedClass));
        for (var _i = 0, titles_1 = titles; _i < titles_1.length; _i++) {
            var title = titles_1[_i];
            title.classList.remove(this.collapsedClass);
        }
    };
    McNavbar.decorators = [
        { type: Component, args: [{
                    selector: MC_NAVBAR,
                    template: "\n        <nav class=\"mc-navbar\">\n            <ng-content select=\"[" + MC_NAVBAR_CONTAINER + "]," + MC_NAVBAR_CONTAINER + "\"></ng-content>\n        </nav>\n    ",
                    styles: [".mc-navbar-left,.mc-navbar-right,mc-navbar-container{height:100%;display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar{min-width:1280px;position:relative;height:48px;padding:0 0;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar [mc-icon]+mc-navbar-title{margin-left:8px}.mc-navbar mc-navbar-title:not(.mc-navbar-collapsed-title)+[mc-icon]{margin-left:8px}.mc-navbar-brand,.mc-navbar-item,.mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{height:100%;position:relative;display:flex;align-items:center;padding-left:16px;padding-right:16px}.mc-navbar-brand,mc-navbar-brand{padding-left:12px;padding-right:12px}.mc-navbar-title{white-space:nowrap}@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.mc-navbar-item:not([disabled]){cursor:pointer}.mc-navbar-item .mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{padding:0}mc-navbar-item.mc-progress:not([disabled]){cursor:pointer}.mc-navbar-item[disabled],mc-navbar-item[disabled] .mc-navbar-item{cursor:default}mc-navbar-title.mc-navbar-collapsed-title{display:none}"],
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '(window:resize)': 'collapse()'
                    }
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
