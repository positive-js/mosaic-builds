/**
 * @fileoverview added by tsickle
 * Generated from: datepicker-input.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:no-empty
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Output } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { DateAdapter, MC_DATE_FORMATS } from '@ptsecurity/cdk/datetime';
import { DOWN_ARROW } from '@ptsecurity/cdk/keycodes';
import { MC_INPUT_VALUE_ACCESSOR } from '@ptsecurity/mosaic/input';
import { Subscription } from 'rxjs';
import { McDatepicker } from './datepicker';
import { createMissingDateImplError } from './datepicker-errors';
/**
 * \@docs-private
 * @type {?}
 */
export const MC_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => McDatepickerInput)),
    multi: true
};
/**
 * \@docs-private
 * @type {?}
 */
export const MC_DATEPICKER_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => McDatepickerInput)),
    multi: true
};
/**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use McDatepickerInputEvent instead.
 * @template D
 */
export class McDatepickerInputEvent {
    /**
     * @param {?} target
     * @param {?} targetElement
     */
    constructor(target, targetElement) {
        this.target = target;
        this.targetElement = targetElement;
        this.value = this.target.value;
    }
}
if (false) {
    /**
     * The new value for the target datepicker input.
     * @type {?}
     */
    McDatepickerInputEvent.prototype.value;
    /**
     * Reference to the datepicker input component that emitted the event.
     * @type {?}
     */
    McDatepickerInputEvent.prototype.target;
    /**
     * Reference to the native input element associated with the datepicker input.
     * @type {?}
     */
    McDatepickerInputEvent.prototype.targetElement;
}
/**
 * Directive used to connect an input to a McDatepicker.
 * @template D
 */
