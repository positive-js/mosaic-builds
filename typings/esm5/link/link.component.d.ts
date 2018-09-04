import { ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FocusMonitor } from '@ptsecurity/cdk/a11y';
import { CanDisable, HasTabIndex } from '@ptsecurity/mosaic/core';
export declare class McLinkBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const _McLinkBase: import("@ptsecurity/mosaic/core/common-behaviors/constructor").Constructor<HasTabIndex> & import("@ptsecurity/mosaic/core/common-behaviors/constructor").Constructor<CanDisable> & typeof McLinkBase;
export declare class McLink extends _McLinkBase implements OnDestroy, HasTabIndex, CanDisable {
    elementRef: ElementRef;
    private _focusMonitor;
    private _changeDetector;
    disabled: any;
    private _disabled;
    constructor(tabIndex: string, elementRef: ElementRef, _focusMonitor: FocusMonitor, _changeDetector: ChangeDetectorRef);
    ngOnDestroy(): void;
    focus(): void;
    _getHostElement(): any;
}
