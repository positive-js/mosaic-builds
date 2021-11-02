import * as i5 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Directive, Input, ViewChild, ContentChildren, forwardRef, Inject, Component, ViewEncapsulation, ChangeDetectionStrategy, InjectionToken, EventEmitter, ContentChild, Output, Optional, Self, QueryList, Attribute, NgModule } from '@angular/core';
import * as i1 from '@ptsecurity/mosaic/core';
import { mixinDisabled, mixinTabIndex, MultipleMode, getMcSelectNonArrayValueError, McPseudoCheckboxModule } from '@ptsecurity/mosaic/core';
import * as i1$1 from '@angular/cdk/a11y';
import { TAB, hasModifierKey, SPACE, ENTER, LEFT_ARROW, RIGHT_ARROW, isVerticalMovement, isSelectAll, isCopy, DOWN_ARROW, UP_ARROW, HOME, END, PAGE_UP, PAGE_DOWN } from '@ptsecurity/cdk/keycodes';
import * as i3 from '@ptsecurity/mosaic/dropdown';
import { McIcon } from '@ptsecurity/mosaic/icon';
import * as i4 from '@ptsecurity/mosaic/tooltip';
import { BehaviorSubject, Subject, Observable, of, merge } from 'rxjs';
import { takeUntil, map, take, delay } from 'rxjs/operators';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import * as i2 from '@angular/cdk/bidi';
import { TreeSizePaddingLeft } from '@ptsecurity/mosaic/design-tokens';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';

/** Context provided to the tree node component. */
class McTreeNodeOutletContext {
    constructor(data) {
        this.$implicit = data;
    }
}
/**
 * Data node definition for the McTree.
 * Captures the node's template and a when predicate that describes when this node should be used.
 */
class McTreeNodeDef {
    /** @docs-private */
    constructor(template) {
        this.template = template;
    }
}
/** @nocollapse */ McTreeNodeDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodeDef, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTreeNodeDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTreeNodeDef, selector: "[mcTreeNodeDef]", inputs: { when: ["mcTreeNodeDefWhen", "when"], data: ["mcTreeNode", "data"] }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodeDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcTreeNodeDef]',
                    inputs: ['when: mcTreeNodeDefWhen']
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; }, propDecorators: { data: [{
                type: Input,
                args: ['mcTreeNode']
            }] } });

class McTreeNodeOutlet {
    constructor(viewContainer, changeDetectorRef) {
        this.viewContainer = viewContainer;
        this.changeDetectorRef = changeDetectorRef;
    }
}
/** @nocollapse */ McTreeNodeOutlet.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodeOutlet, deps: [{ token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTreeNodeOutlet.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTreeNodeOutlet, selector: "[mcTreeNodeOutlet]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodeOutlet, decorators: [{
            type: Directive,
            args: [{ selector: '[mcTreeNodeOutlet]' }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }]; } });

/**
 * Returns an error to be thrown when there is no usable data.
 * @docs-private
 */
function getTreeNoValidDataSourceError() {
    return Error(`A valid data source must be provided.`);
}
/**
 * Returns an error to be thrown when there are multiple nodes that are missing a when function.
 * @docs-private
 */
function getTreeMultipleDefaultNodeDefsError() {
    return Error(`There can only be one default row without a when predicate function.`);
}
/**
 * Returns an error to be thrown when there are no matching node defs for a particular set of data.
 * @docs-private
 */
function getTreeMissingMatchingNodeDefError() {
    return Error(`Could not find a matching node definition for the provided node data.`);
}
/**
 * Returns an error to be thrown when there are tree control.
 * @docs-private
 */
function getTreeControlMissingError() {
    return Error(`Could not find a tree control for the tree.`);
}
/**
 * Returns an error to be thrown when tree control did not implement functions for flat/nested node.
 * @docs-private
 */
function getTreeControlFunctionsMissingError() {
    return Error(`Could not find functions for nested/flat tree in tree control.`);
}

class McTreeBase {
    constructor(differs, changeDetectorRef) {
        this.differs = differs;
        this.changeDetectorRef = changeDetectorRef;
        // TODO(tinayuangao): Setup a listener for scrolling, emit the calculated view to viewChange.
        //     Remove the MAX_VALUE in viewChange
        /**
         * Stream containing the latest information on what rows are being displayed on screen.
         * Can be used by the data source to as a heuristic of what data should be provided.
         */
        this.viewChange = new BehaviorSubject({ start: 0, end: Number.MAX_VALUE });
        /** Subject that emits when the component has been destroyed. */
        this.onDestroy = new Subject();
        /** Level of nodes */
        this.levels = new Map();
    }
    /**
     * Provides a stream containing the latest data array to render. Influenced by the tree's
     * stream of view window (what dataNodes are currently on screen).
     * Data source can be an observable of data array, or a dara array to render.
     */
    get dataSource() {
        return this._dataSource;
    }
    set dataSource(dataSource) {
        if (this._dataSource !== dataSource) {
            this.switchDataSource(dataSource);
        }
    }
    ngOnInit() {
        this.dataDiffer = this.differs.find([]).create(this.trackBy);
        if (!this.treeControl) {
            throw getTreeControlMissingError();
        }
    }
    ngOnDestroy() {
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
    }
    ngAfterContentChecked() {
        const defaultNodeDefs = this.nodeDefs.filter((def) => !def.when);
        if (defaultNodeDefs.length > 1) {
            throw getTreeMultipleDefaultNodeDefsError();
        }
        this.defaultNodeDef = defaultNodeDefs[0];
        if (this.dataSource && this.nodeDefs && !this.dataSubscription) {
            this.observeRenderChanges();
        }
    }
    /** Check for changes made in the data and render each change (node added/removed/moved). */
    renderNodeChanges(data, dataDiffer = this.dataDiffer, viewContainer = this.nodeOutlet.viewContainer, parentData) {
        const changes = dataDiffer.diff(data);
        if (!changes) {
            return;
        }
        changes.forEachOperation((item, adjustedPreviousIndex, currentIndex) => {
            if (item.previousIndex == null) {
                this.insertNode(data[currentIndex], currentIndex, viewContainer, parentData);
            }
            else if (currentIndex == null) {
                viewContainer.remove(adjustedPreviousIndex);
                this.levels.delete(item.item);
            }
            else {
                const view = viewContainer.get(adjustedPreviousIndex);
                viewContainer.move(view, currentIndex);
            }
        });
        this.changeDetectorRef.detectChanges();
    }
    /**
     * Finds the matching node definition that should be used for this node data. If there is only
     * one node definition, it is returned. Otherwise, find the node definition that has a when
     * predicate that returns true with the data. If none return true, return the default node
     * definition.
     */
    getNodeDef(data, i) {
        if (this.nodeDefs.length === 1) {
            return this.nodeDefs.first;
        }
        const nodeDef = this.nodeDefs.find((def) => def.when && def.when(i, data)) || this.defaultNodeDef;
        if (!nodeDef) {
            throw getTreeMissingMatchingNodeDefError();
        }
        return nodeDef;
    }
    /**
     * Create the embedded view for the data node template and place it in the correct index location
     * within the data node view container.
     */
    insertNode(nodeData, index, viewContainer, parentData) {
        const node = this.getNodeDef(nodeData, index);
        // Node context that will be provided to created embedded view
        const context = new McTreeNodeOutletContext(nodeData);
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
        const container = viewContainer ? viewContainer : this.nodeOutlet.viewContainer;
        container.createEmbeddedView(node.template, context, index);
        // Set the data to just created `McTreeNode`.
        // The `McTreeNode` created from `createEmbeddedView` will be saved in static variable
        //     `mostRecentTreeNode`. We get it from static variable and pass the node data to it.
        if (McTreeNode.mostRecentTreeNode) {
            McTreeNode.mostRecentTreeNode.data = nodeData;
        }
    }
    /** Set up a subscription for the data provided by the data source. */
    observeRenderChanges() {
        let dataStream;
        // Cannot use `instanceof DataSource` since the data source could be a literal with
        // `connect` function and may not extends DataSource.
        // tslint:disable-next-line:no-unbound-method
        if (typeof this._dataSource.connect === 'function') {
            dataStream = this._dataSource.connect(this);
        }
        else if (this._dataSource instanceof Observable) {
            dataStream = this._dataSource;
        }
        else if (Array.isArray(this._dataSource)) {
            dataStream = of(this._dataSource);
        }
        if (dataStream) {
            this.dataSubscription = dataStream
                .pipe(takeUntil(this.onDestroy))
                .subscribe((data) => this.renderNodeChanges(data));
        }
        else {
            throw getTreeNoValidDataSourceError();
        }
    }
    /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the node outlet. Otherwise start listening for new data.
     */
    switchDataSource(dataSource) {
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
    }
}
/** @nocollapse */ McTreeBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeBase, deps: [{ token: i0.IterableDiffers }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTreeBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTreeBase, inputs: { treeControl: "treeControl", trackBy: "trackBy", dataSource: "dataSource" }, queries: [{ propertyName: "nodeDefs", predicate: McTreeNodeDef }], viewQueries: [{ propertyName: "nodeOutlet", first: true, predicate: McTreeNodeOutlet, descendants: true, static: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeBase, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.IterableDiffers }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { treeControl: [{
                type: Input
            }], trackBy: [{
                type: Input
            }], nodeOutlet: [{
                type: ViewChild,
                args: [McTreeNodeOutlet, { static: true }]
            }], nodeDefs: [{
                type: ContentChildren,
                args: [McTreeNodeDef]
            }], dataSource: [{
                type: Input
            }] } });
