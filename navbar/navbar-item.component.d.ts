import { FocusMonitor } from '@angular/cdk/a11y';
import { AfterContentInit, ElementRef, OnDestroy } from '@angular/core';
import { McButtonCssStyler } from '@ptsecurity/mosaic/button';
import { CanDisable, CanDisableCtor } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class McNavbarLogo {
    readonly hovered: Subject<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<McNavbarLogo, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McNavbarLogo, "mc-navbar-logo, [mc-navbar-logo]", never, {}, {}, never>;
}
export declare class McNavbarTitle implements AfterContentInit {
    private elementRef;
    readonly hovered: Subject<boolean>;
    outerElementWidth: number;
    get text(): string;
    constructor(elementRef: ElementRef);
    getOuterElementWidth(): number;
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McNavbarTitle, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McNavbarTitle, "mc-navbar-title, [mc-navbar-title]", never, {}, {}, never>;
}
export declare class McNavbarBrand implements AfterContentInit, OnDestroy {
    logo: McNavbarLogo;
    title: McNavbarTitle;
    hovered: boolean;
    private destroyed;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McNavbarBrand, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McNavbarBrand, "mc-navbar-brand, [mc-navbar-brand]", never, {}, {}, ["logo", "title"]>;
}
export declare class McNavbarDivider {
    static ɵfac: i0.ɵɵFactoryDeclaration<McNavbarDivider, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McNavbarDivider, "mc-navbar-divider", never, {}, {}, never>;
}
export declare class McNavbarItemBase {
    elementRef: ElementRef;
    button: McButtonCssStyler;
    vertical: boolean;
    horizontal: boolean;
    closed: boolean;
    constructor(elementRef: ElementRef);
    getOuterElementWidth(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<McNavbarItemBase, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McNavbarItemBase, "mc-navbar-item, [mc-navbar-item], mc-navbar-divider, mc-navbar-brand, [mc-navbar-brand]", never, {}, {}, ["button"]>;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<McNavbarItem, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McNavbarItem, "mc-navbar-item, [mc-navbar-item]", ["mcNavbarItem"], { "disabled": "disabled"; "collapsable": "collapsable"; "collapsed": "collapsed"; "collapsedTitle": "collapsedTitle"; }, {}, ["button", "title", "icon"], ["*"]>;
}
