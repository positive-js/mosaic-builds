/**
 * @fileoverview added by tsickle
 * Generated from: option/option.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, InjectionToken, Input, Optional, Output, ViewEncapsulation } from '@angular/core';
import { ENTER, SPACE } from '@ptsecurity/cdk/keycodes';
import { Subject } from 'rxjs';
import { McOptgroup } from './optgroup';
/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 * @type {?}
 */
let uniqueIdCounter = 0;
/**
 * Event object emitted by McOption when selected or deselected.
 */
export class McOptionSelectionChange {
    /**
     * @param {?} source
     * @param {?=} isUserInput
     */
    constructor(source, isUserInput = false) {
        this.source = source;
        this.isUserInput = isUserInput;
    }
}
if (false) {
    /** @type {?} */
    McOptionSelectionChange.prototype.source;
    /** @type {?} */
    McOptionSelectionChange.prototype.isUserInput;
}
/**
 * Describes a parent component that manages a list of options.
 * Contains properties that the options can inherit.
 * \@docs-private
 * @record
 */
export function McOptionParentComponent() { }
if (false) {
    /** @type {?|undefined} */
    McOptionParentComponent.prototype.multiple;
}
/**
 * Injection token used to provide the parent component to options.
 * @type {?}
 */
export const MC_OPTION_PARENT_COMPONENT = new InjectionToken('MC_OPTION_PARENT_COMPONENT');
/**
 * Single option inside of a `<mc-select>` element.
 */
