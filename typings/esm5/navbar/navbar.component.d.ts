import { AfterViewInit, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FocusMonitor } from '@ptsecurity/cdk/a11y';
import { CanDisable } from '@ptsecurity/mosaic/core';
export declare type McNavbarContainerPositionType = 'left' | 'right';
export declare class McNavbarLogo {
}
export declare class McNavbarBrand {
}
export declare class McNavbarTitle {
}
export declare class McNavbarItemBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const _McNavbarMixinBase: (new (...args: any[]) => CanDisable) & typeof McNavbarItemBase;
export declare class McNavbarItem extends _McNavbarMixinBase implements OnInit, OnDestroy, CanDisable {
    elementRef: ElementRef;
    private _focusMonitor;
    tabIndex: number;
    collapsedTitle: string;
    constructor(elementRef: ElementRef, _focusMonitor: FocusMonitor);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private denyClickIfDisabled();
}
export declare class McNavbarContainer {
    position: McNavbarContainerPositionType;
    readonly cssClasses: string;
}
export declare class McNavbar implements AfterViewInit, OnDestroy {
    private _elementRef;
    private readonly forceRecalculateItemsWidth;
    private readonly resizeDebounceInterval;
    private readonly firstLevelElement;
    private readonly secondLevelElements;
    private _totalItemsWidths;
    private _itemsWidths;
    private readonly maxAllowedWidth;
    private readonly itemsWidths;
    private readonly totalItemsWidth;
    private _resizeSubscription;
    constructor(_elementRef: ElementRef);
    updateCollapsed(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private calculateAndCacheTotalItemsWidth();
    private getOuterElementWidth(element);
    private calculateAndCacheItemsWidth();
    private getItemsForCollapse(element);
}