import { FocusMonitor } from '@angular/cdk/a11y';
import { AfterContentInit, ElementRef, OnDestroy, QueryList, Renderer2 } from '@angular/core';
import { CanDisable, CanDisableCtor, HasTabIndex, HasTabIndexCtor } from '@ptsecurity/mosaic/core';
export declare class McTabLinkBase {
}
export declare const McTabLinkMixinBase: HasTabIndexCtor & CanDisableCtor & typeof McTabLinkBase;
/**
 * Link inside of a `mc-tab-nav-bar`.
 */
export declare class McTabLink extends McTabLinkMixinBase implements OnDestroy, CanDisable, HasTabIndex {
    elementRef: ElementRef;
    private readonly focusMonitor;
    private readonly renderer;
    vertical: boolean;
    /** Whether the link is active. */
    get active(): boolean;
    set active(value: boolean);
    /** Whether the tab link is active or not. */
    protected isActive: boolean;
    constructor(elementRef: ElementRef, focusMonitor: FocusMonitor, renderer: Renderer2);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private addClassModifierForIcons;
}
/**
 * Navigation component matching the styles of the tab group header.
 */
export declare class McTabNav implements AfterContentInit {
    vertical: boolean;
    links: QueryList<McTabLink>;
    constructor(vertical: string);
    ngAfterContentInit(): void;
}
