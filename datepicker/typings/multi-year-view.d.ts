import { AfterContentInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Directionality } from '@ptsecurity/cdk/bidi';
import { DateAdapter } from '@ptsecurity/cdk/datetime';
import { McCalendarBody, McCalendarCell } from './calendar-body';
export declare const yearsPerPage = 24;
export declare const yearsPerRow = 4;
/**
 * An internal component used to display a year selector in the datepicker.
 * @docs-private
 */
export declare class McMultiYearView<D> implements AfterContentInit {
    private changeDetectorRef;
    dateAdapter: DateAdapter<D>;
    private dir?;
    /** The date to display in this multi-year view (everything other than the year is ignored). */
    activeDate: D;
    /** The currently selected date. */
    selected: D | null;
    /** The minimum selectable date. */
    minDate: D | null;
    /** The maximum selectable date. */
    maxDate: D | null;
    /** A function used to filter which dates are selectable. */
    dateFilter: (date: D) => boolean;
    /** Emits when a new year is selected. */
    readonly selectedChange: EventEmitter<D>;
    /** Emits the selected year. This doesn't imply a change on the selected date */
    readonly yearSelected: EventEmitter<D>;
    /** Emits when any date is activated. */
    readonly activeDateChange: EventEmitter<D>;
    /** The body of calendar table */
    mcCalendarBody: McCalendarBody;
    /** Grid of calendar cells representing the currently displayed years. */
    years: McCalendarCell[][];
    /** The year that today falls on. */
    todayYear: number;
    /** The year of the selected date. Null if the selected date is null. */
    selectedYear: number | null;
    private _activeDate;
    private _selected;
    private _minDate;
    private _maxDate;
    constructor(changeDetectorRef: ChangeDetectorRef, dateAdapter: DateAdapter<D>, dir?: Directionality);
    ngAfterContentInit(): void;
    /** Initializes this multi-year view. */
    init(): void;
    /** Handles when a new year is selected. */
    onYearSelected(year: number): void;
    /** Handles keydown events on the calendar body when calendar is in multi-year view. */
    handleCalendarBodyKeydown(event: KeyboardEvent): void;
    getActiveCell(): number;
    /** Focuses the active cell after the microtask queue is empty. */
    focusActiveCell(): void;
    /** Creates an McCalendarCell for the given year. */
    private createCellForYear;
    /** Whether the given year is enabled. */
    private shouldEnableYear;
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private getValidDateOrNull;
    /** Determines whether the user has the RTL layout direction. */
    private isRtl;
}
