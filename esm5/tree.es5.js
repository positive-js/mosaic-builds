/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __extends, __metadata, __param } from 'tslib';
import { Directive, Input, Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, forwardRef, IterableDiffers, Output, QueryList, ViewChild, ViewEncapsulation, ElementRef, Inject, NgModule } from '@angular/core';
import { CdkTreeNodeDef, CdkTreeNodePadding, CdkTreeNode, CdkTree, CdkTreeNodeOutlet, CdkTreeModule } from '@ptsecurity/cdk/tree';
import { SelectionModel, DataSource } from '@ptsecurity/cdk/collections';
import { mixinDisabled, mixinTabIndex, toBoolean } from '@ptsecurity/mosaic/core';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, SPACE } from '@ptsecurity/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, merge } from 'rxjs';
import { map, take } from 'rxjs/operators';

var McTreeNodeDef = /** @class */ (function (_super) {
    __extends(McTreeNodeDef, _super);
    function McTreeNodeDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    McTreeNodeDef_1 = McTreeNodeDef;
    var McTreeNodeDef_1;
    __decorate([
        Input('mcTreeNode'),
        __metadata("design:type", Object)
    ], McTreeNodeDef.prototype, "data", void 0);
    McTreeNodeDef = McTreeNodeDef_1 = __decorate([
        Directive({
            selector: '[mcTreeNodeDef]',
            inputs: ['when: mcTreeNodeDefWhen'],
            providers: [{ provide: CdkTreeNodeDef, useExisting: McTreeNodeDef_1 }]
        })
    ], McTreeNodeDef);
    return McTreeNodeDef;
}(CdkTreeNodeDef));

var McTreeNodePadding = /** @class */ (function (_super) {
    __extends(McTreeNodePadding, _super);
    function McTreeNodePadding() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._baseLeftPadding = 6;
        _this._iconWidth = 20;
        _this._indent = 16;
        return _this;
    }
    McTreeNodePadding_1 = McTreeNodePadding;
    Object.defineProperty(McTreeNodePadding.prototype, "leftPadding", {
        get: function () {
            return (this._withIcon ? 0 : this._iconWidth) + this._baseLeftPadding;
        },
        enumerable: true,
        configurable: true
    });
    McTreeNodePadding.prototype._paddingIndent = function () {
        var nodeLevel = (this._treeNode.data && this._tree.treeControl.getLevel)
            ? this._tree.treeControl.getLevel(this._treeNode.data)
            : null;
        var level = this._level || nodeLevel;
        return level ? (level * this._indent) + this.leftPadding + "px" : this._baseLeftPadding + "px";
    };
    McTreeNodePadding.prototype.ngOnInit = function () {
        this._withIcon = this._tree.treeControl.isExpandable(this._treeNode.data);
        this._setPadding();
    };
    var McTreeNodePadding_1;
    __decorate([
        Input('mcTreeNodePadding'),
        __metadata("design:type", Number)
    ], McTreeNodePadding.prototype, "level", void 0);
    __decorate([
        Input('mcTreeNodePaddingIndent'),
        __metadata("design:type", Number)
    ], McTreeNodePadding.prototype, "indent", void 0);
    McTreeNodePadding = McTreeNodePadding_1 = __decorate([
        Directive({
            selector: '[mcTreeNodePadding]',
            providers: [{ provide: CdkTreeNodePadding, useExisting: McTreeNodePadding_1 }]
        })
    ], McTreeNodePadding);
    return McTreeNodePadding;
}(CdkTreeNodePadding));

