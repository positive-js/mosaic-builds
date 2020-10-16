/**
 * @fileoverview added by tsickle
 * Generated from: calendar-body.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:no-magic-numbers
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation, NgZone } from '@angular/core';
import { take } from 'rxjs/operators';
/**
 * An internal class that represents the data corresponding to a single calendar cell.
 * \@docs-private
 */
export class McCalendarCell {
    /**
     * @param {?} value
     * @param {?} displayValue
     * @param {?} ariaLabel
     * @param {?} enabled
     * @param {?=} cssClasses
     */
    constructor(value, displayValue, ariaLabel, enabled, cssClasses) {
        this.value = value;
        this.displayValue = displayValue;
        this.ariaLabel = ariaLabel;
        this.enabled = enabled;
        this.cssClasses = cssClasses;
    }
}
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
export class McCalendarBody {
    /**
     * @param {?} elementRef
     * @param {?} ngZone
     */
    constructor(elementRef, ngZone) {
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
    cellClicked(cell) {
        if (cell.enabled) {
            this.selectedValueChange.emit(cell.value);
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const columnChanges = changes.numCols;
        // tslint:disable-next-line:no-this-assignment
        const { rows, numCols } = this;
        if (changes.rows || columnChanges) {
            this.firstRowOffset = rows && rows.length && rows[0].length ? numCols - rows[0].length : 0;
        }
        if (changes.cellAspectRatio || columnChanges || !this.cellPadding) {
            this.cellPadding = `${this.cellAspectRatio * 50 / numCols}%`;
        }
        if (columnChanges || !this.cellWidth) {
            this.cellWidth = `${100 / numCols}%`;
        }
    }
    /**
     * @param {?} rowIndex
     * @param {?} colIndex
     * @return {?}
     */
    isActiveCell(rowIndex, colIndex) {
        /** @type {?} */
        let cellNumber = rowIndex * this.numCols + colIndex;
        // Account for the fact that the first row may not have as many cells.
        if (rowIndex) {
            cellNumber -= this.firstRowOffset;
        }
        return cellNumber === this.activeCell;
    }
    /**
     * Focuses the active cell after the microtask queue is empty.
     * @return {?}
     */
    focusActiveCell() {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.ngZone.onStable.asObservable().pipe(take(1)).subscribe((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const activeCell = this.elementRef.nativeElement.querySelector('.mc-calendar__body_active');
                if (activeCell) {
                    activeCell.focus();
                }
            }));
        }));
    }
}
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
                styles: [".mc-calendar__body{min-width:224px}.mc-calendar__body-label{height:0;line-height:0;padding-left:4.71429%;padding-right:4.71429%;text-align:left}.mc-calendar__body-cell{cursor:pointer;height:0;line-height:0;outline:none;position:relative;text-align:center}.mc-calendar__body_disabled{cursor:default}.mc-calendar__body-cell-content{align-items:center;border-style:solid;border-width:1px;box-sizing:border-box;display:flex;height:90%;justify-content:center;left:5%;line-height:1;padding:8px;position:absolute;top:5%;width:90%}.cdk-high-contrast-active .mc-calendar__body-cell-content,.cdk-high-contrast-active :host .mc-calendar__body-cell-content{border:none}mc-month-view .mc-calendar__body-cell-content{justify-content:flex-end}mc-multi-year-view .mc-calendar__body-cell-content,mc-year-view .mc-calendar__body-cell-content{justify-content:center}.cdk-high-contrast-active .mc-datepicker__popup:not(:empty),.cdk-high-contrast-active .mc-selected{outline:1px solid}.cdk-high-contrast-active .mc-calendar__body-today{outline:1px dotted}.cdk-high-contrast-active :host .mc-datepicker__popup:not(:empty),.cdk-high-contrast-active :host .mc-selected{outline:1px solid}.cdk-high-contrast-active :host .mc-calendar__body-today{outline:1px dotted}[dir=rtl] .mc-calendar__body-label{text-align:right}"]
            }] }
];
/** @nocollapse */
McCalendarBody.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYm9keS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL2RhdGVwaWNrZXIvIiwic291cmNlcyI6WyJjYWxlbmRhci1ib2R5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixpQkFBaUIsRUFDakIsTUFBTSxFQUdULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFZdEMsTUFBTSxPQUFPLGNBQWM7Ozs7Ozs7O0lBQ3ZCLFlBQ1csS0FBYSxFQUNiLFlBQW9CLEVBQ3BCLFNBQWlCLEVBQ2pCLE9BQWdCLEVBQ2hCLFVBQXFDO1FBSnJDLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixpQkFBWSxHQUFaLFlBQVksQ0FBUTtRQUNwQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ2pCLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsZUFBVSxHQUFWLFVBQVUsQ0FBMkI7SUFFaEQsQ0FBQztDQUNKOzs7SUFQTywrQkFBb0I7O0lBQ3BCLHNDQUEyQjs7SUFDM0IsbUNBQXdCOztJQUN4QixpQ0FBdUI7O0lBQ3ZCLG9DQUE0Qzs7Ozs7O0FBdUJwRCxNQUFNLE9BQU8sY0FBYzs7Ozs7SUF3Q3ZCLFlBQW9CLFVBQW1DLEVBQVUsTUFBYztRQUEzRCxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7Ozs7UUF2QnRFLFlBQU8sR0FBRyxDQUFDLENBQUM7Ozs7UUFHWixlQUFVLEdBQUcsQ0FBQyxDQUFDOzs7OztRQU1mLG9CQUFlLEdBQUcsQ0FBQyxDQUFDOzs7O1FBR1Ysd0JBQW1CLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7SUFZMUYsQ0FBQzs7Ozs7SUFFRCxXQUFX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RzFGLHdDQUF1Qjs7Ozs7SUFHdkIscUNBQW9COzs7OztJQUdwQixtQ0FBa0I7Ozs7O0lBRU4sb0NBQTJDOzs7OztJQUFFLGdDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOm5vLW1hZ2ljLW51bWJlcnNcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBOZ1pvbmUsXG4gICAgT25DaGFuZ2VzLFxuICAgIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbi8qKlxuICogRXh0cmEgQ1NTIGNsYXNzZXMgdGhhdCBjYW4gYmUgYXNzb2NpYXRlZCB3aXRoIGEgY2FsZW5kYXIgY2VsbC5cbiAqL1xuZXhwb3J0IHR5cGUgTWNDYWxlbmRhckNlbGxDc3NDbGFzc2VzID0gc3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPiB8IHsgW2tleTogc3RyaW5nXTogYW55IH07XG5cbi8qKlxuICogQW4gaW50ZXJuYWwgY2xhc3MgdGhhdCByZXByZXNlbnRzIHRoZSBkYXRhIGNvcnJlc3BvbmRpbmcgdG8gYSBzaW5nbGUgY2FsZW5kYXIgY2VsbC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNsYXNzIE1jQ2FsZW5kYXJDZWxsIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHZhbHVlOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBkaXNwbGF5VmFsdWU6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGFyaWFMYWJlbDogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgZW5hYmxlZDogYm9vbGVhbixcbiAgICAgICAgcHVibGljIGNzc0NsYXNzZXM/OiBNY0NhbGVuZGFyQ2VsbENzc0NsYXNzZXNcbiAgICApIHtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBBbiBpbnRlcm5hbCBjb21wb25lbnQgdXNlZCB0byBkaXNwbGF5IGNhbGVuZGFyIGRhdGEgaW4gYSB0YWJsZS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbbWMtY2FsZW5kYXItYm9keV0nLFxuICAgIGV4cG9ydEFzOiAnbWNDYWxlbmRhckJvZHknLFxuICAgIHRlbXBsYXRlVXJsOiAnY2FsZW5kYXItYm9keS5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnY2FsZW5kYXItYm9keS5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWNhbGVuZGFyX19ib2R5JyxcbiAgICAgICAgcm9sZTogJ2dyaWQnLFxuICAgICAgICAnYXJpYS1yZWFkb25seSc6ICd0cnVlJ1xuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY0NhbGVuZGFyQm9keSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gICAgLyoqIFRoZSBsYWJlbCBmb3IgdGhlIHRhYmxlLiAoZS5nLiBcIkphbiAyMDE3XCIpLiAqL1xuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG5cbiAgICAvKiogVGhlIGNlbGxzIHRvIGRpc3BsYXkgaW4gdGhlIHRhYmxlLiAqL1xuICAgIEBJbnB1dCgpIHJvd3M6IE1jQ2FsZW5kYXJDZWxsW11bXTtcblxuICAgIC8qKiBUaGUgdmFsdWUgaW4gdGhlIHRhYmxlIHRoYXQgY29ycmVzcG9uZHMgdG8gdG9kYXkuICovXG4gICAgQElucHV0KCkgdG9kYXlWYWx1ZTogbnVtYmVyO1xuXG4gICAgLyoqIFRoZSB2YWx1ZSBpbiB0aGUgdGFibGUgdGhhdCBpcyBjdXJyZW50bHkgc2VsZWN0ZWQuICovXG4gICAgQElucHV0KCkgc2VsZWN0ZWRWYWx1ZTogbnVtYmVyO1xuXG4gICAgLyoqIFRoZSBtaW5pbXVtIG51bWJlciBvZiBmcmVlIGNlbGxzIG5lZWRlZCB0byBmaXQgdGhlIGxhYmVsIGluIHRoZSBmaXJzdCByb3cuICovXG4gICAgQElucHV0KCkgbGFiZWxNaW5SZXF1aXJlZENlbGxzOiBudW1iZXI7XG5cbiAgICAvKiogVGhlIG51bWJlciBvZiBjb2x1bW5zIGluIHRoZSB0YWJsZS4gKi9cbiAgICBASW5wdXQoKSBudW1Db2xzID0gNztcblxuICAgIC8qKiBUaGUgY2VsbCBudW1iZXIgb2YgdGhlIGFjdGl2ZSBjZWxsIGluIHRoZSB0YWJsZS4gKi9cbiAgICBASW5wdXQoKSBhY3RpdmVDZWxsID0gMDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBhc3BlY3QgcmF0aW8gKHdpZHRoIC8gaGVpZ2h0KSB0byB1c2UgZm9yIHRoZSBjZWxscyBpbiB0aGUgdGFibGUuIFRoaXMgYXNwZWN0IHJhdGlvIHdpbGwgYmVcbiAgICAgKiBtYWludGFpbmVkIGV2ZW4gYXMgdGhlIHRhYmxlIHJlc2l6ZXMuXG4gICAgICovXG4gICAgQElucHV0KCkgY2VsbEFzcGVjdFJhdGlvID0gMTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIGEgbmV3IHZhbHVlIGlzIHNlbGVjdGVkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3RlZFZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgLyoqIFRoZSBudW1iZXIgb2YgYmxhbmsgY2VsbHMgdG8gcHV0IGF0IHRoZSBiZWdpbm5pbmcgZm9yIHRoZSBmaXJzdCByb3cuICovXG4gICAgZmlyc3RSb3dPZmZzZXQ6IG51bWJlcjtcblxuICAgIC8qKiBQYWRkaW5nIGZvciB0aGUgaW5kaXZpZHVhbCBkYXRlIGNlbGxzLiAqL1xuICAgIGNlbGxQYWRkaW5nOiBzdHJpbmc7XG5cbiAgICAvKiogV2lkdGggb2YgYW4gaW5kaXZpZHVhbCBjZWxsLiAqL1xuICAgIGNlbGxXaWR0aDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSkge1xuICAgIH1cblxuICAgIGNlbGxDbGlja2VkKGNlbGw6IE1jQ2FsZW5kYXJDZWxsKTogdm9pZCB7XG4gICAgICAgIGlmIChjZWxsLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZUNoYW5nZS5lbWl0KGNlbGwudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBjb25zdCBjb2x1bW5DaGFuZ2VzID0gY2hhbmdlcy5udW1Db2xzO1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdGhpcy1hc3NpZ25tZW50XG4gICAgICAgIGNvbnN0IHsgcm93cywgbnVtQ29scyB9ID0gdGhpcztcblxuICAgICAgICBpZiAoY2hhbmdlcy5yb3dzIHx8IGNvbHVtbkNoYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZmlyc3RSb3dPZmZzZXQgPSByb3dzICYmIHJvd3MubGVuZ3RoICYmIHJvd3NbMF0ubGVuZ3RoID8gbnVtQ29scyAtIHJvd3NbMF0ubGVuZ3RoIDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFuZ2VzLmNlbGxBc3BlY3RSYXRpbyB8fCBjb2x1bW5DaGFuZ2VzIHx8ICF0aGlzLmNlbGxQYWRkaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxQYWRkaW5nID0gYCR7dGhpcy5jZWxsQXNwZWN0UmF0aW8gKiA1MCAvIG51bUNvbHN9JWA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29sdW1uQ2hhbmdlcyB8fCAhdGhpcy5jZWxsV2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMuY2VsbFdpZHRoID0gYCR7MTAwIC8gbnVtQ29sc30lYDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzQWN0aXZlQ2VsbChyb3dJbmRleDogbnVtYmVyLCBjb2xJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBjZWxsTnVtYmVyID0gcm93SW5kZXggKiB0aGlzLm51bUNvbHMgKyBjb2xJbmRleDtcblxuICAgICAgICAvLyBBY2NvdW50IGZvciB0aGUgZmFjdCB0aGF0IHRoZSBmaXJzdCByb3cgbWF5IG5vdCBoYXZlIGFzIG1hbnkgY2VsbHMuXG4gICAgICAgIGlmIChyb3dJbmRleCkge1xuICAgICAgICAgICAgY2VsbE51bWJlciAtPSB0aGlzLmZpcnN0Um93T2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNlbGxOdW1iZXIgPT09IHRoaXMuYWN0aXZlQ2VsbDtcbiAgICB9XG5cbiAgICAvKiogRm9jdXNlcyB0aGUgYWN0aXZlIGNlbGwgYWZ0ZXIgdGhlIG1pY3JvdGFzayBxdWV1ZSBpcyBlbXB0eS4gKi9cbiAgICBmb2N1c0FjdGl2ZUNlbGwoKSB7XG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlLmFzT2JzZXJ2YWJsZSgpLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVDZWxsOiBIVE1MRWxlbWVudCB8IG51bGwgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWMtY2FsZW5kYXJfX2JvZHlfYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlQ2VsbCkge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVDZWxsLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==