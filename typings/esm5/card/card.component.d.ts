import { ElementRef, OnDestroy, EventEmitter } from '@angular/core';
import { FocusMonitor } from '@ptsecurity/cdk/a11y';
export declare enum Status {
    Info = 0,
    Success = 1,
    Warning = 2,
    Error = 3
}
export declare class McCard implements OnDestroy {
    private _elementRef;
    private _focusMonitor;
    tabIndex: number | null;
    readonly: boolean;
    selected: boolean;
    selectedChange: EventEmitter<boolean>;
    mode: 'color' | 'white';
    status: Status;
    private _tabIndex;
    constructor(_elementRef: ElementRef, _focusMonitor: FocusMonitor);
    readonly statusClass: string;
    readonly isWhiteMode: boolean;
    ngOnDestroy(): void;
    focus(): void;
    clicked($event: MouseEvent): void;
    private readonly hostElement;
    onKeyDown($event: KeyboardEvent): void;
}
