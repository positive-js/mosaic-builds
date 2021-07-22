import { AfterContentInit, AfterViewInit, ElementRef, OnDestroy, QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { McNavbarItem, McNavbarItemBase } from './navbar-item.component';
export declare type McNavbarContainerPositionType = 'left' | 'right';
export declare class McNavbarContainer {
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
}
