/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __metadata, __param } from 'tslib';
import { Directive, ElementRef, forwardRef, Inject, InjectionToken, Input, Optional, Renderer2, Self, NgModule } from '@angular/core';
import { FormGroupDirective, NG_VALIDATORS, NgControl, NgForm, Validators, FormsModule } from '@angular/forms';
import { noop, Subject } from 'rxjs';
import { coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { ErrorStateMatcher, mixinErrorState } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@ptsecurity/cdk/a11y';
import { PlatformModule } from '@ptsecurity/cdk/platform';

var TimeParts;
(function (TimeParts) {
    TimeParts[TimeParts["hours"] = 0] = "hours";
    TimeParts[TimeParts["minutes"] = 1] = "minutes";
    TimeParts[TimeParts["seconds"] = 2] = "seconds";
})(TimeParts || (TimeParts = {}));
var TimeFormats;
(function (TimeFormats) {
    TimeFormats["HHmmss"] = "HH:mm:ss";
    TimeFormats["HHmm"] = "HH:mm";
})(TimeFormats || (TimeFormats = {}));
const TIMEFORMAT_PLACEHOLDERS = {
    'hh:mm:ss': '  :  :  ',
    'hh:mm': '  :  '
};
const DEFAULT_TIME_FORMAT = TimeFormats.HHmm;
const HOURS_MINUTES_SECONDS_REGEXP = new RegExp(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]|[0-9]):([0-5][0-9]|[0-9])?$/);
const HOURS_MINUTES_REGEXP = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]|[0-9])?$/;
const HOURS_ONLY_REGEXP = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):?$/;
const SECONDS_PER_MINUTE = 59;
const MINUTES_PER_HOUR = 59;
const HOURS_PER_DAY = 23;
// TODO Move it to common CDK
const ARROW_UP_KEYCODE = 'ArrowUp';
const ARROW_DOWN_KEYCODE = 'ArrowDown';
const ARROW_LEFT_KEYCODE = 'ArrowLeft';
const ARROW_RIGHT_KEYCODE = 'ArrowRight';

