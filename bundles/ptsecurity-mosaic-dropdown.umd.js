(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/overlay'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/icon'), require('@angular/cdk/portal'), require('rxjs'), require('@angular/cdk/a11y'), require('@ptsecurity/mosaic/core'), require('@angular/cdk/bidi'), require('@angular/cdk/platform'), require('@ptsecurity/cdk/keycodes'), require('rxjs/operators'), require('@angular/cdk/coercion'), require('@ptsecurity/cdk/a11y'), require('@angular/animations')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/dropdown', ['exports', '@angular/cdk/overlay', '@angular/common', '@angular/core', '@ptsecurity/mosaic/icon', '@angular/cdk/portal', 'rxjs', '@angular/cdk/a11y', '@ptsecurity/mosaic/core', '@angular/cdk/bidi', '@angular/cdk/platform', '@ptsecurity/cdk/keycodes', 'rxjs/operators', '@angular/cdk/coercion', '@ptsecurity/cdk/a11y', '@angular/animations'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.dropdown = {}), global.ng.cdk.overlay, global.ng.common, global.ng.core, global.ptsecurity.mosaic.icon, global.ng.cdk.portal, global.rxjs, global.ng.cdk.a11y, global.ptsecurity.mosaic.core, global.ng.cdk.bidi, global.ng.cdk.platform, global.keycodes, global.rxjs.operators, global.ng.cdk.coercion, global.a11y$1, global.ng.animations));
}(this, (function (exports, overlay, common, core, icon, portal, rxjs, a11y, core$1, bidi, platform, keycodes, operators, coercion, a11y$1, animations) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: dropdown-content.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Dropdown content that will be rendered lazily once the dropdown is opened.
     */
    var McDropdownContent = /** @class */ (function () {
        /**
         * @param {?} _template
         * @param {?} _componentFactoryResolver
         * @param {?} _appRef
         * @param {?} _injector
         * @param {?} _viewContainerRef
         * @param {?} _document
         */
        function McDropdownContent(_template, _componentFactoryResolver, _appRef, _injector, _viewContainerRef, _document) {
            this._template = _template;
            this._componentFactoryResolver = _componentFactoryResolver;
            this._appRef = _appRef;
            this._injector = _injector;
            this._viewContainerRef = _viewContainerRef;
            this._document = _document;
            /**
             * Emits when the dropdown content has been attached.
             */
            this.attached = new rxjs.Subject();
        }
        /**
         * Attaches the content with a particular context.
         * \@docs-private
         * @param {?=} context
         * @return {?}
         */
        McDropdownContent.prototype.attach = function (context) {
            if (context === void 0) { context = {}; }
            if (!this.portal) {
                this.portal = new portal.TemplatePortal(this._template, this._viewContainerRef);
            }
            this.detach();
            if (!this.outlet) {
                this.outlet = new portal.DomPortalOutlet(this._document.createElement('div'), this._componentFactoryResolver, this._appRef, this._injector);
            }
            /** @type {?} */
            var element = this._template.elementRef.nativeElement;
            // Because we support opening the same dropdown from different triggers (which in turn have their
            // own `OverlayRef` panel), we have to re-insert the host element every time, otherwise we
            // risk it staying attached to a pane that's no longer in the DOM.
            ( /** @type {?} */(element.parentNode)).insertBefore(this.outlet.outletElement, element);
            this.portal.attach(this.outlet, context);
            this.attached.next();
        };
        /**
         * Detaches the content.
         * \@docs-private
         * @return {?}
         */
        McDropdownContent.prototype.detach = function () {
            if (this.portal.isAttached) {
                this.portal.detach();
            }
        };
        /**
         * @return {?}
         */
        McDropdownContent.prototype.ngOnDestroy = function () {
            if (this.outlet) {
                this.outlet.dispose();
            }
        };
        return McDropdownContent;
    }());
    McDropdownContent.decorators = [
        { type: core.Directive, args: [{
                    selector: 'ng-template[mcDropdownContent]'
                },] }
    ];
    /** @nocollapse */
    McDropdownContent.ctorParameters = function () { return [
        { type: core.TemplateRef },
        { type: core.ComponentFactoryResolver },
        { type: core.ApplicationRef },
        { type: core.Injector },
        { type: core.ViewContainerRef },
        { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
    ]; };
    if (false) {
        /**
         * Emits when the dropdown content has been attached.
         * @type {?}
         */
        McDropdownContent.prototype.attached;
        /**
         * @type {?}
         * @private
         */
        McDropdownContent.prototype.portal;
        /**
         * @type {?}
         * @private
         */
        McDropdownContent.prototype.outlet;
        /**
         * @type {?}
         * @private
         */
        McDropdownContent.prototype._template;
        /**
         * @type {?}
         * @private
         */
        McDropdownContent.prototype._componentFactoryResolver;
        /**
         * @type {?}
         * @private
         */
        McDropdownContent.prototype._appRef;
        /**
         * @type {?}
         * @private
         */
        McDropdownContent.prototype._injector;
        /**
         * @type {?}
         * @private
         */
        McDropdownContent.prototype._viewContainerRef;
        /**
         * @type {?}
         * @private
         */
        McDropdownContent.prototype._document;
    }

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

    /**
     * @fileoverview added by tsickle
     * Generated from: dropdown-panel.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Injection token used to provide the parent dropdown to dropdown-specific components.
     * \@docs-private
     * @type {?}
     */
    var MC_DROPDOWN_PANEL = new core.InjectionToken('MC_DROPDOWN_PANEL');
    /**
     * Interface for a custom dropdown panel that can be used with `mcDropdownTriggerFor`.
     * \@docs-private
     * @record
     * @template T
     */
    function McDropdownPanel() { }
    if (false) {
        /** @type {?} */
        McDropdownPanel.prototype.xPosition;
        /** @type {?} */
        McDropdownPanel.prototype.yPosition;
        /** @type {?} */
        McDropdownPanel.prototype.overlapTriggerX;
        /** @type {?} */
        McDropdownPanel.prototype.overlapTriggerY;
        /** @type {?} */
        McDropdownPanel.prototype.templateRef;
        /** @type {?} */
        McDropdownPanel.prototype.closed;
        /** @type {?|undefined} */
        McDropdownPanel.prototype.parent;
        /** @type {?|undefined} */
        McDropdownPanel.prototype.direction;
        /** @type {?|undefined} */
        McDropdownPanel.prototype.lazyContent;
        /** @type {?|undefined} */
        McDropdownPanel.prototype.backdropClass;
        /** @type {?|undefined} */
        McDropdownPanel.prototype.hasBackdrop;
        /**
         * @param {?=} origin
         * @return {?}
         */
        McDropdownPanel.prototype.focusFirstItem = function (origin) { };
        /**
         * @return {?}
         */
        McDropdownPanel.prototype.resetActiveItem = function () { };
        /**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        McDropdownPanel.prototype.setPositionClasses = function (x, y) { };
        /**
         * @param {?} item
         * @return {?}
         */
        McDropdownPanel.prototype.addItem = function (item) { };
        /**
         * @param {?} item
         * @return {?}
         */
        McDropdownPanel.prototype.removeItem = function (item) { };
    }

    // Boilerplate for applying mixins to McDropdownItem.
    /**
     * \@docs-private
     */
    var McDropdownItemBase = /** @class */ (function () {
        function McDropdownItemBase() {
        }
        return McDropdownItemBase;
    }());
    // tslint:disable-next-line:naming-convention
    /** @type {?} */
    var McDropdownItemMixinBase = core$1.mixinTabIndex(core$1.mixinDisabled(McDropdownItemBase));
    /**
     * This directive is intended to be used inside an mc-dropdown tag.
     * It exists mostly to set the role attribute.
     */
    var McDropdownItem = /** @class */ (function (_super) {
        __extends(McDropdownItem, _super);
        /**
         * @param {?} _elementRef
         * @param {?} _focusMonitor
         * @param {?} document
         * @param {?=} _parentDropdownPanel
         */
        function McDropdownItem(_elementRef, _focusMonitor, document, _parentDropdownPanel) {
            var _this = _super.call(this) || this;
            _this._elementRef = _elementRef;
            _this._focusMonitor = _focusMonitor;
            _this.document = document;
            _this._parentDropdownPanel = _parentDropdownPanel;
            /**
             * ARIA role for the dropdown item.
             */
            _this.role = 'menuitem';
            /**
             * Stream that emits when the dropdown item is hovered.
             */
            _this.hovered = new rxjs.Subject();
            /**
             * Whether the dropdown item is highlighted.
             */
            _this.highlighted = false;
            /**
             * Whether the dropdown item acts as a trigger for a nested dropdown.
             */
            _this.triggersNestedDropdown = false;
            if (_focusMonitor) {
                // Start monitoring the element so it gets the appropriate focused classes. We want
                // to show the focus style for dropdown items only when the focus was not caused by a
                // mouse or touch interaction.
                _focusMonitor.monitor(_this._elementRef.nativeElement, false);
            }
            if (_parentDropdownPanel && _parentDropdownPanel.addItem) {
                _parentDropdownPanel.addItem(_this);
            }
            return _this;
        }
        /**
         * Focuses the dropdown item.
         * @param {?=} origin
         * @return {?}
         */
        McDropdownItem.prototype.focus = function (origin) {
            if (origin === void 0) { origin = 'program'; }
            if (this._focusMonitor) {
                this._focusMonitor.focusVia(this.getHostElement(), origin);
            }
            else {
                this.getHostElement().focus();
            }
        };
        /**
         * @return {?}
         */
        McDropdownItem.prototype.ngOnDestroy = function () {
            if (this._focusMonitor) {
                this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
            }
            if (this._parentDropdownPanel && this._parentDropdownPanel.removeItem) {
                this._parentDropdownPanel.removeItem(this);
            }
            this.hovered.complete();
        };
        /**
         * Returns the host DOM element.
         * @return {?}
         */
        McDropdownItem.prototype.getHostElement = function () {
            return this._elementRef.nativeElement;
        };
        /**
         * Prevents the default element actions if it is disabled.
         * @param {?} event
         * @return {?}
         */
        McDropdownItem.prototype.haltDisabledEvents = function (event) {
            if (this.disabled) {
                event.preventDefault();
                event.stopPropagation();
            }
        };
        /**
         * Emits to the hover stream.
         * @return {?}
         */
        McDropdownItem.prototype.handleMouseEnter = function () {
            this.hovered.next(this);
        };
        /**
         * Gets the label to be used when determining whether the option should be focused.
         * @return {?}
         */
        McDropdownItem.prototype.getLabel = function () {
            /** @type {?} */
            var element = this.content.nativeElement;
            // tslint:disable-next-line:no-magic-numbers
            /** @type {?} */
            var textNodeType = this.document ? this.document.TEXT_NODE : 3;
            /** @type {?} */
            var output = '';
            if (element.childNodes) {
                /** @type {?} */
                var length = element.childNodes.length;
                // Go through all the top-level text nodes and extract their text.
                // We skip anything that's not a text node to prevent the text from
                // being thrown off by something like an icon.
                for (var i = 0; i < length; i++) {
                    if (element.childNodes[i].nodeType === textNodeType) {
                        output += element.childNodes[i].textContent;
                    }
                }
            }
            return output.trim();
        };
        return McDropdownItem;
    }(McDropdownItemMixinBase));
    McDropdownItem.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-dropdown-item, [mc-dropdown-item]',
                    exportAs: 'mcDropdownItem',
                    inputs: ['disabled', 'tabIndex'],
                    host: {
                        class: 'mc-dropdown__item',
                        '[class.mc-dropdown__item_highlighted]': 'highlighted',
                        '[class.mc-disabled]': 'disabled',
                        '[attr.role]': 'role',
                        '[attr.tabindex]': 'tabIndex',
                        '(click)': 'haltDisabledEvents($event)',
                        '(mouseenter)': 'handleMouseEnter()'
                    },
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    template: "\n        <div #content>\n            <ng-content></ng-content>\n        </div>\n        <i *ngIf=\"triggersNestedDropdown\" mc-icon=\"mc-angle-right-M_16\" class=\"mc-dropdown__trigger\"></i>\n    "
                }] }
    ];
    /** @nocollapse */
    McDropdownItem.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: a11y.FocusMonitor },
        { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [MC_DROPDOWN_PANEL,] }] }
    ]; };
    McDropdownItem.propDecorators = {
        role: [{ type: core.Input }],
        content: [{ type: core.ViewChild, args: ['content', { static: false },] }]
    };
    if (false) {
        /**
         * ARIA role for the dropdown item.
         * @type {?}
         */
        McDropdownItem.prototype.role;
        /** @type {?} */
        McDropdownItem.prototype.content;
        /**
         * Stream that emits when the dropdown item is hovered.
         * @type {?}
         */
        McDropdownItem.prototype.hovered;
        /**
         * Whether the dropdown item is highlighted.
         * @type {?}
         */
        McDropdownItem.prototype.highlighted;
        /**
         * Whether the dropdown item acts as a trigger for a nested dropdown.
         * @type {?}
         */
        McDropdownItem.prototype.triggersNestedDropdown;
        /**
         * @type {?}
         * @private
         */
        McDropdownItem.prototype._elementRef;
        /**
         * @type {?}
         * @private
         */
        McDropdownItem.prototype._focusMonitor;
        /**
         * @type {?}
         * @private
         */
        McDropdownItem.prototype.document;
        /**
         * @type {?}
         * @private
         */
        McDropdownItem.prototype._parentDropdownPanel;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: dropdown-errors.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Throws an exception for the case when dropdown trigger doesn't have a valid mc-dropdown instance
     * \@docs-private
     * @return {?}
     */
    function throwMcDropdownMissingError() {
        throw Error("mcDropdownTriggerFor: must pass in an mc-dropdown instance.\n    Example:\n      <mc-dropdown #dropdown=\"mcDropdown\"></mc-dropdown>\n      <button [mcDropdownTriggerFor]=\"dropdown\"></button>");
    }
    /**
     * Throws an exception for the case when dropdown's x-position value isn't valid.
     * In other words, it doesn't match 'before' or 'after'.
     * \@docs-private
     * @return {?}
     */
    function throwMcDropdownInvalidPositionX() {
        throw Error("xPosition value must be either 'before' or after'.\n      Example: <mc-dropdown xPosition=\"before\" #dropdown=\"mcDropdown\"></mc-dropdown>");
    }
    /**
     * Throws an exception for the case when dropdown's y-position value isn't valid.
     * In other words, it doesn't match 'above' or 'below'.
     * \@docs-private
     * @return {?}
     */
    function throwMcDropdownInvalidPositionY() {
        throw Error("yPosition value must be either 'above' or below'.\n      Example: <mc-dropdown yPosition=\"above\" #dropdown=\"mcDropdown\"></mc-dropdown>");
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: dropdown-animations.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Animations used by the mc-dropdown component.
     * \@docs-private
     * @type {?}
     */
    var mcDropdownAnimations = {
        /**
         * This animation controls the dropdown panel's entry and exit from the page.
         *
         * When the dropdown panel is added to the DOM, it scales in and fades in its border.
         *
         * When the dropdown panel is removed from the DOM, it simply fades out after a brief
         * delay to display the ripple.
         */
        transformDropdown: animations.trigger('transformDropdown', [
            animations.state('void', animations.style({
                opacity: 0,
                transform: 'scale(0.8)'
            })),
            animations.transition('void => enter', animations.group([
                animations.query('.mc-dropdown__content', animations.animate('50ms linear', animations.style({ opacity: 1 }))),
                animations.animate('50ms cubic-bezier(0, 0, 0.2, 1)', animations.style({ transform: 'scale(1)' }))
            ])),
            animations.transition('* => void', animations.animate('50ms 25ms linear', animations.style({ opacity: 0 })))
        ]),
        /**
         * This animation fades in the background color and content of the dropdown panel
         * after its containing element is scaled in.
         */
        fadeInItems: animations.trigger('fadeInItems', [
            // now. Remove next time we do breaking changes.
            animations.state('showing', animations.style({ opacity: 1 })),
            animations.transition('void => *', [
                animations.style({ opacity: 0 }),
                animations.animate('200ms 60ms cubic-bezier(0.55, 0, 0.55, 0.2)')
            ])
        ])
    };
    /** @type {?} */
    var fadeInItems = mcDropdownAnimations.fadeInItems;
    /** @type {?} */
    var transformDropdown = mcDropdownAnimations.transformDropdown;

    /**
     * Default `mc-dropdown` options that can be overridden.
     * @record
     */
    function McDropdownDefaultOptions() { }
    if (false) {
        /**
         * The x-axis position of the dropdown.
         * @type {?}
         */
        McDropdownDefaultOptions.prototype.xPosition;
        /**
         * The y-axis position of the dropdown.
         * @type {?}
         */
        McDropdownDefaultOptions.prototype.yPosition;
        /**
         * Whether the dropdown should overlap the dropdown trigger horizontally.
         * @type {?}
         */
        McDropdownDefaultOptions.prototype.overlapTriggerX;
        /**
         * Whether the dropdown should overlap the dropdown trigger vertically.
         * @type {?}
         */
        McDropdownDefaultOptions.prototype.overlapTriggerY;
        /**
         * Class to be applied to the dropdown's backdrop.
         * @type {?}
         */
        McDropdownDefaultOptions.prototype.backdropClass;
        /**
         * Whether the dropdown has a backdrop.
         * @type {?}
         */
        McDropdownDefaultOptions.prototype.hasBackdrop;
    }
    /**
     * Injection token to be used to override the default options for `mc-dropdown`.
     * @type {?}
     */
    var MC_DROPDOWN_DEFAULT_OPTIONS = new core.InjectionToken('mc-dropdown-default-options', {
        providedIn: 'root',
        factory: MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY
    });
    /**
     * \@docs-private
     * @return {?}
     */
    // tslint:disable-next-line:naming-convention
    function MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY() {
        return {
            overlapTriggerX: true,
            overlapTriggerY: false,
            xPosition: 'after',
            yPosition: 'below',
            backdropClass: 'cdk-overlay-transparent-backdrop',
            hasBackdrop: false
        };
    }
    var McDropdown = /** @class */ (function () {
        /**
         * @param {?} _elementRef
         * @param {?} _ngZone
         * @param {?} _defaultOptions
         */
        function McDropdown(_elementRef, _ngZone, _defaultOptions) {
            this._elementRef = _elementRef;
            this._ngZone = _ngZone;
            this._defaultOptions = _defaultOptions;
            this._xPosition = this._defaultOptions.xPosition;
            this._yPosition = this._defaultOptions.yPosition;
            this._overlapTriggerX = this._defaultOptions.overlapTriggerX;
            this._overlapTriggerY = this._defaultOptions.overlapTriggerY;
            this._hasBackdrop = this._defaultOptions.hasBackdrop;
            /**
             * Config object to be passed into the dropdown's ngClass
             */
            this.classList = {};
            /**
             * Current state of the panel animation.
             */
            this.panelAnimationState = 'void';
            /**
             * Emits whenever an animation on the dropdown completes.
             */
            this.animationDone = new rxjs.Subject();
            /**
             * Class to be added to the backdrop element.
             */
            this.backdropClass = this._defaultOptions.backdropClass;
            /**
             * Event emitted when the dropdown is closed.
             */
            this.closed = new core.EventEmitter();
            /**
             * Dropdown items inside the current dropdown.
             */
            this.itemsArray = [];
            /**
             * Emits whenever the amount of dropdown items changes.
             */
            this.itemChanges = new rxjs.Subject();
            /**
             * Subscription to tab events on the dropdown panel
             */
            this.tabSubscription = rxjs.Subscription.EMPTY;
        }
        Object.defineProperty(McDropdown.prototype, "xPosition", {
            /**
             * Position of the dropdown in the X axis.
             * @return {?}
             */
            get: function () {
                return this._xPosition;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                if (value !== 'before' && value !== 'after') {
                    throwMcDropdownInvalidPositionX();
                }
                this._xPosition = value;
                this.setPositionClasses();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDropdown.prototype, "yPosition", {
            /**
             * Position of the dropdown in the Y axis.
             * @return {?}
             */
            get: function () {
                return this._yPosition;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                if (value !== 'above' && value !== 'below') {
                    throwMcDropdownInvalidPositionY();
                }
                this._yPosition = value;
                this.setPositionClasses();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDropdown.prototype, "overlapTriggerY", {
            /**
             * Whether the dropdown should overlap its trigger vertically.
             * @return {?}
             */
            get: function () {
                return this._overlapTriggerY;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._overlapTriggerY = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDropdown.prototype, "overlapTriggerX", {
            /**
             * Whether the dropdown should overlap its trigger horizontally.
             * @return {?}
             */
            get: function () {
                return this._overlapTriggerX;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._overlapTriggerX = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDropdown.prototype, "hasBackdrop", {
            /**
             * Whether the dropdown has a backdrop.
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
        Object.defineProperty(McDropdown.prototype, "panelClass", {
            /**
             * This method takes classes set on the host mc-dropdown element and applies them on the
             * dropdown template that displays in the overlay container.  Otherwise, it's difficult
             * to style the containing dropdown from outside the component.
             * @param {?} classes list of class names
             * @return {?}
             */
            set: function (classes) {
                var _this = this;
                /** @type {?} */
                var previousPanelClass = this.previousPanelClass;
                if (previousPanelClass && previousPanelClass.length) {
                    previousPanelClass.split(' ').forEach(( /**
                     * @param {?} className
                     * @return {?}
                     */function (className) {
                        _this.classList[className] = false;
                    }));
                }
                this.previousPanelClass = classes;
                if (classes && classes.length) {
                    classes.split(' ').forEach(( /**
                     * @param {?} className
                     * @return {?}
                     */function (className) {
                        _this.classList[className] = true;
                    }));
                    this._elementRef.nativeElement.className = '';
                }
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @return {?}
         */
        McDropdown.prototype.ngOnInit = function () {
            this.setPositionClasses();
        };
        /**
         * @return {?}
         */
        McDropdown.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.keyManager = new a11y$1.FocusKeyManager(this.items)
                .withWrap()
                .withTypeAhead();
            this.tabSubscription = this.keyManager.tabOut.subscribe(( /**
             * @return {?}
             */function () { return _this.closed.emit('tab'); }));
        };
        /**
         * @return {?}
         */
        McDropdown.prototype.ngOnDestroy = function () {
            this.tabSubscription.unsubscribe();
            this.closed.complete();
        };
        /**
         * Stream that emits whenever the hovered dropdown item changes.
         * @return {?}
         */
        McDropdown.prototype.hovered = function () {
            return this.itemChanges.pipe(operators.startWith(this.itemsArray), operators.switchMap(( /**
             * @param {?} items
             * @return {?}
             */function (items) { return rxjs.merge.apply(void 0, __spread(items.map(( /**
             * @param {?} item
             * @return {?}
             */function (item) { return item.hovered; })))); })));
        };
        /**
         * Handle a keyboard event from the dropdown, delegating to the appropriate action.
         * @param {?} event
         * @return {?}
         */
        McDropdown.prototype.handleKeydown = function (event) {
            // tslint:disable-next-line:deprecation
            /** @type {?} */
            var keyCode = event.keyCode;
            switch (keyCode) {
                case keycodes.ESCAPE:
                    this.closed.emit('keydown');
                    break;
                case keycodes.LEFT_ARROW:
                    if (this.parent && this.direction === 'ltr') {
                        this.closed.emit('keydown');
                    }
                    break;
                case keycodes.RIGHT_ARROW:
                    if (this.parent && this.direction === 'rtl') {
                        this.closed.emit('keydown');
                    }
                    break;
                default:
                    if (keyCode === keycodes.UP_ARROW || keyCode === keycodes.DOWN_ARROW) {
                        this.keyManager.setFocusOrigin('keyboard');
                    }
                    this.keyManager.onKeydown(event);
            }
        };
        /**
         * @return {?}
         */
        McDropdown.prototype.handleClick = function () {
            this.closed.emit('click');
        };
        /**
         * Focus the first item in the dropdown.
         * @param {?=} origin Action from which the focus originated. Used to set the correct styling.
         * @return {?}
         */
        McDropdown.prototype.focusFirstItem = function (origin) {
            var _this = this;
            if (origin === void 0) { origin = 'program'; }
            // When the content is rendered lazily, it takes a bit before the items are inside the DOM.
            if (this.lazyContent) {
                this._ngZone.onStable.asObservable()
                    .pipe(operators.take(1))
                    .subscribe(( /**
             * @return {?}
             */function () { return _this.keyManager.setFocusOrigin(origin).setFirstItemActive(); }));
            }
            else {
                this.keyManager.setFocusOrigin(origin).setFirstItemActive();
            }
        };
        /**
         * Resets the active item in the dropdown. This is used when the dropdown is opened, allowing
         * the user to start from the first option when pressing the down arrow.
         * @return {?}
         */
        McDropdown.prototype.resetActiveItem = function () {
            this.keyManager.setActiveItem(-1);
        };
        /**
         * Registers a dropdown item with the dropdown.
         * \@docs-private
         * @param {?} item
         * @return {?}
         */
        McDropdown.prototype.addItem = function (item) {
            // We register the items through this method, rather than picking them up through
            // `ContentChildren`, because we need the items to be picked up by their closest
            // `mc-dropdown` ancestor. If we used `@ContentChildren(McDropdownItem, {descendants: true})`,
            // all descendant items will bleed into the top-level dropdown in the case where the consumer
            // has `mc-dropdown` instances nested inside each other.
            if (this.itemsArray.indexOf(item) === -1) {
                this.itemsArray.push(item);
                this.itemChanges.next(this.itemsArray);
            }
        };
        /**
         * Removes an item from the dropdown.
         * \@docs-private
         * @param {?} item
         * @return {?}
         */
        McDropdown.prototype.removeItem = function (item) {
            /** @type {?} */
            var index = this.itemsArray.indexOf(item);
            if (this.itemsArray.indexOf(item) > -1) {
                this.itemsArray.splice(index, 1);
                this.itemChanges.next(this.itemsArray);
            }
        };
        /**
         * Adds classes to the dropdown panel based on its position. Can be used by
         * consumers to add specific styling based on the position.
         * \@docs-private
         * @param {?=} posX Position of the dropdown along the x axis.
         * @param {?=} posY Position of the dropdown along the y axis.
         * @return {?}
         */
        McDropdown.prototype.setPositionClasses = function (posX, posY) {
            if (posX === void 0) { posX = this.xPosition; }
            if (posY === void 0) { posY = this.yPosition; }
            /** @type {?} */
            var classes = this.classList;
            classes['mc-dropdown-before'] = posX === 'before';
            classes['mc-dropdown-after'] = posX === 'after';
            classes['mc-dropdown-above'] = posY === 'above';
            classes['mc-dropdown-below'] = posY === 'below';
        };
        /**
         * Starts the enter animation.
         * @return {?}
         */
        McDropdown.prototype.startAnimation = function () {
            this.panelAnimationState = 'enter';
        };
        /**
         * Resets the panel animation to its initial state.
         * @return {?}
         */
        McDropdown.prototype.resetAnimation = function () {
            this.panelAnimationState = 'void';
        };
        /**
         * Callback that is invoked when the panel animation completes.
         * @param {?} event
         * @return {?}
         */
        McDropdown.prototype.onAnimationDone = function (event) {
            this.animationDone.next(event);
            this.isAnimating = false;
        };
        /**
         * @param {?} event
         * @return {?}
         */
        McDropdown.prototype.onAnimationStart = function (event) {
            this.isAnimating = true;
            // Scroll the content element to the top as soon as the animation starts. This is necessary,
            // because we move focus to the first item while it's still being animated, which can throw
            // the browser off when it determines the scroll position. Alternatively we can move focus
            // when the animation is done, however moving focus asynchronously will interrupt screen
            // readers which are in the process of reading out the dropdown already. We take the `element`
            // from the `event` since we can't use a `ViewChild` to access the pane.
            if (event.toState === 'enter' && this.keyManager.activeItemIndex === 0) {
                event.element.scrollTop = 0;
            }
        };
        return McDropdown;
    }());
    McDropdown.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-dropdown',
                    exportAs: 'mcDropdown',
                    template: "<ng-template>\n    <div\n        class=\"mc-dropdown__panel\"\n        [ngClass]=\"classList\"\n        (keydown)=\"handleKeydown($event)\"\n        (click)=\"handleClick()\"\n        [@transformDropdown]=\"panelAnimationState\"\n        (@transformDropdown.start)=\"onAnimationStart($event)\"\n        (@transformDropdown.done)=\"onAnimationDone($event)\"\n        role=\"dropdown\">\n        <div class=\"mc-dropdown__content\">\n            <ng-content></ng-content>\n        </div>\n    </div>\n</ng-template>\n",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    animations: [
                        mcDropdownAnimations.transformDropdown,
                        mcDropdownAnimations.fadeInItems
                    ],
                    providers: [
                        { provide: MC_DROPDOWN_PANEL, useExisting: McDropdown }
                    ],
                    styles: [".mc-dropdown__item{align-items:center;border:1px solid transparent;box-sizing:border-box;display:flex;outline:none;padding:5px 15px;position:relative;text-align:left;white-space:nowrap;width:100%}.mc-dropdown__item:not([disabled]):not(.mc-disabled){cursor:pointer}.mc-dropdown__item .mc-dropdown__item-caption{margin-top:4px}.mc-dropdown__trigger{margin-left:auto;padding-left:16px}.mc-dropdown__panel{border-bottom-left-radius:3px;border-bottom-right-radius:3px;border-style:solid;border-width:1px;margin-top:-1px;min-width:100%;overflow:auto;padding:4px 0}.mc-dropdown__content h1,.mc-dropdown__content h2,.mc-dropdown__content h3,.mc-dropdown__content h4,.mc-dropdown__content h5{margin:0;padding:8px 16px 4px}"]
                }] }
    ];
    /** @nocollapse */
    McDropdown.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.NgZone },
        { type: undefined, decorators: [{ type: core.Inject, args: [MC_DROPDOWN_DEFAULT_OPTIONS,] }] }
    ]; };
    McDropdown.propDecorators = {
        xPosition: [{ type: core.Input }],
        yPosition: [{ type: core.Input }],
        overlapTriggerY: [{ type: core.Input }],
        overlapTriggerX: [{ type: core.Input }],
        hasBackdrop: [{ type: core.Input }],
        panelClass: [{ type: core.Input, args: ['class',] }],
        backdropClass: [{ type: core.Input }],
        templateRef: [{ type: core.ViewChild, args: [core.TemplateRef, { static: false },] }],
        items: [{ type: core.ContentChildren, args: [McDropdownItem,] }],
        lazyContent: [{ type: core.ContentChild, args: [McDropdownContent, { static: false },] }],
        closed: [{ type: core.Output }]
    };
    if (false) {
        /**
         * @type {?}
         * @private
         */
        McDropdown.prototype._xPosition;
        /**
         * @type {?}
         * @private
         */
        McDropdown.prototype._yPosition;
        /**
         * @type {?}
         * @private
         */
        McDropdown.prototype._overlapTriggerX;
        /**
         * @type {?}
         * @private
         */
        McDropdown.prototype._overlapTriggerY;
        /**
         * @type {?}
         * @private
         */
        McDropdown.prototype._hasBackdrop;
        /**
         * Config object to be passed into the dropdown's ngClass
         * @type {?}
         */
        McDropdown.prototype.classList;
        /**
         * Current state of the panel animation.
         * @type {?}
         */
        McDropdown.prototype.panelAnimationState;
        /**
         * Emits whenever an animation on the dropdown completes.
         * @type {?}
         */
        McDropdown.prototype.animationDone;
        /**
         * Whether the dropdown is animating.
         * @type {?}
         */
        McDropdown.prototype.isAnimating;
        /**
         * Parent dropdown of the current dropdown panel.
         * @type {?}
         */
        McDropdown.prototype.parent;
        /**
         * Layout direction of the dropdown.
         * @type {?}
         */
        McDropdown.prototype.direction;
        /**
         * Class to be added to the backdrop element.
         * @type {?}
         */
        McDropdown.prototype.backdropClass;
        /**
         * \@docs-private
         * @type {?}
         */
        McDropdown.prototype.templateRef;
        /**
         * List of the items inside of a dropdown.
         * @type {?}
         */
        McDropdown.prototype.items;
        /**
         * Dropdown content that will be rendered lazily.
         * \@docs-private
         * @type {?}
         */
        McDropdown.prototype.lazyContent;
        /**
         * Event emitted when the dropdown is closed.
         * @type {?}
         */
        McDropdown.prototype.closed;
        /**
         * @type {?}
         * @private
         */
        McDropdown.prototype.previousPanelClass;
        /**
         * @type {?}
         * @private
         */
        McDropdown.prototype.keyManager;
        /**
         * Dropdown items inside the current dropdown.
         * @type {?}
         * @private
         */
        McDropdown.prototype.itemsArray;
        /**
         * Emits whenever the amount of dropdown items changes.
         * @type {?}
         * @private
         */
        McDropdown.prototype.itemChanges;
        /**
         * Subscription to tab events on the dropdown panel
         * @type {?}
         * @private
         */
        McDropdown.prototype.tabSubscription;
        /**
         * @type {?}
         * @private
         */
        McDropdown.prototype._elementRef;
        /**
         * @type {?}
         * @private
         */
        McDropdown.prototype._ngZone;
        /**
         * @type {?}
         * @private
         */
        McDropdown.prototype._defaultOptions;
    }

    /**
     * Injection token that determines the scroll handling while the dropdown is open.
     * @type {?}
     */
    var MC_DROPDOWN_SCROLL_STRATEGY = new core.InjectionToken('mc-dropdown-scroll-strategy');
    /**
     * \@docs-private
     * @param {?} overlay
     * @return {?}
     */
    // tslint:disable-next-line:naming-convention
    function MC_DROPDOWN_SCROLL_STRATEGY_FACTORY(overlay) {
        return ( /**
         * @return {?}
         */function () { return overlay.scrollStrategies.reposition(); });
    }
    /**
     * \@docs-private
     * @type {?}
     */
    var MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER = {
        provide: MC_DROPDOWN_SCROLL_STRATEGY,
        deps: [overlay.Overlay],
        useFactory: MC_DROPDOWN_SCROLL_STRATEGY_FACTORY
    };
    /**
     * Default top padding of the nested dropdown panel.
     * @type {?}
     */
    var NESTED_PANEL_TOP_PADDING = 2;
    /**
     * Options for binding a passive event listener.
     * @type {?}
     */
    var passiveEventListenerOptions = platform.normalizePassiveListenerOptions({ passive: true });
    /**
     * This directive is intended to be used in conjunction with an mc-dropdown tag.  It is
     * responsible for toggling the display of the provided dropdown instance.
     */
    var McDropdownTrigger = /** @class */ (function () {
        /**
         * @param {?} _overlay
         * @param {?} _element
         * @param {?} _viewContainerRef
         * @param {?} _scrollStrategy
         * @param {?} _parent
         * @param {?} _dropdownItemInstance
         * @param {?} _dir
         * @param {?=} _focusMonitor
         */
        function McDropdownTrigger(_overlay, _element, _viewContainerRef, _scrollStrategy, _parent, _dropdownItemInstance, _dir, _focusMonitor) {
            var _this = this;
            this._overlay = _overlay;
            this._element = _element;
            this._viewContainerRef = _viewContainerRef;
            this._scrollStrategy = _scrollStrategy;
            this._parent = _parent;
            this._dropdownItemInstance = _dropdownItemInstance;
            this._dir = _dir;
            this._focusMonitor = _focusMonitor;
            // Tracking input type is necessary so it's possible to only auto-focus
            // the first item of the list when the dropdown is opened via the keyboard
            this.openedBy = null;
            /**
             * Event emitted when the associated dropdown is opened.
             */
            this.dropdownOpened = new core.EventEmitter();
            /**
             * Event emitted when the associated dropdown is closed.
             */
            this.dropdownClosed = new core.EventEmitter();
            this._opened = false;
            this.overlayRef = null;
            this.closeSubscription = rxjs.Subscription.EMPTY;
            this.hoverSubscription = rxjs.Subscription.EMPTY;
            /**
             * Handles touch start events on the trigger.
             * Needs to be an arrow function so we can easily use addEventListener and removeEventListener.
             */
            this.handleTouchStart = ( /**
             * @return {?}
             */function () { return _this.openedBy = 'touch'; });
            _element.nativeElement.addEventListener('touchstart', this.handleTouchStart, passiveEventListenerOptions);
            if (_dropdownItemInstance) {
                _dropdownItemInstance.triggersNestedDropdown = this.triggersNestedDropdown();
            }
        }
        Object.defineProperty(McDropdownTrigger.prototype, "dir", {
            /**
             * The text direction of the containing app.
             * @return {?}
             */
            get: function () {
                return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDropdownTrigger.prototype, "dropdown", {
            /**
             * References the dropdown instance that the trigger is associated with.
             * @return {?}
             */
            get: function () {
                return this._dropdown;
            },
            /**
             * @param {?} dropdown
             * @return {?}
             */
            set: function (dropdown) {
                var _this = this;
                if (dropdown === this._dropdown) {
                    return;
                }
                this._dropdown = dropdown;
                this.closeSubscription.unsubscribe();
                if (dropdown) {
                    this.closeSubscription = dropdown.closed.asObservable().subscribe(( /**
                     * @param {?} reason
                     * @return {?}
                     */function (reason) {
                        _this.destroy();
                        // If a click closed the dropdown, we should close the entire chain of nested dropdowns.
                        if ((reason === 'click' || reason === 'tab') && _this._parent) {
                            _this._parent.closed.emit(reason);
                        }
                    }));
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDropdownTrigger.prototype, "opened", {
            /**
             * Whether the dropdown is open.
             * @return {?}
             */
            get: function () {
                return this._opened;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @return {?}
         */
        McDropdownTrigger.prototype.ngAfterContentInit = function () {
            this.check();
            this.handleHover();
        };
        /**
         * @return {?}
         */
        McDropdownTrigger.prototype.ngOnDestroy = function () {
            if (this.overlayRef) {
                this.overlayRef.dispose();
                this.overlayRef = null;
            }
            this._element.nativeElement.removeEventListener('touchstart', this.handleTouchStart, passiveEventListenerOptions);
            this.cleanUpSubscriptions();
            this.closeSubscription.unsubscribe();
        };
        /**
         * Whether the dropdown triggers a nested dropdown or a top-level one.
         * @return {?}
         */
        McDropdownTrigger.prototype.triggersNestedDropdown = function () {
            return !!(this._dropdownItemInstance && this._parent);
        };
        /**
         * Toggles the dropdown between the open and closed states.
         * @return {?}
         */
        McDropdownTrigger.prototype.toggle = function () {
            // tslint:disable-next-line:no-void-expression
            return this._opened ? this.close() : this.open();
        };
        /**
         * Opens the dropdown.
         * @return {?}
         */
        McDropdownTrigger.prototype.open = function () {
            var _this = this;
            if (this._opened) {
                return;
            }
            this.check();
            /** @type {?} */
            var overlayRef = this.createOverlay();
            /** @type {?} */
            var overlayConfig = overlayRef.getConfig();
            this.setPosition(( /** @type {?} */(overlayConfig.positionStrategy)));
            overlayConfig.hasBackdrop = this.dropdown.hasBackdrop ? !this.triggersNestedDropdown() :
                this.dropdown.hasBackdrop;
            overlayRef.attach(this.getPortal());
            if (this.dropdown.lazyContent) {
                this.dropdown.lazyContent.attach(this.data);
            }
            this.closeSubscription = this.closingActions().subscribe(( /**
             * @return {?}
             */function () { return _this.close(); }));
            this.init();
            if (this.dropdown instanceof McDropdown) {
                this.dropdown.startAnimation();
            }
        };
        /**
         * Closes the dropdown.
         * @return {?}
         */
        McDropdownTrigger.prototype.close = function () {
            this.dropdown.closed.emit();
        };
        /**
         * Focuses the dropdown trigger.
         * @param {?=} origin Source of the dropdown trigger's focus.
         * @return {?}
         */
        McDropdownTrigger.prototype.focus = function (origin) {
            if (origin === void 0) { origin = 'program'; }
            if (this._focusMonitor) {
                this._focusMonitor.focusVia(this._element.nativeElement, origin);
            }
            else {
                this._element.nativeElement.focus();
            }
        };
        /**
         * Handles mouse presses on the trigger.
         * @param {?} event
         * @return {?}
         */
        McDropdownTrigger.prototype.handleMousedown = function (event) {
            // Since right or middle button clicks won't trigger the `click` event,
            // we shouldn't consider the dropdown as opened by mouse in those cases.
            this.openedBy = event.button === 0 ? 'mouse' : null;
            // Since clicking on the trigger won't close the dropdown if it opens a nested dropdown,
            // we should prevent focus from moving onto it via click to avoid the
            // highlight from lingering on the dropdown item.
            if (this.triggersNestedDropdown()) {
                event.preventDefault();
            }
        };
        /**
         * Handles key presses on the trigger.
         * @param {?} event
         * @return {?}
         */
        McDropdownTrigger.prototype.handleKeydown = function (event) {
            // tslint:disable-next-line:deprecation
            /** @type {?} */
            var keyCode = event.key || event.keyCode;
            if (keyCode === keycodes.SPACE || keyCode === keycodes.ENTER) {
                this.open();
            }
            if (this.triggersNestedDropdown() && ((keyCode === keycodes.RIGHT_ARROW && this.dir === 'ltr') ||
                (keyCode === keycodes.LEFT_ARROW && this.dir === 'rtl'))) {
                this.open();
            }
        };
        /**
         * Handles click events on the trigger.
         * @param {?} event
         * @return {?}
         */
        McDropdownTrigger.prototype.handleClick = function (event) {
            if (this.triggersNestedDropdown()) {
                // Stop event propagation to avoid closing the parent dropdown.
                event.stopPropagation();
                this.open();
            }
            else {
                this.toggle();
            }
        };
        /**
         * Closes the dropdown and does the necessary cleanup.
         * @private
         * @return {?}
         */
        McDropdownTrigger.prototype.destroy = function () {
            var _this = this;
            if (!this.overlayRef || !this.opened) {
                return;
            }
            /** @type {?} */
            var dropdown = this.dropdown;
            this.closeSubscription.unsubscribe();
            this.overlayRef.detach();
            if (dropdown instanceof McDropdown) {
                dropdown.resetAnimation();
                if (dropdown.lazyContent) {
                    // Wait for the exit animation to finish before detaching the content.
                    dropdown.animationDone
                        .pipe(operators.filter(( /**
                 * @param {?} event
                 * @return {?}
                 */function (event) { return event.toState === 'void'; })), operators.take(1), 
                    // Interrupt if the content got re-attached.
                    operators.takeUntil(dropdown.lazyContent.attached))
                        .subscribe({ next: ( /**
                         * @return {?}
                         */function () { return dropdown.lazyContent.detach(); }), error: undefined, complete: ( /**
                         * @return {?}
                         */function () {
                            // No matter whether the content got re-attached, reset the dropdown.
                            _this.reset();
                        }) });
                }
                else {
                    this.reset();
                }
            }
            else {
                this.reset();
                if (dropdown.lazyContent) {
                    dropdown.lazyContent.detach();
                }
            }
        };
        /**
         * This method sets the dropdown state to open and focuses the first item if
         * the dropdown was opened via the keyboard.
         * @private
         * @return {?}
         */
        McDropdownTrigger.prototype.init = function () {
            this.dropdown.parent = this.triggersNestedDropdown() ? this._parent : undefined;
            this.dropdown.direction = this.dir;
            this.setIsOpened(true);
            this.dropdown.focusFirstItem(this.openedBy || 'program');
        };
        /**
         * This method resets the dropdown when it's closed, most importantly restoring
         * focus to the dropdown trigger if the dropdown was opened via the keyboard.
         * @private
         * @return {?}
         */
        McDropdownTrigger.prototype.reset = function () {
            this.setIsOpened(false);
            // We should reset focus if the user is navigating using a keyboard or
            // if we have a top-level trigger which might cause focus to be lost
            // when clicking on the backdrop.
            if (!this.openedBy) {
                // Note that the focus style will show up both for `program` and
                // `keyboard` so we don't have to specify which one it is.
                this.focus();
            }
            else if (!this.triggersNestedDropdown()) {
                this.focus(this.openedBy);
            }
            this.openedBy = null;
        };
        // set state rather than toggle to support triggers sharing a dropdown
        /**
         * @private
         * @param {?} isOpen
         * @return {?}
         */
        McDropdownTrigger.prototype.setIsOpened = function (isOpen) {
            this._opened = isOpen;
            // tslint:disable-next-line:no-void-expression
            this._opened ? this.dropdownOpened.emit() : this.dropdownClosed.emit();
            if (this.triggersNestedDropdown()) {
                this._dropdownItemInstance.highlighted = isOpen;
            }
        };
        /**
         * This method checks that a valid instance of McDropdown has been passed into
         * mcDropdownTriggerFor. If not, an exception is thrown.
         * @private
         * @return {?}
         */
        McDropdownTrigger.prototype.check = function () {
            if (!this.dropdown) {
                throwMcDropdownMissingError();
            }
        };
        /**
         * This method creates the overlay from the provided dropdown's template and saves its
         * OverlayRef so that it can be attached to the DOM when open is called.
         * @private
         * @return {?}
         */
        McDropdownTrigger.prototype.createOverlay = function () {
            if (!this.overlayRef) {
                /** @type {?} */
                var config = this.getOverlayConfig();
                this.subscribeToPositions(( /** @type {?} */(config.positionStrategy)));
                this.overlayRef = this._overlay.create(config);
                // Consume the `keydownEvents` in order to prevent them from going to another overlay.
                // Ideally we'd also have our keyboard event logic in here, however doing so will
                // break anybody that may have implemented the `McDropdownPanel` themselves.
                this.overlayRef.keydownEvents().subscribe();
            }
            return this.overlayRef;
        };
        /**
         * This method builds the configuration object needed to create the overlay, the OverlayState.
         * @private
         * @return {?} OverlayConfig
         */
        McDropdownTrigger.prototype.getOverlayConfig = function () {
            return new overlay.OverlayConfig({
                positionStrategy: this._overlay.position()
                    .flexibleConnectedTo(this._element)
                    .withLockedPosition()
                    .withTransformOriginOn('.mc-dropdown__panel'),
                backdropClass: this.dropdown.backdropClass || 'cdk-overlay-transparent-backdrop',
                scrollStrategy: this._scrollStrategy(),
                direction: this._dir
            });
        };
        /**
         * Listens to changes in the position of the overlay and sets the correct classes
         * on the dropdown based on the new position. This ensures the animation origin is always
         * correct, even if a fallback position is used for the overlay.
         * @private
         * @param {?} position
         * @return {?}
         */
        McDropdownTrigger.prototype.subscribeToPositions = function (position) {
            var _this = this;
            if (this.dropdown.setPositionClasses) {
                position.positionChanges.subscribe(( /**
                 * @param {?} change
                 * @return {?}
                 */function (change) {
                    /** @type {?} */
                    var posX = change.connectionPair.overlayX === 'start' ? 'after' : 'before';
                    /** @type {?} */
                    var posY = change.connectionPair.overlayY === 'top' ? 'below' : 'above';
                    ( /** @type {?} */(_this.dropdown.setPositionClasses))(posX, posY);
                }));
            }
        };
        /**
         * Sets the appropriate positions on a position strategy
         * so the overlay connects with the trigger correctly.
         * @private
         * @param {?} positionStrategy Strategy whose position to update.
         * @return {?}
         */
        McDropdownTrigger.prototype.setPosition = function (positionStrategy) {
            var _a = __read(this.dropdown.xPosition === 'before' ?
                ['end', 'start', 'end', 'start'] :
                ['start', 'end', 'start', 'end'], 4), originX = _a[0], originFallbackX = _a[1], overlayX = _a[2], overlayFallbackX = _a[3];
            // tslint:disable-next-line:prefer-const
            var _b = __read(this.dropdown.yPosition === 'above' ?
                ['bottom', 'top', 'bottom', 'top'] :
                ['top', 'bottom', 'top', 'bottom'], 4), overlayY = _b[0], overlayFallbackY = _b[1], originY = _b[2], originFallbackY = _b[3];
            /** @type {?} */
            var offsetY = 0;
            if (this.triggersNestedDropdown()) {
                // When the dropdown is nested, it should always align itself
                // to the edges of the trigger, instead of overlapping it.
                overlayFallbackX = originX = this.dropdown.xPosition === 'before' ? 'start' : 'end';
                originFallbackX = overlayX = originX === 'end' ? 'start' : 'end';
                offsetY = overlayY === 'bottom' ? NESTED_PANEL_TOP_PADDING : -NESTED_PANEL_TOP_PADDING;
            }
            else {
                if (!this.dropdown.overlapTriggerY) {
                    originY = overlayY === 'top' ? 'bottom' : 'top';
                    originFallbackY = overlayFallbackY === 'top' ? 'bottom' : 'top';
                }
                if (!this.dropdown.overlapTriggerX) {
                    overlayFallbackX = originX = this.dropdown.xPosition === 'before' ? 'start' : 'end';
                    originFallbackX = overlayX = originX === 'end' ? 'start' : 'end';
                }
            }
            positionStrategy.withPositions([
                { originX: originX, originY: originY, overlayX: overlayX, overlayY: overlayY, offsetY: offsetY },
                { originX: originFallbackX, originY: originY, overlayX: overlayFallbackX, overlayY: overlayY, offsetY: offsetY },
                {
                    originX: originX,
                    originY: originFallbackY,
                    overlayX: overlayX,
                    overlayY: overlayFallbackY,
                    offsetY: -offsetY
                },
                {
                    originX: originFallbackX,
                    originY: originFallbackY,
                    overlayX: overlayFallbackX,
                    overlayY: overlayFallbackY,
                    offsetY: -offsetY
                }
            ]);
        };
        /**
         * Cleans up the active subscriptions.
         * @private
         * @return {?}
         */
        McDropdownTrigger.prototype.cleanUpSubscriptions = function () {
            this.closeSubscription.unsubscribe();
            this.hoverSubscription.unsubscribe();
        };
        /**
         * Returns a stream that emits whenever an action that should close the dropdown occurs.
         * @private
         * @return {?}
         */
        McDropdownTrigger.prototype.closingActions = function () {
            var _this = this;
            /** @type {?} */
            var backdrop = ( /** @type {?} */(this.overlayRef)).backdropClick();
            /** @type {?} */
            var outsidePointerEvents = ( /** @type {?} */(this.overlayRef)).outsidePointerEvents();
            /** @type {?} */
            var detachments = ( /** @type {?} */(this.overlayRef)).detachments();
            /** @type {?} */
            var parentClose = this._parent ? this._parent.closed : rxjs.of();
            /** @type {?} */
            var hover = this._parent ? this._parent.hovered().pipe(operators.filter(( /**
             * @param {?} active
             * @return {?}
             */function (active) { return active !== _this._dropdownItemInstance; })), operators.filter(( /**
             * @return {?}
             */function () { return _this._opened; }))) : rxjs.of();
            return rxjs.merge(backdrop, outsidePointerEvents, parentClose, hover, detachments);
        };
        /**
         * Handles the cases where the user hovers over the trigger.
         * @private
         * @return {?}
         */
        McDropdownTrigger.prototype.handleHover = function () {
            var _this = this;
            // Subscribe to changes in the hovered item in order to toggle the panel.
            if (!this.triggersNestedDropdown()) {
                return;
            }
            this.hoverSubscription = this._parent.hovered()
                // Since we might have multiple competing triggers for the same dropdown (e.g. a nested dropdown
                // with different data and triggers), we have to delay it by a tick to ensure that
                // it won't be closed immediately after it is opened.
                .pipe(operators.filter(( /**
         * @param {?} active
         * @return {?}
         */function (active) { return active === _this._dropdownItemInstance && !active.disabled; })), operators.delay(0, rxjs.asapScheduler))
                .subscribe(( /**
         * @return {?}
         */function () {
                _this.openedBy = 'mouse';
                // If the same dropdown is used between multiple triggers, it might still be animating
                // while the new trigger tries to re-open it. Wait for the animation to finish
                // before doing so. Also interrupt if the user moves to another item.
                if (_this.dropdown instanceof McDropdown && _this.dropdown.isAnimating) {
                    // We need the `delay(0)` here in order to avoid
                    // 'changed after checked' errors in some cases. See #12194.
                    _this.dropdown.animationDone
                        .pipe(operators.take(1), operators.delay(0, rxjs.asapScheduler), operators.takeUntil(_this._parent.hovered()))
                        .subscribe(( /**
                 * @return {?}
                 */function () { return _this.open(); }));
                }
                else {
                    _this.open();
                }
            }));
        };
        /**
         * Gets the portal that should be attached to the overlay.
         * @private
         * @return {?}
         */
        McDropdownTrigger.prototype.getPortal = function () {
            // Note that we can avoid this check by keeping the portal on the dropdown panel.
            // While it would be cleaner, we'd have to introduce another required method on
            // `McDropdownPanel`, making it harder to consume.
            if (!this.portal || this.portal.templateRef !== this.dropdown.templateRef) {
                this.portal = new portal.TemplatePortal(this.dropdown.templateRef, this._viewContainerRef);
            }
            return this.portal;
        };
        return McDropdownTrigger;
    }());
    McDropdownTrigger.decorators = [
        { type: core.Directive, args: [{
                    selector: "[mcDropdownTriggerFor]",
                    host: {
                        'aria-haspopup': 'true',
                        '[attr.aria-expanded]': 'opened || null',
                        '(mousedown)': 'handleMousedown($event)',
                        '(keydown)': 'handleKeydown($event)',
                        '(click)': 'handleClick($event)'
                    },
                    exportAs: 'mcDropdownTrigger'
                },] }
    ];
    /** @nocollapse */
    McDropdownTrigger.ctorParameters = function () { return [
        { type: overlay.Overlay },
        { type: core.ElementRef },
        { type: core.ViewContainerRef },
        { type: undefined, decorators: [{ type: core.Inject, args: [MC_DROPDOWN_SCROLL_STRATEGY,] }] },
        { type: McDropdown, decorators: [{ type: core.Optional }] },
        { type: McDropdownItem, decorators: [{ type: core.Optional }, { type: core.Self }] },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
        { type: a11y.FocusMonitor }
    ]; };
    McDropdownTrigger.propDecorators = {
        dropdown: [{ type: core.Input, args: ['mcDropdownTriggerFor',] }],
        data: [{ type: core.Input, args: ['mcDropdownTriggerData',] }],
        dropdownOpened: [{ type: core.Output }],
        dropdownClosed: [{ type: core.Output }]
    };
    if (false) {
        /** @type {?} */
        McDropdownTrigger.prototype.openedBy;
        /**
         * Data to be passed along to any lazily-rendered content.
         * @type {?}
         */
        McDropdownTrigger.prototype.data;
        /**
         * Event emitted when the associated dropdown is opened.
         * @type {?}
         */
        McDropdownTrigger.prototype.dropdownOpened;
        /**
         * Event emitted when the associated dropdown is closed.
         * @type {?}
         */
        McDropdownTrigger.prototype.dropdownClosed;
        /**
         * @type {?}
         * @private
         */
        McDropdownTrigger.prototype._dropdown;
        /**
         * @type {?}
         * @private
         */
        McDropdownTrigger.prototype._opened;
        /**
         * @type {?}
         * @private
         */
        McDropdownTrigger.prototype.portal;
        /**
         * @type {?}
         * @private
         */
        McDropdownTrigger.prototype.overlayRef;
        /**
         * @type {?}
         * @private
         */
        McDropdownTrigger.prototype.closeSubscription;
        /**
         * @type {?}
         * @private
         */
        McDropdownTrigger.prototype.hoverSubscription;
        /**
         * Handles touch start events on the trigger.
         * Needs to be an arrow function so we can easily use addEventListener and removeEventListener.
         * @type {?}
         * @private
         */
        McDropdownTrigger.prototype.handleTouchStart;
        /**
         * @type {?}
         * @private
         */
        McDropdownTrigger.prototype._overlay;
        /**
         * @type {?}
         * @private
         */
        McDropdownTrigger.prototype._element;
        /**
         * @type {?}
         * @private
         */
        McDropdownTrigger.prototype._viewContainerRef;
        /**
         * @type {?}
         * @private
         */
        McDropdownTrigger.prototype._scrollStrategy;
        /**
         * @type {?}
         * @private
         */
        McDropdownTrigger.prototype._parent;
        /**
         * @type {?}
         * @private
         */
        McDropdownTrigger.prototype._dropdownItemInstance;
        /**
         * @type {?}
         * @private
         */
        McDropdownTrigger.prototype._dir;
        /**
         * @type {?}
         * @private
         */
        McDropdownTrigger.prototype._focusMonitor;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: dropdown.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McDropdownModule = /** @class */ (function () {
        function McDropdownModule() {
        }
        return McDropdownModule;
    }());
    McDropdownModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        overlay.OverlayModule,
                        icon.McIconModule
                    ],
                    exports: [McDropdown, McDropdownItem, McDropdownTrigger, McDropdownContent],
                    declarations: [McDropdown, McDropdownItem, McDropdownTrigger, McDropdownContent],
                    providers: [MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER]
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
     * Generated from: ptsecurity-mosaic-dropdown.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.MC_DROPDOWN_DEFAULT_OPTIONS = MC_DROPDOWN_DEFAULT_OPTIONS;
    exports.MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY = MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY;
    exports.MC_DROPDOWN_PANEL = MC_DROPDOWN_PANEL;
    exports.MC_DROPDOWN_SCROLL_STRATEGY = MC_DROPDOWN_SCROLL_STRATEGY;
    exports.MC_DROPDOWN_SCROLL_STRATEGY_FACTORY = MC_DROPDOWN_SCROLL_STRATEGY_FACTORY;
    exports.MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER = MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER;
    exports.McDropdown = McDropdown;
    exports.McDropdownContent = McDropdownContent;
    exports.McDropdownItem = McDropdownItem;
    exports.McDropdownItemBase = McDropdownItemBase;
    exports.McDropdownItemMixinBase = McDropdownItemMixinBase;
    exports.McDropdownModule = McDropdownModule;
    exports.McDropdownTrigger = McDropdownTrigger;
    exports.NESTED_PANEL_TOP_PADDING = NESTED_PANEL_TOP_PADDING;
    exports.fadeInItems = fadeInItems;
    exports.mcDropdownAnimations = mcDropdownAnimations;
    exports.throwMcDropdownInvalidPositionX = throwMcDropdownInvalidPositionX;
    exports.throwMcDropdownInvalidPositionY = throwMcDropdownInvalidPositionY;
    exports.throwMcDropdownMissingError = throwMcDropdownMissingError;
    exports.transformDropdown = transformDropdown;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-dropdown.umd.js.map
