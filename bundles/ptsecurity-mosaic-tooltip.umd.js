(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/overlay'), require('@angular/common'), require('@angular/core'), require('@angular/cdk/coercion'), require('@ptsecurity/mosaic/core'), require('rxjs'), require('@angular/animations'), require('@angular/cdk/bidi')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/tooltip', ['exports', '@angular/cdk/overlay', '@angular/common', '@angular/core', '@angular/cdk/coercion', '@ptsecurity/mosaic/core', 'rxjs', '@angular/animations', '@angular/cdk/bidi'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.tooltip = {}), global.ng.cdk.overlay, global.ng.common, global.ng.core, global.ng.cdk.coercion, global.ptsecurity.mosaic.core, global.rxjs, global.ng.animations, global.ng.cdk.bidi));
}(this, (function (exports, i2, i1, i0, coercion, core, rxjs, animations, i3) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
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

    /**
     * Animations used by McTooltip.
     * @docs-private
     */
    var mcTooltipAnimations = {
        /** Animation that transitions a tooltip in and out. */
        tooltipState: animations.trigger('state', [
            animations.state('initial, void, hidden', animations.style({ opacity: 0, transform: 'scale(0)' })),
            animations.state('visible', animations.style({ transform: 'scale(1)' })),
            animations.transition('* => visible', animations.animate('200ms cubic-bezier(0, 0, 0.2, 1)', animations.keyframes([
                animations.style({ opacity: 0, transform: 'scale(0)', offset: 0 }),
                animations.style({ opacity: 0.5, transform: 'scale(0.99)', offset: 0.5 }),
                animations.style({ opacity: 1, transform: 'scale(1)', offset: 1 })
            ]))),
            animations.transition('* => hidden', animations.animate('100ms cubic-bezier(0, 0, 0.2, 1)', animations.style({ opacity: 0 })))
        ])
    };

    exports.TooltipModifier = void 0;
    (function (TooltipModifier) {
        TooltipModifier["Default"] = "default";
        TooltipModifier["Warning"] = "warning";
        TooltipModifier["Extended"] = "extended";
    })(exports.TooltipModifier || (exports.TooltipModifier = {}));
    var MC_TOOLTIP_OPEN_TIME = new i0.InjectionToken('mc-tooltip-open-time');
    /** @docs-private */
    var MC_TOOLTIP_OPEN_TIME_PROVIDER = {
        provide: MC_TOOLTIP_OPEN_TIME,
        useValue: { value: 0 }
    };
    var MIN_TIME_FOR_DELAY = 2000;
    var McTooltipComponent = /** @class */ (function (_super) {
        __extends(McTooltipComponent, _super);
        function McTooltipComponent(changeDetectorRef, openTime) {
            var _this = _super.call(this, changeDetectorRef) || this;
            _this.openTime = openTime;
            _this.prefix = 'mc-tooltip';
            return _this;
        }
        McTooltipComponent.prototype.show = function (delay) {
            // tslint:disable-next-line:no-magic-numbers
            _super.prototype.show.call(this, Date.now() - this.openTime.value < MIN_TIME_FOR_DELAY ? 0 : delay);
            this.openTime.value = Date.now();
        };
        McTooltipComponent.prototype.updateClassMap = function (placement, customClass, _a) {
            var _b;
            var modifier = _a.modifier;
            var classMap = (_b = {},
                _b[this.prefix + "_" + modifier] = true,
                _b);
            _super.prototype.updateClassMap.call(this, placement, customClass, classMap);
        };
        return McTooltipComponent;
    }(core.McPopUp));
    /** @nocollapse */ McTooltipComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTooltipComponent, deps: [{ token: i0__namespace.ChangeDetectorRef }, { token: MC_TOOLTIP_OPEN_TIME }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McTooltipComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McTooltipComponent, selector: "mc-tooltip-component", providers: [MC_TOOLTIP_OPEN_TIME_PROVIDER], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"mc-tooltip\"\n     [ngClass]=\"classMap\"\n     [@state]=\"visibility\"\n     (@state.start)=\"animationStart()\"\n     (@state.done)=\"animationDone($event)\">\n\n    <div class=\"mc-tooltip__inner\">\n        <div class=\"mc-tooltip__arrow\"></div>\n\n        <div class=\"mc-tooltip__header\" *ngIf=\"header\">\n            <ng-container *ngIf=\"isTemplateRef(header)\" [ngTemplateOutlet]=\"$any(header)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(header)\">\n                <div>{{ header }}</div>\n            </ng-container>\n        </div>\n        <div class=\"mc-tooltip__content\">\n            <ng-container *ngIf=\"isTemplateRef(content)\" [ngTemplateOutlet]=\"$any(content)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(content)\">\n                <div>{{ content }}</div>\n            </ng-container>\n        </div>\n    </div>\n</div>\n", styles: [".mc-tooltip__inner{border-radius:3px;border-radius:var(--mc-tooltip-size-border-radius, 3px)}.mc-tooltip{box-sizing:border-box;border-radius:3px;border-radius:var(--mc-tooltip-size-border-radius, 3px);z-index:1060;white-space:pre-line}.mc-tooltip.mc-tooltip_placement-top,.mc-tooltip.mc-tooltip_placement-top-left,.mc-tooltip.mc-tooltip_placement-top-right{margin-bottom:calc(9px);margin-bottom:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_placement-right,.mc-tooltip.mc-tooltip_placement-right-top,.mc-tooltip.mc-tooltip_placement-right-bottom{margin-left:calc(9px);margin-left:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_placement-bottom,.mc-tooltip.mc-tooltip_placement-bottom-left,.mc-tooltip.mc-tooltip_placement-bottom-right{margin-top:calc(9px);margin-top:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_placement-left,.mc-tooltip.mc-tooltip_placement-left-top,.mc-tooltip.mc-tooltip_placement-left-bottom{margin-right:calc(9px);margin-right:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_default,.mc-tooltip.mc-tooltip_warning{max-width:300px;max-width:var(--mc-tooltip-size-max-width, 300px)}.mc-tooltip.mc-tooltip_default .mc-tooltip__inner,.mc-tooltip.mc-tooltip_warning .mc-tooltip__inner{padding:8px 16px;padding:var(--mc-tooltip-size-padding, 8px 16px)}.mc-tooltip.mc-tooltip_extended{max-height:480px;max-height:var(--mc-extended-tooltip-size-max-height, 480px)}.mc-tooltip.mc-tooltip_extended .mc-tooltip__header{height:40px;height:var(--mc-extended-tooltip-header-size-height, 40px);padding:10px 16px;padding:var(--mc-extended-tooltip-header-size-padding, 10px 16px);border-top-left-radius:3px;border-top-left-radius:var(--mc-tooltip-size-border-radius, 3px);border-top-right-radius:3px;border-top-right-radius:var(--mc-tooltip-size-border-radius, 3px)}.mc-tooltip.mc-tooltip_extended .mc-tooltip__content{padding:8px 16px;padding:var(--mc-extended-tooltip-size-padding, 8px 16px)}.mc-tooltip__arrow{position:absolute;width:12px;width:var(--mc-tooltip-size-arrow-size, 12px);height:12px;height:var(--mc-tooltip-size-arrow-size, 12px);transform:rotate(45deg)}.mc-tooltip_placement-top .mc-tooltip__arrow{bottom:calc((12px - 1px) / -2);bottom:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:50%;margin-left:calc((12px - 1px) / -2);margin-left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-top-left .mc-tooltip__arrow{bottom:calc((12px - 1px) / -2);bottom:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:calc(18px - (9px / 2));left:calc(18px - (var(--mc-tooltip-size-trigger-margin, 9px) / 2))}.mc-tooltip_placement-top-right .mc-tooltip__arrow{bottom:calc((12px - 1px) / -2);bottom:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);right:calc(18px - (9px / 2));right:calc(18px - (var(--mc-tooltip-size-trigger-margin, 9px) / 2))}.mc-tooltip_placement-right .mc-tooltip__arrow{left:calc((12px - 1px) / -2);left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:50%;margin-top:calc((12px - 1px) / -2);margin-top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-right-top .mc-tooltip__arrow{left:calc((12px - 1px) / -2);left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:calc(18px - (9px / 2));top:calc(18px - (var(--mc-tooltip-size-trigger-margin, 9px) / 2))}.mc-tooltip_placement-right-bottom .mc-tooltip__arrow{left:calc((12px - 1px) / -2);left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);bottom:calc(18px - (9px / 2));bottom:calc(18px - (var(--mc-tooltip-size-trigger-margin, 9px) / 2))}.mc-tooltip_placement-left .mc-tooltip__arrow{right:calc((12px - 1px) / -2);right:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:50%;margin-top:calc((12px - 1px) / -2);margin-top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-left-top .mc-tooltip__arrow{right:calc((12px - 1px) / -2);right:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:calc(18px - (9px / 2));top:calc(18px - (var(--mc-tooltip-size-trigger-margin, 9px) / 2))}.mc-tooltip_placement-left-bottom .mc-tooltip__arrow{right:calc((12px - 1px) / -2);right:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);bottom:calc(18px - (9px / 2));bottom:calc(18px - (var(--mc-tooltip-size-trigger-margin, 9px) / 2))}.mc-tooltip_placement-bottom .mc-tooltip__arrow{top:calc((12px - 1px) / -2);top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:50%;margin-left:calc((12px - 1px) / -2);margin-left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-bottom-left .mc-tooltip__arrow{top:calc((12px - 1px) / -2);top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:calc(18px - (9px / 2));left:calc(18px - (var(--mc-tooltip-size-trigger-margin, 9px) / 2))}.mc-tooltip_placement-bottom-right .mc-tooltip__arrow{top:calc((12px - 1px) / -2);top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);right:calc(18px - (9px / 2));right:calc(18px - (var(--mc-tooltip-size-trigger-margin, 9px) / 2))}\n"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [mcTooltipAnimations.tooltipState], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTooltipComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-tooltip-component',
                        animations: [mcTooltipAnimations.tooltipState],
                        templateUrl: './tooltip.component.html',
                        styleUrls: ['./tooltip.scss'],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        providers: [MC_TOOLTIP_OPEN_TIME_PROVIDER]
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ChangeDetectorRef }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [MC_TOOLTIP_OPEN_TIME]
                        }] }];
        } });
    var MC_TOOLTIP_SCROLL_STRATEGY = new i0.InjectionToken('mc-tooltip-scroll-strategy');
    /** @docs-private */
    function mcTooltipScrollStrategyFactory(overlay) {
        return function () { return overlay.scrollStrategies.reposition({ scrollThrottle: 20 }); };
    }
    /** @docs-private */
    var MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = {
        provide: MC_TOOLTIP_SCROLL_STRATEGY,
        deps: [i2.Overlay],
        useFactory: mcTooltipScrollStrategyFactory
    };
    var McTooltipTrigger = /** @class */ (function (_super) {
        __extends(McTooltipTrigger, _super);
        function McTooltipTrigger(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) {
            var _this = _super.call(this, overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) || this;
            _this.enterDelay = 400;
            _this.leaveDelay = 0;
            _this._trigger = core.PopUpTriggers.Hover + ", " + core.PopUpTriggers.Focus;
            _this.placementChange = new i0.EventEmitter();
            _this.visibleChange = new i0.EventEmitter();
            _this.originSelector = '.mc-tooltip';
            _this.overlayConfig = {
                panelClass: 'mc-tooltip-panel'
            };
            _this.modifier = exports.TooltipModifier.Default;
            return _this;
        }
        Object.defineProperty(McTooltipTrigger.prototype, "tooltipVisible", {
            get: function () {
                return this.visible;
            },
            set: function (value) {
                _super.prototype.updateVisible.call(this, value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTooltipTrigger.prototype, "tooltipPlacement", {
            get: function () {
                return this.placement;
            },
            set: function (value) {
                _super.prototype.updatePlacement.call(this, value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTooltipTrigger.prototype, "tooltipPlacementPriority", {
            get: function () {
                return this.placementPriority;
            },
            set: function (value) {
                _super.prototype.updatePlacementPriority.call(this, value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTooltipTrigger.prototype, "content", {
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
        Object.defineProperty(McTooltipTrigger.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTooltipTrigger.prototype, "trigger", {
            get: function () {
                return this._trigger;
            },
            set: function (value) {
                if (value) {
                    this._trigger = value;
                }
                else {
                    this._trigger = core.PopUpTriggers.Hover + ", " + core.PopUpTriggers.Focus;
                }
                this.initListeners();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTooltipTrigger.prototype, "customClass", {
            get: function () {
                return this._customClass;
            },
            set: function (value) {
                if (value) {
                    this._customClass = value;
                    this.updateClassMap();
                }
                else {
                    this._customClass = '';
                }
            },
            enumerable: false,
            configurable: true
        });
        McTooltipTrigger.prototype.updateData = function () {
            if (!this.instance) {
                return;
            }
            this.instance.content = this.content;
        };
        McTooltipTrigger.prototype.closingActions = function () {
            return rxjs.merge(this.overlayRef.outsidePointerEvents(), this.overlayRef.detachments());
        };
        McTooltipTrigger.prototype.getOverlayHandleComponentType = function () {
            return McTooltipComponent;
        };
        McTooltipTrigger.prototype.updateClassMap = function (newPlacement) {
            if (newPlacement === void 0) { newPlacement = this.placement; }
            if (!this.instance) {
                return;
            }
            this.instance.updateClassMap(core.POSITION_TO_CSS_MAP[newPlacement], this.customClass, { modifier: this.modifier });
            this.instance.markForCheck();
        };
        return McTooltipTrigger;
    }(core.McPopUpTrigger));
    /** @nocollapse */ McTooltipTrigger.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTooltipTrigger, deps: [{ token: i2__namespace.Overlay }, { token: i0__namespace.ElementRef }, { token: i0__namespace.NgZone }, { token: i2__namespace.ScrollDispatcher }, { token: i0__namespace.ViewContainerRef }, { token: MC_TOOLTIP_SCROLL_STRATEGY }, { token: i3__namespace.Directionality, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McTooltipTrigger.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTooltipTrigger, selector: "[mcTooltip]", inputs: { tooltipVisible: ["mcVisible", "tooltipVisible"], tooltipPlacement: ["mcPlacement", "tooltipPlacement"], tooltipPlacementPriority: ["mcPlacementPriority", "tooltipPlacementPriority"], content: ["mcTooltip", "content"], disabled: ["mcTooltipDisabled", "disabled"], enterDelay: ["mcEnterDelay", "enterDelay"], leaveDelay: ["mcLeaveDelay", "leaveDelay"], trigger: ["mcTrigger", "trigger"], customClass: ["mcTooltipClass", "customClass"] }, outputs: { placementChange: "mcPlacementChange", visibleChange: "mcVisibleChange" }, host: { listeners: { "keydown": "handleKeydown($event)", "touchend": "handleTouchend()" }, properties: { "class.mc-tooltip_open": "isOpen" } }, exportAs: ["mcTooltip"], usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTooltipTrigger, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[mcTooltip]',
                        exportAs: 'mcTooltip',
                        host: {
                            '[class.mc-tooltip_open]': 'isOpen',
                            '(keydown)': 'handleKeydown($event)',
                            '(touchend)': 'handleTouchend()'
                        }
                    }]
            }], ctorParameters: function () {
            return [{ type: i2__namespace.Overlay }, { type: i0__namespace.ElementRef }, { type: i0__namespace.NgZone }, { type: i2__namespace.ScrollDispatcher }, { type: i0__namespace.ViewContainerRef }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [MC_TOOLTIP_SCROLL_STRATEGY]
                        }] }, { type: i3__namespace.Directionality, decorators: [{
                            type: i0.Optional
                        }] }];
        }, propDecorators: { tooltipVisible: [{
                    type: i0.Input,
                    args: ['mcVisible']
                }], tooltipPlacement: [{
                    type: i0.Input,
                    args: ['mcPlacement']
                }], tooltipPlacementPriority: [{
                    type: i0.Input,
                    args: ['mcPlacementPriority']
                }], content: [{
                    type: i0.Input,
                    args: ['mcTooltip']
                }], disabled: [{
                    type: i0.Input,
                    args: ['mcTooltipDisabled']
                }], enterDelay: [{
                    type: i0.Input,
                    args: ['mcEnterDelay']
                }], leaveDelay: [{
                    type: i0.Input,
                    args: ['mcLeaveDelay']
                }], trigger: [{
                    type: i0.Input,
                    args: ['mcTrigger']
                }], customClass: [{
                    type: i0.Input,
                    args: ['mcTooltipClass']
                }], placementChange: [{
                    type: i0.Output,
                    args: ['mcPlacementChange']
                }], visibleChange: [{
                    type: i0.Output,
                    args: ['mcVisibleChange']
                }] } });
    var McWarningTooltipTrigger = /** @class */ (function (_super) {
        __extends(McWarningTooltipTrigger, _super);
        function McWarningTooltipTrigger(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) {
            var _this = _super.call(this, overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) || this;
            _this.modifier = exports.TooltipModifier.Warning;
            return _this;
        }
        Object.defineProperty(McWarningTooltipTrigger.prototype, "content", {
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
        return McWarningTooltipTrigger;
    }(McTooltipTrigger));
    /** @nocollapse */ McWarningTooltipTrigger.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McWarningTooltipTrigger, deps: [{ token: i2__namespace.Overlay }, { token: i0__namespace.ElementRef }, { token: i0__namespace.NgZone }, { token: i2__namespace.ScrollDispatcher }, { token: i0__namespace.ViewContainerRef }, { token: MC_TOOLTIP_SCROLL_STRATEGY }, { token: i3__namespace.Directionality, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McWarningTooltipTrigger.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McWarningTooltipTrigger, selector: "[mcWarningTooltip]", inputs: { content: ["mcWarningTooltip", "content"] }, host: { listeners: { "keydown": "handleKeydown($event)", "touchend": "handleTouchend()" }, properties: { "class.mc-tooltip_open": "isOpen" } }, exportAs: ["mcWarningTooltip"], usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McWarningTooltipTrigger, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[mcWarningTooltip]',
                        exportAs: 'mcWarningTooltip',
                        host: {
                            '[class.mc-tooltip_open]': 'isOpen',
                            '(keydown)': 'handleKeydown($event)',
                            '(touchend)': 'handleTouchend()'
                        }
                    }]
            }], ctorParameters: function () {
            return [{ type: i2__namespace.Overlay }, { type: i0__namespace.ElementRef }, { type: i0__namespace.NgZone }, { type: i2__namespace.ScrollDispatcher }, { type: i0__namespace.ViewContainerRef }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [MC_TOOLTIP_SCROLL_STRATEGY]
                        }] }, { type: i3__namespace.Directionality, decorators: [{
                            type: i0.Optional
                        }] }];
        }, propDecorators: { content: [{
                    type: i0.Input,
                    args: ['mcWarningTooltip']
                }] } });
    var McExtendedTooltipTrigger = /** @class */ (function (_super) {
        __extends(McExtendedTooltipTrigger, _super);
        function McExtendedTooltipTrigger(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) {
            var _this = _super.call(this, overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) || this;
            _this.modifier = exports.TooltipModifier.Extended;
            return _this;
        }
        Object.defineProperty(McExtendedTooltipTrigger.prototype, "content", {
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
        Object.defineProperty(McExtendedTooltipTrigger.prototype, "header", {
            get: function () {
                return this._header;
            },
            set: function (header) {
                this._header = header;
                this.updateData();
            },
            enumerable: false,
            configurable: true
        });
        McExtendedTooltipTrigger.prototype.updateData = function () {
            if (!this.instance) {
                return;
            }
            _super.prototype.updateData.call(this);
            this.instance.header = this.header;
        };
        return McExtendedTooltipTrigger;
    }(McTooltipTrigger));
    /** @nocollapse */ McExtendedTooltipTrigger.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McExtendedTooltipTrigger, deps: [{ token: i2__namespace.Overlay }, { token: i0__namespace.ElementRef }, { token: i0__namespace.NgZone }, { token: i2__namespace.ScrollDispatcher }, { token: i0__namespace.ViewContainerRef }, { token: MC_TOOLTIP_SCROLL_STRATEGY }, { token: i3__namespace.Directionality, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McExtendedTooltipTrigger.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McExtendedTooltipTrigger, selector: "[mcExtendedTooltip]", inputs: { content: ["mcExtendedTooltip", "content"], header: ["mcTooltipHeader", "header"] }, host: { listeners: { "keydown": "handleKeydown($event)", "touchend": "handleTouchend()" }, properties: { "class.mc-tooltip_open": "isOpen" } }, exportAs: ["mcExtendedTooltip"], usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McExtendedTooltipTrigger, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[mcExtendedTooltip]',
                        exportAs: 'mcExtendedTooltip',
                        host: {
                            '[class.mc-tooltip_open]': 'isOpen',
                            '(keydown)': 'handleKeydown($event)',
                            '(touchend)': 'handleTouchend()'
                        }
                    }]
            }], ctorParameters: function () {
            return [{ type: i2__namespace.Overlay }, { type: i0__namespace.ElementRef }, { type: i0__namespace.NgZone }, { type: i2__namespace.ScrollDispatcher }, { type: i0__namespace.ViewContainerRef }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [MC_TOOLTIP_SCROLL_STRATEGY]
                        }] }, { type: i3__namespace.Directionality, decorators: [{
                            type: i0.Optional
                        }] }];
        }, propDecorators: { content: [{
                    type: i0.Input,
                    args: ['mcExtendedTooltip']
                }], header: [{
                    type: i0.Input,
                    args: ['mcTooltipHeader']
                }] } });

    var McToolTipModule = /** @class */ (function () {
        function McToolTipModule() {
        }
        return McToolTipModule;
    }());
    /** @nocollapse */ McToolTipModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McToolTipModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ McToolTipModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McToolTipModule, declarations: [McTooltipComponent,
            McTooltipTrigger,
            McExtendedTooltipTrigger,
            McWarningTooltipTrigger], imports: [i1.CommonModule, i2.OverlayModule], exports: [McTooltipComponent,
            McTooltipTrigger,
            McExtendedTooltipTrigger,
            McWarningTooltipTrigger] });
    /** @nocollapse */ McToolTipModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McToolTipModule, providers: [
            MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
            MC_TOOLTIP_OPEN_TIME_PROVIDER
        ], imports: [[i1.CommonModule, i2.OverlayModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McToolTipModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            McTooltipComponent,
                            McTooltipTrigger,
                            McExtendedTooltipTrigger,
                            McWarningTooltipTrigger
                        ],
                        exports: [
                            McTooltipComponent,
                            McTooltipTrigger,
                            McExtendedTooltipTrigger,
                            McWarningTooltipTrigger
                        ],
                        imports: [i1.CommonModule, i2.OverlayModule],
                        providers: [
                            MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
                            MC_TOOLTIP_OPEN_TIME_PROVIDER
                        ],
                        entryComponents: [McTooltipComponent]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.MC_TOOLTIP_OPEN_TIME = MC_TOOLTIP_OPEN_TIME;
    exports.MC_TOOLTIP_OPEN_TIME_PROVIDER = MC_TOOLTIP_OPEN_TIME_PROVIDER;
    exports.MC_TOOLTIP_SCROLL_STRATEGY = MC_TOOLTIP_SCROLL_STRATEGY;
    exports.MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER;
    exports.MIN_TIME_FOR_DELAY = MIN_TIME_FOR_DELAY;
    exports.McExtendedTooltipTrigger = McExtendedTooltipTrigger;
    exports.McToolTipModule = McToolTipModule;
    exports.McTooltipComponent = McTooltipComponent;
    exports.McTooltipTrigger = McTooltipTrigger;
    exports.McWarningTooltipTrigger = McWarningTooltipTrigger;
    exports.mcTooltipScrollStrategyFactory = mcTooltipScrollStrategyFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-tooltip.umd.js.map
