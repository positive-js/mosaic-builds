import { forwardRef, EventEmitter, Directive, ChangeDetectorRef, Input, ContentChildren, Output, Component, ViewEncapsulation, ChangeDetectionStrategy, Optional, ElementRef, ViewChild, NgModule } from '@angular/core';
import { McButton, McButtonModule } from '@ptsecurity/mosaic/button';
import { McCommonModule } from '@ptsecurity/mosaic/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Provider Expression that allows mc-button-toggle-group to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const MC_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => McButtonToggleGroup),
    multi: true
};
/** Change event object emitted by MсButtonToggle. */
class McButtonToggleChange {
    constructor(
    /** The MсButtonToggle that emits the event. */
    source, 
    /** The value assigned to the MсButtonToggle. */
    value) {
        this.source = source;
        this.value = value;
    }
}
/** Exclusive selection button toggle group that behaves like a radio-button group. */
class McButtonToggleGroup {
    constructor(_changeDetector) {
        this._changeDetector = _changeDetector;
        /**
         * Event that emits whenever the value of the group changes.
         * Used to facilitate two-way data binding.
         * @docs-private
         */
        this.valueChange = new EventEmitter();
        /** Event emitted when the group's value changes. */
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
        /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
        // tslint:disable-next-line:no-empty
        this.onTouched = () => { };
    }
    /** Whether the toggle group is vertical. */
    get vertical() {
        return this._vertical;
    }
    set vertical(value) {
        this._vertical = coerceBooleanProperty(value);
    }
    /** Value of the toggle group. */
    get value() {
        const selected = this.selectionModel ? this.selectionModel.selected : [];
        if (this.multiple) {
            return selected.map((toggle) => toggle.value);
        }
        return selected[0] ? selected[0].value : undefined;
    }
    set value(newValue) {
        this.setSelectionByValue(newValue);
        this.valueChange.emit(this.value);
    }
    /** Selected button toggles in the group. */
    get selected() {
        const selected = this.selectionModel.selected;
        return this.multiple ? selected : (selected[0] || null);
    }
    /** Whether multiple button toggles can be selected. */
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        this._multiple = coerceBooleanProperty(value);
    }
    /** Whether multiple button toggle group is disabled. */
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        if (!this.buttonToggles) {
            return;
        }
        this.buttonToggles.forEach((toggle) => toggle.markForCheck());
    }
    ngOnInit() {
        this.selectionModel = new SelectionModel(this.multiple, undefined, false);
    }
    ngAfterContentInit() {
        this.selectionModel.select(...this.buttonToggles.filter((toggle) => toggle.checked));
        this.disabled = this._disabled;
    }
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value Value to be set to the model.
     */
    writeValue(value) {
        this.value = value;
        this._changeDetector.markForCheck();
    }
    // Implemented as part of ControlValueAccessor.
    registerOnChange(fn) {
        this.controlValueAccessorChangeFn = fn;
    }
    // Implemented as part of ControlValueAccessor.
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    // Implemented as part of ControlValueAccessor.
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /** Dispatch change event with current selection and group value. */
    emitChangeEvent() {
        const selected = this.selected;
        const source = Array.isArray(selected) ? selected[selected.length - 1] : selected;
        const event = new McButtonToggleChange(source, this.value);
        this.controlValueAccessorChangeFn(event.value);
        this.change.emit(event);
    }
    /**
     * Syncs a button toggle's selected state with the model value.
     * @param toggle Toggle to be synced.
     * @param select Whether the toggle should be selected.
     * @param isUserInput Whether the change was a result of a user interaction.
     */
    syncButtonToggle(toggle, select, isUserInput = false) {
        // Deselect the currently-selected toggle, if we're in single-selection
        // mode and the button being toggled isn't selected at the moment.
        if (!this.multiple && this.selected && !toggle.checked) {
            this.selected.checked = false;
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
    /** Checks whether a button toggle is selected. */
    isSelected(toggle) {
        return this.selectionModel.isSelected(toggle);
    }
    /** Determines whether a button toggle should be checked on init. */
    isPrechecked(toggle) {
        if (this.rawValue === undefined) {
            return false;
        }
        if (this.multiple && Array.isArray(this.rawValue)) {
            return this.rawValue.some((value) => toggle.value != null && value === toggle.value);
        }
        return toggle.value === this.rawValue;
    }
    /** Updates the selection state of the toggles in the group based on a value. */
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
    /** Clears the selected toggles. */
    clearSelection() {
        this.selectionModel.clear();
        this.buttonToggles.forEach((toggle) => toggle.checked = false);
    }
    /** Selects a value if there's a toggle that corresponds to it. */
    selectValue(value) {
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
    buttonToggles: [{ type: ContentChildren, args: [forwardRef(() => McButtonToggle),] }],
    disabled: [{ type: Input }],
    valueChange: [{ type: Output }],
    change: [{ type: Output }]
};
/** Single button inside of a toggle group. */
class McButtonToggle {
    constructor(buttonToggleGroup, changeDetectorRef, focusMonitor, element) {
        this.buttonToggleGroup = buttonToggleGroup;
        this.changeDetectorRef = changeDetectorRef;
        this.focusMonitor = focusMonitor;
        this.element = element;
        /** Event emitted when the group value changes. */
        this.change = new EventEmitter();
        this.isSingleSelector = false;
        this._checked = false;
        this._disabled = false;
    }
    /** Whether the button is checked. */
    get checked() {
        return this.buttonToggleGroup ? this.buttonToggleGroup.isSelected(this) : this._checked;
    }
    set checked(value) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._checked) {
            this._checked = newValue;
            if (this.buttonToggleGroup) {
                this.buttonToggleGroup.syncButtonToggle(this, this._checked);
            }
            this.changeDetectorRef.markForCheck();
        }
    }
    get disabled() {
        return this._disabled || (this.buttonToggleGroup && this.buttonToggleGroup.disabled);
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    ngOnInit() {
        this.isSingleSelector = this.buttonToggleGroup && !this.buttonToggleGroup.multiple;
        this.type = this.isSingleSelector ? 'radio' : 'checkbox';
        if (this.buttonToggleGroup && this.buttonToggleGroup.isPrechecked(this)) {
            this.checked = true;
        }
        this.focusMonitor.monitor(this.element.nativeElement, true);
    }
    ngOnDestroy() {
        const group = this.buttonToggleGroup;
        this.focusMonitor.stopMonitoring(this.element.nativeElement);
        // Remove the toggle from the selection once it's destroyed. Needs to happen
        // on the next tick in order to avoid "changed after checked" errors.
        if (group && group.isSelected(this)) {
            Promise.resolve().then(() => group.syncButtonToggle(this, false));
        }
    }
    /** Focuses the button. */
    focus() {
        this.element.nativeElement.focus();
    }
    /** Checks the button toggle due to an interaction with the underlying native button. */
    onToggleClick() {
        if (this.disabled) {
            return;
        }
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
                styles: [".mc-group{display:flex;flex-direction:row}.mc-group .mc-group_justified>.mc-group-item{width:100%}.mc-group .mc-group-item+.mc-group-item{margin-left:calc(-1 * var(--mc-button-size-border-width, 1px))}.mc-group>.mc-group-item:first-child:not(:last-child),.mc-group>.mc-group-item:first-child:not(:last-child)>.mc-form-field__container{border-bottom-right-radius:0;border-top-right-radius:0}.mc-group>.mc-group-item:last-child:not(:first-child),.mc-group>.mc-group-item:last-child:not(:first-child)>.mc-form-field__container{border-bottom-left-radius:0;border-top-left-radius:0}.mc-group>.mc-group-item:not(:first-child):not(:last-child),.mc-group>.mc-group-item:not(:first-child):not(:last-child)>.mc-form-field__container{border-radius:0}.mc-vertical-group{display:flex;flex-direction:column}.mc-vertical-group>.mc-group-item:first-child:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:var(--mc-button-size-border-radius,3px)}.mc-vertical-group>.mc-group-item:first-child:not(:last-child)>.mc-form-field__container{border-bottom-right-radius:0;border-bottom-left-radius:0}.mc-vertical-group>.mc-group-item:last-child:not(:first-child){border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:var(--mc-button-size-border-radius,3px)}.mc-vertical-group>.mc-group-item:last-child:not(:first-child)>.mc-form-field__container{border-top-right-radius:0;border-top-left-radius:0}.mc-vertical-group>.mc-group-item:not(:first-child):not(:last-child),.mc-vertical-group>.mc-group-item:not(:first-child):not(:last-child)>.mc-form-field__container{border-radius:0}.mc-vertical-group .mc-group-item+.mc-group-item{margin-top:calc(-1 * var(--mc-button-size-border-width, 1px))}.mc-button-toggle-group{display:flex;flex-direction:row}.mc-button-toggle-group .mc-button-toggle:first-of-type:not(:last-of-type)>.mc-button,.mc-button-toggle-group .mc-button-toggle:first-of-type:not(:last-of-type)>.mc-icon-button{border-bottom-right-radius:0;border-top-right-radius:0;border-bottom-left-radius:var(--mc-button-toggle-size-border-radius,3px);border-top-left-radius:var(--mc-button-toggle-size-border-radius,3px)}.mc-button-toggle-group .mc-button-toggle:last-of-type:not(:first-of-type)>.mc-button,.mc-button-toggle-group .mc-button-toggle:last-of-type:not(:first-of-type)>.mc-icon-button{border-bottom-left-radius:0;border-top-left-radius:0;border-bottom-right-radius:var(--mc-button-toggle-size-border-radius,3px);border-top-right-radius:var(--mc-button-toggle-size-border-radius,3px)}.mc-button-toggle-group .mc-button-toggle:not(:first-of-type):not(:last-of-type)>.mc-button,.mc-button-toggle-group .mc-button-toggle:not(:first-of-type):not(:last-of-type)>.mc-icon-button{border-radius:0}.mc-button-toggle-group .mc-button-toggle[disabled]{outline:0}.mc-button-toggle-group:not(.mc-button-toggle_vertical) .mc-button-toggle:not([disabled])+.mc-button-toggle:not([disabled]){margin-left:calc(-1 * var(--mc-button-toggle-size-border-size, 1px))}.mc-button-toggle_vertical{flex-direction:column}.mc-button-toggle_vertical .mc-button-toggle+.mc-button-toggle{border-left:none;border-right:none}.mc-button-toggle_vertical .mc-button-toggle:not([disabled])+.mc-button-toggle:not([disabled]){margin-top:calc(-1 * var(--mc-button-toggle-size-border-size, 1px))}.mc-button-toggle_vertical .mc-button-toggle .mc-button,.mc-button-toggle_vertical .mc-button-toggle .mc-icon-button{width:100%}.mc-button-toggle_vertical .mc-button-toggle:first-child:not(:last-child)>.mc-button,.mc-button-toggle_vertical .mc-button-toggle:first-child:not(:last-child)>.mc-icon-button{border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:var(--mc-button-toggle-size-border-radius,3px);border-top-left-radius:var(--mc-button-toggle-size-border-radius,3px)}.mc-button-toggle_vertical .mc-button-toggle:last-child:not(:first-child)>.mc-button,.mc-button-toggle_vertical .mc-button-toggle:last-child:not(:first-child)>.mc-icon-button{border-top-right-radius:0;border-top-left-radius:0;border-bottom-right-radius:var(--mc-button-toggle-size-border-radius,3px);border-bottom-left-radius:var(--mc-button-toggle-size-border-radius,3px)}.mc-button-toggle_vertical .mc-button-toggle:not(:first-child):not(:last-child)>.mc-button,.mc-button-toggle_vertical .mc-button-toggle:not(:first-child):not(:last-child)>.mc-icon-button{border-radius:0}.mc-button-toggle-standalone{box-shadow:none}"]
            },] }
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

class McButtonToggleModule {
}
McButtonToggleModule.decorators = [
    { type: NgModule, args: [{
                imports: [McCommonModule, McButtonModule],
                exports: [McCommonModule, McButtonToggleGroup, McButtonToggle],
                declarations: [McButtonToggleGroup, McButtonToggle]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { MC_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR, McButtonToggle, McButtonToggleChange, McButtonToggleGroup, McButtonToggleModule };
//# sourceMappingURL=ptsecurity-mosaic-button-toggle.js.map