/**
 * Wrapper for the CdkTree node with Material design styles.
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
    McTreeNodeOption_1 = McTreeNodeOption;
    Object.defineProperty(McTreeNodeOption.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            var newValue = toBoolean(value);
            if (newValue !== this._disabled) {
                this._disabled = newValue;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeNodeOption.prototype, "selected", {
        get: function () {
            return this.treeSelection.selectedOptions && this.treeSelection.selectedOptions.isSelected(this) || false;
        },
        set: function (value) {
            var isSelected = toBoolean(value);
            if (isSelected !== this._selected) {
                this.setSelected(isSelected);
                // this.treeSelection._reportValueChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    McTreeNodeOption.prototype.focus = function () {
        this._elementRef.nativeElement.focus();
        this.treeSelection.setFocusedOption(this);
    };
    McTreeNodeOption.prototype.toggle = function () {
        this.selected = !this.selected;
    };
    McTreeNodeOption.prototype.setSelected = function (selected) {
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
    McTreeNodeOption.prototype._getHeight = function () {
        return this._elementRef.nativeElement.getClientRects()[0].height;
    };
    McTreeNodeOption.prototype._handleFocus = function () {
        if (this.disabled || this._hasFocus) {
            return;
        }
        this._hasFocus = true;
    };
    McTreeNodeOption.prototype._handleBlur = function () {
        this._hasFocus = false;
    };
    McTreeNodeOption.prototype._handleClick = function () {
        if (this.disabled) {
            return;
        }
        this.treeSelection.setFocusedOption(this);
    };
    var McTreeNodeOption_1;
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], McTreeNodeOption.prototype, "role", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McTreeNodeOption.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McTreeNodeOption.prototype, "selected", null);
    McTreeNodeOption = McTreeNodeOption_1 = __decorate([
        Directive({
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
                { provide: CdkTreeNode, useExisting: McTreeNodeOption_1 }
            ]
        }),
        __param(1, Inject(forwardRef(function () { return McTreeSelection; }))),
        __metadata("design:paramtypes", [ElementRef,
            McTreeSelection])
    ], McTreeNodeOption);
    return McTreeNodeOption;
}(CdkTreeNode));
var _McTreeSelectionBase = mixinTabIndex(mixinDisabled(CdkTree));
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
    function McTreeSelection(_elementRef, _differs, _changeDetectorRef, tabIndex, multiple, autoSelect, noUnselect) {
        var _this = _super.call(this, _differs, _changeDetectorRef) || this;
        _this._elementRef = _elementRef;
        _this._disabled = false;
        _this.navigationChange = new EventEmitter();
        _this.selectionChange = new EventEmitter();
        _this.tabIndex = parseInt(tabIndex) || 0;
        _this.multiple = multiple === null ? true : toBoolean(multiple);
        _this.autoSelect = autoSelect === null ? true : toBoolean(autoSelect);
        _this.noUnselect = noUnselect === null ? true : toBoolean(noUnselect);
        _this.selectedOptions = new SelectionModel(_this.multiple);
        return _this;
    }
    McTreeSelection_1 = McTreeSelection;
    Object.defineProperty(McTreeSelection.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (rawValue) {
            var value = toBoolean(rawValue);
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
    McTreeSelection.prototype._onKeyDown = function (event) {
        var keyCode = event.keyCode;
        this.withShift = event.shiftKey;
        this.withCtrl = event.ctrlKey;
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
                this._keyManager.setFirstItemActive();
                event.preventDefault();
                break;
            case END:
                this._keyManager.setLastItemActive();
                event.preventDefault();
                break;
            case PAGE_UP:
                this._keyManager.setPreviousPageItemActive();
                event.preventDefault();
                break;
            case PAGE_DOWN:
                this._keyManager.setNextPageItemActive();
                event.preventDefault();
                break;
            default:
                this._keyManager.onKeydown(event);
        }
    };
    McTreeSelection.prototype.ngAfterContentInit = function () {
        this._keyManager = new FocusKeyManager(this.options)
            .withTypeAhead()
            .withVerticalOrientation(true)
            .withHorizontalOrientation(null);
    };
    McTreeSelection.prototype.updateScrollSize = function () {
        if (!this.options.first) {
            return;
        }
        this._keyManager.withScrollSize(Math.floor(this._getHeight() / this.options.first._getHeight()));
    };
    McTreeSelection.prototype.setFocusedOption = function (option) {
        this._keyManager.updateActiveItem(option);
        if (this.withShift && this.multiple) {
            var previousIndex_1 = this._keyManager.previousActiveItemIndex;
            var activeIndex_1 = this._keyManager.activeItemIndex;
            if (previousIndex_1 < activeIndex_1) {
                this.options.forEach(function (item, index) {
                    if (index >= previousIndex_1 && index <= activeIndex_1) {
                        item.setSelected(true);
                    }
                });
            }
            else {
                this.options.forEach(function (item, index) {
                    if (index >= activeIndex_1 && index <= previousIndex_1) {
                        item.setSelected(true);
                    }
                });
            }
            this.withShift = false;
        }
        else if (this.withCtrl) {
            this.withCtrl = false;
            if (!this._canDeselectLast(option)) {
                return;
            }
            option.toggle();
        }
        else {
            if (this.autoSelect) {
                this.options.forEach(function (item) { return item.setSelected(false); });
                option.setSelected(true);
            }
        }
        this._emitNavigationEvent(option);
    };
    // Toggles the selected state of the currently focused option.
    McTreeSelection.prototype.toggleFocusedOption = function () {
        var focusedIndex = this._keyManager.activeItemIndex;
        if (focusedIndex != null && this._isValidIndex(focusedIndex)) {
            var focusedOption = this.options.toArray()[focusedIndex];
            if (focusedOption && this._canDeselectLast(focusedOption)) {
                focusedOption.toggle();
                // Emit a change event because the focused option changed its state through user interaction.
                this._emitChangeEvent(focusedOption);
            }
        }
    };
    McTreeSelection.prototype.renderNodeChanges = function (data, dataDiffer, viewContainer, parentData) {
        if (dataDiffer === void 0) { dataDiffer = this._dataDiffer; }
        if (viewContainer === void 0) { viewContainer = this._nodeOutlet.viewContainer; }
        _super.prototype.renderNodeChanges.call(this, data, dataDiffer, viewContainer, parentData);
        var arrayOfInstances = [];
        viewContainer._embeddedViews.forEach(function (view) {
            var viewDef = view.def;
            viewDef.nodes.forEach(function (node) {
                if (viewDef.nodeMatchedQueries === node.matchedQueryIds) {
                    var nodeData = view.nodes[node.nodeIndex];
                    arrayOfInstances.push(nodeData.instance);
                }
            });
        });
        if (this.options) {
            this.options.reset(arrayOfInstances);
            this.options.notifyOnChanges();
        }
        this.updateScrollSize();
    };
    McTreeSelection.prototype._getHeight = function () {
        return this._elementRef.nativeElement.getClientRects()[0].height;
    };
    McTreeSelection.prototype._emitNavigationEvent = function (option) {
        this.navigationChange.emit(new McTreeNavigationChange(this, option));
    };
    McTreeSelection.prototype._emitChangeEvent = function (option) {
        this.selectionChange.emit(new McTreeNavigationChange(this, option));
    };
    /**
     * Utility to ensure all indexes are valid.
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of options.
     */
    McTreeSelection.prototype._isValidIndex = function (index) {
        return index >= 0 && index < this.options.length;
    };
    McTreeSelection.prototype._canDeselectLast = function (option) {
        return !(this.noUnselect && this.selectedOptions.selected.length === 1 && option.selected);
    };
    var McTreeSelection_1;
    __decorate([
        ViewChild(CdkTreeNodeOutlet),
        __metadata("design:type", CdkTreeNodeOutlet)
    ], McTreeSelection.prototype, "_nodeOutlet", void 0);
    __decorate([
        ContentChildren(forwardRef(function () { return McTreeNodeOption; })),
        __metadata("design:type", QueryList)
    ], McTreeSelection.prototype, "options", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McTreeSelection.prototype, "disabled", null);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], McTreeSelection.prototype, "navigationChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], McTreeSelection.prototype, "selectionChange", void 0);
    McTreeSelection = McTreeSelection_1 = __decorate([
        Component({
            exportAs: 'mcTreeSelection',
            selector: 'mc-tree-selection',
            template: "<ng-container cdkTreeNodeOutlet></ng-container>",
            host: {
                '[tabIndex]': 'tabIndex',
                class: 'mc-tree-selection',
                role: 'tree-selection',
                '(keydown)': '_onKeyDown($event)',
                '(window:resize)': 'updateScrollSize()'
            },
            styles: [".mc-tree-selection{display:block;border:1px solid red}.mc-tree-node{display:flex;align-items:center;height:28px;word-wrap:break-word;border:2px solid transparent}.mc-tree-node>.mc-icon{margin-right:4px;cursor:pointer}.mc-tree-node:focus{outline:0}.mc-tree-node:not([disabled]){cursor:pointer}.mc-icon-rotate_90{transform:rotate(90deg)}.mc-icon-rotate_180{transform:rotate(180deg)}.mc-icon-rotate_270{transform:rotate(270deg)}"],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [{ provide: CdkTree, useExisting: McTreeSelection_1 }]
        }),
        __param(3, Attribute('tabindex')),
        __param(4, Attribute('multiple')),
        __param(5, Attribute('auto-select')),
        __param(6, Attribute('no-unselect')),
        __metadata("design:paramtypes", [ElementRef,
            IterableDiffers,
            ChangeDetectorRef, String, String, String, String])
    ], McTreeSelection);
    return McTreeSelection;
}(_McTreeSelectionBase));

