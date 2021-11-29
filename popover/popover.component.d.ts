import { Directionality } from '@angular/cdk/bidi';
import { Overlay, ScrollDispatcher, ScrollStrategy } from '@angular/cdk/overlay';
import { OverlayConfig } from '@angular/cdk/overlay/overlay-config';
import { ChangeDetectorRef, ElementRef, EventEmitter, InjectionToken, NgZone, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { McPopUp, McPopUpTrigger, PopUpPlacements, PopUpSizes } from '@ptsecurity/mosaic/core';
import * as i0 from "@angular/core";
export declare class McPopoverComponent extends McPopUp {
    prefix: string;
    header: string | TemplateRef<any>;
    footer: string | TemplateRef<any>;
    constructor(changeDetectorRef: ChangeDetectorRef);
    updateClassMap(placement: string, customClass: string, size: PopUpSizes): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McPopoverComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McPopoverComponent, "mc-popover-component", never, {}, {}, never, never>;
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
export declare class McPopoverTrigger extends McPopUpTrigger<McPopoverComponent> {
    get popoverVisible(): boolean;
    set popoverVisible(value: boolean);
    get popoverPlacement(): PopUpPlacements;
    set popoverPlacement(value: PopUpPlacements);
    get popoverPlacementPriority(): string | string[] | null;
    set popoverPlacementPriority(value: string | string[] | null);
    get hasBackdrop(): boolean;
    set hasBackdrop(value: boolean);
    private _hasBackdrop;
    get header(): string | TemplateRef<any>;
    set header(value: string | TemplateRef<any>);
    private _header;
    get content(): string | TemplateRef<any>;
    set content(value: string | TemplateRef<any>);
    get footer(): string | TemplateRef<any>;
    set footer(value: string | TemplateRef<any>);
    private _footer;
    get disabled(): boolean;
    set disabled(value: boolean);
    get trigger(): string;
    set trigger(value: string);
    private _trigger;
    get size(): PopUpSizes;
    set size(value: PopUpSizes);
    private _size;
    get customClass(): string;
    set customClass(value: string);
    get closeOnScroll(): boolean;
    set closeOnScroll(value: boolean);
    private _closeOnScroll;
    backdropClass: string;
    placementChange: EventEmitter<any>;
    visibleChange: EventEmitter<boolean>;
    protected originSelector: string;
    protected overlayConfig: OverlayConfig;
    constructor(overlay: Overlay, elementRef: ElementRef, ngZone: NgZone, scrollDispatcher: ScrollDispatcher, hostView: ViewContainerRef, scrollStrategy: any, direction: Directionality);
    updateData(): void;
    /** Updates the position of the current popover. */
    updatePosition(reapplyPosition?: boolean): void;
    getOverlayHandleComponentType(): Type<McPopoverComponent>;
    updateClassMap(newPlacement?: string): void;
    closingActions(): import("rxjs").Observable<void | MouseEvent | import("@angular/cdk/overlay").CdkScrollable>;
    static ɵfac: i0.ɵɵFactoryDeclaration<McPopoverTrigger, [null, null, null, null, null, null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McPopoverTrigger, "[mcPopover]", ["mcPopover"], { "popoverVisible": "mcPopoverVisible"; "popoverPlacement": "mcPopoverPlacement"; "popoverPlacementPriority": "mcPopoverPlacementPriority"; "hasBackdrop": "hasBackdrop"; "header": "mcPopoverHeader"; "content": "mcPopoverContent"; "footer": "mcPopoverFooter"; "disabled": "mcPopoverDisabled"; "trigger": "mcTrigger"; "size": "mcPopoverSize"; "customClass": "mcPopoverClass"; "closeOnScroll": "closeOnScroll"; "backdropClass": "backdropClass"; }, { "placementChange": "mcPopoverPlacementChange"; "visibleChange": "mcPopoverVisibleChange"; }, never>;
}
