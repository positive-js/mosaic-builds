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
/** @nocollapse */ /** @nocollapse */ McCalendarHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McCalendarHeader, deps: [{ token: i1.McDatepickerIntl }, { token: forwardRef(() => McCalendar) }, { token: i2.DateAdapter, optional: true }, { token: MC_DATE_FORMATS, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McCalendarHeader.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McCalendarHeader, selector: "mc-calendar-header", host: { classAttribute: "mc-calendar-header" }, exportAs: ["mcCalendarHeader"], ngImport: i0, template: "<button mc-button\n        [tabindex]=\"'-1'\"\n        class=\"mc-button_transparent mc-calendar__period-button\"\n        (click)=\"currentPeriodClicked()\">\n    {{ periodButtonText }}\n\n    <i class=\"mc mc-icon\"\n       [class.mc-angle-up-M_16]=\"calendar.currentView !== 'month'\"\n       [class.mc-angle-down-M_16]=\"calendar.currentView === 'month'\">\n    </i>\n</button>\n\n<div class=\"mc-calendar-spacer\"></div>\n\n<button mc-button\n        [tabindex]=\"'-1'\"\n        class=\"mc-button_transparent mc-calendar__previous-button\"\n        [disabled]=\"!previousEnabled()\"\n        (click)=\"previousClicked()\">\n\n    <i mc-icon=\"mc-angle-left-L_16\"></i>\n</button>\n\n<button mc-button\n        [tabindex]=\"'-1'\"\n        class=\"mc-button_transparent mc-calendar__next-button\"\n        [disabled]=\"!nextEnabled()\"\n        (click)=\"nextClicked()\">\n\n    <i mc-icon=\"mc-angle-right-L_16\"></i>\n</button>\n", components: [{ type: i3.McButton, selector: "[mc-button]", inputs: ["color", "tabIndex", "disabled"] }, { type: i4.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i3.McButtonCssStyler, selector: "[mc-button]" }, { type: i4.McIconCSSStyler, selector: "[mc-icon]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McCalendarHeader, decorators: [{
            type: Component,
            args: [{ selector: 'mc-calendar-header', exportAs: 'mcCalendarHeader', host: {
                        class: 'mc-calendar-header'
                    }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<button mc-button\n        [tabindex]=\"'-1'\"\n        class=\"mc-button_transparent mc-calendar__period-button\"\n        (click)=\"currentPeriodClicked()\">\n    {{ periodButtonText }}\n\n    <i class=\"mc mc-icon\"\n       [class.mc-angle-up-M_16]=\"calendar.currentView !== 'month'\"\n       [class.mc-angle-down-M_16]=\"calendar.currentView === 'month'\">\n    </i>\n</button>\n\n<div class=\"mc-calendar-spacer\"></div>\n\n<button mc-button\n        [tabindex]=\"'-1'\"\n        class=\"mc-button_transparent mc-calendar__previous-button\"\n        [disabled]=\"!previousEnabled()\"\n        (click)=\"previousClicked()\">\n\n    <i mc-icon=\"mc-angle-left-L_16\"></i>\n</button>\n\n<button mc-button\n        [tabindex]=\"'-1'\"\n        class=\"mc-button_transparent mc-calendar__next-button\"\n        [disabled]=\"!nextEnabled()\"\n        (click)=\"nextClicked()\">\n\n    <i mc-icon=\"mc-angle-right-L_16\"></i>\n</button>\n" }]
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
/** @nocollapse */ /** @nocollapse */ McCalendar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McCalendar, deps: [{ token: i1.McDatepickerIntl }, { token: i2.DateAdapter, optional: true }, { token: MC_DATE_FORMATS, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McCalendar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McCalendar, selector: "mc-calendar", inputs: { startAt: "startAt", selected: "selected", minDate: "minDate", maxDate: "maxDate", headerComponent: "headerComponent", startView: "startView", dateFilter: "dateFilter", dateClass: "dateClass" }, outputs: { selectedChange: "selectedChange", yearSelected: "yearSelected", monthSelected: "monthSelected", userSelection: "userSelection" }, host: { classAttribute: "mc-calendar" }, viewQueries: [{ propertyName: "monthView", first: true, predicate: McMonthView, descendants: true }, { propertyName: "yearView", first: true, predicate: McYearView, descendants: true }, { propertyName: "multiYearView", first: true, predicate: McMultiYearView, descendants: true }], exportAs: ["mcCalendar"], usesOnChanges: true, ngImport: i0, template: "<ng-template [cdkPortalOutlet]=\"calendarHeaderPortal\"></ng-template>\n\n<div class=\"mc-calendar__content\" [ngSwitch]=\"currentView\">\n    <mc-month-view\n        *ngSwitchCase=\"'month'\"\n        [(activeDate)]=\"activeDate\"\n        [selected]=\"selected\"\n        [dateFilter]=\"dateFilter\"\n        [maxDate]=\"maxDate\"\n        [minDate]=\"minDate\"\n        [dateClass]=\"dateClass\"\n        (selectedChange)=\"dateSelected($event!)\"\n        (userSelection)=\"userSelected()\">\n    </mc-month-view>\n\n    <mc-year-view\n        *ngSwitchCase=\"'year'\"\n        [(activeDate)]=\"activeDate\"\n        [selected]=\"selected\"\n        [dateFilter]=\"dateFilter\"\n        [maxDate]=\"maxDate\"\n        [minDate]=\"minDate\"\n        (monthSelected)=\"monthSelectedInYearView($event)\"\n        (selectedChange)=\"goToDateInView($event, 'multi-year')\">\n    </mc-year-view>\n\n    <mc-multi-year-view\n        *ngSwitchCase=\"'multi-year'\"\n        [(activeDate)]=\"activeDate\"\n        [selected]=\"selected\"\n        [dateFilter]=\"dateFilter\"\n        [maxDate]=\"maxDate\"\n        [minDate]=\"minDate\"\n        (yearSelected)=\"yearSelectedInMultiYearView($event)\"\n        (selectedChange)=\"goToDateInView($event, 'month')\">\n    </mc-multi-year-view>\n</div>\n", styles: [".mc-calendar{display:block}.mc-calendar-header{display:flex;padding:var(--mc-datepicker-calendar-size-padding-top, 16px) var(--mc-datepicker-calendar-size-padding-horizontal, 8px) var(--mc-datepicker-calendar-size-padding-blocks, 12px) var(--mc-datepicker-calendar-size-padding-horizontal, 8px)}.mc-calendar__content{padding:0 var(--mc-datepicker-calendar-size-padding-horizontal, 8px) var(--mc-datepicker-calendar-size-padding-horizontal, 8px) var(--mc-datepicker-calendar-size-padding-horizontal, 8px);outline:none}.mc-calendar-spacer{flex:1 1 auto}.mc-calendar__period-button{min-width:0}.mc-calendar__period-button .mc-icon{vertical-align:baseline}.mc-calendar__previous-button:after{border-left-width:var(--mc-datepicker-calendar-size-icon-border-width, 2px);transform:var(--mc-datepicker-calendar-size-icon-prev-icon-transform, translateX(2px) rotate(-45deg))}.mc-calendar__next-button:after{border-right-width:var(--mc-datepicker-calendar-size-icon-border-width, 2px);transform:var(--mc-datepicker-calendar-size-icon-nex-icon-transform, translateX(-2px) rotate(45deg))}.mc-calendar__table{border-spacing:0;border-collapse:collapse;width:100%}.mc-calendar__table-header th{text-align:center;height:30px}.mc-calendar__table-header th.mc-calendar__table-header-divider{position:relative;height:calc(var(--mc-datepicker-calendar-size-padding-blocks, 12px) - 2px)}.mc-calendar__table-header th.mc-calendar__table-header-divider:after{content:\"\";position:absolute;top:0;left:calc(-1 * var(--mc-datepicker-calendar-size-padding-horizontal, 8px));right:calc(-1 * var(--mc-datepicker-calendar-size-padding-horizontal, 8px));height:var(--mc-datepicker-calendar-size-divider-width, 1px)}\n"], components: [{ type: i5.McMonthView, selector: "mc-month-view", inputs: ["activeDate", "selected", "minDate", "maxDate", "dateFilter", "dateClass"], outputs: ["selectedChange", "userSelection", "activeDateChange"], exportAs: ["mcMonthView"] }, { type: i6.McYearView, selector: "mc-year-view", inputs: ["activeDate", "selected", "minDate", "maxDate", "dateFilter"], outputs: ["selectedChange", "monthSelected", "activeDateChange"], exportAs: ["mcYearView"] }, { type: i7.McMultiYearView, selector: "mc-multi-year-view", inputs: ["activeDate", "selected", "minDate", "maxDate", "dateFilter"], outputs: ["selectedChange", "yearSelected", "activeDateChange"], exportAs: ["mcMultiYearView"] }], directives: [{ type: i8.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }, { type: i9.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i9.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McCalendar, decorators: [{
            type: Component,
            args: [{ selector: 'mc-calendar', exportAs: 'mcCalendar', host: {
                        class: 'mc-calendar'
                    }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template [cdkPortalOutlet]=\"calendarHeaderPortal\"></ng-template>\n\n<div class=\"mc-calendar__content\" [ngSwitch]=\"currentView\">\n    <mc-month-view\n        *ngSwitchCase=\"'month'\"\n        [(activeDate)]=\"activeDate\"\n        [selected]=\"selected\"\n        [dateFilter]=\"dateFilter\"\n        [maxDate]=\"maxDate\"\n        [minDate]=\"minDate\"\n        [dateClass]=\"dateClass\"\n        (selectedChange)=\"dateSelected($event!)\"\n        (userSelection)=\"userSelected()\">\n    </mc-month-view>\n\n    <mc-year-view\n        *ngSwitchCase=\"'year'\"\n        [(activeDate)]=\"activeDate\"\n        [selected]=\"selected\"\n        [dateFilter]=\"dateFilter\"\n        [maxDate]=\"maxDate\"\n        [minDate]=\"minDate\"\n        (monthSelected)=\"monthSelectedInYearView($event)\"\n        (selectedChange)=\"goToDateInView($event, 'multi-year')\">\n    </mc-year-view>\n\n    <mc-multi-year-view\n        *ngSwitchCase=\"'multi-year'\"\n        [(activeDate)]=\"activeDate\"\n        [selected]=\"selected\"\n        [dateFilter]=\"dateFilter\"\n        [maxDate]=\"maxDate\"\n        [minDate]=\"minDate\"\n        (yearSelected)=\"yearSelectedInMultiYearView($event)\"\n        (selectedChange)=\"goToDateInView($event, 'month')\">\n    </mc-multi-year-view>\n</div>\n", styles: [".mc-calendar{display:block}.mc-calendar-header{display:flex;padding:var(--mc-datepicker-calendar-size-padding-top, 16px) var(--mc-datepicker-calendar-size-padding-horizontal, 8px) var(--mc-datepicker-calendar-size-padding-blocks, 12px) var(--mc-datepicker-calendar-size-padding-horizontal, 8px)}.mc-calendar__content{padding:0 var(--mc-datepicker-calendar-size-padding-horizontal, 8px) var(--mc-datepicker-calendar-size-padding-horizontal, 8px) var(--mc-datepicker-calendar-size-padding-horizontal, 8px);outline:none}.mc-calendar-spacer{flex:1 1 auto}.mc-calendar__period-button{min-width:0}.mc-calendar__period-button .mc-icon{vertical-align:baseline}.mc-calendar__previous-button:after{border-left-width:var(--mc-datepicker-calendar-size-icon-border-width, 2px);transform:var(--mc-datepicker-calendar-size-icon-prev-icon-transform, translateX(2px) rotate(-45deg))}.mc-calendar__next-button:after{border-right-width:var(--mc-datepicker-calendar-size-icon-border-width, 2px);transform:var(--mc-datepicker-calendar-size-icon-nex-icon-transform, translateX(-2px) rotate(45deg))}.mc-calendar__table{border-spacing:0;border-collapse:collapse;width:100%}.mc-calendar__table-header th{text-align:center;height:30px}.mc-calendar__table-header th.mc-calendar__table-header-divider{position:relative;height:calc(var(--mc-datepicker-calendar-size-padding-blocks, 12px) - 2px)}.mc-calendar__table-header th.mc-calendar__table-header-divider:after{content:\"\";position:absolute;top:0;left:calc(-1 * var(--mc-datepicker-calendar-size-padding-horizontal, 8px));right:calc(-1 * var(--mc-datepicker-calendar-size-padding-horizontal, 8px));height:var(--mc-datepicker-calendar-size-divider-width, 1px)}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2RhdGVwaWNrZXIvY2FsZW5kYXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2RhdGVwaWNrZXIvY2FsZW5kYXItaGVhZGVyLmh0bWwiLCIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvZGF0ZXBpY2tlci9jYWxlbmRhci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQXlCLE1BQU0scUJBQXFCLENBQUM7QUFDN0UsT0FBTyxFQUdILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQWlCLE1BQU0sMEJBQTBCLENBQUM7QUFDdkYsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFHN0MsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDckQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDNUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7Ozs7Ozs7OztBQUduRDs7O0dBR0c7QUFDSCxNQUFNLENBQU4sSUFBWSxjQUlYO0FBSkQsV0FBWSxjQUFjO0lBQ3RCLGlDQUFlLENBQUE7SUFDZiwrQkFBYSxDQUFBO0lBQ2IsMENBQXdC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QkFBQyxlQUFlOzRFQTlIbkMsT0FBTztzQkFEVixLQUFLO2dCQVdGLFFBQVE7c0JBRFgsS0FBSztnQkFXRixPQUFPO3NCQURWLEtBQUs7Z0JBV0YsT0FBTztzQkFEVixLQUFLO2dCQWlDRyxlQUFlO3NCQUF2QixLQUFLO2dCQU1HLFNBQVM7c0JBQWpCLEtBQUs7Z0JBR0csVUFBVTtzQkFBbEIsS0FBSztnQkFHRyxTQUFTO3NCQUFqQixLQUFLO2dCQUdhLGNBQWM7c0JBQWhDLE1BQU07Z0JBTVksWUFBWTtzQkFBOUIsTUFBTTtnQkFNWSxhQUFhO3NCQUEvQixNQUFNO2dCQUdZLGFBQWE7c0JBQS9CLE1BQU07Z0JBR2tDLFNBQVM7c0JBQWpELFNBQVM7dUJBQUMsV0FBVyxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQztnQkFHQyxRQUFRO3NCQUEvQyxTQUFTO3VCQUFDLFVBQVUsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7Z0JBR08sYUFBYTtzQkFBekQsU0FBUzt1QkFBQyxlQUFlLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsLCBDb21wb25lbnRUeXBlLCBQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdDaGVja2VkLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciwgTUNfREFURV9GT1JNQVRTLCBNY0RhdGVGb3JtYXRzIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2RhdGV0aW1lJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBNY0NhbGVuZGFyQ2VsbENzc0NsYXNzZXMgfSBmcm9tICcuL2NhbGVuZGFyLWJvZHkuY29tcG9uZW50JztcbmltcG9ydCB7IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yIH0gZnJvbSAnLi9kYXRlcGlja2VyLWVycm9ycyc7XG5pbXBvcnQgeyBNY0RhdGVwaWNrZXJJbnRsIH0gZnJvbSAnLi9kYXRlcGlja2VyLWludGwnO1xuaW1wb3J0IHsgTWNNb250aFZpZXcgfSBmcm9tICcuL21vbnRoLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IE1jTXVsdGlZZWFyVmlldywgeWVhcnNQZXJQYWdlIH0gZnJvbSAnLi9tdWx0aS15ZWFyLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IE1jWWVhclZpZXcgfSBmcm9tICcuL3llYXItdmlldy5jb21wb25lbnQnO1xuXG5cbi8qKlxuICogUG9zc2libGUgdmlld3MgZm9yIHRoZSBjYWxlbmRhci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGVudW0gTWNDYWxlbmRhclZpZXcge1xuICAgIE1vbnRoID0gJ21vbnRoJyxcbiAgICBZZWFyID0gJ3llYXInLFxuICAgIE11bHRpWWVhciA9ICdtdWx0aS15ZWFyJ1xufVxuXG4vKiogRGVmYXVsdCBoZWFkZXIgZm9yIE1jQ2FsZW5kYXIgKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtY2FsZW5kYXItaGVhZGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2NhbGVuZGFyLWhlYWRlci5odG1sJyxcbiAgICBleHBvcnRBczogJ21jQ2FsZW5kYXJIZWFkZXInLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1jYWxlbmRhci1oZWFkZXInXG4gICAgfSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1jQ2FsZW5kYXJIZWFkZXI8RD4ge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGludGw6IE1jRGF0ZXBpY2tlckludGwsXG4gICAgICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBNY0NhbGVuZGFyKSkgcHVibGljIGNhbGVuZGFyOiBNY0NhbGVuZGFyPEQ+LFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJlYWRvbmx5IGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcjxEPixcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQ19EQVRFX0ZPUk1BVFMpIHByaXZhdGUgcmVhZG9ubHkgZGF0ZUZvcm1hdHM6IE1jRGF0ZUZvcm1hdHMsXG4gICAgICAgIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkge1xuICAgICAgICB0aGlzLmNhbGVuZGFyLnN0YXRlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgbGFiZWwgZm9yIHRoZSBjdXJyZW50IGNhbGVuZGFyIHZpZXcuICovXG4gICAgZ2V0IHBlcmlvZEJ1dHRvblRleHQoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT09IE1jQ2FsZW5kYXJWaWV3Lk1vbnRoKSB7XG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuZGF0ZUFkYXB0ZXIuZm9ybWF0KHRoaXMuY2FsZW5kYXIuYWN0aXZlRGF0ZSwgdGhpcy5kYXRlRm9ybWF0cy5tb250aFllYXJMYWJlbCk7XG5cbiAgICAgICAgICAgIHJldHVybiAobGFiZWxbMF0udG9Mb2NhbGVVcHBlckNhc2UoKSArIGxhYmVsLnN1YnN0cigxKSkucmVwbGFjZSgnLicsICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3ID09PSBNY0NhbGVuZGFyVmlldy5ZZWFyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyTmFtZSh0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYWN0aXZlWWVhciA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUpO1xuICAgICAgICBjb25zdCBmaXJzdFllYXJJblZpZXcgPSB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXJOYW1lKFxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnNcbiAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZShhY3RpdmVZZWFyIC0gYWN0aXZlWWVhciAlIDI0KVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBsYXN0WWVhckluVmlldyA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhck5hbWUoXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbWFnaWMtbnVtYmVyc1xuICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5jcmVhdGVEYXRlKGFjdGl2ZVllYXIgKyB5ZWFyc1BlclBhZ2UgLSAxIC0gYWN0aXZlWWVhciAlIDI0KVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBgJHtmaXJzdFllYXJJblZpZXd9IFxcdTIwMTMgJHtsYXN0WWVhckluVmlld31gO1xuICAgIH1cblxuICAgIGdldCBwZXJpb2RCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWxlbmRhci5jdXJyZW50VmlldyA9PT0gTWNDYWxlbmRhclZpZXcuTW9udGggP1xuICAgICAgICAgICAgdGhpcy5pbnRsLnN3aXRjaFRvTXVsdGlZZWFyVmlld0xhYmVsIDogdGhpcy5pbnRsLnN3aXRjaFRvTW9udGhWaWV3TGFiZWw7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBsYWJlbCBmb3IgdGhlIHByZXZpb3VzIGJ1dHRvbi4gKi9cbiAgICBnZXQgcHJldkJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBbTWNDYWxlbmRhclZpZXcuTW9udGhdOiB0aGlzLmludGwucHJldk1vbnRoTGFiZWwsXG4gICAgICAgICAgICBbTWNDYWxlbmRhclZpZXcuWWVhcl06IHRoaXMuaW50bC5wcmV2WWVhckxhYmVsLFxuICAgICAgICAgICAgW01jQ2FsZW5kYXJWaWV3Lk11bHRpWWVhcl06IHRoaXMuaW50bC5wcmV2TXVsdGlZZWFyTGFiZWxcbiAgICAgICAgfVt0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3XTtcbiAgICB9XG5cbiAgICAvKiogVGhlIGxhYmVsIGZvciB0aGUgbmV4dCBidXR0b24uICovXG4gICAgZ2V0IG5leHRCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgW01jQ2FsZW5kYXJWaWV3Lk1vbnRoXTogdGhpcy5pbnRsLm5leHRNb250aExhYmVsLFxuICAgICAgICAgICAgW01jQ2FsZW5kYXJWaWV3LlllYXJdOiB0aGlzLmludGwubmV4dFllYXJMYWJlbCxcbiAgICAgICAgICAgIFtNY0NhbGVuZGFyVmlldy5NdWx0aVllYXJdOiB0aGlzLmludGwubmV4dE11bHRpWWVhckxhYmVsXG4gICAgICAgIH1bdGhpcy5jYWxlbmRhci5jdXJyZW50Vmlld107XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMgdXNlciBjbGlja3Mgb24gdGhlIHBlcmlvZCBsYWJlbC4gKi9cbiAgICBjdXJyZW50UGVyaW9kQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKChbTWNDYWxlbmRhclZpZXcuTW9udGgsIE1jQ2FsZW5kYXJWaWV3Lk11bHRpWWVhcl0gYXMgTWNDYWxlbmRhclZpZXdbXSkuaW5jbHVkZXModGhpcy5jYWxlbmRhci5jdXJyZW50VmlldykpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPSBNY0NhbGVuZGFyVmlldy5ZZWFyO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT09IE1jQ2FsZW5kYXJWaWV3LlllYXIpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPSBNY0NhbGVuZGFyVmlldy5Nb250aDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBIYW5kbGVzIHVzZXIgY2xpY2tzIG9uIHRoZSBwcmV2aW91cyBidXR0b24uICovXG4gICAgcHJldmlvdXNDbGlja2VkKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jYWxlbmRhci5jdXJyZW50VmlldyA9PT0gTWNDYWxlbmRhclZpZXcuTW9udGgpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIuYWN0aXZlRGF0ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHModGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlLCAtMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnMoXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlLFxuICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT09IE1jQ2FsZW5kYXJWaWV3LlllYXIgPyAtMSA6IC15ZWFyc1BlclBhZ2VcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyB1c2VyIGNsaWNrcyBvbiB0aGUgbmV4dCBidXR0b24uICovXG4gICAgbmV4dENsaWNrZWQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3ID09PSBNY0NhbGVuZGFyVmlldy5Nb250aCkge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlID0gdGhpcy5kYXRlQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyh0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUsIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlID0gdGhpcy5kYXRlQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKFxuICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIuYWN0aXZlRGF0ZSxcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3ID09PSBNY0NhbGVuZGFyVmlldy5ZZWFyID8gMSA6IHllYXJzUGVyUGFnZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBwcmV2aW91cyBwZXJpb2QgYnV0dG9uIGlzIGVuYWJsZWQuICovXG4gICAgcHJldmlvdXNFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIXRoaXMuY2FsZW5kYXIubWluRGF0ZSkgeyByZXR1cm4gdHJ1ZTsgfVxuXG4gICAgICAgIHJldHVybiAhdGhpcy5jYWxlbmRhci5taW5EYXRlIHx8ICF0aGlzLmlzU2FtZVZpZXcodGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlLCB0aGlzLmNhbGVuZGFyLm1pbkRhdGUpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBuZXh0IHBlcmlvZCBidXR0b24gaXMgZW5hYmxlZC4gKi9cbiAgICBuZXh0RW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmNhbGVuZGFyLm1heERhdGUgfHwgIXRoaXMuaXNTYW1lVmlldyh0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUsIHRoaXMuY2FsZW5kYXIubWF4RGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHR3byBkYXRlcyByZXByZXNlbnQgdGhlIHNhbWUgdmlldyBpbiB0aGUgY3VycmVudCB2aWV3IG1vZGUgKG1vbnRoIG9yIHllYXIpLiAqL1xuICAgIHByaXZhdGUgaXNTYW1lVmlldyhmaXJzdERhdGU6IEQsIHNlY29uZERhdGU6IEQpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgZmlyc3RZZWFyID0gdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKGZpcnN0RGF0ZSk7XG4gICAgICAgIGNvbnN0IHNlY29uZFllYXIgPSB0aGlzLmRhdGVBZGFwdGVyLmdldFllYXIoc2Vjb25kRGF0ZSk7XG5cbiAgICAgICAgY29uc3QgZmlyc3RNb250aCA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TW9udGgoZmlyc3REYXRlKTtcbiAgICAgICAgY29uc3Qgc2Vjb25kTW9udGggPSB0aGlzLmRhdGVBZGFwdGVyLmdldE1vbnRoKHNlY29uZERhdGUpO1xuXG4gICAgICAgIGlmICh0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3ID09PSBNY0NhbGVuZGFyVmlldy5Nb250aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZpcnN0WWVhciA9PT0gc2Vjb25kWWVhciAmJiBmaXJzdE1vbnRoID09PSBzZWNvbmRNb250aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3ID09PSBNY0NhbGVuZGFyVmlldy5ZZWFyKSB7IHJldHVybiBmaXJzdFllYXIgPT09IHNlY29uZFllYXI7IH1cblxuICAgICAgICAvLyBPdGhlcndpc2Ugd2UgYXJlIGluICdtdWx0aS15ZWFyJyB2aWV3LlxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihmaXJzdFllYXIgLyB5ZWFyc1BlclBhZ2UpID09PSBNYXRoLmZsb29yKHNlY29uZFllYXIgLyB5ZWFyc1BlclBhZ2UpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBBIGNhbGVuZGFyIHRoYXQgaXMgdXNlZCBhcyBwYXJ0IG9mIHRoZSBkYXRlcGlja2VyLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLWNhbGVuZGFyJyxcbiAgICBleHBvcnRBczogJ21jQ2FsZW5kYXInLFxuICAgIHRlbXBsYXRlVXJsOiAnY2FsZW5kYXIuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2NhbGVuZGFyLnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtY2FsZW5kYXInXG4gICAgfSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1jQ2FsZW5kYXI8RD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG5cbiAgICAvKiogQSBkYXRlIHJlcHJlc2VudGluZyB0aGUgcGVyaW9kIChtb250aCBvciB5ZWFyKSB0byBzdGFydCB0aGUgY2FsZW5kYXIgaW4uICovXG4gICAgQElucHV0KClcbiAgICBnZXQgc3RhcnRBdCgpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGFydEF0O1xuICAgIH1cblxuICAgIHNldCBzdGFydEF0KHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9zdGFydEF0ID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgc2VsZWN0ZWQoKTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkKHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcbiAgICB9XG5cbiAgICAvKiogVGhlIG1pbmltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1pbkRhdGUoKTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgbWluRGF0ZSh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbWluRGF0ZSA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcbiAgICB9XG5cbiAgICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1heERhdGUoKTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgbWF4RGF0ZSh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbWF4RGF0ZSA9IHRoaXMuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBhY3RpdmUgZGF0ZS4gVGhpcyBkZXRlcm1pbmVzIHdoaWNoIHRpbWUgcGVyaW9kIGlzIHNob3duIGFuZCB3aGljaCBkYXRlIGlzXG4gICAgICogaGlnaGxpZ2h0ZWQgd2hlbiB1c2luZyBrZXlib2FyZCBuYXZpZ2F0aW9uLlxuICAgICAqL1xuICAgIGdldCBhY3RpdmVEYXRlKCk6IEQge1xuICAgICAgICByZXR1cm4gdGhpcy5jbGFtcGVkQWN0aXZlRGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgYWN0aXZlRGF0ZSh2YWx1ZTogRCkge1xuICAgICAgICB0aGlzLmNsYW1wZWRBY3RpdmVEYXRlID0gdGhpcy5kYXRlQWRhcHRlci5jbGFtcERhdGUodmFsdWUsIHRoaXMubWluRGF0ZSwgdGhpcy5tYXhEYXRlKTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBjYWxlbmRhciBpcyBpbiBtb250aCB2aWV3LiAqL1xuICAgIGdldCBjdXJyZW50VmlldygpOiBNY0NhbGVuZGFyVmlldyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50VmlldztcbiAgICB9XG5cbiAgICBzZXQgY3VycmVudFZpZXcodmFsdWU6IE1jQ2FsZW5kYXJWaWV3KSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRWaWV3ID0gdmFsdWU7XG4gICAgICAgIHRoaXMubW92ZUZvY3VzT25OZXh0VGljayA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqIEFuIGlucHV0IGluZGljYXRpbmcgdGhlIHR5cGUgb2YgdGhlIGhlYWRlciBjb21wb25lbnQsIGlmIHNldC4gKi9cbiAgICBASW5wdXQoKSBoZWFkZXJDb21wb25lbnQ6IENvbXBvbmVudFR5cGU8YW55PjtcblxuICAgIC8qKiBBIHBvcnRhbCBjb250YWluaW5nIHRoZSBoZWFkZXIgY29tcG9uZW50IHR5cGUgZm9yIHRoaXMgY2FsZW5kYXIuICovXG4gICAgY2FsZW5kYXJIZWFkZXJQb3J0YWw6IFBvcnRhbDxhbnk+O1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGNhbGVuZGFyIHNob3VsZCBiZSBzdGFydGVkIGluIG1vbnRoIG9yIHllYXIgdmlldy4gKi9cbiAgICBASW5wdXQoKSBzdGFydFZpZXc6IE1jQ2FsZW5kYXJWaWV3ID0gTWNDYWxlbmRhclZpZXcuTW9udGg7XG5cbiAgICAvKiogRnVuY3Rpb24gdXNlZCB0byBmaWx0ZXIgd2hpY2ggZGF0ZXMgYXJlIHNlbGVjdGFibGUuICovXG4gICAgQElucHV0KCkgZGF0ZUZpbHRlcjogKGRhdGU6IEQpID0+IGJvb2xlYW47XG5cbiAgICAvKiogRnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBhZGQgY3VzdG9tIENTUyBjbGFzc2VzIHRvIGRhdGVzLiAqL1xuICAgIEBJbnB1dCgpIGRhdGVDbGFzczogKGRhdGU6IEQpID0+IE1jQ2FsZW5kYXJDZWxsQ3NzQ2xhc3NlcztcblxuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZSBjaGFuZ2VzLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3RlZENoYW5nZTogRXZlbnRFbWl0dGVyPEQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEPigpO1xuXG4gICAgLyoqXG4gICAgICogRW1pdHMgdGhlIHllYXIgY2hvc2VuIGluIG11bHRpeWVhciB2aWV3LlxuICAgICAqIFRoaXMgZG9lc24ndCBpbXBseSBhIGNoYW5nZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZS5cbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgeWVhclNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8RD4gPSBuZXcgRXZlbnRFbWl0dGVyPEQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyB0aGUgbW9udGggY2hvc2VuIGluIHllYXIgdmlldy5cbiAgICAgKiBUaGlzIGRvZXNuJ3QgaW1wbHkgYSBjaGFuZ2Ugb24gdGhlIHNlbGVjdGVkIGRhdGUuXG4gICAgICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IG1vbnRoU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxEPiA9IG5ldyBFdmVudEVtaXR0ZXI8RD4oKTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIGFueSBkYXRlIGlzIHNlbGVjdGVkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSB1c2VyU2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IG1vbnRoIHZpZXcgY29tcG9uZW50LiAqL1xuICAgIEBWaWV3Q2hpbGQoTWNNb250aFZpZXcsIHtzdGF0aWM6IGZhbHNlfSkgbW9udGhWaWV3OiBNY01vbnRoVmlldzxEPjtcblxuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgeWVhciB2aWV3IGNvbXBvbmVudC4gKi9cbiAgICBAVmlld0NoaWxkKE1jWWVhclZpZXcsIHtzdGF0aWM6IGZhbHNlfSkgeWVhclZpZXc6IE1jWWVhclZpZXc8RD47XG5cbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IG11bHRpLXllYXIgdmlldyBjb21wb25lbnQuICovXG4gICAgQFZpZXdDaGlsZChNY011bHRpWWVhclZpZXcsIHtzdGF0aWM6IGZhbHNlfSkgbXVsdGlZZWFyVmlldzogTWNNdWx0aVllYXJWaWV3PEQ+O1xuXG4gICAgLyoqXG4gICAgICogRW1pdHMgd2hlbmV2ZXIgdGhlcmUgaXMgYSBzdGF0ZSBjaGFuZ2UgdGhhdCB0aGUgaGVhZGVyIG1heSBuZWVkIHRvIHJlc3BvbmQgdG8uXG4gICAgICovXG4gICAgc3RhdGVDaGFuZ2VzID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgaW50bENoYW5nZXM6IFN1YnNjcmlwdGlvbjtcblxuICAgIC8qKlxuICAgICAqIFVzZWQgZm9yIHNjaGVkdWxpbmcgdGhhdCBmb2N1cyBzaG91bGQgYmUgbW92ZWQgdG8gdGhlIGFjdGl2ZSBjZWxsIG9uIHRoZSBuZXh0IHRpY2suXG4gICAgICogV2UgbmVlZCB0byBzY2hlZHVsZSBpdCwgcmF0aGVyIHRoYW4gZG8gaXQgaW1tZWRpYXRlbHksIGJlY2F1c2Ugd2UgaGF2ZSB0byB3YWl0XG4gICAgICogZm9yIEFuZ3VsYXIgdG8gcmUtZXZhbHVhdGUgdGhlIHZpZXcgY2hpbGRyZW4uXG4gICAgICovXG4gICAgcHJpdmF0ZSBtb3ZlRm9jdXNPbk5leHRUaWNrID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfc3RhcnRBdDogRCB8IG51bGw7XG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IEQgfCBudWxsO1xuICAgIHByaXZhdGUgX21pbkRhdGU6IEQgfCBudWxsO1xuICAgIHByaXZhdGUgX21heERhdGU6IEQgfCBudWxsO1xuICAgIHByaXZhdGUgY2xhbXBlZEFjdGl2ZURhdGU6IEQ7XG4gICAgcHJpdmF0ZSBfY3VycmVudFZpZXc6IE1jQ2FsZW5kYXJWaWV3O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGludGw6IE1jRGF0ZXBpY2tlckludGwsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcmVhZG9ubHkgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1DX0RBVEVfRk9STUFUUykgcHJpdmF0ZSByZWFkb25seSBkYXRlRm9ybWF0czogTWNEYXRlRm9ybWF0cyxcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGVBZGFwdGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcignRGF0ZUFkYXB0ZXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5kYXRlRm9ybWF0cykge1xuICAgICAgICAgICAgdGhyb3cgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IoJ01DX0RBVEVfRk9STUFUUycpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbnRsQ2hhbmdlcyA9IGludGwuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhckhlYWRlclBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwodGhpcy5oZWFkZXJDb21wb25lbnQgfHwgTWNDYWxlbmRhckhlYWRlcik7XG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuc3RhcnRBdCB8fCB0aGlzLmRhdGVBZGFwdGVyLnRvZGF5KCk7XG5cbiAgICAgICAgLy8gQXNzaWduIHRvIHRoZSBwcml2YXRlIHByb3BlcnR5IHNpbmNlIHdlIGRvbid0IHdhbnQgdG8gbW92ZSBmb2N1cyBvbiBpbml0LlxuICAgICAgICB0aGlzLl9jdXJyZW50VmlldyA9IHRoaXMuc3RhcnRWaWV3O1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMubW92ZUZvY3VzT25OZXh0VGljaykge1xuICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXNPbk5leHRUaWNrID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmZvY3VzQWN0aXZlQ2VsbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuaW50bENoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZSA9IGNoYW5nZXMubWluRGF0ZSB8fCBjaGFuZ2VzLm1heERhdGUgfHwgY2hhbmdlcy5kYXRlRmlsdGVyO1xuXG4gICAgICAgIGlmIChjaGFuZ2UgJiYgIWNoYW5nZS5maXJzdENoYW5nZSkge1xuICAgICAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuZ2V0Q3VycmVudFZpZXdDb21wb25lbnQoKTtcblxuICAgICAgICAgICAgaWYgKHZpZXcpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBuZWVkIHRvIGBkZXRlY3RDaGFuZ2VzYCBtYW51YWxseSBoZXJlLCBiZWNhdXNlIHRoZSBgbWluRGF0ZWAsIGBtYXhEYXRlYCBldGMuIGFyZVxuICAgICAgICAgICAgICAgIC8vIHBhc3NlZCBkb3duIHRvIHRoZSB2aWV3IHZpYSBkYXRhIGJpbmRpbmdzIHdoaWNoIHdvbid0IGJlIHVwLXRvLWRhdGUgd2hlbiB3ZSBjYWxsIGBpbml0YC5cbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB2aWV3LmluaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBmb2N1c0FjdGl2ZUNlbGwoKSB7XG4gICAgICAgIHRoaXMuZ2V0Q3VycmVudFZpZXdDb21wb25lbnQoKS5mb2N1c0FjdGl2ZUNlbGwoKTtcbiAgICB9XG5cbiAgICAvKiogVXBkYXRlcyB0b2RheSdzIGRhdGUgYWZ0ZXIgYW4gdXBkYXRlIG9mIHRoZSBhY3RpdmUgZGF0ZSAqL1xuICAgIHVwZGF0ZVRvZGF5c0RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLmN1cnJlbnRWaWV3ID09PSBNY0NhbGVuZGFyVmlldy5Nb250aCA/IHRoaXMubW9udGhWaWV3IDpcbiAgICAgICAgICAgICh0aGlzLmN1cnJlbnRWaWV3ID09PSBNY0NhbGVuZGFyVmlldy5ZZWFyID8gdGhpcy55ZWFyVmlldyA6IHRoaXMubXVsdGlZZWFyVmlldyk7XG5cbiAgICAgICAgdmlldy5uZ0FmdGVyQ29udGVudEluaXQoKTtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyBkYXRlIHNlbGVjdGlvbiBpbiB0aGUgbW9udGggdmlldy4gKi9cbiAgICBkYXRlU2VsZWN0ZWQoZGF0ZTogRCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZGF0ZUFkYXB0ZXIuc2FtZURhdGUoZGF0ZSwgdGhpcy5zZWxlY3RlZCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChkYXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBIYW5kbGVzIHllYXIgc2VsZWN0aW9uIGluIHRoZSBtdWx0aXllYXIgdmlldy4gKi9cbiAgICB5ZWFyU2VsZWN0ZWRJbk11bHRpWWVhclZpZXcobm9ybWFsaXplZFllYXI6IEQpIHtcbiAgICAgICAgdGhpcy55ZWFyU2VsZWN0ZWQuZW1pdChub3JtYWxpemVkWWVhcik7XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMgbW9udGggc2VsZWN0aW9uIGluIHRoZSB5ZWFyIHZpZXcuICovXG4gICAgbW9udGhTZWxlY3RlZEluWWVhclZpZXcobm9ybWFsaXplZE1vbnRoOiBEKSB7XG4gICAgICAgIHRoaXMubW9udGhTZWxlY3RlZC5lbWl0KG5vcm1hbGl6ZWRNb250aCk7XG4gICAgfVxuXG4gICAgdXNlclNlbGVjdGVkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVzZXJTZWxlY3Rpb24uZW1pdCgpO1xuICAgIH1cblxuICAgIC8qKiBIYW5kbGVzIHllYXIvbW9udGggc2VsZWN0aW9uIGluIHRoZSBtdWx0aS15ZWFyL3llYXIgdmlld3MuICovXG4gICAgZ29Ub0RhdGVJblZpZXcoZGF0ZTogRCwgdmlldzogTWNDYWxlbmRhclZpZXcgfCBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gZGF0ZTtcbiAgICAgICAgdGhpcy5jdXJyZW50VmlldyA9IHZpZXcgYXMgTWNDYWxlbmRhclZpZXc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIFRoZSBnaXZlbiBvYmplY3QgaWYgaXQgaXMgYm90aCBhIGRhdGUgaW5zdGFuY2UgYW5kIHZhbGlkLCBvdGhlcndpc2UgbnVsbC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFZhbGlkRGF0ZU9yTnVsbChvYmo6IGFueSk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmRhdGVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiYgdGhpcy5kYXRlQWRhcHRlci5pc1ZhbGlkKG9iaikpID8gb2JqIDogbnVsbDtcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyB0aGUgY29tcG9uZW50IGluc3RhbmNlIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIGN1cnJlbnQgY2FsZW5kYXIgdmlldy4gKi9cbiAgICBwcml2YXRlIGdldEN1cnJlbnRWaWV3Q29tcG9uZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb250aFZpZXcgfHwgdGhpcy55ZWFyVmlldyB8fCB0aGlzLm11bHRpWWVhclZpZXc7XG4gICAgfVxufVxuIiwiPGJ1dHRvbiBtYy1idXR0b25cbiAgICAgICAgW3RhYmluZGV4XT1cIictMSdcIlxuICAgICAgICBjbGFzcz1cIm1jLWJ1dHRvbl90cmFuc3BhcmVudCBtYy1jYWxlbmRhcl9fcGVyaW9kLWJ1dHRvblwiXG4gICAgICAgIChjbGljayk9XCJjdXJyZW50UGVyaW9kQ2xpY2tlZCgpXCI+XG4gICAge3sgcGVyaW9kQnV0dG9uVGV4dCB9fVxuXG4gICAgPGkgY2xhc3M9XCJtYyBtYy1pY29uXCJcbiAgICAgICBbY2xhc3MubWMtYW5nbGUtdXAtTV8xNl09XCJjYWxlbmRhci5jdXJyZW50VmlldyAhPT0gJ21vbnRoJ1wiXG4gICAgICAgW2NsYXNzLm1jLWFuZ2xlLWRvd24tTV8xNl09XCJjYWxlbmRhci5jdXJyZW50VmlldyA9PT0gJ21vbnRoJ1wiPlxuICAgIDwvaT5cbjwvYnV0dG9uPlxuXG48ZGl2IGNsYXNzPVwibWMtY2FsZW5kYXItc3BhY2VyXCI+PC9kaXY+XG5cbjxidXR0b24gbWMtYnV0dG9uXG4gICAgICAgIFt0YWJpbmRleF09XCInLTEnXCJcbiAgICAgICAgY2xhc3M9XCJtYy1idXR0b25fdHJhbnNwYXJlbnQgbWMtY2FsZW5kYXJfX3ByZXZpb3VzLWJ1dHRvblwiXG4gICAgICAgIFtkaXNhYmxlZF09XCIhcHJldmlvdXNFbmFibGVkKClcIlxuICAgICAgICAoY2xpY2spPVwicHJldmlvdXNDbGlja2VkKClcIj5cblxuICAgIDxpIG1jLWljb249XCJtYy1hbmdsZS1sZWZ0LUxfMTZcIj48L2k+XG48L2J1dHRvbj5cblxuPGJ1dHRvbiBtYy1idXR0b25cbiAgICAgICAgW3RhYmluZGV4XT1cIictMSdcIlxuICAgICAgICBjbGFzcz1cIm1jLWJ1dHRvbl90cmFuc3BhcmVudCBtYy1jYWxlbmRhcl9fbmV4dC1idXR0b25cIlxuICAgICAgICBbZGlzYWJsZWRdPVwiIW5leHRFbmFibGVkKClcIlxuICAgICAgICAoY2xpY2spPVwibmV4dENsaWNrZWQoKVwiPlxuXG4gICAgPGkgbWMtaWNvbj1cIm1jLWFuZ2xlLXJpZ2h0LUxfMTZcIj48L2k+XG48L2J1dHRvbj5cbiIsIjxuZy10ZW1wbGF0ZSBbY2RrUG9ydGFsT3V0bGV0XT1cImNhbGVuZGFySGVhZGVyUG9ydGFsXCI+PC9uZy10ZW1wbGF0ZT5cblxuPGRpdiBjbGFzcz1cIm1jLWNhbGVuZGFyX19jb250ZW50XCIgW25nU3dpdGNoXT1cImN1cnJlbnRWaWV3XCI+XG4gICAgPG1jLW1vbnRoLXZpZXdcbiAgICAgICAgKm5nU3dpdGNoQ2FzZT1cIidtb250aCdcIlxuICAgICAgICBbKGFjdGl2ZURhdGUpXT1cImFjdGl2ZURhdGVcIlxuICAgICAgICBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRcIlxuICAgICAgICBbZGF0ZUZpbHRlcl09XCJkYXRlRmlsdGVyXCJcbiAgICAgICAgW21heERhdGVdPVwibWF4RGF0ZVwiXG4gICAgICAgIFttaW5EYXRlXT1cIm1pbkRhdGVcIlxuICAgICAgICBbZGF0ZUNsYXNzXT1cImRhdGVDbGFzc1wiXG4gICAgICAgIChzZWxlY3RlZENoYW5nZSk9XCJkYXRlU2VsZWN0ZWQoJGV2ZW50ISlcIlxuICAgICAgICAodXNlclNlbGVjdGlvbik9XCJ1c2VyU2VsZWN0ZWQoKVwiPlxuICAgIDwvbWMtbW9udGgtdmlldz5cblxuICAgIDxtYy15ZWFyLXZpZXdcbiAgICAgICAgKm5nU3dpdGNoQ2FzZT1cIid5ZWFyJ1wiXG4gICAgICAgIFsoYWN0aXZlRGF0ZSldPVwiYWN0aXZlRGF0ZVwiXG4gICAgICAgIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiXG4gICAgICAgIFtkYXRlRmlsdGVyXT1cImRhdGVGaWx0ZXJcIlxuICAgICAgICBbbWF4RGF0ZV09XCJtYXhEYXRlXCJcbiAgICAgICAgW21pbkRhdGVdPVwibWluRGF0ZVwiXG4gICAgICAgIChtb250aFNlbGVjdGVkKT1cIm1vbnRoU2VsZWN0ZWRJblllYXJWaWV3KCRldmVudClcIlxuICAgICAgICAoc2VsZWN0ZWRDaGFuZ2UpPVwiZ29Ub0RhdGVJblZpZXcoJGV2ZW50LCAnbXVsdGkteWVhcicpXCI+XG4gICAgPC9tYy15ZWFyLXZpZXc+XG5cbiAgICA8bWMtbXVsdGkteWVhci12aWV3XG4gICAgICAgICpuZ1N3aXRjaENhc2U9XCInbXVsdGkteWVhcidcIlxuICAgICAgICBbKGFjdGl2ZURhdGUpXT1cImFjdGl2ZURhdGVcIlxuICAgICAgICBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRcIlxuICAgICAgICBbZGF0ZUZpbHRlcl09XCJkYXRlRmlsdGVyXCJcbiAgICAgICAgW21heERhdGVdPVwibWF4RGF0ZVwiXG4gICAgICAgIFttaW5EYXRlXT1cIm1pbkRhdGVcIlxuICAgICAgICAoeWVhclNlbGVjdGVkKT1cInllYXJTZWxlY3RlZEluTXVsdGlZZWFyVmlldygkZXZlbnQpXCJcbiAgICAgICAgKHNlbGVjdGVkQ2hhbmdlKT1cImdvVG9EYXRlSW5WaWV3KCRldmVudCwgJ21vbnRoJylcIj5cbiAgICA8L21jLW11bHRpLXllYXItdmlldz5cbjwvZGl2PlxuIl19