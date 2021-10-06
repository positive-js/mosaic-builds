// @ts-nocheck
// tslint:disable:no-empty
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Output, Renderer2 } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { DateAdapter, MC_DATE_FORMATS } from '@ptsecurity/cdk/datetime';
import { UP_ARROW, RIGHT_ARROW, DOWN_ARROW, LEFT_ARROW, END, PAGE_DOWN, HOME, PAGE_UP, SPACE, TAB, ESCAPE, hasModifierKey, isHorizontalMovement, isLetterKey, isVerticalMovement } from '@ptsecurity/cdk/keycodes';
import { validationTooltipHideDelay, validationTooltipShowDelay } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { McTooltip } from '@ptsecurity/mosaic/tooltip';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pbnB1dC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvZGF0ZXBpY2tlci9kYXRlcGlja2VyLWlucHV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsMEJBQTBCO0FBQzFCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBR0gsYUFBYSxFQUNiLGlCQUFpQixFQUlqQixVQUFVLEVBQ2IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBaUIsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RixPQUFPLEVBR0gsUUFBUSxFQUNSLFdBQVcsRUFDWCxVQUFVLEVBQ1YsVUFBVSxFQUNWLEdBQUcsRUFDSCxTQUFTLEVBQ1QsSUFBSSxFQUNKLE9BQU8sRUFDUCxLQUFLLEVBQ0wsR0FBRyxFQUNILE1BQU0sRUFDTixjQUFjLEVBQ2Qsb0JBQW9CLEVBQ3BCLFdBQVcsRUFDWCxrQkFBa0IsRUFDckIsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFN0MsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0s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QixFQUFFLGFBQWE7d0JBQ25DLGlCQUFpQixFQUFFLFVBQVU7d0JBQzdCLGlCQUFpQixFQUFFLGtCQUFrQjt3QkFDckMsWUFBWSxFQUFFLDZCQUE2Qjt3QkFDM0MsWUFBWSxFQUFFLDZCQUE2Qjt3QkFDM0MscUJBQXFCLEVBQUUsT0FBTzt3QkFFOUIsU0FBUyxFQUFFLGlCQUFpQjt3QkFDNUIsVUFBVSxFQUFFLFlBQVk7d0JBRXhCLFNBQVMsRUFBRSxvQkFBb0I7d0JBQy9CLFFBQVEsRUFBRSxVQUFVO3dCQUVwQixXQUFXLEVBQUUsbUJBQW1CO3FCQUNuQztpQkFDSjs7MEJBb09RLFFBQVE7OzBCQUNSLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsZUFBZTs0Q0FqTjlCLFdBQVc7c0JBQW5CLEtBQUs7Z0JBR0YsUUFBUTtzQkFEWCxLQUFLO2dCQWFGLFlBQVk7c0JBRGYsS0FBSztnQkFtQkYsa0JBQWtCO3NCQURyQixLQUFLO2dCQVFGLEtBQUs7c0JBRFIsS0FBSztnQkF5QkYsR0FBRztzQkFETixLQUFLO2dCQWNGLEdBQUc7c0JBRE4sS0FBSztnQkFjRixRQUFRO3NCQURYLEtBQUs7Z0JBMEJGLEVBQUU7c0JBREwsS0FBSztnQkFZRixtQkFBbUI7c0JBRHRCLEtBQUs7Z0JBbUJJLGNBQWM7c0JBQXZCLE1BQU07Z0JBR1ksVUFBVTtzQkFBNUIsTUFBTTtnQkFHWSxTQUFTO3NCQUEzQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQHRzLW5vY2hlY2tcblxuLy8gdHNsaW50OmRpc2FibGU6bm8tZW1wdHlcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQWJzdHJhY3RDb250cm9sLFxuICAgIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIE5HX1ZBTElEQVRPUlMsXG4gICAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgVmFsaWRhdGlvbkVycm9ycyxcbiAgICBWYWxpZGF0b3IsXG4gICAgVmFsaWRhdG9yRm4sXG4gICAgVmFsaWRhdG9yc1xufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciwgTUNfREFURV9GT1JNQVRTLCBNY0RhdGVGb3JtYXRzIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2RhdGV0aW1lJztcbmltcG9ydCB7XG4gICAgQkFDS1NQQUNFLFxuICAgIERFTEVURSxcbiAgICBVUF9BUlJPVyxcbiAgICBSSUdIVF9BUlJPVyxcbiAgICBET1dOX0FSUk9XLFxuICAgIExFRlRfQVJST1csXG4gICAgRU5ELFxuICAgIFBBR0VfRE9XTixcbiAgICBIT01FLFxuICAgIFBBR0VfVVAsXG4gICAgU1BBQ0UsXG4gICAgVEFCLFxuICAgIEVTQ0FQRSxcbiAgICBoYXNNb2RpZmllcktleSxcbiAgICBpc0hvcml6b250YWxNb3ZlbWVudCxcbiAgICBpc0xldHRlcktleSxcbiAgICBpc1ZlcnRpY2FsTW92ZW1lbnRcbn0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IHZhbGlkYXRpb25Ub29sdGlwSGlkZURlbGF5LCB2YWxpZGF0aW9uVG9vbHRpcFNob3dEZWxheSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IE1jRm9ybUZpZWxkQ29udHJvbCB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9mb3JtLWZpZWxkJztcbmltcG9ydCB7IE1jVG9vbHRpcCB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy90b29sdGlwJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvciB9IGZyb20gJy4vZGF0ZXBpY2tlci1lcnJvcnMnO1xuaW1wb3J0IHsgTWNEYXRlcGlja2VyIH0gZnJvbSAnLi9kYXRlcGlja2VyLmNvbXBvbmVudCc7XG5cblxuLy8gdHNsaW50OmRpc2FibGU6bmFtaW5nLWNvbnZlbnRpb25cbmVudW0gRGF0ZVBhcnRzIHtcbiAgICB5ZWFyID0gJ3knLFxuICAgIG1vbnRoID0gJ20nLFxuICAgIGRheSA9ICdkJ1xufVxuXG5leHBvcnQgY29uc3QgTUFYX1lFQVIgPSA5OTk5O1xuXG5jbGFzcyBEYXRlRGlnaXQge1xuICAgIG1heERheXMgPSAzMTtcbiAgICBtYXhNb250aCA9IDEyO1xuXG4gICAgcGFyc2U6ICh2YWx1ZTogc3RyaW5nKSA9PiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IERhdGVQYXJ0cywgcHVibGljIHN0YXJ0OiBudW1iZXIsIHB1YmxpYyBsZW5ndGg6IG51bWJlcikge1xuICAgICAgICBpZiAodmFsdWUgPT09IERhdGVQYXJ0cy5kYXkpIHtcbiAgICAgICAgICAgIHRoaXMucGFyc2UgPSB0aGlzLnBhcnNlRGF5O1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBEYXRlUGFydHMubW9udGgpIHtcbiAgICAgICAgICAgIHRoaXMucGFyc2UgPSB0aGlzLnBhcnNlTW9udGg7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IERhdGVQYXJ0cy55ZWFyKSB7XG4gICAgICAgICAgICB0aGlzLnBhcnNlID0gdGhpcy5wYXJzZVllYXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZW5kKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0ICsgdGhpcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0IGlzRGF5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSA9PT0gRGF0ZVBhcnRzLmRheTtcbiAgICB9XG5cbiAgICBnZXQgaXNNb250aCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgPT09IERhdGVQYXJ0cy5tb250aDtcbiAgICB9XG5cbiAgICBnZXQgaXNZZWFyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSA9PT0gRGF0ZVBhcnRzLnllYXI7XG4gICAgfVxuXG4gICAgZ2V0IGZ1bGxOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLmlzRGF5KSB7IHJldHVybiAnZGF0ZSc7IH1cblxuICAgICAgICBpZiAodGhpcy5pc01vbnRoKSB7IHJldHVybiAnbW9udGgnOyB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNZZWFyKSB7IHJldHVybiAneWVhcic7IH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlRGF5KHZhbHVlOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBwYXJzZWRWYWx1ZTogbnVtYmVyID0gcGFyc2VJbnQodmFsdWUpO1xuXG4gICAgICAgIGlmIChwYXJzZWRWYWx1ZSA9PT0gMCkgeyByZXR1cm4gMTsgfVxuXG4gICAgICAgIGlmIChwYXJzZWRWYWx1ZSA+IHRoaXMubWF4RGF5cykgeyByZXR1cm4gdGhpcy5tYXhEYXlzOyB9XG5cbiAgICAgICAgcmV0dXJuIHBhcnNlZFZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VNb250aCh2YWx1ZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgcGFyc2VkVmFsdWU6IG51bWJlciA9IHBhcnNlSW50KHZhbHVlKTtcblxuICAgICAgICBpZiAocGFyc2VkVmFsdWUgPT09IDApIHsgcmV0dXJuIDE7IH1cblxuICAgICAgICBpZiAocGFyc2VkVmFsdWUgPiB0aGlzLm1heE1vbnRoKSB7IHJldHVybiB0aGlzLm1heE1vbnRoOyB9XG5cbiAgICAgICAgcmV0dXJuIHBhcnNlZFZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VZZWFyKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBwYXJzZWRWYWx1ZTogbnVtYmVyID0gcGFyc2VJbnQodmFsdWUpO1xuXG4gICAgICAgIGlmIChwYXJzZWRWYWx1ZSA9PT0gMCkgeyByZXR1cm4gMTsgfVxuXG4gICAgICAgIGlmIChwYXJzZWRWYWx1ZSA+IE1BWF9ZRUFSKSB7IHJldHVybiBNQVhfWUVBUjsgfVxuXG4gICAgICAgIHJldHVybiBwYXJzZWRWYWx1ZTtcbiAgICB9XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUNfREFURVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1jRGF0ZXBpY2tlcklucHV0KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19EQVRFUElDS0VSX1ZBTElEQVRPUlM6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1jRGF0ZXBpY2tlcklucHV0KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuXG4vKipcbiAqIEFuIGV2ZW50IHVzZWQgZm9yIGRhdGVwaWNrZXIgaW5wdXQgYW5kIGNoYW5nZSBldmVudHMuIFdlIGRvbid0IGFsd2F5cyBoYXZlIGFjY2VzcyB0byBhIG5hdGl2ZVxuICogaW5wdXQgb3IgY2hhbmdlIGV2ZW50IGJlY2F1c2UgdGhlIGV2ZW50IG1heSBoYXZlIGJlZW4gdHJpZ2dlcmVkIGJ5IHRoZSB1c2VyIGNsaWNraW5nIG9uIHRoZVxuICogY2FsZW5kYXIgcG9wdXAuIEZvciBjb25zaXN0ZW5jeSwgd2UgYWx3YXlzIHVzZSBNY0RhdGVwaWNrZXJJbnB1dEV2ZW50IGluc3RlYWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBNY0RhdGVwaWNrZXJJbnB1dEV2ZW50PEQ+IHtcbiAgICAvKiogVGhlIG5ldyB2YWx1ZSBmb3IgdGhlIHRhcmdldCBkYXRlcGlja2VyIGlucHV0LiAqL1xuICAgIHZhbHVlOiBEIHwgbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBkYXRlcGlja2VyIGlucHV0IGNvbXBvbmVudCB0aGF0IGVtaXR0ZWQgdGhlIGV2ZW50LiAqL1xuICAgICAgICBwdWJsaWMgdGFyZ2V0OiBNY0RhdGVwaWNrZXJJbnB1dDxEPixcbiAgICAgICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgbmF0aXZlIGlucHV0IGVsZW1lbnQgYXNzb2NpYXRlZCB3aXRoIHRoZSBkYXRlcGlja2VyIGlucHV0LiAqL1xuICAgICAgICBwdWJsaWMgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnRcbiAgICApIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudGFyZ2V0LnZhbHVlO1xuICAgIH1cbn1cblxubGV0IHVuaXF1ZUNvbXBvbmVudElkU3VmZml4ID0gMDtcblxuXG4vKiogRGlyZWN0aXZlIHVzZWQgdG8gY29ubmVjdCBhbiBpbnB1dCB0byBhIE1jRGF0ZXBpY2tlci4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnaW5wdXRbbWNEYXRlcGlja2VyXScsXG4gICAgZXhwb3J0QXM6ICdtY0RhdGVwaWNrZXJJbnB1dCcsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE1DX0RBVEVQSUNLRVJfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIE1DX0RBVEVQSUNLRVJfVkFMSURBVE9SUyxcbiAgICAgICAgeyBwcm92aWRlOiBNY0Zvcm1GaWVsZENvbnRyb2wsIHVzZUV4aXN0aW5nOiBNY0RhdGVwaWNrZXJJbnB1dCB9XG4gICAgXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtaW5wdXQgbWMtZGF0ZXBpY2tlcicsXG4gICAgICAgICdbYXR0ci5wbGFjZWhvbGRlcl0nOiAncGxhY2Vob2xkZXInLFxuICAgICAgICAnW2F0dHIucmVxdWlyZWRdJzogJ3JlcXVpcmVkJyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAgICAgJ1thdHRyLm1pbl0nOiAnbWluID8gdG9JU084NjAxKG1pbikgOiBudWxsJyxcbiAgICAgICAgJ1thdHRyLm1heF0nOiAnbWF4ID8gdG9JU084NjAxKG1heCkgOiBudWxsJyxcbiAgICAgICAgJ1thdHRyLmF1dG9jb21wbGV0ZV0nOiAnXCJvZmZcIicsXG5cbiAgICAgICAgJyhwYXN0ZSknOiAnb25QYXN0ZSgkZXZlbnQpJyxcbiAgICAgICAgJyhjaGFuZ2UpJzogJ29uQ2hhbmdlKCknLFxuXG4gICAgICAgICcoZm9jdXMpJzogJ2ZvY3VzQ2hhbmdlZCh0cnVlKScsXG4gICAgICAgICcoYmx1ciknOiAnb25CbHVyKCknLFxuXG4gICAgICAgICcoa2V5ZG93biknOiAnb25LZXlEb3duKCRldmVudCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0RhdGVwaWNrZXJJbnB1dDxEPiBpbXBsZW1lbnRzIE1jRm9ybUZpZWxkQ29udHJvbDxEPiwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIFZhbGlkYXRvciwgT25EZXN0cm95IHtcbiAgICByZWFkb25seSBzdGF0ZUNoYW5nZXM6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgcmVhZG9ubHkgZXJyb3JTdGF0ZTogYm9vbGVhbjtcblxuICAgIGNvbnRyb2xUeXBlOiBzdHJpbmcgPSAnZGF0ZXBpY2tlcic7XG5cbiAgICBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBkYXRlcGlja2VyOiBNY0RhdGVwaWNrZXI8RD47XG5cbiAgICBkYXRlRmlsdGVyOiAoZGF0ZTogRCB8IG51bGwpID0+IGJvb2xlYW47XG5cbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgdmFsdWUgY2hhbmdlcyAoZWl0aGVyIGR1ZSB0byB1c2VyIGlucHV0IG9yIHByb2dyYW1tYXRpYyBjaGFuZ2UpLiAqL1xuICAgIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxEIHwgbnVsbD4oKTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSBkaXNhYmxlZCBzdGF0ZSBoYXMgY2hhbmdlZCAqL1xuICAgIGRpc2FibGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7XG4gICAgfVxuXG4gICAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXF1aXJlZDogYm9vbGVhbjtcblxuICAgIC8qKiBUaGUgZGF0ZXBpY2tlciB0aGF0IHRoaXMgaW5wdXQgaXMgYXNzb2NpYXRlZCB3aXRoLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IG1jRGF0ZXBpY2tlcih2YWx1ZTogTWNEYXRlcGlja2VyPEQ+KSB7XG4gICAgICAgIGlmICghdmFsdWUpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5kYXRlcGlja2VyID0gdmFsdWU7XG4gICAgICAgIHRoaXMuZGF0ZXBpY2tlci5yZWdpc3RlcklucHV0KHRoaXMpO1xuICAgICAgICB0aGlzLmRhdGVwaWNrZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblxuICAgICAgICB0aGlzLmRhdGVwaWNrZXJTdWJzY3JpcHRpb24gPSB0aGlzLmRhdGVwaWNrZXIuc2VsZWN0ZWRDaGFuZ2VkXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChzZWxlY3RlZDogRCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBzZWxlY3RlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmN2YU9uQ2hhbmdlKHNlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZUNoYW5nZS5lbWl0KG5ldyBNY0RhdGVwaWNrZXJJbnB1dEV2ZW50KHRoaXMsIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogRnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBmaWx0ZXIgb3V0IGRhdGVzIHdpdGhpbiB0aGUgZGF0ZXBpY2tlci4gKi9cbiAgICBASW5wdXQoKVxuICAgIHNldCBtY0RhdGVwaWNrZXJGaWx0ZXIodmFsdWU6IChkYXRlOiBEIHwgbnVsbCkgPT4gYm9vbGVhbikge1xuICAgICAgICB0aGlzLmRhdGVGaWx0ZXIgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52YWxpZGF0b3JPbkNoYW5nZSgpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgdmFsdWUgb2YgdGhlIGlucHV0LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHZhbHVlKCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gdGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9ICFuZXdWYWx1ZSB8fCB0aGlzLmRhdGVBZGFwdGVyLmlzVmFsaWQobmV3VmFsdWUpO1xuXG4gICAgICAgIG5ld1ZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwobmV3VmFsdWUpO1xuXG4gICAgICAgIGNvbnN0IG9sZERhdGUgPSB0aGlzLnZhbHVlO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB0aGlzLmZvcm1hdFZhbHVlKG5ld1ZhbHVlKTtcblxuICAgICAgICBpZiAoIXRoaXMuZGF0ZUFkYXB0ZXIuc2FtZURhdGUob2xkRGF0ZSwgbmV3VmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQobmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdmFsdWU6IEQgfCBudWxsO1xuXG4gICAgLyoqIFRoZSBtaW5pbXVtIHZhbGlkIGRhdGUuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgbWluKCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbjtcbiAgICB9XG5cbiAgICBzZXQgbWluKHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9taW4gPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9taW46IEQgfCBudWxsO1xuXG4gICAgLyoqIFRoZSBtYXhpbXVtIHZhbGlkIGRhdGUuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgbWF4KCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heDtcbiAgICB9XG5cbiAgICBzZXQgbWF4KHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9tYXggPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tYXg6IEQgfCBudWxsO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRhdGVwaWNrZXItaW5wdXQgaXMgZGlzYWJsZWQuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKHRoaXMuX2Rpc2FibGVkICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZWRDaGFuZ2UuZW1pdChuZXdWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBuZWVkIHRvIG51bGwgY2hlY2sgdGhlIGBibHVyYCBtZXRob2QsIGJlY2F1c2UgaXQncyB1bmRlZmluZWQgZHVyaW5nIFNTUi5cbiAgICAgICAgaWYgKG5ld1ZhbHVlICYmIGVsZW1lbnQuYmx1cikge1xuICAgICAgICAgICAgLy8gTm9ybWFsbHksIG5hdGl2ZSBpbnB1dCBlbGVtZW50cyBhdXRvbWF0aWNhbGx5IGJsdXIgaWYgdGhleSB0dXJuIGRpc2FibGVkLiBUaGlzIGJlaGF2aW9yXG4gICAgICAgICAgICAvLyBpcyBwcm9ibGVtYXRpYywgYmVjYXVzZSBpdCB3b3VsZCBtZWFuIHRoYXQgaXQgdHJpZ2dlcnMgYW5vdGhlciBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlLFxuICAgICAgICAgICAgLy8gd2hpY2ggdGhlbiBjYXVzZXMgYSBjaGFuZ2VkIGFmdGVyIGNoZWNrZWQgZXJyb3IgaWYgdGhlIGlucHV0IGVsZW1lbnQgd2FzIGZvY3VzZWQgYmVmb3JlLlxuICAgICAgICAgICAgZWxlbWVudC5ibHVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cblxuICAgIHNldCBpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2lkID0gdmFsdWUgfHwgdGhpcy51aWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IG1jVmFsaWRhdGlvblRvb2x0aXAodG9vbHRpcDogTWNUb29sdGlwKSB7XG4gICAgICAgIGlmICghdG9vbHRpcCkgeyByZXR1cm47IH1cblxuICAgICAgICB0b29sdGlwLm1jTW91c2VFbnRlckRlbGF5ID0gdmFsaWRhdGlvblRvb2x0aXBTaG93RGVsYXk7XG4gICAgICAgIHRvb2x0aXAubWNUcmlnZ2VyID0gJ21hbnVhbCc7XG4gICAgICAgIHRvb2x0aXAubWNUb29sdGlwQ2xhc3MgPSAnbWMtdG9vbHRpcF93YXJuaW5nJztcblxuICAgICAgICB0b29sdGlwLmluaXRFbGVtZW50UmVmTGlzdGVuZXJzKCk7XG5cbiAgICAgICAgdGhpcy5pbmNvcnJlY3RJbnB1dC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRvb2x0aXAuaXNUb29sdGlwT3BlbikgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgdG9vbHRpcC5zaG93KCk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdG9vbHRpcC5oaWRlKCksIHZhbGlkYXRpb25Ub29sdGlwSGlkZURlbGF5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpIGluY29ycmVjdElucHV0ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gYSBgY2hhbmdlYCBldmVudCBpcyBmaXJlZCBvbiB0aGlzIGA8aW5wdXQ+YC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgZGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWNEYXRlcGlja2VySW5wdXRFdmVudDxEPj4oKTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIGFuIGBpbnB1dGAgZXZlbnQgaXMgZmlyZWQgb24gdGhpcyBgPGlucHV0PmAuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGRhdGVJbnB1dCA9IG5ldyBFdmVudEVtaXR0ZXI8TWNEYXRlcGlja2VySW5wdXRFdmVudDxEPj4oKTtcblxuICAgIGdldCBlbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnZpZXdWYWx1ZSAmJiAhdGhpcy5pc0JhZElucHV0KCk7XG4gICAgfVxuXG4gICAgZ2V0IHZpZXdWYWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IG5nQ29udHJvbCgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sO1xuICAgIH1cblxuICAgIGdldCBpc1JlYWRPbmx5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVhZE9ubHk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgc2VsZWN0aW9uU3RhcnQoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldCBzZWxlY3Rpb25TdGFydCh2YWx1ZTogbnVtYmVyIHwgbnVsbCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IHNlbGVjdGlvbkVuZCgpOiBudW1iZXIgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldCBzZWxlY3Rpb25FbmQodmFsdWU6IG51bWJlciB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb250cm9sOiBBYnN0cmFjdENvbnRyb2w7XG4gICAgcHJpdmF0ZSByZWFkb25seSB1aWQgPSBgbWMtZGF0ZXBpY2tlci0ke3VuaXF1ZUNvbXBvbmVudElkU3VmZml4Kyt9YDtcblxuICAgIHByaXZhdGUgZGF0ZXBpY2tlclN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIHByaXZhdGUgbG9jYWxlU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGxhc3QgdmFsdWUgc2V0IG9uIHRoZSBpbnB1dCB3YXMgdmFsaWQuICovXG4gICAgcHJpdmF0ZSBsYXN0VmFsdWVWYWxpZCA9IGZhbHNlO1xuXG4gICAgLyoqIFRoZSBjb21iaW5lZCBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGlzIGlucHV0LiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgdmFsaWRhdG9yOiBWYWxpZGF0b3JGbiB8IG51bGw7XG5cbiAgICBwcml2YXRlIHNlcGFyYXRvcjogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBmaXJzdERpZ2l0OiBEYXRlRGlnaXQ7XG4gICAgcHJpdmF0ZSBzZWNvbmREaWdpdDogRGF0ZURpZ2l0O1xuICAgIHByaXZhdGUgdGhpcmREaWdpdDogRGF0ZURpZ2l0O1xuXG4gICAgcHJpdmF0ZSBzZXBhcmF0b3JQb3NpdGlvbnM6IG51bWJlcltdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcmVhZG9ubHkgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1DX0RBVEVfRk9STUFUUykgcHJpdmF0ZSByZWFkb25seSBkYXRlRm9ybWF0czogTWNEYXRlRm9ybWF0c1xuICAgICkge1xuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IFZhbGlkYXRvcnMuY29tcG9zZShbXG4gICAgICAgICAgICB0aGlzLnBhcnNlVmFsaWRhdG9yLFxuICAgICAgICAgICAgdGhpcy5taW5WYWxpZGF0b3IsXG4gICAgICAgICAgICB0aGlzLm1heFZhbGlkYXRvcixcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyVmFsaWRhdG9yXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGlmICghdGhpcy5kYXRlQWRhcHRlcikge1xuICAgICAgICAgICAgdGhyb3cgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IoJ0RhdGVBZGFwdGVyJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuZGF0ZUZvcm1hdHMpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdNQ19EQVRFX0ZPUk1BVFMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0Rm9ybWF0KGRhdGVGb3JtYXRzLmRhdGVJbnB1dCk7XG5cbiAgICAgICAgdGhpcy5sb2NhbGVTdWJzY3JpcHRpb24gPSBkYXRlQWRhcHRlci5sb2NhbGVDaGFuZ2VzXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMudXBkYXRlTG9jYWxlUGFyYW1zKTtcbiAgICB9XG5cbiAgICBvbkNvbnRhaW5lckNsaWNrKCkge1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZm9jdXNDaGFuZ2VkKGlzRm9jdXNlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoaXNGb2N1c2VkICE9PSB0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IGlzRm9jdXNlZDtcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRhdGVwaWNrZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5sb2NhbGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLmRpc2FibGVkQ2hhbmdlLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLyoqIEBkb2NzLXByaXZhdGUgKi9cbiAgICByZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICAvKiogQGRvY3MtcHJpdmF0ZSAqL1xuICAgIHZhbGlkYXRlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgICAgICAgdGhpcy5zZXRDb250cm9sKGNvbnRyb2wpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvciA/IHRoaXMudmFsaWRhdG9yKGNvbnRyb2wpIDogbnVsbDtcbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgIHdyaXRlVmFsdWUodmFsdWU6IEQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jdmFPbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNSZWFkT25seSkgeyByZXR1cm47IH1cblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuXG4gICAgICAgIGlmICh0aGlzLmlzTGV0dGVyS2V5KGV2ZW50KSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5pbmNvcnJlY3RJbnB1dC5lbWl0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0tleUZvck9wZW4oZXZlbnQpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLmRhdGVwaWNrZXIub3BlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNLZXlGb3JDbG9zZShldmVudCkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuZGF0ZXBpY2tlci5jbG9zZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFRBQikge1xuICAgICAgICAgICAgdGhpcy5kYXRlcGlja2VyLmNsb3NlKGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzS2V5Rm9yQnlQYXNzKGV2ZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFNQQUNFKSB7XG4gICAgICAgICAgICB0aGlzLnNwYWNlS2V5SGFuZGxlcihldmVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoW1VQX0FSUk9XLCBET1dOX0FSUk9XXS5pbmNsdWRlcyhrZXlDb2RlKSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy52ZXJ0aWNhbEFycm93S2V5SGFuZGxlcihrZXlDb2RlKTtcbiAgICAgICAgfSBlbHNlIGlmIChbTEVGVF9BUlJPVywgUklHSFRfQVJST1csIEhPTUUsIFBBR0VfVVAsIEVORCwgUEFHRV9ET1dOXS5pbmNsdWRlcyhrZXlDb2RlKSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VDYXJldFBvc2l0aW9uKGtleUNvZGUpO1xuICAgICAgICB9IGVsc2UgaWYgKC9eXFxEJC8udGVzdChldmVudC5rZXkpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuZ2V0TmV3VmFsdWUoZXZlbnQua2V5LCB0aGlzLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcik7XG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMucmVwbGFjZVN5bWJvbHMobmV3VmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IGZvcm1hdHRlZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWaWV3VmFsdWUoZm9ybWF0dGVkVmFsdWUsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLm9uSW5wdXQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluY29ycmVjdElucHV0LmVtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5vbklucHV0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5wdXQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuY29ycmVjdEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbHVlID0gdGhpcy5yZXBsYWNlU3ltYm9scyh0aGlzLnZpZXdWYWx1ZSk7XG5cbiAgICAgICAgY29uc3QgbmV3VGltZU9iaiA9IHRoaXMuZ2V0RGF0ZUZyb21TdHJpbmcoZm9ybWF0dGVkVmFsdWUpO1xuICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gISFuZXdUaW1lT2JqO1xuXG4gICAgICAgIGlmICghbmV3VGltZU9iaikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZpZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmN2YU9uQ2hhbmdlKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFZpZXdWYWx1ZSh0aGlzLmdldFRpbWVTdHJpbmdGcm9tRGF0ZShuZXdUaW1lT2JqLCB0aGlzLmRhdGVGb3JtYXRzLmRhdGVJbnB1dCksIHRydWUpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0TmV4dERpZ2l0QnlDdXJzb3IoKHRoaXMuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShuZXdUaW1lT2JqKTtcbiAgICB9XG5cbiAgICBwYXJzZU9uQmx1ciA9ICgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnZpZXdWYWx1ZSkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLmdldERlZmF1bHRWYWx1ZSgpO1xuXG4gICAgICAgIGNvbnN0IHZpZXdEaWdpdHM6IHN0cmluZ1tdID0gdGhpcy52aWV3VmFsdWVcbiAgICAgICAgICAgIC5zcGxpdCh0aGlzLnNlcGFyYXRvcilcbiAgICAgICAgICAgIC5tYXAoKHZhbHVlOiBzdHJpbmcpID0+IHZhbHVlKVxuICAgICAgICAgICAgLmZpbHRlcigodmFsdWUpID0+IHZhbHVlKTtcblxuICAgICAgICBjb25zdCBbZmlyc1ZpZXdEaWdpdCwgc2Vjb25kVmlld0RpZ2l0LCB0aGlyZFZpZXdEaWdpdF0gPSB2aWV3RGlnaXRzO1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1tYWdpYy1udW1iZXJzXG4gICAgICAgIGlmICh2aWV3RGlnaXRzLmxlbmd0aCAhPT0gMykge1xuICAgICAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBudWxsO1xuXG4gICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dCgoKSA9PiB0aGlzLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGVbdGhpcy5maXJzdERpZ2l0LmZ1bGxOYW1lXSA9IHRoaXMuZmlyc3REaWdpdC5wYXJzZShmaXJzVmlld0RpZ2l0KTtcbiAgICAgICAgZGF0ZVt0aGlzLnNlY29uZERpZ2l0LmZ1bGxOYW1lXSA9IHRoaXMuc2Vjb25kRGlnaXQucGFyc2Uoc2Vjb25kVmlld0RpZ2l0KTtcbiAgICAgICAgZGF0ZVt0aGlzLnRoaXJkRGlnaXQuZnVsbE5hbWVdID0gdGhpcy50aGlyZERpZ2l0LnBhcnNlKHRoaXJkVmlld0RpZ2l0KTtcblxuICAgICAgICBjb25zdCBbZGlnaXRXaXRoWWVhciwgdmlld0RpZ2l0V2l0aFllYXJdID0gW3RoaXMuZmlyc3REaWdpdCwgdGhpcy5zZWNvbmREaWdpdCwgdGhpcy50aGlyZERpZ2l0XVxuICAgICAgICAgICAgLnJlZHVjZSgoYWNjLCBkaWdpdCwgaW5kZXgpID0+IGRpZ2l0LnZhbHVlID09PSBEYXRlUGFydHMueWVhciA/IFtkaWdpdCwgdmlld0RpZ2l0c1tpbmRleF1dIDogYWNjLCBbXSk7XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnNcbiAgICAgICAgaWYgKHZpZXdEaWdpdFdpdGhZZWFyLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1tYWdpYy1udW1iZXJzXG4gICAgICAgICAgICBkYXRlLnllYXIgKz0gZGF0ZS55ZWFyIDwgMzAgPyAyMDAwIDogMTkwMDtcbiAgICAgICAgfSBlbHNlIGlmICh2aWV3RGlnaXRXaXRoWWVhci5sZW5ndGggPCBkaWdpdFdpdGhZZWFyLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBudWxsO1xuXG4gICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dCgoKSA9PiB0aGlzLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5ld1RpbWVPYmogPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmNyZWF0ZURhdGVUaW1lKFxuICAgICAgICAgICAgZGF0ZS55ZWFyLCBkYXRlLm1vbnRoIC0gMSwgZGF0ZS5kYXRlLCBkYXRlLmhvdXJzLCBkYXRlLm1pbnV0ZXMsIGRhdGUuc2Vjb25kcywgZGF0ZS5taWxsaXNlY29uZHNcbiAgICAgICAgKSk7XG5cbiAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9ICEhbmV3VGltZU9iajtcblxuICAgICAgICB0aGlzLnNldFZpZXdWYWx1ZSh0aGlzLmdldFRpbWVTdHJpbmdGcm9tRGF0ZShuZXdUaW1lT2JqLCB0aGlzLmRhdGVGb3JtYXRzLmRhdGVJbnB1dCksIHRydWUpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUobmV3VGltZU9iaik7XG4gICAgfVxuXG4gICAgb25DaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMuZGF0ZUNoYW5nZS5lbWl0KG5ldyBNY0RhdGVwaWNrZXJJbnB1dEV2ZW50KHRoaXMsIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSk7XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMgYmx1ciBldmVudHMgb24gdGhlIGlucHV0LiAqL1xuICAgIG9uQmx1cigpIHtcbiAgICAgICAgLy8gUmVmb3JtYXQgdGhlIGlucHV0IG9ubHkgaWYgd2UgaGF2ZSBhIHZhbGlkIHZhbHVlLlxuICAgICAgICB0aGlzLnBhcnNlT25CbHVyKCk7XG5cbiAgICAgICAgdGhpcy5mb2N1c0NoYW5nZWQoZmFsc2UpO1xuICAgIH1cblxuICAgIG9uUGFzdGUoJGV2ZW50KSB7XG4gICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHJhd1ZhbHVlID0gJGV2ZW50LmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dCcpO1xuXG4gICAgICAgIGNvbnN0IG1hdGNoOiBSZWdFeHBNYXRjaEFycmF5IHwgbnVsbCA9IHJhd1ZhbHVlLm1hdGNoKC9eKD88Zmlyc3Q+XFxkKylcXFcoPzxzZWNvbmQ+XFxkKylcXFcoPzx0aGlyZD5cXGQrKSQvKTtcblxuICAgICAgICBpZiAoIW1hdGNoPy5ncm91cHM/LmZpcnN0IHx8ICFtYXRjaD8uZ3JvdXBzPy5zZWNvbmQgfHwgIW1hdGNoPy5ncm91cHM/LnRoaXJkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZpZXdWYWx1ZShyYXdWYWx1ZSk7XG5cbiAgICAgICAgICAgIHJldHVybiByYXdWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZhbHVlID0gW21hdGNoLmdyb3Vwcy5maXJzdCwgbWF0Y2guZ3JvdXBzLnNlY29uZCwgbWF0Y2guZ3JvdXBzLnRoaXJkXS5qb2luKHRoaXMuc2VwYXJhdG9yKTtcblxuICAgICAgICBjb25zdCBuZXdUaW1lT2JqID0gdGhpcy5nZXREYXRlRnJvbVN0cmluZyh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKCFuZXdUaW1lT2JqKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZpZXdWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKHRoaXMuZ2V0VGltZVN0cmluZ0Zyb21EYXRlKG5ld1RpbWVPYmosIHRoaXMuZGF0ZUZvcm1hdHMuZGF0ZUlucHV0KSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShuZXdUaW1lT2JqKTtcbiAgICB9XG5cbiAgICB0b0lTTzg2MDEodmFsdWU6IEQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlQWRhcHRlci50b0lzbzg2MDEodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlTG9jYWxlUGFyYW1zID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldEZvcm1hdCh0aGlzLmRhdGVGb3JtYXRzLmRhdGVJbnB1dCk7XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRGb3JtYXQoZm9ybWF0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXBhcmF0b3IgPSBmb3JtYXQubWF0Y2goL1thQS16Wl0rKD88c2VwYXJhdG9yPlxcV3xcXEQpW2FBLXpaXSsvKSEuZ3JvdXBzLnNlcGFyYXRvcjtcbiAgICAgICAgdGhpcy5zZXBhcmF0b3JQb3NpdGlvbnMgPSBmb3JtYXRcbiAgICAgICAgICAgIC5zcGxpdCgnJylcbiAgICAgICAgICAgIC5yZWR1Y2UoKGFjYywgaXRlbSwgaW5kZXg6IG51bWJlcikgPT4gdGhpcy5zZXBhcmF0b3IgPT09IGl0ZW0gPyBbLi4uYWNjLCBpbmRleCArIDFdIDogYWNjLCBbXSk7XG5cbiAgICAgICAgdGhpcy5nZXREaWdpdFBvc2l0aW9ucyhmb3JtYXQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVmFsdWUobmV3VmFsdWU6IEQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGVBZGFwdGVyLnNhbWVEYXRlKG5ld1ZhbHVlLCB0aGlzLnZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuY3ZhT25DaGFuZ2UobmV3VmFsdWUpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuZGF0ZUlucHV0LmVtaXQobmV3IE1jRGF0ZXBpY2tlcklucHV0RXZlbnQodGhpcywgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzS2V5Rm9yQ2xvc2UoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiBib29sZWFuIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICByZXR1cm4gKGV2ZW50LmFsdEtleSAmJiBldmVudC5rZXlDb2RlID09PSBVUF9BUlJPVykgfHwgZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNLZXlGb3JPcGVuKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogYm9vbGVhbiB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgcmV0dXJuIGV2ZW50LmFsdEtleSAmJiBldmVudC5rZXlDb2RlID09PSBET1dOX0FSUk9XO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNMZXR0ZXJLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGlzTGV0dGVyS2V5KGV2ZW50KSAmJiAhZXZlbnQuY3RybEtleSAmJiAhZXZlbnQubWV0YUtleTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzS2V5Rm9yQnlQYXNzKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogYm9vbGVhbiB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgcmV0dXJuIChoYXNNb2RpZmllcktleShldmVudCkgJiYgKGlzVmVydGljYWxNb3ZlbWVudChldmVudC5rZXlDb2RlKSB8fCBpc0hvcml6b250YWxNb3ZlbWVudChldmVudC5rZXlDb2RlKSkpIHx8XG4gICAgICAgICAgICBldmVudC5jdHJsS2V5IHx8XG4gICAgICAgICAgICBldmVudC5tZXRhS2V5O1xuICAgIH1cblxuICAgIHByaXZhdGUgc3BhY2VLZXlIYW5kbGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uU3RhcnQgPT09IHRoaXMuc2VsZWN0aW9uRW5kKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0TmV3VmFsdWUoZXZlbnQua2V5LCB0aGlzLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcik7XG4gICAgICAgICAgICB0aGlzLnNldFZpZXdWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5vbklucHV0KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGlvblN0YXJ0ICE9PSB0aGlzLnNlbGVjdGlvbkVuZCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3ROZXh0RGlnaXQodGhpcy5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXROZXdWYWx1ZShrZXk6IHN0cmluZywgcG9zaXRpb246IG51bWJlcikge1xuICAgICAgICByZXR1cm4gW3RoaXMudmlld1ZhbHVlLnNsaWNlKDAsIHBvc2l0aW9uKSwga2V5LCB0aGlzLnZpZXdWYWx1ZS5zbGljZShwb3NpdGlvbildLmpvaW4oJycpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Vmlld1ZhbHVlKHZhbHVlOiBzdHJpbmcsIHNhdmVQb3NpdGlvbjogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChzYXZlUG9zaXRpb24pIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0ID0gdGhpcy5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbkVuZCA9IHRoaXMuc2VsZWN0aW9uRW5kO1xuXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCB2YWx1ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXBsYWNlU3ltYm9scyh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgICAgICAuc3BsaXQodGhpcy5zZXBhcmF0b3IpXG4gICAgICAgICAgICAubWFwKChwYXJ0OiBzdHJpbmcpID0+IHBhcnQucmVwbGFjZSgvXihbMC05XSspXFxXJC8sICcwJDEnKSlcbiAgICAgICAgICAgIC5qb2luKHRoaXMuc2VwYXJhdG9yKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERhdGVGcm9tU3RyaW5nKHRpbWVTdHJpbmc6IHN0cmluZyk6IEQgfCBudWxsIHtcbiAgICAgICAgaWYgKCF0aW1lU3RyaW5nIHx8IHRpbWVTdHJpbmcubGVuZ3RoIDwgdGhpcy5maXJzdERpZ2l0Lmxlbmd0aCkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLmdldERlZmF1bHRWYWx1ZSgpO1xuXG4gICAgICAgIGNvbnN0IHZpZXdEaWdpdHM6IHN0cmluZ1tdID0gdGltZVN0cmluZ1xuICAgICAgICAgICAgLnNwbGl0KHRoaXMuc2VwYXJhdG9yKVxuICAgICAgICAgICAgLm1hcCgodmFsdWU6IHN0cmluZykgPT4gdmFsdWUpO1xuXG4gICAgICAgIGNvbnN0IFtmaXJzVmlld0RpZ2l0LCBzZWNvbmRWaWV3RGlnaXQsIHRoaXJkVmlld0RpZ2l0XSA9IHZpZXdEaWdpdHM7XG5cbiAgICAgICAgaWYgKHZpZXdEaWdpdHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBpZiAoZmlyc1ZpZXdEaWdpdC5sZW5ndGggPCB0aGlzLmZpcnN0RGlnaXQubGVuZ3RoKSB7IHJldHVybiBudWxsOyB9XG5cblxuICAgICAgICAgICAgZGF0ZVt0aGlzLmZpcnN0RGlnaXQuZnVsbE5hbWVdID0gdGhpcy5maXJzdERpZ2l0LnBhcnNlKGZpcnNWaWV3RGlnaXQpO1xuICAgICAgICAgICAgZGF0ZS5tb250aCA9IDE7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1tYWdpYy1udW1iZXJzXG4gICAgICAgIH0gZWxzZSBpZiAodmlld0RpZ2l0cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIGlmIChmaXJzVmlld0RpZ2l0Lmxlbmd0aCA8IHRoaXMuZmlyc3REaWdpdC5sZW5ndGggfHwgc2Vjb25kVmlld0RpZ2l0Lmxlbmd0aCA8IHRoaXMuc2Vjb25kRGlnaXQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGVbdGhpcy5maXJzdERpZ2l0LmZ1bGxOYW1lXSA9IHRoaXMuZmlyc3REaWdpdC5wYXJzZShmaXJzVmlld0RpZ2l0KTtcbiAgICAgICAgICAgIGRhdGVbdGhpcy5zZWNvbmREaWdpdC5mdWxsTmFtZV0gPSB0aGlzLnNlY29uZERpZ2l0LnBhcnNlKHNlY29uZFZpZXdEaWdpdCk7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1tYWdpYy1udW1iZXJzXG4gICAgICAgIH0gZWxzZSBpZiAodmlld0RpZ2l0cy5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBmaXJzVmlld0RpZ2l0Lmxlbmd0aCA8IHRoaXMuZmlyc3REaWdpdC5sZW5ndGggfHxcbiAgICAgICAgICAgICAgICBzZWNvbmRWaWV3RGlnaXQubGVuZ3RoIDwgdGhpcy5zZWNvbmREaWdpdC5sZW5ndGggfHxcbiAgICAgICAgICAgICAgICB0aGlyZFZpZXdEaWdpdC5sZW5ndGggPCB0aGlzLnRoaXJkRGlnaXQubGVuZ3RoXG4gICAgICAgICAgICApIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICAgICAgZGF0ZVt0aGlzLmZpcnN0RGlnaXQuZnVsbE5hbWVdID0gdGhpcy5maXJzdERpZ2l0LnBhcnNlKGZpcnNWaWV3RGlnaXQpO1xuICAgICAgICAgICAgZGF0ZVt0aGlzLnNlY29uZERpZ2l0LmZ1bGxOYW1lXSA9IHRoaXMuc2Vjb25kRGlnaXQucGFyc2Uoc2Vjb25kVmlld0RpZ2l0KTtcbiAgICAgICAgICAgIGRhdGVbdGhpcy50aGlyZERpZ2l0LmZ1bGxOYW1lXSA9IHRoaXMudGhpcmREaWdpdC5wYXJzZSh0aGlyZFZpZXdEaWdpdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmNyZWF0ZURhdGVUaW1lKFxuICAgICAgICAgICAgZGF0ZS55ZWFyLCBkYXRlLm1vbnRoIC0gMSwgZGF0ZS5kYXRlLCBkYXRlLmhvdXJzLCBkYXRlLm1pbnV0ZXMsIGRhdGUuc2Vjb25kcywgZGF0ZS5taWxsaXNlY29uZHNcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREZWZhdWx0VmFsdWUoKSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IHRoaXMudmFsdWUgfHwgdGhpcy5kYXRlQWRhcHRlci50b2RheSgpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB5ZWFyOiB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIoZGVmYXVsdFZhbHVlKSxcbiAgICAgICAgICAgIG1vbnRoOiB0aGlzLmRhdGVBZGFwdGVyLmdldE1vbnRoKGRlZmF1bHRWYWx1ZSksXG4gICAgICAgICAgICBkYXRlOiB0aGlzLmRhdGVBZGFwdGVyLmdldERhdGUoZGVmYXVsdFZhbHVlKSxcbiAgICAgICAgICAgIGhvdXJzOiB0aGlzLmRhdGVBZGFwdGVyLmdldEhvdXJzKGRlZmF1bHRWYWx1ZSksXG4gICAgICAgICAgICBtaW51dGVzOiB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbnV0ZXMoZGVmYXVsdFZhbHVlKSxcbiAgICAgICAgICAgIHNlY29uZHM6IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0U2Vjb25kcyhkZWZhdWx0VmFsdWUpLFxuICAgICAgICAgICAgbWlsbGlzZWNvbmRzOiB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbGxpc2Vjb25kcyhkZWZhdWx0VmFsdWUpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUaW1lU3RyaW5nRnJvbURhdGUodmFsdWU6IEQgfCBudWxsLCB0aW1lRm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXZhbHVlIHx8ICF0aGlzLmRhdGVBZGFwdGVyLmlzVmFsaWQodmFsdWUpKSB7IHJldHVybiAnJzsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVBZGFwdGVyLmZvcm1hdCh2YWx1ZSwgdGltZUZvcm1hdCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREYXRlRWRpdE1ldHJpY3MoY3Vyc29yUG9zaXRpb246IG51bWJlcik6IFtcbiAgICAgICAgbW9kaWZpZWRUaW1lUGFydDogRGF0ZVBhcnRzLFxuICAgICAgICBjdXJzb3JTdGFydFBvc2l0aW9uOiBudW1iZXIsXG4gICAgICAgIGN1cnNvckVuZFBvc2l0aW9uOiBudW1iZXJcbiAgICBdIHtcbiAgICAgICAgZm9yIChjb25zdCBkaWdpdCBvZiBbdGhpcy5maXJzdERpZ2l0LCB0aGlzLnNlY29uZERpZ2l0LCB0aGlzLnRoaXJkRGlnaXRdKSB7XG4gICAgICAgICAgICBpZiAoY3Vyc29yUG9zaXRpb24gPj0gZGlnaXQuc3RhcnQgJiYgY3Vyc29yUG9zaXRpb24gPD0gZGlnaXQuZW5kKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtkaWdpdC52YWx1ZSwgZGlnaXQuc3RhcnQsIGRpZ2l0LmVuZF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW3RoaXMudGhpcmREaWdpdC52YWx1ZSwgdGhpcy50aGlyZERpZ2l0LnN0YXJ0LCB0aGlzLnRoaXJkRGlnaXQuZW5kXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluY3JlbWVudERhdGUoZGF0ZVZhbDogRCwgd2hhdFRvSW5jcmVtZW50OiBEYXRlUGFydHMpOiBEIHtcbiAgICAgICAgbGV0IHllYXIgPSB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIoZGF0ZVZhbCk7XG4gICAgICAgIGxldCBtb250aCA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TW9udGgoZGF0ZVZhbCk7XG4gICAgICAgIGxldCBkYXkgPSB0aGlzLmRhdGVBZGFwdGVyLmdldERhdGUoZGF0ZVZhbCk7XG5cbiAgICAgICAgc3dpdGNoICh3aGF0VG9JbmNyZW1lbnQpIHtcbiAgICAgICAgICAgIGNhc2UgRGF0ZVBhcnRzLmRheTpcbiAgICAgICAgICAgICAgICBkYXkrKztcblxuICAgICAgICAgICAgICAgIGlmIChkYXkgPiB0aGlzLmRhdGVBZGFwdGVyLmdldE51bURheXNJbk1vbnRoKGRhdGVWYWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRheSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIERhdGVQYXJ0cy5tb250aDpcbiAgICAgICAgICAgICAgICBtb250aCsrO1xuXG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnNcbiAgICAgICAgICAgICAgICBpZiAobW9udGggPiAxMSkge1xuICAgICAgICAgICAgICAgICAgICBtb250aCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdERheSA9IHRoaXMuZ2V0TGFzdERheUZvcih5ZWFyLCBtb250aCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF5ID4gbGFzdERheSkge1xuICAgICAgICAgICAgICAgICAgICBkYXkgPSBsYXN0RGF5O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBEYXRlUGFydHMueWVhcjpcbiAgICAgICAgICAgICAgICB5ZWFyKys7XG5cbiAgICAgICAgICAgICAgICBpZiAoeWVhciA+IE1BWF9ZRUFSKSB7XG4gICAgICAgICAgICAgICAgICAgIHllYXIgPSAxO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZURhdGUoeWVhciwgbW9udGgsIGRheSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRMYXN0RGF5Rm9yKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVBZGFwdGVyLmdldE51bURheXNJbk1vbnRoKHRoaXMuY3JlYXRlRGF0ZSh5ZWFyLCBtb250aCwgMSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVjcmVtZW50RGF0ZShkYXRlVmFsOiBELCB3aGF0VG9EZWNyZW1lbnQ6IERhdGVQYXJ0cyk6IEQge1xuICAgICAgICBsZXQgeWVhciA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcihkYXRlVmFsKTtcbiAgICAgICAgbGV0IG1vbnRoID0gdGhpcy5kYXRlQWRhcHRlci5nZXRNb250aChkYXRlVmFsKTtcbiAgICAgICAgbGV0IGRheSA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0RGF0ZShkYXRlVmFsKTtcblxuICAgICAgICBzd2l0Y2ggKHdoYXRUb0RlY3JlbWVudCkge1xuICAgICAgICAgICAgY2FzZSBEYXRlUGFydHMuZGF5OlxuICAgICAgICAgICAgICAgIGRheS0tO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRheSA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF5ID0gdGhpcy5kYXRlQWRhcHRlci5nZXROdW1EYXlzSW5Nb250aChkYXRlVmFsKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRGF0ZVBhcnRzLm1vbnRoOlxuICAgICAgICAgICAgICAgIG1vbnRoLS07XG5cbiAgICAgICAgICAgICAgICBpZiAobW9udGggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1tYWdpYy1udW1iZXJzXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoID0gMTE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdERheSA9IHRoaXMuZ2V0TGFzdERheUZvcih5ZWFyLCBtb250aCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF5ID4gbGFzdERheSkge1xuICAgICAgICAgICAgICAgICAgICBkYXkgPSBsYXN0RGF5O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBEYXRlUGFydHMueWVhcjpcbiAgICAgICAgICAgICAgICB5ZWFyLS07XG5cbiAgICAgICAgICAgICAgICBpZiAoeWVhciA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgeWVhciA9IE1BWF9ZRUFSO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZURhdGUoeWVhciwgbW9udGgsIGRheSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2ZXJ0aWNhbEFycm93S2V5SGFuZGxlcihrZXlDb2RlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnZhbHVlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGxldCBjaGFuZ2VkVGltZTtcblxuICAgICAgICBjb25zdCBbbW9kaWZpZWRUaW1lUGFydCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZF0gPSB0aGlzLmdldERhdGVFZGl0TWV0cmljcyh0aGlzLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcik7XG5cbiAgICAgICAgaWYgKGtleUNvZGUgPT09IFVQX0FSUk9XKSB7XG4gICAgICAgICAgICBjaGFuZ2VkVGltZSA9IHRoaXMuaW5jcmVtZW50RGF0ZSh0aGlzLnZhbHVlLCBtb2RpZmllZFRpbWVQYXJ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXlDb2RlID09PSBET1dOX0FSUk9XKSB7XG4gICAgICAgICAgICBjaGFuZ2VkVGltZSA9IHRoaXMuZGVjcmVtZW50RGF0ZSh0aGlzLnZhbHVlLCBtb2RpZmllZFRpbWVQYXJ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmFsdWUgPSBjaGFuZ2VkVGltZTtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kO1xuXG4gICAgICAgIHRoaXMuY3ZhT25DaGFuZ2UoY2hhbmdlZFRpbWUpO1xuXG4gICAgICAgIHRoaXMub25DaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlQ2FyZXRQb3NpdGlvbihrZXlDb2RlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnZhbHVlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGxldCBjdXJzb3JQb3MgPSB0aGlzLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcjtcblxuICAgICAgICBpZiAoW0hPTUUsIFBBR0VfVVBdLmluY2x1ZGVzKGtleUNvZGUpKSB7XG4gICAgICAgICAgICBjdXJzb3JQb3MgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKFtFTkQsIFBBR0VfRE9XTl0uaW5jbHVkZXMoa2V5Q29kZSkpIHtcbiAgICAgICAgICAgIGN1cnNvclBvcyA9IHRoaXMudmlld1ZhbHVlLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBMRUZUX0FSUk9XKSB7XG4gICAgICAgICAgICBjdXJzb3JQb3MgPSBjdXJzb3JQb3MgPT09IDAgPyB0aGlzLnZpZXdWYWx1ZS5sZW5ndGggOiBjdXJzb3JQb3MgLSAxO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFJJR0hUX0FSUk9XKSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0U2VwYXJhdG9yUG9zOiBudW1iZXIgPSB0aGlzLnZpZXdWYWx1ZS5pbmRleE9mKHRoaXMuc2VwYXJhdG9yLCBjdXJzb3JQb3MpO1xuXG4gICAgICAgICAgICBjdXJzb3JQb3MgPSBuZXh0U2VwYXJhdG9yUG9zID8gbmV4dFNlcGFyYXRvclBvcyArIDEgOiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWxlY3REaWdpdEJ5Q3Vyc29yKGN1cnNvclBvcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZWxlY3REaWdpdEJ5Q3Vyc29yKGN1cnNvclBvczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgWywgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZF0gPSB0aGlzLmdldERhdGVFZGl0TWV0cmljcyhjdXJzb3JQb3MpO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZWxlY3ROZXh0RGlnaXRCeUN1cnNvcihjdXJzb3JQb3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFssICwgZW5kUG9zaXRpb25PZkN1cnJlbnREaWdpdF0gPSB0aGlzLmdldERhdGVFZGl0TWV0cmljcyhjdXJzb3JQb3MpO1xuICAgICAgICAgICAgY29uc3QgWywgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZF0gPSB0aGlzLmdldERhdGVFZGl0TWV0cmljcyhlbmRQb3NpdGlvbk9mQ3VycmVudERpZ2l0ICsgMSk7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNlbGVjdE5leHREaWdpdChjdXJzb3JQb3M6IG51bWJlciwgY3ljbGU6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RWYWx1ZSA9IGN5Y2xlID8gMCA6IGN1cnNvclBvcztcbiAgICAgICAgICAgIGNvbnN0IG5leHRTZXBhcmF0b3JQb3M6IG51bWJlciA9IHRoaXMudmlld1ZhbHVlLmluZGV4T2YodGhpcy5zZXBhcmF0b3IsIGN1cnNvclBvcyk7XG5cbiAgICAgICAgICAgIGNvbnN0IG5ld0N1cnNvclBvcyA9IG5leHRTZXBhcmF0b3JQb3MgPiAwID8gbmV4dFNlcGFyYXRvclBvcyArIDEgOiBsYXN0VmFsdWU7XG5cbiAgICAgICAgICAgIGNvbnN0IFssIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmRdID0gdGhpcy5nZXREYXRlRWRpdE1ldHJpY3MobmV3Q3Vyc29yUG9zKTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgaXMgaW52YWxpZCBiYXNlZCBvbiB0aGUgbmF0aXZlIHZhbGlkYXRpb24uICovXG4gICAgcHJpdmF0ZSBpc0JhZElucHV0KCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCB2YWxpZGl0eSA9ICg8SFRNTElucHV0RWxlbWVudD4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLnZhbGlkaXR5O1xuXG4gICAgICAgIHJldHVybiB2YWxpZGl0eSAmJiB2YWxpZGl0eS5iYWRJbnB1dDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGN2YU9uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gICAgcHJpdmF0ZSB2YWxpZGF0b3JPbkNoYW5nZSA9ICgpID0+IHt9O1xuXG4gICAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB3aGV0aGVyIHRoZSBpbnB1dCBwYXJzZXMuICovXG4gICAgcHJpdmF0ZSBwYXJzZVZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5mb2N1c2VkIHx8XG4gICAgICAgICAgICB0aGlzLmVtcHR5IHx8XG4gICAgICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID8gbnVsbCA6IHsgbWNEYXRlcGlja2VyUGFyc2U6IHsgdGV4dDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgfSB9O1xuICAgIH1cblxuICAgIC8qKiBUaGUgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhlIG1pbiBkYXRlLiAqL1xuICAgIHByaXZhdGUgbWluVmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZSkpO1xuXG4gICAgICAgIHJldHVybiAoIXRoaXMubWluIHx8ICFjb250cm9sVmFsdWUgfHxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuY29tcGFyZURhdGUodGhpcy5taW4sIGNvbnRyb2xWYWx1ZSkgPD0gMCkgP1xuICAgICAgICAgICAgbnVsbCA6IHsgbWNEYXRlcGlja2VyTWluOiB7IG1pbjogdGhpcy5taW4sIGFjdHVhbDogY29udHJvbFZhbHVlIH0gfTtcbiAgICB9XG5cbiAgICAvKiogVGhlIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoZSBtYXggZGF0ZS4gKi9cbiAgICBwcml2YXRlIG1heFZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICBjb25zdCBjb250cm9sVmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWUpKTtcblxuICAgICAgICByZXR1cm4gKCF0aGlzLm1heCB8fCAhY29udHJvbFZhbHVlIHx8XG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmNvbXBhcmVEYXRlKHRoaXMubWF4LCBjb250cm9sVmFsdWUpID49IDApID9cbiAgICAgICAgICAgIG51bGwgOiB7IG1jRGF0ZXBpY2tlck1heDogeyBtYXg6IHRoaXMubWF4LCBhY3R1YWw6IGNvbnRyb2xWYWx1ZSB9IH07XG4gICAgfVxuXG4gICAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGUgZGF0ZSBmaWx0ZXIuICovXG4gICAgcHJpdmF0ZSBmaWx0ZXJWYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgICAgY29uc3QgY29udHJvbFZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlKSk7XG5cbiAgICAgICAgcmV0dXJuICF0aGlzLmRhdGVGaWx0ZXIgfHwgIWNvbnRyb2xWYWx1ZSB8fCB0aGlzLmRhdGVGaWx0ZXIoY29udHJvbFZhbHVlKSA/XG4gICAgICAgICAgICBudWxsIDogeyBtY0RhdGVwaWNrZXJGaWx0ZXI6IHRydWUgfTtcbiAgICB9XG5cbiAgICAvKiogRm9ybWF0cyBhIHZhbHVlIGFuZCBzZXRzIGl0IG9uIHRoZSBpbnB1dCBlbGVtZW50LiAqL1xuICAgIHByaXZhdGUgZm9ybWF0VmFsdWUodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbHVlID0gdmFsdWUgPyB0aGlzLmRhdGVBZGFwdGVyLmZvcm1hdCh2YWx1ZSwgdGhpcy5kYXRlRm9ybWF0cy5kYXRlSW5wdXQpIDogJyc7XG5cbiAgICAgICAgdGhpcy5zZXRWaWV3VmFsdWUoZm9ybWF0dGVkVmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyBUaGUgZ2l2ZW4gb2JqZWN0IGlmIGl0IGlzIGJvdGggYSBkYXRlIGluc3RhbmNlIGFuZCB2YWxpZCwgb3RoZXJ3aXNlIG51bGwuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRWYWxpZERhdGVPck51bGwob2JqOiBhbnkpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiAodGhpcy5kYXRlQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmIHRoaXMuZGF0ZUFkYXB0ZXIuaXNWYWxpZChvYmopKSA/IG9iaiA6IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRDb250cm9sKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sID0gY29udHJvbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGlnaXRQb3NpdGlvbnMoZm9ybWF0OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZm9ybWF0SW5Mb3dlckNhc2UgPSBmb3JtYXQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBmb3JtYXRJbkxvd2VyQ2FzZVxuICAgICAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAgICAgLnJlZHVjZShcbiAgICAgICAgICAgICAgICAoeyBwcmV2LCBsZW5ndGgsIHN0YXJ0IH0sIHZhbHVlOiBzdHJpbmcsIGluZGV4OiBudW1iZXIsIGFycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHRoaXMuc2VwYXJhdG9yIHx8IChhcnIubGVuZ3RoIC0gMSkgPT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZmlyc3REaWdpdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3REaWdpdCA9IG5ldyBEYXRlRGlnaXQocHJldiwgc3RhcnQsIGxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnNlY29uZERpZ2l0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWNvbmREaWdpdCA9IG5ldyBEYXRlRGlnaXQocHJldiwgc3RhcnQsIGxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnRoaXJkRGlnaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRoaXJkRGlnaXQgPSBuZXcgRGF0ZURpZ2l0KHByZXYsIHN0YXJ0LCBhcnIubGVuZ3RoIC0gc3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZTpuby1wYXJhbWV0ZXItcmVhc3NpZ25tZW50XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSBpbmRleCArIDE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGgrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHByZXY6IHZhbHVlLCBsZW5ndGgsIHN0YXJ0IH07XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7IGxlbmd0aDogMCwgc3RhcnQ6IDAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICBpZiAoIXRoaXMuZmlyc3REaWdpdCB8fCAhdGhpcy5zZWNvbmREaWdpdCB8fCAhdGhpcy50aGlyZERpZ2l0KSB7XG4gICAgICAgICAgICBFcnJvcihgQ2FuJyB0IHVzZSB0aGlzIGZvcm1hdDogJHtmb3JtYXR9YCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZURhdGUoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXk6IG51bWJlcik6IEQge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlQWRhcHRlci5jcmVhdGVEYXRlVGltZShcbiAgICAgICAgICAgIHllYXIsXG4gICAgICAgICAgICBtb250aCxcbiAgICAgICAgICAgIGRheSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0SG91cnModGhpcy52YWx1ZSBhcyBEKSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TWludXRlcyh0aGlzLnZhbHVlIGFzIEQpLFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRTZWNvbmRzKHRoaXMudmFsdWUgYXMgRCksXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbGxpc2Vjb25kcyh0aGlzLnZhbHVlIGFzIEQpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb3JyZWN0Q3Vyc29yUG9zaXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvblN0YXJ0ICYmIHRoaXMuc2VwYXJhdG9yUG9zaXRpb25zLmluY2x1ZGVzKHRoaXMuc2VsZWN0aW9uU3RhcnQpKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gdGhpcy5zZWxlY3Rpb25TdGFydCAtIDE7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=