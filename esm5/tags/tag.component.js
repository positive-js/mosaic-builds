/**
 * @fileoverview added by tsickle
 * Generated from: tag.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends, __values } from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Input, NgZone, Output, QueryList, ViewEncapsulation } from '@angular/core';
import { BACKSPACE, DELETE, SPACE } from '@ptsecurity/cdk/keycodes';
import { mixinColor, mixinDisabled } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
/**
 * @record
 */
export function McTagEvent() { }
if (false) {
    /** @type {?} */
    McTagEvent.prototype.tag;
}
/**
 * Event object emitted by McTag when selected or deselected.
 */
var /**
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
/**
 * Event object emitted by McTag when selected or deselected.
 */
export { McTagSelectionChange };
if (false) {
    /** @type {?} */
    McTagSelectionChange.prototype.source;
    /** @type {?} */
    McTagSelectionChange.prototype.selected;
    /** @type {?} */
    McTagSelectionChange.prototype.isUserInput;
}
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
                },] }
    ];
    return McTagAvatar;
}());
export { McTagAvatar };
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
                },] }
    ];
    return McTagTrailingIcon;
}());
export { McTagTrailingIcon };
var McTagBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McTagBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McTagBase;
}());
export { McTagBase };
if (false) {
    /** @type {?} */
    McTagBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export var McTagMixinBase = mixinColor(mixinDisabled(McTagBase));
var McTag = /** @class */ (function (_super) {
    __extends(McTag, _super);
    function McTag(elementRef, changeDetectorRef, _ngZone) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        _this.changeDetectorRef = changeDetectorRef;
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
    Object.defineProperty(McTag.prototype, "tabindex", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this.selectable) {
                return null;
            }
            return this.disabled ? null : -1;
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
        var e_1, _a;
        try {
            // Add class for the different tags
            for (var TAG_ATTRIBUTE_NAMES_1 = __values(TAG_ATTRIBUTE_NAMES), TAG_ATTRIBUTE_NAMES_1_1 = TAG_ATTRIBUTE_NAMES_1.next(); !TAG_ATTRIBUTE_NAMES_1_1.done; TAG_ATTRIBUTE_NAMES_1_1 = TAG_ATTRIBUTE_NAMES_1.next()) {
                var attr = TAG_ATTRIBUTE_NAMES_1_1.value;
                if (this.elementRef.nativeElement.hasAttribute(attr) ||
                    this.elementRef.nativeElement.tagName.toLowerCase() === attr) {
                    ((/** @type {?} */ (this.elementRef.nativeElement))).classList.add(attr);
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (TAG_ATTRIBUTE_NAMES_1_1 && !TAG_ATTRIBUTE_NAMES_1_1.done && (_a = TAG_ATTRIBUTE_NAMES_1.return)) _a.call(TAG_ATTRIBUTE_NAMES_1);
            }
            finally { if (e_1) throw e_1.error; }
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
        var _this = this;
        if (!this.selectable) {
            return;
        }
        if (!this.hasFocus) {
            this.elementRef.nativeElement.focus();
            this.onFocus.next({ tag: this });
            Promise.resolve().then((/**
             * @return {?}
             */
            function () {
                _this.hasFocus = true;
                _this.changeDetectorRef.markForCheck();
            }));
        }
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
                    template: "<div class=\"mc-tag__wrapper\">\n    <span class=\"mc-tag__text\"><ng-content></ng-content></span>\n    <ng-content select=\"[mc-icon]\"></ng-content>\n    <div class=\"mc-tag-overlay\"></div>\n</div>\n",
                    inputs: ['color'],
                    host: {
                        class: 'mc-tag',
                        '[attr.tabindex]': 'tabindex',
                        '[attr.disabled]': 'disabled || null',
                        '[class.mc-selected]': 'selected',
                        '[class.mc-focused]': 'hasFocus',
                        '[class.mc-tag-with-avatar]': 'avatar',
                        '[class.mc-tag-with-trailing-icon]': 'trailingIcon || removeIcon',
                        '[class.mc-disabled]': 'disabled',
                        '(click)': 'handleClick($event)',
                        '(keydown)': 'handleKeydown($event)',
                        '(focus)': 'focus()',
                        '(blur)': 'blur()'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: [".mc-tag{position:relative;display:inline-block;overflow:hidden;margin:2px;height:24px;border-width:1px;border-style:solid;border-radius:4px;cursor:default;outline:0;box-sizing:border-box}.mc-tag.mc-left-icon{padding-left:3px}.mc-tag.mc-right-icon{padding-right:3px}.mc-tag__wrapper{display:flex;align-items:center;height:100%;flex:1 1 100%}.mc-tag__wrapper .mc-icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:24px;height:24px}.mc-tag__wrapper .mc-icon_left{margin-right:3px}.mc-tag__wrapper .mc-icon_right{margin-left:3px}.mc-tag-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}.mc-tag__text{margin-left:7px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}"]
                }] }
    ];
    /** @nocollapse */
    McTag.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
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
        removable: [{ type: Input }],
        disabled: [{ type: Input }]
    };
    return McTag;
}(McTagMixinBase));
export { McTag };
if (false) {
    /**
     * Emits when the tag is focused.
     * @type {?}
     */
    McTag.prototype.onFocus;
    /**
     * Emits when the tag is blured.
     * @type {?}
     */
    McTag.prototype.onBlur;
    /** @type {?} */
    McTag.prototype.nativeElement;
    /**
     * Whether the tag has focus.
     * @type {?}
     */
    McTag.prototype.hasFocus;
    /**
     * Whether the tag list is selectable
     * @type {?}
     */
    McTag.prototype.tagListSelectable;
    /** @type {?} */
    McTag.prototype.contentChildren;
    /**
     * The tag avatar
     * @type {?}
     */
    McTag.prototype.avatar;
    /**
     * The tag's trailing icon.
     * @type {?}
     */
    McTag.prototype.trailingIcon;
    /**
     * The tag's remove toggler.
     * @type {?}
     */
    McTag.prototype.removeIcon;
    /**
     * Emitted when the tag is selected or deselected.
     * @type {?}
     */
    McTag.prototype.selectionChange;
    /**
     * Emitted when the tag is destroyed.
     * @type {?}
     */
    McTag.prototype.destroyed;
    /**
     * Emitted when a tag is to be removed.
     * @type {?}
     */
    McTag.prototype.removed;
    /**
     * @type {?}
     * @private
     */
    McTag.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    McTag.prototype._value;
    /**
     * @type {?}
     * @private
     */
    McTag.prototype._selectable;
    /**
     * @type {?}
     * @private
     */
    McTag.prototype._removable;
    /**
     * @type {?}
     * @private
     */
    McTag.prototype._disabled;
    /** @type {?} */
    McTag.prototype.elementRef;
    /** @type {?} */
    McTag.prototype.changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    McTag.prototype._ngZone;
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
var McTagRemove = /** @class */ (function () {
    function McTagRemove(parentTag) {
        this.parentTag = parentTag;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    McTagRemove.prototype.focus = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        $event.stopPropagation();
    };
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
                        '[attr.tabindex]': '-1',
                        '(click)': 'handleClick($event)',
                        '(focus)': 'focus($event)'
                    }
                },] }
    ];
    /** @nocollapse */
    McTagRemove.ctorParameters = function () { return [
        { type: McTag }
    ]; };
    return McTagRemove;
}());
export { McTagRemove };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    McTagRemove.prototype.parentTag;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy90YWdzLyIsInNvdXJjZXMiOlsidGFnLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFFTixNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRSxPQUFPLEVBS0gsVUFBVSxFQUNWLGFBQWEsRUFDaEIsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFJdEMsZ0NBRUM7OztJQURHLHlCQUFXOzs7OztBQUlmOzs7O0lBQ0ksOEJBQW1CLE1BQWEsRUFBUyxRQUFpQixFQUFTLFdBQW1CO1FBQW5CLDRCQUFBLEVBQUEsbUJBQW1CO1FBQW5FLFdBQU0sR0FBTixNQUFNLENBQU87UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQVE7SUFBRyxDQUFDO0lBQzlGLDJCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7Ozs7Ozs7SUFEZSxzQ0FBb0I7O0lBQUUsd0NBQXdCOztJQUFFLDJDQUEwQjs7O0lBSXBGLG1CQUFtQixHQUFHLENB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SUFDUixnQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJRm9jdXNhYmxlT3B0aW9uIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2ExMXknO1xuaW1wb3J0IHsgQkFDS1NQQUNFLCBERUxFVEUsIFNQQUNFIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gICAgQ2FuQ29sb3IsXG4gICAgQ2FuQ29sb3JDdG9yLFxuICAgIENhbkRpc2FibGUsXG4gICAgQ2FuRGlzYWJsZUN0b3IsXG4gICAgbWl4aW5Db2xvcixcbiAgICBtaXhpbkRpc2FibGVkXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IE1jSWNvbiB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9pY29uJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIE1jVGFnRXZlbnQge1xuICAgIHRhZzogTWNUYWc7XG59XG5cbi8qKiBFdmVudCBvYmplY3QgZW1pdHRlZCBieSBNY1RhZyB3aGVuIHNlbGVjdGVkIG9yIGRlc2VsZWN0ZWQuICovXG5leHBvcnQgY2xhc3MgTWNUYWdTZWxlY3Rpb25DaGFuZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2U6IE1jVGFnLCBwdWJsaWMgc2VsZWN0ZWQ6IGJvb2xlYW4sIHB1YmxpYyBpc1VzZXJJbnB1dCA9IGZhbHNlKSB7fVxufVxuXG5cbmNvbnN0IFRBR19BVFRSSUJVVEVfTkFNRVMgPSBbJ21jLWJhc2ljLXRhZyddO1xuXG4vKipcbiAqIER1bW15IGRpcmVjdGl2ZSB0byBhZGQgQ1NTIGNsYXNzIHRvIHRhZyBhdmF0YXIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFnLWF2YXRhciwgW21jVGFnQXZhdGFyXScsXG4gICAgaG9zdDogeyBjbGFzczogJ21jLXRhZy1hdmF0YXInIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUYWdBdmF0YXIge31cblxuLyoqXG4gKiBEdW1teSBkaXJlY3RpdmUgdG8gYWRkIENTUyBjbGFzcyB0byB0YWcgdHJhaWxpbmcgaWNvbi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy10YWctdHJhaWxpbmctaWNvbiwgW21jVGFnVHJhaWxpbmdJY29uXScsXG4gICAgaG9zdDogeyBjbGFzczogJ21jLXRhZy10cmFpbGluZy1pY29uJyB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVGFnVHJhaWxpbmdJY29uIHt9XG5cbmV4cG9ydCBjbGFzcyBNY1RhZ0Jhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNUYWdNaXhpbkJhc2U6IENhbkNvbG9yQ3RvciAmIENhbkRpc2FibGVDdG9yICYgdHlwZW9mIE1jVGFnQmFzZSA9IG1peGluQ29sb3IobWl4aW5EaXNhYmxlZChNY1RhZ0Jhc2UpKTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRhZywgW21jLXRhZ10sIG1jLWJhc2ljLXRhZywgW21jLWJhc2ljLXRhZ10nLFxuICAgIGV4cG9ydEFzOiAnbWNUYWcnLFxuICAgIHRlbXBsYXRlVXJsOiAndGFnLnBhcnRpYWwuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGFnLnNjc3MnXSxcbiAgICBpbnB1dHM6IFsnY29sb3InXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdGFnJyxcblxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYmluZGV4JyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcblxuICAgICAgICAnW2NsYXNzLm1jLXNlbGVjdGVkXSc6ICdzZWxlY3RlZCcsXG4gICAgICAgICdbY2xhc3MubWMtZm9jdXNlZF0nOiAnaGFzRm9jdXMnLFxuICAgICAgICAnW2NsYXNzLm1jLXRhZy13aXRoLWF2YXRhcl0nOiAnYXZhdGFyJyxcbiAgICAgICAgJ1tjbGFzcy5tYy10YWctd2l0aC10cmFpbGluZy1pY29uXSc6ICd0cmFpbGluZ0ljb24gfHwgcmVtb3ZlSWNvbicsXG4gICAgICAgICdbY2xhc3MubWMtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcblxuICAgICAgICAnKGNsaWNrKSc6ICdoYW5kbGVDbGljaygkZXZlbnQpJyxcbiAgICAgICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duKCRldmVudCknLFxuICAgICAgICAnKGZvY3VzKSc6ICdmb2N1cygpJyxcbiAgICAgICAgJyhibHVyKSc6ICdibHVyKCknXG4gICAgfSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1jVGFnIGV4dGVuZHMgTWNUYWdNaXhpbkJhc2UgaW1wbGVtZW50cyBJRm9jdXNhYmxlT3B0aW9uLCBPbkRlc3Ryb3ksIENhbkNvbG9yLCBDYW5EaXNhYmxlIHtcbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgdGFnIGlzIGZvY3VzZWQuICovXG4gICAgcmVhZG9ubHkgb25Gb2N1cyA9IG5ldyBTdWJqZWN0PE1jVGFnRXZlbnQ+KCk7XG5cbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgdGFnIGlzIGJsdXJlZC4gKi9cbiAgICByZWFkb25seSBvbkJsdXIgPSBuZXcgU3ViamVjdDxNY1RhZ0V2ZW50PigpO1xuXG4gICAgbmF0aXZlRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICAvKiogV2hldGhlciB0aGUgdGFnIGhhcyBmb2N1cy4gKi9cbiAgICBoYXNGb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRhZyBsaXN0IGlzIHNlbGVjdGFibGUgKi9cbiAgICB0YWdMaXN0U2VsZWN0YWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKE1jSWNvbikgY29udGVudENoaWxkcmVuOiBRdWVyeUxpc3Q8TWNJY29uPjtcblxuICAgIC8qKiBUaGUgdGFnIGF2YXRhciAqL1xuICAgIEBDb250ZW50Q2hpbGQoTWNUYWdBdmF0YXIsIHtzdGF0aWM6IGZhbHNlfSkgYXZhdGFyOiBNY1RhZ0F2YXRhcjtcblxuICAgIC8qKiBUaGUgdGFnJ3MgdHJhaWxpbmcgaWNvbi4gKi9cbiAgICBAQ29udGVudENoaWxkKE1jVGFnVHJhaWxpbmdJY29uLCB7c3RhdGljOiBmYWxzZX0pIHRyYWlsaW5nSWNvbjogTWNUYWdUcmFpbGluZ0ljb247XG5cbiAgICAvKiogVGhlIHRhZydzIHJlbW92ZSB0b2dnbGVyLiAqL1xuICAgIEBDb250ZW50Q2hpbGQoZm9yd2FyZFJlZigoKSA9PiBNY1RhZ1JlbW92ZSksIHtzdGF0aWM6IGZhbHNlfSkgcmVtb3ZlSWNvbjogTWNUYWdSZW1vdmU7XG5cbiAgICAvKiogRW1pdHRlZCB3aGVuIHRoZSB0YWcgaXMgc2VsZWN0ZWQgb3IgZGVzZWxlY3RlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TWNUYWdTZWxlY3Rpb25DaGFuZ2U+ID1cbiAgICAgICAgbmV3IEV2ZW50RW1pdHRlcjxNY1RhZ1NlbGVjdGlvbkNoYW5nZT4oKTtcblxuICAgIC8qKiBFbWl0dGVkIHdoZW4gdGhlIHRhZyBpcyBkZXN0cm95ZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGRlc3Ryb3llZDogRXZlbnRFbWl0dGVyPE1jVGFnRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNY1RhZ0V2ZW50PigpO1xuXG4gICAgLyoqIEVtaXR0ZWQgd2hlbiBhIHRhZyBpcyB0byBiZSByZW1vdmVkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSByZW1vdmVkOiBFdmVudEVtaXR0ZXI8TWNUYWdFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1jVGFnRXZlbnQ+KCk7XG5cbiAgICAvKiogV2hldGhlciB0aGUgdGFnIGlzIHNlbGVjdGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IGNvZXJjZWRWYWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKGNvZXJjZWRWYWx1ZSAhPT0gdGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkID0gY29lcmNlZFZhbHVlO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaFNlbGVjdGlvbkNoYW5nZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBUaGUgdmFsdWUgb2YgdGhlIHRhZy4gRGVmYXVsdHMgdG8gdGhlIGNvbnRlbnQgaW5zaWRlIGA8bWMtdGFnPmAgdGFncy4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB0aGlzLl92YWx1ZVxuICAgICAgICAgICAgOiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC50ZXh0Q29udGVudDtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3ZhbHVlOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgdGFnIGlzIHNlbGVjdGFibGUuIFdoZW4gYSB0YWcgaXMgbm90IHNlbGVjdGFibGUsXG4gICAgICogY2hhbmdlcyB0byBpdHMgc2VsZWN0ZWQgc3RhdGUgYXJlIGFsd2F5cyBpZ25vcmVkLiBCeSBkZWZhdWx0IGEgdGFnIGlzXG4gICAgICogc2VsZWN0YWJsZSwgYW5kIGl0IGJlY29tZXMgbm9uLXNlbGVjdGFibGUgaWYgaXRzIHBhcmVudCB0YWcgbGlzdCBpc1xuICAgICAqIG5vdCBzZWxlY3RhYmxlLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNlbGVjdGFibGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RhYmxlICYmIHRoaXMudGFnTGlzdFNlbGVjdGFibGU7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGFibGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0YWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2VsZWN0YWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRoZSB0YWcgZGlzcGxheXMgdGhlIHJlbW92ZSBzdHlsaW5nIGFuZCBlbWl0cyAocmVtb3ZlZCkgZXZlbnRzLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHJlbW92YWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbW92YWJsZTtcbiAgICB9XG5cbiAgICBzZXQgcmVtb3ZhYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlbW92YWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVtb3ZhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGdldCB0YWJpbmRleCgpOiBhbnkge1xuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0YWJsZSkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkID8gbnVsbCA6IC0xO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHVibGljIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmVcbiAgICApIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG5cbiAgICAgICAgdGhpcy5hZGRIb3N0Q2xhc3NOYW1lKCk7XG5cbiAgICAgICAgdGhpcy5uYXRpdmVFbGVtZW50ID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzc01vZGlmaWNhdG9yRm9ySWNvbnMoKTtcbiAgICB9XG5cbiAgICBhZGRDbGFzc01vZGlmaWNhdG9yRm9ySWNvbnMoKSB7XG4gICAgICAgIGNvbnN0IGljb25zID0gdGhpcy5jb250ZW50Q2hpbGRyZW4ubWFwKChpdGVtKSA9PiBpdGVtLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChpY29ucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGljb25FbGVtZW50ID0gaWNvbnNbMF07XG5cbiAgICAgICAgICAgIGlmICghaWNvbkVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZyAmJiAhaWNvbkVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKGljb25FbGVtZW50Lm5leHRTaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21jLWljb25fbGVmdCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWMtbGVmdC1pY29uJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGljb25FbGVtZW50LnByZXZpb3VzU2libGluZykge1xuICAgICAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYy1pY29uX3JpZ2h0Jyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYy1yaWdodC1pY29uJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGljb25zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0SWNvbkVsZW1lbnQgPSBpY29uc1swXTtcbiAgICAgICAgICAgIGNvbnN0IHNlY29uZEljb25FbGVtZW50ID0gaWNvbnNbMV07XG5cbiAgICAgICAgICAgIGZpcnN0SWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWMtaWNvbl9sZWZ0Jyk7XG4gICAgICAgICAgICBzZWNvbmRJY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYy1pY29uX3JpZ2h0Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRIb3N0Q2xhc3NOYW1lKCkge1xuICAgICAgICAvLyBBZGQgY2xhc3MgZm9yIHRoZSBkaWZmZXJlbnQgdGFnc1xuICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgVEFHX0FUVFJJQlVURV9OQU1FUykge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyKSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gYXR0clxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY2xhc3NMaXN0LmFkZChhdHRyKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3QuYWRkKCdtYy1zdGFuZGFyZC10YWcnKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQuZW1pdCh7IHRhZzogdGhpcyB9KTtcbiAgICB9XG5cbiAgICBzZWxlY3QoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc2VsZWN0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoU2VsZWN0aW9uQ2hhbmdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RWaWFJbnRlcmFjdGlvbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaFNlbGVjdGlvbkNoYW5nZSh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZVNlbGVjdGVkKGlzVXNlcklucHV0OiBib29sZWFuID0gZmFsc2UpOiBib29sZWFuIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSAhdGhpcy5zZWxlY3RlZDtcbiAgICAgICAgdGhpcy5kaXNwYXRjaFNlbGVjdGlvbkNoYW5nZShpc1VzZXJJbnB1dCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgLyoqIEFsbG93cyBmb3IgcHJvZ3JhbW1hdGljIGZvY3VzaW5nIG9mIHRoZSB0YWcuICovXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RhYmxlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmICghdGhpcy5oYXNGb2N1cykge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgICAgICAgdGhpcy5vbkZvY3VzLm5leHQoeyB0YWc6IHRoaXMgfSk7XG5cbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFzRm9jdXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsbG93cyBmb3IgcHJvZ3JhbW1hdGljIHJlbW92YWwgb2YgdGhlIHRhZy4gQ2FsbGVkIGJ5IHRoZSBNY1RhZ0xpc3Qgd2hlbiB0aGUgREVMRVRFIG9yXG4gICAgICogQkFDS1NQQUNFIGtleXMgYXJlIHByZXNzZWQuXG4gICAgICpcbiAgICAgKiBJbmZvcm1zIGFueSBsaXN0ZW5lcnMgb2YgdGhlIHJlbW92YWwgcmVxdWVzdC4gRG9lcyBub3QgcmVtb3ZlIHRoZSB0YWcgZnJvbSB0aGUgRE9NLlxuICAgICAqL1xuICAgIHJlbW92ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucmVtb3ZhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZWQuZW1pdCh7IHRhZzogdGhpcyB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSBERUxFVEU6XG4gICAgICAgICAgICBjYXNlIEJBQ0tTUEFDRTpcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBhcmUgcmVtb3ZhYmxlLCByZW1vdmUgdGhlIGZvY3VzZWQgdGFnXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAvLyBBbHdheXMgcHJldmVudCBzbyBwYWdlIG5hdmlnYXRpb24gZG9lcyBub3Qgb2NjdXJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTUEFDRTpcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBhcmUgc2VsZWN0YWJsZSwgdG9nZ2xlIHRoZSBmb2N1c2VkIHRhZ1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGVTZWxlY3RlZCh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBBbHdheXMgcHJldmVudCBzcGFjZSBmcm9tIHNjcm9sbGluZyB0aGUgcGFnZSBzaW5jZSB0aGUgbGlzdCBoYXMgZm9jdXNcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJsdXIoKTogdm9pZCB7XG4gICAgICAgIC8vIFdoZW4gYW5pbWF0aW9ucyBhcmUgZW5hYmxlZCwgQW5ndWxhciBtYXkgZW5kIHVwIHJlbW92aW5nIHRoZSB0YWcgZnJvbSB0aGUgRE9NIGEgbGl0dGxlXG4gICAgICAgIC8vIGVhcmxpZXIgdGhhbiB1c3VhbCwgY2F1c2luZyBpdCB0byBiZSBibHVycmVkIGFuZCB0aHJvd2luZyBvZmYgdGhlIGxvZ2ljIGluIHRoZSB0YWcgbGlzdFxuICAgICAgICAvLyB0aGF0IG1vdmVzIGZvY3VzIG5vdCB0aGUgbmV4dCBpdGVtLiBUbyB3b3JrIGFyb3VuZCB0aGUgaXNzdWUsIHdlIGRlZmVyIG1hcmtpbmcgdGhlIHRhZ1xuICAgICAgICAvLyBhcyBub3QgZm9jdXNlZCB1bnRpbCB0aGUgbmV4dCB0aW1lIHRoZSB6b25lIHN0YWJpbGl6ZXMuXG4gICAgICAgIHRoaXMuX25nWm9uZS5vblN0YWJsZVxuICAgICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzRm9jdXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkJsdXIubmV4dCh7IHRhZzogdGhpcyB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UoaXNVc2VySW5wdXQgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHtcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgICAgIGlzVXNlcklucHV0LFxuICAgICAgICAgICAgc2VsZWN0ZWQ6IHRoaXMuX3NlbGVjdGVkXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vKipcbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICBgPG1jLXRhZz5cbiAqICAgICAgIDxtYy1pY29uIG1jVGFnUmVtb3ZlPmNhbmNlbDwvbWMtaWNvbj5cbiAqICAgICA8L21jLXRhZz5gXG4gKlxuICogWW91ICptYXkqIHVzZSBhIGN1c3RvbSBpY29uLCBidXQgeW91IG1heSBuZWVkIHRvIG92ZXJyaWRlIHRoZSBgbWMtdGFnLXJlbW92ZWAgcG9zaXRpb25pbmdcbiAqIHN0eWxlcyB0byBwcm9wZXJseSBjZW50ZXIgdGhlIGljb24gd2l0aGluIHRoZSB0YWcuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jVGFnUmVtb3ZlXScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRhZy1yZW1vdmUgbWMtdGFnLXRyYWlsaW5nLWljb24nLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJy0xJyxcbiAgICAgICAgJyhjbGljayknOiAnaGFuZGxlQ2xpY2soJGV2ZW50KScsXG4gICAgICAgICcoZm9jdXMpJzogJ2ZvY3VzKCRldmVudCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1RhZ1JlbW92ZSB7XG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIHBhcmVudFRhZzogTWNUYWcpIHt9XG5cbiAgICBmb2N1cygkZXZlbnQpOiB2b2lkIHtcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIC8qKiBDYWxscyB0aGUgcGFyZW50IHRhZydzIHB1YmxpYyBgcmVtb3ZlKClgIG1ldGhvZCBpZiBhcHBsaWNhYmxlLiAqL1xuICAgIGhhbmRsZUNsaWNrKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wYXJlbnRUYWcucmVtb3ZhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudFRhZy5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gc3RvcCBldmVudCBwcm9wYWdhdGlvbiBiZWNhdXNlIG90aGVyd2lzZSB0aGUgZXZlbnQgd2lsbCBidWJibGUgdXAgdG8gdGhlXG4gICAgICAgIC8vIGZvcm0gZmllbGQgYW5kIGNhdXNlIHRoZSBgb25Db250YWluZXJDbGlja2AgbWV0aG9kIHRvIGJlIGludm9rZWQuIFRoaXMgbWV0aG9kIHdvdWxkIHRoZW5cbiAgICAgICAgLy8gcmVzZXQgdGhlIGZvY3VzZWQgdGFnIHRoYXQgaGFzIGJlZW4gZm9jdXNlZCBhZnRlciB0YWcgcmVtb3ZhbC4gVXN1YWxseSB0aGUgcGFyZW50XG4gICAgICAgIC8vIHRoZSBwYXJlbnQgY2xpY2sgbGlzdGVuZXIgb2YgdGhlIGBNY1RhZ2Agd291bGQgcHJldmVudCBwcm9wYWdhdGlvbiwgYnV0IGl0IGNhbiBoYXBwZW5cbiAgICAgICAgLy8gdGhhdCB0aGUgdGFnIGlzIGJlaW5nIHJlbW92ZWQgYmVmb3JlIHRoZSBldmVudCBidWJibGVzIHVwLlxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG59XG4iXX0=