var MC_TREE_DIRECTIVES = [
    McTreeNodeDef,
    McTreeNodePadding,
    McTreeSelection,
    McTreeNodeOption
];
var McTreeModule = /** @class */ (function () {
    function McTreeModule() {
    }
    McTreeModule = __decorate([
        NgModule({
            imports: [CommonModule, CdkTreeModule],
            exports: MC_TREE_DIRECTIVES,
            declarations: MC_TREE_DIRECTIVES
        })
    ], McTreeModule);
    return McTreeModule;
}());

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
    McTreeFlattener.prototype._flattenNode = function (node, level, resultNodes, parentMap) {
        var _this = this;
        var flatNode = this.transformFunction(node, level);
        resultNodes.push(flatNode);
        if (this.isExpandable(flatNode)) {
            this.getChildren(node).pipe(take(1)).subscribe(function (children) {
                children.forEach(function (child, index) {
                    var childParentMap = parentMap.slice();
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
    McTreeFlattener.prototype.flattenNodes = function (structuredData) {
        var _this = this;
        var resultNodes = [];
        structuredData.forEach(function (node) { return _this._flattenNode(node, 0, resultNodes, []); });
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
        _this._flattenedData = new BehaviorSubject([]);
        _this._expandedData = new BehaviorSubject([]);
        _this._data = new BehaviorSubject(initialData);
        return _this;
    }
    Object.defineProperty(McTreeFlatDataSource.prototype, "data", {
        get: function () {
            return this._data.value;
        },
        set: function (value) {
            this._data.next(value);
            this._flattenedData.next(this.treeFlattener.flattenNodes(this.data));
            this.treeControl.dataNodes = this._flattenedData.value;
        },
        enumerable: true,
        configurable: true
    });
    McTreeFlatDataSource.prototype.connect = function (collectionViewer) {
        var _this = this;
        var changes = [
            collectionViewer.viewChange,
            this.treeControl.expansionModel.onChange,
            this._flattenedData
        ];
        return merge.apply(void 0, changes).pipe(map(function () {
            _this._expandedData.next(_this.treeFlattener.expandFlattenedNodes(_this._flattenedData.value, _this.treeControl));
            return _this._expandedData.value;
        }));
    };
    McTreeFlatDataSource.prototype.disconnect = function () {
        // no op
    };
    return McTreeFlatDataSource;
}(DataSource));

/**
 * Data source for nested tree.
 *
 * The data source for nested tree doesn't have to consider node flattener, or the way to expand
 * or collapse. The expansion/collapsion will be handled by ITreeControl and each non-leaf node.
 */
var McTreeNestedDataSource = /** @class */ (function (_super) {
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
        get: function () {
            return this._data.value;
        },
        set: function (value) {
            this._data.next(value);
        },
        enumerable: true,
        configurable: true
    });
    McTreeNestedDataSource.prototype.connect = function (collectionViewer) {
        var _this = this;
        return merge.apply(void 0, [collectionViewer.viewChange, this._data]).pipe(map(function () { return _this.data; }));
    };
    McTreeNestedDataSource.prototype.disconnect = function () {
        // no op
    };
    return McTreeNestedDataSource;
}(DataSource));

/**
 * Generated bundle index. Do not edit.
 */

export { McTreeModule, McTreeNodeDef, McTreeNodePadding, McTreeNodeOption, _McTreeSelectionBase, McTreeNavigationChange, McTreeSelectionChange, McTreeSelection, McTreeFlattener, McTreeFlatDataSource, McTreeNestedDataSource };
//# sourceMappingURL=tree.es5.js.map
