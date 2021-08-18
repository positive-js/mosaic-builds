(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/platform'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/cdk/keycodes'), require('@angular/cdk/coercion'), require('@angular/forms'), require('@angular/cdk/bidi'), require('@angular/cdk/collections'), require('@ptsecurity/cdk/a11y'), require('@ptsecurity/mosaic/core'), require('@ptsecurity/mosaic/form-field'), require('rxjs'), require('rxjs/operators'), require('@ptsecurity/mosaic/icon')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/tags', ['exports', '@angular/cdk/platform', '@angular/common', '@angular/core', '@ptsecurity/cdk/keycodes', '@angular/cdk/coercion', '@angular/forms', '@angular/cdk/bidi', '@angular/cdk/collections', '@ptsecurity/cdk/a11y', '@ptsecurity/mosaic/core', '@ptsecurity/mosaic/form-field', 'rxjs', 'rxjs/operators', '@ptsecurity/mosaic/icon'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.tags = {}), global.ng.cdk.platform, global.ng.common, global.ng.core, global.mc.cdk.keycodes, global.ng.cdk.coercion, global.ng.forms, global.ng.cdk.bidi, global.ng.cdk.collections, global.mc.cdk.a11y, global.ptsecurity.mosaic.core, global.ptsecurity.mosaic['form-field'], global.rxjs, global.rxjs.operators, global.ptsecurity.mosaic.icon));
}(this, (function (exports, platform, common, core, keycodes, coercion, forms, bidi, collections, a11y, core$1, formField, rxjs, operators, icon) { 'use strict';

    /** Injection token to be used to override the default options for the chips module. */
    var MC_TAGS_DEFAULT_OPTIONS = new core.InjectionToken('mc-tags-default-options');

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
        return to.concat(ar || from);
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

    // Increasing integer for generating unique ids.
    var nextUniqueId$1 = 0;
    /**
     * Directive that adds tag-specific behaviors to an input element inside `<mc-form-field>`.
     * May be placed inside or outside of an `<mc-tag-list>`.
     */
    var McTagInput = /** @class */ (function () {
        function McTagInput(elementRef, renderer, defaultOptions, ngControl) {
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.defaultOptions = defaultOptions;
            this.ngControl = ngControl;
            /** Whether the control is focused. */
            this.focused = false;
            /**
             * The list of key codes that will trigger a tagEnd event.
             *
             * Defaults to `[ENTER]`.
             */
            this.separatorKeyCodes = this.defaultOptions.separatorKeyCodes;
            /** Emitted when a tag is to be added. */
            this.tagEnd = new core.EventEmitter();
            /** The input's placeholder text. */
            this.placeholder = '';
            /** Unique id for the input. */
            this.id = "mc-tag-list-input-" + nextUniqueId$1++;
            this._addOnBlur = true;
            this._disabled = false;
            this.countOfSymbolsForUpdateWidth = 3;
            // tslint:disable-next-line: no-unnecessary-type-assertion
            this.inputElement = this.elementRef.nativeElement;
            this.setDefaultInputWidth();
        }
        Object.defineProperty(McTagInput.prototype, "tagList", {
            /** Register input for tag list */
            set: function (value) {
                if (value) {
                    this._tagList = value;
                    this._tagList.registerInput(this);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTagInput.prototype, "addOnBlur", {
            /**
             * Whether or not the tagEnd event will be emitted when the input is blurred.
             */
            get: function () {
                return this._addOnBlur;
            },
            set: function (value) {
                this._addOnBlur = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTagInput.prototype, "disabled", {
            /** Whether the input is disabled. */
            get: function () {
                return this._disabled || (this._tagList && this._tagList.disabled);
            },
            set: function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTagInput.prototype, "empty", {
            /** Whether the input is empty. */
            get: function () {
                return !this.inputElement.value;
            },
            enumerable: false,
            configurable: true
        });
        McTagInput.prototype.ngOnChanges = function () {
            this._tagList.stateChanges.next();
        };
        McTagInput.prototype.onKeydown = function (event) {
            if (!this.inputElement.value) {
                this._tagList.keydown(event);
            }
            if (this.isSeparatorKey(event)) {
                this.emitTagEnd();
                event.preventDefault();
            }
        };
        /** Checks to see if the blur should emit the (tagEnd) event. */
        McTagInput.prototype.blur = function () {
            this.focused = false;
            // Blur the tag list if it is not focused
            if (!this._tagList.focused) {
                this.triggerValidation();
                this._tagList.blur();
            }
            // tslint:disable-next-line: no-unnecessary-type-assertion
            if (this.addOnBlur) {
                this.emitTagEnd();
            }
            this._tagList.stateChanges.next();
        };
        McTagInput.prototype.triggerValidation = function () {
            if (!this.hasControl()) {
                return;
            }
            this.ngControl.statusChanges.emit(this.ngControl.status);
        };
        /** Checks to see if the (tagEnd) event needs to be emitted. */
        McTagInput.prototype.emitTagEnd = function () {
            if (!this.hasControl() || (this.hasControl() && !this.ngControl.invalid)) {
                this.tagEnd.emit({ input: this.inputElement, value: this.inputElement.value });
                this.updateInputWidth();
            }
        };
        McTagInput.prototype.onInput = function () {
            this.updateInputWidth();
            // Let tag list know whenever the value changes.
            this._tagList.stateChanges.next();
        };
        McTagInput.prototype.onPaste = function ($event) {
            var e_1, _a;
            var _this = this;
            if (!$event.clipboardData) {
                return;
            }
            var data = $event.clipboardData.getData('text');
            if (data && data.length === 0) {
                return;
            }
            var items = [];
            try {
                for (var _b = __values(this.separatorKeyCodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    var separator = this.separatorKeyToSymbol(key);
                    if (data.search(separator) > -1) {
                        items.push.apply(items, __spread(data.split(separator)));
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (items.length === 0) {
                items.push(data);
            }
            items.forEach(function (item) { return _this.tagEnd.emit({ input: _this.inputElement, value: item }); });
            this.updateInputWidth();
            $event.preventDefault();
            $event.stopPropagation();
        };
        McTagInput.prototype.updateInputWidth = function () {
            var length = this.inputElement.value.length;
            this.renderer.setStyle(this.inputElement, 'max-width', 0);
            this.oneSymbolWidth = this.inputElement.scrollWidth / length;
            this.renderer.setStyle(this.inputElement, 'max-width', '');
            if (length > this.countOfSymbolsForUpdateWidth) {
                this.renderer.setStyle(this.inputElement, 'width', length * this.oneSymbolWidth + "px");
            }
            else {
                this.setDefaultInputWidth();
            }
        };
        McTagInput.prototype.onFocus = function () {
            this.focused = true;
            this._tagList.stateChanges.next();
        };
        /** Focuses the input. */
        McTagInput.prototype.focus = function () {
            this.inputElement.focus();
        };
        McTagInput.prototype.separatorKeyToSymbol = function (k) {
            var _a;
            var sep = (_a = {},
                _a[keycodes.ENTER] = /\r?\n/,
                _a[keycodes.TAB] = /\t/,
                _a[keycodes.SPACE] = / /,
                _a[keycodes.COMMA] = /,/,
                _a)[k];
            if (sep) {
                return sep;
            }
            return k;
        };
        McTagInput.prototype.hasControl = function () {
            return !!this.ngControl;
        };
        McTagInput.prototype.setDefaultInputWidth = function () {
            this.renderer.setStyle(this.inputElement, 'width', '30px');
        };
        /** Checks whether a keycode is one of the configured separators. */
        McTagInput.prototype.isSeparatorKey = function (event) {
            if (keycodes.hasModifierKey(event)) {
                return false;
            }
            // tslint:disable-next-line: deprecation
            return this.separatorKeyCodes.indexOf(event.keyCode) > -1;
        };
        return McTagInput;
    }());
    McTagInput.decorators = [
        { type: core.Directive, args: [{
                    selector: 'input[mcTagInputFor]',
                    exportAs: 'mcTagInput, mcTagInputFor',
                    host: {
                        class: 'mc-tag-input',
                        '[id]': 'id',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.placeholder]': 'placeholder || null',
                        '(keydown)': 'onKeydown($event)',
                        '(blur)': 'blur()',
                        '(focus)': 'onFocus()',
                        '(input)': 'onInput()',
                        '(paste)': 'onPaste($event)'
                    }
                },] }
    ];
    /** @nocollapse */
    McTagInput.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.Renderer2 },
        { type: undefined, decorators: [{ type: core.Inject, args: [MC_TAGS_DEFAULT_OPTIONS,] }] },
        { type: forms.NgControl, decorators: [{ type: core.Optional }, { type: core.Self }] }
    ]; };
    McTagInput.propDecorators = {
        separatorKeyCodes: [{ type: core.Input, args: ['mcTagInputSeparatorKeyCodes',] }],
        tagEnd: [{ type: core.Output, args: ['mcTagInputTokenEnd',] }],
        placeholder: [{ type: core.Input }],
        id: [{ type: core.Input }],
        tagList: [{ type: core.Input, args: ['mcTagInputFor',] }],
        addOnBlur: [{ type: core.Input, args: ['mcTagInputAddOnBlur',] }],
        disabled: [{ type: core.Input }]
    };

    /** Event object emitted by McTag when selected or deselected. */
    var McTagSelectionChange = /** @class */ (function () {
        function McTagSelectionChange(source, selected, isUserInput) {
            if (isUserInput === void 0) { isUserInput = false; }
            this.source = source;
            this.selected = selected;
            this.isUserInput = isUserInput;
        }
        return McTagSelectionChange;
    }());
    var TAG_ATTRIBUTE_NAMES = ['mc-basic-tag'];
    /**
     * Dummy directive to add CSS class to tag avatar.
     * @docs-private
     */
    var McTagAvatar = /** @class */ (function () {
        function McTagAvatar() {
        }
        return McTagAvatar;
    }());
    McTagAvatar.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mc-tag-avatar, [mcTagAvatar]',
                    host: { class: 'mc-tag-avatar' }
                },] }
    ];
    /**
     * Dummy directive to add CSS class to tag trailing icon.
     * @docs-private
     */
    var McTagTrailingIcon = /** @class */ (function () {
        function McTagTrailingIcon() {
        }
        return McTagTrailingIcon;
    }());
    McTagTrailingIcon.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mc-tag-trailing-icon, [mcTagTrailingIcon]',
                    host: { class: 'mc-tag-trailing-icon' }
                },] }
    ];
    var McTagBase = /** @class */ (function () {
        // tslint:disable-next-line:naming-convention
        function McTagBase(_elementRef) {
            this._elementRef = _elementRef;
        }
        return McTagBase;
    }());
    // tslint:disable-next-line:naming-convention
    var McTagMixinBase = core$1.mixinColor(core$1.mixinDisabled(McTagBase));
    var McTag = /** @class */ (function (_super) {
        __extends(McTag, _super);
        function McTag(elementRef, changeDetectorRef, _ngZone) {
            var _this = _super.call(this, elementRef) || this;
            _this.elementRef = elementRef;
            _this.changeDetectorRef = changeDetectorRef;
            _this._ngZone = _ngZone;
            /** Emits when the tag is focused. */
            _this.onFocus = new rxjs.Subject();
            /** Emits when the tag is blured. */
            _this.onBlur = new rxjs.Subject();
            /** Whether the tag has focus. */
            _this.hasFocus = false;
            /** Whether the tag list is selectable */
            _this.tagListSelectable = true;
            /** Emitted when the tag is selected or deselected. */
            _this.selectionChange = new core.EventEmitter();
            /** Emitted when the tag is destroyed. */
            _this.destroyed = new core.EventEmitter();
            /** Emitted when a tag is to be removed. */
            _this.removed = new core.EventEmitter();
            _this._selected = false;
            _this._selectable = true;
            _this._removable = true;
            _this._disabled = false;
            _this.addHostClassName();
            _this.nativeElement = elementRef.nativeElement;
            return _this;
        }
        Object.defineProperty(McTag.prototype, "selected", {
            /** Whether the tag is selected. */
            get: function () {
                return this._selected;
            },
            set: function (value) {
                var coercedValue = coercion.coerceBooleanProperty(value);
                if (coercedValue !== this._selected) {
                    this._selected = coercedValue;
                    this.dispatchSelectionChange();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTag.prototype, "value", {
            /** The value of the tag. Defaults to the content inside `<mc-tag>` tags. */
            get: function () {
                return this._value !== undefined
                    ? this._value
                    : this.elementRef.nativeElement.textContent;
            },
            set: function (value) {
                this._value = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTag.prototype, "selectable", {
            /**
             * Whether or not the tag is selectable. When a tag is not selectable,
             * changes to its selected state are always ignored. By default a tag is
             * selectable, and it becomes non-selectable if its parent tag list is
             * not selectable.
             */
            get: function () {
                return this._selectable && this.tagListSelectable;
            },
            set: function (value) {
                this._selectable = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTag.prototype, "removable", {
            /**
             * Determines whether or not the tag displays the remove styling and emits (removed) events.
             */
            get: function () {
                return this._removable;
            },
            set: function (value) {
                this._removable = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTag.prototype, "tabindex", {
            get: function () {
                if (!this.selectable) {
                    return null;
                }
                return this.disabled ? null : -1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTag.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (value) {
                if (value !== this.disabled) {
                    this._disabled = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        McTag.prototype.ngAfterContentInit = function () {
            this.addClassModificatorForIcons();
        };
        McTag.prototype.addClassModificatorForIcons = function () {
            var icons = this.contentChildren.map(function (item) { return item._elementRef.nativeElement; });
            if (icons.length === 1) {
                var iconElement = icons[0];
                if (!iconElement.previousElementSibling && !iconElement.nextElementSibling) {
                    if (iconElement.nextSibling) {
                        iconElement.classList.add('mc-icon_left');
                        this.nativeElement.classList.add('mc-left-icon');
                    }
                    if (iconElement.previousSibling) {
                        iconElement.classList.add('mc-icon_right');
                        this.nativeElement.classList.add('mc-right-icon');
                    }
                }
            }
            else if (icons.length > 1) {
                var firstIconElement = icons[0];
                var secondIconElement = icons[1];
                firstIconElement.classList.add('mc-icon_left');
                secondIconElement.classList.add('mc-icon_right');
            }
        };
        McTag.prototype.addHostClassName = function () {
            var e_1, _a;
            try {
                // Add class for the different tags
                for (var TAG_ATTRIBUTE_NAMES_1 = __values(TAG_ATTRIBUTE_NAMES), TAG_ATTRIBUTE_NAMES_1_1 = TAG_ATTRIBUTE_NAMES_1.next(); !TAG_ATTRIBUTE_NAMES_1_1.done; TAG_ATTRIBUTE_NAMES_1_1 = TAG_ATTRIBUTE_NAMES_1.next()) {
                    var attr = TAG_ATTRIBUTE_NAMES_1_1.value;
                    if (this.elementRef.nativeElement.hasAttribute(attr) ||
                        this.elementRef.nativeElement.tagName.toLowerCase() === attr) {
                        this.elementRef.nativeElement.classList.add(attr);
                        return;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (TAG_ATTRIBUTE_NAMES_1_1 && !TAG_ATTRIBUTE_NAMES_1_1.done && (_a = TAG_ATTRIBUTE_NAMES_1.return)) _a.call(TAG_ATTRIBUTE_NAMES_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.elementRef.nativeElement.classList.add('mc-standard-tag');
        };
        McTag.prototype.ngOnDestroy = function () {
            this.destroyed.emit({ tag: this });
        };
        McTag.prototype.select = function () {
            if (!this._selected) {
                this._selected = true;
                this.dispatchSelectionChange();
            }
        };
        McTag.prototype.deselect = function () {
            if (this._selected) {
                this._selected = false;
                this.dispatchSelectionChange();
            }
        };
        McTag.prototype.selectViaInteraction = function () {
            if (!this._selected) {
                this._selected = true;
                this.dispatchSelectionChange(true);
            }
        };
        McTag.prototype.toggleSelected = function (isUserInput) {
            if (isUserInput === void 0) { isUserInput = false; }
            this._selected = !this.selected;
            this.dispatchSelectionChange(isUserInput);
            return this.selected;
        };
        /** Allows for programmatic focusing of the tag. */
        McTag.prototype.focus = function () {
            var _this = this;
            if (!this.selectable) {
                return;
            }
            if (!this.hasFocus) {
                this.elementRef.nativeElement.focus();
                this.onFocus.next({ tag: this });
                Promise.resolve().then(function () {
                    _this.hasFocus = true;
                    _this.changeDetectorRef.markForCheck();
                });
            }
        };
        /**
         * Allows for programmatic removal of the tag. Called by the McTagList when the DELETE or
         * BACKSPACE keys are pressed.
         *
         * Informs any listeners of the removal request. Does not remove the tag from the DOM.
         */
        McTag.prototype.remove = function () {
            if (this.removable) {
                this.removed.emit({ tag: this });
            }
        };
        McTag.prototype.handleClick = function (event) {
            if (this.disabled) {
                event.preventDefault();
            }
            else {
                event.stopPropagation();
            }
        };
        McTag.prototype.handleKeydown = function (event) {
            if (this.disabled) {
                return;
            }
            // tslint:disable-next-line: deprecation
            switch (event.keyCode) {
                case keycodes.DELETE:
                case keycodes.BACKSPACE:
                    // If we are removable, remove the focused tag
                    this.remove();
                    // Always prevent so page navigation does not occur
                    event.preventDefault();
                    break;
                case keycodes.SPACE:
                    // If we are selectable, toggle the focused tag
                    if (this.selectable) {
                        this.toggleSelected(true);
                    }
                    // Always prevent space from scrolling the page since the list has focus
                    event.preventDefault();
                    break;
                default:
            }
        };
        McTag.prototype.blur = function () {
            var _this = this;
            // When animations are enabled, Angular may end up removing the tag from the DOM a little
            // earlier than usual, causing it to be blurred and throwing off the logic in the tag list
            // that moves focus not the next item. To work around the issue, we defer marking the tag
            // as not focused until the next time the zone stabilizes.
            this._ngZone.onStable
                .asObservable()
                .pipe(operators.take(1))
                .subscribe(function () {
                _this._ngZone.run(function () {
                    _this.hasFocus = false;
                    _this.onBlur.next({ tag: _this });
                });
            });
        };
        McTag.prototype.dispatchSelectionChange = function (isUserInput) {
            if (isUserInput === void 0) { isUserInput = false; }
            this.selectionChange.emit({
                source: this,
                isUserInput: isUserInput,
                selected: this._selected
            });
        };
        return McTag;
    }(McTagMixinBase));
    McTag.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-tag, [mc-tag], mc-basic-tag, [mc-basic-tag]',
                    exportAs: 'mcTag',
                    template: "<div class=\"mc-tag__wrapper\">\n    <span class=\"mc-tag__text\"><ng-content></ng-content></span>\n    <ng-content select=\"[mc-icon]\"></ng-content>\n    <div class=\"mc-tag-overlay\"></div>\n</div>\n",
                    inputs: ['color'],
                    host: {
                        class: 'mc-tag',
                        '[attr.tabindex]': 'tabindex',
                        '[attr.disabled]': 'disabled || null',
                        '[class.mc-selected]': 'selected',
                        '[class.mc-focused]': 'hasFocus',
                        '[class.mc-tag-with-avatar]': 'avatar',
                        '[class.mc-tag-with-trailing-icon]': 'trailingIcon || removeIcon',
                        '[class.mc-disabled]': 'disabled',
                        '(click)': 'handleClick($event)',
                        '(keydown)': 'handleKeydown($event)',
                        '(focus)': 'focus()',
                        '(blur)': 'blur()'
                    },
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".mc-tag{position:relative;display:inline-block;overflow:hidden;margin:var(--mc-tags-size-margin,2px);height:var(--mc-tags-size-height,24px);border-width:var(--mc-tags-size-border-width,1px);border-style:solid;border-radius:var(--mc-tags-size-border-radius,4px);cursor:default;outline:none;box-sizing:border-box}.mc-tag.mc-left-icon{padding-left:var(--mc-tags-size-icon-padding,3px)}.mc-tag.mc-right-icon{padding-right:var(--mc-tags-size-icon-padding,3px)}.mc-tag__wrapper{display:flex;align-items:center;height:100%;flex:1 1 100%}.mc-tag__wrapper .mc-icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:var(--mc-tags-size-height,24px);height:var(--mc-tags-size-height,24px)}.mc-tag__wrapper .mc-icon_left{margin-right:var(--mc-tags-size-icon-padding,3px)}.mc-tag__wrapper .mc-icon_right{margin-left:var(--mc-tags-size-icon-padding,3px)}.mc-tag-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}.mc-tag__text{margin-left:calc(var(--mc-tags-size-text-margin, 8px) - var(--mc-tags-size-border-width, 1px));text-overflow:ellipsis;white-space:nowrap;overflow:hidden}"]
                },] }
    ];
    /** @nocollapse */
    McTag.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef },
        { type: core.NgZone }
    ]; };
    McTag.propDecorators = {
        contentChildren: [{ type: core.ContentChildren, args: [icon.McIcon,] }],
        avatar: [{ type: core.ContentChild, args: [McTagAvatar, { static: false },] }],
        trailingIcon: [{ type: core.ContentChild, args: [McTagTrailingIcon, { static: false },] }],
        removeIcon: [{ type: core.ContentChild, args: [core.forwardRef(function () { return McTagRemove; }), { static: false },] }],
        selectionChange: [{ type: core.Output }],
        destroyed: [{ type: core.Output }],
        removed: [{ type: core.Output }],
        selected: [{ type: core.Input }],
        value: [{ type: core.Input }],
        selectable: [{ type: core.Input }],
        removable: [{ type: core.Input }],
        disabled: [{ type: core.Input }]
    };
    /**
     *
     * Example:
     *
     *     `<mc-tag>
     *       <mc-icon mcTagRemove>cancel</mc-icon>
     *     </mc-tag>`
     *
     * You *may* use a custom icon, but you may need to override the `mc-tag-remove` positioning
     * styles to properly center the icon within the tag.
     */
    var McTagRemove = /** @class */ (function () {
        function McTagRemove(parentTag) {
            this.parentTag = parentTag;
        }
        McTagRemove.prototype.focus = function ($event) {
            $event.stopPropagation();
        };
        /** Calls the parent tag's public `remove()` method if applicable. */
        McTagRemove.prototype.handleClick = function (event) {
            if (this.parentTag.removable) {
                this.parentTag.remove();
            }
            // We need to stop event propagation because otherwise the event will bubble up to the
            // form field and cause the `onContainerClick` method to be invoked. This method would then
            // reset the focused tag that has been focused after tag removal. Usually the parent
            // the parent click listener of the `McTag` would prevent propagation, but it can happen
            // that the tag is being removed before the event bubbles up.
            event.stopPropagation();
        };
        return McTagRemove;
    }());
    McTagRemove.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mcTagRemove]',
                    host: {
                        class: 'mc-tag-remove mc-tag-trailing-icon',
                        '[attr.tabindex]': '-1',
                        '(click)': 'handleClick($event)',
                        '(focus)': 'focus($event)'
                    }
                },] }
    ];
    /** @nocollapse */
    McTagRemove.ctorParameters = function () { return [
        { type: McTag }
    ]; };

    var McTagListBase = /** @class */ (function () {
        function McTagListBase(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
            this.defaultErrorStateMatcher = defaultErrorStateMatcher;
            this.parentForm = parentForm;
            this.parentFormGroup = parentFormGroup;
            this.ngControl = ngControl;
        }
        return McTagListBase;
    }());
    // tslint:disable-next-line:naming-convention
    var McTagListMixinBase = core$1.mixinErrorState(McTagListBase);
    // Increasing integer for generating unique ids for tag-list components.
    var nextUniqueId = 0;
    /** Change event object that is emitted when the tag list value has changed. */
    var McTagListChange = /** @class */ (function () {
        function McTagListChange(source, value) {
            this.source = source;
            this.value = value;
        }
        return McTagListChange;
    }());
    var McTagList = /** @class */ (function (_super) {
        __extends(McTagList, _super);
        function McTagList(elementRef, changeDetectorRef, defaultErrorStateMatcher, rawValidators, mcValidation, dir, parentForm, parentFormGroup, ngControl, ngModel, formControlName) {
            var _this = _super.call(this, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) || this;
            _this.elementRef = elementRef;
            _this.changeDetectorRef = changeDetectorRef;
            _this.rawValidators = rawValidators;
            _this.mcValidation = mcValidation;
            _this.dir = dir;
            _this.ngModel = ngModel;
            _this.formControlName = formControlName;
            _this.controlType = 'tag-list';
            _this._tabIndex = 0;
            /**
             * Event that emits whenever the raw value of the tag-list changes. This is here primarily
             * to facilitate the two-way binding for the `value` input.
             * @docs-private
             */
            _this.valueChange = new core.EventEmitter();
            _this.uid = "mc-tag-list-" + nextUniqueId++;
            /**
             * User defined tab index.
             * When it is not null, use user defined tab index. Otherwise use tabIndex
             */
            _this.userTabIndex = null;
            _this.tagChanges = new core.EventEmitter();
            /** Orientation of the tag list. */
            _this.orientation = 'horizontal';
            /** Event emitted when the selected tag list value has been changed by the user. */
            _this.change = new core.EventEmitter();
            _this._required = false;
            _this._disabled = false;
            _this._selectable = true;
            _this._multiple = false;
            /**
             * When a tag is destroyed, we store the index of the destroyed tag until the tags
             * query list notifies about the update. This is necessary because we cannot determine an
             * appropriate tag that should receive focus until the array of tags updated completely.
             */
            _this.lastDestroyedTagIndex = null;
            /** Subject that emits when the component has been destroyed. */
            _this.destroyed = new rxjs.Subject();
            // tslint:disable-next-line:no-empty
            _this.onTouched = function () { };
            // tslint:disable-next-line:no-empty
            _this.onChange = function () { };
            _this._compareWith = function (o1, o2) { return o1 === o2; };
            if (_this.ngControl) {
                _this.ngControl.valueAccessor = _this;
            }
            return _this;
        }
        Object.defineProperty(McTagList.prototype, "tagSelectionChanges", {
            /** Combined stream of all of the child tags' selection change events. */
            get: function () {
                return rxjs.merge.apply(void 0, __spread(this.tags.map(function (tag) { return tag.selectionChange; })));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTagList.prototype, "tagFocusChanges", {
            /** Combined stream of all of the child tags' focus change events. */
            get: function () {
                return rxjs.merge.apply(void 0, __spread(this.tags.map(function (tag) { return tag.onFocus; })));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTagList.prototype, "tagBlurChanges", {
            /** Combined stream of all of the child tags' blur change events. */
            get: function () {
                return rxjs.merge.apply(void 0, __spread(this.tags.map(function (tag) { return tag.onBlur; })));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTagList.prototype, "tagRemoveChanges", {
            /** Combined stream of all of the child tags' remove change events. */
            get: function () {
                return rxjs.merge.apply(void 0, __spread(this.tags.map(function (tag) { return tag.destroyed; })));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTagList.prototype, "selected", {
            /** The array of selected tags inside tag list. */
            get: function () {
                return this.multiple ? this.selectionModel.selected : this.selectionModel.selected[0];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTagList.prototype, "canShowCleaner", {
            get: function () {
                return this.cleaner && this.tags.length > 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTagList.prototype, "multiple", {
            /** Whether the user should be allowed to select multiple tags. */
            get: function () {
                return this._multiple;
            },
            set: function (value) {
                this._multiple = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTagList.prototype, "compareWith", {
            /**
             * A function to compare the option values with the selected values. The first argument
             * is a value from an option. The second is a value from the selection. A boolean
             * should be returned.
             */
            get: function () {
                return this._compareWith;
            },
            set: function (fn) {
                this._compareWith = fn;
                if (this.selectionModel) {
                    // A different comparator means the selection could change.
                    this.initializeSelection();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTagList.prototype, "value", {
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            get: function () {
                return this._value;
            },
            set: function (value) {
                this.writeValue(value);
                this._value = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTagList.prototype, "id", {
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            get: function () {
                return this.tagInput ? this.tagInput.id : this.uid;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTagList.prototype, "required", {
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
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
        Object.defineProperty(McTagList.prototype, "placeholder", {
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            get: function () {
                return this.tagInput ? this.tagInput.placeholder : this._placeholder;
            },
            set: function (value) {
                this._placeholder = value;
                this.stateChanges.next();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTagList.prototype, "focused", {
            /** Whether any tags or the mcTagInput inside of this tag-list has focus. */
            get: function () {
                return (this.tagInput && this.tagInput.focused) || this.hasFocusedTag();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTagList.prototype, "empty", {
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            get: function () {
                return (!this.tagInput || this.tagInput.empty) && this.tags.length === 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTagList.prototype, "shouldLabelFloat", {
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            get: function () {
                return !this.empty || this.focused;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTagList.prototype, "disabled", {
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            get: function () {
                return this.ngControl ? !!this.ngControl.disabled : this._disabled;
            },
            set: function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
                this.syncTagsDisabledState();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTagList.prototype, "selectable", {
            /**
             * Whether or not this tag list is selectable. When a tag list is not selectable,
             * the selected states for all the tags inside the tag list are always ignored.
             */
            get: function () {
                return this._selectable;
            },
            set: function (value) {
                var _this = this;
                this._selectable = coercion.coerceBooleanProperty(value);
                if (this.tags) {
                    this.tags.forEach(function (tag) { return tag.tagListSelectable = _this._selectable; });
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTagList.prototype, "tabIndex", {
            get: function () {
                return this._tabIndex;
            },
            set: function (value) {
                this.userTabIndex = value;
                this._tabIndex = value;
            },
            enumerable: false,
            configurable: true
        });
        McTagList.prototype.ngAfterContentInit = function () {
            var _this = this;
            if (this.mcValidation.useValidation) {
                core$1.setMosaicValidation(this);
            }
            this.keyManager = new a11y.FocusKeyManager(this.tags)
                .withVerticalOrientation()
                .withHorizontalOrientation(this.dir ? this.dir.value : 'ltr');
            if (this.dir) {
                this.dir.change
                    .pipe(operators.takeUntil(this.destroyed))
                    .subscribe(function (dir) { return _this.keyManager.withHorizontalOrientation(dir); });
            }
            // Prevents the tag list from capturing focus and redirecting
            // it back to the first tag when the user tabs out.
            this.keyManager.tabOut
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function () {
                _this._tabIndex = -1;
                setTimeout(function () {
                    _this._tabIndex = _this.userTabIndex || 0;
                    _this.changeDetectorRef.markForCheck();
                });
            });
            // When the list changes, re-subscribe
            this.tags.changes
                .pipe(operators.startWith(null), operators.takeUntil(this.destroyed))
                .subscribe(function () {
                if (_this.disabled) {
                    // Since this happens after the content has been
                    // checked, we need to defer it to the next tick.
                    Promise.resolve().then(function () { _this.syncTagsDisabledState(); });
                }
                _this.resetTags();
                // Reset tags selected/deselected status
                _this.initializeSelection();
                // Check to see if we need to update our tab index
                _this.updateTabIndex();
                // Check to see if we have a destroyed tag and need to refocus
                _this.updateFocusForDestroyedTags();
                // Defer setting the value in order to avoid the "Expression
                // has changed after it was checked" errors from Angular.
                Promise.resolve().then(function () {
                    _this.tagChanges.emit(_this.tags.toArray());
                    _this.stateChanges.next();
                    _this.propagateTagsChanges();
                });
            });
        };
        McTagList.prototype.ngOnInit = function () {
            this.selectionModel = new collections.SelectionModel(this.multiple, undefined, false);
            this.stateChanges.next();
        };
        McTagList.prototype.ngDoCheck = function () {
            if (this.ngControl) {
                // We need to re-evaluate this on every change detection cycle, because there are some
                // error triggers that we can't subscribe to (e.g. parent form submissions). This means
                // that whatever logic is in here has to be super lean or we risk destroying the performance.
                this.updateErrorState();
            }
        };
        McTagList.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
            this.stateChanges.complete();
            this.dropSubscriptions();
        };
        /** Associates an HTML input element with this tag list. */
        McTagList.prototype.registerInput = function (inputElement) {
            var _this = this;
            var _a;
            this.tagInput = inputElement;
            // todo need rethink about it
            if (this.ngControl && ((_a = inputElement.ngControl) === null || _a === void 0 ? void 0 : _a.statusChanges)) {
                inputElement.ngControl.statusChanges
                    .subscribe(function () { return _this.ngControl.control.setErrors(inputElement.ngControl.errors); });
            }
        };
        // Implemented as part of ControlValueAccessor.
        McTagList.prototype.writeValue = function (value) {
            if (this.tags) {
                this.setSelectionByValue(value, false);
            }
        };
        // Implemented as part of ControlValueAccessor.
        McTagList.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        // Implemented as part of ControlValueAccessor.
        McTagList.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        // Implemented as part of ControlValueAccessor.
        McTagList.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
            this.stateChanges.next();
        };
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        McTagList.prototype.onContainerClick = function (event) {
            if (!this.originatesFromTag(event)) {
                this.focus();
            }
        };
        /**
         * Focuses the first non-disabled tag in this tag list, or the associated input when there
         * are no eligible tags.
         */
        McTagList.prototype.focus = function () {
            if (this.disabled) {
                return;
            }
            // TODO: ARIA says this should focus the first `selected` tag if any are selected.
            // Focus on first element if there's no tagInput inside tag-list
            if (this.tagInput && this.tagInput.focused) {
                // do nothing
            }
            else if (this.tags.length > 0) {
                this.keyManager.setFirstItemActive();
                this.stateChanges.next();
            }
            else {
                this.focusInput();
                this.stateChanges.next();
            }
        };
        /** Attempt to focus an input if we have one. */
        McTagList.prototype.focusInput = function () {
            if (this.tagInput) {
                this.tagInput.focus();
            }
        };
        /**
         * Pass events to the keyboard manager. Available here for tests.
         */
        McTagList.prototype.keydown = function (event) {
            var target = event.target;
            // If they are on an empty input and hit backspace, focus the last tag
            // tslint:disable-next-line: deprecation
            if (event.keyCode === keycodes.BACKSPACE && this.isInputEmpty(target)) {
                this.keyManager.setLastItemActive();
                event.preventDefault();
            }
            else if (target && target.classList.contains('mc-tag')) {
                // tslint:disable-next-line: deprecation
                if (event.keyCode === keycodes.HOME) {
                    this.keyManager.setFirstItemActive();
                    event.preventDefault();
                    // tslint:disable-next-line: deprecation
                }
                else if (event.keyCode === keycodes.END) {
                    this.keyManager.setLastItemActive();
                    event.preventDefault();
                }
                else {
                    this.keyManager.onKeydown(event);
                }
                this.stateChanges.next();
            }
        };
        McTagList.prototype.setSelectionByValue = function (value, isUserInput) {
            var _this = this;
            if (isUserInput === void 0) { isUserInput = true; }
            this.clearSelection();
            this.tags.forEach(function (tag) { return tag.deselect(); });
            if (Array.isArray(value)) {
                value.forEach(function (currentValue) { return _this.selectValue(currentValue, isUserInput); });
                this.sortValues();
            }
            else {
                var correspondingTag = this.selectValue(value, isUserInput);
                // Shift focus to the active item. Note that we shouldn't do this in multiple
                // mode, because we don't know what tag the user interacted with last.
                if (correspondingTag && isUserInput) {
                    this.keyManager.setActiveItem(correspondingTag);
                }
            }
        };
        /** When blurred, mark the field as touched when focus moved outside the tag list. */
        McTagList.prototype.blur = function () {
            var _this = this;
            if (!this.hasFocusedTag()) {
                this.keyManager.setActiveItem(-1);
            }
            if (!this.disabled) {
                if (this.tagInput) {
                    // If there's a tag input, we should check whether the focus moved to tag input.
                    // If the focus is not moved to tag input, mark the field as touched. If the focus moved
                    // to tag input, do nothing.
                    // Timeout is needed to wait for the focus() event trigger on tag input.
                    setTimeout(function () {
                        if (!_this.focused) {
                            _this.markAsTouched();
                        }
                    });
                }
                else {
                    // If there's no tag input, then mark the field as touched.
                    this.markAsTouched();
                }
            }
        };
        /** Mark the field as touched */
        McTagList.prototype.markAsTouched = function () {
            this.onTouched();
            this.changeDetectorRef.markForCheck();
            this.stateChanges.next();
        };
        /**
         * Check the tab index as you should not be allowed to focus an empty list.
         */
        McTagList.prototype.updateTabIndex = function () {
            // If we have 0 tags, we should not allow keyboard focus
            this._tabIndex = this.userTabIndex || (this.tags.length === 0 ? -1 : 0);
        };
        /**
         * If the amount of tags changed, we need to update the
         * key manager state and focus the next closest tag.
         */
        McTagList.prototype.updateFocusForDestroyedTags = function () {
            if (this.lastDestroyedTagIndex != null) {
                if (this.tags.length) {
                    var newTagIndex = Math.min(this.lastDestroyedTagIndex, this.tags.length - 1);
                    this.keyManager.setActiveItem(newTagIndex);
                }
                else {
                    this.focusInput();
                }
            }
            this.lastDestroyedTagIndex = null;
        };
        /**
         * Utility to ensure all indexes are valid.
         *
         * @param index The index to be checked.
         * @returns True if the index is valid for our list of tags.
         */
        McTagList.prototype.isValidIndex = function (index) {
            return index >= 0 && index < this.tags.length;
        };
        McTagList.prototype.isInputEmpty = function (element) {
            if (element && element.nodeName.toLowerCase() === 'input') {
                var input = element;
                return !input.value;
            }
            return false;
        };
        /**
         * Finds and selects the tag based on its value.
         * @returns Tag that has the corresponding value.
         */
        McTagList.prototype.selectValue = function (value, isUserInput) {
            var _this = this;
            if (isUserInput === void 0) { isUserInput = true; }
            var correspondingTag = this.tags.find(function (tag) {
                return tag.value != null && _this._compareWith(tag.value, value);
            });
            if (correspondingTag) {
                if (isUserInput) {
                    correspondingTag.selectViaInteraction();
                }
                else {
                    correspondingTag.select();
                }
                this.selectionModel.select(correspondingTag);
            }
            return correspondingTag;
        };
        McTagList.prototype.initializeSelection = function () {
            var _this = this;
            // Defer setting the value in order to avoid the "Expression
            // has changed after it was checked" errors from Angular.
            Promise.resolve().then(function () {
                if (_this.ngControl || _this._value) {
                    _this.setSelectionByValue(_this.ngControl ? _this.ngControl.value : _this._value, false);
                    _this.stateChanges.next();
                }
            });
        };
        /**
         * Deselects every tag in the list.
         * @param skip Tag that should not be deselected.
         */
        McTagList.prototype.clearSelection = function (skip) {
            this.selectionModel.clear();
            this.tags.forEach(function (tag) {
                if (tag !== skip) {
                    tag.deselect();
                }
            });
            this.stateChanges.next();
        };
        /**
         * Sorts the model values, ensuring that they keep the same
         * order that they have in the panel.
         */
        McTagList.prototype.sortValues = function () {
            var _this = this;
            if (this._multiple) {
                this.selectionModel.clear();
                this.tags.forEach(function (tag) {
                    if (tag.selected) {
                        _this.selectionModel.select(tag);
                    }
                });
                this.stateChanges.next();
            }
        };
        /** Emits change event to set the model value. */
        // todo need rethink this method and selection logic
        McTagList.prototype.propagateChanges = function (fallbackValue) {
            var valueToEmit = null;
            if (Array.isArray(this.selected)) {
                valueToEmit = this.selected.map(function (tag) { return tag.value; });
            }
            else {
                valueToEmit = this.selected ? this.selected.value : fallbackValue;
            }
            this._value = valueToEmit;
            this.change.emit(new McTagListChange(this, valueToEmit));
            this.valueChange.emit(valueToEmit);
            this.onChange(valueToEmit);
            this.changeDetectorRef.markForCheck();
        };
        McTagList.prototype.propagateTagsChanges = function () {
            var valueToEmit = this.tags.map(function (tag) { return tag.value; });
            this._value = valueToEmit;
            this.change.emit(new McTagListChange(this, valueToEmit));
            this.valueChange.emit(valueToEmit);
            this.onChange(valueToEmit);
            this.changeDetectorRef.markForCheck();
        };
        McTagList.prototype.resetTags = function () {
            this.dropSubscriptions();
            this.listenToTagsFocus();
            this.listenToTagsSelection();
            this.listenToTagsRemoved();
        };
        McTagList.prototype.dropSubscriptions = function () {
            if (this.tagFocusSubscription) {
                this.tagFocusSubscription.unsubscribe();
                this.tagFocusSubscription = null;
            }
            if (this.tagBlurSubscription) {
                this.tagBlurSubscription.unsubscribe();
                this.tagBlurSubscription = null;
            }
            if (this.tagSelectionSubscription) {
                this.tagSelectionSubscription.unsubscribe();
                this.tagSelectionSubscription = null;
            }
            if (this.tagRemoveSubscription) {
                this.tagRemoveSubscription.unsubscribe();
                this.tagRemoveSubscription = null;
            }
        };
        /** Listens to user-generated selection events on each tag. */
        McTagList.prototype.listenToTagsSelection = function () {
            var _this = this;
            this.tagSelectionSubscription = this.tagSelectionChanges.subscribe(function (event) {
                if (event.source.selected) {
                    _this.selectionModel.select(event.source);
                }
                else {
                    _this.selectionModel.deselect(event.source);
                }
                // For single selection tag list, make sure the deselected value is unselected.
                if (!_this.multiple) {
                    _this.tags.forEach(function (tag) {
                        if (!_this.selectionModel.isSelected(tag) && tag.selected) {
                            tag.deselect();
                        }
                    });
                }
                if (event.isUserInput) {
                    _this.propagateChanges();
                }
            });
        };
        /** Listens to user-generated selection events on each tag. */
        McTagList.prototype.listenToTagsFocus = function () {
            var _this = this;
            this.tagFocusSubscription = this.tagFocusChanges.subscribe(function (event) {
                var tagIndex = _this.tags.toArray().indexOf(event.tag);
                if (_this.isValidIndex(tagIndex)) {
                    _this.keyManager.updateActiveItem(tagIndex);
                }
                _this.stateChanges.next();
            });
            this.tagBlurSubscription = this.tagBlurChanges.subscribe(function () {
                _this.blur();
                _this.stateChanges.next();
            });
        };
        McTagList.prototype.listenToTagsRemoved = function () {
            var _this = this;
            this.tagRemoveSubscription = this.tagRemoveChanges.subscribe(function (event) {
                var tag = event.tag;
                var tagIndex = _this.tags.toArray().indexOf(event.tag);
                // In case the tag that will be removed is currently focused, we temporarily store
                // the index in order to be able to determine an appropriate sibling tag that will
                // receive focus.
                if (_this.isValidIndex(tagIndex) && tag.hasFocus) {
                    _this.lastDestroyedTagIndex = tagIndex;
                }
                else if (_this.isValidIndex(tagIndex) && !tag.hasFocus) {
                    _this.focusInput();
                }
            });
        };
        /** Checks whether an event comes from inside a tag element. */
        McTagList.prototype.originatesFromTag = function (event) {
            var currentElement = event.target;
            while (currentElement && currentElement !== this.elementRef.nativeElement) {
                if (currentElement.classList.contains('mc-tag')) {
                    return true;
                }
                currentElement = currentElement.parentElement;
            }
            return false;
        };
        /** Checks whether any of the tags is focused. */
        McTagList.prototype.hasFocusedTag = function () {
            return this.tags.some(function (tag) { return tag.hasFocus; });
        };
        /** Syncs the list's disabled state with the individual tags. */
        McTagList.prototype.syncTagsDisabledState = function () {
            var _this = this;
            if (this.tags) {
                this.tags.forEach(function (tag) {
                    tag.disabled = _this._disabled;
                });
            }
        };
        return McTagList;
    }(McTagListMixinBase));
    McTagList.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-tag-list',
                    exportAs: 'mcTagList',
                    template: "<div class=\"mc-tags-list__list-container\">\n    <ng-content></ng-content>\n</div>\n\n<div class=\"mc-tags-list__cleaner\"\n     *ngIf=\"canShowCleaner\">\n    <ng-content select=\"mc-cleaner\"></ng-content>\n</div>\n",
                    host: {
                        class: 'mc-tag-list',
                        '[class.mc-disabled]': 'disabled',
                        '[class.mc-invalid]': 'errorState',
                        '[attr.tabindex]': 'disabled ? null : tabIndex',
                        '[id]': 'uid',
                        '(focus)': 'focus()',
                        '(blur)': 'blur()',
                        '(keydown)': 'keydown($event)'
                    },
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    providers: [{ provide: formField.McFormFieldControl, useExisting: McTagList }],
                    styles: [".mc-tag-list{display:flex;flex-direction:row;box-sizing:border-box}.mc-tag-input{border:none;outline:none;background:transparent}.mc-tags-list__list-container{display:flex;flex-wrap:wrap;flex:1 1 100%;box-sizing:border-box;min-width:0;min-height:var(--mc-tag-list-size-min-height,30px);padding:var(--mc-tag-list-size-padding,1px 6px)}.mc-tags-list__list-container .mc-tag-input{max-width:100%;flex:1 1 auto;height:var(--mc-tag-input-size-height,22px);margin:var(--mc-tag-input-size-margin,2px 4px)}.mc-tags-list__cleaner .mc-cleaner{height:30px}"]
                },] }
    ];
    /** @nocollapse */
    McTagList.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef },
        { type: core$1.ErrorStateMatcher },
        { type: Array, decorators: [{ type: core.Optional }, { type: core.Inject, args: [forms.NG_VALIDATORS,] }] },
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [core$1.MC_VALIDATION,] }] },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
        { type: forms.NgForm, decorators: [{ type: core.Optional }] },
        { type: forms.FormGroupDirective, decorators: [{ type: core.Optional }] },
        { type: forms.NgControl, decorators: [{ type: core.Optional }, { type: core.Self }] },
        { type: forms.NgModel, decorators: [{ type: core.Optional }, { type: core.Self }] },
        { type: forms.FormControlName, decorators: [{ type: core.Optional }, { type: core.Self }] }
    ]; };
    McTagList.propDecorators = {
        multiple: [{ type: core.Input }],
        compareWith: [{ type: core.Input }],
        value: [{ type: core.Input }],
        required: [{ type: core.Input }],
        placeholder: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        selectable: [{ type: core.Input }],
        tabIndex: [{ type: core.Input }],
        valueChange: [{ type: core.Output }],
        errorStateMatcher: [{ type: core.Input }],
        orientation: [{ type: core.Input, args: ['orientation',] }],
        change: [{ type: core.Output }],
        cleaner: [{ type: core.ContentChild, args: ['mcTagListCleaner', { static: true },] }],
        tags: [{ type: core.ContentChildren, args: [McTag, {
                        // Need to use `descendants: true`,
                        // Ivy will no longer match indirect descendants if it's left as false.
                        descendants: true
                    },] }]
    };

    var ɵ0 = { separatorKeyCodes: [keycodes.ENTER] };
    var McTagsModule = /** @class */ (function () {
        function McTagsModule() {
        }
        return McTagsModule;
    }());
    McTagsModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, platform.PlatformModule],
                    exports: [
                        McTagList,
                        McTag,
                        McTagInput,
                        McTagTrailingIcon,
                        McTagAvatar,
                        McTagRemove
                    ],
                    declarations: [
                        McTagList,
                        McTag,
                        McTagInput,
                        McTagTrailingIcon,
                        McTagAvatar,
                        McTagRemove
                    ],
                    providers: [{
                            provide: MC_TAGS_DEFAULT_OPTIONS,
                            // tslint:disable-next-line: no-object-literal-type-assertion
                            useValue: ɵ0
                        }]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.MC_TAGS_DEFAULT_OPTIONS = MC_TAGS_DEFAULT_OPTIONS;
    exports.McTag = McTag;
    exports.McTagAvatar = McTagAvatar;
    exports.McTagBase = McTagBase;
    exports.McTagInput = McTagInput;
    exports.McTagList = McTagList;
    exports.McTagListBase = McTagListBase;
    exports.McTagListChange = McTagListChange;
    exports.McTagListMixinBase = McTagListMixinBase;
    exports.McTagMixinBase = McTagMixinBase;
    exports.McTagRemove = McTagRemove;
    exports.McTagSelectionChange = McTagSelectionChange;
    exports.McTagTrailingIcon = McTagTrailingIcon;
    exports.McTagsModule = McTagsModule;
    exports.ɵ0 = ɵ0;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-tags.umd.js.map
