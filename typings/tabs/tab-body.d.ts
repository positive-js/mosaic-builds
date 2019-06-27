import { AnimationEvent } from '@angular/animations';
import { Directionality, Direction } from '@angular/cdk/bidi';
import { TemplatePortal, CdkPortalOutlet, PortalHostDirective } from '@angular/cdk/portal';
import { ChangeDetectorRef, EventEmitter, OnDestroy, OnInit, ElementRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
/**
 * These position states are used internally as animation states for the tab body. Setting the
 * position state to left, right, or center will transition the tab body from its current
 * position to its respective state. If there is not current position (void, in the case of a new
 * tab body), then there will be no transition animation to its state.
 *
 * In the case of a new tab body that should immediately be centered with an animating transition,
 * then left-origin-center or right-origin-center can be used, which will use left or right as its
 * psuedo-prior state.
 */
export declare type McTabBodyPositionState = 'left' | 'center' | 'right' | 'left-origin-center' | 'right-origin-center';
/**
 * The origin state is an internally used state that is set on a new tab body indicating if it
 * began to the left or right of the prior selected index. For example, if the selected index was
 * set to 1, and a new tab is created and selected at index 2, then the tab body would have an
 * origin of right because its index was greater than the prior selected index.
 */
export declare type McTabBodyOriginState = 'left' | 'right';
/**
 * Wrapper for the contents of a tab.
 * @docs-private
 */
export declare class McTabBody implements OnInit, OnDestroy {
    private elementRef;
    private dir;
    /** The shifted index position of the tab body, where zero represents the active center tab. */
    position: number;
    /** Tab body position state. Used by the animation trigger for the current state. */
    bodyPosition: McTabBodyPositionState;
    /** Event emitted when the tab begins to animate towards the center as the active tab. */
    readonly onCentering: EventEmitter<number>;
    /** Event emitted before the centering of the tab begins. */
    readonly beforeCentering: EventEmitter<boolean>;
    /** Event emitted before the centering of the tab begins. */
    readonly afterLeavingCenter: EventEmitter<boolean>;
    /** Event emitted when the tab completes its animation towards the center. */
    readonly onCentered: EventEmitter<void>;
    /** The portal host inside of this container into which the tab body content will be loaded. */
    portalHost: PortalHostDirective;
    /** The tab body content to display. */
    content: TemplatePortal;
    /** Position that will be used when the tab is immediately becoming visible after creation. */
    origin: number;
    /** Duration for the tab's animation. */
    animationDuration: string;
    /** Current position of the tab-body in the tab-group. Zero means that the tab is visible. */
    private positionIndex;
    /** Subscription to the directionality change observable. */
    private dirChangeSubscription;
    constructor(elementRef: ElementRef<HTMLElement>, dir: Directionality, changeDetectorRef: ChangeDetectorRef);
    /**
     * After initialized, check if the content is centered and has an origin. If so, set the
     * special position states that transition the tab from the left or right before centering.
     */
    ngOnInit(): void;
    ngOnDestroy(): void;
    onTranslateTabStarted(e: AnimationEvent): void;
    onTranslateTabComplete(e: AnimationEvent): void;
    /** The text direction of the containing app. */
    getLayoutDirection(): Direction;
    /** Whether the provided position state is considered center, regardless of origin. */
    isCenterPosition(position: McTabBodyPositionState | string): boolean;
    /** Computes the position state that will be used for the tab-body animation trigger. */
    private computePositionAnimationState;
    /**
     * Computes the position state based on the specified origin position. This is used if the
     * tab is becoming visible immediately after creation.
     */
    private computePositionFromOrigin;
}
/**
 * The portal host directive for the contents of the tab.
 * @docs-private
 */
export declare class McTabBodyPortal extends CdkPortalOutlet implements OnInit, OnDestroy {
    private host;
    /** Subscription to events for when the tab body begins centering. */
    private centeringSub;
    /** Subscription to events for when the tab body finishes leaving from center position. */
    private leavingSub;
    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, host: McTabBody);
    /** Set initial visibility or set up subscription for changing visibility. */
    ngOnInit(): void;
    /** Clean up centering subscription. */
    ngOnDestroy(): void;
}
