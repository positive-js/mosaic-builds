import { DoCheck, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { DateAdapter } from '@ptsecurity/cdk/datetime';
import { CanUpdateErrorState, CanUpdateErrorStateCtor, ErrorStateMatcher } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { Subject } from 'rxjs';
import { TimeFormats } from './timepicker.constants';
export declare class McTimepickerBase {
    defaultErrorStateMatcher: ErrorStateMatcher;
    parentForm: NgForm;
    parentFormGroup: FormGroupDirective;
    ngControl: NgControl;
    constructor(defaultErrorStateMatcher: ErrorStateMatcher, parentForm: NgForm, parentFormGroup: FormGroupDirective, ngControl: NgControl);
}
export declare const McTimepickerMixinBase: CanUpdateErrorStateCtor & typeof McTimepickerBase;
export declare class McTimepicker<D> extends McTimepickerMixinBase implements McFormFieldControl<any>, OnDestroy, DoCheck, CanUpdateErrorState, ControlValueAccessor {
    private readonly elementRef;
    ngControl: NgControl;
    private readonly renderer;
    private dateAdapter;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    readonly stateChanges: Subject<void>;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    focused: boolean;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    controlType: string;
    /** An object used to control when error messages are shown. */
    errorStateMatcher: ErrorStateMatcher;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    placeholder: string;
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    get id(): string;
    set id(value: string);
    private _id;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get required(): boolean;
    set required(value: boolean);
    private _required;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get value(): string;
    set value(value: string);
    get timeFormat(): TimeFormats;
    set timeFormat(formatValue: TimeFormats);
    private _timeFormat;
    get minTime(): string | null;
    set minTime(value: string | null);
    private _minTime;
    get maxTime(): string | null;
    set maxTime(maxValue: string | null);
    private _maxTime;
    private readonly uid;
    private readonly inputValueAccessor;
    private originalValue;
    private previousNativeValue;
    private currentDateTimeInput;
    private onChange;
    private onTouched;
    constructor(elementRef: ElementRef, ngControl: NgControl, parentForm: NgForm, parentFormGroup: FormGroupDirective, defaultErrorStateMatcher: ErrorStateMatcher, inputValueAccessor: any, renderer: Renderer2, dateAdapter: DateAdapter<any>);
    ngOnDestroy(): void;
    ngDoCheck(): void;
    focus(): void;
    focusChanged(isFocused: boolean): void;
    onBlur(): void;
    onPaste($event: any): void;
    onInput(): void;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get empty(): boolean;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    onContainerClick(): void;
    writeValue(value: D | null): void;
    onKeyDown(event: KeyboardEvent): void;
    registerOnChange(fn: (value: D) => void): void;
    registerOnTouched(fn: () => void): void;
    saveOriginalValue(value: D): void;
    /** Does some manual dirty checking on the native input `value` property. */
    private dirtyCheckNativeValue;
    /** Checks whether the input is invalid based on the native validation. */
    private isBadInput;
    private applyInputChanges;
    private upDownTimeByArrowKeys;
    private switchSelectionBetweenTimeparts;
    /**
     * @description Microsoft EDGE doesn't support KeyboaedEvent.code thus we need this helper
     */
    private getKeyCode;
    private createSelectionOfTimeComponentInInput;
    private incrementTime;
    /**
     * @description Decrement part of time
     */
    private decrementTime;
    private getCursorPositionOfPrevTimePartStart;
    private getCursorPositionOfNextTimePartStart;
    /**
     * @description Get params for arrow-keys (up/down) time valie edit.
     * @param cursorPosition Current cursor position in timeString
     */
    private getTimeEditMetrics;
    /**
     * @description Create time string for displaying inside input element of UI
     */
    private getTimeStringFromDate;
    private getParsedTimeParts;
    /**
     * @description Create Date object from separate parts of time
     */
    private getDateFromTimeDigits;
    private getDateFromTimeString;
    private getTimeDigitsFromDate;
    private parseValidator;
    private minTimeValidator;
    private maxTimeValidator;
    private isTimeLowerThenMin;
    private isTimeGreaterThenMax;
}
