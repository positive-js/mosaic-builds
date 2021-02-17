/**
 * @fileoverview added by tsickle
 * Generated from: button-toggle.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                styles: [".mc-group{display:flex;flex-direction:row}.mc-group .mc-group_justified>.mc-group-item{width:100%}.mc-group .mc-group-item+.mc-group-item{margin-left:calc(var(--mc-button-size-border-width, 1px)*-1)}.mc-group>.mc-group-item:first-child:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0}.mc-group>.mc-group-item:first-child:not(:last-child)>.mc-form-field__container{border-bottom-right-radius:0;border-top-right-radius:0}.mc-group>.mc-group-item:last-child:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0}.mc-group>.mc-group-item:last-child:not(:first-child)>.mc-form-field__container{border-bottom-left-radius:0;border-top-left-radius:0}.mc-group>.mc-group-item:not(:first-child):not(:last-child){border-radius:0}.mc-group>.mc-group-item:not(:first-child):not(:last-child)>.mc-form-field__container{border-radius:0}.mc-vertical-group{display:flex;flex-direction:column}.mc-vertical-group>.mc-group-item:first-child:not(:last-child){border-bottom-left-radius:0;border-bottom-right-radius:0;border-top-right-radius:var(--mc-button-size-border-radius,3px)}.mc-vertical-group>.mc-group-item:first-child:not(:last-child)>.mc-form-field__container{border-bottom-left-radius:0;border-bottom-right-radius:0}.mc-vertical-group>.mc-group-item:last-child:not(:first-child){border-bottom-left-radius:var(--mc-button-size-border-radius,3px);border-top-left-radius:0;border-top-right-radius:0}.mc-vertical-group>.mc-group-item:last-child:not(:first-child)>.mc-form-field__container{border-top-left-radius:0;border-top-right-radius:0}.mc-vertical-group>.mc-group-item:not(:first-child):not(:last-child){border-radius:0}.mc-vertical-group>.mc-group-item:not(:first-child):not(:last-child)>.mc-form-field__container{border-radius:0}.mc-vertical-group .mc-group-item+.mc-group-item{margin-top:calc(var(--mc-button-size-border-width, 1px)*-1)}.mc-button-toggle-group{display:flex;flex-direction:row}.mc-button-toggle-group .mc-button-toggle:first-of-type:not(:last-of-type)>.mc-button,.mc-button-toggle-group .mc-button-toggle:first-of-type:not(:last-of-type)>.mc-icon-button{border-bottom-right-radius:0;border-top-right-radius:0}.mc-button-toggle-group .mc-button-toggle:last-of-type:not(:first-of-type)>.mc-button,.mc-button-toggle-group .mc-button-toggle:last-of-type:not(:first-of-type)>.mc-icon-button{border-bottom-left-radius:0;border-top-left-radius:0}.mc-button-toggle-group .mc-button-toggle:not(:first-of-type):not(:last-of-type)>.mc-button,.mc-button-toggle-group .mc-button-toggle:not(:first-of-type):not(:last-of-type)>.mc-icon-button{border-radius:0}.mc-button-toggle-group .mc-button-toggle[disabled]{outline:0}.mc-button-toggle-group:not(.mc-button-toggle_vertical) .mc-button-toggle:not([disabled])+.mc-button-toggle:not([disabled]){margin-left:calc(var(--mc-button-toggle-size-border-size, 1px)*-1)}.mc-button-toggle_vertical{flex-direction:column}.mc-button-toggle_vertical .mc-button-toggle+.mc-button-toggle{border-left:none;border-right:none}.mc-button-toggle_vertical .mc-button-toggle:not([disabled])+.mc-button-toggle:not([disabled]){margin-top:calc(var(--mc-button-toggle-size-border-size, 1px)*-1)}.mc-button-toggle_vertical .mc-button-toggle .mc-button,.mc-button-toggle_vertical .mc-button-toggle .mc-icon-button{width:100%}.mc-button-toggle_vertical .mc-button-toggle:first-child:not(:last-child)>.mc-button,.mc-button-toggle_vertical .mc-button-toggle:first-child:not(:last-child)>.mc-icon-button{border-bottom-left-radius:0;border-bottom-right-radius:0;border-top-right-radius:var(--mc-button-toggle-size-border-radius,3px)}.mc-button-toggle_vertical .mc-button-toggle:last-child:not(:first-child)>.mc-button,.mc-button-toggle_vertical .mc-button-toggle:last-child:not(:first-child)>.mc-icon-button{border-bottom-left-radius:var(--mc-button-toggle-size-border-radius,3px);border-top-left-radius:0;border-top-right-radius:0}.mc-button-toggle_vertical .mc-button-toggle:not(:first-child):not(:last-child)>.mc-button,.mc-button-toggle_vertical .mc-button-toggle:not(:first-child):not(:last-child)>.mc-icon-button{border-radius:0}.mc-button-toggle-standalone{box-shadow:none}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLXRvZ2dsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9idXR0b24tdG9nZ2xlLyIsInNvdXJjZXMiOlsiYnV0dG9uLXRvZ2dsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFFSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7Ozs7QUFXckQsTUFBTSxPQUFPLHFDQUFxQyxHQUFRO0lBQ3RELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixFQUFDO0lBQ2xELEtBQUssRUFBRSxJQUFJO0NBQ2Q7Ozs7QUFHRCxNQUFNLE9BQU8sb0JBQW9COzs7OztJQUM3QixZQUVXLE1BQXNCLEVBRXRCLEtBQVU7UUFGVixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUV0QixVQUFLLEdBQUwsS0FBSyxDQUFLO0lBQ2xCLENBQUM7Q0FDUDs7Ozs7O0lBSk8sc0NBQTZCOzs7OztJQUU3QixxQ0FBaUI7Ozs7O0FBZXpCLE1BQU0sT0FB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QTRDOzs7OztJQUM1QyxzQ0FBa0M7Ozs7O0lBQ2xDLGlDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWNCdXR0b24gfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvYnV0dG9uJztcblxuXG4vKiogQWNjZXB0YWJsZSB0eXBlcyBmb3IgYSBidXR0b24gdG9nZ2xlLiAqL1xuZXhwb3J0IHR5cGUgVG9nZ2xlVHlwZSA9ICdjaGVja2JveCcgfCAncmFkaW8nO1xuXG4vKipcbiAqIFByb3ZpZGVyIEV4cHJlc3Npb24gdGhhdCBhbGxvd3MgbWMtYnV0dG9uLXRvZ2dsZS1ncm91cCB0byByZWdpc3RlciBhcyBhIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICogVGhpcyBhbGxvd3MgaXQgdG8gc3VwcG9ydCBbKG5nTW9kZWwpXS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IE1DX0JVVFRPTl9UT0dHTEVfR1JPVVBfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNY0J1dHRvblRvZ2dsZUdyb3VwKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqIENoYW5nZSBldmVudCBvYmplY3QgZW1pdHRlZCBieSBN0YFCdXR0b25Ub2dnbGUuICovXG5leHBvcnQgY2xhc3MgTWNCdXR0b25Ub2dnbGVDaGFuZ2Uge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAvKiogVGhlIE3RgUJ1dHRvblRvZ2dsZSB0aGF0IGVtaXRzIHRoZSBldmVudC4gKi9cbiAgICAgICAgcHVibGljIHNvdXJjZTogTWNCdXR0b25Ub2dnbGUsXG4gICAgICAgIC8qKiBUaGUgdmFsdWUgYXNzaWduZWQgdG8gdGhlIE3RgUJ1dHRvblRvZ2dsZS4gKi9cbiAgICAgICAgcHVibGljIHZhbHVlOiBhbnlcbiAgICApIHt9XG59XG5cbi8qKiBFeGNsdXNpdmUgc2VsZWN0aW9uIGJ1dHRvbiB0b2dnbGUgZ3JvdXAgdGhhdCBiZWhhdmVzIGxpa2UgYSByYWRpby1idXR0b24gZ3JvdXAuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLWJ1dHRvbi10b2dnbGUtZ3JvdXAnLFxuICAgIHByb3ZpZGVyczogW01DX0JVVFRPTl9UT0dHTEVfR1JPVVBfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgcm9sZTogJ2dyb3VwJyxcbiAgICAgICAgY2xhc3M6ICdtYy1idXR0b24tdG9nZ2xlLWdyb3VwJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1idXR0b24tdG9nZ2xlX3ZlcnRpY2FsXSc6ICd2ZXJ0aWNhbCdcbiAgICB9LFxuICAgIGV4cG9ydEFzOiAnbWNCdXR0b25Ub2dnbGVHcm91cCdcbn0pXG5leHBvcnQgY2xhc3MgTWNCdXR0b25Ub2dnbGVHcm91cCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIEFmdGVyQ29udGVudEluaXQge1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRvZ2dsZSBncm91cCBpcyB2ZXJ0aWNhbC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCB2ZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnRpY2FsO1xuICAgIH1cblxuICAgIHNldCB2ZXJ0aWNhbCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl92ZXJ0aWNhbCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqIFZhbHVlIG9mIHRoZSB0b2dnbGUgZ3JvdXAuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGlvbk1vZGVsID8gdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZCA6IFtdO1xuXG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWQubWFwKCh0b2dnbGUpID0+IHRvZ2dsZS52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZWN0ZWRbMF0gPyBzZWxlY3RlZFswXS52YWx1ZSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUobmV3VmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLnNldFNlbGVjdGlvbkJ5VmFsdWUobmV3VmFsdWUpO1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqIFNlbGVjdGVkIGJ1dHRvbiB0b2dnbGVzIGluIHRoZSBncm91cC4gKi9cbiAgICBnZXQgc2VsZWN0ZWQoKTogYW55IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdGVkO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlID8gc2VsZWN0ZWQgOiAoc2VsZWN0ZWRbMF0gfHwgbnVsbCk7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgbXVsdGlwbGUgYnV0dG9uIHRvZ2dsZXMgY2FuIGJlIHNlbGVjdGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG11bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbXVsdGlwbGU7XG4gICAgfVxuXG4gICAgc2V0IG11bHRpcGxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX211bHRpcGxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKiogQ2hpbGQgYnV0dG9uIHRvZ2dsZSBidXR0b25zLiAqL1xuICAgIEBDb250ZW50Q2hpbGRyZW4oZm9yd2FyZFJlZigoKSA9PiBNY0J1dHRvblRvZ2dsZSkpIGJ1dHRvblRvZ2dsZXM6IFF1ZXJ5TGlzdDxNY0J1dHRvblRvZ2dsZT47XG5cbiAgICAvKiogV2hldGhlciBtdWx0aXBsZSBidXR0b24gdG9nZ2xlIGdyb3VwIGlzIGRpc2FibGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgICAgICBpZiAoIXRoaXMuYnV0dG9uVG9nZ2xlcykgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmJ1dHRvblRvZ2dsZXMuZm9yRWFjaCgodG9nZ2xlKSA9PiB0b2dnbGUubWFya0ZvckNoZWNrKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV2ZW50IHRoYXQgZW1pdHMgd2hlbmV2ZXIgdGhlIHZhbHVlIG9mIHRoZSBncm91cCBjaGFuZ2VzLlxuICAgICAqIFVzZWQgdG8gZmFjaWxpdGF0ZSB0d28td2F5IGRhdGEgYmluZGluZy5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBncm91cCdzIHZhbHVlIGNoYW5nZXMuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZTogRXZlbnRFbWl0dGVyPE1jQnV0dG9uVG9nZ2xlQ2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWNCdXR0b25Ub2dnbGVDaGFuZ2U+KCk7XG4gICAgcHJpdmF0ZSBfdmVydGljYWwgPSBmYWxzZTtcbiAgICBwcml2YXRlIF9tdWx0aXBsZSA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBzZWxlY3Rpb25Nb2RlbDogU2VsZWN0aW9uTW9kZWw8TWNCdXR0b25Ub2dnbGU+O1xuXG4gICAgLyoqXG4gICAgICogUmVmZXJlbmNlIHRvIHRoZSByYXcgdmFsdWUgdGhhdCB0aGUgY29uc3VtZXIgdHJpZWQgdG8gYXNzaWduLiBUaGUgcmVhbFxuICAgICAqIHZhbHVlIHdpbGwgZXhjbHVkZSBhbnkgdmFsdWVzIGZyb20gdGhpcyBvbmUgdGhhdCBkb24ndCBjb3JyZXNwb25kIHRvIGFcbiAgICAgKiB0b2dnbGUuIFVzZWZ1bCBmb3IgdGhlIGNhc2VzIHdoZXJlIHRoZSB2YWx1ZSBpcyBhc3NpZ25lZCBiZWZvcmUgdGhlIHRvZ2dsZXNcbiAgICAgKiBoYXZlIGJlZW4gaW5pdGlhbGl6ZWQgb3IgYXQgdGhlIHNhbWUgdGhhdCB0aGV5J3JlIGJlaW5nIHN3YXBwZWQgb3V0LlxuICAgICAqL1xuICAgIHByaXZhdGUgcmF3VmFsdWU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIC8qKlxuICAgICAqIFRoZSBtZXRob2QgdG8gYmUgY2FsbGVkIGluIG9yZGVyIHRvIHVwZGF0ZSBuZ01vZGVsLlxuICAgICAqIE5vdyBgbmdNb2RlbGAgYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkIGluIG11bHRpcGxlIHNlbGVjdGlvbiBtb2RlLlxuICAgICAqL1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eVxuICAgIGNvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm46ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgICAvKiogb25Ub3VjaCBmdW5jdGlvbiByZWdpc3RlcmVkIHZpYSByZWdpc3Rlck9uVG91Y2ggKENvbnRyb2xWYWx1ZUFjY2Vzc29yKS4gKi9cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcbiAgICBvblRvdWNoZWQ6ICgpID0+IGFueSA9ICgpID0+IHt9O1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwgPSBuZXcgU2VsZWN0aW9uTW9kZWw8TWNCdXR0b25Ub2dnbGU+KHRoaXMubXVsdGlwbGUsIHVuZGVmaW5lZCwgZmFsc2UpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3QoLi4udGhpcy5idXR0b25Ub2dnbGVzLmZpbHRlcigodG9nZ2xlKSA9PiB0b2dnbGUuY2hlY2tlZCkpO1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgbW9kZWwgdmFsdWUuIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgICogQHBhcmFtIHZhbHVlIFZhbHVlIHRvIGJlIHNldCB0byB0aGUgbW9kZWwuXG4gICAgICovXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCkge1xuICAgICAgICB0aGlzLmNvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4gPSBmbjtcbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICAvKiogRGlzcGF0Y2ggY2hhbmdlIGV2ZW50IHdpdGggY3VycmVudCBzZWxlY3Rpb24gYW5kIGdyb3VwIHZhbHVlLiAqL1xuICAgIGVtaXRDaGFuZ2VFdmVudCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkO1xuICAgICAgICBjb25zdCBzb3VyY2UgPSBBcnJheS5pc0FycmF5KHNlbGVjdGVkKSA/IHNlbGVjdGVkW3NlbGVjdGVkLmxlbmd0aCAtIDFdIDogc2VsZWN0ZWQ7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IE1jQnV0dG9uVG9nZ2xlQ2hhbmdlKHNvdXJjZSwgdGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMuY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbihldmVudC52YWx1ZSk7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN5bmNzIGEgYnV0dG9uIHRvZ2dsZSdzIHNlbGVjdGVkIHN0YXRlIHdpdGggdGhlIG1vZGVsIHZhbHVlLlxuICAgICAqIEBwYXJhbSB0b2dnbGUgVG9nZ2xlIHRvIGJlIHN5bmNlZC5cbiAgICAgKiBAcGFyYW0gc2VsZWN0IFdoZXRoZXIgdGhlIHRvZ2dsZSBzaG91bGQgYmUgc2VsZWN0ZWQuXG4gICAgICogQHBhcmFtIGlzVXNlcklucHV0IFdoZXRoZXIgdGhlIGNoYW5nZSB3YXMgYSByZXN1bHQgb2YgYSB1c2VyIGludGVyYWN0aW9uLlxuICAgICAqL1xuICAgIHN5bmNCdXR0b25Ub2dnbGUodG9nZ2xlOiBNY0J1dHRvblRvZ2dsZSwgc2VsZWN0OiBib29sZWFuLCBpc1VzZXJJbnB1dCA9IGZhbHNlKSB7XG4gICAgICAgIC8vIERlc2VsZWN0IHRoZSBjdXJyZW50bHktc2VsZWN0ZWQgdG9nZ2xlLCBpZiB3ZSdyZSBpbiBzaW5nbGUtc2VsZWN0aW9uXG4gICAgICAgIC8vIG1vZGUgYW5kIHRoZSBidXR0b24gYmVpbmcgdG9nZ2xlZCBpc24ndCBzZWxlY3RlZCBhdCB0aGUgbW9tZW50LlxuICAgICAgICBpZiAoIXRoaXMubXVsdGlwbGUgJiYgdGhpcy5zZWxlY3RlZCAmJiAhdG9nZ2xlLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICh0aGlzLnNlbGVjdGVkIGFzIE1jQnV0dG9uVG9nZ2xlKS5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdCh0b2dnbGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5kZXNlbGVjdCh0b2dnbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT25seSBlbWl0IHRoZSBjaGFuZ2UgZXZlbnQgZm9yIHVzZXIgaW5wdXQuXG4gICAgICAgIGlmIChpc1VzZXJJbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0Q2hhbmdlRXZlbnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5vdGU6IHdlIGVtaXQgdGhpcyBvbmUgbm8gbWF0dGVyIHdoZXRoZXIgaXQgd2FzIGEgdXNlciBpbnRlcmFjdGlvbiwgYmVjYXVzZVxuICAgICAgICAvLyBpdCBpcyB1c2VkIGJ5IEFuZ3VsYXIgdG8gc3luYyB1cCB0aGUgdHdvLXdheSBkYXRhIGJpbmRpbmcuXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICAvKiogQ2hlY2tzIHdoZXRoZXIgYSBidXR0b24gdG9nZ2xlIGlzIHNlbGVjdGVkLiAqL1xuICAgIGlzU2VsZWN0ZWQodG9nZ2xlOiBNY0J1dHRvblRvZ2dsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25Nb2RlbC5pc1NlbGVjdGVkKHRvZ2dsZSk7XG4gICAgfVxuXG4gICAgLyoqIERldGVybWluZXMgd2hldGhlciBhIGJ1dHRvbiB0b2dnbGUgc2hvdWxkIGJlIGNoZWNrZWQgb24gaW5pdC4gKi9cbiAgICBpc1ByZWNoZWNrZWQodG9nZ2xlOiBNY0J1dHRvblRvZ2dsZSkge1xuICAgICAgICBpZiAodGhpcy5yYXdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiBBcnJheS5pc0FycmF5KHRoaXMucmF3VmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYXdWYWx1ZS5zb21lKCh2YWx1ZSkgPT4gdG9nZ2xlLnZhbHVlICE9IG51bGwgJiYgdmFsdWUgPT09IHRvZ2dsZS52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9nZ2xlLnZhbHVlID09PSB0aGlzLnJhd1ZhbHVlO1xuICAgIH1cblxuICAgIC8qKiBVcGRhdGVzIHRoZSBzZWxlY3Rpb24gc3RhdGUgb2YgdGhlIHRvZ2dsZXMgaW4gdGhlIGdyb3VwIGJhc2VkIG9uIGEgdmFsdWUuICovXG4gICAgcHJpdmF0ZSBzZXRTZWxlY3Rpb25CeVZhbHVlKHZhbHVlOiBhbnkgfCBhbnlbXSkge1xuICAgICAgICB0aGlzLnJhd1ZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKCF0aGlzLmJ1dHRvblRvZ2dsZXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1ZhbHVlIG11c3QgYmUgYW4gYXJyYXkgaW4gbXVsdGlwbGUtc2VsZWN0aW9uIG1vZGUuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIHZhbHVlLmZvckVhY2goKGN1cnJlbnRWYWx1ZTogYW55KSA9PiB0aGlzLnNlbGVjdFZhbHVlKGN1cnJlbnRWYWx1ZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQ2xlYXJzIHRoZSBzZWxlY3RlZCB0b2dnbGVzLiAqL1xuICAgIHByaXZhdGUgY2xlYXJTZWxlY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5idXR0b25Ub2dnbGVzLmZvckVhY2goKHRvZ2dsZSkgPT4gdG9nZ2xlLmNoZWNrZWQgPSBmYWxzZSk7XG4gICAgfVxuXG4gICAgLyoqIFNlbGVjdHMgYSB2YWx1ZSBpZiB0aGVyZSdzIGEgdG9nZ2xlIHRoYXQgY29ycmVzcG9uZHMgdG8gaXQuICovXG4gICAgcHJpdmF0ZSBzZWxlY3RWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIGNvbnN0IGNvcnJlc3BvbmRpbmdPcHRpb24gPSB0aGlzLmJ1dHRvblRvZ2dsZXMuZmluZCgodG9nZ2xlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdG9nZ2xlLnZhbHVlICE9IG51bGwgJiYgdG9nZ2xlLnZhbHVlID09PSB2YWx1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGNvcnJlc3BvbmRpbmdPcHRpb24pIHtcbiAgICAgICAgICAgIGNvcnJlc3BvbmRpbmdPcHRpb24uY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdChjb3JyZXNwb25kaW5nT3B0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqIFNpbmdsZSBidXR0b24gaW5zaWRlIG9mIGEgdG9nZ2xlIGdyb3VwLiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1idXR0b24tdG9nZ2xlJyxcbiAgICBleHBvcnRBczogJ21jQnV0dG9uVG9nZ2xlJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBtYy1idXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgW2NsYXNzLm1jLWFjdGl2ZV09XCJjaGVja2VkXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICBbdGFiSW5kZXhdPVwidGFiSW5kZXhcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uVG9nZ2xlQ2xpY2soKVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2J1dHRvbj5cbiAgICBgLFxuICAgIHN0eWxlVXJsczogWydidXR0b24tdG9nZ2xlLnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1idXR0b24tdG9nZ2xlJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1idXR0b24tdG9nZ2xlLXN0YW5kYWxvbmVdJzogJyFidXR0b25Ub2dnbGVHcm91cCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jQnV0dG9uVG9nZ2xlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGJ1dHRvbiBpcyBjaGVja2VkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGNoZWNrZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmJ1dHRvblRvZ2dsZUdyb3VwID8gdGhpcy5idXR0b25Ub2dnbGVHcm91cC5pc1NlbGVjdGVkKHRoaXMpIDogdGhpcy5fY2hlY2tlZDtcbiAgICB9XG5cbiAgICBzZXQgY2hlY2tlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLl9jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLl9jaGVja2VkID0gbmV3VmFsdWU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmJ1dHRvblRvZ2dsZUdyb3VwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25Ub2dnbGVHcm91cC5zeW5jQnV0dG9uVG9nZ2xlKHRoaXMsIHRoaXMuX2NoZWNrZWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXJlc2VydmVkLWtleXdvcmRzXG4gICAgdHlwZTogVG9nZ2xlVHlwZTtcblxuICAgIEBWaWV3Q2hpbGQoTWNCdXR0b24sIHsgc3RhdGljOiBmYWxzZSB9KSBtY0J1dHRvbjogTWNCdXR0b247XG5cbiAgICAvKiogTWNCdXR0b25Ub2dnbGVHcm91cCByZWFkcyB0aGlzIHRvIGFzc2lnbiBpdHMgb3duIHZhbHVlLiAqL1xuICAgIEBJbnB1dCgpIHZhbHVlOiBhbnk7XG5cbiAgICAvKiogVGFiaW5kZXggZm9yIHRoZSB0b2dnbGUuICovXG4gICAgQElucHV0KCkgdGFiSW5kZXg6IG51bWJlciB8IG51bGw7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkIHx8ICh0aGlzLmJ1dHRvblRvZ2dsZUdyb3VwICYmIHRoaXMuYnV0dG9uVG9nZ2xlR3JvdXAuZGlzYWJsZWQpO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZ3JvdXAgdmFsdWUgY2hhbmdlcy4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8TWNCdXR0b25Ub2dnbGVDaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxNY0J1dHRvblRvZ2dsZUNoYW5nZT4oKTtcblxuICAgIHByaXZhdGUgaXNTaW5nbGVTZWxlY3RvciA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2NoZWNrZWQgPSBmYWxzZTtcbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBPcHRpb25hbCgpIHB1YmxpYyBidXR0b25Ub2dnbGVHcm91cDogTWNCdXR0b25Ub2dnbGVHcm91cCxcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZlxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmlzU2luZ2xlU2VsZWN0b3IgPSB0aGlzLmJ1dHRvblRvZ2dsZUdyb3VwICYmICF0aGlzLmJ1dHRvblRvZ2dsZUdyb3VwLm11bHRpcGxlO1xuICAgICAgICB0aGlzLnR5cGUgPSB0aGlzLmlzU2luZ2xlU2VsZWN0b3IgPyAncmFkaW8nIDogJ2NoZWNrYm94JztcblxuICAgICAgICBpZiAodGhpcy5idXR0b25Ub2dnbGVHcm91cCAmJiB0aGlzLmJ1dHRvblRvZ2dsZUdyb3VwLmlzUHJlY2hlY2tlZCh0aGlzKSkge1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIHRydWUpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBjb25zdCBncm91cCA9IHRoaXMuYnV0dG9uVG9nZ2xlR3JvdXA7XG5cbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgdG9nZ2xlIGZyb20gdGhlIHNlbGVjdGlvbiBvbmNlIGl0J3MgZGVzdHJveWVkLiBOZWVkcyB0byBoYXBwZW5cbiAgICAgICAgLy8gb24gdGhlIG5leHQgdGljayBpbiBvcmRlciB0byBhdm9pZCBcImNoYW5nZWQgYWZ0ZXIgY2hlY2tlZFwiIGVycm9ycy5cbiAgICAgICAgaWYgKGdyb3VwICYmIGdyb3VwLmlzU2VsZWN0ZWQodGhpcykpIHtcbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gZ3JvdXAuc3luY0J1dHRvblRvZ2dsZSh0aGlzLCBmYWxzZSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEZvY3VzZXMgdGhlIGJ1dHRvbi4gKi9cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvKiogQ2hlY2tzIHRoZSBidXR0b24gdG9nZ2xlIGR1ZSB0byBhbiBpbnRlcmFjdGlvbiB3aXRoIHRoZSB1bmRlcmx5aW5nIG5hdGl2ZSBidXR0b24uICovXG4gICAgb25Ub2dnbGVDbGljaygpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgY29uc3QgbmV3Q2hlY2tlZCA9IHRoaXMuaXNTaW5nbGVTZWxlY3RvciA/IHRydWUgOiAhdGhpcy5fY2hlY2tlZDtcblxuICAgICAgICBpZiAobmV3Q2hlY2tlZCAhPT0gdGhpcy5fY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tlZCA9IG5ld0NoZWNrZWQ7XG4gICAgICAgICAgICBpZiAodGhpcy5idXR0b25Ub2dnbGVHcm91cCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uVG9nZ2xlR3JvdXAuc3luY0J1dHRvblRvZ2dsZSh0aGlzLCB0aGlzLl9jaGVja2VkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvblRvZ2dsZUdyb3VwLm9uVG91Y2hlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEVtaXQgYSBjaGFuZ2UgZXZlbnQgd2hlbiBpdCdzIHRoZSBzaW5nbGUgc2VsZWN0b3JcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdChuZXcgTWNCdXR0b25Ub2dnbGVDaGFuZ2UodGhpcywgdGhpcy52YWx1ZSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1hcmtzIHRoZSBidXR0b24gdG9nZ2xlIGFzIG5lZWRpbmcgY2hlY2tpbmcgZm9yIGNoYW5nZSBkZXRlY3Rpb24uXG4gICAgICogVGhpcyBtZXRob2QgaXMgZXhwb3NlZCBiZWNhdXNlIHRoZSBwYXJlbnQgYnV0dG9uIHRvZ2dsZSBncm91cCB3aWxsIGRpcmVjdGx5XG4gICAgICogdXBkYXRlIGJvdW5kIHByb3BlcnRpZXMgb2YgdGhlIHJhZGlvIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBtYXJrRm9yQ2hlY2soKSB7XG4gICAgICAgIC8vIFdoZW4gdGhlIGdyb3VwIHZhbHVlIGNoYW5nZXMsIHRoZSBidXR0b24gd2lsbCBub3QgYmUgbm90aWZpZWQuXG4gICAgICAgIC8vIFVzZSBgbWFya0ZvckNoZWNrYCB0byBleHBsaWNpdCB1cGRhdGUgYnV0dG9uIHRvZ2dsZSdzIHN0YXR1cy5cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG59XG4iXX0=