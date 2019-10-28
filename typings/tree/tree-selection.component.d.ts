import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, IterableDiffer, IterableDiffers, QueryList } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { CdkTree, CdkTreeNodeOutlet, FlatTreeControl } from '@ptsecurity/cdk/tree';
import { CanDisable, HasTabIndex } from '@ptsecurity/mosaic/core';
import { Observable } from 'rxjs';
import { McTreeOption, McTreeOptionEvent } from './tree-option.component';
export declare enum MultipleMode {
    CHECKBOX = "checkbox",
    KEYBOARD = "keyboard"
}
export declare const MC_SELECTION_TREE_VALUE_ACCESSOR: any;
export declare class McTreeNavigationChange {
    source: McTreeSelection;
    option: McTreeOption;
    constructor(source: McTreeSelection, option: McTreeOption);
}
export declare class McTreeSelectionChange {
    source: McTreeSelection;
    option: McTreeOption;
    constructor(source: McTreeSelection, option: McTreeOption);
}
interface SelectionModelOption {
    id: number | string;
    value: string;
}
export declare class McTreeSelection extends CdkTree<McTreeOption> implements ControlValueAccessor, AfterContentInit, CanDisable, HasTabIndex {
    private elementRef;
    nodeOutlet: CdkTreeNodeOutlet;
    renderedOptions: QueryList<McTreeOption>;
    keyManager: FocusKeyManager<McTreeOption>;
    selectionModel: SelectionModel<SelectionModelOption>;
    resetFocusedItemOnBlur: boolean;
    treeControl: FlatTreeControl<McTreeOption>;
    readonly navigationChange: EventEmitter<McTreeNavigationChange>;
    readonly selectionChange: EventEmitter<McTreeSelectionChange>;
    multipleMode: MultipleMode | null;
    readonly optionFocusChanges: Observable<McTreeOptionEvent>;
    readonly optionBlurChanges: Observable<McTreeOptionEvent>;
    readonly multiple: boolean;
    autoSelect: boolean;
    private _autoSelect;
    noUnselectLast: boolean;
    private _noUnselectLast;
    disabled: boolean;
    private _disabled;
    tabIndex: any;
    private _tabIndex;
    readonly showCheckbox: boolean;
    private readonly destroy;
    private optionFocusSubscription;
    private optionBlurSubscription;
    constructor(elementRef: ElementRef, differs: IterableDiffers, changeDetectorRef: ChangeDetectorRef, tabIndex: string, multiple: string);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    focus(): void;
    blur(): void;
    onKeyDown(event: KeyboardEvent): void;
    updateScrollSize(): void;
    setSelectedOption(option: McTreeOption, $event?: KeyboardEvent): void;
    setFocusedOption(option: McTreeOption): void;
    toggleFocusedOption(): void;
    renderNodeChanges(data: McTreeOption[], dataDiffer?: IterableDiffer<McTreeOption>, viewContainer?: any, parentData?: McTreeOption): void;
    getHeight(): number;
    getItemHeight(): number;
    emitNavigationEvent(option: McTreeOption): void;
    emitChangeEvent(option: McTreeOption): void;
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
    private canDeselectLast;
}
export {};
