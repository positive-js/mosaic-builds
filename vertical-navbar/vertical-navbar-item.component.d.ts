import { FocusMonitor } from '@angular/cdk/a11y';
import { ElementRef, OnDestroy } from '@angular/core';
import { CanDisable, CanDisableCtor, HasTabIndexCtor } from '@ptsecurity/mosaic/core';
import { McDropdownTrigger } from '@ptsecurity/mosaic/dropdown';
export declare class McVerticalNavbarItemIcon {
}
export declare class McVerticalNavbarItemBadge {
}
declare class McVerticalNavbarItemBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const McVerticalNavbarMixinBase: HasTabIndexCtor & CanDisableCtor & typeof McVerticalNavbarItemBase;
export declare class McVerticalNavbarItem extends McVerticalNavbarMixinBase implements CanDisable, OnDestroy {
    private element;
    private focusMonitor;
    private trigger;
    get hasDropdownAttached(): boolean;
    constructor(element: ElementRef, focusMonitor: FocusMonitor, trigger: McDropdownTrigger);
    ngOnDestroy(): void;
}
export {};
