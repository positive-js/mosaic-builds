import { FocusMonitor } from '@angular/cdk/a11y';
import { ElementRef, OnDestroy, EventEmitter } from '@angular/core';
export declare class McCard implements OnDestroy {
    private _elementRef;
    private _focusMonitor;
    get tabIndex(): number | null;
    set tabIndex(value: number | null);
    readonly: boolean;
    selected: boolean;
    selectedChange: EventEmitter<boolean>;
    private _tabIndex;
    constructor(_elementRef: ElementRef, _focusMonitor: FocusMonitor);
    ngOnDestroy(): void;
    focus(): void;
    onClick($event: MouseEvent): void;
    private get hostElement();
    onKeyDown($event: KeyboardEvent): void;
}
