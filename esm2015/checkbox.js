/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { InjectionToken, forwardRef, EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, Attribute, Optional, Inject, Input, Output, ViewChild, Directive, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, CheckboxRequiredValidator } from '@angular/forms';
import { mixinTabIndex, mixinColor, mixinDisabled, toBoolean } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Injection token that can be used to specify the checkbox click behavior.
 * @type {?}
 */
const MC_CHECKBOX_CLICK_ACTION = new InjectionToken('mc-checkbox-click-action');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Increasing integer for generating unique ids for checkbox components.
/** @type {?} */
let nextUniqueId = 0;
/**
 * Provider Expression that allows mc-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * \@docs-private
 * @type {?}
 */
const MC_CHECKBOX_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => McCheckbox)),
    multi: true
};
/** @enum {number} */
const TransitionCheckState = {
    /** The initial state of the component before any user interaction. */
    Init: 0,
    /** The state representing the component when it's becoming checked. */
    Checked: 1,
    /** The state representing the component when it's becoming unchecked. */
    Unchecked: 2,
    /** The state representing the component when it's becoming indeterminate. */
    Indeterminate: 3,
};
TransitionCheckState[TransitionCheckState.Init] = 'Init';
TransitionCheckState[TransitionCheckState.Checked] = 'Checked';
TransitionCheckState[TransitionCheckState.Unchecked] = 'Unchecked';
TransitionCheckState[TransitionCheckState.Indeterminate] = 'Indeterminate';
/**
 * Change event object emitted by McCheckbox.
 */
class McCheckboxChange {
}
// Boilerplate for applying mixins to McCheckbox.
/**
 * \@docs-private
 */
