import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { CanDisableCtor, HasTabIndexCtor } from '@ptsecurity/mosaic/core';
import { McDropdownTrigger } from '@ptsecurity/mosaic/dropdown';
import { McIcon } from '@ptsecurity/mosaic/icon';
import { McTooltipTrigger } from '@ptsecurity/mosaic/tooltip';
import { McTreeOption } from './tree-option.component';
import * as i0 from "@angular/core";
export declare class McTreeNodeActionBase {
}
export declare const McTreeNodeActionMixinBase: HasTabIndexCtor & CanDisableCtor & typeof McTreeNodeActionBase;
export declare class McTreeNodeActionComponent extends McTreeNodeActionMixinBase implements OnInit, OnDestroy {
    private elementRef;
    private focusMonitor;
    private option;
    private dropdownTrigger;
    private tooltip;
    customIcon: McIcon;
    hasFocus: boolean;
    get active(): boolean;
    private readonly destroy;
    constructor(elementRef: ElementRef, focusMonitor: FocusMonitor, option: McTreeOption, dropdownTrigger: McDropdownTrigger, tooltip: McTooltipTrigger);
    ngOnInit(): void;
    ngOnDestroy(): void;
    focus(origin?: FocusOrigin, options?: FocusOptions): void;
    onFocus($event: any): void;
    onBlur(): void;
    onClick($event: any): void;
    onKeyDown($event: any): void;
    private preventShowingTooltip;
    static ɵfac: i0.ɵɵFactoryDeclaration<McTreeNodeActionComponent, [null, null, null, { optional: true; self: true; }, { optional: true; self: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McTreeNodeActionComponent, "mc-tree-node-action", ["mcTreeNodeAction"], { "disabled": "disabled"; }, {}, ["customIcon"], ["[mc-icon]"]>;
}