class McTreeNode {
    constructor(elementRef, tree) {
        this.elementRef = elementRef;
        this.tree = tree;
        this.destroyed = new Subject();
        McTreeNode.mostRecentTreeNode = this;
    }
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
    }
    get isExpanded() {
        return this.tree.treeControl.isExpanded(this.data);
    }
    get level() {
        return this.tree.treeControl.getLevel ? this.tree.treeControl.getLevel(this._data) : 0;
    }
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
    focus() {
        this.elementRef.nativeElement.focus();
    }
}
/**
 * The most recently created `McTreeNode`. We save it in static variable so we can retrieve it
 * in `McTree` and set the data to it.
 */
McTreeNode.mostRecentTreeNode = null;
/** @nocollapse */ McTreeNode.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNode, deps: [{ token: i0.ElementRef }, { token: forwardRef(() => McTreeBase) }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTreeNode.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTreeNode, selector: "mc-tree-node", exportAs: ["mcTreeNode"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNode, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-tree-node',
                    exportAs: 'mcTreeNode'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: McTreeBase, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => McTreeBase)]
                }] }]; } });

class McTreeNodeToggleBase {
}
// tslint:disable-next-line:naming-convention
const McTreeNodeToggleMixinBase = mixinDisabled(McTreeNodeToggleBase);
/** @docs-private */
class McTreeNodeToggleBaseDirective extends McTreeNodeToggleMixinBase {
    constructor(tree, treeNode) {
        super();
        this.tree = tree;
        this.treeNode = treeNode;
        this._recursive = false;
        this.tree.treeControl.filterValue
            .pipe(map((value) => (value === null || value === void 0 ? void 0 : value.length) > 0))
            .subscribe((state) => this.disabled = state);
    }
    get recursive() {
        return this._recursive;
    }
    set recursive(value) {
        this._recursive = coerceBooleanProperty(value);
    }
    get iconState() {
        return this.tree.treeControl.isExpanded(this.node);
    }
    toggle(event) {
        if (this.disabled) {
            return;
        }
        this.recursive
            ? this.tree.treeControl.toggleDescendants(this.treeNode.data)
            : this.tree.treeControl.toggle(this.treeNode.data);
        event.stopPropagation();
    }
}
/** @nocollapse */ McTreeNodeToggleBaseDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodeToggleBaseDirective, deps: [{ token: McTreeBase }, { token: McTreeNode }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTreeNodeToggleBaseDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTreeNodeToggleBaseDirective, inputs: { node: "node", recursive: ["mcTreeNodeToggleRecursive", "recursive"] }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodeToggleBaseDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: McTreeBase }, { type: McTreeNode }]; }, propDecorators: { node: [{
                type: Input
            }], recursive: [{
                type: Input,
                args: ['mcTreeNodeToggleRecursive']
            }] } });
class McTreeNodeToggleComponent extends McTreeNodeToggleBaseDirective {
}
/** @nocollapse */ McTreeNodeToggleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodeToggleComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McTreeNodeToggleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McTreeNodeToggleComponent, selector: "mc-tree-node-toggle", inputs: { disabled: "disabled" }, host: { listeners: { "click": "toggle($event)" }, properties: { "class.mc-opened": "iconState", "attr.disabled": "disabled || null" }, classAttribute: "mc-tree-node-toggle" }, exportAs: ["mcTreeNodeToggle"], usesInheritance: true, ngImport: i0, template: `<i class="mc mc-icon mc-angle-down-S_16"></i>`, isInline: true, styles: [".mc-tree-node-toggle{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:24px;height:100%;cursor:pointer}.mc-tree-node-toggle .mc-icon{transform:rotate(-90deg)}.mc-tree-node-toggle.mc-opened .mc-icon{transform:rotate(0)}.mc-tree-node-toggle[disabled]{cursor:default}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodeToggleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-tree-node-toggle',
                    exportAs: 'mcTreeNodeToggle',
                    template: `<i class="mc mc-icon mc-angle-down-S_16"></i>`,
                    styleUrls: ['./toggle.scss'],
                    host: {
                        class: 'mc-tree-node-toggle',
                        '[class.mc-opened]': 'iconState',
                        '[attr.disabled]': 'disabled || null',
                        '(click)': 'toggle($event)'
                    },
                    inputs: ['disabled'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }] });
