import { CommonModule } from '@angular/common';
import { Component, Directive, Input, EventEmitter, Output, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, ContentChild, ContentChildren, ViewChild, NgModule } from '@angular/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { mixinColor } from '@ptsecurity/mosaic/core';
import { Subject, EMPTY, merge } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

class McCleaner {
}
McCleaner.decorators = [
    { type: Component, args: [{
                selector: 'mc-cleaner',
                exportAs: 'mcCleaner',
                template: '<i class="mc-icon_light" mc-icon="mc-close-circle_16" color="second"></i>',
                host: {
                    class: 'mc-cleaner'
                }
            },] }
];

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

let nextUniqueId$1 = 0;
class McHint {
    constructor() {
        this.id = `mc-hint-${nextUniqueId$1++}`;
    }
}
McHint.decorators = [
    { type: Directive, args: [{
                selector: 'mc-hint',
                host: {
                    class: 'mc-hint',
                    '[attr.id]': 'id'
                }
            },] }
];
McHint.propDecorators = {
    id: [{ type: Input }]
};

class McPrefix {
}
McPrefix.decorators = [
    { type: Directive, args: [{
                selector: '[mcPrefix]'
            },] }
];

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
McStepper.decorators = [
    { type: Component, args: [{
                selector: 'mc-stepper',
                template: `
        <i class="mc mc-icon mc-icon_light mc-second mc-stepper-step-up mc-angle-down-L_16"
           (mousedown)="onStepUp($event)">
        </i>
        <i class="mc mc-icon mc-icon_light mc-second mc-stepper-step-down mc-angle-down-L_16"
           (mousedown)="onStepDown($event)">
        </i>
    `
            },] }
];
McStepper.propDecorators = {
    stepUp: [{ type: Output }],
    stepDown: [{ type: Output }]
};

