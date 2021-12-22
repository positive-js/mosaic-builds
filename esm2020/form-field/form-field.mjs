import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { mixinColor } from '@ptsecurity/mosaic/core';
import { EMPTY, merge, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { McCleaner } from './cleaner';
import { McFormFieldControl } from './form-field-control';
import { getMcFormFieldMissingControlError, getMcFormFieldYouCanNotUseCleanerInNumberInputError } from './form-field-errors';
import { McHint } from './hint';
import { McPrefix } from './prefix';
import { McStepper } from './stepper';
import { McSuffix } from './suffix';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
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
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef, _changeDetectorRef) {
        super(_elementRef);
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        // Unique id for the internal form field label.
        this.labelId = `mc-form-field-label-${nextUniqueId++}`;
        this.hovered = false;
        this.canCleanerClearByEsc = true;
        this.$unsubscribe = new Subject();
    }
    get hasHint() {
        return this.hint && this.hint.length > 0;
    }
    get hasSuffix() {
        return this.suffix && this.suffix.length > 0;
    }
    get hasPrefix() {
        return this.prefix && this.prefix.length > 0;
    }
    get hasCleaner() {
        return !!this.cleaner;
    }
    get hasStepper() {
        return !!this.stepper;
    }
    get canShowCleaner() {
        return this.hasCleaner &&
            this.control &&
            this.control.ngControl
            ? this.control.ngControl.value && !this.control.disabled
            : false;
    }
    get disabled() {
        return this.control && this.control.disabled;
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
            .subscribe(() => {
            this._changeDetectorRef.markForCheck();
        });
        if (this.hasStepper) {
            this.stepper.connectTo(this.control.numberInput);
        }
        // Run change detection if the value changes.
        const valueChanges = this.control.ngControl && this.control.ngControl.valueChanges || EMPTY;
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
        if (this.control && this.control.ngControl) {
            this.control.ngControl.reset();
            this.control.focus();
        }
    }
    onContainerClick($event) {
        if (this.control.onContainerClick) {
            this.control.onContainerClick($event);
        }
    }
    onKeyDown(event) {
        // tslint:disable-next-line:deprecation
        if (this.canCleanerClearByEsc && event.keyCode === ESCAPE && this.control.focused && this.hasCleaner) {
            if (this.control && this.control.ngControl) {
                this.control.ngControl.reset();
            }
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
    }
    /** Throws an error if the form field's control is missing. */
    validateControlChild() {
        if (!this.control) {
            throw getMcFormFieldMissingControlError();
        }
    }
}
/** @nocollapse */ /** @nocollapse */ McFormField.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McFormField, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McFormField.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: McFormField, selector: "mc-form-field", inputs: { color: "color" }, host: { listeners: { "keydown": "onKeyDown($event)", "mouseenter": "onHoverChanged(true)", "mouseleave": "onHoverChanged(false)" }, properties: { "class.mc-form-field_invalid": "control.errorState", "class.mc-form-field_has-prefix": "hasPrefix", "class.mc-form-field_has-suffix": "hasSuffix", "class.mc-form-field_has-cleaner": "canShowCleaner", "class.mc-form-field_has-stepper": "canShowStepper", "class.mc-disabled": "control.disabled", "class.mc-focused": "control.focused", "class.ng-untouched": "shouldForward(\"untouched\")", "class.ng-touched": "shouldForward(\"touched\")", "class.ng-pristine": "shouldForward(\"pristine\")", "class.ng-dirty": "shouldForward(\"dirty\")", "class.ng-valid": "shouldForward(\"valid\")", "class.ng-invalid": "shouldForward(\"invalid\")", "class.ng-pending": "shouldForward(\"pending\")" }, classAttribute: "mc-form-field" }, queries: [{ propertyName: "control", first: true, predicate: McFormFieldControl, descendants: true }, { propertyName: "stepper", first: true, predicate: McStepper, descendants: true }, { propertyName: "cleaner", first: true, predicate: McCleaner, descendants: true }, { propertyName: "hint", predicate: McHint }, { propertyName: "suffix", predicate: McSuffix }, { propertyName: "prefix", predicate: McPrefix }], viewQueries: [{ propertyName: "connectionContainerRef", first: true, predicate: ["connectionContainer"], descendants: true, static: true }], exportAs: ["mcFormField"], usesInheritance: true, ngImport: i0, template: "<div class=\"mc-form-field__container\" (click)=\"onContainerClick($event)\">\n\n    <div class=\"mc-form-field__prefix\" *ngIf=\"hasPrefix\">\n        <ng-content select=\"[mcPrefix]\"></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__infix\">\n        <ng-content></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__suffix\" *ngIf=\"hasSuffix\">\n        <ng-content select=\"[mcSuffix]\"></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__cleaner\"\n         *ngIf=\"canShowCleaner && !hasSuffix\"\n         (click)=\"clearValue($event)\">\n        <ng-content select=\"mc-cleaner\"></ng-content>\n    </div>\n\n    <ng-content *ngIf=\"canShowStepper\" select=\"mc-stepper\"></ng-content>\n</div>\n\n<div class=\"mc-form-field__hint\">\n    <ng-content select=\"mc-hint\"></ng-content>\n</div>\n", styles: [".mc-form-field{position:relative;display:inline-block;width:100%;border-radius:3px;border-radius:var(--mc-form-field-size-border-radius, 3px)}.mc-form-field:hover{z-index:1}.mc-form-field.mc-focused{z-index:2}.mc-hint{display:block}.mc-form-field__hint>.mc-hint{margin-top:4px;margin-top:var(--mc-form-field-hint-size-margin-top, 4px)}.mc-form-field__container{position:relative;border-width:1px;border-width:var(--mc-form-field-size-border-width, 1px);border-style:solid;border-color:transparent;border-radius:3px;border-radius:var(--mc-form-field-size-border-radius, 3px)}.mc-form-field_without-borders .mc-form-field__container{border-color:transparent}.mc-form-field__prefix,.mc-form-field__suffix{position:absolute;top:0;bottom:0;width:32px;display:flex;flex-direction:row;justify-content:center;align-items:center}.mc-form-field__prefix{left:0}.mc-form-field__suffix{right:0}.mc-form-field_has-suffix .mc-input,.mc-form-field_has-cleaner .mc-input,.mc-form-field_has-stepper .mc-input{padding-right:32px;padding-right:var(--mc-form-field-size-button-width, 32px)}.mc-form-field_has-prefix .mc-input{padding-left:32px;padding-left:var(--mc-form-field-size-button-width, 32px)}.mc-cleaner{display:flex;width:32px;width:var(--mc-form-field-size-button-width, 32px);height:100%;cursor:pointer}.mc-cleaner .mc-icon{display:flex;align-items:center;justify-content:center;width:100%;height:100%}.mc-form-field__cleaner .mc-cleaner{position:absolute;top:0;bottom:0;right:0}mc-stepper{position:absolute;display:flex;flex-direction:column;justify-content:center;align-items:center;top:0;bottom:0;right:0;width:32px;width:var(--mc-form-field-size-button-width, 32px)}mc-stepper .mc-stepper-step-up,mc-stepper .mc-stepper-step-down{cursor:pointer;width:32px;width:var(--mc-form-field-size-button-width, 32px);text-align:center}mc-stepper .mc-stepper-step-up{transform:scaleY(-1)}\n", ".mc-input{background:transparent;margin:0;border:none;outline:none;box-sizing:border-box;padding:5px 16px;padding:var(--mc-input-size-padding, 5px 16px);width:100%;width:var(--mc-input-size-width, 100%);min-height:30px;min-height:var(--mc-input-size-min-height, 30px)}.mc-input::-ms-clear{display:none;width:0;height:0}.mc-input::-ms-reveal{display:none;width:0;height:0}.mc-input::-webkit-search-decoration,.mc-input::-webkit-search-cancel-button,.mc-input::-webkit-search-results-button,.mc-input::-webkit-search-results-decoration{display:none}.mc-input{display:inline-block}input.mc-input[type=number]{-moz-appearance:textfield}input.mc-input[type=number]::-webkit-inner-spin-button,input.mc-input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}input.mc-input:invalid{box-shadow:unset}\n", ".mc-timepicker{padding-right:15px;padding-right:calc(var(--mc-timepicker-size-padding-right, 16px) - var(--mc-form-field-size-border-width, 1px))}.mc-form-field-type-timepicker{width:auto}\n", ".mc-form-field-type-datepicker{width:auto}.mc-datepicker{width:130px;width:var(--mc-datepicker-input-size-width, 130px)}\n", ".mc-textarea{background:transparent;margin:0;border:none;outline:none;resize:none;overflow:auto;width:100%;box-sizing:border-box;padding:5px 16px;padding:var(--mc-textarea-size-padding, 5px 16px)}.mc-textarea{display:inline-block;-webkit-appearance:none;vertical-align:bottom}.mc-textarea:not(.mc-textarea-resizable){box-sizing:border-box;overflow-y:hidden}.mc-textarea.mc-textarea-resizable{resize:vertical;min-height:50px;min-height:var(--mc-textarea-size-min-height, 50px)}.mc-textarea:invalid{box-shadow:unset}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McFormField, decorators: [{
            type: Component,
            args: [{ selector: 'mc-form-field', exportAs: 'mcFormField', host: {
                        class: 'mc-form-field',
                        '[class.mc-form-field_invalid]': 'control.errorState',
                        '[class.mc-form-field_has-prefix]': 'hasPrefix',
                        '[class.mc-form-field_has-suffix]': 'hasSuffix',
                        '[class.mc-form-field_has-cleaner]': 'canShowCleaner',
                        '[class.mc-form-field_has-stepper]': 'canShowStepper',
                        '[class.mc-disabled]': 'control.disabled',
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
                    }, inputs: ['color'], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mc-form-field__container\" (click)=\"onContainerClick($event)\">\n\n    <div class=\"mc-form-field__prefix\" *ngIf=\"hasPrefix\">\n        <ng-content select=\"[mcPrefix]\"></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__infix\">\n        <ng-content></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__suffix\" *ngIf=\"hasSuffix\">\n        <ng-content select=\"[mcSuffix]\"></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__cleaner\"\n         *ngIf=\"canShowCleaner && !hasSuffix\"\n         (click)=\"clearValue($event)\">\n        <ng-content select=\"mc-cleaner\"></ng-content>\n    </div>\n\n    <ng-content *ngIf=\"canShowStepper\" select=\"mc-stepper\"></ng-content>\n</div>\n\n<div class=\"mc-form-field__hint\">\n    <ng-content select=\"mc-hint\"></ng-content>\n</div>\n", styles: [".mc-form-field{position:relative;display:inline-block;width:100%;border-radius:3px;border-radius:var(--mc-form-field-size-border-radius, 3px)}.mc-form-field:hover{z-index:1}.mc-form-field.mc-focused{z-index:2}.mc-hint{display:block}.mc-form-field__hint>.mc-hint{margin-top:4px;margin-top:var(--mc-form-field-hint-size-margin-top, 4px)}.mc-form-field__container{position:relative;border-width:1px;border-width:var(--mc-form-field-size-border-width, 1px);border-style:solid;border-color:transparent;border-radius:3px;border-radius:var(--mc-form-field-size-border-radius, 3px)}.mc-form-field_without-borders .mc-form-field__container{border-color:transparent}.mc-form-field__prefix,.mc-form-field__suffix{position:absolute;top:0;bottom:0;width:32px;display:flex;flex-direction:row;justify-content:center;align-items:center}.mc-form-field__prefix{left:0}.mc-form-field__suffix{right:0}.mc-form-field_has-suffix .mc-input,.mc-form-field_has-cleaner .mc-input,.mc-form-field_has-stepper .mc-input{padding-right:32px;padding-right:var(--mc-form-field-size-button-width, 32px)}.mc-form-field_has-prefix .mc-input{padding-left:32px;padding-left:var(--mc-form-field-size-button-width, 32px)}.mc-cleaner{display:flex;width:32px;width:var(--mc-form-field-size-button-width, 32px);height:100%;cursor:pointer}.mc-cleaner .mc-icon{display:flex;align-items:center;justify-content:center;width:100%;height:100%}.mc-form-field__cleaner .mc-cleaner{position:absolute;top:0;bottom:0;right:0}mc-stepper{position:absolute;display:flex;flex-direction:column;justify-content:center;align-items:center;top:0;bottom:0;right:0;width:32px;width:var(--mc-form-field-size-button-width, 32px)}mc-stepper .mc-stepper-step-up,mc-stepper .mc-stepper-step-down{cursor:pointer;width:32px;width:var(--mc-form-field-size-button-width, 32px);text-align:center}mc-stepper .mc-stepper-step-up{transform:scaleY(-1)}\n", ".mc-input{background:transparent;margin:0;border:none;outline:none;box-sizing:border-box;padding:5px 16px;padding:var(--mc-input-size-padding, 5px 16px);width:100%;width:var(--mc-input-size-width, 100%);min-height:30px;min-height:var(--mc-input-size-min-height, 30px)}.mc-input::-ms-clear{display:none;width:0;height:0}.mc-input::-ms-reveal{display:none;width:0;height:0}.mc-input::-webkit-search-decoration,.mc-input::-webkit-search-cancel-button,.mc-input::-webkit-search-results-button,.mc-input::-webkit-search-results-decoration{display:none}.mc-input{display:inline-block}input.mc-input[type=number]{-moz-appearance:textfield}input.mc-input[type=number]::-webkit-inner-spin-button,input.mc-input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}input.mc-input:invalid{box-shadow:unset}\n", ".mc-timepicker{padding-right:15px;padding-right:calc(var(--mc-timepicker-size-padding-right, 16px) - var(--mc-form-field-size-border-width, 1px))}.mc-form-field-type-timepicker{width:auto}\n", ".mc-form-field-type-datepicker{width:auto}.mc-datepicker{width:130px;width:var(--mc-datepicker-input-size-width, 130px)}\n", ".mc-textarea{background:transparent;margin:0;border:none;outline:none;resize:none;overflow:auto;width:100%;box-sizing:border-box;padding:5px 16px;padding:var(--mc-textarea-size-padding, 5px 16px)}.mc-textarea{display:inline-block;-webkit-appearance:none;vertical-align:bottom}.mc-textarea:not(.mc-textarea-resizable){box-sizing:border-box;overflow-y:hidden}.mc-textarea.mc-textarea-resizable{resize:vertical;min-height:50px;min-height:var(--mc-textarea-size-min-height, 50px)}.mc-textarea:invalid{box-shadow:unset}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { control: [{
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
/** @nocollapse */ /** @nocollapse */ McFormFieldWithoutBorders.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McFormFieldWithoutBorders, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McFormFieldWithoutBorders.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: McFormFieldWithoutBorders, selector: "mc-form-field[mcFormFieldWithoutBorders]", host: { classAttribute: "mc-form-field_without-borders" }, exportAs: ["mcFormFieldWithoutBorders"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McFormFieldWithoutBorders, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-form-field[mcFormFieldWithoutBorders]',
                    exportAs: 'mcFormFieldWithoutBorders',
                    host: { class: 'mc-form-field_without-borders' }
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9mb3JtLWZpZWxkL2Zvcm0tZmllbGQudHMiLCIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvZm9ybS1maWVsZC9mb3JtLWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUlILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFFVixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUEwQixVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFDSCxpQ0FBaUMsRUFDakMsbURBQW1ELEVBQ3RELE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNoQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7O0FBR3BDLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUVyQixNQUFNLE9BQU8sZUFB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LEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFFakIsSUFBSTtzQkFBNUIsZUFBZTt1QkFBQyxNQUFNO2dCQUNJLE1BQU07c0JBQWhDLGVBQWU7dUJBQUMsUUFBUTtnQkFDRSxNQUFNO3NCQUFoQyxlQUFlO3VCQUFDLFFBQVE7Z0JBRTJCLHNCQUFzQjtzQkFBekUsU0FBUzt1QkFBQyxxQkFBcUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7O0FBZ0t0RCxNQUFNLE9BQU8seUJBQXlCOzs0SkFBekIseUJBQXlCO2dKQUF6Qix5QkFBeUI7MkZBQXpCLHlCQUF5QjtrQkFMckMsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsMENBQTBDO29CQUNwRCxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsK0JBQStCLEVBQUU7aUJBQ25EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBPbkRlc3Ryb3ksXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEVTQ0FQRSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBDYW5Db2xvciwgQ2FuQ29sb3JDdG9yLCBtaXhpbkNvbG9yIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgRU1QVFksIG1lcmdlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGgsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWNDbGVhbmVyIH0gZnJvbSAnLi9jbGVhbmVyJztcbmltcG9ydCB7IE1jRm9ybUZpZWxkQ29udHJvbCB9IGZyb20gJy4vZm9ybS1maWVsZC1jb250cm9sJztcbmltcG9ydCB7XG4gICAgZ2V0TWNGb3JtRmllbGRNaXNzaW5nQ29udHJvbEVycm9yLFxuICAgIGdldE1jRm9ybUZpZWxkWW91Q2FuTm90VXNlQ2xlYW5lckluTnVtYmVySW5wdXRFcnJvclxufSBmcm9tICcuL2Zvcm0tZmllbGQtZXJyb3JzJztcbmltcG9ydCB7IE1jSGludCB9IGZyb20gJy4vaGludCc7XG5pbXBvcnQgeyBNY1ByZWZpeCB9IGZyb20gJy4vcHJlZml4JztcbmltcG9ydCB7IE1jU3RlcHBlciB9IGZyb20gJy4vc3RlcHBlcic7XG5pbXBvcnQgeyBNY1N1ZmZpeCB9IGZyb20gJy4vc3VmZml4JztcblxuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxuZXhwb3J0IGNsYXNzIE1jRm9ybUZpZWxkQmFzZSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY0Zvcm1GaWVsZE1peGluQmFzZTogQ2FuQ29sb3JDdG9yICYgdHlwZW9mIE1jRm9ybUZpZWxkQmFzZSA9IG1peGluQ29sb3IoTWNGb3JtRmllbGRCYXNlKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1mb3JtLWZpZWxkJyxcbiAgICBleHBvcnRBczogJ21jRm9ybUZpZWxkJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2Zvcm0tZmllbGQuaHRtbCcsXG4gICAgLy8gTWNJbnB1dCBpcyBhIGRpcmVjdGl2ZSBhbmQgY2FuJ3QgaGF2ZSBzdHlsZXMsIHNvIHdlIG5lZWQgdG8gaW5jbHVkZSBpdHMgc3R5bGVzIGhlcmUuXG4gICAgLy8gVGhlIE1jSW5wdXQgc3R5bGVzIGFyZSBmYWlybHkgbWluaW1hbCBzbyBpdCBzaG91bGRuJ3QgYmUgYSBiaWcgZGVhbCBmb3IgcGVvcGxlIHdob1xuICAgIC8vIGFyZW4ndCB1c2luZyBNY0lucHV0LlxuICAgIHN0eWxlVXJsczogW1xuICAgICAgICAnZm9ybS1maWVsZC5zY3NzJyxcbiAgICAgICAgJy4uL2lucHV0L2lucHV0LnNjc3MnLFxuICAgICAgICAnLi4vdGltZXBpY2tlci90aW1lcGlja2VyLnNjc3MnLFxuICAgICAgICAnLi4vZGF0ZXBpY2tlci9kYXRlcGlja2VyLWlucHV0LnNjc3MnLFxuICAgICAgICAnLi4vdGV4dGFyZWEvdGV4dGFyZWEuc2NzcydcbiAgICBdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1mb3JtLWZpZWxkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1mb3JtLWZpZWxkX2ludmFsaWRdJzogJ2NvbnRyb2wuZXJyb3JTdGF0ZScsXG4gICAgICAgICdbY2xhc3MubWMtZm9ybS1maWVsZF9oYXMtcHJlZml4XSc6ICdoYXNQcmVmaXgnLFxuICAgICAgICAnW2NsYXNzLm1jLWZvcm0tZmllbGRfaGFzLXN1ZmZpeF0nOiAnaGFzU3VmZml4JyxcbiAgICAgICAgJ1tjbGFzcy5tYy1mb3JtLWZpZWxkX2hhcy1jbGVhbmVyXSc6ICdjYW5TaG93Q2xlYW5lcicsXG4gICAgICAgICdbY2xhc3MubWMtZm9ybS1maWVsZF9oYXMtc3RlcHBlcl0nOiAnY2FuU2hvd1N0ZXBwZXInLFxuICAgICAgICAnW2NsYXNzLm1jLWRpc2FibGVkXSc6ICdjb250cm9sLmRpc2FibGVkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1mb2N1c2VkXSc6ICdjb250cm9sLmZvY3VzZWQnLFxuICAgICAgICAnW2NsYXNzLm5nLXVudG91Y2hlZF0nOiAnc2hvdWxkRm9yd2FyZChcInVudG91Y2hlZFwiKScsXG4gICAgICAgICdbY2xhc3MubmctdG91Y2hlZF0nOiAnc2hvdWxkRm9yd2FyZChcInRvdWNoZWRcIiknLFxuICAgICAgICAnW2NsYXNzLm5nLXByaXN0aW5lXSc6ICdzaG91bGRGb3J3YXJkKFwicHJpc3RpbmVcIiknLFxuICAgICAgICAnW2NsYXNzLm5nLWRpcnR5XSc6ICdzaG91bGRGb3J3YXJkKFwiZGlydHlcIiknLFxuICAgICAgICAnW2NsYXNzLm5nLXZhbGlkXSc6ICdzaG91bGRGb3J3YXJkKFwidmFsaWRcIiknLFxuICAgICAgICAnW2NsYXNzLm5nLWludmFsaWRdJzogJ3Nob3VsZEZvcndhcmQoXCJpbnZhbGlkXCIpJyxcbiAgICAgICAgJ1tjbGFzcy5uZy1wZW5kaW5nXSc6ICdzaG91bGRGb3J3YXJkKFwicGVuZGluZ1wiKScsXG4gICAgICAgICcoa2V5ZG93biknOiAnb25LZXlEb3duKCRldmVudCknLFxuICAgICAgICAnKG1vdXNlZW50ZXIpJzogJ29uSG92ZXJDaGFuZ2VkKHRydWUpJyxcbiAgICAgICAgJyhtb3VzZWxlYXZlKSc6ICdvbkhvdmVyQ2hhbmdlZChmYWxzZSknXG4gICAgfSxcbiAgICBpbnB1dHM6IFsnY29sb3InXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1jRm9ybUZpZWxkIGV4dGVuZHMgTWNGb3JtRmllbGRNaXhpbkJhc2UgaW1wbGVtZW50c1xuICAgIEFmdGVyQ29udGVudEluaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyVmlld0luaXQsIENhbkNvbG9yLCBPbkRlc3Ryb3kge1xuXG4gICAgQENvbnRlbnRDaGlsZChNY0Zvcm1GaWVsZENvbnRyb2wsIHsgc3RhdGljOiBmYWxzZSB9KSBjb250cm9sOiBNY0Zvcm1GaWVsZENvbnRyb2w8YW55PjtcbiAgICBAQ29udGVudENoaWxkKE1jU3RlcHBlciwgeyBzdGF0aWM6IGZhbHNlIH0pIHN0ZXBwZXI6IE1jU3RlcHBlcjtcbiAgICBAQ29udGVudENoaWxkKE1jQ2xlYW5lciwgeyBzdGF0aWM6IGZhbHNlIH0pIGNsZWFuZXI6IE1jQ2xlYW5lciB8IG51bGw7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKE1jSGludCkgaGludDogUXVlcnlMaXN0PE1jSGludD47XG4gICAgQENvbnRlbnRDaGlsZHJlbihNY1N1ZmZpeCkgc3VmZml4OiBRdWVyeUxpc3Q8TWNTdWZmaXg+O1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNQcmVmaXgpIHByZWZpeDogUXVlcnlMaXN0PE1jUHJlZml4PjtcblxuICAgIEBWaWV3Q2hpbGQoJ2Nvbm5lY3Rpb25Db250YWluZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBjb25uZWN0aW9uQ29udGFpbmVyUmVmOiBFbGVtZW50UmVmO1xuXG4gICAgLy8gVW5pcXVlIGlkIGZvciB0aGUgaW50ZXJuYWwgZm9ybSBmaWVsZCBsYWJlbC5cbiAgICBsYWJlbElkID0gYG1jLWZvcm0tZmllbGQtbGFiZWwtJHtuZXh0VW5pcXVlSWQrK31gO1xuXG4gICAgaG92ZXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY2FuQ2xlYW5lckNsZWFyQnlFc2M6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgcHJpdmF0ZSAkdW5zdWJzY3JpYmUgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgZ2V0IGhhc0hpbnQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpbnQgJiYgdGhpcy5oaW50Lmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgZ2V0IGhhc1N1ZmZpeCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VmZml4ICYmIHRoaXMuc3VmZml4Lmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgZ2V0IGhhc1ByZWZpeCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJlZml4ICYmIHRoaXMucHJlZml4Lmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgZ2V0IGhhc0NsZWFuZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuY2xlYW5lcjtcbiAgICB9XG5cbiAgICBnZXQgaGFzU3RlcHBlcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5zdGVwcGVyO1xuICAgIH1cblxuICAgIGdldCBjYW5TaG93Q2xlYW5lcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQ2xlYW5lciAmJlxuICAgICAgICB0aGlzLmNvbnRyb2wgJiZcbiAgICAgICAgdGhpcy5jb250cm9sLm5nQ29udHJvbFxuICAgICAgICAgICAgPyB0aGlzLmNvbnRyb2wubmdDb250cm9sLnZhbHVlICYmICF0aGlzLmNvbnRyb2wuZGlzYWJsZWRcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sICYmIHRoaXMuY29udHJvbC5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBnZXQgY2FuU2hvd1N0ZXBwZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc1N0ZXBwZXIgJiZcbiAgICAgICAgICAgICF0aGlzLmRpc2FibGVkICYmXG4gICAgICAgICAgICAodGhpcy5jb250cm9sPy5mb2N1c2VkIHx8IHRoaXMuaG92ZXJlZCk7XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgc3VwZXIoX2VsZW1lbnRSZWYpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgaWYgKCh0aGlzLmNvbnRyb2wgYXMgYW55KS5udW1iZXJJbnB1dCAmJiB0aGlzLmhhc0NsZWFuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYW5lciA9IG51bGw7XG4gICAgICAgICAgICB0aHJvdyBnZXRNY0Zvcm1GaWVsZFlvdUNhbk5vdFVzZUNsZWFuZXJJbk51bWJlcklucHV0RXJyb3IoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmFsaWRhdGVDb250cm9sQ2hpbGQoKTtcblxuICAgICAgICBpZiAodGhpcy5jb250cm9sLmNvbnRyb2xUeXBlKSB7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChgbWMtZm9ybS1maWVsZC10eXBlLSR7dGhpcy5jb250cm9sLmNvbnRyb2xUeXBlfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3Vic2NyaWJlIHRvIGNoYW5nZXMgaW4gdGhlIGNoaWxkIGNvbnRyb2wgc3RhdGUgaW4gb3JkZXIgdG8gdXBkYXRlIHRoZSBmb3JtIGZpZWxkIFVJLlxuICAgICAgICB0aGlzLmNvbnRyb2wuc3RhdGVDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShzdGFydFdpdGgoKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzU3RlcHBlcikge1xuICAgICAgICAgICAgdGhpcy5zdGVwcGVyLmNvbm5lY3RUbygodGhpcy5jb250cm9sIGFzIGFueSkubnVtYmVySW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUnVuIGNoYW5nZSBkZXRlY3Rpb24gaWYgdGhlIHZhbHVlIGNoYW5nZXMuXG4gICAgICAgIGNvbnN0IHZhbHVlQ2hhbmdlcyA9IHRoaXMuY29udHJvbC5uZ0NvbnRyb2wgJiYgdGhpcy5jb250cm9sLm5nQ29udHJvbC52YWx1ZUNoYW5nZXMgfHwgRU1QVFk7XG5cbiAgICAgICAgbWVyZ2UodmFsdWVDaGFuZ2VzKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuJHVuc3Vic2NyaWJlKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUNvbnRyb2xDaGlsZCgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgLy8gQXZvaWQgYW5pbWF0aW9ucyBvbiBsb2FkLlxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgY2xlYXJWYWx1ZSgkZXZlbnQpIHtcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2wgJiYgdGhpcy5jb250cm9sLm5nQ29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sLm5nQ29udHJvbC5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5jb250cm9sLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNvbnRhaW5lckNsaWNrKCRldmVudCkge1xuICAgICAgICBpZiAodGhpcy5jb250cm9sLm9uQ29udGFpbmVyQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5vbkNvbnRhaW5lckNsaWNrKCRldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgICAgIGlmICh0aGlzLmNhbkNsZWFuZXJDbGVhckJ5RXNjICYmIGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSAmJiB0aGlzLmNvbnRyb2wuZm9jdXNlZCAmJiB0aGlzLmhhc0NsZWFuZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2wgJiYgdGhpcy5jb250cm9sLm5nQ29udHJvbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbC5uZ0NvbnRyb2wucmVzZXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSG92ZXJDaGFuZ2VkKGlzSG92ZXJlZDogYm9vbGVhbikge1xuICAgICAgICBpZiAoaXNIb3ZlcmVkICE9PSB0aGlzLmhvdmVyZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaG92ZXJlZCA9IGlzSG92ZXJlZDtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhbiBFbGVtZW50UmVmIGZvciB0aGUgZWxlbWVudCB0aGF0IGEgb3ZlcmxheSBhdHRhY2hlZCB0byB0aGUgZm9ybS1maWVsZCBzaG91bGQgYmVcbiAgICAgKiBwb3NpdGlvbmVkIHJlbGF0aXZlIHRvLlxuICAgICAqL1xuICAgIGdldENvbm5lY3RlZE92ZXJsYXlPcmlnaW4oKTogRWxlbWVudFJlZiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb25Db250YWluZXJSZWYgfHwgdGhpcy5fZWxlbWVudFJlZjtcbiAgICB9XG5cbiAgICAvKiogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgY2xhc3MgZnJvbSB0aGUgTmdDb250cm9sIHNob3VsZCBiZSBmb3J3YXJkZWQgdG8gdGhlIGhvc3QgZWxlbWVudC4gKi9cbiAgICBzaG91bGRGb3J3YXJkKHByb3A6IGtleW9mIE5nQ29udHJvbCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBuZ0NvbnRyb2wgPSB0aGlzLmNvbnRyb2wgPyB0aGlzLmNvbnRyb2wubmdDb250cm9sIDogbnVsbDtcblxuICAgICAgICByZXR1cm4gbmdDb250cm9sICYmIG5nQ29udHJvbFtwcm9wXTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy4kdW5zdWJzY3JpYmUubmV4dCgpO1xuICAgICAgICB0aGlzLiR1bnN1YnNjcmliZS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8qKiBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIGZvcm0gZmllbGQncyBjb250cm9sIGlzIG1pc3NpbmcuICovXG4gICAgcHJvdGVjdGVkIHZhbGlkYXRlQ29udHJvbENoaWxkKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udHJvbCkge1xuICAgICAgICAgICAgdGhyb3cgZ2V0TWNGb3JtRmllbGRNaXNzaW5nQ29udHJvbEVycm9yKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtZm9ybS1maWVsZFttY0Zvcm1GaWVsZFdpdGhvdXRCb3JkZXJzXScsXG4gICAgZXhwb3J0QXM6ICdtY0Zvcm1GaWVsZFdpdGhvdXRCb3JkZXJzJyxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtZm9ybS1maWVsZF93aXRob3V0LWJvcmRlcnMnIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNGb3JtRmllbGRXaXRob3V0Qm9yZGVycyB7fVxuIiwiPGRpdiBjbGFzcz1cIm1jLWZvcm0tZmllbGRfX2NvbnRhaW5lclwiIChjbGljayk9XCJvbkNvbnRhaW5lckNsaWNrKCRldmVudClcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJtYy1mb3JtLWZpZWxkX19wcmVmaXhcIiAqbmdJZj1cImhhc1ByZWZpeFwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbbWNQcmVmaXhdXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cIm1jLWZvcm0tZmllbGRfX2luZml4XCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJtYy1mb3JtLWZpZWxkX19zdWZmaXhcIiAqbmdJZj1cImhhc1N1ZmZpeFwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbbWNTdWZmaXhdXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cIm1jLWZvcm0tZmllbGRfX2NsZWFuZXJcIlxuICAgICAgICAgKm5nSWY9XCJjYW5TaG93Q2xlYW5lciAmJiAhaGFzU3VmZml4XCJcbiAgICAgICAgIChjbGljayk9XCJjbGVhclZhbHVlKCRldmVudClcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibWMtY2xlYW5lclwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cblxuICAgIDxuZy1jb250ZW50ICpuZ0lmPVwiY2FuU2hvd1N0ZXBwZXJcIiBzZWxlY3Q9XCJtYy1zdGVwcGVyXCI+PC9uZy1jb250ZW50PlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJtYy1mb3JtLWZpZWxkX19oaW50XCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibWMtaGludFwiPjwvbmctY29udGVudD5cbjwvZGl2PlxuIl19