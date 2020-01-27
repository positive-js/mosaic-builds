import { ElementRef, OnDestroy } from '@angular/core';
import { IFocusableOption, FocusMonitor, FocusOrigin } from '@ptsecurity/cdk/a11y';
import { CanDisable, CanDisableCtor } from '@ptsecurity/mosaic/core';
import { Subject } from 'rxjs';
import { McDropdownPanel } from './dropdown-panel';
/** @docs-private */
export declare class McDropdownItemBase {
}
export declare const McDropdownItemMixinBase: CanDisableCtor & typeof McDropdownItemBase;
/**
 * This directive is intended to be used inside an mc-dropdown tag.
 * It exists mostly to set the role attribute.
 */
export declare class McDropdownItem extends McDropdownItemMixinBase implements IFocusableOption, CanDisable, OnDestroy {
    private _elementRef;
    private _focusMonitor;
    private document;
    private _parentDropdownPanel?;
    /** ARIA role for the dropdown item. */
    role: 'menuitem' | 'menuitemradio' | 'menuitemcheckbox';
    content: any;
    /** Stream that emits when the dropdown item is hovered. */
    readonly hovered: Subject<McDropdownItem>;
    /** Whether the dropdown item is highlighted. */
    highlighted: boolean;
    /** Whether the dropdown item acts as a trigger for a nested dropdown. */
    triggersNestedDropdown: boolean;
    constructor(_elementRef: ElementRef<HTMLElement>, _focusMonitor: FocusMonitor, document: any, _parentDropdownPanel?: McDropdownPanel<McDropdownItem>);
    /** Focuses the dropdown item. */
    focus(origin?: FocusOrigin): void;
    ngOnDestroy(): void;
    /** Used to set the `tabindex`. */
    getTabIndex(): string;
    /** Returns the host DOM element. */
    getHostElement(): HTMLElement;
    /** Prevents the default element actions if it is disabled. */
    checkDisabled(event: MouseEvent): void;
    /** Emits to the hover stream. */
    handleMouseEnter(): void;
    /** Gets the label to be used when determining whether the option should be focused. */
    getLabel(): string;
}
