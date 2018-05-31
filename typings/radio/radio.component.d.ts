import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit, QueryList } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { UniqueSelectionDispatcher } from '@ptsecurity/cdk/collections';
import { CanColor, CanDisable, HasTabIndex } from '@ptsecurity/mosaic/core';
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
}
export declare const _McRadioGroupMixinBase: (new (...args: any[]) => CanDisable) & typeof McRadioGroupBase;
/**
 * Provider Expression that allows mc-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
export declare const MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any;
export declare class McRadioGroup extends _McRadioGroupMixinBase implements AfterContentInit, ControlValueAccessor, CanDisable {
    private _changeDetector;
    /**
     * Event emitted when the group value changes.
     * Change events are only emitted when the value changes due to user interaction with
     * a radio button (the same behavior as `<input type-"radio">`).
     */
    readonly change: EventEmitter<McRadioChange>;
    /** Child radio buttons. */
    _radios: QueryList<McRadioButton>;
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
    private _isInitialized;
    /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
    private _labelPosition;
    /** Whether the radio group is disabled. */
    private _disabled;
    /** Whether the radio group is required. */
    private _required;
    /** The method to be called in order to update ngModel */
    controlValueAccessorChangeFn: (value: any) => void;
    /**
     * onTouch function registered via registerOnTouch (ControlValueAccessor).
     * @docs-private
     */
    onTouched: () => any;
    /** Name of the radio button group. All radio buttons inside this group will use this name. */
    name: string;
    /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
    labelPosition: 'before' | 'after';
    /** Value of the radio button. */
    value: any;
    checkSelectedRadioButton(): void;
    /** Whether the radio button is selected. */
    selected: McRadioButton | null;
    /** Whether the radio group is disabled */
    disabled: boolean;
    /** Whether the radio group is required */
    required: boolean;
    constructor(_changeDetector: ChangeDetectorRef);
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
     * @param value
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
    private updateRadioButtonNames();
    /** Updates the `selected` radio button from the internal _value state. */
    private updateSelectedRadioFromValue();
}
/** @docs-private */
export declare class McRadioButtonBase {
    _elementRef: ElementRef;
    disabled: boolean;
    constructor(_elementRef: ElementRef);
}
export declare const _McRadioButtonMixinBase: (new (...args: any[]) => CanColor) & (new (...args: any[]) => HasTabIndex) & typeof McRadioButtonBase;
export declare class McRadioButton extends _McRadioButtonMixinBase implements OnInit, AfterViewInit, OnDestroy, CanColor, HasTabIndex {
    private _changeDetector;
    private _radioDispatcher;
    private _uniqueId;
    /** The unique ID for the radio button. */
    id: string;
    /** Analog to HTML 'name' attribute used to group radios for unique selection. */
    name: string;
    /** Used to set the 'aria-label' attribute on the underlying input element. */
    ariaLabel: string;
    /** The 'aria-labelledby' attribute takes precedence as the element's text alternative. */
    ariaLabelledby: string;
    /** The 'aria-describedby' attribute is read after the element's label and field type. */
    ariaDescribedby: string;
    /** Whether this radio button is checked. */
    checked: boolean;
    /** The value of this radio button. */
    value: any;
    /** Whether the radio button is disabled. */
    disabled: boolean;
    /** Whether the radio button is required. */
    required: boolean;
    /** Whether the label should appear after or before the radio button. Defaults to 'after' */
    labelPosition: 'before' | 'after';
    private _labelPosition;
    /** The native `<input type=radio>` element */
    _inputElement: ElementRef;
    /**
     * Event emitted when the checked state of this radio button changes.
     * Change events are only emitted when the value changes due to user interaction with
     * the radio button (the same behavior as `<input type-"radio">`).
     */
    readonly change: EventEmitter<McRadioChange>;
    /** The parent radio group. May or may not be present. */
    radioGroup: McRadioGroup;
    isFocused: boolean;
    /** ID of the native input element inside `<mc-radio-button>` */
    readonly inputId: string;
    /** Whether this radio is checked. */
    private _checked;
    /** Whether this radio is disabled. */
    private _disabled;
    /** Whether this radio is required. */
    private _required;
    /** Value assigned to this radio. */
    private _value;
    /** Unregister function for _radioDispatcher */
    private removeUniqueSelectionListener;
    constructor(radioGroup: McRadioGroup, elementRef: ElementRef, _changeDetector: ChangeDetectorRef, _radioDispatcher: UniqueSelectionDispatcher);
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
    /** Dispatch change event with current value. */
    private emitChangeEvent();
}
