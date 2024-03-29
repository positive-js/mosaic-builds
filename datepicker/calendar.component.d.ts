import { ComponentType, Portal } from '@angular/cdk/portal';
import { AfterContentInit, AfterViewChecked, ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { DateAdapter, McDateFormats } from '@ptsecurity/cdk/datetime';
import { Subject } from 'rxjs';
import { McCalendarCellCssClasses } from './calendar-body.component';
import { McDatepickerIntl } from './datepicker-intl';
import { McMonthView } from './month-view.component';
import { McMultiYearView } from './multi-year-view.component';
import { McYearView } from './year-view.component';
import * as i0 from "@angular/core";
/**
 * Possible views for the calendar.
 * @docs-private
 */
export declare enum McCalendarView {
    Month = "month",
    Year = "year",
    MultiYear = "multi-year"
}
/** Default header for McCalendar */
export declare class McCalendarHeader<D> {
    private readonly intl;
    calendar: McCalendar<D>;
    private readonly dateAdapter;
    private readonly dateFormats;
    constructor(intl: McDatepickerIntl, calendar: McCalendar<D>, dateAdapter: DateAdapter<D>, dateFormats: McDateFormats, changeDetectorRef: ChangeDetectorRef);
    /** The label for the current calendar view. */
    get periodButtonText(): string;
    get periodButtonLabel(): string;
    /** The label for the previous button. */
    get prevButtonLabel(): string;
    /** The label for the next button. */
    get nextButtonLabel(): string;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<McCalendarHeader<any>, [null, null, { optional: true; }, { optional: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McCalendarHeader<any>, "mc-calendar-header", ["mcCalendarHeader"], {}, {}, never, never>;
}
/**
 * A calendar that is used as part of the datepicker.
 * @docs-private
 */
export declare class McCalendar<D> implements AfterContentInit, AfterViewChecked, OnDestroy, OnChanges {
    private readonly dateAdapter;
    private readonly dateFormats;
    private changeDetectorRef;
    /** A date representing the period (month or year) to start the calendar in. */
    get startAt(): D | null;
    set startAt(value: D | null);
    /** The currently selected date. */
    get selected(): D | null;
    set selected(value: D | null);
    /** The minimum selectable date. */
    get minDate(): D | null;
    set minDate(value: D | null);
    /** The maximum selectable date. */
    get maxDate(): D | null;
    set maxDate(value: D | null);
    /**
     * The current active date. This determines which time period is shown and which date is
     * highlighted when using keyboard navigation.
     */
    get activeDate(): D;
    set activeDate(value: D);
    /** Whether the calendar is in month view. */
    get currentView(): McCalendarView;
    set currentView(value: McCalendarView);
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
    private readonly intlChanges;
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
    goToDateInView(date: D, view: McCalendarView | string): void;
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private getValidDateOrNull;
    /** Returns the component instance that corresponds to the current calendar view. */
    private getCurrentViewComponent;
    static ɵfac: i0.ɵɵFactoryDeclaration<McCalendar<any>, [null, { optional: true; }, { optional: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McCalendar<any>, "mc-calendar", ["mcCalendar"], { "startAt": "startAt"; "selected": "selected"; "minDate": "minDate"; "maxDate": "maxDate"; "headerComponent": "headerComponent"; "startView": "startView"; "dateFilter": "dateFilter"; "dateClass": "dateClass"; }, { "selectedChange": "selectedChange"; "yearSelected": "yearSelected"; "monthSelected": "monthSelected"; "userSelection": "userSelection"; }, never, never>;
}
