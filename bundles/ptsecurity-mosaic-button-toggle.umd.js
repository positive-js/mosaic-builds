(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/mosaic/button'), require('@ptsecurity/mosaic/core'), require('@angular/cdk/a11y'), require('@angular/cdk/coercion'), require('@angular/cdk/collections'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/button-toggle', ['exports', '@angular/core', '@ptsecurity/mosaic/button', '@ptsecurity/mosaic/core', '@angular/cdk/a11y', '@angular/cdk/coercion', '@angular/cdk/collections', '@angular/forms'], factory) :
    (global = global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic['button-toggle'] = {}), global.ng.core, global.ptsecurity.mosaic.button, global.ptsecurity.mosaic.core, global.ng.cdk.a11y, global.ng.cdk.coercion, global.ng.cdk.collections, global.ng.forms));
}(this, (function (exports, core, button, core$1, a11y, coercion, collections, forms) { 'use strict';

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

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
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
     * Generated from: button-toggle.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Provider Expression that allows mc-button-toggle-group to register as a ControlValueAccessor.
     * This allows it to support [(ngModel)].
     * \@docs-private
     * @type {?}
     */
    var MC_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef((/**
         * @return {?}
         */
        function () { return McButtonToggleGroup; })),
        multi: true
    };
    /**
     * Change event object emitted by MсButtonToggle.
     */
    var   /**
     * Change event object emitted by MсButtonToggle.
     */
    McButtonToggleChange = /** @class */ (function () {
        function McButtonToggleChange(source, value) {
            this.source = source;
            this.value = value;
        }
        return McButtonToggleChange;
    }());
    if (false) {
        /**
         * The MсButtonToggle that emits the event.
         * @type {?}
         */
        McButtonToggleChange.prototype.source;
        /**
         * The value assigned to the MсButtonToggle.
         * @type {?}
         */
        McButtonToggleChange.prototype.value;
    }
    /**
     * Exclusive selection button toggle group that behaves like a radio-button group.
     */
    var McButtonToggleGroup = /** @class */ (function () {
        function McButtonToggleGroup(_changeDetector) {
            this._changeDetector = _changeDetector;
            /**
             * Event that emits whenever the value of the group changes.
             * Used to facilitate two-way data binding.
             * \@docs-private
             */
            this.valueChange = new core.EventEmitter();
            /**
             * Event emitted when the group's value changes.
             */
            this.change = new core.EventEmitter();
            this._vertical = false;
            this._multiple = false;
            this._disabled = false;
            /**
             * The method to be called in order to update ngModel.
             * Now `ngModel` binding is not supported in multiple selection mode.
             */
            // tslint:disable-next-line:no-empty
            this.controlValueAccessorChangeFn = (/**
             * @return {?}
             */
            function () { });
            /**
             * onTouch function registered via registerOnTouch (ControlValueAccessor).
             */
            // tslint:disable-next-line:no-empty
            this.onTouched = (/**
             * @return {?}
             */
            function () { });
        }
        Object.defineProperty(McButtonToggleGroup.prototype, "vertical", {
            /** Whether the toggle group is vertical. */
            get: /**
             * Whether the toggle group is vertical.
             * @return {?}
             */
            function () {
                return this._vertical;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._vertical = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McButtonToggleGroup.prototype, "value", {
            /** Value of the toggle group. */
            get: /**
             * Value of the toggle group.
             * @return {?}
             */
            function () {
                /** @type {?} */
                var selected = this.selectionModel ? this.selectionModel.selected : [];
                if (this.multiple) {
                    return selected.map((/**
                     * @param {?} toggle
                     * @return {?}
                     */
                    function (toggle) { return toggle.value; }));
                }
                return selected[0] ? selected[0].value : undefined;
            },
            set: /**
             * @param {?} newValue
             * @return {?}
             */
            function (newValue) {
                this.setSelectionByValue(newValue);
                this.valueChange.emit(this.value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McButtonToggleGroup.prototype, "selected", {
            /** Selected button toggles in the group. */
            get: /**
             * Selected button toggles in the group.
             * @return {?}
             */
            function () {
                /** @type {?} */
                var selected = this.selectionModel.selected;
                return this.multiple ? selected : (selected[0] || null);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McButtonToggleGroup.prototype, "multiple", {
            /** Whether multiple button toggles can be selected. */
            get: /**
             * Whether multiple button toggles can be selected.
             * @return {?}
             */
            function () {
                return this._multiple;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._multiple = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McButtonToggleGroup.prototype, "disabled", {
            /** Whether multiple button toggle group is disabled. */
            get: /**
             * Whether multiple button toggle group is disabled.
             * @return {?}
             */
            function () {
                return this._disabled;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
                if (!this.buttonToggles) {
                    return;
                }
                this.buttonToggles.forEach((/**
                 * @param {?} toggle
                 * @return {?}
                 */
                function (toggle) { return toggle.markForCheck(); }));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        McButtonToggleGroup.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.selectionModel = new collections.SelectionModel(this.multiple, undefined, false);
        };
        /**
         * @return {?}
         */
        McButtonToggleGroup.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            var _a;
            (_a = this.selectionModel).select.apply(_a, __spread(this.buttonToggles.filter((/**
             * @param {?} toggle
             * @return {?}
             */
            function (toggle) { return toggle.checked; }))));
            this.disabled = this._disabled;
        };
        /**
         * Sets the model value. Implemented as part of ControlValueAccessor.
         * @param value Value to be set to the model.
         */
        /**
         * Sets the model value. Implemented as part of ControlValueAccessor.
         * @param {?} value Value to be set to the model.
         * @return {?}
         */
        McButtonToggleGroup.prototype.writeValue = /**
         * Sets the model value. Implemented as part of ControlValueAccessor.
         * @param {?} value Value to be set to the model.
         * @return {?}
         */
        function (value) {
            this.value = value;
            this._changeDetector.markForCheck();
        };
        // Implemented as part of ControlValueAccessor.
        // Implemented as part of ControlValueAccessor.
        /**
         * @param {?} fn
         * @return {?}
         */
        McButtonToggleGroup.prototype.registerOnChange = 
        // Implemented as part of ControlValueAccessor.
        /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.controlValueAccessorChangeFn = fn;
        };
        // Implemented as part of ControlValueAccessor.
        // Implemented as part of ControlValueAccessor.
        /**
         * @param {?} fn
         * @return {?}
         */
        McButtonToggleGroup.prototype.registerOnTouched = 
        // Implemented as part of ControlValueAccessor.
        /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onTouched = fn;
        };
        // Implemented as part of ControlValueAccessor.
        // Implemented as part of ControlValueAccessor.
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        McButtonToggleGroup.prototype.setDisabledState = 
        // Implemented as part of ControlValueAccessor.
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        function (isDisabled) {
            this.disabled = isDisabled;
        };
        /** Dispatch change event with current selection and group value. */
        /**
         * Dispatch change event with current selection and group value.
         * @return {?}
         */
        McButtonToggleGroup.prototype.emitChangeEvent = /**
         * Dispatch change event with current selection and group value.
         * @return {?}
         */
        function () {
            /** @type {?} */
            var selected = this.selected;
            /** @type {?} */
            var source = Array.isArray(selected) ? selected[selected.length - 1] : selected;
            /** @type {?} */
            var event = new McButtonToggleChange(source, this.value);
            this.controlValueAccessorChangeFn(event.value);
            this.change.emit(event);
        };
        /**
         * Syncs a button toggle's selected state with the model value.
         * @param toggle Toggle to be synced.
         * @param select Whether the toggle should be selected.
         * @param isUserInput Whether the change was a result of a user interaction.
         */
        /**
         * Syncs a button toggle's selected state with the model value.
         * @param {?} toggle Toggle to be synced.
         * @param {?} select Whether the toggle should be selected.
         * @param {?=} isUserInput Whether the change was a result of a user interaction.
         * @return {?}
         */
        McButtonToggleGroup.prototype.syncButtonToggle = /**
         * Syncs a button toggle's selected state with the model value.
         * @param {?} toggle Toggle to be synced.
         * @param {?} select Whether the toggle should be selected.
         * @param {?=} isUserInput Whether the change was a result of a user interaction.
         * @return {?}
         */
        function (toggle, select, isUserInput) {
            if (isUserInput === void 0) { isUserInput = false; }
            // Deselect the currently-selected toggle, if we're in single-selection
            // mode and the button being toggled isn't selected at the moment.
            if (!this.multiple && this.selected && !toggle.checked) {
                ((/** @type {?} */ (this.selected))).checked = false;
            }
            if (select) {
                this.selectionModel.select(toggle);
            }
            else {
                this.selectionModel.deselect(toggle);
            }
            // Only emit the change event for user input.
            if (isUserInput) {
                this.emitChangeEvent();
            }
            // Note: we emit this one no matter whether it was a user interaction, because
            // it is used by Angular to sync up the two-way data binding.
            this.valueChange.emit(this.value);
        };
        /** Checks whether a button toggle is selected. */
        /**
         * Checks whether a button toggle is selected.
         * @param {?} toggle
         * @return {?}
         */
        McButtonToggleGroup.prototype.isSelected = /**
         * Checks whether a button toggle is selected.
         * @param {?} toggle
         * @return {?}
         */
        function (toggle) {
            return this.selectionModel.isSelected(toggle);
        };
        /** Determines whether a button toggle should be checked on init. */
        /**
         * Determines whether a button toggle should be checked on init.
         * @param {?} toggle
         * @return {?}
         */
        McButtonToggleGroup.prototype.isPrechecked = /**
         * Determines whether a button toggle should be checked on init.
         * @param {?} toggle
         * @return {?}
         */
        function (toggle) {
            if (this.rawValue === undefined) {
                return false;
            }
            if (this.multiple && Array.isArray(this.rawValue)) {
                return this.rawValue.some((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) { return toggle.value != null && value === toggle.value; }));
            }
            return toggle.value === this.rawValue;
        };
        /** Updates the selection state of the toggles in the group based on a value. */
        /**
         * Updates the selection state of the toggles in the group based on a value.
         * @private
         * @param {?} value
         * @return {?}
         */
        McButtonToggleGroup.prototype.setSelectionByValue = /**
         * Updates the selection state of the toggles in the group based on a value.
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            this.rawValue = value;
            if (!this.buttonToggles) {
                return;
            }
            if (this.multiple && value) {
                if (!Array.isArray(value)) {
                    throw Error('Value must be an array in multiple-selection mode.');
                }
                this.clearSelection();
                value.forEach((/**
                 * @param {?} currentValue
                 * @return {?}
                 */
                function (currentValue) { return _this.selectValue(currentValue); }));
            }
            else {
                this.clearSelection();
                this.selectValue(value);
            }
        };
        /** Clears the selected toggles. */
        /**
         * Clears the selected toggles.
         * @private
         * @return {?}
         */
        McButtonToggleGroup.prototype.clearSelection = /**
         * Clears the selected toggles.
         * @private
         * @return {?}
         */
        function () {
            this.selectionModel.clear();
            this.buttonToggles.forEach((/**
             * @param {?} toggle
             * @return {?}
             */
            function (toggle) { return toggle.checked = false; }));
        };
        /** Selects a value if there's a toggle that corresponds to it. */
        /**
         * Selects a value if there's a toggle that corresponds to it.
         * @private
         * @param {?} value
         * @return {?}
         */
        McButtonToggleGroup.prototype.selectValue = /**
         * Selects a value if there's a toggle that corresponds to it.
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var correspondingOption = this.buttonToggles.find((/**
             * @param {?} toggle
             * @return {?}
             */
            function (toggle) {
                return toggle.value != null && toggle.value === value;
            }));
            if (correspondingOption) {
                correspondingOption.checked = true;
                this.selectionModel.select(correspondingOption);
            }
        };
        McButtonToggleGroup.decorators = [
            { type: core.Directive, args: [{
                        selector: 'mc-button-toggle-group',
                        providers: [MC_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR],
                        host: {
                            role: 'group',
                            class: 'mc-button-toggle-group',
                            '[class.mc-button-toggle_vertical]': 'vertical'
                        },
                        exportAs: 'mcButtonToggleGroup'
                    },] }
        ];
        /** @nocollapse */
        McButtonToggleGroup.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        McButtonToggleGroup.propDecorators = {
            vertical: [{ type: core.Input }],
            value: [{ type: core.Input }],
            multiple: [{ type: core.Input }],
            buttonToggles: [{ type: core.ContentChildren, args: [core.forwardRef((/**
                         * @return {?}
                         */
                        function () { return McButtonToggle; })),] }],
            disabled: [{ type: core.Input }],
            valueChange: [{ type: core.Output }],
            change: [{ type: core.Output }]
        };
        return McButtonToggleGroup;
    }());
    if (false) {
        /**
         * Child button toggle buttons.
         * @type {?}
         */
        McButtonToggleGroup.prototype.buttonToggles;
        /**
         * Event that emits whenever the value of the group changes.
         * Used to facilitate two-way data binding.
         * \@docs-private
         * @type {?}
         */
        McButtonToggleGroup.prototype.valueChange;
        /**
         * Event emitted when the group's value changes.
         * @type {?}
         */
        McButtonToggleGroup.prototype.change;
        /**
         * @type {?}
         * @private
         */
        McButtonToggleGroup.prototype._vertical;
        /**
         * @type {?}
         * @private
         */
        McButtonToggleGroup.prototype._multiple;
        /**
         * @type {?}
         * @private
         */
        McButtonToggleGroup.prototype._disabled;
        /**
         * @type {?}
         * @private
         */
        McButtonToggleGroup.prototype.selectionModel;
        /**
         * Reference to the raw value that the consumer tried to assign. The real
         * value will exclude any values from this one that don't correspond to a
         * toggle. Useful for the cases where the value is assigned before the toggles
         * have been initialized or at the same that they're being swapped out.
         * @type {?}
         * @private
         */
        McButtonToggleGroup.prototype.rawValue;
        /**
         * The method to be called in order to update ngModel.
         * Now `ngModel` binding is not supported in multiple selection mode.
         * @type {?}
         */
        McButtonToggleGroup.prototype.controlValueAccessorChangeFn;
        /**
         * onTouch function registered via registerOnTouch (ControlValueAccessor).
         * @type {?}
         */
        McButtonToggleGroup.prototype.onTouched;
        /**
         * @type {?}
         * @private
         */
        McButtonToggleGroup.prototype._changeDetector;
    }
    /**
     * Single button inside of a toggle group.
     */
    var McButtonToggle = /** @class */ (function () {
        function McButtonToggle(buttonToggleGroup, changeDetectorRef, focusMonitor, element) {
            this.buttonToggleGroup = buttonToggleGroup;
            this.changeDetectorRef = changeDetectorRef;
            this.focusMonitor = focusMonitor;
            this.element = element;
            /**
             * Event emitted when the group value changes.
             */
            this.change = new core.EventEmitter();
            this.isSingleSelector = false;
            this._checked = false;
            this._disabled = false;
        }
        Object.defineProperty(McButtonToggle.prototype, "checked", {
            /** Whether the button is checked. */
            get: /**
             * Whether the button is checked.
             * @return {?}
             */
            function () {
                return this.buttonToggleGroup ? this.buttonToggleGroup.isSelected(this) : this._checked;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                /** @type {?} */
                var newValue = coercion.coerceBooleanProperty(value);
                if (newValue !== this._checked) {
                    this._checked = newValue;
                    if (this.buttonToggleGroup) {
                        this.buttonToggleGroup.syncButtonToggle(this, this._checked);
                    }
                    this.changeDetectorRef.markForCheck();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McButtonToggle.prototype, "disabled", {
            get: /**
             * @return {?}
             */
            function () {
                return this._disabled || (this.buttonToggleGroup && this.buttonToggleGroup.disabled);
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        McButtonToggle.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.isSingleSelector = this.buttonToggleGroup && !this.buttonToggleGroup.multiple;
            this.type = this.isSingleSelector ? 'radio' : 'checkbox';
            if (this.buttonToggleGroup && this.buttonToggleGroup.isPrechecked(this)) {
                this.checked = true;
            }
            this.focusMonitor.monitor(this.element.nativeElement, true);
        };
        /**
         * @return {?}
         */
        McButtonToggle.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var group = this.buttonToggleGroup;
            this.focusMonitor.stopMonitoring(this.element.nativeElement);
            // Remove the toggle from the selection once it's destroyed. Needs to happen
            // on the next tick in order to avoid "changed after checked" errors.
            if (group && group.isSelected(this)) {
                Promise.resolve().then((/**
                 * @return {?}
                 */
                function () { return group.syncButtonToggle(_this, false); }));
            }
        };
        /** Focuses the button. */
        /**
         * Focuses the button.
         * @return {?}
         */
        McButtonToggle.prototype.focus = /**
         * Focuses the button.
         * @return {?}
         */
        function () {
            this.element.nativeElement.focus();
        };
        /** Checks the button toggle due to an interaction with the underlying native button. */
        /**
         * Checks the button toggle due to an interaction with the underlying native button.
         * @return {?}
         */
        McButtonToggle.prototype.onToggleClick = /**
         * Checks the button toggle due to an interaction with the underlying native button.
         * @return {?}
         */
        function () {
            if (this.disabled) {
                return;
            }
            /** @type {?} */
            var newChecked = this.isSingleSelector ? true : !this._checked;
            if (newChecked !== this._checked) {
                this._checked = newChecked;
                if (this.buttonToggleGroup) {
                    this.buttonToggleGroup.syncButtonToggle(this, this._checked, true);
                    this.buttonToggleGroup.onTouched();
                }
            }
            // Emit a change event when it's the single selector
            this.change.emit(new McButtonToggleChange(this, this.value));
        };
        /**
         * Marks the button toggle as needing checking for change detection.
         * This method is exposed because the parent button toggle group will directly
         * update bound properties of the radio button.
         */
        /**
         * Marks the button toggle as needing checking for change detection.
         * This method is exposed because the parent button toggle group will directly
         * update bound properties of the radio button.
         * @return {?}
         */
        McButtonToggle.prototype.markForCheck = /**
         * Marks the button toggle as needing checking for change detection.
         * This method is exposed because the parent button toggle group will directly
         * update bound properties of the radio button.
         * @return {?}
         */
        function () {
            // When the group value changes, the button will not be notified.
            // Use `markForCheck` to explicit update button toggle's status.
            this.changeDetectorRef.markForCheck();
        };
        McButtonToggle.decorators = [
            { type: core.Component, args: [{
                        selector: 'mc-button-toggle',
                        exportAs: 'mcButtonToggle',
                        template: "\n        <button\n            mc-button\n            type=\"button\"\n            [class.mc-active]=\"checked\"\n            [disabled]=\"disabled\"\n            [tabIndex]=\"tabIndex\"\n            (click)=\"onToggleClick()\">\n            <ng-content></ng-content>\n        </button>\n    ",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        host: {
                            class: 'mc-button-toggle',
                            '[class.mc-button-toggle-standalone]': '!buttonToggleGroup'
                        },
                        styles: [".mc-group{display:flex;flex-direction:row}.mc-group .mc-group_justified>.mc-group-item{width:100%}.mc-group .mc-group-item+.mc-group-item{margin-left:-1px}.mc-group>.mc-group-item:first-child:not(:last-child),.mc-group>.mc-group-item:first-child:not(:last-child)>.mc-form-field__container{border-bottom-right-radius:0;border-top-right-radius:0}.mc-group>.mc-group-item:last-child:not(:first-child),.mc-group>.mc-group-item:last-child:not(:first-child)>.mc-form-field__container{border-bottom-left-radius:0;border-top-left-radius:0}.mc-group>.mc-group-item:not(:first-child):not(:last-child),.mc-group>.mc-group-item:not(:first-child):not(:last-child)>.mc-form-field__container{border-radius:0}.mc-vertical-group{display:flex;flex-direction:column}.mc-vertical-group>.mc-group-item:first-child:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-vertical-group>.mc-group-item:first-child:not(:last-child)>.mc-form-field__container{border-bottom-right-radius:0;border-bottom-left-radius:0}.mc-vertical-group>.mc-group-item:last-child:not(:first-child){border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-vertical-group>.mc-group-item:last-child:not(:first-child)>.mc-form-field__container{border-top-right-radius:0;border-top-left-radius:0}.mc-vertical-group>.mc-group-item:not(:first-child):not(:last-child),.mc-vertical-group>.mc-group-item:not(:first-child):not(:last-child)>.mc-form-field__container{border-radius:0}.mc-vertical-group .mc-group-item+.mc-group-item{margin-top:-1px}.mc-button-toggle-group{display:flex;flex-direction:row}.mc-button-toggle-group .mc-button-toggle:first-of-type:not(:last-of-type)>.mc-button,.mc-button-toggle-group .mc-button-toggle:first-of-type:not(:last-of-type)>.mc-icon-button{border-bottom-right-radius:0;border-top-right-radius:0}.mc-button-toggle-group .mc-button-toggle:last-of-type:not(:first-of-type)>.mc-button,.mc-button-toggle-group .mc-button-toggle:last-of-type:not(:first-of-type)>.mc-icon-button{border-bottom-left-radius:0;border-top-left-radius:0}.mc-button-toggle-group .mc-button-toggle:not(:first-of-type):not(:last-of-type)>.mc-button,.mc-button-toggle-group .mc-button-toggle:not(:first-of-type):not(:last-of-type)>.mc-icon-button{border-radius:0}.mc-button-toggle-group .mc-button-toggle[disabled]{outline:0}.mc-button-toggle-group:not(.mc-button-toggle_vertical) .mc-button-toggle:not([disabled])+.mc-button-toggle:not([disabled]){margin-left:-1px}.mc-button-toggle_vertical{flex-direction:column}.mc-button-toggle_vertical .mc-button-toggle+.mc-button-toggle{border-left:none;border-right:none}.mc-button-toggle_vertical .mc-button-toggle:not([disabled])+.mc-button-toggle:not([disabled]){margin-top:-1px}.mc-button-toggle_vertical .mc-button-toggle .mc-button,.mc-button-toggle_vertical .mc-button-toggle .mc-icon-button{width:100%}.mc-button-toggle_vertical .mc-button-toggle:first-child:not(:last-child)>.mc-button,.mc-button-toggle_vertical .mc-button-toggle:first-child:not(:last-child)>.mc-icon-button{border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-button-toggle_vertical .mc-button-toggle:last-child:not(:first-child)>.mc-button,.mc-button-toggle_vertical .mc-button-toggle:last-child:not(:first-child)>.mc-icon-button{border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-button-toggle_vertical .mc-button-toggle:not(:first-child):not(:last-child)>.mc-button,.mc-button-toggle_vertical .mc-button-toggle:not(:first-child):not(:last-child)>.mc-icon-button{border-radius:0}.mc-button-toggle-standalone{box-shadow:none}"]
                    }] }
        ];
        /** @nocollapse */
        McButtonToggle.ctorParameters = function () { return [
            { type: McButtonToggleGroup, decorators: [{ type: core.Optional }] },
            { type: core.ChangeDetectorRef },
            { type: a11y.FocusMonitor },
            { type: core.ElementRef }
        ]; };
        McButtonToggle.propDecorators = {
            checked: [{ type: core.Input }],
            mcButton: [{ type: core.ViewChild, args: [button.McButton, { static: false },] }],
            value: [{ type: core.Input }],
            tabIndex: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            change: [{ type: core.Output }]
        };
        return McButtonToggle;
    }());
    if (false) {
        /** @type {?} */
        McButtonToggle.prototype.type;
        /** @type {?} */
        McButtonToggle.prototype.mcButton;
        /**
         * McButtonToggleGroup reads this to assign its own value.
         * @type {?}
         */
        McButtonToggle.prototype.value;
        /**
         * Tabindex for the toggle.
         * @type {?}
         */
        McButtonToggle.prototype.tabIndex;
        /**
         * Event emitted when the group value changes.
         * @type {?}
         */
        McButtonToggle.prototype.change;
        /**
         * @type {?}
         * @private
         */
        McButtonToggle.prototype.isSingleSelector;
        /**
         * @type {?}
         * @private
         */
        McButtonToggle.prototype._checked;
        /**
         * @type {?}
         * @private
         */
        McButtonToggle.prototype._disabled;
        /** @type {?} */
        McButtonToggle.prototype.buttonToggleGroup;
        /**
         * @type {?}
         * @private
         */
        McButtonToggle.prototype.changeDetectorRef;
        /**
         * @type {?}
         * @private
         */
        McButtonToggle.prototype.focusMonitor;
        /**
         * @type {?}
         * @private
         */
        McButtonToggle.prototype.element;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: button-toggle.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McButtonToggleModule = /** @class */ (function () {
        function McButtonToggleModule() {
        }
        McButtonToggleModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [core$1.McCommonModule, button.McButtonModule],
                        exports: [core$1.McCommonModule, McButtonToggleGroup, McButtonToggle],
                        declarations: [McButtonToggleGroup, McButtonToggle]
                    },] }
        ];
        return McButtonToggleModule;
    }());

    exports.MC_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR = MC_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR;
    exports.McButtonToggle = McButtonToggle;
    exports.McButtonToggleChange = McButtonToggleChange;
    exports.McButtonToggleGroup = McButtonToggleGroup;
    exports.McButtonToggleModule = McButtonToggleModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-button-toggle.umd.js.map
