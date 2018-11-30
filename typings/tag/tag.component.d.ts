import { ElementRef, QueryList } from '@angular/core';
import { CanColor, CanColorCtor, CanDisable, CanDisableCtor } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
export declare class McTagBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const _McTagMixinBase: CanColorCtor & CanDisableCtor & typeof McTagBase;
export declare class McTag extends _McTagMixinBase implements CanColor, CanDisable {
    contentChildren: QueryList<McIcon>;
    nativeElement: HTMLElement;
    private _disabled;
    disabled: any;
    constructor(elementRef: ElementRef);
    ngAfterContentInit(): void;
    _addClassModificatorForIcons(): void;
}
