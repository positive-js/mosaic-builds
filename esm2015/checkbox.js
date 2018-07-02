/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { InjectionToken, Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Output, ViewChild, ViewEncapsulation, Directive, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, CheckboxRequiredValidator, NG_VALIDATORS } from '@angular/forms';
import { FocusMonitor } from '@ptsecurity/cdk/a11y';
import { mixinColor, mixinDisabled, mixinTabIndex, toBoolean, McCommonModule } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';

/**
 * Injection token that can be used to specify the checkbox click behavior.
 */
const MC_CHECKBOX_CLICK_ACTION = new InjectionToken('mc-checkbox-click-action');

// Increasing integer for generating unique ids for checkbox components.
let nextUniqueId = 0;
/**
 * Provider Expression that allows mc-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const MC_CHECKBOX_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => McCheckbox),
    multi: true
};
/**
 * Represents the different states that require custom transitions between them.
 * @docs-private
 */
/**
 * Represents the different states that require custom transitions between them.
 * @docs-private
 */
var TransitionCheckState;
/**
 * Represents the different states that require custom transitions between them.
 * @docs-private
 */
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
class McCheckboxChange {
}
// Boilerplate for applying mixins to McCheckbox.
/** @docs-private */
class McCheckboxBase {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const _McCheckboxMixinBase = mixinTabIndex(mixinColor(mixinDisabled(McCheckboxBase)));
/**
 * A mosaic checkbox component. Supports all of the functionality of an HTML5 checkbox,
 * and exposes a similar API. A McCheckbox can be either checked, unchecked, indeterminate, or
 * disabled. Note that all additional accessibility attributes are taken care of by the component,
 * so there is no need to provide them yourself. However, if you want to omit a label and still
 * have the checkbox be accessible, you may supply an [aria-label] input.
 */
class McCheckbox extends _McCheckboxMixinBase {
    constructor(elementRef, _changeDetectorRef, _focusMonitor, tabIndex, _clickAction) {
        super(elementRef);
        this._changeDetectorRef = _changeDetectorRef;
        this._focusMonitor = _focusMonitor;
        this._clickAction = _clickAction;
        /**
             * Attached to the aria-label attribute of the host element. In most cases, arial-labelledby will
             * take precedence so this may be omitted.
             */
        this.ariaLabel = '';
        /**
             * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
             */
        this.ariaLabelledby = null;
        this._uniqueId = `mc-checkbox-${++nextUniqueId}`;
        /** A unique id for the checkbox input. If none is supplied, it will be auto-generated. */
        this.id = this._uniqueId;
        /** Whether the label should appear after or before the checkbox. Defaults to 'after' */
        this.labelPosition = 'after';
        /** Name value will be applied to the input element if present */
        this.name = null;
        /** Event emitted when the checkbox's `checked` value changes. */
        this.change = new EventEmitter();
        /** Event emitted when the checkbox's `indeterminate` value changes. */
        this.indeterminateChange = new EventEmitter();
        /**
             * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
             * @docs-private
             */
        this._onTouched = () => {
        };
        this._currentAnimationClass = '';
        this._currentCheckState = TransitionCheckState.Init;
        this._controlValueAccessorChangeFn = () => {
        };
        this._checked = false;
        this._disabled = false;
        this._indeterminate = false;
        this.tabIndex = parseInt(tabIndex) || 0;
    }
    /** Returns the unique id for the visual hidden input. */
    get inputId() {
        return `${this.id || this._uniqueId}-input`;
    }
    /** Whether the checkbox is required. */
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = toBoolean(value);
    }
    ngAfterViewInit() {
        this._focusMonitor
            .monitor(this._inputElement.nativeElement)
            .subscribe((focusOrigin) => this._onInputFocusChange(focusOrigin));
    }
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._inputElement.nativeElement);
    }
    /**
         * Whether the checkbox is checked.
         */
    get checked() {
        return this._checked;
    }
    set checked(value) {
        if (value != this.checked) {
            this._checked = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
         * Whether the checkbox is disabled. This fully overrides the implementation provided by
         * mixinDisabled, but the mixin is still required because mixinTabIndex requires it.
         */
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        if (value != this.disabled) {
            this._disabled = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
         * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
         * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
         * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
         * set to false.
         */
    get indeterminate() {
        return this._indeterminate;
    }
    set indeterminate(value) {
        const changed = value != this._indeterminate;
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
    }
    /** Method being called whenever the label text changes. */
    _onLabelTextChange() {
        // This method is getting called whenever the label of the checkbox changes.
        // Since the checkbox uses the OnPush strategy we need to notify it about the change
        // that has been recognized by the cdkObserveContent directive.
        this._changeDetectorRef.markForCheck();
    }
    // Implemented as part of ControlValueAccessor.
    writeValue(value) {
        this.checked = !!value;
    }
    // Implemented as part of ControlValueAccessor.
    registerOnChange(fn) {
        this._controlValueAccessorChangeFn = fn;
    }
    // Implemented as part of ControlValueAccessor.
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    // Implemented as part of ControlValueAccessor.
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    _getAriaChecked() {
        return this.checked ? 'true' : (this.indeterminate ? 'mixed' : 'false');
    }
    _transitionCheckState(newState) {
        const oldState = this._currentCheckState;
        const element = this._elementRef.nativeElement;
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
    }
    _emitChangeEvent() {
        const event = new McCheckboxChange();
        event.source = this;
        event.checked = this.checked;
        this._controlValueAccessorChangeFn(this.checked);
        this.change.emit(event);
    }
    /** Function is called whenever the focus changes for the input element. */
    _onInputFocusChange(focusOrigin) {
        if (focusOrigin) {
            this._onTouched();
        }
    }
    /** Toggles the `checked` state of the checkbox. */
    toggle() {
        this.checked = !this.checked;
    }
    /**
         * Event handler for checkbox input element.
         * Toggles checked state if element is not disabled.
         * Do not toggle on (change) event since IE doesn't fire change event when
         *   indeterminate checkbox is clicked.
         * @param event
         */
    _onInputClick(event) {
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
                Promise.resolve().then(() => {
                    this._indeterminate = false;
                    this.indeterminateChange.emit(this._indeterminate);
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
    }
    /** Focuses the checkbox. */
    focus() {
        this._focusMonitor.focusVia(this._inputElement.nativeElement, 'keyboard');
    }
    _onInteractionEvent(event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
    }
}
McCheckbox.decorators = [
    { type: Component, args: [{
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
            },] },
];
/** @nocollapse */
McCheckbox.ctorParameters = () => [
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
    { type: FocusMonitor, },
    { type: undefined, decorators: [{ type: Attribute, args: ['tabindex',] },] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_CHECKBOX_CLICK_ACTION,] },] },
];
McCheckbox.propDecorators = {
    "ariaLabel": [{ type: Input, args: ['aria-label',] },],
    "ariaLabelledby": [{ type: Input, args: ['aria-labelledby',] },],
    "id": [{ type: Input },],
    "required": [{ type: Input },],
    "labelPosition": [{ type: Input },],
    "name": [{ type: Input },],
    "change": [{ type: Output },],
    "indeterminateChange": [{ type: Output },],
    "value": [{ type: Input },],
    "_inputElement": [{ type: ViewChild, args: ['input',] },],
    "checked": [{ type: Input },],
    "disabled": [{ type: Input },],
    "indeterminate": [{ type: Input },],
};

const MC_CHECKBOX_REQUIRED_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => McCheckboxRequiredValidator),
    multi: true
};
/**
 * Validator for Mosaic checkbox's required attribute in template-driven checkbox.
 * Current CheckboxRequiredValidator only work with `input type=checkbox` and does not
 * work with `mc-checkbox`.
 */
class McCheckboxRequiredValidator extends CheckboxRequiredValidator {
}
McCheckboxRequiredValidator.decorators = [
    { type: Directive, args: [{
                selector: `mc-checkbox[required][formControlName],
             mc-checkbox[required][formControl], mc-checkbox[required][ngModel]`,
                providers: [MC_CHECKBOX_REQUIRED_VALIDATOR],
                host: { '[attr.required]': 'required ? "" : null' }
            },] },
];

class McCheckboxModule {
}
McCheckboxModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, McCommonModule],
                exports: [McCheckbox, McCheckboxRequiredValidator, McCommonModule],
                declarations: [McCheckbox, McCheckboxRequiredValidator]
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { MC_CHECKBOX_CONTROL_VALUE_ACCESSOR, TransitionCheckState, McCheckboxChange, McCheckboxBase, _McCheckboxMixinBase, McCheckbox, MC_CHECKBOX_CLICK_ACTION, McCheckboxModule, MC_CHECKBOX_REQUIRED_VALIDATOR, McCheckboxRequiredValidator };
//# sourceMappingURL=checkbox.js.map
