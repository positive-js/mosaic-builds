import { Constructor } from './constructor';
import { ElementRef } from '@angular/core';
/** @docs-private */
export interface CanColor {
    color: ThemePalette;
}
/** @docs-private */
export interface HasElementRef {
    _elementRef: ElementRef;
}
/** Possible color palette values. */
export declare enum ThemePalette {
    Primary = "primary",
    Second = "second",
    Warn = "warn",
    Default = "",
}
/** Mixin to augment a directive with a `color` property. */
export declare function mixinColor<T extends Constructor<HasElementRef>>(base: T, defaultColor?: ThemePalette): Constructor<CanColor> & T;
