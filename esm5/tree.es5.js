/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __extends } from 'tslib';
import { Directive, Input, Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, forwardRef, IterableDiffers, Output, ViewChild, ViewEncapsulation, ElementRef, Inject, NgModule } from '@angular/core';
import { CdkTreeNodeDef, CdkTreeNodePadding, CdkTreeNode, CdkTree, CdkTreeNodeOutlet, CdkTreeModule } from '@ptsecurity/cdk/tree';
import { SelectionModel, DataSource } from '@ptsecurity/cdk/collections';
import { mixinDisabled, mixinTabIndex, toBoolean } from '@ptsecurity/mosaic/core';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, SPACE } from '@ptsecurity/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, merge } from 'rxjs';
import { map, take } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
var McTreeNodeDef = /** @class */ (function (_super) {
    __extends(McTreeNodeDef, _super);
    function McTreeNodeDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    McTreeNodeDef.decorators = [
        { type: Directive, args: [{
                    selector: '[mcTreeNodeDef]',
                    inputs: ['when: mcTreeNodeDefWhen'],
                    providers: [{ provide: CdkTreeNodeDef, useExisting: McTreeNodeDef }]
                },] },
    ];
    /** @nocollapse */
    McTreeNodeDef.propDecorators = {
        "data": [{ type: Input, args: ['mcTreeNode',] },],
    };
    return McTreeNodeDef;
}(CdkTreeNodeDef));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
var McTreeNodePadding = /** @class */ (function (_super) {
    __extends(McTreeNodePadding, _super);
    function McTreeNodePadding() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._baseLeftPadding = 6;
        _this._iconWidth = 20;
        _this._indent = 16;
        return _this;
    }
    Object.defineProperty(McTreeNodePadding.prototype, "leftPadding", {
        get: /**
         * @return {?}
         */
        function () {
            return (this._withIcon ? 0 : this._iconWidth) + this._baseLeftPadding;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McTreeNodePadding.prototype._paddingIndent = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ nodeLevel = (this._treeNode.data && this._tree.treeControl.getLevel)
            ? this._tree.treeControl.getLevel(this._treeNode.data)
            : null;
        var /** @type {?} */ level = this._level || nodeLevel;
        return level ? (level * this._indent) + this.leftPadding + "px" : this._baseLeftPadding + "px";
    };
    /**
     * @return {?}
     */
    McTreeNodePadding.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._withIcon = this._tree.treeControl.isExpandable(this._treeNode.data);
        this._setPadding();
    };
    McTreeNodePadding.decorators = [
        { type: Directive, args: [{
                    selector: '[mcTreeNodePadding]',
                    providers: [{ provide: CdkTreeNodePadding, useExisting: McTreeNodePadding }]
                },] },
    ];
    /** @nocollapse */
    McTreeNodePadding.propDecorators = {
        "level": [{ type: Input, args: ['mcTreeNodePadding',] },],
        "indent": [{ type: Input, args: ['mcTreeNodePaddingIndent',] },],
    };
    return McTreeNodePadding;
}(CdkTreeNodePadding));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Wrapper for the CdkTree node with Material design styles.
 * @template T
 */
