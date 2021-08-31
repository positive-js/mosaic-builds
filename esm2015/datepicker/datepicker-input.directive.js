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
            date.month = this.dateAdapter.firstMonth;
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
                    '[attr.min]': 'min ? toISO8601(min) : null',
                    '[attr.max]': 'max ? toISO8601(max) : null',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pbnB1dC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvZGF0ZXBpY2tlci9kYXRlcGlja2VyLWlucHV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsMEJBQTBCO0FBQzFCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBR0gsYUFBYSxFQUNiLGlCQUFpQixFQUlqQixVQUFVLEVBQ2IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBaUIsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RixPQUFPLEVBQ0gsU0FBUyxFQUNULE1BQU0sRUFDTixRQUFRLEVBQ1IsV0FBVyxFQUNYLFVBQVUsRUFDVixVQUFVLEVBQ1YsR0FBRyxFQUNILFNBQVMsRUFDVCxJQUFJLEVBQ0osT0FBTyxFQUNQLEtBQUssRUFDTCxHQUFHLEVBQ0gsTUFBTSxFQUNOLGNBQWMsRUFDZCxvQkFBb0IsRUFDcEIsV0FBVyxFQUNYLGtCQUFrQixFQUNyQixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUU3QyxPQUFPLEVB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aUJBQ25DO2FBQ0o7Ozs7WUFoTUcsVUFBVTtZQVFWLFNBQVM7WUFZSixXQUFXLHVCQWdaWCxRQUFROzRDQUNSLFFBQVEsWUFBSSxNQUFNLFNBQUMsZUFBZTs7OzBCQWpOdEMsS0FBSzt1QkFFTCxLQUFLOzJCQVlMLEtBQUs7aUNBa0JMLEtBQUs7b0JBT0wsS0FBSztrQkF3QkwsS0FBSztrQkFhTCxLQUFLO3VCQWFMLEtBQUs7aUJBeUJMLEtBQUs7a0NBV0wsS0FBSzs2QkFtQkwsTUFBTTt5QkFHTixNQUFNO3dCQUdOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAdHMtbm9jaGVja1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1lbXB0eVxuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBBYnN0cmFjdENvbnRyb2wsXG4gICAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgTkdfVkFMSURBVE9SUyxcbiAgICBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICBWYWxpZGF0aW9uRXJyb3JzLFxuICAgIFZhbGlkYXRvcixcbiAgICBWYWxpZGF0b3JGbixcbiAgICBWYWxpZGF0b3JzXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERhdGVBZGFwdGVyLCBNQ19EQVRFX0ZPUk1BVFMsIE1jRGF0ZUZvcm1hdHMgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvZGF0ZXRpbWUnO1xuaW1wb3J0IHtcbiAgICBCQUNLU1BBQ0UsXG4gICAgREVMRVRFLFxuICAgIFVQX0FSUk9XLFxuICAgIFJJR0hUX0FSUk9XLFxuICAgIERPV05fQVJST1csXG4gICAgTEVGVF9BUlJPVyxcbiAgICBFTkQsXG4gICAgUEFHRV9ET1dOLFxuICAgIEhPTUUsXG4gICAgUEFHRV9VUCxcbiAgICBTUEFDRSxcbiAgICBUQUIsXG4gICAgRVNDQVBFLFxuICAgIGhhc01vZGlmaWVyS2V5LFxuICAgIGlzSG9yaXpvbnRhbE1vdmVtZW50LFxuICAgIGlzTGV0dGVyS2V5LFxuICAgIGlzVmVydGljYWxNb3ZlbWVudFxufSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgdmFsaWRhdGlvblRvb2x0aXBIaWRlRGVsYXksIHZhbGlkYXRpb25Ub29sdGlwU2hvd0RlbGF5IH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNGb3JtRmllbGRDb250cm9sIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgTWNUb29sdGlwIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL3Rvb2x0aXAnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yIH0gZnJvbSAnLi9kYXRlcGlja2VyLWVycm9ycyc7XG5pbXBvcnQgeyBNY0RhdGVwaWNrZXIgfSBmcm9tICcuL2RhdGVwaWNrZXIuY29tcG9uZW50JztcblxuXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuYW1pbmctY29udmVudGlvblxuZW51bSBEYXRlUGFydHMge1xuICAgIHllYXIgPSAneScsXG4gICAgbW9udGggPSAnbScsXG4gICAgZGF5ID0gJ2QnXG59XG5cbmNsYXNzIERhdGVEaWdpdCB7XG4gICAgbWF4RGF5cyA9IDMxO1xuXG4gICAgcGFyc2U6ICh2YWx1ZTogc3RyaW5nKSA9PiBudW1iZXI7XG5cbiAgICBnZXQgbWF4TW9udGgoKTogbnVtYmVyIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnMgYmluYXJ5LWV4cHJlc3Npb24tb3BlcmFuZC1vcmRlclxuICAgICAgICByZXR1cm4gMTEgKyB0aGlzLmZpcnN0TW9udGg7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBEYXRlUGFydHMsIHB1YmxpYyBzdGFydDogbnVtYmVyLCBwdWJsaWMgbGVuZ3RoOiBudW1iZXIsIHB1YmxpYyBmaXJzdE1vbnRoID0gMCkge1xuICAgICAgICBpZiAodmFsdWUgPT09IERhdGVQYXJ0cy5kYXkpIHtcbiAgICAgICAgICAgIHRoaXMucGFyc2UgPSB0aGlzLnBhcnNlRGF5O1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBEYXRlUGFydHMubW9udGgpIHtcbiAgICAgICAgICAgIHRoaXMucGFyc2UgPSB0aGlzLnBhcnNlTW9udGg7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IERhdGVQYXJ0cy55ZWFyKSB7XG4gICAgICAgICAgICB0aGlzLnBhcnNlID0gdGhpcy5wYXJzZVllYXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZW5kKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0ICsgdGhpcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0IGlzRGF5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSA9PT0gRGF0ZVBhcnRzLmRheTtcbiAgICB9XG5cbiAgICBnZXQgaXNNb250aCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgPT09IERhdGVQYXJ0cy5tb250aDtcbiAgICB9XG5cbiAgICBnZXQgaXNZZWFyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSA9PT0gRGF0ZVBhcnRzLnllYXI7XG4gICAgfVxuXG4gICAgZ2V0IGZ1bGxOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLmlzRGF5KSB7IHJldHVybiAnZGF0ZSc7IH1cblxuICAgICAgICBpZiAodGhpcy5pc01vbnRoKSB7IHJldHVybiAnbW9udGgnOyB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNZZWFyKSB7IHJldHVybiAneWVhcic7IH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlRGF5KHZhbHVlOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBwYXJzZWRWYWx1ZTogbnVtYmVyID0gcGFyc2VJbnQodmFsdWUpO1xuXG4gICAgICAgIGlmIChwYXJzZWRWYWx1ZSA9PT0gMCkgeyByZXR1cm4gMTsgfVxuXG4gICAgICAgIGlmIChwYXJzZWRWYWx1ZSA+IHRoaXMubWF4RGF5cykgeyByZXR1cm4gdGhpcy5tYXhEYXlzOyB9XG5cbiAgICAgICAgcmV0dXJuIHBhcnNlZFZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VNb250aCh2YWx1ZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgcGFyc2VkVmFsdWU6IG51bWJlciA9IHBhcnNlSW50KHZhbHVlKTtcblxuICAgICAgICBpZiAocGFyc2VkVmFsdWUgPT09IDApIHsgcmV0dXJuIDE7IH1cblxuICAgICAgICBpZiAocGFyc2VkVmFsdWUgPiB0aGlzLm1heE1vbnRoKSB7IHJldHVybiB0aGlzLm1heE1vbnRoOyB9XG5cbiAgICAgICAgcmV0dXJuIHBhcnNlZFZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VZZWFyKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBwYXJzZWRWYWx1ZTogbnVtYmVyID0gcGFyc2VJbnQodmFsdWUpO1xuXG4gICAgICAgIGlmIChwYXJzZWRWYWx1ZSA9PT0gMCkgeyByZXR1cm4gMTsgfVxuXG4gICAgICAgIHJldHVybiBwYXJzZWRWYWx1ZTtcbiAgICB9XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUNfREFURVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1jRGF0ZXBpY2tlcklucHV0KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19EQVRFUElDS0VSX1ZBTElEQVRPUlM6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1jRGF0ZXBpY2tlcklucHV0KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuXG4vKipcbiAqIEFuIGV2ZW50IHVzZWQgZm9yIGRhdGVwaWNrZXIgaW5wdXQgYW5kIGNoYW5nZSBldmVudHMuIFdlIGRvbid0IGFsd2F5cyBoYXZlIGFjY2VzcyB0byBhIG5hdGl2ZVxuICogaW5wdXQgb3IgY2hhbmdlIGV2ZW50IGJlY2F1c2UgdGhlIGV2ZW50IG1heSBoYXZlIGJlZW4gdHJpZ2dlcmVkIGJ5IHRoZSB1c2VyIGNsaWNraW5nIG9uIHRoZVxuICogY2FsZW5kYXIgcG9wdXAuIEZvciBjb25zaXN0ZW5jeSwgd2UgYWx3YXlzIHVzZSBNY0RhdGVwaWNrZXJJbnB1dEV2ZW50IGluc3RlYWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBNY0RhdGVwaWNrZXJJbnB1dEV2ZW50PEQ+IHtcbiAgICAvKiogVGhlIG5ldyB2YWx1ZSBmb3IgdGhlIHRhcmdldCBkYXRlcGlja2VyIGlucHV0LiAqL1xuICAgIHZhbHVlOiBEIHwgbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBkYXRlcGlja2VyIGlucHV0IGNvbXBvbmVudCB0aGF0IGVtaXR0ZWQgdGhlIGV2ZW50LiAqL1xuICAgICAgICBwdWJsaWMgdGFyZ2V0OiBNY0RhdGVwaWNrZXJJbnB1dDxEPixcbiAgICAgICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgbmF0aXZlIGlucHV0IGVsZW1lbnQgYXNzb2NpYXRlZCB3aXRoIHRoZSBkYXRlcGlja2VyIGlucHV0LiAqL1xuICAgICAgICBwdWJsaWMgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnRcbiAgICApIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudGFyZ2V0LnZhbHVlO1xuICAgIH1cbn1cblxubGV0IHVuaXF1ZUNvbXBvbmVudElkU3VmZml4ID0gMDtcblxuXG4vKiogRGlyZWN0aXZlIHVzZWQgdG8gY29ubmVjdCBhbiBpbnB1dCB0byBhIE1jRGF0ZXBpY2tlci4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnaW5wdXRbbWNEYXRlcGlja2VyXScsXG4gICAgZXhwb3J0QXM6ICdtY0RhdGVwaWNrZXJJbnB1dCcsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE1DX0RBVEVQSUNLRVJfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIE1DX0RBVEVQSUNLRVJfVkFMSURBVE9SUyxcbiAgICAgICAgeyBwcm92aWRlOiBNY0Zvcm1GaWVsZENvbnRyb2wsIHVzZUV4aXN0aW5nOiBNY0RhdGVwaWNrZXJJbnB1dCB9XG4gICAgXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtaW5wdXQgbWMtZGF0ZXBpY2tlcicsXG4gICAgICAgICdbYXR0ci5wbGFjZWhvbGRlcl0nOiAncGxhY2Vob2xkZXInLFxuICAgICAgICAnW2F0dHIucmVxdWlyZWRdJzogJ3JlcXVpcmVkJyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAgICAgJ1thdHRyLm1pbl0nOiAnbWluID8gdG9JU084NjAxKG1pbikgOiBudWxsJyxcbiAgICAgICAgJ1thdHRyLm1heF0nOiAnbWF4ID8gdG9JU084NjAxKG1heCkgOiBudWxsJyxcbiAgICAgICAgJ1thdHRyLmF1dG9jb21wbGV0ZV0nOiAnXCJvZmZcIicsXG5cbiAgICAgICAgJyhwYXN0ZSknOiAnb25QYXN0ZSgkZXZlbnQpJyxcbiAgICAgICAgJyhjaGFuZ2UpJzogJ29uQ2hhbmdlKCknLFxuXG4gICAgICAgICcoZm9jdXMpJzogJ2ZvY3VzQ2hhbmdlZCh0cnVlKScsXG4gICAgICAgICcoYmx1ciknOiAnb25CbHVyKCknLFxuXG4gICAgICAgICcoa2V5ZG93biknOiAnb25LZXlEb3duKCRldmVudCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0RhdGVwaWNrZXJJbnB1dDxEPiBpbXBsZW1lbnRzIE1jRm9ybUZpZWxkQ29udHJvbDxEPiwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIFZhbGlkYXRvciwgT25EZXN0cm95IHtcbiAgICByZWFkb25seSBzdGF0ZUNoYW5nZXM6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgcmVhZG9ubHkgZXJyb3JTdGF0ZTogYm9vbGVhbjtcblxuICAgIGNvbnRyb2xUeXBlOiBzdHJpbmcgPSAnZGF0ZXBpY2tlcic7XG5cbiAgICBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBkYXRlcGlja2VyOiBNY0RhdGVwaWNrZXI8RD47XG5cbiAgICBkYXRlRmlsdGVyOiAoZGF0ZTogRCB8IG51bGwpID0+IGJvb2xlYW47XG5cbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgdmFsdWUgY2hhbmdlcyAoZWl0aGVyIGR1ZSB0byB1c2VyIGlucHV0IG9yIHByb2dyYW1tYXRpYyBjaGFuZ2UpLiAqL1xuICAgIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxEIHwgbnVsbD4oKTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSBkaXNhYmxlZCBzdGF0ZSBoYXMgY2hhbmdlZCAqL1xuICAgIGRpc2FibGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7XG4gICAgfVxuXG4gICAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXF1aXJlZDogYm9vbGVhbjtcblxuICAgIC8qKiBUaGUgZGF0ZXBpY2tlciB0aGF0IHRoaXMgaW5wdXQgaXMgYXNzb2NpYXRlZCB3aXRoLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IG1jRGF0ZXBpY2tlcih2YWx1ZTogTWNEYXRlcGlja2VyPEQ+KSB7XG4gICAgICAgIGlmICghdmFsdWUpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5kYXRlcGlja2VyID0gdmFsdWU7XG4gICAgICAgIHRoaXMuZGF0ZXBpY2tlci5yZWdpc3RlcklucHV0KHRoaXMpO1xuICAgICAgICB0aGlzLmRhdGVwaWNrZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblxuICAgICAgICB0aGlzLmRhdGVwaWNrZXJTdWJzY3JpcHRpb24gPSB0aGlzLmRhdGVwaWNrZXIuc2VsZWN0ZWRDaGFuZ2VkXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChzZWxlY3RlZDogRCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBzZWxlY3RlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmN2YU9uQ2hhbmdlKHNlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZUNoYW5nZS5lbWl0KG5ldyBNY0RhdGVwaWNrZXJJbnB1dEV2ZW50KHRoaXMsIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogRnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBmaWx0ZXIgb3V0IGRhdGVzIHdpdGhpbiB0aGUgZGF0ZXBpY2tlci4gKi9cbiAgICBASW5wdXQoKVxuICAgIHNldCBtY0RhdGVwaWNrZXJGaWx0ZXIodmFsdWU6IChkYXRlOiBEIHwgbnVsbCkgPT4gYm9vbGVhbikge1xuICAgICAgICB0aGlzLmRhdGVGaWx0ZXIgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52YWxpZGF0b3JPbkNoYW5nZSgpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgdmFsdWUgb2YgdGhlIGlucHV0LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHZhbHVlKCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gdGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9ICFuZXdWYWx1ZSB8fCB0aGlzLmRhdGVBZGFwdGVyLmlzVmFsaWQobmV3VmFsdWUpO1xuXG4gICAgICAgIG5ld1ZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwobmV3VmFsdWUpO1xuXG4gICAgICAgIGNvbnN0IG9sZERhdGUgPSB0aGlzLnZhbHVlO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB0aGlzLmZvcm1hdFZhbHVlKG5ld1ZhbHVlKTtcblxuICAgICAgICBpZiAoIXRoaXMuZGF0ZUFkYXB0ZXIuc2FtZURhdGUob2xkRGF0ZSwgbmV3VmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQobmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdmFsdWU6IEQgfCBudWxsO1xuXG4gICAgLyoqIFRoZSBtaW5pbXVtIHZhbGlkIGRhdGUuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgbWluKCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbjtcbiAgICB9XG5cbiAgICBzZXQgbWluKHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9taW4gPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9taW46IEQgfCBudWxsO1xuXG4gICAgLyoqIFRoZSBtYXhpbXVtIHZhbGlkIGRhdGUuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgbWF4KCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heDtcbiAgICB9XG5cbiAgICBzZXQgbWF4KHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9tYXggPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tYXg6IEQgfCBudWxsO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRhdGVwaWNrZXItaW5wdXQgaXMgZGlzYWJsZWQuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKHRoaXMuX2Rpc2FibGVkICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZWRDaGFuZ2UuZW1pdChuZXdWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBuZWVkIHRvIG51bGwgY2hlY2sgdGhlIGBibHVyYCBtZXRob2QsIGJlY2F1c2UgaXQncyB1bmRlZmluZWQgZHVyaW5nIFNTUi5cbiAgICAgICAgaWYgKG5ld1ZhbHVlICYmIGVsZW1lbnQuYmx1cikge1xuICAgICAgICAgICAgLy8gTm9ybWFsbHksIG5hdGl2ZSBpbnB1dCBlbGVtZW50cyBhdXRvbWF0aWNhbGx5IGJsdXIgaWYgdGhleSB0dXJuIGRpc2FibGVkLiBUaGlzIGJlaGF2aW9yXG4gICAgICAgICAgICAvLyBpcyBwcm9ibGVtYXRpYywgYmVjYXVzZSBpdCB3b3VsZCBtZWFuIHRoYXQgaXQgdHJpZ2dlcnMgYW5vdGhlciBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlLFxuICAgICAgICAgICAgLy8gd2hpY2ggdGhlbiBjYXVzZXMgYSBjaGFuZ2VkIGFmdGVyIGNoZWNrZWQgZXJyb3IgaWYgdGhlIGlucHV0IGVsZW1lbnQgd2FzIGZvY3VzZWQgYmVmb3JlLlxuICAgICAgICAgICAgZWxlbWVudC5ibHVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cblxuICAgIHNldCBpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2lkID0gdmFsdWUgfHwgdGhpcy51aWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IG1jVmFsaWRhdGlvblRvb2x0aXAodG9vbHRpcDogTWNUb29sdGlwKSB7XG4gICAgICAgIGlmICghdG9vbHRpcCkgeyByZXR1cm47IH1cblxuICAgICAgICB0b29sdGlwLm1jTW91c2VFbnRlckRlbGF5ID0gdmFsaWRhdGlvblRvb2x0aXBTaG93RGVsYXk7XG4gICAgICAgIHRvb2x0aXAubWNUcmlnZ2VyID0gJ21hbnVhbCc7XG4gICAgICAgIHRvb2x0aXAubWNUb29sdGlwQ2xhc3MgPSAnbWMtdG9vbHRpcF93YXJuaW5nJztcblxuICAgICAgICB0b29sdGlwLmluaXRFbGVtZW50UmVmTGlzdGVuZXJzKCk7XG5cbiAgICAgICAgdGhpcy5pbmNvcnJlY3RJbnB1dC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRvb2x0aXAuaXNUb29sdGlwT3BlbikgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgdG9vbHRpcC5zaG93KCk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdG9vbHRpcC5oaWRlKCksIHZhbGlkYXRpb25Ub29sdGlwSGlkZURlbGF5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpIGluY29ycmVjdElucHV0ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gYSBgY2hhbmdlYCBldmVudCBpcyBmaXJlZCBvbiB0aGlzIGA8aW5wdXQ+YC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgZGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWNEYXRlcGlja2VySW5wdXRFdmVudDxEPj4oKTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIGFuIGBpbnB1dGAgZXZlbnQgaXMgZmlyZWQgb24gdGhpcyBgPGlucHV0PmAuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGRhdGVJbnB1dCA9IG5ldyBFdmVudEVtaXR0ZXI8TWNEYXRlcGlja2VySW5wdXRFdmVudDxEPj4oKTtcblxuICAgIGdldCBlbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnZpZXdWYWx1ZSAmJiAhdGhpcy5pc0JhZElucHV0KCk7XG4gICAgfVxuXG4gICAgZ2V0IHZpZXdWYWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IG5nQ29udHJvbCgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sO1xuICAgIH1cblxuICAgIGdldCBpc1JlYWRPbmx5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVhZE9ubHk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgc2VsZWN0aW9uU3RhcnQoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldCBzZWxlY3Rpb25TdGFydCh2YWx1ZTogbnVtYmVyIHwgbnVsbCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IHNlbGVjdGlvbkVuZCgpOiBudW1iZXIgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldCBzZWxlY3Rpb25FbmQodmFsdWU6IG51bWJlciB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb250cm9sOiBBYnN0cmFjdENvbnRyb2w7XG4gICAgcHJpdmF0ZSByZWFkb25seSB1aWQgPSBgbWMtZGF0ZXBpY2tlci0ke3VuaXF1ZUNvbXBvbmVudElkU3VmZml4Kyt9YDtcblxuICAgIHByaXZhdGUgZGF0ZXBpY2tlclN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIHByaXZhdGUgbG9jYWxlU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGxhc3QgdmFsdWUgc2V0IG9uIHRoZSBpbnB1dCB3YXMgdmFsaWQuICovXG4gICAgcHJpdmF0ZSBsYXN0VmFsdWVWYWxpZCA9IGZhbHNlO1xuXG4gICAgLyoqIFRoZSBjb21iaW5lZCBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGlzIGlucHV0LiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgdmFsaWRhdG9yOiBWYWxpZGF0b3JGbiB8IG51bGw7XG5cbiAgICBwcml2YXRlIHNlcGFyYXRvcjogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBmaXJzdERpZ2l0OiBEYXRlRGlnaXQ7XG4gICAgcHJpdmF0ZSBzZWNvbmREaWdpdDogRGF0ZURpZ2l0O1xuICAgIHByaXZhdGUgdGhpcmREaWdpdDogRGF0ZURpZ2l0O1xuXG4gICAgcHJpdmF0ZSBzZXBhcmF0b3JQb3NpdGlvbnM6IG51bWJlcltdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcmVhZG9ubHkgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1DX0RBVEVfRk9STUFUUykgcHJpdmF0ZSByZWFkb25seSBkYXRlRm9ybWF0czogTWNEYXRlRm9ybWF0c1xuICAgICkge1xuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IFZhbGlkYXRvcnMuY29tcG9zZShbXG4gICAgICAgICAgICB0aGlzLnBhcnNlVmFsaWRhdG9yLFxuICAgICAgICAgICAgdGhpcy5taW5WYWxpZGF0b3IsXG4gICAgICAgICAgICB0aGlzLm1heFZhbGlkYXRvcixcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyVmFsaWRhdG9yXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGlmICghdGhpcy5kYXRlQWRhcHRlcikge1xuICAgICAgICAgICAgdGhyb3cgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IoJ0RhdGVBZGFwdGVyJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuZGF0ZUZvcm1hdHMpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdNQ19EQVRFX0ZPUk1BVFMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0Rm9ybWF0KGRhdGVGb3JtYXRzLmRhdGVJbnB1dCk7XG5cbiAgICAgICAgdGhpcy5sb2NhbGVTdWJzY3JpcHRpb24gPSBkYXRlQWRhcHRlci5sb2NhbGVDaGFuZ2VzXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMudXBkYXRlTG9jYWxlUGFyYW1zKTtcbiAgICB9XG5cbiAgICBvbkNvbnRhaW5lckNsaWNrKCkge1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZm9jdXNDaGFuZ2VkKGlzRm9jdXNlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoaXNGb2N1c2VkICE9PSB0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IGlzRm9jdXNlZDtcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRhdGVwaWNrZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5sb2NhbGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLmRpc2FibGVkQ2hhbmdlLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLyoqIEBkb2NzLXByaXZhdGUgKi9cbiAgICByZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICAvKiogQGRvY3MtcHJpdmF0ZSAqL1xuICAgIHZhbGlkYXRlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgICAgICAgdGhpcy5zZXRDb250cm9sKGNvbnRyb2wpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvciA/IHRoaXMudmFsaWRhdG9yKGNvbnRyb2wpIDogbnVsbDtcbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgIHdyaXRlVmFsdWUodmFsdWU6IEQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jdmFPbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNSZWFkT25seSkgeyByZXR1cm47IH1cblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuXG4gICAgICAgIGlmICh0aGlzLmlzTGV0dGVyS2V5KGV2ZW50KSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5pbmNvcnJlY3RJbnB1dC5lbWl0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0tleUZvck9wZW4oZXZlbnQpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLmRhdGVwaWNrZXIub3BlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNLZXlGb3JDbG9zZShldmVudCkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuZGF0ZXBpY2tlci5jbG9zZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFRBQikge1xuICAgICAgICAgICAgdGhpcy5kYXRlcGlja2VyLmNsb3NlKGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzS2V5Rm9yQnlQYXNzKGV2ZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFNQQUNFKSB7XG4gICAgICAgICAgICB0aGlzLnNwYWNlS2V5SGFuZGxlcihldmVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoW1VQX0FSUk9XLCBET1dOX0FSUk9XXS5pbmNsdWRlcyhrZXlDb2RlKSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy52ZXJ0aWNhbEFycm93S2V5SGFuZGxlcihrZXlDb2RlKTtcbiAgICAgICAgfSBlbHNlIGlmIChbTEVGVF9BUlJPVywgUklHSFRfQVJST1csIEhPTUUsIFBBR0VfVVAsIEVORCwgUEFHRV9ET1dOXS5pbmNsdWRlcyhrZXlDb2RlKSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VDYXJldFBvc2l0aW9uKGtleUNvZGUpO1xuICAgICAgICB9IGVsc2UgaWYgKC9eXFxEJC8udGVzdChldmVudC5rZXkpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuZ2V0TmV3VmFsdWUoZXZlbnQua2V5LCB0aGlzLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcik7XG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMucmVwbGFjZVN5bWJvbHMobmV3VmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IGZvcm1hdHRlZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWaWV3VmFsdWUoZm9ybWF0dGVkVmFsdWUsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLm9uSW5wdXQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluY29ycmVjdElucHV0LmVtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5vbklucHV0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5wdXQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuY29ycmVjdEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbHVlID0gdGhpcy5yZXBsYWNlU3ltYm9scyh0aGlzLnZpZXdWYWx1ZSk7XG5cbiAgICAgICAgY29uc3QgbmV3VGltZU9iaiA9IHRoaXMuZ2V0RGF0ZUZyb21TdHJpbmcoZm9ybWF0dGVkVmFsdWUpO1xuICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gISFuZXdUaW1lT2JqO1xuXG4gICAgICAgIGlmICghbmV3VGltZU9iaikge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gbnVsbDtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRWaWV3VmFsdWUodGhpcy5nZXRUaW1lU3RyaW5nRnJvbURhdGUobmV3VGltZU9iaiwgdGhpcy5kYXRlRm9ybWF0cy5kYXRlSW5wdXQpLCB0cnVlKTtcblxuICAgICAgICB0aGlzLnNlbGVjdE5leHREaWdpdEJ5Q3Vyc29yKCh0aGlzLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUobmV3VGltZU9iaik7XG4gICAgfVxuXG4gICAgcGFyc2VPbkJsdXIgPSAoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy52aWV3VmFsdWUpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5nZXREZWZhdWx0VmFsdWUoKTtcblxuICAgICAgICBjb25zdCB2aWV3RGlnaXRzOiBzdHJpbmdbXSA9IHRoaXMudmlld1ZhbHVlXG4gICAgICAgICAgICAuc3BsaXQodGhpcy5zZXBhcmF0b3IpXG4gICAgICAgICAgICAubWFwKCh2YWx1ZTogc3RyaW5nKSA9PiB2YWx1ZSlcbiAgICAgICAgICAgIC5maWx0ZXIoKHZhbHVlKSA9PiB2YWx1ZSk7XG5cbiAgICAgICAgY29uc3QgW2ZpcnNWaWV3RGlnaXQsIHNlY29uZFZpZXdEaWdpdCwgdGhpcmRWaWV3RGlnaXRdID0gdmlld0RpZ2l0cztcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbWFnaWMtbnVtYmVyc1xuICAgICAgICBpZiAodmlld0RpZ2l0cy5sZW5ndGggIT09IDMpIHtcbiAgICAgICAgICAgIHRoaXMubGFzdFZhbHVlVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gbnVsbDtcblxuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBkYXRlW3RoaXMuZmlyc3REaWdpdC5mdWxsTmFtZV0gPSB0aGlzLmZpcnN0RGlnaXQucGFyc2UoZmlyc1ZpZXdEaWdpdCk7XG4gICAgICAgIGRhdGVbdGhpcy5zZWNvbmREaWdpdC5mdWxsTmFtZV0gPSB0aGlzLnNlY29uZERpZ2l0LnBhcnNlKHNlY29uZFZpZXdEaWdpdCk7XG4gICAgICAgIGRhdGVbdGhpcy50aGlyZERpZ2l0LmZ1bGxOYW1lXSA9IHRoaXMudGhpcmREaWdpdC5wYXJzZSh0aGlyZFZpZXdEaWdpdCk7XG5cbiAgICAgICAgY29uc3QgW2RpZ2l0V2l0aFllYXIsIHZpZXdEaWdpdFdpdGhZZWFyXSA9IFt0aGlzLmZpcnN0RGlnaXQsIHRoaXMuc2Vjb25kRGlnaXQsIHRoaXMudGhpcmREaWdpdF1cbiAgICAgICAgICAgIC5yZWR1Y2UoKGFjYywgZGlnaXQsIGluZGV4KSA9PiBkaWdpdC52YWx1ZSA9PT0gRGF0ZVBhcnRzLnllYXIgPyBbZGlnaXQsIHZpZXdEaWdpdHNbaW5kZXhdXSA6IGFjYywgW10pO1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1tYWdpYy1udW1iZXJzXG4gICAgICAgIGlmICh2aWV3RGlnaXRXaXRoWWVhci5sZW5ndGggPCAzKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbWFnaWMtbnVtYmVyc1xuICAgICAgICAgICAgZGF0ZS55ZWFyICs9IGRhdGUueWVhciA8IDMwID8gMjAwMCA6IDE5MDA7XG4gICAgICAgIH0gZWxzZSBpZiAodmlld0RpZ2l0V2l0aFllYXIubGVuZ3RoIDwgZGlnaXRXaXRoWWVhci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMubGFzdFZhbHVlVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gbnVsbDtcblxuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXdUaW1lT2JqID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5jcmVhdGVEYXRlVGltZShcbiAgICAgICAgICAgIGRhdGUueWVhciwgZGF0ZS5tb250aCwgZGF0ZS5kYXRlLCBkYXRlLmhvdXJzLCBkYXRlLm1pbnV0ZXMsIGRhdGUuc2Vjb25kcywgZGF0ZS5taWxsaXNlY29uZHNcbiAgICAgICAgKSk7XG5cbiAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9ICEhbmV3VGltZU9iajtcblxuICAgICAgICB0aGlzLnNldFZpZXdWYWx1ZSh0aGlzLmdldFRpbWVTdHJpbmdGcm9tRGF0ZShuZXdUaW1lT2JqLCB0aGlzLmRhdGVGb3JtYXRzLmRhdGVJbnB1dCksIHRydWUpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUobmV3VGltZU9iaik7XG4gICAgfVxuXG4gICAgb25DaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMuZGF0ZUNoYW5nZS5lbWl0KG5ldyBNY0RhdGVwaWNrZXJJbnB1dEV2ZW50KHRoaXMsIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSk7XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMgYmx1ciBldmVudHMgb24gdGhlIGlucHV0LiAqL1xuICAgIG9uQmx1cigpIHtcbiAgICAgICAgLy8gUmVmb3JtYXQgdGhlIGlucHV0IG9ubHkgaWYgd2UgaGF2ZSBhIHZhbGlkIHZhbHVlLlxuICAgICAgICB0aGlzLnBhcnNlT25CbHVyKCk7XG5cbiAgICAgICAgdGhpcy5mb2N1c0NoYW5nZWQoZmFsc2UpO1xuICAgIH1cblxuICAgIG9uUGFzdGUoJGV2ZW50KSB7XG4gICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHJhd1ZhbHVlID0gJGV2ZW50LmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dCcpO1xuXG4gICAgICAgIGNvbnN0IG1hdGNoOiBSZWdFeHBNYXRjaEFycmF5IHwgbnVsbCA9IHJhd1ZhbHVlLm1hdGNoKC9eKD88Zmlyc3Q+XFxkKylcXFcoPzxzZWNvbmQ+XFxkKylcXFcoPzx0aGlyZD5cXGQrKSQvKTtcblxuICAgICAgICBpZiAoIW1hdGNoPy5ncm91cHM/LmZpcnN0IHx8ICFtYXRjaD8uZ3JvdXBzPy5zZWNvbmQgfHwgIW1hdGNoPy5ncm91cHM/LnRoaXJkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZpZXdWYWx1ZShyYXdWYWx1ZSk7XG5cbiAgICAgICAgICAgIHJldHVybiByYXdWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZhbHVlID0gW21hdGNoLmdyb3Vwcy5maXJzdCwgbWF0Y2guZ3JvdXBzLnNlY29uZCwgbWF0Y2guZ3JvdXBzLnRoaXJkXS5qb2luKHRoaXMuc2VwYXJhdG9yKTtcblxuICAgICAgICBjb25zdCBuZXdUaW1lT2JqID0gdGhpcy5nZXREYXRlRnJvbVN0cmluZyh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKCFuZXdUaW1lT2JqKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZpZXdWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKHRoaXMuZ2V0VGltZVN0cmluZ0Zyb21EYXRlKG5ld1RpbWVPYmosIHRoaXMuZGF0ZUZvcm1hdHMuZGF0ZUlucHV0KSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShuZXdUaW1lT2JqKTtcbiAgICB9XG5cbiAgICB0b0lTTzg2MDEodmFsdWU6IEQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlQWRhcHRlci50b0lzbzg2MDEodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlTG9jYWxlUGFyYW1zID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldEZvcm1hdCh0aGlzLmRhdGVGb3JtYXRzLmRhdGVJbnB1dCk7XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRGb3JtYXQoZm9ybWF0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXBhcmF0b3IgPSBmb3JtYXQubWF0Y2goL1thQS16Wl0rKD88c2VwYXJhdG9yPlxcV3xcXEQpW2FBLXpaXSsvKSEuZ3JvdXBzLnNlcGFyYXRvcjtcbiAgICAgICAgdGhpcy5zZXBhcmF0b3JQb3NpdGlvbnMgPSBmb3JtYXRcbiAgICAgICAgICAgIC5zcGxpdCgnJylcbiAgICAgICAgICAgIC5yZWR1Y2UoKGFjYywgaXRlbSwgaW5kZXg6IG51bWJlcikgPT4gdGhpcy5zZXBhcmF0b3IgPT09IGl0ZW0gPyBbLi4uYWNjLCBpbmRleCArIDFdIDogYWNjLCBbXSk7XG5cbiAgICAgICAgdGhpcy5nZXREaWdpdFBvc2l0aW9ucyhmb3JtYXQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVmFsdWUobmV3VmFsdWU6IEQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGVBZGFwdGVyLnNhbWVEYXRlKG5ld1ZhbHVlLCB0aGlzLnZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuY3ZhT25DaGFuZ2UobmV3VmFsdWUpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuZGF0ZUlucHV0LmVtaXQobmV3IE1jRGF0ZXBpY2tlcklucHV0RXZlbnQodGhpcywgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0tleUZvckNsb3NlKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogYm9vbGVhbiB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgcmV0dXJuIChldmVudC5hbHRLZXkgJiYgZXZlbnQua2V5Q29kZSA9PT0gVVBfQVJST1cpIHx8IGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzS2V5Rm9yT3BlbihldmVudDogS2V5Ym9hcmRFdmVudCk6IGJvb2xlYW4ge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICAgIHJldHVybiBldmVudC5hbHRLZXkgJiYgZXZlbnQua2V5Q29kZSA9PT0gRE9XTl9BUlJPVztcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzTGV0dGVyS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpc0xldHRlcktleShldmVudCkgJiYgIWV2ZW50LmN0cmxLZXkgJiYgIWV2ZW50Lm1ldGFLZXk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0tleUZvckJ5UGFzcyhldmVudDogS2V5Ym9hcmRFdmVudCk6IGJvb2xlYW4ge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICAgIHJldHVybiAoaGFzTW9kaWZpZXJLZXkoZXZlbnQpICYmIChpc1ZlcnRpY2FsTW92ZW1lbnQoZXZlbnQua2V5Q29kZSkgfHwgaXNIb3Jpem9udGFsTW92ZW1lbnQoZXZlbnQua2V5Q29kZSkpKSB8fFxuICAgICAgICAgICAgZXZlbnQuY3RybEtleSB8fFxuICAgICAgICAgICAgZXZlbnQubWV0YUtleSB8fFxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICAgICAgW0RFTEVURSwgQkFDS1NQQUNFXS5pbmNsdWRlcyhldmVudC5rZXlDb2RlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNwYWNlS2V5SGFuZGxlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvblN0YXJ0ID09PSB0aGlzLnNlbGVjdGlvbkVuZCkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldE5ld1ZhbHVlKGV2ZW50LmtleSwgdGhpcy5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpO1xuICAgICAgICAgICAgdGhpcy5zZXRWaWV3VmFsdWUodmFsdWUpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMub25JbnB1dCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3Rpb25TdGFydCAhPT0gdGhpcy5zZWxlY3Rpb25FbmQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TmV4dERpZ2l0KHRoaXMuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TmV3VmFsdWUoa2V5OiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIFt0aGlzLnZpZXdWYWx1ZS5zbGljZSgwLCBwb3NpdGlvbiksIGtleSwgdGhpcy52aWV3VmFsdWUuc2xpY2UocG9zaXRpb24pXS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFZpZXdWYWx1ZSh2YWx1ZTogc3RyaW5nLCBzYXZlUG9zaXRpb246IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAoc2F2ZVBvc2l0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3Rpb25TdGFydCA9IHRoaXMuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3Rpb25FbmQgPSB0aGlzLnNlbGVjdGlvbkVuZDtcblxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdmFsdWUpO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVwbGFjZVN5bWJvbHModmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICAgICAgLnNwbGl0KHRoaXMuc2VwYXJhdG9yKVxuICAgICAgICAgICAgLm1hcCgocGFydDogc3RyaW5nKSA9PiBwYXJ0LnJlcGxhY2UoL14oWzAtOV0rKVxcVyQvLCAnMCQxJykpXG4gICAgICAgICAgICAuam9pbih0aGlzLnNlcGFyYXRvcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREYXRlRnJvbVN0cmluZyh0aW1lU3RyaW5nOiBzdHJpbmcpOiBEIHwgbnVsbCB7XG4gICAgICAgIGlmICghdGltZVN0cmluZyB8fCB0aW1lU3RyaW5nLmxlbmd0aCA8IHRoaXMuZmlyc3REaWdpdC5sZW5ndGgpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5nZXREZWZhdWx0VmFsdWUoKTtcblxuICAgICAgICBjb25zdCB2aWV3RGlnaXRzOiBzdHJpbmdbXSA9IHRpbWVTdHJpbmdcbiAgICAgICAgICAgIC5zcGxpdCh0aGlzLnNlcGFyYXRvcilcbiAgICAgICAgICAgIC5tYXAoKHZhbHVlOiBzdHJpbmcpID0+IHZhbHVlKTtcblxuICAgICAgICBjb25zdCBbZmlyc1ZpZXdEaWdpdCwgc2Vjb25kVmlld0RpZ2l0LCB0aGlyZFZpZXdEaWdpdF0gPSB2aWV3RGlnaXRzO1xuXG4gICAgICAgIGlmICh2aWV3RGlnaXRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgaWYgKGZpcnNWaWV3RGlnaXQubGVuZ3RoIDwgdGhpcy5maXJzdERpZ2l0Lmxlbmd0aCkgeyByZXR1cm4gbnVsbDsgfVxuXG5cbiAgICAgICAgICAgIGRhdGVbdGhpcy5maXJzdERpZ2l0LmZ1bGxOYW1lXSA9IHRoaXMuZmlyc3REaWdpdC5wYXJzZShmaXJzVmlld0RpZ2l0KTtcbiAgICAgICAgICAgIGRhdGUubW9udGggPSB0aGlzLmRhdGVBZGFwdGVyLmZpcnN0TW9udGg7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1tYWdpYy1udW1iZXJzXG4gICAgICAgIH0gZWxzZSBpZiAodmlld0RpZ2l0cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIGlmIChmaXJzVmlld0RpZ2l0Lmxlbmd0aCA8IHRoaXMuZmlyc3REaWdpdC5sZW5ndGggfHwgc2Vjb25kVmlld0RpZ2l0Lmxlbmd0aCA8IHRoaXMuc2Vjb25kRGlnaXQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGVbdGhpcy5maXJzdERpZ2l0LmZ1bGxOYW1lXSA9IHRoaXMuZmlyc3REaWdpdC5wYXJzZShmaXJzVmlld0RpZ2l0KTtcbiAgICAgICAgICAgIGRhdGVbdGhpcy5zZWNvbmREaWdpdC5mdWxsTmFtZV0gPSB0aGlzLnNlY29uZERpZ2l0LnBhcnNlKHNlY29uZFZpZXdEaWdpdCk7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1tYWdpYy1udW1iZXJzXG4gICAgICAgIH0gZWxzZSBpZiAodmlld0RpZ2l0cy5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBmaXJzVmlld0RpZ2l0Lmxlbmd0aCA8IHRoaXMuZmlyc3REaWdpdC5sZW5ndGggfHxcbiAgICAgICAgICAgICAgICBzZWNvbmRWaWV3RGlnaXQubGVuZ3RoIDwgdGhpcy5zZWNvbmREaWdpdC5sZW5ndGggfHxcbiAgICAgICAgICAgICAgICB0aGlyZFZpZXdEaWdpdC5sZW5ndGggPCB0aGlzLnRoaXJkRGlnaXQubGVuZ3RoXG4gICAgICAgICAgICApIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICAgICAgZGF0ZVt0aGlzLmZpcnN0RGlnaXQuZnVsbE5hbWVdID0gdGhpcy5maXJzdERpZ2l0LnBhcnNlKGZpcnNWaWV3RGlnaXQpO1xuICAgICAgICAgICAgZGF0ZVt0aGlzLnNlY29uZERpZ2l0LmZ1bGxOYW1lXSA9IHRoaXMuc2Vjb25kRGlnaXQucGFyc2Uoc2Vjb25kVmlld0RpZ2l0KTtcbiAgICAgICAgICAgIGRhdGVbdGhpcy50aGlyZERpZ2l0LmZ1bGxOYW1lXSA9IHRoaXMudGhpcmREaWdpdC5wYXJzZSh0aGlyZFZpZXdEaWdpdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmNyZWF0ZURhdGVUaW1lKFxuICAgICAgICAgICAgZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCBkYXRlLmRhdGUsIGRhdGUuaG91cnMsIGRhdGUubWludXRlcywgZGF0ZS5zZWNvbmRzLCBkYXRlLm1pbGxpc2Vjb25kc1xuICAgICAgICApKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERlZmF1bHRWYWx1ZSgpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gdGhpcy52YWx1ZSB8fCB0aGlzLmRhdGVBZGFwdGVyLnRvZGF5KCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHllYXI6IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcihkZWZhdWx0VmFsdWUpLFxuICAgICAgICAgICAgbW9udGg6IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TW9udGgoZGVmYXVsdFZhbHVlKSxcbiAgICAgICAgICAgIGRhdGU6IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0RGF0ZShkZWZhdWx0VmFsdWUpLFxuICAgICAgICAgICAgaG91cnM6IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0SG91cnMoZGVmYXVsdFZhbHVlKSxcbiAgICAgICAgICAgIG1pbnV0ZXM6IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TWludXRlcyhkZWZhdWx0VmFsdWUpLFxuICAgICAgICAgICAgc2Vjb25kczogdGhpcy5kYXRlQWRhcHRlci5nZXRTZWNvbmRzKGRlZmF1bHRWYWx1ZSksXG4gICAgICAgICAgICBtaWxsaXNlY29uZHM6IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TWlsbGlzZWNvbmRzKGRlZmF1bHRWYWx1ZSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRpbWVTdHJpbmdGcm9tRGF0ZSh2YWx1ZTogRCB8IG51bGwsIHRpbWVGb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdmFsdWUgfHwgIXRoaXMuZGF0ZUFkYXB0ZXIuaXNWYWxpZCh2YWx1ZSkpIHsgcmV0dXJuICcnOyB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUFkYXB0ZXIuZm9ybWF0KHZhbHVlLCB0aW1lRm9ybWF0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERhdGVFZGl0TWV0cmljcyhjdXJzb3JQb3NpdGlvbjogbnVtYmVyKTogW1xuICAgICAgICBtb2RpZmllZFRpbWVQYXJ0OiBEYXRlUGFydHMsXG4gICAgICAgIGN1cnNvclN0YXJ0UG9zaXRpb246IG51bWJlcixcbiAgICAgICAgY3Vyc29yRW5kUG9zaXRpb246IG51bWJlclxuICAgIF0ge1xuICAgICAgICBmb3IgKGNvbnN0IGRpZ2l0IG9mIFt0aGlzLmZpcnN0RGlnaXQsIHRoaXMuc2Vjb25kRGlnaXQsIHRoaXMudGhpcmREaWdpdF0pIHtcbiAgICAgICAgICAgIGlmIChjdXJzb3JQb3NpdGlvbiA+PSBkaWdpdC5zdGFydCAmJiBjdXJzb3JQb3NpdGlvbiA8PSBkaWdpdC5lbmQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW2RpZ2l0LnZhbHVlLCBkaWdpdC5zdGFydCwgZGlnaXQuZW5kXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbdGhpcy50aGlyZERpZ2l0LnZhbHVlLCB0aGlzLnRoaXJkRGlnaXQuc3RhcnQsIHRoaXMudGhpcmREaWdpdC5lbmRdO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5jcmVtZW50RGF0ZShkYXRlVmFsOiBELCB3aGF0VG9JbmNyZW1lbnQ6IERhdGVQYXJ0cyk6IEQge1xuICAgICAgICBsZXQgeWVhciA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcihkYXRlVmFsKTtcbiAgICAgICAgbGV0IG1vbnRoID0gdGhpcy5kYXRlQWRhcHRlci5nZXRNb250aChkYXRlVmFsKTtcbiAgICAgICAgbGV0IGRheSA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0RGF0ZShkYXRlVmFsKTtcblxuICAgICAgICBzd2l0Y2ggKHdoYXRUb0luY3JlbWVudCkge1xuICAgICAgICAgICAgY2FzZSBEYXRlUGFydHMuZGF5OlxuICAgICAgICAgICAgICAgIGRheSsrO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRheSA+IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TnVtRGF5c0luTW9udGgoZGF0ZVZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF5ID0gMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRGF0ZVBhcnRzLm1vbnRoOlxuICAgICAgICAgICAgICAgIG1vbnRoKys7XG5cbiAgICAgICAgICAgICAgICBpZiAobW9udGggPiB0aGlzLmRhdGVBZGFwdGVyLmxhc3RNb250aCkge1xuICAgICAgICAgICAgICAgICAgICBtb250aCA9IHRoaXMuZGF0ZUFkYXB0ZXIuZmlyc3RNb250aDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0RGF5ID0gdGhpcy5nZXRMYXN0RGF5Rm9yKHllYXIsIG1vbnRoKTtcblxuICAgICAgICAgICAgICAgIGlmIChkYXkgPiBsYXN0RGF5KSB7XG4gICAgICAgICAgICAgICAgICAgIGRheSA9IGxhc3REYXk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIERhdGVQYXJ0cy55ZWFyOlxuICAgICAgICAgICAgICAgIHllYXIrKztcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZURhdGUoeWVhciwgbW9udGgsIGRheSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRMYXN0RGF5Rm9yKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVBZGFwdGVyLmdldE51bURheXNJbk1vbnRoKHRoaXMuY3JlYXRlRGF0ZSh5ZWFyLCBtb250aCwgMSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVjcmVtZW50RGF0ZShkYXRlVmFsOiBELCB3aGF0VG9EZWNyZW1lbnQ6IERhdGVQYXJ0cyk6IEQge1xuICAgICAgICBsZXQgeWVhciA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcihkYXRlVmFsKTtcbiAgICAgICAgbGV0IG1vbnRoID0gdGhpcy5kYXRlQWRhcHRlci5nZXRNb250aChkYXRlVmFsKTtcbiAgICAgICAgbGV0IGRheSA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0RGF0ZShkYXRlVmFsKTtcblxuICAgICAgICBzd2l0Y2ggKHdoYXRUb0RlY3JlbWVudCkge1xuICAgICAgICAgICAgY2FzZSBEYXRlUGFydHMuZGF5OlxuICAgICAgICAgICAgICAgIGRheS0tO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRheSA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF5ID0gdGhpcy5kYXRlQWRhcHRlci5nZXROdW1EYXlzSW5Nb250aChkYXRlVmFsKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRGF0ZVBhcnRzLm1vbnRoOlxuICAgICAgICAgICAgICAgIG1vbnRoLS07XG5cbiAgICAgICAgICAgICAgICBpZiAobW9udGggPCB0aGlzLmRhdGVBZGFwdGVyLmZpcnN0TW9udGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9udGggPSB0aGlzLmRhdGVBZGFwdGVyLmxhc3RNb250aDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0RGF5ID0gdGhpcy5nZXRMYXN0RGF5Rm9yKHllYXIsIG1vbnRoKTtcblxuICAgICAgICAgICAgICAgIGlmIChkYXkgPiBsYXN0RGF5KSB7XG4gICAgICAgICAgICAgICAgICAgIGRheSA9IGxhc3REYXk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIERhdGVQYXJ0cy55ZWFyOlxuICAgICAgICAgICAgICAgIHllYXItLTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZURhdGUoeWVhciwgbW9udGgsIGRheSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2ZXJ0aWNhbEFycm93S2V5SGFuZGxlcihrZXlDb2RlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnZhbHVlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGxldCBjaGFuZ2VkVGltZTtcblxuICAgICAgICBjb25zdCBbbW9kaWZpZWRUaW1lUGFydCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZF0gPSB0aGlzLmdldERhdGVFZGl0TWV0cmljcyh0aGlzLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcik7XG5cbiAgICAgICAgaWYgKGtleUNvZGUgPT09IFVQX0FSUk9XKSB7XG4gICAgICAgICAgICBjaGFuZ2VkVGltZSA9IHRoaXMuaW5jcmVtZW50RGF0ZSh0aGlzLnZhbHVlLCBtb2RpZmllZFRpbWVQYXJ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXlDb2RlID09PSBET1dOX0FSUk9XKSB7XG4gICAgICAgICAgICBjaGFuZ2VkVGltZSA9IHRoaXMuZGVjcmVtZW50RGF0ZSh0aGlzLnZhbHVlLCBtb2RpZmllZFRpbWVQYXJ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmFsdWUgPSBjaGFuZ2VkVGltZTtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kO1xuXG4gICAgICAgIHRoaXMub25DaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlQ2FyZXRQb3NpdGlvbihrZXlDb2RlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnZhbHVlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGxldCBjdXJzb3JQb3MgPSB0aGlzLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcjtcblxuICAgICAgICBpZiAoW0hPTUUsIFBBR0VfVVBdLmluY2x1ZGVzKGtleUNvZGUpKSB7XG4gICAgICAgICAgICBjdXJzb3JQb3MgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKFtFTkQsIFBBR0VfRE9XTl0uaW5jbHVkZXMoa2V5Q29kZSkpIHtcbiAgICAgICAgICAgIGN1cnNvclBvcyA9IHRoaXMudmlld1ZhbHVlLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBMRUZUX0FSUk9XKSB7XG4gICAgICAgICAgICBjdXJzb3JQb3MgPSBjdXJzb3JQb3MgPT09IDAgPyB0aGlzLnZpZXdWYWx1ZS5sZW5ndGggOiBjdXJzb3JQb3MgLSAxO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFJJR0hUX0FSUk9XKSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0U2VwYXJhdG9yUG9zOiBudW1iZXIgPSB0aGlzLnZpZXdWYWx1ZS5pbmRleE9mKHRoaXMuc2VwYXJhdG9yLCBjdXJzb3JQb3MpO1xuXG4gICAgICAgICAgICBjdXJzb3JQb3MgPSBuZXh0U2VwYXJhdG9yUG9zID8gbmV4dFNlcGFyYXRvclBvcyArIDEgOiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWxlY3REaWdpdEJ5Q3Vyc29yKGN1cnNvclBvcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZWxlY3REaWdpdEJ5Q3Vyc29yKGN1cnNvclBvczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgWywgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZF0gPSB0aGlzLmdldERhdGVFZGl0TWV0cmljcyhjdXJzb3JQb3MpO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZWxlY3ROZXh0RGlnaXRCeUN1cnNvcihjdXJzb3JQb3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFssICwgZW5kUG9zaXRpb25PZkN1cnJlbnREaWdpdF0gPSB0aGlzLmdldERhdGVFZGl0TWV0cmljcyhjdXJzb3JQb3MpO1xuICAgICAgICAgICAgY29uc3QgWywgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZF0gPSB0aGlzLmdldERhdGVFZGl0TWV0cmljcyhlbmRQb3NpdGlvbk9mQ3VycmVudERpZ2l0ICsgMSk7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNlbGVjdE5leHREaWdpdChjdXJzb3JQb3M6IG51bWJlciwgY3ljbGU6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RWYWx1ZSA9IGN5Y2xlID8gMCA6IGN1cnNvclBvcztcbiAgICAgICAgICAgIGNvbnN0IG5leHRTZXBhcmF0b3JQb3M6IG51bWJlciA9IHRoaXMudmlld1ZhbHVlLmluZGV4T2YodGhpcy5zZXBhcmF0b3IsIGN1cnNvclBvcyk7XG5cbiAgICAgICAgICAgIGNvbnN0IG5ld0N1cnNvclBvcyA9IG5leHRTZXBhcmF0b3JQb3MgPiAwID8gbmV4dFNlcGFyYXRvclBvcyArIDEgOiBsYXN0VmFsdWU7XG5cbiAgICAgICAgICAgIGNvbnN0IFssIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmRdID0gdGhpcy5nZXREYXRlRWRpdE1ldHJpY3MobmV3Q3Vyc29yUG9zKTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgaXMgaW52YWxpZCBiYXNlZCBvbiB0aGUgbmF0aXZlIHZhbGlkYXRpb24uICovXG4gICAgcHJpdmF0ZSBpc0JhZElucHV0KCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCB2YWxpZGl0eSA9ICg8SFRNTElucHV0RWxlbWVudD4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLnZhbGlkaXR5O1xuXG4gICAgICAgIHJldHVybiB2YWxpZGl0eSAmJiB2YWxpZGl0eS5iYWRJbnB1dDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGN2YU9uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gICAgcHJpdmF0ZSB2YWxpZGF0b3JPbkNoYW5nZSA9ICgpID0+IHt9O1xuXG4gICAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB3aGV0aGVyIHRoZSBpbnB1dCBwYXJzZXMuICovXG4gICAgcHJpdmF0ZSBwYXJzZVZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5mb2N1c2VkIHx8XG4gICAgICAgICAgICB0aGlzLmVtcHR5IHx8XG4gICAgICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID8gbnVsbCA6IHsgbWNEYXRlcGlja2VyUGFyc2U6IHsgdGV4dDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgfSB9O1xuICAgIH1cblxuICAgIC8qKiBUaGUgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhlIG1pbiBkYXRlLiAqL1xuICAgIHByaXZhdGUgbWluVmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZSkpO1xuXG4gICAgICAgIHJldHVybiAoIXRoaXMubWluIHx8ICFjb250cm9sVmFsdWUgfHxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuY29tcGFyZURhdGUodGhpcy5taW4sIGNvbnRyb2xWYWx1ZSkgPD0gMCkgP1xuICAgICAgICAgICAgbnVsbCA6IHsgbWNEYXRlcGlja2VyTWluOiB7IG1pbjogdGhpcy5taW4sIGFjdHVhbDogY29udHJvbFZhbHVlIH0gfTtcbiAgICB9XG5cbiAgICAvKiogVGhlIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoZSBtYXggZGF0ZS4gKi9cbiAgICBwcml2YXRlIG1heFZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICBjb25zdCBjb250cm9sVmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWUpKTtcblxuICAgICAgICByZXR1cm4gKCF0aGlzLm1heCB8fCAhY29udHJvbFZhbHVlIHx8XG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmNvbXBhcmVEYXRlKHRoaXMubWF4LCBjb250cm9sVmFsdWUpID49IDApID9cbiAgICAgICAgICAgIG51bGwgOiB7IG1jRGF0ZXBpY2tlck1heDogeyBtYXg6IHRoaXMubWF4LCBhY3R1YWw6IGNvbnRyb2xWYWx1ZSB9IH07XG4gICAgfVxuXG4gICAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGUgZGF0ZSBmaWx0ZXIuICovXG4gICAgcHJpdmF0ZSBmaWx0ZXJWYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgICAgY29uc3QgY29udHJvbFZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlKSk7XG5cbiAgICAgICAgcmV0dXJuICF0aGlzLmRhdGVGaWx0ZXIgfHwgIWNvbnRyb2xWYWx1ZSB8fCB0aGlzLmRhdGVGaWx0ZXIoY29udHJvbFZhbHVlKSA/XG4gICAgICAgICAgICBudWxsIDogeyBtY0RhdGVwaWNrZXJGaWx0ZXI6IHRydWUgfTtcbiAgICB9XG5cbiAgICAvKiogRm9ybWF0cyBhIHZhbHVlIGFuZCBzZXRzIGl0IG9uIHRoZSBpbnB1dCBlbGVtZW50LiAqL1xuICAgIHByaXZhdGUgZm9ybWF0VmFsdWUodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbHVlID0gdmFsdWUgPyB0aGlzLmRhdGVBZGFwdGVyLmZvcm1hdCh2YWx1ZSwgdGhpcy5kYXRlRm9ybWF0cy5kYXRlSW5wdXQpIDogJyc7XG5cbiAgICAgICAgdGhpcy5zZXRWaWV3VmFsdWUoZm9ybWF0dGVkVmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyBUaGUgZ2l2ZW4gb2JqZWN0IGlmIGl0IGlzIGJvdGggYSBkYXRlIGluc3RhbmNlIGFuZCB2YWxpZCwgb3RoZXJ3aXNlIG51bGwuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRWYWxpZERhdGVPck51bGwob2JqOiBhbnkpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiAodGhpcy5kYXRlQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmIHRoaXMuZGF0ZUFkYXB0ZXIuaXNWYWxpZChvYmopKSA/IG9iaiA6IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRDb250cm9sKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sID0gY29udHJvbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGlnaXRQb3NpdGlvbnMoZm9ybWF0OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZm9ybWF0SW5Mb3dlckNhc2UgPSBmb3JtYXQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBmb3JtYXRJbkxvd2VyQ2FzZVxuICAgICAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAgICAgLnJlZHVjZShcbiAgICAgICAgICAgICAgICAoeyBwcmV2LCBsZW5ndGgsIHN0YXJ0IH0sIHZhbHVlOiBzdHJpbmcsIGluZGV4OiBudW1iZXIsIGFycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHRoaXMuc2VwYXJhdG9yIHx8IChhcnIubGVuZ3RoIC0gMSkgPT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZmlyc3REaWdpdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3REaWdpdCA9IG5ldyBEYXRlRGlnaXQocHJldiwgc3RhcnQsIGxlbmd0aCwgdGhpcy5kYXRlQWRhcHRlci5maXJzdE1vbnRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuc2Vjb25kRGlnaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlY29uZERpZ2l0ID0gbmV3IERhdGVEaWdpdChwcmV2LCBzdGFydCwgbGVuZ3RoLCB0aGlzLmRhdGVBZGFwdGVyLmZpcnN0TW9udGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy50aGlyZERpZ2l0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aGlyZERpZ2l0ID0gbmV3IERhdGVEaWdpdChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldiwgc3RhcnQsIGFyci5sZW5ndGggLSBzdGFydCwgdGhpcy5kYXRlQWRhcHRlci5maXJzdE1vbnRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGU6bm8tcGFyYW1ldGVyLXJlYXNzaWdubWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gaW5kZXggKyAxO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoKys7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBwcmV2OiB2YWx1ZSwgbGVuZ3RoLCBzdGFydCB9O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgeyBsZW5ndGg6IDAsIHN0YXJ0OiAwIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmZpcnN0RGlnaXQgfHwgIXRoaXMuc2Vjb25kRGlnaXQgfHwgIXRoaXMudGhpcmREaWdpdCkge1xuICAgICAgICAgICAgRXJyb3IoYENhbicgdCB1c2UgdGhpcyBmb3JtYXQ6ICR7Zm9ybWF0fWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVEYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF5OiBudW1iZXIpOiBEIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZVRpbWUoXG4gICAgICAgICAgICB5ZWFyLFxuICAgICAgICAgICAgbW9udGgsXG4gICAgICAgICAgICBkYXksXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldEhvdXJzKHRoaXMudmFsdWUgYXMgRCksXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy52YWx1ZSBhcyBEKSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0U2Vjb25kcyh0aGlzLnZhbHVlIGFzIEQpLFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRNaWxsaXNlY29uZHModGhpcy52YWx1ZSBhcyBEKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29ycmVjdEN1cnNvclBvc2l0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25TdGFydCAmJiB0aGlzLnNlcGFyYXRvclBvc2l0aW9ucy5pbmNsdWRlcyh0aGlzLnNlbGVjdGlvblN0YXJ0KSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25TdGFydCA9IHRoaXMuc2VsZWN0aW9uU3RhcnQgLSAxO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19