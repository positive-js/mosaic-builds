/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { InjectionToken, Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Output, ViewChild, ViewEncapsulation, Directive, NgModule } from '@angular/core';
import { __extends, __decorate, __metadata, __param } from 'tslib';
import { NG_VALUE_ACCESSOR, CheckboxRequiredValidator, NG_VALIDATORS } from '@angular/forms';
import { FocusMonitor } from '@ptsecurity/cdk/a11y';
import { mixinColor, mixinDisabled, mixinTabIndex, toBoolean } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';

/**
 * Injection token that can be used to specify the checkbox click behavior.
 */
var MC_CHECKBOX_CLICK_ACTION = new InjectionToken('mc-checkbox-click-action');

// Increasing integer for generating unique ids for checkbox components.
var nextUniqueId = 0;
/**
 * Provider Expression that allows mc-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
var MC_CHECKBOX_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return McCheckbox; }),
    multi: true
};
/**
 * Represents the different states that require custom transitions between them.
 * @docs-private
 */
var TransitionCheckState;
(function (TransitionCheckState) {
    /** The initial state of the component before any user interaction. */
    TransitionCheckState[TransitionCheckState["Init"] = 0] = "Init";
    /** The state representing the component when it's becoming checked. */
    TransitionCheckState[TransitionCheckState["Checked"] = 1] = "Checked";
    /** The state representing the component when it's becoming unchecked. */
    TransitionCheckState[TransitionCheckState["Unchecked"] = 2] = "Unchecked";
    /** The state representing the component when it's becoming indeterminate. */
    TransitionCheckState[TransitionCheckState["Indeterminate"] = 3] = "Indeterminate";
})(TransitionCheckState || (TransitionCheckState = {}));
/** Change event object emitted by McCheckbox. */
var McCheckboxChange = /** @class */ (function () {
    function McCheckboxChange() {
    }
    return McCheckboxChange;
}());
// Boilerplate for applying mixins to McCheckbox.
/** @docs-private */
var McCheckboxBase = /** @class */ (function () {
    function McCheckboxBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McCheckboxBase;
}());
var _McCheckboxMixinBase = mixinTabIndex(mixinColor(mixinDisabled(McCheckboxBase)));
/**
 * A mosaic checkbox component. Supports all of the functionality of an HTML5 checkbox,
 * and exposes a similar API. A McCheckbox can be either checked, unchecked, indeterminate, or
 * disabled. Note that all additional accessibility attributes are taken care of by the component,
 * so there is no need to provide them yourself. However, if you want to omit a label and still
 * have the checkbox be accessible, you may supply an [aria-label] input.
 */
