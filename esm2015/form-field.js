/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { Component, Directive, Input, ChangeDetectionStrategy, ChangeDetectorRef, ContentChild, ContentChildren, ElementRef, ViewEncapsulation, NgModule } from '@angular/core';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { EMPTY, merge } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { McIconModule } from '@ptsecurity/mosaic/icon';

class McCleaner {
}
McCleaner.decorators = [
    { type: Component, args: [{
                selector: 'mc-cleaner',
                template: '<i mc-icon="mc-close-M_16" class="mc-cleaner__icon"></i>'
            },] },
];

/** An interface which allows a control to work inside of a `MсFormField`. */
class McFormFieldControl {
}

function getMcFormFieldMissingControlError() {
    return Error('mc-form-field must contain a McFormFieldControl.');
}

let nextUniqueId = 0;
class McHint {
    constructor() {
        this.id = `mc-hint-${nextUniqueId++}`;
    }
}
McHint.decorators = [
    { type: Directive, args: [{
                selector: 'mc-hint',
                host: {
                    class: 'mc-hint',
                    '[attr.id]': 'id'
                }
            },] },
];
/** @nocollapse */
McHint.propDecorators = {
    "id": [{ type: Input },],
};

class McPrefix {
}
McPrefix.decorators = [
    { type: Directive, args: [{
                selector: '[mcPrefix]'
            },] },
];

class McSuffix {
}
McSuffix.decorators = [
    { type: Directive, args: [{
                selector: '[mcSuffix]'
            },] },
];

class McFormFieldBase {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
class McFormField extends McFormFieldBase {
    constructor(_elementRef, _changeDetectorRef) {
        super(_elementRef);
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
    }
    ngAfterContentInit() {
        this._validateControlChild();
        if (this._control.controlType) {
            this._elementRef.nativeElement.classList
                .add(`mc-form-field-type-${this._control.controlType}`);
        }
        // Subscribe to changes in the child control state in order to update the form field UI.
        this._control.stateChanges.pipe(startWith()).subscribe(() => {
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
}
McFormField.decorators = [
    { type: Component, args: [{
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
            },] },
];
/** @nocollapse */
McFormField.ctorParameters = () => [
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
];
McFormField.propDecorators = {
    "_control": [{ type: ContentChild, args: [McFormFieldControl,] },],
    "_hint": [{ type: ContentChildren, args: [McHint,] },],
    "_suffix": [{ type: ContentChildren, args: [McSuffix,] },],
    "_prefix": [{ type: ContentChildren, args: [McPrefix,] },],
    "_cleaner": [{ type: ContentChildren, args: [McCleaner,] },],
};
class McFormFieldWithoutBorders {
}
McFormFieldWithoutBorders.decorators = [
    { type: Directive, args: [{
                selector: 'mc-form-field[mcFormFieldWithoutBorders]',
                exportAs: 'mcFormFieldWithoutBorders',
                host: { class: 'mc-form-field_without-borders' }
            },] },
];

class McFormFieldModule {
}
McFormFieldModule.decorators = [
    { type: NgModule, args: [{
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
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { McFormFieldModule, McFormFieldBase, McFormField, McFormFieldWithoutBorders, McFormFieldControl, getMcFormFieldMissingControlError, McHint, McSuffix, McPrefix, McCleaner };
//# sourceMappingURL=form-field.js.map
