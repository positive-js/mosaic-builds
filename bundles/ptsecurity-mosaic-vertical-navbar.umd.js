(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/cdk/platform'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/icon'), require('@ptsecurity/mosaic/core'), require('@ptsecurity/mosaic/dropdown'), require('@angular/animations')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/vertical-navbar', ['exports', '@angular/cdk/a11y', '@angular/cdk/platform', '@angular/common', '@angular/core', '@ptsecurity/mosaic/icon', '@ptsecurity/mosaic/core', '@ptsecurity/mosaic/dropdown', '@angular/animations'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic['vertical-navbar'] = {}), global.ng.cdk.a11y, global.ng.cdk.platform, global.ng.common, global.ng.core, global.ptsecurity.mosaic.icon, global.ptsecurity.mosaic.core, global.ptsecurity.mosaic.dropdown, global.ng.animations));
}(this, (function (exports, a11y, platform, common, core, icon, core$1, dropdown, animations) { 'use strict';

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
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
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

    var McVerticalNavbarItemIcon = /** @class */ (function () {
        function McVerticalNavbarItemIcon() {
        }
        return McVerticalNavbarItemIcon;
    }());
    McVerticalNavbarItemIcon.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mc-vertical-navbar-item-icon',
                    host: {
                        class: 'mc-vertical-navbar__item-icon'
                    }
                },] }
    ];
    var McVerticalNavbarItemBadge = /** @class */ (function () {
        function McVerticalNavbarItemBadge() {
        }
        return McVerticalNavbarItemBadge;
    }());
    McVerticalNavbarItemBadge.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-vertical-navbar-badge',
                    template: "\n        <span class=\"mc-badge mc-badge_light\">\n            <ng-content></ng-content>\n        </span>\n    ",
                    host: {
                        class: 'mc-vertical-navbar__badge'
                    }
                },] }
    ];
    var McVerticalNavbarItemBase = /** @class */ (function () {
        // tslint:disable-next-line:naming-convention
        function McVerticalNavbarItemBase(_elementRef) {
            this._elementRef = _elementRef;
        }
        return McVerticalNavbarItemBase;
    }());
    // tslint:disable-next-line:naming-convention
    var McVerticalNavbarMixinBase = core$1.mixinTabIndex(core$1.mixinDisabled(McVerticalNavbarItemBase));
    var McVerticalNavbarItem = /** @class */ (function (_super) {
        __extends(McVerticalNavbarItem, _super);
        function McVerticalNavbarItem(element, focusMonitor, trigger) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.focusMonitor = focusMonitor;
            _this.trigger = trigger;
            _this.focusMonitor.monitor(_this.element.nativeElement).subscribe();
            return _this;
        }
        Object.defineProperty(McVerticalNavbarItem.prototype, "hasDropdownAttached", {
            get: function () {
                return !!this.trigger;
            },
            enumerable: false,
            configurable: true
        });
        McVerticalNavbarItem.prototype.ngOnDestroy = function () {
            this.focusMonitor.stopMonitoring(this.element.nativeElement);
        };
        return McVerticalNavbarItem;
    }(McVerticalNavbarMixinBase));
    McVerticalNavbarItem.decorators = [
        { type: core.Component, args: [{
                    selector: 'a[mc-vertical-navbar-item], mc-vertical-navbar-item',
                    template: "<div class=\"mc-vertical-navbar__item\">\n    <ng-content></ng-content>\n    <i *ngIf=\"hasDropdownAttached\" mc-icon=\"mc-angle-right-M_16\" class=\"mc-vertical-navbar__item-dropdown-icon\"></i>\n</div>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    inputs: ['disabled', 'tabIndex'],
                    host: {
                        class: 'mc-vertical-navbar-item',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.tabindex]': 'tabIndex'
                    },
                    styles: [".mc-vertical-navbar__badge{position:absolute;width:var(--mc-navbar-badge-size-width,64px);top:0;left:0}.mc-vertical-navbar__badge .mc-badge{position:absolute;right:4px;top:4px}.mc-vertical-navbar__item-icon{margin-right:var(--mc-vertical-navbar-item-size-icon-margin-right,16px)}.mc-vertical-navbar__item-icon .mc-icon{font-size:var(--mc-vertical-navbar-item-font-icon-size,32px)}.mc-vertical-navbar__title{white-space:nowrap}.mc-vertical-navbar__item-dropdown-icon{margin-left:auto;padding-left:var(--mc-vertical-navbar-item-size-padding-horizontal,16px)}a[mc-vertical-navbar-item],mc-vertical-navbar-item{display:flex;align-items:center;box-sizing:border-box;position:relative;margin:var(--mc-vertical-navbar-item-size-margin,1px 0);width:100%;height:var(--mc-vertical-navbar-item-size-height,64px);cursor:pointer;text-decoration:none}a[mc-vertical-navbar-item] .mc-vertical-navbar__item,mc-vertical-navbar-item .mc-vertical-navbar__item{display:flex;align-items:center;width:100%;height:100%;padding-left:var(--mc-vertical-navbar-item-size-padding-horizontal,16px);padding-right:var(--mc-vertical-navbar-item-size-padding-horizontal,16px)}a[mc-vertical-navbar-item].mc-progress,mc-vertical-navbar-item.mc-progress{cursor:pointer}a[mc-vertical-navbar-item].mc-vertical-navbar__item_active,mc-vertical-navbar-item.mc-vertical-navbar__item_active{cursor:default}a[mc-vertical-navbar-item][disabled],mc-vertical-navbar-item[disabled]{cursor:default;pointer-events:none}"]
                },] }
    ];
    /** @nocollapse */
    McVerticalNavbarItem.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: a11y.FocusMonitor },
        { type: dropdown.McDropdownTrigger, decorators: [{ type: core.Optional }, { type: core.Self }] }
    ]; };

    function toggleVerticalNavbarAnimation() {
        return animations.trigger('toggle', [
            animations.state('0', animations.style({
                width: '64px'
            })),
            animations.state('1', animations.style({
                width: '*'
            })),
            animations.transition('0 <=> 1', animations.animate('200ms cubic-bezier(0, 1, 0.5, 1)'))
        ]);
    }

    var McVerticalNavbarHeader = /** @class */ (function () {
        function McVerticalNavbarHeader() {
        }
        return McVerticalNavbarHeader;
    }());
    McVerticalNavbarHeader.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mc-vertical-navbar-header, a[mc-vertical-navbar-header]',
                    host: {
                        class: 'mc-vertical-navbar__header'
                    }
                },] }
    ];
    var McVerticalNavbarTitle = /** @class */ (function () {
        function McVerticalNavbarTitle() {
        }
        return McVerticalNavbarTitle;
    }());
    McVerticalNavbarTitle.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mc-vertical-navbar-title',
                    host: {
                        class: 'mc-vertical-navbar__title'
                    }
                },] }
    ];
    var McVerticalNavbar = /** @class */ (function () {
        function McVerticalNavbar(cd) {
            this.cd = cd;
            this.expanded = false;
        }
        McVerticalNavbar.prototype.toggle = function () {
            this.expanded = !this.expanded;
            this.cd.markForCheck();
        };
        return McVerticalNavbar;
    }());
    McVerticalNavbar.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-vertical-navbar',
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    template: "<nav class=\"mc-vertical-navbar\" [@toggle]=\"expanded\">\n    <div class=\"mc-vertical-navbar__header-area\">\n        <div cdkMonitorElementFocus tabindex=\"0\" class=\"mc-vertical-navbar__toggle-button\"\n             (click)=\"toggle()\"\n             (keydown.space)=\"toggle()\"\n             (keydown.enter)=\"toggle()\"\n        >\n            <i mc-icon=\"mc-hamburger_32\" *ngIf=\"!expanded\"></i>\n            <i mc-icon=\"mc-close-L_32\" *ngIf=\"expanded\"></i>\n        </div>\n        <div cdkMonitorSubtreeFocus *ngIf=\"expanded\">\n            <ng-content select=\"mc-vertical-navbar-header, a[mc-vertical-navbar-header]\"></ng-content>\n        </div>\n    </div>\n\n    <ng-content></ng-content>\n</nav>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    animations: [
                        toggleVerticalNavbarAnimation()
                    ],
                    styles: [".mc-vertical-navbar{height:100%;position:fixed;left:0;top:0;z-index:100;display:flex;flex-direction:column;align-items:flex-start;min-height:100%;overflow:hidden}.mc-vertical-navbar .mc-vertical-navbar__header-area{display:flex;width:100%;align-items:stretch;box-sizing:border-box;min-height:64px}.mc-vertical-navbar .mc-vertical-navbar__header-area .mc-vertical-navbar__header{display:flex;height:100%;justify-content:stretch;text-decoration:none;align-self:stretch;align-items:center}.mc-vertical-navbar .mc-vertical-navbar__header-area .mc-vertical-navbar__toggle-button{cursor:pointer;display:flex;flex:0 0 auto;justify-content:center;align-items:center;align-self:stretch;width:64px}.mc-vertical-navbar .mc-vertical-navbar__header-area .mc-vertical-navbar__title{padding:0 16px}"]
                },] }
    ];
    /** @nocollapse */
    McVerticalNavbar.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef }
    ]; };
    McVerticalNavbar.propDecorators = {
        expanded: [{ type: core.Input }]
    };

    var COMPONENTS = [
        McVerticalNavbar,
        McVerticalNavbarTitle,
        McVerticalNavbarItem,
        McVerticalNavbarItemIcon,
        McVerticalNavbarItemBadge,
        McVerticalNavbarHeader
    ];
    var McVerticalNavbarModule = /** @class */ (function () {
        function McVerticalNavbarModule() {
        }
        return McVerticalNavbarModule;
    }());
    McVerticalNavbarModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        a11y.A11yModule,
                        platform.PlatformModule,
                        icon.McIconModule
                    ],
                    exports: COMPONENTS,
                    declarations: COMPONENTS
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.McVerticalNavbar = McVerticalNavbar;
    exports.McVerticalNavbarHeader = McVerticalNavbarHeader;
    exports.McVerticalNavbarItem = McVerticalNavbarItem;
    exports.McVerticalNavbarItemBadge = McVerticalNavbarItemBadge;
    exports.McVerticalNavbarItemIcon = McVerticalNavbarItemIcon;
    exports.McVerticalNavbarMixinBase = McVerticalNavbarMixinBase;
    exports.McVerticalNavbarModule = McVerticalNavbarModule;
    exports.McVerticalNavbarTitle = McVerticalNavbarTitle;
    exports.ɵa = toggleVerticalNavbarAnimation;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-vertical-navbar.umd.js.map
