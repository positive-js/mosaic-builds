import { ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { AbstractControl, ControlValueAccessor, ValidationErrors, Validator } from '@angular/forms';
import { DateAdapter, McDateFormats } from '@ptsecurity/cdk/datetime';
import { ThemePalette } from '@ptsecurity/mosaic/core';
import { McFormField } from '@ptsecurity/mosaic/form-field';
import { McDatepicker } from './datepicker';
/** @docs-private */
export declare const MC_DATEPICKER_VALUE_ACCESSOR: any;
/** @docs-private */
export declare const MC_DATEPICKER_VALIDATORS: any;
/**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use McDatepickerInputEvent instead.
 */
export declare class McDatepickerInputEvent<D> {
    /** Reference to the datepicker input component that emitted the event. */
    target: McDatepickerInput<D>;
    /** Reference to the native input element associated with the datepicker input. */
    targetElement: HTMLElement;
    /** The new value for the target datepicker input. */
    value: D | null;
    constructor(
    /** Reference to the datepicker input component that emitted the event. */
    target: McDatepickerInput<D>, 
    /** Reference to the native input element associated with the datepicker input. */
    targetElement: HTMLElement);
}
/** Directive used to connect an input to a McDatepicker. */
export declare class McDatepickerInput<D> implements ControlValueAccessor, OnDestroy, Validator {
    elementRef: ElementRef<HTMLInputElement>;
    dateAdapter: DateAdapter<D>;
    private dateFormats;
    private formField;
    /** The datepicker that this input is associated with. */
    mcDatepicker: McDatepicker<D>;
    /** Function that can be used to filter out dates within the datepicker. */
    mcDatepickerFilter: (date: D | null) => boolean;
    /** The value of the input. */
    value: D | null;
    /** The minimum valid date. */
    min: D | null;
    /** The maximum valid date. */
    max: D | null;
    /** Whether the datepicker-input is disabled. */
    disabled: boolean;
    datepicker: McDatepicker<D>;
    dateFilter: (date: D | null) => boolean;
    /** Emits when a `change` event is fired on this `<input>`. */
    readonly dateChange: EventEmitter<McDatepickerInputEvent<D>>;
    /** Emits when an `input` event is fired on this `<input>`. */
    readonly dateInput: EventEmitter<McDatepickerInputEvent<D>>;
    /** Emits when the value changes (either due to user input or programmatic change). */
    valueChange: EventEmitter<D>;
    /** Emits when the disabled state has changed */
    disabledChange: EventEmitter<boolean>;
    private _value;
    private _min;
    private _max;
    private _disabled;
    private datepickerSubscription;
    private localeSubscription;
    /** Whether the last value set on the input was valid. */
    private lastValueValid;
    constructor(elementRef: ElementRef<HTMLInputElement>, dateAdapter: DateAdapter<D>, dateFormats: McDateFormats, formField: McFormField);
    onTouched: () => void;
    ngOnDestroy(): void;
    /** @docs-private */
    registerOnValidatorChange(fn: () => void): void;
    /** @docs-private */
    validate(c: AbstractControl): ValidationErrors | null;
    writeValue(value: D): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    onKeydown(event: KeyboardEvent): void;
    onInput(value: string): void;
    onChange(): void;
    /** Returns the palette used by the input's form field, if any. */
    getThemePalette(): ThemePalette | undefined;
    /** Handles blur events on the input. */
    onBlur(): void;
    private cvaOnChange;
    private validatorOnChange;
    /** The form control validator for whether the input parses. */
    private parseValidator;
    /** The form control validator for the min date. */
    private minValidator;
    /** The form control validator for the max date. */
    private maxValidator;
    /** The form control validator for the date filter. */
    private filterValidator;
    /** Formats a value and sets it on the input element. */
    private formatValue;
    /** The combined form control validator for this input. */
    private validator;
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private getValidDateOrNull;
}
