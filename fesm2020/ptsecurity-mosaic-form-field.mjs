import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Component, Directive, Input, forwardRef, ChangeDetectionStrategy, Inject, EventEmitter, Output, ViewEncapsulation, ContentChild, ContentChildren, ViewChild, NgModule } from '@angular/core';
import * as i1 from '@ptsecurity/mosaic/icon';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { ThemePalette, mixinColor } from '@ptsecurity/mosaic/core';
import * as i1$1 from '@angular/cdk/a11y';
import { F8, ESCAPE } from '@ptsecurity/cdk/keycodes';
import { Subject, EMPTY, merge } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

class McCleaner {
    constructor() {
        this.themePalette = ThemePalette;
    }
}
/** @nocollapse */ /** @nocollapse */ McCleaner.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McCleaner, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McCleaner.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McCleaner, selector: "mc-cleaner", host: { classAttribute: "mc-cleaner" }, exportAs: ["mcCleaner"], ngImport: i0, template: `<i class="mc-icon_light" mc-icon="mc-close-circle_16" [color]="themePalette.Second"></i>`, isInline: true, components: [{ type: i1.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i1.McIconCSSStyler, selector: "[mc-icon]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McCleaner, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-cleaner',
                    exportAs: 'mcCleaner',
                    template: `<i class="mc-icon_light" mc-icon="mc-close-circle_16" [color]="themePalette.Second"></i>`,
                    host: {
                        class: 'mc-cleaner'
                    }
                }]
        }] });

/** An interface which allows a control to work inside of a `MсFormField`. */
// tslint:disable-next-line:naming-convention
class McFormFieldControl {
}

function getMcFormFieldMissingControlError() {
    return Error('mc-form-field must contain a McFormFieldControl.');
}
function getMcFormFieldYouCanNotUseCleanerInNumberInputError() {
    return Error(`You can't use mc-cleaner with input that have type="number"`);
}

let nextHintUniqueId = 0;
class McHint {
    constructor() {
        this.id = `mc-hint-${nextHintUniqueId++}`;
    }
}
/** @nocollapse */ /** @nocollapse */ McHint.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McHint, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McHint.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: McHint, selector: "mc-hint", inputs: { id: "id" }, host: { properties: { "attr.id": "id" }, classAttribute: "mc-hint" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McHint, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-hint',
                    host: {
                        class: 'mc-hint',
                        '[attr.id]': 'id'
                    }
                }]
        }], propDecorators: { id: [{
                type: Input
            }] } });

