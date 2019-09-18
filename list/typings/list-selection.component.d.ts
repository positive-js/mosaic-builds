import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, ElementRef, EventEmitter, QueryList, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FocusKeyManager, FocusMonitor, IFocusableOption } from '@ptsecurity/cdk/a11y';
import { McLine, CanDisable, CanDisableCtor, HasTabIndexCtor, HasTabIndex } from '@ptsecurity/mosaic/core';
/**
 * Component for list-options of selection-list. Each list-option can automatically
 * generate a checkbox and can put current item into the selectionModel of selection-list
 * if the current item is selected.
 */
export declare class McListOption implements OnDestroy, OnInit, IFocusableOption {
    private elementRef;
    private focusMonitor;
    private _changeDetector;
    listSelection: McListSelection;
    hasFocus: boolean;
    lines: QueryList<McLine>;
    text: ElementRef;
    checkboxPosition: 'before' | 'after';
    value: any;
    disabled: any;
    private _disabled;
    selected: boolean;
    private _selected;
    constructor(elementRef: ElementRef<HTMLElement>, focusMonitor: FocusMonitor, _changeDetector: ChangeDetectorRef, listSelection: McListSelection);
    ngOnInit(): void;
    ngOnDestroy(): void;
    toggle(): void;
    focus(): void;
    getLabel(): any;
    setSelected(selected: boolean): void;
    getHeight(): number;
    handleClick($event: any): void;
    handleFocus(): void;
    handleBlur(): void;
    getHostElement(): HTMLElement;
}
export declare const MC_SELECTION_LIST_VALUE_ACCESSOR: any;
export declare class McListSelectionChange {
    source: McListSelection;
    option: McListOption;
    constructor(source: McListSelection, option: McListOption);
}
export declare class McListSelectionBase {
}
export declare const _McListSelectionMixinBase: CanDisableCtor & HasTabIndexCtor & typeof McListSelectionBase;
export declare class McListSelection extends _McListSelectionMixinBase implements IFocusableOption, CanDisable, HasTabIndex, AfterContentInit, ControlValueAccessor, HasTabIndex {
    private element;
    keyManager: FocusKeyManager<McListOption>;
    options: QueryList<McListOption>;
    autoSelect: boolean;
    noUnselect: boolean;
    multiple: boolean;
    horizontal: boolean;
    readonly selectionChange: EventEmitter<McListSelectionChange>;
    selectionModel: SelectionModel<McListOption>;
    private tempValues;
    /** Emits whenever the component is destroyed. */
    private readonly destroy;
    constructor(element: ElementRef, tabIndex: string, autoSelect: string, noUnselect: string, multiple: string);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    focus(): void;
    selectAll(): void;
    deselectAll(): void;
    updateScrollSize(): void;
    setFocusedOption(option: McListOption, $event?: KeyboardEvent): void;
    writeValue(values: string[]): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    getSelectedOptionValues(): string[];
    toggleFocusedOption(): void;
    canDeselectLast(listOption: McListOption): boolean;
    getHeight(): number;
    onTouched: () => void;
    removeOptionFromList(option: McListOption): void;
    onKeyDown(event: KeyboardEvent): void;
    reportValueChange(): void;
    emitChangeEvent(option: McListOption): void;
    private getOptionByValue;
    private setOptionsFromValues;
    /**
     * Utility to ensure all indexes are valid.
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of options.
     */
    private isValidIndex;
    private getOptionIndex;
    private onChange;
}
