(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/cdk/platform'), require('@angular/common'), require('@angular/core'), require('@angular/forms'), require('@angular/cdk/coercion'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/mosaic/core'), require('@ptsecurity/mosaic/form-field'), require('rxjs'), require('@ptsecurity/cdk/datetime')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/timepicker', ['exports', '@angular/cdk/a11y', '@angular/cdk/platform', '@angular/common', '@angular/core', '@angular/forms', '@angular/cdk/coercion', '@ptsecurity/cdk/keycodes', '@ptsecurity/mosaic/core', '@ptsecurity/mosaic/form-field', 'rxjs', '@ptsecurity/cdk/datetime'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.timepicker = {}), global.ng.cdk.a11y, global.ng.cdk.platform, global.ng.common, global.ng.core, global.ng.forms, global.ng.cdk.coercion, global.mc.cdk.keycodes, global.ptsecurity.mosaic.core, global.ptsecurity.mosaic["form-field"], global.rxjs, global.mc.cdk.datetime));
})(this, (function (exports, a11y, platform, common, i0, forms, coercion, keycodes, core, formField, rxjs, i1) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

    var _a;
    // tslint:disable:naming-convention
    exports.TimeParts = void 0;
    (function (TimeParts) {
        TimeParts[TimeParts["hours"] = 0] = "hours";
        TimeParts[TimeParts["minutes"] = 1] = "minutes";
        TimeParts[TimeParts["seconds"] = 2] = "seconds";
    })(exports.TimeParts || (exports.TimeParts = {}));
    exports.TimeFormats = void 0;
    (function (TimeFormats) {
        TimeFormats["HHmmss"] = "HH:mm:ss";
        TimeFormats["HHmm"] = "HH:mm";
    })(exports.TimeFormats || (exports.TimeFormats = {}));
    var TIMEFORMAT_PLACEHOLDERS = (_a = {},
        _a[exports.TimeFormats.HHmmss] = 'чч:мм:сс',
        _a[exports.TimeFormats.HHmm] = 'чч:мм',
        _a);
    var DEFAULT_TIME_FORMAT = exports.TimeFormats.HHmm;
    var HOURS_MINUTES_SECONDS_REGEXP = /^([0-1][0-9]|2[0-3]):?([0-5][0-9]):?([0-5][0-9])?$/;
    var HOURS_MINUTES_REGEXP = /^([0-1][0-9]|2[0-3]):?([0-5][0-9])?$/;
    var HOURS_ONLY_REGEXP = /^([0-1][0-9]|2[0-3]):?$/;
    var AM_PM_FORMAT_REGEXP = /^([0-1]?[0-9]):([0-5]?[0-9]) ([ap][m]?$)/i;
    var SECONDS_PER_MINUTE = 59;
    var MINUTES_PER_HOUR = 59;
    var HOURS_PER_DAY = 23;

    /** @docs-private */
    var MC_TIMEPICKER_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return McTimepicker; }),
        multi: true
    };
    /** @docs-private */
    var MC_TIMEPICKER_VALIDATORS = {
        provide: forms.NG_VALIDATORS,
        useExisting: i0.forwardRef(function () { return McTimepicker; }),
        multi: true
    };
    var uniqueComponentIdSuffix = 0;
    var shortFormatSize = 5;
    var fullFormatSize = 8;
    var McTimepicker = /** @class */ (function () {
        function McTimepicker(elementRef, renderer, dateAdapter) {
            var _this = this;
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.dateAdapter = dateAdapter;
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            this.stateChanges = new rxjs.Subject();
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            this.focused = false;
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            this.controlType = 'timepicker';
            this._placeholder = TIMEFORMAT_PLACEHOLDERS[DEFAULT_TIME_FORMAT];
            this._format = DEFAULT_TIME_FORMAT;
            this._min = null;
            this._max = null;
            this.incorrectInput = new i0.EventEmitter();
            this.uid = "mc-timepicker-" + uniqueComponentIdSuffix++;
            this.lastValueValid = false;
            this.defaultPlaceholder = true;
            this.onInput = function () {
                var formattedValue = _this.formatUserInput(_this.viewValue);
                var newTimeObj = _this.getDateFromTimeString(formattedValue);
                _this.lastValueValid = !!newTimeObj;
                if (!newTimeObj) {
                    _this.onChange(null);
                    return;
                }
                var selectionStart = _this.selectionStart;
                var selectionEnd = _this.selectionEnd;
                _this.setViewValue(_this.getTimeStringFromDate(newTimeObj, _this.format));
                _this.selectionStart = selectionStart;
                _this.selectionEnd = selectionEnd;
                _this.createSelectionOfTimeComponentInInput(selectionStart + 1);
                _this.value = newTimeObj;
                _this.onChange(newTimeObj);
                _this.stateChanges.next();
            };
            this.parseValidator = function () {
                return _this.focused ||
                    _this.empty ||
                    _this.lastValueValid ? null : { mcTimepickerParse: { text: _this.viewValue } };
            };
            this.minValidator = function (control) {
                var controlValue = _this.getValidDateOrNull(_this.dateAdapter.deserialize(control.value));
                return (!_this.min || !controlValue || _this.compareTime(_this.min, controlValue) <= 0) ?
                    null :
                    { mcTimepickerLowerThenMin: { min: _this.min, actual: controlValue } };
            };
            this.maxValidator = function (control) {
                var controlValue = _this.getValidDateOrNull(_this.dateAdapter.deserialize(control.value));
                return (!_this.max || !controlValue || _this.compareTime(_this.max, controlValue) >= 0) ?
                    null :
                    { mcTimepickerHigherThenMax: { max: _this.max, actual: controlValue } };
            };
            // tslint:disable-next-line:no-empty
            this.validatorOnChange = function () { };
            if (!this.dateAdapter) {
                throw Error("McTimepicker: No provider found for DateAdapter. You must import one of the existing " +
                    "modules at your application root or provide a custom implementation or use exists ones.");
            }
            this.validator = forms.Validators.compose([this.parseValidator, this.minValidator, this.maxValidator]);
            this.onChange = rxjs.noop;
            // Force setter to be called in case id was not specified.
            this.id = this.id;
        }
        Object.defineProperty(McTimepicker.prototype, "placeholder", {
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            get: function () {
                return this._placeholder;
            },
            set: function (value) {
                this._placeholder = value;
                this.defaultPlaceholder = false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
                // Browsers may not fire the blur event if the input is disabled too quickly.
                // Reset from here to ensure that the element doesn't become stuck.
                if (this.focused) {
                    this.focused = false;
                }
                this.stateChanges.next();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (value) {
                this._id = value || this.uid;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "required", {
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            get: function () {
                return this._required;
            },
            set: function (value) {
                this._required = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "format", {
            get: function () {
                return this._format;
            },
            set: function (formatValue) {
                this._format = Object
                    .keys(exports.TimeFormats)
                    .map(function (timeFormatKey) { return exports.TimeFormats[timeFormatKey]; })
                    .indexOf(formatValue) > -1 ? formatValue : DEFAULT_TIME_FORMAT;
                if (this.defaultPlaceholder) {
                    this._placeholder = TIMEFORMAT_PLACEHOLDERS[this._format];
                }
                if (this.value) {
                    this.updateView();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "min", {
            get: function () {
                return this._min;
            },
            set: function (value) {
                this._min = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
                this.validatorOnChange();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "max", {
            get: function () {
                return this._max;
            },
            set: function (value) {
                this._max = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
                this.validatorOnChange();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                var newValue = this.dateAdapter.deserialize(value);
                this.lastValueValid = !newValue || this.dateAdapter.isValid(newValue);
                this._value = this.getValidDateOrNull(newValue);
                this.updateView();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "mcValidationTooltip", {
            set: function (tooltip) {
                if (!tooltip) {
                    return;
                }
                tooltip.enterDelay = core.validationTooltipShowDelay;
                tooltip.trigger = 'manual';
                tooltip.initListeners();
                this.incorrectInput.subscribe(function () {
                    if (tooltip.isOpen) {
                        return;
                    }
                    tooltip.show();
                    setTimeout(function () { return tooltip.hide(); }, core.validationTooltipHideDelay);
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "hasSelection", {
            get: function () {
                return this.selectionStart !== this.selectionEnd;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "isFullFormat", {
            get: function () {
                return this.format === exports.TimeFormats.HHmmss;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "isShortFormat", {
            get: function () {
                return this.format === exports.TimeFormats.HHmm;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "viewValue", {
            get: function () {
                return this.elementRef.nativeElement.value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "ngControl", {
            get: function () {
                return this.control;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "empty", {
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            get: function () {
                return !this.viewValue && !this.isBadInput();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "selectionStart", {
            get: function () {
                return this.elementRef.nativeElement.selectionStart;
            },
            set: function (value) {
                this.elementRef.nativeElement.selectionStart = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "selectionEnd", {
            get: function () {
                return this.elementRef.nativeElement.selectionEnd;
            },
            set: function (value) {
                this.elementRef.nativeElement.selectionEnd = value;
            },
            enumerable: false,
            configurable: true
        });
        McTimepicker.prototype.ngOnDestroy = function () {
            this.stateChanges.complete();
        };
        McTimepicker.prototype.getSize = function () {
            return this.isFullFormat ? fullFormatSize : shortFormatSize;
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
            this.focusChanged(false);
            this.onInput();
        };
        McTimepicker.prototype.onPaste = function ($event) {
            $event.preventDefault();
            var value = this.formatUserPaste($event.clipboardData.getData('text'));
            var newTimeObj = this.getDateFromTimeString(value);
            if (!newTimeObj) {
                return;
            }
            this.setViewValue(this.getTimeStringFromDate(newTimeObj, this.format));
            this.value = newTimeObj;
            this.onChange(newTimeObj);
            this.stateChanges.next();
        };
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        McTimepicker.prototype.onContainerClick = function () {
            this.focus();
        };
        McTimepicker.prototype.onKeyDown = function (event) {
            // tslint:disable-next-line: deprecation
            var keyCode = event.keyCode;
            if (keycodes.isLetterKey(event) && !event.ctrlKey && !event.metaKey) {
                event.preventDefault();
                this.incorrectInput.emit();
            }
            else if ((keycodes.hasModifierKey(event) && (keycodes.isVerticalMovement(event) || keycodes.isHorizontalMovement(event))) ||
                event.ctrlKey || event.metaKey ||
                [keycodes.DELETE, keycodes.BACKSPACE, keycodes.TAB].includes(keyCode)) {
                rxjs.noop();
            }
            else if (keyCode === keycodes.SPACE) {
                this.spaceKeyHandler(event);
            }
            else if ([keycodes.HOME, keycodes.PAGE_UP].includes(keyCode)) {
                this.createSelectionOfTimeComponentInInput(0);
            }
            else if ([keycodes.END, keycodes.PAGE_DOWN].includes(keyCode)) {
                this.createSelectionOfTimeComponentInInput(this.viewValue.length);
            }
            else if ([keycodes.UP_ARROW, keycodes.DOWN_ARROW].includes(keyCode)) {
                event.preventDefault();
                this.verticalArrowKeyHandler(keyCode);
            }
            else if ([keycodes.LEFT_ARROW, keycodes.RIGHT_ARROW].includes(keyCode)) {
                this.horizontalArrowKeyHandler(keyCode);
            }
            else if (/^\D$/.test(event.key)) {
                event.preventDefault();
                var newValue = this.getNewValue(event.key, this.selectionStart);
                var formattedValue = this.replaceSymbols(newValue);
                if (newValue !== formattedValue) {
                    this.setViewValue(formattedValue);
                    setTimeout(this.onInput);
                }
                else {
                    this.incorrectInput.emit();
                }
            }
            else {
                setTimeout(this.onInput);
            }
        };
        McTimepicker.prototype.validate = function (control) {
            this.setControl(control);
            return this.validator ? this.validator(control) : null;
        };
        McTimepicker.prototype.registerOnValidatorChange = function (fn) {
            this.validatorOnChange = fn;
        };
        McTimepicker.prototype.writeValue = function (value) {
            this.value = value;
        };
        McTimepicker.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        McTimepicker.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        McTimepicker.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
        };
        McTimepicker.prototype.formatUserPaste = function (value) {
            var _a;
            if (value.match(AM_PM_FORMAT_REGEXP)) {
                return value;
            }
            var match = value.match(/^(\D+)?(?<hours>\d+)?(\D+)?(\D+)?(?<minutes>\d+)?(\D+)?(\D+)?(?<seconds>\d+)?(\D+)?$/);
            if (!((_a = match === null || match === void 0 ? void 0 : match.groups) === null || _a === void 0 ? void 0 : _a.hours)) {
                this.setViewValue(value);
                return value;
            }
            return this.replaceNumbers(Object.values(match.groups)
                // tslint:disable-next-line:no-magic-numbers
                .map(function (group) { return (group || '').padStart(2, '0'); })
                .join(':'));
        };
        McTimepicker.prototype.formatUserInput = function (value) {
            return this.replaceNumbers(this.replaceSymbols(value));
        };
        McTimepicker.prototype.replaceSymbols = function (value) {
            var formattedValue = value;
            var match = value.match(/^(\d\d:){0,2}(?<number>[0-9])(?<symbol>\W)(:\d\d){0,2}$/);
            if (match === null || match === void 0 ? void 0 : match.groups) {
                var _b = match.groups, number = _b.number, symbol = _b.symbol;
                formattedValue = value.replace(number + symbol, "0" + number);
            }
            return formattedValue;
        };
        McTimepicker.prototype.replaceNumbers = function (value) {
            var formattedValue = value;
            var match = value.match(/^(?<hours>\d{0,4}):?(?<minutes>\d{0,4}):?(?<seconds>\d{0,4})$/);
            if (match === null || match === void 0 ? void 0 : match.groups) {
                var _b = match.groups, hours = _b.hours, minutes = _b.minutes, seconds = _b.seconds;
                if (hours.length && parseInt(hours) > HOURS_PER_DAY) {
                    formattedValue = formattedValue.replace(hours, HOURS_PER_DAY.toString());
                }
                if (minutes.length && parseInt(minutes) > MINUTES_PER_HOUR) {
                    formattedValue = formattedValue.replace(minutes, MINUTES_PER_HOUR.toString());
                }
                if (seconds.length && parseInt(seconds) > SECONDS_PER_MINUTE) {
                    formattedValue = formattedValue.replace(seconds, SECONDS_PER_MINUTE.toString());
                }
            }
            return formattedValue;
        };
        /** Checks whether the input is invalid based on the native validation. */
        McTimepicker.prototype.isBadInput = function () {
            var validity = this.elementRef.nativeElement.validity;
            return validity && validity.badInput;
        };
        McTimepicker.prototype.spaceKeyHandler = function (event) {
            event.preventDefault();
            if (this.selectionStart === this.selectionEnd) {
                var value = this.getNewValue(event.key, this.selectionStart);
                var formattedValue = this.replaceSymbols(value);
                if (value !== formattedValue) {
                    this.setViewValue(formattedValue);
                    setTimeout(this.onInput);
                }
            }
            else if (this.selectionStart !== this.selectionEnd) {
                var cursorPos = this.selectionStart;
                var nextDividerPos = this.viewValue.indexOf(':', cursorPos);
                cursorPos = nextDividerPos ? nextDividerPos + 1 : 0;
                this.createSelectionOfTimeComponentInInput(cursorPos);
            }
        };
        McTimepicker.prototype.getNewValue = function (key, position) {
            return [this.viewValue.slice(0, position), key, this.viewValue.slice(position)].join('');
        };
        McTimepicker.prototype.verticalArrowKeyHandler = function (keyCode) {
            if (!this.value) {
                return;
            }
            var changedTime;
            var newEditParams = this.getTimeEditMetrics(this.selectionStart);
            if (keyCode === keycodes.UP_ARROW) {
                changedTime = this.incrementTime(this.value, newEditParams.modifiedTimePart);
            }
            if (keyCode === keycodes.DOWN_ARROW) {
                changedTime = this.decrementTime(this.value, newEditParams.modifiedTimePart);
            }
            this.value = changedTime;
            this.selectionStart = newEditParams.cursorStartPosition;
            this.selectionEnd = newEditParams.cursorEndPosition;
            this.onChange(changedTime);
            this.stateChanges.next();
        };
        McTimepicker.prototype.horizontalArrowKeyHandler = function (keyCode) {
            if (!this.value) {
                return;
            }
            var cursorPos = this.selectionStart;
            if (keyCode === keycodes.LEFT_ARROW) {
                cursorPos = cursorPos === 0 ? this.viewValue.length : cursorPos - 1;
            }
            else if (keyCode === keycodes.RIGHT_ARROW) {
                var nextDividerPos = this.viewValue.indexOf(':', cursorPos);
                cursorPos = nextDividerPos ? nextDividerPos + 1 : 0;
            }
            this.createSelectionOfTimeComponentInInput(cursorPos);
        };
        McTimepicker.prototype.createSelectionOfTimeComponentInInput = function (cursorPos) {
            var _this = this;
            setTimeout(function () {
                var newEditParams = _this.getTimeEditMetrics(cursorPos);
                _this.selectionStart = newEditParams.cursorStartPosition;
                _this.selectionEnd = newEditParams.cursorEndPosition;
            });
        };
        McTimepicker.prototype.incrementTime = function (dateVal, whatToIncrement) {
            if (whatToIncrement === void 0) { whatToIncrement = exports.TimeParts.seconds; }
            var hours = this.dateAdapter.getHours(dateVal);
            var minutes = this.dateAdapter.getMinutes(dateVal);
            var seconds = this.dateAdapter.getSeconds(dateVal);
            switch (whatToIncrement) {
                case exports.TimeParts.hours:
                    hours++;
                    break;
                case exports.TimeParts.minutes:
                    minutes++;
                    break;
                case exports.TimeParts.seconds:
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
        McTimepicker.prototype.decrementTime = function (dateVal, whatToDecrement) {
            if (whatToDecrement === void 0) { whatToDecrement = exports.TimeParts.seconds; }
            var hours = this.dateAdapter.getHours(dateVal);
            var minutes = this.dateAdapter.getMinutes(dateVal);
            var seconds = this.dateAdapter.getSeconds(dateVal);
            switch (whatToDecrement) {
                case exports.TimeParts.hours:
                    hours--;
                    break;
                case exports.TimeParts.minutes:
                    minutes--;
                    break;
                case exports.TimeParts.seconds:
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
        McTimepicker.prototype.getTimeEditMetrics = function (cursorPosition) {
            var timeString = this.viewValue;
            var modifiedTimePart;
            var cursorStartPosition;
            var cursorEndPosition;
            var hoursIndex = 0;
            var minutesIndex = timeString.indexOf(':', hoursIndex + 1);
            var secondsIndex = minutesIndex !== -1 ? timeString.indexOf(':', minutesIndex + 1) : -1;
            if (secondsIndex !== -1 && cursorPosition > secondsIndex) {
                modifiedTimePart = exports.TimeParts.seconds;
                cursorStartPosition = secondsIndex + 1;
                cursorEndPosition = timeString.length;
            }
            else if (minutesIndex !== -1 && cursorPosition > minutesIndex) {
                modifiedTimePart = exports.TimeParts.minutes;
                cursorStartPosition = minutesIndex + 1;
                cursorEndPosition = secondsIndex > -1 ? secondsIndex : timeString.length;
            }
            else {
                modifiedTimePart = exports.TimeParts.hours;
                cursorStartPosition = hoursIndex;
                cursorEndPosition = minutesIndex !== -1 ? minutesIndex : timeString.length;
            }
            return { modifiedTimePart: modifiedTimePart, cursorStartPosition: cursorStartPosition, cursorEndPosition: cursorEndPosition };
        };
        /**
         * @description Create time string for displaying inside input element of UI
         */
        McTimepicker.prototype.getTimeStringFromDate = function (value, timeFormat) {
            if (!value || !this.dateAdapter.isValid(value)) {
                return '';
            }
            return this.dateAdapter.format(value, timeFormat);
        };
        McTimepicker.prototype.getDateFromTimeString = function (timeString) {
            if (!timeString) {
                return null;
            }
            var HMS = timeString.match(HOURS_MINUTES_SECONDS_REGEXP);
            var HM = timeString.match(HOURS_MINUTES_REGEXP);
            var H = timeString.match(HOURS_ONLY_REGEXP);
            var amPm = timeString.match(AM_PM_FORMAT_REGEXP);
            var hours = 0;
            var minutes = 0;
            var seconds = 0;
            // tslint:disable:no-magic-numbers
            if (amPm) {
                hours = Number(amPm[1]);
                minutes = Number(amPm[2]);
                if (/[p]/i.test(amPm[3]) || (/[a]/i.test(amPm[3]) && hours === 12)) {
                    hours += 12;
                }
            }
            else if (HMS) {
                hours = Number(HMS[1]);
                minutes = Number(HMS[2]);
                seconds = Number(HMS[3]);
            }
            else if (HM) {
                hours = Number(HM[1]);
                minutes = Number(HM[2]);
            }
            else if (H) {
                hours = Number(H[1]);
            }
            else {
                return null;
            }
            // tslint:enable
            var resultDate = this.dateAdapter.createDateTime(this.dateAdapter.getYear(this.value), this.dateAdapter.getMonth(this.value), this.dateAdapter.getDate(this.value), hours, minutes || 0, seconds || 0, this.dateAdapter.getMilliseconds(this.value));
            return this.getValidDateOrNull(resultDate);
        };
        McTimepicker.prototype.compareTime = function (first, second) {
            var result = this.dateAdapter.getHours(first) - this.dateAdapter.getHours(second) ||
                this.dateAdapter.getMinutes(first) - this.dateAdapter.getMinutes(second);
            if (exports.TimeFormats.HHmm === this.format) {
                return result;
            }
            else if (exports.TimeFormats.HHmmss === this.format) {
                return result || this.dateAdapter.getSeconds(first) - this.dateAdapter.getSeconds(second);
            }
            else {
                throw Error("Unknown format: " + this.format);
            }
        };
        McTimepicker.prototype.getValidDateOrNull = function (obj) {
            return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
        };
        McTimepicker.prototype.setViewValue = function (value) {
            this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
        };
        McTimepicker.prototype.updateView = function () {
            var formattedValue = this.getTimeStringFromDate(this.value, this.format);
            this.setViewValue(formattedValue);
        };
        McTimepicker.prototype.setControl = function (control) {
            if (!this.control) {
                this.control = control;
            }
        };
        return McTimepicker;
    }());
    /** @nocollapse */ McTimepicker.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McTimepicker, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.Renderer2 }, { token: i1__namespace.DateAdapter, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McTimepicker.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McTimepicker, selector: "input[mcTimepicker]", inputs: { placeholder: "placeholder", disabled: "disabled", id: "id", required: "required", format: "format", min: "min", max: "max", value: "value", mcValidationTooltip: "mcValidationTooltip" }, outputs: { incorrectInput: "incorrectInput" }, host: { listeners: { "blur": "onBlur()", "focus": "focusChanged(true)", "paste": "onPaste($event)", "keydown": "onKeyDown($event)" }, properties: { "attr.id": "id", "attr.placeholder": "placeholder", "attr.disabled": "disabled || null", "attr.required": "required", "attr.size": "getSize()", "attr.autocomplete": "\"off\"" }, classAttribute: "mc-input mc-timepicker" }, providers: [
            MC_TIMEPICKER_VALIDATORS,
            MC_TIMEPICKER_VALUE_ACCESSOR,
            { provide: formField.McFormFieldControl, useExisting: McTimepicker }
        ], exportAs: ["mcTimepicker"], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McTimepicker, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: 'input[mcTimepicker]',
                        exportAs: 'mcTimepicker',
                        host: {
                            class: 'mc-input mc-timepicker',
                            // Native input properties that are overwritten by Angular inputs need to be synced with
                            // the native input element. Otherwise property bindings for those don't work.
                            '[attr.id]': 'id',
                            '[attr.placeholder]': 'placeholder',
                            '[attr.disabled]': 'disabled || null',
                            '[attr.required]': 'required',
                            '[attr.size]': 'getSize()',
                            '[attr.autocomplete]': '"off"',
                            '(blur)': 'onBlur()',
                            '(focus)': 'focusChanged(true)',
                            '(paste)': 'onPaste($event)',
                            '(keydown)': 'onKeyDown($event)'
                        },
                        providers: [
                            MC_TIMEPICKER_VALIDATORS,
                            MC_TIMEPICKER_VALUE_ACCESSOR,
                            { provide: formField.McFormFieldControl, useExisting: McTimepicker }
                        ]
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.Renderer2 }, { type: i1__namespace.DateAdapter, decorators: [{
                            type: i0.Optional
                        }] }];
        }, propDecorators: { placeholder: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], id: [{
                    type: i0.Input
                }], required: [{
                    type: i0.Input
                }], format: [{
                    type: i0.Input
                }], min: [{
                    type: i0.Input
                }], max: [{
                    type: i0.Input
                }], value: [{
                    type: i0.Input
                }], mcValidationTooltip: [{
                    type: i0.Input
                }], incorrectInput: [{
                    type: i0.Output
                }] } });

    var McTimepickerModule = /** @class */ (function () {
        function McTimepickerModule() {
        }
        return McTimepickerModule;
    }());
    /** @nocollapse */ McTimepickerModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McTimepickerModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ McTimepickerModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McTimepickerModule, declarations: [McTimepicker], imports: [common.CommonModule,
            a11y.A11yModule,
            platform.PlatformModule,
            forms.FormsModule], exports: [McTimepicker] });
    /** @nocollapse */ McTimepickerModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McTimepickerModule, imports: [[
                common.CommonModule,
                a11y.A11yModule,
                platform.PlatformModule,
                forms.FormsModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McTimepickerModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            common.CommonModule,
                            a11y.A11yModule,
                            platform.PlatformModule,
                            forms.FormsModule
                        ],
                        declarations: [McTimepicker],
                        exports: [McTimepicker]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AM_PM_FORMAT_REGEXP = AM_PM_FORMAT_REGEXP;
    exports.DEFAULT_TIME_FORMAT = DEFAULT_TIME_FORMAT;
    exports.HOURS_MINUTES_REGEXP = HOURS_MINUTES_REGEXP;
    exports.HOURS_MINUTES_SECONDS_REGEXP = HOURS_MINUTES_SECONDS_REGEXP;
    exports.HOURS_ONLY_REGEXP = HOURS_ONLY_REGEXP;
    exports.HOURS_PER_DAY = HOURS_PER_DAY;
    exports.MC_TIMEPICKER_VALIDATORS = MC_TIMEPICKER_VALIDATORS;
    exports.MC_TIMEPICKER_VALUE_ACCESSOR = MC_TIMEPICKER_VALUE_ACCESSOR;
    exports.MINUTES_PER_HOUR = MINUTES_PER_HOUR;
    exports.McTimepicker = McTimepicker;
    exports.McTimepickerModule = McTimepickerModule;
    exports.SECONDS_PER_MINUTE = SECONDS_PER_MINUTE;
    exports.TIMEFORMAT_PLACEHOLDERS = TIMEFORMAT_PLACEHOLDERS;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ptsecurity-mosaic-timepicker.umd.js.map
