(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/common'), require('@angular/core'), require('@angular/forms'), require('@ptsecurity/mosaic/core'), require('@angular/cdk/coercion'), require('@angular/cdk/platform'), require('@ptsecurity/mosaic/form-field'), require('rxjs'), require('@ptsecurity/cdk/keycodes')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/input', ['exports', '@angular/cdk/a11y', '@angular/common', '@angular/core', '@angular/forms', '@ptsecurity/mosaic/core', '@angular/cdk/coercion', '@angular/cdk/platform', '@ptsecurity/mosaic/form-field', 'rxjs', '@ptsecurity/cdk/keycodes'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.input = {}), global.ng.cdk.a11y, global.ng.common, global.ng.core, global.ng.forms, global.ptsecurity.mosaic.core, global.ng.cdk.coercion, global.ng.cdk.platform, global.ptsecurity.mosaic['form-field'], global.rxjs, global.keycodes));
}(this, (function (exports, a11y, common, core, forms, core$1, coercion, platform, formField, rxjs, keycodes) { 'use strict';

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

    function getMcInputUnsupportedTypeError(inputType) {
        return Error("Input type \"" + inputType + "\" isn't supported by mcInput.");
    }

    var BIG_STEP = 10;
    var SMALL_STEP = 1;
    function normalizeSplitter(value) {
        return value ? value.replace(/,/g, '.') : value;
    }
    function isFloat(value) {
        return /^-?\d+\.\d+$/.test(value);
    }
    function isInt(value) {
        return /^-?\d+$/.test(value);
    }
    function isDigit(value) {
        return isFloat(value) || isInt(value);
    }
    function getPrecision(value) {
        var arr = value.toString().split('.');
        return arr.length === 1
            ? 1
            // tslint:disable-next-line:no-magic-numbers
            : Math.pow(10, arr[1].length);
    }
    function add(value1, value2) {
        var precision = Math.max(getPrecision(value1), getPrecision(value2));
        return (value1 * precision + value2 * precision) / precision;
    }
    var McNumberInput = /** @class */ (function () {
        function McNumberInput(elementRef, ngControl, step, bigStep, min, max) {
            this.elementRef = elementRef;
            this.ngControl = ngControl;
            this.focused = false;
            this.stateChanges = new rxjs.Subject();
            this.step = isDigit(step) ? parseFloat(step) : SMALL_STEP;
            this.bigStep = isDigit(bigStep) ? parseFloat(bigStep) : BIG_STEP;
            this.min = isDigit(min) ? parseFloat(min) : -Infinity;
            this.max = isDigit(max) ? parseFloat(max) : Infinity;
            if ('valueAsNumber' in this.nativeElement) {
                Object.defineProperty(Object.getPrototypeOf(this.nativeElement), 'valueAsNumber', {
                    // tslint:disable-next-line:no-reserved-keywords
                    get: function () {
                        var res = parseFloat(normalizeSplitter(this.value));
                        return isNaN(res) ? null : res;
                    }
                });
            }
        }
        Object.defineProperty(McNumberInput.prototype, "nativeElement", {
            get: function () {
                return this.elementRef.nativeElement;
            },
            enumerable: false,
            configurable: true
        });
        McNumberInput.prototype.focusChanged = function (isFocused) {
            if (isFocused !== this.focused) {
                this.focused = isFocused;
                this.stateChanges.next();
            }
        };
        McNumberInput.prototype.onKeyDown = function (event) {
            // tslint:disable-next-line:deprecation
            var keyCode = event.keyCode;
            var isCtrlA = function (e) { return e.keyCode === keycodes.A && (e.ctrlKey || e.metaKey); };
            var isCtrlC = function (e) { return e.keyCode === keycodes.C && (e.ctrlKey || e.metaKey); };
            var isCtrlV = function (e) { return e.keyCode === keycodes.V && (e.ctrlKey || e.metaKey); };
            var isCtrlX = function (e) { return e.keyCode === keycodes.X && (e.ctrlKey || e.metaKey); };
            var isCtrlZ = function (e) { return e.keyCode === keycodes.Z && (e.ctrlKey || e.metaKey); };
            var isFKey = function (e) { return e.keyCode >= keycodes.F1 && e.keyCode <= keycodes.F12; };
            var isNumber = function (e) { return (e.keyCode >= keycodes.ZERO && e.keyCode <= keycodes.NINE) ||
                (e.keyCode >= keycodes.NUMPAD_ZERO && e.keyCode <= keycodes.NUMPAD_NINE); };
            var isPeriod = function (e) { return e.key === '.' || e.key === ','; };
            var minuses = [keycodes.NUMPAD_MINUS, keycodes.DASH, keycodes.FF_MINUS];
            var serviceKeys = [keycodes.DELETE, keycodes.BACKSPACE, keycodes.TAB, keycodes.ESCAPE, keycodes.ENTER];
            var arrows = [keycodes.LEFT_ARROW, keycodes.RIGHT_ARROW];
            var allowedKeys = [keycodes.HOME, keycodes.END].concat(arrows).concat(serviceKeys).concat(minuses);
            if (allowedKeys.indexOf(keyCode) !== -1 ||
                isCtrlA(event) ||
                isCtrlC(event) ||
                isCtrlV(event) ||
                isCtrlX(event) ||
                isCtrlZ(event) ||
                isFKey(event) ||
                isPeriod(event)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is not a number and stop the keypress
            if (event.shiftKey || !isNumber(event)) {
                event.preventDefault();
                // process steps
                var step = event.shiftKey ? this.bigStep : this.step;
                if (keyCode === keycodes.UP_ARROW) {
                    this.stepUp(step);
                }
                if (keyCode === keycodes.DOWN_ARROW) {
                    this.stepDown(step);
                }
            }
        };
        McNumberInput.prototype.onPaste = function (event) {
            if (!isDigit(normalizeSplitter(event.clipboardData.getData('text')))) {
                event.preventDefault();
            }
        };
        McNumberInput.prototype.stepUp = function (step) {
            this.elementRef.nativeElement.focus();
            var res = Math.max(Math.min(add(this.nativeElement.valueAsNumber || 0, step), this.max), this.min);
            this.nativeElement.value = res.toString();
            this.viewToModelUpdate(this.nativeElement.valueAsNumber);
        };
        McNumberInput.prototype.stepDown = function (step) {
            this.elementRef.nativeElement.focus();
            var res = Math.min(Math.max(add(this.nativeElement.valueAsNumber || 0, -step), this.min), this.max);
            this.nativeElement.value = res.toString();
            this.viewToModelUpdate(this.nativeElement.valueAsNumber);
        };
        McNumberInput.prototype.viewToModelUpdate = function (value) {
            if (this.ngControl) {
                this.ngControl.control.setValue(value);
            }
        };
        return McNumberInput;
    }());
    McNumberInput.decorators = [
        { type: core.Directive, args: [{
                    selector: "input[mcInput][type=\"number\"]",
                    exportAs: 'mcNumericalInput',
                    host: {
                        '(blur)': 'focusChanged(false)',
                        '(focus)': 'focusChanged(true)',
                        '(paste)': 'onPaste($event)',
                        '(keydown)': 'onKeyDown($event)'
                    }
                },] }
    ];
    /** @nocollapse */
    McNumberInput.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: forms.NgControl, decorators: [{ type: core.Optional }, { type: core.Self }] },
        { type: String, decorators: [{ type: core.Attribute, args: ['step',] }] },
        { type: String, decorators: [{ type: core.Attribute, args: ['big-step',] }] },
        { type: String, decorators: [{ type: core.Attribute, args: ['min',] }] },
        { type: String, decorators: [{ type: core.Attribute, args: ['max',] }] }
    ]; };
    McNumberInput.propDecorators = {
        bigStep: [{ type: core.Input }],
        step: [{ type: core.Input }],
        min: [{ type: core.Input }],
        max: [{ type: core.Input }]
    };

    var MC_INPUT_VALUE_ACCESSOR = new core.InjectionToken('MC_INPUT_VALUE_ACCESSOR');

    var MC_INPUT_INVALID_TYPES = [
        'button',
        'checkbox',
        'file',
        'hidden',
        'image',
        'radio',
        'range',
        'reset',
        'submit'
    ];
    var nextUniqueId = 0;
    var McInputBase = /** @class */ (function () {
        function McInputBase(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
            this.defaultErrorStateMatcher = defaultErrorStateMatcher;
            this.parentForm = parentForm;
            this.parentFormGroup = parentFormGroup;
            this.ngControl = ngControl;
        }
        return McInputBase;
    }());
    // tslint:disable-next-line:naming-convention
    var McInputMixinBase = core$1.mixinErrorState(McInputBase);
    var McInput = /** @class */ (function (_super) {
        __extends(McInput, _super);
        // tslint:disable-next-line: naming-convention
        function McInput(elementRef, rawValidators, mcValidation, ngControl, numberInput, ngModel, formControlName, parentForm, parentFormGroup, defaultErrorStateMatcher, inputValueAccessor) {
            var _this = _super.call(this, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) || this;
            _this.elementRef = elementRef;
            _this.rawValidators = rawValidators;
            _this.mcValidation = mcValidation;
            _this.numberInput = numberInput;
            _this.ngModel = ngModel;
            _this.formControlName = formControlName;
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            _this.focused = false;
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            _this.stateChanges = new rxjs.Subject();
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            _this.controlType = 'input';
            _this.uid = "mc-input-" + nextUniqueId++;
            _this.neverEmptyInputTypes = [
                'date',
                'datetime',
                'datetime-local',
                'month',
                'time',
                'week'
            ].filter(function (t) { return platform.getSupportedInputTypes().has(t); });
            _this._disabled = false;
            _this._required = false;
            // tslint:enable no-reserved-keywords
            _this._type = 'text';
            // If no input value accessor was explicitly specified, use the element as the input value
            // accessor.
            _this._inputValueAccessor = inputValueAccessor || _this.elementRef.nativeElement;
            _this.previousNativeValue = _this.value;
            // Force setter to be called in case id was not specified.
            _this.id = _this.id;
            return _this;
        }
        Object.defineProperty(McInput.prototype, "disabled", {
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            get: function () {
                if (this.ngControl && this.ngControl.disabled !== null) {
                    return this.ngControl.disabled;
                }
                return this._disabled;
            },
            set: function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
                // Browsers may not fire the blur event if the input is disabled too quickly.
                // Reset from here to ensure that the element doesn't become stuck.
                if (this.focused) {
                    this.focused = false;
                    this.stateChanges.next();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McInput.prototype, "id", {
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            get: function () {
                return this._id;
            },
            set: function (value) {
                this._id = value || this.uid;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McInput.prototype, "required", {
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            get: function () {
                return this._required;
            },
            set: function (value) {
                this._required = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McInput.prototype, "type", {
            // tslint:disable no-reserved-keywords
            /** Input type of the element. */
            get: function () {
                return this._type;
            },
            set: function (value) {
                this._type = value || 'text';
                this.validateType();
                // When using Angular inputs, developers are no longer able to set the properties on the native
                // input element. To ensure that bindings for `type` work, we need to sync the setter
                // with the native property. Textarea elements don't support the type property or attribute.
                if (platform.getSupportedInputTypes().has(this._type)) {
                    this.elementRef.nativeElement.type = this._type;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McInput.prototype, "value", {
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            get: function () {
                return this._inputValueAccessor.value;
            },
            set: function (value) {
                if (value !== this.value) {
                    this._inputValueAccessor.value = value;
                    this.stateChanges.next();
                }
            },
            enumerable: false,
            configurable: true
        });
        McInput.prototype.ngAfterContentInit = function () {
            if (!this.ngControl) {
                return;
            }
            if (this.mcValidation.useValidation) {
                core$1.setMosaicValidation(this);
            }
        };
        McInput.prototype.ngOnChanges = function () {
            this.stateChanges.next();
        };
        McInput.prototype.ngOnDestroy = function () {
            this.stateChanges.complete();
        };
        McInput.prototype.ngDoCheck = function () {
            if (this.ngControl) {
                // We need to re-evaluate this on every change detection cycle, because there are some
                // error triggers that we can't subscribe to (e.g. parent form submissions). This means
                // that whatever logic is in here has to be super lean or we risk destroying the performance.
                this.updateErrorState();
            }
            // We need to dirty-check the native element's value, because there are some cases where
            // we won't be notified when it changes (e.g. the consumer isn't using forms or they're
            // updating the value using `emitEvent: false`).
            this.dirtyCheckNativeValue();
        };
        /** Focuses the input. */
        McInput.prototype.focus = function () {
            this.elementRef.nativeElement.focus();
        };
        McInput.prototype.onBlur = function () {
            this.focusChanged(false);
            if (this.ngControl && this.ngControl.control) {
                var control = this.ngControl.control;
                control.updateValueAndValidity({ emitEvent: false });
                control.statusChanges.emit(control.status);
            }
        };
        /** Callback for the cases where the focused state of the input changes. */
        McInput.prototype.focusChanged = function (isFocused) {
            if (isFocused !== this.focused) {
                this.focused = isFocused;
                this.stateChanges.next();
            }
        };
        McInput.prototype.onInput = function () {
            // This is a noop function and is used to let Angular know whenever the value changes.
            // Angular will run a new change detection each time the `input` event has been dispatched.
            // It's necessary that Angular recognizes the value change, because when floatingLabel
            // is set to false and Angular forms aren't used, the placeholder won't recognize the
            // value changes and will not disappear.
            // Listening to the input event wouldn't be necessary when the input is using the
            // FormsModule or ReactiveFormsModule, because Angular forms also listens to input events.
        };
        Object.defineProperty(McInput.prototype, "empty", {
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            get: function () {
                return !this.isNeverEmpty() && !this.elementRef.nativeElement.value && !this.isBadInput();
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        McInput.prototype.onContainerClick = function () {
            this.focus();
        };
        /** Does some manual dirty checking on the native input `value` property. */
        McInput.prototype.dirtyCheckNativeValue = function () {
            var newValue = this.value;
            if (this.previousNativeValue !== newValue) {
                this.previousNativeValue = newValue;
                this.stateChanges.next();
            }
        };
        /** Make sure the input is a supported type. */
        McInput.prototype.validateType = function () {
            if (MC_INPUT_INVALID_TYPES.indexOf(this._type) > -1) {
                throw getMcInputUnsupportedTypeError(this._type);
            }
        };
        /** Checks whether the input type is one of the types that are never empty. */
        McInput.prototype.isNeverEmpty = function () {
            return this.neverEmptyInputTypes.indexOf(this._type) > -1;
        };
        /** Checks whether the input is invalid based on the native validation. */
        McInput.prototype.isBadInput = function () {
            // The `validity` property won't be present on platform-server.
            var validity = this.elementRef.nativeElement.validity;
            return validity && validity.badInput;
        };
        return McInput;
    }(McInputMixinBase));
    McInput.decorators = [
        { type: core.Directive, args: [{
                    selector: "input[mcInput]",
                    exportAs: 'mcInput',
                    host: {
                        class: 'mc-input',
                        // Native input properties that are overwritten by Angular inputs need to be synced with
                        // the native input element. Otherwise property bindings for those don't work.
                        '[attr.id]': 'id',
                        '[attr.placeholder]': 'placeholder',
                        '[attr.disabled]': 'disabled || null',
                        '[required]': 'required',
                        '(blur)': 'onBlur()',
                        '(focus)': 'focusChanged(true)',
                        '(input)': 'onInput()'
                    },
                    providers: [{
                            provide: formField.McFormFieldControl, useExisting: McInput
                        }]
                },] }
    ];
    /** @nocollapse */
    McInput.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: Array, decorators: [{ type: core.Optional }, { type: core.Self }, { type: core.Inject, args: [forms.NG_VALIDATORS,] }] },
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [core$1.MC_VALIDATION,] }] },
        { type: forms.NgControl, decorators: [{ type: core.Optional }, { type: core.Self }] },
        { type: McNumberInput, decorators: [{ type: core.Optional }, { type: core.Self }] },
        { type: forms.NgModel, decorators: [{ type: core.Optional }, { type: core.Self }] },
        { type: forms.FormControlName, decorators: [{ type: core.Optional }, { type: core.Self }] },
        { type: forms.NgForm, decorators: [{ type: core.Optional }] },
        { type: forms.FormGroupDirective, decorators: [{ type: core.Optional }] },
        { type: core$1.ErrorStateMatcher },
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Self }, { type: core.Inject, args: [MC_INPUT_VALUE_ACCESSOR,] }] }
    ]; };
    McInput.propDecorators = {
        errorStateMatcher: [{ type: core.Input }],
        placeholder: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        id: [{ type: core.Input }],
        required: [{ type: core.Input }],
        type: [{ type: core.Input }],
        value: [{ type: core.Input }]
    };
    var McInputMono = /** @class */ (function () {
        function McInputMono() {
        }
        return McInputMono;
    }());
    McInputMono.decorators = [
        { type: core.Directive, args: [{
                    selector: 'input[mcInputMonospace]',
                    exportAs: 'McInputMonospace',
                    host: { class: 'mc-input_monospace' }
                },] }
    ];

    var MIN_VALIDATOR = {
        provide: forms.NG_VALIDATORS,
        useExisting: core.forwardRef(function () { return MinValidator; }),
        multi: true
    };
    /**
     * A directive which installs the {@link MinValidator} for any `formControlName`,
     * `formControl`, or control with `ngModel` that also has a `min` attribute.
     *
     * @experimental
     */
    var MinValidator = /** @class */ (function () {
        function MinValidator() {
        }
        MinValidator.prototype.ngOnChanges = function (changes) {
            if ('min' in changes) {
                this.createValidator();
                if (this.onChange) {
                    this.onChange();
                }
            }
        };
        MinValidator.prototype.validate = function (c) { return this.validator(c); };
        MinValidator.prototype.registerOnValidatorChange = function (fn) { this.onChange = fn; };
        MinValidator.prototype.createValidator = function () { this.validator = forms.Validators.min(parseInt(this.min, 10)); };
        return MinValidator;
    }());
    MinValidator.decorators = [
        { type: core.Directive, args: [{
                    selector: '[min][formControlName],[min][formControl],[min][ngModel]',
                    providers: [MIN_VALIDATOR],
                    host: { '[attr.min]': 'min ? min : null' }
                },] }
    ];
    MinValidator.propDecorators = {
        min: [{ type: core.Input }]
    };
    var MAX_VALIDATOR = {
        provide: forms.NG_VALIDATORS,
        useExisting: core.forwardRef(function () { return MaxValidator; }),
        multi: true
    };
    /**
     * A directive which installs the {@link MaxValidator} for any `formControlName`,
     * `formControl`, or control with `ngModel` that also has a `min` attribute.
     *
     * @experimental
     */
    var MaxValidator = /** @class */ (function () {
        function MaxValidator() {
        }
        MaxValidator.prototype.ngOnChanges = function (changes) {
            if ('max' in changes) {
                this.createValidator();
                if (this.onChange) {
                    this.onChange();
                }
            }
        };
        MaxValidator.prototype.validate = function (c) { return this.validator(c); };
        MaxValidator.prototype.registerOnValidatorChange = function (fn) { this.onChange = fn; };
        MaxValidator.prototype.createValidator = function () { this.validator = forms.Validators.max(parseInt(this.max, 10)); };
        return MaxValidator;
    }());
    MaxValidator.decorators = [
        { type: core.Directive, args: [{
                    selector: '[max][formControlName],[max][formControl],[max][ngModel]',
                    providers: [MAX_VALIDATOR],
                    host: {
                        '[attr.max]': 'max ? max : null'
                    }
                },] }
    ];
    MaxValidator.propDecorators = {
        max: [{ type: core.Input }]
    };

    var McInputModule = /** @class */ (function () {
        function McInputModule() {
        }
        return McInputModule;
    }());
    McInputModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, a11y.A11yModule, core$1.McCommonModule, forms.FormsModule],
                    exports: [McInput, McNumberInput, McInputMono, MinValidator, MaxValidator],
                    declarations: [McInput, McNumberInput, McInputMono, MinValidator, MaxValidator]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BIG_STEP = BIG_STEP;
    exports.MAX_VALIDATOR = MAX_VALIDATOR;
    exports.MC_INPUT_VALUE_ACCESSOR = MC_INPUT_VALUE_ACCESSOR;
    exports.MIN_VALIDATOR = MIN_VALIDATOR;
    exports.MaxValidator = MaxValidator;
    exports.McInput = McInput;
    exports.McInputBase = McInputBase;
    exports.McInputMixinBase = McInputMixinBase;
    exports.McInputModule = McInputModule;
    exports.McInputMono = McInputMono;
    exports.McNumberInput = McNumberInput;
    exports.MinValidator = MinValidator;
    exports.SMALL_STEP = SMALL_STEP;
    exports.add = add;
    exports.getPrecision = getPrecision;
    exports.isDigit = isDigit;
    exports.isFloat = isFloat;
    exports.isInt = isInt;
    exports.normalizeSplitter = normalizeSplitter;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-input.umd.js.map
