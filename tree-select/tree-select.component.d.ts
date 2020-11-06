import { Directionality } from '@angular/cdk/bidi';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkConnectedOverlay, ViewportRuler } from '@angular/cdk/overlay';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, DoCheck, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, QueryList, Renderer2, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControlName, FormGroupDirective, NgControl, NgForm, NgModel, Validator } from '@angular/forms';
import { CanDisable, CanUpdateErrorState, ErrorStateMatcher, HasTabIndex, CanDisableCtor, HasTabIndexCtor, CanUpdateErrorStateCtor, McValidationOptions } from '@ptsecurity/mosaic/core';
import { McCleaner, McFormField, McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { McTag } from '@ptsecurity/mosaic/tags';
import { McTreeSelection, McTreeOption } from '@ptsecurity/mosaic/tree';
import { Observable, Subject } from 'rxjs';
/** Change event object that is emitted when the select value has changed. */
export declare class McTreeSelectChange {
    source: McTreeSelect;
    value: any;
    isUserInput: boolean;
    constructor(source: McTreeSelect, value: any, isUserInput?: boolean);
}
export declare class McTreeSelectTrigger {
}
declare class McTreeSelectBase {
    elementRef: ElementRef;
    defaultErrorStateMatcher: ErrorStateMatcher;
    parentForm: NgForm;
    parentFormGroup: FormGroupDirective;
    ngControl: NgControl;
    constructor(elementRef: ElementRef, defaultErrorStateMatcher: ErrorStateMatcher, parentForm: NgForm, parentFormGroup: FormGroupDirective, ngControl: NgControl);
}
declare const McTreeSelectMixinBase: CanDisableCtor & HasTabIndexCtor & CanUpdateErrorStateCtor & typeof McTreeSelectBase;
export declare class McTreeSelect extends McTreeSelectMixinBase implements AfterContentInit, AfterViewInit, OnChanges, OnDestroy, OnInit, DoCheck, ControlValueAccessor, CanDisable, HasTabIndex, McFormFieldControl<McTreeOption>, CanUpdateErrorState {
    readonly changeDetectorRef: ChangeDetectorRef;
    private readonly viewportRuler;
    private readonly ngZone;
    private readonly renderer;
    private readonly scrollStrategyFactory;
    rawValidators: Validator[];
    private mcValidation;
    private readonly dir;
    private readonly parentFormField;
    ngModel: NgModel;
    formControlName: FormControlName;
    /** A name for this control that can be used by `mc-form-field`. */
    controlType: string;
    hiddenItems: number;
    /** The last measured value for the trigger's client bounding rect. */
    triggerRect: ClientRect;
    /** The cached font-size of the trigger element. */
    triggerFontSize: number;
    /** Deals with the selection logic. */
    selectionModel: SelectionModel<any>;
    /** The value of the select panel's transform-origin property. */
    transformOrigin: string;
    /** Emits when the panel element is finished transforming in. */
    panelDoneAnimatingStream: Subject<string>;
    /** Strategy that will be used to handle scrolling while the select panel is open. */
    scrollStrategy: any;
    /**
     * The y-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text.
     * when the panel opens. Will change based on the y-position of the selected option.
     */
    offsetY: number;
    /**
     * This position config ensures that the top "start" corner of the overlay
     * is aligned with with the top "start" of the origin by default (overlapping
     * the trigger completely). If the panel cannot fit below the trigger, it
     * will fall back to a position above the trigger.
     */
    positions: {
        originX: string;
        originY: string;
        overlayX: string;
        overlayY: string;
    }[];
    options: QueryList<McTreeOption>;
    trigger: ElementRef;
    panel: ElementRef;
    overlayDir: CdkConnectedOverlay;
    hiddenItemsCounter: ElementRef;
    tags: QueryList<McTag>;
    cleaner: McCleaner;
    /** User-supplied override of the trigger element. */
    customTrigger: McTreeSelectTrigger;
    tree: McTreeSelection<McTreeOption>;
    hiddenItemsText: string;
    /** Event emitted when the select panel has been toggled. */
    readonly openedChange: EventEmitter<boolean>;
    /** Event emitted when the select has been opened. */
    readonly openedStream: Observable<void>;
    /** Event emitted when the select has been closed. */
    readonly closedStream: Observable<void>;
    /** Event emitted when the selected value has been changed by the user. */
    readonly selectionChange: EventEmitter<McTreeSelectChange>;
    /**
     * Event that emits whenever the raw value of the select changes. This is here primarily
     * to facilitate the two-way binding for the `value` input.
     * @docs-private
     */
    readonly valueChange: EventEmitter<any>;
    /** Classes to be passed to the select panel. Supports the same syntax as `ngClass`. */
    panelClass: string | string[] | Set<string> | {
        [key: string]: any;
    };
    /** Object used to control when error messages are shown. */
    errorStateMatcher: ErrorStateMatcher;
    /**
     * Function used to sort the values in a select in multiple mode.
     * Follows the same logic as `Array.prototype.sort`.
     */
    sortComparator: (a: McTreeOption, b: McTreeOption, options: McTreeOption[]) => number;
    /** Combined stream of all of the child options' change events. */
    readonly optionSelectionChanges: Observable<McTreeSelectChange>;
    get placeholder(): string;
    set placeholder(value: string);
    private _placeholder;
    get required(): boolean;
    set required(value: boolean);
    private _required;
    get multiple(): boolean;
    set multiple(value: boolean);
    private _multiple;
    get autoSelect(): boolean;
    set autoSelect(value: boolean);
    private _autoSelect;
    /**
     * Function to compare the option values with the selected values. The first argument
     * is a value from an option. The second is a value from the selection. A boolean
     * should be returned.
     */
    get compareWith(): (o1: any, o2: any) => boolean;
    set compareWith(fn: (o1: any, o2: any) => boolean);
    get value(): any;
    private _value;
    get id(): string;
    set id(value: string);
    private _id;
    /** Whether the select is focused. */
    get focused(): boolean;
    set focused(value: boolean);
    private _focused;
    get panelOpen(): boolean;
    get canShowCleaner(): boolean;
    private _panelOpen;
    private originalOnKeyDown;
    /** The scroll position of the overlay panel, calculated to center the selected option. */
    private scrollTop;
    /** Unique id for this input. */
    private readonly uid;
    /** Emits whenever the component is destroyed. */
    private readonly destroy;
    private tempValues;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, viewportRuler: ViewportRuler, ngZone: NgZone, renderer: Renderer2, defaultErrorStateMatcher: ErrorStateMatcher, scrollStrategyFactory: any, rawValidators: Validator[], mcValidation: McValidationOptions, dir: Directionality, parentForm: NgForm, parentFormGroup: FormGroupDirective, parentFormField: McFormField, ngControl: NgControl, ngModel: NgModel, formControlName: FormControlName);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngDoCheck(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    hiddenItemsTextFormatter(hiddenItemsText: string, hiddenItems: number): string;
    clearValue($event: any): void;
    /** `View -> model callback called when value changes` */
    onChange: (value: any) => void;
    /** `View -> model callback called when select has been touched` */
    onTouched: () => void;
    toggle(): void;
    open(): void;
    /** Closes the overlay panel and focuses the host element. */
    close(): void;
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param value New value to be written to the model.
     */
    writeValue(value: any): void;
    /**
     * Saves a callback function to be invoked when the select's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the value changes.
     */
    registerOnChange(fn: (value: any) => void): void;
    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the component has been touched.
     */
    registerOnTouched(fn: () => {}): void;
    /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param isDisabled Sets whether the component is disabled.
     */
    setDisabledState(isDisabled: boolean): void;
    get selected(): any;
    get selectedValues(): any;
    get triggerValue(): string;
    get triggerValues(): string[];
    get empty(): boolean;
    isRtl(): boolean;
    handleKeydown(event: KeyboardEvent): void;
    onFocus(): void;
    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     */
    onBlur(): void;
    /** Callback that is invoked when the overlay panel has been attached. */
    onAttached(): void;
    /** Returns the theme to be used on the panel. */
    getPanelTheme(): string;
    focus(): void;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    onContainerClick(): void;
    /** Invoked when an option is clicked. */
    onRemoveSelectedOption(selectedOption: any, $event: any): void;
    calculateHiddenItems(): void;
    private getTotalItemsWidthInMatcher;
    private getItemWidth;
    private handleClosedKeydown;
    private handleOpenKeydown;
    private initializeSelection;
    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     */
    private setSelectionByValue;
    private initKeyManager;
    /** Sorts the selected values in the selected based on their order in the panel. */
    private sortValues;
    /**
     * Highlights the selected item. If no option is selected, it will highlight
     * the first item instead.
     */
    private highlightCorrectOption;
    /** Scrolls the active option into view. */
    private scrollActiveOptionIntoView;
    /**
     * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text when
     * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
     * can't be calculated until the panel has been attached, because we need to know the
     * content width in order to constrain the panel within the viewport.
     */
    private calculateOverlayOffsetX;
    /** Comparison function to specify which option is displayed. Defaults to object equality. */
    private _compareWith;
}
export {};
