(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/overlay'), require('@angular/cdk/portal'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/core'), require('@ptsecurity/mosaic/icon'), require('@angular/animations'), require('@ptsecurity/cdk/keycodes'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/sidepanel', ['exports', '@angular/cdk/overlay', '@angular/cdk/portal', '@angular/common', '@angular/core', '@ptsecurity/mosaic/core', '@ptsecurity/mosaic/icon', '@angular/animations', '@ptsecurity/cdk/keycodes', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.sidepanel = {}), global.ng.cdk.overlay, global.ng.cdk.portal, global.ng.common, global.ng.core, global.ptsecurity.mosaic.core, global.ptsecurity.mosaic.icon, global.ng.animations, global.keycodes, global.rxjs, global.rxjs.operators));
}(this, (function (exports, overlay, portal, common, core, core$1, icon, animations, keycodes, rxjs, operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
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

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
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
     * Generated from: sidepanel-config.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Injection token that can be used to access the data that was passed in to a sidepanel.
     * @type {?}
     */
    var MC_SIDEPANEL_DATA = new core.InjectionToken('McSidepanelData');
    /** @enum {string} */
    var McSidepanelPosition = {
        Right: "right",
        Left: "left",
        Top: "top",
        Bottom: "bottom",
    };
    /**
     * @template D
     */
    var   /**
     * @template D
     */
    McSidepanelConfig = /** @class */ (function () {
        function McSidepanelConfig() {
            /**
             * Data being injected into the child component.
             */
            this.data = null;
            this.position = McSidepanelPosition.Right;
            /**
             * Whether the sidepanel has a backdrop.
             */
            this.hasBackdrop = true;
            /**
             * When we open multiple sidepanels, backdrop appears only once, except cases then this flag is true.
             */
            this.requiredBackdrop = false;
            /**
             * Whether the user can use escape or clicking outside to close the sidepanel.
             */
            this.disableClose = false;
            /**
             * Custom class for the overlay pane.
             */
            this.overlayPanelClass = '';
        }
        return McSidepanelConfig;
    }());
    if (false) {
        /**
         * ID for the sidepanel. If omitted, a unique one will be generated.
         * @type {?}
         */
        McSidepanelConfig.prototype.id;
        /**
         * Data being injected into the child component.
         * @type {?}
         */
        McSidepanelConfig.prototype.data;
        /** @type {?} */
        McSidepanelConfig.prototype.position;
        /**
         * Whether the sidepanel has a backdrop.
         * @type {?}
         */
        McSidepanelConfig.prototype.hasBackdrop;
        /**
         * When we open multiple sidepanels, backdrop appears only once, except cases then this flag is true.
         * @type {?}
         */
        McSidepanelConfig.prototype.requiredBackdrop;
        /**
         * Whether the user can use escape or clicking outside to close the sidepanel.
         * @type {?}
         */
        McSidepanelConfig.prototype.disableClose;
        /**
         * Custom class for the overlay pane.
         * @type {?}
         */
        McSidepanelConfig.prototype.overlayPanelClass;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: sidepanel-animations.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var McSidepanelAnimationState = {
        Void: "void",
        Visible: "visible",
        Hidden: "hidden",
    };
    // TODO Find a way to use dynamic keys and avoid error "Expression form not supported."
    // tslint:disable-next-line
    /** @type {?} */
    var mcSidepanelTransformAnimation = {
        right: { in: 'translateX(100%)', out: 'translateX(0%)' },
        left: { in: 'translateX(-100%)', out: 'translateX(0%)' },
        top: { in: 'translateY(-100%)', out: 'translateY(0%)' },
        bottom: { in: 'translateY(100%)', out: 'translateY(0%)' }
    };
    /** @type {?} */
    var mcSidepanelAnimations = {
        sidepanelState: animations.trigger('state', [
            animations.state('hidden', animations.style({ transform: '{{transformIn}}' }), { params: { transformIn: mcSidepanelTransformAnimation[McSidepanelPosition.Right].in } }),
            animations.state('visible', animations.style({ transform: '{{transformOut}}' }), { params: { transformOut: mcSidepanelTransformAnimation[McSidepanelPosition.Right].out } }),
            animations.transition('visible => void, visible => hidden', animations.animate("200ms " + core$1.AnimationCurves.AccelerationCurve)),
            animations.transition('void => visible', animations.animate("200ms " + core$1.AnimationCurves.DecelerationCurve))
        ])
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: sidepanel-container.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var MC_SIDEPANEL_WITH_INDENT = new core.InjectionToken('mc-sidepanel-with-indent');
    /** @type {?} */
    var MC_SIDEPANEL_WITH_SHADOW = new core.InjectionToken('mc-sidepanel-with-shadow');
    var McSidepanelContainerComponent = /** @class */ (function (_super) {
        __extends(McSidepanelContainerComponent, _super);
        function McSidepanelContainerComponent(elementRef, changeDetectorRef, sidepanelConfig, withIndent, withShadow) {
            var _this = _super.call(this) || this;
            _this.elementRef = elementRef;
            _this.changeDetectorRef = changeDetectorRef;
            _this.sidepanelConfig = sidepanelConfig;
            _this.withIndent = withIndent;
            _this.withShadow = withShadow;
            /**
             * The state of the sidepanel animations.
             */
            _this.animationState = McSidepanelAnimationState.Void;
            /**
             * Emits whenever the state of the animation changes.
             */
            _this.animationStateChanged = new core.EventEmitter();
            return _this;
        }
        /**
         * @return {?}
         */
        McSidepanelContainerComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroyed = true;
        };
        /** Attach a component portal as content to this sidepanel container. */
        /**
         * Attach a component portal as content to this sidepanel container.
         * @template T
         * @param {?} portal
         * @return {?}
         */
        McSidepanelContainerComponent.prototype.attachComponentPortal = /**
         * Attach a component portal as content to this sidepanel container.
         * @template T
         * @param {?} portal
         * @return {?}
         */
        function (portal) {
            this.validatePortalAttached();
            this.setAnimation();
            this.setPanelClass();
            return this.portalOutlet.attachComponentPortal(portal);
        };
        /** Attach a template portal as content to this sidepanel container. */
        /**
         * Attach a template portal as content to this sidepanel container.
         * @template C
         * @param {?} portal
         * @return {?}
         */
        McSidepanelContainerComponent.prototype.attachTemplatePortal = /**
         * Attach a template portal as content to this sidepanel container.
         * @template C
         * @param {?} portal
         * @return {?}
         */
        function (portal) {
            this.validatePortalAttached();
            this.setAnimation();
            this.setPanelClass();
            return this.portalOutlet.attachTemplatePortal(portal);
        };
        /** Begin animation of the sidepanel entrance into view. */
        /**
         * Begin animation of the sidepanel entrance into view.
         * @return {?}
         */
        McSidepanelContainerComponent.prototype.enter = /**
         * Begin animation of the sidepanel entrance into view.
         * @return {?}
         */
        function () {
            if (!this.destroyed) {
                this.animationState = McSidepanelAnimationState.Visible;
                this.changeDetectorRef.detectChanges();
            }
        };
        /** Begin animation of the sidepanel exiting from view. */
        /**
         * Begin animation of the sidepanel exiting from view.
         * @return {?}
         */
        McSidepanelContainerComponent.prototype.exit = /**
         * Begin animation of the sidepanel exiting from view.
         * @return {?}
         */
        function () {
            if (!this.destroyed) {
                this.animationState = McSidepanelAnimationState.Hidden;
                this.changeDetectorRef.markForCheck();
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        McSidepanelContainerComponent.prototype.onAnimation = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            this.animationStateChanged.emit(event);
        };
        /**
         * @private
         * @return {?}
         */
        McSidepanelContainerComponent.prototype.setAnimation = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var position = (/** @type {?} */ (this.sidepanelConfig.position));
            this.animationTransform = {
                transformIn: mcSidepanelTransformAnimation[position].in,
                transformOut: mcSidepanelTransformAnimation[position].out
            };
        };
        /**
         * @private
         * @return {?}
         */
        McSidepanelContainerComponent.prototype.setPanelClass = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var element = this.elementRef.nativeElement;
            /** @type {?} */
            var position = (/** @type {?} */ (this.sidepanelConfig.position));
            element.classList.add("mc-sidepanel-container_" + position);
            if (this.withShadow) {
                element.classList.add('mc-sidepanel-container_shadowed');
            }
        };
        /**
         * @private
         * @return {?}
         */
        McSidepanelContainerComponent.prototype.validatePortalAttached = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.portalOutlet.hasAttached()) {
                throw Error('Attempting to attach sidepanel content after content is already attached');
            }
        };
        McSidepanelContainerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mc-sidepanel-container',
                        template: "<div class=\"mc-sidepanel-wrapper\">\n\n    <button *ngIf=\"withIndent\"\n            class=\"mc-sidepanel-indent mc-button_transparent\"\n            mc-button\n            mcSidepanelClose>\n        <i mc-icon=\"mc-close-L_16\" class=\"mc-icon mc-icon_light\" color=\"second\"></i>\n    </button>\n\n    <div class=\"mc-sidepanel-content\">\n        <ng-template cdkPortalOutlet></ng-template>\n    </div>\n</div>\n\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        animations: [mcSidepanelAnimations.sidepanelState],
                        host: {
                            class: 'mc-sidepanel-container',
                            role: 'dialog',
                            'aria-modal': 'true',
                            '[attr.id]': 'id',
                            '[attr.tabindex]': '-1',
                            '[@state]': "{\n            value: animationState,\n            params: animationTransform\n        }",
                            '(@state.start)': 'onAnimation($event)',
                            '(@state.done)': 'onAnimation($event)'
                        },
                        styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-sidepanel-container{outline:0;display:flex;flex:1;position:fixed;min-height:0}.mc-sidepanel-container .flex{min-height:0}.mc-sidepanel-container_left,.mc-sidepanel-container_right{width:33%;min-width:400px;height:100%;top:0}.mc-sidepanel-container_left .mc-sidepanel-indent,.mc-sidepanel-container_right .mc-sidepanel-indent{width:16px;height:100%}.mc-sidepanel-container_right{right:0;transform:translateX(100%)}.mc-sidepanel-container_right .mc-sidepanel-wrapper{flex-direction:row}.mc-sidepanel-container_left{left:0;transform:translateX(-100%)}.mc-sidepanel-container_left .mc-sidepanel-wrapper{flex-direction:row-reverse}.mc-sidepanel-container_bottom,.mc-sidepanel-container_top{flex-direction:column;height:33%;min-height:400px;width:100%;left:0}.mc-sidepanel-container_bottom .mc-sidepanel-indent,.mc-sidepanel-container_top .mc-sidepanel-indent{height:16px;width:100%}.mc-sidepanel-container_top{top:0;transform:translateY(-100%)}.mc-sidepanel-container_top .mc-sidepanel-wrapper{flex-direction:column-reverse}.mc-sidepanel-container_bottom{bottom:0;transform:translateY(100%)}.mc-sidepanel-container_bottom .mc-sidepanel-wrapper{flex-direction:column}.mc-sidepanel-wrapper{display:flex;flex:1;min-height:0;width:100%}.mc-sidepanel-indent{display:flex;flex:0 0 auto}.mc-sidepanel-indent .mc-sidepanel-close{width:100%;height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;background:0 0;padding:0}.mc-sidepanel-content{display:flex;flex-direction:column;flex:1;min-height:0;width:100%}.mc-sidepanel-header{padding:14px 16px;display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center;flex:0 0 auto}.mc-sidepanel-header .mc-sidepanel-close{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;background:0 0;padding:0 0 0 8px}.mc-sidepanel-title{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mc-sidepanel-body{overflow-y:auto;display:flex;flex:1;flex-direction:column;min-height:0}.mc-sidepanel-footer{padding:16px;display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center;flex:0 0 auto}.mc-sidepanel-footer .mc-sidepanel-actions{display:flex;align-items:center;flex-direction:row;flex:1}.mc-sidepanel-footer .mc-sidepanel-actions[align=left]{justify-content:start}.mc-sidepanel-footer .mc-sidepanel-actions[align=right]{justify-content:flex-end}.mc-sidepanel-footer button+button{margin-left:16px}"]
                    }] }
        ];
        /** @nocollapse */
        McSidepanelContainerComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef },
            { type: McSidepanelConfig },
            { type: Boolean, decorators: [{ type: core.Inject, args: [MC_SIDEPANEL_WITH_INDENT,] }] },
            { type: Boolean, decorators: [{ type: core.Inject, args: [MC_SIDEPANEL_WITH_SHADOW,] }] }
        ]; };
        McSidepanelContainerComponent.propDecorators = {
            portalOutlet: [{ type: core.ViewChild, args: [portal.CdkPortalOutlet, { static: true },] }]
        };
        return McSidepanelContainerComponent;
    }(portal.BasePortalOutlet));
    if (false) {
        /**
         * ID for the container DOM element.
         * @type {?}
         */
        McSidepanelContainerComponent.prototype.id;
        /**
         * The portal outlet inside of this container into which the content will be loaded.
         * @type {?}
         */
        McSidepanelContainerComponent.prototype.portalOutlet;
        /**
         * The state of the sidepanel animations.
         * @type {?}
         */
        McSidepanelContainerComponent.prototype.animationState;
        /** @type {?} */
        McSidepanelContainerComponent.prototype.animationTransform;
        /**
         * Emits whenever the state of the animation changes.
         * @type {?}
         */
        McSidepanelContainerComponent.prototype.animationStateChanged;
        /**
         * Whether the component has been destroyed.
         * @type {?}
         * @private
         */
        McSidepanelContainerComponent.prototype.destroyed;
        /**
         * @type {?}
         * @private
         */
        McSidepanelContainerComponent.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        McSidepanelContainerComponent.prototype.changeDetectorRef;
        /** @type {?} */
        McSidepanelContainerComponent.prototype.sidepanelConfig;
        /** @type {?} */
        McSidepanelContainerComponent.prototype.withIndent;
        /** @type {?} */
        McSidepanelContainerComponent.prototype.withShadow;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: sidepanel-ref.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // Counter for unique sidepanel ids.
    /** @type {?} */
    var uniqueId = 0;
    /**
     * @template T, R
     */
    var   /**
     * @template T, R
     */
    McSidepanelRef = /** @class */ (function () {
        function McSidepanelRef(containerInstance, overlayRef, config) {
            var _this = this;
            this.containerInstance = containerInstance;
            this.overlayRef = overlayRef;
            this.config = config;
            /**
             * Subject for notifying the user that the sidepanel has been closed and dismissed.
             */
            this.afterClosed$ = new rxjs.Subject();
            /**
             * Subject for notifying the user that the sidepanel has opened and appeared.
             */
            this.afterOpened$ = new rxjs.Subject();
            this.id = this.config.id || "mc-sidepanel-" + uniqueId++;
            this.containerInstance.id = this.id;
            // Emit when opening animation completes
            containerInstance.animationStateChanged.pipe(operators.filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event.phaseName === 'done' && event.toState === McSidepanelAnimationState.Visible; })), operators.take(1)).subscribe((/**
             * @return {?}
             */
            function () {
                _this.afterOpened$.next();
                _this.afterOpened$.complete();
            }));
            // Dispose overlay when closing animation is complete
            containerInstance.animationStateChanged.pipe(operators.filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event.phaseName === 'done' && event.toState === McSidepanelAnimationState.Hidden; })), operators.take(1)).subscribe((/**
             * @return {?}
             */
            function () {
                overlayRef.dispose();
                _this.afterClosed$.next(_this.result);
                _this.afterClosed$.complete();
            }));
            if (!containerInstance.sidepanelConfig.disableClose) {
                rxjs.merge(overlayRef.backdropClick(), overlayRef.keydownEvents().pipe(
                // tslint:disable:deprecation
                // keyCode is deprecated, but IE11 and Edge don't support code property, which we need use instead
                operators.filter((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) { return event.keyCode === keycodes.ESCAPE; })))).subscribe((/**
                 * @return {?}
                 */
                function () { return _this.close(); }));
            }
        }
        /**
         * @param {?=} result
         * @return {?}
         */
        McSidepanelRef.prototype.close = /**
         * @param {?=} result
         * @return {?}
         */
        function (result) {
            var _this = this;
            if (!this.afterClosed$.closed) {
                // Transition the backdrop in parallel to the sidepanel.
                this.containerInstance.animationStateChanged.pipe(operators.filter((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) { return event.phaseName === 'done'; })), operators.take(1)).subscribe((/**
                 * @return {?}
                 */
                function () { return _this.overlayRef.detachBackdrop(); }));
                this.result = result;
                this.containerInstance.exit();
            }
        };
        /** Gets an observable that is notified when the sidepanel is finished closing. */
        /**
         * Gets an observable that is notified when the sidepanel is finished closing.
         * @return {?}
         */
        McSidepanelRef.prototype.afterClosed = /**
         * Gets an observable that is notified when the sidepanel is finished closing.
         * @return {?}
         */
        function () {
            return this.afterClosed$.asObservable();
        };
        /** Gets an observable that is notified when the sidepanel has opened and appeared. */
        /**
         * Gets an observable that is notified when the sidepanel has opened and appeared.
         * @return {?}
         */
        McSidepanelRef.prototype.afterOpened = /**
         * Gets an observable that is notified when the sidepanel has opened and appeared.
         * @return {?}
         */
        function () {
            return this.afterOpened$.asObservable();
        };
        return McSidepanelRef;
    }());
    if (false) {
        /** @type {?} */
        McSidepanelRef.prototype.id;
        /**
         * Instance of the component making up the content of the sidepanel.
         * @type {?}
         */
        McSidepanelRef.prototype.instance;
        /**
         * Subject for notifying the user that the sidepanel has been closed and dismissed.
         * @type {?}
         * @private
         */
        McSidepanelRef.prototype.afterClosed$;
        /**
         * Subject for notifying the user that the sidepanel has opened and appeared.
         * @type {?}
         * @private
         */
        McSidepanelRef.prototype.afterOpened$;
        /**
         * Result to be passed down to the `afterDismissed` stream.
         * @type {?}
         * @private
         */
        McSidepanelRef.prototype.result;
        /** @type {?} */
        McSidepanelRef.prototype.containerInstance;
        /**
         * @type {?}
         * @private
         */
        McSidepanelRef.prototype.overlayRef;
        /** @type {?} */
        McSidepanelRef.prototype.config;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: sidepanel.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Injection token that can be used to specify default sidepanel options.
     * @type {?}
     */
    var MC_SIDEPANEL_DEFAULT_OPTIONS = new core.InjectionToken('mc-sidepanel-default-options');
    var McSidepanelService = /** @class */ (function () {
        function McSidepanelService(overlay, injector, defaultOptions, parentSidepanelService) {
            this.overlay = overlay;
            this.injector = injector;
            this.defaultOptions = defaultOptions;
            this.parentSidepanelService = parentSidepanelService;
            this.openedSidepanelsAtThisLevel = [];
        }
        Object.defineProperty(McSidepanelService.prototype, "openedSidepanels", {
            /** Keeps track of the currently-open sidepanels. */
            get: /**
             * Keeps track of the currently-open sidepanels.
             * @return {?}
             */
            function () {
                return this.parentSidepanelService ? this.parentSidepanelService.openedSidepanels :
                    this.openedSidepanelsAtThisLevel;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        McSidepanelService.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            // Only close the sidepanels at this level on destroy
            // since the parent service may still be active.
            this.closeSidepanels(this.openedSidepanelsAtThisLevel);
        };
        /**
         * @template T, D
         * @param {?} componentOrTemplateRef
         * @param {?=} config
         * @return {?}
         */
        McSidepanelService.prototype.open = /**
         * @template T, D
         * @param {?} componentOrTemplateRef
         * @param {?=} config
         * @return {?}
         */
        function (componentOrTemplateRef, config) {
            var _this = this;
            /** @type {?} */
            var fullConfig = __assign(__assign({}, (this.defaultOptions || new McSidepanelConfig())), config);
            if (fullConfig.id && this.getSidepanelById(fullConfig.id)) {
                throw Error("Sidepanel with id \"" + fullConfig.id + "\" exists already. The sidepanel id must be unique.");
            }
            /** @type {?} */
            var overlayRef = this.createOverlay(fullConfig);
            /** @type {?} */
            var container = this.attachContainer(overlayRef, fullConfig);
            /** @type {?} */
            var ref = new McSidepanelRef(container, overlayRef, fullConfig);
            if (componentOrTemplateRef instanceof core.TemplateRef) {
                container.attachTemplatePortal(new portal.TemplatePortal(componentOrTemplateRef, (/** @type {?} */ (null)), (/** @type {?} */ ({
                    $implicit: fullConfig.data,
                    sidepanelRef: ref
                }))));
            }
            else {
                /** @type {?} */
                var injector = this.createInjector(fullConfig, ref, container);
                /** @type {?} */
                var portal$1 = new portal.ComponentPortal(componentOrTemplateRef, undefined, injector);
                /** @type {?} */
                var contentRef = container.attachComponentPortal(portal$1);
                ref.instance = contentRef.instance;
            }
            this.openedSidepanels.push(ref);
            ref.afterClosed().subscribe((/**
             * @return {?}
             */
            function () { return _this.removeOpenSidepanel(ref); }));
            container.enter();
            return ref;
        };
        /**
         * Closes all of the currently-open sidepanels.
         */
        /**
         * Closes all of the currently-open sidepanels.
         * @return {?}
         */
        McSidepanelService.prototype.closeAll = /**
         * Closes all of the currently-open sidepanels.
         * @return {?}
         */
        function () {
            this.closeSidepanels(this.openedSidepanels);
        };
        /**
         * Finds an open sidepanel by its id.
         * @param id ID to use when looking up the sidepanel.
         */
        /**
         * Finds an open sidepanel by its id.
         * @param {?} id ID to use when looking up the sidepanel.
         * @return {?}
         */
        McSidepanelService.prototype.getSidepanelById = /**
         * Finds an open sidepanel by its id.
         * @param {?} id ID to use when looking up the sidepanel.
         * @return {?}
         */
        function (id) {
            return this.openedSidepanels.find((/**
             * @param {?} sidepanel
             * @return {?}
             */
            function (sidepanel) { return sidepanel.id === id; }));
        };
        /**
         * Attaches the sidepanel container component to the overlay.
         */
        /**
         * Attaches the sidepanel container component to the overlay.
         * @private
         * @param {?} overlayRef
         * @param {?} config
         * @return {?}
         */
        McSidepanelService.prototype.attachContainer = /**
         * Attaches the sidepanel container component to the overlay.
         * @private
         * @param {?} overlayRef
         * @param {?} config
         * @return {?}
         */
        function (overlayRef, config) {
            /** @type {?} */
            var openedSidepanelsWithSamePosition = this.getOpenedSidepanelsWithSamePosition(config);
            /** @type {?} */
            var injector = new portal.PortalInjector(this.injector, new WeakMap([
                [McSidepanelConfig, config],
                [MC_SIDEPANEL_WITH_INDENT, openedSidepanelsWithSamePosition.length >= 1],
                [MC_SIDEPANEL_WITH_SHADOW, openedSidepanelsWithSamePosition.length < 2] // tslint:disable-line
            ]));
            /** @type {?} */
            var containerPortal = new portal.ComponentPortal(McSidepanelContainerComponent, undefined, injector);
            /** @type {?} */
            var containerRef = overlayRef.attach(containerPortal);
            return containerRef.instance;
        };
        /**
         * Creates a custom injector to be used inside the sidepanel. This allows a component loaded inside
         * of a sidepanel to close itself and, optionally, to return a value.
         * @param config Config object that is used to construct the sidepanel.
         * @param sidepanelRef Reference to the sidepanel.
         * @param sidepanelContainer Sidepanel container element that wraps all of the contents.
         * @returns The custom injector that can be used inside the sidepanel.
         */
        /**
         * Creates a custom injector to be used inside the sidepanel. This allows a component loaded inside
         * of a sidepanel to close itself and, optionally, to return a value.
         * @private
         * @template T
         * @param {?} config Config object that is used to construct the sidepanel.
         * @param {?} sidepanelRef Reference to the sidepanel.
         * @param {?} sidepanelContainer Sidepanel container element that wraps all of the contents.
         * @return {?} The custom injector that can be used inside the sidepanel.
         */
        McSidepanelService.prototype.createInjector = /**
         * Creates a custom injector to be used inside the sidepanel. This allows a component loaded inside
         * of a sidepanel to close itself and, optionally, to return a value.
         * @private
         * @template T
         * @param {?} config Config object that is used to construct the sidepanel.
         * @param {?} sidepanelRef Reference to the sidepanel.
         * @param {?} sidepanelContainer Sidepanel container element that wraps all of the contents.
         * @return {?} The custom injector that can be used inside the sidepanel.
         */
        function (config, sidepanelRef, sidepanelContainer) {
            // The McSidepanelContainerComponent is injected in the portal as the McSidepanelContainerComponent and
            // the sidepanel's content are created out of the same ViewContainerRef and as such, are siblings for injector
            // purposes. To allow the hierarchy that is expected, the McSidepanelContainerComponent is explicitly
            // added to the injection tokens.
            /** @type {?} */
            var injectionTokens = new WeakMap([
                [McSidepanelContainerComponent, sidepanelContainer],
                [MC_SIDEPANEL_DATA, config.data],
                [McSidepanelRef, sidepanelRef]
            ]);
            return new portal.PortalInjector(this.injector, injectionTokens);
        };
        /**
         * Creates a new overlay and places it in the correct location.
         * @param config The user-specified sidepanel config.
         */
        /**
         * Creates a new overlay and places it in the correct location.
         * @private
         * @param {?} config The user-specified sidepanel config.
         * @return {?}
         */
        McSidepanelService.prototype.createOverlay = /**
         * Creates a new overlay and places it in the correct location.
         * @private
         * @param {?} config The user-specified sidepanel config.
         * @return {?}
         */
        function (config) {
            /** @type {?} */
            var overlayConfig = new overlay.OverlayConfig({
                hasBackdrop: config.hasBackdrop,
                backdropClass: this.getBackdropClass(config),
                maxWidth: '100%',
                panelClass: config.overlayPanelClass,
                scrollStrategy: this.overlay.scrollStrategies.block(),
                positionStrategy: this.overlay.position().global()
            });
            return this.overlay.create(overlayConfig);
        };
        /**
         * @private
         * @param {?} sidepanels
         * @return {?}
         */
        McSidepanelService.prototype.closeSidepanels = /**
         * @private
         * @param {?} sidepanels
         * @return {?}
         */
        function (sidepanels) {
            /** @type {?} */
            var reversedOpenedSidepanels = __spread(sidepanels.reverse());
            reversedOpenedSidepanels.forEach((/**
             * @param {?} sidepanelRef
             * @return {?}
             */
            function (sidepanelRef) {
                sidepanelRef.close();
            }));
        };
        /**
         * @private
         * @param {?} config
         * @return {?}
         */
        McSidepanelService.prototype.getBackdropClass = /**
         * @private
         * @param {?} config
         * @return {?}
         */
        function (config) {
            /** @type {?} */
            var hasOpenedSidepanelWithBackdrop = this.openedSidepanels.some((/**
             * @param {?} sidepanelRef
             * @return {?}
             */
            function (sidepanelRef) { return (/** @type {?} */ (sidepanelRef.config.hasBackdrop)); }));
            return config.requiredBackdrop || !hasOpenedSidepanelWithBackdrop ? 'cdk-overlay-dark-backdrop' :
                'cdk-overlay-transparent-backdrop';
        };
        /**
         * @private
         * @param {?} config
         * @return {?}
         */
        McSidepanelService.prototype.getOpenedSidepanelsWithSamePosition = /**
         * @private
         * @param {?} config
         * @return {?}
         */
        function (config) {
            return this.openedSidepanels.filter((/**
             * @param {?} sidepanelRef
             * @return {?}
             */
            function (sidepanelRef) { return sidepanelRef.config.position === config.position; }));
        };
        /**
         * Removes a sidepanel from the array of open sidepanels.
         * @param sidepanelRef Sidepanel to be removed.
         */
        /**
         * Removes a sidepanel from the array of open sidepanels.
         * @private
         * @param {?} sidepanelRef Sidepanel to be removed.
         * @return {?}
         */
        McSidepanelService.prototype.removeOpenSidepanel = /**
         * Removes a sidepanel from the array of open sidepanels.
         * @private
         * @param {?} sidepanelRef Sidepanel to be removed.
         * @return {?}
         */
        function (sidepanelRef) {
            /** @type {?} */
            var index = this.openedSidepanels.indexOf(sidepanelRef);
            if (index > -1) {
                this.openedSidepanels.splice(index, 1);
            }
        };
        McSidepanelService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        McSidepanelService.ctorParameters = function () { return [
            { type: overlay.Overlay },
            { type: core.Injector },
            { type: McSidepanelConfig, decorators: [{ type: core.Optional }, { type: core.Inject, args: [MC_SIDEPANEL_DEFAULT_OPTIONS,] }] },
            { type: McSidepanelService, decorators: [{ type: core.Optional }, { type: core.SkipSelf }] }
        ]; };
        return McSidepanelService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        McSidepanelService.prototype.openedSidepanelsAtThisLevel;
        /**
         * @type {?}
         * @private
         */
        McSidepanelService.prototype.overlay;
        /**
         * @type {?}
         * @private
         */
        McSidepanelService.prototype.injector;
        /**
         * @type {?}
         * @private
         */
        McSidepanelService.prototype.defaultOptions;
        /**
         * @type {?}
         * @private
         */
        McSidepanelService.prototype.parentSidepanelService;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: sidepanel-directives.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Button that will close the current sidepanel.
     */
    var McSidepanelClose = /** @class */ (function () {
        function McSidepanelClose(sidepanelRef, elementRef, sidepanelService) {
            this.sidepanelRef = sidepanelRef;
            this.elementRef = elementRef;
            this.sidepanelService = sidepanelService;
        }
        /**
         * @return {?}
         */
        McSidepanelClose.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this.sidepanelRef) {
                // When this directive is included in a sidepanel via TemplateRef (rather than being
                // in a Component), the SidepanelRef isn't available via injection because embedded
                // views cannot be given a custom injector. Instead, we look up the SidepanelRef by
                // ID.
                // This must occur in `onInit`, as the ID binding for the sidepanel container won't
                // be resolved at constructor time. We use setTimeout by same reason.
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.sidepanelRef = (/** @type {?} */ (getClosestSidepanel(_this.elementRef, _this.sidepanelService.openedSidepanels)));
                }));
            }
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        McSidepanelClose.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            /** @type {?} */
            var proxiedChange = changes.mcSidepanelClose || changes.sidepanelResult;
            if (proxiedChange) {
                this.sidepanelResult = proxiedChange.currentValue;
            }
        };
        McSidepanelClose.decorators = [
            { type: core.Directive, args: [{
                        selector: 'button[mc-sidepanel-close], button[mcSidepanelClose]',
                        host: {
                            '(click)': 'sidepanelRef.close(sidepanelResult)',
                            class: 'mc-sidepanel-close'
                        }
                    },] }
        ];
        /** @nocollapse */
        McSidepanelClose.ctorParameters = function () { return [
            { type: McSidepanelRef, decorators: [{ type: core.Optional }] },
            { type: core.ElementRef },
            { type: McSidepanelService }
        ]; };
        McSidepanelClose.propDecorators = {
            sidepanelResult: [{ type: core.Input, args: ['mc-sidepanel-close',] }],
            mcSidepanelClose: [{ type: core.Input, args: ['mcSidepanelClose',] }]
        };
        return McSidepanelClose;
    }());
    if (false) {
        /** @type {?} */
        McSidepanelClose.prototype.sidepanelResult;
        /** @type {?} */
        McSidepanelClose.prototype.mcSidepanelClose;
        /** @type {?} */
        McSidepanelClose.prototype.sidepanelRef;
        /**
         * @type {?}
         * @private
         */
        McSidepanelClose.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        McSidepanelClose.prototype.sidepanelService;
    }
    /**
     * Header of a sidepanel.
     */
    var McSidepanelHeader = /** @class */ (function () {
        function McSidepanelHeader() {
        }
        McSidepanelHeader.decorators = [
            { type: core.Component, args: [{
                        selector: 'mc-sidepanel-header',
                        template: "\n        <div class=\"mc-sidepanel-title\">\n            <ng-content></ng-content>\n        </div>\n        <button *ngIf=\"closeable\" mc-sidepanel-close>\n            <span class=\"mc-sidepanel-close-x\">\n                <i mc-icon=\"mc-close-L_16\" class=\"mc-icon mc-icon_light\" color=\"second\"></i>\n            </span>\n        </button>\n    ",
                        host: {
                            class: 'mc-sidepanel-header'
                        }
                    }] }
        ];
        McSidepanelHeader.propDecorators = {
            closeable: [{ type: core.Input }]
        };
        return McSidepanelHeader;
    }());
    if (false) {
        /** @type {?} */
        McSidepanelHeader.prototype.closeable;
    }
    /**
     * Scrollable content container of a sidepanel.
     */
    var McSidepanelBody = /** @class */ (function () {
        function McSidepanelBody() {
        }
        McSidepanelBody.decorators = [
            { type: core.Directive, args: [{
                        selector: 'mc-sidepanel-body, [mc-sidepanel-body], mcSidepanelBody',
                        host: {
                            class: 'mc-sidepanel-body'
                        }
                    },] }
        ];
        return McSidepanelBody;
    }());
    /**
     * Footer of a sidepanel.
     */
    var McSidepanelFooter = /** @class */ (function () {
        function McSidepanelFooter() {
        }
        McSidepanelFooter.decorators = [
            { type: core.Directive, args: [{
                        selector: 'mc-sidepanel-footer, [mc-sidepanel-footer], mcSidepanelFooter',
                        host: {
                            class: 'mc-sidepanel-footer'
                        }
                    },] }
        ];
        return McSidepanelFooter;
    }());
    /**
     * Actions block of a sidepanel footer.
     */
    var McSidepanelActions = /** @class */ (function () {
        function McSidepanelActions() {
        }
        McSidepanelActions.decorators = [
            { type: core.Directive, args: [{
                        selector: 'mc-sidepanel-actions, [mc-sidepanel-actions], mcSidepanelActions',
                        host: {
                            class: 'mc-sidepanel-actions'
                        }
                    },] }
        ];
        return McSidepanelActions;
    }());
    /**
     * Finds the closest McSidepanelRef to an element by looking at the DOM.
     * @param {?} element Element relative to which to look for a sidepanel.
     * @param {?} openSidepanels References to the currently-open sidepanels.
     * @return {?}
     */
    function getClosestSidepanel(element, openSidepanels) {
        /** @type {?} */
        var parent = element.nativeElement.parentElement;
        while (parent && !parent.classList.contains('mc-sidepanel-container')) {
            parent = parent.parentElement;
        }
        return parent ? openSidepanels.find((/**
         * @param {?} sidepanel
         * @return {?}
         */
        function (sidepanel) { return sidepanel.id === (/** @type {?} */ (parent)).id; })) : null;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: sidepanel.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McSidepanelModule = /** @class */ (function () {
        function McSidepanelModule() {
        }
        McSidepanelModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            overlay.OverlayModule,
                            portal.PortalModule,
                            core$1.McCommonModule,
                            icon.McIconModule
                        ],
                        providers: [McSidepanelService],
                        declarations: [
                            McSidepanelContainerComponent,
                            McSidepanelClose,
                            McSidepanelHeader,
                            McSidepanelBody,
                            McSidepanelFooter,
                            McSidepanelActions
                        ],
                        entryComponents: [McSidepanelContainerComponent],
                        exports: [
                            McSidepanelContainerComponent,
                            McSidepanelClose,
                            McSidepanelHeader,
                            McSidepanelBody,
                            McSidepanelFooter,
                            McSidepanelActions
                        ]
                    },] }
        ];
        return McSidepanelModule;
    }());

    exports.MC_SIDEPANEL_DATA = MC_SIDEPANEL_DATA;
    exports.MC_SIDEPANEL_DEFAULT_OPTIONS = MC_SIDEPANEL_DEFAULT_OPTIONS;
    exports.MC_SIDEPANEL_WITH_INDENT = MC_SIDEPANEL_WITH_INDENT;
    exports.MC_SIDEPANEL_WITH_SHADOW = MC_SIDEPANEL_WITH_SHADOW;
    exports.McSidepanelConfig = McSidepanelConfig;
    exports.McSidepanelContainerComponent = McSidepanelContainerComponent;
    exports.McSidepanelModule = McSidepanelModule;
    exports.McSidepanelPosition = McSidepanelPosition;
    exports.McSidepanelRef = McSidepanelRef;
    exports.McSidepanelService = McSidepanelService;
    exports.ɵa = mcSidepanelTransformAnimation;
    exports.ɵb = mcSidepanelAnimations;
    exports.ɵc = McSidepanelClose;
    exports.ɵd = McSidepanelHeader;
    exports.ɵe = McSidepanelBody;
    exports.ɵf = McSidepanelFooter;
    exports.ɵg = McSidepanelActions;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-sidepanel.umd.js.map