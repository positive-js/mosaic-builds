/**
 * @fileoverview added by tsickle
 * Generated from: calendar-body.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:no-magic-numbers
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation, NgZone } from '@angular/core';
import { take } from 'rxjs/operators';
/**
 * An internal class that represents the data corresponding to a single calendar cell.
 * \@docs-private
 */
var /**
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
/**
 * An internal class that represents the data corresponding to a single calendar cell.
 * \@docs-private
 */
export { McCalendarCell };
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
                    template: "<!--\n  If there's not enough space in the first row, create a separate label row. We mark this row as\n  aria-hidden because we don't want it to be read out as one of the weeks in the month.\n-->\n<tr *ngIf=\"firstRowOffset < labelMinRequiredCells\" aria-hidden=\"true\">\n    <td class=\"mc-calendar__body-label\"\n        [attr.colspan]=\"numCols\"\n        [style.paddingTop]=\"cellPadding\"\n        [style.paddingBottom]=\"cellPadding\">\n        {{label}}\n    </td>\n</tr>\n\n<!-- Create the first row separately so we can include a special spacer cell. -->\n<tr *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\">\n    <!--\n      We mark this cell as aria-hidden so it doesn't get read out as one of the days in the week.\n      The aspect ratio of the table cells is maintained by setting the top and bottom padding as a\n      percentage of the width (a variant of the trick described here:\n      https://www.w3schools.com/howto/howto_css_aspect_ratio.asp).\n    -->\n    <td *ngIf=\"rowIndex === 0 && firstRowOffset\"\n        aria-hidden=\"true\"\n        class=\"mc-calendar__body-label\"\n        [attr.colspan]=\"firstRowOffset\"\n        [style.paddingTop]=\"cellPadding\"\n        [style.paddingBottom]=\"cellPadding\">\n        {{firstRowOffset >= labelMinRequiredCells ? label : ''}}\n    </td>\n    <td *ngFor=\"let item of row; let colIndex = index\"\n        role=\"gridcell\"\n        class=\"mc-calendar__body-cell\"\n        [ngClass]=\"item.cssClasses\"\n        [tabindex]=\"isActiveCell(rowIndex, colIndex) ? 0 : -1\"\n        [class.mc-calendar__body_disabled]=\"!item.enabled\"\n        [class.mc-calendar__body_active]=\"isActiveCell(rowIndex, colIndex)\"\n        [attr.aria-label]=\"item.ariaLabel\"\n        [attr.aria-disabled]=\"!item.enabled || null\"\n        [attr.aria-selected]=\"selectedValue === item.value\"\n        (click)=\"cellClicked(item)\"\n        [style.width]=\"cellWidth\"\n        [style.paddingTop]=\"cellPadding\"\n        [style.paddingBottom]=\"cellPadding\">\n        <div class=\"mc-calendar__body-cell-content\"\n             [class.mc-calendar__body_selected]=\"selectedValue === item.value\"\n             [class.mc-calendar__body-today]=\"todayValue === item.value\">\n            {{item.displayValue}}\n        </div>\n    </td>\n</tr>\n",
                    host: {
                        class: 'mc-calendar__body',
                        role: 'grid',
                        'aria-readonly': 'true'
                    },
                    exportAs: 'mcCalendarBody',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mc-calendar__body{min-width:224px}.mc-calendar__body-label{height:0;line-height:0;text-align:left;padding-left:4.71429%;padding-right:4.71429%}.mc-calendar__body-cell{position:relative;height:0;line-height:0;text-align:center;outline:0;cursor:pointer}.mc-calendar__body_disabled{cursor:default}.mc-calendar__body-cell-content{position:absolute;top:5%;left:5%;padding:8px;display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:90%;height:90%;line-height:1;border-width:1px;border-style:solid}.cdk-high-contrast-active .mc-calendar__body-cell-content{border:none}.cdk-high-contrast-active :host .mc-calendar__body-cell-content{border:none}mc-month-view .mc-calendar__body-cell-content{justify-content:flex-end}mc-multi-year-view .mc-calendar__body-cell-content,mc-year-view .mc-calendar__body-cell-content{justify-content:center}.cdk-high-contrast-active .mc-calendar__body_selected,.cdk-high-contrast-active .mc-datepicker__popup:not(:empty){outline:solid 1px}.cdk-high-contrast-active .mc-calendar__body-today{outline:dotted 1px}.cdk-high-contrast-active :host .mc-calendar__body_selected,.cdk-high-contrast-active :host .mc-datepicker__popup:not(:empty){outline:solid 1px}.cdk-high-contrast-active :host .mc-calendar__body-today{outline:dotted 1px}[dir=rtl] .mc-calendar__body-label{text-align:right}"]
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
export { McCalendarBody };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYm9keS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsiY2FsZW5kYXItYm9keS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04saUJBQWlCLEVBQ2pCLE1BQU0sRUFHVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBWXRDOzs7OztJQUNJLHdCQUNXLEtBQWEsRUFDYixZQUFvQixFQUNwQixTQUFpQixFQUNqQixPQUFnQixFQUNoQixVQUFxQztRQUpyQyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsaUJBQVksR0FBWixZQUFZLENBQVE7UUFDcEIsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUNqQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLGVBQVUsR0FBVixVQUFVLENBQTJCO0lBRWhELENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUFURCxJQVNDOzs7Ozs7OztJQVBPLCtCQUFvQjs7SUFDcEIsc0NBQTJCOztJQUMzQixtQ0FBd0I7O0lBQ3hCLGlDQUF1Qjs7SUFDdkIsb0NBQTRDOzs7Ozs7QUFVcEQ7SUFxREksd0JBQW9CLFVBQW1DLEVBQVUsTUFBYztRQUEzRCxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7Ozs7UUF2QnRFLFlBQU8sR0FBRyxDQUFDLENBQUM7Ozs7UUFHWixlQUFVLEdBQUcsQ0FBQyxDQUFDOzs7OztRQU1mLG9CQUFlLEdBQUcsQ0FBQyxDQUFDOzs7O1FBR1Ysd0JBQW1CLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7SUFZMUYsQ0FBQzs7Ozs7SUFFRCxvQ0FBVzs7OztJQUFYLFVBQVksSUFBb0I7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R3JCLG9DQUF3Qjs7Ozs7O0lBTXhCLHlDQUE2Qjs7Ozs7SUFHN0IsNkNBQTBGOzs7OztJQUcxRix3Q0FBdUI7Ozs7O0lBR3ZCLHFDQUFvQjs7Ozs7SUFHcEIsbUNBQWtCOzs7OztJQUVOLG9DQUEyQzs7Ozs7SUFBRSxnQ0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTpuby1tYWdpYy1udW1iZXJzXG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgTmdab25lLFxuICAgIE9uQ2hhbmdlcyxcbiAgICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG4vKipcbiAqIEV4dHJhIENTUyBjbGFzc2VzIHRoYXQgY2FuIGJlIGFzc29jaWF0ZWQgd2l0aCBhIGNhbGVuZGFyIGNlbGwuXG4gKi9cbmV4cG9ydCB0eXBlIE1jQ2FsZW5kYXJDZWxsQ3NzQ2xhc3NlcyA9IHN0cmluZyB8IHN0cmluZ1tdIHwgU2V0PHN0cmluZz4gfCB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xuXG4vKipcbiAqIEFuIGludGVybmFsIGNsYXNzIHRoYXQgcmVwcmVzZW50cyB0aGUgZGF0YSBjb3JyZXNwb25kaW5nIHRvIGEgc2luZ2xlIGNhbGVuZGFyIGNlbGwuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjbGFzcyBNY0NhbGVuZGFyQ2VsbCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyB2YWx1ZTogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgZGlzcGxheVZhbHVlOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBhcmlhTGFiZWw6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW4sXG4gICAgICAgIHB1YmxpYyBjc3NDbGFzc2VzPzogTWNDYWxlbmRhckNlbGxDc3NDbGFzc2VzXG4gICAgKSB7XG4gICAgfVxufVxuXG5cbi8qKlxuICogQW4gaW50ZXJuYWwgY29tcG9uZW50IHVzZWQgdG8gZGlzcGxheSBjYWxlbmRhciBkYXRhIGluIGEgdGFibGUuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnW21jLWNhbGVuZGFyLWJvZHldJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2NhbGVuZGFyLWJvZHkuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2NhbGVuZGFyLWJvZHkuc2NzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1jYWxlbmRhcl9fYm9keScsXG4gICAgICAgIHJvbGU6ICdncmlkJyxcbiAgICAgICAgJ2FyaWEtcmVhZG9ubHknOiAndHJ1ZSdcbiAgICB9LFxuICAgIGV4cG9ydEFzOiAnbWNDYWxlbmRhckJvZHknLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWNDYWxlbmRhckJvZHkgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIC8qKiBUaGUgbGFiZWwgZm9yIHRoZSB0YWJsZS4gKGUuZy4gXCJKYW4gMjAxN1wiKS4gKi9cbiAgICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuXG4gICAgLyoqIFRoZSBjZWxscyB0byBkaXNwbGF5IGluIHRoZSB0YWJsZS4gKi9cbiAgICBASW5wdXQoKSByb3dzOiBNY0NhbGVuZGFyQ2VsbFtdW107XG5cbiAgICAvKiogVGhlIHZhbHVlIGluIHRoZSB0YWJsZSB0aGF0IGNvcnJlc3BvbmRzIHRvIHRvZGF5LiAqL1xuICAgIEBJbnB1dCgpIHRvZGF5VmFsdWU6IG51bWJlcjtcblxuICAgIC8qKiBUaGUgdmFsdWUgaW4gdGhlIHRhYmxlIHRoYXQgaXMgY3VycmVudGx5IHNlbGVjdGVkLiAqL1xuICAgIEBJbnB1dCgpIHNlbGVjdGVkVmFsdWU6IG51bWJlcjtcblxuICAgIC8qKiBUaGUgbWluaW11bSBudW1iZXIgb2YgZnJlZSBjZWxscyBuZWVkZWQgdG8gZml0IHRoZSBsYWJlbCBpbiB0aGUgZmlyc3Qgcm93LiAqL1xuICAgIEBJbnB1dCgpIGxhYmVsTWluUmVxdWlyZWRDZWxsczogbnVtYmVyO1xuXG4gICAgLyoqIFRoZSBudW1iZXIgb2YgY29sdW1ucyBpbiB0aGUgdGFibGUuICovXG4gICAgQElucHV0KCkgbnVtQ29scyA9IDc7XG5cbiAgICAvKiogVGhlIGNlbGwgbnVtYmVyIG9mIHRoZSBhY3RpdmUgY2VsbCBpbiB0aGUgdGFibGUuICovXG4gICAgQElucHV0KCkgYWN0aXZlQ2VsbCA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYXNwZWN0IHJhdGlvICh3aWR0aCAvIGhlaWdodCkgdG8gdXNlIGZvciB0aGUgY2VsbHMgaW4gdGhlIHRhYmxlLiBUaGlzIGFzcGVjdCByYXRpbyB3aWxsIGJlXG4gICAgICogbWFpbnRhaW5lZCBldmVuIGFzIHRoZSB0YWJsZSByZXNpemVzLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGNlbGxBc3BlY3RSYXRpbyA9IDE7XG5cbiAgICAvKiogRW1pdHMgd2hlbiBhIG5ldyB2YWx1ZSBpcyBzZWxlY3RlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0ZWRWYWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIC8qKiBUaGUgbnVtYmVyIG9mIGJsYW5rIGNlbGxzIHRvIHB1dCBhdCB0aGUgYmVnaW5uaW5nIGZvciB0aGUgZmlyc3Qgcm93LiAqL1xuICAgIGZpcnN0Um93T2Zmc2V0OiBudW1iZXI7XG5cbiAgICAvKiogUGFkZGluZyBmb3IgdGhlIGluZGl2aWR1YWwgZGF0ZSBjZWxscy4gKi9cbiAgICBjZWxsUGFkZGluZzogc3RyaW5nO1xuXG4gICAgLyoqIFdpZHRoIG9mIGFuIGluZGl2aWR1YWwgY2VsbC4gKi9cbiAgICBjZWxsV2lkdGg6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHtcbiAgICB9XG5cbiAgICBjZWxsQ2xpY2tlZChjZWxsOiBNY0NhbGVuZGFyQ2VsbCk6IHZvaWQge1xuICAgICAgICBpZiAoY2VsbC5lbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVmFsdWVDaGFuZ2UuZW1pdChjZWxsLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgY29uc3QgY29sdW1uQ2hhbmdlcyA9IGNoYW5nZXMubnVtQ29scztcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXRoaXMtYXNzaWdubWVudFxuICAgICAgICBjb25zdCB7IHJvd3MsIG51bUNvbHMgfSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKGNoYW5nZXMucm93cyB8fCBjb2x1bW5DaGFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLmZpcnN0Um93T2Zmc2V0ID0gcm93cyAmJiByb3dzLmxlbmd0aCAmJiByb3dzWzBdLmxlbmd0aCA/IG51bUNvbHMgLSByb3dzWzBdLmxlbmd0aCA6IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlcy5jZWxsQXNwZWN0UmF0aW8gfHwgY29sdW1uQ2hhbmdlcyB8fCAhdGhpcy5jZWxsUGFkZGluZykge1xuICAgICAgICAgICAgdGhpcy5jZWxsUGFkZGluZyA9IGAke3RoaXMuY2VsbEFzcGVjdFJhdGlvICogNTAgLyBudW1Db2xzfSVgO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbHVtbkNoYW5nZXMgfHwgIXRoaXMuY2VsbFdpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxXaWR0aCA9IGAkezEwMCAvIG51bUNvbHN9JWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0FjdGl2ZUNlbGwocm93SW5kZXg6IG51bWJlciwgY29sSW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgY2VsbE51bWJlciA9IHJvd0luZGV4ICogdGhpcy5udW1Db2xzICsgY29sSW5kZXg7XG5cbiAgICAgICAgLy8gQWNjb3VudCBmb3IgdGhlIGZhY3QgdGhhdCB0aGUgZmlyc3Qgcm93IG1heSBub3QgaGF2ZSBhcyBtYW55IGNlbGxzLlxuICAgICAgICBpZiAocm93SW5kZXgpIHtcbiAgICAgICAgICAgIGNlbGxOdW1iZXIgLT0gdGhpcy5maXJzdFJvd09mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjZWxsTnVtYmVyID09PSB0aGlzLmFjdGl2ZUNlbGw7XG4gICAgfVxuXG4gICAgLyoqIEZvY3VzZXMgdGhlIGFjdGl2ZSBjZWxsIGFmdGVyIHRoZSBtaWNyb3Rhc2sgcXVldWUgaXMgZW1wdHkuICovXG4gICAgZm9jdXNBY3RpdmVDZWxsKCkge1xuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5nWm9uZS5vblN0YWJsZS5hc09ic2VydmFibGUoKS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlQ2VsbDogSFRNTEVsZW1lbnQgfCBudWxsID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1jLWNhbGVuZGFyX19ib2R5X2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUNlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlQ2VsbC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=