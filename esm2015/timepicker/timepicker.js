/**
 * @fileoverview added by tsickle
 * Generated from: timepicker.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, forwardRef, Inject, Input, Optional, Renderer2, Self } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { DateAdapter } from '@ptsecurity/cdk/datetime';
import { ErrorStateMatcher, mixinErrorState } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { MC_INPUT_VALUE_ACCESSOR } from '@ptsecurity/mosaic/input';
import { noop, Subject } from 'rxjs';
import { ARROW_DOWN_KEYCODE, ARROW_LEFT_KEYCODE, ARROW_RIGHT_KEYCODE, ARROW_UP_KEYCODE, DEFAULT_TIME_FORMAT, HOURS_PER_DAY, HOURS_MINUTES_REGEXP, HOURS_MINUTES_SECONDS_REGEXP, HOURS_ONLY_REGEXP, MINUTES_PER_HOUR, SECONDS_PER_MINUTE, TIMEFORMAT_PLACEHOLDERS, TimeFormats, TimeParts } from './timepicker.constants';
/** @type {?} */
let uniqueComponentIdSuffix = 0;
export class McTimepickerBase {
    /**
     * @param {?} defaultErrorStateMatcher
     * @param {?} parentForm
     * @param {?} parentFormGroup
     * @param {?} ngControl
     */
    constructor(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
        this.defaultErrorStateMatcher = defaultErrorStateMatcher;
        this.parentForm = parentForm;
        this.parentFormGroup = parentFormGroup;
        this.ngControl = ngControl;
    }
}
if (false) {
    /** @type {?} */
    McTimepickerBase.prototype.defaultErrorStateMatcher;
    /** @type {?} */
    McTimepickerBase.prototype.parentForm;
    /** @type {?} */
    McTimepickerBase.prototype.parentFormGroup;
    /** @type {?} */
    McTimepickerBase.prototype.ngControl;
}
// tslint:disable-next-line naming-convention
/** @type {?} */
export const McTimepickerMixinBase = mixinErrorState(McTimepickerBase);
/**
 * @template D
 */
