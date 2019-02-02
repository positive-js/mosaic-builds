/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __param, __metadata, __extends } from 'tslib';
import { Injectable, NgModule, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Inject, Input, Optional, Output, ViewChild, ViewEncapsulation, ElementRef, NgZone, InjectionToken, ViewContainerRef, Directive, Attribute, ContentChild, defineInjectable } from '@angular/core';
import { Subject, merge, Subscription, of } from 'rxjs';
import { take, filter } from 'rxjs/operators';
import { Directionality } from '@ptsecurity/cdk/bidi';
import { DateAdapter, MC_DATE_FORMATS } from '@ptsecurity/cdk/datetime';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW, SPACE, ESCAPE } from '@ptsecurity/cdk/keycodes';
import { ComponentPortal, PortalModule } from '@ptsecurity/cdk/portal';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DOCUMENT, CommonModule } from '@angular/common';
import { coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { Overlay, OverlayConfig, OverlayModule } from '@ptsecurity/cdk/overlay';
import { mixinColor } from '@ptsecurity/mosaic/core';
import { McFormFieldControl, McFormField } from '@ptsecurity/mosaic/form-field';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MC_INPUT_VALUE_ACCESSOR } from '@ptsecurity/mosaic/input';
import { McButton, McButtonModule } from '@ptsecurity/mosaic/button';
import { A11yModule } from '@ptsecurity/cdk/a11y';
import { McIconModule } from '@ptsecurity/mosaic/icon';

/** @docs-private */
function createMissingDateImplError(provider) {
    return Error("McDatepicker: No provider found for " + provider + ". You must import one of the existing " +
        "modules at your application root or provide a custom implementation or use exists ones.");
}

/** Datepicker data that requires internationalization. */
var McDatepickerIntl = /** @class */ (function () {
    function McDatepickerIntl() {
        /**
         * Stream that emits whenever the labels here are changed. Use this to notify
         * components if the labels have changed after initialization.
         */
        this.changes = new Subject();
        /** A label for the calendar popup (used by screen readers). */
        this.calendarLabel = 'Calendar';
        /** A label for the button used to open the calendar popup (used by screen readers). */
        this.openCalendarLabel = 'Open calendar';
        /** A label for the previous month button (used by screen readers). */
        this.prevMonthLabel = 'Previous month';
        /** A label for the next month button (used by screen readers). */
        this.nextMonthLabel = 'Next month';
        /** A label for the previous year button (used by screen readers). */
        this.prevYearLabel = 'Previous year';
        /** A label for the next year button (used by screen readers). */
        this.nextYearLabel = 'Next year';
        /** A label for the previous multi-year button (used by screen readers). */
        this.prevMultiYearLabel = 'Previous 20 years';
        /** A label for the next multi-year button (used by screen readers). */
        this.nextMultiYearLabel = 'Next 20 years';
        /** A label for the 'switch to month view' button (used by screen readers). */
        this.switchToMonthViewLabel = 'Choose date';
        /** A label for the 'switch to year view' button (used by screen readers). */
        this.switchToMultiYearViewLabel = 'Choose month and year';
    }
    McDatepickerIntl.ngInjectableDef = defineInjectable({ factory: function McDatepickerIntl_Factory() { return new McDatepickerIntl(); }, token: McDatepickerIntl, providedIn: "root" });
    McDatepickerIntl = __decorate([
        Injectable({ providedIn: 'root' })
    ], McDatepickerIntl);
    return McDatepickerIntl;
}());

/**
 * An internal class that represents the data corresponding to a single calendar cell.
 * @docs-private
 */
var McCalendarCell = /** @class */ (function () {
    function McCalendarCell(value, displayValue, ariaLabel, enabled, cssClasses) {
        this.value = value;
        this.displayValue = displayValue;
        this.ariaLabel = ariaLabel;
        this.enabled = enabled;
        this.cssClasses = cssClasses;
    }
    return McCalendarCell;
}());
/**
 * An internal component used to display calendar data in a table.
 * @docs-private
 */
var McCalendarBody = /** @class */ (function () {
    function McCalendarBody(elementRef, ngZone) {
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        /** The number of columns in the table. */
        this.numCols = 7;
        /** The cell number of the active cell in the table. */
        this.activeCell = 0;
        /**
         * The aspect ratio (width / height) to use for the cells in the table. This aspect ratio will be
         * maintained even as the table resizes.
         */
        this.cellAspectRatio = 1;
        /** Emits when a new value is selected. */
        this.selectedValueChange = new EventEmitter();
    }
    McCalendarBody.prototype.cellClicked = function (cell) {
        if (cell.enabled) {
            this.selectedValueChange.emit(cell.value);
        }
    };
    McCalendarBody.prototype.ngOnChanges = function (changes) {
        var columnChanges = changes.numCols;
        // tslint:disable-next-line:no-this-assignment
        var _a = this, rows = _a.rows, numCols = _a.numCols;
        if (changes.rows || columnChanges) {
            this.firstRowOffset = rows && rows.length && rows[0].length ? numCols - rows[0].length : 0;
        }
        if (changes.cellAspectRatio || columnChanges || !this.cellPadding) {
            this.cellPadding = this.cellAspectRatio * 50 / numCols + "%";
        }
        if (columnChanges || !this.cellWidth) {
            this.cellWidth = 100 / numCols + "%";
        }
    };
    McCalendarBody.prototype.isActiveCell = function (rowIndex, colIndex) {
        var cellNumber = rowIndex * this.numCols + colIndex;
        // Account for the fact that the first row may not have as many cells.
        if (rowIndex) {
            cellNumber -= this.firstRowOffset;
        }
        return cellNumber === this.activeCell;
    };
    /** Focuses the active cell after the microtask queue is empty. */
    McCalendarBody.prototype.focusActiveCell = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            _this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(function () {
                var activeCell = _this.elementRef.nativeElement.querySelector('.mc-calendar__body_active');
                if (activeCell) {
                    activeCell.focus();
                }
            });
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], McCalendarBody.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], McCalendarBody.prototype, "rows", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], McCalendarBody.prototype, "todayValue", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], McCalendarBody.prototype, "selectedValue", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], McCalendarBody.prototype, "labelMinRequiredCells", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], McCalendarBody.prototype, "numCols", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], McCalendarBody.prototype, "activeCell", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], McCalendarBody.prototype, "cellAspectRatio", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McCalendarBody.prototype, "selectedValueChange", void 0);
    McCalendarBody = __decorate([
        Component({
            selector: '[mc-calendar-body]',
            template: "<tr *ngIf=\"firstRowOffset < labelMinRequiredCells\" aria-hidden=\"true\"><td class=\"mc-calendar__body-label\" [attr.colspan]=\"numCols\" [style.paddingTop]=\"cellPadding\" [style.paddingBottom]=\"cellPadding\">{{label}}</td></tr><tr *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\"><td *ngIf=\"rowIndex === 0 && firstRowOffset\" aria-hidden=\"true\" class=\"mc-calendar__body-label\" [attr.colspan]=\"firstRowOffset\" [style.paddingTop]=\"cellPadding\" [style.paddingBottom]=\"cellPadding\">{{firstRowOffset >= labelMinRequiredCells ? label : ''}}</td><td *ngFor=\"let item of row; let colIndex = index\" role=\"gridcell\" class=\"mc-calendar__body-cell\" [ngClass]=\"item.cssClasses\" [tabindex]=\"isActiveCell(rowIndex, colIndex) ? 0 : -1\" [class.mc-calendar__body_disabled]=\"!item.enabled\" [class.mc-calendar__body_active]=\"isActiveCell(rowIndex, colIndex)\" [attr.aria-label]=\"item.ariaLabel\" [attr.aria-disabled]=\"!item.enabled || null\" [attr.aria-selected]=\"selectedValue === item.value\" (click)=\"cellClicked(item)\" [style.width]=\"cellWidth\" [style.paddingTop]=\"cellPadding\" [style.paddingBottom]=\"cellPadding\"><div class=\"mc-calendar__body-cell-content\" [class.mc-calendar__body_selected]=\"selectedValue === item.value\" [class.mc-calendar__body-today]=\"todayValue === item.value\">{{item.displayValue}}</div></td></tr>",
            styles: [".mc-calendar__body{min-width:224px}.mc-calendar__body-label{height:0;line-height:0;text-align:left;padding-left:4.71429%;padding-right:4.71429%}.mc-calendar__body-cell{position:relative;height:0;line-height:0;text-align:center;outline:0;cursor:pointer}.mc-calendar__body_disabled{cursor:default}.mc-calendar__body-cell-content{position:absolute;top:5%;left:5%;padding:8px;display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:90%;height:90%;line-height:1;border-width:1px;border-style:solid}@media screen and (-ms-high-contrast:active){.mc-calendar__body-cell-content{border:none}}mc-month-view .mc-calendar__body-cell-content{justify-content:flex-end}mc-multi-year-view .mc-calendar__body-cell-content,mc-year-view .mc-calendar__body-cell-content{justify-content:center}@media screen and (-ms-high-contrast:active){.mc-calendar__body_selected,.mc-datepicker__popup:not(:empty){outline:solid 1px}.mc-calendar__body-today{outline:dotted 1px}}[dir=rtl] .mc-calendar__body-label{text-align:right}"],
            host: {
                class: 'mc-calendar__body',
                role: 'grid',
                'aria-readonly': 'true'
            },
            exportAs: 'mcCalendarBody',
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [ElementRef, NgZone])
    ], McCalendarBody);
    return McCalendarBody;
}());

var DAYS_PER_WEEK = 7;
/**
 * An internal component used to display a single month in the datepicker.
 * @docs-private
 */
