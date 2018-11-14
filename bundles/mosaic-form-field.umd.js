/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/mosaic/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common'), require('@ptsecurity/mosaic/icon')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/formField', ['exports', '@angular/core', '@ptsecurity/cdk/keycodes', '@ptsecurity/mosaic/core', 'rxjs', 'rxjs/operators', '@angular/common', '@ptsecurity/mosaic/icon'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.formField = {}),global.ng.core,global.ng.cdk.keycodes,global.ng.mosaic.core,global.rxjs,global.rxjs.operators,global.ng.common,global.ng.mosaic.icon));
}(this, (function (exports,core,keycodes,core$1,rxjs,operators,common,icon) { 'use strict';

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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

var McCleaner = /** @class */ (function () {
    function McCleaner() {
    }
    McCleaner = __decorate([
        core.Component({
            selector: 'mc-cleaner',
            template: '<i class="mc-icon_light" mc-icon="mc-close-M_16" color="second"></i>'
        })
    ], McCleaner);
    return McCleaner;
}());

/** An interface which allows a control to work inside of a `MсFormField`. */
var McFormFieldControl = /** @class */ (function () {
    function McFormFieldControl() {
    }
    return McFormFieldControl;
}());

function getMcFormFieldMissingControlError() {
    return Error('mc-form-field must contain a McFormFieldControl.');
}

/** An interface which allows a control to work inside of a `MсFormField`. */
var McFormFieldNumberControl = /** @class */ (function () {
    function McFormFieldNumberControl() {
    }
    return McFormFieldNumberControl;
}());

var nextUniqueId = 0;
var McHint = /** @class */ (function () {
    function McHint() {
        this.id = "mc-hint-" + nextUniqueId++;
    }
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McHint.prototype, "id", void 0);
    McHint = __decorate([
        core.Directive({
            selector: 'mc-hint',
            host: {
                class: 'mc-hint',
                '[attr.id]': 'id'
            }
        })
    ], McHint);
    return McHint;
}());

var McPrefix = /** @class */ (function () {
    function McPrefix() {
    }
    McPrefix = __decorate([
        core.Directive({
            selector: '[mcPrefix]'
        })
    ], McPrefix);
    return McPrefix;
}());

var McStepper = /** @class */ (function () {
    function McStepper() {
        this.stepUp = new core.EventEmitter();
        this.stepDown = new core.EventEmitter();
    }
    McStepper.prototype.onStepUp = function ($event) {
        this.stepUp.emit();
        $event.preventDefault();
    };
    McStepper.prototype.onStepDown = function ($event) {
        this.stepDown.emit();
        $event.preventDefault();
    };
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McStepper.prototype, "stepUp", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McStepper.prototype, "stepDown", void 0);
    McStepper = __decorate([
        core.Component({
            selector: 'mc-stepper',
            template: "\n        <i class=\"mc mc-icon mc-icon_light mc-second mc-stepper-step-up mc-angle-L_16\"\n           (mousedown)=\"onStepUp($event)\">\n        </i>\n        <i class=\"mc mc-icon mc-icon_light mc-second mc-stepper-step-down mc-angle-L_16\"\n           (mousedown)=\"onStepDown($event)\">\n        </i>\n    "
        })
    ], McStepper);
    return McStepper;
}());

var McSuffix = /** @class */ (function () {
    function McSuffix() {
    }
    McSuffix = __decorate([
        core.Directive({
            selector: '[mcSuffix]'
        })
    ], McSuffix);
    return McSuffix;
}());

var nextUniqueId$1 = 0;
var McFormFieldBase = /** @class */ (function () {
    function McFormFieldBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McFormFieldBase;
}());
var _McFormFieldMixinBase = core$1.mixinColor(McFormFieldBase);
var McFormField = /** @class */ (function (_super) {
    __extends(McFormField, _super);
    function McFormField(_elementRef, _changeDetectorRef) {
        var _this = _super.call(this, _elementRef) || this;
        _this._elementRef = _elementRef;
        _this._changeDetectorRef = _changeDetectorRef;
        // Unique id for the internal form field label.
        _this._labelId = "mc-form-field-label-" + nextUniqueId$1++;
        _this.hovered = false;
        return _this;
    }
    McFormField.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._validateControlChild();
        if (this._control.controlType) {
            this._elementRef.nativeElement.classList
                .add("mc-form-field-type-" + this._control.controlType);
            if (this._numberControl && this.hasStepper) {
                this._stepper.stepUp.subscribe(this.onStepUp.bind(this));
                this._stepper.stepDown.subscribe(this.onStepDown.bind(this));
            }
        }
        // Subscribe to changes in the child control state in order to update the form field UI.
        this._control.stateChanges.pipe(operators.startWith())
            .subscribe(function () {
            _this._changeDetectorRef.markForCheck();
        });
        if (this._numberControl) {
            this._numberControl.stateChanges.pipe(operators.startWith())
                .subscribe(function () {
                _this._changeDetectorRef.markForCheck();
            });
        }
        // Run change detection if the value changes.
        var valueChanges = this._control.ngControl && this._control.ngControl.valueChanges || rxjs.EMPTY;
        rxjs.merge(valueChanges)
            .subscribe(function () { return _this._changeDetectorRef.markForCheck(); });
    };
    McFormField.prototype.ngAfterContentChecked = function () {
        this._validateControlChild();
    };
    McFormField.prototype.ngAfterViewInit = function () {
        // Avoid animations on load.
        this._changeDetectorRef.detectChanges();
    };
    McFormField.prototype.clearValue = function ($event) {
        $event.stopPropagation();
        if (this._control && this._control.ngControl) {
            this._control.ngControl.reset();
        }
    };
    McFormField.prototype.onContainerClick = function ($event) {
        if (this._control.onContainerClick) {
            this._control.onContainerClick($event);
        }
    };
    McFormField.prototype.onKeyDown = function (e) {
        // tslint:disable-next-line:deprecation
        if (e.keyCode === keycodes.ESCAPE &&
            this._control.focused &&
            this.hasCleaner) {
            if (this._control && this._control.ngControl) {
                this._control.ngControl.reset();
            }
            e.preventDefault();
        }
    };
    McFormField.prototype.onHoverChanged = function (isHovered) {
        if (isHovered !== this.hovered) {
            this.hovered = isHovered;
            this._changeDetectorRef.markForCheck();
        }
    };
    McFormField.prototype.onStepUp = function () {
        if (this._numberControl) {
            this._numberControl.stepUp(this._numberControl.step);
        }
    };
    McFormField.prototype.onStepDown = function () {
        if (this._numberControl) {
            this._numberControl.stepDown(this._numberControl.step);
        }
    };
    /** Determines whether a class from the NgControl should be forwarded to the host element. */
    McFormField.prototype._shouldForward = function (prop) {
        var ngControl = this._control ? this._control.ngControl : null;
        return ngControl && ngControl[prop];
    };
    /** Throws an error if the form field's control is missing. */
    McFormField.prototype._validateControlChild = function () {
        if (!this._control) {
            throw getMcFormFieldMissingControlError();
        }
    };
    Object.defineProperty(McFormField.prototype, "hasHint", {
        get: function () {
            return this._hint && this._hint.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "hasSuffix", {
        get: function () {
            return this._suffix && this._suffix.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "hasPrefix", {
        get: function () {
            return this._prefix && this._prefix.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "hasCleaner", {
        get: function () {
            return this._cleaner && this._cleaner.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "hasStepper", {
        get: function () {
            return !!this._stepper;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "canShowCleaner", {
        get: function () {
            return this.hasCleaner &&
                this._control &&
                this._control.ngControl
                ? this._control.ngControl.value && !this._control.disabled
                : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "disabled", {
        get: function () {
            return this._control && this._control.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "canShowStepper", {
        get: function () {
            return this._numberControl &&
                !this.disabled &&
                (this._numberControl.focused ||
                    this.hovered);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core.ContentChild(McFormFieldControl),
        __metadata("design:type", McFormFieldControl)
    ], McFormField.prototype, "_control", void 0);
    __decorate([
        core.ContentChild(McFormFieldNumberControl),
        __metadata("design:type", McFormFieldNumberControl)
    ], McFormField.prototype, "_numberControl", void 0);
    __decorate([
        core.ContentChild(McStepper),
        __metadata("design:type", McStepper)
    ], McFormField.prototype, "_stepper", void 0);
    __decorate([
        core.ContentChildren(McHint),
        __metadata("design:type", core.QueryList)
    ], McFormField.prototype, "_hint", void 0);
    __decorate([
        core.ContentChildren(McSuffix),
        __metadata("design:type", core.QueryList)
    ], McFormField.prototype, "_suffix", void 0);
    __decorate([
        core.ContentChildren(McPrefix),
        __metadata("design:type", core.QueryList)
    ], McFormField.prototype, "_prefix", void 0);
    __decorate([
        core.ContentChildren(McCleaner),
        __metadata("design:type", core.QueryList)
    ], McFormField.prototype, "_cleaner", void 0);
    McFormField = __decorate([
        core.Component({
            selector: 'mc-form-field',
            exportAs: 'mcFormField',
            template: "<div class=\"mc-form-field__container\" (click)=\"onContainerClick($event)\"><div class=\"mc-form-field__prefix\" *ngIf=\"hasPrefix\"><ng-content select=\"[mcPrefix]\"></ng-content></div><div class=\"mc-form-field__infix\"><ng-content></ng-content></div><div class=\"mc-form-field__suffix\" *ngIf=\"hasSuffix\"><ng-content select=\"[mcSuffix]\"></ng-content></div><div class=\"mc-form-field__cleaner\" *ngIf=\"canShowCleaner && !hasSuffix\" (click)=\"clearValue($event)\"><ng-content select=\"mc-cleaner\"></ng-content></div><ng-content *ngIf=\"canShowStepper\" select=\"mc-stepper\"></ng-content></div><div class=\"mc-form-field__hint\" *ngIf=\"hasHint\"><ng-content select=\"mc-hint\"></ng-content></div>",
            // McInput is a directive and can't have styles, so we need to include its styles here.
            // The McInput styles are fairly minimal so it shouldn't be a big deal for people who
            // aren't using McInput.
            styles: [".mc-form-field{position:relative;display:inline-block;width:100%}.mc-form-field__hint{margin-top:4px}.mc-form-field__container{position:relative;border-width:1px;border-style:solid;border-color:initial;border-radius:3px}.mc-form-field_without-borders .mc-form-field__container{border-color:transparent}.mc-form-field__prefix,.mc-form-field__suffix{position:absolute;top:0;bottom:0;width:32px;display:flex;flex-direction:row;justify-content:center;align-items:center}.mc-form-field__prefix{left:0}.mc-form-field__suffix{right:0}.mc-form-field_has-cleaner .mc-input,.mc-form-field_has-stepper .mc-input,.mc-form-field_has-suffix .mc-input{padding-right:32px}.mc-form-field_has-prefix .mc-input{padding-left:32px}mc-cleaner{position:absolute;display:flex;flex-direction:row;justify-content:center;align-items:center;top:0;bottom:0;right:0;width:32px;cursor:pointer}mc-stepper{position:absolute;display:flex;flex-direction:column;justify-content:center;align-items:center;top:0;bottom:0;right:0;width:32px}mc-stepper .mc-stepper-step-down,mc-stepper .mc-stepper-step-up{cursor:pointer;width:32px;text-align:center}mc-stepper .mc-stepper-step-up{transform:scaleY(-1)} .mc-input{background:0 0;padding:0;margin:0;border:none;outline:0;box-sizing:border-box;padding:5px 16px;width:100%}.mc-input::-ms-clear{display:none;width:0;height:0}.mc-input::-ms-reveal{display:none;width:0;height:0}.mc-input::-webkit-search-cancel-button,.mc-input::-webkit-search-decoration,.mc-input::-webkit-search-results-button,.mc-input::-webkit-search-results-decoration{display:none}.mc-input{display:inline-block}input.mc-input[type=number]{-moz-appearance:textfield}input.mc-input[type=number]::-webkit-inner-spin-button,input.mc-input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}input.mc-input:invalid{box-shadow:unset}"],
            host: {
                class: 'mc-form-field',
                '[class.mc-form-field_invalid]': '_control.errorState',
                '[class.mc-disabled]': '_control.disabled',
                '[class.mc-form-field_has-prefix]': 'hasPrefix',
                '[class.mc-form-field_has-suffix]': 'hasSuffix',
                '[class.mc-form-field_has-cleaner]': 'canShowCleaner',
                '[class.mc-form-field_has-stepper]': 'canShowStepper',
                '[class.mc-focused]': '_control.focused',
                '[class.ng-untouched]': '_shouldForward("untouched")',
                '[class.ng-touched]': '_shouldForward("touched")',
                '[class.ng-pristine]': '_shouldForward("pristine")',
                '[class.ng-dirty]': '_shouldForward("dirty")',
                '[class.ng-valid]': '_shouldForward("valid")',
                '[class.ng-invalid]': '_shouldForward("invalid")',
                '[class.ng-pending]': '_shouldForward("pending")',
                '(keydown)': 'onKeyDown($event)',
                '(mouseenter)': 'onHoverChanged(true)',
                '(mouseleave)': 'onHoverChanged(false)'
            },
            inputs: ['color'],
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core.ElementRef, core.ChangeDetectorRef])
    ], McFormField);
    return McFormField;
}(_McFormFieldMixinBase));
var McFormFieldWithoutBorders = /** @class */ (function () {
    function McFormFieldWithoutBorders() {
    }
    McFormFieldWithoutBorders = __decorate([
        core.Directive({
            selector: 'mc-form-field[mcFormFieldWithoutBorders]',
            exportAs: 'mcFormFieldWithoutBorders',
            host: { class: 'mc-form-field_without-borders' }
        })
    ], McFormFieldWithoutBorders);
    return McFormFieldWithoutBorders;
}());

var McFormFieldModule = /** @class */ (function () {
    function McFormFieldModule() {
    }
    McFormFieldModule = __decorate([
        core.NgModule({
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
        })
    ], McFormFieldModule);
    return McFormFieldModule;
}());

exports.McFormFieldModule = McFormFieldModule;
exports.McFormFieldBase = McFormFieldBase;
exports._McFormFieldMixinBase = _McFormFieldMixinBase;
exports.McFormField = McFormField;
exports.McFormFieldWithoutBorders = McFormFieldWithoutBorders;
exports.McFormFieldControl = McFormFieldControl;
exports.McFormFieldNumberControl = McFormFieldNumberControl;
exports.getMcFormFieldMissingControlError = getMcFormFieldMissingControlError;
exports.McHint = McHint;
exports.McSuffix = McSuffix;
exports.McPrefix = McPrefix;
exports.McCleaner = McCleaner;
exports.McStepper = McStepper;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-form-field.umd.js.map
