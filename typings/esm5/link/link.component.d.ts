import { ElementRef, OnDestroy } from '@angular/core';
import { FocusMonitor } from '@ptsecurity/cdk/a11y';
export declare class McLink implements OnDestroy {
    private elementRef;
    private _focusMonitor;
    constructor(elementRef: ElementRef, _focusMonitor: FocusMonitor);
    ngOnDestroy(): void;
    focus(): void;
    _getHostElement(): any;
}
