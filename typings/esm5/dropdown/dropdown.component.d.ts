import { AnimationEvent } from '@angular/animations';
import { Direction } from '@angular/cdk/bidi';
import { AfterContentInit, ElementRef, EventEmitter, InjectionToken, NgZone, OnDestroy, TemplateRef, QueryList, OnInit } from '@angular/core';
import { FocusOrigin } from '@ptsecurity/cdk/a11y';
import { Observable, Subject } from 'rxjs';
import { McDropdownContent } from './dropdown-content';
import { McDropdownItem } from './dropdown-item';
import { McDropdownPanel } from './dropdown-panel';
import { DropdownPositionX, DropdownPositionY } from './dropdown-positions';
/** Default `mc-dropdown` options that can be overridden. */
export interface McDropdownDefaultOptions {
    /** The x-axis position of the dropdown. */
    xPosition: DropdownPositionX;
    /** The y-axis position of the dropdown. */
    yPosition: DropdownPositionY;
    /** Whether the dropdown should overlap the dropdown trigger horizontally. */
    overlapTriggerX: boolean;
    /** Whether the dropdown should overlap the dropdown trigger vertically. */
    overlapTriggerY: boolean;
    /** Class to be applied to the dropdown's backdrop. */
    backdropClass: string;
    /** Whether the dropdown has a backdrop. */
    hasBackdrop?: boolean;
}
/** Injection token to be used to override the default options for `mc-dropdown`. */
export declare const MC_DROPDOWN_DEFAULT_OPTIONS: InjectionToken<McDropdownDefaultOptions>;
/** @docs-private */
export declare function MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY(): McDropdownDefaultOptions;
export declare class McDropdown implements AfterContentInit, McDropdownPanel<McDropdownItem>, OnInit, OnDestroy {
    private _elementRef;
    private _ngZone;
    private _defaultOptions;
    /** Position of the dropdown in the X axis. */
    xPosition: DropdownPositionX;
    /** Position of the dropdown in the Y axis. */
    yPosition: DropdownPositionY;
    /** Whether the dropdown should overlap its trigger vertically. */
    overlapTriggerY: boolean;
    /** Whether the dropdown should overlap its trigger horizontally. */
    overlapTriggerX: boolean;
    /** Whether the dropdown has a backdrop. */
    hasBackdrop: boolean | undefined;
    /**
     * This method takes classes set on the host mc-dropdown element and applies them on the
     * dropdown template that displays in the overlay container.  Otherwise, it's difficult
     * to style the containing dropdown from outside the component.
     * @param classes list of class names
     */
    panelClass: string;
    private _xPosition;
    private _yPosition;
    private _overlapTriggerX;
    private _overlapTriggerY;
    private _hasBackdrop;
    /** Config object to be passed into the dropdown's ngClass */
    classList: {
        [key: string]: boolean;
    };
    /** Current state of the panel animation. */
    panelAnimationState: 'void' | 'enter';
    /** Emits whenever an animation on the dropdown completes. */
    animationDone: Subject<AnimationEvent>;
    /** Whether the dropdown is animating. */
    isAnimating: boolean;
    /** Parent dropdown of the current dropdown panel. */
    parent: McDropdownPanel | undefined;
    /** Layout direction of the dropdown. */
    direction: Direction;
    /** Class to be added to the backdrop element. */
    backdropClass: string;
    /** @docs-private */
    templateRef: TemplateRef<any>;
    /**
     * List of the items inside of a dropdown.
     */
    items: QueryList<McDropdownItem>;
    /**
     * Dropdown content that will be rendered lazily.
     * @docs-private
     */
    lazyContent: McDropdownContent;
    /** Event emitted when the dropdown is closed. */
    readonly closed: EventEmitter<void | 'click' | 'keydown' | 'tab'>;
    private previousPanelClass;
    private keyManager;
    /** Dropdown items inside the current dropdown. */
    private itemsArray;
    /** Emits whenever the amount of dropdown items changes. */
    private itemChanges;
    /** Subscription to tab events on the dropdown panel */
    private tabSubscription;
    constructor(_elementRef: ElementRef<HTMLElement>, _ngZone: NgZone, _defaultOptions: McDropdownDefaultOptions);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Stream that emits whenever the hovered dropdown item changes. */
    hovered(): Observable<McDropdownItem>;
    /** Handle a keyboard event from the dropdown, delegating to the appropriate action. */
    handleKeydown(event: KeyboardEvent): void;
    handleClick(): void;
    /**
     * Focus the first item in the dropdown.
     * @param origin Action from which the focus originated. Used to set the correct styling.
     */
    focusFirstItem(origin?: FocusOrigin): void;
    /**
     * Resets the active item in the dropdown. This is used when the dropdown is opened, allowing
     * the user to start from the first option when pressing the down arrow.
     */
    resetActiveItem(): void;
    /**
     * Registers a dropdown item with the dropdown.
     * @docs-private
     */
    addItem(item: McDropdownItem): void;
    /**
     * Removes an item from the dropdown.
     * @docs-private
     */
    removeItem(item: McDropdownItem): void;
    /**
     * Adds classes to the dropdown panel based on its position. Can be used by
     * consumers to add specific styling based on the position.
     * @param posX Position of the dropdown along the x axis.
     * @param posY Position of the dropdown along the y axis.
     * @docs-private
     */
    setPositionClasses(posX?: DropdownPositionX, posY?: DropdownPositionY): void;
    /** Starts the enter animation. */
    startAnimation(): void;
    /** Resets the panel animation to its initial state. */
    resetAnimation(): void;
    /** Callback that is invoked when the panel animation completes. */
    onAnimationDone(event: AnimationEvent): void;
    onAnimationStart(event: AnimationEvent): void;
}
