import { ElementRef } from '@angular/core';
import { CanColor, CanColorCtor } from '@ptsecurity/mosaic/core';
export declare class McIconCSSStyler {
}
export declare class McIconBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const McIconMixinBase: CanColorCtor & typeof McIconBase;
export declare class McIcon extends McIconMixinBase implements CanColor {
    constructor(elementRef: ElementRef, iconName: string);
    getHostElement(): any;
}
