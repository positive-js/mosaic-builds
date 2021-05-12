import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, EventEmitter, forwardRef, Input, Optional, Output, Renderer2 } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { DateAdapter } from '@ptsecurity/cdk/datetime';
import { DOWN_ARROW, UP_ARROW, HOME, END, LEFT_ARROW, RIGHT_ARROW, PAGE_DOWN, PAGE_UP, SPACE, DELETE, BACKSPACE, hasModifierKey, isLetterKey, isVerticalMovement, isHorizontalMovement } from '@ptsecurity/cdk/keycodes';
import { validationTooltipHideDelay, validationTooltipShowDelay } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { McTooltip } from '@ptsecurity/mosaic/tooltip';
import { noop, Subject } from 'rxjs';
import { DEFAULT_TIME_FORMAT, HOURS_PER_DAY, HOURS_MINUTES_REGEXP, HOURS_MINUTES_SECONDS_REGEXP, HOURS_ONLY_REGEXP, MINUTES_PER_HOUR, SECONDS_PER_MINUTE, TIMEFORMAT_PLACEHOLDERS, TimeFormats, TimeParts, AM_PM_FORMAT_REGEXP } from './timepicker.constants';
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
    constructor(elementRef, dateAdapter, renderer) {
        this.elementRef = elementRef;
        this.dateAdapter = dateAdapter;
        this.renderer = renderer;
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
        this._format = DEFAULT_TIME_FORMAT;
        this._min = null;
        this._max = null;
        this.incorrectInput = new EventEmitter();
        this.uid = `mc-timepicker-${uniqueComponentIdSuffix++}`;
        this.lastValueValid = false;
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
        this.placeholder = TIMEFORMAT_PLACEHOLDERS[DEFAULT_TIME_FORMAT];
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
        this.placeholder = TIMEFORMAT_PLACEHOLDERS[this._format];
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
        tooltip.mcMouseEnterDelay = validationTooltipShowDelay;
        tooltip.mcTrigger = 'manual';
        tooltip.mcTooltipClass = 'mc-tooltip_warning';
        tooltip.initElementRefListeners();
        this.incorrectInput.subscribe(() => {
            if (tooltip.isTooltipOpen) {
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
        const hoursAndMinutesAndSeconds = timeString.match(HOURS_MINUTES_SECONDS_REGEXP);
        const hoursAndMinutes = timeString.match(HOURS_MINUTES_REGEXP);
        const hoursOnly = timeString.match(HOURS_ONLY_REGEXP);
        const hoursAndMinutesInAmPm = timeString.match(AM_PM_FORMAT_REGEXP);
        let hours = 0;
        let minutes = 0;
        let seconds = 0;
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
        const resultDate = this.dateAdapter.createDateTime(this.dateAdapter.getYear(this.value), this.dateAdapter.getMonth(this.value), this.dateAdapter.getDate(this.value), hours, minutes, seconds, this.dateAdapter.getMilliseconds(this.value));
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
McTimepicker.decorators = [
    { type: Directive, args: [{
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
            },] }
];
/** @nocollapse */
McTimepicker.ctorParameters = () => [
    { type: ElementRef },
    { type: DateAdapter, decorators: [{ type: Optional }] },
    { type: Renderer2 }
];
McTimepicker.propDecorators = {
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    id: [{ type: Input }],
    required: [{ type: Input }],
    format: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    value: [{ type: Input }],
    mcValidationTooltip: [{ type: Input }],
    incorrectInput: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdGltZXBpY2tlci90aW1lcGlja2VyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0gsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBR0gsYUFBYSxFQUNiLGlCQUFpQixFQUlqQixVQUFVLEVBQ2IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUNILFVBQVUsRUFDVixRQUFRLEVBQ1IsSUFBSSxFQUNKLEdBQUcsRUFDSCxVQUFVLEVBQ1YsV0FBVyxFQUNYLFNBQVMsRUFDVCxPQUFPLEVBQ1AsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsY0FBYyxFQUNkLFdBQVcsRUFDWCxrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3ZCLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUFFLDBCQUEwQixFQUFFLDBCQUEwQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXJDLE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLG9CQUFvQixFQUNwQiw0QkFBNEIsRUFDNUIsaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNo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cGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQWJzdHJhY3RDb250cm9sLFxuICAgIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIE5HX1ZBTElEQVRPUlMsXG4gICAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgVmFsaWRhdGlvbkVycm9ycyxcbiAgICBWYWxpZGF0b3IsXG4gICAgVmFsaWRhdG9yRm4sXG4gICAgVmFsaWRhdG9yc1xufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9kYXRldGltZSc7XG5pbXBvcnQge1xuICAgIERPV05fQVJST1csXG4gICAgVVBfQVJST1csXG4gICAgSE9NRSxcbiAgICBFTkQsXG4gICAgTEVGVF9BUlJPVyxcbiAgICBSSUdIVF9BUlJPVyxcbiAgICBQQUdFX0RPV04sXG4gICAgUEFHRV9VUCxcbiAgICBTUEFDRSxcbiAgICBERUxFVEUsXG4gICAgQkFDS1NQQUNFLFxuICAgIGhhc01vZGlmaWVyS2V5LFxuICAgIGlzTGV0dGVyS2V5LFxuICAgIGlzVmVydGljYWxNb3ZlbWVudCxcbiAgICBpc0hvcml6b250YWxNb3ZlbWVudFxufSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgdmFsaWRhdGlvblRvb2x0aXBIaWRlRGVsYXksIHZhbGlkYXRpb25Ub29sdGlwU2hvd0RlbGF5IH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNGb3JtRmllbGRDb250cm9sIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgTWNUb29sdGlwIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL3Rvb2x0aXAnO1xuaW1wb3J0IHsgbm9vcCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1xuICAgIERFRkFVTFRfVElNRV9GT1JNQVQsXG4gICAgSE9VUlNfUEVSX0RBWSxcbiAgICBIT1VSU19NSU5VVEVTX1JFR0VYUCxcbiAgICBIT1VSU19NSU5VVEVTX1NFQ09ORFNfUkVHRVhQLFxuICAgIEhPVVJTX09OTFlfUkVHRVhQLFxuICAgIE1JTlVURVNfUEVSX0hPVVIsXG4gICAgU0VDT05EU19QRVJfTUlOVVRFLFxuICAgIFRJTUVGT1JNQVRfUExBQ0VIT0xERVJTLFxuICAgIFRpbWVGb3JtYXRzLFxuICAgIFRpbWVQYXJ0cyxcbiAgICBBTV9QTV9GT1JNQVRfUkVHRVhQXG59IGZyb20gJy4vdGltZXBpY2tlci5jb25zdGFudHMnO1xuXG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUNfVElNRVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1jVGltZXBpY2tlciksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUNfVElNRVBJQ0tFUl9WQUxJREFUT1JTOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNY1RpbWVwaWNrZXIpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5cbmxldCB1bmlxdWVDb21wb25lbnRJZFN1ZmZpeDogbnVtYmVyID0gMDtcblxuY29uc3Qgc2hvcnRGb3JtYXRTaXplOiBudW1iZXIgPSA1O1xuY29uc3QgZnVsbEZvcm1hdFNpemU6IG51bWJlciA9IDg7XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdpbnB1dFttY1RpbWVwaWNrZXJdJyxcbiAgICBleHBvcnRBczogJ21jVGltZXBpY2tlcicsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWlucHV0IG1jLXRpbWVwaWNrZXInLFxuICAgICAgICAvLyBOYXRpdmUgaW5wdXQgcHJvcGVydGllcyB0aGF0IGFyZSBvdmVyd3JpdHRlbiBieSBBbmd1bGFyIGlucHV0cyBuZWVkIHRvIGJlIHN5bmNlZCB3aXRoXG4gICAgICAgIC8vIHRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudC4gT3RoZXJ3aXNlIHByb3BlcnR5IGJpbmRpbmdzIGZvciB0aG9zZSBkb24ndCB3b3JrLlxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAgICAgJ1thdHRyLnBsYWNlaG9sZGVyXSc6ICdwbGFjZWhvbGRlcicsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgICAgICdbYXR0ci5yZXF1aXJlZF0nOiAncmVxdWlyZWQnLFxuICAgICAgICAnW2F0dHIuc2l6ZV0nOiAnZ2V0U2l6ZSgpJyxcbiAgICAgICAgJ1thdHRyLmF1dG9jb21wbGV0ZV0nOiAnXCJvZmZcIicsXG5cbiAgICAgICAgJyhibHVyKSc6ICdvbkJsdXIoKScsXG4gICAgICAgICcoZm9jdXMpJzogJ2ZvY3VzQ2hhbmdlZCh0cnVlKScsXG5cbiAgICAgICAgJyhwYXN0ZSknOiAnb25QYXN0ZSgkZXZlbnQpJyxcblxuICAgICAgICAnKGtleWRvd24pJzogJ29uS2V5RG93bigkZXZlbnQpJ1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE1DX1RJTUVQSUNLRVJfVkFMSURBVE9SUyxcbiAgICAgICAgTUNfVElNRVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgeyBwcm92aWRlOiBNY0Zvcm1GaWVsZENvbnRyb2wsIHVzZUV4aXN0aW5nOiBNY1RpbWVwaWNrZXIgfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNUaW1lcGlja2VyPEQ+IGltcGxlbWVudHMgTWNGb3JtRmllbGRDb250cm9sPEQ+LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yLCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICByZWFkb25seSBzdGF0ZUNoYW5nZXM6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgcmVhZG9ubHkgZXJyb3JTdGF0ZTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgY29udHJvbFR5cGU6IHN0cmluZyA9ICd0aW1lcGlja2VyJztcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIC8vIEJyb3dzZXJzIG1heSBub3QgZmlyZSB0aGUgYmx1ciBldmVudCBpZiB0aGUgaW5wdXQgaXMgZGlzYWJsZWQgdG9vIHF1aWNrbHkuXG4gICAgICAgIC8vIFJlc2V0IGZyb20gaGVyZSB0byBlbnN1cmUgdGhhdCB0aGUgZWxlbWVudCBkb2Vzbid0IGJlY29tZSBzdHVjay5cbiAgICAgICAgaWYgKHRoaXMuZm9jdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBpZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfVxuXG4gICAgc2V0IGlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faWQgPSB2YWx1ZSB8fCB0aGlzLnVpZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pZDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7XG4gICAgfVxuXG4gICAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXF1aXJlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGZvcm1hdCgpOiBUaW1lRm9ybWF0cyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mb3JtYXQ7XG4gICAgfVxuXG4gICAgc2V0IGZvcm1hdChmb3JtYXRWYWx1ZTogVGltZUZvcm1hdHMpIHtcbiAgICAgICAgdGhpcy5fZm9ybWF0ID0gT2JqZWN0XG4gICAgICAgICAgICAua2V5cyhUaW1lRm9ybWF0cylcbiAgICAgICAgICAgIC5tYXAoKHRpbWVGb3JtYXRLZXkpID0+IFRpbWVGb3JtYXRzW3RpbWVGb3JtYXRLZXldKVxuICAgICAgICAgICAgLmluZGV4T2YoZm9ybWF0VmFsdWUpID4gLTEgPyBmb3JtYXRWYWx1ZSA6IERFRkFVTFRfVElNRV9GT1JNQVQ7XG5cbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IFRJTUVGT1JNQVRfUExBQ0VIT0xERVJTW3RoaXMuX2Zvcm1hdF07XG5cbiAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZm9ybWF0OiBUaW1lRm9ybWF0cyA9IERFRkFVTFRfVElNRV9GT1JNQVQ7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtaW4oKTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWluO1xuICAgIH1cblxuICAgIHNldCBtaW4odmFsdWU6IEQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX21pbiA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcbiAgICAgICAgdGhpcy52YWxpZGF0b3JPbkNoYW5nZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21pbjogRCB8IG51bGwgPSBudWxsO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWF4KCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heDtcbiAgICB9XG5cbiAgICBzZXQgbWF4KHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9tYXggPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tYXg6IEQgfCBudWxsID0gbnVsbDtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHZhbHVlKCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcblxuICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gIW5ld1ZhbHVlIHx8IHRoaXMuZGF0ZUFkYXB0ZXIuaXNWYWxpZChuZXdWYWx1ZSk7XG5cbiAgICAgICAgdGhpcy5fdmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbChuZXdWYWx1ZSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdmFsdWU6IEQgfCBudWxsO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgbWNWYWxpZGF0aW9uVG9vbHRpcCh0b29sdGlwOiBNY1Rvb2x0aXApIHtcbiAgICAgICAgaWYgKCF0b29sdGlwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRvb2x0aXAubWNNb3VzZUVudGVyRGVsYXkgPSB2YWxpZGF0aW9uVG9vbHRpcFNob3dEZWxheTtcbiAgICAgICAgdG9vbHRpcC5tY1RyaWdnZXIgPSAnbWFudWFsJztcbiAgICAgICAgdG9vbHRpcC5tY1Rvb2x0aXBDbGFzcyA9ICdtYy10b29sdGlwX3dhcm5pbmcnO1xuXG4gICAgICAgIHRvb2x0aXAuaW5pdEVsZW1lbnRSZWZMaXN0ZW5lcnMoKTtcblxuICAgICAgICB0aGlzLmluY29ycmVjdElucHV0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodG9vbHRpcC5pc1Rvb2x0aXBPcGVuKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICB0b29sdGlwLnNob3coKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0b29sdGlwLmhpZGUoKSwgdmFsaWRhdGlvblRvb2x0aXBIaWRlRGVsYXkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBAT3V0cHV0KCkgaW5jb3JyZWN0SW5wdXQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICBnZXQgaGFzU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25TdGFydCAhPT0gdGhpcy5zZWxlY3Rpb25FbmQ7XG4gICAgfVxuXG4gICAgZ2V0IGlzRnVsbEZvcm1hdCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0ID09PSBUaW1lRm9ybWF0cy5ISG1tc3M7XG4gICAgfVxuXG4gICAgZ2V0IGlzU2hvcnRGb3JtYXQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdCA9PT0gVGltZUZvcm1hdHMuSEhtbTtcbiAgICB9XG5cbiAgICBnZXQgdmlld1ZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgbmdDb250cm9sKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2w7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldCBlbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnZpZXdWYWx1ZSAmJiAhdGhpcy5pc0JhZElucHV0KCk7XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGlvblN0YXJ0KCk6IG51bWJlciB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGlvblN0YXJ0KHZhbHVlOiBudW1iZXIgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGlvbkVuZCgpOiBudW1iZXIgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZDtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0aW9uRW5kKHZhbHVlOiBudW1iZXIgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVhZG9ubHkgdWlkID0gYG1jLXRpbWVwaWNrZXItJHt1bmlxdWVDb21wb25lbnRJZFN1ZmZpeCsrfWA7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IHZhbGlkYXRvcjogVmFsaWRhdG9yRm4gfCBudWxsO1xuXG4gICAgcHJpdmF0ZSBsYXN0VmFsdWVWYWxpZCA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBjb250cm9sOiBBYnN0cmFjdENvbnRyb2w7XG5cbiAgICBwcml2YXRlIG9uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZDtcbiAgICBwcml2YXRlIG9uVG91Y2hlZDogKCkgPT4gdm9pZDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPGFueT4sXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICAgICkge1xuICAgICAgICBpZiAoIXRoaXMuZGF0ZUFkYXB0ZXIpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBNY1RpbWVwaWNrZXI6IE5vIHByb3ZpZGVyIGZvdW5kIGZvciBEYXRlQWRhcHRlci4gWW91IG11c3QgaW1wb3J0IG9uZSBvZiB0aGUgZXhpc3RpbmcgYCArXG4gICAgICAgICAgICAgICAgYG1vZHVsZXMgYXQgeW91ciBhcHBsaWNhdGlvbiByb290IG9yIHByb3ZpZGUgYSBjdXN0b20gaW1wbGVtZW50YXRpb24gb3IgdXNlIGV4aXN0cyBvbmVzLmApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBWYWxpZGF0b3JzLmNvbXBvc2UoW3RoaXMucGFyc2VWYWxpZGF0b3IsIHRoaXMubWluVmFsaWRhdG9yLCB0aGlzLm1heFZhbGlkYXRvcl0pO1xuXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBub29wO1xuXG4gICAgICAgIC8vIEZvcmNlIHNldHRlciB0byBiZSBjYWxsZWQgaW4gY2FzZSBpZCB3YXMgbm90IHNwZWNpZmllZC5cbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuaWQ7XG5cbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IFRJTUVGT1JNQVRfUExBQ0VIT0xERVJTW0RFRkFVTFRfVElNRV9GT1JNQVRdO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIGdldFNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNGdWxsRm9ybWF0ID8gZnVsbEZvcm1hdFNpemUgOiBzaG9ydEZvcm1hdFNpemU7XG4gICAgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZm9jdXNDaGFuZ2VkKGlzRm9jdXNlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoaXNGb2N1c2VkICE9PSB0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IGlzRm9jdXNlZDtcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkJsdXIoKSB7XG4gICAgICAgIHRoaXMuZm9jdXNDaGFuZ2VkKGZhbHNlKTtcblxuICAgICAgICB0aGlzLm9uSW5wdXQoKTtcbiAgICB9XG5cbiAgICBvblBhc3RlKCRldmVudCkge1xuICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZm9ybWF0VXNlclBhc3RlKCRldmVudC5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQnKSk7XG5cbiAgICAgICAgY29uc3QgbmV3VGltZU9iaiA9IHRoaXMuZ2V0RGF0ZUZyb21UaW1lU3RyaW5nKHZhbHVlKTtcblxuICAgICAgICBpZiAoIW5ld1RpbWVPYmopIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5zZXRWaWV3VmFsdWUodGhpcy5nZXRUaW1lU3RyaW5nRnJvbURhdGUobmV3VGltZU9iaiwgdGhpcy5mb3JtYXQpKTtcblxuICAgICAgICB0aGlzLnZhbHVlID0gbmV3VGltZU9iajtcbiAgICAgICAgdGhpcy5vbkNoYW5nZShuZXdUaW1lT2JqKTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIG9uSW5wdXQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbHVlID0gdGhpcy5mb3JtYXRVc2VySW5wdXQodGhpcy52aWV3VmFsdWUpO1xuXG4gICAgICAgIGNvbnN0IG5ld1RpbWVPYmogPSB0aGlzLmdldERhdGVGcm9tVGltZVN0cmluZyhmb3JtYXR0ZWRWYWx1ZSk7XG4gICAgICAgIHRoaXMubGFzdFZhbHVlVmFsaWQgPSAhIW5ld1RpbWVPYmo7XG5cbiAgICAgICAgaWYgKCFuZXdUaW1lT2JqKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKG51bGwpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWxlY3Rpb25TdGFydCA9IHRoaXMuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbkVuZCA9IHRoaXMuc2VsZWN0aW9uRW5kO1xuXG4gICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKHRoaXMuZ2V0VGltZVN0cmluZ0Zyb21EYXRlKG5ld1RpbWVPYmosIHRoaXMuZm9ybWF0KSk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0O1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZDtcblxuICAgICAgICB0aGlzLmNyZWF0ZVNlbGVjdGlvbk9mVGltZUNvbXBvbmVudEluSW5wdXQoKHNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgKyAxKTtcblxuICAgICAgICB0aGlzLnZhbHVlID0gbmV3VGltZU9iajtcbiAgICAgICAgdGhpcy5vbkNoYW5nZShuZXdUaW1lT2JqKTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBvbkNvbnRhaW5lckNsaWNrKCkge1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG5cbiAgICAgICAgaWYgKGlzTGV0dGVyS2V5KGV2ZW50KSAmJiAhZXZlbnQuY3RybEtleSAmJiAhZXZlbnQubWV0YUtleSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5pbmNvcnJlY3RJbnB1dC5lbWl0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAoaGFzTW9kaWZpZXJLZXkoZXZlbnQpICYmIChpc1ZlcnRpY2FsTW92ZW1lbnQoa2V5Q29kZSkgfHwgaXNIb3Jpem9udGFsTW92ZW1lbnQoa2V5Q29kZSkpKSB8fFxuICAgICAgICAgICAgZXZlbnQuY3RybEtleSB8fCBldmVudC5tZXRhS2V5IHx8XG4gICAgICAgICAgICBbREVMRVRFLCBCQUNLU1BBQ0VdLmluY2x1ZGVzKGtleUNvZGUpXG4gICAgICAgICkge1xuICAgICAgICAgICAgbm9vcCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFNQQUNFKSB7XG4gICAgICAgICAgICB0aGlzLnNwYWNlS2V5SGFuZGxlcihldmVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoW0hPTUUsIFBBR0VfVVBdLmluY2x1ZGVzKGtleUNvZGUpKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVNlbGVjdGlvbk9mVGltZUNvbXBvbmVudEluSW5wdXQoMCk7XG4gICAgICAgIH0gZWxzZSBpZiAoW0VORCwgUEFHRV9ET1dOXS5pbmNsdWRlcyhrZXlDb2RlKSkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVTZWxlY3Rpb25PZlRpbWVDb21wb25lbnRJbklucHV0KHRoaXMudmlld1ZhbHVlLmxlbmd0aCk7XG4gICAgICAgIH0gZWxzZSBpZiAoW1VQX0FSUk9XLCBET1dOX0FSUk9XXS5pbmNsdWRlcyhrZXlDb2RlKSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy52ZXJ0aWNhbEFycm93S2V5SGFuZGxlcihrZXlDb2RlKTtcbiAgICAgICAgfSBlbHNlIGlmIChbTEVGVF9BUlJPVywgUklHSFRfQVJST1ddLmluY2x1ZGVzKGtleUNvZGUpKSB7XG4gICAgICAgICAgICB0aGlzLmhvcml6b250YWxBcnJvd0tleUhhbmRsZXIoa2V5Q29kZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoL15cXEQkLy50ZXN0KGV2ZW50LmtleSkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5nZXROZXdWYWx1ZShldmVudC5rZXksIHRoaXMuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbHVlID0gdGhpcy5yZXBsYWNlU3ltYm9scyhuZXdWYWx1ZSk7XG5cbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gZm9ybWF0dGVkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZpZXdWYWx1ZShmb3JtYXR0ZWRWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMub25JbnB1dCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5jb3JyZWN0SW5wdXQuZW1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLm9uSW5wdXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwge1xuICAgICAgICB0aGlzLnNldENvbnRyb2woY29udHJvbCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yID8gdGhpcy52YWxpZGF0b3IoY29udHJvbCkgOiBudWxsO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2UoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWxpZGF0b3JPbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IEQgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IEQpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgZm9ybWF0VXNlclBhc3RlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlLm1hdGNoKEFNX1BNX0ZPUk1BVF9SRUdFWFApKSB7IHJldHVybiB2YWx1ZTsgfVxuXG4gICAgICAgIGNvbnN0IG1hdGNoOiBSZWdFeHBNYXRjaEFycmF5IHwgbnVsbCA9IHZhbHVlLm1hdGNoKFxuICAgICAgICAgICAgL14oXFxEKyk/KD88aG91cnM+XFxkKyk/KFxcRCspPyhcXEQrKT8oPzxtaW51dGVzPlxcZCspPyhcXEQrKT8oXFxEKyk/KD88c2Vjb25kcz5cXGQrKT8oXFxEKyk/JC9cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIW1hdGNoPy5ncm91cHM/LmhvdXJzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZpZXdWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2VOdW1iZXJzKE9iamVjdC52YWx1ZXMobWF0Y2guZ3JvdXBzKVxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnNcbiAgICAgICAgICAgIC5tYXAoKGdyb3VwKSA9PiAoZ3JvdXAgfHwgJycpLnBhZFN0YXJ0KDIsICcwJykpXG4gICAgICAgICAgICAuam9pbignOicpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmb3JtYXRVc2VySW5wdXQodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2VOdW1iZXJzKHRoaXMucmVwbGFjZVN5bWJvbHModmFsdWUpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlcGxhY2VTeW1ib2xzKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBsZXQgZm9ybWF0dGVkVmFsdWU6IHN0cmluZyA9IHZhbHVlO1xuXG4gICAgICAgIGNvbnN0IG1hdGNoOiBSZWdFeHBNYXRjaEFycmF5IHwgbnVsbCA9IHZhbHVlLm1hdGNoKC9eKFxcZFxcZDopezAsMn0oPzxudW1iZXI+WzAtOV0pKD88c3ltYm9sPlxcVykoOlxcZFxcZCl7MCwyfSQvKTtcblxuICAgICAgICBpZiAobWF0Y2g/Lmdyb3Vwcykge1xuICAgICAgICAgICAgY29uc3QgeyBudW1iZXIsIHN5bWJvbCB9ID0gbWF0Y2guZ3JvdXBzO1xuXG4gICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IHZhbHVlLnJlcGxhY2UobnVtYmVyICsgc3ltYm9sLCBgMCR7bnVtYmVyfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZFZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVwbGFjZU51bWJlcnModmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGxldCBmb3JtYXR0ZWRWYWx1ZTogc3RyaW5nID0gdmFsdWU7XG5cbiAgICAgICAgY29uc3QgbWF0Y2g6IFJlZ0V4cE1hdGNoQXJyYXkgfCBudWxsID0gdmFsdWUubWF0Y2goL14oPzxob3Vycz5cXGR7MCw0fSk6Pyg/PG1pbnV0ZXM+XFxkezAsNH0pOj8oPzxzZWNvbmRzPlxcZHswLDR9KSQvKTtcblxuICAgICAgICBpZiAobWF0Y2g/Lmdyb3Vwcykge1xuICAgICAgICAgICAgY29uc3QgeyBob3VycywgbWludXRlcywgc2Vjb25kcyB9ID0gbWF0Y2guZ3JvdXBzO1xuXG4gICAgICAgICAgICBpZiAoaG91cnMubGVuZ3RoICYmIHBhcnNlSW50KGhvdXJzKSA+IEhPVVJTX1BFUl9EQVkpIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IGZvcm1hdHRlZFZhbHVlLnJlcGxhY2UoaG91cnMsIEhPVVJTX1BFUl9EQVkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtaW51dGVzLmxlbmd0aCAmJiBwYXJzZUludChtaW51dGVzKSA+IE1JTlVURVNfUEVSX0hPVVIpIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IGZvcm1hdHRlZFZhbHVlLnJlcGxhY2UobWludXRlcywgTUlOVVRFU19QRVJfSE9VUi50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNlY29uZHMubGVuZ3RoICYmIHBhcnNlSW50KHNlY29uZHMpID4gU0VDT05EU19QRVJfTUlOVVRFKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgPSBmb3JtYXR0ZWRWYWx1ZS5yZXBsYWNlKHNlY29uZHMsIFNFQ09ORFNfUEVSX01JTlVURS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWRWYWx1ZTtcbiAgICB9XG5cbiAgICAvKiogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IGlzIGludmFsaWQgYmFzZWQgb24gdGhlIG5hdGl2ZSB2YWxpZGF0aW9uLiAqL1xuICAgIHByaXZhdGUgaXNCYWRJbnB1dCgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgdmFsaWRpdHkgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS52YWxpZGl0eTtcblxuICAgICAgICByZXR1cm4gdmFsaWRpdHkgJiYgdmFsaWRpdHkuYmFkSW5wdXQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzcGFjZUtleUhhbmRsZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25TdGFydCA9PT0gdGhpcy5zZWxlY3Rpb25FbmQpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXROZXdWYWx1ZShldmVudC5rZXksIHRoaXMuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbHVlID0gdGhpcy5yZXBsYWNlU3ltYm9scyh2YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gZm9ybWF0dGVkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZpZXdWYWx1ZShmb3JtYXR0ZWRWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMub25JbnB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3Rpb25TdGFydCAhPT0gdGhpcy5zZWxlY3Rpb25FbmQpIHtcblxuICAgICAgICAgICAgbGV0IGN1cnNvclBvcyA9IHRoaXMuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyO1xuXG4gICAgICAgICAgICBjb25zdCBuZXh0RGl2aWRlclBvczogbnVtYmVyID0gdGhpcy52aWV3VmFsdWUuaW5kZXhPZignOicsIGN1cnNvclBvcyk7XG5cbiAgICAgICAgICAgIGN1cnNvclBvcyA9IG5leHREaXZpZGVyUG9zID8gbmV4dERpdmlkZXJQb3MgKyAxIDogMDtcblxuICAgICAgICAgICAgdGhpcy5jcmVhdGVTZWxlY3Rpb25PZlRpbWVDb21wb25lbnRJbklucHV0KGN1cnNvclBvcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE5ld1ZhbHVlKGtleTogc3RyaW5nLCBwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBbdGhpcy52aWV3VmFsdWUuc2xpY2UoMCwgcG9zaXRpb24pLCBrZXksIHRoaXMudmlld1ZhbHVlLnNsaWNlKHBvc2l0aW9uKV0uam9pbignJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2ZXJ0aWNhbEFycm93S2V5SGFuZGxlcihrZXlDb2RlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnZhbHVlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGxldCBjaGFuZ2VkVGltZTtcblxuICAgICAgICBjb25zdCBuZXdFZGl0UGFyYW1zID0gdGhpcy5nZXRUaW1lRWRpdE1ldHJpY3ModGhpcy5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpO1xuXG4gICAgICAgIGlmIChrZXlDb2RlID09PSBVUF9BUlJPVykge1xuICAgICAgICAgICAgY2hhbmdlZFRpbWUgPSB0aGlzLmluY3JlbWVudFRpbWUodGhpcy52YWx1ZSwgbmV3RWRpdFBhcmFtcy5tb2RpZmllZFRpbWVQYXJ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXlDb2RlID09PSBET1dOX0FSUk9XKSB7XG4gICAgICAgICAgICBjaGFuZ2VkVGltZSA9IHRoaXMuZGVjcmVtZW50VGltZSh0aGlzLnZhbHVlLCBuZXdFZGl0UGFyYW1zLm1vZGlmaWVkVGltZVBhcnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IGNoYW5nZWRUaW1lO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhcnQgPSBuZXdFZGl0UGFyYW1zLmN1cnNvclN0YXJ0UG9zaXRpb247XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uRW5kID0gbmV3RWRpdFBhcmFtcy5jdXJzb3JFbmRQb3NpdGlvbjtcblxuICAgICAgICB0aGlzLm9uQ2hhbmdlKGNoYW5nZWRUaW1lKTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaG9yaXpvbnRhbEFycm93S2V5SGFuZGxlcihrZXlDb2RlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnZhbHVlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGxldCBjdXJzb3JQb3MgPSB0aGlzLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcjtcblxuICAgICAgICBpZiAoa2V5Q29kZSA9PT0gTEVGVF9BUlJPVykge1xuICAgICAgICAgICAgY3Vyc29yUG9zID0gY3Vyc29yUG9zID09PSAwID8gdGhpcy52aWV3VmFsdWUubGVuZ3RoIDogY3Vyc29yUG9zIC0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBSSUdIVF9BUlJPVykge1xuICAgICAgICAgICAgY29uc3QgbmV4dERpdmlkZXJQb3M6IG51bWJlciA9IHRoaXMudmlld1ZhbHVlLmluZGV4T2YoJzonLCBjdXJzb3JQb3MpO1xuXG4gICAgICAgICAgICBjdXJzb3JQb3MgPSBuZXh0RGl2aWRlclBvcyA/IG5leHREaXZpZGVyUG9zICsgMSA6IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNyZWF0ZVNlbGVjdGlvbk9mVGltZUNvbXBvbmVudEluSW5wdXQoY3Vyc29yUG9zKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVNlbGVjdGlvbk9mVGltZUNvbXBvbmVudEluSW5wdXQoY3Vyc29yUG9zOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdFZGl0UGFyYW1zID0gdGhpcy5nZXRUaW1lRWRpdE1ldHJpY3MoY3Vyc29yUG9zKTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25TdGFydCA9IG5ld0VkaXRQYXJhbXMuY3Vyc29yU3RhcnRQb3NpdGlvbjtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uRW5kID0gbmV3RWRpdFBhcmFtcy5jdXJzb3JFbmRQb3NpdGlvbjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbmNyZW1lbnRUaW1lKGRhdGVWYWw6IEQsIHdoYXRUb0luY3JlbWVudDogVGltZVBhcnRzID0gVGltZVBhcnRzLnNlY29uZHMpOiBEIHtcbiAgICAgICAgbGV0IGhvdXJzID0gdGhpcy5kYXRlQWRhcHRlci5nZXRIb3VycyhkYXRlVmFsKTtcbiAgICAgICAgbGV0IG1pbnV0ZXMgPSB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbnV0ZXMoZGF0ZVZhbCk7XG4gICAgICAgIGxldCBzZWNvbmRzID0gdGhpcy5kYXRlQWRhcHRlci5nZXRTZWNvbmRzKGRhdGVWYWwpO1xuXG4gICAgICAgIHN3aXRjaCAod2hhdFRvSW5jcmVtZW50KSB7XG4gICAgICAgICAgICBjYXNlIFRpbWVQYXJ0cy5ob3VyczpcbiAgICAgICAgICAgICAgICBob3VycysrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUaW1lUGFydHMubWludXRlczpcbiAgICAgICAgICAgICAgICBtaW51dGVzKys7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFRpbWVQYXJ0cy5zZWNvbmRzOlxuICAgICAgICAgICAgICAgIHNlY29uZHMrKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2Vjb25kcyA+IFNFQ09ORFNfUEVSX01JTlVURSkgeyBzZWNvbmRzID0gMDsgfVxuXG4gICAgICAgIGlmIChtaW51dGVzID4gTUlOVVRFU19QRVJfSE9VUikgeyBtaW51dGVzID0gMDsgfVxuXG4gICAgICAgIGlmIChob3VycyA+IEhPVVJTX1BFUl9EQVkpIHsgaG91cnMgPSAwOyB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZVRpbWUoXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIodGhpcy52YWx1ZSksXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldE1vbnRoKHRoaXMudmFsdWUpLFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXREYXRlKHRoaXMudmFsdWUpLFxuICAgICAgICAgICAgaG91cnMsXG4gICAgICAgICAgICBtaW51dGVzLFxuICAgICAgICAgICAgc2Vjb25kcyxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TWlsbGlzZWNvbmRzKHRoaXMudmFsdWUpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZWNyZW1lbnRUaW1lKGRhdGVWYWw6IEQsIHdoYXRUb0RlY3JlbWVudDogVGltZVBhcnRzID0gVGltZVBhcnRzLnNlY29uZHMpOiBEIHtcbiAgICAgICAgbGV0IGhvdXJzID0gdGhpcy5kYXRlQWRhcHRlci5nZXRIb3VycyhkYXRlVmFsKTtcbiAgICAgICAgbGV0IG1pbnV0ZXMgPSB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbnV0ZXMoZGF0ZVZhbCk7XG4gICAgICAgIGxldCBzZWNvbmRzID0gdGhpcy5kYXRlQWRhcHRlci5nZXRTZWNvbmRzKGRhdGVWYWwpO1xuXG4gICAgICAgIHN3aXRjaCAod2hhdFRvRGVjcmVtZW50KSB7XG4gICAgICAgICAgICBjYXNlIFRpbWVQYXJ0cy5ob3VyczpcbiAgICAgICAgICAgICAgICBob3Vycy0tO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUaW1lUGFydHMubWludXRlczpcbiAgICAgICAgICAgICAgICBtaW51dGVzLS07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFRpbWVQYXJ0cy5zZWNvbmRzOlxuICAgICAgICAgICAgICAgIHNlY29uZHMtLTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2Vjb25kcyA8IDApIHsgc2Vjb25kcyA9IFNFQ09ORFNfUEVSX01JTlVURTsgfVxuXG4gICAgICAgIGlmIChtaW51dGVzIDwgMCkgeyBtaW51dGVzID0gTUlOVVRFU19QRVJfSE9VUjsgfVxuXG4gICAgICAgIGlmIChob3VycyA8IDApIHsgaG91cnMgPSBIT1VSU19QRVJfREFZOyB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZVRpbWUoXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIodGhpcy52YWx1ZSksXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldE1vbnRoKHRoaXMudmFsdWUpLFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXREYXRlKHRoaXMudmFsdWUpLFxuICAgICAgICAgICAgaG91cnMsXG4gICAgICAgICAgICBtaW51dGVzLFxuICAgICAgICAgICAgc2Vjb25kcyxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TWlsbGlzZWNvbmRzKHRoaXMudmFsdWUpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCBwYXJhbXMgZm9yIGFycm93LWtleXMgKHVwL2Rvd24pIHRpbWUgdmFsaWUgZWRpdC5cbiAgICAgKiBAcGFyYW0gY3Vyc29yUG9zaXRpb24gQ3VycmVudCBjdXJzb3IgcG9zaXRpb24gaW4gdGltZVN0cmluZ1xuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0VGltZUVkaXRNZXRyaWNzKGN1cnNvclBvc2l0aW9uOiBudW1iZXIpOiB7XG4gICAgICAgIG1vZGlmaWVkVGltZVBhcnQ6IFRpbWVQYXJ0cztcbiAgICAgICAgY3Vyc29yU3RhcnRQb3NpdGlvbjogbnVtYmVyO1xuICAgICAgICBjdXJzb3JFbmRQb3NpdGlvbjogbnVtYmVyO1xuICAgIH0ge1xuICAgICAgICBjb25zdCB0aW1lU3RyaW5nOiBzdHJpbmcgPSB0aGlzLnZpZXdWYWx1ZTtcbiAgICAgICAgbGV0IG1vZGlmaWVkVGltZVBhcnQ6IFRpbWVQYXJ0cztcbiAgICAgICAgbGV0IGN1cnNvclN0YXJ0UG9zaXRpb246IG51bWJlcjtcbiAgICAgICAgbGV0IGN1cnNvckVuZFBvc2l0aW9uOiBudW1iZXI7XG5cbiAgICAgICAgY29uc3QgaG91cnNJbmRleCA9IDA7XG4gICAgICAgIGNvbnN0IG1pbnV0ZXNJbmRleCA9IHRpbWVTdHJpbmcuaW5kZXhPZignOicsIGhvdXJzSW5kZXggKyAxKTtcbiAgICAgICAgY29uc3Qgc2Vjb25kc0luZGV4ID0gbWludXRlc0luZGV4ICE9PSAtMSA/IHRpbWVTdHJpbmcuaW5kZXhPZignOicsIG1pbnV0ZXNJbmRleCArIDEpIDogLTE7XG5cbiAgICAgICAgaWYgKHNlY29uZHNJbmRleCAhPT0gLTEgJiYgY3Vyc29yUG9zaXRpb24gPiBzZWNvbmRzSW5kZXgpIHtcbiAgICAgICAgICAgIG1vZGlmaWVkVGltZVBhcnQgPSBUaW1lUGFydHMuc2Vjb25kcztcbiAgICAgICAgICAgIGN1cnNvclN0YXJ0UG9zaXRpb24gPSBzZWNvbmRzSW5kZXggKyAxO1xuICAgICAgICAgICAgY3Vyc29yRW5kUG9zaXRpb24gPSB0aW1lU3RyaW5nLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIGlmIChtaW51dGVzSW5kZXggIT09IC0xICYmIGN1cnNvclBvc2l0aW9uID4gbWludXRlc0luZGV4KSB7XG4gICAgICAgICAgICBtb2RpZmllZFRpbWVQYXJ0ID0gVGltZVBhcnRzLm1pbnV0ZXM7XG4gICAgICAgICAgICBjdXJzb3JTdGFydFBvc2l0aW9uID0gbWludXRlc0luZGV4ICsgMTtcbiAgICAgICAgICAgIGN1cnNvckVuZFBvc2l0aW9uID0gc2Vjb25kc0luZGV4ID4gLTEgPyBzZWNvbmRzSW5kZXggOiB0aW1lU3RyaW5nLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZGlmaWVkVGltZVBhcnQgPSBUaW1lUGFydHMuaG91cnM7XG4gICAgICAgICAgICBjdXJzb3JTdGFydFBvc2l0aW9uID0gaG91cnNJbmRleDtcbiAgICAgICAgICAgIGN1cnNvckVuZFBvc2l0aW9uID0gbWludXRlc0luZGV4ICE9PSAtMSA/IG1pbnV0ZXNJbmRleCA6IHRpbWVTdHJpbmcubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgbW9kaWZpZWRUaW1lUGFydCwgY3Vyc29yU3RhcnRQb3NpdGlvbiwgY3Vyc29yRW5kUG9zaXRpb24gfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gQ3JlYXRlIHRpbWUgc3RyaW5nIGZvciBkaXNwbGF5aW5nIGluc2lkZSBpbnB1dCBlbGVtZW50IG9mIFVJXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRUaW1lU3RyaW5nRnJvbURhdGUodmFsdWU6IEQgfCBudWxsLCB0aW1lRm9ybWF0OiBUaW1lRm9ybWF0cyk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdmFsdWUgfHwgIXRoaXMuZGF0ZUFkYXB0ZXIuaXNWYWxpZCh2YWx1ZSkpIHsgcmV0dXJuICcnOyB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUFkYXB0ZXIuZm9ybWF0KHZhbHVlLCB0aW1lRm9ybWF0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERhdGVGcm9tVGltZVN0cmluZyh0aW1lU3RyaW5nOiBzdHJpbmcpOiBEIHwgbnVsbCB7XG4gICAgICAgIGlmICghdGltZVN0cmluZykgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgIGNvbnN0IGhvdXJzQW5kTWludXRlc0FuZFNlY29uZHMgPSB0aW1lU3RyaW5nLm1hdGNoKEhPVVJTX01JTlVURVNfU0VDT05EU19SRUdFWFApO1xuICAgICAgICBjb25zdCBob3Vyc0FuZE1pbnV0ZXMgPSB0aW1lU3RyaW5nLm1hdGNoKEhPVVJTX01JTlVURVNfUkVHRVhQKTtcbiAgICAgICAgY29uc3QgaG91cnNPbmx5ID0gdGltZVN0cmluZy5tYXRjaChIT1VSU19PTkxZX1JFR0VYUCk7XG4gICAgICAgIGNvbnN0IGhvdXJzQW5kTWludXRlc0luQW1QbSA9IHRpbWVTdHJpbmcubWF0Y2goQU1fUE1fRk9STUFUX1JFR0VYUCk7XG5cbiAgICAgICAgbGV0IGhvdXJzOiBudW1iZXIgPSAwO1xuICAgICAgICBsZXQgbWludXRlczogbnVtYmVyID0gMDtcbiAgICAgICAgbGV0IHNlY29uZHM6IG51bWJlciA9IDA7XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGU6bm8tbWFnaWMtbnVtYmVyc1xuICAgICAgICBpZiAoaG91cnNBbmRNaW51dGVzSW5BbVBtKSB7XG4gICAgICAgICAgICBob3VycyA9IE51bWJlcihob3Vyc0FuZE1pbnV0ZXNJbkFtUG1bMV0pO1xuICAgICAgICAgICAgbWludXRlcyA9IE51bWJlcihob3Vyc0FuZE1pbnV0ZXNJbkFtUG1bMl0pO1xuXG4gICAgICAgICAgICBpZiAoL1twXS9pLnRlc3QoaG91cnNBbmRNaW51dGVzSW5BbVBtWzNdKSB8fCAoL1thXS9pLnRlc3QoaG91cnNBbmRNaW51dGVzSW5BbVBtWzNdKSAmJiBob3VycyA9PT0gMTIpKSB7XG4gICAgICAgICAgICAgICAgaG91cnMgKz0gMTI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaG91cnNBbmRNaW51dGVzQW5kU2Vjb25kcykge1xuICAgICAgICAgICAgaG91cnMgPSBOdW1iZXIoaG91cnNBbmRNaW51dGVzQW5kU2Vjb25kc1sxXSk7XG4gICAgICAgICAgICBtaW51dGVzID0gTnVtYmVyKGhvdXJzQW5kTWludXRlc0FuZFNlY29uZHNbMl0pO1xuICAgICAgICAgICAgc2Vjb25kcyA9IE51bWJlcihob3Vyc0FuZE1pbnV0ZXNBbmRTZWNvbmRzWzNdKTtcbiAgICAgICAgfSBlbHNlIGlmIChob3Vyc0FuZE1pbnV0ZXMpIHtcbiAgICAgICAgICAgIGhvdXJzID0gTnVtYmVyKGhvdXJzQW5kTWludXRlc1sxXSk7XG4gICAgICAgICAgICBtaW51dGVzID0gTnVtYmVyKGhvdXJzQW5kTWludXRlc1syXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaG91cnNPbmx5KSB7XG4gICAgICAgICAgICBob3VycyA9IE51bWJlcihob3Vyc09ubHlbMV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdHNsaW50OmVuYWJsZVxuXG4gICAgICAgIGNvbnN0IHJlc3VsdERhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLmNyZWF0ZURhdGVUaW1lKFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMudmFsdWUpLFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLnZhbHVlKSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLnZhbHVlKSxcbiAgICAgICAgICAgIGhvdXJzLFxuICAgICAgICAgICAgbWludXRlcyxcbiAgICAgICAgICAgIHNlY29uZHMsXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbGxpc2Vjb25kcyh0aGlzLnZhbHVlKVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbChyZXN1bHREYXRlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlVmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9ICgpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvY3VzZWQgfHxcbiAgICAgICAgICAgIHRoaXMuZW1wdHkgfHxcbiAgICAgICAgICAgIHRoaXMubGFzdFZhbHVlVmFsaWQgPyBudWxsIDogeyBtY1RpbWVwaWNrZXJQYXJzZTogeyB0ZXh0OiB0aGlzLnZpZXdWYWx1ZSB9IH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtaW5WYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgICAgY29uc3QgY29udHJvbFZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlKSk7XG5cbiAgICAgICAgcmV0dXJuICghdGhpcy5taW4gfHwgIWNvbnRyb2xWYWx1ZSB8fCB0aGlzLmNvbXBhcmVUaW1lKHRoaXMubWluLCBjb250cm9sVmFsdWUpIDw9IDApID9cbiAgICAgICAgICAgIG51bGwgOlxuICAgICAgICAgICAgeyBtY1RpbWVwaWNrZXJMb3dlclRoZW5NaW46IHsgbWluOiB0aGlzLm1pbiwgYWN0dWFsOiBjb250cm9sVmFsdWUgfSB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgbWF4VmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZSkpO1xuXG4gICAgICAgIHJldHVybiAoIXRoaXMubWF4IHx8ICFjb250cm9sVmFsdWUgfHwgdGhpcy5jb21wYXJlVGltZSh0aGlzLm1heCwgY29udHJvbFZhbHVlKSA+PSAwKSA/XG4gICAgICAgICAgICBudWxsIDpcbiAgICAgICAgICAgIHsgbWNUaW1lcGlja2VySGlnaGVyVGhlbk1heDogeyBtYXg6IHRoaXMubWF4LCBhY3R1YWw6IGNvbnRyb2xWYWx1ZSB9IH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb21wYXJlVGltZShmaXJzdDogRCwgc2Vjb25kOiBEKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kYXRlQWRhcHRlci5nZXRIb3VycyhmaXJzdCkgLSB0aGlzLmRhdGVBZGFwdGVyLmdldEhvdXJzKHNlY29uZCkgfHxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TWludXRlcyhmaXJzdCkgLSB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbnV0ZXMoc2Vjb25kKTtcblxuICAgICAgICBpZiAoVGltZUZvcm1hdHMuSEhtbSA9PT0gdGhpcy5mb3JtYXQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSBpZiAoVGltZUZvcm1hdHMuSEhtbXNzID09PSB0aGlzLmZvcm1hdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCB8fCB0aGlzLmRhdGVBZGFwdGVyLmdldFNlY29uZHMoZmlyc3QpIC0gdGhpcy5kYXRlQWRhcHRlci5nZXRTZWNvbmRzKHNlY29uZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgVW5rbm93biBmb3JtYXQ6ICR7dGhpcy5mb3JtYXR9YCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFZhbGlkRGF0ZU9yTnVsbChvYmo6IGFueSk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmRhdGVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiYgdGhpcy5kYXRlQWRhcHRlci5pc1ZhbGlkKG9iaikpID8gb2JqIDogbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFZpZXdWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVZpZXcoKSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbHVlID0gdGhpcy5nZXRUaW1lU3RyaW5nRnJvbURhdGUodGhpcy52YWx1ZSwgdGhpcy5mb3JtYXQpO1xuXG4gICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKGZvcm1hdHRlZFZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldENvbnRyb2woY29udHJvbDogQWJzdHJhY3RDb250cm9sKSB7XG4gICAgICAgIGlmICghdGhpcy5jb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wgPSBjb250cm9sO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5XG4gICAgcHJpdmF0ZSB2YWxpZGF0b3JPbkNoYW5nZSA9ICgpID0+IHt9O1xufVxuIl19