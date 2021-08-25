(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/cdk/platform'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/icon'), require('@angular/cdk/coercion'), require('@ptsecurity/mosaic/button'), require('@ptsecurity/mosaic/core'), require('rxjs'), require('rxjs/operators'), require('@angular/animations')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/navbar', ['exports', '@angular/cdk/a11y', '@angular/cdk/platform', '@angular/common', '@angular/core', '@ptsecurity/mosaic/icon', '@angular/cdk/coercion', '@ptsecurity/mosaic/button', '@ptsecurity/mosaic/core', 'rxjs', 'rxjs/operators', '@angular/animations'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.navbar = {}), global.ng.cdk.a11y, global.ng.cdk.platform, global.ng.common, global.ng.core, global.ptsecurity.mosaic.icon, global.ng.cdk.coercion, global.ptsecurity.mosaic.button, global.ptsecurity.mosaic.core, global.rxjs, global.rxjs.operators, global.ng.animations));
}(this, (function (exports, a11y, platform, common, core, icon, coercion, button, core$1, rxjs, operators, animations) { 'use strict';

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

    var McNavbarLogo = /** @class */ (function () {
        function McNavbarLogo() {
            this.hovered = new rxjs.Subject();
        }
        return McNavbarLogo;
    }());
    McNavbarLogo.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mc-navbar-logo, [mc-navbar-logo]',
                    host: {
                        class: 'mc-navbar-logo',
                        '(mouseenter)': 'hovered.next(true)',
                        '(mouseleave)': 'hovered.next(false)'
                    }
                },] }
    ];
    var McNavbarTitle = /** @class */ (function () {
        function McNavbarTitle(elementRef) {
            this.elementRef = elementRef;
            this.hovered = new rxjs.Subject();
        }
        Object.defineProperty(McNavbarTitle.prototype, "text", {
            get: function () {
                return this.elementRef.nativeElement.innerText;
            },
            enumerable: false,
            configurable: true
        });
        McNavbarTitle.prototype.getOuterElementWidth = function () {
            var _a = window.getComputedStyle(this.elementRef.nativeElement), width = _a.width, marginLeft = _a.marginLeft, marginRight = _a.marginRight;
            return [width, marginLeft, marginRight].reduce(function (acc, item) { return acc + parseInt(item) || 0; }, 0);
        };
        McNavbarTitle.prototype.ngAfterContentInit = function () {
            this.outerElementWidth = this.getOuterElementWidth();
        };
        return McNavbarTitle;
    }());
    McNavbarTitle.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mc-navbar-title, [mc-navbar-title]',
                    host: {
                        class: 'mc-navbar-title',
                        '(mouseenter)': 'hovered.next(true)',
                        '(mouseleave)': 'hovered.next(false)'
                    }
                },] }
    ];
    /** @nocollapse */
    McNavbarTitle.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    var McNavbarBrand = /** @class */ (function () {
        function McNavbarBrand() {
            this.hovered = false;
            this.destroyed = new rxjs.Subject();
        }
        McNavbarBrand.prototype.ngAfterContentInit = function () {
            var _this = this;
            rxjs.merge(this.logo.hovered, this.title.hovered)
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (value) { return _this.hovered = value; });
        };
        McNavbarBrand.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        return McNavbarBrand;
    }());
    McNavbarBrand.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mc-navbar-brand, [mc-navbar-brand]',
                    host: {
                        class: 'mc-navbar-brand',
                        '[class.mc-hovered]': 'hovered'
                    }
                },] }
    ];
    McNavbarBrand.propDecorators = {
        logo: [{ type: core.ContentChild, args: [McNavbarLogo,] }],
        title: [{ type: core.ContentChild, args: [McNavbarTitle,] }]
    };
    var McNavbarDivider = /** @class */ (function () {
        function McNavbarDivider() {
        }
        return McNavbarDivider;
    }());
    McNavbarDivider.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mc-navbar-divider',
                    host: {
                        class: 'mc-navbar-divider'
                    }
                },] }
    ];
    var McNavbarItemBase = /** @class */ (function () {
        function McNavbarItemBase(elementRef) {
            this.elementRef = elementRef;
        }
        McNavbarItemBase.prototype.getOuterElementWidth = function () {
            var _a = window.getComputedStyle(this.elementRef.nativeElement), width = _a.width, marginLeft = _a.marginLeft, marginRight = _a.marginRight;
            return [width, marginLeft, marginRight].reduce(function (acc, item) { return acc + parseInt(item); }, 0);
        };
        return McNavbarItemBase;
    }());
    McNavbarItemBase.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mc-navbar-item, [mc-navbar-item], mc-navbar-divider, mc-navbar-brand, [mc-navbar-brand]',
                    host: {
                        '[class.mc-vertical]': 'vertical',
                        '[class.mc-horizontal]': 'horizontal',
                        '[class.mc-opened]': 'vertical && !closed',
                        '[class.mc-closed]': 'vertical && closed'
                    }
                },] }
    ];
    /** @nocollapse */
    McNavbarItemBase.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    McNavbarItemBase.propDecorators = {
        button: [{ type: core.ContentChild, args: [button.McButtonCssStyler,] }]
    };
    // tslint:disable-next-line:naming-convention
    var McNavbarMixinBase = core$1.mixinDisabled(McNavbarItemBase);
    var McNavbarItem = /** @class */ (function (_super) {
        __extends(McNavbarItem, _super);
        function McNavbarItem(focusMonitor, elementRef) {
            var _this = _super.call(this, elementRef) || this;
            _this.focusMonitor = focusMonitor;
            _this.elementRef = elementRef;
            _this._collapsable = true;
            _this.collapsed = false;
            _this._collapsedTitle = null;
            _this._tabIndex = 0;
            return _this;
        }
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
        Object.defineProperty(McNavbarItem.prototype, "collapsedTitle", {
            get: function () {
                return this.collapsed ? (this._collapsedTitle || this.title.text) : null;
            },
            set: function (value) {
                this._collapsedTitle = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McNavbarItem.prototype, "tabIndex", {
            get: function () {
                return this.disabled || this.button ? -1 : this._tabIndex;
            },
            set: function (value) {
                this._tabIndex = value != null ? coercion.coerceNumberProperty(value) : 0;
            },
            enumerable: false,
            configurable: true
        });
        McNavbarItem.prototype.ngOnDestroy = function () {
            this.focusMonitor.stopMonitoring(this.elementRef);
        };
        McNavbarItem.prototype.ngAfterContentInit = function () {
            if (this.button) {
                return;
            }
            this.focusMonitor.monitor(this.elementRef, true);
        };
        McNavbarItem.prototype.getTitleWidth = function () {
            return this.title.outerElementWidth;
        };
        return McNavbarItem;
    }(McNavbarMixinBase));
    McNavbarItem.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-navbar-item, [mc-navbar-item]',
                    exportAs: 'mcNavbarItem',
                    template: "<ng-content></ng-content>",
                    host: {
                        class: 'mc-navbar-item',
                        '[class.mc-navbar-item_collapsed]': 'collapsed',
                        '[class.mc-navbar-item_button]': 'button',
                        '[attr.title]': 'collapsedTitle',
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.disabled]': 'disabled || null'
                    },
                    inputs: ['disabled'],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".mc-navbar-title{display:inline-block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mc-navbar-item{position:relative;display:flex;align-items:center;height:var(--mc-navbar-item-size-height,48px);padding-left:var(--mc-navbar-item-size-padding,16px);padding-right:var(--mc-navbar-item-size-padding,16px)}.mc-navbar-item .mc-icon{min-width:16px;min-height:16px}.mc-navbar-item.mc-vertical .mc-navbar-title{padding-left:26px}.mc-navbar-item.mc-vertical .mc-icon+.mc-navbar-title,.mc-navbar-item.mc-vertical .mc-navbar-title+.mc-icon{padding-left:var(--mc-vertical-navbar-size-icon-margin,10px)}.mc-navbar-item.mc-vertical .mc-badge{position:absolute;display:flex;align-items:center;justify-content:center}.mc-navbar-item.mc-vertical.mc-opened .mc-badge{right:16px;height:24px;padding-right:7px;padding-left:7px}.mc-navbar-item.mc-vertical.mc-closed .mc-badge{top:8px;right:8px;height:16px;padding-right:4px;padding-left:4px}.mc-navbar-item.mc-vertical.mc-closed .mc-navbar-title{display:none}.mc-navbar-item.mc-vertical.mc-closed.mc-navbar-item_button{padding-left:8px;padding-right:8px}.mc-navbar-item.mc-horizontal .mc-icon+.mc-navbar-title,.mc-navbar-item.mc-horizontal .mc-navbar-title+.mc-icon{padding-left:var(--mc-navbar-size-icon-margin,4px)}.mc-navbar-item.mc-horizontal.mc-navbar-item_collapsed .mc-navbar-title{display:none}.mc-navbar-item.mc-navbar-item_button .mc-icon-button{flex:1}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper{justify-content:center}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_left{margin-left:unset}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_right{margin-right:unset}a.mc-navbar-item,a.mc-navbar-title{text-decoration:none}", ".mc-navbar-logo{display:flex}.mc-navbar-brand{position:relative;display:flex;align-items:center}.mc-navbar-brand .mc-navbar-title{cursor:pointer}a.mc-navbar-brand{text-decoration:none}.mc-navbar-brand.mc-horizontal{height:var(--mc-navbar-item-size-height,48px);padding-right:var(--mc-navbar-brand-size-margin-right,24px)}.mc-navbar-brand.mc-horizontal .mc-navbar-title{padding-left:var(--mc-navbar-brand-size-padding,12px);padding-right:0}.mc-navbar-brand.mc-vertical{flex-direction:column}.mc-navbar-brand.mc-vertical .mc-navbar-logo{flex-direction:column;height:var(--mc-navbar-item-size-height,48px)}.mc-navbar-brand.mc-vertical .mc-navbar-title{display:flex;align-items:center;height:var(--mc-navbar-item-size-height,48px);padding-left:0}.mc-navbar-brand.mc-vertical.mc-opened{align-items:unset}.mc-navbar-brand.mc-vertical.mc-opened .mc-navbar-item{position:absolute;top:0;right:0}.mc-navbar-brand.mc-vertical.mc-opened .mc-navbar-logo{padding-left:16px;justify-content:flex-end}.mc-navbar-brand.mc-vertical.mc-opened .mc-navbar-title{padding-left:16px}.mc-navbar-brand.mc-vertical.mc-closed{padding:0}.mc-navbar-brand.mc-vertical.mc-closed .mc-navbar-logo{align-items:center;justify-content:center;width:48px}.mc-navbar-brand.mc-vertical.mc-closed .mc-navbar-title{display:none}", ".mc-navbar-divider{display:block}.mc-navbar-divider.mc-vertical{height:1px;margin:8px 16px}.mc-navbar-divider.mc-vertical.mc-closed{margin-right:10px;margin-left:10px}.mc-navbar-divider.mc-horizontal{width:1px;height:28px;margin-left:8px;margin-right:8px}"]
                },] }
    ];
    /** @nocollapse */
    McNavbarItem.ctorParameters = function () { return [
        { type: a11y.FocusMonitor },
        { type: core.ElementRef }
    ]; };
    McNavbarItem.propDecorators = {
        button: [{ type: core.ContentChild, args: [button.McButtonCssStyler,] }],
        title: [{ type: core.ContentChild, args: [McNavbarTitle,] }],
        icon: [{ type: core.ContentChild, args: [icon.McIcon,] }],
        collapsable: [{ type: core.Input }],
        collapsed: [{ type: core.Input }],
        collapsedTitle: [{ type: core.Input }]
    };

    var McNavbarContainer = /** @class */ (function () {
        function McNavbarContainer() {
        }
        return McNavbarContainer;
    }());
    McNavbarContainer.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mc-navbar-container',
                    host: {
                        class: 'mc-navbar-container'
                    }
                },] }
    ];
    var McNavbar = /** @class */ (function () {
        function McNavbar(elementRef) {
            var _this = this;
            this.elementRef = elementRef;
            this.resizeStream = new rxjs.Subject();
            this.resizeDebounceInterval = 100;
            this.updateCollapsed = function () {
                var collapseDelta = _this.totalItemsWidth - _this.width;
                var needCollapse = collapseDelta > 0;
                if (needCollapse) {
                    _this.collapseItems(collapseDelta);
                }
                else {
                    _this.unCollapseItems(collapseDelta);
                }
            };
            this.setItemsState = function () {
                Promise.resolve().then(function () { var _a; return (_a = _this.navbarBaseItems) === null || _a === void 0 ? void 0 : _a.forEach(function (item) { return item.horizontal = true; }); });
            };
            this.resizeSubscription = this.resizeStream
                .pipe(operators.debounceTime(this.resizeDebounceInterval))
                .subscribe(this.updateCollapsed);
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
                return this.navbarBaseItems
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
            this.navbarBaseItems.changes
                .subscribe(this.setItemsState);
        };
        McNavbar.prototype.ngAfterViewInit = function () {
            // Note: this wait is required for loading and rendering fonts for icons;
            // unfortunately we cannot control font rendering
            setTimeout(this.updateCollapsed);
        };
        McNavbar.prototype.ngOnDestroy = function () {
            this.resizeSubscription.unsubscribe();
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
        McNavbar.prototype.unCollapseItems = function (collapseDelta) {
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
    }());
    McNavbar.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-navbar',
                    template: "<ng-content select=\"[mc-navbar-container], mc-navbar-container\"></ng-content>",
                    host: {
                        class: 'mc-navbar',
                        '(window:resize)': 'resizeStream.next($event)'
                    },
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".mc-navbar{position:relative}.mc-navbar,.mc-navbar-container{display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar-container{flex-shrink:0}"]
                },] }
    ];
    /** @nocollapse */
    McNavbar.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    McNavbar.propDecorators = {
        navbarBaseItems: [{ type: core.ContentChildren, args: [McNavbarItemBase, { descendants: true },] }],
        navbarItems: [{ type: core.ContentChildren, args: [McNavbarItem, { descendants: true },] }]
    };

    function toggleVerticalNavbarAnimation() {
        return animations.trigger('toggle', [
            animations.state('0', animations.style({ width: '48px' })),
            animations.state('1', animations.style({ width: '240px' })),
            animations.transition('0 <=> 1', animations.animate('200ms cubic-bezier(0, 1, 0.5, 1)'))
        ]);
    }

    var McVerticalNavbar = /** @class */ (function () {
        function McVerticalNavbar() {
            var _this = this;
            this._expanded = false;
            this.setItemsState = function () {
                Promise.resolve().then(function () { var _a; return (_a = _this.navbarBaseItems) === null || _a === void 0 ? void 0 : _a.forEach(function (item) { return item.vertical = true; }); });
            };
        }
        Object.defineProperty(McVerticalNavbar.prototype, "expanded", {
            get: function () {
                return this._expanded;
            },
            set: function (value) {
                this._expanded = coercion.coerceBooleanProperty(value);
                this.setClosedStateForItems(value);
            },
            enumerable: false,
            configurable: true
        });
        McVerticalNavbar.prototype.toggle = function () {
            this.expanded = !this.expanded;
        };
        McVerticalNavbar.prototype.ngAfterContentInit = function () {
            this.setItemsState();
            this.setClosedStateForItems(this.expanded);
            this.navbarBaseItems.changes
                .subscribe(this.setItemsState);
        };
        McVerticalNavbar.prototype.setClosedStateForItems = function (value) {
            var _a;
            (_a = this.navbarBaseItems) === null || _a === void 0 ? void 0 : _a.forEach(function (item) {
                item.closed = !value;
                setTimeout(function () { var _a; return (_a = item.button) === null || _a === void 0 ? void 0 : _a.updateClassModifierForIcons(); });
            });
        };
        return McVerticalNavbar;
    }());
    McVerticalNavbar.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-vertical-navbar',
                    exportAs: 'McVerticalNavbar',
                    template: "\n        <ng-content select=\"[mc-navbar-container], mc-navbar-container\"></ng-content>\n        <ng-content select=\"[mc-navbar-toggle], mc-navbar-toggle\"></ng-content>\n    ",
                    host: {
                        class: 'mc-vertical-navbar',
                        '[class.mc-closed]': '!expanded',
                        '[class.mc-opened]': 'expanded',
                        '[@toggle]': 'expanded'
                    },
                    animations: [toggleVerticalNavbarAnimation()],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".mc-vertical-navbar{display:flex;flex-direction:column}.mc-vertical-navbar .mc-navbar-container{flex-direction:column;align-items:unset}.mc-vertical-navbar.mc-opened{width:var(--mc-vertical-navbar-size-states-opened-width,240px)}.mc-vertical-navbar.mc-closed{width:var(--mc-vertical-navbar-size-states-closed-width,48px)}"]
                },] }
    ];
    McVerticalNavbar.propDecorators = {
        expanded: [{ type: core.Input }],
        navbarBaseItems: [{ type: core.ContentChildren, args: [McNavbarItemBase, { descendants: true },] }]
    };
    var McNavbarToggleBase = /** @class */ (function () {
        // tslint:disable-next-line:naming-convention
        function McNavbarToggleBase(_elementRef) {
            this._elementRef = _elementRef;
        }
        return McNavbarToggleBase;
    }());
    // tslint:disable-next-line:naming-convention
    var McNavbarToggleMixinBase = core$1.mixinTabIndex(core$1.mixinDisabled(McNavbarToggleBase));
    var McNavbarToggle = /** @class */ (function (_super) {
        __extends(McNavbarToggle, _super);
        function McNavbarToggle(mcNavbar, focusMonitor, elementRef) {
            var _this = _super.call(this, elementRef) || this;
            _this.mcNavbar = mcNavbar;
            _this.focusMonitor = focusMonitor;
            _this.elementRef = elementRef;
            return _this;
        }
        McNavbarToggle.prototype.ngOnDestroy = function () {
            this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
        };
        McNavbarToggle.prototype.ngAfterContentInit = function () {
            this.focusMonitor.monitor(this.elementRef.nativeElement, true);
        };
        return McNavbarToggle;
    }(McNavbarToggleMixinBase));
    McNavbarToggle.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-navbar-toggle',
                    template: "\n        <i mc-icon\n           [class.mc-angle-left-M_16]=\"mcNavbar.expanded\"\n           [class.mc-angle-right-M_16]=\"!mcNavbar.expanded\"\n           *ngIf=\"!customIcon\">\n        </i>\n\n        <ng-content select=\"[mc-icon]\"></ng-content>\n        <ng-content select=\"mc-navbar-title\" *ngIf=\"mcNavbar.expanded\"></ng-content>\n    ",
                    host: {
                        class: 'mc-navbar-item mc-navbar-toggle mc-vertical',
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.disabled]': 'disabled || null'
                    },
                    inputs: ['tabIndex'],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".mc-navbar{position:relative}.mc-navbar,.mc-navbar-container{display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar-container{flex-shrink:0}"]
                },] }
    ];
    /** @nocollapse */
    McNavbarToggle.ctorParameters = function () { return [
        { type: McVerticalNavbar },
        { type: a11y.FocusMonitor },
        { type: core.ElementRef }
    ]; };
    McNavbarToggle.propDecorators = {
        customIcon: [{ type: core.ContentChild, args: [icon.McIcon,] }]
    };

    var McNavbarModule = /** @class */ (function () {
        function McNavbarModule() {
        }
        return McNavbarModule;
    }());
    McNavbarModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        a11y.A11yModule,
                        platform.PlatformModule,
                        icon.McIconModule
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
                        McNavbarItemBase
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
                        McNavbarItemBase
                    ]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.McNavbar = McNavbar;
    exports.McNavbarBrand = McNavbarBrand;
    exports.McNavbarContainer = McNavbarContainer;
    exports.McNavbarDivider = McNavbarDivider;
    exports.McNavbarItem = McNavbarItem;
    exports.McNavbarItemBase = McNavbarItemBase;
    exports.McNavbarLogo = McNavbarLogo;
    exports.McNavbarMixinBase = McNavbarMixinBase;
    exports.McNavbarModule = McNavbarModule;
    exports.McNavbarTitle = McNavbarTitle;
    exports.McNavbarToggle = McNavbarToggle;
    exports.McNavbarToggleBase = McNavbarToggleBase;
    exports.McNavbarToggleMixinBase = McNavbarToggleMixinBase;
    exports.McVerticalNavbar = McVerticalNavbar;
    exports.ɵa = toggleVerticalNavbarAnimation;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-navbar.umd.js.map
