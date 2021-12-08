import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, OnDestroy, QueryList } from '@angular/core';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { Observable, Subject } from 'rxjs';
import { McNavbarFocusableItem, McNavbarFocusableItemEvent, McNavbarItem, McNavbarRectangleElement } from './navbar-item.component';
import * as i0 from "@angular/core";
export declare type McNavbarContainerPositionType = 'left' | 'right';
export declare class McFocusableComponent implements AfterContentInit, OnDestroy {
    protected changeDetectorRef: ChangeDetectorRef;
    focusableItems: QueryList<McNavbarFocusableItem>;
    keyManager: FocusKeyManager<McNavbarFocusableItem>;
    get tabIndex(): any;
    set tabIndex(value: any);
    private _tabIndex;
    get optionFocusChanges(): Observable<McNavbarFocusableItemEvent>;
    get optionBlurChanges(): Observable<McNavbarFocusableItemEvent>;
    protected readonly destroyed: Subject<void>;
    private optionFocusSubscription;
    private optionBlurSubscription;
    constructor(changeDetectorRef: ChangeDetectorRef);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    focus(): void;
    blur(): void;
    protected resetOptions(): void;
    protected dropSubscriptions(): void;
    private listenToOptionsFocus;
    private updateTabIndex;
    private isValidIndex;
    private hasFocusedItem;
    static ɵfac: i0.ɵɵFactoryDeclaration<McFocusableComponent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McFocusableComponent, never, never, { "tabIndex": "tabIndex"; }, {}, ["focusableItems"]>;
}
export declare class McNavbarContainer {
    static ɵfac: i0.ɵɵFactoryDeclaration<McNavbarContainer, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McNavbarContainer, "mc-navbar-container", never, {}, {}, never>;
}
export declare class McNavbar extends McFocusableComponent implements AfterViewInit, AfterContentInit, OnDestroy {
    private elementRef;
    rectangleElements: QueryList<McNavbarRectangleElement>;
    navbarItems: QueryList<McNavbarItem>;
    readonly resizeStream: Subject<Event>;
    private readonly resizeDebounceInterval;
    private get width();
    private get totalItemsWidth();
    private get collapsableItems();
    private resizeSubscription;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef);
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onKeyDown(event: KeyboardEvent): void;
    updateExpandedStateForItems: () => void;
    private collapseItems;
    private expandItems;
    private setItemsState;
    static ɵfac: i0.ɵɵFactoryDeclaration<McNavbar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McNavbar, "mc-navbar", never, {}, {}, ["rectangleElements", "navbarItems"], ["[mc-navbar-container], mc-navbar-container"]>;
}
