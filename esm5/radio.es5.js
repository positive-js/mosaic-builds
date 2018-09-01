/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __extends, __metadata, __param } from 'tslib';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Input, Optional, Output, QueryList, ViewChild, ViewEncapsulation, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UniqueSelectionDispatcher } from '@ptsecurity/cdk/collections';
import { mixinColor, mixinDisabled, mixinTabIndex, toBoolean, McCommonModule } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@ptsecurity/cdk/a11y';

// Increasing integer for generating unique ids for radio components.
var nextUniqueId = 0;
/** Change event object emitted by McRadio. */
var McRadioChange = /** @class */ (function () {
    function McRadioChange(
    /** The McRadioButton that emits the change event. */
    source, 
    /** The value of the McRadioButton. */
    value) {
        this.source = source;
        this.value = value;
    }
    return McRadioChange;
}());
// Boilerplate for applying mixins to McRadioGroup.
/** @docs-private */
var McRadioGroupBase = /** @class */ (function () {
    function McRadioGroupBase() {
    }
    return McRadioGroupBase;
}());
var _McRadioGroupMixinBase = mixinDisabled(McRadioGroupBase);
/**
 * Provider Expression that allows mc-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
var MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return McRadioGroup; }),
    multi: true
};
var McRadioGroup = /** @class */ (function (_super) {
    __extends(McRadioGroup, _super);
    function McRadioGroup(_changeDetector) {
        var _this = _super.call(this) || this;
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
        /** The HTML name attribute applied to radio buttons in this group. */
        _this._name = "mc-radio-group-" + nextUniqueId++;
        /** The currently selected radio button. Should match value. */
        _this._selected = null;
        /** Whether the `value` has been set to its initial value. */
        _this._isInitialized = false;
        /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
        _this._labelPosition = 'after';
        /** Whether the radio group is disabled. */
        _this._disabled = false;
        /** Whether the radio group is required. */
        _this._required = false;
        /** The method to be called in order to update ngModel */
        // tslint:disable-next-line
        _this.controlValueAccessorChangeFn = function () { };
        /**
         * onTouch function registered via registerOnTouch (ControlValueAccessor).
         * @docs-private
         */
        // tslint:disable-next-line
        _this.onTouched = function () { };
        return _this;
    }
    Object.defineProperty(McRadioGroup.prototype, "name", {
        /** Name of the radio button group. All radio buttons inside this group will use this name. */
        get: function () { return this._name; },
        set: function (value) {
            this._name = value;
            this.updateRadioButtonNames();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioGroup.prototype, "labelPosition", {
        /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
        get: function () {
            return this._labelPosition;
        },
        set: function (v) {
            this._labelPosition = v === 'before' ? 'before' : 'after';
            this.markRadiosForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioGroup.prototype, "value", {
        /** Value of the radio button. */
        get: function () { return this._value; },
        set: function (newValue) {
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
        get: function () { return this._selected; },
        set: function (selected) {
            this._selected = selected;
            this.value = selected ? selected.value : null;
            this.checkSelectedRadioButton();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioGroup.prototype, "disabled", {
        /** Whether the radio group is disabled */
        get: function () { return this._disabled; },
        set: function (value) {
            this._disabled = toBoolean(value);
            this.markRadiosForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioGroup.prototype, "required", {
        /** Whether the radio group is required */
        get: function () { return this._required; },
        set: function (value) {
            this._required = toBoolean(value);
            this.markRadiosForCheck();
        },
        enumerable: true,
        configurable: true
    });
    McRadioGroup.prototype.checkSelectedRadioButton = function () {
        if (this._selected && !this._selected.checked) {
            this._selected.checked = true;
        }
    };
    /**
     * Initialize properties once content children are available.
     * This allows us to propagate relevant attributes to associated buttons.
     */
    McRadioGroup.prototype.ngAfterContentInit = function () {
        // Mark this component as initialized in AfterContentInit because the initial value can
        // possibly be set by NgModel on McRadioGroup, and it is possible that the OnInit of the
        // NgModel occurs *after* the OnInit of the McRadioGroup.
        this._isInitialized = true;
    };
    /**
     * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
     * radio buttons upon their blur.
     */
    McRadioGroup.prototype.touch = function () {
        if (this.onTouched) {
            this.onTouched();
        }
    };
    /** Dispatch change event with current selection and group value. */
    McRadioGroup.prototype.emitChangeEvent = function () {
        if (this._isInitialized) {
            this.change.emit(new McRadioChange(this._selected, this._value));
        }
    };
    McRadioGroup.prototype.markRadiosForCheck = function () {
        if (this._radios) {
            this._radios.forEach(function (radio) { return radio.markForCheck(); });
        }
    };
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value
     */
    McRadioGroup.prototype.writeValue = function (value) {
        this.value = value;
        this._changeDetector.markForCheck();
    };
    /**
     * Registers a callback to be triggered when the model value changes.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    McRadioGroup.prototype.registerOnChange = function (fn) {
        this.controlValueAccessorChangeFn = fn;
    };
    /**
     * Registers a callback to be triggered when the control is touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    McRadioGroup.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
     * @param isDisabled Whether the control should be disabled.
     */
    McRadioGroup.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this._changeDetector.markForCheck();
    };
    McRadioGroup.prototype.updateRadioButtonNames = function () {
        var _this = this;
        if (this._radios) {
            this._radios.forEach(function (radio) {
                radio.name = _this.name;
            });
        }
    };
    /** Updates the `selected` radio button from the internal _value state. */
    McRadioGroup.prototype.updateSelectedRadioFromValue = function () {
        var _this = this;
        // If the value already matches the selected radio, do nothing.
        var isAlreadySelected = this._selected !== null && this._selected.value === this._value;
        if (this._radios != null && !isAlreadySelected) {
            this._selected = null;
            this._radios.forEach(function (radio) {
                radio.checked = _this.value === radio.value;
                if (radio.checked) {
                    _this._selected = radio;
                }
            });
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McRadioGroup.prototype, "name", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [Object])
    ], McRadioGroup.prototype, "labelPosition", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McRadioGroup.prototype, "value", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McRadioGroup.prototype, "selected", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Object])
    ], McRadioGroup.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McRadioGroup.prototype, "required", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McRadioGroup.prototype, "change", void 0);
    __decorate([
        ContentChildren(forwardRef(function () { return McRadioButton; }), { descendants: true }),
        __metadata("design:type", QueryList)
    ], McRadioGroup.prototype, "_radios", void 0);
    McRadioGroup = __decorate([
        Directive({
            selector: 'mc-radio-group',
            exportAs: 'mcRadioGroup',
            providers: [MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
            host: {
                role: 'radiogroup',
                class: 'mc-radio-group'
            },
            inputs: ['disabled']
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], McRadioGroup);
    return McRadioGroup;
}(_McRadioGroupMixinBase));
// Boilerplate for applying mixins to McRadioButton.
/** @docs-private */
var McRadioButtonBase = /** @class */ (function () {
    function McRadioButtonBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McRadioButtonBase;
}());
var _McRadioButtonMixinBase = mixinColor(mixinTabIndex(McRadioButtonBase));
var McRadioButton = /** @class */ (function (_super) {
    __extends(McRadioButton, _super);
    function McRadioButton(radioGroup, elementRef, _changeDetector, _radioDispatcher) {
        var _this = _super.call(this, elementRef) || this;
        _this._changeDetector = _changeDetector;
        _this._radioDispatcher = _radioDispatcher;
        _this._uniqueId = "mc-radio-" + ++nextUniqueId;
        /* tslint:disable:member-ordering */
        /** The unique ID for the radio button. */
        _this.id = _this._uniqueId;
        /**
         * Event emitted when the checked state of this radio button changes.
         * Change events are only emitted when the value changes due to user interaction with
         * the radio button (the same behavior as `<input type-"radio">`).
         */
        _this.change = new EventEmitter();
        _this.isFocused = false;
        /** Whether this radio is checked. */
        _this._checked = false;
        /** Value assigned to this radio. */
        _this._value = null;
        /** Unregister function for _radioDispatcher */
        // tslint:disable-next-line
        _this.removeUniqueSelectionListener = function () { };
        _this.radioGroup = radioGroup;
        _this.removeUniqueSelectionListener =
            _radioDispatcher.listen(function (id, name) {
                if (id !== _this.id && name === _this.name) {
                    _this.checked = false;
                }
            });
        return _this;
    }
    Object.defineProperty(McRadioButton.prototype, "checked", {
        /** Whether this radio button is checked. */
        get: function () { return this._checked; },
        set: function (value) {
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
        get: function () { return this._value; },
        set: function (value) {
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
        get: function () {
            return this._disabled || (this.radioGroup != null && this.radioGroup.disabled);
        },
        set: function (value) {
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
        get: function () {
            return this._required || (this.radioGroup && this.radioGroup.required);
        },
        set: function (value) {
            this._required = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioButton.prototype, "labelPosition", {
        /** Whether the label should appear after or before the radio button. Defaults to 'after' */
        get: function () {
            return this._labelPosition || (this.radioGroup && this.radioGroup.labelPosition) || 'after';
        },
        set: function (value) {
            this._labelPosition = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioButton.prototype, "inputId", {
        /** ID of the native input element inside `<mc-radio-button>` */
        get: function () { return (this.id || this._uniqueId) + "-input"; },
        enumerable: true,
        configurable: true
    });
    McRadioButton.prototype.ngOnInit = function () {
        if (this.radioGroup) {
            // If the radio is inside a radio group, determine if it should be checked
            this.checked = this.radioGroup.value === this._value;
            // Copy name from parent radio group
            this.name = this.radioGroup.name;
        }
    };
    McRadioButton.prototype.ngOnDestroy = function () {
        this.removeUniqueSelectionListener();
    };
    /** Focuses the radio button. */
    // tslint:disable-next-line
    McRadioButton.prototype.focus = function () { };
    /**
     * Marks the radio button as needing checking for change detection.
     * This method is exposed because the parent radio group will directly
     * update bound properties of the radio button.
     */
    McRadioButton.prototype.markForCheck = function () {
        // When group value changes, the button will not be notified. Use `markForCheck` to explicit
        // update radio button's status
        this._changeDetector.markForCheck();
    };
    McRadioButton.prototype.onInputClick = function (event) {
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `radio-button` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
    };
    McRadioButton.prototype.onInputChange = function (event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
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
    McRadioButton.prototype.emitChangeEvent = function () {
        this.change.emit(new McRadioChange(this, this._value));
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], McRadioButton.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], McRadioButton.prototype, "name", void 0);
    __decorate([
        Input('aria-label'),
        __metadata("design:type", String)
    ], McRadioButton.prototype, "ariaLabel", void 0);
    __decorate([
        Input('aria-labelledby'),
        __metadata("design:type", String)
    ], McRadioButton.prototype, "ariaLabelledby", void 0);
    __decorate([
        Input('aria-describedby'),
        __metadata("design:type", String)
    ], McRadioButton.prototype, "ariaDescribedby", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McRadioButton.prototype, "checked", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McRadioButton.prototype, "value", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McRadioButton.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McRadioButton.prototype, "required", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [Object])
    ], McRadioButton.prototype, "labelPosition", null);
    __decorate([
        ViewChild('input'),
        __metadata("design:type", ElementRef)
    ], McRadioButton.prototype, "_inputElement", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McRadioButton.prototype, "change", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], McRadioButton.prototype, "isFocused", void 0);
    McRadioButton = __decorate([
        Component({
            selector: 'mc-radio-button',
            template: "<label [attr.for]=\"inputId\" class=\"mc-radio-label\" #label><input #input class=\"mc-radio-input cdk-visually-hidden\" type=\"radio\" [id]=\"inputId\" [checked]=\"checked\" [disabled]=\"disabled\" [tabIndex]=\"tabIndex\" [attr.name]=\"name\" [required]=\"required\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledby\" [attr.aria-describedby]=\"ariaDescribedby\" (change)=\"onInputChange($event)\" (click)=\"onInputClick($event)\"><div class=\"mc-radio-label-content\" [class.mc-radio-label-before]=\"labelPosition == 'before'\"><span style=\"display:none\">&nbsp;</span><ng-content></ng-content></div></label>",
            styles: [".mc-radio-button{display:inline-block}.mc-radio-label{cursor:pointer;display:inline-flex;align-items:center;white-space:nowrap;vertical-align:middle}.mc-radio-label-content{display:inline-block;order:0;line-height:inherit;padding-right:0}[dir=rtl] .mc-radio-label-content{padding-right:26px;padding-left:0}.mc-radio-input{position:absolute;outline:0;opacity:0}.mc-radio-input+.mc-radio-label-content{position:relative;cursor:pointer;padding-left:26px}.mc-radio-input+.mc-radio-label-content:before{position:absolute;left:0;top:-1px;content:'';background:#fff;width:14px;height:14px;display:block;box-shadow:inset 0 0 1px 0 rgba(0,0,0,.2);border-width:1px;border-style:solid;border-radius:50%}.mc-radio-input+.mc-radio-label-content:after{content:'';top:4px;left:5px;width:6px;height:6px;border-radius:50%;position:absolute;opacity:0}.mc-radio-input:checked+.mc-radio-label-content:before{box-shadow:unset}.mc-radio-input:checked:hover+.mc-radio-label-content:after{opacity:1}.mc-radio-input:focus+.mc-radio-label-content:before{top:-2px;left:-1px;box-shadow:inset 0 0 0 1px #fff;border-width:2px}.mc-radio-input[disabled]{cursor:default}.mc-radio-input[disabled]+.mc-radio-label-content{cursor:default}"],
            inputs: ['color', 'tabIndex'],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            exportAs: 'mcRadioButton',
            host: {
                class: 'mc-radio-button',
                '[attr.id]': 'id',
                '[class.mc-radio-checked]': 'checked',
                '[class.mc-radio-disabled]': 'disabled',
                '(focus)': '_inputElement.nativeElement.focus()'
            }
        }),
        __param(0, Optional()),
        __metadata("design:paramtypes", [McRadioGroup,
            ElementRef,
            ChangeDetectorRef,
            UniqueSelectionDispatcher])
    ], McRadioButton);
    return McRadioButton;
}(_McRadioButtonMixinBase));

var McRadioModule = /** @class */ (function () {
    function McRadioModule() {
    }
    McRadioModule = __decorate([
        NgModule({
            imports: [CommonModule, A11yModule, McCommonModule],
            exports: [McRadioGroup, McRadioButton, McCommonModule],
            declarations: [McRadioGroup, McRadioButton]
        })
    ], McRadioModule);
    return McRadioModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { McRadioModule, McRadioChange, McRadioGroupBase, _McRadioGroupMixinBase, MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR, McRadioGroup, McRadioButtonBase, _McRadioButtonMixinBase, McRadioButton };
//# sourceMappingURL=radio.es5.js.map
