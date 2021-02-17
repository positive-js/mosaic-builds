import { FocusMonitor, A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { forwardRef, EventEmitter, Directive, ElementRef, ChangeDetectorRef, Input, Output, ContentChildren, Component, ViewEncapsulation, ChangeDetectionStrategy, Optional, ViewChild, NgModule } from '@angular/core';
import { mixinDisabled, toBoolean, mixinColor, mixinTabIndex, McCommonModule } from '@ptsecurity/mosaic/core';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * Generated from: radio.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Increasing integer for generating unique ids for radio components.
/** @type {?} */
let nextUniqueId = 0;
/**
 * Change event object emitted by McRadio.
 */
class McRadioChange {
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
     * The McRadioButton that emits the change event.
     * @type {?}
     */
    McRadioChange.prototype.source;
    /**
     * The value of the McRadioButton.
     * @type {?}
     */
    McRadioChange.prototype.value;
}
// Boilerplate for applying mixins to McRadioGroup.
/**
 * \@docs-private
 */
class McRadioGroupBase {
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
    McRadioGroupBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
const McRadioGroupMixinBase = mixinDisabled(McRadioGroupBase);
/**
 * Provider Expression that allows mc-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * \@docs-private
 * @type {?}
 */
const MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => McRadioGroup)),
    multi: true
};
class McRadioGroup extends McRadioGroupMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} _changeDetector
     */
    constructor(elementRef, _changeDetector) {
        super(elementRef);
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
        /**
         * The HTML name attribute applied to radio buttons in this group.
         */
        this._name = `mc-radio-group-${nextUniqueId++}`;
        /**
         * The currently selected radio button. Should match value.
         */
        this._selected = null;
        /**
         * Whether the `value` has been set to its initial value.
         */
        this.isInitialized = false;
        /**
         * Whether the labels should appear after or before the radio-buttons. Defaults to 'after'
         */
        this._labelPosition = 'after';
        /**
         * Whether the radio group is disabled.
         */
        this._disabled = false;
        /**
         * Whether the radio group is required.
         */
        this._required = false;
        /**
         * The method to be called in order to update ngModel
         */
        // tslint:disable-next-line
        this.controlValueAccessorChangeFn = (/**
         * @return {?}
         */
        () => { });
        /**
         * onTouch function registered via registerOnTouch (ControlValueAccessor).
         * \@docs-private
         */
        // tslint:disable-next-line
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * Name of the radio button group. All radio buttons inside this group will use this name.
     * @return {?}
     */
    get name() { return this._name; }
    /**
     * @param {?} value
     * @return {?}
     */
    set name(value) {
        this._name = value;
        this.updateRadioButtonNames();
    }
    /**
     * Whether the labels should appear after or before the radio-buttons. Defaults to 'after'
     * @return {?}
     */
    get labelPosition() {
        return this._labelPosition;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set labelPosition(v) {
        this._labelPosition = v === 'before' ? 'before' : 'after';
        this.markRadiosForCheck();
    }
    /**
     * Value of the radio button.
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * @param {?} newValue
     * @return {?}
     */
    set value(newValue) {
        if (this._value !== newValue) {
            // Set this before proceeding to ensure no circular loop occurs with selection.
            this._value = newValue;
            this.updateSelectedRadioFromValue();
            this.checkSelectedRadioButton();
        }
    }
    /**
     * Whether the radio button is selected.
     * @return {?}
     */
    get selected() { return this._selected; }
    /**
     * @param {?} selected
     * @return {?}
     */
    set selected(selected) {
        this._selected = selected;
        this.value = selected ? selected.value : null;
        this.checkSelectedRadioButton();
    }
    /**
     * Whether the radio group is disabled
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = toBoolean(value);
        this.markRadiosForCheck();
    }
    /**
     * Whether the radio group is required
     * @return {?}
     */
    get required() { return this._required; }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) {
        this._required = toBoolean(value);
        this.markRadiosForCheck();
    }
    /**
     * @return {?}
     */
    checkSelectedRadioButton() {
        if (this._selected && !this._selected.checked) {
            this._selected.checked = true;
        }
    }
    /**
     * Initialize properties once content children are available.
     * This allows us to propagate relevant attributes to associated buttons.
     * @return {?}
     */
    ngAfterContentInit() {
        // Mark this component as initialized in AfterContentInit because the initial value can
        // possibly be set by NgModel on McRadioGroup, and it is possible that the OnInit of the
        // NgModel occurs *after* the OnInit of the McRadioGroup.
        this.isInitialized = true;
    }
    /**
     * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
     * radio buttons upon their blur.
     * @return {?}
     */
    touch() {
        if (this.onTouched) {
            this.onTouched();
        }
    }
    /**
     * Dispatch change event with current selection and group value.
     * @return {?}
     */
    emitChangeEvent() {
        if (this.isInitialized) {
            this.change.emit(new McRadioChange((/** @type {?} */ (this._selected)), this._value));
        }
    }
    /**
     * @return {?}
     */
    markRadiosForCheck() {
        if (this.radios) {
            this.radios.forEach((/**
             * @param {?} radio
             * @return {?}
             */
            (radio) => radio.markForCheck()));
        }
    }
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
        this._changeDetector.markForCheck();
    }
    /**
     * Registers a callback to be triggered when the model value changes.
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn Callback to be registered.
     * @return {?}
     */
    registerOnChange(fn) {
        this.controlValueAccessorChangeFn = fn;
    }
    /**
     * Registers a callback to be triggered when the control is touched.
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn Callback to be registered.
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
     * @param {?} isDisabled Whether the control should be disabled.
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this._changeDetector.markForCheck();
    }
    /**
     * @private
     * @return {?}
     */
    updateRadioButtonNames() {
        if (this.radios) {
            this.radios.forEach((/**
             * @param {?} radio
             * @return {?}
             */
            (radio) => {
                radio.name = this.name;
            }));
        }
    }
    /**
     * Updates the `selected` radio button from the internal _value state.
     * @private
     * @return {?}
     */
    updateSelectedRadioFromValue() {
        // If the value already matches the selected radio, do nothing.
        /** @type {?} */
        const isAlreadySelected = this._selected !== null && this._selected.value === this._value;
        if (this.radios != null && !isAlreadySelected) {
            this._selected = null;
            this.radios.forEach((/**
             * @param {?} radio
             * @return {?}
             */
            (radio) => {
                radio.checked = this.value === radio.value;
                if (radio.checked) {
                    this._selected = radio;
                }
            }));
        }
    }
}
McRadioGroup.decorators = [
    { type: Directive, args: [{
                selector: 'mc-radio-group',
                exportAs: 'mcRadioGroup',
                host: {
                    role: 'radiogroup',
                    class: 'mc-radio-group'
                },
                providers: [MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR]
            },] }
];
/** @nocollapse */
McRadioGroup.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
McRadioGroup.propDecorators = {
    name: [{ type: Input }],
    labelPosition: [{ type: Input }],
    value: [{ type: Input }],
    selected: [{ type: Input }],
    disabled: [{ type: Input }],
    required: [{ type: Input }],
    change: [{ type: Output }],
    radios: [{ type: ContentChildren, args: [forwardRef((/**
                 * @return {?}
                 */
                () => McRadioButton)), { descendants: true },] }]
};
if (false) {
    /**
     * Event emitted when the group value changes.
     * Change events are only emitted when the value changes due to user interaction with
     * a radio button (the same behavior as `<input type-"radio">`).
     * @type {?}
     */
    McRadioGroup.prototype.change;
    /**
     * Child radio buttons.
     * @type {?}
     */
    McRadioGroup.prototype.radios;
    /**
     * Selected value for group. Should equal the value of the selected radio button if there *is*
     * a corresponding radio button with a matching value. If there is *not* such a corresponding
     * radio button, this value persists to be applied in case a new radio button is added with a
     * matching value.
     * @type {?}
     * @private
     */
    McRadioGroup.prototype._value;
    /**
     * The HTML name attribute applied to radio buttons in this group.
     * @type {?}
     * @private
     */
    McRadioGroup.prototype._name;
    /**
     * The currently selected radio button. Should match value.
     * @type {?}
     * @private
     */
    McRadioGroup.prototype._selected;
    /**
     * Whether the `value` has been set to its initial value.
     * @type {?}
     * @private
     */
    McRadioGroup.prototype.isInitialized;
    /**
     * Whether the labels should appear after or before the radio-buttons. Defaults to 'after'
     * @type {?}
     * @private
     */
    McRadioGroup.prototype._labelPosition;
    /**
     * Whether the radio group is disabled.
     * @type {?}
     * @private
     */
    McRadioGroup.prototype._disabled;
    /**
     * Whether the radio group is required.
     * @type {?}
     * @private
     */
    McRadioGroup.prototype._required;
    /**
     * The method to be called in order to update ngModel
     * @type {?}
     */
    McRadioGroup.prototype.controlValueAccessorChangeFn;
    /**
     * onTouch function registered via registerOnTouch (ControlValueAccessor).
     * \@docs-private
     * @type {?}
     */
    McRadioGroup.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    McRadioGroup.prototype._changeDetector;
}
// Boilerplate for applying mixins to McRadioButton.
/**
 * \@docs-private
 * @abstract
 */
