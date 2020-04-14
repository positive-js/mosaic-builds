import { A11yModule } from '@angular/cdk/a11y';
import { Overlay, OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { DOCUMENT, CommonModule } from '@angular/common';
import { Injectable, ɵɵdefineInjectable, EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, NgZone, Input, Output, ChangeDetectorRef, Optional, Inject, ViewChild, forwardRef, InjectionToken, ViewContainerRef, Directive, ContentChild, NgModule } from '@angular/core';
import { McButtonModule } from '@ptsecurity/mosaic/button';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { MC_DATE_FORMATS, DateAdapter } from '@ptsecurity/cdk/datetime';
import { Subject, Subscription, merge, of } from 'rxjs';
import { Directionality } from '@angular/cdk/bidi';
import { SPACE, ENTER, PAGE_DOWN, PAGE_UP, END, HOME, DOWN_ARROW, UP_ARROW, RIGHT_ARROW, LEFT_ARROW, ESCAPE } from '@ptsecurity/cdk/keycodes';
import { take, filter } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, Validators } from '@angular/forms';
import { MC_INPUT_VALUE_ACCESSOR } from '@ptsecurity/mosaic/input';

/**
 * @fileoverview added by tsickle
 * Generated from: datepicker-errors.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@docs-private
 * @param {?} provider
 * @return {?}
 */
function createMissingDateImplError(provider) {
    return Error("McDatepicker: No provider found for " + provider + ". You must import one of the existing " +
        "modules at your application root or provide a custom implementation or use exists ones.");
}

/**
 * @fileoverview added by tsickle
 * Generated from: datepicker-intl.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Datepicker data that requires internationalization.
 */
var McDatepickerIntl = /** @class */ (function () {
    function McDatepickerIntl() {
        /**
         * Stream that emits whenever the labels here are changed. Use this to notify
         * components if the labels have changed after initialization.
         */
        this.changes = new Subject();
        /**
         * A label for the calendar popup (used by screen readers).
         */
        this.calendarLabel = 'Calendar';
        /**
         * A label for the button used to open the calendar popup (used by screen readers).
         */
        this.openCalendarLabel = 'Open calendar';
        /**
         * A label for the previous month button (used by screen readers).
         */
        this.prevMonthLabel = 'Previous month';
        /**
         * A label for the next month button (used by screen readers).
         */
        this.nextMonthLabel = 'Next month';
        /**
         * A label for the previous year button (used by screen readers).
         */
        this.prevYearLabel = 'Previous year';
        /**
         * A label for the next year button (used by screen readers).
         */
        this.nextYearLabel = 'Next year';
        /**
         * A label for the previous multi-year button (used by screen readers).
         */
        this.prevMultiYearLabel = 'Previous 20 years';
        /**
         * A label for the next multi-year button (used by screen readers).
         */
        this.nextMultiYearLabel = 'Next 20 years';
        /**
         * A label for the 'switch to month view' button (used by screen readers).
         */
        this.switchToMonthViewLabel = 'Choose date';
        /**
         * A label for the 'switch to year view' button (used by screen readers).
         */
        this.switchToMultiYearViewLabel = 'Choose month and year';
    }
    McDatepickerIntl.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ McDatepickerIntl.ɵprov = ɵɵdefineInjectable({ factory: function McDatepickerIntl_Factory() { return new McDatepickerIntl(); }, token: McDatepickerIntl, providedIn: "root" });
    return McDatepickerIntl;
}());
if (false) {
    /**
     * Stream that emits whenever the labels here are changed. Use this to notify
     * components if the labels have changed after initialization.
     * @type {?}
     */
    McDatepickerIntl.prototype.changes;
    /**
     * A label for the calendar popup (used by screen readers).
     * @type {?}
     */
    McDatepickerIntl.prototype.calendarLabel;
    /**
     * A label for the button used to open the calendar popup (used by screen readers).
     * @type {?}
     */
    McDatepickerIntl.prototype.openCalendarLabel;
    /**
     * A label for the previous month button (used by screen readers).
     * @type {?}
     */
    McDatepickerIntl.prototype.prevMonthLabel;
    /**
     * A label for the next month button (used by screen readers).
     * @type {?}
     */
    McDatepickerIntl.prototype.nextMonthLabel;
    /**
     * A label for the previous year button (used by screen readers).
     * @type {?}
     */
    McDatepickerIntl.prototype.prevYearLabel;
    /**
     * A label for the next year button (used by screen readers).
     * @type {?}
     */
    McDatepickerIntl.prototype.nextYearLabel;
    /**
     * A label for the previous multi-year button (used by screen readers).
     * @type {?}
     */
    McDatepickerIntl.prototype.prevMultiYearLabel;
    /**
     * A label for the next multi-year button (used by screen readers).
     * @type {?}
     */
    McDatepickerIntl.prototype.nextMultiYearLabel;
    /**
     * A label for the 'switch to month view' button (used by screen readers).
     * @type {?}
     */
    McDatepickerIntl.prototype.switchToMonthViewLabel;
    /**
     * A label for the 'switch to year view' button (used by screen readers).
     * @type {?}
     */
    McDatepickerIntl.prototype.switchToMultiYearViewLabel;
}

/**
 * @fileoverview added by tsickle
 * Generated from: calendar-body.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An internal class that represents the data corresponding to a single calendar cell.
 * \@docs-private
 */
var  /**
 * An internal class that represents the data corresponding to a single calendar cell.
 * \@docs-private
 */
McCalendarCell = /** @class */ (function () {
    function McCalendarCell(value, displayValue, ariaLabel, enabled, cssClasses) {
        this.value = value;
        this.displayValue = displayValue;
        this.ariaLabel = ariaLabel;
        this.enabled = enabled;
        this.cssClasses = cssClasses;
    }
    return McCalendarCell;
}());
if (false) {
    /** @type {?} */
    McCalendarCell.prototype.value;
    /** @type {?} */
    McCalendarCell.prototype.displayValue;
    /** @type {?} */
    McCalendarCell.prototype.ariaLabel;
    /** @type {?} */
    McCalendarCell.prototype.enabled;
    /** @type {?} */
    McCalendarCell.prototype.cssClasses;
}
/**
 * An internal component used to display calendar data in a table.
 * \@docs-private
 */