class McTreeNodeToggleDirective extends McTreeNodeToggleBaseDirective {
}
/** @nocollapse */ McTreeNodeToggleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodeToggleDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTreeNodeToggleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTreeNodeToggleDirective, selector: "[mcTreeNodeToggle]", host: { listeners: { "click": "toggle($event)" }, properties: { "attr.disabled": "disabled || null" } }, exportAs: ["mcTreeNodeToggle"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodeToggleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcTreeNodeToggle]',
                    exportAs: 'mcTreeNodeToggle',
                    host: {
                        '[attr.disabled]': 'disabled || null',
                        '(click)': 'toggle($event)'
                    }
                }]
        }] });

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
class McTreeOption extends McTreeNode {
    constructor(elementRef, changeDetectorRef, ngZone, tree) {
        super(elementRef, tree);
        this.changeDetectorRef = changeDetectorRef;
        this.ngZone = ngZone;
        this.tree = tree;
        this.onFocus = new Subject();
        this.onBlur = new Subject();
        this._disabled = false;
        this.onSelectionChange = new EventEmitter();
        this._selected = false;
        this._id = `mc-tree-option-${uniqueIdCounter++}`;
        this.hasFocus = false;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    get disabled() {
        return this._disabled || this.tree.disabled;
    }
    set disabled(value) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._disabled) {
            this._disabled = newValue;
        }
    }
    get showCheckbox() {
        return this._showCheckbox !== undefined ? this._showCheckbox : this.tree.showCheckbox;
    }
    set showCheckbox(value) {
        this._showCheckbox = coerceBooleanProperty(value);
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        const isSelected = coerceBooleanProperty(value);
        if (isSelected !== this._selected) {
            this.setSelected(isSelected);
        }
    }
    get id() {
        return this._id;
    }
    get viewValue() {
        // TODO: Add input property alternative for node envs.
        return (this.getHostElement().textContent || '').trim();
    }
    get isExpandable() {
        var _a;
        return !((_a = this.toggleElement) === null || _a === void 0 ? void 0 : _a.disabled) && this.tree.treeControl.isExpandable(this.data);
    }
    ngAfterContentInit() {
        this.value = this.tree.treeControl.getValue(this.data);
    }
    toggle() {
        this.selected = !this.selected;
    }
    setSelected(selected) {
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
    }
    focus(focusOrigin) {
        var _a;
        if (focusOrigin === 'program') {
            return;
        }
        if (this.disabled || this.hasFocus || ((_a = this.actionButton) === null || _a === void 0 ? void 0 : _a.hasFocus)) {
            return;
        }
        this.elementRef.nativeElement.focus();
        this.onFocus.next({ option: this });
        Promise.resolve().then(() => {
            this.hasFocus = true;
            this.changeDetectorRef.markForCheck();
        });
    }
    blur() {
        // When animations are enabled, Angular may end up removing the option from the DOM a little
        // earlier than usual, causing it to be blurred and throwing off the logic in the tree
        // that moves focus not the next item. To work around the issue, we defer marking the option
        // as not focused until the next time the zone stabilizes.
        this.ngZone.onStable
            .asObservable()
            .pipe(take(1))
            .subscribe(() => {
            this.ngZone.run(() => {
                var _a;
                this.hasFocus = false;
                if ((_a = this.actionButton) === null || _a === void 0 ? void 0 : _a.hasFocus) {
                    return;
                }
                this.onBlur.next({ option: this });
            });
        });
    }
    getHeight() {
        const clientRects = this.elementRef.nativeElement.getClientRects();
        if (clientRects.length) {
            return clientRects[0].height;
        }
        return 0;
    }
    select() {
        if (this._selected) {
            return;
        }
        this._selected = true;
        this.changeDetectorRef.markForCheck();
        this.emitSelectionChangeEvent();
    }
    deselect() {
        if (!this._selected) {
            return;
        }
        this._selected = false;
        this.changeDetectorRef.markForCheck();
    }
    onKeydown($event) {
        if (!this.actionButton) {
            return;
        }
        if ($event.keyCode === TAB && !$event.shiftKey && !this.actionButton.hasFocus) {
            this.actionButton.focus();
            $event.preventDefault();
        }
    }
    selectViaInteraction($event) {
        if (this.disabled) {
            return;
        }
        this.changeDetectorRef.markForCheck();
        this.emitSelectionChangeEvent(true);
        const shiftKey = $event ? hasModifierKey($event, 'shiftKey') : false;
        const ctrlKey = $event ? hasModifierKey($event, 'ctrlKey') : false;
        this.tree.setSelectedOptionsByClick(this, shiftKey, ctrlKey);
    }
    emitSelectionChangeEvent(isUserInput = false) {
        this.onSelectionChange.emit(new McTreeOptionChange(this, isUserInput));
    }
    getHostElement() {
        return this.elementRef.nativeElement;
    }
    markForCheck() {
        this.changeDetectorRef.markForCheck();
    }
}
/** @nocollapse */ McTreeOption.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeOption, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: MC_TREE_OPTION_PARENT_COMPONENT }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McTreeOption.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McTreeOption, selector: "mc-tree-option", inputs: { disabled: "disabled", showCheckbox: "showCheckbox" }, outputs: { onSelectionChange: "onSelectionChange" }, host: { listeners: { "focusin": "focus()", "blur": "blur()", "click": "selectViaInteraction($event)", "keydown": "onKeydown($event)" }, properties: { "class.mc-selected": "selected", "class.mc-focused": "hasFocus", "class.mc-action-button-focused": "actionButton?.active", "attr.id": "id", "attr.tabindex": "-1", "attr.disabled": "disabled || null" }, classAttribute: "mc-tree-option" }, providers: [{ provide: McTreeNode, useExisting: McTreeOption }], queries: [{ propertyName: "toggleElement", first: true, predicate: ["mcTreeNodeToggle"], descendants: true }, { propertyName: "actionButton", first: true, predicate: McTreeNodeActionComponent, descendants: true }], exportAs: ["mcTreeOption"], usesInheritance: true, ngImport: i0, template: "<ng-content select=\"mc-tree-node-toggle\"></ng-content>\n\n<mc-pseudo-checkbox\n    *ngIf=\"showCheckbox\"\n    [state]=\"selected ? 'checked' : 'unchecked'\"\n    [disabled]=\"disabled\">\n</mc-pseudo-checkbox>\n\n<ng-content select=\"[mc-icon]\"></ng-content>\n\n<span class=\"mc-option-text mc-no-select\"><ng-content></ng-content></span>\n\n<ng-content select=\"mc-tree-node-action\"></ng-content>\n\n<div class=\"mc-option-overlay\"></div>\n", styles: [".mc-tree-option{box-sizing:border-box;display:flex;align-items:center;height:32px;height:var(--mc-tree-size-node-height, 32px);word-wrap:break-word;border:2px solid transparent}.mc-tree-option .mc-option-text{display:inline-block;flex-grow:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin-right:16px;margin-right:var(--mc-tree-size-padding-right, 16px)}.mc-tree-option>.mc-icon{margin-right:8px;cursor:pointer}.mc-tree-option:focus{outline:none}.mc-tree-option:not([disabled]){cursor:pointer}.mc-tree-option .mc-pseudo-checkbox{margin-right:8px}.mc-tree-option .mc-tree-node-action{display:none}.mc-tree-option:not([disabled]):hover .mc-tree-node-action,.mc-tree-option:not([disabled]).mc-focused .mc-tree-node-action,.mc-tree-option:not([disabled]).mc-action-button-focused .mc-tree-node-action{display:flex}\n"], components: [{ type: i1.McPseudoCheckbox, selector: "mc-pseudo-checkbox", inputs: ["state", "disabled"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeOption, decorators: [{
            type: Component,
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
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    providers: [{ provide: McTreeNode, useExisting: McTreeOption }]
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_TREE_OPTION_PARENT_COMPONENT]
                }] }]; }, propDecorators: { toggleElement: [{
                type: ContentChild,
                args: ['mcTreeNodeToggle']
            }], actionButton: [{
                type: ContentChild,
                args: [forwardRef(() => McTreeNodeActionComponent)]
            }], disabled: [{
                type: Input
            }], showCheckbox: [{
                type: Input
            }], onSelectionChange: [{
                type: Output
            }] } });

