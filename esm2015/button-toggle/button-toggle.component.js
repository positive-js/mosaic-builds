/**
 * @fileoverview added by tsickle
 * Generated from: button-toggle.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Input, Optional, Output, QueryList, ViewEncapsulation, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { McButton } from '@ptsecurity/mosaic/button';
/**
 * Provider Expression that allows mc-button-toggle-group to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * \@docs-private
 * @type {?}
 */
export const MC_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => McButtonToggleGroup)),
    multi: true
};
/**
 * Change event object emitted by MсButtonToggle.
 */
export class McButtonToggleChange {
    /**
     * @param {?} source
     * @param {?} value
     */
    constructor(source, value) {
        this.source = source;
        this.value = value;
    }
}
if (false) {
    /**
     * The MсButtonToggle that emits the event.
     * @type {?}
     */
    McButtonToggleChange.prototype.source;
    /**
     * The value assigned to the MсButtonToggle.
     * @type {?}
     */
    McButtonToggleChange.prototype.value;
}
/**
 * Exclusive selection button toggle group that behaves like a radio-button group.
 */
export class McButtonToggleGroup {
    /**
     * @param {?} _changeDetector
     */
    constructor(_changeDetector) {
        this._changeDetector = _changeDetector;
        /**
         * Event that emits whenever the value of the group changes.
         * Used to facilitate two-way data binding.
         * \@docs-private
         */
        this.valueChange = new EventEmitter();
        /**
         * Event emitted when the group's value changes.
         */
        this.change = new EventEmitter();
        this._vertical = false;
        this._multiple = false;
        this._disabled = false;
        /**
         * The method to be called in order to update ngModel.
         * Now `ngModel` binding is not supported in multiple selection mode.
         */
        // tslint:disable-next-line:no-empty
        this.controlValueAccessorChangeFn = (/**
         * @return {?}
         */
        () => { });
        /**
         * onTouch function registered via registerOnTouch (ControlValueAccessor).
         */
        // tslint:disable-next-line:no-empty
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * Whether the toggle group is vertical.
     * @return {?}
     */
    get vertical() {
        return this._vertical;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set vertical(value) {
        this._vertical = coerceBooleanProperty(value);
    }
    /**
     * Value of the toggle group.
     * @return {?}
     */
    get value() {
        /** @type {?} */
        const selected = this.selectionModel ? this.selectionModel.selected : [];
        if (this.multiple) {
            return selected.map((/**
             * @param {?} toggle
             * @return {?}
             */
            (toggle) => toggle.value));
        }
        return selected[0] ? selected[0].value : undefined;
    }
    /**
     * @param {?} newValue
     * @return {?}
     */
    set value(newValue) {
        this.setSelectionByValue(newValue);
        this.valueChange.emit(this.value);
    }
    /**
     * Selected button toggles in the group.
     * @return {?}
     */
    get selected() {
        /** @type {?} */
        const selected = this.selectionModel.selected;
        return this.multiple ? selected : (selected[0] || null);
    }
    /**
     * Whether multiple button toggles can be selected.
     * @return {?}
     */
    get multiple() {
        return this._multiple;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set multiple(value) {
        this._multiple = coerceBooleanProperty(value);
    }
    /**
     * Whether multiple button toggle group is disabled.
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
        this._disabled = coerceBooleanProperty(value);
        if (!this.buttonToggles) {
            return;
        }
        this.buttonToggles.forEach((/**
         * @param {?} toggle
         * @return {?}
         */
        (toggle) => toggle.markForCheck()));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.selectionModel = new SelectionModel(this.multiple, undefined, false);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.selectionModel.select(...this.buttonToggles.filter((/**
         * @param {?} toggle
         * @return {?}
         */
        (toggle) => toggle.checked)));
        this.disabled = this._disabled;
    }
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param {?} value Value to be set to the model.
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
        this._changeDetector.markForCheck();
    }
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.controlValueAccessorChangeFn = fn;
    }
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * Dispatch change event with current selection and group value.
     * @return {?}
     */
    emitChangeEvent() {
        /** @type {?} */
        const selected = this.selected;
        /** @type {?} */
        const source = Array.isArray(selected) ? selected[selected.length - 1] : selected;
        /** @type {?} */
        const event = new McButtonToggleChange(source, this.value);
        this.controlValueAccessorChangeFn(event.value);
        this.change.emit(event);
    }
    /**
     * Syncs a button toggle's selected state with the model value.
     * @param {?} toggle Toggle to be synced.
     * @param {?} select Whether the toggle should be selected.
     * @param {?=} isUserInput Whether the change was a result of a user interaction.
     * @return {?}
     */
    syncButtonToggle(toggle, select, isUserInput = false) {
        // Deselect the currently-selected toggle, if we're in single-selection
        // mode and the button being toggled isn't selected at the moment.
        if (!this.multiple && this.selected && !toggle.checked) {
            ((/** @type {?} */ (this.selected))).checked = false;
        }
        if (select) {
            this.selectionModel.select(toggle);
        }
        else {
            this.selectionModel.deselect(toggle);
        }
        // Only emit the change event for user input.
        if (isUserInput) {
            this.emitChangeEvent();
        }
        // Note: we emit this one no matter whether it was a user interaction, because
        // it is used by Angular to sync up the two-way data binding.
        this.valueChange.emit(this.value);
    }
    /**
     * Checks whether a button toggle is selected.
     * @param {?} toggle
     * @return {?}
     */
    isSelected(toggle) {
        return this.selectionModel.isSelected(toggle);
    }
    /**
     * Determines whether a button toggle should be checked on init.
     * @param {?} toggle
     * @return {?}
     */
    isPrechecked(toggle) {
        if (this.rawValue === undefined) {
            return false;
        }
        if (this.multiple && Array.isArray(this.rawValue)) {
            return this.rawValue.some((/**
             * @param {?} value
             * @return {?}
             */
            (value) => toggle.value != null && value === toggle.value));
        }
        return toggle.value === this.rawValue;
    }
    /**
     * Updates the selection state of the toggles in the group based on a value.
     * @private
     * @param {?} value
     * @return {?}
     */
    setSelectionByValue(value) {
        this.rawValue = value;
        if (!this.buttonToggles) {
            return;
        }
        if (this.multiple && value) {
            if (!Array.isArray(value)) {
                throw Error('Value must be an array in multiple-selection mode.');
            }
            this.clearSelection();
            value.forEach((/**
             * @param {?} currentValue
             * @return {?}
             */
            (currentValue) => this.selectValue(currentValue)));
        }
        else {
            this.clearSelection();
            this.selectValue(value);
        }
    }
    /**
     * Clears the selected toggles.
     * @private
     * @return {?}
     */
    clearSelection() {
        this.selectionModel.clear();
        this.buttonToggles.forEach((/**
         * @param {?} toggle
         * @return {?}
         */
        (toggle) => toggle.checked = false));
    }
    /**
     * Selects a value if there's a toggle that corresponds to it.
     * @private
     * @param {?} value
     * @return {?}
     */
    selectValue(value) {
        /** @type {?} */
        const correspondingOption = this.buttonToggles.find((/**
         * @param {?} toggle
         * @return {?}
         */
        (toggle) => {
            return toggle.value != null && toggle.value === value;
        }));
        if (correspondingOption) {
            correspondingOption.checked = true;
            this.selectionModel.select(correspondingOption);
        }
    }
}
McButtonToggleGroup.decorators = [
    { type: Directive, args: [{
                selector: 'mc-button-toggle-group',
                providers: [MC_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR],
                host: {
                    role: 'group',
                    class: 'mc-button-toggle-group',
                    '[class.mc-button-toggle_vertical]': 'vertical'
                },
                exportAs: 'mcButtonToggleGroup'
            },] }
];
/** @nocollapse */
McButtonToggleGroup.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
McButtonToggleGroup.propDecorators = {
    vertical: [{ type: Input }],
    value: [{ type: Input }],
    multiple: [{ type: Input }],
    buttonToggles: [{ type: ContentChildren, args: [forwardRef((/**
                 * @return {?}
                 */
                () => McButtonToggle)),] }],
    disabled: [{ type: Input }],
    valueChange: [{ type: Output }],
    change: [{ type: Output }]
};
if (false) {
    /**
     * Child button toggle buttons.
     * @type {?}
     */
    McButtonToggleGroup.prototype.buttonToggles;
    /**
     * Event that emits whenever the value of the group changes.
     * Used to facilitate two-way data binding.
     * \@docs-private
     * @type {?}
     */
    McButtonToggleGroup.prototype.valueChange;
    /**
     * Event emitted when the group's value changes.
     * @type {?}
     */
    McButtonToggleGroup.prototype.change;
    /**
     * @type {?}
     * @private
     */
    McButtonToggleGroup.prototype._vertical;
    /**
     * @type {?}
     * @private
     */
    McButtonToggleGroup.prototype._multiple;
    /**
     * @type {?}
     * @private
     */
    McButtonToggleGroup.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    McButtonToggleGroup.prototype.selectionModel;
    /**
     * Reference to the raw value that the consumer tried to assign. The real
     * value will exclude any values from this one that don't correspond to a
     * toggle. Useful for the cases where the value is assigned before the toggles
     * have been initialized or at the same that they're being swapped out.
     * @type {?}
     * @private
     */
    McButtonToggleGroup.prototype.rawValue;
    /**
     * The method to be called in order to update ngModel.
     * Now `ngModel` binding is not supported in multiple selection mode.
     * @type {?}
     */
    McButtonToggleGroup.prototype.controlValueAccessorChangeFn;
    /**
     * onTouch function registered via registerOnTouch (ControlValueAccessor).
     * @type {?}
     */
    McButtonToggleGroup.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    McButtonToggleGroup.prototype._changeDetector;
}
/**
 * Single button inside of a toggle group.
 */
