// @ts-nocheck
// tslint:disable:no-empty
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Output, Renderer2 } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { DateAdapter, MC_DATE_FORMATS } from '@ptsecurity/cdk/datetime';
import { BACKSPACE, DELETE, UP_ARROW, RIGHT_ARROW, DOWN_ARROW, LEFT_ARROW, END, PAGE_DOWN, HOME, PAGE_UP, SPACE, TAB, ESCAPE, hasModifierKey, isHorizontalMovement, isLetterKey, isVerticalMovement } from '@ptsecurity/cdk/keycodes';
import { validationTooltipHideDelay, validationTooltipShowDelay } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { McTooltip } from '@ptsecurity/mosaic/tooltip';
import { Subject, Subscription } from 'rxjs';
import { createMissingDateImplError } from './datepicker-errors';
import { McDatepicker } from './datepicker.component';
// tslint:disable:naming-convention
var DateParts;
(function (DateParts) {
    DateParts["year"] = "y";
    DateParts["month"] = "m";
    DateParts["day"] = "d";
})(DateParts || (DateParts = {}));
class DateDigit {
    constructor(value, start, length, firstMonth = 0) {
        this.value = value;
        this.start = start;
        this.length = length;
        this.firstMonth = firstMonth;
        this.maxDays = 31;
        if (value === DateParts.day) {
            this.parse = this.parseDay;
        }
        else if (value === DateParts.month) {
            this.parse = this.parseMonth;
        }
        else if (value === DateParts.year) {
            this.parse = this.parseYear;
        }
    }
    get maxMonth() {
        // tslint:disable-next-line:no-magic-numbers binary-expression-operand-order
        return 11 + this.firstMonth;
    }
    get end() {
        return this.start + this.length;
    }
    get isDay() {
        return this.value === DateParts.day;
    }
    get isMonth() {
        return this.value === DateParts.month;
    }
    get isYear() {
        return this.value === DateParts.year;
    }
    get fullName() {
        if (this.isDay) {
            return 'date';
        }
        if (this.isMonth) {
            return 'month';
        }
        if (this.isYear) {
            return 'year';
        }
    }
    parseDay(value) {
        const parsedValue = parseInt(value);
        if (parsedValue === 0) {
            return 1;
        }
        if (parsedValue > this.maxDays) {
            return this.maxDays;
        }
        return parsedValue;
    }
    parseMonth(value) {
        const parsedValue = parseInt(value);
        if (parsedValue === 0) {
            return 1;
        }
        if (parsedValue > this.maxMonth) {
            return this.maxMonth;
        }
        return parsedValue;
    }
    parseYear(value) {
        const parsedValue = parseInt(value);
        if (parsedValue === 0) {
            return 1;
        }
        return parsedValue;
    }
}
/** @docs-private */
export const MC_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => McDatepickerInput),
    multi: true
};
/** @docs-private */
export const MC_DATEPICKER_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => McDatepickerInput),
    multi: true
};
/**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use McDatepickerInputEvent instead.
 */
export class McDatepickerInputEvent {
    constructor(
    /** Reference to the datepicker input component that emitted the event. */
    target, 
    /** Reference to the native input element associated with the datepicker input. */
    targetElement) {
        this.target = target;
        this.targetElement = targetElement;
        this.value = this.target.value;
    }
}
let uniqueComponentIdSuffix = 0;
/** Directive used to connect an input to a McDatepicker. */
export class McDatepickerInput {
    constructor(elementRef, renderer, dateAdapter, dateFormats) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.dateAdapter = dateAdapter;
        this.dateFormats = dateFormats;
        this.stateChanges = new Subject();
        this.controlType = 'datepicker';
        this.focused = false;
        /** Emits when the value changes (either due to user input or programmatic change). */
        this.valueChange = new EventEmitter();
        /** Emits when the disabled state has changed */
        this.disabledChange = new EventEmitter();
        this._disabled = false;
        this.incorrectInput = new EventEmitter();
        /** Emits when a `change` event is fired on this `<input>`. */
        this.dateChange = new EventEmitter();
        /** Emits when an `input` event is fired on this `<input>`. */
        this.dateInput = new EventEmitter();
        this.uid = `mc-datepicker-${uniqueComponentIdSuffix++}`;
        this.datepickerSubscription = Subscription.EMPTY;
        this.localeSubscription = Subscription.EMPTY;
        /** Whether the last value set on the input was valid. */
        this.lastValueValid = false;
        this.onTouched = () => { };
        this.onInput = () => {
            this.correctCursorPosition();
            const formattedValue = this.replaceSymbols(this.viewValue);
            const newTimeObj = this.getDateFromString(formattedValue);
            this.lastValueValid = !!newTimeObj;
            if (!newTimeObj) {
                this.control.updateValueAndValidity();
                this._value = null;
                return;
            }
            this.setViewValue(this.getTimeStringFromDate(newTimeObj, this.dateFormats.dateInput), true);
            this.selectNextDigitByCursor(this.selectionStart);
            this.updateValue(newTimeObj);
        };
        this.parseOnBlur = () => {
            if (!this.viewValue) {
                return null;
            }
            const date = this.getDefaultValue();
            const viewDigits = this.viewValue
                .split(this.separator)
                .map((value) => value)
                .filter((value) => value);
            const [firsViewDigit, secondViewDigit, thirdViewDigit] = viewDigits;
            // tslint:disable-next-line:no-magic-numbers
            if (viewDigits.length !== 3) {
                this.lastValueValid = false;
                this._value = null;
                return setTimeout(() => this.control.updateValueAndValidity());
            }
            date[this.firstDigit.fullName] = this.firstDigit.parse(firsViewDigit);
            date[this.secondDigit.fullName] = this.secondDigit.parse(secondViewDigit);
            date[this.thirdDigit.fullName] = this.thirdDigit.parse(thirdViewDigit);
            const [digitWithYear, viewDigitWithYear] = [this.firstDigit, this.secondDigit, this.thirdDigit]
                .reduce((acc, digit, index) => digit.value === DateParts.year ? [digit, viewDigits[index]] : acc, []);
            // tslint:disable-next-line:no-magic-numbers
            if (viewDigitWithYear.length < 3) {
                // tslint:disable-next-line:no-magic-numbers
                date.year += date.year < 30 ? 2000 : 1900;
            }
            else if (viewDigitWithYear.length < digitWithYear.length) {
                this.lastValueValid = false;
                this._value = null;
                return setTimeout(() => this.control.updateValueAndValidity());
            }
            const newTimeObj = this.getValidDateOrNull(this.dateAdapter.createDateTime(date.year, date.month, date.date, date.hours, date.minutes, date.seconds, date.milliseconds));
            this.lastValueValid = !!newTimeObj;
            this.setViewValue(this.getTimeStringFromDate(newTimeObj, this.dateFormats.dateInput), true);
            this.updateValue(newTimeObj);
        };
        this.updateLocaleParams = () => {
            this.setFormat(this.dateFormats.dateInput);
            this.value = this.value;
        };
        this.cvaOnChange = () => { };
        this.validatorOnChange = () => { };
        /** The form control validator for whether the input parses. */
        this.parseValidator = () => {
            return this.focused ||
                this.empty ||
                this.lastValueValid ? null : { mcDatepickerParse: { text: this.elementRef.nativeElement.value } };
        };
        /** The form control validator for the min date. */
        this.minValidator = (control) => {
            const controlValue = this.getValidDateOrNull(this.dateAdapter.deserialize(control.value));
            return (!this.min || !controlValue ||
                this.dateAdapter.compareDate(this.min, controlValue) <= 0) ?
                null : { mcDatepickerMin: { min: this.min, actual: controlValue } };
        };
        /** The form control validator for the max date. */
        this.maxValidator = (control) => {
            const controlValue = this.getValidDateOrNull(this.dateAdapter.deserialize(control.value));
            return (!this.max || !controlValue ||
                this.dateAdapter.compareDate(this.max, controlValue) >= 0) ?
                null : { mcDatepickerMax: { max: this.max, actual: controlValue } };
        };
        /** The form control validator for the date filter. */
        this.filterValidator = (control) => {
            const controlValue = this.getValidDateOrNull(this.dateAdapter.deserialize(control.value));
            return !this.dateFilter || !controlValue || this.dateFilter(controlValue) ?
                null : { mcDatepickerFilter: true };
        };
        this.validator = Validators.compose([
            this.parseValidator,
            this.minValidator,
            this.maxValidator,
            this.filterValidator
        ]);
        if (!this.dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        if (!this.dateFormats) {
            throw createMissingDateImplError('MC_DATE_FORMATS');
        }
        this.setFormat(dateFormats.dateInput);
        this.localeSubscription = dateAdapter.localeChanges
            .subscribe(this.updateLocaleParams);
    }
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
    }
    /** The datepicker that this input is associated with. */
    set mcDatepicker(value) {
        if (!value) {
            return;
        }
        this.datepicker = value;
        this.datepicker.registerInput(this);
        this.datepickerSubscription.unsubscribe();
        this.datepickerSubscription = this.datepicker.selectedChanged
            .subscribe((selected) => {
            this.value = selected;
            this.cvaOnChange(selected);
            this.onTouched();
            this.dateChange.emit(new McDatepickerInputEvent(this, this.elementRef.nativeElement));
        });
    }
    /** Function that can be used to filter out dates within the datepicker. */
    set mcDatepickerFilter(value) {
        this.dateFilter = value;
        this.validatorOnChange();
    }
    /** The value of the input. */
    get value() {
        return this._value;
    }
    set value(value) {
        let newValue = this.dateAdapter.deserialize(value);
        this.lastValueValid = !newValue || this.dateAdapter.isValid(newValue);
        newValue = this.getValidDateOrNull(newValue);
        const oldDate = this.value;
        this._value = newValue;
        this.formatValue(newValue);
        if (!this.dateAdapter.sameDate(oldDate, newValue)) {
            this.valueChange.emit(newValue);
        }
    }
    /** The minimum valid date. */
    get min() {
        return this._min;
    }
    set min(value) {
        this._min = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        this.validatorOnChange();
    }
    /** The maximum valid date. */
    get max() {
        return this._max;
    }
    set max(value) {
        this._max = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        this.validatorOnChange();
    }
    /** Whether the datepicker-input is disabled. */
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        const newValue = coerceBooleanProperty(value);
        const element = this.elementRef.nativeElement;
        if (this._disabled !== newValue) {
            this._disabled = newValue;
            this.disabledChange.emit(newValue);
        }
        // We need to null check the `blur` method, because it's undefined during SSR.
        if (newValue && element.blur) {
            // Normally, native input elements automatically blur if they turn disabled. This behavior
            // is problematic, because it would mean that it triggers another change detection cycle,
            // which then causes a changed after checked error if the input element was focused before.
            element.blur();
        }
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value || this.uid;
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
    get empty() {
        return !this.viewValue && !this.isBadInput();
    }
    get viewValue() {
        return this.elementRef.nativeElement.value;
    }
    get ngControl() {
        return this.control;
    }
    get isReadOnly() {
        return this.elementRef.nativeElement.readOnly;
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
    onContainerClick() {
        this.focus();
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
    ngOnDestroy() {
        this.datepickerSubscription.unsubscribe();
        this.localeSubscription.unsubscribe();
        this.valueChange.complete();
        this.disabledChange.complete();
    }
    /** @docs-private */
    registerOnValidatorChange(fn) {
        this.validatorOnChange = fn;
    }
    /** @docs-private */
    validate(control) {
        this.setControl(control);
        return this.validator ? this.validator(control) : null;
    }
    // Implemented as part of ControlValueAccessor.
    writeValue(value) {
        this.value = value;
    }
    // Implemented as part of ControlValueAccessor.
    registerOnChange(fn) {
        this.cvaOnChange = fn;
    }
    // Implemented as part of ControlValueAccessor.
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    // Implemented as part of ControlValueAccessor.
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    onKeyDown(event) {
        if (this.isReadOnly) {
            return;
        }
        // tslint:disable-next-line: deprecation
        const keyCode = event.keyCode;
        if (this.isLetterKey(event)) {
            event.preventDefault();
            this.incorrectInput.emit();
        }
        else if (this.isKeyForOpen(event)) {
            event.preventDefault();
            this.datepicker.open();
        }
        else if (this.isKeyForClose(event)) {
            event.preventDefault();
            this.datepicker.close();
        }
        else if (keyCode === TAB) {
            this.datepicker.close(false);
        }
        else if (this.isKeyForByPass(event)) {
            return;
        }
        else if (keyCode === SPACE) {
            this.spaceKeyHandler(event);
        }
        else if ([UP_ARROW, DOWN_ARROW].includes(keyCode)) {
            event.preventDefault();
            this.verticalArrowKeyHandler(keyCode);
        }
        else if ([LEFT_ARROW, RIGHT_ARROW, HOME, PAGE_UP, END, PAGE_DOWN].includes(keyCode)) {
            event.preventDefault();
            this.changeCaretPosition(keyCode);
        }
        else if (/^\D$/.test(event.key)) {
            event.preventDefault();
            const newValue = this.getNewValue(event.key, this.selectionStart);
            const formattedValue = this.replaceSymbols(newValue);
            if (newValue !== formattedValue) {
                this.setViewValue(formattedValue, true);
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
    onChange() {
        this.dateChange.emit(new McDatepickerInputEvent(this, this.elementRef.nativeElement));
    }
    /** Handles blur events on the input. */
    onBlur() {
        // Reformat the input only if we have a valid value.
        this.parseOnBlur();
        this.focusChanged(false);
    }
    onPaste($event) {
        var _a, _b, _c;
        $event.preventDefault();
        const rawValue = $event.clipboardData.getData('text');
        const match = rawValue.match(/^(?<first>\d+)\W(?<second>\d+)\W(?<third>\d+)$/);
        if (!((_a = match === null || match === void 0 ? void 0 : match.groups) === null || _a === void 0 ? void 0 : _a.first) || !((_b = match === null || match === void 0 ? void 0 : match.groups) === null || _b === void 0 ? void 0 : _b.second) || !((_c = match === null || match === void 0 ? void 0 : match.groups) === null || _c === void 0 ? void 0 : _c.third)) {
            this.setViewValue(rawValue);
            return rawValue;
        }
        const value = [match.groups.first, match.groups.second, match.groups.third].join(this.separator);
        const newTimeObj = this.getDateFromString(value);
        if (!newTimeObj) {
            this.setViewValue(value);
            return value;
        }
        this.setViewValue(this.getTimeStringFromDate(newTimeObj, this.dateFormats.dateInput));
        this.updateValue(newTimeObj);
    }
    setFormat(format) {
        this.separator = format.match(/[aA-zZ]+(?<separator>\W|\D)[aA-zZ]+/).groups.separator;
        this.separatorPositions = format
            .split('')
            .reduce((acc, item, index) => this.separator === item ? [...acc, index + 1] : acc, []);
        this.getDigitPositions(format);
    }
    updateValue(newValue) {
        if (!this.dateAdapter.sameDate(newValue, this.value)) {
            this._value = newValue;
            this.cvaOnChange(newValue);
            this.valueChange.emit(newValue);
            this.dateInput.emit(new McDatepickerInputEvent(this, this.elementRef.nativeElement));
        }
        this.control.updateValueAndValidity();
    }
    isKeyForClose(event) {
        // tslint:disable-next-line: deprecation
        return (event.altKey && event.keyCode === UP_ARROW) || event.keyCode === ESCAPE;
    }
    isKeyForOpen(event) {
        // tslint:disable-next-line: deprecation
        return event.altKey && event.keyCode === DOWN_ARROW;
    }
    isLetterKey(event) {
        return isLetterKey(event) && !event.ctrlKey && !event.metaKey;
    }
    isKeyForByPass(event) {
        // tslint:disable-next-line: deprecation
        return (hasModifierKey(event) && (isVerticalMovement(event.keyCode) || isHorizontalMovement(event.keyCode))) ||
            event.ctrlKey ||
            event.metaKey ||
            // tslint:disable-next-line: deprecation
            [DELETE, BACKSPACE].includes(event.keyCode);
    }
    spaceKeyHandler(event) {
        event.preventDefault();
        if (this.selectionStart === this.selectionEnd) {
            const value = this.getNewValue(event.key, this.selectionStart);
            this.setViewValue(value);
            setTimeout(this.onInput);
        }
        else if (this.selectionStart !== this.selectionEnd) {
            this.selectNextDigit(this.selectionStart, true);
        }
    }
    getNewValue(key, position) {
        return [this.viewValue.slice(0, position), key, this.viewValue.slice(position)].join('');
    }
    setViewValue(value, savePosition = false) {
        if (savePosition) {
            const selectionStart = this.selectionStart;
            const selectionEnd = this.selectionEnd;
            this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
            this.selectionStart = selectionStart;
            this.selectionEnd = selectionEnd;
        }
        else {
            this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
        }
    }
    replaceSymbols(value) {
        return value
            .split(this.separator)
            .map((part) => part.replace(/^([0-9]+)\W$/, '0$1'))
            .join(this.separator);
    }
    getDateFromString(timeString) {
        if (!timeString || timeString.length < this.firstDigit.length) {
            return null;
        }
        const date = this.getDefaultValue();
        const viewDigits = timeString
            .split(this.separator)
            .map((value) => value);
        const [firsViewDigit, secondViewDigit, thirdViewDigit] = viewDigits;
        if (viewDigits.length === 1) {
            if (firsViewDigit.length < this.firstDigit.length) {
                return null;
            }
            date[this.firstDigit.fullName] = this.firstDigit.parse(firsViewDigit);
            date.month = 0;
            // tslint:disable-next-line:no-magic-numbers
        }
        else if (viewDigits.length === 2) {
            if (firsViewDigit.length < this.firstDigit.length || secondViewDigit.length < this.secondDigit.length) {
                return null;
            }
            date[this.firstDigit.fullName] = this.firstDigit.parse(firsViewDigit);
            date[this.secondDigit.fullName] = this.secondDigit.parse(secondViewDigit);
            // tslint:disable-next-line:no-magic-numbers
        }
        else if (viewDigits.length === 3) {
            if (firsViewDigit.length < this.firstDigit.length ||
                secondViewDigit.length < this.secondDigit.length ||
                thirdViewDigit.length < this.thirdDigit.length) {
                return null;
            }
            date[this.firstDigit.fullName] = this.firstDigit.parse(firsViewDigit);
            date[this.secondDigit.fullName] = this.secondDigit.parse(secondViewDigit);
            date[this.thirdDigit.fullName] = this.thirdDigit.parse(thirdViewDigit);
        }
        else {
            return null;
        }
        return this.getValidDateOrNull(this.dateAdapter.createDateTime(date.year, date.month, date.date, date.hours, date.minutes, date.seconds, date.milliseconds));
    }
    getDefaultValue() {
        const defaultValue = this.value || this.dateAdapter.today();
        return {
            year: this.dateAdapter.getYear(defaultValue),
            month: this.dateAdapter.getMonth(defaultValue),
            date: this.dateAdapter.getDate(defaultValue),
            hours: this.dateAdapter.getHours(defaultValue),
            minutes: this.dateAdapter.getMinutes(defaultValue),
            seconds: this.dateAdapter.getSeconds(defaultValue),
            milliseconds: this.dateAdapter.getMilliseconds(defaultValue)
        };
    }
    getTimeStringFromDate(value, timeFormat) {
        if (!value || !this.dateAdapter.isValid(value)) {
            return '';
        }
        return this.dateAdapter.format(value, timeFormat);
    }
    getDateEditMetrics(cursorPosition) {
        for (const digit of [this.firstDigit, this.secondDigit, this.thirdDigit]) {
            if (cursorPosition >= digit.start && cursorPosition <= digit.end) {
                return [digit.value, digit.start, digit.end];
            }
        }
        return [this.thirdDigit.value, this.thirdDigit.start, this.thirdDigit.end];
    }
    incrementDate(dateVal, whatToIncrement) {
        let year = this.dateAdapter.getYear(dateVal);
        let month = this.dateAdapter.getMonth(dateVal);
        let day = this.dateAdapter.getDate(dateVal);
        switch (whatToIncrement) {
            case DateParts.day:
                day++;
                if (day > this.dateAdapter.getNumDaysInMonth(dateVal)) {
                    day = 1;
                }
                break;
            case DateParts.month:
                month++;
                if (month > this.dateAdapter.lastMonth) {
                    month = this.dateAdapter.firstMonth;
                }
                const lastDay = this.getLastDayFor(year, month);
                if (day > lastDay) {
                    day = lastDay;
                }
                break;
            case DateParts.year:
                year++;
                break;
            default:
        }
        return this.createDate(year, month, day);
    }
    getLastDayFor(year, month) {
        return this.dateAdapter.getNumDaysInMonth(this.createDate(year, month, 1));
    }
    decrementDate(dateVal, whatToDecrement) {
        let year = this.dateAdapter.getYear(dateVal);
        let month = this.dateAdapter.getMonth(dateVal);
        let day = this.dateAdapter.getDate(dateVal);
        switch (whatToDecrement) {
            case DateParts.day:
                day--;
                if (day < 1) {
                    day = this.dateAdapter.getNumDaysInMonth(dateVal);
                }
                break;
            case DateParts.month:
                month--;
                if (month < this.dateAdapter.firstMonth) {
                    month = this.dateAdapter.lastMonth;
                }
                const lastDay = this.getLastDayFor(year, month);
                if (day > lastDay) {
                    day = lastDay;
                }
                break;
            case DateParts.year:
                year--;
                break;
            default:
        }
        return this.createDate(year, month, day);
    }
    verticalArrowKeyHandler(keyCode) {
        if (!this.value) {
            return;
        }
        let changedTime;
        const [modifiedTimePart, selectionStart, selectionEnd] = this.getDateEditMetrics(this.selectionStart);
        if (keyCode === UP_ARROW) {
            changedTime = this.incrementDate(this.value, modifiedTimePart);
        }
        if (keyCode === DOWN_ARROW) {
            changedTime = this.decrementDate(this.value, modifiedTimePart);
        }
        this.value = changedTime;
        this.selectionStart = selectionStart;
        this.selectionEnd = selectionEnd;
        this.onChange();
        this.stateChanges.next();
    }
    changeCaretPosition(keyCode) {
        if (!this.value) {
            return;
        }
        let cursorPos = this.selectionStart;
        if ([HOME, PAGE_UP].includes(keyCode)) {
            cursorPos = 0;
        }
        else if ([END, PAGE_DOWN].includes(keyCode)) {
            cursorPos = this.viewValue.length;
        }
        else if (keyCode === LEFT_ARROW) {
            cursorPos = cursorPos === 0 ? this.viewValue.length : cursorPos - 1;
        }
        else if (keyCode === RIGHT_ARROW) {
            const nextSeparatorPos = this.viewValue.indexOf(this.separator, cursorPos);
            cursorPos = nextSeparatorPos ? nextSeparatorPos + 1 : 0;
        }
        this.selectDigitByCursor(cursorPos);
    }
    selectDigitByCursor(cursorPos) {
        setTimeout(() => {
            const [, selectionStart, selectionEnd] = this.getDateEditMetrics(cursorPos);
            this.selectionStart = selectionStart;
            this.selectionEnd = selectionEnd;
        });
    }
    selectNextDigitByCursor(cursorPos) {
        setTimeout(() => {
            const [, , endPositionOfCurrentDigit] = this.getDateEditMetrics(cursorPos);
            const [, selectionStart, selectionEnd] = this.getDateEditMetrics(endPositionOfCurrentDigit + 1);
            this.selectionStart = selectionStart;
            this.selectionEnd = selectionEnd;
        });
    }
    selectNextDigit(cursorPos, cycle = false) {
        setTimeout(() => {
            const lastValue = cycle ? 0 : cursorPos;
            const nextSeparatorPos = this.viewValue.indexOf(this.separator, cursorPos);
            const newCursorPos = nextSeparatorPos > 0 ? nextSeparatorPos + 1 : lastValue;
            const [, selectionStart, selectionEnd] = this.getDateEditMetrics(newCursorPos);
            this.selectionStart = selectionStart;
            this.selectionEnd = selectionEnd;
        });
    }
    /** Checks whether the input is invalid based on the native validation. */
    isBadInput() {
        const validity = this.elementRef.nativeElement.validity;
        return validity && validity.badInput;
    }
    /** Formats a value and sets it on the input element. */
    formatValue(value) {
        const formattedValue = value ? this.dateAdapter.format(value, this.dateFormats.dateInput) : '';
        this.setViewValue(formattedValue);
    }
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    getValidDateOrNull(obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    }
    setControl(control) {
        if (!this.control) {
            this.control = control;
        }
    }
    getDigitPositions(format) {
        const formatInLowerCase = format.toLowerCase();
        formatInLowerCase
            .split('')
            .reduce(({ prev, length, start }, value, index, arr) => {
            if (value === this.separator || (arr.length - 1) === index) {
                if (!this.firstDigit) {
                    this.firstDigit = new DateDigit(prev, start, length, this.dateAdapter.firstMonth);
                }
                else if (!this.secondDigit) {
                    this.secondDigit = new DateDigit(prev, start, length, this.dateAdapter.firstMonth);
                }
                else if (!this.thirdDigit) {
                    this.thirdDigit = new DateDigit(prev, start, arr.length - start, this.dateAdapter.firstMonth);
                }
                // tslint:disable:no-parameter-reassignment
                length = 0;
                start = index + 1;
            }
            else {
                length++;
            }
            return { prev: value, length, start };
        }, { length: 0, start: 0 });
        if (!this.firstDigit || !this.secondDigit || !this.thirdDigit) {
            Error(`Can' t use this format: ${format}`);
        }
    }
    createDate(year, month, day) {
        return this.dateAdapter.createDateTime(year, month, day, this.dateAdapter.getHours(this.value), this.dateAdapter.getMinutes(this.value), this.dateAdapter.getSeconds(this.value), this.dateAdapter.getMilliseconds(this.value));
    }
    correctCursorPosition() {
        if (this.selectionStart && this.separatorPositions.includes(this.selectionStart)) {
            this.selectionStart = this.selectionStart - 1;
        }
    }
}
McDatepickerInput.decorators = [
    { type: Directive, args: [{
                selector: 'input[mcDatepicker]',
                exportAs: 'mcDatepickerInput',
                providers: [
                    MC_DATEPICKER_VALUE_ACCESSOR,
                    MC_DATEPICKER_VALIDATORS,
                    { provide: McFormFieldControl, useExisting: McDatepickerInput }
                ],
                host: {
                    class: 'mc-input mc-datepicker',
                    '[attr.placeholder]': 'placeholder',
                    '[attr.required]': 'required',
                    '[attr.disabled]': 'disabled || null',
                    '[attr.min]': 'min ? dateAdapter.toIso8601(min) : null',
                    '[attr.max]': 'max ? dateAdapter.toIso8601(max) : null',
                    '[attr.autocomplete]': '"off"',
                    '(paste)': 'onPaste($event)',
                    '(change)': 'onChange()',
                    '(focus)': 'focusChanged(true)',
                    '(blur)': 'onBlur()',
                    '(keydown)': 'onKeyDown($event)'
                }
            },] }
];
/** @nocollapse */
McDatepickerInput.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: DateAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_DATE_FORMATS,] }] }
];
McDatepickerInput.propDecorators = {
    placeholder: [{ type: Input }],
    required: [{ type: Input }],
    mcDatepicker: [{ type: Input }],
    mcDatepickerFilter: [{ type: Input }],
    value: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    disabled: [{ type: Input }],
    id: [{ type: Input }],
    mcValidationTooltip: [{ type: Input }],
    incorrectInput: [{ type: Output }],
    dateChange: [{ type: Output }],
    dateInput: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pbnB1dC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvZGF0ZXBpY2tlci9kYXRlcGlja2VyLWlucHV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsMEJBQTBCO0FBQzFCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBR0gsYUFBYSxFQUNiLGlCQUFpQixFQUlqQixVQUFVLEVBQ2IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBaUIsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RixPQUFPLEVBQ0gsU0FBUyxFQUNULE1BQU0sRUFDTixRQUFRLEVBQ1IsV0FBVyxFQUNYLFVBQVUsRUFDVixVQUFVLEVBQ1YsR0FBRyxFQUNILFNBQVMsRUFDVCxJQUFJLEVBQ0osT0FBTyxFQUNQLEtBQUssRUFDTCxHQUFHLEVBQ0gsTUFBTSxFQUNOLGNBQWMsRUFDZCxvQkFBb0IsRUFDcEIsV0FBVyxFQUNYLGtCQUFrQixFQUNyQixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUU3QyxPQUFPLEVB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QUVMLEtBQUs7MkJBWUwsS0FBSztpQ0FrQkwsS0FBSztvQkFPTCxLQUFLO2tCQXdCTCxLQUFLO2tCQWFMLEtBQUs7dUJBYUwsS0FBSztpQkF5QkwsS0FBSztrQ0FXTCxLQUFLOzZCQW1CTCxNQUFNO3lCQUdOLE1BQU07d0JBR04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIEB0cy1ub2NoZWNrXG5cbi8vIHRzbGludDpkaXNhYmxlOm5vLWVtcHR5XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEFic3RyYWN0Q29udHJvbCxcbiAgICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgICBOR19WQUxJREFUT1JTLFxuICAgIE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIFZhbGlkYXRpb25FcnJvcnMsXG4gICAgVmFsaWRhdG9yLFxuICAgIFZhbGlkYXRvckZuLFxuICAgIFZhbGlkYXRvcnNcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIsIE1DX0RBVEVfRk9STUFUUywgTWNEYXRlRm9ybWF0cyB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9kYXRldGltZSc7XG5pbXBvcnQge1xuICAgIEJBQ0tTUEFDRSxcbiAgICBERUxFVEUsXG4gICAgVVBfQVJST1csXG4gICAgUklHSFRfQVJST1csXG4gICAgRE9XTl9BUlJPVyxcbiAgICBMRUZUX0FSUk9XLFxuICAgIEVORCxcbiAgICBQQUdFX0RPV04sXG4gICAgSE9NRSxcbiAgICBQQUdFX1VQLFxuICAgIFNQQUNFLFxuICAgIFRBQixcbiAgICBFU0NBUEUsXG4gICAgaGFzTW9kaWZpZXJLZXksXG4gICAgaXNIb3Jpem9udGFsTW92ZW1lbnQsXG4gICAgaXNMZXR0ZXJLZXksXG4gICAgaXNWZXJ0aWNhbE1vdmVtZW50XG59IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyB2YWxpZGF0aW9uVG9vbHRpcEhpZGVEZWxheSwgdmFsaWRhdGlvblRvb2x0aXBTaG93RGVsYXkgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0Zvcm1GaWVsZENvbnRyb2wgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBNY1Rvb2x0aXAgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvdG9vbHRpcCc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IgfSBmcm9tICcuL2RhdGVwaWNrZXItZXJyb3JzJztcbmltcG9ydCB7IE1jRGF0ZXBpY2tlciB9IGZyb20gJy4vZGF0ZXBpY2tlci5jb21wb25lbnQnO1xuXG5cbi8vIHRzbGludDpkaXNhYmxlOm5hbWluZy1jb252ZW50aW9uXG5lbnVtIERhdGVQYXJ0cyB7XG4gICAgeWVhciA9ICd5JyxcbiAgICBtb250aCA9ICdtJyxcbiAgICBkYXkgPSAnZCdcbn1cblxuY2xhc3MgRGF0ZURpZ2l0IHtcbiAgICBtYXhEYXlzID0gMzE7XG5cbiAgICBwYXJzZTogKHZhbHVlOiBzdHJpbmcpID0+IG51bWJlcjtcblxuICAgIGdldCBtYXhNb250aCgpOiBudW1iZXIge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbWFnaWMtbnVtYmVycyBiaW5hcnktZXhwcmVzc2lvbi1vcGVyYW5kLW9yZGVyXG4gICAgICAgIHJldHVybiAxMSArIHRoaXMuZmlyc3RNb250aDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IERhdGVQYXJ0cywgcHVibGljIHN0YXJ0OiBudW1iZXIsIHB1YmxpYyBsZW5ndGg6IG51bWJlciwgcHVibGljIGZpcnN0TW9udGggPSAwKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gRGF0ZVBhcnRzLmRheSkge1xuICAgICAgICAgICAgdGhpcy5wYXJzZSA9IHRoaXMucGFyc2VEYXk7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IERhdGVQYXJ0cy5tb250aCkge1xuICAgICAgICAgICAgdGhpcy5wYXJzZSA9IHRoaXMucGFyc2VNb250aDtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gRGF0ZVBhcnRzLnllYXIpIHtcbiAgICAgICAgICAgIHRoaXMucGFyc2UgPSB0aGlzLnBhcnNlWWVhcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBlbmQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnQgKyB0aGlzLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXQgaXNEYXkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlID09PSBEYXRlUGFydHMuZGF5O1xuICAgIH1cblxuICAgIGdldCBpc01vbnRoKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSA9PT0gRGF0ZVBhcnRzLm1vbnRoO1xuICAgIH1cblxuICAgIGdldCBpc1llYXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlID09PSBEYXRlUGFydHMueWVhcjtcbiAgICB9XG5cbiAgICBnZXQgZnVsbE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEYXkpIHsgcmV0dXJuICdkYXRlJzsgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzTW9udGgpIHsgcmV0dXJuICdtb250aCc7IH1cblxuICAgICAgICBpZiAodGhpcy5pc1llYXIpIHsgcmV0dXJuICd5ZWFyJzsgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VEYXkodmFsdWU6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHBhcnNlZFZhbHVlOiBudW1iZXIgPSBwYXJzZUludCh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHBhcnNlZFZhbHVlID09PSAwKSB7IHJldHVybiAxOyB9XG5cbiAgICAgICAgaWYgKHBhcnNlZFZhbHVlID4gdGhpcy5tYXhEYXlzKSB7IHJldHVybiB0aGlzLm1heERheXM7IH1cblxuICAgICAgICByZXR1cm4gcGFyc2VkVmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZU1vbnRoKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBwYXJzZWRWYWx1ZTogbnVtYmVyID0gcGFyc2VJbnQodmFsdWUpO1xuXG4gICAgICAgIGlmIChwYXJzZWRWYWx1ZSA9PT0gMCkgeyByZXR1cm4gMTsgfVxuXG4gICAgICAgIGlmIChwYXJzZWRWYWx1ZSA+IHRoaXMubWF4TW9udGgpIHsgcmV0dXJuIHRoaXMubWF4TW9udGg7IH1cblxuICAgICAgICByZXR1cm4gcGFyc2VkVmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZVllYXIodmFsdWU6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHBhcnNlZFZhbHVlOiBudW1iZXIgPSBwYXJzZUludCh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHBhcnNlZFZhbHVlID09PSAwKSB7IHJldHVybiAxOyB9XG5cbiAgICAgICAgcmV0dXJuIHBhcnNlZFZhbHVlO1xuICAgIH1cbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19EQVRFUElDS0VSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWNEYXRlcGlja2VySW5wdXQpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNvbnN0IE1DX0RBVEVQSUNLRVJfVkFMSURBVE9SUzogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWNEYXRlcGlja2VySW5wdXQpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5cbi8qKlxuICogQW4gZXZlbnQgdXNlZCBmb3IgZGF0ZXBpY2tlciBpbnB1dCBhbmQgY2hhbmdlIGV2ZW50cy4gV2UgZG9uJ3QgYWx3YXlzIGhhdmUgYWNjZXNzIHRvIGEgbmF0aXZlXG4gKiBpbnB1dCBvciBjaGFuZ2UgZXZlbnQgYmVjYXVzZSB0aGUgZXZlbnQgbWF5IGhhdmUgYmVlbiB0cmlnZ2VyZWQgYnkgdGhlIHVzZXIgY2xpY2tpbmcgb24gdGhlXG4gKiBjYWxlbmRhciBwb3B1cC4gRm9yIGNvbnNpc3RlbmN5LCB3ZSBhbHdheXMgdXNlIE1jRGF0ZXBpY2tlcklucHV0RXZlbnQgaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGNsYXNzIE1jRGF0ZXBpY2tlcklucHV0RXZlbnQ8RD4ge1xuICAgIC8qKiBUaGUgbmV3IHZhbHVlIGZvciB0aGUgdGFyZ2V0IGRhdGVwaWNrZXIgaW5wdXQuICovXG4gICAgdmFsdWU6IEQgfCBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGRhdGVwaWNrZXIgaW5wdXQgY29tcG9uZW50IHRoYXQgZW1pdHRlZCB0aGUgZXZlbnQuICovXG4gICAgICAgIHB1YmxpYyB0YXJnZXQ6IE1jRGF0ZXBpY2tlcklucHV0PEQ+LFxuICAgICAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudCBhc3NvY2lhdGVkIHdpdGggdGhlIGRhdGVwaWNrZXIgaW5wdXQuICovXG4gICAgICAgIHB1YmxpYyB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudFxuICAgICkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy50YXJnZXQudmFsdWU7XG4gICAgfVxufVxuXG5sZXQgdW5pcXVlQ29tcG9uZW50SWRTdWZmaXggPSAwO1xuXG5cbi8qKiBEaXJlY3RpdmUgdXNlZCB0byBjb25uZWN0IGFuIGlucHV0IHRvIGEgTWNEYXRlcGlja2VyLiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdpbnB1dFttY0RhdGVwaWNrZXJdJyxcbiAgICBleHBvcnRBczogJ21jRGF0ZXBpY2tlcklucHV0JyxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTUNfREFURVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgTUNfREFURVBJQ0tFUl9WQUxJREFUT1JTLFxuICAgICAgICB7IHByb3ZpZGU6IE1jRm9ybUZpZWxkQ29udHJvbCwgdXNlRXhpc3Rpbmc6IE1jRGF0ZXBpY2tlcklucHV0IH1cbiAgICBdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1pbnB1dCBtYy1kYXRlcGlja2VyJyxcbiAgICAgICAgJ1thdHRyLnBsYWNlaG9sZGVyXSc6ICdwbGFjZWhvbGRlcicsXG4gICAgICAgICdbYXR0ci5yZXF1aXJlZF0nOiAncmVxdWlyZWQnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICAgICAnW2F0dHIubWluXSc6ICdtaW4gPyBkYXRlQWRhcHRlci50b0lzbzg2MDEobWluKSA6IG51bGwnLFxuICAgICAgICAnW2F0dHIubWF4XSc6ICdtYXggPyBkYXRlQWRhcHRlci50b0lzbzg2MDEobWF4KSA6IG51bGwnLFxuICAgICAgICAnW2F0dHIuYXV0b2NvbXBsZXRlXSc6ICdcIm9mZlwiJyxcblxuICAgICAgICAnKHBhc3RlKSc6ICdvblBhc3RlKCRldmVudCknLFxuICAgICAgICAnKGNoYW5nZSknOiAnb25DaGFuZ2UoKScsXG5cbiAgICAgICAgJyhmb2N1cyknOiAnZm9jdXNDaGFuZ2VkKHRydWUpJyxcbiAgICAgICAgJyhibHVyKSc6ICdvbkJsdXIoKScsXG5cbiAgICAgICAgJyhrZXlkb3duKSc6ICdvbktleURvd24oJGV2ZW50KSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jRGF0ZXBpY2tlcklucHV0PEQ+IGltcGxlbWVudHMgTWNGb3JtRmllbGRDb250cm9sPEQ+LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yLCBPbkRlc3Ryb3kge1xuICAgIHJlYWRvbmx5IHN0YXRlQ2hhbmdlczogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICByZWFkb25seSBlcnJvclN0YXRlOiBib29sZWFuO1xuXG4gICAgY29udHJvbFR5cGU6IHN0cmluZyA9ICdkYXRlcGlja2VyJztcblxuICAgIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGRhdGVwaWNrZXI6IE1jRGF0ZXBpY2tlcjxEPjtcblxuICAgIGRhdGVGaWx0ZXI6IChkYXRlOiBEIHwgbnVsbCkgPT4gYm9vbGVhbjtcblxuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSB2YWx1ZSBjaGFuZ2VzIChlaXRoZXIgZHVlIHRvIHVzZXIgaW5wdXQgb3IgcHJvZ3JhbW1hdGljIGNoYW5nZSkuICovXG4gICAgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEQgfCBudWxsPigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIGRpc2FibGVkIHN0YXRlIGhhcyBjaGFuZ2VkICovXG4gICAgZGlzYWJsZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXF1aXJlZDtcbiAgICB9XG5cbiAgICBzZXQgcmVxdWlyZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fcmVxdWlyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlcXVpcmVkOiBib29sZWFuO1xuXG4gICAgLyoqIFRoZSBkYXRlcGlja2VyIHRoYXQgdGhpcyBpbnB1dCBpcyBhc3NvY2lhdGVkIHdpdGguICovXG4gICAgQElucHV0KClcbiAgICBzZXQgbWNEYXRlcGlja2VyKHZhbHVlOiBNY0RhdGVwaWNrZXI8RD4pIHtcbiAgICAgICAgaWYgKCF2YWx1ZSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmRhdGVwaWNrZXIgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5kYXRlcGlja2VyLnJlZ2lzdGVySW5wdXQodGhpcyk7XG4gICAgICAgIHRoaXMuZGF0ZXBpY2tlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXG4gICAgICAgIHRoaXMuZGF0ZXBpY2tlclN1YnNjcmlwdGlvbiA9IHRoaXMuZGF0ZXBpY2tlci5zZWxlY3RlZENoYW5nZWRcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHNlbGVjdGVkOiBEKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHNlbGVjdGVkO1xuICAgICAgICAgICAgICAgIHRoaXMuY3ZhT25DaGFuZ2Uoc2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlQ2hhbmdlLmVtaXQobmV3IE1jRGF0ZXBpY2tlcklucHV0RXZlbnQodGhpcywgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBGdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGZpbHRlciBvdXQgZGF0ZXMgd2l0aGluIHRoZSBkYXRlcGlja2VyLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IG1jRGF0ZXBpY2tlckZpbHRlcih2YWx1ZTogKGRhdGU6IEQgfCBudWxsKSA9PiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZGF0ZUZpbHRlciA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZhbGlkYXRvck9uQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgdmFsdWUoKTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICBsZXQgbmV3VmFsdWUgPSB0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcblxuICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gIW5ld1ZhbHVlIHx8IHRoaXMuZGF0ZUFkYXB0ZXIuaXNWYWxpZChuZXdWYWx1ZSk7XG5cbiAgICAgICAgbmV3VmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbChuZXdWYWx1ZSk7XG5cbiAgICAgICAgY29uc3Qgb2xkRGF0ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIHRoaXMuZm9ybWF0VmFsdWUobmV3VmFsdWUpO1xuXG4gICAgICAgIGlmICghdGhpcy5kYXRlQWRhcHRlci5zYW1lRGF0ZShvbGREYXRlLCBuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdChuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF92YWx1ZTogRCB8IG51bGw7XG5cbiAgICAvKiogVGhlIG1pbmltdW0gdmFsaWQgZGF0ZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBtaW4oKTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWluO1xuICAgIH1cblxuICAgIHNldCBtaW4odmFsdWU6IEQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX21pbiA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcbiAgICAgICAgdGhpcy52YWxpZGF0b3JPbkNoYW5nZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21pbjogRCB8IG51bGw7XG5cbiAgICAvKiogVGhlIG1heGltdW0gdmFsaWQgZGF0ZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBtYXgoKTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4O1xuICAgIH1cblxuICAgIHNldCBtYXgodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX21heCA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcbiAgICAgICAgdGhpcy52YWxpZGF0b3JPbkNoYW5nZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21heDogRCB8IG51bGw7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZGF0ZXBpY2tlci1pbnB1dCBpcyBkaXNhYmxlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgICBpZiAodGhpcy5fZGlzYWJsZWQgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlZENoYW5nZS5lbWl0KG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gbnVsbCBjaGVjayB0aGUgYGJsdXJgIG1ldGhvZCwgYmVjYXVzZSBpdCdzIHVuZGVmaW5lZCBkdXJpbmcgU1NSLlxuICAgICAgICBpZiAobmV3VmFsdWUgJiYgZWxlbWVudC5ibHVyKSB7XG4gICAgICAgICAgICAvLyBOb3JtYWxseSwgbmF0aXZlIGlucHV0IGVsZW1lbnRzIGF1dG9tYXRpY2FsbHkgYmx1ciBpZiB0aGV5IHR1cm4gZGlzYWJsZWQuIFRoaXMgYmVoYXZpb3JcbiAgICAgICAgICAgIC8vIGlzIHByb2JsZW1hdGljLCBiZWNhdXNlIGl0IHdvdWxkIG1lYW4gdGhhdCBpdCB0cmlnZ2VycyBhbm90aGVyIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUsXG4gICAgICAgICAgICAvLyB3aGljaCB0aGVuIGNhdXNlcyBhIGNoYW5nZWQgYWZ0ZXIgY2hlY2tlZCBlcnJvciBpZiB0aGUgaW5wdXQgZWxlbWVudCB3YXMgZm9jdXNlZCBiZWZvcmUuXG4gICAgICAgICAgICBlbGVtZW50LmJsdXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBpZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfVxuXG4gICAgc2V0IGlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faWQgPSB2YWx1ZSB8fCB0aGlzLnVpZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pZDogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgbWNWYWxpZGF0aW9uVG9vbHRpcCh0b29sdGlwOiBNY1Rvb2x0aXApIHtcbiAgICAgICAgaWYgKCF0b29sdGlwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRvb2x0aXAubWNNb3VzZUVudGVyRGVsYXkgPSB2YWxpZGF0aW9uVG9vbHRpcFNob3dEZWxheTtcbiAgICAgICAgdG9vbHRpcC5tY1RyaWdnZXIgPSAnbWFudWFsJztcbiAgICAgICAgdG9vbHRpcC5tY1Rvb2x0aXBDbGFzcyA9ICdtYy10b29sdGlwX3dhcm5pbmcnO1xuXG4gICAgICAgIHRvb2x0aXAuaW5pdEVsZW1lbnRSZWZMaXN0ZW5lcnMoKTtcblxuICAgICAgICB0aGlzLmluY29ycmVjdElucHV0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodG9vbHRpcC5pc1Rvb2x0aXBPcGVuKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICB0b29sdGlwLnNob3coKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0b29sdGlwLmhpZGUoKSwgdmFsaWRhdGlvblRvb2x0aXBIaWRlRGVsYXkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBAT3V0cHV0KCkgaW5jb3JyZWN0SW5wdXQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAvKiogRW1pdHMgd2hlbiBhIGBjaGFuZ2VgIGV2ZW50IGlzIGZpcmVkIG9uIHRoaXMgYDxpbnB1dD5gLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBkYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxNY0RhdGVwaWNrZXJJbnB1dEV2ZW50PEQ+PigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gYW4gYGlucHV0YCBldmVudCBpcyBmaXJlZCBvbiB0aGlzIGA8aW5wdXQ+YC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgZGF0ZUlucHV0ID0gbmV3IEV2ZW50RW1pdHRlcjxNY0RhdGVwaWNrZXJJbnB1dEV2ZW50PEQ+PigpO1xuXG4gICAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMudmlld1ZhbHVlICYmICF0aGlzLmlzQmFkSW5wdXQoKTtcbiAgICB9XG5cbiAgICBnZXQgdmlld1ZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgbmdDb250cm9sKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2w7XG4gICAgfVxuXG4gICAgZ2V0IGlzUmVhZE9ubHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZWFkT25seTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBzZWxlY3Rpb25TdGFydCgpOiBudW1iZXIgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0O1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0IHNlbGVjdGlvblN0YXJ0KHZhbHVlOiBudW1iZXIgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgc2VsZWN0aW9uRW5kKCk6IG51bWJlciB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0IHNlbGVjdGlvbkVuZCh2YWx1ZTogbnVtYmVyIHwgbnVsbCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHVpZCA9IGBtYy1kYXRlcGlja2VyLSR7dW5pcXVlQ29tcG9uZW50SWRTdWZmaXgrK31gO1xuXG4gICAgcHJpdmF0ZSBkYXRlcGlja2VyU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgcHJpdmF0ZSBsb2NhbGVTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICAvKiogV2hldGhlciB0aGUgbGFzdCB2YWx1ZSBzZXQgb24gdGhlIGlucHV0IHdhcyB2YWxpZC4gKi9cbiAgICBwcml2YXRlIGxhc3RWYWx1ZVZhbGlkID0gZmFsc2U7XG5cbiAgICAvKiogVGhlIGNvbWJpbmVkIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoaXMgaW5wdXQuICovXG4gICAgcHJpdmF0ZSByZWFkb25seSB2YWxpZGF0b3I6IFZhbGlkYXRvckZuIHwgbnVsbDtcblxuICAgIHByaXZhdGUgc2VwYXJhdG9yOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIGZpcnN0RGlnaXQ6IERhdGVEaWdpdDtcbiAgICBwcml2YXRlIHNlY29uZERpZ2l0OiBEYXRlRGlnaXQ7XG4gICAgcHJpdmF0ZSB0aGlyZERpZ2l0OiBEYXRlRGlnaXQ7XG5cbiAgICBwcml2YXRlIHNlcGFyYXRvclBvc2l0aW9uczogbnVtYmVyW107XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4sXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByZWFkb25seSBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfREFURV9GT1JNQVRTKSBwcml2YXRlIHJlYWRvbmx5IGRhdGVGb3JtYXRzOiBNY0RhdGVGb3JtYXRzXG4gICAgKSB7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICAgICAgICAgIHRoaXMucGFyc2VWYWxpZGF0b3IsXG4gICAgICAgICAgICB0aGlzLm1pblZhbGlkYXRvcixcbiAgICAgICAgICAgIHRoaXMubWF4VmFsaWRhdG9yLFxuICAgICAgICAgICAgdGhpcy5maWx0ZXJWYWxpZGF0b3JcbiAgICAgICAgXSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmRhdGVBZGFwdGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcignRGF0ZUFkYXB0ZXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5kYXRlRm9ybWF0cykge1xuICAgICAgICAgICAgdGhyb3cgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IoJ01DX0RBVEVfRk9STUFUUycpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRGb3JtYXQoZGF0ZUZvcm1hdHMuZGF0ZUlucHV0KTtcblxuICAgICAgICB0aGlzLmxvY2FsZVN1YnNjcmlwdGlvbiA9IGRhdGVBZGFwdGVyLmxvY2FsZUNoYW5nZXNcbiAgICAgICAgICAgIC5zdWJzY3JpYmUodGhpcy51cGRhdGVMb2NhbGVQYXJhbXMpO1xuICAgIH1cblxuICAgIG9uQ29udGFpbmVyQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBmb2N1c0NoYW5nZWQoaXNGb2N1c2VkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChpc0ZvY3VzZWQgIT09IHRoaXMuZm9jdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gaXNGb2N1c2VkO1xuICAgICAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGF0ZXBpY2tlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLmxvY2FsZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMuZGlzYWJsZWRDaGFuZ2UuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKiogQGRvY3MtcHJpdmF0ZSAqL1xuICAgIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2UoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWxpZGF0b3JPbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8qKiBAZG9jcy1wcml2YXRlICovXG4gICAgdmFsaWRhdGUoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwge1xuICAgICAgICB0aGlzLnNldENvbnRyb2woY29udHJvbCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yID8gdGhpcy52YWxpZGF0b3IoY29udHJvbCkgOiBudWxsO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogRCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLmN2YU9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc1JlYWRPbmx5KSB7IHJldHVybjsgfVxuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNMZXR0ZXJLZXkoZXZlbnQpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLmluY29ycmVjdElucHV0LmVtaXQoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzS2V5Rm9yT3BlbihldmVudCkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuZGF0ZXBpY2tlci5vcGVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0tleUZvckNsb3NlKGV2ZW50KSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5kYXRlcGlja2VyLmNsb3NlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gVEFCKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVwaWNrZXIuY2xvc2UoZmFsc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNLZXlGb3JCeVBhc3MoZXZlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gU1BBQ0UpIHtcbiAgICAgICAgICAgIHRoaXMuc3BhY2VLZXlIYW5kbGVyKGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChbVVBfQVJST1csIERPV05fQVJST1ddLmluY2x1ZGVzKGtleUNvZGUpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLnZlcnRpY2FsQXJyb3dLZXlIYW5kbGVyKGtleUNvZGUpO1xuICAgICAgICB9IGVsc2UgaWYgKFtMRUZUX0FSUk9XLCBSSUdIVF9BUlJPVywgSE9NRSwgUEFHRV9VUCwgRU5ELCBQQUdFX0RPV05dLmluY2x1ZGVzKGtleUNvZGUpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUNhcmV0UG9zaXRpb24oa2V5Q29kZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoL15cXEQkLy50ZXN0KGV2ZW50LmtleSkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5nZXROZXdWYWx1ZShldmVudC5rZXksIHRoaXMuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbHVlID0gdGhpcy5yZXBsYWNlU3ltYm9scyhuZXdWYWx1ZSk7XG5cbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gZm9ybWF0dGVkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZpZXdWYWx1ZShmb3JtYXR0ZWRWYWx1ZSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMub25JbnB1dCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5jb3JyZWN0SW5wdXQuZW1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLm9uSW5wdXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JbnB1dCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5jb3JyZWN0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkVmFsdWUgPSB0aGlzLnJlcGxhY2VTeW1ib2xzKHRoaXMudmlld1ZhbHVlKTtcblxuICAgICAgICBjb25zdCBuZXdUaW1lT2JqID0gdGhpcy5nZXREYXRlRnJvbVN0cmluZyhmb3JtYXR0ZWRWYWx1ZSk7XG4gICAgICAgIHRoaXMubGFzdFZhbHVlVmFsaWQgPSAhIW5ld1RpbWVPYmo7XG5cbiAgICAgICAgaWYgKCFuZXdUaW1lT2JqKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBudWxsO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFZpZXdWYWx1ZSh0aGlzLmdldFRpbWVTdHJpbmdGcm9tRGF0ZShuZXdUaW1lT2JqLCB0aGlzLmRhdGVGb3JtYXRzLmRhdGVJbnB1dCksIHRydWUpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0TmV4dERpZ2l0QnlDdXJzb3IoKHRoaXMuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShuZXdUaW1lT2JqKTtcbiAgICB9XG5cbiAgICBwYXJzZU9uQmx1ciA9ICgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnZpZXdWYWx1ZSkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLmdldERlZmF1bHRWYWx1ZSgpO1xuXG4gICAgICAgIGNvbnN0IHZpZXdEaWdpdHM6IHN0cmluZ1tdID0gdGhpcy52aWV3VmFsdWVcbiAgICAgICAgICAgIC5zcGxpdCh0aGlzLnNlcGFyYXRvcilcbiAgICAgICAgICAgIC5tYXAoKHZhbHVlOiBzdHJpbmcpID0+IHZhbHVlKVxuICAgICAgICAgICAgLmZpbHRlcigodmFsdWUpID0+IHZhbHVlKTtcblxuICAgICAgICBjb25zdCBbZmlyc1ZpZXdEaWdpdCwgc2Vjb25kVmlld0RpZ2l0LCB0aGlyZFZpZXdEaWdpdF0gPSB2aWV3RGlnaXRzO1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1tYWdpYy1udW1iZXJzXG4gICAgICAgIGlmICh2aWV3RGlnaXRzLmxlbmd0aCAhPT0gMykge1xuICAgICAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBudWxsO1xuXG4gICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dCgoKSA9PiB0aGlzLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGVbdGhpcy5maXJzdERpZ2l0LmZ1bGxOYW1lXSA9IHRoaXMuZmlyc3REaWdpdC5wYXJzZShmaXJzVmlld0RpZ2l0KTtcbiAgICAgICAgZGF0ZVt0aGlzLnNlY29uZERpZ2l0LmZ1bGxOYW1lXSA9IHRoaXMuc2Vjb25kRGlnaXQucGFyc2Uoc2Vjb25kVmlld0RpZ2l0KTtcbiAgICAgICAgZGF0ZVt0aGlzLnRoaXJkRGlnaXQuZnVsbE5hbWVdID0gdGhpcy50aGlyZERpZ2l0LnBhcnNlKHRoaXJkVmlld0RpZ2l0KTtcblxuICAgICAgICBjb25zdCBbZGlnaXRXaXRoWWVhciwgdmlld0RpZ2l0V2l0aFllYXJdID0gW3RoaXMuZmlyc3REaWdpdCwgdGhpcy5zZWNvbmREaWdpdCwgdGhpcy50aGlyZERpZ2l0XVxuICAgICAgICAgICAgLnJlZHVjZSgoYWNjLCBkaWdpdCwgaW5kZXgpID0+IGRpZ2l0LnZhbHVlID09PSBEYXRlUGFydHMueWVhciA/IFtkaWdpdCwgdmlld0RpZ2l0c1tpbmRleF1dIDogYWNjLCBbXSk7XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnNcbiAgICAgICAgaWYgKHZpZXdEaWdpdFdpdGhZZWFyLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1tYWdpYy1udW1iZXJzXG4gICAgICAgICAgICBkYXRlLnllYXIgKz0gZGF0ZS55ZWFyIDwgMzAgPyAyMDAwIDogMTkwMDtcbiAgICAgICAgfSBlbHNlIGlmICh2aWV3RGlnaXRXaXRoWWVhci5sZW5ndGggPCBkaWdpdFdpdGhZZWFyLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBudWxsO1xuXG4gICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dCgoKSA9PiB0aGlzLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5ld1RpbWVPYmogPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmNyZWF0ZURhdGVUaW1lKFxuICAgICAgICAgICAgZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCBkYXRlLmRhdGUsIGRhdGUuaG91cnMsIGRhdGUubWludXRlcywgZGF0ZS5zZWNvbmRzLCBkYXRlLm1pbGxpc2Vjb25kc1xuICAgICAgICApKTtcblxuICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gISFuZXdUaW1lT2JqO1xuXG4gICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKHRoaXMuZ2V0VGltZVN0cmluZ0Zyb21EYXRlKG5ld1RpbWVPYmosIHRoaXMuZGF0ZUZvcm1hdHMuZGF0ZUlucHV0KSwgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShuZXdUaW1lT2JqKTtcbiAgICB9XG5cbiAgICBvbkNoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5kYXRlQ2hhbmdlLmVtaXQobmV3IE1jRGF0ZXBpY2tlcklucHV0RXZlbnQodGhpcywgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpKTtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyBibHVyIGV2ZW50cyBvbiB0aGUgaW5wdXQuICovXG4gICAgb25CbHVyKCkge1xuICAgICAgICAvLyBSZWZvcm1hdCB0aGUgaW5wdXQgb25seSBpZiB3ZSBoYXZlIGEgdmFsaWQgdmFsdWUuXG4gICAgICAgIHRoaXMucGFyc2VPbkJsdXIoKTtcblxuICAgICAgICB0aGlzLmZvY3VzQ2hhbmdlZChmYWxzZSk7XG4gICAgfVxuXG4gICAgb25QYXN0ZSgkZXZlbnQpIHtcbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgcmF3VmFsdWUgPSAkZXZlbnQuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0Jyk7XG5cbiAgICAgICAgY29uc3QgbWF0Y2g6IFJlZ0V4cE1hdGNoQXJyYXkgfCBudWxsID0gcmF3VmFsdWUubWF0Y2goL14oPzxmaXJzdD5cXGQrKVxcVyg/PHNlY29uZD5cXGQrKVxcVyg/PHRoaXJkPlxcZCspJC8pO1xuXG4gICAgICAgIGlmICghbWF0Y2g/Lmdyb3Vwcz8uZmlyc3QgfHwgIW1hdGNoPy5ncm91cHM/LnNlY29uZCB8fCAhbWF0Y2g/Lmdyb3Vwcz8udGhpcmQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKHJhd1ZhbHVlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHJhd1ZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFsdWUgPSBbbWF0Y2guZ3JvdXBzLmZpcnN0LCBtYXRjaC5ncm91cHMuc2Vjb25kLCBtYXRjaC5ncm91cHMudGhpcmRdLmpvaW4odGhpcy5zZXBhcmF0b3IpO1xuXG4gICAgICAgIGNvbnN0IG5ld1RpbWVPYmogPSB0aGlzLmdldERhdGVGcm9tU3RyaW5nKHZhbHVlKTtcblxuICAgICAgICBpZiAoIW5ld1RpbWVPYmopIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKHZhbHVlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRWaWV3VmFsdWUodGhpcy5nZXRUaW1lU3RyaW5nRnJvbURhdGUobmV3VGltZU9iaiwgdGhpcy5kYXRlRm9ybWF0cy5kYXRlSW5wdXQpKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKG5ld1RpbWVPYmopO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlTG9jYWxlUGFyYW1zID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldEZvcm1hdCh0aGlzLmRhdGVGb3JtYXRzLmRhdGVJbnB1dCk7XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRGb3JtYXQoZm9ybWF0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXBhcmF0b3IgPSBmb3JtYXQubWF0Y2goL1thQS16Wl0rKD88c2VwYXJhdG9yPlxcV3xcXEQpW2FBLXpaXSsvKSEuZ3JvdXBzLnNlcGFyYXRvcjtcbiAgICAgICAgdGhpcy5zZXBhcmF0b3JQb3NpdGlvbnMgPSBmb3JtYXRcbiAgICAgICAgICAgIC5zcGxpdCgnJylcbiAgICAgICAgICAgIC5yZWR1Y2UoKGFjYywgaXRlbSwgaW5kZXg6IG51bWJlcikgPT4gdGhpcy5zZXBhcmF0b3IgPT09IGl0ZW0gPyBbLi4uYWNjLCBpbmRleCArIDFdIDogYWNjLCBbXSk7XG5cbiAgICAgICAgdGhpcy5nZXREaWdpdFBvc2l0aW9ucyhmb3JtYXQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVmFsdWUobmV3VmFsdWU6IEQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGVBZGFwdGVyLnNhbWVEYXRlKG5ld1ZhbHVlLCB0aGlzLnZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuY3ZhT25DaGFuZ2UobmV3VmFsdWUpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuZGF0ZUlucHV0LmVtaXQobmV3IE1jRGF0ZXBpY2tlcklucHV0RXZlbnQodGhpcywgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0tleUZvckNsb3NlKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogYm9vbGVhbiB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgcmV0dXJuIChldmVudC5hbHRLZXkgJiYgZXZlbnQua2V5Q29kZSA9PT0gVVBfQVJST1cpIHx8IGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzS2V5Rm9yT3BlbihldmVudDogS2V5Ym9hcmRFdmVudCk6IGJvb2xlYW4ge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICAgIHJldHVybiBldmVudC5hbHRLZXkgJiYgZXZlbnQua2V5Q29kZSA9PT0gRE9XTl9BUlJPVztcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzTGV0dGVyS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpc0xldHRlcktleShldmVudCkgJiYgIWV2ZW50LmN0cmxLZXkgJiYgIWV2ZW50Lm1ldGFLZXk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0tleUZvckJ5UGFzcyhldmVudDogS2V5Ym9hcmRFdmVudCk6IGJvb2xlYW4ge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICAgIHJldHVybiAoaGFzTW9kaWZpZXJLZXkoZXZlbnQpICYmIChpc1ZlcnRpY2FsTW92ZW1lbnQoZXZlbnQua2V5Q29kZSkgfHwgaXNIb3Jpem9udGFsTW92ZW1lbnQoZXZlbnQua2V5Q29kZSkpKSB8fFxuICAgICAgICAgICAgZXZlbnQuY3RybEtleSB8fFxuICAgICAgICAgICAgZXZlbnQubWV0YUtleSB8fFxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICAgICAgW0RFTEVURSwgQkFDS1NQQUNFXS5pbmNsdWRlcyhldmVudC5rZXlDb2RlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNwYWNlS2V5SGFuZGxlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvblN0YXJ0ID09PSB0aGlzLnNlbGVjdGlvbkVuZCkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldE5ld1ZhbHVlKGV2ZW50LmtleSwgdGhpcy5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpO1xuICAgICAgICAgICAgdGhpcy5zZXRWaWV3VmFsdWUodmFsdWUpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMub25JbnB1dCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3Rpb25TdGFydCAhPT0gdGhpcy5zZWxlY3Rpb25FbmQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TmV4dERpZ2l0KHRoaXMuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TmV3VmFsdWUoa2V5OiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIFt0aGlzLnZpZXdWYWx1ZS5zbGljZSgwLCBwb3NpdGlvbiksIGtleSwgdGhpcy52aWV3VmFsdWUuc2xpY2UocG9zaXRpb24pXS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFZpZXdWYWx1ZSh2YWx1ZTogc3RyaW5nLCBzYXZlUG9zaXRpb246IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAoc2F2ZVBvc2l0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3Rpb25TdGFydCA9IHRoaXMuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3Rpb25FbmQgPSB0aGlzLnNlbGVjdGlvbkVuZDtcblxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdmFsdWUpO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVwbGFjZVN5bWJvbHModmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICAgICAgLnNwbGl0KHRoaXMuc2VwYXJhdG9yKVxuICAgICAgICAgICAgLm1hcCgocGFydDogc3RyaW5nKSA9PiBwYXJ0LnJlcGxhY2UoL14oWzAtOV0rKVxcVyQvLCAnMCQxJykpXG4gICAgICAgICAgICAuam9pbih0aGlzLnNlcGFyYXRvcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREYXRlRnJvbVN0cmluZyh0aW1lU3RyaW5nOiBzdHJpbmcpOiBEIHwgbnVsbCB7XG4gICAgICAgIGlmICghdGltZVN0cmluZyB8fCB0aW1lU3RyaW5nLmxlbmd0aCA8IHRoaXMuZmlyc3REaWdpdC5sZW5ndGgpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5nZXREZWZhdWx0VmFsdWUoKTtcblxuICAgICAgICBjb25zdCB2aWV3RGlnaXRzOiBzdHJpbmdbXSA9IHRpbWVTdHJpbmdcbiAgICAgICAgICAgIC5zcGxpdCh0aGlzLnNlcGFyYXRvcilcbiAgICAgICAgICAgIC5tYXAoKHZhbHVlOiBzdHJpbmcpID0+IHZhbHVlKTtcblxuICAgICAgICBjb25zdCBbZmlyc1ZpZXdEaWdpdCwgc2Vjb25kVmlld0RpZ2l0LCB0aGlyZFZpZXdEaWdpdF0gPSB2aWV3RGlnaXRzO1xuXG4gICAgICAgIGlmICh2aWV3RGlnaXRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgaWYgKGZpcnNWaWV3RGlnaXQubGVuZ3RoIDwgdGhpcy5maXJzdERpZ2l0Lmxlbmd0aCkgeyByZXR1cm4gbnVsbDsgfVxuXG5cbiAgICAgICAgICAgIGRhdGVbdGhpcy5maXJzdERpZ2l0LmZ1bGxOYW1lXSA9IHRoaXMuZmlyc3REaWdpdC5wYXJzZShmaXJzVmlld0RpZ2l0KTtcbiAgICAgICAgICAgIGRhdGUubW9udGggPSAwO1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbWFnaWMtbnVtYmVyc1xuICAgICAgICB9IGVsc2UgaWYgKHZpZXdEaWdpdHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICBpZiAoZmlyc1ZpZXdEaWdpdC5sZW5ndGggPCB0aGlzLmZpcnN0RGlnaXQubGVuZ3RoIHx8IHNlY29uZFZpZXdEaWdpdC5sZW5ndGggPCB0aGlzLnNlY29uZERpZ2l0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRlW3RoaXMuZmlyc3REaWdpdC5mdWxsTmFtZV0gPSB0aGlzLmZpcnN0RGlnaXQucGFyc2UoZmlyc1ZpZXdEaWdpdCk7XG4gICAgICAgICAgICBkYXRlW3RoaXMuc2Vjb25kRGlnaXQuZnVsbE5hbWVdID0gdGhpcy5zZWNvbmREaWdpdC5wYXJzZShzZWNvbmRWaWV3RGlnaXQpO1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbWFnaWMtbnVtYmVyc1xuICAgICAgICB9IGVsc2UgaWYgKHZpZXdEaWdpdHMubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgZmlyc1ZpZXdEaWdpdC5sZW5ndGggPCB0aGlzLmZpcnN0RGlnaXQubGVuZ3RoIHx8XG4gICAgICAgICAgICAgICAgc2Vjb25kVmlld0RpZ2l0Lmxlbmd0aCA8IHRoaXMuc2Vjb25kRGlnaXQubGVuZ3RoIHx8XG4gICAgICAgICAgICAgICAgdGhpcmRWaWV3RGlnaXQubGVuZ3RoIDwgdGhpcy50aGlyZERpZ2l0Lmxlbmd0aFxuICAgICAgICAgICAgKSB7IHJldHVybiBudWxsOyB9XG5cbiAgICAgICAgICAgIGRhdGVbdGhpcy5maXJzdERpZ2l0LmZ1bGxOYW1lXSA9IHRoaXMuZmlyc3REaWdpdC5wYXJzZShmaXJzVmlld0RpZ2l0KTtcbiAgICAgICAgICAgIGRhdGVbdGhpcy5zZWNvbmREaWdpdC5mdWxsTmFtZV0gPSB0aGlzLnNlY29uZERpZ2l0LnBhcnNlKHNlY29uZFZpZXdEaWdpdCk7XG4gICAgICAgICAgICBkYXRlW3RoaXMudGhpcmREaWdpdC5mdWxsTmFtZV0gPSB0aGlzLnRoaXJkRGlnaXQucGFyc2UodGhpcmRWaWV3RGlnaXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5jcmVhdGVEYXRlVGltZShcbiAgICAgICAgICAgIGRhdGUueWVhciwgZGF0ZS5tb250aCwgZGF0ZS5kYXRlLCBkYXRlLmhvdXJzLCBkYXRlLm1pbnV0ZXMsIGRhdGUuc2Vjb25kcywgZGF0ZS5taWxsaXNlY29uZHNcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREZWZhdWx0VmFsdWUoKSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IHRoaXMudmFsdWUgfHwgdGhpcy5kYXRlQWRhcHRlci50b2RheSgpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB5ZWFyOiB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIoZGVmYXVsdFZhbHVlKSxcbiAgICAgICAgICAgIG1vbnRoOiB0aGlzLmRhdGVBZGFwdGVyLmdldE1vbnRoKGRlZmF1bHRWYWx1ZSksXG4gICAgICAgICAgICBkYXRlOiB0aGlzLmRhdGVBZGFwdGVyLmdldERhdGUoZGVmYXVsdFZhbHVlKSxcbiAgICAgICAgICAgIGhvdXJzOiB0aGlzLmRhdGVBZGFwdGVyLmdldEhvdXJzKGRlZmF1bHRWYWx1ZSksXG4gICAgICAgICAgICBtaW51dGVzOiB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbnV0ZXMoZGVmYXVsdFZhbHVlKSxcbiAgICAgICAgICAgIHNlY29uZHM6IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0U2Vjb25kcyhkZWZhdWx0VmFsdWUpLFxuICAgICAgICAgICAgbWlsbGlzZWNvbmRzOiB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbGxpc2Vjb25kcyhkZWZhdWx0VmFsdWUpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUaW1lU3RyaW5nRnJvbURhdGUodmFsdWU6IEQgfCBudWxsLCB0aW1lRm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXZhbHVlIHx8ICF0aGlzLmRhdGVBZGFwdGVyLmlzVmFsaWQodmFsdWUpKSB7IHJldHVybiAnJzsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVBZGFwdGVyLmZvcm1hdCh2YWx1ZSwgdGltZUZvcm1hdCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREYXRlRWRpdE1ldHJpY3MoY3Vyc29yUG9zaXRpb246IG51bWJlcik6IFtcbiAgICAgICAgbW9kaWZpZWRUaW1lUGFydDogRGF0ZVBhcnRzLFxuICAgICAgICBjdXJzb3JTdGFydFBvc2l0aW9uOiBudW1iZXIsXG4gICAgICAgIGN1cnNvckVuZFBvc2l0aW9uOiBudW1iZXJcbiAgICBdIHtcbiAgICAgICAgZm9yIChjb25zdCBkaWdpdCBvZiBbdGhpcy5maXJzdERpZ2l0LCB0aGlzLnNlY29uZERpZ2l0LCB0aGlzLnRoaXJkRGlnaXRdKSB7XG4gICAgICAgICAgICBpZiAoY3Vyc29yUG9zaXRpb24gPj0gZGlnaXQuc3RhcnQgJiYgY3Vyc29yUG9zaXRpb24gPD0gZGlnaXQuZW5kKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtkaWdpdC52YWx1ZSwgZGlnaXQuc3RhcnQsIGRpZ2l0LmVuZF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW3RoaXMudGhpcmREaWdpdC52YWx1ZSwgdGhpcy50aGlyZERpZ2l0LnN0YXJ0LCB0aGlzLnRoaXJkRGlnaXQuZW5kXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluY3JlbWVudERhdGUoZGF0ZVZhbDogRCwgd2hhdFRvSW5jcmVtZW50OiBEYXRlUGFydHMpOiBEIHtcbiAgICAgICAgbGV0IHllYXIgPSB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIoZGF0ZVZhbCk7XG4gICAgICAgIGxldCBtb250aCA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TW9udGgoZGF0ZVZhbCk7XG4gICAgICAgIGxldCBkYXkgPSB0aGlzLmRhdGVBZGFwdGVyLmdldERhdGUoZGF0ZVZhbCk7XG5cbiAgICAgICAgc3dpdGNoICh3aGF0VG9JbmNyZW1lbnQpIHtcbiAgICAgICAgICAgIGNhc2UgRGF0ZVBhcnRzLmRheTpcbiAgICAgICAgICAgICAgICBkYXkrKztcblxuICAgICAgICAgICAgICAgIGlmIChkYXkgPiB0aGlzLmRhdGVBZGFwdGVyLmdldE51bURheXNJbk1vbnRoKGRhdGVWYWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRheSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIERhdGVQYXJ0cy5tb250aDpcbiAgICAgICAgICAgICAgICBtb250aCsrO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1vbnRoID4gdGhpcy5kYXRlQWRhcHRlci5sYXN0TW9udGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9udGggPSB0aGlzLmRhdGVBZGFwdGVyLmZpcnN0TW9udGg7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdERheSA9IHRoaXMuZ2V0TGFzdERheUZvcih5ZWFyLCBtb250aCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF5ID4gbGFzdERheSkge1xuICAgICAgICAgICAgICAgICAgICBkYXkgPSBsYXN0RGF5O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBEYXRlUGFydHMueWVhcjpcbiAgICAgICAgICAgICAgICB5ZWFyKys7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TGFzdERheUZvcih5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlQWRhcHRlci5nZXROdW1EYXlzSW5Nb250aCh0aGlzLmNyZWF0ZURhdGUoeWVhciwgbW9udGgsIDEpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlY3JlbWVudERhdGUoZGF0ZVZhbDogRCwgd2hhdFRvRGVjcmVtZW50OiBEYXRlUGFydHMpOiBEIHtcbiAgICAgICAgbGV0IHllYXIgPSB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIoZGF0ZVZhbCk7XG4gICAgICAgIGxldCBtb250aCA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TW9udGgoZGF0ZVZhbCk7XG4gICAgICAgIGxldCBkYXkgPSB0aGlzLmRhdGVBZGFwdGVyLmdldERhdGUoZGF0ZVZhbCk7XG5cbiAgICAgICAgc3dpdGNoICh3aGF0VG9EZWNyZW1lbnQpIHtcbiAgICAgICAgICAgIGNhc2UgRGF0ZVBhcnRzLmRheTpcbiAgICAgICAgICAgICAgICBkYXktLTtcblxuICAgICAgICAgICAgICAgIGlmIChkYXkgPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGRheSA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TnVtRGF5c0luTW9udGgoZGF0ZVZhbCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIERhdGVQYXJ0cy5tb250aDpcbiAgICAgICAgICAgICAgICBtb250aC0tO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1vbnRoIDwgdGhpcy5kYXRlQWRhcHRlci5maXJzdE1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vbnRoID0gdGhpcy5kYXRlQWRhcHRlci5sYXN0TW9udGg7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdERheSA9IHRoaXMuZ2V0TGFzdERheUZvcih5ZWFyLCBtb250aCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF5ID4gbGFzdERheSkge1xuICAgICAgICAgICAgICAgICAgICBkYXkgPSBsYXN0RGF5O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBEYXRlUGFydHMueWVhcjpcbiAgICAgICAgICAgICAgICB5ZWFyLS07XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdmVydGljYWxBcnJvd0tleUhhbmRsZXIoa2V5Q29kZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy52YWx1ZSkgeyByZXR1cm47IH1cblxuICAgICAgICBsZXQgY2hhbmdlZFRpbWU7XG5cbiAgICAgICAgY29uc3QgW21vZGlmaWVkVGltZVBhcnQsIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmRdID0gdGhpcy5nZXREYXRlRWRpdE1ldHJpY3ModGhpcy5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpO1xuXG4gICAgICAgIGlmIChrZXlDb2RlID09PSBVUF9BUlJPVykge1xuICAgICAgICAgICAgY2hhbmdlZFRpbWUgPSB0aGlzLmluY3JlbWVudERhdGUodGhpcy52YWx1ZSwgbW9kaWZpZWRUaW1lUGFydCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5Q29kZSA9PT0gRE9XTl9BUlJPVykge1xuICAgICAgICAgICAgY2hhbmdlZFRpbWUgPSB0aGlzLmRlY3JlbWVudERhdGUodGhpcy52YWx1ZSwgbW9kaWZpZWRUaW1lUGFydCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbHVlID0gY2hhbmdlZFRpbWU7XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0O1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZDtcblxuICAgICAgICB0aGlzLm9uQ2hhbmdlKCk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZUNhcmV0UG9zaXRpb24oa2V5Q29kZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy52YWx1ZSkgeyByZXR1cm47IH1cblxuICAgICAgICBsZXQgY3Vyc29yUG9zID0gdGhpcy5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXI7XG5cbiAgICAgICAgaWYgKFtIT01FLCBQQUdFX1VQXS5pbmNsdWRlcyhrZXlDb2RlKSkge1xuICAgICAgICAgICAgY3Vyc29yUG9zID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChbRU5ELCBQQUdFX0RPV05dLmluY2x1ZGVzKGtleUNvZGUpKSB7XG4gICAgICAgICAgICBjdXJzb3JQb3MgPSB0aGlzLnZpZXdWYWx1ZS5sZW5ndGg7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gTEVGVF9BUlJPVykge1xuICAgICAgICAgICAgY3Vyc29yUG9zID0gY3Vyc29yUG9zID09PSAwID8gdGhpcy52aWV3VmFsdWUubGVuZ3RoIDogY3Vyc29yUG9zIC0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBSSUdIVF9BUlJPVykge1xuICAgICAgICAgICAgY29uc3QgbmV4dFNlcGFyYXRvclBvczogbnVtYmVyID0gdGhpcy52aWV3VmFsdWUuaW5kZXhPZih0aGlzLnNlcGFyYXRvciwgY3Vyc29yUG9zKTtcblxuICAgICAgICAgICAgY3Vyc29yUG9zID0gbmV4dFNlcGFyYXRvclBvcyA/IG5leHRTZXBhcmF0b3JQb3MgKyAxIDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VsZWN0RGlnaXRCeUN1cnNvcihjdXJzb3JQb3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2VsZWN0RGlnaXRCeUN1cnNvcihjdXJzb3JQb3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFssIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmRdID0gdGhpcy5nZXREYXRlRWRpdE1ldHJpY3MoY3Vyc29yUG9zKTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2VsZWN0TmV4dERpZ2l0QnlDdXJzb3IoY3Vyc29yUG9zOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBbLCAsIGVuZFBvc2l0aW9uT2ZDdXJyZW50RGlnaXRdID0gdGhpcy5nZXREYXRlRWRpdE1ldHJpY3MoY3Vyc29yUG9zKTtcbiAgICAgICAgICAgIGNvbnN0IFssIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmRdID0gdGhpcy5nZXREYXRlRWRpdE1ldHJpY3MoZW5kUG9zaXRpb25PZkN1cnJlbnREaWdpdCArIDEpO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZWxlY3ROZXh0RGlnaXQoY3Vyc29yUG9zOiBudW1iZXIsIGN5Y2xlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsYXN0VmFsdWUgPSBjeWNsZSA/IDAgOiBjdXJzb3JQb3M7XG4gICAgICAgICAgICBjb25zdCBuZXh0U2VwYXJhdG9yUG9zOiBudW1iZXIgPSB0aGlzLnZpZXdWYWx1ZS5pbmRleE9mKHRoaXMuc2VwYXJhdG9yLCBjdXJzb3JQb3MpO1xuXG4gICAgICAgICAgICBjb25zdCBuZXdDdXJzb3JQb3MgPSBuZXh0U2VwYXJhdG9yUG9zID4gMCA/IG5leHRTZXBhcmF0b3JQb3MgKyAxIDogbGFzdFZhbHVlO1xuXG4gICAgICAgICAgICBjb25zdCBbLCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kXSA9IHRoaXMuZ2V0RGF0ZUVkaXRNZXRyaWNzKG5ld0N1cnNvclBvcyk7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IGlzIGludmFsaWQgYmFzZWQgb24gdGhlIG5hdGl2ZSB2YWxpZGF0aW9uLiAqL1xuICAgIHByaXZhdGUgaXNCYWRJbnB1dCgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgdmFsaWRpdHkgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS52YWxpZGl0eTtcblxuICAgICAgICByZXR1cm4gdmFsaWRpdHkgJiYgdmFsaWRpdHkuYmFkSW5wdXQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjdmFPbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAgIHByaXZhdGUgdmFsaWRhdG9yT25DaGFuZ2UgPSAoKSA9PiB7fTtcblxuICAgIC8qKiBUaGUgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3Igd2hldGhlciB0aGUgaW5wdXQgcGFyc2VzLiAqL1xuICAgIHByaXZhdGUgcGFyc2VWYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9jdXNlZCB8fFxuICAgICAgICAgICAgdGhpcy5lbXB0eSB8fFxuICAgICAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA/IG51bGwgOiB7IG1jRGF0ZXBpY2tlclBhcnNlOiB7IHRleHQ6IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlIH0gfTtcbiAgICB9XG5cbiAgICAvKiogVGhlIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoZSBtaW4gZGF0ZS4gKi9cbiAgICBwcml2YXRlIG1pblZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICBjb25zdCBjb250cm9sVmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWUpKTtcblxuICAgICAgICByZXR1cm4gKCF0aGlzLm1pbiB8fCAhY29udHJvbFZhbHVlIHx8XG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmNvbXBhcmVEYXRlKHRoaXMubWluLCBjb250cm9sVmFsdWUpIDw9IDApID9cbiAgICAgICAgICAgIG51bGwgOiB7IG1jRGF0ZXBpY2tlck1pbjogeyBtaW46IHRoaXMubWluLCBhY3R1YWw6IGNvbnRyb2xWYWx1ZSB9IH07XG4gICAgfVxuXG4gICAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGUgbWF4IGRhdGUuICovXG4gICAgcHJpdmF0ZSBtYXhWYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgICAgY29uc3QgY29udHJvbFZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlKSk7XG5cbiAgICAgICAgcmV0dXJuICghdGhpcy5tYXggfHwgIWNvbnRyb2xWYWx1ZSB8fFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5jb21wYXJlRGF0ZSh0aGlzLm1heCwgY29udHJvbFZhbHVlKSA+PSAwKSA/XG4gICAgICAgICAgICBudWxsIDogeyBtY0RhdGVwaWNrZXJNYXg6IHsgbWF4OiB0aGlzLm1heCwgYWN0dWFsOiBjb250cm9sVmFsdWUgfSB9O1xuICAgIH1cblxuICAgIC8qKiBUaGUgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhlIGRhdGUgZmlsdGVyLiAqL1xuICAgIHByaXZhdGUgZmlsdGVyVmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZSkpO1xuXG4gICAgICAgIHJldHVybiAhdGhpcy5kYXRlRmlsdGVyIHx8ICFjb250cm9sVmFsdWUgfHwgdGhpcy5kYXRlRmlsdGVyKGNvbnRyb2xWYWx1ZSkgP1xuICAgICAgICAgICAgbnVsbCA6IHsgbWNEYXRlcGlja2VyRmlsdGVyOiB0cnVlIH07XG4gICAgfVxuXG4gICAgLyoqIEZvcm1hdHMgYSB2YWx1ZSBhbmQgc2V0cyBpdCBvbiB0aGUgaW5wdXQgZWxlbWVudC4gKi9cbiAgICBwcml2YXRlIGZvcm1hdFZhbHVlKHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRWYWx1ZSA9IHZhbHVlID8gdGhpcy5kYXRlQWRhcHRlci5mb3JtYXQodmFsdWUsIHRoaXMuZGF0ZUZvcm1hdHMuZGF0ZUlucHV0KSA6ICcnO1xuXG4gICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKGZvcm1hdHRlZFZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMgVGhlIGdpdmVuIG9iamVjdCBpZiBpdCBpcyBib3RoIGEgZGF0ZSBpbnN0YW5jZSBhbmQgdmFsaWQsIG90aGVyd2lzZSBudWxsLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0VmFsaWREYXRlT3JOdWxsKG9iajogYW55KTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gKHRoaXMuZGF0ZUFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJiB0aGlzLmRhdGVBZGFwdGVyLmlzVmFsaWQob2JqKSkgPyBvYmogOiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Q29udHJvbChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRyb2wpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbCA9IGNvbnRyb2w7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERpZ2l0UG9zaXRpb25zKGZvcm1hdDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdEluTG93ZXJDYXNlID0gZm9ybWF0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgZm9ybWF0SW5Mb3dlckNhc2VcbiAgICAgICAgICAgIC5zcGxpdCgnJylcbiAgICAgICAgICAgIC5yZWR1Y2UoXG4gICAgICAgICAgICAgICAgKHsgcHJldiwgbGVuZ3RoLCBzdGFydCB9LCB2YWx1ZTogc3RyaW5nLCBpbmRleDogbnVtYmVyLCBhcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSB0aGlzLnNlcGFyYXRvciB8fCAoYXJyLmxlbmd0aCAtIDEpID09PSBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmZpcnN0RGlnaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0RGlnaXQgPSBuZXcgRGF0ZURpZ2l0KHByZXYsIHN0YXJ0LCBsZW5ndGgsIHRoaXMuZGF0ZUFkYXB0ZXIuZmlyc3RNb250aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnNlY29uZERpZ2l0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWNvbmREaWdpdCA9IG5ldyBEYXRlRGlnaXQocHJldiwgc3RhcnQsIGxlbmd0aCwgdGhpcy5kYXRlQWRhcHRlci5maXJzdE1vbnRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMudGhpcmREaWdpdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGhpcmREaWdpdCA9IG5ldyBEYXRlRGlnaXQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXYsIHN0YXJ0LCBhcnIubGVuZ3RoIC0gc3RhcnQsIHRoaXMuZGF0ZUFkYXB0ZXIuZmlyc3RNb250aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlOm5vLXBhcmFtZXRlci1yZWFzc2lnbm1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydCA9IGluZGV4ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCsrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgcHJldjogdmFsdWUsIGxlbmd0aCwgc3RhcnQgfTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHsgbGVuZ3RoOiAwLCBzdGFydDogMCB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgIGlmICghdGhpcy5maXJzdERpZ2l0IHx8ICF0aGlzLnNlY29uZERpZ2l0IHx8ICF0aGlzLnRoaXJkRGlnaXQpIHtcbiAgICAgICAgICAgIEVycm9yKGBDYW4nIHQgdXNlIHRoaXMgZm9ybWF0OiAke2Zvcm1hdH1gKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlRGF0ZSh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKTogRCB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVBZGFwdGVyLmNyZWF0ZURhdGVUaW1lKFxuICAgICAgICAgICAgeWVhcixcbiAgICAgICAgICAgIG1vbnRoLFxuICAgICAgICAgICAgZGF5LFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRIb3Vycyh0aGlzLnZhbHVlIGFzIEQpLFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRNaW51dGVzKHRoaXMudmFsdWUgYXMgRCksXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldFNlY29uZHModGhpcy52YWx1ZSBhcyBEKSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TWlsbGlzZWNvbmRzKHRoaXMudmFsdWUgYXMgRClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvcnJlY3RDdXJzb3JQb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uU3RhcnQgJiYgdGhpcy5zZXBhcmF0b3JQb3NpdGlvbnMuaW5jbHVkZXModGhpcy5zZWxlY3Rpb25TdGFydCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhcnQgPSB0aGlzLnNlbGVjdGlvblN0YXJ0IC0gMTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==