(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/icon'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/mosaic/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/form-field', ['exports', '@angular/common', '@angular/core', '@ptsecurity/mosaic/icon', '@ptsecurity/cdk/keycodes', '@ptsecurity/mosaic/core', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic['form-field'] = {}), global.ng.common, global.ng.core, global.ptsecurity.mosaic.icon, global.keycodes, global.ptsecurity.mosaic.core, global.rxjs, global.rxjs.operators));
}(this, (function (exports, common, core, icon, keycodes, core$1, rxjs, operators) { 'use strict';

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
     * Generated from: cleaner.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McCleaner = /** @class */ (function () {
        function McCleaner() {
        }
        McCleaner.decorators = [
            { type: core.Component, args: [{
                        selector: 'mc-cleaner',
                        exportAs: 'mcCleaner',
                        template: '<i class="mc-icon_light" mc-icon="mc-close-M_16" color="second"></i>',
                        host: {
                            class: 'mc-cleaner'
                        }
                    }] }
        ];
        return McCleaner;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: form-field-control.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * An interface which allows a control to work inside of a `MсFormField`.
     * @abstract
     * @template T
     */
    // tslint:disable-next-line:naming-convention
    var   /**
     * An interface which allows a control to work inside of a `MсFormField`.
     * @abstract
     * @template T
     */
    // tslint:disable-next-line:naming-convention
    McFormFieldControl = /** @class */ (function () {
        function McFormFieldControl() {
        }
        return McFormFieldControl;
    }());
    if (false) {
        /**
         * The value of the control.
         * @type {?}
         */
        McFormFieldControl.prototype.value;
        /**
         * Stream that emits whenever the state of the control changes such that the parent `MсFormField`
         * needs to run change detection.
         * @type {?}
         */
        McFormFieldControl.prototype.stateChanges;
        /**
         * The element ID for this control.
         * @type {?}
         */
        McFormFieldControl.prototype.id;
        /**
         * The placeholder for this control.
         * @type {?}
         */
        McFormFieldControl.prototype.placeholder;
        /**
         * Gets the NgControl for this control.
         * @type {?}
         */
        McFormFieldControl.prototype.ngControl;
        /**
         * Whether the control is focused.
         * @type {?}
         */
        McFormFieldControl.prototype.focused;
        /**
         * Whether the control is empty.
         * @type {?}
         */
        McFormFieldControl.prototype.empty;
        /**
         * Whether the control is required.
         * @type {?}
         */
        McFormFieldControl.prototype.required;
        /**
         * Whether the control is disabled.
         * @type {?}
         */
        McFormFieldControl.prototype.disabled;
        /**
         * Whether the control is in an error state.
         * @type {?}
         */
        McFormFieldControl.prototype.errorState;
        /**
         * An optional name for the control type that can be used to distinguish `mc-form-field` elements
         * based on their control type. The form field will add a class,
         * `mc-form-field-type-{{controlType}}` to its root element.
         * @type {?}
         */
        McFormFieldControl.prototype.controlType;
        /**
         * Handles a click on the control's container.
         * @abstract
         * @param {?} event
         * @return {?}
         */
        McFormFieldControl.prototype.onContainerClick = function (event) { };
        /**
         * @abstract
         * @return {?}
         */
        McFormFieldControl.prototype.focus = function () { };
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: form-field-errors.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @return {?}
     */
    function getMcFormFieldMissingControlError() {
        return Error('mc-form-field must contain a McFormFieldControl.');
    }
    /**
     * @return {?}
     */
    function getMcFormFieldYouCanNotUseCleanerInNumberInputError() {
        return Error("You can't use mc-cleaner with input that have type=\"number\"");
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: hint.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var nextUniqueId = 0;
    var McHint = /** @class */ (function () {
        function McHint() {
            this.id = "mc-hint-" + nextUniqueId++;
        }
        McHint.decorators = [
            { type: core.Directive, args: [{
                        selector: 'mc-hint',
                        host: {
                            class: 'mc-hint',
                            '[attr.id]': 'id'
                        }
                    },] }
        ];
        McHint.propDecorators = {
            id: [{ type: core.Input }]
        };
        return McHint;
    }());
    if (false) {
        /** @type {?} */
        McHint.prototype.id;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: prefix.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McPrefix = /** @class */ (function () {
        function McPrefix() {
        }
        McPrefix.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mcPrefix]'
                    },] }
        ];
        return McPrefix;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: stepper.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McStepper = /** @class */ (function () {
        function McStepper() {
            this.stepUp = new core.EventEmitter();
            this.stepDown = new core.EventEmitter();
        }
        /**
         * @param {?} numberInput
         * @return {?}
         */
        McStepper.prototype.connectTo = /**
         * @param {?} numberInput
         * @return {?}
         */
        function (numberInput) {
            if (!numberInput) {
                return;
            }
            this.stepUp.subscribe((/**
             * @return {?}
             */
            function () {
                numberInput.stepUp(numberInput.step);
            }));
            this.stepDown.subscribe((/**
             * @return {?}
             */
            function () {
                numberInput.stepDown(numberInput.step);
            }));
        };
        /**
         * @param {?} $event
         * @return {?}
         */
        McStepper.prototype.onStepUp = /**
         * @param {?} $event
         * @return {?}
         */
        function ($event) {
            this.stepUp.emit();
            $event.preventDefault();
        };
        /**
         * @param {?} $event
         * @return {?}
         */
        McStepper.prototype.onStepDown = /**
         * @param {?} $event
         * @return {?}
         */
        function ($event) {
            this.stepDown.emit();
            $event.preventDefault();
        };
        McStepper.decorators = [
            { type: core.Component, args: [{
                        selector: 'mc-stepper',
                        template: "\n        <i class=\"mc mc-icon mc-icon_light mc-second mc-stepper-step-up mc-angle-down-L_16\"\n           (mousedown)=\"onStepUp($event)\">\n        </i>\n        <i class=\"mc mc-icon mc-icon_light mc-second mc-stepper-step-down mc-angle-down-L_16\"\n           (mousedown)=\"onStepDown($event)\">\n        </i>\n    "
                    }] }
        ];
        McStepper.propDecorators = {
            stepUp: [{ type: core.Output }],
            stepDown: [{ type: core.Output }]
        };
        return McStepper;
    }());
    if (false) {
        /** @type {?} */
        McStepper.prototype.stepUp;
        /** @type {?} */
        McStepper.prototype.stepDown;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: suffix.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McSuffix = /** @class */ (function () {
        function McSuffix() {
        }
        McSuffix.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mcSuffix]'
                    },] }
        ];
        return McSuffix;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: form-field.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var nextUniqueId$1 = 0;
    var McFormFieldBase = /** @class */ (function () {
        // tslint:disable-next-line:naming-convention
        function McFormFieldBase(_elementRef) {
            this._elementRef = _elementRef;
        }
        return McFormFieldBase;
    }());
    if (false) {
        /** @type {?} */
        McFormFieldBase.prototype._elementRef;
    }
    // tslint:disable-next-line:naming-convention
    /** @type {?} */
    var McFormFieldMixinBase = core$1.mixinColor(McFormFieldBase);
    var McFormField = /** @class */ (function (_super) {
        __extends(McFormField, _super);
        // tslint:disable-next-line:naming-convention
        function McFormField(_elementRef, _changeDetectorRef) {
            var _this = _super.call(this, _elementRef) || this;
            _this._elementRef = _elementRef;
            _this._changeDetectorRef = _changeDetectorRef;
            // Unique id for the internal form field label.
            _this.labelId = "mc-form-field-label-" + nextUniqueId$1++;
            _this.hovered = false;
            _this.canCleanerClearByEsc = true;
            return _this;
        }
        Object.defineProperty(McFormField.prototype, "hasHint", {
            get: /**
             * @return {?}
             */
            function () {
                return this.hint && this.hint.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McFormField.prototype, "hasSuffix", {
            get: /**
             * @return {?}
             */
            function () {
                return this.suffix && this.suffix.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McFormField.prototype, "hasPrefix", {
            get: /**
             * @return {?}
             */
            function () {
                return this.prefix && this.prefix.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McFormField.prototype, "hasCleaner", {
            get: /**
             * @return {?}
             */
            function () {
                return !!this.cleaner;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McFormField.prototype, "hasStepper", {
            get: /**
             * @return {?}
             */
            function () {
                return !!this.stepper;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McFormField.prototype, "canShowCleaner", {
            get: /**
             * @return {?}
             */
            function () {
                return this.hasCleaner &&
                    this.control &&
                    this.control.ngControl
                    ? this.control.ngControl.value && !this.control.disabled
                    : false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McFormField.prototype, "disabled", {
            get: /**
             * @return {?}
             */
            function () {
                return this.control && this.control.disabled;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McFormField.prototype, "canShowStepper", {
            get: /**
             * @return {?}
             */
            function () {
                return this.control && !this.disabled && (this.control.focused || this.hovered);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        McFormField.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (((/** @type {?} */ (this.control))).numberInput && this.hasCleaner) {
                this.cleaner = null;
                throw getMcFormFieldYouCanNotUseCleanerInNumberInputError();
            }
            this.validateControlChild();
            if (this.control.controlType) {
                this._elementRef.nativeElement.classList.add("mc-form-field-type-" + this.control.controlType);
            }
            // Subscribe to changes in the child control state in order to update the form field UI.
            this.control.stateChanges
                .pipe(operators.startWith())
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this._changeDetectorRef.markForCheck();
            }));
            if (this.hasStepper) {
                this.stepper.connectTo(((/** @type {?} */ (this.control))).numberInput);
            }
            // Run change detection if the value changes.
            /** @type {?} */
            var valueChanges = this.control.ngControl && this.control.ngControl.valueChanges || rxjs.EMPTY;
            rxjs.merge(valueChanges)
                .subscribe((/**
             * @return {?}
             */
            function () { return _this._changeDetectorRef.markForCheck(); }));
        };
        /**
         * @return {?}
         */
        McFormField.prototype.ngAfterContentChecked = /**
         * @return {?}
         */
        function () {
            this.validateControlChild();
        };
        /**
         * @return {?}
         */
        McFormField.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            // Avoid animations on load.
            this._changeDetectorRef.detectChanges();
        };
        /**
         * @param {?} $event
         * @return {?}
         */
        McFormField.prototype.clearValue = /**
         * @param {?} $event
         * @return {?}
         */
        function ($event) {
            $event.stopPropagation();
            if (this.control && this.control.ngControl) {
                this.control.ngControl.reset();
                this.control.focus();
            }
        };
        /**
         * @param {?} $event
         * @return {?}
         */
        McFormField.prototype.onContainerClick = /**
         * @param {?} $event
         * @return {?}
         */
        function ($event) {
            if (this.control.onContainerClick) {
                this.control.onContainerClick($event);
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        McFormField.prototype.onKeyDown = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // tslint:disable-next-line:deprecation
            if (this.canCleanerClearByEsc && event.keyCode === keycodes.ESCAPE && this.control.focused && this.hasCleaner) {
                if (this.control && this.control.ngControl) {
                    this.control.ngControl.reset();
                }
                event.preventDefault();
            }
        };
        /**
         * @param {?} isHovered
         * @return {?}
         */
        McFormField.prototype.onHoverChanged = /**
         * @param {?} isHovered
         * @return {?}
         */
        function (isHovered) {
            if (isHovered !== this.hovered) {
                this.hovered = isHovered;
                this._changeDetectorRef.markForCheck();
            }
        };
        /**
         * Gets an ElementRef for the element that a overlay attached to the form-field should be
         * positioned relative to.
         */
        /**
         * Gets an ElementRef for the element that a overlay attached to the form-field should be
         * positioned relative to.
         * @return {?}
         */
        McFormField.prototype.getConnectedOverlayOrigin = /**
         * Gets an ElementRef for the element that a overlay attached to the form-field should be
         * positioned relative to.
         * @return {?}
         */
        function () {
            return this.connectionContainerRef || this._elementRef;
        };
        /** Determines whether a class from the NgControl should be forwarded to the host element. */
        /**
         * Determines whether a class from the NgControl should be forwarded to the host element.
         * @param {?} prop
         * @return {?}
         */
        McFormField.prototype.shouldForward = /**
         * Determines whether a class from the NgControl should be forwarded to the host element.
         * @param {?} prop
         * @return {?}
         */
        function (prop) {
            /** @type {?} */
            var ngControl = this.control ? this.control.ngControl : null;
            return ngControl && ngControl[prop];
        };
        /** Throws an error if the form field's control is missing. */
        /**
         * Throws an error if the form field's control is missing.
         * @protected
         * @return {?}
         */
        McFormField.prototype.validateControlChild = /**
         * Throws an error if the form field's control is missing.
         * @protected
         * @return {?}
         */
        function () {
            if (!this.control) {
                throw getMcFormFieldMissingControlError();
            }
        };
        McFormField.decorators = [
            { type: core.Component, args: [{
                        selector: 'mc-form-field',
                        exportAs: 'mcFormField',
                        template: "<div class=\"mc-form-field__container\" (click)=\"onContainerClick($event)\">\n\n    <div class=\"mc-form-field__prefix\" *ngIf=\"hasPrefix\">\n        <ng-content select=\"[mcPrefix]\"></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__infix\">\n        <ng-content></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__suffix\" *ngIf=\"hasSuffix\">\n        <ng-content select=\"[mcSuffix]\"></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__cleaner\"\n         *ngIf=\"canShowCleaner && !hasSuffix\"\n         (click)=\"clearValue($event)\">\n        <ng-content select=\"mc-cleaner\"></ng-content>\n    </div>\n\n    <ng-content *ngIf=\"canShowStepper\" select=\"mc-stepper\"></ng-content>\n</div>\n\n<div class=\"mc-form-field__hint\" *ngIf=\"hasHint\">\n    <ng-content select=\"mc-hint\"></ng-content>\n</div>\n",
                        host: {
                            class: 'mc-form-field',
                            '[class.mc-form-field_invalid]': 'control.errorState',
                            '[class.mc-form-field_has-prefix]': 'hasPrefix',
                            '[class.mc-form-field_has-suffix]': 'hasSuffix',
                            '[class.mc-form-field_has-cleaner]': 'canShowCleaner',
                            '[class.mc-form-field_has-stepper]': 'canShowStepper',
                            '[class.mc-disabled]': 'control.disabled',
                            '[class.mc-focused]': 'control.focused',
                            '[class.ng-untouched]': 'shouldForward("untouched")',
                            '[class.ng-touched]': 'shouldForward("touched")',
                            '[class.ng-pristine]': 'shouldForward("pristine")',
                            '[class.ng-dirty]': 'shouldForward("dirty")',
                            '[class.ng-valid]': 'shouldForward("valid")',
                            '[class.ng-invalid]': 'shouldForward("invalid")',
                            '[class.ng-pending]': 'shouldForward("pending")',
                            '(keydown)': 'onKeyDown($event)',
                            '(mouseenter)': 'onHoverChanged(true)',
                            '(mouseleave)': 'onHoverChanged(false)'
                        },
                        inputs: ['color'],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [".mc-form-field{position:relative;display:inline-block;width:100%;border-radius:3px}.mc-form-field:hover{z-index:1}.mc-form-field.mc-focused{z-index:2}.mc-form-field__hint{margin-top:4px}.mc-form-field__container{position:relative;border-radius:3px;border:1px solid transparent}.mc-form-field_without-borders .mc-form-field__container{border-color:transparent}.mc-form-field__prefix,.mc-form-field__suffix{position:absolute;top:0;bottom:0;width:32px;display:flex;flex-direction:row;justify-content:center;align-items:center}.mc-form-field__prefix{left:0}.mc-form-field__suffix{right:0}.mc-form-field_has-cleaner .mc-input,.mc-form-field_has-stepper .mc-input,.mc-form-field_has-suffix .mc-input{padding-right:32px}.mc-form-field_has-prefix .mc-input{padding-left:32px}.mc-cleaner{display:flex;width:32px;height:100%;cursor:pointer}.mc-cleaner .mc-icon{display:flex;align-items:center;justify-content:center;width:100%;height:100%}.mc-form-field__cleaner .mc-cleaner{position:absolute;top:0;bottom:0;right:0}mc-stepper{position:absolute;display:flex;flex-direction:column;justify-content:center;align-items:center;top:0;bottom:0;right:0;width:32px}mc-stepper .mc-stepper-step-down,mc-stepper .mc-stepper-step-up{cursor:pointer;width:32px;text-align:center}mc-stepper .mc-stepper-step-up{transform:scaleY(-1)}", ".mc-input{background:0 0;padding:5px 16px;margin:0;border:none;outline:0;box-sizing:border-box;width:100%;min-height:30px;display:inline-block}.mc-input::-ms-clear{display:none;width:0;height:0}.mc-input::-ms-reveal{display:none;width:0;height:0}.mc-input::-webkit-search-cancel-button,.mc-input::-webkit-search-decoration,.mc-input::-webkit-search-results-button,.mc-input::-webkit-search-results-decoration{display:none}input.mc-input[type=number]{-moz-appearance:textfield}input.mc-input[type=number]::-webkit-inner-spin-button,input.mc-input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}input.mc-input:invalid{box-shadow:unset}", ".mc-textarea{background:0 0;margin:0;border:none;outline:0;resize:none;overflow:auto;width:100%;box-sizing:border-box;padding:5px 16px;display:inline-block;-webkit-appearance:none;vertical-align:bottom}.mc-textarea:not(.mc-textarea-resizable){box-sizing:border-box;overflow-y:hidden}.mc-textarea.mc-textarea-resizable{resize:vertical;min-height:50px}.mc-textarea:invalid{box-shadow:unset}"]
                    }] }
        ];
        /** @nocollapse */
        McFormField.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef }
        ]; };
        McFormField.propDecorators = {
            control: [{ type: core.ContentChild, args: [McFormFieldControl, { static: false },] }],
            stepper: [{ type: core.ContentChild, args: [McStepper, { static: false },] }],
            cleaner: [{ type: core.ContentChild, args: [McCleaner, { static: false },] }],
            hint: [{ type: core.ContentChildren, args: [McHint,] }],
            suffix: [{ type: core.ContentChildren, args: [McSuffix,] }],
            prefix: [{ type: core.ContentChildren, args: [McPrefix,] }],
            connectionContainerRef: [{ type: core.ViewChild, args: ['connectionContainer', { static: true },] }]
        };
        return McFormField;
    }(McFormFieldMixinBase));
    if (false) {
        /** @type {?} */
        McFormField.prototype.control;
        /** @type {?} */
        McFormField.prototype.stepper;
        /** @type {?} */
        McFormField.prototype.cleaner;
        /** @type {?} */
        McFormField.prototype.hint;
        /** @type {?} */
        McFormField.prototype.suffix;
        /** @type {?} */
        McFormField.prototype.prefix;
        /** @type {?} */
        McFormField.prototype.connectionContainerRef;
        /** @type {?} */
        McFormField.prototype.labelId;
        /** @type {?} */
        McFormField.prototype.hovered;
        /** @type {?} */
        McFormField.prototype.canCleanerClearByEsc;
        /** @type {?} */
        McFormField.prototype._elementRef;
        /**
         * @type {?}
         * @private
         */
        McFormField.prototype._changeDetectorRef;
    }
    var McFormFieldWithoutBorders = /** @class */ (function () {
        function McFormFieldWithoutBorders() {
        }
        McFormFieldWithoutBorders.decorators = [
            { type: core.Directive, args: [{
                        selector: 'mc-form-field[mcFormFieldWithoutBorders]',
                        exportAs: 'mcFormFieldWithoutBorders',
                        host: { class: 'mc-form-field_without-borders' }
                    },] }
        ];
        return McFormFieldWithoutBorders;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: form-field.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McFormFieldModule = /** @class */ (function () {
        function McFormFieldModule() {
        }
        McFormFieldModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            McFormField,
                            McFormFieldWithoutBorders,
                            McHint,
                            McPrefix,
                            McSuffix,
                            McCleaner,
                            McStepper
                        ],
                        imports: [common.CommonModule, icon.McIconModule],
                        exports: [
                            McFormField,
                            McFormFieldWithoutBorders,
                            McHint,
                            McPrefix,
                            McSuffix,
                            McCleaner,
                            McStepper
                        ]
                    },] }
        ];
        return McFormFieldModule;
    }());

    exports.McCleaner = McCleaner;
    exports.McFormField = McFormField;
    exports.McFormFieldBase = McFormFieldBase;
    exports.McFormFieldControl = McFormFieldControl;
    exports.McFormFieldMixinBase = McFormFieldMixinBase;
    exports.McFormFieldModule = McFormFieldModule;
    exports.McFormFieldWithoutBorders = McFormFieldWithoutBorders;
    exports.McHint = McHint;
    exports.McPrefix = McPrefix;
    exports.McStepper = McStepper;
    exports.McSuffix = McSuffix;
    exports.getMcFormFieldMissingControlError = getMcFormFieldMissingControlError;
    exports.getMcFormFieldYouCanNotUseCleanerInNumberInputError = getMcFormFieldYouCanNotUseCleanerInNumberInputError;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-form-field.umd.js.map