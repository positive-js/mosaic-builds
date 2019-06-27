/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/coercion'), require('@angular/core'), require('@angular/forms'), require('@ptsecurity/cdk/datetime'), require('@ptsecurity/mosaic/core'), require('@ptsecurity/mosaic/form-field'), require('@ptsecurity/mosaic/input'), require('rxjs'), require('@angular/cdk/platform'), require('@angular/common'), require('@ptsecurity/cdk/a11y')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/timepicker', ['exports', '@angular/cdk/coercion', '@angular/core', '@angular/forms', '@ptsecurity/cdk/datetime', '@ptsecurity/mosaic/core', '@ptsecurity/mosaic/form-field', '@ptsecurity/mosaic/input', 'rxjs', '@angular/cdk/platform', '@angular/common', '@ptsecurity/cdk/a11y'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.timepicker = {}),global.ng.cdk.coercion,global.ng.core,global.ng.forms,global.ng.cdk.datetime,global.ng.mosaic.core,global.ng.mosaic.formField,global.ng.mosaic.input,global.rxjs,global.ng.cdk.platform,global.ng.common,global.ng.cdk.a11y));
}(this, (function (exports,coercion,core,forms,datetime,core$1,formField,input,rxjs,platform,common,a11y) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var _a;
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var TimeParts = {
    hours: 0,
    minutes: 1,
    seconds: 2,
};
TimeParts[TimeParts.hours] = 'hours';
TimeParts[TimeParts.minutes] = 'minutes';
TimeParts[TimeParts.seconds] = 'seconds';
/** @enum {string} */
var TimeFormats = {
    HHmmss: 'HH:mm:ss',
    HHmm: 'HH:mm',
};
/** @type {?} */
var TIMEFORMAT_PLACEHOLDERS = (_a = {}, _a[TimeFormats.HHmmss] = '  :  :  ', _a[TimeFormats.HHmm] = '  :  ', _a);
/** @type {?} */
var DEFAULT_TIME_FORMAT = TimeFormats.HHmm;
/** @type {?} */
var HOURS_MINUTES_SECONDS_REGEXP = new RegExp(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]|[0-9]):([0-5][0-9]|[0-9])?$/);
/** @type {?} */
var HOURS_MINUTES_REGEXP = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]|[0-9])?$/;
/** @type {?} */
var HOURS_ONLY_REGEXP = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):?$/;
/** @type {?} */
var SECONDS_PER_MINUTE = 59;
/** @type {?} */
var MINUTES_PER_HOUR = 59;
/** @type {?} */
var HOURS_PER_DAY = 23;
// TODO Move it to common CDK
/** @type {?} */
var ARROW_UP_KEYCODE = 'ArrowUp';
/** @type {?} */
var ARROW_DOWN_KEYCODE = 'ArrowDown';
/** @type {?} */
var ARROW_LEFT_KEYCODE = 'ArrowLeft';
/** @type {?} */
var ARROW_RIGHT_KEYCODE = 'ArrowRight';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
// tslint:disable-next-line naming-convention
/** @type {?} */
var McTimepickerMixinBase = core$1.mixinErrorState(McTimepickerBase);
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
        _this.focused = false;
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         */
        _this.stateChanges = new rxjs.Subject();
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         */
        _this.controlType = 'mc-timepicker';
        _this.uid = "mc-timepicker-" + uniqueComponentIdSuffix++;
        _this._minTime = null;
        _this._maxTime = null;
        if (!_this.dateAdapter) {
            throw Error("McTimepicker: No provider found for DateAdapter. You must import one of the existing " +
                "modules at your application root or provide a custom implementation or use exists ones.");
        }
        // If no input value accessor was explicitly specified, use the element as the input value
        // accessor.
        _this.inputValueAccessor = inputValueAccessor || _this.elementRef.nativeElement;
        _this.previousNativeValue = _this.value;
        _this.onChange = rxjs.noop;
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
                ? [control.validator].concat(myValidators) : myValidators;
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
            this._disabled = coercion.coerceBooleanProperty(value);
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
        function () { return this._id; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._id = value || this.uid; },
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
        function () { return this._required; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._required = coercion.coerceBooleanProperty(value); },
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
        function () { return this.inputValueAccessor.value; },
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
        function () { return this._timeFormat; },
        set: /**
         * @param {?} formatValue
         * @return {?}
         */
        function (formatValue) {
            this._timeFormat = Object
                .keys(TimeFormats)
                .map((/**
             * @param {?} timeFormatKey
             * @return {?}
             */
            function (timeFormatKey) { return TimeFormats[timeFormatKey]; }))
                .indexOf(formatValue) > -1 ? formatValue : DEFAULT_TIME_FORMAT;
            ((/** @type {?} */ (this.ngControl.control))).updateValueAndValidity();
            this.placeholder = TIMEFORMAT_PLACEHOLDERS[this._timeFormat];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "minTime", {
        get: /**
         * @return {?}
         */
        function () { return this._minTime; },
        set: /**
         * @param {?} minValue
         * @return {?}
         */
        function (minValue) {
            this._minTime = minValue;
            this.minDateTime = minValue !== null ? this.getDateFromTimeString(minValue) : undefined;
            ((/** @type {?} */ (this.ngControl.control))).updateValueAndValidity();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "maxTime", {
        get: /**
         * @return {?}
         */
        function () { return this._maxTime; },
        set: /**
         * @param {?} maxValue
         * @return {?}
         */
        function (maxValue) {
            this._maxTime = maxValue;
            this.maxDateTime = maxValue !== null ? this.getDateFromTimeString(maxValue) : undefined;
            ((/** @type {?} */ (this.ngControl.control))).updateValueAndValidity();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McTimepicker.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.stateChanges.next();
    };
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
            this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.getTimeStringFromDate(value, this.timeFormat));
        }
        this.onChange(value || null);
        this.applyInputChanges();
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
     * @param {?} tempVal
     * @param {?=} timeFormat
     * @return {?}
     */
    McTimepicker.prototype.getTimeStringFromDate = /**
     * \@description Create time string for displaying inside input element of UI
     * @private
     * @param {?} tempVal
     * @param {?=} timeFormat
     * @return {?}
     */
    function (tempVal, timeFormat) {
        var _a;
        if (timeFormat === void 0) { timeFormat = DEFAULT_TIME_FORMAT; }
        /** @type {?} */
        var hours = this.getNumberWithLeadingZero(tempVal.getHours());
        /** @type {?} */
        var minutes = this.getNumberWithLeadingZero(tempVal.getMinutes());
        /** @type {?} */
        var seconds = this.getNumberWithLeadingZero(tempVal.getSeconds());
        /** @type {?} */
        var formattedTimeGenerators = (_a = {}, _a[TimeFormats.HHmm] = (/**
             * @return {?}
             */
            function () { return hours + ":" + minutes; }), _a[TimeFormats.HHmmss] = (/**
             * @return {?}
             */
            function () { return hours + ":" + minutes + ":" + seconds; }), _a);
        return formattedTimeGenerators[timeFormat]();
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
            ? momentWrappedTime.format('HH:mm:ss')
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
        // const timestamp: number = Date.parse(fullDateString);
        /** @type {?} */
        var resultDate = new Date(1970, 0, 1, hours, minutes, seconds);
        // tslint:enable no-magic-numbers
        return isNaN(resultDate.getTime()) ? undefined : resultDate;
    };
    /**
     * @private
     * @param {?} digit
     * @return {?}
     */
    McTimepicker.prototype.getNumberWithLeadingZero = /**
     * @private
     * @param {?} digit
     * @return {?}
     */
    function (digit) {
        /** @type {?} */
        var MAX_DIGIT_WITH_LEADING_ZERO = 9;
        return digit > MAX_DIGIT_WITH_LEADING_ZERO ? "" + digit : "0" + digit;
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
            hours: dateVal.getHours(),
            minutes: dateVal.getMinutes(),
            seconds: dateVal.getSeconds()
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
        if (this.currentDateTimeInput !== undefined &&
            this.minDateTime !== undefined &&
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
        if (this.currentDateTimeInput !== undefined &&
            this.maxDateTime !== undefined &&
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
        return timeToCompare.getTime() - ((/** @type {?} */ (this.minDateTime))).getTime() < 0;
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
        return timeToCompare.getTime() - ((/** @type {?} */ (this.maxDateTime))).getTime() >= 0;
    };
    McTimepicker.decorators = [
        { type: core.Directive, args: [{
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
                            provide: formField.McFormFieldControl,
                            useExisting: core.forwardRef((/**
                             * @return {?}
                             */
                            function () { return McTimepicker; }))
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    McTimepicker.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: forms.NgControl, decorators: [{ type: core.Optional }, { type: core.Self }] },
        { type: forms.NgForm, decorators: [{ type: core.Optional }] },
        { type: forms.FormGroupDirective, decorators: [{ type: core.Optional }] },
        { type: core$1.ErrorStateMatcher },
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Self }, { type: core.Inject, args: [input.MC_INPUT_VALUE_ACCESSOR,] }] },
        { type: core.Renderer2 },
        { type: datetime.DateAdapter, decorators: [{ type: core.Optional }] }
    ]; };
    McTimepicker.propDecorators = {
        errorStateMatcher: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        id: [{ type: core.Input }],
        placeholder: [{ type: core.Input }],
        required: [{ type: core.Input }],
        value: [{ type: core.Input }],
        timeFormat: [{ type: core.Input, args: ['time-format',] }],
        minTime: [{ type: core.Input, args: ['min-time',] }],
        maxTime: [{ type: core.Input, args: ['max-time',] }]
    };
    return McTimepicker;
}(McTimepickerMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McTimepickerModule = /** @class */ (function () {
    function McTimepickerModule() {
    }
    McTimepickerModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        a11y.A11yModule,
                        platform.PlatformModule,
                        forms.FormsModule
                    ],
                    declarations: [
                        McTimepicker
                    ],
                    exports: [
                        McTimepicker
                    ]
                },] },
    ];
    return McTimepickerModule;
}());

