// tslint:disable:no-magic-numbers
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation, NgZone } from '@angular/core';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * An internal class that represents the data corresponding to a single calendar cell.
 * @docs-private
 */
export class McCalendarCell {
    constructor(value, displayValue, ariaLabel, enabled, cssClasses) {
        this.value = value;
        this.displayValue = displayValue;
        this.ariaLabel = ariaLabel;
        this.enabled = enabled;
        this.cssClasses = cssClasses;
    }
}
/**
 * An internal component used to display calendar data in a table.
 * @docs-private
 */
export class McCalendarBody {
    constructor(elementRef, ngZone) {
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
    cellClicked(cell) {
        if (cell.enabled) {
            this.selectedValueChange.emit(cell.value);
        }
    }
    ngOnChanges(changes) {
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
    isActiveCell(rowIndex, colIndex) {
        let cellNumber = rowIndex * this.numCols + colIndex;
        // Account for the fact that the first row may not have as many cells.
        if (rowIndex) {
            cellNumber -= this.firstRowOffset;
        }
        return cellNumber === this.activeCell;
    }
    /** Focuses the active cell after the microtask queue is empty. */
    focusActiveCell() {
        this.ngZone.runOutsideAngular(() => {
            this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(() => {
                const activeCell = this.elementRef.nativeElement.querySelector('.mc-calendar__body_active');
                if (activeCell) {
                    activeCell.focus();
                }
            });
        });
    }
}
/** @nocollapse */ /** @nocollapse */ McCalendarBody.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McCalendarBody, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McCalendarBody.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: McCalendarBody, selector: "[mc-calendar-body]", inputs: { label: "label", rows: "rows", todayValue: "todayValue", selectedValue: "selectedValue", labelMinRequiredCells: "labelMinRequiredCells", numCols: "numCols", activeCell: "activeCell", cellAspectRatio: "cellAspectRatio" }, outputs: { selectedValueChange: "selectedValueChange" }, host: { attributes: { "role": "grid", "aria-readonly": "true" }, classAttribute: "mc-calendar__body" }, exportAs: ["mcCalendarBody"], usesOnChanges: true, ngImport: i0, template: "<!--\n  If there's not enough space in the first row, create a separate label row. We mark this row as\n  aria-hidden because we don't want it to be read out as one of the weeks in the month.\n-->\n<tr *ngIf=\"firstRowOffset < labelMinRequiredCells\">\n    <td class=\"mc-calendar__body-label\" [attr.colspan]=\"numCols\">\n        {{ label }}\n    </td>\n</tr>\n\n<!-- Create the first row separately so we can include a special spacer cell. -->\n<tr *ngFor=\"let row of rows; let rowIndex = index\">\n    <!--\n      We mark this cell as aria-hidden so it doesn't get read out as one of the days in the week.\n      The aspect ratio of the table cells is maintained by setting the top and bottom padding as a\n      percentage of the width (a variant of the trick described here:\n      https://www.w3schools.com/howto/howto_css_aspect_ratio.asp).\n    -->\n    <td *ngIf=\"rowIndex === 0 && firstRowOffset\"\n        class=\"mc-calendar__body-label\"\n        [attr.colspan]=\"firstRowOffset\">\n        {{ firstRowOffset >= labelMinRequiredCells ? label : '' }}\n    </td>\n    <td *ngFor=\"let item of row; let colIndex = index\"\n        class=\"mc-calendar__body-cell\"\n        [ngClass]=\"item.cssClasses!\"\n        [tabindex]=\"isActiveCell(rowIndex, colIndex) ? 0 : -1\"\n        [class.mc-calendar__body_disabled]=\"!item.enabled\"\n        [class.mc-calendar__body_active]=\"isActiveCell(rowIndex, colIndex)\"\n        (click)=\"cellClicked(item)\"\n        [style.width]=\"cellWidth\"\n        [style.paddingTop]=\"cellPadding\"\n        [style.paddingBottom]=\"cellPadding\">\n        <div class=\"mc-calendar__body-cell-content\"\n             [class.mc-selected]=\"selectedValue === item.value\"\n             [class.mc-calendar__body-today]=\"todayValue === item.value\">\n            {{ item.displayValue }}\n        </div>\n    </td>\n</tr>\n", styles: [".mc-calendar__body{min-width:224px;min-width:calc(7 * var(--mc-datepicker-body-size-cell-min-size, 32px))}.mc-calendar__body-label{text-align:left;padding:8px 28px 12px 12px;padding:var(--mc-datepicker-body-size-label-paddings, 8px 28px 12px 12px)}.mc-calendar__body-cell{position:relative;height:0;line-height:0;text-align:center;outline:none;cursor:pointer}.mc-calendar__body_disabled{cursor:default}.mc-calendar__body-cell-content{position:absolute;top:5%;top:var(--mc-datepicker-body-size-cell-margin, 5%);left:5%;left:var(--mc-datepicker-body-size-cell-margin, 5%);padding:8px;padding:var(--mc-datepicker-body-size-cell-padding, 8px);display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:90%;height:90%;line-height:1;border-width:1px;border-width:var(--mc-datepicker-body-size-cell-border-width, 1px);border-style:solid}.cdk-high-contrast-active .mc-calendar__body-cell-content{border:none}.cdk-high-contrast-active :host .mc-calendar__body-cell-content{border:none}mc-month-view .mc-calendar__body-cell-content{justify-content:flex-end}mc-multi-year-view .mc-calendar__body-cell-content,mc-year-view .mc-calendar__body-cell-content{justify-content:center}.cdk-high-contrast-active .mc-datepicker__popup:not(:empty),.cdk-high-contrast-active .mc-selected{outline:solid 1px}.cdk-high-contrast-active .mc-calendar__body-today{outline:dotted 1px}.cdk-high-contrast-active :host .mc-datepicker__popup:not(:empty),.cdk-high-contrast-active :host .mc-selected{outline:solid 1px}.cdk-high-contrast-active :host .mc-calendar__body-today{outline:dotted 1px}[dir=rtl] .mc-calendar__body-label{text-align:right}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McCalendarBody, decorators: [{
            type: Component,
            args: [{ selector: '[mc-calendar-body]', exportAs: 'mcCalendarBody', host: {
                        class: 'mc-calendar__body',
                        role: 'grid',
                        'aria-readonly': 'true'
                    }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<!--\n  If there's not enough space in the first row, create a separate label row. We mark this row as\n  aria-hidden because we don't want it to be read out as one of the weeks in the month.\n-->\n<tr *ngIf=\"firstRowOffset < labelMinRequiredCells\">\n    <td class=\"mc-calendar__body-label\" [attr.colspan]=\"numCols\">\n        {{ label }}\n    </td>\n</tr>\n\n<!-- Create the first row separately so we can include a special spacer cell. -->\n<tr *ngFor=\"let row of rows; let rowIndex = index\">\n    <!--\n      We mark this cell as aria-hidden so it doesn't get read out as one of the days in the week.\n      The aspect ratio of the table cells is maintained by setting the top and bottom padding as a\n      percentage of the width (a variant of the trick described here:\n      https://www.w3schools.com/howto/howto_css_aspect_ratio.asp).\n    -->\n    <td *ngIf=\"rowIndex === 0 && firstRowOffset\"\n        class=\"mc-calendar__body-label\"\n        [attr.colspan]=\"firstRowOffset\">\n        {{ firstRowOffset >= labelMinRequiredCells ? label : '' }}\n    </td>\n    <td *ngFor=\"let item of row; let colIndex = index\"\n        class=\"mc-calendar__body-cell\"\n        [ngClass]=\"item.cssClasses!\"\n        [tabindex]=\"isActiveCell(rowIndex, colIndex) ? 0 : -1\"\n        [class.mc-calendar__body_disabled]=\"!item.enabled\"\n        [class.mc-calendar__body_active]=\"isActiveCell(rowIndex, colIndex)\"\n        (click)=\"cellClicked(item)\"\n        [style.width]=\"cellWidth\"\n        [style.paddingTop]=\"cellPadding\"\n        [style.paddingBottom]=\"cellPadding\">\n        <div class=\"mc-calendar__body-cell-content\"\n             [class.mc-selected]=\"selectedValue === item.value\"\n             [class.mc-calendar__body-today]=\"todayValue === item.value\">\n            {{ item.displayValue }}\n        </div>\n    </td>\n</tr>\n", styles: [".mc-calendar__body{min-width:224px;min-width:calc(7 * var(--mc-datepicker-body-size-cell-min-size, 32px))}.mc-calendar__body-label{text-align:left;padding:8px 28px 12px 12px;padding:var(--mc-datepicker-body-size-label-paddings, 8px 28px 12px 12px)}.mc-calendar__body-cell{position:relative;height:0;line-height:0;text-align:center;outline:none;cursor:pointer}.mc-calendar__body_disabled{cursor:default}.mc-calendar__body-cell-content{position:absolute;top:5%;top:var(--mc-datepicker-body-size-cell-margin, 5%);left:5%;left:var(--mc-datepicker-body-size-cell-margin, 5%);padding:8px;padding:var(--mc-datepicker-body-size-cell-padding, 8px);display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:90%;height:90%;line-height:1;border-width:1px;border-width:var(--mc-datepicker-body-size-cell-border-width, 1px);border-style:solid}.cdk-high-contrast-active .mc-calendar__body-cell-content{border:none}.cdk-high-contrast-active :host .mc-calendar__body-cell-content{border:none}mc-month-view .mc-calendar__body-cell-content{justify-content:flex-end}mc-multi-year-view .mc-calendar__body-cell-content,mc-year-view .mc-calendar__body-cell-content{justify-content:center}.cdk-high-contrast-active .mc-datepicker__popup:not(:empty),.cdk-high-contrast-active .mc-selected{outline:solid 1px}.cdk-high-contrast-active .mc-calendar__body-today{outline:dotted 1px}.cdk-high-contrast-active :host .mc-datepicker__popup:not(:empty),.cdk-high-contrast-active :host .mc-selected{outline:solid 1px}.cdk-high-contrast-active :host .mc-calendar__body-today{outline:dotted 1px}[dir=rtl] .mc-calendar__body-label{text-align:right}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { label: [{
                type: Input
            }], rows: [{
                type: Input
            }], todayValue: [{
                type: Input
            }], selectedValue: [{
                type: Input
            }], labelMinRequiredCells: [{
                type: Input
            }], numCols: [{
                type: Input
            }], activeCell: [{
                type: Input
            }], cellAspectRatio: [{
                type: Input
            }], selectedValueChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvZGF0ZXBpY2tlci9jYWxlbmRhci1ib2R5LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9kYXRlcGlja2VyL2NhbGVuZGFyLWJvZHkuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxrQ0FBa0M7QUFDbEMsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLGlCQUFpQixFQUNqQixNQUFNLEVBR1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFRdEM7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLGNBQWM7SUFDdkIsWUFDVyxLQUFhLEVBQ2IsWUFBb0IsRUFDcEIsU0FBaUIsRUFDakIsT0FBZ0IsRUFDaEIsVUFBcUM7UUFKckMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLGlCQUFZLEdBQVosWUFBWSxDQUFRO1FBQ3BCLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDakIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixlQUFVLEdBQVYsVUFBVSxDQUEyQjtJQUM3QyxDQUFDO0NBQ1A7QUFHRDs7O0dBR0c7QUFjSCxNQUFNLE9BQU8sY0FBYztJQXdDdkIsWUFBNkIsVUFBbUMsRUFBbUIsTUFBYztRQUFwRSxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUFtQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBeEJqRywwQ0FBMEM7UUFDakMsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUVyQix1REFBdUQ7UUFDOUMsZUFBVSxHQUFHLENBQUMsQ0FBQztRQUV4Qjs7O1dBR0c7UUFDTSxvQkFBZSxHQUFHLENBQUMsQ0FBQztRQUU3QiwwQ0FBMEM7UUFDdkIsd0JB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ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOm5vLW1hZ2ljLW51bWJlcnNcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBOZ1pvbmUsXG4gICAgT25DaGFuZ2VzLFxuICAgIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbi8qKlxuICogRXh0cmEgQ1NTIGNsYXNzZXMgdGhhdCBjYW4gYmUgYXNzb2NpYXRlZCB3aXRoIGEgY2FsZW5kYXIgY2VsbC5cbiAqL1xuZXhwb3J0IHR5cGUgTWNDYWxlbmRhckNlbGxDc3NDbGFzc2VzID0gc3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPiB8IHsgW2tleTogc3RyaW5nXTogYW55IH07XG5cbi8qKlxuICogQW4gaW50ZXJuYWwgY2xhc3MgdGhhdCByZXByZXNlbnRzIHRoZSBkYXRhIGNvcnJlc3BvbmRpbmcgdG8gYSBzaW5nbGUgY2FsZW5kYXIgY2VsbC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNsYXNzIE1jQ2FsZW5kYXJDZWxsIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHZhbHVlOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBkaXNwbGF5VmFsdWU6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGFyaWFMYWJlbDogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgZW5hYmxlZDogYm9vbGVhbixcbiAgICAgICAgcHVibGljIGNzc0NsYXNzZXM/OiBNY0NhbGVuZGFyQ2VsbENzc0NsYXNzZXNcbiAgICApIHt9XG59XG5cblxuLyoqXG4gKiBBbiBpbnRlcm5hbCBjb21wb25lbnQgdXNlZCB0byBkaXNwbGF5IGNhbGVuZGFyIGRhdGEgaW4gYSB0YWJsZS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbbWMtY2FsZW5kYXItYm9keV0nLFxuICAgIGV4cG9ydEFzOiAnbWNDYWxlbmRhckJvZHknLFxuICAgIHRlbXBsYXRlVXJsOiAnY2FsZW5kYXItYm9keS5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnY2FsZW5kYXItYm9keS5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWNhbGVuZGFyX19ib2R5JyxcbiAgICAgICAgcm9sZTogJ2dyaWQnLFxuICAgICAgICAnYXJpYS1yZWFkb25seSc6ICd0cnVlJ1xuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY0NhbGVuZGFyQm9keSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gICAgLyoqIFRoZSBsYWJlbCBmb3IgdGhlIHRhYmxlLiAoZS5nLiBcIkphbiAyMDE3XCIpLiAqL1xuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG5cbiAgICAvKiogVGhlIGNlbGxzIHRvIGRpc3BsYXkgaW4gdGhlIHRhYmxlLiAqL1xuICAgIEBJbnB1dCgpIHJvd3M6IE1jQ2FsZW5kYXJDZWxsW11bXTtcblxuICAgIC8qKiBUaGUgdmFsdWUgaW4gdGhlIHRhYmxlIHRoYXQgY29ycmVzcG9uZHMgdG8gdG9kYXkuICovXG4gICAgQElucHV0KCkgdG9kYXlWYWx1ZTogbnVtYmVyO1xuXG4gICAgLyoqIFRoZSB2YWx1ZSBpbiB0aGUgdGFibGUgdGhhdCBpcyBjdXJyZW50bHkgc2VsZWN0ZWQuICovXG4gICAgQElucHV0KCkgc2VsZWN0ZWRWYWx1ZTogbnVtYmVyO1xuXG4gICAgLyoqIFRoZSBtaW5pbXVtIG51bWJlciBvZiBmcmVlIGNlbGxzIG5lZWRlZCB0byBmaXQgdGhlIGxhYmVsIGluIHRoZSBmaXJzdCByb3cuICovXG4gICAgQElucHV0KCkgbGFiZWxNaW5SZXF1aXJlZENlbGxzOiBudW1iZXI7XG5cbiAgICAvKiogVGhlIG51bWJlciBvZiBjb2x1bW5zIGluIHRoZSB0YWJsZS4gKi9cbiAgICBASW5wdXQoKSBudW1Db2xzID0gNztcblxuICAgIC8qKiBUaGUgY2VsbCBudW1iZXIgb2YgdGhlIGFjdGl2ZSBjZWxsIGluIHRoZSB0YWJsZS4gKi9cbiAgICBASW5wdXQoKSBhY3RpdmVDZWxsID0gMDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBhc3BlY3QgcmF0aW8gKHdpZHRoIC8gaGVpZ2h0KSB0byB1c2UgZm9yIHRoZSBjZWxscyBpbiB0aGUgdGFibGUuIFRoaXMgYXNwZWN0IHJhdGlvIHdpbGwgYmVcbiAgICAgKiBtYWludGFpbmVkIGV2ZW4gYXMgdGhlIHRhYmxlIHJlc2l6ZXMuXG4gICAgICovXG4gICAgQElucHV0KCkgY2VsbEFzcGVjdFJhdGlvID0gMTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIGEgbmV3IHZhbHVlIGlzIHNlbGVjdGVkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3RlZFZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgLyoqIFRoZSBudW1iZXIgb2YgYmxhbmsgY2VsbHMgdG8gcHV0IGF0IHRoZSBiZWdpbm5pbmcgZm9yIHRoZSBmaXJzdCByb3cuICovXG4gICAgZmlyc3RSb3dPZmZzZXQ6IG51bWJlcjtcblxuICAgIC8qKiBQYWRkaW5nIGZvciB0aGUgaW5kaXZpZHVhbCBkYXRlIGNlbGxzLiAqL1xuICAgIGNlbGxQYWRkaW5nOiBzdHJpbmc7XG5cbiAgICAvKiogV2lkdGggb2YgYW4gaW5kaXZpZHVhbCBjZWxsLiAqL1xuICAgIGNlbGxXaWR0aDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgcHJpdmF0ZSByZWFkb25seSBuZ1pvbmU6IE5nWm9uZSkge31cblxuICAgIGNlbGxDbGlja2VkKGNlbGw6IE1jQ2FsZW5kYXJDZWxsKTogdm9pZCB7XG4gICAgICAgIGlmIChjZWxsLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZUNoYW5nZS5lbWl0KGNlbGwudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBjb25zdCBjb2x1bW5DaGFuZ2VzID0gY2hhbmdlcy5udW1Db2xzO1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdGhpcy1hc3NpZ25tZW50XG4gICAgICAgIGNvbnN0IHsgcm93cywgbnVtQ29scyB9ID0gdGhpcztcblxuICAgICAgICBpZiAoY2hhbmdlcy5yb3dzIHx8IGNvbHVtbkNoYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZmlyc3RSb3dPZmZzZXQgPSByb3dzICYmIHJvd3MubGVuZ3RoICYmIHJvd3NbMF0ubGVuZ3RoID8gbnVtQ29scyAtIHJvd3NbMF0ubGVuZ3RoIDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFuZ2VzLmNlbGxBc3BlY3RSYXRpbyB8fCBjb2x1bW5DaGFuZ2VzIHx8ICF0aGlzLmNlbGxQYWRkaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxQYWRkaW5nID0gYCR7dGhpcy5jZWxsQXNwZWN0UmF0aW8gKiA1MCAvIG51bUNvbHN9JWA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29sdW1uQ2hhbmdlcyB8fCAhdGhpcy5jZWxsV2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMuY2VsbFdpZHRoID0gYCR7MTAwIC8gbnVtQ29sc30lYDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzQWN0aXZlQ2VsbChyb3dJbmRleDogbnVtYmVyLCBjb2xJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBjZWxsTnVtYmVyID0gcm93SW5kZXggKiB0aGlzLm51bUNvbHMgKyBjb2xJbmRleDtcblxuICAgICAgICAvLyBBY2NvdW50IGZvciB0aGUgZmFjdCB0aGF0IHRoZSBmaXJzdCByb3cgbWF5IG5vdCBoYXZlIGFzIG1hbnkgY2VsbHMuXG4gICAgICAgIGlmIChyb3dJbmRleCkge1xuICAgICAgICAgICAgY2VsbE51bWJlciAtPSB0aGlzLmZpcnN0Um93T2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNlbGxOdW1iZXIgPT09IHRoaXMuYWN0aXZlQ2VsbDtcbiAgICB9XG5cbiAgICAvKiogRm9jdXNlcyB0aGUgYWN0aXZlIGNlbGwgYWZ0ZXIgdGhlIG1pY3JvdGFzayBxdWV1ZSBpcyBlbXB0eS4gKi9cbiAgICBmb2N1c0FjdGl2ZUNlbGwoKSB7XG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlLmFzT2JzZXJ2YWJsZSgpLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVDZWxsOiBIVE1MRWxlbWVudCB8IG51bGwgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWMtY2FsZW5kYXJfX2JvZHlfYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlQ2VsbCkge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVDZWxsLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIjwhLS1cbiAgSWYgdGhlcmUncyBub3QgZW5vdWdoIHNwYWNlIGluIHRoZSBmaXJzdCByb3csIGNyZWF0ZSBhIHNlcGFyYXRlIGxhYmVsIHJvdy4gV2UgbWFyayB0aGlzIHJvdyBhc1xuICBhcmlhLWhpZGRlbiBiZWNhdXNlIHdlIGRvbid0IHdhbnQgaXQgdG8gYmUgcmVhZCBvdXQgYXMgb25lIG9mIHRoZSB3ZWVrcyBpbiB0aGUgbW9udGguXG4tLT5cbjx0ciAqbmdJZj1cImZpcnN0Um93T2Zmc2V0IDwgbGFiZWxNaW5SZXF1aXJlZENlbGxzXCI+XG4gICAgPHRkIGNsYXNzPVwibWMtY2FsZW5kYXJfX2JvZHktbGFiZWxcIiBbYXR0ci5jb2xzcGFuXT1cIm51bUNvbHNcIj5cbiAgICAgICAge3sgbGFiZWwgfX1cbiAgICA8L3RkPlxuPC90cj5cblxuPCEtLSBDcmVhdGUgdGhlIGZpcnN0IHJvdyBzZXBhcmF0ZWx5IHNvIHdlIGNhbiBpbmNsdWRlIGEgc3BlY2lhbCBzcGFjZXIgY2VsbC4gLS0+XG48dHIgKm5nRm9yPVwibGV0IHJvdyBvZiByb3dzOyBsZXQgcm93SW5kZXggPSBpbmRleFwiPlxuICAgIDwhLS1cbiAgICAgIFdlIG1hcmsgdGhpcyBjZWxsIGFzIGFyaWEtaGlkZGVuIHNvIGl0IGRvZXNuJ3QgZ2V0IHJlYWQgb3V0IGFzIG9uZSBvZiB0aGUgZGF5cyBpbiB0aGUgd2Vlay5cbiAgICAgIFRoZSBhc3BlY3QgcmF0aW8gb2YgdGhlIHRhYmxlIGNlbGxzIGlzIG1haW50YWluZWQgYnkgc2V0dGluZyB0aGUgdG9wIGFuZCBib3R0b20gcGFkZGluZyBhcyBhXG4gICAgICBwZXJjZW50YWdlIG9mIHRoZSB3aWR0aCAoYSB2YXJpYW50IG9mIHRoZSB0cmljayBkZXNjcmliZWQgaGVyZTpcbiAgICAgIGh0dHBzOi8vd3d3Lnczc2Nob29scy5jb20vaG93dG8vaG93dG9fY3NzX2FzcGVjdF9yYXRpby5hc3ApLlxuICAgIC0tPlxuICAgIDx0ZCAqbmdJZj1cInJvd0luZGV4ID09PSAwICYmIGZpcnN0Um93T2Zmc2V0XCJcbiAgICAgICAgY2xhc3M9XCJtYy1jYWxlbmRhcl9fYm9keS1sYWJlbFwiXG4gICAgICAgIFthdHRyLmNvbHNwYW5dPVwiZmlyc3RSb3dPZmZzZXRcIj5cbiAgICAgICAge3sgZmlyc3RSb3dPZmZzZXQgPj0gbGFiZWxNaW5SZXF1aXJlZENlbGxzID8gbGFiZWwgOiAnJyB9fVxuICAgIDwvdGQ+XG4gICAgPHRkICpuZ0Zvcj1cImxldCBpdGVtIG9mIHJvdzsgbGV0IGNvbEluZGV4ID0gaW5kZXhcIlxuICAgICAgICBjbGFzcz1cIm1jLWNhbGVuZGFyX19ib2R5LWNlbGxcIlxuICAgICAgICBbbmdDbGFzc109XCJpdGVtLmNzc0NsYXNzZXMhXCJcbiAgICAgICAgW3RhYmluZGV4XT1cImlzQWN0aXZlQ2VsbChyb3dJbmRleCwgY29sSW5kZXgpID8gMCA6IC0xXCJcbiAgICAgICAgW2NsYXNzLm1jLWNhbGVuZGFyX19ib2R5X2Rpc2FibGVkXT1cIiFpdGVtLmVuYWJsZWRcIlxuICAgICAgICBbY2xhc3MubWMtY2FsZW5kYXJfX2JvZHlfYWN0aXZlXT1cImlzQWN0aXZlQ2VsbChyb3dJbmRleCwgY29sSW5kZXgpXCJcbiAgICAgICAgKGNsaWNrKT1cImNlbGxDbGlja2VkKGl0ZW0pXCJcbiAgICAgICAgW3N0eWxlLndpZHRoXT1cImNlbGxXaWR0aFwiXG4gICAgICAgIFtzdHlsZS5wYWRkaW5nVG9wXT1cImNlbGxQYWRkaW5nXCJcbiAgICAgICAgW3N0eWxlLnBhZGRpbmdCb3R0b21dPVwiY2VsbFBhZGRpbmdcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1jLWNhbGVuZGFyX19ib2R5LWNlbGwtY29udGVudFwiXG4gICAgICAgICAgICAgW2NsYXNzLm1jLXNlbGVjdGVkXT1cInNlbGVjdGVkVmFsdWUgPT09IGl0ZW0udmFsdWVcIlxuICAgICAgICAgICAgIFtjbGFzcy5tYy1jYWxlbmRhcl9fYm9keS10b2RheV09XCJ0b2RheVZhbHVlID09PSBpdGVtLnZhbHVlXCI+XG4gICAgICAgICAgICB7eyBpdGVtLmRpc3BsYXlWYWx1ZSB9fVxuICAgICAgICA8L2Rpdj5cbiAgICA8L3RkPlxuPC90cj5cbiJdfQ==