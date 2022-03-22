import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { ESCAPE, F8 } from '@ptsecurity/cdk/keycodes';
import { mixinColor } from '@ptsecurity/mosaic/core';
import { EMPTY, merge, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { McCleaner } from './cleaner';
import { McFormFieldControl } from './form-field-control';
import { getMcFormFieldMissingControlError, getMcFormFieldYouCanNotUseCleanerInNumberInputError } from './form-field-errors';
import { McHint } from './hint';
import { McPasswordHint } from './password-hint';
import { McPrefix } from './prefix';
import { McStepper } from './stepper';
import { McSuffix } from './suffix';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
import * as i2 from "@angular/common";
let nextUniqueId = 0;
export class McFormFieldBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
export const McFormFieldMixinBase = mixinColor(McFormFieldBase);
export class McFormField extends McFormFieldMixinBase {
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
/** @nocollapse */ /** @nocollapse */ McFormField.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McFormField, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.FocusMonitor }], target: i0.ɵɵFactoryTarget.Component });
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
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.FocusMonitor }]; }, propDecorators: { control: [{
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
export class McFormFieldWithoutBorders {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9mb3JtLWZpZWxkL2Zvcm0tZmllbGQudHMiLCIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvZm9ybS1maWVsZC9mb3JtLWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFJSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBRVYsU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQTBCLFVBQVUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzdFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDMUQsT0FBTyxFQUNILGlDQUFpQyxFQUNqQyxtREFBbUQsRUFDdEQsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENB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QUUsMENBQTBDO29CQUNwRCxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsK0JBQStCLEVBQUU7aUJBQ25EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBPbkRlc3Ryb3ksXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEVTQ0FQRSwgRjggfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgQ2FuQ29sb3IsIENhbkNvbG9yQ3RvciwgbWl4aW5Db2xvciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IEVNUFRZLCBtZXJnZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1jQ2xlYW5lciB9IGZyb20gJy4vY2xlYW5lcic7XG5pbXBvcnQgeyBNY0Zvcm1GaWVsZENvbnRyb2wgfSBmcm9tICcuL2Zvcm0tZmllbGQtY29udHJvbCc7XG5pbXBvcnQge1xuICAgIGdldE1jRm9ybUZpZWxkTWlzc2luZ0NvbnRyb2xFcnJvcixcbiAgICBnZXRNY0Zvcm1GaWVsZFlvdUNhbk5vdFVzZUNsZWFuZXJJbk51bWJlcklucHV0RXJyb3Jcbn0gZnJvbSAnLi9mb3JtLWZpZWxkLWVycm9ycyc7XG5pbXBvcnQgeyBNY0hpbnQgfSBmcm9tICcuL2hpbnQnO1xuaW1wb3J0IHsgTWNQYXNzd29yZEhpbnQgfSBmcm9tICcuL3Bhc3N3b3JkLWhpbnQnO1xuaW1wb3J0IHsgTWNQcmVmaXggfSBmcm9tICcuL3ByZWZpeCc7XG5pbXBvcnQgeyBNY1N0ZXBwZXIgfSBmcm9tICcuL3N0ZXBwZXInO1xuaW1wb3J0IHsgTWNTdWZmaXggfSBmcm9tICcuL3N1ZmZpeCc7XG5cblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBNY0Zvcm1GaWVsZEJhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNGb3JtRmllbGRNaXhpbkJhc2U6IENhbkNvbG9yQ3RvciAmIHR5cGVvZiBNY0Zvcm1GaWVsZEJhc2UgPSBtaXhpbkNvbG9yKE1jRm9ybUZpZWxkQmFzZSk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtZm9ybS1maWVsZCcsXG4gICAgZXhwb3J0QXM6ICdtY0Zvcm1GaWVsZCcsXG4gICAgdGVtcGxhdGVVcmw6ICdmb3JtLWZpZWxkLmh0bWwnLFxuICAgIC8vIE1jSW5wdXQgaXMgYSBkaXJlY3RpdmUgYW5kIGNhbid0IGhhdmUgc3R5bGVzLCBzbyB3ZSBuZWVkIHRvIGluY2x1ZGUgaXRzIHN0eWxlcyBoZXJlLlxuICAgIC8vIFRoZSBNY0lucHV0IHN0eWxlcyBhcmUgZmFpcmx5IG1pbmltYWwgc28gaXQgc2hvdWxkbid0IGJlIGEgYmlnIGRlYWwgZm9yIHBlb3BsZSB3aG9cbiAgICAvLyBhcmVuJ3QgdXNpbmcgTWNJbnB1dC5cbiAgICBzdHlsZVVybHM6IFtcbiAgICAgICAgJ2Zvcm0tZmllbGQuc2NzcycsXG4gICAgICAgICcuLi9pbnB1dC9pbnB1dC5zY3NzJyxcbiAgICAgICAgJy4uL3RpbWVwaWNrZXIvdGltZXBpY2tlci5zY3NzJyxcbiAgICAgICAgJy4uL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1pbnB1dC5zY3NzJyxcbiAgICAgICAgJy4uL3RleHRhcmVhL3RleHRhcmVhLnNjc3MnXG4gICAgXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtZm9ybS1maWVsZCcsXG4gICAgICAgICdbY2xhc3MubWMtZm9ybS1maWVsZF9pbnZhbGlkXSc6ICdjb250cm9sLmVycm9yU3RhdGUnLFxuICAgICAgICAnW2NsYXNzLm1jLWZvcm0tZmllbGRfaGFzLXByZWZpeF0nOiAnaGFzUHJlZml4JyxcbiAgICAgICAgJ1tjbGFzcy5tYy1mb3JtLWZpZWxkX2hhcy1zdWZmaXhdJzogJ2hhc1N1ZmZpeCcsXG4gICAgICAgICdbY2xhc3MubWMtZm9ybS1maWVsZF9oYXMtY2xlYW5lcl0nOiAnY2FuU2hvd0NsZWFuZXInLFxuICAgICAgICAnW2NsYXNzLm1jLWZvcm0tZmllbGRfaGFzLXN0ZXBwZXJdJzogJ2NhblNob3dTdGVwcGVyJyxcblxuICAgICAgICAnW2NsYXNzLm1jLWRpc2FibGVkXSc6ICdjb250cm9sLmRpc2FibGVkJyxcblxuICAgICAgICAnW2NsYXNzLm5nLXVudG91Y2hlZF0nOiAnc2hvdWxkRm9yd2FyZChcInVudG91Y2hlZFwiKScsXG4gICAgICAgICdbY2xhc3MubmctdG91Y2hlZF0nOiAnc2hvdWxkRm9yd2FyZChcInRvdWNoZWRcIiknLFxuICAgICAgICAnW2NsYXNzLm5nLXByaXN0aW5lXSc6ICdzaG91bGRGb3J3YXJkKFwicHJpc3RpbmVcIiknLFxuICAgICAgICAnW2NsYXNzLm5nLWRpcnR5XSc6ICdzaG91bGRGb3J3YXJkKFwiZGlydHlcIiknLFxuICAgICAgICAnW2NsYXNzLm5nLXZhbGlkXSc6ICdzaG91bGRGb3J3YXJkKFwidmFsaWRcIiknLFxuICAgICAgICAnW2NsYXNzLm5nLWludmFsaWRdJzogJ3Nob3VsZEZvcndhcmQoXCJpbnZhbGlkXCIpJyxcbiAgICAgICAgJ1tjbGFzcy5uZy1wZW5kaW5nXSc6ICdzaG91bGRGb3J3YXJkKFwicGVuZGluZ1wiKScsXG5cbiAgICAgICAgJyhrZXlkb3duKSc6ICdvbktleURvd24oJGV2ZW50KScsXG4gICAgICAgICcobW91c2VlbnRlciknOiAnb25Ib3ZlckNoYW5nZWQodHJ1ZSknLFxuICAgICAgICAnKG1vdXNlbGVhdmUpJzogJ29uSG92ZXJDaGFuZ2VkKGZhbHNlKSdcbiAgICB9LFxuICAgIGlucHV0czogWydjb2xvciddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWNGb3JtRmllbGQgZXh0ZW5kcyBNY0Zvcm1GaWVsZE1peGluQmFzZSBpbXBsZW1lbnRzXG4gICAgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQWZ0ZXJWaWV3SW5pdCwgQ2FuQ29sb3IsIE9uRGVzdHJveSB7XG5cbiAgICBAQ29udGVudENoaWxkKE1jRm9ybUZpZWxkQ29udHJvbCwgeyBzdGF0aWM6IGZhbHNlIH0pIGNvbnRyb2w6IE1jRm9ybUZpZWxkQ29udHJvbDxhbnk+O1xuICAgIEBDb250ZW50Q2hpbGQoTWNTdGVwcGVyLCB7IHN0YXRpYzogZmFsc2UgfSkgc3RlcHBlcjogTWNTdGVwcGVyO1xuICAgIEBDb250ZW50Q2hpbGQoTWNDbGVhbmVyLCB7IHN0YXRpYzogZmFsc2UgfSkgY2xlYW5lcjogTWNDbGVhbmVyIHwgbnVsbDtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNIaW50KSBoaW50OiBRdWVyeUxpc3Q8TWNIaW50PjtcbiAgICBAQ29udGVudENoaWxkcmVuKE1jUGFzc3dvcmRIaW50KSBwYXNzd29yZEhpbnRzOiBRdWVyeUxpc3Q8TWNQYXNzd29yZEhpbnQ+O1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNTdWZmaXgpIHN1ZmZpeDogUXVlcnlMaXN0PE1jU3VmZml4PjtcbiAgICBAQ29udGVudENoaWxkcmVuKE1jUHJlZml4KSBwcmVmaXg6IFF1ZXJ5TGlzdDxNY1ByZWZpeD47XG5cbiAgICBAVmlld0NoaWxkKCdjb25uZWN0aW9uQ29udGFpbmVyJywgeyBzdGF0aWM6IHRydWUgfSkgY29ubmVjdGlvbkNvbnRhaW5lclJlZjogRWxlbWVudFJlZjtcblxuICAgIC8vIFVuaXF1ZSBpZCBmb3IgdGhlIGludGVybmFsIGZvcm0gZmllbGQgbGFiZWwuXG4gICAgbGFiZWxJZCA9IGBtYy1mb3JtLWZpZWxkLWxhYmVsLSR7bmV4dFVuaXF1ZUlkKyt9YDtcblxuICAgIGhvdmVyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNhbkNsZWFuZXJDbGVhckJ5RXNjOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIHByaXZhdGUgJHVuc3Vic2NyaWJlID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGdldCBoYXNIaW50KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oaW50Py5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGdldCBoYXNQYXNzd29yZFN0cmVuZ3RoRXJyb3IoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhc3N3b3JkSGludHM/LnNvbWUoKGhpbnQpID0+IGhpbnQuaGFzRXJyb3IpO1xuICAgIH1cblxuICAgIGdldCBoYXNTdWZmaXgoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1ZmZpeD8ubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBnZXQgaGFzUHJlZml4KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmVmaXg/Lmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgZ2V0IGhhc0NsZWFuZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuY2xlYW5lcjtcbiAgICB9XG5cbiAgICBnZXQgaGFzU3RlcHBlcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5zdGVwcGVyO1xuICAgIH1cblxuICAgIGdldCBjYW5TaG93Q2xlYW5lcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQ2xlYW5lciAmJlxuICAgICAgICB0aGlzLmNvbnRyb2w/Lm5nQ29udHJvbFxuICAgICAgICAgICAgPyB0aGlzLmNvbnRyb2wubmdDb250cm9sLnZhbHVlICYmICF0aGlzLmNvbnRyb2wuZGlzYWJsZWRcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sPy5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBnZXQgY2FuU2hvd1N0ZXBwZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc1N0ZXBwZXIgJiZcbiAgICAgICAgICAgICF0aGlzLmRpc2FibGVkICYmXG4gICAgICAgICAgICAodGhpcy5jb250cm9sPy5mb2N1c2VkIHx8IHRoaXMuaG92ZXJlZCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgICAgICBwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBmb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvclxuICAgICkge1xuICAgICAgICBzdXBlcihfZWxlbWVudFJlZik7XG5cbiAgICAgICAgdGhpcy5ydW5Gb2N1c01vbml0b3IoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIGlmICgodGhpcy5jb250cm9sIGFzIGFueSkubnVtYmVySW5wdXQgJiYgdGhpcy5oYXNDbGVhbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFuZXIgPSBudWxsO1xuICAgICAgICAgICAgdGhyb3cgZ2V0TWNGb3JtRmllbGRZb3VDYW5Ob3RVc2VDbGVhbmVySW5OdW1iZXJJbnB1dEVycm9yKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbGlkYXRlQ29udHJvbENoaWxkKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udHJvbC5jb250cm9sVHlwZSkge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoYG1jLWZvcm0tZmllbGQtdHlwZS0ke3RoaXMuY29udHJvbC5jb250cm9sVHlwZX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN1YnNjcmliZSB0byBjaGFuZ2VzIGluIHRoZSBjaGlsZCBjb250cm9sIHN0YXRlIGluIG9yZGVyIHRvIHVwZGF0ZSB0aGUgZm9ybSBmaWVsZCBVSS5cbiAgICAgICAgdGhpcy5jb250cm9sLnN0YXRlQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoc3RhcnRXaXRoKCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChzdGF0ZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFzdGF0ZT8uZm9jdXNlZCAmJiB0aGlzLmhhc1Bhc3N3b3JkU3RyZW5ndGhFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2wubmdDb250cm9sPy5jb250cm9sPy5zZXRFcnJvcnMoeyBwYXNzd29yZFN0cmVuZ3RoOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzU3RlcHBlcikge1xuICAgICAgICAgICAgdGhpcy5zdGVwcGVyLmNvbm5lY3RUbygodGhpcy5jb250cm9sIGFzIGFueSkubnVtYmVySW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUnVuIGNoYW5nZSBkZXRlY3Rpb24gaWYgdGhlIHZhbHVlIGNoYW5nZXMuXG4gICAgICAgIGNvbnN0IHZhbHVlQ2hhbmdlcyA9IHRoaXMuY29udHJvbC5uZ0NvbnRyb2w/LnZhbHVlQ2hhbmdlcyB8fCBFTVBUWTtcblxuICAgICAgICBtZXJnZSh2YWx1ZUNoYW5nZXMpXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy4kdW5zdWJzY3JpYmUpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKSk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgICAgICB0aGlzLnZhbGlkYXRlQ29udHJvbENoaWxkKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICAvLyBBdm9pZCBhbmltYXRpb25zIG9uIGxvYWQuXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBjbGVhclZhbHVlKCRldmVudCkge1xuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5jb250cm9sPy5uZ0NvbnRyb2w/LnJlc2V0KCk7XG4gICAgICAgIHRoaXMuY29udHJvbD8uZm9jdXMoKTtcbiAgICB9XG5cbiAgICBvbkNvbnRhaW5lckNsaWNrKCRldmVudCkge1xuICAgICAgICBpZiAodGhpcy5jb250cm9sLm9uQ29udGFpbmVyQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5vbkNvbnRhaW5lckNsaWNrKCRldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2wuY29udHJvbFR5cGUgPT09ICdpbnB1dC1wYXNzd29yZCcgJiYgZXZlbnQuYWx0S2V5ICYmIGV2ZW50LmtleUNvZGUgPT09IEY4KSB7XG4gICAgICAgICAgICAodGhpcy5jb250cm9sIGFzIHVua25vd24gYXMgeyB0b2dnbGVUeXBlKCk6IHZvaWQgfSkudG9nZ2xlVHlwZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgICAgICBpZiAodGhpcy5jYW5DbGVhbmVyQ2xlYXJCeUVzYyAmJiBldmVudC5rZXlDb2RlID09PSBFU0NBUEUgJiYgdGhpcy5jb250cm9sLmZvY3VzZWQgJiYgdGhpcy5oYXNDbGVhbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2w/Lm5nQ29udHJvbD8ucmVzZXQoKTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSG92ZXJDaGFuZ2VkKGlzSG92ZXJlZDogYm9vbGVhbikge1xuICAgICAgICBpZiAoaXNIb3ZlcmVkICE9PSB0aGlzLmhvdmVyZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaG92ZXJlZCA9IGlzSG92ZXJlZDtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhbiBFbGVtZW50UmVmIGZvciB0aGUgZWxlbWVudCB0aGF0IGEgb3ZlcmxheSBhdHRhY2hlZCB0byB0aGUgZm9ybS1maWVsZCBzaG91bGQgYmVcbiAgICAgKiBwb3NpdGlvbmVkIHJlbGF0aXZlIHRvLlxuICAgICAqL1xuICAgIGdldENvbm5lY3RlZE92ZXJsYXlPcmlnaW4oKTogRWxlbWVudFJlZiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb25Db250YWluZXJSZWYgfHwgdGhpcy5fZWxlbWVudFJlZjtcbiAgICB9XG5cbiAgICAvKiogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgY2xhc3MgZnJvbSB0aGUgTmdDb250cm9sIHNob3VsZCBiZSBmb3J3YXJkZWQgdG8gdGhlIGhvc3QgZWxlbWVudC4gKi9cbiAgICBzaG91bGRGb3J3YXJkKHByb3A6IGtleW9mIE5nQ29udHJvbCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBuZ0NvbnRyb2wgPSB0aGlzLmNvbnRyb2wgPyB0aGlzLmNvbnRyb2wubmdDb250cm9sIDogbnVsbDtcblxuICAgICAgICByZXR1cm4gbmdDb250cm9sICYmIG5nQ29udHJvbFtwcm9wXTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy4kdW5zdWJzY3JpYmUubmV4dCgpO1xuICAgICAgICB0aGlzLiR1bnN1YnNjcmliZS5jb21wbGV0ZSgpO1xuXG4gICAgICAgIHRoaXMuc3RvcEZvY3VzTW9uaXRvcigpO1xuICAgIH1cblxuICAgIC8qKiBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIGZvcm0gZmllbGQncyBjb250cm9sIGlzIG1pc3NpbmcuICovXG4gICAgcHJvdGVjdGVkIHZhbGlkYXRlQ29udHJvbENoaWxkKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udHJvbCkge1xuICAgICAgICAgICAgdGhyb3cgZ2V0TWNGb3JtRmllbGRNaXNzaW5nQ29udHJvbEVycm9yKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJ1bkZvY3VzTW9uaXRvcigpIHtcbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3IubW9uaXRvcih0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRydWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RvcEZvY3VzTW9uaXRvcigpIHtcbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtZm9ybS1maWVsZFttY0Zvcm1GaWVsZFdpdGhvdXRCb3JkZXJzXScsXG4gICAgZXhwb3J0QXM6ICdtY0Zvcm1GaWVsZFdpdGhvdXRCb3JkZXJzJyxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtZm9ybS1maWVsZF93aXRob3V0LWJvcmRlcnMnIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNGb3JtRmllbGRXaXRob3V0Qm9yZGVycyB7fVxuIiwiPGRpdiBjbGFzcz1cIm1jLWZvcm0tZmllbGRfX2NvbnRhaW5lclwiIChjbGljayk9XCJvbkNvbnRhaW5lckNsaWNrKCRldmVudClcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJtYy1mb3JtLWZpZWxkX19wcmVmaXhcIiAqbmdJZj1cImhhc1ByZWZpeFwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbbWNQcmVmaXhdXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cIm1jLWZvcm0tZmllbGRfX2luZml4XCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJtYy1mb3JtLWZpZWxkX19zdWZmaXhcIiAqbmdJZj1cImhhc1N1ZmZpeFwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbbWNTdWZmaXhdXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cIm1jLWZvcm0tZmllbGRfX2NsZWFuZXJcIlxuICAgICAgICAgKm5nSWY9XCJjYW5TaG93Q2xlYW5lciAmJiAhaGFzU3VmZml4XCJcbiAgICAgICAgIChjbGljayk9XCJjbGVhclZhbHVlKCRldmVudClcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibWMtY2xlYW5lclwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cblxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1jLXBhc3N3b3JkLXRvZ2dsZVwiPjwvbmctY29udGVudD5cblxuICAgIDxuZy1jb250ZW50ICpuZ0lmPVwiY2FuU2hvd1N0ZXBwZXJcIiBzZWxlY3Q9XCJtYy1zdGVwcGVyXCI+PC9uZy1jb250ZW50PlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJtYy1mb3JtLWZpZWxkX19oaW50XCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibWMtaGludCwgbWMtcGFzc3dvcmQtaGludFwiPjwvbmctY29udGVudD5cbjwvZGl2PlxuIl19