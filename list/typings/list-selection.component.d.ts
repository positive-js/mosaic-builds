import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, ElementRef, EventEmitter, QueryList, ChangeDetectorRef, OnDestroy, OnInit, NgZone } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FocusKeyManager, IFocusableOption } from '@ptsecurity/cdk/a11y';
import { McLine, CanDisable, CanDisableCtor, HasTabIndexCtor, HasTabIndex, MultipleMode } from '@ptsecurity/mosaic/core';
import { Observable, Subject } from 'rxjs';
export interface McOptionEvent {
    option: McListOption;
}
/**
 * Component for list-options of selection-list. Each list-option can automatically
 * generate a checkbox and can put current item into the selectionModel of selection-list
 * if the current item is selected.
 */
export declare class McListOption implements OnDestroy, OnInit, IFocusableOption {
    private elementRef;
    private changeDetector;
    private ngZone;
    listSelection: McListSelection;
    hasFocus: boolean;
    readonly onFocus: Subject<McOptionEvent>;
    readonly onBlur: Subject<McOptionEvent>;
    lines: QueryList<McLine>;
    text: ElementRef;
    checkboxPosition: 'before' | 'after';
    value: any;
    disabled: any;
    private _disabled;
    showCheckbox: any;
    private _showCheckbox;
    selected: boolean;
    private _selected;
    readonly tabIndex: any;
    constructor(elementRef: ElementRef<HTMLElement>, changeDetector: ChangeDetectorRef, ngZone: NgZone, listSelection: McListSelection);
    ngOnInit(): void;
    ngOnDestroy(): void;
    toggle(): void;
    getLabel(): any;
    setSelected(selected: boolean): void;
    getHeight(): number;
    handleClick($event: any): void;
    focus(): void;
    blur(): void;
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
export declare const McListSelectionMixinBase: CanDisableCtor & HasTabIndexCtor & typeof McListSelectionBase;
export declare class McListSelection extends McListSelectionMixinBase implements CanDisable, HasTabIndex, AfterContentInit, ControlValueAccessor {
    private element;
    private changeDetectorRef;
    keyManager: FocusKeyManager<McListOption>;
    options: QueryList<McListOption>;
    autoSelect: boolean;
    noUnselect: boolean;
    multipleMode: MultipleMode | null;
    readonly multiple: boolean;
    horizontal: boolean;
    tabIndex: any;
    private _tabIndex;
    readonly showCheckbox: boolean;
    readonly selectionChange: EventEmitter<McListSelectionChange>;
    selectionModel: SelectionModel<McListOption>;
    readonly optionFocusChanges: Observable<McOptionEvent>;
    readonly optionBlurChanges: Observable<McOptionEvent>;
    private tempValues;
    /** Emits whenever the component is destroyed. */
    private readonly destroyed;
    private optionFocusSubscription;
    private optionBlurSubscription;
    constructor(element: ElementRef, changeDetectorRef: ChangeDetectorRef, tabIndex: string, autoSelect: string, noUnselect: string, multiple: string);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    focus(): void;
    blur(): void;
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
    protected updateTabIndex(): void;
    private resetOptions;
    private dropSubscriptions;
    private listenToOptionsFocus;
    /** Checks whether any of the options is focused. */
    private hasFocusedOption;
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
