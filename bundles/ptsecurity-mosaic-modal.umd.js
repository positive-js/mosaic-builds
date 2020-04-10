(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/overlay'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/cdk/keycodes'), require('rxjs'), require('@angular/cdk/a11y'), require('@ptsecurity/mosaic/button'), require('@ptsecurity/mosaic/icon'), require('@angular/cdk/portal'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/modal', ['exports', '@angular/cdk/overlay', '@angular/common', '@angular/core', '@ptsecurity/cdk/keycodes', 'rxjs', '@angular/cdk/a11y', '@ptsecurity/mosaic/button', '@ptsecurity/mosaic/icon', '@angular/cdk/portal', 'rxjs/operators'], factory) :
    (global = global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.modal = {}), global.ng.cdk.overlay, global.ng.common, global.ng.core, global.keycodes, global.rxjs, global.ng.cdk.a11y, global.ptsecurity.mosaic.button, global.ptsecurity.mosaic.icon, global.ng.cdk.portal, global.rxjs.operators));
}(this, (function (exports, overlay, common, core, keycodes, rxjs, a11y, button, icon, portal, operators) { 'use strict';

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
     * Generated from: modal-control.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function IRegisteredMeta() { }
    if (false) {
        /** @type {?} */
        IRegisteredMeta.prototype.modalRef;
        /** @type {?} */
        IRegisteredMeta.prototype.afterOpenSubscription;
        /** @type {?} */
        IRegisteredMeta.prototype.afterCloseSubscription;
    }
    var McModalControlService = /** @class */ (function () {
        function McModalControlService(parentService) {
            this.parentService = parentService;
            // @ts-ignore
            this.rootOpenModals = this.parentService ? null : [];
            // @ts-ignore
            this.rootAfterAllClose = this.parentService ? null : new rxjs.Subject();
            // @ts-ignore
            this.rootRegisteredMetaMap = this.parentService ? null : new Map();
        }
        Object.defineProperty(McModalControlService.prototype, "afterAllClose", {
            // Track singleton afterAllClose through over the injection tree
            get: 
            // Track singleton afterAllClose through over the injection tree
            /**
             * @return {?}
             */
            function () {
                return this.parentService ? this.parentService.afterAllClose : this.rootAfterAllClose;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McModalControlService.prototype, "openModals", {
            // Track singleton openModals array through over the injection tree
            get: 
            // Track singleton openModals array through over the injection tree
            /**
             * @return {?}
             */
            function () {
                return this.parentService ? this.parentService.openModals : this.rootOpenModals;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McModalControlService.prototype, "registeredMetaMap", {
            // Registered modal for later usage
            get: 
            // Registered modal for later usage
            /**
             * @private
             * @return {?}
             */
            function () {
                return this.parentService ? this.parentService.registeredMetaMap : this.rootRegisteredMetaMap;
            },
            enumerable: true,
            configurable: true
        });
        // Register a modal to listen its open/close
        // Register a modal to listen its open/close
        /**
         * @param {?} modalRef
         * @return {?}
         */
        McModalControlService.prototype.registerModal = 
        // Register a modal to listen its open/close
        /**
         * @param {?} modalRef
         * @return {?}
         */
        function (modalRef) {
            var _this = this;
            if (!this.hasRegistered(modalRef)) {
                /** @type {?} */
                var afterOpenSubscription = modalRef.afterOpen.subscribe((/**
                 * @return {?}
                 */
                function () { return _this.openModals.push(modalRef); }));
                /** @type {?} */
                var afterCloseSubscription = modalRef.afterClose.subscribe((/**
                 * @return {?}
                 */
                function () { return _this.removeOpenModal(modalRef); }));
                this.registeredMetaMap.set(modalRef, { modalRef: modalRef, afterOpenSubscription: afterOpenSubscription, afterCloseSubscription: afterCloseSubscription });
            }
        };
        /**
         * @param {?} modalRef
         * @return {?}
         */
        McModalControlService.prototype.hasRegistered = /**
         * @param {?} modalRef
         * @return {?}
         */
        function (modalRef) {
            return this.registeredMetaMap.has(modalRef);
        };
        // Close all registered opened modals
        // Close all registered opened modals
        /**
         * @return {?}
         */
        McModalControlService.prototype.closeAll = 
        // Close all registered opened modals
        /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var i = this.openModals.length;
            while (i--) {
                this.openModals[i].close();
            }
        };
        /**
         * @private
         * @param {?} modalRef
         * @return {?}
         */
        McModalControlService.prototype.removeOpenModal = /**
         * @private
         * @param {?} modalRef
         * @return {?}
         */
        function (modalRef) {
            /** @type {?} */
            var index = this.openModals.indexOf(modalRef);
            if (index > -1) {
                this.openModals.splice(index, 1);
                if (!this.openModals.length) {
                    this.afterAllClose.next();
                }
            }
        };
        McModalControlService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        McModalControlService.ctorParameters = function () { return [
            { type: McModalControlService, decorators: [{ type: core.Optional }, { type: core.SkipSelf }] }
        ]; };
        return McModalControlService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        McModalControlService.prototype.rootOpenModals;
        /**
         * @type {?}
         * @private
         */
        McModalControlService.prototype.rootAfterAllClose;
        /**
         * @type {?}
         * @private
         */
        McModalControlService.prototype.rootRegisteredMetaMap;
        /**
         * @type {?}
         * @private
         */
        McModalControlService.prototype.parentService;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: modal-ref.class.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * API class that public to users to handle the modal instance.
     * McModalRef is aim to avoid accessing to the modal instance directly by users.
     * @abstract
     * @template T, R
     */
    // tslint:disable-next-line:naming-convention
    var   /**
     * API class that public to users to handle the modal instance.
     * McModalRef is aim to avoid accessing to the modal instance directly by users.
     * @abstract
     * @template T, R
     */
    // tslint:disable-next-line:naming-convention
    McModalRef = /** @class */ (function () {
        function McModalRef() {
        }
        return McModalRef;
    }());
    if (false) {
        /** @type {?} */
        McModalRef.prototype.afterOpen;
        /** @type {?} */
        McModalRef.prototype.afterClose;
        /**
         * @abstract
         * @return {?}
         */
        McModalRef.prototype.open = function () { };
        /**
         * @abstract
         * @param {?=} result
         * @return {?}
         */
        McModalRef.prototype.close = function (result) { };
        /**
         * @abstract
         * @param {?=} result
         * @return {?}
         */
        McModalRef.prototype.destroy = function (result) { };
        /**
         * Trigger the mcOnOk/mcOnCancel by manual
         * @abstract
         * @return {?}
         */
        McModalRef.prototype.triggerOk = function () { };
        /**
         * @abstract
         * @return {?}
         */
        McModalRef.prototype.triggerCancel = function () { };
        /**
         * Return the component instance of mcContent when specify mcContent as a Component
         * Note: this method may return undefined if the Component has not ready yet.
         * (it only available after Modal's ngOnInit)
         * @abstract
         * @return {?}
         */
        McModalRef.prototype.getContentComponent = function () { };
        /**
         * Get the dom element of this Modal
         * @abstract
         * @return {?}
         */
        McModalRef.prototype.getElement = function () { };
        /**
         * Get the instance of the Modal itself
         * @abstract
         * @return {?}
         */
        McModalRef.prototype.getInstance = function () { };
        /**
         * Call markForCheck for change detector
         * @abstract
         * @return {?}
         */
        McModalRef.prototype.markForCheck = function () { };
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: modal-util.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function IClickPosition() { }
    if (false) {
        /** @type {?} */
        IClickPosition.prototype.x;
        /** @type {?} */
        IClickPosition.prototype.y;
    }
    var ModalUtil = /** @class */ (function () {
        function ModalUtil(document) {
            this.document = document;
            this.lastPosition = { x: -1, y: -1 };
            this.listenDocumentClick();
        }
        /**
         * @return {?}
         */
        ModalUtil.prototype.getLastClickPosition = /**
         * @return {?}
         */
        function () {
            return this.lastPosition;
        };
        /**
         * @return {?}
         */
        ModalUtil.prototype.listenDocumentClick = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.document.addEventListener('click', (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                _this.lastPosition = { x: event.clientX, y: event.clientY };
            }));
        };
        return ModalUtil;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        ModalUtil.prototype.lastPosition;
        /**
         * @type {?}
         * @private
         */
        ModalUtil.prototype.document;
    }
    /** @type {?} */
    var modalUtilObject = new ModalUtil(document);

    /**
     * @fileoverview added by tsickle
     * Generated from: modal.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // Duration when perform animations (ms)
    /** @type {?} */
    var MODAL_ANIMATE_DURATION = 200;
    /**
     * @template T, R
     */
    var McModalComponent = /** @class */ (function (_super) {
        __extends(McModalComponent, _super);
        function McModalComponent(overlay, renderer, cfr, elementRef, viewContainer, modalControl, changeDetector, document) {
            var _this = _super.call(this) || this;
            _this.overlay = overlay;
            _this.renderer = renderer;
            _this.cfr = cfr;
            _this.elementRef = elementRef;
            _this.viewContainer = viewContainer;
            _this.modalControl = modalControl;
            _this.changeDetector = changeDetector;
            _this.document = document;
            _this.mcModalType = 'default';
            _this._mcVisible = false;
            _this.mcVisibleChange = new core.EventEmitter();
            _this.mcZIndex = 1000;
            _this.mcWidth = 480;
            _this.mcCloseByESC = true;
            _this._mcClosable = true;
            _this._mcMask = true;
            _this._mcMaskClosable = false;
            // Trigger when modal open(visible) after animations
            _this.mcAfterOpen = new core.EventEmitter();
            // Trigger when modal leave-animation over
            _this.mcAfterClose = new core.EventEmitter();
            _this.mcOkType = 'primary';
            _this._mcOkLoading = false;
            _this.mcOnOk = new core.EventEmitter();
            _this._mcCancelLoading = false;
            _this.mcOnCancel = new core.EventEmitter();
            // The origin point that animation based on
            _this.transformOrigin = '0px 0px 0px';
            _this.mcGetContainer = (/**
             * @return {?}
             */
            function () { return _this.overlay.create(); });
            return _this;
        }
        Object.defineProperty(McModalComponent.prototype, "mcVisible", {
            get: /**
             * @return {?}
             */
            function () { return this._mcVisible; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._mcVisible = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McModalComponent.prototype, "mcClosable", {
            get: /**
             * @return {?}
             */
            function () { return this._mcClosable; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._mcClosable = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McModalComponent.prototype, "mcMask", {
            get: /**
             * @return {?}
             */
            function () { return this._mcMask; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._mcMask = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McModalComponent.prototype, "mcMaskClosable", {
            get: /**
             * @return {?}
             */
            function () { return this._mcMaskClosable; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._mcMaskClosable = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McModalComponent.prototype, "mcOkLoading", {
            get: /**
             * @return {?}
             */
            function () { return this._mcOkLoading; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._mcOkLoading = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McModalComponent.prototype, "mcCancelLoading", {
            get: /**
             * @return {?}
             */
            function () { return this._mcCancelLoading; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._mcCancelLoading = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McModalComponent.prototype, "afterOpen", {
            // Observable alias for mcAfterOpen
            get: 
            // Observable alias for mcAfterOpen
            /**
             * @return {?}
             */
            function () {
                return this.mcAfterOpen.asObservable();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McModalComponent.prototype, "afterClose", {
            // Observable alias for mcAfterClose
            get: 
            // Observable alias for mcAfterClose
            /**
             * @return {?}
             */
            function () {
                return this.mcAfterClose.asObservable();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McModalComponent.prototype, "okText", {
            get: /**
             * @return {?}
             */
            function () {
                return this.mcOkText;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McModalComponent.prototype, "cancelText", {
            get: /**
             * @return {?}
             */
            function () {
                return this.mcCancelText;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McModalComponent.prototype, "hidden", {
            // Indicate whether this dialog should hidden
            get: 
            // Indicate whether this dialog should hidden
            /**
             * @return {?}
             */
            function () {
                return !this.mcVisible && !this.animationState;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        McModalComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            // Create component along without View
            if (this.isComponent(this.mcContent)) {
                this.createDynamicComponent((/** @type {?} */ (this.mcContent)));
            }
            // Setup default button options
            if (this.isModalButtons(this.mcFooter)) {
                this.mcFooter = this.formatModalButtons((/** @type {?} */ (this.mcFooter)));
            }
            if (this.isComponent(this.mcComponent)) {
                this.createDynamicComponent(this.mcComponent);
            }
            // Place the modal dom to elsewhere
            this.container = typeof this.mcGetContainer === 'function' ? this.mcGetContainer() : this.mcGetContainer;
            if (this.container instanceof HTMLElement) {
                this.container.appendChild(this.elementRef.nativeElement);
            }
            else if (this.container instanceof overlay.OverlayRef) {
                // NOTE: only attach the dom to overlay, the view container is not changed actually
                this.container.overlayElement.appendChild(this.elementRef.nativeElement);
            }
            // Register modal when afterOpen/afterClose is stable
            this.modalControl.registerModal(this);
        };
        // [NOTE] NOT available when using by service!
        // Because ngOnChanges never be called when using by service,
        // here we can't support "mcContent"(Component) etc. as inputs that initialized dynamically.
        // BUT: User also can change "mcContent" dynamically to trigger UI changes
        // (provided you don't use Component that needs initializations)
        // [NOTE] NOT available when using by service!
        // Because ngOnChanges never be called when using by service,
        // here we can't support "mcContent"(Component) etc. as inputs that initialized dynamically.
        // BUT: User also can change "mcContent" dynamically to trigger UI changes
        // (provided you don't use Component that needs initializations)
        /**
         * @param {?} changes
         * @return {?}
         */
        McModalComponent.prototype.ngOnChanges = 
        // [NOTE] NOT available when using by service!
        // Because ngOnChanges never be called when using by service,
        // here we can't support "mcContent"(Component) etc. as inputs that initialized dynamically.
        // BUT: User also can change "mcContent" dynamically to trigger UI changes
        // (provided you don't use Component that needs initializations)
        /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.mcVisible) {
                // Do not trigger animation while initializing
                this.handleVisibleStateChange(this.mcVisible, !changes.mcVisible.firstChange);
            }
        };
        /**
         * @return {?}
         */
        McModalComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var e_1, _a;
            // If using Component, it is the time to attach View while bodyContainer is ready
            if (this.contentComponentRef) {
                this.bodyContainer.insert(this.contentComponentRef.hostView);
            }
            try {
                for (var _b = __values(this.autoFocusedButtons.toArray()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var autoFocusedButton = _c.value;
                    if (autoFocusedButton.nativeElement.autofocus) {
                        ((/** @type {?} */ (autoFocusedButton.nativeElement))).focus();
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        /**
         * @return {?}
         */
        McModalComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            if (this.container instanceof overlay.OverlayRef) {
                this.container.dispose();
            }
        };
        /**
         * @return {?}
         */
        McModalComponent.prototype.open = /**
         * @return {?}
         */
        function () {
            this.changeVisibleFromInside(true);
        };
        /**
         * @param {?=} result
         * @return {?}
         */
        McModalComponent.prototype.close = /**
         * @param {?=} result
         * @return {?}
         */
        function (result) {
            this.changeVisibleFromInside(false, result);
        };
        // Destroy equals Close
        // Destroy equals Close
        /**
         * @param {?=} result
         * @return {?}
         */
        McModalComponent.prototype.destroy = 
        // Destroy equals Close
        /**
         * @param {?=} result
         * @return {?}
         */
        function (result) {
            this.close(result);
        };
        /**
         * @return {?}
         */
        McModalComponent.prototype.markForCheck = /**
         * @return {?}
         */
        function () {
            this.changeDetector.markForCheck();
        };
        /**
         * @return {?}
         */
        McModalComponent.prototype.triggerOk = /**
         * @return {?}
         */
        function () {
            this.onClickOkCancel('ok');
        };
        /**
         * @return {?}
         */
        McModalComponent.prototype.triggerCancel = /**
         * @return {?}
         */
        function () {
            this.onClickOkCancel('cancel');
        };
        /**
         * @return {?}
         */
        McModalComponent.prototype.getInstance = /**
         * @return {?}
         */
        function () {
            return this;
        };
        /**
         * @return {?}
         */
        McModalComponent.prototype.getContentComponentRef = /**
         * @return {?}
         */
        function () {
            return this.contentComponentRef;
        };
        /**
         * @return {?}
         */
        McModalComponent.prototype.getContentComponent = /**
         * @return {?}
         */
        function () {
            return this.contentComponentRef && this.contentComponentRef.instance;
        };
        /**
         * @return {?}
         */
        McModalComponent.prototype.getElement = /**
         * @return {?}
         */
        function () {
            return this.elementRef && this.elementRef.nativeElement;
        };
        /**
         * @param {?} $event
         * @return {?}
         */
        McModalComponent.prototype.onClickMask = /**
         * @param {?} $event
         * @return {?}
         */
        function ($event) {
            if (this.mcMask &&
                this.mcMaskClosable &&
                ((/** @type {?} */ ($event.target))).classList.contains('mc-modal-wrap') &&
                this.mcVisible) {
                this.onClickOkCancel('cancel');
            }
        };
        // tslint:disable-next-line: no-reserved-keywords
        // tslint:disable-next-line: no-reserved-keywords
        /**
         * @param {?} type
         * @return {?}
         */
        McModalComponent.prototype.isModalType = 
        // tslint:disable-next-line: no-reserved-keywords
        /**
         * @param {?} type
         * @return {?}
         */
        function (type) {
            return this.mcModalType === type;
        };
        /**
         * @param {?} event
         * @return {?}
         */
        McModalComponent.prototype.onKeyDown = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // tslint:disable-next-line:deprecation .key isn't supported in Edge
            if (event.keyCode === keycodes.ESCAPE && this.container && (this.container instanceof overlay.OverlayRef)) {
                this.close();
                event.preventDefault();
            }
        };
        // AoT
        // AoT
        /**
         * @return {?}
         */
        McModalComponent.prototype.onClickCloseBtn = 
        // AoT
        /**
         * @return {?}
         */
        function () {
            if (this.mcVisible) {
                this.onClickOkCancel('cancel');
            }
        };
        // AoT
        // tslint:disable-next-line: no-reserved-keywords
        // AoT
        // tslint:disable-next-line: no-reserved-keywords
        /**
         * @param {?} type
         * @return {?}
         */
        McModalComponent.prototype.onClickOkCancel = 
        // AoT
        // tslint:disable-next-line: no-reserved-keywords
        /**
         * @param {?} type
         * @return {?}
         */
        function (type) {
            var _this = this;
            /** @type {?} */
            var trigger = { ok: this.mcOnOk, cancel: this.mcOnCancel }[type];
            /** @type {?} */
            var loadingKey = { ok: 'mcOkLoading', cancel: 'mcCancelLoading' }[type];
            if (trigger instanceof core.EventEmitter) {
                trigger.emit(this.getContentComponent());
            }
            else if (typeof trigger === 'function') {
                /** @type {?} */
                var result = trigger(this.getContentComponent());
                // Users can return "false" to prevent closing by default
                /** @type {?} */
                var caseClose_1 = (/**
                 * @param {?} doClose
                 * @return {?}
                 */
                function (doClose) { return (doClose !== false) && _this.close((/** @type {?} */ (doClose))); });
                if (isPromise(result)) {
                    this[loadingKey] = true;
                    /** @type {?} */
                    var handleThen = (/**
                     * @param {?} doClose
                     * @return {?}
                     */
                    function (doClose) {
                        _this[loadingKey] = false;
                        caseClose_1(doClose);
                    });
                    ((/** @type {?} */ (result))).then(handleThen).catch(handleThen);
                }
                else {
                    caseClose_1(result);
                }
            }
        };
        // AoT
        // AoT
        /**
         * @param {?} value
         * @return {?}
         */
        McModalComponent.prototype.isNonEmptyString = 
        // AoT
        /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return typeof value === 'string' && value !== '';
        };
        // AoT
        // AoT
        /**
         * @param {?} value
         * @return {?}
         */
        McModalComponent.prototype.isTemplateRef = 
        // AoT
        /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return value instanceof core.TemplateRef;
        };
        // AoT
        // AoT
        /**
         * @param {?} value
         * @return {?}
         */
        McModalComponent.prototype.isComponent = 
        // AoT
        /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return value instanceof core.Type;
        };
        // AoT
        // AoT
        /**
         * @param {?} value
         * @return {?}
         */
        McModalComponent.prototype.isModalButtons = 
        // AoT
        /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return Array.isArray(value) && value.length > 0;
        };
        // Lookup a button's property, if the prop is a function, call & then return the result, otherwise, return itself.
        // AoT
        // Lookup a button's property, if the prop is a function, call & then return the result, otherwise, return itself.
        // AoT
        /**
         * @param {?} options
         * @param {?} prop
         * @return {?}
         */
        McModalComponent.prototype.getButtonCallableProp = 
        // Lookup a button's property, if the prop is a function, call & then return the result, otherwise, return itself.
        // AoT
        /**
         * @param {?} options
         * @param {?} prop
         * @return {?}
         */
        function (options, prop) {
            /** @type {?} */
            var value = options[prop];
            /** @type {?} */
            var args = [];
            if (this.contentComponentRef) {
                args.push(this.contentComponentRef.instance);
            }
            return typeof value === 'function' ? value.apply(options, args) : value;
        };
        // On mcFooter's modal button click
        // AoT
        // On mcFooter's modal button click
        // AoT
        /**
         * @param {?} button
         * @return {?}
         */
        McModalComponent.prototype.onButtonClick = 
        // On mcFooter's modal button click
        // AoT
        /**
         * @param {?} button
         * @return {?}
         */
        function (button) {
            // Call onClick directly
            // tslint:disable-next-line:no-inferred-empty-object-type  rule seems to be broken
            /** @type {?} */
            var result = this.getButtonCallableProp(button, 'onClick');
            if (isPromise(result)) {
                button.loading = true;
                ((/** @type {?} */ (result))).then((/**
                 * @return {?}
                 */
                function () { return button.loading = false; })).catch((/**
                 * @return {?}
                 */
                function () { return button.loading = false; }));
            }
        };
        // Do rest things when visible state changed
        // Do rest things when visible state changed
        /**
         * @private
         * @param {?} visible
         * @param {?=} animation
         * @param {?=} closeResult
         * @return {?}
         */
        McModalComponent.prototype.handleVisibleStateChange = 
        // Do rest things when visible state changed
        /**
         * @private
         * @param {?} visible
         * @param {?=} animation
         * @param {?=} closeResult
         * @return {?}
         */
        function (visible, animation, closeResult) {
            var _this = this;
            if (animation === void 0) { animation = true; }
            // Hide scrollbar at the first time when shown up
            if (visible) {
                this.changeBodyOverflow(1);
            }
            return Promise
                .resolve(animation && this.animateTo(visible))
                // Emit open/close event after animations over
                .then((/**
             * @return {?}
             */
            function () {
                if (visible) {
                    _this.mcAfterOpen.emit();
                }
                else {
                    _this.mcAfterClose.emit(closeResult);
                    // Show/hide scrollbar when animation is over
                    _this.changeBodyOverflow();
                }
            }));
        };
        // Change mcVisible from inside
        // Change mcVisible from inside
        /**
         * @private
         * @param {?} visible
         * @param {?=} closeResult
         * @return {?}
         */
        McModalComponent.prototype.changeVisibleFromInside = 
        // Change mcVisible from inside
        /**
         * @private
         * @param {?} visible
         * @param {?=} closeResult
         * @return {?}
         */
        function (visible, closeResult) {
            if (this.mcVisible !== visible) {
                // Change mcVisible value immediately
                this.mcVisible = visible;
                this.mcVisibleChange.emit(visible);
                return this.handleVisibleStateChange(visible, true, closeResult);
            }
            return Promise.resolve();
        };
        /**
         * @private
         * @param {?} state
         * @return {?}
         */
        McModalComponent.prototype.changeAnimationState = /**
         * @private
         * @param {?} state
         * @return {?}
         */
        function (state) {
            var _a, _b;
            this.animationState = state;
            if (state) {
                this.maskAnimationClassMap = (_a = {},
                    _a["fade-" + state] = true,
                    _a["fade-" + state + "-active"] = true,
                    _a);
                this.modalAnimationClassMap = (_b = {},
                    _b["zoom-" + state] = true,
                    _b["zoom-" + state + "-active"] = true,
                    _b);
            }
            else {
                // @ts-ignore
                this.maskAnimationClassMap = this.modalAnimationClassMap = null;
            }
            if (this.contentComponentRef) {
                this.contentComponentRef.changeDetectorRef.markForCheck();
            }
            else {
                this.changeDetector.markForCheck();
            }
        };
        /**
         * @private
         * @param {?} isVisible
         * @return {?}
         */
        McModalComponent.prototype.animateTo = /**
         * @private
         * @param {?} isVisible
         * @return {?}
         */
        function (isVisible) {
            var _this = this;
            // Figure out the lastest click position when shows up
            if (isVisible) {
                // [NOTE] Using timeout due to the document.click event is fired later than visible change,
                // so if not postponed to next event-loop, we can't get the lastest click position
                window.setTimeout((/**
                 * @return {?}
                 */
                function () { return _this.updateTransformOrigin(); }));
            }
            this.changeAnimationState(isVisible ? 'enter' : 'leave');
            // Return when animation is over
            return new Promise((/**
             * @param {?} resolve
             * @return {?}
             */
            function (resolve) { return window.setTimeout((/**
             * @return {?}
             */
            function () {
                _this.changeAnimationState(null);
                resolve();
            }), MODAL_ANIMATE_DURATION); }));
        };
        /**
         * @private
         * @param {?} buttons
         * @return {?}
         */
        McModalComponent.prototype.formatModalButtons = /**
         * @private
         * @param {?} buttons
         * @return {?}
         */
        function (buttons) {
            return buttons.map((/**
             * @param {?} button
             * @return {?}
             */
            function (button) {
                return __assign({
                    type: 'default',
                    size: 'default',
                    autoLoading: true,
                    show: true,
                    loading: false,
                    disabled: false
                }, button);
            }));
        };
        /**
         * Create a component dynamically but not attach to any View
         * (this action will be executed when bodyContainer is ready)
         * @param component Component class
         */
        /**
         * Create a component dynamically but not attach to any View
         * (this action will be executed when bodyContainer is ready)
         * @private
         * @param {?} component Component class
         * @return {?}
         */
        McModalComponent.prototype.createDynamicComponent = /**
         * Create a component dynamically but not attach to any View
         * (this action will be executed when bodyContainer is ready)
         * @private
         * @param {?} component Component class
         * @return {?}
         */
        function (component) {
            /** @type {?} */
            var factory = this.cfr.resolveComponentFactory(component);
            /** @type {?} */
            var childInjector = core.Injector.create({
                providers: [{ provide: McModalRef, useValue: this }],
                parent: this.viewContainer.injector
            });
            this.contentComponentRef = factory.create(childInjector);
            if (this.mcComponentParams) {
                Object.assign(this.contentComponentRef.instance, this.mcComponentParams);
            }
            // Do the first change detection immediately
            // (or we do detection at ngAfterViewInit, multi-changes error will be thrown)
            this.contentComponentRef.changeDetectorRef.detectChanges();
        };
        // Update transform-origin to the last click position on document
        // Update transform-origin to the last click position on document
        /**
         * @private
         * @return {?}
         */
        McModalComponent.prototype.updateTransformOrigin = 
        // Update transform-origin to the last click position on document
        /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var modalElement = (/** @type {?} */ (this.modalContainer.nativeElement));
            /** @type {?} */
            var lastPosition = modalUtilObject.getLastClickPosition();
            if (lastPosition) {
                this.transformOrigin = lastPosition.x - modalElement.offsetLeft + "px " + (lastPosition.y - modalElement.offsetTop) + "px 0px";
            }
        };
        /**
         * Take care of the body's overflow to decide the existense of scrollbar
         * @param plusNum The number that the openModals.length will increase soon
         */
        /**
         * Take care of the body's overflow to decide the existense of scrollbar
         * @private
         * @param {?=} plusNum The number that the openModals.length will increase soon
         * @return {?}
         */
        McModalComponent.prototype.changeBodyOverflow = /**
         * Take care of the body's overflow to decide the existense of scrollbar
         * @private
         * @param {?=} plusNum The number that the openModals.length will increase soon
         * @return {?}
         */
        function (plusNum) {
            if (plusNum === void 0) { plusNum = 0; }
            /** @type {?} */
            var openModals = this.modalControl.openModals;
            if (openModals.length + plusNum > 0) {
                this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
            }
            else {
                this.renderer.removeStyle(this.document.body, 'overflow');
            }
        };
        McModalComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mc-modal',
                        template: "<!-- Compatible: the <ng-content> can appear only once -->\n<ng-template #tplOriginContent>\n    <ng-content></ng-content>\n</ng-template>\n\n<div>\n    <div *ngIf=\"mcMask\"\n         class=\"mc-modal-mask\"\n         [ngClass]=\"maskAnimationClassMap\"\n         [class.mc-modal-mask-hidden]=\"hidden\"\n         [ngStyle]=\"mcMaskStyle\"\n         [style.zIndex]=\"mcZIndex\"\n    ></div>\n    <div\n        (mousedown)=\"onClickMask($event)\"\n        class=\"mc-modal-wrap {{ mcWrapClassName }}\"\n        [style.zIndex]=\"mcZIndex\"\n        [style.display]=\"hidden ? 'none' : ''\"\n        tabindex=\"-1\"\n        role=\"dialog\"\n    >\n        <div #modalContainer\n             class=\"mc-modal {{ mcClassName }}\"\n             [ngClass]=\"modalAnimationClassMap\"\n             [ngStyle]=\"mcStyle\"\n             [style.width]=\"mcWidth | toCssUnit\"\n             [style.transform-origin]=\"transformOrigin\"\n             role=\"document\"\n        >\n            <div class=\"mc-modal-content\" cdkTrapFocus>\n                <button *ngIf=\"mcClosable\"\n                        mc-button\n                        (click)=\"onClickCloseBtn()\"\n                        class=\"mc-modal-close mc-button_transparent\"\n                        aria-label=\"Close\">\n                    <i mc-icon=\"mc-close-L_16\" class=\"mc-icon mc-icon_light\" color=\"second\"></i>\n                </button>\n                <ng-container [ngSwitch]=\"true\">\n                    <ng-container *ngSwitchCase=\"isModalType('default')\"\n                                  [ngTemplateOutlet]=\"tplContentDefault\"></ng-container>\n                    <ng-container *ngSwitchCase=\"isModalType('confirm')\"\n                                  [ngTemplateOutlet]=\"tplContentConfirm\"></ng-container>\n                    <ng-container *ngSwitchCase=\"isModalType('custom')\"\n                                  [ngTemplateOutlet]=\"tplContentCustom\"></ng-container>\n                </ng-container>\n            </div>\n        </div>\n    </div>\n</div>\n\n<ng-template #tplContentCustom>\n    <ng-container #bodyContainer></ng-container>\n</ng-template>\n\n\n<!-- [Predefined] Default Modal Content -->\n<ng-template #tplContentDefault>\n    <div *ngIf=\"mcTitle\" class=\"mc-modal-header\">\n        <div class=\"mc-modal-title\">\n            <ng-container [ngSwitch]=\"true\">\n                <ng-container *ngSwitchCase=\"isTemplateRef(mcTitle)\" [ngTemplateOutlet]=\"mcTitle\"></ng-container>\n                <ng-container *ngSwitchCase=\"isNonEmptyString(mcTitle)\">\n                    <div [innerHTML]=\"mcTitle\"></div>\n                </ng-container>\n            </ng-container>\n        </div>\n    </div>\n    <div class=\"mc-modal-body\" [ngStyle]=\"mcBodyStyle\">\n        <ng-container #bodyContainer>\n            <ng-container *ngIf=\"!isComponent(mcContent)\" [ngSwitch]=\"true\">\n                <ng-container *ngSwitchCase=\"isTemplateRef(mcContent)\" [ngTemplateOutlet]=\"mcContent\"></ng-container>\n                <ng-container *ngSwitchCase=\"isNonEmptyString(mcContent)\">\n                    <div [innerHTML]=\"mcContent\"></div>\n                </ng-container>\n                <ng-container *ngSwitchDefault [ngTemplateOutlet]=\"tplOriginContent\"></ng-container>\n            </ng-container>\n        </ng-container>\n    </div>\n    <div *ngIf=\"mcFooter !== null\" class=\"mc-modal-footer\">\n        <ng-container [ngSwitch]=\"true\">\n            <ng-container *ngSwitchCase=\"isTemplateRef(mcFooter)\" [ngTemplateOutlet]=\"mcFooter\"></ng-container>\n            <ng-container *ngSwitchCase=\"isNonEmptyString(mcFooter)\">\n                <div [innerHTML]=\"mcFooter\"></div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"isModalButtons(mcFooter)\">\n                <ng-container *ngFor=\"let button of mcFooter\">\n                    <button\n                        mc-button\n                        #autoFocusedButton\n                        [attr.autofocus]=\"button.autoFocus\"\n                        *ngIf=\"getButtonCallableProp(button, 'show')\"\n                        [disabled]=\"getButtonCallableProp(button, 'disabled')\"\n                        [class.mc-progress]=\"getButtonCallableProp(button, 'loading')\"\n                        (click)=\"onButtonClick(button)\"\n                        [color]=\"button.type\">\n                        {{ button.label }}\n                    </button>\n                </ng-container>\n            </ng-container>\n            <ng-container *ngSwitchDefault>\n                <button\n                    #autoFocusedButton\n                    [attr.autofocus]=\"true\"\n                    *ngIf=\"mcOkText !== null\"\n                    mc-button\n                    color=\"primary\"\n                    (click)=\"onClickOkCancel('ok')\">\n\n                    {{ okText }}\n                </button>\n                <button *ngIf=\"mcCancelText!==null\" mc-button (click)=\"onClickOkCancel('cancel')\">\n                    {{ cancelText }}\n                </button>\n            </ng-container>\n        </ng-container>\n    </div>\n</ng-template>\n<!-- /[Predefined] Default Modal Content -->\n\n<!-- [Predefined] Confirm Modal Content -->\n<ng-template #tplContentConfirm>\n    <div class=\"mc-modal-body\" [ngStyle]=\"mcBodyStyle\">\n        <div class=\"mc-confirm-body-wrapper\">\n            <div class=\"mc-confirm-body\">\n                <div class=\"mc-confirm-content\">\n                    <ng-container #bodyContainer>\n                        <ng-container *ngIf=\"!isComponent(mcContent)\" [ngSwitch]=\"true\">\n                            <ng-container *ngSwitchCase=\"isTemplateRef(mcContent)\"\n                                          [ngTemplateOutlet]=\"mcContent\"></ng-container>\n                            <ng-container *ngSwitchCase=\"isNonEmptyString(mcContent)\">\n                                <div [innerHTML]=\"mcContent\"></div>\n                            </ng-container>\n                            <ng-container *ngSwitchDefault [ngTemplateOutlet]=\"tplOriginContent\"></ng-container>\n                        </ng-container>\n                    </ng-container>\n                </div>\n            </div>\n        </div> <!-- /.mc-confirm-body-wrapper -->\n    </div>\n    <div class=\"mc-confirm-btns\">\n        <button\n            mc-button\n            #autoFocusedButton\n            [color]=\"mcOkType\"\n            [attr.autofocus]=\"true\"\n            *ngIf=\"mcOkText !== ''\"\n            (click)=\"onClickOkCancel('ok')\">\n\n            {{ okText }}\n        </button>\n        <button mc-button color=\"second\" *ngIf=\"mcCancelText!==''\" (click)=\"onClickOkCancel('cancel')\">\n            {{ cancelText }}\n        </button>\n    </div>\n</ng-template>\n<!-- /[Predefined] Confirm Modal Content -->\n",
                        encapsulation: core.ViewEncapsulation.None,
                        host: {
                            '(keydown)': 'onKeyDown($event)'
                        },
                        styles: ["@-webkit-keyframes mcFadeIn{0%{opacity:0}100%{opacity:1}}@keyframes mcFadeIn{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes mcFadeOut{0%{opacity:1}100%{opacity:0}}@keyframes mcFadeOut{0%{opacity:1}100%{opacity:0}}@-webkit-keyframes mcZoomIn{0%{opacity:0;transform:translate(0,-25%)}100%{opacity:1;transform:scale(1)}}@keyframes mcZoomIn{0%{opacity:0;transform:translate(0,-25%)}100%{opacity:1;transform:scale(1)}}@-webkit-keyframes mcZoomOut{0%{transform:scale(1)}100%{opacity:0;transform:translate(0,-30%)}}@keyframes mcZoomOut{0%{transform:scale(1)}100%{opacity:0;transform:translate(0,-30%)}}.fade-appear,.fade-enter,.fade-leave{-webkit-animation-duration:.3s;animation-duration:.3s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-play-state:paused;animation-play-state:paused}.fade-appear.fade-appear-active,.fade-enter.fade-enter-active{-webkit-animation-name:mcFadeIn;animation-name:mcFadeIn;-webkit-animation-play-state:running;animation-play-state:running}.fade-leave.fade-leave-active{-webkit-animation-name:mcFadeOut;animation-name:mcFadeOut;-webkit-animation-play-state:running;animation-play-state:running;pointer-events:none}.className-appear,.className-enter{opacity:0;transform:translate(0,-25%);-webkit-animation-timing-function:cubic-bezier(.075,.82,.165,1);animation-timing-function:cubic-bezier(.075,.82,.165,1)}.zoom-appear,.zoom-enter,.zoom-leave{-webkit-animation-duration:.3s;animation-duration:.3s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-play-state:paused;animation-play-state:paused}.zoom-appear.zoom-appear-active,.zoom-enter.zoom-enter-active{-webkit-animation-name:mcZoomIn;animation-name:mcZoomIn;-webkit-animation-play-state:running;animation-play-state:running}.zoom-leave.zoom-leave-active{-webkit-animation-name:mcZoomOut;animation-name:mcZoomOut;-webkit-animation-play-state:running;animation-play-state:running;pointer-events:none}.className-leave{transform:translate(0,0);-webkit-animation-timing-function:cubic-bezier(.785,.135,.15,.86);animation-timing-function:cubic-bezier(.785,.135,.15,.86)}.mc-confirm .mc-modal-close,.mc-confirm .mc-modal-header{display:none}.mc-confirm .mc-modal-body{padding:24px}.mc-confirm-body-wrapper{zoom:1}.mc-confirm-body-wrapper:after,.mc-confirm-body-wrapper:before{content:\"\";display:table}.mc-confirm-body-wrapper:after{clear:both}.mc-confirm-body .mc-confirm-title{display:block;overflow:auto}.mc-confirm .mc-confirm-btns{border-radius:0 0 4px 4px;text-align:right}.mc-confirm .mc-confirm-btns button+button{margin:16px}.mc-modal{box-sizing:border-box;position:relative;top:48px;width:auto;margin:0 auto;padding:0 0 24px;list-style:none}.mc-modal.zoom-appear,.mc-modal.zoom-enter{-webkit-animation-duration:.3s;animation-duration:.3s;transform:none;opacity:0}.mc-modal .mc-modal-close{position:absolute;z-index:10;top:0;right:0;width:56px;height:56px}.mc-modal-wrap{position:fixed;z-index:1000;top:0;right:0;bottom:0;left:0;overflow:auto;-webkit-overflow-scrolling:touch;outline:0}.mc-modal-title{margin:0}.mc-modal-content{position:relative;border-radius:4px;background-clip:padding-box;background-color:#fff}.mc-modal-header{padding:14px 16px;display:block;border-radius:4px 4px 0 0}.mc-modal-body{display:block;padding:16px 24px 24px;max-height:calc(100vh - 260px);word-wrap:break-word;overflow-y:auto}.mc-modal-footer{display:block;padding:16px;border-radius:0 0 4px 4px;text-align:right}.mc-modal-footer button+button{margin-left:16px;margin-bottom:0}.mc-modal-mask{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0;height:100%;background-color:rgba(0,0,0,.5)}.mc-modal-mask.mc-modal-mask-hidden{display:none}.mc-modal-open{overflow:hidden}"]
                    }] }
        ];
        /** @nocollapse */
        McModalComponent.ctorParameters = function () { return [
            { type: overlay.Overlay },
            { type: core.Renderer2 },
            { type: core.ComponentFactoryResolver },
            { type: core.ElementRef },
            { type: core.ViewContainerRef },
            { type: McModalControlService },
            { type: core.ChangeDetectorRef },
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
        ]; };
        McModalComponent.propDecorators = {
            mcModalType: [{ type: core.Input }],
            mcComponent: [{ type: core.Input }],
            mcContent: [{ type: core.Input }],
            mcComponentParams: [{ type: core.Input }],
            mcFooter: [{ type: core.Input }],
            mcVisible: [{ type: core.Input }],
            mcVisibleChange: [{ type: core.Output }],
            mcZIndex: [{ type: core.Input }],
            mcWidth: [{ type: core.Input }],
            mcWrapClassName: [{ type: core.Input }],
            mcClassName: [{ type: core.Input }],
            mcStyle: [{ type: core.Input }],
            mcTitle: [{ type: core.Input }],
            mcCloseByESC: [{ type: core.Input }],
            mcClosable: [{ type: core.Input }],
            mcMask: [{ type: core.Input }],
            mcMaskClosable: [{ type: core.Input }],
            mcMaskStyle: [{ type: core.Input }],
            mcBodyStyle: [{ type: core.Input }],
            mcAfterOpen: [{ type: core.Output }],
            mcAfterClose: [{ type: core.Output }],
            mcOkText: [{ type: core.Input }],
            mcOkType: [{ type: core.Input }],
            mcOkLoading: [{ type: core.Input }],
            mcOnOk: [{ type: core.Input }, { type: core.Output }],
            mcCancelText: [{ type: core.Input }],
            mcCancelLoading: [{ type: core.Input }],
            mcOnCancel: [{ type: core.Input }, { type: core.Output }],
            modalContainer: [{ type: core.ViewChild, args: ['modalContainer', { static: true },] }],
            bodyContainer: [{ type: core.ViewChild, args: ['bodyContainer', { read: core.ViewContainerRef, static: false },] }],
            autoFocusedButtons: [{ type: core.ViewChildren, args: ['autoFocusedButton', { read: core.ElementRef },] }],
            mcGetContainer: [{ type: core.Input }]
        };
        return McModalComponent;
    }(McModalRef));
    if (false) {
        /** @type {?} */
        McModalComponent.prototype.mcModalType;
        /** @type {?} */
        McModalComponent.prototype.mcComponent;
        /** @type {?} */
        McModalComponent.prototype.mcContent;
        /** @type {?} */
        McModalComponent.prototype.mcComponentParams;
        /** @type {?} */
        McModalComponent.prototype.mcFooter;
        /**
         * @type {?}
         * @private
         */
        McModalComponent.prototype._mcVisible;
        /** @type {?} */
        McModalComponent.prototype.mcVisibleChange;
        /** @type {?} */
        McModalComponent.prototype.mcZIndex;
        /** @type {?} */
        McModalComponent.prototype.mcWidth;
        /** @type {?} */
        McModalComponent.prototype.mcWrapClassName;
        /** @type {?} */
        McModalComponent.prototype.mcClassName;
        /** @type {?} */
        McModalComponent.prototype.mcStyle;
        /** @type {?} */
        McModalComponent.prototype.mcTitle;
        /** @type {?} */
        McModalComponent.prototype.mcCloseByESC;
        /**
         * @type {?}
         * @private
         */
        McModalComponent.prototype._mcClosable;
        /**
         * @type {?}
         * @private
         */
        McModalComponent.prototype._mcMask;
        /**
         * @type {?}
         * @private
         */
        McModalComponent.prototype._mcMaskClosable;
        /** @type {?} */
        McModalComponent.prototype.mcMaskStyle;
        /** @type {?} */
        McModalComponent.prototype.mcBodyStyle;
        /** @type {?} */
        McModalComponent.prototype.mcAfterOpen;
        /** @type {?} */
        McModalComponent.prototype.mcAfterClose;
        /** @type {?} */
        McModalComponent.prototype.mcOkText;
        /** @type {?} */
        McModalComponent.prototype.mcOkType;
        /**
         * @type {?}
         * @private
         */
        McModalComponent.prototype._mcOkLoading;
        /** @type {?} */
        McModalComponent.prototype.mcOnOk;
        /** @type {?} */
        McModalComponent.prototype.mcCancelText;
        /**
         * @type {?}
         * @private
         */
        McModalComponent.prototype._mcCancelLoading;
        /** @type {?} */
        McModalComponent.prototype.mcOnCancel;
        /** @type {?} */
        McModalComponent.prototype.modalContainer;
        /** @type {?} */
        McModalComponent.prototype.bodyContainer;
        /** @type {?} */
        McModalComponent.prototype.autoFocusedButtons;
        /** @type {?} */
        McModalComponent.prototype.maskAnimationClassMap;
        /** @type {?} */
        McModalComponent.prototype.modalAnimationClassMap;
        /** @type {?} */
        McModalComponent.prototype.transformOrigin;
        /**
         * @type {?}
         * @private
         */
        McModalComponent.prototype.contentComponentRef;
        /**
         * @type {?}
         * @private
         */
        McModalComponent.prototype.animationState;
        /**
         * @type {?}
         * @private
         */
        McModalComponent.prototype.container;
        /** @type {?} */
        McModalComponent.prototype.mcGetContainer;
        /**
         * @type {?}
         * @private
         */
        McModalComponent.prototype.overlay;
        /**
         * @type {?}
         * @private
         */
        McModalComponent.prototype.renderer;
        /**
         * @type {?}
         * @private
         */
        McModalComponent.prototype.cfr;
        /**
         * @type {?}
         * @private
         */
        McModalComponent.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        McModalComponent.prototype.viewContainer;
        /**
         * @type {?}
         * @private
         */
        McModalComponent.prototype.modalControl;
        /**
         * @type {?}
         * @private
         */
        McModalComponent.prototype.changeDetector;
        /**
         * @type {?}
         * @private
         */
        McModalComponent.prototype.document;
    }
    ////////////
    /**
     * @param {?} obj
     * @return {?}
     */
    function isPromise(obj) {
        // tslint:disable-next-line: no-unbound-method
        return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof ((/** @type {?} */ (obj))).then === 'function' && typeof ((/** @type {?} */ (obj))).catch === 'function';
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: css-unit.pipe.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CssUnitPipe = /** @class */ (function () {
        function CssUnitPipe() {
        }
        /**
         * @param {?} value
         * @param {?=} defaultUnit
         * @return {?}
         */
        CssUnitPipe.prototype.transform = /**
         * @param {?} value
         * @param {?=} defaultUnit
         * @return {?}
         */
        function (value, defaultUnit) {
            if (defaultUnit === void 0) { defaultUnit = 'px'; }
            /** @type {?} */
            var formatted = +value;
            return isNaN(formatted) ? "" + value : "" + formatted + defaultUnit;
        };
        CssUnitPipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'toCssUnit'
                    },] }
        ];
        return CssUnitPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: modal.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McModalTitle = /** @class */ (function () {
        function McModalTitle() {
        }
        McModalTitle.decorators = [
            { type: core.Directive, args: [{
                        selector: "[mc-modal-title], mc-modal-title, [mcModalTitle]",
                        host: {
                            class: 'mc-modal-header mc-modal-title'
                        }
                    },] }
        ];
        return McModalTitle;
    }());
    var McModalBody = /** @class */ (function () {
        function McModalBody() {
        }
        McModalBody.decorators = [
            { type: core.Directive, args: [{
                        selector: "[mc-modal-body], mc-modal-body, [mcModalBody]",
                        host: {
                            class: 'mc-modal-body'
                        }
                    },] }
        ];
        return McModalBody;
    }());
    var McModalFooter = /** @class */ (function () {
        function McModalFooter() {
        }
        McModalFooter.decorators = [
            { type: core.Directive, args: [{
                        selector: "[mc-modal-footer], mc-modal-footer, [mcModalFooter]",
                        host: {
                            class: 'mc-modal-footer'
                        }
                    },] }
        ];
        return McModalFooter;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: modal.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // A builder used for managing service creating modals
    var 
    // A builder used for managing service creating modals
    ModalBuilderForService = /** @class */ (function () {
        function ModalBuilderForService(overlay, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            this.overlay = overlay;
            this.createModal();
            if (!('mcGetContainer' in options)) {
                options.mcGetContainer = undefined;
            }
            this.changeProps(options);
            (/** @type {?} */ (this.modalRef)).instance.open();
            (/** @type {?} */ (this.modalRef)).instance.mcAfterClose.subscribe((/**
             * @return {?}
             */
            function () { return _this.destroyModal(); }));
            this.overlayRef.keydownEvents()
                // @ts-ignore
                .pipe(operators.filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                // tslint:disable-next-line:deprecation replacement .key isn't supported in Edge
                return event.keyCode === keycodes.ESCAPE && options.mcCloseByESC;
            })))
                .subscribe((/**
             * @return {?}
             */
            function () { return (/** @type {?} */ (_this.modalRef)).instance.close(); }));
        }
        /**
         * @return {?}
         */
        ModalBuilderForService.prototype.getInstance = /**
         * @return {?}
         */
        function () {
            return this.modalRef && this.modalRef.instance;
        };
        /**
         * @return {?}
         */
        ModalBuilderForService.prototype.destroyModal = /**
         * @return {?}
         */
        function () {
            if (this.modalRef) {
                this.overlayRef.dispose();
                this.modalRef = null;
            }
        };
        /**
         * @private
         * @param {?} options
         * @return {?}
         */
        ModalBuilderForService.prototype.changeProps = /**
         * @private
         * @param {?} options
         * @return {?}
         */
        function (options) {
            if (this.modalRef) {
                // here not limit user's inputs at runtime
                Object.assign(this.modalRef.instance, options);
            }
        };
        // Create component to ApplicationRef
        // Create component to ApplicationRef
        /**
         * @private
         * @return {?}
         */
        ModalBuilderForService.prototype.createModal = 
        // Create component to ApplicationRef
        /**
         * @private
         * @return {?}
         */
        function () {
            this.overlayRef = this.overlay.create();
            this.modalRef = this.overlayRef.attach(new portal.ComponentPortal(McModalComponent));
        };
        return ModalBuilderForService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        ModalBuilderForService.prototype.modalRef;
        /**
         * @type {?}
         * @private
         */
        ModalBuilderForService.prototype.overlayRef;
        /**
         * @type {?}
         * @private
         */
        ModalBuilderForService.prototype.overlay;
    }
    var McModalService = /** @class */ (function () {
        function McModalService(overlay, modalControl) {
            this.overlay = overlay;
            this.modalControl = modalControl;
        }
        Object.defineProperty(McModalService.prototype, "openModals", {
            // Track of the current close modals (we assume invisible is close this time)
            get: 
            // Track of the current close modals (we assume invisible is close this time)
            /**
             * @return {?}
             */
            function () {
                return this.modalControl.openModals;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McModalService.prototype, "afterAllClose", {
            get: /**
             * @return {?}
             */
            function () {
                return this.modalControl.afterAllClose.asObservable();
            },
            enumerable: true,
            configurable: true
        });
        // Closes all of the currently-open dialogs
        // Closes all of the currently-open dialogs
        /**
         * @return {?}
         */
        McModalService.prototype.closeAll = 
        // Closes all of the currently-open dialogs
        /**
         * @return {?}
         */
        function () {
            this.modalControl.closeAll();
        };
        /**
         * @template T
         * @param {?=} options
         * @return {?}
         */
        McModalService.prototype.create = /**
         * @template T
         * @param {?=} options
         * @return {?}
         */
        function (options) {
            if (options === void 0) { options = {}; }
            if (typeof options.mcOnCancel !== 'function') {
                // Leave a empty function to close this modal by default
                // tslint:disable-next-line
                options.mcOnCancel = (/**
                 * @return {?}
                 */
                function () { });
            }
            if (!('mcCloseByESC' in options)) {
                options.mcCloseByESC = true;
            }
            if (!('mcWidth' in options)) {
                // tslint:disable-next-line
                options.mcWidth = 480;
            }
            return (/** @type {?} */ (new ModalBuilderForService(this.overlay, options).getInstance()));
        };
        /**
         * @template T
         * @param {?=} options
         * @param {?=} confirmType
         * @return {?}
         */
        McModalService.prototype.confirm = /**
         * @template T
         * @param {?=} options
         * @param {?=} confirmType
         * @return {?}
         */
        function (options, confirmType) {
            if (options === void 0) { options = {}; }
            if (confirmType === void 0) { confirmType = 'confirm'; }
            if ('mcFooter' in options) {
                console.warn("The Confirm-Modal doesn't support \"mcFooter\", this property will be ignored.");
            }
            // NOTE: only support function currently by calling confirm()
            if (typeof options.mcOnOk !== 'function') {
                // Leave a empty function to close this modal by default
                // tslint:disable-next-line
                options.mcOnOk = (/**
                 * @return {?}
                 */
                function () { });
            }
            options.mcModalType = 'confirm';
            options.mcClassName = "mc-confirm mc-confirm-" + confirmType + " " + (options.mcClassName || '');
            return this.create(options);
        };
        /**
         * @template T
         * @param {?=} options
         * @return {?}
         */
        McModalService.prototype.open = /**
         * @template T
         * @param {?=} options
         * @return {?}
         */
        function (options) {
            if (options === void 0) { options = {}; }
            options.mcModalType = 'custom';
            return this.create(options);
        };
        /**
         * @template T
         * @param {?=} options
         * @return {?}
         */
        McModalService.prototype.success = /**
         * @template T
         * @param {?=} options
         * @return {?}
         */
        function (options) {
            if (options === void 0) { options = {}; }
            return this.simpleConfirm(options, 'success');
        };
        // tslint:disable-next-line: no-reserved-keywords
        // tslint:disable-next-line: no-reserved-keywords
        /**
         * @template T
         * @param {?=} options
         * @return {?}
         */
        McModalService.prototype.delete = 
        // tslint:disable-next-line: no-reserved-keywords
        /**
         * @template T
         * @param {?=} options
         * @return {?}
         */
        function (options) {
            if (options === void 0) { options = {}; }
            return this.simpleConfirm(options, 'warn');
        };
        /**
         * @private
         * @template T
         * @param {?=} options
         * @param {?=} confirmType
         * @return {?}
         */
        McModalService.prototype.simpleConfirm = /**
         * @private
         * @template T
         * @param {?=} options
         * @param {?=} confirmType
         * @return {?}
         */
        function (options, confirmType) {
            if (options === void 0) { options = {}; }
            // Remove the Cancel button if the user not specify a Cancel button
            if (!('mcCancelText' in options)) {
                // @ts-ignore
                options.mcCancelText = null;
            }
            return this.confirm(options, confirmType);
        };
        McModalService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        McModalService.ctorParameters = function () { return [
            { type: overlay.Overlay },
            { type: McModalControlService }
        ]; };
        return McModalService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        McModalService.prototype.overlay;
        /**
         * @type {?}
         * @private
         */
        McModalService.prototype.modalControl;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: modal.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McModalModule = /** @class */ (function () {
        function McModalModule() {
        }
        McModalModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, overlay.OverlayModule, a11y.A11yModule, button.McButtonModule, icon.McIconModule],
                        exports: [
                            McModalComponent,
                            McModalTitle,
                            McModalBody,
                            McModalFooter
                        ],
                        declarations: [
                            McModalComponent,
                            McModalTitle,
                            McModalBody,
                            McModalFooter,
                            CssUnitPipe
                        ],
                        entryComponents: [McModalComponent],
                        providers: [McModalControlService, McModalService]
                    },] }
        ];
        return McModalModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: modal.type.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     * @template T, R
     */
    function IModalOptions() { }
    if (false) {
        /** @type {?|undefined} */
        IModalOptions.prototype.mcModalType;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcVisible;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcZIndex;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcWidth;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcWrapClassName;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcClassName;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcStyle;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcTitle;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcContent;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcComponent;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcComponentParams;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcClosable;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcMask;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcMaskClosable;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcMaskStyle;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcBodyStyle;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcFooter;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcGetContainer;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcAfterOpen;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcAfterClose;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcCloseByESC;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcOkText;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcOkType;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcOkLoading;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcOnOk;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcCancelText;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcCancelLoading;
        /** @type {?|undefined} */
        IModalOptions.prototype.mcOnCancel;
    }
    /**
     * @record
     * @template T
     */
    function IModalOptionsForService() { }
    if (false) {
        /** @type {?|undefined} */
        IModalOptionsForService.prototype.mcOnOk;
        /** @type {?|undefined} */
        IModalOptionsForService.prototype.mcOnCancel;
    }
    /**
     * @record
     * @template T
     */
    function IModalButtonOptions() { }
    if (false) {
        /** @type {?} */
        IModalButtonOptions.prototype.label;
        /** @type {?|undefined} */
        IModalButtonOptions.prototype.type;
        /** @type {?|undefined} */
        IModalButtonOptions.prototype.shape;
        /** @type {?|undefined} */
        IModalButtonOptions.prototype.ghost;
        /** @type {?|undefined} */
        IModalButtonOptions.prototype.size;
        /** @type {?|undefined} */
        IModalButtonOptions.prototype.autoLoading;
        /** @type {?|undefined} */
        IModalButtonOptions.prototype.show;
        /** @type {?|undefined} */
        IModalButtonOptions.prototype.loading;
        /** @type {?|undefined} */
        IModalButtonOptions.prototype.disabled;
        /** @type {?|undefined} */
        IModalButtonOptions.prototype.autoFocus;
        /**
         * @this {?}
         * @param {?=} contentComponentInstance
         * @return {?}
         */
        IModalButtonOptions.prototype.onClick = function (contentComponentInstance) { };
    }

    exports.McModalComponent = McModalComponent;
    exports.McModalModule = McModalModule;
    exports.McModalRef = McModalRef;
    exports.McModalService = McModalService;
    exports.ɵa = McModalControlService;
    exports.ɵb = McModalTitle;
    exports.ɵc = McModalBody;
    exports.ɵd = McModalFooter;
    exports.ɵe = CssUnitPipe;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-modal.umd.js.map
