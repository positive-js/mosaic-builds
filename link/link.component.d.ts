import { FocusMonitor } from '@angular/cdk/a11y';
import { ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CanDisable, CanDisableCtor, HasTabIndex, HasTabIndexCtor } from '@ptsecurity/mosaic/core';
export declare class McLinkBase {
    elementRef: ElementRef;
    constructor(elementRef: ElementRef);
}
export declare const McLinkMixinBase: HasTabIndexCtor & CanDisableCtor & typeof McLinkBase;
export declare class McLink extends McLinkMixinBase implements OnDestroy, HasTabIndex, CanDisable {
    private focusMonitor;
    private changeDetector;
    get disabled(): any;
    set disabled(value: any);
    private _disabled;
    constructor(elementRef: ElementRef, focusMonitor: FocusMonitor, changeDetector: ChangeDetectorRef);
    ngOnDestroy(): void;
    focus(): void;
    getHostElement(): any;
}
