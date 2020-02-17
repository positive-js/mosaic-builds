import { ElementRef, EventEmitter, OnChanges, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { McTagsDefaultOptions } from './tag-default-options';
import { McTagList } from './tag-list.component';
import { McTagTextControl } from './tag-text-control';
/** Represents an input event on a `mcTagInput`. */
export interface McTagInputEvent {
    /** The native `<input>` element that the event is being fired for. */
    input: HTMLInputElement;
    /** The value of the input. */
    value: string;
}
/**
 * Directive that adds tag-specific behaviors to an input element inside `<mc-form-field>`.
 * May be placed inside or outside of an `<mc-tag-list>`.
 */
export declare class McTagInput implements McTagTextControl, OnChanges {
    private elementRef;
    private renderer;
    private defaultOptions;
    ngControl: NgControl;
    /** Whether the control is focused. */
    focused: boolean;
    /**
     * The list of key codes that will trigger a tagEnd event.
     *
     * Defaults to `[ENTER]`.
     */
    separatorKeyCodes: number[] | Set<number>;
    /** Emitted when a tag is to be added. */
    tagEnd: EventEmitter<McTagInputEvent>;
    /** The input's placeholder text. */
    placeholder: string;
    /** Unique id for the input. */
    id: string;
    /** Register input for tag list */
    tagList: McTagList;
    private _tagList;
    /**
     * Whether or not the tagEnd event will be emitted when the input is blurred.
     */
    addOnBlur: boolean;
    private _addOnBlur;
    /** Whether the input is disabled. */
    disabled: boolean;
    private _disabled;
    /** Whether the input is empty. */
    readonly empty: boolean;
    countOfSymbolsForUpdateWidth: number;
    private oneSymbolWidth;
    /** The native input element to which this directive is attached. */
    private inputElement;
    constructor(elementRef: ElementRef<HTMLInputElement>, renderer: Renderer2, defaultOptions: McTagsDefaultOptions, ngControl: NgControl);
    ngOnChanges(): void;
    /** Utility method to make host definition/tests more clear. */
    keydown(event?: KeyboardEvent): void;
    /** Checks to see if the blur should emit the (tagEnd) event. */
    blur(): void;
    /** Checks to see if the (tagEnd) event needs to be emitted. */
    emittagEnd(event?: KeyboardEvent): void;
    onInput(): void;
    updateInputWidth(): void;
    onFocus(): void;
    /** Focuses the input. */
    focus(): void;
    private setDefaultInputWidth;
    /** Checks whether a keycode is one of the configured separators. */
    private isSeparatorKey;
}
