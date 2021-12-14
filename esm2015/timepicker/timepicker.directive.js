import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, EventEmitter, forwardRef, Input, Optional, Output, Renderer2 } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { DateAdapter } from '@ptsecurity/cdk/datetime';
import { DOWN_ARROW, UP_ARROW, HOME, END, LEFT_ARROW, RIGHT_ARROW, PAGE_DOWN, PAGE_UP, SPACE, DELETE, BACKSPACE, hasModifierKey, isLetterKey, isVerticalMovement, isHorizontalMovement, TAB } from '@ptsecurity/cdk/keycodes';
import { validationTooltipHideDelay, validationTooltipShowDelay } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { McWarningTooltipTrigger } from '@ptsecurity/mosaic/tooltip';
import { noop, Subject } from 'rxjs';
import { DEFAULT_TIME_FORMAT, HOURS_PER_DAY, HOURS_MINUTES_REGEXP, HOURS_MINUTES_SECONDS_REGEXP, HOURS_ONLY_REGEXP, MINUTES_PER_HOUR, SECONDS_PER_MINUTE, TIMEFORMAT_PLACEHOLDERS, TimeFormats, TimeParts, AM_PM_FORMAT_REGEXP } from './timepicker.constants';
import * as i0 from "@angular/core";
import * as i1 from "@ptsecurity/cdk/datetime";
/** @docs-private */
export const MC_TIMEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => McTimepicker),
    multi: true
};
/** @docs-private */
export const MC_TIMEPICKER_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => McTimepicker),
    multi: true
};
let uniqueComponentIdSuffix = 0;
const shortFormatSize = 5;
const fullFormatSize = 8;
export class McTimepicker {
    constructor(elementRef, renderer, dateAdapter) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.dateAdapter = dateAdapter;
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        this.stateChanges = new Subject();
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
        this.incorrectInput = new EventEmitter();
        this.uid = `mc-timepicker-${uniqueComponentIdSuffix++}`;
        this.lastValueValid = false;
        this.defaultPlaceholder = true;
        this.onInput = () => {
            const formattedValue = this.formatUserInput(this.viewValue);
            const newTimeObj = this.getDateFromTimeString(formattedValue);
            this.lastValueValid = !!newTimeObj;
            if (!newTimeObj) {
                this.onChange(null);
                return;
            }
            const selectionStart = this.selectionStart;
            const selectionEnd = this.selectionEnd;
            this.setViewValue(this.getTimeStringFromDate(newTimeObj, this.format));
            this.selectionStart = selectionStart;
            this.selectionEnd = selectionEnd;
            this.createSelectionOfTimeComponentInInput(selectionStart + 1);
            this.value = newTimeObj;
            this.onChange(newTimeObj);
            this.stateChanges.next();
        };
        this.parseValidator = () => {
            return this.focused ||
                this.empty ||
                this.lastValueValid ? null : { mcTimepickerParse: { text: this.viewValue } };
        };
        this.minValidator = (control) => {
            const controlValue = this.getValidDateOrNull(this.dateAdapter.deserialize(control.value));
            return (!this.min || !controlValue || this.compareTime(this.min, controlValue) <= 0) ?
                null :
                { mcTimepickerLowerThenMin: { min: this.min, actual: controlValue } };
        };
        this.maxValidator = (control) => {
            const controlValue = this.getValidDateOrNull(this.dateAdapter.deserialize(control.value));
            return (!this.max || !controlValue || this.compareTime(this.max, controlValue) >= 0) ?
                null :
                { mcTimepickerHigherThenMax: { max: this.max, actual: controlValue } };
        };
        // tslint:disable-next-line:no-empty
        this.validatorOnChange = () => { };
        if (!this.dateAdapter) {
            throw Error(`McTimepicker: No provider found for DateAdapter. You must import one of the existing ` +
                `modules at your application root or provide a custom implementation or use exists ones.`);
        }
        this.validator = Validators.compose([this.parseValidator, this.minValidator, this.maxValidator]);
        this.onChange = noop;
        // Force setter to be called in case id was not specified.
        this.id = this.id;
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get placeholder() {
        return this._placeholder;
    }
    set placeholder(value) {
        this._placeholder = value;
        this.defaultPlaceholder = false;
    }
    get disabled() {
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
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value || this.uid;
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
    }
    get format() {
        return this._format;
    }
    set format(formatValue) {
        this._format = Object
            .keys(TimeFormats)
            .map((timeFormatKey) => TimeFormats[timeFormatKey])
            .indexOf(formatValue) > -1 ? formatValue : DEFAULT_TIME_FORMAT;
        if (this.defaultPlaceholder) {
            this._placeholder = TIMEFORMAT_PLACEHOLDERS[this._format];
        }
        if (this.value) {
            this.updateView();
        }
    }
    get min() {
        return this._min;
    }
    set min(value) {
        this._min = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        this.validatorOnChange();
    }
    get max() {
        return this._max;
    }
    set max(value) {
        this._max = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        this.validatorOnChange();
    }
    get value() {
        return this._value;
    }
    set value(value) {
        const newValue = this.dateAdapter.deserialize(value);
        this.lastValueValid = !newValue || this.dateAdapter.isValid(newValue);
        this._value = this.getValidDateOrNull(newValue);
        this.updateView();
    }
    set mcValidationTooltip(tooltip) {
        if (!tooltip) {
            return;
        }
        tooltip.enterDelay = validationTooltipShowDelay;
        tooltip.trigger = 'manual';
        tooltip.initListeners();
        this.incorrectInput.subscribe(() => {
            if (tooltip.isOpen) {
                return;
            }
            tooltip.show();
            setTimeout(() => tooltip.hide(), validationTooltipHideDelay);
        });
    }
    get hasSelection() {
        return this.selectionStart !== this.selectionEnd;
    }
    get isFullFormat() {
        return this.format === TimeFormats.HHmmss;
    }
    get isShortFormat() {
        return this.format === TimeFormats.HHmm;
    }
    get viewValue() {
        return this.elementRef.nativeElement.value;
    }
    get ngControl() {
        return this.control;
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get empty() {
        return !this.viewValue && !this.isBadInput();
    }
    get selectionStart() {
        return this.elementRef.nativeElement.selectionStart;
    }
    set selectionStart(value) {
        this.elementRef.nativeElement.selectionStart = value;
    }
    get selectionEnd() {
        return this.elementRef.nativeElement.selectionEnd;
    }
    set selectionEnd(value) {
        this.elementRef.nativeElement.selectionEnd = value;
    }
    ngOnDestroy() {
        this.stateChanges.complete();
    }
    getSize() {
        return this.isFullFormat ? fullFormatSize : shortFormatSize;
    }
    focus() {
        this.elementRef.nativeElement.focus();
    }
    focusChanged(isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.onTouched();
            this.stateChanges.next();
        }
    }
    onBlur() {
        this.focusChanged(false);
        this.setViewValue(this.formatUserPaste(this.viewValue));
        this.onInput();
    }
    onPaste($event) {
        $event.preventDefault();
        const value = this.formatUserPaste($event.clipboardData.getData('text'));
        const newTimeObj = this.getDateFromTimeString(value);
        if (!newTimeObj) {
            return;
        }
        this.setViewValue(this.getTimeStringFromDate(newTimeObj, this.format));
        this.value = newTimeObj;
        this.onChange(newTimeObj);
        this.stateChanges.next();
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    onContainerClick() {
        this.focus();
    }
    onKeyDown(event) {
        // tslint:disable-next-line: deprecation
        const keyCode = event.keyCode;
        if (isLetterKey(event) && !event.ctrlKey && !event.metaKey) {
            event.preventDefault();
            this.incorrectInput.emit();
        }
        else if ((hasModifierKey(event) && (isVerticalMovement(event) || isHorizontalMovement(event))) ||
            event.ctrlKey || event.metaKey ||
            [DELETE, BACKSPACE, TAB].includes(keyCode)) {
            noop();
        }
        else if (keyCode === SPACE) {
            this.spaceKeyHandler(event);
        }
        else if ([HOME, PAGE_UP].includes(keyCode)) {
            this.createSelectionOfTimeComponentInInput(0);
        }
        else if ([END, PAGE_DOWN].includes(keyCode)) {
            this.createSelectionOfTimeComponentInInput(this.viewValue.length);
        }
        else if ([UP_ARROW, DOWN_ARROW].includes(keyCode)) {
            event.preventDefault();
            this.verticalArrowKeyHandler(keyCode);
        }
        else if ([LEFT_ARROW, RIGHT_ARROW].includes(keyCode)) {
            this.horizontalArrowKeyHandler(keyCode);
        }
        else if (/^\D$/.test(event.key)) {
            event.preventDefault();
            const newValue = this.getNewValue(event.key, this.selectionStart);
            const formattedValue = this.replaceSymbols(newValue);
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
    }
    validate(control) {
        this.setControl(control);
        return this.validator ? this.validator(control) : null;
    }
    registerOnValidatorChange(fn) {
        this.validatorOnChange = fn;
    }
    writeValue(value) {
        this.value = value;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    formatUserPaste(value) {
        var _a;
        if (value.match(AM_PM_FORMAT_REGEXP)) {
            return value;
        }
        const match = value.match(/^(\D+)?(?<hours>\d+)?(\D+)?(\D+)?(?<minutes>\d+)?(\D+)?(\D+)?(?<seconds>\d+)?(\D+)?$/);
        if (!((_a = match === null || match === void 0 ? void 0 : match.groups) === null || _a === void 0 ? void 0 : _a.hours)) {
            this.setViewValue(value);
            return value;
        }
        return this.replaceNumbers(Object.values(match.groups)
            // tslint:disable-next-line:no-magic-numbers
            .map((group) => (group || '').padStart(2, '0'))
            .join(':'));
    }
    formatUserInput(value) {
        return this.replaceNumbers(this.replaceSymbols(value));
    }
    replaceSymbols(value) {
        let formattedValue = value;
        const match = value.match(/^(\d\d:){0,2}(?<number>[0-9])(?<symbol>\W)(:\d\d){0,2}$/);
        if (match === null || match === void 0 ? void 0 : match.groups) {
            const { number, symbol } = match.groups;
            formattedValue = value.replace(number + symbol, `0${number}`);
        }
        return formattedValue;
    }
    replaceNumbers(value) {
        let formattedValue = value;
        const match = value.match(/^(?<hours>\d{0,4}):?(?<minutes>\d{0,4}):?(?<seconds>\d{0,4})$/);
        if (match === null || match === void 0 ? void 0 : match.groups) {
            const { hours, minutes, seconds } = match.groups;
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
    }
    /** Checks whether the input is invalid based on the native validation. */
    isBadInput() {
        const validity = this.elementRef.nativeElement.validity;
        return validity && validity.badInput;
    }
    spaceKeyHandler(event) {
        event.preventDefault();
        if (this.selectionStart === this.selectionEnd) {
            const value = this.getNewValue(event.key, this.selectionStart);
            const formattedValue = this.replaceSymbols(value);
            if (value !== formattedValue) {
                this.setViewValue(formattedValue);
                setTimeout(this.onInput);
            }
        }
        else if (this.selectionStart !== this.selectionEnd) {
            let cursorPos = this.selectionStart;
            const nextDividerPos = this.viewValue.indexOf(':', cursorPos);
            cursorPos = nextDividerPos ? nextDividerPos + 1 : 0;
            this.createSelectionOfTimeComponentInInput(cursorPos);
        }
    }
    getNewValue(key, position) {
        return [this.viewValue.slice(0, position), key, this.viewValue.slice(position)].join('');
    }
    verticalArrowKeyHandler(keyCode) {
        if (!this.value) {
            return;
        }
        let changedTime;
        const newEditParams = this.getTimeEditMetrics(this.selectionStart);
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
    horizontalArrowKeyHandler(keyCode) {
        if (!this.value) {
            return;
        }
        let cursorPos = this.selectionStart;
        if (keyCode === LEFT_ARROW) {
            cursorPos = cursorPos === 0 ? this.viewValue.length : cursorPos - 1;
        }
        else if (keyCode === RIGHT_ARROW) {
            const nextDividerPos = this.viewValue.indexOf(':', cursorPos);
            cursorPos = nextDividerPos ? nextDividerPos + 1 : 0;
        }
        this.createSelectionOfTimeComponentInInput(cursorPos);
    }
    createSelectionOfTimeComponentInInput(cursorPos) {
        setTimeout(() => {
            const newEditParams = this.getTimeEditMetrics(cursorPos);
            this.selectionStart = newEditParams.cursorStartPosition;
            this.selectionEnd = newEditParams.cursorEndPosition;
        });
    }
    incrementTime(dateVal, whatToIncrement = TimeParts.seconds) {
        let hours = this.dateAdapter.getHours(dateVal);
        let minutes = this.dateAdapter.getMinutes(dateVal);
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
    decrementTime(dateVal, whatToDecrement = TimeParts.seconds) {
        let hours = this.dateAdapter.getHours(dateVal);
        let minutes = this.dateAdapter.getMinutes(dateVal);
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
     * @description Get params for arrow-keys (up/down) time valie edit.
     * @param cursorPosition Current cursor position in timeString
     */
    getTimeEditMetrics(cursorPosition) {
        const timeString = this.viewValue;
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
        return { modifiedTimePart, cursorStartPosition, cursorEndPosition };
    }
    /**
     * @description Create time string for displaying inside input element of UI
     */
    getTimeStringFromDate(value, timeFormat) {
        if (!value || !this.dateAdapter.isValid(value)) {
            return '';
        }
        return this.dateAdapter.format(value, timeFormat);
    }
    getDateFromTimeString(timeString) {
        if (!timeString) {
            return null;
        }
        const HMS = timeString.match(HOURS_MINUTES_SECONDS_REGEXP);
        const HM = timeString.match(HOURS_MINUTES_REGEXP);
        const H = timeString.match(HOURS_ONLY_REGEXP);
        const amPm = timeString.match(AM_PM_FORMAT_REGEXP);
        let hours = 0;
        let minutes = 0;
        let seconds = 0;
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
        const resultDate = this.dateAdapter.createDateTime(this.dateAdapter.getYear(this.value), this.dateAdapter.getMonth(this.value), this.dateAdapter.getDate(this.value), hours, minutes || 0, seconds || 0, this.dateAdapter.getMilliseconds(this.value));
        return this.getValidDateOrNull(resultDate);
    }
    compareTime(first, second) {
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
    getValidDateOrNull(obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    }
    setViewValue(value) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
    }
    updateView() {
        const formattedValue = this.getTimeStringFromDate(this.value, this.format);
        this.setViewValue(formattedValue);
    }
    setControl(control) {
        if (!this.control) {
            this.control = control;
        }
    }
}
/** @nocollapse */ McTimepicker.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTimepicker, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.DateAdapter, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTimepicker.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McTimepicker, selector: "input[mcTimepicker]", inputs: { placeholder: "placeholder", disabled: "disabled", id: "id", required: "required", format: "format", min: "min", max: "max", value: "value", mcValidationTooltip: "mcValidationTooltip" }, outputs: { incorrectInput: "incorrectInput" }, host: { listeners: { "blur": "onBlur()", "focus": "focusChanged(true)", "paste": "onPaste($event)", "keydown": "onKeyDown($event)" }, properties: { "attr.id": "id", "attr.placeholder": "placeholder", "attr.disabled": "disabled || null", "attr.required": "required", "attr.size": "getSize()", "attr.autocomplete": "\"off\"" }, classAttribute: "mc-input mc-timepicker" }, providers: [
        MC_TIMEPICKER_VALIDATORS,
        MC_TIMEPICKER_VALUE_ACCESSOR,
        { provide: McFormFieldControl, useExisting: McTimepicker }
    ], exportAs: ["mcTimepicker"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTimepicker, decorators: [{
            type: Directive,
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
                        { provide: McFormFieldControl, useExisting: McTimepicker }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.DateAdapter, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { placeholder: [{
                type: Input
            }], disabled: [{
                type: Input
            }], id: [{
                type: Input
            }], required: [{
                type: Input
            }], format: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], value: [{
                type: Input
            }], mcValidationTooltip: [{
                type: Input
            }], incorrectInput: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdGltZXBpY2tlci90aW1lcGlja2VyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0gsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBR0gsYUFBYSxFQUNiLGlCQUFpQixFQUlqQixVQUFVLEVBQ2IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUNILFVBQVUsRUFDVixRQUFRLEVBQ1IsSUFBSSxFQUNKLEdBQUcsRUFDSCxVQUFVLEVBQ1YsV0FBVyxFQUNYLFNBQVMsRUFDVCxPQUFPLEVBQ1AsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsY0FBYyxFQUNkLFdBQVcsRUFDWCxrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3BCLEdBQUcsRUFDTixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ25FLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXJDLE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLG9CQUFvQixFQUNwQiw0QkFBNEIsRUFDNUIsaUJBQWlCLEVBQ2pC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T0FBTzt3QkFFOUIsUUFBUSxFQUFFLFVBQVU7d0JBQ3BCLFNBQVMsRUFBRSxvQkFBb0I7d0JBRS9CLFNBQVMsRUFBRSxpQkFBaUI7d0JBRTVCLFdBQVcsRUFBRSxtQkFBbUI7cUJBQ25DO29CQUNELFNBQVMsRUFBRTt3QkFDUCx3QkFBd0I7d0JBQ3hCLDRCQUE0Qjt3QkFDNUIsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxjQUFjLEVBQUU7cUJBQzdEO2lCQUNKOzswQkFtT1EsUUFBUTs0Q0F4TVQsV0FBVztzQkFEZCxLQUFLO2dCQWNGLFFBQVE7c0JBRFgsS0FBSztnQkFvQkYsRUFBRTtzQkFETCxLQUFLO2dCQWdCRixRQUFRO3NCQURYLEtBQUs7Z0JBWUYsTUFBTTtzQkFEVCxLQUFLO2dCQXVCRixHQUFHO3NCQUROLEtBQUs7Z0JBYUYsR0FBRztzQkFETixLQUFLO2dCQWFGLEtBQUs7c0JBRFIsS0FBSztnQkFrQkYsbUJBQW1CO3NCQUR0QixLQUFLO2dCQWtCSSxjQUFjO3NCQUF2QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEFic3RyYWN0Q29udHJvbCxcbiAgICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgICBOR19WQUxJREFUT1JTLFxuICAgIE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIFZhbGlkYXRpb25FcnJvcnMsXG4gICAgVmFsaWRhdG9yLFxuICAgIFZhbGlkYXRvckZuLFxuICAgIFZhbGlkYXRvcnNcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvZGF0ZXRpbWUnO1xuaW1wb3J0IHtcbiAgICBET1dOX0FSUk9XLFxuICAgIFVQX0FSUk9XLFxuICAgIEhPTUUsXG4gICAgRU5ELFxuICAgIExFRlRfQVJST1csXG4gICAgUklHSFRfQVJST1csXG4gICAgUEFHRV9ET1dOLFxuICAgIFBBR0VfVVAsXG4gICAgU1BBQ0UsXG4gICAgREVMRVRFLFxuICAgIEJBQ0tTUEFDRSxcbiAgICBoYXNNb2RpZmllcktleSxcbiAgICBpc0xldHRlcktleSxcbiAgICBpc1ZlcnRpY2FsTW92ZW1lbnQsXG4gICAgaXNIb3Jpem9udGFsTW92ZW1lbnQsXG4gICAgVEFCXG59IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyB2YWxpZGF0aW9uVG9vbHRpcEhpZGVEZWxheSwgdmFsaWRhdGlvblRvb2x0aXBTaG93RGVsYXkgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0Zvcm1GaWVsZENvbnRyb2wgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBNY1dhcm5pbmdUb29sdGlwVHJpZ2dlciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy90b29sdGlwJztcbmltcG9ydCB7IG5vb3AsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtcbiAgICBERUZBVUxUX1RJTUVfRk9STUFULFxuICAgIEhPVVJTX1BFUl9EQVksXG4gICAgSE9VUlNfTUlOVVRFU19SRUdFWFAsXG4gICAgSE9VUlNfTUlOVVRFU19TRUNPTkRTX1JFR0VYUCxcbiAgICBIT1VSU19PTkxZX1JFR0VYUCxcbiAgICBNSU5VVEVTX1BFUl9IT1VSLFxuICAgIFNFQ09ORFNfUEVSX01JTlVURSxcbiAgICBUSU1FRk9STUFUX1BMQUNFSE9MREVSUyxcbiAgICBUaW1lRm9ybWF0cyxcbiAgICBUaW1lUGFydHMsXG4gICAgQU1fUE1fRk9STUFUX1JFR0VYUFxufSBmcm9tICcuL3RpbWVwaWNrZXIuY29uc3RhbnRzJztcblxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNvbnN0IE1DX1RJTUVQSUNLRVJfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNY1RpbWVwaWNrZXIpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNvbnN0IE1DX1RJTUVQSUNLRVJfVkFMSURBVE9SUzogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWNUaW1lcGlja2VyKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuXG5sZXQgdW5pcXVlQ29tcG9uZW50SWRTdWZmaXg6IG51bWJlciA9IDA7XG5cbmNvbnN0IHNob3J0Rm9ybWF0U2l6ZTogbnVtYmVyID0gNTtcbmNvbnN0IGZ1bGxGb3JtYXRTaXplOiBudW1iZXIgPSA4O1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnaW5wdXRbbWNUaW1lcGlja2VyXScsXG4gICAgZXhwb3J0QXM6ICdtY1RpbWVwaWNrZXInLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1pbnB1dCBtYy10aW1lcGlja2VyJyxcbiAgICAgICAgLy8gTmF0aXZlIGlucHV0IHByb3BlcnRpZXMgdGhhdCBhcmUgb3ZlcndyaXR0ZW4gYnkgQW5ndWxhciBpbnB1dHMgbmVlZCB0byBiZSBzeW5jZWQgd2l0aFxuICAgICAgICAvLyB0aGUgbmF0aXZlIGlucHV0IGVsZW1lbnQuIE90aGVyd2lzZSBwcm9wZXJ0eSBiaW5kaW5ncyBmb3IgdGhvc2UgZG9uJ3Qgd29yay5cbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCcsXG4gICAgICAgICdbYXR0ci5wbGFjZWhvbGRlcl0nOiAncGxhY2Vob2xkZXInLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICAgICAnW2F0dHIucmVxdWlyZWRdJzogJ3JlcXVpcmVkJyxcbiAgICAgICAgJ1thdHRyLnNpemVdJzogJ2dldFNpemUoKScsXG4gICAgICAgICdbYXR0ci5hdXRvY29tcGxldGVdJzogJ1wib2ZmXCInLFxuXG4gICAgICAgICcoYmx1ciknOiAnb25CbHVyKCknLFxuICAgICAgICAnKGZvY3VzKSc6ICdmb2N1c0NoYW5nZWQodHJ1ZSknLFxuXG4gICAgICAgICcocGFzdGUpJzogJ29uUGFzdGUoJGV2ZW50KScsXG5cbiAgICAgICAgJyhrZXlkb3duKSc6ICdvbktleURvd24oJGV2ZW50KSdcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBNQ19USU1FUElDS0VSX1ZBTElEQVRPUlMsXG4gICAgICAgIE1DX1RJTUVQSUNLRVJfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIHsgcHJvdmlkZTogTWNGb3JtRmllbGRDb250cm9sLCB1c2VFeGlzdGluZzogTWNUaW1lcGlja2VyIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jVGltZXBpY2tlcjxEPiBpbXBsZW1lbnRzIE1jRm9ybUZpZWxkQ29udHJvbDxEPiwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIFZhbGlkYXRvciwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgcmVhZG9ubHkgc3RhdGVDaGFuZ2VzOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIHJlYWRvbmx5IGVycm9yU3RhdGU6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGNvbnRyb2xUeXBlOiBzdHJpbmcgPSAndGltZXBpY2tlcic7XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgcGxhY2Vob2xkZXIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BsYWNlaG9sZGVyO1xuICAgIH1cblxuICAgIHNldCBwbGFjZWhvbGRlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy5kZWZhdWx0UGxhY2Vob2xkZXIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9wbGFjZWhvbGRlciA9IFRJTUVGT1JNQVRfUExBQ0VIT0xERVJTW0RFRkFVTFRfVElNRV9GT1JNQVRdO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIC8vIEJyb3dzZXJzIG1heSBub3QgZmlyZSB0aGUgYmx1ciBldmVudCBpZiB0aGUgaW5wdXQgaXMgZGlzYWJsZWQgdG9vIHF1aWNrbHkuXG4gICAgICAgIC8vIFJlc2V0IGZyb20gaGVyZSB0byBlbnN1cmUgdGhhdCB0aGUgZWxlbWVudCBkb2Vzbid0IGJlY29tZSBzdHVjay5cbiAgICAgICAgaWYgKHRoaXMuZm9jdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBpZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfVxuXG4gICAgc2V0IGlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faWQgPSB2YWx1ZSB8fCB0aGlzLnVpZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pZDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7XG4gICAgfVxuXG4gICAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXF1aXJlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGZvcm1hdCgpOiBUaW1lRm9ybWF0cyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mb3JtYXQ7XG4gICAgfVxuXG4gICAgc2V0IGZvcm1hdChmb3JtYXRWYWx1ZTogVGltZUZvcm1hdHMpIHtcbiAgICAgICAgdGhpcy5fZm9ybWF0ID0gT2JqZWN0XG4gICAgICAgICAgICAua2V5cyhUaW1lRm9ybWF0cylcbiAgICAgICAgICAgIC5tYXAoKHRpbWVGb3JtYXRLZXkpID0+IFRpbWVGb3JtYXRzW3RpbWVGb3JtYXRLZXldKVxuICAgICAgICAgICAgLmluZGV4T2YoZm9ybWF0VmFsdWUpID4gLTEgPyBmb3JtYXRWYWx1ZSA6IERFRkFVTFRfVElNRV9GT1JNQVQ7XG5cbiAgICAgICAgaWYgKHRoaXMuZGVmYXVsdFBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9wbGFjZWhvbGRlciA9IFRJTUVGT1JNQVRfUExBQ0VIT0xERVJTW3RoaXMuX2Zvcm1hdF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9mb3JtYXQ6IFRpbWVGb3JtYXRzID0gREVGQVVMVF9USU1FX0ZPUk1BVDtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1pbigpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9taW47XG4gICAgfVxuXG4gICAgc2V0IG1pbih2YWx1ZTogRCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbWluID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgICAgICB0aGlzLnZhbGlkYXRvck9uQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWluOiBEIHwgbnVsbCA9IG51bGw7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtYXgoKTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4O1xuICAgIH1cblxuICAgIHNldCBtYXgodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX21heCA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcbiAgICAgICAgdGhpcy52YWxpZGF0b3JPbkNoYW5nZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21heDogRCB8IG51bGwgPSBudWxsO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgdmFsdWUoKTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuXG4gICAgICAgIHRoaXMubGFzdFZhbHVlVmFsaWQgPSAhbmV3VmFsdWUgfHwgdGhpcy5kYXRlQWRhcHRlci5pc1ZhbGlkKG5ld1ZhbHVlKTtcblxuICAgICAgICB0aGlzLl92YWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKG5ld1ZhbHVlKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF92YWx1ZTogRCB8IG51bGw7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBtY1ZhbGlkYXRpb25Ub29sdGlwKHRvb2x0aXA6IE1jV2FybmluZ1Rvb2x0aXBUcmlnZ2VyKSB7XG4gICAgICAgIGlmICghdG9vbHRpcCkgeyByZXR1cm47IH1cblxuICAgICAgICB0b29sdGlwLmVudGVyRGVsYXkgPSB2YWxpZGF0aW9uVG9vbHRpcFNob3dEZWxheTtcbiAgICAgICAgdG9vbHRpcC50cmlnZ2VyID0gJ21hbnVhbCc7XG5cbiAgICAgICAgdG9vbHRpcC5pbml0TGlzdGVuZXJzKCk7XG5cbiAgICAgICAgdGhpcy5pbmNvcnJlY3RJbnB1dC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRvb2x0aXAuaXNPcGVuKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICB0b29sdGlwLnNob3coKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0b29sdGlwLmhpZGUoKSwgdmFsaWRhdGlvblRvb2x0aXBIaWRlRGVsYXkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBAT3V0cHV0KCkgaW5jb3JyZWN0SW5wdXQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICBnZXQgaGFzU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25TdGFydCAhPT0gdGhpcy5zZWxlY3Rpb25FbmQ7XG4gICAgfVxuXG4gICAgZ2V0IGlzRnVsbEZvcm1hdCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0ID09PSBUaW1lRm9ybWF0cy5ISG1tc3M7XG4gICAgfVxuXG4gICAgZ2V0IGlzU2hvcnRGb3JtYXQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdCA9PT0gVGltZUZvcm1hdHMuSEhtbTtcbiAgICB9XG5cbiAgICBnZXQgdmlld1ZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgbmdDb250cm9sKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2w7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldCBlbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnZpZXdWYWx1ZSAmJiAhdGhpcy5pc0JhZElucHV0KCk7XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGlvblN0YXJ0KCk6IG51bWJlciB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGlvblN0YXJ0KHZhbHVlOiBudW1iZXIgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGlvbkVuZCgpOiBudW1iZXIgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZDtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0aW9uRW5kKHZhbHVlOiBudW1iZXIgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVhZG9ubHkgdWlkID0gYG1jLXRpbWVwaWNrZXItJHt1bmlxdWVDb21wb25lbnRJZFN1ZmZpeCsrfWA7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IHZhbGlkYXRvcjogVmFsaWRhdG9yRm4gfCBudWxsO1xuXG4gICAgcHJpdmF0ZSBsYXN0VmFsdWVWYWxpZCA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBjb250cm9sOiBBYnN0cmFjdENvbnRyb2w7XG5cbiAgICBwcml2YXRlIGRlZmF1bHRQbGFjZWhvbGRlciA9IHRydWU7XG5cbiAgICBwcml2YXRlIG9uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZDtcbiAgICBwcml2YXRlIG9uVG91Y2hlZDogKCkgPT4gdm9pZDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8YW55PlxuICAgICkge1xuICAgICAgICBpZiAoIXRoaXMuZGF0ZUFkYXB0ZXIpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBNY1RpbWVwaWNrZXI6IE5vIHByb3ZpZGVyIGZvdW5kIGZvciBEYXRlQWRhcHRlci4gWW91IG11c3QgaW1wb3J0IG9uZSBvZiB0aGUgZXhpc3RpbmcgYCArXG4gICAgICAgICAgICAgICAgYG1vZHVsZXMgYXQgeW91ciBhcHBsaWNhdGlvbiByb290IG9yIHByb3ZpZGUgYSBjdXN0b20gaW1wbGVtZW50YXRpb24gb3IgdXNlIGV4aXN0cyBvbmVzLmApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBWYWxpZGF0b3JzLmNvbXBvc2UoW3RoaXMucGFyc2VWYWxpZGF0b3IsIHRoaXMubWluVmFsaWRhdG9yLCB0aGlzLm1heFZhbGlkYXRvcl0pO1xuXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBub29wO1xuXG4gICAgICAgIC8vIEZvcmNlIHNldHRlciB0byBiZSBjYWxsZWQgaW4gY2FzZSBpZCB3YXMgbm90IHNwZWNpZmllZC5cbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuaWQ7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgZ2V0U2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0Z1bGxGb3JtYXQgPyBmdWxsRm9ybWF0U2l6ZSA6IHNob3J0Rm9ybWF0U2l6ZTtcbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBmb2N1c0NoYW5nZWQoaXNGb2N1c2VkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChpc0ZvY3VzZWQgIT09IHRoaXMuZm9jdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gaXNGb2N1c2VkO1xuICAgICAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQmx1cigpIHtcbiAgICAgICAgdGhpcy5mb2N1c0NoYW5nZWQoZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKHRoaXMuZm9ybWF0VXNlclBhc3RlKHRoaXMudmlld1ZhbHVlKSk7XG5cbiAgICAgICAgdGhpcy5vbklucHV0KCk7XG4gICAgfVxuXG4gICAgb25QYXN0ZSgkZXZlbnQpIHtcbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmZvcm1hdFVzZXJQYXN0ZSgkZXZlbnQuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0JykpO1xuXG4gICAgICAgIGNvbnN0IG5ld1RpbWVPYmogPSB0aGlzLmdldERhdGVGcm9tVGltZVN0cmluZyh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKCFuZXdUaW1lT2JqKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKHRoaXMuZ2V0VGltZVN0cmluZ0Zyb21EYXRlKG5ld1RpbWVPYmosIHRoaXMuZm9ybWF0KSk7XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IG5ld1RpbWVPYmo7XG4gICAgICAgIHRoaXMub25DaGFuZ2UobmV3VGltZU9iaik7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBvbklucHV0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMuZm9ybWF0VXNlcklucHV0KHRoaXMudmlld1ZhbHVlKTtcblxuICAgICAgICBjb25zdCBuZXdUaW1lT2JqID0gdGhpcy5nZXREYXRlRnJvbVRpbWVTdHJpbmcoZm9ybWF0dGVkVmFsdWUpO1xuICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gISFuZXdUaW1lT2JqO1xuXG4gICAgICAgIGlmICghbmV3VGltZU9iaikge1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZShudWxsKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICBjb25zdCBzZWxlY3Rpb25FbmQgPSB0aGlzLnNlbGVjdGlvbkVuZDtcblxuICAgICAgICB0aGlzLnNldFZpZXdWYWx1ZSh0aGlzLmdldFRpbWVTdHJpbmdGcm9tRGF0ZShuZXdUaW1lT2JqLCB0aGlzLmZvcm1hdCkpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydDtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmQ7XG5cbiAgICAgICAgdGhpcy5jcmVhdGVTZWxlY3Rpb25PZlRpbWVDb21wb25lbnRJbklucHV0KChzZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpICsgMSk7XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IG5ld1RpbWVPYmo7XG4gICAgICAgIHRoaXMub25DaGFuZ2UobmV3VGltZU9iaik7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgb25Db250YWluZXJDbGljaygpIHtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuXG4gICAgICAgIGlmIChpc0xldHRlcktleShldmVudCkgJiYgIWV2ZW50LmN0cmxLZXkgJiYgIWV2ZW50Lm1ldGFLZXkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5jb3JyZWN0SW5wdXQuZW1pdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgKGhhc01vZGlmaWVyS2V5KGV2ZW50KSAmJiAoaXNWZXJ0aWNhbE1vdmVtZW50KGV2ZW50KSB8fCBpc0hvcml6b250YWxNb3ZlbWVudChldmVudCkpKSB8fFxuICAgICAgICAgICAgZXZlbnQuY3RybEtleSB8fCBldmVudC5tZXRhS2V5IHx8XG4gICAgICAgICAgICBbREVMRVRFLCBCQUNLU1BBQ0UsIFRBQl0uaW5jbHVkZXMoa2V5Q29kZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBub29wKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gU1BBQ0UpIHtcbiAgICAgICAgICAgIHRoaXMuc3BhY2VLZXlIYW5kbGVyKGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChbSE9NRSwgUEFHRV9VUF0uaW5jbHVkZXMoa2V5Q29kZSkpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU2VsZWN0aW9uT2ZUaW1lQ29tcG9uZW50SW5JbnB1dCgwKTtcbiAgICAgICAgfSBlbHNlIGlmIChbRU5ELCBQQUdFX0RPV05dLmluY2x1ZGVzKGtleUNvZGUpKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVNlbGVjdGlvbk9mVGltZUNvbXBvbmVudEluSW5wdXQodGhpcy52aWV3VmFsdWUubGVuZ3RoKTtcbiAgICAgICAgfSBlbHNlIGlmIChbVVBfQVJST1csIERPV05fQVJST1ddLmluY2x1ZGVzKGtleUNvZGUpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLnZlcnRpY2FsQXJyb3dLZXlIYW5kbGVyKGtleUNvZGUpO1xuICAgICAgICB9IGVsc2UgaWYgKFtMRUZUX0FSUk9XLCBSSUdIVF9BUlJPV10uaW5jbHVkZXMoa2V5Q29kZSkpIHtcbiAgICAgICAgICAgIHRoaXMuaG9yaXpvbnRhbEFycm93S2V5SGFuZGxlcihrZXlDb2RlKTtcbiAgICAgICAgfSBlbHNlIGlmICgvXlxcRCQvLnRlc3QoZXZlbnQua2V5KSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLmdldE5ld1ZhbHVlKGV2ZW50LmtleSwgdGhpcy5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpO1xuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkVmFsdWUgPSB0aGlzLnJlcGxhY2VTeW1ib2xzKG5ld1ZhbHVlKTtcblxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBmb3JtYXR0ZWRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKGZvcm1hdHRlZFZhbHVlKTtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5vbklucHV0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmNvcnJlY3RJbnB1dC5lbWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMub25JbnB1dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZShjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgICAgIHRoaXMuc2V0Q29udHJvbChjb250cm9sKTtcblxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3IgPyB0aGlzLnZhbGlkYXRvcihjb250cm9sKSA6IG51bGw7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblZhbGlkYXRvckNoYW5nZShmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbGlkYXRvck9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogRCB8IG51bGwpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogRCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmb3JtYXRVc2VyUGFzdGUodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUubWF0Y2goQU1fUE1fRk9STUFUX1JFR0VYUCkpIHsgcmV0dXJuIHZhbHVlOyB9XG5cbiAgICAgICAgY29uc3QgbWF0Y2g6IFJlZ0V4cE1hdGNoQXJyYXkgfCBudWxsID0gdmFsdWUubWF0Y2goXG4gICAgICAgICAgICAvXihcXEQrKT8oPzxob3Vycz5cXGQrKT8oXFxEKyk/KFxcRCspPyg/PG1pbnV0ZXM+XFxkKyk/KFxcRCspPyhcXEQrKT8oPzxzZWNvbmRzPlxcZCspPyhcXEQrKT8kL1xuICAgICAgICApO1xuXG4gICAgICAgIGlmICghbWF0Y2g/Lmdyb3Vwcz8uaG91cnMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKHZhbHVlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZU51bWJlcnMoT2JqZWN0LnZhbHVlcyhtYXRjaC5ncm91cHMpXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbWFnaWMtbnVtYmVyc1xuICAgICAgICAgICAgLm1hcCgoZ3JvdXApID0+IChncm91cCB8fCAnJykucGFkU3RhcnQoMiwgJzAnKSlcbiAgICAgICAgICAgIC5qb2luKCc6JylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZvcm1hdFVzZXJJbnB1dCh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZU51bWJlcnModGhpcy5yZXBsYWNlU3ltYm9scyh2YWx1ZSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVwbGFjZVN5bWJvbHModmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGxldCBmb3JtYXR0ZWRWYWx1ZTogc3RyaW5nID0gdmFsdWU7XG5cbiAgICAgICAgY29uc3QgbWF0Y2g6IFJlZ0V4cE1hdGNoQXJyYXkgfCBudWxsID0gdmFsdWUubWF0Y2goL14oXFxkXFxkOil7MCwyfSg/PG51bWJlcj5bMC05XSkoPzxzeW1ib2w+XFxXKSg6XFxkXFxkKXswLDJ9JC8pO1xuXG4gICAgICAgIGlmIChtYXRjaD8uZ3JvdXBzKSB7XG4gICAgICAgICAgICBjb25zdCB7IG51bWJlciwgc3ltYm9sIH0gPSBtYXRjaC5ncm91cHM7XG5cbiAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlID0gdmFsdWUucmVwbGFjZShudW1iZXIgKyBzeW1ib2wsIGAwJHtudW1iZXJ9YCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm9ybWF0dGVkVmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXBsYWNlTnVtYmVycyh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGZvcm1hdHRlZFZhbHVlOiBzdHJpbmcgPSB2YWx1ZTtcblxuICAgICAgICBjb25zdCBtYXRjaDogUmVnRXhwTWF0Y2hBcnJheSB8IG51bGwgPSB2YWx1ZS5tYXRjaCgvXig/PGhvdXJzPlxcZHswLDR9KTo/KD88bWludXRlcz5cXGR7MCw0fSk6Pyg/PHNlY29uZHM+XFxkezAsNH0pJC8pO1xuXG4gICAgICAgIGlmIChtYXRjaD8uZ3JvdXBzKSB7XG4gICAgICAgICAgICBjb25zdCB7IGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzIH0gPSBtYXRjaC5ncm91cHM7XG5cbiAgICAgICAgICAgIGlmIChob3Vycy5sZW5ndGggJiYgcGFyc2VJbnQoaG91cnMpID4gSE9VUlNfUEVSX0RBWSkge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlID0gZm9ybWF0dGVkVmFsdWUucmVwbGFjZShob3VycywgSE9VUlNfUEVSX0RBWS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1pbnV0ZXMubGVuZ3RoICYmIHBhcnNlSW50KG1pbnV0ZXMpID4gTUlOVVRFU19QRVJfSE9VUikge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlID0gZm9ybWF0dGVkVmFsdWUucmVwbGFjZShtaW51dGVzLCBNSU5VVEVTX1BFUl9IT1VSLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2Vjb25kcy5sZW5ndGggJiYgcGFyc2VJbnQoc2Vjb25kcykgPiBTRUNPTkRTX1BFUl9NSU5VVEUpIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IGZvcm1hdHRlZFZhbHVlLnJlcGxhY2Uoc2Vjb25kcywgU0VDT05EU19QRVJfTUlOVVRFLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZFZhbHVlO1xuICAgIH1cblxuICAgIC8qKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgaXMgaW52YWxpZCBiYXNlZCBvbiB0aGUgbmF0aXZlIHZhbGlkYXRpb24uICovXG4gICAgcHJpdmF0ZSBpc0JhZElucHV0KCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCB2YWxpZGl0eSA9ICg8SFRNTElucHV0RWxlbWVudD4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLnZhbGlkaXR5O1xuXG4gICAgICAgIHJldHVybiB2YWxpZGl0eSAmJiB2YWxpZGl0eS5iYWRJbnB1dDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNwYWNlS2V5SGFuZGxlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvblN0YXJ0ID09PSB0aGlzLnNlbGVjdGlvbkVuZCkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldE5ld1ZhbHVlKGV2ZW50LmtleSwgdGhpcy5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpO1xuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkVmFsdWUgPSB0aGlzLnJlcGxhY2VTeW1ib2xzKHZhbHVlKTtcblxuICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBmb3JtYXR0ZWRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKGZvcm1hdHRlZFZhbHVlKTtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5vbklucHV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGlvblN0YXJ0ICE9PSB0aGlzLnNlbGVjdGlvbkVuZCkge1xuXG4gICAgICAgICAgICBsZXQgY3Vyc29yUG9zID0gdGhpcy5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXI7XG5cbiAgICAgICAgICAgIGNvbnN0IG5leHREaXZpZGVyUG9zOiBudW1iZXIgPSB0aGlzLnZpZXdWYWx1ZS5pbmRleE9mKCc6JywgY3Vyc29yUG9zKTtcblxuICAgICAgICAgICAgY3Vyc29yUG9zID0gbmV4dERpdmlkZXJQb3MgPyBuZXh0RGl2aWRlclBvcyArIDEgOiAwO1xuXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVNlbGVjdGlvbk9mVGltZUNvbXBvbmVudEluSW5wdXQoY3Vyc29yUG9zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TmV3VmFsdWUoa2V5OiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIFt0aGlzLnZpZXdWYWx1ZS5zbGljZSgwLCBwb3NpdGlvbiksIGtleSwgdGhpcy52aWV3VmFsdWUuc2xpY2UocG9zaXRpb24pXS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHZlcnRpY2FsQXJyb3dLZXlIYW5kbGVyKGtleUNvZGU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMudmFsdWUpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgbGV0IGNoYW5nZWRUaW1lO1xuXG4gICAgICAgIGNvbnN0IG5ld0VkaXRQYXJhbXMgPSB0aGlzLmdldFRpbWVFZGl0TWV0cmljcyh0aGlzLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcik7XG5cbiAgICAgICAgaWYgKGtleUNvZGUgPT09IFVQX0FSUk9XKSB7XG4gICAgICAgICAgICBjaGFuZ2VkVGltZSA9IHRoaXMuaW5jcmVtZW50VGltZSh0aGlzLnZhbHVlLCBuZXdFZGl0UGFyYW1zLm1vZGlmaWVkVGltZVBhcnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleUNvZGUgPT09IERPV05fQVJST1cpIHtcbiAgICAgICAgICAgIGNoYW5nZWRUaW1lID0gdGhpcy5kZWNyZW1lbnRUaW1lKHRoaXMudmFsdWUsIG5ld0VkaXRQYXJhbXMubW9kaWZpZWRUaW1lUGFydCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbHVlID0gY2hhbmdlZFRpbWU7XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25TdGFydCA9IG5ld0VkaXRQYXJhbXMuY3Vyc29yU3RhcnRQb3NpdGlvbjtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25FbmQgPSBuZXdFZGl0UGFyYW1zLmN1cnNvckVuZFBvc2l0aW9uO1xuXG4gICAgICAgIHRoaXMub25DaGFuZ2UoY2hhbmdlZFRpbWUpO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBob3Jpem9udGFsQXJyb3dLZXlIYW5kbGVyKGtleUNvZGU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMudmFsdWUpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgbGV0IGN1cnNvclBvcyA9IHRoaXMuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyO1xuXG4gICAgICAgIGlmIChrZXlDb2RlID09PSBMRUZUX0FSUk9XKSB7XG4gICAgICAgICAgICBjdXJzb3JQb3MgPSBjdXJzb3JQb3MgPT09IDAgPyB0aGlzLnZpZXdWYWx1ZS5sZW5ndGggOiBjdXJzb3JQb3MgLSAxO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFJJR0hUX0FSUk9XKSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0RGl2aWRlclBvczogbnVtYmVyID0gdGhpcy52aWV3VmFsdWUuaW5kZXhPZignOicsIGN1cnNvclBvcyk7XG5cbiAgICAgICAgICAgIGN1cnNvclBvcyA9IG5leHREaXZpZGVyUG9zID8gbmV4dERpdmlkZXJQb3MgKyAxIDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3JlYXRlU2VsZWN0aW9uT2ZUaW1lQ29tcG9uZW50SW5JbnB1dChjdXJzb3JQb3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlU2VsZWN0aW9uT2ZUaW1lQ29tcG9uZW50SW5JbnB1dChjdXJzb3JQb3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0VkaXRQYXJhbXMgPSB0aGlzLmdldFRpbWVFZGl0TWV0cmljcyhjdXJzb3JQb3MpO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gbmV3RWRpdFBhcmFtcy5jdXJzb3JTdGFydFBvc2l0aW9uO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25FbmQgPSBuZXdFZGl0UGFyYW1zLmN1cnNvckVuZFBvc2l0aW9uO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluY3JlbWVudFRpbWUoZGF0ZVZhbDogRCwgd2hhdFRvSW5jcmVtZW50OiBUaW1lUGFydHMgPSBUaW1lUGFydHMuc2Vjb25kcyk6IEQge1xuICAgICAgICBsZXQgaG91cnMgPSB0aGlzLmRhdGVBZGFwdGVyLmdldEhvdXJzKGRhdGVWYWwpO1xuICAgICAgICBsZXQgbWludXRlcyA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TWludXRlcyhkYXRlVmFsKTtcbiAgICAgICAgbGV0IHNlY29uZHMgPSB0aGlzLmRhdGVBZGFwdGVyLmdldFNlY29uZHMoZGF0ZVZhbCk7XG5cbiAgICAgICAgc3dpdGNoICh3aGF0VG9JbmNyZW1lbnQpIHtcbiAgICAgICAgICAgIGNhc2UgVGltZVBhcnRzLmhvdXJzOlxuICAgICAgICAgICAgICAgIGhvdXJzKys7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFRpbWVQYXJ0cy5taW51dGVzOlxuICAgICAgICAgICAgICAgIG1pbnV0ZXMrKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVGltZVBhcnRzLnNlY29uZHM6XG4gICAgICAgICAgICAgICAgc2Vjb25kcysrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWNvbmRzID4gU0VDT05EU19QRVJfTUlOVVRFKSB7IHNlY29uZHMgPSAwOyB9XG5cbiAgICAgICAgaWYgKG1pbnV0ZXMgPiBNSU5VVEVTX1BFUl9IT1VSKSB7IG1pbnV0ZXMgPSAwOyB9XG5cbiAgICAgICAgaWYgKGhvdXJzID4gSE9VUlNfUEVSX0RBWSkgeyBob3VycyA9IDA7IH1cblxuICAgICAgICByZXR1cm4gdGhpcy5kYXRlQWRhcHRlci5jcmVhdGVEYXRlVGltZShcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLnZhbHVlKSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy52YWx1ZSksXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldERhdGUodGhpcy52YWx1ZSksXG4gICAgICAgICAgICBob3VycyxcbiAgICAgICAgICAgIG1pbnV0ZXMsXG4gICAgICAgICAgICBzZWNvbmRzLFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRNaWxsaXNlY29uZHModGhpcy52YWx1ZSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlY3JlbWVudFRpbWUoZGF0ZVZhbDogRCwgd2hhdFRvRGVjcmVtZW50OiBUaW1lUGFydHMgPSBUaW1lUGFydHMuc2Vjb25kcyk6IEQge1xuICAgICAgICBsZXQgaG91cnMgPSB0aGlzLmRhdGVBZGFwdGVyLmdldEhvdXJzKGRhdGVWYWwpO1xuICAgICAgICBsZXQgbWludXRlcyA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TWludXRlcyhkYXRlVmFsKTtcbiAgICAgICAgbGV0IHNlY29uZHMgPSB0aGlzLmRhdGVBZGFwdGVyLmdldFNlY29uZHMoZGF0ZVZhbCk7XG5cbiAgICAgICAgc3dpdGNoICh3aGF0VG9EZWNyZW1lbnQpIHtcbiAgICAgICAgICAgIGNhc2UgVGltZVBhcnRzLmhvdXJzOlxuICAgICAgICAgICAgICAgIGhvdXJzLS07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFRpbWVQYXJ0cy5taW51dGVzOlxuICAgICAgICAgICAgICAgIG1pbnV0ZXMtLTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVGltZVBhcnRzLnNlY29uZHM6XG4gICAgICAgICAgICAgICAgc2Vjb25kcy0tO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWNvbmRzIDwgMCkgeyBzZWNvbmRzID0gU0VDT05EU19QRVJfTUlOVVRFOyB9XG5cbiAgICAgICAgaWYgKG1pbnV0ZXMgPCAwKSB7IG1pbnV0ZXMgPSBNSU5VVEVTX1BFUl9IT1VSOyB9XG5cbiAgICAgICAgaWYgKGhvdXJzIDwgMCkgeyBob3VycyA9IEhPVVJTX1BFUl9EQVk7IH1cblxuICAgICAgICByZXR1cm4gdGhpcy5kYXRlQWRhcHRlci5jcmVhdGVEYXRlVGltZShcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLnZhbHVlKSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy52YWx1ZSksXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldERhdGUodGhpcy52YWx1ZSksXG4gICAgICAgICAgICBob3VycyxcbiAgICAgICAgICAgIG1pbnV0ZXMsXG4gICAgICAgICAgICBzZWNvbmRzLFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRNaWxsaXNlY29uZHModGhpcy52YWx1ZSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHBhcmFtcyBmb3IgYXJyb3cta2V5cyAodXAvZG93bikgdGltZSB2YWxpZSBlZGl0LlxuICAgICAqIEBwYXJhbSBjdXJzb3JQb3NpdGlvbiBDdXJyZW50IGN1cnNvciBwb3NpdGlvbiBpbiB0aW1lU3RyaW5nXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRUaW1lRWRpdE1ldHJpY3MoY3Vyc29yUG9zaXRpb246IG51bWJlcik6IHtcbiAgICAgICAgbW9kaWZpZWRUaW1lUGFydDogVGltZVBhcnRzO1xuICAgICAgICBjdXJzb3JTdGFydFBvc2l0aW9uOiBudW1iZXI7XG4gICAgICAgIGN1cnNvckVuZFBvc2l0aW9uOiBudW1iZXI7XG4gICAgfSB7XG4gICAgICAgIGNvbnN0IHRpbWVTdHJpbmc6IHN0cmluZyA9IHRoaXMudmlld1ZhbHVlO1xuICAgICAgICBsZXQgbW9kaWZpZWRUaW1lUGFydDogVGltZVBhcnRzO1xuICAgICAgICBsZXQgY3Vyc29yU3RhcnRQb3NpdGlvbjogbnVtYmVyO1xuICAgICAgICBsZXQgY3Vyc29yRW5kUG9zaXRpb246IG51bWJlcjtcblxuICAgICAgICBjb25zdCBob3Vyc0luZGV4ID0gMDtcbiAgICAgICAgY29uc3QgbWludXRlc0luZGV4ID0gdGltZVN0cmluZy5pbmRleE9mKCc6JywgaG91cnNJbmRleCArIDEpO1xuICAgICAgICBjb25zdCBzZWNvbmRzSW5kZXggPSBtaW51dGVzSW5kZXggIT09IC0xID8gdGltZVN0cmluZy5pbmRleE9mKCc6JywgbWludXRlc0luZGV4ICsgMSkgOiAtMTtcblxuICAgICAgICBpZiAoc2Vjb25kc0luZGV4ICE9PSAtMSAmJiBjdXJzb3JQb3NpdGlvbiA+IHNlY29uZHNJbmRleCkge1xuICAgICAgICAgICAgbW9kaWZpZWRUaW1lUGFydCA9IFRpbWVQYXJ0cy5zZWNvbmRzO1xuICAgICAgICAgICAgY3Vyc29yU3RhcnRQb3NpdGlvbiA9IHNlY29uZHNJbmRleCArIDE7XG4gICAgICAgICAgICBjdXJzb3JFbmRQb3NpdGlvbiA9IHRpbWVTdHJpbmcubGVuZ3RoO1xuICAgICAgICB9IGVsc2UgaWYgKG1pbnV0ZXNJbmRleCAhPT0gLTEgJiYgY3Vyc29yUG9zaXRpb24gPiBtaW51dGVzSW5kZXgpIHtcbiAgICAgICAgICAgIG1vZGlmaWVkVGltZVBhcnQgPSBUaW1lUGFydHMubWludXRlcztcbiAgICAgICAgICAgIGN1cnNvclN0YXJ0UG9zaXRpb24gPSBtaW51dGVzSW5kZXggKyAxO1xuICAgICAgICAgICAgY3Vyc29yRW5kUG9zaXRpb24gPSBzZWNvbmRzSW5kZXggPiAtMSA/IHNlY29uZHNJbmRleCA6IHRpbWVTdHJpbmcubGVuZ3RoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9kaWZpZWRUaW1lUGFydCA9IFRpbWVQYXJ0cy5ob3VycztcbiAgICAgICAgICAgIGN1cnNvclN0YXJ0UG9zaXRpb24gPSBob3Vyc0luZGV4O1xuICAgICAgICAgICAgY3Vyc29yRW5kUG9zaXRpb24gPSBtaW51dGVzSW5kZXggIT09IC0xID8gbWludXRlc0luZGV4IDogdGltZVN0cmluZy5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyBtb2RpZmllZFRpbWVQYXJ0LCBjdXJzb3JTdGFydFBvc2l0aW9uLCBjdXJzb3JFbmRQb3NpdGlvbiB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBDcmVhdGUgdGltZSBzdHJpbmcgZm9yIGRpc3BsYXlpbmcgaW5zaWRlIGlucHV0IGVsZW1lbnQgb2YgVUlcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFRpbWVTdHJpbmdGcm9tRGF0ZSh2YWx1ZTogRCB8IG51bGwsIHRpbWVGb3JtYXQ6IFRpbWVGb3JtYXRzKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF2YWx1ZSB8fCAhdGhpcy5kYXRlQWRhcHRlci5pc1ZhbGlkKHZhbHVlKSkgeyByZXR1cm4gJyc7IH1cblxuICAgICAgICByZXR1cm4gdGhpcy5kYXRlQWRhcHRlci5mb3JtYXQodmFsdWUsIHRpbWVGb3JtYXQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGF0ZUZyb21UaW1lU3RyaW5nKHRpbWVTdHJpbmc6IHN0cmluZyk6IEQgfCBudWxsIHtcbiAgICAgICAgaWYgKCF0aW1lU3RyaW5nKSB7IHJldHVybiBudWxsOyB9XG5cbiAgICAgICAgY29uc3QgSE1TID0gdGltZVN0cmluZy5tYXRjaChIT1VSU19NSU5VVEVTX1NFQ09ORFNfUkVHRVhQKTtcbiAgICAgICAgY29uc3QgSE0gPSB0aW1lU3RyaW5nLm1hdGNoKEhPVVJTX01JTlVURVNfUkVHRVhQKTtcbiAgICAgICAgY29uc3QgSCA9IHRpbWVTdHJpbmcubWF0Y2goSE9VUlNfT05MWV9SRUdFWFApO1xuICAgICAgICBjb25zdCBhbVBtID0gdGltZVN0cmluZy5tYXRjaChBTV9QTV9GT1JNQVRfUkVHRVhQKTtcblxuICAgICAgICBsZXQgaG91cnM6IG51bWJlciA9IDA7XG4gICAgICAgIGxldCBtaW51dGVzOiBudW1iZXIgPSAwO1xuICAgICAgICBsZXQgc2Vjb25kczogbnVtYmVyID0gMDtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZTpuby1tYWdpYy1udW1iZXJzXG4gICAgICAgIGlmIChhbVBtKSB7XG4gICAgICAgICAgICBob3VycyA9IE51bWJlcihhbVBtWzFdKTtcbiAgICAgICAgICAgIG1pbnV0ZXMgPSBOdW1iZXIoYW1QbVsyXSk7XG5cbiAgICAgICAgICAgIGlmICgvW3BdL2kudGVzdChhbVBtWzNdKSB8fCAoL1thXS9pLnRlc3QoYW1QbVszXSkgJiYgaG91cnMgPT09IDEyKSkge1xuICAgICAgICAgICAgICAgIGhvdXJzICs9IDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKEhNUykge1xuICAgICAgICAgICAgaG91cnMgPSBOdW1iZXIoSE1TWzFdKTtcbiAgICAgICAgICAgIG1pbnV0ZXMgPSBOdW1iZXIoSE1TWzJdKTtcbiAgICAgICAgICAgIHNlY29uZHMgPSBOdW1iZXIoSE1TWzNdKTtcbiAgICAgICAgfSBlbHNlIGlmIChITSkge1xuICAgICAgICAgICAgaG91cnMgPSBOdW1iZXIoSE1bMV0pO1xuICAgICAgICAgICAgbWludXRlcyA9IE51bWJlcihITVsyXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoSCkge1xuICAgICAgICAgICAgaG91cnMgPSBOdW1iZXIoSFsxXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyB0c2xpbnQ6ZW5hYmxlXG5cbiAgICAgICAgY29uc3QgcmVzdWx0RGF0ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZVRpbWUoXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIodGhpcy52YWx1ZSksXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldE1vbnRoKHRoaXMudmFsdWUpLFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXREYXRlKHRoaXMudmFsdWUpLFxuICAgICAgICAgICAgaG91cnMsXG4gICAgICAgICAgICBtaW51dGVzIHx8IDAsXG4gICAgICAgICAgICBzZWNvbmRzIHx8IDAsXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbGxpc2Vjb25kcyh0aGlzLnZhbHVlKVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbChyZXN1bHREYXRlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlVmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9ICgpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvY3VzZWQgfHxcbiAgICAgICAgICAgIHRoaXMuZW1wdHkgfHxcbiAgICAgICAgICAgIHRoaXMubGFzdFZhbHVlVmFsaWQgPyBudWxsIDogeyBtY1RpbWVwaWNrZXJQYXJzZTogeyB0ZXh0OiB0aGlzLnZpZXdWYWx1ZSB9IH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtaW5WYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgICAgY29uc3QgY29udHJvbFZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlKSk7XG5cbiAgICAgICAgcmV0dXJuICghdGhpcy5taW4gfHwgIWNvbnRyb2xWYWx1ZSB8fCB0aGlzLmNvbXBhcmVUaW1lKHRoaXMubWluLCBjb250cm9sVmFsdWUpIDw9IDApID9cbiAgICAgICAgICAgIG51bGwgOlxuICAgICAgICAgICAgeyBtY1RpbWVwaWNrZXJMb3dlclRoZW5NaW46IHsgbWluOiB0aGlzLm1pbiwgYWN0dWFsOiBjb250cm9sVmFsdWUgfSB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgbWF4VmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZSkpO1xuXG4gICAgICAgIHJldHVybiAoIXRoaXMubWF4IHx8ICFjb250cm9sVmFsdWUgfHwgdGhpcy5jb21wYXJlVGltZSh0aGlzLm1heCwgY29udHJvbFZhbHVlKSA+PSAwKSA/XG4gICAgICAgICAgICBudWxsIDpcbiAgICAgICAgICAgIHsgbWNUaW1lcGlja2VySGlnaGVyVGhlbk1heDogeyBtYXg6IHRoaXMubWF4LCBhY3R1YWw6IGNvbnRyb2xWYWx1ZSB9IH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb21wYXJlVGltZShmaXJzdDogRCwgc2Vjb25kOiBEKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kYXRlQWRhcHRlci5nZXRIb3VycyhmaXJzdCkgLSB0aGlzLmRhdGVBZGFwdGVyLmdldEhvdXJzKHNlY29uZCkgfHxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TWludXRlcyhmaXJzdCkgLSB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbnV0ZXMoc2Vjb25kKTtcblxuICAgICAgICBpZiAoVGltZUZvcm1hdHMuSEhtbSA9PT0gdGhpcy5mb3JtYXQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSBpZiAoVGltZUZvcm1hdHMuSEhtbXNzID09PSB0aGlzLmZvcm1hdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCB8fCB0aGlzLmRhdGVBZGFwdGVyLmdldFNlY29uZHMoZmlyc3QpIC0gdGhpcy5kYXRlQWRhcHRlci5nZXRTZWNvbmRzKHNlY29uZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgVW5rbm93biBmb3JtYXQ6ICR7dGhpcy5mb3JtYXR9YCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFZhbGlkRGF0ZU9yTnVsbChvYmo6IGFueSk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmRhdGVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiYgdGhpcy5kYXRlQWRhcHRlci5pc1ZhbGlkKG9iaikpID8gb2JqIDogbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFZpZXdWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVZpZXcoKSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbHVlID0gdGhpcy5nZXRUaW1lU3RyaW5nRnJvbURhdGUodGhpcy52YWx1ZSwgdGhpcy5mb3JtYXQpO1xuXG4gICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKGZvcm1hdHRlZFZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldENvbnRyb2woY29udHJvbDogQWJzdHJhY3RDb250cm9sKSB7XG4gICAgICAgIGlmICghdGhpcy5jb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wgPSBjb250cm9sO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5XG4gICAgcHJpdmF0ZSB2YWxpZGF0b3JPbkNoYW5nZSA9ICgpID0+IHt9O1xufVxuIl19