import { AfterContentInit, AfterViewInit, ElementRef, OnDestroy, QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { McNavbarItem, McNavbarItemBase } from './navbar-item.component';
import * as i0 from "@angular/core";
export declare type McNavbarContainerPositionType = 'left' | 'right';
export declare class McNavbarContainer {
    static ɵfac: i0.ɵɵFactoryDeclaration<McNavbarContainer, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McNavbarContainer, "mc-navbar-container", never, {}, {}, never>;
}
export declare class McNavbar implements AfterViewInit, AfterContentInit, OnDestroy {
    private elementRef;
    navbarBaseItems: QueryList<McNavbarItemBase>;
    navbarItems: QueryList<McNavbarItem>;
    readonly resizeStream: Subject<Event>;
    private readonly resizeDebounceInterval;
    private get width();
    private get totalItemsWidth();
    private get collapsableItems();
    private resizeSubscription;
    constructor(elementRef: ElementRef);
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    updateCollapsed: () => void;
    private collapseItems;
    private unCollapseItems;
    private setItemsState;
    static ɵfac: i0.ɵɵFactoryDeclaration<McNavbar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McNavbar, "mc-navbar", never, {}, {}, ["navbarBaseItems", "navbarItems"], ["[mc-navbar-container], mc-navbar-container"]>;
}
