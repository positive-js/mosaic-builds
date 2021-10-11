import { Directionality } from '@angular/cdk/bidi';
import { ConnectedOverlayPositionChange, ConnectionPositionPair, Overlay, OverlayRef, ScrollDispatcher } from '@angular/cdk/overlay';
import { OverlayConfig } from '@angular/cdk/overlay/overlay-config';
import { ComponentPortal } from '@angular/cdk/portal';
import { ElementRef, EventEmitter, NgZone, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PopUpPlacements } from './constants';
import * as i0 from "@angular/core";
export declare abstract class McPopUpTrigger<T> {
    protected overlay: Overlay;
    protected elementRef: ElementRef;
    protected ngZone: NgZone;
    protected scrollDispatcher: ScrollDispatcher;
    protected hostView: ViewContainerRef;
    protected scrollStrategy: any;
    protected direction?: Directionality | undefined;
    isOpen: boolean;
    enterDelay: number;
    leaveDelay: number;
    placementChange: EventEmitter<string>;
    visibleChange: EventEmitter<boolean>;
    get placementPriority(): string | string[] | null;
    set placementPriority(value: string | string[] | null);
    private _placementPriority;
    get placement(): PopUpPlacements;
    set placement(value: PopUpPlacements);
    private _placement;
    get visible(): boolean;
    set visible(externalValue: boolean);
    private _visible;
    abstract disabled: boolean;
    abstract trigger: string;
    abstract customClass: string;
    abstract content: string | TemplateRef<any>;
    protected abstract originSelector: string;
    protected abstract overlayConfig: OverlayConfig;
    protected _content: string | TemplateRef<any>;
    protected _disabled: boolean;
    protected _customClass: string;
    protected overlayRef: OverlayRef | null;
    protected portal: ComponentPortal<T>;
    protected instance: any | null;
    protected listeners: Map<string, EventListenerOrEventListenerObject>;
    protected readonly availablePositions: {
        [key: string]: ConnectionPositionPair;
    };
    protected readonly destroyed: Subject<void>;
    protected constructor(overlay: Overlay, elementRef: ElementRef, ngZone: NgZone, scrollDispatcher: ScrollDispatcher, hostView: ViewContainerRef, scrollStrategy: any, direction?: Directionality | undefined);
    abstract updateClassMap(newPlacement?: string): void;
    abstract updateData(): void;
    abstract closingActions(): Observable<any>;
    abstract getOverlayHandleComponentType(): Type<T>;
    ngOnInit(): void;
    ngOnDestroy(): void;
    handleKeydown(event: KeyboardEvent): void;
    handleTouchend(): void;
    show(delay?: number): void;
    hide(delay?: number): void;
    detach: () => void;
    /** Create the overlay config and position strategy */
    createOverlay(): OverlayRef;
    onPositionChange: ($event: ConnectedOverlayPositionChange) => void;
    initListeners(): void;
    /** Updates the position of the current popover. */
    updatePosition(reapplyPosition?: boolean): void;
    protected getPriorityPlacementStrategy(value: string | string[]): ConnectionPositionPair[];
    protected getPrioritizedPositions(): ConnectionPositionPair[];
    protected clearListeners(): void;
    private addEventListener;
    private removeEventListener;
    static ɵfac: i0.ɵɵFactoryDeclaration<McPopUpTrigger<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McPopUpTrigger<any>, never, never, { "enterDelay": "mcEnterDelay"; "leaveDelay": "mcLeaveDelay"; "placementPriority": "mcPlacementPriority"; "placement": "mcPlacement"; "visible": "mcVisible"; }, { "placementChange": "mcPlacementChange"; "visibleChange": "mcVisibleChange"; }, never>;
}