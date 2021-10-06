import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, ElementRef, NgZone, QueryList } from '@angular/core';
import { McPaginatedTabHeader } from './paginated-tab-header';
import { McTabLabelWrapper } from './tab-label-wrapper.directive';
import * as i0 from "@angular/core";
/**
 * The directions that scrolling can go in when the header's tabs exceed the header width. 'After'
 * will scroll the header towards the end of the tabs list and 'before' will scroll towards the
 * beginning of the list.
 */
export declare type ScrollDirection = 'after' | 'before';
/**
 * The header of the tab group which displays a list of all the tabs in the tab group.
 * When the tabs list's width exceeds the width of the header container,
 * then arrows will be displayed to allow the user to scroll
 * left and right across the header.
 * @docs-private
 */
export declare class McTabHeader extends McPaginatedTabHeader {
    readonly elementRef: ElementRef;
    readonly changeDetectorRef: ChangeDetectorRef;
    /** The index of the active tab. */
    vertical: boolean;
    items: QueryList<McTabLabelWrapper>;
    tabListContainer: ElementRef;
    tabList: ElementRef;
    nextPaginator: ElementRef<HTMLElement>;
    previousPaginator: ElementRef<HTMLElement>;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, viewportRuler: ViewportRuler, ngZone: NgZone, platform: Platform, dir: Directionality, animationMode?: string);
    itemSelected(event: KeyboardEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McTabHeader, [null, null, null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McTabHeader, "mc-tab-header", never, { "selectedIndex": "selectedIndex"; "vertical": "vertical"; }, { "selectFocusedIndex": "selectFocusedIndex"; "indexFocused": "indexFocused"; }, ["items"], ["*"]>;
}
