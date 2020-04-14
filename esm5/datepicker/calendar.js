/**
 * @fileoverview added by tsickle
 * Generated from: calendar.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
var McCalendarHeader = /** @class */ (function () {
    function McCalendarHeader(intl, calendar, dateAdapter, dateFormats, changeDetectorRef) {
        this.intl = intl;
        this.calendar = calendar;
        this.dateAdapter = dateAdapter;
        this.dateFormats = dateFormats;
        this.calendar.stateChanges.subscribe((/**
         * @return {?}
         */
        function () { return changeDetectorRef.markForCheck(); }));
    }
    Object.defineProperty(McCalendarHeader.prototype, "periodButtonText", {
        /** The label for the current calendar view. */
        get: /**
         * The label for the current calendar view.
         * @return {?}
         */
        function () {
            if (this.calendar.currentView === 'month') {
                /** @type {?} */
                var label = this.dateAdapter
                    .format(this.calendar.activeDate, this.dateFormats.display.monthYearLabel);
                return label[0].toLocaleUpperCase() + label.substr(1);
            }
            if (this.calendar.currentView === 'year') {
                return this.dateAdapter.getYearName(this.calendar.activeDate);
            }
            /** @type {?} */
            var activeYear = this.dateAdapter.getYear(this.calendar.activeDate);
            /** @type {?} */
            var firstYearInView = this.dateAdapter.getYearName(
            // tslint:disable-next-line:no-magic-numbers
            this.dateAdapter.createDate(activeYear - activeYear % 24, 0, 1));
            /** @type {?} */
            var lastYearInView = this.dateAdapter.getYearName(
            // tslint:disable-next-line:no-magic-numbers
            this.dateAdapter.createDate(activeYear + yearsPerPage - 1 - activeYear % 24, 0, 1));
            return firstYearInView + " \u2013 " + lastYearInView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCalendarHeader.prototype, "periodButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.calendar.currentView === 'month' ?
                this.intl.switchToMultiYearViewLabel : this.intl.switchToMonthViewLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCalendarHeader.prototype, "prevButtonLabel", {
        /** The label for the previous button. */
        get: /**
         * The label for the previous button.
         * @return {?}
         */
        function () {
            return {
                month: this.intl.prevMonthLabel,
                year: this.intl.prevYearLabel,
                'multi-year': this.intl.prevMultiYearLabel
            }[this.calendar.currentView];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCalendarHeader.prototype, "nextButtonLabel", {
        /** The label for the next button. */
        get: /**
         * The label for the next button.
         * @return {?}
         */
        function () {
            return {
                month: this.intl.nextMonthLabel,
                year: this.intl.nextYearLabel,
                'multi-year': this.intl.nextMultiYearLabel
            }[this.calendar.currentView];
        },
        enumerable: true,
        configurable: true
    });
    /** Handles user clicks on the period label. */
    /**
     * Handles user clicks on the period label.
     * @return {?}
     */
    McCalendarHeader.prototype.currentPeriodClicked = /**
     * Handles user clicks on the period label.
     * @return {?}
     */
    function () {
        this.calendar.currentView = this.calendar.currentView === 'month' ? 'multi-year' : 'month';
    };
    /** Handles user clicks on the previous button. */
    /**
     * Handles user clicks on the previous button.
     * @return {?}
     */
    McCalendarHeader.prototype.previousClicked = /**
     * Handles user clicks on the previous button.
     * @return {?}
     */
    function () {
        this.calendar.activeDate = this.calendar.currentView === 'month' ?
            this.dateAdapter.addCalendarMonths(this.calendar.activeDate, -1) :
            this.dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView === 'year' ? -1 : -yearsPerPage);
    };
    /** Handles user clicks on the next button. */
    /**
     * Handles user clicks on the next button.
     * @return {?}
     */
    McCalendarHeader.prototype.nextClicked = /**
     * Handles user clicks on the next button.
     * @return {?}
     */
    function () {
        this.calendar.activeDate = this.calendar.currentView === 'month' ?
            this.dateAdapter.addCalendarMonths(this.calendar.activeDate, 1) :
            this.dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView === 'year' ? 1 : yearsPerPage);
    };
    /** Whether the previous period button is enabled. */
    /**
     * Whether the previous period button is enabled.
     * @return {?}
     */
    McCalendarHeader.prototype.previousEnabled = /**
     * Whether the previous period button is enabled.
     * @return {?}
     */
    function () {
        if (!this.calendar.minDate) {
            return true;
        }
        return !this.calendar.minDate ||
            !this.isSameView(this.calendar.activeDate, this.calendar.minDate);
    };
    /** Whether the next period button is enabled. */
    /**
     * Whether the next period button is enabled.
     * @return {?}
     */
    McCalendarHeader.prototype.nextEnabled = /**
     * Whether the next period button is enabled.
     * @return {?}
     */
    function () {
        return !this.calendar.maxDate ||
            !this.isSameView(this.calendar.activeDate, this.calendar.maxDate);
    };
    /** Whether the two dates represent the same view in the current view mode (month or year). */
    /**
     * Whether the two dates represent the same view in the current view mode (month or year).
     * @private
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    McCalendarHeader.prototype.isSameView = /**
     * Whether the two dates represent the same view in the current view mode (month or year).
     * @private
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    function (date1, date2) {
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
    };
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
    McCalendarHeader.ctorParameters = function () { return [
        { type: McDatepickerIntl },
        { type: McCalendar, decorators: [{ type: Inject, args: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return McCalendar; })),] }] },
        { type: DateAdapter, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_DATE_FORMATS,] }] },
        { type: ChangeDetectorRef }
    ]; };
    return McCalendarHeader;
}());
export { McCalendarHeader };
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
var McCalendar = /** @class */ (function () {
    function McCalendar(intl, dateAdapter, dateFormats, changeDetectorRef) {
        var _this = this;
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
        function () {
            changeDetectorRef.markForCheck();
            _this.stateChanges.next();
        }));
    }
    Object.defineProperty(McCalendar.prototype, "startAt", {
        /** A date representing the period (month or year) to start the calendar in. */
        get: /**
         * A date representing the period (month or year) to start the calendar in.
         * @return {?}
         */
        function () {
            return this._startAt;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._startAt = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCalendar.prototype, "selected", {
        /** The currently selected date. */
        get: /**
         * The currently selected date.
         * @return {?}
         */
        function () {
            return this._selected;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._selected = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCalendar.prototype, "minDate", {
        /** The minimum selectable date. */
        get: /**
         * The minimum selectable date.
         * @return {?}
         */
        function () {
            return this._minDate;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._minDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCalendar.prototype, "maxDate", {
        /** The maximum selectable date. */
        get: /**
         * The maximum selectable date.
         * @return {?}
         */
        function () {
            return this._maxDate;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._maxDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCalendar.prototype, "activeDate", {
        /**
         * The current active date. This determines which time period is shown and which date is
         * highlighted when using keyboard navigation.
         */
        get: /**
         * The current active date. This determines which time period is shown and which date is
         * highlighted when using keyboard navigation.
         * @return {?}
         */
        function () {
            return this.clampedActiveDate;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.clampedActiveDate = this.dateAdapter.clampDate(value, this.minDate, this.maxDate);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCalendar.prototype, "currentView", {
        /** Whether the calendar is in month view. */
        get: /**
         * Whether the calendar is in month view.
         * @return {?}
         */
        function () {
            return this._currentView;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._currentView = value;
            this.moveFocusOnNextTick = true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McCalendar.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.calendarHeaderPortal = new ComponentPortal(this.headerComponent || McCalendarHeader);
        this.activeDate = this.startAt || this.dateAdapter.today();
        // Assign to the private property since we don't want to move focus on init.
        this._currentView = this.startView;
    };
    /**
     * @return {?}
     */
    McCalendar.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        if (this.moveFocusOnNextTick) {
            this.moveFocusOnNextTick = false;
            this.focusActiveCell();
        }
    };
    /**
     * @return {?}
     */
    McCalendar.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.intlChanges.unsubscribe();
        this.stateChanges.complete();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    McCalendar.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var change = changes.minDate || changes.maxDate || changes.dateFilter;
        if (change && !change.firstChange) {
            /** @type {?} */
            var view = this.getCurrentViewComponent();
            if (view) {
                // We need to `detectChanges` manually here, because the `minDate`, `maxDate` etc. are
                // passed down to the view via data bindings which won't be up-to-date when we call `init`.
                this.changeDetectorRef.detectChanges();
                view.init();
            }
        }
        this.stateChanges.next();
    };
    /**
     * @return {?}
     */
    McCalendar.prototype.focusActiveCell = /**
     * @return {?}
     */
    function () {
        this.getCurrentViewComponent().focusActiveCell();
    };
    /** Updates today's date after an update of the active date */
    /**
     * Updates today's date after an update of the active date
     * @return {?}
     */
    McCalendar.prototype.updateTodaysDate = /**
     * Updates today's date after an update of the active date
     * @return {?}
     */
    function () {
        /** @type {?} */
        var view = this.currentView === 'month' ? this.monthView :
            (this.currentView === 'year' ? this.yearView : this.multiYearView);
        view.ngAfterContentInit();
    };
    /** Handles date selection in the month view. */
    /**
     * Handles date selection in the month view.
     * @param {?} date
     * @return {?}
     */
    McCalendar.prototype.dateSelected = /**
     * Handles date selection in the month view.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (!this.dateAdapter.sameDate(date, this.selected)) {
            this.selectedChange.emit(date);
        }
    };
    /** Handles year selection in the multiyear view. */
    /**
     * Handles year selection in the multiyear view.
     * @param {?} normalizedYear
     * @return {?}
     */
    McCalendar.prototype.yearSelectedInMultiYearView = /**
     * Handles year selection in the multiyear view.
     * @param {?} normalizedYear
     * @return {?}
     */
    function (normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    };
    /** Handles month selection in the year view. */
    /**
     * Handles month selection in the year view.
     * @param {?} normalizedMonth
     * @return {?}
     */
    McCalendar.prototype.monthSelectedInYearView = /**
     * Handles month selection in the year view.
     * @param {?} normalizedMonth
     * @return {?}
     */
    function (normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    };
    /**
     * @return {?}
     */
    McCalendar.prototype.userSelected = /**
     * @return {?}
     */
    function () {
        this.userSelection.emit();
    };
    /** Handles year/month selection in the multi-year/year views. */
    /**
     * Handles year/month selection in the multi-year/year views.
     * @param {?} date
     * @param {?} view
     * @return {?}
     */
    McCalendar.prototype.goToDateInView = /**
     * Handles year/month selection in the multi-year/year views.
     * @param {?} date
     * @param {?} view
     * @return {?}
     */
    function (date, view) {
        this.activeDate = date;
        this.currentView = view;
    };
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    McCalendar.prototype.getValidDateOrNull = /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    function (obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    };
    /** Returns the component instance that corresponds to the current calendar view. */
    /**
     * Returns the component instance that corresponds to the current calendar view.
     * @private
     * @return {?}
     */
    McCalendar.prototype.getCurrentViewComponent = /**
     * Returns the component instance that corresponds to the current calendar view.
     * @private
     * @return {?}
     */
    function () {
        return this.monthView || this.yearView || this.multiYearView;
    };
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
                    styles: [".mc-calendar{display:block}.mc-calendar__header{padding:8px 8px 0}.mc-calendar__content{padding:0 8px 8px;outline:0}.mc-calendar__controls{display:flex;margin:5% calc(33% / 7 - 16px)}.mc-calendar-spacer{flex:1 1 auto}.mc-calendar__period-button{min-width:0}.mc-calendar__previous-button::after{border-left-width:2px;transform:translateX(2px) rotate(-45deg)}.mc-calendar__next-button::after{border-right-width:2px;transform:translateX(-2px) rotate(45deg)}.mc-calendar__table{border-spacing:0;border-collapse:collapse;width:100%}.mc-calendar__table-header th{text-align:center;padding:0 0 8px}.mc-calendar__table-header-divider{position:relative;height:1px}.mc-calendar__table-header-divider::after{content:'';position:absolute;top:0;left:-8px;right:-8px;height:1px}"]
                }] }
    ];
    /** @nocollapse */
    McCalendar.ctorParameters = function () { return [
        { type: McDatepickerIntl },
        { type: DateAdapter, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_DATE_FORMATS,] }] },
        { type: ChangeDetectorRef }
    ]; };
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
    return McCalendar;
}());
export { McCalendar };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbImNhbGVuZGFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBeUIsTUFBTSxxQkFBcUIsQ0FBQztBQUM3RSxPQUFPLEVBR0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEVBRU4sU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBaUIsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RixPQUFPLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUc3QyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7Ozs7QUFVekM7SUFRSSwwQkFBb0IsSUFBc0IsRUFDZSxRQUF1QixFQUNoRCxXQUEyQixFQUNGLFdBQTBCLEVBQ3ZFLGlCQUFvQztRQUo1QixTQUFJLEdBQUosSUFBSSxDQUFrQjtRQUNlLGFBQVEsR0FBUixRQUFRLENBQWU7UUFDaEQsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQ0YsZ0JBQVcsR0FBWCxXQUFXLENBQWU7UUFHL0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsU0FBUzs7O1FBQUMsY0FBTSxPQUFBLGlCQUFpQixD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N0MsZ0NBQTBDOzs7OztJQUcxQywrQkFBMEQ7Ozs7O0lBRzFELG9DQUEyRTs7Ozs7O0lBTTNFLGtDQUF5RTs7Ozs7O0lBTXpFLG1DQUEwRTs7Ozs7SUFHMUUsbUNBQWdGOzs7OztJQUdoRiwrQkFBbUU7Ozs7O0lBR25FLDhCQUFnRTs7Ozs7SUFHaEUsbUNBQStFOzs7OztJQUsvRSxrQ0FBbUM7Ozs7O0lBRW5DLGlDQUFrQzs7Ozs7Ozs7SUFPbEMseUNBQW9DOzs7OztJQUNwQyw4QkFBMkI7Ozs7O0lBQzNCLCtCQUE0Qjs7Ozs7SUFDNUIsOEJBQTJCOzs7OztJQUMzQiw4QkFBMkI7Ozs7O0lBQzNCLHVDQUE2Qjs7Ozs7SUFDN0Isa0NBQXFDOzs7OztJQUlqQyxpQ0FBK0M7Ozs7O0lBQy9DLGlDQUF1RTs7Ozs7SUFDdkUsdUNBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsLCBDb21wb25lbnRUeXBlLCBQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdDaGVja2VkLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciwgTUNfREFURV9GT1JNQVRTLCBNY0RhdGVGb3JtYXRzIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2RhdGV0aW1lJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBNY0NhbGVuZGFyQ2VsbENzc0NsYXNzZXMgfSBmcm9tICcuL2NhbGVuZGFyLWJvZHknO1xuaW1wb3J0IHsgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IgfSBmcm9tICcuL2RhdGVwaWNrZXItZXJyb3JzJztcbmltcG9ydCB7IE1jRGF0ZXBpY2tlckludGwgfSBmcm9tICcuL2RhdGVwaWNrZXItaW50bCc7XG5pbXBvcnQgeyBNY01vbnRoVmlldyB9IGZyb20gJy4vbW9udGgtdmlldyc7XG5pbXBvcnQgeyBNY011bHRpWWVhclZpZXcsIHllYXJzUGVyUGFnZSB9IGZyb20gJy4vbXVsdGkteWVhci12aWV3JztcbmltcG9ydCB7IE1jWWVhclZpZXcgfSBmcm9tICcuL3llYXItdmlldyc7XG5cblxuLyoqXG4gKiBQb3NzaWJsZSB2aWV3cyBmb3IgdGhlIGNhbGVuZGFyLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgdHlwZSBNY0NhbGVuZGFyVmlldyA9ICdtb250aCcgfCAneWVhcicgfCAnbXVsdGkteWVhcic7XG5cbi8qKiBEZWZhdWx0IGhlYWRlciBmb3IgTWNDYWxlbmRhciAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1jYWxlbmRhci1oZWFkZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnY2FsZW5kYXItaGVhZGVyLmh0bWwnLFxuICAgIGV4cG9ydEFzOiAnbWNDYWxlbmRhckhlYWRlcicsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY0NhbGVuZGFySGVhZGVyPEQ+IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGludGw6IE1jRGF0ZXBpY2tlckludGwsXG4gICAgICAgICAgICAgICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE1jQ2FsZW5kYXIpKSBwdWJsaWMgY2FsZW5kYXI6IE1jQ2FsZW5kYXI8RD4sXG4gICAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXG4gICAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQ19EQVRFX0ZPUk1BVFMpIHByaXZhdGUgZGF0ZUZvcm1hdHM6IE1jRGF0ZUZvcm1hdHMsXG4gICAgICAgICAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG5cbiAgICAgICAgdGhpcy5jYWxlbmRhci5zdGF0ZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IGNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpKTtcbiAgICB9XG5cbiAgICAvKiogVGhlIGxhYmVsIGZvciB0aGUgY3VycmVudCBjYWxlbmRhciB2aWV3LiAqL1xuICAgIGdldCBwZXJpb2RCdXR0b25UZXh0KCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3ID09PSAnbW9udGgnKSB7XG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuZGF0ZUFkYXB0ZXJcbiAgICAgICAgICAgICAgICAuZm9ybWF0KHRoaXMuY2FsZW5kYXIuYWN0aXZlRGF0ZSwgdGhpcy5kYXRlRm9ybWF0cy5kaXNwbGF5Lm1vbnRoWWVhckxhYmVsKTtcblxuICAgICAgICAgICAgcmV0dXJuIGxhYmVsWzBdLnRvTG9jYWxlVXBwZXJDYXNlKCkgKyBsYWJlbC5zdWJzdHIoMSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jYWxlbmRhci5jdXJyZW50VmlldyA9PT0gJ3llYXInKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyTmFtZSh0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYWN0aXZlWWVhciA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUpO1xuICAgICAgICBjb25zdCBmaXJzdFllYXJJblZpZXcgPSB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXJOYW1lKFxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnNcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZShhY3RpdmVZZWFyIC0gYWN0aXZlWWVhciAlIDI0LCAwLCAxKSk7XG4gICAgICAgIGNvbnN0IGxhc3RZZWFySW5WaWV3ID0gdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyTmFtZShcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1tYWdpYy1udW1iZXJzXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmNyZWF0ZURhdGUoYWN0aXZlWWVhciArIHllYXJzUGVyUGFnZSAtIDEgLSBhY3RpdmVZZWFyICUgMjQsIDAsIDEpKTtcblxuICAgICAgICByZXR1cm4gYCR7Zmlyc3RZZWFySW5WaWV3fSBcXHUyMDEzICR7bGFzdFllYXJJblZpZXd9YDtcbiAgICB9XG5cbiAgICBnZXQgcGVyaW9kQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT09ICdtb250aCcgP1xuICAgICAgICAgICAgdGhpcy5pbnRsLnN3aXRjaFRvTXVsdGlZZWFyVmlld0xhYmVsIDogdGhpcy5pbnRsLnN3aXRjaFRvTW9udGhWaWV3TGFiZWw7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBsYWJlbCBmb3IgdGhlIHByZXZpb3VzIGJ1dHRvbi4gKi9cbiAgICBnZXQgcHJldkJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtb250aDogdGhpcy5pbnRsLnByZXZNb250aExhYmVsLFxuICAgICAgICAgICAgeWVhcjogdGhpcy5pbnRsLnByZXZZZWFyTGFiZWwsXG4gICAgICAgICAgICAnbXVsdGkteWVhcic6IHRoaXMuaW50bC5wcmV2TXVsdGlZZWFyTGFiZWxcbiAgICAgICAgfVt0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3XTtcbiAgICB9XG5cbiAgICAvKiogVGhlIGxhYmVsIGZvciB0aGUgbmV4dCBidXR0b24uICovXG4gICAgZ2V0IG5leHRCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbW9udGg6IHRoaXMuaW50bC5uZXh0TW9udGhMYWJlbCxcbiAgICAgICAgICAgIHllYXI6IHRoaXMuaW50bC5uZXh0WWVhckxhYmVsLFxuICAgICAgICAgICAgJ211bHRpLXllYXInOiB0aGlzLmludGwubmV4dE11bHRpWWVhckxhYmVsXG4gICAgICAgIH1bdGhpcy5jYWxlbmRhci5jdXJyZW50Vmlld107XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMgdXNlciBjbGlja3Mgb24gdGhlIHBlcmlvZCBsYWJlbC4gKi9cbiAgICBjdXJyZW50UGVyaW9kQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhci5jdXJyZW50VmlldyA9IHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT09ICdtb250aCcgPyAnbXVsdGkteWVhcicgOiAnbW9udGgnO1xuICAgIH1cblxuICAgIC8qKiBIYW5kbGVzIHVzZXIgY2xpY2tzIG9uIHRoZSBwcmV2aW91cyBidXR0b24uICovXG4gICAgcHJldmlvdXNDbGlja2VkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUgPSB0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3ID09PSAnbW9udGgnID9cbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHModGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlLCAtMSkgOlxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKFxuICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIuYWN0aXZlRGF0ZSwgdGhpcy5jYWxlbmRhci5jdXJyZW50VmlldyA9PT0gJ3llYXInID8gLTEgOiAteWVhcnNQZXJQYWdlXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKiBIYW5kbGVzIHVzZXIgY2xpY2tzIG9uIHRoZSBuZXh0IGJ1dHRvbi4gKi9cbiAgICBuZXh0Q2xpY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlID0gdGhpcy5jYWxlbmRhci5jdXJyZW50VmlldyA9PT0gJ21vbnRoJyA/XG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKHRoaXMuY2FsZW5kYXIuYWN0aXZlRGF0ZSwgMSkgOlxuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKFxuICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIuYWN0aXZlRGF0ZSxcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3ID09PSAneWVhcicgPyAxIDogeWVhcnNQZXJQYWdlXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBwcmV2aW91cyBwZXJpb2QgYnV0dG9uIGlzIGVuYWJsZWQuICovXG4gICAgcHJldmlvdXNFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIXRoaXMuY2FsZW5kYXIubWluRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gIXRoaXMuY2FsZW5kYXIubWluRGF0ZSB8fFxuICAgICAgICAgICAgIXRoaXMuaXNTYW1lVmlldyh0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUsIHRoaXMuY2FsZW5kYXIubWluRGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIG5leHQgcGVyaW9kIGJ1dHRvbiBpcyBlbmFibGVkLiAqL1xuICAgIG5leHRFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuY2FsZW5kYXIubWF4RGF0ZSB8fFxuICAgICAgICAgICAgIXRoaXMuaXNTYW1lVmlldyh0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUsIHRoaXMuY2FsZW5kYXIubWF4RGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHR3byBkYXRlcyByZXByZXNlbnQgdGhlIHNhbWUgdmlldyBpbiB0aGUgY3VycmVudCB2aWV3IG1vZGUgKG1vbnRoIG9yIHllYXIpLiAqL1xuICAgIHByaXZhdGUgaXNTYW1lVmlldyhkYXRlMTogRCwgZGF0ZTI6IEQpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT09ICdtb250aCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIoZGF0ZTEpID09PSB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIoZGF0ZTIpICYmXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5nZXRNb250aChkYXRlMSkgPT09IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TW9udGgoZGF0ZTIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3ID09PSAneWVhcicpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIoZGF0ZTEpID09PSB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIoZGF0ZTIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIHdlIGFyZSBpbiAnbXVsdGkteWVhcicgdmlldy5cbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKGRhdGUxKSAvIHllYXJzUGVyUGFnZSkgPT09XG4gICAgICAgICAgICBNYXRoLmZsb29yKHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcihkYXRlMikgLyB5ZWFyc1BlclBhZ2UpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBBIGNhbGVuZGFyIHRoYXQgaXMgdXNlZCBhcyBwYXJ0IG9mIHRoZSBkYXRlcGlja2VyLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLWNhbGVuZGFyJyxcbiAgICBleHBvcnRBczogJ21jQ2FsZW5kYXInLFxuICAgIHRlbXBsYXRlVXJsOiAnY2FsZW5kYXIuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2NhbGVuZGFyLnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtY2FsZW5kYXInXG4gICAgfSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1jQ2FsZW5kYXI8RD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG5cbiAgICAvKiogQSBkYXRlIHJlcHJlc2VudGluZyB0aGUgcGVyaW9kIChtb250aCBvciB5ZWFyKSB0byBzdGFydCB0aGUgY2FsZW5kYXIgaW4uICovXG4gICAgQElucHV0KClcbiAgICBnZXQgc3RhcnRBdCgpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGFydEF0O1xuICAgIH1cblxuICAgIHNldCBzdGFydEF0KHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9zdGFydEF0ID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgc2VsZWN0ZWQoKTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkKHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcbiAgICB9XG5cbiAgICAvKiogVGhlIG1pbmltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1pbkRhdGUoKTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgbWluRGF0ZSh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbWluRGF0ZSA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcbiAgICB9XG5cbiAgICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1heERhdGUoKTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgbWF4RGF0ZSh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbWF4RGF0ZSA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBhY3RpdmUgZGF0ZS4gVGhpcyBkZXRlcm1pbmVzIHdoaWNoIHRpbWUgcGVyaW9kIGlzIHNob3duIGFuZCB3aGljaCBkYXRlIGlzXG4gICAgICogaGlnaGxpZ2h0ZWQgd2hlbiB1c2luZyBrZXlib2FyZCBuYXZpZ2F0aW9uLlxuICAgICAqL1xuICAgIGdldCBhY3RpdmVEYXRlKCk6IEQge1xuICAgICAgICByZXR1cm4gdGhpcy5jbGFtcGVkQWN0aXZlRGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgYWN0aXZlRGF0ZSh2YWx1ZTogRCkge1xuICAgICAgICB0aGlzLmNsYW1wZWRBY3RpdmVEYXRlID0gdGhpcy5kYXRlQWRhcHRlci5jbGFtcERhdGUodmFsdWUsIHRoaXMubWluRGF0ZSwgdGhpcy5tYXhEYXRlKTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBjYWxlbmRhciBpcyBpbiBtb250aCB2aWV3LiAqL1xuICAgIGdldCBjdXJyZW50VmlldygpOiBNY0NhbGVuZGFyVmlldyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50VmlldztcbiAgICB9XG5cbiAgICBzZXQgY3VycmVudFZpZXcodmFsdWU6IE1jQ2FsZW5kYXJWaWV3KSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRWaWV3ID0gdmFsdWU7XG4gICAgICAgIHRoaXMubW92ZUZvY3VzT25OZXh0VGljayA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqIEFuIGlucHV0IGluZGljYXRpbmcgdGhlIHR5cGUgb2YgdGhlIGhlYWRlciBjb21wb25lbnQsIGlmIHNldC4gKi9cbiAgICBASW5wdXQoKSBoZWFkZXJDb21wb25lbnQ6IENvbXBvbmVudFR5cGU8YW55PjtcblxuICAgIC8qKiBBIHBvcnRhbCBjb250YWluaW5nIHRoZSBoZWFkZXIgY29tcG9uZW50IHR5cGUgZm9yIHRoaXMgY2FsZW5kYXIuICovXG4gICAgY2FsZW5kYXJIZWFkZXJQb3J0YWw6IFBvcnRhbDxhbnk+O1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGNhbGVuZGFyIHNob3VsZCBiZSBzdGFydGVkIGluIG1vbnRoIG9yIHllYXIgdmlldy4gKi9cbiAgICBASW5wdXQoKSBzdGFydFZpZXc6IE1jQ2FsZW5kYXJWaWV3ID0gJ21vbnRoJztcblxuICAgIC8qKiBGdW5jdGlvbiB1c2VkIHRvIGZpbHRlciB3aGljaCBkYXRlcyBhcmUgc2VsZWN0YWJsZS4gKi9cbiAgICBASW5wdXQoKSBkYXRlRmlsdGVyOiAoZGF0ZTogRCkgPT4gYm9vbGVhbjtcblxuICAgIC8qKiBGdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGFkZCBjdXN0b20gQ1NTIGNsYXNzZXMgdG8gZGF0ZXMuICovXG4gICAgQElucHV0KCkgZGF0ZUNsYXNzOiAoZGF0ZTogRCkgPT4gTWNDYWxlbmRhckNlbGxDc3NDbGFzc2VzO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlIGNoYW5nZXMuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RD4gPSBuZXcgRXZlbnRFbWl0dGVyPEQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyB0aGUgeWVhciBjaG9zZW4gaW4gbXVsdGl5ZWFyIHZpZXcuXG4gICAgICogVGhpcyBkb2Vzbid0IGltcGx5IGEgY2hhbmdlIG9uIHRoZSBzZWxlY3RlZCBkYXRlLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSB5ZWFyU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxEPiA9IG5ldyBFdmVudEVtaXR0ZXI8RD4oKTtcblxuICAgIC8qKlxuICAgICAqIEVtaXRzIHRoZSBtb250aCBjaG9zZW4gaW4geWVhciB2aWV3LlxuICAgICAqIFRoaXMgZG9lc24ndCBpbXBseSBhIGNoYW5nZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZS5cbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgbW9udGhTZWxlY3RlZDogRXZlbnRFbWl0dGVyPEQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEPigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gYW55IGRhdGUgaXMgc2VsZWN0ZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHVzZXJTZWxlY3Rpb246IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgbW9udGggdmlldyBjb21wb25lbnQuICovXG4gICAgQFZpZXdDaGlsZChNY01vbnRoVmlldywge3N0YXRpYzogZmFsc2V9KSBtb250aFZpZXc6IE1jTW9udGhWaWV3PEQ+O1xuXG4gICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgY3VycmVudCB5ZWFyIHZpZXcgY29tcG9uZW50LiAqL1xuICAgIEBWaWV3Q2hpbGQoTWNZZWFyVmlldywge3N0YXRpYzogZmFsc2V9KSB5ZWFyVmlldzogTWNZZWFyVmlldzxEPjtcblxuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgbXVsdGkteWVhciB2aWV3IGNvbXBvbmVudC4gKi9cbiAgICBAVmlld0NoaWxkKE1jTXVsdGlZZWFyVmlldywge3N0YXRpYzogZmFsc2V9KSBtdWx0aVllYXJWaWV3OiBNY011bHRpWWVhclZpZXc8RD47XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyB3aGVuZXZlciB0aGVyZSBpcyBhIHN0YXRlIGNoYW5nZSB0aGF0IHRoZSBoZWFkZXIgbWF5IG5lZWQgdG8gcmVzcG9uZCB0by5cbiAgICAgKi9cbiAgICBzdGF0ZUNoYW5nZXMgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgcHJpdmF0ZSBpbnRsQ2hhbmdlczogU3Vic2NyaXB0aW9uO1xuXG4gICAgLyoqXG4gICAgICogVXNlZCBmb3Igc2NoZWR1bGluZyB0aGF0IGZvY3VzIHNob3VsZCBiZSBtb3ZlZCB0byB0aGUgYWN0aXZlIGNlbGwgb24gdGhlIG5leHQgdGljay5cbiAgICAgKiBXZSBuZWVkIHRvIHNjaGVkdWxlIGl0LCByYXRoZXIgdGhhbiBkbyBpdCBpbW1lZGlhdGVseSwgYmVjYXVzZSB3ZSBoYXZlIHRvIHdhaXRcbiAgICAgKiBmb3IgQW5ndWxhciB0byByZS1ldmFsdWF0ZSB0aGUgdmlldyBjaGlsZHJlbi5cbiAgICAgKi9cbiAgICBwcml2YXRlIG1vdmVGb2N1c09uTmV4dFRpY2sgPSBmYWxzZTtcbiAgICBwcml2YXRlIF9zdGFydEF0OiBEIHwgbnVsbDtcbiAgICBwcml2YXRlIF9zZWxlY3RlZDogRCB8IG51bGw7XG4gICAgcHJpdmF0ZSBfbWluRGF0ZTogRCB8IG51bGw7XG4gICAgcHJpdmF0ZSBfbWF4RGF0ZTogRCB8IG51bGw7XG4gICAgcHJpdmF0ZSBjbGFtcGVkQWN0aXZlRGF0ZTogRDtcbiAgICBwcml2YXRlIF9jdXJyZW50VmlldzogTWNDYWxlbmRhclZpZXc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgaW50bDogTWNEYXRlcGlja2VySW50bCxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfREFURV9GT1JNQVRTKSBwcml2YXRlIGRhdGVGb3JtYXRzOiBNY0RhdGVGb3JtYXRzLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkge1xuICAgICAgICBpZiAoIXRoaXMuZGF0ZUFkYXB0ZXIpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdEYXRlQWRhcHRlcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmRhdGVGb3JtYXRzKSB7XG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcignTUNfREFURV9GT1JNQVRTJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmludGxDaGFuZ2VzID0gaW50bC5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLmNhbGVuZGFySGVhZGVyUG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbCh0aGlzLmhlYWRlckNvbXBvbmVudCB8fCBNY0NhbGVuZGFySGVhZGVyKTtcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5zdGFydEF0IHx8IHRoaXMuZGF0ZUFkYXB0ZXIudG9kYXkoKTtcblxuICAgICAgICAvLyBBc3NpZ24gdG8gdGhlIHByaXZhdGUgcHJvcGVydHkgc2luY2Ugd2UgZG9uJ3Qgd2FudCB0byBtb3ZlIGZvY3VzIG9uIGluaXQuXG4gICAgICAgIHRoaXMuX2N1cnJlbnRWaWV3ID0gdGhpcy5zdGFydFZpZXc7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgICAgICBpZiAodGhpcy5tb3ZlRm9jdXNPbk5leHRUaWNrKSB7XG4gICAgICAgICAgICB0aGlzLm1vdmVGb2N1c09uTmV4dFRpY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNBY3RpdmVDZWxsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5pbnRsQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlID0gY2hhbmdlcy5taW5EYXRlIHx8IGNoYW5nZXMubWF4RGF0ZSB8fCBjaGFuZ2VzLmRhdGVGaWx0ZXI7XG5cbiAgICAgICAgaWYgKGNoYW5nZSAmJiAhY2hhbmdlLmZpcnN0Q2hhbmdlKSB7XG4gICAgICAgICAgICBjb25zdCB2aWV3ID0gdGhpcy5nZXRDdXJyZW50Vmlld0NvbXBvbmVudCgpO1xuXG4gICAgICAgICAgICBpZiAodmlldykge1xuICAgICAgICAgICAgICAgIC8vIFdlIG5lZWQgdG8gYGRldGVjdENoYW5nZXNgIG1hbnVhbGx5IGhlcmUsIGJlY2F1c2UgdGhlIGBtaW5EYXRlYCwgYG1heERhdGVgIGV0Yy4gYXJlXG4gICAgICAgICAgICAgICAgLy8gcGFzc2VkIGRvd24gdG8gdGhlIHZpZXcgdmlhIGRhdGEgYmluZGluZ3Mgd2hpY2ggd29uJ3QgYmUgdXAtdG8tZGF0ZSB3aGVuIHdlIGNhbGwgYGluaXRgLlxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgICAgIHZpZXcuaW5pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIGZvY3VzQWN0aXZlQ2VsbCgpIHtcbiAgICAgICAgdGhpcy5nZXRDdXJyZW50Vmlld0NvbXBvbmVudCgpLmZvY3VzQWN0aXZlQ2VsbCgpO1xuICAgIH1cblxuICAgIC8qKiBVcGRhdGVzIHRvZGF5J3MgZGF0ZSBhZnRlciBhbiB1cGRhdGUgb2YgdGhlIGFjdGl2ZSBkYXRlICovXG4gICAgdXBkYXRlVG9kYXlzRGF0ZSgpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuY3VycmVudFZpZXcgPT09ICdtb250aCcgPyB0aGlzLm1vbnRoVmlldyA6XG4gICAgICAgICAgICAodGhpcy5jdXJyZW50VmlldyA9PT0gJ3llYXInID8gdGhpcy55ZWFyVmlldyA6IHRoaXMubXVsdGlZZWFyVmlldyk7XG5cbiAgICAgICAgdmlldy5uZ0FmdGVyQ29udGVudEluaXQoKTtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyBkYXRlIHNlbGVjdGlvbiBpbiB0aGUgbW9udGggdmlldy4gKi9cbiAgICBkYXRlU2VsZWN0ZWQoZGF0ZTogRCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZGF0ZUFkYXB0ZXIuc2FtZURhdGUoZGF0ZSwgdGhpcy5zZWxlY3RlZCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChkYXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBIYW5kbGVzIHllYXIgc2VsZWN0aW9uIGluIHRoZSBtdWx0aXllYXIgdmlldy4gKi9cbiAgICB5ZWFyU2VsZWN0ZWRJbk11bHRpWWVhclZpZXcobm9ybWFsaXplZFllYXI6IEQpIHtcbiAgICAgICAgdGhpcy55ZWFyU2VsZWN0ZWQuZW1pdChub3JtYWxpemVkWWVhcik7XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMgbW9udGggc2VsZWN0aW9uIGluIHRoZSB5ZWFyIHZpZXcuICovXG4gICAgbW9udGhTZWxlY3RlZEluWWVhclZpZXcobm9ybWFsaXplZE1vbnRoOiBEKSB7XG4gICAgICAgIHRoaXMubW9udGhTZWxlY3RlZC5lbWl0KG5vcm1hbGl6ZWRNb250aCk7XG4gICAgfVxuXG4gICAgdXNlclNlbGVjdGVkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVzZXJTZWxlY3Rpb24uZW1pdCgpO1xuICAgIH1cblxuICAgIC8qKiBIYW5kbGVzIHllYXIvbW9udGggc2VsZWN0aW9uIGluIHRoZSBtdWx0aS15ZWFyL3llYXIgdmlld3MuICovXG4gICAgZ29Ub0RhdGVJblZpZXcoZGF0ZTogRCwgdmlldzogJ21vbnRoJyB8ICd5ZWFyJyB8ICdtdWx0aS15ZWFyJyk6IHZvaWQge1xuICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSBkYXRlO1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWV3ID0gdmlldztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMgVGhlIGdpdmVuIG9iamVjdCBpZiBpdCBpcyBib3RoIGEgZGF0ZSBpbnN0YW5jZSBhbmQgdmFsaWQsIG90aGVyd2lzZSBudWxsLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0VmFsaWREYXRlT3JOdWxsKG9iajogYW55KTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gKHRoaXMuZGF0ZUFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJiB0aGlzLmRhdGVBZGFwdGVyLmlzVmFsaWQob2JqKSkgPyBvYmogOiBudWxsO1xuICAgIH1cblxuICAgIC8qKiBSZXR1cm5zIHRoZSBjb21wb25lbnQgaW5zdGFuY2UgdGhhdCBjb3JyZXNwb25kcyB0byB0aGUgY3VycmVudCBjYWxlbmRhciB2aWV3LiAqL1xuICAgIHByaXZhdGUgZ2V0Q3VycmVudFZpZXdDb21wb25lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vbnRoVmlldyB8fCB0aGlzLnllYXJWaWV3IHx8IHRoaXMubXVsdGlZZWFyVmlldztcbiAgICB9XG59XG4iXX0=