/**
 * @fileoverview added by tsickle
 * Generated from: multi-year-view.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:no-magic-numbers
import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { DateAdapter } from '@ptsecurity/cdk/datetime';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW, SPACE } from '@ptsecurity/cdk/keycodes';
import { McCalendarBody, McCalendarCell } from './calendar-body';
import { createMissingDateImplError } from './datepicker-errors';
/** @type {?} */
export const yearsPerPage = 24;
/** @type {?} */
export const yearsPerRow = 4;
/**
 * An internal component used to display a year selector in the datepicker.
 * \@docs-private
 * @template D
 */
export class McMultiYearView {
    /**
     * @param {?} changeDetectorRef
     * @param {?} dateAdapter
     * @param {?=} dir
     */
    constructor(changeDetectorRef, dateAdapter, dir) {
        this.changeDetectorRef = changeDetectorRef;
        this.dateAdapter = dateAdapter;
        this.dir = dir;
        /**
         * Emits when a new year is selected.
         */
        this.selectedChange = new EventEmitter();
        /**
         * Emits the selected year. This doesn't imply a change on the selected date
         */
        this.yearSelected = new EventEmitter();
        /**
         * Emits when any date is activated.
         */
        this.activeDateChange = new EventEmitter();
        if (!this.dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        this._activeDate = this.dateAdapter.today();
    }
    /**
     * The date to display in this multi-year view (everything other than the year is ignored).
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
        if (Math.floor(this.dateAdapter.getYear(oldActiveDate) / yearsPerPage) !==
            Math.floor(this.dateAdapter.getYear(this._activeDate) / yearsPerPage)) {
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
        this.selectedYear = this._selected && this.dateAdapter.getYear(this._selected);
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
     * Initializes this multi-year view.
     * @return {?}
     */
    init() {
        this.todayYear = this.dateAdapter.getYear(this.dateAdapter.today());
        /** @type {?} */
        const activeYear = this.dateAdapter.getYear(this._activeDate);
        /** @type {?} */
        const activeOffset = activeYear % yearsPerPage;
        this.years = [];
        for (let i = 0, row = []; i < yearsPerPage; i++) {
            row.push(activeYear - activeOffset + i);
            if (row.length === yearsPerRow) {
                this.years.push(row.map((/**
                 * @param {?} year
                 * @return {?}
                 */
                (year) => this.createCellForYear(year))));
                row = [];
            }
        }
        this.changeDetectorRef.markForCheck();
    }
    /**
     * Handles when a new year is selected.
     * @param {?} year
     * @return {?}
     */
    onYearSelected(year) {
        this.yearSelected.emit(this.dateAdapter.createDate(year, 0, 1));
        /** @type {?} */
        const month = this.dateAdapter.getMonth(this.activeDate);
        /** @type {?} */
        const daysInMonth = this.dateAdapter.getNumDaysInMonth(this.dateAdapter.createDate(year, month, 1));
        this.selectedChange.emit(this.dateAdapter.createDate(year, month, Math.min(this.dateAdapter.getDate(this.activeDate), daysInMonth)));
    }
    /**
     * Handles keydown events on the calendar body when calendar is in multi-year view.
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
                this.activeDate = this.dateAdapter.addCalendarYears(this._activeDate, isRtl ? 1 : -1);
                break;
            case RIGHT_ARROW:
                this.activeDate = this.dateAdapter.addCalendarYears(this._activeDate, isRtl ? -1 : 1);
                break;
            case UP_ARROW:
                this.activeDate = this.dateAdapter.addCalendarYears(this._activeDate, -yearsPerRow);
                break;
            case DOWN_ARROW:
                this.activeDate = this.dateAdapter.addCalendarYears(this._activeDate, yearsPerRow);
                break;
            case HOME:
                this.activeDate = this.dateAdapter.addCalendarYears(this._activeDate, -this.dateAdapter.getYear(this._activeDate) % yearsPerPage);
                break;
            case END:
                this.activeDate = this.dateAdapter.addCalendarYears(this._activeDate, yearsPerPage - this.dateAdapter.getYear(this._activeDate) % yearsPerPage - 1);
                break;
            case PAGE_UP:
                this.activeDate =
                    this.dateAdapter.addCalendarYears(this._activeDate, event.altKey ? -yearsPerPage * 10 : -yearsPerPage);
                break;
            case PAGE_DOWN:
                this.activeDate =
                    this.dateAdapter.addCalendarYears(this._activeDate, event.altKey ? yearsPerPage * 10 : yearsPerPage);
                break;
            case ENTER:
            case SPACE:
                this.onYearSelected(this.dateAdapter.getYear(this._activeDate));
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
     * @return {?}
     */
    getActiveCell() {
        return this.dateAdapter.getYear(this.activeDate) % yearsPerPage;
    }
    /**
     * Focuses the active cell after the microtask queue is empty.
     * @return {?}
     */
    focusActiveCell() {
        this.mcCalendarBody.focusActiveCell();
    }
    /**
     * Creates an McCalendarCell for the given year.
     * @private
     * @param {?} year
     * @return {?}
     */
    createCellForYear(year) {
        /** @type {?} */
        const yearName = this.dateAdapter.getYearName(this.dateAdapter.createDate(year, 0, 1));
        return new McCalendarCell(year, yearName, yearName, this.shouldEnableYear(year));
    }
    /**
     * Whether the given year is enabled.
     * @private
     * @param {?} year
     * @return {?}
     */
    shouldEnableYear(year) {
        // disable if the year is greater than maxDate lower than minDate
        if (year === undefined || year === null ||
            (this.maxDate && year > this.dateAdapter.getYear(this.maxDate)) ||
            (this.minDate && year < this.dateAdapter.getYear(this.minDate))) {
            return false;
        }
        // enable if it reaches here and there's no filter defined
        if (!this.dateFilter) {
            return true;
        }
        /** @type {?} */
        const firstOfYear = this.dateAdapter.createDate(year, 0, 1);
        // If any date in the year is enabled count the year as enabled.
        for (let date = firstOfYear; this.dateAdapter.getYear(date) === year; date = this.dateAdapter.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
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
McMultiYearView.decorators = [
    { type: Component, args: [{
                selector: 'mc-multi-year-view',
                exportAs: 'mcMultiYearView',
                template: "<table class=\"mc-calendar__table\">\n    <thead class=\"mc-calendar__table-header\">\n    <tr>\n        <th class=\"mc-calendar__table-header-divider\" colspan=\"4\"></th>\n    </tr>\n    </thead>\n    <tbody mc-calendar-body\n           [rows]=\"years\"\n           [todayValue]=\"todayYear\"\n           [selectedValue]=\"selectedYear\"\n           [numCols]=\"4\"\n           [cellAspectRatio]=\"4 / 7\"\n           [activeCell]=\"getActiveCell()\"\n           (selectedValueChange)=\"onYearSelected($event)\"\n           (keydown)=\"handleCalendarBodyKeydown($event)\">\n    </tbody>\n</table>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
McMultiYearView.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DateAdapter, decorators: [{ type: Optional }] },
    { type: Directionality, decorators: [{ type: Optional }] }
];
McMultiYearView.propDecorators = {
    activeDate: [{ type: Input }],
    selected: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    dateFilter: [{ type: Input }],
    selectedChange: [{ type: Output }],
    yearSelected: [{ type: Output }],
    activeDateChange: [{ type: Output }],
    mcCalendarBody: [{ type: ViewChild, args: [McCalendarBody, { static: false },] }]
};
if (false) {
    /**
     * A function used to filter which dates are selectable.
     * @type {?}
     */
    McMultiYearView.prototype.dateFilter;
    /**
     * Emits when a new year is selected.
     * @type {?}
     */
    McMultiYearView.prototype.selectedChange;
    /**
     * Emits the selected year. This doesn't imply a change on the selected date
     * @type {?}
     */
    McMultiYearView.prototype.yearSelected;
    /**
     * Emits when any date is activated.
     * @type {?}
     */
    McMultiYearView.prototype.activeDateChange;
    /**
     * The body of calendar table
     * @type {?}
     */
    McMultiYearView.prototype.mcCalendarBody;
    /**
     * Grid of calendar cells representing the currently displayed years.
     * @type {?}
     */
    McMultiYearView.prototype.years;
    /**
     * The year that today falls on.
     * @type {?}
     */
    McMultiYearView.prototype.todayYear;
    /**
     * The year of the selected date. Null if the selected date is null.
     * @type {?}
     */
    McMultiYearView.prototype.selectedYear;
    /**
     * @type {?}
     * @private
     */
    McMultiYearView.prototype._activeDate;
    /**
     * @type {?}
     * @private
     */
    McMultiYearView.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    McMultiYearView.prototype._minDate;
    /**
     * @type {?}
     * @private
     */
    McMultiYearView.prototype._maxDate;
    /**
     * @type {?}
     * @private
     */
    McMultiYearView.prototype.changeDetectorRef;
    /** @type {?} */
    McMultiYearView.prototype.dateAdapter;
    /**
     * @type {?}
     * @private
     */
    McMultiYearView.prototype.dir;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGkteWVhci12aWV3LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbIm11bHRpLXllYXItdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUVILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQ0gsVUFBVSxFQUNWLEdBQUcsRUFDSCxLQUFLLEVBQ0wsSUFBSSxFQUNKLFVBQVUsRUFDVixTQUFTLEVBQ1QsT0FBTyxFQUNQLFdBQVcsRUFDWCxRQUFRLEVBQ1IsS0FBSyxFQUNSLE1BQU0sMEJBQTBCLENBQUM7QUFFbEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFHakUsTUFBTSxPQUFPLFlBQVksR0FBRyxFQUFFOztBQUU5QixNQUFNLE9BQU8sV0FBVyxHQUFHLENBQUM7Ozs7OztBQWM1QixNQUFNLE9BQU8sZUFBZTs7Ozs7O0lBOEV4QixZQUNZLGlCQUFvQyxFQUN6QixXQUEyQixFQUMxQixHQUFvQjtRQUZoQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3pCLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUMxQixRQUFHLEdBQUgsR0FBRyxDQUFpQjs7OztRQTNCekIsbUJBQWMsR0FBb0IsSUFBSSxZQUFZLEVBQUssQ0FBQzs7OztRQUd4RCxpQkFBWSxHQUFvQixJQUFJLFlBQVksRUFBSyxDQUFDOzs7O1FBR3RELHFCQUFnQixHQUFvQixJQUFJLFlBQVksRUFBSyxDQUFDO1FBdUJ6RSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNuQixNQUFNLDBCQUEwQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hELENBQUM7Ozs7O0lBdEZELElBQ0ksVUFBVTtRQUNWLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDOzs7OztJQUVELElBQUksVUFBVSxDQUFDLEtBQVE7O2NBQ2IsYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXOztjQUNoQyxTQUFTLEdBQ1gsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7UUFDNUYsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFckYsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLFlBQVksQ0FBQztZQUNsRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxZQUFZLENBQUMsRUFBRTtZQUN2RSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZjtJQUNMLENBQUM7Ozs7O0lBR0QsSUFDSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7Ozs7O0lBRUQsSUFBSSxRQUFRLENBQUMsS0FBZTtRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkYsQ0FBQzs7Ozs7SUFHRCxJQUNJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQzs7Ozs7SUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFlO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDakYsQ0FBQzs7Ozs7SUFHRCxJQUNJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQzs7Ozs7SUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFlO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDakYsQ0FBQzs7OztJQTBDRCxrQkFBa0I7UUFDZCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQzs7Ozs7SUFHRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7O2NBQzlELFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDOztjQUN2RCxZQUFZLEdBQUcsVUFBVSxHQUFHLFlBQVk7UUFDOUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFhLEVBQUUsRUFBRSxDQUFDLEdBQUcsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3ZELEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssV0FBVyxFQUFFO2dCQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRzs7OztnQkFBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsQ0FBQztnQkFDakUsR0FBRyxHQUFHLEVBQUUsQ0FBQzthQUNaO1NBQ0o7UUFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUMsQ0FBQzs7Ozs7O0lBR0QsY0FBYyxDQUFDLElBQVk7UUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOztjQUMxRCxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7Y0FDbEQsV0FBVyxHQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuRixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUM1RCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQzs7Ozs7O0lBR0QseUJBQXlCLENBQUMsS0FBb0I7UUFDMUMsNkZBQTZGO1FBQzdGLHdGQUF3RjtRQUN4Riw0RkFBNEY7Ozs7O2NBRXRGLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVzs7Y0FDaEMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFFMUIsdUNBQXVDO1FBQ3ZDLFFBQVEsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNuQixLQUFLLFVBQVU7Z0JBQ1gsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RGLE1BQU07WUFDVixLQUFLLFdBQVc7Z0JBQ1osSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RGLE1BQU07WUFDVixLQUFLLFFBQVE7Z0JBQ1QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDcEYsTUFBTTtZQUNWLEtBQUssVUFBVTtnQkFDWCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDbkYsTUFBTTtZQUNWLEtBQUssSUFBSTtnQkFDTCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFDaEUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUM7Z0JBQ2hFLE1BQU07WUFDVixLQUFLLEdBQUc7Z0JBQ0osSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQ2hFLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNsRixNQUFNO1lBQ1YsS0FBSyxPQUFPO2dCQUNSLElBQUksQ0FBQyxVQUFVO29CQUNYLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQzdCLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUM3RSxNQUFNO1lBQ1YsS0FBSyxTQUFTO2dCQUNWLElBQUksQ0FBQyxVQUFVO29CQUNYLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQzdCLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzNFLE1BQU07WUFDVixLQUFLLEtBQUssQ0FBQztZQUNYLEtBQUssS0FBSztnQkFDTixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNoRSxNQUFNO1lBQ1Y7Z0JBQ0ksc0ZBQXNGO2dCQUN0RixPQUFPO1NBQ2Q7UUFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDOUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDL0M7UUFFRCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsOERBQThEO1FBQzlELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7O0lBRUQsYUFBYTtRQUNULE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFlBQVksQ0FBQztJQUNwRSxDQUFDOzs7OztJQUdELGVBQWU7UUFDWCxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzFDLENBQUM7Ozs7Ozs7SUFHTyxpQkFBaUIsQ0FBQyxJQUFZOztjQUM1QixRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV0RixPQUFPLElBQUksY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7Ozs7Ozs7SUFHTyxnQkFBZ0IsQ0FBQyxJQUFZO1FBQ2pDLGlFQUFpRTtRQUNqRSxJQUFJLElBQUksS0FBSyxTQUFTLElBQUksSUFBSSxLQUFLLElBQUk7WUFDbkMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0QsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRTtZQUNqRSxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELDBEQUEwRDtRQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQztTQUNmOztjQUVLLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUUzRCxnRUFBZ0U7UUFDaEUsS0FBSyxJQUFJLElBQUksR0FBRyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUMvRCxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ25ELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdkIsT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Ozs7O0lBTU8sa0JBQWtCLENBQUMsR0FBUTtRQUMvQixPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDaEcsQ0FBQzs7Ozs7O0lBR08sS0FBSztRQUNULE9BQU8sSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUM7SUFDaEQsQ0FBQzs7O1lBaFBKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixvbUJBQW1DO2dCQUNuQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDbEQ7Ozs7WUExQ0csaUJBQWlCO1lBU1osV0FBVyx1QkFrSFgsUUFBUTtZQS9IUixjQUFjLHVCQWdJZCxRQUFROzs7eUJBL0VaLEtBQUs7dUJBa0JMLEtBQUs7c0JBV0wsS0FBSztzQkFVTCxLQUFLO3lCQVVMLEtBQUs7NkJBR0wsTUFBTTsyQkFHTixNQUFNOytCQUdOLE1BQU07NkJBR04sU0FBUyxTQUFDLGNBQWMsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7Ozs7Ozs7SUFaMUMscUNBQTBDOzs7OztJQUcxQyx5Q0FBMkU7Ozs7O0lBRzNFLHVDQUF5RTs7Ozs7SUFHekUsMkNBQTZFOzs7OztJQUc3RSx5Q0FBMkU7Ozs7O0lBRzNFLGdDQUEwQjs7Ozs7SUFHMUIsb0NBQWtCOzs7OztJQUdsQix1Q0FBNEI7Ozs7O0lBQzVCLHNDQUF1Qjs7Ozs7SUFDdkIsb0NBQTRCOzs7OztJQUM1QixtQ0FBMkI7Ozs7O0lBQzNCLG1DQUEyQjs7Ozs7SUFHdkIsNENBQTRDOztJQUM1QyxzQ0FBOEM7Ozs7O0lBQzlDLDhCQUF3QyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOm5vLW1hZ2ljLW51bWJlcnNcbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2RhdGV0aW1lJztcbmltcG9ydCB7XG4gICAgRE9XTl9BUlJPVyxcbiAgICBFTkQsXG4gICAgRU5URVIsXG4gICAgSE9NRSxcbiAgICBMRUZUX0FSUk9XLFxuICAgIFBBR0VfRE9XTixcbiAgICBQQUdFX1VQLFxuICAgIFJJR0hUX0FSUk9XLFxuICAgIFVQX0FSUk9XLFxuICAgIFNQQUNFXG59IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5cbmltcG9ydCB7IE1jQ2FsZW5kYXJCb2R5LCBNY0NhbGVuZGFyQ2VsbCB9IGZyb20gJy4vY2FsZW5kYXItYm9keSc7XG5pbXBvcnQgeyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvciB9IGZyb20gJy4vZGF0ZXBpY2tlci1lcnJvcnMnO1xuXG5cbmV4cG9ydCBjb25zdCB5ZWFyc1BlclBhZ2UgPSAyNDtcblxuZXhwb3J0IGNvbnN0IHllYXJzUGVyUm93ID0gNDtcblxuXG4vKipcbiAqIEFuIGludGVybmFsIGNvbXBvbmVudCB1c2VkIHRvIGRpc3BsYXkgYSB5ZWFyIHNlbGVjdG9yIGluIHRoZSBkYXRlcGlja2VyLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLW11bHRpLXllYXItdmlldycsXG4gICAgZXhwb3J0QXM6ICdtY011bHRpWWVhclZpZXcnLFxuICAgIHRlbXBsYXRlVXJsOiAnbXVsdGkteWVhci12aWV3Lmh0bWwnLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWNNdWx0aVllYXJWaWV3PEQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgLyoqIFRoZSBkYXRlIHRvIGRpc3BsYXkgaW4gdGhpcyBtdWx0aS15ZWFyIHZpZXcgKGV2ZXJ5dGhpbmcgb3RoZXIgdGhhbiB0aGUgeWVhciBpcyBpZ25vcmVkKS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBhY3RpdmVEYXRlKCk6IEQge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlRGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgYWN0aXZlRGF0ZSh2YWx1ZTogRCkge1xuICAgICAgICBjb25zdCBvbGRBY3RpdmVEYXRlID0gdGhpcy5fYWN0aXZlRGF0ZTtcbiAgICAgICAgY29uc3QgdmFsaWREYXRlID1cbiAgICAgICAgICAgIHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKSB8fCB0aGlzLmRhdGVBZGFwdGVyLnRvZGF5KCk7XG4gICAgICAgIHRoaXMuX2FjdGl2ZURhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLmNsYW1wRGF0ZSh2YWxpZERhdGUsIHRoaXMubWluRGF0ZSwgdGhpcy5tYXhEYXRlKTtcblxuICAgICAgICBpZiAoTWF0aC5mbG9vcih0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIob2xkQWN0aXZlRGF0ZSkgLyB5ZWFyc1BlclBhZ2UpICE9PVxuICAgICAgICAgICAgTWF0aC5mbG9vcih0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIodGhpcy5fYWN0aXZlRGF0ZSkgLyB5ZWFyc1BlclBhZ2UpKSB7XG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgc2VsZWN0ZWQoKTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkKHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFllYXIgPSB0aGlzLl9zZWxlY3RlZCAmJiB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIodGhpcy5fc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgbWluRGF0ZSgpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9taW5EYXRlO1xuICAgIH1cblxuICAgIHNldCBtaW5EYXRlKHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9taW5EYXRlID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgbWF4aW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgbWF4RGF0ZSgpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhEYXRlO1xuICAgIH1cblxuICAgIHNldCBtYXhEYXRlKHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9tYXhEYXRlID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgIH1cblxuICAgIC8qKiBBIGZ1bmN0aW9uIHVzZWQgdG8gZmlsdGVyIHdoaWNoIGRhdGVzIGFyZSBzZWxlY3RhYmxlLiAqL1xuICAgIEBJbnB1dCgpIGRhdGVGaWx0ZXI6IChkYXRlOiBEKSA9PiBib29sZWFuO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gYSBuZXcgeWVhciBpcyBzZWxlY3RlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0ZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEPiA9IG5ldyBFdmVudEVtaXR0ZXI8RD4oKTtcblxuICAgIC8qKiBFbWl0cyB0aGUgc2VsZWN0ZWQgeWVhci4gVGhpcyBkb2Vzbid0IGltcGx5IGEgY2hhbmdlIG9uIHRoZSBzZWxlY3RlZCBkYXRlICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHllYXJTZWxlY3RlZDogRXZlbnRFbWl0dGVyPEQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEPigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gYW55IGRhdGUgaXMgYWN0aXZhdGVkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBhY3RpdmVEYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RD4gPSBuZXcgRXZlbnRFbWl0dGVyPEQ+KCk7XG5cbiAgICAvKiogVGhlIGJvZHkgb2YgY2FsZW5kYXIgdGFibGUgKi9cbiAgICBAVmlld0NoaWxkKE1jQ2FsZW5kYXJCb2R5LCB7c3RhdGljOiBmYWxzZX0pIG1jQ2FsZW5kYXJCb2R5OiBNY0NhbGVuZGFyQm9keTtcblxuICAgIC8qKiBHcmlkIG9mIGNhbGVuZGFyIGNlbGxzIHJlcHJlc2VudGluZyB0aGUgY3VycmVudGx5IGRpc3BsYXllZCB5ZWFycy4gKi9cbiAgICB5ZWFyczogTWNDYWxlbmRhckNlbGxbXVtdO1xuXG4gICAgLyoqIFRoZSB5ZWFyIHRoYXQgdG9kYXkgZmFsbHMgb24uICovXG4gICAgdG9kYXlZZWFyOiBudW1iZXI7XG5cbiAgICAvKiogVGhlIHllYXIgb2YgdGhlIHNlbGVjdGVkIGRhdGUuIE51bGwgaWYgdGhlIHNlbGVjdGVkIGRhdGUgaXMgbnVsbC4gKi9cbiAgICBzZWxlY3RlZFllYXI6IG51bWJlciB8IG51bGw7XG4gICAgcHJpdmF0ZSBfYWN0aXZlRGF0ZTogRDtcbiAgICBwcml2YXRlIF9zZWxlY3RlZDogRCB8IG51bGw7XG4gICAgcHJpdmF0ZSBfbWluRGF0ZTogRCB8IG51bGw7XG4gICAgcHJpdmF0ZSBfbWF4RGF0ZTogRCB8IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIEBPcHRpb25hbCgpIHB1YmxpYyBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyPzogRGlyZWN0aW9uYWxpdHlcbiAgICApIHtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGVBZGFwdGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcignRGF0ZUFkYXB0ZXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2FjdGl2ZURhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLnRvZGF5KCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICAvKiogSW5pdGlhbGl6ZXMgdGhpcyBtdWx0aS15ZWFyIHZpZXcuICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy50b2RheVllYXIgPSB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIodGhpcy5kYXRlQWRhcHRlci50b2RheSgpKTtcbiAgICAgICAgY29uc3QgYWN0aXZlWWVhciA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLl9hY3RpdmVEYXRlKTtcbiAgICAgICAgY29uc3QgYWN0aXZlT2Zmc2V0ID0gYWN0aXZlWWVhciAlIHllYXJzUGVyUGFnZTtcbiAgICAgICAgdGhpcy55ZWFycyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgcm93OiBudW1iZXJbXSA9IFtdOyBpIDwgeWVhcnNQZXJQYWdlOyBpKyspIHtcbiAgICAgICAgICAgIHJvdy5wdXNoKGFjdGl2ZVllYXIgLSBhY3RpdmVPZmZzZXQgKyBpKTtcbiAgICAgICAgICAgIGlmIChyb3cubGVuZ3RoID09PSB5ZWFyc1BlclJvdykge1xuICAgICAgICAgICAgICAgIHRoaXMueWVhcnMucHVzaChyb3cubWFwKCh5ZWFyKSA9PiB0aGlzLmNyZWF0ZUNlbGxGb3JZZWFyKHllYXIpKSk7XG4gICAgICAgICAgICAgICAgcm93ID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyB3aGVuIGEgbmV3IHllYXIgaXMgc2VsZWN0ZWQuICovXG4gICAgb25ZZWFyU2VsZWN0ZWQoeWVhcjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMueWVhclNlbGVjdGVkLmVtaXQodGhpcy5kYXRlQWRhcHRlci5jcmVhdGVEYXRlKHllYXIsIDAsIDEpKTtcbiAgICAgICAgY29uc3QgbW9udGggPSB0aGlzLmRhdGVBZGFwdGVyLmdldE1vbnRoKHRoaXMuYWN0aXZlRGF0ZSk7XG4gICAgICAgIGNvbnN0IGRheXNJbk1vbnRoID1cbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TnVtRGF5c0luTW9udGgodGhpcy5kYXRlQWRhcHRlci5jcmVhdGVEYXRlKHllYXIsIG1vbnRoLCAxKSk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCh0aGlzLmRhdGVBZGFwdGVyLmNyZWF0ZURhdGUoeWVhciwgbW9udGgsXG4gICAgICAgICAgICBNYXRoLm1pbih0aGlzLmRhdGVBZGFwdGVyLmdldERhdGUodGhpcy5hY3RpdmVEYXRlKSwgZGF5c0luTW9udGgpKSk7XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMga2V5ZG93biBldmVudHMgb24gdGhlIGNhbGVuZGFyIGJvZHkgd2hlbiBjYWxlbmRhciBpcyBpbiBtdWx0aS15ZWFyIHZpZXcuICovXG4gICAgaGFuZGxlQ2FsZW5kYXJCb2R5S2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICAvLyBUT0RPKG1tYWxlcmJhKTogV2UgY3VycmVudGx5IGFsbG93IGtleWJvYXJkIG5hdmlnYXRpb24gdG8gZGlzYWJsZWQgZGF0ZXMsIGJ1dCBqdXN0IHByZXZlbnRcbiAgICAgICAgLy8gZGlzYWJsZWQgb25lcyBmcm9tIGJlaW5nIHNlbGVjdGVkLiBUaGlzIG1heSBub3QgYmUgaWRlYWwsIHdlIHNob3VsZCBsb29rIGludG8gd2hldGhlclxuICAgICAgICAvLyBuYXZpZ2F0aW9uIHNob3VsZCBza2lwIG92ZXIgZGlzYWJsZWQgZGF0ZXMsIGFuZCBpZiBzbywgaG93IHRvIGltcGxlbWVudCB0aGF0IGVmZmljaWVudGx5LlxuXG4gICAgICAgIGNvbnN0IG9sZEFjdGl2ZURhdGUgPSB0aGlzLl9hY3RpdmVEYXRlO1xuICAgICAgICBjb25zdCBpc1J0bCA9IHRoaXMuaXNSdGwoKTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5kYXRlQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKHRoaXMuX2FjdGl2ZURhdGUsIGlzUnRsID8gMSA6IC0xKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUklHSFRfQVJST1c6XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5kYXRlQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKHRoaXMuX2FjdGl2ZURhdGUsIGlzUnRsID8gLTEgOiAxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5kYXRlQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKHRoaXMuX2FjdGl2ZURhdGUsIC15ZWFyc1BlclJvdyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5kYXRlQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKHRoaXMuX2FjdGl2ZURhdGUsIHllYXJzUGVyUm93KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgSE9NRTpcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5fYWN0aXZlRGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgLXRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLl9hY3RpdmVEYXRlKSAlIHllYXJzUGVyUGFnZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVORDpcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5fYWN0aXZlRGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgeWVhcnNQZXJQYWdlIC0gdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuX2FjdGl2ZURhdGUpICUgeWVhcnNQZXJQYWdlIC0gMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBBR0VfVVA6XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVEYXRlID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlRGF0ZSwgZXZlbnQuYWx0S2V5ID8gLXllYXJzUGVyUGFnZSAqIDEwIDogLXllYXJzUGVyUGFnZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBBR0VfRE9XTjpcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnMoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmVEYXRlLCBldmVudC5hbHRLZXkgPyB5ZWFyc1BlclBhZ2UgKiAxMCA6IHllYXJzUGVyUGFnZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVOVEVSOlxuICAgICAgICAgICAgY2FzZSBTUEFDRTpcbiAgICAgICAgICAgICAgICB0aGlzLm9uWWVhclNlbGVjdGVkKHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLl9hY3RpdmVEYXRlKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vIERvbid0IHByZXZlbnQgZGVmYXVsdCBvciBmb2N1cyBhY3RpdmUgY2VsbCBvbiBrZXlzIHRoYXQgd2UgZG9uJ3QgZXhwbGljaXRseSBoYW5kbGUuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0ZUFkYXB0ZXIuY29tcGFyZURhdGUob2xkQWN0aXZlRGF0ZSwgdGhpcy5hY3RpdmVEYXRlKSkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVEYXRlQ2hhbmdlLmVtaXQodGhpcy5hY3RpdmVEYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9jdXNBY3RpdmVDZWxsKCk7XG4gICAgICAgIC8vIFByZXZlbnQgdW5leHBlY3RlZCBkZWZhdWx0IGFjdGlvbnMgc3VjaCBhcyBmb3JtIHN1Ym1pc3Npb24uXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgZ2V0QWN0aXZlQ2VsbCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSkgJSB5ZWFyc1BlclBhZ2U7XG4gICAgfVxuXG4gICAgLyoqIEZvY3VzZXMgdGhlIGFjdGl2ZSBjZWxsIGFmdGVyIHRoZSBtaWNyb3Rhc2sgcXVldWUgaXMgZW1wdHkuICovXG4gICAgZm9jdXNBY3RpdmVDZWxsKCkge1xuICAgICAgICB0aGlzLm1jQ2FsZW5kYXJCb2R5LmZvY3VzQWN0aXZlQ2VsbCgpO1xuICAgIH1cblxuICAgIC8qKiBDcmVhdGVzIGFuIE1jQ2FsZW5kYXJDZWxsIGZvciB0aGUgZ2l2ZW4geWVhci4gKi9cbiAgICBwcml2YXRlIGNyZWF0ZUNlbGxGb3JZZWFyKHllYXI6IG51bWJlcikge1xuICAgICAgICBjb25zdCB5ZWFyTmFtZSA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhck5hbWUodGhpcy5kYXRlQWRhcHRlci5jcmVhdGVEYXRlKHllYXIsIDAsIDEpKTtcblxuICAgICAgICByZXR1cm4gbmV3IE1jQ2FsZW5kYXJDZWxsKHllYXIsIHllYXJOYW1lLCB5ZWFyTmFtZSwgdGhpcy5zaG91bGRFbmFibGVZZWFyKHllYXIpKTtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgZ2l2ZW4geWVhciBpcyBlbmFibGVkLiAqL1xuICAgIHByaXZhdGUgc2hvdWxkRW5hYmxlWWVhcih5ZWFyOiBudW1iZXIpIHtcbiAgICAgICAgLy8gZGlzYWJsZSBpZiB0aGUgeWVhciBpcyBncmVhdGVyIHRoYW4gbWF4RGF0ZSBsb3dlciB0aGFuIG1pbkRhdGVcbiAgICAgICAgaWYgKHllYXIgPT09IHVuZGVmaW5lZCB8fCB5ZWFyID09PSBudWxsIHx8XG4gICAgICAgICAgICAodGhpcy5tYXhEYXRlICYmIHllYXIgPiB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIodGhpcy5tYXhEYXRlKSkgfHxcbiAgICAgICAgICAgICh0aGlzLm1pbkRhdGUgJiYgeWVhciA8IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLm1pbkRhdGUpKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZW5hYmxlIGlmIGl0IHJlYWNoZXMgaGVyZSBhbmQgdGhlcmUncyBubyBmaWx0ZXIgZGVmaW5lZFxuICAgICAgICBpZiAoIXRoaXMuZGF0ZUZpbHRlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaXJzdE9mWWVhciA9IHRoaXMuZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZSh5ZWFyLCAwLCAxKTtcblxuICAgICAgICAvLyBJZiBhbnkgZGF0ZSBpbiB0aGUgeWVhciBpcyBlbmFibGVkIGNvdW50IHRoZSB5ZWFyIGFzIGVuYWJsZWQuXG4gICAgICAgIGZvciAobGV0IGRhdGUgPSBmaXJzdE9mWWVhcjsgdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKGRhdGUpID09PSB5ZWFyO1xuICAgICAgICAgICAgIGRhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyhkYXRlLCAxKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZUZpbHRlcihkYXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyBUaGUgZ2l2ZW4gb2JqZWN0IGlmIGl0IGlzIGJvdGggYSBkYXRlIGluc3RhbmNlIGFuZCB2YWxpZCwgb3RoZXJ3aXNlIG51bGwuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRWYWxpZERhdGVPck51bGwob2JqOiBhbnkpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiAodGhpcy5kYXRlQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmIHRoaXMuZGF0ZUFkYXB0ZXIuaXNWYWxpZChvYmopKSA/IG9iaiA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqIERldGVybWluZXMgd2hldGhlciB0aGUgdXNlciBoYXMgdGhlIFJUTCBsYXlvdXQgZGlyZWN0aW9uLiAqL1xuICAgIHByaXZhdGUgaXNSdGwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpciAmJiB0aGlzLmRpci52YWx1ZSA9PT0gJ3J0bCc7XG4gICAgfVxufVxuIl19