var McCalendarBody = /** @class */ (function () {
    function McCalendarBody(elementRef, ngZone) {
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        /**
         * The number of columns in the table.
         */
        this.numCols = 7;
        /**
         * The cell number of the active cell in the table.
         */
        this.activeCell = 0;
        /**
         * The aspect ratio (width / height) to use for the cells in the table. This aspect ratio will be
         * maintained even as the table resizes.
         */
        this.cellAspectRatio = 1;
        /**
         * Emits when a new value is selected.
         */
        this.selectedValueChange = new EventEmitter();
    }
    /**
     * @param {?} cell
     * @return {?}
     */
    McCalendarBody.prototype.cellClicked = /**
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        if (cell.enabled) {
            this.selectedValueChange.emit(cell.value);
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    McCalendarBody.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
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
    /**
     * @param {?} rowIndex
     * @param {?} colIndex
     * @return {?}
     */
    McCalendarBody.prototype.isActiveCell = /**
     * @param {?} rowIndex
     * @param {?} colIndex
     * @return {?}
     */
    function (rowIndex, colIndex) {
        /** @type {?} */
        var cellNumber = rowIndex * this.numCols + colIndex;
        // Account for the fact that the first row may not have as many cells.
        if (rowIndex) {
            cellNumber -= this.firstRowOffset;
        }
        return cellNumber === this.activeCell;
    };
    /** Focuses the active cell after the microtask queue is empty. */
    /**
     * Focuses the active cell after the microtask queue is empty.
     * @return {?}
     */
    McCalendarBody.prototype.focusActiveCell = /**
     * Focuses the active cell after the microtask queue is empty.
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.ngZone.onStable.asObservable().pipe(take(1)).subscribe((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var activeCell = _this.elementRef.nativeElement.querySelector('.mc-calendar__body_active');
                if (activeCell) {
                    activeCell.focus();
                }
            }));
        }));
    };
    McCalendarBody.decorators = [
        { type: Component, args: [{
                    selector: '[mc-calendar-body]',
                    exportAs: 'mcCalendarBody',
                    template: "<!--\n  If there's not enough space in the first row, create a separate label row. We mark this row as\n  aria-hidden because we don't want it to be read out as one of the weeks in the month.\n-->\n<tr *ngIf=\"firstRowOffset < labelMinRequiredCells\" aria-hidden=\"true\">\n    <td class=\"mc-calendar__body-label\"\n        [attr.colspan]=\"numCols\"\n        [style.paddingTop]=\"cellPadding\"\n        [style.paddingBottom]=\"cellPadding\">\n        {{label}}\n    </td>\n</tr>\n\n<!-- Create the first row separately so we can include a special spacer cell. -->\n<tr *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\">\n    <!--\n      We mark this cell as aria-hidden so it doesn't get read out as one of the days in the week.\n      The aspect ratio of the table cells is maintained by setting the top and bottom padding as a\n      percentage of the width (a variant of the trick described here:\n      https://www.w3schools.com/howto/howto_css_aspect_ratio.asp).\n    -->\n    <td *ngIf=\"rowIndex === 0 && firstRowOffset\"\n        aria-hidden=\"true\"\n        class=\"mc-calendar__body-label\"\n        [attr.colspan]=\"firstRowOffset\"\n        [style.paddingTop]=\"cellPadding\"\n        [style.paddingBottom]=\"cellPadding\">\n        {{firstRowOffset >= labelMinRequiredCells ? label : ''}}\n    </td>\n    <td *ngFor=\"let item of row; let colIndex = index\"\n        role=\"gridcell\"\n        class=\"mc-calendar__body-cell\"\n        [ngClass]=\"item.cssClasses\"\n        [tabindex]=\"isActiveCell(rowIndex, colIndex) ? 0 : -1\"\n        [class.mc-calendar__body_disabled]=\"!item.enabled\"\n        [class.mc-calendar__body_active]=\"isActiveCell(rowIndex, colIndex)\"\n        [attr.aria-label]=\"item.ariaLabel\"\n        [attr.aria-disabled]=\"!item.enabled || null\"\n        [attr.aria-selected]=\"selectedValue === item.value\"\n        (click)=\"cellClicked(item)\"\n        [style.width]=\"cellWidth\"\n        [style.paddingTop]=\"cellPadding\"\n        [style.paddingBottom]=\"cellPadding\">\n        <div class=\"mc-calendar__body-cell-content\"\n             [class.mc-selected]=\"selectedValue === item.value\"\n             [class.mc-calendar__body-today]=\"todayValue === item.value\">\n            {{item.displayValue}}\n        </div>\n    </td>\n</tr>\n",
                    host: {
                        class: 'mc-calendar__body',
                        role: 'grid',
                        'aria-readonly': 'true'
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mc-calendar__body{min-width:224px}.mc-calendar__body-label{height:0;line-height:0;text-align:left;padding-left:4.71429%;padding-right:4.71429%}.mc-calendar__body-cell{position:relative;height:0;line-height:0;text-align:center;outline:0;cursor:pointer}.mc-calendar__body_disabled{cursor:default}.mc-calendar__body-cell-content{position:absolute;top:5%;left:5%;padding:8px;display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:90%;height:90%;line-height:1;border-width:1px;border-style:solid}.cdk-high-contrast-active .mc-calendar__body-cell-content{border:none}.cdk-high-contrast-active :host .mc-calendar__body-cell-content{border:none}mc-month-view .mc-calendar__body-cell-content{justify-content:flex-end}mc-multi-year-view .mc-calendar__body-cell-content,mc-year-view .mc-calendar__body-cell-content{justify-content:center}.cdk-high-contrast-active .mc-datepicker__popup:not(:empty),.cdk-high-contrast-active .mc-selected{outline:solid 1px}.cdk-high-contrast-active .mc-calendar__body-today{outline:dotted 1px}.cdk-high-contrast-active :host .mc-datepicker__popup:not(:empty),.cdk-high-contrast-active :host .mc-selected{outline:solid 1px}.cdk-high-contrast-active :host .mc-calendar__body-today{outline:dotted 1px}[dir=rtl] .mc-calendar__body-label{text-align:right}"]
                }] }
    ];
    /** @nocollapse */
    McCalendarBody.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    McCalendarBody.propDecorators = {
        label: [{ type: Input }],
        rows: [{ type: Input }],
        todayValue: [{ type: Input }],
        selectedValue: [{ type: Input }],
        labelMinRequiredCells: [{ type: Input }],
        numCols: [{ type: Input }],
        activeCell: [{ type: Input }],
        cellAspectRatio: [{ type: Input }],
        selectedValueChange: [{ type: Output }]
    };
    return McCalendarBody;
}());
if (false) {
    /**
     * The label for the table. (e.g. "Jan 2017").
     * @type {?}
     */
    McCalendarBody.prototype.label;
    /**
     * The cells to display in the table.
     * @type {?}
     */
    McCalendarBody.prototype.rows;
    /**
     * The value in the table that corresponds to today.
     * @type {?}
     */
    McCalendarBody.prototype.todayValue;
    /**
     * The value in the table that is currently selected.
     * @type {?}
     */
    McCalendarBody.prototype.selectedValue;
    /**
     * The minimum number of free cells needed to fit the label in the first row.
     * @type {?}
     */
    McCalendarBody.prototype.labelMinRequiredCells;
    /**
     * The number of columns in the table.
     * @type {?}
     */
    McCalendarBody.prototype.numCols;
    /**
     * The cell number of the active cell in the table.
     * @type {?}
     */
    McCalendarBody.prototype.activeCell;
    /**
     * The aspect ratio (width / height) to use for the cells in the table. This aspect ratio will be
     * maintained even as the table resizes.
     * @type {?}
     */
    McCalendarBody.prototype.cellAspectRatio;
    /**
     * Emits when a new value is selected.
     * @type {?}
     */
    McCalendarBody.prototype.selectedValueChange;
    /**
     * The number of blank cells to put at the beginning for the first row.
     * @type {?}
     */
    McCalendarBody.prototype.firstRowOffset;
    /**
     * Padding for the individual date cells.
     * @type {?}
     */
    McCalendarBody.prototype.cellPadding;
    /**
     * Width of an individual cell.
     * @type {?}
     */
    McCalendarBody.prototype.cellWidth;
    /**
     * @type {?}
     * @private
     */
    McCalendarBody.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    McCalendarBody.prototype.ngZone;
}

/**
 * @fileoverview added by tsickle
 * Generated from: month-view.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var DAYS_PER_WEEK = 7;
/**
 * An internal component used to display a single month in the datepicker.
 * \@docs-private
 * @template D
 */
