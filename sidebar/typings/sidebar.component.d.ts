import { AfterContentInit, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit } from '@angular/core';
import { McSidebarAnimationState } from './sidebar-animations';
export declare enum SidebarPositions {
    Left = "left",
    Right = "right"
}
interface McSidebarParams {
    openedStateMinWidth: string;
    openedStateWidth: string;
    openedStateMaxWidth: string;
    closedStateWidth: string;
}
export declare class McSidebarOpened {
    minWidth: string;
    width: string;
    maxWidth: string;
}
export declare class McSidebarClosed {
    width: string;
}
export declare class McSidebar implements OnDestroy, OnInit, AfterContentInit {
    private ngZone;
    private elementRef;
    opened: boolean;
    private _opened;
    position: SidebarPositions;
    params: McSidebarParams;
    readonly stateChanged: EventEmitter<boolean>;
    openedContent: McSidebarOpened;
    closedContent: McSidebarClosed;
    readonly animationState: McSidebarAnimationState;
    internalState: boolean;
    private needSaveAndRestoreWidth;
    private documentKeydownListener;
    constructor(ngZone: NgZone, elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    toggle(): void;
    onAnimationStart(): void;
    onAnimationDone(): void;
    ngAfterContentInit(): void;
    private registerKeydownListener;
    private unRegisterKeydownListener;
    private saveWidth;
}
export {};
