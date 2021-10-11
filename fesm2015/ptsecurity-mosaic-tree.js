import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Directive, Input, Component, ViewEncapsulation, InjectionToken, EventEmitter, ChangeDetectionStrategy, Inject, Output, forwardRef, QueryList, Attribute, ViewChild, ContentChildren, NgModule } from '@angular/core';
import * as i1 from '@ptsecurity/cdk/tree';
import { CdkTreeNodeDef, CdkTreeNodePadding, CdkTreeNode, CdkTree, CdkTreeNodeOutlet, CdkTreeModule } from '@ptsecurity/cdk/tree';
import * as i1$1 from '@ptsecurity/mosaic/core';
import { MultipleMode, getMcSelectNonArrayValueError, McPseudoCheckboxModule } from '@ptsecurity/mosaic/core';
import { map, take, takeUntil, delay } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { hasModifierKey, PAGE_DOWN, PAGE_UP, END, HOME, ENTER, SPACE, RIGHT_ARROW, LEFT_ARROW, UP_ARROW, DOWN_ARROW } from '@ptsecurity/cdk/keycodes';
import { Subject, merge, BehaviorSubject } from 'rxjs';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';

class McTreeNodeDef extends CdkTreeNodeDef {
}
/** @nocollapse */ McTreeNodeDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodeDef, deps: null, target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTreeNodeDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTreeNodeDef, selector: "[mcTreeNodeDef]", inputs: { when: ["mcTreeNodeDefWhen", "when"], data: ["mcTreeNode", "data"] }, providers: [{ provide: CdkTreeNodeDef, useExisting: McTreeNodeDef }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodeDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcTreeNodeDef]',
                    inputs: ['when: mcTreeNodeDefWhen'],
                    providers: [{ provide: CdkTreeNodeDef, useExisting: McTreeNodeDef }]
                }]
        }], propDecorators: { data: [{
                type: Input,
                args: ['mcTreeNode']
            }] } });

class McTreeNodePadding extends CdkTreeNodePadding {
    constructor() {
        super(...arguments);
        this.baseLeftPadding = 12;
        this.iconWidth = 20;
    }
    get level() { return this._level; }
    set level(value) { this.setLevelInput(value); }
    get indent() { return this._indent; }
    set indent(indent) { this.setIndentInput(indent); }
    get leftPadding() {
        return (this.withIcon ? 0 : this.iconWidth) + this.baseLeftPadding;
    }
    paddingIndent() {
        const nodeLevel = (this.treeNode.data && this.tree.treeControl.getLevel)
            ? this.tree.treeControl.getLevel(this.treeNode.data)
            : 0;
        const level = this.level || nodeLevel;
        return level > 0 ? `${(level * this._indent) + this.leftPadding}px` : `${this.leftPadding}px`;
    }
    ngOnInit() {
        this.withIcon = this.tree.treeControl.isExpandable(this.treeNode.data);
        this.setPadding();
    }
}
/** @nocollapse */ McTreeNodePadding.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodePadding, deps: null, target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTreeNodePadding.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTreeNodePadding, selector: "[mcTreeNodePadding]", inputs: { level: ["mcTreeNodePadding", "level"], indent: ["mcTreeNodePaddingIndent", "indent"] }, providers: [{ provide: CdkTreeNodePadding, useExisting: McTreeNodePadding }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodePadding, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcTreeNodePadding]',
                    providers: [{ provide: CdkTreeNodePadding, useExisting: McTreeNodePadding }]
                }]
        }], propDecorators: { level: [{
                type: Input,
                args: ['mcTreeNodePadding']
            }], indent: [{
                type: Input,
                args: ['mcTreeNodePaddingIndent']
            }] } });

