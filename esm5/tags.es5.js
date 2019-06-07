/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { InjectionToken, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Input, NgZone, Output, ViewEncapsulation, ChangeDetectorRef, Optional, Self, Inject, NgModule } from '@angular/core';
import { __extends } from 'tslib';
import { coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { BACKSPACE, DELETE, SPACE, END, HOME, hasModifierKey, ENTER } from '@ptsecurity/cdk/keycodes';
import { mixinColor, mixinDisabled, ErrorStateMatcher, mixinErrorState } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
import { Subject, merge } from 'rxjs';
import { take, startWith, takeUntil } from 'rxjs/operators';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { Directionality } from '@ptsecurity/cdk/bidi';
import { SelectionModel } from '@ptsecurity/cdk/collections';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { CommonModule } from '@angular/common';
import { PlatformModule } from '@ptsecurity/cdk/platform';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Injection token to be used to override the default options for the chips module.
 * @type {?}
 */
var MC_TAGS_DEFAULT_OPTIONS = new InjectionToken('mc-tags-default-options');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Event object emitted by McTag when selected or deselected.
 */
var  /**
 * Event object emitted by McTag when selected or deselected.
 */
McTagSelectionChange = /** @class */ (function () {
    function McTagSelectionChange(source, selected, isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.source = source;
        this.selected = selected;
        this.isUserInput = isUserInput;
    }
    return McTagSelectionChange;
}());
/** @type {?} */
var TAG_ATTRIBUTE_NAMES = ['mc-basic-tag'];
/**
 * Dummy directive to add CSS class to tag avatar.
 * \@docs-private
 */
var McTagAvatar = /** @class */ (function () {
    function McTagAvatar() {
    }
    McTagAvatar.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-tag-avatar, [mcTagAvatar]',
                    host: { class: 'mc-tag-avatar' }
                },] },
    ];
    return McTagAvatar;
}());
/**
 * Dummy directive to add CSS class to tag trailing icon.
 * \@docs-private
 */
