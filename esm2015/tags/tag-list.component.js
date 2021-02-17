/**
 * @fileoverview added by tsickle
 * Generated from: tag-list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    /**
     * @param {?} defaultErrorStateMatcher
     * @param {?} parentForm
     * @param {?} parentFormGroup
     * @param {?} ngControl
     */
    constructor(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
        this.defaultErrorStateMatcher = defaultErrorStateMatcher;
        this.parentForm = parentForm;
        this.parentFormGroup = parentFormGroup;
        this.ngControl = ngControl;
    }
}
if (false) {
    /** @type {?} */
    McTagListBase.prototype.defaultErrorStateMatcher;
    /** @type {?} */
    McTagListBase.prototype.parentForm;
    /** @type {?} */
    McTagListBase.prototype.parentFormGroup;
    /** @type {?} */
    McTagListBase.prototype.ngControl;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export const McTagListMixinBase = mixinErrorState(McTagListBase);
// Increasing integer for generating unique ids for tag-list components.
/** @type {?} */
let nextUniqueId = 0;
/**
 * Change event object that is emitted when the tag list value has changed.
 */
export class McTagListChange {
    /**
     * @param {?} source
     * @param {?} value
     */
    constructor(source, value) {
        this.source = source;
        this.value = value;
    }
}
if (false) {
    /** @type {?} */
    McTagListChange.prototype.source;
    /** @type {?} */
    McTagListChange.prototype.value;
}
export class McTagList extends McTagListMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} changeDetectorRef
     * @param {?} defaultErrorStateMatcher
     * @param {?} rawValidators
     * @param {?} mcValidation
     * @param {?} dir
     * @param {?} parentForm
     * @param {?} parentFormGroup
     * @param {?} ngControl
     * @param {?} ngModel
     * @param {?} formControlName
     */
    constructor(elementRef, changeDetectorRef, defaultErrorStateMatcher, rawValidators, mcValidation, dir, parentForm, parentFormGroup, ngControl, ngModel, formControlName) {
        super(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this.rawValidators = rawValidators;
        this.mcValidation = mcValidation;
        this.dir = dir;
        this.ngModel = ngModel;
        this.formControlName = formControlName;
        this.controlType = 'mc-tag-list';
        this._tabIndex = 0;
        /**
         * Event that emits whenever the raw value of the tag-list changes. This is here primarily
         * to facilitate the two-way binding for the `value` input.
         * \@docs-private
         */
        this.valueChange = new EventEmitter();
        this.uid = `mc-tag-list-${nextUniqueId++}`;
        /**
         * User defined tab index.
         * When it is not null, use user defined tab index. Otherwise use tabIndex
         */
        this.userTabIndex = null;
        this.tagChanges = new EventEmitter();
        /**
         * Orientation of the tag list.
         */
        this.orientation = 'horizontal';
        /**
         * Event emitted when the selected tag list value has been changed by the user.
         */
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
        /**
         * Subject that emits when the component has been destroyed.
         */
        this.destroyed = new Subject();
        // tslint:disable-next-line:no-empty
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
        // tslint:disable-next-line:no-empty
        this.onChange = (/**
         * @return {?}
         */
        () => { });
        this._compareWith = (/**
         * @param {?} o1
         * @param {?} o2
         * @return {?}
         */
        (o1, o2) => o1 === o2);
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }
    /**
     * Combined stream of all of the child tags' selection change events.
     * @return {?}
     */
    get tagSelectionChanges() {
        return merge(...this.tags.map((/**
         * @param {?} tag
         * @return {?}
         */
        (tag) => tag.selectionChange)));
    }
    /**
     * Combined stream of all of the child tags' focus change events.
     * @return {?}
     */
    get tagFocusChanges() {
        return merge(...this.tags.map((/**
         * @param {?} tag
         * @return {?}
         */
        (tag) => tag.onFocus)));
    }
    /**
     * Combined stream of all of the child tags' blur change events.
     * @return {?}
     */
    get tagBlurChanges() {
        return merge(...this.tags.map((/**
         * @param {?} tag
         * @return {?}
         */
        (tag) => tag.onBlur)));
    }
    /**
     * Combined stream of all of the child tags' remove change events.
     * @return {?}
     */
    get tagRemoveChanges() {
        return merge(...this.tags.map((/**
         * @param {?} tag
         * @return {?}
         */
        (tag) => tag.destroyed)));
    }
    /**
     * The array of selected tags inside tag list.
     * @return {?}
     */
    get selected() {
        return this.multiple ? this.selectionModel.selected : this.selectionModel.selected[0];
    }
    /**
     * @return {?}
     */
    get canShowCleaner() {
        return this.cleaner && this.tags.length > 0;
    }
    /**
     * Whether the user should be allowed to select multiple tags.
     * @return {?}
     */
    get multiple() {
        return this._multiple;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set multiple(value) {
        this._multiple = coerceBooleanProperty(value);
    }
    /**
     * A function to compare the option values with the selected values. The first argument
     * is a value from an option. The second is a value from the selection. A boolean
     * should be returned.
     * @return {?}
     */
    get compareWith() {
        return this._compareWith;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    set compareWith(fn) {
        this._compareWith = fn;
        if (this.selectionModel) {
            // A different comparator means the selection could change.
            this.initializeSelection();
        }
    }
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this.writeValue(value);
        this._value = value;
    }
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    get id() {
        return this.tagInput ? this.tagInput.id : this.uid;
    }
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    get required() {
        return this._required;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    get placeholder() {
        return this.tagInput ? this.tagInput.placeholder : this._placeholder;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set placeholder(value) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    /**
     * Whether any tags or the mcTagInput inside of this tag-list has focus.
     * @return {?}
     */
    get focused() {
        return (this.tagInput && this.tagInput.focused) || this.hasFocusedTag();
    }
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    get empty() {
        return (!this.tagInput || this.tagInput.empty) && this.tags.length === 0;
    }
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    get shouldLabelFloat() {
        return !this.empty || this.focused;
    }
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    get disabled() {
        return this.ngControl ? !!this.ngControl.disabled : this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        this.syncTagsDisabledState();
    }
    /**
     * Whether or not this tag list is selectable. When a tag list is not selectable,
     * the selected states for all the tags inside the tag list are always ignored.
     * @return {?}
     */
    get selectable() {
        return this._selectable;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectable(value) {
        this._selectable = coerceBooleanProperty(value);
        if (this.tags) {
            this.tags.forEach((/**
             * @param {?} tag
             * @return {?}
             */
            (tag) => tag.tagListSelectable = this._selectable));
        }
    }
    /**
     * @return {?}
     */
    get tabIndex() {
        return this._tabIndex;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set tabIndex(value) {
        this.userTabIndex = value;
        this._tabIndex = value;
    }
    /**
     * @return {?}
     */
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
                .subscribe((/**
             * @param {?} dir
             * @return {?}
             */
            (dir) => this.keyManager.withHorizontalOrientation(dir)));
        }
        // Prevents the tag list from capturing focus and redirecting
        // it back to the first tag when the user tabs out.
        this.keyManager.tabOut
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this._tabIndex = -1;
            setTimeout((/**
             * @return {?}
             */
            () => {
                this._tabIndex = this.userTabIndex || 0;
                this.changeDetectorRef.markForCheck();
            }));
        }));
        // When the list changes, re-subscribe
        this.tags.changes
            .pipe(startWith(null), takeUntil(this.destroyed))
            .subscribe((/**
         * @return {?}
         */
        () => {
            if (this.disabled) {
                // Since this happens after the content has been
                // checked, we need to defer it to the next tick.
                Promise.resolve().then((/**
                 * @return {?}
                 */
                () => { this.syncTagsDisabledState(); }));
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
            Promise.resolve().then((/**
             * @return {?}
             */
            () => {
                this.tagChanges.emit(this.tags.toArray());
                this.stateChanges.next();
                this.propagateTagsChanges();
            }));
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.selectionModel = new SelectionModel(this.multiple, undefined, false);
        this.stateChanges.next();
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
        this.stateChanges.complete();
        this.dropSubscriptions();
    }
    /**
     * Associates an HTML input element with this tag list.
     * @param {?} inputElement
     * @return {?}
     */
    registerInput(inputElement) {
        var _a;
        this.tagInput = inputElement;
        // todo need rethink about it
        if (this.ngControl && ((_a = inputElement.ngControl) === null || _a === void 0 ? void 0 : _a.statusChanges)) {
            inputElement.ngControl.statusChanges
                .subscribe((/**
             * @return {?}
             */
            () => (/** @type {?} */ (this.ngControl.control)).setErrors((/** @type {?} */ (inputElement.ngControl)).errors)));
        }
    }
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (this.tags) {
            this.setSelectionByValue(value, false);
        }
    }
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.stateChanges.next();
    }
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @param {?} event
     * @return {?}
     */
    onContainerClick(event) {
        if (!this.originatesFromTag(event)) {
            this.focus();
        }
    }
    /**
     * Focuses the first non-disabled tag in this tag list, or the associated input when there
     * are no eligible tags.
     * @return {?}
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
    /**
     * Attempt to focus an input if we have one.
     * @return {?}
     */
    focusInput() {
        if (this.tagInput) {
            this.tagInput.focus();
        }
    }
    /**
     * Pass events to the keyboard manager. Available here for tests.
     * @param {?} event
     * @return {?}
     */
    keydown(event) {
        /** @type {?} */
        const target = (/** @type {?} */ (event.target));
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
    /**
     * @param {?} value
     * @param {?=} isUserInput
     * @return {?}
     */
    setSelectionByValue(value, isUserInput = true) {
        this.clearSelection();
        this.tags.forEach((/**
         * @param {?} tag
         * @return {?}
         */
        (tag) => tag.deselect()));
        if (Array.isArray(value)) {
            value.forEach((/**
             * @param {?} currentValue
             * @return {?}
             */
            (currentValue) => this.selectValue(currentValue, isUserInput)));
            this.sortValues();
        }
        else {
            /** @type {?} */
            const correspondingTag = this.selectValue(value, isUserInput);
            // Shift focus to the active item. Note that we shouldn't do this in multiple
            // mode, because we don't know what tag the user interacted with last.
            if (correspondingTag && isUserInput) {
                this.keyManager.setActiveItem(correspondingTag);
            }
        }
    }
    /**
     * When blurred, mark the field as touched when focus moved outside the tag list.
     * @return {?}
     */
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
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    if (!this.focused) {
                        this.markAsTouched();
                    }
                }));
            }
            else {
                // If there's no tag input, then mark the field as touched.
                this.markAsTouched();
            }
        }
    }
    /**
     * Mark the field as touched
     * @return {?}
     */
    markAsTouched() {
        this.onTouched();
        this.changeDetectorRef.markForCheck();
        this.stateChanges.next();
    }
    /**
     * Check the tab index as you should not be allowed to focus an empty list.
     * @protected
     * @return {?}
     */
    updateTabIndex() {
        // If we have 0 tags, we should not allow keyboard focus
        this._tabIndex = this.userTabIndex || (this.tags.length === 0 ? -1 : 0);
    }
    /**
     * If the amount of tags changed, we need to update the
     * key manager state and focus the next closest tag.
     * @protected
     * @return {?}
     */
    updateFocusForDestroyedTags() {
        if (this.lastDestroyedTagIndex != null) {
            if (this.tags.length) {
                /** @type {?} */
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
     * @private
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of tags.
     */
    isValidIndex(index) {
        return index >= 0 && index < this.tags.length;
    }
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    isInputEmpty(element) {
        if (element && element.nodeName.toLowerCase() === 'input') {
            /** @type {?} */
            const input = (/** @type {?} */ (element));
            return !input.value;
        }
        return false;
    }
    /**
     * Finds and selects the tag based on its value.
     * @private
     * @param {?} value
     * @param {?=} isUserInput
     * @return {?} Tag that has the corresponding value.
     */
    selectValue(value, isUserInput = true) {
        /** @type {?} */
        const correspondingTag = this.tags.find((/**
         * @param {?} tag
         * @return {?}
         */
        (tag) => {
            return tag.value != null && this._compareWith(tag.value, value);
        }));
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
    /**
     * @private
     * @return {?}
     */
    initializeSelection() {
        // Defer setting the value in order to avoid the "Expression
        // has changed after it was checked" errors from Angular.
        Promise.resolve().then((/**
         * @return {?}
         */
        () => {
            if (this.ngControl || this._value) {
                this.setSelectionByValue(this.ngControl ? this.ngControl.value : this._value, false);
                this.stateChanges.next();
            }
        }));
    }
    /**
     * Deselects every tag in the list.
     * @private
     * @param {?=} skip Tag that should not be deselected.
     * @return {?}
     */
    clearSelection(skip) {
        this.selectionModel.clear();
        this.tags.forEach((/**
         * @param {?} tag
         * @return {?}
         */
        (tag) => {
            if (tag !== skip) {
                tag.deselect();
            }
        }));
        this.stateChanges.next();
    }
    /**
     * Sorts the model values, ensuring that they keep the same
     * order that they have in the panel.
     * @private
     * @return {?}
     */
    sortValues() {
        if (this._multiple) {
            this.selectionModel.clear();
            this.tags.forEach((/**
             * @param {?} tag
             * @return {?}
             */
            (tag) => {
                if (tag.selected) {
                    this.selectionModel.select(tag);
                }
            }));
            this.stateChanges.next();
        }
    }
    /**
     * Emits change event to set the model value.
     * @private
     * @param {?=} fallbackValue
     * @return {?}
     */
    // todo need rethink this method and selection logic
    propagateChanges(fallbackValue) {
        /** @type {?} */
        let valueToEmit = null;
        if (Array.isArray(this.selected)) {
            valueToEmit = this.selected.map((/**
             * @param {?} tag
             * @return {?}
             */
            (tag) => tag.value));
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
    /**
     * @private
     * @return {?}
     */
    propagateTagsChanges() {
        /** @type {?} */
        const valueToEmit = this.tags.map((/**
         * @param {?} tag
         * @return {?}
         */
        (tag) => tag.value));
        this._value = valueToEmit;
        this.change.emit(new McTagListChange(this, valueToEmit));
        this.valueChange.emit(valueToEmit);
        this.onChange(valueToEmit);
        this.changeDetectorRef.markForCheck();
    }
    /**
     * @private
     * @return {?}
     */
    resetTags() {
        this.dropSubscriptions();
        this.listenToTagsFocus();
        this.listenToTagsSelection();
        this.listenToTagsRemoved();
    }
    /**
     * @private
     * @return {?}
     */
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
    /**
     * Listens to user-generated selection events on each tag.
     * @private
     * @return {?}
     */
    listenToTagsSelection() {
        this.tagSelectionSubscription = this.tagSelectionChanges.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (event.source.selected) {
                this.selectionModel.select(event.source);
            }
            else {
                this.selectionModel.deselect(event.source);
            }
            // For single selection tag list, make sure the deselected value is unselected.
            if (!this.multiple) {
                this.tags.forEach((/**
                 * @param {?} tag
                 * @return {?}
                 */
                (tag) => {
                    if (!this.selectionModel.isSelected(tag) && tag.selected) {
                        tag.deselect();
                    }
                }));
            }
            if (event.isUserInput) {
                this.propagateChanges();
            }
        }));
    }
    /**
     * Listens to user-generated selection events on each tag.
     * @private
     * @return {?}
     */
    listenToTagsFocus() {
        this.tagFocusSubscription = this.tagFocusChanges.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const tagIndex = this.tags.toArray().indexOf(event.tag);
            if (this.isValidIndex(tagIndex)) {
                this.keyManager.updateActiveItem(tagIndex);
            }
            this.stateChanges.next();
        }));
        this.tagBlurSubscription = this.tagBlurChanges.subscribe((/**
         * @return {?}
         */
        () => {
            this.blur();
            this.stateChanges.next();
        }));
    }
    /**
     * @private
     * @return {?}
     */
    listenToTagsRemoved() {
        this.tagRemoveSubscription = this.tagRemoveChanges.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const tag = event.tag;
            /** @type {?} */
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
        }));
    }
    /**
     * Checks whether an event comes from inside a tag element.
     * @private
     * @param {?} event
     * @return {?}
     */
    originatesFromTag(event) {
        /** @type {?} */
        let currentElement = (/** @type {?} */ (event.target));
        while (currentElement && currentElement !== this.elementRef.nativeElement) {
            if (currentElement.classList.contains('mc-tag')) {
                return true;
            }
            currentElement = currentElement.parentElement;
        }
        return false;
    }
    /**
     * Checks whether any of the tags is focused.
     * @private
     * @return {?}
     */
    hasFocusedTag() {
        return this.tags.some((/**
         * @param {?} tag
         * @return {?}
         */
        (tag) => tag.hasFocus));
    }
    /**
     * Syncs the list's disabled state with the individual tags.
     * @private
     * @return {?}
     */
    syncTagsDisabledState() {
        if (this.tags) {
            this.tags.forEach((/**
             * @param {?} tag
             * @return {?}
             */
            (tag) => {
                tag.disabled = this._disabled;
            }));
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
                styles: [".mc-tag-list{display:flex;flex-direction:row}.mc-tag-input{background:transparent;border:none;outline:none}.mc-tags-list__list-container{display:flex;flex:1 1 100%;flex-wrap:wrap;min-height:var(--mc-tag-list-size-min-height,28px);min-width:0;padding:var(--mc-tag-list-size-padding,1px 6px)}.mc-tags-list__list-container .mc-tag-input{flex:1 1 auto;height:var(--mc-tag-input-size-height,22px);margin:var(--mc-tag-input-size-margin,2px 4px);max-width:100%}.mc-tags-list__cleaner .mc-cleaner{height:30px}"]
            }] }
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
if (false) {
    /** @type {?} */
    McTagList.prototype.controlType;
    /**
     * @type {?}
     * @private
     */
    McTagList.prototype._tabIndex;
    /**
     * Event that emits whenever the raw value of the tag-list changes. This is here primarily
     * to facilitate the two-way binding for the `value` input.
     * \@docs-private
     * @type {?}
     */
    McTagList.prototype.valueChange;
    /** @type {?} */
    McTagList.prototype.uid;
    /**
     * User defined tab index.
     * When it is not null, use user defined tab index. Otherwise use tabIndex
     * @type {?}
     */
    McTagList.prototype.userTabIndex;
    /** @type {?} */
    McTagList.prototype.keyManager;
    /** @type {?} */
    McTagList.prototype.selectionModel;
    /** @type {?} */
    McTagList.prototype.tagChanges;
    /**
     * An object used to control when error messages are shown.
     * @type {?}
     */
    McTagList.prototype.errorStateMatcher;
    /**
     * Orientation of the tag list.
     * @type {?}
     */
    McTagList.prototype.orientation;
    /**
     * Event emitted when the selected tag list value has been changed by the user.
     * @type {?}
     */
    McTagList.prototype.change;
    /** @type {?} */
    McTagList.prototype.cleaner;
    /**
     * The tag components contained within this tag list.
     * @type {?}
     */
    McTagList.prototype.tags;
    /**
     * @type {?}
     * @private
     */
    McTagList.prototype._value;
    /**
     * @type {?}
     * @private
     */
    McTagList.prototype._required;
    /**
     * @type {?}
     * @private
     */
    McTagList.prototype._placeholder;
    /**
     * @type {?}
     * @private
     */
    McTagList.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    McTagList.prototype._selectable;
    /**
     * The tag input to add more tags
     * @type {?}
     * @private
     */
    McTagList.prototype.tagInput;
    /**
     * @type {?}
     * @private
     */
    McTagList.prototype._multiple;
    /**
     * When a tag is destroyed, we store the index of the destroyed tag until the tags
     * query list notifies about the update. This is necessary because we cannot determine an
     * appropriate tag that should receive focus until the array of tags updated completely.
     * @type {?}
     * @private
     */
    McTagList.prototype.lastDestroyedTagIndex;
    /**
     * Subject that emits when the component has been destroyed.
     * @type {?}
     * @private
     */
    McTagList.prototype.destroyed;
    /**
     * Subscription to focus changes in the tags.
     * @type {?}
     * @private
     */
    McTagList.prototype.tagFocusSubscription;
    /**
     * Subscription to blur changes in the tags.
     * @type {?}
     * @private
     */
    McTagList.prototype.tagBlurSubscription;
    /**
     * Subscription to selection changes in tags.
     * @type {?}
     * @private
     */
    McTagList.prototype.tagSelectionSubscription;
    /**
     * Subscription to remove changes in tags.
     * @type {?}
     * @private
     */
    McTagList.prototype.tagRemoveSubscription;
    /** @type {?} */
    McTagList.prototype.onTouched;
    /** @type {?} */
    McTagList.prototype.onChange;
    /**
     * @type {?}
     * @private
     */
    McTagList.prototype._compareWith;
    /**
     * @type {?}
     * @protected
     */
    McTagList.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    McTagList.prototype.changeDetectorRef;
    /** @type {?} */
    McTagList.prototype.rawValidators;
    /**
     * @type {?}
     * @private
     */
    McTagList.prototype.mcValidation;
    /**
     * @type {?}
     * @private
     */
    McTagList.prototype.dir;
    /** @type {?} */
    McTagList.prototype.ngModel;
    /** @type {?} */
    McTagList.prototype.formControlName;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvdGFncy8iLCJzb3VyY2VzIjpbInRhZy1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUVILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBRWYsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULElBQUksRUFDSixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUVILGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsYUFBYSxFQUNiLFNBQVMsRUFDVCxNQUFNLEVBQ04sT0FBTyxFQUVWLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFHSCxpQkFBaUIsRUFDakIsYUFBYSxFQUViLGVBQWUsRUFDZixtQkFBbUIsRUFDdEIsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDOUUsT0FBTyxFQUFFLEtBQUssRUFBYyxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHdEQsT0FBTyxFQUFFLEtBQUssRUFBb0MsTUFBTSxpQkFBaUIsQ0FBQztBQUcxRSxNQUFNLE9BQU8sYUFBYTs7Ozs7OztJQUN0QixZQUNXLHdCQUEyQyxFQUMzQyxVQUFrQixFQUNsQixlQUFtQyxFQUNuQyxTQUFvQjtRQUhwQiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQW1CO1FBQzNDLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDbEIsb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBQ25DLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFDNUIsQ0FBQztDQUNQOzs7SUFMTyxpREFBa0Q7O0lBQ2xELG1DQUF5Qjs7SUFDekIsd0NBQTBDOztJQUMxQyxrQ0FBMkI7Ozs7QUFLbkMsTUFBTSxPQUFPLGtCQUFrQixHQUFtRCxlQUFlLENBQUMsYUFBYSxDQUFDOzs7SUFJNUcsWUFBWSxHQUFHLENBQUM7Ozs7QUFHcEIsTUFBTSxPQUFPLGVBQWU7Ozs7O0lBQ3hCLFlBQW1CLE1BQWlCLEVBQVMsS0FBVTtRQUFwQyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBSztJQUFHLENBQUM7Q0FDOUQ7OztJQURlLGlDQUF3Qjs7SUFBRSxnQ0FBaUI7O0FBeUIzRCxNQUFNLE9BQU8sU0FBVSxTQUFRLGtCQUFrQjs7Ozs7Ozs7Ozs7Ozs7SUE4UDdDLFlBQ2MsVUFBbUMsRUFDckMsaUJBQW9DLEVBQzVDLHdCQUEyQyxFQUNELGFBQTBCLEVBQ3pCLFlBQWlDLEVBQ3hELEdBQW1CLEVBQzNCLFVBQWtCLEVBQ2xCLGVBQW1DLEVBQzNCLFNBQW9CLEVBQ2IsT0FBZ0IsRUFDaEIsZUFBZ0M7UUFFM0QsS0FBSyxDQUFDLHdCQUF3QixFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFaOUQsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFDckMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUVGLGtCQUFhLEdBQWIsYUFBYSxDQUFhO1FBQ3pCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUN4RCxRQUFHLEdBQUgsR0FBRyxDQUFnQjtRQUlaLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBdFF0RCxnQkFBVyxHQUFXLGFBQWEsQ0FBQztRQTZLckMsY0FBUyxHQUFHLENBQUMsQ0FBQzs7Ozs7O1FBT0gsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUU1RSxRQUFHLEdBQVcsZUFBZSxZQUFZLEVBQUUsRUFBRSxDQUFDOzs7OztRQU05QyxpQkFBWSxHQUFrQixJQUFJLENBQUM7UUFNbkMsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7Ozs7UUFNZixnQkFBVyxHQUE4QixZQUFZLENBQUM7Ozs7UUFHekQsV0FBTSxHQUFrQyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQWF2RixjQUFTLEdBQVksS0FBSyxDQUFDO1FBSTNCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFM0IsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFLNUIsY0FBUyxHQUFZLEtBQUssQ0FBQzs7Ozs7O1FBTzNCLDBCQUFxQixHQUFrQixJQUFJLENBQUM7Ozs7UUFHNUMsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7O1FBb0h4QyxjQUFTOzs7UUFBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLEVBQUM7O1FBR3JCLGFBQVE7OztRQUF5QixHQUFHLEVBQUUsR0FBRSxDQUFDLEVBQUM7UUErS2xDLGlCQUFZOzs7OztRQUFHLENBQUMsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBQztRQXpRbkQsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUN2QztJQUNMLENBQUM7Ozs7O0lBMVFELElBQUksbUJBQW1CO1FBQ25CLE9BQU8sS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1FBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Ozs7O0lBR0QsSUFBSSxlQUFlO1FBQ2YsT0FBTyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUM7SUFDekQsQ0FBQzs7Ozs7SUFHRCxJQUFJLGNBQWM7UUFDZCxPQUFPLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRzs7OztRQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDOzs7OztJQUdELElBQUksZ0JBQWdCO1FBQ2hCLE9BQU8sS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1FBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7Ozs7O0lBR0QsSUFBSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUYsQ0FBQzs7OztJQUVELElBQUksY0FBYztRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7Ozs7SUFHRCxJQUNJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFjO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7Ozs7OztJQU9ELElBQ0ksV0FBVztRQUNYLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDOzs7OztJQUVELElBQUksV0FBVyxDQUFDLEVBQWlDO1FBQzdDLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBRXZCLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNyQiwyREFBMkQ7WUFDM0QsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDOUI7SUFDTCxDQUFDOzs7Ozs7SUFNRCxJQUNJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFFRCxJQUFJLEtBQUssQ0FBQyxLQUFVO1FBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQzs7Ozs7O0lBTUQsSUFBSSxFQUFFO1FBQ0YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUN2RCxDQUFDOzs7Ozs7SUFNRCxJQUNJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFjO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7Ozs7SUFNRCxJQUNJLFdBQVc7UUFDWCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQ3pFLENBQUM7Ozs7O0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBYTtRQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBR0QsSUFBSSxPQUFPO1FBQ1AsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDNUUsQ0FBQzs7Ozs7O0lBTUQsSUFBSSxLQUFLO1FBQ0wsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUM3RSxDQUFDOzs7Ozs7SUFNRCxJQUFJLGdCQUFnQjtRQUNoQixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3ZDLENBQUM7Ozs7OztJQU1ELElBQ0ksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3ZFLENBQUM7Ozs7O0lBRUQsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ2pDLENBQUM7Ozs7OztJQU1ELElBQ0ksVUFBVTtRQUNWLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDOzs7OztJQUVELElBQUksVUFBVSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVoRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87Ozs7WUFBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUMsQ0FBQztTQUN4RTtJQUNMLENBQUM7Ozs7SUFFRCxJQUNJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFhO1FBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7Ozs7SUFvR0Qsa0JBQWtCO1FBQ2QsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRTtZQUNqQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QjtRQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxlQUFlLENBQVEsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNsRCx1QkFBdUIsRUFBRTthQUN6Qix5QkFBeUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbEUsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNO2lCQUNWLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUMvQixTQUFTOzs7O1lBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQztTQUMzRTtRQUVELDZEQUE2RDtRQUM3RCxtREFBbUQ7UUFDbkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNO2FBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQy9CLFNBQVM7OztRQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFcEIsVUFBVTs7O1lBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUMxQyxDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUMsRUFBQyxDQUFDO1FBRVAsc0NBQXNDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTzthQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNoRCxTQUFTOzs7UUFBQyxHQUFHLEVBQUU7WUFDWixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsZ0RBQWdEO2dCQUNoRCxpREFBaUQ7Z0JBQ2pELE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJOzs7Z0JBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQzthQUNuRTtZQUVELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUVqQix3Q0FBd0M7WUFDeEMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFFM0Isa0RBQWtEO1lBQ2xELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUV0Qiw4REFBOEQ7WUFDOUQsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7WUFFbkMsNERBQTREO1lBQzVELHlEQUF5RDtZQUN6RCxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSTs7O1lBQUMsR0FBRyxFQUFFO2dCQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQ2hDLENBQUMsRUFBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFDLENBQUM7SUFDWCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQVEsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQsU0FBUztRQUNMLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixzRkFBc0Y7WUFDdEYsdUZBQXVGO1lBQ3ZGLDZGQUE2RjtZQUM3RixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFN0IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQzs7Ozs7O0lBU0QsYUFBYSxDQUFDLFlBQThCOztRQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQztRQUU3Qiw2QkFBNkI7UUFDN0IsSUFBSSxJQUFJLENBQUMsU0FBUyxXQUFJLFlBQVksQ0FBQyxTQUFTLDBDQUFFLGFBQWEsQ0FBQSxFQUFFO1lBQ3pELFlBQVksQ0FBQyxTQUFTLENBQUMsYUFBYTtpQkFDL0IsU0FBUzs7O1lBQUMsR0FBRyxFQUFFLENBQUMsbUJBQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxTQUFTLENBQUMsbUJBQUEsWUFBWSxDQUFDLFNBQVMsRUFBQyxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUM7U0FDM0Y7SUFDTCxDQUFDOzs7Ozs7SUFHRCxVQUFVLENBQUMsS0FBVTtRQUNqQixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzFDO0lBQ0wsQ0FBQzs7Ozs7O0lBR0QsZ0JBQWdCLENBQUMsRUFBd0I7UUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7Ozs7O0lBR0QsaUJBQWlCLENBQUMsRUFBYztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7Ozs7SUFHRCxnQkFBZ0IsQ0FBQyxVQUFtQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7Ozs7SUFNRCxnQkFBZ0IsQ0FBQyxLQUFpQjtRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNoQjtJQUNMLENBQUM7Ozs7OztJQU1ELEtBQUs7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFFOUIsa0ZBQWtGO1FBQ2xGLGdFQUFnRTtRQUNoRSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDeEMsYUFBYTtTQUNoQjthQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzVCO2FBQU07WUFDSCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUM1QjtJQUNMLENBQUM7Ozs7O0lBR0QsVUFBVTtRQUNOLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDekI7SUFDTCxDQUFDOzs7Ozs7SUFLRCxPQUFPLENBQUMsS0FBb0I7O2NBQ2xCLE1BQU0sR0FBRyxtQkFBQSxLQUFLLENBQUMsTUFBTSxFQUFlO1FBRTFDLHNFQUFzRTtRQUN0RSx3Q0FBd0M7UUFDeEMsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzFELElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUNwQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7YUFBTSxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN0RCx3Q0FBd0M7WUFDeEMsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLElBQUksRUFBRTtnQkFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUNyQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQzNCLHdDQUF3QzthQUN2QztpQkFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssR0FBRyxFQUFFO2dCQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3BDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUMxQjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwQztZQUVELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDNUI7SUFDTCxDQUFDOzs7Ozs7SUFFRCxtQkFBbUIsQ0FBQyxLQUFVLEVBQUUsY0FBdUIsSUFBSTtRQUN2RCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBQyxDQUFDO1FBRTNDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0QixLQUFLLENBQUMsT0FBTzs7OztZQUFDLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsRUFBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjthQUFNOztrQkFDRyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUM7WUFFN0QsNkVBQTZFO1lBQzdFLHNFQUFzRTtZQUN0RSxJQUFJLGdCQUFnQixJQUFJLFdBQVcsRUFBRTtnQkFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUNuRDtTQUNKO0lBQ0wsQ0FBQzs7Ozs7SUFHRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3JDO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLGdGQUFnRjtnQkFDaEYsd0ZBQXdGO2dCQUN4Riw0QkFBNEI7Z0JBQzVCLHdFQUF3RTtnQkFDeEUsVUFBVTs7O2dCQUFDLEdBQUcsRUFBRTtvQkFDWixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTt3QkFDZixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7cUJBQ3hCO2dCQUNMLENBQUMsRUFBQyxDQUFDO2FBQ047aUJBQU07Z0JBQ0gsMkRBQTJEO2dCQUMzRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDeEI7U0FDSjtJQUNMLENBQUM7Ozs7O0lBR0QsYUFBYTtRQUNULElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7Ozs7SUFLUyxjQUFjO1FBQ3BCLHdEQUF3RDtRQUN4RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RSxDQUFDOzs7Ozs7O0lBTVMsMkJBQTJCO1FBQ2pDLElBQUksSUFBSSxDQUFDLHFCQUFxQixJQUFJLElBQUksRUFBRTtZQUNwQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFOztzQkFDWixXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUM5RSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUM5QztpQkFBTTtnQkFDSCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDckI7U0FDSjtRQUVELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7SUFDdEMsQ0FBQzs7Ozs7Ozs7SUFVTyxZQUFZLENBQUMsS0FBYTtRQUM5QixPQUFPLEtBQUssSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ2xELENBQUM7Ozs7OztJQUVPLFlBQVksQ0FBQyxPQUFvQjtRQUNyQyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU8sRUFBRTs7a0JBQ2pELEtBQUssR0FBRyxtQkFBQSxPQUFPLEVBQW9CO1lBRXpDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQ3ZCO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Ozs7Ozs7SUFNTyxXQUFXLENBQUMsS0FBVSxFQUFFLGNBQXVCLElBQUk7O2NBRWpELGdCQUFnQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSTs7OztRQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDNUMsT0FBTyxHQUFHLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEUsQ0FBQyxFQUFDO1FBRUYsSUFBSSxnQkFBZ0IsRUFBRTtZQUNsQixJQUFJLFdBQVcsRUFBRTtnQkFDYixnQkFBZ0IsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2FBQzNDO2lCQUFNO2dCQUNILGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQzdCO1lBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUNoRDtRQUVELE9BQU8sZ0JBQWdCLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFFTyxtQkFBbUI7UUFDdkIsNERBQTREO1FBQzVELHlEQUF5RDtRQUN6RCxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSTs7O1FBQUMsR0FBRyxFQUFFO1lBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUMvQixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3JGLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDNUI7UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7Ozs7SUFNTyxjQUFjLENBQUMsSUFBWTtRQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTzs7OztRQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDdEIsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFO2dCQUNkLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNsQjtRQUNMLENBQUMsRUFBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7Ozs7O0lBTU8sVUFBVTtRQUNkLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRTVCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTzs7OztZQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ3RCLElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRTtvQkFDZCxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDbkM7WUFDTCxDQUFDLEVBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDNUI7SUFDTCxDQUFDOzs7Ozs7OztJQUlPLGdCQUFnQixDQUFDLGFBQW1COztZQUNwQyxXQUFXLEdBQVEsSUFBSTtRQUUzQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzlCLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUc7Ozs7WUFBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBQyxDQUFDO1NBQ3ZEO2FBQU07WUFDSCxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztTQUNyRTtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksZUFBZSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFDLENBQUM7Ozs7O0lBRU8sb0JBQW9COztjQUNsQixXQUFXLEdBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1FBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUM7UUFFMUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUMsQ0FBQzs7Ozs7SUFFTyxTQUFTO1FBQ2IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDL0IsQ0FBQzs7Ozs7SUFFTyxpQkFBaUI7UUFDckIsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDM0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7U0FDcEM7UUFFRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUMxQixJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztTQUNuQztRQUVELElBQUksSUFBSSxDQUFDLHdCQUF3QixFQUFFO1lBQy9CLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM1QyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDO1NBQ3hDO1FBRUQsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDNUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7U0FDckM7SUFDTCxDQUFDOzs7Ozs7SUFHTyxxQkFBcUI7UUFDekIsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN6RSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDNUM7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzlDO1lBRUQsK0VBQStFO1lBQy9FLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87Ozs7Z0JBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUU7d0JBQ3RELEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztxQkFDbEI7Z0JBQ0wsQ0FBQyxFQUFDLENBQUM7YUFDTjtZQUVELElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7YUFDM0I7UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUdPLGlCQUFpQjtRQUNyQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTs7a0JBQzNELFFBQVEsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBRS9ELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM5QztZQUVELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTOzs7UUFBQyxHQUFHLEVBQUU7WUFDMUQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3QixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRU8sbUJBQW1CO1FBQ3ZCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUzs7OztRQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7O2tCQUM3RCxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUc7O2tCQUNmLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBRXZELGtGQUFrRjtZQUNsRixrRkFBa0Y7WUFDbEYsaUJBQWlCO1lBQ2pCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFO2dCQUM3QyxJQUFJLENBQUMscUJBQXFCLEdBQUcsUUFBUSxDQUFDO2FBQ3pDO2lCQUFNLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3JELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNyQjtRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7OztJQUdPLGlCQUFpQixDQUFDLEtBQVk7O1lBQzlCLGNBQWMsR0FBRyxtQkFBQSxLQUFLLENBQUMsTUFBTSxFQUFzQjtRQUV2RCxPQUFPLGNBQWMsSUFBSSxjQUFjLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUU7WUFDdkUsSUFBSSxjQUFjLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFBRSxPQUFPLElBQUksQ0FBQzthQUFFO1lBRWpFLGNBQWMsR0FBRyxjQUFjLENBQUMsYUFBYSxDQUFDO1NBQ2pEO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Ozs7O0lBR08sYUFBYTtRQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSTs7OztRQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFDLENBQUM7SUFDakQsQ0FBQzs7Ozs7O0lBR08scUJBQXFCO1FBQ3pCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTzs7OztZQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ3RCLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNsQyxDQUFDLEVBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQzs7O1lBN3dCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixzT0FBb0M7Z0JBRXBDLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsYUFBYTtvQkFDcEIscUJBQXFCLEVBQUUsVUFBVTtvQkFDakMsb0JBQW9CLEVBQUUsWUFBWTtvQkFFbEMsaUJBQWlCLEVBQUUsNEJBQTRCO29CQUMvQyxNQUFNLEVBQUUsS0FBSztvQkFFYixTQUFTLEVBQUUsU0FBUztvQkFDcEIsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLFdBQVcsRUFBRSxpQkFBaUI7aUJBQ2pDO2dCQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxDQUFDOzthQUN2RTs7OztZQW5GRyxVQUFVO1lBTFYsaUJBQWlCO1lBZ0NqQixpQkFBaUI7d0NBMlRaLFFBQVEsWUFBSSxNQUFNLFNBQUMsYUFBYTs0Q0FDaEMsUUFBUSxZQUFJLE1BQU0sU0FBQyxhQUFhO1lBbFdoQyxjQUFjLHVCQW1XZCxRQUFRO1lBdFViLE1BQU0sdUJBdVVELFFBQVE7WUExVWIsa0JBQWtCLHVCQTJVYixRQUFRO1lBelViLFNBQVMsdUJBMFVKLFFBQVEsWUFBSSxJQUFJO1lBeFVyQixPQUFPLHVCQXlVRixRQUFRLFlBQUksSUFBSTtZQTlVckIsZUFBZSx1QkErVVYsUUFBUSxZQUFJLElBQUk7Ozt1QkF0T3BCLEtBQUs7MEJBY0wsS0FBSztvQkFrQkwsS0FBSzt1QkFzQkwsS0FBSzswQkFlTCxLQUFLO3VCQW1DTCxLQUFLO3lCQWNMLEtBQUs7dUJBYUwsS0FBSzswQkFpQkwsTUFBTTtnQ0FpQk4sS0FBSzswQkFHTCxLQUFLLFNBQUMsYUFBYTtxQkFHbkIsTUFBTTtzQkFFTixZQUFZLFNBQUMsa0JBQWtCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO21CQUdqRCxlQUFlLFNBQUMsS0FBSyxFQUFFOzs7b0JBR3BCLFdBQVcsRUFBRSxJQUFJO2lCQUNwQjs7OztJQXBORCxnQ0FBNkM7Ozs7O0lBNks3Qyw4QkFBc0I7Ozs7Ozs7SUFPdEIsZ0NBQTRFOztJQUU1RSx3QkFBOEM7Ozs7OztJQU05QyxpQ0FBbUM7O0lBRW5DLCtCQUFtQzs7SUFFbkMsbUNBQXNDOztJQUV0QywrQkFBcUM7Ozs7O0lBR3JDLHNDQUE4Qzs7Ozs7SUFHOUMsZ0NBQTRFOzs7OztJQUc1RSwyQkFBK0Y7O0lBRS9GLDRCQUF1RTs7Ozs7SUFHdkUseUJBSTBCOzs7OztJQUUxQiwyQkFBb0I7Ozs7O0lBRXBCLDhCQUFtQzs7Ozs7SUFFbkMsaUNBQTZCOzs7OztJQUU3Qiw4QkFBbUM7Ozs7O0lBRW5DLGdDQUFvQzs7Ozs7O0lBR3BDLDZCQUFtQzs7Ozs7SUFFbkMsOEJBQW1DOzs7Ozs7OztJQU9uQywwQ0FBb0Q7Ozs7OztJQUdwRCw4QkFBd0M7Ozs7OztJQUd4Qyx5Q0FBa0Q7Ozs7OztJQUdsRCx3Q0FBaUQ7Ozs7OztJQUdqRCw2Q0FBc0Q7Ozs7OztJQUd0RCwwQ0FBbUQ7O0lBd0duRCw4QkFBcUI7O0lBR3JCLDZCQUEwQzs7Ozs7SUErSzFDLGlDQUF1RDs7Ozs7SUF2Um5ELCtCQUE2Qzs7Ozs7SUFDN0Msc0NBQTRDOztJQUU1QyxrQ0FBb0U7Ozs7O0lBQ3BFLGlDQUE0RTs7Ozs7SUFDNUUsd0JBQXVDOztJQUl2Qyw0QkFBMkM7O0lBQzNDLG9DQUEyRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBEb0NoZWNrLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgU2VsZixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgRm9ybUNvbnRyb2xOYW1lLFxuICAgIEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICBOR19WQUxJREFUT1JTLFxuICAgIE5nQ29udHJvbCxcbiAgICBOZ0Zvcm0sXG4gICAgTmdNb2RlbCxcbiAgICBWYWxpZGF0b3Jcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9jdXNLZXlNYW5hZ2VyIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2ExMXknO1xuaW1wb3J0IHsgQkFDS1NQQUNFLCBFTkQsIEhPTUUgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgICBDYW5VcGRhdGVFcnJvclN0YXRlLFxuICAgIENhblVwZGF0ZUVycm9yU3RhdGVDdG9yLFxuICAgIEVycm9yU3RhdGVNYXRjaGVyLFxuICAgIE1DX1ZBTElEQVRJT04sXG4gICAgTWNWYWxpZGF0aW9uT3B0aW9ucyxcbiAgICBtaXhpbkVycm9yU3RhdGUsXG4gICAgc2V0TW9zYWljVmFsaWRhdGlvblxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0NsZWFuZXIsIE1jRm9ybUZpZWxkQ29udHJvbCB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9mb3JtLWZpZWxkJztcbmltcG9ydCB7IG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNY1RhZ1RleHRDb250cm9sIH0gZnJvbSAnLi90YWctdGV4dC1jb250cm9sJztcbmltcG9ydCB7IE1jVGFnLCBNY1RhZ0V2ZW50LCBNY1RhZ1NlbGVjdGlvbkNoYW5nZSB9IGZyb20gJy4vdGFnLmNvbXBvbmVudCc7XG5cblxuZXhwb3J0IGNsYXNzIE1jVGFnTGlzdEJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICAgICAgcHVibGljIHBhcmVudEZvcm06IE5nRm9ybSxcbiAgICAgICAgcHVibGljIHBhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgICAgICBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2xcbiAgICApIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jVGFnTGlzdE1peGluQmFzZTogQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IgJiB0eXBlb2YgTWNUYWdMaXN0QmFzZSA9IG1peGluRXJyb3JTdGF0ZShNY1RhZ0xpc3RCYXNlKTtcblxuXG4vLyBJbmNyZWFzaW5nIGludGVnZXIgZm9yIGdlbmVyYXRpbmcgdW5pcXVlIGlkcyBmb3IgdGFnLWxpc3QgY29tcG9uZW50cy5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG4vKiogQ2hhbmdlIGV2ZW50IG9iamVjdCB0aGF0IGlzIGVtaXR0ZWQgd2hlbiB0aGUgdGFnIGxpc3QgdmFsdWUgaGFzIGNoYW5nZWQuICovXG5leHBvcnQgY2xhc3MgTWNUYWdMaXN0Q2hhbmdlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlOiBNY1RhZ0xpc3QsIHB1YmxpYyB2YWx1ZTogYW55KSB7fVxufVxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFnLWxpc3QnLFxuICAgIGV4cG9ydEFzOiAnbWNUYWdMaXN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJ3RhZy1saXN0LnBhcnRpYWwuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3RhZy1saXN0LnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdGFnLWxpc3QnLFxuICAgICAgICAnW2NsYXNzLm1jLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgICAgICdbY2xhc3MubWMtaW52YWxpZF0nOiAnZXJyb3JTdGF0ZScsXG5cbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICdkaXNhYmxlZCA/IG51bGwgOiB0YWJJbmRleCcsXG4gICAgICAgICdbaWRdJzogJ3VpZCcsXG5cbiAgICAgICAgJyhmb2N1cyknOiAnZm9jdXMoKScsXG4gICAgICAgICcoYmx1ciknOiAnYmx1cigpJyxcbiAgICAgICAgJyhrZXlkb3duKSc6ICdrZXlkb3duKCRldmVudCknXG4gICAgfSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTWNGb3JtRmllbGRDb250cm9sLCB1c2VFeGlzdGluZzogTWNUYWdMaXN0IH1dXG59KVxuZXhwb3J0IGNsYXNzIE1jVGFnTGlzdCBleHRlbmRzIE1jVGFnTGlzdE1peGluQmFzZSBpbXBsZW1lbnRzIE1jRm9ybUZpZWxkQ29udHJvbDxhbnk+LFxuICAgIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlckNvbnRlbnRJbml0LCBEb0NoZWNrLCBPbkluaXQsIE9uRGVzdHJveSwgQ2FuVXBkYXRlRXJyb3JTdGF0ZSB7XG5cbiAgICByZWFkb25seSBjb250cm9sVHlwZTogc3RyaW5nID0gJ21jLXRhZy1saXN0JztcblxuICAgIC8qKiBDb21iaW5lZCBzdHJlYW0gb2YgYWxsIG9mIHRoZSBjaGlsZCB0YWdzJyBzZWxlY3Rpb24gY2hhbmdlIGV2ZW50cy4gKi9cbiAgICBnZXQgdGFnU2VsZWN0aW9uQ2hhbmdlcygpOiBPYnNlcnZhYmxlPE1jVGFnU2VsZWN0aW9uQ2hhbmdlPiB7XG4gICAgICAgIHJldHVybiBtZXJnZSguLi50aGlzLnRhZ3MubWFwKCh0YWcpID0+IHRhZy5zZWxlY3Rpb25DaGFuZ2UpKTtcbiAgICB9XG5cbiAgICAvKiogQ29tYmluZWQgc3RyZWFtIG9mIGFsbCBvZiB0aGUgY2hpbGQgdGFncycgZm9jdXMgY2hhbmdlIGV2ZW50cy4gKi9cbiAgICBnZXQgdGFnRm9jdXNDaGFuZ2VzKCk6IE9ic2VydmFibGU8TWNUYWdFdmVudD4ge1xuICAgICAgICByZXR1cm4gbWVyZ2UoLi4udGhpcy50YWdzLm1hcCgodGFnKSA9PiB0YWcub25Gb2N1cykpO1xuICAgIH1cblxuICAgIC8qKiBDb21iaW5lZCBzdHJlYW0gb2YgYWxsIG9mIHRoZSBjaGlsZCB0YWdzJyBibHVyIGNoYW5nZSBldmVudHMuICovXG4gICAgZ2V0IHRhZ0JsdXJDaGFuZ2VzKCk6IE9ic2VydmFibGU8TWNUYWdFdmVudD4ge1xuICAgICAgICByZXR1cm4gbWVyZ2UoLi4udGhpcy50YWdzLm1hcCgodGFnKSA9PiB0YWcub25CbHVyKSk7XG4gICAgfVxuXG4gICAgLyoqIENvbWJpbmVkIHN0cmVhbSBvZiBhbGwgb2YgdGhlIGNoaWxkIHRhZ3MnIHJlbW92ZSBjaGFuZ2UgZXZlbnRzLiAqL1xuICAgIGdldCB0YWdSZW1vdmVDaGFuZ2VzKCk6IE9ic2VydmFibGU8TWNUYWdFdmVudD4ge1xuICAgICAgICByZXR1cm4gbWVyZ2UoLi4udGhpcy50YWdzLm1hcCgodGFnKSA9PiB0YWcuZGVzdHJveWVkKSk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBhcnJheSBvZiBzZWxlY3RlZCB0YWdzIGluc2lkZSB0YWcgbGlzdC4gKi9cbiAgICBnZXQgc2VsZWN0ZWQoKTogTWNUYWdbXSB8IE1jVGFnIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGUgPyB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdGVkIDogdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZFswXTtcbiAgICB9XG5cbiAgICBnZXQgY2FuU2hvd0NsZWFuZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsZWFuZXIgJiYgdGhpcy50YWdzLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHVzZXIgc2hvdWxkIGJlIGFsbG93ZWQgdG8gc2VsZWN0IG11bHRpcGxlIHRhZ3MuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgbXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tdWx0aXBsZTtcbiAgICB9XG5cbiAgICBzZXQgbXVsdGlwbGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fbXVsdGlwbGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgZnVuY3Rpb24gdG8gY29tcGFyZSB0aGUgb3B0aW9uIHZhbHVlcyB3aXRoIHRoZSBzZWxlY3RlZCB2YWx1ZXMuIFRoZSBmaXJzdCBhcmd1bWVudFxuICAgICAqIGlzIGEgdmFsdWUgZnJvbSBhbiBvcHRpb24uIFRoZSBzZWNvbmQgaXMgYSB2YWx1ZSBmcm9tIHRoZSBzZWxlY3Rpb24uIEEgYm9vbGVhblxuICAgICAqIHNob3VsZCBiZSByZXR1cm5lZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBjb21wYXJlV2l0aCgpOiAobzE6IGFueSwgbzI6IGFueSkgPT4gYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wYXJlV2l0aDtcbiAgICB9XG5cbiAgICBzZXQgY29tcGFyZVdpdGgoZm46IChvMTogYW55LCBvMjogYW55KSA9PiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2NvbXBhcmVXaXRoID0gZm47XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZWwpIHtcbiAgICAgICAgICAgIC8vIEEgZGlmZmVyZW50IGNvbXBhcmF0b3IgbWVhbnMgdGhlIHNlbGVjdGlvbiBjb3VsZCBjaGFuZ2UuXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy53cml0ZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnRhZ0lucHV0ID8gdGhpcy50YWdJbnB1dC5pZCA6IHRoaXMudWlkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVpcmVkO1xuICAgIH1cblxuICAgIHNldCByZXF1aXJlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9yZXF1aXJlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBwbGFjZWhvbGRlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy50YWdJbnB1dCA/IHRoaXMudGFnSW5wdXQucGxhY2Vob2xkZXIgOiB0aGlzLl9wbGFjZWhvbGRlcjtcbiAgICB9XG5cbiAgICBzZXQgcGxhY2Vob2xkZXIodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHZhbHVlO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgYW55IHRhZ3Mgb3IgdGhlIG1jVGFnSW5wdXQgaW5zaWRlIG9mIHRoaXMgdGFnLWxpc3QgaGFzIGZvY3VzLiAqL1xuICAgIGdldCBmb2N1c2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKHRoaXMudGFnSW5wdXQgJiYgdGhpcy50YWdJbnB1dC5mb2N1c2VkKSB8fCB0aGlzLmhhc0ZvY3VzZWRUYWcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKCF0aGlzLnRhZ0lucHV0IHx8IHRoaXMudGFnSW5wdXQuZW1wdHkpICYmIHRoaXMudGFncy5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldCBzaG91bGRMYWJlbEZsb2F0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuZW1wdHkgfHwgdGhpcy5mb2N1c2VkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmdDb250cm9sID8gISF0aGlzLm5nQ29udHJvbC5kaXNhYmxlZCA6IHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuc3luY1RhZ3NEaXNhYmxlZFN0YXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBvciBub3QgdGhpcyB0YWcgbGlzdCBpcyBzZWxlY3RhYmxlLiBXaGVuIGEgdGFnIGxpc3QgaXMgbm90IHNlbGVjdGFibGUsXG4gICAgICogdGhlIHNlbGVjdGVkIHN0YXRlcyBmb3IgYWxsIHRoZSB0YWdzIGluc2lkZSB0aGUgdGFnIGxpc3QgYXJlIGFsd2F5cyBpZ25vcmVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNlbGVjdGFibGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RhYmxlO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RhYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGFibGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLnRhZ3MpIHtcbiAgICAgICAgICAgIHRoaXMudGFncy5mb3JFYWNoKCh0YWcpID0+IHRhZy50YWdMaXN0U2VsZWN0YWJsZSA9IHRoaXMuX3NlbGVjdGFibGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBnZXQgdGFiSW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RhYkluZGV4O1xuICAgIH1cblxuICAgIHNldCB0YWJJbmRleCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMudXNlclRhYkluZGV4ID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX3RhYkluZGV4ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdGFiSW5kZXggPSAwO1xuXG4gICAgLyoqXG4gICAgICogRXZlbnQgdGhhdCBlbWl0cyB3aGVuZXZlciB0aGUgcmF3IHZhbHVlIG9mIHRoZSB0YWctbGlzdCBjaGFuZ2VzLiBUaGlzIGlzIGhlcmUgcHJpbWFyaWx5XG4gICAgICogdG8gZmFjaWxpdGF0ZSB0aGUgdHdvLXdheSBiaW5kaW5nIGZvciB0aGUgYHZhbHVlYCBpbnB1dC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgdWlkOiBzdHJpbmcgPSBgbWMtdGFnLWxpc3QtJHtuZXh0VW5pcXVlSWQrK31gO1xuXG4gICAgLyoqXG4gICAgICogVXNlciBkZWZpbmVkIHRhYiBpbmRleC5cbiAgICAgKiBXaGVuIGl0IGlzIG5vdCBudWxsLCB1c2UgdXNlciBkZWZpbmVkIHRhYiBpbmRleC4gT3RoZXJ3aXNlIHVzZSB0YWJJbmRleFxuICAgICAqL1xuICAgIHVzZXJUYWJJbmRleDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICBrZXlNYW5hZ2VyOiBGb2N1c0tleU1hbmFnZXI8TWNUYWc+O1xuXG4gICAgc2VsZWN0aW9uTW9kZWw6IFNlbGVjdGlvbk1vZGVsPE1jVGFnPjtcblxuICAgIHRhZ0NoYW5nZXMgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIC8qKiBBbiBvYmplY3QgdXNlZCB0byBjb250cm9sIHdoZW4gZXJyb3IgbWVzc2FnZXMgYXJlIHNob3duLiAqL1xuICAgIEBJbnB1dCgpIGVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcjtcblxuICAgIC8qKiBPcmllbnRhdGlvbiBvZiB0aGUgdGFnIGxpc3QuICovXG4gICAgQElucHV0KCdvcmllbnRhdGlvbicpIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0ZWQgdGFnIGxpc3QgdmFsdWUgaGFzIGJlZW4gY2hhbmdlZCBieSB0aGUgdXNlci4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8TWNUYWdMaXN0Q2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWNUYWdMaXN0Q2hhbmdlPigpO1xuXG4gICAgQENvbnRlbnRDaGlsZCgnbWNUYWdMaXN0Q2xlYW5lcicsIHsgc3RhdGljOiB0cnVlIH0pIGNsZWFuZXI6IE1jQ2xlYW5lcjtcblxuICAgIC8qKiBUaGUgdGFnIGNvbXBvbmVudHMgY29udGFpbmVkIHdpdGhpbiB0aGlzIHRhZyBsaXN0LiAqL1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNUYWcsIHtcbiAgICAgICAgLy8gTmVlZCB0byB1c2UgYGRlc2NlbmRhbnRzOiB0cnVlYCxcbiAgICAgICAgLy8gSXZ5IHdpbGwgbm8gbG9uZ2VyIG1hdGNoIGluZGlyZWN0IGRlc2NlbmRhbnRzIGlmIGl0J3MgbGVmdCBhcyBmYWxzZS5cbiAgICAgICAgZGVzY2VuZGFudHM6IHRydWVcbiAgICB9KSB0YWdzOiBRdWVyeUxpc3Q8TWNUYWc+O1xuXG4gICAgcHJpdmF0ZSBfdmFsdWU6IGFueTtcblxuICAgIHByaXZhdGUgX3JlcXVpcmVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF9wbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX3NlbGVjdGFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIFRoZSB0YWcgaW5wdXQgdG8gYWRkIG1vcmUgdGFncyAqL1xuICAgIHByaXZhdGUgdGFnSW5wdXQ6IE1jVGFnVGV4dENvbnRyb2w7XG5cbiAgICBwcml2YXRlIF9tdWx0aXBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogV2hlbiBhIHRhZyBpcyBkZXN0cm95ZWQsIHdlIHN0b3JlIHRoZSBpbmRleCBvZiB0aGUgZGVzdHJveWVkIHRhZyB1bnRpbCB0aGUgdGFnc1xuICAgICAqIHF1ZXJ5IGxpc3Qgbm90aWZpZXMgYWJvdXQgdGhlIHVwZGF0ZS4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSB3ZSBjYW5ub3QgZGV0ZXJtaW5lIGFuXG4gICAgICogYXBwcm9wcmlhdGUgdGFnIHRoYXQgc2hvdWxkIHJlY2VpdmUgZm9jdXMgdW50aWwgdGhlIGFycmF5IG9mIHRhZ3MgdXBkYXRlZCBjb21wbGV0ZWx5LlxuICAgICAqL1xuICAgIHByaXZhdGUgbGFzdERlc3Ryb3llZFRhZ0luZGV4OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAgIC8qKiBTdWJqZWN0IHRoYXQgZW1pdHMgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGRlc3Ryb3llZC4gKi9cbiAgICBwcml2YXRlIGRlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICAvKiogU3Vic2NyaXB0aW9uIHRvIGZvY3VzIGNoYW5nZXMgaW4gdGhlIHRhZ3MuICovXG4gICAgcHJpdmF0ZSB0YWdGb2N1c1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbDtcblxuICAgIC8qKiBTdWJzY3JpcHRpb24gdG8gYmx1ciBjaGFuZ2VzIGluIHRoZSB0YWdzLiAqL1xuICAgIHByaXZhdGUgdGFnQmx1clN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbDtcblxuICAgIC8qKiBTdWJzY3JpcHRpb24gdG8gc2VsZWN0aW9uIGNoYW5nZXMgaW4gdGFncy4gKi9cbiAgICBwcml2YXRlIHRhZ1NlbGVjdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbDtcblxuICAgIC8qKiBTdWJzY3JpcHRpb24gdG8gcmVtb3ZlIGNoYW5nZXMgaW4gdGFncy4gKi9cbiAgICBwcml2YXRlIHRhZ1JlbW92ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE5HX1ZBTElEQVRPUlMpIHB1YmxpYyByYXdWYWxpZGF0b3JzOiBWYWxpZGF0b3JbXSxcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQ19WQUxJREFUSU9OKSBwcml2YXRlIG1jVmFsaWRhdGlvbjogTWNWYWxpZGF0aW9uT3B0aW9ucyxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICBAT3B0aW9uYWwoKSBwYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgICAgIEBPcHRpb25hbCgpIHBhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIG5nQ29udHJvbDogTmdDb250cm9sLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHB1YmxpYyBuZ01vZGVsOiBOZ01vZGVsLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHB1YmxpYyBmb3JtQ29udHJvbE5hbWU6IEZvcm1Db250cm9sTmFtZVxuICAgICkge1xuICAgICAgICBzdXBlcihkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXIsIHBhcmVudEZvcm0sIHBhcmVudEZvcm1Hcm91cCwgbmdDb250cm9sKTtcblxuICAgICAgICBpZiAodGhpcy5uZ0NvbnRyb2wpIHtcbiAgICAgICAgICAgIHRoaXMubmdDb250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICBpZiAodGhpcy5tY1ZhbGlkYXRpb24udXNlVmFsaWRhdGlvbikge1xuICAgICAgICAgICAgc2V0TW9zYWljVmFsaWRhdGlvbih0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMua2V5TWFuYWdlciA9IG5ldyBGb2N1c0tleU1hbmFnZXI8TWNUYWc+KHRoaXMudGFncylcbiAgICAgICAgICAgIC53aXRoVmVydGljYWxPcmllbnRhdGlvbigpXG4gICAgICAgICAgICAud2l0aEhvcml6b250YWxPcmllbnRhdGlvbih0aGlzLmRpciA/IHRoaXMuZGlyLnZhbHVlIDogJ2x0cicpO1xuXG4gICAgICAgIGlmICh0aGlzLmRpcikge1xuICAgICAgICAgICAgdGhpcy5kaXIuY2hhbmdlXG4gICAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChkaXIpID0+IHRoaXMua2V5TWFuYWdlci53aXRoSG9yaXpvbnRhbE9yaWVudGF0aW9uKGRpcikpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUHJldmVudHMgdGhlIHRhZyBsaXN0IGZyb20gY2FwdHVyaW5nIGZvY3VzIGFuZCByZWRpcmVjdGluZ1xuICAgICAgICAvLyBpdCBiYWNrIHRvIHRoZSBmaXJzdCB0YWcgd2hlbiB0aGUgdXNlciB0YWJzIG91dC5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnRhYk91dFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RhYkluZGV4ID0gLTE7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGFiSW5kZXggPSB0aGlzLnVzZXJUYWJJbmRleCB8fCAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gV2hlbiB0aGUgbGlzdCBjaGFuZ2VzLCByZS1zdWJzY3JpYmVcbiAgICAgICAgdGhpcy50YWdzLmNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKHN0YXJ0V2l0aChudWxsKSwgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNpbmNlIHRoaXMgaGFwcGVucyBhZnRlciB0aGUgY29udGVudCBoYXMgYmVlblxuICAgICAgICAgICAgICAgICAgICAvLyBjaGVja2VkLCB3ZSBuZWVkIHRvIGRlZmVyIGl0IHRvIHRoZSBuZXh0IHRpY2suXG4gICAgICAgICAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4geyB0aGlzLnN5bmNUYWdzRGlzYWJsZWRTdGF0ZSgpOyB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0VGFncygpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmVzZXQgdGFncyBzZWxlY3RlZC9kZXNlbGVjdGVkIHN0YXR1c1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNlbGVjdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHdlIG5lZWQgdG8gdXBkYXRlIG91ciB0YWIgaW5kZXhcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRhYkluZGV4KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgd2UgaGF2ZSBhIGRlc3Ryb3llZCB0YWcgYW5kIG5lZWQgdG8gcmVmb2N1c1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRm9jdXNGb3JEZXN0cm95ZWRUYWdzKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBEZWZlciBzZXR0aW5nIHRoZSB2YWx1ZSBpbiBvcmRlciB0byBhdm9pZCB0aGUgXCJFeHByZXNzaW9uXG4gICAgICAgICAgICAgICAgLy8gaGFzIGNoYW5nZWQgYWZ0ZXIgaXQgd2FzIGNoZWNrZWRcIiBlcnJvcnMgZnJvbSBBbmd1bGFyLlxuICAgICAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZ0NoYW5nZXMuZW1pdCh0aGlzLnRhZ3MudG9BcnJheSgpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZVRhZ3NDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbCA9IG5ldyBTZWxlY3Rpb25Nb2RlbDxNY1RhZz4odGhpcy5tdWx0aXBsZSwgdW5kZWZpbmVkLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBuZ0RvQ2hlY2soKSB7XG4gICAgICAgIGlmICh0aGlzLm5nQ29udHJvbCkge1xuICAgICAgICAgICAgLy8gV2UgbmVlZCB0byByZS1ldmFsdWF0ZSB0aGlzIG9uIGV2ZXJ5IGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUsIGJlY2F1c2UgdGhlcmUgYXJlIHNvbWVcbiAgICAgICAgICAgIC8vIGVycm9yIHRyaWdnZXJzIHRoYXQgd2UgY2FuJ3Qgc3Vic2NyaWJlIHRvIChlLmcuIHBhcmVudCBmb3JtIHN1Ym1pc3Npb25zKS4gVGhpcyBtZWFuc1xuICAgICAgICAgICAgLy8gdGhhdCB3aGF0ZXZlciBsb2dpYyBpcyBpbiBoZXJlIGhhcyB0byBiZSBzdXBlciBsZWFuIG9yIHdlIHJpc2sgZGVzdHJveWluZyB0aGUgcGVyZm9ybWFuY2UuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUVycm9yU3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3llZC5uZXh0KCk7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLmNvbXBsZXRlKCk7XG5cbiAgICAgICAgdGhpcy5kcm9wU3Vic2NyaXB0aW9ucygpO1xuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eVxuICAgIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5XG4gICAgb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgICAvKiogQXNzb2NpYXRlcyBhbiBIVE1MIGlucHV0IGVsZW1lbnQgd2l0aCB0aGlzIHRhZyBsaXN0LiAqL1xuICAgIHJlZ2lzdGVySW5wdXQoaW5wdXRFbGVtZW50OiBNY1RhZ1RleHRDb250cm9sKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFnSW5wdXQgPSBpbnB1dEVsZW1lbnQ7XG5cbiAgICAgICAgLy8gdG9kbyBuZWVkIHJldGhpbmsgYWJvdXQgaXRcbiAgICAgICAgaWYgKHRoaXMubmdDb250cm9sICYmIGlucHV0RWxlbWVudC5uZ0NvbnRyb2w/LnN0YXR1c0NoYW5nZXMpIHtcbiAgICAgICAgICAgIGlucHV0RWxlbWVudC5uZ0NvbnRyb2wuc3RhdHVzQ2hhbmdlc1xuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5uZ0NvbnRyb2wuY29udHJvbCEuc2V0RXJyb3JzKGlucHV0RWxlbWVudC5uZ0NvbnRyb2whLmVycm9ycykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudGFncykge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25CeVZhbHVlKHZhbHVlLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgb25Db250YWluZXJDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMub3JpZ2luYXRlc0Zyb21UYWcoZXZlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb2N1c2VzIHRoZSBmaXJzdCBub24tZGlzYWJsZWQgdGFnIGluIHRoaXMgdGFnIGxpc3QsIG9yIHRoZSBhc3NvY2lhdGVkIGlucHV0IHdoZW4gdGhlcmVcbiAgICAgKiBhcmUgbm8gZWxpZ2libGUgdGFncy5cbiAgICAgKi9cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgLy8gVE9ETzogQVJJQSBzYXlzIHRoaXMgc2hvdWxkIGZvY3VzIHRoZSBmaXJzdCBgc2VsZWN0ZWRgIHRhZyBpZiBhbnkgYXJlIHNlbGVjdGVkLlxuICAgICAgICAvLyBGb2N1cyBvbiBmaXJzdCBlbGVtZW50IGlmIHRoZXJlJ3Mgbm8gdGFnSW5wdXQgaW5zaWRlIHRhZy1saXN0XG4gICAgICAgIGlmICh0aGlzLnRhZ0lucHV0ICYmIHRoaXMudGFnSW5wdXQuZm9jdXNlZCkge1xuICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGFncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzSW5wdXQoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBBdHRlbXB0IHRvIGZvY3VzIGFuIGlucHV0IGlmIHdlIGhhdmUgb25lLiAqL1xuICAgIGZvY3VzSW5wdXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnRhZ0lucHV0KSB7XG4gICAgICAgICAgICB0aGlzLnRhZ0lucHV0LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXNzIGV2ZW50cyB0byB0aGUga2V5Ym9hcmQgbWFuYWdlci4gQXZhaWxhYmxlIGhlcmUgZm9yIHRlc3RzLlxuICAgICAqL1xuICAgIGtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuXG4gICAgICAgIC8vIElmIHRoZXkgYXJlIG9uIGFuIGVtcHR5IGlucHV0IGFuZCBoaXQgYmFja3NwYWNlLCBmb2N1cyB0aGUgbGFzdCB0YWdcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gQkFDS1NQQUNFICYmIHRoaXMuaXNJbnB1dEVtcHR5KHRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRMYXN0SXRlbUFjdGl2ZSgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQgJiYgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWMtdGFnJykpIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBIT01FKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IEVORCkge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRMYXN0SXRlbUFjdGl2ZSgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRTZWxlY3Rpb25CeVZhbHVlKHZhbHVlOiBhbnksIGlzVXNlcklucHV0OiBib29sZWFuID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMudGFncy5mb3JFYWNoKCh0YWcpID0+IHRhZy5kZXNlbGVjdCgpKTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlLmZvckVhY2goKGN1cnJlbnRWYWx1ZSkgPT4gdGhpcy5zZWxlY3RWYWx1ZShjdXJyZW50VmFsdWUsIGlzVXNlcklucHV0KSk7XG4gICAgICAgICAgICB0aGlzLnNvcnRWYWx1ZXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGNvcnJlc3BvbmRpbmdUYWcgPSB0aGlzLnNlbGVjdFZhbHVlKHZhbHVlLCBpc1VzZXJJbnB1dCk7XG5cbiAgICAgICAgICAgIC8vIFNoaWZ0IGZvY3VzIHRvIHRoZSBhY3RpdmUgaXRlbS4gTm90ZSB0aGF0IHdlIHNob3VsZG4ndCBkbyB0aGlzIGluIG11bHRpcGxlXG4gICAgICAgICAgICAvLyBtb2RlLCBiZWNhdXNlIHdlIGRvbid0IGtub3cgd2hhdCB0YWcgdGhlIHVzZXIgaW50ZXJhY3RlZCB3aXRoIGxhc3QuXG4gICAgICAgICAgICBpZiAoY29ycmVzcG9uZGluZ1RhZyAmJiBpc1VzZXJJbnB1dCkge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKGNvcnJlc3BvbmRpbmdUYWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFdoZW4gYmx1cnJlZCwgbWFyayB0aGUgZmllbGQgYXMgdG91Y2hlZCB3aGVuIGZvY3VzIG1vdmVkIG91dHNpZGUgdGhlIHRhZyBsaXN0LiAqL1xuICAgIGJsdXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNGb2N1c2VkVGFnKCkpIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKC0xKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudGFnSW5wdXQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSdzIGEgdGFnIGlucHV0LCB3ZSBzaG91bGQgY2hlY2sgd2hldGhlciB0aGUgZm9jdXMgbW92ZWQgdG8gdGFnIGlucHV0LlxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBmb2N1cyBpcyBub3QgbW92ZWQgdG8gdGFnIGlucHV0LCBtYXJrIHRoZSBmaWVsZCBhcyB0b3VjaGVkLiBJZiB0aGUgZm9jdXMgbW92ZWRcbiAgICAgICAgICAgICAgICAvLyB0byB0YWcgaW5wdXQsIGRvIG5vdGhpbmcuXG4gICAgICAgICAgICAgICAgLy8gVGltZW91dCBpcyBuZWVkZWQgdG8gd2FpdCBmb3IgdGhlIGZvY3VzKCkgZXZlbnQgdHJpZ2dlciBvbiB0YWcgaW5wdXQuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5mb2N1c2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtBc1RvdWNoZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSdzIG5vIHRhZyBpbnB1dCwgdGhlbiBtYXJrIHRoZSBmaWVsZCBhcyB0b3VjaGVkLlxuICAgICAgICAgICAgICAgIHRoaXMubWFya0FzVG91Y2hlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIE1hcmsgdGhlIGZpZWxkIGFzIHRvdWNoZWQgKi9cbiAgICBtYXJrQXNUb3VjaGVkKCkge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhlIHRhYiBpbmRleCBhcyB5b3Ugc2hvdWxkIG5vdCBiZSBhbGxvd2VkIHRvIGZvY3VzIGFuIGVtcHR5IGxpc3QuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVRhYkluZGV4KCk6IHZvaWQge1xuICAgICAgICAvLyBJZiB3ZSBoYXZlIDAgdGFncywgd2Ugc2hvdWxkIG5vdCBhbGxvdyBrZXlib2FyZCBmb2N1c1xuICAgICAgICB0aGlzLl90YWJJbmRleCA9IHRoaXMudXNlclRhYkluZGV4IHx8ICh0aGlzLnRhZ3MubGVuZ3RoID09PSAwID8gLTEgOiAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZiB0aGUgYW1vdW50IG9mIHRhZ3MgY2hhbmdlZCwgd2UgbmVlZCB0byB1cGRhdGUgdGhlXG4gICAgICoga2V5IG1hbmFnZXIgc3RhdGUgYW5kIGZvY3VzIHRoZSBuZXh0IGNsb3Nlc3QgdGFnLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCB1cGRhdGVGb2N1c0ZvckRlc3Ryb3llZFRhZ3MoKSB7XG4gICAgICAgIGlmICh0aGlzLmxhc3REZXN0cm95ZWRUYWdJbmRleCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50YWdzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1RhZ0luZGV4ID0gTWF0aC5taW4odGhpcy5sYXN0RGVzdHJveWVkVGFnSW5kZXgsIHRoaXMudGFncy5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShuZXdUYWdJbmRleCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNJbnB1dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYXN0RGVzdHJveWVkVGFnSW5kZXggPSBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NvbXBhcmVXaXRoID0gKG8xOiBhbnksIG8yOiBhbnkpID0+IG8xID09PSBvMjtcblxuICAgIC8qKlxuICAgICAqIFV0aWxpdHkgdG8gZW5zdXJlIGFsbCBpbmRleGVzIGFyZSB2YWxpZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggdG8gYmUgY2hlY2tlZC5cbiAgICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpbmRleCBpcyB2YWxpZCBmb3Igb3VyIGxpc3Qgb2YgdGFncy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGlzVmFsaWRJbmRleChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy50YWdzLmxlbmd0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzSW5wdXRFbXB0eShlbGVtZW50OiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoZWxlbWVudCAmJiBlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbnB1dCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgICAgICAgICByZXR1cm4gIWlucHV0LnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmRzIGFuZCBzZWxlY3RzIHRoZSB0YWcgYmFzZWQgb24gaXRzIHZhbHVlLlxuICAgICAqIEByZXR1cm5zIFRhZyB0aGF0IGhhcyB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNlbGVjdFZhbHVlKHZhbHVlOiBhbnksIGlzVXNlcklucHV0OiBib29sZWFuID0gdHJ1ZSk6IE1jVGFnIHwgdW5kZWZpbmVkIHtcblxuICAgICAgICBjb25zdCBjb3JyZXNwb25kaW5nVGFnID0gdGhpcy50YWdzLmZpbmQoKHRhZykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRhZy52YWx1ZSAhPSBudWxsICYmIHRoaXMuX2NvbXBhcmVXaXRoKHRhZy52YWx1ZSwgdmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoY29ycmVzcG9uZGluZ1RhZykge1xuICAgICAgICAgICAgaWYgKGlzVXNlcklucHV0KSB7XG4gICAgICAgICAgICAgICAgY29ycmVzcG9uZGluZ1RhZy5zZWxlY3RWaWFJbnRlcmFjdGlvbigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3JyZXNwb25kaW5nVGFnLnNlbGVjdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdChjb3JyZXNwb25kaW5nVGFnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb3JyZXNwb25kaW5nVGFnO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZVNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICAgICAgLy8gRGVmZXIgc2V0dGluZyB0aGUgdmFsdWUgaW4gb3JkZXIgdG8gYXZvaWQgdGhlIFwiRXhwcmVzc2lvblxuICAgICAgICAvLyBoYXMgY2hhbmdlZCBhZnRlciBpdCB3YXMgY2hlY2tlZFwiIGVycm9ycyBmcm9tIEFuZ3VsYXIuXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMubmdDb250cm9sIHx8IHRoaXMuX3ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25CeVZhbHVlKHRoaXMubmdDb250cm9sID8gdGhpcy5uZ0NvbnRyb2wudmFsdWUgOiB0aGlzLl92YWx1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVzZWxlY3RzIGV2ZXJ5IHRhZyBpbiB0aGUgbGlzdC5cbiAgICAgKiBAcGFyYW0gc2tpcCBUYWcgdGhhdCBzaG91bGQgbm90IGJlIGRlc2VsZWN0ZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjbGVhclNlbGVjdGlvbihza2lwPzogTWNUYWcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuICAgICAgICB0aGlzLnRhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XG4gICAgICAgICAgICBpZiAodGFnICE9PSBza2lwKSB7XG4gICAgICAgICAgICAgICAgdGFnLmRlc2VsZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU29ydHMgdGhlIG1vZGVsIHZhbHVlcywgZW5zdXJpbmcgdGhhdCB0aGV5IGtlZXAgdGhlIHNhbWVcbiAgICAgKiBvcmRlciB0aGF0IHRoZXkgaGF2ZSBpbiB0aGUgcGFuZWwuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzb3J0VmFsdWVzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcblxuICAgICAgICAgICAgdGhpcy50YWdzLmZvckVhY2goKHRhZykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0YWcuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3QodGFnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBFbWl0cyBjaGFuZ2UgZXZlbnQgdG8gc2V0IHRoZSBtb2RlbCB2YWx1ZS4gKi9cbiAgICAvLyB0b2RvIG5lZWQgcmV0aGluayB0aGlzIG1ldGhvZCBhbmQgc2VsZWN0aW9uIGxvZ2ljXG4gICAgcHJpdmF0ZSBwcm9wYWdhdGVDaGFuZ2VzKGZhbGxiYWNrVmFsdWU/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgbGV0IHZhbHVlVG9FbWl0OiBhbnkgPSBudWxsO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuc2VsZWN0ZWQpKSB7XG4gICAgICAgICAgICB2YWx1ZVRvRW1pdCA9IHRoaXMuc2VsZWN0ZWQubWFwKCh0YWcpID0+IHRhZy52YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZVRvRW1pdCA9IHRoaXMuc2VsZWN0ZWQgPyB0aGlzLnNlbGVjdGVkLnZhbHVlIDogZmFsbGJhY2tWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlVG9FbWl0O1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KG5ldyBNY1RhZ0xpc3RDaGFuZ2UodGhpcywgdmFsdWVUb0VtaXQpKTtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlVG9FbWl0KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZVRvRW1pdCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9wYWdhdGVUYWdzQ2hhbmdlcygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdmFsdWVUb0VtaXQ6IGFueSA9IHRoaXMudGFncy5tYXAoKHRhZykgPT4gdGFnLnZhbHVlKTtcblxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlVG9FbWl0O1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KG5ldyBNY1RhZ0xpc3RDaGFuZ2UodGhpcywgdmFsdWVUb0VtaXQpKTtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlVG9FbWl0KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZVRvRW1pdCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNldFRhZ3MoKSB7XG4gICAgICAgIHRoaXMuZHJvcFN1YnNjcmlwdGlvbnMoKTtcbiAgICAgICAgdGhpcy5saXN0ZW5Ub1RhZ3NGb2N1cygpO1xuICAgICAgICB0aGlzLmxpc3RlblRvVGFnc1NlbGVjdGlvbigpO1xuICAgICAgICB0aGlzLmxpc3RlblRvVGFnc1JlbW92ZWQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyb3BTdWJzY3JpcHRpb25zKCkge1xuICAgICAgICBpZiAodGhpcy50YWdGb2N1c1N1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy50YWdGb2N1c1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy50YWdGb2N1c1N1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50YWdCbHVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRhZ0JsdXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMudGFnQmx1clN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50YWdTZWxlY3Rpb25TdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudGFnU2VsZWN0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLnRhZ1NlbGVjdGlvblN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50YWdSZW1vdmVTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudGFnUmVtb3ZlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLnRhZ1JlbW92ZVN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogTGlzdGVucyB0byB1c2VyLWdlbmVyYXRlZCBzZWxlY3Rpb24gZXZlbnRzIG9uIGVhY2ggdGFnLiAqL1xuICAgIHByaXZhdGUgbGlzdGVuVG9UYWdzU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhZ1NlbGVjdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMudGFnU2VsZWN0aW9uQ2hhbmdlcy5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3QoZXZlbnQuc291cmNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5kZXNlbGVjdChldmVudC5zb3VyY2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBGb3Igc2luZ2xlIHNlbGVjdGlvbiB0YWcgbGlzdCwgbWFrZSBzdXJlIHRoZSBkZXNlbGVjdGVkIHZhbHVlIGlzIHVuc2VsZWN0ZWQuXG4gICAgICAgICAgICBpZiAoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5zZWxlY3Rpb25Nb2RlbC5pc1NlbGVjdGVkKHRhZykgJiYgdGFnLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWcuZGVzZWxlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXZlbnQuaXNVc2VySW5wdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIExpc3RlbnMgdG8gdXNlci1nZW5lcmF0ZWQgc2VsZWN0aW9uIGV2ZW50cyBvbiBlYWNoIHRhZy4gKi9cbiAgICBwcml2YXRlIGxpc3RlblRvVGFnc0ZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhZ0ZvY3VzU3Vic2NyaXB0aW9uID0gdGhpcy50YWdGb2N1c0NoYW5nZXMuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFnSW5kZXg6IG51bWJlciA9IHRoaXMudGFncy50b0FycmF5KCkuaW5kZXhPZihldmVudC50YWcpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkSW5kZXgodGFnSW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnVwZGF0ZUFjdGl2ZUl0ZW0odGFnSW5kZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudGFnQmx1clN1YnNjcmlwdGlvbiA9IHRoaXMudGFnQmx1ckNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYmx1cigpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxpc3RlblRvVGFnc1JlbW92ZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFnUmVtb3ZlU3Vic2NyaXB0aW9uID0gdGhpcy50YWdSZW1vdmVDaGFuZ2VzLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhZyA9IGV2ZW50LnRhZztcbiAgICAgICAgICAgIGNvbnN0IHRhZ0luZGV4ID0gdGhpcy50YWdzLnRvQXJyYXkoKS5pbmRleE9mKGV2ZW50LnRhZyk7XG5cbiAgICAgICAgICAgIC8vIEluIGNhc2UgdGhlIHRhZyB0aGF0IHdpbGwgYmUgcmVtb3ZlZCBpcyBjdXJyZW50bHkgZm9jdXNlZCwgd2UgdGVtcG9yYXJpbHkgc3RvcmVcbiAgICAgICAgICAgIC8vIHRoZSBpbmRleCBpbiBvcmRlciB0byBiZSBhYmxlIHRvIGRldGVybWluZSBhbiBhcHByb3ByaWF0ZSBzaWJsaW5nIHRhZyB0aGF0IHdpbGxcbiAgICAgICAgICAgIC8vIHJlY2VpdmUgZm9jdXMuXG4gICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkSW5kZXgodGFnSW5kZXgpICYmIHRhZy5oYXNGb2N1cykge1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdERlc3Ryb3llZFRhZ0luZGV4ID0gdGFnSW5kZXg7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNWYWxpZEluZGV4KHRhZ0luZGV4KSAmJiAhdGFnLmhhc0ZvY3VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c0lucHV0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBDaGVja3Mgd2hldGhlciBhbiBldmVudCBjb21lcyBmcm9tIGluc2lkZSBhIHRhZyBlbGVtZW50LiAqL1xuICAgIHByaXZhdGUgb3JpZ2luYXRlc0Zyb21UYWcoZXZlbnQ6IEV2ZW50KTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBjdXJyZW50RWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG5cbiAgICAgICAgd2hpbGUgKGN1cnJlbnRFbGVtZW50ICYmIGN1cnJlbnRFbGVtZW50ICE9PSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbWMtdGFnJykpIHsgcmV0dXJuIHRydWU7IH1cblxuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKiBDaGVja3Mgd2hldGhlciBhbnkgb2YgdGhlIHRhZ3MgaXMgZm9jdXNlZC4gKi9cbiAgICBwcml2YXRlIGhhc0ZvY3VzZWRUYWcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRhZ3Muc29tZSgodGFnKSA9PiB0YWcuaGFzRm9jdXMpO1xuICAgIH1cblxuICAgIC8qKiBTeW5jcyB0aGUgbGlzdCdzIGRpc2FibGVkIHN0YXRlIHdpdGggdGhlIGluZGl2aWR1YWwgdGFncy4gKi9cbiAgICBwcml2YXRlIHN5bmNUYWdzRGlzYWJsZWRTdGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMudGFncykge1xuICAgICAgICAgICAgdGhpcy50YWdzLmZvckVhY2goKHRhZykgPT4ge1xuICAgICAgICAgICAgICAgIHRhZy5kaXNhYmxlZCA9IHRoaXMuX2Rpc2FibGVkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiJdfQ==