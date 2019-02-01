import { AfterContentInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Directionality } from '@ptsecurity/cdk/bidi';
import { DateAdapter, McDateFormats } from '@ptsecurity/cdk/datetime';
import { McCalendarBody, McCalendarCell, McCalendarCellCssClasses } from './calendar-body';
/**
 * An internal component used to display a single month in the datepicker.
 * @docs-private
 */
export declare class McMonthView<D> implements AfterContentInit {
    private changeDetectorRef;
    private dateFormats;
    dateAdapter: DateAdapter<D>;
    private dir?;
    /**
     * The date to display in this month view (everything other than the month and year is ignored).
     */
    activeDate: D;
    /** The currently selected date. */
    selected: D | null;
    /** The minimum selectable date. */
    minDate: D | null;
    /** The maximum selectable date. */
    maxDate: D | null;
    /** Function used to filter which dates are selectable. */
    dateFilter: (date: D) => boolean;
    /** Function that can be used to add custom CSS classes to dates. */
    dateClass: (date: D) => McCalendarCellCssClasses;
    /** Emits when a new date is selected. */
    readonly selectedChange: EventEmitter<D | null>;
    /** Emits when any date is selected. */
    readonly userSelection: EventEmitter<void>;
    /** Emits when any date is activated. */
    readonly activeDateChange: EventEmitter<D>;
    /** The body of calendar table */
    mcCalendarBody: McCalendarBody;
    /** The label for this month (e.g. "January 2017"). */
    monthLabel: string;
    /** Grid of calendar cells representing the dates of the month. */
    weeks: McCalendarCell[][];
    /** The number of blank cells in the first row before the 1st of the month. */
    firstWeekOffset: number;
    /**
     * The date of the month that the currently selected Date falls on.
     * Null if the currently selected Date is in another month.
     */
    selectedDate: number | null;
    /** The date of the month that today falls on. Null if today is in another month. */
    todayDate: number | null;
    /** The names of the weekdays. */
    weekdays: {
        long: string;
        narrow: string;
    }[];
    private _activeDate;
    private _selected;
    private _minDate;
    private _maxDate;
    constructor(changeDetectorRef: ChangeDetectorRef, dateFormats: McDateFormats, dateAdapter: DateAdapter<D>, dir?: Directionality | undefined);
    ngAfterContentInit(): void;
    /** Handles when a new date is selected. */
    dateSelected(date: number): void;
    /** Handles keydown events on the calendar body when calendar is in month view. */
    handleCalendarBodyKeydown(event: KeyboardEvent): void;
    /** Initializes this month view. */
    init(): void;
    /** Focuses the active cell after the microtask queue is empty. */
    focusActiveCell(): void;
    /** Creates McCalendarCells for the dates in this month. */
    private createWeekCells;
    /** Date filter for the month */
    private shouldEnableDate;
    /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     */
    private getDateInCurrentMonth;
    /** Checks whether the 2 dates are non-null and fall within the same month of the same year. */
    private hasSameMonthAndYear;
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private getValidDateOrNull;
    /** Determines whether the user has the RTL layout direction. */
    private isRtl;
}
