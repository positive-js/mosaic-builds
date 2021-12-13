import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Inject, Input, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { DateAdapter, MC_DATE_FORMATS } from '@ptsecurity/cdk/datetime';
import { Subject } from 'rxjs';
import { createMissingDateImplError } from './datepicker-errors';
import { McDatepickerIntl } from './datepicker-intl';
import { McMonthView } from './month-view.component';
import { McMultiYearView, yearsPerPage } from './multi-year-view.component';
import { McYearView } from './year-view.component';
import * as i0 from "@angular/core";
import * as i1 from "./datepicker-intl";
import * as i2 from "@ptsecurity/cdk/datetime";
import * as i3 from "@ptsecurity/mosaic/button";
import * as i4 from "@ptsecurity/mosaic/icon";
import * as i5 from "./month-view.component";
import * as i6 from "./year-view.component";
import * as i7 from "./multi-year-view.component";
import * as i8 from "@angular/cdk/portal";
import * as i9 from "@angular/common";
/**
 * Possible views for the calendar.
 * @docs-private
 */
export var McCalendarView;
(function (McCalendarView) {
    McCalendarView["Month"] = "month";
    McCalendarView["Year"] = "year";
    McCalendarView["MultiYear"] = "multi-year";
})(McCalendarView || (McCalendarView = {}));
/** Default header for McCalendar */
export class McCalendarHeader {
    constructor(intl, calendar, dateAdapter, dateFormats, changeDetectorRef) {
        this.intl = intl;
        this.calendar = calendar;
        this.dateAdapter = dateAdapter;
        this.dateFormats = dateFormats;
        this.calendar.stateChanges.subscribe(() => changeDetectorRef.markForCheck());
    }
    /** The label for the current calendar view. */
    get periodButtonText() {
        if (this.calendar.currentView === McCalendarView.Month) {
            const label = this.dateAdapter.format(this.calendar.activeDate, this.dateFormats.monthYearLabel);
            return (label[0].toLocaleUpperCase() + label.substr(1)).replace('.', '');
        }
        if (this.calendar.currentView === McCalendarView.Year) {
            return this.dateAdapter.getYearName(this.calendar.activeDate);
        }
        const activeYear = this.dateAdapter.getYear(this.calendar.activeDate);
        const firstYearInView = this.dateAdapter.getYearName(
        // tslint:disable-next-line:no-magic-numbers
        this.dateAdapter.createDate(activeYear - activeYear % 24));
        const lastYearInView = this.dateAdapter.getYearName(
        // tslint:disable-next-line:no-magic-numbers
        this.dateAdapter.createDate(activeYear + yearsPerPage - 1 - activeYear % 24));
        return `${firstYearInView} \u2013 ${lastYearInView}`;
    }
    get periodButtonLabel() {
        return this.calendar.currentView === McCalendarView.Month ?
            this.intl.switchToMultiYearViewLabel : this.intl.switchToMonthViewLabel;
    }
    /** The label for the previous button. */
    get prevButtonLabel() {
        return {
            [McCalendarView.Month]: this.intl.prevMonthLabel,
            [McCalendarView.Year]: this.intl.prevYearLabel,
            [McCalendarView.MultiYear]: this.intl.prevMultiYearLabel
        }[this.calendar.currentView];
    }
    /** The label for the next button. */
    get nextButtonLabel() {
        return {
            [McCalendarView.Month]: this.intl.nextMonthLabel,
            [McCalendarView.Year]: this.intl.nextYearLabel,
            [McCalendarView.MultiYear]: this.intl.nextMultiYearLabel
        }[this.calendar.currentView];
    }
    /** Handles user clicks on the period label. */
    currentPeriodClicked() {
        if ([McCalendarView.Month, McCalendarView.MultiYear].includes(this.calendar.currentView)) {
            this.calendar.currentView = McCalendarView.Year;
        }
        else if (this.calendar.currentView === McCalendarView.Year) {
            this.calendar.currentView = McCalendarView.Month;
        }
    }
    /** Handles user clicks on the previous button. */
    previousClicked() {
        if (this.calendar.currentView === McCalendarView.Month) {
            this.calendar.activeDate = this.dateAdapter.addCalendarMonths(this.calendar.activeDate, -1);
        }
        else {
            this.calendar.activeDate = this.dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView === McCalendarView.Year ? -1 : -yearsPerPage);
        }
    }
    /** Handles user clicks on the next button. */
    nextClicked() {
        if (this.calendar.currentView === McCalendarView.Month) {
            this.calendar.activeDate = this.dateAdapter.addCalendarMonths(this.calendar.activeDate, 1);
        }
        else {
            this.calendar.activeDate = this.dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView === McCalendarView.Year ? 1 : yearsPerPage);
        }
    }
    /** Whether the previous period button is enabled. */
    previousEnabled() {
        if (!this.calendar.minDate) {
            return true;
        }
        return !this.calendar.minDate || !this.isSameView(this.calendar.activeDate, this.calendar.minDate);
    }
    /** Whether the next period button is enabled. */
    nextEnabled() {
        return !this.calendar.maxDate || !this.isSameView(this.calendar.activeDate, this.calendar.maxDate);
    }
    /** Whether the two dates represent the same view in the current view mode (month or year). */
    isSameView(firstDate, secondDate) {
        const firstYear = this.dateAdapter.getYear(firstDate);
        const secondYear = this.dateAdapter.getYear(secondDate);
        const firstMonth = this.dateAdapter.getMonth(firstDate);
        const secondMonth = this.dateAdapter.getMonth(secondDate);
        if (this.calendar.currentView === McCalendarView.Month) {
            return firstYear === secondYear && firstMonth === secondMonth;
        }
        if (this.calendar.currentView === McCalendarView.Year) {
            return firstYear === secondYear;
        }
        // Otherwise we are in 'multi-year' view.
        return Math.floor(firstYear / yearsPerPage) === Math.floor(secondYear / yearsPerPage);
    }
}
/** @nocollapse */ McCalendarHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McCalendarHeader, deps: [{ token: i1.McDatepickerIntl }, { token: forwardRef(() => McCalendar) }, { token: i2.DateAdapter, optional: true }, { token: MC_DATE_FORMATS, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McCalendarHeader.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McCalendarHeader, selector: "mc-calendar-header", host: { classAttribute: "mc-calendar-header" }, exportAs: ["mcCalendarHeader"], ngImport: i0, template: "<button mc-button\n        [tabindex]=\"'-1'\"\n        class=\"mc-button_transparent mc-calendar__period-button\"\n        (click)=\"currentPeriodClicked()\">\n    {{ periodButtonText }}\n\n    <i class=\"mc mc-icon\"\n       [class.mc-angle-up-M_16]=\"calendar.currentView !== 'month'\"\n       [class.mc-angle-down-M_16]=\"calendar.currentView === 'month'\">\n    </i>\n</button>\n\n<div class=\"mc-calendar-spacer\"></div>\n\n<button mc-button\n        [tabindex]=\"'-1'\"\n        class=\"mc-button_transparent mc-calendar__previous-button\"\n        [disabled]=\"!previousEnabled()\"\n        (click)=\"previousClicked()\">\n\n    <i mc-icon=\"mc-angle-left-L_16\"></i>\n</button>\n\n<button mc-button\n        [tabindex]=\"'-1'\"\n        class=\"mc-button_transparent mc-calendar__next-button\"\n        [disabled]=\"!nextEnabled()\"\n        (click)=\"nextClicked()\">\n\n    <i mc-icon=\"mc-angle-right-L_16\"></i>\n</button>\n", components: [{ type: i3.McButton, selector: "[mc-button]", inputs: ["color", "tabIndex", "disabled"] }, { type: i4.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i3.McButtonCssStyler, selector: "[mc-button]" }, { type: i4.McIconCSSStyler, selector: "[mc-icon]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McCalendarHeader, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-calendar-header',
                    templateUrl: 'calendar-header.html',
                    exportAs: 'mcCalendarHeader',
                    host: {
                        class: 'mc-calendar-header'
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.McDatepickerIntl }, { type: McCalendar, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => McCalendar)]
                }] }, { type: i2.DateAdapter, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MC_DATE_FORMATS]
                }] }, { type: i0.ChangeDetectorRef }]; } });
