import { AfterContentInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Directionality } from '@ptsecurity/cdk/bidi';
import { DateAdapter, McDateFormats } from '@ptsecurity/cdk/datetime';
import { McCalendarBody, McCalendarCell } from './calendar-body';
/**
 * An internal component used to display a single year in the datepicker.
 * @docs-private
 */
export declare class McYearView<D> implements AfterContentInit {
    private changeDetectorRef;
    private dateFormats;
    dateAdapter: DateAdapter<D>;
    private dir?;
    /** The date to display in this year view (everything other than the year is ignored). */
    activeDate: D;
    /** The currently selected date. */
    selected: D | null;
    /** The minimum selectable date. */
    minDate: D | null;
    /** The maximum selectable date. */
    maxDate: D | null;
    /** A function used to filter which dates are selectable. */
    dateFilter: (date: D) => boolean;
    /** Emits when a new month is selected. */
    readonly selectedChange: EventEmitter<D>;
    /** Emits the selected month. This doesn't imply a change on the selected date */
    readonly monthSelected: EventEmitter<D>;
    /** Emits when any date is activated. */
    readonly activeDateChange: EventEmitter<D>;
    /** The body of calendar table */
    mcCalendarBody: McCalendarBody;
    /** Grid of calendar cells representing the months of the year. */
    months: McCalendarCell[][];
    /** The label for this year (e.g. "2017"). */
    yearLabel: string;
    /** The month in this year that today falls on. Null if today is in a different year. */
    todayMonth: number | null;
    /**
     * The month in this year that the selected Date falls on.
     * Null if the selected Date is in a different year.
     */
    selectedMonth: number | null;
    private _activeDate;
    private _selected;
    private _minDate;
    private _maxDate;
    constructor(changeDetectorRef: ChangeDetectorRef, dateFormats: McDateFormats, dateAdapter: DateAdapter<D>, dir?: Directionality);
    ngAfterContentInit(): void;
    /** Handles when a new month is selected. */
    onMonthSelected(month: number): void;
    /** Handles keydown events on the calendar body when calendar is in year view. */
    handleCalendarBodyKeydown(event: KeyboardEvent): void;
    /** Initializes this year view. */
    init(): void;
    /** Focuses the active cell after the microtask queue is empty. */
    focusActiveCell(): void;
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     */
    private getMonthInCurrentYear;
    /** Creates an McCalendarCell for the given month. */
    private createCellForMonth;
    /** Whether the given month is enabled. */
    private shouldEnableMonth;
    /**
     * Tests whether the combination month/year is after this.maxDate, considering
     * just the month and year of this.maxDate
     */
    private isYearAndMonthAfterMaxDate;
    /**
     * Tests whether the combination month/year is before this.minDate, considering
     * just the month and year of this.minDate
     */
    private isYearAndMonthBeforeMinDate;
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private getValidDateOrNull;
    /** Determines whether the user has the RTL layout direction. */
    private isRtl;
}
