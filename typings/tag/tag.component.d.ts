import { ElementRef, QueryList } from '@angular/core';
import { CanColor, CanColorCtor } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
export declare class McTagBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const _McTagMixinBase: CanColorCtor & typeof McTagBase;
export declare class McTag extends _McTagMixinBase implements CanColor {
    contentChildren: QueryList<McIcon>;
    nativeElement: HTMLElement;
    constructor(elementRef: ElementRef);
    ngAfterContentInit(): void;
    _addClassModificatorForIcons(): void;
}
