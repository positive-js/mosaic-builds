import { FocusMonitor } from '@angular/cdk/a11y';
import { ElementRef, OnDestroy, EventEmitter } from '@angular/core';
import { CanColorCtor } from '@ptsecurity/mosaic/core';
import * as i0 from "@angular/core";
export declare class McCardBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const McCardBaseMixin: CanColorCtor & typeof McCardBase;
export declare class McCard extends McCardBaseMixin implements OnDestroy {
    private _focusMonitor;
    readonly: boolean;
    selected: boolean;
    selectedChange: EventEmitter<boolean>;
    get tabIndex(): number | null;
    set tabIndex(value: number | null);
    private _tabIndex;
    constructor(elementRef: ElementRef, _focusMonitor: FocusMonitor);
    ngOnDestroy(): void;
    focus(): void;
    onClick($event: MouseEvent): void;
    onKeyDown($event: KeyboardEvent): void;
    private get hostElement();
    static ɵfac: i0.ɵɵFactoryDeclaration<McCard, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McCard, "mc-card", never, { "color": "color"; "readonly": "readonly"; "selected": "selected"; "tabIndex": "tabIndex"; }, { "selectedChange": "selectedChange"; }, never, ["*"]>;
}
