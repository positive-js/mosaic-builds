(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/overlay'), require('@angular/common'), require('@angular/core'), require('@angular/cdk/bidi'), require('@angular/cdk/coercion'), require('@angular/cdk/portal'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/mosaic/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/tooltip', ['exports', '@angular/cdk/overlay', '@angular/common', '@angular/core', '@angular/cdk/bidi', '@angular/cdk/coercion', '@angular/cdk/portal', '@ptsecurity/cdk/keycodes', '@ptsecurity/mosaic/core', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.tooltip = {}), global.ng.cdk.overlay, global.ng.common, global.ng.core, global.ng.cdk.bidi, global.ng.cdk.coercion, global.ng.cdk.portal, global.keycodes, global.ptsecurity.mosaic.core, global.rxjs, global.rxjs.operators));
}(this, (function (exports, overlay, common, core, bidi, coercion, portal, keycodes, core$1, rxjs, operators) { 'use strict';

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

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
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
     * Generated from: tooltip.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McTooltipComponent = /** @class */ (function () {
        function McTooltipComponent(cdr) {
            this.cdr = cdr;
            this.prefix = 'mc-tooltip_placement';
            this.positions = __spread(core$1.DEFAULT_4_POSITIONS);
            this.classMap = {};
            this.mcVisibleChange = new core.EventEmitter();
            this.mcMouseEnterDelay = 400;
            this.mcMouseLeaveDelay = 0;
            this._mcTrigger = 'hover';
            this._mcPlacement = 'top';
            this._mcVisible = new rxjs.BehaviorSubject(false);
            /**
             * Subject for notifying that the tooltip has been hidden from the view
             */
            this.onHideSubject = new rxjs.Subject();
            this.closeOnInteraction = false;
            this.availablePositions = core$1.POSITION_MAP;
            this.$visible = this._mcVisible.asObservable();
        }
        Object.defineProperty(McTooltipComponent.prototype, "mcTitle", {
            get: /**
             * @return {?}
             */
            function () {
                return this._mcTitle;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._mcTitle = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McTooltipComponent.prototype, "mcTrigger", {
            get: /**
             * @return {?}
             */
            function () {
                return this._mcTrigger;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._mcTrigger = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McTooltipComponent.prototype, "mcPlacement", {
            get: /**
             * @return {?}
             */
            function () {
                return this._mcPlacement;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value !== this._mcPlacement) {
                    this._mcPlacement = value;
                    this.positions.unshift(core$1.POSITION_MAP[this.mcPlacement]);
                }
                else if (!value) {
                    this._mcPlacement = 'top';
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McTooltipComponent.prototype, "mcTooltipClass", {
            get: /**
             * @return {?}
             */
            function () {
                return this._mcTooltipClass;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._mcTooltipClass = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McTooltipComponent.prototype, "mcVisible", {
            get: /**
             * @return {?}
             */
            function () {
                return this._mcVisible.value;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                /** @type {?} */
                var visible = coercion.coerceBooleanProperty(value);
                if (visible && this._mcVisible.value !== visible) {
                    this.show();
                }
                else {
                    this.hide();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        McTooltipComponent.prototype.show = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.hideTid) {
                clearTimeout(this.hideTid);
            }
            if (!this.isContentEmpty()) {
                if (this.mcTrigger !== 'manual') {
                    this.closeOnInteraction = true;
                }
                this.showTid = setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this._mcVisible.next(true);
                    _this.mcVisibleChange.emit(true);
                    // Mark for check so if any parent component has set the
                    // ChangeDetectionStrategy to OnPush it will be checked anyways
                    _this.markForCheck();
                }), this.mcMouseEnterDelay);
            }
        };
        /**
         * @return {?}
         */
        McTooltipComponent.prototype.hide = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.showTid) {
                clearTimeout(this.showTid);
            }
            this.hideTid = setTimeout((/**
             * @return {?}
             */
            function () {
                _this._mcVisible.next(false);
                _this.mcVisibleChange.emit(false);
                _this.onHideSubject.next();
                // Mark for check so if any parent component has set the
                // ChangeDetectionStrategy to OnPush it will be checked anyways
                _this.markForCheck();
            }), this.mcMouseLeaveDelay);
        };
        /**
         * @return {?}
         */
        McTooltipComponent.prototype.setClassMap = /**
         * @return {?}
         */
        function () {
            var _a;
            this.classMap = (_a = {},
                _a[this.prefix + "-" + this.mcPlacement] = true,
                _a[this.mcTooltipClass] = true,
                _a);
        };
        /**
         * @return {?}
         */
        McTooltipComponent.prototype.isContentEmpty = /**
         * @return {?}
         */
        function () {
            return this.isTitleString ? (this.mcTitle === '' || !this.mcTitle) : false;
        };
        /** Returns an observable that notifies when the tooltip has been hidden from view. */
        /**
         * Returns an observable that notifies when the tooltip has been hidden from view.
         * @return {?}
         */
        McTooltipComponent.prototype.afterHidden = /**
         * Returns an observable that notifies when the tooltip has been hidden from view.
         * @return {?}
         */
        function () {
            return this.onHideSubject.asObservable();
        };
        /**
         * @return {?}
         */
        McTooltipComponent.prototype.markForCheck = /**
         * @return {?}
         */
        function () {
            this.cdr.markForCheck();
        };
        /**
         * @return {?}
         */
        McTooltipComponent.prototype.handleBodyInteraction = /**
         * @return {?}
         */
        function () {
            if (this.closeOnInteraction) {
                this.hide();
            }
        };
        Object.defineProperty(McTooltipComponent.prototype, "isTemplateRef", {
            get: /**
             * @return {?}
             */
            function () {
                return this.mcTitle instanceof core.TemplateRef;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McTooltipComponent.prototype, "isNonEmptyString", {
            get: /**
             * @return {?}
             */
            function () {
                return typeof this.mcTitle === 'string' && this._mcTitle !== '';
            },
            enumerable: true,
            configurable: true
        });
        McTooltipComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mc-tooltip-component',
                        animations: [core$1.fadeAnimation],
                        template: "<div class=\"mc-tooltip\"\n     [ngClass]=\"classMap\"\n     [@fadeAnimation]=\"''+($visible | async)\">\n    <div class=\"mc-tooltip-content\">\n        <div class=\"mc-tooltip-arrow\"></div>\n        <div class=\"mc-tooltip-inner\">\n            <ng-container *ngIf=\"isTemplateRef\" [ngTemplateOutlet]=\"mcTitle\"></ng-container>\n            <ng-container *ngIf=\"isNonEmptyString\">\n                <div [innerHTML]=\"mcTitle\"></div>\n            </ng-container>\n        </div>\n    </div>\n</div>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        preserveWhitespaces: false,
                        host: {
                            '(body:click)': 'this.handleBodyInteraction()'
                        },
                        styles: ["@-webkit-keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px);background-size:29px 29px;-webkit-animation:1s linear infinite mc-progress;animation:1s linear infinite mc-progress}.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%;position:fixed;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{top:0;bottom:0;left:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-pane{box-sizing:border-box;position:absolute;pointer-events:auto;margin:0;padding:0;z-index:1000;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box{box-sizing:border-box;position:absolute;z-index:1000;display:flex;flex-direction:column;margin:0;padding:0;min-width:1px;min-height:1px}.mc-tooltip{display:block;box-sizing:border-box;visibility:visible;position:relative;margin:0;padding:0;z-index:1060;max-width:240px;list-style:none;white-space:pre-line}.mc-tooltip_placement-top{padding-bottom:9px}.mc-tooltip_placement-right{padding-left:9px}.mc-tooltip_placement-bottom{padding-top:9px}.mc-tooltip_placement-left{padding-right:9px}.mc-tooltip-inner{padding:8px 16px;text-align:left;text-decoration:none;border-radius:3px;min-height:32px;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;vertical-align:center}.mc-tooltip-arrow{position:absolute;width:12px;height:12px;transform:rotate(45deg)}.mc-tooltip_placement-top .mc-tooltip-arrow{bottom:4px;left:50%;margin-left:-5px}.mc-tooltip_placement-right .mc-tooltip-arrow{left:4px;top:16px;margin-top:-5px}.mc-tooltip_placement-left .mc-tooltip-arrow{right:4px;top:16px;margin-top:-5px}.mc-tooltip_placement-bottom .mc-tooltip-arrow{top:4px;left:50%;margin-left:-5px}"]
                    }] }
        ];
        /** @nocollapse */
        McTooltipComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        McTooltipComponent.propDecorators = {
            mcVisibleChange: [{ type: core.Output }],
            mcMouseEnterDelay: [{ type: core.Input }],
            mcMouseLeaveDelay: [{ type: core.Input }],
            mcTitle: [{ type: core.Input }],
            mcTrigger: [{ type: core.Input }],
            mcPlacement: [{ type: core.Input }],
            mcTooltipClass: [{ type: core.Input }],
            mcVisible: [{ type: core.Input }]
        };
        return McTooltipComponent;
    }());
    if (false) {
        /** @type {?} */
        McTooltipComponent.prototype.prefix;
        /** @type {?} */
        McTooltipComponent.prototype.positions;
        /** @type {?} */
        McTooltipComponent.prototype.classMap;
        /** @type {?} */
        McTooltipComponent.prototype.isTitleString;
        /** @type {?} */
        McTooltipComponent.prototype.showTid;
        /** @type {?} */
        McTooltipComponent.prototype.hideTid;
        /** @type {?} */
        McTooltipComponent.prototype.availablePositions;
        /** @type {?} */
        McTooltipComponent.prototype.$visible;
        /** @type {?} */
        McTooltipComponent.prototype.mcVisibleChange;
        /** @type {?} */
        McTooltipComponent.prototype.mcMouseEnterDelay;
        /** @type {?} */
        McTooltipComponent.prototype.mcMouseLeaveDelay;
        /**
         * @type {?}
         * @private
         */
        McTooltipComponent.prototype._mcTitle;
        /**
         * @type {?}
         * @private
         */
        McTooltipComponent.prototype._mcTrigger;
        /**
         * @type {?}
         * @private
         */
        McTooltipComponent.prototype._mcTooltipClass;
        /**
         * @type {?}
         * @private
         */
        McTooltipComponent.prototype._mcPlacement;
        /**
         * @type {?}
         * @private
         */
        McTooltipComponent.prototype._mcVisible;
        /**
         * Subject for notifying that the tooltip has been hidden from the view
         * @type {?}
         * @private
         */
        McTooltipComponent.prototype.onHideSubject;
        /**
         * @type {?}
         * @private
         */
        McTooltipComponent.prototype.closeOnInteraction;
        /** @type {?} */
        McTooltipComponent.prototype.cdr;
    }
    /** @type {?} */
    var MC_TOOLTIP_SCROLL_STRATEGY = new core.InjectionToken('mc-tooltip-scroll-strategy');
    /**
     * \@docs-private
     * @param {?} overlay
     * @return {?}
     */
    function mcTooltipScrollStrategyFactory(overlay) {
        return (/**
         * @return {?}
         */
        function () { return overlay.scrollStrategies.reposition({ scrollThrottle: 20 }); });
    }
    /**
     * \@docs-private
     * @type {?}
     */
    var MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = {
        provide: MC_TOOLTIP_SCROLL_STRATEGY,
        deps: [overlay.Overlay],
        useFactory: mcTooltipScrollStrategyFactory
    };
    /**
     * Creates an error to be thrown if the user supplied an invalid tooltip position.
     * @param {?} position
     * @return {?}
     */
    function getMcTooltipInvalidPositionError(position) {
        return Error("McTooltip position \"" + position + "\" is invalid.");
    }
    /** @type {?} */
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
            this.mcVisibleChange = new core.EventEmitter();
            this.$unsubscribe = new rxjs.Subject();
            this._disabled = false;
            this._mcTrigger = 'hover';
            this._mcPlacement = 'top';
            this.manualListeners = new Map();
            this.destroyed = new rxjs.Subject();
            this.availablePositions = core$1.POSITION_MAP;
        }
        Object.defineProperty(McTooltip.prototype, "mcTitle", {
            get: /**
             * @return {?}
             */
            function () {
                return this._mcTitle;
            },
            set: /**
             * @param {?} title
             * @return {?}
             */
            function (title) {
                this._mcTitle = title;
                this.updateCompValue('mcTitle', title);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McTooltip.prototype, "setTitle", {
            set: /**
             * @param {?} title
             * @return {?}
             */
            function (title) {
                this.mcTitle = title;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McTooltip.prototype, "disabled", {
            get: /**
             * @return {?}
             */
            function () {
                return this._disabled;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
                this.updateCompValue('mcTooltipDisabled', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McTooltip.prototype, "mcMouseEnterDelay", {
            get: /**
             * @return {?}
             */
            function () {
                return this._mcMouseEnterDelay;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._mcMouseEnterDelay = value;
                this.updateCompValue('mcMouseEnterDelay', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McTooltip.prototype, "mcMouseLeaveDelay", {
            get: /**
             * @return {?}
             */
            function () {
                return this._mcMouseLeaveDelay;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._mcMouseLeaveDelay = value;
                this.updateCompValue('mcMouseLeaveDelay', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McTooltip.prototype, "mcTrigger", {
            get: /**
             * @return {?}
             */
            function () {
                return this._mcTrigger;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value) {
                    this._mcTrigger = value;
                    this.updateCompValue('mcTrigger', value);
                }
                else {
                    this._mcTrigger = 'hover';
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McTooltip.prototype, "mcPlacement", {
            get: /**
             * @return {?}
             */
            function () {
                return this._mcPlacement;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value) {
                    this._mcPlacement = value;
                    this.updateCompValue('mcPlacement', value);
                }
                else {
                    this._mcPlacement = 'top';
                }
                this.updatePosition();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McTooltip.prototype, "mcTooltipClass", {
            get: /**
             * @return {?}
             */
            function () {
                return this._mcTooltipClass;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value) {
                    this._mcTooltipClass = value;
                    this.updateCompValue('mcTooltipClass', value);
                }
                else {
                    this._mcTooltipClass = '';
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McTooltip.prototype, "mcVisible", {
            get: /**
             * @return {?}
             */
            function () {
                return this._mcVisible;
            },
            set: /**
             * @param {?} externalValue
             * @return {?}
             */
            function (externalValue) {
                /** @type {?} */
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
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McTooltip.prototype, "isOpen", {
            get: /**
             * @return {?}
             */
            function () {
                return this.isTooltipOpen;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McTooltip.prototype, "isParentDisabled", {
            get: /**
             * @return {?}
             */
            function () {
                return this.parentDisabled;
            },
            enumerable: true,
            configurable: true
        });
        /** Create the overlay config and position strategy */
        /**
         * Create the overlay config and position strategy
         * @return {?}
         */
        McTooltip.prototype.createOverlay = /**
         * Create the overlay config and position strategy
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.overlayRef) {
                return this.overlayRef;
            }
            // Create connected position strategy that listens for scroll events to reposition.
            /** @type {?} */
            var strategy = this.overlay.position()
                .flexibleConnectedTo(this.elementRef)
                .withTransformOriginOn('.mc-tooltip')
                .withFlexibleDimensions(false)
                .withViewportMargin(VIEWPORT_MARGIN)
                .withPositions(__spread(core$1.DEFAULT_4_POSITIONS));
            /** @type {?} */
            var scrollableAncestors = this.scrollDispatcher.getAncestorScrollContainers(this.elementRef);
            strategy.withScrollableContainers(scrollableAncestors);
            strategy.positionChanges
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe((/**
             * @param {?} change
             * @return {?}
             */
            function (change) {
                if (_this.tooltip) {
                    _this.onPositionChange(change);
                    if (change.scrollableViewProperties.isOverlayClipped && _this.tooltip.mcVisible) {
                        // After position changes occur and the overlay is clipped by
                        // a parent scrollable then close the tooltip.
                        _this.ngZone.run((/**
                         * @return {?}
                         */
                        function () { return _this.hide(); }));
                    }
                }
            }));
            this.overlayRef = this.overlay.create({
                direction: this.direction,
                positionStrategy: strategy,
                panelClass: 'mc-tooltip-panel',
                scrollStrategy: this.scrollStrategy()
            });
            this.updatePosition();
            this.overlayRef.detachments()
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe((/**
             * @return {?}
             */
            function () { return _this.detach(); }));
            return this.overlayRef;
        };
        /**
         * @return {?}
         */
        McTooltip.prototype.detach = /**
         * @return {?}
         */
        function () {
            if (this.overlayRef && this.overlayRef.hasAttached()) {
                this.overlayRef.detach();
            }
            this.tooltip = null;
        };
        /**
         * @param {?} $event
         * @return {?}
         */
        McTooltip.prototype.onPositionChange = /**
         * @param {?} $event
         * @return {?}
         */
        function ($event) {
            var _this = this;
            /** @type {?} */
            var updatedPlacement = this.mcPlacement;
            Object.keys(this.availablePositions).some((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                if ($event.connectionPair.originX === _this.availablePositions[key].originX &&
                    $event.connectionPair.originY === _this.availablePositions[key].originY &&
                    $event.connectionPair.overlayX === _this.availablePositions[key].overlayX &&
                    $event.connectionPair.overlayY === _this.availablePositions[key].overlayY) {
                    updatedPlacement = key;
                    return true;
                }
                return false;
            }));
            this.updateCompValue('mcPlacement', updatedPlacement);
            if (this.tooltip) {
                this.tooltip.setClassMap();
                this.tooltip.markForCheck();
            }
            this.handlePositioningUpdate();
        };
        /**
         * @return {?}
         */
        McTooltip.prototype.handlePositioningUpdate = /**
         * @return {?}
         */
        function () {
            if (!this.overlayRef) {
                this.overlayRef = this.createOverlay();
            }
            if (this.mcPlacement === 'right' || this.mcPlacement === 'left') {
                /** @type {?} */
                var pos = (this.overlayRef.overlayElement.clientHeight -
                    this.hostView.element.nativeElement.clientHeight) / 2;
                // tslint:disable-line
                /** @type {?} */
                var currentContainer = this.overlayRef.overlayElement.style.top || '0px';
                this.overlayRef.overlayElement.style.top =
                    parseInt(currentContainer.split('px')[0], 10) + pos - 1 + "px";
                // TODO: обновлять положение стрелки\указателя\"дятла"
            }
        };
        // tslint:disable-next-line:no-any
        // tslint:disable-next-line:no-any
        /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        McTooltip.prototype.updateCompValue = 
        // tslint:disable-next-line:no-any
        /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        function (key, value) {
            if (this.isDynamicTooltip && value && this.tooltip) {
                this.tooltip[key] = value;
                this.tooltip.markForCheck();
            }
        };
        /**
         * @return {?}
         */
        McTooltip.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.initElementRefListeners();
        };
        /**
         * @return {?}
         */
        McTooltip.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.overlayRef) {
                this.overlayRef.dispose();
            }
            this.manualListeners.forEach((/**
             * @param {?} listener
             * @param {?} event
             * @return {?}
             */
            function (listener, event) {
                _this.elementRef.nativeElement.removeEventListener(event, listener);
            }));
            this.manualListeners.clear();
            this.$unsubscribe.next();
            this.$unsubscribe.complete();
        };
        /**
         * @param {?} e
         * @return {?}
         */
        McTooltip.prototype.handleKeydown = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (this.isTooltipOpen && e.keyCode === keycodes.ESCAPE) { // tslint:disable-line
                this.hide();
            }
        };
        /**
         * @return {?}
         */
        McTooltip.prototype.handleTouchend = /**
         * @return {?}
         */
        function () {
            this.hide();
        };
        /**
         * @return {?}
         */
        McTooltip.prototype.initElementRefListeners = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.mcTrigger === 'hover') {
                this.manualListeners
                    .set('mouseenter', (/**
                 * @return {?}
                 */
                function () { return _this.show(); }))
                    .set('mouseleave', (/**
                 * @return {?}
                 */
                function () { return _this.hide(); }))
                    .forEach((/**
                 * @param {?} listener
                 * @param {?} event
                 * @return {?}
                 */
                function (listener, event) { return _this.elementRef.nativeElement.addEventListener(event, listener); }));
            }
            if (this.mcTrigger === 'focus') {
                this.manualListeners
                    .set('focus', (/**
                 * @return {?}
                 */
                function () { return _this.show(); }))
                    .set('blur', (/**
                 * @return {?}
                 */
                function () { return _this.hide(); }))
                    .forEach((/**
                 * @param {?} listener
                 * @param {?} event
                 * @return {?}
                 */
                function (listener, event) { return _this.elementRef.nativeElement.addEventListener(event, listener); }));
            }
        };
        /**
         * @return {?}
         */
        McTooltip.prototype.show = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this.disabled) {
                if (!this.tooltip) {
                    /** @type {?} */
                    var overlayRef = this.createOverlay();
                    this.detach();
                    this.portal = this.portal || new portal.ComponentPortal(McTooltipComponent, this.hostView);
                    this.tooltip = overlayRef.attach(this.portal).instance;
                    this.tooltip.afterHidden()
                        .pipe(operators.takeUntil(this.destroyed))
                        .subscribe((/**
                     * @return {?}
                     */
                    function () { return _this.detach(); }));
                    this.isDynamicTooltip = true;
                    /** @type {?} */
                    var properties = [
                        'mcTitle',
                        'mcPlacement',
                        'mcTrigger',
                        'mcTooltipDisabled',
                        'mcMouseEnterDelay',
                        'mcMouseLeaveDelay',
                        'mcTooltipClass'
                    ];
                    properties.forEach((/**
                     * @param {?} property
                     * @return {?}
                     */
                    function (property) { return _this.updateCompValue(property, _this[property]); }));
                    this.tooltip.mcVisibleChange.pipe(operators.takeUntil(this.$unsubscribe), operators.distinctUntilChanged())
                        .subscribe((/**
                     * @param {?} data
                     * @return {?}
                     */
                    function (data) {
                        _this.mcVisible = data;
                        _this.mcVisibleChange.emit(data);
                        _this.isTooltipOpen = data;
                    }));
                }
                this.updatePosition();
                this.tooltip.show();
            }
        };
        /**
         * @return {?}
         */
        McTooltip.prototype.hide = /**
         * @return {?}
         */
        function () {
            if (this.tooltip) {
                this.tooltip.hide();
            }
        };
        /** Updates the position of the current tooltip. */
        /**
         * Updates the position of the current tooltip.
         * @return {?}
         */
        McTooltip.prototype.updatePosition = /**
         * Updates the position of the current tooltip.
         * @return {?}
         */
        function () {
            if (!this.overlayRef) {
                this.overlayRef = this.createOverlay();
            }
            /** @type {?} */
            var position = (/** @type {?} */ (this.overlayRef.getConfig().positionStrategy));
            /** @type {?} */
            var origin = this.getOrigin();
            /** @type {?} */
            var overlay = this.getOverlayPosition();
            position.withPositions([
                __assign(__assign({}, origin.main), overlay.main),
                __assign(__assign({}, origin.fallback), overlay.fallback)
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
        /**
         * Returns the origin position and a fallback position based on the user's position preference.
         * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
         * @return {?}
         */
        McTooltip.prototype.getOrigin = /**
         * Returns the origin position and a fallback position based on the user's position preference.
         * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
         * @return {?}
         */
        function () {
            /** @type {?} */
            var position = this.mcPlacement;
            /** @type {?} */
            var isLtr = !this.direction || this.direction.value === 'ltr';
            /** @type {?} */
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
            var _a = this.invertPosition(originPosition.originX, originPosition.originY), x = _a.x, y = _a.y;
            return {
                main: originPosition,
                fallback: { originX: x, originY: y }
            };
        };
        /** Returns the overlay position and a fallback position based on the user's preference */
        /**
         * Returns the overlay position and a fallback position based on the user's preference
         * @return {?}
         */
        McTooltip.prototype.getOverlayPosition = /**
         * Returns the overlay position and a fallback position based on the user's preference
         * @return {?}
         */
        function () {
            /** @type {?} */
            var position = this.mcPlacement;
            /** @type {?} */
            var isLtr = !this.direction || this.direction.value === 'ltr';
            /** @type {?} */
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
            var _a = this.invertPosition(overlayPosition.overlayX, overlayPosition.overlayY), x = _a.x, y = _a.y;
            return {
                main: overlayPosition,
                fallback: { overlayX: x, overlayY: y }
            };
        };
        /** Inverts an overlay position. */
        /**
         * Inverts an overlay position.
         * @private
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        McTooltip.prototype.invertPosition = /**
         * Inverts an overlay position.
         * @private
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (x, y) {
            /** @type {?} */
            var newX = x;
            /** @type {?} */
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
        McTooltip.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mcTooltip], [attribute^="mcTooltip"]',
                        exportAs: 'mcTooltip',
                        host: {
                            '(keydown)': 'handleKeydown($event)',
                            '(touchend)': 'handleTouchend()'
                        }
                    },] }
        ];
        /** @nocollapse */
        McTooltip.ctorParameters = function () { return [
            { type: overlay.Overlay },
            { type: core.ElementRef },
            { type: core.NgZone },
            { type: overlay.ScrollDispatcher },
            { type: core.ViewContainerRef },
            { type: undefined, decorators: [{ type: core.Inject, args: [MC_TOOLTIP_SCROLL_STRATEGY,] }] },
            { type: bidi.Directionality, decorators: [{ type: core.Optional }] }
        ]; };
        McTooltip.propDecorators = {
            mcVisibleChange: [{ type: core.Output }],
            mcTitle: [{ type: core.Input, args: ['mcTooltip',] }],
            setTitle: [{ type: core.Input, args: ['mcTitle',] }],
            disabled: [{ type: core.Input, args: ['mcTooltipDisabled',] }],
            mcMouseEnterDelay: [{ type: core.Input, args: ['mcMouseEnterDelay',] }],
            mcMouseLeaveDelay: [{ type: core.Input, args: ['mcMouseLeaveDelay',] }],
            mcTrigger: [{ type: core.Input, args: ['mcTrigger',] }],
            mcPlacement: [{ type: core.Input, args: ['mcPlacement',] }],
            mcTooltipClass: [{ type: core.Input, args: ['mcTooltipClass',] }],
            mcVisible: [{ type: core.Input, args: ['mcVisible',] }],
            isOpen: [{ type: core.HostBinding, args: ['class.mc-tooltip-open',] }],
            isParentDisabled: [{ type: core.HostBinding, args: ['class.disabled',] }]
        };
        return McTooltip;
    }());
    if (false) {
        /** @type {?} */
        McTooltip.prototype.isTooltipOpen;
        /** @type {?} */
        McTooltip.prototype.isDynamicTooltip;
        /** @type {?} */
        McTooltip.prototype.parentDisabled;
        /** @type {?} */
        McTooltip.prototype.overlayRef;
        /** @type {?} */
        McTooltip.prototype.portal;
        /** @type {?} */
        McTooltip.prototype.availablePositions;
        /** @type {?} */
        McTooltip.prototype.tooltip;
        /** @type {?} */
        McTooltip.prototype.mcVisibleChange;
        /**
         * @type {?}
         * @private
         */
        McTooltip.prototype.$unsubscribe;
        /**
         * @type {?}
         * @private
         */
        McTooltip.prototype._mcTitle;
        /**
         * @type {?}
         * @private
         */
        McTooltip.prototype._disabled;
        /**
         * @type {?}
         * @private
         */
        McTooltip.prototype._mcMouseEnterDelay;
        /**
         * @type {?}
         * @private
         */
        McTooltip.prototype._mcMouseLeaveDelay;
        /**
         * @type {?}
         * @private
         */
        McTooltip.prototype._mcTrigger;
        /**
         * @type {?}
         * @private
         */
        McTooltip.prototype._mcPlacement;
        /**
         * @type {?}
         * @private
         */
        McTooltip.prototype._mcTooltipClass;
        /**
         * @type {?}
         * @private
         */
        McTooltip.prototype._mcVisible;
        /**
         * @type {?}
         * @private
         */
        McTooltip.prototype.manualListeners;
        /**
         * @type {?}
         * @private
         */
        McTooltip.prototype.destroyed;
        /**
         * @type {?}
         * @private
         */
        McTooltip.prototype.overlay;
        /**
         * @type {?}
         * @private
         */
        McTooltip.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        McTooltip.prototype.ngZone;
        /**
         * @type {?}
         * @private
         */
        McTooltip.prototype.scrollDispatcher;
        /**
         * @type {?}
         * @private
         */
        McTooltip.prototype.hostView;
        /**
         * @type {?}
         * @private
         */
        McTooltip.prototype.scrollStrategy;
        /**
         * @type {?}
         * @private
         */
        McTooltip.prototype.direction;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: tooltip.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McToolTipModule = /** @class */ (function () {
        function McToolTipModule() {
        }
        McToolTipModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [McTooltipComponent, McTooltip],
                        exports: [McTooltipComponent, McTooltip],
                        imports: [common.CommonModule, overlay.OverlayModule],
                        providers: [MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER],
                        entryComponents: [McTooltipComponent]
                    },] }
        ];
        return McToolTipModule;
    }());

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
