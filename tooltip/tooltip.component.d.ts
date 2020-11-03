import { Directionality } from '@angular/cdk/bidi';
import { ConnectedOverlayPositionChange, ConnectionPositionPair, Overlay, OverlayRef, ScrollDispatcher, ScrollStrategy, OverlayConnectionPosition, OriginConnectionPosition, HorizontalConnectionPos, VerticalConnectionPos } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, ElementRef, EventEmitter, InjectionToken, NgZone, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
export declare type ArrowPlacements = HorizontalConnectionPos | VerticalConnectionPos;
export declare const ArrowPlacements: {
    Top: ArrowPlacements;
    Center: ArrowPlacements;
    Bottom: ArrowPlacements;
    Right: ArrowPlacements;
    Left: ArrowPlacements;
};
export declare class McTooltipComponent {
    cdr: ChangeDetectorRef;
    prefix: string;
    positions: ConnectionPositionPair[];
    classMap: {};
    isTitleString: boolean;
    showTid: any;
    hideTid: any;
    availablePositions: any;
    $visible: Observable<boolean>;
    mcVisibleChange: EventEmitter<boolean>;
    mcMouseEnterDelay: number;
    mcMouseLeaveDelay: number;
    get mcTitle(): string | TemplateRef<any>;
    set mcTitle(value: string | TemplateRef<any>);
    private _mcTitle;
    get mcTrigger(): string;
    set mcTrigger(value: string);
    private _mcTrigger;
    get mcPlacement(): string;
    set mcPlacement(value: string);
    private _mcPlacement;
    get mcTooltipClass(): string;
    set mcTooltipClass(value: string);
    private _mcTooltipClass;
    get mcVisible(): boolean;
    set mcVisible(value: boolean);
    private _mcVisible;
    get mcArrowPlacement(): ArrowPlacements;
    set mcArrowPlacement(value: ArrowPlacements);
    private _mcArrowPlacement;
    /** Subject for notifying that the tooltip has been hidden from the view */
    private readonly onHideSubject;
    private closeOnInteraction;
    constructor(cdr: ChangeDetectorRef);
    show(): void;
    hide(): void;
    setClassMap(): void;
    isContentEmpty(): boolean;
    /** Returns an observable that notifies when the tooltip has been hidden from view. */
    afterHidden(): Observable<void>;
    markForCheck(): void;
    handleBodyInteraction(): void;
    get isTemplateRef(): boolean;
    get isNonEmptyString(): boolean;
}
export declare const MC_TOOLTIP_SCROLL_STRATEGY: InjectionToken<() => ScrollStrategy>;
/** @docs-private */
export declare function mcTooltipScrollStrategyFactory(overlay: Overlay): () => ScrollStrategy;
/** @docs-private */
export declare const MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER: {
    provide: InjectionToken<() => ScrollStrategy>;
    deps: (typeof Overlay)[];
    useFactory: typeof mcTooltipScrollStrategyFactory;
};
/** Creates an error to be thrown if the user supplied an invalid tooltip position. */
export declare function getMcTooltipInvalidPositionError(position: string): Error;
export declare class McTooltip implements OnInit, OnDestroy {
    private overlay;
    private elementRef;
    private ngZone;
    private scrollDispatcher;
    private hostView;
    private scrollStrategy;
    private direction;
    isTooltipOpen: boolean;
    isDynamicTooltip: boolean;
    parentDisabled: boolean;
    overlayRef: OverlayRef | null;
    portal: ComponentPortal<McTooltipComponent>;
    availablePositions: any;
    tooltip: McTooltipComponent | null;
    mcVisibleChange: EventEmitter<boolean>;
    private $unsubscribe;
    get mcTitle(): string | TemplateRef<any>;
    set mcTitle(title: string | TemplateRef<any>);
    private _mcTitle;
    set setTitle(title: string | TemplateRef<any>);
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
    get mcPlacement(): string;
    set mcPlacement(value: string);
    private _mcPlacement;
    get mcTooltipClass(): string;
    set mcTooltipClass(value: string);
    private _mcTooltipClass;
    get mcVisible(): boolean;
    set mcVisible(externalValue: boolean);
    private _mcVisible;
    get mcArrowPlacement(): ArrowPlacements;
    set mcArrowPlacement(value: ArrowPlacements);
    private _mcArrowPlacement;
    private manualListeners;
    private readonly destroyed;
    constructor(overlay: Overlay, elementRef: ElementRef, ngZone: NgZone, scrollDispatcher: ScrollDispatcher, hostView: ViewContainerRef, scrollStrategy: any, direction: Directionality);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /** Create the overlay config and position strategy */
    createOverlay(): OverlayRef;
    detach(): void;
    onPositionChange($event: ConnectedOverlayPositionChange): void;
    handlePositioningUpdate(): void;
    updateCompValue(key: string, value: any): void;
    handleKeydown(e: KeyboardEvent): void;
    handleTouchend(): void;
    initElementRefListeners(): void;
    show(): void;
    hide(): void;
    /** Updates the position of the current tooltip. */
    updatePosition(): void;
    /**
     * Returns the origin position and a fallback position based on the user's position preference.
     * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
     */
    getOrigin(): {
        main: OriginConnectionPosition;
        fallback: OriginConnectionPosition;
    };
    /** Returns the overlay position and a fallback position based on the user's preference */
    getOverlayPosition(): {
        main: OverlayConnectionPosition;
        fallback: OverlayConnectionPosition;
    };
    /** Inverts an overlay position. */
    private invertPosition;
    private getTooltipArrowElem;
}