var McTimepicker_1;
let _uniqueComponentIdSuffix = 0;
let _validatorOnChange = noop;
let _validator = () => null;
const ɵ0 = _validator;
const MC_INPUT_VALUE_ACCESSOR = new InjectionToken('MC_INPUT_VALUE_ACCESSOR');
class McTimepickerBase {
    constructor(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
}
const McTimepickerMixinBase = mixinErrorState(McTimepickerBase);
const ɵ1 = {
    validate(c) { return _validator ? _validator(c) : null; },
    registerOnValidatorChange(fn) { _validatorOnChange = fn; }
};
let McTimepicker = McTimepicker_1 = class McTimepicker extends McTimepickerMixinBase {
    constructor(_elementRef, ngControl, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, inputValueAccessor, _renderer) {
        super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
        this._elementRef = _elementRef;
        this.ngControl = ngControl;
        this._renderer = _renderer;
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        this.focused = false;
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        this.stateChanges = new Subject();
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        this.controlType = 'mc-timepicker';
        this._uid = `mc-timepicker-${_uniqueComponentIdSuffix++}`;
        this._minTime = null;
        this._maxTime = null;
        // If no input value accessor was explicitly specified, use the element as the input value
        // accessor.
        this._inputValueAccessor = inputValueAccessor || this._elementRef.nativeElement;
        this._previousNativeValue = this.value;
        this._onChange = noop;
        // Force setter to be called in case id was not specified.
        this.id = this.id;
        // Instead of NG_VALUE_ACCESSOR (https://github.com/angular/material2/issues/8158#issuecomment-344618103)
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
        // Substitute initial empty validator with validator linked to directive object instance (workaround)
        _validator = Validators.compose([
            () => this._parseValidator(),
            () => this._minTimeValidator(),
            () => this._maxTimeValidator()
        ]);
    }
    get disabled() {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        // Browsers may not fire the blur event if the input is disabled too quickly.
        // Reset from here to ensure that the element doesn't become stuck.
        if (this.focused) {
            this.focused = false;
        }
        this.stateChanges.next();
    }
    get id() { return this._id; }
    set id(value) { this._id = value || this._uid; }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get required() { return this._required; }
    set required(value) { this._required = coerceBooleanProperty(value); }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get value() { return this._inputValueAccessor.value; }
    set value(value) {
        if (value !== this.value) {
            this._inputValueAccessor.value = value;
            this._applyInputChanges();
        }
    }
    get timeFormat() { return this._timeFormat; }
    set timeFormat(formatValue) {
        this._timeFormat = Object
            .keys(TimeFormats)
            .map((timeFormatKey) => TimeFormats[timeFormatKey])
            .indexOf(formatValue) > -1 ? formatValue : DEFAULT_TIME_FORMAT;
        _validatorOnChange();
        this.placeholder = TIMEFORMAT_PLACEHOLDERS[this._timeFormat.toLowerCase()];
    }
    get minTime() { return this._minTime; }
    set minTime(minValue) {
        this._minTime = minValue;
        this._minDTime = minValue !== null ? this._getDateFromTimeString(minValue) : undefined;
        _validatorOnChange();
    }
    get maxTime() { return this._maxTime; }
    set maxTime(maxValue) {
        this._maxTime = maxValue;
        this._maxDTime = maxValue !== null ? this._getDateFromTimeString(maxValue) : undefined;
        _validatorOnChange();
    }
    ngOnChanges() {
        this.stateChanges.next();
    }
    ngOnDestroy() {
        this.stateChanges.complete();
    }
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
        this._dirtyCheckNativeValue();
    }
    focus() {
        this._elementRef.nativeElement.focus();
    }
    focusChanged(isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this._onTouched();
            this.stateChanges.next();
        }
    }
    onBlur() {
        this._applyInputChanges();
        this.focusChanged(false);
    }
    onPaste($event) {
        $event.preventDefault();
        const clipboardUserInput = $event.clipboardData.getData('text');
        if (this._getDateFromTimeString(clipboardUserInput) === undefined) {
            return;
        }
        this._elementRef.nativeElement.value = clipboardUserInput;
        this.onInput();
    }
    onInput() {
        const initialCursorStart = this._elementRef.nativeElement.selectionStart;
        const initialCursorEnd = this._elementRef.nativeElement.selectionEnd;
        let isAutocompleteTriggered = false;
        const { hoursOnly, hoursAndMinutes, hoursAndMinutesAndSeconds } = this._getParsedTimeParts(this._elementRef.nativeElement.value);
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
        this._applyInputChanges({ doTimestringReformat: isAutocompleteTriggered });
        this._elementRef.nativeElement.selectionStart = initialCursorStart;
        this._elementRef.nativeElement.selectionEnd = initialCursorEnd;
        if (isAutocompleteTriggered && this.ngControl.errors === null) {
            this._createSelectionOfTimeComponentInInput(initialCursorStart + 1);
        }
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get empty() {
        return !this._elementRef.nativeElement.value && !this._isBadInput();
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    onContainerClick() {
        this.focus();
    }
    writeValue(value) {
        if (value !== null) {
            this._renderer.setProperty(this._elementRef.nativeElement, 'value', this._getTimeStringFromDate(value, this.timeFormat));
        }
        this._onChange(value || null);
        this._applyInputChanges();
    }
    onKeyDown(event) {
        const keyCode = this._getKeyCode(event);
        if (keyCode === ARROW_UP_KEYCODE || keyCode === ARROW_DOWN_KEYCODE) {
            this._upDownTimeByArrowKeys(event);
        }
        if (keyCode === ARROW_LEFT_KEYCODE || keyCode === ARROW_RIGHT_KEYCODE) {
            this._switchSelectionBetweenTimeparts(event);
        }
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /** Does some manual dirty checking on the native input `value` property. */
    _dirtyCheckNativeValue() {
        const newValue = this.value;
        if (this._previousNativeValue !== newValue) {
            this._previousNativeValue = newValue;
            this.stateChanges.next();
        }
    }
    /** Checks whether the input is invalid based on the native validation. */
    _isBadInput() {
        const validity = this._elementRef.nativeElement.validity;
        return validity && validity.badInput;
    }
    _applyInputChanges(applyParams = {}) {
        const { changedTime, doTimestringReformat = true } = applyParams;
        const timeToApply = changedTime ||
            this._getDateFromTimeString(this._elementRef.nativeElement.value);
        this._currentDTimeInput = timeToApply;
        if (doTimestringReformat && timeToApply !== undefined) {
            this._renderer.setProperty(this._elementRef.nativeElement, 'value', this._getTimeStringFromDate(timeToApply, this.timeFormat));
        }
        this.ngControl.control.updateValueAndValidity();
        const result = this.ngControl.errors === null && timeToApply !== undefined ? timeToApply : null;
        this._onChange(result);
        this.stateChanges.next();
    }
    _upDownTimeByArrowKeys(event) {
        event.preventDefault();
        let changedTime = this._currentDTimeInput;
        if (changedTime !== undefined) {
            const cursorPos = this._elementRef.nativeElement.selectionStart;
            const modifiedTimePart = this._getTimeEditMetrics(cursorPos)
                .modifiedTimePart;
            const keyCode = this._getKeyCode(event);
            if (keyCode === ARROW_UP_KEYCODE) {
                changedTime = this._incrementTime(changedTime, modifiedTimePart);
            }
            if (keyCode === ARROW_DOWN_KEYCODE) {
                changedTime = this._decrementTime(changedTime, modifiedTimePart);
            }
            this._applyInputChanges({ changedTime });
            this._createSelectionOfTimeComponentInInput(cursorPos);
        }
    }
    _switchSelectionBetweenTimeparts(event) {
        const changedTime = this._currentDTimeInput;
        const keyCode = this._getKeyCode(event);
        if (changedTime !== undefined) {
            let cursorPos = this._elementRef.nativeElement.selectionStart;
            if (keyCode === ARROW_LEFT_KEYCODE) {
                cursorPos = this._getCursorPositionOfPrevTimePartStart(cursorPos, this._elementRef.nativeElement.value);
            }
            else if (keyCode === ARROW_RIGHT_KEYCODE) {
                cursorPos = this._getCursorPositionOfNextTimePartStart(cursorPos, this._elementRef.nativeElement.value);
            }
            this._createSelectionOfTimeComponentInInput(cursorPos);
        }
    }
    /**
     * @description Microsoft EDGE doesn't support KeyboaedEvent.code thus we need this helper
     */
    _getKeyCode(event) {
        return event.code || event.key;
    }
    _createSelectionOfTimeComponentInInput(cursorPos) {
        setTimeout(() => {
            const newEditParams = this._getTimeEditMetrics(cursorPos);
            this._elementRef.nativeElement.selectionStart = newEditParams.cursorStartPosition;
            this._elementRef.nativeElement.selectionEnd = newEditParams.cursorEndPosition;
        });
    }
    _incrementTime(dateVal, whatToIncrement = TimeParts.seconds) {
        let { hours, minutes, seconds } = this._getTimeDigitsFromDate(dateVal);
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
        return this._getDateFromTimeDigits(hours, minutes, seconds);
    }
    /**
     * @description Decrement part of time
     */
    _decrementTime(dateVal, whatToDecrement = TimeParts.seconds) {
        let { hours, minutes, seconds } = this._getTimeDigitsFromDate(dateVal);
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
        return this._getDateFromTimeDigits(hours, minutes, seconds);
    }
    _getCursorPositionOfPrevTimePartStart(cursorPos, timeString) {
        return cursorPos === 0 ? timeString.length : cursorPos - 1;
    }
    _getCursorPositionOfNextTimePartStart(cursorPos, timeString, timeDevider = ':') {
        const nextDividerPos = timeString.indexOf(timeDevider, cursorPos);
        return nextDividerPos !== undefined ? nextDividerPos + 1 : 0;
    }
    /**
     * @description Get params for arrow-keys (up/down) time valie edit.
     * @param cursorPosition Current cursor position in timeString
     */
    _getTimeEditMetrics(cursorPosition) {
        const timeString = this._elementRef.nativeElement.value;
        let modifiedTimePart;
        let cursorStartPosition;
        let cursorEndPosition;
        const hoursIndex = 0;
        const minutesIndex = timeString.indexOf(':', hoursIndex + 1);
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
     * @description Create time string for displaying inside input element of UI
     */
    _getTimeStringFromDate(tempVal, timeFormat = DEFAULT_TIME_FORMAT) {
        const hours = this._getNumberWithLeadingZero(tempVal.getHours());
        const minutes = this._getNumberWithLeadingZero(tempVal.getMinutes());
        const seconds = this._getNumberWithLeadingZero(tempVal.getSeconds());
        const formattedTimeGenerators = {
            [TimeFormats.HHmm]: () => `${hours}:${minutes}`,
            [TimeFormats.HHmmss]: () => `${hours}:${minutes}:${seconds}`
        };
        return formattedTimeGenerators[timeFormat]();
    }
    _getParsedTimeParts(timeString) {
        const hoursAndMinutesAndSeconds = timeString.match(HOURS_MINUTES_SECONDS_REGEXP);
        const hoursAndMinutes = timeString.match(HOURS_MINUTES_REGEXP);
        const hoursOnly = timeString.match(HOURS_ONLY_REGEXP);
        return {
            hoursOnly,
            hoursAndMinutes,
            hoursAndMinutesAndSeconds
        };
    }
    /**
     * @description Create Date object from separate parts of time
     */
    _getDateFromTimeDigits(hours, minutes, seconds = 0) {
        return this._getDateFromTimeString(`${hours}:${minutes}:${seconds}`);
    }
    _getDateFromTimeString(timeString) {
        // TODO Use moment-js
        if (timeString === undefined) {
            return;
        }
        const { hoursOnly, hoursAndMinutes, hoursAndMinutesAndSeconds } = this._getParsedTimeParts(timeString);
        if (timeString.trim().length === 0 ||
            hoursOnly === null && hoursAndMinutes === null && hoursAndMinutesAndSeconds === null) {
            return;
        }
        // tslint:disable no-magic-numbers
        let hours = 0;
        let minutes = 0;
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
        const resultDate = new Date(1970, 0, 1, hours, minutes, seconds);
        // tslint:enable no-magic-numbers
        return isNaN(resultDate.getTime()) ? undefined : resultDate;
    }
    _getNumberWithLeadingZero(digit) {
        const MAX_DIGIT_WITH_LEADING_ZERO = 9;
        return digit > MAX_DIGIT_WITH_LEADING_ZERO ? `${digit}` : `0${digit}`;
    }
    _getTimeDigitsFromDate(dateVal) {
        return {
            hours: dateVal.getHours(),
            minutes: dateVal.getMinutes(),
            seconds: dateVal.getSeconds()
        };
    }
    _parseValidator() {
        return this._currentDTimeInput === undefined ?
            { mcTimepickerParse: { text: this._elementRef.nativeElement.value } } :
            null;
    }
    _minTimeValidator() {
        if (this._currentDTimeInput !== undefined &&
            this._minDTime !== undefined &&
            this._isTimeLowerThenMin(this._currentDTimeInput)) {
            return { mcTimepickerLowerThenMintime: { text: this._elementRef.nativeElement.value } };
        }
        return null;
    }
    _maxTimeValidator() {
        if (this._currentDTimeInput !== undefined &&
            this._maxDTime !== undefined &&
            this._isTimeGreaterThenMax(this._currentDTimeInput)) {
            return { mcTimepickerHigherThenMaxtime: { text: this._elementRef.nativeElement.value } };
        }
        return null;
    }
    _isTimeLowerThenMin(timeToCompare) {
        return timeToCompare.getTime() - this._minDTime.getTime() < 0;
    }
    _isTimeGreaterThenMax(timeToCompare) {
        return timeToCompare.getTime() - this._maxDTime.getTime() >= 0;
    }
};
__decorate([
    Input(),
    __metadata("design:type", ErrorStateMatcher)
], McTimepicker.prototype, "errorStateMatcher", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], McTimepicker.prototype, "disabled", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], McTimepicker.prototype, "id", null);
__decorate([
    Input(),
    __metadata("design:type", String)
], McTimepicker.prototype, "placeholder", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], McTimepicker.prototype, "required", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], McTimepicker.prototype, "value", null);
__decorate([
    Input('time-format'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], McTimepicker.prototype, "timeFormat", null);
__decorate([
    Input('min-time'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], McTimepicker.prototype, "minTime", null);
__decorate([
    Input('max-time'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], McTimepicker.prototype, "maxTime", null);
McTimepicker = McTimepicker_1 = __decorate([
    Directive({
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
                useExisting: forwardRef(() => McTimepicker_1)
            }
        ]
    }),
    __param(1, Optional()), __param(1, Self()),
    __param(2, Optional()),
    __param(3, Optional()),
    __param(5, Optional()), __param(5, Self()), __param(5, Inject(MC_INPUT_VALUE_ACCESSOR)),
    __metadata("design:paramtypes", [ElementRef,
        NgControl,
        NgForm,
        FormGroupDirective,
        ErrorStateMatcher, Object, Renderer2])
], McTimepicker);

let McTimepickerModule = class McTimepickerModule {
};
McTimepickerModule = __decorate([
    NgModule({
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
    })
], McTimepickerModule);

/**
 * Generated bundle index. Do not edit.
 */

export { McTimepickerModule, TimeParts, TimeFormats, TIMEFORMAT_PLACEHOLDERS, DEFAULT_TIME_FORMAT, HOURS_MINUTES_SECONDS_REGEXP, HOURS_MINUTES_REGEXP, HOURS_ONLY_REGEXP, SECONDS_PER_MINUTE, MINUTES_PER_HOUR, HOURS_PER_DAY, ARROW_UP_KEYCODE, ARROW_DOWN_KEYCODE, ARROW_LEFT_KEYCODE, ARROW_RIGHT_KEYCODE, MC_INPUT_VALUE_ACCESSOR, McTimepickerBase, McTimepickerMixinBase, McTimepicker, ɵ0, ɵ1 };
//# sourceMappingURL=timepicker.js.map
