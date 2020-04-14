import { AfterContentInit, ElementRef, QueryList } from '@angular/core';
import { McLine } from '@ptsecurity/mosaic/core';
export declare class McList {
}
export declare class McListItem implements AfterContentInit {
    private elementRef;
    lines: QueryList<McLine>;
    constructor(elementRef: ElementRef);
    ngAfterContentInit(): void;
    handleFocus(): void;
    handleBlur(): void;
    getHostElement(): HTMLElement;
}
