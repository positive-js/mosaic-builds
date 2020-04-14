import { Directionality } from '@angular/cdk/bidi';
import { Overlay, OverlayRef, ScrollStrategy } from '@angular/cdk/overlay';
import { ComponentType } from '@angular/cdk/portal';
import { AfterViewInit, EventEmitter, InjectionToken, NgZone, OnDestroy, ViewContainerRef } from '@angular/core';
import { DateAdapter } from '@ptsecurity/cdk/datetime';
import { Observable, Subject } from 'rxjs';
import { McCalendar } from './calendar';
import { McCalendarCellCssClasses } from './calendar-body';
import { McDatepickerInput } from './datepicker-input';
/** Injection token that determines the scroll handling while the calendar is open. */
export declare const MC_DATEPICKER_SCROLL_STRATEGY: InjectionToken<() => ScrollStrategy>;
/** @docs-private */
export declare function MC_DATEPICKER_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy;
/** @docs-private */
export declare const MC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER: {
    provide: InjectionToken<() => ScrollStrategy>;
    deps: (typeof Overlay)[];
    useFactory: typeof MC_DATEPICKER_SCROLL_STRATEGY_FACTORY;
};
/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * McCalendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * @docs-private
 */
export declare class McDatepickerContent<D> implements AfterViewInit {
    /** Reference to the internal calendar component. */
    calendar: McCalendar<D>;
    /** Reference to the datepicker that created the overlay. */
    datepicker: McDatepicker<D>;
    ngAfterViewInit(): void;
}
/** Component responsible for managing the datepicker popup/dialog. */
export declare class McDatepicker<D> implements OnDestroy {
    private overlay;
    private ngZone;
    private viewContainerRef;
    private dateAdapter;
    private dir;
    private document;
    /** The date to open the calendar to initially. */
    get startAt(): D | null;
    set startAt(value: D | null);
    /** Whether the datepicker pop-up should be disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    /** Whether the calendar is open. */
    get opened(): boolean;
    set opened(value: boolean);
    /** The currently selected date. */
    get selected(): D | null;
    set selected(value: D | null);
    /** The minimum selectable date. */
    get minDate(): D | null;
    /** The maximum selectable date. */
    get maxDate(): D | null;
    get dateFilter(): (date: D | null) => boolean;
    get value(): D | null;
    /** An input indicating the type of the custom header component for the calendar, if set. */
    calendarHeaderComponent: ComponentType<any>;
    /** The view that the calendar should start in. */
    startView: 'month' | 'year' | 'multi-year';
    /**
     * Emits selected year in multiyear view.
     * This doesn't imply a change on the selected date.
     */
    readonly yearSelected: EventEmitter<D>;
    /**
     * Emits selected month in year view.
     * This doesn't imply a change on the selected date.
     */
    readonly monthSelected: EventEmitter<D>;
    /** Classes to be passed to the date picker panel. Supports the same syntax as `ngClass`. */
    panelClass: string | string[];
    /** Function that can be used to add custom CSS classes to dates. */
    dateClass: (date: D) => McCalendarCellCssClasses;
    /** Emits when the datepicker has been opened. */
    openedStream: EventEmitter<void>;
    /** Emits when the datepicker has been closed. */
    closedStream: EventEmitter<void>;
    /** The id for the datepicker calendar. */
    id: string;
    /** A reference to the overlay when the calendar is opened as a popup. */
    popupRef: OverlayRef;
    /** The input element this datepicker is associated with. */
    datepickerInput: McDatepickerInput<D>;
    readonly stateChanges: Observable<void>;
    /** Emits when the datepicker is disabled. */
    readonly disabledChange: Subject<boolean>;
    /** Emits new selected date when selected date changes. */
    readonly selectedChanged: Subject<D>;
    private scrollStrategy;
    private _startAt;
    private _disabled;
    private _opened;
    private validSelected;
    /** A portal containing the calendar for this datepicker. */
    private calendarPortal;
    /** Reference to the component instantiated in popup mode. */
    private popupComponentRef;
    /** The element that was focused before the datepicker was opened. */
    private focusedElementBeforeOpen;
    /** Subscription to value changes in the associated input element. */
    private inputSubscription;
    constructor(overlay: Overlay, ngZone: NgZone, viewContainerRef: ViewContainerRef, scrollStrategy: any, dateAdapter: DateAdapter<D>, dir: Directionality, document: any);
    ngOnDestroy(): void;
    /** Selects the given date */
    select(date: D): void;
    /** Emits the selected year in multiyear view */
    selectYear(normalizedYear: D): void;
    /** Emits selected month in year view */
    selectMonth(normalizedMonth: D): void;
    /**
     * Register an input with this datepicker.
     * @param input The datepicker input to register with this datepicker.
     */
    registerInput(input: McDatepickerInput<D>): void;
    /** Open the calendar. */
    open(): void;
    /** Close the calendar. */
    close(): void;
    /** Open the calendar as a popup. */
    private openAsPopup;
    /** Create the popup. */
    private createPopup;
    /** Create the popup PositionStrategy. */
    private createPopupPositionStrategy;
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private getValidDateOrNull;
}