export class McOption {
    /**
     * @param {?} element
     * @param {?} changeDetectorRef
     * @param {?} parent
     * @param {?} group
     */
    constructor(element, changeDetectorRef, parent, group) {
        this.element = element;
        this.changeDetectorRef = changeDetectorRef;
        this.parent = parent;
        this.group = group;
        /**
         * Event emitted when the option is selected or deselected.
         */
        // tslint:disable-next-line:no-output-on-prefix
        this.onSelectionChange = new EventEmitter();
        /**
         * Emits when the state of the option changes and any parents have to be notified.
         */
        this.stateChanges = new Subject();
        this._id = `mc-option-${uniqueIdCounter++}`;
        this._selected = false;
        this._disabled = false;
        this._active = false;
        this.mostRecentViewValue = '';
    }
    /**
     * @return {?}
     */
    get showCheckbox() {
        return this._showCheckbox === undefined ? this.multiple : this._showCheckbox;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showCheckbox(value) {
        this._showCheckbox = coerceBooleanProperty(value);
    }
    /**
     * The displayed value of the option. It is necessary to show the selected option in the
     * select's trigger.
     * @return {?}
     */
    get viewValue() {
        // TODO: Add input property alternative for node envs.
        return (this.getHostElement().textContent || '').trim();
    }
    /**
     * Whether the wrapping component is in multiple selection mode.
     * @return {?}
     */
    get multiple() {
        return this.parent && this.parent.multiple;
    }
    /**
     * @return {?}
     */
    get id() {
        return this._id;
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return (this.group && this.group.disabled) || this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * Whether or not the option is currently active and ready to be selected.
     * An active option displays styles as if it is focused, but the
     * focus is actually retained somewhere else. This comes in handy
     * for components like autocomplete where focus must remain on the input.
     * @return {?}
     */
    get active() {
        return this._active;
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        // Since parent components could be using the option's label to display the selected values
        // (e.g. `mc-select`) and they don't have a way of knowing if the option's label has changed
        // we have to check for changes in the DOM ourselves and dispatch an event. These checks are
        // relatively cheap, however we still limit them only to selected options in order to avoid
        // hitting the DOM too often.
        if (this._selected) {
            /** @type {?} */
            const viewValue = this.viewValue;
            if (viewValue !== this.mostRecentViewValue) {
                this.mostRecentViewValue = viewValue;
                this.stateChanges.next();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stateChanges.complete();
    }
    /**
     * @return {?}
     */
    getHeight() {
        // tslint:disable-next-line:naming-convention
        /** @type {?} */
        const DOMRect = this.element.nativeElement.getClientRects()[0];
        return DOMRect ? DOMRect.height : 0;
    }
    /**
     * @return {?}
     */
    select() {
        if (!this._selected) {
            this._selected = true;
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent();
        }
    }
    /**
     * @return {?}
     */
    deselect() {
        if (this._selected) {
            this._selected = false;
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent();
        }
    }
    /**
     * @return {?}
     */
    focus() {
        /** @type {?} */
        const element = this.getHostElement();
        if (typeof element.focus === 'function') {
            element.focus();
        }
    }
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    setActiveStyles() {
        if (!this._active) {
            this._active = true;
            this.changeDetectorRef.markForCheck();
        }
    }
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    setInactiveStyles() {
        if (this._active) {
            this._active = false;
            this.changeDetectorRef.markForCheck();
        }
    }
    /**
     * Gets the label to be used when determining whether the option should be focused.
     * @return {?}
     */
    getLabel() {
        return this.viewValue;
    }
    /**
     * Ensures the option is selected when activated from the keyboard.
     * @param {?} event
     * @return {?}
     */
    handleKeydown(event) {
        // tslint:disable-next-line
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this.selectViaInteraction();
            // Prevent the page from scrolling down and form submits.
            event.preventDefault();
        }
    }
    /**
     * `Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.`
     * @return {?}
     */
    selectViaInteraction() {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent(true);
        }
    }
    /**
     * @return {?}
     */
    getTabIndex() {
        return this.disabled ? '-1' : '0';
    }
    /**
     * @return {?}
     */
    getHostElement() {
        return this.element.nativeElement;
    }
    /**
     * Emits the selection change event.
     * @private
     * @param {?=} isUserInput
     * @return {?}
     */
    emitSelectionChangeEvent(isUserInput = false) {
        this.onSelectionChange.emit(new McOptionSelectionChange(this, isUserInput));
    }
}
McOption.decorators = [
    { type: Component, args: [{
                selector: 'mc-option',
                exportAs: 'mcOption',
                host: {
                    '[attr.tabindex]': 'getTabIndex()',
                    class: 'mc-option',
                    '[class.mc-selected]': 'selected',
                    '[class.mc-option-multiple]': 'multiple',
                    '[class.mc-active]': 'active',
                    '[class.mc-disabled]': 'disabled',
                    '[id]': 'id',
                    '(click)': 'selectViaInteraction()',
                    '(keydown)': 'handleKeydown($event)'
                },
                template: "<mc-pseudo-checkbox\n    *ngIf=\"showCheckbox\"\n    [state]=\"selected ? 'checked' : ''\"\n    [disabled]=\"disabled\">\n</mc-pseudo-checkbox>\n\n<span class=\"mc-option-text\"><ng-content></ng-content></span>\n\n<div class=\"mc-option-overlay\"></div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mc-option{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;position:relative;max-width:100%;height:32px;border:2px solid transparent;cursor:pointer;outline:0;padding:0 16px;-webkit-tap-highlight-color:transparent}.mc-option.mc-disabled{cursor:default}.mc-option .mc-pseudo-checkbox{margin-right:8px}.mc-option .mc-option-overlay{position:absolute;top:-2px;left:-2px;right:-2px;bottom:-2px;pointer-events:none;border-radius:inherit}.mc-option-text{display:inline-block;flex-grow:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}"]
            }] }
];
/** @nocollapse */
McOption.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_OPTION_PARENT_COMPONENT,] }] },
    { type: McOptgroup, decorators: [{ type: Optional }] }
];
McOption.propDecorators = {
    value: [{ type: Input }],
    showCheckbox: [{ type: Input }],
    onSelectionChange: [{ type: Output }],
    disabled: [{ type: Input }]
};
if (false) {
    /**
     * The form value of the option.
     * @type {?}
     */
    McOption.prototype.value;
    /**
     * @type {?}
     * @private
     */
    McOption.prototype._showCheckbox;
    /**
     * Event emitted when the option is selected or deselected.
     * @type {?}
     */
    McOption.prototype.onSelectionChange;
    /**
     * Emits when the state of the option changes and any parents have to be notified.
     * @type {?}
     */
    McOption.prototype.stateChanges;
    /**
     * @type {?}
     * @private
     */
    McOption.prototype._id;
    /**
     * @type {?}
     * @private
     */
    McOption.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    McOption.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    McOption.prototype._active;
    /**
     * @type {?}
     * @private
     */
    McOption.prototype.mostRecentViewValue;
    /**
     * @type {?}
     * @private
     */
    McOption.prototype.element;
    /**
     * @type {?}
     * @private
     */
    McOption.prototype.changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    McOption.prototype.parent;
    /** @type {?} */
    McOption.prototype.group;
}
/**
 * Counts the amount of option group labels that precede the specified option.
 * \@docs-private
 * @param {?} optionIndex Index of the option at which to start counting.
 * @param {?} options Flat list of all of the options.
 * @param {?} optionGroups Flat list of all of the option groups.
 * @return {?}
 */
