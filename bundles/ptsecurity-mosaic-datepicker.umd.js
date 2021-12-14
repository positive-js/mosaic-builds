(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/cdk/overlay'), require('@angular/cdk/portal'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/button'), require('@ptsecurity/mosaic/icon'), require('rxjs/operators'), require('@ptsecurity/cdk/datetime'), require('rxjs'), require('@ptsecurity/cdk/keycodes'), require('@angular/cdk/bidi'), require('@angular/cdk/coercion'), require('@angular/forms'), require('@ptsecurity/mosaic/core'), require('@ptsecurity/mosaic/form-field'), require('@angular/animations')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/datepicker', ['exports', '@angular/cdk/a11y', '@angular/cdk/overlay', '@angular/cdk/portal', '@angular/common', '@angular/core', '@ptsecurity/mosaic/button', '@ptsecurity/mosaic/icon', 'rxjs/operators', '@ptsecurity/cdk/datetime', 'rxjs', '@ptsecurity/cdk/keycodes', '@angular/cdk/bidi', '@angular/cdk/coercion', '@angular/forms', '@ptsecurity/mosaic/core', '@ptsecurity/mosaic/form-field', '@angular/animations'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.datepicker = {}), global.ng.cdk.a11y, global.ng.cdk.overlay, global.ng.cdk.portal, global.ng.common, global.ng.core, global.ptsecurity.mosaic.button, global.ptsecurity.mosaic.icon, global.rxjs.operators, global.mc.cdk.datetime, global.rxjs, global.mc.cdk.keycodes, global.ng.cdk.bidi, global.ng.cdk.coercion, global.ng.forms, global.ptsecurity.mosaic.core, global.ptsecurity.mosaic["form-field"], global.ng.animations));
})(this, (function (exports, a11y, i3$1, i8, i1, i0, i3, i4, operators, i1$1, rxjs, keycodes, i2, coercion, forms, core, formField, animations) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i3__namespace$1 = /*#__PURE__*/_interopNamespace(i3$1);
    var i8__namespace = /*#__PURE__*/_interopNamespace(i8);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);

    // tslint:disable:no-magic-numbers
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
            this.selectedValueChange = new i0.EventEmitter();
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
                _this.ngZone.onStable.asObservable().pipe(operators.take(1)).subscribe(function () {
                    var activeCell = _this.elementRef.nativeElement.querySelector('.mc-calendar__body_active');
                    if (activeCell) {
                        activeCell.focus();
                    }
                });
            });
        };
        return McCalendarBody;
    }());
    /** @nocollapse */ McCalendarBody.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McCalendarBody, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.NgZone }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McCalendarBody.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McCalendarBody, selector: "[mc-calendar-body]", inputs: { label: "label", rows: "rows", todayValue: "todayValue", selectedValue: "selectedValue", labelMinRequiredCells: "labelMinRequiredCells", numCols: "numCols", activeCell: "activeCell", cellAspectRatio: "cellAspectRatio" }, outputs: { selectedValueChange: "selectedValueChange" }, host: { attributes: { "role": "grid", "aria-readonly": "true" }, classAttribute: "mc-calendar__body" }, exportAs: ["mcCalendarBody"], usesOnChanges: true, ngImport: i0__namespace, template: "<!--\n  If there's not enough space in the first row, create a separate label row. We mark this row as\n  aria-hidden because we don't want it to be read out as one of the weeks in the month.\n-->\n<tr *ngIf=\"firstRowOffset < labelMinRequiredCells\">\n    <td class=\"mc-calendar__body-label\" [attr.colspan]=\"numCols\">\n        {{ label }}\n    </td>\n</tr>\n\n<!-- Create the first row separately so we can include a special spacer cell. -->\n<tr *ngFor=\"let row of rows; let rowIndex = index\">\n    <!--\n      We mark this cell as aria-hidden so it doesn't get read out as one of the days in the week.\n      The aspect ratio of the table cells is maintained by setting the top and bottom padding as a\n      percentage of the width (a variant of the trick described here:\n      https://www.w3schools.com/howto/howto_css_aspect_ratio.asp).\n    -->\n    <td *ngIf=\"rowIndex === 0 && firstRowOffset\"\n        class=\"mc-calendar__body-label\"\n        [attr.colspan]=\"firstRowOffset\">\n        {{ firstRowOffset >= labelMinRequiredCells ? label : '' }}\n    </td>\n    <td *ngFor=\"let item of row; let colIndex = index\"\n        class=\"mc-calendar__body-cell\"\n        [ngClass]=\"item.cssClasses!\"\n        [tabindex]=\"isActiveCell(rowIndex, colIndex) ? 0 : -1\"\n        [class.mc-calendar__body_disabled]=\"!item.enabled\"\n        [class.mc-calendar__body_active]=\"isActiveCell(rowIndex, colIndex)\"\n        (click)=\"cellClicked(item)\"\n        [style.width]=\"cellWidth\"\n        [style.paddingTop]=\"cellPadding\"\n        [style.paddingBottom]=\"cellPadding\">\n        <div class=\"mc-calendar__body-cell-content\"\n             [class.mc-selected]=\"selectedValue === item.value\"\n             [class.mc-calendar__body-today]=\"todayValue === item.value\">\n            {{ item.displayValue }}\n        </div>\n    </td>\n</tr>\n", styles: [".mc-calendar__body{min-width:calc(7 * 32px);min-width:calc(7 * var(--mc-datepicker-body-size-cell-min-size, 32px))}.mc-calendar__body-label{text-align:left;padding:8px 28px 12px 12px;padding:var(--mc-datepicker-body-size-label-paddings, 8px 28px 12px 12px)}.mc-calendar__body-cell{position:relative;height:0;line-height:0;text-align:center;outline:none;cursor:pointer}.mc-calendar__body_disabled{cursor:default}.mc-calendar__body-cell-content{position:absolute;top:5%;top:var(--mc-datepicker-body-size-cell-margin, 5%);left:5%;left:var(--mc-datepicker-body-size-cell-margin, 5%);padding:8px;padding:var(--mc-datepicker-body-size-cell-padding, 8px);display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:90%;height:90%;line-height:1;border-width:1px;border-width:var(--mc-datepicker-body-size-cell-border-width, 1px);border-style:solid}.cdk-high-contrast-active .mc-calendar__body-cell-content{border:none}.cdk-high-contrast-active :host .mc-calendar__body-cell-content{border:none}mc-month-view .mc-calendar__body-cell-content{justify-content:flex-end}mc-multi-year-view .mc-calendar__body-cell-content,mc-year-view .mc-calendar__body-cell-content{justify-content:center}.cdk-high-contrast-active .mc-datepicker__popup:not(:empty),.cdk-high-contrast-active .mc-selected{outline:solid 1px}.cdk-high-contrast-active .mc-calendar__body-today{outline:dotted 1px}.cdk-high-contrast-active :host .mc-datepicker__popup:not(:empty),.cdk-high-contrast-active :host .mc-selected{outline:solid 1px}.cdk-high-contrast-active :host .mc-calendar__body-today{outline:dotted 1px}[dir=rtl] .mc-calendar__body-label{text-align:right}\n"], directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McCalendarBody, decorators: [{
                type: i0.Component,
                args: [{
                        selector: '[mc-calendar-body]',
                        exportAs: 'mcCalendarBody',
                        templateUrl: 'calendar-body.html',
                        styleUrls: ['calendar-body.scss'],
                        host: {
                            class: 'mc-calendar__body',
                            role: 'grid',
                            'aria-readonly': 'true'
                        },
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.NgZone }]; }, propDecorators: { label: [{
                    type: i0.Input
                }], rows: [{
                    type: i0.Input
                }], todayValue: [{
                    type: i0.Input
                }], selectedValue: [{
                    type: i0.Input
                }], labelMinRequiredCells: [{
                    type: i0.Input
                }], numCols: [{
                    type: i0.Input
                }], activeCell: [{
                    type: i0.Input
                }], cellAspectRatio: [{
                    type: i0.Input
                }], selectedValueChange: [{
                    type: i0.Output
                }] } });

    /** @docs-private */
    function createMissingDateImplError(provider) {
        return Error("McDatepicker: No provider found for " + provider + ". You must import one of the existing " +
            "modules at your application root or provide a custom implementation or use exists ones.");
    }

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
            this.selectedChange = new i0.EventEmitter();
            /** Emits when any date is selected. */
            this.userSelection = new i0.EventEmitter();
            /** Emits when any date is activated. */
            this.activeDateChange = new i0.EventEmitter();
            if (!this.dateAdapter) {
                throw createMissingDateImplError('DateAdapter');
            }
            if (!this.dateFormats) {
                throw createMissingDateImplError('MC_DATE_FORMATS');
            }
            var firstDayOfWeek = this.dateAdapter.getFirstDayOfWeek();
            var narrowWeekdays = this.dateAdapter.getDayOfWeekNames('short');
            var longWeekdays = this.dateAdapter.getDayOfWeekNames('long');
            // Rotate the labels for days of the week based on the configured first day of the week.
            var weekdays = longWeekdays.map(function (long, i) {
                return { long: long, narrow: narrowWeekdays[i] };
            });
            this.weekdays = weekdays
                .slice(firstDayOfWeek)
                .concat(weekdays.slice(0, firstDayOfWeek));
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
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
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
                    this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, (this.dateAdapter.getNumDaysInMonth(this._activeDate) - this.dateAdapter.getDate(this._activeDate)));
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
        /** Initializes this month view. */
        McMonthView.prototype.init = function () {
            this.selectedDate = this.getDateInCurrentMonth(this.selected);
            this.todayDate = this.getDateInCurrentMonth(this.dateAdapter.today());
            this.monthLabel = this.dateAdapter.getMonthNames('short')[this.dateAdapter.getMonth(this.activeDate)];
            this.monthLabel = this.monthLabel[0].toLocaleUpperCase() + this.monthLabel.substr(1);
            var firstOfMonth = this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), this.dateAdapter.getMonth(this.activeDate));
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
                var ariaLabel = this.dateAdapter.format(date, this.dateFormats.dateA11yLabel);
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
        return McMonthView;
    }());
    /** @nocollapse */ McMonthView.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McMonthView, deps: [{ token: i0__namespace.ChangeDetectorRef }, { token: i1$1.MC_DATE_FORMATS, optional: true }, { token: i1__namespace$1.DateAdapter, optional: true }, { token: i2__namespace.Directionality, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McMonthView.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McMonthView, selector: "mc-month-view", inputs: { activeDate: "activeDate", selected: "selected", minDate: "minDate", maxDate: "maxDate", dateFilter: "dateFilter", dateClass: "dateClass" }, outputs: { selectedChange: "selectedChange", userSelection: "userSelection", activeDateChange: "activeDateChange" }, viewQueries: [{ propertyName: "mcCalendarBody", first: true, predicate: McCalendarBody, descendants: true }], exportAs: ["mcMonthView"], ngImport: i0__namespace, template: "<table class=\"mc-calendar__table\">\n    <thead class=\"mc-calendar__table-header\">\n        <tr>\n            <th *ngFor=\"let day of weekdays\" [attr.aria-label]=\"day.long\">{{day.narrow}}</th>\n        </tr>\n        <tr>\n            <th class=\"mc-calendar__table-header-divider\" colspan=\"7\"></th>\n        </tr>\n    </thead>\n    <tbody mc-calendar-body\n           [label]=\"monthLabel\"\n           [rows]=\"weeks\"\n           [todayValue]=\"todayDate!\"\n           [selectedValue]=\"selectedDate!\"\n           [labelMinRequiredCells]=\"3\"\n           [activeCell]=\"dateAdapter.getDate(activeDate) - 1\"\n           (selectedValueChange)=\"dateSelected($event)\"\n           (keydown)=\"handleCalendarBodyKeydown($event)\">\n    </tbody>\n</table>\n", components: [{ type: McCalendarBody, selector: "[mc-calendar-body]", inputs: ["label", "rows", "todayValue", "selectedValue", "labelMinRequiredCells", "numCols", "activeCell", "cellAspectRatio"], outputs: ["selectedValueChange"], exportAs: ["mcCalendarBody"] }], directives: [{ type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McMonthView, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-month-view',
                        exportAs: 'mcMonthView',
                        templateUrl: 'month-view.html',
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ChangeDetectorRef }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [i1$1.MC_DATE_FORMATS]
                        }] }, { type: i1__namespace$1.DateAdapter, decorators: [{
                            type: i0.Optional
                        }] }, { type: i2__namespace.Directionality, decorators: [{
                            type: i0.Optional
                        }] }];
        }, propDecorators: { activeDate: [{
                    type: i0.Input
                }], selected: [{
                    type: i0.Input
                }], minDate: [{
                    type: i0.Input
                }], maxDate: [{
                    type: i0.Input
                }], dateFilter: [{
                    type: i0.Input
                }], dateClass: [{
                    type: i0.Input
                }], selectedChange: [{
                    type: i0.Output
                }], userSelection: [{
                    type: i0.Output
                }], activeDateChange: [{
                    type: i0.Output
                }], mcCalendarBody: [{
                    type: i0.ViewChild,
                    args: [McCalendarBody, { static: false }]
                }] } });

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
            this.selectedChange = new i0.EventEmitter();
            /** Emits the selected year. This doesn't imply a change on the selected date */
            this.yearSelected = new i0.EventEmitter();
            /** Emits when any date is activated. */
            this.activeDateChange = new i0.EventEmitter();
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
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
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
            this.yearSelected.emit(this.dateAdapter.createDate(year));
            var month = this.dateAdapter.getMonth(this.activeDate);
            var daysInMonth = this.dateAdapter.getNumDaysInMonth(this.dateAdapter.createDate(year, month));
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
        McMultiYearView.prototype.getActiveCell = function () {
            return this.dateAdapter.getYear(this.activeDate) % yearsPerPage;
        };
        /** Focuses the active cell after the microtask queue is empty. */
        McMultiYearView.prototype.focusActiveCell = function () {
            this.mcCalendarBody.focusActiveCell();
        };
        /** Creates an McCalendarCell for the given year. */
        McMultiYearView.prototype.createCellForYear = function (year) {
            var yearName = this.dateAdapter.getYearName(this.dateAdapter.createDate(year));
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
            var firstOfYear = this.dateAdapter.createDate(year);
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
        return McMultiYearView;
    }());
    /** @nocollapse */ McMultiYearView.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McMultiYearView, deps: [{ token: i0__namespace.ChangeDetectorRef }, { token: i1__namespace$1.DateAdapter, optional: true }, { token: i2__namespace.Directionality, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McMultiYearView.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McMultiYearView, selector: "mc-multi-year-view", inputs: { activeDate: "activeDate", selected: "selected", minDate: "minDate", maxDate: "maxDate", dateFilter: "dateFilter" }, outputs: { selectedChange: "selectedChange", yearSelected: "yearSelected", activeDateChange: "activeDateChange" }, viewQueries: [{ propertyName: "mcCalendarBody", first: true, predicate: McCalendarBody, descendants: true }], exportAs: ["mcMultiYearView"], ngImport: i0__namespace, template: "<table class=\"mc-calendar__table\">\n    <thead class=\"mc-calendar__table-header\">\n    <tr>\n        <th class=\"mc-calendar__table-header-divider\" colspan=\"4\"></th>\n    </tr>\n    </thead>\n    <tbody mc-calendar-body\n           [rows]=\"years\"\n           [todayValue]=\"todayYear\"\n           [selectedValue]=\"selectedYear!\"\n           [numCols]=\"4\"\n           [cellAspectRatio]=\"4 / 7\"\n           [activeCell]=\"getActiveCell()\"\n           (selectedValueChange)=\"onYearSelected($event)\"\n           (keydown)=\"handleCalendarBodyKeydown($event)\">\n    </tbody>\n</table>\n", components: [{ type: McCalendarBody, selector: "[mc-calendar-body]", inputs: ["label", "rows", "todayValue", "selectedValue", "labelMinRequiredCells", "numCols", "activeCell", "cellAspectRatio"], outputs: ["selectedValueChange"], exportAs: ["mcCalendarBody"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McMultiYearView, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-multi-year-view',
                        exportAs: 'mcMultiYearView',
                        templateUrl: 'multi-year-view.html',
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ChangeDetectorRef }, { type: i1__namespace$1.DateAdapter, decorators: [{
                            type: i0.Optional
                        }] }, { type: i2__namespace.Directionality, decorators: [{
                            type: i0.Optional
                        }] }];
        }, propDecorators: { activeDate: [{
                    type: i0.Input
                }], selected: [{
                    type: i0.Input
                }], minDate: [{
                    type: i0.Input
                }], maxDate: [{
                    type: i0.Input
                }], dateFilter: [{
                    type: i0.Input
                }], selectedChange: [{
                    type: i0.Output
                }], yearSelected: [{
                    type: i0.Output
                }], activeDateChange: [{
                    type: i0.Output
                }], mcCalendarBody: [{
                    type: i0.ViewChild,
                    args: [McCalendarBody, { static: false }]
                }] } });

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
            this.selectedChange = new i0.EventEmitter();
            /** Emits the selected month. This doesn't imply a change on the selected date */
            this.monthSelected = new i0.EventEmitter();
            /** Emits when any date is activated. */
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
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
            configurable: true
        });
        McYearView.prototype.ngAfterContentInit = function () {
            this.init();
        };
        /** Handles when a new month is selected. */
        McYearView.prototype.onMonthSelected = function (month) {
            var year = this.dateAdapter.getYear(this.activeDate);
            var normalizedDate = this.dateAdapter.createDate(year, month);
            this.monthSelected.emit(normalizedDate);
            var daysInMonth = this.dateAdapter.getNumDaysInMonth(normalizedDate);
            this.selectedChange.emit(this.dateAdapter.createDate(year, month, Math.min(this.dateAdapter.getDate(this.activeDate), daysInMonth)));
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
        /** Initializes this year view. */
        McYearView.prototype.init = function () {
            var _this = this;
            this.selectedMonth = this.getMonthInCurrentYear(this.selected);
            this.todayMonth = this.getMonthInCurrentYear(this.dateAdapter.today());
            this.yearLabel = this.dateAdapter.getYearName(this.activeDate);
            var monthNames = this.dateAdapter.getMonthNames('short');
            // First row of months only contains 5 elements so we can fit the year label on the same row.
            // tslint:disable-next-line:no-magic-numbers
            this.months = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]]
                .map(function (row) { return row.map(function (month) { return _this.createCellForMonth(month, monthNames[month]); }); });
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
            var ariaLabel = this.dateAdapter.format(this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), month), this.dateFormats.monthYearA11yLabel);
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
            var firstOfMonth = this.dateAdapter.createDate(activeYear, month);
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
        return McYearView;
    }());
    /** @nocollapse */ McYearView.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McYearView, deps: [{ token: i0__namespace.ChangeDetectorRef }, { token: i1$1.MC_DATE_FORMATS, optional: true }, { token: i1__namespace$1.DateAdapter, optional: true }, { token: i2__namespace.Directionality, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McYearView.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McYearView, selector: "mc-year-view", inputs: { activeDate: "activeDate", selected: "selected", minDate: "minDate", maxDate: "maxDate", dateFilter: "dateFilter" }, outputs: { selectedChange: "selectedChange", monthSelected: "monthSelected", activeDateChange: "activeDateChange" }, viewQueries: [{ propertyName: "mcCalendarBody", first: true, predicate: McCalendarBody, descendants: true }], exportAs: ["mcYearView"], ngImport: i0__namespace, template: "<table class=\"mc-calendar__table\">\n    <thead class=\"mc-calendar__table-header\">\n    <tr>\n        <th class=\"mc-calendar__table-header-divider\" colspan=\"4\"></th>\n    </tr>\n    </thead>\n    <tbody mc-calendar-body\n           [label]=\"yearLabel\"\n           [rows]=\"months\"\n           [todayValue]=\"todayMonth!\"\n           [selectedValue]=\"selectedMonth!\"\n           [labelMinRequiredCells]=\"2\"\n           [numCols]=\"4\"\n           [cellAspectRatio]=\"4 / 7\"\n           [activeCell]=\"dateAdapter.getMonth(activeDate)\"\n           (selectedValueChange)=\"onMonthSelected($event)\"\n           (keydown)=\"handleCalendarBodyKeydown($event)\">\n    </tbody>\n</table>\n", components: [{ type: McCalendarBody, selector: "[mc-calendar-body]", inputs: ["label", "rows", "todayValue", "selectedValue", "labelMinRequiredCells", "numCols", "activeCell", "cellAspectRatio"], outputs: ["selectedValueChange"], exportAs: ["mcCalendarBody"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McYearView, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-year-view',
                        exportAs: 'mcYearView',
                        templateUrl: 'year-view.html',
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ChangeDetectorRef }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [i1$1.MC_DATE_FORMATS]
                        }] }, { type: i1__namespace$1.DateAdapter, decorators: [{
                            type: i0.Optional
                        }] }, { type: i2__namespace.Directionality, decorators: [{
                            type: i0.Optional
                        }] }];
        }, propDecorators: { activeDate: [{
                    type: i0.Input
                }], selected: [{
                    type: i0.Input
                }], minDate: [{
                    type: i0.Input
                }], maxDate: [{
                    type: i0.Input
                }], dateFilter: [{
                    type: i0.Input
                }], selectedChange: [{
                    type: i0.Output
                }], monthSelected: [{
                    type: i0.Output
                }], activeDateChange: [{
                    type: i0.Output
                }], mcCalendarBody: [{
                    type: i0.ViewChild,
                    args: [McCalendarBody, { static: false }]
                }] } });

    /** Datepicker data that requires internationalization. */
    var McDatepickerIntl = /** @class */ (function () {
        function McDatepickerIntl() {
            /**
             * Stream that emits whenever the labels here are changed. Use this to notify
             * components if the labels have changed after initialization.
             */
            this.changes = new rxjs.Subject();
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
        return McDatepickerIntl;
    }());
    /** @nocollapse */ McDatepickerIntl.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McDatepickerIntl, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ McDatepickerIntl.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McDatepickerIntl, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McDatepickerIntl, decorators: [{
                type: i0.Injectable,
                args: [{ providedIn: 'root' }]
            }] });

    /**
     * Possible views for the calendar.
     * @docs-private
     */
    exports.McCalendarView = void 0;
    (function (McCalendarView) {
        McCalendarView["Month"] = "month";
        McCalendarView["Year"] = "year";
        McCalendarView["MultiYear"] = "multi-year";
    })(exports.McCalendarView || (exports.McCalendarView = {}));
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
                if (this.calendar.currentView === exports.McCalendarView.Month) {
                    var label = this.dateAdapter.format(this.calendar.activeDate, this.dateFormats.monthYearLabel);
                    return (label[0].toLocaleUpperCase() + label.substr(1)).replace('.', '');
                }
                if (this.calendar.currentView === exports.McCalendarView.Year) {
                    return this.dateAdapter.getYearName(this.calendar.activeDate);
                }
                var activeYear = this.dateAdapter.getYear(this.calendar.activeDate);
                var firstYearInView = this.dateAdapter.getYearName(
                // tslint:disable-next-line:no-magic-numbers
                this.dateAdapter.createDate(activeYear - activeYear % 24));
                var lastYearInView = this.dateAdapter.getYearName(
                // tslint:disable-next-line:no-magic-numbers
                this.dateAdapter.createDate(activeYear + yearsPerPage - 1 - activeYear % 24));
                return firstYearInView + " \u2013 " + lastYearInView;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McCalendarHeader.prototype, "periodButtonLabel", {
            get: function () {
                return this.calendar.currentView === exports.McCalendarView.Month ?
                    this.intl.switchToMultiYearViewLabel : this.intl.switchToMonthViewLabel;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McCalendarHeader.prototype, "prevButtonLabel", {
            /** The label for the previous button. */
            get: function () {
                var _a;
                return (_a = {},
                    _a[exports.McCalendarView.Month] = this.intl.prevMonthLabel,
                    _a[exports.McCalendarView.Year] = this.intl.prevYearLabel,
                    _a[exports.McCalendarView.MultiYear] = this.intl.prevMultiYearLabel,
                    _a)[this.calendar.currentView];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McCalendarHeader.prototype, "nextButtonLabel", {
            /** The label for the next button. */
            get: function () {
                var _a;
                return (_a = {},
                    _a[exports.McCalendarView.Month] = this.intl.nextMonthLabel,
                    _a[exports.McCalendarView.Year] = this.intl.nextYearLabel,
                    _a[exports.McCalendarView.MultiYear] = this.intl.nextMultiYearLabel,
                    _a)[this.calendar.currentView];
            },
            enumerable: false,
            configurable: true
        });
        /** Handles user clicks on the period label. */
        McCalendarHeader.prototype.currentPeriodClicked = function () {
            if ([exports.McCalendarView.Month, exports.McCalendarView.MultiYear].includes(this.calendar.currentView)) {
                this.calendar.currentView = exports.McCalendarView.Year;
            }
            else if (this.calendar.currentView === exports.McCalendarView.Year) {
                this.calendar.currentView = exports.McCalendarView.Month;
            }
        };
        /** Handles user clicks on the previous button. */
        McCalendarHeader.prototype.previousClicked = function () {
            if (this.calendar.currentView === exports.McCalendarView.Month) {
                this.calendar.activeDate = this.dateAdapter.addCalendarMonths(this.calendar.activeDate, -1);
            }
            else {
                this.calendar.activeDate = this.dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView === exports.McCalendarView.Year ? -1 : -yearsPerPage);
            }
        };
        /** Handles user clicks on the next button. */
        McCalendarHeader.prototype.nextClicked = function () {
            if (this.calendar.currentView === exports.McCalendarView.Month) {
                this.calendar.activeDate = this.dateAdapter.addCalendarMonths(this.calendar.activeDate, 1);
            }
            else {
                this.calendar.activeDate = this.dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView === exports.McCalendarView.Year ? 1 : yearsPerPage);
            }
        };
        /** Whether the previous period button is enabled. */
        McCalendarHeader.prototype.previousEnabled = function () {
            if (!this.calendar.minDate) {
                return true;
            }
            return !this.calendar.minDate || !this.isSameView(this.calendar.activeDate, this.calendar.minDate);
        };
        /** Whether the next period button is enabled. */
        McCalendarHeader.prototype.nextEnabled = function () {
            return !this.calendar.maxDate || !this.isSameView(this.calendar.activeDate, this.calendar.maxDate);
        };
        /** Whether the two dates represent the same view in the current view mode (month or year). */
        McCalendarHeader.prototype.isSameView = function (firstDate, secondDate) {
            var firstYear = this.dateAdapter.getYear(firstDate);
            var secondYear = this.dateAdapter.getYear(secondDate);
            var firstMonth = this.dateAdapter.getMonth(firstDate);
            var secondMonth = this.dateAdapter.getMonth(secondDate);
            if (this.calendar.currentView === exports.McCalendarView.Month) {
                return firstYear === secondYear && firstMonth === secondMonth;
            }
            if (this.calendar.currentView === exports.McCalendarView.Year) {
                return firstYear === secondYear;
            }
            // Otherwise we are in 'multi-year' view.
            return Math.floor(firstYear / yearsPerPage) === Math.floor(secondYear / yearsPerPage);
        };
        return McCalendarHeader;
    }());
    /** @nocollapse */ McCalendarHeader.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McCalendarHeader, deps: [{ token: McDatepickerIntl }, { token: i0.forwardRef(function () { return McCalendar; }) }, { token: i1__namespace$1.DateAdapter, optional: true }, { token: i1$1.MC_DATE_FORMATS, optional: true }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McCalendarHeader.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McCalendarHeader, selector: "mc-calendar-header", host: { classAttribute: "mc-calendar-header" }, exportAs: ["mcCalendarHeader"], ngImport: i0__namespace, template: "<button mc-button\n        [tabindex]=\"'-1'\"\n        class=\"mc-button_transparent mc-calendar__period-button\"\n        (click)=\"currentPeriodClicked()\">\n    {{ periodButtonText }}\n\n    <i class=\"mc mc-icon\"\n       [class.mc-angle-up-M_16]=\"calendar.currentView !== 'month'\"\n       [class.mc-angle-down-M_16]=\"calendar.currentView === 'month'\">\n    </i>\n</button>\n\n<div class=\"mc-calendar-spacer\"></div>\n\n<button mc-button\n        [tabindex]=\"'-1'\"\n        class=\"mc-button_transparent mc-calendar__previous-button\"\n        [disabled]=\"!previousEnabled()\"\n        (click)=\"previousClicked()\">\n\n    <i mc-icon=\"mc-angle-left-L_16\"></i>\n</button>\n\n<button mc-button\n        [tabindex]=\"'-1'\"\n        class=\"mc-button_transparent mc-calendar__next-button\"\n        [disabled]=\"!nextEnabled()\"\n        (click)=\"nextClicked()\">\n\n    <i mc-icon=\"mc-angle-right-L_16\"></i>\n</button>\n", components: [{ type: i3__namespace.McButton, selector: "[mc-button]", inputs: ["color", "tabIndex", "disabled"] }, { type: i4__namespace.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i3__namespace.McButtonCssStyler, selector: "[mc-button]" }, { type: i4__namespace.McIconCSSStyler, selector: "[mc-icon]" }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McCalendarHeader, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-calendar-header',
                        templateUrl: 'calendar-header.html',
                        exportAs: 'mcCalendarHeader',
                        host: {
                            class: 'mc-calendar-header'
                        },
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () {
            return [{ type: McDatepickerIntl }, { type: McCalendar, decorators: [{
                            type: i0.Inject,
                            args: [i0.forwardRef(function () { return McCalendar; })]
                        }] }, { type: i1__namespace$1.DateAdapter, decorators: [{
                            type: i0.Optional
                        }] }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [i1$1.MC_DATE_FORMATS]
                        }] }, { type: i0__namespace.ChangeDetectorRef }];
        } });
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
            this.startView = exports.McCalendarView.Month;
            /** Emits when the currently selected date changes. */
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
            /** Emits when any date is selected. */
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
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
            configurable: true
        });
        McCalendar.prototype.ngAfterContentInit = function () {
            this.calendarHeaderPortal = new i8.ComponentPortal(this.headerComponent || McCalendarHeader);
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
            var view = this.currentView === exports.McCalendarView.Month ? this.monthView :
                (this.currentView === exports.McCalendarView.Year ? this.yearView : this.multiYearView);
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
        return McCalendar;
    }());
    /** @nocollapse */ McCalendar.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McCalendar, deps: [{ token: McDatepickerIntl }, { token: i1__namespace$1.DateAdapter, optional: true }, { token: i1$1.MC_DATE_FORMATS, optional: true }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McCalendar.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McCalendar, selector: "mc-calendar", inputs: { startAt: "startAt", selected: "selected", minDate: "minDate", maxDate: "maxDate", headerComponent: "headerComponent", startView: "startView", dateFilter: "dateFilter", dateClass: "dateClass" }, outputs: { selectedChange: "selectedChange", yearSelected: "yearSelected", monthSelected: "monthSelected", userSelection: "userSelection" }, host: { classAttribute: "mc-calendar" }, viewQueries: [{ propertyName: "monthView", first: true, predicate: McMonthView, descendants: true }, { propertyName: "yearView", first: true, predicate: McYearView, descendants: true }, { propertyName: "multiYearView", first: true, predicate: McMultiYearView, descendants: true }], exportAs: ["mcCalendar"], usesOnChanges: true, ngImport: i0__namespace, template: "<ng-template [cdkPortalOutlet]=\"calendarHeaderPortal\"></ng-template>\n\n<div class=\"mc-calendar__content\" [ngSwitch]=\"currentView\">\n    <mc-month-view\n        *ngSwitchCase=\"'month'\"\n        [(activeDate)]=\"activeDate\"\n        [selected]=\"selected\"\n        [dateFilter]=\"dateFilter\"\n        [maxDate]=\"maxDate\"\n        [minDate]=\"minDate\"\n        [dateClass]=\"dateClass\"\n        (selectedChange)=\"dateSelected($event!)\"\n        (userSelection)=\"userSelected()\">\n    </mc-month-view>\n\n    <mc-year-view\n        *ngSwitchCase=\"'year'\"\n        [(activeDate)]=\"activeDate\"\n        [selected]=\"selected\"\n        [dateFilter]=\"dateFilter\"\n        [maxDate]=\"maxDate\"\n        [minDate]=\"minDate\"\n        (monthSelected)=\"monthSelectedInYearView($event)\"\n        (selectedChange)=\"goToDateInView($event, 'multi-year')\">\n    </mc-year-view>\n\n    <mc-multi-year-view\n        *ngSwitchCase=\"'multi-year'\"\n        [(activeDate)]=\"activeDate\"\n        [selected]=\"selected\"\n        [dateFilter]=\"dateFilter\"\n        [maxDate]=\"maxDate\"\n        [minDate]=\"minDate\"\n        (yearSelected)=\"yearSelectedInMultiYearView($event)\"\n        (selectedChange)=\"goToDateInView($event, 'month')\">\n    </mc-multi-year-view>\n</div>\n", styles: [".mc-calendar{display:block}.mc-calendar-header{display:flex;padding:16px 8px 12px;padding:var(--mc-datepicker-calendar-size-padding-top, 16px) var(--mc-datepicker-calendar-size-padding-horizontal, 8px) var(--mc-datepicker-calendar-size-padding-blocks, 12px) var(--mc-datepicker-calendar-size-padding-horizontal, 8px)}.mc-calendar__content{padding:0 8px 8px;padding:0 var(--mc-datepicker-calendar-size-padding-horizontal, 8px) var(--mc-datepicker-calendar-size-padding-horizontal, 8px) var(--mc-datepicker-calendar-size-padding-horizontal, 8px);outline:none}.mc-calendar-spacer{flex:1 1 auto}.mc-calendar__period-button{min-width:0}.mc-calendar__period-button .mc-icon{vertical-align:baseline}.mc-calendar__previous-button:after{border-left-width:2px;border-left-width:var(--mc-datepicker-calendar-size-icon-border-width, 2px);transform:translate(2px) rotate(-45deg);transform:var(--mc-datepicker-calendar-size-icon-prev-icon-transform, translateX(2px) rotate(-45deg))}.mc-calendar__next-button:after{border-right-width:2px;border-right-width:var(--mc-datepicker-calendar-size-icon-border-width, 2px);transform:translate(-2px) rotate(45deg);transform:var(--mc-datepicker-calendar-size-icon-nex-icon-transform, translateX(-2px) rotate(45deg))}.mc-calendar__table{border-spacing:0;border-collapse:collapse;width:100%}.mc-calendar__table-header th{text-align:center;height:30px}.mc-calendar__table-header th.mc-calendar__table-header-divider{position:relative;height:calc(12px - 2px);height:calc(var(--mc-datepicker-calendar-size-padding-blocks, 12px) - 2px)}.mc-calendar__table-header th.mc-calendar__table-header-divider:after{content:\"\";position:absolute;top:0;left:calc(-1 * 8px);left:calc(-1 * var(--mc-datepicker-calendar-size-padding-horizontal, 8px));right:calc(-1 * 8px);right:calc(-1 * var(--mc-datepicker-calendar-size-padding-horizontal, 8px));height:1px;height:var(--mc-datepicker-calendar-size-divider-width, 1px)}\n"], components: [{ type: McMonthView, selector: "mc-month-view", inputs: ["activeDate", "selected", "minDate", "maxDate", "dateFilter", "dateClass"], outputs: ["selectedChange", "userSelection", "activeDateChange"], exportAs: ["mcMonthView"] }, { type: McYearView, selector: "mc-year-view", inputs: ["activeDate", "selected", "minDate", "maxDate", "dateFilter"], outputs: ["selectedChange", "monthSelected", "activeDateChange"], exportAs: ["mcYearView"] }, { type: McMultiYearView, selector: "mc-multi-year-view", inputs: ["activeDate", "selected", "minDate", "maxDate", "dateFilter"], outputs: ["selectedChange", "yearSelected", "activeDateChange"], exportAs: ["mcMultiYearView"] }], directives: [{ type: i8__namespace.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }, { type: i1__namespace.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i1__namespace.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McCalendar, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-calendar',
                        exportAs: 'mcCalendar',
                        templateUrl: 'calendar.html',
                        styleUrls: ['calendar.scss'],
                        host: {
                            class: 'mc-calendar'
                        },
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () {
            return [{ type: McDatepickerIntl }, { type: i1__namespace$1.DateAdapter, decorators: [{
                            type: i0.Optional
                        }] }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [i1$1.MC_DATE_FORMATS]
                        }] }, { type: i0__namespace.ChangeDetectorRef }];
        }, propDecorators: { startAt: [{
                    type: i0.Input
                }], selected: [{
                    type: i0.Input
                }], minDate: [{
                    type: i0.Input
                }], maxDate: [{
                    type: i0.Input
                }], headerComponent: [{
                    type: i0.Input
                }], startView: [{
                    type: i0.Input
                }], dateFilter: [{
                    type: i0.Input
                }], dateClass: [{
                    type: i0.Input
                }], selectedChange: [{
                    type: i0.Output
                }], yearSelected: [{
                    type: i0.Output
                }], monthSelected: [{
                    type: i0.Output
                }], userSelection: [{
                    type: i0.Output
                }], monthView: [{
                    type: i0.ViewChild,
                    args: [McMonthView, { static: false }]
                }], yearView: [{
                    type: i0.ViewChild,
                    args: [McYearView, { static: false }]
                }], multiYearView: [{
                    type: i0.ViewChild,
                    args: [McMultiYearView, { static: false }]
                }] } });

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    // tslint:disable:naming-convention
    var DateParts;
    (function (DateParts) {
        DateParts["year"] = "y";
        DateParts["month"] = "m";
        DateParts["day"] = "d";
    })(DateParts || (DateParts = {}));
    var MAX_YEAR = 9999;
    var DateDigit = /** @class */ (function () {
        function DateDigit(value, start, length) {
            this.value = value;
            this.start = start;
            this.length = length;
            this.maxDays = 31;
            this.maxMonth = 12;
            if (value === DateParts.day) {
                this.parse = this.parseDay;
            }
            else if (value === DateParts.month) {
                this.parse = this.parseMonth;
            }
            else if (value === DateParts.year) {
                this.parse = this.parseYear;
            }
        }
        Object.defineProperty(DateDigit.prototype, "end", {
            get: function () {
                return this.start + this.length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DateDigit.prototype, "isDay", {
            get: function () {
                return this.value === DateParts.day;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DateDigit.prototype, "isMonth", {
            get: function () {
                return this.value === DateParts.month;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DateDigit.prototype, "isYear", {
            get: function () {
                return this.value === DateParts.year;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DateDigit.prototype, "fullName", {
            get: function () {
                if (this.isDay) {
                    return 'date';
                }
                if (this.isMonth) {
                    return 'month';
                }
                if (this.isYear) {
                    return 'year';
                }
            },
            enumerable: false,
            configurable: true
        });
        DateDigit.prototype.parseDay = function (value) {
            var parsedValue = parseInt(value);
            if (parsedValue === 0) {
                return 1;
            }
            if (parsedValue > this.maxDays) {
                return this.maxDays;
            }
            return parsedValue;
        };
        DateDigit.prototype.parseMonth = function (value) {
            var parsedValue = parseInt(value);
            if (parsedValue === 0) {
                return 1;
            }
            if (parsedValue > this.maxMonth) {
                return this.maxMonth;
            }
            return parsedValue;
        };
        DateDigit.prototype.parseYear = function (value) {
            var parsedValue = parseInt(value);
            if (parsedValue === 0) {
                return 1;
            }
            if (parsedValue > MAX_YEAR) {
                return MAX_YEAR;
            }
            return parsedValue;
        };
        return DateDigit;
    }());
    /** @docs-private */
    var MC_DATEPICKER_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return McDatepickerInput; }),
        multi: true
    };
    /** @docs-private */
    var MC_DATEPICKER_VALIDATORS = {
        provide: forms.NG_VALIDATORS,
        useExisting: i0.forwardRef(function () { return McDatepickerInput; }),
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
    var uniqueComponentIdSuffix = 0;
    /** Directive used to connect an input to a McDatepicker. */
    var McDatepickerInput = /** @class */ (function () {
        function McDatepickerInput(elementRef, renderer, dateAdapter, dateFormats) {
            var _this = this;
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.dateAdapter = dateAdapter;
            this.dateFormats = dateFormats;
            this.stateChanges = new rxjs.Subject();
            this.controlType = 'datepicker';
            this.focused = false;
            /** Emits when the value changes (either due to user input or programmatic change). */
            this.valueChange = new i0.EventEmitter();
            /** Emits when the disabled state has changed */
            this.disabledChange = new i0.EventEmitter();
            this._disabled = false;
            this.incorrectInput = new i0.EventEmitter();
            /** Emits when a `change` event is fired on this `<input>`. */
            this.dateChange = new i0.EventEmitter();
            /** Emits when an `input` event is fired on this `<input>`. */
            this.dateInput = new i0.EventEmitter();
            this.uid = "mc-datepicker-" + uniqueComponentIdSuffix++;
            this.datepickerSubscription = rxjs.Subscription.EMPTY;
            this.localeSubscription = rxjs.Subscription.EMPTY;
            /** Whether the last value set on the input was valid. */
            this.lastValueValid = false;
            this.onTouched = function () { };
            this.onInput = function () {
                _this.correctCursorPosition();
                var formattedValue = _this.replaceSymbols(_this.viewValue);
                var newTimeObj = _this.getDateFromString(formattedValue);
                _this.lastValueValid = !!newTimeObj;
                if (!newTimeObj) {
                    if (!_this.viewValue) {
                        _this._value = null;
                        _this.cvaOnChange(null);
                    }
                    _this.control.updateValueAndValidity({ emitEvent: false });
                    return;
                }
                _this.setViewValue(_this.getTimeStringFromDate(newTimeObj, _this.dateFormats.dateInput), true);
                _this.selectNextDigitByCursor(_this.selectionStart);
                _this.updateValue(newTimeObj);
            };
            this.parseOnBlur = function () {
                if (!_this.viewValue) {
                    return null;
                }
                var date = _this.getDefaultValue();
                var viewDigits = _this.viewValue
                    .split(_this.separator)
                    .map(function (value) { return value; })
                    .filter(function (value) { return value; });
                var _d = __read(viewDigits, 3), firsViewDigit = _d[0], secondViewDigit = _d[1], thirdViewDigit = _d[2];
                // tslint:disable-next-line:no-magic-numbers
                if (viewDigits.length !== 3) {
                    _this.lastValueValid = false;
                    _this._value = null;
                    return setTimeout(function () { return _this.control.updateValueAndValidity(); });
                }
                date[_this.firstDigit.fullName] = _this.firstDigit.parse(firsViewDigit);
                date[_this.secondDigit.fullName] = _this.secondDigit.parse(secondViewDigit);
                date[_this.thirdDigit.fullName] = _this.thirdDigit.parse(thirdViewDigit);
                var _e = __read([_this.firstDigit, _this.secondDigit, _this.thirdDigit]
                    .reduce(function (acc, digit, index) { return digit.value === DateParts.year ? [digit, viewDigits[index]] : acc; }, []), 2), digitWithYear = _e[0], viewDigitWithYear = _e[1];
                // tslint:disable-next-line:no-magic-numbers
                if (viewDigitWithYear.length < 3) {
                    // tslint:disable-next-line:no-magic-numbers
                    date.year += date.year < 30 ? 2000 : 1900;
                }
                else if (viewDigitWithYear.length < digitWithYear.length) {
                    _this.lastValueValid = false;
                    _this._value = null;
                    return setTimeout(function () { return _this.control.updateValueAndValidity(); });
                }
                if (Object.values(date).some(isNaN)) {
                    return;
                }
                var newTimeObj = _this.getValidDateOrNull(_this.dateAdapter.createDateTime(date.year, date.month - 1, date.date, date.hours, date.minutes, date.seconds, date.milliseconds));
                _this.lastValueValid = !!newTimeObj;
                _this.setViewValue(_this.getTimeStringFromDate(newTimeObj, _this.dateFormats.dateInput), true);
                _this.updateValue(newTimeObj);
            };
            this.updateLocaleParams = function () {
                _this.setFormat(_this.dateFormats.dateInput);
                _this.value = _this.value;
            };
            this.cvaOnChange = function () { };
            this.validatorOnChange = function () { };
            /** The form control validator for whether the input parses. */
            this.parseValidator = function () {
                return _this.focused ||
                    _this.empty ||
                    _this.lastValueValid ? null : { mcDatepickerParse: { text: _this.elementRef.nativeElement.value } };
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
            this.setFormat(dateFormats.dateInput);
            this.localeSubscription = dateAdapter.localeChanges
                .subscribe(this.updateLocaleParams);
        }
        Object.defineProperty(McDatepickerInput.prototype, "required", {
            get: function () {
                return this._required;
            },
            set: function (value) {
                this._required = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
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
                this.datepickerSubscription = this.datepicker.selectedChanged
                    .subscribe(function (selected) {
                    _this.value = selected;
                    _this.cvaOnChange(selected);
                    _this.onTouched();
                    _this.dateChange.emit(new McDatepickerInputEvent(_this, _this.elementRef.nativeElement));
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepickerInput.prototype, "mcDatepickerFilter", {
            /** Function that can be used to filter out dates within the datepicker. */
            set: function (value) {
                this.dateFilter = value;
                this.validatorOnChange();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepickerInput.prototype, "value", {
            /** The value of the input. */
            get: function () {
                return this._value;
            },
            set: function (value) {
                var newValue = this.dateAdapter.deserialize(value);
                this.lastValueValid = !newValue || this.dateAdapter.isValid(newValue);
                newValue = this.getValidDateOrNull(newValue);
                var oldDate = this.value;
                this._value = newValue;
                this.formatValue(newValue);
                if (!this.dateAdapter.sameDate(oldDate, newValue)) {
                    this.valueChange.emit(newValue);
                }
            },
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepickerInput.prototype, "disabled", {
            /** Whether the datepicker-input is disabled. */
            get: function () {
                return this._disabled;
            },
            set: function (value) {
                var newValue = coercion.coerceBooleanProperty(value);
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
        Object.defineProperty(McDatepickerInput.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (value) {
                this._id = value || this.uid;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepickerInput.prototype, "mcValidationTooltip", {
            set: function (tooltip) {
                if (!tooltip) {
                    return;
                }
                tooltip.enterDelay = core.validationTooltipShowDelay;
                tooltip.trigger = 'manual';
                tooltip.initListeners();
                this.incorrectInput.subscribe(function () {
                    if (tooltip.isOpen) {
                        return;
                    }
                    tooltip.show();
                    setTimeout(function () { return tooltip.hide(); }, core.validationTooltipHideDelay);
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepickerInput.prototype, "empty", {
            get: function () {
                return !this.viewValue && !this.isBadInput();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepickerInput.prototype, "viewValue", {
            get: function () {
                return this.elementRef.nativeElement.value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepickerInput.prototype, "ngControl", {
            get: function () {
                return this.control;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepickerInput.prototype, "isReadOnly", {
            get: function () {
                return this.elementRef.nativeElement.readOnly;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepickerInput.prototype, "selectionStart", {
            get: function () {
                return this.elementRef.nativeElement.selectionStart;
            },
            set: function (value) {
                this.elementRef.nativeElement.selectionStart = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepickerInput.prototype, "selectionEnd", {
            get: function () {
                return this.elementRef.nativeElement.selectionEnd;
            },
            set: function (value) {
                this.elementRef.nativeElement.selectionEnd = value;
            },
            enumerable: false,
            configurable: true
        });
        McDatepickerInput.prototype.onContainerClick = function () {
            this.focus();
        };
        McDatepickerInput.prototype.focus = function () {
            this.elementRef.nativeElement.focus();
        };
        McDatepickerInput.prototype.focusChanged = function (isFocused) {
            if (isFocused !== this.focused) {
                this.focused = isFocused;
                this.onTouched();
                this.stateChanges.next();
            }
        };
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
        McDatepickerInput.prototype.validate = function (control) {
            this.setControl(control);
            return this.validator ? this.validator(control) : null;
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
        McDatepickerInput.prototype.onKeyDown = function (event) {
            var _a;
            if (this.isReadOnly) {
                return;
            }
            // tslint:disable-next-line: deprecation
            var keyCode = event.keyCode;
            if (this.isLetterKey(event)) {
                event.preventDefault();
                this.incorrectInput.emit();
            }
            else if (this.isKeyForOpen(event)) {
                event.preventDefault();
                (_a = this.datepicker) === null || _a === void 0 ? void 0 : _a.open();
            }
            else if (this.isKeyForClose(event)) {
                event.preventDefault();
                this.datepicker.close();
            }
            else if (keyCode === keycodes.TAB) {
                this.datepicker.close(false);
            }
            else if (this.isKeyForByPass(event)) {
                return;
            }
            else if (keyCode === keycodes.SPACE) {
                this.spaceKeyHandler(event);
            }
            else if ([keycodes.UP_ARROW, keycodes.DOWN_ARROW].includes(keyCode)) {
                event.preventDefault();
                this.verticalArrowKeyHandler(keyCode);
            }
            else if ([keycodes.LEFT_ARROW, keycodes.RIGHT_ARROW, keycodes.HOME, keycodes.PAGE_UP, keycodes.END, keycodes.PAGE_DOWN].includes(keyCode)) {
                event.preventDefault();
                this.changeCaretPosition(keyCode);
            }
            else if (/^\D$/.test(event.key)) {
                event.preventDefault();
                var newValue = this.getNewValue(event.key, this.selectionStart);
                var formattedValue = this.replaceSymbols(newValue);
                if (newValue !== formattedValue) {
                    this.setViewValue(formattedValue, true);
                    setTimeout(this.onInput);
                }
                else {
                    this.incorrectInput.emit();
                }
            }
            else {
                setTimeout(this.onInput);
            }
        };
        McDatepickerInput.prototype.onChange = function () {
            this.dateChange.emit(new McDatepickerInputEvent(this, this.elementRef.nativeElement));
        };
        /** Handles blur events on the input. */
        McDatepickerInput.prototype.onBlur = function () {
            // Reformat the input only if we have a valid value.
            this.parseOnBlur();
            this.focusChanged(false);
        };
        McDatepickerInput.prototype.onPaste = function ($event) {
            var _a, _b, _c;
            $event.preventDefault();
            var rawValue = $event.clipboardData.getData('text');
            if (rawValue.match(/^\d\D/)) {
                rawValue = "0" + rawValue;
            }
            rawValue.replace(/[^A-Za-z0-9]+/g, this.separator);
            if (/[a-z]/gi.test(rawValue)) {
                this.incorrectInput.emit();
            }
            var match = rawValue.match(/^(?<first>\d+)\W(?<second>\d+)\W(?<third>\d+)$/);
            if (!((_a = match === null || match === void 0 ? void 0 : match.groups) === null || _a === void 0 ? void 0 : _a.first) || !((_b = match === null || match === void 0 ? void 0 : match.groups) === null || _b === void 0 ? void 0 : _b.second) || !((_c = match === null || match === void 0 ? void 0 : match.groups) === null || _c === void 0 ? void 0 : _c.third)) {
                this.setViewValue(rawValue);
                return rawValue;
            }
            var value = [match.groups.first, match.groups.second, match.groups.third].join(this.separator);
            var newTimeObj = this.getDateFromString(value);
            if (!newTimeObj) {
                this.setViewValue(value);
                return value;
            }
            this.setViewValue(this.getTimeStringFromDate(newTimeObj, this.dateFormats.dateInput));
            this.updateValue(newTimeObj);
        };
        McDatepickerInput.prototype.toISO8601 = function (value) {
            return this.dateAdapter.toIso8601(value);
        };
        McDatepickerInput.prototype.setFormat = function (format) {
            var _this = this;
            this.separator = format.match(/[aA-zZ]+(?<separator>\W|\D)[aA-zZ]+/).groups.separator;
            this.separatorPositions = format
                .split('')
                .reduce(function (acc, item, index) { return _this.separator === item ? __spreadArray(__spreadArray([], __read(acc)), [index + 1]) : acc; }, []);
            this.getDigitPositions(format);
        };
        McDatepickerInput.prototype.updateValue = function (newValue) {
            if (!this.dateAdapter.sameDate(newValue, this.value)) {
                this._value = newValue;
                this.cvaOnChange(newValue);
                this.valueChange.emit(newValue);
                this.dateInput.emit(new McDatepickerInputEvent(this, this.elementRef.nativeElement));
            }
            this.control.updateValueAndValidity({ emitEvent: false });
        };
        McDatepickerInput.prototype.isKeyForClose = function (event) {
            // tslint:disable-next-line: deprecation
            return (event.altKey && event.keyCode === keycodes.UP_ARROW) || event.keyCode === keycodes.ESCAPE;
        };
        McDatepickerInput.prototype.isKeyForOpen = function (event) {
            // tslint:disable-next-line: deprecation
            return event.altKey && event.keyCode === keycodes.DOWN_ARROW;
        };
        McDatepickerInput.prototype.isLetterKey = function (event) {
            return keycodes.isLetterKey(event) && !event.ctrlKey && !event.metaKey;
        };
        McDatepickerInput.prototype.isKeyForByPass = function (event) {
            // tslint:disable-next-line: deprecation
            return (keycodes.hasModifierKey(event) && (keycodes.isVerticalMovement(event.keyCode) || keycodes.isHorizontalMovement(event.keyCode))) ||
                event.ctrlKey ||
                event.metaKey;
        };
        McDatepickerInput.prototype.spaceKeyHandler = function (event) {
            event.preventDefault();
            if (this.selectionStart === this.selectionEnd) {
                var value = this.getNewValue(event.key, this.selectionStart);
                this.setViewValue(value);
                setTimeout(this.onInput);
            }
            else if (this.selectionStart !== this.selectionEnd) {
                this.selectNextDigit(this.selectionStart, true);
            }
        };
        McDatepickerInput.prototype.getNewValue = function (key, position) {
            return [this.viewValue.slice(0, position), key, this.viewValue.slice(position)].join('');
        };
        McDatepickerInput.prototype.setViewValue = function (value, savePosition) {
            if (savePosition === void 0) { savePosition = false; }
            if (savePosition) {
                var selectionStart = this.selectionStart;
                var selectionEnd = this.selectionEnd;
                this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
                this.selectionStart = selectionStart;
                this.selectionEnd = selectionEnd;
            }
            else {
                this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
            }
        };
        McDatepickerInput.prototype.replaceSymbols = function (value) {
            return value
                .split(this.separator)
                .map(function (part) { return part.replace(/^([0-9]+)\W$/, '0$1'); })
                .join(this.separator);
        };
        McDatepickerInput.prototype.getDateFromString = function (timeString) {
            if (!timeString || timeString.length < this.firstDigit.length) {
                return null;
            }
            var date = this.getDefaultValue();
            var viewDigits = timeString
                .split(this.separator)
                .map(function (value) { return value; });
            var _d = __read(viewDigits, 3), firsViewDigit = _d[0], secondViewDigit = _d[1], thirdViewDigit = _d[2];
            if (viewDigits.length === 1) {
                if (firsViewDigit.length < this.firstDigit.length) {
                    return null;
                }
                date[this.firstDigit.fullName] = this.firstDigit.parse(firsViewDigit);
                date.month = 1;
                // tslint:disable-next-line:no-magic-numbers
            }
            else if (viewDigits.length === 2) {
                if (firsViewDigit.length < this.firstDigit.length || secondViewDigit.length < this.secondDigit.length) {
                    return null;
                }
                date[this.firstDigit.fullName] = this.firstDigit.parse(firsViewDigit);
                date[this.secondDigit.fullName] = this.secondDigit.parse(secondViewDigit);
                // tslint:disable-next-line:no-magic-numbers
            }
            else if (viewDigits.length === 3) {
                if (firsViewDigit.length < this.firstDigit.length ||
                    secondViewDigit.length < this.secondDigit.length ||
                    thirdViewDigit.length < this.thirdDigit.length) {
                    return null;
                }
                date[this.firstDigit.fullName] = this.firstDigit.parse(firsViewDigit);
                date[this.secondDigit.fullName] = this.secondDigit.parse(secondViewDigit);
                date[this.thirdDigit.fullName] = this.thirdDigit.parse(thirdViewDigit);
            }
            else {
                return null;
            }
            return this.getValidDateOrNull(this.dateAdapter.createDateTime(date.year, date.month - 1, date.date, date.hours, date.minutes, date.seconds, date.milliseconds));
        };
        McDatepickerInput.prototype.getDefaultValue = function () {
            var defaultValue = this.value || this.dateAdapter.today();
            return {
                year: this.dateAdapter.getYear(defaultValue),
                month: this.dateAdapter.getMonth(defaultValue),
                date: this.dateAdapter.getDate(defaultValue),
                hours: this.dateAdapter.getHours(defaultValue),
                minutes: this.dateAdapter.getMinutes(defaultValue),
                seconds: this.dateAdapter.getSeconds(defaultValue),
                milliseconds: this.dateAdapter.getMilliseconds(defaultValue)
            };
        };
        McDatepickerInput.prototype.getTimeStringFromDate = function (value, timeFormat) {
            if (!value || !this.dateAdapter.isValid(value)) {
                return '';
            }
            return this.dateAdapter.format(value, timeFormat);
        };
        McDatepickerInput.prototype.getDateEditMetrics = function (cursorPosition) {
            var e_1, _d;
            try {
                for (var _e = __values([this.firstDigit, this.secondDigit, this.thirdDigit]), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var digit = _f.value;
                    if (cursorPosition >= digit.start && cursorPosition <= digit.end) {
                        return [digit.value, digit.start, digit.end];
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_d = _e.return)) _d.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return [this.thirdDigit.value, this.thirdDigit.start, this.thirdDigit.end];
        };
        McDatepickerInput.prototype.incrementDate = function (dateVal, whatToIncrement) {
            var year = this.dateAdapter.getYear(dateVal);
            var month = this.dateAdapter.getMonth(dateVal);
            var day = this.dateAdapter.getDate(dateVal);
            switch (whatToIncrement) {
                case DateParts.day:
                    day++;
                    if (day > this.dateAdapter.getNumDaysInMonth(dateVal)) {
                        day = 1;
                    }
                    break;
                case DateParts.month:
                    month++;
                    // tslint:disable-next-line:no-magic-numbers
                    if (month > 11) {
                        month = 0;
                    }
                    var lastDay = this.getLastDayFor(year, month);
                    if (day > lastDay) {
                        day = lastDay;
                    }
                    break;
                case DateParts.year:
                    year++;
                    if (year > MAX_YEAR) {
                        year = 1;
                    }
                    break;
                default:
            }
            return this.createDate(year, month, day);
        };
        McDatepickerInput.prototype.getLastDayFor = function (year, month) {
            return this.dateAdapter.getNumDaysInMonth(this.createDate(year, month, 1));
        };
        McDatepickerInput.prototype.decrementDate = function (dateVal, whatToDecrement) {
            var year = this.dateAdapter.getYear(dateVal);
            var month = this.dateAdapter.getMonth(dateVal);
            var day = this.dateAdapter.getDate(dateVal);
            switch (whatToDecrement) {
                case DateParts.day:
                    day--;
                    if (day < 1) {
                        day = this.dateAdapter.getNumDaysInMonth(dateVal);
                    }
                    break;
                case DateParts.month:
                    month--;
                    if (month < 0) {
                        // tslint:disable-next-line:no-magic-numbers
                        month = 11;
                    }
                    var lastDay = this.getLastDayFor(year, month);
                    if (day > lastDay) {
                        day = lastDay;
                    }
                    break;
                case DateParts.year:
                    year--;
                    if (year < 1) {
                        year = MAX_YEAR;
                    }
                    break;
                default:
            }
            return this.createDate(year, month, day);
        };
        McDatepickerInput.prototype.verticalArrowKeyHandler = function (keyCode) {
            if (!this.value) {
                return;
            }
            var changedTime;
            var _d = __read(this.getDateEditMetrics(this.selectionStart), 3), modifiedTimePart = _d[0], selectionStart = _d[1], selectionEnd = _d[2];
            if (keyCode === keycodes.UP_ARROW) {
                changedTime = this.incrementDate(this.value, modifiedTimePart);
            }
            if (keyCode === keycodes.DOWN_ARROW) {
                changedTime = this.decrementDate(this.value, modifiedTimePart);
            }
            this.value = changedTime;
            this.selectionStart = selectionStart;
            this.selectionEnd = selectionEnd;
            this.cvaOnChange(changedTime);
            this.onChange();
            this.stateChanges.next();
        };
        McDatepickerInput.prototype.changeCaretPosition = function (keyCode) {
            if (!this.value) {
                return;
            }
            var cursorPos = this.selectionStart;
            if ([keycodes.HOME, keycodes.PAGE_UP].includes(keyCode)) {
                cursorPos = 0;
            }
            else if ([keycodes.END, keycodes.PAGE_DOWN].includes(keyCode)) {
                cursorPos = this.viewValue.length;
            }
            else if (keyCode === keycodes.LEFT_ARROW) {
                cursorPos = cursorPos === 0 ? this.viewValue.length : cursorPos - 1;
            }
            else if (keyCode === keycodes.RIGHT_ARROW) {
                var nextSeparatorPos = this.viewValue.indexOf(this.separator, cursorPos);
                cursorPos = nextSeparatorPos ? nextSeparatorPos + 1 : 0;
            }
            this.selectDigitByCursor(cursorPos);
        };
        McDatepickerInput.prototype.selectDigitByCursor = function (cursorPos) {
            var _this = this;
            setTimeout(function () {
                var _d = __read(_this.getDateEditMetrics(cursorPos), 3), selectionStart = _d[1], selectionEnd = _d[2];
                _this.selectionStart = selectionStart;
                _this.selectionEnd = selectionEnd;
            });
        };
        McDatepickerInput.prototype.selectNextDigitByCursor = function (cursorPos) {
            var _this = this;
            setTimeout(function () {
                var _d = __read(_this.getDateEditMetrics(cursorPos), 3), endPositionOfCurrentDigit = _d[2];
                var _e = __read(_this.getDateEditMetrics(endPositionOfCurrentDigit + 1), 3), selectionStart = _e[1], selectionEnd = _e[2];
                _this.selectionStart = selectionStart;
                _this.selectionEnd = selectionEnd;
            });
        };
        McDatepickerInput.prototype.selectNextDigit = function (cursorPos, cycle) {
            var _this = this;
            if (cycle === void 0) { cycle = false; }
            setTimeout(function () {
                var lastValue = cycle ? 0 : cursorPos;
                var nextSeparatorPos = _this.viewValue.indexOf(_this.separator, cursorPos);
                var newCursorPos = nextSeparatorPos > 0 ? nextSeparatorPos + 1 : lastValue;
                var _d = __read(_this.getDateEditMetrics(newCursorPos), 3), selectionStart = _d[1], selectionEnd = _d[2];
                _this.selectionStart = selectionStart;
                _this.selectionEnd = selectionEnd;
            });
        };
        /** Checks whether the input is invalid based on the native validation. */
        McDatepickerInput.prototype.isBadInput = function () {
            var validity = this.elementRef.nativeElement.validity;
            return validity && validity.badInput;
        };
        /** Formats a value and sets it on the input element. */
        McDatepickerInput.prototype.formatValue = function (value) {
            var formattedValue = value ? this.dateAdapter.format(value, this.dateFormats.dateInput) : '';
            this.setViewValue(formattedValue);
        };
        /**
         * @param obj The object to check.
         * @returns The given object if it is both a date instance and valid, otherwise null.
         */
        McDatepickerInput.prototype.getValidDateOrNull = function (obj) {
            return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
        };
        McDatepickerInput.prototype.setControl = function (control) {
            if (!this.control) {
                this.control = control;
            }
        };
        McDatepickerInput.prototype.getDigitPositions = function (format) {
            var _this = this;
            var formatInLowerCase = format.toLowerCase();
            formatInLowerCase
                .split('')
                .reduce(function (_d, value, index, arr) {
                var prev = _d.prev, length = _d.length, start = _d.start;
                if (value === _this.separator || (arr.length - 1) === index) {
                    if (!_this.firstDigit) {
                        _this.firstDigit = new DateDigit(prev, start, length);
                    }
                    else if (!_this.secondDigit) {
                        _this.secondDigit = new DateDigit(prev, start, length);
                    }
                    else if (!_this.thirdDigit) {
                        _this.thirdDigit = new DateDigit(prev, start, arr.length - start);
                    }
                    // tslint:disable:no-parameter-reassignment
                    length = 0;
                    start = index + 1;
                }
                else {
                    length++;
                }
                return { prev: value, length: length, start: start };
            }, { length: 0, start: 0 });
            if (!this.firstDigit || !this.secondDigit || !this.thirdDigit) {
                Error("Can' t use this format: " + format);
            }
        };
        McDatepickerInput.prototype.createDate = function (year, month, day) {
            return this.dateAdapter.createDateTime(year, month, day, this.dateAdapter.getHours(this.value), this.dateAdapter.getMinutes(this.value), this.dateAdapter.getSeconds(this.value), this.dateAdapter.getMilliseconds(this.value));
        };
        McDatepickerInput.prototype.correctCursorPosition = function () {
            if (this.selectionStart && this.separatorPositions.includes(this.selectionStart)) {
                this.selectionStart = this.selectionStart - 1;
            }
        };
        return McDatepickerInput;
    }());
    /** @nocollapse */ McDatepickerInput.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McDatepickerInput, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.Renderer2 }, { token: i1__namespace$1.DateAdapter, optional: true }, { token: i1$1.MC_DATE_FORMATS, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McDatepickerInput.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McDatepickerInput, selector: "input[mcDatepicker]", inputs: { placeholder: "placeholder", required: "required", mcDatepicker: "mcDatepicker", mcDatepickerFilter: "mcDatepickerFilter", value: "value", min: "min", max: "max", disabled: "disabled", id: "id", mcValidationTooltip: "mcValidationTooltip" }, outputs: { incorrectInput: "incorrectInput", dateChange: "dateChange", dateInput: "dateInput" }, host: { listeners: { "paste": "onPaste($event)", "change": "onChange()", "focus": "focusChanged(true)", "blur": "onBlur()", "keydown": "onKeyDown($event)" }, properties: { "attr.placeholder": "placeholder", "attr.required": "required", "attr.disabled": "disabled || null", "attr.min": "min ? toISO8601(min) : null", "attr.max": "max ? toISO8601(max) : null", "attr.autocomplete": "\"off\"" }, classAttribute: "mc-input mc-datepicker" }, providers: [
            MC_DATEPICKER_VALUE_ACCESSOR,
            MC_DATEPICKER_VALIDATORS,
            { provide: formField.McFormFieldControl, useExisting: McDatepickerInput }
        ], exportAs: ["mcDatepickerInput"], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McDatepickerInput, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: 'input[mcDatepicker]',
                        exportAs: 'mcDatepickerInput',
                        providers: [
                            MC_DATEPICKER_VALUE_ACCESSOR,
                            MC_DATEPICKER_VALIDATORS,
                            { provide: formField.McFormFieldControl, useExisting: McDatepickerInput }
                        ],
                        host: {
                            class: 'mc-input mc-datepicker',
                            '[attr.placeholder]': 'placeholder',
                            '[attr.required]': 'required',
                            '[attr.disabled]': 'disabled || null',
                            '[attr.min]': 'min ? toISO8601(min) : null',
                            '[attr.max]': 'max ? toISO8601(max) : null',
                            '[attr.autocomplete]': '"off"',
                            '(paste)': 'onPaste($event)',
                            '(change)': 'onChange()',
                            '(focus)': 'focusChanged(true)',
                            '(blur)': 'onBlur()',
                            '(keydown)': 'onKeyDown($event)'
                        }
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.Renderer2 }, { type: i1__namespace$1.DateAdapter, decorators: [{
                            type: i0.Optional
                        }] }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [i1$1.MC_DATE_FORMATS]
                        }] }];
        }, propDecorators: { placeholder: [{
                    type: i0.Input
                }], required: [{
                    type: i0.Input
                }], mcDatepicker: [{
                    type: i0.Input
                }], mcDatepickerFilter: [{
                    type: i0.Input
                }], value: [{
                    type: i0.Input
                }], min: [{
                    type: i0.Input
                }], max: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], id: [{
                    type: i0.Input
                }], mcValidationTooltip: [{
                    type: i0.Input
                }], incorrectInput: [{
                    type: i0.Output
                }], dateChange: [{
                    type: i0.Output
                }], dateInput: [{
                    type: i0.Output
                }] } });

    /** Can be used to override the icon of a `mcDatepickerToggle`. */
    var McDatepickerToggleIcon = /** @class */ (function () {
        function McDatepickerToggleIcon() {
        }
        return McDatepickerToggleIcon;
    }());
    /** @nocollapse */ McDatepickerToggleIcon.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McDatepickerToggleIcon, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McDatepickerToggleIcon.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McDatepickerToggleIcon, selector: "[mcDatepickerToggleIcon]", ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McDatepickerToggleIcon, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[mcDatepickerToggleIcon]'
                    }]
            }] });
    var McDatepickerToggle = /** @class */ (function () {
        function McDatepickerToggle(intl, changeDetectorRef) {
            this.intl = intl;
            this.changeDetectorRef = changeDetectorRef;
            this.stateChanges = rxjs.Subscription.EMPTY;
        }
        Object.defineProperty(McDatepickerToggle.prototype, "disabled", {
            /** Whether the toggle button is disabled. */
            get: function () {
                return this._disabled === undefined ? this.datepicker.disabled : this._disabled;
            },
            set: function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
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
            var datepickerDisabled = this.datepicker ? this.datepicker.disabledChange : rxjs.of();
            var inputDisabled = this.datepicker && this.datepicker.datepickerInput ?
                this.datepicker.datepickerInput.disabledChange : rxjs.of();
            var datepickerToggled = this.datepicker ?
                rxjs.merge(this.datepicker.openedStream, this.datepicker.closedStream) :
                rxjs.of();
            this.stateChanges.unsubscribe();
            this.stateChanges = rxjs.merge(this.intl.changes, datepickerDisabled, inputDisabled, datepickerToggled).subscribe(function () { return _this.changeDetectorRef.markForCheck(); });
        };
        return McDatepickerToggle;
    }());
    /** @nocollapse */ McDatepickerToggle.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McDatepickerToggle, deps: [{ token: McDatepickerIntl }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McDatepickerToggle.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McDatepickerToggle, selector: "mc-datepicker-toggle", inputs: { disabled: "disabled", datepicker: ["for", "datepicker"], tabIndex: "tabIndex" }, host: { properties: { "class.mc-active": "datepicker && datepicker.opened" }, classAttribute: "mc-datepicker-toggle" }, queries: [{ propertyName: "customIcon", first: true, predicate: McDatepickerToggleIcon, descendants: true }], viewQueries: [{ propertyName: "button", first: true, predicate: ["button"], descendants: true }], exportAs: ["mcDatepickerToggle"], usesOnChanges: true, ngImport: i0__namespace, template: "<!--todo need simplify this-->\n<button\n    #button\n    mc-button\n    type=\"button\"\n    class=\"mc-datepicker-toggle__button\"\n    aria-haspopup=\"true\"\n    [attr.aria-label]=\"intl.openCalendarLabel\"\n    [tabIndex]=\"tabIndex\"\n    [disabled]=\"disabled\"\n    (click)=\"open($event)\">\n\n    <i *ngIf=\"!customIcon\" mc-icon=\"mc-calendar_16\" class=\"mc-datepicker-toggle__default-icon\"></i>\n\n    <ng-content select=\"[mcDatepickerToggleIcon]\"></ng-content>\n</button>\n", styles: [".mc-datepicker-toggle:focus{outline:0}.mc-datepicker-toggle__button.mc-icon-button{width:30px;width:var(--mc-datepicker-toggle-size-width, 30px);height:30px;height:var(--mc-datepicker-toggle-size-height, 30px);margin-left:2px}.mc-form-field-appearance-legacy .mc-form-field-prefix .mc-datepicker-toggle__default-icon,.mc-form-field-appearance-legacy .mc-form-field-suffix .mc-datepicker-toggle__default-icon{width:1em}.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-prefix .mc-datepicker-toggle__default-icon,.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-suffix .mc-datepicker-toggle__default-icon{display:block;width:1.5em;height:1.5em}.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-prefix .mc-icon-button .mc-datepicker-toggle__default-icon,.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-suffix .mc-icon-button .mc-datepicker-toggle__default-icon{margin:auto}\n"], components: [{ type: i3__namespace.McButton, selector: "[mc-button]", inputs: ["color", "tabIndex", "disabled"] }, { type: i4__namespace.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i3__namespace.McButtonCssStyler, selector: "[mc-button]" }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace.McIconCSSStyler, selector: "[mc-icon]" }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McDatepickerToggle, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-datepicker-toggle',
                        templateUrl: 'datepicker-toggle.html',
                        styleUrls: ['datepicker-toggle.scss'],
                        host: {
                            class: 'mc-datepicker-toggle',
                            '[class.mc-active]': 'datepicker && datepicker.opened'
                        },
                        exportAs: 'mcDatepickerToggle',
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () { return [{ type: McDatepickerIntl }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { disabled: [{
                    type: i0.Input
                }], datepicker: [{
                    type: i0.Input,
                    args: ['for']
                }], tabIndex: [{
                    type: i0.Input
                }], customIcon: [{
                    type: i0.ContentChild,
                    args: [McDatepickerToggleIcon, { static: false }]
                }], button: [{
                    type: i0.ViewChild,
                    args: ['button', { static: false }]
                }] } });

    /**
     * Animations used by the mosaic datepicker.
     * @docs-private
     */
    var mcDatepickerAnimations = {
        /** Transforms the height of the datepicker's calendar. */
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
        /** Fades in the content of the calendar. */
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
        Element.prototype.matches = Element.prototype.msMatchesSelector;
    }

    /** Used to generate a unique ID for each datepicker instance. */
    var datepickerUid = 0;
    /** Injection token that determines the scroll handling while the calendar is open. */
    var MC_DATEPICKER_SCROLL_STRATEGY = new i0.InjectionToken('mc-datepicker-scroll-strategy');
    /** @docs-private */
    // tslint:disable-next-line:naming-convention
    function MC_DATEPICKER_SCROLL_STRATEGY_FACTORY(overlay) {
        return function () { return overlay.scrollStrategies.reposition(); };
    }
    /** @docs-private */
    var MC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
        provide: MC_DATEPICKER_SCROLL_STRATEGY,
        deps: [i3$1.Overlay],
        useFactory: MC_DATEPICKER_SCROLL_STRATEGY_FACTORY
    };
    /**
     * Component used as the content for the datepicker dialog and popup. We use this instead of using
     * McCalendar directly as the content so we can control the initial focus. This also gives us a
     * place to put additional features of the popup that are not part of the calendar itself in the
     * future. (e.g. confirmation buttons).
     * @docs-private
     */
    var McDatepickerContent = /** @class */ (function () {
        function McDatepickerContent(changeDetectorRef) {
            this.changeDetectorRef = changeDetectorRef;
            /** Emits when an animation has finished. */
            this.animationDone = new rxjs.Subject();
            this.subscriptions = new rxjs.Subscription();
        }
        McDatepickerContent.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.subscriptions.add(this.datepicker.stateChanges.subscribe(function () {
                _this.changeDetectorRef.markForCheck();
            }));
        };
        McDatepickerContent.prototype.ngOnDestroy = function () {
            this.subscriptions.unsubscribe();
            this.animationDone.complete();
        };
        McDatepickerContent.prototype.startExitAnimation = function () {
            this.animationState = 'void';
            this.changeDetectorRef.markForCheck();
        };
        return McDatepickerContent;
    }());
    /** @nocollapse */ McDatepickerContent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McDatepickerContent, deps: [{ token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McDatepickerContent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McDatepickerContent, selector: "mc-datepicker__content", host: { listeners: { "@transformPanel.done": "animationDone.next()" }, properties: { "@transformPanel": "animationState" }, classAttribute: "mc-datepicker__content" }, viewQueries: [{ propertyName: "calendar", first: true, predicate: McCalendar, descendants: true }], exportAs: ["mcDatepickerContent"], ngImport: i0__namespace, template: "<mc-calendar [id]=\"datepicker.id\"\n             [ngClass]=\"datepicker.panelClass\"\n             [startAt]=\"datepicker.startAt\"\n             [startView]=\"datepicker.startView\"\n             [minDate]=\"datepicker.minDate\"\n             [maxDate]=\"datepicker.maxDate\"\n             [dateFilter]=\"datepicker.dateFilter\"\n             [headerComponent]=\"datepicker.calendarHeaderComponent\"\n             [selected]=\"datepicker.selected\"\n             [dateClass]=\"datepicker.dateClass\"\n             [@fadeInCalendar]=\"'enter'\"\n             (selectedChange)=\"datepicker.select($event)\"\n             (yearSelected)=\"datepicker.selectYear($event)\"\n             (monthSelected)=\"datepicker.selectMonth($event)\"\n             (userSelection)=\"datepicker.close()\">\n</mc-calendar>\n", styles: [".mc-calendar{display:block}.mc-calendar-header{display:flex;padding:16px 8px 12px;padding:var(--mc-datepicker-calendar-size-padding-top, 16px) var(--mc-datepicker-calendar-size-padding-horizontal, 8px) var(--mc-datepicker-calendar-size-padding-blocks, 12px) var(--mc-datepicker-calendar-size-padding-horizontal, 8px)}.mc-calendar__content{padding:0 8px 8px;padding:0 var(--mc-datepicker-calendar-size-padding-horizontal, 8px) var(--mc-datepicker-calendar-size-padding-horizontal, 8px) var(--mc-datepicker-calendar-size-padding-horizontal, 8px);outline:none}.mc-calendar-spacer{flex:1 1 auto}.mc-calendar__period-button{min-width:0}.mc-calendar__period-button .mc-icon{vertical-align:baseline}.mc-calendar__previous-button:after{border-left-width:2px;border-left-width:var(--mc-datepicker-calendar-size-icon-border-width, 2px);transform:translate(2px) rotate(-45deg);transform:var(--mc-datepicker-calendar-size-icon-prev-icon-transform, translateX(2px) rotate(-45deg))}.mc-calendar__next-button:after{border-right-width:2px;border-right-width:var(--mc-datepicker-calendar-size-icon-border-width, 2px);transform:translate(-2px) rotate(45deg);transform:var(--mc-datepicker-calendar-size-icon-nex-icon-transform, translateX(-2px) rotate(45deg))}.mc-calendar__table{border-spacing:0;border-collapse:collapse;width:100%}.mc-calendar__table-header th{text-align:center;height:30px}.mc-calendar__table-header th.mc-calendar__table-header-divider{position:relative;height:calc(12px - 2px);height:calc(var(--mc-datepicker-calendar-size-padding-blocks, 12px) - 2px)}.mc-calendar__table-header th.mc-calendar__table-header-divider:after{content:\"\";position:absolute;top:0;left:calc(-1 * 8px);left:calc(-1 * var(--mc-datepicker-calendar-size-padding-horizontal, 8px));right:calc(-1 * 8px);right:calc(-1 * var(--mc-datepicker-calendar-size-padding-horizontal, 8px));height:1px;height:var(--mc-datepicker-calendar-size-divider-width, 1px)}.mc-datepicker__content{display:block;border-width:1px;border-style:solid}.mc-datepicker__content .mc-calendar{width:296px;height:348px}.mc-datepicker__content .mc-calendar__next-button[disabled],.mc-datepicker__content .mc-calendar__previous-button[disabled]{border:0}\n"], components: [{ type: McCalendar, selector: "mc-calendar", inputs: ["startAt", "selected", "minDate", "maxDate", "headerComponent", "startView", "dateFilter", "dateClass"], outputs: ["selectedChange", "yearSelected", "monthSelected", "userSelection"], exportAs: ["mcCalendar"] }], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], animations: [
            mcDatepickerAnimations.transformPanel,
            mcDatepickerAnimations.fadeInCalendar
        ], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McDatepickerContent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-datepicker__content',
                        exportAs: 'mcDatepickerContent',
                        templateUrl: 'datepicker-content.html',
                        styleUrls: ['datepicker-content.scss'],
                        host: {
                            class: 'mc-datepicker__content',
                            '[@transformPanel]': 'animationState',
                            '(@transformPanel.done)': 'animationDone.next()'
                        },
                        animations: [
                            mcDatepickerAnimations.transformPanel,
                            mcDatepickerAnimations.fadeInCalendar
                        ],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { calendar: [{
                    type: i0.ViewChild,
                    args: [McCalendar]
                }] } });
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
            this._hasBackdrop = false;
            this._opened = false;
            /** The view that the calendar should start in. */
            this.startView = exports.McCalendarView.Month;
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
            /** Emits when the datepicker has been opened. */
            this.openedStream = new i0.EventEmitter();
            /** Emits when the datepicker has been closed. */
            this.closedStream = new i0.EventEmitter();
            /** The id for the datepicker calendar. */
            this.id = "mc-datepicker-" + datepickerUid++;
            this.stateChanges = new rxjs.Subject();
            /** Emits when the datepicker is disabled. */
            this.disabledChange = new rxjs.Subject();
            /** Emits new selected date when selected date changes. */
            this.selectedChanged = new rxjs.Subject();
            this.validSelected = null;
            /** The element that was focused before the datepicker was opened. */
            this.focusedElementBeforeOpen = null;
            /** Subscription to value changes in the associated input element. */
            this.inputSubscription = rxjs.Subscription.EMPTY;
            this.closeSubscription = rxjs.Subscription.EMPTY;
            if (!this.dateAdapter) {
                throw createMissingDateImplError('DateAdapter');
            }
            this.scrollStrategy = scrollStrategy;
        }
        Object.defineProperty(McDatepicker.prototype, "hasBackdrop", {
            get: function () {
                return this._hasBackdrop;
            },
            set: function (value) {
                this._hasBackdrop = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
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
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepicker.prototype, "disabled", {
            /** Whether the datepicker pop-up should be disabled. */
            get: function () {
                return this._disabled === undefined && this.datepickerInput ? this.datepickerInput.disabled : this._disabled;
            },
            set: function (value) {
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
            /** Whether the calendar is open. */
            get: function () {
                return this._opened;
            },
            set: function (value) {
                coercion.coerceBooleanProperty(value) ? this.open() : this.close();
            },
            enumerable: false,
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
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepicker.prototype, "minDate", {
            /** The minimum selectable date. */
            get: function () {
                return this.datepickerInput && this.datepickerInput.min;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepicker.prototype, "maxDate", {
            /** The maximum selectable date. */
            get: function () {
                return this.datepickerInput && this.datepickerInput.max;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepicker.prototype, "dateFilter", {
            get: function () {
                return this.datepickerInput && this.datepickerInput.dateFilter;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDatepicker.prototype, "value", {
            get: function () {
                return this.selected;
            },
            enumerable: false,
            configurable: true
        });
        McDatepicker.prototype.ngOnDestroy = function () {
            this.close();
            this.inputSubscription.unsubscribe();
            this.closeSubscription.unsubscribe();
            this.disabledChange.complete();
            this.destroyOverlay();
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
            this.inputSubscription = this.datepickerInput.valueChange
                .subscribe(function (value) {
                var _a;
                _this.selected = value;
                if (_this.popupComponentRef) {
                    (_a = _this.popupComponentRef.instance.calendar.monthView) === null || _a === void 0 ? void 0 : _a.init();
                    _this.popupComponentRef.instance.calendar.activeDate = value;
                }
            });
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
        McDatepicker.prototype.close = function (restoreFocus) {
            var _this = this;
            if (restoreFocus === void 0) { restoreFocus = true; }
            if (!this._opened) {
                return;
            }
            if (this.popupComponentRef) {
                var instance = this.popupComponentRef.instance;
                instance.startExitAnimation();
                instance.animationDone
                    .pipe(operators.take(1))
                    .subscribe(function () { return _this.destroyOverlay(); });
            }
            if (restoreFocus) {
                this.focusedElementBeforeOpen.focus();
            }
            this._opened = false;
            this.closedStream.emit();
            this.focusedElementBeforeOpen = null;
        };
        McDatepicker.prototype.toggle = function () {
            if (this.datepickerInput.isReadOnly) {
                return;
            }
            this._opened ? this.close() : this.open();
        };
        /** Destroys the current overlay. */
        McDatepicker.prototype.destroyOverlay = function () {
            if (this.popupRef) {
                this.popupRef.dispose();
                this.popupRef = this.popupComponentRef = null;
            }
        };
        /** Open the calendar as a popup. */
        McDatepicker.prototype.openAsPopup = function () {
            var _this = this;
            if (!this.calendarPortal) {
                this.calendarPortal = new i8.ComponentPortal(McDatepickerContent, this.viewContainerRef);
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
                    .subscribe(function () { return _this.popupRef.updatePosition(); });
            }
        };
        /** Create the popup. */
        McDatepicker.prototype.createPopup = function () {
            var _this = this;
            var overlayConfig = new i3$1.OverlayConfig({
                positionStrategy: this.createPopupPositionStrategy(),
                hasBackdrop: this.hasBackdrop,
                backdropClass: this.backdropClass,
                direction: this.dir,
                scrollStrategy: this.scrollStrategy(),
                panelClass: 'mc-datepicker__popup'
            });
            this.popupRef = this.overlay.create(overlayConfig);
            this.closeSubscription = this.closingActions()
                .subscribe(function () { return _this.close(_this.restoreFocus()); });
        };
        McDatepicker.prototype.restoreFocus = function () {
            return this.document.activeElement === this.document.body;
        };
        McDatepicker.prototype.closingActions = function () {
            return rxjs.merge(this.popupRef.backdropClick(), this.popupRef.outsidePointerEvents(), this.popupRef.detachments());
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
        return McDatepicker;
    }());
    /** @nocollapse */ McDatepicker.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McDatepicker, deps: [{ token: i3__namespace$1.Overlay }, { token: i0__namespace.NgZone }, { token: i0__namespace.ViewContainerRef }, { token: MC_DATEPICKER_SCROLL_STRATEGY }, { token: i1__namespace$1.DateAdapter, optional: true }, { token: i2__namespace.Directionality, optional: true }, { token: i1.DOCUMENT, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McDatepicker.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McDatepicker, selector: "mc-datepicker", inputs: { hasBackdrop: "hasBackdrop", startAt: "startAt", disabled: "disabled", opened: "opened", calendarHeaderComponent: "calendarHeaderComponent", startView: "startView", panelClass: "panelClass", dateClass: "dateClass", backdropClass: "backdropClass" }, outputs: { yearSelected: "yearSelected", monthSelected: "monthSelected", openedStream: "opened", closedStream: "closed" }, providers: [{ provide: formField.McFormFieldControl, useExisting: McDatepicker }], exportAs: ["mcDatepicker"], ngImport: i0__namespace, template: '', isInline: true, changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McDatepicker, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-datepicker',
                        template: '',
                        exportAs: 'mcDatepicker',
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        providers: [{ provide: formField.McFormFieldControl, useExisting: McDatepicker }]
                    }]
            }], ctorParameters: function () {
            return [{ type: i3__namespace$1.Overlay }, { type: i0__namespace.NgZone }, { type: i0__namespace.ViewContainerRef }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [MC_DATEPICKER_SCROLL_STRATEGY]
                        }] }, { type: i1__namespace$1.DateAdapter, decorators: [{
                            type: i0.Optional
                        }] }, { type: i2__namespace.Directionality, decorators: [{
                            type: i0.Optional
                        }] }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [i1.DOCUMENT]
                        }] }];
        }, propDecorators: { hasBackdrop: [{
                    type: i0.Input
                }], startAt: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], opened: [{
                    type: i0.Input
                }], calendarHeaderComponent: [{
                    type: i0.Input
                }], startView: [{
                    type: i0.Input
                }], yearSelected: [{
                    type: i0.Output
                }], monthSelected: [{
                    type: i0.Output
                }], panelClass: [{
                    type: i0.Input
                }], dateClass: [{
                    type: i0.Input
                }], backdropClass: [{
                    type: i0.Input
                }], openedStream: [{
                    type: i0.Output,
                    args: ['opened']
                }], closedStream: [{
                    type: i0.Output,
                    args: ['closed']
                }] } });

    var McDatepickerModule = /** @class */ (function () {
        function McDatepickerModule() {
        }
        return McDatepickerModule;
    }());
    /** @nocollapse */ McDatepickerModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McDatepickerModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ McDatepickerModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McDatepickerModule, declarations: [McCalendar,
            McCalendarBody,
            McDatepicker,
            McDatepickerContent,
            McDatepickerInput,
            McDatepickerToggle,
            McDatepickerToggleIcon,
            McMonthView,
            McYearView,
            McMultiYearView,
            McCalendarHeader], imports: [i1.CommonModule,
            i3.McButtonModule,
            i3$1.OverlayModule,
            a11y.A11yModule,
            i8.PortalModule,
            i4.McIconModule], exports: [McCalendar,
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
            i3.McButtonModule] });
    /** @nocollapse */ McDatepickerModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McDatepickerModule, providers: [
            McDatepickerIntl,
            MC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER
        ], imports: [[
                i1.CommonModule,
                i3.McButtonModule,
                i3$1.OverlayModule,
                a11y.A11yModule,
                i8.PortalModule,
                i4.McIconModule
            ], i3.McButtonModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0__namespace, type: McDatepickerModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i1.CommonModule,
                            i3.McButtonModule,
                            i3$1.OverlayModule,
                            a11y.A11yModule,
                            i8.PortalModule,
                            i4.McIconModule
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
                            i3.McButtonModule
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
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.MAX_YEAR = MAX_YEAR;
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

}));
//# sourceMappingURL=ptsecurity-mosaic-datepicker.umd.js.map
