// @ts-nocheck
// tslint:disable:no-empty
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Output, Renderer2 } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { DateAdapter, MC_DATE_FORMATS } from '@ptsecurity/cdk/datetime';
import { UP_ARROW, RIGHT_ARROW, DOWN_ARROW, LEFT_ARROW, END, PAGE_DOWN, HOME, PAGE_UP, SPACE, TAB, ESCAPE, hasModifierKey, isHorizontalMovement, isLetterKey, isVerticalMovement } from '@ptsecurity/cdk/keycodes';
import { validationTooltipHideDelay, validationTooltipShowDelay } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { McWarningTooltipTrigger } from '@ptsecurity/mosaic/tooltip';
import { Subject, Subscription } from 'rxjs';
import { createMissingDateImplError } from './datepicker-errors';
import { McDatepicker } from './datepicker.component';
import * as i0 from "@angular/core";
import * as i1 from "@ptsecurity/cdk/datetime";
// tslint:disable:naming-convention
var DateParts;
(function (DateParts) {
    DateParts["year"] = "y";
    DateParts["month"] = "m";
    DateParts["day"] = "d";
})(DateParts || (DateParts = {}));
export const MAX_YEAR = 9999;
class DateDigit {
    constructor(value, start, length) {
        this.value = value;
        this.start = start;
        this.length = length;
        this.maxDays = 31;
        this.maxMonth = 12;
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
        if (parsedValue > MAX_YEAR) {
            return MAX_YEAR;
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
                if (!this.viewValue) {
                    this._value = null;
                    this.cvaOnChange(null);
                }
                this.control.updateValueAndValidity({ emitEvent: false });
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
            const newTimeObj = this.getValidDateOrNull(this.dateAdapter.createDateTime(date.year, date.month - 1, date.date, date.hours, date.minutes, date.seconds, date.milliseconds));
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
    toISO8601(value) {
        return this.dateAdapter.toIso8601(value);
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
        this.control.updateValueAndValidity({ emitEvent: false });
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
            event.metaKey;
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
            date.month = 1;
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
        return this.getValidDateOrNull(this.dateAdapter.createDateTime(date.year, date.month - 1, date.date, date.hours, date.minutes, date.seconds, date.milliseconds));
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
                // tslint:disable-next-line:no-magic-numbers
                if (month > 11) {
                    month = 0;
                }
                const lastDay = this.getLastDayFor(year, month);
                if (day > lastDay) {
                    day = lastDay;
                }
                break;
            case DateParts.year:
                year++;
                if (year > MAX_YEAR) {
                    year = 1;
                }
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
                if (month < 0) {
                    // tslint:disable-next-line:no-magic-numbers
                    month = 11;
                }
                const lastDay = this.getLastDayFor(year, month);
                if (day > lastDay) {
                    day = lastDay;
                }
                break;
            case DateParts.year:
                year--;
                if (year < 1) {
                    year = MAX_YEAR;
                }
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
        this.cvaOnChange(changedTime);
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
                    this.firstDigit = new DateDigit(prev, start, length);
                }
                else if (!this.secondDigit) {
                    this.secondDigit = new DateDigit(prev, start, length);
                }
                else if (!this.thirdDigit) {
                    this.thirdDigit = new DateDigit(prev, start, arr.length - start);
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
/** @nocollapse */ McDatepickerInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDatepickerInput, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.DateAdapter, optional: true }, { token: MC_DATE_FORMATS, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McDatepickerInput.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McDatepickerInput, selector: "input[mcDatepicker]", inputs: { placeholder: "placeholder", required: "required", mcDatepicker: "mcDatepicker", mcDatepickerFilter: "mcDatepickerFilter", value: "value", min: "min", max: "max", disabled: "disabled", id: "id", mcValidationTooltip: "mcValidationTooltip" }, outputs: { incorrectInput: "incorrectInput", dateChange: "dateChange", dateInput: "dateInput" }, host: { listeners: { "paste": "onPaste($event)", "change": "onChange()", "focus": "focusChanged(true)", "blur": "onBlur()", "keydown": "onKeyDown($event)" }, properties: { "attr.placeholder": "placeholder", "attr.required": "required", "attr.disabled": "disabled || null", "attr.min": "min ? toISO8601(min) : null", "attr.max": "max ? toISO8601(max) : null", "attr.autocomplete": "\"off\"" }, classAttribute: "mc-input mc-datepicker" }, providers: [
        MC_DATEPICKER_VALUE_ACCESSOR,
        MC_DATEPICKER_VALIDATORS,
        { provide: McFormFieldControl, useExisting: McDatepickerInput }
    ], exportAs: ["mcDatepickerInput"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDatepickerInput, decorators: [{
            type: Directive,
            args: [{
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
                        '[attr.min]': 'min ? toISO8601(min) : null',
                        '[attr.max]': 'max ? toISO8601(max) : null',
                        '[attr.autocomplete]': '"off"',
                        '(paste)': 'onPaste($event)',
                        '(change)': 'onChange()',
                        '(focus)': 'focusChanged(true)',
                        '(blur)': 'onBlur()',
                        '(keydown)': 'onKeyDown($event)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.DateAdapter, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MC_DATE_FORMATS]
                }] }]; }, propDecorators: { placeholder: [{
                type: Input
            }], required: [{
                type: Input
            }], mcDatepicker: [{
                type: Input
            }], mcDatepickerFilter: [{
                type: Input
            }], value: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], disabled: [{
                type: Input
            }], id: [{
                type: Input
            }], mcValidationTooltip: [{
                type: Input
            }], incorrectInput: [{
                type: Output
            }], dateChange: [{
                type: Output
            }], dateInput: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pbnB1dC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvZGF0ZXBpY2tlci9kYXRlcGlja2VyLWlucHV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsMEJBQTBCO0FBQzFCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBR0gsYUFBYSxFQUNiLGlCQUFpQixFQUlqQixVQUFVLEVBQ2IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBaUIsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RixPQUFPLEVBR0gsUUFBUSxFQUNSLFdBQVcsRUFDWCxVQUFVLEVBQ1YsVUFBVSxFQUNWLEdBQUcsRUFDSCxTQUFTLEVBQ1QsSUFBSSxFQUNKLE9BQU8sRUFDUCxLQUFLLEVBQ0wsR0FBRyxFQUNILE1BQU0sRUFDTixjQUFjLEVBQ2Qsb0JBQW9CLEVBQ3BCLFdBQVcsRUFDWCxrQkFBa0IsRUFDckIsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUU3QyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFB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N0IsaUJBQWlCLEVBQUUsa0JBQWtCO3dCQUNyQyxZQUFZLEVBQUUsNkJBQTZCO3dCQUMzQyxZQUFZLEVBQUUsNkJBQTZCO3dCQUMzQyxxQkFBcUIsRUFBRSxPQUFPO3dCQUU5QixTQUFTLEVBQUUsaUJBQWlCO3dCQUM1QixVQUFVLEVBQUUsWUFBWTt3QkFFeEIsU0FBUyxFQUFFLG9CQUFvQjt3QkFDL0IsUUFBUSxFQUFFLFVBQVU7d0JBRXBCLFdBQVcsRUFBRSxtQkFBbUI7cUJBQ25DO2lCQUNKOzswQkFtT1EsUUFBUTs7MEJBQ1IsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxlQUFlOzRDQWhOOUIsV0FBVztzQkFBbkIsS0FBSztnQkFHRixRQUFRO3NCQURYLEtBQUs7Z0JBYUYsWUFBWTtzQkFEZixLQUFLO2dCQW1CRixrQkFBa0I7c0JBRHJCLEtBQUs7Z0JBUUYsS0FBSztzQkFEUixLQUFLO2dCQXlCRixHQUFHO3NCQUROLEtBQUs7Z0JBY0YsR0FBRztzQkFETixLQUFLO2dCQWNGLFFBQVE7c0JBRFgsS0FBSztnQkEwQkYsRUFBRTtzQkFETCxLQUFLO2dCQVlGLG1CQUFtQjtzQkFEdEIsS0FBSztnQkFrQkksY0FBYztzQkFBdkIsTUFBTTtnQkFHWSxVQUFVO3NCQUE1QixNQUFNO2dCQUdZLFNBQVM7c0JBQTNCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAdHMtbm9jaGVja1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1lbXB0eVxuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBBYnN0cmFjdENvbnRyb2wsXG4gICAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgTkdfVkFMSURBVE9SUyxcbiAgICBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICBWYWxpZGF0aW9uRXJyb3JzLFxuICAgIFZhbGlkYXRvcixcbiAgICBWYWxpZGF0b3JGbixcbiAgICBWYWxpZGF0b3JzXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERhdGVBZGFwdGVyLCBNQ19EQVRFX0ZPUk1BVFMsIE1jRGF0ZUZvcm1hdHMgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvZGF0ZXRpbWUnO1xuaW1wb3J0IHtcbiAgICBCQUNLU1BBQ0UsXG4gICAgREVMRVRFLFxuICAgIFVQX0FSUk9XLFxuICAgIFJJR0hUX0FSUk9XLFxuICAgIERPV05fQVJST1csXG4gICAgTEVGVF9BUlJPVyxcbiAgICBFTkQsXG4gICAgUEFHRV9ET1dOLFxuICAgIEhPTUUsXG4gICAgUEFHRV9VUCxcbiAgICBTUEFDRSxcbiAgICBUQUIsXG4gICAgRVNDQVBFLFxuICAgIGhhc01vZGlmaWVyS2V5LFxuICAgIGlzSG9yaXpvbnRhbE1vdmVtZW50LFxuICAgIGlzTGV0dGVyS2V5LFxuICAgIGlzVmVydGljYWxNb3ZlbWVudFxufSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgdmFsaWRhdGlvblRvb2x0aXBIaWRlRGVsYXksIHZhbGlkYXRpb25Ub29sdGlwU2hvd0RlbGF5IH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNGb3JtRmllbGRDb250cm9sIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgTWNXYXJuaW5nVG9vbHRpcFRyaWdnZXIgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvdG9vbHRpcCc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IgfSBmcm9tICcuL2RhdGVwaWNrZXItZXJyb3JzJztcbmltcG9ydCB7IE1jRGF0ZXBpY2tlciB9IGZyb20gJy4vZGF0ZXBpY2tlci5jb21wb25lbnQnO1xuXG5cbi8vIHRzbGludDpkaXNhYmxlOm5hbWluZy1jb252ZW50aW9uXG5lbnVtIERhdGVQYXJ0cyB7XG4gICAgeWVhciA9ICd5JyxcbiAgICBtb250aCA9ICdtJyxcbiAgICBkYXkgPSAnZCdcbn1cblxuZXhwb3J0IGNvbnN0IE1BWF9ZRUFSID0gOTk5OTtcblxuY2xhc3MgRGF0ZURpZ2l0IHtcbiAgICBtYXhEYXlzID0gMzE7XG4gICAgbWF4TW9udGggPSAxMjtcblxuICAgIHBhcnNlOiAodmFsdWU6IHN0cmluZykgPT4gbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBEYXRlUGFydHMsIHB1YmxpYyBzdGFydDogbnVtYmVyLCBwdWJsaWMgbGVuZ3RoOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSBEYXRlUGFydHMuZGF5KSB7XG4gICAgICAgICAgICB0aGlzLnBhcnNlID0gdGhpcy5wYXJzZURheTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gRGF0ZVBhcnRzLm1vbnRoKSB7XG4gICAgICAgICAgICB0aGlzLnBhcnNlID0gdGhpcy5wYXJzZU1vbnRoO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBEYXRlUGFydHMueWVhcikge1xuICAgICAgICAgICAgdGhpcy5wYXJzZSA9IHRoaXMucGFyc2VZZWFyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGVuZCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGFydCArIHRoaXMubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldCBpc0RheSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgPT09IERhdGVQYXJ0cy5kYXk7XG4gICAgfVxuXG4gICAgZ2V0IGlzTW9udGgoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlID09PSBEYXRlUGFydHMubW9udGg7XG4gICAgfVxuXG4gICAgZ2V0IGlzWWVhcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgPT09IERhdGVQYXJ0cy55ZWFyO1xuICAgIH1cblxuICAgIGdldCBmdWxsTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5pc0RheSkgeyByZXR1cm4gJ2RhdGUnOyB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNNb250aCkgeyByZXR1cm4gJ21vbnRoJzsgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzWWVhcikgeyByZXR1cm4gJ3llYXInOyB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZURheSh2YWx1ZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgcGFyc2VkVmFsdWU6IG51bWJlciA9IHBhcnNlSW50KHZhbHVlKTtcblxuICAgICAgICBpZiAocGFyc2VkVmFsdWUgPT09IDApIHsgcmV0dXJuIDE7IH1cblxuICAgICAgICBpZiAocGFyc2VkVmFsdWUgPiB0aGlzLm1heERheXMpIHsgcmV0dXJuIHRoaXMubWF4RGF5czsgfVxuXG4gICAgICAgIHJldHVybiBwYXJzZWRWYWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlTW9udGgodmFsdWU6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHBhcnNlZFZhbHVlOiBudW1iZXIgPSBwYXJzZUludCh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHBhcnNlZFZhbHVlID09PSAwKSB7IHJldHVybiAxOyB9XG5cbiAgICAgICAgaWYgKHBhcnNlZFZhbHVlID4gdGhpcy5tYXhNb250aCkgeyByZXR1cm4gdGhpcy5tYXhNb250aDsgfVxuXG4gICAgICAgIHJldHVybiBwYXJzZWRWYWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlWWVhcih2YWx1ZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgcGFyc2VkVmFsdWU6IG51bWJlciA9IHBhcnNlSW50KHZhbHVlKTtcblxuICAgICAgICBpZiAocGFyc2VkVmFsdWUgPT09IDApIHsgcmV0dXJuIDE7IH1cblxuICAgICAgICBpZiAocGFyc2VkVmFsdWUgPiBNQVhfWUVBUikgeyByZXR1cm4gTUFYX1lFQVI7IH1cblxuICAgICAgICByZXR1cm4gcGFyc2VkVmFsdWU7XG4gICAgfVxufVxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNvbnN0IE1DX0RBVEVQSUNLRVJfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNY0RhdGVwaWNrZXJJbnB1dCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUNfREFURVBJQ0tFUl9WQUxJREFUT1JTOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNY0RhdGVwaWNrZXJJbnB1dCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cblxuLyoqXG4gKiBBbiBldmVudCB1c2VkIGZvciBkYXRlcGlja2VyIGlucHV0IGFuZCBjaGFuZ2UgZXZlbnRzLiBXZSBkb24ndCBhbHdheXMgaGF2ZSBhY2Nlc3MgdG8gYSBuYXRpdmVcbiAqIGlucHV0IG9yIGNoYW5nZSBldmVudCBiZWNhdXNlIHRoZSBldmVudCBtYXkgaGF2ZSBiZWVuIHRyaWdnZXJlZCBieSB0aGUgdXNlciBjbGlja2luZyBvbiB0aGVcbiAqIGNhbGVuZGFyIHBvcHVwLiBGb3IgY29uc2lzdGVuY3ksIHdlIGFsd2F5cyB1c2UgTWNEYXRlcGlja2VySW5wdXRFdmVudCBpbnN0ZWFkLlxuICovXG5leHBvcnQgY2xhc3MgTWNEYXRlcGlja2VySW5wdXRFdmVudDxEPiB7XG4gICAgLyoqIFRoZSBuZXcgdmFsdWUgZm9yIHRoZSB0YXJnZXQgZGF0ZXBpY2tlciBpbnB1dC4gKi9cbiAgICB2YWx1ZTogRCB8IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgZGF0ZXBpY2tlciBpbnB1dCBjb21wb25lbnQgdGhhdCBlbWl0dGVkIHRoZSBldmVudC4gKi9cbiAgICAgICAgcHVibGljIHRhcmdldDogTWNEYXRlcGlja2VySW5wdXQ8RD4sXG4gICAgICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50IGFzc29jaWF0ZWQgd2l0aCB0aGUgZGF0ZXBpY2tlciBpbnB1dC4gKi9cbiAgICAgICAgcHVibGljIHRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gICAgKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnRhcmdldC52YWx1ZTtcbiAgICB9XG59XG5cbmxldCB1bmlxdWVDb21wb25lbnRJZFN1ZmZpeCA9IDA7XG5cblxuLyoqIERpcmVjdGl2ZSB1c2VkIHRvIGNvbm5lY3QgYW4gaW5wdXQgdG8gYSBNY0RhdGVwaWNrZXIuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2lucHV0W21jRGF0ZXBpY2tlcl0nLFxuICAgIGV4cG9ydEFzOiAnbWNEYXRlcGlja2VySW5wdXQnLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBNQ19EQVRFUElDS0VSX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICBNQ19EQVRFUElDS0VSX1ZBTElEQVRPUlMsXG4gICAgICAgIHsgcHJvdmlkZTogTWNGb3JtRmllbGRDb250cm9sLCB1c2VFeGlzdGluZzogTWNEYXRlcGlja2VySW5wdXQgfVxuICAgIF0sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWlucHV0IG1jLWRhdGVwaWNrZXInLFxuICAgICAgICAnW2F0dHIucGxhY2Vob2xkZXJdJzogJ3BsYWNlaG9sZGVyJyxcbiAgICAgICAgJ1thdHRyLnJlcXVpcmVkXSc6ICdyZXF1aXJlZCcsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgICAgICdbYXR0ci5taW5dJzogJ21pbiA/IHRvSVNPODYwMShtaW4pIDogbnVsbCcsXG4gICAgICAgICdbYXR0ci5tYXhdJzogJ21heCA/IHRvSVNPODYwMShtYXgpIDogbnVsbCcsXG4gICAgICAgICdbYXR0ci5hdXRvY29tcGxldGVdJzogJ1wib2ZmXCInLFxuXG4gICAgICAgICcocGFzdGUpJzogJ29uUGFzdGUoJGV2ZW50KScsXG4gICAgICAgICcoY2hhbmdlKSc6ICdvbkNoYW5nZSgpJyxcblxuICAgICAgICAnKGZvY3VzKSc6ICdmb2N1c0NoYW5nZWQodHJ1ZSknLFxuICAgICAgICAnKGJsdXIpJzogJ29uQmx1cigpJyxcblxuICAgICAgICAnKGtleWRvd24pJzogJ29uS2V5RG93bigkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNEYXRlcGlja2VySW5wdXQ8RD4gaW1wbGVtZW50cyBNY0Zvcm1GaWVsZENvbnRyb2w8RD4sIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0b3IsIE9uRGVzdHJveSB7XG4gICAgcmVhZG9ubHkgc3RhdGVDaGFuZ2VzOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIHJlYWRvbmx5IGVycm9yU3RhdGU6IGJvb2xlYW47XG5cbiAgICBjb250cm9sVHlwZTogc3RyaW5nID0gJ2RhdGVwaWNrZXInO1xuXG4gICAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZGF0ZXBpY2tlcjogTWNEYXRlcGlja2VyPEQ+O1xuXG4gICAgZGF0ZUZpbHRlcjogKGRhdGU6IEQgfCBudWxsKSA9PiBib29sZWFuO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXMgKGVpdGhlciBkdWUgdG8gdXNlciBpbnB1dCBvciBwcm9ncmFtbWF0aWMgY2hhbmdlKS4gKi9cbiAgICB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8RCB8IG51bGw+KCk7XG5cbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgZGlzYWJsZWQgc3RhdGUgaGFzIGNoYW5nZWQgKi9cbiAgICBkaXNhYmxlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVpcmVkO1xuICAgIH1cblxuICAgIHNldCByZXF1aXJlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9yZXF1aXJlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgICAvKiogVGhlIGRhdGVwaWNrZXIgdGhhdCB0aGlzIGlucHV0IGlzIGFzc29jaWF0ZWQgd2l0aC4gKi9cbiAgICBASW5wdXQoKVxuICAgIHNldCBtY0RhdGVwaWNrZXIodmFsdWU6IE1jRGF0ZXBpY2tlcjxEPikge1xuICAgICAgICBpZiAoIXZhbHVlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZGF0ZXBpY2tlciA9IHZhbHVlO1xuICAgICAgICB0aGlzLmRhdGVwaWNrZXIucmVnaXN0ZXJJbnB1dCh0aGlzKTtcbiAgICAgICAgdGhpcy5kYXRlcGlja2VyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgdGhpcy5kYXRlcGlja2VyU3Vic2NyaXB0aW9uID0gdGhpcy5kYXRlcGlja2VyLnNlbGVjdGVkQ2hhbmdlZFxuICAgICAgICAgICAgLnN1YnNjcmliZSgoc2VsZWN0ZWQ6IEQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gc2VsZWN0ZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5jdmFPbkNoYW5nZShzZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVDaGFuZ2UuZW1pdChuZXcgTWNEYXRlcGlja2VySW5wdXRFdmVudCh0aGlzLCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIEZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gZmlsdGVyIG91dCBkYXRlcyB3aXRoaW4gdGhlIGRhdGVwaWNrZXIuICovXG4gICAgQElucHV0KClcbiAgICBzZXQgbWNEYXRlcGlja2VyRmlsdGVyKHZhbHVlOiAoZGF0ZTogRCB8IG51bGwpID0+IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5kYXRlRmlsdGVyID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UoKTtcbiAgICB9XG5cbiAgICAvKiogVGhlIHZhbHVlIG9mIHRoZSBpbnB1dC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgICAgIGxldCBuZXdWYWx1ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuXG4gICAgICAgIHRoaXMubGFzdFZhbHVlVmFsaWQgPSAhbmV3VmFsdWUgfHwgdGhpcy5kYXRlQWRhcHRlci5pc1ZhbGlkKG5ld1ZhbHVlKTtcblxuICAgICAgICBuZXdWYWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKG5ld1ZhbHVlKTtcblxuICAgICAgICBjb25zdCBvbGREYXRlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgdGhpcy5mb3JtYXRWYWx1ZShuZXdWYWx1ZSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmRhdGVBZGFwdGVyLnNhbWVEYXRlKG9sZERhdGUsIG5ld1ZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3ZhbHVlOiBEIHwgbnVsbDtcblxuICAgIC8qKiBUaGUgbWluaW11bSB2YWxpZCBkYXRlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1pbigpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9taW47XG4gICAgfVxuXG4gICAgc2V0IG1pbih2YWx1ZTogRCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbWluID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgICAgICB0aGlzLnZhbGlkYXRvck9uQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWluOiBEIHwgbnVsbDtcblxuICAgIC8qKiBUaGUgbWF4aW11bSB2YWxpZCBkYXRlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1heCgpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXg7XG4gICAgfVxuXG4gICAgc2V0IG1heCh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbWF4ID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgICAgICB0aGlzLnZhbGlkYXRvck9uQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWF4OiBEIHwgbnVsbDtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkYXRlcGlja2VyLWlucHV0IGlzIGRpc2FibGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIGlmICh0aGlzLl9kaXNhYmxlZCAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gbmV3VmFsdWU7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVkQ2hhbmdlLmVtaXQobmV3VmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgbmVlZCB0byBudWxsIGNoZWNrIHRoZSBgYmx1cmAgbWV0aG9kLCBiZWNhdXNlIGl0J3MgdW5kZWZpbmVkIGR1cmluZyBTU1IuXG4gICAgICAgIGlmIChuZXdWYWx1ZSAmJiBlbGVtZW50LmJsdXIpIHtcbiAgICAgICAgICAgIC8vIE5vcm1hbGx5LCBuYXRpdmUgaW5wdXQgZWxlbWVudHMgYXV0b21hdGljYWxseSBibHVyIGlmIHRoZXkgdHVybiBkaXNhYmxlZC4gVGhpcyBiZWhhdmlvclxuICAgICAgICAgICAgLy8gaXMgcHJvYmxlbWF0aWMsIGJlY2F1c2UgaXQgd291bGQgbWVhbiB0aGF0IGl0IHRyaWdnZXJzIGFub3RoZXIgY2hhbmdlIGRldGVjdGlvbiBjeWNsZSxcbiAgICAgICAgICAgIC8vIHdoaWNoIHRoZW4gY2F1c2VzIGEgY2hhbmdlZCBhZnRlciBjaGVja2VkIGVycm9yIGlmIHRoZSBpbnB1dCBlbGVtZW50IHdhcyBmb2N1c2VkIGJlZm9yZS5cbiAgICAgICAgICAgIGVsZW1lbnQuYmx1cigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG5cbiAgICBzZXQgaWQodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9pZCA9IHZhbHVlIHx8IHRoaXMudWlkO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lkOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBtY1ZhbGlkYXRpb25Ub29sdGlwKHRvb2x0aXA6IE1jV2FybmluZ1Rvb2x0aXBUcmlnZ2VyKSB7XG4gICAgICAgIGlmICghdG9vbHRpcCkgeyByZXR1cm47IH1cblxuICAgICAgICB0b29sdGlwLmVudGVyRGVsYXkgPSB2YWxpZGF0aW9uVG9vbHRpcFNob3dEZWxheTtcbiAgICAgICAgdG9vbHRpcC50cmlnZ2VyID0gJ21hbnVhbCc7XG5cbiAgICAgICAgdG9vbHRpcC5pbml0TGlzdGVuZXJzKCk7XG5cbiAgICAgICAgdGhpcy5pbmNvcnJlY3RJbnB1dC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRvb2x0aXAuaXNPcGVuKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICB0b29sdGlwLnNob3coKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0b29sdGlwLmhpZGUoKSwgdmFsaWRhdGlvblRvb2x0aXBIaWRlRGVsYXkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBAT3V0cHV0KCkgaW5jb3JyZWN0SW5wdXQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAvKiogRW1pdHMgd2hlbiBhIGBjaGFuZ2VgIGV2ZW50IGlzIGZpcmVkIG9uIHRoaXMgYDxpbnB1dD5gLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBkYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxNY0RhdGVwaWNrZXJJbnB1dEV2ZW50PEQ+PigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gYW4gYGlucHV0YCBldmVudCBpcyBmaXJlZCBvbiB0aGlzIGA8aW5wdXQ+YC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgZGF0ZUlucHV0ID0gbmV3IEV2ZW50RW1pdHRlcjxNY0RhdGVwaWNrZXJJbnB1dEV2ZW50PEQ+PigpO1xuXG4gICAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMudmlld1ZhbHVlICYmICF0aGlzLmlzQmFkSW5wdXQoKTtcbiAgICB9XG5cbiAgICBnZXQgdmlld1ZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgbmdDb250cm9sKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2w7XG4gICAgfVxuXG4gICAgZ2V0IGlzUmVhZE9ubHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZWFkT25seTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBzZWxlY3Rpb25TdGFydCgpOiBudW1iZXIgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0O1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0IHNlbGVjdGlvblN0YXJ0KHZhbHVlOiBudW1iZXIgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgc2VsZWN0aW9uRW5kKCk6IG51bWJlciB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0IHNlbGVjdGlvbkVuZCh2YWx1ZTogbnVtYmVyIHwgbnVsbCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHVpZCA9IGBtYy1kYXRlcGlja2VyLSR7dW5pcXVlQ29tcG9uZW50SWRTdWZmaXgrK31gO1xuXG4gICAgcHJpdmF0ZSBkYXRlcGlja2VyU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgcHJpdmF0ZSBsb2NhbGVTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICAvKiogV2hldGhlciB0aGUgbGFzdCB2YWx1ZSBzZXQgb24gdGhlIGlucHV0IHdhcyB2YWxpZC4gKi9cbiAgICBwcml2YXRlIGxhc3RWYWx1ZVZhbGlkID0gZmFsc2U7XG5cbiAgICAvKiogVGhlIGNvbWJpbmVkIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoaXMgaW5wdXQuICovXG4gICAgcHJpdmF0ZSByZWFkb25seSB2YWxpZGF0b3I6IFZhbGlkYXRvckZuIHwgbnVsbDtcblxuICAgIHByaXZhdGUgc2VwYXJhdG9yOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIGZpcnN0RGlnaXQ6IERhdGVEaWdpdDtcbiAgICBwcml2YXRlIHNlY29uZERpZ2l0OiBEYXRlRGlnaXQ7XG4gICAgcHJpdmF0ZSB0aGlyZERpZ2l0OiBEYXRlRGlnaXQ7XG5cbiAgICBwcml2YXRlIHNlcGFyYXRvclBvc2l0aW9uczogbnVtYmVyW107XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4sXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByZWFkb25seSBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfREFURV9GT1JNQVRTKSBwcml2YXRlIHJlYWRvbmx5IGRhdGVGb3JtYXRzOiBNY0RhdGVGb3JtYXRzXG4gICAgKSB7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICAgICAgICAgIHRoaXMucGFyc2VWYWxpZGF0b3IsXG4gICAgICAgICAgICB0aGlzLm1pblZhbGlkYXRvcixcbiAgICAgICAgICAgIHRoaXMubWF4VmFsaWRhdG9yLFxuICAgICAgICAgICAgdGhpcy5maWx0ZXJWYWxpZGF0b3JcbiAgICAgICAgXSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmRhdGVBZGFwdGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcignRGF0ZUFkYXB0ZXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5kYXRlRm9ybWF0cykge1xuICAgICAgICAgICAgdGhyb3cgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IoJ01DX0RBVEVfRk9STUFUUycpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRGb3JtYXQoZGF0ZUZvcm1hdHMuZGF0ZUlucHV0KTtcblxuICAgICAgICB0aGlzLmxvY2FsZVN1YnNjcmlwdGlvbiA9IGRhdGVBZGFwdGVyLmxvY2FsZUNoYW5nZXNcbiAgICAgICAgICAgIC5zdWJzY3JpYmUodGhpcy51cGRhdGVMb2NhbGVQYXJhbXMpO1xuICAgIH1cblxuICAgIG9uQ29udGFpbmVyQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBmb2N1c0NoYW5nZWQoaXNGb2N1c2VkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChpc0ZvY3VzZWQgIT09IHRoaXMuZm9jdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gaXNGb2N1c2VkO1xuICAgICAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGF0ZXBpY2tlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLmxvY2FsZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMuZGlzYWJsZWRDaGFuZ2UuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKiogQGRvY3MtcHJpdmF0ZSAqL1xuICAgIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2UoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWxpZGF0b3JPbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8qKiBAZG9jcy1wcml2YXRlICovXG4gICAgdmFsaWRhdGUoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwge1xuICAgICAgICB0aGlzLnNldENvbnRyb2woY29udHJvbCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yID8gdGhpcy52YWxpZGF0b3IoY29udHJvbCkgOiBudWxsO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogRCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLmN2YU9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc1JlYWRPbmx5KSB7IHJldHVybjsgfVxuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNMZXR0ZXJLZXkoZXZlbnQpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLmluY29ycmVjdElucHV0LmVtaXQoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzS2V5Rm9yT3BlbihldmVudCkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuZGF0ZXBpY2tlci5vcGVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0tleUZvckNsb3NlKGV2ZW50KSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5kYXRlcGlja2VyLmNsb3NlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gVEFCKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVwaWNrZXIuY2xvc2UoZmFsc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNLZXlGb3JCeVBhc3MoZXZlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gU1BBQ0UpIHtcbiAgICAgICAgICAgIHRoaXMuc3BhY2VLZXlIYW5kbGVyKGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChbVVBfQVJST1csIERPV05fQVJST1ddLmluY2x1ZGVzKGtleUNvZGUpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLnZlcnRpY2FsQXJyb3dLZXlIYW5kbGVyKGtleUNvZGUpO1xuICAgICAgICB9IGVsc2UgaWYgKFtMRUZUX0FSUk9XLCBSSUdIVF9BUlJPVywgSE9NRSwgUEFHRV9VUCwgRU5ELCBQQUdFX0RPV05dLmluY2x1ZGVzKGtleUNvZGUpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUNhcmV0UG9zaXRpb24oa2V5Q29kZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoL15cXEQkLy50ZXN0KGV2ZW50LmtleSkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5nZXROZXdWYWx1ZShldmVudC5rZXksIHRoaXMuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbHVlID0gdGhpcy5yZXBsYWNlU3ltYm9scyhuZXdWYWx1ZSk7XG5cbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gZm9ybWF0dGVkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZpZXdWYWx1ZShmb3JtYXR0ZWRWYWx1ZSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMub25JbnB1dCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5jb3JyZWN0SW5wdXQuZW1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLm9uSW5wdXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JbnB1dCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5jb3JyZWN0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkVmFsdWUgPSB0aGlzLnJlcGxhY2VTeW1ib2xzKHRoaXMudmlld1ZhbHVlKTtcblxuICAgICAgICBjb25zdCBuZXdUaW1lT2JqID0gdGhpcy5nZXREYXRlRnJvbVN0cmluZyhmb3JtYXR0ZWRWYWx1ZSk7XG4gICAgICAgIHRoaXMubGFzdFZhbHVlVmFsaWQgPSAhIW5ld1RpbWVPYmo7XG5cbiAgICAgICAgaWYgKCFuZXdUaW1lT2JqKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmlld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuY3ZhT25DaGFuZ2UobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7IGVtaXRFdmVudDogZmFsc2UgfSk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKHRoaXMuZ2V0VGltZVN0cmluZ0Zyb21EYXRlKG5ld1RpbWVPYmosIHRoaXMuZGF0ZUZvcm1hdHMuZGF0ZUlucHV0KSwgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3ROZXh0RGlnaXRCeUN1cnNvcigodGhpcy5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKG5ld1RpbWVPYmopO1xuICAgIH1cblxuICAgIHBhcnNlT25CbHVyID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMudmlld1ZhbHVlKSB7IHJldHVybiBudWxsOyB9XG5cbiAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMuZ2V0RGVmYXVsdFZhbHVlKCk7XG5cbiAgICAgICAgY29uc3Qgdmlld0RpZ2l0czogc3RyaW5nW10gPSB0aGlzLnZpZXdWYWx1ZVxuICAgICAgICAgICAgLnNwbGl0KHRoaXMuc2VwYXJhdG9yKVxuICAgICAgICAgICAgLm1hcCgodmFsdWU6IHN0cmluZykgPT4gdmFsdWUpXG4gICAgICAgICAgICAuZmlsdGVyKCh2YWx1ZSkgPT4gdmFsdWUpO1xuXG4gICAgICAgIGNvbnN0IFtmaXJzVmlld0RpZ2l0LCBzZWNvbmRWaWV3RGlnaXQsIHRoaXJkVmlld0RpZ2l0XSA9IHZpZXdEaWdpdHM7XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnNcbiAgICAgICAgaWYgKHZpZXdEaWdpdHMubGVuZ3RoICE9PSAzKSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IG51bGw7XG5cbiAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0ZVt0aGlzLmZpcnN0RGlnaXQuZnVsbE5hbWVdID0gdGhpcy5maXJzdERpZ2l0LnBhcnNlKGZpcnNWaWV3RGlnaXQpO1xuICAgICAgICBkYXRlW3RoaXMuc2Vjb25kRGlnaXQuZnVsbE5hbWVdID0gdGhpcy5zZWNvbmREaWdpdC5wYXJzZShzZWNvbmRWaWV3RGlnaXQpO1xuICAgICAgICBkYXRlW3RoaXMudGhpcmREaWdpdC5mdWxsTmFtZV0gPSB0aGlzLnRoaXJkRGlnaXQucGFyc2UodGhpcmRWaWV3RGlnaXQpO1xuXG4gICAgICAgIGNvbnN0IFtkaWdpdFdpdGhZZWFyLCB2aWV3RGlnaXRXaXRoWWVhcl0gPSBbdGhpcy5maXJzdERpZ2l0LCB0aGlzLnNlY29uZERpZ2l0LCB0aGlzLnRoaXJkRGlnaXRdXG4gICAgICAgICAgICAucmVkdWNlKChhY2MsIGRpZ2l0LCBpbmRleCkgPT4gZGlnaXQudmFsdWUgPT09IERhdGVQYXJ0cy55ZWFyID8gW2RpZ2l0LCB2aWV3RGlnaXRzW2luZGV4XV0gOiBhY2MsIFtdKTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbWFnaWMtbnVtYmVyc1xuICAgICAgICBpZiAodmlld0RpZ2l0V2l0aFllYXIubGVuZ3RoIDwgMykge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnNcbiAgICAgICAgICAgIGRhdGUueWVhciArPSBkYXRlLnllYXIgPCAzMCA/IDIwMDAgOiAxOTAwO1xuICAgICAgICB9IGVsc2UgaWYgKHZpZXdEaWdpdFdpdGhZZWFyLmxlbmd0aCA8IGRpZ2l0V2l0aFllYXIubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IG51bGw7XG5cbiAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV3VGltZU9iaiA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZVRpbWUoXG4gICAgICAgICAgICBkYXRlLnllYXIsIGRhdGUubW9udGggLSAxLCBkYXRlLmRhdGUsIGRhdGUuaG91cnMsIGRhdGUubWludXRlcywgZGF0ZS5zZWNvbmRzLCBkYXRlLm1pbGxpc2Vjb25kc1xuICAgICAgICApKTtcblxuICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gISFuZXdUaW1lT2JqO1xuXG4gICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKHRoaXMuZ2V0VGltZVN0cmluZ0Zyb21EYXRlKG5ld1RpbWVPYmosIHRoaXMuZGF0ZUZvcm1hdHMuZGF0ZUlucHV0KSwgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShuZXdUaW1lT2JqKTtcbiAgICB9XG5cbiAgICBvbkNoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5kYXRlQ2hhbmdlLmVtaXQobmV3IE1jRGF0ZXBpY2tlcklucHV0RXZlbnQodGhpcywgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpKTtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyBibHVyIGV2ZW50cyBvbiB0aGUgaW5wdXQuICovXG4gICAgb25CbHVyKCkge1xuICAgICAgICAvLyBSZWZvcm1hdCB0aGUgaW5wdXQgb25seSBpZiB3ZSBoYXZlIGEgdmFsaWQgdmFsdWUuXG4gICAgICAgIHRoaXMucGFyc2VPbkJsdXIoKTtcblxuICAgICAgICB0aGlzLmZvY3VzQ2hhbmdlZChmYWxzZSk7XG4gICAgfVxuXG4gICAgb25QYXN0ZSgkZXZlbnQpIHtcbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgcmF3VmFsdWUgPSAkZXZlbnQuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0Jyk7XG5cbiAgICAgICAgY29uc3QgbWF0Y2g6IFJlZ0V4cE1hdGNoQXJyYXkgfCBudWxsID0gcmF3VmFsdWUubWF0Y2goL14oPzxmaXJzdD5cXGQrKVxcVyg/PHNlY29uZD5cXGQrKVxcVyg/PHRoaXJkPlxcZCspJC8pO1xuXG4gICAgICAgIGlmICghbWF0Y2g/Lmdyb3Vwcz8uZmlyc3QgfHwgIW1hdGNoPy5ncm91cHM/LnNlY29uZCB8fCAhbWF0Y2g/Lmdyb3Vwcz8udGhpcmQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKHJhd1ZhbHVlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHJhd1ZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFsdWUgPSBbbWF0Y2guZ3JvdXBzLmZpcnN0LCBtYXRjaC5ncm91cHMuc2Vjb25kLCBtYXRjaC5ncm91cHMudGhpcmRdLmpvaW4odGhpcy5zZXBhcmF0b3IpO1xuXG4gICAgICAgIGNvbnN0IG5ld1RpbWVPYmogPSB0aGlzLmdldERhdGVGcm9tU3RyaW5nKHZhbHVlKTtcblxuICAgICAgICBpZiAoIW5ld1RpbWVPYmopIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKHZhbHVlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRWaWV3VmFsdWUodGhpcy5nZXRUaW1lU3RyaW5nRnJvbURhdGUobmV3VGltZU9iaiwgdGhpcy5kYXRlRm9ybWF0cy5kYXRlSW5wdXQpKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKG5ld1RpbWVPYmopO1xuICAgIH1cblxuICAgIHRvSVNPODYwMSh2YWx1ZTogRCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVBZGFwdGVyLnRvSXNvODYwMSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVMb2NhbGVQYXJhbXMgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0Rm9ybWF0KHRoaXMuZGF0ZUZvcm1hdHMuZGF0ZUlucHV0KTtcblxuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEZvcm1hdChmb3JtYXQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlcGFyYXRvciA9IGZvcm1hdC5tYXRjaCgvW2FBLXpaXSsoPzxzZXBhcmF0b3I+XFxXfFxcRClbYUEtelpdKy8pIS5ncm91cHMuc2VwYXJhdG9yO1xuICAgICAgICB0aGlzLnNlcGFyYXRvclBvc2l0aW9ucyA9IGZvcm1hdFxuICAgICAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAgICAgLnJlZHVjZSgoYWNjLCBpdGVtLCBpbmRleDogbnVtYmVyKSA9PiB0aGlzLnNlcGFyYXRvciA9PT0gaXRlbSA/IFsuLi5hY2MsIGluZGV4ICsgMV0gOiBhY2MsIFtdKTtcblxuICAgICAgICB0aGlzLmdldERpZ2l0UG9zaXRpb25zKGZvcm1hdCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVWYWx1ZShuZXdWYWx1ZTogRCkge1xuICAgICAgICBpZiAoIXRoaXMuZGF0ZUFkYXB0ZXIuc2FtZURhdGUobmV3VmFsdWUsIHRoaXMudmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgdGhpcy5jdmFPbkNoYW5nZShuZXdWYWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQobmV3VmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5kYXRlSW5wdXQuZW1pdChuZXcgTWNEYXRlcGlja2VySW5wdXRFdmVudCh0aGlzLCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNLZXlGb3JDbG9zZShldmVudDogS2V5Ym9hcmRFdmVudCk6IGJvb2xlYW4ge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICAgIHJldHVybiAoZXZlbnQuYWx0S2V5ICYmIGV2ZW50LmtleUNvZGUgPT09IFVQX0FSUk9XKSB8fCBldmVudC5rZXlDb2RlID09PSBFU0NBUEU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0tleUZvck9wZW4oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiBib29sZWFuIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICByZXR1cm4gZXZlbnQuYWx0S2V5ICYmIGV2ZW50LmtleUNvZGUgPT09IERPV05fQVJST1c7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0xldHRlcktleShldmVudDogS2V5Ym9hcmRFdmVudCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gaXNMZXR0ZXJLZXkoZXZlbnQpICYmICFldmVudC5jdHJsS2V5ICYmICFldmVudC5tZXRhS2V5O1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNLZXlGb3JCeVBhc3MoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiBib29sZWFuIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICByZXR1cm4gKGhhc01vZGlmaWVyS2V5KGV2ZW50KSAmJiAoaXNWZXJ0aWNhbE1vdmVtZW50KGV2ZW50LmtleUNvZGUpIHx8IGlzSG9yaXpvbnRhbE1vdmVtZW50KGV2ZW50LmtleUNvZGUpKSkgfHxcbiAgICAgICAgICAgIGV2ZW50LmN0cmxLZXkgfHxcbiAgICAgICAgICAgIGV2ZW50Lm1ldGFLZXk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzcGFjZUtleUhhbmRsZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25TdGFydCA9PT0gdGhpcy5zZWxlY3Rpb25FbmQpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXROZXdWYWx1ZShldmVudC5rZXksIHRoaXMuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKTtcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKHZhbHVlKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLm9uSW5wdXQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0aW9uU3RhcnQgIT09IHRoaXMuc2VsZWN0aW9uRW5kKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE5leHREaWdpdCh0aGlzLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlciwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE5ld1ZhbHVlKGtleTogc3RyaW5nLCBwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBbdGhpcy52aWV3VmFsdWUuc2xpY2UoMCwgcG9zaXRpb24pLCBrZXksIHRoaXMudmlld1ZhbHVlLnNsaWNlKHBvc2l0aW9uKV0uam9pbignJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRWaWV3VmFsdWUodmFsdWU6IHN0cmluZywgc2F2ZVBvc2l0aW9uOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHNhdmVQb3NpdGlvbikge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uRW5kID0gdGhpcy5zZWxlY3Rpb25FbmQ7XG5cbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIHZhbHVlKTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlcGxhY2VTeW1ib2xzKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgICAgIC5zcGxpdCh0aGlzLnNlcGFyYXRvcilcbiAgICAgICAgICAgIC5tYXAoKHBhcnQ6IHN0cmluZykgPT4gcGFydC5yZXBsYWNlKC9eKFswLTldKylcXFckLywgJzAkMScpKVxuICAgICAgICAgICAgLmpvaW4odGhpcy5zZXBhcmF0b3IpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGF0ZUZyb21TdHJpbmcodGltZVN0cmluZzogc3RyaW5nKTogRCB8IG51bGwge1xuICAgICAgICBpZiAoIXRpbWVTdHJpbmcgfHwgdGltZVN0cmluZy5sZW5ndGggPCB0aGlzLmZpcnN0RGlnaXQubGVuZ3RoKSB7IHJldHVybiBudWxsOyB9XG5cbiAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMuZ2V0RGVmYXVsdFZhbHVlKCk7XG5cbiAgICAgICAgY29uc3Qgdmlld0RpZ2l0czogc3RyaW5nW10gPSB0aW1lU3RyaW5nXG4gICAgICAgICAgICAuc3BsaXQodGhpcy5zZXBhcmF0b3IpXG4gICAgICAgICAgICAubWFwKCh2YWx1ZTogc3RyaW5nKSA9PiB2YWx1ZSk7XG5cbiAgICAgICAgY29uc3QgW2ZpcnNWaWV3RGlnaXQsIHNlY29uZFZpZXdEaWdpdCwgdGhpcmRWaWV3RGlnaXRdID0gdmlld0RpZ2l0cztcblxuICAgICAgICBpZiAodmlld0RpZ2l0cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGlmIChmaXJzVmlld0RpZ2l0Lmxlbmd0aCA8IHRoaXMuZmlyc3REaWdpdC5sZW5ndGgpIHsgcmV0dXJuIG51bGw7IH1cblxuXG4gICAgICAgICAgICBkYXRlW3RoaXMuZmlyc3REaWdpdC5mdWxsTmFtZV0gPSB0aGlzLmZpcnN0RGlnaXQucGFyc2UoZmlyc1ZpZXdEaWdpdCk7XG4gICAgICAgICAgICBkYXRlLm1vbnRoID0gMTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnNcbiAgICAgICAgfSBlbHNlIGlmICh2aWV3RGlnaXRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgaWYgKGZpcnNWaWV3RGlnaXQubGVuZ3RoIDwgdGhpcy5maXJzdERpZ2l0Lmxlbmd0aCB8fCBzZWNvbmRWaWV3RGlnaXQubGVuZ3RoIDwgdGhpcy5zZWNvbmREaWdpdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGF0ZVt0aGlzLmZpcnN0RGlnaXQuZnVsbE5hbWVdID0gdGhpcy5maXJzdERpZ2l0LnBhcnNlKGZpcnNWaWV3RGlnaXQpO1xuICAgICAgICAgICAgZGF0ZVt0aGlzLnNlY29uZERpZ2l0LmZ1bGxOYW1lXSA9IHRoaXMuc2Vjb25kRGlnaXQucGFyc2Uoc2Vjb25kVmlld0RpZ2l0KTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnNcbiAgICAgICAgfSBlbHNlIGlmICh2aWV3RGlnaXRzLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGZpcnNWaWV3RGlnaXQubGVuZ3RoIDwgdGhpcy5maXJzdERpZ2l0Lmxlbmd0aCB8fFxuICAgICAgICAgICAgICAgIHNlY29uZFZpZXdEaWdpdC5sZW5ndGggPCB0aGlzLnNlY29uZERpZ2l0Lmxlbmd0aCB8fFxuICAgICAgICAgICAgICAgIHRoaXJkVmlld0RpZ2l0Lmxlbmd0aCA8IHRoaXMudGhpcmREaWdpdC5sZW5ndGhcbiAgICAgICAgICAgICkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgICAgICBkYXRlW3RoaXMuZmlyc3REaWdpdC5mdWxsTmFtZV0gPSB0aGlzLmZpcnN0RGlnaXQucGFyc2UoZmlyc1ZpZXdEaWdpdCk7XG4gICAgICAgICAgICBkYXRlW3RoaXMuc2Vjb25kRGlnaXQuZnVsbE5hbWVdID0gdGhpcy5zZWNvbmREaWdpdC5wYXJzZShzZWNvbmRWaWV3RGlnaXQpO1xuICAgICAgICAgICAgZGF0ZVt0aGlzLnRoaXJkRGlnaXQuZnVsbE5hbWVdID0gdGhpcy50aGlyZERpZ2l0LnBhcnNlKHRoaXJkVmlld0RpZ2l0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZVRpbWUoXG4gICAgICAgICAgICBkYXRlLnllYXIsIGRhdGUubW9udGggLSAxLCBkYXRlLmRhdGUsIGRhdGUuaG91cnMsIGRhdGUubWludXRlcywgZGF0ZS5zZWNvbmRzLCBkYXRlLm1pbGxpc2Vjb25kc1xuICAgICAgICApKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERlZmF1bHRWYWx1ZSgpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gdGhpcy52YWx1ZSB8fCB0aGlzLmRhdGVBZGFwdGVyLnRvZGF5KCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHllYXI6IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcihkZWZhdWx0VmFsdWUpLFxuICAgICAgICAgICAgbW9udGg6IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TW9udGgoZGVmYXVsdFZhbHVlKSxcbiAgICAgICAgICAgIGRhdGU6IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0RGF0ZShkZWZhdWx0VmFsdWUpLFxuICAgICAgICAgICAgaG91cnM6IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0SG91cnMoZGVmYXVsdFZhbHVlKSxcbiAgICAgICAgICAgIG1pbnV0ZXM6IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TWludXRlcyhkZWZhdWx0VmFsdWUpLFxuICAgICAgICAgICAgc2Vjb25kczogdGhpcy5kYXRlQWRhcHRlci5nZXRTZWNvbmRzKGRlZmF1bHRWYWx1ZSksXG4gICAgICAgICAgICBtaWxsaXNlY29uZHM6IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TWlsbGlzZWNvbmRzKGRlZmF1bHRWYWx1ZSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRpbWVTdHJpbmdGcm9tRGF0ZSh2YWx1ZTogRCB8IG51bGwsIHRpbWVGb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdmFsdWUgfHwgIXRoaXMuZGF0ZUFkYXB0ZXIuaXNWYWxpZCh2YWx1ZSkpIHsgcmV0dXJuICcnOyB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUFkYXB0ZXIuZm9ybWF0KHZhbHVlLCB0aW1lRm9ybWF0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERhdGVFZGl0TWV0cmljcyhjdXJzb3JQb3NpdGlvbjogbnVtYmVyKTogW1xuICAgICAgICBtb2RpZmllZFRpbWVQYXJ0OiBEYXRlUGFydHMsXG4gICAgICAgIGN1cnNvclN0YXJ0UG9zaXRpb246IG51bWJlcixcbiAgICAgICAgY3Vyc29yRW5kUG9zaXRpb246IG51bWJlclxuICAgIF0ge1xuICAgICAgICBmb3IgKGNvbnN0IGRpZ2l0IG9mIFt0aGlzLmZpcnN0RGlnaXQsIHRoaXMuc2Vjb25kRGlnaXQsIHRoaXMudGhpcmREaWdpdF0pIHtcbiAgICAgICAgICAgIGlmIChjdXJzb3JQb3NpdGlvbiA+PSBkaWdpdC5zdGFydCAmJiBjdXJzb3JQb3NpdGlvbiA8PSBkaWdpdC5lbmQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW2RpZ2l0LnZhbHVlLCBkaWdpdC5zdGFydCwgZGlnaXQuZW5kXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbdGhpcy50aGlyZERpZ2l0LnZhbHVlLCB0aGlzLnRoaXJkRGlnaXQuc3RhcnQsIHRoaXMudGhpcmREaWdpdC5lbmRdO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5jcmVtZW50RGF0ZShkYXRlVmFsOiBELCB3aGF0VG9JbmNyZW1lbnQ6IERhdGVQYXJ0cyk6IEQge1xuICAgICAgICBsZXQgeWVhciA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcihkYXRlVmFsKTtcbiAgICAgICAgbGV0IG1vbnRoID0gdGhpcy5kYXRlQWRhcHRlci5nZXRNb250aChkYXRlVmFsKTtcbiAgICAgICAgbGV0IGRheSA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0RGF0ZShkYXRlVmFsKTtcblxuICAgICAgICBzd2l0Y2ggKHdoYXRUb0luY3JlbWVudCkge1xuICAgICAgICAgICAgY2FzZSBEYXRlUGFydHMuZGF5OlxuICAgICAgICAgICAgICAgIGRheSsrO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRheSA+IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TnVtRGF5c0luTW9udGgoZGF0ZVZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF5ID0gMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRGF0ZVBhcnRzLm1vbnRoOlxuICAgICAgICAgICAgICAgIG1vbnRoKys7XG5cbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbWFnaWMtbnVtYmVyc1xuICAgICAgICAgICAgICAgIGlmIChtb250aCA+IDExKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vbnRoID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0RGF5ID0gdGhpcy5nZXRMYXN0RGF5Rm9yKHllYXIsIG1vbnRoKTtcblxuICAgICAgICAgICAgICAgIGlmIChkYXkgPiBsYXN0RGF5KSB7XG4gICAgICAgICAgICAgICAgICAgIGRheSA9IGxhc3REYXk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIERhdGVQYXJ0cy55ZWFyOlxuICAgICAgICAgICAgICAgIHllYXIrKztcblxuICAgICAgICAgICAgICAgIGlmICh5ZWFyID4gTUFYX1lFQVIpIHtcbiAgICAgICAgICAgICAgICAgICAgeWVhciA9IDE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldExhc3REYXlGb3IoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TnVtRGF5c0luTW9udGgodGhpcy5jcmVhdGVEYXRlKHllYXIsIG1vbnRoLCAxKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZWNyZW1lbnREYXRlKGRhdGVWYWw6IEQsIHdoYXRUb0RlY3JlbWVudDogRGF0ZVBhcnRzKTogRCB7XG4gICAgICAgIGxldCB5ZWFyID0gdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKGRhdGVWYWwpO1xuICAgICAgICBsZXQgbW9udGggPSB0aGlzLmRhdGVBZGFwdGVyLmdldE1vbnRoKGRhdGVWYWwpO1xuICAgICAgICBsZXQgZGF5ID0gdGhpcy5kYXRlQWRhcHRlci5nZXREYXRlKGRhdGVWYWwpO1xuXG4gICAgICAgIHN3aXRjaCAod2hhdFRvRGVjcmVtZW50KSB7XG4gICAgICAgICAgICBjYXNlIERhdGVQYXJ0cy5kYXk6XG4gICAgICAgICAgICAgICAgZGF5LS07XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF5IDwgMSkge1xuICAgICAgICAgICAgICAgICAgICBkYXkgPSB0aGlzLmRhdGVBZGFwdGVyLmdldE51bURheXNJbk1vbnRoKGRhdGVWYWwpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBEYXRlUGFydHMubW9udGg6XG4gICAgICAgICAgICAgICAgbW9udGgtLTtcblxuICAgICAgICAgICAgICAgIGlmIChtb250aCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnNcbiAgICAgICAgICAgICAgICAgICAgbW9udGggPSAxMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0RGF5ID0gdGhpcy5nZXRMYXN0RGF5Rm9yKHllYXIsIG1vbnRoKTtcblxuICAgICAgICAgICAgICAgIGlmIChkYXkgPiBsYXN0RGF5KSB7XG4gICAgICAgICAgICAgICAgICAgIGRheSA9IGxhc3REYXk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIERhdGVQYXJ0cy55ZWFyOlxuICAgICAgICAgICAgICAgIHllYXItLTtcblxuICAgICAgICAgICAgICAgIGlmICh5ZWFyIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICB5ZWFyID0gTUFYX1lFQVI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHZlcnRpY2FsQXJyb3dLZXlIYW5kbGVyKGtleUNvZGU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMudmFsdWUpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgbGV0IGNoYW5nZWRUaW1lO1xuXG4gICAgICAgIGNvbnN0IFttb2RpZmllZFRpbWVQYXJ0LCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kXSA9IHRoaXMuZ2V0RGF0ZUVkaXRNZXRyaWNzKHRoaXMuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKTtcblxuICAgICAgICBpZiAoa2V5Q29kZSA9PT0gVVBfQVJST1cpIHtcbiAgICAgICAgICAgIGNoYW5nZWRUaW1lID0gdGhpcy5pbmNyZW1lbnREYXRlKHRoaXMudmFsdWUsIG1vZGlmaWVkVGltZVBhcnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleUNvZGUgPT09IERPV05fQVJST1cpIHtcbiAgICAgICAgICAgIGNoYW5nZWRUaW1lID0gdGhpcy5kZWNyZW1lbnREYXRlKHRoaXMudmFsdWUsIG1vZGlmaWVkVGltZVBhcnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IGNoYW5nZWRUaW1lO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydDtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmQ7XG5cbiAgICAgICAgdGhpcy5jdmFPbkNoYW5nZShjaGFuZ2VkVGltZSk7XG5cbiAgICAgICAgdGhpcy5vbkNoYW5nZSgpO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VDYXJldFBvc2l0aW9uKGtleUNvZGU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMudmFsdWUpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgbGV0IGN1cnNvclBvcyA9IHRoaXMuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyO1xuXG4gICAgICAgIGlmIChbSE9NRSwgUEFHRV9VUF0uaW5jbHVkZXMoa2V5Q29kZSkpIHtcbiAgICAgICAgICAgIGN1cnNvclBvcyA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoW0VORCwgUEFHRV9ET1dOXS5pbmNsdWRlcyhrZXlDb2RlKSkge1xuICAgICAgICAgICAgY3Vyc29yUG9zID0gdGhpcy52aWV3VmFsdWUubGVuZ3RoO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IExFRlRfQVJST1cpIHtcbiAgICAgICAgICAgIGN1cnNvclBvcyA9IGN1cnNvclBvcyA9PT0gMCA/IHRoaXMudmlld1ZhbHVlLmxlbmd0aCA6IGN1cnNvclBvcyAtIDE7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gUklHSFRfQVJST1cpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRTZXBhcmF0b3JQb3M6IG51bWJlciA9IHRoaXMudmlld1ZhbHVlLmluZGV4T2YodGhpcy5zZXBhcmF0b3IsIGN1cnNvclBvcyk7XG5cbiAgICAgICAgICAgIGN1cnNvclBvcyA9IG5leHRTZXBhcmF0b3JQb3MgPyBuZXh0U2VwYXJhdG9yUG9zICsgMSA6IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlbGVjdERpZ2l0QnlDdXJzb3IoY3Vyc29yUG9zKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNlbGVjdERpZ2l0QnlDdXJzb3IoY3Vyc29yUG9zOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBbLCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kXSA9IHRoaXMuZ2V0RGF0ZUVkaXRNZXRyaWNzKGN1cnNvclBvcyk7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNlbGVjdE5leHREaWdpdEJ5Q3Vyc29yKGN1cnNvclBvczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgWywgLCBlbmRQb3NpdGlvbk9mQ3VycmVudERpZ2l0XSA9IHRoaXMuZ2V0RGF0ZUVkaXRNZXRyaWNzKGN1cnNvclBvcyk7XG4gICAgICAgICAgICBjb25zdCBbLCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kXSA9IHRoaXMuZ2V0RGF0ZUVkaXRNZXRyaWNzKGVuZFBvc2l0aW9uT2ZDdXJyZW50RGlnaXQgKyAxKTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2VsZWN0TmV4dERpZ2l0KGN1cnNvclBvczogbnVtYmVyLCBjeWNsZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGFzdFZhbHVlID0gY3ljbGUgPyAwIDogY3Vyc29yUG9zO1xuICAgICAgICAgICAgY29uc3QgbmV4dFNlcGFyYXRvclBvczogbnVtYmVyID0gdGhpcy52aWV3VmFsdWUuaW5kZXhPZih0aGlzLnNlcGFyYXRvciwgY3Vyc29yUG9zKTtcblxuICAgICAgICAgICAgY29uc3QgbmV3Q3Vyc29yUG9zID0gbmV4dFNlcGFyYXRvclBvcyA+IDAgPyBuZXh0U2VwYXJhdG9yUG9zICsgMSA6IGxhc3RWYWx1ZTtcblxuICAgICAgICAgICAgY29uc3QgWywgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZF0gPSB0aGlzLmdldERhdGVFZGl0TWV0cmljcyhuZXdDdXJzb3JQb3MpO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBpbnZhbGlkIGJhc2VkIG9uIHRoZSBuYXRpdmUgdmFsaWRhdGlvbi4gKi9cbiAgICBwcml2YXRlIGlzQmFkSW5wdXQoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHZhbGlkaXR5ID0gKDxIVE1MSW5wdXRFbGVtZW50PiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkudmFsaWRpdHk7XG5cbiAgICAgICAgcmV0dXJuIHZhbGlkaXR5ICYmIHZhbGlkaXR5LmJhZElucHV0O1xuICAgIH1cblxuICAgIHByaXZhdGUgY3ZhT25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgICBwcml2YXRlIHZhbGlkYXRvck9uQ2hhbmdlID0gKCkgPT4ge307XG5cbiAgICAvKiogVGhlIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHdoZXRoZXIgdGhlIGlucHV0IHBhcnNlcy4gKi9cbiAgICBwcml2YXRlIHBhcnNlVmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9ICgpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvY3VzZWQgfHxcbiAgICAgICAgICAgIHRoaXMuZW1wdHkgfHxcbiAgICAgICAgICAgIHRoaXMubGFzdFZhbHVlVmFsaWQgPyBudWxsIDogeyBtY0RhdGVwaWNrZXJQYXJzZTogeyB0ZXh0OiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSB9IH07XG4gICAgfVxuXG4gICAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGUgbWluIGRhdGUuICovXG4gICAgcHJpdmF0ZSBtaW5WYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgICAgY29uc3QgY29udHJvbFZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlKSk7XG5cbiAgICAgICAgcmV0dXJuICghdGhpcy5taW4gfHwgIWNvbnRyb2xWYWx1ZSB8fFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5jb21wYXJlRGF0ZSh0aGlzLm1pbiwgY29udHJvbFZhbHVlKSA8PSAwKSA/XG4gICAgICAgICAgICBudWxsIDogeyBtY0RhdGVwaWNrZXJNaW46IHsgbWluOiB0aGlzLm1pbiwgYWN0dWFsOiBjb250cm9sVmFsdWUgfSB9O1xuICAgIH1cblxuICAgIC8qKiBUaGUgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhlIG1heCBkYXRlLiAqL1xuICAgIHByaXZhdGUgbWF4VmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZSkpO1xuXG4gICAgICAgIHJldHVybiAoIXRoaXMubWF4IHx8ICFjb250cm9sVmFsdWUgfHxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuY29tcGFyZURhdGUodGhpcy5tYXgsIGNvbnRyb2xWYWx1ZSkgPj0gMCkgP1xuICAgICAgICAgICAgbnVsbCA6IHsgbWNEYXRlcGlja2VyTWF4OiB7IG1heDogdGhpcy5tYXgsIGFjdHVhbDogY29udHJvbFZhbHVlIH0gfTtcbiAgICB9XG5cbiAgICAvKiogVGhlIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoZSBkYXRlIGZpbHRlci4gKi9cbiAgICBwcml2YXRlIGZpbHRlclZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICBjb25zdCBjb250cm9sVmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWUpKTtcblxuICAgICAgICByZXR1cm4gIXRoaXMuZGF0ZUZpbHRlciB8fCAhY29udHJvbFZhbHVlIHx8IHRoaXMuZGF0ZUZpbHRlcihjb250cm9sVmFsdWUpID9cbiAgICAgICAgICAgIG51bGwgOiB7IG1jRGF0ZXBpY2tlckZpbHRlcjogdHJ1ZSB9O1xuICAgIH1cblxuICAgIC8qKiBGb3JtYXRzIGEgdmFsdWUgYW5kIHNldHMgaXQgb24gdGhlIGlucHV0IGVsZW1lbnQuICovXG4gICAgcHJpdmF0ZSBmb3JtYXRWYWx1ZSh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkVmFsdWUgPSB2YWx1ZSA/IHRoaXMuZGF0ZUFkYXB0ZXIuZm9ybWF0KHZhbHVlLCB0aGlzLmRhdGVGb3JtYXRzLmRhdGVJbnB1dCkgOiAnJztcblxuICAgICAgICB0aGlzLnNldFZpZXdWYWx1ZShmb3JtYXR0ZWRWYWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIFRoZSBnaXZlbiBvYmplY3QgaWYgaXQgaXMgYm90aCBhIGRhdGUgaW5zdGFuY2UgYW5kIHZhbGlkLCBvdGhlcndpc2UgbnVsbC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFZhbGlkRGF0ZU9yTnVsbChvYmo6IGFueSk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmRhdGVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiYgdGhpcy5kYXRlQWRhcHRlci5pc1ZhbGlkKG9iaikpID8gb2JqIDogbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldENvbnRyb2woY29udHJvbDogQWJzdHJhY3RDb250cm9sKSB7XG4gICAgICAgIGlmICghdGhpcy5jb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wgPSBjb250cm9sO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREaWdpdFBvc2l0aW9ucyhmb3JtYXQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBmb3JtYXRJbkxvd2VyQ2FzZSA9IGZvcm1hdC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGZvcm1hdEluTG93ZXJDYXNlXG4gICAgICAgICAgICAuc3BsaXQoJycpXG4gICAgICAgICAgICAucmVkdWNlKFxuICAgICAgICAgICAgICAgICh7IHByZXYsIGxlbmd0aCwgc3RhcnQgfSwgdmFsdWU6IHN0cmluZywgaW5kZXg6IG51bWJlciwgYXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5zZXBhcmF0b3IgfHwgKGFyci5sZW5ndGggLSAxKSA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5maXJzdERpZ2l0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdERpZ2l0ID0gbmV3IERhdGVEaWdpdChwcmV2LCBzdGFydCwgbGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuc2Vjb25kRGlnaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlY29uZERpZ2l0ID0gbmV3IERhdGVEaWdpdChwcmV2LCBzdGFydCwgbGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMudGhpcmREaWdpdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGhpcmREaWdpdCA9IG5ldyBEYXRlRGlnaXQocHJldiwgc3RhcnQsIGFyci5sZW5ndGggLSBzdGFydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlOm5vLXBhcmFtZXRlci1yZWFzc2lnbm1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydCA9IGluZGV4ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCsrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgcHJldjogdmFsdWUsIGxlbmd0aCwgc3RhcnQgfTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHsgbGVuZ3RoOiAwLCBzdGFydDogMCB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgIGlmICghdGhpcy5maXJzdERpZ2l0IHx8ICF0aGlzLnNlY29uZERpZ2l0IHx8ICF0aGlzLnRoaXJkRGlnaXQpIHtcbiAgICAgICAgICAgIEVycm9yKGBDYW4nIHQgdXNlIHRoaXMgZm9ybWF0OiAke2Zvcm1hdH1gKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlRGF0ZSh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKTogRCB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVBZGFwdGVyLmNyZWF0ZURhdGVUaW1lKFxuICAgICAgICAgICAgeWVhcixcbiAgICAgICAgICAgIG1vbnRoLFxuICAgICAgICAgICAgZGF5LFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRIb3Vycyh0aGlzLnZhbHVlIGFzIEQpLFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRNaW51dGVzKHRoaXMudmFsdWUgYXMgRCksXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldFNlY29uZHModGhpcy52YWx1ZSBhcyBEKSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TWlsbGlzZWNvbmRzKHRoaXMudmFsdWUgYXMgRClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvcnJlY3RDdXJzb3JQb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uU3RhcnQgJiYgdGhpcy5zZXBhcmF0b3JQb3NpdGlvbnMuaW5jbHVkZXModGhpcy5zZWxlY3Rpb25TdGFydCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhcnQgPSB0aGlzLnNlbGVjdGlvblN0YXJ0IC0gMTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==