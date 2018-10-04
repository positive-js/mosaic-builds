/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __metadata } from 'tslib';
import { Component, Directive, Input, ChangeDetectionStrategy, ChangeDetectorRef, ContentChild, ContentChildren, ElementRef, QueryList, ViewEncapsulation, NgModule } from '@angular/core';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { mixinColor, ThemePalette } from '@ptsecurity/mosaic/core';
import { EMPTY, merge } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { McIconModule } from '@ptsecurity/mosaic/icon';

let McCleaner = class McCleaner {
};
McCleaner = __decorate([
    Component({
        selector: 'mc-cleaner',
        template: '<i mc-icon="mc-close-M_16" class="mc-cleaner__icon"></i>'
    })
], McCleaner);

/** An interface which allows a control to work inside of a `MсFormField`. */
class McFormFieldControl {
}

function getMcFormFieldMissingControlError() {
    return Error('mc-form-field must contain a McFormFieldControl.');
}

let nextUniqueId = 0;
let McHint = class McHint {
    constructor() {
        this.id = `mc-hint-${nextUniqueId++}`;
    }
};
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

let McPrefix = class McPrefix {
};
McPrefix = __decorate([
    Directive({
        selector: '[mcPrefix]'
    })
], McPrefix);

let McSuffix = class McSuffix {
};
McSuffix = __decorate([
    Directive({
        selector: '[mcSuffix]'
    })
], McSuffix);

