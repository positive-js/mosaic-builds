(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/coercion'), require('@angular/core'), require('@angular/forms'), require('@ptsecurity/mosaic/core'), require('@ptsecurity/mosaic/form-field'), require('rxjs'), require('@angular/cdk/a11y'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/textarea', ['exports', '@angular/cdk/coercion', '@angular/core', '@angular/forms', '@ptsecurity/mosaic/core', '@ptsecurity/mosaic/form-field', 'rxjs', '@angular/cdk/a11y', '@angular/common'], factory) :
    (global = global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.textarea = {}), global.ng.cdk.coercion, global.ng.core, global.ng.forms, global.ptsecurity.mosaic.core, global.ptsecurity.mosaic['form-field'], global.rxjs, global.ng.cdk.a11y, global.ng.common));
}(this, (function (exports, coercion, core, forms, core$1, formField, rxjs, a11y, common) { 'use strict';

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
     * Generated from: textarea.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var MC_TEXTAREA_VALUE_ACCESSOR = new core.InjectionToken('MC_TEXTAREA_VALUE_ACCESSOR');
    /** @type {?} */
    var nextUniqueId = 0;
    var McTextareaBase = /** @class */ (function () {
        function McTextareaBase(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
            this.defaultErrorStateMatcher = defaultErrorStateMatcher;
            this.parentForm = parentForm;
            this.parentFormGroup = parentFormGroup;
            this.ngControl = ngControl;
        }
        return McTextareaBase;
    }());
    if (false) {
        /** @type {?} */
        McTextareaBase.prototype.defaultErrorStateMatcher;
        /** @type {?} */
        McTextareaBase.prototype.parentForm;
        /** @type {?} */
        McTextareaBase.prototype.parentFormGroup;
        /** @type {?} */
        McTextareaBase.prototype.ngControl;
    }
    // tslint:disable-next-line:naming-convention
    /** @type {?} */
    var McTextareaMixinBase = core$1.mixinErrorState(McTextareaBase);
    var McTextarea = /** @class */ (function (_super) {
        __extends(McTextarea, _super);
        function McTextarea(elementRef, ngControl, parentForm, parentFormGroup, defaultErrorStateMatcher, inputValueAccessor, ngZone) {
            var _this = _super.call(this, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) || this;
            _this.elementRef = elementRef;
            _this.ngControl = ngControl;
            _this.ngZone = ngZone;
            _this.canGrow = true;
            /**
             * Implemented as part of McFormFieldControl.
             * \@docs-private
             */
            _this.focused = false;
            /**
             * Implemented as part of McFormFieldControl.
             * \@docs-private
             */
            _this.stateChanges = new rxjs.Subject();
            /**
             * Implemented as part of McFormFieldControl.
             * \@docs-private
             */
            _this.controlType = 'mc-textarea';
            _this.uid = "mc-textsrea-" + nextUniqueId++;
            _this._disabled = false;
            _this._required = false;
            _this.lineHeight = 0;
            _this.freeRowsHeight = 0;
            _this.minHeight = 0;
            // If no input value accessor was explicitly specified, use the element as the textarea value
            // accessor.
            _this.valueAccessor = inputValueAccessor || _this.elementRef.nativeElement;
            _this.previousNativeValue = _this.value;
            // Force setter to be called in case id was not specified.
            _this.id = _this.id;
            /** @type {?} */
            var growObserver = rxjs.fromEvent(elementRef.nativeElement, 'input');
            _this.growSubscription = growObserver.subscribe(_this.grow.bind(_this));
            return _this;
        }
        Object.defineProperty(McTextarea.prototype, "disabled", {
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            get: /**
             * Implemented as part of McFormFieldControl.
             * \@docs-private
             * @return {?}
             */
            function () {
                if (this.ngControl && this.ngControl.disabled !== null) {
                    return this.ngControl.disabled;
                }
                return this._disabled;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
                if (this.focused) {
                    this.focused = false;
                    this.stateChanges.next();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McTextarea.prototype, "id", {
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            get: /**
             * Implemented as part of McFormFieldControl.
             * \@docs-private
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
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McTextarea.prototype, "required", {
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            get: /**
             * Implemented as part of McFormFieldControl.
             * \@docs-private
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
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McTextarea.prototype, "value", {
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            get: /**
             * Implemented as part of McFormFieldControl.
             * \@docs-private
             * @return {?}
             */
            function () {
                return this.valueAccessor.value;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value !== this.value) {
                    this.valueAccessor.value = value;
                    this.stateChanges.next();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        McTextarea.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            setTimeout((/**
             * @return {?}
             */
            function () { return _this.grow(); }), 0);
            this.lineHeight = parseInt((/** @type {?} */ (getComputedStyle(this.elementRef.nativeElement).lineHeight)), 10);
            /** @type {?} */
            var paddingTop = parseInt((/** @type {?} */ (getComputedStyle(this.elementRef.nativeElement).paddingTop)), 10);
            /** @type {?} */
            var paddingBottom = parseInt((/** @type {?} */ (getComputedStyle(this.elementRef.nativeElement).paddingBottom)), 10);
            // tslint:disable-next-line:no-magic-numbers
            this.minHeight = this.lineHeight * 2 + paddingTop + paddingBottom;
            this.freeRowsHeight = this.lineHeight;
        };
        /**
         * @return {?}
         */
        McTextarea.prototype.ngOnChanges = /**
         * @return {?}
         */
        function () {
            this.stateChanges.next();
        };
        /**
         * @return {?}
         */
        McTextarea.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.stateChanges.complete();
            this.growSubscription.unsubscribe();
        };
        /**
         * @return {?}
         */
        McTextarea.prototype.ngDoCheck = /**
         * @return {?}
         */
        function () {
            if (this.ngControl) {
                // We need to re-evaluate this on every change detection cycle, because there are some
                // error triggers that we can't subscribe to (e.g. parent form submissions). This means
                // that whatever logic is in here has to be super lean or we risk destroying the performance.
                this.updateErrorState();
            }
            // We need to dirty-check the native element's value, because there are some cases where
            // we won't be notified when it changes (e.g. the consumer isn't using forms or they're
            // updating the value using `emitEvent: false`).
            this.dirtyCheckNativeValue();
        };
        /** Grow textarea height to avoid vertical scroll  */
        /**
         * Grow textarea height to avoid vertical scroll
         * @return {?}
         */
        McTextarea.prototype.grow = /**
         * Grow textarea height to avoid vertical scroll
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this.canGrow) {
                return;
            }
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var textarea = _this.elementRef.nativeElement;
                /** @type {?} */
                var outerHeight = parseInt((/** @type {?} */ (window.getComputedStyle(textarea).height)), 10);
                /** @type {?} */
                var diff = outerHeight - textarea.clientHeight;
                textarea.style.minHeight = 0; // this line is important to height recalculation
                // this line is important to height recalculation
                /** @type {?} */
                var height = Math.max(_this.minHeight, +textarea.scrollHeight + diff + _this.freeRowsHeight);
                textarea.style.minHeight = height + "px";
            }));
        };
        /** Focuses the textarea. */
        /**
         * Focuses the textarea.
         * @return {?}
         */
        McTextarea.prototype.focus = /**
         * Focuses the textarea.
         * @return {?}
         */
        function () {
            this.elementRef.nativeElement.focus();
        };
        /** Callback for the cases where the focused state of the textarea changes. */
        /**
         * Callback for the cases where the focused state of the textarea changes.
         * @param {?} isFocused
         * @return {?}
         */
        McTextarea.prototype.focusChanged = /**
         * Callback for the cases where the focused state of the textarea changes.
         * @param {?} isFocused
         * @return {?}
         */
        function (isFocused) {
            if (isFocused !== this.focused) {
                this.focused = isFocused;
                this.stateChanges.next();
            }
        };
        Object.defineProperty(McTextarea.prototype, "empty", {
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            get: /**
             * Implemented as part of McFormFieldControl.
             * \@docs-private
             * @return {?}
             */
            function () {
                return !this.elementRef.nativeElement.value && !this.isBadInput();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        McTextarea.prototype.onContainerClick = /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            this.focus();
        };
        /** Does some manual dirty checking on the native textarea `value` property. */
        /**
         * Does some manual dirty checking on the native textarea `value` property.
         * @protected
         * @return {?}
         */
        McTextarea.prototype.dirtyCheckNativeValue = /**
         * Does some manual dirty checking on the native textarea `value` property.
         * @protected
         * @return {?}
         */
        function () {
            /** @type {?} */
            var newValue = this.value;
            if (this.previousNativeValue !== newValue) {
                this.previousNativeValue = newValue;
                this.stateChanges.next();
            }
        };
        /** Checks whether the textarea is invalid based on the native validation. */
        /**
         * Checks whether the textarea is invalid based on the native validation.
         * @protected
         * @return {?}
         */
        McTextarea.prototype.isBadInput = /**
         * Checks whether the textarea is invalid based on the native validation.
         * @protected
         * @return {?}
         */
        function () {
            // The `validity` property won't be present on platform-server.
            /** @type {?} */
            var validity = ((/** @type {?} */ (this.elementRef.nativeElement))).validity;
            return validity && validity.badInput;
        };
        McTextarea.decorators = [
            { type: core.Directive, args: [{
                        selector: 'textarea[mcTextarea]',
                        exportAs: 'mcTextarea',
                        host: {
                            class: 'mc-textarea',
                            '[class.mc-textarea-resizable]': '!canGrow',
                            '[attr.id]': 'id',
                            '[attr.placeholder]': 'placeholder',
                            '[attr.aria-invalid]': 'errorState',
                            '[attr.disabled]': 'disabled || null',
                            '[attr.required]': 'required',
                            '(blur)': 'focusChanged(false)',
                            '(focus)': 'focusChanged(true)'
                        },
                        providers: [{ provide: formField.McFormFieldControl, useExisting: McTextarea }]
                    },] }
        ];
        /** @nocollapse */
        McTextarea.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: forms.NgControl, decorators: [{ type: core.Optional }, { type: core.Self }] },
            { type: forms.NgForm, decorators: [{ type: core.Optional }] },
            { type: forms.FormGroupDirective, decorators: [{ type: core.Optional }] },
            { type: core$1.ErrorStateMatcher },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Self }, { type: core.Inject, args: [MC_TEXTAREA_VALUE_ACCESSOR,] }] },
            { type: core.NgZone }
        ]; };
        McTextarea.propDecorators = {
            canGrow: [{ type: core.Input }],
            errorStateMatcher: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            id: [{ type: core.Input }],
            placeholder: [{ type: core.Input }],
            required: [{ type: core.Input }],
            value: [{ type: core.Input }]
        };
        return McTextarea;
    }(McTextareaMixinBase));
    if (false) {
        /** @type {?} */
        McTextarea.prototype.canGrow;
        /**
         * An object used to control when error messages are shown.
         * @type {?}
         */
        McTextarea.prototype.errorStateMatcher;
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @type {?}
         */
        McTextarea.prototype.focused;
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @type {?}
         */
        McTextarea.prototype.stateChanges;
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @type {?}
         */
        McTextarea.prototype.controlType;
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @type {?}
         */
        McTextarea.prototype.placeholder;
        /**
         * @type {?}
         * @protected
         */
        McTextarea.prototype.uid;
        /**
         * @type {?}
         * @protected
         */
        McTextarea.prototype.previousNativeValue;
        /**
         * @type {?}
         * @private
         */
        McTextarea.prototype._disabled;
        /**
         * @type {?}
         * @private
         */
        McTextarea.prototype._id;
        /**
         * @type {?}
         * @private
         */
        McTextarea.prototype._required;
        /**
         * @type {?}
         * @private
         */
        McTextarea.prototype.valueAccessor;
        /**
         * @type {?}
         * @private
         */
        McTextarea.prototype.growSubscription;
        /**
         * @type {?}
         * @private
         */
        McTextarea.prototype.lineHeight;
        /**
         * @type {?}
         * @private
         */
        McTextarea.prototype.freeRowsHeight;
        /**
         * @type {?}
         * @private
         */
        McTextarea.prototype.minHeight;
        /**
         * @type {?}
         * @protected
         */
        McTextarea.prototype.elementRef;
        /** @type {?} */
        McTextarea.prototype.ngControl;
        /**
         * @type {?}
         * @private
         */
        McTextarea.prototype.ngZone;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: textarea.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McTextareaModule = /** @class */ (function () {
        function McTextareaModule() {
        }
        McTextareaModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, a11y.A11yModule, core$1.McCommonModule, forms.FormsModule],
                        exports: [McTextarea],
                        declarations: [McTextarea]
                    },] }
        ];
        return McTextareaModule;
    }());

    exports.MC_TEXTAREA_VALUE_ACCESSOR = MC_TEXTAREA_VALUE_ACCESSOR;
    exports.McTextarea = McTextarea;
    exports.McTextareaBase = McTextareaBase;
    exports.McTextareaMixinBase = McTextareaMixinBase;
    exports.McTextareaModule = McTextareaModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-textarea.umd.js.map