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
        if (value.match(AM_PM_FORMAT_REGEXP)) {
            return value;
        }
        const match = value.match(/^(\D+)?(?<hours>\d+)?(\D+)?(\D+)?(?<minutes>\d+)?(\D+)?(\D+)?(?<seconds>\d+)?(\D+)?$/);
        if (!match?.groups?.hours) {
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
        if (match?.groups) {
            const { number, symbol } = match.groups;
            formattedValue = value.replace(number + symbol, `0${number}`);
        }
        return formattedValue;
    }
    replaceNumbers(value) {
        let formattedValue = value;
        const match = value.match(/^(?<hours>\d{0,4}):?(?<minutes>\d{0,4}):?(?<seconds>\d{0,4})$/);
        if (match?.groups) {
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
        const date = this.value || this.dateAdapter.today();
        const resultDate = this.dateAdapter.createDateTime(this.dateAdapter.getYear(date), this.dateAdapter.getMonth(date), this.dateAdapter.getDate(date), hours, minutes || 0, seconds || 0, this.dateAdapter.getMilliseconds(date));
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
/** @nocollapse */ /** @nocollapse */ McTimepicker.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McTimepicker, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.DateAdapter, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McTimepicker.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: McTimepicker, selector: "input[mcTimepicker]", inputs: { placeholder: "placeholder", disabled: "disabled", id: "id", required: "required", format: "format", min: "min", max: "max", value: "value", mcValidationTooltip: "mcValidationTooltip" }, outputs: { incorrectInput: "incorrectInput" }, host: { listeners: { "blur": "onBlur()", "focus": "focusChanged(true)", "paste": "onPaste($event)", "keydown": "onKeyDown($event)" }, properties: { "attr.id": "id", "attr.placeholder": "placeholder", "attr.disabled": "disabled || null", "attr.required": "required", "attr.size": "getSize()", "attr.autocomplete": "\"off\"" }, classAttribute: "mc-input mc-timepicker" }, providers: [
        MC_TIMEPICKER_VALIDATORS,
        MC_TIMEPICKER_VALUE_ACCESSOR,
        { provide: McFormFieldControl, useExisting: McTimepicker }
    ], exportAs: ["mcTimepicker"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McTimepicker, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdGltZXBpY2tlci90aW1lcGlja2VyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0gsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBR0gsYUFBYSxFQUNiLGlCQUFpQixFQUlqQixVQUFVLEVBQ2IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUNILFVBQVUsRUFDVixRQUFRLEVBQ1IsSUFBSSxFQUNKLEdBQUcsRUFDSCxVQUFVLEVBQ1YsV0FBVyxFQUNYLFNBQVMsRUFDVCxPQUFPLEVBQ1AsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsY0FBYyxFQUNkLFdBQVcsRUFDWCxrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3BCLEdBQUcsRUFDTixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ25FLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXJDLE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLG9CQUFvQixFQUNwQiw0QkFBNEIsRUFDNUIsaUJBQWlCLEVBQ2pC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b0JBQW9CO3dCQUUvQixTQUFTLEVBQUUsaUJBQWlCO3dCQUU1QixXQUFXLEVBQUUsbUJBQW1CO3FCQUNuQztvQkFDRCxTQUFTLEVBQUU7d0JBQ1Asd0JBQXdCO3dCQUN4Qiw0QkFBNEI7d0JBQzVCLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFdBQVcsY0FBYyxFQUFFO3FCQUM3RDtpQkFDSjs7MEJBbU9RLFFBQVE7NENBeE1ULFdBQVc7c0JBRGQsS0FBSztnQkFjRixRQUFRO3NCQURYLEtBQUs7Z0JBb0JGLEVBQUU7c0JBREwsS0FBSztnQkFnQkYsUUFBUTtzQkFEWCxLQUFLO2dCQVlGLE1BQU07c0JBRFQsS0FBSztnQkF1QkYsR0FBRztzQkFETixLQUFLO2dCQWFGLEdBQUc7c0JBRE4sS0FBSztnQkFhRixLQUFLO3NCQURSLEtBQUs7Z0JBa0JGLG1CQUFtQjtzQkFEdEIsS0FBSztnQkFrQkksY0FBYztzQkFBdkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBBYnN0cmFjdENvbnRyb2wsXG4gICAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgTkdfVkFMSURBVE9SUyxcbiAgICBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICBWYWxpZGF0aW9uRXJyb3JzLFxuICAgIFZhbGlkYXRvcixcbiAgICBWYWxpZGF0b3JGbixcbiAgICBWYWxpZGF0b3JzXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2RhdGV0aW1lJztcbmltcG9ydCB7XG4gICAgRE9XTl9BUlJPVyxcbiAgICBVUF9BUlJPVyxcbiAgICBIT01FLFxuICAgIEVORCxcbiAgICBMRUZUX0FSUk9XLFxuICAgIFJJR0hUX0FSUk9XLFxuICAgIFBBR0VfRE9XTixcbiAgICBQQUdFX1VQLFxuICAgIFNQQUNFLFxuICAgIERFTEVURSxcbiAgICBCQUNLU1BBQ0UsXG4gICAgaGFzTW9kaWZpZXJLZXksXG4gICAgaXNMZXR0ZXJLZXksXG4gICAgaXNWZXJ0aWNhbE1vdmVtZW50LFxuICAgIGlzSG9yaXpvbnRhbE1vdmVtZW50LFxuICAgIFRBQlxufSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgdmFsaWRhdGlvblRvb2x0aXBIaWRlRGVsYXksIHZhbGlkYXRpb25Ub29sdGlwU2hvd0RlbGF5IH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNGb3JtRmllbGRDb250cm9sIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgTWNXYXJuaW5nVG9vbHRpcFRyaWdnZXIgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvdG9vbHRpcCc7XG5pbXBvcnQgeyBub29wLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7XG4gICAgREVGQVVMVF9USU1FX0ZPUk1BVCxcbiAgICBIT1VSU19QRVJfREFZLFxuICAgIEhPVVJTX01JTlVURVNfUkVHRVhQLFxuICAgIEhPVVJTX01JTlVURVNfU0VDT05EU19SRUdFWFAsXG4gICAgSE9VUlNfT05MWV9SRUdFWFAsXG4gICAgTUlOVVRFU19QRVJfSE9VUixcbiAgICBTRUNPTkRTX1BFUl9NSU5VVEUsXG4gICAgVElNRUZPUk1BVF9QTEFDRUhPTERFUlMsXG4gICAgVGltZUZvcm1hdHMsXG4gICAgVGltZVBhcnRzLFxuICAgIEFNX1BNX0ZPUk1BVF9SRUdFWFBcbn0gZnJvbSAnLi90aW1lcGlja2VyLmNvbnN0YW50cyc7XG5cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19USU1FUElDS0VSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWNUaW1lcGlja2VyKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19USU1FUElDS0VSX1ZBTElEQVRPUlM6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1jVGltZXBpY2tlciksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cblxubGV0IHVuaXF1ZUNvbXBvbmVudElkU3VmZml4OiBudW1iZXIgPSAwO1xuXG5jb25zdCBzaG9ydEZvcm1hdFNpemU6IG51bWJlciA9IDU7XG5jb25zdCBmdWxsRm9ybWF0U2l6ZTogbnVtYmVyID0gODtcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2lucHV0W21jVGltZXBpY2tlcl0nLFxuICAgIGV4cG9ydEFzOiAnbWNUaW1lcGlja2VyJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtaW5wdXQgbWMtdGltZXBpY2tlcicsXG4gICAgICAgIC8vIE5hdGl2ZSBpbnB1dCBwcm9wZXJ0aWVzIHRoYXQgYXJlIG92ZXJ3cml0dGVuIGJ5IEFuZ3VsYXIgaW5wdXRzIG5lZWQgdG8gYmUgc3luY2VkIHdpdGhcbiAgICAgICAgLy8gdGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50LiBPdGhlcndpc2UgcHJvcGVydHkgYmluZGluZ3MgZm9yIHRob3NlIGRvbid0IHdvcmsuXG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgICAgICAnW2F0dHIucGxhY2Vob2xkZXJdJzogJ3BsYWNlaG9sZGVyJyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAgICAgJ1thdHRyLnJlcXVpcmVkXSc6ICdyZXF1aXJlZCcsXG4gICAgICAgICdbYXR0ci5zaXplXSc6ICdnZXRTaXplKCknLFxuICAgICAgICAnW2F0dHIuYXV0b2NvbXBsZXRlXSc6ICdcIm9mZlwiJyxcblxuICAgICAgICAnKGJsdXIpJzogJ29uQmx1cigpJyxcbiAgICAgICAgJyhmb2N1cyknOiAnZm9jdXNDaGFuZ2VkKHRydWUpJyxcblxuICAgICAgICAnKHBhc3RlKSc6ICdvblBhc3RlKCRldmVudCknLFxuXG4gICAgICAgICcoa2V5ZG93biknOiAnb25LZXlEb3duKCRldmVudCknXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTUNfVElNRVBJQ0tFUl9WQUxJREFUT1JTLFxuICAgICAgICBNQ19USU1FUElDS0VSX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICB7IHByb3ZpZGU6IE1jRm9ybUZpZWxkQ29udHJvbCwgdXNlRXhpc3Rpbmc6IE1jVGltZXBpY2tlciB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNY1RpbWVwaWNrZXI8RD4gaW1wbGVtZW50cyBNY0Zvcm1GaWVsZENvbnRyb2w8RD4sIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0b3IsIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIHJlYWRvbmx5IHN0YXRlQ2hhbmdlczogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICByZWFkb25seSBlcnJvclN0YXRlOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBjb250cm9sVHlwZTogc3RyaW5nID0gJ3RpbWVwaWNrZXInO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wbGFjZWhvbGRlcjtcbiAgICB9XG5cbiAgICBzZXQgcGxhY2Vob2xkZXIodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHZhbHVlO1xuXG4gICAgICAgIHRoaXMuZGVmYXVsdFBsYWNlaG9sZGVyID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcGxhY2Vob2xkZXIgPSBUSU1FRk9STUFUX1BMQUNFSE9MREVSU1tERUZBVUxUX1RJTUVfRk9STUFUXTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgICAgICAvLyBCcm93c2VycyBtYXkgbm90IGZpcmUgdGhlIGJsdXIgZXZlbnQgaWYgdGhlIGlucHV0IGlzIGRpc2FibGVkIHRvbyBxdWlja2x5LlxuICAgICAgICAvLyBSZXNldCBmcm9tIGhlcmUgdG8gZW5zdXJlIHRoYXQgdGhlIGVsZW1lbnQgZG9lc24ndCBiZWNvbWUgc3R1Y2suXG4gICAgICAgIGlmICh0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cblxuICAgIHNldCBpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2lkID0gdmFsdWUgfHwgdGhpcy51aWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVpcmVkO1xuICAgIH1cblxuICAgIHNldCByZXF1aXJlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9yZXF1aXJlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBmb3JtYXQoKTogVGltZUZvcm1hdHMge1xuICAgICAgICByZXR1cm4gdGhpcy5fZm9ybWF0O1xuICAgIH1cblxuICAgIHNldCBmb3JtYXQoZm9ybWF0VmFsdWU6IFRpbWVGb3JtYXRzKSB7XG4gICAgICAgIHRoaXMuX2Zvcm1hdCA9IE9iamVjdFxuICAgICAgICAgICAgLmtleXMoVGltZUZvcm1hdHMpXG4gICAgICAgICAgICAubWFwKCh0aW1lRm9ybWF0S2V5KSA9PiBUaW1lRm9ybWF0c1t0aW1lRm9ybWF0S2V5XSlcbiAgICAgICAgICAgIC5pbmRleE9mKGZvcm1hdFZhbHVlKSA+IC0xID8gZm9ybWF0VmFsdWUgOiBERUZBVUxUX1RJTUVfRk9STUFUO1xuXG4gICAgICAgIGlmICh0aGlzLmRlZmF1bHRQbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXIgPSBUSU1FRk9STUFUX1BMQUNFSE9MREVSU1t0aGlzLl9mb3JtYXRdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZm9ybWF0OiBUaW1lRm9ybWF0cyA9IERFRkFVTFRfVElNRV9GT1JNQVQ7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtaW4oKTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWluO1xuICAgIH1cblxuICAgIHNldCBtaW4odmFsdWU6IEQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX21pbiA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcbiAgICAgICAgdGhpcy52YWxpZGF0b3JPbkNoYW5nZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21pbjogRCB8IG51bGwgPSBudWxsO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWF4KCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heDtcbiAgICB9XG5cbiAgICBzZXQgbWF4KHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9tYXggPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tYXg6IEQgfCBudWxsID0gbnVsbDtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHZhbHVlKCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcblxuICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gIW5ld1ZhbHVlIHx8IHRoaXMuZGF0ZUFkYXB0ZXIuaXNWYWxpZChuZXdWYWx1ZSk7XG5cbiAgICAgICAgdGhpcy5fdmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbChuZXdWYWx1ZSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdmFsdWU6IEQgfCBudWxsO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgbWNWYWxpZGF0aW9uVG9vbHRpcCh0b29sdGlwOiBNY1dhcm5pbmdUb29sdGlwVHJpZ2dlcikge1xuICAgICAgICBpZiAoIXRvb2x0aXApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdG9vbHRpcC5lbnRlckRlbGF5ID0gdmFsaWRhdGlvblRvb2x0aXBTaG93RGVsYXk7XG4gICAgICAgIHRvb2x0aXAudHJpZ2dlciA9ICdtYW51YWwnO1xuXG4gICAgICAgIHRvb2x0aXAuaW5pdExpc3RlbmVycygpO1xuXG4gICAgICAgIHRoaXMuaW5jb3JyZWN0SW5wdXQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0b29sdGlwLmlzT3BlbikgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgdG9vbHRpcC5zaG93KCk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdG9vbHRpcC5oaWRlKCksIHZhbGlkYXRpb25Ub29sdGlwSGlkZURlbGF5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpIGluY29ycmVjdElucHV0ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgZ2V0IGhhc1NlbGVjdGlvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uU3RhcnQgIT09IHRoaXMuc2VsZWN0aW9uRW5kO1xuICAgIH1cblxuICAgIGdldCBpc0Z1bGxGb3JtYXQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdCA9PT0gVGltZUZvcm1hdHMuSEhtbXNzO1xuICAgIH1cblxuICAgIGdldCBpc1Nob3J0Rm9ybWF0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXQgPT09IFRpbWVGb3JtYXRzLkhIbW07XG4gICAgfVxuXG4gICAgZ2V0IHZpZXdWYWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IG5nQ29udHJvbCgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBnZXQgZW1wdHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy52aWV3VmFsdWUgJiYgIXRoaXMuaXNCYWRJbnB1dCgpO1xuICAgIH1cblxuICAgIGdldCBzZWxlY3Rpb25TdGFydCgpOiBudW1iZXIgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0O1xuICAgIH1cblxuICAgIHNldCBzZWxlY3Rpb25TdGFydCh2YWx1ZTogbnVtYmVyIHwgbnVsbCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBzZWxlY3Rpb25FbmQoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQ7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGlvbkVuZCh2YWx1ZTogbnVtYmVyIHwgbnVsbCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IHVpZCA9IGBtYy10aW1lcGlja2VyLSR7dW5pcXVlQ29tcG9uZW50SWRTdWZmaXgrK31gO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSB2YWxpZGF0b3I6IFZhbGlkYXRvckZuIHwgbnVsbDtcblxuICAgIHByaXZhdGUgbGFzdFZhbHVlVmFsaWQgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgY29udHJvbDogQWJzdHJhY3RDb250cm9sO1xuXG4gICAgcHJpdmF0ZSBkZWZhdWx0UGxhY2Vob2xkZXIgPSB0cnVlO1xuXG4gICAgcHJpdmF0ZSBvbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQ7XG4gICAgcHJpdmF0ZSBvblRvdWNoZWQ6ICgpID0+IHZvaWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPGFueT5cbiAgICApIHtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGVBZGFwdGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgTWNUaW1lcGlja2VyOiBObyBwcm92aWRlciBmb3VuZCBmb3IgRGF0ZUFkYXB0ZXIuIFlvdSBtdXN0IGltcG9ydCBvbmUgb2YgdGhlIGV4aXN0aW5nIGAgK1xuICAgICAgICAgICAgICAgIGBtb2R1bGVzIGF0IHlvdXIgYXBwbGljYXRpb24gcm9vdCBvciBwcm92aWRlIGEgY3VzdG9tIGltcGxlbWVudGF0aW9uIG9yIHVzZSBleGlzdHMgb25lcy5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gVmFsaWRhdG9ycy5jb21wb3NlKFt0aGlzLnBhcnNlVmFsaWRhdG9yLCB0aGlzLm1pblZhbGlkYXRvciwgdGhpcy5tYXhWYWxpZGF0b3JdKTtcblxuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gbm9vcDtcblxuICAgICAgICAvLyBGb3JjZSBzZXR0ZXIgdG8gYmUgY2FsbGVkIGluIGNhc2UgaWQgd2FzIG5vdCBzcGVjaWZpZWQuXG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLmlkO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIGdldFNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNGdWxsRm9ybWF0ID8gZnVsbEZvcm1hdFNpemUgOiBzaG9ydEZvcm1hdFNpemU7XG4gICAgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZm9jdXNDaGFuZ2VkKGlzRm9jdXNlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoaXNGb2N1c2VkICE9PSB0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IGlzRm9jdXNlZDtcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkJsdXIoKSB7XG4gICAgICAgIHRoaXMuZm9jdXNDaGFuZ2VkKGZhbHNlKTtcblxuICAgICAgICB0aGlzLnNldFZpZXdWYWx1ZSh0aGlzLmZvcm1hdFVzZXJQYXN0ZSh0aGlzLnZpZXdWYWx1ZSkpO1xuXG4gICAgICAgIHRoaXMub25JbnB1dCgpO1xuICAgIH1cblxuICAgIG9uUGFzdGUoJGV2ZW50KSB7XG4gICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5mb3JtYXRVc2VyUGFzdGUoJGV2ZW50LmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dCcpKTtcblxuICAgICAgICBjb25zdCBuZXdUaW1lT2JqID0gdGhpcy5nZXREYXRlRnJvbVRpbWVTdHJpbmcodmFsdWUpO1xuXG4gICAgICAgIGlmICghbmV3VGltZU9iaikgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnNldFZpZXdWYWx1ZSh0aGlzLmdldFRpbWVTdHJpbmdGcm9tRGF0ZShuZXdUaW1lT2JqLCB0aGlzLmZvcm1hdCkpO1xuXG4gICAgICAgIHRoaXMudmFsdWUgPSBuZXdUaW1lT2JqO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKG5ld1RpbWVPYmopO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgb25JbnB1dCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkVmFsdWUgPSB0aGlzLmZvcm1hdFVzZXJJbnB1dCh0aGlzLnZpZXdWYWx1ZSk7XG5cbiAgICAgICAgY29uc3QgbmV3VGltZU9iaiA9IHRoaXMuZ2V0RGF0ZUZyb21UaW1lU3RyaW5nKGZvcm1hdHRlZFZhbHVlKTtcbiAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9ICEhbmV3VGltZU9iajtcblxuICAgICAgICBpZiAoIW5ld1RpbWVPYmopIHtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UobnVsbCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0ID0gdGhpcy5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uRW5kID0gdGhpcy5zZWxlY3Rpb25FbmQ7XG5cbiAgICAgICAgdGhpcy5zZXRWaWV3VmFsdWUodGhpcy5nZXRUaW1lU3RyaW5nRnJvbURhdGUobmV3VGltZU9iaiwgdGhpcy5mb3JtYXQpKTtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlU2VsZWN0aW9uT2ZUaW1lQ29tcG9uZW50SW5JbnB1dCgoc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSArIDEpO1xuXG4gICAgICAgIHRoaXMudmFsdWUgPSBuZXdUaW1lT2JqO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKG5ld1RpbWVPYmopO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uQ29udGFpbmVyQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcblxuICAgICAgICBpZiAoaXNMZXR0ZXJLZXkoZXZlbnQpICYmICFldmVudC5jdHJsS2V5ICYmICFldmVudC5tZXRhS2V5KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLmluY29ycmVjdElucHV0LmVtaXQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIChoYXNNb2RpZmllcktleShldmVudCkgJiYgKGlzVmVydGljYWxNb3ZlbWVudChldmVudCkgfHwgaXNIb3Jpem9udGFsTW92ZW1lbnQoZXZlbnQpKSkgfHxcbiAgICAgICAgICAgIGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQubWV0YUtleSB8fFxuICAgICAgICAgICAgW0RFTEVURSwgQkFDS1NQQUNFLCBUQUJdLmluY2x1ZGVzKGtleUNvZGUpXG4gICAgICAgICkge1xuICAgICAgICAgICAgbm9vcCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFNQQUNFKSB7XG4gICAgICAgICAgICB0aGlzLnNwYWNlS2V5SGFuZGxlcihldmVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoW0hPTUUsIFBBR0VfVVBdLmluY2x1ZGVzKGtleUNvZGUpKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVNlbGVjdGlvbk9mVGltZUNvbXBvbmVudEluSW5wdXQoMCk7XG4gICAgICAgIH0gZWxzZSBpZiAoW0VORCwgUEFHRV9ET1dOXS5pbmNsdWRlcyhrZXlDb2RlKSkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVTZWxlY3Rpb25PZlRpbWVDb21wb25lbnRJbklucHV0KHRoaXMudmlld1ZhbHVlLmxlbmd0aCk7XG4gICAgICAgIH0gZWxzZSBpZiAoW1VQX0FSUk9XLCBET1dOX0FSUk9XXS5pbmNsdWRlcyhrZXlDb2RlKSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy52ZXJ0aWNhbEFycm93S2V5SGFuZGxlcihrZXlDb2RlKTtcbiAgICAgICAgfSBlbHNlIGlmIChbTEVGVF9BUlJPVywgUklHSFRfQVJST1ddLmluY2x1ZGVzKGtleUNvZGUpKSB7XG4gICAgICAgICAgICB0aGlzLmhvcml6b250YWxBcnJvd0tleUhhbmRsZXIoa2V5Q29kZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoL15cXEQkLy50ZXN0KGV2ZW50LmtleSkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5nZXROZXdWYWx1ZShldmVudC5rZXksIHRoaXMuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbHVlID0gdGhpcy5yZXBsYWNlU3ltYm9scyhuZXdWYWx1ZSk7XG5cbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gZm9ybWF0dGVkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZpZXdWYWx1ZShmb3JtYXR0ZWRWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMub25JbnB1dCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5jb3JyZWN0SW5wdXQuZW1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLm9uSW5wdXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwge1xuICAgICAgICB0aGlzLnNldENvbnRyb2woY29udHJvbCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yID8gdGhpcy52YWxpZGF0b3IoY29udHJvbCkgOiBudWxsO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2UoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWxpZGF0b3JPbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IEQgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IEQpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgZm9ybWF0VXNlclBhc3RlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlLm1hdGNoKEFNX1BNX0ZPUk1BVF9SRUdFWFApKSB7IHJldHVybiB2YWx1ZTsgfVxuXG4gICAgICAgIGNvbnN0IG1hdGNoOiBSZWdFeHBNYXRjaEFycmF5IHwgbnVsbCA9IHZhbHVlLm1hdGNoKFxuICAgICAgICAgICAgL14oXFxEKyk/KD88aG91cnM+XFxkKyk/KFxcRCspPyhcXEQrKT8oPzxtaW51dGVzPlxcZCspPyhcXEQrKT8oXFxEKyk/KD88c2Vjb25kcz5cXGQrKT8oXFxEKyk/JC9cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIW1hdGNoPy5ncm91cHM/LmhvdXJzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZpZXdWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2VOdW1iZXJzKE9iamVjdC52YWx1ZXMobWF0Y2guZ3JvdXBzKVxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnNcbiAgICAgICAgICAgIC5tYXAoKGdyb3VwKSA9PiAoZ3JvdXAgfHwgJycpLnBhZFN0YXJ0KDIsICcwJykpXG4gICAgICAgICAgICAuam9pbignOicpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmb3JtYXRVc2VySW5wdXQodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2VOdW1iZXJzKHRoaXMucmVwbGFjZVN5bWJvbHModmFsdWUpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlcGxhY2VTeW1ib2xzKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBsZXQgZm9ybWF0dGVkVmFsdWU6IHN0cmluZyA9IHZhbHVlO1xuXG4gICAgICAgIGNvbnN0IG1hdGNoOiBSZWdFeHBNYXRjaEFycmF5IHwgbnVsbCA9IHZhbHVlLm1hdGNoKC9eKFxcZFxcZDopezAsMn0oPzxudW1iZXI+WzAtOV0pKD88c3ltYm9sPlxcVykoOlxcZFxcZCl7MCwyfSQvKTtcblxuICAgICAgICBpZiAobWF0Y2g/Lmdyb3Vwcykge1xuICAgICAgICAgICAgY29uc3QgeyBudW1iZXIsIHN5bWJvbCB9ID0gbWF0Y2guZ3JvdXBzO1xuXG4gICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IHZhbHVlLnJlcGxhY2UobnVtYmVyICsgc3ltYm9sLCBgMCR7bnVtYmVyfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZFZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVwbGFjZU51bWJlcnModmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGxldCBmb3JtYXR0ZWRWYWx1ZTogc3RyaW5nID0gdmFsdWU7XG5cbiAgICAgICAgY29uc3QgbWF0Y2g6IFJlZ0V4cE1hdGNoQXJyYXkgfCBudWxsID0gdmFsdWUubWF0Y2goL14oPzxob3Vycz5cXGR7MCw0fSk6Pyg/PG1pbnV0ZXM+XFxkezAsNH0pOj8oPzxzZWNvbmRzPlxcZHswLDR9KSQvKTtcblxuICAgICAgICBpZiAobWF0Y2g/Lmdyb3Vwcykge1xuICAgICAgICAgICAgY29uc3QgeyBob3VycywgbWludXRlcywgc2Vjb25kcyB9ID0gbWF0Y2guZ3JvdXBzO1xuXG4gICAgICAgICAgICBpZiAoaG91cnMubGVuZ3RoICYmIHBhcnNlSW50KGhvdXJzKSA+IEhPVVJTX1BFUl9EQVkpIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IGZvcm1hdHRlZFZhbHVlLnJlcGxhY2UoaG91cnMsIEhPVVJTX1BFUl9EQVkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtaW51dGVzLmxlbmd0aCAmJiBwYXJzZUludChtaW51dGVzKSA+IE1JTlVURVNfUEVSX0hPVVIpIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IGZvcm1hdHRlZFZhbHVlLnJlcGxhY2UobWludXRlcywgTUlOVVRFU19QRVJfSE9VUi50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNlY29uZHMubGVuZ3RoICYmIHBhcnNlSW50KHNlY29uZHMpID4gU0VDT05EU19QRVJfTUlOVVRFKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgPSBmb3JtYXR0ZWRWYWx1ZS5yZXBsYWNlKHNlY29uZHMsIFNFQ09ORFNfUEVSX01JTlVURS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWRWYWx1ZTtcbiAgICB9XG5cbiAgICAvKiogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IGlzIGludmFsaWQgYmFzZWQgb24gdGhlIG5hdGl2ZSB2YWxpZGF0aW9uLiAqL1xuICAgIHByaXZhdGUgaXNCYWRJbnB1dCgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgdmFsaWRpdHkgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS52YWxpZGl0eTtcblxuICAgICAgICByZXR1cm4gdmFsaWRpdHkgJiYgdmFsaWRpdHkuYmFkSW5wdXQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzcGFjZUtleUhhbmRsZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25TdGFydCA9PT0gdGhpcy5zZWxlY3Rpb25FbmQpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXROZXdWYWx1ZShldmVudC5rZXksIHRoaXMuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbHVlID0gdGhpcy5yZXBsYWNlU3ltYm9scyh2YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gZm9ybWF0dGVkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZpZXdWYWx1ZShmb3JtYXR0ZWRWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMub25JbnB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3Rpb25TdGFydCAhPT0gdGhpcy5zZWxlY3Rpb25FbmQpIHtcblxuICAgICAgICAgICAgbGV0IGN1cnNvclBvcyA9IHRoaXMuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyO1xuXG4gICAgICAgICAgICBjb25zdCBuZXh0RGl2aWRlclBvczogbnVtYmVyID0gdGhpcy52aWV3VmFsdWUuaW5kZXhPZignOicsIGN1cnNvclBvcyk7XG5cbiAgICAgICAgICAgIGN1cnNvclBvcyA9IG5leHREaXZpZGVyUG9zID8gbmV4dERpdmlkZXJQb3MgKyAxIDogMDtcblxuICAgICAgICAgICAgdGhpcy5jcmVhdGVTZWxlY3Rpb25PZlRpbWVDb21wb25lbnRJbklucHV0KGN1cnNvclBvcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE5ld1ZhbHVlKGtleTogc3RyaW5nLCBwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBbdGhpcy52aWV3VmFsdWUuc2xpY2UoMCwgcG9zaXRpb24pLCBrZXksIHRoaXMudmlld1ZhbHVlLnNsaWNlKHBvc2l0aW9uKV0uam9pbignJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2ZXJ0aWNhbEFycm93S2V5SGFuZGxlcihrZXlDb2RlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnZhbHVlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGxldCBjaGFuZ2VkVGltZTtcblxuICAgICAgICBjb25zdCBuZXdFZGl0UGFyYW1zID0gdGhpcy5nZXRUaW1lRWRpdE1ldHJpY3ModGhpcy5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpO1xuXG4gICAgICAgIGlmIChrZXlDb2RlID09PSBVUF9BUlJPVykge1xuICAgICAgICAgICAgY2hhbmdlZFRpbWUgPSB0aGlzLmluY3JlbWVudFRpbWUodGhpcy52YWx1ZSwgbmV3RWRpdFBhcmFtcy5tb2RpZmllZFRpbWVQYXJ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXlDb2RlID09PSBET1dOX0FSUk9XKSB7XG4gICAgICAgICAgICBjaGFuZ2VkVGltZSA9IHRoaXMuZGVjcmVtZW50VGltZSh0aGlzLnZhbHVlLCBuZXdFZGl0UGFyYW1zLm1vZGlmaWVkVGltZVBhcnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IGNoYW5nZWRUaW1lO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhcnQgPSBuZXdFZGl0UGFyYW1zLmN1cnNvclN0YXJ0UG9zaXRpb247XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uRW5kID0gbmV3RWRpdFBhcmFtcy5jdXJzb3JFbmRQb3NpdGlvbjtcblxuICAgICAgICB0aGlzLm9uQ2hhbmdlKGNoYW5nZWRUaW1lKTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaG9yaXpvbnRhbEFycm93S2V5SGFuZGxlcihrZXlDb2RlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnZhbHVlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGxldCBjdXJzb3JQb3MgPSB0aGlzLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcjtcblxuICAgICAgICBpZiAoa2V5Q29kZSA9PT0gTEVGVF9BUlJPVykge1xuICAgICAgICAgICAgY3Vyc29yUG9zID0gY3Vyc29yUG9zID09PSAwID8gdGhpcy52aWV3VmFsdWUubGVuZ3RoIDogY3Vyc29yUG9zIC0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBSSUdIVF9BUlJPVykge1xuICAgICAgICAgICAgY29uc3QgbmV4dERpdmlkZXJQb3M6IG51bWJlciA9IHRoaXMudmlld1ZhbHVlLmluZGV4T2YoJzonLCBjdXJzb3JQb3MpO1xuXG4gICAgICAgICAgICBjdXJzb3JQb3MgPSBuZXh0RGl2aWRlclBvcyA/IG5leHREaXZpZGVyUG9zICsgMSA6IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNyZWF0ZVNlbGVjdGlvbk9mVGltZUNvbXBvbmVudEluSW5wdXQoY3Vyc29yUG9zKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVNlbGVjdGlvbk9mVGltZUNvbXBvbmVudEluSW5wdXQoY3Vyc29yUG9zOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdFZGl0UGFyYW1zID0gdGhpcy5nZXRUaW1lRWRpdE1ldHJpY3MoY3Vyc29yUG9zKTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25TdGFydCA9IG5ld0VkaXRQYXJhbXMuY3Vyc29yU3RhcnRQb3NpdGlvbjtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uRW5kID0gbmV3RWRpdFBhcmFtcy5jdXJzb3JFbmRQb3NpdGlvbjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbmNyZW1lbnRUaW1lKGRhdGVWYWw6IEQsIHdoYXRUb0luY3JlbWVudDogVGltZVBhcnRzID0gVGltZVBhcnRzLnNlY29uZHMpOiBEIHtcbiAgICAgICAgbGV0IGhvdXJzID0gdGhpcy5kYXRlQWRhcHRlci5nZXRIb3VycyhkYXRlVmFsKTtcbiAgICAgICAgbGV0IG1pbnV0ZXMgPSB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbnV0ZXMoZGF0ZVZhbCk7XG4gICAgICAgIGxldCBzZWNvbmRzID0gdGhpcy5kYXRlQWRhcHRlci5nZXRTZWNvbmRzKGRhdGVWYWwpO1xuXG4gICAgICAgIHN3aXRjaCAod2hhdFRvSW5jcmVtZW50KSB7XG4gICAgICAgICAgICBjYXNlIFRpbWVQYXJ0cy5ob3VyczpcbiAgICAgICAgICAgICAgICBob3VycysrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUaW1lUGFydHMubWludXRlczpcbiAgICAgICAgICAgICAgICBtaW51dGVzKys7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFRpbWVQYXJ0cy5zZWNvbmRzOlxuICAgICAgICAgICAgICAgIHNlY29uZHMrKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2Vjb25kcyA+IFNFQ09ORFNfUEVSX01JTlVURSkgeyBzZWNvbmRzID0gMDsgfVxuXG4gICAgICAgIGlmIChtaW51dGVzID4gTUlOVVRFU19QRVJfSE9VUikgeyBtaW51dGVzID0gMDsgfVxuXG4gICAgICAgIGlmIChob3VycyA+IEhPVVJTX1BFUl9EQVkpIHsgaG91cnMgPSAwOyB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZVRpbWUoXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIodGhpcy52YWx1ZSksXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldE1vbnRoKHRoaXMudmFsdWUpLFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXREYXRlKHRoaXMudmFsdWUpLFxuICAgICAgICAgICAgaG91cnMsXG4gICAgICAgICAgICBtaW51dGVzLFxuICAgICAgICAgICAgc2Vjb25kcyxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TWlsbGlzZWNvbmRzKHRoaXMudmFsdWUpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZWNyZW1lbnRUaW1lKGRhdGVWYWw6IEQsIHdoYXRUb0RlY3JlbWVudDogVGltZVBhcnRzID0gVGltZVBhcnRzLnNlY29uZHMpOiBEIHtcbiAgICAgICAgbGV0IGhvdXJzID0gdGhpcy5kYXRlQWRhcHRlci5nZXRIb3VycyhkYXRlVmFsKTtcbiAgICAgICAgbGV0IG1pbnV0ZXMgPSB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbnV0ZXMoZGF0ZVZhbCk7XG4gICAgICAgIGxldCBzZWNvbmRzID0gdGhpcy5kYXRlQWRhcHRlci5nZXRTZWNvbmRzKGRhdGVWYWwpO1xuXG4gICAgICAgIHN3aXRjaCAod2hhdFRvRGVjcmVtZW50KSB7XG4gICAgICAgICAgICBjYXNlIFRpbWVQYXJ0cy5ob3VyczpcbiAgICAgICAgICAgICAgICBob3Vycy0tO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUaW1lUGFydHMubWludXRlczpcbiAgICAgICAgICAgICAgICBtaW51dGVzLS07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFRpbWVQYXJ0cy5zZWNvbmRzOlxuICAgICAgICAgICAgICAgIHNlY29uZHMtLTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2Vjb25kcyA8IDApIHsgc2Vjb25kcyA9IFNFQ09ORFNfUEVSX01JTlVURTsgfVxuXG4gICAgICAgIGlmIChtaW51dGVzIDwgMCkgeyBtaW51dGVzID0gTUlOVVRFU19QRVJfSE9VUjsgfVxuXG4gICAgICAgIGlmIChob3VycyA8IDApIHsgaG91cnMgPSBIT1VSU19QRVJfREFZOyB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZVRpbWUoXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIodGhpcy52YWx1ZSksXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldE1vbnRoKHRoaXMudmFsdWUpLFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXREYXRlKHRoaXMudmFsdWUpLFxuICAgICAgICAgICAgaG91cnMsXG4gICAgICAgICAgICBtaW51dGVzLFxuICAgICAgICAgICAgc2Vjb25kcyxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TWlsbGlzZWNvbmRzKHRoaXMudmFsdWUpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCBwYXJhbXMgZm9yIGFycm93LWtleXMgKHVwL2Rvd24pIHRpbWUgdmFsaWUgZWRpdC5cbiAgICAgKiBAcGFyYW0gY3Vyc29yUG9zaXRpb24gQ3VycmVudCBjdXJzb3IgcG9zaXRpb24gaW4gdGltZVN0cmluZ1xuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0VGltZUVkaXRNZXRyaWNzKGN1cnNvclBvc2l0aW9uOiBudW1iZXIpOiB7XG4gICAgICAgIG1vZGlmaWVkVGltZVBhcnQ6IFRpbWVQYXJ0cztcbiAgICAgICAgY3Vyc29yU3RhcnRQb3NpdGlvbjogbnVtYmVyO1xuICAgICAgICBjdXJzb3JFbmRQb3NpdGlvbjogbnVtYmVyO1xuICAgIH0ge1xuICAgICAgICBjb25zdCB0aW1lU3RyaW5nOiBzdHJpbmcgPSB0aGlzLnZpZXdWYWx1ZTtcbiAgICAgICAgbGV0IG1vZGlmaWVkVGltZVBhcnQ6IFRpbWVQYXJ0cztcbiAgICAgICAgbGV0IGN1cnNvclN0YXJ0UG9zaXRpb246IG51bWJlcjtcbiAgICAgICAgbGV0IGN1cnNvckVuZFBvc2l0aW9uOiBudW1iZXI7XG5cbiAgICAgICAgY29uc3QgaG91cnNJbmRleCA9IDA7XG4gICAgICAgIGNvbnN0IG1pbnV0ZXNJbmRleCA9IHRpbWVTdHJpbmcuaW5kZXhPZignOicsIGhvdXJzSW5kZXggKyAxKTtcbiAgICAgICAgY29uc3Qgc2Vjb25kc0luZGV4ID0gbWludXRlc0luZGV4ICE9PSAtMSA/IHRpbWVTdHJpbmcuaW5kZXhPZignOicsIG1pbnV0ZXNJbmRleCArIDEpIDogLTE7XG5cbiAgICAgICAgaWYgKHNlY29uZHNJbmRleCAhPT0gLTEgJiYgY3Vyc29yUG9zaXRpb24gPiBzZWNvbmRzSW5kZXgpIHtcbiAgICAgICAgICAgIG1vZGlmaWVkVGltZVBhcnQgPSBUaW1lUGFydHMuc2Vjb25kcztcbiAgICAgICAgICAgIGN1cnNvclN0YXJ0UG9zaXRpb24gPSBzZWNvbmRzSW5kZXggKyAxO1xuICAgICAgICAgICAgY3Vyc29yRW5kUG9zaXRpb24gPSB0aW1lU3RyaW5nLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIGlmIChtaW51dGVzSW5kZXggIT09IC0xICYmIGN1cnNvclBvc2l0aW9uID4gbWludXRlc0luZGV4KSB7XG4gICAgICAgICAgICBtb2RpZmllZFRpbWVQYXJ0ID0gVGltZVBhcnRzLm1pbnV0ZXM7XG4gICAgICAgICAgICBjdXJzb3JTdGFydFBvc2l0aW9uID0gbWludXRlc0luZGV4ICsgMTtcbiAgICAgICAgICAgIGN1cnNvckVuZFBvc2l0aW9uID0gc2Vjb25kc0luZGV4ID4gLTEgPyBzZWNvbmRzSW5kZXggOiB0aW1lU3RyaW5nLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZGlmaWVkVGltZVBhcnQgPSBUaW1lUGFydHMuaG91cnM7XG4gICAgICAgICAgICBjdXJzb3JTdGFydFBvc2l0aW9uID0gaG91cnNJbmRleDtcbiAgICAgICAgICAgIGN1cnNvckVuZFBvc2l0aW9uID0gbWludXRlc0luZGV4ICE9PSAtMSA/IG1pbnV0ZXNJbmRleCA6IHRpbWVTdHJpbmcubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgbW9kaWZpZWRUaW1lUGFydCwgY3Vyc29yU3RhcnRQb3NpdGlvbiwgY3Vyc29yRW5kUG9zaXRpb24gfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gQ3JlYXRlIHRpbWUgc3RyaW5nIGZvciBkaXNwbGF5aW5nIGluc2lkZSBpbnB1dCBlbGVtZW50IG9mIFVJXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRUaW1lU3RyaW5nRnJvbURhdGUodmFsdWU6IEQgfCBudWxsLCB0aW1lRm9ybWF0OiBUaW1lRm9ybWF0cyk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdmFsdWUgfHwgIXRoaXMuZGF0ZUFkYXB0ZXIuaXNWYWxpZCh2YWx1ZSkpIHsgcmV0dXJuICcnOyB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUFkYXB0ZXIuZm9ybWF0KHZhbHVlLCB0aW1lRm9ybWF0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERhdGVGcm9tVGltZVN0cmluZyh0aW1lU3RyaW5nOiBzdHJpbmcpOiBEIHwgbnVsbCB7XG4gICAgICAgIGlmICghdGltZVN0cmluZykgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgIGNvbnN0IEhNUyA9IHRpbWVTdHJpbmcubWF0Y2goSE9VUlNfTUlOVVRFU19TRUNPTkRTX1JFR0VYUCk7XG4gICAgICAgIGNvbnN0IEhNID0gdGltZVN0cmluZy5tYXRjaChIT1VSU19NSU5VVEVTX1JFR0VYUCk7XG4gICAgICAgIGNvbnN0IEggPSB0aW1lU3RyaW5nLm1hdGNoKEhPVVJTX09OTFlfUkVHRVhQKTtcbiAgICAgICAgY29uc3QgYW1QbSA9IHRpbWVTdHJpbmcubWF0Y2goQU1fUE1fRk9STUFUX1JFR0VYUCk7XG5cbiAgICAgICAgbGV0IGhvdXJzOiBudW1iZXIgPSAwO1xuICAgICAgICBsZXQgbWludXRlczogbnVtYmVyID0gMDtcbiAgICAgICAgbGV0IHNlY29uZHM6IG51bWJlciA9IDA7XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGU6bm8tbWFnaWMtbnVtYmVyc1xuICAgICAgICBpZiAoYW1QbSkge1xuICAgICAgICAgICAgaG91cnMgPSBOdW1iZXIoYW1QbVsxXSk7XG4gICAgICAgICAgICBtaW51dGVzID0gTnVtYmVyKGFtUG1bMl0pO1xuXG4gICAgICAgICAgICBpZiAoL1twXS9pLnRlc3QoYW1QbVszXSkgfHwgKC9bYV0vaS50ZXN0KGFtUG1bM10pICYmIGhvdXJzID09PSAxMikpIHtcbiAgICAgICAgICAgICAgICBob3VycyArPSAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChITVMpIHtcbiAgICAgICAgICAgIGhvdXJzID0gTnVtYmVyKEhNU1sxXSk7XG4gICAgICAgICAgICBtaW51dGVzID0gTnVtYmVyKEhNU1syXSk7XG4gICAgICAgICAgICBzZWNvbmRzID0gTnVtYmVyKEhNU1szXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoSE0pIHtcbiAgICAgICAgICAgIGhvdXJzID0gTnVtYmVyKEhNWzFdKTtcbiAgICAgICAgICAgIG1pbnV0ZXMgPSBOdW1iZXIoSE1bMl0pO1xuICAgICAgICB9IGVsc2UgaWYgKEgpIHtcbiAgICAgICAgICAgIGhvdXJzID0gTnVtYmVyKEhbMV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdHNsaW50OmVuYWJsZVxuICAgICAgICBjb25zdCBkYXRlID0gdGhpcy52YWx1ZSB8fCB0aGlzLmRhdGVBZGFwdGVyLnRvZGF5KCk7XG5cbiAgICAgICAgY29uc3QgcmVzdWx0RGF0ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZVRpbWUoXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIoZGF0ZSksXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldE1vbnRoKGRhdGUpLFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXREYXRlKGRhdGUpLFxuICAgICAgICAgICAgaG91cnMsXG4gICAgICAgICAgICBtaW51dGVzIHx8IDAsXG4gICAgICAgICAgICBzZWNvbmRzIHx8IDAsXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbGxpc2Vjb25kcyhkYXRlKVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbChyZXN1bHREYXRlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlVmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9ICgpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvY3VzZWQgfHxcbiAgICAgICAgICAgIHRoaXMuZW1wdHkgfHxcbiAgICAgICAgICAgIHRoaXMubGFzdFZhbHVlVmFsaWQgPyBudWxsIDogeyBtY1RpbWVwaWNrZXJQYXJzZTogeyB0ZXh0OiB0aGlzLnZpZXdWYWx1ZSB9IH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtaW5WYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgICAgY29uc3QgY29udHJvbFZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlKSk7XG5cbiAgICAgICAgcmV0dXJuICghdGhpcy5taW4gfHwgIWNvbnRyb2xWYWx1ZSB8fCB0aGlzLmNvbXBhcmVUaW1lKHRoaXMubWluLCBjb250cm9sVmFsdWUpIDw9IDApID9cbiAgICAgICAgICAgIG51bGwgOlxuICAgICAgICAgICAgeyBtY1RpbWVwaWNrZXJMb3dlclRoZW5NaW46IHsgbWluOiB0aGlzLm1pbiwgYWN0dWFsOiBjb250cm9sVmFsdWUgfSB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgbWF4VmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZSkpO1xuXG4gICAgICAgIHJldHVybiAoIXRoaXMubWF4IHx8ICFjb250cm9sVmFsdWUgfHwgdGhpcy5jb21wYXJlVGltZSh0aGlzLm1heCwgY29udHJvbFZhbHVlKSA+PSAwKSA/XG4gICAgICAgICAgICBudWxsIDpcbiAgICAgICAgICAgIHsgbWNUaW1lcGlja2VySGlnaGVyVGhlbk1heDogeyBtYXg6IHRoaXMubWF4LCBhY3R1YWw6IGNvbnRyb2xWYWx1ZSB9IH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb21wYXJlVGltZShmaXJzdDogRCwgc2Vjb25kOiBEKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kYXRlQWRhcHRlci5nZXRIb3VycyhmaXJzdCkgLSB0aGlzLmRhdGVBZGFwdGVyLmdldEhvdXJzKHNlY29uZCkgfHxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TWludXRlcyhmaXJzdCkgLSB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbnV0ZXMoc2Vjb25kKTtcblxuICAgICAgICBpZiAoVGltZUZvcm1hdHMuSEhtbSA9PT0gdGhpcy5mb3JtYXQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSBpZiAoVGltZUZvcm1hdHMuSEhtbXNzID09PSB0aGlzLmZvcm1hdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCB8fCB0aGlzLmRhdGVBZGFwdGVyLmdldFNlY29uZHMoZmlyc3QpIC0gdGhpcy5kYXRlQWRhcHRlci5nZXRTZWNvbmRzKHNlY29uZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgVW5rbm93biBmb3JtYXQ6ICR7dGhpcy5mb3JtYXR9YCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFZhbGlkRGF0ZU9yTnVsbChvYmo6IGFueSk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmRhdGVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiYgdGhpcy5kYXRlQWRhcHRlci5pc1ZhbGlkKG9iaikpID8gb2JqIDogbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFZpZXdWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVZpZXcoKSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbHVlID0gdGhpcy5nZXRUaW1lU3RyaW5nRnJvbURhdGUodGhpcy52YWx1ZSwgdGhpcy5mb3JtYXQpO1xuXG4gICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKGZvcm1hdHRlZFZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldENvbnRyb2woY29udHJvbDogQWJzdHJhY3RDb250cm9sKSB7XG4gICAgICAgIGlmICghdGhpcy5jb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wgPSBjb250cm9sO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5XG4gICAgcHJpdmF0ZSB2YWxpZGF0b3JPbkNoYW5nZSA9ICgpID0+IHt9O1xufVxuIl19