let nextPasswordHintUniqueId = 0;
var PasswordRules;
(function (PasswordRules) {
    PasswordRules[PasswordRules["Length"] = 0] = "Length";
    PasswordRules[PasswordRules["UpperLatin"] = 1] = "UpperLatin";
    PasswordRules[PasswordRules["LowerLatin"] = 2] = "LowerLatin";
    PasswordRules[PasswordRules["Digit"] = 3] = "Digit";
    PasswordRules[PasswordRules["SpecialSymbols"] = 4] = "SpecialSymbols";
})(PasswordRules || (PasswordRules = {}));
const regExpPasswordValidator = {
    [PasswordRules.LowerLatin]: RegExp(/^(?=.*?[a-z])/),
    [PasswordRules.UpperLatin]: RegExp(/^(?=.*?[A-Z])/),
    [PasswordRules.Digit]: RegExp(/^(?=.*?[0-9])/),
    [PasswordRules.SpecialSymbols]: RegExp(/^(?=.*?[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])/)
};
class McPasswordHint {
    constructor(changeDetectorRef, formField) {
        this.changeDetectorRef = changeDetectorRef;
        this.formField = formField;
        this.id = `mc-hint-${nextPasswordHintUniqueId++}`;
        this.hasError = false;
        this.checked = false;
        this.checkValue = () => {
            if (this.control.focused && this.isValueChanged()) {
                this.hasError = false;
                this.checked = this.checkRule(this.control.value);
            }
            else if (!this.control.focused && !this.isValueChanged()) {
                this.hasError = !this.checkRule(this.control.value);
            }
            this.lastControlValue = this.control.value;
            this.changeDetectorRef.markForCheck();
        };
    }
    get control() {
        return this.formField.control;
    }
    ngAfterContentInit() {
        if (this.rule === null) {
            throw Error('You should set [rule] name');
        }
        if (this.rule === PasswordRules.Length && (this.min || this.max) === null) {
            throw Error('For [rule] "Length" need set [min] and [max]');
        }
        if (this.rule === PasswordRules.Length) {
            this.checkRule = this.checkLengthRule;
        }
        else if ([PasswordRules.UpperLatin, PasswordRules.LowerLatin, PasswordRules.Digit, PasswordRules.SpecialSymbols]
            .includes(this.rule)) {
            this.regex = this.regex || regExpPasswordValidator[this.rule];
            this.checkRule = this.checkRegexRule;
        }
        else {
            throw Error(`Unknown [rule]=${this.rule}`);
        }
        this.formField.control.stateChanges
            .subscribe(this.checkValue);
    }
    checkLengthRule(value) {
        return value.length >= this.min && value.length <= this.max;
    }
    checkRegexRule(value) {
        return !!this.regex?.test(value);
    }
    isValueChanged() {
        return this.lastControlValue !== this.formField.control.value;
    }
}
/** @nocollapse */ /** @nocollapse */ McPasswordHint.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McPasswordHint, deps: [{ token: i0.ChangeDetectorRef }, { token: forwardRef(() => McFormField) }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McPasswordHint.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McPasswordHint, selector: "mc-password-hint", inputs: { id: "id", rule: "rule", min: "min", max: "max", regex: "regex" }, host: { properties: { "class.mc-password-hint_valid": "checked", "class.mc-password-hint_invalid": "hasError", "attr.id": "id" }, classAttribute: "mc-password-hint" }, ngImport: i0, template: `
        <i *ngIf="!checked" class="mc-password-hint__icon" mc-icon="mc-close-M_16"></i>
        <i *ngIf="checked" class="mc-password-hint__icon" mc-icon="mc-check_16"></i>

        <span class="mc-password-hint__text">
            <ng-content></ng-content>
        </span>
    `, isInline: true, components: [{ type: i1.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.McIconCSSStyler, selector: "[mc-icon]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McPasswordHint, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-password-hint',
                    template: `
        <i *ngIf="!checked" class="mc-password-hint__icon" mc-icon="mc-close-M_16"></i>
        <i *ngIf="checked" class="mc-password-hint__icon" mc-icon="mc-check_16"></i>

        <span class="mc-password-hint__text">
            <ng-content></ng-content>
        </span>
    `,
                    host: {
                        class: 'mc-password-hint',
                        '[class.mc-password-hint_valid]': 'checked',
                        '[class.mc-password-hint_invalid]': 'hasError',
                        '[attr.id]': 'id'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: McFormField, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => McFormField)]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], rule: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], regex: [{
                type: Input
            }] } });

class McPrefix {
}
/** @nocollapse */ /** @nocollapse */ McPrefix.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McPrefix, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McPrefix.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: McPrefix, selector: "[mcPrefix]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McPrefix, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcPrefix]'
                }]
        }] });

class McStepper {
    constructor() {
        this.stepUp = new EventEmitter();
        this.stepDown = new EventEmitter();
    }
    connectTo(numberInput) {
        if (!numberInput) {
            return;
        }
        this.stepUp.subscribe(() => {
            numberInput.stepUp(numberInput.step);
        });
        this.stepDown.subscribe(() => {
            numberInput.stepDown(numberInput.step);
        });
    }
    onStepUp($event) {
        this.stepUp.emit();
        $event.preventDefault();
    }
    onStepDown($event) {
        this.stepDown.emit();
        $event.preventDefault();
    }
}
/** @nocollapse */ /** @nocollapse */ McStepper.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McStepper, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McStepper.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McStepper, selector: "mc-stepper", outputs: { stepUp: "stepUp", stepDown: "stepDown" }, ngImport: i0, template: `
        <i class="mc mc-icon mc-icon_light mc-second mc-stepper-step-up mc-angle-down-L_16"
           (mousedown)="onStepUp($event)">
        </i>
        <i class="mc mc-icon mc-icon_light mc-second mc-stepper-step-down mc-angle-down-L_16"
           (mousedown)="onStepDown($event)">
        </i>
    `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McStepper, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-stepper',
                    template: `
        <i class="mc mc-icon mc-icon_light mc-second mc-stepper-step-up mc-angle-down-L_16"
           (mousedown)="onStepUp($event)">
        </i>
        <i class="mc mc-icon mc-icon_light mc-second mc-stepper-step-down mc-angle-down-L_16"
           (mousedown)="onStepDown($event)">
        </i>
    `
                }]
        }], propDecorators: { stepUp: [{
                type: Output
            }], stepDown: [{
                type: Output
            }] } });

