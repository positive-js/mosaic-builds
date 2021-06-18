import { ElementRef, QueryList } from '@angular/core';
/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a @ContentChildren(McLine) query, then
 * counted by checking the query list's length.
 */
import * as ɵngcc0 from '@angular/core';
export declare class McLine {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<McLine, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<McLine, "[mc-line], [mcLine]", never, {}, {}, never>;
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<McLineModule, never>;
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<McLineModule, [typeof McLine], never, [typeof McLine]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<McLineModule>;
}

//# sourceMappingURL=line.d.ts.map