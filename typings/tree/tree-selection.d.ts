import { AfterContentInit, ChangeDetectorRef, EventEmitter, IterableDiffer, IterableDiffers, QueryList, ElementRef } from '@angular/core';
import { SelectionModel } from '@ptsecurity/cdk/collections';
import { CdkTreeNode, CdkTree, CdkTreeNodeOutlet } from '@ptsecurity/cdk/tree';
import { CanDisable, HasTabIndex } from '@ptsecurity/mosaic/core';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
/**
 * Wrapper for the CdkTree node with Material design styles.
 */
export declare class McTreeNodeOption<T> extends CdkTreeNode<T> implements CanDisable {
    protected _elementRef: ElementRef;
    protected treeSelection: McTreeSelection<T>;
    role: 'treeitem' | 'group';
    disabled: any;
    selected: boolean;
    private _hasFocus;
    private _disabled;
    private _selected;
    constructor(_elementRef: ElementRef, treeSelection: McTreeSelection<T>);
    focus(): void;
    toggle(): void;
    setSelected(selected: boolean): void;
    _getHeight(): number;
    _handleFocus(): void;
    _handleBlur(): void;
    _handleClick(): void;
}
export declare const _McTreeSelectionBase: (new (...args: any[]) => HasTabIndex) & (new (...args: any[]) => CanDisable) & typeof CdkTree;
export declare class McTreeNavigationChange {
    source: McTreeSelection<any>;
    option: McTreeNodeOption<any>;
    constructor(source: McTreeSelection<any>, option: McTreeNodeOption<any>);
}
export declare class McTreeSelectionChange {
    source: McTreeSelection<any>;
    option: McTreeNodeOption<any>;
    constructor(source: McTreeSelection<any>, option: McTreeNodeOption<any>);
}
export declare class McTreeSelection<T> extends _McTreeSelectionBase<T> implements AfterContentInit, CanDisable, HasTabIndex {
    private _elementRef;
    _nodeOutlet: CdkTreeNodeOutlet;
    options: QueryList<McTreeNodeOption<T>>;
    _keyManager: FocusKeyManager<McTreeNodeOption<T>>;
    selectedOptions: SelectionModel<McTreeNodeOption<T>>;
    _disabled: boolean;
    tabIndex: number;
    multiple: boolean;
    autoSelect: boolean;
    noUnselect: boolean;
    withShift: boolean;
    withCtrl: boolean;
    disabled: boolean;
    readonly navigationChange: EventEmitter<McTreeNavigationChange>;
    readonly selectionChange: EventEmitter<McTreeSelectionChange>;
    constructor(_elementRef: ElementRef, _differs: IterableDiffers, _changeDetectorRef: ChangeDetectorRef, tabIndex: string, multiple: string, autoSelect: string, noUnselect: string);
    _onKeyDown(event: KeyboardEvent): void;
    ngAfterContentInit(): void;
    updateScrollSize(): void;
    setFocusedOption(option: McTreeNodeOption<T>): void;
    toggleFocusedOption(): void;
    renderNodeChanges(data: T[], dataDiffer?: IterableDiffer<T>, viewContainer?: any, parentData?: T): void;
    _getHeight(): number;
    _emitNavigationEvent(option: McTreeNodeOption<T>): void;
    _emitChangeEvent(option: McTreeNodeOption<T>): void;
    /**
     * Utility to ensure all indexes are valid.
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of options.
     */
    private _isValidIndex(index);
    private _canDeselectLast(option);
}