var McTreeNodeOption = /** @class */ (function (_super) {
    __extends(McTreeNodeOption, _super);
    function McTreeNodeOption(_elementRef, treeSelection) {
        var _this = _super.call(this, _elementRef, treeSelection) || this;
        _this._elementRef = _elementRef;
        _this.treeSelection = treeSelection;
        _this.role = 'treeitem';
        _this._hasFocus = false;
        _this._disabled = false;
        _this._selected = false;
        return _this;
    }
    Object.defineProperty(McTreeNodeOption.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var /** @type {?} */ newValue = toBoolean(value);
            if (newValue !== this._disabled) {
                this._disabled = newValue;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeNodeOption.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this.treeSelection.selectedOptions && this.treeSelection.selectedOptions.isSelected(this) || false;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var /** @type {?} */ isSelected = toBoolean(value);
            if (isSelected !== this._selected) {
                this.setSelected(isSelected);
                // this.treeSelection._reportValueChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McTreeNodeOption.prototype.focus = /**
     * @return {?}
     */
    function () {
        this._elementRef.nativeElement.focus();
        this.treeSelection.setFocusedOption(this);
    };
    /**
     * @return {?}
     */
    McTreeNodeOption.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.selected = !this.selected;
    };
    /**
     * @param {?} selected
     * @return {?}
     */
    McTreeNodeOption.prototype.setSelected = /**
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        if (this._selected === selected || !this.treeSelection.selectedOptions) {
            return;
        }
        this._selected = selected;
        if (selected) {
            this.treeSelection.selectedOptions.select(this);
        }
        else {
            this.treeSelection.selectedOptions.deselect(this);
        }
        // this._changeDetector.markForCheck();
    };
    /**
     * @return {?}
     */
    McTreeNodeOption.prototype._handleFocus = /**
     * @return {?}
     */
    function () {
        if (this.disabled || this._hasFocus) {
            return;
        }
        this._hasFocus = true;
    };
    /**
     * @return {?}
     */
    McTreeNodeOption.prototype._handleBlur = /**
     * @return {?}
     */
    function () {
        this._hasFocus = false;
    };
    /**
     * @return {?}
     */
    McTreeNodeOption.prototype._handleClick = /**
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        this.treeSelection.setFocusedOption(this);
    };
    McTreeNodeOption.decorators = [
        { type: Directive, args: [{
                    exportAs: 'mcTreeNodeOption',
                    selector: 'mc-tree-node-option',
                    host: {
                        tabindex: '-1',
                        '[class.mc-selected]': 'selected',
                        '[class.mc-focused]': '_hasFocus',
                        '[attr.aria-expanded]': 'isExpanded',
                        '[attr.aria-level]': 'role === "treeitem" ? level : null',
                        class: 'mc-tree-node',
                        '(focus)': '_handleFocus()',
                        '(blur)': '_handleBlur()',
                        '(click)': '_handleClick()'
                    },
                    providers: [
                        { provide: CdkTreeNode, useExisting: McTreeNodeOption }
                    ]
                },] },
    ];
    /** @nocollapse */
    McTreeNodeOption.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: McTreeSelection, decorators: [{ type: Inject, args: [forwardRef(function () { return McTreeSelection; }),] },] },
    ]; };
    McTreeNodeOption.propDecorators = {
        "role": [{ type: Input },],
        "disabled": [{ type: Input },],
        "selected": [{ type: Input },],
    };
    return McTreeNodeOption;
}(CdkTreeNode));
var /** @type {?} */ _McTreeSelectionBase = mixinTabIndex(mixinDisabled(CdkTree));
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
/**
 * @template T
 */
