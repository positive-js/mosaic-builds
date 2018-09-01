import { ElementRef, QueryList } from '@angular/core';
/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a @ContentChildren(McLine) query, then
 * counted by checking the query list's length.
 */
export declare class McLine {
}
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * @docs-private
 */
export declare class McLineSetter {
    private _lines;
    private _element;
    constructor(_lines: QueryList<McLine>, _element: ElementRef);
    private _setLineClass;
    private _resetClasses;
    private _setClass;
}
export declare class McLineModule {
}
