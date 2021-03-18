(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@ptsecurity/cdk/tree'), require('@ptsecurity/mosaic/core'), require('rxjs/operators'), require('@angular/cdk/coercion'), require('@ptsecurity/cdk/keycodes'), require('rxjs'), require('@angular/cdk/collections'), require('@angular/forms'), require('@ptsecurity/cdk/a11y')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/tree', ['exports', '@angular/common', '@angular/core', '@ptsecurity/cdk/tree', '@ptsecurity/mosaic/core', 'rxjs/operators', '@angular/cdk/coercion', '@ptsecurity/cdk/keycodes', 'rxjs', '@angular/cdk/collections', '@angular/forms', '@ptsecurity/cdk/a11y'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.tree = {}), global.ng.common, global.ng.core, global.tree, global.ptsecurity.mosaic.core, global.rxjs.operators, global.ng.cdk.coercion, global.keycodes, global.rxjs, global.ng.cdk.collections, global.ng.forms, global.a11y));
}(this, (function (exports, common, core, tree, core$1, operators, coercion, keycodes, rxjs, collections, forms, a11y) { 'use strict';

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

    var McTreeNodeDef = /** @class */ (function (_super) {
        __extends(McTreeNodeDef, _super);
        function McTreeNodeDef() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return McTreeNodeDef;
    }(tree.CdkTreeNodeDef));
    McTreeNodeDef.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mcTreeNodeDef]',
                    inputs: ['when: mcTreeNodeDefWhen'],
                    providers: [{ provide: tree.CdkTreeNodeDef, useExisting: McTreeNodeDef }]
                },] }
    ];
    McTreeNodeDef.propDecorators = {
        data: [{ type: core.Input, args: ['mcTreeNode',] }]
    };

    var McTreeNodePadding = /** @class */ (function (_super) {
        __extends(McTreeNodePadding, _super);
        function McTreeNodePadding() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            _this.baseLeftPadding = 12;
            _this.iconWidth = 20;
            return _this;
        }
        Object.defineProperty(McTreeNodePadding.prototype, "level", {
            get: function () { return this._level; },
            set: function (value) { this.setLevelInput(value); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeNodePadding.prototype, "indent", {
            get: function () { return this._indent; },
            set: function (indent) { this.setIndentInput(indent); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeNodePadding.prototype, "leftPadding", {
            get: function () {
                return (this.withIcon ? 0 : this.iconWidth) + this.baseLeftPadding;
            },
            enumerable: false,
            configurable: true
        });
        McTreeNodePadding.prototype.paddingIndent = function () {
            var nodeLevel = (this.treeNode.data && this.tree.treeControl.getLevel)
                ? this.tree.treeControl.getLevel(this.treeNode.data)
                : 0;
            var level = this.level || nodeLevel;
            return level > 0 ? (level * this._indent) + this.leftPadding + "px" : this.leftPadding + "px";
        };
        McTreeNodePadding.prototype.ngOnInit = function () {
            this.withIcon = this.tree.treeControl.isExpandable(this.treeNode.data);
            this.setPadding();
        };
        return McTreeNodePadding;
    }(tree.CdkTreeNodePadding));
    McTreeNodePadding.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mcTreeNodePadding]',
                    providers: [{ provide: tree.CdkTreeNodePadding, useExisting: McTreeNodePadding }]
                },] }
    ];
    McTreeNodePadding.propDecorators = {
        level: [{ type: core.Input, args: ['mcTreeNodePadding',] }],
        indent: [{ type: core.Input, args: ['mcTreeNodePaddingIndent',] }]
    };

    var McTreeNodeToggleComponent = /** @class */ (function () {
        function McTreeNodeToggleComponent(tree, treeNode) {
            var _this = this;
            this.tree = tree;
            this.treeNode = treeNode;
            this.disabled = false;
            this._recursive = false;
            this.tree.treeControl.filterValue
                .pipe(operators.map(function (value) { return (value === null || value === void 0 ? void 0 : value.length) > 0; }))
                .subscribe(function (state) { return _this.disabled = state; });
        }
        Object.defineProperty(McTreeNodeToggleComponent.prototype, "recursive", {
            get: function () {
                return this._recursive;
            },
            set: function (value) {
                this._recursive = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeNodeToggleComponent.prototype, "iconState", {
            get: function () {
                return this.disabled || this.tree.treeControl.isExpanded(this.node);
            },
            enumerable: false,
            configurable: true
        });
        McTreeNodeToggleComponent.prototype.toggle = function (event) {
            this.recursive
                ? this.tree.treeControl.toggleDescendants(this.treeNode.data)
                : this.tree.treeControl.toggle(this.treeNode.data);
            event.stopPropagation();
        };
        return McTreeNodeToggleComponent;
    }());
    McTreeNodeToggleComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-tree-node-toggle',
                    template: "\n        <i class=\"mc mc-icon mc-angle-down-S_16\"></i>\n    ",
                    host: {
                        class: 'mc-tree-node-toggle',
                        '[class.mc-opened]': 'iconState',
                        '[attr.disabled]': 'disabled || null',
                        '(click)': 'toggle($event)'
                    },
                    encapsulation: core.ViewEncapsulation.None
                },] }
    ];
    /** @nocollapse */
    McTreeNodeToggleComponent.ctorParameters = function () { return [
        { type: tree.CdkTree },
        { type: tree.CdkTreeNode }
    ]; };
    McTreeNodeToggleComponent.propDecorators = {
        node: [{ type: core.Input }],
        recursive: [{ type: core.Input, args: ['cdkTreeNodeToggleRecursive',] }]
    };
    var McTreeNodeToggleDirective = /** @class */ (function () {
        function McTreeNodeToggleDirective(tree, treeNode) {
            var _this = this;
            this.tree = tree;
            this.treeNode = treeNode;
            this.disabled = false;
            this._recursive = false;
            this.tree.treeControl.filterValue
                .pipe(operators.map(function (value) { return value.length > 0; }))
                .subscribe(function (state) { return _this.disabled = state; });
        }
        Object.defineProperty(McTreeNodeToggleDirective.prototype, "recursive", {
            get: function () {
                return this._recursive;
            },
            set: function (value) {
                this._recursive = value;
            },
            enumerable: false,
            configurable: true
        });
        McTreeNodeToggleDirective.prototype.toggle = function (event) {
            this.recursive
                ? this.tree.treeControl.toggleDescendants(this.treeNode.data)
                : this.tree.treeControl.toggle(this.treeNode.data);
            event.stopPropagation();
        };
        return McTreeNodeToggleDirective;
    }());
    McTreeNodeToggleDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mcTreeNodeToggle]',
                    host: {
                        '[attr.disabled]': 'disabled || null',
                        '(click)': 'toggle($event)'
                    }
                },] }
    ];
    /** @nocollapse */
    McTreeNodeToggleDirective.ctorParameters = function () { return [
        { type: tree.CdkTree },
        { type: tree.CdkTreeNode }
    ]; };
    McTreeNodeToggleDirective.propDecorators = {
        recursive: [{ type: core.Input, args: ['cdkTreeNodeToggleRecursive',] }]
    };

    /**
     * Injection token used to provide the parent component to options.
     */
    var MC_TREE_OPTION_PARENT_COMPONENT = new core.InjectionToken('MC_TREE_OPTION_PARENT_COMPONENT');
    var McTreeOptionChange = /** @class */ (function () {
        function McTreeOptionChange(source, isUserInput) {
            if (isUserInput === void 0) { isUserInput = false; }
            this.source = source;
            this.isUserInput = isUserInput;
        }
        return McTreeOptionChange;
    }());
    var uniqueIdCounter = 0;
    var McTreeOption = /** @class */ (function (_super) {
        __extends(McTreeOption, _super);
        function McTreeOption(elementRef, changeDetectorRef, ngZone, tree) {
            var _this = _super.call(this, elementRef, tree) || this;
            _this.changeDetectorRef = changeDetectorRef;
            _this.ngZone = ngZone;
            _this.tree = tree;
            _this.onFocus = new rxjs.Subject();
            _this.onBlur = new rxjs.Subject();
            _this._disabled = false;
            _this.onSelectionChange = new core.EventEmitter();
            _this._selected = false;
            _this._id = "mc-tree-option-" + uniqueIdCounter++;
            _this.hasFocus = false;
            return _this;
        }
        Object.defineProperty(McTreeOption.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this._value = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeOption.prototype, "disabled", {
            get: function () {
                return this._disabled || (this.tree && this.tree.disabled);
            },
            set: function (value) {
                var newValue = coercion.coerceBooleanProperty(value);
                if (newValue !== this._disabled) {
                    this._disabled = newValue;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeOption.prototype, "showCheckbox", {
            get: function () {
                return this._showCheckbox !== undefined ? this._showCheckbox : this.tree.showCheckbox;
            },
            set: function (value) {
                this._showCheckbox = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeOption.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (value) {
                var isSelected = coercion.coerceBooleanProperty(value);
                if (isSelected !== this._selected) {
                    this.setSelected(isSelected);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeOption.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeOption.prototype, "multiple", {
            get: function () {
                return this.tree.multiple;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeOption.prototype, "viewValue", {
            get: function () {
                // TODO: Add input property alternative for node envs.
                return (this.getHostElement().textContent || '').trim();
            },
            enumerable: false,
            configurable: true
        });
        McTreeOption.prototype.ngAfterContentInit = function () {
            this.value = this.tree.treeControl.getValue(this.data);
        };
        McTreeOption.prototype.toggle = function () {
            this.selected = !this.selected;
        };
        McTreeOption.prototype.setSelected = function (selected) {
            if (this._selected === selected || !this.tree.selectionModel) {
                return;
            }
            this._selected = selected;
            if (selected) {
                this.tree.selectionModel.select(this.data);
            }
            else {
                this.tree.selectionModel.deselect(this.data);
            }
            this.changeDetectorRef.markForCheck();
        };
        McTreeOption.prototype.focus = function (focusOrigin) {
            var _this = this;
            if (focusOrigin === 'program') {
                return;
            }
            if (this.disabled || this.hasFocus) {
                return;
            }
            this.elementRef.nativeElement.focus();
            this.onFocus.next({ option: this });
            Promise.resolve().then(function () {
                _this.hasFocus = true;
                _this.changeDetectorRef.markForCheck();
            });
        };
        McTreeOption.prototype.blur = function () {
            var _this = this;
            // When animations are enabled, Angular may end up removing the option from the DOM a little
            // earlier than usual, causing it to be blurred and throwing off the logic in the tree
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
        McTreeOption.prototype.getHeight = function () {
            var clientRects = this.elementRef.nativeElement.getClientRects();
            if (clientRects.length) {
                return clientRects[0].height;
            }
            return 0;
        };
        McTreeOption.prototype.select = function () {
            if (!this._selected) {
                this._selected = true;
                this.changeDetectorRef.markForCheck();
                this.emitSelectionChangeEvent();
            }
        };
        McTreeOption.prototype.deselect = function () {
            if (this._selected) {
                this._selected = false;
                this.changeDetectorRef.markForCheck();
            }
        };
        McTreeOption.prototype.selectViaInteraction = function ($event) {
            if (!this.disabled) {
                this.changeDetectorRef.markForCheck();
                this.emitSelectionChangeEvent(true);
                var shiftKey = $event ? keycodes.hasModifierKey($event, 'shiftKey') : false;
                var ctrlKey = $event ? keycodes.hasModifierKey($event, 'ctrlKey') : false;
                this.tree.setSelectedOptionsByClick(this, shiftKey, ctrlKey);
            }
        };
        McTreeOption.prototype.emitSelectionChangeEvent = function (isUserInput) {
            if (isUserInput === void 0) { isUserInput = false; }
            this.onSelectionChange.emit(new McTreeOptionChange(this, isUserInput));
        };
        McTreeOption.prototype.getHostElement = function () {
            return this.elementRef.nativeElement;
        };
        McTreeOption.prototype.markForCheck = function () {
            this.changeDetectorRef.markForCheck();
        };
        return McTreeOption;
    }(tree.CdkTreeNode));
    McTreeOption.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-tree-option',
                    exportAs: 'mcTreeOption',
                    template: "<ng-content select=\"[mc-icon]\"></ng-content>\n\n<ng-content select=\"mc-tree-node-toggle\"></ng-content>\n\n<mc-pseudo-checkbox\n    *ngIf=\"showCheckbox\"\n    [state]=\"selected ? 'checked' : 'unchecked'\"\n    [disabled]=\"disabled\">\n</mc-pseudo-checkbox>\n\n<span class=\"mc-option-text mc-no-select\"><ng-content></ng-content></span>\n\n<div class=\"mc-option-overlay\"></div>\n",
                    host: {
                        '[attr.id]': 'id',
                        '[attr.tabindex]': '-1',
                        '[attr.disabled]': 'disabled || null',
                        class: 'mc-tree-option',
                        '[class.mc-selected]': 'selected',
                        '[class.mc-focused]': 'hasFocus',
                        '(focus)': 'focus()',
                        '(blur)': 'blur()',
                        '(click)': 'selectViaInteraction($event)'
                    },
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    providers: [{ provide: tree.CdkTreeNode, useExisting: McTreeOption }]
                },] }
    ];
    /** @nocollapse */
    McTreeOption.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef },
        { type: core.NgZone },
        { type: undefined, decorators: [{ type: core.Inject, args: [MC_TREE_OPTION_PARENT_COMPONENT,] }] }
    ]; };
    McTreeOption.propDecorators = {
        disabled: [{ type: core.Input }],
        showCheckbox: [{ type: core.Input }],
        onSelectionChange: [{ type: core.Output }]
    };

    var MC_SELECTION_TREE_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return McTreeSelection; }),
        multi: true
    };
    var McTreeNavigationChange = /** @class */ (function () {
        function McTreeNavigationChange(source, option) {
            this.source = source;
            this.option = option;
        }
        return McTreeNavigationChange;
    }());
    var McTreeSelectionChange = /** @class */ (function () {
        function McTreeSelectionChange(source, option) {
            this.source = source;
            this.option = option;
        }
        return McTreeSelectionChange;
    }());
    var McTreeSelection = /** @class */ (function (_super) {
        __extends(McTreeSelection, _super);
        function McTreeSelection(elementRef, differs, changeDetectorRef, multiple) {
            var _this = _super.call(this, differs, changeDetectorRef) || this;
            _this.elementRef = elementRef;
            _this.renderedOptions = new core.QueryList();
            _this.resetFocusedItemOnBlur = true;
            _this.navigationChange = new core.EventEmitter();
            _this.selectionChange = new core.EventEmitter();
            _this.multipleMode = null;
            _this.userTabIndex = null;
            _this.sortedNodes = [];
            _this._autoSelect = true;
            _this._noUnselectLast = true;
            _this._disabled = false;
            _this._tabIndex = 0;
            _this.destroy = new rxjs.Subject();
            /** `View -> model callback called when value changes` */
            _this.onChange = function () { };
            /** `View -> model callback called when select has been touched` */
            _this.onTouched = function () { };
            _this.updateRenderedOptions = function () {
                var orderedOptions = [];
                _this.sortedNodes.forEach(function (node) {
                    var found = _this.unorderedOptions.find(function (option) { return option.value === _this.treeControl.getValue(node); });
                    if (found) {
                        orderedOptions.push(found);
                    }
                });
                _this.renderedOptions.reset(orderedOptions);
                _this.renderedOptions.notifyOnChanges();
            };
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
        Object.defineProperty(McTreeSelection.prototype, "autoSelect", {
            get: function () {
                return this._autoSelect;
            },
            set: function (value) {
                this._autoSelect = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeSelection.prototype, "optionFocusChanges", {
            get: function () {
                return rxjs.merge.apply(void 0, __spread(this.renderedOptions.map(function (option) { return option.onFocus; })));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeSelection.prototype, "optionBlurChanges", {
            get: function () {
                return rxjs.merge.apply(void 0, __spread(this.renderedOptions.map(function (option) { return option.onBlur; })));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeSelection.prototype, "multiple", {
            get: function () {
                return !!this.multipleMode;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeSelection.prototype, "noUnselectLast", {
            get: function () {
                return this._noUnselectLast;
            },
            set: function (value) {
                this._noUnselectLast = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeSelection.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (rawValue) {
                var value = coercion.coerceBooleanProperty(rawValue);
                if (this._disabled !== value) {
                    this._disabled = value;
                    this.markOptionsForCheck();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeSelection.prototype, "tabIndex", {
            get: function () {
                return this.disabled ? -1 : this._tabIndex;
            },
            set: function (value) {
                this._tabIndex = value;
                this.userTabIndex = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeSelection.prototype, "showCheckbox", {
            get: function () {
                return this.multipleMode === core$1.MultipleMode.CHECKBOX;
            },
            enumerable: false,
            configurable: true
        });
        McTreeSelection.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.unorderedOptions.changes.subscribe(this.updateRenderedOptions);
            this.keyManager = new a11y.FocusKeyManager(this.renderedOptions)
                .withVerticalOrientation(true)
                .withHorizontalOrientation(null);
            this.keyManager.change
                .pipe(operators.takeUntil(this.destroy))
                .subscribe(function () {
                if (_this.keyManager.activeItem) {
                    _this.emitNavigationEvent(_this.keyManager.activeItem);
                    // todo need check this logic
                    if (_this.autoSelect && !_this.keyManager.activeItem.disabled) {
                        _this.updateOptionsFocus();
                    }
                }
            });
            this.keyManager.tabOut
                .pipe(operators.takeUntil(this.destroy))
                .subscribe(function () { return _this.allowFocusEscape(); });
            this.selectionModel.changed
                .pipe(operators.takeUntil(this.destroy))
                .subscribe(function () {
                _this.onChange(_this.getSelectedValues());
                _this.renderedOptions.notifyOnChanges();
            });
            this.renderedOptions.changes
                .pipe(operators.takeUntil(this.destroy))
                .subscribe(function (options) {
                _this.resetOptions();
                // Check to see if we need to update our tab index
                _this.updateTabIndex();
                // todo need to do optimisation
                options.forEach(function (option) {
                    option.deselect();
                    _this.getSelectedValues().forEach(function (selectedValue) {
                        if (option.value === selectedValue) {
                            option.select();
                        }
                    });
                    option.changeDetectorRef.detectChanges();
                });
            });
        };
        McTreeSelection.prototype.ngOnDestroy = function () {
            this.destroy.next();
            this.destroy.complete();
        };
        McTreeSelection.prototype.focus = function ($event) {
            if (this.renderedOptions.length === 0 || this.isFocusReceivedFromNestedOption($event)) {
                return;
            }
            this.keyManager.setFirstItemActive();
        };
        McTreeSelection.prototype.blur = function () {
            if (!this.hasFocusedOption() && this.resetFocusedItemOnBlur) {
                this.keyManager.setActiveItem(-1);
            }
            this.onTouched();
            this.changeDetectorRef.markForCheck();
        };
        McTreeSelection.prototype.onKeyDown = function (event) {
            this.keyManager.setFocusOrigin('keyboard');
            // tslint:disable-next-line: deprecation
            var keyCode = event.keyCode;
            switch (keyCode) {
                case keycodes.DOWN_ARROW:
                    this.keyManager.setNextItemActive();
                    break;
                case keycodes.UP_ARROW:
                    this.keyManager.setPreviousItemActive();
                    break;
                case keycodes.LEFT_ARROW:
                    if (this.keyManager.activeItem) {
                        this.treeControl.collapse(this.keyManager.activeItem.data);
                    }
                    event.preventDefault();
                    return;
                case keycodes.RIGHT_ARROW:
                    if (this.keyManager.activeItem) {
                        this.treeControl.expand(this.keyManager.activeItem.data);
                    }
                    event.preventDefault();
                    return;
                case keycodes.SPACE:
                case keycodes.ENTER:
                    this.toggleFocusedOption();
                    event.preventDefault();
                    break;
                case keycodes.HOME:
                    this.keyManager.setFirstItemActive();
                    event.preventDefault();
                    break;
                case keycodes.END:
                    this.keyManager.setLastItemActive();
                    event.preventDefault();
                    break;
                case keycodes.PAGE_UP:
                    this.keyManager.setPreviousPageItemActive();
                    event.preventDefault();
                    break;
                case keycodes.PAGE_DOWN:
                    this.keyManager.setNextPageItemActive();
                    event.preventDefault();
                    break;
                default:
                    return;
            }
            if (this.keyManager.activeItem) {
                this.setSelectedOptionsByKey(this.keyManager.activeItem, keycodes.hasModifierKey(event, 'shiftKey'), keycodes.hasModifierKey(event, 'ctrlKey'));
            }
        };
        McTreeSelection.prototype.updateScrollSize = function () {
            if (!this.renderedOptions.first) {
                return;
            }
            this.keyManager.withScrollSize(Math.floor(this.getHeight() / this.renderedOptions.first.getHeight()));
        };
        McTreeSelection.prototype.setSelectedOptionsByKey = function (option, shiftKey, ctrlKey) {
            if (shiftKey && this.multiple) {
                this.setSelectedOptions(option);
            }
            else if (ctrlKey) {
                if (!this.canDeselectLast(option)) {
                    return;
                }
            }
            else if (this.autoSelect) {
                this.selectionModel.clear();
                this.selectionModel.toggle(option.data);
            }
            this.emitChangeEvent(option);
        };
        McTreeSelection.prototype.setSelectedOptionsByClick = function (option, shiftKey, ctrlKey) {
            if (!shiftKey && !ctrlKey) {
                this.keyManager.setActiveItem(option);
            }
            if (shiftKey && this.multiple) {
                this.setSelectedOptions(option);
            }
            else if (ctrlKey) {
                if (!this.canDeselectLast(option)) {
                    return;
                }
                this.selectionModel.toggle(option.data);
            }
            else if (this.autoSelect) {
                this.selectionModel.clear();
                this.selectionModel.toggle(option.data);
            }
            else {
                this.selectionModel.toggle(option.data);
            }
            this.emitChangeEvent(option);
        };
        McTreeSelection.prototype.setSelectedOptions = function (option) {
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
            this.renderedOptions
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
        McTreeSelection.prototype.setFocusedOption = function (option) {
            this.keyManager.setActiveItem(option);
        };
        McTreeSelection.prototype.toggleFocusedOption = function () {
            var focusedOption = this.keyManager.activeItem;
            if (focusedOption && (!focusedOption.selected || this.canDeselectLast(focusedOption))) {
                focusedOption.toggle();
                this.emitChangeEvent(focusedOption);
            }
        };
        McTreeSelection.prototype.renderNodeChanges = function (data, dataDiffer, viewContainer, parentData) {
            if (dataDiffer === void 0) { dataDiffer = this.dataDiffer; }
            if (viewContainer === void 0) { viewContainer = this.nodeOutlet.viewContainer; }
            _super.prototype.renderNodeChanges.call(this, data, dataDiffer, viewContainer, parentData);
            this.sortedNodes = this.getSortedNodes(viewContainer);
            this.updateScrollSize();
            this.nodeOutlet.changeDetectorRef.detectChanges();
        };
        McTreeSelection.prototype.getHeight = function () {
            var clientRects = this.elementRef.nativeElement.getClientRects();
            if (clientRects.length) {
                return clientRects[0].height;
            }
            return 0;
        };
        McTreeSelection.prototype.getItemHeight = function () {
            return this.renderedOptions.first ? this.renderedOptions.first.getHeight() : 0;
        };
        McTreeSelection.prototype.emitNavigationEvent = function (option) {
            this.navigationChange.emit(new McTreeNavigationChange(this, option));
        };
        McTreeSelection.prototype.emitChangeEvent = function (option) {
            this.selectionChange.emit(new McTreeNavigationChange(this, option));
        };
        McTreeSelection.prototype.writeValue = function (value) {
            if (this.multiple && value && !Array.isArray(value)) {
                throw core$1.getMcSelectNonArrayValueError();
            }
            if (this.renderedOptions.length) {
                this.setOptionsFromValues(this.multiple ? value : [value]);
            }
        };
        McTreeSelection.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        McTreeSelection.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        /**
         * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
         */
        McTreeSelection.prototype.setDisabledState = function (isDisabled) {
            this._disabled = isDisabled;
            this.changeDetectorRef.markForCheck();
        };
        McTreeSelection.prototype.setOptionsFromValues = function (values) {
            var _a;
            var _this = this;
            this.selectionModel.clear();
            var valuesToSelect = values.reduce(function (result, value) {
                return _this.treeControl.hasValue(value) ? __spread(result, [_this.treeControl.hasValue(value)]) : __spread(result);
            }, []);
            (_a = this.selectionModel).select.apply(_a, __spread(valuesToSelect));
        };
        McTreeSelection.prototype.getSelectedValues = function () {
            var _this = this;
            return this.selectionModel.selected.map(function (selected) { return _this.treeControl.getValue(selected); });
        };
        McTreeSelection.prototype.updateTabIndex = function () {
            this._tabIndex = this.renderedOptions.length === 0 ? -1 : 0;
        };
        McTreeSelection.prototype.getSortedNodes = function (viewContainer) {
            var array = [];
            for (var i = 0; i < viewContainer.length; i++) {
                var viewRef = viewContainer.get(i);
                array.push(viewRef.context.$implicit);
            }
            return array;
        };
        McTreeSelection.prototype.allowFocusEscape = function () {
            var _this = this;
            if (this._tabIndex !== -1) {
                this._tabIndex = -1;
                setTimeout(function () {
                    _this._tabIndex = _this.userTabIndex || 0;
                    _this.changeDetectorRef.markForCheck();
                });
            }
        };
        McTreeSelection.prototype.resetOptions = function () {
            this.dropSubscriptions();
            this.listenToOptionsFocus();
        };
        McTreeSelection.prototype.dropSubscriptions = function () {
            if (this.optionFocusSubscription) {
                this.optionFocusSubscription.unsubscribe();
                this.optionFocusSubscription = null;
            }
            if (this.optionBlurSubscription) {
                this.optionBlurSubscription.unsubscribe();
                this.optionBlurSubscription = null;
            }
        };
        McTreeSelection.prototype.listenToOptionsFocus = function () {
            var _this = this;
            this.optionFocusSubscription = this.optionFocusChanges
                .subscribe(function (event) {
                var index = _this.renderedOptions.toArray().indexOf(event.option);
                _this.renderedOptions
                    .filter(function (option) { return option.hasFocus; })
                    .forEach(function (option) { return option.hasFocus = false; });
                if (_this.isValidIndex(index)) {
                    _this.keyManager.updateActiveItem(index);
                }
            });
            this.optionBlurSubscription = this.optionBlurChanges
                .subscribe(function () { return _this.blur(); });
        };
        /**
         * Utility to ensure all indexes are valid.
         * @param index The index to be checked.
         * @returns True if the index is valid for our list of options.
         */
        McTreeSelection.prototype.isValidIndex = function (index) {
            return index >= 0 && index < this.renderedOptions.length;
        };
        /** Checks whether any of the options is focused. */
        McTreeSelection.prototype.hasFocusedOption = function () {
            return this.renderedOptions.some(function (option) { return option.hasFocus; });
        };
        McTreeSelection.prototype.markOptionsForCheck = function () {
            if (this.renderedOptions.length) {
                this.renderedOptions.forEach(function (option) { return option.markForCheck(); });
            }
        };
        McTreeSelection.prototype.updateOptionsFocus = function () {
            this.renderedOptions
                .filter(function (option) { return option.hasFocus; })
                .forEach(function (option) { return option.hasFocus = false; });
        };
        McTreeSelection.prototype.canDeselectLast = function (option) {
            return !(this.noUnselectLast && this.selectionModel.selected.length === 1 && option.selected);
        };
        McTreeSelection.prototype.isFocusReceivedFromNestedOption = function ($event) {
            if (!$event || !$event.relatedTarget) {
                return false;
            }
            return $event.relatedTarget.classList.contains('mc-tree-option');
        };
        return McTreeSelection;
    }(tree.CdkTree));
    McTreeSelection.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-tree-selection',
                    exportAs: 'mcTreeSelection',
                    template: '<ng-container cdkTreeNodeOutlet></ng-container>',
                    host: {
                        class: 'mc-tree-selection',
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.disabled]': 'disabled || null',
                        '(blur)': 'blur()',
                        '(focus)': 'focus($event)',
                        '(keydown)': 'onKeyDown($event)',
                        '(window:resize)': 'updateScrollSize()'
                    },
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    providers: [
                        MC_SELECTION_TREE_VALUE_ACCESSOR,
                        { provide: MC_TREE_OPTION_PARENT_COMPONENT, useExisting: McTreeSelection },
                        { provide: tree.CdkTree, useExisting: McTreeSelection }
                    ],
                    styles: [".mc-tree-selection{display:block}.mc-tree-option{display:flex;align-items:center;padding-right:var(--mc-tree-size-padding-right,16px);height:var(--mc-tree-size-node-height,28px);word-wrap:break-word;border:var(--mc-tree-size-border-width,2px) solid transparent}.mc-tree-option>.mc-icon{margin-right:4px;cursor:pointer}.mc-tree-option:focus{outline:none}.mc-tree-option:not([disabled]){cursor:pointer}.mc-tree-option .mc-pseudo-checkbox{margin-right:8px}.mc-tree-node-toggle{margin-right:4px;cursor:pointer}.mc-tree-node-toggle .mc-icon{transform:rotate(-90deg)}.mc-tree-node-toggle.mc-opened .mc-icon{transform:rotate(0)}.mc-tree-node-toggle[disabled]{cursor:default}"]
                },] }
    ];
    /** @nocollapse */
    McTreeSelection.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.IterableDiffers },
        { type: core.ChangeDetectorRef },
        { type: core$1.MultipleMode, decorators: [{ type: core.Attribute, args: ['multiple',] }] }
    ]; };
    McTreeSelection.propDecorators = {
        nodeOutlet: [{ type: core.ViewChild, args: [tree.CdkTreeNodeOutlet, { static: true },] }],
        unorderedOptions: [{ type: core.ContentChildren, args: [McTreeOption,] }],
        treeControl: [{ type: core.Input }],
        navigationChange: [{ type: core.Output }],
        selectionChange: [{ type: core.Output }],
        autoSelect: [{ type: core.Input }],
        noUnselectLast: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        tabIndex: [{ type: core.Input }]
    };

    var MC_TREE_DIRECTIVES = [
        McTreeSelection,
        McTreeOption,
        McTreeNodeDef,
        McTreeNodePadding,
        McTreeNodeToggleComponent,
        McTreeNodeToggleDirective
    ];
    var McTreeModule = /** @class */ (function () {
        function McTreeModule() {
        }
        return McTreeModule;
    }());
    McTreeModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, tree.CdkTreeModule, core$1.McPseudoCheckboxModule],
                    exports: MC_TREE_DIRECTIVES,
                    declarations: MC_TREE_DIRECTIVES
                },] }
    ];

    /**
     * Tree flattener to convert a normal type of node to node with children & level information.
     * Transform nested nodes of type `T` to flattened nodes of type `F`.
     *
     * For example, the input data of type `T` is nested, and contains its children data:
     *   SomeNode: {
     *     key: 'Fruits',
     *     children: [
     *       NodeOne: {
     *         key: 'Apple',
     *       },
     *       NodeTwo: {
     *        key: 'Pear',
     *      }
     *    ]
     *  }
     *  After flattener flatten the tree, the structure will become
     *  SomeNode: {
     *    key: 'Fruits',
     *    expandable: true,
     *    level: 1
     *  },
     *  NodeOne: {
     *    key: 'Apple',
     *    expandable: false,
     *    level: 2
     *  },
     *  NodeTwo: {
     *   key: 'Pear',
     *   expandable: false,
     *   level: 2
     * }
     * and the output flattened type is `F` with additional information.
     */
    var McTreeFlattener = /** @class */ (function () {
        function McTreeFlattener(transformFunction, getLevel, isExpandable, getChildren) {
            this.transformFunction = transformFunction;
            this.getLevel = getLevel;
            this.isExpandable = isExpandable;
            this.getChildren = getChildren;
        }
        McTreeFlattener.prototype.flattenNode = function (node, level, resultNodes, parent) {
            var _this = this;
            var flatNode = this.transformFunction(node, level, parent);
            resultNodes.push(flatNode);
            if (this.isExpandable(flatNode)) {
                var childrenNodes = this.getChildren(node);
                if (childrenNodes) {
                    if (Array.isArray(childrenNodes)) {
                        this.flattenChildren(childrenNodes, level, resultNodes, flatNode);
                    }
                    else {
                        childrenNodes
                            .pipe(operators.take(1))
                            .subscribe(function (children) {
                            _this.flattenChildren(children, level, resultNodes, flatNode);
                        });
                    }
                }
            }
            return resultNodes;
        };
        McTreeFlattener.prototype.flattenChildren = function (children, level, resultNodes, parent) {
            var _this = this;
            children.forEach(function (child) {
                _this.flattenNode(child, level + 1, resultNodes, parent);
            });
        };
        /**
         * Flatten a list of node type T to flattened version of node F.
         * Please note that type T may be nested, and the length of `structuredData` may be different
         * from that of returned list `F[]`.
         */
        McTreeFlattener.prototype.flattenNodes = function (structuredData) {
            var _this = this;
            var resultNodes = [];
            structuredData.forEach(function (node) { return _this.flattenNode(node, 0, resultNodes, null); });
            return resultNodes;
        };
        /**
         * Expand flattened node with current expansion status.
         * The returned list may have different length.
         */
        McTreeFlattener.prototype.expandFlattenedNodes = function (nodes, treeControl) {
            var _this = this;
            var results = [];
            var currentExpand = [];
            currentExpand[0] = true;
            nodes.forEach(function (node) {
                var expand = true;
                for (var i = 0; i <= _this.getLevel(node); i++) {
                    expand = expand && currentExpand[i];
                }
                if (expand) {
                    results.push(node);
                }
                if (_this.isExpandable(node)) {
                    currentExpand[_this.getLevel(node) + 1] = treeControl.isExpanded(node);
                }
            });
            return results;
        };
        return McTreeFlattener;
    }());
    var McTreeDataSourceChangeTypes;
    (function (McTreeDataSourceChangeTypes) {
        McTreeDataSourceChangeTypes["Expansion"] = "expansion";
        McTreeDataSourceChangeTypes["Filter"] = "filter";
    })(McTreeDataSourceChangeTypes || (McTreeDataSourceChangeTypes = {}));
    /**
     * Data source for flat tree.
     * The data source need to handle expansion/collapsion of the tree node and change the data feed
     * to `McTree`.
     * The nested tree nodes of type `T` are flattened through `MсTreeFlattener`, and converted
     * to type `F` for `McTree` to consume.
     */
    var McTreeFlatDataSource = /** @class */ (function (_super) {
        __extends(McTreeFlatDataSource, _super);
        function McTreeFlatDataSource(treeControl, treeFlattener, initialData) {
            if (initialData === void 0) { initialData = []; }
            var _this = _super.call(this) || this;
            _this.treeControl = treeControl;
            _this.treeFlattener = treeFlattener;
            _this.flattenedData = new rxjs.BehaviorSubject([]);
            _this.expandedData = new rxjs.BehaviorSubject([]);
            _this.filteredData = new rxjs.BehaviorSubject([]);
            _this._data = new rxjs.BehaviorSubject(initialData);
            return _this;
        }
        Object.defineProperty(McTreeFlatDataSource.prototype, "data", {
            get: function () {
                return this._data.value;
            },
            set: function (value) {
                this._data.next(value);
                this.flattenedData.next(this.treeFlattener.flattenNodes(this.data));
                this.treeControl.dataNodes = this.flattenedData.value;
            },
            enumerable: false,
            configurable: true
        });
        McTreeFlatDataSource.prototype.connect = function (collectionViewer) {
            var _this = this;
            return rxjs.merge(collectionViewer.viewChange, this.treeControl.expansionModel.changed
                .pipe(operators.map(function (value) { return ({ type: McTreeDataSourceChangeTypes.Expansion, value: value }); })), this.treeControl.filterValue
                .pipe(operators.map(function (value) { return ({ type: McTreeDataSourceChangeTypes.Filter, value: value }); })), this.flattenedData)
                .pipe(operators.map(function (changeObj) {
                if (changeObj.type === McTreeDataSourceChangeTypes.Filter) {
                    if (changeObj.value && changeObj.value.length > 0) {
                        return _this.filterHandler();
                    }
                    else {
                        return _this.expansionHandler();
                    }
                }
                return _this.expansionHandler();
            }));
        };
        McTreeFlatDataSource.prototype.filterHandler = function () {
            this.filteredData.next(this.treeControl.filterModel.selected);
            return this.filteredData.value;
        };
        McTreeFlatDataSource.prototype.expansionHandler = function () {
            var expandedNodes = this.treeFlattener.expandFlattenedNodes(this.flattenedData.value, this.treeControl);
            this.expandedData.next(expandedNodes);
            return this.expandedData.value;
        };
        McTreeFlatDataSource.prototype.disconnect = function () {
            // no op
        };
        return McTreeFlatDataSource;
    }(collections.DataSource));

    /**
     * Data source for nested tree.
     *
     * The data source for nested tree doesn't have to consider node flattener, or the way to expand
     * or collapse. The expansion/collapsion will be handled by TreeControl and each non-leaf node.
     */
    var McTreeNestedDataSource = /** @class */ (function (_super) {
        __extends(McTreeNestedDataSource, _super);
        function McTreeNestedDataSource() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            /* tslint:disable-next-line:naming-convention */
            _this._data = new rxjs.BehaviorSubject([]);
            return _this;
        }
        Object.defineProperty(McTreeNestedDataSource.prototype, "data", {
            get: function () {
                return this._data.value;
            },
            set: function (value) {
                this._data.next(value);
            },
            enumerable: false,
            configurable: true
        });
        McTreeNestedDataSource.prototype.connect = function (collectionViewer) {
            var _this = this;
            return rxjs.merge.apply(void 0, __spread([collectionViewer.viewChange, this._data])).pipe(operators.map(function () { return _this.data; }));
        };
        McTreeNestedDataSource.prototype.disconnect = function () {
            // no op
        };
        return McTreeNestedDataSource;
    }(collections.DataSource));

    /**
     * Generated bundle index. Do not edit.
     */

    exports.MC_SELECTION_TREE_VALUE_ACCESSOR = MC_SELECTION_TREE_VALUE_ACCESSOR;
    exports.MC_TREE_OPTION_PARENT_COMPONENT = MC_TREE_OPTION_PARENT_COMPONENT;
    exports.McTreeFlatDataSource = McTreeFlatDataSource;
    exports.McTreeFlattener = McTreeFlattener;
    exports.McTreeModule = McTreeModule;
    exports.McTreeNavigationChange = McTreeNavigationChange;
    exports.McTreeNestedDataSource = McTreeNestedDataSource;
    exports.McTreeNodeDef = McTreeNodeDef;
    exports.McTreeNodePadding = McTreeNodePadding;
    exports.McTreeNodeToggleComponent = McTreeNodeToggleComponent;
    exports.McTreeNodeToggleDirective = McTreeNodeToggleDirective;
    exports.McTreeOption = McTreeOption;
    exports.McTreeOptionChange = McTreeOptionChange;
    exports.McTreeSelection = McTreeSelection;
    exports.McTreeSelectionChange = McTreeSelectionChange;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-tree.umd.js.map
