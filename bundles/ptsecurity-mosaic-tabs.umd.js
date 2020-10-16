(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/cdk/portal'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/core'), require('rxjs'), require('@angular/cdk/bidi'), require('rxjs/operators'), require('@angular/animations'), require('@angular/cdk/coercion'), require('@angular/cdk/scrolling'), require('@ptsecurity/cdk/a11y'), require('@ptsecurity/cdk/keycodes')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/tabs', ['exports', '@angular/cdk/a11y', '@angular/cdk/portal', '@angular/common', '@angular/core', '@ptsecurity/mosaic/core', 'rxjs', '@angular/cdk/bidi', 'rxjs/operators', '@angular/animations', '@angular/cdk/coercion', '@angular/cdk/scrolling', '@ptsecurity/cdk/a11y', '@ptsecurity/cdk/keycodes'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.tabs = {}), global.ng.cdk.a11y, global.ng.cdk.portal, global.ng.common, global.ng.core, global.ptsecurity.mosaic.core, global.rxjs, global.ng.cdk.bidi, global.rxjs.operators, global.ng.animations, global.ng.cdk.coercion, global.ng.cdk.scrolling, global.a11y, global.keycodes));
}(this, (function (exports, a11y$1, portal, common, core, core$1, rxjs, bidi, operators, animations, coercion, scrolling, a11y, keycodes) { 'use strict';

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
     * Generated from: tab-content.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Decorates the `ng-template` tags and reads out the template from it.
     */
    var McTabContent = /** @class */ (function () {
        /**
         * @param {?} template
         */
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
    if (false) {
        /** @type {?} */
        McTabContent.prototype.template;
    }

    /**
     * Used to flag tab labels for use with the portal directive
     */
    var McTabLabel = /** @class */ (function (_super) {
        __extends(McTabLabel, _super);
        function McTabLabel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return McTabLabel;
    }(portal.CdkPortal));
    McTabLabel.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mc-tab-label], [mcTabLabel]'
                },] }
    ];
    // TODO: workaround for https://github.com/angular/material2/issues/12760
    (( /** @type {?} */(McTabLabel))).ctorParameters = ( /**
     * @return {?}
     */function () { return (( /** @type {?} */(portal.CdkPortal))).ctorParameters; });

    var McTabBase = /** @class */ (function () {
        function McTabBase() {
        }
        return McTabBase;
    }());
    // tslint:disable-next-line:naming-convention
    /** @type {?} */
    var McTabMixinBase = core$1.mixinDisabled(McTabBase);
    var McTab = /** @class */ (function (_super) {
        __extends(McTab, _super);
        /**
         * @param {?} viewContainerRef
         */
        function McTab(viewContainerRef) {
            var _this = _super.call(this) || this;
            _this.viewContainerRef = viewContainerRef;
            /**
             * Plain text label for the tab, used when there is no template label.
             */
            _this.textLabel = '';
            /**
             * Emits whenever the internal state of the tab changes.
             */
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
            /**
             * Portal that will be the hosted content of the tab
             */
            _this.contentPortal = null;
            return _this;
        }
        Object.defineProperty(McTab.prototype, "content", {
            /**
             * \@docs-private
             * @return {?}
             */
            get: function () {
                return this.contentPortal;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @param {?} changes
         * @return {?}
         */
        McTab.prototype.ngOnChanges = function (changes) {
            if (changes.hasOwnProperty('textLabel') || changes.hasOwnProperty('disabled')) {
                this.stateChanges.next();
            }
        };
        /**
         * @return {?}
         */
        McTab.prototype.ngOnDestroy = function () {
            this.stateChanges.complete();
        };
        /**
         * @return {?}
         */
        McTab.prototype.ngOnInit = function () {
            this.contentPortal = new portal.TemplatePortal(this.explicitContent || this.implicitContent, this.viewContainerRef);
        };
        return McTab;
    }(McTabMixinBase));
    McTab.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-tab',
                    // Create a template for the content of the <mc-tab> so that we can grab a reference to this
                    // TemplateRef and use it in a Portal to render the tab content in the appropriate place in the
                    // tab-group.
                    template: '<ng-template><ng-content></ng-content></ng-template>',
                    inputs: ['disabled'],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    exportAs: 'mcTab'
                }] }
    ];
    /** @nocollapse */
    McTab.ctorParameters = function () { return [
        { type: core.ViewContainerRef }
    ]; };
    McTab.propDecorators = {
        templateLabel: [{ type: core.ContentChild, args: [McTabLabel, { static: false },] }],
        explicitContent: [{ type: core.ContentChild, args: [McTabContent, { read: core.TemplateRef, static: true },] }],
        implicitContent: [{ type: core.ViewChild, args: [core.TemplateRef, { static: true },] }],
        textLabel: [{ type: core.Input, args: ['label',] }],
        tabId: [{ type: core.Input, args: ['tabId',] }],
        ariaLabel: [{ type: core.Input, args: ['aria-label',] }],
        ariaLabelledby: [{ type: core.Input, args: ['aria-labelledby',] }]
    };
    if (false) {
        /**
         * Content for the tab label given by `<ng-template mc-tab-label>`.
         * @type {?}
         */
        McTab.prototype.templateLabel;
        /**
         * Template provided in the tab content that will be used if present, used to enable lazy-loading
         * @type {?}
         */
        McTab.prototype.explicitContent;
        /**
         * Template inside the McTab view that contains an `<ng-content>`.
         * @type {?}
         */
        McTab.prototype.implicitContent;
        /**
         * Plain text label for the tab, used when there is no template label.
         * @type {?}
         */
        McTab.prototype.textLabel;
        /** @type {?} */
        McTab.prototype.tabId;
        /**
         * Aria label for the tab.
         * @type {?}
         */
        McTab.prototype.ariaLabel;
        /**
         * Reference to the element that the tab is labelled by.
         * Will be cleared if `aria-label` is set at the same time.
         * @type {?}
         */
        McTab.prototype.ariaLabelledby;
        /**
         * Emits whenever the internal state of the tab changes.
         * @type {?}
         */
        McTab.prototype.stateChanges;
        /**
         * The relatively indexed position where 0 represents the center, negative is left, and positive
         * represents the right.
         * @type {?}
         */
        McTab.prototype.position;
        /**
         * The initial relatively index origin of the tab if it was created and selected after there
         * was already a selected tab. Provides context of what position the tab should originate from.
         * @type {?}
         */
        McTab.prototype.origin;
        /**
         * Whether the tab is currently active.
         * @type {?}
         */
        McTab.prototype.isActive;
        /**
         * Portal that will be the hosted content of the tab
         * @type {?}
         * @private
         */
        McTab.prototype.contentPortal;
        /**
         * @type {?}
         * @private
         */
        McTab.prototype.viewContainerRef;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: tabs-animations.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var mcTabsAnimations = {
        /**
         * Animation translates a tab along the X axis.
         */
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
     * \@docs-private
     */
    var McTabBody = /** @class */ (function () {
        /**
         * @param {?} elementRef
         * @param {?} dir
         * @param {?} changeDetectorRef
         */
        function McTabBody(elementRef, dir, changeDetectorRef) {
            var _this = this;
            this.elementRef = elementRef;
            this.dir = dir;
            /**
             * Event emitted when the tab begins to animate towards the center as the active tab.
             */
            this.onCentering = new core.EventEmitter();
            /**
             * Event emitted before the centering of the tab begins.
             */
            this.beforeCentering = new core.EventEmitter();
            /**
             * Event emitted before the centering of the tab begins.
             */
            this.afterLeavingCenter = new core.EventEmitter();
            /**
             * Event emitted when the tab completes its animation towards the center.
             */
            this.onCentered = new core.EventEmitter(true);
            // Note that the default value will always be overwritten by `McTabBody`, but we need one
            // anyway to prevent the animations module from throwing an error if the body is used on its own.
            /**
             * Duration for the tab's animation.
             */
            this.animationDuration = '0ms';
            /**
             * Subscription to the directionality change observable.
             */
            this.dirChangeSubscription = rxjs.Subscription.EMPTY;
            if (this.dir && changeDetectorRef) {
                this.dirChangeSubscription = this.dir.change
                    .subscribe(( /**
             * @param {?} direction
             * @return {?}
             */function (direction) {
                    _this.computePositionAnimationState(direction);
                    changeDetectorRef.markForCheck();
                }));
            }
        }
        Object.defineProperty(McTabBody.prototype, "position", {
            /**
             * The shifted index position of the tab body, where zero represents the active center tab.
             * @param {?} position
             * @return {?}
             */
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
         * @return {?}
         */
        McTabBody.prototype.ngOnInit = function () {
            if (this.bodyPosition === 'center' && this.origin != null) {
                this.bodyPosition = this.computePositionFromOrigin();
            }
        };
        /**
         * @return {?}
         */
        McTabBody.prototype.ngOnDestroy = function () {
            this.dirChangeSubscription.unsubscribe();
        };
        /**
         * @param {?} e
         * @return {?}
         */
        McTabBody.prototype.onTranslateTabStarted = function (e) {
            /** @type {?} */
            var isCentering = this.isCenterPosition(e.toState);
            this.beforeCentering.emit(isCentering);
            if (isCentering) {
                this.onCentering.emit(this.elementRef.nativeElement.clientHeight);
            }
        };
        /**
         * @param {?} e
         * @return {?}
         */
        McTabBody.prototype.onTranslateTabComplete = function (e) {
            // If the transition to the center is complete, emit an event.
            if (this.isCenterPosition(e.toState) && this.isCenterPosition(this.bodyPosition)) {
                this.onCentered.emit();
            }
            if (this.isCenterPosition(e.fromState) && !this.isCenterPosition(this.bodyPosition)) {
                this.afterLeavingCenter.emit();
            }
        };
        /**
         * The text direction of the containing app.
         * @return {?}
         */
        McTabBody.prototype.getLayoutDirection = function () {
            return this.dir && this.dir.value === 'rtl' ? 'rtl' : 'ltr';
        };
        /**
         * Whether the provided position state is considered center, regardless of origin.
         * @param {?} position
         * @return {?}
         */
        McTabBody.prototype.isCenterPosition = function (position) {
            return position === 'center' || position === 'left-origin-center' || position === 'right-origin-center';
        };
        /**
         * Computes the position state that will be used for the tab-body animation trigger.
         * @private
         * @param {?=} dir
         * @return {?}
         */
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
         * @private
         * @return {?}
         */
        McTabBody.prototype.computePositionFromOrigin = function () {
            /** @type {?} */
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
                }] }
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
    if (false) {
        /**
         * Tab body position state. Used by the animation trigger for the current state.
         * @type {?}
         */
        McTabBody.prototype.bodyPosition;
        /**
         * Event emitted when the tab begins to animate towards the center as the active tab.
         * @type {?}
         */
        McTabBody.prototype.onCentering;
        /**
         * Event emitted before the centering of the tab begins.
         * @type {?}
         */
        McTabBody.prototype.beforeCentering;
        /**
         * Event emitted before the centering of the tab begins.
         * @type {?}
         */
        McTabBody.prototype.afterLeavingCenter;
        /**
         * Event emitted when the tab completes its animation towards the center.
         * @type {?}
         */
        McTabBody.prototype.onCentered;
        /**
         * The portal host inside of this container into which the tab body content will be loaded.
         * @type {?}
         */
        McTabBody.prototype.portalHost;
        /**
         * The tab body content to display.
         * @type {?}
         */
        McTabBody.prototype.content;
        /**
         * Position that will be used when the tab is immediately becoming visible after creation.
         * @type {?}
         */
        McTabBody.prototype.origin;
        /**
         * Duration for the tab's animation.
         * @type {?}
         */
        McTabBody.prototype.animationDuration;
        /**
         * Current position of the tab-body in the tab-group. Zero means that the tab is visible.
         * @type {?}
         * @private
         */
        McTabBody.prototype.positionIndex;
        /**
         * Subscription to the directionality change observable.
         * @type {?}
         * @private
         */
        McTabBody.prototype.dirChangeSubscription;
        /**
         * @type {?}
         * @private
         */
        McTabBody.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        McTabBody.prototype.dir;
    }
    /**
     * The portal host directive for the contents of the tab.
     * \@docs-private
     */
    var McTabBodyPortal = /** @class */ (function (_super) {
        __extends(McTabBodyPortal, _super);
        /**
         * @param {?} componentFactoryResolver
         * @param {?} viewContainerRef
         * @param {?} host
         */
        function McTabBodyPortal(componentFactoryResolver, viewContainerRef, host) {
            var _this = _super.call(this, componentFactoryResolver, viewContainerRef) || this;
            _this.host = host;
            /**
             * Subscription to events for when the tab body begins centering.
             */
            _this.centeringSub = rxjs.Subscription.EMPTY;
            /**
             * Subscription to events for when the tab body finishes leaving from center position.
             */
            _this.leavingSub = rxjs.Subscription.EMPTY;
            return _this;
        }
        /**
         * Set initial visibility or set up subscription for changing visibility.
         * @return {?}
         */
        McTabBodyPortal.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.centeringSub = this.host.beforeCentering
                .pipe(operators.startWith(this.host.isCenterPosition(this.host.bodyPosition)))
                .subscribe(( /**
         * @param {?} isCentering
         * @return {?}
         */function (isCentering) {
                if (isCentering && !_this.hasAttached()) {
                    _this.attach(_this.host.content);
                }
            }));
            this.leavingSub = this.host.afterLeavingCenter.subscribe(( /**
             * @return {?}
             */function () {
                _this.detach();
            }));
        };
        /**
         * Clean up centering subscription.
         * @return {?}
         */
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
        { type: McTabBody, decorators: [{ type: core.Inject, args: [core.forwardRef(( /**
                                         * @return {?}
                                         */function () { return McTabBody; })),] }] }
    ]; };
    if (false) {
        /**
         * Subscription to events for when the tab body begins centering.
         * @type {?}
         * @private
         */
        McTabBodyPortal.prototype.centeringSub;
        /**
         * Subscription to events for when the tab body finishes leaving from center position.
         * @type {?}
         * @private
         */
        McTabBodyPortal.prototype.leavingSub;
        /**
         * @type {?}
         * @private
         */
        McTabBodyPortal.prototype.host;
    }

    var McLightTabsCssStyler = /** @class */ (function () {
        function McLightTabsCssStyler() {
        }
        return McLightTabsCssStyler;
    }());
    McLightTabsCssStyler.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mc-tab-group[mc-light-tabs], [mc-tab-nav-bar][mc-light-tabs]',
                    host: { class: 'mc-tab-group_light' }
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
    /**
     * Used to generate unique ID's for each tab component
     * @type {?}
     */
    var nextId = 0;
    /**
     * A simple change event emitted on focus or selection changes.
     */
    var McTabChangeEvent = /** @class */ (function () {
        function McTabChangeEvent() {
        }
        return McTabChangeEvent;
    }());
    if (false) {
        /**
         * Index of the currently-selected tab.
         * @type {?}
         */
        McTabChangeEvent.prototype.index;
        /**
         * Reference to the currently-selected tab.
         * @type {?}
         */
        McTabChangeEvent.prototype.tab;
    }
    /**
     * Object that can be used to configure the default options for the tabs module.
     * @record
     */
    function IMcTabsConfig() { }
    if (false) {
        /**
         * Duration for the tab animation. Must be a valid CSS value (e.g. 600ms).
         * @type {?|undefined}
         */
        IMcTabsConfig.prototype.animationDuration;
    }
    /**
     * Injection token that can be used to provide the default options the tabs module.
     * @type {?}
     */
    var MC_TABS_CONFIG = new core.InjectionToken('MC_TABS_CONFIG');
    // Boilerplate for applying mixins to McTabGroup.
    /**
     * \@docs-private
     */
    var McTabGroupBase = /** @class */ (function () {
        // tslint:disable-next-line:naming-convention
        /**
         * @param {?} _elementRef
         */
        function McTabGroupBase(_elementRef) {
            this._elementRef = _elementRef;
        }
        return McTabGroupBase;
    }());
    if (false) {
        /** @type {?} */
        McTabGroupBase.prototype._elementRef;
    }
    // tslint:disable-next-line:naming-convention
    /** @type {?} */
    var McTabGroupMixinBase = core$1.mixinColor(core$1.mixinDisabled(McTabGroupBase));
    /**
     * Tab-group component.  Supports basic tab pairs (label + content) and includes
     * keyboard navigation.
     */
    var McTabGroup = /** @class */ (function (_super) {
        __extends(McTabGroup, _super);
        /**
         * @param {?} elementRef
         * @param {?} changeDetectorRef
         * @param {?} lightTabs
         * @param {?=} defaultConfig
         */
        function McTabGroup(elementRef, changeDetectorRef, lightTabs, defaultConfig) {
            var _this = _super.call(this, elementRef) || this;
            _this.changeDetectorRef = changeDetectorRef;
            /**
             * Position of the tab header.
             */
            _this.headerPosition = 'above';
            /**
             * Output to enable support for two-way binding on `[(selectedIndex)]`
             */
            _this.selectedIndexChange = new core.EventEmitter();
            /**
             * Event emitted when focus has changed within a tab group.
             */
            _this.focusChange = new core.EventEmitter();
            /**
             * Event emitted when the body animation has completed
             */
            _this.animationDone = new core.EventEmitter();
            /**
             * Event emitted when the tab selection has changed.
             */
            _this.selectedTabChange = new core.EventEmitter(true);
            /**
             * The tab index that should be selected after the content has been checked.
             */
            _this.indexToSelect = 0;
            /**
             * Snapshot of the height of the tab body wrapper before another tab is activated.
             */
            _this.tabBodyWrapperHeight = 0;
            /**
             * Subscription to tabs being added/removed.
             */
            _this.tabsSubscription = rxjs.Subscription.EMPTY;
            /**
             * Subscription to changes in the tab labels.
             */
            _this.tabLabelSubscription = rxjs.Subscription.EMPTY;
            _this._dynamicHeight = false;
            _this._selectedIndex = null;
            _this.lightTab = coercion.coerceBooleanProperty(lightTabs);
            _this.groupId = nextId++;
            _this.animationDuration = defaultConfig && defaultConfig.animationDuration ?
                defaultConfig.animationDuration : '0ms';
            return _this;
        }
        Object.defineProperty(McTabGroup.prototype, "dynamicHeight", {
            /**
             * Whether the tab group should grow to the size of the active tab.
             * @return {?}
             */
            get: function () { return this._dynamicHeight; },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) { this._dynamicHeight = coercion.coerceBooleanProperty(value); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTabGroup.prototype, "selectedIndex", {
            /**
             * The index of the active tab.
             * @return {?}
             */
            get: function () { return this._selectedIndex; },
            /**
             * @param {?} value
             * @return {?}
             */
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
         * @return {?}
         */
        McTabGroup.prototype.ngAfterContentChecked = function () {
            var _this = this;
            // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
            // the amount of tabs changes before the actual change detection runs.
            /** @type {?} */
            var indexToSelect = this.indexToSelect = this.clampTabIndex(this.indexToSelect);
            // If there is a change in selected index, emit a change event. Should not trigger if
            // the selected index has not yet been initialized.
            if (this._selectedIndex !== indexToSelect) {
                /** @type {?} */
                var isFirstRun_1 = this._selectedIndex == null;
                if (!isFirstRun_1) {
                    this.selectedTabChange.emit(this.createChangeEvent(indexToSelect));
                }
                // Changing these values after change detection has run
                // since the checked content may contain references to them.
                Promise.resolve().then(( /**
                 * @return {?}
                 */function () {
                    _this.tabs.forEach(( /**
                     * @param {?} tab
                     * @param {?} index
                     * @return {?}
                     */function (tab, index) { return tab.isActive = index === indexToSelect; }));
                    if (!isFirstRun_1) {
                        _this.selectedIndexChange.emit(indexToSelect);
                    }
                }));
            }
            // Setup the position for each tab and optionally setup an origin on the next selected tab.
            this.tabs.forEach(( /**
             * @param {?} tab
             * @param {?} index
             * @return {?}
             */function (tab, index) {
                tab.position = index - indexToSelect;
                // If there is already a selected tab, then set up an origin for the next selected tab
                // if it doesn't have one already.
                if (_this._selectedIndex != null && tab.position === 0 && !tab.origin) {
                    tab.origin = indexToSelect - _this._selectedIndex;
                }
            }));
            if (this._selectedIndex !== indexToSelect) {
                this._selectedIndex = indexToSelect;
                this.changeDetectorRef.markForCheck();
            }
        };
        /**
         * @return {?}
         */
        McTabGroup.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.subscribeToTabLabels();
            // Subscribe to changes in the amount of tabs, in order to be
            // able to re-render the content as new tabs are added or removed.
            this.tabsSubscription = this.tabs.changes.subscribe(( /**
             * @return {?}
             */function () {
                /** @type {?} */
                var indexToSelect = _this.clampTabIndex(_this.indexToSelect);
                // Maintain the previously-selected tab if a new tab is added or removed and there is no
                // explicit change that selects a different tab.
                if (indexToSelect === _this._selectedIndex) {
                    /** @type {?} */
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
            }));
        };
        /**
         * @return {?}
         */
        McTabGroup.prototype.ngOnDestroy = function () {
            this.tabsSubscription.unsubscribe();
            this.tabLabelSubscription.unsubscribe();
        };
        /**
         * @param {?} index
         * @return {?}
         */
        McTabGroup.prototype.focusChanged = function (index) {
            this.focusChange.emit(this.createChangeEvent(index));
        };
        /**
         * Returns a unique id for each tab label element
         * @param {?} i
         * @return {?}
         */
        McTabGroup.prototype.getTabLabelId = function (i) {
            return "mc-tab-label-" + this.groupId + "-" + i;
        };
        /**
         * Returns a unique id for each tab content element
         * @param {?} i
         * @return {?}
         */
        McTabGroup.prototype.getTabContentId = function (i) {
            return "mc-tab-content-" + this.groupId + "-" + i;
        };
        /**
         * Sets the height of the body wrapper to the height of the activating tab if dynamic
         * height property is true.
         * @param {?} tabHeight
         * @return {?}
         */
        McTabGroup.prototype.setTabBodyWrapperHeight = function (tabHeight) {
            if (!this._dynamicHeight || !this.tabBodyWrapperHeight) {
                return;
            }
            /** @type {?} */
            var wrapper = this.tabBodyWrapper.nativeElement;
            wrapper.style.height = this.tabBodyWrapperHeight + "px";
            // This conditional forces the browser to paint the height so that
            // the animation to the new height can have an origin.
            if (this.tabBodyWrapper.nativeElement.offsetHeight) {
                wrapper.style.height = tabHeight + "px";
            }
        };
        /**
         * Removes the height of the tab body wrapper.
         * @return {?}
         */
        McTabGroup.prototype.removeTabBodyWrapperHeight = function () {
            this.tabBodyWrapperHeight = this.tabBodyWrapper.nativeElement.clientHeight;
            this.tabBodyWrapper.nativeElement.style.height = '';
            this.animationDone.emit();
        };
        /**
         * Handle click events, setting new selected index if appropriate.
         * @param {?} tab
         * @param {?} tabHeader
         * @param {?} index
         * @return {?}
         */
        McTabGroup.prototype.handleClick = function (tab, tabHeader, index) {
            if (!tab.disabled) {
                this.selectedIndex = tabHeader.focusIndex = index;
            }
        };
        /**
         * Retrieves the tabindex for the tab.
         * @param {?} tab
         * @param {?} index
         * @return {?}
         */
        McTabGroup.prototype.getTabIndex = function (tab, index) {
            if (tab.disabled) {
                return null;
            }
            return this.selectedIndex === index ? 0 : -1;
        };
        /**
         * @private
         * @param {?} index
         * @return {?}
         */
        McTabGroup.prototype.createChangeEvent = function (index) {
            /** @type {?} */
            var event = new McTabChangeEvent();
            event.index = index;
            if (this.tabs && this.tabs.length) {
                event.tab = this.tabs.toArray()[index];
            }
            return event;
        };
        /**
         * Subscribes to changes in the tab labels. This is needed, because the \@Input for the label is
         * on the McTab component, whereas the data binding is inside the McTabGroup. In order for the
         * binding to be updated, we need to subscribe to changes in it and trigger change detection
         * manually.
         * @private
         * @return {?}
         */
        McTabGroup.prototype.subscribeToTabLabels = function () {
            var _this = this;
            if (this.tabLabelSubscription) {
                this.tabLabelSubscription.unsubscribe();
            }
            this.tabLabelSubscription = rxjs.merge.apply(void 0, __spread(this.tabs.map(( /**
             * @param {?} tab
             * @return {?}
             */function (tab) { return tab.stateChanges; })))).subscribe(( /**
         * @return {?}
         */function () { return _this.changeDetectorRef.markForCheck(); }));
        };
        /**
         * Clamps the given index to the bounds of 0 and the tabs length.
         * @private
         * @param {?} index
         * @return {?}
         */
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
                    template: "<mc-tab-header #tabHeader\n               [selectedIndex]=\"selectedIndex\"\n               (indexFocused)=\"focusChanged($event)\"\n               (selectFocusedIndex)=\"selectedIndex = $event\">\n    <div role=\"tab\"\n         mcTabLabelWrapper\n         cdkMonitorElementFocus\n         [class.mc-tab-label]=\"!lightTab\"\n         [class.mc-tab-light-label]=\"lightTab\"\n         *ngFor=\"let tab of tabs; let i = index\"\n         [id]=\"getTabLabelId(i)\"\n         [attr.tabindex]=\"getTabIndex(tab, i)\"\n         [attr.aria-posinset]=\"i + 1\"\n         [attr.aria-setsize]=\"tabs.length\"\n         [attr.aria-controls]=\"getTabContentId(i)\"\n         [attr.aria-selected]=\"selectedIndex == i\"\n         [attr.aria-label]=\"tab.ariaLabel || null\"\n         [attr.aria-labelledby]=\"(!tab.ariaLabel && tab.ariaLabelledby) ? tab.ariaLabelledby : null\"\n         [class.mc-active]=\"selectedIndex == i\"\n         [disabled]=\"tab.disabled\"\n         (click)=\"handleClick(tab, tabHeader, i)\">\n\n        <div class=\"mc-tab-label__content\">\n            <!-- If there is a label template, use it. -->\n            <ng-template [ngIf]=\"tab.templateLabel\">\n                <ng-template [cdkPortalOutlet]=\"tab.templateLabel\"></ng-template>\n            </ng-template>\n\n            <!-- If there is not a label template, fall back to the text label. -->\n            <ng-template [ngIf]=\"!tab.templateLabel\">{{tab.textLabel}}</ng-template>\n        </div>\n\n        <div class=\"mc-tab-overlay\"></div>\n    </div>\n</mc-tab-header>\n\n<div class=\"mc-tab-body__wrapper\"\n     #tabBodyWrapper>\n    <mc-tab-body role=\"tabpanel\"\n                 *ngFor=\"let tab of tabs; let i = index\"\n                 [id]=\"getTabContentId(i)\"\n                 [attr.aria-labelledby]=\"getTabLabelId(i)\"\n                 [class.mc-tab-body__active]=\"selectedIndex == i\"\n                 [content]=\"tab.content\"\n                 [position]=\"tab.position\"\n                 [origin]=\"tab.origin\"\n                 [animationDuration]=\"animationDuration\"\n                 (onCentered)=\"removeTabBodyWrapperHeight()\"\n                 (onCentering)=\"setTabBodyWrapperHeight($event)\">\n    </mc-tab-body>\n</div>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    inputs: ['color', 'disabled'],
                    host: {
                        class: 'mc-tab-group',
                        '[class.mc-tab-group_dynamic-height]': 'dynamicHeight',
                        '[class.mc-tab-group_inverted-header]': 'headerPosition === "below"'
                    },
                    styles: [".mc-tab-label.cdk-keyboard-focused:after,.mc-tab-light-label.cdk-keyboard-focused:after,.mc-tab-light-label.mc-active:before,.mc-tab-light-label:hover:before{content:\"\";display:block;position:absolute}.mc-tab-light-label.mc-active:before,.mc-tab-light-label:hover:before{bottom:-1px;height:4px;left:0;right:0}.mc-tab-group{box-sizing:border-box;display:flex;flex-direction:column;text-align:center;white-space:nowrap}.mc-tab-group.mc-tab-group_inverted-header{flex-direction:column-reverse}.mc-tab-label{align-items:center;border-bottom-style:solid;border-bottom-width:1px;border-top-left-radius:3px;border-top-right-radius:3px;border-top-style:solid;border-top-width:1px;box-sizing:border-box;cursor:pointer;display:inline-flex;height:40px;justify-content:center;outline:none;padding-left:16px;padding-right:16px;position:relative;text-align:center;white-space:nowrap}.mc-tab-label.cdk-keyboard-focused{z-index:1}.mc-tab-label.cdk-keyboard-focused:after{border-bottom:none;border-style:solid;border-top-left-radius:3px;border-top-right-radius:3px;border-width:2px;bottom:-1px;left:-1px;right:-1px;top:-2px}.mc-tab-label.mc-disabled{pointer-events:none}.mc-tab-label .mc-tab-overlay{bottom:0;left:0;pointer-events:none;position:absolute;right:0;top:-1px}.mc-tab-label.mc-active{border-style:solid;border-width:1px;padding-left:15px;padding-right:15px}.mc-tab-label.mc-active.cdk-keyboard-focused:after{left:-2px;right:-2px;z-index:1}.mc-tab-label .mc-tab-overlay{border-top:1px solid transparent;border-top-left-radius:3px;border-top-right-radius:3px}.mc-tab-light-label{align-items:center;border-bottom-style:solid;border-bottom-width:1px;box-sizing:border-box;cursor:pointer;display:inline-flex;height:40px;justify-content:center;outline:none;padding-left:16px;padding-right:16px;position:relative;text-align:center;white-space:nowrap}.mc-tab-light-label.cdk-keyboard-focused{z-index:1}.mc-tab-light-label.cdk-keyboard-focused:after{border-bottom:none;border-style:solid;border-top-left-radius:3px;border-top-right-radius:3px;border-width:2px;bottom:-1px;left:-1px;right:-1px;top:-2px}.mc-tab-light-label.mc-disabled{pointer-events:none}.mc-tab-light-label .mc-tab-overlay{bottom:0;left:0;pointer-events:none;right:0;top:-1px}.mc-tab-light-label.cdk-keyboard-focused+:hover:before{left:1px}.mc-tab-light-label.cdk-keyboard-focused:after{top:-1px}.mc-tab-light-label .mc-tab-overlay{position:absolute;top:0}.mc-tab-header__content{padding:1px 1px 0}.mc-tab-body__wrapper{display:flex;overflow:hidden;position:relative}.mc-tab-body{bottom:0;display:block;flex-basis:100%;left:0;overflow:hidden;position:absolute;right:0;top:0}.mc-tab-body.mc-tab-body__active{flex-grow:1;overflow-x:hidden;overflow-y:auto;position:relative;z-index:1}.mc-tab-group.mc-tab-group_dynamic-height .mc-tab-body.mc-tab-body__active{overflow-y:hidden}"]
                }] }
    ];
    /** @nocollapse */
    McTabGroup.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef },
        { type: String, decorators: [{ type: core.Attribute, args: ['mc-light-tabs',] }] },
        { type: undefined, decorators: [{ type: core.Inject, args: [MC_TABS_CONFIG,] }, { type: core.Optional }] }
    ]; };
    McTabGroup.propDecorators = {
        dynamicHeight: [{ type: core.Input }],
        selectedIndex: [{ type: core.Input }],
        tabs: [{ type: core.ContentChildren, args: [McTab,] }],
        tabBodyWrapper: [{ type: core.ViewChild, args: ['tabBodyWrapper', { static: false },] }],
        tabHeader: [{ type: core.ViewChild, args: ['tabHeader', { static: false },] }],
        headerPosition: [{ type: core.Input }],
        animationDuration: [{ type: core.Input }],
        selectedIndexChange: [{ type: core.Output }],
        focusChange: [{ type: core.Output }],
        animationDone: [{ type: core.Output }],
        selectedTabChange: [{ type: core.Output }]
    };
    if (false) {
        /** @type {?} */
        McTabGroup.prototype.lightTab;
        /** @type {?} */
        McTabGroup.prototype.tabs;
        /** @type {?} */
        McTabGroup.prototype.tabBodyWrapper;
        /** @type {?} */
        McTabGroup.prototype.tabHeader;
        /**
         * Position of the tab header.
         * @type {?}
         */
        McTabGroup.prototype.headerPosition;
        /**
         * Duration for the tab animation. Must be a valid CSS value (e.g. 600ms).
         * @type {?}
         */
        McTabGroup.prototype.animationDuration;
        /**
         * Output to enable support for two-way binding on `[(selectedIndex)]`
         * @type {?}
         */
        McTabGroup.prototype.selectedIndexChange;
        /**
         * Event emitted when focus has changed within a tab group.
         * @type {?}
         */
        McTabGroup.prototype.focusChange;
        /**
         * Event emitted when the body animation has completed
         * @type {?}
         */
        McTabGroup.prototype.animationDone;
        /**
         * Event emitted when the tab selection has changed.
         * @type {?}
         */
        McTabGroup.prototype.selectedTabChange;
        /**
         * The tab index that should be selected after the content has been checked.
         * @type {?}
         * @private
         */
        McTabGroup.prototype.indexToSelect;
        /**
         * Snapshot of the height of the tab body wrapper before another tab is activated.
         * @type {?}
         * @private
         */
        McTabGroup.prototype.tabBodyWrapperHeight;
        /**
         * Subscription to tabs being added/removed.
         * @type {?}
         * @private
         */
        McTabGroup.prototype.tabsSubscription;
        /**
         * Subscription to changes in the tab labels.
         * @type {?}
         * @private
         */
        McTabGroup.prototype.tabLabelSubscription;
        /**
         * @type {?}
         * @private
         */
        McTabGroup.prototype._dynamicHeight;
        /**
         * @type {?}
         * @private
         */
        McTabGroup.prototype._selectedIndex;
        /**
         * @type {?}
         * @private
         */
        McTabGroup.prototype.groupId;
        /**
         * @type {?}
         * @private
         */
        McTabGroup.prototype.changeDetectorRef;
    }

    // Boilerplate for applying mixins to McTabLabelWrapper.
    /**
     * \@docs-private
     */
    var McTabLabelWrapperBase = /** @class */ (function () {
        function McTabLabelWrapperBase() {
        }
        return McTabLabelWrapperBase;
    }());
    // tslint:disable-next-line:naming-convention
    /** @type {?} */
    var McTabLabelWrapperMixinBase = core$1.mixinDisabled(McTabLabelWrapperBase);
    /**
     * Used in the `mc-tab-group` view to display tab labels.
     * \@docs-private
     */
    var McTabLabelWrapper = /** @class */ (function (_super) {
        __extends(McTabLabelWrapper, _super);
        /**
         * @param {?} elementRef
         */
        function McTabLabelWrapper(elementRef) {
            var _this = _super.call(this) || this;
            _this.elementRef = elementRef;
            return _this;
        }
        /**
         * Sets focus on the wrapper element
         * @return {?}
         */
        McTabLabelWrapper.prototype.focus = function () {
            this.elementRef.nativeElement.focus();
        };
        /**
         * @return {?}
         */
        McTabLabelWrapper.prototype.getOffsetLeft = function () {
            return this.elementRef.nativeElement.offsetLeft;
        };
        /**
         * @return {?}
         */
        McTabLabelWrapper.prototype.getOffsetWidth = function () {
            return this.elementRef.nativeElement.offsetWidth;
        };
        return McTabLabelWrapper;
    }(McTabLabelWrapperMixinBase));
    McTabLabelWrapper.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mcTabLabelWrapper]',
                    inputs: ['disabled'],
                    host: {
                        '[class.mc-disabled]': 'disabled',
                        '[attr.aria-disabled]': '!!disabled'
                    }
                },] }
    ];
    /** @nocollapse */
    McTabLabelWrapper.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    if (false) {
        /** @type {?} */
        McTabLabelWrapper.prototype.elementRef;
    }

    /** @type {?} */
    var VIEWPORT_THROTTLE_TIME = 150;
    /** @type {?} */
    var SCROLL_DISTANCE_DELIMITER = 3;
    /**
     * The distance in pixels that will be overshot when scrolling a tab label into view. This helps
     * provide a small affordance to the label next to it.
     * @type {?}
     */
    var EXAGGERATED_OVERSCROLL = 60;
    // Boilerplate for applying mixins to McTabHeader.
    /**
     * \@docs-private
     */
    var McTabHeaderBase = /** @class */ (function () {
        function McTabHeaderBase() {
        }
        return McTabHeaderBase;
    }());
    /**
     * The header of the tab group which displays a list of all the tabs in the tab group.
     * When the tabs list's width exceeds the width of the header container,
     * then arrows will be displayed to allow the user to scroll
     * left and right across the header.
     * \@docs-private
     */
    var McTabHeader = /** @class */ (function (_super) {
        __extends(McTabHeader, _super);
        /**
         * @param {?} elementRef
         * @param {?} changeDetectorRef
         * @param {?} viewportRuler
         * @param {?} dir
         * @param {?} ngZone
         */
        function McTabHeader(elementRef, changeDetectorRef, viewportRuler, dir, ngZone) {
            var _this = _super.call(this) || this;
            _this.elementRef = elementRef;
            _this.changeDetectorRef = changeDetectorRef;
            _this.viewportRuler = viewportRuler;
            _this.dir = dir;
            _this.ngZone = ngZone;
            /**
             * Whether the controls for pagination should be displayed
             */
            _this.showPaginationControls = false;
            /**
             * Whether the tab list can be scrolled more towards the end of the tab label list.
             */
            _this.disableScrollAfter = true;
            /**
             * Whether the tab list can be scrolled more towards the beginning of the tab label list.
             */
            _this.disableScrollBefore = true;
            /**
             * Event emitted when the option is selected.
             */
            _this.selectFocusedIndex = new core.EventEmitter();
            /**
             * Event emitted when a label is focused.
             */
            _this.indexFocused = new core.EventEmitter();
            /**
             * The distance in pixels that the tab labels should be translated to the left.
             */
            _this._scrollDistance = 0;
            /**
             * Whether the header should scroll to the selected index after the view has been checked.
             */
            _this.selectedIndexChanged = false;
            /**
             * Emits when the component is destroyed.
             */
            _this.destroyed = new rxjs.Subject();
            _this._selectedIndex = 0;
            return _this;
        }
        Object.defineProperty(McTabHeader.prototype, "selectedIndex", {
            /**
             * The index of the active tab.
             * @return {?}
             */
            get: function () {
                return this._selectedIndex;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                /** @type {?} */
                var coercedValue = coercion.coerceNumberProperty(value);
                this.selectedIndexChanged = this._selectedIndex !== coercedValue;
                this._selectedIndex = coercedValue;
                if (this.keyManager) {
                    this.keyManager.updateActiveItem(coercedValue);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTabHeader.prototype, "focusIndex", {
            /**
             * Tracks which element has focus; used for keyboard navigation
             * @return {?}
             */
            get: function () {
                return this.keyManager ? this.keyManager.activeItemIndex : 0;
            },
            /**
             * When the focus index is set, we must manually send focus to the correct label
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                if (!this.isValidIndex(value) || this.focusIndex === value || !this.keyManager) {
                    return;
                }
                this.keyManager.setActiveItem(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTabHeader.prototype, "scrollDistance", {
            /**
             * Sets the distance in pixels that the tab header should be transformed in the X-axis.
             * @return {?}
             */
            get: function () {
                return this._scrollDistance;
            },
            /**
             * @param {?} v
             * @return {?}
             */
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
        /**
         * @return {?}
         */
        McTabHeader.prototype.ngAfterContentChecked = function () {
            // If the number of tab labels have changed, check if scrolling should be enabled
            if (this.tabLabelCount !== this.labelWrappers.length) {
                this.updatePagination();
                this.tabLabelCount = this.labelWrappers.length;
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
        /**
         * @param {?} event
         * @return {?}
         */
        McTabHeader.prototype.handleKeydown = function (event) {
            // tslint:disable-next-line: deprecation
            switch (event.keyCode) {
                case keycodes.HOME:
                    this.keyManager.setFirstItemActive();
                    event.preventDefault();
                    break;
                case keycodes.END:
                    this.keyManager.setLastItemActive();
                    event.preventDefault();
                    break;
                case keycodes.ENTER:
                case keycodes.SPACE:
                    this.selectFocusedIndex.emit(this.focusIndex);
                    event.preventDefault();
                    break;
                default:
                    this.keyManager.onKeydown(event);
            }
        };
        /**
         * @return {?}
         */
        McTabHeader.prototype.ngAfterContentInit = function () {
            var _this = this;
            /** @type {?} */
            var dirChange = this.dir ? this.dir.change : rxjs.of(null);
            /** @type {?} */
            var resize = this.viewportRuler.change(VIEWPORT_THROTTLE_TIME);
            /** @type {?} */
            var realign = ( /**
             * @return {?}
             */function () {
                _this.updatePagination();
            });
            this.keyManager = new a11y.FocusKeyManager(this.labelWrappers)
                .withHorizontalOrientation(this.getLayoutDirection())
                .withWrap();
            this.keyManager.updateActiveItem(0);
            // Defer the first call in order to allow for slower browsers to lay out the elements.
            // This helps in cases where the user lands directly on a page with paginated tabs.
            typeof requestAnimationFrame === undefined
                ? realign()
                : requestAnimationFrame(realign);
            // On dir change or window resize, update the orientation of
            // the key manager if the direction has changed.
            rxjs.merge(dirChange, resize)
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(( /**
         * @return {?}
         */function () {
                realign();
                _this.keyManager.withHorizontalOrientation(_this.getLayoutDirection());
            }));
            // If there is a change in the focus key manager we need to emit the `indexFocused`
            // event in order to provide a public event that notifies about focus changes. Also we realign
            // the tabs container by scrolling the new focused tab into the visible section.
            this.keyManager.change
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(( /**
         * @param {?} newFocusIndex
         * @return {?}
         */function (newFocusIndex) {
                _this.indexFocused.emit(newFocusIndex);
                _this.setTabFocus(newFocusIndex);
            }));
        };
        /**
         * @return {?}
         */
        McTabHeader.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        /**
         * Callback for when the MutationObserver detects that the content has changed.
         * @return {?}
         */
        McTabHeader.prototype.onContentChanges = function () {
            var _this = this;
            /** @type {?} */
            var textContent = this.elementRef.nativeElement.textContent;
            // We need to diff the text content of the header, because the MutationObserver callback
            // will fire even if the text content didn't change which is inefficient and is prone
            // to infinite loops if a poorly constructed expression is passed in.
            if (textContent !== this.currentTextContent) {
                this.currentTextContent = textContent;
                /** @type {?} */
                var zoneCallback = ( /**
                 * @return {?}
                 */function () {
                    _this.updatePagination();
                    _this.changeDetectorRef.markForCheck();
                });
                // The content observer runs outside the `NgZone` by default, which
                // means that we need to bring the callback back in ourselves.
                // TODO: Remove null check for `_ngZone` once it's a required parameter.
                this.ngZone ? this.ngZone.run(zoneCallback) : zoneCallback();
            }
        };
        /**
         * Updating the view whether pagination should be enabled or not
         *
         * WARNING: Calling this method can be very costly in terms of performance.  It should be called
         * as infrequently as possible from outside of the Tabs component as it causes a reflow of the
         * page.
         * @return {?}
         */
        McTabHeader.prototype.updatePagination = function () {
            this.checkPaginationEnabled();
            this.checkScrollingControls();
            this.updateTabScrollPosition();
        };
        /**
         * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
         * providing a valid index and return true.
         * @param {?} index
         * @return {?}
         */
        McTabHeader.prototype.isValidIndex = function (index) {
            if (!this.labelWrappers) {
                return true;
            }
            /** @type {?} */
            var tab = this.labelWrappers
                ? this.labelWrappers.toArray()[index]
                : null;
            return !!tab && !tab.disabled;
        };
        /**
         * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
         * scrolling is enabled.
         * @param {?} tabIndex
         * @return {?}
         */
        McTabHeader.prototype.setTabFocus = function (tabIndex) {
            if (this.showPaginationControls) {
                this.scrollToLabel(tabIndex);
            }
            if (this.labelWrappers && this.labelWrappers.length) {
                this.labelWrappers.toArray()[tabIndex].focus();
                // Do not let the browser manage scrolling to focus the element, this will be handled
                // by using translation. In LTR, the scroll left should be 0. In RTL, the scroll width
                // should be the full width minus the offset width.
                /** @type {?} */
                var containerEl = this.tabListContainer.nativeElement;
                /** @type {?} */
                var dir = this.getLayoutDirection();
                if (dir === 'ltr') {
                    containerEl.scrollLeft = 0;
                }
                else {
                    containerEl.scrollLeft =
                        containerEl.scrollWidth - containerEl.offsetWidth;
                }
            }
        };
        /**
         * The layout direction of the containing app.
         * @return {?}
         */
        McTabHeader.prototype.getLayoutDirection = function () {
            return this.dir && this.dir.value === 'rtl' ? 'rtl' : 'ltr';
        };
        /**
         * Performs the CSS transformation on the tab list that will cause the list to scroll.
         * @return {?}
         */
        McTabHeader.prototype.updateTabScrollPosition = function () {
            /** @type {?} */
            var scrollDistance = this.scrollDistance;
            /** @type {?} */
            var translateX = this.getLayoutDirection() === 'ltr'
                ? -scrollDistance
                : scrollDistance;
            // Don't use `translate3d` here because we don't want to create a new layer. A new layer
            // seems to cause flickering and overflow in Internet Explorer.
            // See: https://github.com/angular/material2/issues/10276
            // We round the `transform` here, because transforms with sub-pixel precision cause some
            // browsers to blur the content of the element.
            this.tabList.nativeElement.style.transform = "translateX(" + Math.round(translateX) + "px)";
            // Setting the `transform` on IE will change the scroll offset of the parent, causing the
            // position to be thrown off in some cases. We have to reset it ourselves to ensure that
            // it doesn't get thrown off.
            this.tabList.nativeElement.scrollLeft = 0;
        };
        /**
         * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
         * the end of the list, respectively). The distance to scroll is computed to be a third of the
         * length of the tab list view window.
         *
         * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
         * should be called sparingly.
         * @param {?} scrollDir
         * @return {?}
         */
        McTabHeader.prototype.scrollHeader = function (scrollDir) {
            /** @type {?} */
            var viewLength = this.tabListContainer.nativeElement.offsetWidth;
            // Move the scroll distance one-third the length of the tab list's viewport.
            this.scrollDistance +=
                ((scrollDir === 'before' ? -1 : 1) * viewLength) / SCROLL_DISTANCE_DELIMITER;
        };
        /**
         * Moves the tab list such that the desired tab label (marked by index) is moved into view.
         *
         * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
         * should be called sparingly.
         * @param {?} labelIndex
         * @return {?}
         */
        McTabHeader.prototype.scrollToLabel = function (labelIndex) {
            /** @type {?} */
            var selectedLabel = this.labelWrappers
                ? this.labelWrappers.toArray()[labelIndex]
                : null;
            if (!selectedLabel) {
                return;
            }
            // The view length is the visible width of the tab labels.
            /** @type {?} */
            var viewLength = this.tabListContainer.nativeElement.offsetWidth;
            /** @type {?} */
            var labelBeforePos;
            /** @type {?} */
            var labelAfterPos;
            if (this.getLayoutDirection() === 'ltr') {
                labelBeforePos = selectedLabel.getOffsetLeft();
                labelAfterPos = labelBeforePos + selectedLabel.getOffsetWidth();
            }
            else {
                labelAfterPos =
                    this.tabList.nativeElement.offsetWidth -
                        selectedLabel.getOffsetLeft();
                labelBeforePos = labelAfterPos - selectedLabel.getOffsetWidth();
            }
            /** @type {?} */
            var beforeVisiblePos = this.scrollDistance;
            /** @type {?} */
            var afterVisiblePos = this.scrollDistance + viewLength;
            if (labelBeforePos < beforeVisiblePos) {
                // Scroll header to move label to the before direction
                this.scrollDistance -=
                    beforeVisiblePos - labelBeforePos + EXAGGERATED_OVERSCROLL;
            }
            else if (labelAfterPos > afterVisiblePos) {
                // Scroll header to move label to the after direction
                this.scrollDistance +=
                    labelAfterPos - afterVisiblePos + EXAGGERATED_OVERSCROLL;
            }
        };
        /**
         * Evaluate whether the pagination controls should be displayed. If the scroll width of the
         * tab list is wider than the size of the header container, then the pagination controls should
         * be shown.
         *
         * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
         * should be called sparingly.
         * @return {?}
         */
        McTabHeader.prototype.checkPaginationEnabled = function () {
            /** @type {?} */
            var isEnabled = this.tabList.nativeElement.scrollWidth >
                this.elementRef.nativeElement.offsetWidth;
            if (!isEnabled) {
                this.scrollDistance = 0;
            }
            if (isEnabled !== this.showPaginationControls) {
                this.changeDetectorRef.markForCheck();
            }
            this.showPaginationControls = isEnabled;
        };
        /**
         * Evaluate whether the before and after controls should be enabled or disabled.
         * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
         * before button. If the header is at the end of the list (scroll distance is equal to the
         * maximum distance we can scroll), then disable the after button.
         *
         * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
         * should be called sparingly.
         * @return {?}
         */
        McTabHeader.prototype.checkScrollingControls = function () {
            // Check if the pagination arrows should be activated.
            this.disableScrollBefore = this.scrollDistance === 0;
            this.disableScrollAfter =
                this.scrollDistance === this.getMaxScrollDistance();
            this.changeDetectorRef.markForCheck();
        };
        /**
         * Determines what is the maximum length in pixels that can be set for the scroll distance. This
         * is equal to the difference in width between the tab list container and tab header container.
         *
         * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
         * should be called sparingly.
         * @return {?}
         */
        McTabHeader.prototype.getMaxScrollDistance = function () {
            /** @type {?} */
            var lengthOfTabList = this.tabList.nativeElement.scrollWidth;
            /** @type {?} */
            var viewLength = this.tabListContainer.nativeElement.offsetWidth;
            return lengthOfTabList - viewLength || 0;
        };
        return McTabHeader;
    }(McTabHeaderBase));
    McTabHeader.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-tab-header',
                    template: "<div class=\"mc-tab-header__pagination mc-tab-header__pagination_before mc-elevation-z4\"\n     aria-hidden=\"true\"\n     [class.mc-tab-header_disabled]=\"disableScrollBefore\"\n     (click)=\"scrollHeader('before')\">\n    <div class=\"mc-tab-header__pagination-chevron\"></div>\n</div>\n\n<div class=\"mc-tab-header__content\"\n     #tabListContainer\n     (keydown)=\"handleKeydown($event)\">\n    <div class=\"mc-tab-list\"\n         #tabList\n         role=\"tablist\"\n         (cdkObserveContent)=\"onContentChanges()\">\n        <div class=\"mc-tab-list__content\">\n            <ng-content></ng-content>\n        </div>\n    </div>\n</div>\n\n<div class=\"mc-tab-header__pagination mc-tab-header__pagination_after mc-elevation-z4\"\n     aria-hidden=\"true\"\n     [class.mc-tab-header_disabled]=\"disableScrollAfter\"\n     (click)=\"scrollHeader('after')\">\n    <div class=\"mc-tab-header__pagination-chevron\"></div>\n</div>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'mc-tab-header',
                        '[class.mc-tab-header__pagination-controls_enabled]': 'showPaginationControls',
                        '[class.mc-tab-header_rtl]': 'getLayoutDirection() == \'rtl\''
                    },
                    styles: [".mc-tab-header{display:flex}.mc-tab-header__pagination{align-items:center;cursor:pointer;display:none;justify-content:center;min-width:32px;position:relative;z-index:2}.mc-tab-header__pagination .mc-tab-header__pagination-controls_enabled{display:flex}.mc-tab-header__pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:\"\";height:8px;width:8px}.mc-tab-header__pagination_after,.mc-tab-header_rtl .mc-tab-header__pagination_before{padding-right:4px}.mc-tab-header__pagination_after .mc-tab-header__pagination-chevron,.mc-tab-header_rtl .mc-tab-header__pagination_before .mc-tab-header__pagination-chevron{transform:rotate(45deg)}.mc-tab-header__pagination_before,.mc-tab-header_rtl .mc-tab-header__pagination_after{padding-left:4px}.mc-tab-header__pagination_before .mc-tab-header__pagination-chevron,.mc-tab-header_rtl .mc-tab-header__pagination_after .mc-tab-header__pagination-chevron{transform:rotate(-135deg)}.mc-tab-header_disabled{box-shadow:none;cursor:default}.mc-tab-header__content{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mc-tab-list{flex-grow:1;position:relative;transition:transform .5s cubic-bezier(.35,0,.25,1)}.mc-tab-list__content{display:flex}.mc-tab-group_align-labels-center .mc-tab-list__content{justify-content:center}.mc-tab-group_align-labels-end .mc-tab-list__content{justify-content:flex-end}.mc-tab-group_stretch-labels .mc-tab-label,.mc-tab-group_stretch-labels .mc-tab-light-label{flex-basis:0;flex-grow:1}"]
                }] }
    ];
    /** @nocollapse */
    McTabHeader.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef },
        { type: scrolling.ViewportRuler },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
        { type: core.NgZone }
    ]; };
    McTabHeader.propDecorators = {
        selectedIndex: [{ type: core.Input }],
        labelWrappers: [{ type: core.ContentChildren, args: [McTabLabelWrapper,] }],
        tabListContainer: [{ type: core.ViewChild, args: ['tabListContainer', { static: true },] }],
        tabList: [{ type: core.ViewChild, args: ['tabList', { static: true },] }],
        selectFocusedIndex: [{ type: core.Output }],
        indexFocused: [{ type: core.Output }]
    };
    if (false) {
        /** @type {?} */
        McTabHeader.prototype.labelWrappers;
        /** @type {?} */
        McTabHeader.prototype.tabListContainer;
        /** @type {?} */
        McTabHeader.prototype.tabList;
        /**
         * Whether the controls for pagination should be displayed
         * @type {?}
         */
        McTabHeader.prototype.showPaginationControls;
        /**
         * Whether the tab list can be scrolled more towards the end of the tab label list.
         * @type {?}
         */
        McTabHeader.prototype.disableScrollAfter;
        /**
         * Whether the tab list can be scrolled more towards the beginning of the tab label list.
         * @type {?}
         */
        McTabHeader.prototype.disableScrollBefore;
        /**
         * Event emitted when the option is selected.
         * @type {?}
         */
        McTabHeader.prototype.selectFocusedIndex;
        /**
         * Event emitted when a label is focused.
         * @type {?}
         */
        McTabHeader.prototype.indexFocused;
        /**
         * The distance in pixels that the tab labels should be translated to the left.
         * @type {?}
         * @private
         */
        McTabHeader.prototype._scrollDistance;
        /**
         * Whether the header should scroll to the selected index after the view has been checked.
         * @type {?}
         * @private
         */
        McTabHeader.prototype.selectedIndexChanged;
        /**
         * Emits when the component is destroyed.
         * @type {?}
         * @private
         */
        McTabHeader.prototype.destroyed;
        /**
         * The number of tab labels that are displayed on the header. When this changes, the header
         * should re-evaluate the scroll position.
         * @type {?}
         * @private
         */
        McTabHeader.prototype.tabLabelCount;
        /**
         * Whether the scroll distance has changed and should be applied after the view is checked.
         * @type {?}
         * @private
         */
        McTabHeader.prototype.scrollDistanceChanged;
        /**
         * Used to manage focus between the tabs.
         * @type {?}
         * @private
         */
        McTabHeader.prototype.keyManager;
        /**
         * Cached text content of the header.
         * @type {?}
         * @private
         */
        McTabHeader.prototype.currentTextContent;
        /**
         * @type {?}
         * @private
         */
        McTabHeader.prototype._selectedIndex;
        /**
         * @type {?}
         * @private
         */
        McTabHeader.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        McTabHeader.prototype.changeDetectorRef;
        /**
         * @type {?}
         * @private
         */
        McTabHeader.prototype.viewportRuler;
        /**
         * @type {?}
         * @private
         */
        McTabHeader.prototype.dir;
        /**
         * @type {?}
         * @private
         */
        McTabHeader.prototype.ngZone;
    }

    // Boilerplate for applying mixins to McTabNav.
    /**
     * \@docs-private
     */
    var McTabNavBase = /** @class */ (function () {
        // tslint:disable-next-line:naming-convention
        /**
         * @param {?} _elementRef
         */
        function McTabNavBase(_elementRef) {
            this._elementRef = _elementRef;
        }
        return McTabNavBase;
    }());
    if (false) {
        /** @type {?} */
        McTabNavBase.prototype._elementRef;
    }
    // tslint:disable-next-line:naming-convention
    /** @type {?} */
    var McTabNavMixinBase = core$1.mixinColor(McTabNavBase);
    /**
     * Navigation component matching the styles of the tab group header.
     */
    var McTabNav = /** @class */ (function (_super) {
        __extends(McTabNav, _super);
        /**
         * @param {?} elementRef
         */
        function McTabNav(elementRef) {
            return _super.call(this, elementRef) || this;
        }
        return McTabNav;
    }(McTabNavMixinBase));
    McTabNav.decorators = [
        { type: core.Component, args: [{
                    selector: '[mc-tab-nav-bar]',
                    exportAs: 'mcTabNavBar, mcTabNav',
                    inputs: ['color'],
                    template: "<div class=\"mc-tab-links\">\n    <ng-content></ng-content>\n</div>\n",
                    host: { class: 'mc-tab-nav-bar' },
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-active:before,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link:hover:before,.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused:after{content:\"\";display:block;position:absolute}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-active:before,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link:hover:before{bottom:-1px;height:4px;left:0;right:0}.mc-tab-link{-webkit-tap-highlight-color:transparent;text-decoration:none;vertical-align:top}.mc-tab-group_stretch-labels .mc-tab-link{flex-basis:0;flex-grow:1}.mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar{display:flex}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link{align-items:center;border-bottom-style:solid;border-bottom-width:1px;border-top-left-radius:3px;border-top-right-radius:3px;border-top-style:solid;border-top-width:1px;box-sizing:border-box;cursor:pointer;display:inline-flex;height:40px;justify-content:center;outline:none;padding-left:16px;padding-right:16px;position:relative;text-align:center;white-space:nowrap}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused{z-index:1}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused:after{border-bottom:none;border-style:solid;border-top-left-radius:3px;border-top-right-radius:3px;border-width:2px;bottom:-1px;left:-1px;right:-1px;top:-2px}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link .mc-tab-overlay{bottom:0;left:0;pointer-events:none;position:absolute;right:0;top:-1px}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-active{border-style:solid;border-width:1px;padding-left:15px;padding-right:15px}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-active.cdk-keyboard-focused:after{left:-2px;right:-2px;z-index:1}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link .mc-tab-overlay{border-top:1px solid transparent;border-top-left-radius:3px;border-top-right-radius:3px}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link{align-items:center;border-bottom-style:solid;border-bottom-width:1px;box-sizing:border-box;cursor:pointer;display:inline-flex;height:40px;justify-content:center;outline:none;padding-left:16px;padding-right:16px;position:relative;text-align:center;white-space:nowrap}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused{z-index:1}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after{border-bottom:none;border-style:solid;border-top-left-radius:3px;border-top-right-radius:3px;border-width:2px;bottom:-1px;left:-1px;right:-1px;top:-2px}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link .mc-tab-overlay{bottom:0;left:0;pointer-events:none;right:0;top:-1px}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused+:hover:before{left:1px}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after{top:-1px}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link .mc-tab-overlay{position:absolute;top:0}.mc-tab-links{display:flex;flex-grow:1;padding:1px 1px 0;position:relative}.mc-tab-links .mc-tab-group_align-labels-center{justify-content:center}.mc-tab-links .mc-tab-group_align-labels-end{justify-content:flex-end}"]
                }] }
    ];
    /** @nocollapse */
    McTabNav.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    // Boilerplate for applying mixins to McTabLink.
    var McTabLinkBase = /** @class */ (function () {
        function McTabLinkBase() {
        }
        return McTabLinkBase;
    }());
    // tslint:disable-next-line:naming-convention
    /** @type {?} */
    var McTabLinkMixinBase = core$1.mixinTabIndex(core$1.mixinDisabled(McTabLinkBase));
    /**
     * Link inside of a `mc-tab-nav-bar`.
     */
    var McTabLink = /** @class */ (function (_super) {
        __extends(McTabLink, _super);
        /**
         * @param {?} elementRef
         * @param {?} focusMonitor
         */
        function McTabLink(elementRef, focusMonitor) {
            var _this = _super.call(this) || this;
            _this.elementRef = elementRef;
            _this.focusMonitor = focusMonitor;
            /**
             * Whether the tab link is active or not.
             */
            _this.isActive = false;
            _this.focusMonitor.monitor(_this.elementRef.nativeElement);
            return _this;
        }
        Object.defineProperty(McTabLink.prototype, "active", {
            /**
             * Whether the link is active.
             * @return {?}
             */
            get: function () {
                return this.isActive;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                if (value !== this.isActive) {
                    this.isActive = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @return {?}
         */
        McTabLink.prototype.ngOnDestroy = function () {
            this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
        };
        return McTabLink;
    }(McTabLinkMixinBase));
    McTabLink.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mc-tab-link], [mcTabLink]',
                    exportAs: 'mcTabLink',
                    inputs: ['disabled', 'tabIndex'],
                    host: {
                        class: 'mc-tab-link',
                        '[attr.aria-current]': 'active',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.tabindex]': 'tabIndex',
                        '[class.mc-disabled]': 'disabled',
                        '[class.mc-active]': 'active'
                    }
                },] }
    ];
    /** @nocollapse */
    McTabLink.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: a11y$1.FocusMonitor }
    ]; };
    McTabLink.propDecorators = {
        active: [{ type: core.Input }]
    };
    if (false) {
        /**
         * Whether the tab link is active or not.
         * @type {?}
         * @protected
         */
        McTabLink.prototype.isActive;
        /** @type {?} */
        McTabLink.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        McTabLink.prototype.focusMonitor;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: tabs.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McTabsModule = /** @class */ (function () {
        function McTabsModule() {
        }
        return McTabsModule;
    }());
    McTabsModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        core$1.McCommonModule,
                        portal.PortalModule,
                        a11y$1.A11yModule
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
                        McLightTabsCssStyler,
                        McAlignTabsCenterCssStyler,
                        McAlignTabsEndCssStyler,
                        McStretchTabsCssStyler
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
                        McLightTabsCssStyler,
                        McAlignTabsCenterCssStyler,
                        McAlignTabsEndCssStyler,
                        McStretchTabsCssStyler
                    ]
                },] }
    ];

    /**
     * @fileoverview added by tsickle
     * Generated from: tab-nav-bar/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

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
     * Generated from: ptsecurity-mosaic-tabs.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.MC_TABS_CONFIG = MC_TABS_CONFIG;
    exports.McAlignTabsCenterCssStyler = McAlignTabsCenterCssStyler;
    exports.McAlignTabsEndCssStyler = McAlignTabsEndCssStyler;
    exports.McLightTabsCssStyler = McLightTabsCssStyler;
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
    exports.mcTabsAnimations = mcTabsAnimations;
    exports.ɵa = McTabHeaderBase;
    exports.ɵb = McTabLabelWrapperBase;
    exports.ɵc = McTabLabelWrapperMixinBase;
    exports.ɵd = McTabBase;
    exports.ɵe = McTabMixinBase;
    exports.ɵf = McTabNavBase;
    exports.ɵg = McTabNavMixinBase;
    exports.ɵh = McTabLinkBase;
    exports.ɵi = McTabLinkMixinBase;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-tabs.umd.js.map