class McTreeNodeActionBase {
}
// tslint:disable-next-line:naming-convention
const McTreeNodeActionMixinBase = mixinTabIndex(mixinDisabled(McTreeNodeActionBase));
class McTreeNodeActionComponent extends McTreeNodeActionMixinBase {
    constructor(elementRef, focusMonitor, option, dropdownTrigger, tooltip) {
        super();
        this.elementRef = elementRef;
        this.focusMonitor = focusMonitor;
        this.option = option;
        this.dropdownTrigger = dropdownTrigger;
        this.tooltip = tooltip;
        this.hasFocus = false;
        this.destroy = new Subject();
    }
    get active() {
        var _a;
        return ((_a = this.dropdownTrigger) === null || _a === void 0 ? void 0 : _a.opened) || this.hasFocus;
    }
    ngOnInit() {
        if (this.dropdownTrigger) {
            this.dropdownTrigger.restoreFocus = false;
            this.dropdownTrigger.dropdownClosed
                .pipe(takeUntil(this.destroy))
                .subscribe(() => {
                this.preventShowingTooltip();
                const destroyReason = this.dropdownTrigger.lastDestroyReason === 'keydown' ?
                    'keyboard' :
                    'program';
                this.focus(destroyReason);
            });
        }
        this.focusMonitor.monitor(this.elementRef.nativeElement);
    }
    ngOnDestroy() {
        this.destroy.next();
        this.destroy.complete();
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }
    focus(origin, options) {
        if (this.focusMonitor && origin) {
            this.focusMonitor.focusVia(this.elementRef.nativeElement, origin, options);
        }
        else {
            this.elementRef.nativeElement.focus();
        }
        this.hasFocus = true;
    }
    onFocus($event) {
        $event.stopPropagation();
        this.hasFocus = true;
    }
    onBlur() {
        this.hasFocus = false;
    }
    onClick($event) {
        $event.stopPropagation();
    }
    onKeyDown($event) {
        if ([SPACE, ENTER].includes($event.keyCode) && this.dropdownTrigger) {
            this.dropdownTrigger.openedBy = 'keyboard';
            this.dropdownTrigger.toggle();
        }
        else if ($event.shiftKey && $event.keyCode === TAB) {
            this.hasFocus = false;
            this.option.focus();
        }
        else if ($event.keyCode === TAB) {
            return;
        }
        $event.preventDefault();
        $event.stopPropagation();
    }
    preventShowingTooltip() {
        if (!this.tooltip) {
            return;
        }
        this.tooltip.disabled = true;
        setTimeout(() => this.tooltip.disabled = false);
    }
}
/** @nocollapse */ McTreeNodeActionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodeActionComponent, deps: [{ token: i0.ElementRef }, { token: i1$1.FocusMonitor }, { token: McTreeOption }, { token: i3.McDropdownTrigger, optional: true, self: true }, { token: i4.McTooltipTrigger, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McTreeNodeActionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McTreeNodeActionComponent, selector: "mc-tree-node-action", inputs: { disabled: "disabled" }, host: { listeners: { "focus": "onFocus($event)", "blur": "onBlur()", "click": "onClick($event)", "keydown": "onKeyDown($event)" }, properties: { "class.mc-opened": "false", "attr.disabled": "disabled || null", "attr.tabIndex": "-1" }, classAttribute: "mc-tree-node-action" }, queries: [{ propertyName: "customIcon", first: true, predicate: McIcon, descendants: true }], exportAs: ["mcTreeNodeAction"], usesInheritance: true, ngImport: i0, template: `
        <ng-container [ngSwitch]="!!customIcon">
            <i class="mc mc-icon mc-ellipsis_16" *ngSwitchCase="false"></i>
            <ng-content select="[mc-icon]" *ngSwitchCase="true"></ng-content>
        </ng-container>
        `, isInline: true, styles: [".mc-tree-node-action{box-sizing:unset;position:relative;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-right:-2px;width:28px;height:100%;cursor:pointer;outline:none;border:2px solid transparent;background:transparent}.mc-tree-node-action[disabled]{cursor:default}\n"], directives: [{ type: i5.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i5.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodeActionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-tree-node-action',
                    exportAs: 'mcTreeNodeAction',
                    template: `
        <ng-container [ngSwitch]="!!customIcon">
            <i class="mc mc-icon mc-ellipsis_16" *ngSwitchCase="false"></i>
            <ng-content select="[mc-icon]" *ngSwitchCase="true"></ng-content>
        </ng-container>
        `,
                    styleUrls: ['./action.scss'],
                    host: {
                        class: 'mc-tree-node-action',
                        '[class.mc-opened]': 'false',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.tabIndex]': '-1',
                        '(focus)': 'onFocus($event)',
                        '(blur)': 'onBlur()',
                        '(click)': 'onClick($event)',
                        '(keydown)': 'onKeyDown($event)'
                    },
                    inputs: ['disabled'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1$1.FocusMonitor }, { type: McTreeOption }, { type: i3.McDropdownTrigger, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }, { type: i4.McTooltipTrigger, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }]; }, propDecorators: { customIcon: [{
                type: ContentChild,
                args: [McIcon]
            }] } });

/** Regex used to split a string on its CSS units. */
const cssUnitPattern = /([A-Za-z%]+)$/;
class McTreeNodePadding {
    constructor(treeNode, tree, renderer, element, dir) {
        var _a, _b;
        this.treeNode = treeNode;
        this.tree = tree;
        this.renderer = renderer;
        this.element = element;
        this.dir = dir;
        this._indent = 20;
        /** CSS units used for the indentation value. */
        this.indentUnits = 'px';
        this.baseLeftPadding = parseInt(TreeSizePaddingLeft);
        this.iconWidth = 24;
        this.destroyed = new Subject();
        (_b = (_a = this.dir) === null || _a === void 0 ? void 0 : _a.change) === null || _b === void 0 ? void 0 : _b.pipe(takeUntil(this.destroyed)).subscribe(() => this.setPadding());
    }
    get level() {
        return this._level;
    }
    set level(value) {
        this.setLevelInput(value);
    }
    get indent() {
        return this._indent;
    }
    set indent(indent) {
        this.setIndentInput(indent);
    }
    get leftPadding() {
        return (this.withIcon ? 0 : this.iconWidth) + this.baseLeftPadding;
    }
    ngOnInit() {
        this.withIcon = this.tree.treeControl.isExpandable(this.treeNode.data);
        this.setPadding();
    }
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
    paddingIndent() {
        const nodeLevel = (this.treeNode.data && this.tree.treeControl.getLevel)
            ? this.tree.treeControl.getLevel(this.treeNode.data)
            : 0;
        const level = this.level || nodeLevel;
        return level > 0 ? `${(level * this._indent) + this.leftPadding}px` : `${this.leftPadding}px`;
    }
    /**
     * This has been extracted to a util because of TS 4 and VE.
     * View Engine doesn't support property rename inheritance.
     * TS 4.0 doesn't allow properties to override accessors or vice-versa.
     * @docs-private
     */
    setLevelInput(value) {
        // Set to null as the fallback value so that _setPadding can fall back to the node level if the
        // consumer set the directive as `mcTreeNodePadding=""`. We still want to take this value if
        // they set 0 explicitly.
        this._level = coerceNumberProperty(value, null);
        this.setPadding();
    }
    /**
     * This has been extracted to a util because of TS 4 and VE.
     * View Engine doesn't support property rename inheritance.
     * TS 4.0 doesn't allow properties to override accessors or vice-versa.
     * @docs-private
     */
    setIndentInput(indent) {
        let value = indent;
        let units = 'px';
        if (typeof indent === 'string') {
            const parts = indent.split(cssUnitPattern);
            value = parts[0];
            units = parts[1] || units;
        }
        this.indentUnits = units;
        this._indent = coerceNumberProperty(value);
        this.setPadding();
    }
    setPadding() {
        var _a;
        const padding = this.paddingIndent();
        const paddingProp = ((_a = this.dir) === null || _a === void 0 ? void 0 : _a.value) === 'rtl' ? 'paddingRight' : 'paddingLeft';
        this.renderer.setStyle(this.element.nativeElement, paddingProp, padding);
    }
}
/** @nocollapse */ McTreeNodePadding.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodePadding, deps: [{ token: McTreeNode }, { token: McTreeBase }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTreeNodePadding.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTreeNodePadding, selector: "[mcTreeNodePadding]", inputs: { level: ["mcTreeNodePadding", "level"], indent: ["mcTreeNodePaddingIndent", "indent"] }, exportAs: ["mcTreeNodePadding"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodePadding, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcTreeNodePadding]',
                    exportAs: 'mcTreeNodePadding'
                }]
        }], ctorParameters: function () { return [{ type: McTreeNode }, { type: McTreeBase }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { level: [{
                type: Input,
                args: ['mcTreeNodePadding']
            }], indent: [{
                type: Input,
                args: ['mcTreeNodePaddingIndent']
            }] } });

