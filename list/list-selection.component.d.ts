import { Clipboard } from '@angular/cdk/clipboard';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, ElementRef, EventEmitter, QueryList, ChangeDetectorRef, OnDestroy, OnInit, NgZone } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FocusKeyManager, IFocusableOption } from '@ptsecurity/cdk/a11y';
import { CanDisable, CanDisableCtor, HasTabIndexCtor, HasTabIndex, MultipleMode, McOptgroup, McOptionActionComponent } from '@ptsecurity/mosaic/core';
import { McDropdownTrigger } from '@ptsecurity/mosaic/dropdown';
import { McTooltipTrigger } from '@ptsecurity/mosaic/tooltip';
import { Observable, Subject } from 'rxjs';
import * as i0 from "@angular/core";
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
    readonly group: McOptgroup;
    hasFocus: boolean;
    readonly onFocus: Subject<McOptionEvent>;
    readonly onBlur: Subject<McOptionEvent>;
    actionButton: McOptionActionComponent;
    tooltipTrigger: McTooltipTrigger;
    dropdownTrigger: McDropdownTrigger;
    text: ElementRef;
    checkboxPosition: 'before' | 'after';
    /**
     * This is set to true after the first OnChanges cycle so we don't clear the value of `selected`
     * in the first cycle.
     */
    private inputsInitialized;
    get value(): any;
    set value(newValue: any);
    private _value;
    get disabled(): any;
    set disabled(value: any);
    private _disabled;
    get showCheckbox(): any;
    set showCheckbox(value: any);
    private _showCheckbox;
    get selected(): boolean;
    set selected(value: boolean);
    private _selected;
    get tabIndex(): any;
    constructor(elementRef: ElementRef<HTMLElement>, changeDetector: ChangeDetectorRef, ngZone: NgZone, listSelection: McListSelection, group: McOptgroup);
    ngOnInit(): void;
    ngOnDestroy(): void;
    toggle(): void;
    getLabel(): any;
    setSelected(selected: boolean): void;
    getHeight(): number;
    handleClick($event: any): void;
    onKeydown($event: any): void;
    focus(): void;
    blur(): void;
    getHostElement(): HTMLElement;
    static ɵfac: i0.ɵɵFactoryDeclaration<McListOption, [null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McListOption, "mc-list-option", ["mcListOption"], { "checkboxPosition": "checkboxPosition"; "value": "value"; "disabled": "disabled"; "showCheckbox": "showCheckbox"; "selected": "selected"; }, {}, ["actionButton", "tooltipTrigger", "dropdownTrigger"], ["*", "mc-option-action"]>;
}
export declare const MC_SELECTION_LIST_VALUE_ACCESSOR: any;
export declare class McListSelectionChange {
    source: McListSelection;
    option: McListOption;
    constructor(source: McListSelection, option: McListOption);
}
export declare class McListSelectAllEvent<T> {
    source: McListSelection;
    options: T[];
    constructor(source: McListSelection, options: T[]);
}
export declare class McListCopyEvent<T> {
    source: McListSelection;
    option: T;
    constructor(source: McListSelection, option: T);
}
export declare class McListSelectionBase {
    elementRef: ElementRef;
    constructor(elementRef: ElementRef);
}
export declare const McListSelectionMixinBase: CanDisableCtor & HasTabIndexCtor & typeof McListSelectionBase;
export declare class McListSelection extends McListSelectionMixinBase implements CanDisable, HasTabIndex, AfterContentInit, ControlValueAccessor {
    private changeDetectorRef;
    private clipboard;
    keyManager: FocusKeyManager<McListOption>;
    options: QueryList<McListOption>;
    readonly onSelectAll: EventEmitter<McListSelectAllEvent<McListOption>>;
    readonly onCopy: EventEmitter<McListCopyEvent<McListOption>>;
    get autoSelect(): boolean;
    set autoSelect(value: boolean);
    private _autoSelect;
    get noUnselectLast(): boolean;
    set noUnselectLast(value: boolean);
    private _noUnselectLast;
    multipleMode: MultipleMode | null;
    get multiple(): boolean;
    horizontal: boolean;
    get tabIndex(): any;
    set tabIndex(value: any);
    private _tabIndex;
    userTabIndex: number | null;
    get showCheckbox(): boolean;
    readonly selectionChange: EventEmitter<McListSelectionChange>;
    selectionModel: SelectionModel<McListOption>;
    get optionFocusChanges(): Observable<McOptionEvent>;
    get optionBlurChanges(): Observable<McOptionEvent>;
    _value: string[] | null;
    /** Emits whenever the component is destroyed. */
    private readonly destroyed;
    private optionFocusSubscription;
    private optionBlurSubscription;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, multiple: MultipleMode, clipboard: Clipboard);
    /**
     * Function used for comparing an option against the selected value when determining which
     * options should appear as selected. The first argument is the value of an options. The second
     * one is a value from the selected value. A boolean must be returned.
     */
    compareWith: (o1: any, o2: any) => boolean;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    focus(): void;
    blur(): void;
    selectAll(): void;
    deselectAll(): void;
    updateScrollSize(): void;
    setSelectedOptionsByClick(option: McListOption, shiftKey: boolean, ctrlKey: boolean): void;
    setSelectedOptionsByKey(option: McListOption, shiftKey: boolean, ctrlKey: boolean): void;
    setSelectedOptions(option: McListOption): void;
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
    private onCopyDefaultHandler;
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
    private selectAllOptions;
    private copyActiveOption;
    static ɵfac: i0.ɵɵFactoryDeclaration<McListSelection, [null, null, { attribute: "multiple"; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McListSelection, "mc-list-selection", ["mcListSelection"], { "disabled": "disabled"; "autoSelect": "autoSelect"; "noUnselectLast": "noUnselectLast"; "horizontal": "horizontal"; "tabIndex": "tabIndex"; "compareWith": "compareWith"; }, { "onSelectAll": "onSelectAll"; "onCopy": "onCopy"; "selectionChange": "selectionChange"; }, ["options"], ["*"]>;
}
