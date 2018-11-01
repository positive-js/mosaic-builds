/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __extends, __metadata, __param } from 'tslib';
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
var TIMEFORMAT_PLACEHOLDERS = {
    'hh:mm:ss': '  :  :  ',
    'hh:mm': '  :  '
};
var DEFAULT_TIME_FORMAT = TimeFormats.HHmm;
var HOURS_MINUTES_SECONDS_REGEXP = new RegExp(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]|[0-9]):([0-5][0-9]|[0-9])?$/);
var HOURS_MINUTES_REGEXP = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]|[0-9])?$/;
var HOURS_ONLY_REGEXP = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):?$/;
var SECONDS_PER_MINUTE = 59;
var MINUTES_PER_HOUR = 59;
var HOURS_PER_DAY = 23;
// TODO Move it to common CDK
var ARROW_UP_KEYCODE = 'ArrowUp';
var ARROW_DOWN_KEYCODE = 'ArrowDown';
var ARROW_LEFT_KEYCODE = 'ArrowLeft';
var ARROW_RIGHT_KEYCODE = 'ArrowRight';

var uniqueComponentIdSuffix = 0;
var validatorOnChange = noop;
var validator = function () { return null; };
var ɵ0 = validator;
var MC_INPUT_VALUE_ACCESSOR = new InjectionToken('MC_INPUT_VALUE_ACCESSOR');
var McTimepickerBase = /** @class */ (function () {
    function McTimepickerBase(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
    return McTimepickerBase;
}());
// tslint:disable-next-line naming-convention
var McTimepickerMixinBase = mixinErrorState(McTimepickerBase);
var ɵ1 = {
    validate: function (c) { return validator ? validator(c) : null; },
    registerOnValidatorChange: function (fn) { validatorOnChange = fn; }
};
var McTimepicker = /** @class */ (function (_super) {
    __extends(McTimepicker, _super);
    function McTimepicker(elementRef, ngControl, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, inputValueAccessor, renderer) {
        var _this = _super.call(this, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) || this;
        _this.elementRef = elementRef;
        _this.ngControl = ngControl;
        _this.renderer = renderer;
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        _this.focused = false;
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        _this.stateChanges = new Subject();
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        _this.controlType = 'mc-timepicker';
        _this.uid = "mc-timepicker-" + uniqueComponentIdSuffix++;
        _this._minTime = null;
        _this._maxTime = null;
        // If no input value accessor was explicitly specified, use the element as the input value
        // accessor.
        _this.inputValueAccessor = inputValueAccessor || _this.elementRef.nativeElement;
        _this.previousNativeValue = _this.value;
        _this.onChange = noop;
        // Force setter to be called in case id was not specified.
        _this.id = _this.id;
        // Instead of NG_VALUE_ACCESSOR (https://github.com/angular/material2/issues/8158#issuecomment-344618103)
        if (_this.ngControl) {
            _this.ngControl.valueAccessor = _this;
        }
        // Substitute initial empty validator with validator linked to directive object instance (workaround)
        validator = Validators.compose([
            function () { return _this.parseValidator(); },
            function () { return _this.minTimeValidator(); },
            function () { return _this.maxTimeValidator(); }
        ]);
        return _this;
    }
    McTimepicker_1 = McTimepicker;
    Object.defineProperty(McTimepicker.prototype, "disabled", {
        get: function () {
            if (this.ngControl && this.ngControl.disabled !== null) {
                return this.ngControl.disabled;
            }
            return this._disabled;
        },
        set: function (value) {
            this._disabled = coerceBooleanProperty(value);
            // Browsers may not fire the blur event if the input is disabled too quickly.
            // Reset from here to ensure that the element doesn't become stuck.
            if (this.focused) {
                this.focused = false;
            }
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "id", {
        get: function () { return this._id; },
        set: function (value) { this._id = value || this.uid; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "required", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: function () { return this._required; },
        set: function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "value", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: function () { return this.inputValueAccessor.value; },
        set: function (value) {
            if (value !== this.value) {
                this.inputValueAccessor.value = value;
                this.applyInputChanges();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "timeFormat", {
        get: function () { return this._timeFormat; },
        set: function (formatValue) {
            this._timeFormat = Object
                .keys(TimeFormats)
                .map(function (timeFormatKey) { return TimeFormats[timeFormatKey]; })
                .indexOf(formatValue) > -1 ? formatValue : DEFAULT_TIME_FORMAT;
            validatorOnChange();
            this.placeholder = TIMEFORMAT_PLACEHOLDERS[this._timeFormat.toLowerCase()];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "minTime", {
        get: function () { return this._minTime; },
        set: function (minValue) {
            this._minTime = minValue;
            this.minDateTime = minValue !== null ? this.getDateFromTimeString(minValue) : undefined;
            validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "maxTime", {
        get: function () { return this._maxTime; },
        set: function (maxValue) {
            this._maxTime = maxValue;
            this.maxDateTime = maxValue !== null ? this.getDateFromTimeString(maxValue) : undefined;
            validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    McTimepicker.prototype.ngOnChanges = function () {
        this.stateChanges.next();
    };
    McTimepicker.prototype.ngOnDestroy = function () {
        this.stateChanges.complete();
    };
    McTimepicker.prototype.ngDoCheck = function () {
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
    };
    McTimepicker.prototype.focus = function () {
        this.elementRef.nativeElement.focus();
    };
    McTimepicker.prototype.focusChanged = function (isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.onTouched();
            this.stateChanges.next();
        }
    };
    McTimepicker.prototype.onBlur = function () {
        this.applyInputChanges();
        this.focusChanged(false);
    };
    McTimepicker.prototype.onPaste = function ($event) {
        $event.preventDefault();
        var clipboardUserInput = $event.clipboardData.getData('text');
        if (this.getDateFromTimeString(clipboardUserInput) === undefined) {
            return;
        }
        this.elementRef.nativeElement.value = clipboardUserInput;
        this.onInput();
    };
    McTimepicker.prototype.onInput = function () {
        var initialCursorStart = this.elementRef.nativeElement.selectionStart;
        var initialCursorEnd = this.elementRef.nativeElement.selectionEnd;
        var isAutocompleteTriggered = false;
        var _a = this.getParsedTimeParts(this.elementRef.nativeElement.value), hoursOnly = _a.hoursOnly, hoursAndMinutes = _a.hoursAndMinutes, hoursAndMinutesAndSeconds = _a.hoursAndMinutesAndSeconds;
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
    };
    Object.defineProperty(McTimepicker.prototype, "empty", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: function () {
            return !this.elementRef.nativeElement.value && !this.isBadInput();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    McTimepicker.prototype.onContainerClick = function () {
        this.focus();
    };
    McTimepicker.prototype.writeValue = function (value) {
        if (value !== null) {
            this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.getTimeStringFromDate(value, this.timeFormat));
        }
        this.onChange(value || null);
        this.applyInputChanges();
    };
    McTimepicker.prototype.onKeyDown = function (event) {
        var keyCode = this.getKeyCode(event);
        if (keyCode === ARROW_UP_KEYCODE || keyCode === ARROW_DOWN_KEYCODE) {
            this.upDownTimeByArrowKeys(event);
        }
        if (keyCode === ARROW_LEFT_KEYCODE || keyCode === ARROW_RIGHT_KEYCODE) {
            this.switchSelectionBetweenTimeparts(event);
        }
    };
    McTimepicker.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    McTimepicker.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /** Does some manual dirty checking on the native input `value` property. */
    McTimepicker.prototype.dirtyCheckNativeValue = function () {
        var newValue = this.value;
        if (this.previousNativeValue !== newValue) {
            this.previousNativeValue = newValue;
            this.stateChanges.next();
        }
    };
    /** Checks whether the input is invalid based on the native validation. */
    McTimepicker.prototype.isBadInput = function () {
        var validity = this.elementRef.nativeElement.validity;
        return validity && validity.badInput;
    };
    McTimepicker.prototype.applyInputChanges = function (applyParams) {
        if (applyParams === void 0) { applyParams = {}; }
        var changedTime = applyParams.changedTime, _a = applyParams.doTimestringReformat, doTimestringReformat = _a === void 0 ? true : _a;
        var timeToApply = changedTime ||
            this.getDateFromTimeString(this.elementRef.nativeElement.value);
        this.currentDateTimeInput = timeToApply;
        if (doTimestringReformat && timeToApply !== undefined) {
            var selectionStart = this.elementRef.nativeElement.selectionStart;
            var selectionEnd = this.elementRef.nativeElement.selectionEnd;
            this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.getTimeStringFromDate(timeToApply, this.timeFormat));
            this.elementRef.nativeElement.selectionStart = selectionStart;
            this.elementRef.nativeElement.selectionEnd = selectionEnd;
        }
        this.ngControl.control.updateValueAndValidity();
        var result = this.ngControl.errors === null && timeToApply !== undefined ? timeToApply : null;
        this.onChange(result);
        this.stateChanges.next();
    };
    McTimepicker.prototype.upDownTimeByArrowKeys = function (event) {
        event.preventDefault();
        var changedTime = this.currentDateTimeInput;
        if (changedTime !== undefined) {
            var cursorPos = this.elementRef.nativeElement.selectionStart;
            var modifiedTimePart = this.getTimeEditMetrics(cursorPos)
                .modifiedTimePart;
            var keyCode = this.getKeyCode(event);
            if (keyCode === ARROW_UP_KEYCODE) {
                changedTime = this.incrementTime(changedTime, modifiedTimePart);
            }
            if (keyCode === ARROW_DOWN_KEYCODE) {
                changedTime = this.decrementTime(changedTime, modifiedTimePart);
            }
            this.applyInputChanges({ changedTime: changedTime });
            this.createSelectionOfTimeComponentInInput(cursorPos);
        }
    };
    McTimepicker.prototype.switchSelectionBetweenTimeparts = function (event) {
        var changedTime = this.currentDateTimeInput;
        var keyCode = this.getKeyCode(event);
        if (changedTime !== undefined) {
            var cursorPos = this.elementRef.nativeElement.selectionStart;
            if (keyCode === ARROW_LEFT_KEYCODE) {
                cursorPos = this.getCursorPositionOfPrevTimePartStart(cursorPos, this.elementRef.nativeElement.value);
            }
            else if (keyCode === ARROW_RIGHT_KEYCODE) {
                cursorPos = this.getCursorPositionOfNextTimePartStart(cursorPos, this.elementRef.nativeElement.value);
            }
            this.createSelectionOfTimeComponentInInput(cursorPos);
        }
    };
    /**
     * @description Microsoft EDGE doesn't support KeyboaedEvent.code thus we need this helper
     */
    McTimepicker.prototype.getKeyCode = function (event) {
        return event.code || event.key;
    };
    McTimepicker.prototype.createSelectionOfTimeComponentInInput = function (cursorPos) {
        var _this = this;
        setTimeout(function () {
            var newEditParams = _this.getTimeEditMetrics(cursorPos);
            _this.elementRef.nativeElement.selectionStart = newEditParams.cursorStartPosition;
            _this.elementRef.nativeElement.selectionEnd = newEditParams.cursorEndPosition;
        });
    };
    McTimepicker.prototype.incrementTime = function (dateVal, whatToIncrement) {
        if (whatToIncrement === void 0) { whatToIncrement = TimeParts.seconds; }
        var _a = this.getTimeDigitsFromDate(dateVal), hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
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
        return this.getDateFromTimeDigits(hours, minutes, seconds);
    };
    /**
     * @description Decrement part of time
     */
    McTimepicker.prototype.decrementTime = function (dateVal, whatToDecrement) {
        if (whatToDecrement === void 0) { whatToDecrement = TimeParts.seconds; }
        var _a = this.getTimeDigitsFromDate(dateVal), hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
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
        return this.getDateFromTimeDigits(hours, minutes, seconds);
    };
    McTimepicker.prototype.getCursorPositionOfPrevTimePartStart = function (cursorPos, timeString) {
        return cursorPos === 0 ? timeString.length : cursorPos - 1;
    };
    McTimepicker.prototype.getCursorPositionOfNextTimePartStart = function (cursorPos, timeString, timeDevider) {
        if (timeDevider === void 0) { timeDevider = ':'; }
        var nextDividerPos = timeString.indexOf(timeDevider, cursorPos);
        return nextDividerPos !== undefined ? nextDividerPos + 1 : 0;
    };
    /**
     * @description Get params for arrow-keys (up/down) time valie edit.
     * @param cursorPosition Current cursor position in timeString
     */
    McTimepicker.prototype.getTimeEditMetrics = function (cursorPosition) {
        var timeString = this.elementRef.nativeElement.value;
        var modifiedTimePart;
        var cursorStartPosition;
        var cursorEndPosition;
        var hoursIndex = 0;
        var minutesIndex = timeString.indexOf(':', hoursIndex + 1);
        var secondsIndex = minutesIndex !== -1 ? timeString.indexOf(':', minutesIndex + 1) : -1;
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
            modifiedTimePart: modifiedTimePart,
            cursorStartPosition: cursorStartPosition,
            cursorEndPosition: cursorEndPosition
        };
    };
    /**
     * @description Create time string for displaying inside input element of UI
     */
    McTimepicker.prototype.getTimeStringFromDate = function (tempVal, timeFormat) {
        if (timeFormat === void 0) { timeFormat = DEFAULT_TIME_FORMAT; }
        var _a;
        var hours = this.getNumberWithLeadingZero(tempVal.getHours());
        var minutes = this.getNumberWithLeadingZero(tempVal.getMinutes());
        var seconds = this.getNumberWithLeadingZero(tempVal.getSeconds());
        var formattedTimeGenerators = (_a = {}, _a[TimeFormats.HHmm] = function () { return hours + ":" + minutes; }, _a[TimeFormats.HHmmss] = function () { return hours + ":" + minutes + ":" + seconds; }, _a);
        return formattedTimeGenerators[timeFormat]();
    };
    McTimepicker.prototype.getParsedTimeParts = function (timeString) {
        var hoursAndMinutesAndSeconds = timeString.match(HOURS_MINUTES_SECONDS_REGEXP);
        var hoursAndMinutes = timeString.match(HOURS_MINUTES_REGEXP);
        var hoursOnly = timeString.match(HOURS_ONLY_REGEXP);
        return {
            hoursOnly: hoursOnly,
            hoursAndMinutes: hoursAndMinutes,
            hoursAndMinutesAndSeconds: hoursAndMinutesAndSeconds
        };
    };
    /**
     * @description Create Date object from separate parts of time
     */
    McTimepicker.prototype.getDateFromTimeDigits = function (hours, minutes, seconds) {
        if (seconds === void 0) { seconds = 0; }
        return this.getDateFromTimeString(hours + ":" + minutes + ":" + seconds);
    };
    McTimepicker.prototype.getDateFromTimeString = function (timeString) {
        // TODO Use moment-js
        if (timeString === undefined) {
            return;
        }
        var _a = this.getParsedTimeParts(timeString), hoursOnly = _a.hoursOnly, hoursAndMinutes = _a.hoursAndMinutes, hoursAndMinutesAndSeconds = _a.hoursAndMinutesAndSeconds;
        if (timeString.trim().length === 0 ||
            hoursOnly === null && hoursAndMinutes === null && hoursAndMinutesAndSeconds === null) {
            return;
        }
        // tslint:disable no-magic-numbers
        var hours = 0;
        var minutes = 0;
        var seconds = 0;
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
        var resultDate = new Date(1970, 0, 1, hours, minutes, seconds);
        // tslint:enable no-magic-numbers
        return isNaN(resultDate.getTime()) ? undefined : resultDate;
    };
    McTimepicker.prototype.getNumberWithLeadingZero = function (digit) {
        var MAX_DIGIT_WITH_LEADING_ZERO = 9;
        return digit > MAX_DIGIT_WITH_LEADING_ZERO ? "" + digit : "0" + digit;
    };
    McTimepicker.prototype.getTimeDigitsFromDate = function (dateVal) {
        return {
            hours: dateVal.getHours(),
            minutes: dateVal.getMinutes(),
            seconds: dateVal.getSeconds()
        };
    };
    McTimepicker.prototype.parseValidator = function () {
        return this.currentDateTimeInput === undefined ?
            { mcTimepickerParse: { text: this.elementRef.nativeElement.value } } :
            null;
    };
    McTimepicker.prototype.minTimeValidator = function () {
        if (this.currentDateTimeInput !== undefined &&
            this.minDateTime !== undefined &&
            this.isTimeLowerThenMin(this.currentDateTimeInput)) {
            return { mcTimepickerLowerThenMintime: { text: this.elementRef.nativeElement.value } };
        }
        return null;
    };
    McTimepicker.prototype.maxTimeValidator = function () {
        if (this.currentDateTimeInput !== undefined &&
            this.maxDateTime !== undefined &&
            this.isTimeGreaterThenMax(this.currentDateTimeInput)) {
            return { mcTimepickerHigherThenMaxtime: { text: this.elementRef.nativeElement.value } };
        }
        return null;
    };
    McTimepicker.prototype.isTimeLowerThenMin = function (timeToCompare) {
        return timeToCompare.getTime() - this.minDateTime.getTime() < 0;
    };
    McTimepicker.prototype.isTimeGreaterThenMax = function (timeToCompare) {
        return timeToCompare.getTime() - this.maxDateTime.getTime() >= 0;
    };
    var McTimepicker_1;
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
                    useExisting: forwardRef(function () { return McTimepicker_1; })
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
    return McTimepicker;
}(McTimepickerMixinBase));

var McTimepickerModule = /** @class */ (function () {
    function McTimepickerModule() {
    }
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
    return McTimepickerModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { McTimepickerModule, TimeParts, TimeFormats, TIMEFORMAT_PLACEHOLDERS, DEFAULT_TIME_FORMAT, HOURS_MINUTES_SECONDS_REGEXP, HOURS_MINUTES_REGEXP, HOURS_ONLY_REGEXP, SECONDS_PER_MINUTE, MINUTES_PER_HOUR, HOURS_PER_DAY, ARROW_UP_KEYCODE, ARROW_DOWN_KEYCODE, ARROW_LEFT_KEYCODE, ARROW_RIGHT_KEYCODE, MC_INPUT_VALUE_ACCESSOR, McTimepickerBase, McTimepickerMixinBase, McTimepicker, ɵ0, ɵ1 };
//# sourceMappingURL=timepicker.es5.js.map
