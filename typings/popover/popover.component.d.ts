import { AnimationEvent } from '@angular/animations';
import { Directionality } from '@angular/cdk/bidi';
import { ConnectedOverlayPositionChange, ConnectionPositionPair, Overlay, OverlayRef, ScrollDispatcher, ScrollStrategy, OverlayConnectionPosition, OriginConnectionPosition, HorizontalConnectionPos, VerticalConnectionPos } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, ElementRef, EventEmitter, InjectionToken, NgZone, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
export declare type PopoverVisibility = 'initial' | 'visible' | 'hidden';
export declare class McPopoverComponent {
    changeDetectorRef: ChangeDetectorRef;
    componentElementRef: ElementRef;
    positions: ConnectionPositionPair[];
    availablePositions: any;
    popoverVisibility: PopoverVisibility;
    closeOnInteraction: boolean;
    mcContent: string | TemplateRef<any>;
    mcHeader: string | TemplateRef<any>;
    mcFooter: string | TemplateRef<any>;
    mcVisibleChange: EventEmitter<boolean>;
    mcTrigger: string;
    private _mcTrigger;
    mcPlacement: string;
    private _mcPlacement;
    mcPopoverSize: string;
    private popoverSize;
    mcVisible: boolean;
    private _mcVisible;
    classList: string | string[];
    private _classList;
    readonly getCssClassesList: string;
    readonly getPlacementClass: string;
    /** Subject for notifying that the popover has been hidden from the view */
    private readonly onHideSubject;
    constructor(changeDetectorRef: ChangeDetectorRef, componentElementRef: ElementRef);
    show(): void;
    hide(): void;
    isNonEmptyContent(): boolean;
    /** Returns an observable that notifies when the popover has been hidden from view. */
    afterHidden(): Observable<void>;
    isVisible(): boolean;
    markForCheck(): void;
    isTemplateRef(value: any): boolean;
    isNonEmptyString(value: any): boolean;
    animationStart(): void;
    animationDone(event: AnimationEvent): void;
    ngOnDestroy(): void;
}
export declare const MC_POPOVER_SCROLL_STRATEGY: InjectionToken<() => ScrollStrategy>;
/** @docs-private */
export declare function mcPopoverScrollStrategyFactory(overlay: Overlay): () => ScrollStrategy;
/** @docs-private */
export declare const MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER: {
    provide: InjectionToken<() => ScrollStrategy>;
    deps: (typeof Overlay)[];
    useFactory: typeof mcPopoverScrollStrategyFactory;
};
/** Creates an error to be thrown if the user supplied an invalid popover position. */
export declare function getMcPopoverInvalidPositionError(position: string): Error;
export declare class McPopover implements OnInit, OnDestroy {
    private overlay;
    private elementRef;
    private ngZone;
    private scrollDispatcher;
    private hostView;
    private scrollStrategy;
    private direction;
    isPopoverOpen: boolean;
    isDynamicPopover: boolean;
    overlayRef: OverlayRef | null;
    portal: ComponentPortal<McPopoverComponent>;
    availablePositions: any;
    popover: McPopoverComponent | null;
    mcVisibleChange: EventEmitter<boolean>;
    mcHeader: string | TemplateRef<any>;
    private _mcHeader;
    mcContent: string | TemplateRef<any>;
    private _mcContent;
    mcFooter: string | TemplateRef<any>;
    private _mcFooter;
    private $unsubscribe;
    disabled: boolean;
    private _disabled;
    mcMouseEnterDelay: number;
    private _mcMouseEnterDelay;
    mcMouseLeaveDelay: number;
    private _mcMouseLeaveDelay;
    mcTrigger: string;
    private _mcTrigger;
    mcPopoverSize: string;
    private popoverSize;
    mcPlacement: string;
    private _mcPlacement;
    classList: string | string[];
    private _classList;
    mcVisible: boolean;
    private _mcVisible;
    readonly isOpen: boolean;
    private manualListeners;
    private readonly destroyed;
    constructor(overlay: Overlay, elementRef: ElementRef, ngZone: NgZone, scrollDispatcher: ScrollDispatcher, hostView: ViewContainerRef, scrollStrategy: any, direction: Directionality);
    /** Create the overlay config and position strategy */
    createOverlay(): OverlayRef;
    detach(): void;
    onPositionChange($event: ConnectedOverlayPositionChange): void;
    handlePositionUpdate(): void;
    updateCompValue(key: string, value: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    handleKeydown(e: KeyboardEvent): void;
    handleTouchend(): void;
    initElementRefListeners(): void;
    show(): void;
    hide(): void;
    /** Updates the position of the current popover. */
    updatePosition(reapplyPosition?: boolean): void;
    /**
     * Returns the origin position and a fallback position based on the user's position preference.
     * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
     */
    getOrigin(): {
        main: OriginConnectionPosition;
        fallback: OriginConnectionPosition;
    };
    getOriginXaxis(): HorizontalConnectionPos;
    getOriginYaxis(): VerticalConnectionPos;
    /** Returns the overlay position and a fallback position based on the user's preference */
    getOverlayPosition(): {
        main: OverlayConnectionPosition;
        fallback: OverlayConnectionPosition;
    };
    /** Inverts an overlay position. */
    private invertPosition;
}
