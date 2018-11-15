import { AfterContentInit, ElementRef, EventEmitter, InjectionToken, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { FocusMonitor, FocusOrigin } from '@ptsecurity/cdk/a11y';
import { Direction, Directionality } from '@ptsecurity/cdk/bidi';
import { Overlay, IScrollStrategy } from '@ptsecurity/cdk/overlay';
import { McDropdownPanel } from './dropdown-panel';
/** Injection token that determines the scroll handling while the dropdown is open. */
export declare const MC_DROPDOWN_SCROLL_STRATEGY: InjectionToken<() => IScrollStrategy>;
/** @docs-private */
export declare function MC_DROPDOWN_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => IScrollStrategy;
/** @docs-private */
export declare const MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER: {
    provide: InjectionToken<() => IScrollStrategy>;
    deps: (typeof Overlay)[];
    useFactory: typeof MC_DROPDOWN_SCROLL_STRATEGY_FACTORY;
};
/**
 * This directive is intended to be used in conjunction with an mc-dropdown tag.  It is
 * responsible for toggling the display of the provided dropdown instance.
 */
export declare class McDropdownTrigger implements OnInit, AfterContentInit, OnDestroy {
    private _overlay;
    private _element;
    private _viewContainerRef;
    private _scrollStrategy;
    private _dir;
    private _focusMonitor?;
    /** Whether the dropdown is open. */
    readonly opened: boolean;
    /** The text direction of the containing app. */
    readonly dir: Direction;
    _openedBy: 'mouse' | 'touch' | null;
    /** References the dropdown instance that the trigger is associated with. */
    dropdown: McDropdownPanel;
    /** Data to be passed along to any lazily-rendered content. */
    data: any;
    /** Event emitted when the associated dropdown is opened. */
    readonly dropdownOpened: EventEmitter<void>;
    /** Event emitted when the associated dropdown is closed. */
    readonly dropdownClosed: EventEmitter<void>;
    private _portal;
    private _overlayRef;
    private _opened;
    private _closeSubscription;
    private _hoverSubscription;
    constructor(_overlay: Overlay, _element: ElementRef<HTMLElement>, _viewContainerRef: ViewContainerRef, _scrollStrategy: any, _dir: Directionality, _focusMonitor?: FocusMonitor | undefined);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Toggles the dropdown between the open and closed states. */
    toggle(): void;
    /** Opens the dropdown. */
    open(): void;
    /** Closes the dropdown. */
    close(): void;
    /**
     * Focuses the dropdown trigger.
     * @param origin Source of the dropdown trigger's focus.
     */
    focus(origin?: FocusOrigin): void;
    /** Closes the dropdown and does the necessary cleanup. */
    private _destroy;
    /**
     * This method sets the dropdown state to open and focuses the first item if
     * the dropdown was opened via the keyboard.
     */
    private _init;
    /**
     * This method resets the dropdown when it's closed, most importantly restoring
     * focus to the dropdown trigger if the dropdown was opened via the keyboard.
     */
    private _reset;
    private _setIsOpened;
    /**
     * This method checks that a valid instance of Dropdown has been passed into
     * mcDropdownTriggerFor. If not, an exception is thrown.
     */
    private _check;
    /**
     * This method creates the overlay from the provided dropdown's template and saves its
     * OverlayRef so that it can be attached to the DOM when open is called.
     */
    private _createOverlay;
    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @returns OverlayConfig
     */
    private _getOverlayConfig;
    /**
     * Listens to changes in the position of the overlay and sets the correct classes
     * on the dropdown based on the new position. This ensures the animation origin is always
     * correct, even if a fallback position is used for the overlay.
     */
    private _subscribeToPositions;
    /**
     * Sets the appropriate positions on a position strategy
     * so the overlay connects with the trigger correctly.
     * @param positionStrategy Strategy whose position to update.
     */
    private _setPosition;
    /** Cleans up the active subscriptions. */
    private _cleanUpSubscriptions;
    /** Returns a stream that emits whenever an action that should close the dropdown occurs. */
    private _closingActions;
}
