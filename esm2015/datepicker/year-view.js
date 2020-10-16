/**
 * @fileoverview added by tsickle
 * Generated from: year-view.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { DateAdapter, MC_DATE_FORMATS } from '@ptsecurity/cdk/datetime';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW, SPACE } from '@ptsecurity/cdk/keycodes';
import { McCalendarBody, McCalendarCell } from './calendar-body';
import { createMissingDateImplError } from './datepicker-errors';
/**
 * An internal component used to display a single year in the datepicker.
 * \@docs-private
 * @template D
 */
export class McYearView {
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
         * Emits when a new month is selected.
         */
        this.selectedChange = new EventEmitter();
        /**
         * Emits the selected month. This doesn't imply a change on the selected date
         */
        this.monthSelected = new EventEmitter();
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
        this._activeDate = this.dateAdapter.today();
    }
    /**
     * The date to display in this year view (everything other than the year is ignored).
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
        if (this.dateAdapter.getYear(oldActiveDate) !== this.dateAdapter.getYear(this._activeDate)) {
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
        this.selectedMonth = this.getMonthInCurrentYear(this._selected);
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
     * Handles when a new month is selected.
     * @param {?} month
     * @return {?}
     */
    onMonthSelected(month) {
        /** @type {?} */
        const normalizedDate = this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), month, 1);
        this.monthSelected.emit(normalizedDate);
        /** @type {?} */
        const daysInMonth = this.dateAdapter.getNumDaysInMonth(normalizedDate);
        this.selectedChange.emit(this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), month, Math.min(this.dateAdapter.getDate(this.activeDate), daysInMonth)));
    }
    /**
     * Handles keydown events on the calendar body when calendar is in year view.
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
        /** @type {?} */
        const VERTICAL_SHIFT = 4;
        /** @type {?} */
        const PAGE_SHIFT = 10;
        /** @type {?} */
        const MAX_MONTH_INDEX = 11;
        // tslint:disable-next-line:deprecation
        switch (event.keyCode) {
            case LEFT_ARROW:
                this.activeDate = this.dateAdapter.addCalendarMonths(this._activeDate, isRtl ? 1 : -1);
                break;
            case RIGHT_ARROW:
                this.activeDate = this.dateAdapter.addCalendarMonths(this._activeDate, isRtl ? -1 : 1);
                break;
            case UP_ARROW:
                this.activeDate = this.dateAdapter.addCalendarMonths(this._activeDate, -VERTICAL_SHIFT);
                break;
            case DOWN_ARROW:
                this.activeDate = this.dateAdapter.addCalendarMonths(this._activeDate, VERTICAL_SHIFT);
                break;
            case HOME:
                this.activeDate = this.dateAdapter.addCalendarMonths(this._activeDate, -this.dateAdapter.getMonth(this._activeDate));
                break;
            case END:
                this.activeDate = this.dateAdapter.addCalendarMonths(this._activeDate, MAX_MONTH_INDEX - this.dateAdapter.getMonth(this._activeDate));
                break;
            case PAGE_UP:
                this.activeDate =
                    this.dateAdapter.addCalendarYears(this._activeDate, event.altKey ? -PAGE_SHIFT : -1);
                break;
            case PAGE_DOWN:
                this.activeDate =
                    this.dateAdapter.addCalendarYears(this._activeDate, event.altKey ? PAGE_SHIFT : 1);
                break;
            case ENTER:
            case SPACE:
                this.onMonthSelected(this.dateAdapter.getMonth(this._activeDate));
                break;
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
     * Initializes this year view.
     * @return {?}
     */
    init() {
        this.selectedMonth = this.getMonthInCurrentYear(this.selected);
        this.todayMonth = this.getMonthInCurrentYear(this.dateAdapter.today());
        this.yearLabel = this.dateAdapter.getYearName(this.activeDate);
        /** @type {?} */
        const monthNames = this.dateAdapter.getMonthNames('short');
        // First row of months only contains 5 elements so we can fit the year label on the same row.
        // tslint:disable-next-line:no-magic-numbers
        this.months = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]].map((/**
         * @param {?} row
         * @return {?}
         */
        (row) => row.map((/**
         * @param {?} month
         * @return {?}
         */
        (month) => this.createCellForMonth(month, monthNames[month])))));
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
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     * @private
     * @param {?} date
     * @return {?}
     */
    getMonthInCurrentYear(date) {
        return date && this.dateAdapter.getYear(date) === this.dateAdapter.getYear(this.activeDate) ?
            this.dateAdapter.getMonth(date) : null;
    }
    /**
     * Creates an McCalendarCell for the given month.
     * @private
     * @param {?} month
     * @param {?} monthName
     * @return {?}
     */
    createCellForMonth(month, monthName) {
        /** @type {?} */
        const ariaLabel = this.dateAdapter.format(this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), month, 1), this.dateFormats.display.monthYearA11yLabel);
        /** @type {?} */
        const newMonthName = monthName[0].toLocaleUpperCase() + monthName.substr(1);
        return new McCalendarCell(month, newMonthName, ariaLabel, this.shouldEnableMonth(month));
    }
    /**
     * Whether the given month is enabled.
     * @private
     * @param {?} month
     * @return {?}
     */
    shouldEnableMonth(month) {
        /** @type {?} */
        const activeYear = this.dateAdapter.getYear(this.activeDate);
        if (month === undefined || month === null ||
            this.isYearAndMonthAfterMaxDate(activeYear, month) ||
            this.isYearAndMonthBeforeMinDate(activeYear, month)) {
            return false;
        }
        if (!this.dateFilter) {
            return true;
        }
        /** @type {?} */
        const firstOfMonth = this.dateAdapter.createDate(activeYear, month, 1);
        // If any date in the month is enabled count the month as enabled.
        for (let date = firstOfMonth; this.dateAdapter.getMonth(date) === month; date = this.dateAdapter.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Tests whether the combination month/year is after this.maxDate, considering
     * just the month and year of this.maxDate
     * @private
     * @param {?} year
     * @param {?} month
     * @return {?}
     */
    isYearAndMonthAfterMaxDate(year, month) {
        if (this.maxDate) {
            /** @type {?} */
            const maxYear = this.dateAdapter.getYear(this.maxDate);
            /** @type {?} */
            const maxMonth = this.dateAdapter.getMonth(this.maxDate);
            return year > maxYear || (year === maxYear && month > maxMonth);
        }
        return false;
    }
    /**
     * Tests whether the combination month/year is before this.minDate, considering
     * just the month and year of this.minDate
     * @private
     * @param {?} year
     * @param {?} month
     * @return {?}
     */
    isYearAndMonthBeforeMinDate(year, month) {
        if (this.minDate) {
            /** @type {?} */
            const minYear = this.dateAdapter.getYear(this.minDate);
            /** @type {?} */
            const minMonth = this.dateAdapter.getMonth(this.minDate);
            return year < minYear || (year === minYear && month < minMonth);
        }
        return false;
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
McYearView.decorators = [
    { type: Component, args: [{
                selector: 'mc-year-view',
                exportAs: 'mcYearView',
                template: "<table class=\"mc-calendar__table\">\n    <thead class=\"mc-calendar__table-header\">\n    <tr>\n        <th class=\"mc-calendar__table-header-divider\" colspan=\"4\"></th>\n    </tr>\n    </thead>\n    <tbody mc-calendar-body\n           [label]=\"yearLabel\"\n           [rows]=\"months\"\n           [todayValue]=\"todayMonth\"\n           [selectedValue]=\"selectedMonth\"\n           [labelMinRequiredCells]=\"2\"\n           [numCols]=\"4\"\n           [cellAspectRatio]=\"4 / 7\"\n           [activeCell]=\"dateAdapter.getMonth(activeDate)\"\n           (selectedValueChange)=\"onMonthSelected($event)\"\n           (keydown)=\"handleCalendarBodyKeydown($event)\">\n    </tbody>\n</table>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
McYearView.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_DATE_FORMATS,] }] },
    { type: DateAdapter, decorators: [{ type: Optional }] },
    { type: Directionality, decorators: [{ type: Optional }] }
];
McYearView.propDecorators = {
    activeDate: [{ type: Input }],
    selected: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    dateFilter: [{ type: Input }],
    selectedChange: [{ type: Output }],
    monthSelected: [{ type: Output }],
    activeDateChange: [{ type: Output }],
    mcCalendarBody: [{ type: ViewChild, args: [McCalendarBody, { static: false },] }]
};
if (false) {
    /**
     * A function used to filter which dates are selectable.
     * @type {?}
     */
    McYearView.prototype.dateFilter;
    /**
     * Emits when a new month is selected.
     * @type {?}
     */
    McYearView.prototype.selectedChange;
    /**
     * Emits the selected month. This doesn't imply a change on the selected date
     * @type {?}
     */
    McYearView.prototype.monthSelected;
    /**
     * Emits when any date is activated.
     * @type {?}
     */
    McYearView.prototype.activeDateChange;
    /**
     * The body of calendar table
     * @type {?}
     */
    McYearView.prototype.mcCalendarBody;
    /**
     * Grid of calendar cells representing the months of the year.
     * @type {?}
     */
    McYearView.prototype.months;
    /**
     * The label for this year (e.g. "2017").
     * @type {?}
     */
    McYearView.prototype.yearLabel;
    /**
     * The month in this year that today falls on. Null if today is in a different year.
     * @type {?}
     */
    McYearView.prototype.todayMonth;
    /**
     * The month in this year that the selected Date falls on.
     * Null if the selected Date is in a different year.
     * @type {?}
     */
    McYearView.prototype.selectedMonth;
    /**
     * @type {?}
     * @private
     */
    McYearView.prototype._activeDate;
    /**
     * @type {?}
     * @private
     */
    McYearView.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    McYearView.prototype._minDate;
    /**
     * @type {?}
     * @private
     */
    McYearView.prototype._maxDate;
    /**
     * @type {?}
     * @private
     */
    McYearView.prototype.changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    McYearView.prototype.dateFormats;
    /** @type {?} */
    McYearView.prototype.dateAdapter;
    /**
     * @type {?}
     * @private
     */
    McYearView.prototype.dir;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci12aWV3LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbInllYXItdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFpQixNQUFNLDBCQUEwQixDQUFDO0FBQ3ZGLE9BQU8sRUFDSCxVQUFVLEVBQ1YsR0FBRyxFQUNILEtBQUssRUFDTCxJQUFJLEVBQ0osVUFBVSxFQUNWLFNBQVMsRUFDVCxPQUFPLEVBQ1AsV0FBVyxFQUNYLFFBQVEsRUFDUixLQUFLLEVBQ1IsTUFBTSwwQkFBMEIsQ0FBQztBQUVsQyxPQUFPLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7QUFjakUsTUFBTSxPQUFPLFVBQVU7Ozs7Ozs7SUFtRm5CLFlBQ1ksaUJBQW9DLEVBQ0MsV0FBMEIsRUFDcEQsV0FBMkIsRUFDMUIsR0FBb0I7UUFIaEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNDLGdCQUFXLEdBQVgsV0FBVyxDQUFlO1FBQ3BELGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUMxQixRQUFHLEdBQUgsR0FBRyxDQUFpQjs7OztRQWxDekIsbUJBQWMsR0FBb0IsSUFBSSxZQUFZLEVBQUssQ0FBQzs7OztRQUd4RCxrQkFBYSxHQUFvQixJQUFJLFlBQVksRUFBSyxD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SFosUUFBUSxZQUFJLE1BQU0sU0FBQyxlQUFlO1lBbEhsQyxXQUFXLHVCQW1IWCxRQUFRO1lBaklSLGNBQWMsdUJBa0lkLFFBQVE7Ozt5QkFyRlosS0FBSzt1QkFpQkwsS0FBSztzQkFXTCxLQUFLO3NCQVVMLEtBQUs7eUJBVUwsS0FBSzs2QkFHTCxNQUFNOzRCQUdOLE1BQU07K0JBR04sTUFBTTs2QkFHTixTQUFTLFNBQUMsY0FBYyxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQzs7Ozs7OztJQVoxQyxnQ0FBMEM7Ozs7O0lBRzFDLG9DQUEyRTs7Ozs7SUFHM0UsbUNBQTBFOzs7OztJQUcxRSxzQ0FBNkU7Ozs7O0lBRzdFLG9DQUEyRTs7Ozs7SUFHM0UsNEJBQTJCOzs7OztJQUczQiwrQkFBa0I7Ozs7O0lBR2xCLGdDQUEwQjs7Ozs7O0lBTTFCLG1DQUE2Qjs7Ozs7SUFDN0IsaUNBQXVCOzs7OztJQUN2QiwrQkFBNEI7Ozs7O0lBQzVCLDhCQUEyQjs7Ozs7SUFDM0IsOEJBQTJCOzs7OztJQUd2Qix1Q0FBNEM7Ozs7O0lBQzVDLGlDQUF1RTs7SUFDdkUsaUNBQThDOzs7OztJQUM5Qyx5QkFBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIsIE1DX0RBVEVfRk9STUFUUywgTWNEYXRlRm9ybWF0cyB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9kYXRldGltZSc7XG5pbXBvcnQge1xuICAgIERPV05fQVJST1csXG4gICAgRU5ELFxuICAgIEVOVEVSLFxuICAgIEhPTUUsXG4gICAgTEVGVF9BUlJPVyxcbiAgICBQQUdFX0RPV04sXG4gICAgUEFHRV9VUCxcbiAgICBSSUdIVF9BUlJPVyxcbiAgICBVUF9BUlJPVyxcbiAgICBTUEFDRVxufSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuXG5pbXBvcnQgeyBNY0NhbGVuZGFyQm9keSwgTWNDYWxlbmRhckNlbGwgfSBmcm9tICcuL2NhbGVuZGFyLWJvZHknO1xuaW1wb3J0IHsgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IgfSBmcm9tICcuL2RhdGVwaWNrZXItZXJyb3JzJztcblxuXG4vKipcbiAqIEFuIGludGVybmFsIGNvbXBvbmVudCB1c2VkIHRvIGRpc3BsYXkgYSBzaW5nbGUgeWVhciBpbiB0aGUgZGF0ZXBpY2tlci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy15ZWFyLXZpZXcnLFxuICAgIGV4cG9ydEFzOiAnbWNZZWFyVmlldycsXG4gICAgdGVtcGxhdGVVcmw6ICd5ZWFyLXZpZXcuaHRtbCcsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY1llYXJWaWV3PEQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgLyoqIFRoZSBkYXRlIHRvIGRpc3BsYXkgaW4gdGhpcyB5ZWFyIHZpZXcgKGV2ZXJ5dGhpbmcgb3RoZXIgdGhhbiB0aGUgeWVhciBpcyBpZ25vcmVkKS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBhY3RpdmVEYXRlKCk6IEQge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlRGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgYWN0aXZlRGF0ZSh2YWx1ZTogRCkge1xuICAgICAgICBjb25zdCBvbGRBY3RpdmVEYXRlID0gdGhpcy5fYWN0aXZlRGF0ZTtcbiAgICAgICAgY29uc3QgdmFsaWREYXRlID1cbiAgICAgICAgICAgIHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKSB8fCB0aGlzLmRhdGVBZGFwdGVyLnRvZGF5KCk7XG4gICAgICAgIHRoaXMuX2FjdGl2ZURhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLmNsYW1wRGF0ZSh2YWxpZERhdGUsIHRoaXMubWluRGF0ZSwgdGhpcy5tYXhEYXRlKTtcblxuICAgICAgICBpZiAodGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKG9sZEFjdGl2ZURhdGUpICE9PSB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIodGhpcy5fYWN0aXZlRGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RlZCgpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWQodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkTW9udGggPSB0aGlzLmdldE1vbnRoSW5DdXJyZW50WWVhcih0aGlzLl9zZWxlY3RlZCk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBtaW5pbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBtaW5EYXRlKCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbkRhdGU7XG4gICAgfVxuXG4gICAgc2V0IG1pbkRhdGUodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX21pbkRhdGUgPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBtYXhpbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBtYXhEYXRlKCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heERhdGU7XG4gICAgfVxuXG4gICAgc2V0IG1heERhdGUodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX21heERhdGUgPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XG4gICAgfVxuXG4gICAgLyoqIEEgZnVuY3Rpb24gdXNlZCB0byBmaWx0ZXIgd2hpY2ggZGF0ZXMgYXJlIHNlbGVjdGFibGUuICovXG4gICAgQElucHV0KCkgZGF0ZUZpbHRlcjogKGRhdGU6IEQpID0+IGJvb2xlYW47XG5cbiAgICAvKiogRW1pdHMgd2hlbiBhIG5ldyBtb250aCBpcyBzZWxlY3RlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0ZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEPiA9IG5ldyBFdmVudEVtaXR0ZXI8RD4oKTtcblxuICAgIC8qKiBFbWl0cyB0aGUgc2VsZWN0ZWQgbW9udGguIFRoaXMgZG9lc24ndCBpbXBseSBhIGNoYW5nZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZSAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBtb250aFNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8RD4gPSBuZXcgRXZlbnRFbWl0dGVyPEQ+KCk7XG5cbiAgICAvKiogRW1pdHMgd2hlbiBhbnkgZGF0ZSBpcyBhY3RpdmF0ZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGFjdGl2ZURhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEPiA9IG5ldyBFdmVudEVtaXR0ZXI8RD4oKTtcblxuICAgIC8qKiBUaGUgYm9keSBvZiBjYWxlbmRhciB0YWJsZSAqL1xuICAgIEBWaWV3Q2hpbGQoTWNDYWxlbmRhckJvZHksIHtzdGF0aWM6IGZhbHNlfSkgbWNDYWxlbmRhckJvZHk6IE1jQ2FsZW5kYXJCb2R5O1xuXG4gICAgLyoqIEdyaWQgb2YgY2FsZW5kYXIgY2VsbHMgcmVwcmVzZW50aW5nIHRoZSBtb250aHMgb2YgdGhlIHllYXIuICovXG4gICAgbW9udGhzOiBNY0NhbGVuZGFyQ2VsbFtdW107XG5cbiAgICAvKiogVGhlIGxhYmVsIGZvciB0aGlzIHllYXIgKGUuZy4gXCIyMDE3XCIpLiAqL1xuICAgIHllYXJMYWJlbDogc3RyaW5nO1xuXG4gICAgLyoqIFRoZSBtb250aCBpbiB0aGlzIHllYXIgdGhhdCB0b2RheSBmYWxscyBvbi4gTnVsbCBpZiB0b2RheSBpcyBpbiBhIGRpZmZlcmVudCB5ZWFyLiAqL1xuICAgIHRvZGF5TW9udGg6IG51bWJlciB8IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbW9udGggaW4gdGhpcyB5ZWFyIHRoYXQgdGhlIHNlbGVjdGVkIERhdGUgZmFsbHMgb24uXG4gICAgICogTnVsbCBpZiB0aGUgc2VsZWN0ZWQgRGF0ZSBpcyBpbiBhIGRpZmZlcmVudCB5ZWFyLlxuICAgICAqL1xuICAgIHNlbGVjdGVkTW9udGg6IG51bWJlciB8IG51bGw7XG4gICAgcHJpdmF0ZSBfYWN0aXZlRGF0ZTogRDtcbiAgICBwcml2YXRlIF9zZWxlY3RlZDogRCB8IG51bGw7XG4gICAgcHJpdmF0ZSBfbWluRGF0ZTogRCB8IG51bGw7XG4gICAgcHJpdmF0ZSBfbWF4RGF0ZTogRCB8IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfREFURV9GT1JNQVRTKSBwcml2YXRlIGRhdGVGb3JtYXRzOiBNY0RhdGVGb3JtYXRzLFxuICAgICAgICBAT3B0aW9uYWwoKSBwdWJsaWMgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcj86IERpcmVjdGlvbmFsaXR5XG4gICAgKSB7XG4gICAgICAgIGlmICghdGhpcy5kYXRlQWRhcHRlcikge1xuICAgICAgICAgICAgdGhyb3cgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IoJ0RhdGVBZGFwdGVyJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuZGF0ZUZvcm1hdHMpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdNQ19EQVRFX0ZPUk1BVFMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2FjdGl2ZURhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLnRvZGF5KCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyB3aGVuIGEgbmV3IG1vbnRoIGlzIHNlbGVjdGVkLiAqL1xuICAgIG9uTW9udGhTZWxlY3RlZChtb250aDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWREYXRlID1cbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZSh0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIodGhpcy5hY3RpdmVEYXRlKSwgbW9udGgsIDEpO1xuXG4gICAgICAgIHRoaXMubW9udGhTZWxlY3RlZC5lbWl0KG5vcm1hbGl6ZWREYXRlKTtcblxuICAgICAgICBjb25zdCBkYXlzSW5Nb250aCA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TnVtRGF5c0luTW9udGgobm9ybWFsaXplZERhdGUpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCh0aGlzLmRhdGVBZGFwdGVyLmNyZWF0ZURhdGUoXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIodGhpcy5hY3RpdmVEYXRlKSwgbW9udGgsXG4gICAgICAgICAgICBNYXRoLm1pbih0aGlzLmRhdGVBZGFwdGVyLmdldERhdGUodGhpcy5hY3RpdmVEYXRlKSwgZGF5c0luTW9udGgpKSk7XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMga2V5ZG93biBldmVudHMgb24gdGhlIGNhbGVuZGFyIGJvZHkgd2hlbiBjYWxlbmRhciBpcyBpbiB5ZWFyIHZpZXcuICovXG4gICAgaGFuZGxlQ2FsZW5kYXJCb2R5S2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICAvLyBUT0RPKG1tYWxlcmJhKTogV2UgY3VycmVudGx5IGFsbG93IGtleWJvYXJkIG5hdmlnYXRpb24gdG8gZGlzYWJsZWQgZGF0ZXMsIGJ1dCBqdXN0IHByZXZlbnRcbiAgICAgICAgLy8gZGlzYWJsZWQgb25lcyBmcm9tIGJlaW5nIHNlbGVjdGVkLiBUaGlzIG1heSBub3QgYmUgaWRlYWwsIHdlIHNob3VsZCBsb29rIGludG8gd2hldGhlclxuICAgICAgICAvLyBuYXZpZ2F0aW9uIHNob3VsZCBza2lwIG92ZXIgZGlzYWJsZWQgZGF0ZXMsIGFuZCBpZiBzbywgaG93IHRvIGltcGxlbWVudCB0aGF0IGVmZmljaWVudGx5LlxuXG4gICAgICAgIGNvbnN0IG9sZEFjdGl2ZURhdGUgPSB0aGlzLl9hY3RpdmVEYXRlO1xuICAgICAgICBjb25zdCBpc1J0bCA9IHRoaXMuaXNSdGwoKTtcblxuICAgICAgICBjb25zdCBWRVJUSUNBTF9TSElGVCA9IDQ7XG4gICAgICAgIGNvbnN0IFBBR0VfU0hJRlQgPSAxMDtcbiAgICAgICAgY29uc3QgTUFYX01PTlRIX0lOREVYID0gMTE7XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHModGhpcy5fYWN0aXZlRGF0ZSwgaXNSdGwgPyAxIDogLTEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKHRoaXMuX2FjdGl2ZURhdGUsIGlzUnRsID8gLTEgOiAxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5kYXRlQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyh0aGlzLl9hY3RpdmVEYXRlLCAtVkVSVElDQUxfU0hJRlQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHModGhpcy5fYWN0aXZlRGF0ZSwgVkVSVElDQUxfU0hJRlQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBIT01FOlxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHModGhpcy5fYWN0aXZlRGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgLXRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5fYWN0aXZlRGF0ZSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFTkQ6XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5kYXRlQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyh0aGlzLl9hY3RpdmVEYXRlLFxuICAgICAgICAgICAgICAgICAgICBNQVhfTU9OVEhfSU5ERVggLSB0aGlzLmRhdGVBZGFwdGVyLmdldE1vbnRoKHRoaXMuX2FjdGl2ZURhdGUpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUEFHRV9VUDpcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5fYWN0aXZlRGF0ZSwgZXZlbnQuYWx0S2V5ID8gLVBBR0VfU0hJRlQgOiAtMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBBR0VfRE9XTjpcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5fYWN0aXZlRGF0ZSwgZXZlbnQuYWx0S2V5ID8gUEFHRV9TSElGVCA6IDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFTlRFUjpcbiAgICAgICAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vbnRoU2VsZWN0ZWQodGhpcy5kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLl9hY3RpdmVEYXRlKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vIERvbid0IHByZXZlbnQgZGVmYXVsdCBvciBmb2N1cyBhY3RpdmUgY2VsbCBvbiBrZXlzIHRoYXQgd2UgZG9uJ3QgZXhwbGljaXRseSBoYW5kbGUuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0ZUFkYXB0ZXIuY29tcGFyZURhdGUob2xkQWN0aXZlRGF0ZSwgdGhpcy5hY3RpdmVEYXRlKSkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVEYXRlQ2hhbmdlLmVtaXQodGhpcy5hY3RpdmVEYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9jdXNBY3RpdmVDZWxsKCk7XG4gICAgICAgIC8vIFByZXZlbnQgdW5leHBlY3RlZCBkZWZhdWx0IGFjdGlvbnMgc3VjaCBhcyBmb3JtIHN1Ym1pc3Npb24uXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgLyoqIEluaXRpYWxpemVzIHRoaXMgeWVhciB2aWV3LiAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRNb250aCA9IHRoaXMuZ2V0TW9udGhJbkN1cnJlbnRZZWFyKHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICB0aGlzLnRvZGF5TW9udGggPSB0aGlzLmdldE1vbnRoSW5DdXJyZW50WWVhcih0aGlzLmRhdGVBZGFwdGVyLnRvZGF5KCkpO1xuICAgICAgICB0aGlzLnllYXJMYWJlbCA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhck5hbWUodGhpcy5hY3RpdmVEYXRlKTtcblxuICAgICAgICBjb25zdCBtb250aE5hbWVzID0gdGhpcy5kYXRlQWRhcHRlci5nZXRNb250aE5hbWVzKCdzaG9ydCcpO1xuXG4gICAgICAgIC8vIEZpcnN0IHJvdyBvZiBtb250aHMgb25seSBjb250YWlucyA1IGVsZW1lbnRzIHNvIHdlIGNhbiBmaXQgdGhlIHllYXIgbGFiZWwgb24gdGhlIHNhbWUgcm93LlxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbWFnaWMtbnVtYmVyc1xuICAgICAgICB0aGlzLm1vbnRocyA9IFtbMCwgMSwgMiwgM10sIFs0LCA1LCA2LCA3XSwgWzgsIDksIDEwLCAxMV1dLm1hcCgocm93KSA9PiByb3cubWFwKFxuICAgICAgICAgICAgKG1vbnRoKSA9PiB0aGlzLmNyZWF0ZUNlbGxGb3JNb250aChtb250aCwgbW9udGhOYW1lc1ttb250aF0pKSk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLyoqIEZvY3VzZXMgdGhlIGFjdGl2ZSBjZWxsIGFmdGVyIHRoZSBtaWNyb3Rhc2sgcXVldWUgaXMgZW1wdHkuICovXG4gICAgZm9jdXNBY3RpdmVDZWxsKCkge1xuICAgICAgICB0aGlzLm1jQ2FsZW5kYXJCb2R5LmZvY3VzQWN0aXZlQ2VsbCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG1vbnRoIGluIHRoaXMgeWVhciB0aGF0IHRoZSBnaXZlbiBEYXRlIGZhbGxzIG9uLlxuICAgICAqIFJldHVybnMgbnVsbCBpZiB0aGUgZ2l2ZW4gRGF0ZSBpcyBpbiBhbm90aGVyIHllYXIuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRNb250aEluQ3VycmVudFllYXIoZGF0ZTogRCB8IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGRhdGUgJiYgdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKGRhdGUpID09PSB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIodGhpcy5hY3RpdmVEYXRlKSA/XG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmdldE1vbnRoKGRhdGUpIDogbnVsbDtcbiAgICB9XG5cbiAgICAvKiogQ3JlYXRlcyBhbiBNY0NhbGVuZGFyQ2VsbCBmb3IgdGhlIGdpdmVuIG1vbnRoLiAqL1xuICAgIHByaXZhdGUgY3JlYXRlQ2VsbEZvck1vbnRoKG1vbnRoOiBudW1iZXIsIG1vbnRoTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGFyaWFMYWJlbCA9IHRoaXMuZGF0ZUFkYXB0ZXIuZm9ybWF0KFxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5jcmVhdGVEYXRlKHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLmFjdGl2ZURhdGUpLCBtb250aCwgMSksXG4gICAgICAgICAgICB0aGlzLmRhdGVGb3JtYXRzLmRpc3BsYXkubW9udGhZZWFyQTExeUxhYmVsKTtcblxuICAgICAgICBjb25zdCBuZXdNb250aE5hbWUgPSBtb250aE5hbWVbMF0udG9Mb2NhbGVVcHBlckNhc2UoKSArIG1vbnRoTmFtZS5zdWJzdHIoMSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBNY0NhbGVuZGFyQ2VsbChcbiAgICAgICAgICAgIG1vbnRoLCBuZXdNb250aE5hbWUsIGFyaWFMYWJlbCwgdGhpcy5zaG91bGRFbmFibGVNb250aChtb250aCkpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBnaXZlbiBtb250aCBpcyBlbmFibGVkLiAqL1xuICAgIHByaXZhdGUgc2hvdWxkRW5hYmxlTW9udGgobW9udGg6IG51bWJlcikge1xuXG4gICAgICAgIGNvbnN0IGFjdGl2ZVllYXIgPSB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIodGhpcy5hY3RpdmVEYXRlKTtcblxuICAgICAgICBpZiAobW9udGggPT09IHVuZGVmaW5lZCB8fCBtb250aCA9PT0gbnVsbCB8fFxuICAgICAgICAgICAgdGhpcy5pc1llYXJBbmRNb250aEFmdGVyTWF4RGF0ZShhY3RpdmVZZWFyLCBtb250aCkgfHxcbiAgICAgICAgICAgIHRoaXMuaXNZZWFyQW5kTW9udGhCZWZvcmVNaW5EYXRlKGFjdGl2ZVllYXIsIG1vbnRoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmRhdGVGaWx0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmlyc3RPZk1vbnRoID0gdGhpcy5kYXRlQWRhcHRlci5jcmVhdGVEYXRlKGFjdGl2ZVllYXIsIG1vbnRoLCAxKTtcblxuICAgICAgICAvLyBJZiBhbnkgZGF0ZSBpbiB0aGUgbW9udGggaXMgZW5hYmxlZCBjb3VudCB0aGUgbW9udGggYXMgZW5hYmxlZC5cbiAgICAgICAgZm9yIChsZXQgZGF0ZSA9IGZpcnN0T2ZNb250aDsgdGhpcy5kYXRlQWRhcHRlci5nZXRNb250aChkYXRlKSA9PT0gbW9udGg7XG4gICAgICAgICAgICAgZGF0ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKGRhdGUsIDEpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRlRmlsdGVyKGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGVzdHMgd2hldGhlciB0aGUgY29tYmluYXRpb24gbW9udGgveWVhciBpcyBhZnRlciB0aGlzLm1heERhdGUsIGNvbnNpZGVyaW5nXG4gICAgICoganVzdCB0aGUgbW9udGggYW5kIHllYXIgb2YgdGhpcy5tYXhEYXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBpc1llYXJBbmRNb250aEFmdGVyTWF4RGF0ZSh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMubWF4RGF0ZSkge1xuICAgICAgICAgICAgY29uc3QgbWF4WWVhciA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLm1heERhdGUpO1xuICAgICAgICAgICAgY29uc3QgbWF4TW9udGggPSB0aGlzLmRhdGVBZGFwdGVyLmdldE1vbnRoKHRoaXMubWF4RGF0ZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB5ZWFyID4gbWF4WWVhciB8fCAoeWVhciA9PT0gbWF4WWVhciAmJiBtb250aCA+IG1heE1vbnRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUZXN0cyB3aGV0aGVyIHRoZSBjb21iaW5hdGlvbiBtb250aC95ZWFyIGlzIGJlZm9yZSB0aGlzLm1pbkRhdGUsIGNvbnNpZGVyaW5nXG4gICAgICoganVzdCB0aGUgbW9udGggYW5kIHllYXIgb2YgdGhpcy5taW5EYXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBpc1llYXJBbmRNb250aEJlZm9yZU1pbkRhdGUoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLm1pbkRhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG1pblllYXIgPSB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIodGhpcy5taW5EYXRlKTtcbiAgICAgICAgICAgIGNvbnN0IG1pbk1vbnRoID0gdGhpcy5kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLm1pbkRhdGUpO1xuXG4gICAgICAgICAgICByZXR1cm4geWVhciA8IG1pblllYXIgfHwgKHllYXIgPT09IG1pblllYXIgJiYgbW9udGggPCBtaW5Nb250aCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIFRoZSBnaXZlbiBvYmplY3QgaWYgaXQgaXMgYm90aCBhIGRhdGUgaW5zdGFuY2UgYW5kIHZhbGlkLCBvdGhlcndpc2UgbnVsbC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFZhbGlkRGF0ZU9yTnVsbChvYmo6IGFueSk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmRhdGVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiYgdGhpcy5kYXRlQWRhcHRlci5pc1ZhbGlkKG9iaikpID8gb2JqIDogbnVsbDtcbiAgICB9XG5cbiAgICAvKiogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSB1c2VyIGhhcyB0aGUgUlRMIGxheW91dCBkaXJlY3Rpb24uICovXG4gICAgcHJpdmF0ZSBpc1J0bCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlyICYmIHRoaXMuZGlyLnZhbHVlID09PSAncnRsJztcbiAgICB9XG59XG4iXX0=