import { ElementRef, OnDestroy } from '@angular/core';
import { FocusMonitor } from '@ptsecurity/cdk/a11y';
import { Platform } from '@ptsecurity/cdk/platform';
import { CanColor, CanDisable } from '@ptsecurity/mosaic/core';
export declare class McButtonCSSStyler {
}
export declare class McXSButtonCSSStyler {
}
export declare class McSMButtonCSSStyler {
}
export declare class McLGButtonCSSStyler {
}
export declare class McXLButtonCSSStyler {
}
export declare class McButtonBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const _McButtonMixinBase: (new (...args: any[]) => CanColor) & (new (...args: any[]) => CanDisable) & typeof McButtonBase;
export declare class McButton extends _McButtonMixinBase implements OnDestroy, CanDisable, CanColor {
    private _platform;
    private _focusMonitor;
    constructor(elementRef: ElementRef, _platform: Platform, _focusMonitor: FocusMonitor);
    ngOnDestroy(): void;
    focus(): void;
    _getHostElement(): any;
}
export declare class McAnchor extends McButton {
    constructor(platform: Platform, focusMonitor: FocusMonitor, elementRef: ElementRef);
    _haltDisabledEvents(event: Event): void;
}