export class McDatepickerInput {
    /**
     * @param {?} elementRef
     * @param {?} dateAdapter
     * @param {?} dateFormats
     */
    constructor(elementRef, dateAdapter, dateFormats) {
        this.elementRef = elementRef;
        this.dateAdapter = dateAdapter;
        this.dateFormats = dateFormats;
        /**
         * Emits when a `change` event is fired on this `<input>`.
         */
        this.dateChange = new EventEmitter();
        /**
         * Emits when an `input` event is fired on this `<input>`.
         */
        this.dateInput = new EventEmitter();
        /**
         * Emits when the value changes (either due to user input or programmatic change).
         */
        this.valueChange = new EventEmitter();
        /**
         * Emits when the disabled state has changed
         */
        this.disabledChange = new EventEmitter();
        this.datepickerSubscription = Subscription.EMPTY;
        this.localeSubscription = Subscription.EMPTY;
        /**
         * Whether the last value set on the input was valid.
         */
        this.lastValueValid = false;
        this.onTouched = (/**
         * @return {?}
         */
        () => {
        });
        this.cvaOnChange = (/**
         * @return {?}
         */
        () => {
        });
        this.validatorOnChange = (/**
         * @return {?}
         */
        () => {
        });
        /**
         * The form control validator for whether the input parses.
         */
        this.parseValidator = (/**
         * @return {?}
         */
        () => {
            return this.lastValueValid ?
                null : { mcDatepickerParse: { text: this.elementRef.nativeElement.value } };
        });
        /**
         * The form control validator for the min date.
         */
        this.minValidator = (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            /** @type {?} */
            const controlValue = this.getValidDateOrNull(this.dateAdapter.deserialize(control.value));
            return (!this.min || !controlValue ||
                this.dateAdapter.compareDate(this.min, controlValue) <= 0) ?
                null : { mcDatepickerMin: { min: this.min, actual: controlValue } };
        });
        /**
         * The form control validator for the max date.
         */
        this.maxValidator = (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            /** @type {?} */
            const controlValue = this.getValidDateOrNull(this.dateAdapter.deserialize(control.value));
            return (!this.max || !controlValue ||
                this.dateAdapter.compareDate(this.max, controlValue) >= 0) ?
                null : { mcDatepickerMax: { max: this.max, actual: controlValue } };
        });
        /**
         * The form control validator for the date filter.
         */
        this.filterValidator = (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            /** @type {?} */
            const controlValue = this.getValidDateOrNull(this.dateAdapter.deserialize(control.value));
            return !this.dateFilter || !controlValue || this.dateFilter(controlValue) ?
                null : { mcDatepickerFilter: true };
        });
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
        // Update the displayed date when the locale changes.
        this.localeSubscription = dateAdapter.localeChanges.subscribe((/**
         * @return {?}
         */
        () => {
            this.value = this.value;
        }));
    }
    /**
     * The datepicker that this input is associated with.
     * @param {?} value
     * @return {?}
     */
    set mcDatepicker(value) {
        if (!value) {
            return;
        }
        this.datepicker = value;
        this.datepicker.registerInput(this);
        this.datepickerSubscription.unsubscribe();
        this.datepickerSubscription = this.datepicker.selectedChanged.subscribe((/**
         * @param {?} selected
         * @return {?}
         */
        (selected) => {
            this.value = selected;
            this.cvaOnChange(selected);
            this.onTouched();
            this.dateInput.emit(new McDatepickerInputEvent(this, this.elementRef.nativeElement));
            this.dateChange.emit(new McDatepickerInputEvent(this, this.elementRef.nativeElement));
        }));
    }
    /**
     * Function that can be used to filter out dates within the datepicker.
     * @param {?} value
     * @return {?}
     */
    set mcDatepickerFilter(value) {
        this.dateFilter = value;
        this.validatorOnChange();
    }
    /**
     * The value of the input.
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        // tslint:disable-next-line:no-parameter-reassignment
        value = this.dateAdapter.deserialize(value);
        this.lastValueValid = !value || this.dateAdapter.isValid(value);
        // tslint:disable-next-line:no-parameter-reassignment
        value = this.getValidDateOrNull(value);
        /** @type {?} */
        const oldDate = this.value;
        this._value = value;
        this.formatValue(value);
        if (!this.dateAdapter.sameDate(oldDate, value)) {
            this.valueChange.emit(value);
        }
    }
    /**
     * The minimum valid date.
     * @return {?}
     */
    get min() {
        return this._min;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set min(value) {
        this._min = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        this.validatorOnChange();
    }
    /**
     * The maximum valid date.
     * @return {?}
     */
    get max() {
        return this._max;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set max(value) {
        this._max = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        this.validatorOnChange();
    }
    /**
     * Whether the datepicker-input is disabled.
     * @return {?}
     */
    get disabled() {
        return !!this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        /** @type {?} */
        const newValue = coerceBooleanProperty(value);
        /** @type {?} */
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
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.datepickerSubscription.unsubscribe();
        this.localeSubscription.unsubscribe();
        this.valueChange.complete();
        this.disabledChange.complete();
    }
    /**
     * \@docs-private
     * @param {?} fn
     * @return {?}
     */
    registerOnValidatorChange(fn) {
        this.validatorOnChange = fn;
    }
    /**
     * \@docs-private
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        return this.validator ? this.validator(c) : null;
    }
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
    }
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.cvaOnChange = fn;
    }
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeydown(event) {
        // tslint:disable-next-line:deprecation
        /** @type {?} */
        const isAltDownArrow = event.altKey && event.keyCode === DOWN_ARROW;
        if (this.datepicker && isAltDownArrow && !this.elementRef.nativeElement.readOnly) {
            this.datepicker.open();
            event.preventDefault();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onInput(value) {
        /** @type {?} */
        let date = this.dateAdapter.parse(value, this.dateFormats.parse.dateInput);
        this.lastValueValid = !date || this.dateAdapter.isValid(date);
        date = this.getValidDateOrNull(date);
        if (!this.dateAdapter.sameDate(date, this._value)) {
            this._value = date;
            this.cvaOnChange(date);
            this.valueChange.emit(date);
            this.dateInput.emit(new McDatepickerInputEvent(this, this.elementRef.nativeElement));
        }
    }
    /**
     * @return {?}
     */
    onChange() {
        this.dateChange.emit(new McDatepickerInputEvent(this, this.elementRef.nativeElement));
    }
    /**
     * Handles blur events on the input.
     * @return {?}
     */
    onBlur() {
        // Reformat the input only if we have a valid value.
        if (this.value) {
            this.formatValue(this.value);
        }
        this.onTouched();
    }
    /**
     * Formats a value and sets it on the input element.
     * @private
     * @param {?} value
     * @return {?}
     */
    formatValue(value) {
        this.elementRef.nativeElement.value =
            value ? this.dateAdapter.format(value, this.dateFormats.display.dateInput) : '';
    }
    /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    getValidDateOrNull(obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    }
}
McDatepickerInput.decorators = [
    { type: Directive, args: [{
                selector: 'input[mcDatepicker]',
                exportAs: 'mcDatepickerInput',
                providers: [
                    MC_DATEPICKER_VALUE_ACCESSOR,
                    MC_DATEPICKER_VALIDATORS,
                    { provide: MC_INPUT_VALUE_ACCESSOR, useExisting: McDatepickerInput }
                ],
                host: {
                    '[attr.aria-haspopup]': 'true',
                    '[attr.aria-owns]': '(datepicker?.opened && datepicker.id) || null',
                    '[attr.min]': 'min ? dateAdapter.toIso8601(min) : null',
                    '[attr.max]': 'max ? dateAdapter.toIso8601(max) : null',
                    '[attr.disabled]': 'disabled || null',
                    '(input)': 'onInput($event.target.value)',
                    '(change)': 'onChange()',
                    '(blur)': 'onBlur()',
                    '(keydown)': 'onKeydown($event)'
                }
            },] }
];
/** @nocollapse */
McDatepickerInput.ctorParameters = () => [
    { type: ElementRef },
    { type: DateAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_DATE_FORMATS,] }] }
];
McDatepickerInput.propDecorators = {
    mcDatepicker: [{ type: Input }],
    mcDatepickerFilter: [{ type: Input }],
    value: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    disabled: [{ type: Input }],
    dateChange: [{ type: Output }],
    dateInput: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    McDatepickerInput.prototype.datepicker;
    /** @type {?} */
    McDatepickerInput.prototype.dateFilter;
    /**
     * Emits when a `change` event is fired on this `<input>`.
     * @type {?}
     */
    McDatepickerInput.prototype.dateChange;
    /**
     * Emits when an `input` event is fired on this `<input>`.
     * @type {?}
     */
    McDatepickerInput.prototype.dateInput;
    /**
     * Emits when the value changes (either due to user input or programmatic change).
     * @type {?}
     */
    McDatepickerInput.prototype.valueChange;
    /**
     * Emits when the disabled state has changed
     * @type {?}
     */
    McDatepickerInput.prototype.disabledChange;
    /**
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype._value;
    /**
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype._min;
    /**
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype._max;
    /**
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype.datepickerSubscription;
    /**
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype.localeSubscription;
    /**
     * Whether the last value set on the input was valid.
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype.lastValueValid;
    /**
     * The combined form control validator for this input.
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype.validator;
    /** @type {?} */
    McDatepickerInput.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype.cvaOnChange;
    /**
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype.validatorOnChange;
    /**
     * The form control validator for whether the input parses.
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype.parseValidator;
    /**
     * The form control validator for the min date.
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype.minValidator;
    /**
     * The form control validator for the max date.
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype.maxValidator;
    /**
     * The form control validator for the date filter.
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype.filterValidator;
    /** @type {?} */
    McDatepickerInput.prototype.elementRef;
    /** @type {?} */
    McDatepickerInput.prototype.dateAdapter;
    /**
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype.dateFormats;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0gsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBR0gsYUFBYSxFQUNiLGlCQUFpQixFQUlqQixVQUFVLEVBQ2IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBaUIsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVwQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7OztBQUlqRSxNQUFNLE9BQU8sNEJBQTRCLEdBQVE7SUFDN0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLEVBQUM7SUFDaEQsS0FBSyxFQUFFLElBQUk7Q0FDZDs7Ozs7QUFHRCxNQUFNLE9BQU8sd0JBQXdCLEdBQVE7SUFDekMsT0FBTyxFQUFFLGFBQWE7SUFDdEIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixFQUFDO0lBQ2hELEtBQUssRUFBRSxJQUFJO0NBQ2Q7Ozs7Ozs7QUFRRCxNQUFNLE9BQU8sc0JBQXNCOzs7OztJQUkvQixZQUVXLE1BQTRCLEVBRTVCLGFBQTBCO1FBRjFCLFdBQU0sR0FBTixNQUFNLENBQXNCO1FBRTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFhO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDbkMsQ0FBQztDQUNKOzs7Ozs7SUFURyx1Q0FBZ0I7Ozs7O0lBSVosd0NBQW1DOzs7OztJQUVuQywrQ0FBaUM7Ozs7OztBQTJCekMsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7O0lBOEgxQixZQUNXLFVBQXdDLEVBQzVCLFdBQTJCLEVBQ0QsV0FBMEI7UUFGaEUsZUFBVSxHQUFWLFVBQVUsQ0FBOEI7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQ0QsZ0JBQVcsR0FBWCxXQUFXLENBQWU7Ozs7UUE5QnhELGVBQVUsR0FDekIsSUFBSSxZQUFZLEVBQTZCLENBQUM7Ozs7UUFHL0IsY0FBUyxHQUN4QixJQUFJLFlBQVksRUFBNkIsQ0FBQzs7OztRQUdsRCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFZLENBQUM7Ozs7UUFHM0MsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBTXJDLDJCQUFzQixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFFNUMsdUJBQWtCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQzs7OztRQUd4QyxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQStCL0IsY0FBUzs7O1FBQUcsR0FBRyxFQUFFO1FBQ2pCLENBQUMsRUFBQTtRQTRFTyxnQkFBVzs7O1FBQXlCLEdBQUcsRUFBRTtRQUNqRCxDQUFDLEVBQUE7UUFFTyxzQkFBaUI7OztRQUFHLEdBQUcsRUFBRTtRQUNqQyxDQUFDLEVBQUE7Ozs7UUFHTyxtQkFBYzs7O1FBQWdCLEdBQTRCLEVBQUU7WUFDaEUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1FBQ3BGLENBQUMsRUFBQTs7OztRQUdPLGlCQUFZOzs7O1FBQWdCLENBQUMsT0FBd0IsRUFBMkIsRUFBRTs7a0JBQ2hGLFlBQVksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXpGLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZO2dCQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVELElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxlQUFlLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQztRQUM1RSxDQUFDLEVBQUE7Ozs7UUFHTyxpQkFBWTs7OztRQUFnQixDQUFDLE9BQXdCLEVBQTJCLEVBQUU7O2tCQUNoRixZQUFZLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUV6RixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWTtnQkFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1RCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsZUFBZSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLENBQUM7UUFDNUUsQ0FBQyxFQUFBOzs7O1FBR08sb0JBQWU7Ozs7UUFBZ0IsQ0FBQyxPQUF3QixFQUEyQixFQUFFOztrQkFDbkYsWUFBWSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFekYsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUN2RSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDNUMsQ0FBQyxFQUFBO1FBdElHLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQztZQUNoQyxJQUFJLENBQUMsY0FBYztZQUNuQixJQUFJLENBQUMsWUFBWTtZQUNqQixJQUFJLENBQUMsWUFBWTtZQUNqQixJQUFJLENBQUMsZUFBZTtTQUN2QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNuQixNQUFNLDBCQUEwQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbkIsTUFBTSwwQkFBMEIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3ZEO1FBRUQscURBQXFEO1FBQ3JELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDLFNBQVM7OztRQUFDLEdBQUcsRUFBRTtZQUMvRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDNUIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFwSkQsSUFDSSxZQUFZLENBQUMsS0FBc0I7UUFDbkMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUUxQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsU0FBUzs7OztRQUFDLENBQUMsUUFBVyxFQUFFLEVBQUU7WUFDcEYsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7WUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3JGLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksc0JBQXNCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUMxRixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUdELElBQ0ksa0JBQWtCLENBQUMsS0FBa0M7UUFDckQsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFHRCxJQUNJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFFRCxJQUFJLEtBQUssQ0FBQyxLQUFlO1FBQ3JCLHFEQUFxRDtRQUNyRCxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRSxxREFBcUQ7UUFDckQsS0FBSyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Y0FDakMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLO1FBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtZQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQztJQUNMLENBQUM7Ozs7O0lBR0QsSUFDSSxHQUFHO1FBQ0gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBRUQsSUFBSSxHQUFHLENBQUMsS0FBZTtRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBR0QsSUFDSSxHQUFHO1FBQ0gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBRUQsSUFBSSxHQUFHLENBQUMsS0FBZTtRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBR0QsSUFDSSxRQUFRO1FBQ1IsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUM1QixDQUFDOzs7OztJQUVELElBQUksUUFBUSxDQUFDLEtBQWM7O2NBQ2pCLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUM7O2NBQ3ZDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWE7UUFFN0MsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtZQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUMxQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN0QztRQUVELDhFQUE4RTtRQUM5RSxJQUFJLFFBQVEsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQzFCLDBGQUEwRjtZQUMxRix5RkFBeUY7WUFDekYsMkZBQTJGO1lBQzNGLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNsQjtJQUNMLENBQUM7Ozs7SUE4REQsV0FBVztRQUNQLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ25DLENBQUM7Ozs7OztJQUdELHlCQUF5QixDQUFDLEVBQWM7UUFDcEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztJQUNoQyxDQUFDOzs7Ozs7SUFHRCxRQUFRLENBQUMsQ0FBa0I7UUFDdkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDckQsQ0FBQzs7Ozs7O0lBR0QsVUFBVSxDQUFDLEtBQVE7UUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDOzs7Ozs7SUFHRCxnQkFBZ0IsQ0FBQyxFQUF3QjtRQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7Ozs7SUFHRCxpQkFBaUIsQ0FBQyxFQUFjO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7Ozs7OztJQUdELGdCQUFnQixDQUFDLFVBQW1CO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLEtBQW9COzs7Y0FFcEIsY0FBYyxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxVQUFVO1FBRW5FLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxjQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUU7WUFDOUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxLQUFhOztZQUNiLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQzFFLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUQsSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMvQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksc0JBQXNCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztTQUN4RjtJQUNMLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQzFGLENBQUM7Ozs7O0lBR0QsTUFBTTtRQUNGLG9EQUFvRDtRQUNwRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQztRQUVELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDOzs7Ozs7O0lBeUNPLFdBQVcsQ0FBQyxLQUFlO1FBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUs7WUFDL0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUN4RixDQUFDOzs7Ozs7SUFNTyxrQkFBa0IsQ0FBQyxHQUFRO1FBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNoRyxDQUFDOzs7WUEzU0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFNBQVMsRUFBRTtvQkFDUCw0QkFBNEI7b0JBQzVCLHdCQUF3QjtvQkFDeEIsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFO2lCQUN2RTtnQkFDRCxJQUFJLEVBQUU7b0JBQ0Ysc0JBQXNCLEVBQUUsTUFBTTtvQkFDOUIsa0JBQWtCLEVBQUUsK0NBQStDO29CQUNuRSxZQUFZLEVBQUUseUNBQXlDO29CQUN2RCxZQUFZLEVBQUUseUNBQXlDO29CQUN2RCxpQkFBaUIsRUFBRSxrQkFBa0I7b0JBQ3JDLFNBQVMsRUFBRSw4QkFBOEI7b0JBQ3pDLFVBQVUsRUFBRSxZQUFZO29CQUN4QixRQUFRLEVBQUUsVUFBVTtvQkFDcEIsV0FBVyxFQUFFLG1CQUFtQjtpQkFDbkM7YUFDSjs7OztZQWxGRyxVQUFVO1lBbUJMLFdBQVcsdUJBZ01YLFFBQVE7NENBQ1IsUUFBUSxZQUFJLE1BQU0sU0FBQyxlQUFlOzs7MkJBL0h0QyxLQUFLO2lDQW9CTCxLQUFLO29CQU9MLEtBQUs7a0JBcUJMLEtBQUs7a0JBV0wsS0FBSzt1QkFXTCxLQUFLO3lCQTJCTCxNQUFNO3dCQUlOLE1BQU07Ozs7SUFSUCx1Q0FBNEI7O0lBQzVCLHVDQUF3Qzs7Ozs7SUFHeEMsdUNBQ2tEOzs7OztJQUdsRCxzQ0FDa0Q7Ozs7O0lBR2xELHdDQUEyQzs7Ozs7SUFHM0MsMkNBQTZDOzs7OztJQUM3QyxtQ0FBeUI7Ozs7O0lBQ3pCLGlDQUF1Qjs7Ozs7SUFDdkIsaUNBQXVCOzs7OztJQUN2QixzQ0FBMkI7Ozs7O0lBRTNCLG1EQUFvRDs7Ozs7SUFFcEQsK0NBQWdEOzs7Ozs7SUFHaEQsMkNBQStCOzs7Ozs7SUFHL0Isc0NBQXNDOztJQTRCdEMsc0NBQ0M7Ozs7O0lBNEVELHdDQUNDOzs7OztJQUVELDhDQUNDOzs7Ozs7SUFHRCwyQ0FHQzs7Ozs7O0lBR0QseUNBTUM7Ozs7OztJQUdELHlDQU1DOzs7Ozs7SUFHRCw0Q0FLQzs7SUExSUcsdUNBQStDOztJQUMvQyx3Q0FBOEM7Ozs7O0lBQzlDLHdDQUF1RSIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOm5vLWVtcHR5XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQWJzdHJhY3RDb250cm9sLFxuICAgIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIE5HX1ZBTElEQVRPUlMsXG4gICAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgVmFsaWRhdGlvbkVycm9ycyxcbiAgICBWYWxpZGF0b3IsXG4gICAgVmFsaWRhdG9yRm4sXG4gICAgVmFsaWRhdG9yc1xufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciwgTUNfREFURV9GT1JNQVRTLCBNY0RhdGVGb3JtYXRzIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2RhdGV0aW1lJztcbmltcG9ydCB7IERPV05fQVJST1cgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgTUNfSU5QVVRfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvaW5wdXQnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE1jRGF0ZXBpY2tlciB9IGZyb20gJy4vZGF0ZXBpY2tlcic7XG5pbXBvcnQgeyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvciB9IGZyb20gJy4vZGF0ZXBpY2tlci1lcnJvcnMnO1xuXG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUNfREFURVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1jRGF0ZXBpY2tlcklucHV0KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19EQVRFUElDS0VSX1ZBTElEQVRPUlM6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1jRGF0ZXBpY2tlcklucHV0KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuXG4vKipcbiAqIEFuIGV2ZW50IHVzZWQgZm9yIGRhdGVwaWNrZXIgaW5wdXQgYW5kIGNoYW5nZSBldmVudHMuIFdlIGRvbid0IGFsd2F5cyBoYXZlIGFjY2VzcyB0byBhIG5hdGl2ZVxuICogaW5wdXQgb3IgY2hhbmdlIGV2ZW50IGJlY2F1c2UgdGhlIGV2ZW50IG1heSBoYXZlIGJlZW4gdHJpZ2dlcmVkIGJ5IHRoZSB1c2VyIGNsaWNraW5nIG9uIHRoZVxuICogY2FsZW5kYXIgcG9wdXAuIEZvciBjb25zaXN0ZW5jeSwgd2UgYWx3YXlzIHVzZSBNY0RhdGVwaWNrZXJJbnB1dEV2ZW50IGluc3RlYWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBNY0RhdGVwaWNrZXJJbnB1dEV2ZW50PEQ+IHtcbiAgICAvKiogVGhlIG5ldyB2YWx1ZSBmb3IgdGhlIHRhcmdldCBkYXRlcGlja2VyIGlucHV0LiAqL1xuICAgIHZhbHVlOiBEIHwgbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBkYXRlcGlja2VyIGlucHV0IGNvbXBvbmVudCB0aGF0IGVtaXR0ZWQgdGhlIGV2ZW50LiAqL1xuICAgICAgICBwdWJsaWMgdGFyZ2V0OiBNY0RhdGVwaWNrZXJJbnB1dDxEPixcbiAgICAgICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgbmF0aXZlIGlucHV0IGVsZW1lbnQgYXNzb2NpYXRlZCB3aXRoIHRoZSBkYXRlcGlja2VyIGlucHV0LiAqL1xuICAgICAgICBwdWJsaWMgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudGFyZ2V0LnZhbHVlO1xuICAgIH1cbn1cblxuXG4vKiogRGlyZWN0aXZlIHVzZWQgdG8gY29ubmVjdCBhbiBpbnB1dCB0byBhIE1jRGF0ZXBpY2tlci4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnaW5wdXRbbWNEYXRlcGlja2VyXScsXG4gICAgZXhwb3J0QXM6ICdtY0RhdGVwaWNrZXJJbnB1dCcsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE1DX0RBVEVQSUNLRVJfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIE1DX0RBVEVQSUNLRVJfVkFMSURBVE9SUyxcbiAgICAgICAgeyBwcm92aWRlOiBNQ19JTlBVVF9WQUxVRV9BQ0NFU1NPUiwgdXNlRXhpc3Rpbmc6IE1jRGF0ZXBpY2tlcklucHV0IH1cbiAgICBdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLmFyaWEtaGFzcG9wdXBdJzogJ3RydWUnLFxuICAgICAgICAnW2F0dHIuYXJpYS1vd25zXSc6ICcoZGF0ZXBpY2tlcj8ub3BlbmVkICYmIGRhdGVwaWNrZXIuaWQpIHx8IG51bGwnLFxuICAgICAgICAnW2F0dHIubWluXSc6ICdtaW4gPyBkYXRlQWRhcHRlci50b0lzbzg2MDEobWluKSA6IG51bGwnLFxuICAgICAgICAnW2F0dHIubWF4XSc6ICdtYXggPyBkYXRlQWRhcHRlci50b0lzbzg2MDEobWF4KSA6IG51bGwnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICAgICAnKGlucHV0KSc6ICdvbklucHV0KCRldmVudC50YXJnZXQudmFsdWUpJyxcbiAgICAgICAgJyhjaGFuZ2UpJzogJ29uQ2hhbmdlKCknLFxuICAgICAgICAnKGJsdXIpJzogJ29uQmx1cigpJyxcbiAgICAgICAgJyhrZXlkb3duKSc6ICdvbktleWRvd24oJGV2ZW50KSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jRGF0ZXBpY2tlcklucHV0PEQ+IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSwgVmFsaWRhdG9yIHtcbiAgICAvKiogVGhlIGRhdGVwaWNrZXIgdGhhdCB0aGlzIGlucHV0IGlzIGFzc29jaWF0ZWQgd2l0aC4gKi9cbiAgICBASW5wdXQoKVxuICAgIHNldCBtY0RhdGVwaWNrZXIodmFsdWU6IE1jRGF0ZXBpY2tlcjxEPikge1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRhdGVwaWNrZXIgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5kYXRlcGlja2VyLnJlZ2lzdGVySW5wdXQodGhpcyk7XG4gICAgICAgIHRoaXMuZGF0ZXBpY2tlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXG4gICAgICAgIHRoaXMuZGF0ZXBpY2tlclN1YnNjcmlwdGlvbiA9IHRoaXMuZGF0ZXBpY2tlci5zZWxlY3RlZENoYW5nZWQuc3Vic2NyaWJlKChzZWxlY3RlZDogRCkgPT4ge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHNlbGVjdGVkO1xuICAgICAgICAgICAgdGhpcy5jdmFPbkNoYW5nZShzZWxlY3RlZCk7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICAgICAgdGhpcy5kYXRlSW5wdXQuZW1pdChuZXcgTWNEYXRlcGlja2VySW5wdXRFdmVudCh0aGlzLCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkpO1xuICAgICAgICAgICAgdGhpcy5kYXRlQ2hhbmdlLmVtaXQobmV3IE1jRGF0ZXBpY2tlcklucHV0RXZlbnQodGhpcywgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIEZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gZmlsdGVyIG91dCBkYXRlcyB3aXRoaW4gdGhlIGRhdGVwaWNrZXIuICovXG4gICAgQElucHV0KClcbiAgICBzZXQgbWNEYXRlcGlja2VyRmlsdGVyKHZhbHVlOiAoZGF0ZTogRCB8IG51bGwpID0+IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5kYXRlRmlsdGVyID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UoKTtcbiAgICB9XG5cbiAgICAvKiogVGhlIHZhbHVlIG9mIHRoZSBpbnB1dC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1wYXJhbWV0ZXItcmVhc3NpZ25tZW50XG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMubGFzdFZhbHVlVmFsaWQgPSAhdmFsdWUgfHwgdGhpcy5kYXRlQWRhcHRlci5pc1ZhbGlkKHZhbHVlKTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXBhcmFtZXRlci1yZWFzc2lnbm1lbnRcbiAgICAgICAgdmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh2YWx1ZSk7XG4gICAgICAgIGNvbnN0IG9sZERhdGUgPSB0aGlzLnZhbHVlO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmZvcm1hdFZhbHVlKHZhbHVlKTtcblxuICAgICAgICBpZiAoIXRoaXMuZGF0ZUFkYXB0ZXIuc2FtZURhdGUob2xkRGF0ZSwgdmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFRoZSBtaW5pbXVtIHZhbGlkIGRhdGUuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgbWluKCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbjtcbiAgICB9XG5cbiAgICBzZXQgbWluKHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9taW4gPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UoKTtcbiAgICB9XG5cbiAgICAvKiogVGhlIG1heGltdW0gdmFsaWQgZGF0ZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBtYXgoKTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4O1xuICAgIH1cblxuICAgIHNldCBtYXgodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX21heCA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcbiAgICAgICAgdGhpcy52YWxpZGF0b3JPbkNoYW5nZSgpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkYXRlcGlja2VyLWlucHV0IGlzIGRpc2FibGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKHRoaXMuX2Rpc2FibGVkICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZWRDaGFuZ2UuZW1pdChuZXdWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBuZWVkIHRvIG51bGwgY2hlY2sgdGhlIGBibHVyYCBtZXRob2QsIGJlY2F1c2UgaXQncyB1bmRlZmluZWQgZHVyaW5nIFNTUi5cbiAgICAgICAgaWYgKG5ld1ZhbHVlICYmIGVsZW1lbnQuYmx1cikge1xuICAgICAgICAgICAgLy8gTm9ybWFsbHksIG5hdGl2ZSBpbnB1dCBlbGVtZW50cyBhdXRvbWF0aWNhbGx5IGJsdXIgaWYgdGhleSB0dXJuIGRpc2FibGVkLiBUaGlzIGJlaGF2aW9yXG4gICAgICAgICAgICAvLyBpcyBwcm9ibGVtYXRpYywgYmVjYXVzZSBpdCB3b3VsZCBtZWFuIHRoYXQgaXQgdHJpZ2dlcnMgYW5vdGhlciBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlLFxuICAgICAgICAgICAgLy8gd2hpY2ggdGhlbiBjYXVzZXMgYSBjaGFuZ2VkIGFmdGVyIGNoZWNrZWQgZXJyb3IgaWYgdGhlIGlucHV0IGVsZW1lbnQgd2FzIGZvY3VzZWQgYmVmb3JlLlxuICAgICAgICAgICAgZWxlbWVudC5ibHVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkYXRlcGlja2VyOiBNY0RhdGVwaWNrZXI8RD47XG4gICAgZGF0ZUZpbHRlcjogKGRhdGU6IEQgfCBudWxsKSA9PiBib29sZWFuO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gYSBgY2hhbmdlYCBldmVudCBpcyBmaXJlZCBvbiB0aGlzIGA8aW5wdXQ+YC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgZGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPE1jRGF0ZXBpY2tlcklucHV0RXZlbnQ8RD4+ID1cbiAgICAgICAgbmV3IEV2ZW50RW1pdHRlcjxNY0RhdGVwaWNrZXJJbnB1dEV2ZW50PEQ+PigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gYW4gYGlucHV0YCBldmVudCBpcyBmaXJlZCBvbiB0aGlzIGA8aW5wdXQ+YC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgZGF0ZUlucHV0OiBFdmVudEVtaXR0ZXI8TWNEYXRlcGlja2VySW5wdXRFdmVudDxEPj4gPVxuICAgICAgICBuZXcgRXZlbnRFbWl0dGVyPE1jRGF0ZXBpY2tlcklucHV0RXZlbnQ8RD4+KCk7XG5cbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgdmFsdWUgY2hhbmdlcyAoZWl0aGVyIGR1ZSB0byB1c2VyIGlucHV0IG9yIHByb2dyYW1tYXRpYyBjaGFuZ2UpLiAqL1xuICAgIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxEIHwgbnVsbD4oKTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSBkaXNhYmxlZCBzdGF0ZSBoYXMgY2hhbmdlZCAqL1xuICAgIGRpc2FibGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICAgIHByaXZhdGUgX3ZhbHVlOiBEIHwgbnVsbDtcbiAgICBwcml2YXRlIF9taW46IEQgfCBudWxsO1xuICAgIHByaXZhdGUgX21heDogRCB8IG51bGw7XG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIGRhdGVwaWNrZXJTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICBwcml2YXRlIGxvY2FsZVN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBsYXN0IHZhbHVlIHNldCBvbiB0aGUgaW5wdXQgd2FzIHZhbGlkLiAqL1xuICAgIHByaXZhdGUgbGFzdFZhbHVlVmFsaWQgPSBmYWxzZTtcblxuICAgIC8qKiBUaGUgY29tYmluZWQgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhpcyBpbnB1dC4gKi9cbiAgICBwcml2YXRlIHZhbGlkYXRvcjogVmFsaWRhdG9yRm4gfCBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LFxuICAgICAgICBAT3B0aW9uYWwoKSBwdWJsaWMgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1DX0RBVEVfRk9STUFUUykgcHJpdmF0ZSBkYXRlRm9ybWF0czogTWNEYXRlRm9ybWF0c1xuICAgICkge1xuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IFZhbGlkYXRvcnMuY29tcG9zZShbXG4gICAgICAgICAgICB0aGlzLnBhcnNlVmFsaWRhdG9yLFxuICAgICAgICAgICAgdGhpcy5taW5WYWxpZGF0b3IsXG4gICAgICAgICAgICB0aGlzLm1heFZhbGlkYXRvcixcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyVmFsaWRhdG9yXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGlmICghdGhpcy5kYXRlQWRhcHRlcikge1xuICAgICAgICAgICAgdGhyb3cgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IoJ0RhdGVBZGFwdGVyJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuZGF0ZUZvcm1hdHMpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdNQ19EQVRFX0ZPUk1BVFMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgZGlzcGxheWVkIGRhdGUgd2hlbiB0aGUgbG9jYWxlIGNoYW5nZXMuXG4gICAgICAgIHRoaXMubG9jYWxlU3Vic2NyaXB0aW9uID0gZGF0ZUFkYXB0ZXIubG9jYWxlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uVG91Y2hlZCA9ICgpID0+IHtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kYXRlcGlja2VyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMubG9jYWxlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuY29tcGxldGUoKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlZENoYW5nZS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8qKiBAZG9jcy1wcml2YXRlICovXG4gICAgcmVnaXN0ZXJPblZhbGlkYXRvckNoYW5nZShmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbGlkYXRvck9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLyoqIEBkb2NzLXByaXZhdGUgKi9cbiAgICB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvciA/IHRoaXMudmFsaWRhdG9yKGMpIDogbnVsbDtcbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgIHdyaXRlVmFsdWUodmFsdWU6IEQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jdmFPbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgICAgIGNvbnN0IGlzQWx0RG93bkFycm93ID0gZXZlbnQuYWx0S2V5ICYmIGV2ZW50LmtleUNvZGUgPT09IERPV05fQVJST1c7XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0ZXBpY2tlciAmJiBpc0FsdERvd25BcnJvdyAmJiAhdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZXBpY2tlci5vcGVuKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JbnB1dCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBkYXRlID0gdGhpcy5kYXRlQWRhcHRlci5wYXJzZSh2YWx1ZSwgdGhpcy5kYXRlRm9ybWF0cy5wYXJzZS5kYXRlSW5wdXQpO1xuICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gIWRhdGUgfHwgdGhpcy5kYXRlQWRhcHRlci5pc1ZhbGlkKGRhdGUpO1xuICAgICAgICBkYXRlID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwoZGF0ZSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmRhdGVBZGFwdGVyLnNhbWVEYXRlKGRhdGUsIHRoaXMuX3ZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBkYXRlO1xuICAgICAgICAgICAgdGhpcy5jdmFPbkNoYW5nZShkYXRlKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdChkYXRlKTtcbiAgICAgICAgICAgIHRoaXMuZGF0ZUlucHV0LmVtaXQobmV3IE1jRGF0ZXBpY2tlcklucHV0RXZlbnQodGhpcywgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLmRhdGVDaGFuZ2UuZW1pdChuZXcgTWNEYXRlcGlja2VySW5wdXRFdmVudCh0aGlzLCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkpO1xuICAgIH1cblxuICAgIC8qKiBIYW5kbGVzIGJsdXIgZXZlbnRzIG9uIHRoZSBpbnB1dC4gKi9cbiAgICBvbkJsdXIoKSB7XG4gICAgICAgIC8vIFJlZm9ybWF0IHRoZSBpbnB1dCBvbmx5IGlmIHdlIGhhdmUgYSB2YWxpZCB2YWx1ZS5cbiAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0VmFsdWUodGhpcy52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3ZhT25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge1xuICAgIH1cblxuICAgIHByaXZhdGUgdmFsaWRhdG9yT25DaGFuZ2UgPSAoKSA9PiB7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB3aGV0aGVyIHRoZSBpbnB1dCBwYXJzZXMuICovXG4gICAgcHJpdmF0ZSBwYXJzZVZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5sYXN0VmFsdWVWYWxpZCA/XG4gICAgICAgICAgICBudWxsIDogeyBtY0RhdGVwaWNrZXJQYXJzZTogeyB0ZXh0OiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSB9IH07XG4gICAgfVxuXG4gICAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGUgbWluIGRhdGUuICovXG4gICAgcHJpdmF0ZSBtaW5WYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgICAgY29uc3QgY29udHJvbFZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlKSk7XG5cbiAgICAgICAgcmV0dXJuICghdGhpcy5taW4gfHwgIWNvbnRyb2xWYWx1ZSB8fFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5jb21wYXJlRGF0ZSh0aGlzLm1pbiwgY29udHJvbFZhbHVlKSA8PSAwKSA/XG4gICAgICAgICAgICBudWxsIDogeyBtY0RhdGVwaWNrZXJNaW46IHsgbWluOiB0aGlzLm1pbiwgYWN0dWFsOiBjb250cm9sVmFsdWUgfSB9O1xuICAgIH1cblxuICAgIC8qKiBUaGUgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhlIG1heCBkYXRlLiAqL1xuICAgIHByaXZhdGUgbWF4VmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZSkpO1xuXG4gICAgICAgIHJldHVybiAoIXRoaXMubWF4IHx8ICFjb250cm9sVmFsdWUgfHxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuY29tcGFyZURhdGUodGhpcy5tYXgsIGNvbnRyb2xWYWx1ZSkgPj0gMCkgP1xuICAgICAgICAgICAgbnVsbCA6IHsgbWNEYXRlcGlja2VyTWF4OiB7IG1heDogdGhpcy5tYXgsIGFjdHVhbDogY29udHJvbFZhbHVlIH0gfTtcbiAgICB9XG5cbiAgICAvKiogVGhlIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoZSBkYXRlIGZpbHRlci4gKi9cbiAgICBwcml2YXRlIGZpbHRlclZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICBjb25zdCBjb250cm9sVmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWUpKTtcblxuICAgICAgICByZXR1cm4gIXRoaXMuZGF0ZUZpbHRlciB8fCAhY29udHJvbFZhbHVlIHx8IHRoaXMuZGF0ZUZpbHRlcihjb250cm9sVmFsdWUpID9cbiAgICAgICAgICAgIG51bGwgOiB7IG1jRGF0ZXBpY2tlckZpbHRlcjogdHJ1ZSB9O1xuICAgIH1cblxuICAgIC8qKiBGb3JtYXRzIGEgdmFsdWUgYW5kIHNldHMgaXQgb24gdGhlIGlucHV0IGVsZW1lbnQuICovXG4gICAgcHJpdmF0ZSBmb3JtYXRWYWx1ZSh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgPVxuICAgICAgICAgICAgdmFsdWUgPyB0aGlzLmRhdGVBZGFwdGVyLmZvcm1hdCh2YWx1ZSwgdGhpcy5kYXRlRm9ybWF0cy5kaXNwbGF5LmRhdGVJbnB1dCkgOiAnJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMgVGhlIGdpdmVuIG9iamVjdCBpZiBpdCBpcyBib3RoIGEgZGF0ZSBpbnN0YW5jZSBhbmQgdmFsaWQsIG90aGVyd2lzZSBudWxsLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0VmFsaWREYXRlT3JOdWxsKG9iajogYW55KTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gKHRoaXMuZGF0ZUFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJiB0aGlzLmRhdGVBZGFwdGVyLmlzVmFsaWQob2JqKSkgPyBvYmogOiBudWxsO1xuICAgIH1cbn1cbiJdfQ==