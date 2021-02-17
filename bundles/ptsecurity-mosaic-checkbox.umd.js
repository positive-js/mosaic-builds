(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/core'), require('@angular/forms'), require('@ptsecurity/mosaic/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/checkbox', ['exports', '@angular/cdk/a11y', '@angular/core', '@angular/forms', '@ptsecurity/mosaic/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.checkbox = {}), global.ng.cdk.a11y, global.ng.core, global.ng.forms, global.ptsecurity.mosaic.core, global.ng.common));
}(this, (function (exports, a11y, core, forms, core$1, common) { 'use strict';

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
     * Generated from: checkbox-config.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Injection token that can be used to specify the checkbox click behavior.
     * @type {?}
     */
    var MC_CHECKBOX_CLICK_ACTION = new core.InjectionToken('mc-checkbox-click-action');

    // Increasing integer for generating unique ids for checkbox components.
    /** @type {?} */
    var nextUniqueId = 0;
    /**
     * Provider Expression that allows mc-checkbox to register as a ControlValueAccessor.
     * This allows it to support [(ngModel)].
     * \@docs-private
     * @type {?}
     */
    var MC_CHECKBOX_CONTROL_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(( /**
         * @return {?}
         */function () { return McCheckbox; })),
        multi: true
    };
    /** @enum {number} */
    var TransitionCheckState = {
        /** The initial state of the component before any user interaction. */
        Init: 0,
        /** The state representing the component when it's becoming checked. */
        Checked: 1,
        /** The state representing the component when it's becoming unchecked. */
        Unchecked: 2,
        /** The state representing the component when it's becoming indeterminate. */
        Indeterminate: 3,
    };
    TransitionCheckState[TransitionCheckState.Init] = 'Init';
    TransitionCheckState[TransitionCheckState.Checked] = 'Checked';
    TransitionCheckState[TransitionCheckState.Unchecked] = 'Unchecked';
    TransitionCheckState[TransitionCheckState.Indeterminate] = 'Indeterminate';
    /**
     * Change event object emitted by McCheckbox.
     */
    var McCheckboxChange = /** @class */ (function () {
        function McCheckboxChange() {
        }
        return McCheckboxChange;
    }());
    if (false) {
        /**
         * The source McCheckbox of the event.
         * @type {?}
         */
        McCheckboxChange.prototype.source;
        /**
         * The new `checked` value of the checkbox.
         * @type {?}
         */
        McCheckboxChange.prototype.checked;
    }
    // Boilerplate for applying mixins to McCheckbox.
    /**
     * \@docs-private
     */
    var McCheckboxBase = /** @class */ (function () {
        // tslint:disable-next-line:naming-convention
        /**
         * @param {?} _elementRef
         */
        function McCheckboxBase(_elementRef) {
            this._elementRef = _elementRef;
        }
        return McCheckboxBase;
    }());
    if (false) {
        /** @type {?} */
        McCheckboxBase.prototype._elementRef;
    }
    // tslint:disable-next-line:naming-convention
    /** @type {?} */
    var McCheckboxMixinBase = core$1.mixinTabIndex(core$1.mixinColor(core$1.mixinDisabled(McCheckboxBase)));
    /**
     * A mosaic checkbox component. Supports all of the functionality of an HTML5 checkbox,
     * and exposes a similar API. A McCheckbox can be either checked, unchecked, indeterminate, or
     * disabled. Note that all additional accessibility attributes are taken care of by the component,
     * so there is no need to provide them yourself. However, if you want to omit a label and still
     * have the checkbox be accessible, you may supply an [aria-label] input.
     */
    var McCheckbox = /** @class */ (function (_super) {
        __extends(McCheckbox, _super);
        /**
         * @param {?} elementRef
         * @param {?} _changeDetectorRef
         * @param {?} _focusMonitor
         * @param {?} _clickAction
         */
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
            /**
             * Whether the label should appear after or before the checkbox. Defaults to 'after'
             */
            _this.labelPosition = 'after';
            /**
             * Name value will be applied to the input element if present
             */
            _this.name = null;
            /**
             * Event emitted when the checkbox's `checked` value changes.
             */
            _this.change = new core.EventEmitter();
            /**
             * Event emitted when the checkbox's `indeterminate` value changes.
             */
            _this.indeterminateChange = new core.EventEmitter();
            _this._checked = false;
            _this._disabled = false;
            _this._indeterminate = false;
            _this.uniqueId = "mc-checkbox-" + ++nextUniqueId;
            _this.currentAnimationClass = '';
            _this.currentCheckState = TransitionCheckState.Init;
            /**
             * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
             * \@docs-private
             */
            // tslint:disable-next-line:no-empty
            _this.onTouched = ( /**
             * @return {?}
             */function () { });
            // tslint:disable-next-line:no-empty
            _this.controlValueAccessorChangeFn = ( /**
             * @return {?}
             */function () { });
            _this.id = _this.uniqueId;
            return _this;
        }
        Object.defineProperty(McCheckbox.prototype, "inputId", {
            /**
             * Returns the unique id for the visual hidden input.
             * @return {?}
             */
            get: function () {
                return (this.id || this.uniqueId) + "-input";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McCheckbox.prototype, "required", {
            /**
             * Whether the checkbox is required.
             * @return {?}
             */
            get: function () {
                return this._required;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._required = core$1.toBoolean(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McCheckbox.prototype, "checked", {
            /**
             * Whether the checkbox is checked.
             * @return {?}
             */
            get: function () {
                return this._checked;
            },
            /**
             * @param {?} value
             * @return {?}
             */
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
             * @return {?}
             */
            get: function () {
                return this._disabled;
            },
            /**
             * @param {?} value
             * @return {?}
             */
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
             * @return {?}
             */
            get: function () {
                return this._indeterminate;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                /** @type {?} */
                var changed = value !== this._indeterminate;
                this._indeterminate = value;
                if (changed) {
                    if (this._indeterminate) {
                        this.transitionCheckState(TransitionCheckState.Indeterminate);
                    }
                    else {
                        this.transitionCheckState(this.checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
                    }
                    this.indeterminateChange.emit(this._indeterminate);
                }
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @return {?}
         */
        McCheckbox.prototype.ngAfterViewInit = function () {
            var _this = this;
            this._focusMonitor
                .monitor(this.inputElement.nativeElement)
                .subscribe(( /**
         * @param {?} focusOrigin
         * @return {?}
         */function (focusOrigin) { return _this.onInputFocusChange(focusOrigin); }));
        };
        /**
         * @return {?}
         */
        McCheckbox.prototype.ngOnDestroy = function () {
            this._focusMonitor.stopMonitoring(this.inputElement.nativeElement);
        };
        /**
         * Method being called whenever the label text changes.
         * @return {?}
         */
        McCheckbox.prototype.onLabelTextChange = function () {
            // This method is getting called whenever the label of the checkbox changes.
            // Since the checkbox uses the OnPush strategy we need to notify it about the change
            // that has been recognized by the cdkObserveContent directive.
            this._changeDetectorRef.markForCheck();
        };
        // Implemented as part of ControlValueAccessor.
        /**
         * @param {?} value
         * @return {?}
         */
        McCheckbox.prototype.writeValue = function (value) {
            this.checked = !!value;
        };
        // Implemented as part of ControlValueAccessor.
        /**
         * @param {?} fn
         * @return {?}
         */
        McCheckbox.prototype.registerOnChange = function (fn) {
            this.controlValueAccessorChangeFn = fn;
        };
        // Implemented as part of ControlValueAccessor.
        /**
         * @param {?} fn
         * @return {?}
         */
        McCheckbox.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        // Implemented as part of ControlValueAccessor.
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        McCheckbox.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
        };
        /**
         * @return {?}
         */
        McCheckbox.prototype.getAriaChecked = function () {
            return this.checked ? 'true' : (this.indeterminate ? 'mixed' : 'false');
        };
        /**
         * Toggles the `checked` state of the checkbox.
         * @return {?}
         */
        McCheckbox.prototype.toggle = function () {
            this.checked = !this.checked;
        };
        /**
         * Event handler for checkbox input element.
         * Toggles checked state if element is not disabled.
         * Do not toggle on (change) event since IE doesn't fire change event when
         *   indeterminate checkbox is clicked.
         * @param {?} event Input click event
         * @return {?}
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
                    Promise.resolve().then(( /**
                     * @return {?}
                     */function () {
                        _this._indeterminate = false;
                        _this.indeterminateChange.emit(_this._indeterminate);
                    }));
                }
                this.toggle();
                this.transitionCheckState(this._checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
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
        /**
         * Focuses the checkbox.
         * @return {?}
         */
        McCheckbox.prototype.focus = function () {
            this._focusMonitor.focusVia(this.inputElement.nativeElement, 'keyboard');
        };
        /**
         * @param {?} event
         * @return {?}
         */
        McCheckbox.prototype.onInteractionEvent = function (event) {
            // We always have to stop propagation on the change event.
            // Otherwise the change event, from the input element, will bubble up and
            // emit its event object to the `change` output.
            event.stopPropagation();
        };
        /**
         * @private
         * @param {?} newState
         * @return {?}
         */
        McCheckbox.prototype.transitionCheckState = function (newState) {
            /** @type {?} */
            var oldState = this.currentCheckState;
            /** @type {?} */
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
        /**
         * @private
         * @return {?}
         */
        McCheckbox.prototype.emitChangeEvent = function () {
            /** @type {?} */
            var event = new McCheckboxChange();
            event.source = this;
            event.checked = this.checked;
            this.controlValueAccessorChangeFn(this.checked);
            this.change.emit(event);
        };
        /**
         * Function is called whenever the focus changes for the input element.
         * @private
         * @param {?} focusOrigin
         * @return {?}
         */
        McCheckbox.prototype.onInputFocusChange = function (focusOrigin) {
            if (focusOrigin) {
                this.onTouched();
            }
        };
        return McCheckbox;
    }(McCheckboxMixinBase));
    McCheckbox.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-checkbox',
                    exportAs: 'mcCheckbox',
                    template: "<label [attr.for]=\"inputId\" class=\"mc-checkbox-layout\" #label>\n    <div class=\"mc-checkbox-inner-container\"\n         [class.mc-checkbox-inner-container-no-side-margin]=\"!checkboxLabel.textContent || !checkboxLabel.textContent.trim()\">\n        <input #input\n               type=\"checkbox\"\n               class=\"mc-checkbox-input cdk-visually-hidden\"\n               [id]=\"inputId\"\n               [required]=\"required\"\n               [checked]=\"checked\"\n               [attr.value]=\"value\"\n               [disabled]=\"disabled\"\n               [attr.name]=\"name\"\n               [tabIndex]=\"tabIndex\"\n               [indeterminate]=\"indeterminate\"\n               [attr.aria-label]=\"ariaLabel || null\"\n               [attr.aria-labelledby]=\"ariaLabelledby\"\n               [attr.aria-checked]=\"getAriaChecked()\"\n               (change)=\"onInteractionEvent($event)\"\n               (click)=\"onInputClick($event)\">\n        <div class=\"mc-checkbox-frame\">\n            <i class=\"mc-checkbox-checkmark mc mc-check_16\"></i>\n            <i class=\"mc-checkbox-mixedmark mc mc-minus_16\"></i>\n        </div>\n    </div>\n\n    <span class=\"mc-checkbox-label\" #checkboxLabel (cdkObserveContent)=\"onLabelTextChange()\">\n    <ng-content></ng-content>\n  </span>\n</label>\n",
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
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".mc-checkbox-frame{border-radius:3px;bottom:0;box-sizing:border-box;left:0;pointer-events:none;position:absolute;right:0;top:0}.mc-checkbox-checkmark,.mc-checkbox-mixedmark{bottom:0;display:none;left:-1px;position:absolute;right:0;top:-1px}.mc-checkbox-frame{background-color:transparent;border-style:solid;border-width:var(--mc-checkbox-size-border-width,1px);box-shadow:var(--mc-checkbox-size-toggle-box-shadow,inset 0 0 1px 0 rgba(0,0,0,.2))}.mc-checkbox{-webkit-tap-highlight-color:transparent;cursor:pointer;display:inline-block}.mc-checkbox.mc-checked .mc-checkbox-checkmark{display:block}.mc-checkbox.mc-checked .mc-checkbox-mixedmark,.mc-checkbox.mc-indeterminate .mc-checkbox-checkmark{display:none}.mc-checkbox.mc-indeterminate .mc-checkbox-mixedmark{display:block}.mc-checkbox.mc-disabled{cursor:default}.mc-checkbox.mc-disabled .mc-checkbox-frame{box-shadow:none}.mc-checkbox-layout{align-items:baseline;cursor:inherit;display:inline-flex;vertical-align:middle;white-space:nowrap;width:100%}.mc-checkbox-inner-container{-ms-grid-row-align:center;align-self:center;display:inline-block;flex-shrink:0;height:var(--mc-checkbox-size-width,16px);line-height:0;margin-right:8px;order:0;position:relative;white-space:nowrap;width:var(--mc-checkbox-size-width,16px)}[dir=rtl] .mc-checkbox-inner-container{margin-left:8px;margin-right:auto}.mc-checkbox-inner-container-no-side-margin{margin-left:0;margin-right:0}.mc-checkbox-label-before .mc-checkbox-inner-container{margin-left:8px;margin-right:auto;order:1}[dir=rtl] .mc-checkbox-label-before .mc-checkbox-inner-container{margin-left:auto;margin-right:8px}"]
                }] }
    ];
    /** @nocollapse */
    McCheckbox.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef },
        { type: a11y.FocusMonitor },
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [MC_CHECKBOX_CLICK_ACTION,] }] }
    ]; };
    McCheckbox.propDecorators = {
        ariaLabel: [{ type: core.Input, args: ['aria-label',] }],
        ariaLabelledby: [{ type: core.Input, args: ['aria-labelledby',] }],
        id: [{ type: core.Input }],
        labelPosition: [{ type: core.Input }],
        name: [{ type: core.Input }],
        change: [{ type: core.Output }],
        indeterminateChange: [{ type: core.Output }],
        value: [{ type: core.Input }],
        inputElement: [{ type: core.ViewChild, args: ['input', { static: false },] }],
        required: [{ type: core.Input }],
        checked: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        indeterminate: [{ type: core.Input }]
    };
    if (false) {
        /**
         * Attached to the aria-label attribute of the host element. In most cases, arial-labelledby will
         * take precedence so this may be omitted.
         * @type {?}
         */
        McCheckbox.prototype.ariaLabel;
        /**
         * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
         * @type {?}
         */
        McCheckbox.prototype.ariaLabelledby;
        /**
         * A unique id for the checkbox input. If none is supplied, it will be auto-generated.
         * @type {?}
         */
        McCheckbox.prototype.id;
        /**
         * Whether the label should appear after or before the checkbox. Defaults to 'after'
         * @type {?}
         */
        McCheckbox.prototype.labelPosition;
        /**
         * Name value will be applied to the input element if present
         * @type {?}
         */
        McCheckbox.prototype.name;
        /**
         * Event emitted when the checkbox's `checked` value changes.
         * @type {?}
         */
        McCheckbox.prototype.change;
        /**
         * Event emitted when the checkbox's `indeterminate` value changes.
         * @type {?}
         */
        McCheckbox.prototype.indeterminateChange;
        /**
         * The value attribute of the native input element
         * @type {?}
         */
        McCheckbox.prototype.value;
        /**
         * The native `<input type="checkbox">` element
         * @type {?}
         */
        McCheckbox.prototype.inputElement;
        /**
         * @type {?}
         * @private
         */
        McCheckbox.prototype._required;
        /**
         * @type {?}
         * @private
         */
        McCheckbox.prototype._checked;
        /**
         * @type {?}
         * @private
         */
        McCheckbox.prototype._disabled;
        /**
         * @type {?}
         * @private
         */
        McCheckbox.prototype._indeterminate;
        /**
         * @type {?}
         * @private
         */
        McCheckbox.prototype.uniqueId;
        /**
         * @type {?}
         * @private
         */
        McCheckbox.prototype.currentAnimationClass;
        /**
         * @type {?}
         * @private
         */
        McCheckbox.prototype.currentCheckState;
        /**
         * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
         * \@docs-private
         * @type {?}
         */
        McCheckbox.prototype.onTouched;
        /**
         * @type {?}
         * @private
         */
        McCheckbox.prototype.controlValueAccessorChangeFn;
        /**
         * @type {?}
         * @private
         */
        McCheckbox.prototype._changeDetectorRef;
        /**
         * @type {?}
         * @private
         */
        McCheckbox.prototype._focusMonitor;
        /**
         * @type {?}
         * @private
         */
        McCheckbox.prototype._clickAction;
    }

    /** @type {?} */
    var MC_CHECKBOX_REQUIRED_VALIDATOR = {
        provide: forms.NG_VALIDATORS,
        useExisting: core.forwardRef(( /**
         * @return {?}
         */function () { return McCheckboxRequiredValidator; })),
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
    McCheckboxRequiredValidator.decorators = [
        { type: core.Directive, args: [{
                    selector: "mc-checkbox[required][formControlName],\n             mc-checkbox[required][formControl], mc-checkbox[required][ngModel]",
                    providers: [MC_CHECKBOX_REQUIRED_VALIDATOR],
                    host: { '[attr.required]': 'required ? "" : null' }
                },] }
    ];

    /**
     * @fileoverview added by tsickle
     * Generated from: checkbox-module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McCheckboxModule = /** @class */ (function () {
        function McCheckboxModule() {
        }
        return McCheckboxModule;
    }());
    McCheckboxModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [McCheckbox, McCheckboxRequiredValidator],
                    declarations: [McCheckbox, McCheckboxRequiredValidator]
                },] }
    ];

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
     * Generated from: ptsecurity-mosaic-checkbox.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    exports.TransitionCheckState = TransitionCheckState;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-checkbox.umd.js.map