class McTree extends McTreeBase {
}
/** @nocollapse */ McTree.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTree, deps: null, target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McTree.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McTree, selector: "mc-tree", host: { classAttribute: "mc-tree" }, exportAs: ["mcTree"], usesInheritance: true, ngImport: i0, template: `<ng-container mcTreeNodeOutlet></ng-container>`, isInline: true, styles: [".mc-tree{display:block}\n"], directives: [{ type: McTreeNodeOutlet, selector: "[mcTreeNodeOutlet]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTree, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-tree',
                    exportAs: 'mcTree',
                    template: `<ng-container mcTreeNodeOutlet></ng-container>`,
                    styleUrls: ['./tree.scss'],
                    host: {
                        class: 'mc-tree'
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }] });

/** Base tree control. It has basic toggle/expand/collapse operations on a single data node. */
/* tslint:disable-next-line:naming-convention */
class BaseTreeControl {
    constructor() {
        /** A selection model with multi-selection to track expansion status. */
        this.expansionModel = new SelectionModel(true);
        this.filterModel = new SelectionModel(true);
        this.filterValue = new BehaviorSubject('');
    }
    /** Toggles one single data node's expanded/collapsed state. */
    toggle(dataNode) {
        if (this.filterValue.value) {
            return;
        }
        this.expansionModel.toggle(dataNode);
    }
    /** Expands one single data node. */
    expand(dataNode) {
        if (this.filterValue.value) {
            return;
        }
        this.expansionModel.select(dataNode);
    }
    /** Collapses one single data node. */
    collapse(dataNode) {
        if (this.filterValue.value) {
            return;
        }
        this.expansionModel.deselect(dataNode);
    }
    /** Whether a given data node is expanded or not. Returns true if the data node is expanded. */
    isExpanded(dataNode) {
        return this.expansionModel.isSelected(dataNode);
    }
    /** Toggles a subtree rooted at `node` recursively. */
    toggleDescendants(dataNode) {
        this.expansionModel.isSelected(dataNode)
            ? this.collapseDescendants(dataNode)
            : this.expandDescendants(dataNode);
    }
    /** Collapse all dataNodes in the tree. */
    collapseAll() {
        this.expansionModel.clear();
    }
    /** Expands a subtree rooted at given data node recursively. */
    expandDescendants(dataNode) {
        const toBeProcessed = [dataNode];
        toBeProcessed.push(...this.getDescendants(dataNode));
        this.expansionModel.select(...toBeProcessed);
    }
    /** Collapses a subtree rooted at given data node recursively. */
    collapseDescendants(dataNode) {
        const toBeProcessed = [dataNode];
        toBeProcessed.push(...this.getDescendants(dataNode));
        this.expansionModel.deselect(...toBeProcessed);
    }
}

function defaultCompareValues(firstValue, secondValue) {
    return firstValue === secondValue;
}
function defaultCompareViewValues(firstViewValue, secondViewValue) {
    return RegExp(secondViewValue, 'gi').test(firstViewValue);
}
/** Flat tree control. Able to expand/collapse a subtree recursively for flattened tree. */
class FlatTreeControl extends BaseTreeControl {
    /** Construct with flat tree data node functions getLevel, isExpandable, getValue and getViewValue. */
    constructor(getLevel, isExpandable, 
    /** getValue will be used to determine if the tree contains value or not. Used in method hasValue */
    getValue, 
    /** getViewValue will be used for filter nodes. Returned value will be first argument in filterNodesFunction */
    getViewValue, 
    /** compareValues will be used to comparing values. */
    compareValues = defaultCompareValues, 
    /** compareValues will be used to comparing values. */
    compareViewValues = defaultCompareViewValues) {
        super();
        this.getLevel = getLevel;
        this.isExpandable = isExpandable;
        this.getValue = getValue;
        this.getViewValue = getViewValue;
        this.compareValues = compareValues;
        this.compareViewValues = compareViewValues;
    }
    /**
     * Gets a list of the data node's subtree of descendent data nodes.
     *
     * To make this working, the `dataNodes` of the TreeControl must be flattened tree nodes
     * with correct levels.
     */
    getDescendants(dataNode) {
        const startIndex = this.dataNodes.indexOf(dataNode);
        const results = [];
        // Goes through flattened tree nodes in the `dataNodes` array, and get all descendants.
        // The level of descendants of a tree node must be greater than the level of the given
        // tree node.
        // If we reach a node whose level is equal to the level of the tree node, we hit a sibling.
        // If we reach a node whose level is greater than the level of the tree node, we hit a
        // sibling of an ancestor.
        for (let i = startIndex + 1; i < this.dataNodes.length && this.getLevel(dataNode) < this.getLevel(this.dataNodes[i]); i++) {
            results.push(this.dataNodes[i]);
        }
        return results;
    }
    /**
     * Expands all data nodes in the tree.
     *
     * To make this working, the `dataNodes` variable of the TreeControl must be set to all flattened
     * data nodes of the tree.
     */
    expandAll() {
        this.expansionModel.select(...this.dataNodes);
    }
    getParents(node, result) {
        if (node.parent) {
            result.unshift(node.parent);
            return this.getParents(node.parent, result);
        }
        else {
            return result;
        }
    }
    hasValue(value) {
        return this.dataNodes.find((node) => this.compareValues(this.getValue(node), value));
    }
    filterNodes(value) {
        this.saveExpansionState();
        this.filterModel.clear();
        this.expansionModel.clear();
        const filteredNodes = this.dataNodes
            .filter((node) => this.compareViewValues(this.getViewValue(node), value));
        const filteredNodesWithTheirParents = new Set();
        filteredNodes.forEach((filteredNode) => {
            this.getParents(filteredNode, [])
                .forEach((node) => {
                filteredNodesWithTheirParents.add(node);
                this.expandDataNode(node);
            });
            filteredNodesWithTheirParents.add(filteredNode);
            this.expandDataNode(filteredNode);
            if (this.isExpandable(filteredNode)) {
                const childNodeLevel = this.getLevel(filteredNode) + 1;
                this.getDescendants(filteredNode)
                    .filter((childNode) => this.getLevel(childNode) === childNodeLevel)
                    .filter((childNode) => !this.isExpandable(childNode) || !this.hasFilteredDescendant(childNode, filteredNodes))
                    .forEach((childNode) => {
                    filteredNodesWithTheirParents.add(childNode);
                    this.expandDataNode(childNode);
                });
            }
        });
        this.filterModel.select(...Array.from(filteredNodesWithTheirParents));
        this.filterValue.next(value);
        this.restoreExpansionState();
    }
    expandDataNode(dataNode) {
        if (this.isExpandable(dataNode)) {
            this.expansionModel.select(dataNode);
        }
    }
    saveExpansionState() {
        if (this.filterValue.value === '') {
            this.expandedItemsBeforeFiltration = this.expansionModel.selected;
        }
    }
    restoreExpansionState() {
        if (this.filterValue.value === '') {
            this.expansionModel.clear();
            this.expansionModel.select(...this.expandedItemsBeforeFiltration);
        }
    }
    hasFilteredDescendant(dataNode, filteredNodes) {
        const filteredViewValues = filteredNodes
            .map((node) => this.getViewValue(node));
        return this.getDescendants(dataNode)
            .filter((node) => filteredViewValues.includes(this.getViewValue(node)))
            .length > 0;
    }
}

