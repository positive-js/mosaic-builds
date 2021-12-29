import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Input, NgZone, Output, QueryList, ViewEncapsulation } from '@angular/core';
import { BACKSPACE, DELETE, SPACE } from '@ptsecurity/cdk/keycodes';
import { mixinColor, mixinDisabled } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
/** Event object emitted by McTag when selected or deselected. */
export class McTagSelectionChange {
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
export class McTagAvatar {
}
/** @nocollapse */ /** @nocollapse */ McTagAvatar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTagAvatar, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McTagAvatar.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: McTagAvatar, selector: "mc-tag-avatar, [mcTagAvatar]", host: { classAttribute: "mc-tag-avatar" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTagAvatar, decorators: [{
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
export class McTagTrailingIcon {
}
/** @nocollapse */ /** @nocollapse */ McTagTrailingIcon.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTagTrailingIcon, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McTagTrailingIcon.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: McTagTrailingIcon, selector: "mc-tag-trailing-icon, [mcTagTrailingIcon]", host: { classAttribute: "mc-tag-trailing-icon" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTagTrailingIcon, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-tag-trailing-icon, [mcTagTrailingIcon]',
                    host: { class: 'mc-tag-trailing-icon' }
                }]
        }] });
export class McTagBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
export const McTagMixinBase = mixinColor(mixinDisabled(McTagBase));
export class McTag extends McTagMixinBase {
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
/** @nocollapse */ /** @nocollapse */ McTag.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTag, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McTag.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: McTag, selector: "mc-tag, [mc-tag], mc-basic-tag, [mc-basic-tag]", inputs: { color: "color", selected: "selected", value: "value", selectable: "selectable", removable: "removable", disabled: "disabled" }, outputs: { selectionChange: "selectionChange", destroyed: "destroyed", removed: "removed" }, host: { listeners: { "click": "handleClick($event)", "keydown": "handleKeydown($event)", "focus": "focus()", "blur": "blur()" }, properties: { "attr.tabindex": "tabindex", "attr.disabled": "disabled || null", "class.mc-selected": "selected", "class.mc-focused": "hasFocus", "class.mc-tag-with-avatar": "avatar", "class.mc-tag-with-icon": "contentChildren", "class.mc-tag-with-trailing-icon": "trailingIcon || removeIcon", "class.mc-disabled": "disabled" }, classAttribute: "mc-tag" }, queries: [{ propertyName: "avatar", first: true, predicate: McTagAvatar, descendants: true }, { propertyName: "trailingIcon", first: true, predicate: McTagTrailingIcon, descendants: true }, { propertyName: "removeIcon", first: true, predicate: i0.forwardRef(function () { return McTagRemove; }), descendants: true }, { propertyName: "contentChildren", predicate: McIcon }], exportAs: ["mcTag"], usesInheritance: true, ngImport: i0, template: "<div class=\"mc-tag__wrapper\">\n    <span class=\"mc-tag__text\"><ng-content></ng-content></span>\n    <ng-content select=\"[mc-icon]\"></ng-content>\n    <div class=\"mc-tag-overlay\"></div>\n</div>\n", styles: [".mc-tag{position:relative;display:inline-block;overflow:hidden;margin:2px;margin:var(--mc-tags-size-margin, 2px);height:24px;height:var(--mc-tags-size-height, 24px);border-width:1px;border-width:var(--mc-tags-size-border-width, 1px);border-style:solid;border-radius:4px;border-radius:var(--mc-tags-size-border-radius, 4px);cursor:default;outline:none;box-sizing:border-box}.mc-tag.mc-left-icon{padding-left:3px;padding-left:var(--mc-tags-size-icon-padding, 3px)}.mc-tag.mc-right-icon{padding-right:3px;padding-right:var(--mc-tags-size-icon-padding, 3px)}.mc-tag .mc-tag__text{margin-left:7px;margin-left:calc(var(--mc-tags-size-text-margin, 8px) - var(--mc-tags-size-border-width, 1px));text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mc-tag:not(.mc-tag-with-icon) .mc-tag__text{margin-right:7px;margin-right:calc(var(--mc-tags-size-text-margin, 8px) - var(--mc-tags-size-border-width, 1px))}.mc-tag__wrapper{display:flex;align-items:center;height:100%;flex:1 1 100%}.mc-tag__wrapper .mc-icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:24px;width:var(--mc-tags-size-height, 24px);height:24px;height:var(--mc-tags-size-height, 24px)}.mc-tag__wrapper .mc-icon_left{margin-right:3px;margin-right:var(--mc-tags-size-icon-padding, 3px)}.mc-tag__wrapper .mc-icon_right{margin-left:3px;margin-left:var(--mc-tags-size-icon-padding, 3px)}.mc-tag-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTag, decorators: [{
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
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"mc-tag__wrapper\">\n    <span class=\"mc-tag__text\"><ng-content></ng-content></span>\n    <ng-content select=\"[mc-icon]\"></ng-content>\n    <div class=\"mc-tag-overlay\"></div>\n</div>\n", styles: [".mc-tag{position:relative;display:inline-block;overflow:hidden;margin:2px;margin:var(--mc-tags-size-margin, 2px);height:24px;height:var(--mc-tags-size-height, 24px);border-width:1px;border-width:var(--mc-tags-size-border-width, 1px);border-style:solid;border-radius:4px;border-radius:var(--mc-tags-size-border-radius, 4px);cursor:default;outline:none;box-sizing:border-box}.mc-tag.mc-left-icon{padding-left:3px;padding-left:var(--mc-tags-size-icon-padding, 3px)}.mc-tag.mc-right-icon{padding-right:3px;padding-right:var(--mc-tags-size-icon-padding, 3px)}.mc-tag .mc-tag__text{margin-left:7px;margin-left:calc(var(--mc-tags-size-text-margin, 8px) - var(--mc-tags-size-border-width, 1px));text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mc-tag:not(.mc-tag-with-icon) .mc-tag__text{margin-right:7px;margin-right:calc(var(--mc-tags-size-text-margin, 8px) - var(--mc-tags-size-border-width, 1px))}.mc-tag__wrapper{display:flex;align-items:center;height:100%;flex:1 1 100%}.mc-tag__wrapper .mc-icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:24px;width:var(--mc-tags-size-height, 24px);height:24px;height:var(--mc-tags-size-height, 24px)}.mc-tag__wrapper .mc-icon_left{margin-right:3px;margin-right:var(--mc-tags-size-icon-padding, 3px)}.mc-tag__wrapper .mc-icon_right{margin-left:3px;margin-left:var(--mc-tags-size-icon-padding, 3px)}.mc-tag-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}\n"] }]
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
/** @nocollapse */ /** @nocollapse */ McTagRemove.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTagRemove, deps: [{ token: McTag }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McTagRemove.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: McTagRemove, selector: "[mcTagRemove]", host: { listeners: { "click": "handleClick($event)", "focus": "focus($event)" }, properties: { "attr.tabindex": "-1" }, classAttribute: "mc-tag-remove mc-tag-trailing-icon" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTagRemove, decorators: [{
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
        }], ctorParameters: function () { return [{ type: McTag }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy90YWdzL3RhZy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdGFncy90YWcucGFydGlhbC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUVOLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BFLE9BQU8sRUFLSCxVQUFVLEVBQ1YsYUFBYSxFQUNoQixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFRdEMsaUVBQWlFO0FBQ2pFLE1BQU0sT0FBTyxvQkFBb0I7SUFDN0IsWUFBbUIsTUFBYSxFQUFTLFFBQWlCLEVBQVMsY0FBYyxLQUFLO1FBQW5FLFdBQU0sR0FBTixNQUFNLENBQU87UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQVE7SUFBRyxDQUFDO0NBQzdGO0FBR0QsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRTdDOzs7R0FHRztBQUtILE1BQU0s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WUFFL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUMzQjtRQUVELHNGQUFzRjtRQUN0RiwyRkFBMkY7UUFDM0Ysb0ZBQW9GO1FBQ3BGLHdGQUF3RjtRQUN4Riw2REFBNkQ7UUFDN0QsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzVCLENBQUM7OzhJQXJCUSxXQUFXLGtCQUNhLEtBQUs7a0lBRDdCLFdBQVc7MkZBQVgsV0FBVztrQkFUdkIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsSUFBSSxFQUFFO3dCQUNGLEtBQUssRUFBRSxvQ0FBb0M7d0JBQzNDLGlCQUFpQixFQUFFLElBQUk7d0JBQ3ZCLFNBQVMsRUFBRSxxQkFBcUI7d0JBQ2hDLFNBQVMsRUFBRSxlQUFlO3FCQUM3QjtpQkFDSjswREFFb0MsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElGb2N1c2FibGVPcHRpb24gfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvYTExeSc7XG5pbXBvcnQgeyBCQUNLU1BBQ0UsIERFTEVURSwgU1BBQ0UgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgICBDYW5Db2xvcixcbiAgICBDYW5Db2xvckN0b3IsXG4gICAgQ2FuRGlzYWJsZSxcbiAgICBDYW5EaXNhYmxlQ3RvcixcbiAgICBtaXhpbkNvbG9yLFxuICAgIG1peGluRGlzYWJsZWRcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNJY29uIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2ljb24nO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgTWNUYWdFdmVudCB7XG4gICAgdGFnOiBNY1RhZztcbn1cblxuLyoqIEV2ZW50IG9iamVjdCBlbWl0dGVkIGJ5IE1jVGFnIHdoZW4gc2VsZWN0ZWQgb3IgZGVzZWxlY3RlZC4gKi9cbmV4cG9ydCBjbGFzcyBNY1RhZ1NlbGVjdGlvbkNoYW5nZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZTogTWNUYWcsIHB1YmxpYyBzZWxlY3RlZDogYm9vbGVhbiwgcHVibGljIGlzVXNlcklucHV0ID0gZmFsc2UpIHt9XG59XG5cblxuY29uc3QgVEFHX0FUVFJJQlVURV9OQU1FUyA9IFsnbWMtYmFzaWMtdGFnJ107XG5cbi8qKlxuICogRHVtbXkgZGlyZWN0aXZlIHRvIGFkZCBDU1MgY2xhc3MgdG8gdGFnIGF2YXRhci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy10YWctYXZhdGFyLCBbbWNUYWdBdmF0YXJdJyxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtdGFnLWF2YXRhcicgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1RhZ0F2YXRhciB7fVxuXG4vKipcbiAqIER1bW15IGRpcmVjdGl2ZSB0byBhZGQgQ1NTIGNsYXNzIHRvIHRhZyB0cmFpbGluZyBpY29uLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLXRhZy10cmFpbGluZy1pY29uLCBbbWNUYWdUcmFpbGluZ0ljb25dJyxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtdGFnLXRyYWlsaW5nLWljb24nIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUYWdUcmFpbGluZ0ljb24ge31cblxuZXhwb3J0IGNsYXNzIE1jVGFnQmFzZSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1RhZ01peGluQmFzZTogQ2FuQ29sb3JDdG9yICYgQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgTWNUYWdCYXNlID0gbWl4aW5Db2xvcihtaXhpbkRpc2FibGVkKE1jVGFnQmFzZSkpO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFnLCBbbWMtdGFnXSwgbWMtYmFzaWMtdGFnLCBbbWMtYmFzaWMtdGFnXScsXG4gICAgZXhwb3J0QXM6ICdtY1RhZycsXG4gICAgdGVtcGxhdGVVcmw6ICd0YWcucGFydGlhbC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90YWcuc2NzcyddLFxuICAgIGlucHV0czogWydjb2xvciddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy10YWcnLFxuXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiaW5kZXgnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuXG4gICAgICAgICdbY2xhc3MubWMtc2VsZWN0ZWRdJzogJ3NlbGVjdGVkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1mb2N1c2VkXSc6ICdoYXNGb2N1cycsXG4gICAgICAgICdbY2xhc3MubWMtdGFnLXdpdGgtYXZhdGFyXSc6ICdhdmF0YXInLFxuICAgICAgICAnW2NsYXNzLm1jLXRhZy13aXRoLWljb25dJzogJ2NvbnRlbnRDaGlsZHJlbicsXG4gICAgICAgICdbY2xhc3MubWMtdGFnLXdpdGgtdHJhaWxpbmctaWNvbl0nOiAndHJhaWxpbmdJY29uIHx8IHJlbW92ZUljb24nLFxuICAgICAgICAnW2NsYXNzLm1jLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG5cbiAgICAgICAgJyhjbGljayknOiAnaGFuZGxlQ2xpY2soJGV2ZW50KScsXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyhmb2N1cyknOiAnZm9jdXMoKScsXG4gICAgICAgICcoYmx1ciknOiAnYmx1cigpJ1xuICAgIH0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNY1RhZyBleHRlbmRzIE1jVGFnTWl4aW5CYXNlIGltcGxlbWVudHMgSUZvY3VzYWJsZU9wdGlvbiwgT25EZXN0cm95LCBDYW5Db2xvciwgQ2FuRGlzYWJsZSB7XG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIHRhZyBpcyBmb2N1c2VkLiAqL1xuICAgIHJlYWRvbmx5IG9uRm9jdXMgPSBuZXcgU3ViamVjdDxNY1RhZ0V2ZW50PigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIHRhZyBpcyBibHVyZWQuICovXG4gICAgcmVhZG9ubHkgb25CbHVyID0gbmV3IFN1YmplY3Q8TWNUYWdFdmVudD4oKTtcblxuICAgIG5hdGl2ZUVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRhZyBoYXMgZm9jdXMuICovXG4gICAgaGFzRm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSB0YWcgbGlzdCBpcyBzZWxlY3RhYmxlICovXG4gICAgdGFnTGlzdFNlbGVjdGFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY0ljb24pIGNvbnRlbnRDaGlsZHJlbjogUXVlcnlMaXN0PE1jSWNvbj47XG5cbiAgICAvKiogVGhlIHRhZyBhdmF0YXIgKi9cbiAgICBAQ29udGVudENoaWxkKE1jVGFnQXZhdGFyLCB7c3RhdGljOiBmYWxzZX0pIGF2YXRhcjogTWNUYWdBdmF0YXI7XG5cbiAgICAvKiogVGhlIHRhZydzIHRyYWlsaW5nIGljb24uICovXG4gICAgQENvbnRlbnRDaGlsZChNY1RhZ1RyYWlsaW5nSWNvbiwge3N0YXRpYzogZmFsc2V9KSB0cmFpbGluZ0ljb246IE1jVGFnVHJhaWxpbmdJY29uO1xuXG4gICAgLyoqIFRoZSB0YWcncyByZW1vdmUgdG9nZ2xlci4gKi9cbiAgICBAQ29udGVudENoaWxkKGZvcndhcmRSZWYoKCkgPT4gTWNUYWdSZW1vdmUpLCB7c3RhdGljOiBmYWxzZX0pIHJlbW92ZUljb246IE1jVGFnUmVtb3ZlO1xuXG4gICAgLyoqIEVtaXR0ZWQgd2hlbiB0aGUgdGFnIGlzIHNlbGVjdGVkIG9yIGRlc2VsZWN0ZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPE1jVGFnU2VsZWN0aW9uQ2hhbmdlPiA9XG4gICAgICAgIG5ldyBFdmVudEVtaXR0ZXI8TWNUYWdTZWxlY3Rpb25DaGFuZ2U+KCk7XG5cbiAgICAvKiogRW1pdHRlZCB3aGVuIHRoZSB0YWcgaXMgZGVzdHJveWVkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBkZXN0cm95ZWQ6IEV2ZW50RW1pdHRlcjxNY1RhZ0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TWNUYWdFdmVudD4oKTtcblxuICAgIC8qKiBFbWl0dGVkIHdoZW4gYSB0YWcgaXMgdG8gYmUgcmVtb3ZlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgcmVtb3ZlZDogRXZlbnRFbWl0dGVyPE1jVGFnRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNY1RhZ0V2ZW50PigpO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRhZyBpcyBzZWxlY3RlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBjb2VyY2VkVmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIGlmIChjb2VyY2VkVmFsdWUgIT09IHRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IGNvZXJjZWRWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3NlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogVGhlIHZhbHVlIG9mIHRoZSB0YWcuIERlZmF1bHRzIHRvIHRoZSBjb250ZW50IGluc2lkZSBgPG1jLXRhZz5gIHRhZ3MuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gdGhpcy5fdmFsdWVcbiAgICAgICAgICAgIDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF92YWx1ZTogYW55O1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBvciBub3QgdGhlIHRhZyBpcyBzZWxlY3RhYmxlLiBXaGVuIGEgdGFnIGlzIG5vdCBzZWxlY3RhYmxlLFxuICAgICAqIGNoYW5nZXMgdG8gaXRzIHNlbGVjdGVkIHN0YXRlIGFyZSBhbHdheXMgaWdub3JlZC4gQnkgZGVmYXVsdCBhIHRhZyBpc1xuICAgICAqIHNlbGVjdGFibGUsIGFuZCBpdCBiZWNvbWVzIG5vbi1zZWxlY3RhYmxlIGlmIGl0cyBwYXJlbnQgdGFnIGxpc3QgaXNcbiAgICAgKiBub3Qgc2VsZWN0YWJsZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RhYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0YWJsZSAmJiB0aGlzLnRhZ0xpc3RTZWxlY3RhYmxlO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RhYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGFibGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NlbGVjdGFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgdGFnIGRpc3BsYXlzIHRoZSByZW1vdmUgc3R5bGluZyBhbmQgZW1pdHMgKHJlbW92ZWQpIGV2ZW50cy5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCByZW1vdmFibGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZW1vdmFibGU7XG4gICAgfVxuXG4gICAgc2V0IHJlbW92YWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9yZW1vdmFibGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlbW92YWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBnZXQgdGFiaW5kZXgoKTogYW55IHtcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGFibGUpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCA/IG51bGwgOiAtMTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHB1YmxpYyBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuXG4gICAgICAgIHRoaXMuYWRkSG9zdENsYXNzTmFtZSgpO1xuXG4gICAgICAgIHRoaXMubmF0aXZlRWxlbWVudCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3NNb2RpZmljYXRvckZvckljb25zKCk7XG4gICAgfVxuXG4gICAgYWRkQ2xhc3NNb2RpZmljYXRvckZvckljb25zKCkge1xuICAgICAgICBjb25zdCBpY29ucyA9IHRoaXMuY29udGVudENoaWxkcmVuLm1hcCgoaXRlbSkgPT4gaXRlbS5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICBpZiAoaWNvbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBjb25zdCBpY29uRWxlbWVudCA9IGljb25zWzBdO1xuXG4gICAgICAgICAgICBpZiAoIWljb25FbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcgJiYgIWljb25FbGVtZW50Lm5leHRFbGVtZW50U2libGluZykge1xuICAgICAgICAgICAgICAgIGlmIChpY29uRWxlbWVudC5uZXh0U2libGluZykge1xuICAgICAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYy1pY29uX2xlZnQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21jLWxlZnQtaWNvbicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpY29uRWxlbWVudC5wcmV2aW91c1NpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWMtaWNvbl9yaWdodCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWMtcmlnaHQtaWNvbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpY29ucy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBjb25zdCBmaXJzdEljb25FbGVtZW50ID0gaWNvbnNbMF07XG4gICAgICAgICAgICBjb25zdCBzZWNvbmRJY29uRWxlbWVudCA9IGljb25zWzFdO1xuXG4gICAgICAgICAgICBmaXJzdEljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21jLWljb25fbGVmdCcpO1xuICAgICAgICAgICAgc2Vjb25kSWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWMtaWNvbl9yaWdodCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkSG9zdENsYXNzTmFtZSgpIHtcbiAgICAgICAgLy8gQWRkIGNsYXNzIGZvciB0aGUgZGlmZmVyZW50IHRhZ3NcbiAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIFRBR19BVFRSSUJVVEVfTkFNRVMpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUoYXR0cikgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IGF0dHJcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmNsYXNzTGlzdC5hZGQoYXR0cik7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY2xhc3NMaXN0LmFkZCgnbWMtc3RhbmRhcmQtdGFnJyk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkLmVtaXQoeyB0YWc6IHRoaXMgfSk7XG4gICAgfVxuXG4gICAgc2VsZWN0KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoU2VsZWN0aW9uQ2hhbmdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXNlbGVjdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaFNlbGVjdGlvbkNoYW5nZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVTZWxlY3RlZChpc1VzZXJJbnB1dDogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gIXRoaXMuc2VsZWN0ZWQ7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UoaXNVc2VySW5wdXQpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICAgIH1cblxuICAgIC8qKiBBbGxvd3MgZm9yIHByb2dyYW1tYXRpYyBmb2N1c2luZyBvZiB0aGUgdGFnLiAqL1xuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0YWJsZSkgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAoIXRoaXMuaGFzRm9jdXMpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgICAgIHRoaXMub25Gb2N1cy5uZXh0KHsgdGFnOiB0aGlzIH0pO1xuXG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhc0ZvY3VzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGxvd3MgZm9yIHByb2dyYW1tYXRpYyByZW1vdmFsIG9mIHRoZSB0YWcuIENhbGxlZCBieSB0aGUgTWNUYWdMaXN0IHdoZW4gdGhlIERFTEVURSBvclxuICAgICAqIEJBQ0tTUEFDRSBrZXlzIGFyZSBwcmVzc2VkLlxuICAgICAqXG4gICAgICogSW5mb3JtcyBhbnkgbGlzdGVuZXJzIG9mIHRoZSByZW1vdmFsIHJlcXVlc3QuIERvZXMgbm90IHJlbW92ZSB0aGUgdGFnIGZyb20gdGhlIERPTS5cbiAgICAgKi9cbiAgICByZW1vdmUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnJlbW92YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVkLmVtaXQoeyB0YWc6IHRoaXMgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgREVMRVRFOlxuICAgICAgICAgICAgY2FzZSBCQUNLU1BBQ0U6XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgYXJlIHJlbW92YWJsZSwgcmVtb3ZlIHRoZSBmb2N1c2VkIHRhZ1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgLy8gQWx3YXlzIHByZXZlbnQgc28gcGFnZSBuYXZpZ2F0aW9uIGRvZXMgbm90IG9jY3VyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgYXJlIHNlbGVjdGFibGUsIHRvZ2dsZSB0aGUgZm9jdXNlZCB0YWdcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlU2VsZWN0ZWQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQWx3YXlzIHByZXZlbnQgc3BhY2UgZnJvbSBzY3JvbGxpbmcgdGhlIHBhZ2Ugc2luY2UgdGhlIGxpc3QgaGFzIGZvY3VzXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBibHVyKCk6IHZvaWQge1xuICAgICAgICAvLyBXaGVuIGFuaW1hdGlvbnMgYXJlIGVuYWJsZWQsIEFuZ3VsYXIgbWF5IGVuZCB1cCByZW1vdmluZyB0aGUgdGFnIGZyb20gdGhlIERPTSBhIGxpdHRsZVxuICAgICAgICAvLyBlYXJsaWVyIHRoYW4gdXN1YWwsIGNhdXNpbmcgaXQgdG8gYmUgYmx1cnJlZCBhbmQgdGhyb3dpbmcgb2ZmIHRoZSBsb2dpYyBpbiB0aGUgdGFnIGxpc3RcbiAgICAgICAgLy8gdGhhdCBtb3ZlcyBmb2N1cyBub3QgdGhlIG5leHQgaXRlbS4gVG8gd29yayBhcm91bmQgdGhlIGlzc3VlLCB3ZSBkZWZlciBtYXJraW5nIHRoZSB0YWdcbiAgICAgICAgLy8gYXMgbm90IGZvY3VzZWQgdW50aWwgdGhlIG5leHQgdGltZSB0aGUgem9uZSBzdGFiaWxpemVzLlxuICAgICAgICB0aGlzLl9uZ1pvbmUub25TdGFibGVcbiAgICAgICAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0ZvY3VzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25CbHVyLm5leHQoeyB0YWc6IHRoaXMgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRpc3BhdGNoU2VsZWN0aW9uQ2hhbmdlKGlzVXNlcklucHV0ID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgICAgICBpc1VzZXJJbnB1dCxcbiAgICAgICAgICAgIHNlbGVjdGVkOiB0aGlzLl9zZWxlY3RlZFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLyoqXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgYDxtYy10YWc+XG4gKiAgICAgICA8bWMtaWNvbiBtY1RhZ1JlbW92ZT5jYW5jZWw8L21jLWljb24+XG4gKiAgICAgPC9tYy10YWc+YFxuICpcbiAqIFlvdSAqbWF5KiB1c2UgYSBjdXN0b20gaWNvbiwgYnV0IHlvdSBtYXkgbmVlZCB0byBvdmVycmlkZSB0aGUgYG1jLXRhZy1yZW1vdmVgIHBvc2l0aW9uaW5nXG4gKiBzdHlsZXMgdG8gcHJvcGVybHkgY2VudGVyIHRoZSBpY29uIHdpdGhpbiB0aGUgdGFnLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY1RhZ1JlbW92ZV0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy10YWctcmVtb3ZlIG1jLXRhZy10cmFpbGluZy1pY29uJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICctMScsXG4gICAgICAgICcoY2xpY2spJzogJ2hhbmRsZUNsaWNrKCRldmVudCknLFxuICAgICAgICAnKGZvY3VzKSc6ICdmb2N1cygkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUYWdSZW1vdmUge1xuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBwYXJlbnRUYWc6IE1jVGFnKSB7fVxuXG4gICAgZm9jdXMoJGV2ZW50KTogdm9pZCB7XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICAvKiogQ2FsbHMgdGhlIHBhcmVudCB0YWcncyBwdWJsaWMgYHJlbW92ZSgpYCBtZXRob2QgaWYgYXBwbGljYWJsZS4gKi9cbiAgICBoYW5kbGVDbGljayhldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucGFyZW50VGFnLnJlbW92YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnRUYWcuaGFzRm9jdXMgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLnBhcmVudFRhZy5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gc3RvcCBldmVudCBwcm9wYWdhdGlvbiBiZWNhdXNlIG90aGVyd2lzZSB0aGUgZXZlbnQgd2lsbCBidWJibGUgdXAgdG8gdGhlXG4gICAgICAgIC8vIGZvcm0gZmllbGQgYW5kIGNhdXNlIHRoZSBgb25Db250YWluZXJDbGlja2AgbWV0aG9kIHRvIGJlIGludm9rZWQuIFRoaXMgbWV0aG9kIHdvdWxkIHRoZW5cbiAgICAgICAgLy8gcmVzZXQgdGhlIGZvY3VzZWQgdGFnIHRoYXQgaGFzIGJlZW4gZm9jdXNlZCBhZnRlciB0YWcgcmVtb3ZhbC4gVXN1YWxseSB0aGUgcGFyZW50XG4gICAgICAgIC8vIHRoZSBwYXJlbnQgY2xpY2sgbGlzdGVuZXIgb2YgdGhlIGBNY1RhZ2Agd291bGQgcHJldmVudCBwcm9wYWdhdGlvbiwgYnV0IGl0IGNhbiBoYXBwZW5cbiAgICAgICAgLy8gdGhhdCB0aGUgdGFnIGlzIGJlaW5nIHJlbW92ZWQgYmVmb3JlIHRoZSBldmVudCBidWJibGVzIHVwLlxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwibWMtdGFnX193cmFwcGVyXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJtYy10YWdfX3RleHRcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9zcGFuPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlttYy1pY29uXVwiPjwvbmctY29udGVudD5cbiAgICA8ZGl2IGNsYXNzPVwibWMtdGFnLW92ZXJsYXlcIj48L2Rpdj5cbjwvZGl2PlxuIl19