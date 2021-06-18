import { AfterContentInit, ElementRef, QueryList } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<McFormElement, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<McFormElement, ".mc-form__row, .mc-form__fieldset, .mc-form__legend", ["mcFormElement"], {}, {}, ["elements"]>;
}
export declare class McForm implements AfterContentInit {
    elements: QueryList<McFormElement>;
    ngAfterContentInit(): void;
    handleElements(elements: QueryList<McFormElement>): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<McForm, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<McForm, ".mc-form-vertical, .mc-form-horizontal", ["mcForm"], {}, {}, ["elements"]>;
}

//# sourceMappingURL=forms.directive.d.ts.map