/**
 * @fileoverview added by tsickle
 * Generated from: timepicker.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends, __read, __spread } from "tslib";
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
var uniqueComponentIdSuffix = 0;
var McTimepickerBase = /** @class */ (function () {
    function McTimepickerBase(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
        this.defaultErrorStateMatcher = defaultErrorStateMatcher;
        this.parentForm = parentForm;
        this.parentFormGroup = parentFormGroup;
        this.ngControl = ngControl;
    }
    return McTimepickerBase;
}());
export { McTimepickerBase };
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
export var McTimepickerMixinBase = mixinErrorState(McTimepickerBase);
/**
 * @template D
 */
var McTimepicker = /** @class */ (function (_super) {
    __extends(McTimepicker, _super);
    function McTimepicker(elementRef, ngControl, parentForm, parentFormGroup, defaultErrorStateMatcher, inputValueAccessor, renderer, dateAdapter) {
        var _this = _super.call(this, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) || this;
        _this.elementRef = elementRef;
        _this.ngControl = ngControl;
        _this.renderer = renderer;
        _this.dateAdapter = dateAdapter;
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         */
        _this.stateChanges = new Subject();
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         */
        _this.focused = false;
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         */
        _this.controlType = 'mc-timepicker';
        _this._minTime = null;
        _this._maxTime = null;
        _this.uid = "mc-timepicker-" + uniqueComponentIdSuffix++;
        if (!_this.dateAdapter) {
            throw Error("McTimepicker: No provider found for DateAdapter. You must import one of the existing " +
                "modules at your application root or provide a custom implementation or use exists ones.");
        }
        // If no input value accessor was explicitly specified, use the element as the input value
        // accessor.
        _this.inputValueAccessor = inputValueAccessor || _this.elementRef.nativeElement;
        _this.previousNativeValue = _this.value;
        _this.onChange = noop;
        // Force setter to be called in case id was not specified.
        _this.id = _this.id;
        _this.placeholder = TIMEFORMAT_PLACEHOLDERS[DEFAULT_TIME_FORMAT];
        if (_this.ngControl) {
            // Instead of NG_VALUE_ACCESSOR (https://github.com/angular/material2/issues/8158#issuecomment-344618103)
            _this.ngControl.valueAccessor = _this;
            // To avoid cyclic dependency https://stackoverflow.com/a/49578414
            /** @type {?} */
            var control = (/** @type {?} */ (_this.ngControl.control));
            /** @type {?} */
            var myValidators = [
                (/**
                 * @return {?}
                 */
                function () { return _this.parseValidator(); }),
                (/**
                 * @return {?}
                 */
                function () { return _this.minTimeValidator(); }),
                (/**
                 * @return {?}
                 */
                function () { return _this.maxTimeValidator(); })
            ];
            /** @type {?} */
            var validators = control.validator
                ? __spread([control.validator], myValidators) : myValidators;
            control.setValidators(validators);
            control.updateValueAndValidity();
        }
        return _this;
    }
    Object.defineProperty(McTimepicker.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.ngControl && this.ngControl.disabled !== null) {
                return this.ngControl.disabled;
            }
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
    Object.defineProperty(McTimepicker.prototype, "value", {
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
            return this.inputValueAccessor.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this.value) {
                this.inputValueAccessor.value = value;
                this.applyInputChanges();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "timeFormat", {
        get: /**
         * @return {?}
         */
        function () {
            return this._timeFormat;
        },
        set: /**
         * @param {?} formatValue
         * @return {?}
         */
        function (formatValue) {
            var _this = this;
            this._timeFormat = Object
                .keys(TimeFormats)
                .map((/**
             * @param {?} timeFormatKey
             * @return {?}
             */
            function (timeFormatKey) { return TimeFormats[timeFormatKey]; }))
                .indexOf(formatValue) > -1 ? formatValue : DEFAULT_TIME_FORMAT;
            this.placeholder = TIMEFORMAT_PLACEHOLDERS[this._timeFormat];
            setTimeout((/**
             * @return {?}
             */
            function () { return _this.applyInputChanges({ doTimestringReformat: true }); }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "minTime", {
        get: /**
         * @return {?}
         */
        function () {
            return this._minTime;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._minTime = value;
            ((/** @type {?} */ (this.ngControl.control))).updateValueAndValidity();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "maxTime", {
        get: /**
         * @return {?}
         */
        function () {
            return this._maxTime;
        },
        set: /**
         * @param {?} maxValue
         * @return {?}
         */
        function (maxValue) {
            this._maxTime = maxValue;
            ((/** @type {?} */ (this.ngControl.control))).updateValueAndValidity();
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
    McTimepicker.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
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
        this.applyInputChanges();
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
        $event.preventDefault();
        /** @type {?} */
        var clipboardUserInput = $event.clipboardData.getData('text');
        if (this.getDateFromTimeString(clipboardUserInput) === undefined) {
            return;
        }
        this.elementRef.nativeElement.value = clipboardUserInput;
        this.onInput();
    };
    /**
     * @return {?}
     */
    McTimepicker.prototype.onInput = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var initialCursorStart = this.elementRef.nativeElement.selectionStart;
        /** @type {?} */
        var initialCursorEnd = this.elementRef.nativeElement.selectionEnd;
        /** @type {?} */
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
        get: /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            return !this.elementRef.nativeElement.value && !this.isBadInput();
        },
        enumerable: true,
        configurable: true
    });
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
     * @param {?} value
     * @return {?}
     */
    McTimepicker.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== null) {
            this.saveOriginalValue(value);
            this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.getTimeStringFromDate(value, this.timeFormat));
            this.applyInputChanges();
        }
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
        /** @type {?} */
        var keyCode = this.getKeyCode(event);
        if (keyCode === ARROW_UP_KEYCODE || keyCode === ARROW_DOWN_KEYCODE) {
            this.upDownTimeByArrowKeys(event);
        }
        if (keyCode === ARROW_LEFT_KEYCODE || keyCode === ARROW_RIGHT_KEYCODE) {
            this.switchSelectionBetweenTimeparts(event);
        }
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
     * @param {?} value
     * @return {?}
     */
    McTimepicker.prototype.saveOriginalValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.dateAdapter.isValid(value)) {
            this.originalValue = value;
        }
    };
    /** Does some manual dirty checking on the native input `value` property. */
    /**
     * Does some manual dirty checking on the native input `value` property.
     * @private
     * @return {?}
     */
    McTimepicker.prototype.dirtyCheckNativeValue = /**
     * Does some manual dirty checking on the native input `value` property.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var newValue = this.value;
        if (this.previousNativeValue !== newValue) {
            this.previousNativeValue = newValue;
            this.stateChanges.next();
        }
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
     * @param {?=} applyParams
     * @return {?}
     */
    McTimepicker.prototype.applyInputChanges = /**
     * @private
     * @param {?=} applyParams
     * @return {?}
     */
    function (applyParams) {
        if (applyParams === void 0) { applyParams = {}; }
        var changedTime = applyParams.changedTime, _a = applyParams.doTimestringReformat, doTimestringReformat = _a === void 0 ? true : _a;
        /** @type {?} */
        var timeToApply = changedTime ||
            this.getDateFromTimeString(this.elementRef.nativeElement.value);
        this.currentDateTimeInput = timeToApply;
        if (doTimestringReformat && timeToApply !== undefined) {
            /** @type {?} */
            var selectionStart = this.elementRef.nativeElement.selectionStart;
            /** @type {?} */
            var selectionEnd = this.elementRef.nativeElement.selectionEnd;
            this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.getTimeStringFromDate(timeToApply, this.timeFormat));
            this.elementRef.nativeElement.selectionStart = selectionStart;
            this.elementRef.nativeElement.selectionEnd = selectionEnd;
        }
        ((/** @type {?} */ (this.ngControl.control))).updateValueAndValidity();
        /** @type {?} */
        var result = this.ngControl.errors === null && timeToApply !== undefined ? timeToApply : null;
        this.onChange(result);
        this.stateChanges.next();
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    McTimepicker.prototype.upDownTimeByArrowKeys = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        /** @type {?} */
        var changedTime = this.currentDateTimeInput;
        if (changedTime !== undefined) {
            /** @type {?} */
            var cursorPos = this.elementRef.nativeElement.selectionStart;
            /** @type {?} */
            var modifiedTimePart = this.getTimeEditMetrics(cursorPos)
                .modifiedTimePart;
            /** @type {?} */
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
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    McTimepicker.prototype.switchSelectionBetweenTimeparts = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var changedTime = this.currentDateTimeInput;
        /** @type {?} */
        var keyCode = this.getKeyCode(event);
        if (changedTime !== undefined) {
            /** @type {?} */
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
    /**
     * \@description Microsoft EDGE doesn't support KeyboaedEvent.code thus we need this helper
     * @private
     * @param {?} event
     * @return {?}
     */
    McTimepicker.prototype.getKeyCode = /**
     * \@description Microsoft EDGE doesn't support KeyboaedEvent.code thus we need this helper
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return event.code || event.key;
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
            _this.elementRef.nativeElement.selectionStart = newEditParams.cursorStartPosition;
            _this.elementRef.nativeElement.selectionEnd = newEditParams.cursorEndPosition;
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
        return (/** @type {?} */ (this.getDateFromTimeDigits(hours, minutes, seconds)));
    };
    /**
     * @description Decrement part of time
     */
    /**
     * \@description Decrement part of time
     * @private
     * @param {?} dateVal
     * @param {?=} whatToDecrement
     * @return {?}
     */
    McTimepicker.prototype.decrementTime = /**
     * \@description Decrement part of time
     * @private
     * @param {?} dateVal
     * @param {?=} whatToDecrement
     * @return {?}
     */
    function (dateVal, whatToDecrement) {
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
        return (/** @type {?} */ (this.getDateFromTimeDigits(hours, minutes, seconds)));
    };
    /**
     * @private
     * @param {?} cursorPos
     * @param {?} timeString
     * @return {?}
     */
    McTimepicker.prototype.getCursorPositionOfPrevTimePartStart = /**
     * @private
     * @param {?} cursorPos
     * @param {?} timeString
     * @return {?}
     */
    function (cursorPos, timeString) {
        return cursorPos === 0 ? timeString.length : cursorPos - 1;
    };
    /**
     * @private
     * @param {?} cursorPos
     * @param {?} timeString
     * @param {?=} timeDevider
     * @return {?}
     */
    McTimepicker.prototype.getCursorPositionOfNextTimePartStart = /**
     * @private
     * @param {?} cursorPos
     * @param {?} timeString
     * @param {?=} timeDevider
     * @return {?}
     */
    function (cursorPos, timeString, timeDevider) {
        if (timeDevider === void 0) { timeDevider = ':'; }
        /** @type {?} */
        var nextDividerPos = timeString.indexOf(timeDevider, cursorPos);
        return nextDividerPos !== undefined ? nextDividerPos + 1 : 0;
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
        var timeString = this.elementRef.nativeElement.value;
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
        return {
            modifiedTimePart: modifiedTimePart,
            cursorStartPosition: cursorStartPosition,
            cursorEndPosition: cursorEndPosition
        };
    };
    /**
     * @description Create time string for displaying inside input element of UI
     */
    /**
     * \@description Create time string for displaying inside input element of UI
     * @private
     * @param {?} value
     * @param {?=} timeFormat
     * @return {?}
     */
    McTimepicker.prototype.getTimeStringFromDate = /**
     * \@description Create time string for displaying inside input element of UI
     * @private
     * @param {?} value
     * @param {?=} timeFormat
     * @return {?}
     */
    function (value, timeFormat) {
        if (timeFormat === void 0) { timeFormat = DEFAULT_TIME_FORMAT; }
        if (value === undefined || value === null) {
            return '';
        }
        return this.dateAdapter.format(value, timeFormat);
    };
    /**
     * @private
     * @param {?} timeString
     * @return {?}
     */
    McTimepicker.prototype.getParsedTimeParts = /**
     * @private
     * @param {?} timeString
     * @return {?}
     */
    function (timeString) {
        /** @type {?} */
        var momentWrappedTime = this.dateAdapter.parse(timeString, [
            'h:m a',
            'h:m:s a',
            'H:m',
            'H:m:s'
        ]);
        /** @type {?} */
        var convertedTimeString = momentWrappedTime !== null
            ? momentWrappedTime.format('H:m:s')
            : '';
        /** @type {?} */
        var hoursAndMinutesAndSeconds = convertedTimeString.match(HOURS_MINUTES_SECONDS_REGEXP);
        /** @type {?} */
        var hoursAndMinutes = convertedTimeString.match(HOURS_MINUTES_REGEXP);
        /** @type {?} */
        var hoursOnly = convertedTimeString.match(HOURS_ONLY_REGEXP);
        return {
            hoursOnly: hoursOnly,
            hoursAndMinutes: hoursAndMinutes,
            hoursAndMinutesAndSeconds: hoursAndMinutesAndSeconds
        };
    };
    /**
     * @description Create Date object from separate parts of time
     */
    /**
     * \@description Create Date object from separate parts of time
     * @private
     * @param {?} hours
     * @param {?} minutes
     * @param {?=} seconds
     * @return {?}
     */
    McTimepicker.prototype.getDateFromTimeDigits = /**
     * \@description Create Date object from separate parts of time
     * @private
     * @param {?} hours
     * @param {?} minutes
     * @param {?=} seconds
     * @return {?}
     */
    function (hours, minutes, seconds) {
        if (seconds === void 0) { seconds = 0; }
        return this.getDateFromTimeString(hours + ":" + minutes + ":" + seconds);
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
        if (timeString === undefined) {
            return;
        }
        var _a = this.getParsedTimeParts(timeString), hoursOnly = _a.hoursOnly, hoursAndMinutes = _a.hoursAndMinutes, hoursAndMinutesAndSeconds = _a.hoursAndMinutesAndSeconds;
        if (timeString.trim().length === 0 ||
            hoursOnly === null && hoursAndMinutes === null && hoursAndMinutesAndSeconds === null) {
            return;
        }
        // tslint:disable no-magic-numbers
        /** @type {?} */
        var hours = 0;
        /** @type {?} */
        var minutes = 0;
        /** @type {?} */
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
        /** @type {?} */
        var resultDate = this.dateAdapter.createDateTime(this.dateAdapter.getYear(this.originalValue), this.dateAdapter.getMonth(this.originalValue), this.dateAdapter.getDate(this.originalValue), hours, minutes, seconds, 0);
        return this.dateAdapter.isValid(resultDate) ? resultDate : undefined;
    };
    /**
     * @private
     * @param {?} dateVal
     * @return {?}
     */
    McTimepicker.prototype.getTimeDigitsFromDate = /**
     * @private
     * @param {?} dateVal
     * @return {?}
     */
    function (dateVal) {
        return {
            hours: this.dateAdapter.getHours(dateVal),
            minutes: this.dateAdapter.getMinutes(dateVal),
            seconds: this.dateAdapter.getSeconds(dateVal)
        };
    };
    /**
     * @private
     * @return {?}
     */
    McTimepicker.prototype.parseValidator = /**
     * @private
     * @return {?}
     */
    function () {
        return this.currentDateTimeInput === undefined ?
            { mcTimepickerParse: { text: this.elementRef.nativeElement.value } } :
            null;
    };
    /**
     * @private
     * @return {?}
     */
    McTimepicker.prototype.minTimeValidator = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.minTime &&
            this.currentDateTimeInput !== undefined &&
            this.isTimeLowerThenMin(this.currentDateTimeInput)) {
            return { mcTimepickerLowerThenMintime: { text: this.elementRef.nativeElement.value } };
        }
        return null;
    };
    /**
     * @private
     * @return {?}
     */
    McTimepicker.prototype.maxTimeValidator = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.maxTime &&
            this.currentDateTimeInput !== undefined &&
            this.isTimeGreaterThenMax(this.currentDateTimeInput)) {
            return { mcTimepickerHigherThenMaxtime: { text: this.elementRef.nativeElement.value } };
        }
        return null;
    };
    /**
     * @private
     * @param {?} timeToCompare
     * @return {?}
     */
    McTimepicker.prototype.isTimeLowerThenMin = /**
     * @private
     * @param {?} timeToCompare
     * @return {?}
     */
    function (timeToCompare) {
        if (timeToCompare === undefined || timeToCompare === null || this.minTime === null) {
            return false;
        }
        return this.dateAdapter.compareDateTime(timeToCompare, this.getDateFromTimeString(this.minTime)) < 0;
    };
    /**
     * @private
     * @param {?} timeToCompare
     * @return {?}
     */
    McTimepicker.prototype.isTimeGreaterThenMax = /**
     * @private
     * @param {?} timeToCompare
     * @return {?}
     */
    function (timeToCompare) {
        if (timeToCompare === undefined || timeToCompare === null || this.maxTime === null) {
            return false;
        }
        return this.dateAdapter.compareDateTime(timeToCompare, this.getDateFromTimeString(this.maxTime)) >= 0;
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
                    providers: [{
                            provide: McFormFieldControl, useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return McTimepicker; }))
                        }]
                },] }
    ];
    /** @nocollapse */
    McTimepicker.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgControl, decorators: [{ type: Optional }, { type: Self }] },
        { type: NgForm, decorators: [{ type: Optional }] },
        { type: FormGroupDirective, decorators: [{ type: Optional }] },
        { type: ErrorStateMatcher },
        { type: undefined, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [MC_INPUT_VALUE_ACCESSOR,] }] },
        { type: Renderer2 },
        { type: DateAdapter, decorators: [{ type: Optional }] }
    ]; };
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
    return McTimepicker;
}(McTimepickerMixinBase));
export { McTimepicker };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy90aW1lcGlja2VyLyIsInNvdXJjZXMiOlsidGltZXBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0gsU0FBUyxFQUVULFVBQVUsRUFDVixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFFTCxRQUFRLEVBQ1IsU0FBUyxFQUNULElBQUksRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBR0gsa0JBQWtCLEVBQ2xCLFNBQVMsRUFDVCxNQUFNLEVBRVQsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUdILGlCQUFpQixFQUNqQixlQUFlLEVBQ2xCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbkUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbkUsT0FBTyxFQUNILElBQUksRUFDSixPQUFPLEVBQ1YsTUFBTSxNQUFNLENBQUM7QUFFZCxPQUFPLEVBQ0gsa0JBQWtCLEVBQ2xCLGtCQUFrQixFQUNsQixtQkFBbUIsRUFDbkIsZ0JBQWdCLEVBQ2hCLG1CQUFtQixFQUNuQixhQUFhLEVBQ2Isb0JBQW9CLEVBQ3BCLDRCQUE0QixFQUM1QixpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLGtCQUFrQixFQUNsQix1QkFBdUIsRUFDdkIsV0FBVyxFQUNYLFNBQVMsRUFDWixNQUFNLHdCQUF3QixDQUFDOztJQUc1Qix1QkFBdUIsR0FBVyxDQUFDO0FBRXZDO0lBQ0ksMEJBQ1csd0JBQTJDLEVBQzNDLFVBQWtCLEVBQ2xCLGVBQW1DLEVBQ25DLFNBQW9CO1FBSHBC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O0lBQ3ZDLGlDQUErQzs7Ozs7SUFLL0MsZ0NBQW9DOzs7OztJQUNwQyxtQ0FBaUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsXG4gICAgRG9DaGVjayxcbiAgICBFbGVtZW50UmVmLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPcHRpb25hbCxcbiAgICBSZW5kZXJlcjIsXG4gICAgU2VsZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgRm9ybUNvbnRyb2wsXG4gICAgRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgIE5nQ29udHJvbCxcbiAgICBOZ0Zvcm0sXG4gICAgVmFsaWRhdGlvbkVycm9yc1xufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9kYXRldGltZSc7XG5pbXBvcnQge1xuICAgIENhblVwZGF0ZUVycm9yU3RhdGUsXG4gICAgQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IsXG4gICAgRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgbWl4aW5FcnJvclN0YXRlXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IE1jRm9ybUZpZWxkQ29udHJvbCB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9mb3JtLWZpZWxkJztcbmltcG9ydCB7IE1DX0lOUFVUX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2lucHV0JztcbmltcG9ydCB7XG4gICAgbm9vcCxcbiAgICBTdWJqZWN0XG59IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1xuICAgIEFSUk9XX0RPV05fS0VZQ09ERSxcbiAgICBBUlJPV19MRUZUX0tFWUNPREUsXG4gICAgQVJST1dfUklHSFRfS0VZQ09ERSxcbiAgICBBUlJPV19VUF9LRVlDT0RFLFxuICAgIERFRkFVTFRfVElNRV9GT1JNQVQsXG4gICAgSE9VUlNfUEVSX0RBWSxcbiAgICBIT1VSU19NSU5VVEVTX1JFR0VYUCxcbiAgICBIT1VSU19NSU5VVEVTX1NFQ09ORFNfUkVHRVhQLFxuICAgIEhPVVJTX09OTFlfUkVHRVhQLFxuICAgIE1JTlVURVNfUEVSX0hPVVIsXG4gICAgU0VDT05EU19QRVJfTUlOVVRFLFxuICAgIFRJTUVGT1JNQVRfUExBQ0VIT0xERVJTLFxuICAgIFRpbWVGb3JtYXRzLFxuICAgIFRpbWVQYXJ0c1xufSBmcm9tICcuL3RpbWVwaWNrZXIuY29uc3RhbnRzJztcblxuXG5sZXQgdW5pcXVlQ29tcG9uZW50SWRTdWZmaXg6IG51bWJlciA9IDA7XG5cbmV4cG9ydCBjbGFzcyBNY1RpbWVwaWNrZXJCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgICAgIHB1YmxpYyBwYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgICAgIHB1YmxpYyBwYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICAgICAgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sXG4gICAgKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1RpbWVwaWNrZXJNaXhpbkJhc2U6XG4gICAgQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IgJiB0eXBlb2YgTWNUaW1lcGlja2VyQmFzZSA9IG1peGluRXJyb3JTdGF0ZShNY1RpbWVwaWNrZXJCYXNlKTtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdpbnB1dFttY1RpbWVwaWNrZXJdJyxcbiAgICBleHBvcnRBczogJ21jVGltZXBpY2tlcklucHV0JyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdGltZXBpY2tlciBtYy1pbnB1dCcsXG4gICAgICAgIC8vIE5hdGl2ZSBpbnB1dCBwcm9wZXJ0aWVzIHRoYXQgYXJlIG92ZXJ3cml0dGVuIGJ5IEFuZ3VsYXIgaW5wdXRzIG5lZWQgdG8gYmUgc3luY2VkIHdpdGhcbiAgICAgICAgLy8gdGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50LiBPdGhlcndpc2UgcHJvcGVydHkgYmluZGluZ3MgZm9yIHRob3NlIGRvbid0IHdvcmsuXG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgICAgICAnW2F0dHIucGxhY2Vob2xkZXJdJzogJ3BsYWNlaG9sZGVyJyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAgICAgJ1thdHRyLnJlcXVpcmVkXSc6ICdyZXF1aXJlZCcsXG4gICAgICAgICdbYXR0ci50aW1lLWZvcm1hdF0nOiAndGltZUZvcm1hdCcsXG4gICAgICAgICdbYXR0ci5taW4tdGltZV0nOiAnbWluVGltZScsXG4gICAgICAgICdbYXR0ci5tYXgtdGltZV0nOiAnbWF4VGltZScsXG4gICAgICAgICdbYXR0ci52YWx1ZV0nOiAndmFsdWUnLFxuICAgICAgICAnW2F0dHIuYXJpYS1pbnZhbGlkXSc6ICdlcnJvclN0YXRlJyxcblxuICAgICAgICAnKGJsdXIpJzogJ29uQmx1cigpJyxcbiAgICAgICAgJyhmb2N1cyknOiAnZm9jdXNDaGFuZ2VkKHRydWUpJyxcblxuICAgICAgICAnKGlucHV0KSc6ICdvbklucHV0KCknLFxuICAgICAgICAnKHBhc3RlKSc6ICdvblBhc3RlKCRldmVudCknLFxuXG4gICAgICAgICcoa2V5ZG93biknOiAnb25LZXlEb3duKCRldmVudCknXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFt7XG4gICAgICAgIHByb3ZpZGU6IE1jRm9ybUZpZWxkQ29udHJvbCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWNUaW1lcGlja2VyKVxuICAgIH1dXG59KVxuZXhwb3J0IGNsYXNzIE1jVGltZXBpY2tlcjxEPiBleHRlbmRzIE1jVGltZXBpY2tlck1peGluQmFzZVxuICAgIGltcGxlbWVudHMgTWNGb3JtRmllbGRDb250cm9sPGFueT4sIE9uRGVzdHJveSwgRG9DaGVjaywgQ2FuVXBkYXRlRXJyb3JTdGF0ZSwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIHJlYWRvbmx5IHN0YXRlQ2hhbmdlczogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGNvbnRyb2xUeXBlOiBzdHJpbmcgPSAnbWMtdGltZXBpY2tlcic7XG5cbiAgICAvKiogQW4gb2JqZWN0IHVzZWQgdG8gY29udHJvbCB3aGVuIGVycm9yIG1lc3NhZ2VzIGFyZSBzaG93bi4gKi9cbiAgICBASW5wdXQoKSBlcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXI7XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5uZ0NvbnRyb2wgJiYgdGhpcy5uZ0NvbnRyb2wuZGlzYWJsZWQgIT09IG51bGwpIHsgcmV0dXJuIHRoaXMubmdDb250cm9sLmRpc2FibGVkOyB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgLy8gQnJvd3NlcnMgbWF5IG5vdCBmaXJlIHRoZSBibHVyIGV2ZW50IGlmIHRoZSBpbnB1dCBpcyBkaXNhYmxlZCB0b28gcXVpY2tseS5cbiAgICAgICAgLy8gUmVzZXQgZnJvbSBoZXJlIHRvIGVuc3VyZSB0aGF0IHRoZSBlbGVtZW50IGRvZXNuJ3QgYmVjb21lIHN0dWNrLlxuICAgICAgICBpZiAodGhpcy5mb2N1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG5cbiAgICBzZXQgaWQodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9pZCA9IHZhbHVlIHx8IHRoaXMudWlkO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lkOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXF1aXJlZDtcbiAgICB9XG5cbiAgICBzZXQgcmVxdWlyZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fcmVxdWlyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlcXVpcmVkOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0VmFsdWVBY2Nlc3Nvci52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRWYWx1ZUFjY2Vzc29yLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmFwcGx5SW5wdXRDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoJ3RpbWUtZm9ybWF0JylcbiAgICBnZXQgdGltZUZvcm1hdCgpOiBUaW1lRm9ybWF0cyB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aW1lRm9ybWF0O1xuICAgIH1cblxuICAgIHNldCB0aW1lRm9ybWF0KGZvcm1hdFZhbHVlOiBUaW1lRm9ybWF0cykge1xuICAgICAgICB0aGlzLl90aW1lRm9ybWF0ID0gT2JqZWN0XG4gICAgICAgICAgICAua2V5cyhUaW1lRm9ybWF0cylcbiAgICAgICAgICAgIC5tYXAoKHRpbWVGb3JtYXRLZXkpID0+IFRpbWVGb3JtYXRzW3RpbWVGb3JtYXRLZXldKVxuICAgICAgICAgICAgLmluZGV4T2YoZm9ybWF0VmFsdWUpID4gLTEgPyBmb3JtYXRWYWx1ZSA6IERFRkFVTFRfVElNRV9GT1JNQVQ7XG5cbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IFRJTUVGT1JNQVRfUExBQ0VIT0xERVJTW3RoaXMuX3RpbWVGb3JtYXRdO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hcHBseUlucHV0Q2hhbmdlcyh7IGRvVGltZXN0cmluZ1JlZm9ybWF0OiB0cnVlIH0pKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF90aW1lRm9ybWF0OiBUaW1lRm9ybWF0cztcblxuICAgIEBJbnB1dCgnbWluLXRpbWUnKVxuICAgIGdldCBtaW5UaW1lKCk6IHN0cmluZyB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWluVGltZTtcbiAgICB9XG5cbiAgICBzZXQgbWluVGltZSh2YWx1ZTogc3RyaW5nIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9taW5UaW1lID0gdmFsdWU7XG4gICAgICAgICh0aGlzLm5nQ29udHJvbC5jb250cm9sIGFzIEZvcm1Db250cm9sKS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWluVGltZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgICBASW5wdXQoJ21heC10aW1lJylcbiAgICBnZXQgbWF4VGltZSgpOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heFRpbWU7XG4gICAgfVxuXG4gICAgc2V0IG1heFRpbWUobWF4VmFsdWU6IHN0cmluZyB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbWF4VGltZSA9IG1heFZhbHVlO1xuICAgICAgICAodGhpcy5uZ0NvbnRyb2wuY29udHJvbCBhcyBGb3JtQ29udHJvbCkudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21heFRpbWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSB1aWQgPSBgbWMtdGltZXBpY2tlci0ke3VuaXF1ZUNvbXBvbmVudElkU3VmZml4Kyt9YDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGlucHV0VmFsdWVBY2Nlc3NvcjogeyB2YWx1ZTogYW55IH07XG5cbiAgICBwcml2YXRlIG9yaWdpbmFsVmFsdWU6IGFueTtcbiAgICBwcml2YXRlIHByZXZpb3VzTmF0aXZlVmFsdWU6IGFueTtcbiAgICBwcml2YXRlIGN1cnJlbnREYXRlVGltZUlucHV0OiBEIHwgdW5kZWZpbmVkO1xuXG4gICAgcHJpdmF0ZSBvbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQ7XG4gICAgcHJpdmF0ZSBvblRvdWNoZWQ6ICgpID0+IHZvaWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHB1YmxpYyBuZ0NvbnRyb2w6IE5nQ29udHJvbCxcbiAgICAgICAgQE9wdGlvbmFsKCkgcGFyZW50Rm9ybTogTmdGb3JtLFxuICAgICAgICBAT3B0aW9uYWwoKSBwYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICAgICAgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE1DX0lOUFVUX1ZBTFVFX0FDQ0VTU09SKSBpbnB1dFZhbHVlQWNjZXNzb3I6IGFueSxcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcjxhbnk+XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlciwgcGFyZW50Rm9ybSwgcGFyZW50Rm9ybUdyb3VwLCBuZ0NvbnRyb2wpO1xuXG4gICAgICAgIGlmICghdGhpcy5kYXRlQWRhcHRlcikge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYE1jVGltZXBpY2tlcjogTm8gcHJvdmlkZXIgZm91bmQgZm9yIERhdGVBZGFwdGVyLiBZb3UgbXVzdCBpbXBvcnQgb25lIG9mIHRoZSBleGlzdGluZyBgICtcbiAgICAgICAgICAgICAgICBgbW9kdWxlcyBhdCB5b3VyIGFwcGxpY2F0aW9uIHJvb3Qgb3IgcHJvdmlkZSBhIGN1c3RvbSBpbXBsZW1lbnRhdGlvbiBvciB1c2UgZXhpc3RzIG9uZXMuYCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBubyBpbnB1dCB2YWx1ZSBhY2Nlc3NvciB3YXMgZXhwbGljaXRseSBzcGVjaWZpZWQsIHVzZSB0aGUgZWxlbWVudCBhcyB0aGUgaW5wdXQgdmFsdWVcbiAgICAgICAgLy8gYWNjZXNzb3IuXG4gICAgICAgIHRoaXMuaW5wdXRWYWx1ZUFjY2Vzc29yID0gaW5wdXRWYWx1ZUFjY2Vzc29yIHx8IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIHRoaXMucHJldmlvdXNOYXRpdmVWYWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBub29wO1xuXG4gICAgICAgIC8vIEZvcmNlIHNldHRlciB0byBiZSBjYWxsZWQgaW4gY2FzZSBpZCB3YXMgbm90IHNwZWNpZmllZC5cbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuaWQ7XG5cbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IFRJTUVGT1JNQVRfUExBQ0VIT0xERVJTW0RFRkFVTFRfVElNRV9GT1JNQVRdO1xuXG4gICAgICAgIGlmICh0aGlzLm5nQ29udHJvbCkge1xuICAgICAgICAgICAgLy8gSW5zdGVhZCBvZiBOR19WQUxVRV9BQ0NFU1NPUiAoaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL2lzc3Vlcy84MTU4I2lzc3VlY29tbWVudC0zNDQ2MTgxMDMpXG4gICAgICAgICAgICB0aGlzLm5nQ29udHJvbC52YWx1ZUFjY2Vzc29yID0gdGhpcztcblxuICAgICAgICAgICAgLy8gVG8gYXZvaWQgY3ljbGljIGRlcGVuZGVuY3kgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ5NTc4NDE0XG4gICAgICAgICAgICBjb25zdCBjb250cm9sID0gdGhpcy5uZ0NvbnRyb2wuY29udHJvbCBhcyBGb3JtQ29udHJvbDtcbiAgICAgICAgICAgIGNvbnN0IG15VmFsaWRhdG9ycyA9IFtcbiAgICAgICAgICAgICAgICAoKSA9PiB0aGlzLnBhcnNlVmFsaWRhdG9yKCksXG4gICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5taW5UaW1lVmFsaWRhdG9yKCksXG4gICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5tYXhUaW1lVmFsaWRhdG9yKClcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBjb25zdCB2YWxpZGF0b3JzID0gY29udHJvbC52YWxpZGF0b3JcbiAgICAgICAgICAgICAgICA/IFtjb250cm9sLnZhbGlkYXRvciwgLi4ubXlWYWxpZGF0b3JzXVxuICAgICAgICAgICAgICAgIDogbXlWYWxpZGF0b3JzO1xuXG4gICAgICAgICAgICBjb250cm9sLnNldFZhbGlkYXRvcnModmFsaWRhdG9ycyk7XG4gICAgICAgICAgICBjb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubmdDb250cm9sKSB7XG4gICAgICAgICAgICAvLyBXZSBuZWVkIHRvIHJlLWV2YWx1YXRlIHRoaXMgb24gZXZlcnkgY2hhbmdlIGRldGVjdGlvbiBjeWNsZSwgYmVjYXVzZSB0aGVyZSBhcmUgc29tZVxuICAgICAgICAgICAgLy8gZXJyb3IgdHJpZ2dlcnMgdGhhdCB3ZSBjYW4ndCBzdWJzY3JpYmUgdG8gKGUuZy4gcGFyZW50IGZvcm0gc3VibWlzc2lvbnMpLiBUaGlzIG1lYW5zXG4gICAgICAgICAgICAvLyB0aGF0IHdoYXRldmVyIGxvZ2ljIGlzIGluIGhlcmUgaGFzIHRvIGJlIHN1cGVyIGxlYW4gb3Igd2UgcmlzayBkZXN0cm95aW5nIHRoZSBwZXJmb3JtYW5jZS5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlRXJyb3JTdGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgbmVlZCB0byBkaXJ0eS1jaGVjayB0aGUgbmF0aXZlIGVsZW1lbnQncyB2YWx1ZSwgYmVjYXVzZSB0aGVyZSBhcmUgc29tZSBjYXNlcyB3aGVyZVxuICAgICAgICAvLyB3ZSB3b24ndCBiZSBub3RpZmllZCB3aGVuIGl0IGNoYW5nZXMgKGUuZy4gdGhlIGNvbnN1bWVyIGlzbid0IHVzaW5nIGZvcm1zIG9yIHRoZXkncmVcbiAgICAgICAgLy8gdXBkYXRpbmcgdGhlIHZhbHVlIHVzaW5nIGBlbWl0RXZlbnQ6IGZhbHNlYCkuXG4gICAgICAgIHRoaXMuZGlydHlDaGVja05hdGl2ZVZhbHVlKCk7XG4gICAgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZm9jdXNDaGFuZ2VkKGlzRm9jdXNlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoaXNGb2N1c2VkICE9PSB0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IGlzRm9jdXNlZDtcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkJsdXIoKSB7XG4gICAgICAgIHRoaXMuYXBwbHlJbnB1dENoYW5nZXMoKTtcbiAgICAgICAgdGhpcy5mb2N1c0NoYW5nZWQoZmFsc2UpO1xuICAgIH1cblxuICAgIG9uUGFzdGUoJGV2ZW50KSB7XG4gICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBjbGlwYm9hcmRVc2VySW5wdXQ6IHN0cmluZyA9ICRldmVudC5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQnKTtcblxuICAgICAgICBpZiAodGhpcy5nZXREYXRlRnJvbVRpbWVTdHJpbmcoY2xpcGJvYXJkVXNlcklucHV0KSA9PT0gdW5kZWZpbmVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlID0gY2xpcGJvYXJkVXNlcklucHV0O1xuICAgICAgICB0aGlzLm9uSW5wdXQoKTtcbiAgICB9XG5cbiAgICBvbklucHV0KCkge1xuICAgICAgICBjb25zdCBpbml0aWFsQ3Vyc29yU3RhcnQ6IG51bWJlciA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICBjb25zdCBpbml0aWFsQ3Vyc29yRW5kOiBudW1iZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQ7XG4gICAgICAgIGxldCBpc0F1dG9jb21wbGV0ZVRyaWdnZXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGhvdXJzT25seSxcbiAgICAgICAgICAgIGhvdXJzQW5kTWludXRlcyxcbiAgICAgICAgICAgIGhvdXJzQW5kTWludXRlc0FuZFNlY29uZHNcbiAgICAgICAgfSA9IHRoaXMuZ2V0UGFyc2VkVGltZVBhcnRzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlKTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZSBuby1tYWdpYy1udW1iZXJzXG4gICAgICAgIGlmIChob3Vyc09ubHkgJiZcbiAgICAgICAgICAgIGhvdXJzT25seVsxXSAmJlxuICAgICAgICAgICAgaG91cnNPbmx5WzFdLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgaXNBdXRvY29tcGxldGVUcmlnZ2VyZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGhvdXJzQW5kTWludXRlcyAmJlxuICAgICAgICAgICAgaG91cnNBbmRNaW51dGVzWzFdLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgICAgICAgaG91cnNBbmRNaW51dGVzWzJdICYmXG4gICAgICAgICAgICBob3Vyc0FuZE1pbnV0ZXNbMl0ubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICBpc0F1dG9jb21wbGV0ZVRyaWdnZXJlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoaG91cnNBbmRNaW51dGVzQW5kU2Vjb25kcyAmJlxuICAgICAgICAgICAgaG91cnNBbmRNaW51dGVzQW5kU2Vjb25kc1sxXS5sZW5ndGggPT09IDIgJiZcbiAgICAgICAgICAgIGhvdXJzQW5kTWludXRlc0FuZFNlY29uZHNbMl0ubGVuZ3RoID09PSAyICYmXG4gICAgICAgICAgICBob3Vyc0FuZE1pbnV0ZXNBbmRTZWNvbmRzWzNdICYmXG4gICAgICAgICAgICBob3Vyc0FuZE1pbnV0ZXNBbmRTZWNvbmRzWzNdLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgaXNBdXRvY29tcGxldGVUcmlnZ2VyZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRzbGludDplbmFibGUgbm8tbWFnaWMtbnVtYmVyc1xuXG4gICAgICAgIHRoaXMuYXBwbHlJbnB1dENoYW5nZXMoeyBkb1RpbWVzdHJpbmdSZWZvcm1hdDogaXNBdXRvY29tcGxldGVUcmlnZ2VyZWQgfSk7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSBpbml0aWFsQ3Vyc29yU3RhcnQ7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZCA9IGluaXRpYWxDdXJzb3JFbmQ7XG5cbiAgICAgICAgaWYgKGlzQXV0b2NvbXBsZXRlVHJpZ2dlcmVkICYmIHRoaXMubmdDb250cm9sLmVycm9ycyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVTZWxlY3Rpb25PZlRpbWVDb21wb25lbnRJbklucHV0KGluaXRpYWxDdXJzb3JTdGFydCArIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldCBlbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSAmJiAhdGhpcy5pc0JhZElucHV0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uQ29udGFpbmVyQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBEIHwgbnVsbCk6IHZvaWQge1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZU9yaWdpbmFsVmFsdWUodmFsdWUpO1xuXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgICAgICd2YWx1ZScsXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRUaW1lU3RyaW5nRnJvbURhdGUodmFsdWUsIHRoaXMudGltZUZvcm1hdClcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHRoaXMuYXBwbHlJbnB1dENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBrZXlDb2RlOiBzdHJpbmcgPSB0aGlzLmdldEtleUNvZGUoZXZlbnQpO1xuXG4gICAgICAgIGlmIChrZXlDb2RlID09PSBBUlJPV19VUF9LRVlDT0RFIHx8IGtleUNvZGUgPT09IEFSUk9XX0RPV05fS0VZQ09ERSkge1xuICAgICAgICAgICAgdGhpcy51cERvd25UaW1lQnlBcnJvd0tleXMoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleUNvZGUgPT09IEFSUk9XX0xFRlRfS0VZQ09ERSB8fCBrZXlDb2RlID09PSBBUlJPV19SSUdIVF9LRVlDT0RFKSB7XG4gICAgICAgICAgICB0aGlzLnN3aXRjaFNlbGVjdGlvbkJldHdlZW5UaW1lcGFydHMoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IEQpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgc2F2ZU9yaWdpbmFsVmFsdWUodmFsdWU6IEQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0ZUFkYXB0ZXIuaXNWYWxpZCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYWxWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIERvZXMgc29tZSBtYW51YWwgZGlydHkgY2hlY2tpbmcgb24gdGhlIG5hdGl2ZSBpbnB1dCBgdmFsdWVgIHByb3BlcnR5LiAqL1xuICAgIHByaXZhdGUgZGlydHlDaGVja05hdGl2ZVZhbHVlKCkge1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMudmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMucHJldmlvdXNOYXRpdmVWYWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNOYXRpdmVWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBpbnZhbGlkIGJhc2VkIG9uIHRoZSBuYXRpdmUgdmFsaWRhdGlvbi4gKi9cbiAgICBwcml2YXRlIGlzQmFkSW5wdXQoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHZhbGlkaXR5ID0gKDxIVE1MSW5wdXRFbGVtZW50PiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkudmFsaWRpdHk7XG5cbiAgICAgICAgcmV0dXJuIHZhbGlkaXR5ICYmIHZhbGlkaXR5LmJhZElucHV0O1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwbHlJbnB1dENoYW5nZXMoYXBwbHlQYXJhbXM6IHsgY2hhbmdlZFRpbWU/OiBEOyBkb1RpbWVzdHJpbmdSZWZvcm1hdD86IGJvb2xlYW4gfSA9IHt9KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHsgY2hhbmdlZFRpbWUsIGRvVGltZXN0cmluZ1JlZm9ybWF0ID0gdHJ1ZSB9ID0gYXBwbHlQYXJhbXM7XG4gICAgICAgIGNvbnN0IHRpbWVUb0FwcGx5OiBEIHwgdW5kZWZpbmVkID0gY2hhbmdlZFRpbWUgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0RGF0ZUZyb21UaW1lU3RyaW5nKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlKTtcbiAgICAgICAgdGhpcy5jdXJyZW50RGF0ZVRpbWVJbnB1dCA9IHRpbWVUb0FwcGx5O1xuXG4gICAgICAgIGlmIChkb1RpbWVzdHJpbmdSZWZvcm1hdCAmJiB0aW1lVG9BcHBseSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3Rpb25TdGFydDogbnVtYmVyID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3Rpb25FbmQ6IG51bWJlciA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZDtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgICAgICAgICB0aGlzLmdldFRpbWVTdHJpbmdGcm9tRGF0ZSh0aW1lVG9BcHBseSwgdGhpcy50aW1lRm9ybWF0KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmQ7XG4gICAgICAgIH1cblxuICAgICAgICAoPEZvcm1Db250cm9sPiB0aGlzLm5nQ29udHJvbC5jb250cm9sKS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMubmdDb250cm9sLmVycm9ycyA9PT0gbnVsbCAmJiB0aW1lVG9BcHBseSAhPT0gdW5kZWZpbmVkID8gdGltZVRvQXBwbHkgOiBudWxsO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHJlc3VsdCk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwRG93blRpbWVCeUFycm93S2V5cyhldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCBjaGFuZ2VkVGltZTogRCB8IHVuZGVmaW5lZCA9IHRoaXMuY3VycmVudERhdGVUaW1lSW5wdXQ7XG4gICAgICAgIGlmIChjaGFuZ2VkVGltZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJzb3JQb3MgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcblxuICAgICAgICAgICAgY29uc3QgbW9kaWZpZWRUaW1lUGFydCA9IHRoaXMuZ2V0VGltZUVkaXRNZXRyaWNzKGN1cnNvclBvcylcbiAgICAgICAgICAgICAgICAubW9kaWZpZWRUaW1lUGFydDtcbiAgICAgICAgICAgIGNvbnN0IGtleUNvZGU6IHN0cmluZyA9IHRoaXMuZ2V0S2V5Q29kZShldmVudCk7XG4gICAgICAgICAgICBpZiAoa2V5Q29kZSA9PT0gQVJST1dfVVBfS0VZQ09ERSkgeyBjaGFuZ2VkVGltZSA9IHRoaXMuaW5jcmVtZW50VGltZShjaGFuZ2VkVGltZSwgbW9kaWZpZWRUaW1lUGFydCk7IH1cbiAgICAgICAgICAgIGlmIChrZXlDb2RlID09PSBBUlJPV19ET1dOX0tFWUNPREUpIHsgY2hhbmdlZFRpbWUgPSB0aGlzLmRlY3JlbWVudFRpbWUoY2hhbmdlZFRpbWUsIG1vZGlmaWVkVGltZVBhcnQpOyB9XG4gICAgICAgICAgICB0aGlzLmFwcGx5SW5wdXRDaGFuZ2VzKHsgY2hhbmdlZFRpbWUgfSk7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVNlbGVjdGlvbk9mVGltZUNvbXBvbmVudEluSW5wdXQoY3Vyc29yUG9zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3dpdGNoU2VsZWN0aW9uQmV0d2VlblRpbWVwYXJ0cyhldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjaGFuZ2VkVGltZTogRCB8IHVuZGVmaW5lZCA9IHRoaXMuY3VycmVudERhdGVUaW1lSW5wdXQ7XG4gICAgICAgIGNvbnN0IGtleUNvZGU6IHN0cmluZyA9IHRoaXMuZ2V0S2V5Q29kZShldmVudCk7XG5cbiAgICAgICAgaWYgKGNoYW5nZWRUaW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxldCBjdXJzb3JQb3M6IG51bWJlciA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgICAgaWYgKGtleUNvZGUgPT09IEFSUk9XX0xFRlRfS0VZQ09ERSkge1xuICAgICAgICAgICAgICAgIGN1cnNvclBvcyA9IHRoaXMuZ2V0Q3Vyc29yUG9zaXRpb25PZlByZXZUaW1lUGFydFN0YXJ0KGN1cnNvclBvcywgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBBUlJPV19SSUdIVF9LRVlDT0RFKSB7XG4gICAgICAgICAgICAgICAgY3Vyc29yUG9zID0gdGhpcy5nZXRDdXJzb3JQb3NpdGlvbk9mTmV4dFRpbWVQYXJ0U3RhcnQoY3Vyc29yUG9zLCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVNlbGVjdGlvbk9mVGltZUNvbXBvbmVudEluSW5wdXQoY3Vyc29yUG9zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBNaWNyb3NvZnQgRURHRSBkb2Vzbid0IHN1cHBvcnQgS2V5Ym9hZWRFdmVudC5jb2RlIHRodXMgd2UgbmVlZCB0aGlzIGhlbHBlclxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0S2V5Q29kZShldmVudDogS2V5Ym9hcmRFdmVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBldmVudC5jb2RlIHx8IGV2ZW50LmtleTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVNlbGVjdGlvbk9mVGltZUNvbXBvbmVudEluSW5wdXQoY3Vyc29yUG9zOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdFZGl0UGFyYW1zID0gdGhpcy5nZXRUaW1lRWRpdE1ldHJpY3MoY3Vyc29yUG9zKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gbmV3RWRpdFBhcmFtcy5jdXJzb3JTdGFydFBvc2l0aW9uO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kID0gbmV3RWRpdFBhcmFtcy5jdXJzb3JFbmRQb3NpdGlvbjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbmNyZW1lbnRUaW1lKGRhdGVWYWw6IEQsIHdoYXRUb0luY3JlbWVudDogVGltZVBhcnRzID0gVGltZVBhcnRzLnNlY29uZHMpOiBEIHtcbiAgICAgICAgbGV0IHsgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMgfSA9IHRoaXMuZ2V0VGltZURpZ2l0c0Zyb21EYXRlKGRhdGVWYWwpO1xuXG4gICAgICAgIHN3aXRjaCAod2hhdFRvSW5jcmVtZW50KSB7XG4gICAgICAgICAgICBjYXNlIFRpbWVQYXJ0cy5ob3VyczpcbiAgICAgICAgICAgICAgICBob3VycysrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUaW1lUGFydHMubWludXRlczpcbiAgICAgICAgICAgICAgICBtaW51dGVzKys7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFRpbWVQYXJ0cy5zZWNvbmRzOlxuICAgICAgICAgICAgICAgIHNlY29uZHMrKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2Vjb25kcyA+IFNFQ09ORFNfUEVSX01JTlVURSkgeyBzZWNvbmRzID0gMDsgfVxuXG4gICAgICAgIGlmIChtaW51dGVzID4gTUlOVVRFU19QRVJfSE9VUikgeyBtaW51dGVzID0gMDsgfVxuXG4gICAgICAgIGlmIChob3VycyA+IEhPVVJTX1BFUl9EQVkpIHsgaG91cnMgPSAwOyB9XG5cbiAgICAgICAgcmV0dXJuIDxEPiB0aGlzLmdldERhdGVGcm9tVGltZURpZ2l0cyhob3VycywgbWludXRlcywgc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIERlY3JlbWVudCBwYXJ0IG9mIHRpbWVcbiAgICAgKi9cbiAgICBwcml2YXRlIGRlY3JlbWVudFRpbWUoZGF0ZVZhbDogRCwgd2hhdFRvRGVjcmVtZW50OiBUaW1lUGFydHMgPSBUaW1lUGFydHMuc2Vjb25kcyk6IEQge1xuICAgICAgICBsZXQgeyBob3VycywgbWludXRlcywgc2Vjb25kcyB9ID0gdGhpcy5nZXRUaW1lRGlnaXRzRnJvbURhdGUoZGF0ZVZhbCk7XG5cbiAgICAgICAgc3dpdGNoICh3aGF0VG9EZWNyZW1lbnQpIHtcbiAgICAgICAgICAgIGNhc2UgVGltZVBhcnRzLmhvdXJzOlxuICAgICAgICAgICAgICAgIGhvdXJzLS07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFRpbWVQYXJ0cy5taW51dGVzOlxuICAgICAgICAgICAgICAgIG1pbnV0ZXMtLTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVGltZVBhcnRzLnNlY29uZHM6XG4gICAgICAgICAgICAgICAgc2Vjb25kcy0tO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWNvbmRzIDwgMCkgeyBzZWNvbmRzID0gU0VDT05EU19QRVJfTUlOVVRFOyB9XG5cbiAgICAgICAgaWYgKG1pbnV0ZXMgPCAwKSB7IG1pbnV0ZXMgPSBNSU5VVEVTX1BFUl9IT1VSOyB9XG5cbiAgICAgICAgaWYgKGhvdXJzIDwgMCkgeyBob3VycyA9IEhPVVJTX1BFUl9EQVk7IH1cblxuICAgICAgICByZXR1cm4gPEQ+IHRoaXMuZ2V0RGF0ZUZyb21UaW1lRGlnaXRzKGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEN1cnNvclBvc2l0aW9uT2ZQcmV2VGltZVBhcnRTdGFydChjdXJzb3JQb3M6IG51bWJlciwgdGltZVN0cmluZzogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGN1cnNvclBvcyA9PT0gMCA/IHRpbWVTdHJpbmcubGVuZ3RoIDogY3Vyc29yUG9zIC0gMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEN1cnNvclBvc2l0aW9uT2ZOZXh0VGltZVBhcnRTdGFydChcbiAgICAgICAgY3Vyc29yUG9zOiBudW1iZXIsIHRpbWVTdHJpbmc6IHN0cmluZywgdGltZURldmlkZXI6IHN0cmluZyA9ICc6J1xuICAgICk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IG5leHREaXZpZGVyUG9zOiBudW1iZXIgPSB0aW1lU3RyaW5nLmluZGV4T2YodGltZURldmlkZXIsIGN1cnNvclBvcyk7XG5cbiAgICAgICAgcmV0dXJuIG5leHREaXZpZGVyUG9zICE9PSB1bmRlZmluZWQgPyBuZXh0RGl2aWRlclBvcyArIDEgOiAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgcGFyYW1zIGZvciBhcnJvdy1rZXlzICh1cC9kb3duKSB0aW1lIHZhbGllIGVkaXQuXG4gICAgICogQHBhcmFtIGN1cnNvclBvc2l0aW9uIEN1cnJlbnQgY3Vyc29yIHBvc2l0aW9uIGluIHRpbWVTdHJpbmdcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFRpbWVFZGl0TWV0cmljcyhjdXJzb3JQb3NpdGlvbjogbnVtYmVyKToge1xuICAgICAgICBtb2RpZmllZFRpbWVQYXJ0OiBUaW1lUGFydHM7XG4gICAgICAgIGN1cnNvclN0YXJ0UG9zaXRpb246IG51bWJlcjtcbiAgICAgICAgY3Vyc29yRW5kUG9zaXRpb246IG51bWJlcjtcbiAgICB9IHtcbiAgICAgICAgY29uc3QgdGltZVN0cmluZzogc3RyaW5nID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgIGxldCBtb2RpZmllZFRpbWVQYXJ0OiBUaW1lUGFydHM7XG4gICAgICAgIGxldCBjdXJzb3JTdGFydFBvc2l0aW9uOiBudW1iZXI7XG4gICAgICAgIGxldCBjdXJzb3JFbmRQb3NpdGlvbjogbnVtYmVyO1xuICAgICAgICBjb25zdCBob3Vyc0luZGV4ID0gMDtcbiAgICAgICAgY29uc3QgbWludXRlc0luZGV4ID0gdGltZVN0cmluZy5pbmRleE9mKCc6JywgaG91cnNJbmRleCArIDEpO1xuICAgICAgICBjb25zdCBzZWNvbmRzSW5kZXggPSBtaW51dGVzSW5kZXggIT09IC0xID8gdGltZVN0cmluZy5pbmRleE9mKCc6JywgbWludXRlc0luZGV4ICsgMSkgOiAtMTtcblxuICAgICAgICBpZiAoc2Vjb25kc0luZGV4ICE9PSAtMSAmJiBjdXJzb3JQb3NpdGlvbiA+IHNlY29uZHNJbmRleCkge1xuICAgICAgICAgICAgbW9kaWZpZWRUaW1lUGFydCA9IFRpbWVQYXJ0cy5zZWNvbmRzO1xuICAgICAgICAgICAgY3Vyc29yU3RhcnRQb3NpdGlvbiA9IHNlY29uZHNJbmRleCArIDE7XG4gICAgICAgICAgICBjdXJzb3JFbmRQb3NpdGlvbiA9IHRpbWVTdHJpbmcubGVuZ3RoO1xuICAgICAgICB9IGVsc2UgaWYgKG1pbnV0ZXNJbmRleCAhPT0gLTEgJiYgY3Vyc29yUG9zaXRpb24gPiBtaW51dGVzSW5kZXgpIHtcbiAgICAgICAgICAgIG1vZGlmaWVkVGltZVBhcnQgPSBUaW1lUGFydHMubWludXRlcztcbiAgICAgICAgICAgIGN1cnNvclN0YXJ0UG9zaXRpb24gPSBtaW51dGVzSW5kZXggKyAxO1xuICAgICAgICAgICAgY3Vyc29yRW5kUG9zaXRpb24gPSBzZWNvbmRzSW5kZXggPiAtMSA/IHNlY29uZHNJbmRleCA6IHRpbWVTdHJpbmcubGVuZ3RoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9kaWZpZWRUaW1lUGFydCA9IFRpbWVQYXJ0cy5ob3VycztcbiAgICAgICAgICAgIGN1cnNvclN0YXJ0UG9zaXRpb24gPSBob3Vyc0luZGV4O1xuICAgICAgICAgICAgY3Vyc29yRW5kUG9zaXRpb24gPSBtaW51dGVzSW5kZXggIT09IC0xID8gbWludXRlc0luZGV4IDogdGltZVN0cmluZy5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbW9kaWZpZWRUaW1lUGFydCxcbiAgICAgICAgICAgIGN1cnNvclN0YXJ0UG9zaXRpb24sXG4gICAgICAgICAgICBjdXJzb3JFbmRQb3NpdGlvblxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBDcmVhdGUgdGltZSBzdHJpbmcgZm9yIGRpc3BsYXlpbmcgaW5zaWRlIGlucHV0IGVsZW1lbnQgb2YgVUlcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFRpbWVTdHJpbmdGcm9tRGF0ZSh2YWx1ZTogRCwgdGltZUZvcm1hdDogVGltZUZvcm1hdHMgPSBERUZBVUxUX1RJTUVfRk9STUFUKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVBZGFwdGVyLmZvcm1hdCh2YWx1ZSwgdGltZUZvcm1hdCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRQYXJzZWRUaW1lUGFydHModGltZVN0cmluZzogc3RyaW5nKToge1xuICAgICAgICBob3Vyc09ubHk6IGFueTtcbiAgICAgICAgaG91cnNBbmRNaW51dGVzOiBhbnk7XG4gICAgICAgIGhvdXJzQW5kTWludXRlc0FuZFNlY29uZHM6IGFueTtcbiAgICB9IHtcbiAgICAgICAgY29uc3QgbW9tZW50V3JhcHBlZFRpbWUgPSB0aGlzLmRhdGVBZGFwdGVyLnBhcnNlKHRpbWVTdHJpbmcsIFtcbiAgICAgICAgICAgICdoOm0gYScsXG4gICAgICAgICAgICAnaDptOnMgYScsXG4gICAgICAgICAgICAnSDptJyxcbiAgICAgICAgICAgICdIOm06cydcbiAgICAgICAgXSk7XG5cbiAgICAgICAgY29uc3QgY29udmVydGVkVGltZVN0cmluZyA9IG1vbWVudFdyYXBwZWRUaW1lICE9PSBudWxsXG4gICAgICAgICAgICA/IG1vbWVudFdyYXBwZWRUaW1lLmZvcm1hdCgnSDptOnMnKVxuICAgICAgICAgICAgOiAnJztcblxuICAgICAgICBjb25zdCBob3Vyc0FuZE1pbnV0ZXNBbmRTZWNvbmRzID0gY29udmVydGVkVGltZVN0cmluZy5tYXRjaChIT1VSU19NSU5VVEVTX1NFQ09ORFNfUkVHRVhQKTtcbiAgICAgICAgY29uc3QgaG91cnNBbmRNaW51dGVzID0gY29udmVydGVkVGltZVN0cmluZy5tYXRjaChIT1VSU19NSU5VVEVTX1JFR0VYUCk7XG4gICAgICAgIGNvbnN0IGhvdXJzT25seSA9IGNvbnZlcnRlZFRpbWVTdHJpbmcubWF0Y2goSE9VUlNfT05MWV9SRUdFWFApO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBob3Vyc09ubHksXG4gICAgICAgICAgICBob3Vyc0FuZE1pbnV0ZXMsXG4gICAgICAgICAgICBob3Vyc0FuZE1pbnV0ZXNBbmRTZWNvbmRzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIENyZWF0ZSBEYXRlIG9iamVjdCBmcm9tIHNlcGFyYXRlIHBhcnRzIG9mIHRpbWVcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldERhdGVGcm9tVGltZURpZ2l0cyhob3VyczogbnVtYmVyLCBtaW51dGVzOiBudW1iZXIsIHNlY29uZHM6IG51bWJlciA9IDApOiBEIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZUZyb21UaW1lU3RyaW5nKGAke2hvdXJzfToke21pbnV0ZXN9OiR7c2Vjb25kc31gKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERhdGVGcm9tVGltZVN0cmluZyh0aW1lU3RyaW5nOiBzdHJpbmcpOiBEIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKHRpbWVTdHJpbmcgPT09IHVuZGVmaW5lZCkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBob3Vyc09ubHksXG4gICAgICAgICAgICBob3Vyc0FuZE1pbnV0ZXMsXG4gICAgICAgICAgICBob3Vyc0FuZE1pbnV0ZXNBbmRTZWNvbmRzXG4gICAgICAgIH0gPSB0aGlzLmdldFBhcnNlZFRpbWVQYXJ0cyh0aW1lU3RyaW5nKTtcblxuICAgICAgICBpZiAodGltZVN0cmluZy50cmltKCkubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICAgICBob3Vyc09ubHkgPT09IG51bGwgJiYgaG91cnNBbmRNaW51dGVzID09PSBudWxsICYmIGhvdXJzQW5kTWludXRlc0FuZFNlY29uZHMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlIG5vLW1hZ2ljLW51bWJlcnNcbiAgICAgICAgbGV0IGhvdXJzOiBudW1iZXIgPSAwO1xuICAgICAgICBsZXQgbWludXRlczogbnVtYmVyID0gMDtcbiAgICAgICAgbGV0IHNlY29uZHM6IG51bWJlciA9IDA7XG5cbiAgICAgICAgaWYgKGhvdXJzT25seSkge1xuICAgICAgICAgICAgaG91cnMgPSBOdW1iZXIoaG91cnNPbmx5WzFdKTtcbiAgICAgICAgfSBlbHNlIGlmIChob3Vyc0FuZE1pbnV0ZXMpIHtcbiAgICAgICAgICAgIGhvdXJzID0gTnVtYmVyKGhvdXJzQW5kTWludXRlc1sxXSk7XG4gICAgICAgICAgICBtaW51dGVzID0gTnVtYmVyKGhvdXJzQW5kTWludXRlc1syXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaG91cnNBbmRNaW51dGVzQW5kU2Vjb25kcykge1xuICAgICAgICAgICAgaG91cnMgPSBOdW1iZXIoaG91cnNBbmRNaW51dGVzQW5kU2Vjb25kc1sxXSk7XG4gICAgICAgICAgICBtaW51dGVzID0gTnVtYmVyKGhvdXJzQW5kTWludXRlc0FuZFNlY29uZHNbMl0pO1xuICAgICAgICAgICAgc2Vjb25kcyA9IE51bWJlcihob3Vyc0FuZE1pbnV0ZXNBbmRTZWNvbmRzWzNdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlc3VsdERhdGU6IEQgPSB0aGlzLmRhdGVBZGFwdGVyLmNyZWF0ZURhdGVUaW1lKFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMub3JpZ2luYWxWYWx1ZSksXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldE1vbnRoKHRoaXMub3JpZ2luYWxWYWx1ZSksXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldERhdGUodGhpcy5vcmlnaW5hbFZhbHVlKSxcbiAgICAgICAgICAgIGhvdXJzLFxuICAgICAgICAgICAgbWludXRlcyxcbiAgICAgICAgICAgIHNlY29uZHMsXG4gICAgICAgICAgICAwXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUFkYXB0ZXIuaXNWYWxpZChyZXN1bHREYXRlKSA/IHJlc3VsdERhdGUgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUaW1lRGlnaXRzRnJvbURhdGUoZGF0ZVZhbDogRCk6IHsgaG91cnM6IG51bWJlcjsgbWludXRlczogbnVtYmVyOyBzZWNvbmRzOiBudW1iZXIgfSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBob3VyczogdGhpcy5kYXRlQWRhcHRlci5nZXRIb3VycyhkYXRlVmFsKSxcbiAgICAgICAgICAgIG1pbnV0ZXM6IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TWludXRlcyhkYXRlVmFsKSxcbiAgICAgICAgICAgIHNlY29uZHM6IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0U2Vjb25kcyhkYXRlVmFsKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VWYWxpZGF0b3IoKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50RGF0ZVRpbWVJbnB1dCA9PT0gdW5kZWZpbmVkID9cbiAgICAgICAgICAgIHsgbWNUaW1lcGlja2VyUGFyc2U6IHsgdGV4dDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgfSB9IDpcbiAgICAgICAgICAgIG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtaW5UaW1lVmFsaWRhdG9yKCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5taW5UaW1lICYmXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlVGltZUlucHV0ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIHRoaXMuaXNUaW1lTG93ZXJUaGVuTWluKHRoaXMuY3VycmVudERhdGVUaW1lSW5wdXQpXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHsgbWNUaW1lcGlja2VyTG93ZXJUaGVuTWludGltZTogeyB0ZXh0OiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSB9IH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1heFRpbWVWYWxpZGF0b3IoKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLm1heFRpbWUgJiZcbiAgICAgICAgICAgIHRoaXMuY3VycmVudERhdGVUaW1lSW5wdXQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgdGhpcy5pc1RpbWVHcmVhdGVyVGhlbk1heCh0aGlzLmN1cnJlbnREYXRlVGltZUlucHV0KVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB7IG1jVGltZXBpY2tlckhpZ2hlclRoZW5NYXh0aW1lOiB7IHRleHQ6IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlIH0gfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNUaW1lTG93ZXJUaGVuTWluKHRpbWVUb0NvbXBhcmU6IEQpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRpbWVUb0NvbXBhcmUgPT09IHVuZGVmaW5lZCB8fCB0aW1lVG9Db21wYXJlID09PSAgbnVsbCB8fCB0aGlzLm1pblRpbWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVBZGFwdGVyLmNvbXBhcmVEYXRlVGltZSh0aW1lVG9Db21wYXJlLCB0aGlzLmdldERhdGVGcm9tVGltZVN0cmluZyh0aGlzLm1pblRpbWUpKSA8IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1RpbWVHcmVhdGVyVGhlbk1heCh0aW1lVG9Db21wYXJlOiBEKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aW1lVG9Db21wYXJlID09PSB1bmRlZmluZWQgfHwgdGltZVRvQ29tcGFyZSA9PT0gIG51bGwgfHwgdGhpcy5tYXhUaW1lID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5kYXRlQWRhcHRlci5jb21wYXJlRGF0ZVRpbWUodGltZVRvQ29tcGFyZSwgdGhpcy5nZXREYXRlRnJvbVRpbWVTdHJpbmcodGhpcy5tYXhUaW1lKSkgPj0gMDtcbiAgICB9XG59XG4iXX0=