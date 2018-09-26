import { AfterContentInit, ElementRef, EventEmitter, QueryList, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FocusKeyManager, IFocusableOption } from '@ptsecurity/cdk/a11y';
import { SelectionModel } from '@ptsecurity/cdk/collections';
import { McLine, CanDisable, CanDisableCtor } from '@ptsecurity/mosaic/core';
/**
 * Component for list-options of selection-list. Each list-option can automatically
 * generate a checkbox and can put current item into the selectionModel of selection-list
 * if the current item is selected.
 */
export declare class McListOption implements AfterContentInit, OnDestroy, OnInit, IFocusableOption {
    private _element;
    private _changeDetector;
    listSelection: McListSelection;
    _hasFocus: boolean;
    _lines: QueryList<McLine>;
    _text: ElementRef;
    checkboxPosition: 'before' | 'after';
    value: any;
    disabled: any;
    selected: boolean;
    private _lineSetter;
    private _selected;
    private _disabled;
    constructor(_element: ElementRef, _changeDetector: ChangeDetectorRef, listSelection: McListSelection);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    toggle(): void;
    focus(): void;
    getLabel(): any;
    setSelected(selected: boolean): void;
    _getHeight(): number;
    _handleClick(): void;
    _handleFocus(): void;
    _handleBlur(): void;
    _getHostElement(): HTMLElement;
}
export declare const MC_SELECTION_LIST_VALUE_ACCESSOR: any;
export declare class McListSelectionChange {
    source: McListSelection;
    option: McListOption;
    constructor(source: McListSelection, option: McListOption);
}
export declare class McListSelectionBase {
}
export declare const _McListSelectionMixinBase: CanDisableCtor & typeof McListSelectionBase;
export declare class McListSelection extends _McListSelectionMixinBase implements IFocusableOption, CanDisable, AfterContentInit, ControlValueAccessor {
    private _element;
    _keyManager: FocusKeyManager<McListOption>;
    options: QueryList<McListOption>;
    tabIndex: number;
    autoSelect: boolean;
    noUnselect: boolean;
    multiple: boolean;
    withShift: boolean;
    withCtrl: boolean;
    horizontal: boolean;
    readonly selectionChange: EventEmitter<McListSelectionChange>;
    selectedOptions: SelectionModel<McListOption>;
    private _tempValues;
    private _modelChanges;
    constructor(_element: ElementRef, tabIndex: string, autoSelect: string, noUnselect: string, multiple: string);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    focus(): void;
    selectAll(): void;
    deselectAll(): void;
    updateScrollSize(): void;
    setFocusedOption(option: McListOption): void;
    writeValue(values: string[]): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    getSelectedOptionValues(): string[];
    toggleFocusedOption(): void;
    _canDeselectLast(listOption: McListOption): boolean;
    _getHeight(): number;
    _onTouched: () => void;
    _removeOptionFromList(option: McListOption): void;
    _onKeyDown(event: KeyboardEvent): void;
    _reportValueChange(): void;
    _emitChangeEvent(option: McListOption): void;
    private _getOptionByValue;
    private _setOptionsFromValues;
    /**
     * Utility to ensure all indexes are valid.
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of options.
     */
    private _isValidIndex;
    private _getOptionIndex;
    private _onChange;
}
