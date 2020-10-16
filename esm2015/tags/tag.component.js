/**
 * @fileoverview added by tsickle
 * Generated from: tag.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class McTagSelectionChange {
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
if (false) {
    /** @type {?} */
    McTagSelectionChange.prototype.source;
    /** @type {?} */
    McTagSelectionChange.prototype.selected;
    /** @type {?} */
    McTagSelectionChange.prototype.isUserInput;
}
/** @type {?} */
const TAG_ATTRIBUTE_NAMES = ['mc-basic-tag'];
/**
 * Dummy directive to add CSS class to tag avatar.
 * \@docs-private
 */
export class McTagAvatar {
}
McTagAvatar.decorators = [
    { type: Directive, args: [{
                selector: 'mc-tag-avatar, [mcTagAvatar]',
                host: { class: 'mc-tag-avatar' }
            },] }
];
/**
 * Dummy directive to add CSS class to tag trailing icon.
 * \@docs-private
 */
export class McTagTrailingIcon {
}
McTagTrailingIcon.decorators = [
    { type: Directive, args: [{
                selector: 'mc-tag-trailing-icon, [mcTagTrailingIcon]',
                host: { class: 'mc-tag-trailing-icon' }
            },] }
];
export class McTagBase {
    // tslint:disable-next-line:naming-convention
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
if (false) {
    /** @type {?} */
    McTagBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export const McTagMixinBase = mixinColor(mixinDisabled(McTagBase));
export class McTag extends McTagMixinBase {
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
                styles: [".mc-tag{border-radius:4px;border-style:solid;border-width:1px;box-sizing:border-box;cursor:default;display:inline-block;height:24px;margin:2px;outline:none;overflow:hidden;position:relative}.mc-tag.mc-left-icon{padding-left:3px}.mc-tag.mc-right-icon{padding-right:3px}.mc-tag__wrapper{align-items:center;display:flex;flex:1 1 100%;height:100%}.mc-tag__wrapper .mc-icon{align-items:center;display:flex;flex-shrink:0;height:24px;justify-content:center;width:24px}.mc-tag__wrapper .mc-icon_left{margin-right:3px}.mc-tag__wrapper .mc-icon_right{margin-left:3px}.mc-tag-overlay{border-radius:inherit;bottom:-1px;left:-1px;pointer-events:none;position:absolute;right:-1px;top:-1px}.mc-tag__text{margin-left:7px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"]
            }] }
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
    removable: [{ type: Input }],
    disabled: [{ type: Input }]
};
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
export class McTagRemove {
    /**
     * @param {?} parentTag
     */
    constructor(parentTag) {
        this.parentTag = parentTag;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    focus($event) {
        $event.stopPropagation();
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
                    '[attr.tabindex]': '-1',
                    '(click)': 'handleClick($event)',
                    '(focus)': 'focus($event)'
                }
            },] }
];
/** @nocollapse */
McTagRemove.ctorParameters = () => [
    { type: McTag }
];
if (false) {
    /**
     * @type {?}
     * @protected
     */
    McTagRemove.prototype.parentTag;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL3RhZ3MvIiwic291cmNlcyI6WyJ0YWcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBRU4sTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEUsT0FBTyxFQUtILFVBQVUsRUFDVixhQUFhLEVBQ2hCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBSXRDLGdDQUVDOzs7SUFERyx5QkFBVzs7Ozs7QUFJZixNQUFNLE9BQU8sb0JBQW9COzs7Ozs7SUFDN0IsWUFBbUIsTUFBYSxFQUFTLFFBQWlCLEVBQVMsY0FBYyxLQUFLO1FBQW5FLFdBQU0sR0FBTixNQUFNLENBQU87UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQVE7SUFBRyxDQUFDO0NBQzdGOzs7SUFEZSxzQ0FBb0I7O0lBQUUsd0NBQXdCOztJQUFFLDJDQUEwQjs7O01BSXBGLG1CQUFtQixHQUFHLENBQUMsY0FBYyxDQUFDOzs7OztB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QUMsU0FBUyxFQUFFO1lBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDM0I7UUFFRCxzRkFBc0Y7UUFDdEYsMkZBQTJGO1FBQzNGLG9GQUFvRjtRQUNwRix3RkFBd0Y7UUFDeEYsNkRBQTZEO1FBQzdELEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7WUE1QkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxlQUFlO2dCQUN6QixJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLG9DQUFvQztvQkFDM0MsaUJBQWlCLEVBQUUsSUFBSTtvQkFDdkIsU0FBUyxFQUFFLHFCQUFxQjtvQkFDaEMsU0FBUyxFQUFFLGVBQWU7aUJBQzdCO2FBQ0o7Ozs7WUFFb0MsS0FBSzs7Ozs7OztJQUExQixnQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJRm9jdXNhYmxlT3B0aW9uIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2ExMXknO1xuaW1wb3J0IHsgQkFDS1NQQUNFLCBERUxFVEUsIFNQQUNFIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gICAgQ2FuQ29sb3IsXG4gICAgQ2FuQ29sb3JDdG9yLFxuICAgIENhbkRpc2FibGUsXG4gICAgQ2FuRGlzYWJsZUN0b3IsXG4gICAgbWl4aW5Db2xvcixcbiAgICBtaXhpbkRpc2FibGVkXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IE1jSWNvbiB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9pY29uJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIE1jVGFnRXZlbnQge1xuICAgIHRhZzogTWNUYWc7XG59XG5cbi8qKiBFdmVudCBvYmplY3QgZW1pdHRlZCBieSBNY1RhZyB3aGVuIHNlbGVjdGVkIG9yIGRlc2VsZWN0ZWQuICovXG5leHBvcnQgY2xhc3MgTWNUYWdTZWxlY3Rpb25DaGFuZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2U6IE1jVGFnLCBwdWJsaWMgc2VsZWN0ZWQ6IGJvb2xlYW4sIHB1YmxpYyBpc1VzZXJJbnB1dCA9IGZhbHNlKSB7fVxufVxuXG5cbmNvbnN0IFRBR19BVFRSSUJVVEVfTkFNRVMgPSBbJ21jLWJhc2ljLXRhZyddO1xuXG4vKipcbiAqIER1bW15IGRpcmVjdGl2ZSB0byBhZGQgQ1NTIGNsYXNzIHRvIHRhZyBhdmF0YXIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFnLWF2YXRhciwgW21jVGFnQXZhdGFyXScsXG4gICAgaG9zdDogeyBjbGFzczogJ21jLXRhZy1hdmF0YXInIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUYWdBdmF0YXIge31cblxuLyoqXG4gKiBEdW1teSBkaXJlY3RpdmUgdG8gYWRkIENTUyBjbGFzcyB0byB0YWcgdHJhaWxpbmcgaWNvbi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy10YWctdHJhaWxpbmctaWNvbiwgW21jVGFnVHJhaWxpbmdJY29uXScsXG4gICAgaG9zdDogeyBjbGFzczogJ21jLXRhZy10cmFpbGluZy1pY29uJyB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVGFnVHJhaWxpbmdJY29uIHt9XG5cbmV4cG9ydCBjbGFzcyBNY1RhZ0Jhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNUYWdNaXhpbkJhc2U6IENhbkNvbG9yQ3RvciAmIENhbkRpc2FibGVDdG9yICYgdHlwZW9mIE1jVGFnQmFzZSA9IG1peGluQ29sb3IobWl4aW5EaXNhYmxlZChNY1RhZ0Jhc2UpKTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRhZywgW21jLXRhZ10sIG1jLWJhc2ljLXRhZywgW21jLWJhc2ljLXRhZ10nLFxuICAgIGV4cG9ydEFzOiAnbWNUYWcnLFxuICAgIHRlbXBsYXRlVXJsOiAndGFnLnBhcnRpYWwuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGFnLnNjc3MnXSxcbiAgICBpbnB1dHM6IFsnY29sb3InXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdGFnJyxcblxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYmluZGV4JyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcblxuICAgICAgICAnW2NsYXNzLm1jLXNlbGVjdGVkXSc6ICdzZWxlY3RlZCcsXG4gICAgICAgICdbY2xhc3MubWMtZm9jdXNlZF0nOiAnaGFzRm9jdXMnLFxuICAgICAgICAnW2NsYXNzLm1jLXRhZy13aXRoLWF2YXRhcl0nOiAnYXZhdGFyJyxcbiAgICAgICAgJ1tjbGFzcy5tYy10YWctd2l0aC10cmFpbGluZy1pY29uXSc6ICd0cmFpbGluZ0ljb24gfHwgcmVtb3ZlSWNvbicsXG4gICAgICAgICdbY2xhc3MubWMtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcblxuICAgICAgICAnKGNsaWNrKSc6ICdoYW5kbGVDbGljaygkZXZlbnQpJyxcbiAgICAgICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duKCRldmVudCknLFxuICAgICAgICAnKGZvY3VzKSc6ICdmb2N1cygpJyxcbiAgICAgICAgJyhibHVyKSc6ICdibHVyKCknXG4gICAgfSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1jVGFnIGV4dGVuZHMgTWNUYWdNaXhpbkJhc2UgaW1wbGVtZW50cyBJRm9jdXNhYmxlT3B0aW9uLCBPbkRlc3Ryb3ksIENhbkNvbG9yLCBDYW5EaXNhYmxlIHtcbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgdGFnIGlzIGZvY3VzZWQuICovXG4gICAgcmVhZG9ubHkgb25Gb2N1cyA9IG5ldyBTdWJqZWN0PE1jVGFnRXZlbnQ+KCk7XG5cbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgdGFnIGlzIGJsdXJlZC4gKi9cbiAgICByZWFkb25seSBvbkJsdXIgPSBuZXcgU3ViamVjdDxNY1RhZ0V2ZW50PigpO1xuXG4gICAgbmF0aXZlRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICAvKiogV2hldGhlciB0aGUgdGFnIGhhcyBmb2N1cy4gKi9cbiAgICBoYXNGb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRhZyBsaXN0IGlzIHNlbGVjdGFibGUgKi9cbiAgICB0YWdMaXN0U2VsZWN0YWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKE1jSWNvbikgY29udGVudENoaWxkcmVuOiBRdWVyeUxpc3Q8TWNJY29uPjtcblxuICAgIC8qKiBUaGUgdGFnIGF2YXRhciAqL1xuICAgIEBDb250ZW50Q2hpbGQoTWNUYWdBdmF0YXIsIHtzdGF0aWM6IGZhbHNlfSkgYXZhdGFyOiBNY1RhZ0F2YXRhcjtcblxuICAgIC8qKiBUaGUgdGFnJ3MgdHJhaWxpbmcgaWNvbi4gKi9cbiAgICBAQ29udGVudENoaWxkKE1jVGFnVHJhaWxpbmdJY29uLCB7c3RhdGljOiBmYWxzZX0pIHRyYWlsaW5nSWNvbjogTWNUYWdUcmFpbGluZ0ljb247XG5cbiAgICAvKiogVGhlIHRhZydzIHJlbW92ZSB0b2dnbGVyLiAqL1xuICAgIEBDb250ZW50Q2hpbGQoZm9yd2FyZFJlZigoKSA9PiBNY1RhZ1JlbW92ZSksIHtzdGF0aWM6IGZhbHNlfSkgcmVtb3ZlSWNvbjogTWNUYWdSZW1vdmU7XG5cbiAgICAvKiogRW1pdHRlZCB3aGVuIHRoZSB0YWcgaXMgc2VsZWN0ZWQgb3IgZGVzZWxlY3RlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TWNUYWdTZWxlY3Rpb25DaGFuZ2U+ID1cbiAgICAgICAgbmV3IEV2ZW50RW1pdHRlcjxNY1RhZ1NlbGVjdGlvbkNoYW5nZT4oKTtcblxuICAgIC8qKiBFbWl0dGVkIHdoZW4gdGhlIHRhZyBpcyBkZXN0cm95ZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGRlc3Ryb3llZDogRXZlbnRFbWl0dGVyPE1jVGFnRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNY1RhZ0V2ZW50PigpO1xuXG4gICAgLyoqIEVtaXR0ZWQgd2hlbiBhIHRhZyBpcyB0byBiZSByZW1vdmVkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSByZW1vdmVkOiBFdmVudEVtaXR0ZXI8TWNUYWdFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1jVGFnRXZlbnQ+KCk7XG5cbiAgICAvKiogV2hldGhlciB0aGUgdGFnIGlzIHNlbGVjdGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IGNvZXJjZWRWYWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKGNvZXJjZWRWYWx1ZSAhPT0gdGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkID0gY29lcmNlZFZhbHVlO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaFNlbGVjdGlvbkNoYW5nZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBUaGUgdmFsdWUgb2YgdGhlIHRhZy4gRGVmYXVsdHMgdG8gdGhlIGNvbnRlbnQgaW5zaWRlIGA8bWMtdGFnPmAgdGFncy4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB0aGlzLl92YWx1ZVxuICAgICAgICAgICAgOiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC50ZXh0Q29udGVudDtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3ZhbHVlOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgdGFnIGlzIHNlbGVjdGFibGUuIFdoZW4gYSB0YWcgaXMgbm90IHNlbGVjdGFibGUsXG4gICAgICogY2hhbmdlcyB0byBpdHMgc2VsZWN0ZWQgc3RhdGUgYXJlIGFsd2F5cyBpZ25vcmVkLiBCeSBkZWZhdWx0IGEgdGFnIGlzXG4gICAgICogc2VsZWN0YWJsZSwgYW5kIGl0IGJlY29tZXMgbm9uLXNlbGVjdGFibGUgaWYgaXRzIHBhcmVudCB0YWcgbGlzdCBpc1xuICAgICAqIG5vdCBzZWxlY3RhYmxlLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNlbGVjdGFibGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RhYmxlICYmIHRoaXMudGFnTGlzdFNlbGVjdGFibGU7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGFibGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0YWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2VsZWN0YWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRoZSB0YWcgZGlzcGxheXMgdGhlIHJlbW92ZSBzdHlsaW5nIGFuZCBlbWl0cyAocmVtb3ZlZCkgZXZlbnRzLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHJlbW92YWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbW92YWJsZTtcbiAgICB9XG5cbiAgICBzZXQgcmVtb3ZhYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlbW92YWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVtb3ZhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGdldCB0YWJpbmRleCgpOiBhbnkge1xuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0YWJsZSkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkID8gbnVsbCA6IC0xO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHVibGljIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmVcbiAgICApIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG5cbiAgICAgICAgdGhpcy5hZGRIb3N0Q2xhc3NOYW1lKCk7XG5cbiAgICAgICAgdGhpcy5uYXRpdmVFbGVtZW50ID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzc01vZGlmaWNhdG9yRm9ySWNvbnMoKTtcbiAgICB9XG5cbiAgICBhZGRDbGFzc01vZGlmaWNhdG9yRm9ySWNvbnMoKSB7XG4gICAgICAgIGNvbnN0IGljb25zID0gdGhpcy5jb250ZW50Q2hpbGRyZW4ubWFwKChpdGVtKSA9PiBpdGVtLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChpY29ucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGljb25FbGVtZW50ID0gaWNvbnNbMF07XG5cbiAgICAgICAgICAgIGlmICghaWNvbkVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZyAmJiAhaWNvbkVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKGljb25FbGVtZW50Lm5leHRTaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21jLWljb25fbGVmdCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWMtbGVmdC1pY29uJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGljb25FbGVtZW50LnByZXZpb3VzU2libGluZykge1xuICAgICAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYy1pY29uX3JpZ2h0Jyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYy1yaWdodC1pY29uJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGljb25zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0SWNvbkVsZW1lbnQgPSBpY29uc1swXTtcbiAgICAgICAgICAgIGNvbnN0IHNlY29uZEljb25FbGVtZW50ID0gaWNvbnNbMV07XG5cbiAgICAgICAgICAgIGZpcnN0SWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWMtaWNvbl9sZWZ0Jyk7XG4gICAgICAgICAgICBzZWNvbmRJY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYy1pY29uX3JpZ2h0Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRIb3N0Q2xhc3NOYW1lKCkge1xuICAgICAgICAvLyBBZGQgY2xhc3MgZm9yIHRoZSBkaWZmZXJlbnQgdGFnc1xuICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgVEFHX0FUVFJJQlVURV9OQU1FUykge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyKSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gYXR0clxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY2xhc3NMaXN0LmFkZChhdHRyKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3QuYWRkKCdtYy1zdGFuZGFyZC10YWcnKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQuZW1pdCh7IHRhZzogdGhpcyB9KTtcbiAgICB9XG5cbiAgICBzZWxlY3QoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc2VsZWN0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoU2VsZWN0aW9uQ2hhbmdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RWaWFJbnRlcmFjdGlvbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaFNlbGVjdGlvbkNoYW5nZSh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZVNlbGVjdGVkKGlzVXNlcklucHV0OiBib29sZWFuID0gZmFsc2UpOiBib29sZWFuIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSAhdGhpcy5zZWxlY3RlZDtcbiAgICAgICAgdGhpcy5kaXNwYXRjaFNlbGVjdGlvbkNoYW5nZShpc1VzZXJJbnB1dCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgLyoqIEFsbG93cyBmb3IgcHJvZ3JhbW1hdGljIGZvY3VzaW5nIG9mIHRoZSB0YWcuICovXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RhYmxlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmICghdGhpcy5oYXNGb2N1cykge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgICAgICAgdGhpcy5vbkZvY3VzLm5leHQoeyB0YWc6IHRoaXMgfSk7XG5cbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFzRm9jdXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsbG93cyBmb3IgcHJvZ3JhbW1hdGljIHJlbW92YWwgb2YgdGhlIHRhZy4gQ2FsbGVkIGJ5IHRoZSBNY1RhZ0xpc3Qgd2hlbiB0aGUgREVMRVRFIG9yXG4gICAgICogQkFDS1NQQUNFIGtleXMgYXJlIHByZXNzZWQuXG4gICAgICpcbiAgICAgKiBJbmZvcm1zIGFueSBsaXN0ZW5lcnMgb2YgdGhlIHJlbW92YWwgcmVxdWVzdC4gRG9lcyBub3QgcmVtb3ZlIHRoZSB0YWcgZnJvbSB0aGUgRE9NLlxuICAgICAqL1xuICAgIHJlbW92ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucmVtb3ZhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZWQuZW1pdCh7IHRhZzogdGhpcyB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSBERUxFVEU6XG4gICAgICAgICAgICBjYXNlIEJBQ0tTUEFDRTpcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBhcmUgcmVtb3ZhYmxlLCByZW1vdmUgdGhlIGZvY3VzZWQgdGFnXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAvLyBBbHdheXMgcHJldmVudCBzbyBwYWdlIG5hdmlnYXRpb24gZG9lcyBub3Qgb2NjdXJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTUEFDRTpcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBhcmUgc2VsZWN0YWJsZSwgdG9nZ2xlIHRoZSBmb2N1c2VkIHRhZ1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGVTZWxlY3RlZCh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBBbHdheXMgcHJldmVudCBzcGFjZSBmcm9tIHNjcm9sbGluZyB0aGUgcGFnZSBzaW5jZSB0aGUgbGlzdCBoYXMgZm9jdXNcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJsdXIoKTogdm9pZCB7XG4gICAgICAgIC8vIFdoZW4gYW5pbWF0aW9ucyBhcmUgZW5hYmxlZCwgQW5ndWxhciBtYXkgZW5kIHVwIHJlbW92aW5nIHRoZSB0YWcgZnJvbSB0aGUgRE9NIGEgbGl0dGxlXG4gICAgICAgIC8vIGVhcmxpZXIgdGhhbiB1c3VhbCwgY2F1c2luZyBpdCB0byBiZSBibHVycmVkIGFuZCB0aHJvd2luZyBvZmYgdGhlIGxvZ2ljIGluIHRoZSB0YWcgbGlzdFxuICAgICAgICAvLyB0aGF0IG1vdmVzIGZvY3VzIG5vdCB0aGUgbmV4dCBpdGVtLiBUbyB3b3JrIGFyb3VuZCB0aGUgaXNzdWUsIHdlIGRlZmVyIG1hcmtpbmcgdGhlIHRhZ1xuICAgICAgICAvLyBhcyBub3QgZm9jdXNlZCB1bnRpbCB0aGUgbmV4dCB0aW1lIHRoZSB6b25lIHN0YWJpbGl6ZXMuXG4gICAgICAgIHRoaXMuX25nWm9uZS5vblN0YWJsZVxuICAgICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzRm9jdXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkJsdXIubmV4dCh7IHRhZzogdGhpcyB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UoaXNVc2VySW5wdXQgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHtcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgICAgIGlzVXNlcklucHV0LFxuICAgICAgICAgICAgc2VsZWN0ZWQ6IHRoaXMuX3NlbGVjdGVkXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vKipcbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICBgPG1jLXRhZz5cbiAqICAgICAgIDxtYy1pY29uIG1jVGFnUmVtb3ZlPmNhbmNlbDwvbWMtaWNvbj5cbiAqICAgICA8L21jLXRhZz5gXG4gKlxuICogWW91ICptYXkqIHVzZSBhIGN1c3RvbSBpY29uLCBidXQgeW91IG1heSBuZWVkIHRvIG92ZXJyaWRlIHRoZSBgbWMtdGFnLXJlbW92ZWAgcG9zaXRpb25pbmdcbiAqIHN0eWxlcyB0byBwcm9wZXJseSBjZW50ZXIgdGhlIGljb24gd2l0aGluIHRoZSB0YWcuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jVGFnUmVtb3ZlXScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRhZy1yZW1vdmUgbWMtdGFnLXRyYWlsaW5nLWljb24nLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJy0xJyxcbiAgICAgICAgJyhjbGljayknOiAnaGFuZGxlQ2xpY2soJGV2ZW50KScsXG4gICAgICAgICcoZm9jdXMpJzogJ2ZvY3VzKCRldmVudCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1RhZ1JlbW92ZSB7XG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIHBhcmVudFRhZzogTWNUYWcpIHt9XG5cbiAgICBmb2N1cygkZXZlbnQpOiB2b2lkIHtcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIC8qKiBDYWxscyB0aGUgcGFyZW50IHRhZydzIHB1YmxpYyBgcmVtb3ZlKClgIG1ldGhvZCBpZiBhcHBsaWNhYmxlLiAqL1xuICAgIGhhbmRsZUNsaWNrKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wYXJlbnRUYWcucmVtb3ZhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudFRhZy5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gc3RvcCBldmVudCBwcm9wYWdhdGlvbiBiZWNhdXNlIG90aGVyd2lzZSB0aGUgZXZlbnQgd2lsbCBidWJibGUgdXAgdG8gdGhlXG4gICAgICAgIC8vIGZvcm0gZmllbGQgYW5kIGNhdXNlIHRoZSBgb25Db250YWluZXJDbGlja2AgbWV0aG9kIHRvIGJlIGludm9rZWQuIFRoaXMgbWV0aG9kIHdvdWxkIHRoZW5cbiAgICAgICAgLy8gcmVzZXQgdGhlIGZvY3VzZWQgdGFnIHRoYXQgaGFzIGJlZW4gZm9jdXNlZCBhZnRlciB0YWcgcmVtb3ZhbC4gVXN1YWxseSB0aGUgcGFyZW50XG4gICAgICAgIC8vIHRoZSBwYXJlbnQgY2xpY2sgbGlzdGVuZXIgb2YgdGhlIGBNY1RhZ2Agd291bGQgcHJldmVudCBwcm9wYWdhdGlvbiwgYnV0IGl0IGNhbiBoYXBwZW5cbiAgICAgICAgLy8gdGhhdCB0aGUgdGFnIGlzIGJlaW5nIHJlbW92ZWQgYmVmb3JlIHRoZSBldmVudCBidWJibGVzIHVwLlxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG59XG4iXX0=