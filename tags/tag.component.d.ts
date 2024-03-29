import { ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnDestroy, QueryList } from '@angular/core';
import { IFocusableOption } from '@ptsecurity/cdk/a11y';
import { CanColor, CanColorCtor, CanDisable, CanDisableCtor } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export interface McTagEvent {
    tag: McTag;
}
/** Event object emitted by McTag when selected or deselected. */
export declare class McTagSelectionChange {
    source: McTag;
    selected: boolean;
    isUserInput: boolean;
    constructor(source: McTag, selected: boolean, isUserInput?: boolean);
}
/**
 * Dummy directive to add CSS class to tag avatar.
 * @docs-private
 */
export declare class McTagAvatar {
    static ɵfac: i0.ɵɵFactoryDeclaration<McTagAvatar, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McTagAvatar, "mc-tag-avatar, [mcTagAvatar]", never, {}, {}, never>;
}
/**
 * Dummy directive to add CSS class to tag trailing icon.
 * @docs-private
 */
export declare class McTagTrailingIcon {
    static ɵfac: i0.ɵɵFactoryDeclaration<McTagTrailingIcon, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McTagTrailingIcon, "mc-tag-trailing-icon, [mcTagTrailingIcon]", never, {}, {}, never>;
}
export declare class McTagBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const McTagMixinBase: CanColorCtor & CanDisableCtor & typeof McTagBase;
export declare class McTag extends McTagMixinBase implements IFocusableOption, OnDestroy, CanColor, CanDisable {
    elementRef: ElementRef;
    changeDetectorRef: ChangeDetectorRef;
    private _ngZone;
    /** Emits when the tag is focused. */
    readonly onFocus: Subject<McTagEvent>;
    /** Emits when the tag is blured. */
    readonly onBlur: Subject<McTagEvent>;
    nativeElement: HTMLElement;
    /** Whether the tag has focus. */
    hasFocus: boolean;
    /** Whether the tag list is selectable */
    tagListSelectable: boolean;
    contentChildren: QueryList<McIcon>;
    /** The tag avatar */
    avatar: McTagAvatar;
    /** The tag's trailing icon. */
    trailingIcon: McTagTrailingIcon;
    /** The tag's remove toggler. */
    removeIcon: McTagRemove;
    /** Emitted when the tag is selected or deselected. */
    readonly selectionChange: EventEmitter<McTagSelectionChange>;
    /** Emitted when the tag is destroyed. */
    readonly destroyed: EventEmitter<McTagEvent>;
    /** Emitted when a tag is to be removed. */
    readonly removed: EventEmitter<McTagEvent>;
    /** Whether the tag is selected. */
    get selected(): boolean;
    set selected(value: boolean);
    private _selected;
    /** The value of the tag. Defaults to the content inside `<mc-tag>` tags. */
    get value(): any;
    set value(value: any);
    private _value;
    /**
     * Whether or not the tag is selectable. When a tag is not selectable,
     * changes to its selected state are always ignored. By default a tag is
     * selectable, and it becomes non-selectable if its parent tag list is
     * not selectable.
     */
    get selectable(): boolean;
    set selectable(value: boolean);
    private _selectable;
    /**
     * Determines whether or not the tag displays the remove styling and emits (removed) events.
     */
    get removable(): boolean;
    set removable(value: boolean);
    private _removable;
    get tabindex(): any;
    get disabled(): any;
    set disabled(value: any);
    private _disabled;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, _ngZone: NgZone);
    ngAfterContentInit(): void;
    addClassModificatorForIcons(): void;
    addHostClassName(): void;
    ngOnDestroy(): void;
    select(): void;
    deselect(): void;
    selectViaInteraction(): void;
    toggleSelected(isUserInput?: boolean): boolean;
    /** Allows for programmatic focusing of the tag. */
    focus(): void;
    /**
     * Allows for programmatic removal of the tag. Called by the McTagList when the DELETE or
     * BACKSPACE keys are pressed.
     *
     * Informs any listeners of the removal request. Does not remove the tag from the DOM.
     */
    remove(): void;
    handleClick(event: Event): void;
    handleKeydown(event: KeyboardEvent): void;
    blur(): void;
    private dispatchSelectionChange;
    static ɵfac: i0.ɵɵFactoryDeclaration<McTag, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McTag, "mc-tag, [mc-tag], mc-basic-tag, [mc-basic-tag]", ["mcTag"], { "color": "color"; "selected": "selected"; "value": "value"; "selectable": "selectable"; "removable": "removable"; "disabled": "disabled"; }, { "selectionChange": "selectionChange"; "destroyed": "destroyed"; "removed": "removed"; }, ["avatar", "trailingIcon", "removeIcon", "contentChildren"], ["*", "[mc-icon]"]>;
}
/**
 *
 * Example:
 *
 *     `<mc-tag>
 *       <mc-icon mcTagRemove>cancel</mc-icon>
 *     </mc-tag>`
 *
 * You *may* use a custom icon, but you may need to override the `mc-tag-remove` positioning
 * styles to properly center the icon within the tag.
 */
export declare class McTagRemove {
    protected parentTag: McTag;
    constructor(parentTag: McTag);
    focus($event: any): void;
    /** Calls the parent tag's public `remove()` method if applicable. */
    handleClick(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McTagRemove, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McTagRemove, "[mcTagRemove]", never, {}, {}, never>;
}
