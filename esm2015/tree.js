/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __metadata, __param } from 'tslib';
import { Directive, Input, ChangeDetectorRef, Component, EventEmitter, Output, ElementRef, Inject, Optional, InjectionToken, Attribute, ChangeDetectionStrategy, ContentChildren, IterableDiffers, QueryList, ViewChild, ViewEncapsulation, NgModule } from '@angular/core';
import { CdkTreeNodeDef, CdkTreeNodePadding, CdkTreeNodeToggle, CdkTreeNode, CdkTree, CdkTreeNodeOutlet, CdkTreeModule } from '@ptsecurity/cdk/tree';
import { toBoolean, mixinDisabled, mixinTabIndex, McPseudoCheckboxModule } from '@ptsecurity/mosaic/core';
import { ActiveDescendantKeyManager } from '@ptsecurity/cdk/a11y';
import { SelectionModel, DataSource } from '@ptsecurity/cdk/collections';
import { END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, SPACE } from '@ptsecurity/cdk/keycodes';
import { Subject, BehaviorSubject, merge } from 'rxjs';
import { CommonModule } from '@angular/common';
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
        this.baseLeftPadding = 12;
        /* tslint:disable-next-line:naming-convention */
        this._indent = 20;
        this.iconWidth = 20;
    }
    get leftPadding() {
        return (this.withIcon ? 0 : this.iconWidth) + this.baseLeftPadding;
    }
    paddingIndent() {
        const nodeLevel = (this.treeNode.data && this.tree.treeControl.getLevel)
            ? this.tree.treeControl.getLevel(this.treeNode.data)
            : null;
        const level = this.level || nodeLevel;
        return level ? `${(level * this._indent) + this.leftPadding}px` : `${this.baseLeftPadding}px`;
    }
    ngOnInit() {
        this.withIcon = this.tree.treeControl.isExpandable(this.treeNode.data);
        this.setPadding();
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

var McTreeNodeToggle_1;
let McTreeNodeToggle = McTreeNodeToggle_1 = class McTreeNodeToggle extends CdkTreeNodeToggle {
};
McTreeNodeToggle = McTreeNodeToggle_1 = __decorate([
    Directive({
        selector: '[mcTreeNodeToggle]',
        host: {
            '(click)': 'toggle($event)'
        },
        providers: [{ provide: CdkTreeNodeToggle, useExisting: McTreeNodeToggle_1 }]
    })
], McTreeNodeToggle);

var McTreeOption_1;
/**
 * Injection token used to provide the parent component to options.
 */
const MC_TREE_OPTION_PARENT_COMPONENT = new InjectionToken('MC_TREE_OPTION_PARENT_COMPONENT');
class McTreeOptionChange {
    constructor(source, isUserInput = false) {
        this.source = source;
        this.isUserInput = isUserInput;
    }
}
let uniqueIdCounter = 0;
let McTreeOption = McTreeOption_1 = class McTreeOption extends CdkTreeNode {
    constructor(elementRef, changeDetectorRef, parent) {
        // todo any
        super(elementRef, parent);
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this.parent = parent;
        this.onSelectionChange = new EventEmitter();
        this._disabled = false;
        this._selected = false;
        this._active = false;
        this._id = `mc-tree-option-${uniqueIdCounter++}`;
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
    // @Input()
    // get selected(): boolean {
    //     return this.treeSelection.selectionModel && this.treeSelection.selectionModel.isSelected(this) || false;
    // }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        const isSelected = toBoolean(value);
        if (isSelected !== this._selected) {
            this.setSelected(isSelected);
            // this.treeSelection._reportValueChange();
        }
    }
    /**
     * Whether or not the option is currently active and ready to be selected.
     * An active option displays styles as if it is focused, but the
     * focus is actually retained somewhere else. This comes in handy
     * for components like autocomplete where focus must remain on the input.
     */
    get active() {
        return this._active;
    }
    get id() {
        return this._id;
    }
    get multiple() {
        return this.parent.multiple;
    }
    toggle() {
        this.selected = !this.selected;
    }
    setSelected(selected) {
        if (this._selected === selected || !this.parent.selectionModel) {
            return;
        }
        this._selected = selected;
        if (selected) {
            this.parent.selectionModel.select(this);
        }
        else {
            this.parent.selectionModel.deselect(this);
        }
        // this._changeDetector.markForCheck();
    }
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setActiveStyles() {
        if (!this._active) {
            this._active = true;
            this.changeDetectorRef.markForCheck();
        }
    }
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setInactiveStyles() {
        if (this._active) {
            this._active = false;
            this.changeDetectorRef.markForCheck();
        }
    }
    getHeight() {
        const clientRects = this.elementRef.nativeElement.getClientRects();
        if (clientRects.length) {
            return clientRects[0].height;
        }
        return 0;
    }
    focus() {
        const element = this.getHostElement();
        if (typeof element.focus === 'function') {
            element.focus();
        }
    }
    // todo старая реализация, нужно восстановить tree-selection
    // handleClick(): void {
    //     if (this.disabled) { return; }
    //
    //     this.treeSelection.setFocusedOption(this);
    // }
    /**
     * The displayed value of the option. It is necessary to show the selected option in the
     * select's trigger.
     */
    get viewValue() {
        // TODO(kara): Add input property alternative for node envs.
        return (this.getHostElement().textContent || '').trim();
    }
    select() {
        if (!this._selected) {
            this._selected = true;
            this.changeDetectorRef.markForCheck();
        }
    }
    deselect() {
        if (this._selected) {
            this._selected = false;
            this.changeDetectorRef.markForCheck();
        }
    }
    selectViaInteraction() {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent(true);
            if (this.parent.setFocusedOption) {
                this.parent.setFocusedOption(this);
            }
        }
    }
    emitSelectionChangeEvent(isUserInput = false) {
        this.onSelectionChange.emit(new McTreeOptionChange(this, isUserInput));
    }
    getHostElement() {
        return this.elementRef.nativeElement;
    }
    getTabIndex() {
        return this.disabled ? '-1' : '0';
    }
};
__decorate([
    Output(),
    __metadata("design:type", Object)
], McTreeOption.prototype, "onSelectionChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], McTreeOption.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], McTreeOption.prototype, "disabled", null);
McTreeOption = McTreeOption_1 = __decorate([
    Component({
        selector: 'mc-tree-option',
        exportAs: 'mcTreeOption',
        host: {
            '[attr.id]': 'id',
            '[attr.tabindex]': 'getTabIndex()',
            '[attr.disabled]': 'disabled || null',
            class: 'mc-tree-option',
            '[class.mc-selected]': 'selected',
            '[class.mc-active]': 'active',
            '(click)': 'selectViaInteraction()'
        },
        template: "<ng-content select=\"[mc-icon]\"></ng-content><mc-pseudo-checkbox *ngIf=\"multiple\" [state]=\"selected ? 'checked' : ''\" [disabled]=\"disabled\"></mc-pseudo-checkbox><span class=\"mc-option-text\"><ng-content></ng-content></span><div class=\"mc-option-overlay\"></div>",
        providers: [{ provide: CdkTreeNode, useExisting: McTreeOption_1 }]
    }),
    __param(2, Optional()), __param(2, Inject(MC_TREE_OPTION_PARENT_COMPONENT)),
    __metadata("design:paramtypes", [ElementRef,
        ChangeDetectorRef, Object])
], McTreeOption);

var McTreeSelection_1;
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
class McTreeSelectionBase extends CdkTree {
    constructor(differs, changeDetectorRef) {
        super(differs, changeDetectorRef);
    }
}
/* tslint:disable-next-line:naming-convention */
const McTreeSelectionBaseMixin = mixinTabIndex(mixinDisabled(McTreeSelectionBase));
let McTreeSelection = McTreeSelection_1 = class McTreeSelection extends McTreeSelectionBaseMixin {
    constructor(elementRef, differs, changeDetectorRef, tabIndex, multiple, autoSelect, noUnselect) {
        super(differs, changeDetectorRef);
        this.elementRef = elementRef;
        this.navigationChange = new EventEmitter();
        this.selectionChange = new EventEmitter();
        this._disabled = false;
        this.destroy = new Subject();
        this.tabIndex = parseInt(tabIndex) || 0;
        this.multiple = multiple === null ? false : toBoolean(multiple);
        this.autoSelect = autoSelect === null ? true : toBoolean(autoSelect);
        this.noUnselect = noUnselect === null ? true : toBoolean(noUnselect);
        this.selectionModel = new SelectionModel(this.multiple);
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(rawValue) {
        const value = toBoolean(rawValue);
        if (this._disabled !== value) {
            this._disabled = value;
            if (this._disabled) {
                /* tslint:disable-next-line:no-console */
                console.log('need disable all options');
            }
            else {
                /* tslint:disable-next-line:no-console */
                console.log('need enable all options');
            }
        }
    }
    ngAfterContentInit() {
        this.keyManager = new ActiveDescendantKeyManager(this.options)
            // .withTypeAhead()
            .withVerticalOrientation(true)
            .withHorizontalOrientation(null);
    }
    ngOnDestroy() {
        this.destroy.next();
        this.destroy.complete();
    }
    onKeyDown(event) {
        const keyCode = event.keyCode;
        this.withShift = event.shiftKey;
        this.withCtrl = event.ctrlKey;
        switch (keyCode) {
            case LEFT_ARROW:
                if (this.keyManager.activeItem) {
                    this.treeControl.collapse(this.keyManager.activeItem.data);
                }
                event.preventDefault();
                break;
            case RIGHT_ARROW:
                if (this.keyManager.activeItem) {
                    this.treeControl.expand(this.keyManager.activeItem.data);
                }
                event.preventDefault();
                break;
            case SPACE:
            case ENTER:
                this.toggleFocusedOption();
                event.preventDefault();
                break;
            case HOME:
                this.keyManager.setFirstItemActive();
                event.preventDefault();
                break;
            case END:
                this.keyManager.setLastItemActive();
                event.preventDefault();
                break;
            case PAGE_UP:
                this.keyManager.setPreviousPageItemActive();
                event.preventDefault();
                break;
            case PAGE_DOWN:
                this.keyManager.setNextPageItemActive();
                event.preventDefault();
                break;
            default:
                this.keyManager.onKeydown(event);
        }
    }
    updateScrollSize() {
        if (!this.options.first) {
            return;
        }
        this.keyManager.withScrollSize(Math.floor(this.getHeight() / this.options.first.getHeight()));
    }
    setFocusedOption(option) {
        this.keyManager.setActiveItem(option);
        if (this.withShift && this.multiple) {
            const previousIndex = this.keyManager.previousActiveItemIndex;
            const activeIndex = this.keyManager.activeItemIndex;
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
            if (!this.canDeselectLast(option)) {
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
        this.emitNavigationEvent(option);
    }
    toggleFocusedOption() {
        const focusedIndex = this.keyManager.activeItemIndex;
        if (focusedIndex != null && this.isValidIndex(focusedIndex)) {
            const focusedOption = this.options.toArray()[focusedIndex];
            if (focusedOption && this.canDeselectLast(focusedOption)) {
                focusedOption.toggle();
                // Emit a change event because the focused option changed its state through user interaction.
                this.emitChangeEvent(focusedOption);
            }
        }
    }
    renderNodeChanges(data, dataDiffer = this.dataDiffer, viewContainer = this.nodeOutlet.viewContainer, parentData) {
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
    getHeight() {
        const clientRects = this.elementRef.nativeElement.getClientRects();
        if (clientRects.length) {
            return clientRects[0].height;
        }
        return 0;
    }
    emitNavigationEvent(option) {
        this.navigationChange.emit(new McTreeNavigationChange(this, option));
    }
    emitChangeEvent(option) {
        this.selectionChange.emit(new McTreeNavigationChange(this, option));
    }
    isValidIndex(index) {
        return index >= 0 && index < this.options.length;
    }
    canDeselectLast(option) {
        return !(this.noUnselect && this.selectionModel.selected.length === 1 && option.selected);
    }
};
__decorate([
    ViewChild(CdkTreeNodeOutlet),
    __metadata("design:type", CdkTreeNodeOutlet)
], McTreeSelection.prototype, "nodeOutlet", void 0);
__decorate([
    ContentChildren(McTreeOption),
    __metadata("design:type", QueryList)
], McTreeSelection.prototype, "options", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], McTreeSelection.prototype, "navigationChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], McTreeSelection.prototype, "selectionChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], McTreeSelection.prototype, "disabled", null);
McTreeSelection = McTreeSelection_1 = __decorate([
    Component({
        selector: 'mc-tree-selection',
        exportAs: 'mcTreeSelection',
        template: `<ng-container cdkTreeNodeOutlet></ng-container>`,
        host: {
            class: 'mc-tree-selection',
            '[attr.tabindex]': 'tabIndex',
            '(keydown)': 'onKeyDown($event)',
            '(window:resize)': 'updateScrollSize()'
        },
        styles: [".mc-tree-selection{display:block}.mc-tree-option{display:flex;align-items:center;height:28px;word-wrap:break-word;border:2px solid transparent}.mc-tree-option>.mc-icon{margin-right:4px;cursor:pointer}.mc-tree-option:focus{outline:0}.mc-tree-option:not([disabled]){cursor:pointer}.mc-tree-option .mc-pseudo-checkbox{margin-right:8px}.mc-icon-rotate_90{transform:rotate(90deg)}.mc-icon-rotate_180{transform:rotate(180deg)}.mc-icon-rotate_270{transform:rotate(270deg)}"],
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        providers: [
            { provide: MC_TREE_OPTION_PARENT_COMPONENT, useExisting: McTreeSelection_1 },
            { provide: CdkTree, useExisting: McTreeSelection_1 }
        ]
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
    McTreeSelection,
    McTreeOption,
    McTreeNodeDef,
    McTreeNodePadding,
    McTreeNodeToggle
];
let McTreeModule = class McTreeModule {
};
McTreeModule = __decorate([
    NgModule({
        imports: [CommonModule, CdkTreeModule, McPseudoCheckboxModule],
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
    flattenNode(node, level, resultNodes, parentMap) {
        const flatNode = this.transformFunction(node, level);
        resultNodes.push(flatNode);
        if (this.isExpandable(flatNode)) {
            this.getChildren(node)
                .pipe(take(1))
                .subscribe((children) => {
                children.forEach((child, index) => {
                    const childParentMap = parentMap.slice();
                    childParentMap.push(index !== children.length - 1);
                    this.flattenNode(child, level + 1, resultNodes, childParentMap);
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
        structuredData.forEach((node) => this.flattenNode(node, 0, resultNodes, []));
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
        this.flattenedData = new BehaviorSubject([]);
        this.expandedData = new BehaviorSubject([]);
        this._data = new BehaviorSubject(initialData);
    }
    get data() {
        return this._data.value;
    }
    set data(value) {
        this._data.next(value);
        this.flattenedData.next(this.treeFlattener.flattenNodes(this.data));
        this.treeControl.dataNodes = this.flattenedData.value;
    }
    connect(collectionViewer) {
        const changes = [
            collectionViewer.viewChange,
            this.treeControl.expansionModel.changed,
            this.flattenedData
        ];
        return merge(...changes)
            .pipe(map(() => {
            this.expandedData.next(this.treeFlattener.expandFlattenedNodes(this.flattenedData.value, this.treeControl));
            return this.expandedData.value;
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
        /* tslint:disable-next-line:naming-convention */
        this._data = new BehaviorSubject([]);
    }
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

export { McTreeModule, McTreeNodeDef, McTreeNodePadding, McTreeNodeToggle, McTreeNavigationChange, McTreeSelectionChange, McTreeSelection, MC_TREE_OPTION_PARENT_COMPONENT, McTreeOptionChange, McTreeOption, McTreeFlattener, McTreeFlatDataSource, McTreeNestedDataSource };
//# sourceMappingURL=tree.js.map
