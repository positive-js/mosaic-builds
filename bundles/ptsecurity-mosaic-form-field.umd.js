(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/icon'), require('@ptsecurity/mosaic/core'), require('@ptsecurity/cdk/keycodes'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/form-field', ['exports', '@angular/common', '@angular/core', '@ptsecurity/mosaic/icon', '@ptsecurity/mosaic/core', '@ptsecurity/cdk/keycodes', 'rxjs', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic['form-field'] = {}), global.ng.common, global.ng.core, global.ptsecurity.mosaic.icon, global.ptsecurity.mosaic.core, global.mc.cdk.keycodes, global.rxjs, global.rxjs.operators));
}(this, (function (exports, i1$1, i0, i1, core, keycodes, rxjs, operators) { 'use strict';

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

    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);
    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

    var McCleaner = /** @class */ (function () {
        function McCleaner() {
            this.themePalette = core.ThemePalette;
        }
        return McCleaner;
    }());
    /** @nocollapse */ McCleaner.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McCleaner, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McCleaner.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McCleaner, selector: "mc-cleaner", host: { classAttribute: "mc-cleaner" }, exportAs: ["mcCleaner"], ngImport: i0__namespace, template: "<i class=\"mc-icon_light\" mc-icon=\"mc-close-circle_16\" [color]=\"themePalette.Primary\"></i>", isInline: true, components: [{ type: i1__namespace.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i1__namespace.McIconCSSStyler, selector: "[mc-icon]" }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McCleaner, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-cleaner',
                        exportAs: 'mcCleaner',
                        template: "<i class=\"mc-icon_light\" mc-icon=\"mc-close-circle_16\" [color]=\"themePalette.Primary\"></i>",
                        host: {
                            class: 'mc-cleaner'
                        }
                    }]
            }] });

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

    /** An interface which allows a control to work inside of a `MсFormField`. */
    // tslint:disable-next-line:naming-convention
    var McFormFieldControl = /** @class */ (function () {
        function McFormFieldControl() {
        }
        return McFormFieldControl;
    }());

    function getMcFormFieldMissingControlError() {
        return Error('mc-form-field must contain a McFormFieldControl.');
    }
    function getMcFormFieldYouCanNotUseCleanerInNumberInputError() {
        return Error("You can't use mc-cleaner with input that have type=\"number\"");
    }

    var nextUniqueId$1 = 0;
    var McHint = /** @class */ (function () {
        function McHint() {
            this.id = "mc-hint-" + nextUniqueId$1++;
        }
        return McHint;
    }());
    /** @nocollapse */ McHint.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McHint, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McHint.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McHint, selector: "mc-hint", inputs: { id: "id" }, host: { properties: { "attr.id": "id" }, classAttribute: "mc-hint" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McHint, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: 'mc-hint',
                        host: {
                            class: 'mc-hint',
                            '[attr.id]': 'id'
                        }
                    }]
            }], propDecorators: { id: [{
                    type: i0.Input
                }] } });

    var McPrefix = /** @class */ (function () {
        function McPrefix() {
        }
        return McPrefix;
    }());
    /** @nocollapse */ McPrefix.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McPrefix, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McPrefix.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McPrefix, selector: "[mcPrefix]", ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McPrefix, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[mcPrefix]'
                    }]
            }] });

    var McStepper = /** @class */ (function () {
        function McStepper() {
            this.stepUp = new i0.EventEmitter();
            this.stepDown = new i0.EventEmitter();
        }
        McStepper.prototype.connectTo = function (numberInput) {
            if (!numberInput) {
                return;
            }
            this.stepUp.subscribe(function () {
                numberInput.stepUp(numberInput.step);
            });
            this.stepDown.subscribe(function () {
                numberInput.stepDown(numberInput.step);
            });
        };
        McStepper.prototype.onStepUp = function ($event) {
            this.stepUp.emit();
            $event.preventDefault();
        };
        McStepper.prototype.onStepDown = function ($event) {
            this.stepDown.emit();
            $event.preventDefault();
        };
        return McStepper;
    }());
    /** @nocollapse */ McStepper.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McStepper, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McStepper.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McStepper, selector: "mc-stepper", outputs: { stepUp: "stepUp", stepDown: "stepDown" }, ngImport: i0__namespace, template: "\n        <i class=\"mc mc-icon mc-icon_light mc-second mc-stepper-step-up mc-angle-down-L_16\"\n           (mousedown)=\"onStepUp($event)\">\n        </i>\n        <i class=\"mc mc-icon mc-icon_light mc-second mc-stepper-step-down mc-angle-down-L_16\"\n           (mousedown)=\"onStepDown($event)\">\n        </i>\n    ", isInline: true });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McStepper, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-stepper',
                        template: "\n        <i class=\"mc mc-icon mc-icon_light mc-second mc-stepper-step-up mc-angle-down-L_16\"\n           (mousedown)=\"onStepUp($event)\">\n        </i>\n        <i class=\"mc mc-icon mc-icon_light mc-second mc-stepper-step-down mc-angle-down-L_16\"\n           (mousedown)=\"onStepDown($event)\">\n        </i>\n    "
                    }]
            }], propDecorators: { stepUp: [{
                    type: i0.Output
                }], stepDown: [{
                    type: i0.Output
                }] } });

    var McSuffix = /** @class */ (function () {
        function McSuffix() {
        }
        return McSuffix;
    }());
    /** @nocollapse */ McSuffix.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McSuffix, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McSuffix.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McSuffix, selector: "[mcSuffix]", ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McSuffix, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[mcSuffix]'
                    }]
            }] });

    var nextUniqueId = 0;
    var McFormFieldBase = /** @class */ (function () {
        // tslint:disable-next-line:naming-convention
        function McFormFieldBase(_elementRef) {
            this._elementRef = _elementRef;
        }
        return McFormFieldBase;
    }());
    // tslint:disable-next-line:naming-convention
    var McFormFieldMixinBase = core.mixinColor(McFormFieldBase);
    var McFormField = /** @class */ (function (_super) {
        __extends(McFormField, _super);
        // tslint:disable-next-line:naming-convention
        function McFormField(_elementRef, _changeDetectorRef) {
            var _this = _super.call(this, _elementRef) || this;
            _this._elementRef = _elementRef;
            _this._changeDetectorRef = _changeDetectorRef;
            // Unique id for the internal form field label.
            _this.labelId = "mc-form-field-label-" + nextUniqueId++;
            _this.hovered = false;
            _this.canCleanerClearByEsc = true;
            _this.$unsubscribe = new rxjs.Subject();
            return _this;
        }
        Object.defineProperty(McFormField.prototype, "hasHint", {
            get: function () {
                return this.hint && this.hint.length > 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McFormField.prototype, "hasSuffix", {
            get: function () {
                return this.suffix && this.suffix.length > 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McFormField.prototype, "hasPrefix", {
            get: function () {
                return this.prefix && this.prefix.length > 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McFormField.prototype, "hasCleaner", {
            get: function () {
                return !!this.cleaner;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McFormField.prototype, "hasStepper", {
            get: function () {
                return !!this.stepper;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McFormField.prototype, "canShowCleaner", {
            get: function () {
                return this.hasCleaner &&
                    this.control &&
                    this.control.ngControl
                    ? this.control.ngControl.value && !this.control.disabled
                    : false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McFormField.prototype, "disabled", {
            get: function () {
                return this.control && this.control.disabled;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McFormField.prototype, "canShowStepper", {
            get: function () {
                var _a;
                return this.hasStepper &&
                    !this.disabled &&
                    (((_a = this.control) === null || _a === void 0 ? void 0 : _a.focused) || this.hovered);
            },
            enumerable: false,
            configurable: true
        });
        McFormField.prototype.ngAfterContentInit = function () {
            var _this = this;
            if (this.control.numberInput && this.hasCleaner) {
                this.cleaner = null;
                throw getMcFormFieldYouCanNotUseCleanerInNumberInputError();
            }
            this.validateControlChild();
            if (this.control.controlType) {
                this._elementRef.nativeElement.classList.add("mc-form-field-type-" + this.control.controlType);
            }
            // Subscribe to changes in the child control state in order to update the form field UI.
            this.control.stateChanges
                .pipe(operators.startWith())
                .subscribe(function () {
                _this._changeDetectorRef.markForCheck();
            });
            if (this.hasStepper) {
                this.stepper.connectTo(this.control.numberInput);
            }
            // Run change detection if the value changes.
            var valueChanges = this.control.ngControl && this.control.ngControl.valueChanges || rxjs.EMPTY;
            rxjs.merge(valueChanges)
                .pipe(operators.takeUntil(this.$unsubscribe))
                .subscribe(function () { return _this._changeDetectorRef.markForCheck(); });
        };
        McFormField.prototype.ngAfterContentChecked = function () {
            this.validateControlChild();
        };
        McFormField.prototype.ngAfterViewInit = function () {
            // Avoid animations on load.
            this._changeDetectorRef.detectChanges();
        };
        McFormField.prototype.clearValue = function ($event) {
            $event.stopPropagation();
            if (this.control && this.control.ngControl) {
                this.control.ngControl.reset();
                this.control.focus();
            }
        };
        McFormField.prototype.onContainerClick = function ($event) {
            if (this.control.onContainerClick) {
                this.control.onContainerClick($event);
            }
        };
        McFormField.prototype.onKeyDown = function (event) {
            // tslint:disable-next-line:deprecation
            if (this.canCleanerClearByEsc && event.keyCode === keycodes.ESCAPE && this.control.focused && this.hasCleaner) {
                if (this.control && this.control.ngControl) {
                    this.control.ngControl.reset();
                }
                event.preventDefault();
            }
        };
        McFormField.prototype.onHoverChanged = function (isHovered) {
            if (isHovered !== this.hovered) {
                this.hovered = isHovered;
                this._changeDetectorRef.markForCheck();
            }
        };
        /**
         * Gets an ElementRef for the element that a overlay attached to the form-field should be
         * positioned relative to.
         */
        McFormField.prototype.getConnectedOverlayOrigin = function () {
            return this.connectionContainerRef || this._elementRef;
        };
        /** Determines whether a class from the NgControl should be forwarded to the host element. */
        McFormField.prototype.shouldForward = function (prop) {
            var ngControl = this.control ? this.control.ngControl : null;
            return ngControl && ngControl[prop];
        };
        McFormField.prototype.ngOnDestroy = function () {
            this.$unsubscribe.next();
            this.$unsubscribe.complete();
        };
        /** Throws an error if the form field's control is missing. */
        McFormField.prototype.validateControlChild = function () {
            if (!this.control) {
                throw getMcFormFieldMissingControlError();
            }
        };
        return McFormField;
    }(McFormFieldMixinBase));
    /** @nocollapse */ McFormField.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McFormField, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McFormField.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McFormField, selector: "mc-form-field", inputs: { color: "color" }, host: { listeners: { "keydown": "onKeyDown($event)", "mouseenter": "onHoverChanged(true)", "mouseleave": "onHoverChanged(false)" }, properties: { "class.mc-form-field_invalid": "control.errorState", "class.mc-form-field_has-prefix": "hasPrefix", "class.mc-form-field_has-suffix": "hasSuffix", "class.mc-form-field_has-cleaner": "canShowCleaner", "class.mc-form-field_has-stepper": "canShowStepper", "class.mc-disabled": "control.disabled", "class.mc-focused": "control.focused", "class.ng-untouched": "shouldForward(\"untouched\")", "class.ng-touched": "shouldForward(\"touched\")", "class.ng-pristine": "shouldForward(\"pristine\")", "class.ng-dirty": "shouldForward(\"dirty\")", "class.ng-valid": "shouldForward(\"valid\")", "class.ng-invalid": "shouldForward(\"invalid\")", "class.ng-pending": "shouldForward(\"pending\")" }, classAttribute: "mc-form-field" }, queries: [{ propertyName: "control", first: true, predicate: McFormFieldControl, descendants: true }, { propertyName: "stepper", first: true, predicate: McStepper, descendants: true }, { propertyName: "cleaner", first: true, predicate: McCleaner, descendants: true }, { propertyName: "hint", predicate: McHint }, { propertyName: "suffix", predicate: McSuffix }, { propertyName: "prefix", predicate: McPrefix }], viewQueries: [{ propertyName: "connectionContainerRef", first: true, predicate: ["connectionContainer"], descendants: true, static: true }], exportAs: ["mcFormField"], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"mc-form-field__container\" (click)=\"onContainerClick($event)\">\n\n    <div class=\"mc-form-field__prefix\" *ngIf=\"hasPrefix\">\n        <ng-content select=\"[mcPrefix]\"></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__infix\">\n        <ng-content></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__suffix\" *ngIf=\"hasSuffix\">\n        <ng-content select=\"[mcSuffix]\"></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__cleaner\"\n         *ngIf=\"canShowCleaner && !hasSuffix\"\n         (click)=\"clearValue($event)\">\n        <ng-content select=\"mc-cleaner\"></ng-content>\n    </div>\n\n    <ng-content *ngIf=\"canShowStepper\" select=\"mc-stepper\"></ng-content>\n</div>\n\n<div class=\"mc-form-field__hint\">\n    <ng-content select=\"mc-hint\"></ng-content>\n</div>\n", styles: [".mc-form-field{position:relative;display:inline-block;width:100%;border-radius:3px;border-radius:var(--mc-form-field-size-border-radius, 3px)}.mc-form-field:hover{z-index:1}.mc-form-field.mc-focused{z-index:2}.mc-hint{display:block}.mc-form-field__hint>.mc-hint{margin-top:4px;margin-top:var(--mc-form-field-hint-size-margin-top, 4px)}.mc-form-field__container{position:relative;border-width:1px;border-width:var(--mc-form-field-size-border-width, 1px);border-style:solid;border-color:transparent;border-radius:3px;border-radius:var(--mc-form-field-size-border-radius, 3px)}.mc-form-field_without-borders .mc-form-field__container{border-color:transparent}.mc-form-field__prefix,.mc-form-field__suffix{position:absolute;top:0;bottom:0;width:32px;display:flex;flex-direction:row;justify-content:center;align-items:center}.mc-form-field__prefix{left:0}.mc-form-field__suffix{right:0}.mc-form-field_has-suffix .mc-input,.mc-form-field_has-cleaner .mc-input,.mc-form-field_has-stepper .mc-input{padding-right:32px;padding-right:var(--mc-form-field-size-button-width, 32px)}.mc-form-field_has-prefix .mc-input{padding-left:32px;padding-left:var(--mc-form-field-size-button-width, 32px)}.mc-cleaner{display:flex;width:32px;width:var(--mc-form-field-size-button-width, 32px);height:100%;cursor:pointer}.mc-cleaner .mc-icon{display:flex;align-items:center;justify-content:center;width:100%;height:100%}.mc-form-field__cleaner .mc-cleaner{position:absolute;top:0;bottom:0;right:0}mc-stepper{position:absolute;display:flex;flex-direction:column;justify-content:center;align-items:center;top:0;bottom:0;right:0;width:32px;width:var(--mc-form-field-size-button-width, 32px)}mc-stepper .mc-stepper-step-up,mc-stepper .mc-stepper-step-down{cursor:pointer;width:32px;width:var(--mc-form-field-size-button-width, 32px);text-align:center}mc-stepper .mc-stepper-step-up{transform:scaleY(-1)}\n", ".mc-input{background:transparent;margin:0;border:none;outline:none;box-sizing:border-box;padding:5px 16px;padding:var(--mc-input-size-padding, 5px 16px);width:100%;width:var(--mc-input-size-width, 100%);min-height:30px;min-height:var(--mc-input-size-min-height, 30px)}.mc-input::-ms-clear{display:none;width:0;height:0}.mc-input::-ms-reveal{display:none;width:0;height:0}.mc-input::-webkit-search-decoration,.mc-input::-webkit-search-cancel-button,.mc-input::-webkit-search-results-button,.mc-input::-webkit-search-results-decoration{display:none}.mc-input{display:inline-block}input.mc-input[type=number]{-moz-appearance:textfield}input.mc-input[type=number]::-webkit-inner-spin-button,input.mc-input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}input.mc-input:invalid{box-shadow:unset}\n", ".mc-timepicker{padding-right:calc(16px - 1px);padding-right:calc(var(--mc-timepicker-size-padding-right, 16px) - var(--mc-form-field-size-border-width, 1px))}.mc-form-field-type-timepicker{width:auto}\n", ".mc-form-field-type-datepicker{width:auto}.mc-datepicker{width:130px;width:var(--mc-datepicker-input-size-width, 130px)}\n", ".mc-textarea{background:transparent;margin:0;border:none;outline:none;resize:none;overflow:auto;width:100%;box-sizing:border-box;padding:5px 16px;padding:var(--mc-textarea-size-padding, 5px 16px)}.mc-textarea{display:inline-block;-webkit-appearance:none;vertical-align:bottom}.mc-textarea:not(.mc-textarea-resizable){box-sizing:border-box;overflow-y:hidden}.mc-textarea.mc-textarea-resizable{resize:vertical;min-height:50px;min-height:var(--mc-textarea-size-min-height, 50px)}.mc-textarea:invalid{box-shadow:unset}\n"], directives: [{ type: i1__namespace$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McFormField, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-form-field',
                        exportAs: 'mcFormField',
                        templateUrl: 'form-field.html',
                        // McInput is a directive and can't have styles, so we need to include its styles here.
                        // The McInput styles are fairly minimal so it shouldn't be a big deal for people who
                        // aren't using McInput.
                        styleUrls: [
                            'form-field.scss',
                            '../input/input.scss',
                            '../timepicker/timepicker.scss',
                            '../datepicker/datepicker-input.scss',
                            '../textarea/textarea.scss'
                        ],
                        host: {
                            class: 'mc-form-field',
                            '[class.mc-form-field_invalid]': 'control.errorState',
                            '[class.mc-form-field_has-prefix]': 'hasPrefix',
                            '[class.mc-form-field_has-suffix]': 'hasSuffix',
                            '[class.mc-form-field_has-cleaner]': 'canShowCleaner',
                            '[class.mc-form-field_has-stepper]': 'canShowStepper',
                            '[class.mc-disabled]': 'control.disabled',
                            '[class.mc-focused]': 'control.focused',
                            '[class.ng-untouched]': 'shouldForward("untouched")',
                            '[class.ng-touched]': 'shouldForward("touched")',
                            '[class.ng-pristine]': 'shouldForward("pristine")',
                            '[class.ng-dirty]': 'shouldForward("dirty")',
                            '[class.ng-valid]': 'shouldForward("valid")',
                            '[class.ng-invalid]': 'shouldForward("invalid")',
                            '[class.ng-pending]': 'shouldForward("pending")',
                            '(keydown)': 'onKeyDown($event)',
                            '(mouseenter)': 'onHoverChanged(true)',
                            '(mouseleave)': 'onHoverChanged(false)'
                        },
                        inputs: ['color'],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { control: [{
                    type: i0.ContentChild,
                    args: [McFormFieldControl, { static: false }]
                }], stepper: [{
                    type: i0.ContentChild,
                    args: [McStepper, { static: false }]
                }], cleaner: [{
                    type: i0.ContentChild,
                    args: [McCleaner, { static: false }]
                }], hint: [{
                    type: i0.ContentChildren,
                    args: [McHint]
                }], suffix: [{
                    type: i0.ContentChildren,
                    args: [McSuffix]
                }], prefix: [{
                    type: i0.ContentChildren,
                    args: [McPrefix]
                }], connectionContainerRef: [{
                    type: i0.ViewChild,
                    args: ['connectionContainer', { static: true }]
                }] } });
    var McFormFieldWithoutBorders = /** @class */ (function () {
        function McFormFieldWithoutBorders() {
        }
        return McFormFieldWithoutBorders;
    }());
    /** @nocollapse */ McFormFieldWithoutBorders.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McFormFieldWithoutBorders, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McFormFieldWithoutBorders.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McFormFieldWithoutBorders, selector: "mc-form-field[mcFormFieldWithoutBorders]", host: { classAttribute: "mc-form-field_without-borders" }, exportAs: ["mcFormFieldWithoutBorders"], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McFormFieldWithoutBorders, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: 'mc-form-field[mcFormFieldWithoutBorders]',
                        exportAs: 'mcFormFieldWithoutBorders',
                        host: { class: 'mc-form-field_without-borders' }
                    }]
            }] });

    var McFormFieldModule = /** @class */ (function () {
        function McFormFieldModule() {
        }
        return McFormFieldModule;
    }());
    /** @nocollapse */ McFormFieldModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McFormFieldModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ McFormFieldModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McFormFieldModule, declarations: [McFormField,
            McFormFieldWithoutBorders,
            McHint,
            McPrefix,
            McSuffix,
            McCleaner,
            McStepper], imports: [i1$1.CommonModule, i1.McIconModule], exports: [McFormField,
            McFormFieldWithoutBorders,
            McHint,
            McPrefix,
            McSuffix,
            McCleaner,
            McStepper] });
    /** @nocollapse */ McFormFieldModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McFormFieldModule, imports: [[i1$1.CommonModule, i1.McIconModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McFormFieldModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            McFormField,
                            McFormFieldWithoutBorders,
                            McHint,
                            McPrefix,
                            McSuffix,
                            McCleaner,
                            McStepper
                        ],
                        imports: [i1$1.CommonModule, i1.McIconModule],
                        exports: [
                            McFormField,
                            McFormFieldWithoutBorders,
                            McHint,
                            McPrefix,
                            McSuffix,
                            McCleaner,
                            McStepper
                        ]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.McCleaner = McCleaner;
    exports.McFormField = McFormField;
    exports.McFormFieldBase = McFormFieldBase;
    exports.McFormFieldControl = McFormFieldControl;
    exports.McFormFieldMixinBase = McFormFieldMixinBase;
    exports.McFormFieldModule = McFormFieldModule;
    exports.McFormFieldWithoutBorders = McFormFieldWithoutBorders;
    exports.McHint = McHint;
    exports.McPrefix = McPrefix;
    exports.McStepper = McStepper;
    exports.McSuffix = McSuffix;
    exports.getMcFormFieldMissingControlError = getMcFormFieldMissingControlError;
    exports.getMcFormFieldYouCanNotUseCleanerInNumberInputError = getMcFormFieldYouCanNotUseCleanerInNumberInputError;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-form-field.umd.js.map
