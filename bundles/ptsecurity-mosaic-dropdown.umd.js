(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/overlay'), require('@angular/common'), require('@ptsecurity/mosaic/icon'), require('@angular/cdk/portal'), require('rxjs'), require('@angular/cdk/a11y'), require('@ptsecurity/mosaic/core'), require('@angular/cdk/bidi'), require('@angular/cdk/platform'), require('@ptsecurity/cdk/keycodes'), require('rxjs/operators'), require('@angular/cdk/coercion'), require('@angular/cdk/keycodes'), require('@ptsecurity/cdk/a11y'), require('@angular/animations')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/dropdown', ['exports', '@angular/core', '@angular/cdk/overlay', '@angular/common', '@ptsecurity/mosaic/icon', '@angular/cdk/portal', 'rxjs', '@angular/cdk/a11y', '@ptsecurity/mosaic/core', '@angular/cdk/bidi', '@angular/cdk/platform', '@ptsecurity/cdk/keycodes', 'rxjs/operators', '@angular/cdk/coercion', '@angular/cdk/keycodes', '@ptsecurity/cdk/a11y', '@angular/animations'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.dropdown = {}), global.ng.core, global.ng.cdk.overlay, global.ng.common, global.ptsecurity.mosaic.icon, global.ng.cdk.portal, global.rxjs, global.ng.cdk.a11y, global.ptsecurity.mosaic.core, global.ng.cdk.bidi, global.ng.cdk.platform, global.mc.cdk.keycodes, global.rxjs.operators, global.ng.cdk.coercion, global.ng.cdk.keycodes, global.mc.cdk.a11y, global.ng.animations));
}(this, (function (exports, core, overlay, common, icon, portal, rxjs, a11y, core$1, bidi, platform, keycodes$1, operators, coercion, keycodes, a11y$1, animations) { 'use strict';

    /**
     * Injection token used to provide the parent dropdown to dropdown-specific components.
     * @docs-private
     */
    var MC_DROPDOWN_PANEL = new core.InjectionToken('MC_DROPDOWN_PANEL');
    /** Injection token to be used to override the default options for `mc-dropdown`. */
    var MC_DROPDOWN_DEFAULT_OPTIONS = new core.InjectionToken('mc-dropdown-default-options', {
        providedIn: 'root',
        factory: MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY
    });
    /** @docs-private */
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

    /**
     * Dropdown content that will be rendered lazily once the dropdown is opened.
     */
    var McDropdownContent = /** @class */ (function () {
        function McDropdownContent(template, componentFactoryResolver, appRef, injector, viewContainerRef, document) {
            this.template = template;
            this.componentFactoryResolver = componentFactoryResolver;
            this.appRef = appRef;
            this.injector = injector;
            this.viewContainerRef = viewContainerRef;
            this.document = document;
            /** Emits when the dropdown content has been attached. */
            this.attached = new rxjs.Subject();
        }
        /**
         * Attaches the content with a particular context.
         * @docs-private
         */
        McDropdownContent.prototype.attach = function (context) {
            if (context === void 0) { context = {}; }
            if (!this.portal) {
                this.portal = new portal.TemplatePortal(this.template, this.viewContainerRef);
            }
            this.detach();
            if (!this.outlet) {
                this.outlet = new portal.DomPortalOutlet(this.document.createElement('div'), this.componentFactoryResolver, this.appRef, this.injector);
            }
            var element = this.template.elementRef.nativeElement;
            // Because we support opening the same dropdown from different triggers (which in turn have their
            // own `OverlayRef` panel), we have to re-insert the host element every time, otherwise we
            // risk it staying attached to a pane that's no longer in the DOM.
            element.parentNode.insertBefore(this.outlet.outletElement, element);
            this.portal.attach(this.outlet, context);
            this.attached.next();
        };
        /**
         * Detaches the content.
         * @docs-private
         */
        McDropdownContent.prototype.detach = function () {
            if (this.portal.isAttached) {
                this.portal.detach();
            }
        };
        McDropdownContent.prototype.ngOnDestroy = function () {
            var _a;
            (_a = this.outlet) === null || _a === void 0 ? void 0 : _a.dispose();
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

    // Boilerplate for applying mixins to McDropdownItem.
    /** @docs-private */
    // tslint:disable-next-line:naming-convention
    var McDropdownItemMixinBase = core$1.mixinDisabled(/** @class */ (function () {
        function class_1() {
        }
        return class_1;
    }()));
    /**
     * This directive is intended to be used inside an mc-dropdown tag.
     * It exists mostly to set the role attribute.
     */
    var McDropdownItem = /** @class */ (function (_super) {
        __extends(McDropdownItem, _super);
        function McDropdownItem(elementRef, focusMonitor, parentDropdownPanel) {
            var _this = _super.call(this) || this;
            _this.elementRef = elementRef;
            _this.focusMonitor = focusMonitor;
            _this.parentDropdownPanel = parentDropdownPanel;
            /** Stream that emits when the dropdown item is hovered. */
            _this.hovered = new rxjs.Subject();
            /** Stream that emits when the menu item is focused. */
            _this.focused = new rxjs.Subject();
            /** Whether the dropdown item is highlighted. */
            _this.highlighted = false;
            /** Whether the dropdown item acts as a trigger for a nested dropdown. */
            _this.isNested = false;
            return _this;
        }
        McDropdownItem.prototype.ngAfterViewInit = function () {
            if (this.focusMonitor) {
                // Start monitoring the element so it gets the appropriate focused classes. We want
                // to show the focus style for menu items only when the focus was not caused by a
                // mouse or touch interaction.
                this.focusMonitor.monitor(this.elementRef, false);
            }
        };
        McDropdownItem.prototype.ngOnDestroy = function () {
            if (this.focusMonitor) {
                this.focusMonitor.stopMonitoring(this.elementRef);
            }
            this.hovered.complete();
            this.focused.complete();
        };
        McDropdownItem.prototype.resetStyles = function () {
            this.getHostElement().classList.remove('cdk-keyboard-focused');
        };
        /** Focuses the dropdown item. */
        McDropdownItem.prototype.focus = function (origin, options) {
            if (this.focusMonitor && origin) {
                this.focusMonitor.focusVia(this.getHostElement(), origin, options);
            }
            else {
                this.getHostElement().focus(options);
            }
            this.focused.next(this);
        };
        /** Returns the host DOM element. */
        McDropdownItem.prototype.getHostElement = function () {
            return this.elementRef.nativeElement;
        };
        /** Used to set the `tabindex`. */
        McDropdownItem.prototype.getTabIndex = function () {
            return this.disabled ? '-1' : '0';
        };
        /** Prevents the default element actions if it is disabled. */
        // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
        // In Ivy the `host` bindings will be merged when this class is extended, whereas in
        // ViewEngine they're overwritten.
        // TODO(crisbeto): we move this back into `host` once Ivy is turned on by default.
        // tslint:disable-next-line:no-host-decorator-in-concrete
        McDropdownItem.prototype.checkDisabled = function (event) {
            if (this.disabled) {
                event.preventDefault();
                event.stopPropagation();
            }
        };
        /** Emits to the hover stream. */
        // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
        // In Ivy the `host` bindings will be merged when this class is extended, whereas in
        // ViewEngine they're overwritten.
        // TODO(crisbeto): we move this back into `host` once Ivy is turned on by default.
        // tslint:disable-next-line:no-host-decorator-in-concrete
        McDropdownItem.prototype.handleMouseEnter = function () {
            this.hovered.next(this);
        };
        /** Gets the label to be used when determining whether the option should be focused. */
        McDropdownItem.prototype.getLabel = function () {
            var _a, _b;
            var clone = this.getHostElement().cloneNode(true);
            var icons = clone.querySelectorAll('[mc-icon], .mc-icon');
            // Strip away icons so they don't show up in the text.
            // tslint:disable-next-line:prefer-for-of
            for (var i = 0; i < icons.length; i++) {
                var icon = icons[i];
                (_a = icon.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(icon);
            }
            return ((_b = clone.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || '';
        };
        return McDropdownItem;
    }(McDropdownItemMixinBase));
    McDropdownItem.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-dropdown-item, [mc-dropdown-item]',
                    exportAs: 'mcDropdownItem',
                    template: "<div class=\"mc-dropdown-item-wrapper\">\n    <ng-content></ng-content>\n</div>\n<i *ngIf=\"isNested\" mc-icon=\"mc-angle-right-M_16\" class=\"mc-dropdown-trigger__icon\"></i>\n",
                    inputs: ['disabled'],
                    host: {
                        class: 'mc-dropdown-item',
                        '[class.mc-dropdown-item_with-icon]': 'icon',
                        '[class.mc-dropdown-item_highlighted]': 'highlighted',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.tabindex]': 'getTabIndex()'
                    },
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".mc-dropdown-item{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;align-items:center;position:relative;box-sizing:border-box;width:100%;border:1px solid transparent;outline:none;padding:0;text-align:left;white-space:nowrap}.mc-dropdown-item:not([disabled]){cursor:pointer}.mc-dropdown-item .mc-dropdown-item__caption{margin-top:4px}.mc-dropdown-item.mc-dropdown-item_with-icon .mc-dropdown-item__caption{margin-left:24px}.mc-dropdown-item .docs-navbar-version__num{margin-right:4px}.mc-dropdown-item-wrapper{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:var(--mc-dropdown-item-size-padding,5px 15px)}.mc-dropdown-item-wrapper [mc-icon]{padding:var(--mc-dropdown-item-size-icon-padding,0 8px 2px 0)}.mc-dropdown-trigger__icon{margin-left:auto;padding-right:var(--dropdown-trigger-size-icon-padding-right,8px)}.mc-dropdown__group-header{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;padding:var(--mc-dropdown-item-size-padding,6px 15px)}.mc-dropdown__group-header.mc-dropdown__group-header_small{padding:var(--mc-dropdown-item-size-padding,8px 15px)}.mc-dropdown__divider{height:var(--mc-dropdown-item-size-padding,1px);margin:var(--mc-dropdown-item-size-padding,4px 0)}"]
                },] }
    ];
    /** @nocollapse */
    McDropdownItem.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: a11y.FocusMonitor },
        { type: undefined, decorators: [{ type: core.Inject, args: [MC_DROPDOWN_PANEL,] }, { type: core.Optional }] }
    ]; };
    McDropdownItem.propDecorators = {
        icon: [{ type: core.ContentChild, args: [icon.McIcon,] }],
        checkDisabled: [{ type: core.HostListener, args: ['click', ['$event'],] }],
        handleMouseEnter: [{ type: core.HostListener, args: ['mouseenter',] }]
    };

    /**
     * Throws an exception for the case when dropdown trigger doesn't have a valid mc-dropdown instance
     * @docs-private
     */
    function throwMcDropdownMissingError() {
        throw Error("mcDropdownTriggerFor: must pass in an mc-dropdown instance.\n    Example:\n      <mc-dropdown #dropdown=\"mcDropdown\"></mc-dropdown>\n      <button [mcDropdownTriggerFor]=\"dropdown\"></button>");
    }
    /**
     * Throws an exception for the case when dropdown's x-position value isn't valid.
     * In other words, it doesn't match 'before' or 'after'.
     * @docs-private
     */
    function throwMcDropdownInvalidPositionX() {
        throw Error("xPosition value must be either 'before' or after'.\n      Example: <mc-dropdown [xPosition]=\"'before'\" #dropdown=\"mcDropdown\"></mc-dropdown>");
    }
    /**
     * Throws an exception for the case when dropdown's y-position value isn't valid.
     * In other words, it doesn't match 'above' or 'below'.
     * @docs-private
     */
    function throwMcDropdownInvalidPositionY() {
        throw Error("yPosition value must be either 'above' or below'.\n      Example: <mc-dropdown [yPosition]=\"'above'\" #dropdown=\"mcDropdown\"></mc-dropdown>");
    }

    /**
     * Animations used by the mc-dropdown component.
     * @docs-private
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
    var fadeInItems = mcDropdownAnimations.fadeInItems;
    var transformDropdown = mcDropdownAnimations.transformDropdown;

    var McDropdown = /** @class */ (function () {
        function McDropdown(elementRef, ngZone, defaultOptions) {
            this.elementRef = elementRef;
            this.ngZone = ngZone;
            this.defaultOptions = defaultOptions;
            this.navigationWithWrap = false;
            this._xPosition = this.defaultOptions.xPosition;
            this._yPosition = this.defaultOptions.yPosition;
            this._overlapTriggerX = this.defaultOptions.overlapTriggerX;
            this._overlapTriggerY = this.defaultOptions.overlapTriggerY;
            this._hasBackdrop = this.defaultOptions.hasBackdrop;
            this.triggerWidth = '';
            /** Config object to be passed into the dropdown's ngClass */
            this.classList = {};
            /** Current state of the panel animation. */
            this.panelAnimationState = 'void';
            /** Emits whenever an animation on the dropdown completes. */
            this.animationDone = new rxjs.Subject();
            /** Class to be added to the backdrop element. */
            this.backdropClass = this.defaultOptions.backdropClass;
            /** Event emitted when the dropdown is closed. */
            this.closed = new core.EventEmitter();
            /** Only the direct descendant menu items. */
            this.directDescendantItems = new core.QueryList();
            /** Subscription to tab events on the dropdown panel */
            this.tabSubscription = rxjs.Subscription.EMPTY;
        }
        Object.defineProperty(McDropdown.prototype, "xPosition", {
            /** Position of the dropdown in the X axis. */
            get: function () {
                return this._xPosition;
            },
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
            /** Position of the dropdown in the Y axis. */
            get: function () {
                return this._yPosition;
            },
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
            /** Whether the dropdown should overlap its trigger vertically. */
            get: function () {
                return this._overlapTriggerY;
            },
            set: function (value) {
                this._overlapTriggerY = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDropdown.prototype, "overlapTriggerX", {
            /** Whether the dropdown should overlap its trigger horizontally. */
            get: function () {
                return this._overlapTriggerX;
            },
            set: function (value) {
                this._overlapTriggerX = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDropdown.prototype, "hasBackdrop", {
            /** Whether the dropdown has a backdrop. */
            get: function () {
                return this._hasBackdrop;
            },
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
             * @param classes list of class names
             */
            set: function (classes) {
                var _this = this;
                var previousPanelClass = this.previousPanelClass;
                if (previousPanelClass && previousPanelClass.length) {
                    previousPanelClass
                        .split(' ')
                        .forEach(function (className) { return _this.classList[className] = false; });
                }
                this.previousPanelClass = classes;
                if (classes === null || classes === void 0 ? void 0 : classes.length) {
                    classes
                        .split(' ')
                        .forEach(function (className) { return _this.classList[className] = true; });
                    this.elementRef.nativeElement.className = '';
                }
            },
            enumerable: false,
            configurable: true
        });
        McDropdown.prototype.ngOnInit = function () {
            this.setPositionClasses();
        };
        McDropdown.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.updateDirectDescendants();
            this.keyManager = new a11y$1.FocusKeyManager(this.directDescendantItems)
                .withTypeAhead();
            if (this.navigationWithWrap) {
                this.keyManager.withWrap();
            }
            this.tabSubscription = this.keyManager.tabOut
                .subscribe(function () { return _this.closed.emit('tab'); });
            // If a user manually (programmatically) focuses a menu item, we need to reflect that focus
            // change back to the key manager. Note that we don't need to unsubscribe here because focused
            // is internal and we know that it gets completed on destroy.
            this.directDescendantItems.changes
                .pipe(operators.startWith(this.directDescendantItems), operators.switchMap(function (items) { return rxjs.merge.apply(void 0, __spread(items.map(function (item) { return item.focused; }))); }))
                .subscribe(function (focusedItem) { return _this.keyManager.updateActiveItem(focusedItem); });
        };
        McDropdown.prototype.ngOnDestroy = function () {
            this.directDescendantItems.destroy();
            this.tabSubscription.unsubscribe();
            this.closed.complete();
        };
        /** Stream that emits whenever the hovered dropdown item changes. */
        McDropdown.prototype.hovered = function () {
            var itemChanges = this.directDescendantItems.changes;
            return itemChanges.pipe(operators.startWith(this.directDescendantItems), operators.switchMap(function (items) { return rxjs.merge.apply(void 0, __spread(items.map(function (item) { return item.hovered; }))); }));
        };
        /** Handle a keyboard event from the dropdown, delegating to the appropriate action. */
        McDropdown.prototype.handleKeydown = function (event) {
            // tslint:disable-next-line:deprecation
            var keyCode = event.keyCode;
            switch (keyCode) {
                case keycodes$1.ESCAPE:
                    this.closed.emit('keydown');
                    break;
                case keycodes$1.LEFT_ARROW:
                    if (this.parent && this.direction === 'ltr') {
                        this.closed.emit('keydown');
                    }
                    break;
                case keycodes$1.RIGHT_ARROW:
                    if (this.parent && this.direction === 'rtl') {
                        this.closed.emit('keydown');
                    }
                    break;
                default:
                    if (keyCode === keycodes.UP_ARROW || keyCode === keycodes.DOWN_ARROW) {
                        this.keyManager.setFocusOrigin('keyboard');
                    }
                    this.keyManager.onKeydown(event);
                    return;
            }
            // Don't allow the event to propagate if we've already handled it, or it may
            // end up reaching other overlays that were opened earlier.
            event.stopPropagation();
        };
        /**
         * Focus the first item in the dropdown.
         * @param origin Action from which the focus originated. Used to set the correct styling.
         */
        McDropdown.prototype.focusFirstItem = function (origin) {
            var _this = this;
            if (origin === void 0) { origin = 'program'; }
            // When the content is rendered lazily, it takes a bit before the items are inside the DOM.
            if (this.lazyContent) {
                this.ngZone.onStable
                    .pipe(operators.take(1))
                    .subscribe(function () { return _this.keyManager.setFocusOrigin(origin).setFirstItemActive(); });
            }
            else {
                this.keyManager.setFocusOrigin(origin).setFirstItemActive();
            }
        };
        /**
         * Resets the active item in the dropdown. This is used when the dropdown is opened, allowing
         * the user to start from the first option when pressing the down arrow.
         */
        McDropdown.prototype.resetActiveItem = function () {
            var _a;
            (_a = this.keyManager.activeItem) === null || _a === void 0 ? void 0 : _a.resetStyles();
            this.keyManager.setActiveItem(-1);
        };
        /**
         * Adds classes to the dropdown panel based on its position. Can be used by
         * consumers to add specific styling based on the position.
         * @param posX Position of the dropdown along the x axis.
         * @param posY Position of the dropdown along the y axis.
         * @docs-private
         */
        McDropdown.prototype.setPositionClasses = function (posX, posY) {
            if (posX === void 0) { posX = this.xPosition; }
            if (posY === void 0) { posY = this.yPosition; }
            var classes = this.classList;
            classes['mc-dropdown-before'] = posX === 'before';
            classes['mc-dropdown-after'] = posX === 'after';
            classes['mc-dropdown-above'] = posY === 'above';
            classes['mc-dropdown-below'] = posY === 'below';
        };
        /** Starts the enter animation. */
        McDropdown.prototype.startAnimation = function () {
            this.panelAnimationState = 'enter';
        };
        /** Resets the panel animation to its initial state. */
        McDropdown.prototype.resetAnimation = function () {
            this.panelAnimationState = 'void';
        };
        /** Callback that is invoked when the panel animation completes. */
        McDropdown.prototype.onAnimationDone = function (event) {
            this.animationDone.next(event);
            this.isAnimating = false;
        };
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
        /**
         * Sets up a stream that will keep track of any newly-added menu items and will update the list
         * of direct descendants. We collect the descendants this way, because `_allItems` can include
         * items that are part of child menus, and using a custom way of registering items is unreliable
         * when it comes to maintaining the item order.
         */
        McDropdown.prototype.updateDirectDescendants = function () {
            var _this = this;
            this.items.changes
                .pipe(operators.startWith(this.items))
                .subscribe(function (items) {
                _this.directDescendantItems.reset(items.filter(function (item) { return item.parentDropdownPanel === _this; }));
                _this.directDescendantItems.notifyOnChanges();
            });
        };
        return McDropdown;
    }());
    McDropdown.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-dropdown',
                    exportAs: 'mcDropdown',
                    template: "<ng-template>\n    <div class=\"mc-dropdown__panel\"\n         [ngClass]=\"classList\"\n         [class.mc-dropdown__panel_nested]=\"parent\"\n         [style.min-width]=\"triggerWidth\"\n         (keydown)=\"handleKeydown($event)\"\n         (click)=\"closed.emit('click')\"\n         [@transformDropdown]=\"panelAnimationState\"\n         (@transformDropdown.start)=\"onAnimationStart($event)\"\n         (@transformDropdown.done)=\"onAnimationDone($event)\"\n         tabindex=\"-1\">\n\n        <div class=\"mc-dropdown__content\">\n            <ng-content></ng-content>\n        </div>\n    </div>\n</ng-template>\n",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    animations: [
                        mcDropdownAnimations.transformDropdown,
                        mcDropdownAnimations.fadeInItems
                    ],
                    providers: [
                        { provide: MC_DROPDOWN_PANEL, useExisting: McDropdown }
                    ],
                    styles: [".mc-dropdown__panel{margin-top:-1px;max-width:var(--mc-dropdown-panel-size-max-width,640px);border-width:var(--mc-dropdown-panel-size-border-width,1px);border-style:solid;border-bottom-left-radius:var(--mc-dropdown-panel-size-border-radius,3px);border-bottom-right-radius:var(--mc-dropdown-panel-size-border-radius,3px);padding:var(--mc-dropdown-panel-size-padding,4px 0)}.mc-dropdown__panel.mc-dropdown__panel_nested{border-top-left-radius:var(--mc-dropdown-panel-size-border-radius,3px);border-top-right-radius:var(--mc-dropdown-panel-size-border-radius,3px)}.mc-dropdown__panel.ng-animating{pointer-events:none}.mc-dropdown__content{display:flex;flex-direction:column}"]
                },] }
    ];
    /** @nocollapse */
    McDropdown.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.NgZone },
        { type: undefined, decorators: [{ type: core.Inject, args: [MC_DROPDOWN_DEFAULT_OPTIONS,] }] }
    ]; };
    McDropdown.propDecorators = {
        navigationWithWrap: [{ type: core.Input }],
        xPosition: [{ type: core.Input }],
        yPosition: [{ type: core.Input }],
        overlapTriggerY: [{ type: core.Input }],
        overlapTriggerX: [{ type: core.Input }],
        hasBackdrop: [{ type: core.Input }],
        panelClass: [{ type: core.Input, args: ['class',] }],
        backdropClass: [{ type: core.Input }],
        templateRef: [{ type: core.ViewChild, args: [core.TemplateRef, { static: false },] }],
        items: [{ type: core.ContentChildren, args: [McDropdownItem, { descendants: true },] }],
        lazyContent: [{ type: core.ContentChild, args: [McDropdownContent, { static: false },] }],
        closed: [{ type: core.Output }]
    };

    /** Injection token that determines the scroll handling while the dropdown is open. */
    var MC_DROPDOWN_SCROLL_STRATEGY = new core.InjectionToken('mc-dropdown-scroll-strategy');
    /** @docs-private */
    // tslint:disable-next-line:naming-convention
    function MC_DROPDOWN_SCROLL_STRATEGY_FACTORY(overlay) {
        return function () { return overlay.scrollStrategies.reposition(); };
    }
    /** @docs-private */
    var MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER = {
        provide: MC_DROPDOWN_SCROLL_STRATEGY,
        deps: [overlay.Overlay],
        useFactory: MC_DROPDOWN_SCROLL_STRATEGY_FACTORY
    };
    /** Default top padding of the nested dropdown panel. */
    var NESTED_PANEL_TOP_PADDING = 4;
    var NESTED_PANEL_LEFT_PADDING = 8;
    /** Options for binding a passive event listener. */
    var passiveEventListenerOptions = platform.normalizePassiveListenerOptions({ passive: true });
    /**
     * This directive is intended to be used in conjunction with an mc-dropdown tag.  It is
     * responsible for toggling the display of the provided dropdown instance.
     */
    var McDropdownTrigger = /** @class */ (function () {
        function McDropdownTrigger(overlay, elementRef, viewContainerRef, scrollStrategy, parent, dropdownItemInstance, _dir, focusMonitor) {
            var _this = this;
            this.overlay = overlay;
            this.elementRef = elementRef;
            this.viewContainerRef = viewContainerRef;
            this.scrollStrategy = scrollStrategy;
            this.parent = parent;
            this.dropdownItemInstance = dropdownItemInstance;
            this._dir = _dir;
            this.focusMonitor = focusMonitor;
            this.openByArrowDown = true;
            /**
             * Whether focus should be restored when the menu is closed.
             * Note that disabling this option can have accessibility implications
             * and it's up to you to manage focus, if you decide to turn it off.
             */
            this.restoreFocus = true;
            /** Event emitted when the associated dropdown is opened. */
            this.dropdownOpened = new core.EventEmitter();
            /** Event emitted when the associated dropdown is closed. */
            this.dropdownClosed = new core.EventEmitter();
            this._opened = false;
            this.overlayRef = null;
            this.closeSubscription = rxjs.Subscription.EMPTY;
            this.hoverSubscription = rxjs.Subscription.EMPTY;
            /**
             * Handles touch start events on the trigger.
             * Needs to be an arrow function so we can easily use addEventListener and removeEventListener.
             */
            this.handleTouchStart = function () { return _this.openedBy = 'touch'; };
            elementRef.nativeElement.addEventListener('touchstart', this.handleTouchStart, passiveEventListenerOptions);
            if (dropdownItemInstance) {
                dropdownItemInstance.isNested = this.isNested();
            }
        }
        Object.defineProperty(McDropdownTrigger.prototype, "dropdown", {
            /** References the dropdown instance that the trigger is associated with. */
            get: function () {
                return this._dropdown;
            },
            set: function (dropdown) {
                var _this = this;
                if (dropdown === this._dropdown) {
                    return;
                }
                this._dropdown = dropdown;
                this.closeSubscription.unsubscribe();
                if (dropdown) {
                    this.closeSubscription = dropdown.closed
                        .asObservable()
                        .subscribe(function (reason) {
                        _this.destroy(reason);
                        // If a click closed the dropdown, we should close the entire chain of nested dropdowns.
                        if (['click', 'tab'].includes(reason) && _this.parent) {
                            _this.parent.closed.emit(reason);
                        }
                    });
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDropdownTrigger.prototype, "dir", {
            /** The text direction of the containing app. */
            get: function () {
                var _a;
                return ((_a = this._dir) === null || _a === void 0 ? void 0 : _a.value) === 'rtl' ? 'rtl' : 'ltr';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDropdownTrigger.prototype, "opened", {
            /** Whether the dropdown is open. */
            get: function () {
                return this._opened;
            },
            enumerable: false,
            configurable: true
        });
        McDropdownTrigger.prototype.ngAfterContentInit = function () {
            this.check();
            this.handleHover();
        };
        McDropdownTrigger.prototype.ngOnDestroy = function () {
            if (this.overlayRef) {
                this.overlayRef.dispose();
                this.overlayRef = null;
            }
            this.elementRef.nativeElement.removeEventListener('touchstart', this.handleTouchStart, passiveEventListenerOptions);
            this.cleanUpSubscriptions();
        };
        /** Whether the dropdown triggers a nested dropdown or a top-level one. */
        McDropdownTrigger.prototype.isNested = function () {
            return !!(this.dropdownItemInstance && this.parent);
        };
        /** Toggles the dropdown between the open and closed states. */
        McDropdownTrigger.prototype.toggle = function () {
            // tslint:disable-next-line:no-void-expression
            return this._opened ? this.close() : this.open();
        };
        /** Opens the dropdown. */
        McDropdownTrigger.prototype.open = function () {
            var _this = this;
            if (this._opened) {
                return;
            }
            this.check();
            var overlayRef = this.createOverlay();
            var overlayConfig = overlayRef.getConfig();
            this.setPosition(overlayConfig.positionStrategy);
            overlayConfig.hasBackdrop = this.dropdown.hasBackdrop ? !this.isNested() : this.dropdown.hasBackdrop;
            overlayRef.attach(this.getPortal());
            if (this.dropdown.lazyContent) {
                this.dropdown.lazyContent.attach(this.data);
            }
            this.closeSubscription = this.closingActions()
                .subscribe(function () { return _this.close(); });
            this.init();
            if (this.dropdown instanceof McDropdown) {
                this.dropdown.startAnimation();
            }
        };
        /** Closes the dropdown. */
        McDropdownTrigger.prototype.close = function () {
            this.dropdown.closed.emit();
        };
        /**
         * Focuses the dropdown trigger.
         * @param origin Source of the dropdown trigger's focus.
         */
        McDropdownTrigger.prototype.focus = function (origin) {
            if (origin === void 0) { origin = 'program'; }
            if (this.focusMonitor) {
                this.focusMonitor.focusVia(this.elementRef.nativeElement, origin);
            }
            else {
                this.elementRef.nativeElement.focus();
            }
        };
        /** Handles mouse presses on the trigger. */
        McDropdownTrigger.prototype.handleMousedown = function (event) {
            // Since right or middle button clicks won't trigger the `click` event,
            // we shouldn't consider the dropdown as opened by mouse in those cases.
            this.openedBy = event.button === 0 ? 'mouse' : undefined;
            // Since clicking on the trigger won't close the dropdown if it opens a nested dropdown,
            // we should prevent focus from moving onto it via click to avoid the
            // highlight from lingering on the dropdown item.
            if (this.isNested()) {
                event.preventDefault();
            }
        };
        /** Handles key presses on the trigger. */
        McDropdownTrigger.prototype.handleKeydown = function (event) {
            // tslint:disable-next-line:deprecation
            var keyCode = event.keyCode;
            // Pressing enter on the trigger will trigger the click handler later.
            if (keyCode === keycodes$1.ENTER || keyCode === keycodes$1.SPACE) {
                this.openedBy = 'keyboard';
            }
            if ((this.isNested() &&
                ((keyCode === keycodes$1.RIGHT_ARROW && this.dir === 'ltr') || (keyCode === keycodes$1.LEFT_ARROW && this.dir === 'rtl'))) ||
                (!this.isNested() && (keyCode === keycodes$1.DOWN_ARROW && this.openByArrowDown))) {
                event.preventDefault();
                this.openedBy = 'keyboard';
                this.open();
            }
        };
        /** Handles click events on the trigger. */
        McDropdownTrigger.prototype.handleClick = function (event) {
            if (this.isNested()) {
                // Stop event propagation to avoid closing the parent dropdown.
                event.stopPropagation();
                this.open();
            }
            else {
                this.toggle();
            }
        };
        /** Closes the dropdown and does the necessary cleanup. */
        McDropdownTrigger.prototype.destroy = function (reason) {
            var _this = this;
            var _a;
            if (!this.overlayRef || !this.opened) {
                return;
            }
            this.dropdown.resetActiveItem();
            this.closeSubscription.unsubscribe();
            this.overlayRef.detach();
            if (this.restoreFocus && reason === 'keydown' && this.isNested()) {
                this.focus(this.openedBy);
            }
            if (this.dropdown instanceof McDropdown) {
                this.dropdown.resetAnimation();
                // Wait for the exit animation to finish before reseting dropdown toState.
                var dropdownAnimationDoneSubscription = this.dropdown.animationDone
                    .pipe(operators.filter(function (event) { return event.toState === 'void'; }), operators.take(1));
                if (this.dropdown.lazyContent) {
                    dropdownAnimationDoneSubscription
                        .pipe(operators.takeUntil(this.dropdown.lazyContent.attached));
                }
                dropdownAnimationDoneSubscription
                    .subscribe({
                    // If lazy content has attached we're need to detach it.
                    next: this.dropdown.lazyContent ? function () { var _a; return (_a = _this.dropdown.lazyContent) === null || _a === void 0 ? void 0 : _a.detach(); } : undefined,
                    error: undefined,
                    complete: function () {
                        _this.reset();
                    }
                });
            }
            else {
                this.reset();
                (_a = this.dropdown.lazyContent) === null || _a === void 0 ? void 0 : _a.detach();
            }
        };
        /**
         * This method sets the dropdown state to open and focuses the first item if
         * the dropdown was opened via the keyboard.
         */
        McDropdownTrigger.prototype.init = function () {
            this.dropdown.parent = this.isNested() ? this.parent : undefined;
            this.dropdown.direction = this.dir;
            if (!this.dropdown.parent) {
                this.dropdown.triggerWidth = this.getWidth();
            }
            this.setIsOpened(true);
            this.dropdown.focusFirstItem(this.openedBy);
        };
        /**
         * This method resets the dropdown when it's closed, most importantly restoring
         * focus to the dropdown trigger if the dropdown was opened via the keyboard.
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
            else if (!this.isNested()) {
                this.focus(this.openedBy);
            }
            this.openedBy = undefined;
        };
        // set state rather than toggle to support triggers sharing a dropdown
        McDropdownTrigger.prototype.setIsOpened = function (isOpen) {
            this._opened = isOpen;
            // tslint:disable-next-line:no-void-expression
            this._opened ? this.dropdownOpened.emit() : this.dropdownClosed.emit();
            if (this.isNested()) {
                this.dropdownItemInstance.highlighted = isOpen;
            }
        };
        /**
         * This method checks that a valid instance of McDropdown has been passed into
         * mcDropdownTriggerFor. If not, an exception is thrown.
         */
        McDropdownTrigger.prototype.check = function () {
            if (!this.dropdown) {
                throwMcDropdownMissingError();
            }
        };
        /**
         * This method creates the overlay from the provided dropdown's template and saves its
         * OverlayRef so that it can be attached to the DOM when open is called.
         */
        McDropdownTrigger.prototype.createOverlay = function () {
            if (!this.overlayRef) {
                var config = this.getOverlayConfig();
                this.subscribeToPositions(config.positionStrategy);
                this.overlayRef = this.overlay.create(config);
                // Consume the `keydownEvents` in order to prevent them from going to another overlay.
                // Ideally we'd also have our keyboard event logic in here, however doing so will
                // break anybody that may have implemented the `McDropdownPanel` themselves.
                this.overlayRef.keydownEvents()
                    .subscribe();
            }
            return this.overlayRef;
        };
        /**
         * This method builds the configuration object needed to create the overlay, the OverlayState.
         * @returns OverlayConfig
         */
        McDropdownTrigger.prototype.getOverlayConfig = function () {
            return new overlay.OverlayConfig({
                positionStrategy: this.overlay.position()
                    .flexibleConnectedTo(this.elementRef)
                    .withLockedPosition()
                    .withTransformOriginOn('.mc-dropdown__panel'),
                backdropClass: this.dropdown.backdropClass || 'cdk-overlay-transparent-backdrop',
                scrollStrategy: this.scrollStrategy(),
                direction: this.dir
            });
        };
        /**
         * Listens to changes in the position of the overlay and sets the correct classes
         * on the dropdown based on the new position. This ensures the animation origin is always
         * correct, even if a fallback position is used for the overlay.
         */
        McDropdownTrigger.prototype.subscribeToPositions = function (position) {
            var _this = this;
            if (this.dropdown.setPositionClasses) {
                position.positionChanges
                    .subscribe(function (change) {
                    var posX = change.connectionPair.overlayX === 'start' ? 'after' : 'before';
                    var posY = change.connectionPair.overlayY === 'top' ? 'below' : 'above';
                    _this.dropdown.setPositionClasses(posX, posY);
                });
            }
        };
        /**
         * Sets the appropriate positions on a position strategy
         * so the overlay connects with the trigger correctly.
         * @param positionStrategy Strategy whose position to update.
         */
        McDropdownTrigger.prototype.setPosition = function (positionStrategy) {
            var _b = __read(this.dropdown.xPosition === 'before' ?
                ['end', 'start', 'end', 'start'] :
                ['start', 'end', 'start', 'end'], 4), originX = _b[0], originFallbackX = _b[1], overlayX = _b[2], overlayFallbackX = _b[3];
            // tslint:disable-next-line:prefer-const
            var _c = __read(this.dropdown.yPosition === 'above' ?
                ['bottom', 'top', 'bottom', 'top'] :
                ['top', 'bottom', 'top', 'bottom'], 4), overlayY = _c[0], overlayFallbackY = _c[1], originY = _c[2], originFallbackY = _c[3];
            var offsetY = 0;
            var offsetX = 0;
            if (this.isNested()) {
                // When the dropdown is nested, it should always align itself
                // to the edges of the trigger, instead of overlapping it.
                overlayFallbackX = originX = this.dropdown.xPosition === 'before' ? 'start' : 'end';
                originFallbackX = overlayX = originX === 'end' ? 'start' : 'end';
                offsetY = overlayY === 'bottom' ? NESTED_PANEL_TOP_PADDING : -NESTED_PANEL_TOP_PADDING;
                offsetX = NESTED_PANEL_LEFT_PADDING;
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
                { originX: originX, originY: originY, overlayX: overlayX, overlayY: overlayY, offsetY: offsetY, offsetX: -offsetX },
                { originX: originFallbackX, originY: originY, overlayX: overlayFallbackX, overlayY: overlayY, offsetY: offsetY, offsetX: offsetX },
                {
                    originX: originX,
                    originY: originFallbackY,
                    overlayX: overlayX,
                    overlayY: overlayFallbackY,
                    offsetY: -offsetY,
                    offsetX: -offsetX
                },
                {
                    originX: originFallbackX,
                    originY: originFallbackY,
                    overlayX: overlayFallbackX,
                    overlayY: overlayFallbackY,
                    offsetY: -offsetY,
                    offsetX: -offsetX
                }
            ]);
        };
        /** Cleans up the active subscriptions. */
        McDropdownTrigger.prototype.cleanUpSubscriptions = function () {
            this.closeSubscription.unsubscribe();
            this.hoverSubscription.unsubscribe();
        };
        /** Returns a stream that emits whenever an action that should close the dropdown occurs. */
        McDropdownTrigger.prototype.closingActions = function () {
            var _this = this;
            var backdrop = this.overlayRef.backdropClick();
            var outsidePointerEvents = this.overlayRef.outsidePointerEvents();
            var detachments = this.overlayRef.detachments();
            var parentClose = this.parent ? this.parent.closed : rxjs.of();
            var hover = this.parent ? this.parent.hovered()
                .pipe(operators.filter(function (active) { return active !== _this.dropdownItemInstance; }), operators.filter(function () { return _this._opened; })) : rxjs.of();
            return rxjs.merge(backdrop, outsidePointerEvents, parentClose, hover, detachments);
        };
        /** Handles the cases where the user hovers over the trigger. */
        McDropdownTrigger.prototype.handleHover = function () {
            var _this = this;
            // Subscribe to changes in the hovered item in order to toggle the panel.
            if (!this.isNested()) {
                return;
            }
            this.hoverSubscription = this.parent.hovered()
                // Since we might have multiple competing triggers for the same dropdown (e.g. a nested dropdown
                // with different data and triggers), we have to delay it by a tick to ensure that
                // it won't be closed immediately after it is opened.
                .pipe(operators.filter(function (active) { return active === _this.dropdownItemInstance && !active.disabled; }), operators.delay(0, rxjs.asapScheduler))
                .subscribe(function () {
                _this.openedBy = 'mouse';
                // If the same dropdown is used between multiple triggers, it might still be animating
                // while the new trigger tries to re-open it. Wait for the animation to finish
                // before doing so. Also interrupt if the user moves to another item.
                if (_this.dropdown instanceof McDropdown && _this.dropdown.isAnimating) {
                    // We need the `delay(0)` here in order to avoid
                    // 'changed after checked' errors in some cases. See #12194.
                    _this.dropdown.animationDone
                        .pipe(operators.take(1), operators.delay(0, rxjs.asapScheduler), operators.takeUntil(_this.parent.hovered()))
                        .subscribe(function () { return _this.open(); });
                }
                else {
                    _this.open();
                }
            });
        };
        /** Gets the portal that should be attached to the overlay. */
        McDropdownTrigger.prototype.getPortal = function () {
            // Note that we can avoid this check by keeping the portal on the dropdown panel.
            // While it would be cleaner, we'd have to introduce another required method on
            // `McDropdownPanel`, making it harder to consume.
            if (!this.portal || this.portal.templateRef !== this.dropdown.templateRef) {
                this.portal = new portal.TemplatePortal(this.dropdown.templateRef, this.viewContainerRef);
            }
            return this.portal;
        };
        McDropdownTrigger.prototype.getWidth = function () {
            var nativeElement = this.elementRef.nativeElement;
            var _b = window.getComputedStyle(nativeElement), width = _b.width, borderRightWidth = _b.borderRightWidth, borderLeftWidth = _b.borderLeftWidth;
            return parseInt(width) - parseInt(borderRightWidth) - parseInt(borderLeftWidth) + "px";
        };
        return McDropdownTrigger;
    }());
    McDropdownTrigger.decorators = [
        { type: core.Directive, args: [{
                    selector: "[mcDropdownTriggerFor]",
                    exportAs: 'mcDropdownTrigger',
                    host: {
                        class: 'mc-dropdown-trigger',
                        '[class.mc-pressed]': 'opened',
                        '(mousedown)': 'handleMousedown($event)',
                        '(keydown)': 'handleKeydown($event)',
                        '(click)': 'handleClick($event)'
                    }
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
        data: [{ type: core.Input, args: ['mcDropdownTriggerData',] }],
        openByArrowDown: [{ type: core.Input }],
        restoreFocus: [{ type: core.Input, args: ['mcDropdownTriggerRestoreFocus',] }],
        dropdown: [{ type: core.Input, args: ['mcDropdownTriggerFor',] }],
        dropdownOpened: [{ type: core.Output }],
        dropdownClosed: [{ type: core.Output }]
    };

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
                    exports: [
                        McDropdown,
                        McDropdownItem,
                        McDropdownTrigger,
                        McDropdownContent
                    ],
                    declarations: [
                        McDropdown,
                        McDropdownItem,
                        McDropdownTrigger,
                        McDropdownContent
                    ],
                    providers: [MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
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
    exports.McDropdownModule = McDropdownModule;
    exports.McDropdownTrigger = McDropdownTrigger;
    exports.NESTED_PANEL_LEFT_PADDING = NESTED_PANEL_LEFT_PADDING;
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
