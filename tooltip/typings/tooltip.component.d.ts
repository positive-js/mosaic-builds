import { ChangeDetectorRef, ElementRef, EventEmitter, InjectionToken, NgZone, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Directionality } from '@ptsecurity/cdk/bidi';
import { ConnectedOverlayPositionChange, ConnectionPositionPair, Overlay, OverlayRef, ScrollDispatcher, IScrollStrategy, IOverlayConnectionPosition, IOriginConnectionPosition } from '@ptsecurity/cdk/overlay';
import { ComponentPortal } from '@ptsecurity/cdk/portal';
import { BehaviorSubject, Observable } from 'rxjs';
export declare class McToolTipComponent {
    cdr: ChangeDetectorRef;
    _prefix: string;
    _positions: ConnectionPositionPair[];
    _classMap: {};
    _placement: string;
    _trigger: string;
    isTitleString: boolean;
    visibleSource: BehaviorSubject<boolean>;
    $visible: Observable<boolean>;
    _title: string | TemplateRef<void>;
    showTId: number;
    hideTId: number;
    availablePositions: any;
    mcVisibleChange: EventEmitter<boolean>;
    mcMouseEnterDelay: number;
    mcMouseLeaveDelay: number;
    mcTitle: string | TemplateRef<void>;
    mcVisible: boolean;
    mcTrigger: string;
    mcPlacement: string;
    /** Subject for notifying that the tooltip has been hidden from the view */
    private readonly _onHide;
    private _closeOnInteraction;
    constructor(cdr: ChangeDetectorRef);
    show(): void;
    hide(): void;
    setClassMap(): void;
    isContentEmpty(): boolean;
    /** Returns an observable that notifies when the tooltip has been hidden from view. */
    afterHidden(): Observable<void>;
    _markForCheck(): void;
    _handleBodyInteraction(): void;
}
export declare const MC_TOOLTIP_SCROLL_STRATEGY: InjectionToken<() => IScrollStrategy>;
/** @docs-private */
export declare function MC_TOOLTIP_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => IScrollStrategy;
/** @docs-private */
export declare const MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER: {
    provide: InjectionToken<() => IScrollStrategy>;
    deps: (typeof Overlay)[];
    useFactory: typeof MC_TOOLTIP_SCROLL_STRATEGY_FACTORY;
};
/** Creates an error to be thrown if the user supplied an invalid tooltip position. */
export declare function getMcTooltipInvalidPositionError(position: string): Error;
export declare class McTooltipDirective implements OnInit, OnDestroy {
    private _overlay;
    private elementRef;
    private _ngZone;
    private _scrollDispatcher;
    private hostView;
    private _scrollStrategy;
    private _dir;
    isTooltipOpen: boolean;
    isDynamicTooltip: boolean;
    parentDisabled: boolean;
    _title: string;
    _disabled: boolean;
    _mouseEnterDelay: number;
    _mouseLeaveDelay: number;
    _visible: boolean;
    _trigger: string;
    _placement: string;
    _overlayRef: OverlayRef | null;
    _portal: ComponentPortal<McToolTipComponent>;
    availablePositions: any;
    tooltip: McToolTipComponent | null;
    mcVisibleChange: EventEmitter<boolean>;
    private $unsubscribe;
    mcTitle: string;
    setTitle: string;
    disabled: boolean;
    mcMouseEnterDelay: number;
    mcMouseLeaveDelay: number;
    mcVisible: boolean;
    mcTrigger: string;
    mcPlacement: string;
    readonly isOpen: boolean;
    readonly isParentDisabled: boolean;
    private manualListeners;
    private readonly _destroyed;
    constructor(_overlay: Overlay, elementRef: ElementRef, _ngZone: NgZone, _scrollDispatcher: ScrollDispatcher, hostView: ViewContainerRef, _scrollStrategy: any, _dir: Directionality);
    /** Create the overlay config and position strategy */
    _createOverlay(): OverlayRef;
    _detach(): void;
    onPositionChange($event: ConnectedOverlayPositionChange): void;
    handlePositioningUpdate(): void;
    updateCompValue(key: string, value: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    handleKeydown(e: KeyboardEvent): void;
    handleTouchend(): void;
    /** Updates the position of the current tooltip. */
    _updatePosition(): void;
    /**
     * Returns the origin position and a fallback position based on the user's position preference.
     * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
     */
    _getOrigin(): {
        main: IOriginConnectionPosition;
        fallback: IOriginConnectionPosition;
    };
    /** Returns the overlay position and a fallback position based on the user's preference */
    _getOverlayPosition(): {
        main: IOverlayConnectionPosition;
        fallback: IOverlayConnectionPosition;
    };
    /** Inverts an overlay position. */
    private _invertPosition;
    private show;
    private hide;
}
