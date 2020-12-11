(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/overlay'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/core'), require('@ptsecurity/mosaic/form-field'), require('@ptsecurity/mosaic/icon'), require('@ptsecurity/mosaic/tags'), require('@angular/cdk/bidi'), require('@angular/cdk/coercion'), require('@angular/cdk/collections'), require('@angular/forms'), require('@ptsecurity/cdk/a11y'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/mosaic/input'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/select', ['exports', '@angular/cdk/overlay', '@angular/common', '@angular/core', '@ptsecurity/mosaic/core', '@ptsecurity/mosaic/form-field', '@ptsecurity/mosaic/icon', '@ptsecurity/mosaic/tags', '@angular/cdk/bidi', '@angular/cdk/coercion', '@angular/cdk/collections', '@angular/forms', '@ptsecurity/cdk/a11y', '@ptsecurity/cdk/keycodes', '@ptsecurity/mosaic/input', 'rxjs', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.select = {}), global.ng.cdk.overlay, global.ng.common, global.ng.core, global.ptsecurity.mosaic.core, global.ptsecurity.mosaic['form-field'], global.ptsecurity.mosaic.icon, global.ptsecurity.mosaic.tags, global.ng.cdk.bidi, global.ng.cdk.coercion, global.ng.cdk.collections, global.ng.forms, global.a11y, global.keycodes, global.ptsecurity.mosaic.input, global.rxjs, global.rxjs.operators));
}(this, (function (exports, overlay, common, core, core$1, formField, icon, tags, bidi, coercion, collections, forms, a11y, keycodes, input, rxjs, operators) { 'use strict';

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
    var McSelectChange = /** @class */ (function () {
        /**
         * @param {?} source
         * @param {?} value
         */
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
    var McSelectSearch = /** @class */ (function () {
        /**
         * @param {?} formField
         */
        function McSelectSearch(formField) {
            this.searchChangesSubscription = new rxjs.Subscription();
            this.isSearchChanged = false;
            formField.canCleanerClearByEsc = false;
        }
        /**
         * @return {?}
         */
        McSelectSearch.prototype.focus = function () {
            this.input.focus();
        };
        /**
         * @return {?}
         */
        McSelectSearch.prototype.reset = function () {
            this.input.ngControl.reset();
        };
        /**
         * @return {?}
         */
        McSelectSearch.prototype.ngAfterContentInit = function () {
            var _this = this;
            if (!this.input) {
                throw Error('McSelectSearch does not work without mcInput');
            }
            if (!this.input.ngControl) {
                throw Error('McSelectSearch does not work without ngControl');
            }
            Promise.resolve().then(( /**
             * @return {?}
             */function () {
                _this.searchChangesSubscription = ( /** @type {?} */(_this.input.ngControl.valueChanges)).subscribe(( /**
                 * @return {?}
                 */function () {
                    _this.isSearchChanged = true;
                }));
            }));
        };
        /**
         * @return {?}
         */
        McSelectSearch.prototype.ngOnDestroy = function () {
            this.searchChangesSubscription.unsubscribe();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        McSelectSearch.prototype.handleKeydown = function (event) {
            // tslint:disable-next-line:deprecation
            if (event.keyCode === keycodes.ESCAPE) {
                if (this.input.value) {
                    this.reset();
                    event.stopPropagation();
                }
            }
            // tslint:disable-next-line:deprecation
            if ([keycodes.SPACE, keycodes.HOME, keycodes.END].includes(event.keyCode)) {
                event.stopPropagation();
            }
        };
        return McSelectSearch;
    }());
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
        return McSelectSearchEmptyResult;
    }());
    McSelectSearchEmptyResult.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mc-select-search-empty-result]',
                    exportAs: 'mcSelectSearchEmptyResult'
                },] }
    ];
    var McSelectTrigger = /** @class */ (function () {
        function McSelectTrigger() {
        }
        return McSelectTrigger;
    }());
    McSelectTrigger.decorators = [
        { type: core.Directive, args: [{ selector: 'mc-select-trigger' },] }
    ];
    var McSelectBase = /** @class */ (function () {
        /**
         * @param {?} elementRef
         * @param {?} defaultErrorStateMatcher
         * @param {?} parentForm
         * @param {?} parentFormGroup
         * @param {?} ngControl
         */
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
    var McSelect = /** @class */ (function (_super) {
        __extends(McSelect, _super);
        /**
         * @param {?} _changeDetectorRef
         * @param {?} _ngZone
         * @param {?} _renderer
         * @param {?} defaultErrorStateMatcher
         * @param {?} elementRef
         * @param {?} rawValidators
         * @param {?} _dir
         * @param {?} parentForm
         * @param {?} parentFormGroup
         * @param {?} _parentFormField
         * @param {?} ngControl
         * @param {?} ngModel
         * @param {?} formControlName
         * @param {?} _scrollStrategyFactory
         * @param {?} mcValidation
         */
        function McSelect(_changeDetectorRef, _ngZone, _renderer, defaultErrorStateMatcher, elementRef, rawValidators, _dir, parentForm, parentFormGroup, _parentFormField, ngControl, ngModel, formControlName, _scrollStrategyFactory, mcValidation) {
            var _this = _super.call(this, elementRef, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) || this;
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
            _this.backdropClass = 'cdk-overlay-transparent-backdrop';
            /**
             * Combined stream of all of the child options' change events.
             */
            _this.optionSelectionChanges = ( /** @type {?} */(rxjs.defer(( /**
             * @return {?}
             */function () {
                if (_this.options) {
                    return rxjs.merge.apply(void 0, __spread(_this.options.map(( /**
                     * @param {?} option
                     * @return {?}
                     */function (option) { return option.onSelectionChange; })), _this.selectionModel.selected.map(( /**
                     * @param {?} option
                     * @return {?}
                     */function (option) { return option.onSelectionChange; }))));
                }
                return _this._ngZone.onStable
                    .asObservable()
                    .pipe(operators.take(1), operators.switchMap(( /**
             * @return {?}
             */function () { return _this.optionSelectionChanges; })));
            }))));
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
            _this._hasBackdrop = false;
            _this._required = false;
            _this._multiple = false;
            _this._focused = false;
            _this._panelOpen = false;
            _this.closeSubscription = rxjs.Subscription.EMPTY;
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
        Object.defineProperty(McSelect.prototype, "hasBackdrop", {
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
        Object.defineProperty(McSelect.prototype, "placeholder", {
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
        Object.defineProperty(McSelect.prototype, "required", {
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
        Object.defineProperty(McSelect.prototype, "multiple", {
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
        Object.defineProperty(McSelect.prototype, "compareWith", {
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
        Object.defineProperty(McSelect.prototype, "value", {
            /**
             * Value of the select control.
             * @return {?}
             */
            get: function () {
                return this._value;
            },
            /**
             * @param {?} newValue
             * @return {?}
             */
            set: function (newValue) {
                if (newValue !== this._value) {
                    this.writeValue(newValue);
                    this._value = newValue;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "id", {
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
        Object.defineProperty(McSelect.prototype, "focused", {
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
        Object.defineProperty(McSelect.prototype, "panelOpen", {
            /**
             * @return {?}
             */
            get: function () {
                return this._panelOpen;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "isEmptySearchResult", {
            /**
             * @return {?}
             */
            get: function () {
                return this.search && this.options.length === 0 && !!this.search.input.value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "canShowCleaner", {
            /**
             * @return {?}
             */
            get: function () {
                return this.cleaner && this.selectionModel.hasValue();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "selected", {
            /**
             * @return {?}
             */
            get: function () {
                return this.multiple ? this.selectionModel.selected : this.selectionModel.selected[0];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "triggerValue", {
            /**
             * @return {?}
             */
            get: function () {
                if (this.empty) {
                    return '';
                }
                return this.selectionModel.selected[0].viewValue;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "triggerValues", {
            /**
             * @return {?}
             */
            get: function () {
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
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "empty", {
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
        McSelect.prototype.ngOnInit = function () {
            var _this = this;
            this.selectionModel = new collections.SelectionModel(this.multiple);
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
                    if (_this.search) {
                        _this.search.focus();
                    }
                    _this.openedChange.emit(true);
                }
                else {
                    _this.openedChange.emit(false);
                    _this._changeDetectorRef.markForCheck();
                }
            }));
        };
        /**
         * @return {?}
         */
        McSelect.prototype.ngAfterContentInit = function () {
            var _this = this;
            if (this.mcValidation.useValidation) {
                core$1.setMosaicValidation(this);
            }
            this.initKeyManager();
            this.selectionModel.changed
                .pipe(operators.takeUntil(this.destroy))
                .subscribe(( /**
         * @param {?} event
         * @return {?}
         */function (event) {
                event.added.forEach(( /**
                 * @param {?} option
                 * @return {?}
                 */function (option) { return option.select(); }));
                event.removed.forEach(( /**
                 * @param {?} option
                 * @return {?}
                 */function (option) { return option.deselect(); }));
            }));
            this.options.changes
                .pipe(operators.startWith(null), operators.takeUntil(this.destroy))
                .subscribe(( /**
         * @return {?}
         */function () {
                _this.resetOptions();
                _this.initializeSelection();
            }));
        };
        /**
         * @return {?}
         */
        McSelect.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.tags.changes
                .subscribe(( /**
         * @return {?}
         */function () {
                setTimeout(( /**
                 * @return {?}
                 */function () { return _this.calculateHiddenItems(); }), 0);
            }));
        };
        /**
         * @return {?}
         */
        McSelect.prototype.ngDoCheck = function () {
            if (this.ngControl) {
                this.updateErrorState();
            }
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        McSelect.prototype.ngOnChanges = function (changes) {
            // Updating the disabled state is handled by `mixinDisabled`, but we need to additionally let
            // the parent form field know to run change detection when the disabled state changes.
            if (changes.disabled) {
                this.stateChanges.next();
            }
        };
        /**
         * @return {?}
         */
        McSelect.prototype.ngOnDestroy = function () {
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
        McSelect.prototype.hiddenItemsTextFormatter = function (hiddenItemsText, hiddenItems) {
            return hiddenItemsText + " " + hiddenItems;
        };
        /**
         * @param {?} $event
         * @return {?}
         */
        McSelect.prototype.clearValue = function ($event) {
            $event.stopPropagation();
            this.selectionModel.clear();
            this.keyManager.setActiveItem(-1);
            this.propagateChanges();
        };
        /**
         * @return {?}
         */
        McSelect.prototype.resetSearch = function () {
            if (!this.search) {
                return;
            }
            this.search.reset();
            /*
            todo the incorrect behaviour of keyManager is possible here
            to avoid first item selection (to provide correct options flipping on closed select)
            we should process options update like it is the first options appearance
            */
            this.search.isSearchChanged = false;
        };
        /**
         * Toggles the overlay panel open or closed.
         * @return {?}
         */
        McSelect.prototype.toggle = function () {
            if (this.panelOpen) {
                this.close();
            }
            else {
                this.open();
            }
        };
        /**
         * Opens the overlay panel.
         * @return {?}
         */
        McSelect.prototype.open = function () {
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
                .subscribe(( /**
         * @return {?}
         */function () {
                _this.scrollActiveOptionIntoView();
                if (_this.triggerFontSize && _this.overlayDir.overlayRef && _this.overlayDir.overlayRef.overlayElement) {
                    _this.overlayDir.overlayRef.overlayElement.style.fontSize = _this.triggerFontSize + "px";
                }
            }));
        };
        /**
         * Closes the overlay panel and focuses the host element.
         * @return {?}
         */
        McSelect.prototype.close = function () {
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
         * @param {?} value New value to be written to the model.
         * @return {?}
         */
        McSelect.prototype.writeValue = function (value) {
            if (this.options) {
                this.setSelectionByValue(value);
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
        McSelect.prototype.registerOnChange = function (fn) {
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
        McSelect.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        /**
         * Disables the select. Part of the ControlValueAccessor interface required
         * to integrate with Angular's core forms API.
         *
         * @param {?} isDisabled Sets whether the component is disabled.
         * @return {?}
         */
        McSelect.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
            this._changeDetectorRef.markForCheck();
            this.stateChanges.next();
        };
        /**
         * @return {?}
         */
        McSelect.prototype.isRtl = function () {
            return this._dir ? this._dir.value === 'rtl' : false;
        };
        /**
         * @param {?} event
         * @return {?}
         */
        McSelect.prototype.handleKeydown = function (event) {
            if (this.disabled) {
                return;
            }
            if (this.panelOpen) {
                this.handleOpenKeydown(event);
            }
            else {
                this.handleClosedKeydown(event);
            }
        };
        /**
         * @return {?}
         */
        McSelect.prototype.onFocus = function () {
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
        McSelect.prototype.onBlur = function () {
            this._focused = false;
            if (!this.disabled && !this.panelOpen) {
                this.onTouched();
                this._changeDetectorRef.markForCheck();
                this.stateChanges.next();
            }
        };
        /**
         * Callback that is invoked when the overlay panel has been attached.
         * @return {?}
         */
        McSelect.prototype.onAttached = function () {
            var _this = this;
            this.overlayDir.positionChange
                .pipe(operators.take(1))
                .subscribe(( /**
         * @return {?}
         */function () {
                _this._changeDetectorRef.detectChanges();
                _this.setOverlayPosition();
                _this.optionsContainer.nativeElement.scrollTop = _this.scrollTop;
                _this.updateScrollSize();
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
        McSelect.prototype.getPanelTheme = function () {
            return this._parentFormField ? "mc-" + this._parentFormField.color : '';
        };
        /**
         * Focuses the select element.
         * @return {?}
         */
        McSelect.prototype.focus = function () {
            this.elementRef.nativeElement.focus();
        };
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        McSelect.prototype.onContainerClick = function () {
            this.focus();
            this.open();
        };
        /**
         * Invoked when an option is clicked.
         * @param {?} option
         * @param {?} $event
         * @return {?}
         */
        McSelect.prototype.onRemoveMatcherItem = function (option, $event) {
            $event.stopPropagation();
            option.deselect();
        };
        /**
         * @return {?}
         */
        McSelect.prototype.calculateHiddenItems = function () {
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
            this.hiddenItems = (( /** @type {?} */(this.selected))).length - visibleItems;
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
        McSelect.prototype.getItemHeight = function () {
            return this.options.first ? this.options.first.getHeight() : 0;
        };
        /**
         * @private
         * @return {?}
         */
        McSelect.prototype.closingActions = function () {
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
        McSelect.prototype.getHeightOfOptionsContainer = function () {
            return this.optionsContainer.nativeElement.getClientRects()[0].height;
        };
        /**
         * @private
         * @return {?}
         */
        McSelect.prototype.updateScrollSize = function () {
            if (!this.options.first) {
                return;
            }
            this.keyManager.withScrollSize(Math.floor(this.getHeightOfOptionsContainer() / this.options.first.getHeight()));
        };
        /**
         * @private
         * @return {?}
         */
        McSelect.prototype.getTotalItemsWidthInMatcher = function () {
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
        McSelect.prototype.getItemWidth = function (element) {
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
         * Handles keyboard events while the select is closed.
         * @private
         * @param {?} event
         * @return {?}
         */
        McSelect.prototype.handleClosedKeydown = function (event) {
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
        /**
         * Handles keyboard events when the selected is open.
         * @private
         * @param {?} event
         * @return {?}
         */
        McSelect.prototype.handleOpenKeydown = function (event) {
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
            else if (keyCode === keycodes.HOME) {
                event.preventDefault();
                this.keyManager.setFirstItemActive();
            }
            else if (keyCode === keycodes.END) {
                event.preventDefault();
                this.keyManager.setLastItemActive();
            }
            else if (keyCode === keycodes.PAGE_UP) {
                event.preventDefault();
                this.keyManager.setPreviousPageItemActive();
            }
            else if (keyCode === keycodes.PAGE_DOWN) {
                event.preventDefault();
                this.keyManager.setNextPageItemActive();
            }
            else if ((keyCode === keycodes.ENTER || keyCode === keycodes.SPACE) && this.keyManager.activeItem) {
                event.preventDefault();
                this.keyManager.activeItem.selectViaInteraction();
            }
            else if (this._multiple && keyCode === keycodes.A && event.ctrlKey) {
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
                var previouslyFocusedIndex = this.keyManager.activeItemIndex;
                this.keyManager.onKeydown(event);
                if (this._multiple && isArrowKey && event.shiftKey && this.keyManager.activeItem &&
                    this.keyManager.activeItemIndex !== previouslyFocusedIndex) {
                    this.keyManager.activeItem.selectViaInteraction();
                }
                if (this.search) {
                    this.search.focus();
                }
            }
        };
        /**
         * @private
         * @return {?}
         */
        McSelect.prototype.initializeSelection = function () {
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
        McSelect.prototype.setSelectionByValue = function (value) {
            var _this = this;
            this.previousSelectionModelSelected = this.selectionModel.selected;
            if (this.multiple && value) {
                if (!Array.isArray(value)) {
                    throw core$1.getMcSelectNonArrayValueError();
                }
                this.selectionModel.clear();
                value.forEach(( /**
                 * @param {?} currentValue
                 * @return {?}
                 */function (currentValue) { return _this.selectValue(currentValue); }));
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
        McSelect.prototype.getCorrespondOption = function (value) {
            var _this = this;
            return __spread(this.options.toArray(), this.previousSelectionModelSelected).find(( /**
             * @param {?} option
             * @return {?}
             */function (option) {
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
         * @private
         * @param {?} value
         * @return {?} Option that has the corresponding value.
         */
        McSelect.prototype.selectValue = function (value) {
            /** @type {?} */
            var correspondingOption = this.getCorrespondOption(value);
            if (correspondingOption) {
                this.selectionModel.select(correspondingOption);
            }
            return correspondingOption;
        };
        /**
         * Sets up a key manager to listen to keyboard events on the overlay panel.
         * @private
         * @return {?}
         */
        McSelect.prototype.initKeyManager = function () {
            var _this = this;
            /** @type {?} */
            var typeAheadDebounce = 200;
            this.keyManager = new a11y.ActiveDescendantKeyManager(this.options)
                .withTypeAhead(typeAheadDebounce, this.search ? -1 : 0)
                .withVerticalOrientation()
                .withHorizontalOrientation(this.isRtl() ? 'rtl' : 'ltr');
            this.keyManager.tabOut
                .pipe(operators.takeUntil(this.destroy))
                .subscribe(( /**
         * @return {?}
         */function () {
                // Restore focus to the trigger before closing. Ensures that the focus
                // position won't be lost if the user got focus into the overlay.
                _this.focus();
                _this.close();
            }));
            this.keyManager.change
                .pipe(operators.takeUntil(this.destroy))
                .subscribe(( /**
         * @return {?}
         */function () {
                if (_this._panelOpen && _this.panel) {
                    _this.scrollActiveOptionIntoView();
                }
                else if (!_this._panelOpen && !_this.multiple && _this.keyManager.activeItem) {
                    _this.keyManager.activeItem.selectViaInteraction();
                }
            }));
        };
        /**
         * Drops current option subscriptions and IDs and resets from scratch.
         * @private
         * @return {?}
         */
        McSelect.prototype.resetOptions = function () {
            var _this = this;
            /** @type {?} */
            var changedOrDestroyed = rxjs.merge(this.options.changes, this.destroy);
            this.optionSelectionChanges
                .pipe(operators.takeUntil(changedOrDestroyed))
                .subscribe(( /**
         * @param {?} event
         * @return {?}
         */function (event) {
                _this.onSelect(event.source, event.isUserInput);
                if (_this.search && _this.search.isSearchChanged) {
                    Promise.resolve().then(( /**
                     * @return {?}
                     */function () { return _this.keyManager.updateActiveItem(0); }));
                    _this.search.isSearchChanged = false;
                }
                if (event.isUserInput && !_this.multiple && _this._panelOpen) {
                    _this.close();
                    _this.focus();
                }
            }));
            // Listen to changes in the internal state of the options and react accordingly.
            // Handles cases like the labels of the selected options changing.
            rxjs.merge.apply(void 0, __spread(this.options.map(( /**
             * @param {?} option
             * @return {?}
             */function (option) { return option.stateChanges; })))).pipe(operators.takeUntil(changedOrDestroyed))
                .subscribe(( /**
         * @return {?}
         */function () {
                _this._changeDetectorRef.markForCheck();
                _this.stateChanges.next();
            }));
        };
        /**
         * Invoked when an option is clicked.
         * @private
         * @param {?} option
         * @param {?} isUserInput
         * @return {?}
         */
        McSelect.prototype.onSelect = function (option, isUserInput) {
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
        /**
         * Sorts the selected values in the selected based on their order in the panel.
         * @private
         * @return {?}
         */
        McSelect.prototype.sortValues = function () {
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
         * Emits change event to set the model value.
         * @private
         * @param {?=} fallbackValue
         * @return {?}
         */
        McSelect.prototype.propagateChanges = function (fallbackValue) {
            /** @type {?} */
            var valueToEmit = null;
            if (this.multiple) {
                valueToEmit = (( /** @type {?} */(this.selected))).map(( /**
                 * @param {?} option
                 * @return {?}
                 */function (option) { return option.value; }));
            }
            else {
                valueToEmit = this.selected ? (( /** @type {?} */(this.selected))).value : fallbackValue;
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
         * @private
         * @return {?}
         */
        McSelect.prototype.highlightCorrectOption = function () {
            if (this.keyManager) {
                if (this.empty) {
                    this.keyManager.setFirstItemActive();
                }
                else {
                    this.keyManager.setActiveItem(this.selectionModel.selected[0]);
                }
            }
        };
        /**
         * Scrolls the active option into view.
         * @private
         * @return {?}
         */
        McSelect.prototype.scrollActiveOptionIntoView = function () {
            if (!this.keyManager.activeItem) {
                return;
            }
            this.keyManager.activeItem.focus();
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
        McSelect.prototype.setOverlayPosition = function () {
            var _a;
            this.resetOverlay();
            /** @type {?} */
            var overlayRect = this.getOverlayRect();
            // Window width without scrollbar
            /** @type {?} */
            var windowWidth = this.getOverlayWidth();
            /** @type {?} */
            var isRtl = this.isRtl();
            /* tslint:disable-next-line:no-magic-numbers */
            /** @type {?} */
            var paddingWidth = core$1.SELECT_PANEL_PADDING_X * 2;
            /** @type {?} */
            var offsetX;
            /** @type {?} */
            var overlayMaxWidth;
            /** @type {?} */
            var selected = this.selectionModel.selected[0] || this.options.first;
            offsetX = selected && selected.group ? core$1.SELECT_PANEL_INDENT_PADDING_X : core$1.SELECT_PANEL_PADDING_X;
            // Invert the offset in LTR.
            if (!isRtl) {
                offsetX *= -1;
            }
            // Determine if select overflows on either side.
            /** @type {?} */
            var leftOverflow = 0 - (overlayRect.left + offsetX - (isRtl ? paddingWidth : 0));
            /** @type {?} */
            var rightOverflow = overlayRect.right + offsetX - windowWidth
                + (isRtl ? 0 : paddingWidth);
            // If the element overflows on either side, reduce the offset to allow it to fit.
            if (leftOverflow > 0 || rightOverflow > 0) {
                _a = __read(this.calculateOverlayXPosition(overlayRect, windowWidth, offsetX), 2), offsetX = _a[0], overlayMaxWidth = _a[1];
                this.overlayDir.overlayRef.overlayElement.style.maxWidth = overlayMaxWidth + "px";
            }
            // Set the offset directly in order to avoid having to go through change detection and
            // potentially triggering "changed after it was checked" errors. Round the value to avoid
            // blurry content in some browsers.
            this.overlayDir.offsetX = Math.round(offsetX);
            this.overlayDir.overlayRef.updatePosition();
        };
        /**
         * @private
         * @param {?} overlayRect
         * @param {?} windowWidth
         * @param {?} basicOffsetX
         * @return {?}
         */
        McSelect.prototype.calculateOverlayXPosition = function (overlayRect, windowWidth, basicOffsetX) {
            /** @type {?} */
            var offsetX = basicOffsetX;
            /** @type {?} */
            var leftIndent = this.triggerRect.left;
            /** @type {?} */
            var rightIndent = windowWidth - this.triggerRect.right;
            // Setting direction of dropdown expansion
            /** @type {?} */
            var isRightDirection = leftIndent <= rightIndent;
            /** @type {?} */
            var maxDropdownWidth;
            /** @type {?} */
            var overlayMaxWidth;
            /** @type {?} */
            var triggerWidth = this.triggerRect.width + core$1.SELECT_PANEL_INDENT_PADDING_X;
            if (isRightDirection) {
                maxDropdownWidth = rightIndent + triggerWidth - core$1.SELECT_PANEL_VIEWPORT_PADDING;
                overlayMaxWidth = overlayRect.width < maxDropdownWidth ? overlayRect.width : maxDropdownWidth;
            }
            else {
                /** @type {?} */
                var leftOffset = void 0;
                maxDropdownWidth = leftIndent + triggerWidth - core$1.SELECT_PANEL_VIEWPORT_PADDING;
                if (overlayRect.width < maxDropdownWidth) {
                    overlayMaxWidth = overlayRect.width;
                    leftOffset = this.triggerRect.right - overlayMaxWidth;
                }
                else {
                    overlayMaxWidth = maxDropdownWidth;
                    leftOffset = this.triggerRect.right - (overlayMaxWidth - core$1.SELECT_PANEL_INDENT_PADDING_X);
                }
                offsetX -= this.triggerRect.left - leftOffset;
            }
            return [offsetX, overlayMaxWidth];
        };
        /**
         * @private
         * @return {?}
         */
        McSelect.prototype.resetOverlay = function () {
            this.overlayDir.offsetX = 0;
            this.overlayDir.overlayRef.overlayElement.style.maxWidth = 'unset';
            this.overlayDir.overlayRef.updatePosition();
        };
        /**
         * @private
         * @return {?}
         */
        McSelect.prototype.getOverlayRect = function () {
            return this.overlayDir.overlayRef.overlayElement.getBoundingClientRect();
        };
        /**
         * @private
         * @return {?}
         */
        McSelect.prototype.getOverlayWidth = function () {
            return this.scrollStrategy._overlayRef.hostElement.clientWidth;
        };
        return McSelect;
    }(McSelectMixinBase));
    McSelect.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-select',
                    exportAs: 'mcSelect',
                    template: "<div cdk-overlay-origin\n     class=\"mc-select__trigger\"\n     (click)=\"toggle()\"\n     [class.mc-select__trigger_multiple]=\"multiple\"\n     #origin=\"cdkOverlayOrigin\"\n     #trigger>\n    <div class=\"mc-select__matcher\" [ngSwitch]=\"empty\">\n        <span class=\"mc-select__placeholder\" *ngSwitchCase=\"true\">{{ placeholder || '\\u00A0' }}</span>\n        <span *ngSwitchCase=\"false\" [ngSwitch]=\"!!customTrigger\">\n            <div *ngSwitchDefault [ngSwitch]=\"multiple\" class=\"mc-select__match-container\">\n                <span *ngSwitchCase=\"false\" class=\"mc-select__matcher-text\">{{ triggerValue }}</span>\n                <div *ngSwitchCase=\"true\" class=\"mc-select__match-list\">\n                    <mc-tag *ngFor=\"let option of triggerValues\"\n                            [disabled]=\"option.disabled || disabled\"\n                            [selectable]=\"false\"\n                            [class.mc-error]=\"errorState\">\n                        {{ option.viewValue }}\n                        <i mc-icon=\"mc-close-S_16\"\n                           *ngIf=\"!option.disabled && !disabled\"\n                           (click)=\"onRemoveMatcherItem(option, $event)\">\n                        </i>\n                    </mc-tag>\n                </div>\n                <div class=\"mc-select__match-hidden-text\" [style.display]=\"hiddenItems > 0 ? 'block' : 'none'\">\n                    {{ hiddenItemsTextFormatter(hiddenItemsText, hiddenItems) }}\n                </div>\n            </div>\n            <ng-content select=\"mc-select-trigger\" *ngSwitchCase=\"true\"></ng-content>\n        </span>\n    </div>\n\n    <div class=\"mc-select__cleaner\" *ngIf=\"canShowCleaner\" (click)=\"clearValue($event)\">\n        <ng-content select=\"mc-cleaner\"></ng-content>\n    </div>\n\n    <div class=\"mc-select__arrow-wrapper\">\n        <i class=\"mc-select__arrow\" mc-icon=\"mc-angle-down-L_16\"></i>\n    </div>\n</div>\n\n<ng-template\n    cdk-connected-overlay\n    cdkConnectedOverlayLockPosition\n    [cdkConnectedOverlayHasBackdrop]=\"hasBackdrop\"\n    [cdkConnectedOverlayBackdropClass]=\"backdropClass\"\n    [cdkConnectedOverlayScrollStrategy]=\"scrollStrategy\"\n    [cdkConnectedOverlayOrigin]=\"origin\"\n    [cdkConnectedOverlayOpen]=\"panelOpen\"\n    [cdkConnectedOverlayPositions]=\"positions\"\n    [cdkConnectedOverlayMinWidth]=\"triggerRect?.width\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    (backdropClick)=\"close()\"\n    (attach)=\"onAttached()\"\n    (detach)=\"close()\">\n    <div\n        #panel\n        class=\"mc-select__panel {{ getPanelTheme() }}\"\n        [ngClass]=\"panelClass\"\n        [style.transformOrigin]=\"transformOrigin\"\n        [style.font-size.px]=\"triggerFontSize\"\n        (keydown)=\"handleKeydown($event)\">\n\n        <div *ngIf=\"search\" class=\"mc-select__search-container\">\n            <ng-content select=\"[mcSelectSearch]\"></ng-content>\n        </div>\n\n        <div #optionsContainer\n             class=\"mc-select__content\"\n             [@fadeInContent]=\"'showing'\"\n             (@fadeInContent.done)=\"panelDoneAnimatingStream.next($event.toState)\">\n\n            <div *ngIf=\"isEmptySearchResult\" class=\"mc-select__no-options-message\">\n                <ng-content select=\"[mc-select-search-empty-result]\"></ng-content>\n            </div>\n            <ng-content></ng-content>\n        </div>\n    </div>\n</ng-template>\n",
                    inputs: ['disabled', 'tabIndex'],
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    host: {
                        '[attr.id]': 'id',
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.disabled]': 'disabled || null',
                        class: 'mc-select',
                        '[class.mc-disabled]': 'disabled',
                        '[class.mc-invalid]': 'errorState',
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
                    styles: [".mc-divider{border-top-style:solid;border-top-width:1px;display:block;margin:0}.mc-divider.mc-divider_vertical{border-right-style:solid;border-right-width:1px;border-top:0}.mc-divider.mc-divider_inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:80px}.mc-select{box-sizing:border-box;display:inline-block;outline:none;vertical-align:top;width:100%}.mc-select .mc-select__trigger{box-sizing:border-box;cursor:pointer;display:flex;height:30px;padding-left:15px;padding-right:7px;position:relative}.mc-select .mc-select__trigger.mc-select__trigger_multiple{padding-left:7px}.mc-select .mc-select__trigger.mc-select__trigger_multiple .mc-tag.mc-disabled .mc-tag__text{margin-right:7px}.mc-select.mc-disabled .mc-select__trigger{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;cursor:default;user-select:none}.mc-select__no-options-message{align-items:center;box-sizing:border-box;cursor:default;display:flex;flex-direction:row;height:32px;max-width:100%;outline:none;padding:0 16px;position:relative}.mc-select__matcher{align-items:center;display:flex;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%}.mc-select__matcher>span{width:100%}.mc-select__match-list{display:flex;flex-wrap:wrap;margin:0;max-height:28px;overflow:hidden;padding-left:0}.mc-select__match-list .mc-tag{margin-right:4px}.mc-select__match-container{display:flex;flex-direction:row;justify-content:space-between;width:100%}.mc-select__match-container .mc-select__match-hidden-text{-ms-grid-row-align:center;align-self:center;flex:0 0 70px;padding:0 8px;text-align:right}.mc-select__match-item{border:1px solid transparent;border-radius:3px;display:flex;margin-right:4px;max-width:100%;padding-left:7px}.mc-select__arrow-wrapper{-ms-grid-row-align:center;align-self:center}.mc-form-field-appearance-fill .mc-select__arrow-wrapper,.mc-form-field-appearance-standard .mc-select__arrow-wrapper{transform:translateY(-50%)}.mc-form-field-appearance-outline .mc-select__arrow-wrapper{transform:translateY(-25%)}.mc-select__panel{border-bottom-left-radius:3px;border-bottom-right-radius:3px;border-style:solid;border-width:1px;max-width:640px;min-width:100%;overflow:hidden}.mc-select__panel .mc-optgroup-label,.mc-select__panel .mc-option{font-size:inherit;height:32px;line-height:32px}.mc-select__content{max-height:232px;overflow:auto;padding:4px 0}.mc-select__content .cdk-virtual-scroll-viewport{max-height:224px;min-height:224px}.mc-form-field-type-mc-select:not(.mc-disabled) .mc-form-field-flex{cursor:pointer}.mc-form-field-type-mc-select .mc-form-field-label{width:calc(100% - 18px)}.mc-select__search-container{border-bottom-style:solid;border-bottom-width:1px}"]
                }] }
    ];
    /** @nocollapse */
    McSelect.ctorParameters = function () { return [
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
        backdropClass: [{ type: core.Input }],
        errorStateMatcher: [{ type: core.Input }],
        sortComparator: [{ type: core.Input }],
        openedChange: [{ type: core.Output }],
        openedStream: [{ type: core.Output, args: ['opened',] }],
        closedStream: [{ type: core.Output, args: ['closed',] }],
        selectionChange: [{ type: core.Output }],
        valueChange: [{ type: core.Output }],
        hasBackdrop: [{ type: core.Input }],
        placeholder: [{ type: core.Input }],
        required: [{ type: core.Input }],
        multiple: [{ type: core.Input }],
        compareWith: [{ type: core.Input }],
        value: [{ type: core.Input }],
        id: [{ type: core.Input }],
        hiddenItemsTextFormatter: [{ type: core.Input }]
    };
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
        /** @type {?} */
        McSelect.prototype.backdropClass;
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
        McSelect.prototype._hasBackdrop;
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
         * @type {?}
         * @private
         */
        McSelect.prototype.closeSubscription;
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McSelectModule = /** @class */ (function () {
        function McSelectModule() {
        }
        return McSelectModule;
    }());
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
     * Generated from: ptsecurity-mosaic-select.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

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
