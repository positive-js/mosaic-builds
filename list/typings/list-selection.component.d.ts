import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit, QueryList } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FocusKeyManager, IFocusableOption } from '@ptsecurity/cdk/a11y';
import { SelectionModel } from '@ptsecurity/cdk/collections';
import { CanDisable, HasTabIndex, McLine } from '@ptsecurity/mosaic/core';
export declare class McListOptionBase {
}
export declare const MAT_SELECTION_LIST_VALUE_ACCESSOR: any;
/**
 * Change event object emitted by McListOption whenever the selected state changes.
 * @deprecated Use the `McListSelectionChange` event on the selection list instead.
 * @deletion-target 6.0.0
 */
export declare class McListOptionChange {
    source: McListOption;
    selected: boolean;
    constructor(source: McListOption, selected: boolean);
}
export declare class McListSelectionChange {
    source: McListSelection;
    option: McListOption;
    constructor(source: McListSelection, option: McListOption);
}
/**
 * Component for list-options of selection-list. Each list-option can automatically
 * generate a checkbox and can put current item into the selectionModel of selection-list
 * if the current item is selected.
 */
export declare class McListOption extends McListOptionBase implements AfterContentInit, OnDestroy, OnInit, IFocusableOption {
    private _element;
    private _changeDetector;
    selectionList: McListSelection;
    _hasFocus: boolean;
    _lines: QueryList<McLine>;
    _text: ElementRef;
    checkboxPosition: 'before' | 'after';
    value: any;
    disabled: any;
    selected: boolean;
    /**
     * Emits a change event whenever the selected state of an option changes.
     * @deprecated Use the `selectionChange` event on the `<mc-selection-list>` instead.
     * @deletion-target 6.0.0
     */
    readonly selectionChange: EventEmitter<McListOptionChange>;
    _selected: boolean;
    private _lineSetter;
    private _disabled;
    constructor(_element: ElementRef, _changeDetector: ChangeDetectorRef, selectionList: McListSelection);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    toggle(): void;
    focus(): void;
    /**
     * Returns the list item's text label. Implemented as a part of the FocusKeyManager.
     * @docs-private
     */
    getLabel(): any;
    _handleClick(): void;
    _handleFocus(): void;
    _handleBlur(): void;
    _getHostElement(): HTMLElement;
    _setSelected(selected: boolean): void;
    _emitDeprecatedChangeEvent(): void;
}
export declare class McListSelectionBase {
}
export declare const _McListSelectionMixinBase: (new (...args: any[]) => HasTabIndex) & (new (...args: any[]) => CanDisable) & typeof McListSelectionBase;
export declare class McListSelection extends _McListSelectionMixinBase implements IFocusableOption, CanDisable, HasTabIndex, AfterContentInit, ControlValueAccessor {
    private _element;
    _keyManager: FocusKeyManager<McListOption>;
    options: QueryList<McListOption>;
    readonly selectionChange: EventEmitter<McListSelectionChange>;
    selectedOptions: SelectionModel<McListOption>;
    private _tempValues;
    constructor(_element: ElementRef, tabIndex: string);
    ngAfterContentInit(): void;
    focus(): void;
    selectAll(): void;
    deselectAll(): void;
    _onTouched: () => void;
    _setFocusedOption(option: McListOption): void;
    _removeOptionFromList(option: McListOption): void;
    _keydown(event: KeyboardEvent): void;
    _reportValueChange(): void;
    _emitChangeEvent(option: McListOption): void;
    writeValue(values: string[]): void;
    setDisabledState(isDisabled: boolean): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => void): void;
    private _getOptionByValue(value);
    private _setOptionsFromValues(values);
    private _getSelectedOptionValues();
    private _toggleSelectOnFocusedOption();
    /**
     * Utility to ensure all indexes are valid.
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of options.
     */
    private _isValidIndex(index);
    private _getOptionIndex(option);
    private _onChange;
}
