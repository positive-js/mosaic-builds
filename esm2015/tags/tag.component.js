/**
 * @fileoverview added by tsickle
 * Generated from: tag.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                styles: [".mc-tag{position:relative;display:inline-block;overflow:hidden;margin:2px;height:24px;border-width:1px;border-style:solid;border-radius:4px;cursor:default;outline:0;box-sizing:border-box}.mc-tag.mc-left-icon{padding-left:3px}.mc-tag.mc-right-icon{padding-right:3px}.mc-tag__wrapper{display:flex;align-items:center;height:100%;flex:1 1 100%}.mc-tag__wrapper .mc-icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:24px;height:24px}.mc-tag__wrapper .mc-icon_left{margin-right:3px}.mc-tag__wrapper .mc-icon_right{margin-left:3px}.mc-tag-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}.mc-tag__text{margin-left:7px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy90YWdzLyIsInNvdXJjZXMiOlsidGFnLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUVOLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BFLE9BQU8sRUFLSCxVQUFVLEVBQ1YsYUFBYSxFQUNoQixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUl0QyxnQ0FFQzs7O0lBREcseUJBQVc7Ozs7O0FBSWYsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7O0lBQzdCLFlBQW1CLE1BQWEsRUFBUyxRQUFpQixFQUFTLGNBQWMsS0FBSztRQUFuRSxXQUFNLEdBQU4sTUFBTSxDQUFPO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFRO0lBQUcsQ0FBQztDQUM3Rjs7O0lBRGUsc0NBQW9COztJQUFFLHdDQUF3Qjs7SUFBRSwyQ0FBMEI7OztNQUlwRixtQkFBbUIsR0FBRyxDQUFDLGNBQWMsQ0FBQzs7Ozs7QUFVNUMsTUFBTSxPQUFP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QUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzNCO1FBRUQsc0ZBQXNGO1FBQ3RGLDJGQUEyRjtRQUMzRixvRkFBb0Y7UUFDcEYsd0ZBQXdGO1FBQ3hGLDZEQUE2RDtRQUM3RCxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDNUIsQ0FBQzs7O1lBNUJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxvQ0FBb0M7b0JBQzNDLGlCQUFpQixFQUFFLElBQUk7b0JBQ3ZCLFNBQVMsRUFBRSxxQkFBcUI7b0JBQ2hDLFNBQVMsRUFBRSxlQUFlO2lCQUM3QjthQUNKOzs7O1lBRW9DLEtBQUs7Ozs7Ozs7SUFBMUIsZ0NBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSUZvY3VzYWJsZU9wdGlvbiB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9hMTF5JztcbmltcG9ydCB7IEJBQ0tTUEFDRSwgREVMRVRFLCBTUEFDRSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICAgIENhbkNvbG9yLFxuICAgIENhbkNvbG9yQ3RvcixcbiAgICBDYW5EaXNhYmxlLFxuICAgIENhbkRpc2FibGVDdG9yLFxuICAgIG1peGluQ29sb3IsXG4gICAgbWl4aW5EaXNhYmxlZFxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0ljb24gfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvaWNvbic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBNY1RhZ0V2ZW50IHtcbiAgICB0YWc6IE1jVGFnO1xufVxuXG4vKiogRXZlbnQgb2JqZWN0IGVtaXR0ZWQgYnkgTWNUYWcgd2hlbiBzZWxlY3RlZCBvciBkZXNlbGVjdGVkLiAqL1xuZXhwb3J0IGNsYXNzIE1jVGFnU2VsZWN0aW9uQ2hhbmdlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlOiBNY1RhZywgcHVibGljIHNlbGVjdGVkOiBib29sZWFuLCBwdWJsaWMgaXNVc2VySW5wdXQgPSBmYWxzZSkge31cbn1cblxuXG5jb25zdCBUQUdfQVRUUklCVVRFX05BTUVTID0gWydtYy1iYXNpYy10YWcnXTtcblxuLyoqXG4gKiBEdW1teSBkaXJlY3RpdmUgdG8gYWRkIENTUyBjbGFzcyB0byB0YWcgYXZhdGFyLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLXRhZy1hdmF0YXIsIFttY1RhZ0F2YXRhcl0nLFxuICAgIGhvc3Q6IHsgY2xhc3M6ICdtYy10YWctYXZhdGFyJyB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVGFnQXZhdGFyIHt9XG5cbi8qKlxuICogRHVtbXkgZGlyZWN0aXZlIHRvIGFkZCBDU1MgY2xhc3MgdG8gdGFnIHRyYWlsaW5nIGljb24uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFnLXRyYWlsaW5nLWljb24sIFttY1RhZ1RyYWlsaW5nSWNvbl0nLFxuICAgIGhvc3Q6IHsgY2xhc3M6ICdtYy10YWctdHJhaWxpbmctaWNvbicgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1RhZ1RyYWlsaW5nSWNvbiB7fVxuXG5leHBvcnQgY2xhc3MgTWNUYWdCYXNlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jVGFnTWl4aW5CYXNlOiBDYW5Db2xvckN0b3IgJiBDYW5EaXNhYmxlQ3RvciAmIHR5cGVvZiBNY1RhZ0Jhc2UgPSBtaXhpbkNvbG9yKG1peGluRGlzYWJsZWQoTWNUYWdCYXNlKSk7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy10YWcsIFttYy10YWddLCBtYy1iYXNpYy10YWcsIFttYy1iYXNpYy10YWddJyxcbiAgICBleHBvcnRBczogJ21jVGFnJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3RhZy5wYXJ0aWFsLmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3RhZy5zY3NzJ10sXG4gICAgaW5wdXRzOiBbJ2NvbG9yJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRhZycsXG5cbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJpbmRleCcsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG5cbiAgICAgICAgJ1tjbGFzcy5tYy1zZWxlY3RlZF0nOiAnc2VsZWN0ZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWZvY3VzZWRdJzogJ2hhc0ZvY3VzJyxcbiAgICAgICAgJ1tjbGFzcy5tYy10YWctd2l0aC1hdmF0YXJdJzogJ2F2YXRhcicsXG4gICAgICAgICdbY2xhc3MubWMtdGFnLXdpdGgtdHJhaWxpbmctaWNvbl0nOiAndHJhaWxpbmdJY29uIHx8IHJlbW92ZUljb24nLFxuICAgICAgICAnW2NsYXNzLm1jLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG5cbiAgICAgICAgJyhjbGljayknOiAnaGFuZGxlQ2xpY2soJGV2ZW50KScsXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyhmb2N1cyknOiAnZm9jdXMoKScsXG4gICAgICAgICcoYmx1ciknOiAnYmx1cigpJ1xuICAgIH0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNY1RhZyBleHRlbmRzIE1jVGFnTWl4aW5CYXNlIGltcGxlbWVudHMgSUZvY3VzYWJsZU9wdGlvbiwgT25EZXN0cm95LCBDYW5Db2xvciwgQ2FuRGlzYWJsZSB7XG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIHRhZyBpcyBmb2N1c2VkLiAqL1xuICAgIHJlYWRvbmx5IG9uRm9jdXMgPSBuZXcgU3ViamVjdDxNY1RhZ0V2ZW50PigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIHRhZyBpcyBibHVyZWQuICovXG4gICAgcmVhZG9ubHkgb25CbHVyID0gbmV3IFN1YmplY3Q8TWNUYWdFdmVudD4oKTtcblxuICAgIG5hdGl2ZUVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRhZyBoYXMgZm9jdXMuICovXG4gICAgaGFzRm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSB0YWcgbGlzdCBpcyBzZWxlY3RhYmxlICovXG4gICAgdGFnTGlzdFNlbGVjdGFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY0ljb24pIGNvbnRlbnRDaGlsZHJlbjogUXVlcnlMaXN0PE1jSWNvbj47XG5cbiAgICAvKiogVGhlIHRhZyBhdmF0YXIgKi9cbiAgICBAQ29udGVudENoaWxkKE1jVGFnQXZhdGFyLCB7c3RhdGljOiBmYWxzZX0pIGF2YXRhcjogTWNUYWdBdmF0YXI7XG5cbiAgICAvKiogVGhlIHRhZydzIHRyYWlsaW5nIGljb24uICovXG4gICAgQENvbnRlbnRDaGlsZChNY1RhZ1RyYWlsaW5nSWNvbiwge3N0YXRpYzogZmFsc2V9KSB0cmFpbGluZ0ljb246IE1jVGFnVHJhaWxpbmdJY29uO1xuXG4gICAgLyoqIFRoZSB0YWcncyByZW1vdmUgdG9nZ2xlci4gKi9cbiAgICBAQ29udGVudENoaWxkKGZvcndhcmRSZWYoKCkgPT4gTWNUYWdSZW1vdmUpLCB7c3RhdGljOiBmYWxzZX0pIHJlbW92ZUljb246IE1jVGFnUmVtb3ZlO1xuXG4gICAgLyoqIEVtaXR0ZWQgd2hlbiB0aGUgdGFnIGlzIHNlbGVjdGVkIG9yIGRlc2VsZWN0ZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPE1jVGFnU2VsZWN0aW9uQ2hhbmdlPiA9XG4gICAgICAgIG5ldyBFdmVudEVtaXR0ZXI8TWNUYWdTZWxlY3Rpb25DaGFuZ2U+KCk7XG5cbiAgICAvKiogRW1pdHRlZCB3aGVuIHRoZSB0YWcgaXMgZGVzdHJveWVkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBkZXN0cm95ZWQ6IEV2ZW50RW1pdHRlcjxNY1RhZ0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TWNUYWdFdmVudD4oKTtcblxuICAgIC8qKiBFbWl0dGVkIHdoZW4gYSB0YWcgaXMgdG8gYmUgcmVtb3ZlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgcmVtb3ZlZDogRXZlbnRFbWl0dGVyPE1jVGFnRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNY1RhZ0V2ZW50PigpO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRhZyBpcyBzZWxlY3RlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBjb2VyY2VkVmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIGlmIChjb2VyY2VkVmFsdWUgIT09IHRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IGNvZXJjZWRWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3NlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogVGhlIHZhbHVlIG9mIHRoZSB0YWcuIERlZmF1bHRzIHRvIHRoZSBjb250ZW50IGluc2lkZSBgPG1jLXRhZz5gIHRhZ3MuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gdGhpcy5fdmFsdWVcbiAgICAgICAgICAgIDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF92YWx1ZTogYW55O1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBvciBub3QgdGhlIHRhZyBpcyBzZWxlY3RhYmxlLiBXaGVuIGEgdGFnIGlzIG5vdCBzZWxlY3RhYmxlLFxuICAgICAqIGNoYW5nZXMgdG8gaXRzIHNlbGVjdGVkIHN0YXRlIGFyZSBhbHdheXMgaWdub3JlZC4gQnkgZGVmYXVsdCBhIHRhZyBpc1xuICAgICAqIHNlbGVjdGFibGUsIGFuZCBpdCBiZWNvbWVzIG5vbi1zZWxlY3RhYmxlIGlmIGl0cyBwYXJlbnQgdGFnIGxpc3QgaXNcbiAgICAgKiBub3Qgc2VsZWN0YWJsZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RhYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0YWJsZSAmJiB0aGlzLnRhZ0xpc3RTZWxlY3RhYmxlO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RhYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGFibGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NlbGVjdGFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgdGFnIGRpc3BsYXlzIHRoZSByZW1vdmUgc3R5bGluZyBhbmQgZW1pdHMgKHJlbW92ZWQpIGV2ZW50cy5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCByZW1vdmFibGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZW1vdmFibGU7XG4gICAgfVxuXG4gICAgc2V0IHJlbW92YWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9yZW1vdmFibGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlbW92YWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBnZXQgdGFiaW5kZXgoKTogYW55IHtcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGFibGUpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCA/IG51bGwgOiAtMTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHB1YmxpYyBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuXG4gICAgICAgIHRoaXMuYWRkSG9zdENsYXNzTmFtZSgpO1xuXG4gICAgICAgIHRoaXMubmF0aXZlRWxlbWVudCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3NNb2RpZmljYXRvckZvckljb25zKCk7XG4gICAgfVxuXG4gICAgYWRkQ2xhc3NNb2RpZmljYXRvckZvckljb25zKCkge1xuICAgICAgICBjb25zdCBpY29ucyA9IHRoaXMuY29udGVudENoaWxkcmVuLm1hcCgoaXRlbSkgPT4gaXRlbS5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICBpZiAoaWNvbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBjb25zdCBpY29uRWxlbWVudCA9IGljb25zWzBdO1xuXG4gICAgICAgICAgICBpZiAoIWljb25FbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcgJiYgIWljb25FbGVtZW50Lm5leHRFbGVtZW50U2libGluZykge1xuICAgICAgICAgICAgICAgIGlmIChpY29uRWxlbWVudC5uZXh0U2libGluZykge1xuICAgICAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYy1pY29uX2xlZnQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21jLWxlZnQtaWNvbicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpY29uRWxlbWVudC5wcmV2aW91c1NpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWMtaWNvbl9yaWdodCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWMtcmlnaHQtaWNvbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpY29ucy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBjb25zdCBmaXJzdEljb25FbGVtZW50ID0gaWNvbnNbMF07XG4gICAgICAgICAgICBjb25zdCBzZWNvbmRJY29uRWxlbWVudCA9IGljb25zWzFdO1xuXG4gICAgICAgICAgICBmaXJzdEljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21jLWljb25fbGVmdCcpO1xuICAgICAgICAgICAgc2Vjb25kSWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWMtaWNvbl9yaWdodCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkSG9zdENsYXNzTmFtZSgpIHtcbiAgICAgICAgLy8gQWRkIGNsYXNzIGZvciB0aGUgZGlmZmVyZW50IHRhZ3NcbiAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIFRBR19BVFRSSUJVVEVfTkFNRVMpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUoYXR0cikgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IGF0dHJcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmNsYXNzTGlzdC5hZGQoYXR0cik7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY2xhc3NMaXN0LmFkZCgnbWMtc3RhbmRhcmQtdGFnJyk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkLmVtaXQoeyB0YWc6IHRoaXMgfSk7XG4gICAgfVxuXG4gICAgc2VsZWN0KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoU2VsZWN0aW9uQ2hhbmdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXNlbGVjdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaFNlbGVjdGlvbkNoYW5nZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVTZWxlY3RlZChpc1VzZXJJbnB1dDogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gIXRoaXMuc2VsZWN0ZWQ7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UoaXNVc2VySW5wdXQpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICAgIH1cblxuICAgIC8qKiBBbGxvd3MgZm9yIHByb2dyYW1tYXRpYyBmb2N1c2luZyBvZiB0aGUgdGFnLiAqL1xuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0YWJsZSkgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAoIXRoaXMuaGFzRm9jdXMpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgICAgIHRoaXMub25Gb2N1cy5uZXh0KHsgdGFnOiB0aGlzIH0pO1xuXG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhc0ZvY3VzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGxvd3MgZm9yIHByb2dyYW1tYXRpYyByZW1vdmFsIG9mIHRoZSB0YWcuIENhbGxlZCBieSB0aGUgTWNUYWdMaXN0IHdoZW4gdGhlIERFTEVURSBvclxuICAgICAqIEJBQ0tTUEFDRSBrZXlzIGFyZSBwcmVzc2VkLlxuICAgICAqXG4gICAgICogSW5mb3JtcyBhbnkgbGlzdGVuZXJzIG9mIHRoZSByZW1vdmFsIHJlcXVlc3QuIERvZXMgbm90IHJlbW92ZSB0aGUgdGFnIGZyb20gdGhlIERPTS5cbiAgICAgKi9cbiAgICByZW1vdmUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnJlbW92YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVkLmVtaXQoeyB0YWc6IHRoaXMgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgREVMRVRFOlxuICAgICAgICAgICAgY2FzZSBCQUNLU1BBQ0U6XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgYXJlIHJlbW92YWJsZSwgcmVtb3ZlIHRoZSBmb2N1c2VkIHRhZ1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgLy8gQWx3YXlzIHByZXZlbnQgc28gcGFnZSBuYXZpZ2F0aW9uIGRvZXMgbm90IG9jY3VyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgYXJlIHNlbGVjdGFibGUsIHRvZ2dsZSB0aGUgZm9jdXNlZCB0YWdcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlU2VsZWN0ZWQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQWx3YXlzIHByZXZlbnQgc3BhY2UgZnJvbSBzY3JvbGxpbmcgdGhlIHBhZ2Ugc2luY2UgdGhlIGxpc3QgaGFzIGZvY3VzXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBibHVyKCk6IHZvaWQge1xuICAgICAgICAvLyBXaGVuIGFuaW1hdGlvbnMgYXJlIGVuYWJsZWQsIEFuZ3VsYXIgbWF5IGVuZCB1cCByZW1vdmluZyB0aGUgdGFnIGZyb20gdGhlIERPTSBhIGxpdHRsZVxuICAgICAgICAvLyBlYXJsaWVyIHRoYW4gdXN1YWwsIGNhdXNpbmcgaXQgdG8gYmUgYmx1cnJlZCBhbmQgdGhyb3dpbmcgb2ZmIHRoZSBsb2dpYyBpbiB0aGUgdGFnIGxpc3RcbiAgICAgICAgLy8gdGhhdCBtb3ZlcyBmb2N1cyBub3QgdGhlIG5leHQgaXRlbS4gVG8gd29yayBhcm91bmQgdGhlIGlzc3VlLCB3ZSBkZWZlciBtYXJraW5nIHRoZSB0YWdcbiAgICAgICAgLy8gYXMgbm90IGZvY3VzZWQgdW50aWwgdGhlIG5leHQgdGltZSB0aGUgem9uZSBzdGFiaWxpemVzLlxuICAgICAgICB0aGlzLl9uZ1pvbmUub25TdGFibGVcbiAgICAgICAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0ZvY3VzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25CbHVyLm5leHQoeyB0YWc6IHRoaXMgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRpc3BhdGNoU2VsZWN0aW9uQ2hhbmdlKGlzVXNlcklucHV0ID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgICAgICBpc1VzZXJJbnB1dCxcbiAgICAgICAgICAgIHNlbGVjdGVkOiB0aGlzLl9zZWxlY3RlZFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLyoqXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgYDxtYy10YWc+XG4gKiAgICAgICA8bWMtaWNvbiBtY1RhZ1JlbW92ZT5jYW5jZWw8L21jLWljb24+XG4gKiAgICAgPC9tYy10YWc+YFxuICpcbiAqIFlvdSAqbWF5KiB1c2UgYSBjdXN0b20gaWNvbiwgYnV0IHlvdSBtYXkgbmVlZCB0byBvdmVycmlkZSB0aGUgYG1jLXRhZy1yZW1vdmVgIHBvc2l0aW9uaW5nXG4gKiBzdHlsZXMgdG8gcHJvcGVybHkgY2VudGVyIHRoZSBpY29uIHdpdGhpbiB0aGUgdGFnLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY1RhZ1JlbW92ZV0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy10YWctcmVtb3ZlIG1jLXRhZy10cmFpbGluZy1pY29uJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICctMScsXG4gICAgICAgICcoY2xpY2spJzogJ2hhbmRsZUNsaWNrKCRldmVudCknLFxuICAgICAgICAnKGZvY3VzKSc6ICdmb2N1cygkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUYWdSZW1vdmUge1xuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBwYXJlbnRUYWc6IE1jVGFnKSB7fVxuXG4gICAgZm9jdXMoJGV2ZW50KTogdm9pZCB7XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICAvKiogQ2FsbHMgdGhlIHBhcmVudCB0YWcncyBwdWJsaWMgYHJlbW92ZSgpYCBtZXRob2QgaWYgYXBwbGljYWJsZS4gKi9cbiAgICBoYW5kbGVDbGljayhldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucGFyZW50VGFnLnJlbW92YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnRUYWcucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBuZWVkIHRvIHN0b3AgZXZlbnQgcHJvcGFnYXRpb24gYmVjYXVzZSBvdGhlcndpc2UgdGhlIGV2ZW50IHdpbGwgYnViYmxlIHVwIHRvIHRoZVxuICAgICAgICAvLyBmb3JtIGZpZWxkIGFuZCBjYXVzZSB0aGUgYG9uQ29udGFpbmVyQ2xpY2tgIG1ldGhvZCB0byBiZSBpbnZva2VkLiBUaGlzIG1ldGhvZCB3b3VsZCB0aGVuXG4gICAgICAgIC8vIHJlc2V0IHRoZSBmb2N1c2VkIHRhZyB0aGF0IGhhcyBiZWVuIGZvY3VzZWQgYWZ0ZXIgdGFnIHJlbW92YWwuIFVzdWFsbHkgdGhlIHBhcmVudFxuICAgICAgICAvLyB0aGUgcGFyZW50IGNsaWNrIGxpc3RlbmVyIG9mIHRoZSBgTWNUYWdgIHdvdWxkIHByZXZlbnQgcHJvcGFnYXRpb24sIGJ1dCBpdCBjYW4gaGFwcGVuXG4gICAgICAgIC8vIHRoYXQgdGhlIHRhZyBpcyBiZWluZyByZW1vdmVkIGJlZm9yZSB0aGUgZXZlbnQgYnViYmxlcyB1cC5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxufVxuIl19