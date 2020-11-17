(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/cdk/overlay'), require('@angular/common'), require('@angular/core'), require('@angular/cdk/bidi'), require('@angular/cdk/coercion'), require('@angular/cdk/portal'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/mosaic/core'), require('rxjs'), require('rxjs/operators'), require('@angular/animations')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/popover', ['exports', '@angular/cdk/a11y', '@angular/cdk/overlay', '@angular/common', '@angular/core', '@angular/cdk/bidi', '@angular/cdk/coercion', '@angular/cdk/portal', '@ptsecurity/cdk/keycodes', '@ptsecurity/mosaic/core', 'rxjs', 'rxjs/operators', '@angular/animations'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.popover = {}), global.ng.cdk.a11y, global.ng.cdk.overlay, global.ng.common, global.ng.core, global.ng.cdk.bidi, global.ng.cdk.coercion, global.ng.cdk.portal, global.keycodes, global.ptsecurity.mosaic.core, global.rxjs, global.rxjs.operators, global.ng.animations));
}(this, (function (exports, a11y, overlay, common, core$1, bidi, coercion, portal, keycodes, core, rxjs, operators, animations) { 'use strict';

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

    /**
     * @fileoverview added by tsickle
     * Generated from: popover-animations.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var mcPopoverAnimations = {
        /**
         * Animation that transitions a tooltip in and out.
         */
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

    /** @enum {string} */
    var PopoverTriggers = {
        Click: "click",
        Focus: "focus",
        Hover: "hover",
    };
    /** @enum {string} */
    var PopoverVisibility = {
        Initial: "initial",
        Visible: "visible",
        Hidden: "hidden",
    };
    var McPopoverComponent = /** @class */ (function () {
        /**
         * @param {?} changeDetectorRef
         * @param {?} componentElementRef
         */
        function McPopoverComponent(changeDetectorRef, componentElementRef) {
            this.changeDetectorRef = changeDetectorRef;
            this.componentElementRef = componentElementRef;
            this.positions = __spread(core.EXTENDED_OVERLAY_POSITIONS);
            this.popoverVisibility = PopoverVisibility.Initial;
            this.closeOnInteraction = false;
            this.mcVisibleChange = new core$1.EventEmitter();
            this._mcTrigger = PopoverTriggers.Hover;
            this._mcPlacement = 'top';
            this._mcVisible = new rxjs.BehaviorSubject(false);
            this._classList = [];
            /**
             * Subject for notifying that the popover has been hidden from the view
             */
            this.onHideSubject = new rxjs.Subject();
            this.availablePositions = core.POSITION_MAP;
        }
        Object.defineProperty(McPopoverComponent.prototype, "mcTrigger", {
            /**
             * @return {?}
             */
            get: function () {
                return this._mcTrigger;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._mcTrigger = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopoverComponent.prototype, "mcPlacement", {
            /**
             * @return {?}
             */
            get: function () {
                return this._mcPlacement;
            },
            /**
             * @param {?} value
             * @return {?}
             */
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
        Object.defineProperty(McPopoverComponent.prototype, "mcPopoverSize", {
            /**
             * @return {?}
             */
            get: function () {
                return this.popoverSize;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                if (value !== this.popoverSize) {
                    this.popoverSize = value;
                }
                else if (!value) {
                    this.popoverSize = 'normal';
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopoverComponent.prototype, "mcVisible", {
            /**
             * @return {?}
             */
            get: function () {
                return this._mcVisible.value;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                /** @type {?} */
                var visible = coercion.coerceBooleanProperty(value);
                if (this._mcVisible.value !== visible) {
                    this._mcVisible.next(visible);
                    this.mcVisibleChange.emit(visible);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopoverComponent.prototype, "classList", {
            /**
             * @return {?}
             */
            get: function () {
                return this._classList.join(' ');
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                /** @type {?} */
                var list = [];
                if (Array.isArray(value)) {
                    list = value;
                }
                else {
                    list.push(value);
                }
                this._classList = list;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopoverComponent.prototype, "getCssClassesList", {
            /**
             * @return {?}
             */
            get: function () {
                return this.classList + " mc-popover-" + this.mcPopoverSize + " mc-popover_placement-" + this.getPlacementClass;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopoverComponent.prototype, "getPlacementClass", {
            /**
             * @return {?}
             */
            get: function () {
                return core.POSITION_TO_CSS_MAP[this.mcPlacement];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopoverComponent.prototype, "isOpen", {
            /**
             * @return {?}
             */
            get: function () {
                return this.popoverVisibility === PopoverVisibility.Visible;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @param {?} e
         * @return {?}
         */
        McPopoverComponent.prototype.handleKeydown = function (e) {
            // tslint:disable-next-line: deprecation
            if (this.isOpen && e.keyCode === keycodes.ESCAPE) {
                this.hide();
            }
        };
        /**
         * @return {?}
         */
        McPopoverComponent.prototype.show = function () {
            if (this.isNonEmptyContent()) {
                this.closeOnInteraction = true;
                this.popoverVisibility = PopoverVisibility.Visible;
                this._mcVisible.next(true);
                this.mcVisibleChange.emit(true);
                // Mark for check so if any parent component has set the
                // ChangeDetectionStrategy to OnPush it will be checked anyways
                this.markForCheck();
            }
        };
        /**
         * @return {?}
         */
        McPopoverComponent.prototype.hide = function () {
            this.popoverVisibility = PopoverVisibility.Hidden;
            this._mcVisible.next(false);
            this.mcVisibleChange.emit(false);
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            this.markForCheck();
        };
        /**
         * @return {?}
         */
        McPopoverComponent.prototype.isNonEmptyContent = function () {
            return !!this.mcContent && (this.isTemplateRef(this.mcContent) || this.isNonEmptyString(this.mcContent));
        };
        /**
         * Returns an observable that notifies when the popover has been hidden from view.
         * @return {?}
         */
        McPopoverComponent.prototype.afterHidden = function () {
            return this.onHideSubject.asObservable();
        };
        /**
         * @return {?}
         */
        McPopoverComponent.prototype.isVisible = function () {
            return this.popoverVisibility === PopoverVisibility.Visible;
        };
        /**
         * @return {?}
         */
        McPopoverComponent.prototype.markForCheck = function () {
            this.changeDetectorRef.markForCheck();
        };
        /**
         * @param {?} value
         * @return {?}
         */
        McPopoverComponent.prototype.isTemplateRef = function (value) {
            return value instanceof core$1.TemplateRef;
        };
        /**
         * @param {?} value
         * @return {?}
         */
        McPopoverComponent.prototype.isNonEmptyString = function (value) {
            return typeof value === 'string' && value !== '';
        };
        /**
         * @return {?}
         */
        McPopoverComponent.prototype.animationStart = function () {
            this.closeOnInteraction = false;
        };
        /**
         * @param {?} event
         * @return {?}
         */
        McPopoverComponent.prototype.animationDone = function (event) {
            /** @type {?} */
            var toState = ( /** @type {?} */(event.toState));
            if (toState === PopoverVisibility.Hidden && !this.isVisible()) {
                this.onHideSubject.next();
            }
            if (toState === PopoverVisibility.Visible || toState === PopoverVisibility.Hidden) {
                this.closeOnInteraction = true;
            }
        };
        /**
         * @return {?}
         */
        McPopoverComponent.prototype.ngOnDestroy = function () {
            this.onHideSubject.complete();
        };
        return McPopoverComponent;
    }());
    McPopoverComponent.decorators = [
        { type: core$1.Component, args: [{
                    selector: 'mc-popover',
                    template: "<div class=\"mc-popover\"\n     [ngClass]=\"classList\"\n     [@state]=\"popoverVisibility\"\n     (@state.start)=\"animationStart()\"\n     (@state.done)=\"animationDone($event)\">\n    <div class=\"mc-popover__container\">\n        <div class=\"mc-popover__header\" *ngIf=\"mcHeader\">\n            <ng-container *ngIf=\"isTemplateRef(mcHeader)\" [ngTemplateOutlet]=\"mcHeader\"></ng-container>\n            <ng-container *ngIf=\"isNonEmptyString(mcHeader)\">\n                <div [innerHTML]=\"mcHeader\"></div>\n            </ng-container>\n        </div>\n        <div class=\"mc-popover__content\" *ngIf=\"mcContent\">\n            <ng-container *ngIf=\"isTemplateRef(mcContent)\" [ngTemplateOutlet]=\"mcContent\"></ng-container>\n            <ng-container *ngIf=\"isNonEmptyString(mcContent)\">\n                <div [innerHTML]=\"mcContent\"></div>\n            </ng-container>\n        </div>\n        <div class=\"mc-popover__footer\" *ngIf=\"mcFooter\">\n            <ng-container *ngIf=\"isTemplateRef(mcFooter)\" [ngTemplateOutlet]=\"mcFooter\"></ng-container>\n            <ng-container *ngIf=\"isNonEmptyString(mcFooter)\">\n                <div [innerHTML]=\"mcFooter\"></div>\n            </ng-container>\n        </div>\n    </div>\n    <div class=\"mc-popover__arrow\"\n         [ngClass]=\"{ 'mc-popover__arrow_with-footer': mcFooter }\"></div>\n</div>\n",
                    preserveWhitespaces: false,
                    encapsulation: core$1.ViewEncapsulation.None,
                    changeDetection: core$1.ChangeDetectionStrategy.OnPush,
                    animations: [mcPopoverAnimations.popoverState],
                    host: {
                        '[class]': 'getCssClassesList',
                        '(keydown)': 'handleKeydown($event)'
                    },
                    styles: ["@-webkit-keyframes mc-progress{0%{background-position:0 0}to{background-position:29px 0}}@keyframes mc-progress{0%{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{-webkit-animation:mc-progress 1s linear infinite;animation:mc-progress 1s linear infinite;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 0,transparent 20px,rgba(0,0,0,.05) 0,rgba(0,0,0,.05) 30px,transparent 0) repeat;background-size:29px 29px;border-radius:inherit;bottom:0;content:\"\";left:0;position:absolute;right:0;top:0}.cdk-overlay-container{height:100%;pointer-events:none;position:fixed;width:100%}.cdk-overlay-backdrop,.cdk-overlay-container{box-sizing:border-box;left:0;margin:0;padding:0;top:0;z-index:1000}.cdk-overlay-backdrop{-webkit-tap-highlight-color:transparent;bottom:0;opacity:0;pointer-events:auto;position:absolute;right:0;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.cdk-overlay-pane{max-height:100%;max-width:100%;pointer-events:auto}.cdk-overlay-connected-position-bounding-box,.cdk-overlay-pane{box-sizing:border-box;margin:0;padding:0;position:absolute;z-index:1000}.cdk-overlay-connected-position-bounding-box{display:flex;flex-direction:column;min-height:1px;min-width:1px}.mc-popover{border-radius:4px;border-style:solid;border-width:1px;box-sizing:border-box;display:block;list-style:none;margin:0;padding:0;position:relative;visibility:visible;white-space:pre-line;z-index:1060}.mc-popover-small,.mc-popover-small .mc-popover{max-width:280px}.mc-popover-normal,.mc-popover-normal .mc-popover{max-width:400px}.mc-popover-large,.mc-popover-large .mc-popover{max-width:640px}.mc-popover__container{border-radius:4px;overflow:hidden}.mc-popover__header{border-bottom-style:solid;border-bottom-width:1px;padding:10px 16px}.mc-popover__content{padding:16px}.mc-popover__footer{border-top-style:solid;border-top-width:1px;margin-top:8px;padding:12px 16px}.mc-popover_placement-top-left .mc-popover,.mc-popover_placement-top-right .mc-popover,.mc-popover_placement-top .mc-popover{margin-bottom:8px}.mc-popover_placement-right-bottom .mc-popover,.mc-popover_placement-right-top .mc-popover,.mc-popover_placement-right .mc-popover{margin-left:8px}.mc-popover_placement-bottom-left .mc-popover,.mc-popover_placement-bottom-right .mc-popover,.mc-popover_placement-bottom .mc-popover{margin-top:8px}.mc-popover_placement-left-bottom .mc-popover,.mc-popover_placement-left-top .mc-popover,.mc-popover_placement-left .mc-popover{margin-right:8px}.mc-popover__arrow{border:1px solid;height:14px;position:absolute;transform:rotate(45deg);width:14px;z-index:-1}.mc-popover_placement-top .mc-popover__arrow{bottom:-6px;left:50%;margin-left:-4px}.mc-popover_placement-top-left .mc-popover__arrow{bottom:-6px;left:20px;margin-left:0}.mc-popover_placement-top-right .mc-popover__arrow{bottom:-6px;margin-left:0;right:20px}.mc-popover_placement-right .mc-popover__arrow{left:-6px;margin-top:-4px;top:50%}.mc-popover_placement-right-top .mc-popover__arrow{left:-6px;margin-top:-4px;top:18px}.mc-popover_placement-right-bottom .mc-popover__arrow{bottom:14px;left:-6px;margin-top:-4px}.mc-popover_placement-left .mc-popover__arrow{margin-top:-4px;right:-6px;top:50%}.mc-popover_placement-left-top .mc-popover__arrow{margin-top:-4px;right:-6px;top:18px}.mc-popover_placement-left-bottom .mc-popover__arrow{bottom:14px;margin-top:-4px;right:-6px}.mc-popover_placement-bottom .mc-popover__arrow{left:50%;margin-left:-4px;top:-6px}.mc-popover_placement-bottom-left .mc-popover__arrow{left:20px;margin-left:0;top:-6px}.mc-popover_placement-bottom-right .mc-popover__arrow{margin-left:0;right:20px;top:-6px}"]
                }] }
    ];
    /** @nocollapse */
    McPopoverComponent.ctorParameters = function () { return [
        { type: core$1.ChangeDetectorRef },
        { type: core$1.ElementRef }
    ]; };
    McPopoverComponent.propDecorators = {
        mcVisibleChange: [{ type: core$1.Output, args: ['mcPopoverVisibleChange',] }]
    };
    if (false) {
        /** @type {?} */
        McPopoverComponent.prototype.positions;
        /** @type {?} */
        McPopoverComponent.prototype.availablePositions;
        /** @type {?} */
        McPopoverComponent.prototype.popoverVisibility;
        /** @type {?} */
        McPopoverComponent.prototype.closeOnInteraction;
        /** @type {?} */
        McPopoverComponent.prototype.mcContent;
        /** @type {?} */
        McPopoverComponent.prototype.mcHeader;
        /** @type {?} */
        McPopoverComponent.prototype.mcFooter;
        /** @type {?} */
        McPopoverComponent.prototype.mcVisibleChange;
        /**
         * @type {?}
         * @private
         */
        McPopoverComponent.prototype._mcTrigger;
        /**
         * @type {?}
         * @private
         */
        McPopoverComponent.prototype._mcPlacement;
        /**
         * @type {?}
         * @private
         */
        McPopoverComponent.prototype.popoverSize;
        /**
         * @type {?}
         * @private
         */
        McPopoverComponent.prototype._mcVisible;
        /**
         * @type {?}
         * @private
         */
        McPopoverComponent.prototype._classList;
        /**
         * Subject for notifying that the popover has been hidden from the view
         * @type {?}
         * @private
         */
        McPopoverComponent.prototype.onHideSubject;
        /** @type {?} */
        McPopoverComponent.prototype.changeDetectorRef;
        /** @type {?} */
        McPopoverComponent.prototype.componentElementRef;
    }
    /** @type {?} */
    var MC_POPOVER_SCROLL_STRATEGY = new core$1.InjectionToken('mc-popover-scroll-strategy');
    /**
     * \@docs-private
     * @param {?} overlay
     * @return {?}
     */
    function mcPopoverScrollStrategyFactory(overlay) {
        return ( /**
         * @return {?}
         */function () { return overlay.scrollStrategies.reposition({ scrollThrottle: 20 }); });
    }
    /**
     * \@docs-private
     * @type {?}
     */
    var MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
        provide: MC_POPOVER_SCROLL_STRATEGY,
        deps: [overlay.Overlay],
        useFactory: mcPopoverScrollStrategyFactory
    };
    /**
     * Creates an error to be thrown if the user supplied an invalid popover position.
     * @param {?} position
     * @return {?}
     */
    function getMcPopoverInvalidPositionError(position) {
        return Error("McPopover position \"" + position + "\" is invalid.");
    }
    /** @type {?} */
    var VIEWPORT_MARGIN = 8;
    /* Constant distance between popover container border
    *  corner according to popover placement and middle of arrow
    * */
    /** @type {?} */
    var POPOVER_ARROW_BORDER_DISTANCE = 20;
    // tslint:disable-line
    /* Constant value for min height and width of anchor element used for popover.
    *  Set as POPOVER_ARROW_BORDER_DISTANCE multiplied by 2
    *  plus 2px border for both sides of element. Used in check of position management.
    * */
    /** @type {?} */
    var ANCHOR_MIN_HEIGHT_WIDTH = 44;
    // tslint:disable-line
    var McPopover = /** @class */ (function () {
        /**
         * @param {?} overlay
         * @param {?} elementRef
         * @param {?} ngZone
         * @param {?} scrollDispatcher
         * @param {?} hostView
         * @param {?} scrollStrategy
         * @param {?} direction
         */
        function McPopover(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) {
            var _this = this;
            this.overlay = overlay;
            this.elementRef = elementRef;
            this.ngZone = ngZone;
            this.scrollDispatcher = scrollDispatcher;
            this.hostView = hostView;
            this.scrollStrategy = scrollStrategy;
            this.direction = direction;
            this.isPopoverOpen = false;
            this.isDynamicPopover = false;
            this.backdropClass = 'cdk-overlay-transparent-backdrop';
            this.mcVisibleChange = new core$1.EventEmitter();
            this.mcPositionStrategyPlacementChange = new core$1.EventEmitter();
            this._hasBackdrop = false;
            this.$unsubscribe = new rxjs.Subject();
            this._disabled = false;
            this._mcTrigger = PopoverTriggers.Click;
            this.popoverSize = 'normal';
            this._mcPlacementPriority = null;
            this._mcPlacement = 'top';
            this.closeSubscription = rxjs.Subscription.EMPTY;
            this.manualListeners = new Map();
            this.destroyed = new rxjs.Subject();
            this.resizeListener = ( /**
             * @return {?}
             */function () { return _this.updatePosition(); });
            this.availablePositions = core.POSITION_MAP;
            this.defaultPositionsMap = core.DEFAULT_4_POSITIONS_TO_CSS_MAP;
        }
        Object.defineProperty(McPopover.prototype, "hasBackdrop", {
            /**
             * @return {?}
             */
            get: function () {
                return this._hasBackdrop;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._hasBackdrop = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopover.prototype, "mcHeader", {
            /**
             * @return {?}
             */
            get: function () {
                return this._mcHeader;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._mcHeader = value;
                this.updateCompValue('mcHeader', value);
                if (this.isPopoverOpen) {
                    this.updatePosition(true);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopover.prototype, "mcContent", {
            /**
             * @return {?}
             */
            get: function () {
                return this._mcContent;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._mcContent = value;
                this.updateCompValue('mcContent', value);
                if (this.isPopoverOpen) {
                    this.updatePosition(true);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopover.prototype, "mcFooter", {
            /**
             * @return {?}
             */
            get: function () {
                return this._mcFooter;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._mcFooter = value;
                this.updateCompValue('mcFooter', value);
                if (this.isPopoverOpen) {
                    this.updatePosition(true);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopover.prototype, "disabled", {
            /**
             * @return {?}
             */
            get: function () {
                return this._disabled;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopover.prototype, "mcMouseEnterDelay", {
            /**
             * @return {?}
             */
            get: function () {
                return this._mcMouseEnterDelay;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._mcMouseEnterDelay = value;
                this.updateCompValue('mcMouseEnterDelay', value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopover.prototype, "mcMouseLeaveDelay", {
            /**
             * @return {?}
             */
            get: function () {
                return this._mcMouseLeaveDelay;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._mcMouseLeaveDelay = value;
                this.updateCompValue('mcMouseLeaveDelay', value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopover.prototype, "mcTrigger", {
            /**
             * @return {?}
             */
            get: function () {
                return this._mcTrigger;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                if (value) {
                    this._mcTrigger = value;
                    this.updateCompValue('mcTrigger', value);
                }
                else {
                    this._mcTrigger = PopoverTriggers.Click;
                }
                this.resetListeners();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopover.prototype, "mcPopoverSize", {
            /**
             * @return {?}
             */
            get: function () {
                return this.popoverSize;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                if (value && (value === 'small' || value === 'normal' || value === 'large')) {
                    this.popoverSize = value;
                    this.updateCompValue('mcPopoverSize', value);
                }
                else {
                    this.popoverSize = 'normal';
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopover.prototype, "mcPlacementPriority", {
            /**
             * @return {?}
             */
            get: function () {
                return this._mcPlacementPriority;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                if (value && value.length > 0) {
                    this._mcPlacementPriority = value;
                }
                else {
                    this._mcPlacementPriority = null;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopover.prototype, "mcPlacement", {
            /**
             * @return {?}
             */
            get: function () {
                return this._mcPlacement;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                if (value) {
                    this._mcPlacement = value;
                    this.updateCompValue('mcPlacement', value);
                }
                else {
                    this._mcPlacement = 'top';
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopover.prototype, "classList", {
            /**
             * @return {?}
             */
            get: function () {
                return this._classList;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._classList = value;
                this.updateCompValue('classList', this._classList);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopover.prototype, "mcVisible", {
            /**
             * @return {?}
             */
            get: function () {
                return this._mcVisible;
            },
            /**
             * @param {?} externalValue
             * @return {?}
             */
            set: function (externalValue) {
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
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopover.prototype, "isOpen", {
            /**
             * @return {?}
             */
            get: function () {
                return this.isPopoverOpen;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Create the overlay config and position strategy
         * @return {?}
         */
        McPopover.prototype.createOverlay = function () {
            var _this = this;
            if (this.overlayRef) {
                this.overlayRef.dispose();
            }
            // Create connected position strategy that listens for scroll events to reposition.
            /** @type {?} */
            var strategy = this.overlay.position()
                .flexibleConnectedTo(this.elementRef)
                .withTransformOriginOn('.mc-popover')
                .withFlexibleDimensions(false)
                .withViewportMargin(VIEWPORT_MARGIN)
                .withPositions(__spread(core.EXTENDED_OVERLAY_POSITIONS));
            /** @type {?} */
            var scrollableAncestors = this.scrollDispatcher.getAncestorScrollContainers(this.elementRef);
            strategy.withScrollableContainers(scrollableAncestors);
            strategy.positionChanges
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(( /**
         * @param {?} change
         * @return {?}
         */function (change) {
                if (_this.popover) {
                    _this.onPositionChange(change);
                    if (change.scrollableViewProperties.isOverlayClipped && _this.popover.mcVisible) {
                        // After position changes occur and the overlay is clipped by
                        // a parent scrollable then close the popover.
                        _this.ngZone.run(( /**
                         * @return {?}
                         */function () { return _this.hide(); }));
                    }
                }
            }));
            this.overlayRef = this.overlay.create({
                direction: this.direction,
                positionStrategy: strategy,
                panelClass: 'mc-popover__panel',
                scrollStrategy: this.scrollStrategy(),
                hasBackdrop: this.hasBackdrop,
                backdropClass: this.backdropClass
            });
            this.closeSubscription = this.closingActions()
                .subscribe(( /**
         * @return {?}
         */function () { return _this.hide(); }));
            this.updatePosition();
            this.overlayRef.detachments()
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(( /**
         * @return {?}
         */function () { return _this.detach(); }));
            return this.overlayRef;
        };
        /**
         * @return {?}
         */
        McPopover.prototype.detach = function () {
            if (this.overlayRef && this.overlayRef.hasAttached()) {
                this.overlayRef.detach();
            }
            this.popover = null;
        };
        /**
         * @param {?} $event
         * @return {?}
         */
        McPopover.prototype.onPositionChange = function ($event) {
            var _this = this;
            /** @type {?} */
            var updatedPlacement = this.mcPlacement;
            Object.keys(this.availablePositions).some(( /**
             * @param {?} key
             * @return {?}
             */function (key) {
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
            this.mcPositionStrategyPlacementChange.emit(updatedPlacement);
            if (this.popover) {
                this.updateCompValue('classList', this.classList);
                this.popover.markForCheck();
            }
            if (!this.defaultPositionsMap[updatedPlacement]) {
                this.handlePositionUpdate(updatedPlacement);
            }
        };
        /**
         * @param {?} updatedPlacement
         * @return {?}
         */
        McPopover.prototype.handlePositionUpdate = function (updatedPlacement) {
            if (!this.overlayRef) {
                this.overlayRef = this.createOverlay();
            }
            /** @type {?} */
            var currentContainer = this.overlayRef.overlayElement.style;
            /** @type {?} */
            var elementHeight = this.hostView.element.nativeElement.clientHeight;
            /** @type {?} */
            var elementWidth = this.hostView.element.nativeElement.clientWidth;
            /** @type {?} */
            var verticalOffset = Math.floor(elementHeight / 2);
            // tslint:disable-line
            /** @type {?} */
            var horizontalOffset = Math.floor(elementWidth / 2 - 6);
            // tslint:disable-line
            /** @type {?} */
            var offsets = {
                top: verticalOffset,
                bottom: verticalOffset,
                right: horizontalOffset,
                left: horizontalOffset
            };
            /** @type {?} */
            var styleProperty = updatedPlacement.split(/(?=[A-Z])/)[1].toLowerCase();
            if (((styleProperty === 'top' || styleProperty === 'bottom') &&
                elementHeight > ANCHOR_MIN_HEIGHT_WIDTH) ||
                ((styleProperty === 'left' || styleProperty === 'right') &&
                    elementWidth > ANCHOR_MIN_HEIGHT_WIDTH)) {
                return;
            }
            if (!this.overlayRef.overlayElement.style[styleProperty]) {
                this.overlayRef.overlayElement.style[styleProperty] = '0px';
            }
            this.overlayRef.overlayElement.style[styleProperty] =
                parseInt(currentContainer[styleProperty].split('px')[0], 10) +
                    offsets[styleProperty] - POPOVER_ARROW_BORDER_DISTANCE + "px";
        };
        // tslint:disable-next-line:no-any
        /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        McPopover.prototype.updateCompValue = function (key, value) {
            if (this.isDynamicPopover && value) {
                if (this.popover) {
                    this.popover[key] = value;
                }
            }
        };
        /**
         * @return {?}
         */
        McPopover.prototype.ngOnInit = function () {
            this.initElementRefListeners();
        };
        /**
         * @return {?}
         */
        McPopover.prototype.ngOnDestroy = function () {
            var _this = this;
            if (this.overlayRef) {
                this.overlayRef.dispose();
            }
            this.manualListeners.forEach(( /**
             * @param {?} listener
             * @param {?} event
             * @return {?}
             */function (listener, event) {
                _this.elementRef.nativeElement.removeEventListener(event, listener);
            }));
            this.manualListeners.clear();
            this.$unsubscribe.next();
            this.$unsubscribe.complete();
            this.closeSubscription.unsubscribe();
        };
        /**
         * @param {?} e
         * @return {?}
         */
        McPopover.prototype.handleKeydown = function (e) {
            // tslint:disable-next-line: deprecation
            if (this.isOpen && e.keyCode === keycodes.ESCAPE) {
                this.hide();
            }
        };
        /**
         * @return {?}
         */
        McPopover.prototype.handleTouchend = function () {
            this.hide();
        };
        /**
         * @return {?}
         */
        McPopover.prototype.initElementRefListeners = function () {
            var _this = this;
            if (this.mcTrigger === PopoverTriggers.Click) {
                this.manualListeners
                    .set('click', ( /**
             * @return {?}
             */function () { return _this.show(); }))
                    .forEach(( /**
             * @param {?} listener
             * @param {?} event
             * @return {?}
             */function (listener, event) {
                    _this.elementRef.nativeElement.addEventListener(event, listener);
                }));
            }
            else if (this.mcTrigger === PopoverTriggers.Hover) {
                this.manualListeners
                    .set('mouseenter', ( /**
             * @return {?}
             */function () { return _this.show(); }))
                    .set('mouseleave', ( /**
             * @return {?}
             */function () { return _this.hide(); }))
                    .forEach(( /**
             * @param {?} listener
             * @param {?} event
             * @return {?}
             */function (listener, event) {
                    _this.elementRef.nativeElement.addEventListener(event, listener);
                }));
            }
            else if (this.mcTrigger === PopoverTriggers.Focus) {
                this.manualListeners
                    .set('focus', ( /**
             * @return {?}
             */function () { return _this.show(); }))
                    .set('blur', ( /**
             * @return {?}
             */function () { return _this.hide(); }))
                    .forEach(( /**
             * @param {?} listener
             * @param {?} event
             * @return {?}
             */function (listener, event) {
                    _this.elementRef.nativeElement.addEventListener(event, listener);
                }));
            }
        };
        /**
         * @return {?}
         */
        McPopover.prototype.registerResizeHandler = function () {
            var _this = this;
            // The resize handler is currently responsible for detecting slider dimension
            // changes and therefore doesn't cause a value change that needs to be propagated.
            this.ngZone.runOutsideAngular(( /**
             * @return {?}
             */function () {
                window.addEventListener('resize', _this.resizeListener);
            }));
        };
        /**
         * @return {?}
         */
        McPopover.prototype.deregisterResizeHandler = function () {
            window.removeEventListener('resize', this.resizeListener);
        };
        /**
         * @return {?}
         */
        McPopover.prototype.resetListeners = function () {
            var _this = this;
            if (this.manualListeners.size) {
                this.manualListeners.forEach(( /**
                 * @param {?} listener
                 * @param {?} event
                 * @return {?}
                 */function (listener, event) {
                    _this.elementRef.nativeElement.removeEventListener(event, listener);
                }));
                this.manualListeners.clear();
                this.initElementRefListeners();
            }
        };
        /**
         * @return {?}
         */
        McPopover.prototype.show = function () {
            var _this = this;
            if (this.disabled) {
                return;
            }
            if (!this.popover) {
                this.detach();
                /** @type {?} */
                var overlayRef = this.createOverlay();
                this.portal = this.portal || new portal.ComponentPortal(McPopoverComponent, this.hostView);
                this.popover = overlayRef.attach(this.portal).instance;
                this.popover.afterHidden()
                    .pipe(operators.takeUntil(this.destroyed))
                    .subscribe(( /**
             * @return {?}
             */function () { return _this.detach(); }));
                this.isDynamicPopover = true;
                /** @type {?} */
                var properties = [
                    'mcPlacement',
                    'mcPopoverSize',
                    'mcTrigger',
                    'mcMouseEnterDelay',
                    'mcMouseLeaveDelay',
                    'classList',
                    'mcVisible',
                    'mcHeader',
                    'mcContent',
                    'mcFooter'
                ];
                properties.forEach(( /**
                 * @param {?} property
                 * @return {?}
                 */function (property) { return _this.updateCompValue(property, _this[property]); }));
                this.popover.mcVisibleChange
                    .pipe(operators.takeUntil(this.$unsubscribe), operators.distinctUntilChanged())
                    .subscribe(( /**
             * @param {?} data
             * @return {?}
             */function (data) {
                    _this.mcVisible = data;
                    _this.mcVisibleChange.emit(data);
                    _this.isPopoverOpen = data;
                }));
            }
            this.popover.show();
        };
        /**
         * @return {?}
         */
        McPopover.prototype.hide = function () {
            if (this.popover) {
                this.popover.hide();
            }
        };
        /**
         * Updates the position of the current popover.
         * @param {?=} reapplyPosition
         * @return {?}
         */
        McPopover.prototype.updatePosition = function (reapplyPosition) {
            if (reapplyPosition === void 0) { reapplyPosition = false; }
            if (!this.overlayRef) {
                this.overlayRef = this.createOverlay();
            }
            /** @type {?} */
            var position = ( /** @type {?} */(this.overlayRef.getConfig().positionStrategy));
            position.withPositions(this.getPrioritizedPositions()).withPush(true);
            if (reapplyPosition) {
                setTimeout(( /**
                 * @return {?}
                 */function () {
                    position.reapplyLastPosition();
                }));
            }
        };
        /**
         * @private
         * @return {?}
         */
        McPopover.prototype.closingActions = function () {
            /** @type {?} */
            var backdrop = ( /** @type {?} */(this.overlayRef)).backdropClick();
            /** @type {?} */
            var outsidePointerEvents = ( /** @type {?} */(this.overlayRef)).outsidePointerEvents();
            /** @type {?} */
            var detachments = ( /** @type {?} */(this.overlayRef)).detachments();
            return rxjs.merge(backdrop, outsidePointerEvents, detachments);
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        McPopover.prototype.getPriorityPlacementStrategy = function (value) {
            var _this = this;
            /** @type {?} */
            var result = [];
            /** @type {?} */
            var possiblePositions = Object.keys(this.availablePositions);
            if (Array.isArray(value)) {
                value.forEach(( /**
                 * @param {?} position
                 * @return {?}
                 */function (position) {
                    if (possiblePositions.includes(position)) {
                        result.push(_this.availablePositions[position]);
                    }
                }));
            }
            else if (possiblePositions.includes(value)) {
                result.push(this.availablePositions[value]);
            }
            return result;
        };
        /**
         * @private
         * @return {?}
         */
        McPopover.prototype.getPrioritizedPositions = function () {
            if (this.mcPlacementPriority) {
                return this.getPriorityPlacementStrategy(this.mcPlacementPriority);
            }
            return core.POSITION_PRIORITY_STRATEGY[this.mcPlacement];
        };
        return McPopover;
    }());
    McPopover.decorators = [
        { type: core$1.Directive, args: [{
                    selector: '[mcPopover]',
                    exportAs: 'mcPopover',
                    host: {
                        '(keydown)': 'handleKeydown($event)',
                        '(touchend)': 'handleTouchend()',
                        '[class.mc-popover_open]': 'isOpen'
                    }
                },] }
    ];
    /** @nocollapse */
    McPopover.ctorParameters = function () { return [
        { type: overlay.Overlay },
        { type: core$1.ElementRef },
        { type: core$1.NgZone },
        { type: overlay.ScrollDispatcher },
        { type: core$1.ViewContainerRef },
        { type: undefined, decorators: [{ type: core$1.Inject, args: [MC_POPOVER_SCROLL_STRATEGY,] }] },
        { type: bidi.Directionality, decorators: [{ type: core$1.Optional }] }
    ]; };
    McPopover.propDecorators = {
        backdropClass: [{ type: core$1.Input }],
        mcVisibleChange: [{ type: core$1.Output, args: ['mcPopoverVisibleChange',] }],
        mcPositionStrategyPlacementChange: [{ type: core$1.Output, args: ['mcPopoverPositionStrategyPlacementChange',] }],
        hasBackdrop: [{ type: core$1.Input }],
        mcHeader: [{ type: core$1.Input, args: ['mcPopoverHeader',] }],
        mcContent: [{ type: core$1.Input, args: ['mcPopoverContent',] }],
        mcFooter: [{ type: core$1.Input, args: ['mcPopoverFooter',] }],
        disabled: [{ type: core$1.Input, args: ['mcPopoverDisabled',] }],
        mcMouseEnterDelay: [{ type: core$1.Input, args: ['mcPopoverMouseEnterDelay',] }],
        mcMouseLeaveDelay: [{ type: core$1.Input, args: ['mcPopoverMouseLeaveDelay',] }],
        mcTrigger: [{ type: core$1.Input, args: ['mcPopoverTrigger',] }],
        mcPopoverSize: [{ type: core$1.Input, args: ['mcPopoverSize',] }],
        mcPlacementPriority: [{ type: core$1.Input, args: ['mcPopoverPlacementPriority',] }],
        mcPlacement: [{ type: core$1.Input, args: ['mcPopoverPlacement',] }],
        classList: [{ type: core$1.Input, args: ['mcPopoverClass',] }],
        mcVisible: [{ type: core$1.Input, args: ['mcPopoverVisible',] }]
    };
    if (false) {
        /** @type {?} */
        McPopover.prototype.isPopoverOpen;
        /** @type {?} */
        McPopover.prototype.isDynamicPopover;
        /** @type {?} */
        McPopover.prototype.overlayRef;
        /** @type {?} */
        McPopover.prototype.portal;
        /** @type {?} */
        McPopover.prototype.availablePositions;
        /** @type {?} */
        McPopover.prototype.defaultPositionsMap;
        /** @type {?} */
        McPopover.prototype.popover;
        /** @type {?} */
        McPopover.prototype.backdropClass;
        /** @type {?} */
        McPopover.prototype.mcVisibleChange;
        /** @type {?} */
        McPopover.prototype.mcPositionStrategyPlacementChange;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype._hasBackdrop;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype._mcHeader;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype._mcContent;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype._mcFooter;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype.$unsubscribe;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype._disabled;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype._mcMouseEnterDelay;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype._mcMouseLeaveDelay;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype._mcTrigger;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype.popoverSize;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype._mcPlacementPriority;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype._mcPlacement;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype._classList;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype.closeSubscription;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype._mcVisible;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype.manualListeners;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype.destroyed;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype.resizeListener;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype.overlay;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype.ngZone;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype.scrollDispatcher;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype.hostView;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype.scrollStrategy;
        /**
         * @type {?}
         * @private
         */
        McPopover.prototype.direction;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: popover.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McPopoverModule = /** @class */ (function () {
        function McPopoverModule() {
        }
        return McPopoverModule;
    }());
    McPopoverModule.decorators = [
        { type: core$1.NgModule, args: [{
                    declarations: [McPopoverComponent, McPopover],
                    exports: [a11y.A11yModule, McPopoverComponent, McPopover],
                    imports: [common.CommonModule, overlay.OverlayModule],
                    providers: [MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER],
                    entryComponents: [McPopoverComponent]
                },] }
    ];

    /**
     * @fileoverview added by tsickle
     * Generated from: public-api.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: ptsecurity-mosaic-popover.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.MC_POPOVER_SCROLL_STRATEGY = MC_POPOVER_SCROLL_STRATEGY;
    exports.MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER = MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER;
    exports.McPopover = McPopover;
    exports.McPopoverComponent = McPopoverComponent;
    exports.McPopoverModule = McPopoverModule;
    exports.PopoverVisibility = PopoverVisibility;
    exports.getMcPopoverInvalidPositionError = getMcPopoverInvalidPositionError;
    exports.mcPopoverAnimations = mcPopoverAnimations;
    exports.mcPopoverScrollStrategyFactory = mcPopoverScrollStrategyFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-popover.umd.js.map
