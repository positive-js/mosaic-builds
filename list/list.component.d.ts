import { AfterContentInit, ElementRef, QueryList } from '@angular/core';
import { McLine } from '@ptsecurity/mosaic/core';
import * as i0 from "@angular/core";
export declare class McList {
    static ɵfac: i0.ɵɵFactoryDeclaration<McList, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McList, "mc-list", never, {}, {}, never, ["*"]>;
}
export declare class McListItem implements AfterContentInit {
    private elementRef;
    lines: QueryList<McLine>;
    constructor(elementRef: ElementRef);
    ngAfterContentInit(): void;
    handleFocus(): void;
    handleBlur(): void;
    getHostElement(): HTMLElement;
    static ɵfac: i0.ɵɵFactoryDeclaration<McListItem, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McListItem, "mc-list-item, a[mc-list-item]", never, {}, {}, ["lines"], ["[mc-list-icon], [mcListIcon]", "[mc-line], [mcLine]", "*"]>;
}
