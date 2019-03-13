import { ElementRef, EventEmitter, NgZone, OnChanges, SimpleChanges } from '@angular/core';
/**
 * Extra CSS classes that can be associated with a calendar cell.
 */
export declare type McCalendarCellCssClasses = string | string[] | Set<string> | {
    [key: string]: any;
};
/**
 * An internal class that represents the data corresponding to a single calendar cell.
 * @docs-private
 */
export declare class McCalendarCell {
    value: number;
    displayValue: string;
    ariaLabel: string;
    enabled: boolean;
    cssClasses?: McCalendarCellCssClasses;
    constructor(value: number, displayValue: string, ariaLabel: string, enabled: boolean, cssClasses?: McCalendarCellCssClasses);
}
/**
 * An internal component used to display calendar data in a table.
 * @docs-private
 */
export declare class McCalendarBody implements OnChanges {
    private elementRef;
    private ngZone;
    /** The label for the table. (e.g. "Jan 2017"). */
    label: string;
    /** The cells to display in the table. */
    rows: McCalendarCell[][];
    /** The value in the table that corresponds to today. */
    todayValue: number;
    /** The value in the table that is currently selected. */
    selectedValue: number;
    /** The minimum number of free cells needed to fit the label in the first row. */
    labelMinRequiredCells: number;
    /** The number of columns in the table. */
    numCols: number;
    /** The cell number of the active cell in the table. */
    activeCell: number;
    /**
     * The aspect ratio (width / height) to use for the cells in the table. This aspect ratio will be
     * maintained even as the table resizes.
     */
    cellAspectRatio: number;
    /** Emits when a new value is selected. */
    readonly selectedValueChange: EventEmitter<number>;
    /** The number of blank cells to put at the beginning for the first row. */
    firstRowOffset: number;
    /** Padding for the individual date cells. */
    cellPadding: string;
    /** Width of an individual cell. */
    cellWidth: string;
    constructor(elementRef: ElementRef<HTMLElement>, ngZone: NgZone);
    cellClicked(cell: McCalendarCell): void;
    ngOnChanges(changes: SimpleChanges): void;
    isActiveCell(rowIndex: number, colIndex: number): boolean;
    /** Focuses the active cell after the microtask queue is empty. */
    focusActiveCell(): void;
}