/* tslint:disable:no-empty */
const MC_SELECTION_TREE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => McTreeSelection),
    multi: true
};
class McTreeSelectAllEvent {
    constructor(source, options) {
        this.source = source;
        this.options = options;
    }
}
class McTreeCopyEvent {
    constructor(source, option) {
        this.source = source;
        this.option = option;
    }
}
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
class McTreeSelection extends McTreeBase {
    constructor(elementRef, differs, changeDetectorRef, multiple) {
        super(differs, changeDetectorRef);
        this.elementRef = elementRef;
        this.renderedOptions = new QueryList();
        this.resetFocusedItemOnBlur = true;
        this.multipleMode = null;
        this.userTabIndex = null;
        this.navigationChange = new EventEmitter();
        this.selectionChange = new EventEmitter();
        this.onSelectAll = new EventEmitter();
        this.onCopy = new EventEmitter();
        this.sortedNodes = [];
        this._autoSelect = true;
        this._noUnselectLast = true;
        this._disabled = false;
        this._tabIndex = 0;
        this.destroy = new Subject();
        /** `View -> model callback called when value changes` */
        this.onChange = () => { };
        /** `View -> model callback called when select has been touched` */
        this.onTouched = () => { };
        this.updateRenderedOptions = () => {
            const orderedOptions = [];
            this.sortedNodes.forEach((node) => {
                const found = this.unorderedOptions.find((option) => option.value === this.treeControl.getValue(node));
                if (found) {
                    orderedOptions.push(found);
                }
            });
            this.renderedOptions.reset(orderedOptions);
            this.renderedOptions.notifyOnChanges();
            this.updateScrollSize();
        };
        if (multiple === MultipleMode.CHECKBOX || multiple === MultipleMode.KEYBOARD) {
            this.multipleMode = multiple;
        }
        else if (multiple !== null) {
            this.multipleMode = MultipleMode.CHECKBOX;
        }
        if (this.multipleMode === MultipleMode.CHECKBOX) {
            this.autoSelect = false;
            this.noUnselectLast = false;
        }
        this.selectionModel = new SelectionModel(this.multiple);
    }
    get autoSelect() {
        return this._autoSelect;
    }
    set autoSelect(value) {
        this._autoSelect = coerceBooleanProperty(value);
    }
    get optionFocusChanges() {
        return merge(...this.renderedOptions.map((option) => option.onFocus));
    }
    get optionBlurChanges() {
        return merge(...this.renderedOptions.map((option) => option.onBlur));
    }
    get multiple() {
        return !!this.multipleMode;
    }
    get noUnselectLast() {
        return this._noUnselectLast;
    }
    set noUnselectLast(value) {
        this._noUnselectLast = coerceBooleanProperty(value);
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(rawValue) {
        const value = coerceBooleanProperty(rawValue);
        if (this._disabled !== value) {
            this._disabled = value;
            this.markOptionsForCheck();
        }
    }
    get tabIndex() {
        return this.disabled ? -1 : this._tabIndex;
    }
    set tabIndex(value) {
        this._tabIndex = value;
        this.userTabIndex = value;
    }
    get showCheckbox() {
        return this.multipleMode === MultipleMode.CHECKBOX;
    }
    ngAfterContentInit() {
        this.unorderedOptions.changes
            .subscribe(this.updateRenderedOptions);
        this.keyManager = new FocusKeyManager(this.renderedOptions)
            .withVerticalOrientation(true)
            .withHorizontalOrientation(null);
        this.keyManager.change
            .pipe(takeUntil(this.destroy))
            .subscribe(() => {
            if (this.keyManager.activeItem) {
                this.emitNavigationEvent(this.keyManager.activeItem);
                // todo need check this logic
                if (this.autoSelect && !this.keyManager.activeItem.disabled) {
                    this.updateOptionsFocus();
                }
            }
        });
        this.keyManager.tabOut
            .pipe(takeUntil(this.destroy))
            .subscribe(() => this.allowFocusEscape());
        this.selectionModel.changed
            .pipe(takeUntil(this.destroy))
            .subscribe(() => {
            this.onChange(this.getSelectedValues());
            this.renderedOptions.notifyOnChanges();
        });
        this.renderedOptions.changes
            .pipe(takeUntil(this.destroy), delay(0))
            .subscribe((options) => {
            this.resetOptions();
            // Check to see if we need to update our tab index
            this.updateTabIndex();
            options.forEach((option) => {
                if (this.getSelectedValues().includes(option.value)) {
                    option.select();
                }
                else {
                    option.deselect();
                }
                option.markForCheck();
            });
        });
    }
    ngOnDestroy() {
        this.destroy.next();
        this.destroy.complete();
    }
    focus($event) {
        if (this.renderedOptions.length === 0 || this.isFocusReceivedFromNestedOption($event)) {
            return;
        }
        this.keyManager.setFocusOrigin('keyboard');
        this.keyManager.setFirstItemActive();
        this.keyManager.setFocusOrigin('program');
    }
    blur() {
        if (!this.hasFocusedOption() && this.resetFocusedItemOnBlur) {
            this.keyManager.setActiveItem(-1);
        }
        this.onTouched();
        this.changeDetectorRef.markForCheck();
    }
    onKeyDown(event) {
        var _a, _b;
        this.keyManager.setFocusOrigin('keyboard');
        // tslint:disable-next-line: deprecation
        const keyCode = event.keyCode;
        if ([SPACE, LEFT_ARROW, RIGHT_ARROW].includes(keyCode) || isVerticalMovement(event)) {
            event.preventDefault();
        }
        if (this.multiple && isSelectAll(event)) {
            this.selectAllOptions();
            return;
        }
        else if (isCopy(event)) {
            this.copyActiveOption();
            return;
        }
        else if (keyCode === TAB) {
            this.keyManager.tabOut.next();
            return;
        }
        else if (keyCode === LEFT_ARROW && ((_a = this.keyManager.activeItem) === null || _a === void 0 ? void 0 : _a.isExpandable)) {
            this.treeControl.collapse(this.keyManager.activeItem.data);
            return;
        }
        else if (keyCode === RIGHT_ARROW && ((_b = this.keyManager.activeItem) === null || _b === void 0 ? void 0 : _b.isExpandable)) {
            this.treeControl.expand(this.keyManager.activeItem.data);
            return;
        }
        else if (keyCode === DOWN_ARROW) {
            this.keyManager.setNextItemActive();
        }
        else if (keyCode === UP_ARROW) {
            this.keyManager.setPreviousItemActive();
        }
        else if ([SPACE, ENTER].includes(keyCode)) {
            this.toggleFocusedOption();
            return;
        }
        else if (keyCode === HOME) {
            this.keyManager.setFirstItemActive();
        }
        else if (keyCode === END) {
            this.keyManager.setLastItemActive();
        }
        else if (keyCode === PAGE_UP) {
            this.keyManager.setPreviousPageItemActive();
        }
        else if (keyCode === PAGE_DOWN) {
            this.keyManager.setNextPageItemActive();
        }
        if (this.keyManager.activeItem) {
            this.setSelectedOptionsByKey(this.keyManager.activeItem, hasModifierKey(event, 'shiftKey'), hasModifierKey(event, 'ctrlKey'));
        }
    }
    updateScrollSize() {
        if (!this.renderedOptions.first) {
            return;
        }
        this.keyManager.withScrollSize(Math.floor(this.getHeight() / this.renderedOptions.first.getHeight()));
    }
    setSelectedOptionsByKey(option, shiftKey, ctrlKey) {
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
    }
    setSelectedOptionsByClick(option, shiftKey, ctrlKey) {
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
    }
    setSelectedOptions(option) {
        const selectedOptionState = option.selected;
        let fromIndex = this.keyManager.previousActiveItemIndex;
        let toIndex = this.keyManager.previousActiveItemIndex = this.keyManager.activeItemIndex;
        if (toIndex === fromIndex) {
            return;
        }
        if (fromIndex > toIndex) {
            [fromIndex, toIndex] = [toIndex, fromIndex];
        }
        this.renderedOptions
            .toArray()
            .slice(fromIndex, toIndex + 1)
            .filter((item) => !item.disabled)
            .forEach((renderedOption) => {
            const isLastRenderedOption = renderedOption === this.keyManager.activeItem;
            if (isLastRenderedOption && renderedOption.selected && this.noUnselectLast) {
                return;
            }
            renderedOption.setSelected(!selectedOptionState);
        });
    }
    setFocusedOption(option) {
        this.keyManager.setActiveItem(option);
    }
    toggleFocusedOption() {
        const focusedOption = this.keyManager.activeItem;
        if (focusedOption && (!focusedOption.selected || this.canDeselectLast(focusedOption))) {
            focusedOption.toggle();
            this.emitChangeEvent(focusedOption);
        }
    }
    renderNodeChanges(data, dataDiffer = this.dataDiffer, viewContainer = this.nodeOutlet.viewContainer, parentData) {
        super.renderNodeChanges(data, dataDiffer, viewContainer, parentData);
        this.sortedNodes = this.getSortedNodes(viewContainer);
        this.nodeOutlet.changeDetectorRef.detectChanges();
    }
    emitNavigationEvent(option) {
        this.navigationChange.emit(new McTreeNavigationChange(this, option));
    }
    emitChangeEvent(option) {
        this.selectionChange.emit(new McTreeNavigationChange(this, option));
    }
    selectAllOptions() {
        const optionsToSelect = this.renderedOptions
            .filter((option) => !option.disabled);
        optionsToSelect
            .forEach((option) => option.setSelected(true));
        this.onSelectAll.emit(new McTreeSelectAllEvent(this, optionsToSelect));
    }
    copyActiveOption() {
        this.onCopy.emit(new McTreeNavigationChange(this, this.keyManager.activeItem));
    }
    writeValue(value) {
        if (this.multiple && value && !Array.isArray(value)) {
            throw getMcSelectNonArrayValueError();
        }
        if (value) {
            this.setOptionsFromValues(this.multiple ? value : [value]);
        }
        else {
            this.selectionModel.clear();
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
     */
    setDisabledState(isDisabled) {
        this._disabled = isDisabled;
        this.changeDetectorRef.markForCheck();
    }
    setOptionsFromValues(values) {
        this.selectionModel.clear();
        const valuesToSelect = values.reduce((result, value) => {
            return this.treeControl.hasValue(value) ? [...result, this.treeControl.hasValue(value)] : [...result];
        }, []);
        this.selectionModel.select(...valuesToSelect);
    }
    getSelectedValues() {
        return this.selectionModel.selected.map((selected) => this.treeControl.getValue(selected));
    }
    getItemHeight() {
        return this.renderedOptions.first ? this.renderedOptions.first.getHeight() : 0;
    }
    getHeight() {
        const clientRects = this.elementRef.nativeElement.getClientRects();
        if (clientRects.length) {
            return clientRects[0].height;
        }
        return 0;
    }
    updateTabIndex() {
        this._tabIndex = this.renderedOptions.length === 0 ? -1 : 0;
    }
    getSortedNodes(viewContainer) {
        const array = [];
        for (let i = 0; i < viewContainer.length; i++) {
            const viewRef = viewContainer.get(i);
            array.push(viewRef.context.$implicit);
        }
        return array;
    }
    allowFocusEscape() {
        if (this._tabIndex !== -1) {
            this._tabIndex = -1;
            setTimeout(() => {
                this._tabIndex = this.userTabIndex || 0;
                this.changeDetectorRef.markForCheck();
            });
        }
    }
    resetOptions() {
        this.dropSubscriptions();
        this.listenToOptionsFocus();
    }
    dropSubscriptions() {
        if (this.optionFocusSubscription) {
            this.optionFocusSubscription.unsubscribe();
            this.optionFocusSubscription = null;
        }
        if (this.optionBlurSubscription) {
            this.optionBlurSubscription.unsubscribe();
            this.optionBlurSubscription = null;
        }
    }
    listenToOptionsFocus() {
        this.optionFocusSubscription = this.optionFocusChanges
            .subscribe((event) => {
            const index = this.renderedOptions.toArray().indexOf(event.option);
            this.renderedOptions
                .filter((option) => option.hasFocus)
                .forEach((option) => option.hasFocus = false);
            if (this.isValidIndex(index)) {
                this.keyManager.updateActiveItem(index);
            }
        });
        this.optionBlurSubscription = this.optionBlurChanges
            .subscribe(() => this.blur());
    }
    /**
     * Utility to ensure all indexes are valid.
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of options.
     */
    isValidIndex(index) {
        return index >= 0 && index < this.renderedOptions.length;
    }
    /** Checks whether any of the options is focused. */
    hasFocusedOption() {
        return this.renderedOptions.some((option) => option.hasFocus);
    }
    markOptionsForCheck() {
        this.renderedOptions.forEach((option) => option.markForCheck());
    }
    updateOptionsFocus() {
        this.renderedOptions
            .filter((option) => option.hasFocus)
            .forEach((option) => option.hasFocus = false);
    }
    canDeselectLast(option) {
        return !(this.noUnselectLast && this.selectionModel.selected.length === 1 && option.selected);
    }
    isFocusReceivedFromNestedOption($event) {
        if (!$event || !$event.relatedTarget) {
            return false;
        }
        return $event.relatedTarget.classList.contains('mc-tree-option');
    }
}
/** @nocollapse */ McTreeSelection.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeSelection, deps: [{ token: i0.ElementRef }, { token: i0.IterableDiffers }, { token: i0.ChangeDetectorRef }, { token: 'multiple', attribute: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McTreeSelection.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McTreeSelection, selector: "mc-tree-selection", inputs: { treeControl: "treeControl", autoSelect: "autoSelect", noUnselectLast: "noUnselectLast", disabled: "disabled", tabIndex: "tabIndex" }, outputs: { navigationChange: "navigationChange", selectionChange: "selectionChange", onSelectAll: "onSelectAll", onCopy: "onCopy" }, host: { listeners: { "blur": "blur()", "focus": "focus($event)", "keydown": "onKeyDown($event)", "window:resize": "updateScrollSize()" }, properties: { "attr.tabindex": "tabIndex", "attr.disabled": "disabled || null" }, classAttribute: "mc-tree-selection" }, providers: [
        MC_SELECTION_TREE_VALUE_ACCESSOR,
        { provide: MC_TREE_OPTION_PARENT_COMPONENT, useExisting: McTreeSelection },
        { provide: McTreeBase, useExisting: McTreeSelection }
    ], queries: [{ propertyName: "unorderedOptions", predicate: McTreeOption }], viewQueries: [{ propertyName: "nodeOutlet", first: true, predicate: McTreeNodeOutlet, descendants: true, static: true }], exportAs: ["mcTreeSelection"], usesInheritance: true, ngImport: i0, template: '<ng-container mcTreeNodeOutlet></ng-container>', isInline: true, styles: [".mc-tree-selection{display:block}\n"], directives: [{ type: McTreeNodeOutlet, selector: "[mcTreeNodeOutlet]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeSelection, decorators: [{
            type: Component,
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
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        MC_SELECTION_TREE_VALUE_ACCESSOR,
                        { provide: MC_TREE_OPTION_PARENT_COMPONENT, useExisting: McTreeSelection },
                        { provide: McTreeBase, useExisting: McTreeSelection }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.IterableDiffers }, { type: i0.ChangeDetectorRef }, { type: i1.MultipleMode, decorators: [{
                    type: Attribute,
                    args: ['multiple']
                }] }]; }, propDecorators: { nodeOutlet: [{
                type: ViewChild,
                args: [McTreeNodeOutlet, { static: true }]
            }], unorderedOptions: [{
                type: ContentChildren,
                args: [McTreeOption]
            }], treeControl: [{
                type: Input
            }], navigationChange: [{
                type: Output
            }], selectionChange: [{
                type: Output
            }], onSelectAll: [{
                type: Output
            }], onCopy: [{
                type: Output
            }], autoSelect: [{
                type: Input
            }], noUnselectLast: [{
                type: Input
            }], disabled: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }] } });

