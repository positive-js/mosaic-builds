/**
 * @fileoverview added by tsickle
 * Generated from: month-view.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:no-magic-numbers
import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, Optional, Output, ViewEncapsulation, ViewChild } from '@angular/core';
import { DateAdapter, MC_DATE_FORMATS } from '@ptsecurity/cdk/datetime';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW, SPACE } from '@ptsecurity/cdk/keycodes';
import { McCalendarBody, McCalendarCell } from './calendar-body';
import { createMissingDateImplError } from './datepicker-errors';
/** @type {?} */
const DAYS_PER_WEEK = 7;
/**
 * An internal component used to display a single month in the datepicker.
 * \@docs-private
 * @template D
 */
export class McMonthView {
    /**
     * @param {?} changeDetectorRef
     * @param {?} dateFormats
     * @param {?} dateAdapter
     * @param {?=} dir
     */
    constructor(changeDetectorRef, dateFormats, dateAdapter, dir) {
        this.changeDetectorRef = changeDetectorRef;
        this.dateFormats = dateFormats;
        this.dateAdapter = dateAdapter;
        this.dir = dir;
        /**
         * Emits when a new date is selected.
         */
        this.selectedChange = new EventEmitter();
        /**
         * Emits when any date is selected.
         */
        this.userSelection = new EventEmitter();
        /**
         * Emits when any date is activated.
         */
        this.activeDateChange = new EventEmitter();
        if (!this.dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        if (!this.dateFormats) {
            throw createMissingDateImplError('MC_DATE_FORMATS');
        }
        /** @type {?} */
        const firstDayOfWeek = this.dateAdapter.getFirstDayOfWeek();
        /** @type {?} */
        const narrowWeekdays = this.dateAdapter.getDayOfWeekNames('narrow');
        /** @type {?} */
        const longWeekdays = this.dateAdapter.getDayOfWeekNames('long');
        // Rotate the labels for days of the week based on the configured first day of the week.
        /** @type {?} */
        const weekdays = longWeekdays.map((/**
         * @param {?} long
         * @param {?} i
         * @return {?}
         */
        (long, i) => {
            return { long, narrow: narrowWeekdays[i] };
        }));
        this.weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
        this._activeDate = this.dateAdapter.today();
    }
    /**
     * The date to display in this month view (everything other than the month and year is ignored).
     * @return {?}
     */
    get activeDate() {
        return this._activeDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set activeDate(value) {
        /** @type {?} */
        const oldActiveDate = this._activeDate;
        /** @type {?} */
        const validDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value)) || this.dateAdapter.today();
        this._activeDate = this.dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
        if (!this.hasSameMonthAndYear(oldActiveDate, this._activeDate)) {
            this.init();
        }
    }
    /**
     * The currently selected date.
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        this._selected = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        this.selectedDate = this.getDateInCurrentMonth(this._selected);
    }
    /**
     * The minimum selectable date.
     * @return {?}
     */
    get minDate() {
        return this._minDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set minDate(value) {
        this._minDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
    }
    /**
     * The maximum selectable date.
     * @return {?}
     */
    get maxDate() {
        return this._maxDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxDate(value) {
        this._maxDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.init();
    }
    /**
     * Handles when a new date is selected.
     * @param {?} date
     * @return {?}
     */
    dateSelected(date) {
        if (this.selectedDate !== date) {
            /** @type {?} */
            const selectedYear = this.dateAdapter.getYear(this.activeDate);
            /** @type {?} */
            const selectedMonth = this.dateAdapter.getMonth(this.activeDate);
            /** @type {?} */
            const selectedDate = this.dateAdapter.createDate(selectedYear, selectedMonth, date);
            this.selectedChange.emit(selectedDate);
        }
        this.userSelection.emit();
    }
    /**
     * Handles keydown events on the calendar body when calendar is in month view.
     * @param {?} event
     * @return {?}
     */
    handleCalendarBodyKeydown(event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        /** @type {?} */
        const oldActiveDate = this._activeDate;
        /** @type {?} */
        const isRtl = this.isRtl();
        // tslint:disable-next-line:deprecation
        switch (event.keyCode) {
            case LEFT_ARROW:
                this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, isRtl ? 1 : -1);
                break;
            case RIGHT_ARROW:
                this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, isRtl ? -1 : 1);
                break;
            case UP_ARROW:
                this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, -7);
                break;
            case DOWN_ARROW:
                this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, 7);
                break;
            case HOME:
                this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, 1 - this.dateAdapter.getDate(this._activeDate));
                break;
            case END:
                this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, (this.dateAdapter.getNumDaysInMonth(this._activeDate) -
                    this.dateAdapter.getDate(this._activeDate)));
                break;
            case PAGE_UP:
                this.activeDate = event.altKey ?
                    this.dateAdapter.addCalendarYears(this._activeDate, -1) :
                    this.dateAdapter.addCalendarMonths(this._activeDate, -1);
                break;
            case PAGE_DOWN:
                this.activeDate = event.altKey ?
                    this.dateAdapter.addCalendarYears(this._activeDate, 1) :
                    this.dateAdapter.addCalendarMonths(this._activeDate, 1);
                break;
            case ENTER:
            case SPACE:
                if (!this.dateFilter || this.dateFilter(this._activeDate)) {
                    this.dateSelected(this.dateAdapter.getDate(this._activeDate));
                    this.userSelection.emit();
                    // Prevent unexpected default actions such as form submission.
                    event.preventDefault();
                }
                return;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        if (this.dateAdapter.compareDate(oldActiveDate, this.activeDate)) {
            this.activeDateChange.emit(this.activeDate);
        }
        this.focusActiveCell();
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    }
    /**
     * Initializes this month view.
     * @return {?}
     */
    init() {
        this.selectedDate = this.getDateInCurrentMonth(this.selected);
        this.todayDate = this.getDateInCurrentMonth(this.dateAdapter.today());
        this.monthLabel =
            this.dateAdapter.getMonthNames('short')[this.dateAdapter.getMonth(this.activeDate)];
        this.monthLabel = this.monthLabel[0].toLocaleUpperCase() + this.monthLabel.substr(1);
        /** @type {?} */
        const firstOfMonth = this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), this.dateAdapter.getMonth(this.activeDate), 1);
        this.firstWeekOffset =
            (DAYS_PER_WEEK + this.dateAdapter.getDayOfWeek(firstOfMonth) -
                this.dateAdapter.getFirstDayOfWeek()) % DAYS_PER_WEEK;
        this.createWeekCells();
        this.changeDetectorRef.markForCheck();
    }
    /**
     * Focuses the active cell after the microtask queue is empty.
     * @return {?}
     */
    focusActiveCell() {
        this.mcCalendarBody.focusActiveCell();
    }
    /**
     * Creates McCalendarCells for the dates in this month.
     * @private
     * @return {?}
     */
    createWeekCells() {
        /** @type {?} */
        const daysInMonth = this.dateAdapter.getNumDaysInMonth(this.activeDate);
        /** @type {?} */
        const dateNames = this.dateAdapter.getDateNames();
        this.weeks = [[]];
        for (let i = 0, cell = this.firstWeekOffset; i < daysInMonth; i++, cell++) {
            if (cell === DAYS_PER_WEEK) {
                this.weeks.push([]);
                cell = 0;
            }
            /** @type {?} */
            const date = this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), this.dateAdapter.getMonth(this.activeDate), i + 1);
            /** @type {?} */
            const enabled = this.shouldEnableDate(date);
            /** @type {?} */
            const ariaLabel = this.dateAdapter.format(date, this.dateFormats.display.dateA11yLabel);
            /** @type {?} */
            const cellClasses = this.dateClass ? this.dateClass(date) : undefined;
            this.weeks[this.weeks.length - 1]
                .push(new McCalendarCell(i + 1, dateNames[i], ariaLabel, enabled, cellClasses));
        }
    }
    /**
     * Date filter for the month
     * @private
     * @param {?} date
     * @return {?}
     */
    shouldEnableDate(date) {
        return !!date &&
            (!this.dateFilter || this.dateFilter(date)) &&
            (!this.minDate || this.dateAdapter.compareDate(date, this.minDate) >= 0) &&
            (!this.maxDate || this.dateAdapter.compareDate(date, this.maxDate) <= 0);
    }
    /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     * @private
     * @param {?} date
     * @return {?}
     */
    getDateInCurrentMonth(date) {
        return date && this.hasSameMonthAndYear(date, this.activeDate) ?
            this.dateAdapter.getDate(date) : null;
    }
    /**
     * Checks whether the 2 dates are non-null and fall within the same month of the same year.
     * @private
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    hasSameMonthAndYear(d1, d2) {
        return !!(d1 && d2 && this.dateAdapter.getMonth(d1) === this.dateAdapter.getMonth(d2) &&
            this.dateAdapter.getYear(d1) === this.dateAdapter.getYear(d2));
    }
    /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    getValidDateOrNull(obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    }
    /**
     * Determines whether the user has the RTL layout direction.
     * @private
     * @return {?}
     */
    isRtl() {
        return this.dir && this.dir.value === 'rtl';
    }
}
McMonthView.decorators = [
    { type: Component, args: [{
                selector: 'mc-month-view',
                exportAs: 'mcMonthView',
                template: "<table class=\"mc-calendar__table\">\n    <thead class=\"mc-calendar__table-header\">\n    <tr>\n        <th *ngFor=\"let day of weekdays\" [attr.aria-label]=\"day.long\">{{day.narrow}}</th>\n    </tr>\n    <tr>\n        <th class=\"mc-calendar__table-header-divider\" colspan=\"7\" aria-hidden=\"true\"></th>\n    </tr>\n    </thead>\n    <tbody mc-calendar-body\n           [label]=\"monthLabel\"\n           [rows]=\"weeks\"\n           [todayValue]=\"todayDate\"\n           [selectedValue]=\"selectedDate\"\n           [labelMinRequiredCells]=\"3\"\n           [activeCell]=\"dateAdapter.getDate(activeDate) - 1\"\n           (selectedValueChange)=\"dateSelected($event)\"\n           (keydown)=\"handleCalendarBodyKeydown($event)\">\n    </tbody>\n</table>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
McMonthView.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_DATE_FORMATS,] }] },
    { type: DateAdapter, decorators: [{ type: Optional }] },
    { type: Directionality, decorators: [{ type: Optional }] }
];
McMonthView.propDecorators = {
    activeDate: [{ type: Input }],
    selected: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    dateFilter: [{ type: Input }],
    dateClass: [{ type: Input }],
    selectedChange: [{ type: Output }],
    userSelection: [{ type: Output }],
    activeDateChange: [{ type: Output }],
    mcCalendarBody: [{ type: ViewChild, args: [McCalendarBody, { static: false },] }]
};
if (false) {
    /**
     * Function used to filter which dates are selectable.
     * @type {?}
     */
    McMonthView.prototype.dateFilter;
    /**
     * Function that can be used to add custom CSS classes to dates.
     * @type {?}
     */
    McMonthView.prototype.dateClass;
    /**
     * Emits when a new date is selected.
     * @type {?}
     */
    McMonthView.prototype.selectedChange;
    /**
     * Emits when any date is selected.
     * @type {?}
     */
    McMonthView.prototype.userSelection;
    /**
     * Emits when any date is activated.
     * @type {?}
     */
    McMonthView.prototype.activeDateChange;
    /**
     * The body of calendar table
     * @type {?}
     */
    McMonthView.prototype.mcCalendarBody;
    /**
     * The label for this month (e.g. "January 2017").
     * @type {?}
     */
    McMonthView.prototype.monthLabel;
    /**
     * Grid of calendar cells representing the dates of the month.
     * @type {?}
     */
    McMonthView.prototype.weeks;
    /**
     * The number of blank cells in the first row before the 1st of the month.
     * @type {?}
     */
    McMonthView.prototype.firstWeekOffset;
    /**
     * The date of the month that the currently selected Date falls on.
     * Null if the currently selected Date is in another month.
     * @type {?}
     */
    McMonthView.prototype.selectedDate;
    /**
     * The date of the month that today falls on. Null if today is in another month.
     * @type {?}
     */
    McMonthView.prototype.todayDate;
    /**
     * The names of the weekdays.
     * @type {?}
     */
    McMonthView.prototype.weekdays;
    /**
     * @type {?}
     * @private
     */
    McMonthView.prototype._activeDate;
    /**
     * @type {?}
     * @private
     */
    McMonthView.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    McMonthView.prototype._minDate;
    /**
     * @type {?}
     * @private
     */
    McMonthView.prototype._maxDate;
    /**
     * @type {?}
     * @private
     */
    McMonthView.prototype.changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    McMonthView.prototype.dateFormats;
    /** @type {?} */
    McMonthView.prototype.dateAdapter;
    /**
     * @type {?}
     * @private
     */
    McMonthView.prototype.dir;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtdmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsibW9udGgtdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUVILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBQ04saUJBQWlCLEVBQ2pCLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBaUIsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RixPQUFPLEVBQ0gsVUFBVSxFQUNWLEdBQUcsRUFDSCxLQUFLLEVBQ0wsSUFBSSxFQUNKLFVBQVUsRUFDVixTQUFTLEVBQ1QsT0FBTyxFQUNQLFdBQVcsRUFDWCxRQUFRLEVBQ1IsS0FBSyxFQUNSLE1BQU0sMEJBQTBCLENBQUM7QUFFbEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQTRCLE1BQU0saUJBQWlCLENBQUM7QUFDM0YsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O01BRzNELGFBQWEsR0FBRyxDQUFDOzs7Ozs7QUFjdkIsTUFBTSxPQUFPLFdBQVc7Ozs7Ozs7SUE4RnBCLFlBQ1ksaUJBQW9DLEVBQ0MsV0FBMEIsRUFDcEQsV0FBMkIsRUFDMUIsR0FBb0I7UUFIaEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNDLGdCQUFXLEdBQVgsV0FBVyxDQUFlO1FBQ3BELGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUMxQixRQUFHLEdBQUgsR0FBRyxDQUFpQjs7OztRQXhDekIsbUJBQWMsR0FBMkIsSUFBSSxZQUFZLEVBQVksQ0FBQzs7OztRQUd0RSxrQkFBYSxHQUF1QixJQUFJ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QUcxQixzQ0FBd0I7Ozs7OztJQU14QixtQ0FBNEI7Ozs7O0lBRzVCLGdDQUF5Qjs7Ozs7SUFHekIsK0JBQTZDOzs7OztJQUM3QyxrQ0FBdUI7Ozs7O0lBQ3ZCLGdDQUE0Qjs7Ozs7SUFDNUIsK0JBQTJCOzs7OztJQUMzQiwrQkFBMkI7Ozs7O0lBR3ZCLHdDQUE0Qzs7Ozs7SUFDNUMsa0NBQXVFOztJQUN2RSxrQ0FBOEM7Ozs7O0lBQzlDLDBCQUF3QyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOm5vLW1hZ2ljLW51bWJlcnNcbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciwgTUNfREFURV9GT1JNQVRTLCBNY0RhdGVGb3JtYXRzIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2RhdGV0aW1lJztcbmltcG9ydCB7XG4gICAgRE9XTl9BUlJPVyxcbiAgICBFTkQsXG4gICAgRU5URVIsXG4gICAgSE9NRSxcbiAgICBMRUZUX0FSUk9XLFxuICAgIFBBR0VfRE9XTixcbiAgICBQQUdFX1VQLFxuICAgIFJJR0hUX0FSUk9XLFxuICAgIFVQX0FSUk9XLFxuICAgIFNQQUNFXG59IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5cbmltcG9ydCB7IE1jQ2FsZW5kYXJCb2R5LCBNY0NhbGVuZGFyQ2VsbCwgTWNDYWxlbmRhckNlbGxDc3NDbGFzc2VzIH0gZnJvbSAnLi9jYWxlbmRhci1ib2R5JztcbmltcG9ydCB7IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yIH0gZnJvbSAnLi9kYXRlcGlja2VyLWVycm9ycyc7XG5cblxuY29uc3QgREFZU19QRVJfV0VFSyA9IDc7XG5cblxuLyoqXG4gKiBBbiBpbnRlcm5hbCBjb21wb25lbnQgdXNlZCB0byBkaXNwbGF5IGEgc2luZ2xlIG1vbnRoIGluIHRoZSBkYXRlcGlja2VyLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLW1vbnRoLXZpZXcnLFxuICAgIGV4cG9ydEFzOiAnbWNNb250aFZpZXcnLFxuICAgIHRlbXBsYXRlVXJsOiAnbW9udGgtdmlldy5odG1sJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1jTW9udGhWaWV3PEQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgLyoqXG4gICAgICogVGhlIGRhdGUgdG8gZGlzcGxheSBpbiB0aGlzIG1vbnRoIHZpZXcgKGV2ZXJ5dGhpbmcgb3RoZXIgdGhhbiB0aGUgbW9udGggYW5kIHllYXIgaXMgaWdub3JlZCkuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgYWN0aXZlRGF0ZSgpOiBEIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZURhdGU7XG4gICAgfVxuXG4gICAgc2V0IGFjdGl2ZURhdGUodmFsdWU6IEQpIHtcbiAgICAgICAgY29uc3Qgb2xkQWN0aXZlRGF0ZSA9IHRoaXMuX2FjdGl2ZURhdGU7XG4gICAgICAgIGNvbnN0IHZhbGlkRGF0ZSA9XG4gICAgICAgICAgICB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSkgfHwgdGhpcy5kYXRlQWRhcHRlci50b2RheSgpO1xuICAgICAgICB0aGlzLl9hY3RpdmVEYXRlID0gdGhpcy5kYXRlQWRhcHRlci5jbGFtcERhdGUodmFsaWREYXRlLCB0aGlzLm1pbkRhdGUsIHRoaXMubWF4RGF0ZSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmhhc1NhbWVNb250aEFuZFllYXIob2xkQWN0aXZlRGF0ZSwgdGhpcy5fYWN0aXZlRGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RlZCgpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWQodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IHRoaXMuZ2V0RGF0ZUluQ3VycmVudE1vbnRoKHRoaXMuX3NlbGVjdGVkKTtcbiAgICB9XG5cbiAgICAvKiogVGhlIG1pbmltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1pbkRhdGUoKTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgbWluRGF0ZSh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbWluRGF0ZSA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcbiAgICB9XG5cbiAgICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1heERhdGUoKTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgbWF4RGF0ZSh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbWF4RGF0ZSA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcbiAgICB9XG5cbiAgICAvKiogRnVuY3Rpb24gdXNlZCB0byBmaWx0ZXIgd2hpY2ggZGF0ZXMgYXJlIHNlbGVjdGFibGUuICovXG4gICAgQElucHV0KCkgZGF0ZUZpbHRlcjogKGRhdGU6IEQpID0+IGJvb2xlYW47XG5cbiAgICAvKiogRnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBhZGQgY3VzdG9tIENTUyBjbGFzc2VzIHRvIGRhdGVzLiAqL1xuICAgIEBJbnB1dCgpIGRhdGVDbGFzczogKGRhdGU6IEQpID0+IE1jQ2FsZW5kYXJDZWxsQ3NzQ2xhc3NlcztcblxuICAgIC8qKiBFbWl0cyB3aGVuIGEgbmV3IGRhdGUgaXMgc2VsZWN0ZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RCB8IG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcjxEIHwgbnVsbD4oKTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIGFueSBkYXRlIGlzIHNlbGVjdGVkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSB1c2VyU2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAvKiogRW1pdHMgd2hlbiBhbnkgZGF0ZSBpcyBhY3RpdmF0ZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGFjdGl2ZURhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEPiA9IG5ldyBFdmVudEVtaXR0ZXI8RD4oKTtcblxuICAgIC8qKiBUaGUgYm9keSBvZiBjYWxlbmRhciB0YWJsZSAqL1xuICAgIEBWaWV3Q2hpbGQoTWNDYWxlbmRhckJvZHksIHtzdGF0aWM6IGZhbHNlfSkgbWNDYWxlbmRhckJvZHk6IE1jQ2FsZW5kYXJCb2R5O1xuXG4gICAgLyoqIFRoZSBsYWJlbCBmb3IgdGhpcyBtb250aCAoZS5nLiBcIkphbnVhcnkgMjAxN1wiKS4gKi9cbiAgICBtb250aExhYmVsOiBzdHJpbmc7XG5cbiAgICAvKiogR3JpZCBvZiBjYWxlbmRhciBjZWxscyByZXByZXNlbnRpbmcgdGhlIGRhdGVzIG9mIHRoZSBtb250aC4gKi9cbiAgICB3ZWVrczogTWNDYWxlbmRhckNlbGxbXVtdO1xuXG4gICAgLyoqIFRoZSBudW1iZXIgb2YgYmxhbmsgY2VsbHMgaW4gdGhlIGZpcnN0IHJvdyBiZWZvcmUgdGhlIDFzdCBvZiB0aGUgbW9udGguICovXG4gICAgZmlyc3RXZWVrT2Zmc2V0OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZGF0ZSBvZiB0aGUgbW9udGggdGhhdCB0aGUgY3VycmVudGx5IHNlbGVjdGVkIERhdGUgZmFsbHMgb24uXG4gICAgICogTnVsbCBpZiB0aGUgY3VycmVudGx5IHNlbGVjdGVkIERhdGUgaXMgaW4gYW5vdGhlciBtb250aC5cbiAgICAgKi9cbiAgICBzZWxlY3RlZERhdGU6IG51bWJlciB8IG51bGw7XG5cbiAgICAvKiogVGhlIGRhdGUgb2YgdGhlIG1vbnRoIHRoYXQgdG9kYXkgZmFsbHMgb24uIE51bGwgaWYgdG9kYXkgaXMgaW4gYW5vdGhlciBtb250aC4gKi9cbiAgICB0b2RheURhdGU6IG51bWJlciB8IG51bGw7XG5cbiAgICAvKiogVGhlIG5hbWVzIG9mIHRoZSB3ZWVrZGF5cy4gKi9cbiAgICB3ZWVrZGF5czogeyBsb25nOiBzdHJpbmc7IG5hcnJvdzogc3RyaW5nIH1bXTtcbiAgICBwcml2YXRlIF9hY3RpdmVEYXRlOiBEO1xuICAgIHByaXZhdGUgX3NlbGVjdGVkOiBEIHwgbnVsbDtcbiAgICBwcml2YXRlIF9taW5EYXRlOiBEIHwgbnVsbDtcbiAgICBwcml2YXRlIF9tYXhEYXRlOiBEIHwgbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQ19EQVRFX0ZPUk1BVFMpIHByaXZhdGUgZGF0ZUZvcm1hdHM6IE1jRGF0ZUZvcm1hdHMsXG4gICAgICAgIEBPcHRpb25hbCgpIHB1YmxpYyBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyPzogRGlyZWN0aW9uYWxpdHlcbiAgICApIHtcblxuICAgICAgICBpZiAoIXRoaXMuZGF0ZUFkYXB0ZXIpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdEYXRlQWRhcHRlcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmRhdGVGb3JtYXRzKSB7XG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcignTUNfREFURV9GT1JNQVRTJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaXJzdERheU9mV2VlayA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0Rmlyc3REYXlPZldlZWsoKTtcbiAgICAgICAgY29uc3QgbmFycm93V2Vla2RheXMgPSB0aGlzLmRhdGVBZGFwdGVyLmdldERheU9mV2Vla05hbWVzKCduYXJyb3cnKTtcbiAgICAgICAgY29uc3QgbG9uZ1dlZWtkYXlzID0gdGhpcy5kYXRlQWRhcHRlci5nZXREYXlPZldlZWtOYW1lcygnbG9uZycpO1xuXG4gICAgICAgIC8vIFJvdGF0ZSB0aGUgbGFiZWxzIGZvciBkYXlzIG9mIHRoZSB3ZWVrIGJhc2VkIG9uIHRoZSBjb25maWd1cmVkIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cbiAgICAgICAgY29uc3Qgd2Vla2RheXMgPSBsb25nV2Vla2RheXMubWFwKChsb25nLCBpKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4geyBsb25nLCBuYXJyb3c6IG5hcnJvd1dlZWtkYXlzW2ldIH07XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLndlZWtkYXlzID0gd2Vla2RheXMuc2xpY2UoZmlyc3REYXlPZldlZWspLmNvbmNhdCh3ZWVrZGF5cy5zbGljZSgwLCBmaXJzdERheU9mV2VlaykpO1xuXG4gICAgICAgIHRoaXMuX2FjdGl2ZURhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLnRvZGF5KCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyB3aGVuIGEgbmV3IGRhdGUgaXMgc2VsZWN0ZWQuICovXG4gICAgZGF0ZVNlbGVjdGVkKGRhdGU6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZERhdGUgIT09IGRhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkWWVhciA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLmFjdGl2ZURhdGUpO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRNb250aCA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5hY3RpdmVEYXRlKTtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkRGF0ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZShzZWxlY3RlZFllYXIsIHNlbGVjdGVkTW9udGgsIGRhdGUpO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQoc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXNlclNlbGVjdGlvbi5lbWl0KCk7XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMga2V5ZG93biBldmVudHMgb24gdGhlIGNhbGVuZGFyIGJvZHkgd2hlbiBjYWxlbmRhciBpcyBpbiBtb250aCB2aWV3LiAqL1xuICAgIGhhbmRsZUNhbGVuZGFyQm9keUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gVE9ETyhtbWFsZXJiYSk6IFdlIGN1cnJlbnRseSBhbGxvdyBrZXlib2FyZCBuYXZpZ2F0aW9uIHRvIGRpc2FibGVkIGRhdGVzLCBidXQganVzdCBwcmV2ZW50XG4gICAgICAgIC8vIGRpc2FibGVkIG9uZXMgZnJvbSBiZWluZyBzZWxlY3RlZC4gVGhpcyBtYXkgbm90IGJlIGlkZWFsLCB3ZSBzaG91bGQgbG9vayBpbnRvIHdoZXRoZXJcbiAgICAgICAgLy8gbmF2aWdhdGlvbiBzaG91bGQgc2tpcCBvdmVyIGRpc2FibGVkIGRhdGVzLCBhbmQgaWYgc28sIGhvdyB0byBpbXBsZW1lbnQgdGhhdCBlZmZpY2llbnRseS5cblxuICAgICAgICBjb25zdCBvbGRBY3RpdmVEYXRlID0gdGhpcy5fYWN0aXZlRGF0ZTtcbiAgICAgICAgY29uc3QgaXNSdGwgPSB0aGlzLmlzUnRsKCk7XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKHRoaXMuX2FjdGl2ZURhdGUsIGlzUnRsID8gMSA6IC0xKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUklHSFRfQVJST1c6XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5kYXRlQWRhcHRlci5hZGRDYWxlbmRhckRheXModGhpcy5fYWN0aXZlRGF0ZSwgaXNSdGwgPyAtMSA6IDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBVUF9BUlJPVzpcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyh0aGlzLl9hY3RpdmVEYXRlLCAtNyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5kYXRlQWRhcHRlci5hZGRDYWxlbmRhckRheXModGhpcy5fYWN0aXZlRGF0ZSwgNyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEhPTUU6XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5kYXRlQWRhcHRlci5hZGRDYWxlbmRhckRheXModGhpcy5fYWN0aXZlRGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgMSAtIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLl9hY3RpdmVEYXRlKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVORDpcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyh0aGlzLl9hY3RpdmVEYXRlLFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5kYXRlQWRhcHRlci5nZXROdW1EYXlzSW5Nb250aCh0aGlzLl9hY3RpdmVEYXRlKSAtXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldERhdGUodGhpcy5fYWN0aXZlRGF0ZSkpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUEFHRV9VUDpcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSBldmVudC5hbHRLZXkgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5fYWN0aXZlRGF0ZSwgLTEpIDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyh0aGlzLl9hY3RpdmVEYXRlLCAtMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBBR0VfRE9XTjpcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSBldmVudC5hbHRLZXkgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5fYWN0aXZlRGF0ZSwgMSkgOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKHRoaXMuX2FjdGl2ZURhdGUsIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFTlRFUjpcbiAgICAgICAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRhdGVGaWx0ZXIgfHwgdGhpcy5kYXRlRmlsdGVyKHRoaXMuX2FjdGl2ZURhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVNlbGVjdGVkKHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLl9hY3RpdmVEYXRlKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlclNlbGVjdGlvbi5lbWl0KCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgdW5leHBlY3RlZCBkZWZhdWx0IGFjdGlvbnMgc3VjaCBhcyBmb3JtIHN1Ym1pc3Npb24uXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvLyBEb24ndCBwcmV2ZW50IGRlZmF1bHQgb3IgZm9jdXMgYWN0aXZlIGNlbGwgb24ga2V5cyB0aGF0IHdlIGRvbid0IGV4cGxpY2l0bHkgaGFuZGxlLlxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRhdGVBZGFwdGVyLmNvbXBhcmVEYXRlKG9sZEFjdGl2ZURhdGUsIHRoaXMuYWN0aXZlRGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlRGF0ZUNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvY3VzQWN0aXZlQ2VsbCgpO1xuICAgICAgICAvLyBQcmV2ZW50IHVuZXhwZWN0ZWQgZGVmYXVsdCBhY3Rpb25zIHN1Y2ggYXMgZm9ybSBzdWJtaXNzaW9uLlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8qKiBJbml0aWFsaXplcyB0aGlzIG1vbnRoIHZpZXcuICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSB0aGlzLmdldERhdGVJbkN1cnJlbnRNb250aCh0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgdGhpcy50b2RheURhdGUgPSB0aGlzLmdldERhdGVJbkN1cnJlbnRNb250aCh0aGlzLmRhdGVBZGFwdGVyLnRvZGF5KCkpO1xuICAgICAgICB0aGlzLm1vbnRoTGFiZWwgPVxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRNb250aE5hbWVzKCdzaG9ydCcpW3RoaXMuZGF0ZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5hY3RpdmVEYXRlKV07XG5cbiAgICAgICAgdGhpcy5tb250aExhYmVsID0gdGhpcy5tb250aExhYmVsWzBdLnRvTG9jYWxlVXBwZXJDYXNlKCkgKyB0aGlzLm1vbnRoTGFiZWwuc3Vic3RyKDEpO1xuXG4gICAgICAgIGNvbnN0IGZpcnN0T2ZNb250aCA9IHRoaXMuZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZSh0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIodGhpcy5hY3RpdmVEYXRlKSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5hY3RpdmVEYXRlKSwgMSk7XG4gICAgICAgIHRoaXMuZmlyc3RXZWVrT2Zmc2V0ID1cbiAgICAgICAgICAgIChEQVlTX1BFUl9XRUVLICsgdGhpcy5kYXRlQWRhcHRlci5nZXREYXlPZldlZWsoZmlyc3RPZk1vbnRoKSAtXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRGaXJzdERheU9mV2VlaygpKSAlIERBWVNfUEVSX1dFRUs7XG5cbiAgICAgICAgdGhpcy5jcmVhdGVXZWVrQ2VsbHMoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICAvKiogRm9jdXNlcyB0aGUgYWN0aXZlIGNlbGwgYWZ0ZXIgdGhlIG1pY3JvdGFzayBxdWV1ZSBpcyBlbXB0eS4gKi9cbiAgICBmb2N1c0FjdGl2ZUNlbGwoKSB7XG4gICAgICAgIHRoaXMubWNDYWxlbmRhckJvZHkuZm9jdXNBY3RpdmVDZWxsKCk7XG4gICAgfVxuXG4gICAgLyoqIENyZWF0ZXMgTWNDYWxlbmRhckNlbGxzIGZvciB0aGUgZGF0ZXMgaW4gdGhpcyBtb250aC4gKi9cbiAgICBwcml2YXRlIGNyZWF0ZVdlZWtDZWxscygpIHtcbiAgICAgICAgY29uc3QgZGF5c0luTW9udGggPSB0aGlzLmRhdGVBZGFwdGVyLmdldE51bURheXNJbk1vbnRoKHRoaXMuYWN0aXZlRGF0ZSk7XG4gICAgICAgIGNvbnN0IGRhdGVOYW1lcyA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0RGF0ZU5hbWVzKCk7XG5cbiAgICAgICAgdGhpcy53ZWVrcyA9IFtbXV07XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGNlbGwgPSB0aGlzLmZpcnN0V2Vla09mZnNldDsgaSA8IGRheXNJbk1vbnRoOyBpKyssIGNlbGwrKykge1xuICAgICAgICAgICAgaWYgKGNlbGwgPT09IERBWVNfUEVSX1dFRUspIHtcbiAgICAgICAgICAgICAgICB0aGlzLndlZWtzLnB1c2goW10pO1xuICAgICAgICAgICAgICAgIGNlbGwgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZShcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIodGhpcy5hY3RpdmVEYXRlKSxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldE1vbnRoKHRoaXMuYWN0aXZlRGF0ZSksIGkgKyAxKTtcbiAgICAgICAgICAgIGNvbnN0IGVuYWJsZWQgPSB0aGlzLnNob3VsZEVuYWJsZURhdGUoZGF0ZSk7XG4gICAgICAgICAgICBjb25zdCBhcmlhTGFiZWwgPSB0aGlzLmRhdGVBZGFwdGVyLmZvcm1hdChkYXRlLCB0aGlzLmRhdGVGb3JtYXRzLmRpc3BsYXkuZGF0ZUExMXlMYWJlbCk7XG4gICAgICAgICAgICBjb25zdCBjZWxsQ2xhc3NlcyA9IHRoaXMuZGF0ZUNsYXNzID8gdGhpcy5kYXRlQ2xhc3MoZGF0ZSkgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIHRoaXMud2Vla3NbdGhpcy53ZWVrcy5sZW5ndGggLSAxXVxuICAgICAgICAgICAgICAgIC5wdXNoKG5ldyBNY0NhbGVuZGFyQ2VsbChpICsgMSwgZGF0ZU5hbWVzW2ldLCBhcmlhTGFiZWwsIGVuYWJsZWQsIGNlbGxDbGFzc2VzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRGF0ZSBmaWx0ZXIgZm9yIHRoZSBtb250aCAqL1xuICAgIHByaXZhdGUgc2hvdWxkRW5hYmxlRGF0ZShkYXRlOiBEKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIWRhdGUgJiZcbiAgICAgICAgICAgICghdGhpcy5kYXRlRmlsdGVyIHx8IHRoaXMuZGF0ZUZpbHRlcihkYXRlKSkgJiZcbiAgICAgICAgICAgICghdGhpcy5taW5EYXRlIHx8IHRoaXMuZGF0ZUFkYXB0ZXIuY29tcGFyZURhdGUoZGF0ZSwgdGhpcy5taW5EYXRlKSA+PSAwKSAmJlxuICAgICAgICAgICAgKCF0aGlzLm1heERhdGUgfHwgdGhpcy5kYXRlQWRhcHRlci5jb21wYXJlRGF0ZShkYXRlLCB0aGlzLm1heERhdGUpIDw9IDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGRhdGUgaW4gdGhpcyBtb250aCB0aGF0IHRoZSBnaXZlbiBEYXRlIGZhbGxzIG9uLlxuICAgICAqIFJldHVybnMgbnVsbCBpZiB0aGUgZ2l2ZW4gRGF0ZSBpcyBpbiBhbm90aGVyIG1vbnRoLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0RGF0ZUluQ3VycmVudE1vbnRoKGRhdGU6IEQgfCBudWxsKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiBkYXRlICYmIHRoaXMuaGFzU2FtZU1vbnRoQW5kWWVhcihkYXRlLCB0aGlzLmFjdGl2ZURhdGUpID9cbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0RGF0ZShkYXRlKSA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIHRoZSAyIGRhdGVzIGFyZSBub24tbnVsbCBhbmQgZmFsbCB3aXRoaW4gdGhlIHNhbWUgbW9udGggb2YgdGhlIHNhbWUgeWVhci4gKi9cbiAgICBwcml2YXRlIGhhc1NhbWVNb250aEFuZFllYXIoZDE6IEQgfCBudWxsLCBkMjogRCB8IG51bGwpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhKGQxICYmIGQyICYmIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TW9udGgoZDEpID09PSB0aGlzLmRhdGVBZGFwdGVyLmdldE1vbnRoKGQyKSAmJlxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKGQxKSA9PT0gdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKGQyKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIFRoZSBnaXZlbiBvYmplY3QgaWYgaXQgaXMgYm90aCBhIGRhdGUgaW5zdGFuY2UgYW5kIHZhbGlkLCBvdGhlcndpc2UgbnVsbC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFZhbGlkRGF0ZU9yTnVsbChvYmo6IGFueSk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmRhdGVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiYgdGhpcy5kYXRlQWRhcHRlci5pc1ZhbGlkKG9iaikpID8gb2JqIDogbnVsbDtcbiAgICB9XG5cbiAgICAvKiogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSB1c2VyIGhhcyB0aGUgUlRMIGxheW91dCBkaXJlY3Rpb24uICovXG4gICAgcHJpdmF0ZSBpc1J0bCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlyICYmIHRoaXMuZGlyLnZhbHVlID09PSAncnRsJztcbiAgICB9XG59XG4iXX0=