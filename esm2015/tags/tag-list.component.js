import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Inject, Input, Optional, Output, QueryList, Self, ViewEncapsulation } from '@angular/core';
import { FormControlName, FormGroupDirective, NG_VALIDATORS, NgControl, NgForm, NgModel } from '@angular/forms';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { BACKSPACE, END, HOME } from '@ptsecurity/cdk/keycodes';
import { ErrorStateMatcher, MC_VALIDATION, mixinErrorState, setMosaicValidation } from '@ptsecurity/mosaic/core';
import { McCleaner, McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { merge, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { McTag } from './tag.component';
export class McTagListBase {
    constructor(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
        this.defaultErrorStateMatcher = defaultErrorStateMatcher;
        this.parentForm = parentForm;
        this.parentFormGroup = parentFormGroup;
        this.ngControl = ngControl;
    }
}
// tslint:disable-next-line:naming-convention
export const McTagListMixinBase = mixinErrorState(McTagListBase);
// Increasing integer for generating unique ids for tag-list components.
let nextUniqueId = 0;
/** Change event object that is emitted when the tag list value has changed. */
export class McTagListChange {
    constructor(source, value) {
        this.source = source;
        this.value = value;
    }
}
export class McTagList extends McTagListMixinBase {
    constructor(elementRef, changeDetectorRef, defaultErrorStateMatcher, rawValidators, mcValidation, dir, parentForm, parentFormGroup, ngControl, ngModel, formControlName) {
        super(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this.rawValidators = rawValidators;
        this.mcValidation = mcValidation;
        this.dir = dir;
        this.ngModel = ngModel;
        this.formControlName = formControlName;
        this.controlType = 'tag-list';
        this._tabIndex = 0;
        /**
         * Event that emits whenever the raw value of the tag-list changes. This is here primarily
         * to facilitate the two-way binding for the `value` input.
         * @docs-private
         */
        this.valueChange = new EventEmitter();
        this.uid = `mc-tag-list-${nextUniqueId++}`;
        /**
         * User defined tab index.
         * When it is not null, use user defined tab index. Otherwise use tabIndex
         */
        this.userTabIndex = null;
        this.tagChanges = new EventEmitter();
        /** Orientation of the tag list. */
        this.orientation = 'horizontal';
        /** Event emitted when the selected tag list value has been changed by the user. */
        this.change = new EventEmitter();
        this._required = false;
        this._disabled = false;
        this._selectable = true;
        this._multiple = false;
        /**
         * When a tag is destroyed, we store the index of the destroyed tag until the tags
         * query list notifies about the update. This is necessary because we cannot determine an
         * appropriate tag that should receive focus until the array of tags updated completely.
         */
        this.lastDestroyedTagIndex = null;
        /** Subject that emits when the component has been destroyed. */
        this.destroyed = new Subject();
        // tslint:disable-next-line:no-empty
        this.onTouched = () => { };
        // tslint:disable-next-line:no-empty
        this.onChange = () => { };
        this._compareWith = (o1, o2) => o1 === o2;
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }
    /** Combined stream of all of the child tags' selection change events. */
    get tagSelectionChanges() {
        return merge(...this.tags.map((tag) => tag.selectionChange));
    }
    /** Combined stream of all of the child tags' focus change events. */
    get tagFocusChanges() {
        return merge(...this.tags.map((tag) => tag.onFocus));
    }
    /** Combined stream of all of the child tags' blur change events. */
    get tagBlurChanges() {
        return merge(...this.tags.map((tag) => tag.onBlur));
    }
    /** Combined stream of all of the child tags' remove change events. */
    get tagRemoveChanges() {
        return merge(...this.tags.map((tag) => tag.destroyed));
    }
    /** The array of selected tags inside tag list. */
    get selected() {
        return this.multiple ? this.selectionModel.selected : this.selectionModel.selected[0];
    }
    get canShowCleaner() {
        return this.cleaner && this.tags.length > 0;
    }
    /** Whether the user should be allowed to select multiple tags. */
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        this._multiple = coerceBooleanProperty(value);
    }
    /**
     * A function to compare the option values with the selected values. The first argument
     * is a value from an option. The second is a value from the selection. A boolean
     * should be returned.
     */
    get compareWith() {
        return this._compareWith;
    }
    set compareWith(fn) {
        this._compareWith = fn;
        if (this.selectionModel) {
            // A different comparator means the selection could change.
            this.initializeSelection();
        }
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get value() {
        return this._value;
    }
    set value(value) {
        this.writeValue(value);
        this._value = value;
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get id() {
        return this.tagInput ? this.tagInput.id : this.uid;
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get placeholder() {
        return this.tagInput ? this.tagInput.placeholder : this._placeholder;
    }
    set placeholder(value) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    /** Whether any tags or the mcTagInput inside of this tag-list has focus. */
    get focused() {
        return (this.tagInput && this.tagInput.focused) || this.hasFocusedTag();
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get empty() {
        return (!this.tagInput || this.tagInput.empty) && this.tags.length === 0;
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get shouldLabelFloat() {
        return !this.empty || this.focused;
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get disabled() {
        return this.ngControl ? !!this.ngControl.disabled : this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        this.syncTagsDisabledState();
    }
    /**
     * Whether or not this tag list is selectable. When a tag list is not selectable,
     * the selected states for all the tags inside the tag list are always ignored.
     */
    get selectable() {
        return this._selectable;
    }
    set selectable(value) {
        this._selectable = coerceBooleanProperty(value);
        if (this.tags) {
            this.tags.forEach((tag) => tag.tagListSelectable = this._selectable);
        }
    }
    get tabIndex() {
        return this._tabIndex;
    }
    set tabIndex(value) {
        this.userTabIndex = value;
        this._tabIndex = value;
    }
    ngAfterContentInit() {
        if (this.mcValidation.useValidation) {
            setMosaicValidation(this);
        }
        this.keyManager = new FocusKeyManager(this.tags)
            .withVerticalOrientation()
            .withHorizontalOrientation(this.dir ? this.dir.value : 'ltr');
        if (this.dir) {
            this.dir.change
                .pipe(takeUntil(this.destroyed))
                .subscribe((dir) => this.keyManager.withHorizontalOrientation(dir));
        }
        // Prevents the tag list from capturing focus and redirecting
        // it back to the first tag when the user tabs out.
        this.keyManager.tabOut
            .pipe(takeUntil(this.destroyed))
            .subscribe(() => {
            this._tabIndex = -1;
            setTimeout(() => {
                this._tabIndex = this.userTabIndex || 0;
                this.changeDetectorRef.markForCheck();
            });
        });
        // When the list changes, re-subscribe
        this.tags.changes
            .pipe(startWith(null), takeUntil(this.destroyed))
            .subscribe(() => {
            if (this.disabled) {
                // Since this happens after the content has been
                // checked, we need to defer it to the next tick.
                Promise.resolve().then(() => { this.syncTagsDisabledState(); });
            }
            this.resetTags();
            // Reset tags selected/deselected status
            this.initializeSelection();
            // Check to see if we need to update our tab index
            this.updateTabIndex();
            // Check to see if we have a destroyed tag and need to refocus
            this.updateFocusForDestroyedTags();
            // Defer setting the value in order to avoid the "Expression
            // has changed after it was checked" errors from Angular.
            Promise.resolve().then(() => {
                this.tagChanges.emit(this.tags.toArray());
                this.stateChanges.next();
                this.propagateTagsChanges();
            });
        });
    }
    ngOnInit() {
        this.selectionModel = new SelectionModel(this.multiple, undefined, false);
        this.stateChanges.next();
    }
    ngDoCheck() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
        this.stateChanges.complete();
        this.dropSubscriptions();
    }
    /** Associates an HTML input element with this tag list. */
    registerInput(inputElement) {
        var _a;
        this.tagInput = inputElement;
        // todo need rethink about it
        if (this.ngControl && ((_a = inputElement.ngControl) === null || _a === void 0 ? void 0 : _a.statusChanges)) {
            inputElement.ngControl.statusChanges
                .subscribe(() => this.ngControl.control.setErrors(inputElement.ngControl.errors));
        }
    }
    // Implemented as part of ControlValueAccessor.
    writeValue(value) {
        if (this.tags) {
            this.setSelectionByValue(value, false);
        }
    }
    // Implemented as part of ControlValueAccessor.
    registerOnChange(fn) {
        this.onChange = fn;
    }
    // Implemented as part of ControlValueAccessor.
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    // Implemented as part of ControlValueAccessor.
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.stateChanges.next();
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    onContainerClick(event) {
        if (!this.originatesFromTag(event)) {
            this.focus();
        }
    }
    /**
     * Focuses the first non-disabled tag in this tag list, or the associated input when there
     * are no eligible tags.
     */
    focus() {
        if (this.disabled) {
            return;
        }
        // TODO: ARIA says this should focus the first `selected` tag if any are selected.
        // Focus on first element if there's no tagInput inside tag-list
        if (this.tagInput && this.tagInput.focused) {
            // do nothing
        }
        else if (this.tags.length > 0) {
            this.keyManager.setFirstItemActive();
            this.stateChanges.next();
        }
        else {
            this.focusInput();
            this.stateChanges.next();
        }
    }
    /** Attempt to focus an input if we have one. */
    focusInput() {
        if (this.tagInput) {
            this.tagInput.focus();
        }
    }
    /**
     * Pass events to the keyboard manager. Available here for tests.
     */
    keydown(event) {
        const target = event.target;
        // If they are on an empty input and hit backspace, focus the last tag
        // tslint:disable-next-line: deprecation
        if (event.keyCode === BACKSPACE && this.isInputEmpty(target)) {
            this.keyManager.setLastItemActive();
            event.preventDefault();
        }
        else if (target && target.classList.contains('mc-tag')) {
            // tslint:disable-next-line: deprecation
            if (event.keyCode === HOME) {
                this.keyManager.setFirstItemActive();
                event.preventDefault();
                // tslint:disable-next-line: deprecation
            }
            else if (event.keyCode === END) {
                this.keyManager.setLastItemActive();
                event.preventDefault();
            }
            else {
                this.keyManager.onKeydown(event);
            }
            this.stateChanges.next();
        }
    }
    setSelectionByValue(value, isUserInput = true) {
        this.clearSelection();
        this.tags.forEach((tag) => tag.deselect());
        if (Array.isArray(value)) {
            value.forEach((currentValue) => this.selectValue(currentValue, isUserInput));
            this.sortValues();
        }
        else {
            const correspondingTag = this.selectValue(value, isUserInput);
            // Shift focus to the active item. Note that we shouldn't do this in multiple
            // mode, because we don't know what tag the user interacted with last.
            if (correspondingTag && isUserInput) {
                this.keyManager.setActiveItem(correspondingTag);
            }
        }
    }
    /** When blurred, mark the field as touched when focus moved outside the tag list. */
    blur() {
        if (!this.hasFocusedTag()) {
            this.keyManager.setActiveItem(-1);
        }
        if (!this.disabled) {
            if (this.tagInput) {
                // If there's a tag input, we should check whether the focus moved to tag input.
                // If the focus is not moved to tag input, mark the field as touched. If the focus moved
                // to tag input, do nothing.
                // Timeout is needed to wait for the focus() event trigger on tag input.
                setTimeout(() => {
                    if (!this.focused) {
                        this.markAsTouched();
                    }
                });
            }
            else {
                // If there's no tag input, then mark the field as touched.
                this.markAsTouched();
            }
        }
    }
    /** Mark the field as touched */
    markAsTouched() {
        this.onTouched();
        this.changeDetectorRef.markForCheck();
        this.stateChanges.next();
    }
    /**
     * Check the tab index as you should not be allowed to focus an empty list.
     */
    updateTabIndex() {
        // If we have 0 tags, we should not allow keyboard focus
        this._tabIndex = this.userTabIndex || (this.tags.length === 0 ? -1 : 0);
    }
    /**
     * If the amount of tags changed, we need to update the
     * key manager state and focus the next closest tag.
     */
    updateFocusForDestroyedTags() {
        if (this.lastDestroyedTagIndex != null) {
            if (this.tags.length) {
                const newTagIndex = Math.min(this.lastDestroyedTagIndex, this.tags.length - 1);
                this.keyManager.setActiveItem(newTagIndex);
            }
            else {
                this.focusInput();
            }
        }
        this.lastDestroyedTagIndex = null;
    }
    /**
     * Utility to ensure all indexes are valid.
     *
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of tags.
     */
    isValidIndex(index) {
        return index >= 0 && index < this.tags.length;
    }
    isInputEmpty(element) {
        if (element && element.nodeName.toLowerCase() === 'input') {
            const input = element;
            return !input.value;
        }
        return false;
    }
    /**
     * Finds and selects the tag based on its value.
     * @returns Tag that has the corresponding value.
     */
    selectValue(value, isUserInput = true) {
        const correspondingTag = this.tags.find((tag) => {
            return tag.value != null && this._compareWith(tag.value, value);
        });
        if (correspondingTag) {
            if (isUserInput) {
                correspondingTag.selectViaInteraction();
            }
            else {
                correspondingTag.select();
            }
            this.selectionModel.select(correspondingTag);
        }
        return correspondingTag;
    }
    initializeSelection() {
        // Defer setting the value in order to avoid the "Expression
        // has changed after it was checked" errors from Angular.
        Promise.resolve().then(() => {
            if (this.ngControl || this._value) {
                this.setSelectionByValue(this.ngControl ? this.ngControl.value : this._value, false);
                this.stateChanges.next();
            }
        });
    }
    /**
     * Deselects every tag in the list.
     * @param skip Tag that should not be deselected.
     */
    clearSelection(skip) {
        this.selectionModel.clear();
        this.tags.forEach((tag) => {
            if (tag !== skip) {
                tag.deselect();
            }
        });
        this.stateChanges.next();
    }
    /**
     * Sorts the model values, ensuring that they keep the same
     * order that they have in the panel.
     */
    sortValues() {
        if (this._multiple) {
            this.selectionModel.clear();
            this.tags.forEach((tag) => {
                if (tag.selected) {
                    this.selectionModel.select(tag);
                }
            });
            this.stateChanges.next();
        }
    }
    /** Emits change event to set the model value. */
    // todo need rethink this method and selection logic
    propagateChanges(fallbackValue) {
        let valueToEmit = null;
        if (Array.isArray(this.selected)) {
            valueToEmit = this.selected.map((tag) => tag.value);
        }
        else {
            valueToEmit = this.selected ? this.selected.value : fallbackValue;
        }
        this._value = valueToEmit;
        this.change.emit(new McTagListChange(this, valueToEmit));
        this.valueChange.emit(valueToEmit);
        this.onChange(valueToEmit);
        this.changeDetectorRef.markForCheck();
    }
    propagateTagsChanges() {
        const valueToEmit = this.tags.map((tag) => tag.value);
        this._value = valueToEmit;
        this.change.emit(new McTagListChange(this, valueToEmit));
        this.valueChange.emit(valueToEmit);
        this.onChange(valueToEmit);
        this.changeDetectorRef.markForCheck();
    }
    resetTags() {
        this.dropSubscriptions();
        this.listenToTagsFocus();
        this.listenToTagsSelection();
        this.listenToTagsRemoved();
    }
    dropSubscriptions() {
        if (this.tagFocusSubscription) {
            this.tagFocusSubscription.unsubscribe();
            this.tagFocusSubscription = null;
        }
        if (this.tagBlurSubscription) {
            this.tagBlurSubscription.unsubscribe();
            this.tagBlurSubscription = null;
        }
        if (this.tagSelectionSubscription) {
            this.tagSelectionSubscription.unsubscribe();
            this.tagSelectionSubscription = null;
        }
        if (this.tagRemoveSubscription) {
            this.tagRemoveSubscription.unsubscribe();
            this.tagRemoveSubscription = null;
        }
    }
    /** Listens to user-generated selection events on each tag. */
    listenToTagsSelection() {
        this.tagSelectionSubscription = this.tagSelectionChanges.subscribe((event) => {
            if (event.source.selected) {
                this.selectionModel.select(event.source);
            }
            else {
                this.selectionModel.deselect(event.source);
            }
            // For single selection tag list, make sure the deselected value is unselected.
            if (!this.multiple) {
                this.tags.forEach((tag) => {
                    if (!this.selectionModel.isSelected(tag) && tag.selected) {
                        tag.deselect();
                    }
                });
            }
            if (event.isUserInput) {
                this.propagateChanges();
            }
        });
    }
    /** Listens to user-generated selection events on each tag. */
    listenToTagsFocus() {
        this.tagFocusSubscription = this.tagFocusChanges.subscribe((event) => {
            const tagIndex = this.tags.toArray().indexOf(event.tag);
            if (this.isValidIndex(tagIndex)) {
                this.keyManager.updateActiveItem(tagIndex);
            }
            this.stateChanges.next();
        });
        this.tagBlurSubscription = this.tagBlurChanges.subscribe(() => {
            this.blur();
            this.stateChanges.next();
        });
    }
    listenToTagsRemoved() {
        this.tagRemoveSubscription = this.tagRemoveChanges.subscribe((event) => {
            const tag = event.tag;
            const tagIndex = this.tags.toArray().indexOf(event.tag);
            // In case the tag that will be removed is currently focused, we temporarily store
            // the index in order to be able to determine an appropriate sibling tag that will
            // receive focus.
            if (this.isValidIndex(tagIndex) && tag.hasFocus) {
                this.lastDestroyedTagIndex = tagIndex;
            }
            else if (this.isValidIndex(tagIndex) && !tag.hasFocus) {
                this.focusInput();
            }
        });
    }
    /** Checks whether an event comes from inside a tag element. */
    originatesFromTag(event) {
        let currentElement = event.target;
        while (currentElement && currentElement !== this.elementRef.nativeElement) {
            if (currentElement.classList.contains('mc-tag')) {
                return true;
            }
            currentElement = currentElement.parentElement;
        }
        return false;
    }
    /** Checks whether any of the tags is focused. */
    hasFocusedTag() {
        return this.tags.some((tag) => tag.hasFocus);
    }
    /** Syncs the list's disabled state with the individual tags. */
    syncTagsDisabledState() {
        if (this.tags) {
            this.tags.forEach((tag) => {
                tag.disabled = this._disabled;
            });
        }
    }
}
McTagList.decorators = [
    { type: Component, args: [{
                selector: 'mc-tag-list',
                exportAs: 'mcTagList',
                template: "<div class=\"mc-tags-list__list-container\">\n    <ng-content></ng-content>\n</div>\n\n<div class=\"mc-tags-list__cleaner\"\n     *ngIf=\"canShowCleaner\">\n    <ng-content select=\"mc-cleaner\"></ng-content>\n</div>\n",
                host: {
                    class: 'mc-tag-list',
                    '[class.mc-disabled]': 'disabled',
                    '[class.mc-invalid]': 'errorState',
                    '[attr.tabindex]': 'disabled ? null : tabIndex',
                    '[id]': 'uid',
                    '(focus)': 'focus()',
                    '(blur)': 'blur()',
                    '(keydown)': 'keydown($event)'
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [{ provide: McFormFieldControl, useExisting: McTagList }],
                styles: [".mc-tag-list{display:flex;flex-direction:row;box-sizing:border-box}.mc-tag-input{border:none;outline:none;background:transparent}.mc-tags-list__list-container{display:flex;flex-wrap:wrap;flex:1 1 100%;box-sizing:border-box;min-width:0;min-height:var(--mc-tag-list-size-min-height,30px);padding:var(--mc-tag-list-size-padding,1px 6px)}.mc-tags-list__list-container .mc-tag-input{max-width:100%;flex:1 1 auto;height:var(--mc-tag-input-size-height,22px);margin:var(--mc-tag-input-size-margin,2px 4px)}.mc-tags-list__cleaner .mc-cleaner{height:30px}"]
            },] }
];
/** @nocollapse */
McTagList.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: ErrorStateMatcher },
    { type: Array, decorators: [{ type: Optional }, { type: Inject, args: [NG_VALIDATORS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_VALIDATION,] }] },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: NgForm, decorators: [{ type: Optional }] },
    { type: FormGroupDirective, decorators: [{ type: Optional }] },
    { type: NgControl, decorators: [{ type: Optional }, { type: Self }] },
    { type: NgModel, decorators: [{ type: Optional }, { type: Self }] },
    { type: FormControlName, decorators: [{ type: Optional }, { type: Self }] }
];
McTagList.propDecorators = {
    multiple: [{ type: Input }],
    compareWith: [{ type: Input }],
    value: [{ type: Input }],
    required: [{ type: Input }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    selectable: [{ type: Input }],
    tabIndex: [{ type: Input }],
    valueChange: [{ type: Output }],
    errorStateMatcher: [{ type: Input }],
    orientation: [{ type: Input, args: ['orientation',] }],
    change: [{ type: Output }],
    cleaner: [{ type: ContentChild, args: ['mcTagListCleaner', { static: true },] }],
    tags: [{ type: ContentChildren, args: [McTag, {
                    // Need to use `descendants: true`,
                    // Ivy will no longer match indirect descendants if it's left as false.
                    descendants: true
                },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RhZ3MvdGFnLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUVILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBRWYsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULElBQUksRUFDSixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUVILGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsYUFBYSxFQUNiLFNBQVMsRUFDVCxNQUFNLEVBQ04sT0FBTyxFQUVWLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFHSCxpQkFBaUIsRUFDakIsYUFBYSxFQUViLGVBQWUsRUFDZixtQkFBbUIsRUFDdEIsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDOUUsT0FBTyxFQUFFLEtBQUssRUFBYyxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHdEQsT0FBTyxFQUFFLEtBQUssRUFBb0MsTUFBTSxpQkFBaUIsQ0FBQztBQUcxRSxNQUFNLE9BQU8sYUFBYTtJQUN0QixZQUNXLHdCQUEyQyxFQUMzQyxVQUFrQixFQUNsQixlQUFtQyxFQUNuQyxTQUFvQjtRQUhwQiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQW1CO1FBQzNDLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDbEIsb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBQ25DLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFDNUIsQ0FBQztDQUNQO0FBRUQsNkNBQTZDO0FBQzdDLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFtRCxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7QUFHakgsd0VBQXdFO0FBQ3hFLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUVyQiwrRUFBK0U7QUFDL0UsTUFBTSxPQUFPLGVBQWU7SUFDeEIsWUFBbUIsTUFBaUIsRUFBUyxLQUFVO1FBQXBDLFdBQU0sR0FBTixNQUFNLENBQVc7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFLO0lBQUcsQ0FBQztDQUM5RDtBQXdCRCxNQUFNLE9BQU8sU0FBVSxTQUFRLGtCQUFrQjtJQThQN0MsWUFDYyxVQUFtQyxFQUNyQyxpQkFBb0MsRUFDNUMsd0JBQTJDLEVBQ0QsYUFBMEIsRUFDekIsWUFBaUMsRUFDeEQsR0FBbUIsRUFDM0IsVUFBa0IsRUFDbEIsZUFBbUMsRUFDM0IsU0FBb0IsRUFDYixPQUFnQixFQUNoQixlQUFnQztRQUUzRCxLQUFLLENBQUMsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQVo5RCxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNyQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBRUYsa0JBQWEsR0FBYixhQUFhLENBQWE7UUFDekIsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ3hELFFBQUcsR0FBSCxHQUFHLENBQWdCO1FBSVosWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUF0UXRELGdCQUFXLEdBQVcsVUFBVSxDQUFDO1FBNktsQyxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBRXRCOzs7O1dBSUc7UUFDZ0IsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUU1RSxRQUFHLEdBQVcsZUFBZSxZQUFZLEVBQUUsRUFBRSxDQUFDO1FBRTlDOzs7V0FHRztRQUNILGlCQUFZLEdBQWtCLElBQUksQ0FBQztRQU1uQyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUtyQyxtQ0FBbUM7UUFDYixnQkFBVyxHQUE4QixZQUFZLENBQUM7UUFFNUUsbUZBQW1GO1FBQ2hFLFdBQU0sR0FBa0MsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFhdkYsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUkzQixjQUFTLEdBQVksS0FBSyxDQUFDO1FBRTNCLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBSzVCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFbkM7Ozs7V0FJRztRQUNLLDBCQUFxQixHQUFrQixJQUFJLENBQUM7UUFFcEQsZ0VBQWdFO1FBQ3hELGNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBbUh4QyxvQ0FBb0M7UUFDcEMsY0FBUyxHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUVyQixvQ0FBb0M7UUFDcEMsYUFBUSxHQUF5QixHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7UUErS2xDLGlCQUFZLEdBQUcsQ0FBQyxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDO1FBelFuRCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQztJQTNRRCx5RUFBeUU7SUFDekUsSUFBSSxtQkFBbUI7UUFDbkIsT0FBTyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELHFFQUFxRTtJQUNyRSxJQUFJLGVBQWU7UUFDZixPQUFPLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsb0VBQW9FO0lBQ3BFLElBQUksY0FBYztRQUNkLE9BQU8sS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxzRUFBc0U7SUFDdEUsSUFBSSxnQkFBZ0I7UUFDaEIsT0FBTyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELGtEQUFrRDtJQUNsRCxJQUFJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBRUQsSUFBSSxjQUFjO1FBQ2QsT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsa0VBQWtFO0lBQ2xFLElBQ0ksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsSUFDSSxXQUFXO1FBQ1gsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFJLFdBQVcsQ0FBQyxFQUFpQztRQUM3QyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUV2QixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDckIsMkRBQTJEO1lBQzNELElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQzlCO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQ0ksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxLQUFLLENBQUMsS0FBVTtRQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFJLEVBQUU7UUFDRixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUNJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU5QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUNJLFdBQVc7UUFDWCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQ3pFLENBQUM7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFhO1FBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELDRFQUE0RTtJQUM1RSxJQUFJLE9BQU87UUFDUCxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM1RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSSxLQUFLO1FBQ0wsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSSxnQkFBZ0I7UUFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN2QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFDSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDdkUsQ0FBQztJQUVELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFDSSxVQUFVO1FBQ1YsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLFVBQVUsQ0FBQyxLQUFjO1FBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFaEQsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDeEU7SUFDTCxDQUFDO0lBRUQsSUFDSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFhO1FBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFvR0Qsa0JBQWtCO1FBQ2QsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRTtZQUNqQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QjtRQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxlQUFlLENBQVEsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNsRCx1QkFBdUIsRUFBRTthQUN6Qix5QkFBeUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbEUsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNO2lCQUNWLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUMvQixTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUMzRTtRQUVELDZEQUE2RDtRQUM3RCxtREFBbUQ7UUFDbkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNO2FBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQy9CLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRXBCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFUCxzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO2FBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ2hELFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsZ0RBQWdEO2dCQUNoRCxpREFBaUQ7Z0JBQ2pELE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNuRTtZQUVELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUVqQix3Q0FBd0M7WUFDeEMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFFM0Isa0RBQWtEO1lBQ2xELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUV0Qiw4REFBOEQ7WUFDOUQsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7WUFFbkMsNERBQTREO1lBQzVELHlEQUF5RDtZQUN6RCxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksY0FBYyxDQUFRLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELFNBQVM7UUFDTCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEIsc0ZBQXNGO1lBQ3RGLHVGQUF1RjtZQUN2Riw2RkFBNkY7WUFDN0YsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRTdCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFRRCwyREFBMkQ7SUFDM0QsYUFBYSxDQUFDLFlBQThCOztRQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQztRQUU3Qiw2QkFBNkI7UUFDN0IsSUFBSSxJQUFJLENBQUMsU0FBUyxXQUFJLFlBQVksQ0FBQyxTQUFTLDBDQUFFLGFBQWEsQ0FBQSxFQUFFO1lBQ3pELFlBQVksQ0FBQyxTQUFTLENBQUMsYUFBYTtpQkFDL0IsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBUSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsU0FBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDM0Y7SUFDTCxDQUFDO0lBRUQsK0NBQStDO0lBQy9DLFVBQVUsQ0FBQyxLQUFVO1FBQ2pCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDMUM7SUFDTCxDQUFDO0lBRUQsK0NBQStDO0lBQy9DLGdCQUFnQixDQUFDLEVBQXdCO1FBQ3JDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCwrQ0FBK0M7SUFDL0MsaUJBQWlCLENBQUMsRUFBYztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsK0NBQStDO0lBQy9DLGdCQUFnQixDQUFDLFVBQW1CO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7T0FHRztJQUNILGdCQUFnQixDQUFDLEtBQWlCO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUs7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFFOUIsa0ZBQWtGO1FBQ2xGLGdFQUFnRTtRQUNoRSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDeEMsYUFBYTtTQUNoQjthQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzVCO2FBQU07WUFDSCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFFRCxnREFBZ0Q7SUFDaEQsVUFBVTtRQUNOLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxPQUFPLENBQUMsS0FBb0I7UUFDeEIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQXFCLENBQUM7UUFFM0Msc0VBQXNFO1FBQ3RFLHdDQUF3QztRQUN4QyxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3BDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMxQjthQUFNLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3RELHdDQUF3QztZQUN4QyxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFO2dCQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQ3JDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDM0Isd0NBQXdDO2FBQ3ZDO2lCQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxHQUFHLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFDcEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQzFCO2lCQUFNO2dCQUNILElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3BDO1lBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxLQUFVLEVBQUUsY0FBdUIsSUFBSTtRQUN2RCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBRTNDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjthQUFNO1lBQ0gsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztZQUU5RCw2RUFBNkU7WUFDN0Usc0VBQXNFO1lBQ3RFLElBQUksZ0JBQWdCLElBQUksV0FBVyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQ25EO1NBQ0o7SUFDTCxDQUFDO0lBRUQscUZBQXFGO0lBQ3JGLElBQUk7UUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDckM7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsZ0ZBQWdGO2dCQUNoRix3RkFBd0Y7Z0JBQ3hGLDRCQUE0QjtnQkFDNUIsd0VBQXdFO2dCQUN4RSxVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO3dCQUNmLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztxQkFDeEI7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDTjtpQkFBTTtnQkFDSCwyREFBMkQ7Z0JBQzNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN4QjtTQUNKO0lBQ0wsQ0FBQztJQUVELGdDQUFnQztJQUNoQyxhQUFhO1FBQ1QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7T0FFRztJQUNPLGNBQWM7UUFDcEIsd0RBQXdEO1FBQ3hELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFRDs7O09BR0c7SUFDTywyQkFBMkI7UUFDakMsSUFBSSxJQUFJLENBQUMscUJBQXFCLElBQUksSUFBSSxFQUFFO1lBQ3BDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2xCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMvRSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUM5QztpQkFBTTtnQkFDSCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDckI7U0FDSjtRQUVELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7SUFDdEMsQ0FBQztJQUlEOzs7OztPQUtHO0lBQ0ssWUFBWSxDQUFDLEtBQWE7UUFDOUIsT0FBTyxLQUFLLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNsRCxDQUFDO0lBRU8sWUFBWSxDQUFDLE9BQW9CO1FBQ3JDLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssT0FBTyxFQUFFO1lBQ3ZELE1BQU0sS0FBSyxHQUFHLE9BQTJCLENBQUM7WUFFMUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7U0FDdkI7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssV0FBVyxDQUFDLEtBQVUsRUFBRSxjQUF1QixJQUFJO1FBRXZELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUM1QyxPQUFPLEdBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwRSxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksZ0JBQWdCLEVBQUU7WUFDbEIsSUFBSSxXQUFXLEVBQUU7Z0JBQ2IsZ0JBQWdCLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzthQUMzQztpQkFBTTtnQkFDSCxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUM3QjtZQUVELElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDaEQ7UUFFRCxPQUFPLGdCQUFnQixDQUFDO0lBQzVCLENBQUM7SUFFTyxtQkFBbUI7UUFDdkIsNERBQTREO1FBQzVELHlEQUF5RDtRQUN6RCxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDL0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNyRixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQzVCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssY0FBYyxDQUFDLElBQVk7UUFDL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3RCLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtnQkFDZCxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDbEI7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7T0FHRztJQUNLLFVBQVU7UUFDZCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUU1QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUN0QixJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ25DO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQUVELGlEQUFpRDtJQUNqRCxvREFBb0Q7SUFDNUMsZ0JBQWdCLENBQUMsYUFBbUI7UUFDeEMsSUFBSSxXQUFXLEdBQVEsSUFBSSxDQUFDO1FBRTVCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDOUIsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdkQ7YUFBTTtZQUNILFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO1NBQ3JFO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVPLG9CQUFvQjtRQUN4QixNQUFNLFdBQVcsR0FBUSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTNELElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksZUFBZSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFTyxTQUFTO1FBQ2IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVPLGlCQUFpQjtRQUNyQixJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUMzQixJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztTQUNwQztRQUVELElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzFCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1NBQ25DO1FBRUQsSUFBSSxJQUFJLENBQUMsd0JBQXdCLEVBQUU7WUFDL0IsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUM7U0FDeEM7UUFFRCxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUM1QixJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztTQUNyQztJQUNMLENBQUM7SUFFRCw4REFBOEQ7SUFDdEQscUJBQXFCO1FBQ3pCLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDekUsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzVDO2lCQUFNO2dCQUNILElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM5QztZQUVELCtFQUErRTtZQUMvRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUU7d0JBQ3RELEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztxQkFDbEI7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUVELElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7YUFDM0I7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw4REFBOEQ7SUFDdEQsaUJBQWlCO1FBQ3JCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2pFLE1BQU0sUUFBUSxHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVoRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDOUM7WUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUMxRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLG1CQUFtQjtRQUN2QixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ25FLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDdEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXhELGtGQUFrRjtZQUNsRixrRkFBa0Y7WUFDbEYsaUJBQWlCO1lBQ2pCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFO2dCQUM3QyxJQUFJLENBQUMscUJBQXFCLEdBQUcsUUFBUSxDQUFDO2FBQ3pDO2lCQUFNLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3JELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNyQjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELCtEQUErRDtJQUN2RCxpQkFBaUIsQ0FBQyxLQUFZO1FBQ2xDLElBQUksY0FBYyxHQUFHLEtBQUssQ0FBQyxNQUE0QixDQUFDO1FBRXhELE9BQU8sY0FBYyxJQUFJLGNBQWMsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRTtZQUN2RSxJQUFJLGNBQWMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUFFLE9BQU8sSUFBSSxDQUFDO2FBQUU7WUFFakUsY0FBYyxHQUFHLGNBQWMsQ0FBQyxhQUFhLENBQUM7U0FDakQ7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsaURBQWlEO0lBQ3pDLGFBQWE7UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxnRUFBZ0U7SUFDeEQscUJBQXFCO1FBQ3pCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ3RCLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQzs7O1lBN3dCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixzT0FBb0M7Z0JBRXBDLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsYUFBYTtvQkFDcEIscUJBQXFCLEVBQUUsVUFBVTtvQkFDakMsb0JBQW9CLEVBQUUsWUFBWTtvQkFFbEMsaUJBQWlCLEVBQUUsNEJBQTRCO29CQUMvQyxNQUFNLEVBQUUsS0FBSztvQkFFYixTQUFTLEVBQUUsU0FBUztvQkFDcEIsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLFdBQVcsRUFBRSxpQkFBaUI7aUJBQ2pDO2dCQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxDQUFDOzthQUN2RTs7OztZQW5GRyxVQUFVO1lBTFYsaUJBQWlCO1lBZ0NqQixpQkFBaUI7d0NBMlRaLFFBQVEsWUFBSSxNQUFNLFNBQUMsYUFBYTs0Q0FDaEMsUUFBUSxZQUFJLE1BQU0sU0FBQyxhQUFhO1lBbFdoQyxjQUFjLHVCQW1XZCxRQUFRO1lBdFViLE1BQU0sdUJBdVVELFFBQVE7WUExVWIsa0JBQWtCLHVCQTJVYixRQUFRO1lBelViLFNBQVMsdUJBMFVKLFFBQVEsWUFBSSxJQUFJO1lBeFVyQixPQUFPLHVCQXlVRixRQUFRLFlBQUksSUFBSTtZQTlVckIsZUFBZSx1QkErVVYsUUFBUSxZQUFJLElBQUk7Ozt1QkF0T3BCLEtBQUs7MEJBY0wsS0FBSztvQkFrQkwsS0FBSzt1QkFzQkwsS0FBSzswQkFlTCxLQUFLO3VCQW1DTCxLQUFLO3lCQWNMLEtBQUs7dUJBYUwsS0FBSzswQkFpQkwsTUFBTTtnQ0FpQk4sS0FBSzswQkFHTCxLQUFLLFNBQUMsYUFBYTtxQkFHbkIsTUFBTTtzQkFFTixZQUFZLFNBQUMsa0JBQWtCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO21CQUdqRCxlQUFlLFNBQUMsS0FBSyxFQUFFO29CQUNwQixtQ0FBbUM7b0JBQ25DLHVFQUF1RTtvQkFDdkUsV0FBVyxFQUFFLElBQUk7aUJBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIERvQ2hlY2ssXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBTZWxmLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgICBGb3JtQ29udHJvbE5hbWUsXG4gICAgRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgIE5HX1ZBTElEQVRPUlMsXG4gICAgTmdDb250cm9sLFxuICAgIE5nRm9ybSxcbiAgICBOZ01vZGVsLFxuICAgIFZhbGlkYXRvclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb2N1c0tleU1hbmFnZXIgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvYTExeSc7XG5pbXBvcnQgeyBCQUNLU1BBQ0UsIEVORCwgSE9NRSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICAgIENhblVwZGF0ZUVycm9yU3RhdGUsXG4gICAgQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IsXG4gICAgRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgTUNfVkFMSURBVElPTixcbiAgICBNY1ZhbGlkYXRpb25PcHRpb25zLFxuICAgIG1peGluRXJyb3JTdGF0ZSxcbiAgICBzZXRNb3NhaWNWYWxpZGF0aW9uXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IE1jQ2xlYW5lciwgTWNGb3JtRmllbGRDb250cm9sIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgbWVyZ2UsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1jVGFnVGV4dENvbnRyb2wgfSBmcm9tICcuL3RhZy10ZXh0LWNvbnRyb2wnO1xuaW1wb3J0IHsgTWNUYWcsIE1jVGFnRXZlbnQsIE1jVGFnU2VsZWN0aW9uQ2hhbmdlIH0gZnJvbSAnLi90YWcuY29tcG9uZW50JztcblxuXG5leHBvcnQgY2xhc3MgTWNUYWdMaXN0QmFzZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICAgICAgICBwdWJsaWMgcGFyZW50Rm9ybTogTmdGb3JtLFxuICAgICAgICBwdWJsaWMgcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgICAgIHB1YmxpYyBuZ0NvbnRyb2w6IE5nQ29udHJvbFxuICAgICkge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNUYWdMaXN0TWl4aW5CYXNlOiBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvciAmIHR5cGVvZiBNY1RhZ0xpc3RCYXNlID0gbWl4aW5FcnJvclN0YXRlKE1jVGFnTGlzdEJhc2UpO1xuXG5cbi8vIEluY3JlYXNpbmcgaW50ZWdlciBmb3IgZ2VuZXJhdGluZyB1bmlxdWUgaWRzIGZvciB0YWctbGlzdCBjb21wb25lbnRzLlxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKiBDaGFuZ2UgZXZlbnQgb2JqZWN0IHRoYXQgaXMgZW1pdHRlZCB3aGVuIHRoZSB0YWcgbGlzdCB2YWx1ZSBoYXMgY2hhbmdlZC4gKi9cbmV4cG9ydCBjbGFzcyBNY1RhZ0xpc3RDaGFuZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2U6IE1jVGFnTGlzdCwgcHVibGljIHZhbHVlOiBhbnkpIHt9XG59XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy10YWctbGlzdCcsXG4gICAgZXhwb3J0QXM6ICdtY1RhZ0xpc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAndGFnLWxpc3QucGFydGlhbC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsndGFnLWxpc3Quc2NzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy10YWctbGlzdCcsXG4gICAgICAgICdbY2xhc3MubWMtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1pbnZhbGlkXSc6ICdlcnJvclN0YXRlJyxcblxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ2Rpc2FibGVkID8gbnVsbCA6IHRhYkluZGV4JyxcbiAgICAgICAgJ1tpZF0nOiAndWlkJyxcblxuICAgICAgICAnKGZvY3VzKSc6ICdmb2N1cygpJyxcbiAgICAgICAgJyhibHVyKSc6ICdibHVyKCknLFxuICAgICAgICAnKGtleWRvd24pJzogJ2tleWRvd24oJGV2ZW50KSdcbiAgICB9LFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBNY0Zvcm1GaWVsZENvbnRyb2wsIHVzZUV4aXN0aW5nOiBNY1RhZ0xpc3QgfV1cbn0pXG5leHBvcnQgY2xhc3MgTWNUYWdMaXN0IGV4dGVuZHMgTWNUYWdMaXN0TWl4aW5CYXNlIGltcGxlbWVudHMgTWNGb3JtRmllbGRDb250cm9sPGFueT4sXG4gICAgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyQ29udGVudEluaXQsIERvQ2hlY2ssIE9uSW5pdCwgT25EZXN0cm95LCBDYW5VcGRhdGVFcnJvclN0YXRlIHtcblxuICAgIHJlYWRvbmx5IGNvbnRyb2xUeXBlOiBzdHJpbmcgPSAndGFnLWxpc3QnO1xuXG4gICAgLyoqIENvbWJpbmVkIHN0cmVhbSBvZiBhbGwgb2YgdGhlIGNoaWxkIHRhZ3MnIHNlbGVjdGlvbiBjaGFuZ2UgZXZlbnRzLiAqL1xuICAgIGdldCB0YWdTZWxlY3Rpb25DaGFuZ2VzKCk6IE9ic2VydmFibGU8TWNUYWdTZWxlY3Rpb25DaGFuZ2U+IHtcbiAgICAgICAgcmV0dXJuIG1lcmdlKC4uLnRoaXMudGFncy5tYXAoKHRhZykgPT4gdGFnLnNlbGVjdGlvbkNoYW5nZSkpO1xuICAgIH1cblxuICAgIC8qKiBDb21iaW5lZCBzdHJlYW0gb2YgYWxsIG9mIHRoZSBjaGlsZCB0YWdzJyBmb2N1cyBjaGFuZ2UgZXZlbnRzLiAqL1xuICAgIGdldCB0YWdGb2N1c0NoYW5nZXMoKTogT2JzZXJ2YWJsZTxNY1RhZ0V2ZW50PiB7XG4gICAgICAgIHJldHVybiBtZXJnZSguLi50aGlzLnRhZ3MubWFwKCh0YWcpID0+IHRhZy5vbkZvY3VzKSk7XG4gICAgfVxuXG4gICAgLyoqIENvbWJpbmVkIHN0cmVhbSBvZiBhbGwgb2YgdGhlIGNoaWxkIHRhZ3MnIGJsdXIgY2hhbmdlIGV2ZW50cy4gKi9cbiAgICBnZXQgdGFnQmx1ckNoYW5nZXMoKTogT2JzZXJ2YWJsZTxNY1RhZ0V2ZW50PiB7XG4gICAgICAgIHJldHVybiBtZXJnZSguLi50aGlzLnRhZ3MubWFwKCh0YWcpID0+IHRhZy5vbkJsdXIpKTtcbiAgICB9XG5cbiAgICAvKiogQ29tYmluZWQgc3RyZWFtIG9mIGFsbCBvZiB0aGUgY2hpbGQgdGFncycgcmVtb3ZlIGNoYW5nZSBldmVudHMuICovXG4gICAgZ2V0IHRhZ1JlbW92ZUNoYW5nZXMoKTogT2JzZXJ2YWJsZTxNY1RhZ0V2ZW50PiB7XG4gICAgICAgIHJldHVybiBtZXJnZSguLi50aGlzLnRhZ3MubWFwKCh0YWcpID0+IHRhZy5kZXN0cm95ZWQpKTtcbiAgICB9XG5cbiAgICAvKiogVGhlIGFycmF5IG9mIHNlbGVjdGVkIHRhZ3MgaW5zaWRlIHRhZyBsaXN0LiAqL1xuICAgIGdldCBzZWxlY3RlZCgpOiBNY1RhZ1tdIHwgTWNUYWcge1xuICAgICAgICByZXR1cm4gdGhpcy5tdWx0aXBsZSA/IHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWQgOiB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdGVkWzBdO1xuICAgIH1cblxuICAgIGdldCBjYW5TaG93Q2xlYW5lcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xlYW5lciAmJiB0aGlzLnRhZ3MubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgdXNlciBzaG91bGQgYmUgYWxsb3dlZCB0byBzZWxlY3QgbXVsdGlwbGUgdGFncy4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBtdWx0aXBsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX211bHRpcGxlO1xuICAgIH1cblxuICAgIHNldCBtdWx0aXBsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9tdWx0aXBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBmdW5jdGlvbiB0byBjb21wYXJlIHRoZSBvcHRpb24gdmFsdWVzIHdpdGggdGhlIHNlbGVjdGVkIHZhbHVlcy4gVGhlIGZpcnN0IGFyZ3VtZW50XG4gICAgICogaXMgYSB2YWx1ZSBmcm9tIGFuIG9wdGlvbi4gVGhlIHNlY29uZCBpcyBhIHZhbHVlIGZyb20gdGhlIHNlbGVjdGlvbi4gQSBib29sZWFuXG4gICAgICogc2hvdWxkIGJlIHJldHVybmVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGNvbXBhcmVXaXRoKCk6IChvMTogYW55LCBvMjogYW55KSA9PiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBhcmVXaXRoO1xuICAgIH1cblxuICAgIHNldCBjb21wYXJlV2l0aChmbjogKG8xOiBhbnksIG8yOiBhbnkpID0+IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fY29tcGFyZVdpdGggPSBmbjtcblxuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlbCkge1xuICAgICAgICAgICAgLy8gQSBkaWZmZXJlbnQgY29tcGFyYXRvciBtZWFucyB0aGUgc2VsZWN0aW9uIGNvdWxkIGNoYW5nZS5cbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNlbGVjdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLndyaXRlVmFsdWUodmFsdWUpO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFnSW5wdXQgPyB0aGlzLnRhZ0lucHV0LmlkIDogdGhpcy51aWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7XG4gICAgfVxuXG4gICAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnRhZ0lucHV0ID8gdGhpcy50YWdJbnB1dC5wbGFjZWhvbGRlciA6IHRoaXMuX3BsYWNlaG9sZGVyO1xuICAgIH1cblxuICAgIHNldCBwbGFjZWhvbGRlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciBhbnkgdGFncyBvciB0aGUgbWNUYWdJbnB1dCBpbnNpZGUgb2YgdGhpcyB0YWctbGlzdCBoYXMgZm9jdXMuICovXG4gICAgZ2V0IGZvY3VzZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAodGhpcy50YWdJbnB1dCAmJiB0aGlzLnRhZ0lucHV0LmZvY3VzZWQpIHx8IHRoaXMuaGFzRm9jdXNlZFRhZygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBnZXQgZW1wdHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoIXRoaXMudGFnSW5wdXQgfHwgdGhpcy50YWdJbnB1dC5lbXB0eSkgJiYgdGhpcy50YWdzLmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgZ2V0IHNob3VsZExhYmVsRmxvYXQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5lbXB0eSB8fCB0aGlzLmZvY3VzZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5uZ0NvbnRyb2wgPyAhIXRoaXMubmdDb250cm9sLmRpc2FibGVkIDogdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICAgICAgdGhpcy5zeW5jVGFnc0Rpc2FibGVkU3RhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIG9yIG5vdCB0aGlzIHRhZyBsaXN0IGlzIHNlbGVjdGFibGUuIFdoZW4gYSB0YWcgbGlzdCBpcyBub3Qgc2VsZWN0YWJsZSxcbiAgICAgKiB0aGUgc2VsZWN0ZWQgc3RhdGVzIGZvciBhbGwgdGhlIHRhZ3MgaW5zaWRlIHRoZSB0YWcgbGlzdCBhcmUgYWx3YXlzIGlnbm9yZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgc2VsZWN0YWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGFibGU7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGFibGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0YWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMudGFncykge1xuICAgICAgICAgICAgdGhpcy50YWdzLmZvckVhY2goKHRhZykgPT4gdGFnLnRhZ0xpc3RTZWxlY3RhYmxlID0gdGhpcy5fc2VsZWN0YWJsZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCB0YWJJbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGFiSW5kZXg7XG4gICAgfVxuXG4gICAgc2V0IHRhYkluZGV4KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy51c2VyVGFiSW5kZXggPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fdGFiSW5kZXggPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF90YWJJbmRleCA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSByYXcgdmFsdWUgb2YgdGhlIHRhZy1saXN0IGNoYW5nZXMuIFRoaXMgaXMgaGVyZSBwcmltYXJpbHlcbiAgICAgKiB0byBmYWNpbGl0YXRlIHRoZSB0d28td2F5IGJpbmRpbmcgZm9yIHRoZSBgdmFsdWVgIGlucHV0LlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICB1aWQ6IHN0cmluZyA9IGBtYy10YWctbGlzdC0ke25leHRVbmlxdWVJZCsrfWA7XG5cbiAgICAvKipcbiAgICAgKiBVc2VyIGRlZmluZWQgdGFiIGluZGV4LlxuICAgICAqIFdoZW4gaXQgaXMgbm90IG51bGwsIHVzZSB1c2VyIGRlZmluZWQgdGFiIGluZGV4LiBPdGhlcndpc2UgdXNlIHRhYkluZGV4XG4gICAgICovXG4gICAgdXNlclRhYkluZGV4OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAgIGtleU1hbmFnZXI6IEZvY3VzS2V5TWFuYWdlcjxNY1RhZz47XG5cbiAgICBzZWxlY3Rpb25Nb2RlbDogU2VsZWN0aW9uTW9kZWw8TWNUYWc+O1xuXG4gICAgdGFnQ2hhbmdlcyA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgLyoqIEFuIG9iamVjdCB1c2VkIHRvIGNvbnRyb2wgd2hlbiBlcnJvciBtZXNzYWdlcyBhcmUgc2hvd24uICovXG4gICAgQElucHV0KCkgZXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyO1xuXG4gICAgLyoqIE9yaWVudGF0aW9uIG9mIHRoZSB0YWcgbGlzdC4gKi9cbiAgICBASW5wdXQoJ29yaWVudGF0aW9uJykgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSAnaG9yaXpvbnRhbCc7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3RlZCB0YWcgbGlzdCB2YWx1ZSBoYXMgYmVlbiBjaGFuZ2VkIGJ5IHRoZSB1c2VyLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxNY1RhZ0xpc3RDaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxNY1RhZ0xpc3RDaGFuZ2U+KCk7XG5cbiAgICBAQ29udGVudENoaWxkKCdtY1RhZ0xpc3RDbGVhbmVyJywgeyBzdGF0aWM6IHRydWUgfSkgY2xlYW5lcjogTWNDbGVhbmVyO1xuXG4gICAgLyoqIFRoZSB0YWcgY29tcG9uZW50cyBjb250YWluZWQgd2l0aGluIHRoaXMgdGFnIGxpc3QuICovXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY1RhZywge1xuICAgICAgICAvLyBOZWVkIHRvIHVzZSBgZGVzY2VuZGFudHM6IHRydWVgLFxuICAgICAgICAvLyBJdnkgd2lsbCBubyBsb25nZXIgbWF0Y2ggaW5kaXJlY3QgZGVzY2VuZGFudHMgaWYgaXQncyBsZWZ0IGFzIGZhbHNlLlxuICAgICAgICBkZXNjZW5kYW50czogdHJ1ZVxuICAgIH0pIHRhZ3M6IFF1ZXJ5TGlzdDxNY1RhZz47XG5cbiAgICBwcml2YXRlIF92YWx1ZTogYW55O1xuXG4gICAgcHJpdmF0ZSBfcmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX3BsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBfc2VsZWN0YWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogVGhlIHRhZyBpbnB1dCB0byBhZGQgbW9yZSB0YWdzICovXG4gICAgcHJpdmF0ZSB0YWdJbnB1dDogTWNUYWdUZXh0Q29udHJvbDtcblxuICAgIHByaXZhdGUgX211bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGEgdGFnIGlzIGRlc3Ryb3llZCwgd2Ugc3RvcmUgdGhlIGluZGV4IG9mIHRoZSBkZXN0cm95ZWQgdGFnIHVudGlsIHRoZSB0YWdzXG4gICAgICogcXVlcnkgbGlzdCBub3RpZmllcyBhYm91dCB0aGUgdXBkYXRlLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHdlIGNhbm5vdCBkZXRlcm1pbmUgYW5cbiAgICAgKiBhcHByb3ByaWF0ZSB0YWcgdGhhdCBzaG91bGQgcmVjZWl2ZSBmb2N1cyB1bnRpbCB0aGUgYXJyYXkgb2YgdGFncyB1cGRhdGVkIGNvbXBsZXRlbHkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBsYXN0RGVzdHJveWVkVGFnSW5kZXg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gICAgLyoqIFN1YmplY3QgdGhhdCBlbWl0cyB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gZGVzdHJveWVkLiAqL1xuICAgIHByaXZhdGUgZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKiBTdWJzY3JpcHRpb24gdG8gZm9jdXMgY2hhbmdlcyBpbiB0aGUgdGFncy4gKi9cbiAgICBwcml2YXRlIHRhZ0ZvY3VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsO1xuXG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byBibHVyIGNoYW5nZXMgaW4gdGhlIHRhZ3MuICovXG4gICAgcHJpdmF0ZSB0YWdCbHVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsO1xuXG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byBzZWxlY3Rpb24gY2hhbmdlcyBpbiB0YWdzLiAqL1xuICAgIHByaXZhdGUgdGFnU2VsZWN0aW9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsO1xuXG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byByZW1vdmUgY2hhbmdlcyBpbiB0YWdzLiAqL1xuICAgIHByaXZhdGUgdGFnUmVtb3ZlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTkdfVkFMSURBVE9SUykgcHVibGljIHJhd1ZhbGlkYXRvcnM6IFZhbGlkYXRvcltdLFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1DX1ZBTElEQVRJT04pIHByaXZhdGUgbWNWYWxpZGF0aW9uOiBNY1ZhbGlkYXRpb25PcHRpb25zLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgIEBPcHRpb25hbCgpIHBhcmVudEZvcm06IE5nRm9ybSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIG5nTW9kZWw6IE5nTW9kZWwsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIGZvcm1Db250cm9sTmFtZTogRm9ybUNvbnRyb2xOYW1lXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlciwgcGFyZW50Rm9ybSwgcGFyZW50Rm9ybUdyb3VwLCBuZ0NvbnRyb2wpO1xuXG4gICAgICAgIGlmICh0aGlzLm5nQ29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5uZ0NvbnRyb2wudmFsdWVBY2Nlc3NvciA9IHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLm1jVmFsaWRhdGlvbi51c2VWYWxpZGF0aW9uKSB7XG4gICAgICAgICAgICBzZXRNb3NhaWNWYWxpZGF0aW9uKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyID0gbmV3IEZvY3VzS2V5TWFuYWdlcjxNY1RhZz4odGhpcy50YWdzKVxuICAgICAgICAgICAgLndpdGhWZXJ0aWNhbE9yaWVudGF0aW9uKClcbiAgICAgICAgICAgIC53aXRoSG9yaXpvbnRhbE9yaWVudGF0aW9uKHRoaXMuZGlyID8gdGhpcy5kaXIudmFsdWUgOiAnbHRyJyk7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlyKSB7XG4gICAgICAgICAgICB0aGlzLmRpci5jaGFuZ2VcbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKGRpcikgPT4gdGhpcy5rZXlNYW5hZ2VyLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24oZGlyKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQcmV2ZW50cyB0aGUgdGFnIGxpc3QgZnJvbSBjYXB0dXJpbmcgZm9jdXMgYW5kIHJlZGlyZWN0aW5nXG4gICAgICAgIC8vIGl0IGJhY2sgdG8gdGhlIGZpcnN0IHRhZyB3aGVuIHRoZSB1c2VyIHRhYnMgb3V0LlxuICAgICAgICB0aGlzLmtleU1hbmFnZXIudGFiT3V0XG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGFiSW5kZXggPSAtMTtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90YWJJbmRleCA9IHRoaXMudXNlclRhYkluZGV4IHx8IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBXaGVuIHRoZSBsaXN0IGNoYW5nZXMsIHJlLXN1YnNjcmliZVxuICAgICAgICB0aGlzLnRhZ3MuY2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoc3RhcnRXaXRoKG51bGwpLCB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2luY2UgdGhpcyBoYXBwZW5zIGFmdGVyIHRoZSBjb250ZW50IGhhcyBiZWVuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrZWQsIHdlIG5lZWQgdG8gZGVmZXIgaXQgdG8gdGhlIG5leHQgdGljay5cbiAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7IHRoaXMuc3luY1RhZ3NEaXNhYmxlZFN0YXRlKCk7IH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRUYWdzKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZXNldCB0YWdzIHNlbGVjdGVkL2Rlc2VsZWN0ZWQgc3RhdHVzXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplU2VsZWN0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgd2UgbmVlZCB0byB1cGRhdGUgb3VyIHRhYiBpbmRleFxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGFiSW5kZXgoKTtcblxuICAgICAgICAgICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB3ZSBoYXZlIGEgZGVzdHJveWVkIHRhZyBhbmQgbmVlZCB0byByZWZvY3VzXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVGb2N1c0ZvckRlc3Ryb3llZFRhZ3MoKTtcblxuICAgICAgICAgICAgICAgIC8vIERlZmVyIHNldHRpbmcgdGhlIHZhbHVlIGluIG9yZGVyIHRvIGF2b2lkIHRoZSBcIkV4cHJlc3Npb25cbiAgICAgICAgICAgICAgICAvLyBoYXMgY2hhbmdlZCBhZnRlciBpdCB3YXMgY2hlY2tlZFwiIGVycm9ycyBmcm9tIEFuZ3VsYXIuXG4gICAgICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFnQ2hhbmdlcy5lbWl0KHRoaXMudGFncy50b0FycmF5KCkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlVGFnc0NoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsPE1jVGFnPih0aGlzLm11bHRpcGxlLCB1bmRlZmluZWQsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgaWYgKHRoaXMubmdDb250cm9sKSB7XG4gICAgICAgICAgICAvLyBXZSBuZWVkIHRvIHJlLWV2YWx1YXRlIHRoaXMgb24gZXZlcnkgY2hhbmdlIGRldGVjdGlvbiBjeWNsZSwgYmVjYXVzZSB0aGVyZSBhcmUgc29tZVxuICAgICAgICAgICAgLy8gZXJyb3IgdHJpZ2dlcnMgdGhhdCB3ZSBjYW4ndCBzdWJzY3JpYmUgdG8gKGUuZy4gcGFyZW50IGZvcm0gc3VibWlzc2lvbnMpLiBUaGlzIG1lYW5zXG4gICAgICAgICAgICAvLyB0aGF0IHdoYXRldmVyIGxvZ2ljIGlzIGluIGhlcmUgaGFzIHRvIGJlIHN1cGVyIGxlYW4gb3Igd2UgcmlzayBkZXN0cm95aW5nIHRoZSBwZXJmb3JtYW5jZS5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlRXJyb3JTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkLm5leHQoKTtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMuY29tcGxldGUoKTtcblxuICAgICAgICB0aGlzLmRyb3BTdWJzY3JpcHRpb25zKCk7XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5XG4gICAgb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcbiAgICBvbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAgIC8qKiBBc3NvY2lhdGVzIGFuIEhUTUwgaW5wdXQgZWxlbWVudCB3aXRoIHRoaXMgdGFnIGxpc3QuICovXG4gICAgcmVnaXN0ZXJJbnB1dChpbnB1dEVsZW1lbnQ6IE1jVGFnVGV4dENvbnRyb2wpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YWdJbnB1dCA9IGlucHV0RWxlbWVudDtcblxuICAgICAgICAvLyB0b2RvIG5lZWQgcmV0aGluayBhYm91dCBpdFxuICAgICAgICBpZiAodGhpcy5uZ0NvbnRyb2wgJiYgaW5wdXRFbGVtZW50Lm5nQ29udHJvbD8uc3RhdHVzQ2hhbmdlcykge1xuICAgICAgICAgICAgaW5wdXRFbGVtZW50Lm5nQ29udHJvbC5zdGF0dXNDaGFuZ2VzXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLm5nQ29udHJvbC5jb250cm9sIS5zZXRFcnJvcnMoaW5wdXRFbGVtZW50Lm5nQ29udHJvbCEuZXJyb3JzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50YWdzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvbkJ5VmFsdWUodmFsdWUsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBvbkNvbnRhaW5lckNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5vcmlnaW5hdGVzRnJvbVRhZyhldmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvY3VzZXMgdGhlIGZpcnN0IG5vbi1kaXNhYmxlZCB0YWcgaW4gdGhpcyB0YWcgbGlzdCwgb3IgdGhlIGFzc29jaWF0ZWQgaW5wdXQgd2hlbiB0aGVyZVxuICAgICAqIGFyZSBubyBlbGlnaWJsZSB0YWdzLlxuICAgICAqL1xuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICAvLyBUT0RPOiBBUklBIHNheXMgdGhpcyBzaG91bGQgZm9jdXMgdGhlIGZpcnN0IGBzZWxlY3RlZGAgdGFnIGlmIGFueSBhcmUgc2VsZWN0ZWQuXG4gICAgICAgIC8vIEZvY3VzIG9uIGZpcnN0IGVsZW1lbnQgaWYgdGhlcmUncyBubyB0YWdJbnB1dCBpbnNpZGUgdGFnLWxpc3RcbiAgICAgICAgaWYgKHRoaXMudGFnSW5wdXQgJiYgdGhpcy50YWdJbnB1dC5mb2N1c2VkKSB7XG4gICAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50YWdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNJbnB1dCgpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEF0dGVtcHQgdG8gZm9jdXMgYW4gaW5wdXQgaWYgd2UgaGF2ZSBvbmUuICovXG4gICAgZm9jdXNJbnB1dCgpIHtcbiAgICAgICAgaWYgKHRoaXMudGFnSW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMudGFnSW5wdXQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhc3MgZXZlbnRzIHRvIHRoZSBrZXlib2FyZCBtYW5hZ2VyLiBBdmFpbGFibGUgaGVyZSBmb3IgdGVzdHMuXG4gICAgICovXG4gICAga2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgLy8gSWYgdGhleSBhcmUgb24gYW4gZW1wdHkgaW5wdXQgYW5kIGhpdCBiYWNrc3BhY2UsIGZvY3VzIHRoZSBsYXN0IHRhZ1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBCQUNLU1BBQ0UgJiYgdGhpcy5pc0lucHV0RW1wdHkodGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldExhc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCAmJiB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtYy10YWcnKSkge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEhPTUUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gRU5EKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldExhc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFNlbGVjdGlvbkJ5VmFsdWUodmFsdWU6IGFueSwgaXNVc2VySW5wdXQ6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy50YWdzLmZvckVhY2goKHRhZykgPT4gdGFnLmRlc2VsZWN0KCkpO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUuZm9yRWFjaCgoY3VycmVudFZhbHVlKSA9PiB0aGlzLnNlbGVjdFZhbHVlKGN1cnJlbnRWYWx1ZSwgaXNVc2VySW5wdXQpKTtcbiAgICAgICAgICAgIHRoaXMuc29ydFZhbHVlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgY29ycmVzcG9uZGluZ1RhZyA9IHRoaXMuc2VsZWN0VmFsdWUodmFsdWUsIGlzVXNlcklucHV0KTtcblxuICAgICAgICAgICAgLy8gU2hpZnQgZm9jdXMgdG8gdGhlIGFjdGl2ZSBpdGVtLiBOb3RlIHRoYXQgd2Ugc2hvdWxkbid0IGRvIHRoaXMgaW4gbXVsdGlwbGVcbiAgICAgICAgICAgIC8vIG1vZGUsIGJlY2F1c2Ugd2UgZG9uJ3Qga25vdyB3aGF0IHRhZyB0aGUgdXNlciBpbnRlcmFjdGVkIHdpdGggbGFzdC5cbiAgICAgICAgICAgIGlmIChjb3JyZXNwb25kaW5nVGFnICYmIGlzVXNlcklucHV0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oY29ycmVzcG9uZGluZ1RhZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogV2hlbiBibHVycmVkLCBtYXJrIHRoZSBmaWVsZCBhcyB0b3VjaGVkIHdoZW4gZm9jdXMgbW92ZWQgb3V0c2lkZSB0aGUgdGFnIGxpc3QuICovXG4gICAgYmx1cigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0ZvY3VzZWRUYWcoKSkge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oLTEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50YWdJbnB1dCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlJ3MgYSB0YWcgaW5wdXQsIHdlIHNob3VsZCBjaGVjayB3aGV0aGVyIHRoZSBmb2N1cyBtb3ZlZCB0byB0YWcgaW5wdXQuXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGZvY3VzIGlzIG5vdCBtb3ZlZCB0byB0YWcgaW5wdXQsIG1hcmsgdGhlIGZpZWxkIGFzIHRvdWNoZWQuIElmIHRoZSBmb2N1cyBtb3ZlZFxuICAgICAgICAgICAgICAgIC8vIHRvIHRhZyBpbnB1dCwgZG8gbm90aGluZy5cbiAgICAgICAgICAgICAgICAvLyBUaW1lb3V0IGlzIG5lZWRlZCB0byB3YWl0IGZvciB0aGUgZm9jdXMoKSBldmVudCB0cmlnZ2VyIG9uIHRhZyBpbnB1dC5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFya0FzVG91Y2hlZCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlJ3Mgbm8gdGFnIGlucHV0LCB0aGVuIG1hcmsgdGhlIGZpZWxkIGFzIHRvdWNoZWQuXG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrQXNUb3VjaGVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogTWFyayB0aGUgZmllbGQgYXMgdG91Y2hlZCAqL1xuICAgIG1hcmtBc1RvdWNoZWQoKSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayB0aGUgdGFiIGluZGV4IGFzIHlvdSBzaG91bGQgbm90IGJlIGFsbG93ZWQgdG8gZm9jdXMgYW4gZW1wdHkgbGlzdC5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgdXBkYXRlVGFiSW5kZXgoKTogdm9pZCB7XG4gICAgICAgIC8vIElmIHdlIGhhdmUgMCB0YWdzLCB3ZSBzaG91bGQgbm90IGFsbG93IGtleWJvYXJkIGZvY3VzXG4gICAgICAgIHRoaXMuX3RhYkluZGV4ID0gdGhpcy51c2VyVGFiSW5kZXggfHwgKHRoaXMudGFncy5sZW5ndGggPT09IDAgPyAtMSA6IDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElmIHRoZSBhbW91bnQgb2YgdGFncyBjaGFuZ2VkLCB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGVcbiAgICAgKiBrZXkgbWFuYWdlciBzdGF0ZSBhbmQgZm9jdXMgdGhlIG5leHQgY2xvc2VzdCB0YWcuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHVwZGF0ZUZvY3VzRm9yRGVzdHJveWVkVGFncygpIHtcbiAgICAgICAgaWYgKHRoaXMubGFzdERlc3Ryb3llZFRhZ0luZGV4ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRhZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VGFnSW5kZXggPSBNYXRoLm1pbih0aGlzLmxhc3REZXN0cm95ZWRUYWdJbmRleCwgdGhpcy50YWdzLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKG5ld1RhZ0luZGV4KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c0lucHV0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxhc3REZXN0cm95ZWRUYWdJbmRleCA9IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY29tcGFyZVdpdGggPSAobzE6IGFueSwgbzI6IGFueSkgPT4gbzEgPT09IG8yO1xuXG4gICAgLyoqXG4gICAgICogVXRpbGl0eSB0byBlbnN1cmUgYWxsIGluZGV4ZXMgYXJlIHZhbGlkLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCB0byBiZSBjaGVja2VkLlxuICAgICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGluZGV4IGlzIHZhbGlkIGZvciBvdXIgbGlzdCBvZiB0YWdzLlxuICAgICAqL1xuICAgIHByaXZhdGUgaXNWYWxpZEluZGV4KGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLnRhZ3MubGVuZ3RoO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNJbnB1dEVtcHR5KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2lucHV0Jykge1xuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBlbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICAgICAgICAgIHJldHVybiAhaW5wdXQudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZHMgYW5kIHNlbGVjdHMgdGhlIHRhZyBiYXNlZCBvbiBpdHMgdmFsdWUuXG4gICAgICogQHJldHVybnMgVGFnIHRoYXQgaGFzIHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlLlxuICAgICAqL1xuICAgIHByaXZhdGUgc2VsZWN0VmFsdWUodmFsdWU6IGFueSwgaXNVc2VySW5wdXQ6IGJvb2xlYW4gPSB0cnVlKTogTWNUYWcgfCB1bmRlZmluZWQge1xuXG4gICAgICAgIGNvbnN0IGNvcnJlc3BvbmRpbmdUYWcgPSB0aGlzLnRhZ3MuZmluZCgodGFnKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGFnLnZhbHVlICE9IG51bGwgJiYgdGhpcy5fY29tcGFyZVdpdGgodGFnLnZhbHVlLCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChjb3JyZXNwb25kaW5nVGFnKSB7XG4gICAgICAgICAgICBpZiAoaXNVc2VySW5wdXQpIHtcbiAgICAgICAgICAgICAgICBjb3JyZXNwb25kaW5nVGFnLnNlbGVjdFZpYUludGVyYWN0aW9uKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvcnJlc3BvbmRpbmdUYWcuc2VsZWN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0KGNvcnJlc3BvbmRpbmdUYWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvcnJlc3BvbmRpbmdUYWc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgICAgICAvLyBEZWZlciBzZXR0aW5nIHRoZSB2YWx1ZSBpbiBvcmRlciB0byBhdm9pZCB0aGUgXCJFeHByZXNzaW9uXG4gICAgICAgIC8vIGhhcyBjaGFuZ2VkIGFmdGVyIGl0IHdhcyBjaGVja2VkXCIgZXJyb3JzIGZyb20gQW5ndWxhci5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5uZ0NvbnRyb2wgfHwgdGhpcy5fdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvbkJ5VmFsdWUodGhpcy5uZ0NvbnRyb2wgPyB0aGlzLm5nQ29udHJvbC52YWx1ZSA6IHRoaXMuX3ZhbHVlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXNlbGVjdHMgZXZlcnkgdGFnIGluIHRoZSBsaXN0LlxuICAgICAqIEBwYXJhbSBza2lwIFRhZyB0aGF0IHNob3VsZCBub3QgYmUgZGVzZWxlY3RlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNsZWFyU2VsZWN0aW9uKHNraXA/OiBNY1RhZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgICAgIHRoaXMudGFncy5mb3JFYWNoKCh0YWcpID0+IHtcbiAgICAgICAgICAgIGlmICh0YWcgIT09IHNraXApIHtcbiAgICAgICAgICAgICAgICB0YWcuZGVzZWxlY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTb3J0cyB0aGUgbW9kZWwgdmFsdWVzLCBlbnN1cmluZyB0aGF0IHRoZXkga2VlcCB0aGUgc2FtZVxuICAgICAqIG9yZGVyIHRoYXQgdGhleSBoYXZlIGluIHRoZSBwYW5lbC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNvcnRWYWx1ZXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuXG4gICAgICAgICAgICB0aGlzLnRhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRhZy5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdCh0YWcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEVtaXRzIGNoYW5nZSBldmVudCB0byBzZXQgdGhlIG1vZGVsIHZhbHVlLiAqL1xuICAgIC8vIHRvZG8gbmVlZCByZXRoaW5rIHRoaXMgbWV0aG9kIGFuZCBzZWxlY3Rpb24gbG9naWNcbiAgICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZXMoZmFsbGJhY2tWYWx1ZT86IGFueSk6IHZvaWQge1xuICAgICAgICBsZXQgdmFsdWVUb0VtaXQ6IGFueSA9IG51bGw7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5zZWxlY3RlZCkpIHtcbiAgICAgICAgICAgIHZhbHVlVG9FbWl0ID0gdGhpcy5zZWxlY3RlZC5tYXAoKHRhZykgPT4gdGFnLnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlVG9FbWl0ID0gdGhpcy5zZWxlY3RlZCA/IHRoaXMuc2VsZWN0ZWQudmFsdWUgOiBmYWxsYmFja1ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWVUb0VtaXQ7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQobmV3IE1jVGFnTGlzdENoYW5nZSh0aGlzLCB2YWx1ZVRvRW1pdCkpO1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWVUb0VtaXQpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlVG9FbWl0KTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb3BhZ2F0ZVRhZ3NDaGFuZ2VzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB2YWx1ZVRvRW1pdDogYW55ID0gdGhpcy50YWdzLm1hcCgodGFnKSA9PiB0YWcudmFsdWUpO1xuXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWVUb0VtaXQ7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQobmV3IE1jVGFnTGlzdENoYW5nZSh0aGlzLCB2YWx1ZVRvRW1pdCkpO1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWVUb0VtaXQpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlVG9FbWl0KTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2V0VGFncygpIHtcbiAgICAgICAgdGhpcy5kcm9wU3Vic2NyaXB0aW9ucygpO1xuICAgICAgICB0aGlzLmxpc3RlblRvVGFnc0ZvY3VzKCk7XG4gICAgICAgIHRoaXMubGlzdGVuVG9UYWdzU2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMubGlzdGVuVG9UYWdzUmVtb3ZlZCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJvcFN1YnNjcmlwdGlvbnMoKSB7XG4gICAgICAgIGlmICh0aGlzLnRhZ0ZvY3VzU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRhZ0ZvY3VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLnRhZ0ZvY3VzU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRhZ0JsdXJTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudGFnQmx1clN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy50YWdCbHVyU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRhZ1NlbGVjdGlvblN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy50YWdTZWxlY3Rpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMudGFnU2VsZWN0aW9uU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRhZ1JlbW92ZVN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy50YWdSZW1vdmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMudGFnUmVtb3ZlU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBMaXN0ZW5zIHRvIHVzZXItZ2VuZXJhdGVkIHNlbGVjdGlvbiBldmVudHMgb24gZWFjaCB0YWcuICovXG4gICAgcHJpdmF0ZSBsaXN0ZW5Ub1RhZ3NTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFnU2VsZWN0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy50YWdTZWxlY3Rpb25DaGFuZ2VzLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2Uuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdChldmVudC5zb3VyY2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmRlc2VsZWN0KGV2ZW50LnNvdXJjZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEZvciBzaW5nbGUgc2VsZWN0aW9uIHRhZyBsaXN0LCBtYWtlIHN1cmUgdGhlIGRlc2VsZWN0ZWQgdmFsdWUgaXMgdW5zZWxlY3RlZC5cbiAgICAgICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFncy5mb3JFYWNoKCh0YWcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGlvbk1vZGVsLmlzU2VsZWN0ZWQodGFnKSAmJiB0YWcuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZy5kZXNlbGVjdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChldmVudC5pc1VzZXJJbnB1dCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogTGlzdGVucyB0byB1c2VyLWdlbmVyYXRlZCBzZWxlY3Rpb24gZXZlbnRzIG9uIGVhY2ggdGFnLiAqL1xuICAgIHByaXZhdGUgbGlzdGVuVG9UYWdzRm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFnRm9jdXNTdWJzY3JpcHRpb24gPSB0aGlzLnRhZ0ZvY3VzQ2hhbmdlcy5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YWdJbmRleDogbnVtYmVyID0gdGhpcy50YWdzLnRvQXJyYXkoKS5pbmRleE9mKGV2ZW50LnRhZyk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRJbmRleCh0YWdJbmRleCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIudXBkYXRlQWN0aXZlSXRlbSh0YWdJbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50YWdCbHVyU3Vic2NyaXB0aW9uID0gdGhpcy50YWdCbHVyQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ibHVyKCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgbGlzdGVuVG9UYWdzUmVtb3ZlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YWdSZW1vdmVTdWJzY3JpcHRpb24gPSB0aGlzLnRhZ1JlbW92ZUNoYW5nZXMuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFnID0gZXZlbnQudGFnO1xuICAgICAgICAgICAgY29uc3QgdGFnSW5kZXggPSB0aGlzLnRhZ3MudG9BcnJheSgpLmluZGV4T2YoZXZlbnQudGFnKTtcblxuICAgICAgICAgICAgLy8gSW4gY2FzZSB0aGUgdGFnIHRoYXQgd2lsbCBiZSByZW1vdmVkIGlzIGN1cnJlbnRseSBmb2N1c2VkLCB3ZSB0ZW1wb3JhcmlseSBzdG9yZVxuICAgICAgICAgICAgLy8gdGhlIGluZGV4IGluIG9yZGVyIHRvIGJlIGFibGUgdG8gZGV0ZXJtaW5lIGFuIGFwcHJvcHJpYXRlIHNpYmxpbmcgdGFnIHRoYXQgd2lsbFxuICAgICAgICAgICAgLy8gcmVjZWl2ZSBmb2N1cy5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRJbmRleCh0YWdJbmRleCkgJiYgdGFnLmhhc0ZvY3VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0RGVzdHJveWVkVGFnSW5kZXggPSB0YWdJbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1ZhbGlkSW5kZXgodGFnSW5kZXgpICYmICF0YWcuaGFzRm9jdXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzSW5wdXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIGFuIGV2ZW50IGNvbWVzIGZyb20gaW5zaWRlIGEgdGFnIGVsZW1lbnQuICovXG4gICAgcHJpdmF0ZSBvcmlnaW5hdGVzRnJvbVRhZyhldmVudDogRXZlbnQpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGN1cnJlbnRFbGVtZW50ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcblxuICAgICAgICB3aGlsZSAoY3VycmVudEVsZW1lbnQgJiYgY3VycmVudEVsZW1lbnQgIT09IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtYy10YWcnKSkgeyByZXR1cm4gdHJ1ZTsgfVxuXG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIGFueSBvZiB0aGUgdGFncyBpcyBmb2N1c2VkLiAqL1xuICAgIHByaXZhdGUgaGFzRm9jdXNlZFRhZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFncy5zb21lKCh0YWcpID0+IHRhZy5oYXNGb2N1cyk7XG4gICAgfVxuXG4gICAgLyoqIFN5bmNzIHRoZSBsaXN0J3MgZGlzYWJsZWQgc3RhdGUgd2l0aCB0aGUgaW5kaXZpZHVhbCB0YWdzLiAqL1xuICAgIHByaXZhdGUgc3luY1RhZ3NEaXNhYmxlZFN0YXRlKCkge1xuICAgICAgICBpZiAodGhpcy50YWdzKSB7XG4gICAgICAgICAgICB0aGlzLnRhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFnLmRpc2FibGVkID0gdGhpcy5fZGlzYWJsZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuIl19