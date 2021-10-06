import { ElementRef, QueryList } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a @ContentChildren(McLine) query, then
 * counted by checking the query list's length.
 */
export declare class McLine {
    static ɵfac: i0.ɵɵFactoryDeclaration<McLine, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McLine, "[mc-line], [mcLine]", never, {}, {}, never>;
}
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * @docs-private
 */
export declare class McLineSetter {
    private _lines;
    private _element;
    constructor(_lines: QueryList<McLine>, _element: ElementRef);
    private setLineClass;
    private resetClasses;
    private setClass;
}
export declare class McLineModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<McLineModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<McLineModule, [typeof McLine], never, [typeof McLine]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<McLineModule>;
}