const MC_TREE_DIRECTIVES = [
    McTreeNodeOutlet,
    McTreeNodeDef,
    McTreeNode,
    McTreeNodePadding,
    McTree,
    McTreeSelection,
    McTreeOption,
    McTreeNodePadding,
    McTreeNodeActionComponent,
    McTreeNodeToggleComponent,
    McTreeNodeToggleDirective
];
class McTreeModule {
}
/** @nocollapse */ McTreeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McTreeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeModule, declarations: [McTreeNodeOutlet,
        McTreeNodeDef,
        McTreeNode,
        McTreeNodePadding,
        McTree,
        McTreeSelection,
        McTreeOption,
        McTreeNodePadding,
        McTreeNodeActionComponent,
        McTreeNodeToggleComponent,
        McTreeNodeToggleDirective], imports: [CommonModule, McPseudoCheckboxModule], exports: [McTreeNodeOutlet,
        McTreeNodeDef,
        McTreeNode,
        McTreeNodePadding,
        McTree,
        McTreeSelection,
        McTreeOption,
        McTreeNodePadding,
        McTreeNodeActionComponent,
        McTreeNodeToggleComponent,
        McTreeNodeToggleDirective] });
/** @nocollapse */ McTreeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeModule, imports: [[CommonModule, McPseudoCheckboxModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, McPseudoCheckboxModule],
                    exports: MC_TREE_DIRECTIVES,
                    declarations: MC_TREE_DIRECTIVES
                }]
        }] });

