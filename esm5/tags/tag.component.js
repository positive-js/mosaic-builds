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
        removable: [{ type: Input }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy90YWdzLyIsInNvdXJjZXMiOlsidGFnLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFFTixNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRSxPQUFPLEVBS0gsVUFBVSxFQUNWLGFBQWEsRUFDaEIsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFJdEMsZ0NBRUM7OztJQURHLHlCQUFXOzs7OztBQUlmOzs7O0lBQ0ksOEJBQW1CLE1BQWEsRUFBUyxRQUFpQixFQUFTLFdBQW1CO1FBQW5CLDRCQUFBLEVBQUEsbUJBQW1CO1FBQW5FLFdBQU0sR0FBTixNQUFNLENBQU87UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQVE7SUFBRyxDQUFDO0lBQzlGLDJCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7Ozs7Ozs7SUFEZSxzQ0FBb0I7O0lBQUUsd0NBQXdCOztJQUFFLDJDQUEwQjs7O0lBSXBGLG1CQUFtQixHQUFHLENB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SUE2QkM7U0FwQlksV0FBVzs7Ozs7O0lBQ1IsZ0NBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSUZvY3VzYWJsZU9wdGlvbiB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9hMTF5JztcbmltcG9ydCB7IEJBQ0tTUEFDRSwgREVMRVRFLCBTUEFDRSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICAgIENhbkNvbG9yLFxuICAgIENhbkNvbG9yQ3RvcixcbiAgICBDYW5EaXNhYmxlLFxuICAgIENhbkRpc2FibGVDdG9yLFxuICAgIG1peGluQ29sb3IsXG4gICAgbWl4aW5EaXNhYmxlZFxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0ljb24gfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvaWNvbic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBNY1RhZ0V2ZW50IHtcbiAgICB0YWc6IE1jVGFnO1xufVxuXG4vKiogRXZlbnQgb2JqZWN0IGVtaXR0ZWQgYnkgTWNUYWcgd2hlbiBzZWxlY3RlZCBvciBkZXNlbGVjdGVkLiAqL1xuZXhwb3J0IGNsYXNzIE1jVGFnU2VsZWN0aW9uQ2hhbmdlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlOiBNY1RhZywgcHVibGljIHNlbGVjdGVkOiBib29sZWFuLCBwdWJsaWMgaXNVc2VySW5wdXQgPSBmYWxzZSkge31cbn1cblxuXG5jb25zdCBUQUdfQVRUUklCVVRFX05BTUVTID0gWydtYy1iYXNpYy10YWcnXTtcblxuLyoqXG4gKiBEdW1teSBkaXJlY3RpdmUgdG8gYWRkIENTUyBjbGFzcyB0byB0YWcgYXZhdGFyLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLXRhZy1hdmF0YXIsIFttY1RhZ0F2YXRhcl0nLFxuICAgIGhvc3Q6IHsgY2xhc3M6ICdtYy10YWctYXZhdGFyJyB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVGFnQXZhdGFyIHt9XG5cbi8qKlxuICogRHVtbXkgZGlyZWN0aXZlIHRvIGFkZCBDU1MgY2xhc3MgdG8gdGFnIHRyYWlsaW5nIGljb24uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFnLXRyYWlsaW5nLWljb24sIFttY1RhZ1RyYWlsaW5nSWNvbl0nLFxuICAgIGhvc3Q6IHsgY2xhc3M6ICdtYy10YWctdHJhaWxpbmctaWNvbicgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1RhZ1RyYWlsaW5nSWNvbiB7fVxuXG5leHBvcnQgY2xhc3MgTWNUYWdCYXNlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jVGFnTWl4aW5CYXNlOiBDYW5Db2xvckN0b3IgJiBDYW5EaXNhYmxlQ3RvciAmIHR5cGVvZiBNY1RhZ0Jhc2UgPSBtaXhpbkNvbG9yKG1peGluRGlzYWJsZWQoTWNUYWdCYXNlKSk7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy10YWcsIFttYy10YWddLCBtYy1iYXNpYy10YWcsIFttYy1iYXNpYy10YWddJyxcbiAgICBleHBvcnRBczogJ21jVGFnJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3RhZy5wYXJ0aWFsLmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3RhZy5zY3NzJ10sXG4gICAgaW5wdXRzOiBbJ2NvbG9yJywgJ2Rpc2FibGVkJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRhZycsXG5cbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJpbmRleCcsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG5cbiAgICAgICAgJ1tjbGFzcy5tYy1zZWxlY3RlZF0nOiAnc2VsZWN0ZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWZvY3VzZWRdJzogJ2hhc0ZvY3VzJyxcbiAgICAgICAgJ1tjbGFzcy5tYy10YWctd2l0aC1hdmF0YXJdJzogJ2F2YXRhcicsXG4gICAgICAgICdbY2xhc3MubWMtdGFnLXdpdGgtdHJhaWxpbmctaWNvbl0nOiAndHJhaWxpbmdJY29uIHx8IHJlbW92ZUljb24nLFxuICAgICAgICAnW2NsYXNzLm1jLXRhZy1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG5cbiAgICAgICAgJyhjbGljayknOiAnaGFuZGxlQ2xpY2soJGV2ZW50KScsXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyhmb2N1cyknOiAnZm9jdXMoKScsXG4gICAgICAgICcoYmx1ciknOiAnYmx1cigpJ1xuICAgIH0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNY1RhZyBleHRlbmRzIE1jVGFnTWl4aW5CYXNlIGltcGxlbWVudHMgSUZvY3VzYWJsZU9wdGlvbiwgT25EZXN0cm95LCBDYW5Db2xvciwgQ2FuRGlzYWJsZSB7XG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIHRhZyBpcyBmb2N1c2VkLiAqL1xuICAgIHJlYWRvbmx5IG9uRm9jdXMgPSBuZXcgU3ViamVjdDxNY1RhZ0V2ZW50PigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIHRhZyBpcyBibHVyZWQuICovXG4gICAgcmVhZG9ubHkgb25CbHVyID0gbmV3IFN1YmplY3Q8TWNUYWdFdmVudD4oKTtcblxuICAgIG5hdGl2ZUVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRhZyBoYXMgZm9jdXMuICovXG4gICAgaGFzRm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSB0YWcgbGlzdCBpcyBzZWxlY3RhYmxlICovXG4gICAgdGFnTGlzdFNlbGVjdGFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY0ljb24pIGNvbnRlbnRDaGlsZHJlbjogUXVlcnlMaXN0PE1jSWNvbj47XG5cbiAgICAvKiogVGhlIHRhZyBhdmF0YXIgKi9cbiAgICBAQ29udGVudENoaWxkKE1jVGFnQXZhdGFyLCB7c3RhdGljOiBmYWxzZX0pIGF2YXRhcjogTWNUYWdBdmF0YXI7XG5cbiAgICAvKiogVGhlIHRhZydzIHRyYWlsaW5nIGljb24uICovXG4gICAgQENvbnRlbnRDaGlsZChNY1RhZ1RyYWlsaW5nSWNvbiwge3N0YXRpYzogZmFsc2V9KSB0cmFpbGluZ0ljb246IE1jVGFnVHJhaWxpbmdJY29uO1xuXG4gICAgLyoqIFRoZSB0YWcncyByZW1vdmUgdG9nZ2xlci4gKi9cbiAgICBAQ29udGVudENoaWxkKGZvcndhcmRSZWYoKCkgPT4gTWNUYWdSZW1vdmUpLCB7c3RhdGljOiBmYWxzZX0pIHJlbW92ZUljb246IE1jVGFnUmVtb3ZlO1xuXG4gICAgLyoqIEVtaXR0ZWQgd2hlbiB0aGUgdGFnIGlzIHNlbGVjdGVkIG9yIGRlc2VsZWN0ZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPE1jVGFnU2VsZWN0aW9uQ2hhbmdlPiA9XG4gICAgICAgIG5ldyBFdmVudEVtaXR0ZXI8TWNUYWdTZWxlY3Rpb25DaGFuZ2U+KCk7XG5cbiAgICAvKiogRW1pdHRlZCB3aGVuIHRoZSB0YWcgaXMgZGVzdHJveWVkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBkZXN0cm95ZWQ6IEV2ZW50RW1pdHRlcjxNY1RhZ0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TWNUYWdFdmVudD4oKTtcblxuICAgIC8qKiBFbWl0dGVkIHdoZW4gYSB0YWcgaXMgdG8gYmUgcmVtb3ZlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgcmVtb3ZlZDogRXZlbnRFbWl0dGVyPE1jVGFnRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNY1RhZ0V2ZW50PigpO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRhZyBpcyBzZWxlY3RlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBjb2VyY2VkVmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIGlmIChjb2VyY2VkVmFsdWUgIT09IHRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IGNvZXJjZWRWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3NlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogVGhlIHZhbHVlIG9mIHRoZSB0YWcuIERlZmF1bHRzIHRvIHRoZSBjb250ZW50IGluc2lkZSBgPG1jLXRhZz5gIHRhZ3MuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gdGhpcy5fdmFsdWVcbiAgICAgICAgICAgIDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF92YWx1ZTogYW55O1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBvciBub3QgdGhlIHRhZyBpcyBzZWxlY3RhYmxlLiBXaGVuIGEgdGFnIGlzIG5vdCBzZWxlY3RhYmxlLFxuICAgICAqIGNoYW5nZXMgdG8gaXRzIHNlbGVjdGVkIHN0YXRlIGFyZSBhbHdheXMgaWdub3JlZC4gQnkgZGVmYXVsdCBhIHRhZyBpc1xuICAgICAqIHNlbGVjdGFibGUsIGFuZCBpdCBiZWNvbWVzIG5vbi1zZWxlY3RhYmxlIGlmIGl0cyBwYXJlbnQgdGFnIGxpc3QgaXNcbiAgICAgKiBub3Qgc2VsZWN0YWJsZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RhYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0YWJsZSAmJiB0aGlzLnRhZ0xpc3RTZWxlY3RhYmxlO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RhYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGFibGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NlbGVjdGFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgdGFnIGRpc3BsYXlzIHRoZSByZW1vdmUgc3R5bGluZyBhbmQgZW1pdHMgKHJlbW92ZWQpIGV2ZW50cy5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCByZW1vdmFibGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZW1vdmFibGU7XG4gICAgfVxuXG4gICAgc2V0IHJlbW92YWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9yZW1vdmFibGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlbW92YWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBnZXQgdGFiaW5kZXgoKTogYW55IHtcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGFibGUpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCA/IG51bGwgOiAtMTtcbiAgICB9XG5cbiAgICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGFueSkge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwdWJsaWMgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZVxuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgICAgICB0aGlzLmFkZEhvc3RDbGFzc05hbWUoKTtcblxuICAgICAgICB0aGlzLm5hdGl2ZUVsZW1lbnQgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLmFkZENsYXNzTW9kaWZpY2F0b3JGb3JJY29ucygpO1xuICAgIH1cblxuICAgIGFkZENsYXNzTW9kaWZpY2F0b3JGb3JJY29ucygpIHtcbiAgICAgICAgY29uc3QgaWNvbnMgPSB0aGlzLmNvbnRlbnRDaGlsZHJlbi5tYXAoKGl0ZW0pID0+IGl0ZW0uX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgaWYgKGljb25zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgY29uc3QgaWNvbkVsZW1lbnQgPSBpY29uc1swXTtcblxuICAgICAgICAgICAgaWYgKCFpY29uRWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nICYmICFpY29uRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoaWNvbkVsZW1lbnQubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWMtaWNvbl9sZWZ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYy1sZWZ0LWljb24nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaWNvbkVsZW1lbnQucHJldmlvdXNTaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21jLWljb25fcmlnaHQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21jLXJpZ2h0LWljb24nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaWNvbnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgY29uc3QgZmlyc3RJY29uRWxlbWVudCA9IGljb25zWzBdO1xuICAgICAgICAgICAgY29uc3Qgc2Vjb25kSWNvbkVsZW1lbnQgPSBpY29uc1sxXTtcblxuICAgICAgICAgICAgZmlyc3RJY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYy1pY29uX2xlZnQnKTtcbiAgICAgICAgICAgIHNlY29uZEljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21jLWljb25fcmlnaHQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZEhvc3RDbGFzc05hbWUoKSB7XG4gICAgICAgIC8vIEFkZCBjbGFzcyBmb3IgdGhlIGRpZmZlcmVudCB0YWdzXG4gICAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBUQUdfQVRUUklCVVRFX05BTUVTKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKGF0dHIpIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBhdHRyXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3QuYWRkKGF0dHIpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmNsYXNzTGlzdC5hZGQoJ21jLXN0YW5kYXJkLXRhZycpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3llZC5lbWl0KHsgdGFnOiB0aGlzIH0pO1xuICAgIH1cblxuICAgIHNlbGVjdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaFNlbGVjdGlvbkNoYW5nZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVzZWxlY3QoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdFZpYUludGVyYWN0aW9uKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoU2VsZWN0aW9uQ2hhbmdlKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlU2VsZWN0ZWQoaXNVc2VySW5wdXQ6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9ICF0aGlzLnNlbGVjdGVkO1xuICAgICAgICB0aGlzLmRpc3BhdGNoU2VsZWN0aW9uQ2hhbmdlKGlzVXNlcklucHV0KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZDtcbiAgICB9XG5cbiAgICAvKiogQWxsb3dzIGZvciBwcm9ncmFtbWF0aWMgZm9jdXNpbmcgb2YgdGhlIHRhZy4gKi9cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGFibGUpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmhhc0ZvY3VzKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXG4gICAgICAgICAgICB0aGlzLm9uRm9jdXMubmV4dCh7IHRhZzogdGhpcyB9KTtcblxuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYXNGb2N1cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxsb3dzIGZvciBwcm9ncmFtbWF0aWMgcmVtb3ZhbCBvZiB0aGUgdGFnLiBDYWxsZWQgYnkgdGhlIE1jVGFnTGlzdCB3aGVuIHRoZSBERUxFVEUgb3JcbiAgICAgKiBCQUNLU1BBQ0Uga2V5cyBhcmUgcHJlc3NlZC5cbiAgICAgKlxuICAgICAqIEluZm9ybXMgYW55IGxpc3RlbmVycyBvZiB0aGUgcmVtb3ZhbCByZXF1ZXN0LiBEb2VzIG5vdCByZW1vdmUgdGhlIHRhZyBmcm9tIHRoZSBET00uXG4gICAgICovXG4gICAgcmVtb3ZlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5yZW1vdmFibGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlZC5lbWl0KHsgdGFnOiB0aGlzIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIERFTEVURTpcbiAgICAgICAgICAgIGNhc2UgQkFDS1NQQUNFOlxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGFyZSByZW1vdmFibGUsIHJlbW92ZSB0aGUgZm9jdXNlZCB0YWdcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIC8vIEFsd2F5cyBwcmV2ZW50IHNvIHBhZ2UgbmF2aWdhdGlvbiBkb2VzIG5vdCBvY2N1clxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNQQUNFOlxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGFyZSBzZWxlY3RhYmxlLCB0b2dnbGUgdGhlIGZvY3VzZWQgdGFnXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZVNlbGVjdGVkKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIEFsd2F5cyBwcmV2ZW50IHNwYWNlIGZyb20gc2Nyb2xsaW5nIHRoZSBwYWdlIHNpbmNlIHRoZSBsaXN0IGhhcyBmb2N1c1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmx1cigpOiB2b2lkIHtcbiAgICAgICAgLy8gV2hlbiBhbmltYXRpb25zIGFyZSBlbmFibGVkLCBBbmd1bGFyIG1heSBlbmQgdXAgcmVtb3ZpbmcgdGhlIHRhZyBmcm9tIHRoZSBET00gYSBsaXR0bGVcbiAgICAgICAgLy8gZWFybGllciB0aGFuIHVzdWFsLCBjYXVzaW5nIGl0IHRvIGJlIGJsdXJyZWQgYW5kIHRocm93aW5nIG9mZiB0aGUgbG9naWMgaW4gdGhlIHRhZyBsaXN0XG4gICAgICAgIC8vIHRoYXQgbW92ZXMgZm9jdXMgbm90IHRoZSBuZXh0IGl0ZW0uIFRvIHdvcmsgYXJvdW5kIHRoZSBpc3N1ZSwgd2UgZGVmZXIgbWFya2luZyB0aGUgdGFnXG4gICAgICAgIC8vIGFzIG5vdCBmb2N1c2VkIHVudGlsIHRoZSBuZXh0IHRpbWUgdGhlIHpvbmUgc3RhYmlsaXplcy5cbiAgICAgICAgdGhpcy5fbmdab25lLm9uU3RhYmxlXG4gICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNGb2N1cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQmx1ci5uZXh0KHsgdGFnOiB0aGlzIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkaXNwYXRjaFNlbGVjdGlvbkNoYW5nZShpc1VzZXJJbnB1dCA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQoe1xuICAgICAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICAgICAgaXNVc2VySW5wdXQsXG4gICAgICAgICAgICBzZWxlY3RlZDogdGhpcy5fc2VsZWN0ZWRcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbi8qKlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgIGA8bWMtdGFnPlxuICogICAgICAgPG1jLWljb24gbWNUYWdSZW1vdmU+Y2FuY2VsPC9tYy1pY29uPlxuICogICAgIDwvbWMtdGFnPmBcbiAqXG4gKiBZb3UgKm1heSogdXNlIGEgY3VzdG9tIGljb24sIGJ1dCB5b3UgbWF5IG5lZWQgdG8gb3ZlcnJpZGUgdGhlIGBtYy10YWctcmVtb3ZlYCBwb3NpdGlvbmluZ1xuICogc3R5bGVzIHRvIHByb3Blcmx5IGNlbnRlciB0aGUgaWNvbiB3aXRoaW4gdGhlIHRhZy5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNUYWdSZW1vdmVdJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdGFnLXJlbW92ZSBtYy10YWctdHJhaWxpbmctaWNvbicsXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAnLTEnLFxuICAgICAgICAnKGNsaWNrKSc6ICdoYW5kbGVDbGljaygkZXZlbnQpJyxcbiAgICAgICAgJyhmb2N1cyknOiAnZm9jdXMoJGV2ZW50KSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVGFnUmVtb3ZlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcGFyZW50VGFnOiBNY1RhZykge31cblxuICAgIGZvY3VzKCRldmVudCk6IHZvaWQge1xuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqIENhbGxzIHRoZSBwYXJlbnQgdGFnJ3MgcHVibGljIGByZW1vdmUoKWAgbWV0aG9kIGlmIGFwcGxpY2FibGUuICovXG4gICAgaGFuZGxlQ2xpY2soZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBhcmVudFRhZy5yZW1vdmFibGUpIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50VGFnLnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgbmVlZCB0byBzdG9wIGV2ZW50IHByb3BhZ2F0aW9uIGJlY2F1c2Ugb3RoZXJ3aXNlIHRoZSBldmVudCB3aWxsIGJ1YmJsZSB1cCB0byB0aGVcbiAgICAgICAgLy8gZm9ybSBmaWVsZCBhbmQgY2F1c2UgdGhlIGBvbkNvbnRhaW5lckNsaWNrYCBtZXRob2QgdG8gYmUgaW52b2tlZC4gVGhpcyBtZXRob2Qgd291bGQgdGhlblxuICAgICAgICAvLyByZXNldCB0aGUgZm9jdXNlZCB0YWcgdGhhdCBoYXMgYmVlbiBmb2N1c2VkIGFmdGVyIHRhZyByZW1vdmFsLiBVc3VhbGx5IHRoZSBwYXJlbnRcbiAgICAgICAgLy8gdGhlIHBhcmVudCBjbGljayBsaXN0ZW5lciBvZiB0aGUgYE1jVGFnYCB3b3VsZCBwcmV2ZW50IHByb3BhZ2F0aW9uLCBidXQgaXQgY2FuIGhhcHBlblxuICAgICAgICAvLyB0aGF0IHRoZSB0YWcgaXMgYmVpbmcgcmVtb3ZlZCBiZWZvcmUgdGhlIGV2ZW50IGJ1YmJsZXMgdXAuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbn1cbiJdfQ==