/**
 * A calendar that is used as part of the datepicker.
 * @docs-private
 */
export class McCalendar {
    constructor(intl, dateAdapter, dateFormats, changeDetectorRef) {
        this.dateAdapter = dateAdapter;
        this.dateFormats = dateFormats;
        this.changeDetectorRef = changeDetectorRef;
        /** Whether the calendar should be started in month or year view. */
        this.startView = McCalendarView.Month;
        /** Emits when the currently selected date changes. */
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
        /** Emits when any date is selected. */
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
        this.intlChanges = intl.changes.subscribe(() => {
            changeDetectorRef.markForCheck();
            this.stateChanges.next();
        });
    }
    /** A date representing the period (month or year) to start the calendar in. */
    get startAt() {
        return this._startAt;
    }
    set startAt(value) {
        this._startAt = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
    }
    /** The currently selected date. */
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
    }
    /** The minimum selectable date. */
    get minDate() {
        return this._minDate;
    }
    set minDate(value) {
        this._minDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
    }
    /** The maximum selectable date. */
    get maxDate() {
        return this._maxDate;
    }
    set maxDate(value) {
        this._maxDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
    }
    /**
     * The current active date. This determines which time period is shown and which date is
     * highlighted when using keyboard navigation.
     */
    get activeDate() {
        return this.clampedActiveDate;
    }
    set activeDate(value) {
        this.clampedActiveDate = this.dateAdapter.clampDate(value, this.minDate, this.maxDate);
        this.stateChanges.next();
    }
    /** Whether the calendar is in month view. */
    get currentView() {
        return this._currentView;
    }
    set currentView(value) {
        this._currentView = value;
        this.moveFocusOnNextTick = true;
    }
    ngAfterContentInit() {
        this.calendarHeaderPortal = new ComponentPortal(this.headerComponent || McCalendarHeader);
        this.activeDate = this.startAt || this.dateAdapter.today();
        // Assign to the private property since we don't want to move focus on init.
        this._currentView = this.startView;
    }
    ngAfterViewChecked() {
        if (this.moveFocusOnNextTick) {
            this.moveFocusOnNextTick = false;
            this.focusActiveCell();
        }
    }
    ngOnDestroy() {
        this.intlChanges.unsubscribe();
        this.stateChanges.complete();
    }
    ngOnChanges(changes) {
        const change = changes.minDate || changes.maxDate || changes.dateFilter;
        if (change && !change.firstChange) {
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
    focusActiveCell() {
        this.getCurrentViewComponent().focusActiveCell();
    }
    /** Updates today's date after an update of the active date */
    updateTodaysDate() {
        const view = this.currentView === McCalendarView.Month ? this.monthView :
            (this.currentView === McCalendarView.Year ? this.yearView : this.multiYearView);
        view.ngAfterContentInit();
    }
    /** Handles date selection in the month view. */
    dateSelected(date) {
        if (!this.dateAdapter.sameDate(date, this.selected)) {
            this.selectedChange.emit(date);
        }
    }
    /** Handles year selection in the multiyear view. */
    yearSelectedInMultiYearView(normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    }
    /** Handles month selection in the year view. */
    monthSelectedInYearView(normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    }
    userSelected() {
        this.userSelection.emit();
    }
    /** Handles year/month selection in the multi-year/year views. */
    goToDateInView(date, view) {
        this.activeDate = date;
        this.currentView = view;
    }
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    getValidDateOrNull(obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    }
    /** Returns the component instance that corresponds to the current calendar view. */
    getCurrentViewComponent() {
        return this.monthView || this.yearView || this.multiYearView;
    }
}
/** @nocollapse */ McCalendar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McCalendar, deps: [{ token: i1.McDatepickerIntl }, { token: i2.DateAdapter, optional: true }, { token: MC_DATE_FORMATS, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McCalendar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McCalendar, selector: "mc-calendar", inputs: { startAt: "startAt", selected: "selected", minDate: "minDate", maxDate: "maxDate", headerComponent: "headerComponent", startView: "startView", dateFilter: "dateFilter", dateClass: "dateClass" }, outputs: { selectedChange: "selectedChange", yearSelected: "yearSelected", monthSelected: "monthSelected", userSelection: "userSelection" }, host: { classAttribute: "mc-calendar" }, viewQueries: [{ propertyName: "monthView", first: true, predicate: McMonthView, descendants: true }, { propertyName: "yearView", first: true, predicate: McYearView, descendants: true }, { propertyName: "multiYearView", first: true, predicate: McMultiYearView, descendants: true }], exportAs: ["mcCalendar"], usesOnChanges: true, ngImport: i0, template: "<ng-template [cdkPortalOutlet]=\"calendarHeaderPortal\"></ng-template>\n\n<div class=\"mc-calendar__content\" [ngSwitch]=\"currentView\">\n    <mc-month-view\n        *ngSwitchCase=\"'month'\"\n        [(activeDate)]=\"activeDate\"\n        [selected]=\"selected\"\n        [dateFilter]=\"dateFilter\"\n        [maxDate]=\"maxDate\"\n        [minDate]=\"minDate\"\n        [dateClass]=\"dateClass\"\n        (selectedChange)=\"dateSelected($event!)\"\n        (userSelection)=\"userSelected()\">\n    </mc-month-view>\n\n    <mc-year-view\n        *ngSwitchCase=\"'year'\"\n        [(activeDate)]=\"activeDate\"\n        [selected]=\"selected\"\n        [dateFilter]=\"dateFilter\"\n        [maxDate]=\"maxDate\"\n        [minDate]=\"minDate\"\n        (monthSelected)=\"monthSelectedInYearView($event)\"\n        (selectedChange)=\"goToDateInView($event, 'multi-year')\">\n    </mc-year-view>\n\n    <mc-multi-year-view\n        *ngSwitchCase=\"'multi-year'\"\n        [(activeDate)]=\"activeDate\"\n        [selected]=\"selected\"\n        [dateFilter]=\"dateFilter\"\n        [maxDate]=\"maxDate\"\n        [minDate]=\"minDate\"\n        (yearSelected)=\"yearSelectedInMultiYearView($event)\"\n        (selectedChange)=\"goToDateInView($event, 'month')\">\n    </mc-multi-year-view>\n</div>\n", styles: [".mc-calendar{display:block}.mc-calendar-header{display:flex;padding:16px 8px 12px;padding:var(--mc-datepicker-calendar-size-padding-top, 16px) var(--mc-datepicker-calendar-size-padding-horizontal, 8px) var(--mc-datepicker-calendar-size-padding-blocks, 12px) var(--mc-datepicker-calendar-size-padding-horizontal, 8px)}.mc-calendar__content{padding:0 8px 8px;padding:0 var(--mc-datepicker-calendar-size-padding-horizontal, 8px) var(--mc-datepicker-calendar-size-padding-horizontal, 8px) var(--mc-datepicker-calendar-size-padding-horizontal, 8px);outline:none}.mc-calendar-spacer{flex:1 1 auto}.mc-calendar__period-button{min-width:0}.mc-calendar__period-button .mc-icon{vertical-align:baseline}.mc-calendar__previous-button:after{border-left-width:2px;border-left-width:var(--mc-datepicker-calendar-size-icon-border-width, 2px);transform:translate(2px) rotate(-45deg);transform:var(--mc-datepicker-calendar-size-icon-prev-icon-transform, translateX(2px) rotate(-45deg))}.mc-calendar__next-button:after{border-right-width:2px;border-right-width:var(--mc-datepicker-calendar-size-icon-border-width, 2px);transform:translate(-2px) rotate(45deg);transform:var(--mc-datepicker-calendar-size-icon-nex-icon-transform, translateX(-2px) rotate(45deg))}.mc-calendar__table{border-spacing:0;border-collapse:collapse;width:100%}.mc-calendar__table-header th{text-align:center;height:30px}.mc-calendar__table-header th.mc-calendar__table-header-divider{position:relative;height:calc(12px - 2px);height:calc(var(--mc-datepicker-calendar-size-padding-blocks, 12px) - 2px)}.mc-calendar__table-header th.mc-calendar__table-header-divider:after{content:\"\";position:absolute;top:0;left:calc(-1 * 8px);left:calc(-1 * var(--mc-datepicker-calendar-size-padding-horizontal, 8px));right:calc(-1 * 8px);right:calc(-1 * var(--mc-datepicker-calendar-size-padding-horizontal, 8px));height:1px;height:var(--mc-datepicker-calendar-size-divider-width, 1px)}\n"], components: [{ type: i5.McMonthView, selector: "mc-month-view", inputs: ["activeDate", "selected", "minDate", "maxDate", "dateFilter", "dateClass"], outputs: ["selectedChange", "userSelection", "activeDateChange"], exportAs: ["mcMonthView"] }, { type: i6.McYearView, selector: "mc-year-view", inputs: ["activeDate", "selected", "minDate", "maxDate", "dateFilter"], outputs: ["selectedChange", "monthSelected", "activeDateChange"], exportAs: ["mcYearView"] }, { type: i7.McMultiYearView, selector: "mc-multi-year-view", inputs: ["activeDate", "selected", "minDate", "maxDate", "dateFilter"], outputs: ["selectedChange", "yearSelected", "activeDateChange"], exportAs: ["mcMultiYearView"] }], directives: [{ type: i8.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }, { type: i9.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i9.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McCalendar, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-calendar',
                    exportAs: 'mcCalendar',
                    templateUrl: 'calendar.html',
                    styleUrls: ['calendar.scss'],
                    host: {
                        class: 'mc-calendar'
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.McDatepickerIntl }, { type: i2.DateAdapter, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MC_DATE_FORMATS]
                }] }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { startAt: [{
                type: Input
            }], selected: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], headerComponent: [{
                type: Input
            }], startView: [{
                type: Input
            }], dateFilter: [{
                type: Input
            }], dateClass: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], yearSelected: [{
                type: Output
            }], monthSelected: [{
                type: Output
            }], userSelection: [{
                type: Output
            }], monthView: [{
                type: ViewChild,
                args: [McMonthView, { static: false }]
            }], yearView: [{
                type: ViewChild,
                args: [McYearView, { static: false }]
            }], multiYearView: [{
                type: ViewChild,
                args: [McMultiYearView, { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2RhdGVwaWNrZXIvY2FsZW5kYXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2RhdGVwaWNrZXIvY2FsZW5kYXItaGVhZGVyLmh0bWwiLCIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvZGF0ZXBpY2tlci9jYWxlbmRhci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQXlCLE1BQU0scUJBQXFCLENBQUM7QUFDN0UsT0FBTyxFQUdILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQWlCLE1BQU0sMEJBQTBCLENBQUM7QUFDdkYsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFHN0MsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDckQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDNUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7Ozs7Ozs7OztBQUduRDs7O0dBR0c7QUFDSCxNQUFNLENBQU4sSUFBWSxjQUlYO0FBSkQsV0FBWSxjQUFjO0lBQ3RCLGlDQUFlLENBQUE7SUFDZiwrQkFBYSxDQUFBO0lBQ2IsMENBQXdC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QUN0QixXQUFXLEVBQUUsZUFBZTtvQkFDNUIsU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDO29CQUM1QixJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLGFBQWE7cUJBQ3ZCO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDbEQ7OzBCQWtJUSxRQUFROzswQkFDUixRQUFROzswQkFBSSxNQUFNOzJCQUFDLGVBQWU7NEVBOUhuQyxPQUFPO3NCQURWLEtBQUs7Z0JBV0YsUUFBUTtzQkFEWCxLQUFLO2dCQVdGLE9BQU87c0JBRFYsS0FBSztnQkFXRixPQUFPO3NCQURWLEtBQUs7Z0JBaUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBTUcsU0FBUztzQkFBakIsS0FBSztnQkFHRyxVQUFVO3NCQUFsQixLQUFLO2dCQUdHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBR2EsY0FBYztzQkFBaEMsTUFBTTtnQkFNWSxZQUFZO3NCQUE5QixNQUFNO2dCQU1ZLGFBQWE7c0JBQS9CLE1BQU07Z0JBR1ksYUFBYTtzQkFBL0IsTUFBTTtnQkFHa0MsU0FBUztzQkFBakQsU0FBUzt1QkFBQyxXQUFXLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDO2dCQUdDLFFBQVE7c0JBQS9DLFNBQVM7dUJBQUMsVUFBVSxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQztnQkFHTyxhQUFhO3NCQUF6RCxTQUFTO3VCQUFDLGVBQWUsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRQb3J0YWwsIENvbXBvbmVudFR5cGUsIFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0NoZWNrZWQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGVBZGFwdGVyLCBNQ19EQVRFX0ZPUk1BVFMsIE1jRGF0ZUZvcm1hdHMgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvZGF0ZXRpbWUnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE1jQ2FsZW5kYXJDZWxsQ3NzQ2xhc3NlcyB9IGZyb20gJy4vY2FsZW5kYXItYm9keS5jb21wb25lbnQnO1xuaW1wb3J0IHsgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IgfSBmcm9tICcuL2RhdGVwaWNrZXItZXJyb3JzJztcbmltcG9ydCB7IE1jRGF0ZXBpY2tlckludGwgfSBmcm9tICcuL2RhdGVwaWNrZXItaW50bCc7XG5pbXBvcnQgeyBNY01vbnRoVmlldyB9IGZyb20gJy4vbW9udGgtdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWNNdWx0aVllYXJWaWV3LCB5ZWFyc1BlclBhZ2UgfSBmcm9tICcuL211bHRpLXllYXItdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWNZZWFyVmlldyB9IGZyb20gJy4veWVhci12aWV3LmNvbXBvbmVudCc7XG5cblxuLyoqXG4gKiBQb3NzaWJsZSB2aWV3cyBmb3IgdGhlIGNhbGVuZGFyLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZW51bSBNY0NhbGVuZGFyVmlldyB7XG4gICAgTW9udGggPSAnbW9udGgnLFxuICAgIFllYXIgPSAneWVhcicsXG4gICAgTXVsdGlZZWFyID0gJ211bHRpLXllYXInXG59XG5cbi8qKiBEZWZhdWx0IGhlYWRlciBmb3IgTWNDYWxlbmRhciAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1jYWxlbmRhci1oZWFkZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnY2FsZW5kYXItaGVhZGVyLmh0bWwnLFxuICAgIGV4cG9ydEFzOiAnbWNDYWxlbmRhckhlYWRlcicsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWNhbGVuZGFyLWhlYWRlcidcbiAgICB9LFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWNDYWxlbmRhckhlYWRlcjxEPiB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgaW50bDogTWNEYXRlcGlja2VySW50bCxcbiAgICAgICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE1jQ2FsZW5kYXIpKSBwdWJsaWMgY2FsZW5kYXI6IE1jQ2FsZW5kYXI8RD4sXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcmVhZG9ubHkgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1DX0RBVEVfRk9STUFUUykgcHJpdmF0ZSByZWFkb25seSBkYXRlRm9ybWF0czogTWNEYXRlRm9ybWF0cyxcbiAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY2FsZW5kYXIuc3RhdGVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiBjaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKSk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBsYWJlbCBmb3IgdGhlIGN1cnJlbnQgY2FsZW5kYXIgdmlldy4gKi9cbiAgICBnZXQgcGVyaW9kQnV0dG9uVGV4dCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5jYWxlbmRhci5jdXJyZW50VmlldyA9PT0gTWNDYWxlbmRhclZpZXcuTW9udGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5kYXRlQWRhcHRlci5mb3JtYXQodGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlLCB0aGlzLmRhdGVGb3JtYXRzLm1vbnRoWWVhckxhYmVsKTtcblxuICAgICAgICAgICAgcmV0dXJuIChsYWJlbFswXS50b0xvY2FsZVVwcGVyQ2FzZSgpICsgbGFiZWwuc3Vic3RyKDEpKS5yZXBsYWNlKCcuJywgJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT09IE1jQ2FsZW5kYXJWaWV3LlllYXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXJOYW1lKHRoaXMuY2FsZW5kYXIuYWN0aXZlRGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhY3RpdmVZZWFyID0gdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuY2FsZW5kYXIuYWN0aXZlRGF0ZSk7XG4gICAgICAgIGNvbnN0IGZpcnN0WWVhckluVmlldyA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhck5hbWUoXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbWFnaWMtbnVtYmVyc1xuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5jcmVhdGVEYXRlKGFjdGl2ZVllYXIgLSBhY3RpdmVZZWFyICUgMjQpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGxhc3RZZWFySW5WaWV3ID0gdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyTmFtZShcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1tYWdpYy1udW1iZXJzXG4gICAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmNyZWF0ZURhdGUoYWN0aXZlWWVhciArIHllYXJzUGVyUGFnZSAtIDEgLSBhY3RpdmVZZWFyICUgMjQpXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIGAke2ZpcnN0WWVhckluVmlld30gXFx1MjAxMyAke2xhc3RZZWFySW5WaWV3fWA7XG4gICAgfVxuXG4gICAgZ2V0IHBlcmlvZEJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3ID09PSBNY0NhbGVuZGFyVmlldy5Nb250aCA/XG4gICAgICAgICAgICB0aGlzLmludGwuc3dpdGNoVG9NdWx0aVllYXJWaWV3TGFiZWwgOiB0aGlzLmludGwuc3dpdGNoVG9Nb250aFZpZXdMYWJlbDtcbiAgICB9XG5cbiAgICAvKiogVGhlIGxhYmVsIGZvciB0aGUgcHJldmlvdXMgYnV0dG9uLiAqL1xuICAgIGdldCBwcmV2QnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIFtNY0NhbGVuZGFyVmlldy5Nb250aF06IHRoaXMuaW50bC5wcmV2TW9udGhMYWJlbCxcbiAgICAgICAgICAgIFtNY0NhbGVuZGFyVmlldy5ZZWFyXTogdGhpcy5pbnRsLnByZXZZZWFyTGFiZWwsXG4gICAgICAgICAgICBbTWNDYWxlbmRhclZpZXcuTXVsdGlZZWFyXTogdGhpcy5pbnRsLnByZXZNdWx0aVllYXJMYWJlbFxuICAgICAgICB9W3RoaXMuY2FsZW5kYXIuY3VycmVudFZpZXddO1xuICAgIH1cblxuICAgIC8qKiBUaGUgbGFiZWwgZm9yIHRoZSBuZXh0IGJ1dHRvbi4gKi9cbiAgICBnZXQgbmV4dEJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBbTWNDYWxlbmRhclZpZXcuTW9udGhdOiB0aGlzLmludGwubmV4dE1vbnRoTGFiZWwsXG4gICAgICAgICAgICBbTWNDYWxlbmRhclZpZXcuWWVhcl06IHRoaXMuaW50bC5uZXh0WWVhckxhYmVsLFxuICAgICAgICAgICAgW01jQ2FsZW5kYXJWaWV3Lk11bHRpWWVhcl06IHRoaXMuaW50bC5uZXh0TXVsdGlZZWFyTGFiZWxcbiAgICAgICAgfVt0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3XTtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyB1c2VyIGNsaWNrcyBvbiB0aGUgcGVyaW9kIGxhYmVsLiAqL1xuICAgIGN1cnJlbnRQZXJpb2RDbGlja2VkKCk6IHZvaWQge1xuICAgICAgICBpZiAoKFtNY0NhbGVuZGFyVmlldy5Nb250aCwgTWNDYWxlbmRhclZpZXcuTXVsdGlZZWFyXSBhcyBNY0NhbGVuZGFyVmlld1tdKS5pbmNsdWRlcyh0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3KSkge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5jdXJyZW50VmlldyA9IE1jQ2FsZW5kYXJWaWV3LlllYXI7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jYWxlbmRhci5jdXJyZW50VmlldyA9PT0gTWNDYWxlbmRhclZpZXcuWWVhcikge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5jdXJyZW50VmlldyA9IE1jQ2FsZW5kYXJWaWV3Lk1vbnRoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMgdXNlciBjbGlja3Mgb24gdGhlIHByZXZpb3VzIGJ1dHRvbi4gKi9cbiAgICBwcmV2aW91c0NsaWNrZWQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3ID09PSBNY0NhbGVuZGFyVmlldy5Nb250aCkge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlID0gdGhpcy5kYXRlQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyh0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUsIC0xKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIuYWN0aXZlRGF0ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUsXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5jdXJyZW50VmlldyA9PT0gTWNDYWxlbmRhclZpZXcuWWVhciA/IC0xIDogLXllYXJzUGVyUGFnZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBIYW5kbGVzIHVzZXIgY2xpY2tzIG9uIHRoZSBuZXh0IGJ1dHRvbi4gKi9cbiAgICBuZXh0Q2xpY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT09IE1jQ2FsZW5kYXJWaWV3Lk1vbnRoKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKHRoaXMuY2FsZW5kYXIuYWN0aXZlRGF0ZSwgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnMoXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlLFxuICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT09IE1jQ2FsZW5kYXJWaWV3LlllYXIgPyAxIDogeWVhcnNQZXJQYWdlXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHByZXZpb3VzIHBlcmlvZCBidXR0b24gaXMgZW5hYmxlZC4gKi9cbiAgICBwcmV2aW91c0VuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghdGhpcy5jYWxlbmRhci5taW5EYXRlKSB7IHJldHVybiB0cnVlOyB9XG5cbiAgICAgICAgcmV0dXJuICF0aGlzLmNhbGVuZGFyLm1pbkRhdGUgfHwgIXRoaXMuaXNTYW1lVmlldyh0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUsIHRoaXMuY2FsZW5kYXIubWluRGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIG5leHQgcGVyaW9kIGJ1dHRvbiBpcyBlbmFibGVkLiAqL1xuICAgIG5leHRFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuY2FsZW5kYXIubWF4RGF0ZSB8fCAhdGhpcy5pc1NhbWVWaWV3KHRoaXMuY2FsZW5kYXIuYWN0aXZlRGF0ZSwgdGhpcy5jYWxlbmRhci5tYXhEYXRlKTtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgdHdvIGRhdGVzIHJlcHJlc2VudCB0aGUgc2FtZSB2aWV3IGluIHRoZSBjdXJyZW50IHZpZXcgbW9kZSAobW9udGggb3IgeWVhcikuICovXG4gICAgcHJpdmF0ZSBpc1NhbWVWaWV3KGZpcnN0RGF0ZTogRCwgc2Vjb25kRGF0ZTogRCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBmaXJzdFllYXIgPSB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIoZmlyc3REYXRlKTtcbiAgICAgICAgY29uc3Qgc2Vjb25kWWVhciA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcihzZWNvbmREYXRlKTtcblxuICAgICAgICBjb25zdCBmaXJzdE1vbnRoID0gdGhpcy5kYXRlQWRhcHRlci5nZXRNb250aChmaXJzdERhdGUpO1xuICAgICAgICBjb25zdCBzZWNvbmRNb250aCA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TW9udGgoc2Vjb25kRGF0ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT09IE1jQ2FsZW5kYXJWaWV3Lk1vbnRoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmlyc3RZZWFyID09PSBzZWNvbmRZZWFyICYmIGZpcnN0TW9udGggPT09IHNlY29uZE1vbnRoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT09IE1jQ2FsZW5kYXJWaWV3LlllYXIpIHsgcmV0dXJuIGZpcnN0WWVhciA9PT0gc2Vjb25kWWVhcjsgfVxuXG4gICAgICAgIC8vIE90aGVyd2lzZSB3ZSBhcmUgaW4gJ211bHRpLXllYXInIHZpZXcuXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKGZpcnN0WWVhciAvIHllYXJzUGVyUGFnZSkgPT09IE1hdGguZmxvb3Ioc2Vjb25kWWVhciAvIHllYXJzUGVyUGFnZSk7XG4gICAgfVxufVxuXG4vKipcbiAqIEEgY2FsZW5kYXIgdGhhdCBpcyB1c2VkIGFzIHBhcnQgb2YgdGhlIGRhdGVwaWNrZXIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtY2FsZW5kYXInLFxuICAgIGV4cG9ydEFzOiAnbWNDYWxlbmRhcicsXG4gICAgdGVtcGxhdGVVcmw6ICdjYWxlbmRhci5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnY2FsZW5kYXIuc2NzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1jYWxlbmRhcidcbiAgICB9LFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWNDYWxlbmRhcjxEPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcblxuICAgIC8qKiBBIGRhdGUgcmVwcmVzZW50aW5nIHRoZSBwZXJpb2QgKG1vbnRoIG9yIHllYXIpIHRvIHN0YXJ0IHRoZSBjYWxlbmRhciBpbi4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBzdGFydEF0KCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJ0QXQ7XG4gICAgfVxuXG4gICAgc2V0IHN0YXJ0QXQodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX3N0YXJ0QXQgPSB0aGlzLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLmRhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RlZCgpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWQodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgbWluRGF0ZSgpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9taW5EYXRlO1xuICAgIH1cblxuICAgIHNldCBtaW5EYXRlKHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9taW5EYXRlID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgbWF4aW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgbWF4RGF0ZSgpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhEYXRlO1xuICAgIH1cblxuICAgIHNldCBtYXhEYXRlKHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9tYXhEYXRlID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW50IGFjdGl2ZSBkYXRlLiBUaGlzIGRldGVybWluZXMgd2hpY2ggdGltZSBwZXJpb2QgaXMgc2hvd24gYW5kIHdoaWNoIGRhdGUgaXNcbiAgICAgKiBoaWdobGlnaHRlZCB3aGVuIHVzaW5nIGtleWJvYXJkIG5hdmlnYXRpb24uXG4gICAgICovXG4gICAgZ2V0IGFjdGl2ZURhdGUoKTogRCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsYW1wZWRBY3RpdmVEYXRlO1xuICAgIH1cblxuICAgIHNldCBhY3RpdmVEYXRlKHZhbHVlOiBEKSB7XG4gICAgICAgIHRoaXMuY2xhbXBlZEFjdGl2ZURhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLmNsYW1wRGF0ZSh2YWx1ZSwgdGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUpO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGNhbGVuZGFyIGlzIGluIG1vbnRoIHZpZXcuICovXG4gICAgZ2V0IGN1cnJlbnRWaWV3KCk6IE1jQ2FsZW5kYXJWaWV3IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRWaWV3O1xuICAgIH1cblxuICAgIHNldCBjdXJyZW50Vmlldyh2YWx1ZTogTWNDYWxlbmRhclZpZXcpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFZpZXcgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5tb3ZlRm9jdXNPbk5leHRUaWNrID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKiogQW4gaW5wdXQgaW5kaWNhdGluZyB0aGUgdHlwZSBvZiB0aGUgaGVhZGVyIGNvbXBvbmVudCwgaWYgc2V0LiAqL1xuICAgIEBJbnB1dCgpIGhlYWRlckNvbXBvbmVudDogQ29tcG9uZW50VHlwZTxhbnk+O1xuXG4gICAgLyoqIEEgcG9ydGFsIGNvbnRhaW5pbmcgdGhlIGhlYWRlciBjb21wb25lbnQgdHlwZSBmb3IgdGhpcyBjYWxlbmRhci4gKi9cbiAgICBjYWxlbmRhckhlYWRlclBvcnRhbDogUG9ydGFsPGFueT47XG5cbiAgICAvKiogV2hldGhlciB0aGUgY2FsZW5kYXIgc2hvdWxkIGJlIHN0YXJ0ZWQgaW4gbW9udGggb3IgeWVhciB2aWV3LiAqL1xuICAgIEBJbnB1dCgpIHN0YXJ0VmlldzogTWNDYWxlbmRhclZpZXcgPSBNY0NhbGVuZGFyVmlldy5Nb250aDtcblxuICAgIC8qKiBGdW5jdGlvbiB1c2VkIHRvIGZpbHRlciB3aGljaCBkYXRlcyBhcmUgc2VsZWN0YWJsZS4gKi9cbiAgICBASW5wdXQoKSBkYXRlRmlsdGVyOiAoZGF0ZTogRCkgPT4gYm9vbGVhbjtcblxuICAgIC8qKiBGdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGFkZCBjdXN0b20gQ1NTIGNsYXNzZXMgdG8gZGF0ZXMuICovXG4gICAgQElucHV0KCkgZGF0ZUNsYXNzOiAoZGF0ZTogRCkgPT4gTWNDYWxlbmRhckNlbGxDc3NDbGFzc2VzO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlIGNoYW5nZXMuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RD4gPSBuZXcgRXZlbnRFbWl0dGVyPEQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyB0aGUgeWVhciBjaG9zZW4gaW4gbXVsdGl5ZWFyIHZpZXcuXG4gICAgICogVGhpcyBkb2Vzbid0IGltcGx5IGEgY2hhbmdlIG9uIHRoZSBzZWxlY3RlZCBkYXRlLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSB5ZWFyU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxEPiA9IG5ldyBFdmVudEVtaXR0ZXI8RD4oKTtcblxuICAgIC8qKlxuICAgICAqIEVtaXRzIHRoZSBtb250aCBjaG9zZW4gaW4geWVhciB2aWV3LlxuICAgICAqIFRoaXMgZG9lc24ndCBpbXBseSBhIGNoYW5nZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZS5cbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgbW9udGhTZWxlY3RlZDogRXZlbnRFbWl0dGVyPEQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEPigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gYW55IGRhdGUgaXMgc2VsZWN0ZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHVzZXJTZWxlY3Rpb246IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgbW9udGggdmlldyBjb21wb25lbnQuICovXG4gICAgQFZpZXdDaGlsZChNY01vbnRoVmlldywge3N0YXRpYzogZmFsc2V9KSBtb250aFZpZXc6IE1jTW9udGhWaWV3PEQ+O1xuXG4gICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgY3VycmVudCB5ZWFyIHZpZXcgY29tcG9uZW50LiAqL1xuICAgIEBWaWV3Q2hpbGQoTWNZZWFyVmlldywge3N0YXRpYzogZmFsc2V9KSB5ZWFyVmlldzogTWNZZWFyVmlldzxEPjtcblxuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgbXVsdGkteWVhciB2aWV3IGNvbXBvbmVudC4gKi9cbiAgICBAVmlld0NoaWxkKE1jTXVsdGlZZWFyVmlldywge3N0YXRpYzogZmFsc2V9KSBtdWx0aVllYXJWaWV3OiBNY011bHRpWWVhclZpZXc8RD47XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyB3aGVuZXZlciB0aGVyZSBpcyBhIHN0YXRlIGNoYW5nZSB0aGF0IHRoZSBoZWFkZXIgbWF5IG5lZWQgdG8gcmVzcG9uZCB0by5cbiAgICAgKi9cbiAgICBzdGF0ZUNoYW5nZXMgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBpbnRsQ2hhbmdlczogU3Vic2NyaXB0aW9uO1xuXG4gICAgLyoqXG4gICAgICogVXNlZCBmb3Igc2NoZWR1bGluZyB0aGF0IGZvY3VzIHNob3VsZCBiZSBtb3ZlZCB0byB0aGUgYWN0aXZlIGNlbGwgb24gdGhlIG5leHQgdGljay5cbiAgICAgKiBXZSBuZWVkIHRvIHNjaGVkdWxlIGl0LCByYXRoZXIgdGhhbiBkbyBpdCBpbW1lZGlhdGVseSwgYmVjYXVzZSB3ZSBoYXZlIHRvIHdhaXRcbiAgICAgKiBmb3IgQW5ndWxhciB0byByZS1ldmFsdWF0ZSB0aGUgdmlldyBjaGlsZHJlbi5cbiAgICAgKi9cbiAgICBwcml2YXRlIG1vdmVGb2N1c09uTmV4dFRpY2sgPSBmYWxzZTtcbiAgICBwcml2YXRlIF9zdGFydEF0OiBEIHwgbnVsbDtcbiAgICBwcml2YXRlIF9zZWxlY3RlZDogRCB8IG51bGw7XG4gICAgcHJpdmF0ZSBfbWluRGF0ZTogRCB8IG51bGw7XG4gICAgcHJpdmF0ZSBfbWF4RGF0ZTogRCB8IG51bGw7XG4gICAgcHJpdmF0ZSBjbGFtcGVkQWN0aXZlRGF0ZTogRDtcbiAgICBwcml2YXRlIF9jdXJyZW50VmlldzogTWNDYWxlbmRhclZpZXc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgaW50bDogTWNEYXRlcGlja2VySW50bCxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByZWFkb25seSBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfREFURV9GT1JNQVRTKSBwcml2YXRlIHJlYWRvbmx5IGRhdGVGb3JtYXRzOiBNY0RhdGVGb3JtYXRzLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkge1xuICAgICAgICBpZiAoIXRoaXMuZGF0ZUFkYXB0ZXIpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdEYXRlQWRhcHRlcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmRhdGVGb3JtYXRzKSB7XG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcignTUNfREFURV9GT1JNQVRTJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmludGxDaGFuZ2VzID0gaW50bC5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLmNhbGVuZGFySGVhZGVyUG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbCh0aGlzLmhlYWRlckNvbXBvbmVudCB8fCBNY0NhbGVuZGFySGVhZGVyKTtcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5zdGFydEF0IHx8IHRoaXMuZGF0ZUFkYXB0ZXIudG9kYXkoKTtcblxuICAgICAgICAvLyBBc3NpZ24gdG8gdGhlIHByaXZhdGUgcHJvcGVydHkgc2luY2Ugd2UgZG9uJ3Qgd2FudCB0byBtb3ZlIGZvY3VzIG9uIGluaXQuXG4gICAgICAgIHRoaXMuX2N1cnJlbnRWaWV3ID0gdGhpcy5zdGFydFZpZXc7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgICAgICBpZiAodGhpcy5tb3ZlRm9jdXNPbk5leHRUaWNrKSB7XG4gICAgICAgICAgICB0aGlzLm1vdmVGb2N1c09uTmV4dFRpY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNBY3RpdmVDZWxsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5pbnRsQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlID0gY2hhbmdlcy5taW5EYXRlIHx8IGNoYW5nZXMubWF4RGF0ZSB8fCBjaGFuZ2VzLmRhdGVGaWx0ZXI7XG5cbiAgICAgICAgaWYgKGNoYW5nZSAmJiAhY2hhbmdlLmZpcnN0Q2hhbmdlKSB7XG4gICAgICAgICAgICBjb25zdCB2aWV3ID0gdGhpcy5nZXRDdXJyZW50Vmlld0NvbXBvbmVudCgpO1xuXG4gICAgICAgICAgICBpZiAodmlldykge1xuICAgICAgICAgICAgICAgIC8vIFdlIG5lZWQgdG8gYGRldGVjdENoYW5nZXNgIG1hbnVhbGx5IGhlcmUsIGJlY2F1c2UgdGhlIGBtaW5EYXRlYCwgYG1heERhdGVgIGV0Yy4gYXJlXG4gICAgICAgICAgICAgICAgLy8gcGFzc2VkIGRvd24gdG8gdGhlIHZpZXcgdmlhIGRhdGEgYmluZGluZ3Mgd2hpY2ggd29uJ3QgYmUgdXAtdG8tZGF0ZSB3aGVuIHdlIGNhbGwgYGluaXRgLlxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgICAgIHZpZXcuaW5pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIGZvY3VzQWN0aXZlQ2VsbCgpIHtcbiAgICAgICAgdGhpcy5nZXRDdXJyZW50Vmlld0NvbXBvbmVudCgpLmZvY3VzQWN0aXZlQ2VsbCgpO1xuICAgIH1cblxuICAgIC8qKiBVcGRhdGVzIHRvZGF5J3MgZGF0ZSBhZnRlciBhbiB1cGRhdGUgb2YgdGhlIGFjdGl2ZSBkYXRlICovXG4gICAgdXBkYXRlVG9kYXlzRGF0ZSgpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuY3VycmVudFZpZXcgPT09IE1jQ2FsZW5kYXJWaWV3Lk1vbnRoID8gdGhpcy5tb250aFZpZXcgOlxuICAgICAgICAgICAgKHRoaXMuY3VycmVudFZpZXcgPT09IE1jQ2FsZW5kYXJWaWV3LlllYXIgPyB0aGlzLnllYXJWaWV3IDogdGhpcy5tdWx0aVllYXJWaWV3KTtcblxuICAgICAgICB2aWV3Lm5nQWZ0ZXJDb250ZW50SW5pdCgpO1xuICAgIH1cblxuICAgIC8qKiBIYW5kbGVzIGRhdGUgc2VsZWN0aW9uIGluIHRoZSBtb250aCB2aWV3LiAqL1xuICAgIGRhdGVTZWxlY3RlZChkYXRlOiBEKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kYXRlQWRhcHRlci5zYW1lRGF0ZShkYXRlLCB0aGlzLnNlbGVjdGVkKSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KGRhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMgeWVhciBzZWxlY3Rpb24gaW4gdGhlIG11bHRpeWVhciB2aWV3LiAqL1xuICAgIHllYXJTZWxlY3RlZEluTXVsdGlZZWFyVmlldyhub3JtYWxpemVkWWVhcjogRCkge1xuICAgICAgICB0aGlzLnllYXJTZWxlY3RlZC5lbWl0KG5vcm1hbGl6ZWRZZWFyKTtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyBtb250aCBzZWxlY3Rpb24gaW4gdGhlIHllYXIgdmlldy4gKi9cbiAgICBtb250aFNlbGVjdGVkSW5ZZWFyVmlldyhub3JtYWxpemVkTW9udGg6IEQpIHtcbiAgICAgICAgdGhpcy5tb250aFNlbGVjdGVkLmVtaXQobm9ybWFsaXplZE1vbnRoKTtcbiAgICB9XG5cbiAgICB1c2VyU2VsZWN0ZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudXNlclNlbGVjdGlvbi5lbWl0KCk7XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMgeWVhci9tb250aCBzZWxlY3Rpb24gaW4gdGhlIG11bHRpLXllYXIveWVhciB2aWV3cy4gKi9cbiAgICBnb1RvRGF0ZUluVmlldyhkYXRlOiBELCB2aWV3OiBNY0NhbGVuZGFyVmlldyB8IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSBkYXRlO1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWV3ID0gdmlldyBhcyBNY0NhbGVuZGFyVmlldztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMgVGhlIGdpdmVuIG9iamVjdCBpZiBpdCBpcyBib3RoIGEgZGF0ZSBpbnN0YW5jZSBhbmQgdmFsaWQsIG90aGVyd2lzZSBudWxsLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0VmFsaWREYXRlT3JOdWxsKG9iajogYW55KTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gKHRoaXMuZGF0ZUFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJiB0aGlzLmRhdGVBZGFwdGVyLmlzVmFsaWQob2JqKSkgPyBvYmogOiBudWxsO1xuICAgIH1cblxuICAgIC8qKiBSZXR1cm5zIHRoZSBjb21wb25lbnQgaW5zdGFuY2UgdGhhdCBjb3JyZXNwb25kcyB0byB0aGUgY3VycmVudCBjYWxlbmRhciB2aWV3LiAqL1xuICAgIHByaXZhdGUgZ2V0Q3VycmVudFZpZXdDb21wb25lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vbnRoVmlldyB8fCB0aGlzLnllYXJWaWV3IHx8IHRoaXMubXVsdGlZZWFyVmlldztcbiAgICB9XG59XG4iLCI8YnV0dG9uIG1jLWJ1dHRvblxuICAgICAgICBbdGFiaW5kZXhdPVwiJy0xJ1wiXG4gICAgICAgIGNsYXNzPVwibWMtYnV0dG9uX3RyYW5zcGFyZW50IG1jLWNhbGVuZGFyX19wZXJpb2QtYnV0dG9uXCJcbiAgICAgICAgKGNsaWNrKT1cImN1cnJlbnRQZXJpb2RDbGlja2VkKClcIj5cbiAgICB7eyBwZXJpb2RCdXR0b25UZXh0IH19XG5cbiAgICA8aSBjbGFzcz1cIm1jIG1jLWljb25cIlxuICAgICAgIFtjbGFzcy5tYy1hbmdsZS11cC1NXzE2XT1cImNhbGVuZGFyLmN1cnJlbnRWaWV3ICE9PSAnbW9udGgnXCJcbiAgICAgICBbY2xhc3MubWMtYW5nbGUtZG93bi1NXzE2XT1cImNhbGVuZGFyLmN1cnJlbnRWaWV3ID09PSAnbW9udGgnXCI+XG4gICAgPC9pPlxuPC9idXR0b24+XG5cbjxkaXYgY2xhc3M9XCJtYy1jYWxlbmRhci1zcGFjZXJcIj48L2Rpdj5cblxuPGJ1dHRvbiBtYy1idXR0b25cbiAgICAgICAgW3RhYmluZGV4XT1cIictMSdcIlxuICAgICAgICBjbGFzcz1cIm1jLWJ1dHRvbl90cmFuc3BhcmVudCBtYy1jYWxlbmRhcl9fcHJldmlvdXMtYnV0dG9uXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cIiFwcmV2aW91c0VuYWJsZWQoKVwiXG4gICAgICAgIChjbGljayk9XCJwcmV2aW91c0NsaWNrZWQoKVwiPlxuXG4gICAgPGkgbWMtaWNvbj1cIm1jLWFuZ2xlLWxlZnQtTF8xNlwiPjwvaT5cbjwvYnV0dG9uPlxuXG48YnV0dG9uIG1jLWJ1dHRvblxuICAgICAgICBbdGFiaW5kZXhdPVwiJy0xJ1wiXG4gICAgICAgIGNsYXNzPVwibWMtYnV0dG9uX3RyYW5zcGFyZW50IG1jLWNhbGVuZGFyX19uZXh0LWJ1dHRvblwiXG4gICAgICAgIFtkaXNhYmxlZF09XCIhbmV4dEVuYWJsZWQoKVwiXG4gICAgICAgIChjbGljayk9XCJuZXh0Q2xpY2tlZCgpXCI+XG5cbiAgICA8aSBtYy1pY29uPVwibWMtYW5nbGUtcmlnaHQtTF8xNlwiPjwvaT5cbjwvYnV0dG9uPlxuIiwiPG5nLXRlbXBsYXRlIFtjZGtQb3J0YWxPdXRsZXRdPVwiY2FsZW5kYXJIZWFkZXJQb3J0YWxcIj48L25nLXRlbXBsYXRlPlxuXG48ZGl2IGNsYXNzPVwibWMtY2FsZW5kYXJfX2NvbnRlbnRcIiBbbmdTd2l0Y2hdPVwiY3VycmVudFZpZXdcIj5cbiAgICA8bWMtbW9udGgtdmlld1xuICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ21vbnRoJ1wiXG4gICAgICAgIFsoYWN0aXZlRGF0ZSldPVwiYWN0aXZlRGF0ZVwiXG4gICAgICAgIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiXG4gICAgICAgIFtkYXRlRmlsdGVyXT1cImRhdGVGaWx0ZXJcIlxuICAgICAgICBbbWF4RGF0ZV09XCJtYXhEYXRlXCJcbiAgICAgICAgW21pbkRhdGVdPVwibWluRGF0ZVwiXG4gICAgICAgIFtkYXRlQ2xhc3NdPVwiZGF0ZUNsYXNzXCJcbiAgICAgICAgKHNlbGVjdGVkQ2hhbmdlKT1cImRhdGVTZWxlY3RlZCgkZXZlbnQhKVwiXG4gICAgICAgICh1c2VyU2VsZWN0aW9uKT1cInVzZXJTZWxlY3RlZCgpXCI+XG4gICAgPC9tYy1tb250aC12aWV3PlxuXG4gICAgPG1jLXllYXItdmlld1xuICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ3llYXInXCJcbiAgICAgICAgWyhhY3RpdmVEYXRlKV09XCJhY3RpdmVEYXRlXCJcbiAgICAgICAgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCJcbiAgICAgICAgW2RhdGVGaWx0ZXJdPVwiZGF0ZUZpbHRlclwiXG4gICAgICAgIFttYXhEYXRlXT1cIm1heERhdGVcIlxuICAgICAgICBbbWluRGF0ZV09XCJtaW5EYXRlXCJcbiAgICAgICAgKG1vbnRoU2VsZWN0ZWQpPVwibW9udGhTZWxlY3RlZEluWWVhclZpZXcoJGV2ZW50KVwiXG4gICAgICAgIChzZWxlY3RlZENoYW5nZSk9XCJnb1RvRGF0ZUluVmlldygkZXZlbnQsICdtdWx0aS15ZWFyJylcIj5cbiAgICA8L21jLXllYXItdmlldz5cblxuICAgIDxtYy1tdWx0aS15ZWFyLXZpZXdcbiAgICAgICAgKm5nU3dpdGNoQ2FzZT1cIidtdWx0aS15ZWFyJ1wiXG4gICAgICAgIFsoYWN0aXZlRGF0ZSldPVwiYWN0aXZlRGF0ZVwiXG4gICAgICAgIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiXG4gICAgICAgIFtkYXRlRmlsdGVyXT1cImRhdGVGaWx0ZXJcIlxuICAgICAgICBbbWF4RGF0ZV09XCJtYXhEYXRlXCJcbiAgICAgICAgW21pbkRhdGVdPVwibWluRGF0ZVwiXG4gICAgICAgICh5ZWFyU2VsZWN0ZWQpPVwieWVhclNlbGVjdGVkSW5NdWx0aVllYXJWaWV3KCRldmVudClcIlxuICAgICAgICAoc2VsZWN0ZWRDaGFuZ2UpPVwiZ29Ub0RhdGVJblZpZXcoJGV2ZW50LCAnbW9udGgnKVwiPlxuICAgIDwvbWMtbXVsdGkteWVhci12aWV3PlxuPC9kaXY+XG4iXX0=