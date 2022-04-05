import { Directionality } from '@angular/cdk/bidi';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { AfterViewInit, ElementRef, NgZone, OnDestroy, ViewContainerRef } from '@angular/core';
import { McOption } from '@ptsecurity/mosaic/core';
import { McTooltipTrigger } from '@ptsecurity/mosaic/tooltip';
import * as i0 from "@angular/core";
export declare class McOptionTooltip extends McTooltipTrigger implements AfterViewInit, OnDestroy {
    private option;
    private resizeObserver;
    private mutationObserver;
    get textElement(): HTMLElement;
    get isOverflown(): boolean;
    constructor(option: McOption, overlay: Overlay, elementRef: ElementRef, ngZone: NgZone, scrollDispatcher: ScrollDispatcher, hostView: ViewContainerRef, scrollStrategy: any, direction: Directionality);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McOptionTooltip, [null, null, null, null, null, null, null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McOptionTooltip, "mc-option", never, {}, {}, never>;
}