exports.McTimepickerModule = McTimepickerModule;
exports.TimeParts = TimeParts;
exports.TimeFormats = TimeFormats;
exports.TIMEFORMAT_PLACEHOLDERS = TIMEFORMAT_PLACEHOLDERS;
exports.DEFAULT_TIME_FORMAT = DEFAULT_TIME_FORMAT;
exports.HOURS_MINUTES_SECONDS_REGEXP = HOURS_MINUTES_SECONDS_REGEXP;
exports.HOURS_MINUTES_REGEXP = HOURS_MINUTES_REGEXP;
exports.HOURS_ONLY_REGEXP = HOURS_ONLY_REGEXP;
exports.SECONDS_PER_MINUTE = SECONDS_PER_MINUTE;
exports.MINUTES_PER_HOUR = MINUTES_PER_HOUR;
exports.HOURS_PER_DAY = HOURS_PER_DAY;
exports.ARROW_UP_KEYCODE = ARROW_UP_KEYCODE;
exports.ARROW_DOWN_KEYCODE = ARROW_DOWN_KEYCODE;
exports.ARROW_LEFT_KEYCODE = ARROW_LEFT_KEYCODE;
exports.ARROW_RIGHT_KEYCODE = ARROW_RIGHT_KEYCODE;
exports.McTimepickerBase = McTimepickerBase;
exports.McTimepickerMixinBase = McTimepickerMixinBase;
exports.McTimepicker = McTimepicker;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-timepicker.umd.js.map