class McTreeNodeToggleComponent {
    constructor(tree, treeNode) {
        this.tree = tree;
        this.treeNode = treeNode;
        this.disabled = false;
        this._recursive = false;
        this.tree.treeControl.filterValue
            .pipe(map((value) => (value === null || value === void 0 ? void 0 : value.length) > 0))
            .subscribe((state) => this.disabled = state);
    }
    get recursive() {
        return this._recursive;
    }
    set recursive(value) {
        this._recursive = value;
    }
    get iconState() {
        return this.disabled || this.tree.treeControl.isExpanded(this.node);
    }
    toggle(event) {
        this.recursive
            ? this.tree.treeControl.toggleDescendants(this.treeNode.data)
            : this.tree.treeControl.toggle(this.treeNode.data);
        event.stopPropagation();
    }
}
/** @nocollapse */ McTreeNodeToggleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodeToggleComponent, deps: [{ token: i1.CdkTree }, { token: i1.CdkTreeNode }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McTreeNodeToggleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McTreeNodeToggleComponent, selector: "mc-tree-node-toggle", inputs: { node: "node", recursive: ["cdkTreeNodeToggleRecursive", "recursive"] }, host: { listeners: { "click": "toggle($event)" }, properties: { "class.mc-opened": "iconState", "attr.disabled": "disabled || null" }, classAttribute: "mc-tree-node-toggle" }, ngImport: i0, template: `
        <i class="mc mc-icon mc-angle-down-S_16"></i>
    `, isInline: true, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodeToggleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-tree-node-toggle',
                    template: `
        <i class="mc mc-icon mc-angle-down-S_16"></i>
    `,
                    host: {
                        class: 'mc-tree-node-toggle',
                        '[class.mc-opened]': 'iconState',
                        '[attr.disabled]': 'disabled || null',
                        '(click)': 'toggle($event)'
                    },
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i1.CdkTree }, { type: i1.CdkTreeNode }]; }, propDecorators: { node: [{
                type: Input
            }], recursive: [{
                type: Input,
                args: ['cdkTreeNodeToggleRecursive']
            }] } });
class McTreeNodeToggleDirective {
    constructor(tree, treeNode) {
        this.tree = tree;
        this.treeNode = treeNode;
        this.disabled = false;
        this._recursive = false;
        this.tree.treeControl.filterValue
            .pipe(map((value) => value.length > 0))
            .subscribe((state) => this.disabled = state);
    }
    get recursive() {
        return this._recursive;
    }
    set recursive(value) {
        this._recursive = value;
    }
    toggle(event) {
        this.recursive
            ? this.tree.treeControl.toggleDescendants(this.treeNode.data)
            : this.tree.treeControl.toggle(this.treeNode.data);
        event.stopPropagation();
    }
}
/** @nocollapse */ McTreeNodeToggleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodeToggleDirective, deps: [{ token: i1.CdkTree }, { token: i1.CdkTreeNode }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTreeNodeToggleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTreeNodeToggleDirective, selector: "[mcTreeNodeToggle]", inputs: { recursive: ["cdkTreeNodeToggleRecursive", "recursive"] }, host: { listeners: { "click": "toggle($event)" }, properties: { "attr.disabled": "disabled || null" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodeToggleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcTreeNodeToggle]',
                    host: {
                        '[attr.disabled]': 'disabled || null',
                        '(click)': 'toggle($event)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.CdkTree }, { type: i1.CdkTreeNode }]; }, propDecorators: { recursive: [{
                type: Input,
                args: ['cdkTreeNodeToggleRecursive']
            }] } });

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
class McTreeOption extends CdkTreeNode {
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
        return this._disabled || (this.tree && this.tree.disabled);
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
    get multiple() {
        return this.tree.multiple;
    }
    get viewValue() {
        // TODO: Add input property alternative for node envs.
        return (this.getHostElement().textContent || '').trim();
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
        if (focusOrigin === 'program') {
            return;
        }
        if (this.disabled || this.hasFocus) {
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
                this.hasFocus = false;
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
        if (!this._selected) {
            this._selected = true;
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent();
        }
    }
    deselect() {
        if (this._selected) {
            this._selected = false;
            this.changeDetectorRef.markForCheck();
        }
    }
    selectViaInteraction($event) {
        if (!this.disabled) {
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent(true);
            const shiftKey = $event ? hasModifierKey($event, 'shiftKey') : false;
            const ctrlKey = $event ? hasModifierKey($event, 'ctrlKey') : false;
            this.tree.setSelectedOptionsByClick(this, shiftKey, ctrlKey);
        }
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
/** @nocollapse */ McTreeOption.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McTreeOption, selector: "mc-tree-option", inputs: { disabled: "disabled", showCheckbox: "showCheckbox" }, outputs: { onSelectionChange: "onSelectionChange" }, host: { listeners: { "focusin": "focus()", "blur": "blur()", "click": "selectViaInteraction($event)" }, properties: { "attr.id": "id", "attr.tabindex": "-1", "attr.disabled": "disabled || null", "class.mc-selected": "selected", "class.mc-focused": "hasFocus" }, classAttribute: "mc-tree-option" }, providers: [{ provide: CdkTreeNode, useExisting: McTreeOption }], exportAs: ["mcTreeOption"], usesInheritance: true, ngImport: i0, template: "<ng-content select=\"[mc-icon]\"></ng-content>\n\n<ng-content select=\"mc-tree-node-toggle\"></ng-content>\n\n<mc-pseudo-checkbox\n    *ngIf=\"showCheckbox\"\n    [state]=\"selected ? 'checked' : 'unchecked'\"\n    [disabled]=\"disabled\">\n</mc-pseudo-checkbox>\n\n<span class=\"mc-option-text mc-no-select\"><ng-content></ng-content></span>\n\n<div class=\"mc-option-overlay\"></div>\n", components: [{ type: i1$1.McPseudoCheckbox, selector: "mc-pseudo-checkbox", inputs: ["state", "disabled"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeOption, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-tree-option',
                    exportAs: 'mcTreeOption',
                    templateUrl: './tree-option.html',
                    host: {
                        '[attr.id]': 'id',
                        '[attr.tabindex]': '-1',
                        '[attr.disabled]': 'disabled || null',
                        class: 'mc-tree-option',
                        '[class.mc-selected]': 'selected',
                        '[class.mc-focused]': 'hasFocus',
                        '(focusin)': 'focus()',
                        '(blur)': 'blur()',
                        '(click)': 'selectViaInteraction($event)'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    providers: [{ provide: CdkTreeNode, useExisting: McTreeOption }]
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_TREE_OPTION_PARENT_COMPONENT]
                }] }]; }, propDecorators: { disabled: [{
                type: Input
            }], showCheckbox: [{
                type: Input
            }], onSelectionChange: [{
                type: Output
            }] } });

