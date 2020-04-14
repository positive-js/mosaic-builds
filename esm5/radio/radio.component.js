/**
 * @fileoverview added by tsickle
 * Generated from: radio.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Input, Optional, Output, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { mixinColor, mixinDisabled, mixinTabIndex, toBoolean } from '@ptsecurity/mosaic/core';
// Increasing integer for generating unique ids for radio components.
/** @type {?} */
var nextUniqueId = 0;
/**
 * Change event object emitted by McRadio.
 */
var /**
 * Change event object emitted by McRadio.
 */
McRadioChange = /** @class */ (function () {
    function McRadioChange(source, value) {
        this.source = source;
        this.value = value;
    }
    return McRadioChange;
}());
/**
 * Change event object emitted by McRadio.
 */
export { McRadioChange };
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
var 
// Boilerplate for applying mixins to McRadioGroup.
/**
 * \@docs-private
 */
McRadioGroupBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McRadioGroupBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McRadioGroupBase;
}());
// Boilerplate for applying mixins to McRadioGroup.
/**
 * \@docs-private
 */
export { McRadioGroupBase };
if (false) {
    /** @type {?} */
    McRadioGroupBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export var McRadioGroupMixinBase = mixinDisabled(McRadioGroupBase);
/**
 * Provider Expression that allows mc-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * \@docs-private
 * @type {?}
 */
export var MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return McRadioGroup; })),
    multi: true
};
var McRadioGroup = /** @class */ (function (_super) {
    __extends(McRadioGroup, _super);
    function McRadioGroup(elementRef, _changeDetector) {
        var _this = _super.call(this, elementRef) || this;
        _this._changeDetector = _changeDetector;
        /**
         * Event emitted when the group value changes.
         * Change events are only emitted when the value changes due to user interaction with
         * a radio button (the same behavior as `<input type-"radio">`).
         */
        _this.change = new EventEmitter();
        /**
         * Selected value for group. Should equal the value of the selected radio button if there *is*
         * a corresponding radio button with a matching value. If there is *not* such a corresponding
         * radio button, this value persists to be applied in case a new radio button is added with a
         * matching value.
         */
        _this._value = null;
        /**
         * The HTML name attribute applied to radio buttons in this group.
         */
        _this._name = "mc-radio-group-" + nextUniqueId++;
        /**
         * The currently selected radio button. Should match value.
         */
        _this._selected = null;
        /**
         * Whether the `value` has been set to its initial value.
         */
        _this.isInitialized = false;
        /**
         * Whether the labels should appear after or before the radio-buttons. Defaults to 'after'
         */
        _this._labelPosition = 'after';
        /**
         * Whether the radio group is disabled.
         */
        _this._disabled = false;
        /**
         * Whether the radio group is required.
         */
        _this._required = false;
        /**
         * The method to be called in order to update ngModel
         */
        // tslint:disable-next-line
        _this.controlValueAccessorChangeFn = (/**
         * @return {?}
         */
        function () { });
        /**
         * onTouch function registered via registerOnTouch (ControlValueAccessor).
         * \@docs-private
         */
        // tslint:disable-next-line
        _this.onTouched = (/**
         * @return {?}
         */
        function () { });
        return _this;
    }
    Object.defineProperty(McRadioGroup.prototype, "name", {
        /** Name of the radio button group. All radio buttons inside this group will use this name. */
        get: /**
         * Name of the radio button group. All radio buttons inside this group will use this name.
         * @return {?}
         */
        function () { return this._name; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._name = value;
            this.updateRadioButtonNames();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioGroup.prototype, "labelPosition", {
        /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
        get: /**
         * Whether the labels should appear after or before the radio-buttons. Defaults to 'after'
         * @return {?}
         */
        function () {
            return this._labelPosition;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._labelPosition = v === 'before' ? 'before' : 'after';
            this.markRadiosForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioGroup.prototype, "value", {
        /** Value of the radio button. */
        get: /**
         * Value of the radio button.
         * @return {?}
         */
        function () { return this._value; },
        set: /**
         * @param {?} newValue
         * @return {?}
         */
        function (newValue) {
            if (this._value !== newValue) {
                // Set this before proceeding to ensure no circular loop occurs with selection.
                this._value = newValue;
                this.updateSelectedRadioFromValue();
                this.checkSelectedRadioButton();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioGroup.prototype, "selected", {
        /** Whether the radio button is selected. */
        get: /**
         * Whether the radio button is selected.
         * @return {?}
         */
        function () { return this._selected; },
        set: /**
         * @param {?} selected
         * @return {?}
         */
        function (selected) {
            this._selected = selected;
            this.value = selected ? selected.value : null;
            this.checkSelectedRadioButton();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioGroup.prototype, "disabled", {
        /** Whether the radio group is disabled */
        get: /**
         * Whether the radio group is disabled
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = toBoolean(value);
            this.markRadiosForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioGroup.prototype, "required", {
        /** Whether the radio group is required */
        get: /**
         * Whether the radio group is required
         * @return {?}
         */
        function () { return this._required; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._required = toBoolean(value);
            this.markRadiosForCheck();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McRadioGroup.prototype.checkSelectedRadioButton = /**
     * @return {?}
     */
    function () {
        if (this._selected && !this._selected.checked) {
            this._selected.checked = true;
        }
    };
    /**
     * Initialize properties once content children are available.
     * This allows us to propagate relevant attributes to associated buttons.
     */
    /**
     * Initialize properties once content children are available.
     * This allows us to propagate relevant attributes to associated buttons.
     * @return {?}
     */
    McRadioGroup.prototype.ngAfterContentInit = /**
     * Initialize properties once content children are available.
     * This allows us to propagate relevant attributes to associated buttons.
     * @return {?}
     */
    function () {
        // Mark this component as initialized in AfterContentInit because the initial value can
        // possibly be set by NgModel on McRadioGroup, and it is possible that the OnInit of the
        // NgModel occurs *after* the OnInit of the McRadioGroup.
        this.isInitialized = true;
    };
    /**
     * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
     * radio buttons upon their blur.
     */
    /**
     * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
     * radio buttons upon their blur.
     * @return {?}
     */
    McRadioGroup.prototype.touch = /**
     * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
     * radio buttons upon their blur.
     * @return {?}
     */
    function () {
        if (this.onTouched) {
            this.onTouched();
        }
    };
    /** Dispatch change event with current selection and group value. */
    /**
     * Dispatch change event with current selection and group value.
     * @return {?}
     */
    McRadioGroup.prototype.emitChangeEvent = /**
     * Dispatch change event with current selection and group value.
     * @return {?}
     */
    function () {
        if (this.isInitialized) {
            this.change.emit(new McRadioChange((/** @type {?} */ (this._selected)), this._value));
        }
    };
    /**
     * @return {?}
     */
    McRadioGroup.prototype.markRadiosForCheck = /**
     * @return {?}
     */
    function () {
        if (this.radios) {
            this.radios.forEach((/**
             * @param {?} radio
             * @return {?}
             */
            function (radio) { return radio.markForCheck(); }));
        }
    };
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     */
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param {?} value
     * @return {?}
     */
    McRadioGroup.prototype.writeValue = /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
        this._changeDetector.markForCheck();
    };
    /**
     * Registers a callback to be triggered when the model value changes.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    /**
     * Registers a callback to be triggered when the model value changes.
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn Callback to be registered.
     * @return {?}
     */
    McRadioGroup.prototype.registerOnChange = /**
     * Registers a callback to be triggered when the model value changes.
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn Callback to be registered.
     * @return {?}
     */
    function (fn) {
        this.controlValueAccessorChangeFn = fn;
    };
    /**
     * Registers a callback to be triggered when the control is touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    /**
     * Registers a callback to be triggered when the control is touched.
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn Callback to be registered.
     * @return {?}
     */
    McRadioGroup.prototype.registerOnTouched = /**
     * Registers a callback to be triggered when the control is touched.
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn Callback to be registered.
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
     * @param isDisabled Whether the control should be disabled.
     */
    /**
     * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
     * @param {?} isDisabled Whether the control should be disabled.
     * @return {?}
     */
    McRadioGroup.prototype.setDisabledState = /**
     * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
     * @param {?} isDisabled Whether the control should be disabled.
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
        this._changeDetector.markForCheck();
    };
    /**
     * @private
     * @return {?}
     */
    McRadioGroup.prototype.updateRadioButtonNames = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.radios) {
            this.radios.forEach((/**
             * @param {?} radio
             * @return {?}
             */
            function (radio) {
                radio.name = _this.name;
            }));
        }
    };
    /** Updates the `selected` radio button from the internal _value state. */
    /**
     * Updates the `selected` radio button from the internal _value state.
     * @private
     * @return {?}
     */
    McRadioGroup.prototype.updateSelectedRadioFromValue = /**
     * Updates the `selected` radio button from the internal _value state.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        // If the value already matches the selected radio, do nothing.
        /** @type {?} */
        var isAlreadySelected = this._selected !== null && this._selected.value === this._value;
        if (this.radios != null && !isAlreadySelected) {
            this._selected = null;
            this.radios.forEach((/**
             * @param {?} radio
             * @return {?}
             */
            function (radio) {
                radio.checked = _this.value === radio.value;
                if (radio.checked) {
                    _this._selected = radio;
                }
            }));
        }
    };
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
    McRadioGroup.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
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
                    function () { return McRadioButton; })), { descendants: true },] }]
    };
    return McRadioGroup;
}(McRadioGroupMixinBase));
export { McRadioGroup };
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
 */
var 
// Boilerplate for applying mixins to McRadioButton.
/**
 * \@docs-private
 */
McRadioButtonBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McRadioButtonBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McRadioButtonBase;
}());
// Boilerplate for applying mixins to McRadioButton.
/**
 * \@docs-private
 */
