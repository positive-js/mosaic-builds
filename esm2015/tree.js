/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __metadata, __param } from 'tslib';
import { Directive, Input, Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, forwardRef, IterableDiffers, Output, QueryList, ViewChild, ViewEncapsulation, ElementRef, Inject, NgModule } from '@angular/core';
import { CdkTreeNodeDef, CdkTreeNodePadding, CdkTreeNode, CdkTree, CdkTreeNodeOutlet, CdkTreeModule } from '@ptsecurity/cdk/tree';
import { SelectionModel, DataSource } from '@ptsecurity/cdk/collections';
import { mixinDisabled, mixinTabIndex, toBoolean } from '@ptsecurity/mosaic/core';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, SPACE } from '@ptsecurity/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, merge } from 'rxjs';
import { map, take } from 'rxjs/operators';

var McTreeNodeDef_1;
let McTreeNodeDef = McTreeNodeDef_1 = class McTreeNodeDef extends CdkTreeNodeDef {
};
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

var McTreeNodePadding_1;
let McTreeNodePadding = McTreeNodePadding_1 = class McTreeNodePadding extends CdkTreeNodePadding {
    constructor() {
        super(...arguments);
        this._baseLeftPadding = 6;
        this._iconWidth = 20;
        this._indent = 16;
    }
    get leftPadding() {
        return (this._withIcon ? 0 : this._iconWidth) + this._baseLeftPadding;
    }
    _paddingIndent() {
        const nodeLevel = (this._treeNode.data && this._tree.treeControl.getLevel)
            ? this._tree.treeControl.getLevel(this._treeNode.data)
            : null;
        const level = this._level || nodeLevel;
        return level ? `${(level * this._indent) + this.leftPadding}px` : `${this._baseLeftPadding}px`;
    }
    ngOnInit() {
        this._withIcon = this._tree.treeControl.isExpandable(this._treeNode.data);
        this._setPadding();
    }
};
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

var McTreeNodeOption_1, McTreeSelection_1;
/**
 * Wrapper for the CdkTree node with Material design styles.
 */
