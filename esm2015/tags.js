/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { InjectionToken, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Input, NgZone, Output, ViewEncapsulation, Optional, Self, Inject, Renderer2, NgModule } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BACKSPACE, DELETE, SPACE, END, HOME, hasModifierKey, ENTER } from '@ptsecurity/cdk/keycodes';
import { mixinColor, mixinDisabled, ErrorStateMatcher, mixinErrorState } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
import { Subject, merge } from 'rxjs';
import { take, startWith, takeUntil } from 'rxjs/operators';
import { Directionality } from '@angular/cdk/bidi';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Injection token to be used to override the default options for the chips module.
 * @type {?}
 */
const MC_TAGS_DEFAULT_OPTIONS = new InjectionToken('mc-tags-default-options');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Event object emitted by McTag when selected or deselected.
 */
class McTagSelectionChange {
    /**
     * @param {?} source
     * @param {?} selected
     * @param {?=} isUserInput
     */
    constructor(source, selected, isUserInput = false) {
        this.source = source;
        this.selected = selected;
        this.isUserInput = isUserInput;
    }
}
/** @type {?} */
const TAG_ATTRIBUTE_NAMES = ['mc-basic-tag'];
/**
 * Dummy directive to add CSS class to tag avatar.
 * \@docs-private
 */
class McTagAvatar {
}
McTagAvatar.decorators = [
    { type: Directive, args: [{
                selector: 'mc-tag-avatar, [mcTagAvatar]',
                host: { class: 'mc-tag-avatar' }
            },] },
];
/**
 * Dummy directive to add CSS class to tag trailing icon.
 * \@docs-private
 */