/** Nested tree control. Able to expand/collapse a subtree recursively for NestedNode type. */
class NestedTreeControl extends BaseTreeControl {
    /** Construct with nested tree function getChildren. */
    constructor(getChildren) {
        super();
        this.getChildren = getChildren;
    }
    /**
     * Expands all dataNodes in the tree.
     *
     * To make this working, the `dataNodes` variable of the TreeControl must be set to all root level
     * data nodes of the tree.
     */
    expandAll() {
        this.expansionModel.clear();
        const allNodes = this.dataNodes.reduce((accumulator, dataNode) => [...accumulator, ...this.getDescendants(dataNode), dataNode], []);
        this.expansionModel.select(...allNodes);
    }
    /** Gets a list of descendant dataNodes of a subtree rooted at given data node recursively. */
    getDescendants(dataNode) {
        const descendants = [];
        this._getDescendants(descendants, dataNode);
        return descendants.splice(1);
    }
    /** A helper function to get descendants recursively. */
    // todo нужно придумать другое название и понять в чем отличие между getDescendants и _getDescendants
    /* tslint:disable-next-line:naming-convention */
    _getDescendants(descendants, dataNode) {
        descendants.push(dataNode);
        this.getChildren(dataNode)
            .pipe(take(1))
            .subscribe((children) => {
            if (children && children.length > 0) {
                children.forEach((child) => this._getDescendants(descendants, child));
            }
        });
    }
}

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
    flattenNode(node, level, resultNodes, parent) {
        const flatNode = this.transformFunction(node, level, parent);
        resultNodes.push(flatNode);
        if (this.isExpandable(flatNode)) {
            const childrenNodes = this.getChildren(node);
            if (childrenNodes) {
                if (Array.isArray(childrenNodes)) {
                    this.flattenChildren(childrenNodes, level, resultNodes, flatNode);
                }
                else {
                    childrenNodes
                        .pipe(take(1))
                        .subscribe((children) => {
                        this.flattenChildren(children, level, resultNodes, flatNode);
                    });
                }
            }
        }
        return resultNodes;
    }
    flattenChildren(children, level, resultNodes, parent) {
        children.forEach((child) => {
            this.flattenNode(child, level + 1, resultNodes, parent);
        });
    }
    /**
     * Flatten a list of node type T to flattened version of node F.
     * Please note that type T may be nested, and the length of `structuredData` may be different
     * from that of returned list `F[]`.
     */
    flattenNodes(structuredData) {
        const resultNodes = [];
        structuredData.forEach((node) => this.flattenNode(node, 0, resultNodes, null));
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
class McTreeFlatDataSource extends DataSource {
    constructor(treeControl, treeFlattener, initialData = []) {
        super();
        this.treeControl = treeControl;
        this.treeFlattener = treeFlattener;
        this.flattenedData = new BehaviorSubject([]);
        this.expandedData = new BehaviorSubject([]);
        this.filteredData = new BehaviorSubject([]);
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
        return merge(collectionViewer.viewChange, this.treeControl.expansionModel.changed
            .pipe(map((value) => ({ type: McTreeDataSourceChangeTypes.Expansion, value }))), this.treeControl.filterValue
            .pipe(map((value) => ({ type: McTreeDataSourceChangeTypes.Filter, value }))), this.flattenedData)
            .pipe(map((changeObj) => {
            if (changeObj.type === McTreeDataSourceChangeTypes.Filter) {
                if (changeObj.value && changeObj.value.length > 0) {
                    return this.filterHandler();
                }
                else {
                    return this.expansionHandler();
                }
            }
            return this.expansionHandler();
        }));
    }
    filterHandler() {
        this.filteredData.next(this.treeControl.filterModel.selected);
        return this.filteredData.value;
    }
    expansionHandler() {
        const expandedNodes = this.treeFlattener.expandFlattenedNodes(this.flattenedData.value, this.treeControl);
        this.expandedData.next(expandedNodes);
        return this.expandedData.value;
    }
    disconnect() {
        // no op
    }
}

/**
 * Data source for nested tree.
 *
 * The data source for nested tree doesn't have to consider node flattener, or the way to expand
 * or collapse. The expansion/collapsion will be handled by TreeControl and each non-leaf node.
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

export { BaseTreeControl, FlatTreeControl, MC_SELECTION_TREE_VALUE_ACCESSOR, MC_TREE_OPTION_PARENT_COMPONENT, McTree, McTreeBase, McTreeCopyEvent, McTreeFlatDataSource, McTreeFlattener, McTreeModule, McTreeNavigationChange, McTreeNestedDataSource, McTreeNode, McTreeNodeActionBase, McTreeNodeActionComponent, McTreeNodeActionMixinBase, McTreeNodeDef, McTreeNodeOutlet, McTreeNodeOutletContext, McTreeNodePadding, McTreeNodeToggleBase, McTreeNodeToggleBaseDirective, McTreeNodeToggleComponent, McTreeNodeToggleDirective, McTreeNodeToggleMixinBase, McTreeOption, McTreeOptionChange, McTreeSelectAllEvent, McTreeSelection, McTreeSelectionChange, NestedTreeControl, defaultCompareValues, defaultCompareViewValues };
//# sourceMappingURL=ptsecurity-mosaic-tree.js.map