class McCheckboxBase {
    // tslint:disable-next-line:naming-convention
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
const McCheckboxMixinBase = mixinTabIndex(mixinColor(mixinDisabled(McCheckboxBase)));
/**
 * A mosaic checkbox component. Supports all of the functionality of an HTML5 checkbox,
 * and exposes a similar API. A McCheckbox can be either checked, unchecked, indeterminate, or
 * disabled. Note that all additional accessibility attributes are taken care of by the component,
 * so there is no need to provide them yourself. However, if you want to omit a label and still
 * have the checkbox be accessible, you may supply an [aria-label] input.
 */
class McCheckbox extends McCheckboxMixinBase {
    // tslint:disable-next-line:naming-convention
    /**
     * @param {?} _elementRef
     * @param {?} _changeDetectorRef
     * @param {?} _focusMonitor
     * @param {?} tabIndex
     * @param {?} _clickAction
     */
    constructor(_elementRef, _changeDetectorRef, _focusMonitor, tabIndex, _clickAction) {
        super(_elementRef);
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
        /**
         * Whether the label should appear after or before the checkbox. Defaults to 'after'
         */
        this.labelPosition = 'after';
        /**
         * Name value will be applied to the input element if present
         */
        this.name = null;
        /**
         * Event emitted when the checkbox's `checked` value changes.
         */
        this.change = new EventEmitter();
        /**
         * Event emitted when the checkbox's `indeterminate` value changes.
         */
        this.indeterminateChange = new EventEmitter();
        this.uniqueId = `mc-checkbox-${++nextUniqueId}`;
        this.currentAnimationClass = '';
        this.currentCheckState = TransitionCheckState.Init;
        /**
         * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
         * \@docs-private
         */
        // tslint:disable-next-line:no-empty
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
        this._checked = false;
        this._disabled = false;
        this._indeterminate = false;
        // tslint:disable-next-line:no-empty
        this.controlValueAccessorChangeFn = (/**
         * @return {?}
         */
        () => { });
        this.tabIndex = parseInt(tabIndex) || 0;
        this.id = this.uniqueId;
    }
    /**
     * Returns the unique id for the visual hidden input.
     * @return {?}
     */
    get inputId() {
        return `${this.id || this.uniqueId}-input`;
    }
    /**
     * Whether the checkbox is required.
     * @return {?}
     */
    get required() {
        return this._required;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) {
        this._required = toBoolean(value);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._focusMonitor
            .monitor(this.inputElement.nativeElement)
            .subscribe((/**
         * @param {?} focusOrigin
         * @return {?}
         */
        (focusOrigin) => this.onInputFocusChange(focusOrigin)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this.inputElement.nativeElement);
    }
    /**
     * Whether the checkbox is checked.
     * @return {?}
     */
    get checked() {
        return this._checked;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set checked(value) {
        if (value !== this.checked) {
            this._checked = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
     * Whether the checkbox is disabled. This fully overrides the implementation provided by
     * mixinDisabled, but the mixin is still required because mixinTabIndex requires it.
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
        if (value !== this.disabled) {
            this._disabled = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
     * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
     * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
     * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
     * set to false.
     * @return {?}
     */
    get indeterminate() {
        return this._indeterminate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set indeterminate(value) {
        /** @type {?} */
        const changed = value !== this._indeterminate;
        this._indeterminate = value;
        if (changed) {
            if (this._indeterminate) {
                this.transitionCheckState(TransitionCheckState.Indeterminate);
            }
            else {
                this.transitionCheckState(this.checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
            }
            this.indeterminateChange.emit(this._indeterminate);
        }
    }
    /**
     * Method being called whenever the label text changes.
     * @return {?}
     */
    onLabelTextChange() {
        // This method is getting called whenever the label of the checkbox changes.
        // Since the checkbox uses the OnPush strategy we need to notify it about the change
        // that has been recognized by the cdkObserveContent directive.
        this._changeDetectorRef.markForCheck();
    }
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.checked = !!value;
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
     * @return {?}
     */
    getAriaChecked() {
        return this.checked ? 'true' : (this.indeterminate ? 'mixed' : 'false');
    }
    /**
     * Toggles the `checked` state of the checkbox.
     * @return {?}
     */
    toggle() {
        this.checked = !this.checked;
    }
    /**
     * Event handler for checkbox input element.
     * Toggles checked state if element is not disabled.
     * Do not toggle on (change) event since IE doesn't fire change event when
     *   indeterminate checkbox is clicked.
     * @param {?} event Input click event
     * @return {?}
     */
    onInputClick(event) {
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
                Promise.resolve().then((/**
                 * @return {?}
                 */
                () => {
                    this._indeterminate = false;
                    this.indeterminateChange.emit(this._indeterminate);
                }));
            }
            this.toggle();
            this.transitionCheckState(this._checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
            // Emit our custom change event if the native input emitted one.
            // It is important to only emit it, if the native input triggered one, because
            // we don't want to trigger a change event, when the `checked` variable changes for example.
            this.emitChangeEvent();
        }
        else if (!this.disabled && this._clickAction === 'noop') {
            // Reset native input when clicked with noop. The native checkbox becomes checked after
            // click, reset it to be align with `checked` value of `mc-checkbox`.
            this.inputElement.nativeElement.checked = this.checked;
            this.inputElement.nativeElement.indeterminate = this.indeterminate;
        }
    }
    /**
     * Focuses the checkbox.
     * @return {?}
     */
    focus() {
        this._focusMonitor.focusVia(this.inputElement.nativeElement, 'keyboard');
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onInteractionEvent(event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
    }
    /**
     * @private
     * @param {?} newState
     * @return {?}
     */
    transitionCheckState(newState) {
        /** @type {?} */
        const oldState = this.currentCheckState;
        /** @type {?} */
        const element = this._elementRef.nativeElement;
        if (oldState === newState) {
            return;
        }
        if (this.currentAnimationClass.length > 0) {
            element.classList.remove(this.currentAnimationClass);
        }
        this.currentCheckState = newState;
        if (this.currentAnimationClass.length > 0) {
            element.classList.add(this.currentAnimationClass);
        }
    }
    /**
     * @private
     * @return {?}
     */
    emitChangeEvent() {
        /** @type {?} */
        const event = new McCheckboxChange();
        event.source = this;
        event.checked = this.checked;
        this.controlValueAccessorChangeFn(this.checked);
        this.change.emit(event);
    }
    /**
     * Function is called whenever the focus changes for the input element.
     * @private
     * @param {?} focusOrigin
     * @return {?}
     */
    onInputFocusChange(focusOrigin) {
        if (focusOrigin) {
            this.onTouched();
        }
    }
}
McCheckbox.decorators = [
    { type: Component, args: [{
                selector: 'mc-checkbox',
                template: "<label [attr.for]=\"inputId\" class=\"mc-checkbox-layout\" #label><div class=\"mc-checkbox-inner-container\" [class.mc-checkbox-inner-container-no-side-margin]=\"!checkboxLabel.textContent || !checkboxLabel.textContent.trim()\"><input #input type=\"checkbox\" class=\"mc-checkbox-input cdk-visually-hidden\" [id]=\"inputId\" [required]=\"required\" [checked]=\"checked\" [attr.value]=\"value\" [disabled]=\"disabled\" [attr.name]=\"name\" [tabIndex]=\"tabIndex\" [indeterminate]=\"indeterminate\" [attr.aria-label]=\"ariaLabel || null\" [attr.aria-labelledby]=\"ariaLabelledby\" [attr.aria-checked]=\"getAriaChecked()\" (change)=\"onInteractionEvent($event)\" (click)=\"onInputClick($event)\"><div class=\"mc-checkbox-frame\"><i class=\"mc-checkbox-checkmark mc mc-check_16\"></i> <i class=\"mc-checkbox-mixedmark mc mc-minus_16\"></i></div></div><span class=\"mc-checkbox-label\" #checkboxLabel (cdkObserveContent)=\"onLabelTextChange()\"><ng-content></ng-content></span></label>",
                styles: [".mc-checkbox-frame{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:3px;box-sizing:border-box;pointer-events:none}.mc-checkbox-checkmark,.mc-checkbox-mixedmark{display:none;position:absolute;top:-1px;left:-1px;right:0;bottom:0}.mc-checkbox-frame{background-color:transparent;border-width:1px;border-style:solid;box-shadow:inset 0 0 1px 0 rgba(0,0,0,.2)}.mc-checkbox{display:inline-block;cursor:pointer;-webkit-tap-highlight-color:transparent}.mc-checkbox.mc-checked .mc-checkbox-checkmark{display:block}.mc-checkbox.mc-checked .mc-checkbox-mixedmark{display:none}.mc-checkbox.mc-indeterminate .mc-checkbox-checkmark{display:none}.mc-checkbox.mc-indeterminate .mc-checkbox-mixedmark{display:block}.mc-checkbox.mc-disabled{cursor:default}.mc-checkbox.mc-disabled .mc-checkbox-frame{box-shadow:none}.mc-checkbox-layout{cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap;width:100%}.mc-checkbox-inner-container{display:inline-block;height:16px;line-height:0;margin-right:8px;order:0;position:relative;align-self:center;white-space:nowrap;width:16px;flex-shrink:0}[dir=rtl] .mc-checkbox-inner-container{margin-left:8px;margin-right:auto}.mc-checkbox-inner-container-no-side-margin{margin-left:0;margin-right:0}.mc-checkbox-label-before .mc-checkbox-inner-container{order:1;margin-left:8px;margin-right:auto}[dir=rtl] .mc-checkbox-label-before .mc-checkbox-inner-container{margin-left:auto;margin-right:8px}"],
                exportAs: 'mcCheckbox',
                host: {
                    class: 'mc-checkbox',
                    '[id]': 'id',
                    '[attr.id]': 'id',
                    '[class.mc-indeterminate]': 'indeterminate',
                    '[class.mc-checked]': 'checked',
                    '[class.mc-disabled]': 'disabled',
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
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: FocusMonitor },
    { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_CHECKBOX_CLICK_ACTION,] }] }
];
McCheckbox.propDecorators = {
    ariaLabel: [{ type: Input, args: ['aria-label',] }],
    ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }],
    id: [{ type: Input }],
    labelPosition: [{ type: Input }],
    name: [{ type: Input }],
    change: [{ type: Output }],
    indeterminateChange: [{ type: Output }],
    value: [{ type: Input }],
    inputElement: [{ type: ViewChild, args: ['input', { static: false },] }],
    required: [{ type: Input }],
    checked: [{ type: Input }],
    disabled: [{ type: Input }],
    indeterminate: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const MC_CHECKBOX_REQUIRED_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => McCheckboxRequiredValidator)),
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McCheckboxModule {
}
McCheckboxModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [McCheckbox, McCheckboxRequiredValidator],
                declarations: [McCheckbox, McCheckboxRequiredValidator]
            },] },
];

export { MC_CHECKBOX_CLICK_ACTION, MC_CHECKBOX_CONTROL_VALUE_ACCESSOR, MC_CHECKBOX_REQUIRED_VALIDATOR, McCheckbox, McCheckboxBase, McCheckboxChange, McCheckboxMixinBase, McCheckboxModule, McCheckboxRequiredValidator, TransitionCheckState };
//# sourceMappingURL=checkbox.js.map
