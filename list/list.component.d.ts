import { AfterContentInit, ElementRef, QueryList } from '@angular/core';
import { McLine } from '@ptsecurity/mosaic/core';
export declare class McListBase {
}
export declare class McList extends McListBase {
}
export declare class McListItemBase {
}
export declare class McListItem extends McListItemBase implements AfterContentInit {
    private _element;
    lines: QueryList<McLine>;
    constructor(_element: ElementRef);
    ngAfterContentInit(): void;
    handleFocus(): void;
    handleBlur(): void;
    getHostElement(): HTMLElement;
}
