import { ElementRef, OnDestroy, QueryList } from '@angular/core';
import { FocusMonitor } from '@ptsecurity/cdk/a11y';
import { CanColor, CanDisable, CanDisableCtor, CanColorCtor } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
export declare class McButtonCSSStyler {
}
export declare class McIconButtonCSSStyler {
    nativeElement: Element;
    contentChildren: QueryList<McIcon>;
    constructor(elementRef: ElementRef);
    ngAfterContentInit(): void;
    _addClassModificatorForIcons(): void;
}
export declare class McButtonBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const _McButtonMixinBase: CanDisableCtor & CanColorCtor & typeof McButtonBase;
export declare class McButton extends _McButtonMixinBase implements OnDestroy, CanDisable, CanColor {
    private _focusMonitor;
    constructor(elementRef: ElementRef, _focusMonitor: FocusMonitor);
    ngOnDestroy(): void;
    focus(): void;
    _getHostElement(): any;
}
export declare class McAnchor extends McButton {
    constructor(focusMonitor: FocusMonitor, elementRef: ElementRef);
    _haltDisabledEvents(event: Event): void;
}
export declare class McIconButton extends McButton {
    constructor(focusMonitor: FocusMonitor, elementRef: ElementRef);
    _haltDisabledEvents(event: Event): void;
}
