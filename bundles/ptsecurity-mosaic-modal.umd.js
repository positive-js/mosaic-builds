(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/overlay'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/cdk/keycodes'), require('rxjs'), require('@ptsecurity/mosaic/button'), require('@ptsecurity/mosaic/icon'), require('@angular/cdk/a11y'), require('@angular/cdk/portal'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/modal', ['exports', '@angular/cdk/overlay', '@angular/common', '@angular/core', '@ptsecurity/cdk/keycodes', 'rxjs', '@ptsecurity/mosaic/button', '@ptsecurity/mosaic/icon', '@angular/cdk/a11y', '@angular/cdk/portal', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.modal = {}), global.ng.cdk.overlay, global.ng.common, global.ng.core, global.mc.cdk.keycodes, global.rxjs, global.ptsecurity.mosaic.button, global.ptsecurity.mosaic.icon, global.ng.cdk.a11y, global.ng.cdk.portal, global.rxjs.operators));
}(this, (function (exports, i1, i5, i0, keycodes, rxjs, i3, i4, i6, portal, operators) { 'use strict';

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

    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i6__namespace = /*#__PURE__*/_interopNamespace(i6);

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
     * API class that public to users to handle the modal instance.
     * McModalRef is aim to avoid accessing to the modal instance directly by users.
     */
    // tslint:disable-next-line:naming-convention
    var McModalRef = /** @class */ (function () {
        function McModalRef() {
        }
        return McModalRef;
    }());

    var ModalUtil = /** @class */ (function () {
        function ModalUtil(document) {
            this.document = document;
            this.lastPosition = { x: -1, y: -1 };
            this.listenDocumentClick();
        }
        ModalUtil.prototype.getLastClickPosition = function () {
            return this.lastPosition;
        };
        ModalUtil.prototype.listenDocumentClick = function () {
            var _this = this;
            this.document.addEventListener('click', function (event) {
                _this.lastPosition = { x: event.clientX, y: event.clientY };
            });
        };
        return ModalUtil;
    }());
    var modalUtilObject = new ModalUtil(document);

    exports.ModalSize = void 0;
    (function (ModalSize) {
        ModalSize["Small"] = "small";
        ModalSize["Normal"] = "normal";
        ModalSize["Large"] = "large";
    })(exports.ModalSize || (exports.ModalSize = {}));

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
            get: function () {
                return this.parentService ? this.parentService.afterAllClose : this.rootAfterAllClose;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McModalControlService.prototype, "openModals", {
            // Track singleton openModals array through over the injection tree
            get: function () {
                return this.parentService ? this.parentService.openModals : this.rootOpenModals;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McModalControlService.prototype, "registeredMetaMap", {
            // Registered modal for later usage
            get: function () {
                return this.parentService ? this.parentService.registeredMetaMap : this.rootRegisteredMetaMap;
            },
            enumerable: false,
            configurable: true
        });
        // Register a modal to listen its open/close
        McModalControlService.prototype.registerModal = function (modalRef) {
            var _this = this;
            if (!this.hasRegistered(modalRef)) {
                var afterOpenSubscription = modalRef.afterOpen.subscribe(function () { return _this.openModals.push(modalRef); });
                var afterCloseSubscription = modalRef.afterClose.subscribe(function () { return _this.removeOpenModal(modalRef); });
                this.registeredMetaMap.set(modalRef, { modalRef: modalRef, afterOpenSubscription: afterOpenSubscription, afterCloseSubscription: afterCloseSubscription });
            }
        };
        McModalControlService.prototype.hasRegistered = function (modalRef) {
            return this.registeredMetaMap.has(modalRef);
        };
        // Close all registered opened modals
        McModalControlService.prototype.closeAll = function () {
            var i = this.openModals.length;
            while (i--) {
                this.openModals[i].close();
            }
        };
        McModalControlService.prototype.removeOpenModal = function (modalRef) {
            var index = this.openModals.indexOf(modalRef);
            if (index > -1) {
                this.openModals.splice(index, 1);
                if (!this.openModals.length) {
                    this.afterAllClose.next();
                }
            }
        };
        return McModalControlService;
    }());
    /** @nocollapse */ McModalControlService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McModalControlService, deps: [{ token: McModalControlService, optional: true, skipSelf: true }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ McModalControlService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McModalControlService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McModalControlService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () {
            return [{ type: McModalControlService, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.SkipSelf
                        }] }];
        } });

    var McModalTitle = /** @class */ (function () {
        function McModalTitle() {
        }
        return McModalTitle;
    }());
    /** @nocollapse */ McModalTitle.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McModalTitle, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McModalTitle.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McModalTitle, selector: "[mc-modal-title], mc-modal-title, [mcModalTitle]", host: { classAttribute: "mc-modal-header mc-modal-title" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McModalTitle, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: "[mc-modal-title], mc-modal-title, [mcModalTitle]",
                        host: {
                            class: 'mc-modal-header mc-modal-title'
                        }
                    }]
            }] });
    var McModalBody = /** @class */ (function () {
        function McModalBody() {
        }
        return McModalBody;
    }());
    /** @nocollapse */ McModalBody.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McModalBody, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McModalBody.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McModalBody, selector: "[mc-modal-body], mc-modal-body, [mcModalBody]", host: { classAttribute: "mc-modal-body" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McModalBody, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: "[mc-modal-body], mc-modal-body, [mcModalBody]",
                        host: {
                            class: 'mc-modal-body'
                        }
                    }]
            }] });
    var McModalFooter = /** @class */ (function () {
        function McModalFooter() {
        }
        return McModalFooter;
    }());
    /** @nocollapse */ McModalFooter.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McModalFooter, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McModalFooter.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McModalFooter, selector: "[mc-modal-footer], mc-modal-footer, [mcModalFooter]", host: { classAttribute: "mc-modal-footer" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McModalFooter, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: "[mc-modal-footer], mc-modal-footer, [mcModalFooter]",
                        host: {
                            class: 'mc-modal-footer'
                        }
                    }]
            }] });
    var McModalMainAction = /** @class */ (function () {
        function McModalMainAction() {
        }
        return McModalMainAction;
    }());
    /** @nocollapse */ McModalMainAction.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McModalMainAction, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McModalMainAction.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McModalMainAction, selector: "[mc-modal-main-action]", ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McModalMainAction, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: "[mc-modal-main-action]"
                    }]
            }] });

    var CssUnitPipe = /** @class */ (function () {
        function CssUnitPipe() {
        }
        CssUnitPipe.prototype.transform = function (value, defaultUnit) {
            if (defaultUnit === void 0) { defaultUnit = 'px'; }
            var formatted = +value;
            return isNaN(formatted) ? "" + value : "" + formatted + defaultUnit;
        };
        return CssUnitPipe;
    }());
    /** @nocollapse */ CssUnitPipe.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: CssUnitPipe, deps: [], target: i0__namespace.ɵɵFactoryTarget.Pipe });
    /** @nocollapse */ CssUnitPipe.ɵpipe = i0__namespace.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: CssUnitPipe, name: "toCssUnit" });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: CssUnitPipe, decorators: [{
                type: i0.Pipe,
                args: [{
                        name: 'toCssUnit'
                    }]
            }] });

    // Duration when perform animations (ms)
    var MODAL_ANIMATE_DURATION = 200;
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
            _this.mcVisibleChange = new i0.EventEmitter();
            _this.mcZIndex = 1000;
            _this.mcSize = exports.ModalSize.Normal;
            _this.mcCloseByESC = true;
            _this._mcClosable = true;
            _this._mcMask = true;
            _this._mcMaskClosable = false;
            // Trigger when modal open(visible) after animations
            _this.mcAfterOpen = new i0.EventEmitter();
            // Trigger when modal leave-animation over
            _this.mcAfterClose = new i0.EventEmitter();
            _this.mcOkType = 'primary';
            _this._mcOkLoading = false;
            _this.mcOnOk = new i0.EventEmitter();
            _this._mcCancelLoading = false;
            _this.mcOnCancel = new i0.EventEmitter();
            _this.isTopOverflow = false;
            _this.isBottomOverflow = false;
            // The origin point that animation based on
            _this.transformOrigin = '0px 0px 0px';
            _this.mcGetContainer = function () { return _this.overlay.create(); };
            return _this;
        }
        Object.defineProperty(McModalComponent.prototype, "mcVisible", {
            get: function () { return this._mcVisible; },
            set: function (value) { this._mcVisible = value; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McModalComponent.prototype, "mcClosable", {
            get: function () { return this._mcClosable; },
            set: function (value) { this._mcClosable = value; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McModalComponent.prototype, "mcMask", {
            get: function () { return this._mcMask; },
            set: function (value) { this._mcMask = value; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McModalComponent.prototype, "mcMaskClosable", {
            get: function () { return this._mcMaskClosable; },
            set: function (value) { this._mcMaskClosable = value; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McModalComponent.prototype, "mcOkLoading", {
            get: function () { return this._mcOkLoading; },
            set: function (value) { this._mcOkLoading = value; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McModalComponent.prototype, "mcCancelLoading", {
            get: function () { return this._mcCancelLoading; },
            set: function (value) { this._mcCancelLoading = value; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McModalComponent.prototype, "afterOpen", {
            // Observable alias for mcAfterOpen
            get: function () {
                return this.mcAfterOpen.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McModalComponent.prototype, "afterClose", {
            // Observable alias for mcAfterClose
            get: function () {
                return this.mcAfterClose.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McModalComponent.prototype, "okText", {
            get: function () {
                return this.mcOkText;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McModalComponent.prototype, "cancelText", {
            get: function () {
                return this.mcCancelText;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McModalComponent.prototype, "hidden", {
            // Indicate whether this dialog should hidden
            get: function () {
                return !this.mcVisible && !this.animationState;
            },
            enumerable: false,
            configurable: true
        });
        McModalComponent.prototype.ngOnInit = function () {
            // Create component along without View
            if (this.isComponent(this.mcContent)) {
                this.createDynamicComponent(this.mcContent);
            }
            // Setup default button options
            if (this.isModalButtons(this.mcFooter)) {
                this.mcFooter = this.formatModalButtons(this.mcFooter);
            }
            if (this.isComponent(this.mcComponent)) {
                this.createDynamicComponent(this.mcComponent);
            }
            // Place the modal dom to elsewhere
            this.container = typeof this.mcGetContainer === 'function' ? this.mcGetContainer() : this.mcGetContainer;
            if (this.container instanceof HTMLElement) {
                this.container.appendChild(this.elementRef.nativeElement);
            }
            else if (this.container instanceof i1.OverlayRef) {
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
        McModalComponent.prototype.ngOnChanges = function (changes) {
            if (changes.mcVisible) {
                // Do not trigger animation while initializing
                this.handleVisibleStateChange(this.mcVisible, !changes.mcVisible.firstChange);
            }
        };
        McModalComponent.prototype.ngAfterViewInit = function () {
            var e_1, _b;
            var _a;
            // If using Component, it is the time to attach View while bodyContainer is ready
            if (this.contentComponentRef) {
                this.bodyContainer.insert(this.contentComponentRef.hostView);
            }
            (_a = this.getElement().getElementsByTagName('button')[0]) === null || _a === void 0 ? void 0 : _a.focus();
            try {
                for (var _c = __values(this.autoFocusedButtons.toArray()), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var autoFocusedButton = _d.value;
                    if (autoFocusedButton.nativeElement.autofocus) {
                        autoFocusedButton.nativeElement.focus();
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.checkOverflow();
        };
        McModalComponent.prototype.ngOnDestroy = function () {
            if (this.container instanceof i1.OverlayRef) {
                this.container.dispose();
            }
        };
        McModalComponent.prototype.checkOverflow = function () {
            var _a;
            var nativeElement = (_a = this.modalBody) === null || _a === void 0 ? void 0 : _a.nativeElement;
            if (!nativeElement) {
                return;
            }
            var scrollTop = nativeElement.scrollTop;
            var offsetHeight = nativeElement.offsetHeight;
            var scrollHeight = nativeElement.scrollHeight;
            this.isTopOverflow = scrollTop > 0;
            this.isBottomOverflow = scrollTop + offsetHeight < scrollHeight;
        };
        McModalComponent.prototype.open = function () {
            this.changeVisibleFromInside(true);
        };
        McModalComponent.prototype.close = function (result) {
            this.changeVisibleFromInside(false, result);
        };
        // Destroy equals Close
        McModalComponent.prototype.destroy = function (result) {
            this.close(result);
        };
        McModalComponent.prototype.markForCheck = function () {
            this.changeDetector.markForCheck();
        };
        McModalComponent.prototype.triggerOk = function () {
            this.onClickOkCancel('ok');
        };
        McModalComponent.prototype.triggerCancel = function () {
            this.onClickOkCancel('cancel');
        };
        McModalComponent.prototype.getInstance = function () {
            return this;
        };
        McModalComponent.prototype.getContentComponentRef = function () {
            return this.contentComponentRef;
        };
        McModalComponent.prototype.getContentComponent = function () {
            return this.contentComponentRef && this.contentComponentRef.instance;
        };
        McModalComponent.prototype.getElement = function () {
            return this.elementRef && this.elementRef.nativeElement;
        };
        McModalComponent.prototype.getMcFooter = function () {
            return this.getElement().getElementsByClassName('mc-modal-footer').item(0);
        };
        McModalComponent.prototype.onClickMask = function ($event) {
            if (this.mcMask &&
                this.mcMaskClosable &&
                $event.target.classList.contains('mc-modal-wrap') &&
                this.mcVisible) {
                this.onClickOkCancel('cancel');
            }
        };
        // tslint:disable-next-line: no-reserved-keywords
        McModalComponent.prototype.isModalType = function (type) {
            return this.mcModalType === type;
        };
        McModalComponent.prototype.onKeyDown = function (event) {
            var _a;
            // tslint:disable-next-line:deprecation .key isn't supported in Edge
            if (event.keyCode === keycodes.ESCAPE && this.container && (this.container instanceof i1.OverlayRef)) {
                this.close();
                event.preventDefault();
            }
            // tslint:disable-next-line:deprecation .key isn't supported in Edge
            if (event.ctrlKey && event.keyCode === keycodes.ENTER) {
                if (this.mcModalType === 'confirm') {
                    this.triggerOk();
                }
                (_a = this.getElement().querySelector('[mc-modal-main-action]')) === null || _a === void 0 ? void 0 : _a.click();
                event.preventDefault();
            }
        };
        // AoT
        McModalComponent.prototype.onClickCloseBtn = function () {
            if (this.mcVisible) {
                this.onClickOkCancel('cancel');
            }
        };
        // AoT
        // tslint:disable-next-line: no-reserved-keywords
        McModalComponent.prototype.onClickOkCancel = function (type) {
            var _this = this;
            var trigger = { ok: this.mcOnOk, cancel: this.mcOnCancel }[type];
            var loadingKey = { ok: 'mcOkLoading', cancel: 'mcCancelLoading' }[type];
            if (trigger instanceof i0.EventEmitter) {
                trigger.emit(this.getContentComponent());
            }
            else if (typeof trigger === 'function') {
                var result = trigger(this.getContentComponent());
                // Users can return "false" to prevent closing by default
                var caseClose_1 = function (doClose) { return (doClose !== false) && _this.close(doClose); };
                if (isPromise(result)) {
                    this[loadingKey] = true;
                    var handleThen = function (doClose) {
                        _this[loadingKey] = false;
                        caseClose_1(doClose);
                    };
                    result.then(handleThen).catch(handleThen);
                }
                else {
                    caseClose_1(result);
                }
            }
        };
        // AoT
        McModalComponent.prototype.isNonEmptyString = function (value) {
            return typeof value === 'string' && value !== '';
        };
        // AoT
        McModalComponent.prototype.isTemplateRef = function (value) {
            return value instanceof i0.TemplateRef;
        };
        // AoT
        McModalComponent.prototype.isComponent = function (value) {
            return value instanceof i0.Type;
        };
        // AoT
        McModalComponent.prototype.isModalButtons = function (value) {
            return Array.isArray(value) && value.length > 0;
        };
        // Lookup a button's property, if the prop is a function, call & then return the result, otherwise, return itself.
        // AoT
        McModalComponent.prototype.getButtonCallableProp = function (options, prop) {
            var value = options[prop];
            var args = [];
            if (this.contentComponentRef) {
                args.push(this.contentComponentRef.instance);
            }
            return typeof value === 'function' ? value.apply(options, args) : value;
        };
        // On mcFooter's modal button click
        // AoT
        McModalComponent.prototype.onButtonClick = function (button) {
            // Call onClick directly
            // tslint:disable-next-line:no-inferred-empty-object-type  rule seems to be broken
            var result = this.getButtonCallableProp(button, 'onClick');
            if (isPromise(result)) {
                button.loading = true;
                result.then(function () { return button.loading = false; }).catch(function () { return button.loading = false; });
            }
        };
        // Do rest things when visible state changed
        McModalComponent.prototype.handleVisibleStateChange = function (visible, animation, closeResult) {
            var _this = this;
            if (animation === void 0) { animation = true; }
            // Hide scrollbar at the first time when shown up
            if (visible) {
                this.changeBodyOverflow(1);
            }
            return Promise
                .resolve(animation && this.animateTo(visible))
                // Emit open/close event after animations over
                .then(function () {
                if (visible) {
                    _this.mcAfterOpen.emit();
                }
                else {
                    _this.mcAfterClose.emit(closeResult);
                    // Show/hide scrollbar when animation is over
                    _this.changeBodyOverflow();
                }
            });
        };
        // Change mcVisible from inside
        McModalComponent.prototype.changeVisibleFromInside = function (visible, closeResult) {
            if (this.mcVisible !== visible) {
                // Change mcVisible value immediately
                this.mcVisible = visible;
                this.mcVisibleChange.emit(visible);
                return this.handleVisibleStateChange(visible, true, closeResult);
            }
            return Promise.resolve();
        };
        McModalComponent.prototype.changeAnimationState = function (state) {
            var _b, _c;
            this.animationState = state;
            if (state) {
                this.maskAnimationClassMap = (_b = {},
                    _b["fade-" + state] = true,
                    _b["fade-" + state + "-active"] = true,
                    _b);
                this.modalAnimationClassMap = (_c = {},
                    _c["zoom-" + state] = true,
                    _c["zoom-" + state + "-active"] = true,
                    _c);
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
        McModalComponent.prototype.animateTo = function (isVisible) {
            var _this = this;
            // Figure out the lastest click position when shows up
            if (isVisible) {
                // [NOTE] Using timeout due to the document.click event is fired later than visible change,
                // so if not postponed to next event-loop, we can't get the lastest click position
                window.setTimeout(function () { return _this.updateTransformOrigin(); });
            }
            this.changeAnimationState(isVisible ? 'enter' : 'leave');
            // Return when animation is over
            return new Promise(function (resolve) {
                return window.setTimeout(function () {
                    _this.changeAnimationState(null);
                    resolve(null);
                }, MODAL_ANIMATE_DURATION);
            });
        };
        McModalComponent.prototype.formatModalButtons = function (buttons) {
            return buttons.map(function (button) {
                return Object.assign({
                    type: 'default',
                    size: 'default',
                    autoLoading: true,
                    show: true,
                    loading: false,
                    disabled: false
                }, button);
            });
        };
        /**
         * Create a component dynamically but not attach to any View
         * (this action will be executed when bodyContainer is ready)
         * @param component Component class
         */
        McModalComponent.prototype.createDynamicComponent = function (component) {
            var factory = this.cfr.resolveComponentFactory(component);
            var childInjector = i0.Injector.create({
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
        McModalComponent.prototype.updateTransformOrigin = function () {
            var modalElement = this.modalContainer.nativeElement;
            var lastPosition = modalUtilObject.getLastClickPosition();
            if (lastPosition) {
                this.transformOrigin = lastPosition.x - modalElement.offsetLeft + "px " + (lastPosition.y - modalElement.offsetTop) + "px 0px";
            }
        };
        /**
         * Take care of the body's overflow to decide the existense of scrollbar
         * @param plusNum The number that the openModals.length will increase soon
         */
        McModalComponent.prototype.changeBodyOverflow = function (plusNum) {
            if (plusNum === void 0) { plusNum = 0; }
            var openModals = this.modalControl.openModals;
            if (openModals.length + plusNum > 0) {
                this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
            }
            else {
                this.renderer.removeStyle(this.document.body, 'overflow');
            }
        };
        return McModalComponent;
    }(McModalRef));
    /** @nocollapse */ McModalComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McModalComponent, deps: [{ token: i1__namespace.Overlay }, { token: i0__namespace.Renderer2 }, { token: i0__namespace.ComponentFactoryResolver }, { token: i0__namespace.ElementRef }, { token: i0__namespace.ViewContainerRef }, { token: McModalControlService }, { token: i0__namespace.ChangeDetectorRef }, { token: i5.DOCUMENT }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McModalComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McModalComponent, selector: "mc-modal", inputs: { mcModalType: "mcModalType", mcComponent: "mcComponent", mcContent: "mcContent", mcComponentParams: "mcComponentParams", mcFooter: "mcFooter", mcVisible: "mcVisible", mcZIndex: "mcZIndex", mcWidth: "mcWidth", mcSize: "mcSize", mcWrapClassName: "mcWrapClassName", mcClassName: "mcClassName", mcStyle: "mcStyle", mcTitle: "mcTitle", mcCloseByESC: "mcCloseByESC", mcClosable: "mcClosable", mcMask: "mcMask", mcMaskClosable: "mcMaskClosable", mcMaskStyle: "mcMaskStyle", mcBodyStyle: "mcBodyStyle", mcOkText: "mcOkText", mcOkType: "mcOkType", mcOkLoading: "mcOkLoading", mcOnOk: "mcOnOk", mcCancelText: "mcCancelText", mcCancelLoading: "mcCancelLoading", mcOnCancel: "mcOnCancel", mcGetContainer: "mcGetContainer" }, outputs: { mcVisibleChange: "mcVisibleChange", mcAfterOpen: "mcAfterOpen", mcAfterClose: "mcAfterClose", mcOnOk: "mcOnOk", mcOnCancel: "mcOnCancel" }, host: { listeners: { "keydown": "onKeyDown($event)" } }, viewQueries: [{ propertyName: "modalContainer", first: true, predicate: ["modalContainer"], descendants: true, static: true }, { propertyName: "bodyContainer", first: true, predicate: ["bodyContainer"], descendants: true, read: i0.ViewContainerRef }, { propertyName: "modalBody", first: true, predicate: ["modalBody"], descendants: true }, { propertyName: "autoFocusedButtons", predicate: ["autoFocusedButton"], descendants: true, read: i0.ElementRef }], usesInheritance: true, usesOnChanges: true, ngImport: i0__namespace, template: "<!-- Compatible: the <ng-content> can appear only once -->\n<ng-template #tplOriginContent>\n    <ng-content></ng-content>\n</ng-template>\n\n<div>\n    <div *ngIf=\"mcMask\"\n         class=\"mc-modal-mask\"\n         [ngClass]=\"maskAnimationClassMap\"\n         [class.mc-modal-mask-hidden]=\"hidden\"\n         [ngStyle]=\"mcMaskStyle\"\n         [style.zIndex]=\"mcZIndex\"\n    ></div>\n    <div (mousedown)=\"onClickMask($event)\"\n         class=\"mc-modal-wrap {{ mcWrapClassName }}\"\n         [style.zIndex]=\"mcZIndex\"\n         [style.display]=\"hidden ? 'none' : ''\"\n         tabindex=\"-1\">\n\n        <div #modalContainer\n             class=\"mc-modal {{ mcClassName }} mc-modal_{{ mcSize }}\"\n             [ngClass]=\"modalAnimationClassMap\"\n             [ngStyle]=\"mcStyle\"\n             [style.width]=\"mcWidth | toCssUnit\"\n             [style.transform-origin]=\"transformOrigin\">\n\n            <div class=\"mc-modal-content\" cdkTrapFocus>\n                <button *ngIf=\"mcClosable\"\n                        mc-button\n                        (click)=\"onClickCloseBtn()\"\n                        class=\"mc-modal-close mc-button_transparent\">\n                    <i mc-icon=\"mc-close-L_16\" class=\"mc-icon mc-icon_light\" [color]=\"'second'\"></i>\n                </button>\n                <ng-container [ngSwitch]=\"true\">\n                    <ng-container *ngSwitchCase=\"isModalType('default')\"\n                                  [ngTemplateOutlet]=\"tplContentDefault\"></ng-container>\n                    <ng-container *ngSwitchCase=\"isModalType('confirm')\"\n                                  [ngTemplateOutlet]=\"tplContentConfirm\"></ng-container>\n                    <ng-container *ngSwitchCase=\"isModalType('custom')\"\n                                  [ngTemplateOutlet]=\"tplContentCustom\"></ng-container>\n                </ng-container>\n            </div>\n        </div>\n    </div>\n</div>\n\n<ng-template #tplContentCustom>\n    <ng-container #bodyContainer></ng-container>\n</ng-template>\n\n\n<!-- [Predefined] Default Modal Content -->\n<ng-template #tplContentDefault>\n    <div *ngIf=\"mcTitle\" class=\"mc-modal-header\" [class.mc-modal-body_top-overflow]=\"isTopOverflow\">\n        <div class=\"mc-modal-title\">\n            <ng-container [ngSwitch]=\"true\">\n                <ng-container *ngSwitchCase=\"isTemplateRef(mcTitle)\" [ngTemplateOutlet]=\"mcTitle\"></ng-container>\n                <ng-container *ngSwitchCase=\"isNonEmptyString(mcTitle)\">\n                    <div [innerHTML]=\"mcTitle\"></div>\n                </ng-container>\n            </ng-container>\n        </div>\n    </div>\n    <div class=\"mc-modal-body\" #modalBody [ngStyle]=\"mcBodyStyle\" (scroll)=\"checkOverflow()\">\n        <ng-container #bodyContainer>\n            <ng-container *ngIf=\"!isComponent(mcContent)\" [ngSwitch]=\"true\">\n                <ng-container *ngSwitchCase=\"isTemplateRef(mcContent)\" [ngTemplateOutlet]=\"mcContent\"></ng-container>\n                <ng-container *ngSwitchCase=\"isNonEmptyString(mcContent)\">\n                    <div [innerHTML]=\"mcContent\"></div>\n                </ng-container>\n                <ng-container *ngSwitchDefault [ngTemplateOutlet]=\"tplOriginContent\"></ng-container>\n            </ng-container>\n        </ng-container>\n    </div>\n    <div *ngIf=\"mcFooter !== null\" class=\"mc-modal-footer\" [class.mc-modal-body_bottom-overflow]=\"isBottomOverflow\">\n        <ng-container [ngSwitch]=\"true\">\n            <ng-container *ngSwitchCase=\"isTemplateRef(mcFooter)\" [ngTemplateOutlet]=\"mcFooter\"></ng-container>\n            <ng-container *ngSwitchCase=\"isNonEmptyString(mcFooter)\">\n                <div [innerHTML]=\"mcFooter\"></div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"isModalButtons(mcFooter)\">\n                <ng-container *ngFor=\"let button of mcFooter\">\n                    <button\n                        mc-button\n                        #autoFocusedButton\n                        [attr.autofocus]=\"button.autoFocus\"\n                        [attr.mc-modal-main-action]=\"button.mcModalMainAction\"\n                        *ngIf=\"getButtonCallableProp(button, 'show')\"\n                        [disabled]=\"getButtonCallableProp(button, 'disabled')\"\n                        [class.mc-progress]=\"getButtonCallableProp(button, 'loading')\"\n                        (click)=\"onButtonClick(button)\"\n                        [color]=\"button.type\">\n                        {{ button.label }}\n                    </button>\n                </ng-container>\n            </ng-container>\n            <ng-container *ngSwitchDefault>\n                <button\n                    #autoFocusedButton\n                    [attr.autofocus]=\"true\"\n                    *ngIf=\"mcOkText !== null\"\n                    mc-button\n                    [color]=\"'primary'\"\n                    (click)=\"onClickOkCancel('ok')\">\n\n                    {{ okText }}\n                </button>\n                <button *ngIf=\"mcCancelText!==null\" mc-button (click)=\"onClickOkCancel('cancel')\">\n                    {{ cancelText }}\n                </button>\n            </ng-container>\n        </ng-container>\n    </div>\n</ng-template>\n<!-- /[Predefined] Default Modal Content -->\n\n<!-- [Predefined] Confirm Modal Content -->\n<ng-template #tplContentConfirm>\n    <div class=\"mc-modal-body\" [ngStyle]=\"mcBodyStyle\">\n        <div class=\"mc-confirm-body-wrapper\">\n            <div class=\"mc-confirm-body\">\n                <div class=\"mc-confirm-content\">\n                    <ng-container #bodyContainer>\n                        <ng-container *ngIf=\"!isComponent(mcContent)\" [ngSwitch]=\"true\">\n                            <ng-container *ngSwitchCase=\"isTemplateRef(mcContent)\"\n                                          [ngTemplateOutlet]=\"mcContent\"></ng-container>\n                            <ng-container *ngSwitchCase=\"isNonEmptyString(mcContent)\">\n                                <div [innerHTML]=\"mcContent\"></div>\n                            </ng-container>\n                            <ng-container *ngSwitchDefault [ngTemplateOutlet]=\"tplOriginContent\"></ng-container>\n                        </ng-container>\n                    </ng-container>\n                </div>\n            </div>\n        </div> <!-- /.mc-confirm-body-wrapper -->\n    </div>\n    <div class=\"mc-confirm-btns\">\n        <button\n            mc-button\n            #autoFocusedButton\n            [color]=\"mcOkType\"\n            [attr.autofocus]=\"true\"\n            *ngIf=\"mcOkText !== ''\"\n            (click)=\"onClickOkCancel('ok')\">\n\n            {{ okText }}\n        </button>\n\n        <button mc-button [color]=\"'second'\" *ngIf=\"mcCancelText !== ''\" (click)=\"onClickOkCancel('cancel')\">\n            {{ cancelText }}\n        </button>\n    </div>\n</ng-template>\n<!-- /[Predefined] Confirm Modal Content -->\n", styles: [".mc-confirm .mc-modal-header{display:none}.mc-confirm .mc-modal-close{display:none}.mc-confirm .mc-modal-body{padding:24px;padding:var(--mc-modal-confirm-size-padding, 24px)}.mc-confirm-body-wrapper{zoom:1}.mc-confirm-body-wrapper:before,.mc-confirm-body-wrapper:after{content:\"\";display:table}.mc-confirm-body-wrapper:after{clear:both}.mc-confirm-body .mc-confirm-title{display:block;overflow:auto}.mc-confirm .mc-confirm-btns{border-radius:0 0 4px 4px;border-radius:var(--mc-modal-footer-size-border-radius, 0 0 4px 4px);text-align:right}.mc-confirm .mc-confirm-btns button+button{margin:16px}.mc-modal{box-sizing:border-box;position:relative;top:48px;top:var(--mc-modal-size-top, 48px);width:auto;margin:0 auto;list-style:none}.mc-modal.zoom-enter,.mc-modal.zoom-appear{animation-duration:.3s;transform:none;opacity:0}.mc-modal.mc-modal_small{width:400px;width:var(--mc-modal-size-small, 400px)}.mc-modal.mc-modal_normal{width:640px;width:var(--mc-modal-size-normal, 640px)}.mc-modal.mc-modal_large{width:960px;width:var(--mc-modal-size-large, 960px)}.mc-modal .mc-modal-close{position:absolute;z-index:10;top:0;right:0;width:56px;width:var(--mc-modal-size-close-width, 56px);height:56px;height:var(--mc-modal-size-close-width, 56px)}.mc-modal-wrap{position:fixed;z-index:1000;top:0;right:0;bottom:0;left:0;overflow:auto;-webkit-overflow-scrolling:touch;outline:0}.mc-modal-title{margin:0}.mc-modal-content{position:relative;border-radius:4px;border-radius:var(--mc-modal-size-border-radius, 4px);background-clip:padding-box;background-color:#fff}.mc-modal-header{display:block;border-radius:4px 4px 0 0;border-radius:var(--mc-modal-header-size-border-radius, 4px 4px 0 0);padding:14px 16px;padding:var(--mc-modal-header-size-padding, 14px 16px)}.mc-modal-body{display:block;overflow-y:auto;max-height:calc(100vh - 260px);max-height:var(--mc-modal-body-size-max-height, calc(100vh - 260px));padding:16px 24px 24px;padding:var(--mc-modal-body-size-padding, 16px 24px 24px);word-wrap:break-word}.mc-modal-footer{display:block;border-radius:0 0 4px 4px;border-radius:var(--mc-modal-footer-size-border-radius, 0 0 4px 4px);padding:16px;padding:var(--mc-modal-footer-size-padding, 16px 16px);text-align:right}.mc-modal-footer button+button{margin-left:16px;margin-bottom:0}.mc-modal-mask{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0;height:100%}.mc-modal-mask.mc-modal-mask-hidden{display:none}.mc-modal-open{overflow:hidden}\n"], components: [{ type: i3__namespace.McButton, selector: "button[mc-button]", inputs: ["disabled", "color"] }, { type: i4__namespace.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i5__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i5__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i6__namespace.CdkTrapFocus, selector: "[cdkTrapFocus]", inputs: ["cdkTrapFocus", "cdkTrapFocusAutoCapture"], exportAs: ["cdkTrapFocus"] }, { type: i3__namespace.McButtonCssStyler, selector: "button[mc-button], a[mc-button]" }, { type: i4__namespace.McIconCSSStyler, selector: "[mc-icon]" }, { type: i5__namespace.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i5__namespace.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i5__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i5__namespace.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { type: i5__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: McModalMainAction, selector: "[mc-modal-main-action]" }], pipes: { "toCssUnit": CssUnitPipe }, changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McModalComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-modal',
                        templateUrl: './modal.component.html',
                        styleUrls: ['./modal.scss'],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        host: {
                            '(keydown)': 'onKeyDown($event)'
                        }
                    }]
            }], ctorParameters: function () {
            return [{ type: i1__namespace.Overlay }, { type: i0__namespace.Renderer2 }, { type: i0__namespace.ComponentFactoryResolver }, { type: i0__namespace.ElementRef }, { type: i0__namespace.ViewContainerRef }, { type: McModalControlService }, { type: i0__namespace.ChangeDetectorRef }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i5.DOCUMENT]
                        }] }];
        }, propDecorators: { mcModalType: [{
                    type: i0.Input
                }], mcComponent: [{
                    type: i0.Input
                }], mcContent: [{
                    type: i0.Input
                }], mcComponentParams: [{
                    type: i0.Input
                }], mcFooter: [{
                    type: i0.Input
                }], mcVisible: [{
                    type: i0.Input
                }], mcVisibleChange: [{
                    type: i0.Output
                }], mcZIndex: [{
                    type: i0.Input
                }], mcWidth: [{
                    type: i0.Input
                }], mcSize: [{
                    type: i0.Input
                }], mcWrapClassName: [{
                    type: i0.Input
                }], mcClassName: [{
                    type: i0.Input
                }], mcStyle: [{
                    type: i0.Input
                }], mcTitle: [{
                    type: i0.Input
                }], mcCloseByESC: [{
                    type: i0.Input
                }], mcClosable: [{
                    type: i0.Input
                }], mcMask: [{
                    type: i0.Input
                }], mcMaskClosable: [{
                    type: i0.Input
                }], mcMaskStyle: [{
                    type: i0.Input
                }], mcBodyStyle: [{
                    type: i0.Input
                }], mcAfterOpen: [{
                    type: i0.Output
                }], mcAfterClose: [{
                    type: i0.Output
                }], mcOkText: [{
                    type: i0.Input
                }], mcOkType: [{
                    type: i0.Input
                }], mcOkLoading: [{
                    type: i0.Input
                }], mcOnOk: [{
                    type: i0.Input
                }, {
                    type: i0.Output
                }], mcCancelText: [{
                    type: i0.Input
                }], mcCancelLoading: [{
                    type: i0.Input
                }], mcOnCancel: [{
                    type: i0.Input
                }, {
                    type: i0.Output
                }], modalContainer: [{
                    type: i0.ViewChild,
                    args: ['modalContainer', { static: true }]
                }], bodyContainer: [{
                    type: i0.ViewChild,
                    args: ['bodyContainer', { read: i0.ViewContainerRef, static: false }]
                }], autoFocusedButtons: [{
                    type: i0.ViewChildren,
                    args: ['autoFocusedButton', { read: i0.ElementRef }]
                }], modalBody: [{
                    type: i0.ViewChild,
                    args: ['modalBody']
                }], mcGetContainer: [{
                    type: i0.Input
                }] } });
    ////////////
    function isPromise(obj) {
        // tslint:disable-next-line: no-unbound-method
        return !!obj &&
            (typeof obj === 'object' || typeof obj === 'function') &&
            typeof obj.then === 'function' &&
            typeof obj.catch === 'function';
    }

    // A builder used for managing service creating modals
    var ModalBuilderForService = /** @class */ (function () {
        function ModalBuilderForService(overlay, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            this.overlay = overlay;
            this.createModal();
            if (!('mcGetContainer' in options)) {
                options.mcGetContainer = undefined;
            }
            this.changeProps(options);
            this.modalRef.instance.open();
            this.modalRef.instance.mcAfterClose.subscribe(function () { return _this.destroyModal(); });
            this.overlayRef.keydownEvents()
                // @ts-ignore
                .pipe(operators.filter(function (event) {
                // tslint:disable-next-line:deprecation replacement .key isn't supported in Edge
                return event.keyCode === keycodes.ESCAPE && options.mcCloseByESC;
            }))
                .subscribe(function () { return _this.modalRef.instance.close(); });
        }
        ModalBuilderForService.prototype.getInstance = function () {
            return this.modalRef && this.modalRef.instance;
        };
        ModalBuilderForService.prototype.destroyModal = function () {
            if (this.modalRef) {
                this.overlayRef.dispose();
                this.modalRef = null;
            }
        };
        ModalBuilderForService.prototype.changeProps = function (options) {
            if (this.modalRef) {
                // here not limit user's inputs at runtime
                Object.assign(this.modalRef.instance, options);
            }
        };
        // Create component to ApplicationRef
        ModalBuilderForService.prototype.createModal = function () {
            this.overlayRef = this.overlay.create();
            this.modalRef = this.overlayRef.attach(new portal.ComponentPortal(McModalComponent));
        };
        return ModalBuilderForService;
    }());
    var McModalService = /** @class */ (function () {
        function McModalService(overlay, modalControl) {
            this.overlay = overlay;
            this.modalControl = modalControl;
        }
        Object.defineProperty(McModalService.prototype, "openModals", {
            // Track of the current close modals (we assume invisible is close this time)
            get: function () {
                return this.modalControl.openModals;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McModalService.prototype, "afterAllClose", {
            get: function () {
                return this.modalControl.afterAllClose.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        // Closes all of the currently-open dialogs
        McModalService.prototype.closeAll = function () {
            this.modalControl.closeAll();
        };
        McModalService.prototype.create = function (options) {
            if (options === void 0) { options = {}; }
            if (typeof options.mcOnCancel !== 'function') {
                // Leave a empty function to close this modal by default
                // tslint:disable-next-line
                options.mcOnCancel = function () { };
            }
            if (!('mcCloseByESC' in options)) {
                options.mcCloseByESC = true;
            }
            return new ModalBuilderForService(this.overlay, options).getInstance();
        };
        McModalService.prototype.confirm = function (options, confirmType) {
            if (options === void 0) { options = {}; }
            if (confirmType === void 0) { confirmType = 'confirm'; }
            if ('mcFooter' in options) {
                console.warn("The Confirm-Modal doesn't support \"mcFooter\", this property will be ignored.");
            }
            // NOTE: only support function currently by calling confirm()
            if (typeof options.mcOnOk !== 'function') {
                // Leave a empty function to close this modal by default
                // tslint:disable-next-line
                options.mcOnOk = function () { };
            }
            options.mcModalType = 'confirm';
            options.mcClassName = "mc-confirm mc-confirm-" + confirmType + " " + (options.mcClassName || '');
            return this.create(options);
        };
        McModalService.prototype.open = function (options) {
            if (options === void 0) { options = {}; }
            options.mcModalType = 'custom';
            return this.create(options);
        };
        McModalService.prototype.success = function (options) {
            if (options === void 0) { options = {}; }
            return this.simpleConfirm(options, 'success');
        };
        // tslint:disable-next-line: no-reserved-keywords
        McModalService.prototype.delete = function (options) {
            if (options === void 0) { options = {}; }
            return this.simpleConfirm(options, 'warn');
        };
        McModalService.prototype.simpleConfirm = function (options, confirmType) {
            if (options === void 0) { options = {}; }
            // Remove the Cancel button if the user not specify a Cancel button
            if (!('mcCancelText' in options)) {
                // @ts-ignore
                options.mcCancelText = null;
            }
            return this.confirm(options, confirmType);
        };
        return McModalService;
    }());
    /** @nocollapse */ McModalService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McModalService, deps: [{ token: i1__namespace.Overlay }, { token: McModalControlService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ McModalService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McModalService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McModalService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i1__namespace.Overlay }, { type: McModalControlService }]; } });

    var McModalModule = /** @class */ (function () {
        function McModalModule() {
        }
        return McModalModule;
    }());
    /** @nocollapse */ McModalModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McModalModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ McModalModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McModalModule, declarations: [McModalComponent,
            McModalTitle,
            McModalBody,
            McModalFooter,
            CssUnitPipe,
            McModalMainAction], imports: [i5.CommonModule,
            i1.OverlayModule,
            i6.A11yModule,
            i3.McButtonModule,
            i4.McIconModule], exports: [McModalComponent,
            McModalTitle,
            McModalBody,
            McModalFooter] });
    /** @nocollapse */ McModalModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McModalModule, providers: [
            McModalControlService,
            McModalService
        ], imports: [[
                i5.CommonModule,
                i1.OverlayModule,
                i6.A11yModule,
                i3.McButtonModule,
                i4.McIconModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McModalModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i5.CommonModule,
                            i1.OverlayModule,
                            i6.A11yModule,
                            i3.McButtonModule,
                            i4.McIconModule
                        ],
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
                            CssUnitPipe,
                            McModalMainAction
                        ],
                        providers: [
                            McModalControlService,
                            McModalService
                        ],
                        entryComponents: [McModalComponent]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.McModalBody = McModalBody;
    exports.McModalComponent = McModalComponent;
    exports.McModalFooter = McModalFooter;
    exports.McModalMainAction = McModalMainAction;
    exports.McModalModule = McModalModule;
    exports.McModalRef = McModalRef;
    exports.McModalService = McModalService;
    exports.McModalTitle = McModalTitle;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-modal.umd.js.map
