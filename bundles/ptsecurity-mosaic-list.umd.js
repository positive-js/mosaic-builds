(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/core'), require('@angular/cdk/coercion'), require('@angular/cdk/collections'), require('@angular/forms'), require('@ptsecurity/cdk/a11y'), require('@ptsecurity/cdk/keycodes'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/list', ['exports', '@angular/cdk/a11y', '@angular/common', '@angular/core', '@ptsecurity/mosaic/core', '@angular/cdk/coercion', '@angular/cdk/collections', '@angular/forms', '@ptsecurity/cdk/a11y', '@ptsecurity/cdk/keycodes', 'rxjs', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.list = {}), global.ng.cdk.a11y, global.ng.common, global.ng.core, global.ptsecurity.mosaic.core, global.ng.cdk.coercion, global.ng.cdk.collections, global.ng.forms, global.mc.cdk.a11y, global.mc.cdk.keycodes, global.rxjs, global.rxjs.operators));
}(this, (function (exports, a11y$1, i2, i0, i1, coercion, collections, forms, a11y, keycodes, rxjs, operators) { 'use strict';

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

    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
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
     * Component for list-options of selection-list. Each list-option can automatically
     * generate a checkbox and can put current item into the selectionModel of selection-list
     * if the current item is selected.
     */
    var McListOption = /** @class */ (function () {
        function McListOption(elementRef, changeDetector, ngZone, listSelection, group) {
            this.elementRef = elementRef;
            this.changeDetector = changeDetector;
            this.ngZone = ngZone;
            this.listSelection = listSelection;
            this.group = group;
            this.hasFocus = false;
            this.onFocus = new rxjs.Subject();
            this.onBlur = new rxjs.Subject();
            /**
             * This is set to true after the first OnChanges cycle so we don't clear the value of `selected`
             * in the first cycle.
             */
            this.inputsInitialized = false;
            this._disabled = false;
            this._selected = false;
        }
        Object.defineProperty(McListOption.prototype, "value", {
            get: function () { return this._value; },
            set: function (newValue) {
                if (this.selected && newValue !== this.value && this.inputsInitialized) {
                    this.selected = false;
                }
                this._value = newValue;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McListOption.prototype, "disabled", {
            get: function () {
                var listSelectionDisabled = this.listSelection && this.listSelection.disabled;
                var groupDisabled = this.group && this.group.disabled;
                return listSelectionDisabled || groupDisabled || this._disabled;
            },
            set: function (value) {
                var newValue = i1.toBoolean(value);
                if (newValue !== this._disabled) {
                    this._disabled = newValue;
                    this.changeDetector.markForCheck();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McListOption.prototype, "showCheckbox", {
            get: function () {
                return this._showCheckbox !== undefined ? this._showCheckbox : this.listSelection.showCheckbox;
            },
            set: function (value) {
                this._showCheckbox = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McListOption.prototype, "selected", {
            get: function () {
                return this.listSelection.selectionModel && this.listSelection.selectionModel.isSelected(this) || false;
            },
            set: function (value) {
                var isSelected = i1.toBoolean(value);
                if (isSelected !== this._selected) {
                    this.setSelected(isSelected);
                    this.listSelection.reportValueChange();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McListOption.prototype, "tabIndex", {
            get: function () {
                return this.disabled ? null : -1;
            },
            enumerable: false,
            configurable: true
        });
        McListOption.prototype.ngOnInit = function () {
            var _this = this;
            var list = this.listSelection;
            if (list._value && list._value.some(function (value) { return list.compareWith(value, _this._value); })) {
                this.setSelected(true);
            }
            var wasSelected = this._selected;
            // List options that are selected at initialization can't be reported properly to the form
            // control. This is because it takes some time until the selection-list knows about all
            // available options. Also it can happen that the ControlValueAccessor has an initial value
            // that should be used instead. Deferring the value change report to the next tick ensures
            // that the form control value is not being overwritten.
            Promise.resolve().then(function () {
                if (_this._selected || wasSelected) {
                    _this.selected = true;
                    _this.changeDetector.markForCheck();
                }
            });
            this.inputsInitialized = true;
        };
        McListOption.prototype.ngOnDestroy = function () {
            var _this = this;
            if (this.selected) {
                // We have to delay this until the next tick in order
                // to avoid changed after checked errors.
                Promise.resolve().then(function () { return _this.selected = false; });
            }
            this.listSelection.removeOptionFromList(this);
        };
        McListOption.prototype.toggle = function () {
            this.selected = !this.selected;
        };
        McListOption.prototype.getLabel = function () {
            return this.text ? this.text.nativeElement.textContent : '';
        };
        McListOption.prototype.setSelected = function (selected) {
            if (this._selected === selected || !this.listSelection.selectionModel) {
                return;
            }
            this._selected = selected;
            if (selected) {
                this.listSelection.selectionModel.select(this);
            }
            else {
                this.listSelection.selectionModel.deselect(this);
            }
            this.changeDetector.markForCheck();
        };
        McListOption.prototype.getHeight = function () {
            return this.elementRef.nativeElement.getClientRects()[0].height;
        };
        McListOption.prototype.handleClick = function ($event) {
            if (this.disabled) {
                return;
            }
            this.listSelection.setSelectedOptionsByClick(this, keycodes.hasModifierKey($event, 'shiftKey'), keycodes.hasModifierKey($event, 'ctrlKey'));
        };
        McListOption.prototype.focus = function () {
            var _this = this;
            if (!this.hasFocus) {
                this.elementRef.nativeElement.focus();
                this.onFocus.next({ option: this });
                Promise.resolve().then(function () {
                    _this.hasFocus = true;
                    _this.changeDetector.markForCheck();
                });
            }
        };
        McListOption.prototype.blur = function () {
            var _this = this;
            // When animations are enabled, Angular may end up removing the option from the DOM a little
            // earlier than usual, causing it to be blurred and throwing off the logic in the list
            // that moves focus not the next item. To work around the issue, we defer marking the option
            // as not focused until the next time the zone stabilizes.
            this.ngZone.onStable
                .asObservable()
                .pipe(operators.take(1))
                .subscribe(function () {
                _this.ngZone.run(function () {
                    _this.hasFocus = false;
                    _this.onBlur.next({ option: _this });
                });
            });
        };
        McListOption.prototype.getHostElement = function () {
            return this.elementRef.nativeElement;
        };
        return McListOption;
    }());
    /** @nocollapse */ McListOption.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McListOption, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.ChangeDetectorRef }, { token: i0__namespace.NgZone }, { token: i0.forwardRef(function () { return McListSelection; }) }, { token: i1__namespace.McOptgroup, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McListOption.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McListOption, selector: "mc-list-option", inputs: { checkboxPosition: "checkboxPosition", value: "value", disabled: "disabled", showCheckbox: "showCheckbox", selected: "selected" }, host: { listeners: { "focus": "focus()", "blur": "blur()", "click": "handleClick($event)" }, properties: { "class.mc-selected": "selected", "class.mc-focused": "hasFocus", "class.mc-disabled": "disabled", "attr.tabindex": "tabIndex", "attr.disabled": "disabled || null" }, classAttribute: "mc-list-option mc-no-select" }, queries: [{ propertyName: "lines", predicate: i1.McLine }], viewQueries: [{ propertyName: "text", first: true, predicate: ["text"], descendants: true }], exportAs: ["mcListOption"], ngImport: i0__namespace, template: "<div class=\"mc-list-item-content\">\n    <mc-pseudo-checkbox\n        *ngIf=\"showCheckbox\"\n        [state]=\"selected ? 'checked' : 'unchecked'\"\n        [disabled]=\"disabled\">\n    </mc-pseudo-checkbox>\n\n    <div class=\"mc-list-text\" #text>\n        <ng-content></ng-content>\n    </div>\n</div>\n", components: [{ type: i1__namespace.McPseudoCheckbox, selector: "mc-pseudo-checkbox", inputs: ["state", "disabled"] }], directives: [{ type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McListOption, decorators: [{
                type: i0.Component,
                args: [{
                        exportAs: 'mcListOption',
                        selector: 'mc-list-option',
                        host: {
                            class: 'mc-list-option mc-no-select',
                            '[class.mc-selected]': 'selected',
                            '[class.mc-focused]': 'hasFocus',
                            '[class.mc-disabled]': 'disabled',
                            '[attr.tabindex]': 'tabIndex',
                            '[attr.disabled]': 'disabled || null',
                            '(focus)': 'focus()',
                            '(blur)': 'blur()',
                            '(click)': 'handleClick($event)'
                        },
                        templateUrl: 'list-option.html',
                        encapsulation: i0.ViewEncapsulation.None,
                        preserveWhitespaces: false,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.ChangeDetectorRef }, { type: i0__namespace.NgZone }, { type: McListSelection, decorators: [{
                            type: i0.Inject,
                            args: [i0.forwardRef(function () { return McListSelection; })]
                        }] }, { type: i1__namespace.McOptgroup, decorators: [{
                            type: i0.Optional
                        }] }];
        }, propDecorators: { lines: [{
                    type: i0.ContentChildren,
                    args: [i1.McLine]
                }], text: [{
                    type: i0.ViewChild,
                    args: ['text', { static: false }]
                }], checkboxPosition: [{
                    type: i0.Input
                }], value: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], showCheckbox: [{
                    type: i0.Input
                }], selected: [{
                    type: i0.Input
                }] } });
    var MC_SELECTION_LIST_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return McListSelection; }),
        multi: true
    };
    var McListSelectionChange = /** @class */ (function () {
        function McListSelectionChange(source, option) {
            this.source = source;
            this.option = option;
        }
        return McListSelectionChange;
    }());
    var McListSelectionBase = /** @class */ (function () {
        function McListSelectionBase(elementRef) {
            this.elementRef = elementRef;
        }
        return McListSelectionBase;
    }());
    // tslint:disable-next-line:naming-convention
    var McListSelectionMixinBase = i1.mixinTabIndex(i1.mixinDisabled(McListSelectionBase));
    var McListSelection = /** @class */ (function (_super) {
        __extends(McListSelection, _super);
        function McListSelection(elementRef, changeDetectorRef, multiple) {
            var _this = _super.call(this, elementRef) || this;
            _this.changeDetectorRef = changeDetectorRef;
            _this._autoSelect = true;
            _this._noUnselectLast = true;
            _this.horizontal = false;
            _this._tabIndex = 0;
            _this.userTabIndex = null;
            // Emits a change event whenever the selected state of an option changes.
            _this.selectionChange = new i0.EventEmitter();
            /** Emits whenever the component is destroyed. */
            _this.destroyed = new rxjs.Subject();
            /**
             * Function used for comparing an option against the selected value when determining which
             * options should appear as selected. The first argument is the value of an options. The second
             * one is a value from the selected value. A boolean must be returned.
             */
            _this.compareWith = function (a1, a2) { return a1 === a2; };
            // View to model callback that should be called if the list or its options lost focus.
            // tslint:disable-next-line:no-empty
            _this.onTouched = function () { };
            // View to model callback that should be called whenever the selected options change.
            _this.onChange = function (_) { };
            if (multiple === i1.MultipleMode.CHECKBOX || multiple === i1.MultipleMode.KEYBOARD) {
                _this.multipleMode = multiple;
            }
            else if (multiple !== null) {
                _this.multipleMode = i1.MultipleMode.CHECKBOX;
            }
            if (_this.multipleMode === i1.MultipleMode.CHECKBOX) {
                _this.autoSelect = false;
                _this.noUnselectLast = false;
            }
            _this.selectionModel = new collections.SelectionModel(_this.multiple);
            return _this;
        }
        Object.defineProperty(McListSelection.prototype, "autoSelect", {
            get: function () {
                return this._autoSelect;
            },
            set: function (value) {
                this._autoSelect = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McListSelection.prototype, "noUnselectLast", {
            get: function () {
                return this._noUnselectLast;
            },
            set: function (value) {
                this._noUnselectLast = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McListSelection.prototype, "multiple", {
            get: function () {
                return !!this.multipleMode;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McListSelection.prototype, "tabIndex", {
            get: function () {
                return this.disabled ? -1 : this._tabIndex;
            },
            set: function (value) {
                this.userTabIndex = value;
                this._tabIndex = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McListSelection.prototype, "showCheckbox", {
            get: function () {
                return this.multipleMode === i1.MultipleMode.CHECKBOX;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McListSelection.prototype, "optionFocusChanges", {
            get: function () {
                return rxjs.merge.apply(void 0, __spreadArray([], __read(this.options.map(function (option) { return option.onFocus; }))));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McListSelection.prototype, "optionBlurChanges", {
            get: function () {
                return rxjs.merge.apply(void 0, __spreadArray([], __read(this.options.map(function (option) { return option.onBlur; }))));
            },
            enumerable: false,
            configurable: true
        });
        McListSelection.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.horizontal = i1.toBoolean(this.horizontal);
            this.keyManager = new a11y.FocusKeyManager(this.options)
                .withTypeAhead()
                .withVerticalOrientation(!this.horizontal)
                .withHorizontalOrientation(this.horizontal ? 'ltr' : null);
            this.keyManager.tabOut
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function () {
                _this._tabIndex = -1;
                setTimeout(function () {
                    _this._tabIndex = _this.userTabIndex || 0;
                    _this.changeDetectorRef.markForCheck();
                });
            });
            if (this._value) {
                this.setOptionsFromValues(this._value);
            }
            this.selectionModel.changed
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (event) {
                var e_1, _a, e_2, _b;
                try {
                    for (var _c = __values(event.added), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var item = _d.value;
                        item.selected = true;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                try {
                    for (var _e = __values(event.removed), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var item = _f.value;
                        item.selected = false;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            });
            this.options.changes
                .pipe(operators.startWith(null), operators.takeUntil(this.destroyed))
                .subscribe(function () {
                _this.resetOptions();
                // Check to see if we need to update our tab index
                _this.updateTabIndex();
            });
            this.updateScrollSize();
        };
        McListSelection.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        McListSelection.prototype.focus = function () {
            if (this.options.length === 0) {
                return;
            }
            this.keyManager.setFirstItemActive();
        };
        McListSelection.prototype.blur = function () {
            if (!this.hasFocusedOption()) {
                this.keyManager.setActiveItem(-1);
            }
            this.onTouched();
            this.changeDetectorRef.markForCheck();
        };
        McListSelection.prototype.selectAll = function () {
            this.options.forEach(function (option) { return option.setSelected(true); });
            this.reportValueChange();
        };
        McListSelection.prototype.deselectAll = function () {
            this.options.forEach(function (option) { return option.setSelected(false); });
            this.reportValueChange();
        };
        McListSelection.prototype.updateScrollSize = function () {
            if (this.horizontal || !this.options.first) {
                return;
            }
            this.keyManager.withScrollSize(Math.floor(this.getHeight() / this.options.first.getHeight()));
        };
        McListSelection.prototype.setSelectedOptionsByClick = function (option, shiftKey, ctrlKey) {
            if (shiftKey && this.multiple) {
                this.setSelectedOptions(option);
            }
            else if (ctrlKey) {
                if (!this.canDeselectLast(option)) {
                    return;
                }
                this.selectionModel.toggle(option);
            }
            else if (this.autoSelect) {
                this.selectionModel.clear();
                this.selectionModel.toggle(option);
            }
            else {
                this.selectionModel.toggle(option);
            }
            this.emitChangeEvent(option);
            this.reportValueChange();
        };
        McListSelection.prototype.setSelectedOptionsByKey = function (option, shiftKey, ctrlKey) {
            if (shiftKey && this.multiple) {
                this.setSelectedOptions(option);
            }
            else if (ctrlKey) {
                if (!this.canDeselectLast(option)) {
                    return;
                }
            }
            else {
                if (this.multipleMode === i1.MultipleMode.KEYBOARD || !this.multiple) {
                    this.options.forEach(function (item) { return item.setSelected(false); });
                    option.setSelected(true);
                }
            }
            this.emitChangeEvent(option);
            this.reportValueChange();
        };
        McListSelection.prototype.setSelectedOptions = function (option) {
            var _a;
            var _this = this;
            var selectedOptionState = option.selected;
            var fromIndex = this.keyManager.previousActiveItemIndex;
            var toIndex = this.keyManager.previousActiveItemIndex = this.keyManager.activeItemIndex;
            if (toIndex === fromIndex) {
                return;
            }
            if (fromIndex > toIndex) {
                _a = __read([toIndex, fromIndex], 2), fromIndex = _a[0], toIndex = _a[1];
            }
            this.options
                .toArray()
                .slice(fromIndex, toIndex + 1)
                .filter(function (item) { return !item.disabled; })
                .forEach(function (renderedOption) {
                var isLastRenderedOption = renderedOption === _this.keyManager.activeItem;
                if (isLastRenderedOption && renderedOption.selected && _this.noUnselectLast) {
                    return;
                }
                renderedOption.setSelected(!selectedOptionState);
            });
        };
        // Implemented as part of ControlValueAccessor.
        McListSelection.prototype.writeValue = function (values) {
            this._value = values;
            if (this.options) {
                this.setOptionsFromValues(values || []);
            }
        };
        // Implemented as part of ControlValueAccessor.
        McListSelection.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        // Implemented as part of ControlValueAccessor.
        McListSelection.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        // Implemented as a part of ControlValueAccessor.
        McListSelection.prototype.setDisabledState = function (isDisabled) {
            if (this.options) {
                this.options.forEach(function (option) { return option.disabled = isDisabled; });
            }
        };
        McListSelection.prototype.getSelectedOptionValues = function () {
            return this.options.filter(function (option) { return option.selected; }).map(function (option) { return option.value; });
        };
        // Toggles the selected state of the currently focused option.
        McListSelection.prototype.toggleFocusedOption = function () {
            var focusedIndex = this.keyManager.activeItemIndex;
            if (focusedIndex != null && this.isValidIndex(focusedIndex)) {
                var focusedOption = this.options.toArray()[focusedIndex];
                if (focusedOption && this.canDeselectLast(focusedOption)) {
                    focusedOption.toggle();
                    // Emit a change event because the focused option changed its state through user interaction.
                    this.emitChangeEvent(focusedOption);
                }
            }
        };
        McListSelection.prototype.canDeselectLast = function (listOption) {
            return !(this.noUnselectLast && this.selectionModel.selected.length === 1 && listOption.selected);
        };
        McListSelection.prototype.getHeight = function () {
            return this.elementRef.nativeElement.getClientRects()[0].height;
        };
        // Removes an option from the selection list and updates the active item.
        McListSelection.prototype.removeOptionFromList = function (option) {
            if (option.hasFocus) {
                var optionIndex = this.getOptionIndex(option);
                // Check whether the option is the last item
                if (optionIndex > 0) {
                    this.keyManager.setPreviousItemActive();
                }
                else if (optionIndex === 0 && this.options.length > 1) {
                    this.keyManager.setNextItemActive();
                }
            }
        };
        McListSelection.prototype.onKeyDown = function (event) {
            // tslint:disable-next-line: deprecation
            var keyCode = event.keyCode;
            switch (keyCode) {
                case keycodes.SPACE:
                case keycodes.ENTER:
                    this.toggleFocusedOption();
                    break;
                case keycodes.TAB:
                    this.keyManager.tabOut.next();
                    return;
                case keycodes.DOWN_ARROW:
                    this.keyManager.setNextItemActive();
                    break;
                case keycodes.UP_ARROW:
                    this.keyManager.setPreviousItemActive();
                    break;
                case keycodes.HOME:
                    this.keyManager.setFirstItemActive();
                    break;
                case keycodes.END:
                    this.keyManager.setLastItemActive();
                    break;
                case keycodes.PAGE_UP:
                    this.keyManager.setPreviousPageItemActive();
                    break;
                case keycodes.PAGE_DOWN:
                    this.keyManager.setNextPageItemActive();
                    break;
                default:
                    return;
            }
            event.preventDefault();
            this.setSelectedOptionsByKey(this.keyManager.activeItem, keycodes.hasModifierKey(event, 'shiftKey'), keycodes.hasModifierKey(event, 'ctrlKey'));
        };
        // Reports a value change to the ControlValueAccessor
        McListSelection.prototype.reportValueChange = function () {
            if (this.options) {
                var value = this.getSelectedOptionValues();
                this.onChange(value);
                this._value = value;
            }
        };
        // Emits a change event if the selected state of an option changed.
        McListSelection.prototype.emitChangeEvent = function (option) {
            this.selectionChange.emit(new McListSelectionChange(this, option));
        };
        McListSelection.prototype.updateTabIndex = function () {
            this._tabIndex = this.userTabIndex || (this.options.length === 0 ? -1 : 0);
        };
        McListSelection.prototype.resetOptions = function () {
            this.dropSubscriptions();
            this.listenToOptionsFocus();
        };
        McListSelection.prototype.dropSubscriptions = function () {
            if (this.optionFocusSubscription) {
                this.optionFocusSubscription.unsubscribe();
                this.optionFocusSubscription = null;
            }
            if (this.optionBlurSubscription) {
                this.optionBlurSubscription.unsubscribe();
                this.optionBlurSubscription = null;
            }
        };
        McListSelection.prototype.listenToOptionsFocus = function () {
            var _this = this;
            this.optionFocusSubscription = this.optionFocusChanges
                .subscribe(function (event) {
                var index = _this.options.toArray().indexOf(event.option);
                if (_this.isValidIndex(index)) {
                    _this.keyManager.updateActiveItem(index);
                }
            });
            this.optionBlurSubscription = this.optionBlurChanges
                .subscribe(function () { return _this.blur(); });
        };
        /** Checks whether any of the options is focused. */
        McListSelection.prototype.hasFocusedOption = function () {
            return this.options.some(function (option) { return option.hasFocus; });
        };
        // Returns the option with the specified value.
        McListSelection.prototype.getOptionByValue = function (value) {
            return this.options.find(function (option) { return option.value === value; });
        };
        // Sets the selected options based on the specified values.
        McListSelection.prototype.setOptionsFromValues = function (values) {
            var _this = this;
            this.options.forEach(function (option) { return option.setSelected(false); });
            values
                .map(function (value) { return _this.getOptionByValue(value); })
                .filter(Boolean)
                .forEach(function (option) { return option.setSelected(true); });
        };
        /**
         * Utility to ensure all indexes are valid.
         * @param index The index to be checked.
         * @returns True if the index is valid for our list of options.
         */
        McListSelection.prototype.isValidIndex = function (index) {
            return index >= 0 && index < this.options.length;
        };
        // Returns the index of the specified list option.
        McListSelection.prototype.getOptionIndex = function (option) {
            return this.options.toArray().indexOf(option);
        };
        return McListSelection;
    }(McListSelectionMixinBase));
    /** @nocollapse */ McListSelection.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McListSelection, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.ChangeDetectorRef }, { token: 'multiple', attribute: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McListSelection.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McListSelection, selector: "mc-list-selection", inputs: { disabled: "disabled", autoSelect: "autoSelect", noUnselectLast: "noUnselectLast", horizontal: "horizontal", tabIndex: "tabIndex", compareWith: "compareWith" }, outputs: { selectionChange: "selectionChange" }, host: { listeners: { "focus": "focus()", "blur": "blur()", "keydown": "onKeyDown($event)", "window:resize": "updateScrollSize()" }, properties: { "attr.tabindex": "tabIndex", "attr.disabled": "disabled || null" }, classAttribute: "mc-list-selection" }, providers: [MC_SELECTION_LIST_VALUE_ACCESSOR], queries: [{ propertyName: "options", predicate: McListOption, descendants: true }], exportAs: ["mcListSelection"], usesInheritance: true, ngImport: i0__namespace, template: '<ng-content></ng-content>', isInline: true, styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.mc-divider{display:block;margin:0}.mc-divider.mc-divider_horizontal{border-top-width:1px;border-top-width:var(--mc-divider-size-width, 1px);border-top-style:solid}.mc-divider.mc-divider_vertical{height:100%;border-right-width:1px;border-right-width:var(--mc-divider-size-width, 1px);border-right-style:solid}.mc-divider.mc-divider_inset{margin-left:80px;margin-left:var(--mc-divider-size-inset-margin, 80px)}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:80px;margin-right:var(--mc-divider-size-inset-margin, 80px)}.mc-list,.mc-list-selection{display:block;outline:none}.mc-list-item,.mc-list-option{display:block;height:28px;height:var(--mc-list-size-item-height, 28px);border:2px solid transparent}.mc-list-item .mc-list-item-content,.mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:100%;padding:0 16px;padding:0 var(--mc-list-size-horizontal-padding, 16px)}.mc-list-item.mc-2-line,.mc-list-option.mc-2-line{height:72px;height:var(--mc-list-size-two-line-height, 72px)}.mc-list-item.mc-3-line,.mc-list-option.mc-3-line{height:88px;height:var(--mc-list-size-three-line-height, 88px)}.mc-list-item.mc-multi-line,.mc-list-option.mc-multi-line{height:auto}.mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-top:var(--mc-list-size-multi-line-padding, 16px);padding-bottom:16px;padding-bottom:var(--mc-list-size-multi-line-padding, 16px)}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;width:var(--mc-list-size-icon-width, 24px);height:24px;height:var(--mc-list-size-icon-width, 24px);border-radius:50%;padding:4px;padding:var(--mc-list-size-icon-padding, 4px);font-size:24px;font-size:var(--mc-list-size-icon-width, 24px)}.mc-list-item .mc-list-icon~.mc-divider_inset,.mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:32pxvar(--mc-list-size-icon-width,24px)8px;width:100%-32pxvar(--mc-list-size-icon-width,24px)8px}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider_inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:auto;margin-right:32pxvar(--mc-list-size-icon-width,24px)8px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider_inset,.mc-list-option .mc-divider.mc-divider_inset{position:absolute}.mc-list-item .mc-pseudo-checkbox,.mc-list-option .mc-pseudo-checkbox{margin-right:8px}.mc-list-option:not([disabled]):not(.mc-disabled){cursor:pointer}\n"], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McListSelection, decorators: [{
                type: i0.Component,
                args: [{
                        exportAs: 'mcListSelection',
                        selector: 'mc-list-selection',
                        template: '<ng-content></ng-content>',
                        styleUrls: ['./list.scss'],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        inputs: ['disabled'],
                        host: {
                            class: 'mc-list-selection',
                            '[attr.tabindex]': 'tabIndex',
                            '[attr.disabled]': 'disabled || null',
                            '(focus)': 'focus()',
                            '(blur)': 'blur()',
                            '(keydown)': 'onKeyDown($event)',
                            '(window:resize)': 'updateScrollSize()'
                        },
                        providers: [MC_SELECTION_LIST_VALUE_ACCESSOR],
                        preserveWhitespaces: false
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.ChangeDetectorRef }, { type: i1__namespace.MultipleMode, decorators: [{
                            type: i0.Attribute,
                            args: ['multiple']
                        }] }];
        }, propDecorators: { options: [{
                    type: i0.ContentChildren,
                    args: [McListOption, { descendants: true }]
                }], autoSelect: [{
                    type: i0.Input
                }], noUnselectLast: [{
                    type: i0.Input
                }], horizontal: [{
                    type: i0.Input
                }], tabIndex: [{
                    type: i0.Input
                }], selectionChange: [{
                    type: i0.Output
                }], compareWith: [{
                    type: i0.Input
                }] } });

    // todo пока не делаем, перенесено из материала, но у нас в доках таких простых списков нет.
    var McList = /** @class */ (function () {
        function McList() {
        }
        return McList;
    }());
    /** @nocollapse */ McList.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McList, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McList.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McList, selector: "mc-list", host: { classAttribute: "mc-list" }, ngImport: i0__namespace, template: '<ng-content></ng-content>', isInline: true, styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.mc-divider{display:block;margin:0}.mc-divider.mc-divider_horizontal{border-top-width:1px;border-top-width:var(--mc-divider-size-width, 1px);border-top-style:solid}.mc-divider.mc-divider_vertical{height:100%;border-right-width:1px;border-right-width:var(--mc-divider-size-width, 1px);border-right-style:solid}.mc-divider.mc-divider_inset{margin-left:80px;margin-left:var(--mc-divider-size-inset-margin, 80px)}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:80px;margin-right:var(--mc-divider-size-inset-margin, 80px)}.mc-list,.mc-list-selection{display:block;outline:none}.mc-list-item,.mc-list-option{display:block;height:28px;height:var(--mc-list-size-item-height, 28px);border:2px solid transparent}.mc-list-item .mc-list-item-content,.mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:100%;padding:0 16px;padding:0 var(--mc-list-size-horizontal-padding, 16px)}.mc-list-item.mc-2-line,.mc-list-option.mc-2-line{height:72px;height:var(--mc-list-size-two-line-height, 72px)}.mc-list-item.mc-3-line,.mc-list-option.mc-3-line{height:88px;height:var(--mc-list-size-three-line-height, 88px)}.mc-list-item.mc-multi-line,.mc-list-option.mc-multi-line{height:auto}.mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-top:var(--mc-list-size-multi-line-padding, 16px);padding-bottom:16px;padding-bottom:var(--mc-list-size-multi-line-padding, 16px)}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;width:var(--mc-list-size-icon-width, 24px);height:24px;height:var(--mc-list-size-icon-width, 24px);border-radius:50%;padding:4px;padding:var(--mc-list-size-icon-padding, 4px);font-size:24px;font-size:var(--mc-list-size-icon-width, 24px)}.mc-list-item .mc-list-icon~.mc-divider_inset,.mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:32pxvar(--mc-list-size-icon-width,24px)8px;width:100%-32pxvar(--mc-list-size-icon-width,24px)8px}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider_inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:auto;margin-right:32pxvar(--mc-list-size-icon-width,24px)8px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider_inset,.mc-list-option .mc-divider.mc-divider_inset{position:absolute}.mc-list-item .mc-pseudo-checkbox,.mc-list-option .mc-pseudo-checkbox{margin-right:8px}.mc-list-option:not([disabled]):not(.mc-disabled){cursor:pointer}\n"], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McList, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-list',
                        host: { class: 'mc-list' },
                        template: '<ng-content></ng-content>',
                        styleUrls: ['./list.scss'],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None
                    }]
            }] });
    var McListItem = /** @class */ (function () {
        function McListItem(elementRef) {
            this.elementRef = elementRef;
        }
        McListItem.prototype.ngAfterContentInit = function () {
            // tslint:disable-next-line:no-unused-expression
            new i1.McLineSetter(this.lines, this.elementRef);
        };
        McListItem.prototype.handleFocus = function () {
            this.elementRef.nativeElement.classList.add('mc-focused');
        };
        McListItem.prototype.handleBlur = function () {
            this.elementRef.nativeElement.classList.remove('mc-focused');
        };
        McListItem.prototype.getHostElement = function () {
            return this.elementRef.nativeElement;
        };
        return McListItem;
    }());
    /** @nocollapse */ McListItem.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McListItem, deps: [{ token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McListItem.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McListItem, selector: "mc-list-item, a[mc-list-item]", host: { listeners: { "focus": "handleFocus()", "blur": "handleBlur()" }, classAttribute: "mc-list-item" }, queries: [{ propertyName: "lines", predicate: i1.McLine }], ngImport: i0__namespace, template: "<div class=\"mc-list-item-content\">\n    <ng-content select=\"[mc-list-icon], [mcListIcon]\"></ng-content>\n\n    <div class=\"mc-list-text\">\n        <ng-content select=\"[mc-line], [mcLine]\"></ng-content>\n    </div>\n\n    <ng-content></ng-content>\n</div>\n", changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McListItem, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-list-item, a[mc-list-item]',
                        host: {
                            class: 'mc-list-item',
                            '(focus)': 'handleFocus()',
                            '(blur)': 'handleBlur()'
                        },
                        templateUrl: './list-item.html',
                        encapsulation: i0.ViewEncapsulation.None,
                        preserveWhitespaces: false,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }]; }, propDecorators: { lines: [{
                    type: i0.ContentChildren,
                    args: [i1.McLine]
                }] } });

    var McListModule = /** @class */ (function () {
        function McListModule() {
        }
        return McListModule;
    }());
    /** @nocollapse */ McListModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McListModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ McListModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McListModule, declarations: [McList,
            McListSelection,
            McListItem,
            McListOption], imports: [i2.CommonModule,
            a11y$1.A11yModule,
            i1.McPseudoCheckboxModule,
            i1.McLineModule,
            i1.McOptionModule], exports: [McList,
            McListSelection,
            McListItem,
            McListOption,
            i1.McOptionModule] });
    /** @nocollapse */ McListModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McListModule, imports: [[
                i2.CommonModule,
                a11y$1.A11yModule,
                i1.McPseudoCheckboxModule,
                i1.McLineModule,
                i1.McOptionModule
            ], i1.McOptionModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McListModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i2.CommonModule,
                            a11y$1.A11yModule,
                            i1.McPseudoCheckboxModule,
                            i1.McLineModule,
                            i1.McOptionModule
                        ],
                        exports: [
                            McList,
                            McListSelection,
                            McListItem,
                            McListOption,
                            i1.McOptionModule
                        ],
                        declarations: [
                            McList,
                            McListSelection,
                            McListItem,
                            McListOption
                        ]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.MC_SELECTION_LIST_VALUE_ACCESSOR = MC_SELECTION_LIST_VALUE_ACCESSOR;
    exports.McList = McList;
    exports.McListItem = McListItem;
    exports.McListModule = McListModule;
    exports.McListOption = McListOption;
    exports.McListSelection = McListSelection;
    exports.McListSelectionBase = McListSelectionBase;
    exports.McListSelectionChange = McListSelectionChange;
    exports.McListSelectionMixinBase = McListSelectionMixinBase;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-list.umd.js.map