var McMonthView = /** @class */ (function () {
    function McMonthView(changeDetectorRef, dateFormats, dateAdapter, dir) {
        this.changeDetectorRef = changeDetectorRef;
        this.dateFormats = dateFormats;
        this.dateAdapter = dateAdapter;
        this.dir = dir;
        /** Emits when a new date is selected. */
        this.selectedChange = new EventEmitter();
        /** Emits when any date is selected. */
        this.userSelection = new EventEmitter();
        /** Emits when any date is activated. */
        this.activeDateChange = new EventEmitter();
        if (!this.dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        if (!this.dateFormats) {
            throw createMissingDateImplError('MC_DATE_FORMATS');
        }
        var firstDayOfWeek = this.dateAdapter.getFirstDayOfWeek();
        var narrowWeekdays = this.dateAdapter.getDayOfWeekNames('narrow');
        var longWeekdays = this.dateAdapter.getDayOfWeekNames('long');
        // Rotate the labels for days of the week based on the configured first day of the week.
        var weekdays = longWeekdays.map(function (long, i) {
            return { long: long, narrow: narrowWeekdays[i] };
        });
        this.weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
        this._activeDate = this.dateAdapter.today();
    }
    Object.defineProperty(McMonthView.prototype, "activeDate", {
        /**
         * The date to display in this month view (everything other than the month and year is ignored).
         */
        get: function () {
            return this._activeDate;
        },
        set: function (value) {
            var oldActiveDate = this._activeDate;
            var validDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value)) || this.dateAdapter.today();
            this._activeDate = this.dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
            if (!this.hasSameMonthAndYear(oldActiveDate, this._activeDate)) {
                this.init();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McMonthView.prototype, "selected", {
        /** The currently selected date. */
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            this.selectedDate = this.getDateInCurrentMonth(this._selected);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McMonthView.prototype, "minDate", {
        /** The minimum selectable date. */
        get: function () {
            return this._minDate;
        },
        set: function (value) {
            this._minDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McMonthView.prototype, "maxDate", {
        /** The maximum selectable date. */
        get: function () {
            return this._maxDate;
        },
        set: function (value) {
            this._maxDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    McMonthView.prototype.ngAfterContentInit = function () {
        this.init();
    };
    /** Handles when a new date is selected. */
    McMonthView.prototype.dateSelected = function (date) {
        if (this.selectedDate !== date) {
            var selectedYear = this.dateAdapter.getYear(this.activeDate);
            var selectedMonth = this.dateAdapter.getMonth(this.activeDate);
            var selectedDate = this.dateAdapter.createDate(selectedYear, selectedMonth, date);
            this.selectedChange.emit(selectedDate);
        }
        this.userSelection.emit();
    };
    /** Handles keydown events on the calendar body when calendar is in month view. */
    McMonthView.prototype.handleCalendarBodyKeydown = function (event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        var oldActiveDate = this._activeDate;
        var isRtl = this.isRtl();
        // tslint:disable-next-line:deprecation
        switch (event.keyCode) {
            case LEFT_ARROW:
                this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, isRtl ? 1 : -1);
                break;
            case RIGHT_ARROW:
                this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, isRtl ? -1 : 1);
                break;
            case UP_ARROW:
                this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, -7);
                break;
            case DOWN_ARROW:
                this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, 7);
                break;
            case HOME:
                this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, 1 - this.dateAdapter.getDate(this._activeDate));
                break;
            case END:
                this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, (this.dateAdapter.getNumDaysInMonth(this._activeDate) -
                    this.dateAdapter.getDate(this._activeDate)));
                break;
            case PAGE_UP:
                this.activeDate = event.altKey ?
                    this.dateAdapter.addCalendarYears(this._activeDate, -1) :
                    this.dateAdapter.addCalendarMonths(this._activeDate, -1);
                break;
            case PAGE_DOWN:
                this.activeDate = event.altKey ?
                    this.dateAdapter.addCalendarYears(this._activeDate, 1) :
                    this.dateAdapter.addCalendarMonths(this._activeDate, 1);
                break;
            case ENTER:
            case SPACE:
                if (!this.dateFilter || this.dateFilter(this._activeDate)) {
                    this.dateSelected(this.dateAdapter.getDate(this._activeDate));
                    this.userSelection.emit();
                    // Prevent unexpected default actions such as form submission.
                    event.preventDefault();
                }
                return;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        if (this.dateAdapter.compareDate(oldActiveDate, this.activeDate)) {
            this.activeDateChange.emit(this.activeDate);
        }
        this.focusActiveCell();
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    };
    /** Initializes this month view. */
    McMonthView.prototype.init = function () {
        this.selectedDate = this.getDateInCurrentMonth(this.selected);
        this.todayDate = this.getDateInCurrentMonth(this.dateAdapter.today());
        this.monthLabel =
            this.dateAdapter.getMonthNames('short')[this.dateAdapter.getMonth(this.activeDate)];
        this.monthLabel = this.monthLabel[0].toLocaleUpperCase() + this.monthLabel.substr(1);
        var firstOfMonth = this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), this.dateAdapter.getMonth(this.activeDate), 1);
        this.firstWeekOffset =
            (DAYS_PER_WEEK + this.dateAdapter.getDayOfWeek(firstOfMonth) -
                this.dateAdapter.getFirstDayOfWeek()) % DAYS_PER_WEEK;
        this.createWeekCells();
        this.changeDetectorRef.markForCheck();
    };
    /** Focuses the active cell after the microtask queue is empty. */
    McMonthView.prototype.focusActiveCell = function () {
        this.mcCalendarBody.focusActiveCell();
    };
    /** Creates McCalendarCells for the dates in this month. */
    McMonthView.prototype.createWeekCells = function () {
        var daysInMonth = this.dateAdapter.getNumDaysInMonth(this.activeDate);
        var dateNames = this.dateAdapter.getDateNames();
        this.weeks = [[]];
        for (var i = 0, cell = this.firstWeekOffset; i < daysInMonth; i++, cell++) {
            if (cell === DAYS_PER_WEEK) {
                this.weeks.push([]);
                cell = 0;
            }
            var date = this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), this.dateAdapter.getMonth(this.activeDate), i + 1);
            var enabled = this.shouldEnableDate(date);
            var ariaLabel = this.dateAdapter.format(date, this.dateFormats.display.dateA11yLabel);
            var cellClasses = this.dateClass ? this.dateClass(date) : undefined;
            this.weeks[this.weeks.length - 1]
                .push(new McCalendarCell(i + 1, dateNames[i], ariaLabel, enabled, cellClasses));
        }
    };
    /** Date filter for the month */
    McMonthView.prototype.shouldEnableDate = function (date) {
        return !!date &&
            (!this.dateFilter || this.dateFilter(date)) &&
            (!this.minDate || this.dateAdapter.compareDate(date, this.minDate) >= 0) &&
            (!this.maxDate || this.dateAdapter.compareDate(date, this.maxDate) <= 0);
    };
    /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     */
    McMonthView.prototype.getDateInCurrentMonth = function (date) {
        return date && this.hasSameMonthAndYear(date, this.activeDate) ?
            this.dateAdapter.getDate(date) : null;
    };
    /** Checks whether the 2 dates are non-null and fall within the same month of the same year. */
    McMonthView.prototype.hasSameMonthAndYear = function (d1, d2) {
        return !!(d1 && d2 && this.dateAdapter.getMonth(d1) === this.dateAdapter.getMonth(d2) &&
            this.dateAdapter.getYear(d1) === this.dateAdapter.getYear(d2));
    };
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    McMonthView.prototype.getValidDateOrNull = function (obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    };
    /** Determines whether the user has the RTL layout direction. */
    McMonthView.prototype.isRtl = function () {
        return this.dir && this.dir.value === 'rtl';
    };
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McMonthView.prototype, "activeDate", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McMonthView.prototype, "selected", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McMonthView.prototype, "minDate", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McMonthView.prototype, "maxDate", null);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], McMonthView.prototype, "dateFilter", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], McMonthView.prototype, "dateClass", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McMonthView.prototype, "selectedChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McMonthView.prototype, "userSelection", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McMonthView.prototype, "activeDateChange", void 0);
    __decorate([
        ViewChild(McCalendarBody),
        __metadata("design:type", McCalendarBody)
    ], McMonthView.prototype, "mcCalendarBody", void 0);
    McMonthView = __decorate([
        Component({
            selector: 'mc-month-view',
            template: "<table class=\"mc-calendar__table\"><thead class=\"mc-calendar__table-header\"><tr><th *ngFor=\"let day of weekdays\" [attr.aria-label]=\"day.long\">{{day.narrow}}</th></tr><tr><th class=\"mc-calendar__table-header-divider\" colspan=\"7\" aria-hidden=\"true\"></th></tr></thead><tbody mc-calendar-body [label]=\"monthLabel\" [rows]=\"weeks\" [todayValue]=\"todayDate\" [selectedValue]=\"selectedDate\" [labelMinRequiredCells]=\"3\" [activeCell]=\"dateAdapter.getDate(activeDate) - 1\" (selectedValueChange)=\"dateSelected($event)\" (keydown)=\"handleCalendarBodyKeydown($event)\"></tbody></table>",
            exportAs: 'mcMonthView',
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param(1, Optional()), __param(1, Inject(MC_DATE_FORMATS)),
        __param(2, Optional()),
        __param(3, Optional()),
        __metadata("design:paramtypes", [ChangeDetectorRef, Object, DateAdapter,
            Directionality])
    ], McMonthView);
    return McMonthView;
}());

var yearsPerPage = 24;
var yearsPerRow = 4;
/**
 * An internal component used to display a year selector in the datepicker.
 * @docs-private
 */
