import { Clipboard } from '@angular/cdk/clipboard';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, IterableDiffer, IterableDiffers, QueryList, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { CanDisable, HasTabIndex, MultipleMode } from '@ptsecurity/mosaic/core';
import { Observable } from 'rxjs';
import { FlatTreeControl } from './control/flat-tree-control';
import { McTreeNodeOutlet } from './outlet';
import { McTreeBase } from './tree-base';
import { McTreeOption, McTreeOptionEvent } from './tree-option.component';
import * as i0 from "@angular/core";
export declare const MC_SELECTION_TREE_VALUE_ACCESSOR: any;
export declare class McTreeSelectAllEvent<T> {
    source: McTreeSelection;
    options: T[];
    constructor(source: McTreeSelection, options: T[]);
}
export declare class McTreeCopyEvent<T> {
    source: McTreeSelection;
    option: T;
    constructor(source: McTreeSelection, option: T);
}
export declare class McTreeNavigationChange<T> {
    source: McTreeSelection;
    option: T;
    constructor(source: McTreeSelection, option: T);
}
export declare class McTreeSelectionChange<T> {
    source: McTreeSelection;
    option: T;
    constructor(source: McTreeSelection, option: T);
}
interface SelectionModelOption {
    id: number | string;
    value: string;
}
export declare class McTreeSelection extends McTreeBase<any> implements ControlValueAccessor, AfterContentInit, CanDisable, HasTabIndex {
    private elementRef;
    private clipboard;
    renderedOptions: QueryList<McTreeOption>;
    keyManager: FocusKeyManager<McTreeOption>;
    selectionModel: SelectionModel<SelectionModelOption>;
    resetFocusedItemOnBlur: boolean;
    multipleMode: MultipleMode | null;
    userTabIndex: number | null;
    nodeOutlet: McTreeNodeOutlet;
    unorderedOptions: QueryList<McTreeOption>;
    treeControl: FlatTreeControl<any>;
    readonly navigationChange: EventEmitter<McTreeNavigationChange<McTreeOption>>;
    readonly selectionChange: EventEmitter<McTreeSelectionChange<McTreeOption>>;
    readonly onSelectAll: EventEmitter<McTreeSelectAllEvent<McTreeOption>>;
    readonly onCopy: EventEmitter<McTreeCopyEvent<McTreeOption>>;
    private sortedNodes;
    get autoSelect(): boolean;
    set autoSelect(value: boolean);
    private _autoSelect;
    get optionFocusChanges(): Observable<McTreeOptionEvent>;
    get optionBlurChanges(): Observable<McTreeOptionEvent>;
    get multiple(): boolean;
    get noUnselectLast(): boolean;
    set noUnselectLast(value: boolean);
    private _noUnselectLast;
    get disabled(): boolean;
    set disabled(rawValue: boolean);
    private _disabled;
    get tabIndex(): any;
    set tabIndex(value: any);
    private _tabIndex;
    get showCheckbox(): boolean;
    get isEmpty(): boolean;
    private readonly destroy;
    private optionFocusSubscription;
    private optionBlurSubscription;
    constructor(elementRef: ElementRef, differs: IterableDiffers, changeDetectorRef: ChangeDetectorRef, multiple: MultipleMode, clipboard: Clipboard);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    focus($event: any): void;
    blur(): void;
    onKeyDown(event: KeyboardEvent): void;
    updateScrollSize(): void;
    setSelectedOptionsByKey(option: McTreeOption, shiftKey: boolean, ctrlKey: boolean): void;
    setSelectedOptionsByClick(option: McTreeOption, shiftKey: boolean, ctrlKey: boolean): void;
    setSelectedOptions(option: McTreeOption): void;
    setFocusedOption(option: McTreeOption): void;
    toggleFocusedOption(): void;
    renderNodeChanges(data: McTreeOption[], dataDiffer?: IterableDiffer<McTreeOption>, viewContainer?: ViewContainerRef, parentData?: McTreeOption): void;
    emitNavigationEvent(option: McTreeOption): void;
    emitChangeEvent(option: McTreeOption): void;
    selectAllOptions(): void;
    copyActiveOption(): void;
    writeValue(value: any): void;
    /** `View -> model callback called when value changes` */
    onChange: (value: any) => void;
    registerOnChange(fn: (value: any) => void): void;
    /** `View -> model callback called when select has been touched` */
    onTouched: () => void;
    registerOnTouched(fn: () => {}): void;
    /**
     * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
     */
    setDisabledState(isDisabled: boolean): void;
    setOptionsFromValues(values: any[]): void;
    getSelectedValues(): any[];
    getItemHeight(): number;
    private onCopyDefaultHandler;
    private getHeight;
    private updateTabIndex;
    private updateRenderedOptions;
    private getSortedNodes;
    private allowFocusEscape;
    private resetOptions;
    private dropSubscriptions;
    private listenToOptionsFocus;
    /**
     * Utility to ensure all indexes are valid.
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of options.
     */
    private isValidIndex;
    /** Checks whether any of the options is focused. */
    private hasFocusedOption;
    private markOptionsForCheck;
    private updateOptionsFocus;
    private canDeselectLast;
    private isFocusReceivedFromNestedOption;
    static ɵfac: i0.ɵɵFactoryDeclaration<McTreeSelection, [null, null, null, { attribute: "multiple"; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McTreeSelection, "mc-tree-selection", ["mcTreeSelection"], { "treeControl": "treeControl"; "autoSelect": "autoSelect"; "noUnselectLast": "noUnselectLast"; "disabled": "disabled"; "tabIndex": "tabIndex"; }, { "navigationChange": "navigationChange"; "selectionChange": "selectionChange"; "onSelectAll": "onSelectAll"; "onCopy": "onCopy"; }, ["unorderedOptions"], never>;
}
export {};