export class McTimepicker extends McTimepickerMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} ngControl
     * @param {?} parentForm
     * @param {?} parentFormGroup
     * @param {?} defaultErrorStateMatcher
     * @param {?} inputValueAccessor
     * @param {?} renderer
     * @param {?} dateAdapter
     */
    constructor(elementRef, ngControl, parentForm, parentFormGroup, defaultErrorStateMatcher, inputValueAccessor, renderer, dateAdapter) {
        super(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);
        this.elementRef = elementRef;
        this.ngControl = ngControl;
        this.renderer = renderer;
        this.dateAdapter = dateAdapter;
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
        this._minTime = null;
        this._maxTime = null;
        this.uid = `mc-timepicker-${uniqueComponentIdSuffix++}`;
        if (!this.dateAdapter) {
            throw Error(`McTimepicker: No provider found for DateAdapter. You must import one of the existing ` +
                `modules at your application root or provide a custom implementation or use exists ones.`);
        }
        // If no input value accessor was explicitly specified, use the element as the input value
        // accessor.
        this.inputValueAccessor = inputValueAccessor || this.elementRef.nativeElement;
        this.previousNativeValue = this.value;
        this.onChange = noop;
        // Force setter to be called in case id was not specified.
        this.id = this.id;
        this.placeholder = TIMEFORMAT_PLACEHOLDERS[DEFAULT_TIME_FORMAT];
        if (this.ngControl) {
            // Instead of NG_VALUE_ACCESSOR (https://github.com/angular/material2/issues/8158#issuecomment-344618103)
            this.ngControl.valueAccessor = this;
            // To avoid cyclic dependency https://stackoverflow.com/a/49578414
            /** @type {?} */
            const control = (/** @type {?} */ (this.ngControl.control));
            /** @type {?} */
            const myValidators = [
                (/**
                 * @return {?}
                 */
                () => this.parseValidator()),
                (/**
                 * @return {?}
                 */
                () => this.minTimeValidator()),
                (/**
                 * @return {?}
                 */
                () => this.maxTimeValidator())
            ];
            /** @type {?} */
            const validators = control.validator
                ? [control.validator, ...myValidators]
                : myValidators;
            control.setValidators(validators);
            control.updateValueAndValidity();
        }
    }
    /**
     * @return {?}
     */
    get disabled() {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
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
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    get value() {
        return this.inputValueAccessor.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        if (value !== this.value) {
            this.inputValueAccessor.value = value;
            this.applyInputChanges();
        }
    }
    /**
     * @return {?}
     */
    get timeFormat() {
        return this._timeFormat;
    }
    /**
     * @param {?} formatValue
     * @return {?}
     */
    set timeFormat(formatValue) {
        this._timeFormat = Object
            .keys(TimeFormats)
            .map((/**
         * @param {?} timeFormatKey
         * @return {?}
         */
        (timeFormatKey) => TimeFormats[timeFormatKey]))
            .indexOf(formatValue) > -1 ? formatValue : DEFAULT_TIME_FORMAT;
        this.placeholder = TIMEFORMAT_PLACEHOLDERS[this._timeFormat];
        setTimeout((/**
         * @return {?}
         */
        () => this.applyInputChanges({ doTimestringReformat: true })));
    }
    /**
     * @return {?}
     */
    get minTime() {
        return this._minTime;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set minTime(value) {
        this._minTime = value;
        ((/** @type {?} */ (this.ngControl.control))).updateValueAndValidity();
    }
    /**
     * @return {?}
     */
    get maxTime() {
        return this._maxTime;
    }
    /**
     * @param {?} maxValue
     * @return {?}
     */
    set maxTime(maxValue) {
        this._maxTime = maxValue;
        ((/** @type {?} */ (this.ngControl.control))).updateValueAndValidity();
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
    ngDoCheck() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
        // We need to dirty-check the native element's value, because there are some cases where
        // we won't be notified when it changes (e.g. the consumer isn't using forms or they're
        // updating the value using `emitEvent: false`).
        this.dirtyCheckNativeValue();
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
        this.applyInputChanges();
        this.focusChanged(false);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onPaste($event) {
        $event.preventDefault();
        /** @type {?} */
        const clipboardUserInput = $event.clipboardData.getData('text');
        if (this.getDateFromTimeString(clipboardUserInput) === undefined) {
            return;
        }
        this.elementRef.nativeElement.value = clipboardUserInput;
        this.onInput();
    }
    /**
     * @return {?}
     */
    onInput() {
        /** @type {?} */
        const initialCursorStart = this.elementRef.nativeElement.selectionStart;
        /** @type {?} */
        const initialCursorEnd = this.elementRef.nativeElement.selectionEnd;
        /** @type {?} */
        let isAutocompleteTriggered = false;
        const { hoursOnly, hoursAndMinutes, hoursAndMinutesAndSeconds } = this.getParsedTimeParts(this.elementRef.nativeElement.value);
        // tslint:disable no-magic-numbers
        if (hoursOnly &&
            hoursOnly[1] &&
            hoursOnly[1].length === 2) {
            isAutocompleteTriggered = true;
        }
        else if (hoursAndMinutes &&
            hoursAndMinutes[1].length === 1 &&
            hoursAndMinutes[2] &&
            hoursAndMinutes[2].length === 2) {
            isAutocompleteTriggered = true;
        }
        else if (hoursAndMinutesAndSeconds &&
            hoursAndMinutesAndSeconds[1].length === 2 &&
            hoursAndMinutesAndSeconds[2].length === 2 &&
            hoursAndMinutesAndSeconds[3] &&
            hoursAndMinutesAndSeconds[3].length === 2) {
            isAutocompleteTriggered = true;
        }
        // tslint:enable no-magic-numbers
        this.applyInputChanges({ doTimestringReformat: isAutocompleteTriggered });
        this.elementRef.nativeElement.selectionStart = initialCursorStart;
        this.elementRef.nativeElement.selectionEnd = initialCursorEnd;
        if (isAutocompleteTriggered && this.ngControl.errors === null) {
            this.createSelectionOfTimeComponentInInput(initialCursorStart + 1);
        }
    }
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    get empty() {
        return !this.elementRef.nativeElement.value && !this.isBadInput();
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
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== null) {
            this.saveOriginalValue(value);
            this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.getTimeStringFromDate(value, this.timeFormat));
            this.applyInputChanges();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        /** @type {?} */
        const keyCode = this.getKeyCode(event);
        if (keyCode === ARROW_UP_KEYCODE || keyCode === ARROW_DOWN_KEYCODE) {
            this.upDownTimeByArrowKeys(event);
        }
        if (keyCode === ARROW_LEFT_KEYCODE || keyCode === ARROW_RIGHT_KEYCODE) {
            this.switchSelectionBetweenTimeparts(event);
        }
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
     * @param {?} value
     * @return {?}
     */
    saveOriginalValue(value) {
        if (this.dateAdapter.isValid(value)) {
            this.originalValue = value;
        }
    }
    /**
     * Does some manual dirty checking on the native input `value` property.
     * @private
     * @return {?}
     */
    dirtyCheckNativeValue() {
        /** @type {?} */
        const newValue = this.value;
        if (this.previousNativeValue !== newValue) {
            this.previousNativeValue = newValue;
            this.stateChanges.next();
        }
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
     * @param {?=} applyParams
     * @return {?}
     */
    applyInputChanges(applyParams = {}) {
        const { changedTime, doTimestringReformat = true } = applyParams;
        /** @type {?} */
        const timeToApply = changedTime ||
            this.getDateFromTimeString(this.elementRef.nativeElement.value);
        this.currentDateTimeInput = timeToApply;
        if (doTimestringReformat && timeToApply !== undefined) {
            /** @type {?} */
            const selectionStart = this.elementRef.nativeElement.selectionStart;
            /** @type {?} */
            const selectionEnd = this.elementRef.nativeElement.selectionEnd;
            this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.getTimeStringFromDate(timeToApply, this.timeFormat));
            this.elementRef.nativeElement.selectionStart = selectionStart;
            this.elementRef.nativeElement.selectionEnd = selectionEnd;
        }
        ((/** @type {?} */ (this.ngControl.control))).updateValueAndValidity();
        /** @type {?} */
        const result = this.ngControl.errors === null && timeToApply !== undefined ? timeToApply : null;
        this.onChange(result);
        this.stateChanges.next();
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    upDownTimeByArrowKeys(event) {
        event.preventDefault();
        /** @type {?} */
        let changedTime = this.currentDateTimeInput;
        if (changedTime !== undefined) {
            /** @type {?} */
            const cursorPos = this.elementRef.nativeElement.selectionStart;
            /** @type {?} */
            const modifiedTimePart = this.getTimeEditMetrics(cursorPos)
                .modifiedTimePart;
            /** @type {?} */
            const keyCode = this.getKeyCode(event);
            if (keyCode === ARROW_UP_KEYCODE) {
                changedTime = this.incrementTime(changedTime, modifiedTimePart);
            }
            if (keyCode === ARROW_DOWN_KEYCODE) {
                changedTime = this.decrementTime(changedTime, modifiedTimePart);
            }
            this.applyInputChanges({ changedTime });
            this.createSelectionOfTimeComponentInInput(cursorPos);
        }
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    switchSelectionBetweenTimeparts(event) {
        /** @type {?} */
        const changedTime = this.currentDateTimeInput;
        /** @type {?} */
        const keyCode = this.getKeyCode(event);
        if (changedTime !== undefined) {
            /** @type {?} */
            let cursorPos = this.elementRef.nativeElement.selectionStart;
            if (keyCode === ARROW_LEFT_KEYCODE) {
                cursorPos = this.getCursorPositionOfPrevTimePartStart(cursorPos, this.elementRef.nativeElement.value);
            }
            else if (keyCode === ARROW_RIGHT_KEYCODE) {
                cursorPos = this.getCursorPositionOfNextTimePartStart(cursorPos, this.elementRef.nativeElement.value);
            }
            this.createSelectionOfTimeComponentInInput(cursorPos);
        }
    }
    /**
     * \@description Microsoft EDGE doesn't support KeyboaedEvent.code thus we need this helper
     * @private
     * @param {?} event
     * @return {?}
     */
    getKeyCode(event) {
        return event.code || event.key;
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
            this.elementRef.nativeElement.selectionStart = newEditParams.cursorStartPosition;
            this.elementRef.nativeElement.selectionEnd = newEditParams.cursorEndPosition;
        }));
    }
    /**
     * @private
     * @param {?} dateVal
     * @param {?=} whatToIncrement
     * @return {?}
     */
    incrementTime(dateVal, whatToIncrement = TimeParts.seconds) {
        let { hours, minutes, seconds } = this.getTimeDigitsFromDate(dateVal);
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
        return (/** @type {?} */ (this.getDateFromTimeDigits(hours, minutes, seconds)));
    }
    /**
     * \@description Decrement part of time
     * @private
     * @param {?} dateVal
     * @param {?=} whatToDecrement
     * @return {?}
     */
    decrementTime(dateVal, whatToDecrement = TimeParts.seconds) {
        let { hours, minutes, seconds } = this.getTimeDigitsFromDate(dateVal);
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
        return (/** @type {?} */ (this.getDateFromTimeDigits(hours, minutes, seconds)));
    }
    /**
     * @private
     * @param {?} cursorPos
     * @param {?} timeString
     * @return {?}
     */
    getCursorPositionOfPrevTimePartStart(cursorPos, timeString) {
        return cursorPos === 0 ? timeString.length : cursorPos - 1;
    }
    /**
     * @private
     * @param {?} cursorPos
     * @param {?} timeString
     * @param {?=} timeDevider
     * @return {?}
     */
    getCursorPositionOfNextTimePartStart(cursorPos, timeString, timeDevider = ':') {
        /** @type {?} */
        const nextDividerPos = timeString.indexOf(timeDevider, cursorPos);
        return nextDividerPos !== undefined ? nextDividerPos + 1 : 0;
    }
    /**
     * \@description Get params for arrow-keys (up/down) time valie edit.
     * @private
     * @param {?} cursorPosition Current cursor position in timeString
     * @return {?}
     */
    getTimeEditMetrics(cursorPosition) {
        /** @type {?} */
        const timeString = this.elementRef.nativeElement.value;
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
        return {
            modifiedTimePart,
            cursorStartPosition,
            cursorEndPosition
        };
    }
    /**
     * \@description Create time string for displaying inside input element of UI
     * @private
     * @param {?} value
     * @param {?=} timeFormat
     * @return {?}
     */
    getTimeStringFromDate(value, timeFormat = DEFAULT_TIME_FORMAT) {
        if (value === undefined || value === null) {
            return '';
        }
        return this.dateAdapter.format(value, timeFormat);
    }
    /**
     * @private
     * @param {?} timeString
     * @return {?}
     */
    getParsedTimeParts(timeString) {
        /** @type {?} */
        const momentWrappedTime = this.dateAdapter.parse(timeString, [
            'h:m a',
            'h:m:s a',
            'H:m',
            'H:m:s'
        ]);
        /** @type {?} */
        const convertedTimeString = momentWrappedTime !== null
            ? momentWrappedTime.format('H:m:s')
            : '';
        /** @type {?} */
        const hoursAndMinutesAndSeconds = convertedTimeString.match(HOURS_MINUTES_SECONDS_REGEXP);
        /** @type {?} */
        const hoursAndMinutes = convertedTimeString.match(HOURS_MINUTES_REGEXP);
        /** @type {?} */
        const hoursOnly = convertedTimeString.match(HOURS_ONLY_REGEXP);
        return {
            hoursOnly,
            hoursAndMinutes,
            hoursAndMinutesAndSeconds
        };
    }
    /**
     * \@description Create Date object from separate parts of time
     * @private
     * @param {?} hours
     * @param {?} minutes
     * @param {?=} seconds
     * @return {?}
     */
    getDateFromTimeDigits(hours, minutes, seconds = 0) {
        return this.getDateFromTimeString(`${hours}:${minutes}:${seconds}`);
    }
    /**
     * @private
     * @param {?} timeString
     * @return {?}
     */
    getDateFromTimeString(timeString) {
        if (timeString === undefined) {
            return;
        }
        const { hoursOnly, hoursAndMinutes, hoursAndMinutesAndSeconds } = this.getParsedTimeParts(timeString);
        if (timeString.trim().length === 0 ||
            hoursOnly === null && hoursAndMinutes === null && hoursAndMinutesAndSeconds === null) {
            return;
        }
        // tslint:disable no-magic-numbers
        /** @type {?} */
        let hours = 0;
        /** @type {?} */
        let minutes = 0;
        /** @type {?} */
        let seconds = 0;
        if (hoursOnly) {
            hours = Number(hoursOnly[1]);
        }
        else if (hoursAndMinutes) {
            hours = Number(hoursAndMinutes[1]);
            minutes = Number(hoursAndMinutes[2]);
        }
        else if (hoursAndMinutesAndSeconds) {
            hours = Number(hoursAndMinutesAndSeconds[1]);
            minutes = Number(hoursAndMinutesAndSeconds[2]);
            seconds = Number(hoursAndMinutesAndSeconds[3]);
        }
        /** @type {?} */
        const resultDate = this.dateAdapter.createDateTime(this.dateAdapter.getYear(this.originalValue), this.dateAdapter.getMonth(this.originalValue), this.dateAdapter.getDate(this.originalValue), hours, minutes, seconds, 0);
        return this.dateAdapter.isValid(resultDate) ? resultDate : undefined;
    }
    /**
     * @private
     * @param {?} dateVal
     * @return {?}
     */
    getTimeDigitsFromDate(dateVal) {
        return {
            hours: this.dateAdapter.getHours(dateVal),
            minutes: this.dateAdapter.getMinutes(dateVal),
            seconds: this.dateAdapter.getSeconds(dateVal)
        };
    }
    /**
     * @private
     * @return {?}
     */
    parseValidator() {
        return this.currentDateTimeInput === undefined ?
            { mcTimepickerParse: { text: this.elementRef.nativeElement.value } } :
            null;
    }
    /**
     * @private
     * @return {?}
     */
    minTimeValidator() {
        if (this.minTime &&
            this.currentDateTimeInput !== undefined &&
            this.isTimeLowerThenMin(this.currentDateTimeInput)) {
            return { mcTimepickerLowerThenMintime: { text: this.elementRef.nativeElement.value } };
        }
        return null;
    }
    /**
     * @private
     * @return {?}
     */
    maxTimeValidator() {
        if (this.maxTime &&
            this.currentDateTimeInput !== undefined &&
            this.isTimeGreaterThenMax(this.currentDateTimeInput)) {
            return { mcTimepickerHigherThenMaxtime: { text: this.elementRef.nativeElement.value } };
        }
        return null;
    }
    /**
     * @private
     * @param {?} timeToCompare
     * @return {?}
     */
    isTimeLowerThenMin(timeToCompare) {
        if (timeToCompare === undefined || timeToCompare === null || this.minTime === null) {
            return false;
        }
        return this.dateAdapter.compareDateTime(timeToCompare, this.getDateFromTimeString(this.minTime)) < 0;
    }
    /**
     * @private
     * @param {?} timeToCompare
     * @return {?}
     */
    isTimeGreaterThenMax(timeToCompare) {
        if (timeToCompare === undefined || timeToCompare === null || this.maxTime === null) {
            return false;
        }
        return this.dateAdapter.compareDateTime(timeToCompare, this.getDateFromTimeString(this.maxTime)) >= 0;
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
                    '[disabled]': 'disabled',
                    '[required]': 'required',
                    '[attr.time-format]': 'timeFormat',
                    '[attr.min-time]': 'minTime',
                    '[attr.max-time]': 'maxTime',
                    '[attr.value]': 'value',
                    '[attr.aria-invalid]': 'errorState',
                    '(blur)': 'onBlur()',
                    '(focus)': 'focusChanged(true)',
                    '(input)': 'onInput()',
                    '(paste)': 'onPaste($event)',
                    '(keydown)': 'onKeyDown($event)'
                },
                providers: [
                    {
                        provide: McFormFieldControl,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => McTimepicker))
                    }
                ]
            },] }
];
/** @nocollapse */
McTimepicker.ctorParameters = () => [
    { type: ElementRef },
    { type: NgControl, decorators: [{ type: Optional }, { type: Self }] },
    { type: NgForm, decorators: [{ type: Optional }] },
    { type: FormGroupDirective, decorators: [{ type: Optional }] },
    { type: ErrorStateMatcher },
    { type: undefined, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [MC_INPUT_VALUE_ACCESSOR,] }] },
    { type: Renderer2 },
    { type: DateAdapter, decorators: [{ type: Optional }] }
];
McTimepicker.propDecorators = {
    errorStateMatcher: [{ type: Input }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    id: [{ type: Input }],
    required: [{ type: Input }],
    value: [{ type: Input }],
    timeFormat: [{ type: Input, args: ['time-format',] }],
    minTime: [{ type: Input, args: ['min-time',] }],
    maxTime: [{ type: Input, args: ['max-time',] }]
};
if (false) {
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @type {?}
     */
    McTimepicker.prototype.stateChanges;
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
     * An object used to control when error messages are shown.
     * @type {?}
     */
    McTimepicker.prototype.errorStateMatcher;
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
    McTimepicker.prototype._timeFormat;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype._minTime;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype._maxTime;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype.uid;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype.inputValueAccessor;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype.originalValue;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype.previousNativeValue;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype.currentDateTimeInput;
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
    McTimepicker.prototype.elementRef;
    /** @type {?} */
    McTimepicker.prototype.ngControl;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    McTimepicker.prototype.dateAdapter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy90aW1lcGlja2VyLyIsInNvdXJjZXMiOlsidGltZXBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDSCxTQUFTLEVBRVQsVUFBVSxFQUNWLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUVMLFFBQVEsRUFDUixTQUFTLEVBQ1QsSUFBSSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHSCxrQkFBa0IsRUFDbEIsU0FBUyxFQUNULE1BQU0sRUFFVCxNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBR0gsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDbEIsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRSxPQUFPLEVBQ0gsSUFBSSxFQUNKLE9BQU8sRUFDVixNQUFNLE1BQU0sQ0FBQztBQUVkLE9BQU8sRUFDSCxrQkFBa0IsRUFDbEIsa0JBQWtCLEVBQ2xCLG1CQUFtQixFQUNuQixnQkFBZ0IsRUFDaEIsbUJBQW1CLEVBQ25CLGFBQWEsRUFDYixvQkFBb0IsRUFDcEIsNEJBQTRCLEVBQzVCLGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsa0JBQWtCLEVBQ2xCLHVCQUF1QixFQUN2QixXQUFXLEVBQ1gsU0FBUyxFQUNaLE1BQU0sd0JBQXdCLENBQUM7O0lBRzVCLHVCQUF1QixHQUFXLENBQUM7QUFFdkMsTUFBTSxPQUFPLGdCQUFnQjs7Ozs7OztJQUN6QixZQUNXLHdCQUEyQyxFQUMzQyxVQUFrQixFQUNsQixl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R3RDLHlDQUE4Qzs7Ozs7O0lBTTlDLG1DQUE2Qjs7Ozs7SUFxQjdCLGlDQUEyQjs7Ozs7SUFXM0IsMkJBQW9COzs7OztJQWVwQixpQ0FBMkI7Ozs7O0lBa0MzQixtQ0FBaUM7Ozs7O0lBWWpDLGdDQUF1Qzs7Ozs7SUFZdkMsZ0NBQXVDOzs7OztJQUV2QywyQkFBb0U7Ozs7O0lBQ3BFLDBDQUFvRDs7Ozs7SUFFcEQscUNBQTJCOzs7OztJQUMzQiwyQ0FBaUM7Ozs7O0lBQ2pDLDRDQUE0Qzs7Ozs7SUFFNUMsZ0NBQXVDOzs7OztJQUN2QyxpQ0FBOEI7Ozs7O0lBRzFCLGtDQUF1Qzs7SUFDdkMsaUNBQStDOzs7OztJQUsvQyxnQ0FBb0M7Ozs7O0lBQ3BDLG1DQUFpRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIERpcmVjdGl2ZSxcbiAgICBEb0NoZWNrLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9wdGlvbmFsLFxuICAgIFJlbmRlcmVyMixcbiAgICBTZWxmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgICBGb3JtQ29udHJvbCxcbiAgICBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgTmdDb250cm9sLFxuICAgIE5nRm9ybSxcbiAgICBWYWxpZGF0aW9uRXJyb3JzXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2RhdGV0aW1lJztcbmltcG9ydCB7XG4gICAgQ2FuVXBkYXRlRXJyb3JTdGF0ZSxcbiAgICBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvcixcbiAgICBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICBtaXhpbkVycm9yU3RhdGVcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNGb3JtRmllbGRDb250cm9sIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgTUNfSU5QVVRfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvaW5wdXQnO1xuaW1wb3J0IHtcbiAgICBub29wLFxuICAgIFN1YmplY3Rcbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7XG4gICAgQVJST1dfRE9XTl9LRVlDT0RFLFxuICAgIEFSUk9XX0xFRlRfS0VZQ09ERSxcbiAgICBBUlJPV19SSUdIVF9LRVlDT0RFLFxuICAgIEFSUk9XX1VQX0tFWUNPREUsXG4gICAgREVGQVVMVF9USU1FX0ZPUk1BVCxcbiAgICBIT1VSU19QRVJfREFZLFxuICAgIEhPVVJTX01JTlVURVNfUkVHRVhQLFxuICAgIEhPVVJTX01JTlVURVNfU0VDT05EU19SRUdFWFAsXG4gICAgSE9VUlNfT05MWV9SRUdFWFAsXG4gICAgTUlOVVRFU19QRVJfSE9VUixcbiAgICBTRUNPTkRTX1BFUl9NSU5VVEUsXG4gICAgVElNRUZPUk1BVF9QTEFDRUhPTERFUlMsXG4gICAgVGltZUZvcm1hdHMsXG4gICAgVGltZVBhcnRzXG59IGZyb20gJy4vdGltZXBpY2tlci5jb25zdGFudHMnO1xuXG5cbmxldCB1bmlxdWVDb21wb25lbnRJZFN1ZmZpeDogbnVtYmVyID0gMDtcblxuZXhwb3J0IGNsYXNzIE1jVGltZXBpY2tlckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICAgICAgcHVibGljIHBhcmVudEZvcm06IE5nRm9ybSxcbiAgICAgICAgcHVibGljIHBhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgICAgICBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2wpIHsgfVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1RpbWVwaWNrZXJNaXhpbkJhc2U6XG4gICAgQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IgJiB0eXBlb2YgTWNUaW1lcGlja2VyQmFzZSA9IG1peGluRXJyb3JTdGF0ZShNY1RpbWVwaWNrZXJCYXNlKTtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdpbnB1dFttY1RpbWVwaWNrZXJdJyxcbiAgICBleHBvcnRBczogJ21jVGltZXBpY2tlcklucHV0JyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdGltZXBpY2tlciBtYy1pbnB1dCcsXG4gICAgICAgIC8vIE5hdGl2ZSBpbnB1dCBwcm9wZXJ0aWVzIHRoYXQgYXJlIG92ZXJ3cml0dGVuIGJ5IEFuZ3VsYXIgaW5wdXRzIG5lZWQgdG8gYmUgc3luY2VkIHdpdGhcbiAgICAgICAgLy8gdGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50LiBPdGhlcndpc2UgcHJvcGVydHkgYmluZGluZ3MgZm9yIHRob3NlIGRvbid0IHdvcmsuXG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgICAgICAnW2F0dHIucGxhY2Vob2xkZXJdJzogJ3BsYWNlaG9sZGVyJyxcbiAgICAgICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICAgICAnW3JlcXVpcmVkXSc6ICdyZXF1aXJlZCcsXG4gICAgICAgICdbYXR0ci50aW1lLWZvcm1hdF0nOiAndGltZUZvcm1hdCcsXG4gICAgICAgICdbYXR0ci5taW4tdGltZV0nOiAnbWluVGltZScsXG4gICAgICAgICdbYXR0ci5tYXgtdGltZV0nOiAnbWF4VGltZScsXG4gICAgICAgICdbYXR0ci52YWx1ZV0nOiAndmFsdWUnLFxuICAgICAgICAnW2F0dHIuYXJpYS1pbnZhbGlkXSc6ICdlcnJvclN0YXRlJyxcblxuICAgICAgICAnKGJsdXIpJzogJ29uQmx1cigpJyxcbiAgICAgICAgJyhmb2N1cyknOiAnZm9jdXNDaGFuZ2VkKHRydWUpJyxcblxuICAgICAgICAnKGlucHV0KSc6ICdvbklucHV0KCknLFxuICAgICAgICAnKHBhc3RlKSc6ICdvblBhc3RlKCRldmVudCknLFxuXG4gICAgICAgICcoa2V5ZG93biknOiAnb25LZXlEb3duKCRldmVudCknXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTWNGb3JtRmllbGRDb250cm9sLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWNUaW1lcGlja2VyKVxuICAgICAgICB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNY1RpbWVwaWNrZXI8RD4gZXh0ZW5kcyBNY1RpbWVwaWNrZXJNaXhpbkJhc2VcbiAgICBpbXBsZW1lbnRzIE1jRm9ybUZpZWxkQ29udHJvbDxhbnk+LCBPbkRlc3Ryb3ksIERvQ2hlY2ssIENhblVwZGF0ZUVycm9yU3RhdGUsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICByZWFkb25seSBzdGF0ZUNoYW5nZXM6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBjb250cm9sVHlwZTogc3RyaW5nID0gJ21jLXRpbWVwaWNrZXInO1xuXG4gICAgLyoqIEFuIG9iamVjdCB1c2VkIHRvIGNvbnRyb2wgd2hlbiBlcnJvciBtZXNzYWdlcyBhcmUgc2hvd24uICovXG4gICAgQElucHV0KCkgZXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMubmdDb250cm9sICYmIHRoaXMubmdDb250cm9sLmRpc2FibGVkICE9PSBudWxsKSB7IHJldHVybiB0aGlzLm5nQ29udHJvbC5kaXNhYmxlZDsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIC8vIEJyb3dzZXJzIG1heSBub3QgZmlyZSB0aGUgYmx1ciBldmVudCBpZiB0aGUgaW5wdXQgaXMgZGlzYWJsZWQgdG9vIHF1aWNrbHkuXG4gICAgICAgIC8vIFJlc2V0IGZyb20gaGVyZSB0byBlbnN1cmUgdGhhdCB0aGUgZWxlbWVudCBkb2Vzbid0IGJlY29tZSBzdHVjay5cbiAgICAgICAgaWYgKHRoaXMuZm9jdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBpZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfVxuXG4gICAgc2V0IGlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faWQgPSB2YWx1ZSB8fCB0aGlzLnVpZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pZDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7XG4gICAgfVxuXG4gICAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXF1aXJlZDogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dFZhbHVlQWNjZXNzb3IudmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0VmFsdWVBY2Nlc3Nvci52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5hcHBseUlucHV0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCd0aW1lLWZvcm1hdCcpXG4gICAgZ2V0IHRpbWVGb3JtYXQoKTogVGltZUZvcm1hdHMge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGltZUZvcm1hdDtcbiAgICB9XG5cbiAgICBzZXQgdGltZUZvcm1hdChmb3JtYXRWYWx1ZTogVGltZUZvcm1hdHMpIHtcbiAgICAgICAgdGhpcy5fdGltZUZvcm1hdCA9IE9iamVjdFxuICAgICAgICAgICAgLmtleXMoVGltZUZvcm1hdHMpXG4gICAgICAgICAgICAubWFwKCh0aW1lRm9ybWF0S2V5KSA9PiBUaW1lRm9ybWF0c1t0aW1lRm9ybWF0S2V5XSlcbiAgICAgICAgICAgIC5pbmRleE9mKGZvcm1hdFZhbHVlKSA+IC0xID8gZm9ybWF0VmFsdWUgOiBERUZBVUxUX1RJTUVfRk9STUFUO1xuXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBUSU1FRk9STUFUX1BMQUNFSE9MREVSU1t0aGlzLl90aW1lRm9ybWF0XTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYXBwbHlJbnB1dENoYW5nZXMoeyBkb1RpbWVzdHJpbmdSZWZvcm1hdDogdHJ1ZSB9KSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdGltZUZvcm1hdDogVGltZUZvcm1hdHM7XG5cbiAgICBASW5wdXQoJ21pbi10aW1lJylcbiAgICBnZXQgbWluVGltZSgpOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pblRpbWU7XG4gICAgfVxuXG4gICAgc2V0IG1pblRpbWUodmFsdWU6IHN0cmluZyB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbWluVGltZSA9IHZhbHVlO1xuICAgICAgICAodGhpcy5uZ0NvbnRyb2wuY29udHJvbCBhcyBGb3JtQ29udHJvbCkudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21pblRpbWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgQElucHV0KCdtYXgtdGltZScpXG4gICAgZ2V0IG1heFRpbWUoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhUaW1lO1xuICAgIH1cblxuICAgIHNldCBtYXhUaW1lKG1heFZhbHVlOiBzdHJpbmcgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX21heFRpbWUgPSBtYXhWYWx1ZTtcbiAgICAgICAgKHRoaXMubmdDb250cm9sLmNvbnRyb2wgYXMgRm9ybUNvbnRyb2wpLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tYXhUaW1lOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgdWlkID0gYG1jLXRpbWVwaWNrZXItJHt1bmlxdWVDb21wb25lbnRJZFN1ZmZpeCsrfWA7XG4gICAgcHJpdmF0ZSByZWFkb25seSBpbnB1dFZhbHVlQWNjZXNzb3I6IHsgdmFsdWU6IGFueSB9O1xuXG4gICAgcHJpdmF0ZSBvcmlnaW5hbFZhbHVlOiBhbnk7XG4gICAgcHJpdmF0ZSBwcmV2aW91c05hdGl2ZVZhbHVlOiBhbnk7XG4gICAgcHJpdmF0ZSBjdXJyZW50RGF0ZVRpbWVJbnB1dDogRCB8IHVuZGVmaW5lZDtcblxuICAgIHByaXZhdGUgb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkO1xuICAgIHByaXZhdGUgb25Ub3VjaGVkOiAoKSA9PiB2b2lkO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgICAgIEBPcHRpb25hbCgpIHBhcmVudEZvcm06IE5nRm9ybSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgICAgIGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgQEluamVjdChNQ19JTlBVVF9WQUxVRV9BQ0NFU1NPUikgaW5wdXRWYWx1ZUFjY2Vzc29yOiBhbnksXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8YW55PlxuICAgICkge1xuICAgICAgICBzdXBlcihkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXIsIHBhcmVudEZvcm0sIHBhcmVudEZvcm1Hcm91cCwgbmdDb250cm9sKTtcblxuICAgICAgICBpZiAoIXRoaXMuZGF0ZUFkYXB0ZXIpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBNY1RpbWVwaWNrZXI6IE5vIHByb3ZpZGVyIGZvdW5kIGZvciBEYXRlQWRhcHRlci4gWW91IG11c3QgaW1wb3J0IG9uZSBvZiB0aGUgZXhpc3RpbmcgYCArXG4gICAgICAgICAgICAgICAgYG1vZHVsZXMgYXQgeW91ciBhcHBsaWNhdGlvbiByb290IG9yIHByb3ZpZGUgYSBjdXN0b20gaW1wbGVtZW50YXRpb24gb3IgdXNlIGV4aXN0cyBvbmVzLmApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgbm8gaW5wdXQgdmFsdWUgYWNjZXNzb3Igd2FzIGV4cGxpY2l0bHkgc3BlY2lmaWVkLCB1c2UgdGhlIGVsZW1lbnQgYXMgdGhlIGlucHV0IHZhbHVlXG4gICAgICAgIC8vIGFjY2Vzc29yLlxuICAgICAgICB0aGlzLmlucHV0VmFsdWVBY2Nlc3NvciA9IGlucHV0VmFsdWVBY2Nlc3NvciB8fCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgICB0aGlzLnByZXZpb3VzTmF0aXZlVmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gbm9vcDtcblxuICAgICAgICAvLyBGb3JjZSBzZXR0ZXIgdG8gYmUgY2FsbGVkIGluIGNhc2UgaWQgd2FzIG5vdCBzcGVjaWZpZWQuXG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLmlkO1xuXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBUSU1FRk9STUFUX1BMQUNFSE9MREVSU1tERUZBVUxUX1RJTUVfRk9STUFUXTtcblxuICAgICAgICBpZiAodGhpcy5uZ0NvbnRyb2wpIHtcbiAgICAgICAgICAgIC8vIEluc3RlYWQgb2YgTkdfVkFMVUVfQUNDRVNTT1IgKGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9pc3N1ZXMvODE1OCNpc3N1ZWNvbW1lbnQtMzQ0NjE4MTAzKVxuICAgICAgICAgICAgdGhpcy5uZ0NvbnRyb2wudmFsdWVBY2Nlc3NvciA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8vIFRvIGF2b2lkIGN5Y2xpYyBkZXBlbmRlbmN5IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80OTU3ODQxNFxuICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMubmdDb250cm9sLmNvbnRyb2wgYXMgRm9ybUNvbnRyb2w7XG4gICAgICAgICAgICBjb25zdCBteVZhbGlkYXRvcnMgPSBbXG4gICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5wYXJzZVZhbGlkYXRvcigpLFxuICAgICAgICAgICAgICAgICgpID0+IHRoaXMubWluVGltZVZhbGlkYXRvcigpLFxuICAgICAgICAgICAgICAgICgpID0+IHRoaXMubWF4VGltZVZhbGlkYXRvcigpXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgY29uc3QgdmFsaWRhdG9ycyA9IGNvbnRyb2wudmFsaWRhdG9yXG4gICAgICAgICAgICAgICAgPyBbY29udHJvbC52YWxpZGF0b3IsIC4uLm15VmFsaWRhdG9yc11cbiAgICAgICAgICAgICAgICA6IG15VmFsaWRhdG9ycztcblxuICAgICAgICAgICAgY29udHJvbC5zZXRWYWxpZGF0b3JzKHZhbGlkYXRvcnMpO1xuICAgICAgICAgICAgY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm5nQ29udHJvbCkge1xuICAgICAgICAgICAgLy8gV2UgbmVlZCB0byByZS1ldmFsdWF0ZSB0aGlzIG9uIGV2ZXJ5IGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUsIGJlY2F1c2UgdGhlcmUgYXJlIHNvbWVcbiAgICAgICAgICAgIC8vIGVycm9yIHRyaWdnZXJzIHRoYXQgd2UgY2FuJ3Qgc3Vic2NyaWJlIHRvIChlLmcuIHBhcmVudCBmb3JtIHN1Ym1pc3Npb25zKS4gVGhpcyBtZWFuc1xuICAgICAgICAgICAgLy8gdGhhdCB3aGF0ZXZlciBsb2dpYyBpcyBpbiBoZXJlIGhhcyB0byBiZSBzdXBlciBsZWFuIG9yIHdlIHJpc2sgZGVzdHJveWluZyB0aGUgcGVyZm9ybWFuY2UuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUVycm9yU3RhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gZGlydHktY2hlY2sgdGhlIG5hdGl2ZSBlbGVtZW50J3MgdmFsdWUsIGJlY2F1c2UgdGhlcmUgYXJlIHNvbWUgY2FzZXMgd2hlcmVcbiAgICAgICAgLy8gd2Ugd29uJ3QgYmUgbm90aWZpZWQgd2hlbiBpdCBjaGFuZ2VzIChlLmcuIHRoZSBjb25zdW1lciBpc24ndCB1c2luZyBmb3JtcyBvciB0aGV5J3JlXG4gICAgICAgIC8vIHVwZGF0aW5nIHRoZSB2YWx1ZSB1c2luZyBgZW1pdEV2ZW50OiBmYWxzZWApLlxuICAgICAgICB0aGlzLmRpcnR5Q2hlY2tOYXRpdmVWYWx1ZSgpO1xuICAgIH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIGZvY3VzQ2hhbmdlZChpc0ZvY3VzZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzRm9jdXNlZCAhPT0gdGhpcy5mb2N1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSBpc0ZvY3VzZWQ7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25CbHVyKCkge1xuICAgICAgICB0aGlzLmFwcGx5SW5wdXRDaGFuZ2VzKCk7XG4gICAgICAgIHRoaXMuZm9jdXNDaGFuZ2VkKGZhbHNlKTtcbiAgICB9XG5cbiAgICBvblBhc3RlKCRldmVudCkge1xuICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgY2xpcGJvYXJkVXNlcklucHV0OiBzdHJpbmcgPSAkZXZlbnQuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0Jyk7XG5cbiAgICAgICAgaWYgKHRoaXMuZ2V0RGF0ZUZyb21UaW1lU3RyaW5nKGNsaXBib2FyZFVzZXJJbnB1dCkgPT09IHVuZGVmaW5lZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSA9IGNsaXBib2FyZFVzZXJJbnB1dDtcbiAgICAgICAgdGhpcy5vbklucHV0KCk7XG4gICAgfVxuXG4gICAgb25JbnB1dCgpIHtcbiAgICAgICAgY29uc3QgaW5pdGlhbEN1cnNvclN0YXJ0OiBudW1iZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgY29uc3QgaW5pdGlhbEN1cnNvckVuZDogbnVtYmVyID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kO1xuICAgICAgICBsZXQgaXNBdXRvY29tcGxldGVUcmlnZ2VyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBob3Vyc09ubHksXG4gICAgICAgICAgICBob3Vyc0FuZE1pbnV0ZXMsXG4gICAgICAgICAgICBob3Vyc0FuZE1pbnV0ZXNBbmRTZWNvbmRzXG4gICAgICAgIH0gPSB0aGlzLmdldFBhcnNlZFRpbWVQYXJ0cyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSk7XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUgbm8tbWFnaWMtbnVtYmVyc1xuICAgICAgICBpZiAoaG91cnNPbmx5ICYmXG4gICAgICAgICAgICBob3Vyc09ubHlbMV0gJiZcbiAgICAgICAgICAgIGhvdXJzT25seVsxXS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIGlzQXV0b2NvbXBsZXRlVHJpZ2dlcmVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChob3Vyc0FuZE1pbnV0ZXMgJiZcbiAgICAgICAgICAgIGhvdXJzQW5kTWludXRlc1sxXS5sZW5ndGggPT09IDEgJiZcbiAgICAgICAgICAgIGhvdXJzQW5kTWludXRlc1syXSAmJlxuICAgICAgICAgICAgaG91cnNBbmRNaW51dGVzWzJdLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgaXNBdXRvY29tcGxldGVUcmlnZ2VyZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGhvdXJzQW5kTWludXRlc0FuZFNlY29uZHMgJiZcbiAgICAgICAgICAgIGhvdXJzQW5kTWludXRlc0FuZFNlY29uZHNbMV0ubGVuZ3RoID09PSAyICYmXG4gICAgICAgICAgICBob3Vyc0FuZE1pbnV0ZXNBbmRTZWNvbmRzWzJdLmxlbmd0aCA9PT0gMiAmJlxuICAgICAgICAgICAgaG91cnNBbmRNaW51dGVzQW5kU2Vjb25kc1szXSAmJlxuICAgICAgICAgICAgaG91cnNBbmRNaW51dGVzQW5kU2Vjb25kc1szXS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIGlzQXV0b2NvbXBsZXRlVHJpZ2dlcmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0c2xpbnQ6ZW5hYmxlIG5vLW1hZ2ljLW51bWJlcnNcblxuICAgICAgICB0aGlzLmFwcGx5SW5wdXRDaGFuZ2VzKHsgZG9UaW1lc3RyaW5nUmVmb3JtYXQ6IGlzQXV0b2NvbXBsZXRlVHJpZ2dlcmVkIH0pO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gaW5pdGlhbEN1cnNvclN0YXJ0O1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQgPSBpbml0aWFsQ3Vyc29yRW5kO1xuXG4gICAgICAgIGlmIChpc0F1dG9jb21wbGV0ZVRyaWdnZXJlZCAmJiB0aGlzLm5nQ29udHJvbC5lcnJvcnMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU2VsZWN0aW9uT2ZUaW1lQ29tcG9uZW50SW5JbnB1dChpbml0aWFsQ3Vyc29yU3RhcnQgKyAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBnZXQgZW1wdHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgJiYgIXRoaXMuaXNCYWRJbnB1dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBvbkNvbnRhaW5lckNsaWNrKCkge1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogRCB8IG51bGwpOiB2b2lkIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnNhdmVPcmlnaW5hbFZhbHVlKHZhbHVlKTtcblxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICAgICAndmFsdWUnLFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGltZVN0cmluZ0Zyb21EYXRlKHZhbHVlLCB0aGlzLnRpbWVGb3JtYXQpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0aGlzLmFwcGx5SW5wdXRDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qga2V5Q29kZTogc3RyaW5nID0gdGhpcy5nZXRLZXlDb2RlKGV2ZW50KTtcblxuICAgICAgICBpZiAoa2V5Q29kZSA9PT0gQVJST1dfVVBfS0VZQ09ERSB8fCBrZXlDb2RlID09PSBBUlJPV19ET1dOX0tFWUNPREUpIHtcbiAgICAgICAgICAgIHRoaXMudXBEb3duVGltZUJ5QXJyb3dLZXlzKGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXlDb2RlID09PSBBUlJPV19MRUZUX0tFWUNPREUgfHwga2V5Q29kZSA9PT0gQVJST1dfUklHSFRfS0VZQ09ERSkge1xuICAgICAgICAgICAgdGhpcy5zd2l0Y2hTZWxlY3Rpb25CZXR3ZWVuVGltZXBhcnRzKGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBEKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNhdmVPcmlnaW5hbFZhbHVlKHZhbHVlOiBEKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRhdGVBZGFwdGVyLmlzVmFsaWQodmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLm9yaWdpbmFsVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBEb2VzIHNvbWUgbWFudWFsIGRpcnR5IGNoZWNraW5nIG9uIHRoZSBuYXRpdmUgaW5wdXQgYHZhbHVlYCBwcm9wZXJ0eS4gKi9cbiAgICBwcml2YXRlIGRpcnR5Q2hlY2tOYXRpdmVWYWx1ZSgpIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLnByZXZpb3VzTmF0aXZlVmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzTmF0aXZlVmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgaXMgaW52YWxpZCBiYXNlZCBvbiB0aGUgbmF0aXZlIHZhbGlkYXRpb24uICovXG4gICAgcHJpdmF0ZSBpc0JhZElucHV0KCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCB2YWxpZGl0eSA9ICg8SFRNTElucHV0RWxlbWVudD4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLnZhbGlkaXR5O1xuXG4gICAgICAgIHJldHVybiB2YWxpZGl0eSAmJiB2YWxpZGl0eS5iYWRJbnB1dDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5SW5wdXRDaGFuZ2VzKGFwcGx5UGFyYW1zOiB7IGNoYW5nZWRUaW1lPzogRDsgZG9UaW1lc3RyaW5nUmVmb3JtYXQ/OiBib29sZWFuIH0gPSB7fSk6IHZvaWQge1xuICAgICAgICBjb25zdCB7IGNoYW5nZWRUaW1lLCBkb1RpbWVzdHJpbmdSZWZvcm1hdCA9IHRydWUgfSA9IGFwcGx5UGFyYW1zO1xuICAgICAgICBjb25zdCB0aW1lVG9BcHBseTogRCB8IHVuZGVmaW5lZCA9IGNoYW5nZWRUaW1lIHx8XG4gICAgICAgICAgICB0aGlzLmdldERhdGVGcm9tVGltZVN0cmluZyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSk7XG4gICAgICAgIHRoaXMuY3VycmVudERhdGVUaW1lSW5wdXQgPSB0aW1lVG9BcHBseTtcblxuICAgICAgICBpZiAoZG9UaW1lc3RyaW5nUmVmb3JtYXQgJiYgdGltZVRvQXBwbHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uU3RhcnQ6IG51bWJlciA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uRW5kOiBudW1iZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQ7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgICAgICd2YWx1ZScsXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRUaW1lU3RyaW5nRnJvbURhdGUodGltZVRvQXBwbHksIHRoaXMudGltZUZvcm1hdClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kO1xuICAgICAgICB9XG5cbiAgICAgICAgKDxGb3JtQ29udHJvbD4gdGhpcy5uZ0NvbnRyb2wuY29udHJvbCkudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLm5nQ29udHJvbC5lcnJvcnMgPT09IG51bGwgJiYgdGltZVRvQXBwbHkgIT09IHVuZGVmaW5lZCA/IHRpbWVUb0FwcGx5IDogbnVsbDtcbiAgICAgICAgdGhpcy5vbkNoYW5nZShyZXN1bHQpO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cERvd25UaW1lQnlBcnJvd0tleXMoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgY2hhbmdlZFRpbWU6IEQgfCB1bmRlZmluZWQgPSB0aGlzLmN1cnJlbnREYXRlVGltZUlucHV0O1xuICAgICAgICBpZiAoY2hhbmdlZFRpbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgY3Vyc29yUG9zID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7XG5cbiAgICAgICAgICAgIGNvbnN0IG1vZGlmaWVkVGltZVBhcnQgPSB0aGlzLmdldFRpbWVFZGl0TWV0cmljcyhjdXJzb3JQb3MpXG4gICAgICAgICAgICAgICAgLm1vZGlmaWVkVGltZVBhcnQ7XG4gICAgICAgICAgICBjb25zdCBrZXlDb2RlOiBzdHJpbmcgPSB0aGlzLmdldEtleUNvZGUoZXZlbnQpO1xuICAgICAgICAgICAgaWYgKGtleUNvZGUgPT09IEFSUk9XX1VQX0tFWUNPREUpIHsgY2hhbmdlZFRpbWUgPSB0aGlzLmluY3JlbWVudFRpbWUoY2hhbmdlZFRpbWUsIG1vZGlmaWVkVGltZVBhcnQpOyB9XG4gICAgICAgICAgICBpZiAoa2V5Q29kZSA9PT0gQVJST1dfRE9XTl9LRVlDT0RFKSB7IGNoYW5nZWRUaW1lID0gdGhpcy5kZWNyZW1lbnRUaW1lKGNoYW5nZWRUaW1lLCBtb2RpZmllZFRpbWVQYXJ0KTsgfVxuICAgICAgICAgICAgdGhpcy5hcHBseUlucHV0Q2hhbmdlcyh7IGNoYW5nZWRUaW1lIH0pO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVTZWxlY3Rpb25PZlRpbWVDb21wb25lbnRJbklucHV0KGN1cnNvclBvcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHN3aXRjaFNlbGVjdGlvbkJldHdlZW5UaW1lcGFydHMoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY2hhbmdlZFRpbWU6IEQgfCB1bmRlZmluZWQgPSB0aGlzLmN1cnJlbnREYXRlVGltZUlucHV0O1xuICAgICAgICBjb25zdCBrZXlDb2RlOiBzdHJpbmcgPSB0aGlzLmdldEtleUNvZGUoZXZlbnQpO1xuXG4gICAgICAgIGlmIChjaGFuZ2VkVGltZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsZXQgY3Vyc29yUG9zOiBudW1iZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICAgIGlmIChrZXlDb2RlID09PSBBUlJPV19MRUZUX0tFWUNPREUpIHtcbiAgICAgICAgICAgICAgICBjdXJzb3JQb3MgPSB0aGlzLmdldEN1cnNvclBvc2l0aW9uT2ZQcmV2VGltZVBhcnRTdGFydChjdXJzb3JQb3MsIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gQVJST1dfUklHSFRfS0VZQ09ERSkge1xuICAgICAgICAgICAgICAgIGN1cnNvclBvcyA9IHRoaXMuZ2V0Q3Vyc29yUG9zaXRpb25PZk5leHRUaW1lUGFydFN0YXJ0KGN1cnNvclBvcywgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jcmVhdGVTZWxlY3Rpb25PZlRpbWVDb21wb25lbnRJbklucHV0KGN1cnNvclBvcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gTWljcm9zb2Z0IEVER0UgZG9lc24ndCBzdXBwb3J0IEtleWJvYWVkRXZlbnQuY29kZSB0aHVzIHdlIG5lZWQgdGhpcyBoZWxwZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEtleUNvZGUoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gZXZlbnQuY29kZSB8fCBldmVudC5rZXk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVTZWxlY3Rpb25PZlRpbWVDb21wb25lbnRJbklucHV0KGN1cnNvclBvczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3RWRpdFBhcmFtcyA9IHRoaXMuZ2V0VGltZUVkaXRNZXRyaWNzKGN1cnNvclBvcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IG5ld0VkaXRQYXJhbXMuY3Vyc29yU3RhcnRQb3NpdGlvbjtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZCA9IG5ld0VkaXRQYXJhbXMuY3Vyc29yRW5kUG9zaXRpb247XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5jcmVtZW50VGltZShkYXRlVmFsOiBELCB3aGF0VG9JbmNyZW1lbnQ6IFRpbWVQYXJ0cyA9IFRpbWVQYXJ0cy5zZWNvbmRzKTogRCB7XG4gICAgICAgIGxldCB7IGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzIH0gPSB0aGlzLmdldFRpbWVEaWdpdHNGcm9tRGF0ZShkYXRlVmFsKTtcblxuICAgICAgICBzd2l0Y2ggKHdoYXRUb0luY3JlbWVudCkge1xuICAgICAgICAgICAgY2FzZSBUaW1lUGFydHMuaG91cnM6XG4gICAgICAgICAgICAgICAgaG91cnMrKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVGltZVBhcnRzLm1pbnV0ZXM6XG4gICAgICAgICAgICAgICAgbWludXRlcysrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUaW1lUGFydHMuc2Vjb25kczpcbiAgICAgICAgICAgICAgICBzZWNvbmRzKys7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY29uZHMgPiBTRUNPTkRTX1BFUl9NSU5VVEUpIHsgc2Vjb25kcyA9IDA7IH1cblxuICAgICAgICBpZiAobWludXRlcyA+IE1JTlVURVNfUEVSX0hPVVIpIHsgbWludXRlcyA9IDA7IH1cblxuICAgICAgICBpZiAoaG91cnMgPiBIT1VSU19QRVJfREFZKSB7IGhvdXJzID0gMDsgfVxuXG4gICAgICAgIHJldHVybiA8RD4gdGhpcy5nZXREYXRlRnJvbVRpbWVEaWdpdHMoaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBEZWNyZW1lbnQgcGFydCBvZiB0aW1lXG4gICAgICovXG4gICAgcHJpdmF0ZSBkZWNyZW1lbnRUaW1lKGRhdGVWYWw6IEQsIHdoYXRUb0RlY3JlbWVudDogVGltZVBhcnRzID0gVGltZVBhcnRzLnNlY29uZHMpOiBEIHtcbiAgICAgICAgbGV0IHsgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMgfSA9IHRoaXMuZ2V0VGltZURpZ2l0c0Zyb21EYXRlKGRhdGVWYWwpO1xuXG4gICAgICAgIHN3aXRjaCAod2hhdFRvRGVjcmVtZW50KSB7XG4gICAgICAgICAgICBjYXNlIFRpbWVQYXJ0cy5ob3VyczpcbiAgICAgICAgICAgICAgICBob3Vycy0tO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUaW1lUGFydHMubWludXRlczpcbiAgICAgICAgICAgICAgICBtaW51dGVzLS07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFRpbWVQYXJ0cy5zZWNvbmRzOlxuICAgICAgICAgICAgICAgIHNlY29uZHMtLTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2Vjb25kcyA8IDApIHsgc2Vjb25kcyA9IFNFQ09ORFNfUEVSX01JTlVURTsgfVxuXG4gICAgICAgIGlmIChtaW51dGVzIDwgMCkgeyBtaW51dGVzID0gTUlOVVRFU19QRVJfSE9VUjsgfVxuXG4gICAgICAgIGlmIChob3VycyA8IDApIHsgaG91cnMgPSBIT1VSU19QRVJfREFZOyB9XG5cbiAgICAgICAgcmV0dXJuIDxEPiB0aGlzLmdldERhdGVGcm9tVGltZURpZ2l0cyhob3VycywgbWludXRlcywgc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDdXJzb3JQb3NpdGlvbk9mUHJldlRpbWVQYXJ0U3RhcnQoY3Vyc29yUG9zOiBudW1iZXIsIHRpbWVTdHJpbmc6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBjdXJzb3JQb3MgPT09IDAgPyB0aW1lU3RyaW5nLmxlbmd0aCA6IGN1cnNvclBvcyAtIDE7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDdXJzb3JQb3NpdGlvbk9mTmV4dFRpbWVQYXJ0U3RhcnQoXG4gICAgICAgIGN1cnNvclBvczogbnVtYmVyLCB0aW1lU3RyaW5nOiBzdHJpbmcsIHRpbWVEZXZpZGVyOiBzdHJpbmcgPSAnOidcbiAgICApOiBudW1iZXIge1xuICAgICAgICBjb25zdCBuZXh0RGl2aWRlclBvczogbnVtYmVyID0gdGltZVN0cmluZy5pbmRleE9mKHRpbWVEZXZpZGVyLCBjdXJzb3JQb3MpO1xuXG4gICAgICAgIHJldHVybiBuZXh0RGl2aWRlclBvcyAhPT0gdW5kZWZpbmVkID8gbmV4dERpdmlkZXJQb3MgKyAxIDogMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHBhcmFtcyBmb3IgYXJyb3cta2V5cyAodXAvZG93bikgdGltZSB2YWxpZSBlZGl0LlxuICAgICAqIEBwYXJhbSBjdXJzb3JQb3NpdGlvbiBDdXJyZW50IGN1cnNvciBwb3NpdGlvbiBpbiB0aW1lU3RyaW5nXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRUaW1lRWRpdE1ldHJpY3MoY3Vyc29yUG9zaXRpb246IG51bWJlcik6IHtcbiAgICAgICAgbW9kaWZpZWRUaW1lUGFydDogVGltZVBhcnRzO1xuICAgICAgICBjdXJzb3JTdGFydFBvc2l0aW9uOiBudW1iZXI7XG4gICAgICAgIGN1cnNvckVuZFBvc2l0aW9uOiBudW1iZXI7XG4gICAgfSB7XG4gICAgICAgIGNvbnN0IHRpbWVTdHJpbmc6IHN0cmluZyA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgICAgICBsZXQgbW9kaWZpZWRUaW1lUGFydDogVGltZVBhcnRzO1xuICAgICAgICBsZXQgY3Vyc29yU3RhcnRQb3NpdGlvbjogbnVtYmVyO1xuICAgICAgICBsZXQgY3Vyc29yRW5kUG9zaXRpb246IG51bWJlcjtcbiAgICAgICAgY29uc3QgaG91cnNJbmRleCA9IDA7XG4gICAgICAgIGNvbnN0IG1pbnV0ZXNJbmRleCA9IHRpbWVTdHJpbmcuaW5kZXhPZignOicsIGhvdXJzSW5kZXggKyAxKTtcbiAgICAgICAgY29uc3Qgc2Vjb25kc0luZGV4ID0gbWludXRlc0luZGV4ICE9PSAtMSA/IHRpbWVTdHJpbmcuaW5kZXhPZignOicsIG1pbnV0ZXNJbmRleCArIDEpIDogLTE7XG5cbiAgICAgICAgaWYgKHNlY29uZHNJbmRleCAhPT0gLTEgJiYgY3Vyc29yUG9zaXRpb24gPiBzZWNvbmRzSW5kZXgpIHtcbiAgICAgICAgICAgIG1vZGlmaWVkVGltZVBhcnQgPSBUaW1lUGFydHMuc2Vjb25kcztcbiAgICAgICAgICAgIGN1cnNvclN0YXJ0UG9zaXRpb24gPSBzZWNvbmRzSW5kZXggKyAxO1xuICAgICAgICAgICAgY3Vyc29yRW5kUG9zaXRpb24gPSB0aW1lU3RyaW5nLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIGlmIChtaW51dGVzSW5kZXggIT09IC0xICYmIGN1cnNvclBvc2l0aW9uID4gbWludXRlc0luZGV4KSB7XG4gICAgICAgICAgICBtb2RpZmllZFRpbWVQYXJ0ID0gVGltZVBhcnRzLm1pbnV0ZXM7XG4gICAgICAgICAgICBjdXJzb3JTdGFydFBvc2l0aW9uID0gbWludXRlc0luZGV4ICsgMTtcbiAgICAgICAgICAgIGN1cnNvckVuZFBvc2l0aW9uID0gc2Vjb25kc0luZGV4ID4gLTEgPyBzZWNvbmRzSW5kZXggOiB0aW1lU3RyaW5nLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZGlmaWVkVGltZVBhcnQgPSBUaW1lUGFydHMuaG91cnM7XG4gICAgICAgICAgICBjdXJzb3JTdGFydFBvc2l0aW9uID0gaG91cnNJbmRleDtcbiAgICAgICAgICAgIGN1cnNvckVuZFBvc2l0aW9uID0gbWludXRlc0luZGV4ICE9PSAtMSA/IG1pbnV0ZXNJbmRleCA6IHRpbWVTdHJpbmcubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1vZGlmaWVkVGltZVBhcnQsXG4gICAgICAgICAgICBjdXJzb3JTdGFydFBvc2l0aW9uLFxuICAgICAgICAgICAgY3Vyc29yRW5kUG9zaXRpb25cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gQ3JlYXRlIHRpbWUgc3RyaW5nIGZvciBkaXNwbGF5aW5nIGluc2lkZSBpbnB1dCBlbGVtZW50IG9mIFVJXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRUaW1lU3RyaW5nRnJvbURhdGUodmFsdWU6IEQsIHRpbWVGb3JtYXQ6IFRpbWVGb3JtYXRzID0gREVGQVVMVF9USU1FX0ZPUk1BVCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5kYXRlQWRhcHRlci5mb3JtYXQodmFsdWUsIHRpbWVGb3JtYXQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UGFyc2VkVGltZVBhcnRzKHRpbWVTdHJpbmc6IHN0cmluZyk6IHtcbiAgICAgICAgaG91cnNPbmx5OiBhbnk7XG4gICAgICAgIGhvdXJzQW5kTWludXRlczogYW55O1xuICAgICAgICBob3Vyc0FuZE1pbnV0ZXNBbmRTZWNvbmRzOiBhbnk7XG4gICAgfSB7XG4gICAgICAgIGNvbnN0IG1vbWVudFdyYXBwZWRUaW1lID0gdGhpcy5kYXRlQWRhcHRlci5wYXJzZSh0aW1lU3RyaW5nLCBbXG4gICAgICAgICAgICAnaDptIGEnLFxuICAgICAgICAgICAgJ2g6bTpzIGEnLFxuICAgICAgICAgICAgJ0g6bScsXG4gICAgICAgICAgICAnSDptOnMnXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGNvbnN0IGNvbnZlcnRlZFRpbWVTdHJpbmcgPSBtb21lbnRXcmFwcGVkVGltZSAhPT0gbnVsbFxuICAgICAgICAgICAgPyBtb21lbnRXcmFwcGVkVGltZS5mb3JtYXQoJ0g6bTpzJylcbiAgICAgICAgICAgIDogJyc7XG5cbiAgICAgICAgY29uc3QgaG91cnNBbmRNaW51dGVzQW5kU2Vjb25kcyA9IGNvbnZlcnRlZFRpbWVTdHJpbmcubWF0Y2goSE9VUlNfTUlOVVRFU19TRUNPTkRTX1JFR0VYUCk7XG4gICAgICAgIGNvbnN0IGhvdXJzQW5kTWludXRlcyA9IGNvbnZlcnRlZFRpbWVTdHJpbmcubWF0Y2goSE9VUlNfTUlOVVRFU19SRUdFWFApO1xuICAgICAgICBjb25zdCBob3Vyc09ubHkgPSBjb252ZXJ0ZWRUaW1lU3RyaW5nLm1hdGNoKEhPVVJTX09OTFlfUkVHRVhQKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaG91cnNPbmx5LFxuICAgICAgICAgICAgaG91cnNBbmRNaW51dGVzLFxuICAgICAgICAgICAgaG91cnNBbmRNaW51dGVzQW5kU2Vjb25kc1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBDcmVhdGUgRGF0ZSBvYmplY3QgZnJvbSBzZXBhcmF0ZSBwYXJ0cyBvZiB0aW1lXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXREYXRlRnJvbVRpbWVEaWdpdHMoaG91cnM6IG51bWJlciwgbWludXRlczogbnVtYmVyLCBzZWNvbmRzOiBudW1iZXIgPSAwKTogRCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERhdGVGcm9tVGltZVN0cmluZyhgJHtob3Vyc306JHttaW51dGVzfToke3NlY29uZHN9YCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREYXRlRnJvbVRpbWVTdHJpbmcodGltZVN0cmluZzogc3RyaW5nKTogRCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmICh0aW1lU3RyaW5nID09PSB1bmRlZmluZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgaG91cnNPbmx5LFxuICAgICAgICAgICAgaG91cnNBbmRNaW51dGVzLFxuICAgICAgICAgICAgaG91cnNBbmRNaW51dGVzQW5kU2Vjb25kc1xuICAgICAgICB9ID0gdGhpcy5nZXRQYXJzZWRUaW1lUGFydHModGltZVN0cmluZyk7XG5cbiAgICAgICAgaWYgKHRpbWVTdHJpbmcudHJpbSgpLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAgICAgaG91cnNPbmx5ID09PSBudWxsICYmIGhvdXJzQW5kTWludXRlcyA9PT0gbnVsbCAmJiBob3Vyc0FuZE1pbnV0ZXNBbmRTZWNvbmRzID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZSBuby1tYWdpYy1udW1iZXJzXG4gICAgICAgIGxldCBob3VyczogbnVtYmVyID0gMDtcbiAgICAgICAgbGV0IG1pbnV0ZXM6IG51bWJlciA9IDA7XG4gICAgICAgIGxldCBzZWNvbmRzOiBudW1iZXIgPSAwO1xuXG4gICAgICAgIGlmIChob3Vyc09ubHkpIHtcbiAgICAgICAgICAgIGhvdXJzID0gTnVtYmVyKGhvdXJzT25seVsxXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaG91cnNBbmRNaW51dGVzKSB7XG4gICAgICAgICAgICBob3VycyA9IE51bWJlcihob3Vyc0FuZE1pbnV0ZXNbMV0pO1xuICAgICAgICAgICAgbWludXRlcyA9IE51bWJlcihob3Vyc0FuZE1pbnV0ZXNbMl0pO1xuICAgICAgICB9IGVsc2UgaWYgKGhvdXJzQW5kTWludXRlc0FuZFNlY29uZHMpIHtcbiAgICAgICAgICAgIGhvdXJzID0gTnVtYmVyKGhvdXJzQW5kTWludXRlc0FuZFNlY29uZHNbMV0pO1xuICAgICAgICAgICAgbWludXRlcyA9IE51bWJlcihob3Vyc0FuZE1pbnV0ZXNBbmRTZWNvbmRzWzJdKTtcbiAgICAgICAgICAgIHNlY29uZHMgPSBOdW1iZXIoaG91cnNBbmRNaW51dGVzQW5kU2Vjb25kc1szXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXN1bHREYXRlOiBEID0gdGhpcy5kYXRlQWRhcHRlci5jcmVhdGVEYXRlVGltZShcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLm9yaWdpbmFsVmFsdWUpLFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLm9yaWdpbmFsVmFsdWUpLFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXREYXRlKHRoaXMub3JpZ2luYWxWYWx1ZSksXG4gICAgICAgICAgICBob3VycyxcbiAgICAgICAgICAgIG1pbnV0ZXMsXG4gICAgICAgICAgICBzZWNvbmRzLFxuICAgICAgICAgICAgMFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVBZGFwdGVyLmlzVmFsaWQocmVzdWx0RGF0ZSkgPyByZXN1bHREYXRlIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VGltZURpZ2l0c0Zyb21EYXRlKGRhdGVWYWw6IEQpOiB7IGhvdXJzOiBudW1iZXI7IG1pbnV0ZXM6IG51bWJlcjsgc2Vjb25kczogbnVtYmVyIH0ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaG91cnM6IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0SG91cnMoZGF0ZVZhbCksXG4gICAgICAgICAgICBtaW51dGVzOiB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbnV0ZXMoZGF0ZVZhbCksXG4gICAgICAgICAgICBzZWNvbmRzOiB0aGlzLmRhdGVBZGFwdGVyLmdldFNlY29uZHMoZGF0ZVZhbClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlVmFsaWRhdG9yKCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudERhdGVUaW1lSW5wdXQgPT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgICB7IG1jVGltZXBpY2tlclBhcnNlOiB7IHRleHQ6IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlIH0gfSA6XG4gICAgICAgICAgICBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWluVGltZVZhbGlkYXRvcigpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMubWluVGltZSAmJlxuICAgICAgICAgICAgdGhpcy5jdXJyZW50RGF0ZVRpbWVJbnB1dCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICB0aGlzLmlzVGltZUxvd2VyVGhlbk1pbih0aGlzLmN1cnJlbnREYXRlVGltZUlucHV0KVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB7IG1jVGltZXBpY2tlckxvd2VyVGhlbk1pbnRpbWU6IHsgdGV4dDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgfSB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXhUaW1lVmFsaWRhdG9yKCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5tYXhUaW1lICYmXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlVGltZUlucHV0ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIHRoaXMuaXNUaW1lR3JlYXRlclRoZW5NYXgodGhpcy5jdXJyZW50RGF0ZVRpbWVJbnB1dClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4geyBtY1RpbWVwaWNrZXJIaWdoZXJUaGVuTWF4dGltZTogeyB0ZXh0OiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSB9IH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzVGltZUxvd2VyVGhlbk1pbih0aW1lVG9Db21wYXJlOiBEKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aW1lVG9Db21wYXJlID09PSB1bmRlZmluZWQgfHwgdGltZVRvQ29tcGFyZSA9PT0gIG51bGwgfHwgdGhpcy5taW5UaW1lID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5kYXRlQWRhcHRlci5jb21wYXJlRGF0ZVRpbWUodGltZVRvQ29tcGFyZSwgdGhpcy5nZXREYXRlRnJvbVRpbWVTdHJpbmcodGhpcy5taW5UaW1lKSkgPCAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNUaW1lR3JlYXRlclRoZW5NYXgodGltZVRvQ29tcGFyZTogRCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGltZVRvQ29tcGFyZSA9PT0gdW5kZWZpbmVkIHx8IHRpbWVUb0NvbXBhcmUgPT09ICBudWxsIHx8IHRoaXMubWF4VGltZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUFkYXB0ZXIuY29tcGFyZURhdGVUaW1lKHRpbWVUb0NvbXBhcmUsIHRoaXMuZ2V0RGF0ZUZyb21UaW1lU3RyaW5nKHRoaXMubWF4VGltZSkpID49IDA7XG4gICAgfVxufVxuIl19