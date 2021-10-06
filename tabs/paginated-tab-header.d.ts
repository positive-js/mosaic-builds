import { FocusableOption } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, ElementRef, NgZone, QueryList, EventEmitter, AfterContentChecked, AfterContentInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * The directions that scrolling can go in when the header's tabs exceed the header width. 'After'
 * will scroll the header towards the end of the tabs list and 'before' will scroll towards the
 * beginning of the list.
 */
export declare type ScrollDirection = 'after' | 'before';
/** Item inside a paginated tab header. */
export declare type McPaginatedTabHeaderItem = FocusableOption & {
    elementRef: ElementRef;
};
/**
 * Base class for a tab header that supported pagination.
 * @docs-private
 */
export declare abstract class McPaginatedTabHeader implements AfterContentChecked, AfterContentInit, AfterViewInit, OnDestroy {
    protected elementRef: ElementRef<HTMLElement>;
    protected changeDetectorRef: ChangeDetectorRef;
    private viewportRuler;
    private ngZone;
    private platform;
    private dir;
    animationMode?: string | undefined;
    /** The index of the active tab. */
    get selectedIndex(): number;
    set selectedIndex(value: number);
    private _selectedIndex;
    /** Tracks which element has focus; used for keyboard navigation */
    get focusIndex(): number;
    /** When the focus index is set, we must manually send focus to the correct label */
    set focusIndex(value: number);
    /** Sets the distance in pixels that the tab header should be transformed in the X-axis. */
    get scrollDistance(): number;
    set scrollDistance(v: number);
    /** The distance in pixels that the tab labels should be translated to the left. */
    private _scrollDistance;
    abstract items: QueryList<McPaginatedTabHeaderItem>;
    abstract tabListContainer: ElementRef<HTMLElement>;
    abstract tabList: ElementRef<HTMLElement>;
    abstract nextPaginator: ElementRef<HTMLElement>;
    abstract previousPaginator: ElementRef<HTMLElement>;
    /** Event emitted when the option is selected. */
    readonly selectFocusedIndex: EventEmitter<number>;
    /** Event emitted when a label is focused. */
    readonly indexFocused: EventEmitter<number>;
    /** Whether the controls for pagination should be displayed */
    showPaginationControls: boolean;
    /** Whether the tab list can be scrolled more towards the end of the tab label list. */
    disableScrollAfter: boolean;
    /** Whether the tab list can be scrolled more towards the beginning of the tab label list. */
    disableScrollBefore: boolean;
    /**
     * Whether pagination should be disabled. This can be used to avoid unnecessary
     * layout recalculations if it's known that pagination won't be required.
     */
    disablePagination: boolean;
    /** Emits when the component is destroyed. */
    protected readonly destroyed: Subject<void>;
    protected vertical: boolean;
    /**
     * The number of tab labels that are displayed on the header. When this changes, the header
     * should re-evaluate the scroll position.
     */
    private tabLabelCount;
    /** Whether the scroll distance has changed and should be applied after the view is checked. */
    private scrollDistanceChanged;
    /** Used to manage focus between the tabs. */
    private keyManager;
    /** Cached text content of the header. */
    private currentTextContent;
    /** Stream that will stop the automated scrolling. */
    private stopScrolling;
    /** Whether the header should scroll to the selected index after the view has been checked. */
    private selectedIndexChanged;
    constructor(elementRef: ElementRef<HTMLElement>, changeDetectorRef: ChangeDetectorRef, viewportRuler: ViewportRuler, ngZone: NgZone, platform: Platform, dir: Directionality, animationMode?: string | undefined);
    /** Called when the user has selected an item via the keyboard. */
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    ngOnDestroy(): void;
    handleKeydown(event: KeyboardEvent): void;
    /**
     * Callback for when the MutationObserver detects that the content has changed.
     */
    onContentChanges(): void;
    /**
     * Updates the view whether pagination should be enabled or not.
     *
     * WARNING: Calling this method can be very costly in terms of performance. It should be called
     * as infrequently as possible from outside of the Tabs component as it causes a reflow of the
     * page.
     */
    updatePagination(): void;
    /**
     * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
     * providing a valid index and return true.
     */
    isValidIndex(index: number): boolean;
    /**
     * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
     * scrolling is enabled.
     */
    setTabFocus(tabIndex: number): void;
    /** The layout direction of the containing app. */
    getLayoutDirection(): Direction;
    /** Performs the CSS transformation on the tab list that will cause the list to scroll. */
    updateTabScrollPosition(): void;
    /**
     * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
     * the end of the list, respectively). The distance to scroll is computed to be a third of the
     * length of the tab list view window.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    scrollHeader(direction: ScrollDirection): {
        maxScrollDistance: number;
        distance: number;
    };
    /** Handles click events on the pagination arrows. */
    handlePaginatorClick(direction: ScrollDirection): void;
    /**
     * Moves the tab list such that the desired tab label (marked by index) is moved into view.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    scrollToLabel(labelIndex: number): void;
    /**
     * Evaluate whether the pagination controls should be displayed. If the scroll width of the
     * tab list is wider than the size of the header container, then the pagination controls should
     * be shown.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    checkPaginationEnabled(): void;
    /**
     * Evaluate whether the before and after controls should be enabled or disabled.
     * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
     * before button. If the header is at the end of the list (scroll distance is equal to the
     * maximum distance we can scroll), then disable the after button.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    checkScrollingControls(): void;
    /**
     * Determines what is the maximum length in pixels that can be set for the scroll distance. This
     * is equal to the difference in width between the tab list container and tab header container.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    getMaxScrollDistance(): number;
    /** Stops the currently-running paginator interval.  */
    stopInterval(): void;
    /**
     * Handles the user pressing down on one of the paginators.
     * Starts scrolling the header after a certain amount of time.
     * @param direction In which direction the paginator should be scrolled.
     */
    handlePaginatorPress(direction: ScrollDirection, mouseEvent?: MouseEvent): void;
    protected abstract itemSelected(event: KeyboardEvent): void;
    /**
     * Scrolls the header to a given position.
     * @param position Position to which to scroll.
     * @returns Information on the current scroll distance and the maximum.
     */
    private scrollTo;
    static ɵfac: i0.ɵɵFactoryDeclaration<McPaginatedTabHeader, [null, null, null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McPaginatedTabHeader, never, never, { "disablePagination": "disablePagination"; }, {}, never>;
}
