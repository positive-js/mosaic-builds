/**
 * @fileoverview added by tsickle
 * Generated from: tag-list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends, __read, __spread } from "tslib";
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
var McTagListBase = /** @class */ (function () {
    function McTagListBase(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
        this.defaultErrorStateMatcher = defaultErrorStateMatcher;
        this.parentForm = parentForm;
        this.parentFormGroup = parentFormGroup;
        this.ngControl = ngControl;
    }
    return McTagListBase;
}());
export { McTagListBase };
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
export var McTagListMixinBase = mixinErrorState(McTagListBase);
// Increasing integer for generating unique ids for tag-list components.
/** @type {?} */
var nextUniqueId = 0;
/**
 * Change event object that is emitted when the tag list value has changed.
 */
var /**
 * Change event object that is emitted when the tag list value has changed.
 */
McTagListChange = /** @class */ (function () {
    function McTagListChange(source, value) {
        this.source = source;
        this.value = value;
    }
    return McTagListChange;
}());
/**
 * Change event object that is emitted when the tag list value has changed.
 */
export { McTagListChange };
if (false) {
    /** @type {?} */
    McTagListChange.prototype.source;
    /** @type {?} */
    McTagListChange.prototype.value;
}
var McTagList = /** @class */ (function (_super) {
    __extends(McTagList, _super);
    function McTagList(elementRef, changeDetectorRef, defaultErrorStateMatcher, rawValidators, mcValidation, dir, parentForm, parentFormGroup, ngControl, ngModel, formControlName) {
        var _this = _super.call(this, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) || this;
        _this.elementRef = elementRef;
        _this.changeDetectorRef = changeDetectorRef;
        _this.rawValidators = rawValidators;
        _this.mcValidation = mcValidation;
        _this.dir = dir;
        _this.ngModel = ngModel;
        _this.formControlName = formControlName;
        _this.controlType = 'mc-tag-list';
        _this._tabIndex = 0;
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
            return merge.apply(void 0, __spread(this.tags.map((/**
             * @param {?} tag
             * @return {?}
             */
            function (tag) { return tag.selectionChange; }))));
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
            return merge.apply(void 0, __spread(this.tags.map((/**
             * @param {?} tag
             * @return {?}
             */
            function (tag) { return tag.onFocus; }))));
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
            return merge.apply(void 0, __spread(this.tags.map((/**
             * @param {?} tag
             * @return {?}
             */
            function (tag) { return tag.onBlur; }))));
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
            return merge.apply(void 0, __spread(this.tags.map((/**
             * @param {?} tag
             * @return {?}
             */
            function (tag) { return tag.destroyed; }))));
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
    Object.defineProperty(McTagList.prototype, "canShowCleaner", {
        get: /**
         * @return {?}
         */
        function () {
            return this.cleaner && this.tags.length > 0;
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
        get: /**
         * @return {?}
         */
        function () {
            return this._tabIndex;
        },
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
            function () {
                _this.tagChanges.emit(_this.tags.toArray());
                _this.stateChanges.next();
                _this.propagateTagsChanges();
            }));
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
        var _this = this;
        this.tagInput = inputElement;
        // todo need rethink about it
        if (this.ngControl && inputElement.ngControl) {
            (/** @type {?} */ (inputElement.ngControl.statusChanges)).subscribe((/**
             * @return {?}
             */
            function () { return (/** @type {?} */ (_this.ngControl.control)).setErrors((/** @type {?} */ (inputElement.ngControl)).errors); }));
        }
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
        if (this.lastDestroyedTagIndex != null) {
            if (this.tags.length) {
                /** @type {?} */
                var newTagIndex = Math.min(this.lastDestroyedTagIndex, this.tags.length - 1);
                this.keyManager.setActiveItem(newTagIndex);
            }
            else {
                this.focusInput();
            }
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
    // todo need rethink this method and selection logic
    /**
     * Emits change event to set the model value.
     * @private
     * @param {?=} fallbackValue
     * @return {?}
     */
    // todo need rethink this method and selection logic
    McTagList.prototype.propagateChanges = /**
     * Emits change event to set the model value.
     * @private
     * @param {?=} fallbackValue
     * @return {?}
     */
    // todo need rethink this method and selection logic
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
    McTagList.prototype.propagateTagsChanges = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var valueToEmit = this.tags.map((/**
         * @param {?} tag
         * @return {?}
         */
        function (tag) { return tag.value; }));
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
            else if (_this.isValidIndex(tagIndex) && !tag.hasFocus) {
                _this.focusInput();
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
                    styles: [".mc-tag-list{display:flex;flex-direction:row}.mc-tag-input{border:none;outline:0;background:0 0}.mc-tags-list__list-container{display:flex;flex-wrap:wrap;flex:1 1 100%;min-width:0;min-height:28px;padding:1px 6px}.mc-tags-list__list-container .mc-tag-input{max-width:100%;flex:1 1 auto;height:22px;margin:2px 4px}.mc-tags-list__cleaner .mc-cleaner{height:30px}"]
                }] }
    ];
    /** @nocollapse */
    McTagList.ctorParameters = function () { return [
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
        cleaner: [{ type: ContentChild, args: ['mcTagListCleaner', { static: true },] }],
        tags: [{ type: ContentChildren, args: [McTag, {
                        // Need to use `descendants: true`,
                        // Ivy will no longer match indirect descendants if it's left as false.
                        descendants: true
                    },] }]
    };
    return McTagList;
}(McTagListMixinBase));
export { McTagList };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RhZ3MvIiwic291cmNlcyI6WyJ0YWctbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFFZixVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsSUFBSSxFQUNKLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUgsZUFBZSxFQUNmLGtCQUFrQixFQUNsQixhQUFhLEVBQ2IsU0FBUyxFQUNULE1BQU0sRUFDTixPQUFPLEVBRVYsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUdILGlCQUFpQixFQUNqQixhQUFhLEVBRWIsZUFBZSxFQUNmLG1CQUFtQixFQUN0QixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RSxPQUFPLEVBQUUsS0FBSyxFQUFjLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDaEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0Is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QyxhQUFhO3lCQUduQixNQUFNOzBCQUVOLFlBQVksU0FBQyxrQkFBa0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7dUJBR2pELGVBQWUsU0FBQyxLQUFLLEVBQUU7Ozt3QkFHcEIsV0FBVyxFQUFFLElBQUk7cUJBQ3BCOztJQWtpQkwsZ0JBQUM7Q0FBQSxBQTl3QkQsQ0FxQitCLGtCQUFrQixHQXl2QmhEO1NBenZCWSxTQUFTOzs7SUFHbEIsZ0NBQTZDOzs7OztJQTZLN0MsOEJBQXNCOzs7Ozs7O0lBT3RCLGdDQUE0RTs7SUFFNUUsd0JBQThDOzs7Ozs7SUFNOUMsaUNBQW1DOztJQUVuQywrQkFBbUM7O0lBRW5DLG1DQUFzQzs7SUFFdEMsK0JBQXFDOzs7OztJQUdyQyxzQ0FBOEM7Ozs7O0lBRzlDLGdDQUE0RTs7Ozs7SUFHNUUsMkJBQStGOztJQUUvRiw0QkFBdUU7Ozs7O0lBR3ZFLHlCQUkwQjs7Ozs7SUFFMUIsMkJBQW9COzs7OztJQUVwQiw4QkFBbUM7Ozs7O0lBRW5DLGlDQUE2Qjs7Ozs7SUFFN0IsOEJBQW1DOzs7OztJQUVuQyxnQ0FBb0M7Ozs7OztJQUdwQyw2QkFBbUM7Ozs7O0lBRW5DLDhCQUFtQzs7Ozs7Ozs7SUFPbkMsMENBQW9EOzs7Ozs7SUFHcEQsOEJBQXdDOzs7Ozs7SUFHeEMseUNBQWtEOzs7Ozs7SUFHbEQsd0NBQWlEOzs7Ozs7SUFHakQsNkNBQXNEOzs7Ozs7SUFHdEQsMENBQW1EOztJQXdHbkQsOEJBQXFCOztJQUdyQiw2QkFBMEM7Ozs7O0lBK0sxQyxpQ0FBdUQ7Ozs7O0lBdlJuRCwrQkFBNkM7Ozs7O0lBQzdDLHNDQUE0Qzs7SUFFNUMsa0NBQW9FOzs7OztJQUNwRSxpQ0FBNEU7Ozs7O0lBQzVFLHdCQUF1Qzs7SUFJdkMsNEJBQTJDOztJQUMzQyxvQ0FBMkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRG9DaGVjayxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFNlbGYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIEZvcm1Db250cm9sTmFtZSxcbiAgICBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgTkdfVkFMSURBVE9SUyxcbiAgICBOZ0NvbnRyb2wsXG4gICAgTmdGb3JtLFxuICAgIE5nTW9kZWwsXG4gICAgVmFsaWRhdG9yXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvY3VzS2V5TWFuYWdlciB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9hMTF5JztcbmltcG9ydCB7IEJBQ0tTUEFDRSwgRU5ELCBIT01FIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gICAgQ2FuVXBkYXRlRXJyb3JTdGF0ZSxcbiAgICBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvcixcbiAgICBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICBNQ19WQUxJREFUSU9OLFxuICAgIE1jVmFsaWRhdGlvbk9wdGlvbnMsXG4gICAgbWl4aW5FcnJvclN0YXRlLFxuICAgIHNldE1vc2FpY1ZhbGlkYXRpb25cbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNDbGVhbmVyLCBNY0Zvcm1GaWVsZENvbnRyb2wgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGgsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWNUYWdUZXh0Q29udHJvbCB9IGZyb20gJy4vdGFnLXRleHQtY29udHJvbCc7XG5pbXBvcnQgeyBNY1RhZywgTWNUYWdFdmVudCwgTWNUYWdTZWxlY3Rpb25DaGFuZ2UgfSBmcm9tICcuL3RhZy5jb21wb25lbnQnO1xuXG5cbmV4cG9ydCBjbGFzcyBNY1RhZ0xpc3RCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgICAgIHB1YmxpYyBwYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgICAgIHB1YmxpYyBwYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICAgICAgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sXG4gICAgKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1RhZ0xpc3RNaXhpbkJhc2U6IENhblVwZGF0ZUVycm9yU3RhdGVDdG9yICYgdHlwZW9mIE1jVGFnTGlzdEJhc2UgPSBtaXhpbkVycm9yU3RhdGUoTWNUYWdMaXN0QmFzZSk7XG5cblxuLy8gSW5jcmVhc2luZyBpbnRlZ2VyIGZvciBnZW5lcmF0aW5nIHVuaXF1ZSBpZHMgZm9yIHRhZy1saXN0IGNvbXBvbmVudHMuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxuLyoqIENoYW5nZSBldmVudCBvYmplY3QgdGhhdCBpcyBlbWl0dGVkIHdoZW4gdGhlIHRhZyBsaXN0IHZhbHVlIGhhcyBjaGFuZ2VkLiAqL1xuZXhwb3J0IGNsYXNzIE1jVGFnTGlzdENoYW5nZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZTogTWNUYWdMaXN0LCBwdWJsaWMgdmFsdWU6IGFueSkge31cbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRhZy1saXN0JyxcbiAgICBleHBvcnRBczogJ21jVGFnTGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICd0YWctbGlzdC5wYXJ0aWFsLmh0bWwnLFxuICAgIHN0eWxlVXJsczogWyd0YWctbGlzdC5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRhZy1saXN0JyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWludmFsaWRdJzogJ2Vycm9yU3RhdGUnLFxuXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAnZGlzYWJsZWQgPyBudWxsIDogdGFiSW5kZXgnLFxuICAgICAgICAnW2lkXSc6ICd1aWQnLFxuXG4gICAgICAgICcoZm9jdXMpJzogJ2ZvY3VzKCknLFxuICAgICAgICAnKGJsdXIpJzogJ2JsdXIoKScsXG4gICAgICAgICcoa2V5ZG93biknOiAna2V5ZG93bigkZXZlbnQpJ1xuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE1jRm9ybUZpZWxkQ29udHJvbCwgdXNlRXhpc3Rpbmc6IE1jVGFnTGlzdCB9XVxufSlcbmV4cG9ydCBjbGFzcyBNY1RhZ0xpc3QgZXh0ZW5kcyBNY1RhZ0xpc3RNaXhpbkJhc2UgaW1wbGVtZW50cyBNY0Zvcm1GaWVsZENvbnRyb2w8YW55PixcbiAgICBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJDb250ZW50SW5pdCwgRG9DaGVjaywgT25Jbml0LCBPbkRlc3Ryb3ksIENhblVwZGF0ZUVycm9yU3RhdGUge1xuXG4gICAgcmVhZG9ubHkgY29udHJvbFR5cGU6IHN0cmluZyA9ICdtYy10YWctbGlzdCc7XG5cbiAgICAvKiogQ29tYmluZWQgc3RyZWFtIG9mIGFsbCBvZiB0aGUgY2hpbGQgdGFncycgc2VsZWN0aW9uIGNoYW5nZSBldmVudHMuICovXG4gICAgZ2V0IHRhZ1NlbGVjdGlvbkNoYW5nZXMoKTogT2JzZXJ2YWJsZTxNY1RhZ1NlbGVjdGlvbkNoYW5nZT4ge1xuICAgICAgICByZXR1cm4gbWVyZ2UoLi4udGhpcy50YWdzLm1hcCgodGFnKSA9PiB0YWcuc2VsZWN0aW9uQ2hhbmdlKSk7XG4gICAgfVxuXG4gICAgLyoqIENvbWJpbmVkIHN0cmVhbSBvZiBhbGwgb2YgdGhlIGNoaWxkIHRhZ3MnIGZvY3VzIGNoYW5nZSBldmVudHMuICovXG4gICAgZ2V0IHRhZ0ZvY3VzQ2hhbmdlcygpOiBPYnNlcnZhYmxlPE1jVGFnRXZlbnQ+IHtcbiAgICAgICAgcmV0dXJuIG1lcmdlKC4uLnRoaXMudGFncy5tYXAoKHRhZykgPT4gdGFnLm9uRm9jdXMpKTtcbiAgICB9XG5cbiAgICAvKiogQ29tYmluZWQgc3RyZWFtIG9mIGFsbCBvZiB0aGUgY2hpbGQgdGFncycgYmx1ciBjaGFuZ2UgZXZlbnRzLiAqL1xuICAgIGdldCB0YWdCbHVyQ2hhbmdlcygpOiBPYnNlcnZhYmxlPE1jVGFnRXZlbnQ+IHtcbiAgICAgICAgcmV0dXJuIG1lcmdlKC4uLnRoaXMudGFncy5tYXAoKHRhZykgPT4gdGFnLm9uQmx1cikpO1xuICAgIH1cblxuICAgIC8qKiBDb21iaW5lZCBzdHJlYW0gb2YgYWxsIG9mIHRoZSBjaGlsZCB0YWdzJyByZW1vdmUgY2hhbmdlIGV2ZW50cy4gKi9cbiAgICBnZXQgdGFnUmVtb3ZlQ2hhbmdlcygpOiBPYnNlcnZhYmxlPE1jVGFnRXZlbnQ+IHtcbiAgICAgICAgcmV0dXJuIG1lcmdlKC4uLnRoaXMudGFncy5tYXAoKHRhZykgPT4gdGFnLmRlc3Ryb3llZCkpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgYXJyYXkgb2Ygc2VsZWN0ZWQgdGFncyBpbnNpZGUgdGFnIGxpc3QuICovXG4gICAgZ2V0IHNlbGVjdGVkKCk6IE1jVGFnW10gfCBNY1RhZyB7XG4gICAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlID8gdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZCA6IHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF07XG4gICAgfVxuXG4gICAgZ2V0IGNhblNob3dDbGVhbmVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jbGVhbmVyICYmIHRoaXMudGFncy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSB1c2VyIHNob3VsZCBiZSBhbGxvd2VkIHRvIHNlbGVjdCBtdWx0aXBsZSB0YWdzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG11bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbXVsdGlwbGU7XG4gICAgfVxuXG4gICAgc2V0IG11bHRpcGxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX211bHRpcGxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIGZ1bmN0aW9uIHRvIGNvbXBhcmUgdGhlIG9wdGlvbiB2YWx1ZXMgd2l0aCB0aGUgc2VsZWN0ZWQgdmFsdWVzLiBUaGUgZmlyc3QgYXJndW1lbnRcbiAgICAgKiBpcyBhIHZhbHVlIGZyb20gYW4gb3B0aW9uLiBUaGUgc2Vjb25kIGlzIGEgdmFsdWUgZnJvbSB0aGUgc2VsZWN0aW9uLiBBIGJvb2xlYW5cbiAgICAgKiBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgY29tcGFyZVdpdGgoKTogKG8xOiBhbnksIG8yOiBhbnkpID0+IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29tcGFyZVdpdGg7XG4gICAgfVxuXG4gICAgc2V0IGNvbXBhcmVXaXRoKGZuOiAobzE6IGFueSwgbzI6IGFueSkgPT4gYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9jb21wYXJlV2l0aCA9IGZuO1xuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGVsKSB7XG4gICAgICAgICAgICAvLyBBIGRpZmZlcmVudCBjb21wYXJhdG9yIG1lYW5zIHRoZSBzZWxlY3Rpb24gY291bGQgY2hhbmdlLlxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMud3JpdGVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldCBpZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy50YWdJbnB1dCA/IHRoaXMudGFnSW5wdXQuaWQgOiB0aGlzLnVpZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXF1aXJlZDtcbiAgICB9XG5cbiAgICBzZXQgcmVxdWlyZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fcmVxdWlyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgcGxhY2Vob2xkZXIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFnSW5wdXQgPyB0aGlzLnRhZ0lucHV0LnBsYWNlaG9sZGVyIDogdGhpcy5fcGxhY2Vob2xkZXI7XG4gICAgfVxuXG4gICAgc2V0IHBsYWNlaG9sZGVyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXIgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIGFueSB0YWdzIG9yIHRoZSBtY1RhZ0lucHV0IGluc2lkZSBvZiB0aGlzIHRhZy1saXN0IGhhcyBmb2N1cy4gKi9cbiAgICBnZXQgZm9jdXNlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnRhZ0lucHV0ICYmIHRoaXMudGFnSW5wdXQuZm9jdXNlZCkgfHwgdGhpcy5oYXNGb2N1c2VkVGFnKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldCBlbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICghdGhpcy50YWdJbnB1dCB8fCB0aGlzLnRhZ0lucHV0LmVtcHR5KSAmJiB0aGlzLnRhZ3MubGVuZ3RoID09PSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBnZXQgc2hvdWxkTGFiZWxGbG9hdCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmVtcHR5IHx8IHRoaXMuZm9jdXNlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm5nQ29udHJvbCA/ICEhdGhpcy5uZ0NvbnRyb2wuZGlzYWJsZWQgOiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgICAgICB0aGlzLnN5bmNUYWdzRGlzYWJsZWRTdGF0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgb3Igbm90IHRoaXMgdGFnIGxpc3QgaXMgc2VsZWN0YWJsZS4gV2hlbiBhIHRhZyBsaXN0IGlzIG5vdCBzZWxlY3RhYmxlLFxuICAgICAqIHRoZSBzZWxlY3RlZCBzdGF0ZXMgZm9yIGFsbCB0aGUgdGFncyBpbnNpZGUgdGhlIHRhZyBsaXN0IGFyZSBhbHdheXMgaWdub3JlZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RhYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0YWJsZTtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0YWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9zZWxlY3RhYmxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy50YWdzKSB7XG4gICAgICAgICAgICB0aGlzLnRhZ3MuZm9yRWFjaCgodGFnKSA9PiB0YWcudGFnTGlzdFNlbGVjdGFibGUgPSB0aGlzLl9zZWxlY3RhYmxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHRhYkluZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl90YWJJbmRleDtcbiAgICB9XG5cbiAgICBzZXQgdGFiSW5kZXgodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLnVzZXJUYWJJbmRleCA9IHZhbHVlO1xuICAgICAgICB0aGlzLl90YWJJbmRleCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RhYkluZGV4ID0gMDtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IHRoYXQgZW1pdHMgd2hlbmV2ZXIgdGhlIHJhdyB2YWx1ZSBvZiB0aGUgdGFnLWxpc3QgY2hhbmdlcy4gVGhpcyBpcyBoZXJlIHByaW1hcmlseVxuICAgICAqIHRvIGZhY2lsaXRhdGUgdGhlIHR3by13YXkgYmluZGluZyBmb3IgdGhlIGB2YWx1ZWAgaW5wdXQuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIHVpZDogc3RyaW5nID0gYG1jLXRhZy1saXN0LSR7bmV4dFVuaXF1ZUlkKyt9YDtcblxuICAgIC8qKlxuICAgICAqIFVzZXIgZGVmaW5lZCB0YWIgaW5kZXguXG4gICAgICogV2hlbiBpdCBpcyBub3QgbnVsbCwgdXNlIHVzZXIgZGVmaW5lZCB0YWIgaW5kZXguIE90aGVyd2lzZSB1c2UgdGFiSW5kZXhcbiAgICAgKi9cbiAgICB1c2VyVGFiSW5kZXg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gICAga2V5TWFuYWdlcjogRm9jdXNLZXlNYW5hZ2VyPE1jVGFnPjtcblxuICAgIHNlbGVjdGlvbk1vZGVsOiBTZWxlY3Rpb25Nb2RlbDxNY1RhZz47XG5cbiAgICB0YWdDaGFuZ2VzID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICAvKiogQW4gb2JqZWN0IHVzZWQgdG8gY29udHJvbCB3aGVuIGVycm9yIG1lc3NhZ2VzIGFyZSBzaG93bi4gKi9cbiAgICBASW5wdXQoKSBlcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXI7XG5cbiAgICAvKiogT3JpZW50YXRpb24gb2YgdGhlIHRhZyBsaXN0LiAqL1xuICAgIEBJbnB1dCgnb3JpZW50YXRpb24nKSBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdGVkIHRhZyBsaXN0IHZhbHVlIGhhcyBiZWVuIGNoYW5nZWQgYnkgdGhlIHVzZXIuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZTogRXZlbnRFbWl0dGVyPE1jVGFnTGlzdENoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1jVGFnTGlzdENoYW5nZT4oKTtcblxuICAgIEBDb250ZW50Q2hpbGQoJ21jVGFnTGlzdENsZWFuZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBjbGVhbmVyOiBNY0NsZWFuZXI7XG5cbiAgICAvKiogVGhlIHRhZyBjb21wb25lbnRzIGNvbnRhaW5lZCB3aXRoaW4gdGhpcyB0YWcgbGlzdC4gKi9cbiAgICBAQ29udGVudENoaWxkcmVuKE1jVGFnLCB7XG4gICAgICAgIC8vIE5lZWQgdG8gdXNlIGBkZXNjZW5kYW50czogdHJ1ZWAsXG4gICAgICAgIC8vIEl2eSB3aWxsIG5vIGxvbmdlciBtYXRjaCBpbmRpcmVjdCBkZXNjZW5kYW50cyBpZiBpdCdzIGxlZnQgYXMgZmFsc2UuXG4gICAgICAgIGRlc2NlbmRhbnRzOiB0cnVlXG4gICAgfSkgdGFnczogUXVlcnlMaXN0PE1jVGFnPjtcblxuICAgIHByaXZhdGUgX3ZhbHVlOiBhbnk7XG5cbiAgICBwcml2YXRlIF9yZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBfcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF9zZWxlY3RhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBUaGUgdGFnIGlucHV0IHRvIGFkZCBtb3JlIHRhZ3MgKi9cbiAgICBwcml2YXRlIHRhZ0lucHV0OiBNY1RhZ1RleHRDb250cm9sO1xuXG4gICAgcHJpdmF0ZSBfbXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFdoZW4gYSB0YWcgaXMgZGVzdHJveWVkLCB3ZSBzdG9yZSB0aGUgaW5kZXggb2YgdGhlIGRlc3Ryb3llZCB0YWcgdW50aWwgdGhlIHRhZ3NcbiAgICAgKiBxdWVyeSBsaXN0IG5vdGlmaWVzIGFib3V0IHRoZSB1cGRhdGUuIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugd2UgY2Fubm90IGRldGVybWluZSBhblxuICAgICAqIGFwcHJvcHJpYXRlIHRhZyB0aGF0IHNob3VsZCByZWNlaXZlIGZvY3VzIHVudGlsIHRoZSBhcnJheSBvZiB0YWdzIHVwZGF0ZWQgY29tcGxldGVseS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGxhc3REZXN0cm95ZWRUYWdJbmRleDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICAvKiogU3ViamVjdCB0aGF0IGVtaXRzIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBkZXN0cm95ZWQuICovXG4gICAgcHJpdmF0ZSBkZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byBmb2N1cyBjaGFuZ2VzIGluIHRoZSB0YWdzLiAqL1xuICAgIHByaXZhdGUgdGFnRm9jdXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGw7XG5cbiAgICAvKiogU3Vic2NyaXB0aW9uIHRvIGJsdXIgY2hhbmdlcyBpbiB0aGUgdGFncy4gKi9cbiAgICBwcml2YXRlIHRhZ0JsdXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGw7XG5cbiAgICAvKiogU3Vic2NyaXB0aW9uIHRvIHNlbGVjdGlvbiBjaGFuZ2VzIGluIHRhZ3MuICovXG4gICAgcHJpdmF0ZSB0YWdTZWxlY3Rpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGw7XG5cbiAgICAvKiogU3Vic2NyaXB0aW9uIHRvIHJlbW92ZSBjaGFuZ2VzIGluIHRhZ3MuICovXG4gICAgcHJpdmF0ZSB0YWdSZW1vdmVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChOR19WQUxJREFUT1JTKSBwdWJsaWMgcmF3VmFsaWRhdG9yczogVmFsaWRhdG9yW10sXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfVkFMSURBVElPTikgcHJpdmF0ZSBtY1ZhbGlkYXRpb246IE1jVmFsaWRhdGlvbk9wdGlvbnMsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcGFyZW50Rm9ybTogTmdGb3JtLFxuICAgICAgICBAT3B0aW9uYWwoKSBwYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBuZ0NvbnRyb2w6IE5nQ29udHJvbCxcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgbmdNb2RlbDogTmdNb2RlbCxcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgZm9ybUNvbnRyb2xOYW1lOiBGb3JtQ29udHJvbE5hbWVcbiAgICApIHtcbiAgICAgICAgc3VwZXIoZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyLCBwYXJlbnRGb3JtLCBwYXJlbnRGb3JtR3JvdXAsIG5nQ29udHJvbCk7XG5cbiAgICAgICAgaWYgKHRoaXMubmdDb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLm5nQ29udHJvbC52YWx1ZUFjY2Vzc29yID0gdGhpcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMubWNWYWxpZGF0aW9uLnVzZVZhbGlkYXRpb24pIHtcbiAgICAgICAgICAgIHNldE1vc2FpY1ZhbGlkYXRpb24odGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmtleU1hbmFnZXIgPSBuZXcgRm9jdXNLZXlNYW5hZ2VyPE1jVGFnPih0aGlzLnRhZ3MpXG4gICAgICAgICAgICAud2l0aFZlcnRpY2FsT3JpZW50YXRpb24oKVxuICAgICAgICAgICAgLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24odGhpcy5kaXIgPyB0aGlzLmRpci52YWx1ZSA6ICdsdHInKTtcblxuICAgICAgICBpZiAodGhpcy5kaXIpIHtcbiAgICAgICAgICAgIHRoaXMuZGlyLmNoYW5nZVxuICAgICAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoZGlyKSA9PiB0aGlzLmtleU1hbmFnZXIud2l0aEhvcml6b250YWxPcmllbnRhdGlvbihkaXIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFByZXZlbnRzIHRoZSB0YWcgbGlzdCBmcm9tIGNhcHR1cmluZyBmb2N1cyBhbmQgcmVkaXJlY3RpbmdcbiAgICAgICAgLy8gaXQgYmFjayB0byB0aGUgZmlyc3QgdGFnIHdoZW4gdGhlIHVzZXIgdGFicyBvdXQuXG4gICAgICAgIHRoaXMua2V5TWFuYWdlci50YWJPdXRcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl90YWJJbmRleCA9IC0xO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RhYkluZGV4ID0gdGhpcy51c2VyVGFiSW5kZXggfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFdoZW4gdGhlIGxpc3QgY2hhbmdlcywgcmUtc3Vic2NyaWJlXG4gICAgICAgIHRoaXMudGFncy5jaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShzdGFydFdpdGgobnVsbCksIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTaW5jZSB0aGlzIGhhcHBlbnMgYWZ0ZXIgdGhlIGNvbnRlbnQgaGFzIGJlZW5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2tlZCwgd2UgbmVlZCB0byBkZWZlciBpdCB0byB0aGUgbmV4dCB0aWNrLlxuICAgICAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHsgdGhpcy5zeW5jVGFnc0Rpc2FibGVkU3RhdGUoKTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldFRhZ3MoKTtcblxuICAgICAgICAgICAgICAgIC8vIFJlc2V0IHRhZ3Mgc2VsZWN0ZWQvZGVzZWxlY3RlZCBzdGF0dXNcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVTZWxlY3Rpb24oKTtcblxuICAgICAgICAgICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB3ZSBuZWVkIHRvIHVwZGF0ZSBvdXIgdGFiIGluZGV4XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUYWJJbmRleCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgYSBkZXN0cm95ZWQgdGFnIGFuZCBuZWVkIHRvIHJlZm9jdXNcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUZvY3VzRm9yRGVzdHJveWVkVGFncygpO1xuXG4gICAgICAgICAgICAgICAgLy8gRGVmZXIgc2V0dGluZyB0aGUgdmFsdWUgaW4gb3JkZXIgdG8gYXZvaWQgdGhlIFwiRXhwcmVzc2lvblxuICAgICAgICAgICAgICAgIC8vIGhhcyBjaGFuZ2VkIGFmdGVyIGl0IHdhcyBjaGVja2VkXCIgZXJyb3JzIGZyb20gQW5ndWxhci5cbiAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWdDaGFuZ2VzLmVtaXQodGhpcy50YWdzLnRvQXJyYXkoKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVUYWdzQ2hhbmdlcygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwgPSBuZXcgU2VsZWN0aW9uTW9kZWw8TWNUYWc+KHRoaXMubXVsdGlwbGUsIHVuZGVmaW5lZCwgZmFsc2UpO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgbmdEb0NoZWNrKCkge1xuICAgICAgICBpZiAodGhpcy5uZ0NvbnRyb2wpIHtcbiAgICAgICAgICAgIC8vIFdlIG5lZWQgdG8gcmUtZXZhbHVhdGUgdGhpcyBvbiBldmVyeSBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlLCBiZWNhdXNlIHRoZXJlIGFyZSBzb21lXG4gICAgICAgICAgICAvLyBlcnJvciB0cmlnZ2VycyB0aGF0IHdlIGNhbid0IHN1YnNjcmliZSB0byAoZS5nLiBwYXJlbnQgZm9ybSBzdWJtaXNzaW9ucykuIFRoaXMgbWVhbnNcbiAgICAgICAgICAgIC8vIHRoYXQgd2hhdGV2ZXIgbG9naWMgaXMgaW4gaGVyZSBoYXMgdG8gYmUgc3VwZXIgbGVhbiBvciB3ZSByaXNrIGRlc3Ryb3lpbmcgdGhlIHBlcmZvcm1hbmNlLlxuICAgICAgICAgICAgdGhpcy51cGRhdGVFcnJvclN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQubmV4dCgpO1xuICAgICAgICB0aGlzLmRlc3Ryb3llZC5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuXG4gICAgICAgIHRoaXMuZHJvcFN1YnNjcmlwdGlvbnMoKTtcbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcbiAgICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eVxuICAgIG9uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gICAgLyoqIEFzc29jaWF0ZXMgYW4gSFRNTCBpbnB1dCBlbGVtZW50IHdpdGggdGhpcyB0YWcgbGlzdC4gKi9cbiAgICByZWdpc3RlcklucHV0KGlucHV0RWxlbWVudDogTWNUYWdUZXh0Q29udHJvbCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhZ0lucHV0ID0gaW5wdXRFbGVtZW50O1xuXG4gICAgICAgIC8vIHRvZG8gbmVlZCByZXRoaW5rIGFib3V0IGl0XG4gICAgICAgIGlmICh0aGlzLm5nQ29udHJvbCAmJiBpbnB1dEVsZW1lbnQubmdDb250cm9sKSB7XG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQubmdDb250cm9sLnN0YXR1c0NoYW5nZXMhXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLm5nQ29udHJvbC5jb250cm9sIS5zZXRFcnJvcnMoaW5wdXRFbGVtZW50Lm5nQ29udHJvbCEuZXJyb3JzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50YWdzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvbkJ5VmFsdWUodmFsdWUsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBvbkNvbnRhaW5lckNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5vcmlnaW5hdGVzRnJvbVRhZyhldmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvY3VzZXMgdGhlIGZpcnN0IG5vbi1kaXNhYmxlZCB0YWcgaW4gdGhpcyB0YWcgbGlzdCwgb3IgdGhlIGFzc29jaWF0ZWQgaW5wdXQgd2hlbiB0aGVyZVxuICAgICAqIGFyZSBubyBlbGlnaWJsZSB0YWdzLlxuICAgICAqL1xuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICAvLyBUT0RPOiBBUklBIHNheXMgdGhpcyBzaG91bGQgZm9jdXMgdGhlIGZpcnN0IGBzZWxlY3RlZGAgdGFnIGlmIGFueSBhcmUgc2VsZWN0ZWQuXG4gICAgICAgIC8vIEZvY3VzIG9uIGZpcnN0IGVsZW1lbnQgaWYgdGhlcmUncyBubyB0YWdJbnB1dCBpbnNpZGUgdGFnLWxpc3RcbiAgICAgICAgaWYgKHRoaXMudGFnSW5wdXQgJiYgdGhpcy50YWdJbnB1dC5mb2N1c2VkKSB7XG4gICAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50YWdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNJbnB1dCgpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEF0dGVtcHQgdG8gZm9jdXMgYW4gaW5wdXQgaWYgd2UgaGF2ZSBvbmUuICovXG4gICAgZm9jdXNJbnB1dCgpIHtcbiAgICAgICAgaWYgKHRoaXMudGFnSW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMudGFnSW5wdXQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhc3MgZXZlbnRzIHRvIHRoZSBrZXlib2FyZCBtYW5hZ2VyLiBBdmFpbGFibGUgaGVyZSBmb3IgdGVzdHMuXG4gICAgICovXG4gICAga2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgLy8gSWYgdGhleSBhcmUgb24gYW4gZW1wdHkgaW5wdXQgYW5kIGhpdCBiYWNrc3BhY2UsIGZvY3VzIHRoZSBsYXN0IHRhZ1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBCQUNLU1BBQ0UgJiYgdGhpcy5pc0lucHV0RW1wdHkodGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldExhc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCAmJiB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtYy10YWcnKSkge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEhPTUUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gRU5EKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldExhc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFNlbGVjdGlvbkJ5VmFsdWUodmFsdWU6IGFueSwgaXNVc2VySW5wdXQ6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy50YWdzLmZvckVhY2goKHRhZykgPT4gdGFnLmRlc2VsZWN0KCkpO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUuZm9yRWFjaCgoY3VycmVudFZhbHVlKSA9PiB0aGlzLnNlbGVjdFZhbHVlKGN1cnJlbnRWYWx1ZSwgaXNVc2VySW5wdXQpKTtcbiAgICAgICAgICAgIHRoaXMuc29ydFZhbHVlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgY29ycmVzcG9uZGluZ1RhZyA9IHRoaXMuc2VsZWN0VmFsdWUodmFsdWUsIGlzVXNlcklucHV0KTtcblxuICAgICAgICAgICAgLy8gU2hpZnQgZm9jdXMgdG8gdGhlIGFjdGl2ZSBpdGVtLiBOb3RlIHRoYXQgd2Ugc2hvdWxkbid0IGRvIHRoaXMgaW4gbXVsdGlwbGVcbiAgICAgICAgICAgIC8vIG1vZGUsIGJlY2F1c2Ugd2UgZG9uJ3Qga25vdyB3aGF0IHRhZyB0aGUgdXNlciBpbnRlcmFjdGVkIHdpdGggbGFzdC5cbiAgICAgICAgICAgIGlmIChjb3JyZXNwb25kaW5nVGFnICYmIGlzVXNlcklucHV0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oY29ycmVzcG9uZGluZ1RhZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogV2hlbiBibHVycmVkLCBtYXJrIHRoZSBmaWVsZCBhcyB0b3VjaGVkIHdoZW4gZm9jdXMgbW92ZWQgb3V0c2lkZSB0aGUgdGFnIGxpc3QuICovXG4gICAgYmx1cigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0ZvY3VzZWRUYWcoKSkge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oLTEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50YWdJbnB1dCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlJ3MgYSB0YWcgaW5wdXQsIHdlIHNob3VsZCBjaGVjayB3aGV0aGVyIHRoZSBmb2N1cyBtb3ZlZCB0byB0YWcgaW5wdXQuXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGZvY3VzIGlzIG5vdCBtb3ZlZCB0byB0YWcgaW5wdXQsIG1hcmsgdGhlIGZpZWxkIGFzIHRvdWNoZWQuIElmIHRoZSBmb2N1cyBtb3ZlZFxuICAgICAgICAgICAgICAgIC8vIHRvIHRhZyBpbnB1dCwgZG8gbm90aGluZy5cbiAgICAgICAgICAgICAgICAvLyBUaW1lb3V0IGlzIG5lZWRlZCB0byB3YWl0IGZvciB0aGUgZm9jdXMoKSBldmVudCB0cmlnZ2VyIG9uIHRhZyBpbnB1dC5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFya0FzVG91Y2hlZCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlJ3Mgbm8gdGFnIGlucHV0LCB0aGVuIG1hcmsgdGhlIGZpZWxkIGFzIHRvdWNoZWQuXG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrQXNUb3VjaGVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogTWFyayB0aGUgZmllbGQgYXMgdG91Y2hlZCAqL1xuICAgIG1hcmtBc1RvdWNoZWQoKSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayB0aGUgdGFiIGluZGV4IGFzIHlvdSBzaG91bGQgbm90IGJlIGFsbG93ZWQgdG8gZm9jdXMgYW4gZW1wdHkgbGlzdC5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgdXBkYXRlVGFiSW5kZXgoKTogdm9pZCB7XG4gICAgICAgIC8vIElmIHdlIGhhdmUgMCB0YWdzLCB3ZSBzaG91bGQgbm90IGFsbG93IGtleWJvYXJkIGZvY3VzXG4gICAgICAgIHRoaXMuX3RhYkluZGV4ID0gdGhpcy51c2VyVGFiSW5kZXggfHwgKHRoaXMudGFncy5sZW5ndGggPT09IDAgPyAtMSA6IDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElmIHRoZSBhbW91bnQgb2YgdGFncyBjaGFuZ2VkLCB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGVcbiAgICAgKiBrZXkgbWFuYWdlciBzdGF0ZSBhbmQgZm9jdXMgdGhlIG5leHQgY2xvc2VzdCB0YWcuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHVwZGF0ZUZvY3VzRm9yRGVzdHJveWVkVGFncygpIHtcbiAgICAgICAgaWYgKHRoaXMubGFzdERlc3Ryb3llZFRhZ0luZGV4ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRhZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VGFnSW5kZXggPSBNYXRoLm1pbih0aGlzLmxhc3REZXN0cm95ZWRUYWdJbmRleCwgdGhpcy50YWdzLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKG5ld1RhZ0luZGV4KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c0lucHV0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxhc3REZXN0cm95ZWRUYWdJbmRleCA9IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY29tcGFyZVdpdGggPSAobzE6IGFueSwgbzI6IGFueSkgPT4gbzEgPT09IG8yO1xuXG4gICAgLyoqXG4gICAgICogVXRpbGl0eSB0byBlbnN1cmUgYWxsIGluZGV4ZXMgYXJlIHZhbGlkLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCB0byBiZSBjaGVja2VkLlxuICAgICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGluZGV4IGlzIHZhbGlkIGZvciBvdXIgbGlzdCBvZiB0YWdzLlxuICAgICAqL1xuICAgIHByaXZhdGUgaXNWYWxpZEluZGV4KGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLnRhZ3MubGVuZ3RoO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNJbnB1dEVtcHR5KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2lucHV0Jykge1xuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBlbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICAgICAgICAgIHJldHVybiAhaW5wdXQudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZHMgYW5kIHNlbGVjdHMgdGhlIHRhZyBiYXNlZCBvbiBpdHMgdmFsdWUuXG4gICAgICogQHJldHVybnMgVGFnIHRoYXQgaGFzIHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlLlxuICAgICAqL1xuICAgIHByaXZhdGUgc2VsZWN0VmFsdWUodmFsdWU6IGFueSwgaXNVc2VySW5wdXQ6IGJvb2xlYW4gPSB0cnVlKTogTWNUYWcgfCB1bmRlZmluZWQge1xuXG4gICAgICAgIGNvbnN0IGNvcnJlc3BvbmRpbmdUYWcgPSB0aGlzLnRhZ3MuZmluZCgodGFnKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGFnLnZhbHVlICE9IG51bGwgJiYgdGhpcy5fY29tcGFyZVdpdGgodGFnLnZhbHVlLCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChjb3JyZXNwb25kaW5nVGFnKSB7XG4gICAgICAgICAgICBpZiAoaXNVc2VySW5wdXQpIHtcbiAgICAgICAgICAgICAgICBjb3JyZXNwb25kaW5nVGFnLnNlbGVjdFZpYUludGVyYWN0aW9uKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvcnJlc3BvbmRpbmdUYWcuc2VsZWN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0KGNvcnJlc3BvbmRpbmdUYWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvcnJlc3BvbmRpbmdUYWc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgICAgICAvLyBEZWZlciBzZXR0aW5nIHRoZSB2YWx1ZSBpbiBvcmRlciB0byBhdm9pZCB0aGUgXCJFeHByZXNzaW9uXG4gICAgICAgIC8vIGhhcyBjaGFuZ2VkIGFmdGVyIGl0IHdhcyBjaGVja2VkXCIgZXJyb3JzIGZyb20gQW5ndWxhci5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5uZ0NvbnRyb2wgfHwgdGhpcy5fdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvbkJ5VmFsdWUodGhpcy5uZ0NvbnRyb2wgPyB0aGlzLm5nQ29udHJvbC52YWx1ZSA6IHRoaXMuX3ZhbHVlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXNlbGVjdHMgZXZlcnkgdGFnIGluIHRoZSBsaXN0LlxuICAgICAqIEBwYXJhbSBza2lwIFRhZyB0aGF0IHNob3VsZCBub3QgYmUgZGVzZWxlY3RlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNsZWFyU2VsZWN0aW9uKHNraXA/OiBNY1RhZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgICAgIHRoaXMudGFncy5mb3JFYWNoKCh0YWcpID0+IHtcbiAgICAgICAgICAgIGlmICh0YWcgIT09IHNraXApIHtcbiAgICAgICAgICAgICAgICB0YWcuZGVzZWxlY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTb3J0cyB0aGUgbW9kZWwgdmFsdWVzLCBlbnN1cmluZyB0aGF0IHRoZXkga2VlcCB0aGUgc2FtZVxuICAgICAqIG9yZGVyIHRoYXQgdGhleSBoYXZlIGluIHRoZSBwYW5lbC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNvcnRWYWx1ZXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9tdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuXG4gICAgICAgICAgICB0aGlzLnRhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRhZy5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdCh0YWcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEVtaXRzIGNoYW5nZSBldmVudCB0byBzZXQgdGhlIG1vZGVsIHZhbHVlLiAqL1xuICAgIC8vIHRvZG8gbmVlZCByZXRoaW5rIHRoaXMgbWV0aG9kIGFuZCBzZWxlY3Rpb24gbG9naWNcbiAgICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZXMoZmFsbGJhY2tWYWx1ZT86IGFueSk6IHZvaWQge1xuICAgICAgICBsZXQgdmFsdWVUb0VtaXQ6IGFueSA9IG51bGw7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5zZWxlY3RlZCkpIHtcbiAgICAgICAgICAgIHZhbHVlVG9FbWl0ID0gdGhpcy5zZWxlY3RlZC5tYXAoKHRhZykgPT4gdGFnLnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlVG9FbWl0ID0gdGhpcy5zZWxlY3RlZCA/IHRoaXMuc2VsZWN0ZWQudmFsdWUgOiBmYWxsYmFja1ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWVUb0VtaXQ7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQobmV3IE1jVGFnTGlzdENoYW5nZSh0aGlzLCB2YWx1ZVRvRW1pdCkpO1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWVUb0VtaXQpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlVG9FbWl0KTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb3BhZ2F0ZVRhZ3NDaGFuZ2VzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB2YWx1ZVRvRW1pdDogYW55ID0gdGhpcy50YWdzLm1hcCgodGFnKSA9PiB0YWcudmFsdWUpO1xuXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWVUb0VtaXQ7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQobmV3IE1jVGFnTGlzdENoYW5nZSh0aGlzLCB2YWx1ZVRvRW1pdCkpO1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWVUb0VtaXQpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlVG9FbWl0KTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2V0VGFncygpIHtcbiAgICAgICAgdGhpcy5kcm9wU3Vic2NyaXB0aW9ucygpO1xuICAgICAgICB0aGlzLmxpc3RlblRvVGFnc0ZvY3VzKCk7XG4gICAgICAgIHRoaXMubGlzdGVuVG9UYWdzU2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMubGlzdGVuVG9UYWdzUmVtb3ZlZCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJvcFN1YnNjcmlwdGlvbnMoKSB7XG4gICAgICAgIGlmICh0aGlzLnRhZ0ZvY3VzU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRhZ0ZvY3VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLnRhZ0ZvY3VzU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRhZ0JsdXJTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudGFnQmx1clN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy50YWdCbHVyU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRhZ1NlbGVjdGlvblN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy50YWdTZWxlY3Rpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMudGFnU2VsZWN0aW9uU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRhZ1JlbW92ZVN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy50YWdSZW1vdmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMudGFnUmVtb3ZlU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBMaXN0ZW5zIHRvIHVzZXItZ2VuZXJhdGVkIHNlbGVjdGlvbiBldmVudHMgb24gZWFjaCB0YWcuICovXG4gICAgcHJpdmF0ZSBsaXN0ZW5Ub1RhZ3NTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFnU2VsZWN0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy50YWdTZWxlY3Rpb25DaGFuZ2VzLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2Uuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdChldmVudC5zb3VyY2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmRlc2VsZWN0KGV2ZW50LnNvdXJjZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEZvciBzaW5nbGUgc2VsZWN0aW9uIHRhZyBsaXN0LCBtYWtlIHN1cmUgdGhlIGRlc2VsZWN0ZWQgdmFsdWUgaXMgdW5zZWxlY3RlZC5cbiAgICAgICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFncy5mb3JFYWNoKCh0YWcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGlvbk1vZGVsLmlzU2VsZWN0ZWQodGFnKSAmJiB0YWcuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZy5kZXNlbGVjdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChldmVudC5pc1VzZXJJbnB1dCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogTGlzdGVucyB0byB1c2VyLWdlbmVyYXRlZCBzZWxlY3Rpb24gZXZlbnRzIG9uIGVhY2ggdGFnLiAqL1xuICAgIHByaXZhdGUgbGlzdGVuVG9UYWdzRm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFnRm9jdXNTdWJzY3JpcHRpb24gPSB0aGlzLnRhZ0ZvY3VzQ2hhbmdlcy5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YWdJbmRleDogbnVtYmVyID0gdGhpcy50YWdzLnRvQXJyYXkoKS5pbmRleE9mKGV2ZW50LnRhZyk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRJbmRleCh0YWdJbmRleCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIudXBkYXRlQWN0aXZlSXRlbSh0YWdJbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50YWdCbHVyU3Vic2NyaXB0aW9uID0gdGhpcy50YWdCbHVyQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ibHVyKCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgbGlzdGVuVG9UYWdzUmVtb3ZlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YWdSZW1vdmVTdWJzY3JpcHRpb24gPSB0aGlzLnRhZ1JlbW92ZUNoYW5nZXMuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFnID0gZXZlbnQudGFnO1xuICAgICAgICAgICAgY29uc3QgdGFnSW5kZXggPSB0aGlzLnRhZ3MudG9BcnJheSgpLmluZGV4T2YoZXZlbnQudGFnKTtcblxuICAgICAgICAgICAgLy8gSW4gY2FzZSB0aGUgdGFnIHRoYXQgd2lsbCBiZSByZW1vdmVkIGlzIGN1cnJlbnRseSBmb2N1c2VkLCB3ZSB0ZW1wb3JhcmlseSBzdG9yZVxuICAgICAgICAgICAgLy8gdGhlIGluZGV4IGluIG9yZGVyIHRvIGJlIGFibGUgdG8gZGV0ZXJtaW5lIGFuIGFwcHJvcHJpYXRlIHNpYmxpbmcgdGFnIHRoYXQgd2lsbFxuICAgICAgICAgICAgLy8gcmVjZWl2ZSBmb2N1cy5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRJbmRleCh0YWdJbmRleCkgJiYgdGFnLmhhc0ZvY3VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0RGVzdHJveWVkVGFnSW5kZXggPSB0YWdJbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1ZhbGlkSW5kZXgodGFnSW5kZXgpICYmICF0YWcuaGFzRm9jdXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzSW5wdXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIGFuIGV2ZW50IGNvbWVzIGZyb20gaW5zaWRlIGEgdGFnIGVsZW1lbnQuICovXG4gICAgcHJpdmF0ZSBvcmlnaW5hdGVzRnJvbVRhZyhldmVudDogRXZlbnQpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGN1cnJlbnRFbGVtZW50ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcblxuICAgICAgICB3aGlsZSAoY3VycmVudEVsZW1lbnQgJiYgY3VycmVudEVsZW1lbnQgIT09IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtYy10YWcnKSkgeyByZXR1cm4gdHJ1ZTsgfVxuXG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIGFueSBvZiB0aGUgdGFncyBpcyBmb2N1c2VkLiAqL1xuICAgIHByaXZhdGUgaGFzRm9jdXNlZFRhZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFncy5zb21lKCh0YWcpID0+IHRhZy5oYXNGb2N1cyk7XG4gICAgfVxuXG4gICAgLyoqIFN5bmNzIHRoZSBsaXN0J3MgZGlzYWJsZWQgc3RhdGUgd2l0aCB0aGUgaW5kaXZpZHVhbCB0YWdzLiAqL1xuICAgIHByaXZhdGUgc3luY1RhZ3NEaXNhYmxlZFN0YXRlKCkge1xuICAgICAgICBpZiAodGhpcy50YWdzKSB7XG4gICAgICAgICAgICB0aGlzLnRhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFnLmRpc2FibGVkID0gdGhpcy5fZGlzYWJsZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuIl19