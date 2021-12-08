import { FocusMonitor } from '@angular/cdk/a11y';
import { ElementRef, OnDestroy, Renderer2, QueryList, AfterContentInit } from '@angular/core';
import { CanColor, CanDisable, CanDisableCtor, CanColorCtor, HasTabIndexCtor } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
import * as i0 from "@angular/core";
export declare class McButtonCssStyler implements AfterContentInit {
    private renderer;
    icons: QueryList<McIcon>;
    nativeElement: HTMLElement;
    get isIconButton(): boolean;
    constructor(elementRef: ElementRef, renderer: Renderer2);
    ngAfterContentInit(): void;
    updateClassModifierForIcons(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McButtonCssStyler, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McButtonCssStyler, "button[mc-button], a[mc-button]", never, {}, {}, ["icons"]>;
}
export declare class McButtonBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const McButtonMixinBase: HasTabIndexCtor & CanDisableCtor & CanColorCtor & typeof McButtonBase;
export declare class McButton extends McButtonMixinBase implements OnDestroy, CanDisable, CanColor {
    private focusMonitor;
    hasFocus: boolean;
    constructor(elementRef: ElementRef, focusMonitor: FocusMonitor);
    ngOnDestroy(): void;
    onFocus($event: any): void;
    onBlur(): void;
    getHostElement(): any;
    focus(): void;
    focusViaKeyboard(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McButton, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McButton, "button[mc-button]", never, { "tabIndex": "tabIndex"; "disabled": "disabled"; "color": "color"; }, {}, never, ["*"]>;
}
export declare class McAnchor extends McButton {
    constructor(focusMonitor: FocusMonitor, elementRef: ElementRef);
    haltDisabledEvents(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McAnchor, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McAnchor, "a[mc-button]", never, { "disabled": "disabled"; "color": "color"; "tabIndex": "tabIndex"; }, {}, never, ["*"]>;
}