var McTagTrailingIcon = /** @class */ (function () {
    function McTagTrailingIcon() {
    }
    McTagTrailingIcon.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-tag-trailing-icon, [mcTagTrailingIcon]',
                    host: { class: 'mc-tag-trailing-icon' }
                },] },
    ];
    return McTagTrailingIcon;
}());
var McTagBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McTagBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McTagBase;
}());
// tslint:disable-next-line:naming-convention
/** @type {?} */
var _McTagMixinBase = mixinColor(mixinDisabled(McTagBase));
var McTag = /** @class */ (function (_super) {
    __extends(McTag, _super);
    function McTag(elementRef, _ngZone) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        _this._ngZone = _ngZone;
        /**
         * Emits when the tag is focused.
         */
        _this.onFocus = new Subject();
        /**
         * Emits when the tag is blured.
         */
        _this.onBlur = new Subject();
        /**
         * Whether the tag has focus.
         */
        _this.hasFocus = false;
        /**
         * Whether the tag list is selectable
         */
        _this.tagListSelectable = true;
        /**
         * Emitted when the tag is selected or deselected.
         */
        _this.selectionChange = new EventEmitter();
        /**
         * Emitted when the tag is destroyed.
         */
        _this.destroyed = new EventEmitter();
        /**
         * Emitted when a tag is to be removed.
         */
        _this.removed = new EventEmitter();
        _this._selected = false;
        _this._selectable = true;
        _this._removable = true;
        _this._disabled = false;
        _this.addHostClassName();
        _this.nativeElement = elementRef.nativeElement;
        return _this;
    }
    Object.defineProperty(McTag.prototype, "selected", {
        /** Whether the tag is selected. */
        get: /**
         * Whether the tag is selected.
         * @return {?}
         */
        function () {
            return this._selected;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var coercedValue = coerceBooleanProperty(value);
            if (coercedValue !== this._selected) {
                this._selected = coercedValue;
                this.dispatchSelectionChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTag.prototype, "value", {
        /** The value of the tag. Defaults to the content inside `<mc-tag>` tags. */
        get: /**
         * The value of the tag. Defaults to the content inside `<mc-tag>` tags.
         * @return {?}
         */
        function () {
            return this._value !== undefined
                ? this._value
                : this.elementRef.nativeElement.textContent;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTag.prototype, "selectable", {
        /**
         * Whether or not the tag is selectable. When a tag is not selectable,
         * changes to its selected state are always ignored. By default a tag is
         * selectable, and it becomes non-selectable if its parent tag list is
         * not selectable.
         */
        get: /**
         * Whether or not the tag is selectable. When a tag is not selectable,
         * changes to its selected state are always ignored. By default a tag is
         * selectable, and it becomes non-selectable if its parent tag list is
         * not selectable.
         * @return {?}
         */
        function () {
            return this._selectable && this.tagListSelectable;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._selectable = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTag.prototype, "removable", {
        /**
         * Determines whether or not the tag displays the remove styling and emits (removed) events.
         */
        get: /**
         * Determines whether or not the tag displays the remove styling and emits (removed) events.
         * @return {?}
         */
        function () {
            return this._removable;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._removable = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTag.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this.disabled) {
                this._disabled = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McTag.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.addClassModificatorForIcons();
    };
    /**
     * @return {?}
     */
    McTag.prototype.addClassModificatorForIcons = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var icons = this.contentChildren.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item._elementRef.nativeElement; }));
        if (icons.length === 1) {
            /** @type {?} */
            var iconElement = icons[0];
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
            var firstIconElement = icons[0];
            /** @type {?} */
            var secondIconElement = icons[1];
            firstIconElement.classList.add('mc-icon_left');
            secondIconElement.classList.add('mc-icon_right');
        }
    };
    /**
     * @return {?}
     */
    McTag.prototype.addHostClassName = /**
     * @return {?}
     */
    function () {
        // Add class for the different tags
        for (var _i = 0, TAG_ATTRIBUTE_NAMES_1 = TAG_ATTRIBUTE_NAMES; _i < TAG_ATTRIBUTE_NAMES_1.length; _i++) {
            var attr = TAG_ATTRIBUTE_NAMES_1[_i];
            if (this.elementRef.nativeElement.hasAttribute(attr) ||
                this.elementRef.nativeElement.tagName.toLowerCase() === attr) {
                ((/** @type {?} */ (this.elementRef.nativeElement))).classList.add(attr);
                return;
            }
        }
        ((/** @type {?} */ (this.elementRef.nativeElement))).classList.add('mc-standard-tag');
    };
    /**
     * @return {?}
     */
    McTag.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed.emit({ tag: this });
    };
    /**
     * @return {?}
     */
    McTag.prototype.select = /**
     * @return {?}
     */
    function () {
        if (!this._selected) {
            this._selected = true;
            this.dispatchSelectionChange();
        }
    };
    /**
     * @return {?}
     */
    McTag.prototype.deselect = /**
     * @return {?}
     */
    function () {
        if (this._selected) {
            this._selected = false;
            this.dispatchSelectionChange();
        }
    };
    /**
     * @return {?}
     */
    McTag.prototype.selectViaInteraction = /**
     * @return {?}
     */
    function () {
        if (!this._selected) {
            this._selected = true;
            this.dispatchSelectionChange(true);
        }
    };
    /**
     * @param {?=} isUserInput
     * @return {?}
     */
    McTag.prototype.toggleSelected = /**
     * @param {?=} isUserInput
     * @return {?}
     */
    function (isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this._selected = !this.selected;
        this.dispatchSelectionChange(isUserInput);
        return this.selected;
    };
    /** Allows for programmatic focusing of the tag. */
    /**
     * Allows for programmatic focusing of the tag.
     * @return {?}
     */
    McTag.prototype.focus = /**
     * Allows for programmatic focusing of the tag.
     * @return {?}
     */
    function () {
        if (!this.hasFocus) {
            this.elementRef.nativeElement.focus();
            this.onFocus.next({ tag: this });
        }
        this.hasFocus = true;
    };
    /**
     * Allows for programmatic removal of the tag. Called by the McTagList when the DELETE or
     * BACKSPACE keys are pressed.
     *
     * Informs any listeners of the removal request. Does not remove the tag from the DOM.
     */
    /**
     * Allows for programmatic removal of the tag. Called by the McTagList when the DELETE or
     * BACKSPACE keys are pressed.
     *
     * Informs any listeners of the removal request. Does not remove the tag from the DOM.
     * @return {?}
     */
    McTag.prototype.remove = /**
     * Allows for programmatic removal of the tag. Called by the McTagList when the DELETE or
     * BACKSPACE keys are pressed.
     *
     * Informs any listeners of the removal request. Does not remove the tag from the DOM.
     * @return {?}
     */
    function () {
        if (this.removable) {
            this.removed.emit({ tag: this });
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McTag.prototype.handleClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.disabled) {
            event.preventDefault();
        }
        else {
            event.stopPropagation();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McTag.prototype.handleKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    /**
     * @return {?}
     */
    McTag.prototype.blur = /**
     * @return {?}
     */
    function () {
        var _this = this;
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
        function () {
            _this._ngZone.run((/**
             * @return {?}
             */
            function () {
                _this.hasFocus = false;
                _this.onBlur.next({ tag: _this });
            }));
        }));
    };
    /**
     * @private
     * @param {?=} isUserInput
     * @return {?}
     */
    McTag.prototype.dispatchSelectionChange = /**
     * @private
     * @param {?=} isUserInput
     * @return {?}
     */
    function (isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.selectionChange.emit({
            source: this,
            isUserInput: isUserInput,
            selected: this._selected
        });
    };
    McTag.decorators = [
        { type: Component, args: [{
                    selector: 'mc-tag, [mc-tag], mc-basic-tag, [mc-basic-tag]',
                    exportAs: 'mcTag',
                    template: "<div class=\"mc-tag__wrapper\"><span class=\"mc-tag__text\"><ng-content></ng-content></span><ng-content select=\"[mc-icon]\"></ng-content><div class=\"mc-tag-overlay\"></div></div>",
                    styles: [".mc-tag{position:relative;display:inline-block;overflow:hidden;margin:2px;height:22px;border-width:1px;border-style:solid;border-radius:4px;cursor:default;outline:0}.mc-tag.mc-left-icon{padding-left:3px}.mc-tag.mc-right-icon{padding-right:3px}.mc-tag__wrapper{display:flex;align-items:center;height:100%;flex:1 1 100%}.mc-tag__wrapper .mc-icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:22px;height:22px}.mc-tag__wrapper .mc-icon_left{margin-right:3px}.mc-tag__wrapper .mc-icon_right{margin-left:3px}.mc-tag-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}.mc-tag__text{margin-left:7px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}"],
                    inputs: ['color', 'disabled'],
                    host: {
                        class: 'mc-tag',
                        '[attr.tabindex]': 'disabled ? null : -1',
                        '[class.mc-tag-selected]': 'selected',
                        '[class.mc-tag-with-avatar]': 'avatar',
                        '[class.mc-tag-with-trailing-icon]': 'trailingIcon || removeIcon',
                        '[class.mc-tag-disabled]': 'disabled',
                        '[class.mc-disabled]': 'disabled',
                        '[attr.disabled]': 'disabled || null',
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
    McTag.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    McTag.propDecorators = {
        contentChildren: [{ type: ContentChildren, args: [McIcon,] }],
        avatar: [{ type: ContentChild, args: [McTagAvatar, { static: false },] }],
        trailingIcon: [{ type: ContentChild, args: [McTagTrailingIcon, { static: false },] }],
        removeIcon: [{ type: ContentChild, args: [forwardRef((/**
                     * @return {?}
                     */
                    function () { return McTagRemove; })), { static: false },] }],
        selectionChange: [{ type: Output }],
        destroyed: [{ type: Output }],
        removed: [{ type: Output }],
        selected: [{ type: Input }],
        value: [{ type: Input }],
        selectable: [{ type: Input }],
        removable: [{ type: Input }]
    };
    return McTag;
}(_McTagMixinBase));
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
var McTagRemove = /** @class */ (function () {
    function McTagRemove(parentTag) {
        this.parentTag = parentTag;
    }
    /** Calls the parent tag's public `remove()` method if applicable. */
    /**
     * Calls the parent tag's public `remove()` method if applicable.
     * @param {?} event
     * @return {?}
     */
    McTagRemove.prototype.handleClick = /**
     * Calls the parent tag's public `remove()` method if applicable.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.parentTag.removable) {
            this.parentTag.remove();
        }
        // We need to stop event propagation because otherwise the event will bubble up to the
        // form field and cause the `onContainerClick` method to be invoked. This method would then
        // reset the focused tag that has been focused after tag removal. Usually the parent
        // the parent click listener of the `McTag` would prevent propagation, but it can happen
        // that the tag is being removed before the event bubbles up.
        event.stopPropagation();
    };
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
    McTagRemove.ctorParameters = function () { return [
        { type: McTag }
    ]; };
    return McTagRemove;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McTagListBase = /** @class */ (function () {
    function McTagListBase(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
        this.defaultErrorStateMatcher = defaultErrorStateMatcher;
        this.parentForm = parentForm;
        this.parentFormGroup = parentFormGroup;
        this.ngControl = ngControl;
    }
    return McTagListBase;
}());
// tslint:disable-next-line:naming-convention
/** @type {?} */
var _McTagListMixinBase = mixinErrorState(McTagListBase);
// Increasing integer for generating unique ids for tag-list components.
/** @type {?} */
var nextUniqueId = 0;
/**
 * Change event object that is emitted when the tag list value has changed.
 */
var  /**
 * Change event object that is emitted when the tag list value has changed.
 */
McTagListChange = /** @class */ (function () {
    function McTagListChange(source, value) {
        this.source = source;
        this.value = value;
    }
    return McTagListChange;
}());
var McTagList = /** @class */ (function (_super) {
    __extends(McTagList, _super);
    function McTagList(elementRef, changeDetectorRef, defaultErrorStateMatcher, dir, parentForm, parentFormGroup, ngControl) {
        var _this = _super.call(this, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) || this;
        _this.elementRef = elementRef;
        _this.changeDetectorRef = changeDetectorRef;
        _this.dir = dir;
        _this.ngControl = ngControl;
        _this.controlType = 'mc-tag-list';
        /**
         * Event that emits whenever the raw value of the tag-list changes. This is here primarily
         * to facilitate the two-way binding for the `value` input.
         * \@docs-private
         */
        _this.valueChange = new EventEmitter();
        _this.uid = "mc-tag-list-" + nextUniqueId++;
        /**
         * User defined tab index.
         * When it is not null, use user defined tab index. Otherwise use tabIndex
         */
        _this.userTabIndex = null;
        _this.tagChanges = new EventEmitter();
        /**
         * Orientation of the tag list.
         */
        _this.orientation = 'horizontal';
        /**
         * Event emitted when the selected tag list value has been changed by the user.
         */
        _this.change = new EventEmitter();
        _this._tabIndex = 0;
        _this._required = false;
        _this._disabled = false;
        _this._selectable = true;
        _this._multiple = false;
        /**
         * When a tag is destroyed, we store the index of the destroyed tag until the tags
         * query list notifies about the update. This is necessary because we cannot determine an
         * appropriate tag that should receive focus until the array of tags updated completely.
         */
        _this.lastDestroyedTagIndex = null;
        /**
         * Subject that emits when the component has been destroyed.
         */
        _this.destroyed = new Subject();
        // tslint:disable-next-line:no-empty
        _this.onTouched = (/**
         * @return {?}
         */
        function () { });
        // tslint:disable-next-line:no-empty
        _this.onChange = (/**
         * @return {?}
         */
        function () { });
        _this._compareWith = (/**
         * @param {?} o1
         * @param {?} o2
         * @return {?}
         */
        function (o1, o2) { return o1 === o2; });
        if (_this.ngControl) {
            _this.ngControl.valueAccessor = _this;
        }
        return _this;
    }
    Object.defineProperty(McTagList.prototype, "tagSelectionChanges", {
        /** Combined stream of all of the child tags' selection change events. */
        get: /**
         * Combined stream of all of the child tags' selection change events.
         * @return {?}
         */
        function () {
            return merge.apply(void 0, this.tags.map((/**
             * @param {?} tag
             * @return {?}
             */
            function (tag) { return tag.selectionChange; })));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTagList.prototype, "tagFocusChanges", {
        /** Combined stream of all of the child tags' focus change events. */
        get: /**
         * Combined stream of all of the child tags' focus change events.
         * @return {?}
         */
        function () {
            return merge.apply(void 0, this.tags.map((/**
             * @param {?} tag
             * @return {?}
             */
            function (tag) { return tag.onFocus; })));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTagList.prototype, "tagBlurChanges", {
        /** Combined stream of all of the child tags' blur change events. */
        get: /**
         * Combined stream of all of the child tags' blur change events.
         * @return {?}
         */
        function () {
            return merge.apply(void 0, this.tags.map((/**
             * @param {?} tag
             * @return {?}
             */
            function (tag) { return tag.onBlur; })));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTagList.prototype, "tagRemoveChanges", {
        /** Combined stream of all of the child tags' remove change events. */
        get: /**
         * Combined stream of all of the child tags' remove change events.
         * @return {?}
         */
        function () {
            return merge.apply(void 0, this.tags.map((/**
             * @param {?} tag
             * @return {?}
             */
            function (tag) { return tag.destroyed; })));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTagList.prototype, "selected", {
        /** The array of selected tags inside tag list. */
        get: /**
         * The array of selected tags inside tag list.
         * @return {?}
         */
        function () {
            return this.multiple ? this.selectionModel.selected : this.selectionModel.selected[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTagList.prototype, "multiple", {
        /** Whether the user should be allowed to select multiple tags. */
        get: /**
         * Whether the user should be allowed to select multiple tags.
         * @return {?}
         */
        function () {
            return this._multiple;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._multiple = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTagList.prototype, "compareWith", {
        /**
         * A function to compare the option values with the selected values. The first argument
         * is a value from an option. The second is a value from the selection. A boolean
         * should be returned.
         */
        get: /**
         * A function to compare the option values with the selected values. The first argument
         * is a value from an option. The second is a value from the selection. A boolean
         * should be returned.
         * @return {?}
         */
        function () {
            return this._compareWith;
        },
        set: /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this._compareWith = fn;
            if (this.selectionModel) {
                // A different comparator means the selection could change.
                this.initializeSelection();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTagList.prototype, "value", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.writeValue(value);
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTagList.prototype, "id", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            return this.tagInput ? this.tagInput.id : this.uid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTagList.prototype, "required", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            return this._required;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._required = coerceBooleanProperty(value);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTagList.prototype, "placeholder", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            return this.tagInput ? this.tagInput.placeholder : this._placeholder;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._placeholder = value;
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTagList.prototype, "focused", {
        /** Whether any tags or the mcTagInput inside of this tag-list has focus. */
        get: /**
         * Whether any tags or the mcTagInput inside of this tag-list has focus.
         * @return {?}
         */
        function () {
            return (this.tagInput && this.tagInput.focused) || this.hasFocusedTag();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTagList.prototype, "empty", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            return (!this.tagInput || this.tagInput.empty) && this.tags.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTagList.prototype, "shouldLabelFloat", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            return !this.empty || this.focused;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTagList.prototype, "disabled", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            return this.ngControl ? !!this.ngControl.disabled : this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = coerceBooleanProperty(value);
            this.syncTagsDisabledState();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTagList.prototype, "selectable", {
        /**
         * Whether or not this tag list is selectable. When a tag list is not selectable,
         * the selected states for all the tags inside the tag list are always ignored.
         */
        get: /**
         * Whether or not this tag list is selectable. When a tag list is not selectable,
         * the selected states for all the tags inside the tag list are always ignored.
         * @return {?}
         */
        function () {
            return this._selectable;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            this._selectable = coerceBooleanProperty(value);
            if (this.tags) {
                this.tags.forEach((/**
                 * @param {?} tag
                 * @return {?}
                 */
                function (tag) { return tag.tagListSelectable = _this._selectable; }));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTagList.prototype, "tabIndex", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.userTabIndex = value;
            this._tabIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McTagList.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
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
            function (dir) { return _this.keyManager.withHorizontalOrientation(dir); }));
        }
        // Prevents the tag list from capturing focus and redirecting
        // it back to the first tag when the user tabs out.
        this.keyManager.tabOut
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this._tabIndex = -1;
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this._tabIndex = _this.userTabIndex || 0;
                _this.changeDetectorRef.markForCheck();
            }));
        }));
        // When the list changes, re-subscribe
        this.tags.changes
            .pipe(startWith(null), takeUntil(this.destroyed))
            .subscribe((/**
         * @return {?}
         */
        function () {
            if (_this.disabled) {
                // Since this happens after the content has been
                // checked, we need to defer it to the next tick.
                Promise.resolve().then((/**
                 * @return {?}
                 */
                function () { _this.syncTagsDisabledState(); }));
            }
            _this.resetTags();
            // Reset tags selected/deselected status
            _this.initializeSelection();
            // Check to see if we need to update our tab index
            _this.updateTabIndex();
            // Check to see if we have a destroyed tag and need to refocus
            _this.updateFocusForDestroyedTags();
            // Defer setting the value in order to avoid the "Expression
            // has changed after it was checked" errors from Angular.
            Promise.resolve().then((/**
             * @return {?}
             */
            function () { _this.tagChanges.emit(_this.tags.toArray()); }));
            _this.stateChanges.next();
        }));
    };
    /**
     * @return {?}
     */
    McTagList.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.selectionModel = new SelectionModel(this.multiple, undefined, false);
        this.stateChanges.next();
    };
    /**
     * @return {?}
     */
    McTagList.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    };
    /**
     * @return {?}
     */
    McTagList.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed.next();
        this.destroyed.complete();
        this.stateChanges.complete();
        this.dropSubscriptions();
    };
    /** Associates an HTML input element with this tag list. */
    /**
     * Associates an HTML input element with this tag list.
     * @param {?} inputElement
     * @return {?}
     */
    McTagList.prototype.registerInput = /**
     * Associates an HTML input element with this tag list.
     * @param {?} inputElement
     * @return {?}
     */
    function (inputElement) {
        this.tagInput = inputElement;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} value
     * @return {?}
     */
    McTagList.prototype.writeValue = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.tags) {
            this.setSelectionByValue(value, false);
        }
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    McTagList.prototype.registerOnChange = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    McTagList.prototype.registerOnTouched = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    McTagList.prototype.setDisabledState = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
        this.stateChanges.next();
    };
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @param {?} event
     * @return {?}
     */
    McTagList.prototype.onContainerClick = /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.originatesFromTag(event)) {
            this.focus();
        }
    };
    /**
     * Focuses the first non-disabled tag in this tag list, or the associated input when there
     * are no eligible tags.
     */
    /**
     * Focuses the first non-disabled tag in this tag list, or the associated input when there
     * are no eligible tags.
     * @return {?}
     */
    McTagList.prototype.focus = /**
     * Focuses the first non-disabled tag in this tag list, or the associated input when there
     * are no eligible tags.
     * @return {?}
     */
    function () {
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
    };
    /** Attempt to focus an input if we have one. */
    /**
     * Attempt to focus an input if we have one.
     * @return {?}
     */
    McTagList.prototype.focusInput = /**
     * Attempt to focus an input if we have one.
     * @return {?}
     */
    function () {
        if (this.tagInput) {
            this.tagInput.focus();
        }
    };
    /**
     * Pass events to the keyboard manager. Available here for tests.
     */
    /**
     * Pass events to the keyboard manager. Available here for tests.
     * @param {?} event
     * @return {?}
     */
    McTagList.prototype.keydown = /**
     * Pass events to the keyboard manager. Available here for tests.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var target = (/** @type {?} */ (event.target));
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
    };
    /**
     * @param {?} value
     * @param {?=} isUserInput
     * @return {?}
     */
    McTagList.prototype.setSelectionByValue = /**
     * @param {?} value
     * @param {?=} isUserInput
     * @return {?}
     */
    function (value, isUserInput) {
        var _this = this;
        if (isUserInput === void 0) { isUserInput = true; }
        this.clearSelection();
        this.tags.forEach((/**
         * @param {?} tag
         * @return {?}
         */
        function (tag) { return tag.deselect(); }));
        if (Array.isArray(value)) {
            value.forEach((/**
             * @param {?} currentValue
             * @return {?}
             */
            function (currentValue) { return _this.selectValue(currentValue, isUserInput); }));
            this.sortValues();
        }
        else {
            /** @type {?} */
            var correspondingTag = this.selectValue(value, isUserInput);
            // Shift focus to the active item. Note that we shouldn't do this in multiple
            // mode, because we don't know what tag the user interacted with last.
            if (correspondingTag && isUserInput) {
                this.keyManager.setActiveItem(correspondingTag);
            }
        }
    };
    /** When blurred, mark the field as touched when focus moved outside the tag list. */
    /**
     * When blurred, mark the field as touched when focus moved outside the tag list.
     * @return {?}
     */
    McTagList.prototype.blur = /**
     * When blurred, mark the field as touched when focus moved outside the tag list.
     * @return {?}
     */
    function () {
        var _this = this;
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
                function () {
                    if (!_this.focused) {
                        _this.markAsTouched();
                    }
                }));
            }
            else {
                // If there's no tag input, then mark the field as touched.
                this.markAsTouched();
            }
        }
    };
    /** Mark the field as touched */
    /**
     * Mark the field as touched
     * @return {?}
     */
    McTagList.prototype.markAsTouched = /**
     * Mark the field as touched
     * @return {?}
     */
    function () {
        this.onTouched();
        this.changeDetectorRef.markForCheck();
        this.stateChanges.next();
    };
    /**
     * Check the tab index as you should not be allowed to focus an empty list.
     */
    /**
     * Check the tab index as you should not be allowed to focus an empty list.
     * @protected
     * @return {?}
     */
    McTagList.prototype.updateTabIndex = /**
     * Check the tab index as you should not be allowed to focus an empty list.
     * @protected
     * @return {?}
     */
    function () {
        // If we have 0 tags, we should not allow keyboard focus
        this._tabIndex = this.userTabIndex || (this.tags.length === 0 ? -1 : 0);
    };
    /**
     * If the amount of tags changed, we need to update the
     * key manager state and focus the next closest tag.
     */
    /**
     * If the amount of tags changed, we need to update the
     * key manager state and focus the next closest tag.
     * @protected
     * @return {?}
     */
    McTagList.prototype.updateFocusForDestroyedTags = /**
     * If the amount of tags changed, we need to update the
     * key manager state and focus the next closest tag.
     * @protected
     * @return {?}
     */
    function () {
        if (this.lastDestroyedTagIndex != null && this.tags.length) {
            /** @type {?} */
            var newTagIndex = Math.min(this.lastDestroyedTagIndex, this.tags.length - 1);
            this.keyManager.setActiveItem(newTagIndex);
        }
        else if (this.tags.length === 0) {
            this.focusInput();
        }
        this.lastDestroyedTagIndex = null;
    };
    /**
     * Utility to ensure all indexes are valid.
     *
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of tags.
     */
    /**
     * Utility to ensure all indexes are valid.
     *
     * @private
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of tags.
     */
    McTagList.prototype.isValidIndex = /**
     * Utility to ensure all indexes are valid.
     *
     * @private
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of tags.
     */
    function (index) {
        return index >= 0 && index < this.tags.length;
    };
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    McTagList.prototype.isInputEmpty = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        if (element && element.nodeName.toLowerCase() === 'input') {
            /** @type {?} */
            var input = (/** @type {?} */ (element));
            return !input.value;
        }
        return false;
    };
    /**
     * Finds and selects the tag based on its value.
     * @returns Tag that has the corresponding value.
     */
    /**
     * Finds and selects the tag based on its value.
     * @private
     * @param {?} value
     * @param {?=} isUserInput
     * @return {?} Tag that has the corresponding value.
     */
    McTagList.prototype.selectValue = /**
     * Finds and selects the tag based on its value.
     * @private
     * @param {?} value
     * @param {?=} isUserInput
     * @return {?} Tag that has the corresponding value.
     */
    function (value, isUserInput) {
        var _this = this;
        if (isUserInput === void 0) { isUserInput = true; }
        /** @type {?} */
        var correspondingTag = this.tags.find((/**
         * @param {?} tag
         * @return {?}
         */
        function (tag) {
            return tag.value != null && _this._compareWith(tag.value, value);
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
    };
    /**
     * @private
     * @return {?}
     */
    McTagList.prototype.initializeSelection = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        // Defer setting the value in order to avoid the "Expression
        // has changed after it was checked" errors from Angular.
        Promise.resolve().then((/**
         * @return {?}
         */
        function () {
            if (_this.ngControl || _this._value) {
                _this.setSelectionByValue(_this.ngControl ? _this.ngControl.value : _this._value, false);
                _this.stateChanges.next();
            }
        }));
    };
    /**
     * Deselects every tag in the list.
     * @param skip Tag that should not be deselected.
     */
    /**
     * Deselects every tag in the list.
     * @private
     * @param {?=} skip Tag that should not be deselected.
     * @return {?}
     */
    McTagList.prototype.clearSelection = /**
     * Deselects every tag in the list.
     * @private
     * @param {?=} skip Tag that should not be deselected.
     * @return {?}
     */
    function (skip) {
        this.selectionModel.clear();
        this.tags.forEach((/**
         * @param {?} tag
         * @return {?}
         */
        function (tag) {
            if (tag !== skip) {
                tag.deselect();
            }
        }));
        this.stateChanges.next();
    };
    /**
     * Sorts the model values, ensuring that they keep the same
     * order that they have in the panel.
     */
    /**
     * Sorts the model values, ensuring that they keep the same
     * order that they have in the panel.
     * @private
     * @return {?}
     */
    McTagList.prototype.sortValues = /**
     * Sorts the model values, ensuring that they keep the same
     * order that they have in the panel.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._multiple) {
            this.selectionModel.clear();
            this.tags.forEach((/**
             * @param {?} tag
             * @return {?}
             */
            function (tag) {
                if (tag.selected) {
                    _this.selectionModel.select(tag);
                }
            }));
            this.stateChanges.next();
        }
    };
    /** Emits change event to set the model value. */
    /**
     * Emits change event to set the model value.
     * @private
     * @param {?=} fallbackValue
     * @return {?}
     */
    McTagList.prototype.propagateChanges = /**
     * Emits change event to set the model value.
     * @private
     * @param {?=} fallbackValue
     * @return {?}
     */
    function (fallbackValue) {
        /** @type {?} */
        var valueToEmit = null;
        if (Array.isArray(this.selected)) {
            valueToEmit = this.selected.map((/**
             * @param {?} tag
             * @return {?}
             */
            function (tag) { return tag.value; }));
        }
        else {
            valueToEmit = this.selected ? this.selected.value : fallbackValue;
        }
        this._value = valueToEmit;
        this.change.emit(new McTagListChange(this, valueToEmit));
        this.valueChange.emit(valueToEmit);
        this.onChange(valueToEmit);
        this.changeDetectorRef.markForCheck();
    };
    /**
     * @private
     * @return {?}
     */
    McTagList.prototype.resetTags = /**
     * @private
     * @return {?}
     */
    function () {
        this.dropSubscriptions();
        this.listenToTagsFocus();
        this.listenToTagsSelection();
        this.listenToTagsRemoved();
    };
    /**
     * @private
     * @return {?}
     */
    McTagList.prototype.dropSubscriptions = /**
     * @private
     * @return {?}
     */
    function () {
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
    };
    /** Listens to user-generated selection events on each tag. */
    /**
     * Listens to user-generated selection events on each tag.
     * @private
     * @return {?}
     */
    McTagList.prototype.listenToTagsSelection = /**
     * Listens to user-generated selection events on each tag.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.tagSelectionSubscription = this.tagSelectionChanges.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event.source.selected) {
                _this.selectionModel.select(event.source);
            }
            else {
                _this.selectionModel.deselect(event.source);
            }
            // For single selection tag list, make sure the deselected value is unselected.
            if (!_this.multiple) {
                _this.tags.forEach((/**
                 * @param {?} tag
                 * @return {?}
                 */
                function (tag) {
                    if (!_this.selectionModel.isSelected(tag) && tag.selected) {
                        tag.deselect();
                    }
                }));
            }
            if (event.isUserInput) {
                _this.propagateChanges();
            }
        }));
    };
    /** Listens to user-generated selection events on each tag. */
    /**
     * Listens to user-generated selection events on each tag.
     * @private
     * @return {?}
     */
    McTagList.prototype.listenToTagsFocus = /**
     * Listens to user-generated selection events on each tag.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.tagFocusSubscription = this.tagFocusChanges.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var tagIndex = _this.tags.toArray().indexOf(event.tag);
            if (_this.isValidIndex(tagIndex)) {
                _this.keyManager.updateActiveItem(tagIndex);
            }
            _this.stateChanges.next();
        }));
        this.tagBlurSubscription = this.tagBlurChanges.subscribe((/**
         * @return {?}
         */
        function () {
            _this.blur();
            _this.stateChanges.next();
        }));
    };
    /**
     * @private
     * @return {?}
     */
    McTagList.prototype.listenToTagsRemoved = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.tagRemoveSubscription = this.tagRemoveChanges.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var tag = event.tag;
            /** @type {?} */
            var tagIndex = _this.tags.toArray().indexOf(event.tag);
            // In case the tag that will be removed is currently focused, we temporarily store
            // the index in order to be able to determine an appropriate sibling tag that will
            // receive focus.
            if (_this.isValidIndex(tagIndex) && tag.hasFocus) {
                _this.lastDestroyedTagIndex = tagIndex;
            }
        }));
    };
    /** Checks whether an event comes from inside a tag element. */
    /**
     * Checks whether an event comes from inside a tag element.
     * @private
     * @param {?} event
     * @return {?}
     */
    McTagList.prototype.originatesFromTag = /**
     * Checks whether an event comes from inside a tag element.
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var currentElement = (/** @type {?} */ (event.target));
        while (currentElement && currentElement !== this.elementRef.nativeElement) {
            if (currentElement.classList.contains('mc-tag')) {
                return true;
            }
            currentElement = currentElement.parentElement;
        }
        return false;
    };
    /** Checks whether any of the tags is focused. */
    /**
     * Checks whether any of the tags is focused.
     * @private
     * @return {?}
     */
    McTagList.prototype.hasFocusedTag = /**
     * Checks whether any of the tags is focused.
     * @private
     * @return {?}
     */
    function () {
        return this.tags.some((/**
         * @param {?} tag
         * @return {?}
         */
        function (tag) { return tag.hasFocus; }));
    };
    /** Syncs the list's disabled state with the individual tags. */
    /**
     * Syncs the list's disabled state with the individual tags.
     * @private
     * @return {?}
     */
    McTagList.prototype.syncTagsDisabledState = /**
     * Syncs the list's disabled state with the individual tags.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.tags) {
            this.tags.forEach((/**
             * @param {?} tag
             * @return {?}
             */
            function (tag) {
                tag.disabled = _this._disabled;
            }));
        }
    };
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
                    styles: [".mc-tag-list{display:flex;flex-wrap:wrap;min-height:28px;padding:2px 6px}.mc-tag-list .mc-tag-input{flex:1 1 auto;height:22px;margin:2px 4px}.mc-tag-input{border:none;outline:0;background:0 0}"],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    McTagList.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: ErrorStateMatcher },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: NgForm, decorators: [{ type: Optional }] },
        { type: FormGroupDirective, decorators: [{ type: Optional }] },
        { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
    ]; };
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
        tags: [{ type: ContentChildren, args: [McTag,] }]
    };
    return McTagList;
}(_McTagListMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Increasing integer for generating unique ids.
/** @type {?} */
var nextUniqueId$1 = 0;
/**
 * Directive that adds tag-specific behaviors to an input element inside `<mc-form-field>`.
 * May be placed inside or outside of an `<mc-tag-list>`.
 */
var McTagInput = /** @class */ (function () {
    function McTagInput(elementRef, defaultOptions) {
        this.elementRef = elementRef;
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
        this.id = "mc-tag-list-input-" + nextUniqueId$1++;
        this._addOnBlur = false;
        this._disabled = false;
        // tslint:disable-next-line: no-unnecessary-type-assertion
        this.inputElement = (/** @type {?} */ (this.elementRef.nativeElement));
    }
    Object.defineProperty(McTagInput.prototype, "tagList", {
        /** Register input for tag list */
        set: /**
         * Register input for tag list
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._tagList = value;
                this._tagList.registerInput(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTagInput.prototype, "addOnBlur", {
        /**
         * Whether or not the tagEnd event will be emitted when the input is blurred.
         */
        get: /**
         * Whether or not the tagEnd event will be emitted when the input is blurred.
         * @return {?}
         */
        function () {
            return this._addOnBlur;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._addOnBlur = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTagInput.prototype, "disabled", {
        /** Whether the input is disabled. */
        get: /**
         * Whether the input is disabled.
         * @return {?}
         */
        function () {
            return this._disabled || (this._tagList && this._tagList.disabled);
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTagInput.prototype, "empty", {
        /** Whether the input is empty. */
        get: /**
         * Whether the input is empty.
         * @return {?}
         */
        function () {
            return !this.inputElement.value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McTagInput.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this._tagList.stateChanges.next();
    };
    /** Utility method to make host definition/tests more clear. */
    /**
     * Utility method to make host definition/tests more clear.
     * @param {?=} event
     * @return {?}
     */
    McTagInput.prototype.keydown = /**
     * Utility method to make host definition/tests more clear.
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        this.emittagEnd(event);
    };
    /** Checks to see if the blur should emit the (tagEnd) event. */
    /**
     * Checks to see if the blur should emit the (tagEnd) event.
     * @return {?}
     */
    McTagInput.prototype.blur = /**
     * Checks to see if the blur should emit the (tagEnd) event.
     * @return {?}
     */
    function () {
        if (this.addOnBlur) {
            this.emittagEnd();
        }
        this.focused = false;
        // Blur the tag list if it is not focused
        if (!this._tagList.focused) {
            this._tagList.blur();
        }
        this._tagList.stateChanges.next();
    };
    /** Checks to see if the (tagEnd) event needs to be emitted. */
    /**
     * Checks to see if the (tagEnd) event needs to be emitted.
     * @param {?=} event
     * @return {?}
     */
    McTagInput.prototype.emittagEnd = /**
     * Checks to see if the (tagEnd) event needs to be emitted.
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        if (!this.inputElement.value && !!event) {
            this._tagList.keydown(event);
        }
        if (!event || this.isSeparatorKey(event)) {
            this.tagEnd.emit({ input: this.inputElement, value: this.inputElement.value });
            if (event) {
                event.preventDefault();
            }
        }
    };
    /**
     * @return {?}
     */
    McTagInput.prototype.onInput = /**
     * @return {?}
     */
    function () {
        // Let tag list know whenever the value changes.
        this._tagList.stateChanges.next();
    };
    /**
     * @return {?}
     */
    McTagInput.prototype.onFocus = /**
     * @return {?}
     */
    function () {
        this.focused = true;
        this._tagList.stateChanges.next();
    };
    /** Focuses the input. */
    /**
     * Focuses the input.
     * @return {?}
     */
    McTagInput.prototype.focus = /**
     * Focuses the input.
     * @return {?}
     */
    function () {
        this.inputElement.focus();
    };
    /** Checks whether a keycode is one of the configured separators. */
    /**
     * Checks whether a keycode is one of the configured separators.
     * @private
     * @param {?} event
     * @return {?}
     */
    McTagInput.prototype.isSeparatorKey = /**
     * Checks whether a keycode is one of the configured separators.
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (hasModifierKey(event)) {
            return false;
        }
        /** @type {?} */
        var separators = this.separatorKeyCodes;
        // tslint:disable-next-line: deprecation
        /** @type {?} */
        var keyCode = event.keyCode;
        return Array.isArray(separators) ? separators.indexOf(keyCode) > -1 : separators.has(keyCode);
    };
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
    McTagInput.ctorParameters = function () { return [
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [MC_TAGS_DEFAULT_OPTIONS,] }] }
    ]; };
    McTagInput.propDecorators = {
        separatorKeyCodes: [{ type: Input, args: ['mcTagInputSeparatorKeyCodes',] }],
        tagEnd: [{ type: Output, args: ['mcTagInputTokenEnd',] }],
        placeholder: [{ type: Input }],
        id: [{ type: Input }],
        tagList: [{ type: Input, args: ['mcTagInputFor',] }],
        addOnBlur: [{ type: Input, args: ['mcTagInputAddOnBlur',] }],
        disabled: [{ type: Input }]
    };
    return McTagInput;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ɵ0 = ({ separatorKeyCodes: [ENTER] });
var McTagsModule = /** @class */ (function () {
    function McTagsModule() {
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
    return McTagsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McTagsModule, McTagSelectionChange, McTagAvatar, McTagTrailingIcon, McTagBase, _McTagMixinBase, McTag, McTagRemove, McTagListBase, _McTagListMixinBase, McTagListChange, McTagList, McTagInput, MC_TAGS_DEFAULT_OPTIONS };
//# sourceMappingURL=tags.es5.js.map
