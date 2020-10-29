import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { forwardRef, Directive, ElementRef, Optional, Renderer2, Input, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, Validators, FormsModule } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DateAdapter } from '@ptsecurity/cdk/datetime';
import { hasModifierKey, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW } from '@ptsecurity/cdk/keycodes';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { Subject, noop } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * Generated from: timepicker.constants.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const TimeParts = {
    hours: 0,
    minutes: 1,
    seconds: 2,
};
TimeParts[TimeParts.hours] = 'hours';
TimeParts[TimeParts.minutes] = 'minutes';
TimeParts[TimeParts.seconds] = 'seconds';
/** @enum {string} */
const TimeFormats = {
    HHmmss: "HH:mm:ss",
    HHmm: "HH:mm",
};
/** @type {?} */
const TIMEFORMAT_PLACEHOLDERS = {
    [TimeFormats.HHmmss]: '  :  :  ',
    [TimeFormats.HHmm]: '  :  '
};
/** @type {?} */
const DEFAULT_TIME_FORMAT = TimeFormats.HHmm;
/** @type {?} */
const HOURS_MINUTES_SECONDS_REGEXP = /^([0-1][0-9]|2[0-3]):?([0-5][0-9]):?([0-5][0-9])?$/;
/** @type {?} */
const HOURS_MINUTES_REGEXP = /^([0-1][0-9]|2[0-3]):?([0-5][0-9])?$/;
/** @type {?} */
const HOURS_ONLY_REGEXP = /^([0-1][0-9]|2[0-3]):?$/;
/** @type {?} */
const AM_PM_FORMAT_REGEXP = /^([0-1]?[0-9]):([0-5]?[0-9]) ([ap][m]?$)/i;
/** @type {?} */
const SECONDS_PER_MINUTE = 59;
/** @type {?} */
const MINUTES_PER_HOUR = 59;
/** @type {?} */
const HOURS_PER_DAY = 23;

/**
 * @fileoverview added by tsickle
 * Generated from: timepicker.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@docs-private
 * @type {?}
 */
const MC_TIMEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => McTimepicker)),
    multi: true
};
/**
 * \@docs-private
 * @type {?}
 */
const MC_TIMEPICKER_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => McTimepicker)),
    multi: true
};
/** @type {?} */
let uniqueComponentIdSuffix = 0;
/**
 * @template D
 */
