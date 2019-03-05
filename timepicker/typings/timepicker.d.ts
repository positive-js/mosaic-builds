import { DoCheck, ElementRef, OnChanges, OnDestroy, Renderer2 } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
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
export declare class McTimepicker extends McTimepickerMixinBase implements McFormFieldControl<any>, OnChanges, OnDestroy, DoCheck, CanUpdateErrorState, ControlValueAccessor {
    private readonly elementRef;
    ngControl: NgControl;
    private readonly renderer;
    /** An object used to control when error messages are shown. */
    errorStateMatcher: ErrorStateMatcher;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    focused: boolean;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    readonly stateChanges: Subject<void>;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    controlType: string;
    disabled: boolean;
    id: string;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    placeholder: string;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    required: boolean;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    value: string;
    timeFormat: TimeFormats;
    minTime: string | null;
    maxTime: string | null;
    private _id;
    private readonly uid;
    private _disabled;
    private _required;
    private previousNativeValue;
    private readonly inputValueAccessor;
    private onChange;
    private onTouched;
    private _timeFormat;
    private _minTime;
    private minDateTime;
    private _maxTime;
    private maxDateTime;
    private currentDateTimeInput;
    constructor(elementRef: ElementRef, ngControl: NgControl, parentForm: NgForm, parentFormGroup: FormGroupDirective, defaultErrorStateMatcher: ErrorStateMatcher, inputValueAccessor: any, renderer: Renderer2);
    ngOnChanges(): void;
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
    readonly empty: boolean;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    onContainerClick(): void;
    writeValue(value: Date | null): void;
    onKeyDown(event: KeyboardEvent): void;
    registerOnChange(fn: (value: Date) => void): void;
    registerOnTouched(fn: () => void): void;
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
    private getNumberWithLeadingZero;
    private getTimeDigitsFromDate;
    private parseValidator;
    private minTimeValidator;
    private maxTimeValidator;
    private isTimeLowerThenMin;
    private isTimeGreaterThenMax;
}
