(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/overlay'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/core'), require('@ptsecurity/mosaic/form-field'), require('@ptsecurity/mosaic/icon'), require('@ptsecurity/mosaic/tags'), require('@angular/cdk/bidi'), require('@angular/cdk/coercion'), require('@angular/cdk/collections'), require('@angular/forms'), require('@ptsecurity/cdk/a11y'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/mosaic/input'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/select', ['exports', '@angular/cdk/overlay', '@angular/common', '@angular/core', '@ptsecurity/mosaic/core', '@ptsecurity/mosaic/form-field', '@ptsecurity/mosaic/icon', '@ptsecurity/mosaic/tags', '@angular/cdk/bidi', '@angular/cdk/coercion', '@angular/cdk/collections', '@angular/forms', '@ptsecurity/cdk/a11y', '@ptsecurity/cdk/keycodes', '@ptsecurity/mosaic/input', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.select = {}), global.ng.cdk.overlay, global.ng.common, global.ng.core, global.ptsecurity.mosaic.core, global.ptsecurity.mosaic['form-field'], global.ptsecurity.mosaic.icon, global.ptsecurity.mosaic.tags, global.ng.cdk.bidi, global.ng.cdk.coercion, global.ng.cdk.collections, global.ng.forms, global.a11y, global.keycodes, global.ptsecurity.mosaic.input, global.rxjs, global.rxjs.operators));
}(this, (function (exports, overlay, common, core, core$1, formField, icon, tags, bidi, coercion, collections, forms, a11y, keycodes, input, rxjs, operators) { 'use strict';

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
     * Generated from: select.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var nextUniqueId = 0;
    /**
     * Change event object that is emitted when the select value has changed.
     */
    var   /**
     * Change event object that is emitted when the select value has changed.
     */
    McSelectChange = /** @class */ (function () {
        function McSelectChange(source, value) {
            this.source = source;
            this.value = value;
        }
        return McSelectChange;
    }());
    if (false) {
        /** @type {?} */
        McSelectChange.prototype.source;
        /** @type {?} */
        McSelectChange.prototype.value;
    }
    var McSelectBase = /** @class */ (function () {
        function McSelectBase(elementRef, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
            this.elementRef = elementRef;
            this.defaultErrorStateMatcher = defaultErrorStateMatcher;
            this.parentForm = parentForm;
            this.parentFormGroup = parentFormGroup;
            this.ngControl = ngControl;
        }
        return McSelectBase;
    }());
    if (false) {
        /** @type {?} */
        McSelectBase.prototype.elementRef;
        /** @type {?} */
        McSelectBase.prototype.defaultErrorStateMatcher;
        /** @type {?} */
        McSelectBase.prototype.parentForm;
        /** @type {?} */
        McSelectBase.prototype.parentFormGroup;
        /** @type {?} */
        McSelectBase.prototype.ngControl;
    }
    // tslint:disable-next-line:naming-convention
    /** @type {?} */
    var McSelectMixinBase = core$1.mixinTabIndex(core$1.mixinDisabled(core$1.mixinErrorState(McSelectBase)));
    var McSelectSearch = /** @class */ (function () {
        function McSelectSearch(formField) {
            this.searchChangesSubscription = new rxjs.Subscription();
            this.isSearchChanged = false;
            formField.canCleanerClearByEsc = false;
        }
        /**
         * @return {?}
         */
        McSelectSearch.prototype.focus = /**
         * @return {?}
         */
        function () {
            this.input.focus();
        };
        /**
         * @return {?}
         */
        McSelectSearch.prototype.reset = /**
         * @return {?}
         */
        function () {
            this.input.ngControl.reset();
        };
        /**
         * @return {?}
         */
        McSelectSearch.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this.input) {
                throw Error('McSelectSearch does not work without mcInput');
            }
            if (!this.input.ngControl) {
                throw Error('McSelectSearch does not work without ngControl');
            }
            this.searchChangesSubscription = (/** @type {?} */ (this.input.ngControl.valueChanges)).subscribe((/**
             * @return {?}
             */
            function () {
                _this.isSearchChanged = true;
            }));
        };
        /**
         * @return {?}
         */
        McSelectSearch.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.searchChangesSubscription.unsubscribe();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        McSelectSearch.prototype.handleKeydown = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // tslint:disable-next-line:deprecation
            if (event.keyCode === keycodes.ESCAPE) {
                if (this.input.value) {
                    this.reset();
                    event.stopPropagation();
                }
            }
        };
        McSelectSearch.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mcSelectSearch]',
                        exportAs: 'mcSelectSearch',
                        host: {
                            '(keydown)': 'handleKeydown($event)'
                        }
                    },] }
        ];
        /** @nocollapse */
        McSelectSearch.ctorParameters = function () { return [
            { type: formField.McFormField }
        ]; };
        McSelectSearch.propDecorators = {
            input: [{ type: core.ContentChild, args: [input.McInput, { static: false },] }]
        };
        return McSelectSearch;
    }());
    if (false) {
        /** @type {?} */
        McSelectSearch.prototype.input;
        /** @type {?} */
        McSelectSearch.prototype.searchChangesSubscription;
        /** @type {?} */
        McSelectSearch.prototype.isSearchChanged;
    }
    var McSelectSearchEmptyResult = /** @class */ (function () {
        function McSelectSearchEmptyResult() {
        }
        McSelectSearchEmptyResult.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mc-select-search-empty-result]',
                        exportAs: 'mcSelectSearchEmptyResult'
                    },] }
        ];
        return McSelectSearchEmptyResult;
    }());
    var McSelectTrigger = /** @class */ (function () {
        function McSelectTrigger() {
        }
        McSelectTrigger.decorators = [
            { type: core.Directive, args: [{ selector: 'mc-select-trigger' },] }
        ];
        return McSelectTrigger;
    }());
    var McSelect = /** @class */ (function (_super) {
        __extends(McSelect, _super);
        function McSelect(_viewportRuler, _changeDetectorRef, _ngZone, _renderer, defaultErrorStateMatcher, elementRef, rawValidators, _dir, parentForm, parentFormGroup, _parentFormField, ngControl, ngModel, formControlName, tabIndex, _scrollStrategyFactory, mcValidation) {
            var _this = _super.call(this, elementRef, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) || this;
            _this._viewportRuler = _viewportRuler;
            _this._changeDetectorRef = _changeDetectorRef;
            _this._ngZone = _ngZone;
            _this._renderer = _renderer;
            _this.rawValidators = rawValidators;
            _this._dir = _dir;
            _this._parentFormField = _parentFormField;
            _this.ngModel = ngModel;
            _this.formControlName = formControlName;
            _this._scrollStrategyFactory = _scrollStrategyFactory;
            _this.mcValidation = mcValidation;
            /**
             * A name for this control that can be used by `mc-form-field`.
             */
            _this.controlType = 'mc-select';
            _this.hiddenItems = 0;
            /**
             * The cached font-size of the trigger element.
             */
            _this.triggerFontSize = 0;
            _this.previousSelectionModelSelected = [];
            /**
             * The value of the select panel's transform-origin property.
             */
            _this.transformOrigin = 'top';
            /**
             * Whether the panel's animation is done.
             */
            _this.panelDoneAnimating = false;
            /**
             * Emits when the panel element is finished transforming in.
             */
            _this.panelDoneAnimatingStream = new rxjs.Subject();
            /**
             * Strategy that will be used to handle scrolling while the select panel is open.
             */
            _this.scrollStrategy = _this._scrollStrategyFactory();
            /**
             * The y-offset of the overlay panel in relation to the trigger's top start corner.
             * This must be adjusted to align the selected option text over the trigger text.
             * when the panel opens. Will change based on the y-position of the selected option.
             */
            _this.offsetY = 0;
            /**
             * This position config ensures that the top "start" corner of the overlay
             * is aligned with with the top "start" of the origin by default (overlapping
             * the trigger completely). If the panel cannot fit below the trigger, it
             * will fall back to a position above the trigger.
             */
            _this.positions = [
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top'
                },
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom'
                }
            ];
            _this.hiddenItemsText = '...ещё';
            /**
             * Combined stream of all of the child options' change events.
             */
            _this.optionSelectionChanges = (/** @type {?} */ (rxjs.defer((/**
             * @return {?}
             */
            function () {
                if (_this.options) {
                    return rxjs.merge.apply(void 0, __spread(_this.options.map((/**
                     * @param {?} option
                     * @return {?}
                     */
                    function (option) { return option.onSelectionChange; })), _this.selectionModel.selected.map((/**
                     * @param {?} option
                     * @return {?}
                     */
                    function (option) { return option.onSelectionChange; }))));
                }
                return _this._ngZone.onStable
                    .asObservable()
                    .pipe(operators.take(1), operators.switchMap((/**
                 * @return {?}
                 */
                function () { return _this.optionSelectionChanges; })));
            }))));
            /**
             * Event emitted when the select panel has been toggled.
             */
            _this.openedChange = new core.EventEmitter();
            /**
             * Event emitted when the select has been opened.
             */
            _this.openedStream = _this.openedChange.pipe(operators.filter((/**
             * @param {?} o
             * @return {?}
             */
            function (o) { return o; })), operators.map((/**
             * @return {?}
             */
            function () { })));
            /**
             * Event emitted when the select has been closed.
             */
            _this.closedStream = _this.openedChange.pipe(operators.filter((/**
             * @param {?} o
             * @return {?}
             */
            function (o) { return !o; })), operators.map((/**
             * @return {?}
             */
            function () { })));
            /**
             * Event emitted when the selected value has been changed by the user.
             */
            _this.selectionChange = new core.EventEmitter();
            /**
             * Event that emits whenever the raw value of the select changes. This is here primarily
             * to facilitate the two-way binding for the `value` input.
             * \@docs-private
             */
            _this.valueChange = new core.EventEmitter();
            _this._required = false;
            _this._multiple = false;
            _this._focused = false;
            _this._panelOpen = false;
            /**
             * The scroll position of the overlay panel, calculated to center the selected option.
             */
            _this.scrollTop = 0;
            /**
             * Unique id for this input.
             */
            _this.uid = "mc-select-" + nextUniqueId++;
            /**
             * Emits whenever the component is destroyed.
             */
            _this.destroy = new rxjs.Subject();
            /**
             * `View -> model callback called when value changes`
             */
            _this.onChange = (/**
             * @return {?}
             */
            function () { });
            /**
             * `View -> model callback called when select has been touched`
             */
            _this.onTouched = (/**
             * @return {?}
             */
            function () { });
            /**
             * Comparison function to specify which option is displayed. Defaults to object equality.
             */
            _this._compareWith = (/**
             * @param {?} o1
             * @param {?} o2
             * @return {?}
             */
            function (o1, o2) { return o1 === o2; });
            if (_this.ngControl) {
                // Note: we provide the value accessor through here, instead of
                // the `providers` to avoid running into a circular import.
                _this.ngControl.valueAccessor = _this;
            }
            _this.tabIndex = parseInt(tabIndex) || 0;
            // Force setter to be called in case id was not specified.
            _this.id = _this.id;
            return _this;
        }
        Object.defineProperty(McSelect.prototype, "placeholder", {
            get: /**
             * @return {?}
             */
            function () {
                return this._placeholder;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._placeholder = value;
                this.stateChanges.next();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "required", {
            get: /**
             * @return {?}
             */
            function () {
                return this._required;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._required = coercion.coerceBooleanProperty(value);
                this.stateChanges.next();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "multiple", {
            get: /**
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
                if (this.selectionModel) {
                    throw core$1.getMcSelectDynamicMultipleError();
                }
                this._multiple = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "compareWith", {
            /**
             * Function to compare the option values with the selected values. The first argument
             * is a value from an option. The second is a value from the selection. A boolean
             * should be returned.
             */
            get: /**
             * Function to compare the option values with the selected values. The first argument
             * is a value from an option. The second is a value from the selection. A boolean
             * should be returned.
             * @return {?}
             */
            function () {
                return this._compareWith;
            },
            set: /**
             * @param {?} fn
             * @return {?}
             */
            function (fn) {
                /* tslint:disable-next-line:strict-type-predicates */
                if (typeof fn !== 'function') {
                    throw core$1.getMcSelectNonFunctionValueError();
                }
                this._compareWith = fn;
                if (this.selectionModel) {
                    // A different comparator means the selection could change.
                    this.initializeSelection();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "value", {
            /** Value of the select control. */
            get: /**
             * Value of the select control.
             * @return {?}
             */
            function () {
                return this._value;
            },
            set: /**
             * @param {?} newValue
             * @return {?}
             */
            function (newValue) {
                if (newValue !== this._value) {
                    this.writeValue(newValue);
                    this._value = newValue;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "id", {
            get: /**
             * @return {?}
             */
            function () {
                return this._id;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._id = value || this.uid;
                this.stateChanges.next();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "focused", {
            /** Whether the select is focused. */
            get: /**
             * Whether the select is focused.
             * @return {?}
             */
            function () {
                return this._focused || this._panelOpen;
            },
            /**
             * @deprecated Setter to be removed as this property is intended to be readonly.
             * @breaking-change 8.0.0
             */
            set: /**
             * @deprecated Setter to be removed as this property is intended to be readonly.
             * \@breaking-change 8.0.0
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._focused = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "panelOpen", {
            get: /**
             * @return {?}
             */
            function () {
                return this._panelOpen;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "isEmptySearchResult", {
            get: /**
             * @return {?}
             */
            function () {
                return this.search && this.options.length === 0 && !!this.search.input.value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "canShowCleaner", {
            get: /**
             * @return {?}
             */
            function () {
                return this.cleaner && this.selectionModel.hasValue();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        McSelect.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.selectionModel = new collections.SelectionModel(this.multiple);
            this.stateChanges.next();
            // We need `distinctUntilChanged` here, because some browsers will
            // fire the animation end event twice for the same animation. See:
            // https://github.com/angular/angular/issues/24084
            this.panelDoneAnimatingStream
                .pipe(operators.distinctUntilChanged(), operators.takeUntil(this.destroy))
                .subscribe((/**
             * @return {?}
             */
            function () {
                if (_this.panelOpen) {
                    _this.scrollTop = 0;
                    _this.openedChange.emit(true);
                }
                else {
                    _this.openedChange.emit(false);
                    _this.panelDoneAnimating = false;
                    _this.overlayDir.offsetX = 0;
                    _this._changeDetectorRef.markForCheck();
                }
            }));
        };
        /**
         * @return {?}
         */
        McSelect.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.mcValidation.useValidation) {
                core$1.setMosaicValidation(this);
            }
            this.initKeyManager();
            this.selectionModel.changed
                .pipe(operators.takeUntil(this.destroy))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                event.added.forEach((/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) { return option.select(); }));
                event.removed.forEach((/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) { return option.deselect(); }));
            }));
            this.options.changes
                .pipe(operators.startWith(null), operators.takeUntil(this.destroy))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.resetOptions();
                _this.initializeSelection();
            }));
        };
        /**
         * @return {?}
         */
        McSelect.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.tags.changes
                .subscribe((/**
             * @return {?}
             */
            function () {
                setTimeout((/**
                 * @return {?}
                 */
                function () { return _this.calculateHiddenItems(); }), 0);
            }));
        };
        /**
         * @return {?}
         */
        McSelect.prototype.ngDoCheck = /**
         * @return {?}
         */
        function () {
            if (this.ngControl) {
                this.updateErrorState();
            }
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        McSelect.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            // Updating the disabled state is handled by `mixinDisabled`, but we need to additionally let
            // the parent form field know to run change detection when the disabled state changes.
            if (changes.disabled) {
                this.stateChanges.next();
            }
        };
        /**
         * @return {?}
         */
        McSelect.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy.next();
            this.destroy.complete();
            this.stateChanges.complete();
        };
        /**
         * @param {?} hiddenItemsText
         * @param {?} hiddenItems
         * @return {?}
         */
        McSelect.prototype.hiddenItemsTextFormatter = /**
         * @param {?} hiddenItemsText
         * @param {?} hiddenItems
         * @return {?}
         */
        function (hiddenItemsText, hiddenItems) {
            return hiddenItemsText + " " + hiddenItems;
        };
        /**
         * @param {?} $event
         * @return {?}
         */
        McSelect.prototype.clearValue = /**
         * @param {?} $event
         * @return {?}
         */
        function ($event) {
            $event.stopPropagation();
            this.selectionModel.clear();
            this.keyManager.setActiveItem(-1);
            this.propagateChanges();
        };
        /**
         * @return {?}
         */
        McSelect.prototype.resetSearch = /**
         * @return {?}
         */
        function () {
            if (this.search) {
                this.search.reset();
                /*
                todo the incorrect behaviour of keyManager is possible here
                to avoid first item selection (to provide correct options flipping on closed select)
                we should process options update like it is the first options appearance
                 */
                this.search.isSearchChanged = false;
            }
        };
        /** Toggles the overlay panel open or closed. */
        /**
         * Toggles the overlay panel open or closed.
         * @return {?}
         */
        McSelect.prototype.toggle = /**
         * Toggles the overlay panel open or closed.
         * @return {?}
         */
        function () {
            if (this.panelOpen) {
                this.close();
            }
            else {
                this.open();
            }
        };
        /** Opens the overlay panel. */
        /**
         * Opens the overlay panel.
         * @return {?}
         */
        McSelect.prototype.open = /**
         * Opens the overlay panel.
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.disabled || !this.options || !this.options.length || this._panelOpen) {
                return;
            }
            this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
            // Note: The computed font-size will be a string pixel value (e.g. "16px").
            // `parseInt` ignores the trailing 'px' and converts this to a number.
            this.triggerFontSize = parseInt(getComputedStyle(this.trigger.nativeElement)['font-size']);
            this._panelOpen = true;
            this.keyManager.withHorizontalOrientation(null);
            this.highlightCorrectOption();
            this._changeDetectorRef.markForCheck();
            // Set the font size on the panel element once it exists.
            this._ngZone.onStable.asObservable()
                .pipe(operators.take(1))
                .subscribe((/**
             * @return {?}
             */
            function () {
                if (_this.triggerFontSize && _this.overlayDir.overlayRef && _this.overlayDir.overlayRef.overlayElement) {
                    _this.overlayDir.overlayRef.overlayElement.style.fontSize = _this.triggerFontSize + "px";
                }
            }));
        };
        /** Closes the overlay panel and focuses the host element. */
        /**
         * Closes the overlay panel and focuses the host element.
         * @return {?}
         */
        McSelect.prototype.close = /**
         * Closes the overlay panel and focuses the host element.
         * @return {?}
         */
        function () {
            if (!this._panelOpen) {
                return;
            }
            // the order of calls is important
            this.resetSearch();
            this._panelOpen = false;
            this.keyManager.withHorizontalOrientation(this.isRtl() ? 'rtl' : 'ltr');
            this._changeDetectorRef.markForCheck();
            this.onTouched();
        };
        /**
         * Sets the select's value. Part of the ControlValueAccessor interface
         * required to integrate with Angular's core forms API.
         *
         * @param value New value to be written to the model.
         */
        /**
         * Sets the select's value. Part of the ControlValueAccessor interface
         * required to integrate with Angular's core forms API.
         *
         * @param {?} value New value to be written to the model.
         * @return {?}
         */
        McSelect.prototype.writeValue = /**
         * Sets the select's value. Part of the ControlValueAccessor interface
         * required to integrate with Angular's core forms API.
         *
         * @param {?} value New value to be written to the model.
         * @return {?}
         */
        function (value) {
            if (this.options) {
                this.setSelectionByValue(value);
            }
        };
        /**
         * Saves a callback function to be invoked when the select's value
         * changes from user input. Part of the ControlValueAccessor interface
         * required to integrate with Angular's core forms API.
         *
         * @param fn Callback to be triggered when the value changes.
         */
        /**
         * Saves a callback function to be invoked when the select's value
         * changes from user input. Part of the ControlValueAccessor interface
         * required to integrate with Angular's core forms API.
         *
         * @param {?} fn Callback to be triggered when the value changes.
         * @return {?}
         */
        McSelect.prototype.registerOnChange = /**
         * Saves a callback function to be invoked when the select's value
         * changes from user input. Part of the ControlValueAccessor interface
         * required to integrate with Angular's core forms API.
         *
         * @param {?} fn Callback to be triggered when the value changes.
         * @return {?}
         */
        function (fn) {
            this.onChange = fn;
        };
        /**
         * Saves a callback function to be invoked when the select is blurred
         * by the user. Part of the ControlValueAccessor interface required
         * to integrate with Angular's core forms API.
         *
         * @param fn Callback to be triggered when the component has been touched.
         */
        /**
         * Saves a callback function to be invoked when the select is blurred
         * by the user. Part of the ControlValueAccessor interface required
         * to integrate with Angular's core forms API.
         *
         * @param {?} fn Callback to be triggered when the component has been touched.
         * @return {?}
         */
        McSelect.prototype.registerOnTouched = /**
         * Saves a callback function to be invoked when the select is blurred
         * by the user. Part of the ControlValueAccessor interface required
         * to integrate with Angular's core forms API.
         *
         * @param {?} fn Callback to be triggered when the component has been touched.
         * @return {?}
         */
        function (fn) {
            this.onTouched = fn;
        };
        /**
         * Disables the select. Part of the ControlValueAccessor interface required
         * to integrate with Angular's core forms API.
         *
         * @param isDisabled Sets whether the component is disabled.
         */
        /**
         * Disables the select. Part of the ControlValueAccessor interface required
         * to integrate with Angular's core forms API.
         *
         * @param {?} isDisabled Sets whether the component is disabled.
         * @return {?}
         */
        McSelect.prototype.setDisabledState = /**
         * Disables the select. Part of the ControlValueAccessor interface required
         * to integrate with Angular's core forms API.
         *
         * @param {?} isDisabled Sets whether the component is disabled.
         * @return {?}
         */
        function (isDisabled) {
            this.disabled = isDisabled;
            this._changeDetectorRef.markForCheck();
            this.stateChanges.next();
        };
        Object.defineProperty(McSelect.prototype, "selected", {
            get: /**
             * @return {?}
             */
            function () {
                return this.multiple ? this.selectionModel.selected : this.selectionModel.selected[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "triggerValue", {
            get: /**
             * @return {?}
             */
            function () {
                if (this.empty) {
                    return '';
                }
                return this.selectionModel.selected[0].viewValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "triggerValues", {
            get: /**
             * @return {?}
             */
            function () {
                if (this.empty) {
                    return [];
                }
                /** @type {?} */
                var selectedOptions = this.selectionModel.selected;
                if (this.isRtl()) {
                    selectedOptions.reverse();
                }
                return selectedOptions;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "empty", {
            get: /**
             * @return {?}
             */
            function () {
                return !this.selectionModel || this.selectionModel.isEmpty();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        McSelect.prototype.isRtl = /**
         * @return {?}
         */
        function () {
            return this._dir ? this._dir.value === 'rtl' : false;
        };
        /**
         * @param {?} event
         * @return {?}
         */
        McSelect.prototype.handleKeydown = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (!this.disabled) {
                if (this.panelOpen) {
                    this.handleOpenKeydown(event);
                }
                else {
                    this.handleClosedKeydown(event);
                }
            }
        };
        /**
         * When the panel content is done fading in, the panelDoneAnimating property is
         * set so the proper class can be added to the panel.
         */
        /**
         * When the panel content is done fading in, the panelDoneAnimating property is
         * set so the proper class can be added to the panel.
         * @return {?}
         */
        McSelect.prototype.onFadeInDone = /**
         * When the panel content is done fading in, the panelDoneAnimating property is
         * set so the proper class can be added to the panel.
         * @return {?}
         */
        function () {
            this.panelDoneAnimating = this.panelOpen;
            this._changeDetectorRef.markForCheck();
            if (this.search && this._panelOpen) {
                this.search.focus();
            }
        };
        /**
         * @return {?}
         */
        McSelect.prototype.onFocus = /**
         * @return {?}
         */
        function () {
            if (!this.disabled) {
                this._focused = true;
                this.stateChanges.next();
            }
        };
        /**
         * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
         * "blur" to the panel when it opens, causing a false positive.
         */
        /**
         * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
         * "blur" to the panel when it opens, causing a false positive.
         * @return {?}
         */
        McSelect.prototype.onBlur = /**
         * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
         * "blur" to the panel when it opens, causing a false positive.
         * @return {?}
         */
        function () {
            this._focused = false;
            if (!this.disabled && !this.panelOpen) {
                this.onTouched();
                this._changeDetectorRef.markForCheck();
                this.stateChanges.next();
            }
        };
        /**
         * Callback that is invoked when the overlay panel has been attached.
         */
        /**
         * Callback that is invoked when the overlay panel has been attached.
         * @return {?}
         */
        McSelect.prototype.onAttached = /**
         * Callback that is invoked when the overlay panel has been attached.
         * @return {?}
         */
        function () {
            var _this = this;
            this.overlayDir.positionChange
                .pipe(operators.take(1))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this._changeDetectorRef.detectChanges();
                _this.calculateOverlayOffsetX();
                _this.optionsContainer.nativeElement.scrollTop = _this.scrollTop;
                _this.updateScrollSize();
            }));
        };
        /** Returns the theme to be used on the panel. */
        /**
         * Returns the theme to be used on the panel.
         * @return {?}
         */
        McSelect.prototype.getPanelTheme = /**
         * Returns the theme to be used on the panel.
         * @return {?}
         */
        function () {
            return this._parentFormField ? "mc-" + this._parentFormField.color : '';
        };
        /** Focuses the select element. */
        /**
         * Focuses the select element.
         * @return {?}
         */
        McSelect.prototype.focus = /**
         * Focuses the select element.
         * @return {?}
         */
        function () {
            this.elementRef.nativeElement.focus();
        };
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        McSelect.prototype.onContainerClick = /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            this.focus();
            this.open();
        };
        /** Invoked when an option is clicked. */
        /**
         * Invoked when an option is clicked.
         * @param {?} option
         * @param {?} $event
         * @return {?}
         */
        McSelect.prototype.onRemoveMatcherItem = /**
         * Invoked when an option is clicked.
         * @param {?} option
         * @param {?} $event
         * @return {?}
         */
        function (option, $event) {
            $event.stopPropagation();
            option.deselect();
        };
        /**
         * @return {?}
         */
        McSelect.prototype.calculateHiddenItems = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.customTrigger || this.empty || !this.multiple) {
                return;
            }
            /** @type {?} */
            var visibleItems = 0;
            /** @type {?} */
            var totalItemsWidth = this.getTotalItemsWidthInMatcher();
            /** @type {?} */
            var totalVisibleItemsWidth = 0;
            this.tags.forEach((/**
             * @param {?} tag
             * @return {?}
             */
            function (tag) {
                if (tag.nativeElement.offsetTop < tag.nativeElement.offsetHeight) {
                    totalVisibleItemsWidth += _this.getItemWidth(tag.nativeElement);
                    visibleItems++;
                }
            }));
            this.hiddenItems = ((/** @type {?} */ (this.selected))).length - visibleItems;
            if (this.hiddenItems) {
                /** @type {?} */
                var itemsCounter = this.trigger.nativeElement.querySelector('.mc-select__match-hidden-text');
                /** @type {?} */
                var matcherList = this.trigger.nativeElement.querySelector('.mc-select__match-list');
                /** @type {?} */
                var itemsCounterShowed = itemsCounter.offsetTop < itemsCounter.offsetHeight;
                // const itemsCounterWidth: number = itemsCounter.getBoundingClientRect().width;
                /** @type {?} */
                var itemsCounterWidth = 86;
                /** @type {?} */
                var matcherListWidth = matcherList.getBoundingClientRect().width;
                /** @type {?} */
                var matcherWidth = matcherListWidth + itemsCounterWidth;
                if (itemsCounterShowed && (totalItemsWidth < matcherWidth)) {
                    this.hiddenItems = 0;
                }
                if (totalVisibleItemsWidth === matcherListWidth ||
                    (totalVisibleItemsWidth + itemsCounterWidth) < matcherListWidth) {
                    this._changeDetectorRef.markForCheck();
                    return;
                }
                else if (!itemsCounterShowed && (totalItemsWidth + itemsCounterWidth) > matcherWidth) {
                    this.hiddenItems++;
                }
            }
            this._changeDetectorRef.markForCheck();
        };
        /**
         * @return {?}
         */
        McSelect.prototype.getItemHeight = /**
         * @return {?}
         */
        function () {
            return this.options.first ? this.options.first.getHeight() : 0;
        };
        /**
         * @private
         * @return {?}
         */
        McSelect.prototype.getHeightOfOptionsContainer = /**
         * @private
         * @return {?}
         */
        function () {
            return this.optionsContainer.nativeElement.getClientRects()[0].height;
        };
        /**
         * @private
         * @return {?}
         */
        McSelect.prototype.updateScrollSize = /**
         * @private
         * @return {?}
         */
        function () {
            if (!this.options.first) {
                return;
            }
            this.keyManager.withScrollSize(Math.floor(this.getHeightOfOptionsContainer() / this.options.first.getHeight()));
        };
        /**
         * @private
         * @return {?}
         */
        McSelect.prototype.getTotalItemsWidthInMatcher = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var triggerClone = this.trigger.nativeElement.cloneNode(true);
            triggerClone.querySelector('.mc-select__match-hidden-text').remove();
            this._renderer.setStyle(triggerClone, 'position', 'absolute');
            this._renderer.setStyle(triggerClone, 'visibility', 'hidden');
            this._renderer.setStyle(triggerClone, 'top', '-100%');
            this._renderer.setStyle(triggerClone, 'left', '0');
            this._renderer.appendChild(this.trigger.nativeElement, triggerClone);
            /** @type {?} */
            var totalItemsWidth = 0;
            triggerClone.querySelectorAll('mc-tag').forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                totalItemsWidth += _this.getItemWidth(item);
            }));
            triggerClone.remove();
            return totalItemsWidth;
        };
        /**
         * @private
         * @param {?} element
         * @return {?}
         */
        McSelect.prototype.getItemWidth = /**
         * @private
         * @param {?} element
         * @return {?}
         */
        function (element) {
            /** @type {?} */
            var computedStyle = window.getComputedStyle(element);
            /** @type {?} */
            var width = parseInt((/** @type {?} */ (computedStyle.width)));
            /** @type {?} */
            var marginLeft = parseInt((/** @type {?} */ (computedStyle.marginLeft)));
            /** @type {?} */
            var marginRight = parseInt((/** @type {?} */ (computedStyle.marginRight)));
            return width + marginLeft + marginRight;
        };
        /** Handles keyboard events while the select is closed. */
        /**
         * Handles keyboard events while the select is closed.
         * @private
         * @param {?} event
         * @return {?}
         */
        McSelect.prototype.handleClosedKeydown = /**
         * Handles keyboard events while the select is closed.
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /* tslint:disable-next-line */
            /** @type {?} */
            var keyCode = event.keyCode;
            /** @type {?} */
            var isArrowKey = keyCode === keycodes.DOWN_ARROW || keyCode === keycodes.UP_ARROW ||
                keyCode === keycodes.LEFT_ARROW || keyCode === keycodes.RIGHT_ARROW;
            /** @type {?} */
            var isOpenKey = keyCode === keycodes.ENTER || keyCode === keycodes.SPACE;
            // Open the select on ALT + arrow key to match the native <select>
            if (isOpenKey || ((this.multiple || event.altKey) && isArrowKey)) {
                event.preventDefault(); // prevents the page from scrolling down when pressing space
                this.open();
            }
            else if (!this.multiple) {
                this.keyManager.onKeydown(event);
            }
        };
        /** Handles keyboard events when the selected is open. */
        /**
         * Handles keyboard events when the selected is open.
         * @private
         * @param {?} event
         * @return {?}
         */
        McSelect.prototype.handleOpenKeydown = /**
         * Handles keyboard events when the selected is open.
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /* tslint:disable-next-line */
            /** @type {?} */
            var keyCode = event.keyCode;
            /** @type {?} */
            var isArrowKey = keyCode === keycodes.DOWN_ARROW || keyCode === keycodes.UP_ARROW;
            /** @type {?} */
            var manager = this.keyManager;
            if (isArrowKey && event.altKey) {
                // Close the select on ALT + arrow key to match the native <select>
                event.preventDefault();
                this.close();
            }
            else if (keyCode === keycodes.HOME) {
                event.preventDefault();
                manager.setFirstItemActive();
            }
            else if (keyCode === keycodes.END) {
                event.preventDefault();
                manager.setLastItemActive();
            }
            else if (keyCode === keycodes.PAGE_UP) {
                event.preventDefault();
                manager.setPreviousPageItemActive();
            }
            else if (keyCode === keycodes.PAGE_DOWN) {
                event.preventDefault();
                manager.setNextPageItemActive();
            }
            else if ((keyCode === keycodes.ENTER || keyCode === keycodes.SPACE) && manager.activeItem) {
                event.preventDefault();
                manager.activeItem.selectViaInteraction();
            }
            else if (this._multiple && keyCode === keycodes.A && event.ctrlKey) {
                event.preventDefault();
                /** @type {?} */
                var hasDeselectedOptions_1 = this.options.some((/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) { return !option.selected; }));
                this.options.forEach((/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) {
                    if (hasDeselectedOptions_1 && !option.disabled) {
                        option.select();
                    }
                    else {
                        option.deselect();
                    }
                }));
            }
            else {
                /** @type {?} */
                var previouslyFocusedIndex = manager.activeItemIndex;
                manager.onKeydown(event);
                if (this._multiple && isArrowKey && event.shiftKey && manager.activeItem &&
                    manager.activeItemIndex !== previouslyFocusedIndex) {
                    manager.activeItem.selectViaInteraction();
                }
            }
        };
        /**
         * @private
         * @return {?}
         */
        McSelect.prototype.initializeSelection = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            // Defer setting the value in order to avoid the "Expression
            // has changed after it was checked" errors from Angular.
            Promise.resolve().then((/**
             * @return {?}
             */
            function () {
                _this.setSelectionByValue(_this.ngControl ? _this.ngControl.value : _this._value);
            }));
        };
        /**
         * Sets the selected option based on a value. If no option can be
         * found with the designated value, the select trigger is cleared.
         */
        /**
         * Sets the selected option based on a value. If no option can be
         * found with the designated value, the select trigger is cleared.
         * @private
         * @param {?} value
         * @return {?}
         */
        McSelect.prototype.setSelectionByValue = /**
         * Sets the selected option based on a value. If no option can be
         * found with the designated value, the select trigger is cleared.
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            this.previousSelectionModelSelected = this.selectionModel.selected;
            if (this.multiple && value) {
                if (!Array.isArray(value)) {
                    throw core$1.getMcSelectNonArrayValueError();
                }
                this.selectionModel.clear();
                value.forEach((/**
                 * @param {?} currentValue
                 * @return {?}
                 */
                function (currentValue) { return _this.selectValue(currentValue); }));
                this.sortValues();
            }
            else {
                this.selectionModel.clear();
                /** @type {?} */
                var correspondingOption = this.selectValue(value);
                // Shift focus to the active item. Note that we shouldn't do this in multiple
                // mode, because we don't know what option the user interacted with last.
                if (correspondingOption) {
                    this.keyManager.setActiveItem(correspondingOption);
                }
            }
            this._changeDetectorRef.markForCheck();
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        McSelect.prototype.getCorrespondOption = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            return __spread(this.options.toArray(), this.previousSelectionModelSelected).find((/**
             * @param {?} option
             * @return {?}
             */
            function (option) {
                try {
                    // Treat null as a special reset value.
                    return option.value != null && _this.compareWith(option.value, value);
                }
                catch (error) {
                    if (core.isDevMode()) {
                        // Notify developers of errors in their comparator.
                        console.warn(error);
                    }
                    return false;
                }
            }));
        };
        /**
         * Finds and selects and option based on its value.
         * @returns Option that has the corresponding value.
         */
        /**
         * Finds and selects and option based on its value.
         * @private
         * @param {?} value
         * @return {?} Option that has the corresponding value.
         */
        McSelect.prototype.selectValue = /**
         * Finds and selects and option based on its value.
         * @private
         * @param {?} value
         * @return {?} Option that has the corresponding value.
         */
        function (value) {
            /** @type {?} */
            var correspondingOption = this.getCorrespondOption(value);
            if (correspondingOption) {
                this.selectionModel.select(correspondingOption);
            }
            return correspondingOption;
        };
        /** Sets up a key manager to listen to keyboard events on the overlay panel. */
        /**
         * Sets up a key manager to listen to keyboard events on the overlay panel.
         * @private
         * @return {?}
         */
        McSelect.prototype.initKeyManager = /**
         * Sets up a key manager to listen to keyboard events on the overlay panel.
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var typeAheadDebounce = 200;
            this.keyManager = new a11y.ActiveDescendantKeyManager(this.options)
                .withTypeAhead(typeAheadDebounce, this.search ? -1 : 0)
                .withVerticalOrientation()
                .withHorizontalOrientation(this.isRtl() ? 'rtl' : 'ltr');
            this.keyManager.tabOut
                .pipe(operators.takeUntil(this.destroy))
                .subscribe((/**
             * @return {?}
             */
            function () {
                // Restore focus to the trigger before closing. Ensures that the focus
                // position won't be lost if the user got focus into the overlay.
                _this.focus();
                _this.close();
            }));
            this.keyManager.change
                .pipe(operators.takeUntil(this.destroy))
                .subscribe((/**
             * @return {?}
             */
            function () {
                if (_this._panelOpen && _this.panel) {
                    _this.scrollActiveOptionIntoView();
                }
                else if (!_this._panelOpen && !_this.multiple && _this.keyManager.activeItem) {
                    _this.keyManager.activeItem.selectViaInteraction();
                }
            }));
        };
        /** Drops current option subscriptions and IDs and resets from scratch. */
        /**
         * Drops current option subscriptions and IDs and resets from scratch.
         * @private
         * @return {?}
         */
        McSelect.prototype.resetOptions = /**
         * Drops current option subscriptions and IDs and resets from scratch.
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var changedOrDestroyed = rxjs.merge(this.options.changes, this.destroy);
            this.optionSelectionChanges
                .pipe(operators.takeUntil(changedOrDestroyed))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                _this.onSelect(event.source, event.isUserInput);
                if (_this.search && _this.search.isSearchChanged) {
                    Promise.resolve().then((/**
                     * @return {?}
                     */
                    function () { return _this.keyManager.setFirstItemActive(); }));
                    _this.search.isSearchChanged = false;
                }
                if (event.isUserInput && !_this.multiple && _this._panelOpen) {
                    _this.close();
                    _this.focus();
                }
            }));
            // Listen to changes in the internal state of the options and react accordingly.
            // Handles cases like the labels of the selected options changing.
            rxjs.merge.apply(void 0, __spread(this.options.map((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return option.stateChanges; })))).pipe(operators.takeUntil(changedOrDestroyed))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this._changeDetectorRef.markForCheck();
                _this.stateChanges.next();
            }));
        };
        /** Invoked when an option is clicked. */
        /**
         * Invoked when an option is clicked.
         * @private
         * @param {?} option
         * @param {?} isUserInput
         * @return {?}
         */
        McSelect.prototype.onSelect = /**
         * Invoked when an option is clicked.
         * @private
         * @param {?} option
         * @param {?} isUserInput
         * @return {?}
         */
        function (option, isUserInput) {
            /** @type {?} */
            var wasSelected = this.selectionModel.isSelected(option);
            if (option.value == null && !this._multiple) {
                option.deselect();
                this.selectionModel.clear();
                this.propagateChanges(option.value);
            }
            else {
                if (option.selected) {
                    this.selectionModel.select(option);
                }
                else {
                    this.selectionModel.deselect(option);
                }
                if (isUserInput) {
                    this.keyManager.setActiveItem(option);
                }
                if (this.multiple) {
                    this.sortValues();
                    if (isUserInput) {
                        // In case the user selected the option with their mouse, we
                        // want to restore focus back to the trigger, in order to
                        // prevent the select keyboard controls from clashing with
                        // the ones from `mc-option`.
                        // If search is avaliable then we focus search again.
                        if (this.search) {
                            this.search.focus();
                        }
                        else {
                            this.focus();
                        }
                    }
                }
            }
            if (wasSelected !== this.selectionModel.isSelected(option)) {
                this.propagateChanges();
            }
            this.stateChanges.next();
        };
        /** Sorts the selected values in the selected based on their order in the panel. */
        /**
         * Sorts the selected values in the selected based on their order in the panel.
         * @private
         * @return {?}
         */
        McSelect.prototype.sortValues = /**
         * Sorts the selected values in the selected based on their order in the panel.
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.multiple) {
                /** @type {?} */
                var options_1 = this.options.toArray();
                this.selectionModel.sort((/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                function (a, b) {
                    return _this.sortComparator ? _this.sortComparator(a, b, options_1) :
                        options_1.indexOf(a) - options_1.indexOf(b);
                }));
                this.stateChanges.next();
            }
        };
        /** Emits change event to set the model value. */
        /**
         * Emits change event to set the model value.
         * @private
         * @param {?=} fallbackValue
         * @return {?}
         */
        McSelect.prototype.propagateChanges = /**
         * Emits change event to set the model value.
         * @private
         * @param {?=} fallbackValue
         * @return {?}
         */
        function (fallbackValue) {
            /** @type {?} */
            var valueToEmit = null;
            if (this.multiple) {
                valueToEmit = ((/** @type {?} */ (this.selected))).map((/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) { return option.value; }));
            }
            else {
                valueToEmit = this.selected ? ((/** @type {?} */ (this.selected))).value : fallbackValue;
            }
            this._value = valueToEmit;
            this.valueChange.emit(valueToEmit);
            this.onChange(valueToEmit);
            this.selectionChange.emit(new McSelectChange(this, valueToEmit));
            this._changeDetectorRef.markForCheck();
        };
        /**
         * Highlights the selected item. If no option is selected, it will highlight
         * the first item instead.
         */
        /**
         * Highlights the selected item. If no option is selected, it will highlight
         * the first item instead.
         * @private
         * @return {?}
         */
        McSelect.prototype.highlightCorrectOption = /**
         * Highlights the selected item. If no option is selected, it will highlight
         * the first item instead.
         * @private
         * @return {?}
         */
        function () {
            if (this.keyManager) {
                if (this.empty) {
                    this.keyManager.setFirstItemActive();
                }
                else {
                    this.keyManager.setActiveItem(this.selectionModel.selected[0]);
                }
            }
        };
        /** Scrolls the active option into view. */
        /**
         * Scrolls the active option into view.
         * @private
         * @return {?}
         */
        McSelect.prototype.scrollActiveOptionIntoView = /**
         * Scrolls the active option into view.
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var activeOptionIndex = this.keyManager.activeItemIndex || 0;
            /** @type {?} */
            var labelCount = core$1.countGroupLabelsBeforeOption(activeOptionIndex, this.options, this.optionGroups);
            this.optionsContainer.nativeElement.scrollTop = core$1.getOptionScrollPosition(activeOptionIndex + labelCount, this.getItemHeight(), this.optionsContainer.nativeElement.scrollTop, core$1.SELECT_PANEL_MAX_HEIGHT);
        };
        /**
         * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text when
         * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
         * can't be calculated until the panel has been attached, because we need to know the
         * content width in order to constrain the panel within the viewport.
         */
        /**
         * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text when
         * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
         * can't be calculated until the panel has been attached, because we need to know the
         * content width in order to constrain the panel within the viewport.
         * @private
         * @return {?}
         */
        McSelect.prototype.calculateOverlayOffsetX = /**
         * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text when
         * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
         * can't be calculated until the panel has been attached, because we need to know the
         * content width in order to constrain the panel within the viewport.
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var overlayRect = this.overlayDir.overlayRef.overlayElement.getBoundingClientRect();
            /** @type {?} */
            var viewportSize = this._viewportRuler.getViewportSize();
            /** @type {?} */
            var isRtl = this.isRtl();
            /* tslint:disable-next-line:no-magic-numbers */
            /** @type {?} */
            var paddingWidth = core$1.SELECT_PANEL_PADDING_X * 2;
            /** @type {?} */
            var offsetX;
            /** @type {?} */
            var selected = this.selectionModel.selected[0] || this.options.first;
            offsetX = selected && selected.group ? core$1.SELECT_PANEL_INDENT_PADDING_X : core$1.SELECT_PANEL_PADDING_X;
            // Invert the offset in LTR.
            if (!isRtl) {
                offsetX *= -1;
            }
            // Determine how much the select overflows on each side.
            /** @type {?} */
            var leftOverflow = 0 - (overlayRect.left + offsetX - (isRtl ? paddingWidth : 0));
            /** @type {?} */
            var rightOverflow = overlayRect.right + offsetX - viewportSize.width
                + (isRtl ? 0 : paddingWidth);
            // If the element overflows on either side, reduce the offset to allow it to fit.
            if (leftOverflow > 0) {
                offsetX += leftOverflow + core$1.SELECT_PANEL_VIEWPORT_PADDING;
            }
            else if (rightOverflow > 0) {
                offsetX -= rightOverflow + core$1.SELECT_PANEL_VIEWPORT_PADDING;
            }
            // Set the offset directly in order to avoid having to go through change detection and
            // potentially triggering "changed after it was checked" errors. Round the value to avoid
            // blurry content in some browsers.
            this.overlayDir.offsetX = Math.round(offsetX);
            this.overlayDir.overlayRef.updatePosition();
        };
        McSelect.decorators = [
            { type: core.Component, args: [{
                        selector: 'mc-select',
                        exportAs: 'mcSelect',
                        template: "<div cdk-overlay-origin\n     class=\"mc-select__trigger\"\n     (click)=\"toggle()\"\n     [class.mc-select__trigger_multiple]=\"multiple\"\n     #origin=\"cdkOverlayOrigin\"\n     #trigger>\n    <div class=\"mc-select__matcher\" [ngSwitch]=\"empty\">\n        <span class=\"mc-select__placeholder\" *ngSwitchCase=\"true\">{{ placeholder || '\\u00A0' }}</span>\n        <span *ngSwitchCase=\"false\" [ngSwitch]=\"!!customTrigger\">\n            <div *ngSwitchDefault [ngSwitch]=\"multiple\" class=\"mc-select__match-container\">\n                <span *ngSwitchCase=\"false\" class=\"mc-select__matcher-text\">{{ triggerValue }}</span>\n                <div *ngSwitchCase=\"true\" class=\"mc-select__match-list\">\n                    <mc-tag *ngFor=\"let option of triggerValues\"\n                            [disabled]=\"disabled\"\n                            [selectable]=\"false\"\n                            [class.mc-error]=\"errorState\">\n                        {{ option.viewValue }}\n                        <i mc-icon=\"mc-close-S_16\" (click)=\"onRemoveMatcherItem(option, $event)\"></i>\n                    </mc-tag>\n                </div>\n                <div class=\"mc-select__match-hidden-text\" [style.display]=\"hiddenItems > 0 ? 'block' : 'none'\">\n                    {{ hiddenItemsTextFormatter(hiddenItemsText, hiddenItems) }}\n                </div>\n            </div>\n            <ng-content select=\"mc-select-trigger\" *ngSwitchCase=\"true\"></ng-content>\n        </span>\n    </div>\n\n    <div class=\"mc-select__cleaner\" *ngIf=\"canShowCleaner\" (click)=\"clearValue($event)\">\n        <ng-content select=\"mc-cleaner\"></ng-content>\n    </div>\n\n    <div class=\"mc-select__arrow-wrapper\">\n        <i class=\"mc-select__arrow\" mc-icon=\"mc-angle-down-L_16\"></i>\n    </div>\n</div>\n\n<ng-template\n    cdk-connected-overlay\n    cdkConnectedOverlayLockPosition\n    cdkConnectedOverlayHasBackdrop\n    cdkConnectedOverlayBackdropClass=\"cdk-overlay-transparent-backdrop\"\n    [cdkConnectedOverlayScrollStrategy]=\"scrollStrategy\"\n    [cdkConnectedOverlayOrigin]=\"origin\"\n    [cdkConnectedOverlayOpen]=\"panelOpen\"\n    [cdkConnectedOverlayPositions]=\"positions\"\n    [cdkConnectedOverlayMinWidth]=\"triggerRect?.width\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    (backdropClick)=\"close()\"\n    (attach)=\"onAttached()\"\n    (detach)=\"close()\">\n    <div\n        #panel\n        class=\"mc-select__panel {{ getPanelTheme() }}\"\n        [ngClass]=\"panelClass\"\n        (@transformPanel.done)=\"panelDoneAnimatingStream.next($event.toState)\"\n        [style.transformOrigin]=\"transformOrigin\"\n        [class.mc-select-panel-done-animcing]=\"panelDoneAnimating\"\n        [style.font-size.px]=\"triggerFontSize\"\n        (keydown)=\"handleKeydown($event)\">\n\n        <div *ngIf=\"search\" class=\"mc-select__search-container\">\n            <ng-content select=\"[mcSelectSearch]\"></ng-content>\n        </div>\n\n        <div #optionsContainer\n             class=\"mc-select__content\"\n             [@fadeInContent]=\"'showing'\"\n             (@fadeInContent.done)=\"onFadeInDone()\">\n\n            <div *ngIf=\"isEmptySearchResult\" class=\"mc-select__no-options-message\">\n                <ng-content select=\"[mc-select-search-empty-result]\"></ng-content>\n            </div>\n            <ng-content select=\"mc-option,mc-optgroup\"></ng-content>\n        </div>\n    </div>\n</ng-template>\n",
                        inputs: ['disabled'],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        host: {
                            '[attr.id]': 'id',
                            '[tabindex]': 'tabIndex',
                            class: 'mc-select',
                            '[class.mc-disabled]': 'disabled',
                            '[class.mc-select-invalid]': 'errorState',
                            '(keydown)': 'handleKeydown($event)',
                            '(focus)': 'onFocus()',
                            '(blur)': 'onBlur()',
                            '(window:resize)': 'calculateHiddenItems()'
                        },
                        animations: [
                            core$1.mcSelectAnimations.transformPanel,
                            core$1.mcSelectAnimations.fadeInContent
                        ],
                        providers: [
                            { provide: formField.McFormFieldControl, useExisting: McSelect },
                            { provide: core$1.MC_OPTION_PARENT_COMPONENT, useExisting: McSelect }
                        ],
                        styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}.mc-select{box-sizing:border-box;display:inline-block;vertical-align:top;width:100%;outline:0}.mc-select .mc-select__trigger{display:flex;box-sizing:border-box;position:relative;height:30px;cursor:pointer;padding-right:7px;padding-left:15px}.mc-select .mc-select__trigger.mc-select__trigger_multiple{padding-left:7px}.mc-select.mc-disabled .mc-select__trigger{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.mc-select__no-options-message{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;position:relative;max-width:100%;height:32px;cursor:default;outline:0;padding:0 16px}.mc-select__matcher{display:flex;align-items:center;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mc-select__matcher>span{width:100%}.mc-select__match-list{display:flex;flex-wrap:wrap;overflow:hidden;max-height:28px;margin:0;padding-left:0}.mc-select__match-list .mc-tag{margin-right:4px}.mc-select__match-container{display:flex;flex-direction:row;justify-content:space-between;width:100%}.mc-select__match-container .mc-select__match-hidden-text{flex:0 0 70px;-ms-grid-row-align:center;align-self:center;padding:0 8px;text-align:right}.mc-select__match-item{display:flex;border:1px solid transparent;border-radius:3px;padding-left:7px;margin-right:4px;max-width:100%}.mc-select__arrow-wrapper{-ms-grid-row-align:center;align-self:center}.mc-form-field-appearance-fill .mc-select__arrow-wrapper,.mc-form-field-appearance-standard .mc-select__arrow-wrapper{transform:translateY(-50%)}.mc-form-field-appearance-outline .mc-select__arrow-wrapper{transform:translateY(-25%)}.mc-select__panel{min-width:100%;overflow:hidden;border-width:1px;border-style:solid;border-bottom-left-radius:3px;border-bottom-right-radius:3px;padding:4px 0}.mc-select__panel .mc-optgroup-label,.mc-select__panel .mc-option{font-size:inherit;line-height:32px;height:32px}.mc-select__content{max-height:224px;overflow:auto}.mc-form-field-type-mc-select:not(.mc-disabled) .mc-form-field-flex{cursor:pointer}.mc-form-field-type-mc-select .mc-form-field-label{width:calc(100% - 18px)}.mc-select__search-container{border-bottom-width:1px;border-bottom-style:solid}"]
                    }] }
        ];
        /** @nocollapse */
        McSelect.ctorParameters = function () { return [
            { type: overlay.ViewportRuler },
            { type: core.ChangeDetectorRef },
            { type: core.NgZone },
            { type: core.Renderer2 },
            { type: core$1.ErrorStateMatcher },
            { type: core.ElementRef },
            { type: Array, decorators: [{ type: core.Optional }, { type: core.Inject, args: [forms.NG_VALIDATORS,] }] },
            { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
            { type: forms.NgForm, decorators: [{ type: core.Optional }] },
            { type: forms.FormGroupDirective, decorators: [{ type: core.Optional }] },
            { type: formField.McFormField, decorators: [{ type: core.Optional }] },
            { type: forms.NgControl, decorators: [{ type: core.Self }, { type: core.Optional }] },
            { type: forms.NgModel, decorators: [{ type: core.Optional }, { type: core.Self }] },
            { type: forms.FormControlName, decorators: [{ type: core.Optional }, { type: core.Self }] },
            { type: String, decorators: [{ type: core.Attribute, args: ['tabindex',] }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [core$1.MC_SELECT_SCROLL_STRATEGY,] }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [core$1.MC_VALIDATION,] }] }
        ]; };
        McSelect.propDecorators = {
            trigger: [{ type: core.ViewChild, args: ['trigger', { static: false },] }],
            panel: [{ type: core.ViewChild, args: ['panel', { static: false },] }],
            optionsContainer: [{ type: core.ViewChild, args: ['optionsContainer', { static: false },] }],
            overlayDir: [{ type: core.ViewChild, args: [overlay.CdkConnectedOverlay, { static: false },] }],
            tags: [{ type: core.ViewChildren, args: [tags.McTag,] }],
            customTrigger: [{ type: core.ContentChild, args: [McSelectTrigger, { static: false },] }],
            cleaner: [{ type: core.ContentChild, args: ['mcSelectCleaner', { static: true },] }],
            options: [{ type: core.ContentChildren, args: [core$1.McOption, { descendants: true },] }],
            optionGroups: [{ type: core.ContentChildren, args: [core$1.McOptgroup,] }],
            search: [{ type: core.ContentChild, args: [McSelectSearch, { static: false },] }],
            hiddenItemsText: [{ type: core.Input }],
            panelClass: [{ type: core.Input }],
            errorStateMatcher: [{ type: core.Input }],
            sortComparator: [{ type: core.Input }],
            openedChange: [{ type: core.Output }],
            openedStream: [{ type: core.Output, args: ['opened',] }],
            closedStream: [{ type: core.Output, args: ['closed',] }],
            selectionChange: [{ type: core.Output }],
            valueChange: [{ type: core.Output }],
            placeholder: [{ type: core.Input }],
            required: [{ type: core.Input }],
            multiple: [{ type: core.Input }],
            compareWith: [{ type: core.Input }],
            value: [{ type: core.Input }],
            id: [{ type: core.Input }],
            hiddenItemsTextFormatter: [{ type: core.Input }]
        };
        return McSelect;
    }(McSelectMixinBase));
    if (false) {
        /**
         * A name for this control that can be used by `mc-form-field`.
         * @type {?}
         */
        McSelect.prototype.controlType;
        /** @type {?} */
        McSelect.prototype.hiddenItems;
        /**
         * The last measured value for the trigger's client bounding rect.
         * @type {?}
         */
        McSelect.prototype.triggerRect;
        /**
         * The cached font-size of the trigger element.
         * @type {?}
         */
        McSelect.prototype.triggerFontSize;
        /**
         * Deals with the selection logic.
         * @type {?}
         */
        McSelect.prototype.selectionModel;
        /** @type {?} */
        McSelect.prototype.previousSelectionModelSelected;
        /**
         * Manages keyboard events for options in the panel.
         * @type {?}
         */
        McSelect.prototype.keyManager;
        /**
         * The value of the select panel's transform-origin property.
         * @type {?}
         */
        McSelect.prototype.transformOrigin;
        /**
         * Whether the panel's animation is done.
         * @type {?}
         */
        McSelect.prototype.panelDoneAnimating;
        /**
         * Emits when the panel element is finished transforming in.
         * @type {?}
         */
        McSelect.prototype.panelDoneAnimatingStream;
        /**
         * Strategy that will be used to handle scrolling while the select panel is open.
         * @type {?}
         */
        McSelect.prototype.scrollStrategy;
        /**
         * The y-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text.
         * when the panel opens. Will change based on the y-position of the selected option.
         * @type {?}
         */
        McSelect.prototype.offsetY;
        /**
         * This position config ensures that the top "start" corner of the overlay
         * is aligned with with the top "start" of the origin by default (overlapping
         * the trigger completely). If the panel cannot fit below the trigger, it
         * will fall back to a position above the trigger.
         * @type {?}
         */
        McSelect.prototype.positions;
        /** @type {?} */
        McSelect.prototype.trigger;
        /** @type {?} */
        McSelect.prototype.panel;
        /** @type {?} */
        McSelect.prototype.optionsContainer;
        /** @type {?} */
        McSelect.prototype.overlayDir;
        /** @type {?} */
        McSelect.prototype.tags;
        /**
         * User-supplied override of the trigger element.
         * @type {?}
         */
        McSelect.prototype.customTrigger;
        /** @type {?} */
        McSelect.prototype.cleaner;
        /**
         * All of the defined select options.
         * @type {?}
         */
        McSelect.prototype.options;
        /**
         * All of the defined groups of options.
         * @type {?}
         */
        McSelect.prototype.optionGroups;
        /** @type {?} */
        McSelect.prototype.search;
        /** @type {?} */
        McSelect.prototype.hiddenItemsText;
        /**
         * Classes to be passed to the select panel. Supports the same syntax as `ngClass`.
         * @type {?}
         */
        McSelect.prototype.panelClass;
        /**
         * Object used to control when error messages are shown.
         * @type {?}
         */
        McSelect.prototype.errorStateMatcher;
        /**
         * Function used to sort the values in a select in multiple mode.
         * Follows the same logic as `Array.prototype.sort`.
         * @type {?}
         */
        McSelect.prototype.sortComparator;
        /**
         * Combined stream of all of the child options' change events.
         * @type {?}
         */
        McSelect.prototype.optionSelectionChanges;
        /**
         * Event emitted when the select panel has been toggled.
         * @type {?}
         */
        McSelect.prototype.openedChange;
        /**
         * Event emitted when the select has been opened.
         * @type {?}
         */
        McSelect.prototype.openedStream;
        /**
         * Event emitted when the select has been closed.
         * @type {?}
         */
        McSelect.prototype.closedStream;
        /**
         * Event emitted when the selected value has been changed by the user.
         * @type {?}
         */
        McSelect.prototype.selectionChange;
        /**
         * Event that emits whenever the raw value of the select changes. This is here primarily
         * to facilitate the two-way binding for the `value` input.
         * \@docs-private
         * @type {?}
         */
        McSelect.prototype.valueChange;
        /**
         * @type {?}
         * @private
         */
        McSelect.prototype._placeholder;
        /**
         * @type {?}
         * @private
         */
        McSelect.prototype._required;
        /**
         * @type {?}
         * @private
         */
        McSelect.prototype._multiple;
        /**
         * @type {?}
         * @private
         */
        McSelect.prototype._value;
        /**
         * @type {?}
         * @private
         */
        McSelect.prototype._id;
        /**
         * @type {?}
         * @private
         */
        McSelect.prototype._focused;
        /**
         * @type {?}
         * @private
         */
        McSelect.prototype._panelOpen;
        /**
         * The scroll position of the overlay panel, calculated to center the selected option.
         * @type {?}
         * @private
         */
        McSelect.prototype.scrollTop;
        /**
         * Unique id for this input.
         * @type {?}
         * @private
         */
        McSelect.prototype.uid;
        /**
         * Emits whenever the component is destroyed.
         * @type {?}
         * @private
         */
        McSelect.prototype.destroy;
        /**
         * `View -> model callback called when value changes`
         * @type {?}
         */
        McSelect.prototype.onChange;
        /**
         * `View -> model callback called when select has been touched`
         * @type {?}
         */
        McSelect.prototype.onTouched;
        /**
         * Comparison function to specify which option is displayed. Defaults to object equality.
         * @type {?}
         * @private
         */
        McSelect.prototype._compareWith;
        /**
         * @type {?}
         * @private
         */
        McSelect.prototype._viewportRuler;
        /**
         * @type {?}
         * @private
         */
        McSelect.prototype._changeDetectorRef;
        /**
         * @type {?}
         * @private
         */
        McSelect.prototype._ngZone;
        /**
         * @type {?}
         * @private
         */
        McSelect.prototype._renderer;
        /** @type {?} */
        McSelect.prototype.rawValidators;
        /**
         * @type {?}
         * @private
         */
        McSelect.prototype._dir;
        /**
         * @type {?}
         * @private
         */
        McSelect.prototype._parentFormField;
        /** @type {?} */
        McSelect.prototype.ngModel;
        /** @type {?} */
        McSelect.prototype.formControlName;
        /**
         * @type {?}
         * @private
         */
        McSelect.prototype._scrollStrategyFactory;
        /**
         * @type {?}
         * @private
         */
        McSelect.prototype.mcValidation;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: select.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McSelectModule = /** @class */ (function () {
        function McSelectModule() {
        }
        McSelectModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            overlay.OverlayModule,
                            core$1.McOptionModule,
                            icon.McIconModule,
                            tags.McTagsModule
                        ],
                        exports: [
                            formField.McFormFieldModule,
                            McSelect,
                            McSelectSearch,
                            McSelectSearchEmptyResult,
                            McSelectTrigger,
                            core$1.McOptionModule,
                            common.CommonModule
                        ],
                        declarations: [
                            McSelect,
                            McSelectSearch,
                            McSelectSearchEmptyResult,
                            McSelectTrigger
                        ],
                        providers: [core$1.MC_SELECT_SCROLL_STRATEGY_PROVIDER]
                    },] }
        ];
        return McSelectModule;
    }());

    exports.McSelect = McSelect;
    exports.McSelectBase = McSelectBase;
    exports.McSelectChange = McSelectChange;
    exports.McSelectModule = McSelectModule;
    exports.McSelectSearch = McSelectSearch;
    exports.McSelectSearchEmptyResult = McSelectSearchEmptyResult;
    exports.McSelectTrigger = McSelectTrigger;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-select.umd.js.map
