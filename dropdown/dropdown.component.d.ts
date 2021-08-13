import { AnimationEvent } from '@angular/animations';
import { FocusOrigin } from '@angular/cdk/a11y';
import { Direction } from '@angular/cdk/bidi';
import { AfterContentInit, ElementRef, EventEmitter, NgZone, OnDestroy, TemplateRef, QueryList, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { McDropdownContent } from './dropdown-content.directive';
import { McDropdownItem } from './dropdown-item.component';
import { DropdownPositionX, DropdownPositionY, McDropdownDefaultOptions, McDropdownPanel } from './dropdown.types';
export declare class McDropdown implements AfterContentInit, McDropdownPanel, OnInit, OnDestroy {
    private elementRef;
    private ngZone;
    private defaultOptions;
    navigationWithWrap: boolean;
    /** Position of the dropdown in the X axis. */
    get xPosition(): DropdownPositionX;
    set xPosition(value: DropdownPositionX);
    /** Position of the dropdown in the Y axis. */
    get yPosition(): DropdownPositionY;
    set yPosition(value: DropdownPositionY);
    /** Whether the dropdown should overlap its trigger vertically. */
    get overlapTriggerY(): boolean;
    set overlapTriggerY(value: boolean);
    /** Whether the dropdown should overlap its trigger horizontally. */
    get overlapTriggerX(): boolean;
    set overlapTriggerX(value: boolean);
    /** Whether the dropdown has a backdrop. */
    get hasBackdrop(): boolean;
    set hasBackdrop(value: boolean);
    /**
     * This method takes classes set on the host mc-dropdown element and applies them on the
     * dropdown template that displays in the overlay container.  Otherwise, it's difficult
     * to style the containing dropdown from outside the component.
     * @param classes list of class names
     */
    set panelClass(classes: string);
    private _xPosition;
    private _yPosition;
    private _overlapTriggerX;
    private _overlapTriggerY;
    private _hasBackdrop;
    triggerWidth: string;
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
    readonly closed: EventEmitter<import("./dropdown.types").DropdownCloseReason>;
    private previousPanelClass;
    private keyManager;
    /** Only the direct descendant menu items. */
    private directDescendantItems;
    /** Subscription to tab events on the dropdown panel */
    private tabSubscription;
    constructor(elementRef: ElementRef<HTMLElement>, ngZone: NgZone, defaultOptions: McDropdownDefaultOptions);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Stream that emits whenever the hovered dropdown item changes. */
    hovered(): Observable<McDropdownItem>;
    /** Handle a keyboard event from the dropdown, delegating to the appropriate action. */
    handleKeydown(event: KeyboardEvent): void;
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
    /**
     * Sets up a stream that will keep track of any newly-added menu items and will update the list
     * of direct descendants. We collect the descendants this way, because `_allItems` can include
     * items that are part of child menus, and using a custom way of registering items is unreliable
     * when it comes to maintaining the item order.
     */
    private updateDirectDescendants;
}
