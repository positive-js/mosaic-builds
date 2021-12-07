(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/overlay'), require('@angular/common'), require('@angular/core'), require('@angular/cdk/coercion'), require('@ptsecurity/mosaic/core'), require('rxjs'), require('@angular/animations'), require('@angular/cdk/bidi')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/popover', ['exports', '@angular/cdk/overlay', '@angular/common', '@angular/core', '@angular/cdk/coercion', '@ptsecurity/mosaic/core', 'rxjs', '@angular/animations', '@angular/cdk/bidi'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.popover = {}), global.ng.cdk.overlay, global.ng.common, global.ng.core, global.ng.cdk.coercion, global.ptsecurity.mosaic.core, global.rxjs, global.ng.animations, global.ng.cdk.bidi));
})(this, (function (exports, i2, i1, i0, coercion, core, rxjs, animations, i3) { 'use strict';

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
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);

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

    var mcPopoverAnimations = {
        /** Animation that transitions a tooltip in and out. */
        popoverState: animations.trigger('state', [
            animations.state('initial', animations.style({
                opacity: 0,
                transform: 'scale(1, 0.8)'
            })),
            animations.transition('* => visible', animations.animate('120ms cubic-bezier(0, 0, 0.2, 1)', animations.style({
                opacity: 1,
                transform: 'scale(1, 1)'
            }))),
            animations.transition('* => hidden', animations.animate('100ms linear', animations.style({ opacity: 0 })))
        ])
    };

    var McPopoverComponent = /** @class */ (function (_super) {
        __extends(McPopoverComponent, _super);
        function McPopoverComponent(changeDetectorRef) {
            var _this = _super.call(this, changeDetectorRef) || this;
            _this.prefix = 'mc-popover';
            return _this;
        }
        McPopoverComponent.prototype.updateClassMap = function (placement, customClass, size) {
            var _a;
            _super.prototype.updateClassMap.call(this, placement, customClass, (_a = {}, _a[this.prefix + "_" + size] = !!size, _a));
        };
        return McPopoverComponent;
    }(core.McPopUp));
    /** @nocollapse */ McPopoverComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McPopoverComponent, deps: [{ token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McPopoverComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McPopoverComponent, selector: "mc-popover-component", host: { listeners: { "keydown.esc": "hide(0)" } }, usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"mc-popover\"\n     [ngClass]=\"classMap\"\n     [@state]=\"visibility\"\n     (@state.start)=\"animationStart()\"\n     (@state.done)=\"animationDone($event)\">\n\n    <div class=\"mc-popover__container\">\n        <div class=\"mc-popover__header\" *ngIf=\"header\">\n            <ng-container *ngIf=\"isTemplateRef(header)\" [ngTemplateOutlet]=\"$any(header)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(header)\">\n                <div>{{ header }}</div>\n            </ng-container>\n        </div>\n\n        <div class=\"mc-popover__content\" *ngIf=\"content\">\n            <ng-container *ngIf=\"isTemplateRef(content)\" [ngTemplateOutlet]=\"$any(content)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(content)\">\n                <div>{{ content }}</div>\n            </ng-container>\n        </div>\n\n        <div class=\"mc-popover__footer\" *ngIf=\"footer\">\n            <ng-container *ngIf=\"isTemplateRef(footer)\" [ngTemplateOutlet]=\"$any(footer)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(footer)\">\n                <div>{{ footer }}</div>\n            </ng-container>\n        </div>\n    </div>\n\n    <div class=\"mc-popover__arrow\" [class.mc-popover__arrow_with-footer]=\"footer\"></div>\n</div>\n", styles: ["@keyframes mc-progress{0%{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:\"\";position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%;position:fixed;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{top:0;bottom:0;left:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-pane{box-sizing:border-box;position:absolute;pointer-events:auto;margin:0;padding:0;z-index:1000;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box{box-sizing:border-box;position:absolute;z-index:1000;display:flex;flex-direction:column;margin:0;padding:0;min-width:1px;min-height:1px}.mc-popover{position:relative;border-radius:3px;border-radius:var(--mc-popover-size-border-radius, 3px);border-width:1px;border-style:solid;box-sizing:border-box;z-index:1030;list-style:none;white-space:pre-line}.mc-popover.mc-popover_small{max-width:200px;max-width:var(--mc-popover-size-small-width, 200px)}.mc-popover.mc-popover_normal{max-width:400px;max-width:var(--mc-popover-size-normal-width, 400px)}.mc-popover.mc-popover_large{max-width:640px;max-width:var(--mc-popover-size-large-width, 640px)}.mc-popover.mc-popover_placement-top,.mc-popover.mc-popover_placement-top-left,.mc-popover.mc-popover_placement-top-right{margin-bottom:calc(9px);margin-bottom:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-right,.mc-popover.mc-popover_placement-right-top,.mc-popover.mc-popover_placement-right-bottom{margin-left:calc(9px);margin-left:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-bottom,.mc-popover.mc-popover_placement-bottom-left,.mc-popover.mc-popover_placement-bottom-right{margin-top:calc(9px);margin-top:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-left,.mc-popover.mc-popover_placement-left-top,.mc-popover.mc-popover_placement-left-bottom{margin-right:calc(9px);margin-right:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover__container{display:flex;flex-direction:column;max-height:480px;max-height:var(--mc-popover-size-max-height, 480px);border-radius:3px;border-radius:var(--mc-popover-size-border-radius, 3px);overflow:hidden}.mc-popover__header{height:10px 16px;height:var(--mc-popover-header-size-height, 10px 16px);padding:10px 16px;padding:var(--mc-popover-header-size-padding, 10px 16px);border-bottom-width:1px;border-bottom-style:solid}.mc-popover__content{overflow:hidden;padding:16px;padding:var(--mc-popover-size-padding, 16px)}.mc-popover__footer{box-sizing:border-box;margin-top:8px;margin-top:var(--mc-popover-footer-size-margin-top, 8px);height:56px;height:var(--mc-popover-footer-size-height, 56px);padding:12px 16px;padding:var(--mc-popover-footer-size-padding, 12px 16px);border-top-width:1px;border-top-style:solid}.mc-popover__arrow{position:absolute;z-index:-1;width:12px;width:var(--mc-popover-size-arrow-size, 12px);height:12px;height:var(--mc-popover-size-arrow-size, 12px);border:solid 1px;transform:rotate(45deg)}.mc-popover_placement-top .mc-popover__arrow{bottom:calc(11px / -2);bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:50%;margin-left:calc(11px / -2);margin-left:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-top-left .mc-popover__arrow{bottom:calc(11px / -2);bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:calc(18px - 9px);left:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-top-right .mc-popover__arrow{bottom:calc(11px / -2);bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);right:calc(18px - 9px);right:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-right .mc-popover__arrow{left:calc(11px / -2);left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:50%;margin-top:calc(11px / -2);margin-top:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-right-top .mc-popover__arrow{left:calc(11px / -2);left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:calc(18px - 9px);top:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-right-bottom .mc-popover__arrow{left:calc(11px / -2);left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);bottom:calc(18px - 9px);bottom:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-left .mc-popover__arrow{right:calc(11px / -2);right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:50%;margin-top:calc(11px / -2);margin-top:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-left-top .mc-popover__arrow{right:calc(11px / -2);right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:calc(18px - 9px);top:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-left-bottom .mc-popover__arrow{right:calc(11px / -2);right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);bottom:calc(18px - 9px);bottom:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-bottom .mc-popover__arrow{top:calc(11px / -2);top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:50%;margin-left:calc(11px / -2);margin-left:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-bottom-left .mc-popover__arrow{top:calc(11px / -2);top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:calc(18px - 9px);left:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-bottom-right .mc-popover__arrow{top:calc(11px / -2);top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);right:calc(18px - 9px);right:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}\n"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [mcPopoverAnimations.popoverState], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McPopoverComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-popover-component',
                        templateUrl: './popover.component.html',
                        preserveWhitespaces: false,
                        styleUrls: ['./popover.scss'],
                        host: {
                            '(keydown.esc)': 'hide(0)'
                        },
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        animations: [mcPopoverAnimations.popoverState]
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ChangeDetectorRef }]; } });
    var MC_POPOVER_SCROLL_STRATEGY = new i0.InjectionToken('mc-popover-scroll-strategy');
    /** @docs-private */
    function mcPopoverScrollStrategyFactory(overlay) {
        return function () { return overlay.scrollStrategies.reposition({ scrollThrottle: 20 }); };
    }
    /** @docs-private */
    var MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
        provide: MC_POPOVER_SCROLL_STRATEGY,
        deps: [i2.Overlay],
        useFactory: mcPopoverScrollStrategyFactory
    };
    /** Creates an error to be thrown if the user supplied an invalid popover position. */
    function getMcPopoverInvalidPositionError(position) {
        return Error("McPopover position \"" + position + "\" is invalid.");
    }
    var McPopoverTrigger = /** @class */ (function (_super) {
        __extends(McPopoverTrigger, _super);
        function McPopoverTrigger(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) {
            var _this = _super.call(this, overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) || this;
            _this._hasBackdrop = false;
            _this._trigger = core.PopUpTriggers.Click;
            _this._size = core.PopUpSizes.Normal;
            _this._closeOnScroll = false;
            _this.backdropClass = 'cdk-overlay-transparent-backdrop';
            _this.placementChange = new i0.EventEmitter();
            _this.visibleChange = new i0.EventEmitter();
            _this.originSelector = '.mc-popover';
            return _this;
        }
        Object.defineProperty(McPopoverTrigger.prototype, "popoverVisible", {
            get: function () {
                return this.visible;
            },
            set: function (value) {
                _super.prototype.updateVisible.call(this, value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopoverTrigger.prototype, "popoverPlacement", {
            get: function () {
                return this.placement;
            },
            set: function (value) {
                _super.prototype.updatePlacement.call(this, value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopoverTrigger.prototype, "popoverPlacementPriority", {
            get: function () {
                return this.placementPriority;
            },
            set: function (value) {
                _super.prototype.updatePlacementPriority.call(this, value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopoverTrigger.prototype, "hasBackdrop", {
            get: function () {
                return this._hasBackdrop;
            },
            set: function (value) {
                this._hasBackdrop = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopoverTrigger.prototype, "header", {
            get: function () {
                return this._header;
            },
            set: function (value) {
                this._header = value;
                this.updateData();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopoverTrigger.prototype, "content", {
            get: function () {
                return this._content;
            },
            set: function (value) {
                this._content = value;
                this.updateData();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopoverTrigger.prototype, "footer", {
            get: function () {
                return this._footer;
            },
            set: function (value) {
                this._footer = value;
                this.updateData();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopoverTrigger.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopoverTrigger.prototype, "trigger", {
            get: function () {
                return this._trigger;
            },
            set: function (value) {
                if (value) {
                    this._trigger = value;
                }
                else {
                    this._trigger = core.PopUpTriggers.Click;
                }
                this.initListeners();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopoverTrigger.prototype, "size", {
            get: function () {
                return this._size;
            },
            set: function (value) {
                if ([core.PopUpSizes.Small, core.PopUpSizes.Normal, core.PopUpSizes.Large].includes(value)) {
                    this._size = value;
                    this.updateClassMap();
                }
                else {
                    this._size = core.PopUpSizes.Normal;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopoverTrigger.prototype, "customClass", {
            get: function () {
                return this._customClass;
            },
            set: function (value) {
                this._customClass = value;
                this.updateClassMap();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopoverTrigger.prototype, "closeOnScroll", {
            get: function () {
                return this._closeOnScroll;
            },
            set: function (value) {
                this._closeOnScroll = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopoverTrigger.prototype, "overlayConfig", {
            get: function () {
                return {
                    panelClass: 'mc-popover__panel',
                    hasBackdrop: this.hasBackdrop,
                    backdropClass: this.backdropClass
                };
            },
            enumerable: false,
            configurable: true
        });
        McPopoverTrigger.prototype.updateData = function () {
            if (!this.instance) {
                return;
            }
            this.instance.header = this.header;
            this.instance.content = this.content;
            this.instance.footer = this.footer;
            if (this.isOpen) {
                this.updatePosition(true);
            }
        };
        /** Updates the position of the current popover. */
        McPopoverTrigger.prototype.updatePosition = function (reapplyPosition) {
            if (reapplyPosition === void 0) { reapplyPosition = false; }
            this.overlayRef = this.createOverlay();
            var position = this.overlayRef.getConfig().positionStrategy
                .withPositions(this.getPrioritizedPositions())
                .withPush(true);
            if (reapplyPosition) {
                setTimeout(function () { return position.reapplyLastPosition(); });
            }
        };
        McPopoverTrigger.prototype.getOverlayHandleComponentType = function () {
            return McPopoverComponent;
        };
        McPopoverTrigger.prototype.updateClassMap = function (newPlacement) {
            if (newPlacement === void 0) { newPlacement = this.placement; }
            if (!this.instance) {
                return;
            }
            this.instance.updateClassMap(core.POSITION_TO_CSS_MAP[newPlacement], this.customClass, this.size);
            this.instance.markForCheck();
        };
        McPopoverTrigger.prototype.closingActions = function () {
            return rxjs.merge(this.overlayRef.backdropClick(), this.hasBackdrop ? rxjs.NEVER : this.overlayRef.outsidePointerEvents(), this.closeOnScroll ? this.scrollDispatcher.scrolled() : rxjs.NEVER, this.overlayRef.detachments());
        };
        return McPopoverTrigger;
    }(core.McPopUpTrigger));
    /** @nocollapse */ McPopoverTrigger.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McPopoverTrigger, deps: [{ token: i2__namespace.Overlay }, { token: i0__namespace.ElementRef }, { token: i0__namespace.NgZone }, { token: i2__namespace.ScrollDispatcher }, { token: i0__namespace.ViewContainerRef }, { token: MC_POPOVER_SCROLL_STRATEGY }, { token: i3__namespace.Directionality, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McPopoverTrigger.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McPopoverTrigger, selector: "[mcPopover]", inputs: { popoverVisible: ["mcPopoverVisible", "popoverVisible"], popoverPlacement: ["mcPopoverPlacement", "popoverPlacement"], popoverPlacementPriority: ["mcPopoverPlacementPriority", "popoverPlacementPriority"], hasBackdrop: "hasBackdrop", header: ["mcPopoverHeader", "header"], content: ["mcPopoverContent", "content"], footer: ["mcPopoverFooter", "footer"], disabled: ["mcPopoverDisabled", "disabled"], trigger: ["mcTrigger", "trigger"], size: ["mcPopoverSize", "size"], customClass: ["mcPopoverClass", "customClass"], closeOnScroll: "closeOnScroll", backdropClass: "backdropClass" }, outputs: { placementChange: "mcPopoverPlacementChange", visibleChange: "mcPopoverVisibleChange" }, host: { listeners: { "keydown": "handleKeydown($event)", "touchend": "handleTouchend()" }, properties: { "class.mc-popover_open": "isOpen" } }, exportAs: ["mcPopover"], usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McPopoverTrigger, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[mcPopover]',
                        exportAs: 'mcPopover',
                        host: {
                            '[class.mc-popover_open]': 'isOpen',
                            '(keydown)': 'handleKeydown($event)',
                            '(touchend)': 'handleTouchend()'
                        }
                    }]
            }], ctorParameters: function () {
            return [{ type: i2__namespace.Overlay }, { type: i0__namespace.ElementRef }, { type: i0__namespace.NgZone }, { type: i2__namespace.ScrollDispatcher }, { type: i0__namespace.ViewContainerRef }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [MC_POPOVER_SCROLL_STRATEGY]
                        }] }, { type: i3__namespace.Directionality, decorators: [{
                            type: i0.Optional
                        }] }];
        }, propDecorators: { popoverVisible: [{
                    type: i0.Input,
                    args: ['mcPopoverVisible']
                }], popoverPlacement: [{
                    type: i0.Input,
                    args: ['mcPopoverPlacement']
                }], popoverPlacementPriority: [{
                    type: i0.Input,
                    args: ['mcPopoverPlacementPriority']
                }], hasBackdrop: [{
                    type: i0.Input
                }], header: [{
                    type: i0.Input,
                    args: ['mcPopoverHeader']
                }], content: [{
                    type: i0.Input,
                    args: ['mcPopoverContent']
                }], footer: [{
                    type: i0.Input,
                    args: ['mcPopoverFooter']
                }], disabled: [{
                    type: i0.Input,
                    args: ['mcPopoverDisabled']
                }], trigger: [{
                    type: i0.Input,
                    args: ['mcTrigger']
                }], size: [{
                    type: i0.Input,
                    args: ['mcPopoverSize']
                }], customClass: [{
                    type: i0.Input,
                    args: ['mcPopoverClass']
                }], closeOnScroll: [{
                    type: i0.Input
                }], backdropClass: [{
                    type: i0.Input
                }], placementChange: [{
                    type: i0.Output,
                    args: ['mcPopoverPlacementChange']
                }], visibleChange: [{
                    type: i0.Output,
                    args: ['mcPopoverVisibleChange']
                }] } });

    var McPopoverModule = /** @class */ (function () {
        function McPopoverModule() {
        }
        return McPopoverModule;
    }());
    /** @nocollapse */ McPopoverModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McPopoverModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ McPopoverModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McPopoverModule, declarations: [McPopoverComponent, McPopoverTrigger], imports: [i1.CommonModule, i2.OverlayModule], exports: [McPopoverComponent, McPopoverTrigger] });
    /** @nocollapse */ McPopoverModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McPopoverModule, providers: [MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER], imports: [[i1.CommonModule, i2.OverlayModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McPopoverModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [McPopoverComponent, McPopoverTrigger],
                        exports: [McPopoverComponent, McPopoverTrigger],
                        imports: [i1.CommonModule, i2.OverlayModule],
                        providers: [MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER],
                        entryComponents: [McPopoverComponent]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.MC_POPOVER_SCROLL_STRATEGY = MC_POPOVER_SCROLL_STRATEGY;
    exports.MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER = MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER;
    exports.McPopoverComponent = McPopoverComponent;
    exports.McPopoverModule = McPopoverModule;
    exports.McPopoverTrigger = McPopoverTrigger;
    exports.getMcPopoverInvalidPositionError = getMcPopoverInvalidPositionError;
    exports.mcPopoverAnimations = mcPopoverAnimations;
    exports.mcPopoverScrollStrategyFactory = mcPopoverScrollStrategyFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ptsecurity-mosaic-popover.umd.js.map
