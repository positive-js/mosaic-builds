import { AfterContentInit, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit } from '@angular/core';
import { McSidebarAnimationState } from './sidebar-animations';
import * as i0 from "@angular/core";
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
    static ɵfac: i0.ɵɵFactoryDeclaration<McSidebarOpened, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McSidebarOpened, "[mc-sidebar-opened]", ["mcSidebarOpened"], { "minWidth": "minWidth"; "width": "width"; "maxWidth": "maxWidth"; }, {}, never>;
}
export declare class McSidebarClosed {
    width: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<McSidebarClosed, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McSidebarClosed, "[mc-sidebar-closed]", ["mcSidebarClosed"], { "width": "width"; }, {}, never>;
}
export declare class McSidebar implements OnDestroy, OnInit, AfterContentInit {
    private ngZone;
    private elementRef;
    get opened(): boolean;
    set opened(value: boolean);
    private _opened;
    position: SidebarPositions;
    params: McSidebarParams;
    readonly stateChanged: EventEmitter<boolean>;
    openedContent: McSidebarOpened;
    closedContent: McSidebarClosed;
    get animationState(): McSidebarAnimationState;
    internalState: boolean;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<McSidebar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McSidebar, "mc-sidebar", ["mcSidebar"], { "opened": "opened"; "position": "position"; }, { "stateChanged": "stateChanged"; }, ["openedContent", "closedContent"], ["[mc-sidebar-opened]", "[mc-sidebar-closed]"]>;
}
export {};
