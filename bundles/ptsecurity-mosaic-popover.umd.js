(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/cdk/overlay'), require('@angular/common'), require('@angular/core'), require('@angular/cdk/coercion'), require('@angular/cdk/portal'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/mosaic/core'), require('rxjs'), require('rxjs/operators'), require('@angular/animations'), require('@angular/cdk/bidi')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/popover', ['exports', '@angular/cdk/a11y', '@angular/cdk/overlay', '@angular/common', '@angular/core', '@angular/cdk/coercion', '@angular/cdk/portal', '@ptsecurity/cdk/keycodes', '@ptsecurity/mosaic/core', 'rxjs', 'rxjs/operators', '@angular/animations', '@angular/cdk/bidi'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.popover = {}), global.ng.cdk.a11y, global.ng.cdk.overlay, global.ng.common, global.ng.core, global.ng.cdk.coercion, global.ng.cdk.portal, global.mc.cdk.keycodes, global.ptsecurity.mosaic.core, global.rxjs, global.rxjs.operators, global.ng.animations, global.ng.cdk.bidi));
}(this, (function (exports, a11y, i2, i1, i0, coercion, portal, keycodes, core, rxjs, operators, animations, i3) { 'use strict';

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

    var PopoverTriggers;
    (function (PopoverTriggers) {
        PopoverTriggers["Click"] = "click";
        PopoverTriggers["Focus"] = "focus";
        PopoverTriggers["Hover"] = "hover";
    })(PopoverTriggers || (PopoverTriggers = {}));
    exports.PopoverVisibility = void 0;
    (function (PopoverVisibility) {
        PopoverVisibility["Initial"] = "initial";
        PopoverVisibility["Visible"] = "visible";
        PopoverVisibility["Hidden"] = "hidden";
    })(exports.PopoverVisibility || (exports.PopoverVisibility = {}));
    var McPopoverComponent = /** @class */ (function () {
        function McPopoverComponent(changeDetectorRef, componentElementRef) {
            this.changeDetectorRef = changeDetectorRef;
            this.componentElementRef = componentElementRef;
            this.positions = __spreadArray([], __read(core.EXTENDED_OVERLAY_POSITIONS));
            this.popoverVisibility = exports.PopoverVisibility.Initial;
            this.closeOnInteraction = false;
            this.mcVisibleChange = new i0.EventEmitter();
            this._mcTrigger = PopoverTriggers.Hover;
            this._mcPlacement = 'top';
            this._mcVisible = new rxjs.BehaviorSubject(false);
            this._classList = [];
            /** Subject for notifying that the popover has been hidden from the view */
            this.onHideSubject = new rxjs.Subject();
            this.availablePositions = core.POSITION_MAP;
        }
        Object.defineProperty(McPopoverComponent.prototype, "mcTrigger", {
            get: function () {
                return this._mcTrigger;
            },
            set: function (value) {
                this._mcTrigger = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopoverComponent.prototype, "mcPlacement", {
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
        Object.defineProperty(McPopoverComponent.prototype, "mcPopoverSize", {
            get: function () {
                return this.popoverSize;
            },
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
            get: function () {
                return this._mcVisible.value;
            },
            set: function (value) {
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
            get: function () {
                return this._classList.join(' ');
            },
            set: function (value) {
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
            get: function () {
                return this.classList + " mc-popover-" + this.mcPopoverSize + " mc-popover_placement-" + this.getPlacementClass;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopoverComponent.prototype, "getPlacementClass", {
            get: function () {
                return core.POSITION_TO_CSS_MAP[this.mcPlacement];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopoverComponent.prototype, "isOpen", {
            get: function () {
                return this.popoverVisibility === exports.PopoverVisibility.Visible;
            },
            enumerable: false,
            configurable: true
        });
        McPopoverComponent.prototype.handleKeydown = function (e) {
            // tslint:disable-next-line: deprecation
            if (this.isOpen && e.keyCode === keycodes.ESCAPE) {
                this.hide();
            }
        };
        McPopoverComponent.prototype.show = function () {
            if (this.isNonEmptyContent()) {
                this.closeOnInteraction = true;
                this.popoverVisibility = exports.PopoverVisibility.Visible;
                this._mcVisible.next(true);
                this.mcVisibleChange.emit(true);
                // Mark for check so if any parent component has set the
                // ChangeDetectionStrategy to OnPush it will be checked anyways
                this.markForCheck();
            }
        };
        McPopoverComponent.prototype.hide = function () {
            this.popoverVisibility = exports.PopoverVisibility.Hidden;
            this._mcVisible.next(false);
            this.mcVisibleChange.emit(false);
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            this.markForCheck();
        };
        McPopoverComponent.prototype.isNonEmptyContent = function () {
            return !!this.mcContent && (this.isTemplateRef(this.mcContent) || this.isNonEmptyString(this.mcContent));
        };
        /** Returns an observable that notifies when the popover has been hidden from view. */
        McPopoverComponent.prototype.afterHidden = function () {
            return this.onHideSubject.asObservable();
        };
        McPopoverComponent.prototype.isVisible = function () {
            return this.popoverVisibility === exports.PopoverVisibility.Visible;
        };
        McPopoverComponent.prototype.markForCheck = function () {
            this.changeDetectorRef.markForCheck();
        };
        McPopoverComponent.prototype.isTemplateRef = function (value) {
            return value instanceof i0.TemplateRef;
        };
        McPopoverComponent.prototype.isNonEmptyString = function (value) {
            return typeof value === 'string' && value !== '';
        };
        McPopoverComponent.prototype.animationStart = function () {
            this.closeOnInteraction = false;
        };
        McPopoverComponent.prototype.animationDone = function (event) {
            var toState = event.toState;
            if (toState === exports.PopoverVisibility.Hidden && !this.isVisible()) {
                this.onHideSubject.next();
            }
            if (toState === exports.PopoverVisibility.Visible || toState === exports.PopoverVisibility.Hidden) {
                this.closeOnInteraction = true;
            }
        };
        McPopoverComponent.prototype.ngOnDestroy = function () {
            this.onHideSubject.complete();
        };
        return McPopoverComponent;
    }());
    /** @nocollapse */ McPopoverComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McPopoverComponent, deps: [{ token: i0__namespace.ChangeDetectorRef }, { token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McPopoverComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McPopoverComponent, selector: "mc-popover", outputs: { mcVisibleChange: "mcPopoverVisibleChange" }, host: { listeners: { "keydown": "handleKeydown($event)" }, properties: { "class": "getCssClassesList" } }, ngImport: i0__namespace, template: "<div class=\"mc-popover\"\n     [ngClass]=\"classList\"\n     [@state]=\"popoverVisibility\"\n     (@state.start)=\"animationStart()\"\n     (@state.done)=\"animationDone($event)\">\n    <div class=\"mc-popover__container\">\n        <div class=\"mc-popover__header\" *ngIf=\"mcHeader\">\n            <ng-container *ngIf=\"isTemplateRef(mcHeader)\" [ngTemplateOutlet]=\"mcHeader\"></ng-container>\n            <ng-container *ngIf=\"isNonEmptyString(mcHeader)\">\n                <div [innerHTML]=\"mcHeader\"></div>\n            </ng-container>\n        </div>\n        <div class=\"mc-popover__content\" *ngIf=\"mcContent\">\n            <ng-container *ngIf=\"isTemplateRef(mcContent)\" [ngTemplateOutlet]=\"mcContent\"></ng-container>\n            <ng-container *ngIf=\"isNonEmptyString(mcContent)\">\n                <div [innerHTML]=\"mcContent\"></div>\n            </ng-container>\n        </div>\n        <div class=\"mc-popover__footer\" *ngIf=\"mcFooter\">\n            <ng-container *ngIf=\"isTemplateRef(mcFooter)\" [ngTemplateOutlet]=\"mcFooter\"></ng-container>\n            <ng-container *ngIf=\"isNonEmptyString(mcFooter)\">\n                <div [innerHTML]=\"mcFooter\"></div>\n            </ng-container>\n        </div>\n    </div>\n    <div class=\"mc-popover__arrow\"\n         [ngClass]=\"{ 'mc-popover__arrow_with-footer': mcFooter }\"></div>\n</div>\n", styles: ["@keyframes mc-progress{0%{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:\"\";position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%;position:fixed;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{top:0;bottom:0;left:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-pane{box-sizing:border-box;position:absolute;pointer-events:auto;margin:0;padding:0;z-index:1000;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box{box-sizing:border-box;position:absolute;z-index:1000;display:flex;flex-direction:column;margin:0;padding:0;min-width:1px;min-height:1px}.mc-popover{position:relative;display:block;border-radius:4px;border-radius:var(--mc-popover-size-border-radius, 4px);border-width:1px;border-width:var(--mc-popover-size-border-width, 1px);border-style:solid;box-sizing:border-box;visibility:visible;z-index:1030;list-style:none;white-space:pre-line}.mc-popover-small{max-width:200px;max-width:var(--mc-popover-size-small-width, 200px)}.mc-popover-small .mc-popover{max-width:200px;max-width:var(--mc-popover-size-small-width, 200px)}.mc-popover-normal{max-width:400px;max-width:var(--mc-popover-size-normal-width, 400px)}.mc-popover-normal .mc-popover{max-width:400px;max-width:var(--mc-popover-size-normal-width, 400px)}.mc-popover-large{max-width:640px;max-width:var(--mc-popover-size-large-width, 640px)}.mc-popover-large .mc-popover{max-width:640px;max-width:var(--mc-popover-size-large-width, 640px)}.mc-popover__container{border-radius:4px;border-radius:var(--mc-popover-size-border-radius, 4px);overflow:hidden}.mc-popover__header{padding:10px 16px;padding:var(--mc-popover-header-size-padding, 10px 16px);border-bottom-width:1px;border-bottom-width:var(--mc-popover-size-border-width, 1px);border-bottom-style:solid}.mc-popover__content{padding:16px;padding:var(--mc-popover-size-padding, 16px)}.mc-popover__footer{margin-top:8px;margin-top:var(--mc-popover-footer-size-margin-top, 8px);padding:12px 16px;padding:var(--mc-popover-footer-size-padding, 12px 16px);border-top-width:1px;border-top-width:var(--mc-popover-size-border-width, 1px);border-top-style:solid}.mc-popover_placement-top .mc-popover,.mc-popover_placement-top-left .mc-popover,.mc-popover_placement-top-right .mc-popover{margin-bottom:calc(4px * 2);margin-bottom:calc(var(--mc-popover-size-arrow-width, 4px) * 2)}.mc-popover_placement-right .mc-popover,.mc-popover_placement-right-top .mc-popover,.mc-popover_placement-right-bottom .mc-popover{margin-left:calc(4px * 2);margin-left:calc(var(--mc-popover-size-arrow-width, 4px) * 2)}.mc-popover_placement-bottom .mc-popover,.mc-popover_placement-bottom-left .mc-popover,.mc-popover_placement-bottom-right .mc-popover{margin-top:calc(4px * 2);margin-top:calc(var(--mc-popover-size-arrow-width, 4px) * 2)}.mc-popover_placement-left .mc-popover,.mc-popover_placement-left-top .mc-popover,.mc-popover_placement-left-bottom .mc-popover{margin-right:calc(4px * 2);margin-right:calc(var(--mc-popover-size-arrow-width, 4px) * 2)}.mc-popover__arrow{position:absolute;z-index:-1;width:14px;height:14px;border:solid 1px;transform:rotate(45deg)}.mc-popover_placement-top .mc-popover__arrow{bottom:calc(-1 * (4px + 2px));bottom:calc(-1 * (var(--mc-popover-size-arrow-width, 4px) + 2px));left:50%;margin-left:calc(-1 * 4px);margin-left:calc(-1 * var(--mc-popover-size-arrow-width, 4px))}.mc-popover_placement-top-left .mc-popover__arrow{bottom:calc(-1 * (4px + 2px));bottom:calc(-1 * (var(--mc-popover-size-arrow-width, 4px) + 2px));left:20px;margin-left:0}.mc-popover_placement-top-right .mc-popover__arrow{bottom:calc(-1 * (4px + 2px));bottom:calc(-1 * (var(--mc-popover-size-arrow-width, 4px) + 2px));right:20px;margin-left:0}.mc-popover_placement-right .mc-popover__arrow{left:calc(-1 * (4px + 2px));left:calc(-1 * (var(--mc-popover-size-arrow-width, 4px) + 2px));top:50%;margin-top:calc(-1 * 4px);margin-top:calc(-1 * var(--mc-popover-size-arrow-width, 4px))}.mc-popover_placement-right-top .mc-popover__arrow{left:calc(-1 * (4px + 2px));left:calc(-1 * (var(--mc-popover-size-arrow-width, 4px) + 2px));top:18px;margin-top:calc(-1 * 4px);margin-top:calc(-1 * var(--mc-popover-size-arrow-width, 4px))}.mc-popover_placement-right-bottom .mc-popover__arrow{left:calc(-1 * (4px + 2px));left:calc(-1 * (var(--mc-popover-size-arrow-width, 4px) + 2px));bottom:14px;margin-top:calc(-1 * 4px);margin-top:calc(-1 * var(--mc-popover-size-arrow-width, 4px))}.mc-popover_placement-left .mc-popover__arrow{right:calc(-1 * (4px + 2px));right:calc(-1 * (var(--mc-popover-size-arrow-width, 4px) + 2px));top:50%;margin-top:calc(-1 * 4px);margin-top:calc(-1 * var(--mc-popover-size-arrow-width, 4px))}.mc-popover_placement-left-top .mc-popover__arrow{right:calc(-1 * (4px + 2px));right:calc(-1 * (var(--mc-popover-size-arrow-width, 4px) + 2px));top:18px;margin-top:calc(-1 * 4px);margin-top:calc(-1 * var(--mc-popover-size-arrow-width, 4px))}.mc-popover_placement-left-bottom .mc-popover__arrow{right:calc(-1 * (4px + 2px));right:calc(-1 * (var(--mc-popover-size-arrow-width, 4px) + 2px));bottom:14px;margin-top:calc(-1 * 4px);margin-top:calc(-1 * var(--mc-popover-size-arrow-width, 4px))}.mc-popover_placement-bottom .mc-popover__arrow{top:calc(-1 * (4px + 2px));top:calc(-1 * (var(--mc-popover-size-arrow-width, 4px) + 2px));left:50%;margin-left:calc(-1 * 4px);margin-left:calc(-1 * var(--mc-popover-size-arrow-width, 4px))}.mc-popover_placement-bottom-left .mc-popover__arrow{top:calc(-1 * (4px + 2px));top:calc(-1 * (var(--mc-popover-size-arrow-width, 4px) + 2px));left:20px;margin-left:0}.mc-popover_placement-bottom-right .mc-popover__arrow{top:calc(-1 * (4px + 2px));top:calc(-1 * (var(--mc-popover-size-arrow-width, 4px) + 2px));right:20px;margin-left:0}\n"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [mcPopoverAnimations.popoverState], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McPopoverComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-popover',
                        templateUrl: './popover.component.html',
                        preserveWhitespaces: false,
                        styleUrls: ['./popover.scss'],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        animations: [mcPopoverAnimations.popoverState],
                        host: {
                            '[class]': 'getCssClassesList',
                            '(keydown)': 'handleKeydown($event)'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ChangeDetectorRef }, { type: i0__namespace.ElementRef }]; }, propDecorators: { mcVisibleChange: [{
                    type: i0.Output,
                    args: ['mcPopoverVisibleChange']
                }] } });
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
    var VIEWPORT_MARGIN = 8;
    /* Constant distance between popover container border
    *  corner according to popover placement and middle of arrow
    * */
    var POPOVER_ARROW_BORDER_DISTANCE = 20; // tslint:disable-line
    /* Constant value for min height and width of anchor element used for popover.
    *  Set as POPOVER_ARROW_BORDER_DISTANCE multiplied by 2
    *  plus 2px border for both sides of element. Used in check of position management.
    * */
    var ANCHOR_MIN_HEIGHT_WIDTH = 44; // tslint:disable-line
    var McPopover = /** @class */ (function () {
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
            this.mcVisibleChange = new i0.EventEmitter();
            this.mcPositionStrategyPlacementChange = new i0.EventEmitter();
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
            this.resizeListener = function () { return _this.updatePosition(); };
            this.availablePositions = core.POSITION_MAP;
            this.defaultPositionsMap = core.DEFAULT_4_POSITIONS_TO_CSS_MAP;
        }
        Object.defineProperty(McPopover.prototype, "hasBackdrop", {
            get: function () {
                return this._hasBackdrop;
            },
            set: function (value) {
                this._hasBackdrop = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopover.prototype, "mcHeader", {
            get: function () {
                return this._mcHeader;
            },
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
            get: function () {
                return this._mcContent;
            },
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
            get: function () {
                return this._mcFooter;
            },
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
            get: function () {
                return this._disabled;
            },
            set: function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopover.prototype, "mcMouseEnterDelay", {
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
        Object.defineProperty(McPopover.prototype, "mcMouseLeaveDelay", {
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
        Object.defineProperty(McPopover.prototype, "mcTrigger", {
            get: function () {
                return this._mcTrigger;
            },
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
            get: function () {
                return this.popoverSize;
            },
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
            get: function () {
                return this._mcPlacementPriority;
            },
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
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopover.prototype, "classList", {
            get: function () {
                return this._classList;
            },
            set: function (value) {
                this._classList = value;
                this.updateCompValue('classList', this._classList);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPopover.prototype, "mcVisible", {
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
        Object.defineProperty(McPopover.prototype, "isOpen", {
            get: function () {
                return this.isPopoverOpen;
            },
            enumerable: false,
            configurable: true
        });
        /** Create the overlay config and position strategy */
        McPopover.prototype.createOverlay = function () {
            var _this = this;
            if (this.overlayRef) {
                this.overlayRef.dispose();
            }
            // Create connected position strategy that listens for scroll events to reposition.
            var strategy = this.overlay.position()
                .flexibleConnectedTo(this.elementRef)
                .withTransformOriginOn('.mc-popover')
                .withFlexibleDimensions(false)
                .withViewportMargin(VIEWPORT_MARGIN)
                .withPositions(__spreadArray([], __read(core.EXTENDED_OVERLAY_POSITIONS)));
            var scrollableAncestors = this.scrollDispatcher.getAncestorScrollContainers(this.elementRef);
            strategy.withScrollableContainers(scrollableAncestors);
            strategy.positionChanges
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (change) {
                if (_this.popover) {
                    _this.onPositionChange(change);
                    if (change.scrollableViewProperties.isOverlayClipped && _this.popover.mcVisible) {
                        // After position changes occur and the overlay is clipped by
                        // a parent scrollable then close the popover.
                        _this.ngZone.run(function () { return _this.hide(); });
                    }
                }
            });
            this.overlayRef = this.overlay.create({
                direction: this.direction,
                positionStrategy: strategy,
                panelClass: 'mc-popover__panel',
                scrollStrategy: this.scrollStrategy(),
                hasBackdrop: this.hasBackdrop,
                backdropClass: this.backdropClass
            });
            this.closeSubscription = this.closingActions()
                // need for close popover on trigger click, because popover fire unexpected events: hide and then show
                // todo need fix it
                .pipe(operators.delay(0))
                .subscribe(function () { return _this.hide(); });
            this.updatePosition();
            this.overlayRef.detachments()
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function () { return _this.detach(); });
            return this.overlayRef;
        };
        McPopover.prototype.detach = function () {
            if (this.overlayRef && this.overlayRef.hasAttached()) {
                this.overlayRef.detach();
            }
            this.popover = null;
        };
        McPopover.prototype.onPositionChange = function ($event) {
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
            this.mcPositionStrategyPlacementChange.emit(updatedPlacement);
            if (this.popover) {
                this.updateCompValue('classList', this.classList);
                this.popover.markForCheck();
            }
            if (!this.defaultPositionsMap[updatedPlacement]) {
                this.handlePositionUpdate(updatedPlacement);
            }
        };
        McPopover.prototype.handlePositionUpdate = function (updatedPlacement) {
            if (!this.overlayRef) {
                this.overlayRef = this.createOverlay();
            }
            var currentContainer = this.overlayRef.overlayElement.style;
            var elementHeight = this.hostView.element.nativeElement.clientHeight;
            var elementWidth = this.hostView.element.nativeElement.clientWidth;
            var verticalOffset = Math.floor(elementHeight / 2); // tslint:disable-line
            var horizontalOffset = Math.floor(elementWidth / 2 - 6); // tslint:disable-line
            var offsets = {
                top: verticalOffset,
                bottom: verticalOffset,
                right: horizontalOffset,
                left: horizontalOffset
            };
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
        McPopover.prototype.updateCompValue = function (key, value) {
            if (this.isDynamicPopover && value) {
                if (this.popover) {
                    this.popover[key] = value;
                }
            }
        };
        McPopover.prototype.ngOnInit = function () {
            this.initElementRefListeners();
        };
        McPopover.prototype.ngOnDestroy = function () {
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
            this.closeSubscription.unsubscribe();
        };
        McPopover.prototype.handleKeydown = function (e) {
            // tslint:disable-next-line: deprecation
            if (this.isOpen && e.keyCode === keycodes.ESCAPE) {
                this.hide();
            }
        };
        McPopover.prototype.handleTouchend = function () {
            this.hide();
        };
        McPopover.prototype.initElementRefListeners = function () {
            var _this = this;
            if (this.mcTrigger === PopoverTriggers.Click) {
                this.manualListeners
                    .set('click', function () { return _this.show(); })
                    .forEach(function (listener, event) {
                    _this.elementRef.nativeElement.addEventListener(event, listener);
                });
            }
            else if (this.mcTrigger === PopoverTriggers.Hover) {
                this.manualListeners
                    .set('mouseenter', function () { return _this.show(); })
                    .set('mouseleave', function () { return _this.hide(); })
                    .forEach(function (listener, event) {
                    _this.elementRef.nativeElement.addEventListener(event, listener);
                });
            }
            else if (this.mcTrigger === PopoverTriggers.Focus) {
                this.manualListeners
                    .set('focus', function () { return _this.show(); })
                    .set('blur', function () { return _this.hide(); })
                    .forEach(function (listener, event) {
                    _this.elementRef.nativeElement.addEventListener(event, listener);
                });
            }
        };
        McPopover.prototype.registerResizeHandler = function () {
            var _this = this;
            // The resize handler is currently responsible for detecting slider dimension
            // changes and therefore doesn't cause a value change that needs to be propagated.
            this.ngZone.runOutsideAngular(function () {
                window.addEventListener('resize', _this.resizeListener);
            });
        };
        McPopover.prototype.deregisterResizeHandler = function () {
            window.removeEventListener('resize', this.resizeListener);
        };
        McPopover.prototype.resetListeners = function () {
            var _this = this;
            if (this.manualListeners.size) {
                this.manualListeners.forEach(function (listener, event) {
                    _this.elementRef.nativeElement.removeEventListener(event, listener);
                });
                this.manualListeners.clear();
                this.initElementRefListeners();
            }
        };
        McPopover.prototype.show = function () {
            var _this = this;
            if (this.disabled) {
                return;
            }
            if (!this.popover) {
                this.detach();
                var overlayRef = this.createOverlay();
                this.portal = this.portal || new portal.ComponentPortal(McPopoverComponent, this.hostView);
                this.popover = overlayRef.attach(this.portal).instance;
                this.popover.afterHidden()
                    .pipe(operators.takeUntil(this.destroyed))
                    .subscribe(function () { return _this.detach(); });
                this.isDynamicPopover = true;
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
                properties.forEach(function (property) { return _this.updateCompValue(property, _this[property]); });
                this.popover.mcVisibleChange
                    .pipe(operators.takeUntil(this.$unsubscribe), operators.distinctUntilChanged())
                    .subscribe(function (data) {
                    _this.mcVisible = data;
                    _this.mcVisibleChange.emit(data);
                    _this.isPopoverOpen = data;
                });
            }
            this.popover.show();
        };
        McPopover.prototype.hide = function () {
            if (this.popover) {
                this.popover.hide();
            }
        };
        /** Updates the position of the current popover. */
        McPopover.prototype.updatePosition = function (reapplyPosition) {
            if (reapplyPosition === void 0) { reapplyPosition = false; }
            if (!this.overlayRef) {
                this.overlayRef = this.createOverlay();
            }
            var position = this.overlayRef.getConfig().positionStrategy;
            position.withPositions(this.getPrioritizedPositions()).withPush(true);
            if (reapplyPosition) {
                setTimeout(function () { return position.reapplyLastPosition(); });
            }
        };
        McPopover.prototype.closingActions = function () {
            var backdrop = this.overlayRef.backdropClick();
            var outsidePointerEvents = this.hasBackdrop ? rxjs.NEVER : this.overlayRef.outsidePointerEvents();
            var detachments = this.overlayRef.detachments();
            return rxjs.merge(backdrop, outsidePointerEvents, detachments);
        };
        McPopover.prototype.getPriorityPlacementStrategy = function (value) {
            var _this = this;
            var result = [];
            var possiblePositions = Object.keys(this.availablePositions);
            if (Array.isArray(value)) {
                value.forEach(function (position) {
                    if (possiblePositions.includes(position)) {
                        result.push(_this.availablePositions[position]);
                    }
                });
            }
            else if (possiblePositions.includes(value)) {
                result.push(this.availablePositions[value]);
            }
            return result;
        };
        McPopover.prototype.getPrioritizedPositions = function () {
            if (this.mcPlacementPriority) {
                return this.getPriorityPlacementStrategy(this.mcPlacementPriority);
            }
            return core.POSITION_PRIORITY_STRATEGY[this.mcPlacement];
        };
        return McPopover;
    }());
    /** @nocollapse */ McPopover.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McPopover, deps: [{ token: i2__namespace.Overlay }, { token: i0__namespace.ElementRef }, { token: i0__namespace.NgZone }, { token: i2__namespace.ScrollDispatcher }, { token: i0__namespace.ViewContainerRef }, { token: MC_POPOVER_SCROLL_STRATEGY }, { token: i3__namespace.Directionality, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McPopover.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McPopover, selector: "[mcPopover]", inputs: { backdropClass: "backdropClass", hasBackdrop: "hasBackdrop", mcHeader: ["mcPopoverHeader", "mcHeader"], mcContent: ["mcPopoverContent", "mcContent"], mcFooter: ["mcPopoverFooter", "mcFooter"], disabled: ["mcPopoverDisabled", "disabled"], mcMouseEnterDelay: ["mcPopoverMouseEnterDelay", "mcMouseEnterDelay"], mcMouseLeaveDelay: ["mcPopoverMouseLeaveDelay", "mcMouseLeaveDelay"], mcTrigger: ["mcPopoverTrigger", "mcTrigger"], mcPopoverSize: "mcPopoverSize", mcPlacementPriority: ["mcPopoverPlacementPriority", "mcPlacementPriority"], mcPlacement: ["mcPopoverPlacement", "mcPlacement"], classList: ["mcPopoverClass", "classList"], mcVisible: ["mcPopoverVisible", "mcVisible"] }, outputs: { mcVisibleChange: "mcPopoverVisibleChange", mcPositionStrategyPlacementChange: "mcPopoverPositionStrategyPlacementChange" }, host: { listeners: { "keydown": "handleKeydown($event)", "touchend": "handleTouchend()" }, properties: { "class.mc-popover_open": "isOpen" } }, exportAs: ["mcPopover"], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McPopover, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[mcPopover]',
                        exportAs: 'mcPopover',
                        host: {
                            '(keydown)': 'handleKeydown($event)',
                            '(touchend)': 'handleTouchend()',
                            '[class.mc-popover_open]': 'isOpen'
                        }
                    }]
            }], ctorParameters: function () {
            return [{ type: i2__namespace.Overlay }, { type: i0__namespace.ElementRef }, { type: i0__namespace.NgZone }, { type: i2__namespace.ScrollDispatcher }, { type: i0__namespace.ViewContainerRef }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [MC_POPOVER_SCROLL_STRATEGY]
                        }] }, { type: i3__namespace.Directionality, decorators: [{
                            type: i0.Optional
                        }] }];
        }, propDecorators: { backdropClass: [{
                    type: i0.Input
                }], mcVisibleChange: [{
                    type: i0.Output,
                    args: ['mcPopoverVisibleChange']
                }], mcPositionStrategyPlacementChange: [{
                    type: i0.Output,
                    args: ['mcPopoverPositionStrategyPlacementChange']
                }], hasBackdrop: [{
                    type: i0.Input
                }], mcHeader: [{
                    type: i0.Input,
                    args: ['mcPopoverHeader']
                }], mcContent: [{
                    type: i0.Input,
                    args: ['mcPopoverContent']
                }], mcFooter: [{
                    type: i0.Input,
                    args: ['mcPopoverFooter']
                }], disabled: [{
                    type: i0.Input,
                    args: ['mcPopoverDisabled']
                }], mcMouseEnterDelay: [{
                    type: i0.Input,
                    args: ['mcPopoverMouseEnterDelay']
                }], mcMouseLeaveDelay: [{
                    type: i0.Input,
                    args: ['mcPopoverMouseLeaveDelay']
                }], mcTrigger: [{
                    type: i0.Input,
                    args: ['mcPopoverTrigger']
                }], mcPopoverSize: [{
                    type: i0.Input,
                    args: ['mcPopoverSize']
                }], mcPlacementPriority: [{
                    type: i0.Input,
                    args: ['mcPopoverPlacementPriority']
                }], mcPlacement: [{
                    type: i0.Input,
                    args: ['mcPopoverPlacement']
                }], classList: [{
                    type: i0.Input,
                    args: ['mcPopoverClass']
                }], mcVisible: [{
                    type: i0.Input,
                    args: ['mcPopoverVisible']
                }] } });

    var McPopoverModule = /** @class */ (function () {
        function McPopoverModule() {
        }
        return McPopoverModule;
    }());
    /** @nocollapse */ McPopoverModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McPopoverModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ McPopoverModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McPopoverModule, declarations: [McPopoverComponent, McPopover], imports: [i1.CommonModule, i2.OverlayModule], exports: [a11y.A11yModule, McPopoverComponent, McPopover] });
    /** @nocollapse */ McPopoverModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McPopoverModule, providers: [MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER], imports: [[i1.CommonModule, i2.OverlayModule], a11y.A11yModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McPopoverModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [McPopoverComponent, McPopover],
                        exports: [a11y.A11yModule, McPopoverComponent, McPopover],
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
    exports.McPopover = McPopover;
    exports.McPopoverComponent = McPopoverComponent;
    exports.McPopoverModule = McPopoverModule;
    exports.getMcPopoverInvalidPositionError = getMcPopoverInvalidPositionError;
    exports.mcPopoverAnimations = mcPopoverAnimations;
    exports.mcPopoverScrollStrategyFactory = mcPopoverScrollStrategyFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-popover.umd.js.map
