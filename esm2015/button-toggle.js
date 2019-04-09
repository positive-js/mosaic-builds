/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Input, Optional, Output, ViewEncapsulation, ViewChild, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusMonitor } from '@ptsecurity/cdk/a11y';
import { coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { SelectionModel } from '@ptsecurity/cdk/collections';
import { McButton, McButtonModule } from '@ptsecurity/mosaic/button';
import { McCommonModule } from '@ptsecurity/mosaic/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Provider Expression that allows mc-button-toggle-group to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * \@docs-private
 * @type {?}
 */
const MC_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => McButtonToggleGroup),
    multi: true
};
/**
 * Change event object emitted by MсButtonToggle.
 */
class McButtonToggleChange {
    /**
     * @param {?} source
     * @param {?} value
     */
    constructor(source, value) {
        this.source = source;
        this.value = value;
    }
}
/**
 * Exclusive selection button toggle group that behaves like a radio-button group.
 */
class McButtonToggleGroup {
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
        this.controlValueAccessorChangeFn = () => { };
        /**
         * onTouch function registered via registerOnTouch (ControlValueAccessor).
         */
        // tslint:disable-next-line:no-empty
        this.onTouched = () => { };
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
            return selected.map((toggle) => toggle.value);
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
        this.buttonToggles.forEach((toggle) => toggle.markForCheck());
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
        this.selectionModel.select(...this.buttonToggles.filter((toggle) => toggle.checked));
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
            return this.rawValue.some((value) => toggle.value != null && value === toggle.value);
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
            value.forEach((currentValue) => this.selectValue(currentValue));
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
        this.buttonToggles.forEach((toggle) => toggle.checked = false);
    }
    /**
     * Selects a value if there's a toggle that corresponds to it.
     * @private
     * @param {?} value
     * @return {?}
     */
    selectValue(value) {
        /** @type {?} */
        const correspondingOption = this.buttonToggles.find((toggle) => {
            return toggle.value != null && toggle.value === value;
        });
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
                    '[class.mc-button-toggle-vertical]': 'vertical'
                },
                exportAs: 'mcButtonToggleGroup'
            },] },
];
/** @nocollapse */
McButtonToggleGroup.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
McButtonToggleGroup.propDecorators = {
    vertical: [{ type: Input }],
    value: [{ type: Input }],
    multiple: [{ type: Input }],
    buttonToggles: [{ type: ContentChildren, args: [forwardRef(() => McButtonToggle),] }],
    disabled: [{ type: Input }],
    valueChange: [{ type: Output }],
    change: [{ type: Output }]
};
/**
 * Single button inside of a toggle group.
 */
class McButtonToggle {
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
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
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
            Promise.resolve().then(() => group.syncButtonToggle(this, false));
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
                template: `
        <button
            mc-button
            [disabled]="disabled"
            [attr.tabindex]="disabled ? -1 : tabIndex"
            (click)="onToggleClick()">
            <ng-content></ng-content>
        </button>
    `,
                styles: [".mc-button-toggle-group{display:flex;flex-direction:row}.mc-button-toggle-group:not(.mc-button-toggle-vertical) .mc-button-toggle:not([disabled])+.mc-button-toggle:not([disabled]){margin-left:-1px}.mc-button-toggle-group .mc-button-toggle:first-of-type:not(:last-of-type)>.mc-button,.mc-button-toggle-group .mc-button-toggle:first-of-type:not(:last-of-type)>.mc-icon-button{border-bottom-right-radius:0;border-top-right-radius:0}.mc-button-toggle-group .mc-button-toggle:last-of-type:not(:first-of-type)>.mc-button,.mc-button-toggle-group .mc-button-toggle:last-of-type:not(:first-of-type)>.mc-icon-button{border-bottom-left-radius:0;border-top-left-radius:0}.mc-button-toggle-group .mc-button-toggle:not(:first-of-type):not(:last-of-type)>.mc-button,.mc-button-toggle-group .mc-button-toggle:not(:first-of-type):not(:last-of-type)>.mc-icon-button{border-radius:0}.mc-button-toggle-vertical{flex-direction:column}.mc-button-toggle-vertical .mc-button-toggle:not([disabled])+.mc-button-toggle:not([disabled]){margin-top:-1px}.mc-button-toggle-vertical .mc-button-toggle .mc-button,.mc-button-toggle-vertical .mc-button-toggle .mc-icon-button{width:100%}.mc-button-toggle-vertical .mc-button-toggle:first-child:not(:last-child)>.mc-button,.mc-button-toggle-vertical .mc-button-toggle:first-child:not(:last-child)>.mc-icon-button{border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-button-toggle-vertical .mc-button-toggle:last-child:not(:first-child)>.mc-button,.mc-button-toggle-vertical .mc-button-toggle:last-child:not(:first-child)>.mc-icon-button{border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-button-toggle-vertical .mc-button-toggle:not(:first-child):not(:last-child)>.mc-button,.mc-button-toggle-vertical .mc-button-toggle:not(:first-child):not(:last-child)>.mc-icon-button{border-radius:0}"],
                encapsulation: ViewEncapsulation.None,
                exportAs: 'mcButtonToggle',
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '[class.mc-button-toggle-standalone]': '!buttonToggleGroup',
                    '[class.mc-button-toggle-checked]': 'checked',
                    class: 'mc-button-toggle',
                    // Always reset the tabindex to -1 so it doesn't conflict with the one on the `button`,
                    // but can still receive focus from things like cdkFocusInitial.
                    '[attr.tabindex]': '-1',
                    '[attr.disabled]': 'disabled || null',
                    '(focus)': 'focus()'
                }
            },] },
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
    mcButton: [{ type: ViewChild, args: [McButton,] }],
    value: [{ type: Input }],
    tabIndex: [{ type: Input }],
    disabled: [{ type: Input }],
    change: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McButtonToggleModule {
}
McButtonToggleModule.decorators = [
    { type: NgModule, args: [{
                imports: [McCommonModule, McButtonModule],
                exports: [McCommonModule, McButtonToggleGroup, McButtonToggle],
                declarations: [McButtonToggleGroup, McButtonToggle]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McButtonToggleModule, MC_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR, McButtonToggleChange, McButtonToggleGroup, McButtonToggle };
//# sourceMappingURL=button-toggle.js.map
