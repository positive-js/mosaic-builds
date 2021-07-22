import { FocusMonitor } from '@angular/cdk/a11y';
import { AfterContentInit, ElementRef, QueryList } from '@angular/core';
import { CanDisableCtor, HasTabIndexCtor } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
import { McNavbarItemBase } from './navbar-item.component';
export declare class McVerticalNavbar implements AfterContentInit {
    get expanded(): boolean;
    set expanded(value: boolean);
    private _expanded;
    navbarBaseItems: QueryList<McNavbarItemBase>;
    toggle(): void;
    ngAfterContentInit(): void;
    private setClosedStateForItems;
    private setItemsState;
}
export declare class McNavbarToggleBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const McNavbarToggleMixinBase: HasTabIndexCtor & CanDisableCtor & typeof McNavbarToggleBase;
export declare class McNavbarToggle extends McNavbarToggleMixinBase {
    mcNavbar: McVerticalNavbar;
    private focusMonitor;
    private elementRef;
    customIcon: McIcon;
    constructor(mcNavbar: McVerticalNavbar, focusMonitor: FocusMonitor, elementRef: ElementRef);
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
}