export function countGroupLabelsBeforeOption(optionIndex, options, optionGroups) {
    if (optionGroups.length) {
        /** @type {?} */
        const optionsArray = options.toArray();
        /** @type {?} */
        const groups = optionGroups.toArray();
        /** @type {?} */
        let groupCounter = 0;
        for (let i = 0; i < optionIndex + 1; i++) {
            if (optionsArray[i].group && optionsArray[i].group === groups[groupCounter]) {
                groupCounter++;
            }
        }
        return groupCounter;
    }
    return 0;
}
/**
 * Determines the position to which to scroll a panel in order for an option to be into view.
 * \@docs-private
 * @param {?} optionIndex Index of the option to be scrolled into the view.
 * @param {?} optionHeight Height of the options.
 * @param {?} currentScrollPosition Current scroll position of the panel.
 * @param {?} panelHeight Height of the panel.
 * @return {?}
 */
export function getOptionScrollPosition(optionIndex, optionHeight, currentScrollPosition, panelHeight) {
    /** @type {?} */
    const optionOffset = optionIndex * optionHeight;
    if (optionOffset < currentScrollPosition) {
        return optionOffset;
    }
    if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
        return Math.max(0, optionOffset - panelHeight + optionHeight);
    }
    return currentScrollPosition;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUvIiwic291cmNlcyI6WyJvcHRpb24vb3B0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUVILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFFTixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxZQUFZLENBQUM7Ozs7OztJQU9wQyxlQUFlLEdBQUcsQ0FBQzs7OztBQUd2QixNQUFNLE9BQU8sdUJBQXVCOzs7OztJQUNoQyxZQUFtQixNQUFnQixFQUFTLGNBQWMsS0FBSztRQUE1QyxXQUFNLEdBQU4sTUFBTSxDQUFVO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQVE7SUFBRyxDQUFDO0NBQ3RFOzs7SUFEZSx5Q0FBdUI7O0lBQUUsOENBQTBCOzs7Ozs7OztBQVNuRSw2Q0FFQzs7O0lBREcsMkNBQW1COzs7Ozs7QUFNdkIsTUFBTSxPQUFPLDBCQUEwQixHQUNuQyxJQUFJLGNBQWMsQ0FBMEIsNEJBQTRCLENBQUM7Ozs7QUF5QjdFLE1BQU0sT0FBTyxRQUFROzs7Ozs7O0lBeUVqQixZQUNxQixPQUFtQixFQUNuQixpQkFBb0MsRUFDWSxNQUErQixFQUMzRSxLQUFpQjtRQUhyQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDWSxXQUFNLEdBQU4sTUFBTSxDQUF5QjtRQUMzRSxVQUFLLEdBQUwsS0FBSyxDQUFZOzs7OztRQTVEdkIsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQTJCLENBQUM7Ozs7UUFHMUUsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBb0JwQyxRQUFHLEdBQUcsYUFBYSxlQUFlLEVBQUUsRUFBRSxDQUFDO1FBTXZDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFXbEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQVlsQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBRWhCLHdCQUFtQixHQUFHLEVBQUUsQ0FBQztJQU85QixDQUFDOzs7O0lBMUVKLElBQ0ksWUFBWTtRQUNaLE9BQU8sSUFBSSxDQUFDLGFBQWEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDakYsQ0FBQzs7Ozs7SUFFRCxJQUFJLFlBQVksQ0FBQyxLQUFLO1FBQ2xCLElBQUksQ0FBQyxhQUFhLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEQsQ0FBQzs7Ozs7O0lBZUQsSUFBSSxTQUFTO1FBQ1Qsc0RBQXNEO1FBQ3RELE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzVELENBQUM7Ozs7O0lBR0QsSUFBSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQy9DLENBQUM7Ozs7SUFFRCxJQUFJLEVBQUU7UUFDRixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQzs7OztJQUlELElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDOzs7O0lBSUQsSUFDSSxRQUFRO1FBQ1IsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ2pFLENBQUM7Ozs7O0lBRUQsSUFBSSxRQUFRLENBQUMsS0FBVTtRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xELENBQUM7Ozs7Ozs7O0lBVUQsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7Ozs7SUFhRCxrQkFBa0I7UUFDZCwyRkFBMkY7UUFDM0YsNEZBQTRGO1FBQzVGLDRGQUE0RjtRQUM1RiwyRkFBMkY7UUFDM0YsNkJBQTZCO1FBQzdCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTs7a0JBQ1YsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTO1lBRWhDLElBQUksU0FBUyxLQUFLLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDeEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFNBQVMsQ0FBQztnQkFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUM1QjtTQUNKO0lBQ0wsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2pDLENBQUM7Ozs7SUFFRCxTQUFTOzs7Y0FFQyxPQUFPLEdBQVksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXZFLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7OztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUV0QixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7U0FDbkM7SUFDTCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNKLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUV2QixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7U0FDbkM7SUFDTCxDQUFDOzs7O0lBRUQsS0FBSzs7Y0FDSyxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRTtRQUVyQyxJQUFJLE9BQU8sT0FBTyxDQUFDLEtBQUssS0FBSyxVQUFVLEVBQUU7WUFDckMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQzs7Ozs7OztJQU9ELGVBQWU7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN6QztJQUNMLENBQUM7Ozs7Ozs7SUFPRCxpQkFBaUI7UUFDYixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDekM7SUFDTCxDQUFDOzs7OztJQUdELFFBQVE7UUFDSixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQzs7Ozs7O0lBR0QsYUFBYSxDQUFDLEtBQW9CO1FBQzlCLDJCQUEyQjtRQUMzQixJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssS0FBSyxFQUFFO1lBQ3BELElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBRTVCLHlEQUF5RDtZQUN6RCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDOzs7Ozs7SUFNRCxvQkFBb0I7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUV4RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ3RDLENBQUM7Ozs7SUFFRCxjQUFjO1FBQ1YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN0QyxDQUFDOzs7Ozs7O0lBR08sd0JBQXdCLENBQUMsV0FBVyxHQUFHLEtBQUs7UUFDaEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLHVCQUF1QixDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7OztZQXpOSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixJQUFJLEVBQUU7b0JBQ0YsaUJBQWlCLEVBQUUsZUFBZTtvQkFDbEMsS0FBSyxFQUFFLFdBQVc7b0JBQ2xCLHFCQUFxQixFQUFFLFVBQVU7b0JBQ2pDLDRCQUE0QixFQUFFLFVBQVU7b0JBQ3hDLG1CQUFtQixFQUFFLFFBQVE7b0JBQzdCLHFCQUFxQixFQUFFLFVBQVU7b0JBQ2pDLE1BQU0sRUFBRSxJQUFJO29CQUVaLFNBQVMsRUFBRSx3QkFBd0I7b0JBQ25DLFdBQVcsRUFBRSx1QkFBdUI7aUJBQ3ZDO2dCQUVELDJRQUEwQjtnQkFDMUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7OztZQWxFRyxVQUFVO1lBRlYsaUJBQWlCOzRDQWlKWixRQUFRLFlBQUksTUFBTSxTQUFDLDBCQUEwQjtZQWpJN0MsVUFBVSx1QkFrSVYsUUFBUTs7O29CQTNFWixLQUFLOzJCQUVMLEtBQUs7Z0NBYUwsTUFBTTt1QkErQk4sS0FBSzs7Ozs7OztJQTlDTix5QkFBb0I7Ozs7O0lBV3BCLGlDQUErQjs7Ozs7SUFJL0IscUNBQW1GOzs7OztJQUduRixnQ0FBNEM7Ozs7O0lBb0I1Qyx1QkFBK0M7Ozs7O0lBTS9DLDZCQUEwQjs7Ozs7SUFXMUIsNkJBQTBCOzs7OztJQVkxQiwyQkFBd0I7Ozs7O0lBRXhCLHVDQUFpQzs7Ozs7SUFHN0IsMkJBQW9DOzs7OztJQUNwQyxxQ0FBcUQ7Ozs7O0lBQ3JELDBCQUFnRzs7SUFDaEcseUJBQXNDOzs7Ozs7Ozs7O0FBa0k5QyxNQUFNLFVBQVUsNEJBQTRCLENBQ3hDLFdBQW1CLEVBQ25CLE9BQTRCLEVBQzVCLFlBQW1DO0lBR25DLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRTs7Y0FDZixZQUFZLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRTs7Y0FDaEMsTUFBTSxHQUFHLFlBQVksQ0FBQyxPQUFPLEVBQUU7O1lBRWpDLFlBQVksR0FBRyxDQUFDO1FBRXBCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RDLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDekUsWUFBWSxFQUFFLENBQUM7YUFDbEI7U0FDSjtRQUVELE9BQU8sWUFBWSxDQUFDO0tBQ3ZCO0lBRUQsT0FBTyxDQUFDLENBQUM7QUFDYixDQUFDOzs7Ozs7Ozs7O0FBVUQsTUFBTSxVQUFVLHVCQUF1QixDQUNuQyxXQUFtQixFQUNuQixZQUFvQixFQUNwQixxQkFBNkIsRUFDN0IsV0FBbUI7O1VBRWIsWUFBWSxHQUFHLFdBQVcsR0FBRyxZQUFZO0lBRS9DLElBQUksWUFBWSxHQUFHLHFCQUFxQixFQUFFO1FBQUUsT0FBTyxZQUFZLENBQUM7S0FBRTtJQUVsRSxJQUFJLFlBQVksR0FBRyxZQUFZLEdBQUcscUJBQXFCLEdBQUcsV0FBVyxFQUFFO1FBQ25FLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsWUFBWSxHQUFHLFdBQVcsR0FBRyxZQUFZLENBQUMsQ0FBQztLQUNqRTtJQUVELE9BQU8scUJBQXFCLENBQUM7QUFDakMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIEFmdGVyVmlld0NoZWNrZWQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVOVEVSLCBTUEFDRSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE1jT3B0Z3JvdXAgfSBmcm9tICcuL29wdGdyb3VwJztcblxuXG4vKipcbiAqIE9wdGlvbiBJRHMgbmVlZCB0byBiZSB1bmlxdWUgYWNyb3NzIGNvbXBvbmVudHMsIHNvIHRoaXMgY291bnRlciBleGlzdHMgb3V0c2lkZSBvZlxuICogdGhlIGNvbXBvbmVudCBkZWZpbml0aW9uLlxuICovXG5sZXQgdW5pcXVlSWRDb3VudGVyID0gMDtcblxuLyoqIEV2ZW50IG9iamVjdCBlbWl0dGVkIGJ5IE1jT3B0aW9uIHdoZW4gc2VsZWN0ZWQgb3IgZGVzZWxlY3RlZC4gKi9cbmV4cG9ydCBjbGFzcyBNY09wdGlvblNlbGVjdGlvbkNoYW5nZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZTogTWNPcHRpb24sIHB1YmxpYyBpc1VzZXJJbnB1dCA9IGZhbHNlKSB7fVxufVxuXG4vKipcbiAqIERlc2NyaWJlcyBhIHBhcmVudCBjb21wb25lbnQgdGhhdCBtYW5hZ2VzIGEgbGlzdCBvZiBvcHRpb25zLlxuICogQ29udGFpbnMgcHJvcGVydGllcyB0aGF0IHRoZSBvcHRpb25zIGNhbiBpbmhlcml0LlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIE1jT3B0aW9uUGFyZW50Q29tcG9uZW50IHtcbiAgICBtdWx0aXBsZT86IGJvb2xlYW47XG59XG5cbi8qKlxuICogSW5qZWN0aW9uIHRva2VuIHVzZWQgdG8gcHJvdmlkZSB0aGUgcGFyZW50IGNvbXBvbmVudCB0byBvcHRpb25zLlxuICovXG5leHBvcnQgY29uc3QgTUNfT1BUSU9OX1BBUkVOVF9DT01QT05FTlQgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjxNY09wdGlvblBhcmVudENvbXBvbmVudD4oJ01DX09QVElPTl9QQVJFTlRfQ09NUE9ORU5UJyk7XG5cbi8qKlxuICogU2luZ2xlIG9wdGlvbiBpbnNpZGUgb2YgYSBgPG1jLXNlbGVjdD5gIGVsZW1lbnQuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtb3B0aW9uJyxcbiAgICBleHBvcnRBczogJ21jT3B0aW9uJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAnZ2V0VGFiSW5kZXgoKScsXG4gICAgICAgIGNsYXNzOiAnbWMtb3B0aW9uJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1zZWxlY3RlZF0nOiAnc2VsZWN0ZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLW9wdGlvbi1tdWx0aXBsZV0nOiAnbXVsdGlwbGUnLFxuICAgICAgICAnW2NsYXNzLm1jLWFjdGl2ZV0nOiAnYWN0aXZlJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICAgICAnW2lkXSc6ICdpZCcsXG5cbiAgICAgICAgJyhjbGljayknOiAnc2VsZWN0VmlhSW50ZXJhY3Rpb24oKScsXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJ1xuICAgIH0sXG4gICAgc3R5bGVVcmxzOiBbJ29wdGlvbi5zY3NzJ10sXG4gICAgdGVtcGxhdGVVcmw6ICdvcHRpb24uaHRtbCcsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY09wdGlvbiBpbXBsZW1lbnRzIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XG4gICAgLyoqIFRoZSBmb3JtIHZhbHVlIG9mIHRoZSBvcHRpb24uICovXG4gICAgQElucHV0KCkgdmFsdWU6IGFueTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNob3dDaGVja2JveCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3dDaGVja2JveCA9PT0gdW5kZWZpbmVkID8gdGhpcy5tdWx0aXBsZSA6IHRoaXMuX3Nob3dDaGVja2JveDtcbiAgICB9XG5cbiAgICBzZXQgc2hvd0NoZWNrYm94KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3Nob3dDaGVja2JveCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2hvd0NoZWNrYm94OiBib29sZWFuO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgb3B0aW9uIGlzIHNlbGVjdGVkIG9yIGRlc2VsZWN0ZWQuICovXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW91dHB1dC1vbi1wcmVmaXhcbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgb25TZWxlY3Rpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE1jT3B0aW9uU2VsZWN0aW9uQ2hhbmdlPigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIHN0YXRlIG9mIHRoZSBvcHRpb24gY2hhbmdlcyBhbmQgYW55IHBhcmVudHMgaGF2ZSB0byBiZSBub3RpZmllZC4gKi9cbiAgICByZWFkb25seSBzdGF0ZUNoYW5nZXMgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGRpc3BsYXllZCB2YWx1ZSBvZiB0aGUgb3B0aW9uLiBJdCBpcyBuZWNlc3NhcnkgdG8gc2hvdyB0aGUgc2VsZWN0ZWQgb3B0aW9uIGluIHRoZVxuICAgICAqIHNlbGVjdCdzIHRyaWdnZXIuXG4gICAgICovXG4gICAgZ2V0IHZpZXdWYWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICAvLyBUT0RPOiBBZGQgaW5wdXQgcHJvcGVydHkgYWx0ZXJuYXRpdmUgZm9yIG5vZGUgZW52cy5cbiAgICAgICAgcmV0dXJuICh0aGlzLmdldEhvc3RFbGVtZW50KCkudGV4dENvbnRlbnQgfHwgJycpLnRyaW0oKTtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgd3JhcHBpbmcgY29tcG9uZW50IGlzIGluIG11bHRpcGxlIHNlbGVjdGlvbiBtb2RlLiAqL1xuICAgIGdldCBtdWx0aXBsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50Lm11bHRpcGxlO1xuICAgIH1cblxuICAgIGdldCBpZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaWQgPSBgbWMtb3B0aW9uLSR7dW5pcXVlSWRDb3VudGVyKyt9YDtcblxuICAgIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NlbGVjdGVkID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmdyb3VwICYmIHRoaXMuZ3JvdXAuZGlzYWJsZWQpIHx8IHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBvciBub3QgdGhlIG9wdGlvbiBpcyBjdXJyZW50bHkgYWN0aXZlIGFuZCByZWFkeSB0byBiZSBzZWxlY3RlZC5cbiAgICAgKiBBbiBhY3RpdmUgb3B0aW9uIGRpc3BsYXlzIHN0eWxlcyBhcyBpZiBpdCBpcyBmb2N1c2VkLCBidXQgdGhlXG4gICAgICogZm9jdXMgaXMgYWN0dWFsbHkgcmV0YWluZWQgc29tZXdoZXJlIGVsc2UuIFRoaXMgY29tZXMgaW4gaGFuZHlcbiAgICAgKiBmb3IgY29tcG9uZW50cyBsaWtlIGF1dG9jb21wbGV0ZSB3aGVyZSBmb2N1cyBtdXN0IHJlbWFpbiBvbiB0aGUgaW5wdXQuXG4gICAgICovXG4gICAgZ2V0IGFjdGl2ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hY3RpdmUgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgbW9zdFJlY2VudFZpZXdWYWx1ZSA9ICcnO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfT1BUSU9OX1BBUkVOVF9DT01QT05FTlQpIHByaXZhdGUgcmVhZG9ubHkgcGFyZW50OiBNY09wdGlvblBhcmVudENvbXBvbmVudCxcbiAgICAgICAgQE9wdGlvbmFsKCkgcmVhZG9ubHkgZ3JvdXA6IE1jT3B0Z3JvdXBcbiAgICApIHt9XG5cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgICAgIC8vIFNpbmNlIHBhcmVudCBjb21wb25lbnRzIGNvdWxkIGJlIHVzaW5nIHRoZSBvcHRpb24ncyBsYWJlbCB0byBkaXNwbGF5IHRoZSBzZWxlY3RlZCB2YWx1ZXNcbiAgICAgICAgLy8gKGUuZy4gYG1jLXNlbGVjdGApIGFuZCB0aGV5IGRvbid0IGhhdmUgYSB3YXkgb2Yga25vd2luZyBpZiB0aGUgb3B0aW9uJ3MgbGFiZWwgaGFzIGNoYW5nZWRcbiAgICAgICAgLy8gd2UgaGF2ZSB0byBjaGVjayBmb3IgY2hhbmdlcyBpbiB0aGUgRE9NIG91cnNlbHZlcyBhbmQgZGlzcGF0Y2ggYW4gZXZlbnQuIFRoZXNlIGNoZWNrcyBhcmVcbiAgICAgICAgLy8gcmVsYXRpdmVseSBjaGVhcCwgaG93ZXZlciB3ZSBzdGlsbCBsaW1pdCB0aGVtIG9ubHkgdG8gc2VsZWN0ZWQgb3B0aW9ucyBpbiBvcmRlciB0byBhdm9pZFxuICAgICAgICAvLyBoaXR0aW5nIHRoZSBET00gdG9vIG9mdGVuLlxuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHZpZXdWYWx1ZSA9IHRoaXMudmlld1ZhbHVlO1xuXG4gICAgICAgICAgICBpZiAodmlld1ZhbHVlICE9PSB0aGlzLm1vc3RSZWNlbnRWaWV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vc3RSZWNlbnRWaWV3VmFsdWUgPSB2aWV3VmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgZ2V0SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgICAgICBjb25zdCBET01SZWN0OiBET01SZWN0ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Q2xpZW50UmVjdHMoKVswXTtcblxuICAgICAgICByZXR1cm4gRE9NUmVjdCA/IERPTVJlY3QuaGVpZ2h0IDogMDtcbiAgICB9XG5cbiAgICBzZWxlY3QoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdFNlbGVjdGlvbkNoYW5nZUV2ZW50KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXNlbGVjdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgdGhpcy5lbWl0U2VsZWN0aW9uQ2hhbmdlRXZlbnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5nZXRIb3N0RWxlbWVudCgpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZWxlbWVudC5mb2N1cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2Qgc2V0cyBkaXNwbGF5IHN0eWxlcyBvbiB0aGUgb3B0aW9uIHRvIG1ha2UgaXQgYXBwZWFyXG4gICAgICogYWN0aXZlLiBUaGlzIGlzIHVzZWQgYnkgdGhlIEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyIHNvIGtleVxuICAgICAqIGV2ZW50cyB3aWxsIGRpc3BsYXkgdGhlIHByb3BlciBvcHRpb25zIGFzIGFjdGl2ZSBvbiBhcnJvdyBrZXkgZXZlbnRzLlxuICAgICAqL1xuICAgIHNldEFjdGl2ZVN0eWxlcygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgcmVtb3ZlcyBkaXNwbGF5IHN0eWxlcyBvbiB0aGUgb3B0aW9uIHRoYXQgbWFkZSBpdCBhcHBlYXJcbiAgICAgKiBhY3RpdmUuIFRoaXMgaXMgdXNlZCBieSB0aGUgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXIgc28ga2V5XG4gICAgICogZXZlbnRzIHdpbGwgZGlzcGxheSB0aGUgcHJvcGVyIG9wdGlvbnMgYXMgYWN0aXZlIG9uIGFycm93IGtleSBldmVudHMuXG4gICAgICovXG4gICAgc2V0SW5hY3RpdmVTdHlsZXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBHZXRzIHRoZSBsYWJlbCB0byBiZSB1c2VkIHdoZW4gZGV0ZXJtaW5pbmcgd2hldGhlciB0aGUgb3B0aW9uIHNob3VsZCBiZSBmb2N1c2VkLiAqL1xuICAgIGdldExhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpZXdWYWx1ZTtcbiAgICB9XG5cbiAgICAvKiogRW5zdXJlcyB0aGUgb3B0aW9uIGlzIHNlbGVjdGVkIHdoZW4gYWN0aXZhdGVkIGZyb20gdGhlIGtleWJvYXJkLiAqL1xuICAgIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBFTlRFUiB8fCBldmVudC5rZXlDb2RlID09PSBTUEFDRSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RWaWFJbnRlcmFjdGlvbigpO1xuXG4gICAgICAgICAgICAvLyBQcmV2ZW50IHRoZSBwYWdlIGZyb20gc2Nyb2xsaW5nIGRvd24gYW5kIGZvcm0gc3VibWl0cy5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBgU2VsZWN0cyB0aGUgb3B0aW9uIHdoaWxlIGluZGljYXRpbmcgdGhlIHNlbGVjdGlvbiBjYW1lIGZyb20gdGhlIHVzZXIuIFVzZWQgdG9cbiAgICAgKiBkZXRlcm1pbmUgaWYgdGhlIHNlbGVjdCdzIHZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgc2hvdWxkIGJlIGludm9rZWQuYFxuICAgICAqL1xuICAgIHNlbGVjdFZpYUludGVyYWN0aW9uKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdGhpcy5tdWx0aXBsZSA/ICF0aGlzLl9zZWxlY3RlZCA6IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB0aGlzLmVtaXRTZWxlY3Rpb25DaGFuZ2VFdmVudCh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFRhYkluZGV4KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkID8gJy0xJyA6ICcwJztcbiAgICB9XG5cbiAgICBnZXRIb3N0RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICAvKiogRW1pdHMgdGhlIHNlbGVjdGlvbiBjaGFuZ2UgZXZlbnQuICovXG4gICAgcHJpdmF0ZSBlbWl0U2VsZWN0aW9uQ2hhbmdlRXZlbnQoaXNVc2VySW5wdXQgPSBmYWxzZSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlLmVtaXQobmV3IE1jT3B0aW9uU2VsZWN0aW9uQ2hhbmdlKHRoaXMsIGlzVXNlcklucHV0KSk7XG4gICAgfVxufVxuXG4vKipcbiAqIENvdW50cyB0aGUgYW1vdW50IG9mIG9wdGlvbiBncm91cCBsYWJlbHMgdGhhdCBwcmVjZWRlIHRoZSBzcGVjaWZpZWQgb3B0aW9uLlxuICogQHBhcmFtIG9wdGlvbkluZGV4IEluZGV4IG9mIHRoZSBvcHRpb24gYXQgd2hpY2ggdG8gc3RhcnQgY291bnRpbmcuXG4gKiBAcGFyYW0gb3B0aW9ucyBGbGF0IGxpc3Qgb2YgYWxsIG9mIHRoZSBvcHRpb25zLlxuICogQHBhcmFtIG9wdGlvbkdyb3VwcyBGbGF0IGxpc3Qgb2YgYWxsIG9mIHRoZSBvcHRpb24gZ3JvdXBzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY291bnRHcm91cExhYmVsc0JlZm9yZU9wdGlvbihcbiAgICBvcHRpb25JbmRleDogbnVtYmVyLFxuICAgIG9wdGlvbnM6IFF1ZXJ5TGlzdDxNY09wdGlvbj4sXG4gICAgb3B0aW9uR3JvdXBzOiBRdWVyeUxpc3Q8TWNPcHRncm91cD5cbik6IG51bWJlciB7XG5cbiAgICBpZiAob3B0aW9uR3JvdXBzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBvcHRpb25zQXJyYXkgPSBvcHRpb25zLnRvQXJyYXkoKTtcbiAgICAgICAgY29uc3QgZ3JvdXBzID0gb3B0aW9uR3JvdXBzLnRvQXJyYXkoKTtcblxuICAgICAgICBsZXQgZ3JvdXBDb3VudGVyID0gMDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbkluZGV4ICsgMTsgaSsrKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uc0FycmF5W2ldLmdyb3VwICYmIG9wdGlvbnNBcnJheVtpXS5ncm91cCA9PT0gZ3JvdXBzW2dyb3VwQ291bnRlcl0pIHtcbiAgICAgICAgICAgICAgICBncm91cENvdW50ZXIrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBncm91cENvdW50ZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB0aGUgcG9zaXRpb24gdG8gd2hpY2ggdG8gc2Nyb2xsIGEgcGFuZWwgaW4gb3JkZXIgZm9yIGFuIG9wdGlvbiB0byBiZSBpbnRvIHZpZXcuXG4gKiBAcGFyYW0gb3B0aW9uSW5kZXggSW5kZXggb2YgdGhlIG9wdGlvbiB0byBiZSBzY3JvbGxlZCBpbnRvIHRoZSB2aWV3LlxuICogQHBhcmFtIG9wdGlvbkhlaWdodCBIZWlnaHQgb2YgdGhlIG9wdGlvbnMuXG4gKiBAcGFyYW0gY3VycmVudFNjcm9sbFBvc2l0aW9uIEN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIG9mIHRoZSBwYW5lbC5cbiAqIEBwYXJhbSBwYW5lbEhlaWdodCBIZWlnaHQgb2YgdGhlIHBhbmVsLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0T3B0aW9uU2Nyb2xsUG9zaXRpb24oXG4gICAgb3B0aW9uSW5kZXg6IG51bWJlcixcbiAgICBvcHRpb25IZWlnaHQ6IG51bWJlcixcbiAgICBjdXJyZW50U2Nyb2xsUG9zaXRpb246IG51bWJlcixcbiAgICBwYW5lbEhlaWdodDogbnVtYmVyXG4pOiBudW1iZXIge1xuICAgIGNvbnN0IG9wdGlvbk9mZnNldCA9IG9wdGlvbkluZGV4ICogb3B0aW9uSGVpZ2h0O1xuXG4gICAgaWYgKG9wdGlvbk9mZnNldCA8IGN1cnJlbnRTY3JvbGxQb3NpdGlvbikgeyByZXR1cm4gb3B0aW9uT2Zmc2V0OyB9XG5cbiAgICBpZiAob3B0aW9uT2Zmc2V0ICsgb3B0aW9uSGVpZ2h0ID4gY3VycmVudFNjcm9sbFBvc2l0aW9uICsgcGFuZWxIZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIG9wdGlvbk9mZnNldCAtIHBhbmVsSGVpZ2h0ICsgb3B0aW9uSGVpZ2h0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3VycmVudFNjcm9sbFBvc2l0aW9uO1xufVxuXG4iXX0=