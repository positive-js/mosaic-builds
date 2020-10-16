/**
 * @fileoverview added by tsickle
 * Generated from: calendar.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Inject, Input, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { DateAdapter, MC_DATE_FORMATS } from '@ptsecurity/cdk/datetime';
import { Subject } from 'rxjs';
import { createMissingDateImplError } from './datepicker-errors';
import { McDatepickerIntl } from './datepicker-intl';
import { McMonthView } from './month-view';
import { McMultiYearView, yearsPerPage } from './multi-year-view';
import { McYearView } from './year-view';
/**
 * Default header for McCalendar
 * @template D
 */
export class McCalendarHeader {
    /**
     * @param {?} intl
     * @param {?} calendar
     * @param {?} dateAdapter
     * @param {?} dateFormats
     * @param {?} changeDetectorRef
     */
    constructor(intl, calendar, dateAdapter, dateFormats, changeDetectorRef) {
        this.intl = intl;
        this.calendar = calendar;
        this.dateAdapter = dateAdapter;
        this.dateFormats = dateFormats;
        this.calendar.stateChanges.subscribe((/**
         * @return {?}
         */
        () => changeDetectorRef.markForCheck()));
    }
    /**
     * The label for the current calendar view.
     * @return {?}
     */
    get periodButtonText() {
        if (this.calendar.currentView === 'month') {
            /** @type {?} */
            const label = this.dateAdapter
                .format(this.calendar.activeDate, this.dateFormats.display.monthYearLabel);
            return label[0].toLocaleUpperCase() + label.substr(1);
        }
        if (this.calendar.currentView === 'year') {
            return this.dateAdapter.getYearName(this.calendar.activeDate);
        }
        /** @type {?} */
        const activeYear = this.dateAdapter.getYear(this.calendar.activeDate);
        /** @type {?} */
        const firstYearInView = this.dateAdapter.getYearName(
        // tslint:disable-next-line:no-magic-numbers
        this.dateAdapter.createDate(activeYear - activeYear % 24, 0, 1));
        /** @type {?} */
        const lastYearInView = this.dateAdapter.getYearName(
        // tslint:disable-next-line:no-magic-numbers
        this.dateAdapter.createDate(activeYear + yearsPerPage - 1 - activeYear % 24, 0, 1));
        return `${firstYearInView} \u2013 ${lastYearInView}`;
    }
    /**
     * @return {?}
     */
    get periodButtonLabel() {
        return this.calendar.currentView === 'month' ?
            this.intl.switchToMultiYearViewLabel : this.intl.switchToMonthViewLabel;
    }
    /**
     * The label for the previous button.
     * @return {?}
     */
    get prevButtonLabel() {
        return {
            month: this.intl.prevMonthLabel,
            year: this.intl.prevYearLabel,
            'multi-year': this.intl.prevMultiYearLabel
        }[this.calendar.currentView];
    }
    /**
     * The label for the next button.
     * @return {?}
     */
    get nextButtonLabel() {
        return {
            month: this.intl.nextMonthLabel,
            year: this.intl.nextYearLabel,
            'multi-year': this.intl.nextMultiYearLabel
        }[this.calendar.currentView];
    }
    /**
     * Handles user clicks on the period label.
     * @return {?}
     */
    currentPeriodClicked() {
        this.calendar.currentView = this.calendar.currentView === 'month' ? 'multi-year' : 'month';
    }
    /**
     * Handles user clicks on the previous button.
     * @return {?}
     */
    previousClicked() {
        this.calendar.activeDate = this.calendar.currentView === 'month' ?
            this.dateAdapter.addCalendarMonths(this.calendar.activeDate, -1) :
            this.dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView === 'year' ? -1 : -yearsPerPage);
    }
    /**
     * Handles user clicks on the next button.
     * @return {?}
     */
    nextClicked() {
        this.calendar.activeDate = this.calendar.currentView === 'month' ?
            this.dateAdapter.addCalendarMonths(this.calendar.activeDate, 1) :
            this.dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView === 'year' ? 1 : yearsPerPage);
    }
    /**
     * Whether the previous period button is enabled.
     * @return {?}
     */
    previousEnabled() {
        if (!this.calendar.minDate) {
            return true;
        }
        return !this.calendar.minDate ||
            !this.isSameView(this.calendar.activeDate, this.calendar.minDate);
    }
    /**
     * Whether the next period button is enabled.
     * @return {?}
     */
    nextEnabled() {
        return !this.calendar.maxDate ||
            !this.isSameView(this.calendar.activeDate, this.calendar.maxDate);
    }
    /**
     * Whether the two dates represent the same view in the current view mode (month or year).
     * @private
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    isSameView(date1, date2) {
        if (this.calendar.currentView === 'month') {
            return this.dateAdapter.getYear(date1) === this.dateAdapter.getYear(date2) &&
                this.dateAdapter.getMonth(date1) === this.dateAdapter.getMonth(date2);
        }
        if (this.calendar.currentView === 'year') {
            return this.dateAdapter.getYear(date1) === this.dateAdapter.getYear(date2);
        }
        // Otherwise we are in 'multi-year' view.
        return Math.floor(this.dateAdapter.getYear(date1) / yearsPerPage) ===
            Math.floor(this.dateAdapter.getYear(date2) / yearsPerPage);
    }
}
McCalendarHeader.decorators = [
    { type: Component, args: [{
                selector: 'mc-calendar-header',
                template: "<div class=\"mc-calendar__header\">\n    <div class=\"mc-calendar__controls\">\n        <button mc-button type=\"button\" class=\"mc-calendar__period-button\"\n                (click)=\"currentPeriodClicked()\" [attr.aria-label]=\"periodButtonLabel\">\n            {{periodButtonText}}\n            <i class=\"mc mc-icon\"\n               [class.mc-angle-up-M_16]=\"calendar.currentView !== 'month'\"\n               [class.mc-angle-down-M_16]=\"calendar.currentView === 'month'\"></i>\n        </button>\n\n        <div class=\"mc-calendar-spacer\"></div>\n\n        <ng-content></ng-content>\n\n        <button mc-button type=\"button\" class=\"mc-calendar__previous-button\"\n                [disabled]=\"!previousEnabled()\" (click)=\"previousClicked()\"\n                [attr.aria-label]=\"prevButtonLabel\">\n            <i mc-icon=\"mc-angle-left-L_16\"></i>\n        </button>\n\n        <button mc-button type=\"button\" class=\"mc-calendar__next-button\"\n                [disabled]=\"!nextEnabled()\" (click)=\"nextClicked()\"\n                [attr.aria-label]=\"nextButtonLabel\">\n            <i mc-icon=\"mc-angle-right-L_16\"></i>\n        </button>\n    </div>\n</div>\n",
                exportAs: 'mcCalendarHeader',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
McCalendarHeader.ctorParameters = () => [
    { type: McDatepickerIntl },
    { type: McCalendar, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => McCalendar)),] }] },
    { type: DateAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_DATE_FORMATS,] }] },
    { type: ChangeDetectorRef }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    McCalendarHeader.prototype.intl;
    /** @type {?} */
    McCalendarHeader.prototype.calendar;
    /**
     * @type {?}
     * @private
     */
    McCalendarHeader.prototype.dateAdapter;
    /**
     * @type {?}
     * @private
     */
    McCalendarHeader.prototype.dateFormats;
}
/**
 * A calendar that is used as part of the datepicker.
 * \@docs-private
 * @template D
 */