var McMonthView = /** @class */ (function () {
    function McMonthView(changeDetectorRef, dateFormats, dateAdapter, dir) {
        this.changeDetectorRef = changeDetectorRef;
        this.dateFormats = dateFormats;
        this.dateAdapter = dateAdapter;
        this.dir = dir;
        /**
         * Emits when a new date is selected.
         */
        this.selectedChange = new EventEmitter();
        /**
         * Emits when any date is selected.
         */
        this.userSelection = new EventEmitter();
        /**
         * Emits when any date is activated.
         */
        this.activeDateChange = new EventEmitter();
        if (!this.dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        if (!this.dateFormats) {
            throw createMissingDateImplError('MC_DATE_FORMATS');
        }
        /** @type {?} */
        var firstDayOfWeek = this.dateAdapter.getFirstDayOfWeek();
        /** @type {?} */
        var narrowWeekdays = this.dateAdapter.getDayOfWeekNames('narrow');
        /** @type {?} */
        var longWeekdays = this.dateAdapter.getDayOfWeekNames('long');
        // Rotate the labels for days of the week based on the configured first day of the week.
        /** @type {?} */
        var weekdays = longWeekdays.map((/**
         * @param {?} long
         * @param {?} i
         * @return {?}
         */
        function (long, i) {
            return { long: long, narrow: narrowWeekdays[i] };
        }));
        this.weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
        this._activeDate = this.dateAdapter.today();
    }
    Object.defineProperty(McMonthView.prototype, "activeDate", {
        /**
         * The date to display in this month view (everything other than the month and year is ignored).
         */
        get: /**
         * The date to display in this month view (everything other than the month and year is ignored).
         * @return {?}
         */
        function () {
            return this._activeDate;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var oldActiveDate = this._activeDate;
            /** @type {?} */
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
            this.selectedDate = this.getDateInCurrentMonth(this._selected);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McMonthView.prototype, "minDate", {
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
    Object.defineProperty(McMonthView.prototype, "maxDate", {
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
    /**
     * @return {?}
     */
    McMonthView.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.init();
    };
    /** Handles when a new date is selected. */
    /**
     * Handles when a new date is selected.
     * @param {?} date
     * @return {?}
     */
    McMonthView.prototype.dateSelected = /**
     * Handles when a new date is selected.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (this.selectedDate !== date) {
            /** @type {?} */
            var selectedYear = this.dateAdapter.getYear(this.activeDate);
            /** @type {?} */
            var selectedMonth = this.dateAdapter.getMonth(this.activeDate);
            /** @type {?} */
            var selectedDate = this.dateAdapter.createDate(selectedYear, selectedMonth, date);
            this.selectedChange.emit(selectedDate);
        }
        this.userSelection.emit();
    };
    /** Handles keydown events on the calendar body when calendar is in month view. */
    /**
     * Handles keydown events on the calendar body when calendar is in month view.
     * @param {?} event
     * @return {?}
     */
    McMonthView.prototype.handleCalendarBodyKeydown = /**
     * Handles keydown events on the calendar body when calendar is in month view.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        /** @type {?} */
        var oldActiveDate = this._activeDate;
        /** @type {?} */
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
    /**
     * Initializes this month view.
     * @return {?}
     */
    McMonthView.prototype.init = /**
     * Initializes this month view.
     * @return {?}
     */
    function () {
        this.selectedDate = this.getDateInCurrentMonth(this.selected);
        this.todayDate = this.getDateInCurrentMonth(this.dateAdapter.today());
        this.monthLabel =
            this.dateAdapter.getMonthNames('short')[this.dateAdapter.getMonth(this.activeDate)];
        this.monthLabel = this.monthLabel[0].toLocaleUpperCase() + this.monthLabel.substr(1);
        /** @type {?} */
        var firstOfMonth = this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), this.dateAdapter.getMonth(this.activeDate), 1);
        this.firstWeekOffset =
            (DAYS_PER_WEEK + this.dateAdapter.getDayOfWeek(firstOfMonth) -
                this.dateAdapter.getFirstDayOfWeek()) % DAYS_PER_WEEK;
        this.createWeekCells();
        this.changeDetectorRef.markForCheck();
    };
    /** Focuses the active cell after the microtask queue is empty. */
    /**
     * Focuses the active cell after the microtask queue is empty.
     * @return {?}
     */
    McMonthView.prototype.focusActiveCell = /**
     * Focuses the active cell after the microtask queue is empty.
     * @return {?}
     */
    function () {
        this.mcCalendarBody.focusActiveCell();
    };
    /** Creates McCalendarCells for the dates in this month. */
    /**
     * Creates McCalendarCells for the dates in this month.
     * @private
     * @return {?}
     */
    McMonthView.prototype.createWeekCells = /**
     * Creates McCalendarCells for the dates in this month.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var daysInMonth = this.dateAdapter.getNumDaysInMonth(this.activeDate);
        /** @type {?} */
        var dateNames = this.dateAdapter.getDateNames();
        this.weeks = [[]];
        for (var i = 0, cell = this.firstWeekOffset; i < daysInMonth; i++, cell++) {
            if (cell === DAYS_PER_WEEK) {
                this.weeks.push([]);
                cell = 0;
            }
            /** @type {?} */
            var date = this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), this.dateAdapter.getMonth(this.activeDate), i + 1);
            /** @type {?} */
            var enabled = this.shouldEnableDate(date);
            /** @type {?} */
            var ariaLabel = this.dateAdapter.format(date, this.dateFormats.display.dateA11yLabel);
            /** @type {?} */
            var cellClasses = this.dateClass ? this.dateClass(date) : undefined;
            this.weeks[this.weeks.length - 1]
                .push(new McCalendarCell(i + 1, dateNames[i], ariaLabel, enabled, cellClasses));
        }
    };
    /** Date filter for the month */
    /**
     * Date filter for the month
     * @private
     * @param {?} date
     * @return {?}
     */
    McMonthView.prototype.shouldEnableDate = /**
     * Date filter for the month
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return !!date &&
            (!this.dateFilter || this.dateFilter(date)) &&
            (!this.minDate || this.dateAdapter.compareDate(date, this.minDate) >= 0) &&
            (!this.maxDate || this.dateAdapter.compareDate(date, this.maxDate) <= 0);
    };
    /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     */
    /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     * @private
     * @param {?} date
     * @return {?}
     */
    McMonthView.prototype.getDateInCurrentMonth = /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date && this.hasSameMonthAndYear(date, this.activeDate) ?
            this.dateAdapter.getDate(date) : null;
    };
    /** Checks whether the 2 dates are non-null and fall within the same month of the same year. */
    /**
     * Checks whether the 2 dates are non-null and fall within the same month of the same year.
     * @private
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    McMonthView.prototype.hasSameMonthAndYear = /**
     * Checks whether the 2 dates are non-null and fall within the same month of the same year.
     * @private
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    function (d1, d2) {
        return !!(d1 && d2 && this.dateAdapter.getMonth(d1) === this.dateAdapter.getMonth(d2) &&
            this.dateAdapter.getYear(d1) === this.dateAdapter.getYear(d2));
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
    McMonthView.prototype.getValidDateOrNull = /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    function (obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    };
    /** Determines whether the user has the RTL layout direction. */
    /**
     * Determines whether the user has the RTL layout direction.
     * @private
     * @return {?}
     */
    McMonthView.prototype.isRtl = /**
     * Determines whether the user has the RTL layout direction.
     * @private
     * @return {?}
     */
    function () {
        return this.dir && this.dir.value === 'rtl';
    };
    McMonthView.decorators = [
        { type: Component, args: [{
                    selector: 'mc-month-view',
                    exportAs: 'mcMonthView',
                    template: "<table class=\"mc-calendar__table\">\n    <thead class=\"mc-calendar__table-header\">\n    <tr>\n        <th *ngFor=\"let day of weekdays\" [attr.aria-label]=\"day.long\">{{day.narrow}}</th>\n    </tr>\n    <tr>\n        <th class=\"mc-calendar__table-header-divider\" colspan=\"7\" aria-hidden=\"true\"></th>\n    </tr>\n    </thead>\n    <tbody mc-calendar-body\n           [label]=\"monthLabel\"\n           [rows]=\"weeks\"\n           [todayValue]=\"todayDate\"\n           [selectedValue]=\"selectedDate\"\n           [labelMinRequiredCells]=\"3\"\n           [activeCell]=\"dateAdapter.getDate(activeDate) - 1\"\n           (selectedValueChange)=\"dateSelected($event)\"\n           (keydown)=\"handleCalendarBodyKeydown($event)\">\n    </tbody>\n</table>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    McMonthView.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_DATE_FORMATS,] }] },
        { type: DateAdapter, decorators: [{ type: Optional }] },
        { type: Directionality, decorators: [{ type: Optional }] }
    ]; };
    McMonthView.propDecorators = {
        activeDate: [{ type: Input }],
        selected: [{ type: Input }],
        minDate: [{ type: Input }],
        maxDate: [{ type: Input }],
        dateFilter: [{ type: Input }],
        dateClass: [{ type: Input }],
        selectedChange: [{ type: Output }],
        userSelection: [{ type: Output }],
        activeDateChange: [{ type: Output }],
        mcCalendarBody: [{ type: ViewChild, args: [McCalendarBody, { static: false },] }]
    };
    return McMonthView;
}());
if (false) {
    /**
     * Function used to filter which dates are selectable.
     * @type {?}
     */
    McMonthView.prototype.dateFilter;
    /**
     * Function that can be used to add custom CSS classes to dates.
     * @type {?}
     */
    McMonthView.prototype.dateClass;
    /**
     * Emits when a new date is selected.
     * @type {?}
     */
    McMonthView.prototype.selectedChange;
    /**
     * Emits when any date is selected.
     * @type {?}
     */
    McMonthView.prototype.userSelection;
    /**
     * Emits when any date is activated.
     * @type {?}
     */
    McMonthView.prototype.activeDateChange;
    /**
     * The body of calendar table
     * @type {?}
     */
    McMonthView.prototype.mcCalendarBody;
    /**
     * The label for this month (e.g. "January 2017").
     * @type {?}
     */
    McMonthView.prototype.monthLabel;
    /**
     * Grid of calendar cells representing the dates of the month.
     * @type {?}
     */
    McMonthView.prototype.weeks;
    /**
     * The number of blank cells in the first row before the 1st of the month.
     * @type {?}
     */
    McMonthView.prototype.firstWeekOffset;
    /**
     * The date of the month that the currently selected Date falls on.
     * Null if the currently selected Date is in another month.
     * @type {?}
     */
    McMonthView.prototype.selectedDate;
    /**
     * The date of the month that today falls on. Null if today is in another month.
     * @type {?}
     */
    McMonthView.prototype.todayDate;
    /**
     * The names of the weekdays.
     * @type {?}
     */
    McMonthView.prototype.weekdays;
    /**
     * @type {?}
     * @private
     */
    McMonthView.prototype._activeDate;
    /**
     * @type {?}
     * @private
     */
    McMonthView.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    McMonthView.prototype._minDate;
    /**
     * @type {?}
     * @private
     */
    McMonthView.prototype._maxDate;
    /**
     * @type {?}
     * @private
     */
    McMonthView.prototype.changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    McMonthView.prototype.dateFormats;
    /** @type {?} */
    McMonthView.prototype.dateAdapter;
    /**
     * @type {?}
     * @private
     */
    McMonthView.prototype.dir;
}

/**
 * @fileoverview added by tsickle
 * Generated from: multi-year-view.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var yearsPerPage = 24;
/** @type {?} */
var yearsPerRow = 4;
/**
 * An internal component used to display a year selector in the datepicker.
 * \@docs-private
 * @template D
 */
