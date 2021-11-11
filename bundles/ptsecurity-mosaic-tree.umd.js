(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/core'), require('@angular/cdk/coercion'), require('@ptsecurity/mosaic/design-tokens'), require('rxjs'), require('rxjs/operators'), require('@angular/cdk/bidi'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/mosaic/dropdown'), require('@ptsecurity/mosaic/tooltip'), require('@angular/cdk/collections'), require('@angular/forms'), require('@ptsecurity/cdk/a11y'), require('@angular/cdk/clipboard')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/tree', ['exports', '@angular/common', '@angular/core', '@ptsecurity/mosaic/core', '@angular/cdk/coercion', '@ptsecurity/mosaic/design-tokens', 'rxjs', 'rxjs/operators', '@angular/cdk/bidi', '@ptsecurity/cdk/keycodes', '@ptsecurity/mosaic/dropdown', '@ptsecurity/mosaic/tooltip', '@angular/cdk/collections', '@angular/forms', '@ptsecurity/cdk/a11y', '@angular/cdk/clipboard'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.tree = {}), global.ng.common, global.ng.core, global.ptsecurity.mosaic.core, global.ng.cdk.coercion, global.ptsecurity.mosaic['design-tokens'], global.rxjs, global.rxjs.operators, global.ng.cdk.bidi, global.mc.cdk.keycodes, global.ptsecurity.mosaic.dropdown, global.ptsecurity.mosaic.tooltip, global.ng.cdk.collections, global.ng.forms, global.mc.cdk.a11y, global.ng.cdk.clipboard));
}(this, (function (exports, i2$1, i0, i1, coercion, designTokens, rxjs, operators, i2, keycodes, dropdown, tooltip, collections, forms, a11y, i1$1) { 'use strict';

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

    var i2__namespace$1 = /*#__PURE__*/_interopNamespace(i2$1);
    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);

    /** Context provided to the tree node component. */
    var McTreeNodeOutletContext = /** @class */ (function () {
        function McTreeNodeOutletContext(data) {
            this.$implicit = data;
        }
        return McTreeNodeOutletContext;
    }());
    /**
     * Data node definition for the McTree.
     * Captures the node's template and a when predicate that describes when this node should be used.
     */
    var McTreeNodeDef = /** @class */ (function () {
        /** @docs-private */
        function McTreeNodeDef(template) {
            this.template = template;
        }
        return McTreeNodeDef;
    }());
    /** @nocollapse */ McTreeNodeDef.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTreeNodeDef, deps: [{ token: i0__namespace.TemplateRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McTreeNodeDef.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTreeNodeDef, selector: "[mcTreeNodeDef]", inputs: { when: ["mcTreeNodeDefWhen", "when"], data: ["mcTreeNode", "data"] }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTreeNodeDef, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[mcTreeNodeDef]',
                        inputs: ['when: mcTreeNodeDefWhen']
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }]; }, propDecorators: { data: [{
                    type: i0.Input,
                    args: ['mcTreeNode']
                }] } });

    var McTreeNodeOutlet = /** @class */ (function () {
        function McTreeNodeOutlet(viewContainer, changeDetectorRef) {
            this.viewContainer = viewContainer;
            this.changeDetectorRef = changeDetectorRef;
        }
        return McTreeNodeOutlet;
    }());
    /** @nocollapse */ McTreeNodeOutlet.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTreeNodeOutlet, deps: [{ token: i0__namespace.ViewContainerRef }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McTreeNodeOutlet.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTreeNodeOutlet, selector: "[mcTreeNodeOutlet]", ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTreeNodeOutlet, decorators: [{
                type: i0.Directive,
                args: [{ selector: '[mcTreeNodeOutlet]' }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ViewContainerRef }, { type: i0__namespace.ChangeDetectorRef }]; } });

    /**
     * Returns an error to be thrown when there is no usable data.
     * @docs-private
     */
    function getTreeNoValidDataSourceError() {
        return Error("A valid data source must be provided.");
    }
    /**
     * Returns an error to be thrown when there are multiple nodes that are missing a when function.
     * @docs-private
     */
    function getTreeMultipleDefaultNodeDefsError() {
        return Error("There can only be one default row without a when predicate function.");
    }
    /**
     * Returns an error to be thrown when there are no matching node defs for a particular set of data.
     * @docs-private
     */
    function getTreeMissingMatchingNodeDefError() {
        return Error("Could not find a matching node definition for the provided node data.");
    }
    /**
     * Returns an error to be thrown when there are tree control.
     * @docs-private
     */
    function getTreeControlMissingError() {
        return Error("Could not find a tree control for the tree.");
    }
    /**
     * Returns an error to be thrown when tree control did not implement functions for flat/nested node.
     * @docs-private
     */
    function getTreeControlFunctionsMissingError() {
        return Error("Could not find functions for nested/flat tree in tree control.");
    }

    var McTreeBase = /** @class */ (function () {
        function McTreeBase(differs, changeDetectorRef) {
            this.differs = differs;
            this.changeDetectorRef = changeDetectorRef;
            // TODO(tinayuangao): Setup a listener for scrolling, emit the calculated view to viewChange.
            //     Remove the MAX_VALUE in viewChange
            /**
             * Stream containing the latest information on what rows are being displayed on screen.
             * Can be used by the data source to as a heuristic of what data should be provided.
             */
            this.viewChange = new rxjs.BehaviorSubject({ start: 0, end: Number.MAX_VALUE });
            /** Subject that emits when the component has been destroyed. */
            this.onDestroy = new rxjs.Subject();
            /** Level of nodes */
            this.levels = new Map();
        }
        Object.defineProperty(McTreeBase.prototype, "dataSource", {
            /**
             * Provides a stream containing the latest data array to render. Influenced by the tree's
             * stream of view window (what dataNodes are currently on screen).
             * Data source can be an observable of data array, or a dara array to render.
             */
            get: function () {
                return this._dataSource;
            },
            set: function (dataSource) {
                if (this._dataSource !== dataSource) {
                    this.switchDataSource(dataSource);
                }
            },
            enumerable: false,
            configurable: true
        });
        McTreeBase.prototype.ngOnInit = function () {
            this.dataDiffer = this.differs.find([]).create(this.trackBy);
            if (!this.treeControl) {
                throw getTreeControlMissingError();
            }
        };
        McTreeBase.prototype.ngOnDestroy = function () {
            this.nodeOutlet.viewContainer.clear();
            this.onDestroy.next();
            this.onDestroy.complete();
            // tslint:disable-next-line:no-unbound-method
            if (this._dataSource && typeof this.dataSource.disconnect === 'function') {
                this.dataSource.disconnect(this);
            }
            if (this.dataSubscription) {
                this.dataSubscription.unsubscribe();
                this.dataSubscription = null;
            }
        };
        McTreeBase.prototype.ngAfterContentChecked = function () {
            var defaultNodeDefs = this.nodeDefs.filter(function (def) { return !def.when; });
            if (defaultNodeDefs.length > 1) {
                throw getTreeMultipleDefaultNodeDefsError();
            }
            this.defaultNodeDef = defaultNodeDefs[0];
            if (this.dataSource && this.nodeDefs && !this.dataSubscription) {
                this.observeRenderChanges();
            }
        };
        /** Check for changes made in the data and render each change (node added/removed/moved). */
        McTreeBase.prototype.renderNodeChanges = function (data, dataDiffer, viewContainer, parentData) {
            var _this = this;
            if (dataDiffer === void 0) { dataDiffer = this.dataDiffer; }
            if (viewContainer === void 0) { viewContainer = this.nodeOutlet.viewContainer; }
            var changes = dataDiffer.diff(data);
            if (!changes) {
                return;
            }
            changes.forEachOperation(function (item, adjustedPreviousIndex, currentIndex) {
                if (item.previousIndex == null) {
                    _this.insertNode(data[currentIndex], currentIndex, viewContainer, parentData);
                }
                else if (currentIndex == null) {
                    viewContainer.remove(adjustedPreviousIndex);
                    _this.levels.delete(item.item);
                }
                else {
                    var view = viewContainer.get(adjustedPreviousIndex);
                    viewContainer.move(view, currentIndex);
                }
            });
            this.changeDetectorRef.detectChanges();
        };
        /**
         * Finds the matching node definition that should be used for this node data. If there is only
         * one node definition, it is returned. Otherwise, find the node definition that has a when
         * predicate that returns true with the data. If none return true, return the default node
         * definition.
         */
        McTreeBase.prototype.getNodeDef = function (data, i) {
            if (this.nodeDefs.length === 1) {
                return this.nodeDefs.first;
            }
            var nodeDef = this.nodeDefs.find(function (def) { return def.when && def.when(i, data); }) || this.defaultNodeDef;
            if (!nodeDef) {
                throw getTreeMissingMatchingNodeDefError();
            }
            return nodeDef;
        };
        /**
         * Create the embedded view for the data node template and place it in the correct index location
         * within the data node view container.
         */
        McTreeBase.prototype.insertNode = function (nodeData, index, viewContainer, parentData) {
            var node = this.getNodeDef(nodeData, index);
            // Node context that will be provided to created embedded view
            var context = new McTreeNodeOutletContext(nodeData);
            // If the tree is flat tree, then use the `getLevel` function in flat tree control
            // Otherwise, use the level of parent node.
            if (this.treeControl.getLevel) {
                context.level = this.treeControl.getLevel(nodeData);
                /* tslint:disable-next-line:no-typeof-undefined */
            }
            else if (typeof parentData !== 'undefined' && this.levels.has(parentData)) {
                context.level = this.levels.get(parentData) + 1;
            }
            else {
                context.level = 0;
            }
            this.levels.set(nodeData, context.level);
            // Use default tree nodeOutlet, or nested node's nodeOutlet
            var container = viewContainer ? viewContainer : this.nodeOutlet.viewContainer;
            container.createEmbeddedView(node.template, context, index);
            // Set the data to just created `McTreeNode`.
            // The `McTreeNode` created from `createEmbeddedView` will be saved in static variable
            //     `mostRecentTreeNode`. We get it from static variable and pass the node data to it.
            if (McTreeNode.mostRecentTreeNode) {
                McTreeNode.mostRecentTreeNode.data = nodeData;
            }
        };
        /** Set up a subscription for the data provided by the data source. */
        McTreeBase.prototype.observeRenderChanges = function () {
            var _this = this;
            var dataStream;
            // Cannot use `instanceof DataSource` since the data source could be a literal with
            // `connect` function and may not extends DataSource.
            // tslint:disable-next-line:no-unbound-method
            if (typeof this._dataSource.connect === 'function') {
                dataStream = this._dataSource.connect(this);
            }
            else if (this._dataSource instanceof rxjs.Observable) {
                dataStream = this._dataSource;
            }
            else if (Array.isArray(this._dataSource)) {
                dataStream = rxjs.of(this._dataSource);
            }
            if (dataStream) {
                this.dataSubscription = dataStream
                    .pipe(operators.takeUntil(this.onDestroy))
                    .subscribe(function (data) { return _this.renderNodeChanges(data); });
            }
            else {
                throw getTreeNoValidDataSourceError();
            }
        };
        /**
         * Switch to the provided data source by resetting the data and unsubscribing from the current
         * render change subscription if one exists. If the data source is null, interpret this by
         * clearing the node outlet. Otherwise start listening for new data.
         */
        McTreeBase.prototype.switchDataSource = function (dataSource) {
            // tslint:disable-next-line:no-unbound-method
            if (this._dataSource && typeof this._dataSource.disconnect === 'function') {
                this.dataSource.disconnect(this);
            }
            if (this.dataSubscription) {
                this.dataSubscription.unsubscribe();
                this.dataSubscription = null;
            }
            // Remove the all dataNodes if there is now no data source
            if (!dataSource) {
                this.nodeOutlet.viewContainer.clear();
            }
            this._dataSource = dataSource;
            if (this.nodeDefs) {
                this.observeRenderChanges();
            }
        };
        return McTreeBase;
    }());
    /** @nocollapse */ McTreeBase.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTreeBase, deps: [{ token: i0__namespace.IterableDiffers }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McTreeBase.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTreeBase, inputs: { treeControl: "treeControl", trackBy: "trackBy", dataSource: "dataSource" }, queries: [{ propertyName: "nodeDefs", predicate: McTreeNodeDef }], viewQueries: [{ propertyName: "nodeOutlet", first: true, predicate: McTreeNodeOutlet, descendants: true, static: true }], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTreeBase, decorators: [{
                type: i0.Directive
            }], ctorParameters: function () { return [{ type: i0__namespace.IterableDiffers }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { treeControl: [{
                    type: i0.Input
                }], trackBy: [{
                    type: i0.Input
                }], nodeOutlet: [{
                    type: i0.ViewChild,
                    args: [McTreeNodeOutlet, { static: true }]
                }], nodeDefs: [{
                    type: i0.ContentChildren,
                    args: [McTreeNodeDef]
                }], dataSource: [{
                    type: i0.Input
                }] } });
    var McTreeNode = /** @class */ (function () {
        function McTreeNode(elementRef, tree) {
            this.elementRef = elementRef;
            this.tree = tree;
            this.destroyed = new rxjs.Subject();
            McTreeNode.mostRecentTreeNode = this;
        }
        Object.defineProperty(McTreeNode.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeNode.prototype, "isExpanded", {
            get: function () {
                return this.tree.treeControl.isExpanded(this.data);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeNode.prototype, "level", {
            get: function () {
                return this.tree.treeControl.getLevel ? this.tree.treeControl.getLevel(this._data) : 0;
            },
            enumerable: false,
            configurable: true
        });
        McTreeNode.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        McTreeNode.prototype.focus = function () {
            this.elementRef.nativeElement.focus();
        };
        return McTreeNode;
    }());
    /**
     * The most recently created `McTreeNode`. We save it in static variable so we can retrieve it
     * in `McTree` and set the data to it.
     */
    McTreeNode.mostRecentTreeNode = null;
    /** @nocollapse */ McTreeNode.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTreeNode, deps: [{ token: i0__namespace.ElementRef }, { token: i0.forwardRef(function () { return McTreeBase; }) }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McTreeNode.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTreeNode, selector: "mc-tree-node", exportAs: ["mcTreeNode"], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTreeNode, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: 'mc-tree-node',
                        exportAs: 'mcTreeNode'
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ElementRef }, { type: McTreeBase, decorators: [{
                            type: i0.Inject,
                            args: [i0.forwardRef(function () { return McTreeBase; })]
                        }] }];
        } });

    /** Regex used to split a string on its CSS units. */
    var cssUnitPattern = /([A-Za-z%]+)$/;
    var McTreeNodePadding = /** @class */ (function () {
        function McTreeNodePadding(treeNode, tree, renderer, element, dir) {
            var _this = this;
            var _a, _b;
            this.treeNode = treeNode;
            this.tree = tree;
            this.renderer = renderer;
            this.element = element;
            this.dir = dir;
            this._indent = 20;
            /** CSS units used for the indentation value. */
            this.indentUnits = 'px';
            this.baseLeftPadding = parseInt(designTokens.TreeSizePaddingLeft);
            this.iconWidth = 24;
            this.destroyed = new rxjs.Subject();
            (_b = (_a = this.dir) === null || _a === void 0 ? void 0 : _a.change) === null || _b === void 0 ? void 0 : _b.pipe(operators.takeUntil(this.destroyed)).subscribe(function () { return _this.setPadding(); });
        }
        Object.defineProperty(McTreeNodePadding.prototype, "level", {
            get: function () {
                return this._level;
            },
            set: function (value) {
                this.setLevelInput(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeNodePadding.prototype, "indent", {
            get: function () {
                return this._indent;
            },
            set: function (indent) {
                this.setIndentInput(indent);
            },
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
        McTreeNodePadding.prototype.ngOnInit = function () {
            this.withIcon = this.tree.treeControl.isExpandable(this.treeNode.data);
            this.setPadding();
        };
        McTreeNodePadding.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        McTreeNodePadding.prototype.paddingIndent = function () {
            var nodeLevel = (this.treeNode.data && this.tree.treeControl.getLevel)
                ? this.tree.treeControl.getLevel(this.treeNode.data)
                : 0;
            var level = this.level || nodeLevel;
            return level > 0 ? (level * this._indent) + this.leftPadding + "px" : this.leftPadding + "px";
        };
        /**
         * This has been extracted to a util because of TS 4 and VE.
         * View Engine doesn't support property rename inheritance.
         * TS 4.0 doesn't allow properties to override accessors or vice-versa.
         * @docs-private
         */
        McTreeNodePadding.prototype.setLevelInput = function (value) {
            // Set to null as the fallback value so that _setPadding can fall back to the node level if the
            // consumer set the directive as `mcTreeNodePadding=""`. We still want to take this value if
            // they set 0 explicitly.
            this._level = coercion.coerceNumberProperty(value, null);
            this.setPadding();
        };
        /**
         * This has been extracted to a util because of TS 4 and VE.
         * View Engine doesn't support property rename inheritance.
         * TS 4.0 doesn't allow properties to override accessors or vice-versa.
         * @docs-private
         */
        McTreeNodePadding.prototype.setIndentInput = function (indent) {
            var value = indent;
            var units = 'px';
            if (typeof indent === 'string') {
                var parts = indent.split(cssUnitPattern);
                value = parts[0];
                units = parts[1] || units;
            }
            this.indentUnits = units;
            this._indent = coercion.coerceNumberProperty(value);
            this.setPadding();
        };
        McTreeNodePadding.prototype.setPadding = function () {
            var _a;
            var padding = this.paddingIndent();
            var paddingProp = ((_a = this.dir) === null || _a === void 0 ? void 0 : _a.value) === 'rtl' ? 'paddingRight' : 'paddingLeft';
            this.renderer.setStyle(this.element.nativeElement, paddingProp, padding);
        };
        return McTreeNodePadding;
    }());
    /** @nocollapse */ McTreeNodePadding.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTreeNodePadding, deps: [{ token: McTreeNode }, { token: McTreeBase }, { token: i0__namespace.Renderer2 }, { token: i0__namespace.ElementRef }, { token: i2__namespace.Directionality, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McTreeNodePadding.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTreeNodePadding, selector: "[mcTreeNodePadding]", inputs: { indent: ["mcTreeNodePaddingIndent", "indent"] }, exportAs: ["mcTreeNodePadding"], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTreeNodePadding, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[mcTreeNodePadding]',
                        exportAs: 'mcTreeNodePadding'
                    }]
            }], ctorParameters: function () {
            return [{ type: McTreeNode }, { type: McTreeBase }, { type: i0__namespace.Renderer2 }, { type: i0__namespace.ElementRef }, { type: i2__namespace.Directionality, decorators: [{
                            type: i0.Optional
                        }] }];
        }, propDecorators: { indent: [{
                    type: i0.Input,
                    args: ['mcTreeNodePaddingIndent']
                }] } });

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

    var McTreeNodeToggleBase = /** @class */ (function () {
        function McTreeNodeToggleBase() {
        }
        return McTreeNodeToggleBase;
    }());
    // tslint:disable-next-line:naming-convention
    var McTreeNodeToggleMixinBase = i1.mixinDisabled(McTreeNodeToggleBase);
    /** @docs-private */
    var McTreeNodeToggleBaseDirective = /** @class */ (function (_super) {
        __extends(McTreeNodeToggleBaseDirective, _super);
        function McTreeNodeToggleBaseDirective(tree, treeNode) {
            var _this = _super.call(this) || this;
            _this.tree = tree;
            _this.treeNode = treeNode;
            _this._recursive = false;
            _this.tree.treeControl.filterValue
                .pipe(operators.map(function (value) { return (value === null || value === void 0 ? void 0 : value.length) > 0; }))
                .subscribe(function (state) { return _this.disabled = state; });
            return _this;
        }
        Object.defineProperty(McTreeNodeToggleBaseDirective.prototype, "recursive", {
            get: function () {
                return this._recursive;
            },
            set: function (value) {
                this._recursive = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeNodeToggleBaseDirective.prototype, "iconState", {
            get: function () {
                return this.tree.treeControl.isExpanded(this.node);
            },
            enumerable: false,
            configurable: true
        });
        McTreeNodeToggleBaseDirective.prototype.toggle = function (event) {
            if (this.disabled) {
                return;
            }
            this.recursive
                ? this.tree.treeControl.toggleDescendants(this.treeNode.data)
                : this.tree.treeControl.toggle(this.treeNode.data);
            event.stopPropagation();
        };
        return McTreeNodeToggleBaseDirective;
    }(McTreeNodeToggleMixinBase));
    /** @nocollapse */ McTreeNodeToggleBaseDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTreeNodeToggleBaseDirective, deps: [{ token: McTreeBase }, { token: McTreeNode }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McTreeNodeToggleBaseDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTreeNodeToggleBaseDirective, inputs: { node: "node", recursive: ["mcTreeNodeToggleRecursive", "recursive"] }, usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTreeNodeToggleBaseDirective, decorators: [{
                type: i0.Directive
            }], ctorParameters: function () { return [{ type: McTreeBase }, { type: McTreeNode }]; }, propDecorators: { node: [{
                    type: i0.Input
                }], recursive: [{
                    type: i0.Input,
                    args: ['mcTreeNodeToggleRecursive']
                }] } });
    var McTreeNodeToggleComponent = /** @class */ (function (_super) {
        __extends(McTreeNodeToggleComponent, _super);
        function McTreeNodeToggleComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return McTreeNodeToggleComponent;
    }(McTreeNodeToggleBaseDirective));
    /** @nocollapse */ McTreeNodeToggleComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTreeNodeToggleComponent, deps: null, target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McTreeNodeToggleComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McTreeNodeToggleComponent, selector: "mc-tree-node-toggle", inputs: { disabled: "disabled" }, host: { listeners: { "click": "toggle($event)" }, properties: { "class.mc-opened": "iconState", "attr.disabled": "disabled || null" }, classAttribute: "mc-tree-node-toggle" }, exportAs: ["mcTreeNodeToggle"], usesInheritance: true, ngImport: i0__namespace, template: "<i class=\"mc mc-icon mc-angle-down-S_16\"></i>", isInline: true, styles: [".mc-tree-node-toggle{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:24px;height:100%;cursor:pointer}.mc-tree-node-toggle .mc-icon{transform:rotate(-90deg)}.mc-tree-node-toggle.mc-opened .mc-icon{transform:rotate(0)}.mc-tree-node-toggle[disabled]{cursor:default}\n"], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTreeNodeToggleComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-tree-node-toggle',
                        exportAs: 'mcTreeNodeToggle',
                        template: "<i class=\"mc mc-icon mc-angle-down-S_16\"></i>",
                        styleUrls: ['./toggle.scss'],
                        host: {
                            class: 'mc-tree-node-toggle',
                            '[class.mc-opened]': 'iconState',
                            '[attr.disabled]': 'disabled || null',
                            '(click)': 'toggle($event)'
                        },
                        inputs: ['disabled'],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }] });
    var McTreeNodeToggleDirective = /** @class */ (function (_super) {
        __extends(McTreeNodeToggleDirective, _super);
        function McTreeNodeToggleDirective() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return McTreeNodeToggleDirective;
    }(McTreeNodeToggleBaseDirective));
    /** @nocollapse */ McTreeNodeToggleDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTreeNodeToggleDirective, deps: null, target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McTreeNodeToggleDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTreeNodeToggleDirective, selector: "[mcTreeNodeToggle]", host: { listeners: { "click": "toggle($event)" }, properties: { "attr.disabled": "disabled || null" } }, exportAs: ["mcTreeNodeToggle"], usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTreeNodeToggleDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[mcTreeNodeToggle]',
                        exportAs: 'mcTreeNodeToggle',
                        host: {
                            '[attr.disabled]': 'disabled || null',
                            '(click)': 'toggle($event)'
                        }
                    }]
            }] });

    var McTree = /** @class */ (function (_super) {
        __extends(McTree, _super);
        function McTree() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return McTree;
    }(McTreeBase));
    /** @nocollapse */ McTree.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTree, deps: null, target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McTree.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McTree, selector: "mc-tree", host: { classAttribute: "mc-tree" }, exportAs: ["mcTree"], usesInheritance: true, ngImport: i0__namespace, template: "<ng-container mcTreeNodeOutlet></ng-container>", isInline: true, styles: [".mc-tree{display:block}\n"], directives: [{ type: McTreeNodeOutlet, selector: "[mcTreeNodeOutlet]" }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTree, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-tree',
                        exportAs: 'mcTree',
                        template: "<ng-container mcTreeNodeOutlet></ng-container>",
                        styleUrls: ['./tree.scss'],
                        host: {
                            class: 'mc-tree'
                        },
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }] });

    /**
     * Injection token used to provide the parent component to options.
     */
    var MC_TREE_OPTION_PARENT_COMPONENT = new i0.InjectionToken('MC_TREE_OPTION_PARENT_COMPONENT');
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
            _this.onSelectionChange = new i0.EventEmitter();
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
                return this._disabled || this.tree.disabled;
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
        Object.defineProperty(McTreeOption.prototype, "viewValue", {
            get: function () {
                // TODO: Add input property alternative for node envs.
                return (this.getHostElement().textContent || '').trim();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeOption.prototype, "isExpandable", {
            get: function () {
                var _a;
                return !((_a = this.toggleElement) === null || _a === void 0 ? void 0 : _a.disabled) && this.tree.treeControl.isExpandable(this.data);
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
            var _a;
            if (focusOrigin === 'program') {
                return;
            }
            if (this.disabled || this.hasFocus || ((_a = this.actionButton) === null || _a === void 0 ? void 0 : _a.hasFocus)) {
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
                    var _a;
                    _this.hasFocus = false;
                    if ((_a = _this.actionButton) === null || _a === void 0 ? void 0 : _a.hasFocus) {
                        return;
                    }
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
            if (this._selected) {
                return;
            }
            this._selected = true;
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent();
        };
        McTreeOption.prototype.deselect = function () {
            if (!this._selected) {
                return;
            }
            this._selected = false;
            this.changeDetectorRef.markForCheck();
        };
        McTreeOption.prototype.onKeydown = function ($event) {
            if (!this.actionButton) {
                return;
            }
            if ($event.keyCode === keycodes.TAB && !$event.shiftKey && !this.actionButton.hasFocus) {
                this.actionButton.focus();
                $event.preventDefault();
            }
        };
        McTreeOption.prototype.selectViaInteraction = function ($event) {
            if (this.disabled) {
                return;
            }
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent(true);
            var shiftKey = $event ? keycodes.hasModifierKey($event, 'shiftKey') : false;
            var ctrlKey = $event ? keycodes.hasModifierKey($event, 'ctrlKey') : false;
            this.tree.setSelectedOptionsByClick(this, shiftKey, ctrlKey);
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
    }(McTreeNode));
    /** @nocollapse */ McTreeOption.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTreeOption, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.ChangeDetectorRef }, { token: i0__namespace.NgZone }, { token: MC_TREE_OPTION_PARENT_COMPONENT }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McTreeOption.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McTreeOption, selector: "mc-tree-option", inputs: { disabled: "disabled", showCheckbox: "showCheckbox" }, outputs: { onSelectionChange: "onSelectionChange" }, host: { listeners: { "focusin": "focus()", "blur": "blur()", "click": "selectViaInteraction($event)", "keydown": "onKeydown($event)" }, properties: { "class.mc-selected": "selected", "class.mc-focused": "hasFocus", "class.mc-action-button-focused": "actionButton?.active", "attr.id": "id", "attr.tabindex": "-1", "attr.disabled": "disabled || null" }, classAttribute: "mc-tree-option" }, providers: [
            { provide: McTreeNode, useExisting: McTreeOption },
            { provide: i1.MC_OPTION_ACTION_PARENT, useExisting: McTreeOption }
        ], queries: [{ propertyName: "toggleElement", first: true, predicate: ["mcTreeNodeToggle"], descendants: true }, { propertyName: "actionButton", first: true, predicate: i1.McOptionActionComponent, descendants: true }, { propertyName: "tooltipTrigger", first: true, predicate: tooltip.McTooltipTrigger, descendants: true }, { propertyName: "dropdownTrigger", first: true, predicate: dropdown.McDropdownTrigger, descendants: true }], exportAs: ["mcTreeOption"], usesInheritance: true, ngImport: i0__namespace, template: "<ng-content select=\"mc-tree-node-toggle\"></ng-content>\n\n<mc-pseudo-checkbox\n    *ngIf=\"showCheckbox\"\n    [state]=\"selected ? 'checked' : 'unchecked'\"\n    [disabled]=\"disabled\">\n</mc-pseudo-checkbox>\n\n<ng-content select=\"mc-checkbox\"></ng-content>\n\n<ng-content select=\"[mc-icon]\"></ng-content>\n\n<span class=\"mc-option-text mc-no-select\"><ng-content></ng-content></span>\n\n<ng-content select=\"mc-option-action\"></ng-content>\n\n<div class=\"mc-option-overlay\"></div>\n", styles: [".mc-tree-option{box-sizing:border-box;display:flex;align-items:center;height:32px;height:var(--mc-tree-size-node-height, 32px);word-wrap:break-word;border:2px solid transparent}.mc-tree-option .mc-option-text{display:inline-block;flex-grow:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin-right:16px;margin-right:var(--mc-tree-size-padding-right, 16px)}.mc-tree-option>.mc-icon{margin-right:8px;cursor:pointer}.mc-tree-option:focus{outline:none}.mc-tree-option:not([disabled]){cursor:pointer}.mc-tree-option>.mc-pseudo-checkbox,.mc-tree-option>.mc-checkbox{margin-right:8px}.mc-tree-option .mc-option-action{display:none}.mc-tree-option:not([disabled]):hover .mc-option-action,.mc-tree-option:not([disabled]).mc-focused .mc-option-action,.mc-tree-option:not([disabled]).mc-action-button-focused .mc-option-action{display:flex}\n"], components: [{ type: i1__namespace.McPseudoCheckbox, selector: "mc-pseudo-checkbox", inputs: ["state", "disabled"] }], directives: [{ type: i2__namespace$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTreeOption, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-tree-option',
                        exportAs: 'mcTreeOption',
                        templateUrl: './tree-option.html',
                        styleUrls: ['./tree-option.scss'],
                        host: {
                            class: 'mc-tree-option',
                            '[class.mc-selected]': 'selected',
                            '[class.mc-focused]': 'hasFocus',
                            '[class.mc-action-button-focused]': 'actionButton?.active',
                            '[attr.id]': 'id',
                            '[attr.tabindex]': '-1',
                            '[attr.disabled]': 'disabled || null',
                            '(focusin)': 'focus()',
                            '(blur)': 'blur()',
                            '(click)': 'selectViaInteraction($event)',
                            '(keydown)': 'onKeydown($event)'
                        },
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        providers: [
                            { provide: McTreeNode, useExisting: McTreeOption },
                            { provide: i1.MC_OPTION_ACTION_PARENT, useExisting: McTreeOption }
                        ]
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.ChangeDetectorRef }, { type: i0__namespace.NgZone }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [MC_TREE_OPTION_PARENT_COMPONENT]
                        }] }];
        }, propDecorators: { toggleElement: [{
                    type: i0.ContentChild,
                    args: ['mcTreeNodeToggle']
                }], actionButton: [{
                    type: i0.ContentChild,
                    args: [i1.McOptionActionComponent]
                }], tooltipTrigger: [{
                    type: i0.ContentChild,
                    args: [tooltip.McTooltipTrigger]
                }], dropdownTrigger: [{
                    type: i0.ContentChild,
                    args: [dropdown.McDropdownTrigger]
                }], disabled: [{
                    type: i0.Input
                }], showCheckbox: [{
                    type: i0.Input
                }], onSelectionChange: [{
                    type: i0.Output
                }] } });

    var MC_SELECTION_TREE_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return McTreeSelection; }),
        multi: true
    };
    var McTreeSelectAllEvent = /** @class */ (function () {
        function McTreeSelectAllEvent(source, options) {
            this.source = source;
            this.options = options;
        }
        return McTreeSelectAllEvent;
    }());
    var McTreeCopyEvent = /** @class */ (function () {
        function McTreeCopyEvent(source, option) {
            this.source = source;
            this.option = option;
        }
        return McTreeCopyEvent;
    }());
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
        function McTreeSelection(elementRef, differs, changeDetectorRef, multiple, clipboard) {
            var _this = _super.call(this, differs, changeDetectorRef) || this;
            _this.elementRef = elementRef;
            _this.clipboard = clipboard;
            _this.renderedOptions = new i0.QueryList();
            _this.resetFocusedItemOnBlur = true;
            _this.multipleMode = null;
            _this.userTabIndex = null;
            _this.navigationChange = new i0.EventEmitter();
            _this.selectionChange = new i0.EventEmitter();
            _this.onSelectAll = new i0.EventEmitter();
            _this.onCopy = new i0.EventEmitter();
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
                _this.updateScrollSize();
            };
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
                return rxjs.merge.apply(void 0, __spreadArray([], __read(this.renderedOptions.map(function (option) { return option.onFocus; }))));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTreeSelection.prototype, "optionBlurChanges", {
            get: function () {
                return rxjs.merge.apply(void 0, __spreadArray([], __read(this.renderedOptions.map(function (option) { return option.onBlur; }))));
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
                return this.multipleMode === i1.MultipleMode.CHECKBOX;
            },
            enumerable: false,
            configurable: true
        });
        McTreeSelection.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.unorderedOptions.changes
                .subscribe(this.updateRenderedOptions);
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
                .pipe(operators.takeUntil(this.destroy), operators.delay(0))
                .subscribe(function (options) {
                _this.resetOptions();
                // Check to see if we need to update our tab index
                _this.updateTabIndex();
                options.forEach(function (option) {
                    if (_this.getSelectedValues().includes(option.value)) {
                        option.select();
                    }
                    else {
                        option.deselect();
                    }
                    option.markForCheck();
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
            this.keyManager.setFocusOrigin('keyboard');
            this.keyManager.setFirstItemActive();
            this.keyManager.setFocusOrigin('program');
        };
        McTreeSelection.prototype.blur = function () {
            if (!this.hasFocusedOption() && this.resetFocusedItemOnBlur) {
                this.keyManager.setActiveItem(-1);
            }
            this.onTouched();
            this.changeDetectorRef.markForCheck();
        };
        McTreeSelection.prototype.onKeyDown = function (event) {
            var _a, _b;
            this.keyManager.setFocusOrigin('keyboard');
            // tslint:disable-next-line: deprecation
            var keyCode = event.keyCode;
            if ([keycodes.SPACE, keycodes.LEFT_ARROW, keycodes.RIGHT_ARROW].includes(keyCode) || keycodes.isVerticalMovement(event)) {
                event.preventDefault();
            }
            if (this.multiple && keycodes.isSelectAll(event)) {
                this.selectAllOptions();
                return;
            }
            else if (keycodes.isCopy(event)) {
                this.copyActiveOption();
                return;
            }
            else if (keyCode === keycodes.TAB) {
                this.keyManager.tabOut.next();
                return;
            }
            else if (keyCode === keycodes.LEFT_ARROW && ((_a = this.keyManager.activeItem) === null || _a === void 0 ? void 0 : _a.isExpandable)) {
                this.treeControl.collapse(this.keyManager.activeItem.data);
                return;
            }
            else if (keyCode === keycodes.RIGHT_ARROW && ((_b = this.keyManager.activeItem) === null || _b === void 0 ? void 0 : _b.isExpandable)) {
                this.treeControl.expand(this.keyManager.activeItem.data);
                return;
            }
            else if (keyCode === keycodes.DOWN_ARROW) {
                this.keyManager.setNextItemActive();
            }
            else if (keyCode === keycodes.UP_ARROW) {
                this.keyManager.setPreviousItemActive();
            }
            else if ([keycodes.SPACE, keycodes.ENTER].includes(keyCode)) {
                this.toggleFocusedOption();
                return;
            }
            else if (keyCode === keycodes.HOME) {
                this.keyManager.setFirstItemActive();
            }
            else if (keyCode === keycodes.END) {
                this.keyManager.setLastItemActive();
            }
            else if (keyCode === keycodes.PAGE_UP) {
                this.keyManager.setPreviousPageItemActive();
            }
            else if (keyCode === keycodes.PAGE_DOWN) {
                this.keyManager.setNextPageItemActive();
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
                this.emitChangeEvent(option);
            }
            else if (ctrlKey) {
                if (!this.canDeselectLast(option)) {
                    return;
                }
            }
            else if (this.autoSelect) {
                this.selectionModel.clear();
                this.selectionModel.toggle(option.data);
                this.emitChangeEvent(option);
            }
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
            var _c;
            var _this = this;
            var selectedOptionState = option.selected;
            var fromIndex = this.keyManager.previousActiveItemIndex;
            var toIndex = this.keyManager.previousActiveItemIndex = this.keyManager.activeItemIndex;
            if (toIndex === fromIndex) {
                return;
            }
            if (fromIndex > toIndex) {
                _c = __read([toIndex, fromIndex], 2), fromIndex = _c[0], toIndex = _c[1];
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
            this.nodeOutlet.changeDetectorRef.detectChanges();
        };
        McTreeSelection.prototype.emitNavigationEvent = function (option) {
            this.navigationChange.emit(new McTreeNavigationChange(this, option));
        };
        McTreeSelection.prototype.emitChangeEvent = function (option) {
            this.selectionChange.emit(new McTreeNavigationChange(this, option));
        };
        McTreeSelection.prototype.selectAllOptions = function () {
            var optionsToSelect = this.renderedOptions
                .filter(function (option) { return !option.disabled; });
            optionsToSelect
                .forEach(function (option) { return option.setSelected(true); });
            this.onSelectAll.emit(new McTreeSelectAllEvent(this, optionsToSelect));
        };
        McTreeSelection.prototype.copyActiveOption = function () {
            if (this.onCopy.observers.length) {
                this.onCopy.emit(new McTreeCopyEvent(this, this.keyManager.activeItem));
            }
            else {
                this.onCopyDefaultHandler();
            }
        };
        McTreeSelection.prototype.writeValue = function (value) {
            if (this.multiple && value && !Array.isArray(value)) {
                throw i1.getMcSelectNonArrayValueError();
            }
            if (value) {
                this.setOptionsFromValues(this.multiple ? value : [value]);
            }
            else {
                this.selectionModel.clear();
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
            var _c;
            var _this = this;
            this.selectionModel.clear();
            var valuesToSelect = values.reduce(function (result, value) {
                return _this.treeControl.hasValue(value) ? __spreadArray(__spreadArray([], __read(result)), [_this.treeControl.hasValue(value)]) : __spreadArray([], __read(result));
            }, []);
            (_c = this.selectionModel).select.apply(_c, __spreadArray([], __read(valuesToSelect)));
        };
        McTreeSelection.prototype.getSelectedValues = function () {
            var _this = this;
            return this.selectionModel.selected.map(function (selected) { return _this.treeControl.getValue(selected); });
        };
        McTreeSelection.prototype.getItemHeight = function () {
            return this.renderedOptions.first ? this.renderedOptions.first.getHeight() : 0;
        };
        McTreeSelection.prototype.onCopyDefaultHandler = function () {
            var _a;
            (_a = this.clipboard) === null || _a === void 0 ? void 0 : _a.copy(this.keyManager.activeItem.value);
        };
        McTreeSelection.prototype.getHeight = function () {
            var clientRects = this.elementRef.nativeElement.getClientRects();
            if (clientRects.length) {
                return clientRects[0].height;
            }
            return 0;
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
            this.renderedOptions.forEach(function (option) { return option.markForCheck(); });
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
    }(McTreeBase));
    /** @nocollapse */ McTreeSelection.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTreeSelection, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.IterableDiffers }, { token: i0__namespace.ChangeDetectorRef }, { token: 'multiple', attribute: true }, { token: i1__namespace$1.Clipboard, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McTreeSelection.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McTreeSelection, selector: "mc-tree-selection", inputs: { treeControl: "treeControl", autoSelect: "autoSelect", noUnselectLast: "noUnselectLast", disabled: "disabled", tabIndex: "tabIndex" }, outputs: { navigationChange: "navigationChange", selectionChange: "selectionChange", onSelectAll: "onSelectAll", onCopy: "onCopy" }, host: { listeners: { "blur": "blur()", "focus": "focus($event)", "keydown": "onKeyDown($event)", "window:resize": "updateScrollSize()" }, properties: { "attr.tabindex": "tabIndex", "attr.disabled": "disabled || null" }, classAttribute: "mc-tree-selection" }, providers: [
            MC_SELECTION_TREE_VALUE_ACCESSOR,
            { provide: MC_TREE_OPTION_PARENT_COMPONENT, useExisting: McTreeSelection },
            { provide: McTreeBase, useExisting: McTreeSelection }
        ], queries: [{ propertyName: "unorderedOptions", predicate: McTreeOption }], viewQueries: [{ propertyName: "nodeOutlet", first: true, predicate: McTreeNodeOutlet, descendants: true, static: true }], exportAs: ["mcTreeSelection"], usesInheritance: true, ngImport: i0__namespace, template: '<ng-container mcTreeNodeOutlet></ng-container>', isInline: true, styles: [".mc-tree-selection{display:block}\n"], directives: [{ type: McTreeNodeOutlet, selector: "[mcTreeNodeOutlet]" }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTreeSelection, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-tree-selection',
                        exportAs: 'mcTreeSelection',
                        template: '<ng-container mcTreeNodeOutlet></ng-container>',
                        styleUrls: ['./tree-selection.scss'],
                        host: {
                            class: 'mc-tree-selection',
                            '[attr.tabindex]': 'tabIndex',
                            '[attr.disabled]': 'disabled || null',
                            '(blur)': 'blur()',
                            '(focus)': 'focus($event)',
                            '(keydown)': 'onKeyDown($event)',
                            '(window:resize)': 'updateScrollSize()'
                        },
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        providers: [
                            MC_SELECTION_TREE_VALUE_ACCESSOR,
                            { provide: MC_TREE_OPTION_PARENT_COMPONENT, useExisting: McTreeSelection },
                            { provide: McTreeBase, useExisting: McTreeSelection }
                        ]
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.IterableDiffers }, { type: i0__namespace.ChangeDetectorRef }, { type: i1__namespace.MultipleMode, decorators: [{
                            type: i0.Attribute,
                            args: ['multiple']
                        }] }, { type: i1__namespace$1.Clipboard, decorators: [{
                            type: i0.Optional
                        }] }];
        }, propDecorators: { nodeOutlet: [{
                    type: i0.ViewChild,
                    args: [McTreeNodeOutlet, { static: true }]
                }], unorderedOptions: [{
                    type: i0.ContentChildren,
                    args: [McTreeOption]
                }], treeControl: [{
                    type: i0.Input
                }], navigationChange: [{
                    type: i0.Output
                }], selectionChange: [{
                    type: i0.Output
                }], onSelectAll: [{
                    type: i0.Output
                }], onCopy: [{
                    type: i0.Output
                }], autoSelect: [{
                    type: i0.Input
                }], noUnselectLast: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], tabIndex: [{
                    type: i0.Input
                }] } });

    var MC_TREE_DIRECTIVES = [
        McTreeNodeOutlet,
        McTreeNodeDef,
        McTreeNode,
        McTreeNodePadding,
        McTree,
        McTreeSelection,
        McTreeOption,
        McTreeNodeToggleComponent,
        McTreeNodeToggleDirective
    ];
    var McTreeModule = /** @class */ (function () {
        function McTreeModule() {
        }
        return McTreeModule;
    }());
    /** @nocollapse */ McTreeModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTreeModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ McTreeModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTreeModule, declarations: [McTreeNodeOutlet,
            McTreeNodeDef,
            McTreeNode,
            McTreeNodePadding,
            McTree,
            McTreeSelection,
            McTreeOption,
            McTreeNodeToggleComponent,
            McTreeNodeToggleDirective], imports: [i2$1.CommonModule, i1.McPseudoCheckboxModule], exports: [McTreeNodeOutlet,
            McTreeNodeDef,
            McTreeNode,
            McTreeNodePadding,
            McTree,
            McTreeSelection,
            McTreeOption,
            McTreeNodeToggleComponent,
            McTreeNodeToggleDirective] });
    /** @nocollapse */ McTreeModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTreeModule, imports: [[i2$1.CommonModule, i1.McPseudoCheckboxModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTreeModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i2$1.CommonModule, i1.McPseudoCheckboxModule],
                        exports: MC_TREE_DIRECTIVES,
                        declarations: MC_TREE_DIRECTIVES
                    }]
            }] });

    /** Base tree control. It has basic toggle/expand/collapse operations on a single data node. */
    /* tslint:disable-next-line:naming-convention */
    var BaseTreeControl = /** @class */ (function () {
        function BaseTreeControl() {
            /** A selection model with multi-selection to track expansion status. */
            this.expansionModel = new collections.SelectionModel(true);
            this.filterModel = new collections.SelectionModel(true);
            this.filterValue = new rxjs.BehaviorSubject('');
        }
        /** Toggles one single data node's expanded/collapsed state. */
        BaseTreeControl.prototype.toggle = function (dataNode) {
            if (this.filterValue.value) {
                return;
            }
            this.expansionModel.toggle(dataNode);
        };
        /** Expands one single data node. */
        BaseTreeControl.prototype.expand = function (dataNode) {
            if (this.filterValue.value) {
                return;
            }
            this.expansionModel.select(dataNode);
        };
        /** Collapses one single data node. */
        BaseTreeControl.prototype.collapse = function (dataNode) {
            if (this.filterValue.value) {
                return;
            }
            this.expansionModel.deselect(dataNode);
        };
        /** Whether a given data node is expanded or not. Returns true if the data node is expanded. */
        BaseTreeControl.prototype.isExpanded = function (dataNode) {
            return this.expansionModel.isSelected(dataNode);
        };
        /** Toggles a subtree rooted at `node` recursively. */
        BaseTreeControl.prototype.toggleDescendants = function (dataNode) {
            this.expansionModel.isSelected(dataNode)
                ? this.collapseDescendants(dataNode)
                : this.expandDescendants(dataNode);
        };
        /** Collapse all dataNodes in the tree. */
        BaseTreeControl.prototype.collapseAll = function () {
            this.expansionModel.clear();
        };
        /** Expands a subtree rooted at given data node recursively. */
        BaseTreeControl.prototype.expandDescendants = function (dataNode) {
            var _a;
            var toBeProcessed = [dataNode];
            toBeProcessed.push.apply(toBeProcessed, __spreadArray([], __read(this.getDescendants(dataNode))));
            (_a = this.expansionModel).select.apply(_a, __spreadArray([], __read(toBeProcessed)));
        };
        /** Collapses a subtree rooted at given data node recursively. */
        BaseTreeControl.prototype.collapseDescendants = function (dataNode) {
            var _a;
            var toBeProcessed = [dataNode];
            toBeProcessed.push.apply(toBeProcessed, __spreadArray([], __read(this.getDescendants(dataNode))));
            (_a = this.expansionModel).deselect.apply(_a, __spreadArray([], __read(toBeProcessed)));
        };
        return BaseTreeControl;
    }());

    function defaultCompareValues(firstValue, secondValue) {
        return firstValue === secondValue;
    }
    function defaultCompareViewValues(firstViewValue, secondViewValue) {
        return RegExp(secondViewValue, 'gi').test(firstViewValue);
    }
    /** Flat tree control. Able to expand/collapse a subtree recursively for flattened tree. */
    var FlatTreeControl = /** @class */ (function (_super) {
        __extends(FlatTreeControl, _super);
        /** Construct with flat tree data node functions getLevel, isExpandable, getValue and getViewValue. */
        function FlatTreeControl(getLevel, isExpandable, 
        /** getValue will be used to determine if the tree contains value or not. Used in method hasValue */
        getValue, 
        /** getViewValue will be used for filter nodes. Returned value will be first argument in filterNodesFunction */
        getViewValue, 
        /** compareValues will be used to comparing values. */
        compareValues, 
        /** compareValues will be used to comparing values. */
        compareViewValues) {
            if (compareValues === void 0) { compareValues = defaultCompareValues; }
            if (compareViewValues === void 0) { compareViewValues = defaultCompareViewValues; }
            var _this = _super.call(this) || this;
            _this.getLevel = getLevel;
            _this.isExpandable = isExpandable;
            _this.getValue = getValue;
            _this.getViewValue = getViewValue;
            _this.compareValues = compareValues;
            _this.compareViewValues = compareViewValues;
            return _this;
        }
        /**
         * Gets a list of the data node's subtree of descendent data nodes.
         *
         * To make this working, the `dataNodes` of the TreeControl must be flattened tree nodes
         * with correct levels.
         */
        FlatTreeControl.prototype.getDescendants = function (dataNode) {
            var startIndex = this.dataNodes.indexOf(dataNode);
            var results = [];
            // Goes through flattened tree nodes in the `dataNodes` array, and get all descendants.
            // The level of descendants of a tree node must be greater than the level of the given
            // tree node.
            // If we reach a node whose level is equal to the level of the tree node, we hit a sibling.
            // If we reach a node whose level is greater than the level of the tree node, we hit a
            // sibling of an ancestor.
            for (var i = startIndex + 1; i < this.dataNodes.length && this.getLevel(dataNode) < this.getLevel(this.dataNodes[i]); i++) {
                results.push(this.dataNodes[i]);
            }
            return results;
        };
        /**
         * Expands all data nodes in the tree.
         *
         * To make this working, the `dataNodes` variable of the TreeControl must be set to all flattened
         * data nodes of the tree.
         */
        FlatTreeControl.prototype.expandAll = function () {
            var _a;
            (_a = this.expansionModel).select.apply(_a, __spreadArray([], __read(this.dataNodes)));
        };
        FlatTreeControl.prototype.getParents = function (node, result) {
            if (node.parent) {
                result.unshift(node.parent);
                return this.getParents(node.parent, result);
            }
            else {
                return result;
            }
        };
        FlatTreeControl.prototype.hasValue = function (value) {
            var _this = this;
            return this.dataNodes.find(function (node) { return _this.compareValues(_this.getValue(node), value); });
        };
        FlatTreeControl.prototype.filterNodes = function (value) {
            var _a;
            var _this = this;
            this.saveExpansionState();
            this.filterModel.clear();
            this.expansionModel.clear();
            var filteredNodes = this.dataNodes
                .filter(function (node) { return _this.compareViewValues(_this.getViewValue(node), value); });
            var filteredNodesWithTheirParents = new Set();
            filteredNodes.forEach(function (filteredNode) {
                _this.getParents(filteredNode, [])
                    .forEach(function (node) {
                    filteredNodesWithTheirParents.add(node);
                    _this.expandDataNode(node);
                });
                filteredNodesWithTheirParents.add(filteredNode);
                _this.expandDataNode(filteredNode);
                if (_this.isExpandable(filteredNode)) {
                    var childNodeLevel_1 = _this.getLevel(filteredNode) + 1;
                    _this.getDescendants(filteredNode)
                        .filter(function (childNode) { return _this.getLevel(childNode) === childNodeLevel_1; })
                        .filter(function (childNode) { return !_this.isExpandable(childNode) || !_this.hasFilteredDescendant(childNode, filteredNodes); })
                        .forEach(function (childNode) {
                        filteredNodesWithTheirParents.add(childNode);
                        _this.expandDataNode(childNode);
                    });
                }
            });
            (_a = this.filterModel).select.apply(_a, __spreadArray([], __read(Array.from(filteredNodesWithTheirParents))));
            this.filterValue.next(value);
            this.restoreExpansionState();
        };
        FlatTreeControl.prototype.expandDataNode = function (dataNode) {
            if (this.isExpandable(dataNode)) {
                this.expansionModel.select(dataNode);
            }
        };
        FlatTreeControl.prototype.saveExpansionState = function () {
            if (this.filterValue.value === '') {
                this.expandedItemsBeforeFiltration = this.expansionModel.selected;
            }
        };
        FlatTreeControl.prototype.restoreExpansionState = function () {
            var _a;
            if (this.filterValue.value === '') {
                this.expansionModel.clear();
                (_a = this.expansionModel).select.apply(_a, __spreadArray([], __read(this.expandedItemsBeforeFiltration)));
            }
        };
        FlatTreeControl.prototype.hasFilteredDescendant = function (dataNode, filteredNodes) {
            var _this = this;
            var filteredViewValues = filteredNodes
                .map(function (node) { return _this.getViewValue(node); });
            return this.getDescendants(dataNode)
                .filter(function (node) { return filteredViewValues.includes(_this.getViewValue(node)); })
                .length > 0;
        };
        return FlatTreeControl;
    }(BaseTreeControl));

    /** Nested tree control. Able to expand/collapse a subtree recursively for NestedNode type. */
    var NestedTreeControl = /** @class */ (function (_super) {
        __extends(NestedTreeControl, _super);
        /** Construct with nested tree function getChildren. */
        function NestedTreeControl(getChildren) {
            var _this = _super.call(this) || this;
            _this.getChildren = getChildren;
            return _this;
        }
        /**
         * Expands all dataNodes in the tree.
         *
         * To make this working, the `dataNodes` variable of the TreeControl must be set to all root level
         * data nodes of the tree.
         */
        NestedTreeControl.prototype.expandAll = function () {
            var _a;
            var _this = this;
            this.expansionModel.clear();
            var allNodes = this.dataNodes.reduce(function (accumulator, dataNode) { return __spreadArray(__spreadArray(__spreadArray([], __read(accumulator)), __read(_this.getDescendants(dataNode))), [dataNode]); }, []);
            (_a = this.expansionModel).select.apply(_a, __spreadArray([], __read(allNodes)));
        };
        /** Gets a list of descendant dataNodes of a subtree rooted at given data node recursively. */
        NestedTreeControl.prototype.getDescendants = function (dataNode) {
            var descendants = [];
            this._getDescendants(descendants, dataNode);
            return descendants.splice(1);
        };
        /** A helper function to get descendants recursively. */
        // todo нужно придумать другое название и понять в чем отличие между getDescendants и _getDescendants
        /* tslint:disable-next-line:naming-convention */
        NestedTreeControl.prototype._getDescendants = function (descendants, dataNode) {
            var _this = this;
            descendants.push(dataNode);
            this.getChildren(dataNode)
                .pipe(operators.take(1))
                .subscribe(function (children) {
                if (children && children.length > 0) {
                    children.forEach(function (child) { return _this._getDescendants(descendants, child); });
                }
            });
        };
        return NestedTreeControl;
    }(BaseTreeControl));

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
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
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
            return rxjs.merge.apply(void 0, [collectionViewer.viewChange, this._data]).pipe(operators.map(function () { return _this.data; }));
        };
        McTreeNestedDataSource.prototype.disconnect = function () {
            // no op
        };
        return McTreeNestedDataSource;
    }(collections.DataSource));

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BaseTreeControl = BaseTreeControl;
    exports.FlatTreeControl = FlatTreeControl;
    exports.MC_SELECTION_TREE_VALUE_ACCESSOR = MC_SELECTION_TREE_VALUE_ACCESSOR;
    exports.MC_TREE_OPTION_PARENT_COMPONENT = MC_TREE_OPTION_PARENT_COMPONENT;
    exports.McTree = McTree;
    exports.McTreeBase = McTreeBase;
    exports.McTreeCopyEvent = McTreeCopyEvent;
    exports.McTreeFlatDataSource = McTreeFlatDataSource;
    exports.McTreeFlattener = McTreeFlattener;
    exports.McTreeModule = McTreeModule;
    exports.McTreeNavigationChange = McTreeNavigationChange;
    exports.McTreeNestedDataSource = McTreeNestedDataSource;
    exports.McTreeNode = McTreeNode;
    exports.McTreeNodeDef = McTreeNodeDef;
    exports.McTreeNodeOutlet = McTreeNodeOutlet;
    exports.McTreeNodeOutletContext = McTreeNodeOutletContext;
    exports.McTreeNodePadding = McTreeNodePadding;
    exports.McTreeNodeToggleBase = McTreeNodeToggleBase;
    exports.McTreeNodeToggleBaseDirective = McTreeNodeToggleBaseDirective;
    exports.McTreeNodeToggleComponent = McTreeNodeToggleComponent;
    exports.McTreeNodeToggleDirective = McTreeNodeToggleDirective;
    exports.McTreeNodeToggleMixinBase = McTreeNodeToggleMixinBase;
    exports.McTreeOption = McTreeOption;
    exports.McTreeOptionChange = McTreeOptionChange;
    exports.McTreeSelectAllEvent = McTreeSelectAllEvent;
    exports.McTreeSelection = McTreeSelection;
    exports.McTreeSelectionChange = McTreeSelectionChange;
    exports.NestedTreeControl = NestedTreeControl;
    exports.defaultCompareValues = defaultCompareValues;
    exports.defaultCompareViewValues = defaultCompareViewValues;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-tree.umd.js.map
