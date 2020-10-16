/**
 * @fileoverview added by tsickle
 * Generated from: month-view.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtdmlldy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL2RhdGVwaWNrZXIvIiwic291cmNlcyI6WyJtb250aC12aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFDTixpQkFBaUIsRUFDakIsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFpQixNQUFNLDBCQUEwQixDQUFDO0FBQ3ZGLE9BQU8sRUFDSCxVQUFVLEVBQ1YsR0FBRyxFQUNILEtBQUssRUFDTCxJQUFJLEVBQ0osVUFBVSxFQUNWLFNBQVMsRUFDVCxPQUFPLEVBQ1AsV0FBVyxFQUNYLFFBQVEsRUFDUixLQUFLLEVBQ1IsTUFBTSwwQkFBMEIsQ0FBQztBQUVsQyxPQUFPLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBNEIsTUFBTSxpQkFBaUIsQ0FBQztBQUMzRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7TUFHM0QsYUFBYSxHQUFHLENBQUM7Ozs7OztBQWN2QixNQUFNLE9BQU8sV0FBVzs7Ozs7OztJQThGcEIsWUFDWSxpQkFBb0MsRUFDQyxXQUEwQixFQUNwRCxXQUEyQixFQUMxQixHQUFvQjtRQUhoQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ0MsZ0JBQVcsR0FBWCxXQUFXLENBQWU7UUFDcEQsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQzFCLFFBQUcsR0FBSCxHQUFHLENBQWlCOzs7O1FBeEN6QixtQkFBYyxHQUEyQixJQUFJLFlBQVksRUFBWSxDQUFDOzs7O1FBR3RFLGtC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Qiw0QkFBMEI7Ozs7O0lBRzFCLHNDQUF3Qjs7Ozs7O0lBTXhCLG1DQUE0Qjs7Ozs7SUFHNUIsZ0NBQXlCOzs7OztJQUd6QiwrQkFBNkM7Ozs7O0lBQzdDLGtDQUF1Qjs7Ozs7SUFDdkIsZ0NBQTRCOzs7OztJQUM1QiwrQkFBMkI7Ozs7O0lBQzNCLCtCQUEyQjs7Ozs7SUFHdkIsd0NBQTRDOzs7OztJQUM1QyxrQ0FBdUU7O0lBQ3ZFLGtDQUE4Qzs7Ozs7SUFDOUMsMEJBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6bm8tbWFnaWMtbnVtYmVyc1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGVBZGFwdGVyLCBNQ19EQVRFX0ZPUk1BVFMsIE1jRGF0ZUZvcm1hdHMgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvZGF0ZXRpbWUnO1xuaW1wb3J0IHtcbiAgICBET1dOX0FSUk9XLFxuICAgIEVORCxcbiAgICBFTlRFUixcbiAgICBIT01FLFxuICAgIExFRlRfQVJST1csXG4gICAgUEFHRV9ET1dOLFxuICAgIFBBR0VfVVAsXG4gICAgUklHSFRfQVJST1csXG4gICAgVVBfQVJST1csXG4gICAgU1BBQ0Vcbn0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcblxuaW1wb3J0IHsgTWNDYWxlbmRhckJvZHksIE1jQ2FsZW5kYXJDZWxsLCBNY0NhbGVuZGFyQ2VsbENzc0NsYXNzZXMgfSBmcm9tICcuL2NhbGVuZGFyLWJvZHknO1xuaW1wb3J0IHsgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IgfSBmcm9tICcuL2RhdGVwaWNrZXItZXJyb3JzJztcblxuXG5jb25zdCBEQVlTX1BFUl9XRUVLID0gNztcblxuXG4vKipcbiAqIEFuIGludGVybmFsIGNvbXBvbmVudCB1c2VkIHRvIGRpc3BsYXkgYSBzaW5nbGUgbW9udGggaW4gdGhlIGRhdGVwaWNrZXIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtbW9udGgtdmlldycsXG4gICAgZXhwb3J0QXM6ICdtY01vbnRoVmlldycsXG4gICAgdGVtcGxhdGVVcmw6ICdtb250aC12aWV3Lmh0bWwnLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWNNb250aFZpZXc8RD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICAvKipcbiAgICAgKiBUaGUgZGF0ZSB0byBkaXNwbGF5IGluIHRoaXMgbW9udGggdmlldyAoZXZlcnl0aGluZyBvdGhlciB0aGFuIHRoZSBtb250aCBhbmQgeWVhciBpcyBpZ25vcmVkKS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBhY3RpdmVEYXRlKCk6IEQge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlRGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgYWN0aXZlRGF0ZSh2YWx1ZTogRCkge1xuICAgICAgICBjb25zdCBvbGRBY3RpdmVEYXRlID0gdGhpcy5fYWN0aXZlRGF0ZTtcbiAgICAgICAgY29uc3QgdmFsaWREYXRlID1cbiAgICAgICAgICAgIHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKSB8fCB0aGlzLmRhdGVBZGFwdGVyLnRvZGF5KCk7XG4gICAgICAgIHRoaXMuX2FjdGl2ZURhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLmNsYW1wRGF0ZSh2YWxpZERhdGUsIHRoaXMubWluRGF0ZSwgdGhpcy5tYXhEYXRlKTtcblxuICAgICAgICBpZiAoIXRoaXMuaGFzU2FtZU1vbnRoQW5kWWVhcihvbGRBY3RpdmVEYXRlLCB0aGlzLl9hY3RpdmVEYXRlKSkge1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNlbGVjdGVkKCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZCh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gdGhpcy5nZXREYXRlSW5DdXJyZW50TW9udGgodGhpcy5fc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgbWluRGF0ZSgpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9taW5EYXRlO1xuICAgIH1cblxuICAgIHNldCBtaW5EYXRlKHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9taW5EYXRlID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgbWF4aW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgbWF4RGF0ZSgpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhEYXRlO1xuICAgIH1cblxuICAgIHNldCBtYXhEYXRlKHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9tYXhEYXRlID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgIH1cblxuICAgIC8qKiBGdW5jdGlvbiB1c2VkIHRvIGZpbHRlciB3aGljaCBkYXRlcyBhcmUgc2VsZWN0YWJsZS4gKi9cbiAgICBASW5wdXQoKSBkYXRlRmlsdGVyOiAoZGF0ZTogRCkgPT4gYm9vbGVhbjtcblxuICAgIC8qKiBGdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGFkZCBjdXN0b20gQ1NTIGNsYXNzZXMgdG8gZGF0ZXMuICovXG4gICAgQElucHV0KCkgZGF0ZUNsYXNzOiAoZGF0ZTogRCkgPT4gTWNDYWxlbmRhckNlbGxDc3NDbGFzc2VzO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gYSBuZXcgZGF0ZSBpcyBzZWxlY3RlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0ZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEIHwgbnVsbD4gPSBuZXcgRXZlbnRFbWl0dGVyPEQgfCBudWxsPigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gYW55IGRhdGUgaXMgc2VsZWN0ZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHVzZXJTZWxlY3Rpb246IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIGFueSBkYXRlIGlzIGFjdGl2YXRlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgYWN0aXZlRGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPEQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEPigpO1xuXG4gICAgLyoqIFRoZSBib2R5IG9mIGNhbGVuZGFyIHRhYmxlICovXG4gICAgQFZpZXdDaGlsZChNY0NhbGVuZGFyQm9keSwge3N0YXRpYzogZmFsc2V9KSBtY0NhbGVuZGFyQm9keTogTWNDYWxlbmRhckJvZHk7XG5cbiAgICAvKiogVGhlIGxhYmVsIGZvciB0aGlzIG1vbnRoIChlLmcuIFwiSmFudWFyeSAyMDE3XCIpLiAqL1xuICAgIG1vbnRoTGFiZWw6IHN0cmluZztcblxuICAgIC8qKiBHcmlkIG9mIGNhbGVuZGFyIGNlbGxzIHJlcHJlc2VudGluZyB0aGUgZGF0ZXMgb2YgdGhlIG1vbnRoLiAqL1xuICAgIHdlZWtzOiBNY0NhbGVuZGFyQ2VsbFtdW107XG5cbiAgICAvKiogVGhlIG51bWJlciBvZiBibGFuayBjZWxscyBpbiB0aGUgZmlyc3Qgcm93IGJlZm9yZSB0aGUgMXN0IG9mIHRoZSBtb250aC4gKi9cbiAgICBmaXJzdFdlZWtPZmZzZXQ6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBkYXRlIG9mIHRoZSBtb250aCB0aGF0IHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgRGF0ZSBmYWxscyBvbi5cbiAgICAgKiBOdWxsIGlmIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgRGF0ZSBpcyBpbiBhbm90aGVyIG1vbnRoLlxuICAgICAqL1xuICAgIHNlbGVjdGVkRGF0ZTogbnVtYmVyIHwgbnVsbDtcblxuICAgIC8qKiBUaGUgZGF0ZSBvZiB0aGUgbW9udGggdGhhdCB0b2RheSBmYWxscyBvbi4gTnVsbCBpZiB0b2RheSBpcyBpbiBhbm90aGVyIG1vbnRoLiAqL1xuICAgIHRvZGF5RGF0ZTogbnVtYmVyIHwgbnVsbDtcblxuICAgIC8qKiBUaGUgbmFtZXMgb2YgdGhlIHdlZWtkYXlzLiAqL1xuICAgIHdlZWtkYXlzOiB7IGxvbmc6IHN0cmluZzsgbmFycm93OiBzdHJpbmcgfVtdO1xuICAgIHByaXZhdGUgX2FjdGl2ZURhdGU6IEQ7XG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IEQgfCBudWxsO1xuICAgIHByaXZhdGUgX21pbkRhdGU6IEQgfCBudWxsO1xuICAgIHByaXZhdGUgX21heERhdGU6IEQgfCBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1DX0RBVEVfRk9STUFUUykgcHJpdmF0ZSBkYXRlRm9ybWF0czogTWNEYXRlRm9ybWF0cyxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHVibGljIGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcjxEPixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXI/OiBEaXJlY3Rpb25hbGl0eVxuICAgICkge1xuXG4gICAgICAgIGlmICghdGhpcy5kYXRlQWRhcHRlcikge1xuICAgICAgICAgICAgdGhyb3cgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IoJ0RhdGVBZGFwdGVyJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuZGF0ZUZvcm1hdHMpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdNQ19EQVRFX0ZPUk1BVFMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpcnN0RGF5T2ZXZWVrID0gdGhpcy5kYXRlQWRhcHRlci5nZXRGaXJzdERheU9mV2VlaygpO1xuICAgICAgICBjb25zdCBuYXJyb3dXZWVrZGF5cyA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0RGF5T2ZXZWVrTmFtZXMoJ25hcnJvdycpO1xuICAgICAgICBjb25zdCBsb25nV2Vla2RheXMgPSB0aGlzLmRhdGVBZGFwdGVyLmdldERheU9mV2Vla05hbWVzKCdsb25nJyk7XG5cbiAgICAgICAgLy8gUm90YXRlIHRoZSBsYWJlbHMgZm9yIGRheXMgb2YgdGhlIHdlZWsgYmFzZWQgb24gdGhlIGNvbmZpZ3VyZWQgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxuICAgICAgICBjb25zdCB3ZWVrZGF5cyA9IGxvbmdXZWVrZGF5cy5tYXAoKGxvbmcsIGkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7IGxvbmcsIG5hcnJvdzogbmFycm93V2Vla2RheXNbaV0gfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMud2Vla2RheXMgPSB3ZWVrZGF5cy5zbGljZShmaXJzdERheU9mV2VlaykuY29uY2F0KHdlZWtkYXlzLnNsaWNlKDAsIGZpcnN0RGF5T2ZXZWVrKSk7XG5cbiAgICAgICAgdGhpcy5fYWN0aXZlRGF0ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIudG9kYXkoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIC8qKiBIYW5kbGVzIHdoZW4gYSBuZXcgZGF0ZSBpcyBzZWxlY3RlZC4gKi9cbiAgICBkYXRlU2VsZWN0ZWQoZGF0ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkRGF0ZSAhPT0gZGF0ZSkge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRZZWFyID0gdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSk7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZE1vbnRoID0gdGhpcy5kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLmFjdGl2ZURhdGUpO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWREYXRlID0gdGhpcy5kYXRlQWRhcHRlci5jcmVhdGVEYXRlKHNlbGVjdGVkWWVhciwgc2VsZWN0ZWRNb250aCwgZGF0ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChzZWxlY3RlZERhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51c2VyU2VsZWN0aW9uLmVtaXQoKTtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyBrZXlkb3duIGV2ZW50cyBvbiB0aGUgY2FsZW5kYXIgYm9keSB3aGVuIGNhbGVuZGFyIGlzIGluIG1vbnRoIHZpZXcuICovXG4gICAgaGFuZGxlQ2FsZW5kYXJCb2R5S2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICAvLyBUT0RPKG1tYWxlcmJhKTogV2UgY3VycmVudGx5IGFsbG93IGtleWJvYXJkIG5hdmlnYXRpb24gdG8gZGlzYWJsZWQgZGF0ZXMsIGJ1dCBqdXN0IHByZXZlbnRcbiAgICAgICAgLy8gZGlzYWJsZWQgb25lcyBmcm9tIGJlaW5nIHNlbGVjdGVkLiBUaGlzIG1heSBub3QgYmUgaWRlYWwsIHdlIHNob3VsZCBsb29rIGludG8gd2hldGhlclxuICAgICAgICAvLyBuYXZpZ2F0aW9uIHNob3VsZCBza2lwIG92ZXIgZGlzYWJsZWQgZGF0ZXMsIGFuZCBpZiBzbywgaG93IHRvIGltcGxlbWVudCB0aGF0IGVmZmljaWVudGx5LlxuXG4gICAgICAgIGNvbnN0IG9sZEFjdGl2ZURhdGUgPSB0aGlzLl9hY3RpdmVEYXRlO1xuICAgICAgICBjb25zdCBpc1J0bCA9IHRoaXMuaXNSdGwoKTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5kYXRlQWRhcHRlci5hZGRDYWxlbmRhckRheXModGhpcy5fYWN0aXZlRGF0ZSwgaXNSdGwgPyAxIDogLTEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyh0aGlzLl9hY3RpdmVEYXRlLCBpc1J0bCA/IC0xIDogMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFVQX0FSUk9XOlxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKHRoaXMuX2FjdGl2ZURhdGUsIC03KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRE9XTl9BUlJPVzpcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyh0aGlzLl9hY3RpdmVEYXRlLCA3KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgSE9NRTpcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyh0aGlzLl9hY3RpdmVEYXRlLFxuICAgICAgICAgICAgICAgICAgICAxIC0gdGhpcy5kYXRlQWRhcHRlci5nZXREYXRlKHRoaXMuX2FjdGl2ZURhdGUpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRU5EOlxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKHRoaXMuX2FjdGl2ZURhdGUsXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLmRhdGVBZGFwdGVyLmdldE51bURheXNJbk1vbnRoKHRoaXMuX2FjdGl2ZURhdGUpIC1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLl9hY3RpdmVEYXRlKSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQQUdFX1VQOlxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IGV2ZW50LmFsdEtleSA/XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyh0aGlzLl9hY3RpdmVEYXRlLCAtMSkgOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKHRoaXMuX2FjdGl2ZURhdGUsIC0xKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUEFHRV9ET1dOOlxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IGV2ZW50LmFsdEtleSA/XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyh0aGlzLl9hY3RpdmVEYXRlLCAxKSA6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHModGhpcy5fYWN0aXZlRGF0ZSwgMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVOVEVSOlxuICAgICAgICAgICAgY2FzZSBTUEFDRTpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZGF0ZUZpbHRlciB8fCB0aGlzLmRhdGVGaWx0ZXIodGhpcy5fYWN0aXZlRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlU2VsZWN0ZWQodGhpcy5kYXRlQWRhcHRlci5nZXREYXRlKHRoaXMuX2FjdGl2ZURhdGUpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyU2VsZWN0aW9uLmVtaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJldmVudCB1bmV4cGVjdGVkIGRlZmF1bHQgYWN0aW9ucyBzdWNoIGFzIGZvcm0gc3VibWlzc2lvbi5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vIERvbid0IHByZXZlbnQgZGVmYXVsdCBvciBmb2N1cyBhY3RpdmUgY2VsbCBvbiBrZXlzIHRoYXQgd2UgZG9uJ3QgZXhwbGljaXRseSBoYW5kbGUuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0ZUFkYXB0ZXIuY29tcGFyZURhdGUob2xkQWN0aXZlRGF0ZSwgdGhpcy5hY3RpdmVEYXRlKSkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVEYXRlQ2hhbmdlLmVtaXQodGhpcy5hY3RpdmVEYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9jdXNBY3RpdmVDZWxsKCk7XG4gICAgICAgIC8vIFByZXZlbnQgdW5leHBlY3RlZCBkZWZhdWx0IGFjdGlvbnMgc3VjaCBhcyBmb3JtIHN1Ym1pc3Npb24uXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgLyoqIEluaXRpYWxpemVzIHRoaXMgbW9udGggdmlldy4gKi9cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IHRoaXMuZ2V0RGF0ZUluQ3VycmVudE1vbnRoKHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICB0aGlzLnRvZGF5RGF0ZSA9IHRoaXMuZ2V0RGF0ZUluQ3VycmVudE1vbnRoKHRoaXMuZGF0ZUFkYXB0ZXIudG9kYXkoKSk7XG4gICAgICAgIHRoaXMubW9udGhMYWJlbCA9XG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldE1vbnRoTmFtZXMoJ3Nob3J0JylbdGhpcy5kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLmFjdGl2ZURhdGUpXTtcblxuICAgICAgICB0aGlzLm1vbnRoTGFiZWwgPSB0aGlzLm1vbnRoTGFiZWxbMF0udG9Mb2NhbGVVcHBlckNhc2UoKSArIHRoaXMubW9udGhMYWJlbC5zdWJzdHIoMSk7XG5cbiAgICAgICAgY29uc3QgZmlyc3RPZk1vbnRoID0gdGhpcy5kYXRlQWRhcHRlci5jcmVhdGVEYXRlKHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLmFjdGl2ZURhdGUpLFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLmFjdGl2ZURhdGUpLCAxKTtcbiAgICAgICAgdGhpcy5maXJzdFdlZWtPZmZzZXQgPVxuICAgICAgICAgICAgKERBWVNfUEVSX1dFRUsgKyB0aGlzLmRhdGVBZGFwdGVyLmdldERheU9mV2VlayhmaXJzdE9mTW9udGgpIC1cbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldEZpcnN0RGF5T2ZXZWVrKCkpICUgREFZU19QRVJfV0VFSztcblxuICAgICAgICB0aGlzLmNyZWF0ZVdlZWtDZWxscygpO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIC8qKiBGb2N1c2VzIHRoZSBhY3RpdmUgY2VsbCBhZnRlciB0aGUgbWljcm90YXNrIHF1ZXVlIGlzIGVtcHR5LiAqL1xuICAgIGZvY3VzQWN0aXZlQ2VsbCgpIHtcbiAgICAgICAgdGhpcy5tY0NhbGVuZGFyQm9keS5mb2N1c0FjdGl2ZUNlbGwoKTtcbiAgICB9XG5cbiAgICAvKiogQ3JlYXRlcyBNY0NhbGVuZGFyQ2VsbHMgZm9yIHRoZSBkYXRlcyBpbiB0aGlzIG1vbnRoLiAqL1xuICAgIHByaXZhdGUgY3JlYXRlV2Vla0NlbGxzKCkge1xuICAgICAgICBjb25zdCBkYXlzSW5Nb250aCA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TnVtRGF5c0luTW9udGgodGhpcy5hY3RpdmVEYXRlKTtcbiAgICAgICAgY29uc3QgZGF0ZU5hbWVzID0gdGhpcy5kYXRlQWRhcHRlci5nZXREYXRlTmFtZXMoKTtcblxuICAgICAgICB0aGlzLndlZWtzID0gW1tdXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgY2VsbCA9IHRoaXMuZmlyc3RXZWVrT2Zmc2V0OyBpIDwgZGF5c0luTW9udGg7IGkrKywgY2VsbCsrKSB7XG4gICAgICAgICAgICBpZiAoY2VsbCA9PT0gREFZU19QRVJfV0VFSykge1xuICAgICAgICAgICAgICAgIHRoaXMud2Vla3MucHVzaChbXSk7XG4gICAgICAgICAgICAgICAgY2VsbCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5kYXRlQWRhcHRlci5jcmVhdGVEYXRlKFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLmFjdGl2ZURhdGUpLFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5hY3RpdmVEYXRlKSwgaSArIDEpO1xuICAgICAgICAgICAgY29uc3QgZW5hYmxlZCA9IHRoaXMuc2hvdWxkRW5hYmxlRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIGNvbnN0IGFyaWFMYWJlbCA9IHRoaXMuZGF0ZUFkYXB0ZXIuZm9ybWF0KGRhdGUsIHRoaXMuZGF0ZUZvcm1hdHMuZGlzcGxheS5kYXRlQTExeUxhYmVsKTtcbiAgICAgICAgICAgIGNvbnN0IGNlbGxDbGFzc2VzID0gdGhpcy5kYXRlQ2xhc3MgPyB0aGlzLmRhdGVDbGFzcyhkYXRlKSA6IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgdGhpcy53ZWVrc1t0aGlzLndlZWtzLmxlbmd0aCAtIDFdXG4gICAgICAgICAgICAgICAgLnB1c2gobmV3IE1jQ2FsZW5kYXJDZWxsKGkgKyAxLCBkYXRlTmFtZXNbaV0sIGFyaWFMYWJlbCwgZW5hYmxlZCwgY2VsbENsYXNzZXMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBEYXRlIGZpbHRlciBmb3IgdGhlIG1vbnRoICovXG4gICAgcHJpdmF0ZSBzaG91bGRFbmFibGVEYXRlKGRhdGU6IEQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhZGF0ZSAmJlxuICAgICAgICAgICAgKCF0aGlzLmRhdGVGaWx0ZXIgfHwgdGhpcy5kYXRlRmlsdGVyKGRhdGUpKSAmJlxuICAgICAgICAgICAgKCF0aGlzLm1pbkRhdGUgfHwgdGhpcy5kYXRlQWRhcHRlci5jb21wYXJlRGF0ZShkYXRlLCB0aGlzLm1pbkRhdGUpID49IDApICYmXG4gICAgICAgICAgICAoIXRoaXMubWF4RGF0ZSB8fCB0aGlzLmRhdGVBZGFwdGVyLmNvbXBhcmVEYXRlKGRhdGUsIHRoaXMubWF4RGF0ZSkgPD0gMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZGF0ZSBpbiB0aGlzIG1vbnRoIHRoYXQgdGhlIGdpdmVuIERhdGUgZmFsbHMgb24uXG4gICAgICogUmV0dXJucyBudWxsIGlmIHRoZSBnaXZlbiBEYXRlIGlzIGluIGFub3RoZXIgbW9udGguXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXREYXRlSW5DdXJyZW50TW9udGgoZGF0ZTogRCB8IG51bGwpOiBudW1iZXIgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIGRhdGUgJiYgdGhpcy5oYXNTYW1lTW9udGhBbmRZZWFyKGRhdGUsIHRoaXMuYWN0aXZlRGF0ZSkgP1xuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXREYXRlKGRhdGUpIDogbnVsbDtcbiAgICB9XG5cbiAgICAvKiogQ2hlY2tzIHdoZXRoZXIgdGhlIDIgZGF0ZXMgYXJlIG5vbi1udWxsIGFuZCBmYWxsIHdpdGhpbiB0aGUgc2FtZSBtb250aCBvZiB0aGUgc2FtZSB5ZWFyLiAqL1xuICAgIHByaXZhdGUgaGFzU2FtZU1vbnRoQW5kWWVhcihkMTogRCB8IG51bGwsIGQyOiBEIHwgbnVsbCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISEoZDEgJiYgZDIgJiYgdGhpcy5kYXRlQWRhcHRlci5nZXRNb250aChkMSkgPT09IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TW9udGgoZDIpICYmXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIoZDEpID09PSB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIoZDIpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMgVGhlIGdpdmVuIG9iamVjdCBpZiBpdCBpcyBib3RoIGEgZGF0ZSBpbnN0YW5jZSBhbmQgdmFsaWQsIG90aGVyd2lzZSBudWxsLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0VmFsaWREYXRlT3JOdWxsKG9iajogYW55KTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gKHRoaXMuZGF0ZUFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJiB0aGlzLmRhdGVBZGFwdGVyLmlzVmFsaWQob2JqKSkgPyBvYmogOiBudWxsO1xuICAgIH1cblxuICAgIC8qKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHVzZXIgaGFzIHRoZSBSVEwgbGF5b3V0IGRpcmVjdGlvbi4gKi9cbiAgICBwcml2YXRlIGlzUnRsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXIgJiYgdGhpcy5kaXIudmFsdWUgPT09ICdydGwnO1xuICAgIH1cbn1cbiJdfQ==