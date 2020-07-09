(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/core'), require('@angular/cdk/coercion'), require('@angular/cdk/collections'), require('@angular/forms'), require('@ptsecurity/cdk/a11y'), require('@ptsecurity/cdk/keycodes'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/list', ['exports', '@angular/cdk/a11y', '@angular/common', '@angular/core', '@ptsecurity/mosaic/core', '@angular/cdk/coercion', '@angular/cdk/collections', '@angular/forms', '@ptsecurity/cdk/a11y', '@ptsecurity/cdk/keycodes', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.list = {}), global.ng.cdk.a11y, global.ng.common, global.ng.core, global.ptsecurity.mosaic.core, global.ng.cdk.coercion, global.ng.cdk.collections, global.ng.forms, global.a11y$1, global.keycodes, global.rxjs, global.rxjs.operators));
}(this, (function (exports, a11y, common, core, core$1, coercion, collections, forms, a11y$1, keycodes, rxjs, operators) { 'use strict';

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
     * Generated from: list-selection.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function McOptionEvent() { }
    if (false) {
        /** @type {?} */
        McOptionEvent.prototype.option;
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
            this._disabled = false;
            this._selected = false;
        }
        Object.defineProperty(McListOption.prototype, "disabled", {
            get: /**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var listSelectionDisabled = this.listSelection && this.listSelection.disabled;
                /** @type {?} */
                var groupDisabled = this.group && this.group.disabled;
                return listSelectionDisabled || groupDisabled || this._disabled;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                /** @type {?} */
                var newValue = core$1.toBoolean(value);
                if (newValue !== this._disabled) {
                    this._disabled = newValue;
                    this.changeDetector.markForCheck();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McListOption.prototype, "showCheckbox", {
            get: /**
             * @return {?}
             */
            function () {
                return this._showCheckbox !== undefined ? this._showCheckbox : this.listSelection.showCheckbox;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._showCheckbox = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McListOption.prototype, "selected", {
            get: /**
             * @return {?}
             */
            function () {
                return this.listSelection.selectionModel && this.listSelection.selectionModel.isSelected(this) || false;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                /** @type {?} */
                var isSelected = core$1.toBoolean(value);
                if (isSelected !== this._selected) {
                    this.setSelected(isSelected);
                    this.listSelection.reportValueChange();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McListOption.prototype, "tabIndex", {
            get: /**
             * @return {?}
             */
            function () {
                return this.disabled ? null : -1;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        McListOption.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this._selected) {
                // List options that are selected at initialization can't be reported properly to the form
                // control. This is because it takes some time until the selection-list knows about all
                // available options. Also it can happen that the ControlValueAccessor has an initial value
                // that should be used instead. Deferring the value change report to the next tick ensures
                // that the form control value is not being overwritten.
                /** @type {?} */
                var wasSelected_1 = this._selected;
                Promise.resolve().then((/**
                 * @return {?}
                 */
                function () {
                    if (_this._selected || wasSelected_1) {
                        _this.selected = true;
                        _this.changeDetector.markForCheck();
                    }
                }));
            }
        };
        /**
         * @return {?}
         */
        McListOption.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.selected) {
                // We have to delay this until the next tick in order
                // to avoid changed after checked errors.
                Promise.resolve().then((/**
                 * @return {?}
                 */
                function () { return _this.selected = false; }));
            }
            this.listSelection.removeOptionFromList(this);
        };
        /**
         * @return {?}
         */
        McListOption.prototype.toggle = /**
         * @return {?}
         */
        function () {
            this.selected = !this.selected;
        };
        /**
         * @return {?}
         */
        McListOption.prototype.getLabel = /**
         * @return {?}
         */
        function () {
            return this.text ? this.text.nativeElement.textContent : '';
        };
        /**
         * @param {?} selected
         * @return {?}
         */
        McListOption.prototype.setSelected = /**
         * @param {?} selected
         * @return {?}
         */
        function (selected) {
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
        /**
         * @return {?}
         */
        McListOption.prototype.getHeight = /**
         * @return {?}
         */
        function () {
            return this.elementRef.nativeElement.getClientRects()[0].height;
        };
        /**
         * @param {?} $event
         * @return {?}
         */
        McListOption.prototype.handleClick = /**
         * @param {?} $event
         * @return {?}
         */
        function ($event) {
            if (this.disabled) {
                return;
            }
            this.listSelection.setSelectedOptionsByClick(this, keycodes.hasModifierKey($event, 'shiftKey'), keycodes.hasModifierKey($event, 'ctrlKey'));
        };
        /**
         * @return {?}
         */
        McListOption.prototype.focus = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this.hasFocus) {
                this.elementRef.nativeElement.focus();
                this.onFocus.next({ option: this });
                Promise.resolve().then((/**
                 * @return {?}
                 */
                function () {
                    _this.hasFocus = true;
                    _this.changeDetector.markForCheck();
                }));
            }
        };
        /**
         * @return {?}
         */
        McListOption.prototype.blur = /**
         * @return {?}
         */
        function () {
            var _this = this;
            // When animations are enabled, Angular may end up removing the option from the DOM a little
            // earlier than usual, causing it to be blurred and throwing off the logic in the list
            // that moves focus not the next item. To work around the issue, we defer marking the option
            // as not focused until the next time the zone stabilizes.
            this.ngZone.onStable
                .asObservable()
                .pipe(operators.take(1))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.ngZone.run((/**
                 * @return {?}
                 */
                function () {
                    _this.hasFocus = false;
                    _this.onBlur.next({ option: _this });
                }));
            }));
        };
        /**
         * @return {?}
         */
        McListOption.prototype.getHostElement = /**
         * @return {?}
         */
        function () {
            return this.elementRef.nativeElement;
        };
        McListOption.decorators = [
            { type: core.Component, args: [{
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
                        template: "<div class=\"mc-list-item-content\">\n    <mc-pseudo-checkbox\n        *ngIf=\"showCheckbox\"\n        [state]=\"selected ? 'checked' : 'unchecked'\"\n        [disabled]=\"disabled\">\n    </mc-pseudo-checkbox>\n\n    <div class=\"mc-list-text\" #text>\n        <ng-content></ng-content>\n    </div>\n</div>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        McListOption.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef },
            { type: core.NgZone },
            { type: McListSelection, decorators: [{ type: core.Inject, args: [core.forwardRef((/**
                             * @return {?}
                             */
                            function () { return McListSelection; })),] }] },
            { type: core$1.McOptgroup, decorators: [{ type: core.Optional }] }
        ]; };
        McListOption.propDecorators = {
            lines: [{ type: core.ContentChildren, args: [core$1.McLine,] }],
            text: [{ type: core.ViewChild, args: ['text', { static: false },] }],
            checkboxPosition: [{ type: core.Input }],
            value: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            showCheckbox: [{ type: core.Input }],
            selected: [{ type: core.Input }]
        };
        return McListOption;
    }());
    if (false) {
        /** @type {?} */
        McListOption.prototype.hasFocus;
        /** @type {?} */
        McListOption.prototype.onFocus;
        /** @type {?} */
        McListOption.prototype.onBlur;
        /** @type {?} */
        McListOption.prototype.lines;
        /** @type {?} */
        McListOption.prototype.text;
        /** @type {?} */
        McListOption.prototype.checkboxPosition;
        /** @type {?} */
        McListOption.prototype.value;
        /**
         * @type {?}
         * @private
         */
        McListOption.prototype._disabled;
        /**
         * @type {?}
         * @private
         */
        McListOption.prototype._showCheckbox;
        /**
         * @type {?}
         * @private
         */
        McListOption.prototype._selected;
        /**
         * @type {?}
         * @private
         */
        McListOption.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        McListOption.prototype.changeDetector;
        /**
         * @type {?}
         * @private
         */
        McListOption.prototype.ngZone;
        /** @type {?} */
        McListOption.prototype.listSelection;
        /** @type {?} */
        McListOption.prototype.group;
    }
    /** @type {?} */
    var MC_SELECTION_LIST_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef((/**
         * @return {?}
         */
        function () { return McListSelection; })),
        multi: true
    };
    var McListSelectionChange = /** @class */ (function () {
        function McListSelectionChange(source, option) {
            this.source = source;
            this.option = option;
        }
        return McListSelectionChange;
    }());
    if (false) {
        /** @type {?} */
        McListSelectionChange.prototype.source;
        /** @type {?} */
        McListSelectionChange.prototype.option;
    }
    var McListSelectionBase = /** @class */ (function () {
        function McListSelectionBase(elementRef) {
            this.elementRef = elementRef;
        }
        return McListSelectionBase;
    }());
    if (false) {
        /** @type {?} */
        McListSelectionBase.prototype.elementRef;
    }
    // tslint:disable-next-line:naming-convention
    /** @type {?} */
    var McListSelectionMixinBase = core$1.mixinTabIndex(core$1.mixinDisabled(McListSelectionBase));
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
            _this.selectionChange = new core.EventEmitter();
            /**
             * Emits whenever the component is destroyed.
             */
            _this.destroyed = new rxjs.Subject();
            // View to model callback that should be called if the list or its options lost focus.
            // tslint:disable-next-line:no-empty
            _this.onTouched = (/**
             * @return {?}
             */
            function () { });
            // View to model callback that should be called whenever the selected options change.
            _this.onChange = (/**
             * @param {?} _
             * @return {?}
             */
            function (_) { });
            if (multiple === core$1.MultipleMode.CHECKBOX || multiple === core$1.MultipleMode.KEYBOARD) {
                _this.multipleMode = multiple;
            }
            else if (multiple !== null) {
                _this.multipleMode = core$1.MultipleMode.CHECKBOX;
            }
            if (_this.multipleMode === core$1.MultipleMode.CHECKBOX) {
                _this.autoSelect = false;
                _this.noUnselectLast = false;
            }
            _this.selectionModel = new collections.SelectionModel(_this.multiple);
            return _this;
        }
        Object.defineProperty(McListSelection.prototype, "autoSelect", {
            get: /**
             * @return {?}
             */
            function () {
                return this._autoSelect;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._autoSelect = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McListSelection.prototype, "noUnselectLast", {
            get: /**
             * @return {?}
             */
            function () {
                return this._noUnselectLast;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._noUnselectLast = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McListSelection.prototype, "multiple", {
            get: /**
             * @return {?}
             */
            function () {
                return !!this.multipleMode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McListSelection.prototype, "tabIndex", {
            get: /**
             * @return {?}
             */
            function () {
                return this.disabled ? -1 : this._tabIndex;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.userTabIndex = value;
                this._tabIndex = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McListSelection.prototype, "showCheckbox", {
            get: /**
             * @return {?}
             */
            function () {
                return this.multipleMode === core$1.MultipleMode.CHECKBOX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McListSelection.prototype, "optionFocusChanges", {
            get: /**
             * @return {?}
             */
            function () {
                return rxjs.merge.apply(void 0, __spread(this.options.map((/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) { return option.onFocus; }))));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McListSelection.prototype, "optionBlurChanges", {
            get: /**
             * @return {?}
             */
            function () {
                return rxjs.merge.apply(void 0, __spread(this.options.map((/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) { return option.onBlur; }))));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        McListSelection.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.horizontal = core$1.toBoolean(this.horizontal);
            this.keyManager = new a11y$1.FocusKeyManager(this.options)
                .withTypeAhead()
                .withVerticalOrientation(!this.horizontal)
                .withHorizontalOrientation(this.horizontal ? 'ltr' : null);
            this.keyManager.tabOut
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this._tabIndex = -1;
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this._tabIndex = _this.userTabIndex || 0;
                    _this.changeDetectorRef.markForCheck();
                }));
            }));
            if (this.tempValues) {
                this.setOptionsFromValues(this.tempValues);
                this.tempValues = null;
            }
            this.selectionModel.changed
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
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
            }));
            this.options.changes
                .pipe(operators.startWith(null), operators.takeUntil(this.destroyed))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.resetOptions();
                // Check to see if we need to update our tab index
                _this.updateTabIndex();
            }));
            this.updateScrollSize();
        };
        /**
         * @return {?}
         */
        McListSelection.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        /**
         * @return {?}
         */
        McListSelection.prototype.focus = /**
         * @return {?}
         */
        function () {
            if (this.options.length === 0) {
                return;
            }
            this.keyManager.setFirstItemActive();
        };
        /**
         * @return {?}
         */
        McListSelection.prototype.blur = /**
         * @return {?}
         */
        function () {
            if (!this.hasFocusedOption()) {
                this.keyManager.setActiveItem(-1);
            }
            this.onTouched();
            this.changeDetectorRef.markForCheck();
        };
        /**
         * @return {?}
         */
        McListSelection.prototype.selectAll = /**
         * @return {?}
         */
        function () {
            this.options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return option.setSelected(true); }));
            this.reportValueChange();
        };
        /**
         * @return {?}
         */
        McListSelection.prototype.deselectAll = /**
         * @return {?}
         */
        function () {
            this.options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return option.setSelected(false); }));
            this.reportValueChange();
        };
        /**
         * @return {?}
         */
        McListSelection.prototype.updateScrollSize = /**
         * @return {?}
         */
        function () {
            if (this.horizontal || !this.options.first) {
                return;
            }
            this.keyManager.withScrollSize(Math.floor(this.getHeight() / this.options.first.getHeight()));
        };
        /**
         * @param {?} option
         * @param {?} shiftKey
         * @param {?} ctrlKey
         * @return {?}
         */
        McListSelection.prototype.setSelectedOptionsByClick = /**
         * @param {?} option
         * @param {?} shiftKey
         * @param {?} ctrlKey
         * @return {?}
         */
        function (option, shiftKey, ctrlKey) {
            if (shiftKey && this.multiple) {
                this.setSelectedOptions(option);
            }
            else if (ctrlKey) {
                if (!this.canDeselectLast(option)) {
                    return;
                }
                this.selectionModel.toggle(option);
            }
            else {
                if (this.autoSelect) {
                    if (this.multipleMode !== core$1.MultipleMode.KEYBOARD) {
                        this.selectionModel.toggle(option);
                    }
                    if (this.multipleMode === core$1.MultipleMode.KEYBOARD || !this.multiple) {
                        this.options.forEach((/**
                         * @param {?} item
                         * @return {?}
                         */
                        function (item) { return item.setSelected(false); }));
                        option.setSelected(true);
                    }
                }
            }
            this.emitChangeEvent(option);
            this.reportValueChange();
        };
        /**
         * @param {?} option
         * @param {?} shiftKey
         * @param {?} ctrlKey
         * @return {?}
         */
        McListSelection.prototype.setSelectedOptionsByKey = /**
         * @param {?} option
         * @param {?} shiftKey
         * @param {?} ctrlKey
         * @return {?}
         */
        function (option, shiftKey, ctrlKey) {
            if (shiftKey && this.multiple) {
                this.setSelectedOptions(option);
            }
            else if (ctrlKey) {
                if (!this.canDeselectLast(option)) {
                    return;
                }
            }
            else {
                if (this.multipleMode === core$1.MultipleMode.KEYBOARD || !this.multiple) {
                    this.options.forEach((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) { return item.setSelected(false); }));
                    option.setSelected(true);
                }
            }
            this.emitChangeEvent(option);
            this.reportValueChange();
        };
        /**
         * @param {?} option
         * @return {?}
         */
        McListSelection.prototype.setSelectedOptions = /**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            var _a;
            var _this = this;
            /** @type {?} */
            var selectedOptionState = option.selected;
            /** @type {?} */
            var fromIndex = this.keyManager.previousActiveItemIndex;
            /** @type {?} */
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
                .filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return !item.disabled; }))
                .forEach((/**
             * @param {?} renderedOption
             * @return {?}
             */
            function (renderedOption) {
                /** @type {?} */
                var isLastRenderedOption = renderedOption === _this.keyManager.activeItem;
                if (isLastRenderedOption && renderedOption.selected && _this.noUnselectLast) {
                    return;
                }
                renderedOption.setSelected(!selectedOptionState);
            }));
        };
        // Implemented as part of ControlValueAccessor.
        // Implemented as part of ControlValueAccessor.
        /**
         * @param {?} values
         * @return {?}
         */
        McListSelection.prototype.writeValue = 
        // Implemented as part of ControlValueAccessor.
        /**
         * @param {?} values
         * @return {?}
         */
        function (values) {
            if (this.options) {
                this.setOptionsFromValues(values || []);
            }
            else {
                this.tempValues = values;
            }
        };
        // Implemented as part of ControlValueAccessor.
        // Implemented as part of ControlValueAccessor.
        /**
         * @param {?} fn
         * @return {?}
         */
        McListSelection.prototype.registerOnChange = 
        // Implemented as part of ControlValueAccessor.
        /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onChange = fn;
        };
        // Implemented as part of ControlValueAccessor.
        // Implemented as part of ControlValueAccessor.
        /**
         * @param {?} fn
         * @return {?}
         */
        McListSelection.prototype.registerOnTouched = 
        // Implemented as part of ControlValueAccessor.
        /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onTouched = fn;
        };
        // Implemented as a part of ControlValueAccessor.
        // Implemented as a part of ControlValueAccessor.
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        McListSelection.prototype.setDisabledState = 
        // Implemented as a part of ControlValueAccessor.
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        function (isDisabled) {
            if (this.options) {
                this.options.forEach((/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) { return option.disabled = isDisabled; }));
            }
        };
        /**
         * @return {?}
         */
        McListSelection.prototype.getSelectedOptionValues = /**
         * @return {?}
         */
        function () {
            return this.options.filter((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return option.selected; })).map((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return option.value; }));
        };
        // Toggles the selected state of the currently focused option.
        // Toggles the selected state of the currently focused option.
        /**
         * @return {?}
         */
        McListSelection.prototype.toggleFocusedOption = 
        // Toggles the selected state of the currently focused option.
        /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var focusedIndex = this.keyManager.activeItemIndex;
            if (focusedIndex != null && this.isValidIndex(focusedIndex)) {
                /** @type {?} */
                var focusedOption = this.options.toArray()[focusedIndex];
                if (focusedOption && this.canDeselectLast(focusedOption)) {
                    focusedOption.toggle();
                    // Emit a change event because the focused option changed its state through user interaction.
                    this.emitChangeEvent(focusedOption);
                }
            }
        };
        /**
         * @param {?} listOption
         * @return {?}
         */
        McListSelection.prototype.canDeselectLast = /**
         * @param {?} listOption
         * @return {?}
         */
        function (listOption) {
            return !(this.noUnselectLast && this.selectionModel.selected.length === 1 && listOption.selected);
        };
        /**
         * @return {?}
         */
        McListSelection.prototype.getHeight = /**
         * @return {?}
         */
        function () {
            return this.elementRef.nativeElement.getClientRects()[0].height;
        };
        // Removes an option from the selection list and updates the active item.
        // Removes an option from the selection list and updates the active item.
        /**
         * @param {?} option
         * @return {?}
         */
        McListSelection.prototype.removeOptionFromList = 
        // Removes an option from the selection list and updates the active item.
        /**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            if (option.hasFocus) {
                /** @type {?} */
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
        /**
         * @param {?} event
         * @return {?}
         */
        McListSelection.prototype.onKeyDown = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // tslint:disable-next-line: deprecation
            /** @type {?} */
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
            this.setSelectedOptionsByKey((/** @type {?} */ (this.keyManager.activeItem)), keycodes.hasModifierKey(event, 'shiftKey'), keycodes.hasModifierKey(event, 'ctrlKey'));
        };
        // Reports a value change to the ControlValueAccessor
        // Reports a value change to the ControlValueAccessor
        /**
         * @return {?}
         */
        McListSelection.prototype.reportValueChange = 
        // Reports a value change to the ControlValueAccessor
        /**
         * @return {?}
         */
        function () {
            if (this.options) {
                this.onChange(this.getSelectedOptionValues());
            }
        };
        // Emits a change event if the selected state of an option changed.
        // Emits a change event if the selected state of an option changed.
        /**
         * @param {?} option
         * @return {?}
         */
        McListSelection.prototype.emitChangeEvent = 
        // Emits a change event if the selected state of an option changed.
        /**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            this.selectionChange.emit(new McListSelectionChange(this, option));
        };
        /**
         * @protected
         * @return {?}
         */
        McListSelection.prototype.updateTabIndex = /**
         * @protected
         * @return {?}
         */
        function () {
            this._tabIndex = this.userTabIndex || (this.options.length === 0 ? -1 : 0);
        };
        /**
         * @private
         * @return {?}
         */
        McListSelection.prototype.resetOptions = /**
         * @private
         * @return {?}
         */
        function () {
            this.dropSubscriptions();
            this.listenToOptionsFocus();
        };
        /**
         * @private
         * @return {?}
         */
        McListSelection.prototype.dropSubscriptions = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.optionFocusSubscription) {
                this.optionFocusSubscription.unsubscribe();
                this.optionFocusSubscription = null;
            }
            if (this.optionBlurSubscription) {
                this.optionBlurSubscription.unsubscribe();
                this.optionBlurSubscription = null;
            }
        };
        /**
         * @private
         * @return {?}
         */
        McListSelection.prototype.listenToOptionsFocus = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.optionFocusSubscription = this.optionFocusChanges
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                /** @type {?} */
                var index = _this.options.toArray().indexOf(event.option);
                if (_this.isValidIndex(index)) {
                    _this.keyManager.updateActiveItem(index);
                }
            }));
            this.optionBlurSubscription = this.optionBlurChanges
                .subscribe((/**
             * @return {?}
             */
            function () { return _this.blur(); }));
        };
        /** Checks whether any of the options is focused. */
        /**
         * Checks whether any of the options is focused.
         * @private
         * @return {?}
         */
        McListSelection.prototype.hasFocusedOption = /**
         * Checks whether any of the options is focused.
         * @private
         * @return {?}
         */
        function () {
            return this.options.some((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return option.hasFocus; }));
        };
        // Returns the option with the specified value.
        // Returns the option with the specified value.
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        McListSelection.prototype.getOptionByValue = 
        // Returns the option with the specified value.
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return this.options.find((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return option.value === value; }));
        };
        // Sets the selected options based on the specified values.
        // Sets the selected options based on the specified values.
        /**
         * @private
         * @param {?} values
         * @return {?}
         */
        McListSelection.prototype.setOptionsFromValues = 
        // Sets the selected options based on the specified values.
        /**
         * @private
         * @param {?} values
         * @return {?}
         */
        function (values) {
            var _this = this;
            this.options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return option.setSelected(false); }));
            values
                .map((/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return _this.getOptionByValue(value); }))
                .filter(Boolean)
                .forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return (/** @type {?} */ (option)).setSelected(true); }));
        };
        /**
         * Utility to ensure all indexes are valid.
         * @param index The index to be checked.
         * @returns True if the index is valid for our list of options.
         */
        /**
         * Utility to ensure all indexes are valid.
         * @private
         * @param {?} index The index to be checked.
         * @return {?} True if the index is valid for our list of options.
         */
        McListSelection.prototype.isValidIndex = /**
         * Utility to ensure all indexes are valid.
         * @private
         * @param {?} index The index to be checked.
         * @return {?} True if the index is valid for our list of options.
         */
        function (index) {
            return index >= 0 && index < this.options.length;
        };
        // Returns the index of the specified list option.
        // Returns the index of the specified list option.
        /**
         * @private
         * @param {?} option
         * @return {?}
         */
        McListSelection.prototype.getOptionIndex = 
        // Returns the index of the specified list option.
        /**
         * @private
         * @param {?} option
         * @return {?}
         */
        function (option) {
            return this.options.toArray().indexOf(option);
        };
        McListSelection.decorators = [
            { type: core.Component, args: [{
                        exportAs: 'mcListSelection',
                        selector: 'mc-list-selection',
                        template: '<ng-content></ng-content>',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
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
                        preserveWhitespaces: false,
                        styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider_vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider_inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:80px}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-list,.mc-list-selection{display:block;outline:0}.mc-list-item,.mc-list-option{display:block;height:28px;border:2px solid transparent}.mc-list-item .mc-list-item-content,.mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:100%;padding:0 15px}.mc-list-item.mc-2-line,.mc-list-option.mc-2-line{height:72px}.mc-list-item.mc-3-line,.mc-list-option.mc-3-line{height:88px}.mc-list-item.mc-multi-line,.mc-list-option.mc-multi-line{height:auto}.mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-bottom:16px}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;height:24px;border-radius:50%;padding:4px;font-size:24px}.mc-list-item .mc-list-icon~.mc-divider_inset,.mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider_inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:auto;margin-right:62px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider_inset,.mc-list-option .mc-divider.mc-divider_inset{position:absolute}.mc-list-item .mc-pseudo-checkbox,.mc-list-option .mc-pseudo-checkbox{margin-right:8px}.mc-list-option:not([disabled]):not(.mc-disabled){cursor:pointer}"]
                    }] }
        ];
        /** @nocollapse */
        McListSelection.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef },
            { type: core$1.MultipleMode, decorators: [{ type: core.Attribute, args: ['multiple',] }] }
        ]; };
        McListSelection.propDecorators = {
            options: [{ type: core.ContentChildren, args: [McListOption, { descendants: true },] }],
            autoSelect: [{ type: core.Input }],
            noUnselectLast: [{ type: core.Input }],
            horizontal: [{ type: core.Input }],
            tabIndex: [{ type: core.Input }],
            selectionChange: [{ type: core.Output }]
        };
        return McListSelection;
    }(McListSelectionMixinBase));
    if (false) {
        /** @type {?} */
        McListSelection.prototype.keyManager;
        /** @type {?} */
        McListSelection.prototype.options;
        /**
         * @type {?}
         * @private
         */
        McListSelection.prototype._autoSelect;
        /**
         * @type {?}
         * @private
         */
        McListSelection.prototype._noUnselectLast;
        /** @type {?} */
        McListSelection.prototype.multipleMode;
        /** @type {?} */
        McListSelection.prototype.horizontal;
        /**
         * @type {?}
         * @private
         */
        McListSelection.prototype._tabIndex;
        /** @type {?} */
        McListSelection.prototype.userTabIndex;
        /** @type {?} */
        McListSelection.prototype.selectionChange;
        /** @type {?} */
        McListSelection.prototype.selectionModel;
        /**
         * @type {?}
         * @private
         */
        McListSelection.prototype.tempValues;
        /**
         * Emits whenever the component is destroyed.
         * @type {?}
         * @private
         */
        McListSelection.prototype.destroyed;
        /**
         * @type {?}
         * @private
         */
        McListSelection.prototype.optionFocusSubscription;
        /**
         * @type {?}
         * @private
         */
        McListSelection.prototype.optionBlurSubscription;
        /** @type {?} */
        McListSelection.prototype.onTouched;
        /**
         * @type {?}
         * @private
         */
        McListSelection.prototype.onChange;
        /**
         * @type {?}
         * @private
         */
        McListSelection.prototype.changeDetectorRef;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: list.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McList = /** @class */ (function () {
        function McList() {
        }
        McList.decorators = [
            { type: core.Component, args: [{
                        selector: 'mc-list',
                        host: { class: 'mc-list' },
                        template: '<ng-content></ng-content>',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider_vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider_inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:80px}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-list,.mc-list-selection{display:block;outline:0}.mc-list-item,.mc-list-option{display:block;height:28px;border:2px solid transparent}.mc-list-item .mc-list-item-content,.mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:100%;padding:0 15px}.mc-list-item.mc-2-line,.mc-list-option.mc-2-line{height:72px}.mc-list-item.mc-3-line,.mc-list-option.mc-3-line{height:88px}.mc-list-item.mc-multi-line,.mc-list-option.mc-multi-line{height:auto}.mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-bottom:16px}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;height:24px;border-radius:50%;padding:4px;font-size:24px}.mc-list-item .mc-list-icon~.mc-divider_inset,.mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider_inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:auto;margin-right:62px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider_inset,.mc-list-option .mc-divider.mc-divider_inset{position:absolute}.mc-list-item .mc-pseudo-checkbox,.mc-list-option .mc-pseudo-checkbox{margin-right:8px}.mc-list-option:not([disabled]):not(.mc-disabled){cursor:pointer}"]
                    }] }
        ];
        return McList;
    }());
    var McListItem = /** @class */ (function () {
        function McListItem(elementRef) {
            this.elementRef = elementRef;
        }
        /**
         * @return {?}
         */
        McListItem.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            // tslint:disable-next-line:no-unused-expression
            new core$1.McLineSetter(this.lines, this.elementRef);
        };
        /**
         * @return {?}
         */
        McListItem.prototype.handleFocus = /**
         * @return {?}
         */
        function () {
            this.elementRef.nativeElement.classList.add('mc-focused');
        };
        /**
         * @return {?}
         */
        McListItem.prototype.handleBlur = /**
         * @return {?}
         */
        function () {
            this.elementRef.nativeElement.classList.remove('mc-focused');
        };
        /**
         * @return {?}
         */
        McListItem.prototype.getHostElement = /**
         * @return {?}
         */
        function () {
            return this.elementRef.nativeElement;
        };
        McListItem.decorators = [
            { type: core.Component, args: [{
                        selector: 'mc-list-item, a[mc-list-item]',
                        host: {
                            class: 'mc-list-item',
                            '(focus)': 'handleFocus()',
                            '(blur)': 'handleBlur()'
                        },
                        template: "<div class=\"mc-list-item-content\">\n    <ng-content select=\"[mc-list-icon], [mcListIcon]\"></ng-content>\n\n    <div class=\"mc-list-text\">\n        <ng-content select=\"[mc-line], [mcLine]\"></ng-content>\n    </div>\n\n    <ng-content></ng-content>\n</div>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        McListItem.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        McListItem.propDecorators = {
            lines: [{ type: core.ContentChildren, args: [core$1.McLine,] }]
        };
        return McListItem;
    }());
    if (false) {
        /** @type {?} */
        McListItem.prototype.lines;
        /**
         * @type {?}
         * @private
         */
        McListItem.prototype.elementRef;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: list.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McListModule = /** @class */ (function () {
        function McListModule() {
        }
        McListModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            a11y.A11yModule,
                            core$1.McPseudoCheckboxModule,
                            core$1.McLineModule,
                            core$1.McOptionModule
                        ],
                        exports: [
                            McList,
                            McListSelection,
                            McListItem,
                            McListOption,
                            core$1.McOptionModule
                        ],
                        declarations: [
                            McList,
                            McListSelection,
                            McListItem,
                            McListOption
                        ]
                    },] }
        ];
        return McListModule;
    }());

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