class McSuffix {
}
/** @nocollapse */ /** @nocollapse */ McSuffix.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSuffix, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McSuffix.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: McSuffix, selector: "[mcSuffix]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSuffix, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcSuffix]'
                }]
        }] });

let nextUniqueId = 0;
class McFormFieldBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
const McFormFieldMixinBase = mixinColor(McFormFieldBase);
class McFormField extends McFormFieldMixinBase {
    constructor(
    // tslint:disable-next-line:naming-convention
    _elementRef, _changeDetectorRef, focusMonitor) {
        super(_elementRef);
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this.focusMonitor = focusMonitor;
        // Unique id for the internal form field label.
        this.labelId = `mc-form-field-label-${nextUniqueId++}`;
        this.hovered = false;
        this.canCleanerClearByEsc = true;
        this.$unsubscribe = new Subject();
        this.runFocusMonitor();
    }
    get hasHint() {
        return this.hint?.length > 0;
    }
    get hasPasswordStrengthError() {
        return this.passwordHints?.some((hint) => hint.hasError);
    }
    get hasSuffix() {
        return this.suffix?.length > 0;
    }
    get hasPrefix() {
        return this.prefix?.length > 0;
    }
    get hasCleaner() {
        return !!this.cleaner;
    }
    get hasStepper() {
        return !!this.stepper;
    }
    get canShowCleaner() {
        return this.hasCleaner &&
            this.control?.ngControl
            ? this.control.ngControl.value && !this.control.disabled
            : false;
    }
    get disabled() {
        return this.control?.disabled;
    }
    get canShowStepper() {
        return this.hasStepper &&
            !this.disabled &&
            (this.control?.focused || this.hovered);
    }
    ngAfterContentInit() {
        if (this.control.numberInput && this.hasCleaner) {
            this.cleaner = null;
            throw getMcFormFieldYouCanNotUseCleanerInNumberInputError();
        }
        this.validateControlChild();
        if (this.control.controlType) {
            this._elementRef.nativeElement.classList.add(`mc-form-field-type-${this.control.controlType}`);
        }
        // Subscribe to changes in the child control state in order to update the form field UI.
        this.control.stateChanges
            .pipe(startWith())
            .subscribe((state) => {
            if (!state?.focused && this.hasPasswordStrengthError) {
                this.control.ngControl?.control?.setErrors({ passwordStrength: true });
            }
            this._changeDetectorRef.markForCheck();
        });
        if (this.hasStepper) {
            this.stepper.connectTo(this.control.numberInput);
        }
        // Run change detection if the value changes.
        const valueChanges = this.control.ngControl?.valueChanges || EMPTY;
        merge(valueChanges)
            .pipe(takeUntil(this.$unsubscribe))
            .subscribe(() => this._changeDetectorRef.markForCheck());
    }
    ngAfterContentChecked() {
        this.validateControlChild();
    }
    ngAfterViewInit() {
        // Avoid animations on load.
        this._changeDetectorRef.detectChanges();
    }
    clearValue($event) {
        $event.stopPropagation();
        this.control?.ngControl?.reset();
        this.control?.focus();
    }
    onContainerClick($event) {
        if (this.control.onContainerClick) {
            this.control.onContainerClick($event);
        }
    }
    onKeyDown(event) {
        // tslint:disable-next-line:deprecation
        if (this.control.controlType === 'input-password' && event.altKey && event.keyCode === F8) {
            this.control.toggleType();
        }
        // tslint:disable-next-line:deprecation
        if (this.canCleanerClearByEsc && event.keyCode === ESCAPE && this.control.focused && this.hasCleaner) {
            this.control?.ngControl?.reset();
            event.preventDefault();
        }
    }
    onHoverChanged(isHovered) {
        if (isHovered !== this.hovered) {
            this.hovered = isHovered;
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
     * Gets an ElementRef for the element that a overlay attached to the form-field should be
     * positioned relative to.
     */
    getConnectedOverlayOrigin() {
        return this.connectionContainerRef || this._elementRef;
    }
    /** Determines whether a class from the NgControl should be forwarded to the host element. */
    shouldForward(prop) {
        const ngControl = this.control ? this.control.ngControl : null;
        return ngControl && ngControl[prop];
    }
    ngOnDestroy() {
        this.$unsubscribe.next();
        this.$unsubscribe.complete();
        this.stopFocusMonitor();
    }
    /** Throws an error if the form field's control is missing. */
    validateControlChild() {
        if (!this.control) {
            throw getMcFormFieldMissingControlError();
        }
    }
    runFocusMonitor() {
        this.focusMonitor.monitor(this._elementRef.nativeElement, true);
    }
    stopFocusMonitor() {
        this.focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
}
/** @nocollapse */ /** @nocollapse */ McFormField.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McFormField, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1$1.FocusMonitor }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McFormField.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McFormField, selector: "mc-form-field", inputs: { color: "color" }, host: { listeners: { "keydown": "onKeyDown($event)", "mouseenter": "onHoverChanged(true)", "mouseleave": "onHoverChanged(false)" }, properties: { "class.mc-form-field_invalid": "control.errorState", "class.mc-form-field_has-prefix": "hasPrefix", "class.mc-form-field_has-suffix": "hasSuffix", "class.mc-form-field_has-cleaner": "canShowCleaner", "class.mc-form-field_has-stepper": "canShowStepper", "class.mc-disabled": "control.disabled", "class.ng-untouched": "shouldForward(\"untouched\")", "class.ng-touched": "shouldForward(\"touched\")", "class.ng-pristine": "shouldForward(\"pristine\")", "class.ng-dirty": "shouldForward(\"dirty\")", "class.ng-valid": "shouldForward(\"valid\")", "class.ng-invalid": "shouldForward(\"invalid\")", "class.ng-pending": "shouldForward(\"pending\")" }, classAttribute: "mc-form-field" }, queries: [{ propertyName: "control", first: true, predicate: McFormFieldControl, descendants: true }, { propertyName: "stepper", first: true, predicate: McStepper, descendants: true }, { propertyName: "cleaner", first: true, predicate: McCleaner, descendants: true }, { propertyName: "hint", predicate: McHint }, { propertyName: "passwordHints", predicate: McPasswordHint }, { propertyName: "suffix", predicate: McSuffix }, { propertyName: "prefix", predicate: McPrefix }], viewQueries: [{ propertyName: "connectionContainerRef", first: true, predicate: ["connectionContainer"], descendants: true, static: true }], exportAs: ["mcFormField"], usesInheritance: true, ngImport: i0, template: "<div class=\"mc-form-field__container\" (click)=\"onContainerClick($event)\">\n\n    <div class=\"mc-form-field__prefix\" *ngIf=\"hasPrefix\">\n        <ng-content select=\"[mcPrefix]\"></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__infix\">\n        <ng-content></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__suffix\" *ngIf=\"hasSuffix\">\n        <ng-content select=\"[mcSuffix]\"></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__cleaner\"\n         *ngIf=\"canShowCleaner && !hasSuffix\"\n         (click)=\"clearValue($event)\">\n        <ng-content select=\"mc-cleaner\"></ng-content>\n    </div>\n\n    <ng-content select=\"mc-password-toggle\"></ng-content>\n\n    <ng-content *ngIf=\"canShowStepper\" select=\"mc-stepper\"></ng-content>\n</div>\n\n<div class=\"mc-form-field__hint\">\n    <ng-content select=\"mc-hint, mc-password-hint\"></ng-content>\n</div>\n", styles: [".mc-form-field{position:relative;display:inline-block;width:100%;border-radius:var(--mc-form-field-size-border-radius, 3px)}.mc-form-field:hover{z-index:1}.mc-form-field.mc-focused{z-index:2}.mc-form-field-type-input-password .mc-input{padding-right:var(--mc-form-field-size-button-width, 32px)}.mc-hint{display:block}.mc-password-hint{display:block;padding-left:calc(16px + var(--mc-form-field-password-hint-size-icon-margin, 4px))}.mc-password-hint .mc-icon{position:absolute;left:0}.mc-form-field__hint>.mc-password-hint{margin-top:var(--mc-form-field-password-hint-size-margin-top, 8px)}.mc-form-field__hint>.mc-hint{margin-top:var(--mc-form-field-hint-size-margin-top, 4px)}.mc-form-field__container{position:relative;border-width:var(--mc-form-field-size-border-width, 1px);border-style:solid;border-color:transparent;border-radius:var(--mc-form-field-size-border-radius, 3px)}.mc-form-field_without-borders .mc-form-field__container{border-color:transparent}.mc-form-field__prefix,.mc-form-field__suffix{position:absolute;top:0;bottom:0;width:32px;display:flex;flex-direction:row;justify-content:center;align-items:center}.mc-form-field__prefix{left:0}.mc-form-field__suffix{right:0}.mc-form-field_has-suffix .mc-input,.mc-form-field_has-cleaner .mc-input,.mc-form-field_has-stepper .mc-input{padding-right:var(--mc-form-field-size-button-width, 32px)}.mc-form-field_has-prefix .mc-input{padding-left:var(--mc-form-field-size-button-width, 32px)}.mc-cleaner{display:flex;width:var(--mc-form-field-size-button-width, 32px);height:100%;cursor:pointer}.mc-cleaner .mc-icon{display:flex;align-items:center;justify-content:center;width:100%;height:100%}.mc-form-field__cleaner .mc-cleaner{position:absolute;top:0;bottom:0;right:0}mc-stepper{position:absolute;display:flex;flex-direction:column;justify-content:center;align-items:center;top:0;bottom:0;right:0;width:var(--mc-form-field-size-button-width, 32px)}mc-stepper .mc-stepper-step-up,mc-stepper .mc-stepper-step-down{cursor:pointer;width:var(--mc-form-field-size-button-width, 32px);text-align:center}mc-stepper .mc-stepper-step-up{transform:scaleY(-1)}\n", ".mc-input{background:transparent;padding:0;margin:0;border:none;outline:none;box-sizing:border-box;padding:var(--mc-input-size-padding, 5px 16px);width:var(--mc-input-size-width, 100%);min-height:var(--mc-input-size-min-height, 30px)}.mc-input::-ms-clear{display:none;width:0;height:0}.mc-input::-ms-reveal{display:none;width:0;height:0}.mc-input::-webkit-search-decoration,.mc-input::-webkit-search-cancel-button,.mc-input::-webkit-search-results-button,.mc-input::-webkit-search-results-decoration{display:none}.mc-input{display:inline-block}input.mc-input[type=number]{-moz-appearance:textfield}input.mc-input[type=number]::-webkit-inner-spin-button,input.mc-input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}input.mc-input:invalid{box-shadow:unset}.mc-password-toggle{display:flex;position:absolute;top:-1px;right:-1px;border:1px solid transparent;width:32px;height:32px;align-items:center;justify-content:center;cursor:pointer;border-top-right-radius:var(--mc-form-field-size-border-radius, 3px);border-bottom-right-radius:var(--mc-form-field-size-border-radius, 3px)}.mc-password-toggle::-moz-focus-inner{border:0}.mc-password-toggle:focus{outline:none}\n", ".mc-timepicker{padding-right:calc(var(--mc-timepicker-size-padding-right, 16px) - var(--mc-form-field-size-border-width, 1px))}.mc-form-field-type-timepicker{width:auto}\n", ".mc-form-field-type-datepicker{width:auto}.mc-datepicker{width:var(--mc-datepicker-input-size-width, 130px)}\n", ".mc-textarea{background:transparent;margin:0;border:none;outline:none;resize:none;overflow:auto;width:100%;box-sizing:border-box;padding:var(--mc-textarea-size-padding, 5px 16px)}.mc-textarea{display:inline-block;-webkit-appearance:none;vertical-align:bottom}.mc-textarea:not(.mc-textarea-resizable){box-sizing:border-box;overflow-y:hidden}.mc-textarea.mc-textarea-resizable{resize:vertical;min-height:var(--mc-textarea-size-min-height, 50px)}.mc-textarea:invalid{box-shadow:unset}\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McFormField, decorators: [{
            type: Component,
            args: [{ selector: 'mc-form-field', exportAs: 'mcFormField', host: {
                        class: 'mc-form-field',
                        '[class.mc-form-field_invalid]': 'control.errorState',
                        '[class.mc-form-field_has-prefix]': 'hasPrefix',
                        '[class.mc-form-field_has-suffix]': 'hasSuffix',
                        '[class.mc-form-field_has-cleaner]': 'canShowCleaner',
                        '[class.mc-form-field_has-stepper]': 'canShowStepper',
                        '[class.mc-disabled]': 'control.disabled',
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
                    }, inputs: ['color'], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mc-form-field__container\" (click)=\"onContainerClick($event)\">\n\n    <div class=\"mc-form-field__prefix\" *ngIf=\"hasPrefix\">\n        <ng-content select=\"[mcPrefix]\"></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__infix\">\n        <ng-content></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__suffix\" *ngIf=\"hasSuffix\">\n        <ng-content select=\"[mcSuffix]\"></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__cleaner\"\n         *ngIf=\"canShowCleaner && !hasSuffix\"\n         (click)=\"clearValue($event)\">\n        <ng-content select=\"mc-cleaner\"></ng-content>\n    </div>\n\n    <ng-content select=\"mc-password-toggle\"></ng-content>\n\n    <ng-content *ngIf=\"canShowStepper\" select=\"mc-stepper\"></ng-content>\n</div>\n\n<div class=\"mc-form-field__hint\">\n    <ng-content select=\"mc-hint, mc-password-hint\"></ng-content>\n</div>\n", styles: [".mc-form-field{position:relative;display:inline-block;width:100%;border-radius:var(--mc-form-field-size-border-radius, 3px)}.mc-form-field:hover{z-index:1}.mc-form-field.mc-focused{z-index:2}.mc-form-field-type-input-password .mc-input{padding-right:var(--mc-form-field-size-button-width, 32px)}.mc-hint{display:block}.mc-password-hint{display:block;padding-left:calc(16px + var(--mc-form-field-password-hint-size-icon-margin, 4px))}.mc-password-hint .mc-icon{position:absolute;left:0}.mc-form-field__hint>.mc-password-hint{margin-top:var(--mc-form-field-password-hint-size-margin-top, 8px)}.mc-form-field__hint>.mc-hint{margin-top:var(--mc-form-field-hint-size-margin-top, 4px)}.mc-form-field__container{position:relative;border-width:var(--mc-form-field-size-border-width, 1px);border-style:solid;border-color:transparent;border-radius:var(--mc-form-field-size-border-radius, 3px)}.mc-form-field_without-borders .mc-form-field__container{border-color:transparent}.mc-form-field__prefix,.mc-form-field__suffix{position:absolute;top:0;bottom:0;width:32px;display:flex;flex-direction:row;justify-content:center;align-items:center}.mc-form-field__prefix{left:0}.mc-form-field__suffix{right:0}.mc-form-field_has-suffix .mc-input,.mc-form-field_has-cleaner .mc-input,.mc-form-field_has-stepper .mc-input{padding-right:var(--mc-form-field-size-button-width, 32px)}.mc-form-field_has-prefix .mc-input{padding-left:var(--mc-form-field-size-button-width, 32px)}.mc-cleaner{display:flex;width:var(--mc-form-field-size-button-width, 32px);height:100%;cursor:pointer}.mc-cleaner .mc-icon{display:flex;align-items:center;justify-content:center;width:100%;height:100%}.mc-form-field__cleaner .mc-cleaner{position:absolute;top:0;bottom:0;right:0}mc-stepper{position:absolute;display:flex;flex-direction:column;justify-content:center;align-items:center;top:0;bottom:0;right:0;width:var(--mc-form-field-size-button-width, 32px)}mc-stepper .mc-stepper-step-up,mc-stepper .mc-stepper-step-down{cursor:pointer;width:var(--mc-form-field-size-button-width, 32px);text-align:center}mc-stepper .mc-stepper-step-up{transform:scaleY(-1)}\n", ".mc-input{background:transparent;padding:0;margin:0;border:none;outline:none;box-sizing:border-box;padding:var(--mc-input-size-padding, 5px 16px);width:var(--mc-input-size-width, 100%);min-height:var(--mc-input-size-min-height, 30px)}.mc-input::-ms-clear{display:none;width:0;height:0}.mc-input::-ms-reveal{display:none;width:0;height:0}.mc-input::-webkit-search-decoration,.mc-input::-webkit-search-cancel-button,.mc-input::-webkit-search-results-button,.mc-input::-webkit-search-results-decoration{display:none}.mc-input{display:inline-block}input.mc-input[type=number]{-moz-appearance:textfield}input.mc-input[type=number]::-webkit-inner-spin-button,input.mc-input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}input.mc-input:invalid{box-shadow:unset}.mc-password-toggle{display:flex;position:absolute;top:-1px;right:-1px;border:1px solid transparent;width:32px;height:32px;align-items:center;justify-content:center;cursor:pointer;border-top-right-radius:var(--mc-form-field-size-border-radius, 3px);border-bottom-right-radius:var(--mc-form-field-size-border-radius, 3px)}.mc-password-toggle::-moz-focus-inner{border:0}.mc-password-toggle:focus{outline:none}\n", ".mc-timepicker{padding-right:calc(var(--mc-timepicker-size-padding-right, 16px) - var(--mc-form-field-size-border-width, 1px))}.mc-form-field-type-timepicker{width:auto}\n", ".mc-form-field-type-datepicker{width:auto}.mc-datepicker{width:var(--mc-datepicker-input-size-width, 130px)}\n", ".mc-textarea{background:transparent;margin:0;border:none;outline:none;resize:none;overflow:auto;width:100%;box-sizing:border-box;padding:var(--mc-textarea-size-padding, 5px 16px)}.mc-textarea{display:inline-block;-webkit-appearance:none;vertical-align:bottom}.mc-textarea:not(.mc-textarea-resizable){box-sizing:border-box;overflow-y:hidden}.mc-textarea.mc-textarea-resizable{resize:vertical;min-height:var(--mc-textarea-size-min-height, 50px)}.mc-textarea:invalid{box-shadow:unset}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1$1.FocusMonitor }]; }, propDecorators: { control: [{
                type: ContentChild,
                args: [McFormFieldControl, { static: false }]
            }], stepper: [{
                type: ContentChild,
                args: [McStepper, { static: false }]
            }], cleaner: [{
                type: ContentChild,
                args: [McCleaner, { static: false }]
            }], hint: [{
                type: ContentChildren,
                args: [McHint]
            }], passwordHints: [{
                type: ContentChildren,
                args: [McPasswordHint]
            }], suffix: [{
                type: ContentChildren,
                args: [McSuffix]
            }], prefix: [{
                type: ContentChildren,
                args: [McPrefix]
            }], connectionContainerRef: [{
                type: ViewChild,
                args: ['connectionContainer', { static: true }]
            }] } });
class McFormFieldWithoutBorders {
}
/** @nocollapse */ /** @nocollapse */ McFormFieldWithoutBorders.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McFormFieldWithoutBorders, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McFormFieldWithoutBorders.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: McFormFieldWithoutBorders, selector: "mc-form-field[mcFormFieldWithoutBorders]", host: { classAttribute: "mc-form-field_without-borders" }, exportAs: ["mcFormFieldWithoutBorders"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McFormFieldWithoutBorders, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-form-field[mcFormFieldWithoutBorders]',
                    exportAs: 'mcFormFieldWithoutBorders',
                    host: { class: 'mc-form-field_without-borders' }
                }]
        }] });

