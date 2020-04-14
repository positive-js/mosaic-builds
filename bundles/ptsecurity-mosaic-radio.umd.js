(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/core'), require('@angular/cdk/collections'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/radio', ['exports', '@angular/cdk/a11y', '@angular/common', '@angular/core', '@ptsecurity/mosaic/core', '@angular/cdk/collections', '@angular/forms'], factory) :
    (global = global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.radio = {}), global.ng.cdk.a11y, global.ng.common, global.ng.core, global.ptsecurity.mosaic.core, global.ng.cdk.collections, global.ng.forms));
}(this, (function (exports, a11y, common, core, core$1, collections, forms) { 'use strict';

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
     * Generated from: radio.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // Increasing integer for generating unique ids for radio components.
    /** @type {?} */
    var nextUniqueId = 0;
    /**
     * Change event object emitted by McRadio.
     */
    var   /**
     * Change event object emitted by McRadio.
     */
    McRadioChange = /** @class */ (function () {
        function McRadioChange(source, value) {
            this.source = source;
            this.value = value;
        }
        return McRadioChange;
    }());
    if (false) {
        /**
         * The McRadioButton that emits the change event.
         * @type {?}
         */
        McRadioChange.prototype.source;
        /**
         * The value of the McRadioButton.
         * @type {?}
         */
        McRadioChange.prototype.value;
    }
    // Boilerplate for applying mixins to McRadioGroup.
    /**
     * \@docs-private
     */
    var   
    // Boilerplate for applying mixins to McRadioGroup.
    /**
     * \@docs-private
     */
    McRadioGroupBase = /** @class */ (function () {
        // tslint:disable-next-line:naming-convention
        function McRadioGroupBase(_elementRef) {
            this._elementRef = _elementRef;
        }
        return McRadioGroupBase;
    }());
    if (false) {
        /** @type {?} */
        McRadioGroupBase.prototype._elementRef;
    }
    // tslint:disable-next-line:naming-convention
    /** @type {?} */
    var McRadioGroupMixinBase = core$1.mixinDisabled(McRadioGroupBase);
    /**
     * Provider Expression that allows mc-radio-group to register as a ControlValueAccessor. This
     * allows it to support [(ngModel)] and ngControl.
     * \@docs-private
     * @type {?}
     */
    var MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef((/**
         * @return {?}
         */
        function () { return McRadioGroup; })),
        multi: true
    };
    var McRadioGroup = /** @class */ (function (_super) {
        __extends(McRadioGroup, _super);
        function McRadioGroup(elementRef, _changeDetector) {
            var _this = _super.call(this, elementRef) || this;
            _this._changeDetector = _changeDetector;
            /**
             * Event emitted when the group value changes.
             * Change events are only emitted when the value changes due to user interaction with
             * a radio button (the same behavior as `<input type-"radio">`).
             */
            _this.change = new core.EventEmitter();
            /**
             * Selected value for group. Should equal the value of the selected radio button if there *is*
             * a corresponding radio button with a matching value. If there is *not* such a corresponding
             * radio button, this value persists to be applied in case a new radio button is added with a
             * matching value.
             */
            _this._value = null;
            /**
             * The HTML name attribute applied to radio buttons in this group.
             */
            _this._name = "mc-radio-group-" + nextUniqueId++;
            /**
             * The currently selected radio button. Should match value.
             */
            _this._selected = null;
            /**
             * Whether the `value` has been set to its initial value.
             */
            _this.isInitialized = false;
            /**
             * Whether the labels should appear after or before the radio-buttons. Defaults to 'after'
             */
            _this._labelPosition = 'after';
            /**
             * Whether the radio group is disabled.
             */
            _this._disabled = false;
            /**
             * Whether the radio group is required.
             */
            _this._required = false;
            /**
             * The method to be called in order to update ngModel
             */
            // tslint:disable-next-line
            _this.controlValueAccessorChangeFn = (/**
             * @return {?}
             */
            function () { });
            /**
             * onTouch function registered via registerOnTouch (ControlValueAccessor).
             * \@docs-private
             */
            // tslint:disable-next-line
            _this.onTouched = (/**
             * @return {?}
             */
            function () { });
            return _this;
        }
        Object.defineProperty(McRadioGroup.prototype, "name", {
            /** Name of the radio button group. All radio buttons inside this group will use this name. */
            get: /**
             * Name of the radio button group. All radio buttons inside this group will use this name.
             * @return {?}
             */
            function () { return this._name; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._name = value;
                this.updateRadioButtonNames();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McRadioGroup.prototype, "labelPosition", {
            /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
            get: /**
             * Whether the labels should appear after or before the radio-buttons. Defaults to 'after'
             * @return {?}
             */
            function () {
                return this._labelPosition;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */
            function (v) {
                this._labelPosition = v === 'before' ? 'before' : 'after';
                this.markRadiosForCheck();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McRadioGroup.prototype, "value", {
            /** Value of the radio button. */
            get: /**
             * Value of the radio button.
             * @return {?}
             */
            function () { return this._value; },
            set: /**
             * @param {?} newValue
             * @return {?}
             */
            function (newValue) {
                if (this._value !== newValue) {
                    // Set this before proceeding to ensure no circular loop occurs with selection.
                    this._value = newValue;
                    this.updateSelectedRadioFromValue();
                    this.checkSelectedRadioButton();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McRadioGroup.prototype, "selected", {
            /** Whether the radio button is selected. */
            get: /**
             * Whether the radio button is selected.
             * @return {?}
             */
            function () { return this._selected; },
            set: /**
             * @param {?} selected
             * @return {?}
             */
            function (selected) {
                this._selected = selected;
                this.value = selected ? selected.value : null;
                this.checkSelectedRadioButton();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McRadioGroup.prototype, "disabled", {
            /** Whether the radio group is disabled */
            get: /**
             * Whether the radio group is disabled
             * @return {?}
             */
            function () { return this._disabled; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._disabled = core$1.toBoolean(value);
                this.markRadiosForCheck();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McRadioGroup.prototype, "required", {
            /** Whether the radio group is required */
            get: /**
             * Whether the radio group is required
             * @return {?}
             */
            function () { return this._required; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._required = core$1.toBoolean(value);
                this.markRadiosForCheck();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        McRadioGroup.prototype.checkSelectedRadioButton = /**
         * @return {?}
         */
        function () {
            if (this._selected && !this._selected.checked) {
                this._selected.checked = true;
            }
        };
        /**
         * Initialize properties once content children are available.
         * This allows us to propagate relevant attributes to associated buttons.
         */
        /**
         * Initialize properties once content children are available.
         * This allows us to propagate relevant attributes to associated buttons.
         * @return {?}
         */
        McRadioGroup.prototype.ngAfterContentInit = /**
         * Initialize properties once content children are available.
         * This allows us to propagate relevant attributes to associated buttons.
         * @return {?}
         */
        function () {
            // Mark this component as initialized in AfterContentInit because the initial value can
            // possibly be set by NgModel on McRadioGroup, and it is possible that the OnInit of the
            // NgModel occurs *after* the OnInit of the McRadioGroup.
            this.isInitialized = true;
        };
        /**
         * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
         * radio buttons upon their blur.
         */
        /**
         * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
         * radio buttons upon their blur.
         * @return {?}
         */
        McRadioGroup.prototype.touch = /**
         * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
         * radio buttons upon their blur.
         * @return {?}
         */
        function () {
            if (this.onTouched) {
                this.onTouched();
            }
        };
        /** Dispatch change event with current selection and group value. */
        /**
         * Dispatch change event with current selection and group value.
         * @return {?}
         */
        McRadioGroup.prototype.emitChangeEvent = /**
         * Dispatch change event with current selection and group value.
         * @return {?}
         */
        function () {
            if (this.isInitialized) {
                this.change.emit(new McRadioChange((/** @type {?} */ (this._selected)), this._value));
            }
        };
        /**
         * @return {?}
         */
        McRadioGroup.prototype.markRadiosForCheck = /**
         * @return {?}
         */
        function () {
            if (this.radios) {
                this.radios.forEach((/**
                 * @param {?} radio
                 * @return {?}
                 */
                function (radio) { return radio.markForCheck(); }));
            }
        };
        /**
         * Sets the model value. Implemented as part of ControlValueAccessor.
         */
        /**
         * Sets the model value. Implemented as part of ControlValueAccessor.
         * @param {?} value
         * @return {?}
         */
        McRadioGroup.prototype.writeValue = /**
         * Sets the model value. Implemented as part of ControlValueAccessor.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.value = value;
            this._changeDetector.markForCheck();
        };
        /**
         * Registers a callback to be triggered when the model value changes.
         * Implemented as part of ControlValueAccessor.
         * @param fn Callback to be registered.
         */
        /**
         * Registers a callback to be triggered when the model value changes.
         * Implemented as part of ControlValueAccessor.
         * @param {?} fn Callback to be registered.
         * @return {?}
         */
        McRadioGroup.prototype.registerOnChange = /**
         * Registers a callback to be triggered when the model value changes.
         * Implemented as part of ControlValueAccessor.
         * @param {?} fn Callback to be registered.
         * @return {?}
         */
        function (fn) {
            this.controlValueAccessorChangeFn = fn;
        };
        /**
         * Registers a callback to be triggered when the control is touched.
         * Implemented as part of ControlValueAccessor.
         * @param fn Callback to be registered.
         */
        /**
         * Registers a callback to be triggered when the control is touched.
         * Implemented as part of ControlValueAccessor.
         * @param {?} fn Callback to be registered.
         * @return {?}
         */
        McRadioGroup.prototype.registerOnTouched = /**
         * Registers a callback to be triggered when the control is touched.
         * Implemented as part of ControlValueAccessor.
         * @param {?} fn Callback to be registered.
         * @return {?}
         */
        function (fn) {
            this.onTouched = fn;
        };
        /**
         * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
         * @param isDisabled Whether the control should be disabled.
         */
        /**
         * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
         * @param {?} isDisabled Whether the control should be disabled.
         * @return {?}
         */
        McRadioGroup.prototype.setDisabledState = /**
         * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
         * @param {?} isDisabled Whether the control should be disabled.
         * @return {?}
         */
        function (isDisabled) {
            this.disabled = isDisabled;
            this._changeDetector.markForCheck();
        };
        /**
         * @private
         * @return {?}
         */
        McRadioGroup.prototype.updateRadioButtonNames = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.radios) {
                this.radios.forEach((/**
                 * @param {?} radio
                 * @return {?}
                 */
                function (radio) {
                    radio.name = _this.name;
                }));
            }
        };
        /** Updates the `selected` radio button from the internal _value state. */
        /**
         * Updates the `selected` radio button from the internal _value state.
         * @private
         * @return {?}
         */
        McRadioGroup.prototype.updateSelectedRadioFromValue = /**
         * Updates the `selected` radio button from the internal _value state.
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            // If the value already matches the selected radio, do nothing.
            /** @type {?} */
            var isAlreadySelected = this._selected !== null && this._selected.value === this._value;
            if (this.radios != null && !isAlreadySelected) {
                this._selected = null;
                this.radios.forEach((/**
                 * @param {?} radio
                 * @return {?}
                 */
                function (radio) {
                    radio.checked = _this.value === radio.value;
                    if (radio.checked) {
                        _this._selected = radio;
                    }
                }));
            }
        };
        McRadioGroup.decorators = [
            { type: core.Directive, args: [{
                        selector: 'mc-radio-group',
                        exportAs: 'mcRadioGroup',
                        host: {
                            role: 'radiogroup',
                            class: 'mc-radio-group'
                        },
                        providers: [MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR]
                    },] }
        ];
        /** @nocollapse */
        McRadioGroup.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef }
        ]; };
        McRadioGroup.propDecorators = {
            name: [{ type: core.Input }],
            labelPosition: [{ type: core.Input }],
            value: [{ type: core.Input }],
            selected: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            required: [{ type: core.Input }],
            change: [{ type: core.Output }],
            radios: [{ type: core.ContentChildren, args: [core.forwardRef((/**
                         * @return {?}
                         */
                        function () { return McRadioButton; })), { descendants: true },] }]
        };
        return McRadioGroup;
    }(McRadioGroupMixinBase));
    if (false) {
        /**
         * Event emitted when the group value changes.
         * Change events are only emitted when the value changes due to user interaction with
         * a radio button (the same behavior as `<input type-"radio">`).
         * @type {?}
         */
        McRadioGroup.prototype.change;
        /**
         * Child radio buttons.
         * @type {?}
         */
        McRadioGroup.prototype.radios;
        /**
         * Selected value for group. Should equal the value of the selected radio button if there *is*
         * a corresponding radio button with a matching value. If there is *not* such a corresponding
         * radio button, this value persists to be applied in case a new radio button is added with a
         * matching value.
         * @type {?}
         * @private
         */
        McRadioGroup.prototype._value;
        /**
         * The HTML name attribute applied to radio buttons in this group.
         * @type {?}
         * @private
         */
        McRadioGroup.prototype._name;
        /**
         * The currently selected radio button. Should match value.
         * @type {?}
         * @private
         */
        McRadioGroup.prototype._selected;
        /**
         * Whether the `value` has been set to its initial value.
         * @type {?}
         * @private
         */
        McRadioGroup.prototype.isInitialized;
        /**
         * Whether the labels should appear after or before the radio-buttons. Defaults to 'after'
         * @type {?}
         * @private
         */
        McRadioGroup.prototype._labelPosition;
        /**
         * Whether the radio group is disabled.
         * @type {?}
         * @private
         */
        McRadioGroup.prototype._disabled;
        /**
         * Whether the radio group is required.
         * @type {?}
         * @private
         */
        McRadioGroup.prototype._required;
        /**
         * The method to be called in order to update ngModel
         * @type {?}
         */
        McRadioGroup.prototype.controlValueAccessorChangeFn;
        /**
         * onTouch function registered via registerOnTouch (ControlValueAccessor).
         * \@docs-private
         * @type {?}
         */
        McRadioGroup.prototype.onTouched;
        /**
         * @type {?}
         * @private
         */
        McRadioGroup.prototype._changeDetector;
    }
    // Boilerplate for applying mixins to McRadioButton.
    /**
     * \@docs-private
     */
    var   
    // Boilerplate for applying mixins to McRadioButton.
    /**
     * \@docs-private
     */
    McRadioButtonBase = /** @class */ (function () {
        // tslint:disable-next-line:naming-convention
        function McRadioButtonBase(_elementRef) {
            this._elementRef = _elementRef;
        }
        return McRadioButtonBase;
    }());
    if (false) {
        /** @type {?} */
        McRadioButtonBase.prototype.disabled;
        /** @type {?} */
        McRadioButtonBase.prototype._elementRef;
    }
    // tslint:disable-next-line:naming-convention
    /** @type {?} */
    var McRadioButtonMixinBase = core$1.mixinColor(core$1.mixinTabIndex(McRadioButtonBase));
    var McRadioButton = /** @class */ (function (_super) {
        __extends(McRadioButton, _super);
        function McRadioButton(radioGroup, elementRef, _changeDetector, focusMonitor, _radioDispatcher) {
            var _this = _super.call(this, elementRef) || this;
            _this._changeDetector = _changeDetector;
            _this.focusMonitor = focusMonitor;
            _this._radioDispatcher = _radioDispatcher;
            /**
             * Event emitted when the checked state of this radio button changes.
             * Change events are only emitted when the value changes due to user interaction with
             * the radio button (the same behavior as `<input type-"radio">`).
             */
            _this.change = new core.EventEmitter();
            _this.isFocused = false;
            /* tslint:disable:member-ordering */
            _this.uniqueId = "mc-radio-" + ++nextUniqueId;
            /**
             * Whether this radio is checked.
             */
            _this._checked = false;
            /**
             * Value assigned to this radio.
             */
            _this._value = null;
            /**
             * Unregister function for _radioDispatcher
             */
            // tslint:disable-next-line
            _this.removeUniqueSelectionListener = (/**
             * @return {?}
             */
            function () { });
            _this.id = _this.uniqueId;
            _this.radioGroup = radioGroup;
            _this.removeUniqueSelectionListener =
                _radioDispatcher.listen((/**
                 * @param {?} id
                 * @param {?} name
                 * @return {?}
                 */
                function (id, name) {
                    if (id !== _this.id && name === _this.name) {
                        _this.checked = false;
                    }
                }));
            return _this;
        }
        Object.defineProperty(McRadioButton.prototype, "checked", {
            /** Whether this radio button is checked. */
            get: /**
             * Whether this radio button is checked.
             * @return {?}
             */
            function () { return this._checked; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                /** @type {?} */
                var newCheckedState = core$1.toBoolean(value);
                if (this._checked !== newCheckedState) {
                    this._checked = newCheckedState;
                    if (newCheckedState && this.radioGroup && this.radioGroup.value !== this.value) {
                        this.radioGroup.selected = this;
                    }
                    else if (!newCheckedState && this.radioGroup && this.radioGroup.value === this.value) {
                        // When unchecking the selected radio button, update the selected radio
                        // property on the group.
                        this.radioGroup.selected = null;
                    }
                    if (newCheckedState) {
                        // Notify all radio buttons with the same name to un-check.
                        this._radioDispatcher.notify(this.id, this.name);
                    }
                    this._changeDetector.markForCheck();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McRadioButton.prototype, "value", {
            /** The value of this radio button. */
            get: /**
             * The value of this radio button.
             * @return {?}
             */
            function () { return this._value; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (this._value !== value) {
                    this._value = value;
                    if (this.radioGroup != null) {
                        if (!this.checked) {
                            // Update checked when the value changed to match the radio group's value
                            this.checked = this.radioGroup.value === value;
                        }
                        if (this.checked) {
                            this.radioGroup.selected = this;
                        }
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McRadioButton.prototype, "disabled", {
            /** Whether the radio button is disabled. */
            get: /**
             * Whether the radio button is disabled.
             * @return {?}
             */
            function () {
                return this._disabled || (this.radioGroup != null && this.radioGroup.disabled);
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                /** @type {?} */
                var newDisabledState = core$1.toBoolean(value);
                if (this._disabled !== newDisabledState) {
                    this._disabled = newDisabledState;
                    this._changeDetector.markForCheck();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McRadioButton.prototype, "required", {
            /** Whether the radio button is required. */
            get: /**
             * Whether the radio button is required.
             * @return {?}
             */
            function () {
                return this._required || (this.radioGroup && this.radioGroup.required);
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._required = core$1.toBoolean(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McRadioButton.prototype, "labelPosition", {
            /** Whether the label should appear after or before the radio button. Defaults to 'after' */
            get: /**
             * Whether the label should appear after or before the radio button. Defaults to 'after'
             * @return {?}
             */
            function () {
                return this._labelPosition || (this.radioGroup && this.radioGroup.labelPosition) || 'after';
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._labelPosition = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McRadioButton.prototype, "inputId", {
            /** ID of the native input element inside `<mc-radio-button>` */
            get: /**
             * ID of the native input element inside `<mc-radio-button>`
             * @return {?}
             */
            function () { return (this.id || this.uniqueId) + "-input"; },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        McRadioButton.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            if (this.radioGroup) {
                // If the radio is inside a radio group, determine if it should be checked
                this.checked = this.radioGroup.value === this._value;
                // Copy name from parent radio group
                this.name = this.radioGroup.name;
            }
        };
        /**
         * @return {?}
         */
        McRadioButton.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.focusMonitor
                .monitor(this._elementRef, true)
                .subscribe((/**
             * @param {?} focusOrigin
             * @return {?}
             */
            function (focusOrigin) {
                if (!focusOrigin && _this.radioGroup) {
                    _this.radioGroup.touch();
                }
            }));
        };
        /**
         * @return {?}
         */
        McRadioButton.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.focusMonitor.stopMonitoring(this._elementRef);
            this.removeUniqueSelectionListener();
        };
        /** Focuses the radio button. */
        /**
         * Focuses the radio button.
         * @return {?}
         */
        McRadioButton.prototype.focus = /**
         * Focuses the radio button.
         * @return {?}
         */
        function () {
            this.inputElement.nativeElement.focus();
        };
        /**
         * Marks the radio button as needing checking for change detection.
         * This method is exposed because the parent radio group will directly
         * update bound properties of the radio button.
         */
        /**
         * Marks the radio button as needing checking for change detection.
         * This method is exposed because the parent radio group will directly
         * update bound properties of the radio button.
         * @return {?}
         */
        McRadioButton.prototype.markForCheck = /**
         * Marks the radio button as needing checking for change detection.
         * This method is exposed because the parent radio group will directly
         * update bound properties of the radio button.
         * @return {?}
         */
        function () {
            // When group value changes, the button will not be notified. Use `markForCheck` to explicit
            // update radio button's status
            this._changeDetector.markForCheck();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        McRadioButton.prototype.onInputClick = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // We have to stop propagation for click events on the visual hidden input element.
            // By default, when a user clicks on a label element, a generated click event will be
            // dispatched on the associated input element. Since we are using a label element as our
            // root container, the click event on the `radio-button` will be executed twice.
            // The real click event will bubble up, and the generated click event also tries to bubble up.
            // This will lead to multiple click events.
            // Preventing bubbling for the second event will solve that issue.
            event.stopPropagation();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        McRadioButton.prototype.onInputChange = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // We always have to stop propagation on the change event.
            // Otherwise the change event, from the input element, will bubble up and
            // emit its event object to the `change` output.
            event.stopPropagation();
            /** @type {?} */
            var groupValueChanged = this.radioGroup && this.value !== this.radioGroup.value;
            this.checked = true;
            this.emitChangeEvent();
            if (this.radioGroup) {
                this.radioGroup.controlValueAccessorChangeFn(this.value);
                this.radioGroup.touch();
                if (groupValueChanged) {
                    this.radioGroup.emitChangeEvent();
                }
            }
        };
        /** Dispatch change event with current value. */
        /**
         * Dispatch change event with current value.
         * @private
         * @return {?}
         */
        McRadioButton.prototype.emitChangeEvent = /**
         * Dispatch change event with current value.
         * @private
         * @return {?}
         */
        function () {
            this.change.emit(new McRadioChange(this, this._value));
        };
        McRadioButton.decorators = [
            { type: core.Component, args: [{
                        selector: 'mc-radio-button',
                        template: "<label class=\"mc-radio-label\" [attr.for]=\"inputId\" #label>\n    <input type=\"radio\"\n           class=\"mc-radio-input cdk-visually-hidden\"\n           #input\n           [id]=\"inputId\"\n           [checked]=\"checked\"\n           [disabled]=\"disabled\"\n           [tabIndex]=\"tabIndex\"\n           [attr.name]=\"name\"\n           [required]=\"required\"\n           [attr.aria-label]=\"ariaLabel\"\n           [attr.aria-labelledby]=\"ariaLabelledby\"\n           [attr.aria-describedby]=\"ariaDescribedby\"\n           (change)=\"onInputChange($event)\"\n           (click)=\"onInputClick($event)\">\n\n    <div class=\"mc-radio-label-content\" [class.mc-radio-label-before]=\"labelPosition == 'before'\">\n        <div class=\"mc-radio-button__outer-circle\"></div>\n        <div class=\"mc-radio-button__inner-circle\"></div>\n        <ng-content></ng-content>\n    </div>\n</label>\n",
                        inputs: ['color', 'tabIndex'],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        exportAs: 'mcRadioButton',
                        host: {
                            class: 'mc-radio-button',
                            '[attr.id]': 'id',
                            '[class.mc-selected]': 'checked',
                            '[class.mc-disabled]': 'disabled'
                        },
                        styles: [".mc-radio-button{display:inline-block}.mc-radio-label{display:inline-flex;align-items:center;vertical-align:middle;cursor:pointer;white-space:nowrap;width:100%}.mc-radio-label-content{display:inline-block;position:relative;order:0;line-height:inherit;padding-left:26px;padding-right:0}.mc-radio-label-content .mc-radio-button__inner-circle,.mc-radio-label-content .mc-radio-button__outer-circle{box-sizing:content-box;position:absolute;content:'';border-style:solid;border-radius:50%}.mc-radio-label-content .mc-radio-button__outer-circle{left:0;top:calc(50% - 8px);width:14px;height:14px;border-width:1px}.mc-radio-label-content .mc-radio-button__inner-circle{display:none;left:1px;top:calc(50% - 7px);width:6px;height:6px;border-width:4px}[dir=rtl] .mc-radio-label-content{padding-right:26px;padding-left:0}.mc-radio-input{position:absolute;outline:0;opacity:0}"]
                    }] }
        ];
        /** @nocollapse */
        McRadioButton.ctorParameters = function () { return [
            { type: McRadioGroup, decorators: [{ type: core.Optional }] },
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef },
            { type: a11y.FocusMonitor },
            { type: collections.UniqueSelectionDispatcher }
        ]; };
        McRadioButton.propDecorators = {
            checked: [{ type: core.Input }],
            value: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            required: [{ type: core.Input }],
            labelPosition: [{ type: core.Input }],
            name: [{ type: core.Input }],
            ariaLabel: [{ type: core.Input, args: ['aria-label',] }],
            ariaLabelledby: [{ type: core.Input, args: ['aria-labelledby',] }],
            ariaDescribedby: [{ type: core.Input, args: ['aria-describedby',] }],
            inputElement: [{ type: core.ViewChild, args: ['input', { static: false },] }],
            change: [{ type: core.Output }],
            isFocused: [{ type: core.Input }],
            id: [{ type: core.Input }]
        };
        return McRadioButton;
    }(McRadioButtonMixinBase));
    if (false) {
        /**
         * Analog to HTML 'name' attribute used to group radios for unique selection.
         * @type {?}
         */
        McRadioButton.prototype.name;
        /**
         * Used to set the 'aria-label' attribute on the underlying input element.
         * @type {?}
         */
        McRadioButton.prototype.ariaLabel;
        /**
         * The 'aria-labelledby' attribute takes precedence as the element's text alternative.
         * @type {?}
         */
        McRadioButton.prototype.ariaLabelledby;
        /**
         * The 'aria-describedby' attribute is read after the element's label and field type.
         * @type {?}
         */
        McRadioButton.prototype.ariaDescribedby;
        /**
         * The native `<input type=radio>` element
         * @type {?}
         */
        McRadioButton.prototype.inputElement;
        /**
         * Event emitted when the checked state of this radio button changes.
         * Change events are only emitted when the value changes due to user interaction with
         * the radio button (the same behavior as `<input type-"radio">`).
         * @type {?}
         */
        McRadioButton.prototype.change;
        /**
         * The parent radio group. May or may not be present.
         * @type {?}
         */
        McRadioButton.prototype.radioGroup;
        /** @type {?} */
        McRadioButton.prototype.isFocused;
        /**
         * The unique ID for the radio button.
         * @type {?}
         */
        McRadioButton.prototype.id;
        /**
         * @type {?}
         * @private
         */
        McRadioButton.prototype._labelPosition;
        /**
         * @type {?}
         * @private
         */
        McRadioButton.prototype.uniqueId;
        /**
         * Whether this radio is checked.
         * @type {?}
         * @private
         */
        McRadioButton.prototype._checked;
        /**
         * Whether this radio is disabled.
         * @type {?}
         * @private
         */
        McRadioButton.prototype._disabled;
        /**
         * Whether this radio is required.
         * @type {?}
         * @private
         */
        McRadioButton.prototype._required;
        /**
         * Value assigned to this radio.
         * @type {?}
         * @private
         */
        McRadioButton.prototype._value;
        /**
         * Unregister function for _radioDispatcher
         * @type {?}
         * @private
         */
        McRadioButton.prototype.removeUniqueSelectionListener;
        /**
         * @type {?}
         * @private
         */
        McRadioButton.prototype._changeDetector;
        /**
         * @type {?}
         * @private
         */
        McRadioButton.prototype.focusMonitor;
        /**
         * @type {?}
         * @private
         */
        McRadioButton.prototype._radioDispatcher;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: radio.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McRadioModule = /** @class */ (function () {
        function McRadioModule() {
        }
        McRadioModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, a11y.A11yModule, core$1.McCommonModule],
                        exports: [McRadioGroup, McRadioButton],
                        declarations: [McRadioGroup, McRadioButton]
                    },] }
        ];
        return McRadioModule;
    }());

    exports.MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR;
    exports.McRadioButton = McRadioButton;
    exports.McRadioButtonBase = McRadioButtonBase;
    exports.McRadioButtonMixinBase = McRadioButtonMixinBase;
    exports.McRadioChange = McRadioChange;
    exports.McRadioGroup = McRadioGroup;
    exports.McRadioGroupBase = McRadioGroupBase;
    exports.McRadioGroupMixinBase = McRadioGroupMixinBase;
    exports.McRadioModule = McRadioModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-radio.umd.js.map
