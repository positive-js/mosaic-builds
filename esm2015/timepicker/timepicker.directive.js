import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, EventEmitter, forwardRef, Input, Optional, Output, Renderer2 } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { DateAdapter } from '@ptsecurity/cdk/datetime';
import { DOWN_ARROW, UP_ARROW, HOME, END, LEFT_ARROW, RIGHT_ARROW, PAGE_DOWN, PAGE_UP, SPACE, DELETE, BACKSPACE, hasModifierKey, isLetterKey, isVerticalMovement, isHorizontalMovement } from '@ptsecurity/cdk/keycodes';
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
        else if ((hasModifierKey(event) && (isVerticalMovement(keyCode) || isHorizontalMovement(keyCode))) ||
            event.ctrlKey || event.metaKey ||
            [DELETE, BACKSPACE].includes(keyCode)) {
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
/** @nocollapse */ McTimepicker.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTimepicker, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.DateAdapter, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTimepicker.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTimepicker, selector: "input[mcTimepicker]", inputs: { placeholder: "placeholder", disabled: "disabled", id: "id", required: "required", format: "format", min: "min", max: "max", value: "value", mcValidationTooltip: "mcValidationTooltip" }, outputs: { incorrectInput: "incorrectInput" }, host: { listeners: { "blur": "onBlur()", "focus": "focusChanged(true)", "paste": "onPaste($event)", "keydown": "onKeyDown($event)" }, properties: { "attr.id": "id", "attr.placeholder": "placeholder", "attr.disabled": "disabled || null", "attr.required": "required", "attr.size": "getSize()", "attr.autocomplete": "\"off\"" }, classAttribute: "mc-input mc-timepicker" }, providers: [
        MC_TIMEPICKER_VALIDATORS,
        MC_TIMEPICKER_VALUE_ACCESSOR,
        { provide: McFormFieldControl, useExisting: McTimepicker }
    ], exportAs: ["mcTimepicker"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTimepicker, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdGltZXBpY2tlci90aW1lcGlja2VyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0gsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBR0gsYUFBYSxFQUNiLGlCQUFpQixFQUlqQixVQUFVLEVBQ2IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUNILFVBQVUsRUFDVixRQUFRLEVBQ1IsSUFBSSxFQUNKLEdBQUcsRUFDSCxVQUFVLEVBQ1YsV0FBVyxFQUNYLFNBQVMsRUFDVCxPQUFPLEVBQ1AsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsY0FBYyxFQUNkLFdBQVcsRUFDWCxrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3ZCLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUFFLDBCQUEwQixFQUFFLDBCQUEwQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbkUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDckUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFckMsT0FBTyxFQUNILG1CQUFtQixFQUNuQixhQUFhLEVBQ2Isb0JBQW9CLEVBQ3BCLDRCQUE0QixFQUM1QixpQkFBaUIsRUFDakIsZ0JBQWdCLEVB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bUI7cUJBQ25DO29CQUNELFNBQVMsRUFBRTt3QkFDUCx3QkFBd0I7d0JBQ3hCLDRCQUE0Qjt3QkFDNUIsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxjQUFjLEVBQUU7cUJBQzdEO2lCQUNKOzswQkFtT1EsUUFBUTs0Q0F4TVQsV0FBVztzQkFEZCxLQUFLO2dCQWNGLFFBQVE7c0JBRFgsS0FBSztnQkFvQkYsRUFBRTtzQkFETCxLQUFLO2dCQWdCRixRQUFRO3NCQURYLEtBQUs7Z0JBWUYsTUFBTTtzQkFEVCxLQUFLO2dCQXVCRixHQUFHO3NCQUROLEtBQUs7Z0JBYUYsR0FBRztzQkFETixLQUFLO2dCQWFGLEtBQUs7c0JBRFIsS0FBSztnQkFrQkYsbUJBQW1CO3NCQUR0QixLQUFLO2dCQWtCSSxjQUFjO3NCQUF2QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEFic3RyYWN0Q29udHJvbCxcbiAgICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgICBOR19WQUxJREFUT1JTLFxuICAgIE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIFZhbGlkYXRpb25FcnJvcnMsXG4gICAgVmFsaWRhdG9yLFxuICAgIFZhbGlkYXRvckZuLFxuICAgIFZhbGlkYXRvcnNcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvZGF0ZXRpbWUnO1xuaW1wb3J0IHtcbiAgICBET1dOX0FSUk9XLFxuICAgIFVQX0FSUk9XLFxuICAgIEhPTUUsXG4gICAgRU5ELFxuICAgIExFRlRfQVJST1csXG4gICAgUklHSFRfQVJST1csXG4gICAgUEFHRV9ET1dOLFxuICAgIFBBR0VfVVAsXG4gICAgU1BBQ0UsXG4gICAgREVMRVRFLFxuICAgIEJBQ0tTUEFDRSxcbiAgICBoYXNNb2RpZmllcktleSxcbiAgICBpc0xldHRlcktleSxcbiAgICBpc1ZlcnRpY2FsTW92ZW1lbnQsXG4gICAgaXNIb3Jpem9udGFsTW92ZW1lbnRcbn0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IHZhbGlkYXRpb25Ub29sdGlwSGlkZURlbGF5LCB2YWxpZGF0aW9uVG9vbHRpcFNob3dEZWxheSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IE1jRm9ybUZpZWxkQ29udHJvbCB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9mb3JtLWZpZWxkJztcbmltcG9ydCB7IE1jV2FybmluZ1Rvb2x0aXBUcmlnZ2VyIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL3Rvb2x0aXAnO1xuaW1wb3J0IHsgbm9vcCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1xuICAgIERFRkFVTFRfVElNRV9GT1JNQVQsXG4gICAgSE9VUlNfUEVSX0RBWSxcbiAgICBIT1VSU19NSU5VVEVTX1JFR0VYUCxcbiAgICBIT1VSU19NSU5VVEVTX1NFQ09ORFNfUkVHRVhQLFxuICAgIEhPVVJTX09OTFlfUkVHRVhQLFxuICAgIE1JTlVURVNfUEVSX0hPVVIsXG4gICAgU0VDT05EU19QRVJfTUlOVVRFLFxuICAgIFRJTUVGT1JNQVRfUExBQ0VIT0xERVJTLFxuICAgIFRpbWVGb3JtYXRzLFxuICAgIFRpbWVQYXJ0cyxcbiAgICBBTV9QTV9GT1JNQVRfUkVHRVhQXG59IGZyb20gJy4vdGltZXBpY2tlci5jb25zdGFudHMnO1xuXG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUNfVElNRVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1jVGltZXBpY2tlciksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUNfVElNRVBJQ0tFUl9WQUxJREFUT1JTOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNY1RpbWVwaWNrZXIpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5cbmxldCB1bmlxdWVDb21wb25lbnRJZFN1ZmZpeDogbnVtYmVyID0gMDtcblxuY29uc3Qgc2hvcnRGb3JtYXRTaXplOiBudW1iZXIgPSA1O1xuY29uc3QgZnVsbEZvcm1hdFNpemU6IG51bWJlciA9IDg7XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdpbnB1dFttY1RpbWVwaWNrZXJdJyxcbiAgICBleHBvcnRBczogJ21jVGltZXBpY2tlcicsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWlucHV0IG1jLXRpbWVwaWNrZXInLFxuICAgICAgICAvLyBOYXRpdmUgaW5wdXQgcHJvcGVydGllcyB0aGF0IGFyZSBvdmVyd3JpdHRlbiBieSBBbmd1bGFyIGlucHV0cyBuZWVkIHRvIGJlIHN5bmNlZCB3aXRoXG4gICAgICAgIC8vIHRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudC4gT3RoZXJ3aXNlIHByb3BlcnR5IGJpbmRpbmdzIGZvciB0aG9zZSBkb24ndCB3b3JrLlxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAgICAgJ1thdHRyLnBsYWNlaG9sZGVyXSc6ICdwbGFjZWhvbGRlcicsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgICAgICdbYXR0ci5yZXF1aXJlZF0nOiAncmVxdWlyZWQnLFxuICAgICAgICAnW2F0dHIuc2l6ZV0nOiAnZ2V0U2l6ZSgpJyxcbiAgICAgICAgJ1thdHRyLmF1dG9jb21wbGV0ZV0nOiAnXCJvZmZcIicsXG5cbiAgICAgICAgJyhibHVyKSc6ICdvbkJsdXIoKScsXG4gICAgICAgICcoZm9jdXMpJzogJ2ZvY3VzQ2hhbmdlZCh0cnVlKScsXG5cbiAgICAgICAgJyhwYXN0ZSknOiAnb25QYXN0ZSgkZXZlbnQpJyxcblxuICAgICAgICAnKGtleWRvd24pJzogJ29uS2V5RG93bigkZXZlbnQpJ1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE1DX1RJTUVQSUNLRVJfVkFMSURBVE9SUyxcbiAgICAgICAgTUNfVElNRVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgeyBwcm92aWRlOiBNY0Zvcm1GaWVsZENvbnRyb2wsIHVzZUV4aXN0aW5nOiBNY1RpbWVwaWNrZXIgfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNUaW1lcGlja2VyPEQ+IGltcGxlbWVudHMgTWNGb3JtRmllbGRDb250cm9sPEQ+LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yLCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICByZWFkb25seSBzdGF0ZUNoYW5nZXM6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgcmVhZG9ubHkgZXJyb3JTdGF0ZTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgY29udHJvbFR5cGU6IHN0cmluZyA9ICd0aW1lcGlja2VyJztcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBwbGFjZWhvbGRlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGxhY2Vob2xkZXI7XG4gICAgfVxuXG4gICAgc2V0IHBsYWNlaG9sZGVyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXIgPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLmRlZmF1bHRQbGFjZWhvbGRlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3BsYWNlaG9sZGVyID0gVElNRUZPUk1BVF9QTEFDRUhPTERFUlNbREVGQVVMVF9USU1FX0ZPUk1BVF07XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgLy8gQnJvd3NlcnMgbWF5IG5vdCBmaXJlIHRoZSBibHVyIGV2ZW50IGlmIHRoZSBpbnB1dCBpcyBkaXNhYmxlZCB0b28gcXVpY2tseS5cbiAgICAgICAgLy8gUmVzZXQgZnJvbSBoZXJlIHRvIGVuc3VyZSB0aGF0IHRoZSBlbGVtZW50IGRvZXNuJ3QgYmVjb21lIHN0dWNrLlxuICAgICAgICBpZiAodGhpcy5mb2N1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG5cbiAgICBzZXQgaWQodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9pZCA9IHZhbHVlIHx8IHRoaXMudWlkO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lkOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXF1aXJlZDtcbiAgICB9XG5cbiAgICBzZXQgcmVxdWlyZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fcmVxdWlyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlcXVpcmVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgZm9ybWF0KCk6IFRpbWVGb3JtYXRzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdDtcbiAgICB9XG5cbiAgICBzZXQgZm9ybWF0KGZvcm1hdFZhbHVlOiBUaW1lRm9ybWF0cykge1xuICAgICAgICB0aGlzLl9mb3JtYXQgPSBPYmplY3RcbiAgICAgICAgICAgIC5rZXlzKFRpbWVGb3JtYXRzKVxuICAgICAgICAgICAgLm1hcCgodGltZUZvcm1hdEtleSkgPT4gVGltZUZvcm1hdHNbdGltZUZvcm1hdEtleV0pXG4gICAgICAgICAgICAuaW5kZXhPZihmb3JtYXRWYWx1ZSkgPiAtMSA/IGZvcm1hdFZhbHVlIDogREVGQVVMVF9USU1FX0ZPUk1BVDtcblxuICAgICAgICBpZiAodGhpcy5kZWZhdWx0UGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gVElNRUZPUk1BVF9QTEFDRUhPTERFUlNbdGhpcy5fZm9ybWF0XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2Zvcm1hdDogVGltZUZvcm1hdHMgPSBERUZBVUxUX1RJTUVfRk9STUFUO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWluKCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbjtcbiAgICB9XG5cbiAgICBzZXQgbWluKHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9taW4gPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9taW46IEQgfCBudWxsID0gbnVsbDtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1heCgpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXg7XG4gICAgfVxuXG4gICAgc2V0IG1heCh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbWF4ID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgICAgICB0aGlzLnZhbGlkYXRvck9uQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWF4OiBEIHwgbnVsbCA9IG51bGw7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9ICFuZXdWYWx1ZSB8fCB0aGlzLmRhdGVBZGFwdGVyLmlzVmFsaWQobmV3VmFsdWUpO1xuXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwobmV3VmFsdWUpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3ZhbHVlOiBEIHwgbnVsbDtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IG1jVmFsaWRhdGlvblRvb2x0aXAodG9vbHRpcDogTWNXYXJuaW5nVG9vbHRpcFRyaWdnZXIpIHtcbiAgICAgICAgaWYgKCF0b29sdGlwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRvb2x0aXAuZW50ZXJEZWxheSA9IHZhbGlkYXRpb25Ub29sdGlwU2hvd0RlbGF5O1xuICAgICAgICB0b29sdGlwLnRyaWdnZXIgPSAnbWFudWFsJztcblxuICAgICAgICB0b29sdGlwLmluaXRMaXN0ZW5lcnMoKTtcblxuICAgICAgICB0aGlzLmluY29ycmVjdElucHV0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodG9vbHRpcC5pc09wZW4pIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICAgIHRvb2x0aXAuc2hvdygpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRvb2x0aXAuaGlkZSgpLCB2YWxpZGF0aW9uVG9vbHRpcEhpZGVEZWxheSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKSBpbmNvcnJlY3RJbnB1dCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIGdldCBoYXNTZWxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblN0YXJ0ICE9PSB0aGlzLnNlbGVjdGlvbkVuZDtcbiAgICB9XG5cbiAgICBnZXQgaXNGdWxsRm9ybWF0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXQgPT09IFRpbWVGb3JtYXRzLkhIbW1zcztcbiAgICB9XG5cbiAgICBnZXQgaXNTaG9ydEZvcm1hdCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0ID09PSBUaW1lRm9ybWF0cy5ISG1tO1xuICAgIH1cblxuICAgIGdldCB2aWV3VmFsdWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgIH1cblxuICAgIGdldCBuZ0NvbnRyb2woKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMudmlld1ZhbHVlICYmICF0aGlzLmlzQmFkSW5wdXQoKTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0aW9uU3RhcnQoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0aW9uU3RhcnQodmFsdWU6IG51bWJlciB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0aW9uRW5kKCk6IG51bWJlciB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3Rpb25FbmQodmFsdWU6IG51bWJlciB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWFkb25seSB1aWQgPSBgbWMtdGltZXBpY2tlci0ke3VuaXF1ZUNvbXBvbmVudElkU3VmZml4Kyt9YDtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgdmFsaWRhdG9yOiBWYWxpZGF0b3JGbiB8IG51bGw7XG5cbiAgICBwcml2YXRlIGxhc3RWYWx1ZVZhbGlkID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcblxuICAgIHByaXZhdGUgZGVmYXVsdFBsYWNlaG9sZGVyID0gdHJ1ZTtcblxuICAgIHByaXZhdGUgb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkO1xuICAgIHByaXZhdGUgb25Ub3VjaGVkOiAoKSA9PiB2b2lkO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcjxhbnk+XG4gICAgKSB7XG4gICAgICAgIGlmICghdGhpcy5kYXRlQWRhcHRlcikge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYE1jVGltZXBpY2tlcjogTm8gcHJvdmlkZXIgZm91bmQgZm9yIERhdGVBZGFwdGVyLiBZb3UgbXVzdCBpbXBvcnQgb25lIG9mIHRoZSBleGlzdGluZyBgICtcbiAgICAgICAgICAgICAgICBgbW9kdWxlcyBhdCB5b3VyIGFwcGxpY2F0aW9uIHJvb3Qgb3IgcHJvdmlkZSBhIGN1c3RvbSBpbXBsZW1lbnRhdGlvbiBvciB1c2UgZXhpc3RzIG9uZXMuYCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IFZhbGlkYXRvcnMuY29tcG9zZShbdGhpcy5wYXJzZVZhbGlkYXRvciwgdGhpcy5taW5WYWxpZGF0b3IsIHRoaXMubWF4VmFsaWRhdG9yXSk7XG5cbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IG5vb3A7XG5cbiAgICAgICAgLy8gRm9yY2Ugc2V0dGVyIHRvIGJlIGNhbGxlZCBpbiBjYXNlIGlkIHdhcyBub3Qgc3BlY2lmaWVkLlxuICAgICAgICB0aGlzLmlkID0gdGhpcy5pZDtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBnZXRTaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRnVsbEZvcm1hdCA/IGZ1bGxGb3JtYXRTaXplIDogc2hvcnRGb3JtYXRTaXplO1xuICAgIH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIGZvY3VzQ2hhbmdlZChpc0ZvY3VzZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzRm9jdXNlZCAhPT0gdGhpcy5mb2N1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSBpc0ZvY3VzZWQ7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25CbHVyKCkge1xuICAgICAgICB0aGlzLmZvY3VzQ2hhbmdlZChmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5vbklucHV0KCk7XG4gICAgfVxuXG4gICAgb25QYXN0ZSgkZXZlbnQpIHtcbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmZvcm1hdFVzZXJQYXN0ZSgkZXZlbnQuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0JykpO1xuXG4gICAgICAgIGNvbnN0IG5ld1RpbWVPYmogPSB0aGlzLmdldERhdGVGcm9tVGltZVN0cmluZyh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKCFuZXdUaW1lT2JqKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKHRoaXMuZ2V0VGltZVN0cmluZ0Zyb21EYXRlKG5ld1RpbWVPYmosIHRoaXMuZm9ybWF0KSk7XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IG5ld1RpbWVPYmo7XG4gICAgICAgIHRoaXMub25DaGFuZ2UobmV3VGltZU9iaik7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBvbklucHV0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMuZm9ybWF0VXNlcklucHV0KHRoaXMudmlld1ZhbHVlKTtcblxuICAgICAgICBjb25zdCBuZXdUaW1lT2JqID0gdGhpcy5nZXREYXRlRnJvbVRpbWVTdHJpbmcoZm9ybWF0dGVkVmFsdWUpO1xuICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gISFuZXdUaW1lT2JqO1xuXG4gICAgICAgIGlmICghbmV3VGltZU9iaikge1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZShudWxsKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICBjb25zdCBzZWxlY3Rpb25FbmQgPSB0aGlzLnNlbGVjdGlvbkVuZDtcblxuICAgICAgICB0aGlzLnNldFZpZXdWYWx1ZSh0aGlzLmdldFRpbWVTdHJpbmdGcm9tRGF0ZShuZXdUaW1lT2JqLCB0aGlzLmZvcm1hdCkpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydDtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmQ7XG5cbiAgICAgICAgdGhpcy5jcmVhdGVTZWxlY3Rpb25PZlRpbWVDb21wb25lbnRJbklucHV0KChzZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpICsgMSk7XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IG5ld1RpbWVPYmo7XG4gICAgICAgIHRoaXMub25DaGFuZ2UobmV3VGltZU9iaik7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgb25Db250YWluZXJDbGljaygpIHtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuXG4gICAgICAgIGlmIChpc0xldHRlcktleShldmVudCkgJiYgIWV2ZW50LmN0cmxLZXkgJiYgIWV2ZW50Lm1ldGFLZXkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5jb3JyZWN0SW5wdXQuZW1pdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgKGhhc01vZGlmaWVyS2V5KGV2ZW50KSAmJiAoaXNWZXJ0aWNhbE1vdmVtZW50KGtleUNvZGUpIHx8IGlzSG9yaXpvbnRhbE1vdmVtZW50KGtleUNvZGUpKSkgfHxcbiAgICAgICAgICAgIGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQubWV0YUtleSB8fFxuICAgICAgICAgICAgW0RFTEVURSwgQkFDS1NQQUNFXS5pbmNsdWRlcyhrZXlDb2RlKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIG5vb3AoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBTUEFDRSkge1xuICAgICAgICAgICAgdGhpcy5zcGFjZUtleUhhbmRsZXIoZXZlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKFtIT01FLCBQQUdFX1VQXS5pbmNsdWRlcyhrZXlDb2RlKSkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVTZWxlY3Rpb25PZlRpbWVDb21wb25lbnRJbklucHV0KDApO1xuICAgICAgICB9IGVsc2UgaWYgKFtFTkQsIFBBR0VfRE9XTl0uaW5jbHVkZXMoa2V5Q29kZSkpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU2VsZWN0aW9uT2ZUaW1lQ29tcG9uZW50SW5JbnB1dCh0aGlzLnZpZXdWYWx1ZS5sZW5ndGgpO1xuICAgICAgICB9IGVsc2UgaWYgKFtVUF9BUlJPVywgRE9XTl9BUlJPV10uaW5jbHVkZXMoa2V5Q29kZSkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMudmVydGljYWxBcnJvd0tleUhhbmRsZXIoa2V5Q29kZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoW0xFRlRfQVJST1csIFJJR0hUX0FSUk9XXS5pbmNsdWRlcyhrZXlDb2RlKSkge1xuICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsQXJyb3dLZXlIYW5kbGVyKGtleUNvZGUpO1xuICAgICAgICB9IGVsc2UgaWYgKC9eXFxEJC8udGVzdChldmVudC5rZXkpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuZ2V0TmV3VmFsdWUoZXZlbnQua2V5LCB0aGlzLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcik7XG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMucmVwbGFjZVN5bWJvbHMobmV3VmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IGZvcm1hdHRlZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWaWV3VmFsdWUoZm9ybWF0dGVkVmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLm9uSW5wdXQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluY29ycmVjdElucHV0LmVtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5vbklucHV0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgICAgICAgdGhpcy5zZXRDb250cm9sKGNvbnRyb2wpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvciA/IHRoaXMudmFsaWRhdG9yKGNvbnRyb2wpIDogbnVsbDtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBEIHwgbnVsbCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBEKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZvcm1hdFVzZXJQYXN0ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZS5tYXRjaChBTV9QTV9GT1JNQVRfUkVHRVhQKSkgeyByZXR1cm4gdmFsdWU7IH1cblxuICAgICAgICBjb25zdCBtYXRjaDogUmVnRXhwTWF0Y2hBcnJheSB8IG51bGwgPSB2YWx1ZS5tYXRjaChcbiAgICAgICAgICAgIC9eKFxcRCspPyg/PGhvdXJzPlxcZCspPyhcXEQrKT8oXFxEKyk/KD88bWludXRlcz5cXGQrKT8oXFxEKyk/KFxcRCspPyg/PHNlY29uZHM+XFxkKyk/KFxcRCspPyQvXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCFtYXRjaD8uZ3JvdXBzPy5ob3Vycykge1xuICAgICAgICAgICAgdGhpcy5zZXRWaWV3VmFsdWUodmFsdWUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlTnVtYmVycyhPYmplY3QudmFsdWVzKG1hdGNoLmdyb3VwcylcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1tYWdpYy1udW1iZXJzXG4gICAgICAgICAgICAubWFwKChncm91cCkgPT4gKGdyb3VwIHx8ICcnKS5wYWRTdGFydCgyLCAnMCcpKVxuICAgICAgICAgICAgLmpvaW4oJzonKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZm9ybWF0VXNlcklucHV0KHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlTnVtYmVycyh0aGlzLnJlcGxhY2VTeW1ib2xzKHZhbHVlKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXBsYWNlU3ltYm9scyh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGZvcm1hdHRlZFZhbHVlOiBzdHJpbmcgPSB2YWx1ZTtcblxuICAgICAgICBjb25zdCBtYXRjaDogUmVnRXhwTWF0Y2hBcnJheSB8IG51bGwgPSB2YWx1ZS5tYXRjaCgvXihcXGRcXGQ6KXswLDJ9KD88bnVtYmVyPlswLTldKSg/PHN5bWJvbD5cXFcpKDpcXGRcXGQpezAsMn0kLyk7XG5cbiAgICAgICAgaWYgKG1hdGNoPy5ncm91cHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgbnVtYmVyLCBzeW1ib2wgfSA9IG1hdGNoLmdyb3VwcztcblxuICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgPSB2YWx1ZS5yZXBsYWNlKG51bWJlciArIHN5bWJvbCwgYDAke251bWJlcn1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWRWYWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlcGxhY2VOdW1iZXJzKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBsZXQgZm9ybWF0dGVkVmFsdWU6IHN0cmluZyA9IHZhbHVlO1xuXG4gICAgICAgIGNvbnN0IG1hdGNoOiBSZWdFeHBNYXRjaEFycmF5IHwgbnVsbCA9IHZhbHVlLm1hdGNoKC9eKD88aG91cnM+XFxkezAsNH0pOj8oPzxtaW51dGVzPlxcZHswLDR9KTo/KD88c2Vjb25kcz5cXGR7MCw0fSkkLyk7XG5cbiAgICAgICAgaWYgKG1hdGNoPy5ncm91cHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMgfSA9IG1hdGNoLmdyb3VwcztcblxuICAgICAgICAgICAgaWYgKGhvdXJzLmxlbmd0aCAmJiBwYXJzZUludChob3VycykgPiBIT1VSU19QRVJfREFZKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgPSBmb3JtYXR0ZWRWYWx1ZS5yZXBsYWNlKGhvdXJzLCBIT1VSU19QRVJfREFZLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWludXRlcy5sZW5ndGggJiYgcGFyc2VJbnQobWludXRlcykgPiBNSU5VVEVTX1BFUl9IT1VSKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgPSBmb3JtYXR0ZWRWYWx1ZS5yZXBsYWNlKG1pbnV0ZXMsIE1JTlVURVNfUEVSX0hPVVIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzZWNvbmRzLmxlbmd0aCAmJiBwYXJzZUludChzZWNvbmRzKSA+IFNFQ09ORFNfUEVSX01JTlVURSkge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlID0gZm9ybWF0dGVkVmFsdWUucmVwbGFjZShzZWNvbmRzLCBTRUNPTkRTX1BFUl9NSU5VVEUudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm9ybWF0dGVkVmFsdWU7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBpbnZhbGlkIGJhc2VkIG9uIHRoZSBuYXRpdmUgdmFsaWRhdGlvbi4gKi9cbiAgICBwcml2YXRlIGlzQmFkSW5wdXQoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHZhbGlkaXR5ID0gKDxIVE1MSW5wdXRFbGVtZW50PiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkudmFsaWRpdHk7XG5cbiAgICAgICAgcmV0dXJuIHZhbGlkaXR5ICYmIHZhbGlkaXR5LmJhZElucHV0O1xuICAgIH1cblxuICAgIHByaXZhdGUgc3BhY2VLZXlIYW5kbGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uU3RhcnQgPT09IHRoaXMuc2VsZWN0aW9uRW5kKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0TmV3VmFsdWUoZXZlbnQua2V5LCB0aGlzLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcik7XG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMucmVwbGFjZVN5bWJvbHModmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IGZvcm1hdHRlZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWaWV3VmFsdWUoZm9ybWF0dGVkVmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLm9uSW5wdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0aW9uU3RhcnQgIT09IHRoaXMuc2VsZWN0aW9uRW5kKSB7XG5cbiAgICAgICAgICAgIGxldCBjdXJzb3JQb3MgPSB0aGlzLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcjtcblxuICAgICAgICAgICAgY29uc3QgbmV4dERpdmlkZXJQb3M6IG51bWJlciA9IHRoaXMudmlld1ZhbHVlLmluZGV4T2YoJzonLCBjdXJzb3JQb3MpO1xuXG4gICAgICAgICAgICBjdXJzb3JQb3MgPSBuZXh0RGl2aWRlclBvcyA/IG5leHREaXZpZGVyUG9zICsgMSA6IDA7XG5cbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU2VsZWN0aW9uT2ZUaW1lQ29tcG9uZW50SW5JbnB1dChjdXJzb3JQb3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXROZXdWYWx1ZShrZXk6IHN0cmluZywgcG9zaXRpb246IG51bWJlcikge1xuICAgICAgICByZXR1cm4gW3RoaXMudmlld1ZhbHVlLnNsaWNlKDAsIHBvc2l0aW9uKSwga2V5LCB0aGlzLnZpZXdWYWx1ZS5zbGljZShwb3NpdGlvbildLmpvaW4oJycpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdmVydGljYWxBcnJvd0tleUhhbmRsZXIoa2V5Q29kZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy52YWx1ZSkgeyByZXR1cm47IH1cblxuICAgICAgICBsZXQgY2hhbmdlZFRpbWU7XG5cbiAgICAgICAgY29uc3QgbmV3RWRpdFBhcmFtcyA9IHRoaXMuZ2V0VGltZUVkaXRNZXRyaWNzKHRoaXMuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKTtcblxuICAgICAgICBpZiAoa2V5Q29kZSA9PT0gVVBfQVJST1cpIHtcbiAgICAgICAgICAgIGNoYW5nZWRUaW1lID0gdGhpcy5pbmNyZW1lbnRUaW1lKHRoaXMudmFsdWUsIG5ld0VkaXRQYXJhbXMubW9kaWZpZWRUaW1lUGFydCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5Q29kZSA9PT0gRE9XTl9BUlJPVykge1xuICAgICAgICAgICAgY2hhbmdlZFRpbWUgPSB0aGlzLmRlY3JlbWVudFRpbWUodGhpcy52YWx1ZSwgbmV3RWRpdFBhcmFtcy5tb2RpZmllZFRpbWVQYXJ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmFsdWUgPSBjaGFuZ2VkVGltZTtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gbmV3RWRpdFBhcmFtcy5jdXJzb3JTdGFydFBvc2l0aW9uO1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkVuZCA9IG5ld0VkaXRQYXJhbXMuY3Vyc29yRW5kUG9zaXRpb247XG5cbiAgICAgICAgdGhpcy5vbkNoYW5nZShjaGFuZ2VkVGltZSk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhvcml6b250YWxBcnJvd0tleUhhbmRsZXIoa2V5Q29kZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy52YWx1ZSkgeyByZXR1cm47IH1cblxuICAgICAgICBsZXQgY3Vyc29yUG9zID0gdGhpcy5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXI7XG5cbiAgICAgICAgaWYgKGtleUNvZGUgPT09IExFRlRfQVJST1cpIHtcbiAgICAgICAgICAgIGN1cnNvclBvcyA9IGN1cnNvclBvcyA9PT0gMCA/IHRoaXMudmlld1ZhbHVlLmxlbmd0aCA6IGN1cnNvclBvcyAtIDE7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gUklHSFRfQVJST1cpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHREaXZpZGVyUG9zOiBudW1iZXIgPSB0aGlzLnZpZXdWYWx1ZS5pbmRleE9mKCc6JywgY3Vyc29yUG9zKTtcblxuICAgICAgICAgICAgY3Vyc29yUG9zID0gbmV4dERpdmlkZXJQb3MgPyBuZXh0RGl2aWRlclBvcyArIDEgOiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jcmVhdGVTZWxlY3Rpb25PZlRpbWVDb21wb25lbnRJbklucHV0KGN1cnNvclBvcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVTZWxlY3Rpb25PZlRpbWVDb21wb25lbnRJbklucHV0KGN1cnNvclBvczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3RWRpdFBhcmFtcyA9IHRoaXMuZ2V0VGltZUVkaXRNZXRyaWNzKGN1cnNvclBvcyk7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhcnQgPSBuZXdFZGl0UGFyYW1zLmN1cnNvclN0YXJ0UG9zaXRpb247XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkVuZCA9IG5ld0VkaXRQYXJhbXMuY3Vyc29yRW5kUG9zaXRpb247XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5jcmVtZW50VGltZShkYXRlVmFsOiBELCB3aGF0VG9JbmNyZW1lbnQ6IFRpbWVQYXJ0cyA9IFRpbWVQYXJ0cy5zZWNvbmRzKTogRCB7XG4gICAgICAgIGxldCBob3VycyA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0SG91cnMoZGF0ZVZhbCk7XG4gICAgICAgIGxldCBtaW51dGVzID0gdGhpcy5kYXRlQWRhcHRlci5nZXRNaW51dGVzKGRhdGVWYWwpO1xuICAgICAgICBsZXQgc2Vjb25kcyA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0U2Vjb25kcyhkYXRlVmFsKTtcblxuICAgICAgICBzd2l0Y2ggKHdoYXRUb0luY3JlbWVudCkge1xuICAgICAgICAgICAgY2FzZSBUaW1lUGFydHMuaG91cnM6XG4gICAgICAgICAgICAgICAgaG91cnMrKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVGltZVBhcnRzLm1pbnV0ZXM6XG4gICAgICAgICAgICAgICAgbWludXRlcysrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUaW1lUGFydHMuc2Vjb25kczpcbiAgICAgICAgICAgICAgICBzZWNvbmRzKys7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY29uZHMgPiBTRUNPTkRTX1BFUl9NSU5VVEUpIHsgc2Vjb25kcyA9IDA7IH1cblxuICAgICAgICBpZiAobWludXRlcyA+IE1JTlVURVNfUEVSX0hPVVIpIHsgbWludXRlcyA9IDA7IH1cblxuICAgICAgICBpZiAoaG91cnMgPiBIT1VSU19QRVJfREFZKSB7IGhvdXJzID0gMDsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVBZGFwdGVyLmNyZWF0ZURhdGVUaW1lKFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMudmFsdWUpLFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLnZhbHVlKSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLnZhbHVlKSxcbiAgICAgICAgICAgIGhvdXJzLFxuICAgICAgICAgICAgbWludXRlcyxcbiAgICAgICAgICAgIHNlY29uZHMsXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbGxpc2Vjb25kcyh0aGlzLnZhbHVlKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVjcmVtZW50VGltZShkYXRlVmFsOiBELCB3aGF0VG9EZWNyZW1lbnQ6IFRpbWVQYXJ0cyA9IFRpbWVQYXJ0cy5zZWNvbmRzKTogRCB7XG4gICAgICAgIGxldCBob3VycyA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0SG91cnMoZGF0ZVZhbCk7XG4gICAgICAgIGxldCBtaW51dGVzID0gdGhpcy5kYXRlQWRhcHRlci5nZXRNaW51dGVzKGRhdGVWYWwpO1xuICAgICAgICBsZXQgc2Vjb25kcyA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0U2Vjb25kcyhkYXRlVmFsKTtcblxuICAgICAgICBzd2l0Y2ggKHdoYXRUb0RlY3JlbWVudCkge1xuICAgICAgICAgICAgY2FzZSBUaW1lUGFydHMuaG91cnM6XG4gICAgICAgICAgICAgICAgaG91cnMtLTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVGltZVBhcnRzLm1pbnV0ZXM6XG4gICAgICAgICAgICAgICAgbWludXRlcy0tO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUaW1lUGFydHMuc2Vjb25kczpcbiAgICAgICAgICAgICAgICBzZWNvbmRzLS07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY29uZHMgPCAwKSB7IHNlY29uZHMgPSBTRUNPTkRTX1BFUl9NSU5VVEU7IH1cblxuICAgICAgICBpZiAobWludXRlcyA8IDApIHsgbWludXRlcyA9IE1JTlVURVNfUEVSX0hPVVI7IH1cblxuICAgICAgICBpZiAoaG91cnMgPCAwKSB7IGhvdXJzID0gSE9VUlNfUEVSX0RBWTsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVBZGFwdGVyLmNyZWF0ZURhdGVUaW1lKFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMudmFsdWUpLFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLnZhbHVlKSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLnZhbHVlKSxcbiAgICAgICAgICAgIGhvdXJzLFxuICAgICAgICAgICAgbWludXRlcyxcbiAgICAgICAgICAgIHNlY29uZHMsXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbGxpc2Vjb25kcyh0aGlzLnZhbHVlKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgcGFyYW1zIGZvciBhcnJvdy1rZXlzICh1cC9kb3duKSB0aW1lIHZhbGllIGVkaXQuXG4gICAgICogQHBhcmFtIGN1cnNvclBvc2l0aW9uIEN1cnJlbnQgY3Vyc29yIHBvc2l0aW9uIGluIHRpbWVTdHJpbmdcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFRpbWVFZGl0TWV0cmljcyhjdXJzb3JQb3NpdGlvbjogbnVtYmVyKToge1xuICAgICAgICBtb2RpZmllZFRpbWVQYXJ0OiBUaW1lUGFydHM7XG4gICAgICAgIGN1cnNvclN0YXJ0UG9zaXRpb246IG51bWJlcjtcbiAgICAgICAgY3Vyc29yRW5kUG9zaXRpb246IG51bWJlcjtcbiAgICB9IHtcbiAgICAgICAgY29uc3QgdGltZVN0cmluZzogc3RyaW5nID0gdGhpcy52aWV3VmFsdWU7XG4gICAgICAgIGxldCBtb2RpZmllZFRpbWVQYXJ0OiBUaW1lUGFydHM7XG4gICAgICAgIGxldCBjdXJzb3JTdGFydFBvc2l0aW9uOiBudW1iZXI7XG4gICAgICAgIGxldCBjdXJzb3JFbmRQb3NpdGlvbjogbnVtYmVyO1xuXG4gICAgICAgIGNvbnN0IGhvdXJzSW5kZXggPSAwO1xuICAgICAgICBjb25zdCBtaW51dGVzSW5kZXggPSB0aW1lU3RyaW5nLmluZGV4T2YoJzonLCBob3Vyc0luZGV4ICsgMSk7XG4gICAgICAgIGNvbnN0IHNlY29uZHNJbmRleCA9IG1pbnV0ZXNJbmRleCAhPT0gLTEgPyB0aW1lU3RyaW5nLmluZGV4T2YoJzonLCBtaW51dGVzSW5kZXggKyAxKSA6IC0xO1xuXG4gICAgICAgIGlmIChzZWNvbmRzSW5kZXggIT09IC0xICYmIGN1cnNvclBvc2l0aW9uID4gc2Vjb25kc0luZGV4KSB7XG4gICAgICAgICAgICBtb2RpZmllZFRpbWVQYXJ0ID0gVGltZVBhcnRzLnNlY29uZHM7XG4gICAgICAgICAgICBjdXJzb3JTdGFydFBvc2l0aW9uID0gc2Vjb25kc0luZGV4ICsgMTtcbiAgICAgICAgICAgIGN1cnNvckVuZFBvc2l0aW9uID0gdGltZVN0cmluZy5sZW5ndGg7XG4gICAgICAgIH0gZWxzZSBpZiAobWludXRlc0luZGV4ICE9PSAtMSAmJiBjdXJzb3JQb3NpdGlvbiA+IG1pbnV0ZXNJbmRleCkge1xuICAgICAgICAgICAgbW9kaWZpZWRUaW1lUGFydCA9IFRpbWVQYXJ0cy5taW51dGVzO1xuICAgICAgICAgICAgY3Vyc29yU3RhcnRQb3NpdGlvbiA9IG1pbnV0ZXNJbmRleCArIDE7XG4gICAgICAgICAgICBjdXJzb3JFbmRQb3NpdGlvbiA9IHNlY29uZHNJbmRleCA+IC0xID8gc2Vjb25kc0luZGV4IDogdGltZVN0cmluZy5sZW5ndGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2RpZmllZFRpbWVQYXJ0ID0gVGltZVBhcnRzLmhvdXJzO1xuICAgICAgICAgICAgY3Vyc29yU3RhcnRQb3NpdGlvbiA9IGhvdXJzSW5kZXg7XG4gICAgICAgICAgICBjdXJzb3JFbmRQb3NpdGlvbiA9IG1pbnV0ZXNJbmRleCAhPT0gLTEgPyBtaW51dGVzSW5kZXggOiB0aW1lU3RyaW5nLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IG1vZGlmaWVkVGltZVBhcnQsIGN1cnNvclN0YXJ0UG9zaXRpb24sIGN1cnNvckVuZFBvc2l0aW9uIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIENyZWF0ZSB0aW1lIHN0cmluZyBmb3IgZGlzcGxheWluZyBpbnNpZGUgaW5wdXQgZWxlbWVudCBvZiBVSVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0VGltZVN0cmluZ0Zyb21EYXRlKHZhbHVlOiBEIHwgbnVsbCwgdGltZUZvcm1hdDogVGltZUZvcm1hdHMpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXZhbHVlIHx8ICF0aGlzLmRhdGVBZGFwdGVyLmlzVmFsaWQodmFsdWUpKSB7IHJldHVybiAnJzsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVBZGFwdGVyLmZvcm1hdCh2YWx1ZSwgdGltZUZvcm1hdCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREYXRlRnJvbVRpbWVTdHJpbmcodGltZVN0cmluZzogc3RyaW5nKTogRCB8IG51bGwge1xuICAgICAgICBpZiAoIXRpbWVTdHJpbmcpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICBjb25zdCBITVMgPSB0aW1lU3RyaW5nLm1hdGNoKEhPVVJTX01JTlVURVNfU0VDT05EU19SRUdFWFApO1xuICAgICAgICBjb25zdCBITSA9IHRpbWVTdHJpbmcubWF0Y2goSE9VUlNfTUlOVVRFU19SRUdFWFApO1xuICAgICAgICBjb25zdCBIID0gdGltZVN0cmluZy5tYXRjaChIT1VSU19PTkxZX1JFR0VYUCk7XG4gICAgICAgIGNvbnN0IGFtUG0gPSB0aW1lU3RyaW5nLm1hdGNoKEFNX1BNX0ZPUk1BVF9SRUdFWFApO1xuXG4gICAgICAgIGxldCBob3VyczogbnVtYmVyID0gMDtcbiAgICAgICAgbGV0IG1pbnV0ZXM6IG51bWJlciA9IDA7XG4gICAgICAgIGxldCBzZWNvbmRzOiBudW1iZXIgPSAwO1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlOm5vLW1hZ2ljLW51bWJlcnNcbiAgICAgICAgaWYgKGFtUG0pIHtcbiAgICAgICAgICAgIGhvdXJzID0gTnVtYmVyKGFtUG1bMV0pO1xuICAgICAgICAgICAgbWludXRlcyA9IE51bWJlcihhbVBtWzJdKTtcblxuICAgICAgICAgICAgaWYgKC9bcF0vaS50ZXN0KGFtUG1bM10pIHx8ICgvW2FdL2kudGVzdChhbVBtWzNdKSAmJiBob3VycyA9PT0gMTIpKSB7XG4gICAgICAgICAgICAgICAgaG91cnMgKz0gMTI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoSE1TKSB7XG4gICAgICAgICAgICBob3VycyA9IE51bWJlcihITVNbMV0pO1xuICAgICAgICAgICAgbWludXRlcyA9IE51bWJlcihITVNbMl0pO1xuICAgICAgICAgICAgc2Vjb25kcyA9IE51bWJlcihITVNbM10pO1xuICAgICAgICB9IGVsc2UgaWYgKEhNKSB7XG4gICAgICAgICAgICBob3VycyA9IE51bWJlcihITVsxXSk7XG4gICAgICAgICAgICBtaW51dGVzID0gTnVtYmVyKEhNWzJdKTtcbiAgICAgICAgfSBlbHNlIGlmIChIKSB7XG4gICAgICAgICAgICBob3VycyA9IE51bWJlcihIWzFdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRzbGludDplbmFibGVcblxuICAgICAgICBjb25zdCByZXN1bHREYXRlID0gdGhpcy5kYXRlQWRhcHRlci5jcmVhdGVEYXRlVGltZShcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLnZhbHVlKSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy52YWx1ZSksXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldERhdGUodGhpcy52YWx1ZSksXG4gICAgICAgICAgICBob3VycyxcbiAgICAgICAgICAgIG1pbnV0ZXMgfHwgMCxcbiAgICAgICAgICAgIHNlY29uZHMgfHwgMCxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TWlsbGlzZWNvbmRzKHRoaXMudmFsdWUpXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHJlc3VsdERhdGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VWYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9jdXNlZCB8fFxuICAgICAgICAgICAgdGhpcy5lbXB0eSB8fFxuICAgICAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA/IG51bGwgOiB7IG1jVGltZXBpY2tlclBhcnNlOiB7IHRleHQ6IHRoaXMudmlld1ZhbHVlIH0gfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1pblZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICBjb25zdCBjb250cm9sVmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWUpKTtcblxuICAgICAgICByZXR1cm4gKCF0aGlzLm1pbiB8fCAhY29udHJvbFZhbHVlIHx8IHRoaXMuY29tcGFyZVRpbWUodGhpcy5taW4sIGNvbnRyb2xWYWx1ZSkgPD0gMCkgP1xuICAgICAgICAgICAgbnVsbCA6XG4gICAgICAgICAgICB7IG1jVGltZXBpY2tlckxvd2VyVGhlbk1pbjogeyBtaW46IHRoaXMubWluLCBhY3R1YWw6IGNvbnRyb2xWYWx1ZSB9IH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXhWYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgICAgY29uc3QgY29udHJvbFZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlKSk7XG5cbiAgICAgICAgcmV0dXJuICghdGhpcy5tYXggfHwgIWNvbnRyb2xWYWx1ZSB8fCB0aGlzLmNvbXBhcmVUaW1lKHRoaXMubWF4LCBjb250cm9sVmFsdWUpID49IDApID9cbiAgICAgICAgICAgIG51bGwgOlxuICAgICAgICAgICAgeyBtY1RpbWVwaWNrZXJIaWdoZXJUaGVuTWF4OiB7IG1heDogdGhpcy5tYXgsIGFjdHVhbDogY29udHJvbFZhbHVlIH0gfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbXBhcmVUaW1lKGZpcnN0OiBELCBzZWNvbmQ6IEQpOiBudW1iZXIge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmRhdGVBZGFwdGVyLmdldEhvdXJzKGZpcnN0KSAtIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0SG91cnMoc2Vjb25kKSB8fFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRNaW51dGVzKGZpcnN0KSAtIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TWludXRlcyhzZWNvbmQpO1xuXG4gICAgICAgIGlmIChUaW1lRm9ybWF0cy5ISG1tID09PSB0aGlzLmZvcm1hdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSBlbHNlIGlmIChUaW1lRm9ybWF0cy5ISG1tc3MgPT09IHRoaXMuZm9ybWF0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0IHx8IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0U2Vjb25kcyhmaXJzdCkgLSB0aGlzLmRhdGVBZGFwdGVyLmdldFNlY29uZHMoc2Vjb25kKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBVbmtub3duIGZvcm1hdDogJHt0aGlzLmZvcm1hdH1gKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VmFsaWREYXRlT3JOdWxsKG9iajogYW55KTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gKHRoaXMuZGF0ZUFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJiB0aGlzLmRhdGVBZGFwdGVyLmlzVmFsaWQob2JqKSkgPyBvYmogOiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Vmlld1ZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVmlldygpIHtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkVmFsdWUgPSB0aGlzLmdldFRpbWVTdHJpbmdGcm9tRGF0ZSh0aGlzLnZhbHVlLCB0aGlzLmZvcm1hdCk7XG5cbiAgICAgICAgdGhpcy5zZXRWaWV3VmFsdWUoZm9ybWF0dGVkVmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Q29udHJvbChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRyb2wpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbCA9IGNvbnRyb2w7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcbiAgICBwcml2YXRlIHZhbGlkYXRvck9uQ2hhbmdlID0gKCkgPT4ge307XG59XG4iXX0=