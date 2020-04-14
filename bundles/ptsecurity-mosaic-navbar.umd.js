(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/cdk/platform'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/navbar', ['exports', '@angular/cdk/a11y', '@angular/cdk/platform', '@angular/common', '@angular/core', '@ptsecurity/mosaic/core', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.navbar = {}), global.ng.cdk.a11y, global.ng.cdk.platform, global.ng.common, global.ng.core, global.ptsecurity.mosaic.core, global.rxjs, global.rxjs.operators));
}(this, (function (exports, a11y, platform, common, core, core$1, rxjs, operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

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
            { type: core.Directive, args: [{
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
            { type: core.Directive, args: [{
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
            { type: core.Directive, args: [{
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
    var McNavbarMixinBase = core$1.mixinTabIndex(core$1.mixinDisabled(McNavbarItemBase));
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
            { type: core.Component, args: [{
                        selector: 'mc-navbar-item',
                        template: "<ng-content></ng-content>",
                        encapsulation: core.ViewEncapsulation.None,
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
            { type: core.ElementRef },
            { type: a11y.FocusMonitor }
        ]; };
        McNavbarItem.propDecorators = {
            collapsedTitle: [{ type: core.Input }]
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
            { type: core.Directive, args: [{
                        selector: 'mc-navbar-container',
                        host: {
                            '[class.mc-navbar-left]': 'this.position === "left"',
                            '[class.mc-navbar-right]': 'this.position !== "left"'
                        }
                    },] }
        ];
        McNavbarContainer.propDecorators = {
            position: [{ type: core.Input }]
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
            var resizeObserver = rxjs.fromEvent(window, 'resize')
                .pipe(operators.debounceTime(this.resizeDebounceInterval));
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
            { type: core.Component, args: [{
                        selector: 'mc-navbar',
                        template: "\n        <nav class=\"mc-navbar\">\n            <ng-content select=\"[mc-navbar-container], mc-navbar-container\"></ng-content>\n        </nav>\n    ",
                        encapsulation: core.ViewEncapsulation.None,
                        styles: [".mc-navbar-left,.mc-navbar-right,mc-navbar-container{height:100%;display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar{position:relative;height:48px;padding:0;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar [mc-icon]+mc-navbar-title{margin-left:8px}.mc-navbar [mc-icon]{min-width:16px;min-height:16px}.mc-navbar mc-navbar-title:not(.mc-navbar-collapsed-title)+[mc-icon]{margin-left:8px}.mc-navbar-brand,.mc-navbar-item,.mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{height:100%;position:relative;display:flex;align-items:center;padding-left:16px;padding-right:16px}.mc-navbar-brand,mc-navbar-brand{padding-left:0;padding-right:12px;margin-right:24px}.mc-navbar-brand .mc-navbar-title,mc-navbar-brand .mc-navbar-title{padding-left:12px;padding-right:0}.mc-navbar-title{white-space:nowrap}.mc-navbar-item:not([disabled]){cursor:pointer}.mc-navbar-item .mc-navbar-title,mc-navbar-brand{padding:0}mc-navbar-item.mc-progress:not([disabled]){cursor:pointer}.mc-navbar-item[disabled],mc-navbar-item[disabled] .mc-navbar-item{cursor:default}mc-navbar-title.mc-navbar-collapsed-title{display:none}"]
                    }] }
        ];
        /** @nocollapse */
        McNavbar.ctorParameters = function () { return [
            { type: core.ElementRef }
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            a11y.A11yModule,
                            platform.PlatformModule
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

    exports.McNavbar = McNavbar;
    exports.McNavbarBrand = McNavbarBrand;
    exports.McNavbarContainer = McNavbarContainer;
    exports.McNavbarItem = McNavbarItem;
    exports.McNavbarItemBase = McNavbarItemBase;
    exports.McNavbarLogo = McNavbarLogo;
    exports.McNavbarMixinBase = McNavbarMixinBase;
    exports.McNavbarModule = McNavbarModule;
    exports.McNavbarTitle = McNavbarTitle;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-navbar.umd.js.map