var McMultiYearView = /** @class */ (function () {
    function McMultiYearView(changeDetectorRef, dateAdapter, dir) {
        this.changeDetectorRef = changeDetectorRef;
        this.dateAdapter = dateAdapter;
        this.dir = dir;
        /**
         * Emits when a new year is selected.
         */
        this.selectedChange = new EventEmitter();
        /**
         * Emits the selected year. This doesn't imply a change on the selected date
         */
        this.yearSelected = new EventEmitter();
        /**
         * Emits when any date is activated.
         */
        this.activeDateChange = new EventEmitter();
        if (!this.dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        this._activeDate = this.dateAdapter.today();
    }
    Object.defineProperty(McMultiYearView.prototype, "activeDate", {
        /** The date to display in this multi-year view (everything other than the year is ignored). */
        get: /**
         * The date to display in this multi-year view (everything other than the year is ignored).
         * @return {?}
         */
        function () {
            return this._activeDate;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var oldActiveDate = this._activeDate;
            /** @type {?} */
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
            this.selectedYear = this._selected && this.dateAdapter.getYear(this._selected);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McMultiYearView.prototype, "minDate", {
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
    Object.defineProperty(McMultiYearView.prototype, "maxDate", {
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
    /**
     * @return {?}
     */
    McMultiYearView.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.init();
    };
    /** Initializes this multi-year view. */
    /**
     * Initializes this multi-year view.
     * @return {?}
     */
    McMultiYearView.prototype.init = /**
     * Initializes this multi-year view.
     * @return {?}
     */
    function () {
        var _this = this;
        this.todayYear = this.dateAdapter.getYear(this.dateAdapter.today());
        /** @type {?} */
        var activeYear = this.dateAdapter.getYear(this._activeDate);
        /** @type {?} */
        var activeOffset = activeYear % yearsPerPage;
        this.years = [];
        for (var i = 0, row = []; i < yearsPerPage; i++) {
            row.push(activeYear - activeOffset + i);
            if (row.length === yearsPerRow) {
                this.years.push(row.map((/**
                 * @param {?} year
                 * @return {?}
                 */
                function (year) { return _this.createCellForYear(year); })));
                row = [];
            }
        }
        this.changeDetectorRef.markForCheck();
    };
    /** Handles when a new year is selected. */
    /**
     * Handles when a new year is selected.
     * @param {?} year
     * @return {?}
     */
    McMultiYearView.prototype.onYearSelected = /**
     * Handles when a new year is selected.
     * @param {?} year
     * @return {?}
     */
    function (year) {
        this.yearSelected.emit(this.dateAdapter.createDate(year, 0, 1));
        /** @type {?} */
        var month = this.dateAdapter.getMonth(this.activeDate);
        /** @type {?} */
        var daysInMonth = this.dateAdapter.getNumDaysInMonth(this.dateAdapter.createDate(year, month, 1));
        this.selectedChange.emit(this.dateAdapter.createDate(year, month, Math.min(this.dateAdapter.getDate(this.activeDate), daysInMonth)));
    };
    /** Handles keydown events on the calendar body when calendar is in multi-year view. */
    /**
     * Handles keydown events on the calendar body when calendar is in multi-year view.
     * @param {?} event
     * @return {?}
     */
    McMultiYearView.prototype.handleCalendarBodyKeydown = /**
     * Handles keydown events on the calendar body when calendar is in multi-year view.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        /** @type {?} */
        var oldActiveDate = this._activeDate;
        /** @type {?} */
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
    /**
     * @return {?}
     */
    McMultiYearView.prototype.getActiveCell = /**
     * @return {?}
     */
    function () {
        return this.dateAdapter.getYear(this.activeDate) % yearsPerPage;
    };
    /** Focuses the active cell after the microtask queue is empty. */
    /**
     * Focuses the active cell after the microtask queue is empty.
     * @return {?}
     */
    McMultiYearView.prototype.focusActiveCell = /**
     * Focuses the active cell after the microtask queue is empty.
     * @return {?}
     */
    function () {
        this.mcCalendarBody.focusActiveCell();
    };
    /** Creates an McCalendarCell for the given year. */
    /**
     * Creates an McCalendarCell for the given year.
     * @private
     * @param {?} year
     * @return {?}
     */
    McMultiYearView.prototype.createCellForYear = /**
     * Creates an McCalendarCell for the given year.
     * @private
     * @param {?} year
     * @return {?}
     */
    function (year) {
        /** @type {?} */
        var yearName = this.dateAdapter.getYearName(this.dateAdapter.createDate(year, 0, 1));
        return new McCalendarCell(year, yearName, yearName, this.shouldEnableYear(year));
    };
    /** Whether the given year is enabled. */
    /**
     * Whether the given year is enabled.
     * @private
     * @param {?} year
     * @return {?}
     */
    McMultiYearView.prototype.shouldEnableYear = /**
     * Whether the given year is enabled.
     * @private
     * @param {?} year
     * @return {?}
     */
    function (year) {
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
        /** @type {?} */
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
    /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    McMultiYearView.prototype.getValidDateOrNull = /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    function (obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    };
    /** Determines whether the user has the RTL layout direction. */
    /**
     * Determines whether the user has the RTL layout direction.
     * @private
     * @return {?}
     */
    McMultiYearView.prototype.isRtl = /**
     * Determines whether the user has the RTL layout direction.
     * @private
     * @return {?}
     */
    function () {
        return this.dir && this.dir.value === 'rtl';
    };
    McMultiYearView.decorators = [
        { type: Component, args: [{
                    selector: 'mc-multi-year-view',
                    exportAs: 'mcMultiYearView',
                    template: "<table class=\"mc-calendar__table\">\n    <thead class=\"mc-calendar__table-header\">\n    <tr>\n        <th class=\"mc-calendar__table-header-divider\" colspan=\"4\"></th>\n    </tr>\n    </thead>\n    <tbody mc-calendar-body\n           [rows]=\"years\"\n           [todayValue]=\"todayYear\"\n           [selectedValue]=\"selectedYear\"\n           [numCols]=\"4\"\n           [cellAspectRatio]=\"4 / 7\"\n           [activeCell]=\"getActiveCell()\"\n           (selectedValueChange)=\"onYearSelected($event)\"\n           (keydown)=\"handleCalendarBodyKeydown($event)\">\n    </tbody>\n</table>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    McMultiYearView.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: DateAdapter, decorators: [{ type: Optional }] },
        { type: Directionality, decorators: [{ type: Optional }] }
    ]; };
    McMultiYearView.propDecorators = {
        activeDate: [{ type: Input }],
        selected: [{ type: Input }],
        minDate: [{ type: Input }],
        maxDate: [{ type: Input }],
        dateFilter: [{ type: Input }],
        selectedChange: [{ type: Output }],
        yearSelected: [{ type: Output }],
        activeDateChange: [{ type: Output }],
        mcCalendarBody: [{ type: ViewChild, args: [McCalendarBody, { static: false },] }]
    };
    return McMultiYearView;
}());
if (false) {
    /**
     * A function used to filter which dates are selectable.
     * @type {?}
     */
    McMultiYearView.prototype.dateFilter;
    /**
     * Emits when a new year is selected.
     * @type {?}
     */
    McMultiYearView.prototype.selectedChange;
    /**
     * Emits the selected year. This doesn't imply a change on the selected date
     * @type {?}
     */
    McMultiYearView.prototype.yearSelected;
    /**
     * Emits when any date is activated.
     * @type {?}
     */
    McMultiYearView.prototype.activeDateChange;
    /**
     * The body of calendar table
     * @type {?}
     */
    McMultiYearView.prototype.mcCalendarBody;
    /**
     * Grid of calendar cells representing the currently displayed years.
     * @type {?}
     */
    McMultiYearView.prototype.years;
    /**
     * The year that today falls on.
     * @type {?}
     */
    McMultiYearView.prototype.todayYear;
    /**
     * The year of the selected date. Null if the selected date is null.
     * @type {?}
     */
    McMultiYearView.prototype.selectedYear;
    /**
     * @type {?}
     * @private
     */
    McMultiYearView.prototype._activeDate;
    /**
     * @type {?}
     * @private
     */
    McMultiYearView.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    McMultiYearView.prototype._minDate;
    /**
     * @type {?}
     * @private
     */
    McMultiYearView.prototype._maxDate;
    /**
     * @type {?}
     * @private
     */
    McMultiYearView.prototype.changeDetectorRef;
    /** @type {?} */
    McMultiYearView.prototype.dateAdapter;
    /**
     * @type {?}
     * @private
     */
    McMultiYearView.prototype.dir;
}

/**
 * @fileoverview added by tsickle
 * Generated from: year-view.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An internal component used to display a single year in the datepicker.
 * \@docs-private
 * @template D
 */
var McYearView = /** @class */ (function () {
    function McYearView(changeDetectorRef, dateFormats, dateAdapter, dir) {
        this.changeDetectorRef = changeDetectorRef;
        this.dateFormats = dateFormats;
        this.dateAdapter = dateAdapter;
        this.dir = dir;
        /**
         * Emits when a new month is selected.
         */
        this.selectedChange = new EventEmitter();
        /**
         * Emits the selected month. This doesn't imply a change on the selected date
         */
        this.monthSelected = new EventEmitter();
        /**
         * Emits when any date is activated.
         */
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
        get: /**
         * The date to display in this year view (everything other than the year is ignored).
         * @return {?}
         */
        function () {
            return this._activeDate;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var oldActiveDate = this._activeDate;
            /** @type {?} */
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
            this.selectedMonth = this.getMonthInCurrentYear(this._selected);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McYearView.prototype, "minDate", {
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
    Object.defineProperty(McYearView.prototype, "maxDate", {
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
    /**
     * @return {?}
     */
    McYearView.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.init();
    };
    /** Handles when a new month is selected. */
    /**
     * Handles when a new month is selected.
     * @param {?} month
     * @return {?}
     */
    McYearView.prototype.onMonthSelected = /**
     * Handles when a new month is selected.
     * @param {?} month
     * @return {?}
     */
    function (month) {
        /** @type {?} */
        var normalizedDate = this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), month, 1);
        this.monthSelected.emit(normalizedDate);
        /** @type {?} */
        var daysInMonth = this.dateAdapter.getNumDaysInMonth(normalizedDate);
        this.selectedChange.emit(this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), month, Math.min(this.dateAdapter.getDate(this.activeDate), daysInMonth)));
    };
    /** Handles keydown events on the calendar body when calendar is in year view. */
    /**
     * Handles keydown events on the calendar body when calendar is in year view.
     * @param {?} event
     * @return {?}
     */
    McYearView.prototype.handleCalendarBodyKeydown = /**
     * Handles keydown events on the calendar body when calendar is in year view.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        /** @type {?} */
        var oldActiveDate = this._activeDate;
        /** @type {?} */
        var isRtl = this.isRtl();
        /** @type {?} */
        var VERTICAL_SHIFT = 4;
        /** @type {?} */
        var PAGE_SHIFT = 10;
        /** @type {?} */
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
    /**
     * Initializes this year view.
     * @return {?}
     */
    McYearView.prototype.init = /**
     * Initializes this year view.
     * @return {?}
     */
    function () {
        var _this = this;
        this.selectedMonth = this.getMonthInCurrentYear(this.selected);
        this.todayMonth = this.getMonthInCurrentYear(this.dateAdapter.today());
        this.yearLabel = this.dateAdapter.getYearName(this.activeDate);
        /** @type {?} */
        var monthNames = this.dateAdapter.getMonthNames('short');
        // First row of months only contains 5 elements so we can fit the year label on the same row.
        // tslint:disable-next-line:no-magic-numbers
        this.months = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]].map((/**
         * @param {?} row
         * @return {?}
         */
        function (row) { return row.map((/**
         * @param {?} month
         * @return {?}
         */
        function (month) { return _this.createCellForMonth(month, monthNames[month]); })); }));
        this.changeDetectorRef.markForCheck();
    };
    /** Focuses the active cell after the microtask queue is empty. */
    /**
     * Focuses the active cell after the microtask queue is empty.
     * @return {?}
     */
    McYearView.prototype.focusActiveCell = /**
     * Focuses the active cell after the microtask queue is empty.
     * @return {?}
     */
    function () {
        this.mcCalendarBody.focusActiveCell();
    };
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     */
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     * @private
     * @param {?} date
     * @return {?}
     */
    McYearView.prototype.getMonthInCurrentYear = /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date && this.dateAdapter.getYear(date) === this.dateAdapter.getYear(this.activeDate) ?
            this.dateAdapter.getMonth(date) : null;
    };
    /** Creates an McCalendarCell for the given month. */
    /**
     * Creates an McCalendarCell for the given month.
     * @private
     * @param {?} month
     * @param {?} monthName
     * @return {?}
     */
    McYearView.prototype.createCellForMonth = /**
     * Creates an McCalendarCell for the given month.
     * @private
     * @param {?} month
     * @param {?} monthName
     * @return {?}
     */
    function (month, monthName) {
        /** @type {?} */
        var ariaLabel = this.dateAdapter.format(this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), month, 1), this.dateFormats.display.monthYearA11yLabel);
        /** @type {?} */
        var newMonthName = monthName[0].toLocaleUpperCase() + monthName.substr(1);
        return new McCalendarCell(month, newMonthName, ariaLabel, this.shouldEnableMonth(month));
    };
    /** Whether the given month is enabled. */
    /**
     * Whether the given month is enabled.
     * @private
     * @param {?} month
     * @return {?}
     */
    McYearView.prototype.shouldEnableMonth = /**
     * Whether the given month is enabled.
     * @private
     * @param {?} month
     * @return {?}
     */
    function (month) {
        /** @type {?} */
        var activeYear = this.dateAdapter.getYear(this.activeDate);
        if (month === undefined || month === null ||
            this.isYearAndMonthAfterMaxDate(activeYear, month) ||
            this.isYearAndMonthBeforeMinDate(activeYear, month)) {
            return false;
        }
        if (!this.dateFilter) {
            return true;
        }
        /** @type {?} */
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
    /**
     * Tests whether the combination month/year is after this.maxDate, considering
     * just the month and year of this.maxDate
     * @private
     * @param {?} year
     * @param {?} month
     * @return {?}
     */
    McYearView.prototype.isYearAndMonthAfterMaxDate = /**
     * Tests whether the combination month/year is after this.maxDate, considering
     * just the month and year of this.maxDate
     * @private
     * @param {?} year
     * @param {?} month
     * @return {?}
     */
    function (year, month) {
        if (this.maxDate) {
            /** @type {?} */
            var maxYear = this.dateAdapter.getYear(this.maxDate);
            /** @type {?} */
            var maxMonth = this.dateAdapter.getMonth(this.maxDate);
            return year > maxYear || (year === maxYear && month > maxMonth);
        }
        return false;
    };
    /**
     * Tests whether the combination month/year is before this.minDate, considering
     * just the month and year of this.minDate
     */
    /**
     * Tests whether the combination month/year is before this.minDate, considering
     * just the month and year of this.minDate
     * @private
     * @param {?} year
     * @param {?} month
     * @return {?}
     */
    McYearView.prototype.isYearAndMonthBeforeMinDate = /**
     * Tests whether the combination month/year is before this.minDate, considering
     * just the month and year of this.minDate
     * @private
     * @param {?} year
     * @param {?} month
     * @return {?}
     */
    function (year, month) {
        if (this.minDate) {
            /** @type {?} */
            var minYear = this.dateAdapter.getYear(this.minDate);
            /** @type {?} */
            var minMonth = this.dateAdapter.getMonth(this.minDate);
            return year < minYear || (year === minYear && month < minMonth);
        }
        return false;
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
    McYearView.prototype.getValidDateOrNull = /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    function (obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    };
    /** Determines whether the user has the RTL layout direction. */
    /**
     * Determines whether the user has the RTL layout direction.
     * @private
     * @return {?}
     */
    McYearView.prototype.isRtl = /**
     * Determines whether the user has the RTL layout direction.
     * @private
     * @return {?}
     */
    function () {
        return this.dir && this.dir.value === 'rtl';
    };
    McYearView.decorators = [
        { type: Component, args: [{
                    selector: 'mc-year-view',
                    exportAs: 'mcYearView',
                    template: "<table class=\"mc-calendar__table\">\n    <thead class=\"mc-calendar__table-header\">\n    <tr>\n        <th class=\"mc-calendar__table-header-divider\" colspan=\"4\"></th>\n    </tr>\n    </thead>\n    <tbody mc-calendar-body\n           [label]=\"yearLabel\"\n           [rows]=\"months\"\n           [todayValue]=\"todayMonth\"\n           [selectedValue]=\"selectedMonth\"\n           [labelMinRequiredCells]=\"2\"\n           [numCols]=\"4\"\n           [cellAspectRatio]=\"4 / 7\"\n           [activeCell]=\"dateAdapter.getMonth(activeDate)\"\n           (selectedValueChange)=\"onMonthSelected($event)\"\n           (keydown)=\"handleCalendarBodyKeydown($event)\">\n    </tbody>\n</table>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    McYearView.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_DATE_FORMATS,] }] },
        { type: DateAdapter, decorators: [{ type: Optional }] },
        { type: Directionality, decorators: [{ type: Optional }] }
    ]; };
    McYearView.propDecorators = {
        activeDate: [{ type: Input }],
        selected: [{ type: Input }],
        minDate: [{ type: Input }],
        maxDate: [{ type: Input }],
        dateFilter: [{ type: Input }],
        selectedChange: [{ type: Output }],
        monthSelected: [{ type: Output }],
        activeDateChange: [{ type: Output }],
        mcCalendarBody: [{ type: ViewChild, args: [McCalendarBody, { static: false },] }]
    };
    return McYearView;
}());
if (false) {
    /**
     * A function used to filter which dates are selectable.
     * @type {?}
     */
    McYearView.prototype.dateFilter;
    /**
     * Emits when a new month is selected.
     * @type {?}
     */
    McYearView.prototype.selectedChange;
    /**
     * Emits the selected month. This doesn't imply a change on the selected date
     * @type {?}
     */
    McYearView.prototype.monthSelected;
    /**
     * Emits when any date is activated.
     * @type {?}
     */
    McYearView.prototype.activeDateChange;
    /**
     * The body of calendar table
     * @type {?}
     */
    McYearView.prototype.mcCalendarBody;
    /**
     * Grid of calendar cells representing the months of the year.
     * @type {?}
     */
    McYearView.prototype.months;
    /**
     * The label for this year (e.g. "2017").
     * @type {?}
     */
    McYearView.prototype.yearLabel;
    /**
     * The month in this year that today falls on. Null if today is in a different year.
     * @type {?}
     */
    McYearView.prototype.todayMonth;
    /**
     * The month in this year that the selected Date falls on.
     * Null if the selected Date is in a different year.
     * @type {?}
     */
    McYearView.prototype.selectedMonth;
    /**
     * @type {?}
     * @private
     */
    McYearView.prototype._activeDate;
    /**
     * @type {?}
     * @private
     */
    McYearView.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    McYearView.prototype._minDate;
    /**
     * @type {?}
     * @private
     */
    McYearView.prototype._maxDate;
    /**
     * @type {?}
     * @private
     */
    McYearView.prototype.changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    McYearView.prototype.dateFormats;
    /** @type {?} */
    McYearView.prototype.dateAdapter;
    /**
     * @type {?}
     * @private
     */
    McYearView.prototype.dir;
}

/**
 * @fileoverview added by tsickle
 * Generated from: calendar.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * Generated from: datepicker-animations.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Animations used by the mosaic datepicker.
 * \@docs-private
 * @type {?}
 */
var mcDatepickerAnimations = {
    /**
     * Transforms the height of the datepicker's calendar.
     */
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
    /**
     * Fades in the content of the calendar.
     */
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
    Element.prototype.matches = ((/** @type {?} */ (Element.prototype))).msMatchesSelector;
}

/**
 * @fileoverview added by tsickle
 * Generated from: datepicker.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Used to generate a unique ID for each datepicker instance.
 * @type {?}
 */
var datepickerUid = 0;
/**
 * Injection token that determines the scroll handling while the calendar is open.
 * @type {?}
 */
var MC_DATEPICKER_SCROLL_STRATEGY = new InjectionToken('mc-datepicker-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
// tslint:disable-next-line:naming-convention
function MC_DATEPICKER_SCROLL_STRATEGY_FACTORY(overlay) {
    return (/**
     * @return {?}
     */
    function () { return overlay.scrollStrategies.reposition(); });
}
/**
 * \@docs-private
 * @type {?}
 */
var MC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_DATEPICKER_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MC_DATEPICKER_SCROLL_STRATEGY_FACTORY
};
/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * McCalendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * \@docs-private
 * @template D
 */
var McDatepickerContent = /** @class */ (function () {
    function McDatepickerContent() {
    }
    /**
     * @return {?}
     */
    McDatepickerContent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.calendar.focusActiveCell();
    };
    McDatepickerContent.decorators = [
        { type: Component, args: [{
                    selector: 'mc-datepicker__content',
                    exportAs: 'mcDatepickerContent',
                    template: "<mc-calendar [id]=\"datepicker.id\"\n             [ngClass]=\"datepicker.panelClass\"\n             [startAt]=\"datepicker.startAt\"\n             [startView]=\"datepicker.startView\"\n             [minDate]=\"datepicker.minDate\"\n             [maxDate]=\"datepicker.maxDate\"\n             [dateFilter]=\"datepicker.dateFilter\"\n             [headerComponent]=\"datepicker.calendarHeaderComponent\"\n             [selected]=\"datepicker.selected\"\n             [dateClass]=\"datepicker.dateClass\"\n             [@fadeInCalendar]=\"'enter'\"\n             (selectedChange)=\"datepicker.select($event)\"\n             (yearSelected)=\"datepicker.selectYear($event)\"\n             (monthSelected)=\"datepicker.selectMonth($event)\"\n             (userSelection)=\"datepicker.close()\">\n</mc-calendar>\n",
                    host: {
                        class: 'mc-datepicker__content',
                        '[@transformPanel]': '"enter"'
                    },
                    animations: [
                        mcDatepickerAnimations.transformPanel,
                        mcDatepickerAnimations.fadeInCalendar
                    ],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mc-datepicker__content{display:block;border-width:1px;border-style:solid}.mc-datepicker__content .mc-calendar{width:296px;height:344px}.mc-datepicker__content .mc-calendar__next-button[disabled],.mc-datepicker__content .mc-calendar__previous-button[disabled]{border:0}@media all and (orientation:landscape){.mc-calendar{width:64vh;height:80vh}}@media all and (orientation:portrait){.mc-calendar{width:80vw;height:100vw}}"]
                }] }
    ];
    McDatepickerContent.propDecorators = {
        calendar: [{ type: ViewChild, args: [McCalendar, { static: false },] }]
    };
    return McDatepickerContent;
}());
if (false) {
    /**
     * Reference to the internal calendar component.
     * @type {?}
     */
    McDatepickerContent.prototype.calendar;
    /**
     * Reference to the datepicker that created the overlay.
     * @type {?}
     */
    McDatepickerContent.prototype.datepicker;
}
// TODO: We use a component instead of a directive here so the user can use implicit
// template reference variables (e.g. #d vs #d="mcDatepicker"). We can change this to a directive
// if angular adds support for `exportAs: '$implicit'` on directives.
/**
 * Component responsible for managing the datepicker popup/dialog.
 * @template D
 */
var McDatepicker = /** @class */ (function () {
    function McDatepicker(overlay, ngZone, viewContainerRef, scrollStrategy, dateAdapter, dir, document) {
        this.overlay = overlay;
        this.ngZone = ngZone;
        this.viewContainerRef = viewContainerRef;
        this.dateAdapter = dateAdapter;
        this.dir = dir;
        this.document = document;
        /**
         * The view that the calendar should start in.
         */
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
        /**
         * Emits when the datepicker has been opened.
         */
        this.openedStream = new EventEmitter();
        /**
         * Emits when the datepicker has been closed.
         */
        this.closedStream = new EventEmitter();
        /**
         * The id for the datepicker calendar.
         */
        this.id = "mc-datepicker-" + datepickerUid++;
        this.stateChanges = new Subject();
        /**
         * Emits when the datepicker is disabled.
         */
        this.disabledChange = new Subject();
        /**
         * Emits new selected date when selected date changes.
         */
        this.selectedChanged = new Subject();
        this._opened = false;
        this.validSelected = null;
        /**
         * The element that was focused before the datepicker was opened.
         */
        this.focusedElementBeforeOpen = null;
        /**
         * Subscription to value changes in the associated input element.
         */
        this.inputSubscription = Subscription.EMPTY;
        if (!this.dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        this.scrollStrategy = scrollStrategy;
    }
    Object.defineProperty(McDatepicker.prototype, "startAt", {
        /** The date to open the calendar to initially. */
        get: /**
         * The date to open the calendar to initially.
         * @return {?}
         */
        function () {
            // If an explicit startAt is set we start there, otherwise we start at whatever the currently
            // selected value is.
            return this._startAt || (this.datepickerInput ? this.datepickerInput.value : null);
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
    Object.defineProperty(McDatepicker.prototype, "disabled", {
        /** Whether the datepicker pop-up should be disabled. */
        get: /**
         * Whether the datepicker pop-up should be disabled.
         * @return {?}
         */
        function () {
            return this._disabled === undefined && this.datepickerInput ?
                this.datepickerInput.disabled : !!this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
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
        get: /**
         * Whether the calendar is open.
         * @return {?}
         */
        function () {
            return this._opened;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
        get: /**
         * The currently selected date.
         * @return {?}
         */
        function () {
            return this.validSelected;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.validSelected = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "minDate", {
        /** The minimum selectable date. */
        get: /**
         * The minimum selectable date.
         * @return {?}
         */
        function () {
            return this.datepickerInput && this.datepickerInput.min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "maxDate", {
        /** The maximum selectable date. */
        get: /**
         * The maximum selectable date.
         * @return {?}
         */
        function () {
            return this.datepickerInput && this.datepickerInput.max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "dateFilter", {
        get: /**
         * @return {?}
         */
        function () {
            return this.datepickerInput && this.datepickerInput.dateFilter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.selected;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McDatepicker.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.close();
        this.inputSubscription.unsubscribe();
        this.disabledChange.complete();
        if (this.popupRef) {
            this.popupRef.dispose();
            this.popupComponentRef = null;
        }
    };
    /** Selects the given date */
    /**
     * Selects the given date
     * @param {?} date
     * @return {?}
     */
    McDatepicker.prototype.select = /**
     * Selects the given date
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var oldValue = this.selected;
        this.selected = date;
        if (!this.dateAdapter.sameDate(oldValue, this.selected)) {
            this.selectedChanged.next(date);
        }
    };
    /** Emits the selected year in multiyear view */
    /**
     * Emits the selected year in multiyear view
     * @param {?} normalizedYear
     * @return {?}
     */
    McDatepicker.prototype.selectYear = /**
     * Emits the selected year in multiyear view
     * @param {?} normalizedYear
     * @return {?}
     */
    function (normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    };
    /** Emits selected month in year view */
    /**
     * Emits selected month in year view
     * @param {?} normalizedMonth
     * @return {?}
     */
    McDatepicker.prototype.selectMonth = /**
     * Emits selected month in year view
     * @param {?} normalizedMonth
     * @return {?}
     */
    function (normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    };
    /**
     * Register an input with this datepicker.
     * @param input The datepicker input to register with this datepicker.
     */
    /**
     * Register an input with this datepicker.
     * @param {?} input The datepicker input to register with this datepicker.
     * @return {?}
     */
    McDatepicker.prototype.registerInput = /**
     * Register an input with this datepicker.
     * @param {?} input The datepicker input to register with this datepicker.
     * @return {?}
     */
    function (input) {
        var _this = this;
        if (this.datepickerInput) {
            throw Error('A McDatepicker can only be associated with a single input.');
        }
        this.datepickerInput = input;
        this.inputSubscription =
            this.datepickerInput.valueChange.subscribe((/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return _this.selected = value; }));
    };
    /** Open the calendar. */
    /**
     * Open the calendar.
     * @return {?}
     */
    McDatepicker.prototype.open = /**
     * Open the calendar.
     * @return {?}
     */
    function () {
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
    /**
     * Close the calendar.
     * @return {?}
     */
    McDatepicker.prototype.close = /**
     * Close the calendar.
     * @return {?}
     */
    function () {
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
        /** @type {?} */
        var completeClose = (/**
         * @return {?}
         */
        function () {
            // The `_opened` could've been reset already if
            // we got two events in quick succession.
            if (_this._opened) {
                _this._opened = false;
                _this.closedStream.emit();
                _this.focusedElementBeforeOpen = null;
                _this.datepickerInput.elementRef.nativeElement.focus();
            }
        });
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
    /**
     * Open the calendar as a popup.
     * @private
     * @return {?}
     */
    McDatepicker.prototype.openAsPopup = /**
     * Open the calendar as a popup.
     * @private
     * @return {?}
     */
    function () {
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
            // Update the position once the calendar has rendered.
            this.ngZone.onStable.asObservable().pipe(take(1)).subscribe((/**
             * @return {?}
             */
            function () {
                _this.popupRef.updatePosition();
            }));
        }
    };
    /** Create the popup. */
    /**
     * Create the popup.
     * @private
     * @return {?}
     */
    McDatepicker.prototype.createPopup = /**
     * Create the popup.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
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
        merge(this.popupRef.backdropClick(), this.popupRef.detachments(), this.popupRef.keydownEvents().pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // Closing on alt + up is only valid when there's an input associated with the datepicker.
            // tslint:disable-next-line:deprecation
            return event.keyCode === ESCAPE || (_this.datepickerInput && event.altKey && event.keyCode === UP_ARROW);
        })))).subscribe((/**
         * @return {?}
         */
        function () { return _this.close(); }));
    };
    /** Create the popup PositionStrategy. */
    /**
     * Create the popup PositionStrategy.
     * @private
     * @return {?}
     */
    McDatepicker.prototype.createPopupPositionStrategy = /**
     * Create the popup PositionStrategy.
     * @private
     * @return {?}
     */
    function () {
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
    /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    McDatepicker.prototype.getValidDateOrNull = /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    function (obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    };
    McDatepicker.decorators = [
        { type: Component, args: [{
                    selector: 'mc-datepicker',
                    template: '',
                    exportAs: 'mcDatepicker',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    providers: [{ provide: McFormFieldControl, useExisting: McDatepicker }]
                }] }
    ];
    /** @nocollapse */
    McDatepicker.ctorParameters = function () { return [
        { type: Overlay },
        { type: NgZone },
        { type: ViewContainerRef },
        { type: undefined, decorators: [{ type: Inject, args: [MC_DATEPICKER_SCROLL_STRATEGY,] }] },
        { type: DateAdapter, decorators: [{ type: Optional }] },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
    ]; };
    McDatepicker.propDecorators = {
        startAt: [{ type: Input }],
        disabled: [{ type: Input }],
        opened: [{ type: Input }],
        calendarHeaderComponent: [{ type: Input }],
        startView: [{ type: Input }],
        yearSelected: [{ type: Output }],
        monthSelected: [{ type: Output }],
        panelClass: [{ type: Input }],
        dateClass: [{ type: Input }],
        openedStream: [{ type: Output, args: ['opened',] }],
        closedStream: [{ type: Output, args: ['closed',] }]
    };
    return McDatepicker;
}());
if (false) {
    /**
     * An input indicating the type of the custom header component for the calendar, if set.
     * @type {?}
     */
    McDatepicker.prototype.calendarHeaderComponent;
    /**
     * The view that the calendar should start in.
     * @type {?}
     */
    McDatepicker.prototype.startView;
    /**
     * Emits selected year in multiyear view.
     * This doesn't imply a change on the selected date.
     * @type {?}
     */
    McDatepicker.prototype.yearSelected;
    /**
     * Emits selected month in year view.
     * This doesn't imply a change on the selected date.
     * @type {?}
     */
    McDatepicker.prototype.monthSelected;
    /**
     * Classes to be passed to the date picker panel. Supports the same syntax as `ngClass`.
     * @type {?}
     */
    McDatepicker.prototype.panelClass;
    /**
     * Function that can be used to add custom CSS classes to dates.
     * @type {?}
     */
    McDatepicker.prototype.dateClass;
    /**
     * Emits when the datepicker has been opened.
     * @type {?}
     */
    McDatepicker.prototype.openedStream;
    /**
     * Emits when the datepicker has been closed.
     * @type {?}
     */
    McDatepicker.prototype.closedStream;
    /**
     * The id for the datepicker calendar.
     * @type {?}
     */
    McDatepicker.prototype.id;
    /**
     * A reference to the overlay when the calendar is opened as a popup.
     * @type {?}
     */
    McDatepicker.prototype.popupRef;
    /**
     * The input element this datepicker is associated with.
     * @type {?}
     */
    McDatepicker.prototype.datepickerInput;
    /** @type {?} */
    McDatepicker.prototype.stateChanges;
    /**
     * Emits when the datepicker is disabled.
     * @type {?}
     */
    McDatepicker.prototype.disabledChange;
    /**
     * Emits new selected date when selected date changes.
     * @type {?}
     */
    McDatepicker.prototype.selectedChanged;
    /**
     * @type {?}
     * @private
     */
    McDatepicker.prototype.scrollStrategy;
    /**
     * @type {?}
     * @private
     */
    McDatepicker.prototype._startAt;
    /**
     * @type {?}
     * @private
     */
    McDatepicker.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    McDatepicker.prototype._opened;
    /**
     * @type {?}
     * @private
     */
    McDatepicker.prototype.validSelected;
    /**
     * A portal containing the calendar for this datepicker.
     * @type {?}
     * @private
     */
    McDatepicker.prototype.calendarPortal;
    /**
     * Reference to the component instantiated in popup mode.
     * @type {?}
     * @private
     */
    McDatepicker.prototype.popupComponentRef;
    /**
     * The element that was focused before the datepicker was opened.
     * @type {?}
     * @private
     */
    McDatepicker.prototype.focusedElementBeforeOpen;
    /**
     * Subscription to value changes in the associated input element.
     * @type {?}
     * @private
     */
    McDatepicker.prototype.inputSubscription;
    /**
     * @type {?}
     * @private
     */
    McDatepicker.prototype.overlay;
    /**
     * @type {?}
     * @private
     */
    McDatepicker.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    McDatepicker.prototype.viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    McDatepicker.prototype.dateAdapter;
    /**
     * @type {?}
     * @private
     */
    McDatepicker.prototype.dir;
    /**
     * @type {?}
     * @private
     */
    McDatepicker.prototype.document;
}

/**
 * @fileoverview added by tsickle
 * Generated from: datepicker-input.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@docs-private
 * @type {?}
 */
var MC_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return McDatepickerInput; })),
    multi: true
};
/**
 * \@docs-private
 * @type {?}
 */
var MC_DATEPICKER_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return McDatepickerInput; })),
    multi: true
};
/**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use McDatepickerInputEvent instead.
 * @template D
 */
var  /**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use McDatepickerInputEvent instead.
 * @template D
 */
McDatepickerInputEvent = /** @class */ (function () {
    function McDatepickerInputEvent(target, targetElement) {
        this.target = target;
        this.targetElement = targetElement;
        this.value = this.target.value;
    }
    return McDatepickerInputEvent;
}());
if (false) {
    /**
     * The new value for the target datepicker input.
     * @type {?}
     */
    McDatepickerInputEvent.prototype.value;
    /**
     * Reference to the datepicker input component that emitted the event.
     * @type {?}
     */
    McDatepickerInputEvent.prototype.target;
    /**
     * Reference to the native input element associated with the datepicker input.
     * @type {?}
     */
    McDatepickerInputEvent.prototype.targetElement;
}
/**
 * Directive used to connect an input to a McDatepicker.
 * @template D
 */
var McDatepickerInput = /** @class */ (function () {
    function McDatepickerInput(elementRef, dateAdapter, dateFormats) {
        var _this = this;
        this.elementRef = elementRef;
        this.dateAdapter = dateAdapter;
        this.dateFormats = dateFormats;
        /**
         * Emits when a `change` event is fired on this `<input>`.
         */
        this.dateChange = new EventEmitter();
        /**
         * Emits when an `input` event is fired on this `<input>`.
         */
        this.dateInput = new EventEmitter();
        /**
         * Emits when the value changes (either due to user input or programmatic change).
         */
        this.valueChange = new EventEmitter();
        /**
         * Emits when the disabled state has changed
         */
        this.disabledChange = new EventEmitter();
        this.datepickerSubscription = Subscription.EMPTY;
        this.localeSubscription = Subscription.EMPTY;
        /**
         * Whether the last value set on the input was valid.
         */
        this.lastValueValid = false;
        this.onTouched = (/**
         * @return {?}
         */
        function () {
        });
        this.cvaOnChange = (/**
         * @return {?}
         */
        function () {
        });
        this.validatorOnChange = (/**
         * @return {?}
         */
        function () {
        });
        /**
         * The form control validator for whether the input parses.
         */
        this.parseValidator = (/**
         * @return {?}
         */
        function () {
            return _this.lastValueValid ?
                null : { mcDatepickerParse: { text: _this.elementRef.nativeElement.value } };
        });
        /**
         * The form control validator for the min date.
         */
        this.minValidator = (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            /** @type {?} */
            var controlValue = _this.getValidDateOrNull(_this.dateAdapter.deserialize(control.value));
            return (!_this.min || !controlValue ||
                _this.dateAdapter.compareDate(_this.min, controlValue) <= 0) ?
                null : { mcDatepickerMin: { min: _this.min, actual: controlValue } };
        });
        /**
         * The form control validator for the max date.
         */
        this.maxValidator = (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            /** @type {?} */
            var controlValue = _this.getValidDateOrNull(_this.dateAdapter.deserialize(control.value));
            return (!_this.max || !controlValue ||
                _this.dateAdapter.compareDate(_this.max, controlValue) >= 0) ?
                null : { mcDatepickerMax: { max: _this.max, actual: controlValue } };
        });
        /**
         * The form control validator for the date filter.
         */
        this.filterValidator = (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            /** @type {?} */
            var controlValue = _this.getValidDateOrNull(_this.dateAdapter.deserialize(control.value));
            return !_this.dateFilter || !controlValue || _this.dateFilter(controlValue) ?
                null : { mcDatepickerFilter: true };
        });
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
        this.localeSubscription = dateAdapter.localeChanges.subscribe((/**
         * @return {?}
         */
        function () {
            _this.value = _this.value;
        }));
    }
    Object.defineProperty(McDatepickerInput.prototype, "mcDatepicker", {
        /** The datepicker that this input is associated with. */
        set: /**
         * The datepicker that this input is associated with.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (!value) {
                return;
            }
            this.datepicker = value;
            this.datepicker.registerInput(this);
            this.datepickerSubscription.unsubscribe();
            this.datepickerSubscription = this.datepicker.selectedChanged.subscribe((/**
             * @param {?} selected
             * @return {?}
             */
            function (selected) {
                _this.value = selected;
                _this.cvaOnChange(selected);
                _this.onTouched();
                _this.dateInput.emit(new McDatepickerInputEvent(_this, _this.elementRef.nativeElement));
                _this.dateChange.emit(new McDatepickerInputEvent(_this, _this.elementRef.nativeElement));
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepickerInput.prototype, "mcDatepickerFilter", {
        /** Function that can be used to filter out dates within the datepicker. */
        set: /**
         * Function that can be used to filter out dates within the datepicker.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.dateFilter = value;
            this.validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepickerInput.prototype, "value", {
        /** The value of the input. */
        get: /**
         * The value of the input.
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // tslint:disable-next-line:no-parameter-reassignment
            value = this.dateAdapter.deserialize(value);
            this.lastValueValid = !value || this.dateAdapter.isValid(value);
            // tslint:disable-next-line:no-parameter-reassignment
            value = this.getValidDateOrNull(value);
            /** @type {?} */
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
        get: /**
         * The minimum valid date.
         * @return {?}
         */
        function () {
            return this._min;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._min = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            this.validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepickerInput.prototype, "max", {
        /** The maximum valid date. */
        get: /**
         * The maximum valid date.
         * @return {?}
         */
        function () {
            return this._max;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._max = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            this.validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepickerInput.prototype, "disabled", {
        /** Whether the datepicker-input is disabled. */
        get: /**
         * Whether the datepicker-input is disabled.
         * @return {?}
         */
        function () {
            return !!this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var newValue = coerceBooleanProperty(value);
            /** @type {?} */
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
    /**
     * @return {?}
     */
    McDatepickerInput.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.datepickerSubscription.unsubscribe();
        this.localeSubscription.unsubscribe();
        this.valueChange.complete();
        this.disabledChange.complete();
    };
    /** @docs-private */
    /**
     * \@docs-private
     * @param {?} fn
     * @return {?}
     */
    McDatepickerInput.prototype.registerOnValidatorChange = /**
     * \@docs-private
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.validatorOnChange = fn;
    };
    /** @docs-private */
    /**
     * \@docs-private
     * @param {?} c
     * @return {?}
     */
    McDatepickerInput.prototype.validate = /**
     * \@docs-private
     * @param {?} c
     * @return {?}
     */
    function (c) {
        return this.validator ? this.validator(c) : null;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} value
     * @return {?}
     */
    McDatepickerInput.prototype.writeValue = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    McDatepickerInput.prototype.registerOnChange = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.cvaOnChange = fn;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    McDatepickerInput.prototype.registerOnTouched = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    McDatepickerInput.prototype.setDisabledState = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McDatepickerInput.prototype.onKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // tslint:disable-next-line:deprecation
        /** @type {?} */
        var isAltDownArrow = event.altKey && event.keyCode === DOWN_ARROW;
        if (this.datepicker && isAltDownArrow && !this.elementRef.nativeElement.readOnly) {
            this.datepicker.open();
            event.preventDefault();
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    McDatepickerInput.prototype.onInput = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
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
    /**
     * @return {?}
     */
    McDatepickerInput.prototype.onChange = /**
     * @return {?}
     */
    function () {
        this.dateChange.emit(new McDatepickerInputEvent(this, this.elementRef.nativeElement));
    };
    /** Handles blur events on the input. */
    /**
     * Handles blur events on the input.
     * @return {?}
     */
    McDatepickerInput.prototype.onBlur = /**
     * Handles blur events on the input.
     * @return {?}
     */
    function () {
        // Reformat the input only if we have a valid value.
        if (this.value) {
            this.formatValue(this.value);
        }
        this.onTouched();
    };
    /** Formats a value and sets it on the input element. */
    /**
     * Formats a value and sets it on the input element.
     * @private
     * @param {?} value
     * @return {?}
     */
    McDatepickerInput.prototype.formatValue = /**
     * Formats a value and sets it on the input element.
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.elementRef.nativeElement.value =
            value ? this.dateAdapter.format(value, this.dateFormats.display.dateInput) : '';
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
    McDatepickerInput.prototype.getValidDateOrNull = /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    function (obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    };
    McDatepickerInput.decorators = [
        { type: Directive, args: [{
                    selector: 'input[mcDatepicker]',
                    exportAs: 'mcDatepickerInput',
                    providers: [
                        MC_DATEPICKER_VALUE_ACCESSOR,
                        MC_DATEPICKER_VALIDATORS,
                        { provide: MC_INPUT_VALUE_ACCESSOR, useExisting: McDatepickerInput }
                    ],
                    host: {
                        '[attr.aria-haspopup]': 'true',
                        '[attr.aria-owns]': '(datepicker?.opened && datepicker.id) || null',
                        '[attr.min]': 'min ? dateAdapter.toIso8601(min) : null',
                        '[attr.max]': 'max ? dateAdapter.toIso8601(max) : null',
                        '[attr.disabled]': 'disabled || null',
                        '(input)': 'onInput($event.target.value)',
                        '(change)': 'onChange()',
                        '(blur)': 'onBlur()',
                        '(keydown)': 'onKeydown($event)'
                    }
                },] }
    ];
    /** @nocollapse */
    McDatepickerInput.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DateAdapter, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_DATE_FORMATS,] }] }
    ]; };
    McDatepickerInput.propDecorators = {
        mcDatepicker: [{ type: Input }],
        mcDatepickerFilter: [{ type: Input }],
        value: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        disabled: [{ type: Input }],
        dateChange: [{ type: Output }],
        dateInput: [{ type: Output }]
    };
    return McDatepickerInput;
}());
if (false) {
    /** @type {?} */
    McDatepickerInput.prototype.datepicker;
    /** @type {?} */
    McDatepickerInput.prototype.dateFilter;
    /**
     * Emits when a `change` event is fired on this `<input>`.
     * @type {?}
     */
    McDatepickerInput.prototype.dateChange;
    /**
     * Emits when an `input` event is fired on this `<input>`.
     * @type {?}
     */
    McDatepickerInput.prototype.dateInput;
    /**
     * Emits when the value changes (either due to user input or programmatic change).
     * @type {?}
     */
    McDatepickerInput.prototype.valueChange;
    /**
     * Emits when the disabled state has changed
     * @type {?}
     */
    McDatepickerInput.prototype.disabledChange;
    /**
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype._value;
    /**
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype._min;
    /**
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype._max;
    /**
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype.datepickerSubscription;
    /**
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype.localeSubscription;
    /**
     * Whether the last value set on the input was valid.
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype.lastValueValid;
    /**
     * The combined form control validator for this input.
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype.validator;
    /** @type {?} */
    McDatepickerInput.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype.cvaOnChange;
    /**
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype.validatorOnChange;
    /**
     * The form control validator for whether the input parses.
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype.parseValidator;
    /**
     * The form control validator for the min date.
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype.minValidator;
    /**
     * The form control validator for the max date.
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype.maxValidator;
    /**
     * The form control validator for the date filter.
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype.filterValidator;
    /** @type {?} */
    McDatepickerInput.prototype.elementRef;
    /** @type {?} */
    McDatepickerInput.prototype.dateAdapter;
    /**
     * @type {?}
     * @private
     */
    McDatepickerInput.prototype.dateFormats;
}

/**
 * @fileoverview added by tsickle
 * Generated from: datepicker-toggle.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Can be used to override the icon of a `mcDatepickerToggle`.
 */
var McDatepickerToggleIcon = /** @class */ (function () {
    function McDatepickerToggleIcon() {
    }
    McDatepickerToggleIcon.decorators = [
        { type: Directive, args: [{
                    selector: '[mcDatepickerToggleIcon]'
                },] }
    ];
    return McDatepickerToggleIcon;
}());
/**
 * @template D
 */
var McDatepickerToggle = /** @class */ (function () {
    function McDatepickerToggle(intl, changeDetectorRef) {
        this.intl = intl;
        this.changeDetectorRef = changeDetectorRef;
        this.stateChanges = Subscription.EMPTY;
    }
    Object.defineProperty(McDatepickerToggle.prototype, "disabled", {
        /** Whether the toggle button is disabled. */
        get: /**
         * Whether the toggle button is disabled.
         * @return {?}
         */
        function () {
            return this._disabled === undefined ? this.datepicker.disabled : !!this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    McDatepickerToggle.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.datepicker) {
            this.watchStateChanges();
        }
    };
    /**
     * @return {?}
     */
    McDatepickerToggle.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stateChanges.unsubscribe();
    };
    /**
     * @return {?}
     */
    McDatepickerToggle.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.watchStateChanges();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McDatepickerToggle.prototype.open = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.datepicker && !this.disabled) {
            this.datepicker.open();
            event.stopPropagation();
        }
    };
    /**
     * @private
     * @return {?}
     */
    McDatepickerToggle.prototype.watchStateChanges = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var datepickerDisabled = this.datepicker ? this.datepicker.disabledChange : of();
        /** @type {?} */
        var inputDisabled = this.datepicker && this.datepicker.datepickerInput ?
            this.datepicker.datepickerInput.disabledChange : of();
        /** @type {?} */
        var datepickerToggled = this.datepicker ?
            merge(this.datepicker.openedStream, this.datepicker.closedStream) :
            of();
        this.stateChanges.unsubscribe();
        this.stateChanges = merge(this.intl.changes, datepickerDisabled, inputDisabled, datepickerToggled).subscribe((/**
         * @return {?}
         */
        function () { return _this.changeDetectorRef.markForCheck(); }));
    };
    McDatepickerToggle.decorators = [
        { type: Component, args: [{
                    selector: 'mc-datepicker-toggle',
                    template: "<button\n    #button\n    mc-button\n    type=\"button\"\n    class=\"mc-datepicker-toggle__button\"\n    aria-haspopup=\"true\"\n    [attr.aria-label]=\"intl.openCalendarLabel\"\n    [attr.tabindex]=\"tabIndex\"\n    [disabled]=\"disabled\"\n    (click)=\"open($event)\">\n\n    <i *ngIf=\"!customIcon\" mc-icon=\"mc-calendar_16\" class=\"mc-datepicker-toggle__default-icon\"></i>\n\n    <ng-content select=\"[mcDatepickerToggleIcon]\"></ng-content>\n</button>\n",
                    host: {
                        class: 'mc-datepicker-toggle',
                        '[class.mc-active]': 'datepicker && datepicker.opened'
                    },
                    exportAs: 'mcDatepickerToggle',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mc-datepicker-toggle:focus{outline:0}.mc-datepicker-toggle__button.mc-icon-button{width:30px;height:30px;margin-left:2px}.mc-form-field-appearance-legacy .mc-form-field-prefix .mc-datepicker-toggle__default-icon,.mc-form-field-appearance-legacy .mc-form-field-suffix .mc-datepicker-toggle__default-icon{width:1em}.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-prefix .mc-datepicker-toggle__default-icon,.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-suffix .mc-datepicker-toggle__default-icon{display:block;width:1.5em;height:1.5em}.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-prefix .mc-icon-button .mc-datepicker-toggle__default-icon,.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-suffix .mc-icon-button .mc-datepicker-toggle__default-icon{margin:auto}"]
                }] }
    ];
    /** @nocollapse */
    McDatepickerToggle.ctorParameters = function () { return [
        { type: McDatepickerIntl },
        { type: ChangeDetectorRef }
    ]; };
    McDatepickerToggle.propDecorators = {
        disabled: [{ type: Input }],
        datepicker: [{ type: Input, args: ['for',] }],
        tabIndex: [{ type: Input }],
        customIcon: [{ type: ContentChild, args: [McDatepickerToggleIcon, { static: false },] }],
        button: [{ type: ViewChild, args: ['button', { static: false },] }]
    };
    return McDatepickerToggle;
}());
if (false) {
    /**
     * Datepicker instance that the button will toggle.
     * @type {?}
     */
    McDatepickerToggle.prototype.datepicker;
    /**
     * Tabindex for the toggle.
     * @type {?}
     */
    McDatepickerToggle.prototype.tabIndex;
    /**
     * Custom icon set by the consumer.
     * @type {?}
     */
    McDatepickerToggle.prototype.customIcon;
    /**
     * Underlying button element.
     * @type {?}
     */
    McDatepickerToggle.prototype.button;
    /**
     * @type {?}
     * @private
     */
    McDatepickerToggle.prototype.stateChanges;
    /**
     * @type {?}
     * @private
     */
    McDatepickerToggle.prototype._disabled;
    /** @type {?} */
    McDatepickerToggle.prototype.intl;
    /**
     * @type {?}
     * @private
     */
    McDatepickerToggle.prototype.changeDetectorRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: datepicker-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McDatepickerModule = /** @class */ (function () {
    function McDatepickerModule() {
    }
    McDatepickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        McButtonModule,
                        OverlayModule,
                        A11yModule,
                        PortalModule,
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
                        McCalendarHeader,
                        McButtonModule
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
                },] }
    ];
    return McDatepickerModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ptsecurity-mosaic-datepicker.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { MC_DATEPICKER_SCROLL_STRATEGY, MC_DATEPICKER_SCROLL_STRATEGY_FACTORY, MC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER, MC_DATEPICKER_VALIDATORS, MC_DATEPICKER_VALUE_ACCESSOR, McCalendar, McCalendarBody, McCalendarCell, McCalendarHeader, McDatepicker, McDatepickerContent, McDatepickerInput, McDatepickerInputEvent, McDatepickerIntl, McDatepickerModule, McDatepickerToggle, McDatepickerToggleIcon, McMonthView, McMultiYearView, McYearView, mcDatepickerAnimations, yearsPerPage, yearsPerRow };
//# sourceMappingURL=ptsecurity-mosaic-datepicker.js.map
