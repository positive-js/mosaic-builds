/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { InjectionToken, Directive, ElementRef, Inject, Input, Optional, Self, NgModule } from '@angular/core';
import { __decorate, __extends, __metadata, __param } from 'tslib';
import { Subject } from 'rxjs';
import { FormGroupDirective, NgControl, NgForm, FormsModule } from '@angular/forms';
import { coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { getSupportedInputTypes, Platform } from '@ptsecurity/cdk/platform';
import { ErrorStateMatcher, mixinErrorState, McCommonModule } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@ptsecurity/cdk/a11y';

function getMcInputUnsupportedTypeError(inputType) {
    return Error("Input type \"" + inputType + "\" isn't supported by mcInput.");
}

var MC_INPUT_VALUE_ACCESSOR = new InjectionToken('MC_INPUT_VALUE_ACCESSOR');

var MC_INPUT_INVALID_TYPES = [
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
var nextUniqueId = 0;
var McInputBase = /** @class */ (function () {
    function McInputBase(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
    return McInputBase;
}());
var _McInputMixinBase = mixinErrorState(McInputBase);
var McInput = /** @class */ (function (_super) {
    __extends(McInput, _super);
    function McInput(_elementRef, _platform, ngControl, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, inputValueAccessor) {
        var _this = _super.call(this, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) || this;
        _this._elementRef = _elementRef;
        _this._platform = _platform;
        _this.ngControl = ngControl;
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        _this.focused = false;
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        _this.stateChanges = new Subject();
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        _this.controlType = 'mc-input';
        _this._uid = "mc-input-" + nextUniqueId++;
        _this._disabled = false;
        _this._required = false;
        _this._type = 'text';
        _this._neverEmptyInputTypes = [
            'date',
            'datetime',
            'datetime-local',
            'month',
            'time',
            'week'
        ].filter(function (t) { return getSupportedInputTypes().has(t); });
        // If no input value accessor was explicitly specified, use the element as the input value
        // accessor.
        _this._inputValueAccessor = inputValueAccessor || _this._elementRef.nativeElement;
        _this._previousNativeValue = _this.value;
        // Force setter to be called in case id was not specified.
        _this.id = _this.id;
        return _this;
    }
    McInput_1 = McInput;
    Object.defineProperty(McInput.prototype, "disabled", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: function () {
            if (this.ngControl && this.ngControl.disabled !== null) {
                return this.ngControl.disabled;
            }
            return this._disabled;
        },
        set: function (value) {
            this._disabled = coerceBooleanProperty(value);
            // Browsers may not fire the blur event if the input is disabled too quickly.
            // Reset from here to ensure that the element doesn't become stuck.
            if (this.focused) {
                this.focused = false;
                this.stateChanges.next();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McInput.prototype, "id", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value || this._uid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McInput.prototype, "required", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: function () {
            return this._required;
        },
        set: function (value) {
            this._required = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McInput.prototype, "type", {
        // tslint:disable no-reserved-keywords
        /** Input type of the element. */
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value || 'text';
            this._validateType();
            // When using Angular inputs, developers are no longer able to set the properties on the native
            // input element. To ensure that bindings for `type` work, we need to sync the setter
            // with the native property. Textarea elements don't support the type property or attribute.
            if (getSupportedInputTypes().has(this._type)) {
                this._elementRef.nativeElement.type = this._type;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McInput.prototype, "value", {
        // tslint:enable no-reserved-keywords
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: function () {
            return this._inputValueAccessor.value;
        },
        set: function (value) {
            if (value !== this.value) {
                this._inputValueAccessor.value = value;
                this.stateChanges.next();
            }
        },
        enumerable: true,
        configurable: true
    });
    McInput.prototype.ngOnChanges = function () {
        this.stateChanges.next();
    };
    McInput.prototype.ngOnDestroy = function () {
        this.stateChanges.complete();
    };
    McInput.prototype.ngDoCheck = function () {
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
    };
    /** Focuses the input. */
    McInput.prototype.focus = function () {
        this._elementRef.nativeElement.focus();
    };
    /** Callback for the cases where the focused state of the input changes. */
    McInput.prototype._focusChanged = function (isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    };
    McInput.prototype._onInput = function () {
        // This is a noop function and is used to let Angular know whenever the value changes.
        // Angular will run a new change detection each time the `input` event has been dispatched.
        // It's necessary that Angular recognizes the value change, because when floatingLabel
        // is set to false and Angular forms aren't used, the placeholder won't recognize the
        // value changes and will not disappear.
        // Listening to the input event wouldn't be necessary when the input is using the
        // FormsModule or ReactiveFormsModule, because Angular forms also listens to input events.
    };
    Object.defineProperty(McInput.prototype, "empty", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: function () {
            return !this._isNeverEmpty() && !this._elementRef.nativeElement.value && !this._isBadInput();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    McInput.prototype.onContainerClick = function () {
        this.focus();
    };
    /** Does some manual dirty checking on the native input `value` property. */
    McInput.prototype._dirtyCheckNativeValue = function () {
        var newValue = this.value;
        if (this._previousNativeValue !== newValue) {
            this._previousNativeValue = newValue;
            this.stateChanges.next();
        }
    };
    /** Make sure the input is a supported type. */
    McInput.prototype._validateType = function () {
        if (MC_INPUT_INVALID_TYPES.indexOf(this._type) > -1) {
            throw getMcInputUnsupportedTypeError(this._type);
        }
    };
    /** Checks whether the input type is one of the types that are never empty. */
    McInput.prototype._isNeverEmpty = function () {
        return this._neverEmptyInputTypes.indexOf(this._type) > -1;
    };
    /** Checks whether the input is invalid based on the native validation. */
    McInput.prototype._isBadInput = function () {
        // The `validity` property won't be present on platform-server.
        var validity = this._elementRef.nativeElement.validity;
        return validity && validity.badInput;
    };
    var McInput_1;
    __decorate([
        Input(),
        __metadata("design:type", ErrorStateMatcher)
    ], McInput.prototype, "errorStateMatcher", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McInput.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McInput.prototype, "id", null);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], McInput.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McInput.prototype, "required", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McInput.prototype, "type", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McInput.prototype, "value", null);
    McInput = McInput_1 = __decorate([
        Directive({
            selector: "input[mcInput]",
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
            providers: [{ provide: McFormFieldControl, useExisting: McInput_1 }]
        }),
        __param(2, Optional()), __param(2, Self()),
        __param(3, Optional()),
        __param(4, Optional()),
        __param(6, Optional()), __param(6, Self()), __param(6, Inject(MC_INPUT_VALUE_ACCESSOR)),
        __metadata("design:paramtypes", [ElementRef,
            Platform,
            NgControl,
            NgForm,
            FormGroupDirective,
            ErrorStateMatcher, Object])
    ], McInput);
    return McInput;
}(_McInputMixinBase));
var McInputMono = /** @class */ (function () {
    function McInputMono() {
    }
    McInputMono = __decorate([
        Directive({
            selector: 'input[mcInputMonospace]',
            exportAs: 'McInputMonospace',
            host: { class: 'mc-input_monospace' }
        })
    ], McInputMono);
    return McInputMono;
}());

var McInputModule = /** @class */ (function () {
    function McInputModule() {
    }
    McInputModule = __decorate([
        NgModule({
            imports: [CommonModule, A11yModule, McCommonModule, FormsModule],
            exports: [McInput, McInputMono],
            declarations: [McInput, McInputMono]
        })
    ], McInputModule);
    return McInputModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { MC_INPUT_VALUE_ACCESSOR as ɵa14, McInputModule, McInputBase, _McInputMixinBase, McInput, McInputMono };
//# sourceMappingURL=input.es5.js.map
