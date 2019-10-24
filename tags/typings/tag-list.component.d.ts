import { Directionality } from '@angular/cdk/bidi';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, ChangeDetectorRef, DoCheck, ElementRef, EventEmitter, OnDestroy, OnInit, QueryList } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { CanUpdateErrorState, CanUpdateErrorStateCtor, ErrorStateMatcher } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { Observable } from 'rxjs';
import { McTagTextControl } from './tag-text-control';
import { McTag, McTagEvent, McTagSelectionChange } from './tag.component';
export declare class McTagListBase {
    defaultErrorStateMatcher: ErrorStateMatcher;
    parentForm: NgForm;
    parentFormGroup: FormGroupDirective;
    ngControl: NgControl;
    constructor(defaultErrorStateMatcher: ErrorStateMatcher, parentForm: NgForm, parentFormGroup: FormGroupDirective, ngControl: NgControl);
}
export declare const McTagListMixinBase: CanUpdateErrorStateCtor & typeof McTagListBase;
/** Change event object that is emitted when the tag list value has changed. */
export declare class McTagListChange {
    source: McTagList;
    value: any;
    constructor(source: McTagList, value: any);
}
export declare class McTagList extends McTagListMixinBase implements McFormFieldControl<any>, ControlValueAccessor, AfterContentInit, DoCheck, OnInit, OnDestroy, CanUpdateErrorState {
    protected elementRef: ElementRef<HTMLElement>;
    private changeDetectorRef;
    private dir;
    ngControl: NgControl;
    readonly controlType: string;
    /** Combined stream of all of the child tags' selection change events. */
    readonly tagSelectionChanges: Observable<McTagSelectionChange>;
    /** Combined stream of all of the child tags' focus change events. */
    readonly tagFocusChanges: Observable<McTagEvent>;
    /** Combined stream of all of the child tags' blur change events. */
    readonly tagBlurChanges: Observable<McTagEvent>;
    /** Combined stream of all of the child tags' remove change events. */
    readonly tagRemoveChanges: Observable<McTagEvent>;
    /** The array of selected tags inside tag list. */
    readonly selected: McTag[] | McTag;
    /** Whether the user should be allowed to select multiple tags. */
    multiple: boolean;
    /**
     * A function to compare the option values with the selected values. The first argument
     * is a value from an option. The second is a value from the selection. A boolean
     * should be returned.
     */
    compareWith: (o1: any, o2: any) => boolean;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    value: any;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    readonly id: string;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    required: boolean;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    placeholder: string;
    /** Whether any tags or the mcTagInput inside of this tag-list has focus. */
    readonly focused: boolean;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    readonly empty: boolean;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    readonly shouldLabelFloat: boolean;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    disabled: boolean;
    /**
     * Whether or not this tag list is selectable. When a tag list is not selectable,
     * the selected states for all the tags inside the tag list are always ignored.
     */
    selectable: boolean;
    tabIndex: number;
    /**
     * Event that emits whenever the raw value of the tag-list changes. This is here primarily
     * to facilitate the two-way binding for the `value` input.
     * @docs-private
     */
    readonly valueChange: EventEmitter<any>;
    uid: string;
    /**
     * User defined tab index.
     * When it is not null, use user defined tab index. Otherwise use tabIndex
     */
    userTabIndex: number | null;
    keyManager: FocusKeyManager<McTag>;
    selectionModel: SelectionModel<McTag>;
    tagChanges: EventEmitter<any>;
    /** An object used to control when error messages are shown. */
    errorStateMatcher: ErrorStateMatcher;
    /** Orientation of the tag list. */
    orientation: 'horizontal' | 'vertical';
    /** Event emitted when the selected tag list value has been changed by the user. */
    readonly change: EventEmitter<McTagListChange>;
    /** The tag components contained within this tag list. */
    tags: QueryList<McTag>;
    _tabIndex: number;
    private _value;
    private _required;
    private _placeholder;
    private _disabled;
    private _selectable;
    /** The tag input to add more tags */
    private tagInput;
    private _multiple;
    /**
     * When a tag is destroyed, we store the index of the destroyed tag until the tags
     * query list notifies about the update. This is necessary because we cannot determine an
     * appropriate tag that should receive focus until the array of tags updated completely.
     */
    private lastDestroyedTagIndex;
    /** Subject that emits when the component has been destroyed. */
    private destroyed;
    /** Subscription to focus changes in the tags. */
    private tagFocusSubscription;
    /** Subscription to blur changes in the tags. */
    private tagBlurSubscription;
    /** Subscription to selection changes in tags. */
    private tagSelectionSubscription;
    /** Subscription to remove changes in tags. */
    private tagRemoveSubscription;
    constructor(elementRef: ElementRef<HTMLElement>, changeDetectorRef: ChangeDetectorRef, defaultErrorStateMatcher: ErrorStateMatcher, dir: Directionality, parentForm: NgForm, parentFormGroup: FormGroupDirective, ngControl: NgControl);
    ngAfterContentInit(): void;
    ngOnInit(): void;
    ngDoCheck(): void;
    ngOnDestroy(): void;
    onTouched: () => void;
    onChange: (value: any) => void;
    /** Associates an HTML input element with this tag list. */
    registerInput(inputElement: McTagTextControl): void;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    onContainerClick(event: MouseEvent): void;
    /**
     * Focuses the first non-disabled tag in this tag list, or the associated input when there
     * are no eligible tags.
     */
    focus(): void;
    /** Attempt to focus an input if we have one. */
    focusInput(): void;
    /**
     * Pass events to the keyboard manager. Available here for tests.
     */
    keydown(event: KeyboardEvent): void;
    setSelectionByValue(value: any, isUserInput?: boolean): void;
    /** When blurred, mark the field as touched when focus moved outside the tag list. */
    blur(): void;
    /** Mark the field as touched */
    markAsTouched(): void;
    /**
     * Check the tab index as you should not be allowed to focus an empty list.
     */
    protected updateTabIndex(): void;
    /**
     * If the amount of tags changed, we need to update the
     * key manager state and focus the next closest tag.
     */
    protected updateFocusForDestroyedTags(): void;
    private _compareWith;
    /**
     * Utility to ensure all indexes are valid.
     *
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of tags.
     */
    private isValidIndex;
    private isInputEmpty;
    /**
     * Finds and selects the tag based on its value.
     * @returns Tag that has the corresponding value.
     */
    private selectValue;
    private initializeSelection;
    /**
     * Deselects every tag in the list.
     * @param skip Tag that should not be deselected.
     */
    private clearSelection;
    /**
     * Sorts the model values, ensuring that they keep the same
     * order that they have in the panel.
     */
    private sortValues;
    /** Emits change event to set the model value. */
    private propagateChanges;
    private resetTags;
    private dropSubscriptions;
    /** Listens to user-generated selection events on each tag. */
    private listenToTagsSelection;
    /** Listens to user-generated selection events on each tag. */
    private listenToTagsFocus;
    private listenToTagsRemoved;
    /** Checks whether an event comes from inside a tag element. */
    private originatesFromTag;
    /** Checks whether any of the tags is focused. */
    private hasFocusedTag;
    /** Syncs the list's disabled state with the individual tags. */
    private syncTagsDisabledState;
}
