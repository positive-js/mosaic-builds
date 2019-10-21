import { ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { FocusMonitor } from '@ptsecurity/cdk/a11y';
import { CanColor, CanDisable, CanDisableCtor, CanColorCtor } from '@ptsecurity/mosaic/core';
export declare class McButtonCssStyler {
    private renderer;
    nativeElement: Element;
    readonly isIconButton: boolean;
    private icons;
    constructor(elementRef: ElementRef, renderer: Renderer2);
    ngAfterContentInit(): void;
    private addClassModificatorForIcons;
}
export declare class McButtonBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const McButtonMixinBase: CanDisableCtor & CanColorCtor & typeof McButtonBase;
export declare class McButton extends McButtonMixinBase implements OnDestroy, CanDisable, CanColor {
    private _focusMonitor;
    constructor(elementRef: ElementRef, _focusMonitor: FocusMonitor);
    ngOnDestroy(): void;
    focus(): void;
    getHostElement(): any;
}
export declare class McAnchor extends McButton {
    constructor(focusMonitor: FocusMonitor, elementRef: ElementRef);
    haltDisabledEvents(event: Event): void;
}
