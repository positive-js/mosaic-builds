import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { IFocusableOption } from '@ptsecurity/cdk/a11y';
import { CanDisable, CanDisableCtor } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
import { Subject } from 'rxjs';
import { McDropdownPanel } from './dropdown.types';
import * as i0 from "@angular/core";
/** @docs-private */
declare class McDropdownItemBase {
}
declare const McDropdownItemMixinBase: CanDisableCtor & typeof McDropdownItemBase;
/**
 * This directive is intended to be used inside an mc-dropdown tag.
 * It exists mostly to set the role attribute.
 */
export declare class McDropdownItem extends McDropdownItemMixinBase implements IFocusableOption, CanDisable, AfterViewInit, OnDestroy {
    private elementRef;
    private focusMonitor;
    parentDropdownPanel?: McDropdownPanel | undefined;
    icon: McIcon;
    /** Stream that emits when the dropdown item is hovered. */
    readonly hovered: Subject<McDropdownItem>;
    /** Stream that emits when the menu item is focused. */
    readonly focused: Subject<McDropdownItem>;
    /** Whether the dropdown item is highlighted. */
    highlighted: boolean;
    /** Whether the dropdown item acts as a trigger for a nested dropdown. */
    isNested: boolean;
    constructor(elementRef: ElementRef<HTMLElement>, focusMonitor: FocusMonitor, parentDropdownPanel?: McDropdownPanel | undefined);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    resetStyles(): void;
    /** Focuses the dropdown item. */
    focus(origin?: FocusOrigin, options?: FocusOptions): void;
    /** Returns the host DOM element. */
    getHostElement(): HTMLElement;
    /** Used to set the `tabindex`. */
    getTabIndex(): string;
    /** Prevents the default element actions if it is disabled. */
    checkDisabled(event: Event): void;
    /** Emits to the hover stream. */
    handleMouseEnter(): void;
    /** Gets the label to be used when determining whether the option should be focused. */
    getLabel(): string;
    haltDisabledEvents(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McDropdownItem, [null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McDropdownItem, "mc-dropdown-item, [mc-dropdown-item]", ["mcDropdownItem"], { "disabled": "disabled"; }, {}, ["icon"], ["*"]>;
}
export {};
