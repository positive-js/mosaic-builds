import { FocusMonitor } from '@angular/cdk/a11y';
import { ElementRef, OnDestroy } from '@angular/core';
import { CanColor, CanColorCtor, CanDisable, CanDisableCtor, HasTabIndex, HasTabIndexCtor } from '@ptsecurity/mosaic/core';
/** @docs-private */
export declare class McTabNavBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const McTabNavMixinBase: CanColorCtor & typeof McTabNavBase;
/**
 * Navigation component matching the styles of the tab group header.
 */
export declare class McTabNav extends McTabNavMixinBase implements CanColor {
    constructor(elementRef: ElementRef);
}
export declare class McTabLinkBase {
}
export declare const McTabLinkMixinBase: HasTabIndexCtor & CanDisableCtor & typeof McTabLinkBase;
/**
 * Link inside of a `mc-tab-nav-bar`.
 */
export declare class McTabLink extends McTabLinkMixinBase implements OnDestroy, CanDisable, HasTabIndex {
    elementRef: ElementRef;
    private focusMonitor;
    /** Whether the link is active. */
    get active(): boolean;
    set active(value: boolean);
    /** Whether the tab link is active or not. */
    protected isActive: boolean;
    constructor(elementRef: ElementRef, focusMonitor: FocusMonitor);
    ngOnDestroy(): void;
}
