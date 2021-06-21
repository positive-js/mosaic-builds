(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/coercion'), require('@angular/core'), require('@ptsecurity/cdk/a11y'), require('@ptsecurity/mosaic/core'), require('@angular/cdk/overlay'), require('@angular/common'), require('@angular/cdk/bidi'), require('@angular/cdk/portal'), require('@angular/cdk/scrolling'), require('@angular/forms'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/mosaic/form-field'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/autocomplete', ['exports', '@angular/cdk/coercion', '@angular/core', '@ptsecurity/cdk/a11y', '@ptsecurity/mosaic/core', '@angular/cdk/overlay', '@angular/common', '@angular/cdk/bidi', '@angular/cdk/portal', '@angular/cdk/scrolling', '@angular/forms', '@ptsecurity/cdk/keycodes', '@ptsecurity/mosaic/form-field', 'rxjs', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.autocomplete = {}), global.ng.cdk.coercion, global.ng.core, global.a11y, global.ptsecurity.mosaic.core, global.ng.cdk.overlay, global.ng.common, global.ng.cdk.bidi, global.ng.cdk.portal, global.ng.cdk.scrolling, global.ng.forms, global.keycodes, global.ptsecurity.mosaic['form-field'], global.rxjs, global.rxjs.operators));
}(this, (function (exports, coercion, core, a11y, core$1, overlay, common, bidi, portal, scrolling, forms, keycodes, formField, rxjs, operators) { 'use strict';

    /**
     * Autocomplete IDs need to be unique across components, so this counter exists outside of
     * the component definition.
     */
    var uniqueAutocompleteIdCounter = 0;
    var McAutocompleteSelectedEvent = /** @class */ (function () {
        function McAutocompleteSelectedEvent(source, option) {
            this.source = source;
            this.option = option;
        }
        return McAutocompleteSelectedEvent;
    }());
    /** Injection token to be used to override the default options for `mc-autocomplete`. */
    var MC_AUTOCOMPLETE_DEFAULT_OPTIONS = new core.InjectionToken('mc-autocomplete-default-options', {
        providedIn: 'root',
        factory: MC_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY
    });
    // tslint:disable-next-line naming-convention
    function MC_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY() {
        return { autoActiveFirstOption: true };
    }
    var McAutocomplete = /** @class */ (function () {
        function McAutocomplete(changeDetectorRef, elementRef, defaults) {
            this.changeDetectorRef = changeDetectorRef;
            this.elementRef = elementRef;
            /** Unique ID to be used by autocomplete trigger's "aria-owns" property. */
            this.id = "mc-autocomplete-" + uniqueAutocompleteIdCounter++;
            /** Whether the autocomplete panel should be visible, depending on option length. */
            this.showPanel = false;
            /** Function that maps an option's control value to its display value in the trigger. */
            this.displayWith = null;
            /** Event that is emitted whenever an option from the list is selected. */
            this.optionSelected = new core.EventEmitter();
            /** Event that is emitted when the autocomplete panel is opened. */
            this.opened = new core.EventEmitter();
            /** Event that is emitted when the autocomplete panel is closed. */
            this.closed = new core.EventEmitter();
            this._classList = {};
            this._isOpen = false;
            this._openOnFocus = true;
            this._autoActiveFirstOption = !!defaults.autoActiveFirstOption;
        }
        Object.defineProperty(McAutocomplete.prototype, "classList", {
            /**
             * Takes classes set on the host mc-autocomplete element and applies them to the panel
             * inside the overlay container to allow for easy styling.
             */
            get: function () {
                return this._classList;
            },
            set: function (value) {
                var _this = this;
                if (value && value.length) {
                    value.split(' ')
                        .forEach(function (className) { return _this._classList[className.trim()] = true; });
                    this.elementRef.nativeElement.className = '';
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McAutocomplete.prototype, "autoActiveFirstOption", {
            /**
             * Whether the first option should be highlighted when the autocomplete panel is opened.
             * Can be configured globally through the `MC_AUTOCOMPLETE_DEFAULT_OPTIONS` token.
             */
            get: function () {
                return this._autoActiveFirstOption;
            },
            set: function (value) {
                this._autoActiveFirstOption = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McAutocomplete.prototype, "isOpen", {
            get: function () {
                return this._isOpen && this.showPanel;
            },
            set: function (value) {
                this._isOpen = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McAutocomplete.prototype, "openOnFocus", {
            get: function () {
                return this._openOnFocus;
            },
            set: function (value) {
                this._openOnFocus = value;
            },
            enumerable: false,
            configurable: true
        });
        McAutocomplete.prototype.ngAfterContentInit = function () {
            this.keyManager = new a11y.ActiveDescendantKeyManager(this.options);
            this.setVisibility();
        };
        McAutocomplete.prototype.setScrollTop = function (scrollTop) {
            if (this.panel) {
                this.panel.nativeElement.scrollTop = scrollTop;
            }
        };
        McAutocomplete.prototype.getScrollTop = function () {
            return this.panel ? this.panel.nativeElement.scrollTop : 0;
        };
        McAutocomplete.prototype.setVisibility = function () {
            this.showPanel = !!this.options.length;
            this._classList['mc-autocomplete_visible'] = this.showPanel;
            this._classList['mc-autocomplete_hidden'] = !this.showPanel;
            this.changeDetectorRef.markForCheck();
        };
        McAutocomplete.prototype.emitSelectEvent = function (option) {
            var event = new McAutocompleteSelectedEvent(this, option);
            this.optionSelected.emit(event);
        };
        McAutocomplete.prototype.onKeydown = function (event) {
            this.keyManager.onKeydown(event);
        };
        return McAutocomplete;
    }());
    McAutocomplete.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-autocomplete',
                    exportAs: 'mcAutocomplete',
                    template: "<ng-template>\n    <div class=\"mc-autocomplete-panel\" role=\"listbox\" [id]=\"id\" [ngClass]=\"classList\" #panel>\n        <ng-content></ng-content>\n    </div>\n</ng-template>\n",
                    host: {
                        class: 'mc-autocomplete'
                    },
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    providers: [{
                            provide: core$1.MC_OPTION_PARENT_COMPONENT, useExisting: McAutocomplete
                        }],
                    styles: [".mc-autocomplete-trigger{text-overflow:ellipsis}.mc-autocomplete-panel{visibility:hidden;position:relative;overflow:auto;-webkit-overflow-scrolling:touch;margin-top:-1px;min-width:100%;width:100%;max-width:none;max-height:var(--mc-autocomplete-size-panel-max-height,256px);border-width:1px;border-style:solid;border-bottom-left-radius:var(--mc-autocomplete-size-panel-border-radius,3px);border-bottom-right-radius:var(--mc-autocomplete-size-panel-border-radius,3px);padding:var(--mc-autocomplete-size-panel-padding,4px 0)}.mc-autocomplete-panel.mc-autocomplete_visible{visibility:visible}.mc-autocomplete-panel.mc-autocomplete_hidden{visibility:hidden}.mc-autocomplete-panel-above .mc-autocomplete-panel{border-radius:var(--mc-autocomplete-size-panel-border-radius,3px) var(--mc-autocomplete-size-panel-border-radius,3px) 0 0}.mc-autocomplete-panel .mc-divider-horizontal{margin-top:-1px}.cdk-high-contrast-active .mc-autocomplete-panel,.cdk-high-contrast-active :host .mc-autocomplete-panel{outline:1px solid}"]
                },] }
    ];
    /** @nocollapse */
    McAutocomplete.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef },
        { type: core.ElementRef },
        { type: undefined, decorators: [{ type: core.Inject, args: [MC_AUTOCOMPLETE_DEFAULT_OPTIONS,] }] }
    ]; };
    McAutocomplete.propDecorators = {
        template: [{ type: core.ViewChild, args: [core.TemplateRef, { static: true },] }],
        panel: [{ type: core.ViewChild, args: ['panel', { static: false },] }],
        options: [{ type: core.ContentChildren, args: [core$1.McOption, { descendants: true },] }],
        optionGroups: [{ type: core.ContentChildren, args: [core$1.McOptgroup,] }],
        displayWith: [{ type: core.Input }],
        panelWidth: [{ type: core.Input }],
        optionSelected: [{ type: core.Output }],
        opened: [{ type: core.Output }],
        closed: [{ type: core.Output }],
        classList: [{ type: core.Input, args: ['class',] }],
        autoActiveFirstOption: [{ type: core.Input }],
        openOnFocus: [{ type: core.Input }]
    };

    /**
     * Directive applied to an element to make it usable
     * as a connection point for an autocomplete panel.
     */
    var McAutocompleteOrigin = /** @class */ (function () {
        function McAutocompleteOrigin(elementRef) {
            this.elementRef = elementRef;
        }
        return McAutocompleteOrigin;
    }());
    McAutocompleteOrigin.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mcAutocompleteOrigin]',
                    exportAs: 'mcAutocompleteOrigin'
                },] }
    ];
    /** @nocollapse */
    McAutocompleteOrigin.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };

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

    /**
     * The following style constants are necessary to save here in order
     * to properly calculate the scrollTop of the panel. Because we are not
     * actually focusing the active item, scroll must be handled manually.
     */
    /** The height of each autocomplete option. */
    var AUTOCOMPLETE_OPTION_HEIGHT = 32;
    /** The total height of the autocomplete panel. */
    var AUTOCOMPLETE_PANEL_HEIGHT = 256;
    var AUTOCOMPLETE_BORDER_WIDTH = 2;
    /** Injection token that determines the scroll handling while the autocomplete panel is open. */
    var MC_AUTOCOMPLETE_SCROLL_STRATEGY = new core.InjectionToken('mc-autocomplete-scroll-strategy');
    // tslint:disable-next-line naming-convention
    function MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY(overlay) {
        return function () { return overlay.scrollStrategies.reposition(); };
    }
    var MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER = {
        provide: MC_AUTOCOMPLETE_SCROLL_STRATEGY,
        deps: [overlay.Overlay],
        useFactory: MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY
    };
    /**
     * Provider that allows the autocomplete to register as a ControlValueAccessor.
     * @docs-private
     */
    var MAT_AUTOCOMPLETE_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return McAutocompleteTrigger; }),
        multi: true
    };
    /**
     * Creates an error to be thrown when attempting to use an autocomplete trigger without a panel.
     * @docs-private
     */
    function getMcAutocompleteMissingPanelError() {
        return Error('Attempting to open an undefined instance of `mc-autocomplete`. ' +
            'Make sure that the id passed to the `mcAutocomplete` is correct and that ' +
            'you\'re attempting to open it after the ngAfterContentInit hook.');
    }
    var McAutocompleteTrigger = /** @class */ (function () {
        function McAutocompleteTrigger(elementRef, viewContainerRef, changeDetectorRef, overlay, zone, scrollStrategy, dir, formField, document, 
        // @breaking-change 8.0.0 Make `_viewportRuler` required.
        viewportRuler) {
            var _this = this;
            this.elementRef = elementRef;
            this.viewContainerRef = viewContainerRef;
            this.changeDetectorRef = changeDetectorRef;
            this.overlay = overlay;
            this.zone = zone;
            this.dir = dir;
            this.formField = formField;
            this.document = document;
            this.viewportRuler = viewportRuler;
            // @ts-ignore
            this.optionSelections = rxjs.defer(function () {
                if (_this.autocomplete && _this.autocomplete.options) {
                    return rxjs.merge.apply(void 0, __spread(_this.autocomplete.options.map(function (option) { return option.onSelectionChange; })));
                }
                // If there are any subscribers before `ngAfterViewInit`, the `autocomplete` will be undefined.
                // Return a stream that we'll replace with the real one once everything is in place.
                return _this.zone.onStable
                    .asObservable()
                    .pipe(operators.take(1), operators.switchMap(function () { return _this.optionSelections; }));
            });
            /**
             * `autocomplete` attribute to be set on the input element.
             * @docs-private
             */
            this.autocompleteAttribute = 'off';
            this._autocompleteDisabled = false;
            this.overlayAttached = false;
            this.componentDestroyed = false;
            /** Subscription to viewport size changes. */
            this.viewportSubscription = rxjs.Subscription.EMPTY;
            /**
             * Whether the autocomplete can open the next time it is focused. Used to prevent a focused,
             * closed autocomplete from being reopened if the user switches to another browser tab and then
             * comes back.
             */
            this.canOpenOnNextFocus = true;
            /** Stream of keyboard events that can close the panel. */
            this.closeKeyEventStream = new rxjs.Subject();
            /** `View -> model callback called when value changes` */
            // tslint:disable-next-line no-empty
            this.onChange = function () { };
            /** `View -> model callback called when autocomplete has been touched` */
            // tslint:disable-next-line no-empty
            this.onTouched = function () { };
            /**
             * Event handler for when the window is blurred. Needs to be an
             * arrow function in order to preserve the context.
             */
            this.windowBlurHandler = function () {
                // If the user blurred the window while the autocomplete is focused, it means that it'll be
                // refocused when they come back. In this case we want to skip the first focus event, if the
                // pane was closed, in order to avoid reopening it unintentionally.
                _this.canOpenOnNextFocus = _this.document.activeElement !== _this.elementRef.nativeElement || _this.panelOpen;
            };
            // tslint:disable-next-line no-typeof-undefined
            if (typeof window !== 'undefined') {
                zone.runOutsideAngular(function () {
                    window.addEventListener('blur', _this.windowBlurHandler);
                });
            }
            this.scrollStrategy = scrollStrategy;
        }
        Object.defineProperty(McAutocompleteTrigger.prototype, "activeOption", {
            /** The currently active option, coerced to MatOption type. */
            get: function () {
                if (this.autocomplete && this.autocomplete.keyManager) {
                    return this.autocomplete.keyManager.activeItem;
                }
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McAutocompleteTrigger.prototype, "panelOpen", {
            get: function () {
                return this.overlayAttached && this.autocomplete.showPanel;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McAutocompleteTrigger.prototype, "autocompleteDisabled", {
            /**
             * Whether the autocomplete is disabled. When disabled, the element will
             * act as a regular input and the user won't be able to open the panel.
             */
            get: function () {
                return this._autocompleteDisabled;
            },
            set: function (value) {
                this._autocompleteDisabled = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        McAutocompleteTrigger.prototype.ngOnDestroy = function () {
            // tslint:disable-next-line no-typeof-undefined
            if (typeof window !== 'undefined') {
                window.removeEventListener('blur', this.windowBlurHandler);
            }
            this.viewportSubscription.unsubscribe();
            this.componentDestroyed = true;
            this.destroyPanel();
            this.closeKeyEventStream.complete();
        };
        /** Opens the autocomplete suggestion panel. */
        McAutocompleteTrigger.prototype.openPanel = function () {
            this.attachOverlay();
        };
        McAutocompleteTrigger.prototype.closePanel = function () {
            if (!this.overlayAttached) {
                return;
            }
            if (this.panelOpen) {
                this.autocomplete.closed.emit();
            }
            this.autocomplete.isOpen = this.overlayAttached = false;
            if (this.overlayRef && this.overlayRef.hasAttached()) {
                this.overlayRef.detach();
                this.closingActionsSubscription.unsubscribe();
            }
            // Note that in some cases this can end up being called after the component is destroyed.
            // Add a check to ensure that we don't try to run change detection on a destroyed view.
            if (!this.componentDestroyed) {
                // We need to trigger change detection manually, because
                // `fromEvent` doesn't seem to do it at the proper time.
                // This ensures that the label is reset when the
                // user clicks outside.
                this.changeDetectorRef.detectChanges();
            }
        };
        /**
         * Updates the position of the autocomplete suggestion panel to ensure that it fits all options
         * within the viewport.
         */
        McAutocompleteTrigger.prototype.updatePosition = function () {
            if (this.overlayAttached) {
                this.overlayRef.updatePosition();
            }
        };
        Object.defineProperty(McAutocompleteTrigger.prototype, "panelClosingActions", {
            /**
             * A stream of actions that should close the autocomplete panel, including
             * when an option is selected, on blur, and when TAB is pressed.
             */
            get: function () {
                var _this = this;
                return rxjs.merge(this.optionSelections, this.autocomplete.keyManager.tabOut.pipe(operators.filter(function () { return _this.overlayAttached; })), this.closeKeyEventStream, this.getOutsideClickStream(), this.overlayRef ?
                    this.overlayRef.detachments().pipe(operators.filter(function () { return _this.overlayAttached; })) :
                    rxjs.of()).pipe(
                // Normalize the output so we return a consistent type.
                operators.map(function (event) { return event instanceof core$1.McOptionSelectionChange ? event : null; }));
            },
            enumerable: false,
            configurable: true
        });
        // Implemented as part of ControlValueAccessor.
        McAutocompleteTrigger.prototype.writeValue = function (value) {
            var _this = this;
            Promise.resolve(null).then(function () { return _this.setTriggerValue(value); });
        };
        // Implemented as part of ControlValueAccessor.
        McAutocompleteTrigger.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        // Implemented as part of ControlValueAccessor.
        McAutocompleteTrigger.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        // Implemented as part of ControlValueAccessor.
        McAutocompleteTrigger.prototype.setDisabledState = function (isDisabled) {
            this.elementRef.nativeElement.disabled = isDisabled;
        };
        McAutocompleteTrigger.prototype.handleKeydown = function (event) {
            // tslint:disable-next-line deprecation
            var keyCode = event.keyCode;
            // Prevent the default action on all escape key presses. This is here primarily to bring IE
            // in line with other browsers. By default, pressing escape on IE will cause it to revert
            // the input value to the one that it had on focus, however it won't dispatch any events
            // which means that the model value will be out of sync with the view.
            if (keyCode === keycodes.ESCAPE) {
                event.preventDefault();
            }
            if (this.activeOption && keyCode === keycodes.ENTER && this.panelOpen) {
                this.activeOption.selectViaInteraction();
                this.resetActiveItem();
                event.preventDefault();
            }
            else if (this.autocomplete) {
                var prevActiveItem = this.autocomplete.keyManager.activeItem;
                if (this.panelOpen || keyCode === keycodes.TAB) {
                    this.autocomplete.onKeydown(event);
                }
                else if (keyCode === keycodes.DOWN_ARROW && this.canOpen()) {
                    this.openPanel();
                }
                var isArrowKey = keyCode === keycodes.UP_ARROW || keyCode === keycodes.DOWN_ARROW;
                if (isArrowKey || this.autocomplete.keyManager.activeItem !== prevActiveItem) {
                    this.scrollToOption();
                }
            }
        };
        McAutocompleteTrigger.prototype.handleInput = function (event) {
            var target = event.target;
            var value = target.value;
            // Based on `NumberValueAccessor` from forms.
            if (target.type === 'number') {
                value = value === '' ? null : parseFloat(value);
            }
            // If the input has a placeholder, IE will fire the `input` event on page load,
            // focus and blur, in addition to when the user actually changed the value. To
            // filter out all of the extra events, we save the value on focus and between
            // `input` events, and we check whether it changed.
            // See: https://connect.microsoft.com/IE/feedback/details/885747/
            if (this.previousValue !== value) {
                this.previousValue = value;
                this.onChange(value);
                if (this.canOpen() && this.document.activeElement === event.target) {
                    this.openPanel();
                }
            }
        };
        McAutocompleteTrigger.prototype.handleFocus = function () {
            if (!this.canOpenOnNextFocus) {
                this.canOpenOnNextFocus = true;
            }
            else if (this.canOpen() && this.autocomplete.openOnFocus) {
                this.previousValue = this.elementRef.nativeElement.value;
                this.attachOverlay();
            }
        };
        McAutocompleteTrigger.prototype.handleClick = function ($event) {
            if (this.canOpen() && this.document.activeElement === $event.target) {
                this.openPanel();
            }
        };
        /** Stream of clicks outside of the autocomplete panel. */
        McAutocompleteTrigger.prototype.getOutsideClickStream = function () {
            var _this = this;
            return rxjs.merge(
            // tslint:disable-next-line: no-unnecessary-type-assertion
            rxjs.fromEvent(this.document, 'click'), 
            // tslint:disable-next-line: no-unnecessary-type-assertion
            rxjs.fromEvent(this.document, 'touchend'))
                .pipe(operators.filter(function (event) {
                var clickTarget = event.target;
                var formField = _this.formField ? _this.formField._elementRef.nativeElement : null;
                var customOrigin = _this.connectedTo ? _this.connectedTo.elementRef.nativeElement : null;
                return _this.overlayAttached &&
                    clickTarget !== _this.elementRef.nativeElement &&
                    (!formField || !formField.contains(clickTarget)) &&
                    (!customOrigin || !customOrigin.contains(clickTarget)) &&
                    (!!_this.overlayRef && !_this.overlayRef.overlayElement.contains(clickTarget));
            }));
        };
        /**
         * Given that we are not actually focusing active options, we must manually adjust scroll
         * to reveal options below the fold. First, we find the offset of the option from the top
         * of the panel. If that offset is below the fold, the new scrollTop will be the offset -
         * the panel height + the option height, so the active option will be just visible at the
         * bottom of the panel. If that offset is above the top of the visible panel, the new scrollTop
         * will become the offset. If that offset is visible within the panel already, the scrollTop is
         * not adjusted.
         */
        McAutocompleteTrigger.prototype.scrollToOption = function () {
            var index = this.autocomplete.keyManager.activeItemIndex || 0;
            var labelCount = core$1.countGroupLabelsBeforeOption(index, this.autocomplete.options, this.autocomplete.optionGroups);
            var newScrollPosition = core$1.getOptionScrollPosition(index + labelCount, AUTOCOMPLETE_OPTION_HEIGHT, this.autocomplete.getScrollTop(), AUTOCOMPLETE_PANEL_HEIGHT);
            this.autocomplete.setScrollTop(newScrollPosition);
        };
        /**
         * This method listens to a stream of panel closing actions and resets the
         * stream every time the option list changes.
         */
        McAutocompleteTrigger.prototype.subscribeToClosingActions = function () {
            var _this = this;
            var firstStable = this.zone.onStable.asObservable()
                .pipe(operators.take(1));
            var optionChanges = this.autocomplete.options.changes
                .pipe(operators.tap(function () { return _this.positionStrategy.reapplyLastPosition(); }), 
            // Defer emitting to the stream until the next tick, because changing
            // bindings in here will cause "changed after checked" errors.
            operators.delay(0));
            // When the zone is stable initially, and when the option list changes...
            return rxjs.merge(firstStable, optionChanges)
                .pipe(
            // create a new stream of panelClosingActions, replacing any previous streams
            // that were created, and flatten it so our stream only emits closing events...
            operators.switchMap(function () {
                var wasOpen = _this.panelOpen;
                _this.resetActiveItem();
                _this.autocomplete.setVisibility();
                if (_this.panelOpen) {
                    _this.overlayRef.updatePosition();
                    // If the `panelOpen` state changed, we need to make sure to emit the `opened`
                    // event, because we may not have emitted it when the panel was attached. This
                    // can happen if the users opens the panel and there are no options, but the
                    // options come in slightly later or as a result of the value changing.
                    if (wasOpen !== _this.panelOpen) {
                        _this.autocomplete.opened.emit();
                    }
                }
                return _this.panelClosingActions;
            }), 
            // when the first closing event occurs...
            operators.take(1))
                // set the value, close the panel, and complete.
                .subscribe(function (event) { return _this.setValueAndClose(event); });
        };
        /** Destroys the autocomplete suggestion panel. */
        McAutocompleteTrigger.prototype.destroyPanel = function () {
            if (this.overlayRef) {
                this.closePanel();
                this.overlayRef.dispose();
                this.overlayRef = null;
            }
        };
        McAutocompleteTrigger.prototype.setTriggerValue = function (value) {
            var toDisplay = this.autocomplete && this.autocomplete.displayWith ?
                this.autocomplete.displayWith(value) :
                value;
            // Simply falling back to an empty string if the display value is falsy does not work properly.
            // The display value can also be the number zero and shouldn't fall back to an empty string.
            var inputValue = toDisplay != null ? toDisplay : '';
            // If it's used within a `MatFormField`, we should set it through the property so it can go
            // through change detection.
            if (this.formField) {
                this.formField.control.value = inputValue;
            }
            else {
                this.elementRef.nativeElement.value = inputValue;
            }
            this.previousValue = inputValue;
        };
        /** This method closes the panel, and if a value is specified, also sets the associated
         * control to that value. It will also mark the control as dirty if this interaction
         * stemmed from the user.
         */
        McAutocompleteTrigger.prototype.setValueAndClose = function (event) {
            if (event && event.source) {
                this.clearPreviousSelectedOption(event.source);
                this.setTriggerValue(event.source.value);
                this.onChange(event.source.value);
                this.elementRef.nativeElement.focus();
                this.autocomplete.emitSelectEvent(event.source);
            }
            this.closePanel();
        };
        /** Clear any previous selected option and emit a selection change event for this option */
        McAutocompleteTrigger.prototype.clearPreviousSelectedOption = function (skip) {
            this.autocomplete.options.forEach(function (option) {
                if (option !== skip && option.selected) {
                    option.deselect();
                }
            });
        };
        McAutocompleteTrigger.prototype.attachOverlay = function () {
            var _this = this;
            if (!this.autocomplete) {
                throw getMcAutocompleteMissingPanelError();
            }
            var overlayRef = this.overlayRef;
            if (!overlayRef) {
                this.portal = new portal.TemplatePortal(this.autocomplete.template, this.viewContainerRef);
                overlayRef = this.overlay.create(this.getOverlayConfig());
                this.overlayRef = overlayRef;
                // Use the `keydownEvents` in order to take advantage of
                // the overlay event targeting provided by the CDK overlay.
                overlayRef.keydownEvents().subscribe(function (event) {
                    // Close when pressing ESCAPE or ALT + UP_ARROW, based on the a11y guidelines.
                    // See: https://www.w3.org/TR/wai-aria-practices-1.1/#textbox-keyboard-interaction
                    // tslint:disable-next-line deprecation
                    if (event.keyCode === keycodes.ESCAPE || (event.keyCode === keycodes.UP_ARROW && event.altKey)) {
                        _this.resetActiveItem();
                        _this.closeKeyEventStream.next();
                    }
                });
                if (this.viewportRuler) {
                    this.viewportSubscription = this.viewportRuler.change().subscribe(function () {
                        if (_this.panelOpen && overlayRef) {
                            overlayRef.updateSize({ width: _this.getPanelWidth() });
                        }
                    });
                }
            }
            else {
                var position = overlayRef.getConfig().positionStrategy;
                // Update the trigger, panel width and direction, in case anything has changed.
                position.setOrigin(this.getConnectedElement());
                overlayRef.updateSize({ width: this.getPanelWidth() });
            }
            if (overlayRef && !overlayRef.hasAttached()) {
                overlayRef.attach(this.portal);
                this.closingActionsSubscription = this.subscribeToClosingActions();
            }
            var wasOpen = this.panelOpen;
            this.autocomplete.setVisibility();
            this.autocomplete.isOpen = this.overlayAttached = true;
            // We need to do an extra `panelOpen` check in here, because the
            // autocomplete won't be shown if there are no options.
            if (this.panelOpen && wasOpen !== this.panelOpen) {
                this.autocomplete.opened.emit();
            }
        };
        McAutocompleteTrigger.prototype.getOverlayConfig = function () {
            return new overlay.OverlayConfig({
                positionStrategy: this.getOverlayPosition(),
                scrollStrategy: this.scrollStrategy(),
                width: this.getPanelWidth(),
                direction: this.dir
            });
        };
        McAutocompleteTrigger.prototype.getOverlayPosition = function () {
            this.positionStrategy = this.overlay.position()
                .flexibleConnectedTo(this.getConnectedElement())
                .withFlexibleDimensions(false)
                .withPush(false)
                .withPositions([
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
                    overlayY: 'bottom',
                    // The overlay edge connected to the trigger should have squared corners, while
                    // the opposite end has rounded corners. We apply a CSS class to swap the
                    // border-radius based on the overlay position.
                    panelClass: 'mc-autocomplete-panel-above'
                }
            ]);
            return this.positionStrategy;
        };
        McAutocompleteTrigger.prototype.getConnectedElement = function () {
            if (this.connectedTo) {
                return this.connectedTo.elementRef;
            }
            return this.formField ? this.formField.getConnectedOverlayOrigin() : this.elementRef;
        };
        McAutocompleteTrigger.prototype.getPanelWidth = function () {
            return this.autocomplete.panelWidth || this.getHostWidth() - AUTOCOMPLETE_BORDER_WIDTH;
        };
        McAutocompleteTrigger.prototype.getHostWidth = function () {
            return this.getConnectedElement().nativeElement.getBoundingClientRect().width;
        };
        /**
         * Resets the active item to -1 so arrow events will activate the
         * correct options, or to 0 if the consumer opted into it.
         */
        McAutocompleteTrigger.prototype.resetActiveItem = function () {
            if (this.autocomplete.autoActiveFirstOption) {
                this.autocomplete.keyManager.setFirstItemActive();
            }
            else {
                this.autocomplete.keyManager.setActiveItem(-1);
            }
        };
        McAutocompleteTrigger.prototype.canOpen = function () {
            var element = this.elementRef.nativeElement;
            return !element.readOnly && !element.disabled && !this._autocompleteDisabled;
        };
        return McAutocompleteTrigger;
    }());
    McAutocompleteTrigger.decorators = [
        { type: core.Directive, args: [{
                    selector: "input[mcAutocomplete], textarea[mcAutocomplete]",
                    host: {
                        class: 'mc-autocomplete-trigger',
                        '[attr.autocomplete]': 'autocompleteAttribute',
                        // Note: we use `focusin`, as opposed to `focus`, in order to open the panel
                        // a little earlier. This avoids issues where IE delays the focusing of the input.
                        '(focusin)': 'handleFocus()',
                        '(blur)': 'onTouched()',
                        '(input)': 'handleInput($event)',
                        '(keydown)': 'handleKeydown($event)',
                        '(click)': 'handleClick($event)'
                    },
                    exportAs: 'mcAutocompleteTrigger',
                    providers: [MAT_AUTOCOMPLETE_VALUE_ACCESSOR]
                },] }
    ];
    /** @nocollapse */
    McAutocompleteTrigger.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ViewContainerRef },
        { type: core.ChangeDetectorRef },
        { type: overlay.Overlay },
        { type: core.NgZone },
        { type: undefined, decorators: [{ type: core.Inject, args: [MC_AUTOCOMPLETE_SCROLL_STRATEGY,] }] },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
        { type: formField.McFormField, decorators: [{ type: core.Optional }, { type: core.Host }] },
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [common.DOCUMENT,] }] },
        { type: scrolling.ViewportRuler }
    ]; };
    McAutocompleteTrigger.propDecorators = {
        autocomplete: [{ type: core.Input, args: ['mcAutocomplete',] }],
        connectedTo: [{ type: core.Input, args: ['mcAutocompleteConnectedTo',] }],
        autocompleteAttribute: [{ type: core.Input, args: ['autocomplete',] }],
        autocompleteDisabled: [{ type: core.Input, args: ['mcAutocompleteDisabled',] }]
    };

    var McAutocompleteModule = /** @class */ (function () {
        function McAutocompleteModule() {
        }
        return McAutocompleteModule;
    }());
    McAutocompleteModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [core$1.McOptionModule, overlay.OverlayModule, core$1.McCommonModule, common.CommonModule],
                    exports: [
                        McAutocomplete,
                        core$1.McOptionModule,
                        McAutocompleteTrigger,
                        McAutocompleteOrigin,
                        core$1.McCommonModule
                    ],
                    declarations: [McAutocomplete, McAutocompleteTrigger, McAutocompleteOrigin],
                    providers: [MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AUTOCOMPLETE_BORDER_WIDTH = AUTOCOMPLETE_BORDER_WIDTH;
    exports.AUTOCOMPLETE_OPTION_HEIGHT = AUTOCOMPLETE_OPTION_HEIGHT;
    exports.AUTOCOMPLETE_PANEL_HEIGHT = AUTOCOMPLETE_PANEL_HEIGHT;
    exports.MAT_AUTOCOMPLETE_VALUE_ACCESSOR = MAT_AUTOCOMPLETE_VALUE_ACCESSOR;
    exports.MC_AUTOCOMPLETE_DEFAULT_OPTIONS = MC_AUTOCOMPLETE_DEFAULT_OPTIONS;
    exports.MC_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY = MC_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY;
    exports.MC_AUTOCOMPLETE_SCROLL_STRATEGY = MC_AUTOCOMPLETE_SCROLL_STRATEGY;
    exports.MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY = MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY;
    exports.MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER = MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER;
    exports.McAutocomplete = McAutocomplete;
    exports.McAutocompleteModule = McAutocompleteModule;
    exports.McAutocompleteOrigin = McAutocompleteOrigin;
    exports.McAutocompleteSelectedEvent = McAutocompleteSelectedEvent;
    exports.McAutocompleteTrigger = McAutocompleteTrigger;
    exports.getMcAutocompleteMissingPanelError = getMcAutocompleteMissingPanelError;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-autocomplete.umd.js.map
