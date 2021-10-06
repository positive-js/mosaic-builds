import { ElementRef } from '@angular/core';
import { CanColor, CanColorCtor } from '@ptsecurity/mosaic/core';
import * as i0 from "@angular/core";
export declare class McIconCSSStyler {
    static ɵfac: i0.ɵɵFactoryDeclaration<McIconCSSStyler, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McIconCSSStyler, "[mc-icon]", never, {}, {}, never>;
}
export declare class McIconBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const McIconMixinBase: CanColorCtor & typeof McIconBase;
export declare class McIcon extends McIconMixinBase implements CanColor {
    constructor(elementRef: ElementRef, iconName: string);
    getHostElement(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<McIcon, [null, { attribute: "mc-icon"; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McIcon, "[mc-icon]", never, { "color": "color"; }, {}, never, ["*"]>;
}