class McTagTrailingIcon {
}
McTagTrailingIcon.decorators = [
    { type: Directive, args: [{
                selector: 'mc-tag-trailing-icon, [mcTagTrailingIcon]',
                host: { class: 'mc-tag-trailing-icon' }
            },] },
];
class McTagBase {
    // tslint:disable-next-line:naming-convention
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
const _McTagMixinBase = mixinColor(mixinDisabled(McTagBase));
class McTag extends _McTagMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} changeDetectorRef
     * @param {?} _ngZone
     */
    constructor(elementRef, changeDetectorRef, _ngZone) {
        super(elementRef);
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this._ngZone = _ngZone;
        /**
         * Emits when the tag is focused.
         */
        this.onFocus = new Subject();
        /**
         * Emits when the tag is blured.
         */
        this.onBlur = new Subject();
        /**
         * Whether the tag has focus.
         */
        this.hasFocus = false;
        /**
         * Whether the tag list is selectable
         */
        this.tagListSelectable = true;
        /**
         * Emitted when the tag is selected or deselected.
         */
        this.selectionChange = new EventEmitter();
        /**
         * Emitted when the tag is destroyed.
         */
        this.destroyed = new EventEmitter();
        /**
         * Emitted when a tag is to be removed.
         */
        this.removed = new EventEmitter();
        this._selected = false;
        this._selectable = true;
        this._removable = true;
        this._disabled = false;
        this.addHostClassName();
        this.nativeElement = elementRef.nativeElement;
    }
    /**
     * Whether the tag is selected.
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        /** @type {?} */
        const coercedValue = coerceBooleanProperty(value);
        if (coercedValue !== this._selected) {
            this._selected = coercedValue;
            this.dispatchSelectionChange();
        }
    }
    /**
     * The value of the tag. Defaults to the content inside `<mc-tag>` tags.
     * @return {?}
     */
    get value() {
        return this._value !== undefined
            ? this._value
            : this.elementRef.nativeElement.textContent;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = value;
    }
    /**
     * Whether or not the tag is selectable. When a tag is not selectable,
     * changes to its selected state are always ignored. By default a tag is
     * selectable, and it becomes non-selectable if its parent tag list is
     * not selectable.
     * @return {?}
     */
    get selectable() {
        return this._selectable && this.tagListSelectable;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectable(value) {
        this._selectable = coerceBooleanProperty(value);
    }
    /**
     * Determines whether or not the tag displays the remove styling and emits (removed) events.
     * @return {?}
     */
    get removable() {
        return this._removable;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set removable(value) {
        this._removable = coerceBooleanProperty(value);
    }
    /**
     * @return {?}
     */
    get tabindex() {
        if (!this.selectable) {
            return null;
        }
        return this.disabled ? null : -1;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        if (value !== this.disabled) {
            this._disabled = value;
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.addClassModificatorForIcons();
    }
    /**
     * @return {?}
     */
    addClassModificatorForIcons() {
        /** @type {?} */
        const icons = this.contentChildren.map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item._elementRef.nativeElement));
        if (icons.length === 1) {
            /** @type {?} */
            const iconElement = icons[0];
            if (!iconElement.previousElementSibling && !iconElement.nextElementSibling) {
                if (iconElement.nextSibling) {
                    iconElement.classList.add('mc-icon_left');
                    this.nativeElement.classList.add('mc-left-icon');
                }
                if (iconElement.previousSibling) {
                    iconElement.classList.add('mc-icon_right');
                    this.nativeElement.classList.add('mc-right-icon');
                }
            }
        }
        else if (icons.length > 1) {
            /** @type {?} */
            const firstIconElement = icons[0];
            /** @type {?} */
            const secondIconElement = icons[1];
            firstIconElement.classList.add('mc-icon_left');
            secondIconElement.classList.add('mc-icon_right');
        }
    }
    /**
     * @return {?}
     */
    addHostClassName() {
        // Add class for the different tags
        for (const attr of TAG_ATTRIBUTE_NAMES) {
            if (this.elementRef.nativeElement.hasAttribute(attr) ||
                this.elementRef.nativeElement.tagName.toLowerCase() === attr) {
                ((/** @type {?} */ (this.elementRef.nativeElement))).classList.add(attr);
                return;
            }
        }
        ((/** @type {?} */ (this.elementRef.nativeElement))).classList.add('mc-standard-tag');
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyed.emit({ tag: this });
    }
    /**
     * @return {?}
     */
    select() {
        if (!this._selected) {
            this._selected = true;
            this.dispatchSelectionChange();
        }
    }
    /**
     * @return {?}
     */
    deselect() {
        if (this._selected) {
            this._selected = false;
            this.dispatchSelectionChange();
        }
    }
    /**
     * @return {?}
     */
    selectViaInteraction() {
        if (!this._selected) {
            this._selected = true;
            this.dispatchSelectionChange(true);
        }
    }
    /**
     * @param {?=} isUserInput
     * @return {?}
     */
    toggleSelected(isUserInput = false) {
        this._selected = !this.selected;
        this.dispatchSelectionChange(isUserInput);
        return this.selected;
    }
    /**
     * Allows for programmatic focusing of the tag.
     * @return {?}
     */
    focus() {
        if (!this.selectable) {
            return;
        }
        if (!this.hasFocus) {
            this.elementRef.nativeElement.focus();
            this.onFocus.next({ tag: this });
            Promise.resolve().then((/**
             * @return {?}
             */
            () => {
                this.hasFocus = true;
                this.changeDetectorRef.markForCheck();
            }));
        }
    }
    /**
     * Allows for programmatic removal of the tag. Called by the McTagList when the DELETE or
     * BACKSPACE keys are pressed.
     *
     * Informs any listeners of the removal request. Does not remove the tag from the DOM.
     * @return {?}
     */
    remove() {
        if (this.removable) {
            this.removed.emit({ tag: this });
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleClick(event) {
        if (this.disabled) {
            event.preventDefault();
        }
        else {
            event.stopPropagation();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleKeydown(event) {
        if (this.disabled) {
            return;
        }
        // tslint:disable-next-line: deprecation
        switch (event.keyCode) {
            case DELETE:
            case BACKSPACE:
                // If we are removable, remove the focused tag
                this.remove();
                // Always prevent so page navigation does not occur
                event.preventDefault();
                break;
            case SPACE:
                // If we are selectable, toggle the focused tag
                if (this.selectable) {
                    this.toggleSelected(true);
                }
                // Always prevent space from scrolling the page since the list has focus
                event.preventDefault();
                break;
            default:
        }
    }
    /**
     * @return {?}
     */
    blur() {
        // When animations are enabled, Angular may end up removing the tag from the DOM a little
        // earlier than usual, causing it to be blurred and throwing off the logic in the tag list
        // that moves focus not the next item. To work around the issue, we defer marking the tag
        // as not focused until the next time the zone stabilizes.
        this._ngZone.onStable
            .asObservable()
            .pipe(take(1))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this._ngZone.run((/**
             * @return {?}
             */
            () => {
                this.hasFocus = false;
                this.onBlur.next({ tag: this });
            }));
        }));
    }
    /**
     * @private
     * @param {?=} isUserInput
     * @return {?}
     */
    dispatchSelectionChange(isUserInput = false) {
        this.selectionChange.emit({
            source: this,
            isUserInput,
            selected: this._selected
        });
    }
}
McTag.decorators = [
    { type: Component, args: [{
                selector: 'mc-tag, [mc-tag], mc-basic-tag, [mc-basic-tag]',
                exportAs: 'mcTag',
                template: "<div class=\"mc-tag__wrapper\"><span class=\"mc-tag__text\"><ng-content></ng-content></span><ng-content select=\"[mc-icon]\"></ng-content><div class=\"mc-tag-overlay\"></div></div>",
                styles: [".mc-tag{position:relative;display:inline-block;overflow:hidden;margin:2px;height:22px;border-width:1px;border-style:solid;border-radius:4px;cursor:default;outline:0}.mc-tag.mc-left-icon{padding-left:3px}.mc-tag.mc-right-icon{padding-right:3px}.mc-tag__wrapper{display:flex;align-items:center;height:100%;flex:1 1 100%}.mc-tag__wrapper .mc-icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:22px;height:22px}.mc-tag__wrapper .mc-icon_left{margin-right:3px}.mc-tag__wrapper .mc-icon_right{margin-left:3px}.mc-tag-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}.mc-tag__text{margin-left:7px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}"],
                inputs: ['color', 'disabled'],
                host: {
                    class: 'mc-tag',
                    '[attr.tabindex]': 'tabindex',
                    '[attr.disabled]': 'disabled || null',
                    '[class.mc-selected]': 'selected',
                    '[class.mc-focused]': 'hasFocus',
                    '[class.mc-tag-with-avatar]': 'avatar',
                    '[class.mc-tag-with-trailing-icon]': 'trailingIcon || removeIcon',
                    '[class.mc-tag-disabled]': 'disabled',
                    '[class.mc-disabled]': 'disabled',
                    '(click)': 'handleClick($event)',
                    '(keydown)': 'handleKeydown($event)',
                    '(focus)': 'focus()',
                    '(blur)': 'blur()'
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
McTag.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: NgZone }
];
McTag.propDecorators = {
    contentChildren: [{ type: ContentChildren, args: [McIcon,] }],
    avatar: [{ type: ContentChild, args: [McTagAvatar, { static: false },] }],
    trailingIcon: [{ type: ContentChild, args: [McTagTrailingIcon, { static: false },] }],
    removeIcon: [{ type: ContentChild, args: [forwardRef((/**
                 * @return {?}
                 */
                () => McTagRemove)), { static: false },] }],
    selectionChange: [{ type: Output }],
    destroyed: [{ type: Output }],
    removed: [{ type: Output }],
    selected: [{ type: Input }],
    value: [{ type: Input }],
    selectable: [{ type: Input }],
    removable: [{ type: Input }]
};
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
class McTagRemove {
    /**
     * @param {?} parentTag
     */
    constructor(parentTag) {
        this.parentTag = parentTag;
    }
    /**
     * Calls the parent tag's public `remove()` method if applicable.
     * @param {?} event
     * @return {?}
     */
    handleClick(event) {
        if (this.parentTag.removable) {
            this.parentTag.remove();
        }
        // We need to stop event propagation because otherwise the event will bubble up to the
        // form field and cause the `onContainerClick` method to be invoked. This method would then
        // reset the focused tag that has been focused after tag removal. Usually the parent
        // the parent click listener of the `McTag` would prevent propagation, but it can happen
        // that the tag is being removed before the event bubbles up.
        event.stopPropagation();
    }
}
McTagRemove.decorators = [
    { type: Directive, args: [{
                selector: '[mcTagRemove]',
                host: {
                    class: 'mc-tag-remove mc-tag-trailing-icon',
                    '(click)': 'handleClick($event)'
                }
            },] },
];
/** @nocollapse */
McTagRemove.ctorParameters = () => [
    { type: McTag }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McTagListBase {
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
// tslint:disable-next-line:naming-convention
/** @type {?} */
const _McTagListMixinBase = mixinErrorState(McTagListBase);
// Increasing integer for generating unique ids for tag-list components.
/** @type {?} */
let nextUniqueId = 0;
/**
 * Change event object that is emitted when the tag list value has changed.
 */
class McTagListChange {
    /**
     * @param {?} source
     * @param {?} value
     */
    constructor(source, value) {
        this.source = source;
        this.value = value;
    }
}
class McTagList extends _McTagListMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} changeDetectorRef
     * @param {?} defaultErrorStateMatcher
     * @param {?} dir
     * @param {?} parentForm
     * @param {?} parentFormGroup
     * @param {?} ngControl
     */
    constructor(elementRef, changeDetectorRef, defaultErrorStateMatcher, dir, parentForm, parentFormGroup, ngControl) {
        super(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this.dir = dir;
        this.ngControl = ngControl;
        this.controlType = 'mc-tag-list';
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
        this._tabIndex = 0;
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
            () => { this.tagChanges.emit(this.tags.toArray()); }));
            this.stateChanges.next();
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
        this.tagInput = inputElement;
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
                template: '<ng-content></ng-content>',
                host: {
                    class: 'mc-tag-list',
                    '[attr.tabindex]': 'disabled ? null : _tabIndex',
                    '[class.mc-disabled]': 'disabled',
                    '[class.mc-invalid]': 'errorState',
                    '[class.mc-required]': 'required',
                    '(focus)': 'focus()',
                    '(blur)': 'blur()',
                    '(keydown)': 'keydown($event)',
                    '[id]': 'uid'
                },
                providers: [{ provide: McFormFieldControl, useExisting: McTagList }],
                styles: [".mc-tag-list{display:flex;flex-wrap:wrap;min-height:28px;padding:2px 6px}.mc-tag-list .mc-tag-input{max-width:100%;flex:1 1 auto;height:22px;margin:2px 4px}.mc-tag-input{border:none;outline:0;background:0 0}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
McTagList.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: ErrorStateMatcher },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: NgForm, decorators: [{ type: Optional }] },
    { type: FormGroupDirective, decorators: [{ type: Optional }] },
    { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
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
    tags: [{ type: ContentChildren, args: [McTag, {
                    // Need to use `descendants: true`,
                    // Ivy will no longer match indirect descendants if it's left as false.
                    descendants: true
                },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Increasing integer for generating unique ids.
/** @type {?} */
let nextUniqueId$1 = 0;
/**
 * Directive that adds tag-specific behaviors to an input element inside `<mc-form-field>`.
 * May be placed inside or outside of an `<mc-tag-list>`.
 */
class McTagInput {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     * @param {?} defaultOptions
     */
    constructor(elementRef, renderer, defaultOptions) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.defaultOptions = defaultOptions;
        /**
         * Whether the control is focused.
         */
        this.focused = false;
        /**
         * The list of key codes that will trigger a tagEnd event.
         *
         * Defaults to `[ENTER]`.
         */
        this.separatorKeyCodes = this.defaultOptions.separatorKeyCodes;
        /**
         * Emitted when a tag is to be added.
         */
        this.tagEnd = new EventEmitter();
        /**
         * The input's placeholder text.
         */
        this.placeholder = '';
        /**
         * Unique id for the input.
         */
        this.id = `mc-tag-list-input-${nextUniqueId$1++}`;
        this._addOnBlur = true;
        this._disabled = false;
        this.countOfSymbolsForUpdateWidth = 3;
        // tslint:disable-next-line: no-unnecessary-type-assertion
        this.inputElement = (/** @type {?} */ (this.elementRef.nativeElement));
        this.setDefaultInputWidth();
    }
    /**
     * Register input for tag list
     * @param {?} value
     * @return {?}
     */
    set tagList(value) {
        if (value) {
            this._tagList = value;
            this._tagList.registerInput(this);
        }
    }
    /**
     * Whether or not the tagEnd event will be emitted when the input is blurred.
     * @return {?}
     */
    get addOnBlur() {
        return this._addOnBlur;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set addOnBlur(value) {
        this._addOnBlur = coerceBooleanProperty(value);
    }
    /**
     * Whether the input is disabled.
     * @return {?}
     */
    get disabled() {
        return this._disabled || (this._tagList && this._tagList.disabled);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * Whether the input is empty.
     * @return {?}
     */
    get empty() {
        return !this.inputElement.value;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this._tagList.stateChanges.next();
    }
    /**
     * Utility method to make host definition/tests more clear.
     * @param {?=} event
     * @return {?}
     */
    keydown(event) {
        this.emittagEnd(event);
    }
    /**
     * Checks to see if the blur should emit the (tagEnd) event.
     * @return {?}
     */
    blur() {
        if (this.addOnBlur) {
            this.emittagEnd();
        }
        this.focused = false;
        // Blur the tag list if it is not focused
        if (!this._tagList.focused) {
            this._tagList.blur();
        }
        this._tagList.stateChanges.next();
    }
    /**
     * Checks to see if the (tagEnd) event needs to be emitted.
     * @param {?=} event
     * @return {?}
     */
    emittagEnd(event) {
        if (!this.inputElement.value && !!event) {
            this._tagList.keydown(event);
        }
        if (!event || this.isSeparatorKey(event)) {
            this.tagEnd.emit({ input: this.inputElement, value: this.inputElement.value });
            this.updateInputWidth();
            if (event) {
                event.preventDefault();
            }
        }
    }
    /**
     * @return {?}
     */
    onInput() {
        this.updateInputWidth();
        // Let tag list know whenever the value changes.
        this._tagList.stateChanges.next();
    }
    /**
     * @return {?}
     */
    updateInputWidth() {
        /** @type {?} */
        const length = this.inputElement.value.length;
        this.renderer.setStyle(this.inputElement, 'max-width', 0);
        this.oneSymbolWidth = this.inputElement.scrollWidth / length;
        this.renderer.setStyle(this.inputElement, 'max-width', '');
        if (length > this.countOfSymbolsForUpdateWidth) {
            this.renderer.setStyle(this.inputElement, 'width', `${length * this.oneSymbolWidth}px`);
        }
        else {
            this.setDefaultInputWidth();
        }
    }
    /**
     * @return {?}
     */
    onFocus() {
        this.focused = true;
        this._tagList.stateChanges.next();
    }
    /**
     * Focuses the input.
     * @return {?}
     */
    focus() {
        this.inputElement.focus();
    }
    /**
     * @private
     * @return {?}
     */
    setDefaultInputWidth() {
        this.renderer.setStyle(this.inputElement, 'width', '30px');
    }
    /**
     * Checks whether a keycode is one of the configured separators.
     * @private
     * @param {?} event
     * @return {?}
     */
    isSeparatorKey(event) {
        if (hasModifierKey(event)) {
            return false;
        }
        /** @type {?} */
        const separators = this.separatorKeyCodes;
        // tslint:disable-next-line: deprecation
        /** @type {?} */
        const keyCode = event.keyCode;
        return Array.isArray(separators) ? separators.indexOf(keyCode) > -1 : separators.has(keyCode);
    }
}
McTagInput.decorators = [
    { type: Directive, args: [{
                selector: 'input[mcTagInputFor]',
                exportAs: 'mcTagInput, mcTagInputFor',
                host: {
                    class: 'mc-tag-input mc-input-element',
                    '[id]': 'id',
                    '[attr.disabled]': 'disabled || null',
                    '[attr.placeholder]': 'placeholder || null',
                    '[attr.aria-invalid]': '_tagList && _tagList.ngControl ? _tagList.ngControl.invalid : null',
                    '(keydown)': 'keydown($event)',
                    '(blur)': 'blur()',
                    '(focus)': 'onFocus()',
                    '(input)': 'onInput()'
                }
            },] },
];
/** @nocollapse */
McTagInput.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: undefined, decorators: [{ type: Inject, args: [MC_TAGS_DEFAULT_OPTIONS,] }] }
];
McTagInput.propDecorators = {
    separatorKeyCodes: [{ type: Input, args: ['mcTagInputSeparatorKeyCodes',] }],
    tagEnd: [{ type: Output, args: ['mcTagInputTokenEnd',] }],
    placeholder: [{ type: Input }],
    id: [{ type: Input }],
    tagList: [{ type: Input, args: ['mcTagInputFor',] }],
    addOnBlur: [{ type: Input, args: ['mcTagInputAddOnBlur',] }],
    disabled: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
const ɵ0 = ({ separatorKeyCodes: [ENTER] });
class McTagsModule {
}
McTagsModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, PlatformModule],
                exports: [
                    McTagList,
                    McTag,
                    McTagInput,
                    McTagTrailingIcon,
                    McTagAvatar,
                    McTagRemove
                ],
                declarations: [
                    McTagList,
                    McTag,
                    McTagInput,
                    McTagTrailingIcon,
                    McTagAvatar,
                    McTagRemove
                ],
                providers: [{
                        provide: MC_TAGS_DEFAULT_OPTIONS,
                        // tslint:disable-next-line: no-object-literal-type-assertion
                        useValue: (/** @type {?} */ (ɵ0))
                    }]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McTagsModule, McTagSelectionChange, McTagAvatar, McTagTrailingIcon, McTagBase, _McTagMixinBase, McTag, McTagRemove, McTagListBase, _McTagListMixinBase, McTagListChange, McTagList, McTagInput, MC_TAGS_DEFAULT_OPTIONS };
//# sourceMappingURL=tags.js.map