var McCheckbox = /** @class */ (function (_super) {
    __extends(McCheckbox, _super);
    function McCheckbox(elementRef, _changeDetectorRef, _focusMonitor, tabIndex, _clickAction) {
        var _this = _super.call(this, elementRef) || this;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._focusMonitor = _focusMonitor;
        _this._clickAction = _clickAction;
        /**
         * Attached to the aria-label attribute of the host element. In most cases, arial-labelledby will
         * take precedence so this may be omitted.
         */
        _this.ariaLabel = '';
        /**
         * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
         */
        _this.ariaLabelledby = null;
        _this._uniqueId = "mc-checkbox-" + ++nextUniqueId;
        /** A unique id for the checkbox input. If none is supplied, it will be auto-generated. */
        _this.id = _this._uniqueId;
        /** Whether the label should appear after or before the checkbox. Defaults to 'after' */
        _this.labelPosition = 'after';
        /** Name value will be applied to the input element if present */
        _this.name = null;
        /** Event emitted when the checkbox's `checked` value changes. */
        _this.change = new EventEmitter();
        /** Event emitted when the checkbox's `indeterminate` value changes. */
        _this.indeterminateChange = new EventEmitter();
        /**
         * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
         * @docs-private
         */
        _this._onTouched = function () {
        };
        _this._currentAnimationClass = '';
        _this._currentCheckState = TransitionCheckState.Init;
        _this._controlValueAccessorChangeFn = function () {
        };
        _this._checked = false;
        _this._disabled = false;
        _this._indeterminate = false;
        _this.tabIndex = parseInt(tabIndex) || 0;
        return _this;
    }
    Object.defineProperty(McCheckbox.prototype, "inputId", {
        /** Returns the unique id for the visual hidden input. */
        get: function () {
            return (this.id || this._uniqueId) + "-input";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCheckbox.prototype, "required", {
        /** Whether the checkbox is required. */
        get: function () {
            return this._required;
        },
        set: function (value) {
            this._required = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    McCheckbox.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._focusMonitor
            .monitor(this._inputElement.nativeElement)
            .subscribe(function (focusOrigin) { return _this._onInputFocusChange(focusOrigin); });
    };
    McCheckbox.prototype.ngOnDestroy = function () {
        this._focusMonitor.stopMonitoring(this._inputElement.nativeElement);
    };
    Object.defineProperty(McCheckbox.prototype, "checked", {
        /**
         * Whether the checkbox is checked.
         */
        get: function () {
            return this._checked;
        },
        set: function (value) {
            if (value != this.checked) {
                this._checked = value;
                this._changeDetectorRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCheckbox.prototype, "disabled", {
        /**
         * Whether the checkbox is disabled. This fully overrides the implementation provided by
         * mixinDisabled, but the mixin is still required because mixinTabIndex requires it.
         */
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            if (value != this.disabled) {
                this._disabled = value;
                this._changeDetectorRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCheckbox.prototype, "indeterminate", {
        /**
         * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
         * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
         * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
         * set to false.
         */
        get: function () {
            return this._indeterminate;
        },
        set: function (value) {
            var changed = value != this._indeterminate;
            this._indeterminate = value;
            if (changed) {
                if (this._indeterminate) {
                    this._transitionCheckState(TransitionCheckState.Indeterminate);
                }
                else {
                    this._transitionCheckState(this.checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
                }
                this.indeterminateChange.emit(this._indeterminate);
            }
        },
        enumerable: true,
        configurable: true
    });
    /** Method being called whenever the label text changes. */
    McCheckbox.prototype._onLabelTextChange = function () {
        // This method is getting called whenever the label of the checkbox changes.
        // Since the checkbox uses the OnPush strategy we need to notify it about the change
        // that has been recognized by the cdkObserveContent directive.
        this._changeDetectorRef.markForCheck();
    };
    // Implemented as part of ControlValueAccessor.
    McCheckbox.prototype.writeValue = function (value) {
        this.checked = !!value;
    };
    // Implemented as part of ControlValueAccessor.
    McCheckbox.prototype.registerOnChange = function (fn) {
        this._controlValueAccessorChangeFn = fn;
    };
    // Implemented as part of ControlValueAccessor.
    McCheckbox.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    // Implemented as part of ControlValueAccessor.
    McCheckbox.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    McCheckbox.prototype._getAriaChecked = function () {
        return this.checked ? 'true' : (this.indeterminate ? 'mixed' : 'false');
    };
    McCheckbox.prototype._transitionCheckState = function (newState) {
        var oldState = this._currentCheckState;
        var element = this._elementRef.nativeElement;
        if (oldState === newState) {
            return;
        }
        if (this._currentAnimationClass.length > 0) {
            element.classList.remove(this._currentAnimationClass);
        }
        this._currentCheckState = newState;
        if (this._currentAnimationClass.length > 0) {
            element.classList.add(this._currentAnimationClass);
        }
    };
    McCheckbox.prototype._emitChangeEvent = function () {
        var event = new McCheckboxChange();
        event.source = this;
        event.checked = this.checked;
        this._controlValueAccessorChangeFn(this.checked);
        this.change.emit(event);
    };
    /** Function is called whenever the focus changes for the input element. */
    McCheckbox.prototype._onInputFocusChange = function (focusOrigin) {
        if (focusOrigin) {
            this._onTouched();
        }
    };
    /** Toggles the `checked` state of the checkbox. */
    McCheckbox.prototype.toggle = function () {
        this.checked = !this.checked;
    };
    /**
     * Event handler for checkbox input element.
     * Toggles checked state if element is not disabled.
     * Do not toggle on (change) event since IE doesn't fire change event when
     *   indeterminate checkbox is clicked.
     * @param event
     */
    McCheckbox.prototype._onInputClick = function (event) {
        var _this = this;
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `checkbox` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
        // If resetIndeterminate is false, and the current state is indeterminate, do nothing on click
        if (!this.disabled && this._clickAction !== 'noop') {
            // When user manually click on the checkbox, `indeterminate` is set to false.
            if (this.indeterminate && this._clickAction !== 'check') {
                Promise.resolve().then(function () {
                    _this._indeterminate = false;
                    _this.indeterminateChange.emit(_this._indeterminate);
                });
            }
            this.toggle();
            this._transitionCheckState(this._checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
            // Emit our custom change event if the native input emitted one.
            // It is important to only emit it, if the native input triggered one, because
            // we don't want to trigger a change event, when the `checked` variable changes for example.
            this._emitChangeEvent();
        }
        else if (!this.disabled && this._clickAction === 'noop') {
            // Reset native input when clicked with noop. The native checkbox becomes checked after
            // click, reset it to be align with `checked` value of `mc-checkbox`.
            this._inputElement.nativeElement.checked = this.checked;
            this._inputElement.nativeElement.indeterminate = this.indeterminate;
        }
    };
    /** Focuses the checkbox. */
    McCheckbox.prototype.focus = function () {
        this._focusMonitor.focusVia(this._inputElement.nativeElement, 'keyboard');
    };
    McCheckbox.prototype._onInteractionEvent = function (event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
    };
    __decorate([
        Input('aria-label'),
        __metadata("design:type", String)
    ], McCheckbox.prototype, "ariaLabel", void 0);
    __decorate([
        Input('aria-labelledby'),
        __metadata("design:type", Object)
    ], McCheckbox.prototype, "ariaLabelledby", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], McCheckbox.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McCheckbox.prototype, "required", null);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], McCheckbox.prototype, "labelPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], McCheckbox.prototype, "name", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McCheckbox.prototype, "change", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McCheckbox.prototype, "indeterminateChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], McCheckbox.prototype, "value", void 0);
    __decorate([
        ViewChild('input'),
        __metadata("design:type", ElementRef)
    ], McCheckbox.prototype, "_inputElement", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McCheckbox.prototype, "checked", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McCheckbox.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McCheckbox.prototype, "indeterminate", null);
    McCheckbox = __decorate([
        Component({
            selector: 'mc-checkbox',
            template: "<label [attr.for]=\"inputId\" class=\"mc-checkbox-layout\" #label><div class=\"mc-checkbox-inner-container\" [class.mc-checkbox-inner-container-no-side-margin]=\"!checkboxLabel.textContent || !checkboxLabel.textContent.trim()\"><input #input class=\"mc-checkbox-input cdk-visually-hidden\" type=\"checkbox\" [id]=\"inputId\" [required]=\"required\" [checked]=\"checked\" [attr.value]=\"value\" [disabled]=\"disabled\" [attr.name]=\"name\" [tabIndex]=\"tabIndex\" [indeterminate]=\"indeterminate\" [attr.aria-label]=\"ariaLabel || null\" [attr.aria-labelledby]=\"ariaLabelledby\" [attr.aria-checked]=\"_getAriaChecked()\" (change)=\"_onInteractionEvent($event)\" (click)=\"_onInputClick($event)\"><div class=\"mc-checkbox-frame\"></div><div class=\"mc-checkbox-background\"><i class=\"mc-checkbox-checkmark mc mc-check_16\"></i> <i class=\"mc-checkbox-mixedmark mc mc-minus_16\"></i></div></div><span class=\"mc-checkbox-label\" #checkboxLabel (cdkObserveContent)=\"_onLabelTextChange()\"><span style=\"display:none\">&nbsp;</span><ng-content></ng-content></span></label>",
            styles: [".mc-checkbox-checkmark,.mc-checkbox-mixedmark{width:calc(100% - 2px)}.mc-checkbox-background,.mc-checkbox-frame{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:3px;box-sizing:border-box;pointer-events:none}.mc-checkbox{cursor:pointer;-webkit-tap-highlight-color:transparent}.mc-checkbox-layout{cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap}.mc-checkbox-inner-container{display:inline-block;height:16px;line-height:0;margin:auto;margin-right:8px;order:0;position:relative;vertical-align:middle;white-space:nowrap;width:16px;flex-shrink:0}[dir=rtl] .mc-checkbox-inner-container{margin-left:8px;margin-right:auto}.mc-checkbox-inner-container-no-side-margin{margin-left:0;margin-right:0}.mc-checkbox-frame{background-color:transparent;border-width:1px;border-style:solid;box-shadow:inset 0 0 1px 0 rgba(0,0,0,.2)}.mc-checkbox-background{align-items:center;display:inline-flex;justify-content:center}.mc-checkbox-checkmark,.mc-checkbox-mixedmark{top:0;left:0;right:0;bottom:0;position:absolute;width:100%;opacity:0}.mc-checkbox-label-before .mc-checkbox-inner-container{order:1;margin-left:8px;margin-right:auto}[dir=rtl] .mc-checkbox-label-before .mc-checkbox-inner-container{margin-left:auto;margin-right:8px}.mc-checkbox-checked .mc-checkbox-checkmark{opacity:1}.mc-checkbox-checked .mc-checkbox-mixedmark{opacity:0}.mc-checkbox-indeterminate .mc-checkbox-checkmark{opacity:0}.mc-checkbox-indeterminate .mc-checkbox-mixedmark{opacity:1}.mc-checkbox-unchecked .mc-checkbox-background{background-color:transparent}.mc-checkbox-disabled{cursor:default}.mc-checkbox-disabled .mc-checkbox-frame{box-shadow:none}.mc-checkbox-input{bottom:0;left:50%}.mc-checkbox-input:focus+.mc-checkbox-frame{top:-1px;left:-1px;border-width:2px;width:18px;height:18px}"],
            exportAs: 'mcCheckbox',
            host: {
                class: 'mc-checkbox',
                '[id]': 'id',
                '[attr.id]': 'id',
                '[class.mc-checkbox-indeterminate]': 'indeterminate',
                '[class.mc-checkbox-checked]': 'checked',
                '[class.mc-checkbox-disabled]': 'disabled',
                '[class.mc-checkbox-label-before]': 'labelPosition == "before"'
            },
            providers: [MC_CHECKBOX_CONTROL_VALUE_ACCESSOR],
            inputs: ['color', 'tabIndex'],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param(3, Attribute('tabindex')),
        __param(4, Optional()), __param(4, Inject(MC_CHECKBOX_CLICK_ACTION)),
        __metadata("design:paramtypes", [ElementRef,
            ChangeDetectorRef,
            FocusMonitor, String, Object])
    ], McCheckbox);
    return McCheckbox;
}(_McCheckboxMixinBase));

var MC_CHECKBOX_REQUIRED_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return McCheckboxRequiredValidator; }),
    multi: true
};
/**
 * Validator for Mosaic checkbox's required attribute in template-driven checkbox.
 * Current CheckboxRequiredValidator only work with `input type=checkbox` and does not
 * work with `mc-checkbox`.
 */
var McCheckboxRequiredValidator = /** @class */ (function (_super) {
    __extends(McCheckboxRequiredValidator, _super);
    function McCheckboxRequiredValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    McCheckboxRequiredValidator = __decorate([
        Directive({
            selector: "mc-checkbox[required][formControlName],\n             mc-checkbox[required][formControl], mc-checkbox[required][ngModel]",
            providers: [MC_CHECKBOX_REQUIRED_VALIDATOR],
            host: { '[attr.required]': 'required ? "" : null' }
        })
    ], McCheckboxRequiredValidator);
    return McCheckboxRequiredValidator;
}(CheckboxRequiredValidator));

var McCheckboxModule = /** @class */ (function () {
    function McCheckboxModule() {
    }
    McCheckboxModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [McCheckbox, McCheckboxRequiredValidator],
            declarations: [McCheckbox, McCheckboxRequiredValidator]
        })
    ], McCheckboxModule);
    return McCheckboxModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { MC_CHECKBOX_CONTROL_VALUE_ACCESSOR, TransitionCheckState, McCheckboxChange, McCheckboxBase, _McCheckboxMixinBase, McCheckbox, MC_CHECKBOX_CLICK_ACTION, McCheckboxModule, MC_CHECKBOX_REQUIRED_VALIDATOR, McCheckboxRequiredValidator };
//# sourceMappingURL=checkbox.es5.js.map
