import { Directionality } from '@angular/cdk/bidi';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkConnectedOverlay, ViewportRuler } from '@angular/cdk/overlay';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, DoCheck, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, QueryList, Renderer2, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ActiveDescendantKeyManager } from '@ptsecurity/cdk/a11y';
import { CanDisable, CanDisableCtor, CanUpdateErrorState, CanUpdateErrorStateCtor, ErrorStateMatcher, HasTabIndex, HasTabIndexCtor, McOptgroup, McOption, McOptionSelectionChange } from '@ptsecurity/mosaic/core';
import { McCleaner, McFormField, McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { McInput } from '@ptsecurity/mosaic/input';
import { McTag } from '@ptsecurity/mosaic/tags';
import { Observable, Subject, Subscription } from 'rxjs';
/** Change event object that is emitted when the select value has changed. */
export declare class McSelectChange {
    source: McSelect;
    value: any;
    constructor(source: McSelect, value: any);
}
export declare class McSelectBase {
    elementRef: ElementRef;
    defaultErrorStateMatcher: ErrorStateMatcher;
    parentForm: NgForm;
    parentFormGroup: FormGroupDirective;
    ngControl: NgControl;
    constructor(elementRef: ElementRef, defaultErrorStateMatcher: ErrorStateMatcher, parentForm: NgForm, parentFormGroup: FormGroupDirective, ngControl: NgControl);
}
declare const McSelectMixinBase: CanDisableCtor & HasTabIndexCtor & CanUpdateErrorStateCtor & typeof McSelectBase;
export declare class McSelectSearch implements AfterContentInit, OnDestroy {
    input: McInput;
    searchChangesSubscription: Subscription;
    isSearchChanged: boolean;
    constructor(formField: McFormField);
    focus(): void;
    reset(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    handleKeydown(event: KeyboardEvent): void;
}
export declare class McSelectSearchEmptyResult {
}
export declare class McSelectTrigger {
}
export declare class McSelect extends McSelectMixinBase implements AfterContentInit, AfterViewInit, OnChanges, OnDestroy, OnInit, DoCheck, ControlValueAccessor, CanDisable, HasTabIndex, McFormFieldControl<any>, CanUpdateErrorState {
    private readonly _viewportRuler;
    private readonly _changeDetectorRef;
    private readonly _ngZone;
    private readonly _renderer;
    private readonly _dir;
    private readonly _parentFormField;
    ngControl: NgControl;
    private readonly _scrollStrategyFactory;
    /** A name for this control that can be used by `mc-form-field`. */
    controlType: string;
    hiddenItems: number;
    /** The last measured value for the trigger's client bounding rect. */
    triggerRect: ClientRect;
    /** The cached font-size of the trigger element. */
    triggerFontSize: number;
    /** Deals with the selection logic. */
    selectionModel: SelectionModel<McOption>;
    previousSelectionModelSelected: McOption[];
    /** Manages keyboard events for options in the panel. */
    keyManager: ActiveDescendantKeyManager<McOption>;
    /** The value of the select panel's transform-origin property. */
    transformOrigin: string;
    /** Whether the panel's animation is done. */
    panelDoneAnimating: boolean;
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
    trigger: ElementRef;
    panel: ElementRef;
    optionsContainer: ElementRef;
    overlayDir: CdkConnectedOverlay;
    tags: QueryList<McTag>;
    /** User-supplied override of the trigger element. */
    customTrigger: McSelectTrigger;
    cleaner: McCleaner;
    /** All of the defined select options. */
    options: QueryList<McOption>;
    /** All of the defined groups of options. */
    optionGroups: QueryList<McOptgroup>;
    search: McSelectSearch;
    hiddenItemsText: string;
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
    sortComparator: (a: McOption, b: McOption, options: McOption[]) => number;
    /** Combined stream of all of the child options' change events. */
    readonly optionSelectionChanges: Observable<McOptionSelectionChange>;
    /** Event emitted when the select panel has been toggled. */
    readonly openedChange: EventEmitter<boolean>;
    /** Event emitted when the select has been opened. */
    readonly openedStream: Observable<void>;
    /** Event emitted when the select has been closed. */
    readonly closedStream: Observable<void>;
    /** Event emitted when the selected value has been changed by the user. */
    readonly selectionChange: EventEmitter<McSelectChange>;
    /**
     * Event that emits whenever the raw value of the select changes. This is here primarily
     * to facilitate the two-way binding for the `value` input.
     * @docs-private
     */
    readonly valueChange: EventEmitter<any>;
    placeholder: string;
    private _placeholder;
    required: boolean;
    private _required;
    multiple: boolean;
    private _multiple;
    /**
     * Function to compare the option values with the selected values. The first argument
     * is a value from an option. The second is a value from the selection. A boolean
     * should be returned.
     */
    compareWith: (o1: any, o2: any) => boolean;
    /** Value of the select control. */
    value: any;
    private _value;
    id: string;
    private _id;
    /** Whether the select is focused. */
    /**
    * @deprecated Setter to be removed as this property is intended to be readonly.
    * @breaking-change 8.0.0
    */
    focused: boolean;
    private _focused;
    readonly panelOpen: boolean;
    private _panelOpen;
    readonly isEmptySearchResult: boolean;
    readonly canShowCleaner: boolean;
    /** The scroll position of the overlay panel, calculated to center the selected option. */
    private scrollTop;
    /** Unique id for this input. */
    private readonly uid;
    /** Emits whenever the component is destroyed. */
    private readonly destroy;
    constructor(_viewportRuler: ViewportRuler, _changeDetectorRef: ChangeDetectorRef, _ngZone: NgZone, _renderer: Renderer2, defaultErrorStateMatcher: ErrorStateMatcher, elementRef: ElementRef, _dir: Directionality, parentForm: NgForm, parentFormGroup: FormGroupDirective, _parentFormField: McFormField, ngControl: NgControl, tabIndex: string, _scrollStrategyFactory: any);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngDoCheck(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    clearValue($event: any): void;
    /** `View -> model callback called when value changes` */
    onChange: (value: any) => void;
    /** `View -> model callback called when select has been touched` */
    onTouched: () => void;
    resetSearch(): void;
    /** Toggles the overlay panel open or closed. */
    toggle(): void;
    /** Opens the overlay panel. */
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
    readonly selected: McOption | McOption[];
    readonly triggerValue: string;
    readonly triggerValues: McOption[];
    readonly empty: boolean;
    isRtl(): boolean;
    handleKeydown(event: KeyboardEvent): void;
    /**
     * When the panel content is done fading in, the panelDoneAnimating property is
     * set so the proper class can be added to the panel.
     */
    onFadeInDone(): void;
    onFocus(): void;
    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     */
    onBlur(): void;
    /**
     * Callback that is invoked when the overlay panel has been attached.
     */
    onAttached(): void;
    /** Returns the theme to be used on the panel. */
    getPanelTheme(): string;
    /** Focuses the select element. */
    focus(): void;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    onContainerClick(): void;
    /** Invoked when an option is clicked. */
    onRemoveMatcherItem(option: McOption, $event: any): void;
    calculateHiddenItems(): void;
    getItemHeight(): number;
    private getHeightOfOptionsContainer;
    private updateScrollSize;
    private getTotalItemsWidthInMatcher;
    /** Handles keyboard events while the select is closed. */
    private handleClosedKeydown;
    /** Handles keyboard events when the selected is open. */
    private handleOpenKeydown;
    private initializeSelection;
    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     */
    private setSelectionByValue;
    private getCorrespondOption;
    /**
     * Finds and selects and option based on its value.
     * @returns Option that has the corresponding value.
     */
    private selectValue;
    /** Sets up a key manager to listen to keyboard events on the overlay panel. */
    private initKeyManager;
    /** Drops current option subscriptions and IDs and resets from scratch. */
    private resetOptions;
    /** Invoked when an option is clicked. */
    private onSelect;
    /** Sorts the selected values in the selected based on their order in the panel. */
    private sortValues;
    /** Emits change event to set the model value. */
    private propagateChanges;
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
