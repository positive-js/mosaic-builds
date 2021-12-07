import { Directionality } from '@angular/cdk/bidi';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { ChangeDetectorRef, ElementRef, EventEmitter, InjectionToken, NgZone, ViewContainerRef } from '@angular/core';
import { ThemePalette } from '@ptsecurity/mosaic/core';
import { Subject } from 'rxjs';
import { McPopoverComponent, McPopoverTrigger } from './popover.component';
import * as i0 from "@angular/core";
export declare const MC_POPOVER_CONFIRM_TEXT: InjectionToken<string>;
export declare const MC_POPOVER_CONFIRM_BUTTON_TEXT: InjectionToken<string>;
export declare class McPopoverConfirmComponent extends McPopoverComponent {
    themePalette: typeof ThemePalette;
    onConfirm: Subject<void>;
    confirmButtonText: string;
    confirmText: string;
    constructor(changeDetectorRef: ChangeDetectorRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<McPopoverConfirmComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McPopoverConfirmComponent, "mc-popover-confirm-component", never, {}, {}, never, never>;
}
export declare class McPopoverConfirmTrigger extends McPopoverTrigger {
    confirm: EventEmitter<void>;
    get confirmText(): string;
    set confirmText(value: string);
    private _confirmText;
    get confirmButtonText(): string;
    set confirmButtonText(value: string);
    private _confirmButtonText;
    constructor(overlay: Overlay, elementRef: ElementRef, ngZone: NgZone, scrollDispatcher: ScrollDispatcher, hostView: ViewContainerRef, scrollStrategy: any, direction: Directionality, confirmText: string, confirmButtonText: string);
    updateData(): void;
    setupButtonEvents(): void;
    getOverlayHandleComponentType(): typeof McPopoverConfirmComponent;
    static ɵfac: i0.ɵɵFactoryDeclaration<McPopoverConfirmTrigger, [null, null, null, null, null, null, { optional: true; }, { optional: true; }, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McPopoverConfirmTrigger, "[mcPopoverConfirm]", ["mcPopoverConfirm"], { "confirmText": "mcPopoverConfirmText"; "confirmButtonText": "mcPopoverConfirmButtonText"; }, { "confirm": "confirm"; }, never>;
}
