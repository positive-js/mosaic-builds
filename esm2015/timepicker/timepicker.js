/**
 * @fileoverview added by tsickle
 * Generated from: timepicker.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, forwardRef, Input, Optional, Renderer2 } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { DateAdapter } from '@ptsecurity/cdk/datetime';
import { BACKSPACE, DELETE, DOWN_ARROW, hasModifierKey, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@ptsecurity/cdk/keycodes';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { noop, Subject } from 'rxjs';
import { DEFAULT_TIME_FORMAT, HOURS_PER_DAY, HOURS_MINUTES_REGEXP, HOURS_MINUTES_SECONDS_REGEXP, HOURS_ONLY_REGEXP, MINUTES_PER_HOUR, SECONDS_PER_MINUTE, TIMEFORMAT_PLACEHOLDERS, TimeFormats, TimeParts, AM_PM_FORMAT_REGEXP } from './timepicker.constants';
/**
 * \@docs-private
 * @type {?}
 */
export const MC_TIMEPICKER_VALUE_ACCESSOR = {
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
export const MC_TIMEPICKER_VALIDATORS = {
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
export class McTimepicker {
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
        if (!newTimeObj) {
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
        if (hasModifierKey(event) || [BACKSPACE, DELETE].includes(keyCode)) {
            return;
        }
        else if ([UP_ARROW, DOWN_ARROW].includes(keyCode)) {
            event.preventDefault();
            this.verticalArrowKeyHandler(keyCode);
            return;
        }
        else if ([LEFT_ARROW, RIGHT_ARROW].includes(keyCode)) {
            this.horizontalArrowKeyHandler(keyCode);
            return;
        }
        setTimeout((/**
         * @return {?}
         */
        () => this.onInput()));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy90aW1lcGlja2VyLyIsInNvdXJjZXMiOlsidGltZXBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFVBQVUsRUFDVixLQUFLLEVBRUwsUUFBUSxFQUNSLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBR0gsYUFBYSxFQUNiLGlCQUFpQixFQUlqQixVQUFVLEVBQ2IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUNILFNBQVMsRUFDVCxNQUFNLEVBQ04sVUFBVSxFQUNWLGNBQWMsRUFDZCxVQUFVLEVBQ1YsV0FBVyxFQUNYLFFBQVEsRUFDWCxNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXJDLE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLG9CQUFvQixFQUNwQiw0QkFBNEIsRUFDNUIsaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixrQkFBa0IsRUFDbEIsdUJBQXVCLEVBQ3ZCLFdBQVcsRUFDWCxTQUFTLEVBQ1QsbUJBQW1CLEVBQ3RCLE1BQU0sd0JBQXdCLENBQUM7Ozs7O0FBSWhDLE1BQU0sT0FBTyw0QkFBNEIsR0FBUTtJQUM3QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxHQUFHLEVBQUUsQ0FBQyxZQUFZLEVBQUM7SUFDM0MsS0FBSyxFQUFFLElBQUk7Q0FDZDs7Ozs7QUFHRCxNQUFN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QVMsRUFBRTtvQkFDUCx3QkFBd0I7b0JBQ3hCLDRCQUE0QjtvQkFDNUIsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRTtpQkFDN0Q7YUFDSjs7OztZQXZGRyxVQUFVO1lBaUJMLFdBQVcsdUJBd1BYLFFBQVE7WUFwUWIsU0FBUzs7OzBCQTRHUixLQUFLO3VCQUtMLEtBQUs7aUJBbUJMLEtBQUs7dUJBZUwsS0FBSztxQkFXTCxLQUFLO2tCQW9CTCxLQUFLO2tCQVlMLEtBQUs7b0JBWUwsS0FBSzs7Ozs7Ozs7SUFsSE4sb0NBQTJEOztJQUUzRCxrQ0FBNkI7Ozs7OztJQU03QiwrQkFBeUI7Ozs7OztJQU16QixtQ0FBc0M7Ozs7OztJQU10QyxtQ0FBNkI7Ozs7O0lBQzdCLHNDQUErQjs7Ozs7SUFFL0IsK0JBQWlDOzs7OztJQW1CakMsaUNBQTJCOzs7OztJQVczQiwyQkFBb0I7Ozs7O0lBZXBCLGlDQUEyQjs7Ozs7SUFvQjNCLCtCQUFtRDs7Ozs7SUFZbkQsNEJBQThCOzs7OztJQVk5Qiw0QkFBOEI7Ozs7O0lBaUI5Qiw4QkFBeUI7Ozs7O0lBa0N6QiwyQkFBb0U7Ozs7O0lBRXBFLGlDQUFzQzs7Ozs7SUFFdEMsZ0NBQXVDOzs7OztJQUN2QyxpQ0FBOEI7Ozs7O0lBcVc5QixzQ0FFQzs7Ozs7SUFFRCxvQ0FNQzs7Ozs7SUFFRCxvQ0FNQzs7Ozs7SUFnQ0QseUNBQXFDOzs7OztJQXBaakMsa0NBQXVDOzs7OztJQUN2QyxtQ0FBaUQ7Ozs7O0lBQ2pELGdDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9wdGlvbmFsLFxuICAgIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQWJzdHJhY3RDb250cm9sLFxuICAgIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIE5HX1ZBTElEQVRPUlMsXG4gICAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgVmFsaWRhdGlvbkVycm9ycyxcbiAgICBWYWxpZGF0b3IsXG4gICAgVmFsaWRhdG9yRm4sXG4gICAgVmFsaWRhdG9yc1xufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9kYXRldGltZSc7XG5pbXBvcnQge1xuICAgIEJBQ0tTUEFDRSxcbiAgICBERUxFVEUsXG4gICAgRE9XTl9BUlJPVyxcbiAgICBoYXNNb2RpZmllcktleSxcbiAgICBMRUZUX0FSUk9XLFxuICAgIFJJR0hUX0FSUk9XLFxuICAgIFVQX0FSUk9XXG59IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBNY0Zvcm1GaWVsZENvbnRyb2wgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBub29wLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7XG4gICAgREVGQVVMVF9USU1FX0ZPUk1BVCxcbiAgICBIT1VSU19QRVJfREFZLFxuICAgIEhPVVJTX01JTlVURVNfUkVHRVhQLFxuICAgIEhPVVJTX01JTlVURVNfU0VDT05EU19SRUdFWFAsXG4gICAgSE9VUlNfT05MWV9SRUdFWFAsXG4gICAgTUlOVVRFU19QRVJfSE9VUixcbiAgICBTRUNPTkRTX1BFUl9NSU5VVEUsXG4gICAgVElNRUZPUk1BVF9QTEFDRUhPTERFUlMsXG4gICAgVGltZUZvcm1hdHMsXG4gICAgVGltZVBhcnRzLFxuICAgIEFNX1BNX0ZPUk1BVF9SRUdFWFBcbn0gZnJvbSAnLi90aW1lcGlja2VyLmNvbnN0YW50cyc7XG5cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19USU1FUElDS0VSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWNUaW1lcGlja2VyKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19USU1FUElDS0VSX1ZBTElEQVRPUlM6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1jVGltZXBpY2tlciksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cblxubGV0IHVuaXF1ZUNvbXBvbmVudElkU3VmZml4OiBudW1iZXIgPSAwO1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnaW5wdXRbbWNUaW1lcGlja2VyXScsXG4gICAgZXhwb3J0QXM6ICdtY1RpbWVwaWNrZXJJbnB1dCcsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRpbWVwaWNrZXIgbWMtaW5wdXQnLFxuICAgICAgICAvLyBOYXRpdmUgaW5wdXQgcHJvcGVydGllcyB0aGF0IGFyZSBvdmVyd3JpdHRlbiBieSBBbmd1bGFyIGlucHV0cyBuZWVkIHRvIGJlIHN5bmNlZCB3aXRoXG4gICAgICAgIC8vIHRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudC4gT3RoZXJ3aXNlIHByb3BlcnR5IGJpbmRpbmdzIGZvciB0aG9zZSBkb24ndCB3b3JrLlxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAgICAgJ1thdHRyLnBsYWNlaG9sZGVyXSc6ICdwbGFjZWhvbGRlcicsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgICAgICdbYXR0ci5yZXF1aXJlZF0nOiAncmVxdWlyZWQnLFxuXG4gICAgICAgICcoYmx1ciknOiAnb25CbHVyKCknLFxuICAgICAgICAnKGZvY3VzKSc6ICdmb2N1c0NoYW5nZWQodHJ1ZSknLFxuXG4gICAgICAgICcocGFzdGUpJzogJ29uUGFzdGUoJGV2ZW50KScsXG5cbiAgICAgICAgJyhrZXlkb3duKSc6ICdvbktleURvd24oJGV2ZW50KSdcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBNQ19USU1FUElDS0VSX1ZBTElEQVRPUlMsXG4gICAgICAgIE1DX1RJTUVQSUNLRVJfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIHsgcHJvdmlkZTogTWNGb3JtRmllbGRDb250cm9sLCB1c2VFeGlzdGluZzogTWNUaW1lcGlja2VyIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jVGltZXBpY2tlcjxEPiBpbXBsZW1lbnRzIE1jRm9ybUZpZWxkQ29udHJvbDxEPiwgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yIHtcbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgcmVhZG9ubHkgc3RhdGVDaGFuZ2VzOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIHJlYWRvbmx5IGVycm9yU3RhdGU6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGNvbnRyb2xUeXBlOiBzdHJpbmcgPSAnbWMtdGltZXBpY2tlcic7XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgICBwcml2YXRlIGxhc3RWYWx1ZVZhbGlkID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgICAgICAvLyBCcm93c2VycyBtYXkgbm90IGZpcmUgdGhlIGJsdXIgZXZlbnQgaWYgdGhlIGlucHV0IGlzIGRpc2FibGVkIHRvbyBxdWlja2x5LlxuICAgICAgICAvLyBSZXNldCBmcm9tIGhlcmUgdG8gZW5zdXJlIHRoYXQgdGhlIGVsZW1lbnQgZG9lc24ndCBiZWNvbWUgc3R1Y2suXG4gICAgICAgIGlmICh0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cblxuICAgIHNldCBpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2lkID0gdmFsdWUgfHwgdGhpcy51aWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVpcmVkO1xuICAgIH1cblxuICAgIHNldCByZXF1aXJlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9yZXF1aXJlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBmb3JtYXQoKTogVGltZUZvcm1hdHMge1xuICAgICAgICByZXR1cm4gdGhpcy5fZm9ybWF0O1xuICAgIH1cblxuICAgIHNldCBmb3JtYXQoZm9ybWF0VmFsdWU6IFRpbWVGb3JtYXRzKSB7XG4gICAgICAgIHRoaXMuX2Zvcm1hdCA9IE9iamVjdFxuICAgICAgICAgICAgLmtleXMoVGltZUZvcm1hdHMpXG4gICAgICAgICAgICAubWFwKCh0aW1lRm9ybWF0S2V5KSA9PiBUaW1lRm9ybWF0c1t0aW1lRm9ybWF0S2V5XSlcbiAgICAgICAgICAgIC5pbmRleE9mKGZvcm1hdFZhbHVlKSA+IC0xID8gZm9ybWF0VmFsdWUgOiBERUZBVUxUX1RJTUVfRk9STUFUO1xuXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBUSU1FRk9STUFUX1BMQUNFSE9MREVSU1t0aGlzLl9mb3JtYXRdO1xuXG4gICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2Zvcm1hdDogVGltZUZvcm1hdHMgPSBERUZBVUxUX1RJTUVfRk9STUFUO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWluKCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbjtcbiAgICB9XG5cbiAgICBzZXQgbWluKHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9taW4gPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9taW46IEQgfCBudWxsID0gbnVsbDtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1heCgpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXg7XG4gICAgfVxuXG4gICAgc2V0IG1heCh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbWF4ID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgICAgICB0aGlzLnZhbGlkYXRvck9uQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWF4OiBEIHwgbnVsbCA9IG51bGw7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9ICFuZXdWYWx1ZSB8fCB0aGlzLmRhdGVBZGFwdGVyLmlzVmFsaWQobmV3VmFsdWUpO1xuXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwobmV3VmFsdWUpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3ZhbHVlOiBEIHwgbnVsbDtcblxuICAgIGdldCB2aWV3VmFsdWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgIH1cblxuICAgIGdldCBuZ0NvbnRyb2woKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMudmlld1ZhbHVlICYmICF0aGlzLmlzQmFkSW5wdXQoKTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0aW9uU3RhcnQoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0aW9uU3RhcnQodmFsdWU6IG51bWJlciB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0aW9uRW5kKCk6IG51bWJlciB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3Rpb25FbmQodmFsdWU6IG51bWJlciB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWFkb25seSB1aWQgPSBgbWMtdGltZXBpY2tlci0ke3VuaXF1ZUNvbXBvbmVudElkU3VmZml4Kyt9YDtcblxuICAgIHByaXZhdGUgdmFsaWRhdG9yOiBWYWxpZGF0b3JGbiB8IG51bGw7XG5cbiAgICBwcml2YXRlIG9uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZDtcbiAgICBwcml2YXRlIG9uVG91Y2hlZDogKCkgPT4gdm9pZDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPGFueT4sXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICAgICkge1xuICAgICAgICBpZiAoIXRoaXMuZGF0ZUFkYXB0ZXIpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBNY1RpbWVwaWNrZXI6IE5vIHByb3ZpZGVyIGZvdW5kIGZvciBEYXRlQWRhcHRlci4gWW91IG11c3QgaW1wb3J0IG9uZSBvZiB0aGUgZXhpc3RpbmcgYCArXG4gICAgICAgICAgICAgICAgYG1vZHVsZXMgYXQgeW91ciBhcHBsaWNhdGlvbiByb290IG9yIHByb3ZpZGUgYSBjdXN0b20gaW1wbGVtZW50YXRpb24gb3IgdXNlIGV4aXN0cyBvbmVzLmApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBWYWxpZGF0b3JzLmNvbXBvc2UoW3RoaXMucGFyc2VWYWxpZGF0b3IsIHRoaXMubWluVmFsaWRhdG9yLCB0aGlzLm1heFZhbGlkYXRvcl0pO1xuXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBub29wO1xuXG4gICAgICAgIC8vIEZvcmNlIHNldHRlciB0byBiZSBjYWxsZWQgaW4gY2FzZSBpZCB3YXMgbm90IHNwZWNpZmllZC5cbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuaWQ7XG5cbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IFRJTUVGT1JNQVRfUExBQ0VIT0xERVJTW0RFRkFVTFRfVElNRV9GT1JNQVRdO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIGZvY3VzQ2hhbmdlZChpc0ZvY3VzZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzRm9jdXNlZCAhPT0gdGhpcy5mb2N1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSBpc0ZvY3VzZWQ7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25CbHVyKCkge1xuICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gISF0aGlzLmdldERhdGVGcm9tVGltZVN0cmluZyh0aGlzLnZpZXdWYWx1ZSk7XG4gICAgICAgIHRoaXMuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgIHRoaXMuZm9jdXNDaGFuZ2VkKGZhbHNlKTtcbiAgICB9XG5cbiAgICBvblBhc3RlKCRldmVudCkge1xuICAgICAgICBjb25zdCBuZXdUaW1lT2JqID0gdGhpcy5nZXREYXRlRnJvbVRpbWVTdHJpbmcoJGV2ZW50LmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dCcpKTtcblxuICAgICAgICBpZiAoIW5ld1RpbWVPYmopIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgICAgIHRoaXMuZ2V0VGltZVN0cmluZ0Zyb21EYXRlKG5ld1RpbWVPYmosIHRoaXMuZm9ybWF0KVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMudmFsdWUgPSBuZXdUaW1lT2JqO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKG5ld1RpbWVPYmopO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgb25JbnB1dCgpIHtcbiAgICAgICAgY29uc3QgbmV3VGltZU9iaiA9IHRoaXMuZ2V0RGF0ZUZyb21UaW1lU3RyaW5nKHRoaXMudmlld1ZhbHVlKTtcblxuICAgICAgICBpZiAoIW5ld1RpbWVPYmopIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICBjb25zdCBzZWxlY3Rpb25FbmQgPSB0aGlzLnNlbGVjdGlvbkVuZDtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAndmFsdWUnLFxuICAgICAgICAgICAgdGhpcy5nZXRUaW1lU3RyaW5nRnJvbURhdGUobmV3VGltZU9iaiwgdGhpcy5mb3JtYXQpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0O1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZDtcblxuICAgICAgICB0aGlzLmNyZWF0ZVNlbGVjdGlvbk9mVGltZUNvbXBvbmVudEluSW5wdXQoKHNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgKyAxKTtcblxuICAgICAgICB0aGlzLm9uQ2hhbmdlKG5ld1RpbWVPYmopO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uQ29udGFpbmVyQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcblxuICAgICAgICBpZiAoaGFzTW9kaWZpZXJLZXkoZXZlbnQpIHx8IFtCQUNLU1BBQ0UsIERFTEVURV0uaW5jbHVkZXMoa2V5Q29kZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChbVVBfQVJST1csIERPV05fQVJST1ddLmluY2x1ZGVzKGtleUNvZGUpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLnZlcnRpY2FsQXJyb3dLZXlIYW5kbGVyKGtleUNvZGUpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoW0xFRlRfQVJST1csIFJJR0hUX0FSUk9XXS5pbmNsdWRlcyhrZXlDb2RlKSkge1xuICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsQXJyb3dLZXlIYW5kbGVyKGtleUNvZGUpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMub25JbnB1dCgpKTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZShjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgICAgIHRoaXMuc2V0Q29udHJvbChjb250cm9sKTtcblxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3IgPyB0aGlzLnZhbGlkYXRvcihjb250cm9sKSA6IG51bGw7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblZhbGlkYXRvckNoYW5nZShmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbGlkYXRvck9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogRCB8IG51bGwpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogRCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBpbnZhbGlkIGJhc2VkIG9uIHRoZSBuYXRpdmUgdmFsaWRhdGlvbi4gKi9cbiAgICBwcml2YXRlIGlzQmFkSW5wdXQoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHZhbGlkaXR5ID0gKDxIVE1MSW5wdXRFbGVtZW50PiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkudmFsaWRpdHk7XG5cbiAgICAgICAgcmV0dXJuIHZhbGlkaXR5ICYmIHZhbGlkaXR5LmJhZElucHV0O1xuICAgIH1cblxuICAgIHByaXZhdGUgdmVydGljYWxBcnJvd0tleUhhbmRsZXIoa2V5Q29kZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy52YWx1ZSkgeyByZXR1cm47IH1cblxuICAgICAgICBsZXQgY2hhbmdlZFRpbWU7XG5cbiAgICAgICAgY29uc3QgbmV3RWRpdFBhcmFtcyA9IHRoaXMuZ2V0VGltZUVkaXRNZXRyaWNzKHRoaXMuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKTtcblxuICAgICAgICBpZiAoa2V5Q29kZSA9PT0gVVBfQVJST1cpIHtcbiAgICAgICAgICAgIGNoYW5nZWRUaW1lID0gdGhpcy5pbmNyZW1lbnRUaW1lKHRoaXMudmFsdWUsIG5ld0VkaXRQYXJhbXMubW9kaWZpZWRUaW1lUGFydCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5Q29kZSA9PT0gRE9XTl9BUlJPVykge1xuICAgICAgICAgICAgY2hhbmdlZFRpbWUgPSB0aGlzLmRlY3JlbWVudFRpbWUodGhpcy52YWx1ZSwgbmV3RWRpdFBhcmFtcy5tb2RpZmllZFRpbWVQYXJ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmFsdWUgPSBjaGFuZ2VkVGltZTtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gbmV3RWRpdFBhcmFtcy5jdXJzb3JTdGFydFBvc2l0aW9uO1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkVuZCA9IG5ld0VkaXRQYXJhbXMuY3Vyc29yRW5kUG9zaXRpb247XG5cbiAgICAgICAgdGhpcy5vbkNoYW5nZShjaGFuZ2VkVGltZSk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhvcml6b250YWxBcnJvd0tleUhhbmRsZXIoa2V5Q29kZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy52YWx1ZSkgeyByZXR1cm47IH1cblxuICAgICAgICBsZXQgY3Vyc29yUG9zID0gdGhpcy5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXI7XG5cbiAgICAgICAgaWYgKGtleUNvZGUgPT09IExFRlRfQVJST1cpIHtcbiAgICAgICAgICAgIGN1cnNvclBvcyA9IGN1cnNvclBvcyA9PT0gMCA/IHRoaXMudmlld1ZhbHVlLmxlbmd0aCA6IGN1cnNvclBvcyAtIDE7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gUklHSFRfQVJST1cpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHREaXZpZGVyUG9zOiBudW1iZXIgPSB0aGlzLnZpZXdWYWx1ZS5pbmRleE9mKCc6JywgY3Vyc29yUG9zKTtcblxuICAgICAgICAgICAgY3Vyc29yUG9zID0gbmV4dERpdmlkZXJQb3MgPyBuZXh0RGl2aWRlclBvcyArIDEgOiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jcmVhdGVTZWxlY3Rpb25PZlRpbWVDb21wb25lbnRJbklucHV0KGN1cnNvclBvcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVTZWxlY3Rpb25PZlRpbWVDb21wb25lbnRJbklucHV0KGN1cnNvclBvczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3RWRpdFBhcmFtcyA9IHRoaXMuZ2V0VGltZUVkaXRNZXRyaWNzKGN1cnNvclBvcyk7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhcnQgPSBuZXdFZGl0UGFyYW1zLmN1cnNvclN0YXJ0UG9zaXRpb247XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkVuZCA9IG5ld0VkaXRQYXJhbXMuY3Vyc29yRW5kUG9zaXRpb247XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5jcmVtZW50VGltZShkYXRlVmFsOiBELCB3aGF0VG9JbmNyZW1lbnQ6IFRpbWVQYXJ0cyA9IFRpbWVQYXJ0cy5zZWNvbmRzKTogRCB7XG4gICAgICAgIGxldCBob3VycyA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0SG91cnMoZGF0ZVZhbCk7XG4gICAgICAgIGxldCBtaW51dGVzID0gdGhpcy5kYXRlQWRhcHRlci5nZXRNaW51dGVzKGRhdGVWYWwpO1xuICAgICAgICBsZXQgc2Vjb25kcyA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0U2Vjb25kcyhkYXRlVmFsKTtcblxuICAgICAgICBzd2l0Y2ggKHdoYXRUb0luY3JlbWVudCkge1xuICAgICAgICAgICAgY2FzZSBUaW1lUGFydHMuaG91cnM6XG4gICAgICAgICAgICAgICAgaG91cnMrKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVGltZVBhcnRzLm1pbnV0ZXM6XG4gICAgICAgICAgICAgICAgbWludXRlcysrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUaW1lUGFydHMuc2Vjb25kczpcbiAgICAgICAgICAgICAgICBzZWNvbmRzKys7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY29uZHMgPiBTRUNPTkRTX1BFUl9NSU5VVEUpIHsgc2Vjb25kcyA9IDA7IH1cblxuICAgICAgICBpZiAobWludXRlcyA+IE1JTlVURVNfUEVSX0hPVVIpIHsgbWludXRlcyA9IDA7IH1cblxuICAgICAgICBpZiAoaG91cnMgPiBIT1VSU19QRVJfREFZKSB7IGhvdXJzID0gMDsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVBZGFwdGVyLmNyZWF0ZURhdGVUaW1lKFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMudmFsdWUpLFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLnZhbHVlKSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLnZhbHVlKSxcbiAgICAgICAgICAgIGhvdXJzLFxuICAgICAgICAgICAgbWludXRlcyxcbiAgICAgICAgICAgIHNlY29uZHMsXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbGxpc2Vjb25kcyh0aGlzLnZhbHVlKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVjcmVtZW50VGltZShkYXRlVmFsOiBELCB3aGF0VG9EZWNyZW1lbnQ6IFRpbWVQYXJ0cyA9IFRpbWVQYXJ0cy5zZWNvbmRzKTogRCB7XG4gICAgICAgIGxldCBob3VycyA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0SG91cnMoZGF0ZVZhbCk7XG4gICAgICAgIGxldCBtaW51dGVzID0gdGhpcy5kYXRlQWRhcHRlci5nZXRNaW51dGVzKGRhdGVWYWwpO1xuICAgICAgICBsZXQgc2Vjb25kcyA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0U2Vjb25kcyhkYXRlVmFsKTtcblxuICAgICAgICBzd2l0Y2ggKHdoYXRUb0RlY3JlbWVudCkge1xuICAgICAgICAgICAgY2FzZSBUaW1lUGFydHMuaG91cnM6XG4gICAgICAgICAgICAgICAgaG91cnMtLTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVGltZVBhcnRzLm1pbnV0ZXM6XG4gICAgICAgICAgICAgICAgbWludXRlcy0tO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUaW1lUGFydHMuc2Vjb25kczpcbiAgICAgICAgICAgICAgICBzZWNvbmRzLS07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY29uZHMgPCAwKSB7IHNlY29uZHMgPSBTRUNPTkRTX1BFUl9NSU5VVEU7IH1cblxuICAgICAgICBpZiAobWludXRlcyA8IDApIHsgbWludXRlcyA9IE1JTlVURVNfUEVSX0hPVVI7IH1cblxuICAgICAgICBpZiAoaG91cnMgPCAwKSB7IGhvdXJzID0gSE9VUlNfUEVSX0RBWTsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVBZGFwdGVyLmNyZWF0ZURhdGVUaW1lKFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMudmFsdWUpLFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLnZhbHVlKSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLnZhbHVlKSxcbiAgICAgICAgICAgIGhvdXJzLFxuICAgICAgICAgICAgbWludXRlcyxcbiAgICAgICAgICAgIHNlY29uZHMsXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbGxpc2Vjb25kcyh0aGlzLnZhbHVlKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgcGFyYW1zIGZvciBhcnJvdy1rZXlzICh1cC9kb3duKSB0aW1lIHZhbGllIGVkaXQuXG4gICAgICogQHBhcmFtIGN1cnNvclBvc2l0aW9uIEN1cnJlbnQgY3Vyc29yIHBvc2l0aW9uIGluIHRpbWVTdHJpbmdcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFRpbWVFZGl0TWV0cmljcyhjdXJzb3JQb3NpdGlvbjogbnVtYmVyKToge1xuICAgICAgICBtb2RpZmllZFRpbWVQYXJ0OiBUaW1lUGFydHM7XG4gICAgICAgIGN1cnNvclN0YXJ0UG9zaXRpb246IG51bWJlcjtcbiAgICAgICAgY3Vyc29yRW5kUG9zaXRpb246IG51bWJlcjtcbiAgICB9IHtcbiAgICAgICAgY29uc3QgdGltZVN0cmluZzogc3RyaW5nID0gdGhpcy52aWV3VmFsdWU7XG4gICAgICAgIGxldCBtb2RpZmllZFRpbWVQYXJ0OiBUaW1lUGFydHM7XG4gICAgICAgIGxldCBjdXJzb3JTdGFydFBvc2l0aW9uOiBudW1iZXI7XG4gICAgICAgIGxldCBjdXJzb3JFbmRQb3NpdGlvbjogbnVtYmVyO1xuXG4gICAgICAgIGNvbnN0IGhvdXJzSW5kZXggPSAwO1xuICAgICAgICBjb25zdCBtaW51dGVzSW5kZXggPSB0aW1lU3RyaW5nLmluZGV4T2YoJzonLCBob3Vyc0luZGV4ICsgMSk7XG4gICAgICAgIGNvbnN0IHNlY29uZHNJbmRleCA9IG1pbnV0ZXNJbmRleCAhPT0gLTEgPyB0aW1lU3RyaW5nLmluZGV4T2YoJzonLCBtaW51dGVzSW5kZXggKyAxKSA6IC0xO1xuXG4gICAgICAgIGlmIChzZWNvbmRzSW5kZXggIT09IC0xICYmIGN1cnNvclBvc2l0aW9uID4gc2Vjb25kc0luZGV4KSB7XG4gICAgICAgICAgICBtb2RpZmllZFRpbWVQYXJ0ID0gVGltZVBhcnRzLnNlY29uZHM7XG4gICAgICAgICAgICBjdXJzb3JTdGFydFBvc2l0aW9uID0gc2Vjb25kc0luZGV4ICsgMTtcbiAgICAgICAgICAgIGN1cnNvckVuZFBvc2l0aW9uID0gdGltZVN0cmluZy5sZW5ndGg7XG4gICAgICAgIH0gZWxzZSBpZiAobWludXRlc0luZGV4ICE9PSAtMSAmJiBjdXJzb3JQb3NpdGlvbiA+IG1pbnV0ZXNJbmRleCkge1xuICAgICAgICAgICAgbW9kaWZpZWRUaW1lUGFydCA9IFRpbWVQYXJ0cy5taW51dGVzO1xuICAgICAgICAgICAgY3Vyc29yU3RhcnRQb3NpdGlvbiA9IG1pbnV0ZXNJbmRleCArIDE7XG4gICAgICAgICAgICBjdXJzb3JFbmRQb3NpdGlvbiA9IHNlY29uZHNJbmRleCA+IC0xID8gc2Vjb25kc0luZGV4IDogdGltZVN0cmluZy5sZW5ndGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2RpZmllZFRpbWVQYXJ0ID0gVGltZVBhcnRzLmhvdXJzO1xuICAgICAgICAgICAgY3Vyc29yU3RhcnRQb3NpdGlvbiA9IGhvdXJzSW5kZXg7XG4gICAgICAgICAgICBjdXJzb3JFbmRQb3NpdGlvbiA9IG1pbnV0ZXNJbmRleCAhPT0gLTEgPyBtaW51dGVzSW5kZXggOiB0aW1lU3RyaW5nLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IG1vZGlmaWVkVGltZVBhcnQsIGN1cnNvclN0YXJ0UG9zaXRpb24sIGN1cnNvckVuZFBvc2l0aW9uIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIENyZWF0ZSB0aW1lIHN0cmluZyBmb3IgZGlzcGxheWluZyBpbnNpZGUgaW5wdXQgZWxlbWVudCBvZiBVSVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0VGltZVN0cmluZ0Zyb21EYXRlKHZhbHVlOiBEIHwgbnVsbCwgdGltZUZvcm1hdDogVGltZUZvcm1hdHMpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXZhbHVlIHx8ICF0aGlzLmRhdGVBZGFwdGVyLmlzVmFsaWQodmFsdWUpKSB7IHJldHVybiAnJzsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVBZGFwdGVyLmZvcm1hdCh2YWx1ZSwgdGltZUZvcm1hdCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREYXRlRnJvbVRpbWVTdHJpbmcodGltZVN0cmluZzogc3RyaW5nKTogRCB8IG51bGwge1xuICAgICAgICBpZiAoIXRpbWVTdHJpbmcpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICBjb25zdCBob3Vyc0FuZE1pbnV0ZXNBbmRTZWNvbmRzID0gdGltZVN0cmluZy5tYXRjaChIT1VSU19NSU5VVEVTX1NFQ09ORFNfUkVHRVhQKTtcbiAgICAgICAgY29uc3QgaG91cnNBbmRNaW51dGVzID0gdGltZVN0cmluZy5tYXRjaChIT1VSU19NSU5VVEVTX1JFR0VYUCk7XG4gICAgICAgIGNvbnN0IGhvdXJzT25seSA9IHRpbWVTdHJpbmcubWF0Y2goSE9VUlNfT05MWV9SRUdFWFApO1xuICAgICAgICBjb25zdCBob3Vyc0FuZE1pbnV0ZXNJbkFtUG0gPSB0aW1lU3RyaW5nLm1hdGNoKEFNX1BNX0ZPUk1BVF9SRUdFWFApO1xuXG4gICAgICAgIGxldCBob3VyczogbnVtYmVyID0gMDtcbiAgICAgICAgbGV0IG1pbnV0ZXM6IG51bWJlciA9IDA7XG4gICAgICAgIGxldCBzZWNvbmRzOiBudW1iZXIgPSAwO1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlOm5vLW1hZ2ljLW51bWJlcnNcbiAgICAgICAgaWYgKGhvdXJzQW5kTWludXRlc0luQW1QbSkge1xuICAgICAgICAgICAgaG91cnMgPSBOdW1iZXIoaG91cnNBbmRNaW51dGVzSW5BbVBtWzFdKTtcbiAgICAgICAgICAgIG1pbnV0ZXMgPSBOdW1iZXIoaG91cnNBbmRNaW51dGVzSW5BbVBtWzJdKTtcblxuICAgICAgICAgICAgaWYgKC9bcF0vaS50ZXN0KGhvdXJzQW5kTWludXRlc0luQW1QbVszXSkgfHwgKC9bYV0vaS50ZXN0KGhvdXJzQW5kTWludXRlc0luQW1QbVszXSkgJiYgaG91cnMgPT09IDEyKSkge1xuICAgICAgICAgICAgICAgIGhvdXJzICs9IDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGhvdXJzQW5kTWludXRlc0FuZFNlY29uZHMpIHtcbiAgICAgICAgICAgIGhvdXJzID0gTnVtYmVyKGhvdXJzQW5kTWludXRlc0FuZFNlY29uZHNbMV0pO1xuICAgICAgICAgICAgbWludXRlcyA9IE51bWJlcihob3Vyc0FuZE1pbnV0ZXNBbmRTZWNvbmRzWzJdKTtcbiAgICAgICAgICAgIHNlY29uZHMgPSBOdW1iZXIoaG91cnNBbmRNaW51dGVzQW5kU2Vjb25kc1szXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaG91cnNBbmRNaW51dGVzKSB7XG4gICAgICAgICAgICBob3VycyA9IE51bWJlcihob3Vyc0FuZE1pbnV0ZXNbMV0pO1xuICAgICAgICAgICAgbWludXRlcyA9IE51bWJlcihob3Vyc0FuZE1pbnV0ZXNbMl0pO1xuICAgICAgICB9IGVsc2UgaWYgKGhvdXJzT25seSkge1xuICAgICAgICAgICAgaG91cnMgPSBOdW1iZXIoaG91cnNPbmx5WzFdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRzbGludDplbmFibGVcblxuICAgICAgICBjb25zdCByZXN1bHREYXRlID0gdGhpcy5kYXRlQWRhcHRlci5jcmVhdGVEYXRlVGltZShcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLnZhbHVlKSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy52YWx1ZSksXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldERhdGUodGhpcy52YWx1ZSksXG4gICAgICAgICAgICBob3VycyxcbiAgICAgICAgICAgIG1pbnV0ZXMsXG4gICAgICAgICAgICBzZWNvbmRzLFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRNaWxsaXNlY29uZHModGhpcy52YWx1ZSlcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRWYWxpZERhdGVPck51bGwocmVzdWx0RGF0ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZVZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lbXB0eSB8fCB0aGlzLmxhc3RWYWx1ZVZhbGlkID8gbnVsbCA6IHsgbWNUaW1lcGlja2VyUGFyc2U6IHsgdGV4dDogdGhpcy52aWV3VmFsdWUgfSB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgbWluVmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZSkpO1xuXG4gICAgICAgIHJldHVybiAoIXRoaXMubWluIHx8ICFjb250cm9sVmFsdWUgfHwgdGhpcy5jb21wYXJlVGltZSh0aGlzLm1pbiwgY29udHJvbFZhbHVlKSA8PSAwKSA/XG4gICAgICAgICAgICBudWxsIDpcbiAgICAgICAgICAgIHsgbWNUaW1lcGlja2VyTG93ZXJUaGVuTWluOiB7IG1pbjogdGhpcy5taW4sIGFjdHVhbDogY29udHJvbFZhbHVlIH0gfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1heFZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICBjb25zdCBjb250cm9sVmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWUpKTtcblxuICAgICAgICByZXR1cm4gKCF0aGlzLm1heCB8fCAhY29udHJvbFZhbHVlIHx8IHRoaXMuY29tcGFyZVRpbWUodGhpcy5tYXgsIGNvbnRyb2xWYWx1ZSkgPj0gMCkgP1xuICAgICAgICAgICAgbnVsbCA6XG4gICAgICAgICAgICB7IG1jVGltZXBpY2tlckhpZ2hlclRoZW5NYXg6IHsgbWF4OiB0aGlzLm1heCwgYWN0dWFsOiBjb250cm9sVmFsdWUgfSB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgY29tcGFyZVRpbWUoZmlyc3Q6IEQsIHNlY29uZDogRCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0SG91cnMoZmlyc3QpIC0gdGhpcy5kYXRlQWRhcHRlci5nZXRIb3VycyhzZWNvbmQpIHx8XG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbnV0ZXMoZmlyc3QpIC0gdGhpcy5kYXRlQWRhcHRlci5nZXRNaW51dGVzKHNlY29uZCk7XG5cbiAgICAgICAgaWYgKFRpbWVGb3JtYXRzLkhIbW0gPT09IHRoaXMuZm9ybWF0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9IGVsc2UgaWYgKFRpbWVGb3JtYXRzLkhIbW1zcyA9PT0gdGhpcy5mb3JtYXQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQgfHwgdGhpcy5kYXRlQWRhcHRlci5nZXRTZWNvbmRzKGZpcnN0KSAtIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0U2Vjb25kcyhzZWNvbmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYFVua25vd24gZm9ybWF0OiAke3RoaXMuZm9ybWF0fWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRWYWxpZERhdGVPck51bGwob2JqOiBhbnkpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiAodGhpcy5kYXRlQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmIHRoaXMuZGF0ZUFkYXB0ZXIuaXNWYWxpZChvYmopKSA/IG9iaiA6IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVWaWV3KCkge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMuZ2V0VGltZVN0cmluZ0Zyb21EYXRlKHRoaXMudmFsdWUsIHRoaXMuZm9ybWF0KTtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCBmb3JtYXR0ZWRWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRDb250cm9sKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sID0gY29udHJvbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eVxuICAgIHByaXZhdGUgdmFsaWRhdG9yT25DaGFuZ2UgPSAoKSA9PiB7fTtcbn1cbiJdfQ==