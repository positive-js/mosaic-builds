import { AfterContentChecked, AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, QueryList, InjectionToken, AfterViewInit } from '@angular/core';
import { CanDisableCtor } from '@ptsecurity/mosaic/core';
import { Subject } from 'rxjs';
import { McTabHeader } from './tab-header.component';
import { McTab } from './tab.component';
import * as i0 from "@angular/core";
export declare class McOldTabsCssStyler {
    static ɵfac: i0.ɵɵFactoryDeclaration<McOldTabsCssStyler, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McOldTabsCssStyler, "mc-tab-group[mc-old-tabs]", never, {}, {}, never>;
}
export declare class McAlignTabsCenterCssStyler {
    static ɵfac: i0.ɵɵFactoryDeclaration<McAlignTabsCenterCssStyler, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McAlignTabsCenterCssStyler, "mc-tab-group[mc-align-tabs-center], [mc-tab-nav-bar][mc-align-tabs-center]", never, {}, {}, never>;
}
export declare class McAlignTabsEndCssStyler {
    static ɵfac: i0.ɵɵFactoryDeclaration<McAlignTabsEndCssStyler, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McAlignTabsEndCssStyler, "mc-tab-group[mc-align-tabs-end], [mc-tab-nav-bar][mc-align-tabs-end]", never, {}, {}, never>;
}
export declare class McStretchTabsCssStyler {
    static ɵfac: i0.ɵɵFactoryDeclaration<McStretchTabsCssStyler, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McStretchTabsCssStyler, "mc-tab-group[mc-stretch-tabs], [mc-tab-nav-bar][mc-stretch-tabs]", never, {}, {}, never>;
}
export declare class McVerticalTabsCssStyler {
    static ɵfac: i0.ɵɵFactoryDeclaration<McVerticalTabsCssStyler, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McVerticalTabsCssStyler, "mc-tab-group[vertical], [mc-tab-nav-bar][vertical]", never, {}, {}, never>;
}
/** A simple change event emitted on focus or selection changes. */
export declare class McTabChangeEvent {
    /** Index of the currently-selected tab. */
    index: number;
    /** Reference to the currently-selected tab. */
    tab: McTab;
}
/** Possible positions for the tab header. */
export declare type McTabHeaderPosition = 'above' | 'below';
/** Object that can be used to configure the default options for the tabs module. */
export interface IMcTabsConfig {
    /** Duration for the tab animation. Must be a valid CSS value (e.g. 600ms). */
    animationDuration?: string;
}
/** Injection token that can be used to provide the default options the tabs module. */
export declare const MC_TABS_CONFIG: InjectionToken<string>;
/** @docs-private */
export declare class McTabGroupBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const McTabGroupMixinBase: CanDisableCtor & typeof McTabGroupBase;
/**
 * Tab-group component.  Supports basic tab pairs (label + content) and includes
 * keyboard navigation.
 */
export declare class McTabGroup extends McTabGroupMixinBase implements AfterContentInit, AfterViewInit, AfterContentChecked, OnDestroy {
    private readonly changeDetectorRef;
    readonly resizeStream: Subject<Event>;
    oldTab: boolean;
    vertical: boolean;
    tabs: QueryList<McTab>;
    tabBodyWrapper: ElementRef;
    tabHeader: McTabHeader;
    /** Whether the tab group should grow to the size of the active tab. */
    get dynamicHeight(): boolean;
    set dynamicHeight(value: boolean);
    private _dynamicHeight;
    /** The index of the active tab. */
    get selectedIndex(): number | null;
    set selectedIndex(value: number | null);
    private _selectedIndex;
    /** Position of the tab header. */
    headerPosition: McTabHeaderPosition;
    /** Duration for the tab animation. Must be a valid CSS value (e.g. 600ms). */
    animationDuration: string;
    /** Output to enable support for two-way binding on `[(selectedIndex)]` */
    readonly selectedIndexChange: EventEmitter<number>;
    /** Event emitted when focus has changed within a tab group. */
    readonly focusChange: EventEmitter<McTabChangeEvent>;
    /** Event emitted when the body animation has completed */
    readonly animationDone: EventEmitter<void>;
    /** Event emitted when the tab selection has changed. */
    readonly selectedTabChange: EventEmitter<McTabChangeEvent>;
    /** The tab index that should be selected after the content has been checked. */
    private indexToSelect;
    /** Snapshot of the height of the tab body wrapper before another tab is activated. */
    private tabBodyWrapperHeight;
    /** Subscription to tabs being added/removed. */
    private tabsSubscription;
    /** Subscription to changes in the tab labels. */
    private tabLabelSubscription;
    private resizeSubscription;
    private readonly groupId;
    private readonly resizeDebounceInterval;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, lightTabs: string, vertical: string, defaultConfig?: IMcTabsConfig);
    /**
     * After the content is checked, this component knows what tabs have been defined
     * and what the selected index should be. This is where we can know exactly what position
     * each tab should be in according to the new selected index, and additionally we know how
     * a new selected tab should transition in (from the left or right).
     */
    ngAfterContentChecked(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    focusChanged(index: number): void;
    /** Returns a unique id for each tab label element */
    getTabLabelId(i: number): string;
    /** Returns a unique id for each tab content element */
    getTabContentId(i: number): string;
    /**
     * Sets the height of the body wrapper to the height of the activating tab if dynamic
     * height property is true.
     */
    setTabBodyWrapperHeight(tabHeight: number): void;
    /** Removes the height of the tab body wrapper. */
    removeTabBodyWrapperHeight(): void;
    /** Handle click events, setting new selected index if appropriate. */
    handleClick(tab: McTab, tabHeader: McTabHeader, index: number): void;
    /** Retrieves the tabindex for the tab. */
    getTabIndex(tab: McTab, index: number): number | null;
    private checkOverflow;
    private createChangeEvent;
    /**
     * Subscribes to changes in the tab labels. This is needed, because the @Input for the label is
     * on the McTab component, whereas the data binding is inside the McTabGroup. In order for the
     * binding to be updated, we need to subscribe to changes in it and trigger change detection
     * manually.
     */
    private subscribeToTabLabels;
    private subscribeToResize;
    /** Clamps the given index to the bounds of 0 and the tabs length. */
    private clampTabIndex;
    static ɵfac: i0.ɵɵFactoryDeclaration<McTabGroup, [null, null, { attribute: "mc-old-tabs"; }, { attribute: "vertical"; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McTabGroup, "mc-tab-group", ["mcTabGroup"], { "disabled": "disabled"; "dynamicHeight": "dynamicHeight"; "selectedIndex": "selectedIndex"; "headerPosition": "headerPosition"; "animationDuration": "animationDuration"; }, { "selectedIndexChange": "selectedIndexChange"; "focusChange": "focusChange"; "animationDone": "animationDone"; "selectedTabChange": "selectedTabChange"; }, ["tabs"], never>;
}
