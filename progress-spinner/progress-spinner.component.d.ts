import { ElementRef } from '@angular/core';
import { CanColor, CanColorCtor } from '@ptsecurity/mosaic/core';
import * as i0 from "@angular/core";
export declare type ProgressSpinnerMode = 'determinate' | 'indeterminate';
export declare class McProgressSpinnerBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const McProgressSpinnerMixinBase: CanColorCtor & typeof McProgressSpinnerBase;
export declare class McProgressSpinner extends McProgressSpinnerMixinBase implements CanColor {
    id: string;
    value: number;
    mode: ProgressSpinnerMode;
    constructor(elementRef: ElementRef);
    get percentage(): number;
    get dashOffsetPercent(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<McProgressSpinner, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McProgressSpinner, "mc-progress-spinner", never, { "color": "color"; "id": "id"; "value": "value"; "mode": "mode"; }, {}, never, never>;
}
