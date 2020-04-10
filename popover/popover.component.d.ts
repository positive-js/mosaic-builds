import { AnimationEvent } from '@angular/animations';
import { Directionality } from '@angular/cdk/bidi';
import { ConnectedOverlayPositionChange, ConnectionPositionPair, HorizontalConnectionPos, OriginConnectionPosition, Overlay, OverlayConnectionPosition, OverlayRef, ScrollDispatcher, ScrollStrategy, VerticalConnectionPos } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, ElementRef, EventEmitter, InjectionToken, NgZone, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
export declare enum PopoverVisibility {
    Initial = "initial",
    Visible = "visible",
    Hidden = "hidden"
}
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
    get mcTrigger(): string;
    set mcTrigger(value: string);
    private _mcTrigger;
    get mcPlacement(): string;
    set mcPlacement(value: string);
    private _mcPlacement;
    get mcPopoverSize(): string;
    set mcPopoverSize(value: string);
    private popoverSize;
    get mcVisible(): boolean;
    set mcVisible(value: boolean);
    private _mcVisible;
    get classList(): string | string[];
    set classList(value: string | string[]);
    private _classList;
    get getCssClassesList(): string;
    get getPlacementClass(): string;
    get isOpen(): boolean;
    /** Subject for notifying that the popover has been hidden from the view */
    private readonly onHideSubject;
    constructor(changeDetectorRef: ChangeDetectorRef, componentElementRef: ElementRef);
    handleKeydown(e: KeyboardEvent): void;
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
    get mcHeader(): string | TemplateRef<any>;
    set mcHeader(value: string | TemplateRef<any>);
    private _mcHeader;
    get mcContent(): string | TemplateRef<any>;
    set mcContent(value: string | TemplateRef<any>);
    private _mcContent;
    get mcFooter(): string | TemplateRef<any>;
    set mcFooter(value: string | TemplateRef<any>);
    private _mcFooter;
    private $unsubscribe;
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    get mcMouseEnterDelay(): number;
    set mcMouseEnterDelay(value: number);
    private _mcMouseEnterDelay;
    get mcMouseLeaveDelay(): number;
    set mcMouseLeaveDelay(value: number);
    private _mcMouseLeaveDelay;
    get mcTrigger(): string;
    set mcTrigger(value: string);
    private _mcTrigger;
    get mcPopoverSize(): string;
    set mcPopoverSize(value: string);
    private popoverSize;
    get mcPlacement(): string;
    set mcPlacement(value: string);
    private _mcPlacement;
    get classList(): string | string[];
    set classList(value: string | string[]);
    private _classList;
    get mcVisible(): boolean;
    set mcVisible(externalValue: boolean);
    private _mcVisible;
    get isOpen(): boolean;
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