class McTimepicker {
    /**
     * @param {?} elementRef
     * @param {?} dateAdapter
     * @param {?} renderer
     */
    constructor(elementRef, dateAdapter, renderer) {
        this.elementRef = elementRef;
        this.dateAdapter = dateAdapter;
        this.renderer = renderer;
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         */
        this.stateChanges = new Subject();
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         */
        this.focused = false;
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         */
        this.controlType = 'mc-timepicker';
        this.lastValueValid = false;
        this._format = DEFAULT_TIME_FORMAT;
        this._min = null;
        this._max = null;
        this.uid = `mc-timepicker-${uniqueComponentIdSuffix++}`;
        this.parseValidator = (/**
         * @return {?}
         */
        () => {
            return this.empty || this.lastValueValid ? null : { mcTimepickerParse: { text: this.viewValue } };
        });
        this.minValidator = (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            /** @type {?} */
            const controlValue = this.getValidDateOrNull(this.dateAdapter.deserialize(control.value));
            return (!this.min || !controlValue || this.compareTime(this.min, controlValue) <= 0) ?
                null :
                { mcTimepickerLowerThenMin: { min: this.min, actual: controlValue } };
        });
        this.maxValidator = (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            /** @type {?} */
            const controlValue = this.getValidDateOrNull(this.dateAdapter.deserialize(control.value));
            return (!this.max || !controlValue || this.compareTime(this.max, controlValue) >= 0) ?
                null :
                { mcTimepickerHigherThenMax: { max: this.max, actual: controlValue } };
        });
        // tslint:disable-next-line:no-empty
        this.validatorOnChange = (/**
         * @return {?}
         */
        () => { });
        if (!this.dateAdapter) {
            throw Error(`McTimepicker: No provider found for DateAdapter. You must import one of the existing ` +
                `modules at your application root or provide a custom implementation or use exists ones.`);
        }
        this.validator = Validators.compose([this.parseValidator, this.minValidator, this.maxValidator]);
        this.onChange = noop;
        // Force setter to be called in case id was not specified.
        this.id = this.id;
        this.placeholder = TIMEFORMAT_PLACEHOLDERS[DEFAULT_TIME_FORMAT];
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        // Browsers may not fire the blur event if the input is disabled too quickly.
        // Reset from here to ensure that the element doesn't become stuck.
        if (this.focused) {
            this.focused = false;
        }
        this.stateChanges.next();
    }
    /**
     * @return {?}
     */
    get id() {
        return this._id;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set id(value) {
        this._id = value || this.uid;
    }
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    get required() {
        return this._required;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) {
        this._required = coerceBooleanProperty(value);
    }
    /**
     * @return {?}
     */
    get format() {
        return this._format;
    }
    /**
     * @param {?} formatValue
     * @return {?}
     */
    set format(formatValue) {
        this._format = Object
            .keys(TimeFormats)
            .map((/**
         * @param {?} timeFormatKey
         * @return {?}
         */
        (timeFormatKey) => TimeFormats[timeFormatKey]))
            .indexOf(formatValue) > -1 ? formatValue : DEFAULT_TIME_FORMAT;
        this.placeholder = TIMEFORMAT_PLACEHOLDERS[this._format];
        if (this.value) {
            this.updateView();
        }
    }
    /**
     * @return {?}
     */
    get min() {
        return this._min;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set min(value) {
        this._min = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        this.validatorOnChange();
    }
    /**
     * @return {?}
     */
    get max() {
        return this._max;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set max(value) {
        this._max = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        this.validatorOnChange();
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        /** @type {?} */
        const newValue = this.dateAdapter.deserialize(value);
        this.lastValueValid = !newValue || this.dateAdapter.isValid(newValue);
        this._value = this.getValidDateOrNull(newValue);
        this.updateView();
    }
    /**
     * @return {?}
     */
    get viewValue() {
        return this.elementRef.nativeElement.value;
    }
    /**
     * @return {?}
     */
    get ngControl() {
        return this.control;
    }
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    get empty() {
        return !this.viewValue && !this.isBadInput();
    }
    /**
     * @return {?}
     */
    get selectionStart() {
        return this.elementRef.nativeElement.selectionStart;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectionStart(value) {
        this.elementRef.nativeElement.selectionStart = value;
    }
    /**
     * @return {?}
     */
    get selectionEnd() {
        return this.elementRef.nativeElement.selectionEnd;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectionEnd(value) {
        this.elementRef.nativeElement.selectionEnd = value;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stateChanges.complete();
    }
    /**
     * @return {?}
     */
    focus() {
        this.elementRef.nativeElement.focus();
    }
    /**
     * @param {?} isFocused
     * @return {?}
     */
    focusChanged(isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.onTouched();
            this.stateChanges.next();
        }
    }
    /**
     * @return {?}
     */
    onBlur() {
        this.lastValueValid = !!this.getDateFromTimeString(this.viewValue);
        this.control.updateValueAndValidity();
        this.focusChanged(false);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onPaste($event) {
        /** @type {?} */
        const newTimeObj = this.getDateFromTimeString($event.clipboardData.getData('text'));
        if (!newTimeObj) {
            return;
        }
        $event.preventDefault();
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.getTimeStringFromDate(newTimeObj, this.format));
        this.value = newTimeObj;
        this.onChange(newTimeObj);
        this.stateChanges.next();
    }
    /**
     * @return {?}
     */
    onInput() {
        /** @type {?} */
        const newTimeObj = this.getDateFromTimeString(this.viewValue);
        this.lastValueValid = !!newTimeObj;
        if (!newTimeObj) {
            this.control.updateValueAndValidity();
            return;
        }
        /** @type {?} */
        const selectionStart = this.selectionStart;
        /** @type {?} */
        const selectionEnd = this.selectionEnd;
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.getTimeStringFromDate(newTimeObj, this.format));
        this.selectionStart = selectionStart;
        this.selectionEnd = selectionEnd;
        this.createSelectionOfTimeComponentInInput(((/** @type {?} */ (selectionStart))) + 1);
        this.value = newTimeObj;
        this.onChange(newTimeObj);
        this.stateChanges.next();
    }
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    onContainerClick() {
        this.focus();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        // tslint:disable-next-line: deprecation
        /** @type {?} */
        const keyCode = event.keyCode;
        if (hasModifierKey(event)) {
            noop();
        }
        else if ([UP_ARROW, DOWN_ARROW].includes(keyCode)) {
            event.preventDefault();
            this.verticalArrowKeyHandler(keyCode);
        }
        else if ([LEFT_ARROW, RIGHT_ARROW].includes(keyCode)) {
            this.horizontalArrowKeyHandler(keyCode);
        }
        else {
            setTimeout((/**
             * @return {?}
             */
            () => this.onInput()));
        }
    }
    /**
     * @param {?} control
     * @return {?}
     */
    validate(control) {
        this.setControl(control);
        return this.validator ? this.validator(control) : null;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnValidatorChange(fn) {
        this.validatorOnChange = fn;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * Checks whether the input is invalid based on the native validation.
     * @private
     * @return {?}
     */
    isBadInput() {
        /** @type {?} */
        const validity = ((/** @type {?} */ (this.elementRef.nativeElement))).validity;
        return validity && validity.badInput;
    }
    /**
     * @private
     * @param {?} keyCode
     * @return {?}
     */
    verticalArrowKeyHandler(keyCode) {
        if (!this.value) {
            return;
        }
        /** @type {?} */
        let changedTime;
        /** @type {?} */
        const newEditParams = this.getTimeEditMetrics((/** @type {?} */ (this.selectionStart)));
        if (keyCode === UP_ARROW) {
            changedTime = this.incrementTime(this.value, newEditParams.modifiedTimePart);
        }
        if (keyCode === DOWN_ARROW) {
            changedTime = this.decrementTime(this.value, newEditParams.modifiedTimePart);
        }
        this.value = changedTime;
        this.selectionStart = newEditParams.cursorStartPosition;
        this.selectionEnd = newEditParams.cursorEndPosition;
        this.onChange(changedTime);
        this.stateChanges.next();
    }
    /**
     * @private
     * @param {?} keyCode
     * @return {?}
     */
    horizontalArrowKeyHandler(keyCode) {
        if (!this.value) {
            return;
        }
        /** @type {?} */
        let cursorPos = (/** @type {?} */ (this.selectionStart));
        if (keyCode === LEFT_ARROW) {
            cursorPos = cursorPos === 0 ? this.viewValue.length : cursorPos - 1;
        }
        else if (keyCode === RIGHT_ARROW) {
            /** @type {?} */
            const nextDividerPos = this.viewValue.indexOf(':', cursorPos);
            cursorPos = nextDividerPos ? nextDividerPos + 1 : 0;
        }
        this.createSelectionOfTimeComponentInInput(cursorPos);
    }
    /**
     * @private
     * @param {?} cursorPos
     * @return {?}
     */
    createSelectionOfTimeComponentInInput(cursorPos) {
        setTimeout((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const newEditParams = this.getTimeEditMetrics(cursorPos);
            this.selectionStart = newEditParams.cursorStartPosition;
            this.selectionEnd = newEditParams.cursorEndPosition;
        }));
    }
    /**
     * @private
     * @param {?} dateVal
     * @param {?=} whatToIncrement
     * @return {?}
     */
    incrementTime(dateVal, whatToIncrement = TimeParts.seconds) {
        /** @type {?} */
        let hours = this.dateAdapter.getHours(dateVal);
        /** @type {?} */
        let minutes = this.dateAdapter.getMinutes(dateVal);
        /** @type {?} */
        let seconds = this.dateAdapter.getSeconds(dateVal);
        switch (whatToIncrement) {
            case TimeParts.hours:
                hours++;
                break;
            case TimeParts.minutes:
                minutes++;
                break;
            case TimeParts.seconds:
                seconds++;
                break;
            default:
        }
        if (seconds > SECONDS_PER_MINUTE) {
            seconds = 0;
        }
        if (minutes > MINUTES_PER_HOUR) {
            minutes = 0;
        }
        if (hours > HOURS_PER_DAY) {
            hours = 0;
        }
        return this.dateAdapter.createDateTime(this.dateAdapter.getYear(this.value), this.dateAdapter.getMonth(this.value), this.dateAdapter.getDate(this.value), hours, minutes, seconds, this.dateAdapter.getMilliseconds(this.value));
    }
    /**
     * @private
     * @param {?} dateVal
     * @param {?=} whatToDecrement
     * @return {?}
     */
    decrementTime(dateVal, whatToDecrement = TimeParts.seconds) {
        /** @type {?} */
        let hours = this.dateAdapter.getHours(dateVal);
        /** @type {?} */
        let minutes = this.dateAdapter.getMinutes(dateVal);
        /** @type {?} */
        let seconds = this.dateAdapter.getSeconds(dateVal);
        switch (whatToDecrement) {
            case TimeParts.hours:
                hours--;
                break;
            case TimeParts.minutes:
                minutes--;
                break;
            case TimeParts.seconds:
                seconds--;
                break;
            default:
        }
        if (seconds < 0) {
            seconds = SECONDS_PER_MINUTE;
        }
        if (minutes < 0) {
            minutes = MINUTES_PER_HOUR;
        }
        if (hours < 0) {
            hours = HOURS_PER_DAY;
        }
        return this.dateAdapter.createDateTime(this.dateAdapter.getYear(this.value), this.dateAdapter.getMonth(this.value), this.dateAdapter.getDate(this.value), hours, minutes, seconds, this.dateAdapter.getMilliseconds(this.value));
    }
    /**
     * \@description Get params for arrow-keys (up/down) time valie edit.
     * @private
     * @param {?} cursorPosition Current cursor position in timeString
     * @return {?}
     */
    getTimeEditMetrics(cursorPosition) {
        /** @type {?} */
        const timeString = this.viewValue;
        /** @type {?} */
        let modifiedTimePart;
        /** @type {?} */
        let cursorStartPosition;
        /** @type {?} */
        let cursorEndPosition;
        /** @type {?} */
        const hoursIndex = 0;
        /** @type {?} */
        const minutesIndex = timeString.indexOf(':', hoursIndex + 1);
        /** @type {?} */
        const secondsIndex = minutesIndex !== -1 ? timeString.indexOf(':', minutesIndex + 1) : -1;
        if (secondsIndex !== -1 && cursorPosition > secondsIndex) {
            modifiedTimePart = TimeParts.seconds;
            cursorStartPosition = secondsIndex + 1;
            cursorEndPosition = timeString.length;
        }
        else if (minutesIndex !== -1 && cursorPosition > minutesIndex) {
            modifiedTimePart = TimeParts.minutes;
            cursorStartPosition = minutesIndex + 1;
            cursorEndPosition = secondsIndex > -1 ? secondsIndex : timeString.length;
        }
        else {
            modifiedTimePart = TimeParts.hours;
            cursorStartPosition = hoursIndex;
            cursorEndPosition = minutesIndex !== -1 ? minutesIndex : timeString.length;
        }
        return { modifiedTimePart, cursorStartPosition, cursorEndPosition };
    }
    /**
     * \@description Create time string for displaying inside input element of UI
     * @private
     * @param {?} value
     * @param {?} timeFormat
     * @return {?}
     */
    getTimeStringFromDate(value, timeFormat) {
        if (!value || !this.dateAdapter.isValid(value)) {
            return '';
        }
        return this.dateAdapter.format(value, timeFormat);
    }
    /**
     * @private
     * @param {?} timeString
     * @return {?}
     */
    getDateFromTimeString(timeString) {
        if (!timeString) {
            return null;
        }
        /** @type {?} */
        const hoursAndMinutesAndSeconds = timeString.match(HOURS_MINUTES_SECONDS_REGEXP);
        /** @type {?} */
        const hoursAndMinutes = timeString.match(HOURS_MINUTES_REGEXP);
        /** @type {?} */
        const hoursOnly = timeString.match(HOURS_ONLY_REGEXP);
        /** @type {?} */
        const hoursAndMinutesInAmPm = timeString.match(AM_PM_FORMAT_REGEXP);
        /** @type {?} */
        let hours = 0;
        /** @type {?} */
        let minutes = 0;
        /** @type {?} */
        let seconds = 0;
        // tslint:disable:no-magic-numbers
        if (hoursAndMinutesInAmPm) {
            hours = Number(hoursAndMinutesInAmPm[1]);
            minutes = Number(hoursAndMinutesInAmPm[2]);
            if (/[p]/i.test(hoursAndMinutesInAmPm[3]) || (/[a]/i.test(hoursAndMinutesInAmPm[3]) && hours === 12)) {
                hours += 12;
            }
        }
        else if (hoursAndMinutesAndSeconds) {
            hours = Number(hoursAndMinutesAndSeconds[1]);
            minutes = Number(hoursAndMinutesAndSeconds[2]);
            seconds = Number(hoursAndMinutesAndSeconds[3]);
        }
        else if (hoursAndMinutes) {
            hours = Number(hoursAndMinutes[1]);
            minutes = Number(hoursAndMinutes[2]);
        }
        else if (hoursOnly) {
            hours = Number(hoursOnly[1]);
        }
        else {
            return null;
        }
        // tslint:enable
        /** @type {?} */
        const resultDate = this.dateAdapter.createDateTime(this.dateAdapter.getYear(this.value), this.dateAdapter.getMonth(this.value), this.dateAdapter.getDate(this.value), hours, minutes, seconds, this.dateAdapter.getMilliseconds(this.value));
        return this.getValidDateOrNull(resultDate);
    }
    /**
     * @private
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    compareTime(first, second) {
        /** @type {?} */
        const result = this.dateAdapter.getHours(first) - this.dateAdapter.getHours(second) ||
            this.dateAdapter.getMinutes(first) - this.dateAdapter.getMinutes(second);
        if (TimeFormats.HHmm === this.format) {
            return result;
        }
        else if (TimeFormats.HHmmss === this.format) {
            return result || this.dateAdapter.getSeconds(first) - this.dateAdapter.getSeconds(second);
        }
        else {
            throw Error(`Unknown format: ${this.format}`);
        }
    }
    /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    getValidDateOrNull(obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    }
    /**
     * @private
     * @return {?}
     */
    updateView() {
        /** @type {?} */
        const formattedValue = this.getTimeStringFromDate(this.value, this.format);
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', formattedValue);
    }
    /**
     * @private
     * @param {?} control
     * @return {?}
     */
    setControl(control) {
        if (!this.control) {
            this.control = control;
        }
    }
}
McTimepicker.decorators = [
    { type: Directive, args: [{
                selector: 'input[mcTimepicker]',
                exportAs: 'mcTimepickerInput',
                host: {
                    class: 'mc-timepicker mc-input',
                    // Native input properties that are overwritten by Angular inputs need to be synced with
                    // the native input element. Otherwise property bindings for those don't work.
                    '[attr.id]': 'id',
                    '[attr.placeholder]': 'placeholder',
                    '[attr.disabled]': 'disabled || null',
                    '[attr.required]': 'required',
                    '(blur)': 'onBlur()',
                    '(focus)': 'focusChanged(true)',
                    '(paste)': 'onPaste($event)',
                    '(keydown)': 'onKeyDown($event)'
                },
                providers: [
                    MC_TIMEPICKER_VALIDATORS,
                    MC_TIMEPICKER_VALUE_ACCESSOR,
                    { provide: McFormFieldControl, useExisting: McTimepicker }
                ]
            },] }
];
/** @nocollapse */
McTimepicker.ctorParameters = () => [
    { type: ElementRef },
    { type: DateAdapter, decorators: [{ type: Optional }] },
    { type: Renderer2 }
];
McTimepicker.propDecorators = {
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    id: [{ type: Input }],
    required: [{ type: Input }],
    format: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    value: [{ type: Input }]
};
if (false) {
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @type {?}
     */
    McTimepicker.prototype.stateChanges;
    /** @type {?} */
    McTimepicker.prototype.errorState;
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @type {?}
     */
    McTimepicker.prototype.focused;
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @type {?}
     */
    McTimepicker.prototype.controlType;
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @type {?}
     */
    McTimepicker.prototype.placeholder;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype.lastValueValid;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype.control;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype._id;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype._required;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype._format;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype._min;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype._max;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype._value;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype.uid;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype.validator;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype.onChange;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype.parseValidator;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype.minValidator;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype.maxValidator;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype.validatorOnChange;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype.dateAdapter;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype.renderer;
}

/**
 * @fileoverview added by tsickle
 * Generated from: timepicker.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McTimepickerModule {
}
McTimepickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    A11yModule,
                    PlatformModule,
                    FormsModule
                ],
                declarations: [McTimepicker],
                exports: [McTimepicker]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ptsecurity-mosaic-timepicker.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AM_PM_FORMAT_REGEXP, DEFAULT_TIME_FORMAT, HOURS_MINUTES_REGEXP, HOURS_MINUTES_SECONDS_REGEXP, HOURS_ONLY_REGEXP, HOURS_PER_DAY, MC_TIMEPICKER_VALIDATORS, MC_TIMEPICKER_VALUE_ACCESSOR, MINUTES_PER_HOUR, McTimepicker, McTimepickerModule, SECONDS_PER_MINUTE, TIMEFORMAT_PLACEHOLDERS, TimeFormats, TimeParts };
//# sourceMappingURL=ptsecurity-mosaic-timepicker.js.map
