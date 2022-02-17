import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, NgZone, Output, QueryList, ViewEncapsulation } from '@angular/core';
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
export class McTagTrailingIcon {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy90YWdzL3RhZy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdGFncy90YWcucGFydGlhbC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFFTixNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRSxPQUFPLEVBS0gsVUFBVSxFQUNWLGFBQWEsRUFDaEIsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBUXRDLGlFQUFpRTtBQUNqRSxNQUFNLE9BQU8sb0JBQW9CO0lBQzdCLFlBQW1CLE1BQWEsRUFBUyxRQUFpQixFQUFTLGNBQWMsS0FBSztRQUFuRSxXQUFNLEdBQU4sTUFBTSxDQUFPO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFRO0lBQUcsQ0FBQztDQUM3RjtBQUdELE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUU3Qzs7O0dBR0c7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LGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJO3NKQWlCWixlQUFlO3NCQUF2QyxlQUFlO3VCQUFDLE1BQU07Z0JBR3FCLE1BQU07c0JBQWpELFlBQVk7dUJBQUMsV0FBVyxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQztnQkFHUSxZQUFZO3NCQUE3RCxZQUFZO3VCQUFDLGlCQUFpQixFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQztnQkFHYyxVQUFVO3NCQUF2RSxZQUFZO3VCQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7Z0JBR3pDLGVBQWU7c0JBQWpDLE1BQU07Z0JBSVksU0FBUztzQkFBM0IsTUFBTTtnQkFHWSxPQUFPO3NCQUF6QixNQUFNO2dCQUlILFFBQVE7c0JBRFgsS0FBSztnQkFrQkYsS0FBSztzQkFEUixLQUFLO2dCQW9CRixVQUFVO3NCQURiLEtBQUs7Z0JBZUYsU0FBUztzQkFEWixLQUFLO2dCQWtCRixRQUFRO3NCQURYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSUZvY3VzYWJsZU9wdGlvbiB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9hMTF5JztcbmltcG9ydCB7IEJBQ0tTUEFDRSwgREVMRVRFLCBTUEFDRSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICAgIENhbkNvbG9yLFxuICAgIENhbkNvbG9yQ3RvcixcbiAgICBDYW5EaXNhYmxlLFxuICAgIENhbkRpc2FibGVDdG9yLFxuICAgIG1peGluQ29sb3IsXG4gICAgbWl4aW5EaXNhYmxlZFxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0ljb24gfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvaWNvbic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBNY1RhZ0V2ZW50IHtcbiAgICB0YWc6IE1jVGFnO1xufVxuXG4vKiogRXZlbnQgb2JqZWN0IGVtaXR0ZWQgYnkgTWNUYWcgd2hlbiBzZWxlY3RlZCBvciBkZXNlbGVjdGVkLiAqL1xuZXhwb3J0IGNsYXNzIE1jVGFnU2VsZWN0aW9uQ2hhbmdlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlOiBNY1RhZywgcHVibGljIHNlbGVjdGVkOiBib29sZWFuLCBwdWJsaWMgaXNVc2VySW5wdXQgPSBmYWxzZSkge31cbn1cblxuXG5jb25zdCBUQUdfQVRUUklCVVRFX05BTUVTID0gWydtYy1iYXNpYy10YWcnXTtcblxuLyoqXG4gKiBEdW1teSBkaXJlY3RpdmUgdG8gYWRkIENTUyBjbGFzcyB0byB0YWcgYXZhdGFyLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLXRhZy1hdmF0YXIsIFttY1RhZ0F2YXRhcl0nLFxuICAgIGhvc3Q6IHsgY2xhc3M6ICdtYy10YWctYXZhdGFyJyB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVGFnQXZhdGFyIHt9XG5cbi8qKlxuICogRHVtbXkgZGlyZWN0aXZlIHRvIGFkZCBDU1MgY2xhc3MgdG8gdGFnIHRyYWlsaW5nIGljb24uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFnLXRyYWlsaW5nLWljb24sIFttY1RhZ1RyYWlsaW5nSWNvbl0nLFxuICAgIGhvc3Q6IHsgY2xhc3M6ICdtYy10YWctdHJhaWxpbmctaWNvbicgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1RhZ1RyYWlsaW5nSWNvbiB7fVxuXG4vKipcbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICBgPG1jLXRhZz5cbiAqICAgICAgIDxtYy1pY29uIG1jVGFnUmVtb3ZlPmNhbmNlbDwvbWMtaWNvbj5cbiAqICAgICA8L21jLXRhZz5gXG4gKlxuICogWW91ICptYXkqIHVzZSBhIGN1c3RvbSBpY29uLCBidXQgeW91IG1heSBuZWVkIHRvIG92ZXJyaWRlIHRoZSBgbWMtdGFnLXJlbW92ZWAgcG9zaXRpb25pbmdcbiAqIHN0eWxlcyB0byBwcm9wZXJseSBjZW50ZXIgdGhlIGljb24gd2l0aGluIHRoZSB0YWcuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jVGFnUmVtb3ZlXScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRhZy1yZW1vdmUgbWMtdGFnLXRyYWlsaW5nLWljb24nLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJy0xJyxcbiAgICAgICAgJyhjbGljayknOiAnaGFuZGxlQ2xpY2soJGV2ZW50KScsXG4gICAgICAgICcoZm9jdXMpJzogJ2ZvY3VzKCRldmVudCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1RhZ1JlbW92ZSB7XG4gICAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE1jVGFnKSkgcHJvdGVjdGVkIHBhcmVudFRhZzogTWNUYWcpIHt9XG5cbiAgICBmb2N1cygkZXZlbnQpOiB2b2lkIHtcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIC8qKiBDYWxscyB0aGUgcGFyZW50IHRhZydzIHB1YmxpYyBgcmVtb3ZlKClgIG1ldGhvZCBpZiBhcHBsaWNhYmxlLiAqL1xuICAgIGhhbmRsZUNsaWNrKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wYXJlbnRUYWcucmVtb3ZhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudFRhZy5oYXNGb2N1cyA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMucGFyZW50VGFnLnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgbmVlZCB0byBzdG9wIGV2ZW50IHByb3BhZ2F0aW9uIGJlY2F1c2Ugb3RoZXJ3aXNlIHRoZSBldmVudCB3aWxsIGJ1YmJsZSB1cCB0byB0aGVcbiAgICAgICAgLy8gZm9ybSBmaWVsZCBhbmQgY2F1c2UgdGhlIGBvbkNvbnRhaW5lckNsaWNrYCBtZXRob2QgdG8gYmUgaW52b2tlZC4gVGhpcyBtZXRob2Qgd291bGQgdGhlblxuICAgICAgICAvLyByZXNldCB0aGUgZm9jdXNlZCB0YWcgdGhhdCBoYXMgYmVlbiBmb2N1c2VkIGFmdGVyIHRhZyByZW1vdmFsLiBVc3VhbGx5IHRoZSBwYXJlbnRcbiAgICAgICAgLy8gdGhlIHBhcmVudCBjbGljayBsaXN0ZW5lciBvZiB0aGUgYE1jVGFnYCB3b3VsZCBwcmV2ZW50IHByb3BhZ2F0aW9uLCBidXQgaXQgY2FuIGhhcHBlblxuICAgICAgICAvLyB0aGF0IHRoZSB0YWcgaXMgYmVpbmcgcmVtb3ZlZCBiZWZvcmUgdGhlIGV2ZW50IGJ1YmJsZXMgdXAuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1jVGFnQmFzZSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1RhZ01peGluQmFzZTogQ2FuQ29sb3JDdG9yICYgQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgTWNUYWdCYXNlID0gbWl4aW5Db2xvcihtaXhpbkRpc2FibGVkKE1jVGFnQmFzZSkpO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFnLCBbbWMtdGFnXSwgbWMtYmFzaWMtdGFnLCBbbWMtYmFzaWMtdGFnXScsXG4gICAgZXhwb3J0QXM6ICdtY1RhZycsXG4gICAgdGVtcGxhdGVVcmw6ICd0YWcucGFydGlhbC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90YWcuc2NzcyddLFxuICAgIGlucHV0czogWydjb2xvciddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy10YWcnLFxuXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiaW5kZXgnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuXG4gICAgICAgICdbY2xhc3MubWMtc2VsZWN0ZWRdJzogJ3NlbGVjdGVkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1mb2N1c2VkXSc6ICdoYXNGb2N1cycsXG4gICAgICAgICdbY2xhc3MubWMtdGFnLXdpdGgtYXZhdGFyXSc6ICdhdmF0YXInLFxuICAgICAgICAnW2NsYXNzLm1jLXRhZy13aXRoLWljb25dJzogJ2NvbnRlbnRDaGlsZHJlbicsXG4gICAgICAgICdbY2xhc3MubWMtdGFnLXdpdGgtdHJhaWxpbmctaWNvbl0nOiAndHJhaWxpbmdJY29uIHx8IHJlbW92ZUljb24nLFxuICAgICAgICAnW2NsYXNzLm1jLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG5cbiAgICAgICAgJyhjbGljayknOiAnaGFuZGxlQ2xpY2soJGV2ZW50KScsXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyhmb2N1cyknOiAnZm9jdXMoKScsXG4gICAgICAgICcoYmx1ciknOiAnYmx1cigpJ1xuICAgIH0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNY1RhZyBleHRlbmRzIE1jVGFnTWl4aW5CYXNlIGltcGxlbWVudHMgSUZvY3VzYWJsZU9wdGlvbiwgT25EZXN0cm95LCBDYW5Db2xvciwgQ2FuRGlzYWJsZSB7XG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIHRhZyBpcyBmb2N1c2VkLiAqL1xuICAgIHJlYWRvbmx5IG9uRm9jdXMgPSBuZXcgU3ViamVjdDxNY1RhZ0V2ZW50PigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIHRhZyBpcyBibHVyZWQuICovXG4gICAgcmVhZG9ubHkgb25CbHVyID0gbmV3IFN1YmplY3Q8TWNUYWdFdmVudD4oKTtcblxuICAgIG5hdGl2ZUVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRhZyBoYXMgZm9jdXMuICovXG4gICAgaGFzRm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSB0YWcgbGlzdCBpcyBzZWxlY3RhYmxlICovXG4gICAgdGFnTGlzdFNlbGVjdGFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY0ljb24pIGNvbnRlbnRDaGlsZHJlbjogUXVlcnlMaXN0PE1jSWNvbj47XG5cbiAgICAvKiogVGhlIHRhZyBhdmF0YXIgKi9cbiAgICBAQ29udGVudENoaWxkKE1jVGFnQXZhdGFyLCB7c3RhdGljOiBmYWxzZX0pIGF2YXRhcjogTWNUYWdBdmF0YXI7XG5cbiAgICAvKiogVGhlIHRhZydzIHRyYWlsaW5nIGljb24uICovXG4gICAgQENvbnRlbnRDaGlsZChNY1RhZ1RyYWlsaW5nSWNvbiwge3N0YXRpYzogZmFsc2V9KSB0cmFpbGluZ0ljb246IE1jVGFnVHJhaWxpbmdJY29uO1xuXG4gICAgLyoqIFRoZSB0YWcncyByZW1vdmUgdG9nZ2xlci4gKi9cbiAgICBAQ29udGVudENoaWxkKGZvcndhcmRSZWYoKCkgPT4gTWNUYWdSZW1vdmUpLCB7c3RhdGljOiBmYWxzZX0pIHJlbW92ZUljb246IE1jVGFnUmVtb3ZlO1xuXG4gICAgLyoqIEVtaXR0ZWQgd2hlbiB0aGUgdGFnIGlzIHNlbGVjdGVkIG9yIGRlc2VsZWN0ZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPE1jVGFnU2VsZWN0aW9uQ2hhbmdlPiA9XG4gICAgICAgIG5ldyBFdmVudEVtaXR0ZXI8TWNUYWdTZWxlY3Rpb25DaGFuZ2U+KCk7XG5cbiAgICAvKiogRW1pdHRlZCB3aGVuIHRoZSB0YWcgaXMgZGVzdHJveWVkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBkZXN0cm95ZWQ6IEV2ZW50RW1pdHRlcjxNY1RhZ0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TWNUYWdFdmVudD4oKTtcblxuICAgIC8qKiBFbWl0dGVkIHdoZW4gYSB0YWcgaXMgdG8gYmUgcmVtb3ZlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgcmVtb3ZlZDogRXZlbnRFbWl0dGVyPE1jVGFnRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNY1RhZ0V2ZW50PigpO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRhZyBpcyBzZWxlY3RlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBjb2VyY2VkVmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIGlmIChjb2VyY2VkVmFsdWUgIT09IHRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IGNvZXJjZWRWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3NlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogVGhlIHZhbHVlIG9mIHRoZSB0YWcuIERlZmF1bHRzIHRvIHRoZSBjb250ZW50IGluc2lkZSBgPG1jLXRhZz5gIHRhZ3MuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gdGhpcy5fdmFsdWVcbiAgICAgICAgICAgIDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF92YWx1ZTogYW55O1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBvciBub3QgdGhlIHRhZyBpcyBzZWxlY3RhYmxlLiBXaGVuIGEgdGFnIGlzIG5vdCBzZWxlY3RhYmxlLFxuICAgICAqIGNoYW5nZXMgdG8gaXRzIHNlbGVjdGVkIHN0YXRlIGFyZSBhbHdheXMgaWdub3JlZC4gQnkgZGVmYXVsdCBhIHRhZyBpc1xuICAgICAqIHNlbGVjdGFibGUsIGFuZCBpdCBiZWNvbWVzIG5vbi1zZWxlY3RhYmxlIGlmIGl0cyBwYXJlbnQgdGFnIGxpc3QgaXNcbiAgICAgKiBub3Qgc2VsZWN0YWJsZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RhYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0YWJsZSAmJiB0aGlzLnRhZ0xpc3RTZWxlY3RhYmxlO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RhYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGFibGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NlbGVjdGFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgdGFnIGRpc3BsYXlzIHRoZSByZW1vdmUgc3R5bGluZyBhbmQgZW1pdHMgKHJlbW92ZWQpIGV2ZW50cy5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCByZW1vdmFibGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZW1vdmFibGU7XG4gICAgfVxuXG4gICAgc2V0IHJlbW92YWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9yZW1vdmFibGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlbW92YWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBnZXQgdGFiaW5kZXgoKTogYW55IHtcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGFibGUpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCA/IG51bGwgOiAtMTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHB1YmxpYyBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuXG4gICAgICAgIHRoaXMuYWRkSG9zdENsYXNzTmFtZSgpO1xuXG4gICAgICAgIHRoaXMubmF0aXZlRWxlbWVudCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3NNb2RpZmljYXRvckZvckljb25zKCk7XG4gICAgfVxuXG4gICAgYWRkQ2xhc3NNb2RpZmljYXRvckZvckljb25zKCkge1xuICAgICAgICBjb25zdCBpY29ucyA9IHRoaXMuY29udGVudENoaWxkcmVuLm1hcCgoaXRlbSkgPT4gaXRlbS5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICBpZiAoaWNvbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBjb25zdCBpY29uRWxlbWVudCA9IGljb25zWzBdO1xuXG4gICAgICAgICAgICBpZiAoIWljb25FbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcgJiYgIWljb25FbGVtZW50Lm5leHRFbGVtZW50U2libGluZykge1xuICAgICAgICAgICAgICAgIGlmIChpY29uRWxlbWVudC5uZXh0U2libGluZykge1xuICAgICAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYy1pY29uX2xlZnQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21jLWxlZnQtaWNvbicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpY29uRWxlbWVudC5wcmV2aW91c1NpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWMtaWNvbl9yaWdodCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWMtcmlnaHQtaWNvbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpY29ucy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBjb25zdCBmaXJzdEljb25FbGVtZW50ID0gaWNvbnNbMF07XG4gICAgICAgICAgICBjb25zdCBzZWNvbmRJY29uRWxlbWVudCA9IGljb25zWzFdO1xuXG4gICAgICAgICAgICBmaXJzdEljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21jLWljb25fbGVmdCcpO1xuICAgICAgICAgICAgc2Vjb25kSWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWMtaWNvbl9yaWdodCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkSG9zdENsYXNzTmFtZSgpIHtcbiAgICAgICAgLy8gQWRkIGNsYXNzIGZvciB0aGUgZGlmZmVyZW50IHRhZ3NcbiAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIFRBR19BVFRSSUJVVEVfTkFNRVMpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUoYXR0cikgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IGF0dHJcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmNsYXNzTGlzdC5hZGQoYXR0cik7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY2xhc3NMaXN0LmFkZCgnbWMtc3RhbmRhcmQtdGFnJyk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkLmVtaXQoeyB0YWc6IHRoaXMgfSk7XG4gICAgfVxuXG4gICAgc2VsZWN0KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoU2VsZWN0aW9uQ2hhbmdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXNlbGVjdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaFNlbGVjdGlvbkNoYW5nZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVTZWxlY3RlZChpc1VzZXJJbnB1dDogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gIXRoaXMuc2VsZWN0ZWQ7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UoaXNVc2VySW5wdXQpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICAgIH1cblxuICAgIC8qKiBBbGxvd3MgZm9yIHByb2dyYW1tYXRpYyBmb2N1c2luZyBvZiB0aGUgdGFnLiAqL1xuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0YWJsZSkgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAoIXRoaXMuaGFzRm9jdXMpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgICAgIHRoaXMub25Gb2N1cy5uZXh0KHsgdGFnOiB0aGlzIH0pO1xuXG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhc0ZvY3VzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGxvd3MgZm9yIHByb2dyYW1tYXRpYyByZW1vdmFsIG9mIHRoZSB0YWcuIENhbGxlZCBieSB0aGUgTWNUYWdMaXN0IHdoZW4gdGhlIERFTEVURSBvclxuICAgICAqIEJBQ0tTUEFDRSBrZXlzIGFyZSBwcmVzc2VkLlxuICAgICAqXG4gICAgICogSW5mb3JtcyBhbnkgbGlzdGVuZXJzIG9mIHRoZSByZW1vdmFsIHJlcXVlc3QuIERvZXMgbm90IHJlbW92ZSB0aGUgdGFnIGZyb20gdGhlIERPTS5cbiAgICAgKi9cbiAgICByZW1vdmUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnJlbW92YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVkLmVtaXQoeyB0YWc6IHRoaXMgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgREVMRVRFOlxuICAgICAgICAgICAgY2FzZSBCQUNLU1BBQ0U6XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgYXJlIHJlbW92YWJsZSwgcmVtb3ZlIHRoZSBmb2N1c2VkIHRhZ1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgLy8gQWx3YXlzIHByZXZlbnQgc28gcGFnZSBuYXZpZ2F0aW9uIGRvZXMgbm90IG9jY3VyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgYXJlIHNlbGVjdGFibGUsIHRvZ2dsZSB0aGUgZm9jdXNlZCB0YWdcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlU2VsZWN0ZWQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQWx3YXlzIHByZXZlbnQgc3BhY2UgZnJvbSBzY3JvbGxpbmcgdGhlIHBhZ2Ugc2luY2UgdGhlIGxpc3QgaGFzIGZvY3VzXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBibHVyKCk6IHZvaWQge1xuICAgICAgICAvLyBXaGVuIGFuaW1hdGlvbnMgYXJlIGVuYWJsZWQsIEFuZ3VsYXIgbWF5IGVuZCB1cCByZW1vdmluZyB0aGUgdGFnIGZyb20gdGhlIERPTSBhIGxpdHRsZVxuICAgICAgICAvLyBlYXJsaWVyIHRoYW4gdXN1YWwsIGNhdXNpbmcgaXQgdG8gYmUgYmx1cnJlZCBhbmQgdGhyb3dpbmcgb2ZmIHRoZSBsb2dpYyBpbiB0aGUgdGFnIGxpc3RcbiAgICAgICAgLy8gdGhhdCBtb3ZlcyBmb2N1cyBub3QgdGhlIG5leHQgaXRlbS4gVG8gd29yayBhcm91bmQgdGhlIGlzc3VlLCB3ZSBkZWZlciBtYXJraW5nIHRoZSB0YWdcbiAgICAgICAgLy8gYXMgbm90IGZvY3VzZWQgdW50aWwgdGhlIG5leHQgdGltZSB0aGUgem9uZSBzdGFiaWxpemVzLlxuICAgICAgICB0aGlzLl9uZ1pvbmUub25TdGFibGVcbiAgICAgICAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0ZvY3VzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25CbHVyLm5leHQoeyB0YWc6IHRoaXMgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRpc3BhdGNoU2VsZWN0aW9uQ2hhbmdlKGlzVXNlcklucHV0ID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgICAgICBpc1VzZXJJbnB1dCxcbiAgICAgICAgICAgIHNlbGVjdGVkOiB0aGlzLl9zZWxlY3RlZFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwibWMtdGFnX193cmFwcGVyXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJtYy10YWdfX3RleHRcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9zcGFuPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlttYy1pY29uXVwiPjwvbmctY29udGVudD5cbiAgICA8ZGl2IGNsYXNzPVwibWMtdGFnLW92ZXJsYXlcIj48L2Rpdj5cbjwvZGl2PlxuIl19