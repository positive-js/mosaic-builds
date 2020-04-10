import { FocusMonitor } from '@angular/cdk/a11y';
import { AfterViewInit, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { CanDisable, CanDisableCtor } from '@ptsecurity/mosaic/core';
export declare type McNavbarContainerPositionType = 'left' | 'right';
export declare class McNavbarLogo {
}
export declare class McNavbarBrand {
}
export declare class McNavbarTitle {
}
export declare class McNavbarItemBase {
    elementRef: ElementRef;
    constructor(elementRef: ElementRef);
}
export declare const McNavbarMixinBase: CanDisableCtor & typeof McNavbarItemBase;
export declare class McNavbarItem extends McNavbarMixinBase implements OnInit, OnDestroy, CanDisable {
    elementRef: ElementRef;
    private _focusMonitor;
    tabIndex: number;
    set collapsedTitle(value: string);
    constructor(elementRef: ElementRef, _focusMonitor: FocusMonitor);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private denyClickIfDisabled;
}
export declare class McNavbarContainer {
    position: McNavbarContainerPositionType;
    get cssClasses(): string;
}
export declare class McNavbar implements AfterViewInit, OnDestroy {
    private _elementRef;
    private readonly forceRecalculateItemsWidth;
    private readonly resizeDebounceInterval;
    private readonly firstLevelElement;
    private readonly secondLevelElements;
    private totalItemsWidths;
    private get maxAllowedWidth();
    private get itemsWidths();
    private _itemsWidths;
    private get totalItemsWidth();
    private resizeSubscription;
    constructor(_elementRef: ElementRef);
    updateCollapsed(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private calculateAndCacheTotalItemsWidth;
    private getOuterElementWidth;
    private calculateAndCacheItemsWidth;
    private getItemsForCollapse;
}