class McFormFieldModule {
}
/** @nocollapse */ /** @nocollapse */ McFormFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McFormFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McFormFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McFormFieldModule, declarations: [McFormField,
        McFormFieldWithoutBorders,
        McHint,
        McPasswordHint,
        McPrefix,
        McSuffix,
        McCleaner,
        McStepper], imports: [CommonModule, McIconModule], exports: [McFormField,
        McFormFieldWithoutBorders,
        McHint,
        McPasswordHint,
        McPrefix,
        McSuffix,
        McCleaner,
        McStepper] });
/** @nocollapse */ /** @nocollapse */ McFormFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McFormFieldModule, imports: [[CommonModule, McIconModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McFormFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        McFormField,
                        McFormFieldWithoutBorders,
                        McHint,
                        McPasswordHint,
                        McPrefix,
                        McSuffix,
                        McCleaner,
                        McStepper
                    ],
                    imports: [CommonModule, McIconModule],
                    exports: [
                        McFormField,
                        McFormFieldWithoutBorders,
                        McHint,
                        McPasswordHint,
                        McPrefix,
                        McSuffix,
                        McCleaner,
                        McStepper
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { McCleaner, McFormField, McFormFieldBase, McFormFieldControl, McFormFieldMixinBase, McFormFieldModule, McFormFieldWithoutBorders, McHint, McPasswordHint, McPrefix, McStepper, McSuffix, PasswordRules, getMcFormFieldMissingControlError, getMcFormFieldYouCanNotUseCleanerInNumberInputError, regExpPasswordValidator };
//# sourceMappingURL=ptsecurity-mosaic-form-field.mjs.map
