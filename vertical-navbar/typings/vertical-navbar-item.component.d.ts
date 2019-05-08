import { ElementRef, OnDestroy } from '@angular/core';
import { FocusMonitor } from '@ptsecurity/cdk/a11y';
import { CanDisable, CanDisableCtor } from '@ptsecurity/mosaic/core';
import { McDropdownTrigger } from '@ptsecurity/mosaic/dropdown';
export declare class McVerticalNavbarItemIcon {
}
export declare class McVerticalNavbarItemBadge {
}
declare class McVerticalNavbarItemBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const _McVerticalNavbarMixinBase: CanDisableCtor & typeof McVerticalNavbarItemBase;
export declare class McVerticalNavbarItem extends _McVerticalNavbarMixinBase implements CanDisable, OnDestroy {
    private element;
    private focusMonitor;
    private trigger;
    tabIndex: number;
    constructor(element: ElementRef, focusMonitor: FocusMonitor, trigger: McDropdownTrigger);
    readonly hasDropdownAttached: boolean;
    ngOnDestroy(): void;
}
export {};