let McTreeNodeOption = McTreeNodeOption_1 = class McTreeNodeOption extends CdkTreeNode {
    constructor(_elementRef, treeSelection) {
        super(_elementRef, treeSelection);
        this._elementRef = _elementRef;
        this.treeSelection = treeSelection;
        this.role = 'treeitem';
        this._hasFocus = false;
        this._disabled = false;
        this._selected = false;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        const newValue = toBoolean(value);
        if (newValue !== this._disabled) {
            this._disabled = newValue;
        }
    }
    get selected() {
        return this.treeSelection.selectedOptions && this.treeSelection.selectedOptions.isSelected(this) || false;
    }
    set selected(value) {
        const isSelected = toBoolean(value);
        if (isSelected !== this._selected) {
            this.setSelected(isSelected);
            // this.treeSelection._reportValueChange();
        }
    }
    focus() {
        this._elementRef.nativeElement.focus();
        this.treeSelection.setFocusedOption(this);
    }
    toggle() {
        this.selected = !this.selected;
    }
    setSelected(selected) {
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
    }
    _getHeight() {
        return this._elementRef.nativeElement.getClientRects()[0].height;
    }
    _handleFocus() {
        if (this.disabled || this._hasFocus) {
            return;
        }
        this._hasFocus = true;
    }
    _handleBlur() {
        this._hasFocus = false;
    }
    _handleClick() {
        if (this.disabled) {
            return;
        }
        this.treeSelection.setFocusedOption(this);
    }
};
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
    __param(1, Inject(forwardRef(() => McTreeSelection))),
    __metadata("design:paramtypes", [ElementRef,
        McTreeSelection])
], McTreeNodeOption);
const _McTreeSelectionBase = mixinTabIndex(mixinDisabled(CdkTree));
class McTreeNavigationChange {
    constructor(source, option) {
        this.source = source;
        this.option = option;
    }
}
class McTreeSelectionChange {
    constructor(source, option) {
        this.source = source;
        this.option = option;
    }
}
let McTreeSelection = McTreeSelection_1 = class McTreeSelection extends _McTreeSelectionBase {
    constructor(_elementRef, _differs, _changeDetectorRef, tabIndex, multiple, autoSelect, noUnselect) {
        super(_differs, _changeDetectorRef);
        this._elementRef = _elementRef;
        this._disabled = false;
        this.navigationChange = new EventEmitter();
        this.selectionChange = new EventEmitter();
        this.tabIndex = parseInt(tabIndex) || 0;
        this.multiple = multiple === null ? true : toBoolean(multiple);
        this.autoSelect = autoSelect === null ? true : toBoolean(autoSelect);
        this.noUnselect = noUnselect === null ? true : toBoolean(noUnselect);
        this.selectedOptions = new SelectionModel(this.multiple);
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(rawValue) {
        const value = toBoolean(rawValue);
        if (this._disabled !== value) {
            this._disabled = value;
            if (this._disabled) {
                console.log('need disable all options');
            }
            else {
                console.log('need enable all options');
            }
        }
    }
    _onKeyDown(event) {
        const keyCode = event.keyCode;
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
    }
    ngAfterContentInit() {
        this._keyManager = new FocusKeyManager(this.options)
            .withTypeAhead()
            .withVerticalOrientation(true)
            .withHorizontalOrientation(null);
    }
    updateScrollSize() {
        if (!this.options.first) {
            return;
        }
        this._keyManager.withScrollSize(Math.floor(this._getHeight() / this.options.first._getHeight()));
    }
    setFocusedOption(option) {
        this._keyManager.updateActiveItem(option);
        if (this.withShift && this.multiple) {
            const previousIndex = this._keyManager.previousActiveItemIndex;
            const activeIndex = this._keyManager.activeItemIndex;
            if (previousIndex < activeIndex) {
                this.options.forEach((item, index) => {
                    if (index >= previousIndex && index <= activeIndex) {
                        item.setSelected(true);
                    }
                });
            }
            else {
                this.options.forEach((item, index) => {
                    if (index >= activeIndex && index <= previousIndex) {
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
                this.options.forEach((item) => item.setSelected(false));
                option.setSelected(true);
            }
        }
        this._emitNavigationEvent(option);
    }
    // Toggles the selected state of the currently focused option.
    toggleFocusedOption() {
        const focusedIndex = this._keyManager.activeItemIndex;
        if (focusedIndex != null && this._isValidIndex(focusedIndex)) {
            const focusedOption = this.options.toArray()[focusedIndex];
            if (focusedOption && this._canDeselectLast(focusedOption)) {
                focusedOption.toggle();
                // Emit a change event because the focused option changed its state through user interaction.
                this._emitChangeEvent(focusedOption);
            }
        }
    }
    renderNodeChanges(data, dataDiffer = this._dataDiffer, viewContainer = this._nodeOutlet.viewContainer, parentData) {
        super.renderNodeChanges(data, dataDiffer, viewContainer, parentData);
        const arrayOfInstances = [];
        viewContainer._embeddedViews.forEach((view) => {
            const viewDef = view.def;
            viewDef.nodes.forEach((node) => {
                if (viewDef.nodeMatchedQueries === node.matchedQueryIds) {
                    const nodeData = view.nodes[node.nodeIndex];
                    arrayOfInstances.push(nodeData.instance);
                }
            });
        });
        if (this.options) {
            this.options.reset(arrayOfInstances);
            this.options.notifyOnChanges();
        }
        this.updateScrollSize();
    }
    _getHeight() {
        return this._elementRef.nativeElement.getClientRects()[0].height;
    }
    _emitNavigationEvent(option) {
        this.navigationChange.emit(new McTreeNavigationChange(this, option));
    }
    _emitChangeEvent(option) {
        this.selectionChange.emit(new McTreeNavigationChange(this, option));
    }
    /**
     * Utility to ensure all indexes are valid.
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of options.
     */
    _isValidIndex(index) {
        return index >= 0 && index < this.options.length;
    }
    _canDeselectLast(option) {
        return !(this.noUnselect && this.selectedOptions.selected.length === 1 && option.selected);
    }
};
__decorate([
    ViewChild(CdkTreeNodeOutlet),
    __metadata("design:type", CdkTreeNodeOutlet)
], McTreeSelection.prototype, "_nodeOutlet", void 0);
__decorate([
    ContentChildren(forwardRef(() => McTreeNodeOption)),
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
        template: `<ng-container cdkTreeNodeOutlet></ng-container>`,
        host: {
            '[tabIndex]': 'tabIndex',
            class: 'mc-tree-selection',
            role: 'tree-selection',
            '(keydown)': '_onKeyDown($event)',
            '(window:resize)': 'updateScrollSize()'
        },
        styles: [".mc-tree-selection{display:block}.mc-tree-node{display:flex;align-items:center;height:28px;word-wrap:break-word;border:2px solid transparent}.mc-tree-node>.mc-icon{margin-right:4px;cursor:pointer}.mc-tree-node:focus{outline:0}.mc-tree-node:not([disabled]){cursor:pointer}.mc-icon-rotate_90{transform:rotate(90deg)}.mc-icon-rotate_180{transform:rotate(180deg)}.mc-icon-rotate_270{transform:rotate(270deg)}"],
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

const MC_TREE_DIRECTIVES = [
    McTreeNodeDef,
    McTreeNodePadding,
    McTreeSelection,
    McTreeNodeOption
];
let McTreeModule = class McTreeModule {
};
McTreeModule = __decorate([
    NgModule({
        imports: [CommonModule, CdkTreeModule],
        exports: MC_TREE_DIRECTIVES,
        declarations: MC_TREE_DIRECTIVES
    })
], McTreeModule);

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
class McTreeFlattener {
    constructor(transformFunction, getLevel, isExpandable, getChildren) {
        this.transformFunction = transformFunction;
        this.getLevel = getLevel;
        this.isExpandable = isExpandable;
        this.getChildren = getChildren;
    }
    _flattenNode(node, level, resultNodes, parentMap) {
        const flatNode = this.transformFunction(node, level);
        resultNodes.push(flatNode);
        if (this.isExpandable(flatNode)) {
            this.getChildren(node).pipe(take(1)).subscribe((children) => {
                children.forEach((child, index) => {
                    const childParentMap = parentMap.slice();
                    childParentMap.push(index !== children.length - 1);
                    this._flattenNode(child, level + 1, resultNodes, childParentMap);
                });
            });
        }
        return resultNodes;
    }
    /**
     * Flatten a list of node type T to flattened version of node F.
     * Please note that type T may be nested, and the length of `structuredData` may be different
     * from that of returned list `F[]`.
     */
    flattenNodes(structuredData) {
        const resultNodes = [];
        structuredData.forEach((node) => this._flattenNode(node, 0, resultNodes, []));
        return resultNodes;
    }
    /**
     * Expand flattened node with current expansion status.
     * The returned list may have different length.
     */
    expandFlattenedNodes(nodes, treeControl) {
        const results = [];
        const currentExpand = [];
        currentExpand[0] = true;
        nodes.forEach((node) => {
            let expand = true;
            for (let i = 0; i <= this.getLevel(node); i++) {
                expand = expand && currentExpand[i];
            }
            if (expand) {
                results.push(node);
            }
            if (this.isExpandable(node)) {
                currentExpand[this.getLevel(node) + 1] = treeControl.isExpanded(node);
            }
        });
        return results;
    }
}
/**
 * Data source for flat tree.
 * The data source need to handle expansion/collapsion of the tree node and change the data feed
 * to `McTree`.
 * The nested tree nodes of type `T` are flattened through `MсTreeFlattener`, and converted
 * to type `F` for `McTree` to consume.
 */
class McTreeFlatDataSource extends DataSource {
    constructor(treeControl, treeFlattener, initialData = []) {
        super();
        this.treeControl = treeControl;
        this.treeFlattener = treeFlattener;
        this._flattenedData = new BehaviorSubject([]);
        this._expandedData = new BehaviorSubject([]);
        this._data = new BehaviorSubject(initialData);
    }
    get data() {
        return this._data.value;
    }
    set data(value) {
        this._data.next(value);
        this._flattenedData.next(this.treeFlattener.flattenNodes(this.data));
        this.treeControl.dataNodes = this._flattenedData.value;
    }
    connect(collectionViewer) {
        const changes = [
            collectionViewer.viewChange,
            this.treeControl.expansionModel.onChange,
            this._flattenedData
        ];
        return merge(...changes).pipe(map(() => {
            this._expandedData.next(this.treeFlattener.expandFlattenedNodes(this._flattenedData.value, this.treeControl));
            return this._expandedData.value;
        }));
    }
    disconnect() {
        // no op
    }
}

/**
 * Data source for nested tree.
 *
 * The data source for nested tree doesn't have to consider node flattener, or the way to expand
 * or collapse. The expansion/collapsion will be handled by ITreeControl and each non-leaf node.
 */
class McTreeNestedDataSource extends DataSource {
    constructor() {
        super(...arguments);
        this._data = new BehaviorSubject([]);
    }
    /**
     * Data for the nested tree
     */
    get data() {
        return this._data.value;
    }
    set data(value) {
        this._data.next(value);
    }
    connect(collectionViewer) {
        return merge(...[collectionViewer.viewChange, this._data])
            .pipe(map(() => this.data));
    }
    disconnect() {
        // no op
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { McTreeModule, McTreeNodeDef, McTreeNodePadding, McTreeNodeOption, _McTreeSelectionBase, McTreeNavigationChange, McTreeSelectionChange, McTreeSelection, McTreeFlattener, McTreeFlatDataSource, McTreeNestedDataSource };
//# sourceMappingURL=tree.js.map
