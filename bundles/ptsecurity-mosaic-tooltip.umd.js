(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/overlay'), require('@angular/common'), require('@angular/core'), require('@angular/cdk/bidi'), require('@angular/cdk/coercion'), require('@angular/cdk/portal'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/mosaic/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/tooltip', ['exports', '@angular/cdk/overlay', '@angular/common', '@angular/core', '@angular/cdk/bidi', '@angular/cdk/coercion', '@angular/cdk/portal', '@ptsecurity/cdk/keycodes', '@ptsecurity/mosaic/core', 'rxjs', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.tooltip = {}), global.ng.cdk.overlay, global.ng.common, global.ng.core, global.ng.cdk.bidi, global.ng.cdk.coercion, global.ng.cdk.portal, global.keycodes, global.ptsecurity.mosaic.core, global.rxjs, global.rxjs.operators));
}(this, (function (exports, overlay, common, core$1, bidi, coercion, portal, keycodes, core, rxjs, operators) { 'use strict';

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
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
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

    // tslint:disable-next-line:naming-convention
    var ArrowPlacements = {
        Top: 'top',
        Center: 'center',
        Bottom: 'bottom',
        Right: 'right',
        Left: 'left'
    };
    var McTooltipComponent = /** @class */ (function () {
        function McTooltipComponent(cdr) {
            this.cdr = cdr;
            this.prefix = 'mc-tooltip_placement';
            this.positions = __spread(core.DEFAULT_4_POSITIONS);
            this.classMap = {};
            this.mcVisibleChange = new core$1.EventEmitter();
            this.mcMouseEnterDelay = 400;
            this.mcMouseLeaveDelay = 0;
            this._mcTrigger = 'hover';
            this._mcPlacement = 'top';
            this._mcVisible = new rxjs.BehaviorSubject(false);
            /** Subject for notifying that the tooltip has been hidden from the view */
            this.onHideSubject = new rxjs.Subject();
            this.closeOnInteraction = false;
            this.availablePositions = core.POSITION_MAP;
            this.$visible = this._mcVisible.asObservable();
        }
        Object.defineProperty(McTooltipComponent.prototype, "mcTitle", {
            get: function () {
                return this._mcTitle;
            },
            set: function (value) {
                this._mcTitle = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTooltipComponent.prototype, "mcTrigger", {
            get: function () {
                return this._mcTrigger;
            },
            set: function (value) {
                this._mcTrigger = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTooltipComponent.prototype, "mcPlacement", {
            get: function () {
                return this._mcPlacement;
            },
            set: function (value) {
                if (value !== this._mcPlacement) {
                    this._mcPlacement = value;
                    this.positions.unshift(core.POSITION_MAP[this.mcPlacement]);
                }
                else if (!value) {
                    this._mcPlacement = 'top';
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTooltipComponent.prototype, "mcTooltipClass", {
            get: function () {
                return this._mcTooltipClass;
            },
            set: function (value) {
                this._mcTooltipClass = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTooltipComponent.prototype, "mcVisible", {
            get: function () {
                return this._mcVisible.value;
            },
            set: function (value) {
                var visible = coercion.coerceBooleanProperty(value);
                if (visible && this._mcVisible.value !== visible) {
                    this.show();
                }
                else {
                    this.hide();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTooltipComponent.prototype, "mcArrowPlacement", {
            get: function () {
                return this._mcArrowPlacement;
            },
            set: function (value) {
                this._mcArrowPlacement = value;
            },
            enumerable: false,
            configurable: true
        });
        McTooltipComponent.prototype.show = function () {
            var _this = this;
            if (this.hideTid) {
                clearTimeout(this.hideTid);
            }
            if (!this.isContentEmpty()) {
                if (this.mcTrigger !== 'manual') {
                    this.closeOnInteraction = true;
                }
                this.showTid = setTimeout(function () {
                    _this._mcVisible.next(true);
                    _this.mcVisibleChange.emit(true);
                    // Mark for check so if any parent component has set the
                    // ChangeDetectionStrategy to OnPush it will be checked anyways
                    _this.markForCheck();
                }, this.mcMouseEnterDelay);
            }
        };
        McTooltipComponent.prototype.hide = function () {
            var _this = this;
            if (this.showTid) {
                clearTimeout(this.showTid);
            }
            this.hideTid = setTimeout(function () {
                _this._mcVisible.next(false);
                _this.mcVisibleChange.emit(false);
                _this.onHideSubject.next();
                // Mark for check so if any parent component has set the
                // ChangeDetectionStrategy to OnPush it will be checked anyways
                _this.markForCheck();
            }, this.mcMouseLeaveDelay);
        };
        McTooltipComponent.prototype.setClassMap = function () {
            var _b;
            this.classMap = (_b = {},
                _b[this.prefix + "-" + this.mcPlacement] = true,
                _b[this.mcTooltipClass] = true,
                _b);
        };
        McTooltipComponent.prototype.isContentEmpty = function () {
            return this.isTitleString ? (this.mcTitle === '' || !this.mcTitle) : false;
        };
        /** Returns an observable that notifies when the tooltip has been hidden from view. */
        McTooltipComponent.prototype.afterHidden = function () {
            return this.onHideSubject.asObservable();
        };
        McTooltipComponent.prototype.markForCheck = function () {
            this.cdr.markForCheck();
        };
        McTooltipComponent.prototype.handleBodyInteraction = function () {
            if (this.closeOnInteraction) {
                this.hide();
            }
        };
        Object.defineProperty(McTooltipComponent.prototype, "isTemplateRef", {
            get: function () {
                return this.mcTitle instanceof core$1.TemplateRef;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTooltipComponent.prototype, "isNonEmptyString", {
            get: function () {
                return (typeof this.mcTitle === 'string' || typeof this.mcTitle === 'number') && this._mcTitle !== '';
            },
            enumerable: false,
            configurable: true
        });
        return McTooltipComponent;
    }());
    McTooltipComponent.decorators = [
        { type: core$1.Component, args: [{
                    selector: 'mc-tooltip-component',
                    animations: [core.fadeAnimation],
                    template: "<div class=\"mc-tooltip\"\n     [ngClass]=\"classMap\"\n     [@fadeAnimation]=\"''+($visible | async)\">\n    <div class=\"mc-tooltip-content\">\n        <div class=\"mc-tooltip-arrow\"></div>\n        <div class=\"mc-tooltip-inner\">\n            <ng-container *ngIf=\"isTemplateRef\" [ngTemplateOutlet]=\"mcTitle\"></ng-container>\n            <ng-container *ngIf=\"isNonEmptyString\">\n                <div [innerHTML]=\"mcTitle\"></div>\n            </ng-container>\n        </div>\n    </div>\n</div>\n",
                    encapsulation: core$1.ViewEncapsulation.None,
                    changeDetection: core$1.ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    host: {
                        '(body:click)': 'this.handleBodyInteraction()'
                    },
                    styles: [".mc-tooltip{display:block;box-sizing:border-box;visibility:visible;position:relative;z-index:1060;max-width:var(--mc-tooltip-size-max-width,240px);list-style:none;white-space:pre-line}.mc-tooltip_placement-top{padding-bottom:var(--mc-tooltip-size-distance,9px)}.mc-tooltip_placement-right{padding-left:var(--mc-tooltip-size-distance,9px)}.mc-tooltip_placement-bottom{padding-top:var(--mc-tooltip-size-distance,9px)}.mc-tooltip_placement-left{padding-right:var(--mc-tooltip-size-distance,9px)}.mc-tooltip-inner{padding:var(--mc-tooltip-size-padding,8px 16px);text-align:left;text-decoration:none;border-radius:var(--mc-tooltip-size-border-radius,3px);height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;vertical-align:center}.mc-tooltip-arrow{position:absolute;width:var(--mc-tooltip-size-arrow-size,12px);height:var(--mc-tooltip-size-arrow-size,12px);transform:rotate(45deg)}.mc-tooltip_placement-top .mc-tooltip-arrow{bottom:calc(var(--mc-tooltip-size-distance, 9px) - var(--mc-tooltip-size-arrow-width, 5px));left:50%;margin-left:calc(-1 * var(--mc-tooltip-size-arrow-width, 5px))}.mc-tooltip_placement-right .mc-tooltip-arrow{left:calc(var(--mc-tooltip-size-distance, 9px) - var(--mc-tooltip-size-arrow-width, 5px));top:16px;margin-top:calc(-1 * var(--mc-tooltip-size-arrow-width, 5px))}.mc-tooltip_placement-left .mc-tooltip-arrow{right:calc(var(--mc-tooltip-size-distance, 9px) - var(--mc-tooltip-size-arrow-width, 5px));top:16px;margin-top:calc(-1 * var(--mc-tooltip-size-arrow-width, 5px))}.mc-tooltip_placement-bottom .mc-tooltip-arrow{top:calc(var(--mc-tooltip-size-distance, 9px) - var(--mc-tooltip-size-arrow-width, 5px));left:50%;margin-left:calc(-1 * var(--mc-tooltip-size-arrow-width, 5px))}"]
                },] }
    ];
    /** @nocollapse */
    McTooltipComponent.ctorParameters = function () { return [
        { type: core$1.ChangeDetectorRef }
    ]; };
    McTooltipComponent.propDecorators = {
        mcVisibleChange: [{ type: core$1.Output }],
        mcMouseEnterDelay: [{ type: core$1.Input }],
        mcMouseLeaveDelay: [{ type: core$1.Input }],
        mcTitle: [{ type: core$1.Input }],
        mcTrigger: [{ type: core$1.Input }],
        mcPlacement: [{ type: core$1.Input }],
        mcTooltipClass: [{ type: core$1.Input }],
        mcVisible: [{ type: core$1.Input }],
        mcArrowPlacement: [{ type: core$1.Input }]
    };
    var MC_TOOLTIP_SCROLL_STRATEGY = new core$1.InjectionToken('mc-tooltip-scroll-strategy');
    /** @docs-private */
    function mcTooltipScrollStrategyFactory(overlay) {
        return function () { return overlay.scrollStrategies.reposition({ scrollThrottle: 20 }); };
    }
    /** @docs-private */
    var MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = {
        provide: MC_TOOLTIP_SCROLL_STRATEGY,
        deps: [overlay.Overlay],
        useFactory: mcTooltipScrollStrategyFactory
    };
    /** Creates an error to be thrown if the user supplied an invalid tooltip position. */
    function getMcTooltipInvalidPositionError(position) {
        return Error("McTooltip position \"" + position + "\" is invalid.");
    }
    var VIEWPORT_MARGIN = 8;
    var McTooltip = /** @class */ (function () {
        function McTooltip(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) {
            this.overlay = overlay;
            this.elementRef = elementRef;
            this.ngZone = ngZone;
            this.scrollDispatcher = scrollDispatcher;
            this.hostView = hostView;
            this.scrollStrategy = scrollStrategy;
            this.direction = direction;
            this.isTooltipOpen = false;
            this.isDynamicTooltip = false;
            this.parentDisabled = false;
            this.mcVisibleChange = new core$1.EventEmitter();
            this.$unsubscribe = new rxjs.Subject();
            this._disabled = false;
            this._mcTrigger = 'hover';
            this._mcPlacement = 'top';
            this.manualListeners = new Map();
            this.destroyed = new rxjs.Subject();
            this.availablePositions = core.POSITION_MAP;
        }
        Object.defineProperty(McTooltip.prototype, "mcTitle", {
            get: function () {
                return this._mcTitle;
            },
            set: function (title) {
                this._mcTitle = title;
                this.updateCompValue('mcTitle', title);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTooltip.prototype, "setTitle", {
            set: function (title) {
                this.mcTitle = title;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTooltip.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
                this.updateCompValue('mcTooltipDisabled', value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTooltip.prototype, "mcMouseEnterDelay", {
            get: function () {
                return this._mcMouseEnterDelay;
            },
            set: function (value) {
                this._mcMouseEnterDelay = value;
                this.updateCompValue('mcMouseEnterDelay', value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTooltip.prototype, "mcMouseLeaveDelay", {
            get: function () {
                return this._mcMouseLeaveDelay;
            },
            set: function (value) {
                this._mcMouseLeaveDelay = value;
                this.updateCompValue('mcMouseLeaveDelay', value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTooltip.prototype, "mcTrigger", {
            get: function () {
                return this._mcTrigger;
            },
            set: function (value) {
                if (value) {
                    this._mcTrigger = value;
                    this.updateCompValue('mcTrigger', value);
                }
                else {
                    this._mcTrigger = 'hover';
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTooltip.prototype, "mcPlacement", {
            get: function () {
                return this._mcPlacement;
            },
            set: function (value) {
                if (value) {
                    this._mcPlacement = value;
                    this.updateCompValue('mcPlacement', value);
                }
                else {
                    this._mcPlacement = 'top';
                }
                if (this.mcVisible) {
                    this.updatePosition();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTooltip.prototype, "mcTooltipClass", {
            get: function () {
                return this._mcTooltipClass;
            },
            set: function (value) {
                if (value) {
                    this._mcTooltipClass = value;
                    this.updateCompValue('mcTooltipClass', value);
                }
                else {
                    this._mcTooltipClass = '';
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTooltip.prototype, "mcVisible", {
            get: function () {
                return this._mcVisible;
            },
            set: function (externalValue) {
                var value = coercion.coerceBooleanProperty(externalValue);
                if (this._mcVisible !== value) {
                    this._mcVisible = value;
                    this.updateCompValue('mcVisible', value);
                    if (value) {
                        this.show();
                    }
                    else {
                        this.hide();
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTooltip.prototype, "mcArrowPlacement", {
            get: function () {
                return this._mcArrowPlacement;
            },
            set: function (value) {
                this._mcArrowPlacement = value;
            },
            enumerable: false,
            configurable: true
        });
        McTooltip.prototype.ngOnInit = function () {
            this.initElementRefListeners();
        };
        McTooltip.prototype.ngOnDestroy = function () {
            var _this = this;
            if (this.overlayRef) {
                this.overlayRef.dispose();
            }
            this.manualListeners.forEach(function (listener, event) {
                _this.elementRef.nativeElement.removeEventListener(event, listener);
            });
            this.manualListeners.clear();
            this.$unsubscribe.next();
            this.$unsubscribe.complete();
        };
        /** Create the overlay config and position strategy */
        McTooltip.prototype.createOverlay = function () {
            var _this = this;
            if (this.overlayRef) {
                return this.overlayRef;
            }
            // Create connected position strategy that listens for scroll events to reposition.
            var strategy = this.overlay.position()
                .flexibleConnectedTo(this.elementRef)
                .withTransformOriginOn('.mc-tooltip')
                .withFlexibleDimensions(false)
                .withViewportMargin(VIEWPORT_MARGIN)
                .withPositions(__spread(core.DEFAULT_4_POSITIONS));
            var scrollableAncestors = this.scrollDispatcher.getAncestorScrollContainers(this.elementRef);
            strategy.withScrollableContainers(scrollableAncestors);
            strategy.positionChanges
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (change) {
                if (_this.tooltip) {
                    _this.onPositionChange(change);
                    if (change.scrollableViewProperties.isOverlayClipped && _this.tooltip.mcVisible) {
                        // After position changes occur and the overlay is clipped by
                        // a parent scrollable then close the tooltip.
                        _this.ngZone.run(function () { return _this.hide(); });
                    }
                }
            });
            this.overlayRef = this.overlay.create({
                direction: this.direction,
                positionStrategy: strategy,
                panelClass: 'mc-tooltip-panel',
                scrollStrategy: this.scrollStrategy()
            });
            this.updatePosition();
            this.overlayRef.detachments()
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function () { return _this.detach(); });
            return this.overlayRef;
        };
        McTooltip.prototype.detach = function () {
            if (this.overlayRef && this.overlayRef.hasAttached()) {
                this.overlayRef.detach();
            }
            this.tooltip = null;
        };
        McTooltip.prototype.onPositionChange = function ($event) {
            var _this = this;
            var updatedPlacement = this.mcPlacement;
            Object.keys(this.availablePositions).some(function (key) {
                if ($event.connectionPair.originX === _this.availablePositions[key].originX &&
                    $event.connectionPair.originY === _this.availablePositions[key].originY &&
                    $event.connectionPair.overlayX === _this.availablePositions[key].overlayX &&
                    $event.connectionPair.overlayY === _this.availablePositions[key].overlayY) {
                    updatedPlacement = key;
                    return true;
                }
                return false;
            });
            this.updateCompValue('mcPlacement', updatedPlacement);
            if (this.tooltip) {
                this.tooltip.setClassMap();
                this.tooltip.markForCheck();
            }
            this.handlePositioningUpdate();
        };
        McTooltip.prototype.handlePositioningUpdate = function () {
            this.overlayRef = this.createOverlay();
            if (this.mcPlacement === 'right' || this.mcPlacement === 'left') {
                var halfDelimiter = 2;
                var overlayElemHeight = this.overlayRef.overlayElement.clientHeight;
                var currentContainerHeight = this.hostView.element.nativeElement.clientHeight;
                if (this.mcArrowPlacement === ArrowPlacements.Center) {
                    var arrowElemRef = this.getTooltipArrowElem();
                    var containerPositionTop = this.hostView.element.nativeElement.getBoundingClientRect().top;
                    var halfOfContainerHeight = currentContainerHeight / halfDelimiter;
                    var halfOfTooltipHeight = overlayElemHeight / halfDelimiter;
                    this.overlayRef.overlayElement.style.top = (containerPositionTop + halfOfContainerHeight) - halfOfTooltipHeight + 1 + "px";
                    if (arrowElemRef) {
                        arrowElemRef.setAttribute('style', "top: " + (halfOfTooltipHeight - 1) + "px");
                    }
                }
                else {
                    var pos = (overlayElemHeight - currentContainerHeight) / halfDelimiter;
                    var defaultTooltipPlacementTop = parseInt(this.overlayRef.overlayElement.style.top || '0px', 10);
                    this.overlayRef.overlayElement.style.top = defaultTooltipPlacementTop + pos - 1 + "px";
                }
            }
        };
        // tslint:disable-next-line:no-any
        McTooltip.prototype.updateCompValue = function (key, value) {
            if (this.isDynamicTooltip && value && this.tooltip) {
                this.tooltip[key] = value;
                this.tooltip.markForCheck();
            }
        };
        McTooltip.prototype.handleKeydown = function (e) {
            if (this.isTooltipOpen && e.keyCode === keycodes.ESCAPE) { // tslint:disable-line
                this.hide();
            }
        };
        McTooltip.prototype.handleTouchend = function () {
            this.hide();
        };
        McTooltip.prototype.initElementRefListeners = function () {
            var _this = this;
            this.clearListeners();
            if (this.mcTrigger === 'hover') {
                this.manualListeners
                    .set('mouseenter', function () { return _this.show(); })
                    .set('mouseleave', function () { return _this.hide(); })
                    .forEach(function (listener, event) { return _this.elementRef.nativeElement.addEventListener(event, listener); });
            }
            if (this.mcTrigger === 'focus') {
                this.manualListeners
                    .set('focus', function () { return _this.show(); })
                    .set('blur', function () { return _this.hide(); })
                    .forEach(function (listener, event) { return _this.elementRef.nativeElement.addEventListener(event, listener); });
            }
        };
        McTooltip.prototype.clearListeners = function () {
            var _this = this;
            this.manualListeners.forEach(function (listener, event) {
                _this.elementRef.nativeElement.removeEventListener(event, listener);
            });
            this.manualListeners.clear();
        };
        McTooltip.prototype.show = function () {
            var _this = this;
            if (this.disabled) {
                return;
            }
            if (!this.tooltip) {
                this.overlayRef = this.createOverlay();
                this.detach();
                this.portal = this.portal || new portal.ComponentPortal(McTooltipComponent, this.hostView);
                this.tooltip = this.overlayRef.attach(this.portal).instance;
                this.tooltip.afterHidden()
                    .pipe(operators.takeUntil(this.destroyed))
                    .subscribe(function () { return _this.detach(); });
                this.isDynamicTooltip = true;
                var properties = [
                    'mcTitle',
                    'mcPlacement',
                    'mcTrigger',
                    'mcTooltipDisabled',
                    'mcMouseEnterDelay',
                    'mcMouseLeaveDelay',
                    'mcTooltipClass'
                ];
                properties.forEach(function (property) { return _this.updateCompValue(property, _this[property]); });
                this.tooltip.mcVisibleChange
                    .pipe(operators.takeUntil(this.$unsubscribe), operators.distinctUntilChanged())
                    .subscribe(function (data) {
                    _this.mcVisible = data;
                    _this.mcVisibleChange.emit(data);
                    _this.isTooltipOpen = data;
                });
            }
            this.updatePosition();
            this.tooltip.show();
        };
        McTooltip.prototype.hide = function () {
            if (this.tooltip) {
                this.tooltip.hide();
            }
        };
        /** Updates the position of the current tooltip. */
        McTooltip.prototype.updatePosition = function () {
            if (!this.overlayRef) {
                this.overlayRef = this.createOverlay();
            }
            var position = this.overlayRef.getConfig().positionStrategy;
            var origin = this.getOrigin();
            var overlay = this.getOverlayPosition();
            position.withPositions([
                Object.assign(Object.assign({}, origin.main), overlay.main),
                Object.assign(Object.assign({}, origin.fallback), overlay.fallback)
            ]);
            if (this.tooltip) {
                position.apply();
                window.dispatchEvent(new Event('resize'));
            }
        };
        /**
         * Returns the origin position and a fallback position based on the user's position preference.
         * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
         */
        McTooltip.prototype.getOrigin = function () {
            var position = this.mcPlacement;
            var isLtr = !this.direction || this.direction.value === 'ltr';
            var originPosition;
            if (position === 'top' || position === 'bottom') {
                originPosition = { originX: 'center', originY: position === 'top' ? 'top' : 'bottom' };
            }
            else if (position === 'top' ||
                (position === 'left' && isLtr) ||
                (position === 'right' && !isLtr)) {
                originPosition = { originX: 'start', originY: 'center' };
            }
            else if (position === 'bottom' ||
                (position === 'right' && isLtr) ||
                (position === 'left' && !isLtr)) {
                originPosition = { originX: 'end', originY: 'center' };
            }
            else {
                throw getMcTooltipInvalidPositionError(position);
            }
            var _b = this.invertPosition(originPosition.originX, originPosition.originY), x = _b.x, y = _b.y;
            return {
                main: originPosition,
                fallback: { originX: x, originY: y }
            };
        };
        /** Returns the overlay position and a fallback position based on the user's preference */
        McTooltip.prototype.getOverlayPosition = function () {
            var position = this.mcPlacement;
            var isLtr = !this.direction || this.direction.value === 'ltr';
            var overlayPosition;
            if (position === 'top') {
                overlayPosition = { overlayX: 'center', overlayY: 'bottom' };
            }
            else if (position === 'bottom') {
                overlayPosition = { overlayX: 'center', overlayY: 'top' };
            }
            else if (position === 'top' ||
                (position === 'left' && isLtr) ||
                (position === 'right' && !isLtr)) {
                overlayPosition = { overlayX: 'end', overlayY: 'center' };
            }
            else if (position === 'bottom' ||
                (position === 'right' && isLtr) ||
                (position === 'left' && !isLtr)) {
                overlayPosition = { overlayX: 'start', overlayY: 'center' };
            }
            else {
                throw getMcTooltipInvalidPositionError(position);
            }
            var _b = this.invertPosition(overlayPosition.overlayX, overlayPosition.overlayY), x = _b.x, y = _b.y;
            return {
                main: overlayPosition,
                fallback: { overlayX: x, overlayY: y }
            };
        };
        /** Inverts an overlay position. */
        McTooltip.prototype.invertPosition = function (x, y) {
            var newX = x;
            var newY = y;
            if (this.mcPlacement === 'top' || this.mcPlacement === 'bottom') {
                if (y === 'top') {
                    newY = 'bottom';
                }
                else if (y === 'bottom') {
                    newY = 'top';
                }
            }
            else {
                if (x === 'end') {
                    newX = 'start';
                }
                else if (x === 'start') {
                    newX = 'end';
                }
            }
            return { x: newX, y: newY };
        };
        McTooltip.prototype.getTooltipArrowElem = function () {
            var _a;
            var arrowClassName = 'mc-tooltip-arrow';
            return (_a = this.overlayRef) === null || _a === void 0 ? void 0 : _a.overlayElement.getElementsByClassName(arrowClassName)[0];
        };
        return McTooltip;
    }());
    McTooltip.decorators = [
        { type: core$1.Directive, args: [{
                    selector: '[mcTooltip], [attribute^="mcTooltip"]',
                    exportAs: 'mcTooltip',
                    host: {
                        '[class.mc-tooltip-open]': 'isTooltipOpen',
                        '[class.disabled]': 'parentDisabled',
                        '(keydown)': 'handleKeydown($event)',
                        '(touchend)': 'handleTouchend()'
                    }
                },] }
    ];
    /** @nocollapse */
    McTooltip.ctorParameters = function () { return [
        { type: overlay.Overlay },
        { type: core$1.ElementRef },
        { type: core$1.NgZone },
        { type: overlay.ScrollDispatcher },
        { type: core$1.ViewContainerRef },
        { type: undefined, decorators: [{ type: core$1.Inject, args: [MC_TOOLTIP_SCROLL_STRATEGY,] }] },
        { type: bidi.Directionality, decorators: [{ type: core$1.Optional }] }
    ]; };
    McTooltip.propDecorators = {
        mcVisibleChange: [{ type: core$1.Output }],
        mcTitle: [{ type: core$1.Input, args: ['mcTooltip',] }],
        setTitle: [{ type: core$1.Input, args: ['mcTitle',] }],
        disabled: [{ type: core$1.Input, args: ['mcTooltipDisabled',] }],
        mcMouseEnterDelay: [{ type: core$1.Input }],
        mcMouseLeaveDelay: [{ type: core$1.Input }],
        mcTrigger: [{ type: core$1.Input }],
        mcPlacement: [{ type: core$1.Input }],
        mcTooltipClass: [{ type: core$1.Input }],
        mcVisible: [{ type: core$1.Input }],
        mcArrowPlacement: [{ type: core$1.Input }]
    };

    var McToolTipModule = /** @class */ (function () {
        function McToolTipModule() {
        }
        return McToolTipModule;
    }());
    McToolTipModule.decorators = [
        { type: core$1.NgModule, args: [{
                    declarations: [McTooltipComponent, McTooltip],
                    exports: [McTooltipComponent, McTooltip],
                    imports: [common.CommonModule, overlay.OverlayModule],
                    providers: [MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER],
                    entryComponents: [McTooltipComponent]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ArrowPlacements = ArrowPlacements;
    exports.MC_TOOLTIP_SCROLL_STRATEGY = MC_TOOLTIP_SCROLL_STRATEGY;
    exports.MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER;
    exports.McToolTipModule = McToolTipModule;
    exports.McTooltip = McTooltip;
    exports.McTooltipComponent = McTooltipComponent;
    exports.getMcTooltipInvalidPositionError = getMcTooltipInvalidPositionError;
    exports.mcTooltipScrollStrategyFactory = mcTooltipScrollStrategyFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-tooltip.umd.js.map
