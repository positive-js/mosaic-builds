(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/cdk/overlay'), require('@angular/cdk/portal'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/button'), require('@ptsecurity/mosaic/icon'), require('@ptsecurity/cdk/datetime'), require('rxjs'), require('@angular/cdk/bidi'), require('@ptsecurity/cdk/keycodes'), require('rxjs/operators'), require('@angular/cdk/coercion'), require('@ptsecurity/mosaic/form-field'), require('@angular/animations'), require('@angular/forms'), require('@ptsecurity/mosaic/input')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/datepicker', ['exports', '@angular/cdk/a11y', '@angular/cdk/overlay', '@angular/cdk/portal', '@angular/common', '@angular/core', '@ptsecurity/mosaic/button', '@ptsecurity/mosaic/icon', '@ptsecurity/cdk/datetime', 'rxjs', '@angular/cdk/bidi', '@ptsecurity/cdk/keycodes', 'rxjs/operators', '@angular/cdk/coercion', '@ptsecurity/mosaic/form-field', '@angular/animations', '@angular/forms', '@ptsecurity/mosaic/input'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.datepicker = {}), global.ng.cdk.a11y, global.ng.cdk.overlay, global.ng.cdk.portal, global.ng.common, global.ng.core, global.ptsecurity.mosaic.button, global.ptsecurity.mosaic.icon, global.datetime, global.rxjs, global.ng.cdk.bidi, global.keycodes, global.rxjs.operators, global.ng.cdk.coercion, global.ptsecurity.mosaic['form-field'], global.ng.animations, global.ng.forms, global.ptsecurity.mosaic.input));
}(this, (function (exports, a11y, overlay, portal, common, i0, button, icon, datetime, rxjs, bidi, keycodes, operators, coercion, formField, animations, forms, input) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: datepicker-errors.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            this.changes = new rxjs.Subject();
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
        return McDatepickerIntl;
    }());
    McDatepickerIntl.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ McDatepickerIntl.ɵprov = i0.ɵɵdefineInjectable({ factory: function McDatepickerIntl_Factory() { return new McDatepickerIntl(); }, token: McDatepickerIntl, providedIn: "root" });
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * An internal class that represents the data corresponding to a single calendar cell.
     * \@docs-private
     */
    var McCalendarCell = /** @class */ (function () {
        /**
         * @param {?} value
         * @param {?} displayValue
         * @param {?} ariaLabel
         * @param {?} enabled
         * @param {?=} cssClasses
         */
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
        /**
         * @param {?} elementRef
         * @param {?} ngZone
         */
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
            this.selectedValueChange = new i0.EventEmitter();
        }
        /**
         * @param {?} cell
         * @return {?}
         */
        McCalendarBody.prototype.cellClicked = function (cell) {
            if (cell.enabled) {
                this.selectedValueChange.emit(cell.value);
            }
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        McCalendarBody.prototype.ngOnChanges = function (changes) {
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
        McCalendarBody.prototype.isActiveCell = function (rowIndex, colIndex) {
            /** @type {?} */
            var cellNumber = rowIndex * this.numCols + colIndex;
            // Account for the fact that the first row may not have as many cells.
            if (rowIndex) {
                cellNumber -= this.firstRowOffset;
            }
            return cellNumber === this.activeCell;
        };
        /**
         * Focuses the active cell after the microtask queue is empty.
         * @return {?}
         */
        McCalendarBody.prototype.focusActiveCell = function () {
            var _this = this;
            this.ngZone.runOutsideAngular(( /**
             * @return {?}
             */function () {
                _this.ngZone.onStable.asObservable().pipe(operators.take(1)).subscribe(( /**
                 * @return {?}
                 */function () {
                    /** @type {?} */
                    var activeCell = _this.elementRef.nativeElement.querySelector('.mc-calendar__body_active');
                    if (activeCell) {
                        activeCell.focus();
                    }
                }));
            }));
        };
        return McCalendarBody;
    }());
    McCalendarBody.decorators = [
        { type: i0.Component, args: [{
                    selector: '[mc-calendar-body]',
                    exportAs: 'mcCalendarBody',
                    template: "<!--\n  If there's not enough space in the first row, create a separate label row. We mark this row as\n  aria-hidden because we don't want it to be read out as one of the weeks in the month.\n-->\n<tr *ngIf=\"firstRowOffset < labelMinRequiredCells\" aria-hidden=\"true\">\n    <td class=\"mc-calendar__body-label\"\n        [attr.colspan]=\"numCols\"\n        [style.paddingTop]=\"cellPadding\"\n        [style.paddingBottom]=\"cellPadding\">\n        {{label}}\n    </td>\n</tr>\n\n<!-- Create the first row separately so we can include a special spacer cell. -->\n<tr *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\">\n    <!--\n      We mark this cell as aria-hidden so it doesn't get read out as one of the days in the week.\n      The aspect ratio of the table cells is maintained by setting the top and bottom padding as a\n      percentage of the width (a variant of the trick described here:\n      https://www.w3schools.com/howto/howto_css_aspect_ratio.asp).\n    -->\n    <td *ngIf=\"rowIndex === 0 && firstRowOffset\"\n        aria-hidden=\"true\"\n        class=\"mc-calendar__body-label\"\n        [attr.colspan]=\"firstRowOffset\"\n        [style.paddingTop]=\"cellPadding\"\n        [style.paddingBottom]=\"cellPadding\">\n        {{firstRowOffset >= labelMinRequiredCells ? label : ''}}\n    </td>\n    <td *ngFor=\"let item of row; let colIndex = index\"\n        role=\"gridcell\"\n        class=\"mc-calendar__body-cell\"\n        [ngClass]=\"item.cssClasses\"\n        [tabindex]=\"isActiveCell(rowIndex, colIndex) ? 0 : -1\"\n        [class.mc-calendar__body_disabled]=\"!item.enabled\"\n        [class.mc-calendar__body_active]=\"isActiveCell(rowIndex, colIndex)\"\n        [attr.aria-label]=\"item.ariaLabel\"\n        [attr.aria-disabled]=\"!item.enabled || null\"\n        [attr.aria-selected]=\"selectedValue === item.value\"\n        (click)=\"cellClicked(item)\"\n        [style.width]=\"cellWidth\"\n        [style.paddingTop]=\"cellPadding\"\n        [style.paddingBottom]=\"cellPadding\">\n        <div class=\"mc-calendar__body-cell-content\"\n             [class.mc-selected]=\"selectedValue === item.value\"\n             [class.mc-calendar__body-today]=\"todayValue === item.value\">\n            {{item.displayValue}}\n        </div>\n    </td>\n</tr>\n",
                    host: {
                        class: 'mc-calendar__body',
                        role: 'grid',
                        'aria-readonly': 'true'
                    },
                    encapsulation: i0.ViewEncapsulation.None,
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".mc-calendar__body{min-width:224px}.mc-calendar__body-label{height:0;line-height:0;padding-left:4.71429%;padding-right:4.71429%;text-align:left}.mc-calendar__body-cell{cursor:pointer;height:0;line-height:0;outline:none;position:relative;text-align:center}.mc-calendar__body_disabled{cursor:default}.mc-calendar__body-cell-content{align-items:center;border-style:solid;border-width:1px;box-sizing:border-box;display:flex;height:90%;justify-content:center;left:5%;line-height:1;padding:8px;position:absolute;top:5%;width:90%}.cdk-high-contrast-active .mc-calendar__body-cell-content,.cdk-high-contrast-active :host .mc-calendar__body-cell-content{border:none}mc-month-view .mc-calendar__body-cell-content{justify-content:flex-end}mc-multi-year-view .mc-calendar__body-cell-content,mc-year-view .mc-calendar__body-cell-content{justify-content:center}.cdk-high-contrast-active .mc-datepicker__popup:not(:empty),.cdk-high-contrast-active .mc-selected{outline:1px solid}.cdk-high-contrast-active .mc-calendar__body-today{outline:1px dotted}.cdk-high-contrast-active :host .mc-datepicker__popup:not(:empty),.cdk-high-contrast-active :host .mc-selected{outline:1px solid}.cdk-high-contrast-active :host .mc-calendar__body-today{outline:1px dotted}[dir=rtl] .mc-calendar__body-label{text-align:right}"]
                }] }
    ];
    /** @nocollapse */
    McCalendarBody.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: i0.NgZone }
    ]; };
    McCalendarBody.propDecorators = {
        label: [{ type: i0.Input }],
        rows: [{ type: i0.Input }],
        todayValue: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        labelMinRequiredCells: [{ type: i0.Input }],
        numCols: [{ type: i0.Input }],
        activeCell: [{ type: i0.Input }],
        cellAspectRatio: [{ type: i0.Input }],
        selectedValueChange: [{ type: i0.Output }]
    };
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DAYS_PER_WEEK = 7;
    /**
     * An internal component used to display a single month in the datepicker.
     * \@docs-private
     * @template D
     */
    var McMonthView = /** @class */ (function () {
        /**
         * @param {?} changeDetectorRef
         * @param {?} dateFormats
         * @param {?} dateAdapter
         * @param {?=} dir
         */
        function McMonthView(changeDetectorRef, dateFormats, dateAdapter, dir) {
            this.changeDetectorRef = changeDetectorRef;
            this.dateFormats = dateFormats;
            this.dateAdapter = dateAdapter;
            this.dir = dir;
            /**
             * Emits when a new date is selected.
             */
            this.selectedChange = new i0.EventEmitter();
            /**
             * Emits when any date is selected.
             */
            this.userSelection = new i0.EventEmitter();
            /**
             * Emits when any date is activated.
             */
            this.activeDateChange = new i0.EventEmitter();
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
            var weekdays = longWeekdays.map(( /**
             * @param {?} long
             * @param {?} i
             * @return {?}
             */function (long, i) {
                return { long: long, narrow: narrowWeekdays[i] };
            }));
            this.weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
            this._activeDate = this.dateAdapter.today();
        }
        Object.defineProperty(McMonthView.prototype, "activeDate", {
            /**
             * The date to display in this month view (everything other than the month and year is ignored).
             * @return {?}
             */
            get: function () {
                return this._activeDate;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                /** @type {?} */
                var oldActiveDate = this._activeDate;
                /** @type {?} */
                var validDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value)) || this.dateAdapter.today();
                this._activeDate = this.dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
                if (!this.hasSameMonthAndYear(oldActiveDate, this._activeDate)) {
                    this.init();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McMonthView.prototype, "selected", {
            /**
             * The currently selected date.
             * @return {?}
             */
            get: function () {
                return this._selected;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._selected = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
                this.selectedDate = this.getDateInCurrentMonth(this._selected);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McMonthView.prototype, "minDate", {
            /**
             * The minimum selectable date.
             * @return {?}
             */
            get: function () {
                return this._minDate;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._minDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McMonthView.prototype, "maxDate", {
            /**
             * The maximum selectable date.
             * @return {?}
             */
            get: function () {
                return this._maxDate;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._maxDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @return {?}
         */
        McMonthView.prototype.ngAfterContentInit = function () {
            this.init();
        };
        /**
         * Handles when a new date is selected.
         * @param {?} date
         * @return {?}
         */
        McMonthView.prototype.dateSelected = function (date) {
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
        /**
         * Handles keydown events on the calendar body when calendar is in month view.
         * @param {?} event
         * @return {?}
         */
        McMonthView.prototype.handleCalendarBodyKeydown = function (event) {
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
                case keycodes.LEFT_ARROW:
                    this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, isRtl ? 1 : -1);
                    break;
                case keycodes.RIGHT_ARROW:
                    this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, isRtl ? -1 : 1);
                    break;
                case keycodes.UP_ARROW:
                    this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, -7);
                    break;
                case keycodes.DOWN_ARROW:
                    this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, 7);
                    break;
                case keycodes.HOME:
                    this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, 1 - this.dateAdapter.getDate(this._activeDate));
                    break;
                case keycodes.END:
                    this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, (this.dateAdapter.getNumDaysInMonth(this._activeDate) -
                        this.dateAdapter.getDate(this._activeDate)));
                    break;
                case keycodes.PAGE_UP:
                    this.activeDate = event.altKey ?
                        this.dateAdapter.addCalendarYears(this._activeDate, -1) :
                        this.dateAdapter.addCalendarMonths(this._activeDate, -1);
                    break;
                case keycodes.PAGE_DOWN:
                    this.activeDate = event.altKey ?
                        this.dateAdapter.addCalendarYears(this._activeDate, 1) :
                        this.dateAdapter.addCalendarMonths(this._activeDate, 1);
                    break;
                case keycodes.ENTER:
                case keycodes.SPACE:
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
        /**
         * Initializes this month view.
         * @return {?}
         */
        McMonthView.prototype.init = function () {
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
        /**
         * Focuses the active cell after the microtask queue is empty.
         * @return {?}
         */
        McMonthView.prototype.focusActiveCell = function () {
            this.mcCalendarBody.focusActiveCell();
        };
        /**
         * Creates McCalendarCells for the dates in this month.
         * @private
         * @return {?}
         */
        McMonthView.prototype.createWeekCells = function () {
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
        /**
         * Date filter for the month
         * @private
         * @param {?} date
         * @return {?}
         */
        McMonthView.prototype.shouldEnableDate = function (date) {
            return !!date &&
                (!this.dateFilter || this.dateFilter(date)) &&
                (!this.minDate || this.dateAdapter.compareDate(date, this.minDate) >= 0) &&
                (!this.maxDate || this.dateAdapter.compareDate(date, this.maxDate) <= 0);
        };
        /**
         * Gets the date in this month that the given Date falls on.
         * Returns null if the given Date is in another month.
         * @private
         * @param {?} date
         * @return {?}
         */
        McMonthView.prototype.getDateInCurrentMonth = function (date) {
            return date && this.hasSameMonthAndYear(date, this.activeDate) ?
                this.dateAdapter.getDate(date) : null;
        };
        /**
         * Checks whether the 2 dates are non-null and fall within the same month of the same year.
         * @private
         * @param {?} d1
         * @param {?} d2
         * @return {?}
         */
        McMonthView.prototype.hasSameMonthAndYear = function (d1, d2) {
            return !!(d1 && d2 && this.dateAdapter.getMonth(d1) === this.dateAdapter.getMonth(d2) &&
                this.dateAdapter.getYear(d1) === this.dateAdapter.getYear(d2));
        };
        /**
         * @private
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        McMonthView.prototype.getValidDateOrNull = function (obj) {
            return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
        };
        /**
         * Determines whether the user has the RTL layout direction.
         * @private
         * @return {?}
         */
        McMonthView.prototype.isRtl = function () {
            return this.dir && this.dir.value === 'rtl';
        };
        return McMonthView;
    }());
    McMonthView.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mc-month-view',
                    exportAs: 'mcMonthView',
                    template: "<table class=\"mc-calendar__table\">\n    <thead class=\"mc-calendar__table-header\">\n    <tr>\n        <th *ngFor=\"let day of weekdays\" [attr.aria-label]=\"day.long\">{{day.narrow}}</th>\n    </tr>\n    <tr>\n        <th class=\"mc-calendar__table-header-divider\" colspan=\"7\" aria-hidden=\"true\"></th>\n    </tr>\n    </thead>\n    <tbody mc-calendar-body\n           [label]=\"monthLabel\"\n           [rows]=\"weeks\"\n           [todayValue]=\"todayDate\"\n           [selectedValue]=\"selectedDate\"\n           [labelMinRequiredCells]=\"3\"\n           [activeCell]=\"dateAdapter.getDate(activeDate) - 1\"\n           (selectedValueChange)=\"dateSelected($event)\"\n           (keydown)=\"handleCalendarBodyKeydown($event)\">\n    </tbody>\n</table>\n",
                    encapsulation: i0.ViewEncapsulation.None,
                    changeDetection: i0.ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    McMonthView.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: undefined, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [datetime.MC_DATE_FORMATS,] }] },
        { type: datetime.DateAdapter, decorators: [{ type: i0.Optional }] },
        { type: bidi.Directionality, decorators: [{ type: i0.Optional }] }
    ]; };
    McMonthView.propDecorators = {
        activeDate: [{ type: i0.Input }],
        selected: [{ type: i0.Input }],
        minDate: [{ type: i0.Input }],
        maxDate: [{ type: i0.Input }],
        dateFilter: [{ type: i0.Input }],
        dateClass: [{ type: i0.Input }],
        selectedChange: [{ type: i0.Output }],
        userSelection: [{ type: i0.Output }],
        activeDateChange: [{ type: i0.Output }],
        mcCalendarBody: [{ type: i0.ViewChild, args: [McCalendarBody, { static: false },] }]
    };
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        /**
         * @param {?} changeDetectorRef
         * @param {?} dateAdapter
         * @param {?=} dir
         */
        function McMultiYearView(changeDetectorRef, dateAdapter, dir) {
            this.changeDetectorRef = changeDetectorRef;
            this.dateAdapter = dateAdapter;
            this.dir = dir;
            /**
             * Emits when a new year is selected.
             */
            this.selectedChange = new i0.EventEmitter();
            /**
             * Emits the selected year. This doesn't imply a change on the selected date
             */
            this.yearSelected = new i0.EventEmitter();
            /**
             * Emits when any date is activated.
             */
            this.activeDateChange = new i0.EventEmitter();
            if (!this.dateAdapter) {
                throw createMissingDateImplError('DateAdapter');
            }
            this._activeDate = this.dateAdapter.today();
        }
        Object.defineProperty(McMultiYearView.prototype, "activeDate", {
            /**
             * The date to display in this multi-year view (everything other than the year is ignored).
             * @return {?}
             */
            get: function () {
                return this._activeDate;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
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
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McMultiYearView.prototype, "selected", {
            /**
             * The currently selected date.
             * @return {?}
             */
            get: function () {
                return this._selected;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._selected = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
                this.selectedYear = this._selected && this.dateAdapter.getYear(this._selected);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McMultiYearView.prototype, "minDate", {
            /**
             * The minimum selectable date.
             * @return {?}
             */
            get: function () {
                return this._minDate;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._minDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McMultiYearView.prototype, "maxDate", {
            /**
             * The maximum selectable date.
             * @return {?}
             */
            get: function () {
                return this._maxDate;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._maxDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @return {?}
         */
        McMultiYearView.prototype.ngAfterContentInit = function () {
            this.init();
        };
        /**
         * Initializes this multi-year view.
         * @return {?}
         */
        McMultiYearView.prototype.init = function () {
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
                    this.years.push(row.map(( /**
                     * @param {?} year
                     * @return {?}
                     */function (year) { return _this.createCellForYear(year); })));
                    row = [];
                }
            }
            this.changeDetectorRef.markForCheck();
        };
        /**
         * Handles when a new year is selected.
         * @param {?} year
         * @return {?}
         */
        McMultiYearView.prototype.onYearSelected = function (year) {
            this.yearSelected.emit(this.dateAdapter.createDate(year, 0, 1));
            /** @type {?} */
            var month = this.dateAdapter.getMonth(this.activeDate);
            /** @type {?} */
            var daysInMonth = this.dateAdapter.getNumDaysInMonth(this.dateAdapter.createDate(year, month, 1));
            this.selectedChange.emit(this.dateAdapter.createDate(year, month, Math.min(this.dateAdapter.getDate(this.activeDate), daysInMonth)));
        };
        /**
         * Handles keydown events on the calendar body when calendar is in multi-year view.
         * @param {?} event
         * @return {?}
         */
        McMultiYearView.prototype.handleCalendarBodyKeydown = function (event) {
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
                case keycodes.LEFT_ARROW:
                    this.activeDate = this.dateAdapter.addCalendarYears(this._activeDate, isRtl ? 1 : -1);
                    break;
                case keycodes.RIGHT_ARROW:
                    this.activeDate = this.dateAdapter.addCalendarYears(this._activeDate, isRtl ? -1 : 1);
                    break;
                case keycodes.UP_ARROW:
                    this.activeDate = this.dateAdapter.addCalendarYears(this._activeDate, -yearsPerRow);
                    break;
                case keycodes.DOWN_ARROW:
                    this.activeDate = this.dateAdapter.addCalendarYears(this._activeDate, yearsPerRow);
                    break;
                case keycodes.HOME:
                    this.activeDate = this.dateAdapter.addCalendarYears(this._activeDate, -this.dateAdapter.getYear(this._activeDate) % yearsPerPage);
                    break;
                case keycodes.END:
                    this.activeDate = this.dateAdapter.addCalendarYears(this._activeDate, yearsPerPage - this.dateAdapter.getYear(this._activeDate) % yearsPerPage - 1);
                    break;
                case keycodes.PAGE_UP:
                    this.activeDate =
                        this.dateAdapter.addCalendarYears(this._activeDate, event.altKey ? -yearsPerPage * 10 : -yearsPerPage);
                    break;
                case keycodes.PAGE_DOWN:
                    this.activeDate =
                        this.dateAdapter.addCalendarYears(this._activeDate, event.altKey ? yearsPerPage * 10 : yearsPerPage);
                    break;
                case keycodes.ENTER:
                case keycodes.SPACE:
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
        McMultiYearView.prototype.getActiveCell = function () {
            return this.dateAdapter.getYear(this.activeDate) % yearsPerPage;
        };
        /**
         * Focuses the active cell after the microtask queue is empty.
         * @return {?}
         */
        McMultiYearView.prototype.focusActiveCell = function () {
            this.mcCalendarBody.focusActiveCell();
        };
        /**
         * Creates an McCalendarCell for the given year.
         * @private
         * @param {?} year
         * @return {?}
         */
        McMultiYearView.prototype.createCellForYear = function (year) {
            /** @type {?} */
            var yearName = this.dateAdapter.getYearName(this.dateAdapter.createDate(year, 0, 1));
            return new McCalendarCell(year, yearName, yearName, this.shouldEnableYear(year));
        };
        /**
         * Whether the given year is enabled.
         * @private
         * @param {?} year
         * @return {?}
         */
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
         * @private
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        McMultiYearView.prototype.getValidDateOrNull = function (obj) {
            return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
        };
        /**
         * Determines whether the user has the RTL layout direction.
         * @private
         * @return {?}
         */
        McMultiYearView.prototype.isRtl = function () {
            return this.dir && this.dir.value === 'rtl';
        };
        return McMultiYearView;
    }());
    McMultiYearView.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mc-multi-year-view',
                    exportAs: 'mcMultiYearView',
                    template: "<table class=\"mc-calendar__table\">\n    <thead class=\"mc-calendar__table-header\">\n    <tr>\n        <th class=\"mc-calendar__table-header-divider\" colspan=\"4\"></th>\n    </tr>\n    </thead>\n    <tbody mc-calendar-body\n           [rows]=\"years\"\n           [todayValue]=\"todayYear\"\n           [selectedValue]=\"selectedYear\"\n           [numCols]=\"4\"\n           [cellAspectRatio]=\"4 / 7\"\n           [activeCell]=\"getActiveCell()\"\n           (selectedValueChange)=\"onYearSelected($event)\"\n           (keydown)=\"handleCalendarBodyKeydown($event)\">\n    </tbody>\n</table>\n",
                    encapsulation: i0.ViewEncapsulation.None,
                    changeDetection: i0.ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    McMultiYearView.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: datetime.DateAdapter, decorators: [{ type: i0.Optional }] },
        { type: bidi.Directionality, decorators: [{ type: i0.Optional }] }
    ]; };
    McMultiYearView.propDecorators = {
        activeDate: [{ type: i0.Input }],
        selected: [{ type: i0.Input }],
        minDate: [{ type: i0.Input }],
        maxDate: [{ type: i0.Input }],
        dateFilter: [{ type: i0.Input }],
        selectedChange: [{ type: i0.Output }],
        yearSelected: [{ type: i0.Output }],
        activeDateChange: [{ type: i0.Output }],
        mcCalendarBody: [{ type: i0.ViewChild, args: [McCalendarBody, { static: false },] }]
    };
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * An internal component used to display a single year in the datepicker.
     * \@docs-private
     * @template D
     */
    var McYearView = /** @class */ (function () {
        /**
         * @param {?} changeDetectorRef
         * @param {?} dateFormats
         * @param {?} dateAdapter
         * @param {?=} dir
         */
        function McYearView(changeDetectorRef, dateFormats, dateAdapter, dir) {
            this.changeDetectorRef = changeDetectorRef;
            this.dateFormats = dateFormats;
            this.dateAdapter = dateAdapter;
            this.dir = dir;
            /**
             * Emits when a new month is selected.
             */
            this.selectedChange = new i0.EventEmitter();
            /**
             * Emits the selected month. This doesn't imply a change on the selected date
             */
            this.monthSelected = new i0.EventEmitter();
            /**
             * Emits when any date is activated.
             */
            this.activeDateChange = new i0.EventEmitter();
            if (!this.dateAdapter) {
                throw createMissingDateImplError('DateAdapter');
            }
            if (!this.dateFormats) {
                throw createMissingDateImplError('MC_DATE_FORMATS');
            }
            this._activeDate = this.dateAdapter.today();
        }
        Object.defineProperty(McYearView.prototype, "activeDate", {
            /**
             * The date to display in this year view (everything other than the year is ignored).
             * @return {?}
             */
            get: function () {
                return this._activeDate;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                /** @type {?} */
                var oldActiveDate = this._activeDate;
                /** @type {?} */
                var validDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value)) || this.dateAdapter.today();
                this._activeDate = this.dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
                if (this.dateAdapter.getYear(oldActiveDate) !== this.dateAdapter.getYear(this._activeDate)) {
                    this.init();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McYearView.prototype, "selected", {
            /**
             * The currently selected date.
             * @return {?}
             */
            get: function () {
                return this._selected;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._selected = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
                this.selectedMonth = this.getMonthInCurrentYear(this._selected);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McYearView.prototype, "minDate", {
            /**
             * The minimum selectable date.
             * @return {?}
             */
            get: function () {
                return this._minDate;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._minDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McYearView.prototype, "maxDate", {
            /**
             * The maximum selectable date.
             * @return {?}
             */
            get: function () {
                return this._maxDate;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._maxDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @return {?}
         */
        McYearView.prototype.ngAfterContentInit = function () {
            this.init();
        };
        /**
         * Handles when a new month is selected.
         * @param {?} month
         * @return {?}
         */
        McYearView.prototype.onMonthSelected = function (month) {
            /** @type {?} */
            var normalizedDate = this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), month, 1);
            this.monthSelected.emit(normalizedDate);
            /** @type {?} */
            var daysInMonth = this.dateAdapter.getNumDaysInMonth(normalizedDate);
            this.selectedChange.emit(this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), month, Math.min(this.dateAdapter.getDate(this.activeDate), daysInMonth)));
        };
        /**
         * Handles keydown events on the calendar body when calendar is in year view.
         * @param {?} event
         * @return {?}
         */
        McYearView.prototype.handleCalendarBodyKeydown = function (event) {
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
                case keycodes.LEFT_ARROW:
                    this.activeDate = this.dateAdapter.addCalendarMonths(this._activeDate, isRtl ? 1 : -1);
                    break;
                case keycodes.RIGHT_ARROW:
                    this.activeDate = this.dateAdapter.addCalendarMonths(this._activeDate, isRtl ? -1 : 1);
                    break;
                case keycodes.UP_ARROW:
                    this.activeDate = this.dateAdapter.addCalendarMonths(this._activeDate, -VERTICAL_SHIFT);
                    break;
                case keycodes.DOWN_ARROW:
                    this.activeDate = this.dateAdapter.addCalendarMonths(this._activeDate, VERTICAL_SHIFT);
                    break;
                case keycodes.HOME:
                    this.activeDate = this.dateAdapter.addCalendarMonths(this._activeDate, -this.dateAdapter.getMonth(this._activeDate));
                    break;
                case keycodes.END:
                    this.activeDate = this.dateAdapter.addCalendarMonths(this._activeDate, MAX_MONTH_INDEX - this.dateAdapter.getMonth(this._activeDate));
                    break;
                case keycodes.PAGE_UP:
                    this.activeDate =
                        this.dateAdapter.addCalendarYears(this._activeDate, event.altKey ? -PAGE_SHIFT : -1);
                    break;
                case keycodes.PAGE_DOWN:
                    this.activeDate =
                        this.dateAdapter.addCalendarYears(this._activeDate, event.altKey ? PAGE_SHIFT : 1);
                    break;
                case keycodes.ENTER:
                case keycodes.SPACE:
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
        /**
         * Initializes this year view.
         * @return {?}
         */
        McYearView.prototype.init = function () {
            var _this = this;
            this.selectedMonth = this.getMonthInCurrentYear(this.selected);
            this.todayMonth = this.getMonthInCurrentYear(this.dateAdapter.today());
            this.yearLabel = this.dateAdapter.getYearName(this.activeDate);
            /** @type {?} */
            var monthNames = this.dateAdapter.getMonthNames('short');
            // First row of months only contains 5 elements so we can fit the year label on the same row.
            // tslint:disable-next-line:no-magic-numbers
            this.months = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]].map(( /**
             * @param {?} row
             * @return {?}
             */function (row) { return row.map(( /**
             * @param {?} month
             * @return {?}
             */function (month) { return _this.createCellForMonth(month, monthNames[month]); })); }));
            this.changeDetectorRef.markForCheck();
        };
        /**
         * Focuses the active cell after the microtask queue is empty.
         * @return {?}
         */
        McYearView.prototype.focusActiveCell = function () {
            this.mcCalendarBody.focusActiveCell();
        };
        /**
         * Gets the month in this year that the given Date falls on.
         * Returns null if the given Date is in another year.
         * @private
         * @param {?} date
         * @return {?}
         */
        McYearView.prototype.getMonthInCurrentYear = function (date) {
            return date && this.dateAdapter.getYear(date) === this.dateAdapter.getYear(this.activeDate) ?
                this.dateAdapter.getMonth(date) : null;
        };
        /**
         * Creates an McCalendarCell for the given month.
         * @private
         * @param {?} month
         * @param {?} monthName
         * @return {?}
         */
        McYearView.prototype.createCellForMonth = function (month, monthName) {
            /** @type {?} */
            var ariaLabel = this.dateAdapter.format(this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), month, 1), this.dateFormats.display.monthYearA11yLabel);
            /** @type {?} */
            var newMonthName = monthName[0].toLocaleUpperCase() + monthName.substr(1);
            return new McCalendarCell(month, newMonthName, ariaLabel, this.shouldEnableMonth(month));
        };
        /**
         * Whether the given month is enabled.
         * @private
         * @param {?} month
         * @return {?}
         */
        McYearView.prototype.shouldEnableMonth = function (month) {
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
         * @private
         * @param {?} year
         * @param {?} month
         * @return {?}
         */
        McYearView.prototype.isYearAndMonthAfterMaxDate = function (year, month) {
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
         * @private
         * @param {?} year
         * @param {?} month
         * @return {?}
         */
        McYearView.prototype.isYearAndMonthBeforeMinDate = function (year, month) {
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
         * @private
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        McYearView.prototype.getValidDateOrNull = function (obj) {
            return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
        };
        /**
         * Determines whether the user has the RTL layout direction.
         * @private
         * @return {?}
         */
        McYearView.prototype.isRtl = function () {
            return this.dir && this.dir.value === 'rtl';
        };
        return McYearView;
    }());
    McYearView.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mc-year-view',
                    exportAs: 'mcYearView',
                    template: "<table class=\"mc-calendar__table\">\n    <thead class=\"mc-calendar__table-header\">\n    <tr>\n        <th class=\"mc-calendar__table-header-divider\" colspan=\"4\"></th>\n    </tr>\n    </thead>\n    <tbody mc-calendar-body\n           [label]=\"yearLabel\"\n           [rows]=\"months\"\n           [todayValue]=\"todayMonth\"\n           [selectedValue]=\"selectedMonth\"\n           [labelMinRequiredCells]=\"2\"\n           [numCols]=\"4\"\n           [cellAspectRatio]=\"4 / 7\"\n           [activeCell]=\"dateAdapter.getMonth(activeDate)\"\n           (selectedValueChange)=\"onMonthSelected($event)\"\n           (keydown)=\"handleCalendarBodyKeydown($event)\">\n    </tbody>\n</table>\n",
                    encapsulation: i0.ViewEncapsulation.None,
                    changeDetection: i0.ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    McYearView.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: undefined, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [datetime.MC_DATE_FORMATS,] }] },
        { type: datetime.DateAdapter, decorators: [{ type: i0.Optional }] },
        { type: bidi.Directionality, decorators: [{ type: i0.Optional }] }
    ]; };
    McYearView.propDecorators = {
        activeDate: [{ type: i0.Input }],
        selected: [{ type: i0.Input }],
        minDate: [{ type: i0.Input }],
        maxDate: [{ type: i0.Input }],
        dateFilter: [{ type: i0.Input }],
        selectedChange: [{ type: i0.Output }],
        monthSelected: [{ type: i0.Output }],
        activeDateChange: [{ type: i0.Output }],
        mcCalendarBody: [{ type: i0.ViewChild, args: [McCalendarBody, { static: false },] }]
    };
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Default header for McCalendar
     * @template D
     */
    var McCalendarHeader = /** @class */ (function () {
        /**
         * @param {?} intl
         * @param {?} calendar
         * @param {?} dateAdapter
         * @param {?} dateFormats
         * @param {?} changeDetectorRef
         */
        function McCalendarHeader(intl, calendar, dateAdapter, dateFormats, changeDetectorRef) {
            this.intl = intl;
            this.calendar = calendar;
            this.dateAdapter = dateAdapter;
            this.dateFormats = dateFormats;
            this.calendar.stateChanges.subscribe(( /**
             * @return {?}
             */function () { return changeDetectorRef.markForCheck(); }));
        }
        Object.defineProperty(McCalendarHeader.prototype, "periodButtonText", {
            /**
             * The label for the current calendar view.
             * @return {?}
             */
            get: function () {
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
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McCalendarHeader.prototype, "periodButtonLabel", {
            /**
             * @return {?}
             */
            get: function () {
                return this.calendar.currentView === 'month' ?
                    this.intl.switchToMultiYearViewLabel : this.intl.switchToMonthViewLabel;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McCalendarHeader.prototype, "prevButtonLabel", {
            /**
             * The label for the previous button.
             * @return {?}
             */
            get: function () {
                return {
                    month: this.intl.prevMonthLabel,
                    year: this.intl.prevYearLabel,
                    'multi-year': this.intl.prevMultiYearLabel
                }[this.calendar.currentView];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McCalendarHeader.prototype, "nextButtonLabel", {
            /**
             * The label for the next button.
             * @return {?}
             */
            get: function () {
                return {
                    month: this.intl.nextMonthLabel,
                    year: this.intl.nextYearLabel,
                    'multi-year': this.intl.nextMultiYearLabel
                }[this.calendar.currentView];
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Handles user clicks on the period label.
         * @return {?}
         */
        McCalendarHeader.prototype.currentPeriodClicked = function () {
            this.calendar.currentView = this.calendar.currentView === 'month' ? 'multi-year' : 'month';
        };
        /**
         * Handles user clicks on the previous button.
         * @return {?}
         */
        McCalendarHeader.prototype.previousClicked = function () {
            this.calendar.activeDate = this.calendar.currentView === 'month' ?
                this.dateAdapter.addCalendarMonths(this.calendar.activeDate, -1) :
                this.dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView === 'year' ? -1 : -yearsPerPage);
        };
        /**
         * Handles user clicks on the next button.
         * @return {?}
         */
        McCalendarHeader.prototype.nextClicked = function () {
            this.calendar.activeDate = this.calendar.currentView === 'month' ?
                this.dateAdapter.addCalendarMonths(this.calendar.activeDate, 1) :
                this.dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView === 'year' ? 1 : yearsPerPage);
        };
        /**
         * Whether the previous period button is enabled.
         * @return {?}
         */
        McCalendarHeader.prototype.previousEnabled = function () {
            if (!this.calendar.minDate) {
                return true;
            }
            return !this.calendar.minDate ||
                !this.isSameView(this.calendar.activeDate, this.calendar.minDate);
        };
        /**
         * Whether the next period button is enabled.
         * @return {?}
         */
        McCalendarHeader.prototype.nextEnabled = function () {
            return !this.calendar.maxDate ||
                !this.isSameView(this.calendar.activeDate, this.calendar.maxDate);
        };
        /**
         * Whether the two dates represent the same view in the current view mode (month or year).
         * @private
         * @param {?} date1
         * @param {?} date2
         * @return {?}
         */
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
        return McCalendarHeader;
    }());
    McCalendarHeader.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mc-calendar-header',
                    template: "<div class=\"mc-calendar__header\">\n    <div class=\"mc-calendar__controls\">\n        <button mc-button type=\"button\" class=\"mc-calendar__period-button\"\n                (click)=\"currentPeriodClicked()\" [attr.aria-label]=\"periodButtonLabel\">\n            {{periodButtonText}}\n            <i class=\"mc mc-icon\"\n               [class.mc-angle-up-M_16]=\"calendar.currentView !== 'month'\"\n               [class.mc-angle-down-M_16]=\"calendar.currentView === 'month'\"></i>\n        </button>\n\n        <div class=\"mc-calendar-spacer\"></div>\n\n        <ng-content></ng-content>\n\n        <button mc-button type=\"button\" class=\"mc-calendar__previous-button\"\n                [disabled]=\"!previousEnabled()\" (click)=\"previousClicked()\"\n                [attr.aria-label]=\"prevButtonLabel\">\n            <i mc-icon=\"mc-angle-left-L_16\"></i>\n        </button>\n\n        <button mc-button type=\"button\" class=\"mc-calendar__next-button\"\n                [disabled]=\"!nextEnabled()\" (click)=\"nextClicked()\"\n                [attr.aria-label]=\"nextButtonLabel\">\n            <i mc-icon=\"mc-angle-right-L_16\"></i>\n        </button>\n    </div>\n</div>\n",
                    exportAs: 'mcCalendarHeader',
                    encapsulation: i0.ViewEncapsulation.None,
                    changeDetection: i0.ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    McCalendarHeader.ctorParameters = function () { return [
        { type: McDatepickerIntl },
        { type: McCalendar, decorators: [{ type: i0.Inject, args: [i0.forwardRef(( /**
                                         * @return {?}
                                         */function () { return McCalendar; })),] }] },
        { type: datetime.DateAdapter, decorators: [{ type: i0.Optional }] },
        { type: undefined, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [datetime.MC_DATE_FORMATS,] }] },
        { type: i0.ChangeDetectorRef }
    ]; };
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
        /**
         * @param {?} intl
         * @param {?} dateAdapter
         * @param {?} dateFormats
         * @param {?} changeDetectorRef
         */
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
            this.selectedChange = new i0.EventEmitter();
            /**
             * Emits the year chosen in multiyear view.
             * This doesn't imply a change on the selected date.
             */
            this.yearSelected = new i0.EventEmitter();
            /**
             * Emits the month chosen in year view.
             * This doesn't imply a change on the selected date.
             */
            this.monthSelected = new i0.EventEmitter();
            /**
             * Emits when any date is selected.
             */
            this.userSelection = new i0.EventEmitter();
            /**
             * Emits whenever there is a state change that the header may need to respond to.
             */
            this.stateChanges = new rxjs.Subject();
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
            this.intlChanges = intl.changes.subscribe(( /**
             * @return {?}
             */function () {
                changeDetectorRef.markForCheck();
                _this.stateChanges.next();
            }));
        }
        Object.defineProperty(McCalendar.prototype, "startAt", {
            /**
             * A date representing the period (month or year) to start the calendar in.
             * @return {?}
             */
            get: function () {
                return this._startAt;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._startAt = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McCalendar.prototype, "selected", {
            /**
             * The currently selected date.
             * @return {?}
             */
            get: function () {
                return this._selected;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._selected = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McCalendar.prototype, "minDate", {
            /**
             * The minimum selectable date.
             * @return {?}
             */
            get: function () {
                return this._minDate;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._minDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McCalendar.prototype, "maxDate", {
            /**
             * The maximum selectable date.
             * @return {?}
             */
            get: function () {
                return this._maxDate;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._maxDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McCalendar.prototype, "activeDate", {
            /**
             * The current active date. This determines which time period is shown and which date is
             * highlighted when using keyboard navigation.
             * @return {?}
             */
            get: function () {
                return this.clampedActiveDate;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this.clampedActiveDate = this.dateAdapter.clampDate(value, this.minDate, this.maxDate);
                this.stateChanges.next();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McCalendar.prototype, "currentView", {
            /**
             * Whether the calendar is in month view.
             * @return {?}
             */
            get: function () {
                return this._currentView;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._currentView = value;
                this.moveFocusOnNextTick = true;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @return {?}
         */
        McCalendar.prototype.ngAfterContentInit = function () {
            this.calendarHeaderPortal = new portal.ComponentPortal(this.headerComponent || McCalendarHeader);
            this.activeDate = this.startAt || this.dateAdapter.today();
            // Assign to the private property since we don't want to move focus on init.
            this._currentView = this.startView;
        };
        /**
         * @return {?}
         */
        McCalendar.prototype.ngAfterViewChecked = function () {
            if (this.moveFocusOnNextTick) {
                this.moveFocusOnNextTick = false;
                this.focusActiveCell();
            }
        };
        /**
         * @return {?}
         */
        McCalendar.prototype.ngOnDestroy = function () {
            this.intlChanges.unsubscribe();
            this.stateChanges.complete();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        McCalendar.prototype.ngOnChanges = function (changes) {
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
        McCalendar.prototype.focusActiveCell = function () {
            this.getCurrentViewComponent().focusActiveCell();
        };
        /**
         * Updates today's date after an update of the active date
         * @return {?}
         */
        McCalendar.prototype.updateTodaysDate = function () {
            /** @type {?} */
            var view = this.currentView === 'month' ? this.monthView :
                (this.currentView === 'year' ? this.yearView : this.multiYearView);
            view.ngAfterContentInit();
        };
        /**
         * Handles date selection in the month view.
         * @param {?} date
         * @return {?}
         */
        McCalendar.prototype.dateSelected = function (date) {
            if (!this.dateAdapter.sameDate(date, this.selected)) {
                this.selectedChange.emit(date);
            }
        };
        /**
         * Handles year selection in the multiyear view.
         * @param {?} normalizedYear
         * @return {?}
         */
        McCalendar.prototype.yearSelectedInMultiYearView = function (normalizedYear) {
            this.yearSelected.emit(normalizedYear);
        };
        /**
         * Handles month selection in the year view.
         * @param {?} normalizedMonth
         * @return {?}
         */
        McCalendar.prototype.monthSelectedInYearView = function (normalizedMonth) {
            this.monthSelected.emit(normalizedMonth);
        };
        /**
         * @return {?}
         */
        McCalendar.prototype.userSelected = function () {
            this.userSelection.emit();
        };
        /**
         * Handles year/month selection in the multi-year/year views.
         * @param {?} date
         * @param {?} view
         * @return {?}
         */
        McCalendar.prototype.goToDateInView = function (date, view) {
            this.activeDate = date;
            this.currentView = view;
        };
        /**
         * @private
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        McCalendar.prototype.getValidDateOrNull = function (obj) {
            return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
        };
        /**
         * Returns the component instance that corresponds to the current calendar view.
         * @private
         * @return {?}
         */
        McCalendar.prototype.getCurrentViewComponent = function () {
            return this.monthView || this.yearView || this.multiYearView;
        };
        return McCalendar;
    }());
    McCalendar.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mc-calendar',
                    exportAs: 'mcCalendar',
                    template: "<ng-template [cdkPortalOutlet]=\"calendarHeaderPortal\"></ng-template>\n\n<div class=\"mc-calendar__content\" [ngSwitch]=\"currentView\" cdkMonitorSubtreeFocus tabindex=\"-1\">\n    <mc-month-view\n        *ngSwitchCase=\"'month'\"\n        [(activeDate)]=\"activeDate\"\n        [selected]=\"selected\"\n        [dateFilter]=\"dateFilter\"\n        [maxDate]=\"maxDate\"\n        [minDate]=\"minDate\"\n        [dateClass]=\"dateClass\"\n        (selectedChange)=\"dateSelected($event)\"\n        (userSelection)=\"userSelected()\">\n    </mc-month-view>\n\n    <mc-year-view\n        *ngSwitchCase=\"'year'\"\n        [(activeDate)]=\"activeDate\"\n        [selected]=\"selected\"\n        [dateFilter]=\"dateFilter\"\n        [maxDate]=\"maxDate\"\n        [minDate]=\"minDate\"\n        (monthSelected)=\"monthSelectedInYearView($event)\"\n        (selectedChange)=\"goToDateInView($event, 'month')\">\n    </mc-year-view>\n\n    <mc-multi-year-view\n        *ngSwitchCase=\"'multi-year'\"\n        [(activeDate)]=\"activeDate\"\n        [selected]=\"selected\"\n        [dateFilter]=\"dateFilter\"\n        [maxDate]=\"maxDate\"\n        [minDate]=\"minDate\"\n        (yearSelected)=\"yearSelectedInMultiYearView($event)\"\n        (selectedChange)=\"goToDateInView($event, 'year')\">\n    </mc-multi-year-view>\n</div>\n",
                    host: {
                        class: 'mc-calendar'
                    },
                    encapsulation: i0.ViewEncapsulation.None,
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".mc-calendar{display:block}.mc-calendar__header{padding:8px 8px 0}.mc-calendar__content{outline:none;padding:0 8px 8px}.mc-calendar__controls{display:flex;margin:5% calc(4.71429% - 16px)}.mc-calendar-spacer{flex:1 1 auto}.mc-calendar__period-button{min-width:0}.mc-calendar__previous-button:after{border-left-width:2px;transform:translateX(2px) rotate(-45deg)}.mc-calendar__next-button:after{border-right-width:2px;transform:translateX(-2px) rotate(45deg)}.mc-calendar__table{border-collapse:collapse;border-spacing:0;width:100%}.mc-calendar__table-header th{padding:0 0 8px;text-align:center}.mc-calendar__table-header-divider{height:1px;position:relative}.mc-calendar__table-header-divider:after{content:\"\";height:1px;left:-8px;position:absolute;right:-8px;top:0}"]
                }] }
    ];
    /** @nocollapse */
    McCalendar.ctorParameters = function () { return [
        { type: McDatepickerIntl },
        { type: datetime.DateAdapter, decorators: [{ type: i0.Optional }] },
        { type: undefined, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [datetime.MC_DATE_FORMATS,] }] },
        { type: i0.ChangeDetectorRef }
    ]; };
    McCalendar.propDecorators = {
        startAt: [{ type: i0.Input }],
        selected: [{ type: i0.Input }],
        minDate: [{ type: i0.Input }],
        maxDate: [{ type: i0.Input }],
        headerComponent: [{ type: i0.Input }],
        startView: [{ type: i0.Input }],
        dateFilter: [{ type: i0.Input }],
        dateClass: [{ type: i0.Input }],
        selectedChange: [{ type: i0.Output }],
        yearSelected: [{ type: i0.Output }],
        monthSelected: [{ type: i0.Output }],
        userSelection: [{ type: i0.Output }],
        monthView: [{ type: i0.ViewChild, args: [McMonthView, { static: false },] }],
        yearView: [{ type: i0.ViewChild, args: [McYearView, { static: false },] }],
        multiYearView: [{ type: i0.ViewChild, args: [McMultiYearView, { static: false },] }]
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

    /**
     * @fileoverview added by tsickle
     * Generated from: datepicker-animations.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        transformPanel: animations.trigger('transformPanel', [
            animations.state('void', animations.style({
                opacity: 0,
                transform: 'scale(1, 0.8)'
            })),
            animations.transition('void => enter', animations.animate('120ms cubic-bezier(0, 0, 0.2, 1)', animations.style({
                opacity: 1,
                transform: 'scale(1, 1)'
            }))),
            animations.transition('* => void', animations.animate('100ms linear', animations.style({ opacity: 0 })))
        ]),
        /**
         * Fades in the content of the calendar.
         */
        fadeInCalendar: animations.trigger('fadeInCalendar', [
            animations.state('void', animations.style({ opacity: 0 })),
            animations.state('enter', animations.style({ opacity: 1 })),
            // need to keep it until #12440 gets in, otherwise the exit animation will look glitchy.
            animations.transition('void => *', animations.animate('120ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)'))
        ])
    };
    // todo should be put into polyfils
    // https://github.com/angular/angular/issues/24769
    if (!Element.prototype.matches) {
        Element.prototype.matches = (( /** @type {?} */(Element.prototype))).msMatchesSelector;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: datepicker.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    var MC_DATEPICKER_SCROLL_STRATEGY = new i0.InjectionToken('mc-datepicker-scroll-strategy');
    /**
     * \@docs-private
     * @param {?} overlay
     * @return {?}
     */
    // tslint:disable-next-line:naming-convention
    function MC_DATEPICKER_SCROLL_STRATEGY_FACTORY(overlay) {
        return ( /**
         * @return {?}
         */function () { return overlay.scrollStrategies.reposition(); });
    }
    /**
     * \@docs-private
     * @type {?}
     */
    var MC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
        provide: MC_DATEPICKER_SCROLL_STRATEGY,
        deps: [overlay.Overlay],
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
        McDatepickerContent.prototype.ngAfterViewInit = function () {
            this.calendar.focusActiveCell();
        };
        return McDatepickerContent;
    }());
    McDatepickerContent.decorators = [
        { type: i0.Component, args: [{
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
                    encapsulation: i0.ViewEncapsulation.None,
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".mc-datepicker__content{border-style:solid;border-width:1px;display:block}.mc-datepicker__content .mc-calendar{height:344px;width:296px}.mc-datepicker__content .mc-calendar__next-button[disabled],.mc-datepicker__content .mc-calendar__previous-button[disabled]{border:0}@media (orientation:landscape){.mc-calendar{height:80vh;width:64vh}}@media (orientation:portrait){.mc-calendar{height:100vw;width:80vw}}"]
                }] }
    ];
    McDatepickerContent.propDecorators = {
        calendar: [{ type: i0.ViewChild, args: [McCalendar, { static: false },] }]
    };
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
        /**
         * @param {?} overlay
         * @param {?} ngZone
         * @param {?} viewContainerRef
         * @param {?} scrollStrategy
         * @param {?} dateAdapter
         * @param {?} dir
         * @param {?} document
         */
        function McDatepicker(overlay, ngZone, viewContainerRef, scrollStrategy, dateAdapter, dir, document) {
            this.overlay = overlay;
            this.ngZone = ngZone;
            this.viewContainerRef = viewContainerRef;
            this.dateAdapter = dateAdapter;
            this.dir = dir;
            this.document = document;
            this._hasBackdrop = false;
            /**
             * The view that the calendar should start in.
             */
            this.startView = 'month';
            /**
             * Emits selected year in multiyear view.
             * This doesn't imply a change on the selected date.
             */
            this.yearSelected = new i0.EventEmitter();
            /**
             * Emits selected month in year view.
             * This doesn't imply a change on the selected date.
             */
            this.monthSelected = new i0.EventEmitter();
            this.backdropClass = 'cdk-overlay-transparent-backdrop';
            /**
             * Emits when the datepicker has been opened.
             */
            this.openedStream = new i0.EventEmitter();
            /**
             * Emits when the datepicker has been closed.
             */
            this.closedStream = new i0.EventEmitter();
            /**
             * The id for the datepicker calendar.
             */
            this.id = "mc-datepicker-" + datepickerUid++;
            this.stateChanges = new rxjs.Subject();
            /**
             * Emits when the datepicker is disabled.
             */
            this.disabledChange = new rxjs.Subject();
            /**
             * Emits new selected date when selected date changes.
             */
            this.selectedChanged = new rxjs.Subject();
            this._opened = false;
            this.validSelected = null;
            /**
             * The element that was focused before the datepicker was opened.
             */
            this.focusedElementBeforeOpen = null;
            /**
             * Subscription to value changes in the associated input element.
             */
            this.inputSubscription = rxjs.Subscription.EMPTY;
            this.closeSubscription = rxjs.Subscription.EMPTY;
            if (!this.dateAdapter) {
                throw createMissingDateImplError('DateAdapter');
            }
            this.scrollStrategy = scrollStrategy;
        }
        Object.defineProperty(McDatepicker.prototype, "hasBackdrop", {
            /**
             * @return {?}
             */
            get: function () {
                return this._hasBackdrop;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._hasBackdrop = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepicker.prototype, "startAt", {
            /**
             * The date to open the calendar to initially.
             * @return {?}
             */
            get: function () {
                // If an explicit startAt is set we start there, otherwise we start at whatever the currently
                // selected value is.
                return this._startAt || (this.datepickerInput ? this.datepickerInput.value : null);
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._startAt = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepicker.prototype, "disabled", {
            /**
             * Whether the datepicker pop-up should be disabled.
             * @return {?}
             */
            get: function () {
                return this._disabled === undefined && this.datepickerInput ?
                    this.datepickerInput.disabled : !!this._disabled;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                /** @type {?} */
                var newValue = coercion.coerceBooleanProperty(value);
                if (newValue !== this._disabled) {
                    this._disabled = newValue;
                    this.disabledChange.next(newValue);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepicker.prototype, "opened", {
            /**
             * Whether the calendar is open.
             * @return {?}
             */
            get: function () {
                return this._opened;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                coercion.coerceBooleanProperty(value) ? this.open() : this.close();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepicker.prototype, "selected", {
            /**
             * The currently selected date.
             * @return {?}
             */
            get: function () {
                return this.validSelected;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this.validSelected = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepicker.prototype, "minDate", {
            /**
             * The minimum selectable date.
             * @return {?}
             */
            get: function () {
                return this.datepickerInput && this.datepickerInput.min;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepicker.prototype, "maxDate", {
            /**
             * The maximum selectable date.
             * @return {?}
             */
            get: function () {
                return this.datepickerInput && this.datepickerInput.max;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepicker.prototype, "dateFilter", {
            /**
             * @return {?}
             */
            get: function () {
                return this.datepickerInput && this.datepickerInput.dateFilter;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepicker.prototype, "value", {
            /**
             * @return {?}
             */
            get: function () {
                return this.selected;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @return {?}
         */
        McDatepicker.prototype.ngOnDestroy = function () {
            this.close();
            this.inputSubscription.unsubscribe();
            this.closeSubscription.unsubscribe();
            this.disabledChange.complete();
            if (this.popupRef) {
                this.popupRef.dispose();
                this.popupComponentRef = null;
            }
        };
        /**
         * Selects the given date
         * @param {?} date
         * @return {?}
         */
        McDatepicker.prototype.select = function (date) {
            /** @type {?} */
            var oldValue = this.selected;
            this.selected = date;
            if (!this.dateAdapter.sameDate(oldValue, this.selected)) {
                this.selectedChanged.next(date);
            }
        };
        /**
         * Emits the selected year in multiyear view
         * @param {?} normalizedYear
         * @return {?}
         */
        McDatepicker.prototype.selectYear = function (normalizedYear) {
            this.yearSelected.emit(normalizedYear);
        };
        /**
         * Emits selected month in year view
         * @param {?} normalizedMonth
         * @return {?}
         */
        McDatepicker.prototype.selectMonth = function (normalizedMonth) {
            this.monthSelected.emit(normalizedMonth);
        };
        /**
         * Register an input with this datepicker.
         * @param {?} input The datepicker input to register with this datepicker.
         * @return {?}
         */
        McDatepicker.prototype.registerInput = function (input) {
            var _this = this;
            if (this.datepickerInput) {
                throw Error('A McDatepicker can only be associated with a single input.');
            }
            this.datepickerInput = input;
            this.inputSubscription =
                this.datepickerInput.valueChange.subscribe(( /**
                 * @param {?} value
                 * @return {?}
                 */function (value) { return _this.selected = value; }));
        };
        /**
         * Open the calendar.
         * @return {?}
         */
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
        /**
         * Close the calendar.
         * @return {?}
         */
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
            /** @type {?} */
            var completeClose = ( /**
             * @return {?}
             */function () {
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
        /**
         * Open the calendar as a popup.
         * @private
         * @return {?}
         */
        McDatepicker.prototype.openAsPopup = function () {
            var _this = this;
            if (!this.calendarPortal) {
                this.calendarPortal = new portal.ComponentPortal(McDatepickerContent, this.viewContainerRef);
            }
            if (!this.popupRef) {
                this.createPopup();
            }
            if (!this.popupRef.hasAttached()) {
                this.popupComponentRef = this.popupRef.attach(this.calendarPortal);
                this.popupComponentRef.instance.datepicker = this;
                // Update the position once the calendar has rendered.
                this.ngZone.onStable.asObservable()
                    .pipe(operators.take(1))
                    .subscribe(( /**
             * @return {?}
             */function () { return _this.popupRef.updatePosition(); }));
            }
        };
        /**
         * Create the popup.
         * @private
         * @return {?}
         */
        McDatepicker.prototype.createPopup = function () {
            var _this = this;
            /** @type {?} */
            var overlayConfig = new overlay.OverlayConfig({
                positionStrategy: this.createPopupPositionStrategy(),
                hasBackdrop: this.hasBackdrop,
                backdropClass: this.backdropClass,
                direction: this.dir,
                scrollStrategy: this.scrollStrategy(),
                panelClass: 'mc-datepicker__popup'
            });
            this.popupRef = this.overlay.create(overlayConfig);
            this.popupRef.overlayElement.setAttribute('role', 'dialog');
            this.closeSubscription = this.closingActions()
                .subscribe(( /**
         * @return {?}
         */function () { return _this.close(); }));
        };
        /**
         * @private
         * @return {?}
         */
        McDatepicker.prototype.closingActions = function () {
            var _this = this;
            return rxjs.merge(this.popupRef.backdropClick(), this.popupRef.outsidePointerEvents(), this.popupRef.detachments(), this.popupRef.keydownEvents().pipe(operators.filter(( /**
             * @param {?} event
             * @return {?}
             */function (event) {
                // Closing on alt + up is only valid when there's an input associated with the datepicker.
                // tslint:disable-next-line:deprecation
                return event.keyCode === keycodes.ESCAPE || (_this.datepickerInput && event.altKey && event.keyCode === keycodes.UP_ARROW);
            }))));
        };
        /**
         * Create the popup PositionStrategy.
         * @private
         * @return {?}
         */
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
         * @private
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        McDatepicker.prototype.getValidDateOrNull = function (obj) {
            return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
        };
        return McDatepicker;
    }());
    McDatepicker.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mc-datepicker',
                    template: '',
                    exportAs: 'mcDatepicker',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    providers: [{ provide: formField.McFormFieldControl, useExisting: McDatepicker }]
                }] }
    ];
    /** @nocollapse */
    McDatepicker.ctorParameters = function () { return [
        { type: overlay.Overlay },
        { type: i0.NgZone },
        { type: i0.ViewContainerRef },
        { type: undefined, decorators: [{ type: i0.Inject, args: [MC_DATEPICKER_SCROLL_STRATEGY,] }] },
        { type: datetime.DateAdapter, decorators: [{ type: i0.Optional }] },
        { type: bidi.Directionality, decorators: [{ type: i0.Optional }] },
        { type: undefined, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [common.DOCUMENT,] }] }
    ]; };
    McDatepicker.propDecorators = {
        hasBackdrop: [{ type: i0.Input }],
        startAt: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        opened: [{ type: i0.Input }],
        calendarHeaderComponent: [{ type: i0.Input }],
        startView: [{ type: i0.Input }],
        yearSelected: [{ type: i0.Output }],
        monthSelected: [{ type: i0.Output }],
        panelClass: [{ type: i0.Input }],
        dateClass: [{ type: i0.Input }],
        backdropClass: [{ type: i0.Input }],
        openedStream: [{ type: i0.Output, args: ['opened',] }],
        closedStream: [{ type: i0.Output, args: ['closed',] }]
    };
    if (false) {
        /**
         * @type {?}
         * @private
         */
        McDatepicker.prototype._hasBackdrop;
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
        /** @type {?} */
        McDatepicker.prototype.backdropClass;
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
        McDatepicker.prototype.closeSubscription;
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * \@docs-private
     * @type {?}
     */
    var MC_DATEPICKER_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(( /**
         * @return {?}
         */function () { return McDatepickerInput; })),
        multi: true
    };
    /**
     * \@docs-private
     * @type {?}
     */
    var MC_DATEPICKER_VALIDATORS = {
        provide: forms.NG_VALIDATORS,
        useExisting: i0.forwardRef(( /**
         * @return {?}
         */function () { return McDatepickerInput; })),
        multi: true
    };
    /**
     * An event used for datepicker input and change events. We don't always have access to a native
     * input or change event because the event may have been triggered by the user clicking on the
     * calendar popup. For consistency, we always use McDatepickerInputEvent instead.
     * @template D
     */
    var McDatepickerInputEvent = /** @class */ (function () {
        /**
         * @param {?} target
         * @param {?} targetElement
         */
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
        /**
         * @param {?} elementRef
         * @param {?} dateAdapter
         * @param {?} dateFormats
         */
        function McDatepickerInput(elementRef, dateAdapter, dateFormats) {
            var _this = this;
            this.elementRef = elementRef;
            this.dateAdapter = dateAdapter;
            this.dateFormats = dateFormats;
            /**
             * Emits when a `change` event is fired on this `<input>`.
             */
            this.dateChange = new i0.EventEmitter();
            /**
             * Emits when an `input` event is fired on this `<input>`.
             */
            this.dateInput = new i0.EventEmitter();
            /**
             * Emits when the value changes (either due to user input or programmatic change).
             */
            this.valueChange = new i0.EventEmitter();
            /**
             * Emits when the disabled state has changed
             */
            this.disabledChange = new i0.EventEmitter();
            this.datepickerSubscription = rxjs.Subscription.EMPTY;
            this.localeSubscription = rxjs.Subscription.EMPTY;
            /**
             * Whether the last value set on the input was valid.
             */
            this.lastValueValid = false;
            this.onTouched = ( /**
             * @return {?}
             */function () {
            });
            this.cvaOnChange = ( /**
             * @return {?}
             */function () {
            });
            this.validatorOnChange = ( /**
             * @return {?}
             */function () {
            });
            /**
             * The form control validator for whether the input parses.
             */
            this.parseValidator = ( /**
             * @return {?}
             */function () {
                return _this.lastValueValid ?
                    null : { mcDatepickerParse: { text: _this.elementRef.nativeElement.value } };
            });
            /**
             * The form control validator for the min date.
             */
            this.minValidator = ( /**
             * @param {?} control
             * @return {?}
             */function (control) {
                /** @type {?} */
                var controlValue = _this.getValidDateOrNull(_this.dateAdapter.deserialize(control.value));
                return (!_this.min || !controlValue ||
                    _this.dateAdapter.compareDate(_this.min, controlValue) <= 0) ?
                    null : { mcDatepickerMin: { min: _this.min, actual: controlValue } };
            });
            /**
             * The form control validator for the max date.
             */
            this.maxValidator = ( /**
             * @param {?} control
             * @return {?}
             */function (control) {
                /** @type {?} */
                var controlValue = _this.getValidDateOrNull(_this.dateAdapter.deserialize(control.value));
                return (!_this.max || !controlValue ||
                    _this.dateAdapter.compareDate(_this.max, controlValue) >= 0) ?
                    null : { mcDatepickerMax: { max: _this.max, actual: controlValue } };
            });
            /**
             * The form control validator for the date filter.
             */
            this.filterValidator = ( /**
             * @param {?} control
             * @return {?}
             */function (control) {
                /** @type {?} */
                var controlValue = _this.getValidDateOrNull(_this.dateAdapter.deserialize(control.value));
                return !_this.dateFilter || !controlValue || _this.dateFilter(controlValue) ?
                    null : { mcDatepickerFilter: true };
            });
            this.validator = forms.Validators.compose([
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
            this.localeSubscription = dateAdapter.localeChanges.subscribe(( /**
             * @return {?}
             */function () {
                _this.value = _this.value;
            }));
        }
        Object.defineProperty(McDatepickerInput.prototype, "mcDatepicker", {
            /**
             * The datepicker that this input is associated with.
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                var _this = this;
                if (!value) {
                    return;
                }
                this.datepicker = value;
                this.datepicker.registerInput(this);
                this.datepickerSubscription.unsubscribe();
                this.datepickerSubscription = this.datepicker.selectedChanged.subscribe(( /**
                 * @param {?} selected
                 * @return {?}
                 */function (selected) {
                    _this.value = selected;
                    _this.cvaOnChange(selected);
                    _this.onTouched();
                    _this.dateInput.emit(new McDatepickerInputEvent(_this, _this.elementRef.nativeElement));
                    _this.dateChange.emit(new McDatepickerInputEvent(_this, _this.elementRef.nativeElement));
                }));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepickerInput.prototype, "mcDatepickerFilter", {
            /**
             * Function that can be used to filter out dates within the datepicker.
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this.dateFilter = value;
                this.validatorOnChange();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepickerInput.prototype, "value", {
            /**
             * The value of the input.
             * @return {?}
             */
            get: function () {
                return this._value;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
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
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepickerInput.prototype, "min", {
            /**
             * The minimum valid date.
             * @return {?}
             */
            get: function () {
                return this._min;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._min = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
                this.validatorOnChange();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepickerInput.prototype, "max", {
            /**
             * The maximum valid date.
             * @return {?}
             */
            get: function () {
                return this._max;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._max = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
                this.validatorOnChange();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepickerInput.prototype, "disabled", {
            /**
             * Whether the datepicker-input is disabled.
             * @return {?}
             */
            get: function () {
                return !!this._disabled;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                /** @type {?} */
                var newValue = coercion.coerceBooleanProperty(value);
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
            enumerable: false,
            configurable: true
        });
        /**
         * @return {?}
         */
        McDatepickerInput.prototype.ngOnDestroy = function () {
            this.datepickerSubscription.unsubscribe();
            this.localeSubscription.unsubscribe();
            this.valueChange.complete();
            this.disabledChange.complete();
        };
        /**
         * \@docs-private
         * @param {?} fn
         * @return {?}
         */
        McDatepickerInput.prototype.registerOnValidatorChange = function (fn) {
            this.validatorOnChange = fn;
        };
        /**
         * \@docs-private
         * @param {?} c
         * @return {?}
         */
        McDatepickerInput.prototype.validate = function (c) {
            return this.validator ? this.validator(c) : null;
        };
        // Implemented as part of ControlValueAccessor.
        /**
         * @param {?} value
         * @return {?}
         */
        McDatepickerInput.prototype.writeValue = function (value) {
            this.value = value;
        };
        // Implemented as part of ControlValueAccessor.
        /**
         * @param {?} fn
         * @return {?}
         */
        McDatepickerInput.prototype.registerOnChange = function (fn) {
            this.cvaOnChange = fn;
        };
        // Implemented as part of ControlValueAccessor.
        /**
         * @param {?} fn
         * @return {?}
         */
        McDatepickerInput.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        // Implemented as part of ControlValueAccessor.
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        McDatepickerInput.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
        };
        /**
         * @param {?} event
         * @return {?}
         */
        McDatepickerInput.prototype.onKeydown = function (event) {
            // tslint:disable-next-line:deprecation
            /** @type {?} */
            var isAltDownArrow = event.altKey && event.keyCode === keycodes.DOWN_ARROW;
            if (this.datepicker && isAltDownArrow && !this.elementRef.nativeElement.readOnly) {
                this.datepicker.open();
                event.preventDefault();
            }
        };
        /**
         * @param {?} value
         * @return {?}
         */
        McDatepickerInput.prototype.onInput = function (value) {
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
        McDatepickerInput.prototype.onChange = function () {
            this.dateChange.emit(new McDatepickerInputEvent(this, this.elementRef.nativeElement));
        };
        /**
         * Handles blur events on the input.
         * @return {?}
         */
        McDatepickerInput.prototype.onBlur = function () {
            // Reformat the input only if we have a valid value.
            if (this.value) {
                this.formatValue(this.value);
            }
            this.onTouched();
        };
        /**
         * Formats a value and sets it on the input element.
         * @private
         * @param {?} value
         * @return {?}
         */
        McDatepickerInput.prototype.formatValue = function (value) {
            this.elementRef.nativeElement.value =
                value ? this.dateAdapter.format(value, this.dateFormats.display.dateInput) : '';
        };
        /**
         * @private
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        McDatepickerInput.prototype.getValidDateOrNull = function (obj) {
            return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
        };
        return McDatepickerInput;
    }());
    McDatepickerInput.decorators = [
        { type: i0.Directive, args: [{
                    selector: 'input[mcDatepicker]',
                    exportAs: 'mcDatepickerInput',
                    providers: [
                        MC_DATEPICKER_VALUE_ACCESSOR,
                        MC_DATEPICKER_VALIDATORS,
                        { provide: input.MC_INPUT_VALUE_ACCESSOR, useExisting: McDatepickerInput }
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
        { type: i0.ElementRef },
        { type: datetime.DateAdapter, decorators: [{ type: i0.Optional }] },
        { type: undefined, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [datetime.MC_DATE_FORMATS,] }] }
    ]; };
    McDatepickerInput.propDecorators = {
        mcDatepicker: [{ type: i0.Input }],
        mcDatepickerFilter: [{ type: i0.Input }],
        value: [{ type: i0.Input }],
        min: [{ type: i0.Input }],
        max: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        dateChange: [{ type: i0.Output }],
        dateInput: [{ type: i0.Output }]
    };
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Can be used to override the icon of a `mcDatepickerToggle`.
     */
    var McDatepickerToggleIcon = /** @class */ (function () {
        function McDatepickerToggleIcon() {
        }
        return McDatepickerToggleIcon;
    }());
    McDatepickerToggleIcon.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[mcDatepickerToggleIcon]'
                },] }
    ];
    /**
     * @template D
     */
    var McDatepickerToggle = /** @class */ (function () {
        /**
         * @param {?} intl
         * @param {?} changeDetectorRef
         */
        function McDatepickerToggle(intl, changeDetectorRef) {
            this.intl = intl;
            this.changeDetectorRef = changeDetectorRef;
            this.stateChanges = rxjs.Subscription.EMPTY;
        }
        Object.defineProperty(McDatepickerToggle.prototype, "disabled", {
            /**
             * Whether the toggle button is disabled.
             * @return {?}
             */
            get: function () {
                return this._disabled === undefined ? this.datepicker.disabled : !!this._disabled;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @param {?} changes
         * @return {?}
         */
        McDatepickerToggle.prototype.ngOnChanges = function (changes) {
            if (changes.datepicker) {
                this.watchStateChanges();
            }
        };
        /**
         * @return {?}
         */
        McDatepickerToggle.prototype.ngOnDestroy = function () {
            this.stateChanges.unsubscribe();
        };
        /**
         * @return {?}
         */
        McDatepickerToggle.prototype.ngAfterContentInit = function () {
            this.watchStateChanges();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        McDatepickerToggle.prototype.open = function (event) {
            if (this.datepicker && !this.disabled) {
                this.datepicker.open();
                event.stopPropagation();
            }
        };
        /**
         * @private
         * @return {?}
         */
        McDatepickerToggle.prototype.watchStateChanges = function () {
            var _this = this;
            /** @type {?} */
            var datepickerDisabled = this.datepicker ? this.datepicker.disabledChange : rxjs.of();
            /** @type {?} */
            var inputDisabled = this.datepicker && this.datepicker.datepickerInput ?
                this.datepicker.datepickerInput.disabledChange : rxjs.of();
            /** @type {?} */
            var datepickerToggled = this.datepicker ?
                rxjs.merge(this.datepicker.openedStream, this.datepicker.closedStream) :
                rxjs.of();
            this.stateChanges.unsubscribe();
            this.stateChanges = rxjs.merge(this.intl.changes, datepickerDisabled, inputDisabled, datepickerToggled).subscribe(( /**
             * @return {?}
             */function () { return _this.changeDetectorRef.markForCheck(); }));
        };
        return McDatepickerToggle;
    }());
    McDatepickerToggle.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mc-datepicker-toggle',
                    template: "<button\n    #button\n    mc-button\n    type=\"button\"\n    class=\"mc-datepicker-toggle__button\"\n    aria-haspopup=\"true\"\n    [attr.aria-label]=\"intl.openCalendarLabel\"\n    [attr.tabindex]=\"tabIndex\"\n    [disabled]=\"disabled\"\n    (click)=\"open($event)\">\n\n    <i *ngIf=\"!customIcon\" mc-icon=\"mc-calendar_16\" class=\"mc-datepicker-toggle__default-icon\"></i>\n\n    <ng-content select=\"[mcDatepickerToggleIcon]\"></ng-content>\n</button>\n",
                    host: {
                        class: 'mc-datepicker-toggle',
                        '[class.mc-active]': 'datepicker && datepicker.opened'
                    },
                    exportAs: 'mcDatepickerToggle',
                    encapsulation: i0.ViewEncapsulation.None,
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".mc-datepicker-toggle:focus{outline:0}.mc-datepicker-toggle__button.mc-icon-button{height:30px;margin-left:2px;width:30px}.mc-form-field-appearance-legacy .mc-form-field-prefix .mc-datepicker-toggle__default-icon,.mc-form-field-appearance-legacy .mc-form-field-suffix .mc-datepicker-toggle__default-icon{width:1em}.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-prefix .mc-datepicker-toggle__default-icon,.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-suffix .mc-datepicker-toggle__default-icon{display:block;height:1.5em;width:1.5em}.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-prefix .mc-icon-button .mc-datepicker-toggle__default-icon,.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-suffix .mc-icon-button .mc-datepicker-toggle__default-icon{margin:auto}"]
                }] }
    ];
    /** @nocollapse */
    McDatepickerToggle.ctorParameters = function () { return [
        { type: McDatepickerIntl },
        { type: i0.ChangeDetectorRef }
    ]; };
    McDatepickerToggle.propDecorators = {
        disabled: [{ type: i0.Input }],
        datepicker: [{ type: i0.Input, args: ['for',] }],
        tabIndex: [{ type: i0.Input }],
        customIcon: [{ type: i0.ContentChild, args: [McDatepickerToggleIcon, { static: false },] }],
        button: [{ type: i0.ViewChild, args: ['button', { static: false },] }]
    };
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McDatepickerModule = /** @class */ (function () {
        function McDatepickerModule() {
        }
        return McDatepickerModule;
    }());
    McDatepickerModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        button.McButtonModule,
                        overlay.OverlayModule,
                        a11y.A11yModule,
                        portal.PortalModule,
                        icon.McIconModule
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
                        button.McButtonModule
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

    /**
     * @fileoverview added by tsickle
     * Generated from: public-api.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: ptsecurity-mosaic-datepicker.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.MC_DATEPICKER_SCROLL_STRATEGY = MC_DATEPICKER_SCROLL_STRATEGY;
    exports.MC_DATEPICKER_SCROLL_STRATEGY_FACTORY = MC_DATEPICKER_SCROLL_STRATEGY_FACTORY;
    exports.MC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = MC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER;
    exports.MC_DATEPICKER_VALIDATORS = MC_DATEPICKER_VALIDATORS;
    exports.MC_DATEPICKER_VALUE_ACCESSOR = MC_DATEPICKER_VALUE_ACCESSOR;
    exports.McCalendar = McCalendar;
    exports.McCalendarBody = McCalendarBody;
    exports.McCalendarCell = McCalendarCell;
    exports.McCalendarHeader = McCalendarHeader;
    exports.McDatepicker = McDatepicker;
    exports.McDatepickerContent = McDatepickerContent;
    exports.McDatepickerInput = McDatepickerInput;
    exports.McDatepickerInputEvent = McDatepickerInputEvent;
    exports.McDatepickerIntl = McDatepickerIntl;
    exports.McDatepickerModule = McDatepickerModule;
    exports.McDatepickerToggle = McDatepickerToggle;
    exports.McDatepickerToggleIcon = McDatepickerToggleIcon;
    exports.McMonthView = McMonthView;
    exports.McMultiYearView = McMultiYearView;
    exports.McYearView = McYearView;
    exports.mcDatepickerAnimations = mcDatepickerAnimations;
    exports.yearsPerPage = yearsPerPage;
    exports.yearsPerRow = yearsPerRow;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-datepicker.umd.js.map
