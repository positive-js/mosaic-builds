import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FocusMonitor } from '@ptsecurity/cdk/a11y';
import { CanColor, CanDisable, HasTabIndex } from '@ptsecurity/mosaic/core';
import { McCheckboxClickAction } from './checkbox-config';
/**
 * Provider Expression that allows mc-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export declare const MC_CHECKBOX_CONTROL_VALUE_ACCESSOR: any;
/**
 * Represents the different states that require custom transitions between them.
 * @docs-private
 */
export declare enum TransitionCheckState {
    /** The initial state of the component before any user interaction. */
    Init = 0,
    /** The state representing the component when it's becoming checked. */
    Checked = 1,
    /** The state representing the component when it's becoming unchecked. */
    Unchecked = 2,
    /** The state representing the component when it's becoming indeterminate. */
    Indeterminate = 3,
}
/** Change event object emitted by McCheckbox. */
export declare class McCheckboxChange {
    /** The source McCheckbox of the event. */
    source: McCheckbox;
    /** The new `checked` value of the checkbox. */
    checked: boolean;
}
/** @docs-private */
export declare class McCheckboxBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const _McCheckboxMixinBase: (new (...args: any[]) => HasTabIndex) & (new (...args: any[]) => CanColor) & (new (...args: any[]) => CanDisable) & typeof McCheckboxBase;
/**
 * A mosaic checkbox component. Supports all of the functionality of an HTML5 checkbox,
 * and exposes a similar API. A McCheckbox can be either checked, unchecked, indeterminate, or
 * disabled. Note that all additional accessibility attributes are taken care of by the component,
 * so there is no need to provide them yourself. However, if you want to omit a label and still
 * have the checkbox be accessible, you may supply an [aria-label] input.
 */
export declare class McCheckbox extends _McCheckboxMixinBase implements ControlValueAccessor, AfterViewInit, OnDestroy, CanColor, CanDisable, HasTabIndex {
    private _changeDetectorRef;
    private _focusMonitor;
    private _clickAction;
    /**
     * Attached to the aria-label attribute of the host element. In most cases, arial-labelledby will
     * take precedence so this may be omitted.
     */
    ariaLabel: string;
    /**
     * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
     */
    ariaLabelledby: string | null;
    private _uniqueId;
    /** A unique id for the checkbox input. If none is supplied, it will be auto-generated. */
    id: string;
    /** Returns the unique id for the visual hidden input. */
    readonly inputId: string;
    /** Whether the checkbox is required. */
    required: boolean;
    private _required;
    /** Whether the label should appear after or before the checkbox. Defaults to 'after' */
    labelPosition: 'before' | 'after';
    /** Name value will be applied to the input element if present */
    name: string | null;
    /** Event emitted when the checkbox's `checked` value changes. */
    readonly change: EventEmitter<McCheckboxChange>;
    /** Event emitted when the checkbox's `indeterminate` value changes. */
    readonly indeterminateChange: EventEmitter<boolean>;
    /** The value attribute of the native input element */
    value: string;
    /** The native `<input type="checkbox">` element */
    _inputElement: ElementRef;
    /**
     * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
     * @docs-private
     */
    _onTouched: () => any;
    private _currentAnimationClass;
    private _currentCheckState;
    private _controlValueAccessorChangeFn;
    constructor(elementRef: ElementRef, _changeDetectorRef: ChangeDetectorRef, _focusMonitor: FocusMonitor, tabIndex: string, _clickAction: McCheckboxClickAction);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * Whether the checkbox is checked.
     */
    checked: boolean;
    private _checked;
    /**
     * Whether the checkbox is disabled. This fully overrides the implementation provided by
     * mixinDisabled, but the mixin is still required because mixinTabIndex requires it.
     */
    disabled: any;
    private _disabled;
    /**
     * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
     * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
     * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
     * set to false.
     */
    indeterminate: boolean;
    private _indeterminate;
    /** Method being called whenever the label text changes. */
    _onLabelTextChange(): void;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    _getAriaChecked(): 'true' | 'false' | 'mixed';
    private _transitionCheckState(newState);
    private _emitChangeEvent();
    /** Function is called whenever the focus changes for the input element. */
    private _onInputFocusChange(focusOrigin);
    /** Toggles the `checked` state of the checkbox. */
    toggle(): void;
    /**
     * Event handler for checkbox input element.
     * Toggles checked state if element is not disabled.
     * Do not toggle on (change) event since IE doesn't fire change event when
     *   indeterminate checkbox is clicked.
     * @param event
     */
    _onInputClick(event: Event): void;
    /** Focuses the checkbox. */
    focus(): void;
    _onInteractionEvent(event: Event): void;
}