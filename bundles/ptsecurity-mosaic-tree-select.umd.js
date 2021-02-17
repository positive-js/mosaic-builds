(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/overlay'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/cdk/tree'), require('@ptsecurity/mosaic/core'), require('@ptsecurity/mosaic/icon'), require('@ptsecurity/mosaic/tags'), require('@ptsecurity/mosaic/tree'), require('@angular/cdk/bidi'), require('@angular/cdk/coercion'), require('@angular/cdk/collections'), require('@angular/forms'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/mosaic/form-field'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/tree-select', ['exports', '@angular/cdk/overlay', '@angular/common', '@angular/core', '@ptsecurity/cdk/tree', '@ptsecurity/mosaic/core', '@ptsecurity/mosaic/icon', '@ptsecurity/mosaic/tags', '@ptsecurity/mosaic/tree', '@angular/cdk/bidi', '@angular/cdk/coercion', '@angular/cdk/collections', '@angular/forms', '@ptsecurity/cdk/keycodes', '@ptsecurity/mosaic/form-field', 'rxjs', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic['tree-select'] = {}), global.ng.cdk.overlay, global.ng.common, global.ng.core, global.tree, global.ptsecurity.mosaic.core, global.ptsecurity.mosaic.icon, global.ptsecurity.mosaic.tags, global.ptsecurity.mosaic.tree, global.ng.cdk.bidi, global.ng.cdk.coercion, global.ng.cdk.collections, global.ng.forms, global.keycodes, global.ptsecurity.mosaic['form-field'], global.rxjs, global.rxjs.operators));
}(this, (function (exports, overlay, common, core, tree, core$1, icon, tags, tree$1, bidi, coercion, collections, forms, keycodes, formField, rxjs, operators) { 'use strict';

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

    /** @type {?} */
    var nextUniqueId = 0;
    /**
     * Change event object that is emitted when the select value has changed.
     */
    var McTreeSelectChange = /** @class */ (function () {
        /**
         * @param {?} source
         * @param {?} value
         * @param {?=} isUserInput
         */
        function McTreeSelectChange(source, value, isUserInput) {
            if (isUserInput === void 0) { isUserInput = false; }
            this.source = source;
            this.value = value;
            this.isUserInput = isUserInput;
        }
        return McTreeSelectChange;
    }());
    if (false) {
        /** @type {?} */
        McTreeSelectChange.prototype.source;
        /** @type {?} */
        McTreeSelectChange.prototype.value;
        /** @type {?} */
        McTreeSelectChange.prototype.isUserInput;
    }
    var McTreeSelectTrigger = /** @class */ (function () {
        function McTreeSelectTrigger() {
        }
        return McTreeSelectTrigger;
    }());
    McTreeSelectTrigger.decorators = [
        { type: core.Directive, args: [{ selector: 'mc-tree-select-trigger' },] }
    ];
    var McTreeSelectBase = /** @class */ (function () {
        /**
         * @param {?} elementRef
         * @param {?} defaultErrorStateMatcher
         * @param {?} parentForm
         * @param {?} parentFormGroup
         * @param {?} ngControl
         */
        function McTreeSelectBase(elementRef, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
            this.elementRef = elementRef;
            this.defaultErrorStateMatcher = defaultErrorStateMatcher;
            this.parentForm = parentForm;
            this.parentFormGroup = parentFormGroup;
            this.ngControl = ngControl;
        }
        return McTreeSelectBase;
    }());
    if (false) {
        /** @type {?} */
        McTreeSelectBase.prototype.elementRef;
        /** @type {?} */
        McTreeSelectBase.prototype.defaultErrorStateMatcher;
        /** @type {?} */
        McTreeSelectBase.prototype.parentForm;
        /** @type {?} */
        McTreeSelectBase.prototype.parentFormGroup;
        /** @type {?} */
        McTreeSelectBase.prototype.ngControl;
    }
    // tslint:disable-next-line:naming-convention
    /** @type {?} */
    var McTreeSelectMixinBase = core$1.mixinTabIndex(core$1.mixinDisabled(core$1.mixinErrorState(McTreeSelectBase)));
    var McTreeSelect = /** @class */ (function (_super) {
        __extends(McTreeSelect, _super);
        /**
         * @param {?} elementRef
         * @param {?} changeDetectorRef
         * @param {?} viewportRuler
         * @param {?} ngZone
         * @param {?} renderer
         * @param {?} defaultErrorStateMatcher
         * @param {?} scrollStrategyFactory
         * @param {?} rawValidators
         * @param {?} mcValidation
         * @param {?} dir
         * @param {?} parentForm
         * @param {?} parentFormGroup
         * @param {?} parentFormField
         * @param {?} ngControl
         * @param {?} ngModel
         * @param {?} formControlName
         */
        function McTreeSelect(elementRef, changeDetectorRef, viewportRuler, ngZone, renderer, defaultErrorStateMatcher, scrollStrategyFactory, rawValidators, mcValidation, dir, parentForm, parentFormGroup, parentFormField, ngControl, ngModel, formControlName) {
            var _this = _super.call(this, elementRef, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) || this;
            _this.changeDetectorRef = changeDetectorRef;
            _this.viewportRuler = viewportRuler;
            _this.ngZone = ngZone;
            _this.renderer = renderer;
            _this.scrollStrategyFactory = scrollStrategyFactory;
            _this.rawValidators = rawValidators;
            _this.mcValidation = mcValidation;
            _this.dir = dir;
            _this.parentFormField = parentFormField;
            _this.ngModel = ngModel;
            _this.formControlName = formControlName;
            /**
             * A name for this control that can be used by `mc-form-field`.
             */
            _this.controlType = 'mc-select';
            _this.hiddenItems = 0;
            /**
             * The cached font-size of the trigger element.
             */
            _this.triggerFontSize = 0;
            /**
             * The value of the select panel's transform-origin property.
             */
            _this.transformOrigin = 'top';
            /**
             * Emits when the panel element is finished transforming in.
             */
            _this.panelDoneAnimatingStream = new rxjs.Subject();
            /**
             * Strategy that will be used to handle scrolling while the select panel is open.
             */
            _this.scrollStrategy = _this.scrollStrategyFactory();
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
             * Event emitted when the select panel has been toggled.
             */
            _this.openedChange = new core.EventEmitter();
            /**
             * Event emitted when the select has been opened.
             */
            _this.openedStream = _this.openedChange.pipe(operators.filter(( /**
             * @param {?} o
             * @return {?}
             */function (o) { return o; })), operators.map(( /**
             * @return {?}
             */function () { })));
            /**
             * Event emitted when the select has been closed.
             */
            _this.closedStream = _this.openedChange.pipe(operators.filter(( /**
             * @param {?} o
             * @return {?}
             */function (o) { return !o; })), operators.map(( /**
             * @return {?}
             */function () { })));
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
            _this.backdropClass = 'cdk-overlay-transparent-backdrop';
            /**
             * Combined stream of all of the child options' change events.
             */
            _this.optionSelectionChanges = ( /** @type {?} */(rxjs.defer(( /**
             * @return {?}
             */function () {
                if (_this.options) {
                    return _this.options.changes.pipe(operators.startWith(_this.options), operators.switchMap(( /**
                     * @return {?}
                     */function () { return rxjs.merge.apply(void 0, __spread(_this.options.map(( /**
                     * @param {?} option
                     * @return {?}
                     */function (option) { return option.onSelectionChange; })))); })));
                }
                return _this.ngZone.onStable
                    .asObservable()
                    .pipe(operators.take(1), operators.switchMap(( /**
             * @return {?}
             */function () { return _this.optionSelectionChanges; })));
            }))));
            _this._required = false;
            _this._multiple = false;
            _this._autoSelect = true;
            _this._value = null;
            _this._hasBackdrop = false;
            _this._focused = false;
            _this.closeSubscription = rxjs.Subscription.EMPTY;
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
            _this.onChange = ( /**
             * @return {?}
             */function () { });
            /**
             * `View -> model callback called when select has been touched`
             */
            _this.onTouched = ( /**
             * @return {?}
             */function () { });
            /**
             * Comparison function to specify which option is displayed. Defaults to object equality.
             */
            _this._compareWith = ( /**
             * @param {?} o1
             * @param {?} o2
             * @return {?}
             */function (o1, o2) { return o1 === o2; });
            if (_this.ngControl) {
                // Note: we provide the value accessor through here, instead of
                // the `providers` to avoid running into a circular import.
                _this.ngControl.valueAccessor = _this;
            }
            // Force setter to be called in case id was not specified.
            _this.id = _this.id;
            return _this;
        }
        Object.defineProperty(McTreeSelect.prototype, "placeholder", {
            /**
             * @return {?}
             */
            get: function () {
                return this._placeholder;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._placeholder = value;
                this.stateChanges.next();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeSelect.prototype, "required", {
            /**
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
                this._required = coercion.coerceBooleanProperty(value);
                this.stateChanges.next();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeSelect.prototype, "multiple", {
            /**
             * @return {?}
             */
            get: function () {
                return this._multiple;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                if (this.selectionModel) {
                    throw core$1.getMcSelectDynamicMultipleError();
                }
                this._multiple = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeSelect.prototype, "autoSelect", {
            /**
             * @return {?}
             */
            get: function () {
                if (this.multiple) {
                    return false;
                }
                return this._autoSelect;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._autoSelect = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeSelect.prototype, "compareWith", {
            /**
             * Function to compare the option values with the selected values. The first argument
             * is a value from an option. The second is a value from the selection. A boolean
             * should be returned.
             * @return {?}
             */
            get: function () {
                return this._compareWith;
            },
            /**
             * @param {?} fn
             * @return {?}
             */
            set: function (fn) {
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
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeSelect.prototype, "value", {
            /**
             * @return {?}
             */
            get: function () {
                return this.multiple ? this.tree.getSelectedValues() : this.tree.getSelectedValues()[0];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeSelect.prototype, "id", {
            /**
             * @return {?}
             */
            get: function () {
                return this._id;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._id = value || this.uid;
                this.stateChanges.next();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeSelect.prototype, "hasBackdrop", {
            /**
             * @return {?}
             */
            get: function () {
                return this._hasBackdrop;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._hasBackdrop = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeSelect.prototype, "focused", {
            /**
             * Whether the select is focused.
             * @return {?}
             */
            get: function () {
                return this._focused || this._panelOpen;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._focused = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeSelect.prototype, "panelOpen", {
            /**
             * @return {?}
             */
            get: function () {
                return this._panelOpen;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeSelect.prototype, "canShowCleaner", {
            /**
             * @return {?}
             */
            get: function () {
                return this.cleaner && this.selectionModel.hasValue();
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @return {?}
         */
        McTreeSelect.prototype.ngOnInit = function () {
            var _this = this;
            this.stateChanges.next();
            // We need `distinctUntilChanged` here, because some browsers will
            // fire the animation end event twice for the same animation. See:
            // https://github.com/angular/angular/issues/24084
            this.panelDoneAnimatingStream
                .pipe(operators.distinctUntilChanged(), operators.takeUntil(this.destroy))
                .subscribe(( /**
         * @return {?}
         */function () {
                if (_this.panelOpen) {
                    _this.scrollTop = 0;
                    _this.openedChange.emit(true);
                }
                else {
                    _this.openedChange.emit(false);
                    _this.overlayDir.offsetX = 0;
                    _this.changeDetectorRef.markForCheck();
                }
            }));
        };
        /**
         * @return {?}
         */
        McTreeSelect.prototype.ngAfterContentInit = function () {
            var _this = this;
            if (!this.tree) {
                return;
            }
            if (this.mcValidation.useValidation) {
                core$1.setMosaicValidation(this);
            }
            this.tree.resetFocusedItemOnBlur = false;
            this.selectionModel = this.tree.selectionModel = new collections.SelectionModel(this.multiple);
            this.tree.ngAfterContentInit();
            this.initKeyManager();
            this.options = this.tree.renderedOptions;
            this.tree.autoSelect = this.autoSelect;
            if (this.tree.multipleMode === null) {
                this.tree.multipleMode = this.multiple ? core$1.MultipleMode.CHECKBOX : null;
            }
            if (this.multiple) {
                this.tree.noUnselectLast = false;
            }
            if (this.tempValues) {
                this.setSelectionByValue(this.tempValues);
                this.tempValues = null;
            }
            this.optionSelectionChanges
                .pipe(operators.takeUntil(this.destroy))
                .subscribe(( /**
         * @param {?} event
         * @return {?}
         */function (event) {
                if (!_this.multiple && _this.panelOpen && event.isUserInput) {
                    _this.close();
                }
            }));
            this.tree.selectionChange
                .pipe(operators.takeUntil(this.destroy))
                .subscribe(( /**
         * @param {?} event
         * @return {?}
         */function (event) {
                _this.onChange(_this.selectedValues);
                _this.selectionChange.emit(new McTreeSelectChange(_this, event.option));
            }));
            this.selectionModel.changed
                .pipe(operators.takeUntil(this.destroy))
                .subscribe(( /**
         * @param {?} event
         * @return {?}
         */function (event) {
                if (event.added.length) {
                    _this.tree.keyManager.setFocusOrigin('program');
                    _this.tree.keyManager.setActiveItem(( /** @type {?} */(_this.options.find(( /**
                     * @param {?} option
                     * @return {?}
                     */function (option) { return option.data === event.added[0]; })))));
                }
            }));
        };
        /**
         * @return {?}
         */
        McTreeSelect.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (!this.tree) {
                return;
            }
            this.tags.changes
                .subscribe(( /**
         * @return {?}
         */function () {
                setTimeout(( /**
                 * @return {?}
                 */function () { return _this.calculateHiddenItems(); }), 0);
            }));
            setTimeout(( /**
             * @return {?}
             */function () { return _this.calculateHiddenItems(); }), 0);
        };
        /**
         * @return {?}
         */
        McTreeSelect.prototype.ngDoCheck = function () {
            if (this.ngControl) {
                this.updateErrorState();
            }
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        McTreeSelect.prototype.ngOnChanges = function (changes) {
            // Updating the disabled state is handled by `mixinDisabled`, but we need to additionally let
            // the parent form field know to run change detection when the disabled state changes.
            if (changes.disabled) {
                this.stateChanges.next();
            }
        };
        /**
         * @return {?}
         */
        McTreeSelect.prototype.ngOnDestroy = function () {
            this.destroy.next();
            this.destroy.complete();
            this.stateChanges.complete();
            this.closeSubscription.unsubscribe();
        };
        /**
         * @param {?} hiddenItemsText
         * @param {?} hiddenItems
         * @return {?}
         */
        McTreeSelect.prototype.hiddenItemsTextFormatter = function (hiddenItemsText, hiddenItems) {
            return hiddenItemsText + " " + hiddenItems;
        };
        /**
         * @param {?} $event
         * @return {?}
         */
        McTreeSelect.prototype.clearValue = function ($event) {
            $event.stopPropagation();
            this.selectionModel.clear();
            this.tree.keyManager.setActiveItem(-1);
            this.setSelectionByValue([]);
            this.onChange(this.selectedValues);
        };
        /**
         * @return {?}
         */
        McTreeSelect.prototype.toggle = function () {
            if (this.panelOpen) {
                this.close();
            }
            else {
                this.open();
            }
        };
        /**
         * @return {?}
         */
        McTreeSelect.prototype.open = function () {
            var _this = this;
            if (this.disabled || !this.options || !this.options.length || this._panelOpen) {
                return;
            }
            this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
            // Note: The computed font-size will be a string pixel value (e.g. "16px").
            // `parseInt` ignores the trailing 'px' and converts this to a number.
            this.triggerFontSize = parseInt(getComputedStyle(this.trigger.nativeElement)['font-size']);
            this._panelOpen = true;
            setTimeout(( /**
             * @return {?}
             */function () { return _this.highlightCorrectOption(); }));
            this.changeDetectorRef.markForCheck();
            // Set the font size on the panel element once it exists.
            this.ngZone.onStable.asObservable()
                .pipe(operators.take(1))
                .subscribe(( /**
         * @return {?}
         */function () {
                if (_this.triggerFontSize && _this.overlayDir.overlayRef && _this.overlayDir.overlayRef.overlayElement) {
                    _this.overlayDir.overlayRef.overlayElement.style.fontSize = _this.triggerFontSize + "px";
                }
            }));
        };
        /**
         * Closes the overlay panel and focuses the host element.
         * @return {?}
         */
        McTreeSelect.prototype.close = function () {
            var _this = this;
            if (!this._panelOpen) {
                return;
            }
            this._panelOpen = false;
            this.changeDetectorRef.markForCheck();
            this.onTouched();
            setTimeout(( /**
             * @return {?}
             */function () { return _this.focus(); }), 0);
        };
        /**
         * Sets the select's value. Part of the ControlValueAccessor interface
         * required to integrate with Angular's core forms API.
         *
         * @param {?} value New value to be written to the model.
         * @return {?}
         */
        McTreeSelect.prototype.writeValue = function (value) {
            if (this.tree) {
                this.setSelectionByValue(value);
            }
            else {
                this.tempValues = value;
            }
        };
        /**
         * Saves a callback function to be invoked when the select's value
         * changes from user input. Part of the ControlValueAccessor interface
         * required to integrate with Angular's core forms API.
         *
         * @param {?} fn Callback to be triggered when the value changes.
         * @return {?}
         */
        McTreeSelect.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        /**
         * Saves a callback function to be invoked when the select is blurred
         * by the user. Part of the ControlValueAccessor interface required
         * to integrate with Angular's core forms API.
         *
         * @param {?} fn Callback to be triggered when the component has been touched.
         * @return {?}
         */
        McTreeSelect.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        /**
         * Disables the select. Part of the ControlValueAccessor interface required
         * to integrate with Angular's core forms API.
         *
         * @param {?} isDisabled Sets whether the component is disabled.
         * @return {?}
         */
        McTreeSelect.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
            this.changeDetectorRef.markForCheck();
            this.stateChanges.next();
        };
        Object.defineProperty(McTreeSelect.prototype, "selected", {
            /**
             * @return {?}
             */
            get: function () {
                return this.multiple ? this.selectionModel.selected : this.selectionModel.selected[0];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeSelect.prototype, "selectedValues", {
            /**
             * @return {?}
             */
            get: function () {
                var _this = this;
                /** @type {?} */
                var selectedValues = this.selectionModel.selected.map(( /**
                 * @param {?} value
                 * @return {?}
                 */function (value) { return _this.tree.treeControl.getValue(value); }));
                return this.multiple ? selectedValues : selectedValues[0];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeSelect.prototype, "triggerValue", {
            /**
             * @return {?}
             */
            get: function () {
                if (this.empty) {
                    return '';
                }
                return this.tree.treeControl.getViewValue(this.selected);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeSelect.prototype, "triggerValues", {
            /**
             * @return {?}
             */
            get: function () {
                var _this = this;
                if (this.empty) {
                    return [];
                }
                return this.selectedValues
                    .map(( /**
             * @param {?} value
             * @return {?}
             */function (value) { return _this.tree.renderedOptions.find(( /**
                 * @param {?} option
                 * @return {?}
                 */function (option) { return option.value === value; })); }))
                    .filter(( /**
             * @param {?} option
             * @return {?}
             */function (option) { return option; }));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeSelect.prototype, "empty", {
            /**
             * @return {?}
             */
            get: function () {
                return !this.selectionModel || this.selectionModel.isEmpty();
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @return {?}
         */
        McTreeSelect.prototype.isRtl = function () {
            return this.dir ? this.dir.value === 'rtl' : false;
        };
        /**
         * @param {?} event
         * @return {?}
         */
        McTreeSelect.prototype.handleKeydown = function (event) {
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
         * @return {?}
         */
        McTreeSelect.prototype.onFocus = function () {
            if (!this.disabled) {
                this._focused = true;
                this.stateChanges.next();
            }
        };
        /**
         * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
         * "blur" to the panel when it opens, causing a false positive.
         * @return {?}
         */
        McTreeSelect.prototype.onBlur = function () {
            this._focused = false;
            if (!this.disabled && !this.panelOpen) {
                this.onTouched();
                this.changeDetectorRef.markForCheck();
                this.stateChanges.next();
            }
        };
        /**
         * Callback that is invoked when the overlay panel has been attached.
         * @return {?}
         */
        McTreeSelect.prototype.onAttached = function () {
            var _this = this;
            this.overlayDir.positionChange
                .pipe(operators.take(1))
                .subscribe(( /**
         * @return {?}
         */function () {
                _this.changeDetectorRef.detectChanges();
                _this.calculateOverlayOffsetX();
                _this.panel.nativeElement.scrollTop = _this.scrollTop;
                _this.tree.updateScrollSize();
            }));
            this.closeSubscription = this.closingActions()
                .subscribe(( /**
         * @return {?}
         */function () { return _this.close(); }));
        };
        /**
         * Returns the theme to be used on the panel.
         * @return {?}
         */
        McTreeSelect.prototype.getPanelTheme = function () {
            return this.parentFormField ? "mc-" + this.parentFormField.color : '';
        };
        /**
         * @return {?}
         */
        McTreeSelect.prototype.focus = function () {
            this.elementRef.nativeElement.focus();
        };
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        McTreeSelect.prototype.onContainerClick = function () {
            this.focus();
        };
        /**
         * Invoked when an option is clicked.
         * @param {?} selectedOption
         * @param {?} $event
         * @return {?}
         */
        McTreeSelect.prototype.onRemoveSelectedOption = function (selectedOption, $event) {
            var _this = this;
            $event.stopPropagation();
            this.selectionModel
                .deselect(this.selected.find(( /**
         * @param {?} value
         * @return {?}
         */function (value) { return _this.tree.treeControl.getValue(value) === selectedOption.value; })));
            this.onChange(this.selectedValues);
        };
        /**
         * @return {?}
         */
        McTreeSelect.prototype.calculateHiddenItems = function () {
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
            this.tags.forEach(( /**
             * @param {?} tag
             * @return {?}
             */function (tag) {
                if (tag.nativeElement.offsetTop < tag.nativeElement.offsetHeight) {
                    totalVisibleItemsWidth += _this.getItemWidth(tag.nativeElement);
                    visibleItems++;
                }
            }));
            this.hiddenItems = this.selectionModel.selected.length - visibleItems;
            if (this.hiddenItems) {
                /** @type {?} */
                var itemsCounter = this.trigger.nativeElement.querySelector('.mc-tree-select__match-hidden-text');
                /** @type {?} */
                var matcherList = this.trigger.nativeElement.querySelector('.mc-tree-select__match-list');
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
                    this.changeDetectorRef.markForCheck();
                    return;
                }
                else if (!itemsCounterShowed && (totalItemsWidth + itemsCounterWidth) > matcherWidth) {
                    this.hiddenItems++;
                }
            }
            this.changeDetectorRef.markForCheck();
        };
        /**
         * @private
         * @return {?}
         */
        McTreeSelect.prototype.closingActions = function () {
            /** @type {?} */
            var backdrop = ( /** @type {?} */(this.overlayDir.overlayRef)).backdropClick();
            /** @type {?} */
            var outsidePointerEvents = ( /** @type {?} */(this.overlayDir.overlayRef)).outsidePointerEvents();
            /** @type {?} */
            var detachments = ( /** @type {?} */(this.overlayDir.overlayRef)).detachments();
            return rxjs.merge(backdrop, outsidePointerEvents, detachments);
        };
        /**
         * @private
         * @return {?}
         */
        McTreeSelect.prototype.getTotalItemsWidthInMatcher = function () {
            var _this = this;
            /** @type {?} */
            var triggerClone = this.trigger.nativeElement.cloneNode(true);
            triggerClone.querySelector('.mc-tree-select__match-hidden-text').remove();
            this.renderer.setStyle(triggerClone, 'position', 'absolute');
            this.renderer.setStyle(triggerClone, 'visibility', 'hidden');
            this.renderer.setStyle(triggerClone, 'top', '-100%');
            this.renderer.setStyle(triggerClone, 'left', '0');
            this.renderer.appendChild(this.trigger.nativeElement, triggerClone);
            /** @type {?} */
            var totalItemsWidth = 0;
            triggerClone.querySelectorAll('mc-tag').forEach(( /**
             * @param {?} item
             * @return {?}
             */function (item) {
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
        McTreeSelect.prototype.getItemWidth = function (element) {
            /** @type {?} */
            var computedStyle = window.getComputedStyle(element);
            /** @type {?} */
            var width = parseInt(( /** @type {?} */(computedStyle.width)));
            /** @type {?} */
            var marginLeft = parseInt(( /** @type {?} */(computedStyle.marginLeft)));
            /** @type {?} */
            var marginRight = parseInt(( /** @type {?} */(computedStyle.marginRight)));
            return width + marginLeft + marginRight;
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        McTreeSelect.prototype.handleClosedKeydown = function (event) {
            // tslint:disable-next-line: deprecation
            /** @type {?} */
            var keyCode = event.keyCode;
            /** @type {?} */
            var isArrowKey = keyCode === keycodes.DOWN_ARROW || keyCode === keycodes.UP_ARROW ||
                keyCode === keycodes.LEFT_ARROW || keyCode === keycodes.RIGHT_ARROW;
            /** @type {?} */
            var isOpenKey = keyCode === keycodes.ENTER || keyCode === keycodes.SPACE;
            // Open the select on ALT + arrow key to match the native <select>
            if (isOpenKey || ((this.multiple || event.altKey) && isArrowKey)) {
                // prevents the page from scrolling down when pressing space
                event.preventDefault();
                this.open();
            }
            else if (!this.multiple && this.tree.keyManager && this.tree.keyManager.onKeydown) {
                this.tree.keyManager.onKeydown(event);
            }
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        McTreeSelect.prototype.handleOpenKeydown = function (event) {
            /* tslint:disable-next-line */
            /** @type {?} */
            var keyCode = event.keyCode;
            /** @type {?} */
            var isArrowKey = keyCode === keycodes.DOWN_ARROW || keyCode === keycodes.UP_ARROW;
            if (isArrowKey && event.altKey) {
                // Close the select on ALT + arrow key to match the native <select>
                event.preventDefault();
                this.close();
            }
            else if (keyCode === keycodes.LEFT_ARROW || keyCode === keycodes.RIGHT_ARROW) {
                return this.originalOnKeyDown.call(this.tree, event);
            }
            else if (keyCode === keycodes.HOME) {
                event.preventDefault();
                this.tree.keyManager.setFirstItemActive();
            }
            else if (keyCode === keycodes.END) {
                event.preventDefault();
                this.tree.keyManager.setLastItemActive();
            }
            else if (keyCode === keycodes.PAGE_UP) {
                event.preventDefault();
                this.tree.keyManager.setPreviousPageItemActive();
            }
            else if (keyCode === keycodes.PAGE_DOWN) {
                event.preventDefault();
                this.tree.keyManager.setNextPageItemActive();
            }
            else if ((keyCode === keycodes.ENTER || keyCode === keycodes.SPACE) && this.tree.keyManager.activeItem) {
                event.preventDefault();
                if (!this.autoSelect) {
                    this.selectionModel.toggle(this.tree.keyManager.activeItem.data);
                }
                else {
                    this.close();
                }
            }
            else if (this.multiple && keyCode === keycodes.A && event.ctrlKey) {
                event.preventDefault();
                /** @type {?} */
                var hasDeselectedOptions_1 = this.options.some(( /**
                 * @param {?} option
                 * @return {?}
                 */function (option) { return !option.selected; }));
                this.options.forEach(( /**
                 * @param {?} option
                 * @return {?}
                 */function (option) {
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
                var previouslyFocusedIndex = this.tree.keyManager.activeItemIndex;
                this.tree.keyManager.setFocusOrigin('keyboard');
                this.tree.keyManager.onKeydown(event);
                if (this.multiple && isArrowKey && event.shiftKey && this.tree.keyManager.activeItem &&
                    this.tree.keyManager.activeItemIndex !== previouslyFocusedIndex) {
                    this.tree.keyManager.activeItem.selectViaInteraction(event);
                }
                if (this.autoSelect && this.tree.keyManager.activeItem) {
                    this.tree.setSelectedOptionsByKey(this.tree.keyManager.activeItem, keycodes.hasModifierKey(event, 'shiftKey'), keycodes.hasModifierKey(event, 'ctrlKey'));
                }
            }
        };
        /**
         * @private
         * @return {?}
         */
        McTreeSelect.prototype.initializeSelection = function () {
            var _this = this;
            // Defer setting the value in order to avoid the "Expression
            // has changed after it was checked" errors from Angular.
            Promise.resolve().then(( /**
             * @return {?}
             */function () {
                _this.setSelectionByValue(_this.ngControl ? _this.ngControl.value : _this._value);
            }));
        };
        /**
         * Sets the selected option based on a value. If no option can be
         * found with the designated value, the select trigger is cleared.
         * @private
         * @param {?} value
         * @return {?}
         */
        McTreeSelect.prototype.setSelectionByValue = function (value) {
            if (this.multiple && value) {
                if (!Array.isArray(value)) {
                    throw core$1.getMcSelectNonArrayValueError();
                }
                this.tree.setOptionsFromValues(value);
                this.sortValues();
            }
            else {
                this.tree.setOptionsFromValues([value]);
            }
            this.changeDetectorRef.detectChanges();
        };
        /**
         * @private
         * @return {?}
         */
        McTreeSelect.prototype.initKeyManager = function () {
            var _this = this;
            this.originalOnKeyDown = this.tree.onKeyDown;
            this.tree.onKeyDown = ( /**
             * @return {?}
             */function () { });
            this.tree.keyManager.tabOut
                .pipe(operators.takeUntil(this.destroy))
                .subscribe(( /**
         * @return {?}
         */function () {
                // Restore focus to the trigger before closing. Ensures that the focus
                // position won't be lost if the user got focus into the overlay.
                _this.focus();
                _this.close();
            }));
            this.tree.keyManager.change
                .pipe(operators.takeUntil(this.destroy))
                .subscribe(( /**
         * @return {?}
         */function () {
                if (_this._panelOpen && _this.panel) {
                    _this.scrollActiveOptionIntoView();
                }
                else if (!_this._panelOpen && !_this.multiple && _this.tree.keyManager.activeItem) {
                    _this.tree.keyManager.activeItem.selectViaInteraction();
                }
            }));
        };
        /**
         * Sorts the selected values in the selected based on their order in the panel.
         * @private
         * @return {?}
         */
        McTreeSelect.prototype.sortValues = function () {
            var _this = this;
            if (this.multiple) {
                /** @type {?} */
                var options_1 = this.options.toArray();
                this.selectionModel.sort(( /**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */function (a, b) {
                    return _this.sortComparator ? _this.sortComparator(a, b, options_1) :
                        options_1.indexOf(a) - options_1.indexOf(b);
                }));
                this.stateChanges.next();
            }
        };
        /**
         * Highlights the selected item. If no option is selected, it will highlight
         * the first item instead.
         * @private
         * @return {?}
         */
        McTreeSelect.prototype.highlightCorrectOption = function () {
            if (this.empty || !this.tree.keyManager) {
                return;
            }
            /** @type {?} */
            var firstSelectedValue = this.multiple ? this.selectedValues[0] : this.selectedValues;
            /** @type {?} */
            var selectedOption = this.options.find(( /**
             * @param {?} option
             * @return {?}
             */function (option) { return option.value === firstSelectedValue; }));
            if (selectedOption) {
                this.tree.keyManager.setActiveItem(selectedOption);
            }
        };
        /**
         * Scrolls the active option into view.
         * @private
         * @return {?}
         */
        McTreeSelect.prototype.scrollActiveOptionIntoView = function () {
            /** @type {?} */
            var activeOptionIndex = this.tree.keyManager.activeItemIndex || 0;
            this.panel.nativeElement.scrollTop = core$1.getOptionScrollPosition(activeOptionIndex, this.tree.getItemHeight(), this.panel.nativeElement.scrollTop, core$1.SELECT_PANEL_MAX_HEIGHT);
        };
        /**
         * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text when
         * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
         * can't be calculated until the panel has been attached, because we need to know the
         * content width in order to constrain the panel within the viewport.
         * @private
         * @return {?}
         */
        McTreeSelect.prototype.calculateOverlayOffsetX = function () {
            /** @type {?} */
            var overlayRect = this.overlayDir.overlayRef.overlayElement.getBoundingClientRect();
            /** @type {?} */
            var viewportSize = this.viewportRuler.getViewportSize();
            /** @type {?} */
            var isRtl = this.isRtl();
            /* tslint:disable-next-line:no-magic-numbers */
            /** @type {?} */
            var paddingWidth = core$1.SELECT_PANEL_PADDING_X * 2;
            /** @type {?} */
            var offsetX = core$1.SELECT_PANEL_PADDING_X;
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
        return McTreeSelect;
    }(McTreeSelectMixinBase));
    McTreeSelect.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-tree-select',
                    exportAs: 'mcTreeSelect',
                    template: "<div cdk-overlay-origin\n     class=\"mc-tree-select__trigger\"\n     [class.mc-tree-select__trigger_multiple]=\"multiple\"\n     #origin=\"cdkOverlayOrigin\"\n     #trigger>\n    <div class=\"mc-tree-select__matcher\" [ngSwitch]=\"empty\">\n        <span class=\"mc-tree-select__placeholder\" *ngSwitchCase=\"true\">{{ placeholder || '\\u00A0' }}</span>\n        <span *ngSwitchCase=\"false\" [ngSwitch]=\"!!customTrigger\">\n            <div *ngSwitchDefault [ngSwitch]=\"multiple\" class=\"mc-tree-select__match-container\">\n                <span *ngSwitchCase=\"false\" class=\"mc-tree-select__matcher-text\">{{ triggerValue }}</span>\n                <div *ngSwitchCase=\"true\" class=\"mc-tree-select__multiple-matcher\">\n                    <div class=\"mc-tree-select__match-list\">\n                        <mc-tag *ngFor=\"let option of triggerValues\"\n                            [selectable]=\"false\"\n                            [disabled]=\"option.disabled || disabled\"\n                            [class.mc-error]=\"errorState\">\n\n                            {{ option.viewValue }}\n                            <i mc-icon=\"mc-close-S_16\"\n                               *ngIf=\"!option.disabled && !disabled\"\n                               (click)=\"onRemoveSelectedOption(option, $event)\">\n                            </i>\n                        </mc-tag>\n                    </div>\n                    <div class=\"mc-tree-select__match-hidden-text\"\n                         [style.display]=\"hiddenItems > 0 ? 'block' : 'none'\"\n                         #hiddenItemsCounter>\n                        {{ hiddenItemsTextFormatter(hiddenItemsText, hiddenItems) }}\n                    </div>\n                </div>\n            </div>\n            <ng-content select=\"mc-tree-select-trigger\" *ngSwitchCase=\"true\"></ng-content>\n        </span>\n    </div>\n\n    <div class=\"mc-select__cleaner\" *ngIf=\"canShowCleaner\" (click)=\"clearValue($event)\">\n        <ng-content select=\"mc-cleaner\"></ng-content>\n    </div>\n\n    <div class=\"mc-tree-select__arrow-wrapper\">\n        <i class=\"mc-tree-select__arrow\" mc-icon=\"mc-angle-down-L_16\"></i>\n    </div>\n</div>\n\n<ng-template\n    cdk-connected-overlay\n    cdkConnectedOverlayLockPosition\n    [cdkConnectedOverlayHasBackdrop]=\"hasBackdrop\"\n    [cdkConnectedOverlayBackdropClass]=\"backdropClass\"\n    [cdkConnectedOverlayScrollStrategy]=\"scrollStrategy\"\n    [cdkConnectedOverlayOrigin]=\"origin\"\n    [cdkConnectedOverlayOpen]=\"panelOpen\"\n    [cdkConnectedOverlayPositions]=\"positions\"\n    [cdkConnectedOverlayMinWidth]=\"triggerRect?.width\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    (backdropClick)=\"close()\"\n    (attach)=\"onAttached()\"\n    (detach)=\"close()\">\n\n    <div #panel\n         class=\"mc-tree-select__panel {{ getPanelTheme() }}\"\n         [ngClass]=\"panelClass\"\n         [style.transformOrigin]=\"transformOrigin\"\n         [style.font-size.px]=\"triggerFontSize\"\n         (keydown)=\"handleKeydown($event)\">\n\n        <div #optionsContainer\n             class=\"mc-tree-select__content\"\n             [@fadeInContent]=\"'showing'\"\n             (@fadeInContent.done)=\"panelDoneAnimatingStream.next($event.toState)\">\n            <ng-content select=\"mc-tree-selection\"></ng-content>\n        </div>\n    </div>\n</ng-template>\n",
                    inputs: ['disabled', 'tabIndex'],
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'mc-tree-select',
                        '[class.mc-disabled]': 'disabled',
                        '[class.mc-invalid]': 'errorState',
                        '[attr.id]': 'id',
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.disabled]': 'disabled || null',
                        '(click)': 'toggle()',
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
                        { provide: formField.McFormFieldControl, useExisting: McTreeSelect },
                        { provide: tree.CdkTree, useExisting: McTreeSelect }
                    ],
                    styles: [".mc-option{-webkit-tap-highlight-color:transparent;align-items:center;border:var(--mc-option-size-border-width,2px) solid transparent;box-sizing:border-box;cursor:pointer;display:flex;flex-direction:row;height:var(--mc-option-size-height,32px);max-width:100%;outline:none;padding:var(--mc-option-size-padding,0 16px);position:relative}.mc-option.mc-disabled{cursor:default}.mc-option .mc-pseudo-checkbox{margin-right:8px}.mc-option .mc-option-overlay{border-radius:inherit;bottom:calc(var(--mc-option-size-border-width, 2px)*-1);left:calc(var(--mc-option-size-border-width, 2px)*-1);pointer-events:none;position:absolute;right:calc(var(--mc-option-size-border-width, 2px)*-1);top:calc(var(--mc-option-size-border-width, 2px)*-1)}.mc-option-text{display:inline-block;flex-grow:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mc-tree-select{box-sizing:border-box;display:inline-block;outline:none;vertical-align:top;width:100%}.mc-tree-select.mc-disabled .mc-tree-select__trigger{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;cursor:default;user-select:none}.mc-tree-select__trigger{box-sizing:border-box;cursor:pointer;display:flex;height:var(--mc-select-size-height,30px);padding-left:calc(var(--mc-select-size-left-padding, 16px) - var(--mc-form-field-size-border-width, 1px));padding-right:calc(var(--mc-select-size-right-padding, 8px) - var(--mc-form-field-size-border-width, 1px));position:relative}.mc-tree-select__trigger.mc-tree-select__trigger_multiple{padding-left:calc(var(--mc-select-size-left-padding-multiple, 8px) - var(--mc-form-field-size-border-width, 1px))}.mc-tree-select__trigger.mc-tree-select__trigger_multiple .mc-tree-select__placeholder{margin-left:8px}.mc-tree-select__trigger.mc-tree-select__trigger_multiple .mc-tag.mc-disabled .mc-tag__text{margin-right:7px}.mc-tree-select__matcher{align-items:center;display:flex;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%}.mc-tree-select__matcher>span{width:100%}.mc-tree-select__multiple-matcher{display:flex;width:100%}.mc-tree-select__match-list{display:flex;flex-wrap:wrap;max-height:var(--mc-select-size-height,30px)-var(--mc-select-panel-size-border-width,1px);overflow:hidden}.mc-tree-select__match-list .mc-tag{margin-right:4px}.mc-tree-select__match-container{display:flex;flex-direction:row;justify-content:space-between;width:100%}.mc-tree-select__match-container .mc-tree-select__match-hidden-text{-ms-grid-row-align:center;align-self:center;flex:0 0 70px;padding:0 8px;text-align:right}.mc-tree-select__match-item{border:1px solid transparent;border-radius:3px;display:flex;margin-right:4px;max-width:100%;padding-left:7px}.mc-tree-select__arrow-wrapper{-ms-grid-row-align:center;align-self:center}.mc-form-field-appearance-fill .mc-tree-select__arrow-wrapper,.mc-form-field-appearance-standard .mc-tree-select__arrow-wrapper{transform:translateY(-50%)}.mc-form-field-appearance-outline .mc-tree-select__arrow-wrapper{transform:translateY(-25%)}.mc-tree-select__panel{border-bottom-left-radius:var(--mc-select-panel-size-border-radius,3px);border-bottom-right-radius:var(--mc-select-panel-size-border-radius,3px);border-style:solid;border-width:var(--mc-select-panel-size-border-width,1px);max-height:var(--mc-select-panel-size-max-height,232px);min-width:100%;overflow:auto;padding:4px 0}.mc-tree-select__panel .mc-optgroup-label,.mc-tree-select__panel .mc-tree-select-option{font-size:inherit;height:var(--mc-option-size-height,32px);line-height:var(--mc-option-size-height,32px)}.mc-tree-select__content,.mc-tree-select__content .mc-tree-selection{height:100%}.mc-form-field-type-mc-select:not(.mc-disabled) .mc-form-field-flex{cursor:pointer}"]
                }] }
    ];
    /** @nocollapse */
    McTreeSelect.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef },
        { type: overlay.ViewportRuler },
        { type: core.NgZone },
        { type: core.Renderer2 },
        { type: core$1.ErrorStateMatcher },
        { type: undefined, decorators: [{ type: core.Inject, args: [core$1.MC_SELECT_SCROLL_STRATEGY,] }] },
        { type: Array, decorators: [{ type: core.Optional }, { type: core.Inject, args: [forms.NG_VALIDATORS,] }] },
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [core$1.MC_VALIDATION,] }] },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
        { type: forms.NgForm, decorators: [{ type: core.Optional }] },
        { type: forms.FormGroupDirective, decorators: [{ type: core.Optional }] },
        { type: formField.McFormField, decorators: [{ type: core.Optional }] },
        { type: forms.NgControl, decorators: [{ type: core.Optional }, { type: core.Self }] },
        { type: forms.NgModel, decorators: [{ type: core.Optional }, { type: core.Self }] },
        { type: forms.FormControlName, decorators: [{ type: core.Optional }, { type: core.Self }] }
    ]; };
    McTreeSelect.propDecorators = {
        trigger: [{ type: core.ViewChild, args: ['trigger', { static: false },] }],
        panel: [{ type: core.ViewChild, args: ['panel', { static: false },] }],
        overlayDir: [{ type: core.ViewChild, args: [overlay.CdkConnectedOverlay, { static: false },] }],
        hiddenItemsCounter: [{ type: core.ViewChild, args: ['hiddenItemsCounter', { static: false },] }],
        tags: [{ type: core.ViewChildren, args: [tags.McTag,] }],
        cleaner: [{ type: core.ContentChild, args: ['mcSelectCleaner', { static: true },] }],
        customTrigger: [{ type: core.ContentChild, args: [McTreeSelectTrigger, { static: false },] }],
        tree: [{ type: core.ContentChild, args: [tree$1.McTreeSelection, { static: false },] }],
        hiddenItemsText: [{ type: core.Input }],
        openedChange: [{ type: core.Output }],
        openedStream: [{ type: core.Output, args: ['opened',] }],
        closedStream: [{ type: core.Output, args: ['closed',] }],
        selectionChange: [{ type: core.Output }],
        valueChange: [{ type: core.Output }],
        panelClass: [{ type: core.Input }],
        backdropClass: [{ type: core.Input }],
        errorStateMatcher: [{ type: core.Input }],
        sortComparator: [{ type: core.Input }],
        placeholder: [{ type: core.Input }],
        required: [{ type: core.Input }],
        multiple: [{ type: core.Input }],
        autoSelect: [{ type: core.Input }],
        compareWith: [{ type: core.Input }],
        id: [{ type: core.Input }],
        hasBackdrop: [{ type: core.Input }],
        hiddenItemsTextFormatter: [{ type: core.Input }]
    };
    if (false) {
        /**
         * A name for this control that can be used by `mc-form-field`.
         * @type {?}
         */
        McTreeSelect.prototype.controlType;
        /** @type {?} */
        McTreeSelect.prototype.hiddenItems;
        /**
         * The last measured value for the trigger's client bounding rect.
         * @type {?}
         */
        McTreeSelect.prototype.triggerRect;
        /**
         * The cached font-size of the trigger element.
         * @type {?}
         */
        McTreeSelect.prototype.triggerFontSize;
        /**
         * Deals with the selection logic.
         * @type {?}
         */
        McTreeSelect.prototype.selectionModel;
        /**
         * The value of the select panel's transform-origin property.
         * @type {?}
         */
        McTreeSelect.prototype.transformOrigin;
        /**
         * Emits when the panel element is finished transforming in.
         * @type {?}
         */
        McTreeSelect.prototype.panelDoneAnimatingStream;
        /**
         * Strategy that will be used to handle scrolling while the select panel is open.
         * @type {?}
         */
        McTreeSelect.prototype.scrollStrategy;
        /**
         * The y-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text.
         * when the panel opens. Will change based on the y-position of the selected option.
         * @type {?}
         */
        McTreeSelect.prototype.offsetY;
        /**
         * This position config ensures that the top "start" corner of the overlay
         * is aligned with with the top "start" of the origin by default (overlapping
         * the trigger completely). If the panel cannot fit below the trigger, it
         * will fall back to a position above the trigger.
         * @type {?}
         */
        McTreeSelect.prototype.positions;
        /** @type {?} */
        McTreeSelect.prototype.options;
        /** @type {?} */
        McTreeSelect.prototype.trigger;
        /** @type {?} */
        McTreeSelect.prototype.panel;
        /** @type {?} */
        McTreeSelect.prototype.overlayDir;
        /** @type {?} */
        McTreeSelect.prototype.hiddenItemsCounter;
        /** @type {?} */
        McTreeSelect.prototype.tags;
        /** @type {?} */
        McTreeSelect.prototype.cleaner;
        /**
         * User-supplied override of the trigger element.
         * @type {?}
         */
        McTreeSelect.prototype.customTrigger;
        /** @type {?} */
        McTreeSelect.prototype.tree;
        /** @type {?} */
        McTreeSelect.prototype.hiddenItemsText;
        /**
         * Event emitted when the select panel has been toggled.
         * @type {?}
         */
        McTreeSelect.prototype.openedChange;
        /**
         * Event emitted when the select has been opened.
         * @type {?}
         */
        McTreeSelect.prototype.openedStream;
        /**
         * Event emitted when the select has been closed.
         * @type {?}
         */
        McTreeSelect.prototype.closedStream;
        /**
         * Event emitted when the selected value has been changed by the user.
         * @type {?}
         */
        McTreeSelect.prototype.selectionChange;
        /**
         * Event that emits whenever the raw value of the select changes. This is here primarily
         * to facilitate the two-way binding for the `value` input.
         * \@docs-private
         * @type {?}
         */
        McTreeSelect.prototype.valueChange;
        /**
         * Classes to be passed to the select panel. Supports the same syntax as `ngClass`.
         * @type {?}
         */
        McTreeSelect.prototype.panelClass;
        /** @type {?} */
        McTreeSelect.prototype.backdropClass;
        /**
         * Object used to control when error messages are shown.
         * @type {?}
         */
        McTreeSelect.prototype.errorStateMatcher;
        /**
         * Function used to sort the values in a select in multiple mode.
         * Follows the same logic as `Array.prototype.sort`.
         * @type {?}
         */
        McTreeSelect.prototype.sortComparator;
        /**
         * Combined stream of all of the child options' change events.
         * @type {?}
         */
        McTreeSelect.prototype.optionSelectionChanges;
        /**
         * @type {?}
         * @private
         */
        McTreeSelect.prototype._placeholder;
        /**
         * @type {?}
         * @private
         */
        McTreeSelect.prototype._required;
        /**
         * @type {?}
         * @private
         */
        McTreeSelect.prototype._multiple;
        /**
         * @type {?}
         * @private
         */
        McTreeSelect.prototype._autoSelect;
        /**
         * @type {?}
         * @private
         */
        McTreeSelect.prototype._value;
        /**
         * @type {?}
         * @private
         */
        McTreeSelect.prototype._id;
        /**
         * @type {?}
         * @private
         */
        McTreeSelect.prototype._hasBackdrop;
        /**
         * @type {?}
         * @private
         */
        McTreeSelect.prototype._focused;
        /**
         * @type {?}
         * @private
         */
        McTreeSelect.prototype.closeSubscription;
        /**
         * @type {?}
         * @private
         */
        McTreeSelect.prototype._panelOpen;
        /**
         * @type {?}
         * @private
         */
        McTreeSelect.prototype.originalOnKeyDown;
        /**
         * The scroll position of the overlay panel, calculated to center the selected option.
         * @type {?}
         * @private
         */
        McTreeSelect.prototype.scrollTop;
        /**
         * Unique id for this input.
         * @type {?}
         * @private
         */
        McTreeSelect.prototype.uid;
        /**
         * Emits whenever the component is destroyed.
         * @type {?}
         * @private
         */
        McTreeSelect.prototype.destroy;
        /**
         * @type {?}
         * @private
         */
        McTreeSelect.prototype.tempValues;
        /**
         * `View -> model callback called when value changes`
         * @type {?}
         */
        McTreeSelect.prototype.onChange;
        /**
         * `View -> model callback called when select has been touched`
         * @type {?}
         */
        McTreeSelect.prototype.onTouched;
        /**
         * Comparison function to specify which option is displayed. Defaults to object equality.
         * @type {?}
         * @private
         */
        McTreeSelect.prototype._compareWith;
        /** @type {?} */
        McTreeSelect.prototype.changeDetectorRef;
        /**
         * @type {?}
         * @private
         */
        McTreeSelect.prototype.viewportRuler;
        /**
         * @type {?}
         * @private
         */
        McTreeSelect.prototype.ngZone;
        /**
         * @type {?}
         * @private
         */
        McTreeSelect.prototype.renderer;
        /**
         * @type {?}
         * @private
         */
        McTreeSelect.prototype.scrollStrategyFactory;
        /** @type {?} */
        McTreeSelect.prototype.rawValidators;
        /**
         * @type {?}
         * @private
         */
        McTreeSelect.prototype.mcValidation;
        /**
         * @type {?}
         * @private
         */
        McTreeSelect.prototype.dir;
        /**
         * @type {?}
         * @private
         */
        McTreeSelect.prototype.parentFormField;
        /** @type {?} */
        McTreeSelect.prototype.ngModel;
        /** @type {?} */
        McTreeSelect.prototype.formControlName;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: tree-select.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McTreeSelectModule = /** @class */ (function () {
        function McTreeSelectModule() {
        }
        return McTreeSelectModule;
    }());
    McTreeSelectModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        overlay.OverlayModule,
                        tree.CdkTreeModule,
                        tree$1.McTreeModule,
                        icon.McIconModule,
                        tags.McTagsModule,
                        core$1.McPseudoCheckboxModule
                    ],
                    exports: [McTreeSelect, McTreeSelectTrigger, common.CommonModule],
                    declarations: [McTreeSelect, McTreeSelectTrigger],
                    providers: [core$1.MC_SELECT_SCROLL_STRATEGY_PROVIDER]
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
     * Generated from: ptsecurity-mosaic-tree-select.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.McTreeSelect = McTreeSelect;
    exports.McTreeSelectChange = McTreeSelectChange;
    exports.McTreeSelectModule = McTreeSelectModule;
    exports.McTreeSelectTrigger = McTreeSelectTrigger;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-tree-select.umd.js.map
