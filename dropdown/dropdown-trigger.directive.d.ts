import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { AfterContentInit, ElementRef, EventEmitter, InjectionToken, OnDestroy, ViewContainerRef } from '@angular/core';
import { McDropdownItem } from './dropdown-item.component';
import { McDropdown } from './dropdown.component';
import { DropdownCloseReason, McDropdownPanel } from './dropdown.types';
import * as i0 from "@angular/core";
/** Injection token that determines the scroll handling while the dropdown is open. */
export declare const MC_DROPDOWN_SCROLL_STRATEGY: InjectionToken<() => ScrollStrategy>;
/** @docs-private */
export declare function MC_DROPDOWN_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy;
/** @docs-private */
export declare const MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER: {
    provide: InjectionToken<() => ScrollStrategy>;
    deps: (typeof Overlay)[];
    useFactory: typeof MC_DROPDOWN_SCROLL_STRATEGY_FACTORY;
};
/** Default top padding of the nested dropdown panel. */
export declare const NESTED_PANEL_TOP_PADDING = 4;
export declare const NESTED_PANEL_LEFT_PADDING = 8;
/**
 * This directive is intended to be used in conjunction with an mc-dropdown tag.  It is
 * responsible for toggling the display of the provided dropdown instance.
 */
export declare class McDropdownTrigger implements AfterContentInit, OnDestroy {
    private overlay;
    private elementRef;
    private viewContainerRef;
    private scrollStrategy;
    private parent;
    private dropdownItemInstance;
    private _dir;
    private focusMonitor?;
    lastDestroyReason: DropdownCloseReason;
    /** Data to be passed along to any lazily-rendered content. */
    data: any;
    openByArrowDown: boolean;
    /**
     * Whether focus should be restored when the menu is closed.
     * Note that disabling this option can have accessibility implications
     * and it's up to you to manage focus, if you decide to turn it off.
     */
    restoreFocus: boolean;
    /** References the dropdown instance that the trigger is associated with. */
    get dropdown(): McDropdownPanel;
    set dropdown(dropdown: McDropdownPanel);
    private _dropdown;
    /** Event emitted when the associated dropdown is opened. */
    readonly dropdownOpened: EventEmitter<void>;
    /** Event emitted when the associated dropdown is closed. */
    readonly dropdownClosed: EventEmitter<void>;
    openedBy: Exclude<FocusOrigin, 'program' | null> | undefined;
    /** The text direction of the containing app. */
    get dir(): Direction;
    /** Whether the dropdown is open. */
    get opened(): boolean;
    private _opened;
    private portal;
    private overlayRef;
    private closeSubscription;
    private hoverSubscription;
    constructor(overlay: Overlay, elementRef: ElementRef<HTMLElement>, viewContainerRef: ViewContainerRef, scrollStrategy: any, parent: McDropdown, dropdownItemInstance: McDropdownItem, _dir: Directionality, focusMonitor?: FocusMonitor | undefined);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Whether the dropdown triggers a nested dropdown or a top-level one. */
    isNested(): boolean;
    /** Toggles the dropdown between the open and closed states. */
    toggle(): void;
    /** Opens the dropdown. */
    open(): void;
    /** Closes the dropdown. */
    close(): void;
    /**
     * Focuses the dropdown trigger.
     */
    focus(origin?: FocusOrigin, options?: FocusOptions): void;
    /** Handles mouse presses on the trigger. */
    handleMousedown(event: MouseEvent): void;
    /** Handles key presses on the trigger. */
    handleKeydown(event: KeyboardEvent): void;
    /** Handles click events on the trigger. */
    handleClick(event: MouseEvent): void;
    /**
     * Handles touch start events on the trigger.
     * Needs to be an arrow function so we can easily use addEventListener and removeEventListener.
     */
    private handleTouchStart;
    /** Closes the dropdown and does the necessary cleanup. */
    private destroy;
    /**
     * This method sets the dropdown state to open and focuses the first item if
     * the dropdown was opened via the keyboard.
     */
    private init;
    private setIsOpened;
    /**
     * This method checks that a valid instance of McDropdown has been passed into
     * mcDropdownTriggerFor. If not, an exception is thrown.
     */
    private check;
    /**
     * This method creates the overlay from the provided dropdown's template and saves its
     * OverlayRef so that it can be attached to the DOM when open is called.
     */
    private createOverlay;
    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @returns OverlayConfig
     */
    private getOverlayConfig;
    /**
     * Listens to changes in the position of the overlay and sets the correct classes
     * on the dropdown based on the new position. This ensures the animation origin is always
     * correct, even if a fallback position is used for the overlay.
     */
    private subscribeToPositions;
    /**
     * Sets the appropriate positions on a position strategy
     * so the overlay connects with the trigger correctly.
     * @param positionStrategy Strategy whose position to update.
     */
    private setPosition;
    /** Cleans up the active subscriptions. */
    private cleanUpSubscriptions;
    /** Returns a stream that emits whenever an action that should close the dropdown occurs. */
    private closingActions;
    /** Handles the cases where the user hovers over the trigger. */
    private handleHover;
    /** Gets the portal that should be attached to the overlay. */
    private getPortal;
    private getWidth;
    static ɵfac: i0.ɵɵFactoryDeclaration<McDropdownTrigger, [null, null, null, null, { optional: true; }, { optional: true; self: true; }, { optional: true; }, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McDropdownTrigger, "[mcDropdownTriggerFor]", ["mcDropdownTrigger"], { "data": "mcDropdownTriggerData"; "openByArrowDown": "openByArrowDown"; "restoreFocus": "mcDropdownTriggerRestoreFocus"; "dropdown": "mcDropdownTriggerFor"; }, { "dropdownOpened": "dropdownOpened"; "dropdownClosed": "dropdownClosed"; }, never>;
}
