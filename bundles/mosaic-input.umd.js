/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/forms'), require('@ptsecurity/cdk/a11y'), require('@ptsecurity/mosaic/core'), require('@angular/cdk/coercion'), require('@angular/cdk/platform'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/mosaic/form-field'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/input', ['exports', '@angular/common', '@angular/core', '@angular/forms', '@ptsecurity/cdk/a11y', '@ptsecurity/mosaic/core', '@angular/cdk/coercion', '@angular/cdk/platform', '@ptsecurity/cdk/keycodes', '@ptsecurity/mosaic/form-field', 'rxjs'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.input = {}), global.ng.common, global.ng.core, global.ng.forms, global.ng.cdk.a11y, global.ng.mosaic.core, global.ng.cdk.coercion, global.ng.cdk.platform, global.ng.cdk.keycodes, global.ng.mosaic.formField, global.rxjs));
}(this, (function (exports, common, core, forms, a11y, core$1, coercion, platform, keycodes, formField, rxjs) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} inputType
     * @return {?}
     */
    function getMcInputUnsupportedTypeError(inputType) {
        return Error("Input type \"" + inputType + "\" isn't supported by mcInput.");
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var MC_INPUT_VALUE_ACCESSOR = new core.InjectionToken('MC_INPUT_VALUE_ACCESSOR');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} value
     * @return {?}
     */
    function getPrecision(value) {
        /** @type {?} */
        var arr = value.toString().split('.');
        return arr.length === 1
            ? 1
            // tslint:disable-next-line:no-magic-numbers
            : Math.pow(10, arr[1].length);
    }
    /**
     * @param {?} value1
     * @param {?} value2
     * @return {?}
     */
    function add(value1, value2) {
        /** @type {?} */
        var precision = Math.max(getPrecision(value1), getPrecision(value2));
        return (value1 * precision + value2 * precision) / precision;
    }
    /** @type {?} */
    var stepUp = (/**
     * @param {?} value
     * @param {?} max
     * @param {?} min
     * @param {?} step
     * @return {?}
     */
    function (value, max, min, step) {
        return Math.max(Math.min(add(value, step), max), min);
    });
    /** @type {?} */
    var stepDown = (/**
     * @param {?} value
     * @param {?} max
     * @param {?} min
     * @param {?} step
     * @return {?}
     */
    function (value, max, min, step) {
        return Math.min(Math.max(add(value, -step), min), max);
    });

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
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
    /** @type {?} */
    var BIG_STEP = 10;
    /** @type {?} */
    var SMALL_STEP = 1;
    /** @type {?} */
    var nextUniqueId = 0;
    var McInputBase = /** @class */ (function () {
        function McInputBase(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
            this.defaultErrorStateMatcher = defaultErrorStateMatcher;
            this.parentForm = parentForm;
            this.parentFormGroup = parentFormGroup;
            this.ngControl = ngControl;
        }
        return McInputBase;
    }());
    // tslint:disable-next-line:naming-convention
    /** @type {?} */
    var McInputMixinBase = core$1.mixinErrorState(McInputBase);
    var McNumberInput = /** @class */ (function () {
        function McNumberInput(platform, elementRef, model, step, bigStep, min, max) {
            this.platform = platform;
            this.elementRef = elementRef;
            this.model = model;
            /**
             * Implemented as part of McFormFieldNumberControl.
             * \@docs-private
             */
            this.focused = false;
            /**
             * Implemented as part of McFormFieldNumberControl.
             * \@docs-private
             */
            this.stateChanges = new rxjs.Subject();
            this.step = this.isDigit(step) ? parseFloat(step) : SMALL_STEP;
            this.bigStep = this.isDigit(bigStep) ? parseFloat(bigStep) : BIG_STEP;
            this.min = this.isDigit(min) ? parseFloat(min) : -Infinity;
            this.max = this.isDigit(max) ? parseFloat(max) : Infinity;
            this.host = this.elementRef.nativeElement;
            /** @type {?} */
            var self = this;
            if ('valueAsNumber' in this.host) {
                Object.defineProperty(Object.getPrototypeOf(this.host), 'valueAsNumber', {
                    // tslint:disable-next-line:no-reserved-keywords
                    get: 
                    // tslint:disable-next-line:no-reserved-keywords
                    /**
                     * @return {?}
                     */
                    function () {
                        /** @type {?} */
                        var res = parseFloat(self.normalizeSplitter(this.value));
                        return isNaN(res) ? null : res;
                    }
                });
            }
        }
        /**
         * @param {?} isFocused
         * @return {?}
         */
        McNumberInput.prototype.focusChanged = /**
         * @param {?} isFocused
         * @return {?}
         */
        function (isFocused) {
            if (isFocused !== this.focused) {
                this.focused = isFocused;
                this.stateChanges.next();
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        McNumberInput.prototype.onKeyDown = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            var _this = this;
            // tslint:disable-next-line:deprecation
            /** @type {?} */
            var keyCode = event.keyCode;
            /** @type {?} */
            var isCtrlA = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e.keyCode === keycodes.A && (e.ctrlKey || e.metaKey); });
            /** @type {?} */
            var isCtrlC = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e.keyCode === keycodes.C && (e.ctrlKey || e.metaKey); });
            /** @type {?} */
            var isCtrlV = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e.keyCode === keycodes.V && (e.ctrlKey || e.metaKey); });
            /** @type {?} */
            var isCtrlX = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e.keyCode === keycodes.X && (e.ctrlKey || e.metaKey); });
            /** @type {?} */
            var isCtrlZ = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e.keyCode === keycodes.Z && (e.ctrlKey || e.metaKey); });
            /** @type {?} */
            var isFKey = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e.keyCode >= keycodes.F1 && e.keyCode <= keycodes.F12; });
            /** @type {?} */
            var isNumber = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return (e.keyCode >= keycodes.ZERO && e.keyCode <= keycodes.NINE) ||
                (e.keyCode >= keycodes.NUMPAD_ZERO && e.keyCode <= keycodes.NUMPAD_NINE); });
            /** @type {?} */
            var minuses = [keycodes.NUMPAD_MINUS, keycodes.DASH, keycodes.FF_MINUS];
            /** @type {?} */
            var serviceKeys = [keycodes.DELETE, keycodes.BACKSPACE, keycodes.TAB, keycodes.ESCAPE, keycodes.ENTER];
            /** @type {?} */
            var arrows = [keycodes.LEFT_ARROW, keycodes.RIGHT_ARROW];
            /** @type {?} */
            var allowedKeys = [keycodes.HOME, keycodes.END].concat(arrows).concat(serviceKeys).concat(minuses);
            /** @type {?} */
            var isIEPeriod = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e.key === '.' || e.key === 'Decimal'; });
            /** @type {?} */
            var isNotIEPeriod = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e.key === '.' || e.key === ','; });
            // Decimal is for IE
            /** @type {?} */
            var isPeriod = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return _this.platform.EDGE || _this.platform.TRIDENT
                ? isIEPeriod(e)
                : isNotIEPeriod(e); });
            if (allowedKeys.indexOf(keyCode) !== -1 ||
                isCtrlA(event) ||
                isCtrlC(event) ||
                isCtrlV(event) ||
                isCtrlX(event) ||
                isCtrlZ(event) ||
                isFKey(event) ||
                isPeriod(event)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is not a number and stop the keypress
            if (event.shiftKey || !isNumber(event)) {
                event.preventDefault();
                // process steps
                /** @type {?} */
                var step = event.shiftKey ? this.bigStep : this.step;
                if (keyCode === keycodes.UP_ARROW) {
                    this.stepUp(step);
                }
                if (keyCode === keycodes.DOWN_ARROW) {
                    this.stepDown(step);
                }
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        McNumberInput.prototype.onPaste = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var value = event.clipboardData.getData('text');
            value = this.normalizeSplitter(value);
            if (!this.isDigit(value)) {
                event.preventDefault();
            }
        };
        /**
         * @param {?} step
         * @return {?}
         */
        McNumberInput.prototype.stepUp = /**
         * @param {?} step
         * @return {?}
         */
        function (step) {
            this.elementRef.nativeElement.focus();
            /** @type {?} */
            var res = stepUp(this.host.valueAsNumber || 0, this.max, this.min, step);
            this.host.value = res.toString();
            this.model.update.emit(this.host.valueAsNumber);
        };
        /**
         * @param {?} step
         * @return {?}
         */
        McNumberInput.prototype.stepDown = /**
         * @param {?} step
         * @return {?}
         */
        function (step) {
            this.elementRef.nativeElement.focus();
            /** @type {?} */
            var res = stepDown(this.host.valueAsNumber || 0, this.max, this.min, step);
            this.host.value = res.toString();
            this.model.update.emit(this.host.valueAsNumber);
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        McNumberInput.prototype.normalizeSplitter = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return value ? value.replace(/,/g, '.') : value;
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        McNumberInput.prototype.isDigit = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return this.isFloat(value) || this.isInt(value);
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        McNumberInput.prototype.isFloat = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return /^-?\d+\.\d+$/.test(value);
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        McNumberInput.prototype.isInt = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return /^-?\d+$/.test(value);
        };
        McNumberInput.decorators = [
            { type: core.Directive, args: [{
                        selector: "input[mcInput][type=\"number\"]",
                        exportAs: 'mcNumericalInput',
                        providers: [
                            { provide: formField.McFormFieldNumberControl, useExisting: McNumberInput }
                        ],
                        host: {
                            '(blur)': 'focusChanged(false)',
                            '(focus)': 'focusChanged(true)',
                            '(paste)': 'onPaste($event)',
                            '(keydown)': 'onKeyDown($event)'
                        }
                    },] },
        ];
        /** @nocollapse */
        McNumberInput.ctorParameters = function () { return [
            { type: platform.Platform },
            { type: core.ElementRef },
            { type: forms.NgModel },
            { type: String, decorators: [{ type: core.Attribute, args: ['step',] }] },
            { type: String, decorators: [{ type: core.Attribute, args: ['big-step',] }] },
            { type: String, decorators: [{ type: core.Attribute, args: ['min',] }] },
            { type: String, decorators: [{ type: core.Attribute, args: ['max',] }] }
        ]; };
        McNumberInput.propDecorators = {
            bigStep: [{ type: core.Input }],
            step: [{ type: core.Input }],
            min: [{ type: core.Input }],
            max: [{ type: core.Input }]
        };
        return McNumberInput;
    }());
    var McInput = /** @class */ (function (_super) {
        __extends(McInput, _super);
        // tslint:disable-next-line: naming-convention
        function McInput(elementRef, rawValidators, mcValidation, ngControl, ngModel, formControlName, parentForm, parentFormGroup, defaultErrorStateMatcher, inputValueAccessor) {
            var _this = _super.call(this, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) || this;
            _this.elementRef = elementRef;
            _this.rawValidators = rawValidators;
            _this.mcValidation = mcValidation;
            _this.ngModel = ngModel;
            _this.formControlName = formControlName;
            /**
             * Implemented as part of McFormFieldControl.
             * \@docs-private
             */
            _this.focused = false;
            /**
             * Implemented as part of McFormFieldControl.
             * \@docs-private
             */
            _this.stateChanges = new rxjs.Subject();
            /**
             * Implemented as part of McFormFieldControl.
             * \@docs-private
             */
            _this.controlType = 'mc-input';
            _this.uid = "mc-input-" + nextUniqueId++;
            _this.neverEmptyInputTypes = [
                'date',
                'datetime',
                'datetime-local',
                'month',
                'time',
                'week'
            ].filter((/**
             * @param {?} t
             * @return {?}
             */
            function (t) { return platform.getSupportedInputTypes().has(t); }));
            _this._disabled = false;
            _this._required = false;
            // tslint:enable no-reserved-keywords
            _this._type = 'text';
            // If no input value accessor was explicitly specified, use the element as the input value
            // accessor.
            _this._inputValueAccessor = inputValueAccessor || _this.elementRef.nativeElement;
            _this.previousNativeValue = _this.value;
            // Force setter to be called in case id was not specified.
            _this.id = _this.id;
            return _this;
        }
        Object.defineProperty(McInput.prototype, "disabled", {
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            get: /**
             * Implemented as part of McFormFieldControl.
             * \@docs-private
             * @return {?}
             */
            function () {
                if (this.ngControl && this.ngControl.disabled !== null) {
                    return this.ngControl.disabled;
                }
                return this._disabled;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
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
            get: /**
             * Implemented as part of McFormFieldControl.
             * \@docs-private
             * @return {?}
             */
            function () {
                return this._id;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._id = value || this.uid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McInput.prototype, "required", {
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            get: /**
             * Implemented as part of McFormFieldControl.
             * \@docs-private
             * @return {?}
             */
            function () {
                return this._required;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._required = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McInput.prototype, "type", {
            // tslint:disable no-reserved-keywords
            /** Input type of the element. */
            get: 
            // tslint:disable no-reserved-keywords
            /**
             * Input type of the element.
             * @return {?}
             */
            function () {
                return this._type;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._type = value || 'text';
                this.validateType();
                // When using Angular inputs, developers are no longer able to set the properties on the native
                // input element. To ensure that bindings for `type` work, we need to sync the setter
                // with the native property. Textarea elements don't support the type property or attribute.
                if (platform.getSupportedInputTypes().has(this._type)) {
                    this.elementRef.nativeElement.type = this._type;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McInput.prototype, "value", {
            /**
             * Implemented as part of McFormFieldControl.
             * @docs-private
             */
            get: /**
             * Implemented as part of McFormFieldControl.
             * \@docs-private
             * @return {?}
             */
            function () {
                return this._inputValueAccessor.value;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value !== this.value) {
                    this._inputValueAccessor.value = value;
                    this.stateChanges.next();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        McInput.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            if (!this.ngControl) {
                return;
            }
            if (this.mcValidation.useValidation) {
                core$1.setMosaicValidation(this);
            }
        };
        /**
         * @return {?}
         */
        McInput.prototype.ngOnChanges = /**
         * @return {?}
         */
        function () {
            this.stateChanges.next();
        };
        /**
         * @return {?}
         */
        McInput.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.stateChanges.complete();
        };
        /**
         * @return {?}
         */
        McInput.prototype.ngDoCheck = /**
         * @return {?}
         */
        function () {
            if (this.ngControl) {
                // We need to re-evaluate this on every change detection cycle, because there are some
                // error triggers that we can't subscribe to (e.g. parent form submissions). This means
                // that whatever logic is in here has to be super lean or we risk destroying the performance.
                this.updateErrorState();
            }
            // We need to dirty-check the native element's value, because there are some cases where
            // we won't be notified when it changes (e.g. the consumer isn't using forms or they're
            // updating the value using `emitEvent: false`).
            this.dirtyCheckNativeValue();
        };
        /** Focuses the input. */
        /**
         * Focuses the input.
         * @return {?}
         */
        McInput.prototype.focus = /**
         * Focuses the input.
         * @return {?}
         */
        function () {
            this.elementRef.nativeElement.focus();
        };
        /**
         * @return {?}
         */
        McInput.prototype.onBlur = /**
         * @return {?}
         */
        function () {
            this.focusChanged(false);
            (/** @type {?} */ (this.ngControl.control)).updateValueAndValidity();
        };
        /** Callback for the cases where the focused state of the input changes. */
        /**
         * Callback for the cases where the focused state of the input changes.
         * @param {?} isFocused
         * @return {?}
         */
        McInput.prototype.focusChanged = /**
         * Callback for the cases where the focused state of the input changes.
         * @param {?} isFocused
         * @return {?}
         */
        function (isFocused) {
            if (isFocused !== this.focused) {
                this.focused = isFocused;
                this.stateChanges.next();
            }
        };
        /**
         * @return {?}
         */
        McInput.prototype.onInput = /**
         * @return {?}
         */
        function () {
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
            get: /**
             * Implemented as part of McFormFieldControl.
             * \@docs-private
             * @return {?}
             */
            function () {
                return !this.isNeverEmpty() && !this.elementRef.nativeElement.value && !this.isBadInput();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        McInput.prototype.onContainerClick = /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            this.focus();
        };
        /** Does some manual dirty checking on the native input `value` property. */
        /**
         * Does some manual dirty checking on the native input `value` property.
         * @protected
         * @return {?}
         */
        McInput.prototype.dirtyCheckNativeValue = /**
         * Does some manual dirty checking on the native input `value` property.
         * @protected
         * @return {?}
         */
        function () {
            /** @type {?} */
            var newValue = this.value;
            if (this.previousNativeValue !== newValue) {
                this.previousNativeValue = newValue;
                this.stateChanges.next();
            }
        };
        /** Make sure the input is a supported type. */
        /**
         * Make sure the input is a supported type.
         * @protected
         * @return {?}
         */
        McInput.prototype.validateType = /**
         * Make sure the input is a supported type.
         * @protected
         * @return {?}
         */
        function () {
            if (MC_INPUT_INVALID_TYPES.indexOf(this._type) > -1) {
                throw getMcInputUnsupportedTypeError(this._type);
            }
        };
        /** Checks whether the input type is one of the types that are never empty. */
        /**
         * Checks whether the input type is one of the types that are never empty.
         * @protected
         * @return {?}
         */
        McInput.prototype.isNeverEmpty = /**
         * Checks whether the input type is one of the types that are never empty.
         * @protected
         * @return {?}
         */
        function () {
            return this.neverEmptyInputTypes.indexOf(this._type) > -1;
        };
        /** Checks whether the input is invalid based on the native validation. */
        /**
         * Checks whether the input is invalid based on the native validation.
         * @protected
         * @return {?}
         */
        McInput.prototype.isBadInput = /**
         * Checks whether the input is invalid based on the native validation.
         * @protected
         * @return {?}
         */
        function () {
            // The `validity` property won't be present on platform-server.
            /** @type {?} */
            var validity = ((/** @type {?} */ (this.elementRef.nativeElement))).validity;
            return validity && validity.badInput;
        };
        McInput.decorators = [
            { type: core.Directive, args: [{
                        selector: "input[mcInput]",
                        exportAs: 'mcInput',
                        host: {
                            class: 'mc-input',
                            // Native input properties that are overwritten by Angular inputs need to be synced with
                            // the native input element. Otherwise property bindings for those don't work.
                            '[attr.id]': 'id',
                            '[attr.placeholder]': 'placeholder',
                            '[disabled]': 'disabled',
                            '[required]': 'required',
                            '(blur)': 'onBlur()',
                            '(focus)': 'focusChanged(true)',
                            '(input)': 'onInput()'
                        },
                        providers: [
                            { provide: formField.McFormFieldControl, useExisting: McInput }
                        ]
                    },] },
        ];
        /** @nocollapse */
        McInput.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: Array, decorators: [{ type: core.Optional }, { type: core.Self }, { type: core.Inject, args: [forms.NG_VALIDATORS,] }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [core$1.MC_VALIDATION,] }] },
            { type: forms.NgControl, decorators: [{ type: core.Optional }, { type: core.Self }] },
            { type: forms.NgModel, decorators: [{ type: core.Optional }, { type: core.Self }] },
            { type: forms.FormControlName, decorators: [{ type: core.Optional }, { type: core.Self }] },
            { type: forms.NgForm, decorators: [{ type: core.Optional }] },
            { type: forms.FormGroupDirective, decorators: [{ type: core.Optional }] },
            { type: core$1.ErrorStateMatcher },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Self }, { type: core.Inject, args: [MC_INPUT_VALUE_ACCESSOR,] }] }
        ]; };
        McInput.propDecorators = {
            errorStateMatcher: [{ type: core.Input }],
            placeholder: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            id: [{ type: core.Input }],
            required: [{ type: core.Input }],
            type: [{ type: core.Input }],
            value: [{ type: core.Input }]
        };
        return McInput;
    }(McInputMixinBase));
    var McInputMono = /** @class */ (function () {
        function McInputMono() {
        }
        McInputMono.decorators = [
            { type: core.Directive, args: [{
                        selector: 'input[mcInputMonospace]',
                        exportAs: 'McInputMonospace',
                        host: { class: 'mc-input_monospace' }
                    },] },
        ];
        return McInputMono;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var MIN_VALIDATOR = {
        provide: forms.NG_VALIDATORS,
        useExisting: core.forwardRef((/**
         * @return {?}
         */
        function () { return MinValidator; })),
        multi: true
    };
    /**
     * A directive which installs the {\@link MinValidator} for any `formControlName`,
     * `formControl`, or control with `ngModel` that also has a `min` attribute.
     *
     * \@experimental
     */
    var MinValidator = /** @class */ (function () {
        function MinValidator() {
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        MinValidator.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if ('min' in changes) {
                this.createValidator();
                if (this.onChange) {
                    this.onChange();
                }
            }
        };
        /**
         * @param {?} c
         * @return {?}
         */
        MinValidator.prototype.validate = /**
         * @param {?} c
         * @return {?}
         */
        function (c) { return this.validator(c); };
        /**
         * @param {?} fn
         * @return {?}
         */
        MinValidator.prototype.registerOnValidatorChange = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) { this.onChange = fn; };
        /**
         * @private
         * @return {?}
         */
        MinValidator.prototype.createValidator = /**
         * @private
         * @return {?}
         */
        function () { this.validator = forms.Validators.min(parseInt(this.min, 10)); };
        MinValidator.decorators = [
            { type: core.Directive, args: [{
                        selector: '[min][formControlName],[min][formControl],[min][ngModel]',
                        providers: [MIN_VALIDATOR],
                        host: { '[attr.min]': 'min ? min : null' }
                    },] },
        ];
        MinValidator.propDecorators = {
            min: [{ type: core.Input }]
        };
        return MinValidator;
    }());
    /** @type {?} */
    var MAX_VALIDATOR = {
        provide: forms.NG_VALIDATORS,
        useExisting: core.forwardRef((/**
         * @return {?}
         */
        function () { return MaxValidator; })),
        multi: true
    };
    /**
     * A directive which installs the {\@link MaxValidator} for any `formControlName`,
     * `formControl`, or control with `ngModel` that also has a `min` attribute.
     *
     * \@experimental
     */
    var MaxValidator = /** @class */ (function () {
        function MaxValidator() {
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        MaxValidator.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if ('max' in changes) {
                this.createValidator();
                if (this.onChange) {
                    this.onChange();
                }
            }
        };
        /**
         * @param {?} c
         * @return {?}
         */
        MaxValidator.prototype.validate = /**
         * @param {?} c
         * @return {?}
         */
        function (c) { return this.validator(c); };
        /**
         * @param {?} fn
         * @return {?}
         */
        MaxValidator.prototype.registerOnValidatorChange = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) { this.onChange = fn; };
        /**
         * @private
         * @return {?}
         */
        MaxValidator.prototype.createValidator = /**
         * @private
         * @return {?}
         */
        function () { this.validator = forms.Validators.max(parseInt(this.max, 10)); };
        MaxValidator.decorators = [
            { type: core.Directive, args: [{
                        selector: '[max][formControlName],[max][formControl],[max][ngModel]',
                        providers: [MAX_VALIDATOR],
                        host: {
                            '[attr.max]': 'max ? max : null'
                        }
                    },] },
        ];
        MaxValidator.propDecorators = {
            max: [{ type: core.Input }]
        };
        return MaxValidator;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McInputModule = /** @class */ (function () {
        function McInputModule() {
        }
        McInputModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, a11y.A11yModule, core$1.McCommonModule, forms.FormsModule],
                        exports: [McInput, McNumberInput, McInputMono, MinValidator, MaxValidator],
                        declarations: [McInput, McNumberInput, McInputMono, MinValidator, MaxValidator]
                    },] },
        ];
        return McInputModule;
    }());

    exports.BIG_STEP = BIG_STEP;
    exports.MC_INPUT_VALUE_ACCESSOR = MC_INPUT_VALUE_ACCESSOR;
    exports.McInput = McInput;
    exports.McInputBase = McInputBase;
    exports.McInputMixinBase = McInputMixinBase;
    exports.McInputModule = McInputModule;
    exports.McInputMono = McInputMono;
    exports.McNumberInput = McNumberInput;
    exports.SMALL_STEP = SMALL_STEP;
    exports.stepDown = stepDown;
    exports.stepUp = stepUp;
    exports.ɵa25 = MIN_VALIDATOR;
    exports.ɵb25 = MinValidator;
    exports.ɵc25 = MAX_VALIDATOR;
    exports.ɵd25 = MaxValidator;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-input.umd.js.map
