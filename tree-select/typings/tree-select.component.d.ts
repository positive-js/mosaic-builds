import { AfterContentInit, AfterViewInit, ChangeDetectorRef, DoCheck, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, QueryList, Renderer2, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { Directionality } from '@ptsecurity/cdk/bidi';
import { SelectionModel } from '@ptsecurity/cdk/collections';
import { CdkConnectedOverlay, ViewportRuler } from '@ptsecurity/cdk/overlay';
import { CanDisable, CanUpdateErrorState, ErrorStateMatcher, HasTabIndex, CanDisableCtor, HasTabIndexCtor, CanUpdateErrorStateCtor } from '@ptsecurity/mosaic/core';
import { McFormField, McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { McTag } from '@ptsecurity/mosaic/tags';
import { McTreeSelection, McTreeOption } from '@ptsecurity/mosaic/tree';
import { Observable, Subject } from 'rxjs';
/** Change event object that is emitted when the select value has changed. */
export declare class McTreeSelectChange {
    source: McTreeOption;
    value: any;
    isUserInput: boolean;
    constructor(source: McTreeOption, value: any, isUserInput?: boolean);
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
export declare class McTreeSelect extends McTreeSelectMixinBase implements AfterContentInit, AfterViewInit, OnChanges, OnDestroy, OnInit, DoCheck, ControlValueAccessor, CanDisable, HasTabIndex, McFormFieldControl<any>, CanUpdateErrorState {
    private readonly viewportRuler;
    readonly changeDetectorRef: ChangeDetectorRef;
    private readonly ngZone;
    private readonly renderer;
    elementRef: ElementRef;
    private readonly dir;
    private readonly parentFormField;
    ngControl: NgControl;
    private readonly scrollStrategyFactory;
    /** A name for this control that can be used by `mc-form-field`. */
    controlType: string;
    hiddenItems: number;
    /** The last measured value for the trigger's client bounding rect. */
    triggerRect: ClientRect;
    /** The cached font-size of the trigger element. */
    triggerFontSize: number;
    /** Deals with the selection logic. */
    selectionModel: SelectionModel<McTreeOption>;
    /** The IDs of child options to be passed to the aria-owns attribute. */
    optionIds: string;
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
    overlayDir: CdkConnectedOverlay;
    tags: QueryList<McTag>;
    /** User-supplied override of the trigger element. */
    customTrigger: McTreeSelectTrigger;
    tree: McTreeSelection;
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
    options: QueryList<McTreeOption>;
    private originalOnKeyDown;
    placeholder: string;
    private _placeholder;
    required: boolean;
    private _required;
    multiple: boolean;
    private _multiple;
    autoSelect: boolean;
    private _autoSelect;
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
    /** The scroll position of the overlay panel, calculated to center the selected option. */
    private scrollTop;
    /** Unique id for this input. */
    private readonly uid;
    /** Emits whenever the component is destroyed. */
    private readonly destroy;
    constructor(viewportRuler: ViewportRuler, changeDetectorRef: ChangeDetectorRef, ngZone: NgZone, renderer: Renderer2, defaultErrorStateMatcher: ErrorStateMatcher, elementRef: ElementRef, dir: Directionality, parentForm: NgForm, parentFormGroup: FormGroupDirective, parentFormField: McFormField, ngControl: NgControl, tabIndex: string, scrollStrategyFactory: any);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngDoCheck(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
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
    readonly selected: McTreeOption | McTreeOption[];
    readonly triggerValue: string;
    readonly triggerValues: McTreeOption[];
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
    /** Callback that is invoked when the overlay panel has been attached. */
    onAttached(): void;
    /** Returns the theme to be used on the panel. */
    getPanelTheme(): string;
    /** Focuses the select element. */
    focus(): void;
    /**
     * Calculates the scroll position of the select's overlay panel.
     *
     * Attempts to center the selected option in the panel. If the option is
     * too high or too low in the panel to be scrolled to the center, it clamps the
     * scroll position to the min or max scroll positions respectively.
     */
    calculateOverlayScroll(selectedIndex: number, scrollBuffer: number, maxScroll: number): number;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    onContainerClick(): void;
    /** Invoked when an option is clicked. */
    onRemoveSelectedOption(selectedOption: McTreeOption, $event: any): void;
    calculateHiddenItems(): void;
    private updateSelectedOptions;
    private getTotalItemsWidthInMatcher;
    private handleClosedKeydown;
    private handleOpenKeydown;
    private initializeSelection;
    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     */
    private setSelectionByValue;
    /**
     * Finds and selects and option based on its value.
     * @returns Option that has the corresponding value.
     */
    private selectValue;
    private initKeyManager;
    /** Drops current option subscriptions and IDs and resets from scratch. */
    private resetOptions;
    /** Invoked when an option is clicked. */
    private onSelect;
    /** Sorts the selected values in the selected based on their order in the panel. */
    private sortValues;
    /** Emits change event to set the model value. */
    private propagateChanges;
    /** Records option IDs to pass to the aria-owns property. */
    private setOptionIds;
    /**
     * Highlights the selected item. If no option is selected, it will highlight
     * the first item instead.
     */
    private highlightCorrectOption;
    /** Scrolls the active option into view. */
    private scrollActiveOptionIntoView;
    /** Gets the index of the provided option in the option list. */
    private getOptionIndex;
    /** Calculates the scroll position and x- and y-offsets of the overlay panel. */
    private calculateOverlayPosition;
    /**
     * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text when
     * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
     * can't be calculated until the panel has been attached, because we need to know the
     * content width in order to constrain the panel within the viewport.
     */
    private calculateOverlayOffsetX;
    /**
     * Calculates the y-offset of the select's overlay panel in relation to the
     * top start corner of the trigger. It has to be adjusted in order for the
     * selected option to be aligned over the trigger when the panel opens.
     */
    private calculateOverlayOffsetY;
    /**
     * Checks that the attempted overlay position will fit within the viewport.
     * If it will not fit, tries to adjust the scroll position and the associated
     * y-offset so the panel can open fully on-screen. If it still won't fit,
     * sets the offset back to 0 to allow the fallback position to take over.
     */
    private checkOverlayWithinViewport;
    /** Adjusts the overlay panel up to fit in the viewport. */
    private adjustPanelUp;
    /** Adjusts the overlay panel down to fit in the viewport. */
    private adjustPanelDown;
    /** Sets the transform origin point based on the selected option. */
    private getOriginBasedOnOption;
    /** Calculates the amount of items in the select. This includes options and group labels. */
    private getItemCount;
    /** Calculates the height of the select's options. */
    private getItemHeight;
    /** Comparison function to specify which option is displayed. Defaults to object equality. */
    private _compareWith;
}
export {};
