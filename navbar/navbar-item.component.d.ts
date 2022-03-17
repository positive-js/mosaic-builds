import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, NgZone, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { IFocusableOption } from '@ptsecurity/cdk/a11y';
import { McButton, McButtonCssStyler } from '@ptsecurity/mosaic/button';
import { McDropdownTrigger } from '@ptsecurity/mosaic/dropdown';
import { McIcon } from '@ptsecurity/mosaic/icon';
import { McTooltipTrigger, TooltipModifier } from '@ptsecurity/mosaic/tooltip';
import { Subject } from 'rxjs';
import { McVerticalNavbar } from './vertical-navbar.component';
import * as i0 from "@angular/core";
export interface McNavbarFocusableItemEvent {
    item: McNavbarFocusableItem;
}
export declare class McNavbarLogo {
    readonly hovered: Subject<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<McNavbarLogo, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McNavbarLogo, "mc-navbar-logo, [mc-navbar-logo]", never, {}, {}, never>;
}
export declare class McNavbarBento {
    static ɵfac: i0.ɵɵFactoryDeclaration<McNavbarBento, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McNavbarBento, "mc-navbar-item[bento], [mc-navbar-item][bento]", never, {}, {}, never>;
}
export declare class McNavbarTitle implements AfterViewInit {
    private elementRef;
    readonly hovered: Subject<boolean>;
    outerElementWidth: number;
    isTextOverflown: boolean;
    get text(): string;
    get isOverflown(): boolean;
    constructor(elementRef: ElementRef);
    getOuterElementWidth(): number;
    checkTextOverflown(): void;
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McNavbarTitle, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McNavbarTitle, "mc-navbar-title, [mc-navbar-title]", never, {}, {}, never>;
}
export declare class McNavbarSubTitle implements AfterContentInit {
    private elementRef;
    readonly hovered: Subject<boolean>;
    outerElementWidth: number;
    get text(): string;
    get isOverflown(): boolean;
    constructor(elementRef: ElementRef);
    getOuterElementWidth(): number;
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McNavbarSubTitle, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McNavbarSubTitle, "mc-navbar-subtitle, [mc-navbar-subtitle]", never, {}, {}, never>;
}
export declare class McNavbarBrand implements AfterContentInit, OnDestroy {
    private navbar;
    logo: McNavbarLogo;
    title: McNavbarTitle;
    hovered: boolean;
    get hasBento(): boolean;
    private destroyed;
    constructor(navbar: McVerticalNavbar);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McNavbarBrand, [{ optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McNavbarBrand, "mc-navbar-brand, [mc-navbar-brand]", ["mcNavbarBrand"], {}, {}, ["logo", "title"], ["*"]>;
}
export declare class McNavbarDivider {
    static ɵfac: i0.ɵɵFactoryDeclaration<McNavbarDivider, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McNavbarDivider, "mc-navbar-divider", never, {}, {}, never>;
}
export declare class McNavbarFocusableItem implements IFocusableOption, AfterContentInit, OnDestroy {
    private elementRef;
    private changeDetector;
    private focusMonitor;
    private ngZone;
    title: McNavbarTitle;
    button: McButton;
    readonly onFocus: Subject<McNavbarFocusableItemEvent>;
    readonly onBlur: Subject<McNavbarFocusableItemEvent>;
    get hasFocus(): boolean;
    set hasFocus(value: boolean);
    private _hasFocus;
    get disabled(): any;
    set disabled(value: any);
    private _disabled;
    get tabIndex(): number;
    constructor(elementRef: ElementRef<HTMLElement>, changeDetector: ChangeDetectorRef, focusMonitor: FocusMonitor, ngZone: NgZone);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    onFocusHandler(): void;
    focus(origin?: FocusOrigin): FocusOrigin | undefined;
    blur(): void;
    getLabel(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<McNavbarFocusableItem, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McNavbarFocusableItem, "mc-navbar-item, [mc-navbar-item], mc-navbar-brand, [mc-navbar-brand], mc-navbar-toggle", never, { "disabled": "disabled"; }, {}, ["title", "button"]>;
}
export declare class McNavbarItem extends McTooltipTrigger {
    rectangleElement: McNavbarRectangleElement;
    private changeDetectorRef;
    private dropdownTrigger;
    private bento;
    title: McNavbarTitle;
    subTitle: McNavbarSubTitle;
    icon: McIcon;
    collapsedText: string;
    get collapsed(): boolean;
    set collapsed(value: boolean);
    private _collapsed;
    get croppedText(): string;
    get collapsable(): boolean;
    set collapsable(value: boolean);
    private _collapsable;
    get titleText(): string | null;
    get subTitleText(): string | null;
    get disabled(): boolean;
    set disabled(value: boolean);
    get hasDropDownTrigger(): boolean;
    get showVerticalDropDownAngle(): boolean;
    get showHorizontalDropDownAngle(): boolean;
    get hasCroppedText(): boolean;
    constructor(rectangleElement: McNavbarRectangleElement, changeDetectorRef: ChangeDetectorRef, overlay: Overlay, elementRef: ElementRef, ngZone: NgZone, scrollDispatcher: ScrollDispatcher, hostView: ViewContainerRef, scrollStrategy: any, direction: Directionality, dropdownTrigger: McDropdownTrigger, bento: McNavbarBento);
    ngAfterContentInit(): void;
    updateTooltip(): void;
    getTitleWidth(): number;
    onKeyDown($event: KeyboardEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McNavbarItem, [null, null, null, null, null, null, null, null, { optional: true; }, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McNavbarItem, "mc-navbar-item, [mc-navbar-item]", ["mcNavbarItem"], { "collapsedText": "collapsedText"; "collapsed": "collapsed"; "collapsable": "collapsable"; }, {}, ["title", "subTitle", "icon"], ["[mc-icon]", "mc-navbar-title, [mc-navbar-title]", "mc-navbar-subtitle, [mc-navbar-subtitle]", "*"]>;
}
export declare class McNavbarRectangleElement {
    elementRef: ElementRef;
    readonly state: Subject<void>;
    get horizontal(): boolean;
    set horizontal(value: boolean);
    private _horizontal;
    get vertical(): boolean;
    set vertical(value: boolean);
    private _vertical;
    get collapsed(): boolean;
    set collapsed(value: boolean);
    private _collapsed;
    button: McButtonCssStyler;
    constructor(elementRef: ElementRef);
    getOuterElementWidth(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<McNavbarRectangleElement, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McNavbarRectangleElement, "mc-navbar-item, [mc-navbar-item], mc-navbar-divider, mc-navbar-brand, [mc-navbar-brand]", never, {}, {}, ["button"]>;
}
export declare class McNavbarToggle extends McTooltipTrigger implements OnDestroy {
    navbar: McVerticalNavbar;
    private changeDetectorRef;
    private document;
    customIcon: McIcon;
    get content(): string | TemplateRef<any>;
    set content(content: string | TemplateRef<any>);
    get disabled(): boolean;
    protected modifier: TooltipModifier;
    constructor(navbar: McVerticalNavbar, changeDetectorRef: ChangeDetectorRef, overlay: Overlay, elementRef: ElementRef, ngZone: NgZone, scrollDispatcher: ScrollDispatcher, hostView: ViewContainerRef, scrollStrategy: any, direction: Directionality, document: any);
    onKeydown($event: KeyboardEvent): void;
    ngOnDestroy(): void;
    toggle: () => void;
    private getWindow;
    private windowToggleHandler;
    static ɵfac: i0.ɵɵFactoryDeclaration<McNavbarToggle, [null, null, null, null, null, null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McNavbarToggle, "mc-navbar-toggle", never, { "content": "mcCollapsedTooltip"; }, {}, ["customIcon"], ["[mc-icon]", "mc-navbar-title"]>;
}
