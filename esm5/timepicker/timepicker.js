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
export var MC_TIMEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return McTimepicker; })),
    multi: true
};
/**
 * \@docs-private
 * @type {?}
 */
export var MC_TIMEPICKER_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return McTimepicker; })),
    multi: true
};
/** @type {?} */
var uniqueComponentIdSuffix = 0;
/**
 * @template D
 */
var McTimepicker = /** @class */ (function () {
    function McTimepicker(elementRef, dateAdapter, renderer) {
        var _this = this;
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
        this.uid = "mc-timepicker-" + uniqueComponentIdSuffix++;
        this.parseValidator = (/**
         * @return {?}
         */
        function () {
            return _this.empty || _this.lastValueValid ? null : { mcTimepickerParse: { text: _this.viewValue } };
        });
        this.minValidator = (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            /** @type {?} */
            var controlValue = _this.getValidDateOrNull(_this.dateAdapter.deserialize(control.value));
            return (!_this.min || !controlValue || _this.compareTime(_this.min, controlValue) <= 0) ?
                null :
                { mcTimepickerLowerThenMin: { min: _this.min, actual: controlValue } };
        });
        this.maxValidator = (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            /** @type {?} */
            var controlValue = _this.getValidDateOrNull(_this.dateAdapter.deserialize(control.value));
            return (!_this.max || !controlValue || _this.compareTime(_this.max, controlValue) >= 0) ?
                null :
                { mcTimepickerHigherThenMax: { max: _this.max, actual: controlValue } };
        });
        // tslint:disable-next-line:no-empty
        this.validatorOnChange = (/**
         * @return {?}
         */
        function () { });
        if (!this.dateAdapter) {
            throw Error("McTimepicker: No provider found for DateAdapter. You must import one of the existing " +
                "modules at your application root or provide a custom implementation or use exists ones.");
        }
        this.validator = Validators.compose([this.parseValidator, this.minValidator, this.maxValidator]);
        this.onChange = noop;
        // Force setter to be called in case id was not specified.
        this.id = this.id;
        this.placeholder = TIMEFORMAT_PLACEHOLDERS[DEFAULT_TIME_FORMAT];
    }
    Object.defineProperty(McTimepicker.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
        get: /**
         * @return {?}
         */
        function () {
            return this._id;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._id = value || this.uid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "required", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            return this._required;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._required = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "format", {
        get: /**
         * @return {?}
         */
        function () {
            return this._format;
        },
        set: /**
         * @param {?} formatValue
         * @return {?}
         */
        function (formatValue) {
            this._format = Object
                .keys(TimeFormats)
                .map((/**
             * @param {?} timeFormatKey
             * @return {?}
             */
            function (timeFormatKey) { return TimeFormats[timeFormatKey]; }))
                .indexOf(formatValue) > -1 ? formatValue : DEFAULT_TIME_FORMAT;
            this.placeholder = TIMEFORMAT_PLACEHOLDERS[this._format];
            if (this.value) {
                this.updateView();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "min", {
        get: /**
         * @return {?}
         */
        function () {
            return this._min;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._min = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            this.validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "max", {
        get: /**
         * @return {?}
         */
        function () {
            return this._max;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._max = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            this.validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var newValue = this.dateAdapter.deserialize(value);
            this.lastValueValid = !newValue || this.dateAdapter.isValid(newValue);
            this._value = this.getValidDateOrNull(newValue);
            this.updateView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "viewValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elementRef.nativeElement.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "ngControl", {
        get: /**
         * @return {?}
         */
        function () {
            return this.control;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "empty", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            return !this.viewValue && !this.isBadInput();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "selectionStart", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elementRef.nativeElement.selectionStart;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.elementRef.nativeElement.selectionStart = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "selectionEnd", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elementRef.nativeElement.selectionEnd;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.elementRef.nativeElement.selectionEnd = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McTimepicker.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stateChanges.complete();
    };
    /**
     * @return {?}
     */
    McTimepicker.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.elementRef.nativeElement.focus();
    };
    /**
     * @param {?} isFocused
     * @return {?}
     */
    McTimepicker.prototype.focusChanged = /**
     * @param {?} isFocused
     * @return {?}
     */
    function (isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.onTouched();
            this.stateChanges.next();
        }
    };
    /**
     * @return {?}
     */
    McTimepicker.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this.lastValueValid = !!this.getDateFromTimeString(this.viewValue);
        this.control.updateValueAndValidity();
        this.focusChanged(false);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    McTimepicker.prototype.onPaste = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var newTimeObj = this.getDateFromTimeString($event.clipboardData.getData('text'));
        if (!newTimeObj) {
            return;
        }
        $event.preventDefault();
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.getTimeStringFromDate(newTimeObj, this.format));
        this.value = newTimeObj;
        this.onChange(newTimeObj);
        this.stateChanges.next();
    };
    /**
     * @return {?}
     */
    McTimepicker.prototype.onInput = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var newTimeObj = this.getDateFromTimeString(this.viewValue);
        if (!newTimeObj) {
            return;
        }
        /** @type {?} */
        var selectionStart = this.selectionStart;
        /** @type {?} */
        var selectionEnd = this.selectionEnd;
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.getTimeStringFromDate(newTimeObj, this.format));
        this.selectionStart = selectionStart;
        this.selectionEnd = selectionEnd;
        this.createSelectionOfTimeComponentInInput(((/** @type {?} */ (selectionStart))) + 1);
        this.onChange(newTimeObj);
        this.stateChanges.next();
    };
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    McTimepicker.prototype.onContainerClick = /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    function () {
        this.focus();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McTimepicker.prototype.onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        // tslint:disable-next-line: deprecation
        /** @type {?} */
        var keyCode = event.keyCode;
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
        function () { return _this.onInput(); }));
    };
    /**
     * @param {?} control
     * @return {?}
     */
    McTimepicker.prototype.validate = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        this.setControl(control);
        return this.validator ? this.validator(control) : null;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    McTimepicker.prototype.registerOnValidatorChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.validatorOnChange = fn;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    McTimepicker.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    McTimepicker.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    McTimepicker.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    McTimepicker.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /** Checks whether the input is invalid based on the native validation. */
    /**
     * Checks whether the input is invalid based on the native validation.
     * @private
     * @return {?}
     */
    McTimepicker.prototype.isBadInput = /**
     * Checks whether the input is invalid based on the native validation.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var validity = ((/** @type {?} */ (this.elementRef.nativeElement))).validity;
        return validity && validity.badInput;
    };
    /**
     * @private
     * @param {?} keyCode
     * @return {?}
     */
    McTimepicker.prototype.verticalArrowKeyHandler = /**
     * @private
     * @param {?} keyCode
     * @return {?}
     */
    function (keyCode) {
        if (!this.value) {
            return;
        }
        /** @type {?} */
        var changedTime;
        /** @type {?} */
        var newEditParams = this.getTimeEditMetrics((/** @type {?} */ (this.selectionStart)));
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
    };
    /**
     * @private
     * @param {?} keyCode
     * @return {?}
     */
    McTimepicker.prototype.horizontalArrowKeyHandler = /**
     * @private
     * @param {?} keyCode
     * @return {?}
     */
    function (keyCode) {
        if (!this.value) {
            return;
        }
        /** @type {?} */
        var cursorPos = (/** @type {?} */ (this.selectionStart));
        if (keyCode === LEFT_ARROW) {
            cursorPos = cursorPos === 0 ? this.viewValue.length : cursorPos - 1;
        }
        else if (keyCode === RIGHT_ARROW) {
            /** @type {?} */
            var nextDividerPos = this.viewValue.indexOf(':', cursorPos);
            cursorPos = nextDividerPos ? nextDividerPos + 1 : 0;
        }
        this.createSelectionOfTimeComponentInInput(cursorPos);
    };
    /**
     * @private
     * @param {?} cursorPos
     * @return {?}
     */
    McTimepicker.prototype.createSelectionOfTimeComponentInInput = /**
     * @private
     * @param {?} cursorPos
     * @return {?}
     */
    function (cursorPos) {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var newEditParams = _this.getTimeEditMetrics(cursorPos);
            _this.selectionStart = newEditParams.cursorStartPosition;
            _this.selectionEnd = newEditParams.cursorEndPosition;
        }));
    };
    /**
     * @private
     * @param {?} dateVal
     * @param {?=} whatToIncrement
     * @return {?}
     */
    McTimepicker.prototype.incrementTime = /**
     * @private
     * @param {?} dateVal
     * @param {?=} whatToIncrement
     * @return {?}
     */
    function (dateVal, whatToIncrement) {
        if (whatToIncrement === void 0) { whatToIncrement = TimeParts.seconds; }
        /** @type {?} */
        var hours = this.dateAdapter.getHours(dateVal);
        /** @type {?} */
        var minutes = this.dateAdapter.getMinutes(dateVal);
        /** @type {?} */
        var seconds = this.dateAdapter.getSeconds(dateVal);
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
    };
    /**
     * @private
     * @param {?} dateVal
     * @param {?=} whatToDecrement
     * @return {?}
     */
    McTimepicker.prototype.decrementTime = /**
     * @private
     * @param {?} dateVal
     * @param {?=} whatToDecrement
     * @return {?}
     */
    function (dateVal, whatToDecrement) {
        if (whatToDecrement === void 0) { whatToDecrement = TimeParts.seconds; }
        /** @type {?} */
        var hours = this.dateAdapter.getHours(dateVal);
        /** @type {?} */
        var minutes = this.dateAdapter.getMinutes(dateVal);
        /** @type {?} */
        var seconds = this.dateAdapter.getSeconds(dateVal);
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
    };
    /**
     * @description Get params for arrow-keys (up/down) time valie edit.
     * @param cursorPosition Current cursor position in timeString
     */
    /**
     * \@description Get params for arrow-keys (up/down) time valie edit.
     * @private
     * @param {?} cursorPosition Current cursor position in timeString
     * @return {?}
     */
    McTimepicker.prototype.getTimeEditMetrics = /**
     * \@description Get params for arrow-keys (up/down) time valie edit.
     * @private
     * @param {?} cursorPosition Current cursor position in timeString
     * @return {?}
     */
    function (cursorPosition) {
        /** @type {?} */
        var timeString = this.viewValue;
        /** @type {?} */
        var modifiedTimePart;
        /** @type {?} */
        var cursorStartPosition;
        /** @type {?} */
        var cursorEndPosition;
        /** @type {?} */
        var hoursIndex = 0;
        /** @type {?} */
        var minutesIndex = timeString.indexOf(':', hoursIndex + 1);
        /** @type {?} */
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
        return { modifiedTimePart: modifiedTimePart, cursorStartPosition: cursorStartPosition, cursorEndPosition: cursorEndPosition };
    };
    /**
     * @description Create time string for displaying inside input element of UI
     */
    /**
     * \@description Create time string for displaying inside input element of UI
     * @private
     * @param {?} value
     * @param {?} timeFormat
     * @return {?}
     */
    McTimepicker.prototype.getTimeStringFromDate = /**
     * \@description Create time string for displaying inside input element of UI
     * @private
     * @param {?} value
     * @param {?} timeFormat
     * @return {?}
     */
    function (value, timeFormat) {
        if (!value || !this.dateAdapter.isValid(value)) {
            return '';
        }
        return this.dateAdapter.format(value, timeFormat);
    };
    /**
     * @private
     * @param {?} timeString
     * @return {?}
     */
    McTimepicker.prototype.getDateFromTimeString = /**
     * @private
     * @param {?} timeString
     * @return {?}
     */
    function (timeString) {
        if (!timeString) {
            return null;
        }
        /** @type {?} */
        var hoursAndMinutesAndSeconds = timeString.match(HOURS_MINUTES_SECONDS_REGEXP);
        /** @type {?} */
        var hoursAndMinutes = timeString.match(HOURS_MINUTES_REGEXP);
        /** @type {?} */
        var hoursOnly = timeString.match(HOURS_ONLY_REGEXP);
        /** @type {?} */
        var hoursAndMinutesInAmPm = timeString.match(AM_PM_FORMAT_REGEXP);
        /** @type {?} */
        var hours = 0;
        /** @type {?} */
        var minutes = 0;
        /** @type {?} */
        var seconds = 0;
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
        var resultDate = this.dateAdapter.createDateTime(this.dateAdapter.getYear(this.value), this.dateAdapter.getMonth(this.value), this.dateAdapter.getDate(this.value), hours, minutes, seconds, this.dateAdapter.getMilliseconds(this.value));
        return this.getValidDateOrNull(resultDate);
    };
    /**
     * @private
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    McTimepicker.prototype.compareTime = /**
     * @private
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    function (first, second) {
        /** @type {?} */
        var result = this.dateAdapter.getHours(first) - this.dateAdapter.getHours(second) ||
            this.dateAdapter.getMinutes(first) - this.dateAdapter.getMinutes(second);
        if (TimeFormats.HHmm === this.format) {
            return result;
        }
        else if (TimeFormats.HHmmss === this.format) {
            return result || this.dateAdapter.getSeconds(first) - this.dateAdapter.getSeconds(second);
        }
        else {
            throw Error("Unknown format: " + this.format);
        }
    };
    /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    McTimepicker.prototype.getValidDateOrNull = /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    };
    /**
     * @private
     * @return {?}
     */
    McTimepicker.prototype.updateView = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var formattedValue = this.getTimeStringFromDate(this.value, this.format);
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', formattedValue);
    };
    /**
     * @private
     * @param {?} control
     * @return {?}
     */
    McTimepicker.prototype.setControl = /**
     * @private
     * @param {?} control
     * @return {?}
     */
    function (control) {
        if (!this.control) {
            this.control = control;
        }
    };
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
    McTimepicker.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DateAdapter, decorators: [{ type: Optional }] },
        { type: Renderer2 }
    ]; };
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
    return McTimepicker;
}());
export { McTimepicker };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy90aW1lcGlja2VyLyIsInNvdXJjZXMiOlsidGltZXBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFVBQVUsRUFDVixLQUFLLEVBRUwsUUFBUSxFQUNSLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBR0gsYUFBYSxFQUNiLGlCQUFpQixFQUlqQixVQUFVLEVBQ2IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUNILFNBQVMsRUFDVCxNQUFNLEVBQ04sVUFBVSxFQUNWLGNBQWMsRUFDZCxVQUFVLEVBQ1YsV0FBVyxFQUNYLFFBQVEsRUFDWCxNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXJDLE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLG9CQUFvQixFQUNwQiw0QkFBNEIsRUFDNUIsaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixrQkFBa0IsRUFDbEIsdUJBQXVCLEVBQ3ZCLFdBQVcsRUFDWCxTQUFTLEVBQ1QsbUJBQW1CLEVBQ3RCLE1BQU0sd0JBQXdCLENBQUM7Ozs7O0FBSWhDLE1BQU0sS0FBTyw0QkFBNEIsR0FBUTtJQUM3QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxjQUFNLE9BQUEsWUFBWSxFQUFaLENBQVksRUFBQztJQUMzQyxLQUFLLEVBQUUsSUFBSTtDQUNkOzs7OztBQUdE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akMsaUNBQTJCOzs7OztJQVczQiwyQkFBb0I7Ozs7O0lBZXBCLGlDQUEyQjs7Ozs7SUFvQjNCLCtCQUFtRDs7Ozs7SUFZbkQsNEJBQThCOzs7OztJQVk5Qiw0QkFBOEI7Ozs7O0lBaUI5Qiw4QkFBeUI7Ozs7O0lBa0N6QiwyQkFBb0U7Ozs7O0lBRXBFLGlDQUFzQzs7Ozs7SUFFdEMsZ0NBQXVDOzs7OztJQUN2QyxpQ0FBOEI7Ozs7O0lBcVc5QixzQ0FFQzs7Ozs7SUFFRCxvQ0FNQzs7Ozs7SUFFRCxvQ0FNQzs7Ozs7SUFnQ0QseUNBQXFDOzs7OztJQXBaakMsa0NBQXVDOzs7OztJQUN2QyxtQ0FBaUQ7Ozs7O0lBQ2pELGdDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9wdGlvbmFsLFxuICAgIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQWJzdHJhY3RDb250cm9sLFxuICAgIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIE5HX1ZBTElEQVRPUlMsXG4gICAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgVmFsaWRhdGlvbkVycm9ycyxcbiAgICBWYWxpZGF0b3IsXG4gICAgVmFsaWRhdG9yRm4sXG4gICAgVmFsaWRhdG9yc1xufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9kYXRldGltZSc7XG5pbXBvcnQge1xuICAgIEJBQ0tTUEFDRSxcbiAgICBERUxFVEUsXG4gICAgRE9XTl9BUlJPVyxcbiAgICBoYXNNb2RpZmllcktleSxcbiAgICBMRUZUX0FSUk9XLFxuICAgIFJJR0hUX0FSUk9XLFxuICAgIFVQX0FSUk9XXG59IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBNY0Zvcm1GaWVsZENvbnRyb2wgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBub29wLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7XG4gICAgREVGQVVMVF9USU1FX0ZPUk1BVCxcbiAgICBIT1VSU19QRVJfREFZLFxuICAgIEhPVVJTX01JTlVURVNfUkVHRVhQLFxuICAgIEhPVVJTX01JTlVURVNfU0VDT05EU19SRUdFWFAsXG4gICAgSE9VUlNfT05MWV9SRUdFWFAsXG4gICAgTUlOVVRFU19QRVJfSE9VUixcbiAgICBTRUNPTkRTX1BFUl9NSU5VVEUsXG4gICAgVElNRUZPUk1BVF9QTEFDRUhPTERFUlMsXG4gICAgVGltZUZvcm1hdHMsXG4gICAgVGltZVBhcnRzLFxuICAgIEFNX1BNX0ZPUk1BVF9SRUdFWFBcbn0gZnJvbSAnLi90aW1lcGlja2VyLmNvbnN0YW50cyc7XG5cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19USU1FUElDS0VSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWNUaW1lcGlja2VyKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19USU1FUElDS0VSX1ZBTElEQVRPUlM6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1jVGltZXBpY2tlciksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cblxubGV0IHVuaXF1ZUNvbXBvbmVudElkU3VmZml4OiBudW1iZXIgPSAwO1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnaW5wdXRbbWNUaW1lcGlja2VyXScsXG4gICAgZXhwb3J0QXM6ICdtY1RpbWVwaWNrZXJJbnB1dCcsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRpbWVwaWNrZXIgbWMtaW5wdXQnLFxuICAgICAgICAvLyBOYXRpdmUgaW5wdXQgcHJvcGVydGllcyB0aGF0IGFyZSBvdmVyd3JpdHRlbiBieSBBbmd1bGFyIGlucHV0cyBuZWVkIHRvIGJlIHN5bmNlZCB3aXRoXG4gICAgICAgIC8vIHRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudC4gT3RoZXJ3aXNlIHByb3BlcnR5IGJpbmRpbmdzIGZvciB0aG9zZSBkb24ndCB3b3JrLlxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAgICAgJ1thdHRyLnBsYWNlaG9sZGVyXSc6ICdwbGFjZWhvbGRlcicsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgICAgICdbYXR0ci5yZXF1aXJlZF0nOiAncmVxdWlyZWQnLFxuXG4gICAgICAgICcoYmx1ciknOiAnb25CbHVyKCknLFxuICAgICAgICAnKGZvY3VzKSc6ICdmb2N1c0NoYW5nZWQodHJ1ZSknLFxuXG4gICAgICAgICcocGFzdGUpJzogJ29uUGFzdGUoJGV2ZW50KScsXG5cbiAgICAgICAgJyhrZXlkb3duKSc6ICdvbktleURvd24oJGV2ZW50KSdcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBNQ19USU1FUElDS0VSX1ZBTElEQVRPUlMsXG4gICAgICAgIE1DX1RJTUVQSUNLRVJfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIHsgcHJvdmlkZTogTWNGb3JtRmllbGRDb250cm9sLCB1c2VFeGlzdGluZzogTWNUaW1lcGlja2VyIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jVGltZXBpY2tlcjxEPiBpbXBsZW1lbnRzIE1jRm9ybUZpZWxkQ29udHJvbDxEPiwgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yIHtcbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgcmVhZG9ubHkgc3RhdGVDaGFuZ2VzOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIHJlYWRvbmx5IGVycm9yU3RhdGU6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGNvbnRyb2xUeXBlOiBzdHJpbmcgPSAnbWMtdGltZXBpY2tlcic7XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgICBwcml2YXRlIGxhc3RWYWx1ZVZhbGlkID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgICAgICAvLyBCcm93c2VycyBtYXkgbm90IGZpcmUgdGhlIGJsdXIgZXZlbnQgaWYgdGhlIGlucHV0IGlzIGRpc2FibGVkIHRvbyBxdWlja2x5LlxuICAgICAgICAvLyBSZXNldCBmcm9tIGhlcmUgdG8gZW5zdXJlIHRoYXQgdGhlIGVsZW1lbnQgZG9lc24ndCBiZWNvbWUgc3R1Y2suXG4gICAgICAgIGlmICh0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cblxuICAgIHNldCBpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2lkID0gdmFsdWUgfHwgdGhpcy51aWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVpcmVkO1xuICAgIH1cblxuICAgIHNldCByZXF1aXJlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9yZXF1aXJlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBmb3JtYXQoKTogVGltZUZvcm1hdHMge1xuICAgICAgICByZXR1cm4gdGhpcy5fZm9ybWF0O1xuICAgIH1cblxuICAgIHNldCBmb3JtYXQoZm9ybWF0VmFsdWU6IFRpbWVGb3JtYXRzKSB7XG4gICAgICAgIHRoaXMuX2Zvcm1hdCA9IE9iamVjdFxuICAgICAgICAgICAgLmtleXMoVGltZUZvcm1hdHMpXG4gICAgICAgICAgICAubWFwKCh0aW1lRm9ybWF0S2V5KSA9PiBUaW1lRm9ybWF0c1t0aW1lRm9ybWF0S2V5XSlcbiAgICAgICAgICAgIC5pbmRleE9mKGZvcm1hdFZhbHVlKSA+IC0xID8gZm9ybWF0VmFsdWUgOiBERUZBVUxUX1RJTUVfRk9STUFUO1xuXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBUSU1FRk9STUFUX1BMQUNFSE9MREVSU1t0aGlzLl9mb3JtYXRdO1xuXG4gICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2Zvcm1hdDogVGltZUZvcm1hdHMgPSBERUZBVUxUX1RJTUVfRk9STUFUO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWluKCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbjtcbiAgICB9XG5cbiAgICBzZXQgbWluKHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9taW4gPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9taW46IEQgfCBudWxsID0gbnVsbDtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1heCgpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXg7XG4gICAgfVxuXG4gICAgc2V0IG1heCh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbWF4ID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgICAgICB0aGlzLnZhbGlkYXRvck9uQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWF4OiBEIHwgbnVsbCA9IG51bGw7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9ICFuZXdWYWx1ZSB8fCB0aGlzLmRhdGVBZGFwdGVyLmlzVmFsaWQobmV3VmFsdWUpO1xuXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwobmV3VmFsdWUpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3ZhbHVlOiBEIHwgbnVsbDtcblxuICAgIGdldCB2aWV3VmFsdWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgIH1cblxuICAgIGdldCBuZ0NvbnRyb2woKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMudmlld1ZhbHVlICYmICF0aGlzLmlzQmFkSW5wdXQoKTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0aW9uU3RhcnQoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0aW9uU3RhcnQodmFsdWU6IG51bWJlciB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0aW9uRW5kKCk6IG51bWJlciB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3Rpb25FbmQodmFsdWU6IG51bWJlciB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWFkb25seSB1aWQgPSBgbWMtdGltZXBpY2tlci0ke3VuaXF1ZUNvbXBvbmVudElkU3VmZml4Kyt9YDtcblxuICAgIHByaXZhdGUgdmFsaWRhdG9yOiBWYWxpZGF0b3JGbiB8IG51bGw7XG5cbiAgICBwcml2YXRlIG9uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZDtcbiAgICBwcml2YXRlIG9uVG91Y2hlZDogKCkgPT4gdm9pZDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPGFueT4sXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICAgICkge1xuICAgICAgICBpZiAoIXRoaXMuZGF0ZUFkYXB0ZXIpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBNY1RpbWVwaWNrZXI6IE5vIHByb3ZpZGVyIGZvdW5kIGZvciBEYXRlQWRhcHRlci4gWW91IG11c3QgaW1wb3J0IG9uZSBvZiB0aGUgZXhpc3RpbmcgYCArXG4gICAgICAgICAgICAgICAgYG1vZHVsZXMgYXQgeW91ciBhcHBsaWNhdGlvbiByb290IG9yIHByb3ZpZGUgYSBjdXN0b20gaW1wbGVtZW50YXRpb24gb3IgdXNlIGV4aXN0cyBvbmVzLmApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBWYWxpZGF0b3JzLmNvbXBvc2UoW3RoaXMucGFyc2VWYWxpZGF0b3IsIHRoaXMubWluVmFsaWRhdG9yLCB0aGlzLm1heFZhbGlkYXRvcl0pO1xuXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBub29wO1xuXG4gICAgICAgIC8vIEZvcmNlIHNldHRlciB0byBiZSBjYWxsZWQgaW4gY2FzZSBpZCB3YXMgbm90IHNwZWNpZmllZC5cbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuaWQ7XG5cbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IFRJTUVGT1JNQVRfUExBQ0VIT0xERVJTW0RFRkFVTFRfVElNRV9GT1JNQVRdO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIGZvY3VzQ2hhbmdlZChpc0ZvY3VzZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzRm9jdXNlZCAhPT0gdGhpcy5mb2N1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSBpc0ZvY3VzZWQ7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25CbHVyKCkge1xuICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gISF0aGlzLmdldERhdGVGcm9tVGltZVN0cmluZyh0aGlzLnZpZXdWYWx1ZSk7XG4gICAgICAgIHRoaXMuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgIHRoaXMuZm9jdXNDaGFuZ2VkKGZhbHNlKTtcbiAgICB9XG5cbiAgICBvblBhc3RlKCRldmVudCkge1xuICAgICAgICBjb25zdCBuZXdUaW1lT2JqID0gdGhpcy5nZXREYXRlRnJvbVRpbWVTdHJpbmcoJGV2ZW50LmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dCcpKTtcblxuICAgICAgICBpZiAoIW5ld1RpbWVPYmopIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgICAgIHRoaXMuZ2V0VGltZVN0cmluZ0Zyb21EYXRlKG5ld1RpbWVPYmosIHRoaXMuZm9ybWF0KVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMudmFsdWUgPSBuZXdUaW1lT2JqO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKG5ld1RpbWVPYmopO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgb25JbnB1dCgpIHtcbiAgICAgICAgY29uc3QgbmV3VGltZU9iaiA9IHRoaXMuZ2V0RGF0ZUZyb21UaW1lU3RyaW5nKHRoaXMudmlld1ZhbHVlKTtcblxuICAgICAgICBpZiAoIW5ld1RpbWVPYmopIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICBjb25zdCBzZWxlY3Rpb25FbmQgPSB0aGlzLnNlbGVjdGlvbkVuZDtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAndmFsdWUnLFxuICAgICAgICAgICAgdGhpcy5nZXRUaW1lU3RyaW5nRnJvbURhdGUobmV3VGltZU9iaiwgdGhpcy5mb3JtYXQpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0O1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZDtcblxuICAgICAgICB0aGlzLmNyZWF0ZVNlbGVjdGlvbk9mVGltZUNvbXBvbmVudEluSW5wdXQoKHNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgKyAxKTtcblxuICAgICAgICB0aGlzLm9uQ2hhbmdlKG5ld1RpbWVPYmopO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uQ29udGFpbmVyQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcblxuICAgICAgICBpZiAoaGFzTW9kaWZpZXJLZXkoZXZlbnQpIHx8IFtCQUNLU1BBQ0UsIERFTEVURV0uaW5jbHVkZXMoa2V5Q29kZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChbVVBfQVJST1csIERPV05fQVJST1ddLmluY2x1ZGVzKGtleUNvZGUpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLnZlcnRpY2FsQXJyb3dLZXlIYW5kbGVyKGtleUNvZGUpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoW0xFRlRfQVJST1csIFJJR0hUX0FSUk9XXS5pbmNsdWRlcyhrZXlDb2RlKSkge1xuICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsQXJyb3dLZXlIYW5kbGVyKGtleUNvZGUpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMub25JbnB1dCgpKTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZShjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgICAgIHRoaXMuc2V0Q29udHJvbChjb250cm9sKTtcblxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3IgPyB0aGlzLnZhbGlkYXRvcihjb250cm9sKSA6IG51bGw7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblZhbGlkYXRvckNoYW5nZShmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbGlkYXRvck9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogRCB8IG51bGwpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogRCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBpbnZhbGlkIGJhc2VkIG9uIHRoZSBuYXRpdmUgdmFsaWRhdGlvbi4gKi9cbiAgICBwcml2YXRlIGlzQmFkSW5wdXQoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHZhbGlkaXR5ID0gKDxIVE1MSW5wdXRFbGVtZW50PiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkudmFsaWRpdHk7XG5cbiAgICAgICAgcmV0dXJuIHZhbGlkaXR5ICYmIHZhbGlkaXR5LmJhZElucHV0O1xuICAgIH1cblxuICAgIHByaXZhdGUgdmVydGljYWxBcnJvd0tleUhhbmRsZXIoa2V5Q29kZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy52YWx1ZSkgeyByZXR1cm47IH1cblxuICAgICAgICBsZXQgY2hhbmdlZFRpbWU7XG5cbiAgICAgICAgY29uc3QgbmV3RWRpdFBhcmFtcyA9IHRoaXMuZ2V0VGltZUVkaXRNZXRyaWNzKHRoaXMuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKTtcblxuICAgICAgICBpZiAoa2V5Q29kZSA9PT0gVVBfQVJST1cpIHtcbiAgICAgICAgICAgIGNoYW5nZWRUaW1lID0gdGhpcy5pbmNyZW1lbnRUaW1lKHRoaXMudmFsdWUsIG5ld0VkaXRQYXJhbXMubW9kaWZpZWRUaW1lUGFydCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5Q29kZSA9PT0gRE9XTl9BUlJPVykge1xuICAgICAgICAgICAgY2hhbmdlZFRpbWUgPSB0aGlzLmRlY3JlbWVudFRpbWUodGhpcy52YWx1ZSwgbmV3RWRpdFBhcmFtcy5tb2RpZmllZFRpbWVQYXJ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmFsdWUgPSBjaGFuZ2VkVGltZTtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gbmV3RWRpdFBhcmFtcy5jdXJzb3JTdGFydFBvc2l0aW9uO1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkVuZCA9IG5ld0VkaXRQYXJhbXMuY3Vyc29yRW5kUG9zaXRpb247XG5cbiAgICAgICAgdGhpcy5vbkNoYW5nZShjaGFuZ2VkVGltZSk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhvcml6b250YWxBcnJvd0tleUhhbmRsZXIoa2V5Q29kZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy52YWx1ZSkgeyByZXR1cm47IH1cblxuICAgICAgICBsZXQgY3Vyc29yUG9zID0gdGhpcy5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXI7XG5cbiAgICAgICAgaWYgKGtleUNvZGUgPT09IExFRlRfQVJST1cpIHtcbiAgICAgICAgICAgIGN1cnNvclBvcyA9IGN1cnNvclBvcyA9PT0gMCA/IHRoaXMudmlld1ZhbHVlLmxlbmd0aCA6IGN1cnNvclBvcyAtIDE7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gUklHSFRfQVJST1cpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHREaXZpZGVyUG9zOiBudW1iZXIgPSB0aGlzLnZpZXdWYWx1ZS5pbmRleE9mKCc6JywgY3Vyc29yUG9zKTtcblxuICAgICAgICAgICAgY3Vyc29yUG9zID0gbmV4dERpdmlkZXJQb3MgPyBuZXh0RGl2aWRlclBvcyArIDEgOiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jcmVhdGVTZWxlY3Rpb25PZlRpbWVDb21wb25lbnRJbklucHV0KGN1cnNvclBvcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVTZWxlY3Rpb25PZlRpbWVDb21wb25lbnRJbklucHV0KGN1cnNvclBvczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3RWRpdFBhcmFtcyA9IHRoaXMuZ2V0VGltZUVkaXRNZXRyaWNzKGN1cnNvclBvcyk7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhcnQgPSBuZXdFZGl0UGFyYW1zLmN1cnNvclN0YXJ0UG9zaXRpb247XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkVuZCA9IG5ld0VkaXRQYXJhbXMuY3Vyc29yRW5kUG9zaXRpb247XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5jcmVtZW50VGltZShkYXRlVmFsOiBELCB3aGF0VG9JbmNyZW1lbnQ6IFRpbWVQYXJ0cyA9IFRpbWVQYXJ0cy5zZWNvbmRzKTogRCB7XG4gICAgICAgIGxldCBob3VycyA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0SG91cnMoZGF0ZVZhbCk7XG4gICAgICAgIGxldCBtaW51dGVzID0gdGhpcy5kYXRlQWRhcHRlci5nZXRNaW51dGVzKGRhdGVWYWwpO1xuICAgICAgICBsZXQgc2Vjb25kcyA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0U2Vjb25kcyhkYXRlVmFsKTtcblxuICAgICAgICBzd2l0Y2ggKHdoYXRUb0luY3JlbWVudCkge1xuICAgICAgICAgICAgY2FzZSBUaW1lUGFydHMuaG91cnM6XG4gICAgICAgICAgICAgICAgaG91cnMrKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVGltZVBhcnRzLm1pbnV0ZXM6XG4gICAgICAgICAgICAgICAgbWludXRlcysrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUaW1lUGFydHMuc2Vjb25kczpcbiAgICAgICAgICAgICAgICBzZWNvbmRzKys7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY29uZHMgPiBTRUNPTkRTX1BFUl9NSU5VVEUpIHsgc2Vjb25kcyA9IDA7IH1cblxuICAgICAgICBpZiAobWludXRlcyA+IE1JTlVURVNfUEVSX0hPVVIpIHsgbWludXRlcyA9IDA7IH1cblxuICAgICAgICBpZiAoaG91cnMgPiBIT1VSU19QRVJfREFZKSB7IGhvdXJzID0gMDsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVBZGFwdGVyLmNyZWF0ZURhdGVUaW1lKFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMudmFsdWUpLFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLnZhbHVlKSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLnZhbHVlKSxcbiAgICAgICAgICAgIGhvdXJzLFxuICAgICAgICAgICAgbWludXRlcyxcbiAgICAgICAgICAgIHNlY29uZHMsXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbGxpc2Vjb25kcyh0aGlzLnZhbHVlKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVjcmVtZW50VGltZShkYXRlVmFsOiBELCB3aGF0VG9EZWNyZW1lbnQ6IFRpbWVQYXJ0cyA9IFRpbWVQYXJ0cy5zZWNvbmRzKTogRCB7XG4gICAgICAgIGxldCBob3VycyA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0SG91cnMoZGF0ZVZhbCk7XG4gICAgICAgIGxldCBtaW51dGVzID0gdGhpcy5kYXRlQWRhcHRlci5nZXRNaW51dGVzKGRhdGVWYWwpO1xuICAgICAgICBsZXQgc2Vjb25kcyA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0U2Vjb25kcyhkYXRlVmFsKTtcblxuICAgICAgICBzd2l0Y2ggKHdoYXRUb0RlY3JlbWVudCkge1xuICAgICAgICAgICAgY2FzZSBUaW1lUGFydHMuaG91cnM6XG4gICAgICAgICAgICAgICAgaG91cnMtLTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVGltZVBhcnRzLm1pbnV0ZXM6XG4gICAgICAgICAgICAgICAgbWludXRlcy0tO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUaW1lUGFydHMuc2Vjb25kczpcbiAgICAgICAgICAgICAgICBzZWNvbmRzLS07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY29uZHMgPCAwKSB7IHNlY29uZHMgPSBTRUNPTkRTX1BFUl9NSU5VVEU7IH1cblxuICAgICAgICBpZiAobWludXRlcyA8IDApIHsgbWludXRlcyA9IE1JTlVURVNfUEVSX0hPVVI7IH1cblxuICAgICAgICBpZiAoaG91cnMgPCAwKSB7IGhvdXJzID0gSE9VUlNfUEVSX0RBWTsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVBZGFwdGVyLmNyZWF0ZURhdGVUaW1lKFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMudmFsdWUpLFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLnZhbHVlKSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLnZhbHVlKSxcbiAgICAgICAgICAgIGhvdXJzLFxuICAgICAgICAgICAgbWludXRlcyxcbiAgICAgICAgICAgIHNlY29uZHMsXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbGxpc2Vjb25kcyh0aGlzLnZhbHVlKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgcGFyYW1zIGZvciBhcnJvdy1rZXlzICh1cC9kb3duKSB0aW1lIHZhbGllIGVkaXQuXG4gICAgICogQHBhcmFtIGN1cnNvclBvc2l0aW9uIEN1cnJlbnQgY3Vyc29yIHBvc2l0aW9uIGluIHRpbWVTdHJpbmdcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFRpbWVFZGl0TWV0cmljcyhjdXJzb3JQb3NpdGlvbjogbnVtYmVyKToge1xuICAgICAgICBtb2RpZmllZFRpbWVQYXJ0OiBUaW1lUGFydHM7XG4gICAgICAgIGN1cnNvclN0YXJ0UG9zaXRpb246IG51bWJlcjtcbiAgICAgICAgY3Vyc29yRW5kUG9zaXRpb246IG51bWJlcjtcbiAgICB9IHtcbiAgICAgICAgY29uc3QgdGltZVN0cmluZzogc3RyaW5nID0gdGhpcy52aWV3VmFsdWU7XG4gICAgICAgIGxldCBtb2RpZmllZFRpbWVQYXJ0OiBUaW1lUGFydHM7XG4gICAgICAgIGxldCBjdXJzb3JTdGFydFBvc2l0aW9uOiBudW1iZXI7XG4gICAgICAgIGxldCBjdXJzb3JFbmRQb3NpdGlvbjogbnVtYmVyO1xuXG4gICAgICAgIGNvbnN0IGhvdXJzSW5kZXggPSAwO1xuICAgICAgICBjb25zdCBtaW51dGVzSW5kZXggPSB0aW1lU3RyaW5nLmluZGV4T2YoJzonLCBob3Vyc0luZGV4ICsgMSk7XG4gICAgICAgIGNvbnN0IHNlY29uZHNJbmRleCA9IG1pbnV0ZXNJbmRleCAhPT0gLTEgPyB0aW1lU3RyaW5nLmluZGV4T2YoJzonLCBtaW51dGVzSW5kZXggKyAxKSA6IC0xO1xuXG4gICAgICAgIGlmIChzZWNvbmRzSW5kZXggIT09IC0xICYmIGN1cnNvclBvc2l0aW9uID4gc2Vjb25kc0luZGV4KSB7XG4gICAgICAgICAgICBtb2RpZmllZFRpbWVQYXJ0ID0gVGltZVBhcnRzLnNlY29uZHM7XG4gICAgICAgICAgICBjdXJzb3JTdGFydFBvc2l0aW9uID0gc2Vjb25kc0luZGV4ICsgMTtcbiAgICAgICAgICAgIGN1cnNvckVuZFBvc2l0aW9uID0gdGltZVN0cmluZy5sZW5ndGg7XG4gICAgICAgIH0gZWxzZSBpZiAobWludXRlc0luZGV4ICE9PSAtMSAmJiBjdXJzb3JQb3NpdGlvbiA+IG1pbnV0ZXNJbmRleCkge1xuICAgICAgICAgICAgbW9kaWZpZWRUaW1lUGFydCA9IFRpbWVQYXJ0cy5taW51dGVzO1xuICAgICAgICAgICAgY3Vyc29yU3RhcnRQb3NpdGlvbiA9IG1pbnV0ZXNJbmRleCArIDE7XG4gICAgICAgICAgICBjdXJzb3JFbmRQb3NpdGlvbiA9IHNlY29uZHNJbmRleCA+IC0xID8gc2Vjb25kc0luZGV4IDogdGltZVN0cmluZy5sZW5ndGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2RpZmllZFRpbWVQYXJ0ID0gVGltZVBhcnRzLmhvdXJzO1xuICAgICAgICAgICAgY3Vyc29yU3RhcnRQb3NpdGlvbiA9IGhvdXJzSW5kZXg7XG4gICAgICAgICAgICBjdXJzb3JFbmRQb3NpdGlvbiA9IG1pbnV0ZXNJbmRleCAhPT0gLTEgPyBtaW51dGVzSW5kZXggOiB0aW1lU3RyaW5nLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IG1vZGlmaWVkVGltZVBhcnQsIGN1cnNvclN0YXJ0UG9zaXRpb24sIGN1cnNvckVuZFBvc2l0aW9uIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIENyZWF0ZSB0aW1lIHN0cmluZyBmb3IgZGlzcGxheWluZyBpbnNpZGUgaW5wdXQgZWxlbWVudCBvZiBVSVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0VGltZVN0cmluZ0Zyb21EYXRlKHZhbHVlOiBEIHwgbnVsbCwgdGltZUZvcm1hdDogVGltZUZvcm1hdHMpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXZhbHVlIHx8ICF0aGlzLmRhdGVBZGFwdGVyLmlzVmFsaWQodmFsdWUpKSB7IHJldHVybiAnJzsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVBZGFwdGVyLmZvcm1hdCh2YWx1ZSwgdGltZUZvcm1hdCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREYXRlRnJvbVRpbWVTdHJpbmcodGltZVN0cmluZzogc3RyaW5nKTogRCB8IG51bGwge1xuICAgICAgICBpZiAoIXRpbWVTdHJpbmcpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICBjb25zdCBob3Vyc0FuZE1pbnV0ZXNBbmRTZWNvbmRzID0gdGltZVN0cmluZy5tYXRjaChIT1VSU19NSU5VVEVTX1NFQ09ORFNfUkVHRVhQKTtcbiAgICAgICAgY29uc3QgaG91cnNBbmRNaW51dGVzID0gdGltZVN0cmluZy5tYXRjaChIT1VSU19NSU5VVEVTX1JFR0VYUCk7XG4gICAgICAgIGNvbnN0IGhvdXJzT25seSA9IHRpbWVTdHJpbmcubWF0Y2goSE9VUlNfT05MWV9SRUdFWFApO1xuICAgICAgICBjb25zdCBob3Vyc0FuZE1pbnV0ZXNJbkFtUG0gPSB0aW1lU3RyaW5nLm1hdGNoKEFNX1BNX0ZPUk1BVF9SRUdFWFApO1xuXG4gICAgICAgIGxldCBob3VyczogbnVtYmVyID0gMDtcbiAgICAgICAgbGV0IG1pbnV0ZXM6IG51bWJlciA9IDA7XG4gICAgICAgIGxldCBzZWNvbmRzOiBudW1iZXIgPSAwO1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlOm5vLW1hZ2ljLW51bWJlcnNcbiAgICAgICAgaWYgKGhvdXJzQW5kTWludXRlc0luQW1QbSkge1xuICAgICAgICAgICAgaG91cnMgPSBOdW1iZXIoaG91cnNBbmRNaW51dGVzSW5BbVBtWzFdKTtcbiAgICAgICAgICAgIG1pbnV0ZXMgPSBOdW1iZXIoaG91cnNBbmRNaW51dGVzSW5BbVBtWzJdKTtcblxuICAgICAgICAgICAgaWYgKC9bcF0vaS50ZXN0KGhvdXJzQW5kTWludXRlc0luQW1QbVszXSkgfHwgKC9bYV0vaS50ZXN0KGhvdXJzQW5kTWludXRlc0luQW1QbVszXSkgJiYgaG91cnMgPT09IDEyKSkge1xuICAgICAgICAgICAgICAgIGhvdXJzICs9IDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGhvdXJzQW5kTWludXRlc0FuZFNlY29uZHMpIHtcbiAgICAgICAgICAgIGhvdXJzID0gTnVtYmVyKGhvdXJzQW5kTWludXRlc0FuZFNlY29uZHNbMV0pO1xuICAgICAgICAgICAgbWludXRlcyA9IE51bWJlcihob3Vyc0FuZE1pbnV0ZXNBbmRTZWNvbmRzWzJdKTtcbiAgICAgICAgICAgIHNlY29uZHMgPSBOdW1iZXIoaG91cnNBbmRNaW51dGVzQW5kU2Vjb25kc1szXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaG91cnNBbmRNaW51dGVzKSB7XG4gICAgICAgICAgICBob3VycyA9IE51bWJlcihob3Vyc0FuZE1pbnV0ZXNbMV0pO1xuICAgICAgICAgICAgbWludXRlcyA9IE51bWJlcihob3Vyc0FuZE1pbnV0ZXNbMl0pO1xuICAgICAgICB9IGVsc2UgaWYgKGhvdXJzT25seSkge1xuICAgICAgICAgICAgaG91cnMgPSBOdW1iZXIoaG91cnNPbmx5WzFdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRzbGludDplbmFibGVcblxuICAgICAgICBjb25zdCByZXN1bHREYXRlID0gdGhpcy5kYXRlQWRhcHRlci5jcmVhdGVEYXRlVGltZShcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLnZhbHVlKSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy52YWx1ZSksXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldERhdGUodGhpcy52YWx1ZSksXG4gICAgICAgICAgICBob3VycyxcbiAgICAgICAgICAgIG1pbnV0ZXMsXG4gICAgICAgICAgICBzZWNvbmRzLFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRNaWxsaXNlY29uZHModGhpcy52YWx1ZSlcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRWYWxpZERhdGVPck51bGwocmVzdWx0RGF0ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZVZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lbXB0eSB8fCB0aGlzLmxhc3RWYWx1ZVZhbGlkID8gbnVsbCA6IHsgbWNUaW1lcGlja2VyUGFyc2U6IHsgdGV4dDogdGhpcy52aWV3VmFsdWUgfSB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgbWluVmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZSkpO1xuXG4gICAgICAgIHJldHVybiAoIXRoaXMubWluIHx8ICFjb250cm9sVmFsdWUgfHwgdGhpcy5jb21wYXJlVGltZSh0aGlzLm1pbiwgY29udHJvbFZhbHVlKSA8PSAwKSA/XG4gICAgICAgICAgICBudWxsIDpcbiAgICAgICAgICAgIHsgbWNUaW1lcGlja2VyTG93ZXJUaGVuTWluOiB7IG1pbjogdGhpcy5taW4sIGFjdHVhbDogY29udHJvbFZhbHVlIH0gfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1heFZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICBjb25zdCBjb250cm9sVmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWUpKTtcblxuICAgICAgICByZXR1cm4gKCF0aGlzLm1heCB8fCAhY29udHJvbFZhbHVlIHx8IHRoaXMuY29tcGFyZVRpbWUodGhpcy5tYXgsIGNvbnRyb2xWYWx1ZSkgPj0gMCkgP1xuICAgICAgICAgICAgbnVsbCA6XG4gICAgICAgICAgICB7IG1jVGltZXBpY2tlckhpZ2hlclRoZW5NYXg6IHsgbWF4OiB0aGlzLm1heCwgYWN0dWFsOiBjb250cm9sVmFsdWUgfSB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgY29tcGFyZVRpbWUoZmlyc3Q6IEQsIHNlY29uZDogRCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0SG91cnMoZmlyc3QpIC0gdGhpcy5kYXRlQWRhcHRlci5nZXRIb3VycyhzZWNvbmQpIHx8XG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbnV0ZXMoZmlyc3QpIC0gdGhpcy5kYXRlQWRhcHRlci5nZXRNaW51dGVzKHNlY29uZCk7XG5cbiAgICAgICAgaWYgKFRpbWVGb3JtYXRzLkhIbW0gPT09IHRoaXMuZm9ybWF0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9IGVsc2UgaWYgKFRpbWVGb3JtYXRzLkhIbW1zcyA9PT0gdGhpcy5mb3JtYXQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQgfHwgdGhpcy5kYXRlQWRhcHRlci5nZXRTZWNvbmRzKGZpcnN0KSAtIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0U2Vjb25kcyhzZWNvbmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYFVua25vd24gZm9ybWF0OiAke3RoaXMuZm9ybWF0fWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRWYWxpZERhdGVPck51bGwob2JqOiBhbnkpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiAodGhpcy5kYXRlQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmIHRoaXMuZGF0ZUFkYXB0ZXIuaXNWYWxpZChvYmopKSA/IG9iaiA6IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVWaWV3KCkge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMuZ2V0VGltZVN0cmluZ0Zyb21EYXRlKHRoaXMudmFsdWUsIHRoaXMuZm9ybWF0KTtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCBmb3JtYXR0ZWRWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRDb250cm9sKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sID0gY29udHJvbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eVxuICAgIHByaXZhdGUgdmFsaWRhdG9yT25DaGFuZ2UgPSAoKSA9PiB7fTtcbn1cbiJdfQ==