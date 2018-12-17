import { ElementRef, OnDestroy } from '@angular/core';
import { FocusMonitor } from '@ptsecurity/cdk/a11y';
import { CanColor, CanColorCtor, CanDisable, CanDisableCtor, HasTabIndex, HasTabIndexCtor } from '@ptsecurity/mosaic/core';
/** @docs-private */
export declare class McTabNavBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const mcTabNavMixinBase: CanColorCtor & typeof McTabNavBase;
/**
 * Navigation component matching the styles of the tab group header.
 */
export declare class McTabNav extends mcTabNavMixinBase implements CanColor {
    constructor(elementRef: ElementRef);
}
export declare class McTabLinkBase {
}
export declare const mcTabLinkMixinBase: HasTabIndexCtor & CanDisableCtor & typeof McTabLinkBase;
/**
 * Link inside of a `mc-tab-nav-bar`.
 */
export declare class McTabLink extends mcTabLinkMixinBase implements OnDestroy, CanDisable, HasTabIndex {
    elementRef: ElementRef;
    private focusMonitor;
    /** Whether the link is active. */
    active: boolean;
    /** Whether the tab link is active or not. */
    protected isActive: boolean;
    constructor(elementRef: ElementRef, tabIndex: string, focusMonitor: FocusMonitor);
    ngOnDestroy(): void;
}
