import { FocusMonitor } from '@angular/cdk/a11y';
import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit, QueryList } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { McButton } from '@ptsecurity/mosaic/button';
/** Acceptable types for a button toggle. */
export declare type ToggleType = 'checkbox' | 'radio';
/**
 * Provider Expression that allows mc-button-toggle-group to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export declare const MC_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR: any;
/** Change event object emitted by MсButtonToggle. */
export declare class McButtonToggleChange {
    /** The MсButtonToggle that emits the event. */
    source: McButtonToggle;
    /** The value assigned to the MсButtonToggle. */
    value: any;
    constructor(
    /** The MсButtonToggle that emits the event. */
    source: McButtonToggle, 
    /** The value assigned to the MсButtonToggle. */
    value: any);
}
/** Exclusive selection button toggle group that behaves like a radio-button group. */
export declare class McButtonToggleGroup implements ControlValueAccessor, OnInit, AfterContentInit {
    private _changeDetector;
    /** Whether the toggle group is vertical. */
    get vertical(): boolean;
    set vertical(value: boolean);
    /** Value of the toggle group. */
    get value(): any;
    set value(newValue: any);
    /** Selected button toggles in the group. */
    get selected(): any;
    /** Whether multiple button toggles can be selected. */
    get multiple(): boolean;
    set multiple(value: boolean);
    /** Child button toggle buttons. */
    buttonToggles: QueryList<McButtonToggle>;
    /** Whether multiple button toggle group is disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    /**
     * Event that emits whenever the value of the group changes.
     * Used to facilitate two-way data binding.
     * @docs-private
     */
    readonly valueChange: EventEmitter<any>;
    /** Event emitted when the group's value changes. */
    readonly change: EventEmitter<McButtonToggleChange>;
    private _vertical;
    private _multiple;
    private _disabled;
    private selectionModel;
    /**
     * Reference to the raw value that the consumer tried to assign. The real
     * value will exclude any values from this one that don't correspond to a
     * toggle. Useful for the cases where the value is assigned before the toggles
     * have been initialized or at the same that they're being swapped out.
     */
    private rawValue;
    constructor(_changeDetector: ChangeDetectorRef);
    /**
     * The method to be called in order to update ngModel.
     * Now `ngModel` binding is not supported in multiple selection mode.
     */
    controlValueAccessorChangeFn: (value: any) => void;
    /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
    onTouched: () => any;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value Value to be set to the model.
     */
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    /** Dispatch change event with current selection and group value. */
    emitChangeEvent(): void;
    /**
     * Syncs a button toggle's selected state with the model value.
     * @param toggle Toggle to be synced.
     * @param select Whether the toggle should be selected.
     * @param isUserInput Whether the change was a result of a user interaction.
     */
    syncButtonToggle(toggle: McButtonToggle, select: boolean, isUserInput?: boolean): void;
    /** Checks whether a button toggle is selected. */
    isSelected(toggle: McButtonToggle): boolean;
    /** Determines whether a button toggle should be checked on init. */
    isPrechecked(toggle: McButtonToggle): boolean;
    /** Updates the selection state of the toggles in the group based on a value. */
    private setSelectionByValue;
    /** Clears the selected toggles. */
    private clearSelection;
    /** Selects a value if there's a toggle that corresponds to it. */
    private selectValue;
}
/** Single button inside of a toggle group. */
export declare class McButtonToggle implements OnInit, OnDestroy {
    buttonToggleGroup: McButtonToggleGroup;
    private changeDetectorRef;
    private focusMonitor;
    private element;
    /** Whether the button is checked. */
    get checked(): boolean;
    set checked(value: boolean);
    type: ToggleType;
    mcButton: McButton;
    /** McButtonToggleGroup reads this to assign its own value. */
    value: any;
    /** Tabindex for the toggle. */
    tabIndex: number | null;
    get disabled(): boolean;
    set disabled(value: boolean);
    /** Event emitted when the group value changes. */
    readonly change: EventEmitter<McButtonToggleChange>;
    private isSingleSelector;
    private _checked;
    private _disabled;
    constructor(buttonToggleGroup: McButtonToggleGroup, changeDetectorRef: ChangeDetectorRef, focusMonitor: FocusMonitor, element: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /** Focuses the button. */
    focus(): void;
    /** Checks the button toggle due to an interaction with the underlying native button. */
    onToggleClick(): void;
    /**
     * Marks the button toggle as needing checking for change detection.
     * This method is exposed because the parent button toggle group will directly
     * update bound properties of the radio button.
     */
    markForCheck(): void;
}
