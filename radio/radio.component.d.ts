import { FocusMonitor } from '@angular/cdk/a11y';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit, QueryList } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CanColor, CanColorCtor, CanDisable, CanDisableCtor, HasTabIndex, HasTabIndexCtor } from '@ptsecurity/mosaic/core';
/** Change event object emitted by McRadio. */
export declare class McRadioChange {
    /** The McRadioButton that emits the change event. */
    source: McRadioButton;
    /** The value of the McRadioButton. */
    value: any;
    constructor(
    /** The McRadioButton that emits the change event. */
    source: McRadioButton, 
    /** The value of the McRadioButton. */
    value: any);
}
/** @docs-private */
export declare class McRadioGroupBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const McRadioGroupMixinBase: CanDisableCtor & typeof McRadioGroupBase;
/**
 * Provider Expression that allows mc-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
export declare const MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any;
export declare class McRadioGroup extends McRadioGroupMixinBase implements AfterContentInit, ControlValueAccessor, CanDisable {
    private readonly _changeDetector;
    /** Name of the radio button group. All radio buttons inside this group will use this name. */
    get name(): string;
    set name(value: string);
    /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
    get labelPosition(): 'before' | 'after';
    set labelPosition(v: 'before' | 'after');
    /** Value of the radio button. */
    get value(): any;
    set value(newValue: any);
    /** Whether the radio button is selected. */
    get selected(): McRadioButton | null;
    set selected(selected: McRadioButton | null);
    /** Whether the radio group is disabled */
    get disabled(): boolean;
    set disabled(value: boolean);
    /** Whether the radio group is required */
    get required(): boolean;
    set required(value: boolean);
    /**
     * Event emitted when the group value changes.
     * Change events are only emitted when the value changes due to user interaction with
     * a radio button (the same behavior as `<input type-"radio">`).
     */
    readonly change: EventEmitter<McRadioChange>;
    /** Child radio buttons. */
    radios: QueryList<McRadioButton>;
    /**
     * Selected value for group. Should equal the value of the selected radio button if there *is*
     * a corresponding radio button with a matching value. If there is *not* such a corresponding
     * radio button, this value persists to be applied in case a new radio button is added with a
     * matching value.
     */
    private _value;
    /** The HTML name attribute applied to radio buttons in this group. */
    private _name;
    /** The currently selected radio button. Should match value. */
    private _selected;
    /** Whether the `value` has been set to its initial value. */
    private isInitialized;
    /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
    private _labelPosition;
    /** Whether the radio group is disabled. */
    private _disabled;
    /** Whether the radio group is required. */
    private _required;
    constructor(elementRef: ElementRef, _changeDetector: ChangeDetectorRef);
    /** The method to be called in order to update ngModel */
    controlValueAccessorChangeFn: (value: any) => void;
    /**
     * onTouch function registered via registerOnTouch (ControlValueAccessor).
     * @docs-private
     */
    onTouched: () => any;
    checkSelectedRadioButton(): void;
    /**
     * Initialize properties once content children are available.
     * This allows us to propagate relevant attributes to associated buttons.
     */
    ngAfterContentInit(): void;
    /**
     * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
     * radio buttons upon their blur.
     */
    touch(): void;
    /** Dispatch change event with current selection and group value. */
    emitChangeEvent(): void;
    markRadiosForCheck(): void;
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     */
    writeValue(value: any): void;
    /**
     * Registers a callback to be triggered when the model value changes.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    registerOnChange(fn: (value: any) => void): void;
    /**
     * Registers a callback to be triggered when the control is touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    registerOnTouched(fn: any): void;
    /**
     * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
     * @param isDisabled Whether the control should be disabled.
     */
    setDisabledState(isDisabled: boolean): void;
    private updateRadioButtonNames;
    /** Updates the `selected` radio button from the internal _value state. */
    private updateSelectedRadioFromValue;
}
/** @docs-private */
export declare class McRadioButtonBase {
    _elementRef: ElementRef;
    disabled: boolean;
    constructor(_elementRef: ElementRef);
}
export declare const McRadioButtonMixinBase: CanColorCtor & HasTabIndexCtor & typeof McRadioButtonBase;
export declare class McRadioButton extends McRadioButtonMixinBase implements OnInit, AfterViewInit, OnDestroy, CanColor, HasTabIndex {
    private readonly _changeDetector;
    private focusMonitor;
    private readonly _radioDispatcher;
    /** Whether this radio button is checked. */
    get checked(): boolean;
    set checked(value: boolean);
    /** The value of this radio button. */
    get value(): any;
    set value(value: any);
    /** Whether the radio button is disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    /** Whether the radio button is required. */
    get required(): boolean;
    set required(value: boolean);
    /** Whether the label should appear after or before the radio button. Defaults to 'after' */
    get labelPosition(): 'before' | 'after';
    set labelPosition(value: 'before' | 'after');
    /** Analog to HTML 'name' attribute used to group radios for unique selection. */
    name: string;
    /** Used to set the 'aria-label' attribute on the underlying input element. */
    ariaLabel: string;
    /** The 'aria-labelledby' attribute takes precedence as the element's text alternative. */
    ariaLabelledby: string;
    /** The 'aria-describedby' attribute is read after the element's label and field type. */
    ariaDescribedby: string;
    /** The native `<input type=radio>` element */
    inputElement: ElementRef;
    /**
     * Event emitted when the checked state of this radio button changes.
     * Change events are only emitted when the value changes due to user interaction with
     * the radio button (the same behavior as `<input type-"radio">`).
     */
    readonly change: EventEmitter<McRadioChange>;
    /** The parent radio group. May or may not be present. */
    radioGroup: McRadioGroup;
    isFocused: boolean;
    /** The unique ID for the radio button. */
    id: string;
    /** ID of the native input element inside `<mc-radio-button>` */
    get inputId(): string;
    private _labelPosition;
    private readonly uniqueId;
    /** Whether this radio is checked. */
    private _checked;
    /** Whether this radio is disabled. */
    private _disabled;
    /** Whether this radio is required. */
    private _required;
    /** Value assigned to this radio. */
    private _value;
    constructor(radioGroup: McRadioGroup, elementRef: ElementRef, _changeDetector: ChangeDetectorRef, focusMonitor: FocusMonitor, _radioDispatcher: UniqueSelectionDispatcher);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /** Focuses the radio button. */
    focus(): void;
    /**
     * Marks the radio button as needing checking for change detection.
     * This method is exposed because the parent radio group will directly
     * update bound properties of the radio button.
     */
    markForCheck(): void;
    onInputClick(event: Event): void;
    onInputChange(event: Event): void;
    /** Unregister function for _radioDispatcher */
    private readonly removeUniqueSelectionListener;
    /** Dispatch change event with current value. */
    private emitChangeEvent;
}
