import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { AfterViewInit, ElementRef, EventEmitter, InjectionToken, OnDestroy } from '@angular/core';
import { CanDisableCtor, HasTabIndexCtor } from '../common-behaviors/index';
import * as i0 from "@angular/core";
export interface McOptionActionParent {
    dropdownTrigger: {
        opened: boolean;
        restoreFocus: boolean;
        dropdownClosed: EventEmitter<void>;
        lastDestroyReason: void | 'click' | 'keydown' | 'tab';
        openedBy: Exclude<FocusOrigin, 'program' | null> | undefined;
        toggle(): void;
    };
    tooltipTrigger: {
        disabled: boolean;
    };
    focus(): void;
}
export declare const MC_OPTION_ACTION_PARENT: InjectionToken<McOptionActionParent>;
export declare class McOptionActionBase {
}
export declare const McOptionActionMixinBase: HasTabIndexCtor & CanDisableCtor & typeof McOptionActionBase;
export declare class McOptionActionComponent extends McOptionActionMixinBase implements AfterViewInit, OnDestroy {
    private elementRef;
    private focusMonitor;
    private option;
    customIcon: ElementRef;
    hasFocus: boolean;
    get active(): boolean;
    private readonly destroy;
    constructor(elementRef: ElementRef, focusMonitor: FocusMonitor, option: McOptionActionParent);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    focus(origin?: FocusOrigin, options?: FocusOptions): void;
    onFocus($event: any): void;
    onBlur(): void;
    onClick($event: any): void;
    onKeyDown($event: any): void;
    private preventShowingTooltip;
    static ɵfac: i0.ɵɵFactoryDeclaration<McOptionActionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McOptionActionComponent, "mc-option-action", ["mcOptionAction"], { "disabled": "disabled"; }, {}, ["customIcon"], ["[mc-icon]"]>;
}