/* tslint:disable:no-empty */
const MC_SELECTION_TREE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => McTreeSelection),
    multi: true
};
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
class McTreeSelection extends CdkTree {
    constructor(elementRef, differs, changeDetectorRef, multiple) {
        super(differs, changeDetectorRef);
        this.elementRef = elementRef;
        this.renderedOptions = new QueryList();
        this.resetFocusedItemOnBlur = true;
        this.navigationChange = new EventEmitter();
        this.selectionChange = new EventEmitter();
        this.multipleMode = null;
        this.userTabIndex = null;
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
        this.keyManager.setFirstItemActive();
    }
    blur() {
        if (!this.hasFocusedOption() && this.resetFocusedItemOnBlur) {
            this.keyManager.setActiveItem(-1);
        }
        this.onTouched();
        this.changeDetectorRef.markForCheck();
    }
    onKeyDown(event) {
        this.keyManager.setFocusOrigin('keyboard');
        // tslint:disable-next-line: deprecation
        const keyCode = event.keyCode;
        switch (keyCode) {
            case DOWN_ARROW:
                this.keyManager.setNextItemActive();
                break;
            case UP_ARROW:
                this.keyManager.setPreviousItemActive();
                break;
            case LEFT_ARROW:
                if (this.keyManager.activeItem) {
                    this.treeControl.collapse(this.keyManager.activeItem.data);
                }
                event.preventDefault();
                return;
            case RIGHT_ARROW:
                if (this.keyManager.activeItem) {
                    this.treeControl.expand(this.keyManager.activeItem.data);
                }
                event.preventDefault();
                return;
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
                return;
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
        this.updateScrollSize();
        this.nodeOutlet.changeDetectorRef.detectChanges();
    }
    getHeight() {
        const clientRects = this.elementRef.nativeElement.getClientRects();
        if (clientRects.length) {
            return clientRects[0].height;
        }
        return 0;
    }
    getItemHeight() {
        return this.renderedOptions.first ? this.renderedOptions.first.getHeight() : 0;
    }
    emitNavigationEvent(option) {
        this.navigationChange.emit(new McTreeNavigationChange(this, option));
    }
    emitChangeEvent(option) {
        this.selectionChange.emit(new McTreeNavigationChange(this, option));
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
/** @nocollapse */ McTreeSelection.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McTreeSelection, selector: "mc-tree-selection", inputs: { treeControl: "treeControl", autoSelect: "autoSelect", noUnselectLast: "noUnselectLast", disabled: "disabled", tabIndex: "tabIndex" }, outputs: { navigationChange: "navigationChange", selectionChange: "selectionChange" }, host: { listeners: { "blur": "blur()", "focus": "focus($event)", "keydown": "onKeyDown($event)", "window:resize": "updateScrollSize()" }, properties: { "attr.tabindex": "tabIndex", "attr.disabled": "disabled || null" }, classAttribute: "mc-tree-selection" }, providers: [
        MC_SELECTION_TREE_VALUE_ACCESSOR,
        { provide: MC_TREE_OPTION_PARENT_COMPONENT, useExisting: McTreeSelection },
        { provide: CdkTree, useExisting: McTreeSelection }
    ], queries: [{ propertyName: "unorderedOptions", predicate: McTreeOption }], viewQueries: [{ propertyName: "nodeOutlet", first: true, predicate: CdkTreeNodeOutlet, descendants: true, static: true }], exportAs: ["mcTreeSelection"], usesInheritance: true, ngImport: i0, template: '<ng-container cdkTreeNodeOutlet></ng-container>', isInline: true, styles: [".mc-tree-selection{display:block}.mc-tree-option{display:flex;align-items:center;padding-right:16px;padding-right:var(--mc-tree-size-padding-right, 16px);height:28px;height:var(--mc-tree-size-node-height, 28px);word-wrap:break-word;border:2px solid transparent;border:var(--mc-tree-size-border-width, 2px) solid transparent}.mc-tree-option>.mc-icon{margin-right:4px;cursor:pointer}.mc-tree-option:focus{outline:none}.mc-tree-option:not([disabled]){cursor:pointer}.mc-tree-option .mc-pseudo-checkbox{margin-right:8px}.mc-tree-node-toggle{margin-right:4px;cursor:pointer}.mc-tree-node-toggle .mc-icon{transform:rotate(-90deg)}.mc-tree-node-toggle.mc-opened .mc-icon{transform:rotate(0)}.mc-tree-node-toggle[disabled]{cursor:default}\n"], directives: [{ type: i1.CdkTreeNodeOutlet, selector: "[cdkTreeNodeOutlet]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeSelection, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-tree-selection',
                    exportAs: 'mcTreeSelection',
                    template: '<ng-container cdkTreeNodeOutlet></ng-container>',
                    styleUrls: ['./tree.scss'],
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
                        { provide: CdkTree, useExisting: McTreeSelection }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.IterableDiffers }, { type: i0.ChangeDetectorRef }, { type: i1$1.MultipleMode, decorators: [{
                    type: Attribute,
                    args: ['multiple']
                }] }]; }, propDecorators: { nodeOutlet: [{
                type: ViewChild,
                args: [CdkTreeNodeOutlet, { static: true }]
            }], unorderedOptions: [{
                type: ContentChildren,
                args: [McTreeOption]
            }], treeControl: [{
                type: Input
            }], navigationChange: [{
                type: Output
            }], selectionChange: [{
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
    McTreeSelection,
    McTreeOption,
    McTreeNodeDef,
    McTreeNodePadding,
    McTreeNodeToggleComponent,
    McTreeNodeToggleDirective
];
class McTreeModule {
}
/** @nocollapse */ McTreeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McTreeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeModule, declarations: [McTreeSelection,
        McTreeOption,
        McTreeNodeDef,
        McTreeNodePadding,
        McTreeNodeToggleComponent,
        McTreeNodeToggleDirective], imports: [CommonModule, CdkTreeModule, McPseudoCheckboxModule], exports: [McTreeSelection,
        McTreeOption,
        McTreeNodeDef,
        McTreeNodePadding,
        McTreeNodeToggleComponent,
        McTreeNodeToggleDirective] });
/** @nocollapse */ McTreeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeModule, imports: [[CommonModule, CdkTreeModule, McPseudoCheckboxModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, CdkTreeModule, McPseudoCheckboxModule],
                    exports: MC_TREE_DIRECTIVES,
                    declarations: MC_TREE_DIRECTIVES
                }]
        }] });

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

export { MC_SELECTION_TREE_VALUE_ACCESSOR, MC_TREE_OPTION_PARENT_COMPONENT, McTreeFlatDataSource, McTreeFlattener, McTreeModule, McTreeNavigationChange, McTreeNestedDataSource, McTreeNodeDef, McTreeNodePadding, McTreeNodeToggleComponent, McTreeNodeToggleDirective, McTreeOption, McTreeOptionChange, McTreeSelection, McTreeSelectionChange };
//# sourceMappingURL=ptsecurity-mosaic-tree.js.map
