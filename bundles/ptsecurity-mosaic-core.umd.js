(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/bidi'), require('@angular/core'), require('@angular/cdk/coercion'), require('rxjs'), require('@angular/forms'), require('@angular/common'), require('@angular/cdk/overlay'), require('@angular/animations'), require('@ptsecurity/cdk/keycodes')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/core', ['exports', '@angular/cdk/bidi', '@angular/core', '@angular/cdk/coercion', 'rxjs', '@angular/forms', '@angular/common', '@angular/cdk/overlay', '@angular/animations', '@ptsecurity/cdk/keycodes'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.core = {}), global.ng.cdk.bidi, global.ng.core, global.ng.cdk.coercion, global.rxjs, global.ng.forms, global.ng.common, global.ng.cdk.overlay, global.ng.animations, global.keycodes));
}(this, (function (exports, bidi, i0, coercion, rxjs, forms, i1, overlay, animations, keycodes) { 'use strict';

    function isBoolean(val) { return typeof val === 'boolean'; }
    function toBoolean(value) {
        return value != null && "" + value !== 'false';
    }

    // Injection token that configures whether the Mosaic sanity checks are enabled.
    var MC_SANITY_CHECKS = new i0.InjectionToken('mc-sanity-checks', {
        providedIn: 'root',
        factory: mcSanityChecksFactory
    });
    function mcSanityChecksFactory() {
        return true;
    }
    /**
     * Module that captures anything that should be loaded and/or run for *all* Mosaic
     * components. This includes Bidi, etc.
     *
     * This module should be imported to each top-level component module (e.g., McTabsModule).
     */
    var McCommonModule = /** @class */ (function () {
        function McCommonModule(_sanityChecksEnabled) {
            this._sanityChecksEnabled = _sanityChecksEnabled;
            // Whether we've done the global sanity checks (e.g. a theme is loaded, there is a doctype).
            this.hasDoneGlobalChecks = false;
            // Reference to the global `document` object.
            // tslint:disable-next-line: orthodox-getter-and-setter
            this._document = typeof document === 'object' && document ? document : null;
            // Reference to the global 'window' object.
            // tslint:disable-next-line: orthodox-getter-and-setter
            this._window = typeof window === 'object' && window ? window : null;
            if (this.areChecksEnabled() && !this.hasDoneGlobalChecks) {
                this.checkDoctypeIsDefined();
                this.checkThemeIsPresent();
                this.hasDoneGlobalChecks = true;
            }
        }
        // Whether any sanity checks are enabled
        McCommonModule.prototype.areChecksEnabled = function () {
            return this._sanityChecksEnabled && i0.isDevMode() && !this.isTestEnv();
        };
        // Whether the code is running in tests.
        McCommonModule.prototype.isTestEnv = function () {
            // tslint:disable-next-line
            return this._window && (this._window['__karma__'] || this._window['jasmine']);
        };
        McCommonModule.prototype.checkDoctypeIsDefined = function () {
            if (this._document && !this._document.doctype) {
                console.warn('Current document does not have a doctype. This may cause ' +
                    'some Mosaic components not to behave as expected.');
            }
        };
        McCommonModule.prototype.checkThemeIsPresent = function () {
            if (this._document && typeof getComputedStyle === 'function') {
                var testElement = this._document.createElement('div');
                testElement.classList.add('mc-theme-loaded-marker');
                this._document.body.appendChild(testElement);
                var computedStyle = getComputedStyle(testElement);
                // In some situations, the computed style of the test element can be null. For example in
                // Firefox, the computed style is null if an application is running inside of a hidden iframe.
                // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
                if (computedStyle && computedStyle.display !== 'none') {
                    console.warn('Could not find Mosaic core theme. Most Mosaic ' +
                        'components may not work as expected. For more info refer ' +
                        'to the theming guide: link there');
                }
                this._document.body.removeChild(testElement);
            }
        };
        return McCommonModule;
    }());
    McCommonModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [bidi.BidiModule],
                    exports: [bidi.BidiModule]
                },] }
    ];
    /** @nocollapse */
    McCommonModule.ctorParameters = function () { return [
        { type: Boolean, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [MC_SANITY_CHECKS,] }] }
    ]; };

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
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
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

    function mixinDisabled(base) {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, __spread(args)) || this;
                _this._disabled = false;
                return _this;
            }
            Object.defineProperty(class_1.prototype, "disabled", {
                get: function () {
                    return this._disabled;
                },
                set: function (value) {
                    this._disabled = coercion.coerceBooleanProperty(value);
                },
                enumerable: false,
                configurable: true
            });
            return class_1;
        }(base));
    }

    exports.ThemePalette = void 0;
    (function (ThemePalette) {
        ThemePalette["Primary"] = "primary";
        ThemePalette["Second"] = "second";
        ThemePalette["Error"] = "error";
        ThemePalette["Default"] = "second";
        ThemePalette["Empty"] = "";
    })(exports.ThemePalette || (exports.ThemePalette = {}));
    /** Mixin to augment a directive with a `color` property. */
    function mixinColor(base, defaultColor) {
        if (defaultColor === void 0) { defaultColor = exports.ThemePalette.Default; }
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, __spread(args)) || this;
                _this.color = defaultColor;
                return _this;
            }
            Object.defineProperty(class_1.prototype, "color", {
                get: function () {
                    return this._color;
                },
                set: function (value) {
                    var colorPalette = value || defaultColor;
                    if (colorPalette !== this._color) {
                        if (this._color) {
                            this._elementRef.nativeElement.classList.remove("mc-" + this._color);
                        }
                        if (colorPalette) {
                            this._elementRef.nativeElement.classList.add("mc-" + colorPalette);
                        }
                        this._color = colorPalette;
                    }
                },
                enumerable: false,
                configurable: true
            });
            return class_1;
        }(base));
    }

    // Mixin to augment a directive with a `tabIndex` property.
    function mixinTabIndex(base, defaultTabIndex) {
        if (defaultTabIndex === void 0) { defaultTabIndex = 0; }
        // Note: We cast `base` to `unknown` and then `Constructor`. It could be an abstract class,
        // but given we `extend` it from another class, we can assume a constructor being accessible.
        // tslint:disable-next-line:naming-convention
        var Mixin = /** @class */ (function (_super) {
            __extends(Mixin, _super);
            function Mixin() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, __spread(args)) || this;
                // tslint:disable-next-line:orthodox-getter-and-setter
                _this._tabIndex = defaultTabIndex;
                _this.defaultTabIndex = defaultTabIndex;
                return _this;
            }
            Object.defineProperty(Mixin.prototype, "tabIndex", {
                get: function () { return this.disabled ? -1 : this._tabIndex; },
                set: function (value) {
                    // If the specified tabIndex value is null or undefined, fall back to the default value.
                    this._tabIndex = value != null ? coercion.coerceNumberProperty(value) : this.defaultTabIndex;
                },
                enumerable: false,
                configurable: true
            });
            return Mixin;
        }(base));
        // Since we don't directly extend from `base` with it's original types, and we instruct
        // TypeScript that `T` actually is instantiatable through `new`, the types don't overlap.
        // This is a limitation in TS as abstract classes cannot be typed properly dynamically.
        return Mixin;
    }

    /**
     * Mixin to augment a directive with updateErrorState method.
     * For component with `errorState` and need to update `errorState`.
     */
    function mixinErrorState(base) {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, __spread(args)) || this;
                /** Whether the component is in an error state. */
                _this.errorState = false;
                /**
                 * Stream that emits whenever the state of the input changes such that the wrapping
                 * `MatFormField` needs to run change detection.
                 */
                _this.stateChanges = new rxjs.Subject();
                return _this;
            }
            class_1.prototype.updateErrorState = function () {
                var oldState = this.errorState;
                var parent = this.parentFormGroup || this.parentForm;
                var matcher = this.errorStateMatcher || this.defaultErrorStateMatcher;
                var control = this.ngControl ? this.ngControl.control : null;
                var newState = matcher.isErrorState(control, parent);
                if (newState !== oldState) {
                    this.errorState = newState;
                    this.stateChanges.next();
                }
            };
            return class_1;
        }(base));
    }

    /**
     * Shared directive to count lines inside a text area, such as a list item.
     * Line elements can be extracted with a @ContentChildren(McLine) query, then
     * counted by checking the query list's length.
     */
    var McLine = /** @class */ (function () {
        function McLine() {
        }
        return McLine;
    }());
    McLine.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[mc-line], [mcLine]',
                    host: { class: 'mc-line' }
                },] }
    ];
    /**
     * Helper that takes a query list of lines and sets the correct class on the host.
     * @docs-private
     */
    var McLineSetter = /** @class */ (function () {
        function McLineSetter(_lines, _element) {
            var _this = this;
            this._lines = _lines;
            this._element = _element;
            this.setLineClass(this._lines.length);
            this._lines.changes.subscribe(function () {
                _this.setLineClass(_this._lines.length);
            });
        }
        McLineSetter.prototype.setLineClass = function (count) {
            var minLineClassNumber = 2;
            var maxLineClassNumber = 3;
            this.resetClasses();
            if (count === minLineClassNumber || count === maxLineClassNumber) {
                this.setClass("mc-" + count + "-line", true);
            }
            else if (count > maxLineClassNumber) {
                this.setClass("mc-multi-line", true);
            }
        };
        McLineSetter.prototype.resetClasses = function () {
            this.setClass('mc-2-line', false);
            this.setClass('mc-3-line', false);
            this.setClass('mc-multi-line', false);
        };
        McLineSetter.prototype.setClass = function (className, isAdd) {
            if (isAdd) {
                this._element.nativeElement.classList.add(className);
            }
            else {
                this._element.nativeElement.classList.remove(className);
            }
        };
        return McLineSetter;
    }());
    var McLineModule = /** @class */ (function () {
        function McLineModule() {
        }
        return McLineModule;
    }());
    McLineModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [],
                    exports: [McLine],
                    declarations: [McLine]
                },] }
    ];

    /** Error state matcher that matches when a control is invalid and dirty. */
    var ShowOnDirtyErrorStateMatcher = /** @class */ (function () {
        function ShowOnDirtyErrorStateMatcher() {
        }
        ShowOnDirtyErrorStateMatcher.prototype.isErrorState = function (control, form) {
            return !!(control && control.invalid && (control.dirty || (form && form.submitted)));
        };
        return ShowOnDirtyErrorStateMatcher;
    }());
    ShowOnDirtyErrorStateMatcher.decorators = [
        { type: i0.Injectable }
    ];
    /** Provider that defines how form controls behave with regards to displaying error messages. */
    var ErrorStateMatcher = /** @class */ (function () {
        function ErrorStateMatcher() {
        }
        ErrorStateMatcher.prototype.isErrorState = function (control, form) {
            return !!(control && control.invalid && (control.touched || (form && form.submitted)));
        };
        return ErrorStateMatcher;
    }());
    /** @nocollapse */ ErrorStateMatcher.ɵprov = i0.ɵɵdefineInjectable({ factory: function ErrorStateMatcher_Factory() { return new ErrorStateMatcher(); }, token: ErrorStateMatcher, providedIn: "root" });
    ErrorStateMatcher.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];

    /* tslint:disable:naming-convention */
    var MC_LOCALE_ID = new i0.InjectionToken('McLocaleId');
    var DEFAULT_MC_LOCALE_ID = 'ru';
    function isEmpty(value) {
        return value == null || value === '' || value !== value;
    }
    function strToNumber(value) {
        if (typeof value === 'string' && !isNaN(Number(value) - parseFloat(value))) {
            return Number(value);
        }
        if (typeof value !== 'number') {
            throw new Error(value + " is not a number");
        }
        return value;
    }
    var NUMBER_FORMAT_REGEXP = /^(\d+)?\.((\d+)(-(\d+))?)?$/;
    var minIntGroupPosition = 1;
    var minFractionGroupPosition = 3;
    var maxFractionGroupPosition = 5;
    var ParsedDigitsInfo = /** @class */ (function () {
        function ParsedDigitsInfo() {
        }
        return ParsedDigitsInfo;
    }());
    function parseDigitsInfo(digitsInfo) {
        var parts = digitsInfo.match(NUMBER_FORMAT_REGEXP);
        if (parts === null) {
            throw new Error(digitsInfo + " is not a valid digit info");
        }
        var minIntPart = parts[minIntGroupPosition];
        var minFractionPart = parts[minFractionGroupPosition];
        var maxFractionPart = parts[maxFractionGroupPosition];
        var result = new ParsedDigitsInfo();
        if (minIntPart != null) {
            result.minimumIntegerDigits = parseInt(minIntPart);
        }
        if (minFractionPart != null) {
            result.minimumFractionDigits = parseInt(minFractionPart);
        }
        if (maxFractionPart != null) {
            result.maximumFractionDigits = parseInt(maxFractionPart);
        }
        else if (minFractionPart != null && result.minimumFractionDigits > result.maximumFractionDigits) {
            result.maximumFractionDigits = result.minimumFractionDigits;
        }
        return result;
    }
    var McDecimalPipe = /** @class */ (function () {
        function McDecimalPipe(_locale) {
            this._locale = _locale;
        }
        /**
         * @param value The number to be formatted.
         * @param digitsInfo Decimal representation options, specified by a string
         * in the following format:<br>
         * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>.
         *   - `minIntegerDigits`: The minimum number of integer digits before the decimal point.
         * Default is `1`.
         *   - `minFractionDigits`: The minimum number of digits after the decimal point.
         * Default is `0`.
         *   - `maxFractionDigits`: The maximum number of digits after the decimal point.
         * Default is `3`.
         * @param locale A locale code for the locale format rules to use.
         * When not supplied, uses the value of `MC_LOCALE_ID`, which is `ru` by default.
         */
        McDecimalPipe.prototype.transform = function (value, digitsInfo, locale) {
            if (isEmpty(value)) {
                return null;
            }
            var currentLocale = locale || this._locale || DEFAULT_MC_LOCALE_ID;
            var parsedDigitsInfo;
            if (digitsInfo) {
                parsedDigitsInfo = parseDigitsInfo(digitsInfo);
            }
            var options = Object.assign({ useGrouping: true, minimumIntegerDigits: 1, minimumFractionDigits: 0, maximumFractionDigits: 3 }, parsedDigitsInfo);
            try {
                var num = strToNumber(value);
                return Intl.NumberFormat.call(this, currentLocale, options).format(num);
            }
            catch (error) {
                throw Error("InvalidPipeArgument: McDecimalPipe for pipe '" + JSON.stringify(error.message) + "'");
            }
        };
        return McDecimalPipe;
    }());
    /** @nocollapse */ McDecimalPipe.ɵprov = i0.ɵɵdefineInjectable({ factory: function McDecimalPipe_Factory() { return new McDecimalPipe(i0.ɵɵinject(MC_LOCALE_ID, 8)); }, token: McDecimalPipe, providedIn: "root" });
    McDecimalPipe.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] },
        { type: i0.Pipe, args: [{ name: 'mcNumber' },] }
    ];
    /** @nocollapse */
    McDecimalPipe.ctorParameters = function () { return [
        { type: String, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [MC_LOCALE_ID,] }] }
    ]; };

    var McFormattersModule = /** @class */ (function () {
        function McFormattersModule() {
        }
        return McFormattersModule;
    }());
    McFormattersModule.decorators = [
        { type: i0.NgModule, args: [{
                    exports: [
                        McDecimalPipe
                    ],
                    declarations: [
                        McDecimalPipe
                    ]
                },] }
    ];

    var MC_VALIDATION = new i0.InjectionToken('McUseValidation', { factory: function () { return ({ useValidation: true }); } });
    function setValidState(control, validator) {
        if (!control) {
            return;
        }
        control.clearValidators();
        control.updateValueAndValidity({ emitEvent: false });
        control.setValidators(validator);
    }
    /** This function do next:
     * - run validation on submitting parent form
     * - prevent validation in required validator if form doesn't submitted
     * - if control has focus validation will be prevented
     */
    function setMosaicValidation(component) {
        var ngControl = component.ngControl;
        if (!ngControl) {
            return;
        }
        var parentForm = component.parentForm || component.parentFormGroup;
        if (parentForm) {
            parentForm.ngSubmit.subscribe(function () {
                // tslint:disable-next-line: no-unnecessary-type-assertion
                ngControl.control.updateValueAndValidity({ emitEvent: false });
            });
        }
        if (component.ngModel) {
            setMosaicValidationForModelControl(component, component.rawValidators, parentForm);
        }
        else if (component.formControlName || component.ngControl) {
            setMosaicValidationForFormControl(component, parentForm, ngControl);
        }
    }
    function setMosaicValidationForModelControl(component, validators, parentForm) {
        if (!validators) {
            return;
        }
        validators.forEach(function (validator) {
            // tslint:disable-next-line: no-unbound-method
            var originalValidate = validator.validate;
            if (validator instanceof forms.RequiredValidator) {
                // changed required validation logic
                validator.validate = function (control) {
                    if (parentForm && !parentForm.submitted) {
                        return null;
                    }
                    return originalValidate.call(validator, control);
                };
            }
            else {
                // changed all other validation logic
                validator.validate = function (control) {
                    if (component.focused) {
                        return null;
                    }
                    return originalValidate.call(validator, control);
                };
            }
        });
    }
    function setMosaicValidationForFormControl(component, parentForm, ngControl) {
        var originalValidator = ngControl.control.validator;
        // changed required validation logic after initialization
        if (ngControl.invalid && ngControl.errors.required) {
            Promise.resolve().then(function () { return setValidState(ngControl.control, originalValidator); });
        }
        // check dynamic updates
        ngControl.statusChanges
            .subscribe(function () {
            // changed required validation logic
            if (ngControl.invalid && (parentForm && !parentForm.submitted) && ngControl.errors.required) {
                setValidState(ngControl.control, originalValidator);
            }
            // changed all other validation logic
            if (ngControl.invalid && component.focused) {
                setValidState(ngControl.control, originalValidator);
            }
        });
    }

    var McHighlightPipe = /** @class */ (function () {
        function McHighlightPipe() {
        }
        McHighlightPipe.prototype.transform = function (value, args) {
            if (!args) {
                return value;
            }
            return value.replace(new RegExp("(" + args + ")", 'gi'), '<mark class="mc-highlight">$1</mark>');
        };
        return McHighlightPipe;
    }());
    McHighlightPipe.decorators = [
        { type: i0.Pipe, args: [{ name: 'mcHighlight' },] }
    ];

    var McHighlightModule = /** @class */ (function () {
        function McHighlightModule() {
        }
        return McHighlightModule;
    }());
    McHighlightModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [i1.CommonModule],
                    exports: [McHighlightPipe],
                    declarations: [McHighlightPipe]
                },] }
    ];

    var selectEvents = 'selectEvents';

    /**
     * Returns an exception to be thrown when attempting to change a select's `multiple` option
     * after initialization.
     * @docs-private
     */
    function getMcSelectDynamicMultipleError() {
        return Error('Cannot change `multiple` mode of select after initialization.');
    }
    /**
     * Returns an exception to be thrown when attempting to assign a non-array value to a select
     * in `multiple` mode. Note that `undefined` and `null` are still valid values to allow for
     * resetting the value.
     * @docs-private
     */
    function getMcSelectNonArrayValueError() {
        return Error('Value must be an array in multiple-selection mode.');
    }
    /**
     * Returns an exception to be thrown when assigning a non-function value to the comparator
     * used to determine if a value corresponds to an option. Note that whether the function
     * actually takes two values and returns a boolean is not checked.
     */
    function getMcSelectNonFunctionValueError() {
        return Error('`compareWith` must be a function.');
    }

    /** The max height of the select's overlay panel */
    var SELECT_PANEL_MAX_HEIGHT = 224;
    /** The panel's padding on the x-axis */
    var SELECT_PANEL_PADDING_X = 1;
    /** The panel's x axis padding if it is indented (e.g. there is an option group). */
    /* tslint:disable-next-line:no-magic-numbers */
    var SELECT_PANEL_INDENT_PADDING_X = SELECT_PANEL_PADDING_X * 2;
    /**
     * The select panel will only "fit" inside the viewport if it is positioned at
     * this value or more away from the viewport boundary.
     */
    var SELECT_PANEL_VIEWPORT_PADDING = 8;
    /** Injection token that determines the scroll handling while a select is open. */
    var MC_SELECT_SCROLL_STRATEGY = new i0.InjectionToken('mc-select-scroll-strategy');
    /** @docs-private */
    function mcSelectScrollStrategyProviderFactory(overlay) {
        return function () { return overlay.scrollStrategies.reposition(); };
    }
    /** @docs-private */
    var MC_SELECT_SCROLL_STRATEGY_PROVIDER = {
        provide: MC_SELECT_SCROLL_STRATEGY,
        deps: [overlay.Overlay],
        useFactory: mcSelectScrollStrategyProviderFactory
    };

    var POSITION_MAP = {
        top: {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom'
        },
        topCenter: {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom'
        },
        topLeft: {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom'
        },
        topRight: {
            originX: 'end',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'bottom'
        },
        right: {
            originX: 'end',
            originY: 'center',
            overlayX: 'start',
            overlayY: 'center'
        },
        rightTop: {
            originX: 'end',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'top'
        },
        rightBottom: {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'bottom'
        },
        bottom: {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top'
        },
        bottomCenter: {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top'
        },
        bottomLeft: {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top'
        },
        bottomRight: {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top'
        },
        left: {
            originX: 'start',
            originY: 'center',
            overlayX: 'end',
            overlayY: 'center'
        },
        leftTop: {
            originX: 'start',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'top'
        },
        leftBottom: {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'bottom'
        }
    };
    var DEFAULT_4_POSITIONS = objectValues([
        POSITION_MAP.top, POSITION_MAP.right, POSITION_MAP.bottom, POSITION_MAP.left
    ]);
    var EXTENDED_OVERLAY_POSITIONS = objectValues([
        POSITION_MAP.top, POSITION_MAP.topLeft, POSITION_MAP.topRight, POSITION_MAP.right, POSITION_MAP.rightTop,
        POSITION_MAP.rightBottom, POSITION_MAP.bottom, POSITION_MAP.bottomLeft, POSITION_MAP.bottomRight,
        POSITION_MAP.left, POSITION_MAP.leftTop, POSITION_MAP.leftBottom
    ]);
    var TOP_POSITION_PRIORITY = objectValues([
        POSITION_MAP.top,
        POSITION_MAP.bottom,
        POSITION_MAP.rightBottom,
        POSITION_MAP.leftBottom,
        POSITION_MAP.bottomLeft,
        POSITION_MAP.bottomRight
    ]);
    var BOTTOM_POSITION_PRIORITY = objectValues([
        POSITION_MAP.bottom,
        POSITION_MAP.top,
        POSITION_MAP.topLeft,
        POSITION_MAP.topRight,
        POSITION_MAP.rightBottom,
        POSITION_MAP.leftBottom
    ]);
    var RIGHT_POSITION_PRIORITY = objectValues([
        POSITION_MAP.right,
        POSITION_MAP.left,
        POSITION_MAP.leftTop,
        POSITION_MAP.leftBottom,
        POSITION_MAP.top,
        POSITION_MAP.bottom
    ]);
    var LEFT_POSITION_PRIORITY = objectValues([
        POSITION_MAP.left,
        POSITION_MAP.right,
        POSITION_MAP.rightTop,
        POSITION_MAP.rightBottom,
        POSITION_MAP.top,
        POSITION_MAP.bottom
    ]);
    var RIGHT_TOP_POSITION_PRIORITY = objectValues([
        POSITION_MAP.rightTop,
        POSITION_MAP.leftTop,
        POSITION_MAP.left,
        POSITION_MAP.leftBottom,
        POSITION_MAP.topLeft,
        POSITION_MAP.bottomLeft
    ]);
    var RIGHT_BOTTOM_POSITION_PRIORITY = objectValues([
        POSITION_MAP.rightBottom,
        POSITION_MAP.leftBottom,
        POSITION_MAP.left,
        POSITION_MAP.leftTop,
        POSITION_MAP.topLeft,
        POSITION_MAP.bottomLeft
    ]);
    var LEFT_TOP_POSITION_PRIORITY = objectValues([
        POSITION_MAP.leftTop,
        POSITION_MAP.rightTop,
        POSITION_MAP.right,
        POSITION_MAP.rightBottom,
        POSITION_MAP.topRight,
        POSITION_MAP.bottomRight
    ]);
    var LEFT_BOTTOM_POSITION_PRIORITY = objectValues([
        POSITION_MAP.leftBottom,
        POSITION_MAP.rightBottom,
        POSITION_MAP.right,
        POSITION_MAP.rightTop,
        POSITION_MAP.topRight,
        POSITION_MAP.bottomRight
    ]);
    var TOP_LEFT_POSITION_PRIORITY = objectValues([
        POSITION_MAP.topLeft,
        POSITION_MAP.topRight,
        POSITION_MAP.bottomLeft,
        POSITION_MAP.bottom,
        POSITION_MAP.bottomRight,
        POSITION_MAP.leftBottom,
        POSITION_MAP.rightBottom
    ]);
    var TOP_RIGHT_POSITION_PRIORITY = objectValues([
        POSITION_MAP.topRight,
        POSITION_MAP.topLeft,
        POSITION_MAP.bottomRight,
        POSITION_MAP.bottom,
        POSITION_MAP.bottomLeft,
        POSITION_MAP.leftBottom,
        POSITION_MAP.rightBottom
    ]);
    var BOTTOM_RIGHT_POSITION_PRIORITY = objectValues([
        POSITION_MAP.bottomRight,
        POSITION_MAP.bottomLeft,
        POSITION_MAP.topRight,
        POSITION_MAP.top,
        POSITION_MAP.topLeft,
        POSITION_MAP.leftTop,
        POSITION_MAP.rightTop
    ]);
    var BOTTOM_LEFT_POSITION_PRIORITY = objectValues([
        POSITION_MAP.bottomLeft,
        POSITION_MAP.bottomRight,
        POSITION_MAP.topLeft,
        POSITION_MAP.top,
        POSITION_MAP.topRight,
        POSITION_MAP.rightTop,
        POSITION_MAP.leftTop
    ]);
    var POSITION_PRIORITY_STRATEGY = {
        top: TOP_POSITION_PRIORITY,
        topLeft: TOP_LEFT_POSITION_PRIORITY,
        topRight: TOP_RIGHT_POSITION_PRIORITY,
        bottom: BOTTOM_POSITION_PRIORITY,
        bottomLeft: BOTTOM_LEFT_POSITION_PRIORITY,
        bottomRight: BOTTOM_RIGHT_POSITION_PRIORITY,
        left: LEFT_POSITION_PRIORITY,
        leftTop: LEFT_TOP_POSITION_PRIORITY,
        leftBottom: LEFT_BOTTOM_POSITION_PRIORITY,
        right: RIGHT_POSITION_PRIORITY,
        rightTop: RIGHT_TOP_POSITION_PRIORITY,
        rightBottom: RIGHT_BOTTOM_POSITION_PRIORITY
    };
    var POSITION_TO_CSS_MAP = {
        top: 'top',
        topLeft: 'top-left',
        topRight: 'top-right',
        right: 'right',
        rightTop: 'right-top',
        rightBottom: 'right-bottom',
        left: 'left',
        leftTop: 'left-top',
        leftBottom: 'left-bottom',
        bottom: 'bottom',
        bottomLeft: 'bottom-left',
        bottomRight: 'bottom-right'
    };
    var DEFAULT_4_POSITIONS_TO_CSS_MAP = {
        top: 'top',
        bottom: 'bottom',
        right: 'right',
        left: 'left'
    };
    function arrayMap(array, iteratee) {
        var index = -1;
        var length = array == null ? 0 : array.length;
        var result = Array(length);
        while (++index < length) {
            result[index] = iteratee(array[index], index, array);
        }
        return result;
    }
    function baseValues(object, props) {
        return arrayMap(props, function (key) {
            return object[key];
        });
    }
    function objectValues(object) {
        return object == null ? [] : baseValues(object, Object.keys(object));
    }

    var fadeAnimation = animations.trigger('fadeAnimation', [
        animations.state('void', animations.style({ opacity: 0 })),
        animations.state('true', animations.style({ opacity: 1 })),
        animations.state('false', animations.style({ opacity: 0 })),
        animations.transition('* => true', animations.animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
        animations.transition('* => void', animations.animate('150ms cubic-bezier(0.4, 0.0, 1, 1)'))
    ]);

    exports.AnimationCurves = void 0;
    (function (AnimationCurves) {
        AnimationCurves["StandardCurve"] = "cubic-bezier(0.4,0.0,0.2,1)";
        AnimationCurves["DecelerationCurve"] = "cubic-bezier(0.0,0.0,0.2,1)";
        AnimationCurves["AccelerationCurve"] = "cubic-bezier(0.4,0.0,1,1)";
        AnimationCurves["SharpCurve"] = "cubic-bezier(0.4,0.0,0.6,1)";
    })(exports.AnimationCurves || (exports.AnimationCurves = {}));

    /**
     * The following are all the animations for the mc-select component, with each
     * const containing the metadata for one animation.
     *
     */
    var mcSelectAnimations = {
        /**
         * This animation transforms the select's overlay panel on and off the page.
         *
         * When the panel is attached to the DOM, it expands its width by the amount of padding, scales it
         * up to 100% on the Y axis, fades in its border, and translates slightly up and to the
         * side to ensure the option text correctly overlaps the trigger text.
         *
         * When the panel is removed from the DOM, it simply fades out linearly.
         */
        transformPanel: animations.trigger('transformPanel', [
            animations.state('void', animations.style({
                transform: 'scaleY(0)',
                minWidth: '100%',
                opacity: 0
            })),
            animations.transition('void => *', animations.group([
                animations.animate('150ms cubic-bezier(0.25, 0.8, 0.25, 1)')
            ])),
            animations.transition('* => void', [
                animations.animate('250ms 100ms linear', animations.style({ opacity: 0 }))
            ])
        ]),
        /**
         * This animation fades in the background color and text content of the
         * select's options. It is time delayed to occur 100ms after the overlay
         * panel has transformed in.
         */
        fadeInContent: animations.trigger('fadeInContent', [
            animations.state('showing', animations.style({ opacity: 1 })),
            animations.transition('void => showing', [
                animations.style({ opacity: 0 }),
                animations.animate('150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)')
            ])
        ])
    };
    var transformPanel = mcSelectAnimations.transformPanel;
    var fadeInContent = mcSelectAnimations.fadeInContent;

    /** InjectionToken that can be used to specify the global label options. */
    var MC_LABEL_GLOBAL_OPTIONS = new i0.InjectionToken('mc-label-global-options');

    exports.MultipleMode = void 0;
    (function (MultipleMode) {
        MultipleMode["CHECKBOX"] = "checkbox";
        MultipleMode["KEYBOARD"] = "keyboard";
    })(exports.MultipleMode || (exports.MultipleMode = {}));

    /**
     * Component that shows a simplified checkbox without including any kind of "real" checkbox.
     * Meant to be used when the checkbox is purely decorative and a large number of them will be
     * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
     * Note that theming is meant to be handled by the parent element, e.g.
     * `mc-primary .mc-pseudo-checkbox`.
     *
     * Note that this component will be completely invisible to screen-reader users. This is *not*
     * interchangeable with `<mc-checkbox>` and should *not* be used if the user would directly
     * interact with the checkbox. The pseudo-checkbox should only be used as an implementation detail
     * of more complex components that appropriately handle selected / checked state.
     * @docs-private
     */
    var McPseudoCheckbox = /** @class */ (function () {
        function McPseudoCheckbox() {
            this.state = 'unchecked';
            this.disabled = false;
        }
        return McPseudoCheckbox;
    }());
    McPseudoCheckbox.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mc-pseudo-checkbox',
                    template: "<i class=\"mc-checkbox-checkmark mc mc-check_16\"></i>\n<i class=\"mc-checkbox-mixedmark mc mc-minus_16\"></i>\n",
                    host: {
                        class: 'mc-pseudo-checkbox',
                        '[class.mc-indeterminate]': 'state === "indeterminate"',
                        '[class.mc-checked]': 'state === "checked"',
                        '[class.mc-disabled]': 'disabled'
                    },
                    preserveWhitespaces: false,
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: [".mc-pseudo-checkbox{position:relative;display:inline-block;box-sizing:border-box;width:var(--mc-checkbox-size-width,16px);height:var(--mc-checkbox-size-width,16px);border-radius:3px;border-width:var(--mc-checkbox-size-border-width,1px);border-style:solid;cursor:pointer;vertical-align:middle;flex-shrink:0}.mc-pseudo-checkbox .mc-checkbox-checkmark,.mc-pseudo-checkbox .mc-checkbox-mixedmark{display:none;position:absolute;top:calc(-1 * var(--mc-checkbox-size-border-width, 1px));left:calc(-1 * var(--mc-checkbox-size-border-width, 1px))}.mc-pseudo-checkbox.mc-pseudo-checkbox-checked,.mc-pseudo-checkbox.mc-pseudo-checkbox-indeterminate{border-color:transparent}.mc-pseudo-checkbox.mc-checked .mc-checkbox-checkmark,.mc-pseudo-checkbox.mc-indeterminate .mc-checkbox-mixedmark{display:inline-block}.mc-pseudo-checkbox.mc-disabled{cursor:default}"]
                },] }
    ];
    McPseudoCheckbox.propDecorators = {
        state: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }]
    };

    var McPseudoCheckboxModule = /** @class */ (function () {
        function McPseudoCheckboxModule() {
        }
        return McPseudoCheckboxModule;
    }());
    McPseudoCheckboxModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [i1.CommonModule],
                    exports: [McPseudoCheckbox],
                    declarations: [McPseudoCheckbox]
                },] }
    ];

    var McMeasureScrollbarService = /** @class */ (function () {
        function McMeasureScrollbarService(document) {
            this.document = document;
            this.scrollbarMeasure = {
                position: 'absolute',
                top: '-9999px',
                width: '50px',
                height: '50px',
                overflow: 'scroll'
            };
            this.initScrollBarWidth();
        }
        Object.defineProperty(McMeasureScrollbarService.prototype, "scrollBarWidth", {
            get: function () {
                if (this._scrollBarWidth) {
                    return this._scrollBarWidth;
                }
                this.initScrollBarWidth();
                return this._scrollBarWidth;
            },
            enumerable: false,
            configurable: true
        });
        McMeasureScrollbarService.prototype.initScrollBarWidth = function () {
            var scrollDiv = this.document.createElement('div');
            // tslint:disable-next-line
            for (var scrollProp in this.scrollbarMeasure) {
                if (this.scrollbarMeasure.hasOwnProperty(scrollProp)) {
                    scrollDiv.style[scrollProp] = this.scrollbarMeasure[scrollProp];
                }
            }
            this.document.body.appendChild(scrollDiv);
            var width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            this.document.body.removeChild(scrollDiv);
            this._scrollBarWidth = width;
        };
        return McMeasureScrollbarService;
    }());
    /** @nocollapse */ McMeasureScrollbarService.ɵprov = i0.ɵɵdefineInjectable({ factory: function McMeasureScrollbarService_Factory() { return new McMeasureScrollbarService(i0.ɵɵinject(i1.DOCUMENT)); }, token: McMeasureScrollbarService, providedIn: "root" });
    McMeasureScrollbarService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    McMeasureScrollbarService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [i1.DOCUMENT,] }] }
    ]; };

    /** @docs-private */
    var McOptgroupBase = /** @class */ (function () {
        function McOptgroupBase() {
        }
        return McOptgroupBase;
    }());
    // tslint:disable-next-line: naming-convention
    var McOptgroupMixinBase = mixinDisabled(McOptgroupBase);
    var uniqueOptgroupIdCounter = 0;
    /**
     * Component that is used to group instances of `mc-option`.
     */
    var McOptgroup = /** @class */ (function (_super) {
        __extends(McOptgroup, _super);
        function McOptgroup() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            /** Unique id for the underlying label. */
            _this.labelId = "mc-optgroup-label-" + uniqueOptgroupIdCounter++;
            return _this;
        }
        return McOptgroup;
    }(McOptgroupMixinBase));
    McOptgroup.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mc-optgroup',
                    exportAs: 'mcOptgroup',
                    template: "<label class=\"mc-optgroup-label\" [id]=\"labelId\">{{ label }}</label>\n<ng-content select=\"mc-option, mc-list-option, ng-container\"></ng-content>\n",
                    encapsulation: i0.ViewEncapsulation.None,
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    inputs: ['disabled'],
                    host: {
                        class: 'mc-optgroup',
                        '[class.mc-disabled]': 'disabled'
                    },
                    styles: [".mc-optgroup-label{padding-left:var(--mc-optgroup-size-padding-left,17px);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}"]
                },] }
    ];
    McOptgroup.propDecorators = {
        label: [{ type: i0.Input }]
    };

    /**
     * Option IDs need to be unique across components, so this counter exists outside of
     * the component definition.
     */
    var uniqueIdCounter = 0;
    /** Event object emitted by McOption when selected or deselected. */
    var McOptionSelectionChange = /** @class */ (function () {
        function McOptionSelectionChange(source, isUserInput) {
            if (isUserInput === void 0) { isUserInput = false; }
            this.source = source;
            this.isUserInput = isUserInput;
        }
        return McOptionSelectionChange;
    }());
    /**
     * Injection token used to provide the parent component to options.
     */
    var MC_OPTION_PARENT_COMPONENT = new i0.InjectionToken('MC_OPTION_PARENT_COMPONENT');
    /**
     * Single option inside of a `<mc-select>` element.
     */
    var McOption = /** @class */ (function () {
        function McOption(element, changeDetectorRef, parent, group) {
            this.element = element;
            this.changeDetectorRef = changeDetectorRef;
            this.parent = parent;
            this.group = group;
            /** Event emitted when the option is selected or deselected. */
            // tslint:disable-next-line:no-output-on-prefix
            this.onSelectionChange = new i0.EventEmitter();
            /** Emits when the state of the option changes and any parents have to be notified. */
            this.stateChanges = new rxjs.Subject();
            this._id = "mc-option-" + uniqueIdCounter++;
            this._selected = false;
            this._disabled = false;
            this._active = false;
            this.mostRecentViewValue = '';
        }
        Object.defineProperty(McOption.prototype, "showCheckbox", {
            get: function () {
                return this._showCheckbox === undefined ? this.multiple : this._showCheckbox;
            },
            set: function (value) {
                this._showCheckbox = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McOption.prototype, "viewValue", {
            /**
             * The displayed value of the option. It is necessary to show the selected option in the
             * select's trigger.
             */
            get: function () {
                // TODO: Add input property alternative for node envs.
                return (this.getHostElement().textContent || '').trim();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McOption.prototype, "multiple", {
            /** Whether the wrapping component is in multiple selection mode. */
            get: function () {
                return this.parent && this.parent.multiple;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McOption.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McOption.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McOption.prototype, "disabled", {
            get: function () {
                return (this.group && this.group.disabled) || this._disabled;
            },
            set: function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McOption.prototype, "active", {
            /**
             * Whether or not the option is currently active and ready to be selected.
             * An active option displays styles as if it is focused, but the
             * focus is actually retained somewhere else. This comes in handy
             * for components like autocomplete where focus must remain on the input.
             */
            get: function () {
                return this._active;
            },
            enumerable: false,
            configurable: true
        });
        McOption.prototype.ngAfterViewChecked = function () {
            // Since parent components could be using the option's label to display the selected values
            // (e.g. `mc-select`) and they don't have a way of knowing if the option's label has changed
            // we have to check for changes in the DOM ourselves and dispatch an event. These checks are
            // relatively cheap, however we still limit them only to selected options in order to avoid
            // hitting the DOM too often.
            if (this._selected) {
                var viewValue = this.viewValue;
                if (viewValue !== this.mostRecentViewValue) {
                    this.mostRecentViewValue = viewValue;
                    this.stateChanges.next();
                }
            }
        };
        McOption.prototype.ngOnDestroy = function () {
            this.stateChanges.complete();
        };
        McOption.prototype.getHeight = function () {
            // tslint:disable-next-line:naming-convention
            var DOMRect = this.element.nativeElement.getClientRects()[0];
            return DOMRect ? DOMRect.height : 0;
        };
        McOption.prototype.select = function () {
            if (!this._selected) {
                this._selected = true;
                this.changeDetectorRef.markForCheck();
                this.emitSelectionChangeEvent();
            }
        };
        McOption.prototype.deselect = function () {
            if (this._selected) {
                this._selected = false;
                this.changeDetectorRef.markForCheck();
                this.emitSelectionChangeEvent();
            }
        };
        McOption.prototype.focus = function () {
            var element = this.getHostElement();
            if (typeof element.focus === 'function') {
                element.focus();
            }
        };
        /**
         * This method sets display styles on the option to make it appear
         * active. This is used by the ActiveDescendantKeyManager so key
         * events will display the proper options as active on arrow key events.
         */
        McOption.prototype.setActiveStyles = function () {
            if (!this._active) {
                this._active = true;
                this.changeDetectorRef.markForCheck();
            }
        };
        /**
         * This method removes display styles on the option that made it appear
         * active. This is used by the ActiveDescendantKeyManager so key
         * events will display the proper options as active on arrow key events.
         */
        McOption.prototype.setInactiveStyles = function () {
            if (this._active) {
                this._active = false;
                this.changeDetectorRef.markForCheck();
            }
        };
        /** Gets the label to be used when determining whether the option should be focused. */
        McOption.prototype.getLabel = function () {
            return this.viewValue;
        };
        /** Ensures the option is selected when activated from the keyboard. */
        McOption.prototype.handleKeydown = function (event) {
            // tslint:disable-next-line
            if (event.keyCode === keycodes.ENTER || event.keyCode === keycodes.SPACE) {
                this.selectViaInteraction();
                // Prevent the page from scrolling down and form submits.
                event.preventDefault();
            }
        };
        /**
         * `Selects the option while indicating the selection came from the user. Used to
         * determine if the select's view -> model callback should be invoked.`
         */
        McOption.prototype.selectViaInteraction = function () {
            if (!this.disabled) {
                this._selected = this.multiple ? !this._selected : true;
                this.changeDetectorRef.markForCheck();
                this.emitSelectionChangeEvent(true);
            }
        };
        McOption.prototype.getTabIndex = function () {
            return this.disabled ? '-1' : '0';
        };
        McOption.prototype.getHostElement = function () {
            return this.element.nativeElement;
        };
        /** Emits the selection change event. */
        McOption.prototype.emitSelectionChangeEvent = function (isUserInput) {
            if (isUserInput === void 0) { isUserInput = false; }
            this.onSelectionChange.emit(new McOptionSelectionChange(this, isUserInput));
        };
        return McOption;
    }());
    McOption.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mc-option',
                    exportAs: 'mcOption',
                    host: {
                        '[attr.tabindex]': 'getTabIndex()',
                        class: 'mc-option',
                        '[class.mc-selected]': 'selected',
                        '[class.mc-option-multiple]': 'multiple',
                        '[class.mc-active]': 'active',
                        '[class.mc-disabled]': 'disabled',
                        '[id]': 'id',
                        '(click)': 'selectViaInteraction()',
                        '(keydown)': 'handleKeydown($event)'
                    },
                    template: "<mc-pseudo-checkbox\n    *ngIf=\"showCheckbox\"\n    [state]=\"selected ? 'checked' : ''\"\n    [disabled]=\"disabled\">\n</mc-pseudo-checkbox>\n\n<span class=\"mc-option-text\"><ng-content></ng-content></span>\n\n<div class=\"mc-option-overlay\"></div>\n",
                    encapsulation: i0.ViewEncapsulation.None,
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".mc-option{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;position:relative;max-width:100%;height:var(--mc-option-size-height,32px);border:var(--mc-option-size-border-width,2px) solid transparent;cursor:pointer;outline:none;padding-left:var(--mc-option-size-horizontal-padding,16px);padding-right:var(--mc-option-size-horizontal-padding,16px);-webkit-tap-highlight-color:transparent}.mc-option.mc-disabled{cursor:default}.mc-option .mc-pseudo-checkbox{margin-right:8px}.mc-option .mc-option-overlay{position:absolute;top:calc(-1 * var(--mc-option-size-border-width, 2px));left:calc(-1 * var(--mc-option-size-border-width, 2px));right:calc(-1 * var(--mc-option-size-border-width, 2px));bottom:calc(-1 * var(--mc-option-size-border-width, 2px));pointer-events:none;border-radius:inherit}.mc-option-text{display:inline-block;flex-grow:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}"]
                },] }
    ];
    /** @nocollapse */
    McOption.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: i0.ChangeDetectorRef },
        { type: undefined, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [MC_OPTION_PARENT_COMPONENT,] }] },
        { type: McOptgroup, decorators: [{ type: i0.Optional }] }
    ]; };
    McOption.propDecorators = {
        value: [{ type: i0.Input }],
        showCheckbox: [{ type: i0.Input }],
        onSelectionChange: [{ type: i0.Output }],
        disabled: [{ type: i0.Input }]
    };
    /**
     * Counts the amount of option group labels that precede the specified option.
     * @param optionIndex Index of the option at which to start counting.
     * @param options Flat list of all of the options.
     * @param optionGroups Flat list of all of the option groups.
     * @docs-private
     */
    function countGroupLabelsBeforeOption(optionIndex, options, optionGroups) {
        if (optionGroups.length) {
            var optionsArray = options.toArray();
            var groups = optionGroups.toArray();
            var groupCounter = 0;
            for (var i = 0; i < optionIndex + 1; i++) {
                if (optionsArray[i].group && optionsArray[i].group === groups[groupCounter]) {
                    groupCounter++;
                }
            }
            return groupCounter;
        }
        return 0;
    }
    /**
     * Determines the position to which to scroll a panel in order for an option to be into view.
     * @param optionIndex Index of the option to be scrolled into the view.
     * @param optionHeight Height of the options.
     * @param currentScrollPosition Current scroll position of the panel.
     * @param panelHeight Height of the panel.
     * @docs-private
     */
    function getOptionScrollPosition(optionIndex, optionHeight, currentScrollPosition, panelHeight) {
        var optionOffset = optionIndex * optionHeight;
        if (optionOffset < currentScrollPosition) {
            return optionOffset;
        }
        if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
            return Math.max(0, optionOffset - panelHeight + optionHeight);
        }
        return currentScrollPosition;
    }

    var McOptionModule = /** @class */ (function () {
        function McOptionModule() {
        }
        return McOptionModule;
    }());
    McOptionModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [i1.CommonModule, McPseudoCheckboxModule],
                    exports: [McOption, McOptgroup],
                    declarations: [McOption, McOptgroup]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BOTTOM_LEFT_POSITION_PRIORITY = BOTTOM_LEFT_POSITION_PRIORITY;
    exports.BOTTOM_POSITION_PRIORITY = BOTTOM_POSITION_PRIORITY;
    exports.BOTTOM_RIGHT_POSITION_PRIORITY = BOTTOM_RIGHT_POSITION_PRIORITY;
    exports.DEFAULT_4_POSITIONS = DEFAULT_4_POSITIONS;
    exports.DEFAULT_4_POSITIONS_TO_CSS_MAP = DEFAULT_4_POSITIONS_TO_CSS_MAP;
    exports.DEFAULT_MC_LOCALE_ID = DEFAULT_MC_LOCALE_ID;
    exports.EXTENDED_OVERLAY_POSITIONS = EXTENDED_OVERLAY_POSITIONS;
    exports.ErrorStateMatcher = ErrorStateMatcher;
    exports.LEFT_BOTTOM_POSITION_PRIORITY = LEFT_BOTTOM_POSITION_PRIORITY;
    exports.LEFT_POSITION_PRIORITY = LEFT_POSITION_PRIORITY;
    exports.LEFT_TOP_POSITION_PRIORITY = LEFT_TOP_POSITION_PRIORITY;
    exports.MC_LABEL_GLOBAL_OPTIONS = MC_LABEL_GLOBAL_OPTIONS;
    exports.MC_LOCALE_ID = MC_LOCALE_ID;
    exports.MC_OPTION_PARENT_COMPONENT = MC_OPTION_PARENT_COMPONENT;
    exports.MC_SANITY_CHECKS = MC_SANITY_CHECKS;
    exports.MC_SELECT_SCROLL_STRATEGY = MC_SELECT_SCROLL_STRATEGY;
    exports.MC_SELECT_SCROLL_STRATEGY_PROVIDER = MC_SELECT_SCROLL_STRATEGY_PROVIDER;
    exports.MC_VALIDATION = MC_VALIDATION;
    exports.McCommonModule = McCommonModule;
    exports.McDecimalPipe = McDecimalPipe;
    exports.McFormattersModule = McFormattersModule;
    exports.McHighlightModule = McHighlightModule;
    exports.McHighlightPipe = McHighlightPipe;
    exports.McLine = McLine;
    exports.McLineModule = McLineModule;
    exports.McLineSetter = McLineSetter;
    exports.McMeasureScrollbarService = McMeasureScrollbarService;
    exports.McOptgroup = McOptgroup;
    exports.McOptgroupBase = McOptgroupBase;
    exports.McOptgroupMixinBase = McOptgroupMixinBase;
    exports.McOption = McOption;
    exports.McOptionModule = McOptionModule;
    exports.McOptionSelectionChange = McOptionSelectionChange;
    exports.McPseudoCheckbox = McPseudoCheckbox;
    exports.McPseudoCheckboxModule = McPseudoCheckboxModule;
    exports.NUMBER_FORMAT_REGEXP = NUMBER_FORMAT_REGEXP;
    exports.POSITION_MAP = POSITION_MAP;
    exports.POSITION_PRIORITY_STRATEGY = POSITION_PRIORITY_STRATEGY;
    exports.POSITION_TO_CSS_MAP = POSITION_TO_CSS_MAP;
    exports.RIGHT_BOTTOM_POSITION_PRIORITY = RIGHT_BOTTOM_POSITION_PRIORITY;
    exports.RIGHT_POSITION_PRIORITY = RIGHT_POSITION_PRIORITY;
    exports.RIGHT_TOP_POSITION_PRIORITY = RIGHT_TOP_POSITION_PRIORITY;
    exports.SELECT_PANEL_INDENT_PADDING_X = SELECT_PANEL_INDENT_PADDING_X;
    exports.SELECT_PANEL_MAX_HEIGHT = SELECT_PANEL_MAX_HEIGHT;
    exports.SELECT_PANEL_PADDING_X = SELECT_PANEL_PADDING_X;
    exports.SELECT_PANEL_VIEWPORT_PADDING = SELECT_PANEL_VIEWPORT_PADDING;
    exports.ShowOnDirtyErrorStateMatcher = ShowOnDirtyErrorStateMatcher;
    exports.TOP_LEFT_POSITION_PRIORITY = TOP_LEFT_POSITION_PRIORITY;
    exports.TOP_POSITION_PRIORITY = TOP_POSITION_PRIORITY;
    exports.TOP_RIGHT_POSITION_PRIORITY = TOP_RIGHT_POSITION_PRIORITY;
    exports.countGroupLabelsBeforeOption = countGroupLabelsBeforeOption;
    exports.fadeAnimation = fadeAnimation;
    exports.getMcSelectDynamicMultipleError = getMcSelectDynamicMultipleError;
    exports.getMcSelectNonArrayValueError = getMcSelectNonArrayValueError;
    exports.getMcSelectNonFunctionValueError = getMcSelectNonFunctionValueError;
    exports.getOptionScrollPosition = getOptionScrollPosition;
    exports.isBoolean = isBoolean;
    exports.mcSelectAnimations = mcSelectAnimations;
    exports.mcSelectScrollStrategyProviderFactory = mcSelectScrollStrategyProviderFactory;
    exports.mixinColor = mixinColor;
    exports.mixinDisabled = mixinDisabled;
    exports.mixinErrorState = mixinErrorState;
    exports.mixinTabIndex = mixinTabIndex;
    exports.selectEvents = selectEvents;
    exports.setMosaicValidation = setMosaicValidation;
    exports.setMosaicValidationForFormControl = setMosaicValidationForFormControl;
    exports.setMosaicValidationForModelControl = setMosaicValidationForModelControl;
    exports.toBoolean = toBoolean;
    exports.ɵa = mcSanityChecksFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-core.umd.js.map
