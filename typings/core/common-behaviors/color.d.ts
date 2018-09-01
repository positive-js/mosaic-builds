import { ElementRef } from '@angular/core';
import { Constructor } from './constructor';
export interface CanColor {
    color: ThemePalette;
}
export interface HasElementRef {
    _elementRef: ElementRef;
}
export declare enum ThemePalette {
    Primary = "primary",
    Second = "second",
    Warn = "warn",
    Default = "second"
}
/** Mixin to augment a directive with a `color` property. */
export declare function mixinColor<T extends Constructor<HasElementRef>>(base: T, defaultColor?: ThemePalette): Constructor<CanColor> & T;
