/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Input, Optional, Output, ViewChild, ViewEncapsulation, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusMonitor, A11yModule } from '@ptsecurity/cdk/a11y';
import { UniqueSelectionDispatcher, UNIQUE_SELECTION_DISPATCHER_PROVIDER } from '@ptsecurity/cdk/collections';
import { mixinColor, mixinDisabled, mixinTabIndex, toBoolean, McCommonModule } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';

// Increasing integer for generating unique ids for radio components.
let nextUniqueId = 0;
/** Change event object emitted by McRadio. */
class McRadioChange {
    constructor(/** The McRadioButton that emits the change event. */
    source, /** The value of the McRadioButton. */
    value) {
        this.source = source;
        this.value = value;
    }
}
// Boilerplate for applying mixins to McRadioGroup.
/** @docs-private */
class McRadioGroupBase {
}
const _McRadioGroupMixinBase = mixinDisabled(McRadioGroupBase);
/**
 * Provider Expression that allows mc-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
const MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => McRadioGroup),
    multi: true
};
class McRadioGroup extends _McRadioGroupMixinBase {
    constructor(_changeDetector) {
        super();
        this._changeDetector = _changeDetector;
        /**
             * Event emitted when the group value changes.
             * Change events are only emitted when the value changes due to user interaction with
             * a radio button (the same behavior as `<input type-"radio">`).
             */
        this.change = new EventEmitter();
        /**
             * Selected value for group. Should equal the value of the selected radio button if there *is*
             * a corresponding radio button with a matching value. If there is *not* such a corresponding
             * radio button, this value persists to be applied in case a new radio button is added with a
             * matching value.
             */
        this._value = null;
        /** The HTML name attribute applied to radio buttons in this group. */
        this._name = `mc-radio-group-${nextUniqueId++}`;
        /** The currently selected radio button. Should match value. */
        this._selected = null;
        /** Whether the `value` has been set to its initial value. */
        this._isInitialized = false;
        /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
        this._labelPosition = 'after';
        /** Whether the radio group is disabled. */
        this._disabled = false;
        /** Whether the radio group is required. */
        this._required = false;
        /** The method to be called in order to update ngModel */
        this.controlValueAccessorChangeFn = () => { };
        /**
             * onTouch function registered via registerOnTouch (ControlValueAccessor).
             * @docs-private
             */
        this.onTouched = () => { };
    }
    /** Name of the radio button group. All radio buttons inside this group will use this name. */
    get name() { return this._name; }
    set name(value) {
        this._name = value;
        this.updateRadioButtonNames();
    }
    /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
    get labelPosition() {
        return this._labelPosition;
    }
    set labelPosition(v) {
        this._labelPosition = v === 'before' ? 'before' : 'after';
        this.markRadiosForCheck();
    }
    /** Value of the radio button. */
    get value() { return this._value; }
    set value(newValue) {
        if (this._value !== newValue) {
            // Set this before proceeding to ensure no circular loop occurs with selection.
            this._value = newValue;
            this.updateSelectedRadioFromValue();
            this.checkSelectedRadioButton();
        }
    }
    checkSelectedRadioButton() {
        if (this._selected && !this._selected.checked) {
            this._selected.checked = true;
        }
    }
    /** Whether the radio button is selected. */
    get selected() { return this._selected; }
    set selected(selected) {
        this._selected = selected;
        this.value = selected ? selected.value : null;
        this.checkSelectedRadioButton();
    }
    /** Whether the radio group is disabled */
    get disabled() { return this._disabled; }
    set disabled(value) {
        this._disabled = toBoolean(value);
        this.markRadiosForCheck();
    }
    /** Whether the radio group is required */
    get required() { return this._required; }
    set required(value) {
        this._required = toBoolean(value);
        this.markRadiosForCheck();
    }
    /**
         * Initialize properties once content children are available.
         * This allows us to propagate relevant attributes to associated buttons.
         */
    ngAfterContentInit() {
        // Mark this component as initialized in AfterContentInit because the initial value can
        // possibly be set by NgModel on McRadioGroup, and it is possible that the OnInit of the
        // NgModel occurs *after* the OnInit of the McRadioGroup.
        this._isInitialized = true;
    }
    /**
         * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
         * radio buttons upon their blur.
         */
    touch() {
        if (this.onTouched) {
            this.onTouched();
        }
    }
    /** Dispatch change event with current selection and group value. */
    emitChangeEvent() {
        if (this._isInitialized) {
            this.change.emit(new McRadioChange((this._selected), this._value));
        }
    }
    markRadiosForCheck() {
        if (this._radios) {
            this._radios.forEach((radio) => radio.markForCheck());
        }
    }
    /**
         * Sets the model value. Implemented as part of ControlValueAccessor.
         * @param value
         */
    writeValue(value) {
        this.value = value;
        this._changeDetector.markForCheck();
    }
    /**
         * Registers a callback to be triggered when the model value changes.
         * Implemented as part of ControlValueAccessor.
         * @param fn Callback to be registered.
         */
    registerOnChange(fn) {
        this.controlValueAccessorChangeFn = fn;
    }
    /**
         * Registers a callback to be triggered when the control is touched.
         * Implemented as part of ControlValueAccessor.
         * @param fn Callback to be registered.
         */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
         * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
         * @param isDisabled Whether the control should be disabled.
         */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this._changeDetector.markForCheck();
    }
    updateRadioButtonNames() {
        if (this._radios) {
            this._radios.forEach((radio) => {
                radio.name = this.name;
            });
        }
    }
    /** Updates the `selected` radio button from the internal _value state. */
    updateSelectedRadioFromValue() {
        // If the value already matches the selected radio, do nothing.
        const isAlreadySelected = this._selected != null && this._selected.value === this._value;
        if (this._radios != null && !isAlreadySelected) {
            this._selected = null;
            this._radios.forEach((radio) => {
                radio.checked = this.value === radio.value;
                if (radio.checked) {
                    this._selected = radio;
                }
            });
        }
    }
}
McRadioGroup.decorators = [
    { type: Directive, args: [{
                selector: 'mc-radio-group',
                exportAs: 'mcRadioGroup',
                providers: [MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
                host: {
                    'role': 'radiogroup',
                    'class': 'mc-radio-group'
                },
                inputs: ['disabled']
            },] },
];
/** @nocollapse */
McRadioGroup.ctorParameters = () => [
    { type: ChangeDetectorRef, },
];
McRadioGroup.propDecorators = {
    "change": [{ type: Output },],
    "_radios": [{ type: ContentChildren, args: [forwardRef(() => McRadioButton), { descendants: true },] },],
    "name": [{ type: Input },],
    "labelPosition": [{ type: Input },],
    "value": [{ type: Input },],
    "selected": [{ type: Input },],
    "disabled": [{ type: Input },],
    "required": [{ type: Input },],
};
// Boilerplate for applying mixins to McRadioButton.
/** @docs-private */
class McRadioButtonBase {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const _McRadioButtonMixinBase = mixinColor(mixinTabIndex(McRadioButtonBase));
class McRadioButton extends _McRadioButtonMixinBase {
    constructor(radioGroup, elementRef, _changeDetector, _focusMonitor, _radioDispatcher) {
        super(elementRef);
        this._changeDetector = _changeDetector;
        this._focusMonitor = _focusMonitor;
        this._radioDispatcher = _radioDispatcher;
        this._uniqueId = `mc-radio-${++nextUniqueId}`;
        /* tslint:disable:member-ordering */
        /** The unique ID for the radio button. */
        this.id = this._uniqueId;
        /**
             * Event emitted when the checked state of this radio button changes.
             * Change events are only emitted when the value changes due to user interaction with
             * the radio button (the same behavior as `<input type-"radio">`).
             */
        this.change = new EventEmitter();
        /** Whether this radio is checked. */
        this._checked = false;
        /** Value assigned to this radio. */
        this._value = null;
        /** Unregister function for _radioDispatcher */
        this.removeUniqueSelectionListener = () => { };
        this.radioGroup = radioGroup;
        this.removeUniqueSelectionListener =
            _radioDispatcher.listen((id, name) => {
                if (id !== this.id && name === this.name) {
                    this.checked = false;
                }
            });
    }
    /** Whether this radio button is checked. */
    get checked() { return this._checked; }
    set checked(value) {
        const newCheckedState = toBoolean(value);
        if (this._checked !== newCheckedState) {
            this._checked = newCheckedState;
            if (newCheckedState && this.radioGroup && this.radioGroup.value !== this.value) {
                this.radioGroup.selected = this;
            }
            else if (!newCheckedState && this.radioGroup && this.radioGroup.value === this.value) {
                // When unchecking the selected radio button, update the selected radio
                // property on the group.
                this.radioGroup.selected = null;
            }
            if (newCheckedState) {
                // Notify all radio buttons with the same name to un-check.
                this._radioDispatcher.notify(this.id, this.name);
            }
            this._changeDetector.markForCheck();
        }
    }
    /** The value of this radio button. */
    get value() { return this._value; }
    set value(value) {
        if (this._value !== value) {
            this._value = value;
            if (this.radioGroup != null) {
                if (!this.checked) {
                    // Update checked when the value changed to match the radio group's value
                    this.checked = this.radioGroup.value === value;
                }
                if (this.checked) {
                    this.radioGroup.selected = this;
                }
            }
        }
    }
    /** Whether the radio button is disabled. */
    get disabled() {
        return this._disabled || (this.radioGroup != null && this.radioGroup.disabled);
    }
    set disabled(value) {
        this._disabled = toBoolean(value);
    }
    /** Whether the radio button is required. */
    get required() {
        return this._required || (this.radioGroup && this.radioGroup.required);
    }
    set required(value) {
        this._required = toBoolean(value);
    }
    /** Whether the label should appear after or before the radio button. Defaults to 'after' */
    get labelPosition() {
        return this._labelPosition || (this.radioGroup && this.radioGroup.labelPosition) || 'after';
    }
    set labelPosition(value) {
        this._labelPosition = value;
    }
    /** ID of the native input element inside `<mc-radio-button>` */
    get inputId() { return `${this.id || this._uniqueId}-input`; }
    ngOnInit() {
        if (this.radioGroup) {
            // If the radio is inside a radio group, determine if it should be checked
            this.checked = this.radioGroup.value === this._value;
            // Copy name from parent radio group
            this.name = this.radioGroup.name;
        }
    }
    ngAfterViewInit() {
        this._focusMonitor
            .monitor(this._inputElement.nativeElement)
            .subscribe((focusOrigin) => this.onInputFocusChange(focusOrigin));
    }
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._inputElement.nativeElement);
        this.removeUniqueSelectionListener();
    }
    /** Focuses the radio button. */
    focus() {
        this._focusMonitor.focusVia(this._inputElement.nativeElement, 'keyboard');
    }
    /**
         * Marks the radio button as needing checking for change detection.
         * This method is exposed because the parent radio group will directly
         * update bound properties of the radio button.
         */
    markForCheck() {
        // When group value changes, the button will not be notified. Use `markForCheck` to explicit
        // update radio button's status
        this._changeDetector.markForCheck();
    }
    onInputClick(event) {
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `radio-button` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
    }
    onInputChange(event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
        const groupValueChanged = this.radioGroup && this.value !== this.radioGroup.value;
        this.checked = true;
        this.emitChangeEvent();
        if (this.radioGroup) {
            this.radioGroup.controlValueAccessorChangeFn(this.value);
            this.radioGroup.touch();
            if (groupValueChanged) {
                this.radioGroup.emitChangeEvent();
            }
        }
    }
    /** Dispatch change event with current value. */
    emitChangeEvent() {
        this.change.emit(new McRadioChange(this, this._value));
    }
    /** Function is called whenever the focus changes for the input element. */
    onInputFocusChange(focusOrigin) {
        if (!focusOrigin && this.radioGroup) {
            this.radioGroup.touch();
        }
    }
}
McRadioButton.decorators = [
    { type: Component, args: [{
                selector: 'mc-radio-button',
                template: "<label [attr.for]=\"inputId\" class=\"mc-radio-label\" #label><div class=\"mc-radio-container\"><div class=\"mc-radio-inner-circle\"></div><div class=\"mc-radio-outer-circle\"></div></div><input #input class=\"mc-radio-input cdk-visually-hidden\" type=\"radio\" [id]=\"inputId\" [checked]=\"checked\" [disabled]=\"disabled\" [tabIndex]=\"tabIndex\" [attr.name]=\"name\" [required]=\"required\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledby\" [attr.aria-describedby]=\"ariaDescribedby\" (change)=\"onInputChange($event)\" (click)=\"onInputClick($event)\"><div class=\"mc-radio-label-content\" [class.mc-radio-label-before]=\"labelPosition == 'before'\"><span style=\"display:none\">&nbsp;</span><ng-content></ng-content></div></label>",
                styles: [".mc-radio-button{display:inline-block}.mc-radio-label{cursor:pointer;display:inline-flex;align-items:center;white-space:nowrap;vertical-align:middle}.mc-radio-container{box-sizing:border-box;display:inline-block;position:relative;width:16px;height:16px;flex-shrink:0}.mc-radio-outer-circle{box-sizing:border-box;height:16px;left:0;position:absolute;top:0;width:16px;border-width:1px;border-style:solid;border-radius:50%}.mc-radio-inner-circle{border-radius:50%;box-sizing:border-box;height:16px;left:0;position:absolute;top:0;width:16px}.mc-radio-checked .mc-radio-inner-circle:before{content:'';display:block;position:absolute;width:6px;height:6px;margin-left:5px;margin-top:5px;border-radius:50%}.mc-radio-label-content{display:inline-block;order:0;line-height:inherit;padding-left:8px;padding-right:0}[dir=rtl] .mc-radio-label-content{padding-right:8px;padding-left:0}.mc-radio-disabled,.mc-radio-disabled .mc-radio-label{cursor:default}"],
                inputs: ['color', 'tabIndex'],
                encapsulation: ViewEncapsulation.None,
                exportAs: 'mcRadioButton',
                host: {
                    'class': 'mc-radio-button',
                    '[attr.id]': 'id',
                    '[class.mc-radio-checked]': 'checked',
                    '[class.mc-radio-disabled]': 'disabled',
                    '(focus)': '_inputElement.nativeElement.focus()'
                },
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
McRadioButton.ctorParameters = () => [
    { type: McRadioGroup, decorators: [{ type: Optional },] },
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
    { type: FocusMonitor, },
    { type: UniqueSelectionDispatcher, },
];
McRadioButton.propDecorators = {
    "id": [{ type: Input },],
    "name": [{ type: Input },],
    "ariaLabel": [{ type: Input, args: ['aria-label',] },],
    "ariaLabelledby": [{ type: Input, args: ['aria-labelledby',] },],
    "ariaDescribedby": [{ type: Input, args: ['aria-describedby',] },],
    "checked": [{ type: Input },],
    "value": [{ type: Input },],
    "disabled": [{ type: Input },],
    "required": [{ type: Input },],
    "labelPosition": [{ type: Input },],
    "_inputElement": [{ type: ViewChild, args: ['input',] },],
    "change": [{ type: Output },],
};

class McRadioModule {
}
McRadioModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, A11yModule, McCommonModule],
                exports: [McRadioGroup, McRadioButton, McCommonModule],
                providers: [UNIQUE_SELECTION_DISPATCHER_PROVIDER],
                declarations: [McRadioGroup, McRadioButton]
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { McRadioModule, McRadioChange, McRadioGroupBase, _McRadioGroupMixinBase, MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR, McRadioGroup, McRadioButtonBase, _McRadioButtonMixinBase, McRadioButton };
//# sourceMappingURL=radio.js.map
