import { DoCheck, ElementRef, InjectionToken, OnChanges, OnDestroy, Renderer2 } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { CanUpdateErrorState, CanUpdateErrorStateCtor, ErrorStateMatcher } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { TimeFormats } from './timepicker.constants';
export declare const MC_INPUT_VALUE_ACCESSOR: InjectionToken<{
    value: any;
}>;
export declare class McTimepickerBase {
    _defaultErrorStateMatcher: ErrorStateMatcher;
    _parentForm: NgForm;
    _parentFormGroup: FormGroupDirective;
    ngControl: NgControl;
    constructor(_defaultErrorStateMatcher: ErrorStateMatcher, _parentForm: NgForm, _parentFormGroup: FormGroupDirective, ngControl: NgControl);
}
export declare const McTimepickerMixinBase: CanUpdateErrorStateCtor & typeof McTimepickerBase;
export declare class McTimepicker extends McTimepickerMixinBase implements McFormFieldControl<any>, OnChanges, OnDestroy, DoCheck, CanUpdateErrorState, ControlValueAccessor {
    private readonly _elementRef;
    ngControl: NgControl;
    private readonly _renderer;
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
    private readonly _uid;
    private _disabled;
    private _required;
    private _previousNativeValue;
    private readonly _inputValueAccessor;
    private _onChange;
    private _onTouched;
    private _timeFormat;
    private _minTime;
    private _minDTime;
    private _maxTime;
    private _maxDTime;
    private _currentDTimeInput;
    constructor(_elementRef: ElementRef, ngControl: NgControl, _parentForm: NgForm, _parentFormGroup: FormGroupDirective, _defaultErrorStateMatcher: ErrorStateMatcher, inputValueAccessor: any, _renderer: Renderer2);
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
    private _dirtyCheckNativeValue;
    /** Checks whether the input is invalid based on the native validation. */
    private _isBadInput;
    private _applyInputChanges;
    private _upDownTimeByArrowKeys;
    private _switchSelectionBetweenTimeparts;
    /**
     * @description Microsoft EDGE doesn't support KeyboaedEvent.code thus we need this helper
     */
    private _getKeyCode;
    private _createSelectionOfTimeComponentInInput;
    private _incrementTime;
    /**
     * @description Decrement part of time
     */
    private _decrementTime;
    private _getCursorPositionOfPrevTimePartStart;
    private _getCursorPositionOfNextTimePartStart;
    /**
     * @description Get params for arrow-keys (up/down) time valie edit.
     * @param cursorPosition Current cursor position in timeString
     */
    private _getTimeEditMetrics;
    /**
     * @description Create time string for displaying inside input element of UI
     */
    private _getTimeStringFromDate;
    private _getParsedTimeParts;
    /**
     * @description Create Date object from separate parts of time
     */
    private _getDateFromTimeDigits;
    private _getDateFromTimeString;
    private _getNumberWithLeadingZero;
    private _getTimeDigitsFromDate;
    private _parseValidator;
    private _minTimeValidator;
    private _maxTimeValidator;
    private _isTimeLowerThenMin;
    private _isTimeGreaterThenMax;
}
