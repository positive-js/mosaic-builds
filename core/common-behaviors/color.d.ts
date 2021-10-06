import { ElementRef } from '@angular/core';
import { AbstractConstructor, Constructor } from './constructor';
export interface CanColor {
    color: ThemePalette;
}
/** @docs-private */
export declare type CanColorCtor = Constructor<CanColor> & AbstractConstructor<CanColor>;
export interface HasElementRef {
    _elementRef: ElementRef;
}
export declare enum ThemePalette {
    Primary = "primary",
    Second = "second",
    Error = "error",
    Default = "second",
    Empty = ""
}
/** Mixin to augment a directive with a `color` property. */
export declare function mixinColor<T extends AbstractConstructor<HasElementRef>>(base: T, defaultColor?: ThemePalette): CanColorCtor & T;
