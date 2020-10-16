(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/core'), require('@angular/animations'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/toggle', ['exports', '@angular/cdk/a11y', '@angular/common', '@angular/core', '@ptsecurity/mosaic/core', '@angular/animations', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.toggle = {}), global.ng.cdk.a11y, global.ng.common, global.ng.core, global.ptsecurity.mosaic.core, global.ng.animations, global.ng.forms));
}(this, (function (exports, a11y, common, core$1, core, animations, forms) { 'use strict';

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
    var McToggleBase = /** @class */ (function () {
        // tslint:disable-next-line: naming-convention
        /**
         * @param {?} _elementRef
         */
        function McToggleBase(_elementRef) {
            this._elementRef = _elementRef;
        }
        return McToggleBase;
    }());
    if (false) {
        /** @type {?} */
        McToggleBase.prototype._elementRef;
    }
    // tslint:disable-next-line: naming-convention
    /** @type {?} */
    var McToggleMixinBase = core.mixinTabIndex(core.mixinColor(core.mixinDisabled(McToggleBase), core.ThemePalette.Primary));
    var McToggleChange = /** @class */ (function () {
        function McToggleChange() {
        }
        return McToggleChange;
    }());
    if (false) {
        /** @type {?} */
        McToggleChange.prototype.source;
        /** @type {?} */
        McToggleChange.prototype.checked;
    }
    var McToggleComponent = /** @class */ (function (_super) {
        __extends(McToggleComponent, _super);
        /**
         * @param {?} _elementRef
         * @param {?} _focusMonitor
         * @param {?} _changeDetectorRef
         */
        function McToggleComponent(_elementRef, _focusMonitor, _changeDetectorRef) {
            var _this = _super.call(this, _elementRef) || this;
            _this._elementRef = _elementRef;
            _this._focusMonitor = _focusMonitor;
            _this._changeDetectorRef = _changeDetectorRef;
            _this.labelPosition = 'right';
            _this.ariaLabel = '';
            _this.ariaLabelledby = null;
            _this.name = null;
            _this._disabled = false;
            _this._checked = false;
            _this.change = new core$1.EventEmitter();
            _this.uniqueId = "mc-toggle-" + ++nextUniqueId;
            // tslint:disable-next-line:no-empty
            _this.onTouchedCallback = ( /**
             * @return {?}
             */function () { });
            // tslint:disable-next-line:no-empty
            _this.onChangeCallback = ( /**
             * @param {?} _
             * @return {?}
             */function (_) { });
            _this.id = _this.uniqueId;
            _this._focusMonitor.monitor(_this._elementRef.nativeElement, true);
            return _this;
        }
        Object.defineProperty(McToggleComponent.prototype, "inputId", {
            /**
             * @return {?}
             */
            get: function () {
                return (this.id || this.uniqueId) + "-input";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McToggleComponent.prototype, "disabled", {
            /**
             * @return {?}
             */
            get: function () {
                return this._disabled;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                if (value !== this._disabled) {
                    this._disabled = value;
                    this._changeDetectorRef.markForCheck();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McToggleComponent.prototype, "checked", {
            /**
             * @return {?}
             */
            get: function () {
                return this._checked;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                if (value !== this._checked) {
                    this._checked = value;
                    this._changeDetectorRef.markForCheck();
                }
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @return {?}
         */
        McToggleComponent.prototype.ngOnDestroy = function () {
            this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
        };
        /**
         * @return {?}
         */
        McToggleComponent.prototype.focus = function () {
            this._focusMonitor.focusVia(this.inputElement.nativeElement, 'keyboard');
        };
        /**
         * @return {?}
         */
        McToggleComponent.prototype.getAriaChecked = function () {
            return this.checked;
        };
        /**
         * @param {?} event
         * @return {?}
         */
        McToggleComponent.prototype.onChangeEvent = function (event) {
            event.stopPropagation();
            this.updateModelValue();
            this.emitChangeEvent();
        };
        /**
         * @return {?}
         */
        McToggleComponent.prototype.onLabelTextChange = function () {
            this._changeDetectorRef.markForCheck();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        McToggleComponent.prototype.onInputClick = function (event) {
            event.stopPropagation();
        };
        /**
         * @param {?} value
         * @return {?}
         */
        McToggleComponent.prototype.writeValue = function (value) {
            this.checked = !!value;
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        McToggleComponent.prototype.registerOnChange = function (fn) {
            this.onChangeCallback = fn;
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        McToggleComponent.prototype.registerOnTouched = function (fn) {
            this.onTouchedCallback = fn;
        };
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        McToggleComponent.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
        };
        /**
         * @private
         * @return {?}
         */
        McToggleComponent.prototype.updateModelValue = function () {
            this._checked = !this.checked;
            this.onTouchedCallback();
        };
        /**
         * @private
         * @return {?}
         */
        McToggleComponent.prototype.emitChangeEvent = function () {
            /** @type {?} */
            var event = new McToggleChange();
            event.source = this;
            event.checked = this.checked;
            this.onChangeCallback(this.checked);
            this.change.emit(event);
        };
        return McToggleComponent;
    }(McToggleMixinBase));
    McToggleComponent.decorators = [
        { type: core$1.Component, args: [{
                    selector: 'mc-toggle',
                    exportAs: 'mcToggle',
                    template: "<label [attr.for]=\"inputId\" class=\"mc-toggle-layout\">\n    <div class=\"mc-toggle__container\" [class.left]=\"labelPosition === 'left'\">\n        <input #input\n               type=\"checkbox\"\n               role=\"switch\"\n               class=\"mc-toggle-input cdk-visually-hidden\"\n               [id]=\"inputId\"\n               [checked]=\"checked\"\n               [attr.value]=\"value\"\n               [disabled]=\"disabled\"\n               [attr.name]=\"name\"\n               [tabIndex]=\"tabIndex\"\n               [attr.aria-label]=\"ariaLabel || null\"\n               [attr.aria-labelledby]=\"ariaLabelledby\"\n               [attr.aria-checked]=\"getAriaChecked()\"\n               (click)=\"onInputClick($event)\"\n               (change)=\"onChangeEvent($event)\"/>\n        <div class=\"mc-toggle-bar-container\">\n            <div class=\"mc-toggle__overlay\"></div>\n            <div class=\"mc-toggle-bar\">\n                <div class=\"mc-toggle__circle\" [@switch]=\"checked\"></div>\n            </div>\n        </div>\n        <div class=\"mc-toggle__content\"\n             [class.left]=\"labelPosition === 'left'\"\n             [class.right]=\"labelPosition === 'right'\">\n            <span class=\"mc-toggle-label\" (cdkObserveContent)=\"onLabelTextChange()\">\n                <ng-content></ng-content>\n            </span>\n        </div>\n    </div>\n</label>\n",
                    changeDetection: core$1.ChangeDetectionStrategy.OnPush,
                    encapsulation: core$1.ViewEncapsulation.None,
                    inputs: ['color', 'tabIndex'],
                    host: {
                        class: 'mc-toggle',
                        '[id]': 'id',
                        '[attr.id]': 'id',
                        '[class.mc-disabled]': 'disabled',
                        '[class.mc-active]': 'checked'
                    },
                    animations: [
                        animations.trigger('switch', [
                            animations.state('true', animations.style({ left: '50%' })),
                            animations.state('false', animations.style({ left: '1px' })),
                            animations.transition('true <=> false', animations.animate('150ms'))
                        ])
                    ],
                    providers: [{
                            provide: forms.NG_VALUE_ACCESSOR,
                            useExisting: core$1.forwardRef(( /**
                             * @return {?}
                             */function () { return McToggleComponent; })),
                            multi: true
                        }],
                    styles: [".mc-toggle{display:inline-block}.mc-toggle .mc-toggle-layout{align-items:baseline;cursor:inherit;display:inline-flex;vertical-align:middle;white-space:nowrap}.mc-toggle .mc-toggle-bar{border-style:solid;border-width:1px;position:relative}.mc-toggle .mc-toggle-bar.mc-toggle-label-position-left{order:1}.mc-toggle .mc-toggle-bar-container{position:relative}.mc-toggle__container{align-items:center;display:flex;position:relative}.mc-toggle__container.left{flex-direction:row-reverse}.mc-toggle__content.left{margin-right:8px}.mc-toggle__content.right{margin-left:8px}.mc-toggle__circle{border-radius:100%;border-style:solid;border-width:1px;margin-left:-1px;margin-top:-1px;position:absolute;transform:translateX(-1px)}.mc-toggle__overlay{left:0;position:absolute;top:0;z-index:1}.mc-toggle:not(.mc-toggle_small) .mc-toggle-bar,.mc-toggle:not(.mc-toggle_small) .mc-toggle__overlay{border-radius:9px;height:16px;width:28px}.mc-toggle:not(.mc-toggle_small) .mc-toggle__circle{height:16px;width:16px}.mc-toggle.mc-toggle_small .mc-toggle-bar,.mc-toggle.mc-toggle_small .mc-toggle__overlay{border-radius:8px;height:14px;width:24px}.mc-toggle.mc-toggle_small .mc-toggle__circle{height:14px;width:14px}.mc-toggle:not(.mc-disabled){cursor:pointer}"]
                }] }
    ];
    /** @nocollapse */
    McToggleComponent.ctorParameters = function () { return [
        { type: core$1.ElementRef },
        { type: a11y.FocusMonitor },
        { type: core$1.ChangeDetectorRef }
    ]; };
    McToggleComponent.propDecorators = {
        inputElement: [{ type: core$1.ViewChild, args: ['input', { static: false },] }],
        labelPosition: [{ type: core$1.Input }],
        ariaLabel: [{ type: core$1.Input, args: ['aria-label',] }],
        ariaLabelledby: [{ type: core$1.Input, args: ['aria-labelledby',] }],
        id: [{ type: core$1.Input }],
        name: [{ type: core$1.Input }],
        value: [{ type: core$1.Input }],
        disabled: [{ type: core$1.Input }],
        checked: [{ type: core$1.Input }],
        change: [{ type: core$1.Output }]
    };
    if (false) {
        /** @type {?} */
        McToggleComponent.prototype.inputElement;
        /** @type {?} */
        McToggleComponent.prototype.labelPosition;
        /** @type {?} */
        McToggleComponent.prototype.ariaLabel;
        /** @type {?} */
        McToggleComponent.prototype.ariaLabelledby;
        /** @type {?} */
        McToggleComponent.prototype.id;
        /** @type {?} */
        McToggleComponent.prototype.name;
        /** @type {?} */
        McToggleComponent.prototype.value;
        /**
         * @type {?}
         * @private
         */
        McToggleComponent.prototype._disabled;
        /**
         * @type {?}
         * @private
         */
        McToggleComponent.prototype._checked;
        /** @type {?} */
        McToggleComponent.prototype.change;
        /**
         * @type {?}
         * @private
         */
        McToggleComponent.prototype.uniqueId;
        /**
         * @type {?}
         * @private
         */
        McToggleComponent.prototype.onTouchedCallback;
        /**
         * @type {?}
         * @private
         */
        McToggleComponent.prototype.onChangeCallback;
        /** @type {?} */
        McToggleComponent.prototype._elementRef;
        /**
         * @type {?}
         * @private
         */
        McToggleComponent.prototype._focusMonitor;
        /**
         * @type {?}
         * @private
         */
        McToggleComponent.prototype._changeDetectorRef;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: toggle.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McToggleModule = /** @class */ (function () {
        function McToggleModule() {
        }
        return McToggleModule;
    }());
    McToggleModule.decorators = [
        { type: core$1.NgModule, args: [{
                    imports: [common.CommonModule, a11y.A11yModule, core.McCommonModule],
                    exports: [McToggleComponent],
                    declarations: [McToggleComponent]
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
     * Generated from: ptsecurity-mosaic-toggle.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.McToggleBase = McToggleBase;
    exports.McToggleChange = McToggleChange;
    exports.McToggleComponent = McToggleComponent;
    exports.McToggleMixinBase = McToggleMixinBase;
    exports.McToggleModule = McToggleModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-toggle.umd.js.map
