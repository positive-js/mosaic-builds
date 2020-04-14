import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, IterableDiffer, IterableDiffers, QueryList } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { CdkTree, CdkTreeNodeOutlet, FlatTreeControl } from '@ptsecurity/cdk/tree';
import { CanDisable, HasTabIndex, MultipleMode } from '@ptsecurity/mosaic/core';
import { Observable } from 'rxjs';
import { McTreeOption, McTreeOptionEvent } from './tree-option.component';
export declare const MC_SELECTION_TREE_VALUE_ACCESSOR: any;
export declare class McTreeNavigationChange<T> {
    source: McTreeSelection<any>;
    option: T;
    constructor(source: McTreeSelection<any>, option: T);
}
export declare class McTreeSelectionChange<T> {
    source: McTreeSelection<any>;
    option: T;
    constructor(source: McTreeSelection<any>, option: T);
}
interface SelectionModelOption {
    id: number | string;
    value: string;
}
export declare class McTreeSelection<T extends McTreeOption> extends CdkTree<T> implements ControlValueAccessor, AfterContentInit, CanDisable, HasTabIndex {
    private elementRef;
    nodeOutlet: CdkTreeNodeOutlet;
    renderedOptions: QueryList<T>;
    keyManager: FocusKeyManager<T>;
    selectionModel: SelectionModel<SelectionModelOption>;
    resetFocusedItemOnBlur: boolean;
    treeControl: FlatTreeControl<T>;
    readonly navigationChange: EventEmitter<McTreeNavigationChange<T>>;
    readonly selectionChange: EventEmitter<McTreeSelectionChange<T>>;
    multipleMode: MultipleMode | null;
    userTabIndex: number | null;
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
    private readonly destroy;
    private optionFocusSubscription;
    private optionBlurSubscription;
    constructor(elementRef: ElementRef, differs: IterableDiffers, changeDetectorRef: ChangeDetectorRef, multiple: MultipleMode);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    focus($event: any): void;
    blur(): void;
    onKeyDown(event: KeyboardEvent): void;
    updateScrollSize(): void;
    setSelectedOptionsByKey(option: T, shiftKey: boolean, ctrlKey: boolean): void;
    setSelectedOptionsByClick(option: T, shiftKey: boolean, ctrlKey: boolean): void;
    setSelectedOptions(option: T): void;
    setFocusedOption(option: T): void;
    toggleFocusedOption(): void;
    renderNodeChanges(data: T[], dataDiffer?: IterableDiffer<T>, viewContainer?: any, parentData?: T): void;
    getHeight(): number;
    getItemHeight(): number;
    emitNavigationEvent(option: T): void;
    emitChangeEvent(option: T): void;
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
    protected updateTabIndex(): void;
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
}
export {};
