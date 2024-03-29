import { Directionality } from '@angular/cdk/bidi';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, ChangeDetectorRef, DoCheck, ElementRef, EventEmitter, OnDestroy, OnInit, QueryList } from '@angular/core';
import { ControlValueAccessor, FormControlName, FormGroupDirective, NgControl, NgForm, NgModel, Validator } from '@angular/forms';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { CanUpdateErrorState, CanUpdateErrorStateCtor, ErrorStateMatcher, McValidationOptions } from '@ptsecurity/mosaic/core';
import { McCleaner, McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { Observable } from 'rxjs';
import { McTagTextControl } from './tag-text-control';
import { McTag, McTagEvent, McTagSelectionChange } from './tag.component';
import * as i0 from "@angular/core";
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
    rawValidators: Validator[];
    private mcValidation;
    private dir;
    ngModel: NgModel;
    formControlName: FormControlName;
    readonly controlType: string;
    /** Combined stream of all of the child tags' selection change events. */
    get tagSelectionChanges(): Observable<McTagSelectionChange>;
    /** Combined stream of all of the child tags' focus change events. */
    get tagFocusChanges(): Observable<McTagEvent>;
    /** Combined stream of all of the child tags' blur change events. */
    get tagBlurChanges(): Observable<McTagEvent>;
    /** Combined stream of all of the child tags' remove change events. */
    get tagRemoveChanges(): Observable<McTagEvent>;
    /** The array of selected tags inside tag list. */
    get selected(): McTag[] | McTag;
    get canShowCleaner(): boolean;
    /** Whether the user should be allowed to select multiple tags. */
    get multiple(): boolean;
    set multiple(value: boolean);
    /**
     * A function to compare the option values with the selected values. The first argument
     * is a value from an option. The second is a value from the selection. A boolean
     * should be returned.
     */
    get compareWith(): (o1: any, o2: any) => boolean;
    set compareWith(fn: (o1: any, o2: any) => boolean);
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get value(): any;
    set value(value: any);
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get id(): string;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get required(): boolean;
    set required(value: boolean);
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get placeholder(): string;
    set placeholder(value: string);
    /** Whether any tags or the mcTagInput inside of this tag-list has focus. */
    get focused(): boolean;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get empty(): boolean;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get shouldLabelFloat(): boolean;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get disabled(): boolean;
    set disabled(value: boolean);
    /**
     * Whether or not this tag list is selectable. When a tag list is not selectable,
     * the selected states for all the tags inside the tag list are always ignored.
     */
    get selectable(): boolean;
    set selectable(value: boolean);
    get tabIndex(): number;
    set tabIndex(value: number);
    private _tabIndex;
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
    cleaner: McCleaner;
    /** The tag components contained within this tag list. */
    tags: QueryList<McTag>;
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
    constructor(elementRef: ElementRef<HTMLElement>, changeDetectorRef: ChangeDetectorRef, defaultErrorStateMatcher: ErrorStateMatcher, rawValidators: Validator[], mcValidation: McValidationOptions, dir: Directionality, parentForm: NgForm, parentFormGroup: FormGroupDirective, ngControl: NgControl, ngModel: NgModel, formControlName: FormControlName);
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
    private propagateTagsChanges;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<McTagList, [null, null, null, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; self: true; }, { optional: true; self: true; }, { optional: true; self: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McTagList, "mc-tag-list", ["mcTagList"], { "multiple": "multiple"; "compareWith": "compareWith"; "value": "value"; "required": "required"; "placeholder": "placeholder"; "disabled": "disabled"; "selectable": "selectable"; "tabIndex": "tabIndex"; "errorStateMatcher": "errorStateMatcher"; "orientation": "orientation"; }, { "valueChange": "valueChange"; "change": "change"; }, ["cleaner", "tags"], ["*", "mc-cleaner"]>;
}
