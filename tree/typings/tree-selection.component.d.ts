import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, ChangeDetectorRef, EventEmitter, IterableDiffer, IterableDiffers, QueryList, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { CdkTree, CdkTreeNodeOutlet, FlatTreeControl } from '@ptsecurity/cdk/tree';
import { CanDisable, HasTabIndex } from '@ptsecurity/mosaic/core';
import { McTreeOption } from './tree-option.component';
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
    treeControl: FlatTreeControl<McTreeOption>;
    readonly navigationChange: EventEmitter<McTreeNavigationChange>;
    readonly selectionChange: EventEmitter<McTreeSelectionChange>;
    multiple: boolean;
    private _multiple;
    autoSelect: boolean;
    private _autoSelect;
    noUnselectLast: boolean;
    private _noUnselectLast;
    disabled: boolean;
    private _disabled;
    tabIndex: number;
    private _tabIndex;
    private readonly destroy;
    constructor(elementRef: ElementRef, differs: IterableDiffers, changeDetectorRef: ChangeDetectorRef, tabIndex: string, multiple: string);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
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
    private markOptionsForCheck;
    private canDeselectLast;
}
export {};
