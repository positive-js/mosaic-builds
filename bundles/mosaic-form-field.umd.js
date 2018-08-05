/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common'), require('@ptsecurity/mosaic/icon')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/formField', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/common', '@ptsecurity/mosaic/icon'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.formField = {}),global.ng.core,global.rxjs,global.rxjs.operators,global.ng.common,global.ng.mosaic.icon));
}(this, (function (exports,core,rxjs,operators,common,icon) { 'use strict';

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

var McCleaner = /** @class */ (function () {
    function McCleaner() {
    }
    McCleaner.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-cleaner',
                    template: '<i mc-icon="mc-close-M_16" class="mc-cleaner__icon"></i>'
                },] },
    ];
    return McCleaner;
}());

/** An interface which allows a control to work inside of a `MсFormField`. */
var   /** An interface which allows a control to work inside of a `MсFormField`. */
McFormFieldControl = /** @class */ (function () {
    function McFormFieldControl() {
    }
    return McFormFieldControl;
}());

function getMcFormFieldMissingControlError() {
    return Error('mc-form-field must contain a McFormFieldControl.');
}

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
    /** @nocollapse */
    McHint.propDecorators = {
        "id": [{ type: core.Input },],
    };
    return McHint;
}());

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

var McFormFieldBase = /** @class */ (function () {
    function McFormFieldBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McFormFieldBase;
}());
var McFormField = /** @class */ (function (_super) {
    __extends(McFormField, _super);
    function McFormField(_elementRef, _changeDetectorRef) {
        var _this = _super.call(this, _elementRef) || this;
        _this._elementRef = _elementRef;
        _this._changeDetectorRef = _changeDetectorRef;
        return _this;
    }
    McFormField.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._validateControlChild();
        if (this._control.controlType) {
            this._elementRef.nativeElement.classList
                .add("mc-form-field-type-" + this._control.controlType);
        }
        // Subscribe to changes in the child control state in order to update the form field UI.
        this._control.stateChanges.pipe(operators.startWith()).subscribe(function () {
            _this._changeDetectorRef.markForCheck();
        });
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
        return this._control.onContainerClick && this._control.onContainerClick($event);
    };
    /** Determines whether a class from the NgControl should be forwarded to the host element. */
    /** Determines whether a class from the NgControl should be forwarded to the host element. */
    McFormField.prototype._shouldForward = /** Determines whether a class from the NgControl should be forwarded to the host element. */
    function (prop) {
        var ngControl = this._control ? this._control.ngControl : null;
        return ngControl && ngControl[prop];
    };
    /** Throws an error if the form field's control is missing. */
    /** Throws an error if the form field's control is missing. */
    McFormField.prototype._validateControlChild = /** Throws an error if the form field's control is missing. */
    function () {
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
    Object.defineProperty(McFormField.prototype, "canShowCleaner", {
        get: function () {
            return this._cleaner && this._cleaner.length > 0 &&
                this._control && this._control.ngControl
                ? this._control.ngControl.value && !this._control.disabled
                : false;
        },
        enumerable: true,
        configurable: true
    });
    McFormField.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-form-field',
                    exportAs: 'mcFormField',
                    template: "<div class=\"mc-form-field__wrapper\"><div class=\"mc-form-field__container\" (click)=\"onContainerClick($event)\"><div class=\"mc-form-field__prefix\" *ngIf=\"hasPrefix\"><ng-content select=\"[mcPrefix]\"></ng-content></div><div class=\"mc-form-field__infix\"><ng-content></ng-content></div><div class=\"mc-form-field__suffix\" *ngIf=\"hasSuffix\"><ng-content select=\"[mcSuffix]\"></ng-content></div><div class=\"mc-form-field__cleaner\" *ngIf=\"canShowCleaner && !hasSuffix\" (click)=\"clearValue($event)\"><ng-content select=\"mc-cleaner\"></ng-content></div></div><div class=\"mc-form-field__hint\" *ngIf=\"hasHint\"><ng-content select=\"mc-hint\"></ng-content></div></div>",
                    // McInput is a directive and can't have styles, so we need to include its styles here.
                    // The McInput styles are fairly minimal so it shouldn't be a big deal for people who
                    // aren't using McInput.
                    styles: [".mc-form-field{display:inline-block;position:relative}.mc-form-field__hint{margin-top:4px}.mc-form-field__container{position:relative;border-width:1px;border-style:solid;border-color:initial;border-radius:3px}.mc-form-field_without-borders .mc-form-field__container{border-color:transparent}.mc-form-field__prefix,.mc-form-field__suffix{position:absolute;top:0;bottom:0;width:32px;display:flex;flex-direction:row;justify-content:center;align-items:center}.mc-form-field__prefix{left:0}.mc-form-field__suffix{right:0}.mc-form-field_has-cleaner .mc-input,.mc-form-field_has-suffix .mc-input{padding-right:32px}.mc-form-field_has-prefix .mc-input{padding-left:32px}mc-cleaner{position:absolute;top:0;bottom:0;right:0;width:32px;cursor:pointer;display:flex;flex-direction:row;justify-content:center;align-items:center} .mc-input{background:0 0;padding:0;margin:0;border:none;outline:0;box-sizing:border-box;padding:5px 16px;width:100%}.mc-input::-ms-clear{display:none;width:0;height:0}.mc-input::-ms-reveal{display:none;width:0;height:0}.mc-input::-webkit-search-cancel-button,.mc-input::-webkit-search-decoration,.mc-input::-webkit-search-results-button,.mc-input::-webkit-search-results-decoration{display:none}.mc-input{display:inline-block}"],
                    host: {
                        class: 'mc-form-field',
                        '[class.mc-form-field_invalid]': '_control.errorState',
                        '[class.mc-form-field_disabled]': '_control.disabled',
                        '[class.mc-form-field_has-prefix]': 'hasPrefix',
                        '[class.mc-form-field_has-suffix]': 'hasSuffix',
                        '[class.mc-form-field_has-cleaner]': 'canShowCleaner',
                        '[class.mc-focused]': '_control.focused',
                        '[class.ng-untouched]': '_shouldForward("untouched")',
                        '[class.ng-touched]': '_shouldForward("touched")',
                        '[class.ng-pristine]': '_shouldForward("pristine")',
                        '[class.ng-dirty]': '_shouldForward("dirty")',
                        '[class.ng-valid]': '_shouldForward("valid")',
                        '[class.ng-invalid]': '_shouldForward("invalid")',
                        '[class.ng-pending]': '_shouldForward("pending")'
                    },
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    McFormField.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: core.ChangeDetectorRef, },
    ]; };
    McFormField.propDecorators = {
        "_control": [{ type: core.ContentChild, args: [McFormFieldControl,] },],
        "_hint": [{ type: core.ContentChildren, args: [McHint,] },],
        "_suffix": [{ type: core.ContentChildren, args: [McSuffix,] },],
        "_prefix": [{ type: core.ContentChildren, args: [McPrefix,] },],
        "_cleaner": [{ type: core.ContentChildren, args: [McCleaner,] },],
    };
    return McFormField;
}(McFormFieldBase));
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
                        McCleaner
                    ],
                    imports: [common.CommonModule, icon.McIconModule],
                    exports: [
                        McFormField,
                        McFormFieldWithoutBorders,
                        McHint,
                        McPrefix,
                        McSuffix,
                        McCleaner
                    ]
                },] },
    ];
    return McFormFieldModule;
}());

exports.McFormFieldModule = McFormFieldModule;
exports.McFormFieldBase = McFormFieldBase;
exports.McFormField = McFormField;
exports.McFormFieldWithoutBorders = McFormFieldWithoutBorders;
exports.McFormFieldControl = McFormFieldControl;
exports.getMcFormFieldMissingControlError = getMcFormFieldMissingControlError;
exports.McHint = McHint;
exports.McSuffix = McSuffix;
exports.McPrefix = McPrefix;
exports.McCleaner = McCleaner;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-form-field.umd.js.map