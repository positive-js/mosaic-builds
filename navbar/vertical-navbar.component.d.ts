import { AfterContentInit, ChangeDetectorRef, QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { McNavbarBento, McNavbarItem, McNavbarRectangleElement } from './navbar-item.component';
import { McFocusableComponent } from './navbar.component';
import * as i0 from "@angular/core";
export declare class McVerticalNavbar extends McFocusableComponent implements AfterContentInit {
    rectangleElements: QueryList<McNavbarRectangleElement>;
    items: QueryList<McNavbarItem>;
    bento: McNavbarBento;
    readonly animationDone: Subject<void>;
    get expanded(): boolean;
    set expanded(value: boolean);
    private _expanded;
    constructor(changeDetectorRef: ChangeDetectorRef);
    ngAfterContentInit(): void;
    toggle(): void;
    onKeyDown(event: KeyboardEvent): void;
    private updateExpandedStateForItems;
    private updateTooltipForItems;
    private setItemsState;
    static ɵfac: i0.ɵɵFactoryDeclaration<McVerticalNavbar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McVerticalNavbar, "mc-vertical-navbar", ["McVerticalNavbar"], { "expanded": "expanded"; }, {}, ["bento", "rectangleElements", "items"], ["[mc-navbar-container], mc-navbar-container", "[mc-navbar-toggle], mc-navbar-toggle"]>;
}
