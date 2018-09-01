import { AfterViewInit, ElementRef, OnDestroy, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { FocusMonitor } from '@ptsecurity/cdk/a11y';
import { Platform } from '@ptsecurity/cdk/platform';
import { CanDisable } from '@ptsecurity/mosaic/core';
export declare type McNavbarContainerPositionType = 'left' | 'right';
export interface IMcNavbarDropdownItem {
    link?: string;
    text: string;
}
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
export declare const _McNavbarMixinBase: import("@ptsecurity/mosaic/core/common-behaviors/constructor").Constructor<CanDisable> & typeof McNavbarItemBase;
export declare class McNavbarItem extends _McNavbarMixinBase implements OnInit, AfterViewInit, OnDestroy, CanDisable {
    elementRef: ElementRef;
    private _focusMonitor;
    private _platform;
    private _cdRef;
    tabIndex: number;
    dropdownItems: IMcNavbarDropdownItem[];
    collapsedTitle: string;
    dropdownItemTmpl: TemplateRef<IMcNavbarDropdownItem>;
    dropdownContent: ElementRef;
    readonly hasDropdownContent: boolean;
    isCollapsed: boolean;
    private _subscription;
    private _focusMonitor$;
    private _lastFocusedElement;
    private readonly _dropdownElements;
    constructor(elementRef: ElementRef, _focusMonitor: FocusMonitor, _platform: Platform, _cdRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    isActiveDropdownLink(link: string): boolean;
    handleClickByItem(): void;
    handleKeydown($event: KeyboardEvent): void;
    handleClickByDropdownItem(): void;
    private listenClickOutside;
    private toggleDropdown;
    private forceCloseDropdown;
    private startListenFocusDropdownItems;
    private stopListenFocusDropdownItems;
    private denyClickIfDisabled;
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
    private calculateAndCacheTotalItemsWidth;
    private getOuterElementWidth;
    private calculateAndCacheItemsWidth;
    private getItemsForCollapse;
}