var McTreeSelection = /** @class */ (function (_super) {
    __extends(McTreeSelection, _super);
    function McTreeSelection(_differs, _changeDetectorRef, tabIndex, multiple, autoSelect) {
        var _this = _super.call(this, _differs, _changeDetectorRef) || this;
        _this._disabled = false;
        _this.navigationChange = new EventEmitter();
        _this.selectionChange = new EventEmitter();
        _this.tabIndex = parseInt(tabIndex) || 0;
        _this.multiple = multiple === null ? true : toBoolean(multiple);
        _this.autoSelect = autoSelect === null ? true : toBoolean(autoSelect);
        _this.selectedOptions = new SelectionModel(_this.multiple);
        return _this;
    }
    Object.defineProperty(McTreeSelection.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} rawValue
         * @return {?}
         */
        function (rawValue) {
            var /** @type {?} */ value = toBoolean(rawValue);
            if (this._disabled !== value) {
                this._disabled = value;
                if (this._disabled) {
                    console.log('need disable all options');
                }
                else {
                    console.log('need enable all options');
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    McTreeSelection.prototype._onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ keyCode = event.keyCode;
        switch (keyCode) {
            case LEFT_ARROW:
                if (this._keyManager.activeItem) {
                    this.treeControl.collapse(this._keyManager.activeItem.data);
                }
                event.preventDefault();
                break;
            case RIGHT_ARROW:
                if (this._keyManager.activeItem) {
                    this.treeControl.expand(this._keyManager.activeItem.data);
                }
                event.preventDefault();
                break;
            case SPACE:
            case ENTER:
                this.toggleFocusedOption();
                event.preventDefault();
                break;
            case HOME:
                console.log('need set focus on first node');
                event.preventDefault();
                break;
            case END:
                console.log('need set focus on last node');
                event.preventDefault();
                break;
            case PAGE_UP:
                console.log('need do scroll page and set focus on first in viewport');
                event.preventDefault();
                break;
            case PAGE_DOWN:
                console.log('need do scroll page and set focus on last in viewport');
                event.preventDefault();
                break;
            default:
                this._keyManager.onKeydown(event);
        }
    };
    /**
     * @return {?}
     */
    McTreeSelection.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._keyManager = new FocusKeyManager(this.options)
            .withTypeAhead()
            .withVerticalOrientation(true)
            .withHorizontalOrientation(null);
    };
    /**
     * @param {?} option
     * @return {?}
     */
    McTreeSelection.prototype.setFocusedOption = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this._keyManager.updateActiveItem(option);
        if (this.autoSelect) {
            this.options.forEach(function (item) { return item.setSelected(false); });
            option.setSelected(true);
        }
        this._emitNavigationEvent(option);
    };
    // Toggles the selected state of the currently focused option.
    /**
     * @return {?}
     */
    McTreeSelection.prototype.toggleFocusedOption = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ focusedIndex = this._keyManager.activeItemIndex;
        if (focusedIndex != null && this._isValidIndex(focusedIndex)) {
            var /** @type {?} */ focusedOption = this.options.toArray()[focusedIndex];
            if (focusedOption && this._canUnselectLast(focusedOption)) {
                focusedOption.toggle();
                // Emit a change event because the focused option changed its state through user interaction.
                this._emitChangeEvent(focusedOption);
            }
        }
    };
    /**
     * @param {?} data
     * @param {?=} dataDiffer
     * @param {?=} viewContainer
     * @param {?=} parentData
     * @return {?}
     */
    McTreeSelection.prototype.renderNodeChanges = /**
     * @param {?} data
     * @param {?=} dataDiffer
     * @param {?=} viewContainer
     * @param {?=} parentData
     * @return {?}
     */
    function (data, dataDiffer, viewContainer, parentData) {
        if (dataDiffer === void 0) { dataDiffer = this._dataDiffer; }
        if (viewContainer === void 0) { viewContainer = this._nodeOutlet.viewContainer; }
        _super.prototype.renderNodeChanges.call(this, data, dataDiffer, viewContainer, parentData);
        var /** @type {?} */ arrayOfInstances = [];
        viewContainer._embeddedViews.forEach(function (view) {
            var /** @type {?} */ viewDef = view.def;
            viewDef.nodes.forEach(function (node) {
                if (viewDef.nodeMatchedQueries === node.matchedQueryIds) {
                    var /** @type {?} */ nodeData = view.nodes[node.nodeIndex];
                    arrayOfInstances.push(/** @type {?} */ (nodeData.instance));
                }
            });
        });
        if (this.options) {
            this.options.reset(arrayOfInstances);
            this.options.notifyOnChanges();
        }
    };
    /**
     * @param {?} option
     * @return {?}
     */
    McTreeSelection.prototype._emitNavigationEvent = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this.navigationChange.emit(new McTreeNavigationChange(this, option));
    };
    /**
     * @param {?} option
     * @return {?}
     */
    McTreeSelection.prototype._emitChangeEvent = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this.selectionChange.emit(new McTreeNavigationChange(this, option));
    };
    /**
     * Utility to ensure all indexes are valid.
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of options.
     */
    McTreeSelection.prototype._isValidIndex = /**
     * Utility to ensure all indexes are valid.
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of options.
     */
    function (index) {
        return index >= 0 && index < this.options.length;
    };
    /**
     * @param {?} _option
     * @return {?}
     */
    McTreeSelection.prototype._canUnselectLast = /**
     * @param {?} _option
     * @return {?}
     */
    function (_option) {
        return true;
        // return !(this.noUnselect && this.selectedOptions.selected.length === 1 && listOption.selected);
    };
    McTreeSelection.decorators = [
        { type: Component, args: [{
                    exportAs: 'mcTreeSelection',
                    selector: 'mc-tree-selection',
                    template: "<ng-container cdkTreeNodeOutlet></ng-container>",
                    host: {
                        '[tabIndex]': 'tabIndex',
                        class: 'mc-tree',
                        role: 'tree-selection',
                        '(keydown)': '_onKeyDown($event)'
                    },
                    styles: [".mc-tree{display:block;border:1px solid red}.mc-tree-node{display:flex;align-items:center;height:28px;word-wrap:break-word;border:2px solid transparent}.mc-tree-node>.mc-icon{margin-right:4px;cursor:pointer}.mc-tree-node:focus{outline:0}.mc-tree-node:not([disabled]){cursor:pointer}.mc-icon-rotate_90{transform:rotate(90deg)}.mc-icon-rotate_180{transform:rotate(180deg)}.mc-icon-rotate_270{transform:rotate(270deg)}"],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [{ provide: CdkTree, useExisting: McTreeSelection }]
                },] },
    ];
    /** @nocollapse */
    McTreeSelection.ctorParameters = function () { return [
        { type: IterableDiffers, },
        { type: ChangeDetectorRef, },
        { type: undefined, decorators: [{ type: Attribute, args: ['tabindex',] },] },
        { type: undefined, decorators: [{ type: Attribute, args: ['multiple',] },] },
        { type: undefined, decorators: [{ type: Attribute, args: ['auto-select',] },] },
    ]; };
    McTreeSelection.propDecorators = {
        "_nodeOutlet": [{ type: ViewChild, args: [CdkTreeNodeOutlet,] },],
        "options": [{ type: ContentChildren, args: [forwardRef(function () { return McTreeNodeOption; }),] },],
        "disabled": [{ type: Input },],
        "navigationChange": [{ type: Output },],
        "selectionChange": [{ type: Output },],
    };
    return McTreeSelection;
}(_McTreeSelectionBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ MC_TREE_DIRECTIVES = [
    McTreeNodeDef,
    McTreeNodePadding,
    McTreeSelection,
    McTreeNodeOption
];
var McTreeModule = /** @class */ (function () {
    function McTreeModule() {
    }
    McTreeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, CdkTreeModule],
                    exports: MC_TREE_DIRECTIVES,
                    declarations: MC_TREE_DIRECTIVES
                },] },
    ];
    return McTreeModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
 * @template T, F
 */
