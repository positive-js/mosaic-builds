/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { InjectionToken, Directive, ElementRef, Inject, Input, Optional, Self, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroupDirective, NgControl, NgForm, FormsModule } from '@angular/forms';
import { coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { getSupportedInputTypes, Platform } from '@ptsecurity/cdk/platform';
import { ErrorStateMatcher, mixinErrorState, McCommonModule } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@ptsecurity/cdk/a11y';

function getMcInputUnsupportedTypeError(inputType) {
    return Error(`Input type "${inputType}" isn't supported by mcInput.`);
}

const MC_INPUT_VALUE_ACCESSOR = new InjectionToken('MC_INPUT_VALUE_ACCESSOR');

const MC_INPUT_INVALID_TYPES = [
    'button',
    'checkbox',
    'file',
    'hidden',
    'image',
    'radio',
    'range',
    'reset',
    'submit'
];
let nextUniqueId = 0;
class McInputBase {
    constructor(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
}
const _McInputMixinBase = mixinErrorState(McInputBase);
class McInput extends _McInputMixinBase {
    constructor(_elementRef, _platform, ngControl, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, inputValueAccessor) {
        super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
        this._elementRef = _elementRef;
        this._platform = _platform;
        this.ngControl = ngControl;
        /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
        this.focused = false;
        /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
        this.stateChanges = new Subject();
        /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
        this.controlType = 'mc-input';
        this._uid = `mc-input-${nextUniqueId++}`;
        this._disabled = false;
        this._required = false;
        this._type = 'text';
        this._neverEmptyInputTypes = [
            'date',
            'datetime',
            'datetime-local',
            'month',
            'time',
            'week'
        ].filter((t) => getSupportedInputTypes().has(t));
        // If no input value accessor was explicitly specified, use the element as the input value
        // accessor.
        this._inputValueAccessor = inputValueAccessor || this._elementRef.nativeElement;
        this._previousNativeValue = this.value;
        // Force setter to be called in case id was not specified.
        this.id = this.id;
    }
    /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
    get disabled() {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        // Browsers may not fire the blur event if the input is disabled too quickly.
        // Reset from here to ensure that the element doesn't become stuck.
        if (this.focused) {
            this.focused = false;
            this.stateChanges.next();
        }
    }
    /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value || this._uid;
    }
    /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
    }
    // tslint:disable no-reserved-keywords
    /** Input type of the element. */
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value || 'text';
        this._validateType();
        // When using Angular inputs, developers are no longer able to set the properties on the native
        // input element. To ensure that bindings for `type` work, we need to sync the setter
        // with the native property. Textarea elements don't support the type property or attribute.
        if (getSupportedInputTypes().has(this._type)) {
            this._elementRef.nativeElement.type = this._type;
        }
    }
    // tslint:enable no-reserved-keywords
    /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
    get value() {
        return this._inputValueAccessor.value;
    }
    set value(value) {
        if (value !== this.value) {
            this._inputValueAccessor.value = value;
            this.stateChanges.next();
        }
    }
    ngOnChanges() {
        this.stateChanges.next();
    }
    ngOnDestroy() {
        this.stateChanges.complete();
    }
    ngDoCheck() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
        // We need to dirty-check the native element's value, because there are some cases where
        // we won't be notified when it changes (e.g. the consumer isn't using forms or they're
        // updating the value using `emitEvent: false`).
        this._dirtyCheckNativeValue();
    }
    /** Focuses the input. */
    focus() {
        this._elementRef.nativeElement.focus();
    }
    /** Callback for the cases where the focused state of the input changes. */
    _focusChanged(isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    }
    _onInput() {
        // This is a noop function and is used to let Angular know whenever the value changes.
        // Angular will run a new change detection each time the `input` event has been dispatched.
        // It's necessary that Angular recognizes the value change, because when floatingLabel
        // is set to false and Angular forms aren't used, the placeholder won't recognize the
        // value changes and will not disappear.
        // Listening to the input event wouldn't be necessary when the input is using the
        // FormsModule or ReactiveFormsModule, because Angular forms also listens to input events.
    }
    /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
    get empty() {
        return !this._isNeverEmpty() && !this._elementRef.nativeElement.value && !this._isBadInput();
    }
    /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
    onContainerClick() {
        this.focus();
    }
    /** Does some manual dirty checking on the native input `value` property. */
    _dirtyCheckNativeValue() {
        const newValue = this.value;
        if (this._previousNativeValue !== newValue) {
            this._previousNativeValue = newValue;
            this.stateChanges.next();
        }
    }
    /** Make sure the input is a supported type. */
    _validateType() {
        if (MC_INPUT_INVALID_TYPES.indexOf(this._type) > -1) {
            throw getMcInputUnsupportedTypeError(this._type);
        }
    }
    /** Checks whether the input type is one of the types that are never empty. */
    _isNeverEmpty() {
        return this._neverEmptyInputTypes.indexOf(this._type) > -1;
    }
    /** Checks whether the input is invalid based on the native validation. */
    _isBadInput() {
        // The `validity` property won't be present on platform-server.
        const validity = this._elementRef.nativeElement.validity;
        return validity && validity.badInput;
    }
}
McInput.decorators = [
    { type: Directive, args: [{
                selector: `input[mcInput]`,
                exportAs: 'mcInput',
                host: {
                    'class': 'mc-input',
                    // Native input properties that are overwritten by Angular inputs need to be synced with
                    // the native input element. Otherwise property bindings for those don't work.
                    '[attr.id]': 'id',
                    '[attr.placeholder]': 'placeholder',
                    '[disabled]': 'disabled',
                    '[required]': 'required',
                    '(blur)': '_focusChanged(false)',
                    '(focus)': '_focusChanged(true)',
                    '(input)': '_onInput()'
                },
                providers: [{ provide: McFormFieldControl, useExisting: McInput }]
            },] },
];
/** @nocollapse */
McInput.ctorParameters = () => [
    { type: ElementRef, },
    { type: Platform, },
    { type: NgControl, decorators: [{ type: Optional }, { type: Self },] },
    { type: NgForm, decorators: [{ type: Optional },] },
    { type: FormGroupDirective, decorators: [{ type: Optional },] },
    { type: ErrorStateMatcher, },
    { type: undefined, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [MC_INPUT_VALUE_ACCESSOR,] },] },
];
McInput.propDecorators = {
    "errorStateMatcher": [{ type: Input },],
    "disabled": [{ type: Input },],
    "id": [{ type: Input },],
    "placeholder": [{ type: Input },],
    "required": [{ type: Input },],
    "type": [{ type: Input },],
    "value": [{ type: Input },],
};
class McInputMono {
}
McInputMono.decorators = [
    { type: Directive, args: [{
                selector: 'input[mcInputMonospace]',
                exportAs: 'McInputMonospace',
                host: { class: 'mc-input_monospace' }
            },] },
];

class McInputModule {
}
McInputModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, A11yModule, McCommonModule, FormsModule],
                exports: [McInput, McInputMono],
                declarations: [McInput, McInputMono]
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { MC_INPUT_VALUE_ACCESSOR as ɵa11, McInputModule, McInputBase, _McInputMixinBase, McInput, McInputMono };
//# sourceMappingURL=input.js.map