// tslint:disable-next-line:naming-convention
class McRadioButtonBase {
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
    McRadioButtonBase.prototype.disabled;
    /** @type {?} */
    McRadioButtonBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
const McRadioButtonMixinBase = mixinColor(mixinTabIndex(McRadioButtonBase));
class McRadioButton extends McRadioButtonMixinBase {
    /**
     * @param {?} radioGroup
     * @param {?} elementRef
     * @param {?} _changeDetector
     * @param {?} focusMonitor
     * @param {?} _radioDispatcher
     */
    constructor(radioGroup, elementRef, _changeDetector, focusMonitor, _radioDispatcher) {
        super(elementRef);
        this._changeDetector = _changeDetector;
        this.focusMonitor = focusMonitor;
        this._radioDispatcher = _radioDispatcher;
        /**
         * Event emitted when the checked state of this radio button changes.
         * Change events are only emitted when the value changes due to user interaction with
         * the radio button (the same behavior as `<input type-"radio">`).
         */
        this.change = new EventEmitter();
        this.isFocused = false;
        /* tslint:disable:member-ordering */
        this.uniqueId = `mc-radio-${++nextUniqueId}`;
        /**
         * Whether this radio is checked.
         */
        this._checked = false;
        /**
         * Value assigned to this radio.
         */
        this._value = null;
        /**
         * Unregister function for _radioDispatcher
         */
        // tslint:disable-next-line
        this.removeUniqueSelectionListener = (/**
         * @return {?}
         */
        () => { });
        this.id = this.uniqueId;
        this.radioGroup = radioGroup;
        this.removeUniqueSelectionListener =
            _radioDispatcher.listen((/**
             * @param {?} id
             * @param {?} name
             * @return {?}
             */
            (id, name) => {
                if (id !== this.id && name === this.name) {
                    this.checked = false;
                }
            }));
    }
    /**
     * Whether this radio button is checked.
     * @return {?}
     */
    get checked() { return this._checked; }
    /**
     * @param {?} value
     * @return {?}
     */
    set checked(value) {
        /** @type {?} */
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
    /**
     * The value of this radio button.
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * @param {?} value
     * @return {?}
     */
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
    /**
     * Whether the radio button is disabled.
     * @return {?}
     */
    get disabled() {
        return this._disabled || (this.radioGroup != null && this.radioGroup.disabled);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        /** @type {?} */
        const newDisabledState = toBoolean(value);
        if (this._disabled !== newDisabledState) {
            this._disabled = newDisabledState;
            this._changeDetector.markForCheck();
        }
    }
    /**
     * Whether the radio button is required.
     * @return {?}
     */
    get required() {
        return this._required || (this.radioGroup && this.radioGroup.required);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) {
        this._required = toBoolean(value);
    }
    /**
     * Whether the label should appear after or before the radio button. Defaults to 'after'
     * @return {?}
     */
    get labelPosition() {
        return this._labelPosition || (this.radioGroup && this.radioGroup.labelPosition) || 'after';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set labelPosition(value) {
        this._labelPosition = value;
    }
    /**
     * ID of the native input element inside `<mc-radio-button>`
     * @return {?}
     */
    get inputId() { return `${this.id || this.uniqueId}-input`; }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.radioGroup) {
            // If the radio is inside a radio group, determine if it should be checked
            this.checked = this.radioGroup.value === this._value;
            // Copy name from parent radio group
            this.name = this.radioGroup.name;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.focusMonitor
            .monitor(this._elementRef, true)
            .subscribe((/**
         * @param {?} focusOrigin
         * @return {?}
         */
        (focusOrigin) => {
            if (!focusOrigin && this.radioGroup) {
                this.radioGroup.touch();
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this._elementRef);
        this.removeUniqueSelectionListener();
    }
    /**
     * Focuses the radio button.
     * @return {?}
     */
    focus() {
        this.inputElement.nativeElement.focus();
    }
    /**
     * Marks the radio button as needing checking for change detection.
     * This method is exposed because the parent radio group will directly
     * update bound properties of the radio button.
     * @return {?}
     */
    markForCheck() {
        // When group value changes, the button will not be notified. Use `markForCheck` to explicit
        // update radio button's status
        this._changeDetector.markForCheck();
    }
    /**
     * @param {?} event
     * @return {?}
     */
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
    /**
     * @param {?} event
     * @return {?}
     */
    onInputChange(event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
        /** @type {?} */
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
    /**
     * Dispatch change event with current value.
     * @private
     * @return {?}
     */
    emitChangeEvent() {
        this.change.emit(new McRadioChange(this, this._value));
    }
}
McRadioButton.decorators = [
    { type: Component, args: [{
                selector: 'mc-radio-button',
                template: "<label class=\"mc-radio-label\" [attr.for]=\"inputId\" #label>\n    <input type=\"radio\"\n           class=\"mc-radio-input cdk-visually-hidden\"\n           #input\n           [id]=\"inputId\"\n           [checked]=\"checked\"\n           [disabled]=\"disabled\"\n           [tabIndex]=\"tabIndex\"\n           [attr.name]=\"name\"\n           [required]=\"required\"\n           [attr.aria-label]=\"ariaLabel\"\n           [attr.aria-labelledby]=\"ariaLabelledby\"\n           [attr.aria-describedby]=\"ariaDescribedby\"\n           (change)=\"onInputChange($event)\"\n           (click)=\"onInputClick($event)\">\n\n    <div class=\"mc-radio-label-content\" [class.mc-radio-label-before]=\"labelPosition == 'before'\">\n        <div class=\"mc-radio-button__outer-circle\"></div>\n        <div class=\"mc-radio-button__inner-circle\"></div>\n        <ng-content></ng-content>\n    </div>\n</label>\n",
                inputs: ['color', 'tabIndex'],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                exportAs: 'mcRadioButton',
                host: {
                    class: 'mc-radio-button',
                    '[attr.id]': 'id',
                    '[class.mc-selected]': 'checked',
                    '[class.mc-disabled]': 'disabled'
                },
                styles: [".mc-radio-button{display:inline-block}.mc-radio-label{align-items:center;cursor:pointer;display:inline-flex;vertical-align:middle;white-space:nowrap;width:100%}.mc-radio-label-content{display:inline-block;line-height:inherit;order:0;padding-left:var(--mc-radio-size-padding,8px);padding-right:0;position:relative}.mc-radio-label-content .mc-radio-button__inner-circle,.mc-radio-label-content .mc-radio-button__outer-circle{border-radius:50%;border-style:solid;box-sizing:content-box;content:\"\";position:absolute}.mc-radio-label-content .mc-radio-button__outer-circle{border-width:1px;height:var(--mc-radio-size-size,14px);left:0;top:calc(50% - 8px);width:var(--mc-radio-size-size,14px)}.mc-radio-label-content .mc-radio-button__inner-circle{border-width:4px;display:none;height:6px;left:1px;top:calc(50% - 7px);width:6px}[dir=rtl] .mc-radio-label-content{padding-left:0;padding-right:var(--mc-radio-size-padding,8px)}.mc-radio-input{opacity:0;outline:none;position:absolute}"]
            }] }
];
/** @nocollapse */
McRadioButton.ctorParameters = () => [
    { type: McRadioGroup, decorators: [{ type: Optional }] },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: FocusMonitor },
    { type: UniqueSelectionDispatcher }
];
McRadioButton.propDecorators = {
    checked: [{ type: Input }],
    value: [{ type: Input }],
    disabled: [{ type: Input }],
    required: [{ type: Input }],
    labelPosition: [{ type: Input }],
    name: [{ type: Input }],
    ariaLabel: [{ type: Input, args: ['aria-label',] }],
    ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }],
    ariaDescribedby: [{ type: Input, args: ['aria-describedby',] }],
    inputElement: [{ type: ViewChild, args: ['input', { static: false },] }],
    change: [{ type: Output }],
    isFocused: [{ type: Input }],
    id: [{ type: Input }]
};
if (false) {
    /**
     * Analog to HTML 'name' attribute used to group radios for unique selection.
     * @type {?}
     */
    McRadioButton.prototype.name;
    /**
     * Used to set the 'aria-label' attribute on the underlying input element.
     * @type {?}
     */
    McRadioButton.prototype.ariaLabel;
    /**
     * The 'aria-labelledby' attribute takes precedence as the element's text alternative.
     * @type {?}
     */
    McRadioButton.prototype.ariaLabelledby;
    /**
     * The 'aria-describedby' attribute is read after the element's label and field type.
     * @type {?}
     */
    McRadioButton.prototype.ariaDescribedby;
    /**
     * The native `<input type=radio>` element
     * @type {?}
     */
    McRadioButton.prototype.inputElement;
    /**
     * Event emitted when the checked state of this radio button changes.
     * Change events are only emitted when the value changes due to user interaction with
     * the radio button (the same behavior as `<input type-"radio">`).
     * @type {?}
     */
    McRadioButton.prototype.change;
    /**
     * The parent radio group. May or may not be present.
     * @type {?}
     */
    McRadioButton.prototype.radioGroup;
    /** @type {?} */
    McRadioButton.prototype.isFocused;
    /**
     * The unique ID for the radio button.
     * @type {?}
     */
    McRadioButton.prototype.id;
    /**
     * @type {?}
     * @private
     */
    McRadioButton.prototype._labelPosition;
    /**
     * @type {?}
     * @private
     */
    McRadioButton.prototype.uniqueId;
    /**
     * Whether this radio is checked.
     * @type {?}
     * @private
     */
    McRadioButton.prototype._checked;
    /**
     * Whether this radio is disabled.
     * @type {?}
     * @private
     */
    McRadioButton.prototype._disabled;
    /**
     * Whether this radio is required.
     * @type {?}
     * @private
     */
    McRadioButton.prototype._required;
    /**
     * Value assigned to this radio.
     * @type {?}
     * @private
     */
    McRadioButton.prototype._value;
    /**
     * Unregister function for _radioDispatcher
     * @type {?}
     * @private
     */
    McRadioButton.prototype.removeUniqueSelectionListener;
    /**
     * @type {?}
     * @private
     */
    McRadioButton.prototype._changeDetector;
    /**
     * @type {?}
     * @private
     */
    McRadioButton.prototype.focusMonitor;
    /**
     * @type {?}
     * @private
     */
    McRadioButton.prototype._radioDispatcher;
}

/**
 * @fileoverview added by tsickle
 * Generated from: radio.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McRadioModule {
}
McRadioModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, A11yModule, McCommonModule],
                exports: [McRadioGroup, McRadioButton],
                declarations: [McRadioGroup, McRadioButton]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ptsecurity-mosaic-radio.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR, McRadioButton, McRadioButtonMixinBase, McRadioChange, McRadioGroup, McRadioGroupBase, McRadioGroupMixinBase, McRadioModule };
//# sourceMappingURL=ptsecurity-mosaic-radio.js.map
