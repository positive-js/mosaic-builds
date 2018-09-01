import { ElementRef } from '@angular/core';
import { CanColor } from '@ptsecurity/mosaic/core';
export declare class McIconCSSStyler {
}
export declare class McIconBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const _McIconMixinBase: import("@ptsecurity/mosaic/core/common-behaviors/constructor").Constructor<CanColor> & typeof McIconBase;
export declare class McIcon extends _McIconMixinBase implements CanColor {
    constructor(elementRef: ElementRef, iconName: string);
    _getHostElement(): any;
}
