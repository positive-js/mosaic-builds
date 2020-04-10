import { ElementRef } from '@angular/core';
import { CanColor, CanColorCtor, ThemePalette } from '@ptsecurity/mosaic/core';
export declare type ProgressBarMode = 'determinate' | 'indeterminate';
export declare class McProgressBarBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const McProgressBarMixinBase: CanColorCtor & typeof McProgressBarBase;
export declare class McProgressBar extends McProgressBarMixinBase implements CanColor {
    id: string;
    value: number;
    mode: ProgressBarMode;
    color: ThemePalette;
    constructor(elementRef: ElementRef);
    get percentage(): number;
}
