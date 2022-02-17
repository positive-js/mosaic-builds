import { PlatformModule } from '@angular/cdk/platform';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { InjectionToken, Directive, forwardRef, Inject, EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren, ContentChild, Output, Input, Optional, Self, NgModule } from '@angular/core';
import { SPACE, BACKSPACE, DELETE, HOME, END, ENTER, TAB, COMMA, hasModifierKey } from '@ptsecurity/cdk/keycodes';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i3 from '@angular/forms';
import { NG_VALIDATORS } from '@angular/forms';
import * as i2 from '@angular/cdk/bidi';
import { SelectionModel } from '@angular/cdk/collections';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import * as i1 from '@ptsecurity/mosaic/core';
import { mixinColor, mixinDisabled, mixinErrorState, setMosaicValidation, MC_VALIDATION } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { Subject, merge } from 'rxjs';
import { take, takeUntil, startWith } from 'rxjs/operators';
import { McIcon } from '@ptsecurity/mosaic/icon';

/** Injection token to be used to override the default options for the chips module. */
const MC_TAGS_DEFAULT_OPTIONS = new InjectionToken('mc-tags-default-options');

/** Event object emitted by McTag when selected or deselected. */
class McTagSelectionChange {
    constructor(source, selected, isUserInput = false) {
        this.source = source;
        this.selected = selected;
        this.isUserInput = isUserInput;
    }
}
const TAG_ATTRIBUTE_NAMES = ['mc-basic-tag'];
/**
 * Dummy directive to add CSS class to tag avatar.
 * @docs-private
 */
class McTagAvatar {
}
/** @nocollapse */ /** @nocollapse */ McTagAvatar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTagAvatar, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McTagAvatar.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0", type: McTagAvatar, selector: "mc-tag-avatar, [mcTagAvatar]", host: { classAttribute: "mc-tag-avatar" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTagAvatar, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-tag-avatar, [mcTagAvatar]',
                    host: { class: 'mc-tag-avatar' }
                }]
        }] });
/**
 * Dummy directive to add CSS class to tag trailing icon.
 * @docs-private
 */
class McTagTrailingIcon {
}
/** @nocollapse */ /** @nocollapse */ McTagTrailingIcon.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTagTrailingIcon, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McTagTrailingIcon.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0", type: McTagTrailingIcon, selector: "mc-tag-trailing-icon, [mcTagTrailingIcon]", host: { classAttribute: "mc-tag-trailing-icon" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTagTrailingIcon, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-tag-trailing-icon, [mcTagTrailingIcon]',
                    host: { class: 'mc-tag-trailing-icon' }
                }]
        }] });
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
    constructor(parentTag) {
        this.parentTag = parentTag;
    }
    focus($event) {
        $event.stopPropagation();
    }
    /** Calls the parent tag's public `remove()` method if applicable. */
    handleClick(event) {
        if (this.parentTag.removable) {
            this.parentTag.hasFocus = true;
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
/** @nocollapse */ /** @nocollapse */ McTagRemove.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTagRemove, deps: [{ token: forwardRef(() => McTag) }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McTagRemove.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0", type: McTagRemove, selector: "[mcTagRemove]", host: { listeners: { "click": "handleClick($event)", "focus": "focus($event)" }, properties: { "attr.tabindex": "-1" }, classAttribute: "mc-tag-remove mc-tag-trailing-icon" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTagRemove, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcTagRemove]',
                    host: {
                        class: 'mc-tag-remove mc-tag-trailing-icon',
                        '[attr.tabindex]': '-1',
                        '(click)': 'handleClick($event)',
                        '(focus)': 'focus($event)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: McTag, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => McTag)]
                }] }]; } });
class McTagBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
const McTagMixinBase = mixinColor(mixinDisabled(McTagBase));
class McTag extends McTagMixinBase {
    constructor(elementRef, changeDetectorRef, _ngZone) {
        super(elementRef);
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this._ngZone = _ngZone;
        /** Emits when the tag is focused. */
        this.onFocus = new Subject();
        /** Emits when the tag is blured. */
        this.onBlur = new Subject();
        /** Whether the tag has focus. */
        this.hasFocus = false;
        /** Whether the tag list is selectable */
        this.tagListSelectable = true;
        /** Emitted when the tag is selected or deselected. */
        this.selectionChange = new EventEmitter();
        /** Emitted when the tag is destroyed. */
        this.destroyed = new EventEmitter();
        /** Emitted when a tag is to be removed. */
        this.removed = new EventEmitter();
        this._selected = false;
        this._selectable = true;
        this._removable = true;
        this._disabled = false;
        this.addHostClassName();
        this.nativeElement = elementRef.nativeElement;
    }
    /** Whether the tag is selected. */
    get selected() {
        return this._selected;
    }
    set selected(value) {
        const coercedValue = coerceBooleanProperty(value);
        if (coercedValue !== this._selected) {
            this._selected = coercedValue;
            this.dispatchSelectionChange();
        }
    }
    /** The value of the tag. Defaults to the content inside `<mc-tag>` tags. */
    get value() {
        return this._value !== undefined
            ? this._value
            : this.elementRef.nativeElement.textContent;
    }
    set value(value) {
        this._value = value;
    }
    /**
     * Whether or not the tag is selectable. When a tag is not selectable,
     * changes to its selected state are always ignored. By default a tag is
     * selectable, and it becomes non-selectable if its parent tag list is
     * not selectable.
     */
    get selectable() {
        return this._selectable && this.tagListSelectable;
    }
    set selectable(value) {
        this._selectable = coerceBooleanProperty(value);
    }
    /**
     * Determines whether or not the tag displays the remove styling and emits (removed) events.
     */
    get removable() {
        return this._removable;
    }
    set removable(value) {
        this._removable = coerceBooleanProperty(value);
    }
    get tabindex() {
        if (!this.selectable) {
            return null;
        }
        return this.disabled ? null : -1;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        if (value !== this.disabled) {
            this._disabled = value;
        }
    }
    ngAfterContentInit() {
        this.addClassModificatorForIcons();
    }
    addClassModificatorForIcons() {
        const icons = this.contentChildren.map((item) => item._elementRef.nativeElement);
        if (icons.length === 1) {
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
            const firstIconElement = icons[0];
            const secondIconElement = icons[1];
            firstIconElement.classList.add('mc-icon_left');
            secondIconElement.classList.add('mc-icon_right');
        }
    }
    addHostClassName() {
        // Add class for the different tags
        for (const attr of TAG_ATTRIBUTE_NAMES) {
            if (this.elementRef.nativeElement.hasAttribute(attr) ||
                this.elementRef.nativeElement.tagName.toLowerCase() === attr) {
                this.elementRef.nativeElement.classList.add(attr);
                return;
            }
        }
        this.elementRef.nativeElement.classList.add('mc-standard-tag');
    }
    ngOnDestroy() {
        this.destroyed.emit({ tag: this });
    }
    select() {
        if (!this._selected) {
            this._selected = true;
            this.dispatchSelectionChange();
        }
    }
    deselect() {
        if (this._selected) {
            this._selected = false;
            this.dispatchSelectionChange();
        }
    }
    selectViaInteraction() {
        if (!this._selected) {
            this._selected = true;
            this.dispatchSelectionChange(true);
        }
    }
    toggleSelected(isUserInput = false) {
        this._selected = !this.selected;
        this.dispatchSelectionChange(isUserInput);
        return this.selected;
    }
    /** Allows for programmatic focusing of the tag. */
    focus() {
        if (!this.selectable) {
            return;
        }
        if (!this.hasFocus) {
            this.elementRef.nativeElement.focus();
            this.onFocus.next({ tag: this });
            Promise.resolve().then(() => {
                this.hasFocus = true;
                this.changeDetectorRef.markForCheck();
            });
        }
    }
    /**
     * Allows for programmatic removal of the tag. Called by the McTagList when the DELETE or
     * BACKSPACE keys are pressed.
     *
     * Informs any listeners of the removal request. Does not remove the tag from the DOM.
     */
    remove() {
        if (this.removable) {
            this.removed.emit({ tag: this });
        }
    }
    handleClick(event) {
        if (this.disabled) {
            event.preventDefault();
        }
        else {
            event.stopPropagation();
        }
    }
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
    blur() {
        // When animations are enabled, Angular may end up removing the tag from the DOM a little
        // earlier than usual, causing it to be blurred and throwing off the logic in the tag list
        // that moves focus not the next item. To work around the issue, we defer marking the tag
        // as not focused until the next time the zone stabilizes.
        this._ngZone.onStable
            .asObservable()
            .pipe(take(1))
            .subscribe(() => {
            this._ngZone.run(() => {
                this.hasFocus = false;
                this.onBlur.next({ tag: this });
            });
        });
    }
    dispatchSelectionChange(isUserInput = false) {
        this.selectionChange.emit({
            source: this,
            isUserInput,
            selected: this._selected
        });
    }
}
/** @nocollapse */ /** @nocollapse */ McTag.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTag, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McTag.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.0", type: McTag, selector: "mc-tag, [mc-tag], mc-basic-tag, [mc-basic-tag]", inputs: { color: "color", selected: "selected", value: "value", selectable: "selectable", removable: "removable", disabled: "disabled" }, outputs: { selectionChange: "selectionChange", destroyed: "destroyed", removed: "removed" }, host: { listeners: { "click": "handleClick($event)", "keydown": "handleKeydown($event)", "focus": "focus()", "blur": "blur()" }, properties: { "attr.tabindex": "tabindex", "attr.disabled": "disabled || null", "class.mc-selected": "selected", "class.mc-focused": "hasFocus", "class.mc-tag-with-avatar": "avatar", "class.mc-tag-with-icon": "contentChildren", "class.mc-tag-with-trailing-icon": "trailingIcon || removeIcon", "class.mc-disabled": "disabled" }, classAttribute: "mc-tag" }, queries: [{ propertyName: "avatar", first: true, predicate: McTagAvatar, descendants: true }, { propertyName: "trailingIcon", first: true, predicate: McTagTrailingIcon, descendants: true }, { propertyName: "removeIcon", first: true, predicate: i0.forwardRef(function () { return McTagRemove; }), descendants: true }, { propertyName: "contentChildren", predicate: McIcon }], exportAs: ["mcTag"], usesInheritance: true, ngImport: i0, template: "<div class=\"mc-tag__wrapper\">\n    <span class=\"mc-tag__text\"><ng-content></ng-content></span>\n    <ng-content select=\"[mc-icon]\"></ng-content>\n    <div class=\"mc-tag-overlay\"></div>\n</div>\n", styles: [".mc-tag{position:relative;display:inline-block;overflow:hidden;margin:2px;margin:var(--mc-tags-size-margin, 2px);height:24px;height:var(--mc-tags-size-height, 24px);border-width:1px;border-width:var(--mc-tags-size-border-width, 1px);border-style:solid;border-radius:4px;border-radius:var(--mc-tags-size-border-radius, 4px);cursor:default;outline:none;box-sizing:border-box}.mc-tag .mc-icon:hover{cursor:pointer}.mc-tag.mc-disabled .mc-icon:hover{cursor:default}.mc-tag.mc-left-icon{padding-left:3px;padding-left:var(--mc-tags-size-icon-padding, 3px)}.mc-tag.mc-right-icon{padding-right:3px;padding-right:var(--mc-tags-size-icon-padding, 3px)}.mc-tag .mc-tag__text{margin-left:7px;margin-left:calc(var(--mc-tags-size-text-margin, 8px) - var(--mc-tags-size-border-width, 1px));text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mc-tag:not(.mc-tag-with-icon) .mc-tag__text{margin-right:7px;margin-right:calc(var(--mc-tags-size-text-margin, 8px) - var(--mc-tags-size-border-width, 1px))}.mc-tag__wrapper{display:flex;align-items:center;height:100%;flex:1 1 100%}.mc-tag__wrapper .mc-icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:24px;width:var(--mc-tags-size-height, 24px);height:24px;height:var(--mc-tags-size-height, 24px)}.mc-tag__wrapper .mc-icon_left{margin-right:3px;margin-right:var(--mc-tags-size-icon-padding, 3px)}.mc-tag__wrapper .mc-icon_right{margin-left:3px;margin-left:var(--mc-tags-size-icon-padding, 3px)}.mc-tag-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTag, decorators: [{
            type: Component,
            args: [{ selector: 'mc-tag, [mc-tag], mc-basic-tag, [mc-basic-tag]', exportAs: 'mcTag', inputs: ['color'], host: {
                        class: 'mc-tag',
                        '[attr.tabindex]': 'tabindex',
                        '[attr.disabled]': 'disabled || null',
                        '[class.mc-selected]': 'selected',
                        '[class.mc-focused]': 'hasFocus',
                        '[class.mc-tag-with-avatar]': 'avatar',
                        '[class.mc-tag-with-icon]': 'contentChildren',
                        '[class.mc-tag-with-trailing-icon]': 'trailingIcon || removeIcon',
                        '[class.mc-disabled]': 'disabled',
                        '(click)': 'handleClick($event)',
                        '(keydown)': 'handleKeydown($event)',
                        '(focus)': 'focus()',
                        '(blur)': 'blur()'
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"mc-tag__wrapper\">\n    <span class=\"mc-tag__text\"><ng-content></ng-content></span>\n    <ng-content select=\"[mc-icon]\"></ng-content>\n    <div class=\"mc-tag-overlay\"></div>\n</div>\n", styles: [".mc-tag{position:relative;display:inline-block;overflow:hidden;margin:2px;margin:var(--mc-tags-size-margin, 2px);height:24px;height:var(--mc-tags-size-height, 24px);border-width:1px;border-width:var(--mc-tags-size-border-width, 1px);border-style:solid;border-radius:4px;border-radius:var(--mc-tags-size-border-radius, 4px);cursor:default;outline:none;box-sizing:border-box}.mc-tag .mc-icon:hover{cursor:pointer}.mc-tag.mc-disabled .mc-icon:hover{cursor:default}.mc-tag.mc-left-icon{padding-left:3px;padding-left:var(--mc-tags-size-icon-padding, 3px)}.mc-tag.mc-right-icon{padding-right:3px;padding-right:var(--mc-tags-size-icon-padding, 3px)}.mc-tag .mc-tag__text{margin-left:7px;margin-left:calc(var(--mc-tags-size-text-margin, 8px) - var(--mc-tags-size-border-width, 1px));text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mc-tag:not(.mc-tag-with-icon) .mc-tag__text{margin-right:7px;margin-right:calc(var(--mc-tags-size-text-margin, 8px) - var(--mc-tags-size-border-width, 1px))}.mc-tag__wrapper{display:flex;align-items:center;height:100%;flex:1 1 100%}.mc-tag__wrapper .mc-icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:24px;width:var(--mc-tags-size-height, 24px);height:24px;height:var(--mc-tags-size-height, 24px)}.mc-tag__wrapper .mc-icon_left{margin-right:3px;margin-right:var(--mc-tags-size-icon-padding, 3px)}.mc-tag__wrapper .mc-icon_right{margin-left:3px;margin-left:var(--mc-tags-size-icon-padding, 3px)}.mc-tag-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }]; }, propDecorators: { contentChildren: [{
                type: ContentChildren,
                args: [McIcon]
            }], avatar: [{
                type: ContentChild,
                args: [McTagAvatar, { static: false }]
            }], trailingIcon: [{
                type: ContentChild,
                args: [McTagTrailingIcon, { static: false }]
            }], removeIcon: [{
                type: ContentChild,
                args: [forwardRef(() => McTagRemove), { static: false }]
            }], selectionChange: [{
                type: Output
            }], destroyed: [{
                type: Output
            }], removed: [{
                type: Output
            }], selected: [{
                type: Input
            }], value: [{
                type: Input
            }], selectable: [{
                type: Input
            }], removable: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });

class McTagListBase {
    constructor(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
        this.defaultErrorStateMatcher = defaultErrorStateMatcher;
        this.parentForm = parentForm;
        this.parentFormGroup = parentFormGroup;
        this.ngControl = ngControl;
    }
}
// tslint:disable-next-line:naming-convention
const McTagListMixinBase = mixinErrorState(McTagListBase);
// Increasing integer for generating unique ids for tag-list components.
let nextUniqueId$1 = 0;
/** Change event object that is emitted when the tag list value has changed. */
class McTagListChange {
    constructor(source, value) {
        this.source = source;
        this.value = value;
    }
}
class McTagList extends McTagListMixinBase {
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
        this.uid = `mc-tag-list-${nextUniqueId$1++}`;
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
        this.tagInput = inputElement;
        // todo need rethink about it
        if (this.ngControl && inputElement.ngControl?.statusChanges) {
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
        this.tagFocusSubscription = this.tagFocusChanges
            .subscribe((event) => {
            const tagIndex = this.tags.toArray().indexOf(event.tag);
            if (this.isValidIndex(tagIndex)) {
                this.keyManager.updateActiveItem(tagIndex);
            }
            this.stateChanges.next();
        });
        this.tagBlurSubscription = this.tagBlurChanges
            .subscribe(() => {
            this.blur();
            this.stateChanges.next();
        });
    }
    listenToTagsRemoved() {
        this.tagRemoveSubscription = this.tagRemoveChanges
            .subscribe((event) => {
            const tag = event.tag;
            const tagIndex = this.tags.toArray().indexOf(event.tag);
            // In case the tag that will be removed is currently focused, we temporarily store
            // the index in order to be able to determine an appropriate sibling tag that will
            // receive focus.
            if (this.isValidIndex(tagIndex) && tag.hasFocus) {
                this.lastDestroyedTagIndex = tagIndex;
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
/** @nocollapse */ /** @nocollapse */ McTagList.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTagList, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.ErrorStateMatcher }, { token: NG_VALIDATORS, optional: true }, { token: MC_VALIDATION, optional: true }, { token: i2.Directionality, optional: true }, { token: i3.NgForm, optional: true }, { token: i3.FormGroupDirective, optional: true }, { token: i3.NgControl, optional: true, self: true }, { token: i3.NgModel, optional: true, self: true }, { token: i3.FormControlName, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McTagList.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.0", type: McTagList, selector: "mc-tag-list", inputs: { multiple: "multiple", compareWith: "compareWith", value: "value", required: "required", placeholder: "placeholder", disabled: "disabled", selectable: "selectable", tabIndex: "tabIndex", errorStateMatcher: "errorStateMatcher", orientation: "orientation" }, outputs: { valueChange: "valueChange", change: "change" }, host: { listeners: { "focus": "focus()", "blur": "blur()", "keydown": "keydown($event)" }, properties: { "class.mc-disabled": "disabled", "class.mc-invalid": "errorState", "attr.tabindex": "disabled ? null : tabIndex", "id": "uid" }, classAttribute: "mc-tag-list" }, providers: [{ provide: McFormFieldControl, useExisting: McTagList }], queries: [{ propertyName: "cleaner", first: true, predicate: ["mcTagListCleaner"], descendants: true, static: true }, { propertyName: "tags", predicate: McTag, descendants: true }], exportAs: ["mcTagList"], usesInheritance: true, ngImport: i0, template: "<div class=\"mc-tags-list__list-container\">\n    <ng-content></ng-content>\n</div>\n\n<div class=\"mc-tags-list__cleaner\"\n     *ngIf=\"canShowCleaner\">\n    <ng-content select=\"mc-cleaner\"></ng-content>\n</div>\n", styles: [".mc-tag-list{display:flex;flex-direction:row;box-sizing:border-box}.mc-tag-input{border:none;outline:none;background:transparent}.mc-tags-list__list-container{display:flex;flex-wrap:wrap;flex:1 1 100%;box-sizing:border-box;min-width:0;min-height:30px;min-height:var(--mc-tag-list-size-min-height, 30px);padding:1px 6px;padding:var(--mc-tag-list-size-padding, 1px 6px)}.mc-tags-list__list-container .mc-tag-input{max-width:100%;flex:1 1 auto;height:22px;height:var(--mc-tag-input-size-height, 22px);margin:2px 4px;margin:var(--mc-tag-input-size-margin, 2px 4px)}.mc-tags-list__cleaner .mc-cleaner{height:30px}\n"], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTagList, decorators: [{
            type: Component,
            args: [{ selector: 'mc-tag-list', exportAs: 'mcTagList', host: {
                        class: 'mc-tag-list',
                        '[class.mc-disabled]': 'disabled',
                        '[class.mc-invalid]': 'errorState',
                        '[attr.tabindex]': 'disabled ? null : tabIndex',
                        '[id]': 'uid',
                        '(focus)': 'focus()',
                        '(blur)': 'blur()',
                        '(keydown)': 'keydown($event)'
                    }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [{ provide: McFormFieldControl, useExisting: McTagList }], template: "<div class=\"mc-tags-list__list-container\">\n    <ng-content></ng-content>\n</div>\n\n<div class=\"mc-tags-list__cleaner\"\n     *ngIf=\"canShowCleaner\">\n    <ng-content select=\"mc-cleaner\"></ng-content>\n</div>\n", styles: [".mc-tag-list{display:flex;flex-direction:row;box-sizing:border-box}.mc-tag-input{border:none;outline:none;background:transparent}.mc-tags-list__list-container{display:flex;flex-wrap:wrap;flex:1 1 100%;box-sizing:border-box;min-width:0;min-height:30px;min-height:var(--mc-tag-list-size-min-height, 30px);padding:1px 6px;padding:var(--mc-tag-list-size-padding, 1px 6px)}.mc-tags-list__list-container .mc-tag-input{max-width:100%;flex:1 1 auto;height:22px;height:var(--mc-tag-input-size-height, 22px);margin:2px 4px;margin:var(--mc-tag-input-size-margin, 2px 4px)}.mc-tags-list__cleaner .mc-cleaner{height:30px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.ErrorStateMatcher }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NG_VALIDATORS]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MC_VALIDATION]
                }] }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i3.NgForm, decorators: [{
                    type: Optional
                }] }, { type: i3.FormGroupDirective, decorators: [{
                    type: Optional
                }] }, { type: i3.NgControl, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }, { type: i3.NgModel, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }, { type: i3.FormControlName, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }]; }, propDecorators: { multiple: [{
                type: Input
            }], compareWith: [{
                type: Input
            }], value: [{
                type: Input
            }], required: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], disabled: [{
                type: Input
            }], selectable: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], errorStateMatcher: [{
                type: Input
            }], orientation: [{
                type: Input,
                args: ['orientation']
            }], change: [{
                type: Output
            }], cleaner: [{
                type: ContentChild,
                args: ['mcTagListCleaner', { static: true }]
            }], tags: [{
                type: ContentChildren,
                args: [McTag, {
                        // Need to use `descendants: true`,
                        // Ivy will no longer match indirect descendants if it's left as false.
                        descendants: true
                    }]
            }] } });

// Increasing integer for generating unique ids.
let nextUniqueId = 0;
/**
 * Directive that adds tag-specific behaviors to an input element inside `<mc-form-field>`.
 * May be placed inside or outside of an `<mc-tag-list>`.
 */
class McTagInput {
    constructor(elementRef, renderer, defaultOptions, ngControl) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.defaultOptions = defaultOptions;
        this.ngControl = ngControl;
        /** Whether the control is focused. */
        this.focused = false;
        /**
         * The list of key codes that will trigger a tagEnd event.
         *
         * Defaults to `[ENTER]`.
         */
        this.separatorKeyCodes = this.defaultOptions.separatorKeyCodes;
        /** Emitted when a tag is to be added. */
        this.tagEnd = new EventEmitter();
        /** The input's placeholder text. */
        this.placeholder = '';
        /** Unique id for the input. */
        this.id = `mc-tag-list-input-${nextUniqueId++}`;
        this._addOnBlur = true;
        this._disabled = false;
        this.countOfSymbolsForUpdateWidth = 3;
        // tslint:disable-next-line: no-unnecessary-type-assertion
        this.inputElement = this.elementRef.nativeElement;
        this.setDefaultInputWidth();
    }
    /** Register input for tag list */
    set tagList(value) {
        if (value) {
            this._tagList = value;
            this._tagList.registerInput(this);
        }
    }
    /**
     * Whether or not the tagEnd event will be emitted when the input is blurred.
     */
    get addOnBlur() {
        return this._addOnBlur;
    }
    set addOnBlur(value) {
        this._addOnBlur = coerceBooleanProperty(value);
    }
    /** Whether the input is disabled. */
    get disabled() {
        return this._disabled || (this._tagList && this._tagList.disabled);
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /** Whether the input is empty. */
    get empty() {
        return !this.inputElement.value;
    }
    ngOnChanges() {
        this._tagList.stateChanges.next();
    }
    onKeydown(event) {
        if (!this.inputElement.value) {
            this._tagList.keydown(event);
        }
        if (this.isSeparatorKey(event)) {
            this.emitTagEnd();
            event.preventDefault();
        }
    }
    /** Checks to see if the blur should emit the (tagEnd) event. */
    blur() {
        this.focused = false;
        // Blur the tag list if it is not focused
        if (!this._tagList.focused) {
            this.triggerValidation();
            this._tagList.blur();
        }
        // tslint:disable-next-line: no-unnecessary-type-assertion
        if (this.addOnBlur) {
            this.emitTagEnd();
        }
        this._tagList.stateChanges.next();
    }
    triggerValidation() {
        if (!this.hasControl()) {
            return;
        }
        this.ngControl.statusChanges.emit(this.ngControl.status);
    }
    /** Checks to see if the (tagEnd) event needs to be emitted. */
    emitTagEnd() {
        if (!this.hasControl() || (this.hasControl() && !this.ngControl.invalid)) {
            this.tagEnd.emit({ input: this.inputElement, value: this.inputElement.value });
            this.updateInputWidth();
        }
    }
    onInput() {
        this.updateInputWidth();
        // Let tag list know whenever the value changes.
        this._tagList.stateChanges.next();
    }
    onPaste($event) {
        if (!$event.clipboardData) {
            return;
        }
        const data = $event.clipboardData.getData('text');
        if (data && data.length === 0) {
            return;
        }
        const items = [];
        for (const key of this.separatorKeyCodes) {
            const separator = this.separatorKeyToSymbol(key);
            if (data.search(separator) > -1) {
                items.push(...data.split(separator));
                break;
            }
        }
        if (items.length === 0) {
            items.push(data);
        }
        items.forEach((item) => this.tagEnd.emit({ input: this.inputElement, value: item }));
        this.updateInputWidth();
        $event.preventDefault();
        $event.stopPropagation();
    }
    updateInputWidth() {
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
    onFocus() {
        this.focused = true;
        this._tagList.stateChanges.next();
    }
    /** Focuses the input. */
    focus() {
        this.inputElement.focus();
    }
    separatorKeyToSymbol(k) {
        const sep = {
            [ENTER]: /\r?\n/,
            [TAB]: /\t/,
            [SPACE]: / /,
            [COMMA]: /,/
        }[k];
        if (sep) {
            return sep;
        }
        return k;
    }
    hasControl() {
        return !!this.ngControl;
    }
    setDefaultInputWidth() {
        this.renderer.setStyle(this.inputElement, 'width', '30px');
    }
    /** Checks whether a keycode is one of the configured separators. */
    isSeparatorKey(event) {
        if (hasModifierKey(event)) {
            return false;
        }
        // tslint:disable-next-line: deprecation
        return this.separatorKeyCodes.indexOf(event.keyCode) > -1;
    }
}
/** @nocollapse */ /** @nocollapse */ McTagInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTagInput, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: MC_TAGS_DEFAULT_OPTIONS }, { token: i3.NgControl, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McTagInput.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0", type: McTagInput, selector: "input[mcTagInputFor]", inputs: { separatorKeyCodes: ["mcTagInputSeparatorKeyCodes", "separatorKeyCodes"], placeholder: "placeholder", id: "id", tagList: ["mcTagInputFor", "tagList"], addOnBlur: ["mcTagInputAddOnBlur", "addOnBlur"], disabled: "disabled" }, outputs: { tagEnd: "mcTagInputTokenEnd" }, host: { listeners: { "keydown": "onKeydown($event)", "blur": "blur()", "focus": "onFocus()", "input": "onInput()", "paste": "onPaste($event)" }, properties: { "id": "id", "attr.disabled": "disabled || null", "attr.placeholder": "placeholder || null" }, classAttribute: "mc-tag-input" }, exportAs: ["mcTagInput", "mcTagInputFor"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTagInput, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[mcTagInputFor]',
                    exportAs: 'mcTagInput, mcTagInputFor',
                    host: {
                        class: 'mc-tag-input',
                        '[id]': 'id',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.placeholder]': 'placeholder || null',
                        '(keydown)': 'onKeydown($event)',
                        '(blur)': 'blur()',
                        '(focus)': 'onFocus()',
                        '(input)': 'onInput()',
                        '(paste)': 'onPaste($event)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_TAGS_DEFAULT_OPTIONS]
                }] }, { type: i3.NgControl, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }]; }, propDecorators: { separatorKeyCodes: [{
                type: Input,
                args: ['mcTagInputSeparatorKeyCodes']
            }], tagEnd: [{
                type: Output,
                args: ['mcTagInputTokenEnd']
            }], placeholder: [{
                type: Input
            }], id: [{
                type: Input
            }], tagList: [{
                type: Input,
                args: ['mcTagInputFor']
            }], addOnBlur: [{
                type: Input,
                args: ['mcTagInputAddOnBlur']
            }], disabled: [{
                type: Input
            }] } });

