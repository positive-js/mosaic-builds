(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/cdk/portal'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/core'), require('@ptsecurity/mosaic/icon'), require('@ptsecurity/mosaic/tooltip'), require('@angular/cdk/bidi'), require('rxjs'), require('rxjs/operators'), require('@angular/animations'), require('@angular/cdk/coercion'), require('@angular/cdk/platform'), require('@angular/cdk/scrolling'), require('@angular/platform-browser/animations'), require('@angular/cdk/keycodes'), require('@ptsecurity/cdk/keycodes')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/tabs', ['exports', '@angular/cdk/a11y', '@angular/cdk/portal', '@angular/common', '@angular/core', '@ptsecurity/mosaic/core', '@ptsecurity/mosaic/icon', '@ptsecurity/mosaic/tooltip', '@angular/cdk/bidi', 'rxjs', 'rxjs/operators', '@angular/animations', '@angular/cdk/coercion', '@angular/cdk/platform', '@angular/cdk/scrolling', '@angular/platform-browser/animations', '@angular/cdk/keycodes', '@ptsecurity/cdk/keycodes'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.tabs = {}), global.ng.cdk.a11y, global.ng.cdk.portal, global.ng.common, global.ng.core, global.ptsecurity.mosaic.core, global.ptsecurity.mosaic.icon, global.ptsecurity.mosaic.tooltip, global.ng.cdk.bidi, global.rxjs, global.rxjs.operators, global.ng.animations, global.ng.cdk.coercion, global.ng.cdk.platform, global.ng.cdk.scrolling, global.ng.platformBrowser.animations, global.ng.cdk.keycodes, global.mc.cdk.keycodes));
}(this, (function (exports, a11y, portal, common, core, core$1, icon, tooltip, bidi, rxjs, operators, animations, coercion, platform, scrolling, animations$1, keycodes, keycodes$1) { 'use strict';

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
        return to.concat(ar || from);
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

    var mcTabsAnimations = {
        /** Animation translates a tab along the X axis. */
        translateTab: animations.trigger('translateTab', [
            // Note: transitions to `none` instead of 0, because some browsers might blur the content.
            animations.state('center, void, left-origin-center, right-origin-center', animations.style({ transform: 'none' })),
            // If the tab is either on the left or right, we additionally add a `min-height` of 1px
            // in order to ensure that the element has a height before its state changes. This is
            // necessary because Chrome does seem to skip the transition in RTL mode if the element does
            // not have a static height and is not rendered. See related issue: #9465
            animations.state('left', animations.style({ transform: 'translate3d(-100%, 0, 0)', minHeight: '1px' })),
            animations.state('right', animations.style({ transform: 'translate3d(100%, 0, 0)', minHeight: '1px' })),
            animations.transition('* => left, * => right, left => center, right => center', animations.animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')),
            animations.transition('void => left-origin-center', [
                animations.style({ transform: 'translate3d(-100%, 0, 0)' }),
                animations.animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')
            ]),
            animations.transition('void => right-origin-center', [
                animations.style({ transform: 'translate3d(100%, 0, 0)' }),
                animations.animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')
            ])
        ])
    };

    /**
     * Wrapper for the contents of a tab.
     * @docs-private
     */
    var McTabBody = /** @class */ (function () {
        function McTabBody(elementRef, dir, changeDetectorRef) {
            var _this = this;
            this.elementRef = elementRef;
            this.dir = dir;
            /** Event emitted when the tab begins to animate towards the center as the active tab. */
            this.onCentering = new core.EventEmitter();
            /** Event emitted before the centering of the tab begins. */
            this.beforeCentering = new core.EventEmitter();
            /** Event emitted before the centering of the tab begins. */
            this.afterLeavingCenter = new core.EventEmitter();
            /** Event emitted when the tab completes its animation towards the center. */
            this.onCentered = new core.EventEmitter(true);
            // Note that the default value will always be overwritten by `McTabBody`, but we need one
            // anyway to prevent the animations module from throwing an error if the body is used on its own.
            /** Duration for the tab's animation. */
            this.animationDuration = '0ms';
            /** Subscription to the directionality change observable. */
            this.dirChangeSubscription = rxjs.Subscription.EMPTY;
            if (this.dir && changeDetectorRef) {
                this.dirChangeSubscription = this.dir.change
                    .subscribe(function (direction) {
                    _this.computePositionAnimationState(direction);
                    changeDetectorRef.markForCheck();
                });
            }
        }
        Object.defineProperty(McTabBody.prototype, "position", {
            /** The shifted index position of the tab body, where zero represents the active center tab. */
            set: function (position) {
                this.positionIndex = position;
                this.computePositionAnimationState();
            },
            enumerable: false,
            configurable: true
        });
        /**
         * After initialized, check if the content is centered and has an origin. If so, set the
         * special position states that transition the tab from the left or right before centering.
         */
        McTabBody.prototype.ngOnInit = function () {
            if (this.bodyPosition === 'center' && this.origin != null) {
                this.bodyPosition = this.computePositionFromOrigin();
            }
        };
        McTabBody.prototype.ngOnDestroy = function () {
            this.dirChangeSubscription.unsubscribe();
        };
        McTabBody.prototype.onTranslateTabStarted = function (e) {
            var isCentering = this.isCenterPosition(e.toState);
            this.beforeCentering.emit(isCentering);
            if (isCentering) {
                this.onCentering.emit(this.elementRef.nativeElement.clientHeight);
            }
        };
        McTabBody.prototype.onTranslateTabComplete = function (e) {
            // If the transition to the center is complete, emit an event.
            if (this.isCenterPosition(e.toState) && this.isCenterPosition(this.bodyPosition)) {
                this.onCentered.emit();
            }
            if (this.isCenterPosition(e.fromState) && !this.isCenterPosition(this.bodyPosition)) {
                this.afterLeavingCenter.emit();
            }
        };
        /** The text direction of the containing app. */
        McTabBody.prototype.getLayoutDirection = function () {
            return this.dir && this.dir.value === 'rtl' ? 'rtl' : 'ltr';
        };
        /** Whether the provided position state is considered center, regardless of origin. */
        McTabBody.prototype.isCenterPosition = function (position) {
            return position === 'center' || position === 'left-origin-center' || position === 'right-origin-center';
        };
        /** Computes the position state that will be used for the tab-body animation trigger. */
        McTabBody.prototype.computePositionAnimationState = function (dir) {
            if (dir === void 0) { dir = this.getLayoutDirection(); }
            if (this.positionIndex < 0) {
                this.bodyPosition = dir === 'ltr' ? 'left' : 'right';
            }
            else if (this.positionIndex > 0) {
                this.bodyPosition = dir === 'ltr' ? 'right' : 'left';
            }
            else {
                this.bodyPosition = 'center';
            }
        };
        /**
         * Computes the position state based on the specified origin position. This is used if the
         * tab is becoming visible immediately after creation.
         */
        McTabBody.prototype.computePositionFromOrigin = function () {
            var dir = this.getLayoutDirection();
            if ((dir === 'ltr' && this.origin <= 0) || (dir === 'rtl' && this.origin > 0)) {
                return 'left-origin-center';
            }
            return 'right-origin-center';
        };
        return McTabBody;
    }());
    McTabBody.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-tab-body',
                    template: "<div class=\"mc-tab-body__content\"\n     #content\n     [@translateTab]=\"{\n        value: bodyPosition,\n        params: {animationDuration: animationDuration}\n     }\"\n     (@translateTab.start)=\"onTranslateTabStarted($event)\"\n     (@translateTab.done)=\"onTranslateTabComplete($event)\">\n    <ng-template mcTabBodyHost></ng-template>\n</div>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    animations: [mcTabsAnimations.translateTab],
                    host: {
                        class: 'mc-tab-body'
                    },
                    styles: [".mc-tab-body__content{height:100%;overflow:auto}.mc-tab-body__content .mc-tab-group_dynamic-height{overflow:hidden}"]
                },] }
    ];
    /** @nocollapse */
    McTabBody.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
        { type: core.ChangeDetectorRef }
    ]; };
    McTabBody.propDecorators = {
        position: [{ type: core.Input }],
        onCentering: [{ type: core.Output }],
        beforeCentering: [{ type: core.Output }],
        afterLeavingCenter: [{ type: core.Output }],
        onCentered: [{ type: core.Output }],
        portalHost: [{ type: core.ViewChild, args: [portal.CdkPortalOutlet, { static: false },] }],
        content: [{ type: core.Input, args: ['content',] }],
        origin: [{ type: core.Input }],
        animationDuration: [{ type: core.Input }]
    };
    /**
     * The portal host directive for the contents of the tab.
     * @docs-private
     */
    var McTabBodyPortal = /** @class */ (function (_super) {
        __extends(McTabBodyPortal, _super);
        function McTabBodyPortal(componentFactoryResolver, viewContainerRef, host) {
            var _this = _super.call(this, componentFactoryResolver, viewContainerRef) || this;
            _this.host = host;
            /** Subscription to events for when the tab body begins centering. */
            _this.centeringSub = rxjs.Subscription.EMPTY;
            /** Subscription to events for when the tab body finishes leaving from center position. */
            _this.leavingSub = rxjs.Subscription.EMPTY;
            return _this;
        }
        /** Set initial visibility or set up subscription for changing visibility. */
        McTabBodyPortal.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.centeringSub = this.host.beforeCentering
                .pipe(operators.startWith(this.host.isCenterPosition(this.host.bodyPosition)))
                .subscribe(function (isCentering) {
                if (isCentering && !_this.hasAttached()) {
                    _this.attach(_this.host.content);
                }
            });
            this.leavingSub = this.host.afterLeavingCenter
                .subscribe(function () { _this.detach(); });
        };
        /** Clean up centering subscription. */
        McTabBodyPortal.prototype.ngOnDestroy = function () {
            _super.prototype.ngOnDestroy.call(this);
            this.centeringSub.unsubscribe();
            this.leavingSub.unsubscribe();
        };
        return McTabBodyPortal;
    }(portal.CdkPortalOutlet));
    McTabBodyPortal.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mcTabBodyHost]'
                },] }
    ];
    /** @nocollapse */
    McTabBodyPortal.ctorParameters = function () { return [
        { type: core.ComponentFactoryResolver },
        { type: core.ViewContainerRef },
        { type: McTabBody, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return McTabBody; }),] }] }
    ]; };

    /** Decorates the `ng-template` tags and reads out the template from it. */
    var McTabContent = /** @class */ (function () {
        function McTabContent(template) {
            this.template = template;
        }
        return McTabContent;
    }());
    McTabContent.decorators = [
        { type: core.Directive, args: [{ selector: '[mcTabContent]' },] }
    ];
    /** @nocollapse */
    McTabContent.ctorParameters = function () { return [
        { type: core.TemplateRef }
    ]; };

    var MC_TAB_LABEL = new core.InjectionToken('McTabLabel');
    /** Used to flag tab labels for use with the portal directive */
    var McTabLabel = /** @class */ (function (_super) {
        __extends(McTabLabel, _super);
        function McTabLabel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return McTabLabel;
    }(portal.CdkPortal));
    McTabLabel.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mc-tab-label], [mcTabLabel]',
                    providers: [{ provide: MC_TAB_LABEL, useExisting: McTabLabel }]
                },] }
    ];

    var McTabBase = /** @class */ (function () {
        function McTabBase() {
        }
        return McTabBase;
    }());
    // tslint:disable-next-line:naming-convention
    var McTabMixinBase = core$1.mixinDisabled(McTabBase);
    var McTab = /** @class */ (function (_super) {
        __extends(McTab, _super);
        function McTab(viewContainerRef) {
            var _this = _super.call(this) || this;
            _this.viewContainerRef = viewContainerRef;
            /** Plain text label for the tab, used when there is no template label. */
            _this.textLabel = '';
            _this.empty = false;
            _this.tooltipTitle = '';
            _this.tooltipPlacement = '';
            /** Emits whenever the internal state of the tab changes. */
            _this.stateChanges = new rxjs.Subject();
            /**
             * The relatively indexed position where 0 represents the center, negative is left, and positive
             * represents the right.
             */
            _this.position = null;
            /**
             * The initial relatively index origin of the tab if it was created and selected after there
             * was already a selected tab. Provides context of what position the tab should originate from.
             */
            _this.origin = null;
            /**
             * Whether the tab is currently active.
             */
            _this.isActive = false;
            /** Portal that will be the hosted content of the tab */
            _this.contentPortal = null;
            return _this;
        }
        Object.defineProperty(McTab.prototype, "content", {
            /** @docs-private */
            get: function () {
                return this.contentPortal;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTab.prototype, "templateLabel", {
            get: function () { return this._templateLabel; },
            set: function (value) { this.setTemplateLabelInput(value); },
            enumerable: false,
            configurable: true
        });
        McTab.prototype.ngOnChanges = function (changes) {
            if (changes.hasOwnProperty('textLabel') || changes.hasOwnProperty('disabled')) {
                this.stateChanges.next();
            }
        };
        McTab.prototype.ngOnDestroy = function () {
            this.stateChanges.complete();
        };
        McTab.prototype.ngOnInit = function () {
            this.contentPortal = new portal.TemplatePortal(this.explicitContent || this.implicitContent, this.viewContainerRef);
        };
        /**
         * This has been extracted to a util because of TS 4 and VE.
         * View Engine doesn't support property rename inheritance.
         * TS 4.0 doesn't allow properties to override accessors or vice-versa.
         * @docs-private
         */
        McTab.prototype.setTemplateLabelInput = function (value) {
            // Only update the templateLabel via query if there is actually
            // a McTabLabel found. This works around an issue where a user may have
            // manually set `templateLabel` during creation mode, which would then get clobbered
            // by `undefined` when this query resolves.
            if (value) {
                this._templateLabel = value;
            }
        };
        return McTab;
    }(McTabMixinBase));
    McTab.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-tab',
                    exportAs: 'mcTab',
                    // Create a template for the content of the <mc-tab> so that we can grab a reference to this
                    // TemplateRef and use it in a Portal to render the tab content in the appropriate place in the
                    // tab-group.
                    template: '<ng-template><ng-content></ng-content></ng-template>',
                    inputs: ['disabled'],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None
                },] }
    ];
    /** @nocollapse */
    McTab.ctorParameters = function () { return [
        { type: core.ViewContainerRef }
    ]; };
    McTab.propDecorators = {
        templateLabel: [{ type: core.ContentChild, args: [MC_TAB_LABEL,] }],
        explicitContent: [{ type: core.ContentChild, args: [McTabContent, { read: core.TemplateRef, static: true },] }],
        implicitContent: [{ type: core.ViewChild, args: [core.TemplateRef, { static: true },] }],
        textLabel: [{ type: core.Input, args: ['label',] }],
        empty: [{ type: core.Input }],
        tooltipTitle: [{ type: core.Input }],
        tooltipPlacement: [{ type: core.Input }],
        tabId: [{ type: core.Input, args: ['tabId',] }]
    };

    var McOldTabsCssStyler = /** @class */ (function () {
        function McOldTabsCssStyler() {
        }
        return McOldTabsCssStyler;
    }());
    McOldTabsCssStyler.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mc-tab-group[mc-old-tabs], [mc-tab-nav-bar][mc-old-tabs]',
                    host: { class: 'mc-tab-group_old' }
                },] }
    ];
    var McAlignTabsCenterCssStyler = /** @class */ (function () {
        function McAlignTabsCenterCssStyler() {
        }
        return McAlignTabsCenterCssStyler;
    }());
    McAlignTabsCenterCssStyler.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mc-tab-group[mc-align-tabs-center], [mc-tab-nav-bar][mc-align-tabs-center]',
                    host: { class: 'mc-tab-group_align-labels-center' }
                },] }
    ];
    var McAlignTabsEndCssStyler = /** @class */ (function () {
        function McAlignTabsEndCssStyler() {
        }
        return McAlignTabsEndCssStyler;
    }());
    McAlignTabsEndCssStyler.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mc-tab-group[mc-align-tabs-end], [mc-tab-nav-bar][mc-align-tabs-end]',
                    host: { class: 'mc-tab-group_align-labels-end' }
                },] }
    ];
    var McStretchTabsCssStyler = /** @class */ (function () {
        function McStretchTabsCssStyler() {
        }
        return McStretchTabsCssStyler;
    }());
    McStretchTabsCssStyler.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mc-tab-group[mc-stretch-tabs], [mc-tab-nav-bar][mc-stretch-tabs]',
                    host: { class: 'mc-tab-group_stretch-labels' }
                },] }
    ];
    var McVerticalTabsCssStyler = /** @class */ (function () {
        function McVerticalTabsCssStyler() {
        }
        return McVerticalTabsCssStyler;
    }());
    McVerticalTabsCssStyler.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mc-tab-group[vertical], [mc-tab-nav-bar][vertical]',
                    host: { class: 'mc-tab-group_vertical' }
                },] }
    ];
    /** Used to generate unique ID's for each tab component */
    var nextId = 0;
    /** A simple change event emitted on focus or selection changes. */
    var McTabChangeEvent = /** @class */ (function () {
        function McTabChangeEvent() {
        }
        return McTabChangeEvent;
    }());
    /** Injection token that can be used to provide the default options the tabs module. */
    var MC_TABS_CONFIG = new core.InjectionToken('MC_TABS_CONFIG');
    // Boilerplate for applying mixins to McTabGroup.
    /** @docs-private */
    var McTabGroupBase = /** @class */ (function () {
        // tslint:disable-next-line:naming-convention
        function McTabGroupBase(_elementRef) {
            this._elementRef = _elementRef;
        }
        return McTabGroupBase;
    }());
    // tslint:disable-next-line:naming-convention
    var McTabGroupMixinBase = core$1.mixinDisabled(McTabGroupBase);
    /**
     * Tab-group component.  Supports basic tab pairs (label + content) and includes
     * keyboard navigation.
     */
    var McTabGroup = /** @class */ (function (_super) {
        __extends(McTabGroup, _super);
        function McTabGroup(elementRef, changeDetectorRef, lightTabs, vertical, defaultConfig) {
            var _this = _super.call(this, elementRef) || this;
            _this.changeDetectorRef = changeDetectorRef;
            /** Position of the tab header. */
            _this.headerPosition = 'above';
            /** Output to enable support for two-way binding on `[(selectedIndex)]` */
            _this.selectedIndexChange = new core.EventEmitter();
            /** Event emitted when focus has changed within a tab group. */
            _this.focusChange = new core.EventEmitter();
            /** Event emitted when the body animation has completed */
            _this.animationDone = new core.EventEmitter();
            /** Event emitted when the tab selection has changed. */
            _this.selectedTabChange = new core.EventEmitter(true);
            /** The tab index that should be selected after the content has been checked. */
            _this.indexToSelect = 0;
            /** Snapshot of the height of the tab body wrapper before another tab is activated. */
            _this.tabBodyWrapperHeight = 0;
            /** Subscription to tabs being added/removed. */
            _this.tabsSubscription = rxjs.Subscription.EMPTY;
            /** Subscription to changes in the tab labels. */
            _this.tabLabelSubscription = rxjs.Subscription.EMPTY;
            _this._dynamicHeight = false;
            _this._selectedIndex = null;
            _this.oldTab = coercion.coerceBooleanProperty(lightTabs);
            _this.vertical = coercion.coerceBooleanProperty(vertical);
            _this.groupId = nextId++;
            _this.animationDuration = (defaultConfig === null || defaultConfig === void 0 ? void 0 : defaultConfig.animationDuration) || '0ms';
            return _this;
        }
        Object.defineProperty(McTabGroup.prototype, "dynamicHeight", {
            /** Whether the tab group should grow to the size of the active tab. */
            get: function () { return this._dynamicHeight; },
            set: function (value) {
                this._dynamicHeight = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTabGroup.prototype, "selectedIndex", {
            /** The index of the active tab. */
            get: function () { return this._selectedIndex; },
            set: function (value) {
                this.indexToSelect = coercion.coerceNumberProperty(value, null);
            },
            enumerable: false,
            configurable: true
        });
        /**
         * After the content is checked, this component knows what tabs have been defined
         * and what the selected index should be. This is where we can know exactly what position
         * each tab should be in according to the new selected index, and additionally we know how
         * a new selected tab should transition in (from the left or right).
         */
        McTabGroup.prototype.ngAfterContentChecked = function () {
            var _this = this;
            // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
            // the amount of tabs changes before the actual change detection runs.
            var indexToSelect = this.indexToSelect = this.clampTabIndex(this.indexToSelect);
            // If there is a change in selected index, emit a change event. Should not trigger if
            // the selected index has not yet been initialized.
            if (this._selectedIndex !== indexToSelect) {
                var isFirstRun_1 = this._selectedIndex == null;
                if (!isFirstRun_1) {
                    this.selectedTabChange.emit(this.createChangeEvent(indexToSelect));
                }
                // Changing these values after change detection has run
                // since the checked content may contain references to them.
                Promise.resolve().then(function () {
                    _this.tabs.forEach(function (tab, index) { return tab.isActive = index === indexToSelect; });
                    if (!isFirstRun_1) {
                        _this.selectedIndexChange.emit(indexToSelect);
                    }
                });
            }
            // Setup the position for each tab and optionally setup an origin on the next selected tab.
            this.tabs.forEach(function (tab, index) {
                tab.position = index - indexToSelect;
                // If there is already a selected tab, then set up an origin for the next selected tab
                // if it doesn't have one already.
                if (_this._selectedIndex != null && tab.position === 0 && !tab.origin) {
                    tab.origin = indexToSelect - _this._selectedIndex;
                }
            });
            if (this._selectedIndex !== indexToSelect) {
                this._selectedIndex = indexToSelect;
                this.changeDetectorRef.markForCheck();
            }
        };
        McTabGroup.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.subscribeToTabLabels();
            // Subscribe to changes in the amount of tabs, in order to be
            // able to re-render the content as new tabs are added or removed.
            this.tabsSubscription = this.tabs.changes.subscribe(function () {
                var indexToSelect = _this.clampTabIndex(_this.indexToSelect);
                // Maintain the previously-selected tab if a new tab is added or removed and there is no
                // explicit change that selects a different tab.
                if (indexToSelect === _this._selectedIndex) {
                    var tabs = _this.tabs.toArray();
                    for (var i = 0; i < tabs.length; i++) {
                        if (tabs[i].isActive) {
                            // Assign both to the `_indexToSelect` and `_selectedIndex` so we don't fire a changed
                            // event, otherwise the consumer may end up in an infinite loop in some edge cases like
                            // adding a tab within the `selectedIndexChange` event.
                            _this.indexToSelect = _this._selectedIndex = i;
                            break;
                        }
                    }
                }
                _this.subscribeToTabLabels();
                _this.changeDetectorRef.markForCheck();
            });
        };
        McTabGroup.prototype.ngOnDestroy = function () {
            this.tabsSubscription.unsubscribe();
            this.tabLabelSubscription.unsubscribe();
        };
        McTabGroup.prototype.focusChanged = function (index) {
            this.focusChange.emit(this.createChangeEvent(index));
        };
        /** Returns a unique id for each tab label element */
        McTabGroup.prototype.getTabLabelId = function (i) {
            return "mc-tab-label-" + this.groupId + "-" + i;
        };
        /** Returns a unique id for each tab content element */
        McTabGroup.prototype.getTabContentId = function (i) {
            return "mc-tab-content-" + this.groupId + "-" + i;
        };
        /**
         * Sets the height of the body wrapper to the height of the activating tab if dynamic
         * height property is true.
         */
        McTabGroup.prototype.setTabBodyWrapperHeight = function (tabHeight) {
            if (!this._dynamicHeight || !this.tabBodyWrapperHeight) {
                return;
            }
            var wrapper = this.tabBodyWrapper.nativeElement;
            wrapper.style.height = this.tabBodyWrapperHeight + "px";
            // This conditional forces the browser to paint the height so that
            // the animation to the new height can have an origin.
            if (this.tabBodyWrapper.nativeElement.offsetHeight) {
                wrapper.style.height = tabHeight + "px";
            }
        };
        /** Removes the height of the tab body wrapper. */
        McTabGroup.prototype.removeTabBodyWrapperHeight = function () {
            this.tabBodyWrapperHeight = this.tabBodyWrapper.nativeElement.clientHeight;
            this.tabBodyWrapper.nativeElement.style.height = '';
            this.animationDone.emit();
        };
        /** Handle click events, setting new selected index if appropriate. */
        McTabGroup.prototype.handleClick = function (tab, tabHeader, index) {
            if (tab.disabled) {
                return;
            }
            this.selectedIndex = tabHeader.focusIndex = index;
        };
        /** Retrieves the tabindex for the tab. */
        McTabGroup.prototype.getTabIndex = function (tab, index) {
            if (tab.disabled) {
                return null;
            }
            return this.selectedIndex === index ? 0 : -1;
        };
        McTabGroup.prototype.createChangeEvent = function (index) {
            var event = new McTabChangeEvent();
            event.index = index;
            if (this.tabs && this.tabs.length) {
                event.tab = this.tabs.toArray()[index];
            }
            return event;
        };
        /**
         * Subscribes to changes in the tab labels. This is needed, because the @Input for the label is
         * on the McTab component, whereas the data binding is inside the McTabGroup. In order for the
         * binding to be updated, we need to subscribe to changes in it and trigger change detection
         * manually.
         */
        McTabGroup.prototype.subscribeToTabLabels = function () {
            var _this = this;
            if (this.tabLabelSubscription) {
                this.tabLabelSubscription.unsubscribe();
            }
            this.tabLabelSubscription = rxjs.merge.apply(void 0, __spread(this.tabs.map(function (tab) { return tab.stateChanges; }))).subscribe(function () { return _this.changeDetectorRef.markForCheck(); });
        };
        /** Clamps the given index to the bounds of 0 and the tabs length. */
        McTabGroup.prototype.clampTabIndex = function (index) {
            // Note the `|| 0`, which ensures that values like NaN can't get through
            // and which would otherwise throw the component into an infinite loop
            // (since Mch.max(NaN, 0) === NaN).
            return Math.min(this.tabs.length - 1, Math.max(index || 0, 0));
        };
        return McTabGroup;
    }(McTabGroupMixinBase));
    McTabGroup.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-tab-group',
                    exportAs: 'mcTabGroup',
                    template: "<mc-tab-header\n    #tabHeader\n    [vertical]=\"vertical\"\n    [selectedIndex]=\"selectedIndex\"\n    (indexFocused)=\"focusChanged($event)\"\n    (selectFocusedIndex)=\"selectedIndex = $event\">\n\n    <div class=\"mc-tab-label\"\n         mcTabLabelWrapper\n         cdkMonitorElementFocus\n         [attr.tabindex]=\"getTabIndex(tab, i)\"\n         [class.mc-tab-label_old]=\"oldTab\"\n         [class.mc-tab-label_horizontal]=\"!vertical && !oldTab\"\n         [class.mc-tab-label_vertical]=\"vertical && !oldTab\"\n         [class.mc-tab-label_empty]=\"tab.empty\"\n         [class.mc-active]=\"selectedIndex == i\"\n         *ngFor=\"let tab of tabs; let i = index\"\n         [id]=\"getTabLabelId(i)\"\n         [disabled]=\"tab.disabled\"\n         (click)=\"handleClick(tab, tabHeader, i)\"\n\n         [mcTooltip]=\"tab.tooltipTitle\"\n         [mcTooltipDisabled]=\"!tab.empty\"\n         [mcTrigger]=\"'hover, focus'\"\n         [mcPlacement]=\"tab.tooltipPlacement\">\n\n        <div class=\"mc-tab-label__content\"\n            [class.mc-tab-label__template]=\"tab.templateLabel\">\n            <!-- If there is a label template, use it. -->\n            <ng-template [ngIf]=\"tab.templateLabel\">\n                <ng-template [cdkPortalOutlet]=\"tab.templateLabel\"></ng-template>\n            </ng-template>\n\n            <!-- If there is not a label template, fall back to the text label. -->\n            <ng-template [ngIf]=\"!tab.templateLabel\">{{ tab.textLabel }}</ng-template>\n        </div>\n\n        <div class=\"mc-tab-overlay\"></div>\n    </div>\n</mc-tab-header>\n\n<div class=\"mc-tab-body__wrapper\" #tabBodyWrapper>\n    <mc-tab-body\n        *ngFor=\"let tab of tabs; let i = index\"\n        [id]=\"getTabContentId(i)\"\n        [class.mc-tab-body__active]=\"selectedIndex == i\"\n        [content]=\"tab.content\"\n        [position]=\"tab.position\"\n        [origin]=\"tab.origin\"\n        [animationDuration]=\"animationDuration\"\n        (onCentered)=\"removeTabBodyWrapperHeight()\"\n        (onCentering)=\"setTabBodyWrapperHeight($event)\">\n    </mc-tab-body>\n</div>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    inputs: ['disabled'],
                    host: {
                        class: 'mc-tab-group',
                        '[class.mc-tab-group_dynamic-height]': 'dynamicHeight',
                        '[class.mc-tab-group_inverted-header]': 'headerPosition === "below"'
                    },
                    styles: [".mc-tab-group{display:flex;flex-direction:column;box-sizing:border-box;text-align:center;white-space:nowrap}.mc-tab-group.mc-tab-group_inverted-header{flex-direction:column-reverse}.mc-tab-group_vertical{flex-direction:row}.mc-tab-group_vertical .mc-tab-header__content{overflow-y:auto;padding-top:8px;padding-bottom:1px;border-right-width:var(--mc-tabs-size-border-width,1px);border-right-style:solid}.mc-tab-body__wrapper{display:flex;overflow:hidden;position:relative}.mc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;flex-basis:100%}.mc-tab-body.mc-tab-body__active{overflow-x:hidden;overflow-y:auto;position:relative;z-index:1;flex-grow:1}.mc-tab-group.mc-tab-group_dynamic-height .mc-tab-body.mc-tab-body__active{overflow-y:hidden}"]
                },] }
    ];
    /** @nocollapse */
    McTabGroup.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef },
        { type: String, decorators: [{ type: core.Attribute, args: ['mc-old-tabs',] }] },
        { type: String, decorators: [{ type: core.Attribute, args: ['vertical',] }] },
        { type: undefined, decorators: [{ type: core.Inject, args: [MC_TABS_CONFIG,] }, { type: core.Optional }] }
    ]; };
    McTabGroup.propDecorators = {
        tabs: [{ type: core.ContentChildren, args: [McTab,] }],
        tabBodyWrapper: [{ type: core.ViewChild, args: ['tabBodyWrapper', { static: false },] }],
        tabHeader: [{ type: core.ViewChild, args: ['tabHeader', { static: false },] }],
        dynamicHeight: [{ type: core.Input }],
        selectedIndex: [{ type: core.Input }],
        headerPosition: [{ type: core.Input }],
        animationDuration: [{ type: core.Input }],
        selectedIndexChange: [{ type: core.Output }],
        focusChange: [{ type: core.Output }],
        animationDone: [{ type: core.Output }],
        selectedTabChange: [{ type: core.Output }]
    };

    /* tslint:disable:naming-convention */
    /** Config used to bind passive event listeners */
    var passiveEventListenerOptions = platform.normalizePassiveListenerOptions({ passive: true });
    /**
     * The distance in pixels that will be overshot when scrolling a tab label into view. This helps
     * provide a small affordance to the label next to it.
     */
    var EXAGGERATED_OVERSCROLL = 60;
    /**
     * Amount of milliseconds to wait before starting to scroll the header automatically.
     * Set a little conservatively in order to handle fake events dispatched on touch devices.
     */
    var HEADER_SCROLL_DELAY = 650;
    /**
     * Interval in milliseconds at which to scroll the header
     * while the user is holding their pointer.
     */
    var HEADER_SCROLL_INTERVAL = 100;
    var VIEWPORT_THROTTLE_TIME = 150;
    var SCROLL_DISTANCE = 0.8;
    /**
     * Base class for a tab header that supported pagination.
     * @docs-private
     */
    var McPaginatedTabHeader = /** @class */ (function () {
        function McPaginatedTabHeader(elementRef, changeDetectorRef, viewportRuler, ngZone, platform, dir, animationMode) {
            var _this = this;
            this.elementRef = elementRef;
            this.changeDetectorRef = changeDetectorRef;
            this.viewportRuler = viewportRuler;
            this.ngZone = ngZone;
            this.platform = platform;
            this.dir = dir;
            this.animationMode = animationMode;
            this._selectedIndex = 0;
            /** The distance in pixels that the tab labels should be translated to the left. */
            this._scrollDistance = 0;
            /** Event emitted when the option is selected. */
            this.selectFocusedIndex = new core.EventEmitter();
            /** Event emitted when a label is focused. */
            this.indexFocused = new core.EventEmitter();
            /** Whether the controls for pagination should be displayed */
            this.showPaginationControls = false;
            /** Whether the tab list can be scrolled more towards the end of the tab label list. */
            this.disableScrollAfter = true;
            /** Whether the tab list can be scrolled more towards the beginning of the tab label list. */
            this.disableScrollBefore = true;
            /**
             * Whether pagination should be disabled. This can be used to avoid unnecessary
             * layout recalculations if it's known that pagination won't be required.
             */
            this.disablePagination = false;
            /** Emits when the component is destroyed. */
            this.destroyed = new rxjs.Subject();
            this.vertical = false;
            /** Stream that will stop the automated scrolling. */
            this.stopScrolling = new rxjs.Subject();
            /** Whether the header should scroll to the selected index after the view has been checked. */
            this.selectedIndexChanged = false;
            // Bind the `mouseleave` event on the outside since it doesn't change anything in the view.
            ngZone.runOutsideAngular(function () {
                rxjs.fromEvent(elementRef.nativeElement, 'mouseleave')
                    .pipe(operators.takeUntil(_this.destroyed))
                    .subscribe(function () { return _this.stopInterval(); });
            });
        }
        Object.defineProperty(McPaginatedTabHeader.prototype, "selectedIndex", {
            /** The index of the active tab. */
            get: function () {
                return this._selectedIndex;
            },
            set: function (value) {
                var _a;
                var coercedValue = coercion.coerceNumberProperty(value);
                this.selectedIndexChanged = this._selectedIndex !== coercedValue;
                this._selectedIndex = coercedValue;
                (_a = this.keyManager) === null || _a === void 0 ? void 0 : _a.updateActiveItem(coercedValue);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPaginatedTabHeader.prototype, "focusIndex", {
            /** Tracks which element has focus; used for keyboard navigation */
            get: function () {
                return this.keyManager ? this.keyManager.activeItemIndex : 0;
            },
            /** When the focus index is set, we must manually send focus to the correct label */
            set: function (value) {
                if (!this.isValidIndex(value) || this.focusIndex === value || !this.keyManager) {
                    return;
                }
                this.keyManager.setActiveItem(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McPaginatedTabHeader.prototype, "scrollDistance", {
            /** Sets the distance in pixels that the tab header should be transformed in the X-axis. */
            get: function () {
                return this._scrollDistance;
            },
            set: function (v) {
                this._scrollDistance = Math.max(0, Math.min(this.getMaxScrollDistance(), v));
                // Mark that the scroll distance has changed so that after the view is checked, the CSS
                // transformation can move the header.
                this.scrollDistanceChanged = true;
                this.checkScrollingControls();
            },
            enumerable: false,
            configurable: true
        });
        /** Called when the user has selected an item via the keyboard. */
        McPaginatedTabHeader.prototype.ngAfterViewInit = function () {
            var _this = this;
            // We need to handle these events manually, because we want to bind passive event listeners.
            rxjs.fromEvent(this.previousPaginator.nativeElement, 'touchstart', passiveEventListenerOptions)
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function () { return _this.handlePaginatorPress('before'); });
            rxjs.fromEvent(this.nextPaginator.nativeElement, 'touchstart', passiveEventListenerOptions)
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function () { return _this.handlePaginatorPress('after'); });
        };
        McPaginatedTabHeader.prototype.ngAfterContentInit = function () {
            var _this = this;
            var dirChange = this.dir ? this.dir.change : rxjs.of('ltr');
            var resize = this.viewportRuler.change(VIEWPORT_THROTTLE_TIME);
            var realign = function () {
                _this.updatePagination();
            };
            this.keyManager = new a11y.FocusKeyManager(this.items)
                .withHorizontalOrientation(this.getLayoutDirection());
            this.keyManager.updateActiveItem(this._selectedIndex);
            // Defer the first call in order to allow for slower browsers to lay out the elements.
            // This helps in cases where the user lands directly on a page with paginated tabs.
            typeof requestAnimationFrame !== undefined ? requestAnimationFrame(realign) : realign();
            // On dir change or window resize, realign the ink bar and update the orientation of
            // the key manager if the direction has changed.
            rxjs.merge(dirChange, resize, this.items.changes)
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function () {
                // We need to defer this to give the browser some time to recalculate
                // the element dimensions. The call has to be wrapped in `NgZone.run`,
                // because the viewport change handler runs outside of Angular.
                _this.ngZone.run(function () { return Promise.resolve().then(realign); });
                _this.keyManager.withHorizontalOrientation(_this.getLayoutDirection());
            });
            // If there is a change in the focus key manager we need to emit the `indexFocused`
            // event in order to provide a public event that notifies about focus changes. Also we realign
            // the tabs container by scrolling the new focused tab into the visible section.
            this.keyManager.change
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (newFocusIndex) {
                _this.indexFocused.emit(newFocusIndex);
                _this.setTabFocus(newFocusIndex);
            });
        };
        McPaginatedTabHeader.prototype.ngAfterContentChecked = function () {
            // If the number of tab labels have changed, check if scrolling should be enabled
            if (this.tabLabelCount !== this.items.length) {
                this.updatePagination();
                this.tabLabelCount = this.items.length;
                this.changeDetectorRef.markForCheck();
            }
            // If the selected index has changed, scroll to the label and check if the scrolling controls
            // should be disabled.
            if (this.selectedIndexChanged) {
                this.scrollToLabel(this._selectedIndex);
                this.checkScrollingControls();
                this.selectedIndexChanged = false;
                this.changeDetectorRef.markForCheck();
            }
            // If the scroll distance has been changed (tab selected, focused, scroll controls activated),
            // then translate the header to reflect this.
            if (this.scrollDistanceChanged) {
                this.updateTabScrollPosition();
                this.scrollDistanceChanged = false;
                this.changeDetectorRef.markForCheck();
            }
        };
        McPaginatedTabHeader.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
            this.stopScrolling.complete();
        };
        McPaginatedTabHeader.prototype.handleKeydown = function (event) {
            // We don't handle any key bindings with a modifier key.
            if (keycodes.hasModifierKey(event)) {
                return;
            }
            // tslint:disable-next-line: deprecation
            var key = event.keyCode;
            if (key === keycodes$1.HOME) {
                this.keyManager.setFirstItemActive();
            }
            else if (key === keycodes$1.END) {
                this.keyManager.setLastItemActive();
            }
            else if (key === keycodes$1.UP_ARROW && this.vertical) {
                this.keyManager.setPreviousItemActive();
            }
            else if (key === keycodes$1.DOWN_ARROW && this.vertical) {
                this.keyManager.setNextItemActive();
            }
            else if (key === keycodes$1.RIGHT_ARROW && !this.vertical) {
                this.keyManager.setNextItemActive();
            }
            else if (key === keycodes$1.LEFT_ARROW && !this.vertical) {
                this.keyManager.setPreviousItemActive();
            }
            else if ([keycodes.ENTER, keycodes.SPACE].includes(key)) {
                this.selectFocusedIndex.emit(this.focusIndex);
            }
            if ([keycodes$1.HOME, keycodes$1.END, keycodes$1.UP_ARROW, keycodes$1.DOWN_ARROW, keycodes$1.RIGHT_ARROW, keycodes$1.LEFT_ARROW, keycodes.SPACE, keycodes.ENTER].includes(key)) {
                event.preventDefault();
            }
        };
        /**
         * Callback for when the MutationObserver detects that the content has changed.
         */
        McPaginatedTabHeader.prototype.onContentChanges = function () {
            var _this = this;
            var textContent = this.elementRef.nativeElement.textContent;
            // We need to diff the text content of the header, because the MutationObserver callback
            // will fire even if the text content didn't change which is inefficient and is prone
            // to infinite loops if a poorly constructed expression is passed in (see #14249).
            if (textContent !== this.currentTextContent) {
                this.currentTextContent = textContent || '';
                // The content observer runs outside the `NgZone` by default, which
                // means that we need to bring the callback back in ourselves.
                this.ngZone.run(function () {
                    _this.updatePagination();
                    _this.changeDetectorRef.markForCheck();
                });
            }
        };
        /**
         * Updates the view whether pagination should be enabled or not.
         *
         * WARNING: Calling this method can be very costly in terms of performance. It should be called
         * as infrequently as possible from outside of the Tabs component as it causes a reflow of the
         * page.
         */
        McPaginatedTabHeader.prototype.updatePagination = function () {
            this.checkPaginationEnabled();
            this.checkScrollingControls();
            this.updateTabScrollPosition();
        };
        /**
         * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
         * providing a valid index and return true.
         */
        McPaginatedTabHeader.prototype.isValidIndex = function (index) {
            if (!this.items) {
                return true;
            }
            var tab = this.items ? this.items.toArray()[index] : null;
            return !!tab && !tab.disabled;
        };
        /**
         * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
         * scrolling is enabled.
         */
        McPaginatedTabHeader.prototype.setTabFocus = function (tabIndex) {
            var _a;
            if (this.showPaginationControls) {
                this.scrollToLabel(tabIndex);
            }
            if ((_a = this.items) === null || _a === void 0 ? void 0 : _a.length) {
                this.items.toArray()[tabIndex].focus();
                // Do not let the browser manage scrolling to focus the element, this will be handled
                // by using translation. In LTR, the scroll left should be 0. In RTL, the scroll width
                // should be the full width minus the offset width.
                var containerEl = this.tabListContainer.nativeElement;
                var dir = this.getLayoutDirection();
                if (dir === 'ltr') {
                    containerEl.scrollLeft = 0;
                }
                else {
                    containerEl.scrollLeft = containerEl.scrollWidth - containerEl.offsetWidth;
                }
            }
        };
        /** The layout direction of the containing app. */
        McPaginatedTabHeader.prototype.getLayoutDirection = function () {
            var _a;
            return ((_a = this.dir) === null || _a === void 0 ? void 0 : _a.value) === 'rtl' ? 'rtl' : 'ltr';
        };
        /** Performs the CSS transformation on the tab list that will cause the list to scroll. */
        McPaginatedTabHeader.prototype.updateTabScrollPosition = function () {
            if (this.disablePagination) {
                return;
            }
            var scrollDistance = this.scrollDistance;
            var translateX = this.getLayoutDirection() === 'ltr' ? -scrollDistance : scrollDistance;
            // Don't use `translate3d` here because we don't want to create a new layer. A new layer
            // seems to cause flickering and overflow in Internet Explorer. For example, the ink bar
            // and ripples will exceed the boundaries of the visible tab bar.
            // See: https://github.com/angular/components/issues/10276
            // We round the `transform` here, because transforms with sub-pixel precision cause some
            // browsers to blur the content of the element.
            this.tabList.nativeElement.style.transform = "translateX(" + Math.round(translateX) + "px)";
            // Setting the `transform` on IE will change the scroll offset of the parent, causing the
            // position to be thrown off in some cases. We have to reset it ourselves to ensure that
            // it doesn't get thrown off. Note that we scope it only to IE and Edge, because messing
            // with the scroll position throws off Chrome 71+ in RTL mode (see #14689).
            if (this.platform.TRIDENT || this.platform.EDGE) {
                this.tabListContainer.nativeElement.scrollLeft = 0;
            }
        };
        /**
         * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
         * the end of the list, respectively). The distance to scroll is computed to be a third of the
         * length of the tab list view window.
         *
         * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
         * should be called sparingly.
         */
        McPaginatedTabHeader.prototype.scrollHeader = function (direction) {
            var viewLength = this.tabListContainer.nativeElement.offsetWidth;
            // Move the scroll distance one-third the length of the tab list's viewport.
            var scrollAmount = (direction === 'before' ? -1 : 1) * viewLength * SCROLL_DISTANCE;
            return this.scrollTo(this.scrollDistance + scrollAmount);
        };
        /** Handles click events on the pagination arrows. */
        McPaginatedTabHeader.prototype.handlePaginatorClick = function (direction) {
            this.stopInterval();
            this.scrollHeader(direction);
        };
        /**
         * Moves the tab list such that the desired tab label (marked by index) is moved into view.
         *
         * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
         * should be called sparingly.
         */
        McPaginatedTabHeader.prototype.scrollToLabel = function (labelIndex) {
            if (this.disablePagination) {
                return;
            }
            var selectedLabel = this.items ? this.items.toArray()[labelIndex] : null;
            if (!selectedLabel) {
                return;
            }
            // The view length is the visible width of the tab labels.
            var viewLength = this.tabListContainer.nativeElement.offsetWidth;
            var _b = selectedLabel.elementRef.nativeElement, offsetLeft = _b.offsetLeft, offsetWidth = _b.offsetWidth;
            var labelBeforePos;
            var labelAfterPos;
            if (this.getLayoutDirection() === 'ltr') {
                labelBeforePos = offsetLeft;
                labelAfterPos = labelBeforePos + offsetWidth;
            }
            else {
                labelAfterPos = this.tabList.nativeElement.offsetWidth - offsetLeft;
                labelBeforePos = labelAfterPos - offsetWidth;
            }
            var beforeVisiblePos = this.scrollDistance;
            var afterVisiblePos = this.scrollDistance + viewLength;
            if (labelBeforePos < beforeVisiblePos) {
                // Scroll header to move label to the before direction
                this.scrollDistance -= beforeVisiblePos - labelBeforePos + EXAGGERATED_OVERSCROLL;
            }
            else if (labelAfterPos > afterVisiblePos) {
                // Scroll header to move label to the after direction
                this.scrollDistance += labelAfterPos - afterVisiblePos + EXAGGERATED_OVERSCROLL;
            }
        };
        /**
         * Evaluate whether the pagination controls should be displayed. If the scroll width of the
         * tab list is wider than the size of the header container, then the pagination controls should
         * be shown.
         *
         * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
         * should be called sparingly.
         */
        McPaginatedTabHeader.prototype.checkPaginationEnabled = function () {
            if (this.disablePagination) {
                this.showPaginationControls = false;
            }
            else {
                var isEnabled = this.tabList.nativeElement.scrollWidth > this.elementRef.nativeElement.offsetWidth;
                if (!isEnabled) {
                    this.scrollDistance = 0;
                }
                if (isEnabled !== this.showPaginationControls) {
                    this.changeDetectorRef.markForCheck();
                }
                this.showPaginationControls = isEnabled;
            }
        };
        /**
         * Evaluate whether the before and after controls should be enabled or disabled.
         * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
         * before button. If the header is at the end of the list (scroll distance is equal to the
         * maximum distance we can scroll), then disable the after button.
         *
         * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
         * should be called sparingly.
         */
        McPaginatedTabHeader.prototype.checkScrollingControls = function () {
            if (this.disablePagination) {
                this.disableScrollAfter = this.disableScrollBefore = true;
            }
            else {
                // Check if the pagination arrows should be activated.
                this.disableScrollBefore = this.scrollDistance === 0;
                this.disableScrollAfter = this.scrollDistance === this.getMaxScrollDistance();
                this.changeDetectorRef.markForCheck();
            }
        };
        /**
         * Determines what is the maximum length in pixels that can be set for the scroll distance. This
         * is equal to the difference in width between the tab list container and tab header container.
         *
         * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
         * should be called sparingly.
         */
        McPaginatedTabHeader.prototype.getMaxScrollDistance = function () {
            var lengthOfTabList = this.tabList.nativeElement.scrollWidth;
            var viewLength = this.tabListContainer.nativeElement.offsetWidth;
            return (lengthOfTabList - viewLength) || 0;
        };
        /** Stops the currently-running paginator interval.  */
        McPaginatedTabHeader.prototype.stopInterval = function () {
            this.stopScrolling.next();
        };
        /**
         * Handles the user pressing down on one of the paginators.
         * Starts scrolling the header after a certain amount of time.
         * @param direction In which direction the paginator should be scrolled.
         */
        McPaginatedTabHeader.prototype.handlePaginatorPress = function (direction, mouseEvent) {
            var _this = this;
            // Don't start auto scrolling for right mouse button clicks. Note that we shouldn't have to
            // null check the `button`, but we do it so we don't break tests that use fake events.
            if (mouseEvent && mouseEvent.button != null && mouseEvent.button !== 0) {
                return;
            }
            // Avoid overlapping timers.
            this.stopInterval();
            // Start a timer after the delay and keep firing based on the interval.
            rxjs.timer(HEADER_SCROLL_DELAY, HEADER_SCROLL_INTERVAL)
                // Keep the timer going until something tells it to stop or the component is destroyed.
                .pipe(operators.takeUntil(rxjs.merge(this.stopScrolling, this.destroyed)))
                .subscribe(function () {
                var _b = _this.scrollHeader(direction), maxScrollDistance = _b.maxScrollDistance, distance = _b.distance;
                // Stop the timer if we've reached the start or the end.
                if (distance === 0 || distance >= maxScrollDistance) {
                    _this.stopInterval();
                }
            });
        };
        /**
         * Scrolls the header to a given position.
         * @param position Position to which to scroll.
         * @returns Information on the current scroll distance and the maximum.
         */
        McPaginatedTabHeader.prototype.scrollTo = function (position) {
            if (this.disablePagination) {
                return { maxScrollDistance: 0, distance: 0 };
            }
            var maxScrollDistance = this.getMaxScrollDistance();
            this.scrollDistance = Math.max(0, Math.min(maxScrollDistance, position));
            // Mark that the scroll distance has changed so that after the view is checked, the CSS
            // transformation can move the header.
            this.scrollDistanceChanged = true;
            this.checkScrollingControls();
            return { maxScrollDistance: maxScrollDistance, distance: this.scrollDistance };
        };
        return McPaginatedTabHeader;
    }());
    McPaginatedTabHeader.decorators = [
        { type: core.Directive }
    ];
    /** @nocollapse */
    McPaginatedTabHeader.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef },
        { type: scrolling.ViewportRuler },
        { type: core.NgZone },
        { type: platform.Platform },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
        { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [animations$1.ANIMATION_MODULE_TYPE,] }] }
    ]; };
    McPaginatedTabHeader.propDecorators = {
        disablePagination: [{ type: core.Input }]
    };

    // Boilerplate for applying mixins to McTabLabelWrapper.
    /** @docs-private */
    var McTabLabelWrapperBase = /** @class */ (function () {
        function McTabLabelWrapperBase() {
        }
        return McTabLabelWrapperBase;
    }());
    // tslint:disable-next-line:naming-convention
    var McTabLabelWrapperMixinBase = core$1.mixinDisabled(McTabLabelWrapperBase);
    /**
     * Used in the `mc-tab-group` view to display tab labels.
     * @docs-private
     */
    var McTabLabelWrapper = /** @class */ (function (_super) {
        __extends(McTabLabelWrapper, _super);
        function McTabLabelWrapper(elementRef, renderer) {
            var _this = _super.call(this) || this;
            _this.elementRef = elementRef;
            _this.renderer = renderer;
            return _this;
        }
        McTabLabelWrapper.prototype.ngAfterViewInit = function () {
            this.addClassModifierForIcons(Array.from(this.elementRef.nativeElement.querySelectorAll('.mc-icon')));
        };
        /** Sets focus on the wrapper element */
        McTabLabelWrapper.prototype.focus = function () {
            this.elementRef.nativeElement.focus();
        };
        McTabLabelWrapper.prototype.getOffsetLeft = function () {
            return this.elementRef.nativeElement.offsetLeft;
        };
        McTabLabelWrapper.prototype.getOffsetWidth = function () {
            return this.elementRef.nativeElement.offsetWidth;
        };
        McTabLabelWrapper.prototype.addClassModifierForIcons = function (icons) {
            var twoIcons = 2;
            var _a = __read(icons, 2), firstIconElement = _a[0], secondIconElement = _a[1];
            if (icons.length === 1) {
                var COMMENT_NODE = 8;
                if (firstIconElement.nextSibling && firstIconElement.nextSibling.nodeType !== COMMENT_NODE) {
                    this.renderer.addClass(firstIconElement, 'mc-icon_left');
                }
                if (firstIconElement.previousSibling && firstIconElement.previousSibling.nodeType !== COMMENT_NODE) {
                    this.renderer.addClass(firstIconElement, 'mc-icon_right');
                }
            }
            else if (icons.length === twoIcons) {
                this.renderer.addClass(firstIconElement, 'mc-icon_left');
                this.renderer.addClass(secondIconElement, 'mc-icon_right');
            }
        };
        return McTabLabelWrapper;
    }(McTabLabelWrapperMixinBase));
    McTabLabelWrapper.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mcTabLabelWrapper]',
                    inputs: ['disabled'],
                    host: {
                        '[class.mc-disabled]': 'disabled'
                    }
                },] }
    ];
    /** @nocollapse */
    McTabLabelWrapper.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.Renderer2 }
    ]; };

    /**
     * The header of the tab group which displays a list of all the tabs in the tab group.
     * When the tabs list's width exceeds the width of the header container,
     * then arrows will be displayed to allow the user to scroll
     * left and right across the header.
     * @docs-private
     */
    var McTabHeader = /** @class */ (function (_super) {
        __extends(McTabHeader, _super);
        function McTabHeader(elementRef, changeDetectorRef, viewportRuler, ngZone, platform, dir, animationMode) {
            var _this = _super.call(this, elementRef, changeDetectorRef, viewportRuler, ngZone, platform, dir, animationMode) || this;
            _this.elementRef = elementRef;
            _this.changeDetectorRef = changeDetectorRef;
            /** The index of the active tab. */
            _this.vertical = false;
            return _this;
        }
        McTabHeader.prototype.itemSelected = function (event) {
            event.preventDefault();
        };
        return McTabHeader;
    }(McPaginatedTabHeader));
    McTabHeader.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-tab-header',
                    template: "<div class=\"mc-tab-header__pagination mc-tab-header__pagination_before mc-elevation-z4\"\n     #previousPaginator\n     [class.mc-disabled]=\"disableScrollBefore\"\n     (click)=\"handlePaginatorClick('before')\"\n     (mousedown)=\"handlePaginatorPress('before', $event)\"\n     (touchend)=\"stopInterval()\">\n\n    <i mc-icon=\"mc-angle-left-M_16\"></i>\n</div>\n\n<div class=\"mc-tab-header__content\"\n     #tabListContainer\n     (keydown)=\"handleKeydown($event)\">\n\n    <div class=\"mc-tab-list\"\n         #tabList\n         (cdkObserveContent)=\"onContentChanges()\">\n        <div class=\"mc-tab-list__content\">\n            <ng-content></ng-content>\n        </div>\n    </div>\n</div>\n\n<div class=\"mc-tab-header__pagination mc-tab-header__pagination_after mc-elevation-z4\"\n     #nextPaginator\n     [class.mc-disabled]=\"disableScrollAfter\"\n     (mousedown)=\"handlePaginatorPress('after', $event)\"\n     (click)=\"handlePaginatorClick('after')\"\n     (touchend)=\"stopInterval()\">\n\n    <i mc-icon=\"mc-angle-right-M_16\"></i>\n</div>\n",
                    inputs: ['selectedIndex'],
                    outputs: ['selectFocusedIndex', 'indexFocused'],
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.Default,
                    host: {
                        class: 'mc-tab-header',
                        '[class.mc-tab-header_vertical]': 'vertical',
                        '[class.mc-tab-header__pagination-controls_enabled]': 'showPaginationControls',
                        '[class.mc-tab-header_rtl]': 'getLayoutDirection() == \'rtl\''
                    },
                    styles: [".mc-tab-label.cdk-keyboard-focused:after{display:block;content:\"\";position:absolute;top:0;right:calc(-1 * var(--mc-tabs-size-border-width, 1px));bottom:calc(-1 * var(--mc-tabs-size-border-width, 1px));left:calc(-1 * var(--mc-tabs-size-border-width, 1px))}.mc-tab-label_horizontal.cdk-keyboard-focused:after,.mc-tab-label_old.cdk-keyboard-focused:after{border-style:solid;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px);border-bottom:solid transparent;border-width:calc(var(--mc-tabs-size-border-width, 1px) * 2)}.mc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mc-tab-list__content{display:flex}.mc-tab-group_align-labels-center .mc-tab-list__content{justify-content:center}.mc-tab-group_align-labels-end .mc-tab-list__content{justify-content:flex-end}.mc-tab-header_vertical .mc-tab-list__content{flex-direction:column}.mc-tab-header__pagination{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;cursor:pointer;z-index:2;-webkit-tap-highlight-color:transparent;touch-action:none;padding-left:12px;padding-right:12px;border-bottom-style:solid;border-bottom-width:var(--mc-tabs-size-border-width,1px)}.mc-tab-header__pagination.mc-tab-header__pagination_before{border-right-style:solid;border-right-width:var(--mc-tabs-size-border-width,1px)}.mc-tab-header__pagination.mc-tab-header__pagination_after{border-left-style:solid;border-left-width:var(--mc-tabs-size-border-width,1px)}.mc-tab-header__pagination-controls_enabled .mc-tab-header__pagination{display:flex}.mc-tab-header__content{display:flex;flex-grow:1;z-index:1;overflow:hidden}.mc-tab-list{flex-grow:1;position:relative;transition:transform .5s cubic-bezier(.35,0,.25,1)}.mc-tab-label{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:var(--mc-tabs-size-height,40px);text-align:center;white-space:nowrap;cursor:pointer;padding-right:var(--mc-tabs-size-padding-horizontal,16px);padding-left:var(--mc-tabs-size-padding-horizontal,16px);outline:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-tab-label .mc-tab-overlay{position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none}.mc-tab-label.mc-active{cursor:default}.mc-tab-label.mc-active:before{display:block;content:\"\";position:absolute}.mc-tab-label.mc-active.mc-disabled .mc-tab-overlay{bottom:-1px}.mc-tab-label.cdk-keyboard-focused{z-index:1}.mc-tab-label:first-child.cdk-keyboard-focused:after{left:0}.mc-tab-label:last-child.cdk-keyboard-focused:after{right:0}.mc-tab-label.mc-disabled{pointer-events:none}.mc-tab-label .mc-tab-label__template{display:flex;flex-direction:row;align-items:baseline}.mc-tab-label .mc-tab-label__template>.mc-icon.mc-icon_left{margin-right:var(--mc-tabs-size-label-icon-margin,8px)}.mc-tab-label .mc-tab-label__template>.mc-icon.mc-icon_right{margin-left:var(--mc-tabs-size-label-icon-margin,8px)}.mc-tab-label_old{border-bottom-width:var(--mc-tabs-size-border-width,1px);border-top-width:var(--mc-tabs-size-border-width,1px);border-bottom-style:solid;border-top-style:solid;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px);border-left:transparent;border-right:transparent}.mc-tab-label_old.mc-active{border-width:var(--mc-tabs-size-border-width,1px);border-style:solid;padding-right:calc(var(--mc-tabs-size-padding-horizontal, 16px) - var(--mc-tabs-size-border-width, 1px));padding-left:calc(var(--mc-tabs-size-padding-horizontal, 16px) - var(--mc-tabs-size-border-width, 1px))}.mc-tab-label_old.mc-active.cdk-keyboard-focused:after{right:calc(-2 * var(--mc-tabs-size-border-width, 1px));left:calc(-2 * var(--mc-tabs-size-border-width, 1px))}.mc-tab-label_old.cdk-keyboard-focused:after{top:-1px}.mc-tab-label_old .mc-tab-overlay{top:-1px;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px)}.mc-tab-label_horizontal{border-bottom-width:var(--mc-tabs-size-border-width,1px);border-bottom-style:solid}.mc-tab-label_horizontal.mc-active:before{bottom:calc(-1 * var(--mc-tabs-size-border-width, 1px));left:0;right:0;height:var(--mc-tabs-size-highlight-height,4px)}.mc-tab-label_vertical{justify-content:flex-start}.mc-tab-label_vertical.mc-active:before{top:0;bottom:0;left:calc(-1 * var(--mc-tabs-size-border-width, 1px));width:var(--mc-tabs-size-highlight-height,5px)}.mc-tab-label_vertical.cdk-keyboard-focused:after{right:0;left:0;border-width:calc(var(--mc-tabs-size-border-width, 1px) * 2);border-style:solid}.mc-tab-group_stretch-labels .mc-tab-label,.mc-tab-group_stretch-labels .mc-tab-label_old{flex-basis:0;flex-grow:1}"]
                },] }
    ];
    /** @nocollapse */
    McTabHeader.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef },
        { type: scrolling.ViewportRuler },
        { type: core.NgZone },
        { type: platform.Platform },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
        { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [animations$1.ANIMATION_MODULE_TYPE,] }] }
    ]; };
    McTabHeader.propDecorators = {
        vertical: [{ type: core.Input }],
        items: [{ type: core.ContentChildren, args: [McTabLabelWrapper, { descendants: false },] }],
        tabListContainer: [{ type: core.ViewChild, args: ['tabListContainer', { static: true },] }],
        tabList: [{ type: core.ViewChild, args: ['tabList', { static: true },] }],
        nextPaginator: [{ type: core.ViewChild, args: ['nextPaginator',] }],
        previousPaginator: [{ type: core.ViewChild, args: ['previousPaginator',] }]
    };

    // Boilerplate for applying mixins to McTabLink.
    var McTabLinkBase = /** @class */ (function () {
        function McTabLinkBase() {
        }
        return McTabLinkBase;
    }());
    // tslint:disable-next-line:naming-convention
    var McTabLinkMixinBase = core$1.mixinTabIndex(core$1.mixinDisabled(McTabLinkBase));
    /**
     * Link inside of a `mc-tab-nav-bar`.
     */
    var McTabLink = /** @class */ (function (_super) {
        __extends(McTabLink, _super);
        function McTabLink(elementRef, focusMonitor) {
            var _this = _super.call(this) || this;
            _this.elementRef = elementRef;
            _this.focusMonitor = focusMonitor;
            /** Whether the tab link is active or not. */
            _this.isActive = false;
            _this.focusMonitor.monitor(_this.elementRef.nativeElement);
            return _this;
        }
        Object.defineProperty(McTabLink.prototype, "active", {
            /** Whether the link is active. */
            get: function () {
                return this.isActive;
            },
            set: function (value) {
                if (value !== this.isActive) {
                    this.isActive = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        McTabLink.prototype.ngOnDestroy = function () {
            this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
        };
        return McTabLink;
    }(McTabLinkMixinBase));
    McTabLink.decorators = [
        { type: core.Directive, args: [{
                    selector: 'a[mc-tab-link], a[mcTabLink]',
                    exportAs: 'mcTabLink',
                    inputs: ['disabled', 'tabIndex'],
                    host: {
                        class: 'mc-tab-link',
                        '[attr.tabindex]': 'tabIndex',
                        '[class.mc-disabled]': 'disabled',
                        '[class.mc-active]': 'active',
                        '[class.mc-tab-label_vertical]': 'vertical',
                        '[class.mc-tab-label_horizontal]': '!vertical'
                    }
                },] }
    ];
    /** @nocollapse */
    McTabLink.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: a11y.FocusMonitor }
    ]; };
    McTabLink.propDecorators = {
        active: [{ type: core.Input }]
    };
    /**
     * Navigation component matching the styles of the tab group header.
     */
    var McTabNav = /** @class */ (function () {
        function McTabNav(vertical) {
            this.vertical = false;
            this.vertical = coercion.coerceBooleanProperty(vertical);
        }
        McTabNav.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.links.changes
                .pipe(operators.delay(0))
                .subscribe(function (links) { return links.forEach(function (link) { return link.vertical = _this.vertical; }); });
            this.links.notifyOnChanges();
        };
        return McTabNav;
    }());
    McTabNav.decorators = [
        { type: core.Component, args: [{
                    selector: '[mc-tab-nav-bar]',
                    exportAs: 'mcTabNavBar, mcTabNav',
                    template: "<div class=\"mc-tab-links\">\n    <ng-content></ng-content>\n</div>\n",
                    host: {
                        class: 'mc-tab-nav-bar'
                    },
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link.cdk-keyboard-focused:after{display:block;content:\"\";position:absolute;top:0;right:calc(-1 * var(--mc-tabs-size-border-width, 1px));bottom:calc(-1 * var(--mc-tabs-size-border-width, 1px));left:calc(-1 * var(--mc-tabs-size-border-width, 1px))}.mc-tab-nav-bar.mc-tab-group_old .mc-tab-link.cdk-keyboard-focused:after{border-style:solid;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px);border-bottom:solid transparent;border-width:calc(var(--mc-tabs-size-border-width, 1px) * 2)}.mc-tab-link{vertical-align:top;text-decoration:none;-webkit-tap-highlight-color:transparent}.mc-tab-group_stretch-labels .mc-tab-link{flex-basis:0;flex-grow:1}.mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar{display:flex}.mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:var(--mc-tabs-size-height,40px);text-align:center;white-space:nowrap;cursor:pointer;padding-right:var(--mc-tabs-size-padding-horizontal,16px);padding-left:var(--mc-tabs-size-padding-horizontal,16px);outline:none}.mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link .mc-tab-overlay{position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none}.mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link.mc-active{cursor:default}.mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link.mc-active:before{display:block;content:\"\";position:absolute}.mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link.mc-active.mc-disabled .mc-tab-overlay{bottom:-1px}.mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link.cdk-keyboard-focused{z-index:1}.mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link:first-child.cdk-keyboard-focused:after{left:0}.mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link:last-child.cdk-keyboard-focused:after{right:0}.mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link .mc-tab-label__template{display:flex;flex-direction:row;align-items:baseline}.mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link .mc-tab-label__template>.mc-icon.mc-icon_left{margin-right:var(--mc-tabs-size-label-icon-margin,8px)}.mc-tab-nav-bar:not(.mc-tab-group_old) .mc-tab-link .mc-tab-label__template>.mc-icon.mc-icon_right{margin-left:var(--mc-tabs-size-label-icon-margin,8px)}.mc-tab-nav-bar.mc-tab-group_old .mc-tab-link{border-bottom-width:var(--mc-tabs-size-border-width,1px);border-top-width:var(--mc-tabs-size-border-width,1px);border-bottom-style:solid;border-top-style:solid;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px);border-left:transparent;border-right:transparent}.mc-tab-nav-bar.mc-tab-group_old .mc-tab-link.mc-active{border-width:var(--mc-tabs-size-border-width,1px);border-style:solid;padding-right:calc(var(--mc-tabs-size-padding-horizontal, 16px) - var(--mc-tabs-size-border-width, 1px));padding-left:calc(var(--mc-tabs-size-padding-horizontal, 16px) - var(--mc-tabs-size-border-width, 1px))}.mc-tab-nav-bar.mc-tab-group_old .mc-tab-link.mc-active.cdk-keyboard-focused:after{right:calc(-2 * var(--mc-tabs-size-border-width, 1px));left:calc(-2 * var(--mc-tabs-size-border-width, 1px))}.mc-tab-nav-bar.mc-tab-group_old .mc-tab-link.cdk-keyboard-focused:after{top:-1px}.mc-tab-nav-bar.mc-tab-group_old .mc-tab-link .mc-tab-overlay{top:-1px;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px)}.mc-tab-links{display:flex;position:relative;padding:1px 1px 0;flex-grow:1}.mc-tab-links .mc-tab-group_align-labels-center{justify-content:center}.mc-tab-links .mc-tab-group_align-labels-end{justify-content:flex-end}"]
                },] }
    ];
    /** @nocollapse */
    McTabNav.ctorParameters = function () { return [
        { type: String, decorators: [{ type: core.Attribute, args: ['vertical',] }] }
    ]; };
    McTabNav.propDecorators = {
        links: [{ type: core.ContentChildren, args: [McTabLink,] }]
    };

    var McTabsModule = /** @class */ (function () {
        function McTabsModule() {
        }
        return McTabsModule;
    }());
    McTabsModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        portal.PortalModule,
                        a11y.A11yModule,
                        core$1.McCommonModule,
                        icon.McIconModule,
                        tooltip.McToolTipModule
                    ],
                    // Don't export all components because some are only to be used internally.
                    exports: [
                        core$1.McCommonModule,
                        McTabGroup,
                        McTabLabel,
                        McTab,
                        McTabNav,
                        McTabLink,
                        McTabContent,
                        McOldTabsCssStyler,
                        McAlignTabsCenterCssStyler,
                        McAlignTabsEndCssStyler,
                        McStretchTabsCssStyler,
                        McVerticalTabsCssStyler
                    ],
                    declarations: [
                        McTabGroup,
                        McTabLabel,
                        McTab,
                        McTabLabelWrapper,
                        McTabNav,
                        McTabLink,
                        McTabBody,
                        McTabBodyPortal,
                        McTabHeader,
                        McTabContent,
                        McOldTabsCssStyler,
                        McAlignTabsCenterCssStyler,
                        McAlignTabsEndCssStyler,
                        McStretchTabsCssStyler,
                        McVerticalTabsCssStyler
                    ]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.MC_TABS_CONFIG = MC_TABS_CONFIG;
    exports.McAlignTabsCenterCssStyler = McAlignTabsCenterCssStyler;
    exports.McAlignTabsEndCssStyler = McAlignTabsEndCssStyler;
    exports.McOldTabsCssStyler = McOldTabsCssStyler;
    exports.McStretchTabsCssStyler = McStretchTabsCssStyler;
    exports.McTab = McTab;
    exports.McTabBody = McTabBody;
    exports.McTabBodyPortal = McTabBodyPortal;
    exports.McTabChangeEvent = McTabChangeEvent;
    exports.McTabContent = McTabContent;
    exports.McTabGroup = McTabGroup;
    exports.McTabGroupBase = McTabGroupBase;
    exports.McTabGroupMixinBase = McTabGroupMixinBase;
    exports.McTabHeader = McTabHeader;
    exports.McTabLabel = McTabLabel;
    exports.McTabLabelWrapper = McTabLabelWrapper;
    exports.McTabLink = McTabLink;
    exports.McTabNav = McTabNav;
    exports.McTabsModule = McTabsModule;
    exports.McVerticalTabsCssStyler = McVerticalTabsCssStyler;
    exports.mcTabsAnimations = mcTabsAnimations;
    exports.ɵa = McTabLabelWrapperBase;
    exports.ɵb = McTabLabelWrapperMixinBase;
    exports.ɵc = McTabBase;
    exports.ɵd = McTabMixinBase;
    exports.ɵe = MC_TAB_LABEL;
    exports.ɵf = McTabLinkBase;
    exports.ɵg = McTabLinkMixinBase;
    exports.ɵh = McPaginatedTabHeader;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-tabs.umd.js.map