var  /**
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
 * @template T, F
 */
McTreeFlattener = /** @class */ (function () {
    function McTreeFlattener(transformFunction, getLevel, isExpandable, getChildren) {
        this.transformFunction = transformFunction;
        this.getLevel = getLevel;
        this.isExpandable = isExpandable;
        this.getChildren = getChildren;
    }
    /**
     * @param {?} node
     * @param {?} level
     * @param {?} resultNodes
     * @param {?} parentMap
     * @return {?}
     */
    McTreeFlattener.prototype._flattenNode = /**
     * @param {?} node
     * @param {?} level
     * @param {?} resultNodes
     * @param {?} parentMap
     * @return {?}
     */
    function (node, level, resultNodes, parentMap) {
        var _this = this;
        var /** @type {?} */ flatNode = this.transformFunction(node, level);
        resultNodes.push(flatNode);
        if (this.isExpandable(flatNode)) {
            this.getChildren(node).pipe(take(1)).subscribe(function (children) {
                children.forEach(function (child, index) {
                    var /** @type {?} */ childParentMap = parentMap.slice();
                    childParentMap.push(index !== children.length - 1);
                    _this._flattenNode(child, level + 1, resultNodes, childParentMap);
                });
            });
        }
        return resultNodes;
    };
    /**
     * Flatten a list of node type T to flattened version of node F.
     * Please note that type T may be nested, and the length of `structuredData` may be different
     * from that of returned list `F[]`.
     */
    /**
     * Flatten a list of node type T to flattened version of node F.
     * Please note that type T may be nested, and the length of `structuredData` may be different
     * from that of returned list `F[]`.
     * @param {?} structuredData
     * @return {?}
     */
    McTreeFlattener.prototype.flattenNodes = /**
     * Flatten a list of node type T to flattened version of node F.
     * Please note that type T may be nested, and the length of `structuredData` may be different
     * from that of returned list `F[]`.
     * @param {?} structuredData
     * @return {?}
     */
    function (structuredData) {
        var _this = this;
        var /** @type {?} */ resultNodes = [];
        structuredData.forEach(function (node) { return _this._flattenNode(node, 0, resultNodes, []); });
        return resultNodes;
    };
    /**
     * Expand flattened node with current expansion status.
     * The returned list may have different length.
     */
    /**
     * Expand flattened node with current expansion status.
     * The returned list may have different length.
     * @param {?} nodes
     * @param {?} treeControl
     * @return {?}
     */
    McTreeFlattener.prototype.expandFlattenedNodes = /**
     * Expand flattened node with current expansion status.
     * The returned list may have different length.
     * @param {?} nodes
     * @param {?} treeControl
     * @return {?}
     */
    function (nodes, treeControl) {
        var _this = this;
        var /** @type {?} */ results = [];
        var /** @type {?} */ currentExpand = [];
        currentExpand[0] = true;
        nodes.forEach(function (node) {
            var /** @type {?} */ expand = true;
            for (var /** @type {?} */ i = 0; i <= _this.getLevel(node); i++) {
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
/**
 * Data source for flat tree.
 * The data source need to handle expansion/collapsion of the tree node and change the data feed
 * to `McTree`.
 * The nested tree nodes of type `T` are flattened through `MсTreeFlattener`, and converted
 * to type `F` for `McTree` to consume.
 * @template T, F
 */
var  /**
 * Data source for flat tree.
 * The data source need to handle expansion/collapsion of the tree node and change the data feed
 * to `McTree`.
 * The nested tree nodes of type `T` are flattened through `MсTreeFlattener`, and converted
 * to type `F` for `McTree` to consume.
 * @template T, F
 */
McTreeFlatDataSource = /** @class */ (function (_super) {
    __extends(McTreeFlatDataSource, _super);
    function McTreeFlatDataSource(treeControl, treeFlattener, initialData) {
        if (initialData === void 0) { initialData = []; }
        var _this = _super.call(this) || this;
        _this.treeControl = treeControl;
        _this.treeFlattener = treeFlattener;
        _this._flattenedData = new BehaviorSubject([]);
        _this._expandedData = new BehaviorSubject([]);
        _this._data = new BehaviorSubject(initialData);
        return _this;
    }
    Object.defineProperty(McTreeFlatDataSource.prototype, "data", {
        get: /**
         * @return {?}
         */
        function () {
            return this._data.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._data.next(value);
            this._flattenedData.next(this.treeFlattener.flattenNodes(this.data));
            this.treeControl.dataNodes = this._flattenedData.value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} collectionViewer
     * @return {?}
     */
    McTreeFlatDataSource.prototype.connect = /**
     * @param {?} collectionViewer
     * @return {?}
     */
    function (collectionViewer) {
        var _this = this;
        var /** @type {?} */ changes = [
            collectionViewer.viewChange,
            /** @type {?} */ ((this.treeControl.expansionModel.onChange)),
            this._flattenedData
        ];
        return merge.apply(void 0, changes).pipe(map(function () {
            _this._expandedData.next(_this.treeFlattener.expandFlattenedNodes(_this._flattenedData.value, _this.treeControl));
            return _this._expandedData.value;
        }));
    };
    /**
     * @return {?}
     */
    McTreeFlatDataSource.prototype.disconnect = /**
     * @return {?}
     */
    function () {
        // no op
    };
    return McTreeFlatDataSource;
}(DataSource));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Data source for nested tree.
 *
 * The data source for nested tree doesn't have to consider node flattener, or the way to expand
 * or collapse. The expansion/collapsion will be handled by ITreeControl and each non-leaf node.
 * @template T
 */
var  /**
 * Data source for nested tree.
 *
 * The data source for nested tree doesn't have to consider node flattener, or the way to expand
 * or collapse. The expansion/collapsion will be handled by ITreeControl and each non-leaf node.
 * @template T
 */
McTreeNestedDataSource = /** @class */ (function (_super) {
    __extends(McTreeNestedDataSource, _super);
    function McTreeNestedDataSource() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._data = new BehaviorSubject([]);
        return _this;
    }
    Object.defineProperty(McTreeNestedDataSource.prototype, "data", {
        /**
         * Data for the nested tree
         */
        get: /**
         * Data for the nested tree
         * @return {?}
         */
        function () {
            return this._data.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._data.next(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} collectionViewer
     * @return {?}
     */
    McTreeNestedDataSource.prototype.connect = /**
     * @param {?} collectionViewer
     * @return {?}
     */
    function (collectionViewer) {
        var _this = this;
        return merge.apply(void 0, [collectionViewer.viewChange, this._data]).pipe(map(function () { return _this.data; }));
    };
    /**
     * @return {?}
     */
    McTreeNestedDataSource.prototype.disconnect = /**
     * @return {?}
     */
    function () {
        // no op
    };
    return McTreeNestedDataSource;
}(DataSource));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { McTreeModule, McTreeNodeDef, McTreeNodePadding, McTreeNodeOption, _McTreeSelectionBase, McTreeNavigationChange, McTreeSelectionChange, McTreeSelection, McTreeFlattener, McTreeFlatDataSource, McTreeNestedDataSource };
//# sourceMappingURL=tree.es5.js.map