class McTagsModule {
}
/** @nocollapse */ /** @nocollapse */ McTagsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTagsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McTagsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTagsModule, declarations: [McTagList,
        McTag,
        McTagInput,
        McTagTrailingIcon,
        McTagAvatar,
        McTagRemove], imports: [CommonModule, PlatformModule], exports: [McTagList,
        McTag,
        McTagInput,
        McTagTrailingIcon,
        McTagAvatar,
        McTagRemove] });
/** @nocollapse */ /** @nocollapse */ McTagsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTagsModule, providers: [{
            provide: MC_TAGS_DEFAULT_OPTIONS,
            // tslint:disable-next-line: no-object-literal-type-assertion
            useValue: { separatorKeyCodes: [ENTER] }
        }], imports: [[CommonModule, PlatformModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTagsModule, decorators: [{
            type: NgModule,
            args: [{
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
                            useValue: { separatorKeyCodes: [ENTER] }
                        }]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MC_TAGS_DEFAULT_OPTIONS, McTag, McTagAvatar, McTagBase, McTagInput, McTagList, McTagListBase, McTagListChange, McTagListMixinBase, McTagMixinBase, McTagRemove, McTagSelectionChange, McTagTrailingIcon, McTagsModule };
//# sourceMappingURL=ptsecurity-mosaic-tags.mjs.map
