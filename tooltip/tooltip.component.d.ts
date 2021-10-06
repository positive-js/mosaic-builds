import { Directionality } from '@angular/cdk/bidi';
import { Overlay, ScrollDispatcher, ScrollStrategy } from '@angular/cdk/overlay';
import { OverlayConfig } from '@angular/cdk/overlay/overlay-config';
import { ChangeDetectorRef, ElementRef, InjectionToken, NgZone, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { McPopUp, McPopUpTrigger } from '@ptsecurity/mosaic/core';
import * as i0 from "@angular/core";
export declare enum TooltipModifier {
    Default = "default",
    Warning = "warning",
    Extended = "extended"
}
export declare const MC_TOOLTIP_OPEN_TIME: InjectionToken<() => ScrollStrategy>;
/** @docs-private */
export declare const MC_TOOLTIP_OPEN_TIME_PROVIDER: {
    provide: InjectionToken<() => ScrollStrategy>;
    useValue: {
        value: number;
    };
};
export declare const MIN_TIME_FOR_DELAY = 2000;
export declare class McTooltipComponent extends McPopUp {
    private openTime;
    prefix: string;
    constructor(changeDetectorRef: ChangeDetectorRef, openTime: any);
    show(delay: number): void;
    updateClassMap(placement: string, customClass: string, { modifier }: {
        modifier: any;
    }): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McTooltipComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McTooltipComponent, "mc-tooltip-component", never, {}, {}, never, never>;
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
export declare class McTooltipTrigger extends McPopUpTrigger<McTooltipComponent> {
    get content(): string | TemplateRef<any>;
    set content(content: string | TemplateRef<any>);
    get disabled(): boolean;
    set disabled(value: boolean);
    enterDelay: number;
    get trigger(): string;
    set trigger(value: string);
    private _trigger;
    get customClass(): string;
    set customClass(value: string);
    protected originSelector: string;
    protected overlayConfig: OverlayConfig;
    protected modifier: TooltipModifier;
    constructor(overlay: Overlay, elementRef: ElementRef, ngZone: NgZone, scrollDispatcher: ScrollDispatcher, hostView: ViewContainerRef, scrollStrategy: any, direction: Directionality);
    updateData(): void;
    closingActions(): import("rxjs").Observable<void | MouseEvent>;
    getOverlayHandleComponentType(): Type<McTooltipComponent>;
    updateClassMap(newPlacement?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McTooltipTrigger, [null, null, null, null, null, null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McTooltipTrigger, "[mcTooltip]", ["mcTooltip"], { "content": "mcTooltip"; "disabled": "mcTooltipDisabled"; "enterDelay": "mcEnterDelay"; "trigger": "mcTrigger"; "customClass": "mcTooltipClass"; }, {}, never>;
}
export declare class McWarningTooltipTrigger extends McTooltipTrigger {
    get content(): string | TemplateRef<any>;
    set content(content: string | TemplateRef<any>);
    protected modifier: TooltipModifier;
    constructor(overlay: Overlay, elementRef: ElementRef, ngZone: NgZone, scrollDispatcher: ScrollDispatcher, hostView: ViewContainerRef, scrollStrategy: any, direction: Directionality);
    static ɵfac: i0.ɵɵFactoryDeclaration<McWarningTooltipTrigger, [null, null, null, null, null, null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McWarningTooltipTrigger, "[mcWarningTooltip]", ["mcWarningTooltip"], { "content": "mcWarningTooltip"; }, {}, never>;
}
export declare class McExtendedTooltipTrigger extends McTooltipTrigger {
    get content(): string | TemplateRef<any>;
    set content(content: string | TemplateRef<any>);
    get header(): string | TemplateRef<any>;
    set header(header: string | TemplateRef<any>);
    private _header;
    protected modifier: TooltipModifier;
    constructor(overlay: Overlay, elementRef: ElementRef, ngZone: NgZone, scrollDispatcher: ScrollDispatcher, hostView: ViewContainerRef, scrollStrategy: any, direction: Directionality);
    updateData(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McExtendedTooltipTrigger, [null, null, null, null, null, null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McExtendedTooltipTrigger, "[mcExtendedTooltip]", ["mcExtendedTooltip"], { "content": "mcExtendedTooltip"; "header": "mcTooltipHeader"; }, {}, never>;
}