export { McRadioButtonBase };
if (false) {
    /** @type {?} */
    McRadioButtonBase.prototype.disabled;
    /** @type {?} */
    McRadioButtonBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export var McRadioButtonMixinBase = mixinColor(mixinTabIndex(McRadioButtonBase));
var McRadioButton = /** @class */ (function (_super) {
    __extends(McRadioButton, _super);
    function McRadioButton(radioGroup, elementRef, _changeDetector, focusMonitor, _radioDispatcher) {
        var _this = _super.call(this, elementRef) || this;
        _this._changeDetector = _changeDetector;
        _this.focusMonitor = focusMonitor;
        _this._radioDispatcher = _radioDispatcher;
        /**
         * Event emitted when the checked state of this radio button changes.
         * Change events are only emitted when the value changes due to user interaction with
         * the radio button (the same behavior as `<input type-"radio">`).
         */
        _this.change = new EventEmitter();
        _this.isFocused = false;
        /* tslint:disable:member-ordering */
        _this.uniqueId = "mc-radio-" + ++nextUniqueId;
        /**
         * Whether this radio is checked.
         */
        _this._checked = false;
        /**
         * Value assigned to this radio.
         */
        _this._value = null;
        /**
         * Unregister function for _radioDispatcher
         */
        // tslint:disable-next-line
        _this.removeUniqueSelectionListener = (/**
         * @return {?}
         */
        function () { });
        _this.id = _this.uniqueId;
        _this.radioGroup = radioGroup;
        _this.removeUniqueSelectionListener =
            _radioDispatcher.listen((/**
             * @param {?} id
             * @param {?} name
             * @return {?}
             */
            function (id, name) {
                if (id !== _this.id && name === _this.name) {
                    _this.checked = false;
                }
            }));
        return _this;
    }
    Object.defineProperty(McRadioButton.prototype, "checked", {
        /** Whether this radio button is checked. */
        get: /**
         * Whether this radio button is checked.
         * @return {?}
         */
        function () { return this._checked; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var newCheckedState = toBoolean(value);
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioButton.prototype, "value", {
        /** The value of this radio button. */
        get: /**
         * The value of this radio button.
         * @return {?}
         */
        function () { return this._value; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioButton.prototype, "disabled", {
        /** Whether the radio button is disabled. */
        get: /**
         * Whether the radio button is disabled.
         * @return {?}
         */
        function () {
            return this._disabled || (this.radioGroup != null && this.radioGroup.disabled);
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var newDisabledState = toBoolean(value);
            if (this._disabled !== newDisabledState) {
                this._disabled = newDisabledState;
                this._changeDetector.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioButton.prototype, "required", {
        /** Whether the radio button is required. */
        get: /**
         * Whether the radio button is required.
         * @return {?}
         */
        function () {
            return this._required || (this.radioGroup && this.radioGroup.required);
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._required = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioButton.prototype, "labelPosition", {
        /** Whether the label should appear after or before the radio button. Defaults to 'after' */
        get: /**
         * Whether the label should appear after or before the radio button. Defaults to 'after'
         * @return {?}
         */
        function () {
            return this._labelPosition || (this.radioGroup && this.radioGroup.labelPosition) || 'after';
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._labelPosition = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioButton.prototype, "inputId", {
        /** ID of the native input element inside `<mc-radio-button>` */
        get: /**
         * ID of the native input element inside `<mc-radio-button>`
         * @return {?}
         */
        function () { return (this.id || this.uniqueId) + "-input"; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McRadioButton.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.radioGroup) {
            // If the radio is inside a radio group, determine if it should be checked
            this.checked = this.radioGroup.value === this._value;
            // Copy name from parent radio group
            this.name = this.radioGroup.name;
        }
    };
    /**
     * @return {?}
     */
    McRadioButton.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.focusMonitor
            .monitor(this._elementRef, true)
            .subscribe((/**
         * @param {?} focusOrigin
         * @return {?}
         */
        function (focusOrigin) {
            if (!focusOrigin && _this.radioGroup) {
                _this.radioGroup.touch();
            }
        }));
    };
    /**
     * @return {?}
     */
    McRadioButton.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.focusMonitor.stopMonitoring(this._elementRef);
        this.removeUniqueSelectionListener();
    };
    /** Focuses the radio button. */
    /**
     * Focuses the radio button.
     * @return {?}
     */
    McRadioButton.prototype.focus = /**
     * Focuses the radio button.
     * @return {?}
     */
    function () {
        this.inputElement.nativeElement.focus();
    };
    /**
     * Marks the radio button as needing checking for change detection.
     * This method is exposed because the parent radio group will directly
     * update bound properties of the radio button.
     */
    /**
     * Marks the radio button as needing checking for change detection.
     * This method is exposed because the parent radio group will directly
     * update bound properties of the radio button.
     * @return {?}
     */
    McRadioButton.prototype.markForCheck = /**
     * Marks the radio button as needing checking for change detection.
     * This method is exposed because the parent radio group will directly
     * update bound properties of the radio button.
     * @return {?}
     */
    function () {
        // When group value changes, the button will not be notified. Use `markForCheck` to explicit
        // update radio button's status
        this._changeDetector.markForCheck();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McRadioButton.prototype.onInputClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `radio-button` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McRadioButton.prototype.onInputChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
        /** @type {?} */
        var groupValueChanged = this.radioGroup && this.value !== this.radioGroup.value;
        this.checked = true;
        this.emitChangeEvent();
        if (this.radioGroup) {
            this.radioGroup.controlValueAccessorChangeFn(this.value);
            this.radioGroup.touch();
            if (groupValueChanged) {
                this.radioGroup.emitChangeEvent();
            }
        }
    };
    /** Dispatch change event with current value. */
    /**
     * Dispatch change event with current value.
     * @private
     * @return {?}
     */
    McRadioButton.prototype.emitChangeEvent = /**
     * Dispatch change event with current value.
     * @private
     * @return {?}
     */
    function () {
        this.change.emit(new McRadioChange(this, this._value));
    };
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
                    styles: [".mc-radio-button{display:inline-block}.mc-radio-label{display:inline-flex;align-items:center;vertical-align:middle;cursor:pointer;white-space:nowrap;width:100%}.mc-radio-label-content{display:inline-block;position:relative;order:0;line-height:inherit;padding-left:26px;padding-right:0}.mc-radio-label-content .mc-radio-button__inner-circle,.mc-radio-label-content .mc-radio-button__outer-circle{box-sizing:content-box;position:absolute;content:'';border-style:solid;border-radius:50%}.mc-radio-label-content .mc-radio-button__outer-circle{left:0;top:calc(50% - 8px);width:14px;height:14px;border-width:1px}.mc-radio-label-content .mc-radio-button__inner-circle{display:none;left:1px;top:calc(50% - 7px);width:6px;height:6px;border-width:4px}[dir=rtl] .mc-radio-label-content{padding-right:26px;padding-left:0}.mc-radio-input{position:absolute;outline:0;opacity:0}"]
                }] }
    ];
    /** @nocollapse */
    McRadioButton.ctorParameters = function () { return [
        { type: McRadioGroup, decorators: [{ type: Optional }] },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: FocusMonitor },
        { type: UniqueSelectionDispatcher }
    ]; };
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
    return McRadioButton;
}(McRadioButtonMixinBase));
export { McRadioButton };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3JhZGlvLyIsInNvdXJjZXMiOlsicmFkaW8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRSxPQUFPLEVBR0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQU9ILFVBQVUsRUFDVixhQUFhLEVBQ2IsYUFBYSxFQUNiLFNBQVMsRUFDWixNQUFNLHlCQUF5QixDQUFDOzs7SUFJN0IsWUFBWSxHQUFHLENBQUM7Ozs7QUFHcEI7Ozs7SUFDSSx1QkFFVyxNQUFxQixFQUVyQixLQUFVO1FBRlYsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUVyQixVQUFLLEdBQUwsS0FBSyxDQUFLO0lBQUcsQ0FBQztJQUM3QixvQkFBQztBQUFELENBQUMsQUFORCxJQU1DOzs7Ozs7Ozs7O0lBSE8sK0JBQTRCOzs7OztJQUU1Qiw4QkFBaUI7Ozs7OztBQUt6Qjs7Ozs7O0lBQ0ksNkNBQTZDO0lBQzdDLDBCQUFtQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFHLENBQUM7SUFDbEQsdUJBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7Ozs7Ozs7SUFEZSx1Q0FBOEI7Ozs7QUFHOUMsTUFBTSxLQUFPLHFCQUFxQixHQUE2QyxhQUFh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SUFHdEIsa0NBQXVDOzs7OztJQUd2Qyx1Q0FBaUQ7Ozs7O0lBR2pELHdDQUFtRDs7Ozs7SUFHbkQscUNBQThEOzs7Ozs7O0lBTzlELCtCQUEyRjs7Ozs7SUFHM0YsbUNBQXlCOztJQUV6QixrQ0FDMkI7Ozs7O0lBRzNCLDJCQUFvQjs7Ozs7SUFLcEIsdUNBQTJDOzs7OztJQUczQyxpQ0FBaUU7Ozs7OztJQUdqRSxpQ0FBa0M7Ozs7OztJQUdsQyxrQ0FBMkI7Ozs7OztJQUczQixrQ0FBMkI7Ozs7OztJQUczQiwrQkFBMkI7Ozs7OztJQStGM0Isc0RBQXNFOzs7OztJQTFGbEUsd0NBQW1EOzs7OztJQUNuRCxxQ0FBa0M7Ozs7O0lBQ2xDLHlDQUE0RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgICBDYW5Db2xvcixcbiAgICBDYW5Db2xvckN0b3IsXG4gICAgQ2FuRGlzYWJsZSxcbiAgICBDYW5EaXNhYmxlQ3RvcixcbiAgICBIYXNUYWJJbmRleCxcbiAgICBIYXNUYWJJbmRleEN0b3IsXG4gICAgbWl4aW5Db2xvcixcbiAgICBtaXhpbkRpc2FibGVkLFxuICAgIG1peGluVGFiSW5kZXgsXG4gICAgdG9Cb29sZWFuXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuXG4vLyBJbmNyZWFzaW5nIGludGVnZXIgZm9yIGdlbmVyYXRpbmcgdW5pcXVlIGlkcyBmb3IgcmFkaW8gY29tcG9uZW50cy5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG4vKiogQ2hhbmdlIGV2ZW50IG9iamVjdCBlbWl0dGVkIGJ5IE1jUmFkaW8uICovXG5leHBvcnQgY2xhc3MgTWNSYWRpb0NoYW5nZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIC8qKiBUaGUgTWNSYWRpb0J1dHRvbiB0aGF0IGVtaXRzIHRoZSBjaGFuZ2UgZXZlbnQuICovXG4gICAgICAgIHB1YmxpYyBzb3VyY2U6IE1jUmFkaW9CdXR0b24sXG4gICAgICAgIC8qKiBUaGUgdmFsdWUgb2YgdGhlIE1jUmFkaW9CdXR0b24uICovXG4gICAgICAgIHB1YmxpYyB2YWx1ZTogYW55KSB7fVxufVxuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1jUmFkaW9Hcm91cC5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY2xhc3MgTWNSYWRpb0dyb3VwQmFzZSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNSYWRpb0dyb3VwTWl4aW5CYXNlOiBDYW5EaXNhYmxlQ3RvciAmIHR5cGVvZiBNY1JhZGlvR3JvdXBCYXNlID0gbWl4aW5EaXNhYmxlZChNY1JhZGlvR3JvdXBCYXNlKTtcblxuLyoqXG4gKiBQcm92aWRlciBFeHByZXNzaW9uIHRoYXQgYWxsb3dzIG1jLXJhZGlvLWdyb3VwIHRvIHJlZ2lzdGVyIGFzIGEgQ29udHJvbFZhbHVlQWNjZXNzb3IuIFRoaXNcbiAqIGFsbG93cyBpdCB0byBzdXBwb3J0IFsobmdNb2RlbCldIGFuZCBuZ0NvbnRyb2wuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBNQ19SQURJT19HUk9VUF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWNSYWRpb0dyb3VwKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1yYWRpby1ncm91cCcsXG4gICAgZXhwb3J0QXM6ICdtY1JhZGlvR3JvdXAnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgcm9sZTogJ3JhZGlvZ3JvdXAnLFxuICAgICAgICBjbGFzczogJ21jLXJhZGlvLWdyb3VwJ1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbTUNfUkFESU9fR1JPVVBfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgTWNSYWRpb0dyb3VwIGV4dGVuZHMgTWNSYWRpb0dyb3VwTWl4aW5CYXNlXG4gICAgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgQ2FuRGlzYWJsZSB7XG5cbiAgICAvKiogTmFtZSBvZiB0aGUgcmFkaW8gYnV0dG9uIGdyb3VwLiBBbGwgcmFkaW8gYnV0dG9ucyBpbnNpZGUgdGhpcyBncm91cCB3aWxsIHVzZSB0aGlzIG5hbWUuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgbmFtZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fbmFtZTsgfVxuICAgIHNldCBuYW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZVJhZGlvQnV0dG9uTmFtZXMoKTtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgbGFiZWxzIHNob3VsZCBhcHBlYXIgYWZ0ZXIgb3IgYmVmb3JlIHRoZSByYWRpby1idXR0b25zLiBEZWZhdWx0cyB0byAnYWZ0ZXInICovXG4gICAgQElucHV0KClcbiAgICBnZXQgbGFiZWxQb3NpdGlvbigpOiAnYmVmb3JlJyB8ICdhZnRlcicge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGFiZWxQb3NpdGlvbjtcbiAgICB9XG4gICAgc2V0IGxhYmVsUG9zaXRpb24odikge1xuICAgICAgICB0aGlzLl9sYWJlbFBvc2l0aW9uID0gdiA9PT0gJ2JlZm9yZScgPyAnYmVmb3JlJyA6ICdhZnRlcic7XG4gICAgICAgIHRoaXMubWFya1JhZGlvc0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLyoqIFZhbHVlIG9mIHRoZSByYWRpbyBidXR0b24uICovXG4gICAgQElucHV0KClcbiAgICBnZXQgdmFsdWUoKTogYW55IHsgcmV0dXJuIHRoaXMuX3ZhbHVlOyB9XG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgLy8gU2V0IHRoaXMgYmVmb3JlIHByb2NlZWRpbmcgdG8gZW5zdXJlIG5vIGNpcmN1bGFyIGxvb3Agb2NjdXJzIHdpdGggc2VsZWN0aW9uLlxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBuZXdWYWx1ZTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVTZWxlY3RlZFJhZGlvRnJvbVZhbHVlKCk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrU2VsZWN0ZWRSYWRpb0J1dHRvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHJhZGlvIGJ1dHRvbiBpcyBzZWxlY3RlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RlZCgpIHsgcmV0dXJuIHRoaXMuX3NlbGVjdGVkOyB9XG4gICAgc2V0IHNlbGVjdGVkKHNlbGVjdGVkOiBNY1JhZGlvQnV0dG9uIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgICAgICB0aGlzLnZhbHVlID0gc2VsZWN0ZWQgPyBzZWxlY3RlZC52YWx1ZSA6IG51bGw7XG4gICAgICAgIHRoaXMuY2hlY2tTZWxlY3RlZFJhZGlvQnV0dG9uKCk7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHJhZGlvIGdyb3VwIGlzIGRpc2FibGVkICovXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kaXNhYmxlZDsgfVxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gICAgICAgIHRoaXMubWFya1JhZGlvc0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHJhZGlvIGdyb3VwIGlzIHJlcXVpcmVkICovXG4gICAgQElucHV0KClcbiAgICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9yZXF1aXJlZDsgfVxuICAgIHNldCByZXF1aXJlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9yZXF1aXJlZCA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gICAgICAgIHRoaXMubWFya1JhZGlvc0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBncm91cCB2YWx1ZSBjaGFuZ2VzLlxuICAgICAqIENoYW5nZSBldmVudHMgYXJlIG9ubHkgZW1pdHRlZCB3aGVuIHRoZSB2YWx1ZSBjaGFuZ2VzIGR1ZSB0byB1c2VyIGludGVyYWN0aW9uIHdpdGhcbiAgICAgKiBhIHJhZGlvIGJ1dHRvbiAodGhlIHNhbWUgYmVoYXZpb3IgYXMgYDxpbnB1dCB0eXBlLVwicmFkaW9cIj5gKS5cbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8TWNSYWRpb0NoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1jUmFkaW9DaGFuZ2U+KCk7XG5cbiAgICAvKiogQ2hpbGQgcmFkaW8gYnV0dG9ucy4gKi9cbiAgICBAQ29udGVudENoaWxkcmVuKGZvcndhcmRSZWYoKCkgPT4gTWNSYWRpb0J1dHRvbiksIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgICByYWRpb3M6IFF1ZXJ5TGlzdDxNY1JhZGlvQnV0dG9uPjtcblxuICAgIC8qKlxuICAgICAqIFNlbGVjdGVkIHZhbHVlIGZvciBncm91cC4gU2hvdWxkIGVxdWFsIHRoZSB2YWx1ZSBvZiB0aGUgc2VsZWN0ZWQgcmFkaW8gYnV0dG9uIGlmIHRoZXJlICppcypcbiAgICAgKiBhIGNvcnJlc3BvbmRpbmcgcmFkaW8gYnV0dG9uIHdpdGggYSBtYXRjaGluZyB2YWx1ZS4gSWYgdGhlcmUgaXMgKm5vdCogc3VjaCBhIGNvcnJlc3BvbmRpbmdcbiAgICAgKiByYWRpbyBidXR0b24sIHRoaXMgdmFsdWUgcGVyc2lzdHMgdG8gYmUgYXBwbGllZCBpbiBjYXNlIGEgbmV3IHJhZGlvIGJ1dHRvbiBpcyBhZGRlZCB3aXRoIGFcbiAgICAgKiBtYXRjaGluZyB2YWx1ZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIF92YWx1ZTogYW55ID0gbnVsbDtcblxuICAgIC8qKiBUaGUgSFRNTCBuYW1lIGF0dHJpYnV0ZSBhcHBsaWVkIHRvIHJhZGlvIGJ1dHRvbnMgaW4gdGhpcyBncm91cC4gKi9cbiAgICBwcml2YXRlIF9uYW1lOiBzdHJpbmcgPSBgbWMtcmFkaW8tZ3JvdXAtJHtuZXh0VW5pcXVlSWQrK31gO1xuXG4gICAgLyoqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgcmFkaW8gYnV0dG9uLiBTaG91bGQgbWF0Y2ggdmFsdWUuICovXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IE1jUmFkaW9CdXR0b24gfCBudWxsID0gbnVsbDtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBgdmFsdWVgIGhhcyBiZWVuIHNldCB0byBpdHMgaW5pdGlhbCB2YWx1ZS4gKi9cbiAgICBwcml2YXRlIGlzSW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBsYWJlbHMgc2hvdWxkIGFwcGVhciBhZnRlciBvciBiZWZvcmUgdGhlIHJhZGlvLWJ1dHRvbnMuIERlZmF1bHRzIHRvICdhZnRlcicgKi9cbiAgICBwcml2YXRlIF9sYWJlbFBvc2l0aW9uOiAnYmVmb3JlJyB8ICdhZnRlcicgPSAnYWZ0ZXInO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHJhZGlvIGdyb3VwIGlzIGRpc2FibGVkLiAqL1xuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogV2hldGhlciB0aGUgcmFkaW8gZ3JvdXAgaXMgcmVxdWlyZWQuICovXG4gICAgcHJpdmF0ZSBfcmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVhZG9ubHkgX2NoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB9XG5cbiAgICAvKiogVGhlIG1ldGhvZCB0byBiZSBjYWxsZWQgaW4gb3JkZXIgdG8gdXBkYXRlIG5nTW9kZWwgKi9cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICBjb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gICAgLyoqXG4gICAgICogb25Ub3VjaCBmdW5jdGlvbiByZWdpc3RlcmVkIHZpYSByZWdpc3Rlck9uVG91Y2ggKENvbnRyb2xWYWx1ZUFjY2Vzc29yKS5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgb25Ub3VjaGVkOiAoKSA9PiBhbnkgPSAoKSA9PiB7fTtcblxuICAgIGNoZWNrU2VsZWN0ZWRSYWRpb0J1dHRvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkICYmICF0aGlzLl9zZWxlY3RlZC5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgcHJvcGVydGllcyBvbmNlIGNvbnRlbnQgY2hpbGRyZW4gYXJlIGF2YWlsYWJsZS5cbiAgICAgKiBUaGlzIGFsbG93cyB1cyB0byBwcm9wYWdhdGUgcmVsZXZhbnQgYXR0cmlidXRlcyB0byBhc3NvY2lhdGVkIGJ1dHRvbnMuXG4gICAgICovXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICAvLyBNYXJrIHRoaXMgY29tcG9uZW50IGFzIGluaXRpYWxpemVkIGluIEFmdGVyQ29udGVudEluaXQgYmVjYXVzZSB0aGUgaW5pdGlhbCB2YWx1ZSBjYW5cbiAgICAgICAgLy8gcG9zc2libHkgYmUgc2V0IGJ5IE5nTW9kZWwgb24gTWNSYWRpb0dyb3VwLCBhbmQgaXQgaXMgcG9zc2libGUgdGhhdCB0aGUgT25Jbml0IG9mIHRoZVxuICAgICAgICAvLyBOZ01vZGVsIG9jY3VycyAqYWZ0ZXIqIHRoZSBPbkluaXQgb2YgdGhlIE1jUmFkaW9Hcm91cC5cbiAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXJrIHRoaXMgZ3JvdXAgYXMgYmVpbmcgXCJ0b3VjaGVkXCIgKGZvciBuZ01vZGVsKS4gTWVhbnQgdG8gYmUgY2FsbGVkIGJ5IHRoZSBjb250YWluZWRcbiAgICAgKiByYWRpbyBidXR0b25zIHVwb24gdGhlaXIgYmx1ci5cbiAgICAgKi9cbiAgICB0b3VjaCgpIHtcbiAgICAgICAgaWYgKHRoaXMub25Ub3VjaGVkKSB7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIERpc3BhdGNoIGNoYW5nZSBldmVudCB3aXRoIGN1cnJlbnQgc2VsZWN0aW9uIGFuZCBncm91cCB2YWx1ZS4gKi9cbiAgICBlbWl0Q2hhbmdlRXZlbnQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlLmVtaXQobmV3IE1jUmFkaW9DaGFuZ2UodGhpcy5fc2VsZWN0ZWQhLCB0aGlzLl92YWx1ZSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbWFya1JhZGlvc0ZvckNoZWNrKCkge1xuICAgICAgICBpZiAodGhpcy5yYWRpb3MpIHtcbiAgICAgICAgICAgIHRoaXMucmFkaW9zLmZvckVhY2goKHJhZGlvKSA9PiByYWRpby5tYXJrRm9yQ2hlY2soKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBtb2RlbCB2YWx1ZS4gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICAgKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYSBjYWxsYmFjayB0byBiZSB0cmlnZ2VyZWQgd2hlbiB0aGUgbW9kZWwgdmFsdWUgY2hhbmdlcy5cbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgICAqIEBwYXJhbSBmbiBDYWxsYmFjayB0byBiZSByZWdpc3RlcmVkLlxuICAgICAqL1xuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMuY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbiA9IGZuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIHRvIGJlIHRyaWdnZXJlZCB3aGVuIHRoZSBjb250cm9sIGlzIHRvdWNoZWQuXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICAgKiBAcGFyYW0gZm4gQ2FsbGJhY2sgdG8gYmUgcmVnaXN0ZXJlZC5cbiAgICAgKi9cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZGlzYWJsZWQgc3RhdGUgb2YgdGhlIGNvbnRyb2wuIEltcGxlbWVudGVkIGFzIGEgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICAgKiBAcGFyYW0gaXNEaXNhYmxlZCBXaGV0aGVyIHRoZSBjb250cm9sIHNob3VsZCBiZSBkaXNhYmxlZC5cbiAgICAgKi9cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlUmFkaW9CdXR0b25OYW1lcygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucmFkaW9zKSB7XG4gICAgICAgICAgICB0aGlzLnJhZGlvcy5mb3JFYWNoKChyYWRpbykgPT4ge1xuICAgICAgICAgICAgICAgIHJhZGlvLm5hbWUgPSB0aGlzLm5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBVcGRhdGVzIHRoZSBgc2VsZWN0ZWRgIHJhZGlvIGJ1dHRvbiBmcm9tIHRoZSBpbnRlcm5hbCBfdmFsdWUgc3RhdGUuICovXG4gICAgcHJpdmF0ZSB1cGRhdGVTZWxlY3RlZFJhZGlvRnJvbVZhbHVlKCk6IHZvaWQge1xuICAgICAgICAvLyBJZiB0aGUgdmFsdWUgYWxyZWFkeSBtYXRjaGVzIHRoZSBzZWxlY3RlZCByYWRpbywgZG8gbm90aGluZy5cbiAgICAgICAgY29uc3QgaXNBbHJlYWR5U2VsZWN0ZWQgPSB0aGlzLl9zZWxlY3RlZCAhPT0gbnVsbCAmJiB0aGlzLl9zZWxlY3RlZC52YWx1ZSA9PT0gdGhpcy5fdmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMucmFkaW9zICE9IG51bGwgJiYgIWlzQWxyZWFkeVNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnJhZGlvcy5mb3JFYWNoKChyYWRpbykgPT4ge1xuICAgICAgICAgICAgICAgIHJhZGlvLmNoZWNrZWQgPSB0aGlzLnZhbHVlID09PSByYWRpby52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAocmFkaW8uY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHJhZGlvO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWNSYWRpb0J1dHRvbi5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY2xhc3MgTWNSYWRpb0J1dHRvbkJhc2Uge1xuICAgIC8vIFNpbmNlIHRoZSBkaXNhYmxlZCBwcm9wZXJ0eSBpcyBtYW51YWxseSBkZWZpbmVkIGZvciB0aGUgTWNSYWRpb0J1dHRvbiBhbmQgaXNuJ3Qgc2V0IHVwIGluXG4gICAgLy8gdGhlIG1peGluIGJhc2UgY2xhc3MuIFRvIGJlIGFibGUgdG8gdXNlIHRoZSB0YWJpbmRleCBtaXhpbiwgYSBkaXNhYmxlZCBwcm9wZXJ0eSBtdXN0IGJlXG4gICAgLy8gZGVmaW5lZCB0byBwcm9wZXJseSB3b3JrLlxuICAgIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1JhZGlvQnV0dG9uTWl4aW5CYXNlOlxuICAgIENhbkNvbG9yQ3RvciAmIEhhc1RhYkluZGV4Q3RvciAmIHR5cGVvZiBNY1JhZGlvQnV0dG9uQmFzZSA9IG1peGluQ29sb3IobWl4aW5UYWJJbmRleChNY1JhZGlvQnV0dG9uQmFzZSkpO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtcmFkaW8tYnV0dG9uJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3JhZGlvLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsncmFkaW8uc2NzcyddLFxuICAgIGlucHV0czogWydjb2xvcicsICd0YWJJbmRleCddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZXhwb3J0QXM6ICdtY1JhZGlvQnV0dG9uJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtcmFkaW8tYnV0dG9uJyxcbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCcsXG4gICAgICAgICdbY2xhc3MubWMtc2VsZWN0ZWRdJzogJ2NoZWNrZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWRpc2FibGVkXSc6ICdkaXNhYmxlZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jUmFkaW9CdXR0b24gZXh0ZW5kcyBNY1JhZGlvQnV0dG9uTWl4aW5CYXNlXG4gICAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgQ2FuQ29sb3IsIEhhc1RhYkluZGV4IHtcblxuICAgIC8qKiBXaGV0aGVyIHRoaXMgcmFkaW8gYnV0dG9uIGlzIGNoZWNrZWQuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgY2hlY2tlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2NoZWNrZWQ7IH1cbiAgICBzZXQgY2hlY2tlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBuZXdDaGVja2VkU3RhdGUgPSB0b0Jvb2xlYW4odmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLl9jaGVja2VkICE9PSBuZXdDaGVja2VkU3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrZWQgPSBuZXdDaGVja2VkU3RhdGU7XG5cbiAgICAgICAgICAgIGlmIChuZXdDaGVja2VkU3RhdGUgJiYgdGhpcy5yYWRpb0dyb3VwICYmIHRoaXMucmFkaW9Hcm91cC52YWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmFkaW9Hcm91cC5zZWxlY3RlZCA9IHRoaXM7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFuZXdDaGVja2VkU3RhdGUgJiYgdGhpcy5yYWRpb0dyb3VwICYmIHRoaXMucmFkaW9Hcm91cC52YWx1ZSA9PT0gdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIFdoZW4gdW5jaGVja2luZyB0aGUgc2VsZWN0ZWQgcmFkaW8gYnV0dG9uLCB1cGRhdGUgdGhlIHNlbGVjdGVkIHJhZGlvXG4gICAgICAgICAgICAgICAgLy8gcHJvcGVydHkgb24gdGhlIGdyb3VwLlxuICAgICAgICAgICAgICAgIHRoaXMucmFkaW9Hcm91cC5zZWxlY3RlZCA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChuZXdDaGVja2VkU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAvLyBOb3RpZnkgYWxsIHJhZGlvIGJ1dHRvbnMgd2l0aCB0aGUgc2FtZSBuYW1lIHRvIHVuLWNoZWNrLlxuICAgICAgICAgICAgICAgIHRoaXMuX3JhZGlvRGlzcGF0Y2hlci5ub3RpZnkodGhpcy5pZCwgdGhpcy5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFRoZSB2YWx1ZSBvZiB0aGlzIHJhZGlvIGJ1dHRvbi4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpOiBhbnkgeyByZXR1cm4gdGhpcy5fdmFsdWU7IH1cbiAgICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5fdmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgaWYgKHRoaXMucmFkaW9Hcm91cCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIGNoZWNrZWQgd2hlbiB0aGUgdmFsdWUgY2hhbmdlZCB0byBtYXRjaCB0aGUgcmFkaW8gZ3JvdXAncyB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLnJhZGlvR3JvdXAudmFsdWUgPT09IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmFkaW9Hcm91cC5zZWxlY3RlZCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHJhZGlvIGJ1dHRvbiBpcyBkaXNhYmxlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkIHx8ICh0aGlzLnJhZGlvR3JvdXAgIT0gbnVsbCAmJiB0aGlzLnJhZGlvR3JvdXAuZGlzYWJsZWQpO1xuICAgIH1cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgbmV3RGlzYWJsZWRTdGF0ZSA9IHRvQm9vbGVhbih2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2Rpc2FibGVkICE9PSBuZXdEaXNhYmxlZFN0YXRlKSB7XG5cbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gbmV3RGlzYWJsZWRTdGF0ZTtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHJhZGlvIGJ1dHRvbiBpcyByZXF1aXJlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVpcmVkIHx8ICh0aGlzLnJhZGlvR3JvdXAgJiYgdGhpcy5yYWRpb0dyb3VwLnJlcXVpcmVkKTtcbiAgICB9XG4gICAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlcXVpcmVkID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgbGFiZWwgc2hvdWxkIGFwcGVhciBhZnRlciBvciBiZWZvcmUgdGhlIHJhZGlvIGJ1dHRvbi4gRGVmYXVsdHMgdG8gJ2FmdGVyJyAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGxhYmVsUG9zaXRpb24oKTogJ2JlZm9yZScgfCAnYWZ0ZXInIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhYmVsUG9zaXRpb24gfHwgKHRoaXMucmFkaW9Hcm91cCAmJiB0aGlzLnJhZGlvR3JvdXAubGFiZWxQb3NpdGlvbikgfHwgJ2FmdGVyJztcbiAgICB9XG4gICAgc2V0IGxhYmVsUG9zaXRpb24odmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbGFiZWxQb3NpdGlvbiA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKiBBbmFsb2cgdG8gSFRNTCAnbmFtZScgYXR0cmlidXRlIHVzZWQgdG8gZ3JvdXAgcmFkaW9zIGZvciB1bmlxdWUgc2VsZWN0aW9uLiAqL1xuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICAgIC8qKiBVc2VkIHRvIHNldCB0aGUgJ2FyaWEtbGFiZWwnIGF0dHJpYnV0ZSBvbiB0aGUgdW5kZXJseWluZyBpbnB1dCBlbGVtZW50LiAqL1xuICAgIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nO1xuXG4gICAgLyoqIFRoZSAnYXJpYS1sYWJlbGxlZGJ5JyBhdHRyaWJ1dGUgdGFrZXMgcHJlY2VkZW5jZSBhcyB0aGUgZWxlbWVudCdzIHRleHQgYWx0ZXJuYXRpdmUuICovXG4gICAgQElucHV0KCdhcmlhLWxhYmVsbGVkYnknKSBhcmlhTGFiZWxsZWRieTogc3RyaW5nO1xuXG4gICAgLyoqIFRoZSAnYXJpYS1kZXNjcmliZWRieScgYXR0cmlidXRlIGlzIHJlYWQgYWZ0ZXIgdGhlIGVsZW1lbnQncyBsYWJlbCBhbmQgZmllbGQgdHlwZS4gKi9cbiAgICBASW5wdXQoJ2FyaWEtZGVzY3JpYmVkYnknKSBhcmlhRGVzY3JpYmVkYnk6IHN0cmluZztcblxuICAgIC8qKiBUaGUgbmF0aXZlIGA8aW5wdXQgdHlwZT1yYWRpbz5gIGVsZW1lbnQgKi9cbiAgICBAVmlld0NoaWxkKCdpbnB1dCcsIHtzdGF0aWM6IGZhbHNlfSkgaW5wdXRFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gICAgLyoqXG4gICAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBjaGVja2VkIHN0YXRlIG9mIHRoaXMgcmFkaW8gYnV0dG9uIGNoYW5nZXMuXG4gICAgICogQ2hhbmdlIGV2ZW50cyBhcmUgb25seSBlbWl0dGVkIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXMgZHVlIHRvIHVzZXIgaW50ZXJhY3Rpb24gd2l0aFxuICAgICAqIHRoZSByYWRpbyBidXR0b24gKHRoZSBzYW1lIGJlaGF2aW9yIGFzIGA8aW5wdXQgdHlwZS1cInJhZGlvXCI+YCkuXG4gICAgICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZTogRXZlbnRFbWl0dGVyPE1jUmFkaW9DaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxNY1JhZGlvQ2hhbmdlPigpO1xuXG4gICAgLyoqIFRoZSBwYXJlbnQgcmFkaW8gZ3JvdXAuIE1heSBvciBtYXkgbm90IGJlIHByZXNlbnQuICovXG4gICAgcmFkaW9Hcm91cDogTWNSYWRpb0dyb3VwO1xuXG4gICAgQElucHV0KClcbiAgICBpc0ZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBUaGUgdW5pcXVlIElEIGZvciB0aGUgcmFkaW8gYnV0dG9uLiAqL1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgICAvKiogSUQgb2YgdGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50IGluc2lkZSBgPG1jLXJhZGlvLWJ1dHRvbj5gICovXG4gICAgZ2V0IGlucHV0SWQoKTogc3RyaW5nIHsgcmV0dXJuIGAke3RoaXMuaWQgfHwgdGhpcy51bmlxdWVJZH0taW5wdXRgOyB9XG5cbiAgICBwcml2YXRlIF9sYWJlbFBvc2l0aW9uOiAnYmVmb3JlJyB8ICdhZnRlcic7XG5cbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZTptZW1iZXItb3JkZXJpbmcgKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IHVuaXF1ZUlkOiBzdHJpbmcgPSBgbWMtcmFkaW8tJHsrK25leHRVbmlxdWVJZH1gO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhpcyByYWRpbyBpcyBjaGVja2VkLiAqL1xuICAgIHByaXZhdGUgX2NoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoaXMgcmFkaW8gaXMgZGlzYWJsZWQuICovXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICAvKiogV2hldGhlciB0aGlzIHJhZGlvIGlzIHJlcXVpcmVkLiAqL1xuICAgIHByaXZhdGUgX3JlcXVpcmVkOiBib29sZWFuO1xuXG4gICAgLyoqIFZhbHVlIGFzc2lnbmVkIHRvIHRoaXMgcmFkaW8uICovXG4gICAgcHJpdmF0ZSBfdmFsdWU6IGFueSA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQE9wdGlvbmFsKCkgcmFkaW9Hcm91cDogTWNSYWRpb0dyb3VwLFxuICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9jaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3JhZGlvRGlzcGF0Y2hlcjogVW5pcXVlU2VsZWN0aW9uRGlzcGF0Y2hlclxuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgICAgICB0aGlzLmlkID0gdGhpcy51bmlxdWVJZDtcblxuICAgICAgICB0aGlzLnJhZGlvR3JvdXAgPSByYWRpb0dyb3VwO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlVW5pcXVlU2VsZWN0aW9uTGlzdGVuZXIgPVxuICAgICAgICAgICAgX3JhZGlvRGlzcGF0Y2hlci5saXN0ZW4oKGlkOiBzdHJpbmcsIG5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpZCAhPT0gdGhpcy5pZCAmJiBuYW1lID09PSB0aGlzLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnJhZGlvR3JvdXApIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSByYWRpbyBpcyBpbnNpZGUgYSByYWRpbyBncm91cCwgZGV0ZXJtaW5lIGlmIGl0IHNob3VsZCBiZSBjaGVja2VkXG4gICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLnJhZGlvR3JvdXAudmFsdWUgPT09IHRoaXMuX3ZhbHVlO1xuICAgICAgICAgICAgLy8gQ29weSBuYW1lIGZyb20gcGFyZW50IHJhZGlvIGdyb3VwXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLnJhZGlvR3JvdXAubmFtZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3JcbiAgICAgICAgICAgIC5tb25pdG9yKHRoaXMuX2VsZW1lbnRSZWYsIHRydWUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChmb2N1c09yaWdpbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZm9jdXNPcmlnaW4gJiYgdGhpcy5yYWRpb0dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmFkaW9Hcm91cC50b3VjaCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLl9lbGVtZW50UmVmKTtcbiAgICAgICAgdGhpcy5yZW1vdmVVbmlxdWVTZWxlY3Rpb25MaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIC8qKiBGb2N1c2VzIHRoZSByYWRpbyBidXR0b24uICovXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXJrcyB0aGUgcmFkaW8gYnV0dG9uIGFzIG5lZWRpbmcgY2hlY2tpbmcgZm9yIGNoYW5nZSBkZXRlY3Rpb24uXG4gICAgICogVGhpcyBtZXRob2QgaXMgZXhwb3NlZCBiZWNhdXNlIHRoZSBwYXJlbnQgcmFkaW8gZ3JvdXAgd2lsbCBkaXJlY3RseVxuICAgICAqIHVwZGF0ZSBib3VuZCBwcm9wZXJ0aWVzIG9mIHRoZSByYWRpbyBidXR0b24uXG4gICAgICovXG4gICAgbWFya0ZvckNoZWNrKCkge1xuICAgICAgICAvLyBXaGVuIGdyb3VwIHZhbHVlIGNoYW5nZXMsIHRoZSBidXR0b24gd2lsbCBub3QgYmUgbm90aWZpZWQuIFVzZSBgbWFya0ZvckNoZWNrYCB0byBleHBsaWNpdFxuICAgICAgICAvLyB1cGRhdGUgcmFkaW8gYnV0dG9uJ3Mgc3RhdHVzXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIG9uSW5wdXRDbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgLy8gV2UgaGF2ZSB0byBzdG9wIHByb3BhZ2F0aW9uIGZvciBjbGljayBldmVudHMgb24gdGhlIHZpc3VhbCBoaWRkZW4gaW5wdXQgZWxlbWVudC5cbiAgICAgICAgLy8gQnkgZGVmYXVsdCwgd2hlbiBhIHVzZXIgY2xpY2tzIG9uIGEgbGFiZWwgZWxlbWVudCwgYSBnZW5lcmF0ZWQgY2xpY2sgZXZlbnQgd2lsbCBiZVxuICAgICAgICAvLyBkaXNwYXRjaGVkIG9uIHRoZSBhc3NvY2lhdGVkIGlucHV0IGVsZW1lbnQuIFNpbmNlIHdlIGFyZSB1c2luZyBhIGxhYmVsIGVsZW1lbnQgYXMgb3VyXG4gICAgICAgIC8vIHJvb3QgY29udGFpbmVyLCB0aGUgY2xpY2sgZXZlbnQgb24gdGhlIGByYWRpby1idXR0b25gIHdpbGwgYmUgZXhlY3V0ZWQgdHdpY2UuXG4gICAgICAgIC8vIFRoZSByZWFsIGNsaWNrIGV2ZW50IHdpbGwgYnViYmxlIHVwLCBhbmQgdGhlIGdlbmVyYXRlZCBjbGljayBldmVudCBhbHNvIHRyaWVzIHRvIGJ1YmJsZSB1cC5cbiAgICAgICAgLy8gVGhpcyB3aWxsIGxlYWQgdG8gbXVsdGlwbGUgY2xpY2sgZXZlbnRzLlxuICAgICAgICAvLyBQcmV2ZW50aW5nIGJ1YmJsaW5nIGZvciB0aGUgc2Vjb25kIGV2ZW50IHdpbGwgc29sdmUgdGhhdCBpc3N1ZS5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgb25JbnB1dENoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgLy8gV2UgYWx3YXlzIGhhdmUgdG8gc3RvcCBwcm9wYWdhdGlvbiBvbiB0aGUgY2hhbmdlIGV2ZW50LlxuICAgICAgICAvLyBPdGhlcndpc2UgdGhlIGNoYW5nZSBldmVudCwgZnJvbSB0aGUgaW5wdXQgZWxlbWVudCwgd2lsbCBidWJibGUgdXAgYW5kXG4gICAgICAgIC8vIGVtaXQgaXRzIGV2ZW50IG9iamVjdCB0byB0aGUgYGNoYW5nZWAgb3V0cHV0LlxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBjb25zdCBncm91cFZhbHVlQ2hhbmdlZCA9IHRoaXMucmFkaW9Hcm91cCAmJiB0aGlzLnZhbHVlICE9PSB0aGlzLnJhZGlvR3JvdXAudmFsdWU7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1pdENoYW5nZUV2ZW50KCk7XG5cbiAgICAgICAgaWYgKHRoaXMucmFkaW9Hcm91cCkge1xuICAgICAgICAgICAgdGhpcy5yYWRpb0dyb3VwLmNvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4odGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnJhZGlvR3JvdXAudG91Y2goKTtcbiAgICAgICAgICAgIGlmIChncm91cFZhbHVlQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmFkaW9Hcm91cC5lbWl0Q2hhbmdlRXZlbnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBVbnJlZ2lzdGVyIGZ1bmN0aW9uIGZvciBfcmFkaW9EaXNwYXRjaGVyICovXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgcHJpdmF0ZSByZWFkb25seSByZW1vdmVVbmlxdWVTZWxlY3Rpb25MaXN0ZW5lcjogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gICAgLyoqIERpc3BhdGNoIGNoYW5nZSBldmVudCB3aXRoIGN1cnJlbnQgdmFsdWUuICovXG4gICAgcHJpdmF0ZSBlbWl0Q2hhbmdlRXZlbnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQobmV3IE1jUmFkaW9DaGFuZ2UodGhpcywgdGhpcy5fdmFsdWUpKTtcbiAgICB9XG59XG4iXX0=