let nextUniqueId$1 = 0;
class McFormFieldBase {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const _McFormFieldMixinBase = mixinColor(McFormFieldBase, ThemePalette.Primary);
let McFormField = class McFormField extends _McFormFieldMixinBase {
    constructor(_elementRef, _changeDetectorRef) {
        super(_elementRef);
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        // Unique id for the internal form field label.
        this._labelId = `mc-form-field-label-${nextUniqueId$1++}`;
    }
    ngAfterContentInit() {
        this._validateControlChild();
        if (this._control.controlType) {
            this._elementRef.nativeElement.classList
                .add(`mc-form-field-type-${this._control.controlType}`);
        }
        // Subscribe to changes in the child control state in order to update the form field UI.
        this._control.stateChanges.pipe(startWith())
            .subscribe(() => {
            this._changeDetectorRef.markForCheck();
        });
        // Run change detection if the value changes.
        const valueChanges = this._control.ngControl && this._control.ngControl.valueChanges || EMPTY;
        merge(valueChanges)
            .subscribe(() => this._changeDetectorRef.markForCheck());
    }
    ngAfterContentChecked() {
        this._validateControlChild();
    }
    ngAfterViewInit() {
        // Avoid animations on load.
        this._changeDetectorRef.detectChanges();
    }
    clearValue($event) {
        $event.stopPropagation();
        if (this._control && this._control.ngControl) {
            this._control.ngControl.reset();
        }
    }
    onContainerClick($event) {
        return this._control.onContainerClick && this._control.onContainerClick($event);
    }
    onKeyDown(e) {
        if (e.keyCode === ESCAPE &&
            this._control.focused &&
            this.hasCleaner) {
            if (this._control && this._control.ngControl) {
                this._control.ngControl.reset();
            }
            e.preventDefault();
        }
    }
    /** Determines whether a class from the NgControl should be forwarded to the host element. */
    _shouldForward(prop) {
        const ngControl = this._control ? this._control.ngControl : null;
        return ngControl && ngControl[prop];
    }
    /** Throws an error if the form field's control is missing. */
    _validateControlChild() {
        if (!this._control) {
            throw getMcFormFieldMissingControlError();
        }
    }
    get hasHint() {
        return this._hint && this._hint.length > 0;
    }
    get hasSuffix() {
        return this._suffix && this._suffix.length > 0;
    }
    get hasPrefix() {
        return this._prefix && this._prefix.length > 0;
    }
    get hasCleaner() {
        return this._cleaner && this._cleaner.length > 0;
    }
    get canShowCleaner() {
        return this.hasCleaner &&
            this._control && this._control.ngControl
            ? this._control.ngControl.value && !this._control.disabled
            : false;
    }
};
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
        template: "<div class=\"mc-form-field__container\" (click)=\"onContainerClick($event)\"><div class=\"mc-form-field__prefix\" *ngIf=\"hasPrefix\"><ng-content select=\"[mcPrefix]\"></ng-content></div><div class=\"mc-form-field__infix\"><ng-content></ng-content></div><div class=\"mc-form-field__suffix\" *ngIf=\"hasSuffix\"><ng-content select=\"[mcSuffix]\"></ng-content></div><div class=\"mc-form-field__cleaner\" *ngIf=\"canShowCleaner && !hasSuffix\" (click)=\"clearValue($event)\"><ng-content select=\"mc-cleaner\"></ng-content></div></div><div class=\"mc-form-field__hint\" *ngIf=\"hasHint\"><ng-content select=\"mc-hint\"></ng-content></div>",
        // McInput is a directive and can't have styles, so we need to include its styles here.
        // The McInput styles are fairly minimal so it shouldn't be a big deal for people who
        // aren't using McInput.
        styles: [".mc-form-field{position:relative;display:inline-block;width:100%}.mc-form-field__hint{margin-top:4px}.mc-form-field__container{position:relative;border-width:1px;border-style:solid;border-color:initial;border-radius:3px}.mc-form-field_without-borders .mc-form-field__container{border-color:transparent}.mc-form-field__prefix,.mc-form-field__suffix{position:absolute;top:0;bottom:0;width:32px;display:flex;flex-direction:row;justify-content:center;align-items:center}.mc-form-field__prefix{left:0}.mc-form-field__suffix{right:0}.mc-form-field_has-cleaner .mc-input,.mc-form-field_has-suffix .mc-input{padding-right:32px}.mc-form-field_has-prefix .mc-input{padding-left:32px}mc-cleaner{position:absolute;display:flex;flex-direction:row;justify-content:center;align-items:center;top:0;bottom:0;right:0;width:32px;cursor:pointer} .mc-input{background:0 0;padding:0;margin:0;border:none;outline:0;box-sizing:border-box;padding:5px 16px;width:100%}.mc-input::-ms-clear{display:none;width:0;height:0}.mc-input::-ms-reveal{display:none;width:0;height:0}.mc-input::-webkit-search-cancel-button,.mc-input::-webkit-search-decoration,.mc-input::-webkit-search-results-button,.mc-input::-webkit-search-results-decoration{display:none}.mc-input{display:inline-block}"],
        host: {
            class: 'mc-form-field',
            '[class.mc-form-field_invalid]': '_control.errorState',
            '[class.mc-form-field_disabled]': '_control.disabled',
            '[class.mc-form-field_has-prefix]': 'hasPrefix',
            '[class.mc-form-field_has-suffix]': 'hasSuffix',
            '[class.mc-form-field_has-cleaner]': 'hasCleaner',
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
        inputs: ['color'],
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [ElementRef, ChangeDetectorRef])
], McFormField);
let McFormFieldWithoutBorders = class McFormFieldWithoutBorders {
};
McFormFieldWithoutBorders = __decorate([
    Directive({
        selector: 'mc-form-field[mcFormFieldWithoutBorders]',
        exportAs: 'mcFormFieldWithoutBorders',
        host: { class: 'mc-form-field_without-borders' }
    })
], McFormFieldWithoutBorders);

let McFormFieldModule = class McFormFieldModule {
};
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

/**
 * Generated bundle index. Do not edit.
 */

export { McFormFieldModule, McFormFieldBase, _McFormFieldMixinBase, McFormField, McFormFieldWithoutBorders, McFormFieldControl, getMcFormFieldMissingControlError, McHint, McSuffix, McPrefix, McCleaner };
//# sourceMappingURL=form-field.js.map
