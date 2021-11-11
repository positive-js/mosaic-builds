(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/overlay'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/core'), require('@ptsecurity/mosaic/form-field'), require('@ptsecurity/mosaic/icon'), require('@ptsecurity/mosaic/tags'), require('@angular/cdk/coercion'), require('@angular/cdk/collections'), require('@angular/forms'), require('@ptsecurity/cdk/a11y'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/mosaic/input'), require('rxjs'), require('rxjs/operators'), require('@angular/cdk/bidi')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/select', ['exports', '@angular/cdk/overlay', '@angular/common', '@angular/core', '@ptsecurity/mosaic/core', '@ptsecurity/mosaic/form-field', '@ptsecurity/mosaic/icon', '@ptsecurity/mosaic/tags', '@angular/cdk/coercion', '@angular/cdk/collections', '@angular/forms', '@ptsecurity/cdk/a11y', '@ptsecurity/cdk/keycodes', '@ptsecurity/mosaic/input', 'rxjs', 'rxjs/operators', '@angular/cdk/bidi'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.select = {}), global.ng.cdk.overlay, global.ng.common, global.ng.core, global.ptsecurity.mosaic.core, global.ptsecurity.mosaic['form-field'], global.ptsecurity.mosaic.icon, global.ptsecurity.mosaic.tags, global.ng.cdk.coercion, global.ng.cdk.collections, global.ng.forms, global.mc.cdk.a11y, global.mc.cdk.keycodes, global.ptsecurity.mosaic.input, global.rxjs, global.rxjs.operators, global.ng.cdk.bidi));
}(this, (function (exports, i7, i8, i0, i2, i1, i6, i5, coercion, collections, i4, a11y, keycodes, input, rxjs, operators, i3) { 'use strict';

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

    var i7__namespace = /*#__PURE__*/_interopNamespace(i7);
    var i8__namespace = /*#__PURE__*/_interopNamespace(i8);
    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i6__namespace = /*#__PURE__*/_interopNamespace(i6);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);

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

    var nextUniqueId = 0;
    /** Change event object that is emitted when the select value has changed. */
    var McSelectChange = /** @class */ (function () {
        function McSelectChange(source, value) {
            this.source = source;
            this.value = value;
        }
        return McSelectChange;
    }());
    var McSelectSearch = /** @class */ (function () {
        function McSelectSearch(formField) {
            this.searchChangesSubscription = new rxjs.Subscription();
            this.isSearchChanged = false;
            formField.canCleanerClearByEsc = false;
        }
        McSelectSearch.prototype.focus = function () {
            this.input.focus();
        };
        McSelectSearch.prototype.reset = function () {
            this.input.ngControl.reset();
        };
        McSelectSearch.prototype.ngAfterContentInit = function () {
            var _this = this;
            if (!this.input) {
                throw Error('McSelectSearch does not work without mcInput');
            }
            if (!this.input.ngControl) {
                throw Error('McSelectSearch does not work without ngControl');
            }
            Promise.resolve().then(function () {
                _this.searchChangesSubscription = _this.input.ngControl.valueChanges.subscribe(function () {
                    _this.isSearchChanged = true;
                });
            });
        };
        McSelectSearch.prototype.ngOnDestroy = function () {
            this.searchChangesSubscription.unsubscribe();
        };
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
    /** @nocollapse */ McSelectSearch.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McSelectSearch, deps: [{ token: i1__namespace.McFormField }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McSelectSearch.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McSelectSearch, selector: "[mcSelectSearch]", host: { listeners: { "keydown": "handleKeydown($event)" } }, queries: [{ propertyName: "input", first: true, predicate: input.McInput, descendants: true }], exportAs: ["mcSelectSearch"], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McSelectSearch, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[mcSelectSearch]',
                        exportAs: 'mcSelectSearch',
                        host: {
                            '(keydown)': 'handleKeydown($event)'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.McFormField }]; }, propDecorators: { input: [{
                    type: i0.ContentChild,
                    args: [input.McInput, { static: false }]
                }] } });
    var McSelectSearchEmptyResult = /** @class */ (function () {
        function McSelectSearchEmptyResult() {
        }
        return McSelectSearchEmptyResult;
    }());
    /** @nocollapse */ McSelectSearchEmptyResult.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McSelectSearchEmptyResult, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McSelectSearchEmptyResult.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McSelectSearchEmptyResult, selector: "[mc-select-search-empty-result]", exportAs: ["mcSelectSearchEmptyResult"], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McSelectSearchEmptyResult, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[mc-select-search-empty-result]',
                        exportAs: 'mcSelectSearchEmptyResult'
                    }]
            }] });
    var McSelectTrigger = /** @class */ (function () {
        function McSelectTrigger() {
        }
        return McSelectTrigger;
    }());
    /** @nocollapse */ McSelectTrigger.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McSelectTrigger, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McSelectTrigger.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McSelectTrigger, selector: "mc-select-trigger", ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McSelectTrigger, decorators: [{
                type: i0.Directive,
                args: [{ selector: 'mc-select-trigger' }]
            }] });
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
    // tslint:disable-next-line:naming-convention
    var McSelectMixinBase = i2.mixinTabIndex(i2.mixinDisabled(i2.mixinErrorState(McSelectBase)));
    var McSelect = /** @class */ (function (_super) {
        __extends(McSelect, _super);
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
            /** A name for this control that can be used by `mc-form-field`. */
            _this.controlType = 'select';
            _this.hiddenItems = 0;
            /** The cached font-size of the trigger element. */
            _this.triggerFontSize = 0;
            _this.previousSelectionModelSelected = [];
            /** The value of the select panel's transform-origin property. */
            _this.transformOrigin = 'top';
            /** Emits when the panel element is finished transforming in. */
            _this.panelDoneAnimatingStream = new rxjs.Subject();
            /** Strategy that will be used to handle scrolling while the select panel is open. */
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
            /** Combined stream of all of the child options' change events. */
            _this.optionSelectionChanges = rxjs.defer(function () {
                if (_this.options) {
                    return rxjs.merge.apply(void 0, __spreadArray(__spreadArray([], __read(_this.options.map(function (option) { return option.onSelectionChange; }))), __read(_this.selectionModel.selected.map(function (option) { return option.onSelectionChange; }))));
                }
                return _this._ngZone.onStable
                    .asObservable()
                    .pipe(operators.take(1), operators.switchMap(function () { return _this.optionSelectionChanges; }));
            });
            /** Event emitted when the select panel has been toggled. */
            _this.openedChange = new i0.EventEmitter();
            /** Event emitted when the select has been opened. */
            _this.openedStream = _this.openedChange.pipe(operators.filter(function (o) { return o; }), operators.map(function () { }));
            /** Event emitted when the select has been closed. */
            _this.closedStream = _this.openedChange.pipe(operators.filter(function (o) { return !o; }), operators.map(function () { }));
            /** Event emitted when the selected value has been changed by the user. */
            _this.selectionChange = new i0.EventEmitter();
            /**
             * Event that emits whenever the raw value of the select changes. This is here primarily
             * to facilitate the two-way binding for the `value` input.
             * @docs-private
             */
            _this.valueChange = new i0.EventEmitter();
            _this._hasBackdrop = false;
            _this._required = false;
            _this._multiple = false;
            _this._focused = false;
            _this.panelOpen = false;
            _this.closeSubscription = rxjs.Subscription.EMPTY;
            /** The scroll position of the overlay panel, calculated to center the selected option. */
            _this.scrollTop = 0;
            /** Unique id for this input. */
            _this.uid = "mc-select-" + nextUniqueId++;
            /** Emits whenever the component is destroyed. */
            _this.destroy = new rxjs.Subject();
            /** `View -> model callback called when value changes` */
            _this.onChange = function () { };
            /** `View -> model callback called when select has been touched` */
            _this.onTouched = function () { };
            /** Comparison function to specify which option is displayed. Defaults to object equality. */
            _this._compareWith = function (o1, o2) { return o1 === o2; };
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
            get: function () {
                return this._hasBackdrop;
            },
            set: function (value) {
                this._hasBackdrop = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "placeholder", {
            get: function () {
                return this._placeholder;
            },
            set: function (value) {
                this._placeholder = value;
                this.stateChanges.next();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "required", {
            get: function () {
                return this._required;
            },
            set: function (value) {
                this._required = coercion.coerceBooleanProperty(value);
                this.stateChanges.next();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "multiple", {
            get: function () {
                return this._multiple;
            },
            set: function (value) {
                if (this.selectionModel) {
                    throw i2.getMcSelectDynamicMultipleError();
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
             */
            get: function () {
                return this._compareWith;
            },
            set: function (fn) {
                /* tslint:disable-next-line:strict-type-predicates */
                if (typeof fn !== 'function') {
                    throw i2.getMcSelectNonFunctionValueError();
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
            /** Value of the select control. */
            get: function () {
                return this._value;
            },
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
            get: function () {
                return this._id;
            },
            set: function (value) {
                this._id = value || this.uid;
                this.stateChanges.next();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "focused", {
            /** Whether the select is focused. */
            get: function () {
                return this._focused || this.panelOpen;
            },
            set: function (value) {
                this._focused = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "isEmptySearchResult", {
            get: function () {
                return this.search && this.options.length === 0 && !!this.search.input.value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "canShowCleaner", {
            get: function () {
                return this.cleaner && this.selectionModel.hasValue();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "selected", {
            get: function () {
                return this.multiple ? this.selectionModel.selected : this.selectionModel.selected[0];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McSelect.prototype, "triggerValue", {
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
            get: function () {
                if (this.empty) {
                    return [];
                }
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
            get: function () {
                return !this.selectionModel || this.selectionModel.isEmpty();
            },
            enumerable: false,
            configurable: true
        });
        McSelect.prototype.ngOnInit = function () {
            var _this = this;
            this.selectionModel = new collections.SelectionModel(this.multiple);
            this.stateChanges.next();
            // We need `distinctUntilChanged` here, because some browsers will
            // fire the animation end event twice for the same animation. See:
            // https://github.com/angular/angular/issues/24084
            this.panelDoneAnimatingStream
                .pipe(operators.distinctUntilChanged(), operators.takeUntil(this.destroy))
                .subscribe(function () {
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
            });
        };
        McSelect.prototype.ngAfterContentInit = function () {
            var _this = this;
            if (this.mcValidation.useValidation) {
                i2.setMosaicValidation(this);
            }
            this.initKeyManager();
            this.selectionModel.changed
                .pipe(operators.takeUntil(this.destroy))
                .subscribe(function (event) {
                event.added.forEach(function (option) { return option.select(); });
                event.removed.forEach(function (option) { return option.deselect(); });
            });
            this.options.changes
                .pipe(operators.startWith(null), operators.takeUntil(this.destroy))
                .subscribe(function () {
                _this.resetOptions();
                _this.initializeSelection();
            });
        };
        McSelect.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.tags.changes
                .subscribe(function () {
                setTimeout(function () { return _this.calculateHiddenItems(); }, 0);
            });
        };
        McSelect.prototype.ngDoCheck = function () {
            if (this.ngControl) {
                this.updateErrorState();
            }
        };
        McSelect.prototype.ngOnChanges = function (changes) {
            // Updating the disabled state is handled by `mixinDisabled`, but we need to additionally let
            // the parent form field know to run change detection when the disabled state changes.
            if (changes.disabled) {
                this.stateChanges.next();
            }
        };
        McSelect.prototype.ngOnDestroy = function () {
            this.destroy.next();
            this.destroy.complete();
            this.stateChanges.complete();
            this.closeSubscription.unsubscribe();
        };
        McSelect.prototype.hiddenItemsTextFormatter = function (hiddenItemsText, hiddenItems) {
            return hiddenItemsText + " " + hiddenItems;
        };
        McSelect.prototype.clearValue = function ($event) {
            $event.stopPropagation();
            this.selectionModel.clear();
            this.keyManager.setActiveItem(-1);
            this.propagateChanges();
        };
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
        /** Toggles the overlay panel open or closed. */
        McSelect.prototype.toggle = function () {
            if (this.panelOpen) {
                this.close();
            }
            else {
                this.open();
            }
        };
        /** Opens the overlay panel. */
        McSelect.prototype.open = function () {
            var _this = this;
            var _a;
            if (this.disabled || !((_a = this.options) === null || _a === void 0 ? void 0 : _a.length) || this.panelOpen) {
                return;
            }
            this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
            // Note: The computed font-size will be a string pixel value (e.g. "16px").
            // `parseInt` ignores the trailing 'px' and converts this to a number.
            this.triggerFontSize = parseInt(getComputedStyle(this.trigger.nativeElement)['font-size']);
            this.panelOpen = true;
            this.keyManager.withHorizontalOrientation(null);
            this.highlightCorrectOption();
            this._changeDetectorRef.markForCheck();
            // Set the font size on the panel element once it exists.
            this._ngZone.onStable.asObservable()
                .pipe(operators.take(1))
                .subscribe(function () {
                _this.scrollActiveOptionIntoView();
                if (_this.triggerFontSize && _this.overlayDir.overlayRef && _this.overlayDir.overlayRef.overlayElement) {
                    _this.overlayDir.overlayRef.overlayElement.style.fontSize = _this.triggerFontSize + "px";
                }
            });
        };
        /** Closes the overlay panel and focuses the host element. */
        McSelect.prototype.close = function () {
            if (!this.panelOpen) {
                return;
            }
            // the order of calls is important
            this.resetSearch();
            this.panelOpen = false;
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
         * @param fn Callback to be triggered when the value changes.
         */
        McSelect.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        /**
         * Saves a callback function to be invoked when the select is blurred
         * by the user. Part of the ControlValueAccessor interface required
         * to integrate with Angular's core forms API.
         *
         * @param fn Callback to be triggered when the component has been touched.
         */
        McSelect.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        /**
         * Disables the select. Part of the ControlValueAccessor interface required
         * to integrate with Angular's core forms API.
         *
         * @param isDisabled Sets whether the component is disabled.
         */
        McSelect.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
            this._changeDetectorRef.markForCheck();
            this.stateChanges.next();
        };
        McSelect.prototype.isRtl = function () {
            return this._dir ? this._dir.value === 'rtl' : false;
        };
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
        McSelect.prototype.onFocus = function () {
            if (!this.disabled) {
                this._focused = true;
                this.stateChanges.next();
            }
        };
        /**
         * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
         * "blur" to the panel when it opens, causing a false positive.
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
         */
        McSelect.prototype.onAttached = function () {
            var _this = this;
            this.overlayDir.positionChange
                .pipe(operators.take(1))
                .subscribe(function () {
                _this._changeDetectorRef.detectChanges();
                _this.setOverlayPosition();
                _this.optionsContainer.nativeElement.scrollTop = _this.scrollTop;
                _this.updateScrollSize();
            });
            this.closeSubscription = this.closingActions()
                .subscribe(function () { return _this.close(); });
        };
        /** Returns the theme to be used on the panel. */
        McSelect.prototype.getPanelTheme = function () {
            return this._parentFormField ? "mc-" + this._parentFormField.color : '';
        };
        /** Focuses the select element. */
        McSelect.prototype.focus = function () {
            this.elementRef.nativeElement.focus();
        };
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        McSelect.prototype.onContainerClick = function () {
            this.focus();
        };
        /** Invoked when an option is clicked. */
        McSelect.prototype.onRemoveMatcherItem = function (option, $event) {
            $event.stopPropagation();
            option.deselect();
        };
        McSelect.prototype.calculateHiddenItems = function () {
            var _this = this;
            if (this.customTrigger || this.empty || !this.multiple) {
                return;
            }
            var visibleItems = 0;
            var totalItemsWidth = this.getTotalItemsWidthInMatcher();
            var totalVisibleItemsWidth = 0;
            this.tags.forEach(function (tag) {
                if (tag.nativeElement.offsetTop < tag.nativeElement.offsetHeight) {
                    totalVisibleItemsWidth += _this.getItemWidth(tag.nativeElement);
                    visibleItems++;
                }
            });
            this.hiddenItems = this.selected.length - visibleItems;
            if (this.hiddenItems) {
                var itemsCounter = this.trigger.nativeElement.querySelector('.mc-select__match-hidden-text');
                var matcherList = this.trigger.nativeElement.querySelector('.mc-select__match-list');
                var itemsCounterShowed = itemsCounter.offsetTop < itemsCounter.offsetHeight;
                // const itemsCounterWidth: number = itemsCounter.getBoundingClientRect().width;
                var itemsCounterWidth = 86;
                var matcherListWidth = matcherList.getBoundingClientRect().width;
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
        McSelect.prototype.getItemHeight = function () {
            return this.options.first ? this.options.first.getHeight() : 0;
        };
        McSelect.prototype.closingActions = function () {
            var _this = this;
            return rxjs.merge(this.overlayDir.overlayRef.outsidePointerEvents()
                .pipe(operators.filter(function (event) { return !_this.elementRef.nativeElement.contains(event.target); })), this.overlayDir.overlayRef.detachments());
        };
        McSelect.prototype.getHeightOfOptionsContainer = function () {
            return this.optionsContainer.nativeElement.getClientRects()[0].height;
        };
        McSelect.prototype.updateScrollSize = function () {
            if (!this.options.first) {
                return;
            }
            this.keyManager.withScrollSize(Math.floor(this.getHeightOfOptionsContainer() / this.options.first.getHeight()));
        };
        McSelect.prototype.getTotalItemsWidthInMatcher = function () {
            var _this = this;
            var triggerClone = this.trigger.nativeElement.cloneNode(true);
            triggerClone.querySelector('.mc-select__match-hidden-text').remove();
            this._renderer.setStyle(triggerClone, 'position', 'absolute');
            this._renderer.setStyle(triggerClone, 'visibility', 'hidden');
            this._renderer.setStyle(triggerClone, 'top', '-100%');
            this._renderer.setStyle(triggerClone, 'left', '0');
            this._renderer.appendChild(this.trigger.nativeElement, triggerClone);
            var totalItemsWidth = 0;
            triggerClone.querySelectorAll('mc-tag').forEach(function (item) {
                totalItemsWidth += _this.getItemWidth(item);
            });
            triggerClone.remove();
            return totalItemsWidth;
        };
        McSelect.prototype.getItemWidth = function (element) {
            var computedStyle = window.getComputedStyle(element);
            var width = parseInt(computedStyle.width);
            var marginLeft = parseInt(computedStyle.marginLeft);
            var marginRight = parseInt(computedStyle.marginRight);
            return width + marginLeft + marginRight;
        };
        /** Handles keyboard events while the select is closed. */
        McSelect.prototype.handleClosedKeydown = function (event) {
            /* tslint:disable-next-line */
            var keyCode = event.keyCode;
            var isArrowKey = [keycodes.DOWN_ARROW, keycodes.UP_ARROW, keycodes.LEFT_ARROW, keycodes.RIGHT_ARROW].includes(keyCode);
            var isOpenKey = [keycodes.ENTER, keycodes.SPACE].includes(keyCode);
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
        McSelect.prototype.handleOpenKeydown = function (event) {
            /* tslint:disable-next-line */
            var keyCode = event.keyCode;
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
                var hasDeselectedOptions_1 = this.options.some(function (option) { return !option.selected; });
                this.options.forEach(function (option) {
                    if (hasDeselectedOptions_1 && !option.disabled) {
                        option.select();
                    }
                    else {
                        option.deselect();
                    }
                });
            }
            else {
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
        McSelect.prototype.initializeSelection = function () {
            var _this = this;
            // Defer setting the value in order to avoid the "Expression
            // has changed after it was checked" errors from Angular.
            Promise.resolve().then(function () {
                _this.setSelectionByValue(_this.ngControl ? _this.ngControl.value : _this._value);
            });
        };
        /**
         * Sets the selected option based on a value. If no option can be
         * found with the designated value, the select trigger is cleared.
         */
        McSelect.prototype.setSelectionByValue = function (value) {
            var _this = this;
            this.previousSelectionModelSelected = this.selectionModel.selected;
            if (this.multiple && value) {
                if (!Array.isArray(value)) {
                    throw i2.getMcSelectNonArrayValueError();
                }
                this.selectionModel.clear();
                value.forEach(function (currentValue) { return _this.selectValue(currentValue); });
                this.sortValues();
            }
            else {
                this.selectionModel.clear();
                var correspondingOption = this.selectValue(value);
                // Shift focus to the active item. Note that we shouldn't do this in multiple
                // mode, because we don't know what option the user interacted with last.
                if (correspondingOption) {
                    this.keyManager.setActiveItem(correspondingOption);
                }
            }
            this._changeDetectorRef.markForCheck();
        };
        McSelect.prototype.getCorrespondOption = function (value) {
            var _this = this;
            return __spreadArray(__spreadArray([], __read(this.options.toArray())), __read(this.previousSelectionModelSelected)).find(function (option) {
                try {
                    // Treat null as a special reset value.
                    return option.value != null && _this.compareWith(option.value, value);
                }
                catch (error) {
                    if (i0.isDevMode()) {
                        // Notify developers of errors in their comparator.
                        console.warn(error);
                    }
                    return false;
                }
            });
        };
        /**
         * Finds and selects and option based on its value.
         * @returns Option that has the corresponding value.
         */
        McSelect.prototype.selectValue = function (value) {
            var correspondingOption = this.getCorrespondOption(value);
            if (correspondingOption) {
                this.selectionModel.select(correspondingOption);
            }
            return correspondingOption;
        };
        /** Sets up a key manager to listen to keyboard events on the overlay panel. */
        McSelect.prototype.initKeyManager = function () {
            var _this = this;
            var typeAheadDebounce = 200;
            this.keyManager = new a11y.ActiveDescendantKeyManager(this.options)
                .withTypeAhead(typeAheadDebounce, this.search ? -1 : 0)
                .withVerticalOrientation()
                .withHorizontalOrientation(this.isRtl() ? 'rtl' : 'ltr');
            this.keyManager.tabOut
                .pipe(operators.takeUntil(this.destroy))
                .subscribe(function () {
                // Restore focus to the trigger before closing. Ensures that the focus
                // position won't be lost if the user got focus into the overlay.
                _this.focus();
                _this.close();
            });
            this.keyManager.change
                .pipe(operators.takeUntil(this.destroy))
                .subscribe(function () {
                if (_this.panelOpen && _this.panel) {
                    _this.scrollActiveOptionIntoView();
                }
                else if (!_this.panelOpen && !_this.multiple && _this.keyManager.activeItem) {
                    _this.keyManager.activeItem.selectViaInteraction();
                }
            });
        };
        /** Drops current option subscriptions and IDs and resets from scratch. */
        McSelect.prototype.resetOptions = function () {
            var _this = this;
            var changedOrDestroyed = rxjs.merge(this.options.changes, this.destroy);
            this.optionSelectionChanges
                .pipe(operators.takeUntil(changedOrDestroyed))
                .subscribe(function (event) {
                _this.onSelect(event.source, event.isUserInput);
                if (_this.search && _this.search.isSearchChanged) {
                    Promise.resolve().then(function () { return _this.keyManager.updateActiveItem(0); });
                    _this.search.isSearchChanged = false;
                }
                if (event.isUserInput && !_this.multiple && _this.panelOpen) {
                    _this.close();
                    _this.focus();
                }
            });
            // Listen to changes in the internal state of the options and react accordingly.
            // Handles cases like the labels of the selected options changing.
            rxjs.merge.apply(void 0, __spreadArray([], __read(this.options.map(function (option) { return option.stateChanges; })))).pipe(operators.takeUntil(changedOrDestroyed))
                .subscribe(function () {
                _this._changeDetectorRef.markForCheck();
                _this.stateChanges.next();
            });
        };
        /** Invoked when an option is clicked. */
        McSelect.prototype.onSelect = function (option, isUserInput) {
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
        McSelect.prototype.sortValues = function () {
            var _this = this;
            if (this.multiple) {
                var options_1 = this.options.toArray();
                this.selectionModel.sort(function (a, b) {
                    return _this.sortComparator ? _this.sortComparator(a, b, options_1) :
                        options_1.indexOf(a) - options_1.indexOf(b);
                });
                this.stateChanges.next();
            }
        };
        /** Emits change event to set the model value. */
        McSelect.prototype.propagateChanges = function (fallbackValue) {
            var valueToEmit = null;
            if (this.multiple) {
                valueToEmit = this.selected.map(function (option) { return option.value; });
            }
            else {
                valueToEmit = this.selected ? this.selected.value : fallbackValue;
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
        /** Scrolls the active option into view. */
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
         */
        McSelect.prototype.setOverlayPosition = function () {
            var _b;
            this.resetOverlay();
            var overlayRect = this.getOverlayRect();
            // Window width without scrollbar
            var windowWidth = this.getOverlayWidth();
            var isRtl = this.isRtl();
            /* tslint:disable-next-line:no-magic-numbers */
            var paddingWidth = i2.SELECT_PANEL_PADDING_X * 2;
            var offsetX;
            var overlayMaxWidth;
            var selected = this.selectionModel.selected[0] || this.options.first;
            offsetX = selected && selected.group ? i2.SELECT_PANEL_INDENT_PADDING_X : i2.SELECT_PANEL_PADDING_X;
            // Invert the offset in LTR.
            if (!isRtl) {
                offsetX *= -1;
            }
            // Determine if select overflows on either side.
            var leftOverflow = 0 - (overlayRect.left + offsetX - (isRtl ? paddingWidth : 0));
            var rightOverflow = overlayRect.right + offsetX - windowWidth
                + (isRtl ? 0 : paddingWidth);
            // If the element overflows on either side, reduce the offset to allow it to fit.
            if (leftOverflow > 0 || rightOverflow > 0) {
                _b = __read(this.calculateOverlayXPosition(overlayRect, windowWidth, offsetX), 2), offsetX = _b[0], overlayMaxWidth = _b[1];
                this.overlayDir.overlayRef.overlayElement.style.maxWidth = overlayMaxWidth + "px";
            }
            // Set the offset directly in order to avoid having to go through change detection and
            // potentially triggering "changed after it was checked" errors. Round the value to avoid
            // blurry content in some browsers.
            this.overlayDir.offsetX = Math.round(offsetX);
            this.overlayDir.overlayRef.updatePosition();
        };
        McSelect.prototype.calculateOverlayXPosition = function (overlayRect, windowWidth, basicOffsetX) {
            var offsetX = basicOffsetX;
            var leftIndent = this.triggerRect.left;
            var rightIndent = windowWidth - this.triggerRect.right;
            // Setting direction of dropdown expansion
            var isRightDirection = leftIndent <= rightIndent;
            var maxDropdownWidth;
            var overlayMaxWidth;
            var triggerWidth = this.triggerRect.width + i2.SELECT_PANEL_INDENT_PADDING_X;
            if (isRightDirection) {
                maxDropdownWidth = rightIndent + triggerWidth - i2.SELECT_PANEL_VIEWPORT_PADDING;
                overlayMaxWidth = overlayRect.width < maxDropdownWidth ? overlayRect.width : maxDropdownWidth;
            }
            else {
                var leftOffset = void 0;
                maxDropdownWidth = leftIndent + triggerWidth - i2.SELECT_PANEL_VIEWPORT_PADDING;
                if (overlayRect.width < maxDropdownWidth) {
                    overlayMaxWidth = overlayRect.width;
                    leftOffset = this.triggerRect.right - overlayMaxWidth;
                }
                else {
                    overlayMaxWidth = maxDropdownWidth;
                    leftOffset = this.triggerRect.right - (overlayMaxWidth - i2.SELECT_PANEL_INDENT_PADDING_X);
                }
                offsetX -= this.triggerRect.left - leftOffset;
            }
            return [offsetX, overlayMaxWidth];
        };
        McSelect.prototype.resetOverlay = function () {
            this.overlayDir.offsetX = 0;
            this.overlayDir.overlayRef.overlayElement.style.maxWidth = 'unset';
            this.overlayDir.overlayRef.updatePosition();
        };
        McSelect.prototype.getOverlayRect = function () {
            return this.overlayDir.overlayRef.overlayElement.getBoundingClientRect();
        };
        McSelect.prototype.getOverlayWidth = function () {
            return this.scrollStrategy._overlayRef.hostElement.clientWidth;
        };
        return McSelect;
    }(McSelectMixinBase));
    /** @nocollapse */ McSelect.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McSelect, deps: [{ token: i0__namespace.ChangeDetectorRef }, { token: i0__namespace.NgZone }, { token: i0__namespace.Renderer2 }, { token: i2__namespace.ErrorStateMatcher }, { token: i0__namespace.ElementRef }, { token: i4.NG_VALIDATORS, optional: true }, { token: i3__namespace.Directionality, optional: true }, { token: i4__namespace.NgForm, optional: true }, { token: i4__namespace.FormGroupDirective, optional: true }, { token: i1__namespace.McFormField, optional: true }, { token: i4__namespace.NgControl, optional: true, self: true }, { token: i4__namespace.NgModel, optional: true, self: true }, { token: i4__namespace.FormControlName, optional: true, self: true }, { token: i2.MC_SELECT_SCROLL_STRATEGY }, { token: i2.MC_VALIDATION, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McSelect.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McSelect, selector: "mc-select", inputs: { disabled: "disabled", tabIndex: "tabIndex", hiddenItemsText: "hiddenItemsText", panelClass: "panelClass", backdropClass: "backdropClass", errorStateMatcher: "errorStateMatcher", sortComparator: "sortComparator", hasBackdrop: "hasBackdrop", placeholder: "placeholder", required: "required", multiple: "multiple", compareWith: "compareWith", value: "value", id: "id", hiddenItemsTextFormatter: "hiddenItemsTextFormatter" }, outputs: { openedChange: "openedChange", openedStream: "opened", closedStream: "closed", selectionChange: "selectionChange", valueChange: "valueChange" }, host: { listeners: { "keydown": "handleKeydown($event)", "focus": "onFocus()", "blur": "onBlur()", "window:resize": "calculateHiddenItems()" }, properties: { "attr.id": "id", "attr.tabindex": "tabIndex", "attr.disabled": "disabled || null", "class.mc-disabled": "disabled", "class.mc-invalid": "errorState" }, classAttribute: "mc-select" }, providers: [
            { provide: i1.McFormFieldControl, useExisting: McSelect },
            { provide: i2.MC_OPTION_PARENT_COMPONENT, useExisting: McSelect }
        ], queries: [{ propertyName: "customTrigger", first: true, predicate: McSelectTrigger, descendants: true }, { propertyName: "cleaner", first: true, predicate: ["mcSelectCleaner"], descendants: true, static: true }, { propertyName: "search", first: true, predicate: McSelectSearch, descendants: true }, { propertyName: "options", predicate: i2.McOption, descendants: true }, { propertyName: "optionGroups", predicate: i2.McOptgroup }], viewQueries: [{ propertyName: "trigger", first: true, predicate: ["trigger"], descendants: true }, { propertyName: "panel", first: true, predicate: ["panel"], descendants: true }, { propertyName: "optionsContainer", first: true, predicate: ["optionsContainer"], descendants: true }, { propertyName: "overlayDir", first: true, predicate: i7.CdkConnectedOverlay, descendants: true }, { propertyName: "tags", predicate: i5.McTag, descendants: true }], exportAs: ["mcSelect"], usesInheritance: true, usesOnChanges: true, ngImport: i0__namespace, template: "<div cdk-overlay-origin\n     class=\"mc-select__trigger\"\n     (click)=\"toggle()\"\n     [class.mc-select__trigger_multiple]=\"multiple\"\n     #origin=\"cdkOverlayOrigin\"\n     #trigger>\n    <div class=\"mc-select__matcher\" [ngSwitch]=\"empty\">\n        <span class=\"mc-select__placeholder\" *ngSwitchCase=\"true\">{{ placeholder || '\\u00A0' }}</span>\n        <span *ngSwitchCase=\"false\" [ngSwitch]=\"!!customTrigger\">\n            <div *ngSwitchDefault [ngSwitch]=\"multiple\" class=\"mc-select__match-container\">\n                <span *ngSwitchCase=\"false\" class=\"mc-select__matcher-text\">{{ triggerValue }}</span>\n                <div *ngSwitchCase=\"true\" class=\"mc-select__match-list\">\n                    <mc-tag *ngFor=\"let option of triggerValues\"\n                            [disabled]=\"option.disabled || disabled\"\n                            [selectable]=\"false\"\n                            [class.mc-error]=\"errorState\">\n                        {{ option.viewValue }}\n                        <i mc-icon=\"mc-close-S_16\"\n                           *ngIf=\"!option.disabled && !disabled\"\n                           (click)=\"onRemoveMatcherItem(option, $event)\">\n                        </i>\n                    </mc-tag>\n                </div>\n                <div class=\"mc-select__match-hidden-text\" [style.display]=\"hiddenItems > 0 ? 'block' : 'none'\">\n                    {{ hiddenItemsTextFormatter(hiddenItemsText, hiddenItems) }}\n                </div>\n            </div>\n            <ng-content select=\"mc-select-trigger\" *ngSwitchCase=\"true\"></ng-content>\n        </span>\n    </div>\n\n    <div class=\"mc-select__cleaner\" *ngIf=\"canShowCleaner\" (click)=\"clearValue($event)\">\n        <ng-content select=\"mc-cleaner\"></ng-content>\n    </div>\n\n    <div class=\"mc-select__arrow-wrapper\">\n        <i class=\"mc-select__arrow\" mc-icon=\"mc-angle-down-L_16\"></i>\n    </div>\n</div>\n\n<ng-template\n    cdk-connected-overlay\n    cdkConnectedOverlayLockPosition\n    [cdkConnectedOverlayHasBackdrop]=\"hasBackdrop\"\n    [cdkConnectedOverlayBackdropClass]=\"backdropClass\"\n    [cdkConnectedOverlayScrollStrategy]=\"scrollStrategy\"\n    [cdkConnectedOverlayOrigin]=\"origin\"\n    [cdkConnectedOverlayOpen]=\"panelOpen\"\n    [cdkConnectedOverlayPositions]=\"positions\"\n    [cdkConnectedOverlayMinWidth]=\"triggerRect?.width!\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    (backdropClick)=\"close()\"\n    (attach)=\"onAttached()\"\n    (detach)=\"close()\">\n    <div\n        #panel\n        class=\"mc-select__panel {{ getPanelTheme() }}\"\n        [ngClass]=\"panelClass\"\n        [style.transformOrigin]=\"transformOrigin\"\n        [style.font-size.px]=\"triggerFontSize\"\n        (keydown)=\"handleKeydown($event)\">\n\n        <div *ngIf=\"search\" class=\"mc-select__search-container\">\n            <ng-content select=\"[mcSelectSearch]\"></ng-content>\n        </div>\n\n        <div #optionsContainer\n             class=\"mc-select__content\"\n             [@fadeInContent]=\"'showing'\"\n             (@fadeInContent.done)=\"panelDoneAnimatingStream.next($event.toState)\">\n\n            <div *ngIf=\"isEmptySearchResult\" class=\"mc-select__no-options-message\">\n                <ng-content select=\"[mc-select-search-empty-result]\"></ng-content>\n            </div>\n            <ng-content></ng-content>\n        </div>\n    </div>\n</ng-template>\n", styles: [".mc-option{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;position:relative;max-width:100%;height:32px;height:var(--mc-option-size-height, 32px);border:2px solid transparent;border:var(--mc-option-size-border-width, 2px) solid transparent;cursor:pointer;outline:none;padding-left:16px;padding-left:var(--mc-option-size-horizontal-padding, 16px);padding-right:16px;padding-right:var(--mc-option-size-horizontal-padding, 16px);-webkit-tap-highlight-color:transparent}.mc-option.mc-disabled{cursor:default}.mc-option .mc-pseudo-checkbox{margin-right:8px}.mc-option .mc-option-overlay{position:absolute;top:calc(-1 * 2px);top:calc(-1 * var(--mc-option-size-border-width, 2px));left:calc(-1 * 2px);left:calc(-1 * var(--mc-option-size-border-width, 2px));right:calc(-1 * 2px);right:calc(-1 * var(--mc-option-size-border-width, 2px));bottom:calc(-1 * 2px);bottom:calc(-1 * var(--mc-option-size-border-width, 2px));pointer-events:none;border-radius:inherit}.mc-option-text{display:inline-block;flex-grow:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.mc-select{box-sizing:border-box;display:inline-block;width:100%;outline:none}.mc-select .mc-select__trigger{display:flex;box-sizing:border-box;position:relative;height:30px;height:var(--mc-select-size-height, 30px);cursor:pointer;padding-left:calc(16px - 1px);padding-left:calc(var(--mc-select-size-left-padding, 16px) - var(--mc-form-field-size-border-width, 1px));padding-right:calc(8px - 1px);padding-right:calc(var(--mc-select-size-right-padding, 8px) - var(--mc-form-field-size-border-width, 1px))}.mc-select .mc-select__trigger.mc-select__trigger_multiple{padding-left:calc(8px - 1px);padding-left:calc(var(--mc-select-size-left-padding-multiple, 8px) - var(--mc-form-field-size-border-width, 1px))}.mc-select .mc-select__trigger.mc-select__trigger_multiple .mc-tag.mc-disabled .mc-tag__text{margin-right:7px}.mc-select.mc-disabled .mc-select__trigger{-webkit-user-select:none;user-select:none;cursor:default}.mc-select__no-options-message{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;position:relative;max-width:100%;height:32px;height:var(--mc-option-size-height, 32px);cursor:default;outline:none;padding-left:16px;padding-left:var(--mc-option-size-horizontal-padding, 16px);padding-right:16px;padding-right:var(--mc-option-size-horizontal-padding, 16px)}.mc-select__matcher{display:flex;align-items:center;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mc-select__matcher>span{width:100%}.mc-select__match-list{display:flex;flex-wrap:wrap;overflow:hidden;max-height:calc(30px - 1px);max-height:calc(var(--mc-select-size-height, 30px) - var(--mc-select-panel-size-border-width, 1px))}.mc-select__match-list .mc-tag{margin-right:4px}.mc-select__match-container{display:flex;flex-direction:row;justify-content:space-between;width:100%}.mc-select__match-container .mc-select__match-hidden-text{flex:0 0 70px;align-self:center;padding:0 8px;text-align:right}.mc-select__arrow-wrapper{align-self:center}.mc-form-field-appearance-fill .mc-select__arrow-wrapper,.mc-form-field-appearance-standard .mc-select__arrow-wrapper{transform:translateY(-50%)}.mc-form-field-appearance-outline .mc-select__arrow-wrapper{transform:translateY(-25%)}.mc-select__panel{min-width:100%;max-width:640px;max-width:var(--mc-select-panel-size-max-width, 640px);overflow:hidden;border-width:1px;border-width:var(--mc-select-panel-size-border-width, 1px);border-style:solid;border-bottom-left-radius:3px;border-bottom-left-radius:var(--mc-select-panel-size-border-radius, 3px);border-bottom-right-radius:3px;border-bottom-right-radius:var(--mc-select-panel-size-border-radius, 3px)}.mc-select__panel .mc-optgroup-label,.mc-select__panel .mc-option{font-size:inherit;line-height:32px;line-height:var(--mc-option-size-height, 32px);height:32px;height:var(--mc-option-size-height, 32px)}.mc-select__content{max-height:232px;max-height:var(--mc-select-panel-size-max-height, 232px);padding:4px 0;padding:var(--mc-select-panel-size-vertical-padding, 4px) 0;overflow:auto}.mc-select__content .cdk-virtual-scroll-viewport{min-height:232px-8px;min-height:var(--mc-select-panel-size-max-height, 232px)-8px;max-height:232px-8px;max-height:var(--mc-select-panel-size-max-height, 232px)-8px}.mc-form-field-type-select:not(.mc-disabled) .mc-form-field-flex{cursor:pointer}.mc-select__search-container{border-bottom-width:1px;border-bottom-style:solid}\n"], components: [{ type: i5__namespace.McTag, selector: "mc-tag, [mc-tag], mc-basic-tag, [mc-basic-tag]", inputs: ["color", "selected", "value", "selectable", "removable", "disabled"], outputs: ["selectionChange", "destroyed", "removed"], exportAs: ["mcTag"] }, { type: i6__namespace.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i7__namespace.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }, { type: i8__namespace.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i8__namespace.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i8__namespace.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { type: i8__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i8__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6__namespace.McIconCSSStyler, selector: "[mc-icon]" }, { type: i7__namespace.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayPositions", "cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayTransformOriginOn"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { type: i8__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], animations: [
            i2.mcSelectAnimations.transformPanel,
            i2.mcSelectAnimations.fadeInContent
        ], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McSelect, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-select',
                        exportAs: 'mcSelect',
                        templateUrl: 'select.html',
                        styleUrls: ['./select.scss'],
                        inputs: ['disabled', 'tabIndex'],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
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
                            i2.mcSelectAnimations.transformPanel,
                            i2.mcSelectAnimations.fadeInContent
                        ],
                        providers: [
                            { provide: i1.McFormFieldControl, useExisting: McSelect },
                            { provide: i2.MC_OPTION_PARENT_COMPONENT, useExisting: McSelect }
                        ]
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ChangeDetectorRef }, { type: i0__namespace.NgZone }, { type: i0__namespace.Renderer2 }, { type: i2__namespace.ErrorStateMatcher }, { type: i0__namespace.ElementRef }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [i4.NG_VALIDATORS]
                        }] }, { type: i3__namespace.Directionality, decorators: [{
                            type: i0.Optional
                        }] }, { type: i4__namespace.NgForm, decorators: [{
                            type: i0.Optional
                        }] }, { type: i4__namespace.FormGroupDirective, decorators: [{
                            type: i0.Optional
                        }] }, { type: i1__namespace.McFormField, decorators: [{
                            type: i0.Optional
                        }] }, { type: i4__namespace.NgControl, decorators: [{
                            type: i0.Self
                        }, {
                            type: i0.Optional
                        }] }, { type: i4__namespace.NgModel, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Self
                        }] }, { type: i4__namespace.FormControlName, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Self
                        }] }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i2.MC_SELECT_SCROLL_STRATEGY]
                        }] }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [i2.MC_VALIDATION]
                        }] }];
        }, propDecorators: { trigger: [{
                    type: i0.ViewChild,
                    args: ['trigger', { static: false }]
                }], panel: [{
                    type: i0.ViewChild,
                    args: ['panel', { static: false }]
                }], optionsContainer: [{
                    type: i0.ViewChild,
                    args: ['optionsContainer', { static: false }]
                }], overlayDir: [{
                    type: i0.ViewChild,
                    args: [i7.CdkConnectedOverlay, { static: false }]
                }], tags: [{
                    type: i0.ViewChildren,
                    args: [i5.McTag]
                }], customTrigger: [{
                    type: i0.ContentChild,
                    args: [McSelectTrigger, { static: false }]
                }], cleaner: [{
                    type: i0.ContentChild,
                    args: ['mcSelectCleaner', { static: true }]
                }], options: [{
                    type: i0.ContentChildren,
                    args: [i2.McOption, { descendants: true }]
                }], optionGroups: [{
                    type: i0.ContentChildren,
                    args: [i2.McOptgroup]
                }], search: [{
                    type: i0.ContentChild,
                    args: [McSelectSearch, { static: false }]
                }], hiddenItemsText: [{
                    type: i0.Input
                }], panelClass: [{
                    type: i0.Input
                }], backdropClass: [{
                    type: i0.Input
                }], errorStateMatcher: [{
                    type: i0.Input
                }], sortComparator: [{
                    type: i0.Input
                }], openedChange: [{
                    type: i0.Output
                }], openedStream: [{
                    type: i0.Output,
                    args: ['opened']
                }], closedStream: [{
                    type: i0.Output,
                    args: ['closed']
                }], selectionChange: [{
                    type: i0.Output
                }], valueChange: [{
                    type: i0.Output
                }], hasBackdrop: [{
                    type: i0.Input
                }], placeholder: [{
                    type: i0.Input
                }], required: [{
                    type: i0.Input
                }], multiple: [{
                    type: i0.Input
                }], compareWith: [{
                    type: i0.Input
                }], value: [{
                    type: i0.Input
                }], id: [{
                    type: i0.Input
                }], hiddenItemsTextFormatter: [{
                    type: i0.Input
                }] } });

    var McSelectModule = /** @class */ (function () {
        function McSelectModule() {
        }
        return McSelectModule;
    }());
    /** @nocollapse */ McSelectModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McSelectModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ McSelectModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McSelectModule, declarations: [McSelect,
            McSelectSearch,
            McSelectSearchEmptyResult,
            McSelectTrigger], imports: [i8.CommonModule,
            i7.OverlayModule,
            i2.McOptionModule,
            i6.McIconModule,
            i5.McTagsModule], exports: [i1.McFormFieldModule,
            McSelect,
            McSelectSearch,
            McSelectSearchEmptyResult,
            McSelectTrigger,
            i2.McOptionModule,
            i8.CommonModule] });
    /** @nocollapse */ McSelectModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McSelectModule, providers: [i2.MC_SELECT_SCROLL_STRATEGY_PROVIDER], imports: [[
                i8.CommonModule,
                i7.OverlayModule,
                i2.McOptionModule,
                i6.McIconModule,
                i5.McTagsModule
            ], i1.McFormFieldModule,
            i2.McOptionModule,
            i8.CommonModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McSelectModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i8.CommonModule,
                            i7.OverlayModule,
                            i2.McOptionModule,
                            i6.McIconModule,
                            i5.McTagsModule
                        ],
                        exports: [
                            i1.McFormFieldModule,
                            McSelect,
                            McSelectSearch,
                            McSelectSearchEmptyResult,
                            McSelectTrigger,
                            i2.McOptionModule,
                            i8.CommonModule
                        ],
                        declarations: [
                            McSelect,
                            McSelectSearch,
                            McSelectSearchEmptyResult,
                            McSelectTrigger
                        ],
                        providers: [i2.MC_SELECT_SCROLL_STRATEGY_PROVIDER]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
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
