/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { Directive, Input, ChangeDetectorRef, Component, EventEmitter, Output, ElementRef, Inject, Optional, InjectionToken, ChangeDetectionStrategy, ViewEncapsulation, Attribute, ContentChildren, IterableDiffers, ViewChild, Self, NgModule } from '@angular/core';
import { CdkTreeNodeDef, CdkTreeNodePadding, CdkTreeNodeToggle, CdkTreeNode, CdkTree, CdkTreeNodeOutlet, CdkTreeModule } from '@ptsecurity/cdk/tree';
import { toBoolean, McPseudoCheckboxModule } from '@ptsecurity/mosaic/core';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { NgControl } from '@angular/forms';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { END, ENTER, hasModifierKey, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, SPACE } from '@ptsecurity/cdk/keycodes';
import { Subject, BehaviorSubject, merge } from 'rxjs';
import { takeUntil, map, take } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class McTreeNodeDef extends CdkTreeNodeDef {
}
McTreeNodeDef.decorators = [
    { type: Directive, args: [{
                selector: '[mcTreeNodeDef]',
                inputs: ['when: mcTreeNodeDefWhen'],
                providers: [{ provide: CdkTreeNodeDef, useExisting: McTreeNodeDef }]
            },] },
];
McTreeNodeDef.propDecorators = {
    data: [{ type: Input, args: ['mcTreeNode',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class McTreeNodePadding extends CdkTreeNodePadding {
    constructor() {
        super(...arguments);
        this.baseLeftPadding = 12;
        /* tslint:disable-next-line:naming-convention */
        this._indent = 20;
        this.iconWidth = 20;
    }
    /**
     * @return {?}
     */
    get leftPadding() {
        return (this.withIcon ? 0 : this.iconWidth) + this.baseLeftPadding;
    }
    /**
     * @return {?}
     */
    paddingIndent() {
        /** @type {?} */
        const nodeLevel = (this.treeNode.data && this.tree.treeControl.getLevel)
            ? this.tree.treeControl.getLevel(this.treeNode.data)
            : null;
        /** @type {?} */
        const level = this.level || nodeLevel;
        return level ? `${(level * this._indent) + this.leftPadding}px` : `${this.baseLeftPadding}px`;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.withIcon = this.tree.treeControl.isExpandable(this.treeNode.data);
        this.setPadding();
    }
}
McTreeNodePadding.decorators = [
    { type: Directive, args: [{
                selector: '[mcTreeNodePadding]',
                providers: [{ provide: CdkTreeNodePadding, useExisting: McTreeNodePadding }]
            },] },
];
McTreeNodePadding.propDecorators = {
    level: [{ type: Input, args: ['mcTreeNodePadding',] }],
    indent: [{ type: Input, args: ['mcTreeNodePaddingIndent',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class McTreeNodeToggle extends CdkTreeNodeToggle {
}
McTreeNodeToggle.decorators = [
    { type: Directive, args: [{
                selector: '[mcTreeNodeToggle]',
                host: {
                    '(click)': 'toggle($event)'
                },
                providers: [{ provide: CdkTreeNodeToggle, useExisting: McTreeNodeToggle }]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Injection token used to provide the parent component to options.
 * @type {?}
 */
const MC_TREE_OPTION_PARENT_COMPONENT = new InjectionToken('MC_TREE_OPTION_PARENT_COMPONENT');
class McTreeOptionChange {
    /**
     * @param {?} source
     * @param {?=} isUserInput
     */
    constructor(source, isUserInput = false) {
        this.source = source;
        this.isUserInput = isUserInput;
    }
}
/** @type {?} */
let uniqueIdCounter = 0;
class McTreeOption extends CdkTreeNode {
    /**
     * @param {?} elementRef
     * @param {?} changeDetectorRef
     * @param {?} parent
     */
    constructor(elementRef, changeDetectorRef, parent) {
        // todo any
        super(elementRef, (/** @type {?} */ (parent)));
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this.parent = parent;
        this._disabled = false;
        this.onSelectionChange = new EventEmitter();
        this._selected = false;
        this._id = `mc-tree-option-${uniqueIdCounter++}`;
        this.hasFocus = false;
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = value;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        /** @type {?} */
        const newValue = toBoolean(value);
        if (newValue !== this._disabled) {
            this._disabled = newValue;
        }
    }
    // @Input()
    // get selected(): boolean {
    //     return this.treeSelection.selectionModel && this.treeSelection.selectionModel.isSelected(this) || false;
    // }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        /** @type {?} */
        const isSelected = toBoolean(value);
        if (isSelected !== this._selected) {
            this.setSelected(isSelected);
            // this.treeSelection._reportValueChange();
        }
    }
    /**
     * @return {?}
     */
    get id() {
        return this._id;
    }
    /**
     * @return {?}
     */
    get multiple() {
        return this.parent.multiple;
    }
    /**
     * @return {?}
     */
    toggle() {
        this.selected = !this.selected;
    }
    /**
     * @param {?} selected
     * @return {?}
     */
    setSelected(selected) {
        if (this._selected === selected || !this.parent.selectionModel) {
            return;
        }
        this._selected = selected;
        if (selected) {
            this.parent.selectionModel.select(this.value);
        }
        else {
            this.parent.selectionModel.deselect(this.value);
        }
        this.changeDetectorRef.markForCheck();
    }
    /**
     * @return {?}
     */
    handleFocus() {
        if (this.disabled || this.hasFocus) {
            return;
        }
        this.hasFocus = true;
        if (this.parent.setFocusedOption) {
            this.parent.setFocusedOption(this);
        }
    }
    /**
     * @return {?}
     */
    handleBlur() {
        this.hasFocus = false;
    }
    /**
     * @return {?}
     */
    focus() {
        /** @type {?} */
        const element = this.getHostElement();
        if (typeof element.focus === 'function') {
            element.focus();
        }
    }
    /**
     * @return {?}
     */
    getHeight() {
        /** @type {?} */
        const clientRects = this.elementRef.nativeElement.getClientRects();
        if (clientRects.length) {
            return clientRects[0].height;
        }
        return 0;
    }
    /**
     * @return {?}
     */
    get viewValue() {
        // TODO: Add input property alternative for node envs.
        return (this.getHostElement().textContent || '').trim();
    }
    /**
     * @return {?}
     */
    select() {
        if (!this._selected) {
            this._selected = true;
            this.changeDetectorRef.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    deselect() {
        if (this._selected) {
            this._selected = false;
            this.changeDetectorRef.markForCheck();
        }
    }
    /**
     * @param {?=} $event
     * @return {?}
     */
    selectViaInteraction($event) {
        if (!this.disabled) {
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent(true);
            if (this.parent.setSelectedOption) {
                this.parent.setSelectedOption(this, $event);
            }
        }
    }
    /**
     * @param {?=} isUserInput
     * @return {?}
     */
    emitSelectionChangeEvent(isUserInput = false) {
        this.onSelectionChange.emit(new McTreeOptionChange(this, isUserInput));
    }
    /**
     * @return {?}
     */
    getHostElement() {
        return this.elementRef.nativeElement;
    }
    /**
     * @return {?}
     */
    getTabIndex() {
        return this.disabled ? '-1' : '0';
    }
}
McTreeOption.decorators = [
    { type: Component, args: [{
                selector: 'mc-tree-option',
                exportAs: 'mcTreeOption',
                template: "<ng-content select=\"[mc-icon]\"></ng-content><mc-pseudo-checkbox *ngIf=\"multiple\" [state]=\"selected ? 'checked' : ''\" [disabled]=\"disabled\"></mc-pseudo-checkbox><span class=\"mc-option-text\"><ng-content></ng-content></span><div class=\"mc-option-overlay\"></div>",
                host: {
                    '[attr.id]': 'id',
                    '[attr.tabindex]': 'getTabIndex()',
                    '[attr.disabled]': 'disabled || null',
                    class: 'mc-tree-option',
                    '[class.mc-selected]': 'selected',
                    '[class.mc-focused]': 'hasFocus',
                    '(focus)': 'handleFocus()',
                    '(blur)': 'handleBlur()',
                    '(click)': 'selectViaInteraction($event)'
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                providers: [{ provide: CdkTreeNode, useExisting: McTreeOption }]
            },] },
];
/** @nocollapse */
McTreeOption.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_TREE_OPTION_PARENT_COMPONENT,] }] }
];
McTreeOption.propDecorators = {
    value: [{ type: Input }],
    disabled: [{ type: Input }],
    onSelectionChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McTreeNavigationChange {
    /**
     * @param {?} source
     * @param {?} option
     */
    constructor(source, option) {
        this.source = source;
        this.option = option;
    }
}
class McTreeSelectionChange {
    /**
     * @param {?} source
     * @param {?} option
     */
    constructor(source, option) {
        this.source = source;
        this.option = option;
    }
}
class McTreeSelection extends CdkTree {
    /**
     * @param {?} elementRef
     * @param {?} differs
     * @param {?} changeDetectorRef
     * @param {?} ngControl
     * @param {?} multiple
     * @param {?} autoSelect
     * @param {?} noUnselect
     */
    constructor(elementRef, differs, changeDetectorRef, ngControl, multiple, autoSelect, noUnselect) {
        super(differs, changeDetectorRef);
        this.elementRef = elementRef;
        this.ngControl = ngControl;
        this.navigationChange = new EventEmitter();
        this.selectionChange = new EventEmitter();
        this._disabled = false;
        this.destroy = new Subject();
        /**
         * `View -> model callback called when value changes`
         */
        this.onChange = (/**
         * @return {?}
         */
        () => { });
        /**
         * `View -> model callback called when select has been touched`
         */
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
        if (this.ngControl) {
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }
        this.multiple = multiple === null ? false : toBoolean(multiple);
        this.autoSelect = autoSelect === null ? true : toBoolean(autoSelect);
        this.noUnselectLastSelected = noUnselect === null ? true : toBoolean(noUnselect);
        this.selectionModel = new SelectionModel(this.multiple);
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} rawValue
     * @return {?}
     */
    set disabled(rawValue) {
        /** @type {?} */
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
    /**
     * @return {?}
     */
    get tabIndex() {
        return this.disabled ? -1 : this._tabIndex;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set tabIndex(value) {
        this._tabIndex = value != null ? value : 0;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.keyManager = new FocusKeyManager(this.options)
            .withVerticalOrientation(true)
            .withHorizontalOrientation(null);
        this.keyManager.change
            .pipe(takeUntil(this.destroy))
            .subscribe((/**
         * @return {?}
         */
        () => {
            if (this.keyManager.activeItem) {
                this.emitNavigationEvent(this.keyManager.activeItem);
            }
        }));
        this.selectionModel.changed
            .pipe(takeUntil(this.destroy))
            .subscribe((/**
         * @param {?} changeEvent
         * @return {?}
         */
        (changeEvent) => {
            this.onChange(changeEvent.source.selected);
            this.options.notifyOnChanges();
        }));
        this.options.changes
            .pipe(takeUntil(this.destroy))
            .subscribe((/**
         * @param {?} options
         * @return {?}
         */
        (options) => {
            options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            (option) => {
                option.deselect();
                this.selectionModel.selected.forEach((/**
                 * @param {?} selectedOption
                 * @return {?}
                 */
                (selectedOption) => {
                    if (option.value === selectedOption) {
                        option.select();
                    }
                }));
            }));
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy.next();
        this.destroy.complete();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        // tslint:disable-next-line: deprecation
        /** @type {?} */
        const keyCode = event.keyCode;
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
    /**
     * @return {?}
     */
    updateScrollSize() {
        if (!this.options.first) {
            return;
        }
        this.keyManager.withScrollSize(Math.floor(this.getHeight() / this.options.first.getHeight()));
    }
    /**
     * @param {?} option
     * @param {?=} $event
     * @return {?}
     */
    setSelectedOption(option, $event) {
        /** @type {?} */
        const withShift = $event ? hasModifierKey($event, 'shiftKey') : false;
        /** @type {?} */
        const withCtrl = $event ? hasModifierKey($event, 'ctrlKey') : false;
        if (this.multiple) {
            if (!this.canDeselectLast(option)) {
                return;
            }
            option.toggle();
            this.emitChangeEvent(option);
        }
        else if (withShift) {
            /** @type {?} */
            const previousIndex = this.keyManager.previousActiveItemIndex;
            /** @type {?} */
            const activeIndex = this.keyManager.activeItemIndex;
            if (previousIndex < activeIndex) {
                this.options.forEach((/**
                 * @param {?} item
                 * @param {?} index
                 * @return {?}
                 */
                (item, index) => {
                    if (index >= previousIndex && index <= activeIndex) {
                        item.setSelected(true);
                    }
                }));
            }
            else {
                this.options.forEach((/**
                 * @param {?} item
                 * @param {?} index
                 * @return {?}
                 */
                (item, index) => {
                    if (index >= activeIndex && index <= previousIndex) {
                        item.setSelected(true);
                    }
                }));
            }
            this.emitChangeEvent(option);
        }
        else if (withCtrl) {
            if (!this.canDeselectLast(option)) {
                return;
            }
            option.toggle();
            this.emitChangeEvent(option);
        }
        else {
            if (this.autoSelect) {
                this.options.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                (item) => item.setSelected(false)));
                option.setSelected(true);
                this.emitChangeEvent(option);
            }
        }
    }
    /**
     * @param {?} option
     * @return {?}
     */
    setFocusedOption(option) {
        this.keyManager.setActiveItem(option);
    }
    /**
     * @return {?}
     */
    toggleFocusedOption() {
        /** @type {?} */
        const focusedOption = this.keyManager.activeItem;
        if (focusedOption) {
            this.setSelectedOption(focusedOption);
        }
    }
    /**
     * @param {?} data
     * @param {?=} dataDiffer
     * @param {?=} viewContainer
     * @param {?=} parentData
     * @return {?}
     */
    renderNodeChanges(data, dataDiffer = this.dataDiffer, viewContainer = this.nodeOutlet.viewContainer, parentData) {
        super.renderNodeChanges(data, dataDiffer, viewContainer, parentData);
        /** @type {?} */
        const arrayOfInstances = [];
        viewContainer._embeddedViews.forEach((/**
         * @param {?} view
         * @return {?}
         */
        (view) => {
            /** @type {?} */
            const viewDef = view.def;
            viewDef.nodes.forEach((/**
             * @param {?} node
             * @return {?}
             */
            (node) => {
                if (viewDef.nodeMatchedQueries === node.matchedQueryIds) {
                    /** @type {?} */
                    const nodeData = view.nodes[node.nodeIndex];
                    arrayOfInstances.push((/** @type {?} */ (nodeData.instance)));
                    setTimeout((/**
                     * @return {?}
                     */
                    () => nodeData.instance.changeDetectorRef.detectChanges()));
                }
            }));
        }));
        if (this.options) {
            this.options.reset(arrayOfInstances);
            this.options.notifyOnChanges();
        }
        this.updateScrollSize();
        this.nodeOutlet.changeDetectorRef.detectChanges();
    }
    /**
     * @return {?}
     */
    getHeight() {
        /** @type {?} */
        const clientRects = this.elementRef.nativeElement.getClientRects();
        if (clientRects.length) {
            return clientRects[0].height;
        }
        return 0;
    }
    /**
     * @param {?} option
     * @return {?}
     */
    emitNavigationEvent(option) {
        this.navigationChange.emit(new McTreeNavigationChange(this, option));
    }
    /**
     * @param {?} option
     * @return {?}
     */
    emitChangeEvent(option) {
        this.selectionChange.emit(new McTreeNavigationChange(this, option));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (this.options) {
            this.setOptionsFromValues(this.multiple ? value : [value]);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this._disabled = isDisabled;
        this.changeDetectorRef.markForCheck();
        // this.stateChanges.next();
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    getCorrespondOption(value) {
        return this.options.find((/**
         * @param {?} option
         * @return {?}
         */
        (option) => {
            try {
                // Treat null as a special reset value.
                return option.value != null && option.value === value;
            }
            catch (error) {
                console.warn(error);
                return false;
            }
        }));
    }
    /**
     * @private
     * @param {?} values
     * @return {?}
     */
    setOptionsFromValues(values) {
        this.selectionModel.clear();
        values.forEach((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            /** @type {?} */
            const correspondingOption = this.getCorrespondOption(value);
            this.selectionModel.select(value);
            if (correspondingOption) {
                correspondingOption.selected = true;
            }
        }));
        this.options.notifyOnChanges();
    }
    /**
     * @private
     * @param {?} option
     * @return {?}
     */
    canDeselectLast(option) {
        return !(this.noUnselectLastSelected && this.selectionModel.selected.length === 1 && option.selected);
    }
}
McTreeSelection.decorators = [
    { type: Component, args: [{
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
                    { provide: MC_TREE_OPTION_PARENT_COMPONENT, useExisting: McTreeSelection },
                    { provide: CdkTree, useExisting: McTreeSelection }
                ]
            },] },
];
/** @nocollapse */
McTreeSelection.ctorParameters = () => [
    { type: ElementRef },
    { type: IterableDiffers },
    { type: ChangeDetectorRef },
    { type: NgControl, decorators: [{ type: Self }, { type: Optional }] },
    { type: String, decorators: [{ type: Attribute, args: ['multiple',] }] },
    { type: String, decorators: [{ type: Attribute, args: ['auto-select',] }] },
    { type: String, decorators: [{ type: Attribute, args: ['no-unselect',] }] }
];
McTreeSelection.propDecorators = {
    nodeOutlet: [{ type: ViewChild, args: [CdkTreeNodeOutlet, { static: true },] }],
    options: [{ type: ContentChildren, args: [McTreeOption,] }],
    navigationChange: [{ type: Output }],
    selectionChange: [{ type: Output }],
    disabled: [{ type: Input }],
    tabIndex: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const MC_TREE_DIRECTIVES = [
    McTreeSelection,
    McTreeOption,
    McTreeNodeDef,
    McTreeNodePadding,
    McTreeNodeToggle
];
class McTreeModule {
}
McTreeModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, CdkTreeModule, McPseudoCheckboxModule],
                exports: MC_TREE_DIRECTIVES,
                declarations: MC_TREE_DIRECTIVES
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
class McTreeFlattener {
    /**
     * @param {?} transformFunction
     * @param {?} getLevel
     * @param {?} isExpandable
     * @param {?} getChildren
     */
    constructor(transformFunction, getLevel, isExpandable, getChildren) {
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
    flattenNode(node, level, resultNodes, parentMap) {
        /** @type {?} */
        const flatNode = this.transformFunction(node, level);
        resultNodes.push(flatNode);
        if (this.isExpandable(flatNode)) {
            this.getChildren(node)
                .pipe(take(1))
                .subscribe((/**
             * @param {?} children
             * @return {?}
             */
            (children) => {
                children.forEach((/**
                 * @param {?} child
                 * @param {?} index
                 * @return {?}
                 */
                (child, index) => {
                    /** @type {?} */
                    const childParentMap = parentMap.slice();
                    childParentMap.push(index !== children.length - 1);
                    this.flattenNode(child, level + 1, resultNodes, childParentMap);
                }));
            }));
        }
        return resultNodes;
    }
    /**
     * Flatten a list of node type T to flattened version of node F.
     * Please note that type T may be nested, and the length of `structuredData` may be different
     * from that of returned list `F[]`.
     * @param {?} structuredData
     * @return {?}
     */
    flattenNodes(structuredData) {
        /** @type {?} */
        const resultNodes = [];
        structuredData.forEach((/**
         * @param {?} node
         * @return {?}
         */
        (node) => this.flattenNode(node, 0, resultNodes, [])));
        return resultNodes;
    }
    /**
     * Expand flattened node with current expansion status.
     * The returned list may have different length.
     * @param {?} nodes
     * @param {?} treeControl
     * @return {?}
     */
    expandFlattenedNodes(nodes, treeControl) {
        /** @type {?} */
        const results = [];
        /** @type {?} */
        const currentExpand = [];
        currentExpand[0] = true;
        nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            /** @type {?} */
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
        }));
        return results;
    }
}
/**
 * Data source for flat tree.
 * The data source need to handle expansion/collapsion of the tree node and change the data feed
 * to `McTree`.
 * The nested tree nodes of type `T` are flattened through `MсTreeFlattener`, and converted
 * to type `F` for `McTree` to consume.
 * @template T, F
 */
class McTreeFlatDataSource extends DataSource {
    /**
     * @param {?} treeControl
     * @param {?} treeFlattener
     * @param {?=} initialData
     */
    constructor(treeControl, treeFlattener, initialData = []) {
        super();
        this.treeControl = treeControl;
        this.treeFlattener = treeFlattener;
        this.flattenedData = new BehaviorSubject([]);
        this.expandedData = new BehaviorSubject([]);
        this._data = new BehaviorSubject(initialData);
    }
    /**
     * @return {?}
     */
    get data() {
        return this._data.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set data(value) {
        this._data.next(value);
        this.flattenedData.next(this.treeFlattener.flattenNodes(this.data));
        this.treeControl.dataNodes = this.flattenedData.value;
    }
    /**
     * @param {?} collectionViewer
     * @return {?}
     */
    connect(collectionViewer) {
        /** @type {?} */
        const changes = [
            collectionViewer.viewChange,
            this.treeControl.expansionModel.changed,
            this.flattenedData
        ];
        return merge(...changes)
            .pipe(map((/**
         * @return {?}
         */
        () => {
            this.expandedData.next(this.treeFlattener.expandFlattenedNodes(this.flattenedData.value, this.treeControl));
            return this.expandedData.value;
        })));
    }
    /**
     * @return {?}
     */
    disconnect() {
        // no op
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Data source for nested tree.
 *
 * The data source for nested tree doesn't have to consider node flattener, or the way to expand
 * or collapse. The expansion/collapsion will be handled by ITreeControl and each non-leaf node.
 * @template T
 */
class McTreeNestedDataSource extends DataSource {
    constructor() {
        super(...arguments);
        /* tslint:disable-next-line:naming-convention */
        this._data = new BehaviorSubject([]);
    }
    /**
     * @return {?}
     */
    get data() {
        return this._data.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set data(value) {
        this._data.next(value);
    }
    /**
     * @param {?} collectionViewer
     * @return {?}
     */
    connect(collectionViewer) {
        return merge(...[collectionViewer.viewChange, this._data])
            .pipe(map((/**
         * @return {?}
         */
        () => this.data)));
    }
    /**
     * @return {?}
     */
    disconnect() {
        // no op
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McTreeModule, McTreeNodeDef, McTreeNodePadding, McTreeNodeToggle, McTreeNavigationChange, McTreeSelectionChange, McTreeSelection, MC_TREE_OPTION_PARENT_COMPONENT, McTreeOptionChange, McTreeOption, McTreeFlattener, McTreeFlatDataSource, McTreeNestedDataSource };
//# sourceMappingURL=tree.js.map
