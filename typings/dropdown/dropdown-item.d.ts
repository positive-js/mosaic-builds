import { ElementRef, OnDestroy } from '@angular/core';
import { IFocusableOption, FocusMonitor, FocusOrigin } from '@ptsecurity/cdk/a11y';
import { CanDisable, CanDisableCtor } from '@ptsecurity/mosaic/core';
import { McDropdownPanel } from './dropdown-panel';
/** @docs-private */
export declare class McDropdownItemBase {
}
export declare const _McDropdownItemMixinBase: CanDisableCtor & typeof McDropdownItemBase;
/**
 * This directive is intended to be used inside an mc-dropdown tag.
 * It exists mostly to set the role attribute.
 */
export declare class McDropdownItem extends _McDropdownItemMixinBase implements IFocusableOption, CanDisable, OnDestroy {
    private _elementRef;
    private _focusMonitor;
    private _parentDropdownPanel?;
    private _document;
    constructor(_elementRef: ElementRef<HTMLElement>, document: any, _focusMonitor: FocusMonitor, _parentDropdownPanel?: McDropdownPanel<McDropdownItem> | undefined);
    /** Focuses the dropdown item. */
    focus(origin?: FocusOrigin): void;
    ngOnDestroy(): void;
    /** Used to set the `tabindex`. */
    _getTabIndex(): string;
    /** Returns the host DOM element. */
    _getHostElement(): HTMLElement;
    /** Prevents the default element actions if it is disabled. */
    _checkDisabled(event: Event): void;
    /** Gets the label to be used when determining whether the option should be focused. */
    getLabel(): string;
}
