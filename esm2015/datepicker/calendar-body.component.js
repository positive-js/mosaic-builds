// tslint:disable:no-magic-numbers
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation, NgZone } from '@angular/core';
import { take } from 'rxjs/operators';
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
McCalendarBody.decorators = [
    { type: Component, args: [{
                selector: '[mc-calendar-body]',
                exportAs: 'mcCalendarBody',
                template: "<!--\n  If there's not enough space in the first row, create a separate label row. We mark this row as\n  aria-hidden because we don't want it to be read out as one of the weeks in the month.\n-->\n<tr *ngIf=\"firstRowOffset < labelMinRequiredCells\">\n    <td class=\"mc-calendar__body-label\" [attr.colspan]=\"numCols\">\n        {{ label }}\n    </td>\n</tr>\n\n<!-- Create the first row separately so we can include a special spacer cell. -->\n<tr *ngFor=\"let row of rows; let rowIndex = index\">\n    <!--\n      We mark this cell as aria-hidden so it doesn't get read out as one of the days in the week.\n      The aspect ratio of the table cells is maintained by setting the top and bottom padding as a\n      percentage of the width (a variant of the trick described here:\n      https://www.w3schools.com/howto/howto_css_aspect_ratio.asp).\n    -->\n    <td *ngIf=\"rowIndex === 0 && firstRowOffset\"\n        class=\"mc-calendar__body-label\"\n        [attr.colspan]=\"firstRowOffset\">\n        {{ firstRowOffset >= labelMinRequiredCells ? label : '' }}\n    </td>\n    <td *ngFor=\"let item of row; let colIndex = index\"\n        class=\"mc-calendar__body-cell\"\n        [ngClass]=\"item.cssClasses\"\n        [tabindex]=\"isActiveCell(rowIndex, colIndex) ? 0 : -1\"\n        [class.mc-calendar__body_disabled]=\"!item.enabled\"\n        [class.mc-calendar__body_active]=\"isActiveCell(rowIndex, colIndex)\"\n        (click)=\"cellClicked(item)\"\n        [style.width]=\"cellWidth\"\n        [style.paddingTop]=\"cellPadding\"\n        [style.paddingBottom]=\"cellPadding\">\n        <div class=\"mc-calendar__body-cell-content\"\n             [class.mc-selected]=\"selectedValue === item.value\"\n             [class.mc-calendar__body-today]=\"todayValue === item.value\">\n            {{ item.displayValue }}\n        </div>\n    </td>\n</tr>\n",
                host: {
                    class: 'mc-calendar__body',
                    role: 'grid',
                    'aria-readonly': 'true'
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mc-calendar__body{min-width:calc(7 * var(--mc-datepicker-body-size-cell-min-size, $datepicker-body-size-cell-min-size))}.mc-calendar__body-label{text-align:left;padding:var(--mc-datepicker-body-size-label-paddings,8px 28px 12px 12px)}.mc-calendar__body-cell{position:relative;height:0;line-height:0;text-align:center;outline:none;cursor:pointer}.mc-calendar__body_disabled{cursor:default}.mc-calendar__body-cell-content{position:absolute;top:var(--mc-datepicker-body-size-cell-margin,5%);left:var(--mc-datepicker-body-size-cell-margin,5%);padding:var(--mc-datepicker-body-size-cell-padding,8px);display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:90%;height:90%;line-height:1;border-width:var(--mc-datepicker-body-size-cell-border-width,1px);border-style:solid}.cdk-high-contrast-active .mc-calendar__body-cell-content,.cdk-high-contrast-active :host .mc-calendar__body-cell-content{border:none}mc-month-view .mc-calendar__body-cell-content{justify-content:flex-end}mc-multi-year-view .mc-calendar__body-cell-content,mc-year-view .mc-calendar__body-cell-content{justify-content:center}.cdk-high-contrast-active .mc-datepicker__popup:not(:empty),.cdk-high-contrast-active .mc-selected{outline:1px solid}.cdk-high-contrast-active .mc-calendar__body-today{outline:1px dotted}.cdk-high-contrast-active :host .mc-datepicker__popup:not(:empty),.cdk-high-contrast-active :host .mc-selected{outline:1px solid}.cdk-high-contrast-active :host .mc-calendar__body-today{outline:1px dotted}[dir=rtl] .mc-calendar__body-label{text-align:right}"]
            },] }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvZGF0ZXBpY2tlci9jYWxlbmRhci1ib2R5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxrQ0FBa0M7QUFDbEMsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLGlCQUFpQixFQUNqQixNQUFNLEVBR1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBUXRDOzs7R0FHRztBQUNILE1BQU0sT0FBTyxjQUFjO0lBQ3ZCLFlBQ1csS0FBYSxFQUNiLFlBQW9CLEVBQ3BCLFNBQWlCLEVBQ2pCLE9BQWdCLEVBQ2hCLFVBQXFDO1FBSnJDLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixpQkFBWSxHQUFaLFlBQVksQ0FBUTtRQUNwQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ2pCLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsZUFBVSxHQUFWLFVBQVUsQ0FBMkI7SUFDN0MsQ0FBQztDQUNQO0FBR0Q7OztHQUdHO0FBY0gsTUFBTSxPQUFPLGNBQWM7SUF3Q3ZCLFlBQTZCLFVBQW1DLEVBQW1CLE1BQWM7UUFBcEUsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFBbUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQXhCakcsMENBQTBDO1FBQ2pDLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFFckIsdURBQXVEO1FBQzlDLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFFeEI7OztXQUdHO1FBQ00sb0JBQWUsR0FBRyxDQUFDLENBQUM7UUFFN0IsMENBQTBDO1FBQ3ZCLHdCQUFtQixHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO0lBV1UsQ0FBQztJQUVyRyxXQUFXLENBQUMsSUFBb0I7UUFDNUIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0M7SUFDTCxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDdEMsOENBQThDO1FBQzlDLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBRS9CLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxhQUFhLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzlGO1FBRUQsSUFBSSxPQUFPLENBQUMsZUFBZSxJQUFJLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDL0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxHQUFHLE9BQU8sR0FBRyxDQUFDO1NBQ2hFO1FBRUQsSUFBSSxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLEdBQUcsT0FBTyxHQUFHLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBRUQsWUFBWSxDQUFDLFFBQWdCLEVBQUUsUUFBZ0I7UUFDM0MsSUFBSSxVQUFVLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO1FBRXBELHNFQUFzRTtRQUN0RSxJQUFJLFFBQVEsRUFBRTtZQUNWLFVBQVUsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDO1NBQ3JDO1FBRUQsT0FBTyxVQUFVLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMxQyxDQUFDO0lBRUQsa0VBQWtFO0lBQ2xFLGVBQWU7UUFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDN0QsTUFBTSxVQUFVLEdBQ1osSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLDJCQUEyQixDQUFDLENBQUM7Z0JBRTdFLElBQUksVUFBVSxFQUFFO29CQUNaLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDdEI7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7O1lBdEdKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixrMURBQWlDO2dCQUVqQyxJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLG1CQUFtQjtvQkFDMUIsSUFBSSxFQUFFLE1BQU07b0JBQ1osZUFBZSxFQUFFLE1BQU07aUJBQzFCO2dCQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7Ozs7WUFoREcsVUFBVTtZQUtWLE1BQU07OztvQkE4Q0wsS0FBSzttQkFHTCxLQUFLO3lCQUdMLEtBQUs7NEJBR0wsS0FBSztvQ0FHTCxLQUFLO3NCQUdMLEtBQUs7eUJBR0wsS0FBSzs4QkFNTCxLQUFLO2tDQUdMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTpuby1tYWdpYy1udW1iZXJzXG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgTmdab25lLFxuICAgIE9uQ2hhbmdlcyxcbiAgICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG4vKipcbiAqIEV4dHJhIENTUyBjbGFzc2VzIHRoYXQgY2FuIGJlIGFzc29jaWF0ZWQgd2l0aCBhIGNhbGVuZGFyIGNlbGwuXG4gKi9cbmV4cG9ydCB0eXBlIE1jQ2FsZW5kYXJDZWxsQ3NzQ2xhc3NlcyA9IHN0cmluZyB8IHN0cmluZ1tdIHwgU2V0PHN0cmluZz4gfCB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xuXG4vKipcbiAqIEFuIGludGVybmFsIGNsYXNzIHRoYXQgcmVwcmVzZW50cyB0aGUgZGF0YSBjb3JyZXNwb25kaW5nIHRvIGEgc2luZ2xlIGNhbGVuZGFyIGNlbGwuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjbGFzcyBNY0NhbGVuZGFyQ2VsbCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyB2YWx1ZTogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgZGlzcGxheVZhbHVlOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBhcmlhTGFiZWw6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW4sXG4gICAgICAgIHB1YmxpYyBjc3NDbGFzc2VzPzogTWNDYWxlbmRhckNlbGxDc3NDbGFzc2VzXG4gICAgKSB7fVxufVxuXG5cbi8qKlxuICogQW4gaW50ZXJuYWwgY29tcG9uZW50IHVzZWQgdG8gZGlzcGxheSBjYWxlbmRhciBkYXRhIGluIGEgdGFibGUuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnW21jLWNhbGVuZGFyLWJvZHldJyxcbiAgICBleHBvcnRBczogJ21jQ2FsZW5kYXJCb2R5JyxcbiAgICB0ZW1wbGF0ZVVybDogJ2NhbGVuZGFyLWJvZHkuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2NhbGVuZGFyLWJvZHkuc2NzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1jYWxlbmRhcl9fYm9keScsXG4gICAgICAgIHJvbGU6ICdncmlkJyxcbiAgICAgICAgJ2FyaWEtcmVhZG9ubHknOiAndHJ1ZSdcbiAgICB9LFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWNDYWxlbmRhckJvZHkgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIC8qKiBUaGUgbGFiZWwgZm9yIHRoZSB0YWJsZS4gKGUuZy4gXCJKYW4gMjAxN1wiKS4gKi9cbiAgICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuXG4gICAgLyoqIFRoZSBjZWxscyB0byBkaXNwbGF5IGluIHRoZSB0YWJsZS4gKi9cbiAgICBASW5wdXQoKSByb3dzOiBNY0NhbGVuZGFyQ2VsbFtdW107XG5cbiAgICAvKiogVGhlIHZhbHVlIGluIHRoZSB0YWJsZSB0aGF0IGNvcnJlc3BvbmRzIHRvIHRvZGF5LiAqL1xuICAgIEBJbnB1dCgpIHRvZGF5VmFsdWU6IG51bWJlcjtcblxuICAgIC8qKiBUaGUgdmFsdWUgaW4gdGhlIHRhYmxlIHRoYXQgaXMgY3VycmVudGx5IHNlbGVjdGVkLiAqL1xuICAgIEBJbnB1dCgpIHNlbGVjdGVkVmFsdWU6IG51bWJlcjtcblxuICAgIC8qKiBUaGUgbWluaW11bSBudW1iZXIgb2YgZnJlZSBjZWxscyBuZWVkZWQgdG8gZml0IHRoZSBsYWJlbCBpbiB0aGUgZmlyc3Qgcm93LiAqL1xuICAgIEBJbnB1dCgpIGxhYmVsTWluUmVxdWlyZWRDZWxsczogbnVtYmVyO1xuXG4gICAgLyoqIFRoZSBudW1iZXIgb2YgY29sdW1ucyBpbiB0aGUgdGFibGUuICovXG4gICAgQElucHV0KCkgbnVtQ29scyA9IDc7XG5cbiAgICAvKiogVGhlIGNlbGwgbnVtYmVyIG9mIHRoZSBhY3RpdmUgY2VsbCBpbiB0aGUgdGFibGUuICovXG4gICAgQElucHV0KCkgYWN0aXZlQ2VsbCA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYXNwZWN0IHJhdGlvICh3aWR0aCAvIGhlaWdodCkgdG8gdXNlIGZvciB0aGUgY2VsbHMgaW4gdGhlIHRhYmxlLiBUaGlzIGFzcGVjdCByYXRpbyB3aWxsIGJlXG4gICAgICogbWFpbnRhaW5lZCBldmVuIGFzIHRoZSB0YWJsZSByZXNpemVzLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGNlbGxBc3BlY3RSYXRpbyA9IDE7XG5cbiAgICAvKiogRW1pdHMgd2hlbiBhIG5ldyB2YWx1ZSBpcyBzZWxlY3RlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0ZWRWYWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIC8qKiBUaGUgbnVtYmVyIG9mIGJsYW5rIGNlbGxzIHRvIHB1dCBhdCB0aGUgYmVnaW5uaW5nIGZvciB0aGUgZmlyc3Qgcm93LiAqL1xuICAgIGZpcnN0Um93T2Zmc2V0OiBudW1iZXI7XG5cbiAgICAvKiogUGFkZGluZyBmb3IgdGhlIGluZGl2aWR1YWwgZGF0ZSBjZWxscy4gKi9cbiAgICBjZWxsUGFkZGluZzogc3RyaW5nO1xuXG4gICAgLyoqIFdpZHRoIG9mIGFuIGluZGl2aWR1YWwgY2VsbC4gKi9cbiAgICBjZWxsV2lkdGg6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByaXZhdGUgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmUpIHt9XG5cbiAgICBjZWxsQ2xpY2tlZChjZWxsOiBNY0NhbGVuZGFyQ2VsbCk6IHZvaWQge1xuICAgICAgICBpZiAoY2VsbC5lbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVmFsdWVDaGFuZ2UuZW1pdChjZWxsLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgY29uc3QgY29sdW1uQ2hhbmdlcyA9IGNoYW5nZXMubnVtQ29scztcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXRoaXMtYXNzaWdubWVudFxuICAgICAgICBjb25zdCB7IHJvd3MsIG51bUNvbHMgfSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKGNoYW5nZXMucm93cyB8fCBjb2x1bW5DaGFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLmZpcnN0Um93T2Zmc2V0ID0gcm93cyAmJiByb3dzLmxlbmd0aCAmJiByb3dzWzBdLmxlbmd0aCA/IG51bUNvbHMgLSByb3dzWzBdLmxlbmd0aCA6IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlcy5jZWxsQXNwZWN0UmF0aW8gfHwgY29sdW1uQ2hhbmdlcyB8fCAhdGhpcy5jZWxsUGFkZGluZykge1xuICAgICAgICAgICAgdGhpcy5jZWxsUGFkZGluZyA9IGAke3RoaXMuY2VsbEFzcGVjdFJhdGlvICogNTAgLyBudW1Db2xzfSVgO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbHVtbkNoYW5nZXMgfHwgIXRoaXMuY2VsbFdpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxXaWR0aCA9IGAkezEwMCAvIG51bUNvbHN9JWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0FjdGl2ZUNlbGwocm93SW5kZXg6IG51bWJlciwgY29sSW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgY2VsbE51bWJlciA9IHJvd0luZGV4ICogdGhpcy5udW1Db2xzICsgY29sSW5kZXg7XG5cbiAgICAgICAgLy8gQWNjb3VudCBmb3IgdGhlIGZhY3QgdGhhdCB0aGUgZmlyc3Qgcm93IG1heSBub3QgaGF2ZSBhcyBtYW55IGNlbGxzLlxuICAgICAgICBpZiAocm93SW5kZXgpIHtcbiAgICAgICAgICAgIGNlbGxOdW1iZXIgLT0gdGhpcy5maXJzdFJvd09mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjZWxsTnVtYmVyID09PSB0aGlzLmFjdGl2ZUNlbGw7XG4gICAgfVxuXG4gICAgLyoqIEZvY3VzZXMgdGhlIGFjdGl2ZSBjZWxsIGFmdGVyIHRoZSBtaWNyb3Rhc2sgcXVldWUgaXMgZW1wdHkuICovXG4gICAgZm9jdXNBY3RpdmVDZWxsKCkge1xuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5nWm9uZS5vblN0YWJsZS5hc09ic2VydmFibGUoKS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlQ2VsbDogSFRNTEVsZW1lbnQgfCBudWxsID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1jLWNhbGVuZGFyX19ib2R5X2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUNlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlQ2VsbC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=