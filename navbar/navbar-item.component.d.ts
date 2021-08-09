import { FocusMonitor } from '@angular/cdk/a11y';
import { AfterContentInit, ElementRef, OnDestroy } from '@angular/core';
import { McButtonCssStyler } from '@ptsecurity/mosaic/button';
import { CanDisable, CanDisableCtor } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
export declare class McNavbarLogo {
}
export declare class McNavbarTitle implements AfterContentInit {
    private elementRef;
    outerElementWidth: number;
    get text(): string;
    constructor(elementRef: ElementRef);
    getOuterElementWidth(): number;
    ngAfterContentInit(): void;
}
export declare class McNavbarBrand {
}
export declare class McNavbarDivider {
}
export declare class McNavbarItemBase {
    elementRef: ElementRef;
    button: McButtonCssStyler;
    vertical: boolean;
    horizontal: boolean;
    closed: boolean;
    constructor(elementRef: ElementRef);
    getOuterElementWidth(): number;
}
export declare const McNavbarMixinBase: CanDisableCtor & typeof McNavbarItemBase;
export declare class McNavbarItem extends McNavbarMixinBase implements OnDestroy, CanDisable, AfterContentInit {
    private focusMonitor;
    elementRef: ElementRef;
    button: McButtonCssStyler;
    title: McNavbarTitle;
    icon: McIcon;
    get collapsable(): boolean;
    set collapsable(value: boolean);
    private _collapsable;
    collapsed: boolean;
    get collapsedTitle(): string | null;
    set collapsedTitle(value: string | null);
    private _collapsedTitle;
    get tabIndex(): number;
    set tabIndex(value: number);
    private _tabIndex;
    constructor(focusMonitor: FocusMonitor, elementRef: ElementRef);
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    getTitleWidth(): number;
}