var McMultiYearView = /** @class */ (function () {
    function McMultiYearView(changeDetectorRef, dateAdapter, dir) {
        this.changeDetectorRef = changeDetectorRef;
        this.dateAdapter = dateAdapter;
        this.dir = dir;
        /** Emits when a new year is selected. */
        this.selectedChange = new EventEmitter();
        /** Emits the selected year. This doesn't imply a change on the selected date */
        this.yearSelected = new EventEmitter();
        /** Emits when any date is activated. */
        this.activeDateChange = new EventEmitter();
        if (!this.dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        this._activeDate = this.dateAdapter.today();
    }
    Object.defineProperty(McMultiYearView.prototype, "activeDate", {
        /** The date to display in this multi-year view (everything other than the year is ignored). */
        get: function () {
            return this._activeDate;
        },
        set: function (value) {
            var oldActiveDate = this._activeDate;
            var validDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value)) || this.dateAdapter.today();
            this._activeDate = this.dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
            if (Math.floor(this.dateAdapter.getYear(oldActiveDate) / yearsPerPage) !==
                Math.floor(this.dateAdapter.getYear(this._activeDate) / yearsPerPage)) {
                this.init();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McMultiYearView.prototype, "selected", {
        /** The currently selected date. */
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            this.selectedYear = this._selected && this.dateAdapter.getYear(this._selected);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McMultiYearView.prototype, "minDate", {
        /** The minimum selectable date. */
        get: function () {
            return this._minDate;
        },
        set: function (value) {
            this._minDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McMultiYearView.prototype, "maxDate", {
        /** The maximum selectable date. */
        get: function () {
            return this._maxDate;
        },
        set: function (value) {
            this._maxDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    McMultiYearView.prototype.ngAfterContentInit = function () {
        this.init();
    };
    /** Initializes this multi-year view. */
    McMultiYearView.prototype.init = function () {
        var _this = this;
        this.todayYear = this.dateAdapter.getYear(this.dateAdapter.today());
        var activeYear = this.dateAdapter.getYear(this._activeDate);
        var activeOffset = activeYear % yearsPerPage;
        this.years = [];
        for (var i = 0, row = []; i < yearsPerPage; i++) {
            row.push(activeYear - activeOffset + i);
            if (row.length === yearsPerRow) {
                this.years.push(row.map(function (year) { return _this.createCellForYear(year); }));
                row = [];
            }
        }
        this.changeDetectorRef.markForCheck();
    };
    /** Handles when a new year is selected. */
    McMultiYearView.prototype.onYearSelected = function (year) {
        this.yearSelected.emit(this.dateAdapter.createDate(year, 0, 1));
        var month = this.dateAdapter.getMonth(this.activeDate);
        var daysInMonth = this.dateAdapter.getNumDaysInMonth(this.dateAdapter.createDate(year, month, 1));
        this.selectedChange.emit(this.dateAdapter.createDate(year, month, Math.min(this.dateAdapter.getDate(this.activeDate), daysInMonth)));
    };
    /** Handles keydown events on the calendar body when calendar is in multi-year view. */
    McMultiYearView.prototype.handleCalendarBodyKeydown = function (event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        var oldActiveDate = this._activeDate;
        var isRtl = this.isRtl();
        // tslint:disable-next-line:deprecation
        switch (event.keyCode) {
            case LEFT_ARROW:
                this.activeDate = this.dateAdapter.addCalendarYears(this._activeDate, isRtl ? 1 : -1);
                break;
            case RIGHT_ARROW:
                this.activeDate = this.dateAdapter.addCalendarYears(this._activeDate, isRtl ? -1 : 1);
                break;
            case UP_ARROW:
                this.activeDate = this.dateAdapter.addCalendarYears(this._activeDate, -yearsPerRow);
                break;
            case DOWN_ARROW:
                this.activeDate = this.dateAdapter.addCalendarYears(this._activeDate, yearsPerRow);
                break;
            case HOME:
                this.activeDate = this.dateAdapter.addCalendarYears(this._activeDate, -this.dateAdapter.getYear(this._activeDate) % yearsPerPage);
                break;
            case END:
                this.activeDate = this.dateAdapter.addCalendarYears(this._activeDate, yearsPerPage - this.dateAdapter.getYear(this._activeDate) % yearsPerPage - 1);
                break;
            case PAGE_UP:
                this.activeDate =
                    this.dateAdapter.addCalendarYears(this._activeDate, event.altKey ? -yearsPerPage * 10 : -yearsPerPage);
                break;
            case PAGE_DOWN:
                this.activeDate =
                    this.dateAdapter.addCalendarYears(this._activeDate, event.altKey ? yearsPerPage * 10 : yearsPerPage);
                break;
            case ENTER:
            case SPACE:
                this.onYearSelected(this.dateAdapter.getYear(this._activeDate));
                break;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        if (this.dateAdapter.compareDate(oldActiveDate, this.activeDate)) {
            this.activeDateChange.emit(this.activeDate);
        }
        this.focusActiveCell();
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    };
    McMultiYearView.prototype.getActiveCell = function () {
        return this.dateAdapter.getYear(this.activeDate) % yearsPerPage;
    };
    /** Focuses the active cell after the microtask queue is empty. */
    McMultiYearView.prototype.focusActiveCell = function () {
        this.mcCalendarBody.focusActiveCell();
    };
    /** Creates an McCalendarCell for the given year. */
    McMultiYearView.prototype.createCellForYear = function (year) {
        var yearName = this.dateAdapter.getYearName(this.dateAdapter.createDate(year, 0, 1));
        return new McCalendarCell(year, yearName, yearName, this.shouldEnableYear(year));
    };
    /** Whether the given year is enabled. */
    McMultiYearView.prototype.shouldEnableYear = function (year) {
        // disable if the year is greater than maxDate lower than minDate
        if (year === undefined || year === null ||
            (this.maxDate && year > this.dateAdapter.getYear(this.maxDate)) ||
            (this.minDate && year < this.dateAdapter.getYear(this.minDate))) {
            return false;
        }
        // enable if it reaches here and there's no filter defined
        if (!this.dateFilter) {
            return true;
        }
        var firstOfYear = this.dateAdapter.createDate(year, 0, 1);
        // If any date in the year is enabled count the year as enabled.
        for (var date = firstOfYear; this.dateAdapter.getYear(date) === year; date = this.dateAdapter.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
        }
        return false;
    };
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    McMultiYearView.prototype.getValidDateOrNull = function (obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    };
    /** Determines whether the user has the RTL layout direction. */
    McMultiYearView.prototype.isRtl = function () {
        return this.dir && this.dir.value === 'rtl';
    };
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McMultiYearView.prototype, "activeDate", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McMultiYearView.prototype, "selected", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McMultiYearView.prototype, "minDate", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McMultiYearView.prototype, "maxDate", null);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], McMultiYearView.prototype, "dateFilter", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McMultiYearView.prototype, "selectedChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McMultiYearView.prototype, "yearSelected", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McMultiYearView.prototype, "activeDateChange", void 0);
    __decorate([
        ViewChild(McCalendarBody),
        __metadata("design:type", McCalendarBody)
    ], McMultiYearView.prototype, "mcCalendarBody", void 0);
    McMultiYearView = __decorate([
        Component({
            selector: 'mc-multi-year-view',
            template: "<table class=\"mc-calendar__table\"><thead class=\"mc-calendar__table-header\"><tr><th class=\"mc-calendar__table-header-divider\" colspan=\"4\"></th></tr></thead><tbody mc-calendar-body [rows]=\"years\" [todayValue]=\"todayYear\" [selectedValue]=\"selectedYear\" [numCols]=\"4\" [cellAspectRatio]=\"4 / 7\" [activeCell]=\"getActiveCell()\" (selectedValueChange)=\"onYearSelected($event)\" (keydown)=\"handleCalendarBodyKeydown($event)\"></tbody></table>",
            exportAs: 'mcMultiYearView',
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param(1, Optional()),
        __param(2, Optional()),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            DateAdapter,
            Directionality])
    ], McMultiYearView);
    return McMultiYearView;
}());

/**
 * An internal component used to display a single year in the datepicker.
 * @docs-private
 */
var McYearView = /** @class */ (function () {
    function McYearView(changeDetectorRef, dateFormats, dateAdapter, dir) {
        this.changeDetectorRef = changeDetectorRef;
        this.dateFormats = dateFormats;
        this.dateAdapter = dateAdapter;
        this.dir = dir;
        /** Emits when a new month is selected. */
        this.selectedChange = new EventEmitter();
        /** Emits the selected month. This doesn't imply a change on the selected date */
        this.monthSelected = new EventEmitter();
        /** Emits when any date is activated. */
        this.activeDateChange = new EventEmitter();
        if (!this.dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        if (!this.dateFormats) {
            throw createMissingDateImplError('MC_DATE_FORMATS');
        }
        this._activeDate = this.dateAdapter.today();
    }
    Object.defineProperty(McYearView.prototype, "activeDate", {
        /** The date to display in this year view (everything other than the year is ignored). */
        get: function () {
            return this._activeDate;
        },
        set: function (value) {
            var oldActiveDate = this._activeDate;
            var validDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value)) || this.dateAdapter.today();
            this._activeDate = this.dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
            if (this.dateAdapter.getYear(oldActiveDate) !== this.dateAdapter.getYear(this._activeDate)) {
                this.init();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McYearView.prototype, "selected", {
        /** The currently selected date. */
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            this.selectedMonth = this.getMonthInCurrentYear(this._selected);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McYearView.prototype, "minDate", {
        /** The minimum selectable date. */
        get: function () {
            return this._minDate;
        },
        set: function (value) {
            this._minDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McYearView.prototype, "maxDate", {
        /** The maximum selectable date. */
        get: function () {
            return this._maxDate;
        },
        set: function (value) {
            this._maxDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    McYearView.prototype.ngAfterContentInit = function () {
        this.init();
    };
    /** Handles when a new month is selected. */
    McYearView.prototype.onMonthSelected = function (month) {
        var normalizedDate = this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), month, 1);
        this.monthSelected.emit(normalizedDate);
        var daysInMonth = this.dateAdapter.getNumDaysInMonth(normalizedDate);
        this.selectedChange.emit(this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), month, Math.min(this.dateAdapter.getDate(this.activeDate), daysInMonth)));
    };
    /** Handles keydown events on the calendar body when calendar is in year view. */
    McYearView.prototype.handleCalendarBodyKeydown = function (event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        var oldActiveDate = this._activeDate;
        var isRtl = this.isRtl();
        var VERTICAL_SHIFT = 4;
        var PAGE_SHIFT = 10;
        var MAX_MONTH_INDEX = 11;
        // tslint:disable-next-line:deprecation
        switch (event.keyCode) {
            case LEFT_ARROW:
                this.activeDate = this.dateAdapter.addCalendarMonths(this._activeDate, isRtl ? 1 : -1);
                break;
            case RIGHT_ARROW:
                this.activeDate = this.dateAdapter.addCalendarMonths(this._activeDate, isRtl ? -1 : 1);
                break;
            case UP_ARROW:
                this.activeDate = this.dateAdapter.addCalendarMonths(this._activeDate, -VERTICAL_SHIFT);
                break;
            case DOWN_ARROW:
                this.activeDate = this.dateAdapter.addCalendarMonths(this._activeDate, VERTICAL_SHIFT);
                break;
            case HOME:
                this.activeDate = this.dateAdapter.addCalendarMonths(this._activeDate, -this.dateAdapter.getMonth(this._activeDate));
                break;
            case END:
                this.activeDate = this.dateAdapter.addCalendarMonths(this._activeDate, MAX_MONTH_INDEX - this.dateAdapter.getMonth(this._activeDate));
                break;
            case PAGE_UP:
                this.activeDate =
                    this.dateAdapter.addCalendarYears(this._activeDate, event.altKey ? -PAGE_SHIFT : -1);
                break;
            case PAGE_DOWN:
                this.activeDate =
                    this.dateAdapter.addCalendarYears(this._activeDate, event.altKey ? PAGE_SHIFT : 1);
                break;
            case ENTER:
            case SPACE:
                this.onMonthSelected(this.dateAdapter.getMonth(this._activeDate));
                break;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        if (this.dateAdapter.compareDate(oldActiveDate, this.activeDate)) {
            this.activeDateChange.emit(this.activeDate);
        }
        this.focusActiveCell();
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    };
    /** Initializes this year view. */
    McYearView.prototype.init = function () {
        var _this = this;
        this.selectedMonth = this.getMonthInCurrentYear(this.selected);
        this.todayMonth = this.getMonthInCurrentYear(this.dateAdapter.today());
        this.yearLabel = this.dateAdapter.getYearName(this.activeDate);
        var monthNames = this.dateAdapter.getMonthNames('short');
        // First row of months only contains 5 elements so we can fit the year label on the same row.
        // tslint:disable-next-line:no-magic-numbers
        this.months = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]].map(function (row) { return row.map(function (month) { return _this.createCellForMonth(month, monthNames[month]); }); });
        this.changeDetectorRef.markForCheck();
    };
    /** Focuses the active cell after the microtask queue is empty. */
    McYearView.prototype.focusActiveCell = function () {
        this.mcCalendarBody.focusActiveCell();
    };
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     */
    McYearView.prototype.getMonthInCurrentYear = function (date) {
        return date && this.dateAdapter.getYear(date) === this.dateAdapter.getYear(this.activeDate) ?
            this.dateAdapter.getMonth(date) : null;
    };
    /** Creates an McCalendarCell for the given month. */
    McYearView.prototype.createCellForMonth = function (month, monthName) {
        var ariaLabel = this.dateAdapter.format(this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), month, 1), this.dateFormats.display.monthYearA11yLabel);
        var newMonthName = monthName[0].toLocaleUpperCase() + monthName.substr(1);
        return new McCalendarCell(month, newMonthName, ariaLabel, this.shouldEnableMonth(month));
    };
    /** Whether the given month is enabled. */
    McYearView.prototype.shouldEnableMonth = function (month) {
        var activeYear = this.dateAdapter.getYear(this.activeDate);
        if (month === undefined || month === null ||
            this.isYearAndMonthAfterMaxDate(activeYear, month) ||
            this.isYearAndMonthBeforeMinDate(activeYear, month)) {
            return false;
        }
        if (!this.dateFilter) {
            return true;
        }
        var firstOfMonth = this.dateAdapter.createDate(activeYear, month, 1);
        // If any date in the month is enabled count the month as enabled.
        for (var date = firstOfMonth; this.dateAdapter.getMonth(date) === month; date = this.dateAdapter.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Tests whether the combination month/year is after this.maxDate, considering
     * just the month and year of this.maxDate
     */
    McYearView.prototype.isYearAndMonthAfterMaxDate = function (year, month) {
        if (this.maxDate) {
            var maxYear = this.dateAdapter.getYear(this.maxDate);
            var maxMonth = this.dateAdapter.getMonth(this.maxDate);
            return year > maxYear || (year === maxYear && month > maxMonth);
        }
        return false;
    };
    /**
     * Tests whether the combination month/year is before this.minDate, considering
     * just the month and year of this.minDate
     */
    McYearView.prototype.isYearAndMonthBeforeMinDate = function (year, month) {
        if (this.minDate) {
            var minYear = this.dateAdapter.getYear(this.minDate);
            var minMonth = this.dateAdapter.getMonth(this.minDate);
            return year < minYear || (year === minYear && month < minMonth);
        }
        return false;
    };
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    McYearView.prototype.getValidDateOrNull = function (obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    };
    /** Determines whether the user has the RTL layout direction. */
    McYearView.prototype.isRtl = function () {
        return this.dir && this.dir.value === 'rtl';
    };
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McYearView.prototype, "activeDate", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McYearView.prototype, "selected", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McYearView.prototype, "minDate", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McYearView.prototype, "maxDate", null);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], McYearView.prototype, "dateFilter", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McYearView.prototype, "selectedChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McYearView.prototype, "monthSelected", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McYearView.prototype, "activeDateChange", void 0);
    __decorate([
        ViewChild(McCalendarBody),
        __metadata("design:type", McCalendarBody)
    ], McYearView.prototype, "mcCalendarBody", void 0);
    McYearView = __decorate([
        Component({
            selector: 'mc-year-view',
            template: "<table class=\"mc-calendar__table\"><thead class=\"mc-calendar__table-header\"><tr><th class=\"mc-calendar__table-header-divider\" colspan=\"4\"></th></tr></thead><tbody mc-calendar-body [label]=\"yearLabel\" [rows]=\"months\" [todayValue]=\"todayMonth\" [selectedValue]=\"selectedMonth\" [labelMinRequiredCells]=\"2\" [numCols]=\"4\" [cellAspectRatio]=\"4 / 7\" [activeCell]=\"dateAdapter.getMonth(activeDate)\" (selectedValueChange)=\"onMonthSelected($event)\" (keydown)=\"handleCalendarBodyKeydown($event)\"></tbody></table>",
            exportAs: 'mcYearView',
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param(1, Optional()), __param(1, Inject(MC_DATE_FORMATS)),
        __param(2, Optional()),
        __param(3, Optional()),
        __metadata("design:paramtypes", [ChangeDetectorRef, Object, DateAdapter,
            Directionality])
    ], McYearView);
    return McYearView;
}());

/** Default header for McCalendar */
var McCalendarHeader = /** @class */ (function () {
    function McCalendarHeader(intl, calendar, dateAdapter, dateFormats, changeDetectorRef) {
        this.intl = intl;
        this.calendar = calendar;
        this.dateAdapter = dateAdapter;
        this.dateFormats = dateFormats;
        this.calendar.stateChanges.subscribe(function () { return changeDetectorRef.markForCheck(); });
    }
    Object.defineProperty(McCalendarHeader.prototype, "periodButtonText", {
        /** The label for the current calendar view. */
        get: function () {
            if (this.calendar.currentView === 'month') {
                var label = this.dateAdapter
                    .format(this.calendar.activeDate, this.dateFormats.display.monthYearLabel);
                return label[0].toLocaleUpperCase() + label.substr(1);
            }
            if (this.calendar.currentView === 'year') {
                return this.dateAdapter.getYearName(this.calendar.activeDate);
            }
            var activeYear = this.dateAdapter.getYear(this.calendar.activeDate);
            var firstYearInView = this.dateAdapter.getYearName(
            // tslint:disable-next-line:no-magic-numbers
            this.dateAdapter.createDate(activeYear - activeYear % 24, 0, 1));
            var lastYearInView = this.dateAdapter.getYearName(
            // tslint:disable-next-line:no-magic-numbers
            this.dateAdapter.createDate(activeYear + yearsPerPage - 1 - activeYear % 24, 0, 1));
            return firstYearInView + " \u2013 " + lastYearInView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCalendarHeader.prototype, "periodButtonLabel", {
        get: function () {
            return this.calendar.currentView === 'month' ?
                this.intl.switchToMultiYearViewLabel : this.intl.switchToMonthViewLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCalendarHeader.prototype, "prevButtonLabel", {
        /** The label for the previous button. */
        get: function () {
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
        get: function () {
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
    McCalendarHeader.prototype.currentPeriodClicked = function () {
        this.calendar.currentView = this.calendar.currentView === 'month' ? 'multi-year' : 'month';
    };
    /** Handles user clicks on the previous button. */
    McCalendarHeader.prototype.previousClicked = function () {
        this.calendar.activeDate = this.calendar.currentView === 'month' ?
            this.dateAdapter.addCalendarMonths(this.calendar.activeDate, -1) :
            this.dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView === 'year' ? -1 : -yearsPerPage);
    };
    /** Handles user clicks on the next button. */
    McCalendarHeader.prototype.nextClicked = function () {
        this.calendar.activeDate = this.calendar.currentView === 'month' ?
            this.dateAdapter.addCalendarMonths(this.calendar.activeDate, 1) :
            this.dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView === 'year' ? 1 : yearsPerPage);
    };
    /** Whether the previous period button is enabled. */
    McCalendarHeader.prototype.previousEnabled = function () {
        if (!this.calendar.minDate) {
            return true;
        }
        return !this.calendar.minDate ||
            !this.isSameView(this.calendar.activeDate, this.calendar.minDate);
    };
    /** Whether the next period button is enabled. */
    McCalendarHeader.prototype.nextEnabled = function () {
        return !this.calendar.maxDate ||
            !this.isSameView(this.calendar.activeDate, this.calendar.maxDate);
    };
    /** Whether the two dates represent the same view in the current view mode (month or year). */
    McCalendarHeader.prototype.isSameView = function (date1, date2) {
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
    McCalendarHeader = __decorate([
        Component({
            selector: 'mc-calendar-header',
            template: "<div class=\"mc-calendar__header\"><div class=\"mc-calendar__controls\"><button mc-button type=\"button\" class=\"mc-calendar__period-button\" (click)=\"currentPeriodClicked()\" [attr.aria-label]=\"periodButtonLabel\">{{periodButtonText}} <i class=\"mc mc-icon\" [class.mc-angle-up-M_16]=\"calendar.currentView !== 'month'\" [class.mc-angle-down-M_16]=\"calendar.currentView === 'month'\"></i></button><div class=\"mc-calendar-spacer\"></div><ng-content></ng-content><button mc-icon-button type=\"button\" class=\"mc-calendar__previous-button\" [disabled]=\"!previousEnabled()\" (click)=\"previousClicked()\" [attr.aria-label]=\"prevButtonLabel\"><i mc-icon=\"mc-angle-left-L_16\"></i></button> <button mc-icon-button type=\"button\" class=\"mc-calendar__next-button\" [disabled]=\"!nextEnabled()\" (click)=\"nextClicked()\" [attr.aria-label]=\"nextButtonLabel\"><i mc-icon=\"mc-angle-right-L_16\"></i></button></div></div>",
            exportAs: 'mcCalendarHeader',
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param(1, Inject(forwardRef(function () { return McCalendar; }))),
        __param(2, Optional()),
        __param(3, Optional()), __param(3, Inject(MC_DATE_FORMATS)),
        __metadata("design:paramtypes", [McDatepickerIntl,
            McCalendar,
            DateAdapter, Object, ChangeDetectorRef])
    ], McCalendarHeader);
    return McCalendarHeader;
}());
/**
 * A calendar that is used as part of the datepicker.
 * @docs-private
 */
var McCalendar = /** @class */ (function () {
    function McCalendar(intl, dateAdapter, dateFormats, changeDetectorRef) {
        var _this = this;
        this.dateAdapter = dateAdapter;
        this.dateFormats = dateFormats;
        this.changeDetectorRef = changeDetectorRef;
        /** Whether the calendar should be started in month or year view. */
        this.startView = 'month';
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
        this.intlChanges = intl.changes.subscribe(function () {
            changeDetectorRef.markForCheck();
            _this.stateChanges.next();
        });
    }
    Object.defineProperty(McCalendar.prototype, "startAt", {
        /** A date representing the period (month or year) to start the calendar in. */
        get: function () {
            return this._startAt;
        },
        set: function (value) {
            this._startAt = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCalendar.prototype, "selected", {
        /** The currently selected date. */
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCalendar.prototype, "minDate", {
        /** The minimum selectable date. */
        get: function () {
            return this._minDate;
        },
        set: function (value) {
            this._minDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCalendar.prototype, "maxDate", {
        /** The maximum selectable date. */
        get: function () {
            return this._maxDate;
        },
        set: function (value) {
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
        get: function () {
            return this.clampedActiveDate;
        },
        set: function (value) {
            this.clampedActiveDate = this.dateAdapter.clampDate(value, this.minDate, this.maxDate);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCalendar.prototype, "currentView", {
        /** Whether the calendar is in month view. */
        get: function () {
            return this._currentView;
        },
        set: function (value) {
            this._currentView = value;
            this.moveFocusOnNextTick = true;
        },
        enumerable: true,
        configurable: true
    });
    McCalendar.prototype.ngAfterContentInit = function () {
        this.calendarHeaderPortal = new ComponentPortal(this.headerComponent || McCalendarHeader);
        this.activeDate = this.startAt || this.dateAdapter.today();
        // Assign to the private property since we don't want to move focus on init.
        this._currentView = this.startView;
    };
    McCalendar.prototype.ngAfterViewChecked = function () {
        if (this.moveFocusOnNextTick) {
            this.moveFocusOnNextTick = false;
            this.focusActiveCell();
        }
    };
    McCalendar.prototype.ngOnDestroy = function () {
        this.intlChanges.unsubscribe();
        this.stateChanges.complete();
    };
    McCalendar.prototype.ngOnChanges = function (changes) {
        var change = changes.minDate || changes.maxDate || changes.dateFilter;
        if (change && !change.firstChange) {
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
    McCalendar.prototype.focusActiveCell = function () {
        this.getCurrentViewComponent().focusActiveCell();
    };
    /** Updates today's date after an update of the active date */
    McCalendar.prototype.updateTodaysDate = function () {
        var view = this.currentView === 'month' ? this.monthView :
            (this.currentView === 'year' ? this.yearView : this.multiYearView);
        view.ngAfterContentInit();
    };
    /** Handles date selection in the month view. */
    McCalendar.prototype.dateSelected = function (date) {
        if (!this.dateAdapter.sameDate(date, this.selected)) {
            this.selectedChange.emit(date);
        }
    };
    /** Handles year selection in the multiyear view. */
    McCalendar.prototype.yearSelectedInMultiYearView = function (normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    };
    /** Handles month selection in the year view. */
    McCalendar.prototype.monthSelectedInYearView = function (normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    };
    McCalendar.prototype.userSelected = function () {
        this.userSelection.emit();
    };
    /** Handles year/month selection in the multi-year/year views. */
    McCalendar.prototype.goToDateInView = function (date, view) {
        this.activeDate = date;
        this.currentView = view;
    };
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    McCalendar.prototype.getValidDateOrNull = function (obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    };
    /** Returns the component instance that corresponds to the current calendar view. */
    McCalendar.prototype.getCurrentViewComponent = function () {
        return this.monthView || this.yearView || this.multiYearView;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McCalendar.prototype, "startAt", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McCalendar.prototype, "selected", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McCalendar.prototype, "minDate", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McCalendar.prototype, "maxDate", null);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], McCalendar.prototype, "headerComponent", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], McCalendar.prototype, "startView", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], McCalendar.prototype, "dateFilter", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], McCalendar.prototype, "dateClass", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McCalendar.prototype, "selectedChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McCalendar.prototype, "yearSelected", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McCalendar.prototype, "monthSelected", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McCalendar.prototype, "userSelection", void 0);
    __decorate([
        ViewChild(McMonthView),
        __metadata("design:type", McMonthView)
    ], McCalendar.prototype, "monthView", void 0);
    __decorate([
        ViewChild(McYearView),
        __metadata("design:type", McYearView)
    ], McCalendar.prototype, "yearView", void 0);
    __decorate([
        ViewChild(McMultiYearView),
        __metadata("design:type", McMultiYearView)
    ], McCalendar.prototype, "multiYearView", void 0);
    McCalendar = __decorate([
        Component({
            selector: 'mc-calendar',
            template: "<ng-template [cdkPortalOutlet]=\"calendarHeaderPortal\"></ng-template><div class=\"mc-calendar__content\" [ngSwitch]=\"currentView\" cdkMonitorSubtreeFocus tabindex=\"-1\"><mc-month-view *ngSwitchCase=\"'month'\" [(activeDate)]=\"activeDate\" [selected]=\"selected\" [dateFilter]=\"dateFilter\" [maxDate]=\"maxDate\" [minDate]=\"minDate\" [dateClass]=\"dateClass\" (selectedChange)=\"dateSelected($event)\" (userSelection)=\"userSelected()\"></mc-month-view><mc-year-view *ngSwitchCase=\"'year'\" [(activeDate)]=\"activeDate\" [selected]=\"selected\" [dateFilter]=\"dateFilter\" [maxDate]=\"maxDate\" [minDate]=\"minDate\" (monthSelected)=\"monthSelectedInYearView($event)\" (selectedChange)=\"goToDateInView($event, 'month')\"></mc-year-view><mc-multi-year-view *ngSwitchCase=\"'multi-year'\" [(activeDate)]=\"activeDate\" [selected]=\"selected\" [dateFilter]=\"dateFilter\" [maxDate]=\"maxDate\" [minDate]=\"minDate\" (yearSelected)=\"yearSelectedInMultiYearView($event)\" (selectedChange)=\"goToDateInView($event, 'year')\"></mc-multi-year-view></div>",
            styles: [".mc-calendar{display:block}.mc-calendar__header{padding:8px 8px 0 8px}.mc-calendar__content{padding:0 8px 8px 8px;outline:0}.mc-calendar__controls{display:flex;margin:5% calc(33% / 7 - 16px)}.mc-calendar__controls .mc-button,.mc-calendar__controls .mc-icon-button{border-radius:0;border-color:transparent;background-color:transparent}.mc-calendar__controls .mc-button .mc-button-overlay,.mc-calendar__controls .mc-icon-button .mc-button-overlay{z-index:-1}.mc-calendar-spacer{flex:1 1 auto}.mc-calendar__period-button{min-width:0}.mc-calendar__previous-button::after{border-left-width:2px;transform:translateX(2px) rotate(-45deg)}.mc-calendar__next-button::after{border-right-width:2px;transform:translateX(-2px) rotate(45deg)}.mc-calendar__table{border-spacing:0;border-collapse:collapse;width:100%}.mc-calendar__table-header th{text-align:center;padding:0 0 8px 0}.mc-calendar__table-header-divider{position:relative;height:1px}.mc-calendar__table-header-divider::after{content:'';position:absolute;top:0;left:-8px;right:-8px;height:1px}"],
            host: {
                class: 'mc-calendar'
            },
            exportAs: 'mcCalendar',
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param(1, Optional()),
        __param(2, Optional()), __param(2, Inject(MC_DATE_FORMATS)),
        __metadata("design:paramtypes", [McDatepickerIntl,
            DateAdapter, Object, ChangeDetectorRef])
    ], McCalendar);
    return McCalendar;
}());

/**
 * Animations used by the mosaic datepicker.
 * @docs-private
 */
var mcDatepickerAnimations = {
    /** Transforms the height of the datepicker's calendar. */
    transformPanel: trigger('transformPanel', [
        state('void', style({
            opacity: 0,
            transform: 'scale(1, 0.8)'
        })),
        transition('void => enter', animate('120ms cubic-bezier(0, 0, 0.2, 1)', style({
            opacity: 1,
            transform: 'scale(1, 1)'
        }))),
        transition('* => void', animate('100ms linear', style({ opacity: 0 })))
    ]),
    /** Fades in the content of the calendar. */
    fadeInCalendar: trigger('fadeInCalendar', [
        state('void', style({ opacity: 0 })),
        state('enter', style({ opacity: 1 })),
        // need to keep it until #12440 gets in, otherwise the exit animation will look glitchy.
        transition('void => *', animate('120ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)'))
    ])
};
// todo should be put into polyfils
// https://github.com/angular/angular/issues/24769
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
}

/** Used to generate a unique ID for each datepicker instance. */
var datepickerUid = 0;
/** Injection token that determines the scroll handling while the calendar is open. */
var MC_DATEPICKER_SCROLL_STRATEGY = new InjectionToken('mc-datepicker-scroll-strategy');
/** @docs-private */
// tslint:disable-next-line:naming-convention
function MC_DATEPICKER_SCROLL_STRATEGY_FACTORY(overlay) {
    return function () { return overlay.scrollStrategies.reposition(); };
}
/** @docs-private */
var MC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_DATEPICKER_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MC_DATEPICKER_SCROLL_STRATEGY_FACTORY
};
// Boilerplate for applying mixins to McDatepickerContent.
/** @docs-private */
var McDatepickerContentBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McDatepickerContentBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McDatepickerContentBase;
}());
// tslint:disable-next-line:naming-convention
var McDatepickerContentMixinBase = mixinColor(McDatepickerContentBase);
/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * McCalendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * @docs-private
 */
var McDatepickerContent = /** @class */ (function (_super) {
    __extends(McDatepickerContent, _super);
    function McDatepickerContent(elementRef) {
        return _super.call(this, elementRef) || this;
    }
    McDatepickerContent.prototype.ngAfterViewInit = function () {
        this.calendar.focusActiveCell();
    };
    __decorate([
        ViewChild(McCalendar),
        __metadata("design:type", McCalendar)
    ], McDatepickerContent.prototype, "calendar", void 0);
    McDatepickerContent = __decorate([
        Component({
            selector: 'mc-datepicker__content',
            template: "<mc-calendar [id]=\"datepicker.id\" [ngClass]=\"datepicker.panelClass\" [startAt]=\"datepicker.startAt\" [startView]=\"datepicker.startView\" [minDate]=\"datepicker.minDate\" [maxDate]=\"datepicker.maxDate\" [dateFilter]=\"datepicker.dateFilter\" [headerComponent]=\"datepicker.calendarHeaderComponent\" [selected]=\"datepicker.selected\" [dateClass]=\"datepicker.dateClass\" [@fadeInCalendar]=\"'enter'\" (selectedChange)=\"datepicker.select($event)\" (yearSelected)=\"datepicker.selectYear($event)\" (monthSelected)=\"datepicker.selectMonth($event)\" (userSelection)=\"datepicker.close()\"></mc-calendar>",
            styles: [".mc-datepicker__content{display:block}.mc-datepicker__content .mc-calendar{width:296px;height:344px}.mc-datepicker__content .mc-calendar__next-button[disabled],.mc-datepicker__content .mc-calendar__previous-button[disabled]{border:0}@media all and (orientation:landscape){.mc-calendar{width:64vh;height:80vh}}@media all and (orientation:portrait){.mc-calendar{width:80vw;height:100vw}}"],
            host: {
                class: 'mc-datepicker__content',
                '[@transformPanel]': '"enter"'
            },
            animations: [
                mcDatepickerAnimations.transformPanel,
                mcDatepickerAnimations.fadeInCalendar
            ],
            exportAs: 'mcDatepickerContent',
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            inputs: ['color']
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], McDatepickerContent);
    return McDatepickerContent;
}(McDatepickerContentMixinBase));
// TODO: We use a component instead of a directive here so the user can use implicit
// template reference variables (e.g. #d vs #d="mcDatepicker"). We can change this to a directive
// if angular adds support for `exportAs: '$implicit'` on directives.
/** Component responsible for managing the datepicker popup/dialog. */
var McDatepicker = /** @class */ (function () {
    function McDatepicker(overlay, ngZone, viewContainerRef, scrollStrategy, dateAdapter, dir, document) {
        this.overlay = overlay;
        this.ngZone = ngZone;
        this.viewContainerRef = viewContainerRef;
        this.dateAdapter = dateAdapter;
        this.dir = dir;
        this.document = document;
        /** The view that the calendar should start in. */
        this.startView = 'month';
        /**
         * Emits selected year in multiyear view.
         * This doesn't imply a change on the selected date.
         */
        this.yearSelected = new EventEmitter();
        /**
         * Emits selected month in year view.
         * This doesn't imply a change on the selected date.
         */
        this.monthSelected = new EventEmitter();
        /** Emits when the datepicker has been opened. */
        this.openedStream = new EventEmitter();
        /** Emits when the datepicker has been closed. */
        this.closedStream = new EventEmitter();
        /** The id for the datepicker calendar. */
        this.id = "mc-datepicker-" + datepickerUid++;
        this.stateChanges = new Subject();
        /** Emits when the datepicker is disabled. */
        this.disabledChange = new Subject();
        /** Emits new selected date when selected date changes. */
        this.selectedChanged = new Subject();
        this._opened = false;
        this.validSelected = null;
        /** The element that was focused before the datepicker was opened. */
        this.focusedElementBeforeOpen = null;
        /** Subscription to value changes in the associated input element. */
        this.inputSubscription = Subscription.EMPTY;
        if (!this.dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        this.scrollStrategy = scrollStrategy;
    }
    McDatepicker_1 = McDatepicker;
    Object.defineProperty(McDatepicker.prototype, "startAt", {
        /** The date to open the calendar to initially. */
        get: function () {
            // If an explicit startAt is set we start there, otherwise we start at whatever the currently
            // selected value is.
            return this._startAt || (this.datepickerInput ? this.datepickerInput.value : null);
        },
        set: function (value) {
            this._startAt = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "color", {
        /** Color palette to use on the datepicker's calendar. */
        get: function () {
            // @ts-ignore:next-line
            return this._color ||
                (this.datepickerInput ? this.datepickerInput.getThemePalette() : undefined);
        },
        set: function (value) {
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "disabled", {
        /** Whether the datepicker pop-up should be disabled. */
        get: function () {
            return this._disabled === undefined && this.datepickerInput ?
                this.datepickerInput.disabled : !!this._disabled;
        },
        set: function (value) {
            var newValue = coerceBooleanProperty(value);
            if (newValue !== this._disabled) {
                this._disabled = newValue;
                this.disabledChange.next(newValue);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "opened", {
        /** Whether the calendar is open. */
        get: function () {
            return this._opened;
        },
        set: function (value) {
            if (value) {
                this.open();
            }
            else {
                this.close();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "selected", {
        /** The currently selected date. */
        get: function () {
            return this.validSelected;
        },
        set: function (value) {
            this.validSelected = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "minDate", {
        /** The minimum selectable date. */
        get: function () {
            return this.datepickerInput && this.datepickerInput.min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "maxDate", {
        /** The maximum selectable date. */
        get: function () {
            return this.datepickerInput && this.datepickerInput.max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "dateFilter", {
        get: function () {
            return this.datepickerInput && this.datepickerInput.dateFilter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "value", {
        get: function () {
            return this.selected;
        },
        enumerable: true,
        configurable: true
    });
    McDatepicker.prototype.ngOnDestroy = function () {
        this.close();
        this.inputSubscription.unsubscribe();
        this.disabledChange.complete();
        if (this.popupRef) {
            this.popupRef.dispose();
            this.popupComponentRef = null;
        }
    };
    /** Selects the given date */
    McDatepicker.prototype.select = function (date) {
        var oldValue = this.selected;
        this.selected = date;
        if (!this.dateAdapter.sameDate(oldValue, this.selected)) {
            this.selectedChanged.next(date);
        }
    };
    /** Emits the selected year in multiyear view */
    McDatepicker.prototype.selectYear = function (normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    };
    /** Emits selected month in year view */
    McDatepicker.prototype.selectMonth = function (normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    };
    /**
     * Register an input with this datepicker.
     * @param input The datepicker input to register with this datepicker.
     */
    McDatepicker.prototype.registerInput = function (input) {
        var _this = this;
        if (this.datepickerInput) {
            throw Error('A McDatepicker can only be associated with a single input.');
        }
        this.datepickerInput = input;
        this.inputSubscription =
            this.datepickerInput.valueChange.subscribe(function (value) { return _this.selected = value; });
    };
    /** Open the calendar. */
    McDatepicker.prototype.open = function () {
        if (this._opened || this.disabled) {
            return;
        }
        if (!this.datepickerInput) {
            throw Error('Attempted to open an McDatepicker with no associated input.');
        }
        if (this.document) {
            this.focusedElementBeforeOpen = this.document.activeElement;
        }
        this.openAsPopup();
        this._opened = true;
        this.openedStream.emit();
    };
    /** Close the calendar. */
    McDatepicker.prototype.close = function () {
        var _this = this;
        if (!this._opened) {
            return;
        }
        if (this.popupRef && this.popupRef.hasAttached()) {
            this.popupRef.detach();
        }
        if (this.calendarPortal && this.calendarPortal.isAttached) {
            this.calendarPortal.detach();
        }
        var completeClose = function () {
            // The `_opened` could've been reset already if
            // we got two events in quick succession.
            if (_this._opened) {
                _this._opened = false;
                _this.closedStream.emit();
                _this.focusedElementBeforeOpen = null;
            }
        };
        if (this.focusedElementBeforeOpen &&
            typeof this.focusedElementBeforeOpen.focus === 'function') {
            // Because IE moves focus asynchronously, we can't count on it being restored before we've
            // marked the datepicker as closed. If the event fires out of sequence and the element that
            // we're refocusing opens the datepicker on focus, the user could be stuck with not being
            // able to close the calendar at all. We work around it by making the logic, that marks
            // the datepicker as closed, async as well.
            this.focusedElementBeforeOpen.focus();
            setTimeout(completeClose);
        }
        else {
            completeClose();
        }
    };
    /** Open the calendar as a popup. */
    McDatepicker.prototype.openAsPopup = function () {
        var _this = this;
        if (!this.calendarPortal) {
            this.calendarPortal = new ComponentPortal(McDatepickerContent, this.viewContainerRef);
        }
        if (!this.popupRef) {
            this.createPopup();
        }
        if (!this.popupRef.hasAttached()) {
            this.popupComponentRef = this.popupRef.attach(this.calendarPortal);
            this.popupComponentRef.instance.datepicker = this;
            this.setColor();
            // Update the position once the calendar has rendered.
            this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(function () {
                _this.popupRef.updatePosition();
            });
        }
    };
    /** Create the popup. */
    McDatepicker.prototype.createPopup = function () {
        var _this = this;
        var overlayConfig = new OverlayConfig({
            positionStrategy: this.createPopupPositionStrategy(),
            hasBackdrop: true,
            backdropClass: 'mc-overlay-transparent-backdrop',
            direction: this.dir,
            scrollStrategy: this.scrollStrategy(),
            panelClass: 'mc-datepicker__popup'
        });
        this.popupRef = this.overlay.create(overlayConfig);
        this.popupRef.overlayElement.setAttribute('role', 'dialog');
        merge(this.popupRef.backdropClick(), this.popupRef.detachments(), this.popupRef.keydownEvents().pipe(filter(function (event) {
            // Closing on alt + up is only valid when there's an input associated with the datepicker.
            // tslint:disable-next-line:deprecation
            return event.keyCode === ESCAPE || (_this.datepickerInput && event.altKey && event.keyCode === UP_ARROW);
        }))).subscribe(function () { return _this.close(); });
    };
    /** Create the popup PositionStrategy. */
    McDatepicker.prototype.createPopupPositionStrategy = function () {
        return this.overlay.position()
            .flexibleConnectedTo(this.datepickerInput.elementRef)
            .withTransformOriginOn('.mc-datepicker__content')
            .withFlexibleDimensions(false)
            .withViewportMargin(8)
            .withLockedPosition()
            .withPositions([
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom'
            },
            {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top'
            },
            {
                originX: 'end',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'bottom'
            }
        ]);
    };
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    McDatepicker.prototype.getValidDateOrNull = function (obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    };
    /** Passes the current theme color along to the calendar overlay. */
    McDatepicker.prototype.setColor = function () {
        var color = this.color;
        if (this.popupComponentRef) {
            this.popupComponentRef.instance.color = color;
        }
    };
    var McDatepicker_1;
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McDatepicker.prototype, "startAt", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McDatepicker.prototype, "color", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McDatepicker.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McDatepicker.prototype, "opened", null);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], McDatepicker.prototype, "calendarHeaderComponent", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], McDatepicker.prototype, "startView", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McDatepicker.prototype, "yearSelected", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McDatepicker.prototype, "monthSelected", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], McDatepicker.prototype, "panelClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], McDatepicker.prototype, "dateClass", void 0);
    __decorate([
        Output('opened'),
        __metadata("design:type", EventEmitter)
    ], McDatepicker.prototype, "openedStream", void 0);
    __decorate([
        Output('closed'),
        __metadata("design:type", EventEmitter)
    ], McDatepicker.prototype, "closedStream", void 0);
    McDatepicker = McDatepicker_1 = __decorate([
        Component({
            selector: 'mc-datepicker',
            template: '',
            exportAs: 'mcDatepicker',
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            providers: [{ provide: McFormFieldControl, useExisting: McDatepicker_1 }]
        }),
        __param(3, Inject(MC_DATEPICKER_SCROLL_STRATEGY)),
        __param(4, Optional()),
        __param(5, Optional()),
        __param(6, Optional()), __param(6, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Overlay,
            NgZone,
            ViewContainerRef, Object, DateAdapter,
            Directionality, Object])
    ], McDatepicker);
    return McDatepicker;
}());

/** @docs-private */
var MC_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return McDatepickerInput; }),
    multi: true
};
/** @docs-private */
var MC_DATEPICKER_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return McDatepickerInput; }),
    multi: true
};
/**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use McDatepickerInputEvent instead.
 */
var McDatepickerInputEvent = /** @class */ (function () {
    function McDatepickerInputEvent(
    /** Reference to the datepicker input component that emitted the event. */
    target, 
    /** Reference to the native input element associated with the datepicker input. */
    targetElement) {
        this.target = target;
        this.targetElement = targetElement;
        this.value = this.target.value;
    }
    return McDatepickerInputEvent;
}());
/** Directive used to connect an input to a McDatepicker. */
var McDatepickerInput = /** @class */ (function () {
    function McDatepickerInput(elementRef, dateAdapter, dateFormats, formField) {
        var _this = this;
        this.elementRef = elementRef;
        this.dateAdapter = dateAdapter;
        this.dateFormats = dateFormats;
        this.formField = formField;
        /** Emits when a `change` event is fired on this `<input>`. */
        this.dateChange = new EventEmitter();
        /** Emits when an `input` event is fired on this `<input>`. */
        this.dateInput = new EventEmitter();
        /** Emits when the value changes (either due to user input or programmatic change). */
        this.valueChange = new EventEmitter();
        /** Emits when the disabled state has changed */
        this.disabledChange = new EventEmitter();
        this.datepickerSubscription = Subscription.EMPTY;
        this.localeSubscription = Subscription.EMPTY;
        /** Whether the last value set on the input was valid. */
        this.lastValueValid = false;
        this.onTouched = function () {
        };
        this.cvaOnChange = function () {
        };
        this.validatorOnChange = function () {
        };
        /** The form control validator for whether the input parses. */
        this.parseValidator = function () {
            return _this.lastValueValid ?
                null : { mcDatepickerParse: { text: _this.elementRef.nativeElement.value } };
        };
        /** The form control validator for the min date. */
        this.minValidator = function (control) {
            var controlValue = _this.getValidDateOrNull(_this.dateAdapter.deserialize(control.value));
            return (!_this.min || !controlValue ||
                _this.dateAdapter.compareDate(_this.min, controlValue) <= 0) ?
                null : { mcDatepickerMin: { min: _this.min, actual: controlValue } };
        };
        /** The form control validator for the max date. */
        this.maxValidator = function (control) {
            var controlValue = _this.getValidDateOrNull(_this.dateAdapter.deserialize(control.value));
            return (!_this.max || !controlValue ||
                _this.dateAdapter.compareDate(_this.max, controlValue) >= 0) ?
                null : { mcDatepickerMax: { max: _this.max, actual: controlValue } };
        };
        /** The form control validator for the date filter. */
        this.filterValidator = function (control) {
            var controlValue = _this.getValidDateOrNull(_this.dateAdapter.deserialize(control.value));
            return !_this.dateFilter || !controlValue || _this.dateFilter(controlValue) ?
                null : { mcDatepickerFilter: true };
        };
        /** The combined form control validator for this input. */
        // tslint:disable:member-ordering
        this.validator = Validators.compose([
            this.parseValidator,
            this.minValidator,
            this.maxValidator,
            this.filterValidator
        ]);
        if (!this.dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        if (!this.dateFormats) {
            throw createMissingDateImplError('MC_DATE_FORMATS');
        }
        // Update the displayed date when the locale changes.
        this.localeSubscription = dateAdapter.localeChanges.subscribe(function () {
            _this.value = _this.value;
        });
    }
    McDatepickerInput_1 = McDatepickerInput;
    Object.defineProperty(McDatepickerInput.prototype, "mcDatepicker", {
        /** The datepicker that this input is associated with. */
        set: function (value) {
            var _this = this;
            if (!value) {
                return;
            }
            this.datepicker = value;
            this.datepicker.registerInput(this);
            this.datepickerSubscription.unsubscribe();
            this.datepickerSubscription = this.datepicker.selectedChanged.subscribe(function (selected) {
                _this.value = selected;
                _this.cvaOnChange(selected);
                _this.onTouched();
                _this.dateInput.emit(new McDatepickerInputEvent(_this, _this.elementRef.nativeElement));
                _this.dateChange.emit(new McDatepickerInputEvent(_this, _this.elementRef.nativeElement));
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepickerInput.prototype, "mcDatepickerFilter", {
        /** Function that can be used to filter out dates within the datepicker. */
        set: function (value) {
            this.dateFilter = value;
            this.validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepickerInput.prototype, "value", {
        /** The value of the input. */
        get: function () {
            return this._value;
        },
        set: function (value) {
            // tslint:disable-next-line:no-parameter-reassignment
            value = this.dateAdapter.deserialize(value);
            this.lastValueValid = !value || this.dateAdapter.isValid(value);
            // tslint:disable-next-line:no-parameter-reassignment
            value = this.getValidDateOrNull(value);
            var oldDate = this.value;
            this._value = value;
            this.formatValue(value);
            if (!this.dateAdapter.sameDate(oldDate, value)) {
                this.valueChange.emit(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepickerInput.prototype, "min", {
        /** The minimum valid date. */
        get: function () {
            return this._min;
        },
        set: function (value) {
            this._min = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            this.validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepickerInput.prototype, "max", {
        /** The maximum valid date. */
        get: function () {
            return this._max;
        },
        set: function (value) {
            this._max = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            this.validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepickerInput.prototype, "disabled", {
        /** Whether the datepicker-input is disabled. */
        get: function () {
            return !!this._disabled;
        },
        set: function (value) {
            var newValue = coerceBooleanProperty(value);
            var element = this.elementRef.nativeElement;
            if (this._disabled !== newValue) {
                this._disabled = newValue;
                this.disabledChange.emit(newValue);
            }
            // We need to null check the `blur` method, because it's undefined during SSR.
            if (newValue && element.blur) {
                // Normally, native input elements automatically blur if they turn disabled. This behavior
                // is problematic, because it would mean that it triggers another change detection cycle,
                // which then causes a changed after checked error if the input element was focused before.
                element.blur();
            }
        },
        enumerable: true,
        configurable: true
    });
    McDatepickerInput.prototype.ngOnDestroy = function () {
        this.datepickerSubscription.unsubscribe();
        this.localeSubscription.unsubscribe();
        this.valueChange.complete();
        this.disabledChange.complete();
    };
    /** @docs-private */
    McDatepickerInput.prototype.registerOnValidatorChange = function (fn) {
        this.validatorOnChange = fn;
    };
    /** @docs-private */
    McDatepickerInput.prototype.validate = function (c) {
        return this.validator ? this.validator(c) : null;
    };
    // Implemented as part of ControlValueAccessor.
    McDatepickerInput.prototype.writeValue = function (value) {
        this.value = value;
    };
    // Implemented as part of ControlValueAccessor.
    McDatepickerInput.prototype.registerOnChange = function (fn) {
        this.cvaOnChange = fn;
    };
    // Implemented as part of ControlValueAccessor.
    McDatepickerInput.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    // Implemented as part of ControlValueAccessor.
    McDatepickerInput.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    McDatepickerInput.prototype.onKeydown = function (event) {
        // tslint:disable-next-line:deprecation
        var isAltDownArrow = event.altKey && event.keyCode === DOWN_ARROW;
        if (this.datepicker && isAltDownArrow && !this.elementRef.nativeElement.readOnly) {
            this.datepicker.open();
            event.preventDefault();
        }
    };
    McDatepickerInput.prototype.onInput = function (value) {
        var date = this.dateAdapter.parse(value, this.dateFormats.parse.dateInput);
        this.lastValueValid = !date || this.dateAdapter.isValid(date);
        date = this.getValidDateOrNull(date);
        if (!this.dateAdapter.sameDate(date, this._value)) {
            this._value = date;
            this.cvaOnChange(date);
            this.valueChange.emit(date);
            this.dateInput.emit(new McDatepickerInputEvent(this, this.elementRef.nativeElement));
        }
    };
    McDatepickerInput.prototype.onChange = function () {
        this.dateChange.emit(new McDatepickerInputEvent(this, this.elementRef.nativeElement));
    };
    /** Returns the palette used by the input's form field, if any. */
    McDatepickerInput.prototype.getThemePalette = function () {
        return this.formField ? this.formField.color : undefined;
    };
    /** Handles blur events on the input. */
    McDatepickerInput.prototype.onBlur = function () {
        // Reformat the input only if we have a valid value.
        if (this.value) {
            this.formatValue(this.value);
        }
        this.onTouched();
    };
    /** Formats a value and sets it on the input element. */
    McDatepickerInput.prototype.formatValue = function (value) {
        this.elementRef.nativeElement.value =
            value ? this.dateAdapter.format(value, this.dateFormats.display.dateInput) : '';
    };
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    McDatepickerInput.prototype.getValidDateOrNull = function (obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    };
    var McDatepickerInput_1;
    __decorate([
        Input(),
        __metadata("design:type", McDatepicker),
        __metadata("design:paramtypes", [McDatepicker])
    ], McDatepickerInput.prototype, "mcDatepicker", null);
    __decorate([
        Input(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function])
    ], McDatepickerInput.prototype, "mcDatepickerFilter", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McDatepickerInput.prototype, "value", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McDatepickerInput.prototype, "min", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McDatepickerInput.prototype, "max", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McDatepickerInput.prototype, "disabled", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McDatepickerInput.prototype, "dateChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McDatepickerInput.prototype, "dateInput", void 0);
    McDatepickerInput = McDatepickerInput_1 = __decorate([
        Directive({
            selector: 'input[mcDatepicker]',
            providers: [
                MC_DATEPICKER_VALUE_ACCESSOR,
                MC_DATEPICKER_VALIDATORS,
                { provide: MC_INPUT_VALUE_ACCESSOR, useExisting: McDatepickerInput_1 }
            ],
            host: {
                '[attr.aria-haspopup]': 'true',
                '[attr.aria-owns]': '(datepicker?.opened && datepicker.id) || null',
                '[attr.min]': 'min ? dateAdapter.toIso8601(min) : null',
                '[attr.max]': 'max ? dateAdapter.toIso8601(max) : null',
                '[disabled]': 'disabled',
                '(input)': 'onInput($event.target.value)',
                '(change)': 'onChange()',
                '(blur)': 'onBlur()',
                '(keydown)': 'onKeydown($event)'
            },
            exportAs: 'mcDatepickerInput'
        }),
        __param(1, Optional()),
        __param(2, Optional()), __param(2, Inject(MC_DATE_FORMATS)),
        __param(3, Optional()),
        __metadata("design:paramtypes", [ElementRef,
            DateAdapter, Object, McFormField])
    ], McDatepickerInput);
    return McDatepickerInput;
}());

/** Can be used to override the icon of a `mcDatepickerToggle`. */
var McDatepickerToggleIcon = /** @class */ (function () {
    function McDatepickerToggleIcon() {
    }
    McDatepickerToggleIcon = __decorate([
        Directive({
            selector: '[mcDatepickerToggleIcon]'
        })
    ], McDatepickerToggleIcon);
    return McDatepickerToggleIcon;
}());
var McDatepickerToggle = /** @class */ (function () {
    function McDatepickerToggle(intl, changeDetectorRef, defaultTabIndex) {
        this.intl = intl;
        this.changeDetectorRef = changeDetectorRef;
        this.stateChanges = Subscription.EMPTY;
        var parsedTabIndex = Number(defaultTabIndex);
        this.tabIndex = (parsedTabIndex || parsedTabIndex === 0) ? parsedTabIndex : null;
    }
    Object.defineProperty(McDatepickerToggle.prototype, "disabled", {
        /** Whether the toggle button is disabled. */
        get: function () {
            return this._disabled === undefined ? this.datepicker.disabled : !!this._disabled;
        },
        set: function (value) {
            this._disabled = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    McDatepickerToggle.prototype.ngOnChanges = function (changes) {
        if (changes.datepicker) {
            this.watchStateChanges();
        }
    };
    McDatepickerToggle.prototype.ngOnDestroy = function () {
        this.stateChanges.unsubscribe();
    };
    McDatepickerToggle.prototype.ngAfterContentInit = function () {
        this.watchStateChanges();
    };
    McDatepickerToggle.prototype.open = function (event) {
        if (this.datepicker && !this.disabled) {
            this.datepicker.open();
            event.stopPropagation();
        }
    };
    McDatepickerToggle.prototype.watchStateChanges = function () {
        var _this = this;
        var datepickerDisabled = this.datepicker ? this.datepicker.disabledChange : of();
        var inputDisabled = this.datepicker && this.datepicker.datepickerInput ?
            this.datepicker.datepickerInput.disabledChange : of();
        var datepickerToggled = this.datepicker ?
            merge(this.datepicker.openedStream, this.datepicker.closedStream) :
            of();
        this.stateChanges.unsubscribe();
        this.stateChanges = merge(this.intl.changes, datepickerDisabled, inputDisabled, datepickerToggled).subscribe(function () { return _this.changeDetectorRef.markForCheck(); });
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McDatepickerToggle.prototype, "disabled", null);
    __decorate([
        Input('for'),
        __metadata("design:type", McDatepicker)
    ], McDatepickerToggle.prototype, "datepicker", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], McDatepickerToggle.prototype, "tabIndex", void 0);
    __decorate([
        ContentChild(McDatepickerToggleIcon),
        __metadata("design:type", McDatepickerToggleIcon)
    ], McDatepickerToggle.prototype, "customIcon", void 0);
    __decorate([
        ViewChild('button'),
        __metadata("design:type", McButton)
    ], McDatepickerToggle.prototype, "button", void 0);
    McDatepickerToggle = __decorate([
        Component({
            selector: 'mc-datepicker-toggle',
            template: "<button #button mc-icon-button type=\"button\" class=\"mc-datepicker-toggle__button\" aria-haspopup=\"true\" [attr.aria-label]=\"intl.openCalendarLabel\" [attr.tabindex]=\"disabled ? -1 : tabIndex\" [disabled]=\"disabled\" (click)=\"open($event)\"><i *ngIf=\"!customIcon\" mc-icon=\"mc-calendar_16\" class=\"mc-datepicker-toggle__default-icon\"></i><ng-content select=\"[mcDatepickerToggleIcon]\"></ng-content></button>",
            styles: [".mc-datepicker-toggle:focus{outline:0}.mc-datepicker-toggle__button.mc-icon-button{width:30px;height:30px;margin-left:2px;border-color:transparent;border-radius:0;background:0 0}.mc-form-field-appearance-legacy .mc-form-field-prefix .mc-datepicker-toggle__default-icon,.mc-form-field-appearance-legacy .mc-form-field-suffix .mc-datepicker-toggle__default-icon{width:1em}.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-prefix .mc-datepicker-toggle__default-icon,.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-suffix .mc-datepicker-toggle__default-icon{display:block;width:1.5em;height:1.5em}.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-prefix .mc-icon-button .mc-datepicker-toggle__default-icon,.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-suffix .mc-icon-button .mc-datepicker-toggle__default-icon{margin:auto}"],
            host: {
                class: 'mc-datepicker-toggle',
                // Always set the tabindex to -1 so that it doesn't overlap with any custom tabindex the
                // consumer may have provided, while still being able to receive focus.
                '[attr.tabindex]': '-1',
                '[class.mc-datepicker-toggle_active]': 'datepicker && datepicker.opened',
                '[class.mc-warn]': 'datepicker && datepicker.color === "error"',
                '(focus)': 'button.focus()'
            },
            exportAs: 'mcDatepickerToggle',
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param(2, Attribute('tabindex')),
        __metadata("design:paramtypes", [McDatepickerIntl,
            ChangeDetectorRef, String])
    ], McDatepickerToggle);
    return McDatepickerToggle;
}());

var McDatepickerModule = /** @class */ (function () {
    function McDatepickerModule() {
    }
    McDatepickerModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                McButtonModule,
                OverlayModule,
                A11yModule,
                PortalModule,
                McButtonModule,
                McIconModule
            ],
            exports: [
                McCalendar,
                McCalendarBody,
                McDatepicker,
                McDatepickerContent,
                McDatepickerInput,
                McDatepickerToggle,
                McDatepickerToggleIcon,
                McMonthView,
                McYearView,
                McMultiYearView,
                McCalendarHeader
            ],
            declarations: [
                McCalendar,
                McCalendarBody,
                McDatepicker,
                McDatepickerContent,
                McDatepickerInput,
                McDatepickerToggle,
                McDatepickerToggleIcon,
                McMonthView,
                McYearView,
                McMultiYearView,
                McCalendarHeader
            ],
            providers: [
                McDatepickerIntl,
                MC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER
            ],
            entryComponents: [
                McDatepickerContent,
                McCalendarHeader
            ]
        })
    ], McDatepickerModule);
    return McDatepickerModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { McMultiYearView as ɵa27, McDatepickerModule, McCalendarHeader, McCalendar, McCalendarCell, McCalendarBody, MC_DATEPICKER_SCROLL_STRATEGY, MC_DATEPICKER_SCROLL_STRATEGY_FACTORY, MC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER, McDatepickerContentBase, McDatepickerContentMixinBase, McDatepickerContent, McDatepicker, mcDatepickerAnimations, MC_DATEPICKER_VALUE_ACCESSOR, MC_DATEPICKER_VALIDATORS, McDatepickerInputEvent, McDatepickerInput, McDatepickerIntl, McDatepickerToggleIcon, McDatepickerToggle, McMonthView, McYearView };
//# sourceMappingURL=datepicker.es5.js.map
