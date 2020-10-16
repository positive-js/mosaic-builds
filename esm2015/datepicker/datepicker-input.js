/**
 * @fileoverview added by tsickle
 * Generated from: datepicker-input.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL2RhdGVwaWNrZXIvIiwic291cmNlcyI6WyJkYXRlcGlja2VyLWlucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHSCxhQUFhLEVBQ2IsaUJBQWlCLEVBSWpCLFVBQVUsRUFDYixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFpQixNQUFNLDBCQUEwQixDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDNUMsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7O0FBSWpFLE1BQU0sT0FBTyw0QkFBNEIsR0FBUTtJQUM3QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsRUFBQztJQUNoRCxLQUFLLEVBQUUsSUFBSTtDQUNkOzs7OztBQUdELE1BQU0sT0FBTyx3QkFBd0IsR0FBUTtJQUN6QyxPQUFPLEVBQUUsYUFBYTtJQUN0QixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLEVB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QUFXLEVBQUUsaUJBQWlCLEVBQUU7aUJBQ3ZFO2dCQUNELElBQUksRUFBRTtvQkFDRixzQkFBc0IsRUFBRSxNQUFNO29CQUM5QixrQkFBa0IsRUFBRSwrQ0FBK0M7b0JBQ25FLFlBQVksRUFBRSx5Q0FBeUM7b0JBQ3ZELFlBQVksRUFBRSx5Q0FBeUM7b0JBQ3ZELGlCQUFpQixFQUFFLGtCQUFrQjtvQkFDckMsU0FBUyxFQUFFLDhCQUE4QjtvQkFDekMsVUFBVSxFQUFFLFlBQVk7b0JBQ3hCLFFBQVEsRUFBRSxVQUFVO29CQUNwQixXQUFXLEVBQUUsbUJBQW1CO2lCQUNuQzthQUNKOzs7O1lBbEZHLFVBQVU7WUFtQkwsV0FBVyx1QkFnTVgsUUFBUTs0Q0FDUixRQUFRLFlBQUksTUFBTSxTQUFDLGVBQWU7OzsyQkEvSHRDLEtBQUs7aUNBb0JMLEtBQUs7b0JBT0wsS0FBSztrQkFxQkwsS0FBSztrQkFXTCxLQUFLO3VCQVdMLEtBQUs7eUJBMkJMLE1BQU07d0JBSU4sTUFBTTs7OztJQVJQLHVDQUE0Qjs7SUFDNUIsdUNBQXdDOzs7OztJQUd4Qyx1Q0FDa0Q7Ozs7O0lBR2xELHNDQUNrRDs7Ozs7SUFHbEQsd0NBQTJDOzs7OztJQUczQywyQ0FBNkM7Ozs7O0lBQzdDLG1DQUF5Qjs7Ozs7SUFDekIsaUNBQXVCOzs7OztJQUN2QixpQ0FBdUI7Ozs7O0lBQ3ZCLHNDQUEyQjs7Ozs7SUFFM0IsbURBQW9EOzs7OztJQUVwRCwrQ0FBZ0Q7Ozs7OztJQUdoRCwyQ0FBK0I7Ozs7OztJQUcvQixzQ0FBc0M7O0lBNEJ0QyxzQ0FDQzs7Ozs7SUE0RUQsd0NBQ0M7Ozs7O0lBRUQsOENBQ0M7Ozs7OztJQUdELDJDQUdDOzs7Ozs7SUFHRCx5Q0FNQzs7Ozs7O0lBR0QseUNBTUM7Ozs7OztJQUdELDRDQUtDOztJQTFJRyx1Q0FBK0M7O0lBQy9DLHdDQUE4Qzs7Ozs7SUFDOUMsd0NBQXVFIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6bm8tZW1wdHlcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBBYnN0cmFjdENvbnRyb2wsXG4gICAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgTkdfVkFMSURBVE9SUyxcbiAgICBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICBWYWxpZGF0aW9uRXJyb3JzLFxuICAgIFZhbGlkYXRvcixcbiAgICBWYWxpZGF0b3JGbixcbiAgICBWYWxpZGF0b3JzXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERhdGVBZGFwdGVyLCBNQ19EQVRFX0ZPUk1BVFMsIE1jRGF0ZUZvcm1hdHMgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvZGF0ZXRpbWUnO1xuaW1wb3J0IHsgRE9XTl9BUlJPVyB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBNQ19JTlBVVF9WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9pbnB1dCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTWNEYXRlcGlja2VyIH0gZnJvbSAnLi9kYXRlcGlja2VyJztcbmltcG9ydCB7IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yIH0gZnJvbSAnLi9kYXRlcGlja2VyLWVycm9ycyc7XG5cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19EQVRFUElDS0VSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWNEYXRlcGlja2VySW5wdXQpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNvbnN0IE1DX0RBVEVQSUNLRVJfVkFMSURBVE9SUzogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWNEYXRlcGlja2VySW5wdXQpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5cbi8qKlxuICogQW4gZXZlbnQgdXNlZCBmb3IgZGF0ZXBpY2tlciBpbnB1dCBhbmQgY2hhbmdlIGV2ZW50cy4gV2UgZG9uJ3QgYWx3YXlzIGhhdmUgYWNjZXNzIHRvIGEgbmF0aXZlXG4gKiBpbnB1dCBvciBjaGFuZ2UgZXZlbnQgYmVjYXVzZSB0aGUgZXZlbnQgbWF5IGhhdmUgYmVlbiB0cmlnZ2VyZWQgYnkgdGhlIHVzZXIgY2xpY2tpbmcgb24gdGhlXG4gKiBjYWxlbmRhciBwb3B1cC4gRm9yIGNvbnNpc3RlbmN5LCB3ZSBhbHdheXMgdXNlIE1jRGF0ZXBpY2tlcklucHV0RXZlbnQgaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGNsYXNzIE1jRGF0ZXBpY2tlcklucHV0RXZlbnQ8RD4ge1xuICAgIC8qKiBUaGUgbmV3IHZhbHVlIGZvciB0aGUgdGFyZ2V0IGRhdGVwaWNrZXIgaW5wdXQuICovXG4gICAgdmFsdWU6IEQgfCBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGRhdGVwaWNrZXIgaW5wdXQgY29tcG9uZW50IHRoYXQgZW1pdHRlZCB0aGUgZXZlbnQuICovXG4gICAgICAgIHB1YmxpYyB0YXJnZXQ6IE1jRGF0ZXBpY2tlcklucHV0PEQ+LFxuICAgICAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudCBhc3NvY2lhdGVkIHdpdGggdGhlIGRhdGVwaWNrZXIgaW5wdXQuICovXG4gICAgICAgIHB1YmxpYyB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy50YXJnZXQudmFsdWU7XG4gICAgfVxufVxuXG5cbi8qKiBEaXJlY3RpdmUgdXNlZCB0byBjb25uZWN0IGFuIGlucHV0IHRvIGEgTWNEYXRlcGlja2VyLiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdpbnB1dFttY0RhdGVwaWNrZXJdJyxcbiAgICBleHBvcnRBczogJ21jRGF0ZXBpY2tlcklucHV0JyxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTUNfREFURVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgTUNfREFURVBJQ0tFUl9WQUxJREFUT1JTLFxuICAgICAgICB7IHByb3ZpZGU6IE1DX0lOUFVUX1ZBTFVFX0FDQ0VTU09SLCB1c2VFeGlzdGluZzogTWNEYXRlcGlja2VySW5wdXQgfVxuICAgIF0sXG4gICAgaG9zdDoge1xuICAgICAgICAnW2F0dHIuYXJpYS1oYXNwb3B1cF0nOiAndHJ1ZScsXG4gICAgICAgICdbYXR0ci5hcmlhLW93bnNdJzogJyhkYXRlcGlja2VyPy5vcGVuZWQgJiYgZGF0ZXBpY2tlci5pZCkgfHwgbnVsbCcsXG4gICAgICAgICdbYXR0ci5taW5dJzogJ21pbiA/IGRhdGVBZGFwdGVyLnRvSXNvODYwMShtaW4pIDogbnVsbCcsXG4gICAgICAgICdbYXR0ci5tYXhdJzogJ21heCA/IGRhdGVBZGFwdGVyLnRvSXNvODYwMShtYXgpIDogbnVsbCcsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgICAgICcoaW5wdXQpJzogJ29uSW5wdXQoJGV2ZW50LnRhcmdldC52YWx1ZSknLFxuICAgICAgICAnKGNoYW5nZSknOiAnb25DaGFuZ2UoKScsXG4gICAgICAgICcoYmx1ciknOiAnb25CbHVyKCknLFxuICAgICAgICAnKGtleWRvd24pJzogJ29uS2V5ZG93bigkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNEYXRlcGlja2VySW5wdXQ8RD4gaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95LCBWYWxpZGF0b3Ige1xuICAgIC8qKiBUaGUgZGF0ZXBpY2tlciB0aGF0IHRoaXMgaW5wdXQgaXMgYXNzb2NpYXRlZCB3aXRoLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IG1jRGF0ZXBpY2tlcih2YWx1ZTogTWNEYXRlcGlja2VyPEQ+KSB7XG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGF0ZXBpY2tlciA9IHZhbHVlO1xuICAgICAgICB0aGlzLmRhdGVwaWNrZXIucmVnaXN0ZXJJbnB1dCh0aGlzKTtcbiAgICAgICAgdGhpcy5kYXRlcGlja2VyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgdGhpcy5kYXRlcGlja2VyU3Vic2NyaXB0aW9uID0gdGhpcy5kYXRlcGlja2VyLnNlbGVjdGVkQ2hhbmdlZC5zdWJzY3JpYmUoKHNlbGVjdGVkOiBEKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gc2VsZWN0ZWQ7XG4gICAgICAgICAgICB0aGlzLmN2YU9uQ2hhbmdlKHNlbGVjdGVkKTtcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgICAgICB0aGlzLmRhdGVJbnB1dC5lbWl0KG5ldyBNY0RhdGVwaWNrZXJJbnB1dEV2ZW50KHRoaXMsIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSk7XG4gICAgICAgICAgICB0aGlzLmRhdGVDaGFuZ2UuZW1pdChuZXcgTWNEYXRlcGlja2VySW5wdXRFdmVudCh0aGlzLCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogRnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBmaWx0ZXIgb3V0IGRhdGVzIHdpdGhpbiB0aGUgZGF0ZXBpY2tlci4gKi9cbiAgICBASW5wdXQoKVxuICAgIHNldCBtY0RhdGVwaWNrZXJGaWx0ZXIodmFsdWU6IChkYXRlOiBEIHwgbnVsbCkgPT4gYm9vbGVhbikge1xuICAgICAgICB0aGlzLmRhdGVGaWx0ZXIgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52YWxpZGF0b3JPbkNoYW5nZSgpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgdmFsdWUgb2YgdGhlIGlucHV0LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHZhbHVlKCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXBhcmFtZXRlci1yZWFzc2lnbm1lbnRcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9ICF2YWx1ZSB8fCB0aGlzLmRhdGVBZGFwdGVyLmlzVmFsaWQodmFsdWUpO1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tcGFyYW1ldGVyLXJlYXNzaWdubWVudFxuICAgICAgICB2YWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHZhbHVlKTtcbiAgICAgICAgY29uc3Qgb2xkRGF0ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuZm9ybWF0VmFsdWUodmFsdWUpO1xuXG4gICAgICAgIGlmICghdGhpcy5kYXRlQWRhcHRlci5zYW1lRGF0ZShvbGREYXRlLCB2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVGhlIG1pbmltdW0gdmFsaWQgZGF0ZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBtaW4oKTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWluO1xuICAgIH1cblxuICAgIHNldCBtaW4odmFsdWU6IEQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX21pbiA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcbiAgICAgICAgdGhpcy52YWxpZGF0b3JPbkNoYW5nZSgpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgbWF4aW11bSB2YWxpZCBkYXRlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1heCgpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXg7XG4gICAgfVxuXG4gICAgc2V0IG1heCh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbWF4ID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgICAgICB0aGlzLnZhbGlkYXRvck9uQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRhdGVwaWNrZXItaW5wdXQgaXMgZGlzYWJsZWQuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgICBpZiAodGhpcy5fZGlzYWJsZWQgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlZENoYW5nZS5lbWl0KG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gbnVsbCBjaGVjayB0aGUgYGJsdXJgIG1ldGhvZCwgYmVjYXVzZSBpdCdzIHVuZGVmaW5lZCBkdXJpbmcgU1NSLlxuICAgICAgICBpZiAobmV3VmFsdWUgJiYgZWxlbWVudC5ibHVyKSB7XG4gICAgICAgICAgICAvLyBOb3JtYWxseSwgbmF0aXZlIGlucHV0IGVsZW1lbnRzIGF1dG9tYXRpY2FsbHkgYmx1ciBpZiB0aGV5IHR1cm4gZGlzYWJsZWQuIFRoaXMgYmVoYXZpb3JcbiAgICAgICAgICAgIC8vIGlzIHByb2JsZW1hdGljLCBiZWNhdXNlIGl0IHdvdWxkIG1lYW4gdGhhdCBpdCB0cmlnZ2VycyBhbm90aGVyIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUsXG4gICAgICAgICAgICAvLyB3aGljaCB0aGVuIGNhdXNlcyBhIGNoYW5nZWQgYWZ0ZXIgY2hlY2tlZCBlcnJvciBpZiB0aGUgaW5wdXQgZWxlbWVudCB3YXMgZm9jdXNlZCBiZWZvcmUuXG4gICAgICAgICAgICBlbGVtZW50LmJsdXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRhdGVwaWNrZXI6IE1jRGF0ZXBpY2tlcjxEPjtcbiAgICBkYXRlRmlsdGVyOiAoZGF0ZTogRCB8IG51bGwpID0+IGJvb2xlYW47XG5cbiAgICAvKiogRW1pdHMgd2hlbiBhIGBjaGFuZ2VgIGV2ZW50IGlzIGZpcmVkIG9uIHRoaXMgYDxpbnB1dD5gLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBkYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TWNEYXRlcGlja2VySW5wdXRFdmVudDxEPj4gPVxuICAgICAgICBuZXcgRXZlbnRFbWl0dGVyPE1jRGF0ZXBpY2tlcklucHV0RXZlbnQ8RD4+KCk7XG5cbiAgICAvKiogRW1pdHMgd2hlbiBhbiBgaW5wdXRgIGV2ZW50IGlzIGZpcmVkIG9uIHRoaXMgYDxpbnB1dD5gLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBkYXRlSW5wdXQ6IEV2ZW50RW1pdHRlcjxNY0RhdGVwaWNrZXJJbnB1dEV2ZW50PEQ+PiA9XG4gICAgICAgIG5ldyBFdmVudEVtaXR0ZXI8TWNEYXRlcGlja2VySW5wdXRFdmVudDxEPj4oKTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSB2YWx1ZSBjaGFuZ2VzIChlaXRoZXIgZHVlIHRvIHVzZXIgaW5wdXQgb3IgcHJvZ3JhbW1hdGljIGNoYW5nZSkuICovXG4gICAgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEQgfCBudWxsPigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIGRpc2FibGVkIHN0YXRlIGhhcyBjaGFuZ2VkICovXG4gICAgZGlzYWJsZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gICAgcHJpdmF0ZSBfdmFsdWU6IEQgfCBudWxsO1xuICAgIHByaXZhdGUgX21pbjogRCB8IG51bGw7XG4gICAgcHJpdmF0ZSBfbWF4OiBEIHwgbnVsbDtcbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgZGF0ZXBpY2tlclN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIHByaXZhdGUgbG9jYWxlU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGxhc3QgdmFsdWUgc2V0IG9uIHRoZSBpbnB1dCB3YXMgdmFsaWQuICovXG4gICAgcHJpdmF0ZSBsYXN0VmFsdWVWYWxpZCA9IGZhbHNlO1xuXG4gICAgLyoqIFRoZSBjb21iaW5lZCBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGlzIGlucHV0LiAqL1xuICAgIHByaXZhdGUgdmFsaWRhdG9yOiBWYWxpZGF0b3JGbiB8IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4sXG4gICAgICAgIEBPcHRpb25hbCgpIHB1YmxpYyBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfREFURV9GT1JNQVRTKSBwcml2YXRlIGRhdGVGb3JtYXRzOiBNY0RhdGVGb3JtYXRzXG4gICAgKSB7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICAgICAgICAgIHRoaXMucGFyc2VWYWxpZGF0b3IsXG4gICAgICAgICAgICB0aGlzLm1pblZhbGlkYXRvcixcbiAgICAgICAgICAgIHRoaXMubWF4VmFsaWRhdG9yLFxuICAgICAgICAgICAgdGhpcy5maWx0ZXJWYWxpZGF0b3JcbiAgICAgICAgXSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmRhdGVBZGFwdGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcignRGF0ZUFkYXB0ZXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5kYXRlRm9ybWF0cykge1xuICAgICAgICAgICAgdGhyb3cgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IoJ01DX0RBVEVfRk9STUFUUycpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVXBkYXRlIHRoZSBkaXNwbGF5ZWQgZGF0ZSB3aGVuIHRoZSBsb2NhbGUgY2hhbmdlcy5cbiAgICAgICAgdGhpcy5sb2NhbGVTdWJzY3JpcHRpb24gPSBkYXRlQWRhcHRlci5sb2NhbGVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25Ub3VjaGVkID0gKCkgPT4ge1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRhdGVwaWNrZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5sb2NhbGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLmRpc2FibGVkQ2hhbmdlLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLyoqIEBkb2NzLXByaXZhdGUgKi9cbiAgICByZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICAvKiogQGRvY3MtcHJpdmF0ZSAqL1xuICAgIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yID8gdGhpcy52YWxpZGF0b3IoYykgOiBudWxsO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogRCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLmN2YU9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgY29uc3QgaXNBbHREb3duQXJyb3cgPSBldmVudC5hbHRLZXkgJiYgZXZlbnQua2V5Q29kZSA9PT0gRE9XTl9BUlJPVztcblxuICAgICAgICBpZiAodGhpcy5kYXRlcGlja2VyICYmIGlzQWx0RG93bkFycm93ICYmICF0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZWFkT25seSkge1xuICAgICAgICAgICAgdGhpcy5kYXRlcGlja2VyLm9wZW4oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbklucHV0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGRhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLnBhcnNlKHZhbHVlLCB0aGlzLmRhdGVGb3JtYXRzLnBhcnNlLmRhdGVJbnB1dCk7XG4gICAgICAgIHRoaXMubGFzdFZhbHVlVmFsaWQgPSAhZGF0ZSB8fCB0aGlzLmRhdGVBZGFwdGVyLmlzVmFsaWQoZGF0ZSk7XG4gICAgICAgIGRhdGUgPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbChkYXRlKTtcblxuICAgICAgICBpZiAoIXRoaXMuZGF0ZUFkYXB0ZXIuc2FtZURhdGUoZGF0ZSwgdGhpcy5fdmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IGRhdGU7XG4gICAgICAgICAgICB0aGlzLmN2YU9uQ2hhbmdlKGRhdGUpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KGRhdGUpO1xuICAgICAgICAgICAgdGhpcy5kYXRlSW5wdXQuZW1pdChuZXcgTWNEYXRlcGlja2VySW5wdXRFdmVudCh0aGlzLCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25DaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMuZGF0ZUNoYW5nZS5lbWl0KG5ldyBNY0RhdGVwaWNrZXJJbnB1dEV2ZW50KHRoaXMsIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSk7XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMgYmx1ciBldmVudHMgb24gdGhlIGlucHV0LiAqL1xuICAgIG9uQmx1cigpIHtcbiAgICAgICAgLy8gUmVmb3JtYXQgdGhlIGlucHV0IG9ubHkgaWYgd2UgaGF2ZSBhIHZhbGlkIHZhbHVlLlxuICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtYXRWYWx1ZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjdmFPbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2YWxpZGF0b3JPbkNoYW5nZSA9ICgpID0+IHtcbiAgICB9XG5cbiAgICAvKiogVGhlIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHdoZXRoZXIgdGhlIGlucHV0IHBhcnNlcy4gKi9cbiAgICBwcml2YXRlIHBhcnNlVmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9ICgpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmxhc3RWYWx1ZVZhbGlkID9cbiAgICAgICAgICAgIG51bGwgOiB7IG1jRGF0ZXBpY2tlclBhcnNlOiB7IHRleHQ6IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlIH0gfTtcbiAgICB9XG5cbiAgICAvKiogVGhlIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoZSBtaW4gZGF0ZS4gKi9cbiAgICBwcml2YXRlIG1pblZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICBjb25zdCBjb250cm9sVmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWUpKTtcblxuICAgICAgICByZXR1cm4gKCF0aGlzLm1pbiB8fCAhY29udHJvbFZhbHVlIHx8XG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmNvbXBhcmVEYXRlKHRoaXMubWluLCBjb250cm9sVmFsdWUpIDw9IDApID9cbiAgICAgICAgICAgIG51bGwgOiB7IG1jRGF0ZXBpY2tlck1pbjogeyBtaW46IHRoaXMubWluLCBhY3R1YWw6IGNvbnRyb2xWYWx1ZSB9IH07XG4gICAgfVxuXG4gICAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGUgbWF4IGRhdGUuICovXG4gICAgcHJpdmF0ZSBtYXhWYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgICAgY29uc3QgY29udHJvbFZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlKSk7XG5cbiAgICAgICAgcmV0dXJuICghdGhpcy5tYXggfHwgIWNvbnRyb2xWYWx1ZSB8fFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5jb21wYXJlRGF0ZSh0aGlzLm1heCwgY29udHJvbFZhbHVlKSA+PSAwKSA/XG4gICAgICAgICAgICBudWxsIDogeyBtY0RhdGVwaWNrZXJNYXg6IHsgbWF4OiB0aGlzLm1heCwgYWN0dWFsOiBjb250cm9sVmFsdWUgfSB9O1xuICAgIH1cblxuICAgIC8qKiBUaGUgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhlIGRhdGUgZmlsdGVyLiAqL1xuICAgIHByaXZhdGUgZmlsdGVyVmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZSkpO1xuXG4gICAgICAgIHJldHVybiAhdGhpcy5kYXRlRmlsdGVyIHx8ICFjb250cm9sVmFsdWUgfHwgdGhpcy5kYXRlRmlsdGVyKGNvbnRyb2xWYWx1ZSkgP1xuICAgICAgICAgICAgbnVsbCA6IHsgbWNEYXRlcGlja2VyRmlsdGVyOiB0cnVlIH07XG4gICAgfVxuXG4gICAgLyoqIEZvcm1hdHMgYSB2YWx1ZSBhbmQgc2V0cyBpdCBvbiB0aGUgaW5wdXQgZWxlbWVudC4gKi9cbiAgICBwcml2YXRlIGZvcm1hdFZhbHVlKHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSA9XG4gICAgICAgICAgICB2YWx1ZSA/IHRoaXMuZGF0ZUFkYXB0ZXIuZm9ybWF0KHZhbHVlLCB0aGlzLmRhdGVGb3JtYXRzLmRpc3BsYXkuZGF0ZUlucHV0KSA6ICcnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyBUaGUgZ2l2ZW4gb2JqZWN0IGlmIGl0IGlzIGJvdGggYSBkYXRlIGluc3RhbmNlIGFuZCB2YWxpZCwgb3RoZXJ3aXNlIG51bGwuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRWYWxpZERhdGVPck51bGwob2JqOiBhbnkpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiAodGhpcy5kYXRlQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmIHRoaXMuZGF0ZUFkYXB0ZXIuaXNWYWxpZChvYmopKSA/IG9iaiA6IG51bGw7XG4gICAgfVxufVxuIl19