import { ComponentType, Portal } from '@angular/cdk/portal';
import { AfterContentInit, AfterViewChecked, ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { DateAdapter, McDateFormats } from '@ptsecurity/cdk/datetime';
import { Subject } from 'rxjs';
import { McCalendarCellCssClasses } from './calendar-body';
import { McDatepickerIntl } from './datepicker-intl';
import { McMonthView } from './month-view';
import { McMultiYearView } from './multi-year-view';
import { McYearView } from './year-view';
/**
 * Possible views for the calendar.
 * @docs-private
 */
export declare type McCalendarView = 'month' | 'year' | 'multi-year';
/** Default header for McCalendar */
export declare class McCalendarHeader<D> {
    private intl;
    calendar: McCalendar<D>;
    private dateAdapter;
    private dateFormats;
    constructor(intl: McDatepickerIntl, calendar: McCalendar<D>, dateAdapter: DateAdapter<D>, dateFormats: McDateFormats, changeDetectorRef: ChangeDetectorRef);
    /** The label for the current calendar view. */
    readonly periodButtonText: string;
    readonly periodButtonLabel: string;
    /** The label for the previous button. */
    readonly prevButtonLabel: string;
    /** The label for the next button. */
    readonly nextButtonLabel: string;
    /** Handles user clicks on the period label. */
    currentPeriodClicked(): void;
    /** Handles user clicks on the previous button. */
    previousClicked(): void;
    /** Handles user clicks on the next button. */
    nextClicked(): void;
    /** Whether the previous period button is enabled. */
    previousEnabled(): boolean;
    /** Whether the next period button is enabled. */
    nextEnabled(): boolean;
    /** Whether the two dates represent the same view in the current view mode (month or year). */
    private isSameView;
}
/**
 * A calendar that is used as part of the datepicker.
 * @docs-private
 */
export declare class McCalendar<D> implements AfterContentInit, AfterViewChecked, OnDestroy, OnChanges {
    private dateAdapter;
    private dateFormats;
    private changeDetectorRef;
    /** A date representing the period (month or year) to start the calendar in. */
    startAt: D | null;
    /** The currently selected date. */
    selected: D | null;
    /** The minimum selectable date. */
    minDate: D | null;
    /** The maximum selectable date. */
    maxDate: D | null;
    /**
     * The current active date. This determines which time period is shown and which date is
     * highlighted when using keyboard navigation.
     */
    activeDate: D;
    /** Whether the calendar is in month view. */
    currentView: McCalendarView;
    /** An input indicating the type of the header component, if set. */
    headerComponent: ComponentType<any>;
    /** A portal containing the header component type for this calendar. */
    calendarHeaderPortal: Portal<any>;
    /** Whether the calendar should be started in month or year view. */
    startView: McCalendarView;
    /** Function used to filter which dates are selectable. */
    dateFilter: (date: D) => boolean;
    /** Function that can be used to add custom CSS classes to dates. */
    dateClass: (date: D) => McCalendarCellCssClasses;
    /** Emits when the currently selected date changes. */
    readonly selectedChange: EventEmitter<D>;
    /**
     * Emits the year chosen in multiyear view.
     * This doesn't imply a change on the selected date.
     */
    readonly yearSelected: EventEmitter<D>;
    /**
     * Emits the month chosen in year view.
     * This doesn't imply a change on the selected date.
     */
    readonly monthSelected: EventEmitter<D>;
    /** Emits when any date is selected. */
    readonly userSelection: EventEmitter<void>;
    /** Reference to the current month view component. */
    monthView: McMonthView<D>;
    /** Reference to the current year view component. */
    yearView: McYearView<D>;
    /** Reference to the current multi-year view component. */
    multiYearView: McMultiYearView<D>;
    /**
     * Emits whenever there is a state change that the header may need to respond to.
     */
    stateChanges: Subject<void>;
    private intlChanges;
    /**
     * Used for scheduling that focus should be moved to the active cell on the next tick.
     * We need to schedule it, rather than do it immediately, because we have to wait
     * for Angular to re-evaluate the view children.
     */
    private moveFocusOnNextTick;
    private _startAt;
    private _selected;
    private _minDate;
    private _maxDate;
    private clampedActiveDate;
    private _currentView;
    constructor(intl: McDatepickerIntl, dateAdapter: DateAdapter<D>, dateFormats: McDateFormats, changeDetectorRef: ChangeDetectorRef);
    ngAfterContentInit(): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    focusActiveCell(): void;
    /** Updates today's date after an update of the active date */
    updateTodaysDate(): void;
    /** Handles date selection in the month view. */
    dateSelected(date: D): void;
    /** Handles year selection in the multiyear view. */
    yearSelectedInMultiYearView(normalizedYear: D): void;
    /** Handles month selection in the year view. */
    monthSelectedInYearView(normalizedMonth: D): void;
    userSelected(): void;
    /** Handles year/month selection in the multi-year/year views. */
    goToDateInView(date: D, view: 'month' | 'year' | 'multi-year'): void;
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private getValidDateOrNull;
    /** Returns the component instance that corresponds to the current calendar view. */
    private getCurrentViewComponent;
}
