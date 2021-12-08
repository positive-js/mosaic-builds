(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/cdk/platform'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/icon'), require('@ptsecurity/mosaic/tooltip'), require('@angular/cdk/coercion'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/mosaic/button'), require('@ptsecurity/mosaic/core'), require('rxjs'), require('rxjs/operators'), require('@ptsecurity/cdk/a11y'), require('@angular/animations'), require('@ptsecurity/mosaic/design-tokens'), require('@angular/cdk/overlay'), require('@angular/cdk/bidi'), require('@ptsecurity/mosaic/dropdown')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/navbar', ['exports', '@angular/cdk/a11y', '@angular/cdk/platform', '@angular/common', '@angular/core', '@ptsecurity/mosaic/icon', '@ptsecurity/mosaic/tooltip', '@angular/cdk/coercion', '@ptsecurity/cdk/keycodes', '@ptsecurity/mosaic/button', '@ptsecurity/mosaic/core', 'rxjs', 'rxjs/operators', '@ptsecurity/cdk/a11y', '@angular/animations', '@ptsecurity/mosaic/design-tokens', '@angular/cdk/overlay', '@angular/cdk/bidi', '@ptsecurity/mosaic/dropdown'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.navbar = {}), global.ng.cdk.a11y, global.ng.cdk.platform, global.ng.common, global.ng.core, global.ptsecurity.mosaic.icon, global.ptsecurity.mosaic.tooltip, global.ng.cdk.coercion, global.keycodes, global.ptsecurity.mosaic.button, global.ptsecurity.mosaic.core, global.rxjs, global.rxjs.operators, global.a11y, global.ng.animations, global.ptsecurity.mosaic["design-tokens"], global.ng.cdk.overlay, global.ng.cdk.bidi, global.ptsecurity.mosaic.dropdown));
})(this, (function (exports, i2, platform, i7, i0, i6, tooltip, coercion, keycodes, button, core, rxjs, operators, a11y, animations, designTokens, i3, i4, i5) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i7__namespace = /*#__PURE__*/_interopNamespace(i7);
    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i6__namespace = /*#__PURE__*/_interopNamespace(i6);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
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
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var McFocusableComponent = /** @class */ (function () {
        function McFocusableComponent(changeDetectorRef) {
            this.changeDetectorRef = changeDetectorRef;
            this._tabIndex = 0;
            this.destroyed = new rxjs.Subject();
        }
        Object.defineProperty(McFocusableComponent.prototype, "tabIndex", {
            get: function () {
                return this._tabIndex;
            },
            set: function (value) {
                this._tabIndex = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McFocusableComponent.prototype, "optionFocusChanges", {
            get: function () {
                return rxjs.merge.apply(void 0, __spreadArray([], __read(this.focusableItems.map(function (item) { return item.onFocus; }))));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McFocusableComponent.prototype, "optionBlurChanges", {
            get: function () {
                return rxjs.merge.apply(void 0, __spreadArray([], __read(this.focusableItems.map(function (option) { return option.onBlur; }))));
            },
            enumerable: false,
            configurable: true
        });
        McFocusableComponent.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.keyManager = new a11y.FocusKeyManager(this.focusableItems)
                .withTypeAhead();
            this.keyManager.setFocusOrigin('keyboard');
            this.keyManager.tabOut
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function () {
                _this.tabIndex = -1;
                setTimeout(function () {
                    _this.tabIndex = 0;
                    _this.changeDetectorRef.markForCheck();
                });
            });
            this.focusableItems.changes
                .pipe(operators.startWith(null), operators.takeUntil(this.destroyed))
                .subscribe(function () {
                _this.resetOptions();
                // Check to see if we need to update our tab index
                _this.updateTabIndex();
            });
        };
        McFocusableComponent.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        McFocusableComponent.prototype.focus = function () {
            if (this.focusableItems.length === 0) {
                return;
            }
            this.keyManager.setFirstItemActive();
        };
        McFocusableComponent.prototype.blur = function () {
            if (!this.hasFocusedItem()) {
                this.keyManager.setActiveItem(-1);
            }
            this.changeDetectorRef.markForCheck();
        };
        McFocusableComponent.prototype.resetOptions = function () {
            this.dropSubscriptions();
            this.listenToOptionsFocus();
        };
        McFocusableComponent.prototype.dropSubscriptions = function () {
            if (this.optionFocusSubscription) {
                this.optionFocusSubscription.unsubscribe();
                this.optionFocusSubscription = null;
            }
            if (this.optionBlurSubscription) {
                this.optionBlurSubscription.unsubscribe();
                this.optionBlurSubscription = null;
            }
        };
        McFocusableComponent.prototype.listenToOptionsFocus = function () {
            var _this = this;
            this.optionFocusSubscription = this.optionFocusChanges
                .subscribe(function (event) {
                var index = _this.focusableItems.toArray().indexOf(event.item);
                if (_this.isValidIndex(index)) {
                    _this.keyManager.updateActiveItem(index);
                }
            });
            this.optionBlurSubscription = this.optionBlurChanges
                .subscribe(function () { return _this.blur(); });
        };
        McFocusableComponent.prototype.updateTabIndex = function () {
            this.tabIndex = this.focusableItems.length === 0 ? -1 : 0;
        };
        McFocusableComponent.prototype.isValidIndex = function (index) {
            return index >= 0 && index < this.focusableItems.length;
        };
        McFocusableComponent.prototype.hasFocusedItem = function () {
            return this.focusableItems.some(function (item) { return item.hasFocus; });
        };
        return McFocusableComponent;
    }());
    /** @nocollapse */ McFocusableComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McFocusableComponent, deps: [{ token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McFocusableComponent.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McFocusableComponent, inputs: { tabIndex: "tabIndex" }, queries: [{ propertyName: "focusableItems", predicate: McNavbarFocusableItem, descendants: true }], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McFocusableComponent, decorators: [{
                type: i0.Directive
            }], ctorParameters: function () { return [{ type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { focusableItems: [{
                    type: i0.ContentChildren,
                    args: [i0.forwardRef(function () { return McNavbarFocusableItem; }), { descendants: true }]
                }], tabIndex: [{
                    type: i0.Input
                }] } });
    var McNavbarContainer = /** @class */ (function () {
        function McNavbarContainer() {
        }
        return McNavbarContainer;
    }());
    /** @nocollapse */ McNavbarContainer.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarContainer, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McNavbarContainer.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McNavbarContainer, selector: "mc-navbar-container", host: { classAttribute: "mc-navbar-container" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarContainer, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: 'mc-navbar-container',
                        host: {
                            class: 'mc-navbar-container'
                        }
                    }]
            }] });
    var McNavbar = /** @class */ (function (_super) {
        __extends(McNavbar, _super);
        function McNavbar(elementRef, changeDetectorRef) {
            var _this = _super.call(this, changeDetectorRef) || this;
            _this.elementRef = elementRef;
            _this.resizeStream = new rxjs.Subject();
            _this.resizeDebounceInterval = 100;
            _this.updateExpandedStateForItems = function () {
                var collapseDelta = _this.totalItemsWidth - _this.width;
                var needCollapse = collapseDelta > 0;
                if (needCollapse) {
                    _this.collapseItems(collapseDelta);
                }
                else {
                    _this.expandItems(collapseDelta);
                }
            };
            _this.setItemsState = function () {
                Promise.resolve()
                    .then(function () { var _a; return (_a = _this.rectangleElements) === null || _a === void 0 ? void 0 : _a.forEach(function (item) { return item.horizontal = true; }); });
            };
            _this.resizeSubscription = _this.resizeStream
                .pipe(operators.debounceTime(_this.resizeDebounceInterval))
                .subscribe(_this.updateExpandedStateForItems);
            return _this;
        }
        Object.defineProperty(McNavbar.prototype, "width", {
            get: function () {
                return this.elementRef.nativeElement.getBoundingClientRect().width;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McNavbar.prototype, "totalItemsWidth", {
            get: function () {
                return this.rectangleElements
                    .reduce(function (acc, item) { return acc + item.getOuterElementWidth(); }, 0);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McNavbar.prototype, "collapsableItems", {
            get: function () {
                return this.navbarItems
                    .toArray()
                    .filter(function (item) { return item.icon && item.title && item.collapsable; })
                    .reverse();
            },
            enumerable: false,
            configurable: true
        });
        McNavbar.prototype.ngAfterContentInit = function () {
            this.setItemsState();
            this.rectangleElements.changes
                .subscribe(this.setItemsState);
            _super.prototype.ngAfterContentInit.call(this);
            this.keyManager.withHorizontalOrientation('ltr');
        };
        McNavbar.prototype.ngAfterViewInit = function () {
            // Note: this wait is required for loading and rendering fonts for icons;
            // unfortunately we cannot control font rendering
            setTimeout(this.updateExpandedStateForItems);
        };
        McNavbar.prototype.ngOnDestroy = function () {
            this.resizeSubscription.unsubscribe();
            _super.prototype.ngOnDestroy.call(this);
        };
        McNavbar.prototype.onKeyDown = function (event) {
            // tslint:disable-next-line: deprecation
            var keyCode = event.keyCode;
            if ([keycodes.SPACE, keycodes.ENTER, keycodes.LEFT_ARROW, keycodes.RIGHT_ARROW].includes(keyCode) || keycodes.isVerticalMovement(event)) {
                event.preventDefault();
            }
            if (keyCode === keycodes.TAB) {
                this.keyManager.tabOut.next();
                return;
            }
            else if (keyCode === keycodes.RIGHT_ARROW) {
                this.keyManager.setNextItemActive();
            }
            else if (keyCode === keycodes.LEFT_ARROW) {
                this.keyManager.setPreviousItemActive();
            }
            else {
                this.keyManager.onKeydown(event);
            }
        };
        McNavbar.prototype.collapseItems = function (collapseDelta) {
            var e_1, _b;
            var delta = collapseDelta;
            var unCollapsedItems = this.collapsableItems
                .filter(function (item) { return !item.collapsed; });
            try {
                for (var unCollapsedItems_1 = __values(unCollapsedItems), unCollapsedItems_1_1 = unCollapsedItems_1.next(); !unCollapsedItems_1_1.done; unCollapsedItems_1_1 = unCollapsedItems_1.next()) {
                    var item = unCollapsedItems_1_1.value;
                    item.collapsed = true;
                    delta -= item.getTitleWidth();
                    if (delta < 0) {
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (unCollapsedItems_1_1 && !unCollapsedItems_1_1.done && (_b = unCollapsedItems_1.return)) _b.call(unCollapsedItems_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        McNavbar.prototype.expandItems = function (collapseDelta) {
            var delta = collapseDelta;
            this.collapsableItems
                .filter(function (item) { return item.collapsed; })
                .forEach(function (item) {
                if (delta + item.getTitleWidth() < 0) {
                    item.collapsed = false;
                    delta += item.getTitleWidth();
                }
            });
        };
        return McNavbar;
    }(McFocusableComponent));
    /** @nocollapse */ McNavbar.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbar, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McNavbar.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McNavbar, selector: "mc-navbar", host: { listeners: { "focus": "focus()", "blur": "blur()", "keydown": "onKeyDown($event)", "window:resize": "resizeStream.next($event)" }, properties: { "attr.tabindex": "tabIndex" }, classAttribute: "mc-navbar" }, queries: [{ propertyName: "rectangleElements", predicate: McNavbarRectangleElement, descendants: true }, { propertyName: "navbarItems", predicate: McNavbarItem, descendants: true }], usesInheritance: true, ngImport: i0__namespace, template: "<ng-content select=\"[mc-navbar-container], mc-navbar-container\"></ng-content>", isInline: true, styles: [".mc-navbar{display:flex;flex-direction:row;justify-content:space-between;align-items:center;position:relative}.mc-navbar-container{display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center;position:relative}\n", ".mc-navbar-title,.mc-navbar-subtitle{display:inline-block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mc-navbar-item{box-sizing:border-box;position:relative;display:flex;align-items:center;padding-left:16px;padding-left:var(--mc-navbar-item-size-padding, 16px);padding-right:16px;padding-right:var(--mc-navbar-item-size-padding, 16px)}.mc-navbar-item.mc-expanded.mc-navbar-bento{position:absolute;top:0;right:0;z-index:1}.mc-navbar-item .mc-badge{position:absolute}.mc-navbar-item__title{display:flex;flex-direction:column;align-self:center;min-width:0}.mc-navbar-item__container{display:flex;flex-direction:row;flex:1 1 auto;justify-content:space-between;min-width:0}.mc-navbar-item__container .mc-icon{align-self:center}.mc-navbar-item.mc-horizontal{height:48px;height:var(--mc-navbar-item-size-height, 48px)}.mc-navbar-item.mc-horizontal .mc-icon{min-width:16px;min-height:16px}.mc-navbar-item.mc-horizontal .mc-navbar-item__title+.mc-icon{margin-left:2px}.mc-navbar-item.mc-horizontal .mc-icon+.mc-navbar-item__container{margin-left:6px;margin-left:var(--mc-navbar-size-icon-margin, 6px)}.mc-navbar-item.mc-horizontal.mc-navbar-item_collapsed .mc-navbar-item__container{display:none}.mc-navbar-item.mc-horizontal .mc-badge{top:8px;right:8px}.mc-navbar-item.mc-vertical{height:56px;height:var(--mc-navbar-item-size-height_vertical, 56px)}.mc-navbar-item.mc-vertical>.mc-icon{display:flex;justify-content:center;align-items:center;min-width:24px;min-height:24px}.mc-navbar-item.mc-vertical .mc-navbar-item__title,.mc-navbar-item.mc-vertical .mc-icon+.mc-navbar-item__title,.mc-navbar-item.mc-vertical .mc-navbar-item__title+.mc-icon{padding-left:16px;padding-left:var(--mc-vertical-navbar-size-icon-margin, 16px)}.mc-navbar-item.mc-vertical.mc-navbar-item_button{padding-left:12px;padding-right:12px}.mc-navbar-item.mc-vertical.mc-expanded .mc-badge{top:16px;right:16px}.mc-navbar-item.mc-vertical.mc-collapsed .mc-badge{top:4px;right:4px}.mc-navbar-item.mc-vertical.mc-collapsed .mc-navbar-item__title{display:none}.mc-navbar-item.mc-navbar-item_button .mc-icon-button{flex:1}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper{justify-content:center}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_left{margin-left:unset}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_right{margin-right:unset}a.mc-navbar-item,a.mc-navbar-title{text-decoration:none}.mc-navbar-item .mc-navbar-item__overlay,.mc-navbar-brand .mc-navbar-item__overlay,.mc-navbar-toggle .mc-navbar-item__overlay{position:absolute;top:0;right:0;bottom:0;left:0}.mc-navbar-item [mc-button],.mc-navbar-brand [mc-button],.mc-navbar-toggle [mc-button]{z-index:1}\n", ".mc-navbar-logo{display:flex}.mc-navbar-brand{position:relative;display:flex;align-items:center}.mc-navbar-brand .mc-navbar-title{cursor:pointer}a.mc-navbar-brand{text-decoration:none}.mc-navbar-brand.mc-horizontal{height:48px;height:var(--mc-navbar-item-size-height, 48px);padding-right:24px;padding-right:var(--mc-navbar-brand-size-margin-right, 24px)}.mc-navbar-brand.mc-horizontal .mc-navbar-title{padding-left:12px;padding-left:var(--mc-navbar-brand-size-padding, 12px);padding-right:0}.mc-navbar-brand.mc-vertical .mc-navbar-logo{flex-direction:column;height:56px;height:var(--mc-navbar-item-size-height-vertical, 56px)}.mc-navbar-brand.mc-vertical .mc-navbar-title{display:flex;align-items:center;height:56px;height:var(--mc-navbar-item-size-height-vertical, 56px);padding-left:0}.mc-navbar-brand.mc-vertical.mc-expanded{align-items:unset}.mc-navbar-brand.mc-vertical.mc-expanded .mc-navbar-logo{padding-left:12px;justify-content:center}.mc-navbar-brand.mc-vertical.mc-expanded .mc-navbar-title{padding-left:16px}.mc-navbar-brand.mc-vertical.mc-collapsed{padding:0}.mc-navbar-brand.mc-vertical.mc-collapsed .mc-navbar-logo{align-items:center;justify-content:center;width:100%}.mc-navbar-brand.mc-vertical.mc-collapsed .mc-navbar-title{display:none}\n", ".mc-navbar-divider{display:block}.mc-navbar-divider.mc-vertical{height:1px;margin:8px 12px}.mc-navbar-divider.mc-horizontal{width:1px;height:28px;margin-left:8px;margin-right:8px}\n"], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbar, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-navbar',
                        template: "<ng-content select=\"[mc-navbar-container], mc-navbar-container\"></ng-content>",
                        styleUrls: [
                            './navbar.scss',
                            './navbar-item.scss',
                            './navbar-brand.scss',
                            './navbar-divider.scss'
                        ],
                        host: {
                            class: 'mc-navbar',
                            '[attr.tabindex]': 'tabIndex',
                            '(focus)': 'focus()',
                            '(blur)': 'blur()',
                            '(keydown)': 'onKeyDown($event)',
                            '(window:resize)': 'resizeStream.next($event)'
                        },
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { rectangleElements: [{
                    type: i0.ContentChildren,
                    args: [i0.forwardRef(function () { return McNavbarRectangleElement; }), { descendants: true }]
                }], navbarItems: [{
                    type: i0.ContentChildren,
                    args: [i0.forwardRef(function () { return McNavbarItem; }), { descendants: true }]
                }] } });

    function toggleVerticalNavbarAnimation() {
        return animations.trigger('toggle', [
            animations.state('0', animations.style({ width: "var(--mc-vertical-navbar-size-states-closed-width, " + designTokens.VerticalNavbarSizeStatesCollapsedWidth + ")" })),
            animations.state('1', animations.style({ width: "var(--mc-vertical-navbar-size-states-opened-width, " + designTokens.VerticalNavbarSizeStatesExpandedWidth + ")" })),
            animations.transition('0 <=> 1', animations.animate('200ms cubic-bezier(0, 1, 0.5, 1)'))
        ]);
    }

    var McVerticalNavbar = /** @class */ (function (_super) {
        __extends(McVerticalNavbar, _super);
        function McVerticalNavbar(changeDetectorRef) {
            var _this = _super.call(this, changeDetectorRef) || this;
            _this.animationDone = new rxjs.Subject();
            _this._expanded = false;
            _this.updateExpandedStateForItems = function () {
                var _a;
                (_a = _this.rectangleElements) === null || _a === void 0 ? void 0 : _a.forEach(function (item) {
                    item.collapsed = !_this.expanded;
                    setTimeout(function () { var _a; return (_a = item.button) === null || _a === void 0 ? void 0 : _a.updateClassModifierForIcons(); });
                });
            };
            _this.updateTooltipForItems = function () {
                _this.items.forEach(function (item) { return item.updateTooltip(); });
            };
            _this.setItemsState = function () {
                Promise.resolve()
                    .then(function () { var _a; return (_a = _this.rectangleElements) === null || _a === void 0 ? void 0 : _a.forEach(function (item) { return item.vertical = true; }); });
            };
            _this.animationDone
                .subscribe(_this.updateTooltipForItems);
            return _this;
        }
        Object.defineProperty(McVerticalNavbar.prototype, "expanded", {
            get: function () {
                return this._expanded;
            },
            set: function (value) {
                this._expanded = coercion.coerceBooleanProperty(value);
                this.updateExpandedStateForItems();
            },
            enumerable: false,
            configurable: true
        });
        McVerticalNavbar.prototype.ngAfterContentInit = function () {
            this.setItemsState();
            this.updateExpandedStateForItems();
            this.updateTooltipForItems();
            this.rectangleElements.changes
                .subscribe(this.setItemsState);
            _super.prototype.ngAfterContentInit.call(this);
            this.keyManager.withVerticalOrientation(true);
        };
        McVerticalNavbar.prototype.toggle = function () {
            this.expanded = !this.expanded;
            this.changeDetectorRef.markForCheck();
        };
        McVerticalNavbar.prototype.onKeyDown = function (event) {
            // tslint:disable-next-line: deprecation
            var keyCode = event.keyCode;
            if ([keycodes.SPACE, keycodes.ENTER, keycodes.LEFT_ARROW, keycodes.RIGHT_ARROW].includes(keyCode) || keycodes.isVerticalMovement(event)) {
                event.preventDefault();
            }
            if (keyCode === keycodes.TAB) {
                this.keyManager.tabOut.next();
                return;
            }
            else if (keyCode === keycodes.DOWN_ARROW) {
                this.keyManager.setNextItemActive();
            }
            else if (keyCode === keycodes.UP_ARROW) {
                this.keyManager.setPreviousItemActive();
            }
            else {
                this.keyManager.onKeydown(event);
            }
        };
        return McVerticalNavbar;
    }(McFocusableComponent));
    /** @nocollapse */ McVerticalNavbar.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McVerticalNavbar, deps: [{ token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McVerticalNavbar.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McVerticalNavbar, selector: "mc-vertical-navbar", inputs: { expanded: "expanded" }, host: { listeners: { "focus": "focus()", "blur": "blur()", "keydown": "onKeyDown($event)" }, properties: { "attr.tabindex": "tabIndex" }, classAttribute: "mc-vertical-navbar" }, queries: [{ propertyName: "bento", first: true, predicate: McNavbarBento, descendants: true }, { propertyName: "rectangleElements", predicate: McNavbarRectangleElement, descendants: true }, { propertyName: "items", predicate: McNavbarItem, descendants: true }], exportAs: ["McVerticalNavbar"], usesInheritance: true, ngImport: i0__namespace, template: "\n        <div class=\"mc-vertical-navbar__container\"\n             [@toggle]=\"expanded\"\n             (@toggle.done)=\"animationDone.next()\"\n             [class.mc-collapsed]=\"!expanded\"\n             [class.mc-expanded]=\"expanded\">\n\n            <ng-content select=\"[mc-navbar-container], mc-navbar-container\"></ng-content>\n            <ng-content select=\"[mc-navbar-toggle], mc-navbar-toggle\"></ng-content>\n        </div>\n    ", isInline: true, styles: [".mc-vertical-navbar{position:relative;width:56px;width:var(--mc-vertical-navbar-size-states-closed-width, 56px);height:100%}.mc-vertical-navbar .mc-navbar-container{flex-direction:column;align-items:unset}.mc-vertical-navbar .mc-vertical-navbar__container{display:flex;flex-direction:column;justify-content:space-between;height:100%}.mc-vertical-navbar .mc-vertical-navbar__container.mc-collapsed{width:56px;width:var(--mc-vertical-navbar-size-states-closed-width, 56px)}.mc-vertical-navbar .mc-vertical-navbar__container.mc-expanded{width:240px;width:var(--mc-vertical-navbar-size-states-opened-width, 240px)}\n", ".mc-navbar-title,.mc-navbar-subtitle{display:inline-block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mc-navbar-item{box-sizing:border-box;position:relative;display:flex;align-items:center;padding-left:16px;padding-left:var(--mc-navbar-item-size-padding, 16px);padding-right:16px;padding-right:var(--mc-navbar-item-size-padding, 16px)}.mc-navbar-item.mc-expanded.mc-navbar-bento{position:absolute;top:0;right:0;z-index:1}.mc-navbar-item .mc-badge{position:absolute}.mc-navbar-item__title{display:flex;flex-direction:column;align-self:center;min-width:0}.mc-navbar-item__container{display:flex;flex-direction:row;flex:1 1 auto;justify-content:space-between;min-width:0}.mc-navbar-item__container .mc-icon{align-self:center}.mc-navbar-item.mc-horizontal{height:48px;height:var(--mc-navbar-item-size-height, 48px)}.mc-navbar-item.mc-horizontal .mc-icon{min-width:16px;min-height:16px}.mc-navbar-item.mc-horizontal .mc-navbar-item__title+.mc-icon{margin-left:2px}.mc-navbar-item.mc-horizontal .mc-icon+.mc-navbar-item__container{margin-left:6px;margin-left:var(--mc-navbar-size-icon-margin, 6px)}.mc-navbar-item.mc-horizontal.mc-navbar-item_collapsed .mc-navbar-item__container{display:none}.mc-navbar-item.mc-horizontal .mc-badge{top:8px;right:8px}.mc-navbar-item.mc-vertical{height:56px;height:var(--mc-navbar-item-size-height_vertical, 56px)}.mc-navbar-item.mc-vertical>.mc-icon{display:flex;justify-content:center;align-items:center;min-width:24px;min-height:24px}.mc-navbar-item.mc-vertical .mc-navbar-item__title,.mc-navbar-item.mc-vertical .mc-icon+.mc-navbar-item__title,.mc-navbar-item.mc-vertical .mc-navbar-item__title+.mc-icon{padding-left:16px;padding-left:var(--mc-vertical-navbar-size-icon-margin, 16px)}.mc-navbar-item.mc-vertical.mc-navbar-item_button{padding-left:12px;padding-right:12px}.mc-navbar-item.mc-vertical.mc-expanded .mc-badge{top:16px;right:16px}.mc-navbar-item.mc-vertical.mc-collapsed .mc-badge{top:4px;right:4px}.mc-navbar-item.mc-vertical.mc-collapsed .mc-navbar-item__title{display:none}.mc-navbar-item.mc-navbar-item_button .mc-icon-button{flex:1}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper{justify-content:center}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_left{margin-left:unset}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_right{margin-right:unset}a.mc-navbar-item,a.mc-navbar-title{text-decoration:none}.mc-navbar-item .mc-navbar-item__overlay,.mc-navbar-brand .mc-navbar-item__overlay,.mc-navbar-toggle .mc-navbar-item__overlay{position:absolute;top:0;right:0;bottom:0;left:0}.mc-navbar-item [mc-button],.mc-navbar-brand [mc-button],.mc-navbar-toggle [mc-button]{z-index:1}\n", ".mc-navbar-logo{display:flex}.mc-navbar-brand{position:relative;display:flex;align-items:center}.mc-navbar-brand .mc-navbar-title{cursor:pointer}a.mc-navbar-brand{text-decoration:none}.mc-navbar-brand.mc-horizontal{height:48px;height:var(--mc-navbar-item-size-height, 48px);padding-right:24px;padding-right:var(--mc-navbar-brand-size-margin-right, 24px)}.mc-navbar-brand.mc-horizontal .mc-navbar-title{padding-left:12px;padding-left:var(--mc-navbar-brand-size-padding, 12px);padding-right:0}.mc-navbar-brand.mc-vertical .mc-navbar-logo{flex-direction:column;height:56px;height:var(--mc-navbar-item-size-height-vertical, 56px)}.mc-navbar-brand.mc-vertical .mc-navbar-title{display:flex;align-items:center;height:56px;height:var(--mc-navbar-item-size-height-vertical, 56px);padding-left:0}.mc-navbar-brand.mc-vertical.mc-expanded{align-items:unset}.mc-navbar-brand.mc-vertical.mc-expanded .mc-navbar-logo{padding-left:12px;justify-content:center}.mc-navbar-brand.mc-vertical.mc-expanded .mc-navbar-title{padding-left:16px}.mc-navbar-brand.mc-vertical.mc-collapsed{padding:0}.mc-navbar-brand.mc-vertical.mc-collapsed .mc-navbar-logo{align-items:center;justify-content:center;width:100%}.mc-navbar-brand.mc-vertical.mc-collapsed .mc-navbar-title{display:none}\n", ".mc-navbar-divider{display:block}.mc-navbar-divider.mc-vertical{height:1px;margin:8px 12px}.mc-navbar-divider.mc-horizontal{width:1px;height:28px;margin-left:8px;margin-right:8px}\n"], animations: [toggleVerticalNavbarAnimation()], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McVerticalNavbar, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-vertical-navbar',
                        exportAs: 'McVerticalNavbar',
                        template: "\n        <div class=\"mc-vertical-navbar__container\"\n             [@toggle]=\"expanded\"\n             (@toggle.done)=\"animationDone.next()\"\n             [class.mc-collapsed]=\"!expanded\"\n             [class.mc-expanded]=\"expanded\">\n\n            <ng-content select=\"[mc-navbar-container], mc-navbar-container\"></ng-content>\n            <ng-content select=\"[mc-navbar-toggle], mc-navbar-toggle\"></ng-content>\n        </div>\n    ",
                        styleUrls: [
                            './vertical-navbar.scss',
                            './navbar-item.scss',
                            './navbar-brand.scss',
                            './navbar-divider.scss'
                        ],
                        host: {
                            class: 'mc-vertical-navbar',
                            '[attr.tabindex]': 'tabIndex',
                            '(focus)': 'focus()',
                            '(blur)': 'blur()',
                            '(keydown)': 'onKeyDown($event)'
                        },
                        animations: [toggleVerticalNavbarAnimation()],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { rectangleElements: [{
                    type: i0.ContentChildren,
                    args: [i0.forwardRef(function () { return McNavbarRectangleElement; }), { descendants: true }]
                }], items: [{
                    type: i0.ContentChildren,
                    args: [i0.forwardRef(function () { return McNavbarItem; }), { descendants: true }]
                }], bento: [{
                    type: i0.ContentChild,
                    args: [i0.forwardRef(function () { return McNavbarBento; })]
                }], expanded: [{
                    type: i0.Input
                }] } });

    var McNavbarLogo = /** @class */ (function () {
        function McNavbarLogo() {
            this.hovered = new rxjs.Subject();
        }
        return McNavbarLogo;
    }());
    /** @nocollapse */ McNavbarLogo.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarLogo, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McNavbarLogo.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McNavbarLogo, selector: "mc-navbar-logo, [mc-navbar-logo]", host: { listeners: { "mouseenter": "hovered.next(true)", "mouseleave": "hovered.next(false)" }, classAttribute: "mc-navbar-logo" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarLogo, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: 'mc-navbar-logo, [mc-navbar-logo]',
                        host: {
                            class: 'mc-navbar-logo',
                            '(mouseenter)': 'hovered.next(true)',
                            '(mouseleave)': 'hovered.next(false)'
                        }
                    }]
            }] });
    var McNavbarBento = /** @class */ (function () {
        function McNavbarBento() {
        }
        return McNavbarBento;
    }());
    /** @nocollapse */ McNavbarBento.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarBento, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McNavbarBento.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McNavbarBento, selector: "mc-navbar-item[bento], [mc-navbar-item][bento]", host: { classAttribute: "mc-navbar-bento" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarBento, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: 'mc-navbar-item[bento], [mc-navbar-item][bento]',
                        host: {
                            class: 'mc-navbar-bento'
                        }
                    }]
            }] });
    var McNavbarTitle = /** @class */ (function () {
        function McNavbarTitle(elementRef) {
            this.elementRef = elementRef;
            this.hovered = new rxjs.Subject();
            this.isTextOverflown = false;
        }
        Object.defineProperty(McNavbarTitle.prototype, "text", {
            get: function () {
                return this.elementRef.nativeElement.innerText;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McNavbarTitle.prototype, "isOverflown", {
            get: function () {
                return this.elementRef.nativeElement.scrollWidth > this.elementRef.nativeElement.clientWidth;
            },
            enumerable: false,
            configurable: true
        });
        McNavbarTitle.prototype.getOuterElementWidth = function () {
            var _c = window.getComputedStyle(this.elementRef.nativeElement), width = _c.width, marginLeft = _c.marginLeft, marginRight = _c.marginRight;
            return [width, marginLeft, marginRight].reduce(function (acc, item) { return acc + parseInt(item) || 0; }, 0);
        };
        McNavbarTitle.prototype.checkTextOverflown = function () {
            // tslint:disable-next-line:no-magic-numbers
            this.isTextOverflown = this.text.length > 18;
        };
        McNavbarTitle.prototype.ngAfterViewInit = function () {
            this.outerElementWidth = this.getOuterElementWidth();
        };
        return McNavbarTitle;
    }());
    /** @nocollapse */ McNavbarTitle.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarTitle, deps: [{ token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McNavbarTitle.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McNavbarTitle, selector: "mc-navbar-title, [mc-navbar-title]", host: { listeners: { "mouseenter": "hovered.next(true)", "mouseleave": "hovered.next(false)" }, properties: { "class.mc-navbar-title_small": "isTextOverflown" }, classAttribute: "mc-navbar-title" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarTitle, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: 'mc-navbar-title, [mc-navbar-title]',
                        host: {
                            class: 'mc-navbar-title',
                            '[class.mc-navbar-title_small]': 'isTextOverflown',
                            '(mouseenter)': 'hovered.next(true)',
                            '(mouseleave)': 'hovered.next(false)'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }]; } });
    var McNavbarSubTitle = /** @class */ (function () {
        function McNavbarSubTitle(elementRef) {
            this.elementRef = elementRef;
            this.hovered = new rxjs.Subject();
        }
        Object.defineProperty(McNavbarSubTitle.prototype, "text", {
            get: function () {
                return this.elementRef.nativeElement.innerText;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McNavbarSubTitle.prototype, "isOverflown", {
            get: function () {
                return this.elementRef.nativeElement.scrollWidth > this.elementRef.nativeElement.clientWidth;
            },
            enumerable: false,
            configurable: true
        });
        McNavbarSubTitle.prototype.getOuterElementWidth = function () {
            var _c = window.getComputedStyle(this.elementRef.nativeElement), width = _c.width, marginLeft = _c.marginLeft, marginRight = _c.marginRight;
            return [width, marginLeft, marginRight].reduce(function (acc, item) { return acc + parseInt(item) || 0; }, 0);
        };
        McNavbarSubTitle.prototype.ngAfterContentInit = function () {
            this.outerElementWidth = this.getOuterElementWidth();
        };
        return McNavbarSubTitle;
    }());
    /** @nocollapse */ McNavbarSubTitle.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarSubTitle, deps: [{ token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McNavbarSubTitle.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McNavbarSubTitle, selector: "mc-navbar-subtitle, [mc-navbar-subtitle]", host: { listeners: { "mouseenter": "hovered.next(true)", "mouseleave": "hovered.next(false)" }, classAttribute: "mc-navbar-subtitle" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarSubTitle, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: 'mc-navbar-subtitle, [mc-navbar-subtitle]',
                        host: {
                            class: 'mc-navbar-subtitle',
                            '(mouseenter)': 'hovered.next(true)',
                            '(mouseleave)': 'hovered.next(false)'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }]; } });
    var McNavbarBrand = /** @class */ (function () {
        function McNavbarBrand(navbar) {
            this.navbar = navbar;
            this.hovered = false;
            this.destroyed = new rxjs.Subject();
        }
        Object.defineProperty(McNavbarBrand.prototype, "hasBento", {
            get: function () {
                var _a;
                return !!((_a = this.navbar) === null || _a === void 0 ? void 0 : _a.bento);
            },
            enumerable: false,
            configurable: true
        });
        McNavbarBrand.prototype.ngAfterContentInit = function () {
            var _this = this;
            var _a;
            rxjs.merge(this.logo.hovered, this.title.hovered)
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (value) { return _this.hovered = value; });
            (_a = this.navbar) === null || _a === void 0 ? void 0 : _a.animationDone.subscribe(function () { var _a; return (_a = _this.title) === null || _a === void 0 ? void 0 : _a.checkTextOverflown(); });
        };
        McNavbarBrand.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        return McNavbarBrand;
    }());
    /** @nocollapse */ McNavbarBrand.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarBrand, deps: [{ token: McVerticalNavbar, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McNavbarBrand.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McNavbarBrand, selector: "mc-navbar-brand, [mc-navbar-brand]", host: { properties: { "class.mc-hovered": "hovered", "class.layout-column": "hasBento", "class.layout-row": "!hasBento" }, classAttribute: "mc-navbar-brand" }, queries: [{ propertyName: "logo", first: true, predicate: McNavbarLogo, descendants: true }, { propertyName: "title", first: true, predicate: McNavbarTitle, descendants: true }], exportAs: ["mcNavbarBrand"], ngImport: i0__namespace, template: "\n        <ng-content></ng-content>\n        <div class=\"mc-navbar-item__overlay\"></div>\n    ", isInline: true });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarBrand, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-navbar-brand, [mc-navbar-brand]',
                        exportAs: 'mcNavbarBrand',
                        template: "\n        <ng-content></ng-content>\n        <div class=\"mc-navbar-item__overlay\"></div>\n    ",
                        host: {
                            class: 'mc-navbar-brand',
                            '[class.mc-hovered]': 'hovered',
                            '[class.layout-column]': 'hasBento',
                            '[class.layout-row]': '!hasBento'
                        }
                    }]
            }], ctorParameters: function () {
            return [{ type: McVerticalNavbar, decorators: [{
                            type: i0.Optional
                        }] }];
        }, propDecorators: { logo: [{
                    type: i0.ContentChild,
                    args: [McNavbarLogo]
                }], title: [{
                    type: i0.ContentChild,
                    args: [McNavbarTitle]
                }] } });
    var McNavbarDivider = /** @class */ (function () {
        function McNavbarDivider() {
        }
        return McNavbarDivider;
    }());
    /** @nocollapse */ McNavbarDivider.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarDivider, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McNavbarDivider.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McNavbarDivider, selector: "mc-navbar-divider", host: { classAttribute: "mc-navbar-divider" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarDivider, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: 'mc-navbar-divider',
                        host: {
                            class: 'mc-navbar-divider'
                        }
                    }]
            }] });
    var McNavbarFocusableItem = /** @class */ (function () {
        function McNavbarFocusableItem(elementRef, changeDetector, focusMonitor, ngZone) {
            this.elementRef = elementRef;
            this.changeDetector = changeDetector;
            this.focusMonitor = focusMonitor;
            this.ngZone = ngZone;
            this.onFocus = new rxjs.Subject();
            this.onBlur = new rxjs.Subject();
            this._hasFocus = false;
            this._disabled = false;
        }
        Object.defineProperty(McNavbarFocusableItem.prototype, "hasFocus", {
            get: function () {
                var _a;
                return !!((_a = this.button) === null || _a === void 0 ? void 0 : _a.hasFocus) || this._hasFocus;
            },
            set: function (value) {
                this._hasFocus = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McNavbarFocusableItem.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (value) {
                var newValue = core.toBoolean(value);
                if (newValue !== this._disabled) {
                    this._disabled = newValue;
                    this.changeDetector.markForCheck();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McNavbarFocusableItem.prototype, "tabIndex", {
            get: function () {
                return -1;
            },
            enumerable: false,
            configurable: true
        });
        McNavbarFocusableItem.prototype.ngAfterContentInit = function () {
            if (this.button) {
                this.button.tabIndex = -1;
            }
            this.focusMonitor.monitor(this.elementRef);
        };
        McNavbarFocusableItem.prototype.ngOnDestroy = function () {
            this.focusMonitor.stopMonitoring(this.elementRef);
        };
        McNavbarFocusableItem.prototype.onFocusHandler = function () {
            if (this.disabled || this.hasFocus) {
                return;
            }
            this.onFocus.next({ item: this });
            this.hasFocus = true;
            this.changeDetector.markForCheck();
            this.elementRef.nativeElement.focus();
        };
        McNavbarFocusableItem.prototype.focus = function (origin) {
            if (this.disabled || this.hasFocus) {
                return origin;
            }
            if (origin === 'keyboard') {
                this.focusMonitor.focusVia(this.elementRef, origin);
            }
            if (this.button) {
                this.button.focusViaKeyboard();
                this.changeDetector.markForCheck();
                return;
            }
            this.onFocusHandler();
        };
        McNavbarFocusableItem.prototype.blur = function () {
            var _this = this;
            // When animations are enabled, Angular may end up removing the option from the DOM a little
            // earlier than usual, causing it to be blurred and throwing off the logic in the list
            // that moves focus not the next item. To work around the issue, we defer marking the option
            // as not focused until the next time the zone stabilizes.
            this.ngZone.onStable
                .asObservable()
                .pipe(operators.take(1))
                .subscribe(function () {
                _this.ngZone.run(function () {
                    var _a;
                    _this._hasFocus = false;
                    if ((_a = _this.button) === null || _a === void 0 ? void 0 : _a.hasFocus) {
                        return;
                    }
                    _this.onBlur.next({ item: _this });
                });
            });
        };
        McNavbarFocusableItem.prototype.getLabel = function () {
            var _a;
            return ((_a = this.title) === null || _a === void 0 ? void 0 : _a.text) || '';
        };
        return McNavbarFocusableItem;
    }());
    /** @nocollapse */ McNavbarFocusableItem.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarFocusableItem, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.ChangeDetectorRef }, { token: i2__namespace.FocusMonitor }, { token: i0__namespace.NgZone }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McNavbarFocusableItem.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McNavbarFocusableItem, selector: "mc-navbar-item, [mc-navbar-item], mc-navbar-brand, [mc-navbar-brand], mc-navbar-toggle", inputs: { disabled: "disabled" }, host: { listeners: { "focus": "onFocusHandler()", "blur": "blur()" }, properties: { "attr.tabindex": "tabIndex", "attr.disabled": "disabled || null", "class.mc-navbar-item_button": "button" }, classAttribute: "mc-navbar-focusable-item" }, queries: [{ propertyName: "title", first: true, predicate: McNavbarTitle, descendants: true }, { propertyName: "button", first: true, predicate: button.McButton, descendants: true }], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarFocusableItem, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: 'mc-navbar-item, [mc-navbar-item], mc-navbar-brand, [mc-navbar-brand], mc-navbar-toggle',
                        host: {
                            '[attr.tabindex]': 'tabIndex',
                            '[attr.disabled]': 'disabled || null',
                            class: 'mc-navbar-focusable-item',
                            '[class.mc-navbar-item_button]': 'button',
                            '(focus)': 'onFocusHandler()',
                            '(blur)': 'blur()'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.ChangeDetectorRef }, { type: i2__namespace.FocusMonitor }, { type: i0__namespace.NgZone }]; }, propDecorators: { title: [{
                    type: i0.ContentChild,
                    args: [McNavbarTitle]
                }], button: [{
                    type: i0.ContentChild,
                    args: [button.McButton]
                }], disabled: [{
                    type: i0.Input
                }] } });
    var McNavbarItem = /** @class */ (function (_super) {
        __extends(McNavbarItem, _super);
        function McNavbarItem(rectangleElement, changeDetectorRef, overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction, dropdownTrigger, bento) {
            var _this = _super.call(this, overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) || this;
            _this.rectangleElement = rectangleElement;
            _this.changeDetectorRef = changeDetectorRef;
            _this.dropdownTrigger = dropdownTrigger;
            _this.bento = bento;
            _this._collapsed = false;
            _this._collapsable = true;
            if (_this.hasDropDownTrigger) {
                _this.dropdownTrigger.openByArrowDown = false;
            }
            _this.rectangleElement.state
                .subscribe(function () {
                _this.collapsed = _this.rectangleElement.collapsed;
                _this.changeDetectorRef.detectChanges();
            });
            return _this;
        }
        Object.defineProperty(McNavbarItem.prototype, "collapsed", {
            get: function () {
                return this._collapsed;
            },
            set: function (value) {
                if (this._collapsed !== value) {
                    this._collapsed = value;
                    this.updateTooltip();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McNavbarItem.prototype, "croppedText", {
            get: function () {
                var _a, _b;
                var croppedTitleText = ((_a = this.title) === null || _a === void 0 ? void 0 : _a.isOverflown) ? this.titleText : '';
                var croppedSubTitleText = ((_b = this.subTitle) === null || _b === void 0 ? void 0 : _b.isOverflown) ? this.subTitleText : '';
                return croppedTitleText + "\n " + croppedSubTitleText;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McNavbarItem.prototype, "collapsable", {
            get: function () {
                return this._collapsable;
            },
            set: function (value) {
                this._collapsable = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McNavbarItem.prototype, "titleText", {
            get: function () {
                var _a;
                return this.collapsedText || ((_a = this.title) === null || _a === void 0 ? void 0 : _a.text) || null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McNavbarItem.prototype, "subTitleText", {
            get: function () {
                var _a;
                return ((_a = this.subTitle) === null || _a === void 0 ? void 0 : _a.text) || null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McNavbarItem.prototype, "disabled", {
            get: function () {
                return (!this.collapsed && !this.hasCroppedText) || !this.title;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McNavbarItem.prototype, "hasDropDownTrigger", {
            get: function () {
                return !!this.dropdownTrigger;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McNavbarItem.prototype, "showVerticalDropDownAngle", {
            get: function () {
                return !this.bento && this.hasDropDownTrigger && this.rectangleElement.vertical && !this.collapsed;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McNavbarItem.prototype, "showHorizontalDropDownAngle", {
            get: function () {
                return this.hasDropDownTrigger && this.rectangleElement.horizontal && !this.collapsed;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McNavbarItem.prototype, "hasCroppedText", {
            get: function () {
                var _a, _b;
                return !!(((_a = this.title) === null || _a === void 0 ? void 0 : _a.isOverflown) || ((_b = this.subTitle) === null || _b === void 0 ? void 0 : _b.isOverflown));
            },
            enumerable: false,
            configurable: true
        });
        McNavbarItem.prototype.ngAfterContentInit = function () {
            this.updateTooltip();
        };
        McNavbarItem.prototype.updateTooltip = function () {
            if (this.collapsed) {
                this.content = this.titleText + "\n " + (this.subTitleText || '');
            }
            else if (!this.collapsed && this.hasCroppedText) {
                this.content = this.croppedText;
            }
            if (this.rectangleElement.vertical) {
                this.placement = core.PopUpPlacements.Right;
            }
            this.changeDetectorRef.markForCheck();
        };
        McNavbarItem.prototype.getTitleWidth = function () {
            return this.title.outerElementWidth;
        };
        McNavbarItem.prototype.onKeyDown = function ($event) {
            if (!this.hasDropDownTrigger) {
                return;
            }
            if ([keycodes.ENTER, keycodes.SPACE].includes($event.keyCode) ||
                (this.rectangleElement.horizontal && $event.keyCode === keycodes.DOWN_ARROW)) {
                this.dropdownTrigger.openedBy = 'keyboard';
                this.dropdownTrigger.open();
                $event.preventDefault();
            }
        };
        return McNavbarItem;
    }(tooltip.McTooltipTrigger));
    /** @nocollapse */ McNavbarItem.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarItem, deps: [{ token: McNavbarRectangleElement }, { token: i0__namespace.ChangeDetectorRef }, { token: i3__namespace.Overlay }, { token: i0__namespace.ElementRef }, { token: i0__namespace.NgZone }, { token: i3__namespace.ScrollDispatcher }, { token: i0__namespace.ViewContainerRef }, { token: tooltip.MC_TOOLTIP_SCROLL_STRATEGY }, { token: i4__namespace.Directionality, optional: true }, { token: i5__namespace.McDropdownTrigger, optional: true }, { token: McNavbarBento, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McNavbarItem.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McNavbarItem, selector: "mc-navbar-item, [mc-navbar-item]", inputs: { collapsedText: "collapsedText", collapsed: "collapsed", collapsable: "collapsable" }, host: { listeners: { "keydown": "onKeyDown($event)" }, properties: { "class.mc-navbar-item_collapsed": "collapsed" }, classAttribute: "mc-navbar-item" }, queries: [{ propertyName: "title", first: true, predicate: McNavbarTitle, descendants: true }, { propertyName: "subTitle", first: true, predicate: McNavbarSubTitle, descendants: true }, { propertyName: "icon", first: true, predicate: i6.McIcon, descendants: true }], exportAs: ["mcNavbarItem"], usesInheritance: true, ngImport: i0__namespace, template: "<ng-content select=\"[mc-icon]\"></ng-content>\n\n<div class=\"mc-navbar-item__container\" *ngIf=\"title\">\n    <div class=\"mc-navbar-item__title\">\n        <ng-content select=\"mc-navbar-title, [mc-navbar-title]\"></ng-content>\n        <ng-content select=\"mc-navbar-subtitle, [mc-navbar-subtitle]\"></ng-content>\n    </div>\n\n    <i class=\"mc-navbar-item__arrow-icon\" mc-icon=\"mc-angle-right-M_24\" *ngIf=\"showVerticalDropDownAngle\"></i>\n    <i class=\"mc-navbar-item__arrow-icon\" mc-icon=\"mc-angle-down-S_16\" *ngIf=\"showHorizontalDropDownAngle\"></i>\n\n</div>\n\n<ng-content></ng-content>\n\n<div class=\"mc-navbar-item__overlay\"></div>\n", components: [{ type: i6__namespace.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i7__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6__namespace.McIconCSSStyler, selector: "[mc-icon]" }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarItem, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-navbar-item, [mc-navbar-item]',
                        exportAs: 'mcNavbarItem',
                        templateUrl: './navbar-item.component.html',
                        host: {
                            class: 'mc-navbar-item',
                            '[class.mc-navbar-item_collapsed]': 'collapsed',
                            '(keydown)': 'onKeyDown($event)'
                        },
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None
                    }]
            }], ctorParameters: function () {
            return [{ type: McNavbarRectangleElement }, { type: i0__namespace.ChangeDetectorRef }, { type: i3__namespace.Overlay }, { type: i0__namespace.ElementRef }, { type: i0__namespace.NgZone }, { type: i3__namespace.ScrollDispatcher }, { type: i0__namespace.ViewContainerRef }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [tooltip.MC_TOOLTIP_SCROLL_STRATEGY]
                        }] }, { type: i4__namespace.Directionality, decorators: [{
                            type: i0.Optional
                        }] }, { type: i5__namespace.McDropdownTrigger, decorators: [{
                            type: i0.Optional
                        }] }, { type: McNavbarBento, decorators: [{
                            type: i0.Optional
                        }] }];
        }, propDecorators: { title: [{
                    type: i0.ContentChild,
                    args: [McNavbarTitle]
                }], subTitle: [{
                    type: i0.ContentChild,
                    args: [McNavbarSubTitle]
                }], icon: [{
                    type: i0.ContentChild,
                    args: [i6.McIcon]
                }], collapsedText: [{
                    type: i0.Input
                }], collapsed: [{
                    type: i0.Input
                }], collapsable: [{
                    type: i0.Input
                }] } });
    var McNavbarRectangleElement = /** @class */ (function () {
        function McNavbarRectangleElement(elementRef) {
            this.elementRef = elementRef;
            this.state = new rxjs.Subject();
        }
        Object.defineProperty(McNavbarRectangleElement.prototype, "horizontal", {
            get: function () {
                return this._horizontal;
            },
            set: function (value) {
                this._horizontal = value;
                this.state.next();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McNavbarRectangleElement.prototype, "vertical", {
            get: function () {
                return this._vertical;
            },
            set: function (value) {
                this._vertical = value;
                this.state.next();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McNavbarRectangleElement.prototype, "collapsed", {
            get: function () {
                return this._collapsed;
            },
            set: function (value) {
                this._collapsed = value;
                this.state.next();
            },
            enumerable: false,
            configurable: true
        });
        McNavbarRectangleElement.prototype.getOuterElementWidth = function () {
            var _c = window.getComputedStyle(this.elementRef.nativeElement), width = _c.width, marginLeft = _c.marginLeft, marginRight = _c.marginRight;
            return [width, marginLeft, marginRight].reduce(function (acc, item) { return acc + parseInt(item); }, 0);
        };
        return McNavbarRectangleElement;
    }());
    /** @nocollapse */ McNavbarRectangleElement.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarRectangleElement, deps: [{ token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McNavbarRectangleElement.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McNavbarRectangleElement, selector: "mc-navbar-item, [mc-navbar-item], mc-navbar-divider, mc-navbar-brand, [mc-navbar-brand]", host: { properties: { "class.mc-vertical": "vertical", "class.mc-horizontal": "horizontal", "class.mc-expanded": "vertical && !collapsed", "class.mc-collapsed": "vertical && collapsed" } }, queries: [{ propertyName: "button", first: true, predicate: button.McButtonCssStyler, descendants: true }], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarRectangleElement, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: 'mc-navbar-item, [mc-navbar-item], mc-navbar-divider, mc-navbar-brand, [mc-navbar-brand]',
                        host: {
                            '[class.mc-vertical]': 'vertical',
                            '[class.mc-horizontal]': 'horizontal',
                            '[class.mc-expanded]': 'vertical && !collapsed',
                            '[class.mc-collapsed]': 'vertical && collapsed'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }]; }, propDecorators: { button: [{
                    type: i0.ContentChild,
                    args: [button.McButtonCssStyler]
                }] } });
    var McNavbarToggle = /** @class */ (function (_super) {
        __extends(McNavbarToggle, _super);
        function McNavbarToggle(navbar, changeDetectorRef, overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction, document) {
            var _this = _super.call(this, overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) || this;
            _this.navbar = navbar;
            _this.changeDetectorRef = changeDetectorRef;
            _this.document = document;
            _this.modifier = tooltip.TooltipModifier.Default;
            _this.toggle = function () {
                _this.navbar.toggle();
                _this.changeDetectorRef.markForCheck();
                _this.hide();
            };
            _this.windowToggleHandler = function (event) {
                if (event.ctrlKey && [keycodes.NUMPAD_DIVIDE, keycodes.SLASH].includes(event.keyCode)) {
                    _this.ngZone.run(_this.toggle);
                }
            };
            _this.placement = core.PopUpPlacements.Right;
            var window = _this.getWindow();
            if (window) {
                _this.ngZone.runOutsideAngular(function () {
                    window.addEventListener('keydown', _this.windowToggleHandler);
                });
            }
            return _this;
        }
        Object.defineProperty(McNavbarToggle.prototype, "content", {
            get: function () {
                return this._content;
            },
            set: function (content) {
                this._content = content;
                this.updateData();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McNavbarToggle.prototype, "disabled", {
            get: function () {
                return this.navbar.expanded;
            },
            enumerable: false,
            configurable: true
        });
        McNavbarToggle.prototype.onKeydown = function ($event) {
            if ([keycodes.SPACE, keycodes.ENTER].includes($event.keyCode)) {
                this.toggle();
                $event.stopPropagation();
                $event.preventDefault();
            }
            _super.prototype.handleKeydown.call(this, $event);
        };
        McNavbarToggle.prototype.ngOnDestroy = function () {
            var window = this.getWindow();
            if (window) {
                window.removeEventListener('keydown', this.windowToggleHandler);
            }
        };
        McNavbarToggle.prototype.getWindow = function () {
            var _a;
            return ((_a = this.document) === null || _a === void 0 ? void 0 : _a.defaultView) || window;
        };
        return McNavbarToggle;
    }(tooltip.McTooltipTrigger));
    /** @nocollapse */ McNavbarToggle.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarToggle, deps: [{ token: McVerticalNavbar }, { token: i0__namespace.ChangeDetectorRef }, { token: i3__namespace.Overlay }, { token: i0__namespace.ElementRef }, { token: i0__namespace.NgZone }, { token: i3__namespace.ScrollDispatcher }, { token: i0__namespace.ViewContainerRef }, { token: tooltip.MC_TOOLTIP_SCROLL_STRATEGY }, { token: i4__namespace.Directionality, optional: true }, { token: i7.DOCUMENT, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McNavbarToggle.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McNavbarToggle, selector: "mc-navbar-toggle", inputs: { content: ["mcCollapsedTooltip", "content"] }, host: { listeners: { "keydown": "onKeydown($event)", "click": "toggle()", "touchend": "handleTouchend()" }, properties: { "class.mc-tooltip_open": "isOpen" }, classAttribute: "mc-navbar-item mc-navbar-toggle mc-vertical" }, queries: [{ propertyName: "customIcon", first: true, predicate: i6.McIcon, descendants: true }], usesInheritance: true, ngImport: i0__namespace, template: "\n        <i mc-icon\n           [class.mc-angle-left-M_24]=\"navbar.expanded\"\n           [class.mc-angle-right-M_24]=\"!navbar.expanded\"\n           *ngIf=\"!customIcon\">\n        </i>\n\n        <ng-content select=\"[mc-icon]\"></ng-content>\n\n        <div class=\"mc-navbar-item__title\" *ngIf=\"navbar.expanded\">\n            <ng-content select=\"mc-navbar-title\"></ng-content>\n        </div>\n\n        <div class=\"mc-navbar-item__overlay\"></div>\n    ", isInline: true, styles: [".mc-navbar{display:flex;flex-direction:row;justify-content:space-between;align-items:center;position:relative}.mc-navbar-container{display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center;position:relative}\n"], components: [{ type: i6__namespace.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i7__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6__namespace.McIconCSSStyler, selector: "[mc-icon]" }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarToggle, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-navbar-toggle',
                        template: "\n        <i mc-icon\n           [class.mc-angle-left-M_24]=\"navbar.expanded\"\n           [class.mc-angle-right-M_24]=\"!navbar.expanded\"\n           *ngIf=\"!customIcon\">\n        </i>\n\n        <ng-content select=\"[mc-icon]\"></ng-content>\n\n        <div class=\"mc-navbar-item__title\" *ngIf=\"navbar.expanded\">\n            <ng-content select=\"mc-navbar-title\"></ng-content>\n        </div>\n\n        <div class=\"mc-navbar-item__overlay\"></div>\n    ",
                        styleUrls: ['./navbar.scss'],
                        host: {
                            class: 'mc-navbar-item mc-navbar-toggle mc-vertical',
                            '[class.mc-tooltip_open]': 'isOpen',
                            '(keydown)': 'onKeydown($event)',
                            '(click)': 'toggle()',
                            '(touchend)': 'handleTouchend()'
                        },
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None
                    }]
            }], ctorParameters: function () {
            return [{ type: McVerticalNavbar }, { type: i0__namespace.ChangeDetectorRef }, { type: i3__namespace.Overlay }, { type: i0__namespace.ElementRef }, { type: i0__namespace.NgZone }, { type: i3__namespace.ScrollDispatcher }, { type: i0__namespace.ViewContainerRef }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [tooltip.MC_TOOLTIP_SCROLL_STRATEGY]
                        }] }, { type: i4__namespace.Directionality, decorators: [{
                            type: i0.Optional
                        }] }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [i7.DOCUMENT]
                        }] }];
        }, propDecorators: { customIcon: [{
                    type: i0.ContentChild,
                    args: [i6.McIcon]
                }], content: [{
                    type: i0.Input,
                    args: ['mcCollapsedTooltip']
                }] } });

    var McNavbarModule = /** @class */ (function () {
        function McNavbarModule() {
        }
        return McNavbarModule;
    }());
    /** @nocollapse */ McNavbarModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ McNavbarModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarModule, declarations: [McNavbar,
            McNavbarContainer,
            McNavbarTitle,
            McNavbarItem,
            McNavbarBrand,
            McNavbarLogo,
            McNavbarToggle,
            McVerticalNavbar,
            McNavbarDivider,
            McNavbarFocusableItem,
            McNavbarRectangleElement,
            McNavbarSubTitle,
            McNavbarBento], imports: [i7.CommonModule,
            i2.A11yModule,
            platform.PlatformModule,
            i6.McIconModule,
            tooltip.McToolTipModule], exports: [McNavbar,
            McNavbarContainer,
            McNavbarTitle,
            McNavbarItem,
            McNavbarBrand,
            McNavbarLogo,
            McNavbarToggle,
            McVerticalNavbar,
            McNavbarDivider,
            McNavbarFocusableItem,
            McNavbarRectangleElement,
            McNavbarSubTitle,
            McNavbarBento] });
    /** @nocollapse */ McNavbarModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarModule, imports: [[
                i7.CommonModule,
                i2.A11yModule,
                platform.PlatformModule,
                i6.McIconModule,
                tooltip.McToolTipModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McNavbarModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i7.CommonModule,
                            i2.A11yModule,
                            platform.PlatformModule,
                            i6.McIconModule,
                            tooltip.McToolTipModule
                        ],
                        exports: [
                            McNavbar,
                            McNavbarContainer,
                            McNavbarTitle,
                            McNavbarItem,
                            McNavbarBrand,
                            McNavbarLogo,
                            McNavbarToggle,
                            McVerticalNavbar,
                            McNavbarDivider,
                            McNavbarFocusableItem,
                            McNavbarRectangleElement,
                            McNavbarSubTitle,
                            McNavbarBento
                        ],
                        declarations: [
                            McNavbar,
                            McNavbarContainer,
                            McNavbarTitle,
                            McNavbarItem,
                            McNavbarBrand,
                            McNavbarLogo,
                            McNavbarToggle,
                            McVerticalNavbar,
                            McNavbarDivider,
                            McNavbarFocusableItem,
                            McNavbarRectangleElement,
                            McNavbarSubTitle,
                            McNavbarBento
                        ]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.McFocusableComponent = McFocusableComponent;
    exports.McNavbar = McNavbar;
    exports.McNavbarBento = McNavbarBento;
    exports.McNavbarBrand = McNavbarBrand;
    exports.McNavbarContainer = McNavbarContainer;
    exports.McNavbarDivider = McNavbarDivider;
    exports.McNavbarFocusableItem = McNavbarFocusableItem;
    exports.McNavbarItem = McNavbarItem;
    exports.McNavbarLogo = McNavbarLogo;
    exports.McNavbarModule = McNavbarModule;
    exports.McNavbarRectangleElement = McNavbarRectangleElement;
    exports.McNavbarSubTitle = McNavbarSubTitle;
    exports.McNavbarTitle = McNavbarTitle;
    exports.McNavbarToggle = McNavbarToggle;
    exports.McVerticalNavbar = McVerticalNavbar;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ptsecurity-mosaic-navbar.umd.js.map