class McSuffix {
}
McSuffix.decorators = [
    { type: Directive, args: [{
                selector: '[mcSuffix]'
            },] }
];

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
        var _a;
        return this.hasStepper &&
            !this.disabled &&
            (((_a = this.control) === null || _a === void 0 ? void 0 : _a.focused) || this.hovered);
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
McFormField.decorators = [
    { type: Component, args: [{
                selector: 'mc-form-field',
                exportAs: 'mcFormField',
                template: "<div class=\"mc-form-field__container\" (click)=\"onContainerClick($event)\">\n\n    <div class=\"mc-form-field__prefix\" *ngIf=\"hasPrefix\">\n        <ng-content select=\"[mcPrefix]\"></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__infix\">\n        <ng-content></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__suffix\" *ngIf=\"hasSuffix\">\n        <ng-content select=\"[mcSuffix]\"></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__cleaner\"\n         *ngIf=\"canShowCleaner && !hasSuffix\"\n         (click)=\"clearValue($event)\">\n        <ng-content select=\"mc-cleaner\"></ng-content>\n    </div>\n\n    <ng-content *ngIf=\"canShowStepper\" select=\"mc-stepper\"></ng-content>\n</div>\n\n<div class=\"mc-form-field__hint\">\n    <ng-content select=\"mc-hint\"></ng-content>\n</div>\n",
                host: {
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
                },
                inputs: ['color'],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mc-form-field{position:relative;display:inline-block;width:100%;border-radius:var(--mc-form-field-size-border-radius,3px)}.mc-form-field:hover{z-index:1}.mc-form-field.mc-focused{z-index:2}.mc-hint{display:block}.mc-form-field__hint>.mc-hint{margin-top:var(--mc-form-field-hint-size-margin-top,4px)}.mc-form-field__container{position:relative;border:var(--mc-form-field-size-border-width,1px) solid transparent;border-radius:var(--mc-form-field-size-border-radius,3px)}.mc-form-field_without-borders .mc-form-field__container{border-color:transparent}.mc-form-field__prefix,.mc-form-field__suffix{position:absolute;top:0;bottom:0;width:32px;display:flex;flex-direction:row;justify-content:center;align-items:center}.mc-form-field__prefix{left:0}.mc-form-field__suffix{right:0}.mc-form-field_has-cleaner .mc-input,.mc-form-field_has-stepper .mc-input,.mc-form-field_has-suffix .mc-input{padding-right:var(--mc-form-field-size-button-width,32px)}.mc-form-field_has-prefix .mc-input{padding-left:var(--mc-form-field-size-button-width,32px)}.mc-cleaner{display:flex;width:var(--mc-form-field-size-button-width,32px);height:100%;cursor:pointer}.mc-cleaner .mc-icon{display:flex;align-items:center;justify-content:center;width:100%;height:100%}.mc-form-field__cleaner .mc-cleaner,mc-stepper{position:absolute;top:0;bottom:0;right:0}mc-stepper{display:flex;flex-direction:column;justify-content:center;align-items:center;width:var(--mc-form-field-size-button-width,32px)}mc-stepper .mc-stepper-step-down,mc-stepper .mc-stepper-step-up{cursor:pointer;width:var(--mc-form-field-size-button-width,32px);text-align:center}mc-stepper .mc-stepper-step-up{transform:scaleY(-1)}", ".mc-input{background:transparent;padding:0;margin:0;border:none;outline:none;box-sizing:border-box;padding:var(--mc-input-size-padding,5px 16px);width:var(--mc-input-size-width,100%);min-height:var(--mc-input-size-min-height,30px)}.mc-input::-ms-clear,.mc-input::-ms-reveal{display:none;width:0;height:0}.mc-input::-webkit-search-cancel-button,.mc-input::-webkit-search-decoration,.mc-input::-webkit-search-results-button,.mc-input::-webkit-search-results-decoration{display:none}.mc-input{display:inline-block}input.mc-input[type=number]{-moz-appearance:textfield}input.mc-input[type=number]::-webkit-inner-spin-button,input.mc-input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}input.mc-input:invalid{box-shadow:unset}", ".mc-timepicker{padding-right:calc(var(--mc-timepicker-size-padding-right, 16px) - var(--mc-form-field-size-border-width, 1px))}.mc-form-field-type-timepicker{width:auto}", ".mc-form-field-type-datepicker{width:auto}.mc-datepicker{width:var(--mc-datepicker-input-size-width,130px)}", ".mc-textarea{background:transparent;margin:0;border:none;outline:none;resize:none;overflow:auto;width:100%;box-sizing:border-box;padding:var(--mc-textarea-size-padding,5px 16px);display:inline-block;-webkit-appearance:none;vertical-align:bottom}.mc-textarea:not(.mc-textarea-resizable){box-sizing:border-box;overflow-y:hidden}.mc-textarea.mc-textarea-resizable{resize:vertical;min-height:var(--mc-textarea-size-min-height,50px)}.mc-textarea:invalid{box-shadow:unset}"]
            },] }
];
/** @nocollapse */
McFormField.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
McFormField.propDecorators = {
    control: [{ type: ContentChild, args: [McFormFieldControl, { static: false },] }],
    stepper: [{ type: ContentChild, args: [McStepper, { static: false },] }],
    cleaner: [{ type: ContentChild, args: [McCleaner, { static: false },] }],
    hint: [{ type: ContentChildren, args: [McHint,] }],
    suffix: [{ type: ContentChildren, args: [McSuffix,] }],
    prefix: [{ type: ContentChildren, args: [McPrefix,] }],
    connectionContainerRef: [{ type: ViewChild, args: ['connectionContainer', { static: true },] }]
};
class McFormFieldWithoutBorders {
}
McFormFieldWithoutBorders.decorators = [
    { type: Directive, args: [{
                selector: 'mc-form-field[mcFormFieldWithoutBorders]',
                exportAs: 'mcFormFieldWithoutBorders',
                host: { class: 'mc-form-field_without-borders' }
            },] }
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
                    McCleaner,
                    McStepper
                ],
                imports: [CommonModule, McIconModule],
                exports: [
                    McFormField,
                    McFormFieldWithoutBorders,
                    McHint,
                    McPrefix,
                    McSuffix,
                    McCleaner,
                    McStepper
                ]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { McCleaner, McFormField, McFormFieldBase, McFormFieldControl, McFormFieldMixinBase, McFormFieldModule, McFormFieldWithoutBorders, McHint, McPrefix, McStepper, McSuffix, getMcFormFieldMissingControlError, getMcFormFieldYouCanNotUseCleanerInNumberInputError };
//# sourceMappingURL=ptsecurity-mosaic-form-field.js.map
