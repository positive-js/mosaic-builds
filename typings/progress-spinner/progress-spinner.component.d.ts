import { ElementRef } from '@angular/core';
import { CanColor, CanColorCtor, ThemePalette } from '@ptsecurity/mosaic/core';
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
    color: ThemePalette;
    constructor(elementRef: ElementRef);
    readonly percentage: number;
    readonly dashOffsetPercent: string;
}
