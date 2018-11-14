import { ElementRef, OnDestroy, EventEmitter } from '@angular/core';
import { FocusMonitor } from '@ptsecurity/cdk/a11y';
export declare class McCard implements OnDestroy {
    private _elementRef;
    private _focusMonitor;
    tabIndex: number | null;
    readonly: boolean;
    selected: boolean;
    selectedChange: EventEmitter<boolean>;
    private _tabIndex;
    constructor(_elementRef: ElementRef, _focusMonitor: FocusMonitor);
    ngOnDestroy(): void;
    focus(): void;
    onClick($event: MouseEvent): void;
    private readonly hostElement;
    onKeyDown($event: KeyboardEvent): void;
}
