import { FocusMonitor } from '@angular/cdk/a11y';
import { ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { CanColor, CanDisable, CanDisableCtor, CanColorCtor, HasTabIndexCtor } from '@ptsecurity/mosaic/core';
export declare class McButtonCssStyler {
    private renderer;
    nativeElement: Element;
    get isIconButton(): boolean;
    private icons;
    constructor(elementRef: ElementRef, renderer: Renderer2);
    ngAfterContentInit(): void;
    private addClassModificatorForIcons;
}
export declare class McButtonBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const McButtonMixinBase: HasTabIndexCtor & CanDisableCtor & CanColorCtor & typeof McButtonBase;
export declare class McButton extends McButtonMixinBase implements OnDestroy, CanDisable, CanColor {
    private _focusMonitor;
    constructor(elementRef: ElementRef, _focusMonitor: FocusMonitor);
    ngOnDestroy(): void;
    focus(): void;
    focusViaKeyboard(): void;
    getHostElement(): any;
}
export declare class McAnchor extends McButton {
    constructor(focusMonitor: FocusMonitor, elementRef: ElementRef);
    haltDisabledEvents(event: Event): void;
}