export class McButtonToggle {
    /**
     * @param {?} buttonToggleGroup
     * @param {?} changeDetectorRef
     * @param {?} focusMonitor
     * @param {?} element
     */
    constructor(buttonToggleGroup, changeDetectorRef, focusMonitor, element) {
        this.buttonToggleGroup = buttonToggleGroup;
        this.changeDetectorRef = changeDetectorRef;
        this.focusMonitor = focusMonitor;
        this.element = element;
        /**
         * Event emitted when the group value changes.
         */
        this.change = new EventEmitter();
        this.isSingleSelector = false;
        this._checked = false;
        this._disabled = false;
    }
    /**
     * Whether the button is checked.
     * @return {?}
     */
    get checked() {
        return this.buttonToggleGroup ? this.buttonToggleGroup.isSelected(this) : this._checked;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set checked(value) {
        /** @type {?} */
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._checked) {
            this._checked = newValue;
            if (this.buttonToggleGroup) {
                this.buttonToggleGroup.syncButtonToggle(this, this._checked);
            }
            this.changeDetectorRef.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled || (this.buttonToggleGroup && this.buttonToggleGroup.disabled);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.isSingleSelector = this.buttonToggleGroup && !this.buttonToggleGroup.multiple;
        this.type = this.isSingleSelector ? 'radio' : 'checkbox';
        if (this.buttonToggleGroup && this.buttonToggleGroup.isPrechecked(this)) {
            this.checked = true;
        }
        this.focusMonitor.monitor(this.element.nativeElement, true);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        /** @type {?} */
        const group = this.buttonToggleGroup;
        this.focusMonitor.stopMonitoring(this.element.nativeElement);
        // Remove the toggle from the selection once it's destroyed. Needs to happen
        // on the next tick in order to avoid "changed after checked" errors.
        if (group && group.isSelected(this)) {
            Promise.resolve().then((/**
             * @return {?}
             */
            () => group.syncButtonToggle(this, false)));
        }
    }
    /**
     * Focuses the button.
     * @return {?}
     */
    focus() {
        this.element.nativeElement.focus();
    }
    /**
     * Checks the button toggle due to an interaction with the underlying native button.
     * @return {?}
     */
    onToggleClick() {
        if (this.disabled) {
            return;
        }
        /** @type {?} */
        const newChecked = this.isSingleSelector ? true : !this._checked;
        if (newChecked !== this._checked) {
            this._checked = newChecked;
            if (this.buttonToggleGroup) {
                this.buttonToggleGroup.syncButtonToggle(this, this._checked, true);
                this.buttonToggleGroup.onTouched();
            }
        }
        // Emit a change event when it's the single selector
        this.change.emit(new McButtonToggleChange(this, this.value));
    }
    /**
     * Marks the button toggle as needing checking for change detection.
     * This method is exposed because the parent button toggle group will directly
     * update bound properties of the radio button.
     * @return {?}
     */
    markForCheck() {
        // When the group value changes, the button will not be notified.
        // Use `markForCheck` to explicit update button toggle's status.
        this.changeDetectorRef.markForCheck();
    }
}
McButtonToggle.decorators = [
    { type: Component, args: [{
                selector: 'mc-button-toggle',
                exportAs: 'mcButtonToggle',
                template: `
        <button
            mc-button
            type="button"
            [class.mc-active]="checked"
            [disabled]="disabled"
            [tabIndex]="tabIndex"
            (click)="onToggleClick()">
            <ng-content></ng-content>
        </button>
    `,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    class: 'mc-button-toggle',
                    '[class.mc-button-toggle-standalone]': '!buttonToggleGroup'
                },
                styles: [".mc-group{display:flex;flex-direction:row}.mc-group .mc-group_justified>.mc-group-item{width:100%}.mc-group .mc-group-item+.mc-group-item{margin-left:-1px}.mc-group>.mc-group-item:first-child:not(:last-child),.mc-group>.mc-group-item:first-child:not(:last-child)>.mc-form-field__container{border-bottom-right-radius:0;border-top-right-radius:0}.mc-group>.mc-group-item:last-child:not(:first-child),.mc-group>.mc-group-item:last-child:not(:first-child)>.mc-form-field__container{border-bottom-left-radius:0;border-top-left-radius:0}.mc-group>.mc-group-item:not(:first-child):not(:last-child),.mc-group>.mc-group-item:not(:first-child):not(:last-child)>.mc-form-field__container{border-radius:0}.mc-vertical-group{display:flex;flex-direction:column}.mc-vertical-group>.mc-group-item:first-child:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-vertical-group>.mc-group-item:first-child:not(:last-child)>.mc-form-field__container{border-bottom-right-radius:0;border-bottom-left-radius:0}.mc-vertical-group>.mc-group-item:last-child:not(:first-child){border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-vertical-group>.mc-group-item:last-child:not(:first-child)>.mc-form-field__container{border-top-right-radius:0;border-top-left-radius:0}.mc-vertical-group>.mc-group-item:not(:first-child):not(:last-child),.mc-vertical-group>.mc-group-item:not(:first-child):not(:last-child)>.mc-form-field__container{border-radius:0}.mc-vertical-group .mc-group-item+.mc-group-item{margin-top:-1px}.mc-button-toggle-group{display:flex;flex-direction:row}.mc-button-toggle-group .mc-button-toggle:first-of-type:not(:last-of-type)>.mc-button,.mc-button-toggle-group .mc-button-toggle:first-of-type:not(:last-of-type)>.mc-icon-button{border-bottom-right-radius:0;border-top-right-radius:0}.mc-button-toggle-group .mc-button-toggle:last-of-type:not(:first-of-type)>.mc-button,.mc-button-toggle-group .mc-button-toggle:last-of-type:not(:first-of-type)>.mc-icon-button{border-bottom-left-radius:0;border-top-left-radius:0}.mc-button-toggle-group .mc-button-toggle:not(:first-of-type):not(:last-of-type)>.mc-button,.mc-button-toggle-group .mc-button-toggle:not(:first-of-type):not(:last-of-type)>.mc-icon-button{border-radius:0}.mc-button-toggle-group .mc-button-toggle[disabled]{outline:0}.mc-button-toggle-group:not(.mc-button-toggle_vertical) .mc-button-toggle:not([disabled])+.mc-button-toggle:not([disabled]){margin-left:-1px}.mc-button-toggle_vertical{flex-direction:column}.mc-button-toggle_vertical .mc-button-toggle+.mc-button-toggle{border-left:none;border-right:none}.mc-button-toggle_vertical .mc-button-toggle:not([disabled])+.mc-button-toggle:not([disabled]){margin-top:-1px}.mc-button-toggle_vertical .mc-button-toggle .mc-button,.mc-button-toggle_vertical .mc-button-toggle .mc-icon-button{width:100%}.mc-button-toggle_vertical .mc-button-toggle:first-child:not(:last-child)>.mc-button,.mc-button-toggle_vertical .mc-button-toggle:first-child:not(:last-child)>.mc-icon-button{border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-button-toggle_vertical .mc-button-toggle:last-child:not(:first-child)>.mc-button,.mc-button-toggle_vertical .mc-button-toggle:last-child:not(:first-child)>.mc-icon-button{border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-button-toggle_vertical .mc-button-toggle:not(:first-child):not(:last-child)>.mc-button,.mc-button-toggle_vertical .mc-button-toggle:not(:first-child):not(:last-child)>.mc-icon-button{border-radius:0}.mc-button-toggle-standalone{box-shadow:none}"]
            }] }
];
/** @nocollapse */
McButtonToggle.ctorParameters = () => [
    { type: McButtonToggleGroup, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef },
    { type: FocusMonitor },
    { type: ElementRef }
];
McButtonToggle.propDecorators = {
    checked: [{ type: Input }],
    mcButton: [{ type: ViewChild, args: [McButton, { static: false },] }],
    value: [{ type: Input }],
    tabIndex: [{ type: Input }],
    disabled: [{ type: Input }],
    change: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    McButtonToggle.prototype.type;
    /** @type {?} */
    McButtonToggle.prototype.mcButton;
    /**
     * McButtonToggleGroup reads this to assign its own value.
     * @type {?}
     */
    McButtonToggle.prototype.value;
    /**
     * Tabindex for the toggle.
     * @type {?}
     */
    McButtonToggle.prototype.tabIndex;
    /**
     * Event emitted when the group value changes.
     * @type {?}
     */
    McButtonToggle.prototype.change;
    /**
     * @type {?}
     * @private
     */
    McButtonToggle.prototype.isSingleSelector;
    /**
     * @type {?}
     * @private
     */
    McButtonToggle.prototype._checked;
    /**
     * @type {?}
     * @private
     */
    McButtonToggle.prototype._disabled;
    /** @type {?} */
    McButtonToggle.prototype.buttonToggleGroup;
    /**
     * @type {?}
     * @private
     */
    McButtonToggle.prototype.changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    McButtonToggle.prototype.focusMonitor;
    /**
     * @type {?}
     * @private
     */
    McButtonToggle.prototype.element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLXRvZ2dsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvYnV0dG9uLXRvZ2dsZS8iLCJzb3VyY2VzIjpbImJ1dHRvbi10b2dnbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7Ozs7O0FBV3JELE1BQU0sT0FBTyxxQ0FBcUMsR0FBUTtJQUN0RCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsRUFBQztJQUNsRCxLQUFLLEVBQUUsSUFBSTtDQUNkOzs7O0FBR0QsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7SUFDN0IsWUFFVyxNQUFzQixFQUV0QixLQUFVO1FBRlYsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFFdEIsVUFBSyxHQUFMLEtBQUssQ0FBSztJQUNsQixDQUFDO0NBQ1A7Ozs7OztJQUpPLHNDQUE2Qjs7Ozs7SUFFN0IscUNBQWlCOzs7OztBQWV6QixNQUFNLE9BQU8sbUJBQW1COzs7O0lB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c0NBQWtDOzs7OztJQUNsQyxpQ0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1jQnV0dG9uIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2J1dHRvbic7XG5cblxuLyoqIEFjY2VwdGFibGUgdHlwZXMgZm9yIGEgYnV0dG9uIHRvZ2dsZS4gKi9cbmV4cG9ydCB0eXBlIFRvZ2dsZVR5cGUgPSAnY2hlY2tib3gnIHwgJ3JhZGlvJztcblxuLyoqXG4gKiBQcm92aWRlciBFeHByZXNzaW9uIHRoYXQgYWxsb3dzIG1jLWJ1dHRvbi10b2dnbGUtZ3JvdXAgdG8gcmVnaXN0ZXIgYXMgYSBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAqIFRoaXMgYWxsb3dzIGl0IHRvIHN1cHBvcnQgWyhuZ01vZGVsKV0uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBNQ19CVVRUT05fVE9HR0xFX0dST1VQX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWNCdXR0b25Ub2dnbGVHcm91cCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbi8qKiBDaGFuZ2UgZXZlbnQgb2JqZWN0IGVtaXR0ZWQgYnkgTdGBQnV0dG9uVG9nZ2xlLiAqL1xuZXhwb3J0IGNsYXNzIE1jQnV0dG9uVG9nZ2xlQ2hhbmdlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgLyoqIFRoZSBN0YFCdXR0b25Ub2dnbGUgdGhhdCBlbWl0cyB0aGUgZXZlbnQuICovXG4gICAgICAgIHB1YmxpYyBzb3VyY2U6IE1jQnV0dG9uVG9nZ2xlLFxuICAgICAgICAvKiogVGhlIHZhbHVlIGFzc2lnbmVkIHRvIHRoZSBN0YFCdXR0b25Ub2dnbGUuICovXG4gICAgICAgIHB1YmxpYyB2YWx1ZTogYW55XG4gICAgKSB7fVxufVxuXG4vKiogRXhjbHVzaXZlIHNlbGVjdGlvbiBidXR0b24gdG9nZ2xlIGdyb3VwIHRoYXQgYmVoYXZlcyBsaWtlIGEgcmFkaW8tYnV0dG9uIGdyb3VwLiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1idXR0b24tdG9nZ2xlLWdyb3VwJyxcbiAgICBwcm92aWRlcnM6IFtNQ19CVVRUT05fVE9HR0xFX0dST1VQX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBob3N0OiB7XG4gICAgICAgIHJvbGU6ICdncm91cCcsXG4gICAgICAgIGNsYXNzOiAnbWMtYnV0dG9uLXRvZ2dsZS1ncm91cCcsXG4gICAgICAgICdbY2xhc3MubWMtYnV0dG9uLXRvZ2dsZV92ZXJ0aWNhbF0nOiAndmVydGljYWwnXG4gICAgfSxcbiAgICBleHBvcnRBczogJ21jQnV0dG9uVG9nZ2xlR3JvdXAnXG59KVxuZXhwb3J0IGNsYXNzIE1jQnV0dG9uVG9nZ2xlR3JvdXAgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0IHtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSB0b2dnbGUgZ3JvdXAgaXMgdmVydGljYWwuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgdmVydGljYWwoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl92ZXJ0aWNhbDtcbiAgICB9XG5cbiAgICBzZXQgdmVydGljYWwodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fdmVydGljYWwgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBWYWx1ZSBvZiB0aGUgdG9nZ2xlIGdyb3VwLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5zZWxlY3Rpb25Nb2RlbCA/IHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWQgOiBbXTtcblxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkLm1hcCgodG9nZ2xlKSA9PiB0b2dnbGUudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkWzBdID8gc2VsZWN0ZWRbMF0udmFsdWUgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25CeVZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBTZWxlY3RlZCBidXR0b24gdG9nZ2xlcyBpbiB0aGUgZ3JvdXAuICovXG4gICAgZ2V0IHNlbGVjdGVkKCk6IGFueSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZDtcblxuICAgICAgICByZXR1cm4gdGhpcy5tdWx0aXBsZSA/IHNlbGVjdGVkIDogKHNlbGVjdGVkWzBdIHx8IG51bGwpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIG11bHRpcGxlIGJ1dHRvbiB0b2dnbGVzIGNhbiBiZSBzZWxlY3RlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBtdWx0aXBsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX211bHRpcGxlO1xuICAgIH1cblxuICAgIHNldCBtdWx0aXBsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9tdWx0aXBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqIENoaWxkIGJ1dHRvbiB0b2dnbGUgYnV0dG9ucy4gKi9cbiAgICBAQ29udGVudENoaWxkcmVuKGZvcndhcmRSZWYoKCkgPT4gTWNCdXR0b25Ub2dnbGUpKSBidXR0b25Ub2dnbGVzOiBRdWVyeUxpc3Q8TWNCdXR0b25Ub2dnbGU+O1xuXG4gICAgLyoqIFdoZXRoZXIgbXVsdGlwbGUgYnV0dG9uIHRvZ2dsZSBncm91cCBpcyBkaXNhYmxlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmJ1dHRvblRvZ2dsZXMpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5idXR0b25Ub2dnbGVzLmZvckVhY2goKHRvZ2dsZSkgPT4gdG9nZ2xlLm1hcmtGb3JDaGVjaygpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSB2YWx1ZSBvZiB0aGUgZ3JvdXAgY2hhbmdlcy5cbiAgICAgKiBVc2VkIHRvIGZhY2lsaXRhdGUgdHdvLXdheSBkYXRhIGJpbmRpbmcuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZ3JvdXAncyB2YWx1ZSBjaGFuZ2VzLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxNY0J1dHRvblRvZ2dsZUNoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1jQnV0dG9uVG9nZ2xlQ2hhbmdlPigpO1xuICAgIHByaXZhdGUgX3ZlcnRpY2FsID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfbXVsdGlwbGUgPSBmYWxzZTtcbiAgICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuICAgIHByaXZhdGUgc2VsZWN0aW9uTW9kZWw6IFNlbGVjdGlvbk1vZGVsPE1jQnV0dG9uVG9nZ2xlPjtcblxuICAgIC8qKlxuICAgICAqIFJlZmVyZW5jZSB0byB0aGUgcmF3IHZhbHVlIHRoYXQgdGhlIGNvbnN1bWVyIHRyaWVkIHRvIGFzc2lnbi4gVGhlIHJlYWxcbiAgICAgKiB2YWx1ZSB3aWxsIGV4Y2x1ZGUgYW55IHZhbHVlcyBmcm9tIHRoaXMgb25lIHRoYXQgZG9uJ3QgY29ycmVzcG9uZCB0byBhXG4gICAgICogdG9nZ2xlLiBVc2VmdWwgZm9yIHRoZSBjYXNlcyB3aGVyZSB0aGUgdmFsdWUgaXMgYXNzaWduZWQgYmVmb3JlIHRoZSB0b2dnbGVzXG4gICAgICogaGF2ZSBiZWVuIGluaXRpYWxpemVkIG9yIGF0IHRoZSBzYW1lIHRoYXQgdGhleSdyZSBiZWluZyBzd2FwcGVkIG91dC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHJhd1ZhbHVlOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbWV0aG9kIHRvIGJlIGNhbGxlZCBpbiBvcmRlciB0byB1cGRhdGUgbmdNb2RlbC5cbiAgICAgKiBOb3cgYG5nTW9kZWxgIGJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCBpbiBtdWx0aXBsZSBzZWxlY3Rpb24gbW9kZS5cbiAgICAgKi9cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcbiAgICBjb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gICAgLyoqIG9uVG91Y2ggZnVuY3Rpb24gcmVnaXN0ZXJlZCB2aWEgcmVnaXN0ZXJPblRvdWNoIChDb250cm9sVmFsdWVBY2Nlc3NvcikuICovXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5XG4gICAgb25Ub3VjaGVkOiAoKSA9PiBhbnkgPSAoKSA9PiB7fTtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsPE1jQnV0dG9uVG9nZ2xlPih0aGlzLm11bHRpcGxlLCB1bmRlZmluZWQsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0KC4uLnRoaXMuYnV0dG9uVG9nZ2xlcy5maWx0ZXIoKHRvZ2dsZSkgPT4gdG9nZ2xlLmNoZWNrZWQpKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG1vZGVsIHZhbHVlLiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgICAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSB0byBiZSBzZXQgdG8gdGhlIG1vZGVsLlxuICAgICAqL1xuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuID0gZm47XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgLyoqIERpc3BhdGNoIGNoYW5nZSBldmVudCB3aXRoIGN1cnJlbnQgc2VsZWN0aW9uIGFuZCBncm91cCB2YWx1ZS4gKi9cbiAgICBlbWl0Q2hhbmdlRXZlbnQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZDtcbiAgICAgICAgY29uc3Qgc291cmNlID0gQXJyYXkuaXNBcnJheShzZWxlY3RlZCkgPyBzZWxlY3RlZFtzZWxlY3RlZC5sZW5ndGggLSAxXSA6IHNlbGVjdGVkO1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBNY0J1dHRvblRvZ2dsZUNoYW5nZShzb3VyY2UsIHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLmNvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4oZXZlbnQudmFsdWUpO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTeW5jcyBhIGJ1dHRvbiB0b2dnbGUncyBzZWxlY3RlZCBzdGF0ZSB3aXRoIHRoZSBtb2RlbCB2YWx1ZS5cbiAgICAgKiBAcGFyYW0gdG9nZ2xlIFRvZ2dsZSB0byBiZSBzeW5jZWQuXG4gICAgICogQHBhcmFtIHNlbGVjdCBXaGV0aGVyIHRoZSB0b2dnbGUgc2hvdWxkIGJlIHNlbGVjdGVkLlxuICAgICAqIEBwYXJhbSBpc1VzZXJJbnB1dCBXaGV0aGVyIHRoZSBjaGFuZ2Ugd2FzIGEgcmVzdWx0IG9mIGEgdXNlciBpbnRlcmFjdGlvbi5cbiAgICAgKi9cbiAgICBzeW5jQnV0dG9uVG9nZ2xlKHRvZ2dsZTogTWNCdXR0b25Ub2dnbGUsIHNlbGVjdDogYm9vbGVhbiwgaXNVc2VySW5wdXQgPSBmYWxzZSkge1xuICAgICAgICAvLyBEZXNlbGVjdCB0aGUgY3VycmVudGx5LXNlbGVjdGVkIHRvZ2dsZSwgaWYgd2UncmUgaW4gc2luZ2xlLXNlbGVjdGlvblxuICAgICAgICAvLyBtb2RlIGFuZCB0aGUgYnV0dG9uIGJlaW5nIHRvZ2dsZWQgaXNuJ3Qgc2VsZWN0ZWQgYXQgdGhlIG1vbWVudC5cbiAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlICYmIHRoaXMuc2VsZWN0ZWQgJiYgIXRvZ2dsZS5jaGVja2VkKSB7XG4gICAgICAgICAgICAodGhpcy5zZWxlY3RlZCBhcyBNY0J1dHRvblRvZ2dsZSkuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3QodG9nZ2xlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuZGVzZWxlY3QodG9nZ2xlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE9ubHkgZW1pdCB0aGUgY2hhbmdlIGV2ZW50IGZvciB1c2VyIGlucHV0LlxuICAgICAgICBpZiAoaXNVc2VySW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdENoYW5nZUV2ZW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBOb3RlOiB3ZSBlbWl0IHRoaXMgb25lIG5vIG1hdHRlciB3aGV0aGVyIGl0IHdhcyBhIHVzZXIgaW50ZXJhY3Rpb24sIGJlY2F1c2VcbiAgICAgICAgLy8gaXQgaXMgdXNlZCBieSBBbmd1bGFyIHRvIHN5bmMgdXAgdGhlIHR3by13YXkgZGF0YSBiaW5kaW5nLlxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIGEgYnV0dG9uIHRvZ2dsZSBpcyBzZWxlY3RlZC4gKi9cbiAgICBpc1NlbGVjdGVkKHRvZ2dsZTogTWNCdXR0b25Ub2dnbGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uTW9kZWwuaXNTZWxlY3RlZCh0b2dnbGUpO1xuICAgIH1cblxuICAgIC8qKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBidXR0b24gdG9nZ2xlIHNob3VsZCBiZSBjaGVja2VkIG9uIGluaXQuICovXG4gICAgaXNQcmVjaGVja2VkKHRvZ2dsZTogTWNCdXR0b25Ub2dnbGUpIHtcbiAgICAgICAgaWYgKHRoaXMucmF3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgQXJyYXkuaXNBcnJheSh0aGlzLnJhd1ZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmF3VmFsdWUuc29tZSgodmFsdWUpID0+IHRvZ2dsZS52YWx1ZSAhPSBudWxsICYmIHZhbHVlID09PSB0b2dnbGUudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvZ2dsZS52YWx1ZSA9PT0gdGhpcy5yYXdWYWx1ZTtcbiAgICB9XG5cbiAgICAvKiogVXBkYXRlcyB0aGUgc2VsZWN0aW9uIHN0YXRlIG9mIHRoZSB0b2dnbGVzIGluIHRoZSBncm91cCBiYXNlZCBvbiBhIHZhbHVlLiAqL1xuICAgIHByaXZhdGUgc2V0U2VsZWN0aW9uQnlWYWx1ZSh2YWx1ZTogYW55IHwgYW55W10pIHtcbiAgICAgICAgdGhpcy5yYXdWYWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgIGlmICghdGhpcy5idXR0b25Ub2dnbGVzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdWYWx1ZSBtdXN0IGJlIGFuIGFycmF5IGluIG11bHRpcGxlLXNlbGVjdGlvbiBtb2RlLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKChjdXJyZW50VmFsdWU6IGFueSkgPT4gdGhpcy5zZWxlY3RWYWx1ZShjdXJyZW50VmFsdWUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VmFsdWUodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIENsZWFycyB0aGUgc2VsZWN0ZWQgdG9nZ2xlcy4gKi9cbiAgICBwcml2YXRlIGNsZWFyU2VsZWN0aW9uKCkge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuYnV0dG9uVG9nZ2xlcy5mb3JFYWNoKCh0b2dnbGUpID0+IHRvZ2dsZS5jaGVja2VkID0gZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKiBTZWxlY3RzIGEgdmFsdWUgaWYgdGhlcmUncyBhIHRvZ2dsZSB0aGF0IGNvcnJlc3BvbmRzIHRvIGl0LiAqL1xuICAgIHByaXZhdGUgc2VsZWN0VmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICBjb25zdCBjb3JyZXNwb25kaW5nT3B0aW9uID0gdGhpcy5idXR0b25Ub2dnbGVzLmZpbmQoKHRvZ2dsZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRvZ2dsZS52YWx1ZSAhPSBudWxsICYmIHRvZ2dsZS52YWx1ZSA9PT0gdmFsdWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChjb3JyZXNwb25kaW5nT3B0aW9uKSB7XG4gICAgICAgICAgICBjb3JyZXNwb25kaW5nT3B0aW9uLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3QoY29ycmVzcG9uZGluZ09wdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKiBTaW5nbGUgYnV0dG9uIGluc2lkZSBvZiBhIHRvZ2dsZSBncm91cC4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtYnV0dG9uLXRvZ2dsZScsXG4gICAgZXhwb3J0QXM6ICdtY0J1dHRvblRvZ2dsZScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgbWMtYnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIFtjbGFzcy5tYy1hY3RpdmVdPVwiY2hlY2tlZFwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgW3RhYkluZGV4XT1cInRhYkluZGV4XCJcbiAgICAgICAgICAgIChjbGljayk9XCJvblRvZ2dsZUNsaWNrKClcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9idXR0b24+XG4gICAgYCxcbiAgICBzdHlsZVVybHM6IFsnYnV0dG9uLXRvZ2dsZS5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtYnV0dG9uLXRvZ2dsZScsXG4gICAgICAgICdbY2xhc3MubWMtYnV0dG9uLXRvZ2dsZS1zdGFuZGFsb25lXSc6ICchYnV0dG9uVG9nZ2xlR3JvdXAnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0J1dHRvblRvZ2dsZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBidXR0b24gaXMgY2hlY2tlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBjaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5idXR0b25Ub2dnbGVHcm91cCA/IHRoaXMuYnV0dG9uVG9nZ2xlR3JvdXAuaXNTZWxlY3RlZCh0aGlzKSA6IHRoaXMuX2NoZWNrZWQ7XG4gICAgfVxuXG4gICAgc2V0IGNoZWNrZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy5fY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tlZCA9IG5ld1ZhbHVlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5idXR0b25Ub2dnbGVHcm91cCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uVG9nZ2xlR3JvdXAuc3luY0J1dHRvblRvZ2dsZSh0aGlzLCB0aGlzLl9jaGVja2VkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1yZXNlcnZlZC1rZXl3b3Jkc1xuICAgIHR5cGU6IFRvZ2dsZVR5cGU7XG5cbiAgICBAVmlld0NoaWxkKE1jQnV0dG9uLCB7IHN0YXRpYzogZmFsc2UgfSkgbWNCdXR0b246IE1jQnV0dG9uO1xuXG4gICAgLyoqIE1jQnV0dG9uVG9nZ2xlR3JvdXAgcmVhZHMgdGhpcyB0byBhc3NpZ24gaXRzIG93biB2YWx1ZS4gKi9cbiAgICBASW5wdXQoKSB2YWx1ZTogYW55O1xuXG4gICAgLyoqIFRhYmluZGV4IGZvciB0aGUgdG9nZ2xlLiAqL1xuICAgIEBJbnB1dCgpIHRhYkluZGV4OiBudW1iZXIgfCBudWxsO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCB8fCAodGhpcy5idXR0b25Ub2dnbGVHcm91cCAmJiB0aGlzLmJ1dHRvblRvZ2dsZUdyb3VwLmRpc2FibGVkKTtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGdyb3VwIHZhbHVlIGNoYW5nZXMuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZTogRXZlbnRFbWl0dGVyPE1jQnV0dG9uVG9nZ2xlQ2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWNCdXR0b25Ub2dnbGVDaGFuZ2U+KCk7XG5cbiAgICBwcml2YXRlIGlzU2luZ2xlU2VsZWN0b3IgPSBmYWxzZTtcbiAgICBwcml2YXRlIF9jaGVja2VkID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAT3B0aW9uYWwoKSBwdWJsaWMgYnV0dG9uVG9nZ2xlR3JvdXA6IE1jQnV0dG9uVG9nZ2xlR3JvdXAsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWZcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pc1NpbmdsZVNlbGVjdG9yID0gdGhpcy5idXR0b25Ub2dnbGVHcm91cCAmJiAhdGhpcy5idXR0b25Ub2dnbGVHcm91cC5tdWx0aXBsZTtcbiAgICAgICAgdGhpcy50eXBlID0gdGhpcy5pc1NpbmdsZVNlbGVjdG9yID8gJ3JhZGlvJyA6ICdjaGVja2JveCc7XG5cbiAgICAgICAgaWYgKHRoaXMuYnV0dG9uVG9nZ2xlR3JvdXAgJiYgdGhpcy5idXR0b25Ub2dnbGVHcm91cC5pc1ByZWNoZWNrZWQodGhpcykpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCB0cnVlKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgY29uc3QgZ3JvdXAgPSB0aGlzLmJ1dHRvblRvZ2dsZUdyb3VwO1xuXG4gICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICAvLyBSZW1vdmUgdGhlIHRvZ2dsZSBmcm9tIHRoZSBzZWxlY3Rpb24gb25jZSBpdCdzIGRlc3Ryb3llZC4gTmVlZHMgdG8gaGFwcGVuXG4gICAgICAgIC8vIG9uIHRoZSBuZXh0IHRpY2sgaW4gb3JkZXIgdG8gYXZvaWQgXCJjaGFuZ2VkIGFmdGVyIGNoZWNrZWRcIiBlcnJvcnMuXG4gICAgICAgIGlmIChncm91cCAmJiBncm91cC5pc1NlbGVjdGVkKHRoaXMpKSB7XG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IGdyb3VwLnN5bmNCdXR0b25Ub2dnbGUodGhpcywgZmFsc2UpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBGb2N1c2VzIHRoZSBidXR0b24uICovXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB0aGUgYnV0dG9uIHRvZ2dsZSBkdWUgdG8gYW4gaW50ZXJhY3Rpb24gd2l0aCB0aGUgdW5kZXJseWluZyBuYXRpdmUgYnV0dG9uLiAqL1xuICAgIG9uVG9nZ2xlQ2xpY2soKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNvbnN0IG5ld0NoZWNrZWQgPSB0aGlzLmlzU2luZ2xlU2VsZWN0b3IgPyB0cnVlIDogIXRoaXMuX2NoZWNrZWQ7XG5cbiAgICAgICAgaWYgKG5ld0NoZWNrZWQgIT09IHRoaXMuX2NoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrZWQgPSBuZXdDaGVja2VkO1xuICAgICAgICAgICAgaWYgKHRoaXMuYnV0dG9uVG9nZ2xlR3JvdXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvblRvZ2dsZUdyb3VwLnN5bmNCdXR0b25Ub2dnbGUodGhpcywgdGhpcy5fY2hlY2tlZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25Ub2dnbGVHcm91cC5vblRvdWNoZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBFbWl0IGEgY2hhbmdlIGV2ZW50IHdoZW4gaXQncyB0aGUgc2luZ2xlIHNlbGVjdG9yXG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQobmV3IE1jQnV0dG9uVG9nZ2xlQ2hhbmdlKHRoaXMsIHRoaXMudmFsdWUpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXJrcyB0aGUgYnV0dG9uIHRvZ2dsZSBhcyBuZWVkaW5nIGNoZWNraW5nIGZvciBjaGFuZ2UgZGV0ZWN0aW9uLlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIGV4cG9zZWQgYmVjYXVzZSB0aGUgcGFyZW50IGJ1dHRvbiB0b2dnbGUgZ3JvdXAgd2lsbCBkaXJlY3RseVxuICAgICAqIHVwZGF0ZSBib3VuZCBwcm9wZXJ0aWVzIG9mIHRoZSByYWRpbyBidXR0b24uXG4gICAgICovXG4gICAgbWFya0ZvckNoZWNrKCkge1xuICAgICAgICAvLyBXaGVuIHRoZSBncm91cCB2YWx1ZSBjaGFuZ2VzLCB0aGUgYnV0dG9uIHdpbGwgbm90IGJlIG5vdGlmaWVkLlxuICAgICAgICAvLyBVc2UgYG1hcmtGb3JDaGVja2AgdG8gZXhwbGljaXQgdXBkYXRlIGJ1dHRvbiB0b2dnbGUncyBzdGF0dXMuXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxufVxuIl19