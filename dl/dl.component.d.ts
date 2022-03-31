import { AfterContentInit, ElementRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class McDlComponent implements AfterContentInit, OnDestroy {
    protected elementRef: ElementRef;
    minWidth: number;
    wide: boolean;
    vertical: boolean | null;
    readonly resizeStream: Subject<Event>;
    private readonly resizeDebounceInterval;
    private resizeSubscription;
    constructor(elementRef: ElementRef);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    updateState: () => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McDlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McDlComponent, "mc-dl", never, { "minWidth": "minWidth"; "wide": "wide"; "vertical": "vertical"; }, {}, never, ["*"]>;
}
export declare class McDtComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<McDtComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McDtComponent, "mc-dt", never, {}, {}, never, ["*"]>;
}
export declare class McDdComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<McDdComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McDdComponent, "mc-dd", never, {}, {}, never, ["*"]>;
}
