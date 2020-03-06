/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/icon'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/mosaic/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/form-field', ['exports', '@angular/common', '@angular/core', '@ptsecurity/mosaic/icon', '@ptsecurity/cdk/keycodes', '@ptsecurity/mosaic/core', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.formField = {}), global.ng.common, global.ng.core, global.ng.mosaic.icon, global.ng.cdk.keycodes, global.ng.mosaic.core, global.rxjs, global.rxjs.operators));
}(this, (function (exports, common, core, icon, keycodes, core$1, rxjs, operators) { 'use strict';

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
    var McCleaner = /** @class */ (function () {
        function McCleaner() {
        }
        McCleaner.decorators = [
            { type: core.Component, args: [{
                        selector: 'mc-cleaner',
                        exportAs: 'mcCleaner',
                        template: '<i class="mc-icon_light" mc-icon="mc-close-M_16" color="second"></i>',
                        host: {
                            class: 'mc-cleaner'
                        }
                    },] },
        ];
        return McCleaner;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * An interface which allows a control to work inside of a `MсFormField`.
     * @abstract
     * @template T
     */
    // tslint:disable-next-line:naming-convention
    var   /**
     * An interface which allows a control to work inside of a `MсFormField`.
     * @abstract
     * @template T
     */
    // tslint:disable-next-line:naming-convention
    McFormFieldControl = /** @class */ (function () {
        function McFormFieldControl() {
        }
        return McFormFieldControl;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @return {?}
     */
    function getMcFormFieldMissingControlError() {
        return Error('mc-form-field must contain a McFormFieldControl.');
    }
    /**
     * @return {?}
     */
    function getMcFormFieldYouCanNotUseCleanerInNumberInputError() {
        return Error("You can't use mc-cleaner with input that have type=\"number\"");
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var nextUniqueId = 0;
    var McHint = /** @class */ (function () {
        function McHint() {
            this.id = "mc-hint-" + nextUniqueId++;
        }
        McHint.decorators = [
            { type: core.Directive, args: [{
                        selector: 'mc-hint',
                        host: {
                            class: 'mc-hint',
                            '[attr.id]': 'id'
                        }
                    },] },
        ];
        McHint.propDecorators = {
            id: [{ type: core.Input }]
        };
        return McHint;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McPrefix = /** @class */ (function () {
        function McPrefix() {
        }
        McPrefix.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mcPrefix]'
                    },] },
        ];
        return McPrefix;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McStepper = /** @class */ (function () {
        function McStepper() {
            this.stepUp = new core.EventEmitter();
            this.stepDown = new core.EventEmitter();
        }
        /**
         * @param {?} numberInput
         * @return {?}
         */
        McStepper.prototype.connectTo = /**
         * @param {?} numberInput
         * @return {?}
         */
        function (numberInput) {
            if (!numberInput) {
                return;
            }
            this.stepUp.subscribe((/**
             * @return {?}
             */
            function () {
                numberInput.stepUp(numberInput.step);
            }));
            this.stepDown.subscribe((/**
             * @return {?}
             */
            function () {
                numberInput.stepDown(numberInput.step);
            }));
        };
        /**
         * @param {?} $event
         * @return {?}
         */
        McStepper.prototype.onStepUp = /**
         * @param {?} $event
         * @return {?}
         */
        function ($event) {
            this.stepUp.emit();
            $event.preventDefault();
        };
        /**
         * @param {?} $event
         * @return {?}
         */
        McStepper.prototype.onStepDown = /**
         * @param {?} $event
         * @return {?}
         */
        function ($event) {
            this.stepDown.emit();
            $event.preventDefault();
        };
        McStepper.decorators = [
            { type: core.Component, args: [{
                        selector: 'mc-stepper',
                        template: "\n        <i class=\"mc mc-icon mc-icon_light mc-second mc-stepper-step-up mc-angle-down-L_16\"\n           (mousedown)=\"onStepUp($event)\">\n        </i>\n        <i class=\"mc mc-icon mc-icon_light mc-second mc-stepper-step-down mc-angle-down-L_16\"\n           (mousedown)=\"onStepDown($event)\">\n        </i>\n    "
                    },] },
        ];
        McStepper.propDecorators = {
            stepUp: [{ type: core.Output }],
            stepDown: [{ type: core.Output }]
        };
        return McStepper;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McSuffix = /** @class */ (function () {
        function McSuffix() {
        }
        McSuffix.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mcSuffix]'
                    },] },
        ];
        return McSuffix;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var nextUniqueId$1 = 0;
    var McFormFieldBase = /** @class */ (function () {
        // tslint:disable-next-line:naming-convention
        function McFormFieldBase(_elementRef) {
            this._elementRef = _elementRef;
        }
        return McFormFieldBase;
    }());
    // tslint:disable-next-line:naming-convention
    /** @type {?} */
    var McFormFieldMixinBase = core$1.mixinColor(McFormFieldBase);
    var McFormField = /** @class */ (function (_super) {
        __extends(McFormField, _super);
        // tslint:disable-next-line:naming-convention
        function McFormField(_elementRef, _changeDetectorRef) {
            var _this = _super.call(this, _elementRef) || this;
            _this._elementRef = _elementRef;
            _this._changeDetectorRef = _changeDetectorRef;
            // Unique id for the internal form field label.
            _this.labelId = "mc-form-field-label-" + nextUniqueId$1++;
            _this.hovered = false;
            _this.canCleanerClearByEsc = true;
            return _this;
        }
        /**
         * @return {?}
         */
        McFormField.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (((/** @type {?} */ (this.control))).numberInput && this.hasCleaner) {
                this.cleaner = null;
                throw getMcFormFieldYouCanNotUseCleanerInNumberInputError();
            }
            this.validateControlChild();
            if (this.control.controlType) {
                this._elementRef.nativeElement.classList.add("mc-form-field-type-" + this.control.controlType);
            }
            // Subscribe to changes in the child control state in order to update the form field UI.
            this.control.stateChanges
                .pipe(operators.startWith())
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this._changeDetectorRef.markForCheck();
            }));
            if (this.hasStepper) {
                this.stepper.connectTo(((/** @type {?} */ (this.control))).numberInput);
            }
            // Run change detection if the value changes.
            /** @type {?} */
            var valueChanges = this.control.ngControl && this.control.ngControl.valueChanges || rxjs.EMPTY;
            rxjs.merge(valueChanges)
                .subscribe((/**
             * @return {?}
             */
            function () { return _this._changeDetectorRef.markForCheck(); }));
        };
        /**
         * @return {?}
         */
        McFormField.prototype.ngAfterContentChecked = /**
         * @return {?}
         */
        function () {
            this.validateControlChild();
        };
        /**
         * @return {?}
         */
        McFormField.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            // Avoid animations on load.
            this._changeDetectorRef.detectChanges();
        };
        /**
         * @param {?} $event
         * @return {?}
         */
        McFormField.prototype.clearValue = /**
         * @param {?} $event
         * @return {?}
         */
        function ($event) {
            $event.stopPropagation();
            if (this.control && this.control.ngControl) {
                this.control.ngControl.reset();
                this.control.focus();
            }
        };
        /**
         * @param {?} $event
         * @return {?}
         */
        McFormField.prototype.onContainerClick = /**
         * @param {?} $event
         * @return {?}
         */
        function ($event) {
            if (this.control.onContainerClick) {
                this.control.onContainerClick($event);
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        McFormField.prototype.onKeyDown = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // tslint:disable-next-line:deprecation
            if (this.canCleanerClearByEsc && event.keyCode === keycodes.ESCAPE && this.control.focused && this.hasCleaner) {
                if (this.control && this.control.ngControl) {
                    this.control.ngControl.reset();
                }
                event.preventDefault();
            }
        };
        /**
         * @param {?} isHovered
         * @return {?}
         */
        McFormField.prototype.onHoverChanged = /**
         * @param {?} isHovered
         * @return {?}
         */
        function (isHovered) {
            if (isHovered !== this.hovered) {
                this.hovered = isHovered;
                this._changeDetectorRef.markForCheck();
            }
        };
        /**
         * Gets an ElementRef for the element that a overlay attached to the form-field should be
         * positioned relative to.
         */
        /**
         * Gets an ElementRef for the element that a overlay attached to the form-field should be
         * positioned relative to.
         * @return {?}
         */
        McFormField.prototype.getConnectedOverlayOrigin = /**
         * Gets an ElementRef for the element that a overlay attached to the form-field should be
         * positioned relative to.
         * @return {?}
         */
        function () {
            return this.connectionContainerRef || this._elementRef;
        };
        /** Determines whether a class from the NgControl should be forwarded to the host element. */
        /**
         * Determines whether a class from the NgControl should be forwarded to the host element.
         * @param {?} prop
         * @return {?}
         */
        McFormField.prototype.shouldForward = /**
         * Determines whether a class from the NgControl should be forwarded to the host element.
         * @param {?} prop
         * @return {?}
         */
        function (prop) {
            /** @type {?} */
            var ngControl = this.control ? this.control.ngControl : null;
            return ngControl && ngControl[prop];
        };
        /** Throws an error if the form field's control is missing. */
        /**
         * Throws an error if the form field's control is missing.
         * @protected
         * @return {?}
         */
        McFormField.prototype.validateControlChild = /**
         * Throws an error if the form field's control is missing.
         * @protected
         * @return {?}
         */
        function () {
            if (!this.control) {
                throw getMcFormFieldMissingControlError();
            }
        };
        Object.defineProperty(McFormField.prototype, "hasHint", {
            get: /**
             * @return {?}
             */
            function () {
                return this.hint && this.hint.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McFormField.prototype, "hasSuffix", {
            get: /**
             * @return {?}
             */
            function () {
                return this.suffix && this.suffix.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McFormField.prototype, "hasPrefix", {
            get: /**
             * @return {?}
             */
            function () {
                return this.prefix && this.prefix.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McFormField.prototype, "hasCleaner", {
            get: /**
             * @return {?}
             */
            function () {
                return !!this.cleaner;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McFormField.prototype, "hasStepper", {
            get: /**
             * @return {?}
             */
            function () {
                return !!this.stepper;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McFormField.prototype, "canShowCleaner", {
            get: /**
             * @return {?}
             */
            function () {
                return this.hasCleaner &&
                    this.control &&
                    this.control.ngControl
                    ? this.control.ngControl.value && !this.control.disabled
                    : false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McFormField.prototype, "disabled", {
            get: /**
             * @return {?}
             */
            function () {
                return this.control && this.control.disabled;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McFormField.prototype, "canShowStepper", {
            get: /**
             * @return {?}
             */
            function () {
                return this.control && !this.disabled && (this.control.focused || this.hovered);
            },
            enumerable: true,
            configurable: true
        });
        McFormField.decorators = [
            { type: core.Component, args: [{
                        selector: 'mc-form-field',
                        exportAs: 'mcFormField',
                        template: "<div class=\"mc-form-field__container\" (click)=\"onContainerClick($event)\"><div class=\"mc-form-field__prefix\" *ngIf=\"hasPrefix\"><ng-content select=\"[mcPrefix]\"></ng-content></div><div class=\"mc-form-field__infix\"><ng-content></ng-content></div><div class=\"mc-form-field__suffix\" *ngIf=\"hasSuffix\"><ng-content select=\"[mcSuffix]\"></ng-content></div><div class=\"mc-form-field__cleaner\" *ngIf=\"canShowCleaner && !hasSuffix\" (click)=\"clearValue($event)\"><ng-content select=\"mc-cleaner\"></ng-content></div><ng-content *ngIf=\"canShowStepper\" select=\"mc-stepper\"></ng-content></div><div class=\"mc-form-field__hint\" *ngIf=\"hasHint\"><ng-content select=\"mc-hint\"></ng-content></div>",
                        // McInput is a directive and can't have styles, so we need to include its styles here.
                        // The McInput styles are fairly minimal so it shouldn't be a big deal for people who
                        // aren't using McInput.
                        styles: [".mc-form-field{position:relative;display:inline-block;width:100%;border-radius:3px}.mc-form-field:hover{z-index:1}.mc-form-field.mc-focused{z-index:2}.mc-form-field__hint{margin-top:4px}.mc-form-field__container{position:relative;border-width:1px;border-style:solid;border-color:initial;border-radius:3px}.mc-form-field_without-borders .mc-form-field__container{border-color:transparent}.mc-form-field__prefix,.mc-form-field__suffix{position:absolute;top:0;bottom:0;width:32px;display:flex;flex-direction:row;justify-content:center;align-items:center}.mc-form-field__prefix{left:0}.mc-form-field__suffix{right:0}.mc-form-field_has-cleaner .mc-input,.mc-form-field_has-stepper .mc-input,.mc-form-field_has-suffix .mc-input{padding-right:32px}.mc-form-field_has-prefix .mc-input{padding-left:32px}.mc-cleaner{display:flex;width:32px;height:100%;cursor:pointer}.mc-cleaner .mc-icon{display:flex;align-items:center;justify-content:center;width:100%;height:100%}.mc-form-field__cleaner .mc-cleaner{position:absolute;top:0;bottom:0;right:0}mc-stepper{position:absolute;display:flex;flex-direction:column;justify-content:center;align-items:center;top:0;bottom:0;right:0;width:32px}mc-stepper .mc-stepper-step-down,mc-stepper .mc-stepper-step-up{cursor:pointer;width:32px;text-align:center}mc-stepper .mc-stepper-step-up{transform:scaleY(-1)} .mc-input{background:0 0;padding:0;margin:0;border:none;outline:0;box-sizing:border-box;padding:5px 16px;width:100%;min-height:30px}.mc-input::-ms-clear{display:none;width:0;height:0}.mc-input::-ms-reveal{display:none;width:0;height:0}.mc-input::-webkit-search-cancel-button,.mc-input::-webkit-search-decoration,.mc-input::-webkit-search-results-button,.mc-input::-webkit-search-results-decoration{display:none}.mc-input{display:inline-block}input.mc-input[type=number]{-moz-appearance:textfield}input.mc-input[type=number]::-webkit-inner-spin-button,input.mc-input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}input.mc-input:invalid{box-shadow:unset} .mc-textarea{background:0 0;margin:0;border:none;outline:0;resize:none;overflow:auto;width:100%;box-sizing:border-box;padding:5px 16px}.mc-textarea{display:inline-block;-webkit-appearance:none;vertical-align:bottom}.mc-textarea:not(.mc-textarea-resizable){box-sizing:border-box;overflow-y:hidden}.mc-textarea.mc-textarea-resizable{resize:vertical;min-height:50px}.mc-textarea:invalid{box-shadow:unset}"],
                        host: {
                            class: 'mc-form-field',
                            '[class.mc-form-field_invalid]': 'control.errorState',
                            '[class.mc-disabled]': 'control.disabled',
                            '[class.mc-form-field_has-prefix]': 'hasPrefix',
                            '[class.mc-form-field_has-suffix]': 'hasSuffix',
                            '[class.mc-form-field_has-cleaner]': 'canShowCleaner',
                            '[class.mc-form-field_has-stepper]': 'canShowStepper',
                            '[class.mc-focused]': 'control.focused',
                            '[class.ng-untouched]': 'shouldForward("untouched")',
                            '[class.ng-touched]': 'shouldForward("touched")',
                            '[class.ng-pristine]': 'shouldForward("pristine")',
                            '[class.ng-dirty]': 'shouldForward("dirty")',
                            '[class.ng-valid]': 'shouldForward("valid")',
                            '[class.ng-invalid]': 'shouldForward("invalid")',
                            '[class.ng-pending]': 'shouldForward("pending")',
                            '(keydown)': 'onKeyDown($event)',
                            '(mouseenter)': 'onHoverChanged(true)',
                            '(mouseleave)': 'onHoverChanged(false)'
                        },
                        inputs: ['color'],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        /** @nocollapse */
        McFormField.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef }
        ]; };
        McFormField.propDecorators = {
            control: [{ type: core.ContentChild, args: [McFormFieldControl, { static: false },] }],
            stepper: [{ type: core.ContentChild, args: [McStepper, { static: false },] }],
            cleaner: [{ type: core.ContentChild, args: [McCleaner, { static: false },] }],
            hint: [{ type: core.ContentChildren, args: [McHint,] }],
            suffix: [{ type: core.ContentChildren, args: [McSuffix,] }],
            prefix: [{ type: core.ContentChildren, args: [McPrefix,] }],
            connectionContainerRef: [{ type: core.ViewChild, args: ['connectionContainer', { static: true },] }]
        };
        return McFormField;
    }(McFormFieldMixinBase));
    var McFormFieldWithoutBorders = /** @class */ (function () {
        function McFormFieldWithoutBorders() {
        }
        McFormFieldWithoutBorders.decorators = [
            { type: core.Directive, args: [{
                        selector: 'mc-form-field[mcFormFieldWithoutBorders]',
                        exportAs: 'mcFormFieldWithoutBorders',
                        host: { class: 'mc-form-field_without-borders' }
                    },] },
        ];
        return McFormFieldWithoutBorders;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McFormFieldModule = /** @class */ (function () {
        function McFormFieldModule() {
        }
        McFormFieldModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            McFormField,
                            McFormFieldWithoutBorders,
                            McHint,
                            McPrefix,
                            McSuffix,
                            McCleaner,
                            McStepper
                        ],
                        imports: [common.CommonModule, icon.McIconModule],
                        exports: [
                            McFormField,
                            McFormFieldWithoutBorders,
                            McHint,
                            McPrefix,
                            McSuffix,
                            McCleaner,
                            McStepper
                        ]
                    },] },
        ];
        return McFormFieldModule;
    }());

    exports.McCleaner = McCleaner;
    exports.McFormField = McFormField;
    exports.McFormFieldBase = McFormFieldBase;
    exports.McFormFieldControl = McFormFieldControl;
    exports.McFormFieldMixinBase = McFormFieldMixinBase;
    exports.McFormFieldModule = McFormFieldModule;
    exports.McFormFieldWithoutBorders = McFormFieldWithoutBorders;
    exports.McHint = McHint;
    exports.McPrefix = McPrefix;
    exports.McStepper = McStepper;
    exports.McSuffix = McSuffix;
    exports.getMcFormFieldMissingControlError = getMcFormFieldMissingControlError;
    exports.getMcFormFieldYouCanNotUseCleanerInNumberInputError = getMcFormFieldYouCanNotUseCleanerInNumberInputError;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-form-field.umd.js.map
