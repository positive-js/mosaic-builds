import { ElementRef, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
import { AbstractControl, ControlValueAccessor, ValidationErrors, Validator } from '@angular/forms';
import { DateAdapter, McDateFormats } from '@ptsecurity/cdk/datetime';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { McWarningTooltipTrigger } from '@ptsecurity/mosaic/tooltip';
import { Subject } from 'rxjs';
import { McDatepicker } from './datepicker.component';
import * as i0 from "@angular/core";
export declare const MAX_YEAR = 9999;
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
export declare class McDatepickerInput<D> implements McFormFieldControl<D>, ControlValueAccessor, Validator, OnDestroy {
    elementRef: ElementRef<HTMLInputElement>;
    private readonly renderer;
    private readonly dateAdapter;
    private readonly dateFormats;
    readonly stateChanges: Subject<void>;
    readonly errorState: boolean;
    controlType: string;
    focused: boolean;
    datepicker: McDatepicker<D>;
    dateFilter: (date: D | null) => boolean;
    /** Emits when the value changes (either due to user input or programmatic change). */
    valueChange: EventEmitter<D | null>;
    /** Emits when the disabled state has changed */
    disabledChange: EventEmitter<boolean>;
    placeholder: string;
    get required(): boolean;
    set required(value: boolean);
    private _required;
    /** The datepicker that this input is associated with. */
    set mcDatepicker(value: McDatepicker<D>);
    /** Function that can be used to filter out dates within the datepicker. */
    set mcDatepickerFilter(value: (date: D | null) => boolean);
    /** The value of the input. */
    get value(): D | null;
    set value(value: D | null);
    private _value;
    /** The minimum valid date. */
    get min(): D | null;
    set min(value: D | null);
    private _min;
    /** The maximum valid date. */
    get max(): D | null;
    set max(value: D | null);
    private _max;
    /** Whether the datepicker-input is disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    get id(): string;
    set id(value: string);
    private _id;
    set mcValidationTooltip(tooltip: McWarningTooltipTrigger);
    incorrectInput: EventEmitter<void>;
    /** Emits when a `change` event is fired on this `<input>`. */
    readonly dateChange: EventEmitter<McDatepickerInputEvent<D>>;
    /** Emits when an `input` event is fired on this `<input>`. */
    readonly dateInput: EventEmitter<McDatepickerInputEvent<D>>;
    get empty(): boolean;
    get viewValue(): string;
    get ngControl(): any;
    get isReadOnly(): boolean;
    private get selectionStart();
    private set selectionStart(value);
    private get selectionEnd();
    private set selectionEnd(value);
    private control;
    private readonly uid;
    private datepickerSubscription;
    private localeSubscription;
    /** Whether the last value set on the input was valid. */
    private lastValueValid;
    /** The combined form control validator for this input. */
    private readonly validator;
    private separator;
    private firstDigit;
    private secondDigit;
    private thirdDigit;
    private separatorPositions;
    constructor(elementRef: ElementRef<HTMLInputElement>, renderer: Renderer2, dateAdapter: DateAdapter<D>, dateFormats: McDateFormats);
    onContainerClick(): void;
    focus(): void;
    focusChanged(isFocused: boolean): void;
    onTouched: () => void;
    ngOnDestroy(): void;
    /** @docs-private */
    registerOnValidatorChange(fn: () => void): void;
    /** @docs-private */
    validate(control: AbstractControl): ValidationErrors | null;
    writeValue(value: D): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    onKeyDown(event: KeyboardEvent): void;
    onInput: () => void;
    parseOnBlur: () => number | null | undefined;
    onChange(): void;
    /** Handles blur events on the input. */
    onBlur(): void;
    onPaste($event: any): any;
    toISO8601(value: D): string;
    private updateLocaleParams;
    private setFormat;
    private updateValue;
    private isKeyForClose;
    private isKeyForOpen;
    private isLetterKey;
    private isKeyForByPass;
    private spaceKeyHandler;
    private getNewValue;
    private setViewValue;
    private replaceSymbols;
    private getDateFromString;
    private getDefaultValue;
    private getTimeStringFromDate;
    private getDateEditMetrics;
    private incrementDate;
    private getLastDayFor;
    private decrementDate;
    private verticalArrowKeyHandler;
    private changeCaretPosition;
    private selectDigitByCursor;
    private selectNextDigitByCursor;
    private selectNextDigit;
    /** Checks whether the input is invalid based on the native validation. */
    private isBadInput;
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
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private getValidDateOrNull;
    private setControl;
    private getDigitPositions;
    private createDate;
    private correctCursorPosition;
    static ɵfac: i0.ɵɵFactoryDeclaration<McDatepickerInput<any>, [null, null, { optional: true; }, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McDatepickerInput<any>, "input[mcDatepicker]", ["mcDatepickerInput"], { "placeholder": "placeholder"; "required": "required"; "mcDatepicker": "mcDatepicker"; "mcDatepickerFilter": "mcDatepickerFilter"; "value": "value"; "min": "min"; "max": "max"; "disabled": "disabled"; "id": "id"; "mcValidationTooltip": "mcValidationTooltip"; }, { "incorrectInput": "incorrectInput"; "dateChange": "dateChange"; "dateInput": "dateInput"; }, never>;
}
