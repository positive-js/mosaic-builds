(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/cdk/platform'), require('@angular/common'), require('@angular/core'), require('@angular/forms'), require('@angular/cdk/coercion'), require('@ptsecurity/cdk/datetime'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/mosaic/form-field'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/timepicker', ['exports', '@angular/cdk/a11y', '@angular/cdk/platform', '@angular/common', '@angular/core', '@angular/forms', '@angular/cdk/coercion', '@ptsecurity/cdk/datetime', '@ptsecurity/cdk/keycodes', '@ptsecurity/mosaic/form-field', 'rxjs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.timepicker = {}), global.ng.cdk.a11y, global.ng.cdk.platform, global.ng.common, global.ng.core, global.ng.forms, global.ng.cdk.coercion, global.datetime, global.keycodes, global.ptsecurity.mosaic['form-field'], global.rxjs));
}(this, (function (exports, a11y, platform, common, core, forms, coercion, datetime, keycodes, formField, rxjs) { 'use strict';

    var _a;
    /**
     * @fileoverview added by tsickle
     * Generated from: timepicker.constants.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        HHmmss: "HH:mm:ss",
        HHmm: "HH:mm",
    };
    /** @type {?} */
    var TIMEFORMAT_PLACEHOLDERS = (_a = {},
        _a[TimeFormats.HHmmss] = 'чч:мм:сс',
        _a[TimeFormats.HHmm] = 'чч:мм',
        _a);
    /** @type {?} */
    var DEFAULT_TIME_FORMAT = TimeFormats.HHmm;
    /** @type {?} */
    var HOURS_MINUTES_SECONDS_REGEXP = /^([0-1][0-9]|2[0-3]):?([0-5][0-9]):?([0-5][0-9])?$/;
    /** @type {?} */
    var HOURS_MINUTES_REGEXP = /^([0-1][0-9]|2[0-3]):?([0-5][0-9])?$/;
    /** @type {?} */
    var HOURS_ONLY_REGEXP = /^([0-1][0-9]|2[0-3]):?$/;
    /** @type {?} */
    var AM_PM_FORMAT_REGEXP = /^([0-1]?[0-9]):([0-5]?[0-9]) ([ap][m]?$)/i;
    /** @type {?} */
    var SECONDS_PER_MINUTE = 59;
    /** @type {?} */
    var MINUTES_PER_HOUR = 59;
    /** @type {?} */
    var HOURS_PER_DAY = 23;

    /**
     * @fileoverview added by tsickle
     * Generated from: timepicker.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * \@docs-private
     * @type {?}
     */
    var MC_TIMEPICKER_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(( /**
         * @return {?}
         */function () { return McTimepicker; })),
        multi: true
    };
    /**
     * \@docs-private
     * @type {?}
     */
    var MC_TIMEPICKER_VALIDATORS = {
        provide: forms.NG_VALIDATORS,
        useExisting: core.forwardRef(( /**
         * @return {?}
         */function () { return McTimepicker; })),
        multi: true
    };
    /** @type {?} */
    var uniqueComponentIdSuffix = 0;
    /** @type {?} */
    var shortFormatSize = 5;
    /** @type {?} */
    var fullFormatSize = 8;
    /** @type {?} */
    var validationTooltipShowDelay = 10;
    /** @type {?} */
    var validationTooltipHideDelay = 3000;
    /**
     * @template D
     */
    var McTimepicker = /** @class */ (function () {
        /**
         * @param {?} elementRef
         * @param {?} dateAdapter
         * @param {?} renderer
         */
        function McTimepicker(elementRef, dateAdapter, renderer) {
            var _this = this;
            this.elementRef = elementRef;
            this.dateAdapter = dateAdapter;
            this.renderer = renderer;
            /**
             * Implemented as part of McFormFieldControl.
             * \@docs-private
             */
            this.stateChanges = new rxjs.Subject();
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
            this._format = DEFAULT_TIME_FORMAT;
            this._min = null;
            this._max = null;
            this.incorrectInput = new core.EventEmitter();
            this.uid = "mc-timepicker-" + uniqueComponentIdSuffix++;
            this.lastValueValid = false;
            this.onInput = ( /**
             * @return {?}
             */function () {
                /** @type {?} */
                var formattedValue = _this.formatUserInput(_this.viewValue);
                /** @type {?} */
                var newTimeObj = _this.getDateFromTimeString(formattedValue);
                _this.lastValueValid = !!newTimeObj;
                if (!newTimeObj) {
                    _this.control.updateValueAndValidity();
                    return;
                }
                /** @type {?} */
                var selectionStart = _this.selectionStart;
                /** @type {?} */
                var selectionEnd = _this.selectionEnd;
                _this.setViewValue(_this.getTimeStringFromDate(newTimeObj, _this.format));
                _this.selectionStart = selectionStart;
                _this.selectionEnd = selectionEnd;
                _this.createSelectionOfTimeComponentInInput((( /** @type {?} */(selectionStart))) + 1);
                _this.value = newTimeObj;
                _this.onChange(newTimeObj);
                _this.stateChanges.next();
            });
            this.parseValidator = ( /**
             * @return {?}
             */function () {
                return _this.focused ||
                    _this.empty ||
                    _this.lastValueValid ? null : { mcTimepickerParse: { text: _this.viewValue } };
            });
            this.minValidator = ( /**
             * @param {?} control
             * @return {?}
             */function (control) {
                /** @type {?} */
                var controlValue = _this.getValidDateOrNull(_this.dateAdapter.deserialize(control.value));
                return (!_this.min || !controlValue || _this.compareTime(_this.min, controlValue) <= 0) ?
                    null :
                    { mcTimepickerLowerThenMin: { min: _this.min, actual: controlValue } };
            });
            this.maxValidator = ( /**
             * @param {?} control
             * @return {?}
             */function (control) {
                /** @type {?} */
                var controlValue = _this.getValidDateOrNull(_this.dateAdapter.deserialize(control.value));
                return (!_this.max || !controlValue || _this.compareTime(_this.max, controlValue) >= 0) ?
                    null :
                    { mcTimepickerHigherThenMax: { max: _this.max, actual: controlValue } };
            });
            // tslint:disable-next-line:no-empty
            this.validatorOnChange = ( /**
             * @return {?}
             */function () { });
            if (!this.dateAdapter) {
                throw Error("McTimepicker: No provider found for DateAdapter. You must import one of the existing " +
                    "modules at your application root or provide a custom implementation or use exists ones.");
            }
            this.validator = forms.Validators.compose([this.parseValidator, this.minValidator, this.maxValidator]);
            this.onChange = rxjs.noop;
            // Force setter to be called in case id was not specified.
            this.id = this.id;
            this.placeholder = TIMEFORMAT_PLACEHOLDERS[DEFAULT_TIME_FORMAT];
        }
        Object.defineProperty(McTimepicker.prototype, "disabled", {
            /**
             * @return {?}
             */
            get: function () {
                return this._disabled;
            },
            /**
             * @param {?} value
             * @return {?}
             */
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
            /**
             * @return {?}
             */
            get: function () {
                return this._id;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._id = value || this.uid;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "required", {
            /**
             * Implemented as part of McFormFieldControl.
             * \@docs-private
             * @return {?}
             */
            get: function () {
                return this._required;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._required = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "format", {
            /**
             * @return {?}
             */
            get: function () {
                return this._format;
            },
            /**
             * @param {?} formatValue
             * @return {?}
             */
            set: function (formatValue) {
                this._format = Object
                    .keys(TimeFormats)
                    .map(( /**
             * @param {?} timeFormatKey
             * @return {?}
             */function (timeFormatKey) { return TimeFormats[timeFormatKey]; }))
                    .indexOf(formatValue) > -1 ? formatValue : DEFAULT_TIME_FORMAT;
                this.placeholder = TIMEFORMAT_PLACEHOLDERS[this._format];
                if (this.value) {
                    this.updateView();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "min", {
            /**
             * @return {?}
             */
            get: function () {
                return this._min;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._min = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
                this.validatorOnChange();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "max", {
            /**
             * @return {?}
             */
            get: function () {
                return this._max;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._max = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
                this.validatorOnChange();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "value", {
            /**
             * @return {?}
             */
            get: function () {
                return this._value;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                /** @type {?} */
                var newValue = this.dateAdapter.deserialize(value);
                this.lastValueValid = !newValue || this.dateAdapter.isValid(newValue);
                this._value = this.getValidDateOrNull(newValue);
                this.updateView();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "mcValidationTooltip", {
            /**
             * @param {?} tooltip
             * @return {?}
             */
            set: function (tooltip) {
                if (!tooltip) {
                    return;
                }
                tooltip.mcMouseEnterDelay = validationTooltipShowDelay;
                tooltip.mcTrigger = 'manual';
                tooltip.mcTooltipClass = 'mc-tooltip_warning';
                tooltip.initElementRefListeners();
                this.incorrectInput.subscribe(( /**
                 * @return {?}
                 */function () {
                    if (tooltip.isTooltipOpen) {
                        return;
                    }
                    tooltip.show();
                    setTimeout(( /**
                     * @return {?}
                     */function () { return tooltip.hide(); }), validationTooltipHideDelay);
                }));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "hasSelection", {
            /**
             * @return {?}
             */
            get: function () {
                return this.selectionStart !== this.selectionEnd;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "isFullFormat", {
            /**
             * @return {?}
             */
            get: function () {
                return this.format === TimeFormats.HHmmss;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "isShortFormat", {
            /**
             * @return {?}
             */
            get: function () {
                return this.format === TimeFormats.HHmm;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "viewValue", {
            /**
             * @return {?}
             */
            get: function () {
                return this.elementRef.nativeElement.value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "ngControl", {
            /**
             * @return {?}
             */
            get: function () {
                return this.control;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "empty", {
            /**
             * Implemented as part of McFormFieldControl.
             * \@docs-private
             * @return {?}
             */
            get: function () {
                return !this.viewValue && !this.isBadInput();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "selectionStart", {
            /**
             * @return {?}
             */
            get: function () {
                return this.elementRef.nativeElement.selectionStart;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this.elementRef.nativeElement.selectionStart = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McTimepicker.prototype, "selectionEnd", {
            /**
             * @return {?}
             */
            get: function () {
                return this.elementRef.nativeElement.selectionEnd;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this.elementRef.nativeElement.selectionEnd = value;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @return {?}
         */
        McTimepicker.prototype.ngOnDestroy = function () {
            this.stateChanges.complete();
        };
        /**
         * @return {?}
         */
        McTimepicker.prototype.getSize = function () {
            return this.isFullFormat ? fullFormatSize : shortFormatSize;
        };
        /**
         * @return {?}
         */
        McTimepicker.prototype.focus = function () {
            this.elementRef.nativeElement.focus();
        };
        /**
         * @param {?} isFocused
         * @return {?}
         */
        McTimepicker.prototype.focusChanged = function (isFocused) {
            if (isFocused !== this.focused) {
                this.focused = isFocused;
                this.onTouched();
                this.stateChanges.next();
            }
        };
        /**
         * @return {?}
         */
        McTimepicker.prototype.onBlur = function () {
            this.lastValueValid = !!this.getDateFromTimeString(this.viewValue);
            this.focusChanged(false);
            this.control.updateValueAndValidity();
        };
        /**
         * @param {?} $event
         * @return {?}
         */
        McTimepicker.prototype.onPaste = function ($event) {
            $event.preventDefault();
            /** @type {?} */
            var value = this.formatUserPaste($event.clipboardData.getData('text'));
            /** @type {?} */
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
         * \@docs-private
         * @return {?}
         */
        McTimepicker.prototype.onContainerClick = function () {
            this.focus();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        McTimepicker.prototype.onKeyDown = function (event) {
            // tslint:disable-next-line: deprecation
            /** @type {?} */
            var keyCode = event.keyCode;
            if (keycodes.isLetterKey(event) && !event.ctrlKey && !event.metaKey) {
                event.preventDefault();
                this.incorrectInput.emit();
            }
            else if ((keycodes.hasModifierKey(event) && (keycodes.isVerticalMovement(keyCode) || keycodes.isHorizontalMovement(keyCode))) ||
                event.ctrlKey || event.metaKey ||
                [keycodes.DELETE, keycodes.BACKSPACE].includes(keyCode)) {
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
                /** @type {?} */
                var newValue = this.getNewValue(event.key, ( /** @type {?} */(this.selectionStart)));
                /** @type {?} */
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
        /**
         * @param {?} control
         * @return {?}
         */
        McTimepicker.prototype.validate = function (control) {
            this.setControl(control);
            return this.validator ? this.validator(control) : null;
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        McTimepicker.prototype.registerOnValidatorChange = function (fn) {
            this.validatorOnChange = fn;
        };
        /**
         * @param {?} value
         * @return {?}
         */
        McTimepicker.prototype.writeValue = function (value) {
            this.value = value;
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        McTimepicker.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        McTimepicker.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        McTimepicker.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        McTimepicker.prototype.formatUserPaste = function (value) {
            var _a;
            if (value.match(AM_PM_FORMAT_REGEXP)) {
                return value;
            }
            /** @type {?} */
            var match = value.match(/^(\D+)?(?<hours>\d+)?(\D+)?(\D+)?(?<minutes>\d+)?(\D+)?(\D+)?(?<seconds>\d+)?(\D+)?$/);
            if (!((_a = match === null || match === void 0 ? void 0 : match.groups) === null || _a === void 0 ? void 0 : _a.hours)) {
                this.setViewValue(value);
                return value;
            }
            return this.replaceNumbers(Object.values(match.groups)
                // tslint:disable-next-line:no-magic-numbers
                .map(( /**
         * @param {?} group
         * @return {?}
         */function (group) { return (group || '').padStart(2, '0'); }))
                .join(':'));
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        McTimepicker.prototype.formatUserInput = function (value) {
            return this.replaceNumbers(this.replaceSymbols(value));
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        McTimepicker.prototype.replaceSymbols = function (value) {
            /** @type {?} */
            var formattedValue = value;
            /** @type {?} */
            var match = value.match(/^(\d\d:){0,2}(?<number>[0-9])(?<symbol>\W)(:\d\d){0,2}$/);
            if (match === null || match === void 0 ? void 0 : match.groups) {
                var _b = match.groups, number = _b.number, symbol = _b.symbol;
                formattedValue = value.replace(number + symbol, "0" + number);
            }
            return formattedValue;
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        McTimepicker.prototype.replaceNumbers = function (value) {
            /** @type {?} */
            var formattedValue = value;
            /** @type {?} */
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
        /**
         * Checks whether the input is invalid based on the native validation.
         * @private
         * @return {?}
         */
        McTimepicker.prototype.isBadInput = function () {
            /** @type {?} */
            var validity = (( /** @type {?} */(this.elementRef.nativeElement))).validity;
            return validity && validity.badInput;
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        McTimepicker.prototype.spaceKeyHandler = function (event) {
            event.preventDefault();
            if (this.selectionStart === this.selectionEnd) {
                /** @type {?} */
                var value = this.getNewValue(event.key, ( /** @type {?} */(this.selectionStart)));
                /** @type {?} */
                var formattedValue = this.replaceSymbols(value);
                if (value !== formattedValue) {
                    this.setViewValue(formattedValue);
                    setTimeout(this.onInput);
                }
            }
            else if (this.selectionStart !== this.selectionEnd) {
                /** @type {?} */
                var cursorPos = ( /** @type {?} */(this.selectionStart));
                /** @type {?} */
                var nextDividerPos = this.viewValue.indexOf(':', cursorPos);
                cursorPos = nextDividerPos ? nextDividerPos + 1 : 0;
                this.createSelectionOfTimeComponentInInput(cursorPos);
            }
        };
        /**
         * @private
         * @param {?} key
         * @param {?} position
         * @return {?}
         */
        McTimepicker.prototype.getNewValue = function (key, position) {
            return [this.viewValue.slice(0, position), key, this.viewValue.slice(position)].join('');
        };
        /**
         * @private
         * @param {?} keyCode
         * @return {?}
         */
        McTimepicker.prototype.verticalArrowKeyHandler = function (keyCode) {
            if (!this.value) {
                return;
            }
            /** @type {?} */
            var changedTime;
            /** @type {?} */
            var newEditParams = this.getTimeEditMetrics(( /** @type {?} */(this.selectionStart)));
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
        /**
         * @private
         * @param {?} keyCode
         * @return {?}
         */
        McTimepicker.prototype.horizontalArrowKeyHandler = function (keyCode) {
            if (!this.value) {
                return;
            }
            /** @type {?} */
            var cursorPos = ( /** @type {?} */(this.selectionStart));
            if (keyCode === keycodes.LEFT_ARROW) {
                cursorPos = cursorPos === 0 ? this.viewValue.length : cursorPos - 1;
            }
            else if (keyCode === keycodes.RIGHT_ARROW) {
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
        McTimepicker.prototype.createSelectionOfTimeComponentInInput = function (cursorPos) {
            var _this = this;
            setTimeout(( /**
             * @return {?}
             */function () {
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
        McTimepicker.prototype.incrementTime = function (dateVal, whatToIncrement) {
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
        McTimepicker.prototype.decrementTime = function (dateVal, whatToDecrement) {
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
         * \@description Get params for arrow-keys (up/down) time valie edit.
         * @private
         * @param {?} cursorPosition Current cursor position in timeString
         * @return {?}
         */
        McTimepicker.prototype.getTimeEditMetrics = function (cursorPosition) {
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
         * \@description Create time string for displaying inside input element of UI
         * @private
         * @param {?} value
         * @param {?} timeFormat
         * @return {?}
         */
        McTimepicker.prototype.getTimeStringFromDate = function (value, timeFormat) {
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
        McTimepicker.prototype.getDateFromTimeString = function (timeString) {
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
        McTimepicker.prototype.compareTime = function (first, second) {
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
        McTimepicker.prototype.getValidDateOrNull = function (obj) {
            return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        McTimepicker.prototype.setViewValue = function (value) {
            this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
        };
        /**
         * @private
         * @return {?}
         */
        McTimepicker.prototype.updateView = function () {
            /** @type {?} */
            var formattedValue = this.getTimeStringFromDate(this.value, this.format);
            this.setViewValue(formattedValue);
        };
        /**
         * @private
         * @param {?} control
         * @return {?}
         */
        McTimepicker.prototype.setControl = function (control) {
            if (!this.control) {
                this.control = control;
            }
        };
        return McTimepicker;
    }());
    McTimepicker.decorators = [
        { type: core.Directive, args: [{
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
                },] }
    ];
    /** @nocollapse */
    McTimepicker.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: datetime.DateAdapter, decorators: [{ type: core.Optional }] },
        { type: core.Renderer2 }
    ]; };
    McTimepicker.propDecorators = {
        placeholder: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        id: [{ type: core.Input }],
        required: [{ type: core.Input }],
        format: [{ type: core.Input }],
        min: [{ type: core.Input }],
        max: [{ type: core.Input }],
        value: [{ type: core.Input }],
        mcValidationTooltip: [{ type: core.Input }],
        incorrectInput: [{ type: core.Output }]
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
        /** @type {?} */
        McTimepicker.prototype.incorrectInput;
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
        McTimepicker.prototype.onChange;
        /**
         * @type {?}
         * @private
         */
        McTimepicker.prototype.onTouched;
        /** @type {?} */
        McTimepicker.prototype.onInput;
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
    var McTimepickerModule = /** @class */ (function () {
        function McTimepickerModule() {
        }
        return McTimepickerModule;
    }());
    McTimepickerModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        a11y.A11yModule,
                        platform.PlatformModule,
                        forms.FormsModule
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
    exports.TimeFormats = TimeFormats;
    exports.TimeParts = TimeParts;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-timepicker.umd.js.map
