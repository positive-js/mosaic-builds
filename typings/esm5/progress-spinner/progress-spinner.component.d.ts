import { ElementRef } from '@angular/core';
import { CanColor, ThemePalette } from '@ptsecurity/mosaic/core';
export declare type ProgressSpinnerMode = 'determinate' | 'indeterminate';
export declare class McProgressSpinnerBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const _McProgressPinnerMixinBase: (new (...args: any[]) => CanColor) & typeof McProgressSpinnerBase;
export declare class McProgressSpinner extends _McProgressPinnerMixinBase implements CanColor {
    id: string;
    value: number;
    mode: ProgressSpinnerMode;
    color: ThemePalette;
    constructor(elementRef: ElementRef);
    readonly percentage: number;
    readonly dashOffsetPercent: string;
}
