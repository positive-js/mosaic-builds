(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@ptsecurity/mosaic/core'), require('@angular/cdk/a11y'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/checkbox', ['exports', '@angular/core', '@angular/forms', '@ptsecurity/mosaic/core', '@angular/cdk/a11y', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.checkbox = {}), global.ng.core, global.ng.forms, global.ptsecurity.mosaic.core, global.ng.cdk.a11y, global.ng.common));
})(this, (function (exports, i0, forms, core, i1, common) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

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
     * Injection token that can be used to specify the checkbox click behavior.
     */
    var MC_CHECKBOX_CLICK_ACTION = new i0.InjectionToken('mc-checkbox-click-action');

    // Increasing integer for generating unique ids for checkbox components.
    var nextUniqueId = 0;
    /**
     * Provider Expression that allows mc-checkbox to register as a ControlValueAccessor.
     * This allows it to support [(ngModel)].
     * @docs-private
     */
    var MC_CHECKBOX_CONTROL_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return McCheckbox; }),
        multi: true
    };
    /**
     * Represents the different states that require custom transitions between them.
     * @docs-private
     */
    exports.TransitionCheckState = void 0;
    (function (TransitionCheckState) {
        /** The initial state of the component before any user interaction. */
        TransitionCheckState[TransitionCheckState["Init"] = 0] = "Init";
        /** The state representing the component when it's becoming checked. */
        TransitionCheckState[TransitionCheckState["Checked"] = 1] = "Checked";
        /** The state representing the component when it's becoming unchecked. */
        TransitionCheckState[TransitionCheckState["Unchecked"] = 2] = "Unchecked";
        /** The state representing the component when it's becoming indeterminate. */
        TransitionCheckState[TransitionCheckState["Indeterminate"] = 3] = "Indeterminate";
    })(exports.TransitionCheckState || (exports.TransitionCheckState = {}));
    /** Change event object emitted by McCheckbox. */
    var McCheckboxChange = /** @class */ (function () {
        function McCheckboxChange() {
        }
        return McCheckboxChange;
    }());
    // Boilerplate for applying mixins to McCheckbox.
    /** @docs-private */
    var McCheckboxBase = /** @class */ (function () {
        // tslint:disable-next-line:naming-convention
        function McCheckboxBase(_elementRef) {
            this._elementRef = _elementRef;
        }
        return McCheckboxBase;
    }());
    // tslint:disable-next-line:naming-convention
    var McCheckboxMixinBase = core.mixinTabIndex(core.mixinColor(core.mixinDisabled(McCheckboxBase)));
    /**
     * A mosaic checkbox component. Supports all of the functionality of an HTML5 checkbox,
     * and exposes a similar API. A McCheckbox can be either checked, unchecked, indeterminate, or
     * disabled. Note that all additional accessibility attributes are taken care of by the component,
     * so there is no need to provide them yourself. However, if you want to omit a label and still
     * have the checkbox be accessible, you may supply an [aria-label] input.
     */
    var McCheckbox = /** @class */ (function (_super) {
        __extends(McCheckbox, _super);
        function McCheckbox(elementRef, _changeDetectorRef, _focusMonitor, _clickAction) {
            var _this = _super.call(this, elementRef) || this;
            _this._changeDetectorRef = _changeDetectorRef;
            _this._focusMonitor = _focusMonitor;
            _this._clickAction = _clickAction;
            /**
             * Attached to the aria-label attribute of the host element. In most cases, arial-labelledby will
             * take precedence so this may be omitted.
             */
            _this.ariaLabel = '';
            /**
             * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
             */
            _this.ariaLabelledby = null;
            /** Whether the label should appear after or before the checkbox. Defaults to 'after' */
            _this.labelPosition = 'after';
            /** Name value will be applied to the input element if present */
            _this.name = null;
            /** Event emitted when the checkbox's `checked` value changes. */
            _this.change = new i0.EventEmitter();
            /** Event emitted when the checkbox's `indeterminate` value changes. */
            _this.indeterminateChange = new i0.EventEmitter();
            _this._checked = false;
            _this._disabled = false;
            _this._indeterminate = false;
            _this.uniqueId = "mc-checkbox-" + ++nextUniqueId;
            _this.currentAnimationClass = '';
            _this.currentCheckState = exports.TransitionCheckState.Init;
            /**
             * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
             * @docs-private
             */
            // tslint:disable-next-line:no-empty
            _this.onTouched = function () { };
            // tslint:disable-next-line:no-empty
            _this.controlValueAccessorChangeFn = function () { };
            _this.id = _this.uniqueId;
            return _this;
        }
        Object.defineProperty(McCheckbox.prototype, "inputId", {
            /** Returns the unique id for the visual hidden input. */
            get: function () {
                return (this.id || this.uniqueId) + "-input";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McCheckbox.prototype, "required", {
            /** Whether the checkbox is required. */
            get: function () {
                return this._required;
            },
            set: function (value) {
                this._required = core.toBoolean(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McCheckbox.prototype, "checked", {
            /**
             * Whether the checkbox is checked.
             */
            get: function () {
                return this._checked;
            },
            set: function (value) {
                if (value !== this.checked) {
                    this._checked = value;
                    this._changeDetectorRef.markForCheck();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McCheckbox.prototype, "disabled", {
            /**
             * Whether the checkbox is disabled. This fully overrides the implementation provided by
             * mixinDisabled, but the mixin is still required because mixinTabIndex requires it.
             */
            get: function () {
                return this._disabled;
            },
            set: function (value) {
                if (value !== this.disabled) {
                    this._disabled = value;
                    this._changeDetectorRef.markForCheck();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McCheckbox.prototype, "indeterminate", {
            /**
             * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
             * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
             * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
             * set to false.
             */
            get: function () {
                return this._indeterminate;
            },
            set: function (value) {
                var changed = value !== this._indeterminate;
                this._indeterminate = value;
                if (changed) {
                    if (this._indeterminate) {
                        this.transitionCheckState(exports.TransitionCheckState.Indeterminate);
                    }
                    else {
                        this.transitionCheckState(this.checked ? exports.TransitionCheckState.Checked : exports.TransitionCheckState.Unchecked);
                    }
                    this.indeterminateChange.emit(this._indeterminate);
                }
            },
            enumerable: false,
            configurable: true
        });
        McCheckbox.prototype.ngAfterViewInit = function () {
            var _this = this;
            this._focusMonitor
                .monitor(this.inputElement.nativeElement)
                .subscribe(function (focusOrigin) { return _this.onInputFocusChange(focusOrigin); });
        };
        McCheckbox.prototype.ngOnDestroy = function () {
            this._focusMonitor.stopMonitoring(this.inputElement.nativeElement);
        };
        /** Method being called whenever the label text changes. */
        McCheckbox.prototype.onLabelTextChange = function () {
            // This method is getting called whenever the label of the checkbox changes.
            // Since the checkbox uses the OnPush strategy we need to notify it about the change
            // that has been recognized by the cdkObserveContent directive.
            this._changeDetectorRef.markForCheck();
        };
        // Implemented as part of ControlValueAccessor.
        McCheckbox.prototype.writeValue = function (value) {
            this.checked = !!value;
        };
        // Implemented as part of ControlValueAccessor.
        McCheckbox.prototype.registerOnChange = function (fn) {
            this.controlValueAccessorChangeFn = fn;
        };
        // Implemented as part of ControlValueAccessor.
        McCheckbox.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        // Implemented as part of ControlValueAccessor.
        McCheckbox.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
        };
        McCheckbox.prototype.getAriaChecked = function () {
            return this.checked ? 'true' : (this.indeterminate ? 'mixed' : 'false');
        };
        /** Toggles the `checked` state of the checkbox. */
        McCheckbox.prototype.toggle = function () {
            this.checked = !this.checked;
        };
        /**
         * Event handler for checkbox input element.
         * Toggles checked state if element is not disabled.
         * Do not toggle on (change) event since IE doesn't fire change event when
         *   indeterminate checkbox is clicked.
         * @param event Input click event
         */
        McCheckbox.prototype.onInputClick = function (event) {
            var _this = this;
            // We have to stop propagation for click events on the visual hidden input element.
            // By default, when a user clicks on a label element, a generated click event will be
            // dispatched on the associated input element. Since we are using a label element as our
            // root container, the click event on the `checkbox` will be executed twice.
            // The real click event will bubble up, and the generated click event also tries to bubble up.
            // This will lead to multiple click events.
            // Preventing bubbling for the second event will solve that issue.
            event.stopPropagation();
            // If resetIndeterminate is false, and the current state is indeterminate, do nothing on click
            if (!this.disabled && this._clickAction !== 'noop') {
                // When user manually click on the checkbox, `indeterminate` is set to false.
                if (this.indeterminate && this._clickAction !== 'check') {
                    Promise.resolve().then(function () {
                        _this._indeterminate = false;
                        _this.indeterminateChange.emit(_this._indeterminate);
                    });
                }
                this.toggle();
                this.transitionCheckState(this._checked ? exports.TransitionCheckState.Checked : exports.TransitionCheckState.Unchecked);
                // Emit our custom change event if the native input emitted one.
                // It is important to only emit it, if the native input triggered one, because
                // we don't want to trigger a change event, when the `checked` variable changes for example.
                this.emitChangeEvent();
            }
            else if (!this.disabled && this._clickAction === 'noop') {
                // Reset native input when clicked with noop. The native checkbox becomes checked after
                // click, reset it to be align with `checked` value of `mc-checkbox`.
                this.inputElement.nativeElement.checked = this.checked;
                this.inputElement.nativeElement.indeterminate = this.indeterminate;
            }
        };
        /** Focuses the checkbox. */
        McCheckbox.prototype.focus = function () {
            this._focusMonitor.focusVia(this.inputElement.nativeElement, 'keyboard');
        };
        McCheckbox.prototype.onInteractionEvent = function (event) {
            // We always have to stop propagation on the change event.
            // Otherwise the change event, from the input element, will bubble up and
            // emit its event object to the `change` output.
            event.stopPropagation();
        };
        McCheckbox.prototype.transitionCheckState = function (newState) {
            var oldState = this.currentCheckState;
            var element = this._elementRef.nativeElement;
            if (oldState === newState) {
                return;
            }
            if (this.currentAnimationClass.length > 0) {
                element.classList.remove(this.currentAnimationClass);
            }
            this.currentCheckState = newState;
            if (this.currentAnimationClass.length > 0) {
                element.classList.add(this.currentAnimationClass);
            }
        };
        McCheckbox.prototype.emitChangeEvent = function () {
            var event = new McCheckboxChange();
            event.source = this;
            event.checked = this.checked;
            this.controlValueAccessorChangeFn(this.checked);
            this.change.emit(event);
        };
        /** Function is called whenever the focus changes for the input element. */
        McCheckbox.prototype.onInputFocusChange = function (focusOrigin) {
            if (focusOrigin) {
                this.onTouched();
            }
        };
        return McCheckbox;
    }(McCheckboxMixinBase));
    /** @nocollapse */ McCheckbox.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McCheckbox, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.ChangeDetectorRef }, { token: i1__namespace.FocusMonitor }, { token: MC_CHECKBOX_CLICK_ACTION, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McCheckbox.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McCheckbox, selector: "mc-checkbox", inputs: { color: "color", tabIndex: "tabIndex", ariaLabel: ["aria-label", "ariaLabel"], ariaLabelledby: ["aria-labelledby", "ariaLabelledby"], id: "id", labelPosition: "labelPosition", name: "name", value: "value", required: "required", checked: "checked", disabled: "disabled", indeterminate: "indeterminate" }, outputs: { change: "change", indeterminateChange: "indeterminateChange" }, host: { properties: { "id": "id", "attr.id": "id", "class.mc-indeterminate": "indeterminate", "class.mc-checked": "checked", "class.mc-disabled": "disabled", "class.mc-checkbox-label-before": "labelPosition == \"before\"" }, classAttribute: "mc-checkbox" }, providers: [MC_CHECKBOX_CONTROL_VALUE_ACCESSOR], viewQueries: [{ propertyName: "inputElement", first: true, predicate: ["input"], descendants: true }], exportAs: ["mcCheckbox"], usesInheritance: true, ngImport: i0__namespace, template: "<label [attr.for]=\"inputId\" class=\"mc-checkbox-layout\" #label>\n    <div class=\"mc-checkbox-inner-container\"\n         [class.mc-checkbox-inner-container-no-side-margin]=\"!checkboxLabel.textContent || !checkboxLabel.textContent.trim()\">\n        <input #input\n               type=\"checkbox\"\n               class=\"mc-checkbox-input cdk-visually-hidden\"\n               [id]=\"inputId\"\n               [required]=\"required\"\n               [checked]=\"checked\"\n               [attr.value]=\"value\"\n               [disabled]=\"disabled\"\n               [attr.name]=\"name\"\n               [tabIndex]=\"tabIndex\"\n               [indeterminate]=\"indeterminate\"\n               [attr.aria-label]=\"ariaLabel || null\"\n               [attr.aria-labelledby]=\"ariaLabelledby\"\n               [attr.aria-checked]=\"getAriaChecked()\"\n               (change)=\"onInteractionEvent($event)\"\n               (click)=\"onInputClick($event)\">\n        <div class=\"mc-checkbox-frame\">\n            <i class=\"mc-checkbox-checkmark mc mc-check_16\"></i>\n            <i class=\"mc-checkbox-mixedmark mc mc-minus_16\"></i>\n        </div>\n    </div>\n\n    <span class=\"mc-checkbox-label\" #checkboxLabel (cdkObserveContent)=\"onLabelTextChange()\">\n    <ng-content></ng-content>\n  </span>\n</label>\n", styles: [".mc-checkbox-frame{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:3px;box-sizing:border-box;pointer-events:none}.mc-checkbox-checkmark,.mc-checkbox-mixedmark{display:none;position:absolute;top:-1px;left:-1px;right:0;bottom:0}.mc-checkbox-frame{background-color:transparent;border-width:1px;border-width:var(--mc-checkbox-size-border-width, 1px);border-style:solid;box-shadow:inset 0 0 1px #0003;box-shadow:var(--mc-checkbox-size-toggle-box-shadow, inset 0 0 1px 0 rgba(0, 0, 0, .2))}.mc-checkbox{display:inline-block;cursor:pointer;-webkit-tap-highlight-color:transparent}.mc-checkbox.mc-checked .mc-checkbox-checkmark{display:block}.mc-checkbox.mc-checked .mc-checkbox-mixedmark{display:none}.mc-checkbox.mc-indeterminate .mc-checkbox-checkmark{display:none}.mc-checkbox.mc-indeterminate .mc-checkbox-mixedmark{display:block}.mc-checkbox.mc-disabled{cursor:default}.mc-checkbox.mc-disabled .mc-checkbox-frame{box-shadow:none}.mc-checkbox-layout{cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap;width:100%}.mc-checkbox-inner-container{display:inline-block;height:16px;height:var(--mc-checkbox-size-width, 16px);line-height:0;margin-right:8px;order:0;position:relative;align-self:center;white-space:nowrap;width:16px;width:var(--mc-checkbox-size-width, 16px);flex-shrink:0}[dir=rtl] .mc-checkbox-inner-container{margin-left:8px;margin-right:auto}.mc-checkbox-inner-container-no-side-margin{margin-left:0;margin-right:0}.mc-checkbox-label-before .mc-checkbox-inner-container{order:1;margin-left:8px;margin-right:auto}[dir=rtl] .mc-checkbox-label-before .mc-checkbox-inner-container{margin-left:auto;margin-right:8px}\n"], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McCheckbox, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-checkbox',
                        exportAs: 'mcCheckbox',
                        templateUrl: 'checkbox.html',
                        styleUrls: ['checkbox.scss'],
                        host: {
                            class: 'mc-checkbox',
                            '[id]': 'id',
                            '[attr.id]': 'id',
                            '[class.mc-indeterminate]': 'indeterminate',
                            '[class.mc-checked]': 'checked',
                            '[class.mc-disabled]': 'disabled',
                            '[class.mc-checkbox-label-before]': 'labelPosition == "before"'
                        },
                        providers: [MC_CHECKBOX_CONTROL_VALUE_ACCESSOR],
                        inputs: ['color', 'tabIndex'],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.ChangeDetectorRef }, { type: i1__namespace.FocusMonitor }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [MC_CHECKBOX_CLICK_ACTION]
                        }] }];
        }, propDecorators: { ariaLabel: [{
                    type: i0.Input,
                    args: ['aria-label']
                }], ariaLabelledby: [{
                    type: i0.Input,
                    args: ['aria-labelledby']
                }], id: [{
                    type: i0.Input
                }], labelPosition: [{
                    type: i0.Input
                }], name: [{
                    type: i0.Input
                }], change: [{
                    type: i0.Output
                }], indeterminateChange: [{
                    type: i0.Output
                }], value: [{
                    type: i0.Input
                }], inputElement: [{
                    type: i0.ViewChild,
                    args: ['input', { static: false }]
                }], required: [{
                    type: i0.Input
                }], checked: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], indeterminate: [{
                    type: i0.Input
                }] } });

    var MC_CHECKBOX_REQUIRED_VALIDATOR = {
        provide: forms.NG_VALIDATORS,
        useExisting: i0.forwardRef(function () { return McCheckboxRequiredValidator; }),
        multi: true
    };
    /**
     * Validator for Mosaic checkbox's required attribute in template-driven checkbox.
     * Current CheckboxRequiredValidator only work with `input type=checkbox` and does not
     * work with `mc-checkbox`.
     */
    var McCheckboxRequiredValidator = /** @class */ (function (_super) {
        __extends(McCheckboxRequiredValidator, _super);
        function McCheckboxRequiredValidator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return McCheckboxRequiredValidator;
    }(forms.CheckboxRequiredValidator));
    /** @nocollapse */ McCheckboxRequiredValidator.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McCheckboxRequiredValidator, deps: null, target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McCheckboxRequiredValidator.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McCheckboxRequiredValidator, selector: "mc-checkbox[required][formControlName],\n             mc-checkbox[required][formControl], mc-checkbox[required][ngModel]", host: { properties: { "attr.required": "required ? \"\" : null" } }, providers: [MC_CHECKBOX_REQUIRED_VALIDATOR], usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McCheckboxRequiredValidator, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: "mc-checkbox[required][formControlName],\n             mc-checkbox[required][formControl], mc-checkbox[required][ngModel]",
                        providers: [MC_CHECKBOX_REQUIRED_VALIDATOR],
                        host: { '[attr.required]': 'required ? "" : null' }
                    }]
            }] });

    var McCheckboxModule = /** @class */ (function () {
        function McCheckboxModule() {
        }
        return McCheckboxModule;
    }());
    /** @nocollapse */ McCheckboxModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McCheckboxModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ McCheckboxModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McCheckboxModule, declarations: [McCheckbox, McCheckboxRequiredValidator], imports: [common.CommonModule], exports: [McCheckbox, McCheckboxRequiredValidator] });
    /** @nocollapse */ McCheckboxModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McCheckboxModule, imports: [[common.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McCheckboxModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule],
                        exports: [McCheckbox, McCheckboxRequiredValidator],
                        declarations: [McCheckbox, McCheckboxRequiredValidator]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.MC_CHECKBOX_CLICK_ACTION = MC_CHECKBOX_CLICK_ACTION;
    exports.MC_CHECKBOX_CONTROL_VALUE_ACCESSOR = MC_CHECKBOX_CONTROL_VALUE_ACCESSOR;
    exports.MC_CHECKBOX_REQUIRED_VALIDATOR = MC_CHECKBOX_REQUIRED_VALIDATOR;
    exports.McCheckbox = McCheckbox;
    exports.McCheckboxBase = McCheckboxBase;
    exports.McCheckboxChange = McCheckboxChange;
    exports.McCheckboxMixinBase = McCheckboxMixinBase;
    exports.McCheckboxModule = McCheckboxModule;
    exports.McCheckboxRequiredValidator = McCheckboxRequiredValidator;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ptsecurity-mosaic-checkbox.umd.js.map
