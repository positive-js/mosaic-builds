/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { Directive, ElementRef, forwardRef, Inject, Input, Optional, Renderer2, Self, NgModule } from '@angular/core';
import { FormGroupDirective, NG_VALIDATORS, NgControl, NgForm, Validators, FormsModule } from '@angular/forms';
import { coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { ErrorStateMatcher, mixinErrorState } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { MC_INPUT_VALUE_ACCESSOR } from '@ptsecurity/mosaic/input';
import { noop, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@ptsecurity/cdk/a11y';
import { PlatformModule } from '@ptsecurity/cdk/platform';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    HHmmss: 'HH:mm:ss',
    HHmm: 'HH:mm',
};
/** @type {?} */
const TIMEFORMAT_PLACEHOLDERS = {
    [TimeFormats.HHmmss]: '  :  :  ',
    [TimeFormats.HHmm]: '  :  '
};
/** @type {?} */
const DEFAULT_TIME_FORMAT = TimeFormats.HHmm;
/** @type {?} */
const HOURS_MINUTES_SECONDS_REGEXP = new RegExp(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]|[0-9]):([0-5][0-9]|[0-9])?$/);
/** @type {?} */
const HOURS_MINUTES_REGEXP = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]|[0-9])?$/;
/** @type {?} */
const HOURS_ONLY_REGEXP = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):?$/;
/** @type {?} */
const SECONDS_PER_MINUTE = 59;
/** @type {?} */
const MINUTES_PER_HOUR = 59;
/** @type {?} */
const HOURS_PER_DAY = 23;
// TODO Move it to common CDK
/** @type {?} */
const ARROW_UP_KEYCODE = 'ArrowUp';
/** @type {?} */
const ARROW_DOWN_KEYCODE = 'ArrowDown';
/** @type {?} */
const ARROW_LEFT_KEYCODE = 'ArrowLeft';
/** @type {?} */
const ARROW_RIGHT_KEYCODE = 'ArrowRight';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let uniqueComponentIdSuffix = 0;
/** @type {?} */
const formValidators = new WeakMap();
/** @type {?} */
const formValidatorOnChangeRegistrators = new WeakMap();
/** @type {?} */
const validatorOnChange = (c) => {
    /** @type {?} */
    const validatorOnChangeHandler = formValidatorOnChangeRegistrators.get(c);
    if (validatorOnChangeHandler !== undefined) {
        validatorOnChangeHandler();
    }
};
class McTimepickerBase {
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
// tslint:disable-next-line naming-convention
/** @type {?} */
const McTimepickerMixinBase = mixinErrorState(McTimepickerBase);
const ɵ1 = {
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        // TODO This is `workaround` to bind singleton-like Validator implementation to
        // context of each validated component. This MUST be realized in proper way!
        if (this.__validatorOnChangeHandler !== undefined) {
            formValidatorOnChangeRegistrators.set(c, this.__validatorOnChangeHandler);
            this.__validatorOnChangeHandler = undefined;
        }
        /** @type {?} */
        const validator = formValidators.get(c);
        return validator ? validator(c) : null;
    },
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnValidatorChange(fn) {
        this.__validatorOnChangeHandler = fn;
    }
};
class McTimepicker extends McTimepickerMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} ngControl
     * @param {?} parentForm
     * @param {?} parentFormGroup
     * @param {?} defaultErrorStateMatcher
     * @param {?} inputValueAccessor
     * @param {?} renderer
     */
    constructor(elementRef, ngControl, parentForm, parentFormGroup, defaultErrorStateMatcher, inputValueAccessor, renderer) {
        super(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);
        this.elementRef = elementRef;
        this.ngControl = ngControl;
        this.renderer = renderer;
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         */
        this.focused = false;
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         */
        this.stateChanges = new Subject();
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         */
        this.controlType = 'mc-timepicker';
        this.uid = `mc-timepicker-${uniqueComponentIdSuffix++}`;
        this._minTime = null;
        this._maxTime = null;
        // If no input value accessor was explicitly specified, use the element as the input value
        // accessor.
        this.inputValueAccessor = inputValueAccessor || this.elementRef.nativeElement;
        this.previousNativeValue = this.value;
        this.onChange = noop;
        // Force setter to be called in case id was not specified.
        this.id = this.id;
        this.placeholder = TIMEFORMAT_PLACEHOLDERS[DEFAULT_TIME_FORMAT];
        // Instead of NG_VALUE_ACCESSOR (https://github.com/angular/material2/issues/8158#issuecomment-344618103)
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
        // Substitute initial empty validator with validator linked to directive object instance (workaround)
        formValidators.set((/** @type {?} */ (this.ngControl.control)), Validators.compose([
            () => this.parseValidator(),
            () => this.minTimeValidator(),
            () => this.maxTimeValidator()
        ]));
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
    get id() { return this._id; }
    /**
     * @param {?} value
     * @return {?}
     */
    set id(value) { this._id = value || this.uid; }
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    get required() { return this._required; }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) { this._required = coerceBooleanProperty(value); }
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    get value() { return this.inputValueAccessor.value; }
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
    get timeFormat() { return this._timeFormat; }
    /**
     * @param {?} formatValue
     * @return {?}
     */
    set timeFormat(formatValue) {
        this._timeFormat = Object
            .keys(TimeFormats)
            .map((timeFormatKey) => TimeFormats[timeFormatKey])
            .indexOf(formatValue) > -1 ? formatValue : DEFAULT_TIME_FORMAT;
        validatorOnChange((/** @type {?} */ (this.ngControl.control)));
        this.placeholder = TIMEFORMAT_PLACEHOLDERS[this._timeFormat];
    }
    /**
     * @return {?}
     */
    get minTime() { return this._minTime; }
    /**
     * @param {?} minValue
     * @return {?}
     */
    set minTime(minValue) {
        this._minTime = minValue;
        this.minDateTime = minValue !== null ? this.getDateFromTimeString(minValue) : undefined;
        validatorOnChange((/** @type {?} */ (this.ngControl.control)));
    }
    /**
     * @return {?}
     */
    get maxTime() { return this._maxTime; }
    /**
     * @param {?} maxValue
     * @return {?}
     */
    set maxTime(maxValue) {
        this._maxTime = maxValue;
        this.maxDateTime = maxValue !== null ? this.getDateFromTimeString(maxValue) : undefined;
        validatorOnChange((/** @type {?} */ (this.ngControl.control)));
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.stateChanges.next();
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
            this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.getTimeStringFromDate(value, this.timeFormat));
        }
        this.onChange(value || null);
        this.applyInputChanges();
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
        setTimeout(() => {
            /** @type {?} */
            const newEditParams = this.getTimeEditMetrics(cursorPos);
            this.elementRef.nativeElement.selectionStart = newEditParams.cursorStartPosition;
            this.elementRef.nativeElement.selectionEnd = newEditParams.cursorEndPosition;
        });
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
     * @param {?} tempVal
     * @param {?=} timeFormat
     * @return {?}
     */
    getTimeStringFromDate(tempVal, timeFormat = DEFAULT_TIME_FORMAT) {
        /** @type {?} */
        const hours = this.getNumberWithLeadingZero(tempVal.getHours());
        /** @type {?} */
        const minutes = this.getNumberWithLeadingZero(tempVal.getMinutes());
        /** @type {?} */
        const seconds = this.getNumberWithLeadingZero(tempVal.getSeconds());
        /** @type {?} */
        const formattedTimeGenerators = {
            [TimeFormats.HHmm]: () => `${hours}:${minutes}`,
            [TimeFormats.HHmmss]: () => `${hours}:${minutes}:${seconds}`
        };
        return formattedTimeGenerators[timeFormat]();
    }
    /**
     * @private
     * @param {?} timeString
     * @return {?}
     */
    getParsedTimeParts(timeString) {
        /** @type {?} */
        const hoursAndMinutesAndSeconds = timeString.match(HOURS_MINUTES_SECONDS_REGEXP);
        /** @type {?} */
        const hoursAndMinutes = timeString.match(HOURS_MINUTES_REGEXP);
        /** @type {?} */
        const hoursOnly = timeString.match(HOURS_ONLY_REGEXP);
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
        // TODO Use moment-js
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
        // const timestamp: number = Date.parse(fullDateString);
        /** @type {?} */
        const resultDate = new Date(1970, 0, 1, hours, minutes, seconds);
        // tslint:enable no-magic-numbers
        return isNaN(resultDate.getTime()) ? undefined : resultDate;
    }
    /**
     * @private
     * @param {?} digit
     * @return {?}
     */
    getNumberWithLeadingZero(digit) {
        /** @type {?} */
        const MAX_DIGIT_WITH_LEADING_ZERO = 9;
        return digit > MAX_DIGIT_WITH_LEADING_ZERO ? `${digit}` : `0${digit}`;
    }
    /**
     * @private
     * @param {?} dateVal
     * @return {?}
     */
    getTimeDigitsFromDate(dateVal) {
        return {
            hours: dateVal.getHours(),
            minutes: dateVal.getMinutes(),
            seconds: dateVal.getSeconds()
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
        if (this.currentDateTimeInput !== undefined &&
            this.minDateTime !== undefined &&
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
        if (this.currentDateTimeInput !== undefined &&
            this.maxDateTime !== undefined &&
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
        return timeToCompare.getTime() - ((/** @type {?} */ (this.minDateTime))).getTime() < 0;
    }
    /**
     * @private
     * @param {?} timeToCompare
     * @return {?}
     */
    isTimeGreaterThenMax(timeToCompare) {
        return timeToCompare.getTime() - ((/** @type {?} */ (this.maxDateTime))).getTime() >= 0;
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
                        provide: NG_VALIDATORS,
                        useValue: ɵ1,
                        multi: true
                    },
                    {
                        provide: McFormFieldControl,
                        useExisting: forwardRef(() => McTimepicker)
                    }
                ]
            },] },
];
/** @nocollapse */
McTimepicker.ctorParameters = () => [
    { type: ElementRef },
    { type: NgControl, decorators: [{ type: Optional }, { type: Self }] },
    { type: NgForm, decorators: [{ type: Optional }] },
    { type: FormGroupDirective, decorators: [{ type: Optional }] },
    { type: ErrorStateMatcher },
    { type: undefined, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [MC_INPUT_VALUE_ACCESSOR,] }] },
    { type: Renderer2 }
];
McTimepicker.propDecorators = {
    errorStateMatcher: [{ type: Input }],
    disabled: [{ type: Input }],
    id: [{ type: Input }],
    placeholder: [{ type: Input }],
    required: [{ type: Input }],
    value: [{ type: Input }],
    timeFormat: [{ type: Input, args: ['time-format',] }],
    minTime: [{ type: Input, args: ['min-time',] }],
    maxTime: [{ type: Input, args: ['max-time',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                declarations: [
                    McTimepicker
                ],
                exports: [
                    McTimepicker
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McTimepickerModule, TimeParts, TimeFormats, TIMEFORMAT_PLACEHOLDERS, DEFAULT_TIME_FORMAT, HOURS_MINUTES_SECONDS_REGEXP, HOURS_MINUTES_REGEXP, HOURS_ONLY_REGEXP, SECONDS_PER_MINUTE, MINUTES_PER_HOUR, HOURS_PER_DAY, ARROW_UP_KEYCODE, ARROW_DOWN_KEYCODE, ARROW_LEFT_KEYCODE, ARROW_RIGHT_KEYCODE, McTimepickerBase, McTimepickerMixinBase, McTimepicker };
//# sourceMappingURL=timepicker.js.map
