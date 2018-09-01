/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __extends, __metadata } from 'tslib';
import { Component, Directive, Input, ChangeDetectionStrategy, ChangeDetectorRef, ContentChild, ContentChildren, ElementRef, QueryList, ViewEncapsulation, NgModule } from '@angular/core';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { EMPTY, merge } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { McIconModule } from '@ptsecurity/mosaic/icon';

var McCleaner = /** @class */ (function () {
    function McCleaner() {
    }
    McCleaner = __decorate([
        Component({
            selector: 'mc-cleaner',
            template: '<i mc-icon="mc-close-M_16" class="mc-cleaner__icon"></i>'
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

var nextUniqueId = 0;
var McHint = /** @class */ (function () {
    function McHint() {
        this.id = "mc-hint-" + nextUniqueId++;
    }
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], McHint.prototype, "id", void 0);
    McHint = __decorate([
        Directive({
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
        Directive({
            selector: '[mcPrefix]'
        })
    ], McPrefix);
    return McPrefix;
}());

var McSuffix = /** @class */ (function () {
    function McSuffix() {
    }
    McSuffix = __decorate([
        Directive({
            selector: '[mcSuffix]'
        })
    ], McSuffix);
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
        this._control.stateChanges.pipe(startWith()).subscribe(function () {
            _this._changeDetectorRef.markForCheck();
        });
        // Run change detection if the value changes.
        var valueChanges = this._control.ngControl && this._control.ngControl.valueChanges || EMPTY;
        merge(valueChanges)
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
    McFormField.prototype.onKeyDown = function (e) {
        if (e.keyCode === ESCAPE &&
            this._control.focused &&
            this.hasCleaner) {
            if (this._control && this._control.ngControl) {
                this._control.ngControl.reset();
            }
            e.preventDefault();
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
    Object.defineProperty(McFormField.prototype, "canShowCleaner", {
        get: function () {
            return this.hasCleaner &&
                this._control && this._control.ngControl
                ? this._control.ngControl.value && !this._control.disabled
                : false;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        ContentChild(McFormFieldControl),
        __metadata("design:type", McFormFieldControl)
    ], McFormField.prototype, "_control", void 0);
    __decorate([
        ContentChildren(McHint),
        __metadata("design:type", QueryList)
    ], McFormField.prototype, "_hint", void 0);
    __decorate([
        ContentChildren(McSuffix),
        __metadata("design:type", QueryList)
    ], McFormField.prototype, "_suffix", void 0);
    __decorate([
        ContentChildren(McPrefix),
        __metadata("design:type", QueryList)
    ], McFormField.prototype, "_prefix", void 0);
    __decorate([
        ContentChildren(McCleaner),
        __metadata("design:type", QueryList)
    ], McFormField.prototype, "_cleaner", void 0);
    McFormField = __decorate([
        Component({
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
                '[class.ng-pending]': '_shouldForward("pending")',
                '(keydown)': 'onKeyDown($event)'
            },
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [ElementRef,
            ChangeDetectorRef])
    ], McFormField);
    return McFormField;
}(McFormFieldBase));
var McFormFieldWithoutBorders = /** @class */ (function () {
    function McFormFieldWithoutBorders() {
    }
    McFormFieldWithoutBorders = __decorate([
        Directive({
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
        NgModule({
            declarations: [
                McFormField,
                McFormFieldWithoutBorders,
                McHint,
                McPrefix,
                McSuffix,
                McCleaner
            ],
            imports: [CommonModule, McIconModule],
            exports: [
                McFormField,
                McFormFieldWithoutBorders,
                McHint,
                McPrefix,
                McSuffix,
                McCleaner
            ]
        })
    ], McFormFieldModule);
    return McFormFieldModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { McFormFieldModule, McFormFieldBase, McFormField, McFormFieldWithoutBorders, McFormFieldControl, getMcFormFieldMissingControlError, McHint, McSuffix, McPrefix, McCleaner };
//# sourceMappingURL=form-field.es5.js.map