export class McCalendar {
    /**
     * @param {?} intl
     * @param {?} dateAdapter
     * @param {?} dateFormats
     * @param {?} changeDetectorRef
     */
    constructor(intl, dateAdapter, dateFormats, changeDetectorRef) {
        this.dateAdapter = dateAdapter;
        this.dateFormats = dateFormats;
        this.changeDetectorRef = changeDetectorRef;
        /**
         * Whether the calendar should be started in month or year view.
         */
        this.startView = 'month';
        /**
         * Emits when the currently selected date changes.
         */
        this.selectedChange = new EventEmitter();
        /**
         * Emits the year chosen in multiyear view.
         * This doesn't imply a change on the selected date.
         */
        this.yearSelected = new EventEmitter();
        /**
         * Emits the month chosen in year view.
         * This doesn't imply a change on the selected date.
         */
        this.monthSelected = new EventEmitter();
        /**
         * Emits when any date is selected.
         */
        this.userSelection = new EventEmitter();
        /**
         * Emits whenever there is a state change that the header may need to respond to.
         */
        this.stateChanges = new Subject();
        /**
         * Used for scheduling that focus should be moved to the active cell on the next tick.
         * We need to schedule it, rather than do it immediately, because we have to wait
         * for Angular to re-evaluate the view children.
         */
        this.moveFocusOnNextTick = false;
        if (!this.dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        if (!this.dateFormats) {
            throw createMissingDateImplError('MC_DATE_FORMATS');
        }
        this.intlChanges = intl.changes.subscribe((/**
         * @return {?}
         */
        () => {
            changeDetectorRef.markForCheck();
            this.stateChanges.next();
        }));
    }
    /**
     * A date representing the period (month or year) to start the calendar in.
     * @return {?}
     */
    get startAt() {
        return this._startAt;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set startAt(value) {
        this._startAt = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
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
     * The current active date. This determines which time period is shown and which date is
     * highlighted when using keyboard navigation.
     * @return {?}
     */
    get activeDate() {
        return this.clampedActiveDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set activeDate(value) {
        this.clampedActiveDate = this.dateAdapter.clampDate(value, this.minDate, this.maxDate);
        this.stateChanges.next();
    }
    /**
     * Whether the calendar is in month view.
     * @return {?}
     */
    get currentView() {
        return this._currentView;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set currentView(value) {
        this._currentView = value;
        this.moveFocusOnNextTick = true;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.calendarHeaderPortal = new ComponentPortal(this.headerComponent || McCalendarHeader);
        this.activeDate = this.startAt || this.dateAdapter.today();
        // Assign to the private property since we don't want to move focus on init.
        this._currentView = this.startView;
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.moveFocusOnNextTick) {
            this.moveFocusOnNextTick = false;
            this.focusActiveCell();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.intlChanges.unsubscribe();
        this.stateChanges.complete();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const change = changes.minDate || changes.maxDate || changes.dateFilter;
        if (change && !change.firstChange) {
            /** @type {?} */
            const view = this.getCurrentViewComponent();
            if (view) {
                // We need to `detectChanges` manually here, because the `minDate`, `maxDate` etc. are
                // passed down to the view via data bindings which won't be up-to-date when we call `init`.
                this.changeDetectorRef.detectChanges();
                view.init();
            }
        }
        this.stateChanges.next();
    }
    /**
     * @return {?}
     */
    focusActiveCell() {
        this.getCurrentViewComponent().focusActiveCell();
    }
    /**
     * Updates today's date after an update of the active date
     * @return {?}
     */
    updateTodaysDate() {
        /** @type {?} */
        const view = this.currentView === 'month' ? this.monthView :
            (this.currentView === 'year' ? this.yearView : this.multiYearView);
        view.ngAfterContentInit();
    }
    /**
     * Handles date selection in the month view.
     * @param {?} date
     * @return {?}
     */
    dateSelected(date) {
        if (!this.dateAdapter.sameDate(date, this.selected)) {
            this.selectedChange.emit(date);
        }
    }
    /**
     * Handles year selection in the multiyear view.
     * @param {?} normalizedYear
     * @return {?}
     */
    yearSelectedInMultiYearView(normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    }
    /**
     * Handles month selection in the year view.
     * @param {?} normalizedMonth
     * @return {?}
     */
    monthSelectedInYearView(normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    }
    /**
     * @return {?}
     */
    userSelected() {
        this.userSelection.emit();
    }
    /**
     * Handles year/month selection in the multi-year/year views.
     * @param {?} date
     * @param {?} view
     * @return {?}
     */
    goToDateInView(date, view) {
        this.activeDate = date;
        this.currentView = view;
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
     * Returns the component instance that corresponds to the current calendar view.
     * @private
     * @return {?}
     */
    getCurrentViewComponent() {
        return this.monthView || this.yearView || this.multiYearView;
    }
}
McCalendar.decorators = [
    { type: Component, args: [{
                selector: 'mc-calendar',
                exportAs: 'mcCalendar',
                template: "<ng-template [cdkPortalOutlet]=\"calendarHeaderPortal\"></ng-template>\n\n<div class=\"mc-calendar__content\" [ngSwitch]=\"currentView\" cdkMonitorSubtreeFocus tabindex=\"-1\">\n    <mc-month-view\n        *ngSwitchCase=\"'month'\"\n        [(activeDate)]=\"activeDate\"\n        [selected]=\"selected\"\n        [dateFilter]=\"dateFilter\"\n        [maxDate]=\"maxDate\"\n        [minDate]=\"minDate\"\n        [dateClass]=\"dateClass\"\n        (selectedChange)=\"dateSelected($event)\"\n        (userSelection)=\"userSelected()\">\n    </mc-month-view>\n\n    <mc-year-view\n        *ngSwitchCase=\"'year'\"\n        [(activeDate)]=\"activeDate\"\n        [selected]=\"selected\"\n        [dateFilter]=\"dateFilter\"\n        [maxDate]=\"maxDate\"\n        [minDate]=\"minDate\"\n        (monthSelected)=\"monthSelectedInYearView($event)\"\n        (selectedChange)=\"goToDateInView($event, 'month')\">\n    </mc-year-view>\n\n    <mc-multi-year-view\n        *ngSwitchCase=\"'multi-year'\"\n        [(activeDate)]=\"activeDate\"\n        [selected]=\"selected\"\n        [dateFilter]=\"dateFilter\"\n        [maxDate]=\"maxDate\"\n        [minDate]=\"minDate\"\n        (yearSelected)=\"yearSelectedInMultiYearView($event)\"\n        (selectedChange)=\"goToDateInView($event, 'year')\">\n    </mc-multi-year-view>\n</div>\n",
                host: {
                    class: 'mc-calendar'
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mc-calendar{display:block}.mc-calendar__header{padding:8px 8px 0}.mc-calendar__content{outline:none;padding:0 8px 8px}.mc-calendar__controls{display:flex;margin:5% calc(4.71429% - 16px)}.mc-calendar-spacer{flex:1 1 auto}.mc-calendar__period-button{min-width:0}.mc-calendar__previous-button:after{border-left-width:2px;transform:translateX(2px) rotate(-45deg)}.mc-calendar__next-button:after{border-right-width:2px;transform:translateX(-2px) rotate(45deg)}.mc-calendar__table{border-collapse:collapse;border-spacing:0;width:100%}.mc-calendar__table-header th{padding:0 0 8px;text-align:center}.mc-calendar__table-header-divider{height:1px;position:relative}.mc-calendar__table-header-divider:after{content:\"\";height:1px;left:-8px;position:absolute;right:-8px;top:0}"]
            }] }
];
/** @nocollapse */
McCalendar.ctorParameters = () => [
    { type: McDatepickerIntl },
    { type: DateAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_DATE_FORMATS,] }] },
    { type: ChangeDetectorRef }
];
McCalendar.propDecorators = {
    startAt: [{ type: Input }],
    selected: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    headerComponent: [{ type: Input }],
    startView: [{ type: Input }],
    dateFilter: [{ type: Input }],
    dateClass: [{ type: Input }],
    selectedChange: [{ type: Output }],
    yearSelected: [{ type: Output }],
    monthSelected: [{ type: Output }],
    userSelection: [{ type: Output }],
    monthView: [{ type: ViewChild, args: [McMonthView, { static: false },] }],
    yearView: [{ type: ViewChild, args: [McYearView, { static: false },] }],
    multiYearView: [{ type: ViewChild, args: [McMultiYearView, { static: false },] }]
};
if (false) {
    /**
     * An input indicating the type of the header component, if set.
     * @type {?}
     */
    McCalendar.prototype.headerComponent;
    /**
     * A portal containing the header component type for this calendar.
     * @type {?}
     */
    McCalendar.prototype.calendarHeaderPortal;
    /**
     * Whether the calendar should be started in month or year view.
     * @type {?}
     */
    McCalendar.prototype.startView;
    /**
     * Function used to filter which dates are selectable.
     * @type {?}
     */
    McCalendar.prototype.dateFilter;
    /**
     * Function that can be used to add custom CSS classes to dates.
     * @type {?}
     */
    McCalendar.prototype.dateClass;
    /**
     * Emits when the currently selected date changes.
     * @type {?}
     */
    McCalendar.prototype.selectedChange;
    /**
     * Emits the year chosen in multiyear view.
     * This doesn't imply a change on the selected date.
     * @type {?}
     */
    McCalendar.prototype.yearSelected;
    /**
     * Emits the month chosen in year view.
     * This doesn't imply a change on the selected date.
     * @type {?}
     */
    McCalendar.prototype.monthSelected;
    /**
     * Emits when any date is selected.
     * @type {?}
     */
    McCalendar.prototype.userSelection;
    /**
     * Reference to the current month view component.
     * @type {?}
     */
    McCalendar.prototype.monthView;
    /**
     * Reference to the current year view component.
     * @type {?}
     */
    McCalendar.prototype.yearView;
    /**
     * Reference to the current multi-year view component.
     * @type {?}
     */
    McCalendar.prototype.multiYearView;
    /**
     * Emits whenever there is a state change that the header may need to respond to.
     * @type {?}
     */
    McCalendar.prototype.stateChanges;
    /**
     * @type {?}
     * @private
     */
    McCalendar.prototype.intlChanges;
    /**
     * Used for scheduling that focus should be moved to the active cell on the next tick.
     * We need to schedule it, rather than do it immediately, because we have to wait
     * for Angular to re-evaluate the view children.
     * @type {?}
     * @private
     */
    McCalendar.prototype.moveFocusOnNextTick;
    /**
     * @type {?}
     * @private
     */
    McCalendar.prototype._startAt;
    /**
     * @type {?}
     * @private
     */
    McCalendar.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    McCalendar.prototype._minDate;
    /**
     * @type {?}
     * @private
     */
    McCalendar.prototype._maxDate;
    /**
     * @type {?}
     * @private
     */
    McCalendar.prototype.clampedActiveDate;
    /**
     * @type {?}
     * @private
     */
    McCalendar.prototype._currentView;
    /**
     * @type {?}
     * @private
     */
    McCalendar.prototype.dateAdapter;
    /**
     * @type {?}
     * @private
     */
    McCalendar.prototype.dateFormats;
    /**
     * @type {?}
     * @private
     */
    McCalendar.prototype.changeDetectorRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsiY2FsZW5kYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUF5QixNQUFNLHFCQUFxQixDQUFDO0FBQzdFLE9BQU8sRUFHSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFFTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFpQixNQUFNLDBCQUEwQixDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRzdDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7OztBQWlCekMsTUFBTSxPQUFPLGdCQUFnQjs7Ozs7Ozs7SUFDekIsWUFBb0IsSUFBc0IsRUFDZSxRQUF1QixFQUNoRCxXQUEyQixFQUNGLFdBQTBCLEVBQ3ZFLGlCQUFvQztRQUo1QixTQUFJLEdBQUosSUFBSSxDQUFrQjtRQUNlLGFBQVEsR0FBUixRQUFRLENBQWU7UUFDaEQsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQ0YsZ0JBQVcsR0FBWCxXQUFXLENBQWU7UUFHL0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZ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QkFpQ0wsS0FBSzt3QkFNTCxLQUFLO3lCQUdMLEtBQUs7d0JBR0wsS0FBSzs2QkFHTCxNQUFNOzJCQU1OLE1BQU07NEJBTU4sTUFBTTs0QkFHTixNQUFNO3dCQUdOLFNBQVMsU0FBQyxXQUFXLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDO3VCQUd0QyxTQUFTLFNBQUMsVUFBVSxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQzs0QkFHckMsU0FBUyxTQUFDLGVBQWUsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7Ozs7Ozs7SUF2QzNDLHFDQUE2Qzs7Ozs7SUFHN0MsMENBQWtDOzs7OztJQUdsQywrQkFBNkM7Ozs7O0lBRzdDLGdDQUEwQzs7Ozs7SUFHMUMsK0JBQTBEOzs7OztJQUcxRCxvQ0FBMkU7Ozs7OztJQU0zRSxrQ0FBeUU7Ozs7OztJQU16RSxtQ0FBMEU7Ozs7O0lBRzFFLG1DQUFnRjs7Ozs7SUFHaEYsK0JBQW1FOzs7OztJQUduRSw4QkFBZ0U7Ozs7O0lBR2hFLG1DQUErRTs7Ozs7SUFLL0Usa0NBQW1DOzs7OztJQUVuQyxpQ0FBa0M7Ozs7Ozs7O0lBT2xDLHlDQUFvQzs7Ozs7SUFDcEMsOEJBQTJCOzs7OztJQUMzQiwrQkFBNEI7Ozs7O0lBQzVCLDhCQUEyQjs7Ozs7SUFDM0IsOEJBQTJCOzs7OztJQUMzQix1Q0FBNkI7Ozs7O0lBQzdCLGtDQUFxQzs7Ozs7SUFJakMsaUNBQStDOzs7OztJQUMvQyxpQ0FBdUU7Ozs7O0lBQ3ZFLHVDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFBvcnRhbCwgQ29tcG9uZW50VHlwZSwgUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIsIE1DX0RBVEVfRk9STUFUUywgTWNEYXRlRm9ybWF0cyB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9kYXRldGltZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTWNDYWxlbmRhckNlbGxDc3NDbGFzc2VzIH0gZnJvbSAnLi9jYWxlbmRhci1ib2R5JztcbmltcG9ydCB7IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yIH0gZnJvbSAnLi9kYXRlcGlja2VyLWVycm9ycyc7XG5pbXBvcnQgeyBNY0RhdGVwaWNrZXJJbnRsIH0gZnJvbSAnLi9kYXRlcGlja2VyLWludGwnO1xuaW1wb3J0IHsgTWNNb250aFZpZXcgfSBmcm9tICcuL21vbnRoLXZpZXcnO1xuaW1wb3J0IHsgTWNNdWx0aVllYXJWaWV3LCB5ZWFyc1BlclBhZ2UgfSBmcm9tICcuL211bHRpLXllYXItdmlldyc7XG5pbXBvcnQgeyBNY1llYXJWaWV3IH0gZnJvbSAnLi95ZWFyLXZpZXcnO1xuXG5cbi8qKlxuICogUG9zc2libGUgdmlld3MgZm9yIHRoZSBjYWxlbmRhci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IHR5cGUgTWNDYWxlbmRhclZpZXcgPSAnbW9udGgnIHwgJ3llYXInIHwgJ211bHRpLXllYXInO1xuXG4vKiogRGVmYXVsdCBoZWFkZXIgZm9yIE1jQ2FsZW5kYXIgKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtY2FsZW5kYXItaGVhZGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2NhbGVuZGFyLWhlYWRlci5odG1sJyxcbiAgICBleHBvcnRBczogJ21jQ2FsZW5kYXJIZWFkZXInLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWNDYWxlbmRhckhlYWRlcjxEPiB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpbnRsOiBNY0RhdGVwaWNrZXJJbnRsLFxuICAgICAgICAgICAgICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBNY0NhbGVuZGFyKSkgcHVibGljIGNhbGVuZGFyOiBNY0NhbGVuZGFyPEQ+LFxuICAgICAgICAgICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxuICAgICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfREFURV9GT1JNQVRTKSBwcml2YXRlIGRhdGVGb3JtYXRzOiBNY0RhdGVGb3JtYXRzLFxuICAgICAgICAgICAgICAgIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuXG4gICAgICAgIHRoaXMuY2FsZW5kYXIuc3RhdGVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiBjaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKSk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBsYWJlbCBmb3IgdGhlIGN1cnJlbnQgY2FsZW5kYXIgdmlldy4gKi9cbiAgICBnZXQgcGVyaW9kQnV0dG9uVGV4dCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5jYWxlbmRhci5jdXJyZW50VmlldyA9PT0gJ21vbnRoJykge1xuICAgICAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmRhdGVBZGFwdGVyXG4gICAgICAgICAgICAgICAgLmZvcm1hdCh0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUsIHRoaXMuZGF0ZUZvcm1hdHMuZGlzcGxheS5tb250aFllYXJMYWJlbCk7XG5cbiAgICAgICAgICAgIHJldHVybiBsYWJlbFswXS50b0xvY2FsZVVwcGVyQ2FzZSgpICsgbGFiZWwuc3Vic3RyKDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT09ICd5ZWFyJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhck5hbWUodGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFjdGl2ZVllYXIgPSB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIodGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlKTtcbiAgICAgICAgY29uc3QgZmlyc3RZZWFySW5WaWV3ID0gdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyTmFtZShcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1tYWdpYy1udW1iZXJzXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmNyZWF0ZURhdGUoYWN0aXZlWWVhciAtIGFjdGl2ZVllYXIgJSAyNCwgMCwgMSkpO1xuICAgICAgICBjb25zdCBsYXN0WWVhckluVmlldyA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhck5hbWUoXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbWFnaWMtbnVtYmVyc1xuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5jcmVhdGVEYXRlKGFjdGl2ZVllYXIgKyB5ZWFyc1BlclBhZ2UgLSAxIC0gYWN0aXZlWWVhciAlIDI0LCAwLCAxKSk7XG5cbiAgICAgICAgcmV0dXJuIGAke2ZpcnN0WWVhckluVmlld30gXFx1MjAxMyAke2xhc3RZZWFySW5WaWV3fWA7XG4gICAgfVxuXG4gICAgZ2V0IHBlcmlvZEJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3ID09PSAnbW9udGgnID9cbiAgICAgICAgICAgIHRoaXMuaW50bC5zd2l0Y2hUb011bHRpWWVhclZpZXdMYWJlbCA6IHRoaXMuaW50bC5zd2l0Y2hUb01vbnRoVmlld0xhYmVsO1xuICAgIH1cblxuICAgIC8qKiBUaGUgbGFiZWwgZm9yIHRoZSBwcmV2aW91cyBidXR0b24uICovXG4gICAgZ2V0IHByZXZCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbW9udGg6IHRoaXMuaW50bC5wcmV2TW9udGhMYWJlbCxcbiAgICAgICAgICAgIHllYXI6IHRoaXMuaW50bC5wcmV2WWVhckxhYmVsLFxuICAgICAgICAgICAgJ211bHRpLXllYXInOiB0aGlzLmludGwucHJldk11bHRpWWVhckxhYmVsXG4gICAgICAgIH1bdGhpcy5jYWxlbmRhci5jdXJyZW50Vmlld107XG4gICAgfVxuXG4gICAgLyoqIFRoZSBsYWJlbCBmb3IgdGhlIG5leHQgYnV0dG9uLiAqL1xuICAgIGdldCBuZXh0QnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1vbnRoOiB0aGlzLmludGwubmV4dE1vbnRoTGFiZWwsXG4gICAgICAgICAgICB5ZWFyOiB0aGlzLmludGwubmV4dFllYXJMYWJlbCxcbiAgICAgICAgICAgICdtdWx0aS15ZWFyJzogdGhpcy5pbnRsLm5leHRNdWx0aVllYXJMYWJlbFxuICAgICAgICB9W3RoaXMuY2FsZW5kYXIuY3VycmVudFZpZXddO1xuICAgIH1cblxuICAgIC8qKiBIYW5kbGVzIHVzZXIgY2xpY2tzIG9uIHRoZSBwZXJpb2QgbGFiZWwuICovXG4gICAgY3VycmVudFBlcmlvZENsaWNrZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPSB0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3ID09PSAnbW9udGgnID8gJ211bHRpLXllYXInIDogJ21vbnRoJztcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyB1c2VyIGNsaWNrcyBvbiB0aGUgcHJldmlvdXMgYnV0dG9uLiAqL1xuICAgIHByZXZpb3VzQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlID0gdGhpcy5jYWxlbmRhci5jdXJyZW50VmlldyA9PT0gJ21vbnRoJyA/XG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKHRoaXMuY2FsZW5kYXIuYWN0aXZlRGF0ZSwgLTEpIDpcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUsIHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT09ICd5ZWFyJyA/IC0xIDogLXllYXJzUGVyUGFnZVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyB1c2VyIGNsaWNrcyBvbiB0aGUgbmV4dCBidXR0b24uICovXG4gICAgbmV4dENsaWNrZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2FsZW5kYXIuYWN0aXZlRGF0ZSA9IHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT09ICdtb250aCcgP1xuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyh0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUsIDEpIDpcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUsXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5jdXJyZW50VmlldyA9PT0gJ3llYXInID8gMSA6IHllYXJzUGVyUGFnZVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgcHJldmlvdXMgcGVyaW9kIGJ1dHRvbiBpcyBlbmFibGVkLiAqL1xuICAgIHByZXZpb3VzRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCF0aGlzLmNhbGVuZGFyLm1pbkRhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICF0aGlzLmNhbGVuZGFyLm1pbkRhdGUgfHxcbiAgICAgICAgICAgICF0aGlzLmlzU2FtZVZpZXcodGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlLCB0aGlzLmNhbGVuZGFyLm1pbkRhdGUpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBuZXh0IHBlcmlvZCBidXR0b24gaXMgZW5hYmxlZC4gKi9cbiAgICBuZXh0RW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmNhbGVuZGFyLm1heERhdGUgfHxcbiAgICAgICAgICAgICF0aGlzLmlzU2FtZVZpZXcodGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlLCB0aGlzLmNhbGVuZGFyLm1heERhdGUpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSB0d28gZGF0ZXMgcmVwcmVzZW50IHRoZSBzYW1lIHZpZXcgaW4gdGhlIGN1cnJlbnQgdmlldyBtb2RlIChtb250aCBvciB5ZWFyKS4gKi9cbiAgICBwcml2YXRlIGlzU2FtZVZpZXcoZGF0ZTE6IEQsIGRhdGUyOiBEKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3ID09PSAnbW9udGgnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKGRhdGUxKSA9PT0gdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKGRhdGUyKSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TW9udGgoZGF0ZTEpID09PSB0aGlzLmRhdGVBZGFwdGVyLmdldE1vbnRoKGRhdGUyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jYWxlbmRhci5jdXJyZW50VmlldyA9PT0gJ3llYXInKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKGRhdGUxKSA9PT0gdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKGRhdGUyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE90aGVyd2lzZSB3ZSBhcmUgaW4gJ211bHRpLXllYXInIHZpZXcuXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcihkYXRlMSkgLyB5ZWFyc1BlclBhZ2UpID09PVxuICAgICAgICAgICAgTWF0aC5mbG9vcih0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIoZGF0ZTIpIC8geWVhcnNQZXJQYWdlKTtcbiAgICB9XG59XG5cbi8qKlxuICogQSBjYWxlbmRhciB0aGF0IGlzIHVzZWQgYXMgcGFydCBvZiB0aGUgZGF0ZXBpY2tlci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1jYWxlbmRhcicsXG4gICAgZXhwb3J0QXM6ICdtY0NhbGVuZGFyJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2NhbGVuZGFyLmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydjYWxlbmRhci5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWNhbGVuZGFyJ1xuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY0NhbGVuZGFyPEQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuXG4gICAgLyoqIEEgZGF0ZSByZXByZXNlbnRpbmcgdGhlIHBlcmlvZCAobW9udGggb3IgeWVhcikgdG8gc3RhcnQgdGhlIGNhbGVuZGFyIGluLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHN0YXJ0QXQoKTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnRBdDtcbiAgICB9XG5cbiAgICBzZXQgc3RhcnRBdCh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fc3RhcnRBdCA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcbiAgICB9XG5cbiAgICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNlbGVjdGVkKCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZCh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBtaW5pbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBtaW5EYXRlKCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbkRhdGU7XG4gICAgfVxuXG4gICAgc2V0IG1pbkRhdGUodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX21pbkRhdGUgPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBtYXhpbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBtYXhEYXRlKCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heERhdGU7XG4gICAgfVxuXG4gICAgc2V0IG1heERhdGUodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX21heERhdGUgPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgYWN0aXZlIGRhdGUuIFRoaXMgZGV0ZXJtaW5lcyB3aGljaCB0aW1lIHBlcmlvZCBpcyBzaG93biBhbmQgd2hpY2ggZGF0ZSBpc1xuICAgICAqIGhpZ2hsaWdodGVkIHdoZW4gdXNpbmcga2V5Ym9hcmQgbmF2aWdhdGlvbi5cbiAgICAgKi9cbiAgICBnZXQgYWN0aXZlRGF0ZSgpOiBEIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xhbXBlZEFjdGl2ZURhdGU7XG4gICAgfVxuXG4gICAgc2V0IGFjdGl2ZURhdGUodmFsdWU6IEQpIHtcbiAgICAgICAgdGhpcy5jbGFtcGVkQWN0aXZlRGF0ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIuY2xhbXBEYXRlKHZhbHVlLCB0aGlzLm1pbkRhdGUsIHRoaXMubWF4RGF0ZSk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgY2FsZW5kYXIgaXMgaW4gbW9udGggdmlldy4gKi9cbiAgICBnZXQgY3VycmVudFZpZXcoKTogTWNDYWxlbmRhclZpZXcge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFZpZXc7XG4gICAgfVxuXG4gICAgc2V0IGN1cnJlbnRWaWV3KHZhbHVlOiBNY0NhbGVuZGFyVmlldykge1xuICAgICAgICB0aGlzLl9jdXJyZW50VmlldyA9IHZhbHVlO1xuICAgICAgICB0aGlzLm1vdmVGb2N1c09uTmV4dFRpY2sgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKiBBbiBpbnB1dCBpbmRpY2F0aW5nIHRoZSB0eXBlIG9mIHRoZSBoZWFkZXIgY29tcG9uZW50LCBpZiBzZXQuICovXG4gICAgQElucHV0KCkgaGVhZGVyQ29tcG9uZW50OiBDb21wb25lbnRUeXBlPGFueT47XG5cbiAgICAvKiogQSBwb3J0YWwgY29udGFpbmluZyB0aGUgaGVhZGVyIGNvbXBvbmVudCB0eXBlIGZvciB0aGlzIGNhbGVuZGFyLiAqL1xuICAgIGNhbGVuZGFySGVhZGVyUG9ydGFsOiBQb3J0YWw8YW55PjtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBjYWxlbmRhciBzaG91bGQgYmUgc3RhcnRlZCBpbiBtb250aCBvciB5ZWFyIHZpZXcuICovXG4gICAgQElucHV0KCkgc3RhcnRWaWV3OiBNY0NhbGVuZGFyVmlldyA9ICdtb250aCc7XG5cbiAgICAvKiogRnVuY3Rpb24gdXNlZCB0byBmaWx0ZXIgd2hpY2ggZGF0ZXMgYXJlIHNlbGVjdGFibGUuICovXG4gICAgQElucHV0KCkgZGF0ZUZpbHRlcjogKGRhdGU6IEQpID0+IGJvb2xlYW47XG5cbiAgICAvKiogRnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBhZGQgY3VzdG9tIENTUyBjbGFzc2VzIHRvIGRhdGVzLiAqL1xuICAgIEBJbnB1dCgpIGRhdGVDbGFzczogKGRhdGU6IEQpID0+IE1jQ2FsZW5kYXJDZWxsQ3NzQ2xhc3NlcztcblxuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZSBjaGFuZ2VzLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3RlZENoYW5nZTogRXZlbnRFbWl0dGVyPEQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEPigpO1xuXG4gICAgLyoqXG4gICAgICogRW1pdHMgdGhlIHllYXIgY2hvc2VuIGluIG11bHRpeWVhciB2aWV3LlxuICAgICAqIFRoaXMgZG9lc24ndCBpbXBseSBhIGNoYW5nZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZS5cbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgeWVhclNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8RD4gPSBuZXcgRXZlbnRFbWl0dGVyPEQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyB0aGUgbW9udGggY2hvc2VuIGluIHllYXIgdmlldy5cbiAgICAgKiBUaGlzIGRvZXNuJ3QgaW1wbHkgYSBjaGFuZ2Ugb24gdGhlIHNlbGVjdGVkIGRhdGUuXG4gICAgICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IG1vbnRoU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxEPiA9IG5ldyBFdmVudEVtaXR0ZXI8RD4oKTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIGFueSBkYXRlIGlzIHNlbGVjdGVkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSB1c2VyU2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IG1vbnRoIHZpZXcgY29tcG9uZW50LiAqL1xuICAgIEBWaWV3Q2hpbGQoTWNNb250aFZpZXcsIHtzdGF0aWM6IGZhbHNlfSkgbW9udGhWaWV3OiBNY01vbnRoVmlldzxEPjtcblxuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgeWVhciB2aWV3IGNvbXBvbmVudC4gKi9cbiAgICBAVmlld0NoaWxkKE1jWWVhclZpZXcsIHtzdGF0aWM6IGZhbHNlfSkgeWVhclZpZXc6IE1jWWVhclZpZXc8RD47XG5cbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IG11bHRpLXllYXIgdmlldyBjb21wb25lbnQuICovXG4gICAgQFZpZXdDaGlsZChNY011bHRpWWVhclZpZXcsIHtzdGF0aWM6IGZhbHNlfSkgbXVsdGlZZWFyVmlldzogTWNNdWx0aVllYXJWaWV3PEQ+O1xuXG4gICAgLyoqXG4gICAgICogRW1pdHMgd2hlbmV2ZXIgdGhlcmUgaXMgYSBzdGF0ZSBjaGFuZ2UgdGhhdCB0aGUgaGVhZGVyIG1heSBuZWVkIHRvIHJlc3BvbmQgdG8uXG4gICAgICovXG4gICAgc3RhdGVDaGFuZ2VzID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIHByaXZhdGUgaW50bENoYW5nZXM6IFN1YnNjcmlwdGlvbjtcblxuICAgIC8qKlxuICAgICAqIFVzZWQgZm9yIHNjaGVkdWxpbmcgdGhhdCBmb2N1cyBzaG91bGQgYmUgbW92ZWQgdG8gdGhlIGFjdGl2ZSBjZWxsIG9uIHRoZSBuZXh0IHRpY2suXG4gICAgICogV2UgbmVlZCB0byBzY2hlZHVsZSBpdCwgcmF0aGVyIHRoYW4gZG8gaXQgaW1tZWRpYXRlbHksIGJlY2F1c2Ugd2UgaGF2ZSB0byB3YWl0XG4gICAgICogZm9yIEFuZ3VsYXIgdG8gcmUtZXZhbHVhdGUgdGhlIHZpZXcgY2hpbGRyZW4uXG4gICAgICovXG4gICAgcHJpdmF0ZSBtb3ZlRm9jdXNPbk5leHRUaWNrID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfc3RhcnRBdDogRCB8IG51bGw7XG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IEQgfCBudWxsO1xuICAgIHByaXZhdGUgX21pbkRhdGU6IEQgfCBudWxsO1xuICAgIHByaXZhdGUgX21heERhdGU6IEQgfCBudWxsO1xuICAgIHByaXZhdGUgY2xhbXBlZEFjdGl2ZURhdGU6IEQ7XG4gICAgcHJpdmF0ZSBfY3VycmVudFZpZXc6IE1jQ2FsZW5kYXJWaWV3O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGludGw6IE1jRGF0ZXBpY2tlckludGwsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1DX0RBVEVfRk9STUFUUykgcHJpdmF0ZSBkYXRlRm9ybWF0czogTWNEYXRlRm9ybWF0cyxcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGVBZGFwdGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcignRGF0ZUFkYXB0ZXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5kYXRlRm9ybWF0cykge1xuICAgICAgICAgICAgdGhyb3cgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IoJ01DX0RBVEVfRk9STUFUUycpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbnRsQ2hhbmdlcyA9IGludGwuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhckhlYWRlclBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwodGhpcy5oZWFkZXJDb21wb25lbnQgfHwgTWNDYWxlbmRhckhlYWRlcik7XG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuc3RhcnRBdCB8fCB0aGlzLmRhdGVBZGFwdGVyLnRvZGF5KCk7XG5cbiAgICAgICAgLy8gQXNzaWduIHRvIHRoZSBwcml2YXRlIHByb3BlcnR5IHNpbmNlIHdlIGRvbid0IHdhbnQgdG8gbW92ZSBmb2N1cyBvbiBpbml0LlxuICAgICAgICB0aGlzLl9jdXJyZW50VmlldyA9IHRoaXMuc3RhcnRWaWV3O1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMubW92ZUZvY3VzT25OZXh0VGljaykge1xuICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXNPbk5leHRUaWNrID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmZvY3VzQWN0aXZlQ2VsbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuaW50bENoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZSA9IGNoYW5nZXMubWluRGF0ZSB8fCBjaGFuZ2VzLm1heERhdGUgfHwgY2hhbmdlcy5kYXRlRmlsdGVyO1xuXG4gICAgICAgIGlmIChjaGFuZ2UgJiYgIWNoYW5nZS5maXJzdENoYW5nZSkge1xuICAgICAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuZ2V0Q3VycmVudFZpZXdDb21wb25lbnQoKTtcblxuICAgICAgICAgICAgaWYgKHZpZXcpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBuZWVkIHRvIGBkZXRlY3RDaGFuZ2VzYCBtYW51YWxseSBoZXJlLCBiZWNhdXNlIHRoZSBgbWluRGF0ZWAsIGBtYXhEYXRlYCBldGMuIGFyZVxuICAgICAgICAgICAgICAgIC8vIHBhc3NlZCBkb3duIHRvIHRoZSB2aWV3IHZpYSBkYXRhIGJpbmRpbmdzIHdoaWNoIHdvbid0IGJlIHVwLXRvLWRhdGUgd2hlbiB3ZSBjYWxsIGBpbml0YC5cbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB2aWV3LmluaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBmb2N1c0FjdGl2ZUNlbGwoKSB7XG4gICAgICAgIHRoaXMuZ2V0Q3VycmVudFZpZXdDb21wb25lbnQoKS5mb2N1c0FjdGl2ZUNlbGwoKTtcbiAgICB9XG5cbiAgICAvKiogVXBkYXRlcyB0b2RheSdzIGRhdGUgYWZ0ZXIgYW4gdXBkYXRlIG9mIHRoZSBhY3RpdmUgZGF0ZSAqL1xuICAgIHVwZGF0ZVRvZGF5c0RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLmN1cnJlbnRWaWV3ID09PSAnbW9udGgnID8gdGhpcy5tb250aFZpZXcgOlxuICAgICAgICAgICAgKHRoaXMuY3VycmVudFZpZXcgPT09ICd5ZWFyJyA/IHRoaXMueWVhclZpZXcgOiB0aGlzLm11bHRpWWVhclZpZXcpO1xuXG4gICAgICAgIHZpZXcubmdBZnRlckNvbnRlbnRJbml0KCk7XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMgZGF0ZSBzZWxlY3Rpb24gaW4gdGhlIG1vbnRoIHZpZXcuICovXG4gICAgZGF0ZVNlbGVjdGVkKGRhdGU6IEQpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGVBZGFwdGVyLnNhbWVEYXRlKGRhdGUsIHRoaXMuc2VsZWN0ZWQpKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQoZGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyB5ZWFyIHNlbGVjdGlvbiBpbiB0aGUgbXVsdGl5ZWFyIHZpZXcuICovXG4gICAgeWVhclNlbGVjdGVkSW5NdWx0aVllYXJWaWV3KG5vcm1hbGl6ZWRZZWFyOiBEKSB7XG4gICAgICAgIHRoaXMueWVhclNlbGVjdGVkLmVtaXQobm9ybWFsaXplZFllYXIpO1xuICAgIH1cblxuICAgIC8qKiBIYW5kbGVzIG1vbnRoIHNlbGVjdGlvbiBpbiB0aGUgeWVhciB2aWV3LiAqL1xuICAgIG1vbnRoU2VsZWN0ZWRJblllYXJWaWV3KG5vcm1hbGl6ZWRNb250aDogRCkge1xuICAgICAgICB0aGlzLm1vbnRoU2VsZWN0ZWQuZW1pdChub3JtYWxpemVkTW9udGgpO1xuICAgIH1cblxuICAgIHVzZXJTZWxlY3RlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51c2VyU2VsZWN0aW9uLmVtaXQoKTtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyB5ZWFyL21vbnRoIHNlbGVjdGlvbiBpbiB0aGUgbXVsdGkteWVhci95ZWFyIHZpZXdzLiAqL1xuICAgIGdvVG9EYXRlSW5WaWV3KGRhdGU6IEQsIHZpZXc6ICdtb250aCcgfCAneWVhcicgfCAnbXVsdGkteWVhcicpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gZGF0ZTtcbiAgICAgICAgdGhpcy5jdXJyZW50VmlldyA9IHZpZXc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIFRoZSBnaXZlbiBvYmplY3QgaWYgaXQgaXMgYm90aCBhIGRhdGUgaW5zdGFuY2UgYW5kIHZhbGlkLCBvdGhlcndpc2UgbnVsbC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFZhbGlkRGF0ZU9yTnVsbChvYmo6IGFueSk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmRhdGVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiYgdGhpcy5kYXRlQWRhcHRlci5pc1ZhbGlkKG9iaikpID8gb2JqIDogbnVsbDtcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyB0aGUgY29tcG9uZW50IGluc3RhbmNlIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIGN1cnJlbnQgY2FsZW5kYXIgdmlldy4gKi9cbiAgICBwcml2YXRlIGdldEN1cnJlbnRWaWV3Q29tcG9uZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb250aFZpZXcgfHwgdGhpcy55ZWFyVmlldyB8fCB0aGlzLm11bHRpWWVhclZpZXc7XG4gICAgfVxufVxuIl19