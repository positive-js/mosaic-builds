import { AfterContentInit, ElementRef, QueryList } from '@angular/core';
import * as i0 from "@angular/core";
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
    static ɵfac: i0.ɵɵFactoryDeclaration<McFormElement, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McFormElement, ".mc-form__row, .mc-form__fieldset, .mc-form__legend", ["mcFormElement"], {}, {}, ["elements"]>;
}
export declare class McForm implements AfterContentInit {
    elements: QueryList<McFormElement>;
    ngAfterContentInit(): void;
    handleElements(elements: QueryList<McFormElement>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McForm, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McForm, ".mc-form-vertical, .mc-form-horizontal", ["mcForm"], {}, {}, ["elements"]>;
}
