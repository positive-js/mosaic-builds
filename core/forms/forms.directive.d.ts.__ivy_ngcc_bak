import { AfterContentInit, ElementRef, QueryList } from '@angular/core';
export declare class McFormElement implements AfterContentInit {
    private readonly element;
    margin: boolean;
    isRow: boolean;
    isFieldSet: boolean;
    hasLegend: boolean;
    isHorizontal: boolean;
    elements: QueryList<McFormElement>;
    constructor(element: ElementRef<HTMLElement>);
    ngAfterContentInit(): void;
}
export declare class McForm implements AfterContentInit {
    elements: QueryList<McFormElement>;
    ngAfterContentInit(): void;
    handleElements(elements: QueryList<McFormElement>): void;
}
