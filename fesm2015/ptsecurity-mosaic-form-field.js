import { CommonModule } from '@angular/common';
import { Component, Directive, Input, EventEmitter, Output, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, ContentChild, ContentChildren, ViewChild, NgModule } from '@angular/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { mixinColor } from '@ptsecurity/mosaic/core';
import { EMPTY, merge } from 'rxjs';
import { startWith } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * Generated from: cleaner.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
            }] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: form-field-control.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An interface which allows a control to work inside of a `MсFormField`.
 * @abstract
 * @template T
 */
// tslint:disable-next-line:naming-convention
class McFormFieldControl {
}
if (false) {
    /**
     * The value of the control.
     * @type {?}
     */
    McFormFieldControl.prototype.value;
    /**
     * Stream that emits whenever the state of the control changes such that the parent `MсFormField`
     * needs to run change detection.
     * @type {?}
     */
    McFormFieldControl.prototype.stateChanges;
    /**
     * The element ID for this control.
     * @type {?}
     */
    McFormFieldControl.prototype.id;
    /**
     * The placeholder for this control.
     * @type {?}
     */
    McFormFieldControl.prototype.placeholder;
    /**
     * Gets the NgControl for this control.
     * @type {?}
     */
    McFormFieldControl.prototype.ngControl;
    /**
     * Whether the control is focused.
     * @type {?}
     */
    McFormFieldControl.prototype.focused;
    /**
     * Whether the control is empty.
     * @type {?}
     */
    McFormFieldControl.prototype.empty;
    /**
     * Whether the control is required.
     * @type {?}
     */
    McFormFieldControl.prototype.required;
    /**
     * Whether the control is disabled.
     * @type {?}
     */
    McFormFieldControl.prototype.disabled;
    /**
     * Whether the control is in an error state.
     * @type {?}
     */
    McFormFieldControl.prototype.errorState;
    /**
     * An optional name for the control type that can be used to distinguish `mc-form-field` elements
     * based on their control type. The form field will add a class,
     * `mc-form-field-type-{{controlType}}` to its root element.
     * @type {?}
     */
    McFormFieldControl.prototype.controlType;
    /**
     * Handles a click on the control's container.
     * @abstract
     * @param {?} event
     * @return {?}
     */
    McFormFieldControl.prototype.onContainerClick = function (event) { };
    /**
     * @abstract
     * @return {?}
     */
    McFormFieldControl.prototype.focus = function () { };
}

/**
 * @fileoverview added by tsickle
 * Generated from: form-field-errors.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    return Error(`You can't use mc-cleaner with input that have type="number"`);
}

/**
 * @fileoverview added by tsickle
 * Generated from: hint.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
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
            },] }
];
McHint.propDecorators = {
    id: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    McHint.prototype.id;
}

/**
 * @fileoverview added by tsickle
 * Generated from: prefix.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McPrefix {
}
McPrefix.decorators = [
    { type: Directive, args: [{
                selector: '[mcPrefix]'
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: stepper.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McStepper {
    constructor() {
        this.stepUp = new EventEmitter();
        this.stepDown = new EventEmitter();
    }
    /**
     * @param {?} numberInput
     * @return {?}
     */
    connectTo(numberInput) {
        if (!numberInput) {
            return;
        }
        this.stepUp.subscribe((/**
         * @return {?}
         */
        () => {
            numberInput.stepUp(numberInput.step);
        }));
        this.stepDown.subscribe((/**
         * @return {?}
         */
        () => {
            numberInput.stepDown(numberInput.step);
        }));
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onStepUp($event) {
        this.stepUp.emit();
        $event.preventDefault();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
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
            }] }
];
McStepper.propDecorators = {
    stepUp: [{ type: Output }],
    stepDown: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    McStepper.prototype.stepUp;
    /** @type {?} */
    McStepper.prototype.stepDown;
}

/**
 * @fileoverview added by tsickle
 * Generated from: suffix.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McSuffix {
}
McSuffix.decorators = [
    { type: Directive, args: [{
                selector: '[mcSuffix]'
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: form-field.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let nextUniqueId$1 = 0;
class McFormFieldBase {
    // tslint:disable-next-line:naming-convention
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
if (false) {
    /** @type {?} */
    McFormFieldBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
const McFormFieldMixinBase = mixinColor(McFormFieldBase);
class McFormField extends McFormFieldMixinBase {
    // tslint:disable-next-line:naming-convention
    /**
     * @param {?} _elementRef
     * @param {?} _changeDetectorRef
     */
    constructor(_elementRef, _changeDetectorRef) {
        super(_elementRef);
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        // Unique id for the internal form field label.
        this.labelId = `mc-form-field-label-${nextUniqueId$1++}`;
        this.hovered = false;
        this.canCleanerClearByEsc = true;
    }
    /**
     * @return {?}
     */
    get hasHint() {
        return this.hint && this.hint.length > 0;
    }
    /**
     * @return {?}
     */
    get hasSuffix() {
        return this.suffix && this.suffix.length > 0;
    }
    /**
     * @return {?}
     */
    get hasPrefix() {
        return this.prefix && this.prefix.length > 0;
    }
    /**
     * @return {?}
     */
    get hasCleaner() {
        return !!this.cleaner;
    }
    /**
     * @return {?}
     */
    get hasStepper() {
        return !!this.stepper;
    }
    /**
     * @return {?}
     */
    get canShowCleaner() {
        return this.hasCleaner &&
            this.control &&
            this.control.ngControl
            ? this.control.ngControl.value && !this.control.disabled
            : false;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this.control && this.control.disabled;
    }
    /**
     * @return {?}
     */
    get canShowStepper() {
        return this.control && !this.disabled && (this.control.focused || this.hovered);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (((/** @type {?} */ (this.control))).numberInput && this.hasCleaner) {
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
            .subscribe((/**
         * @return {?}
         */
        () => {
            this._changeDetectorRef.markForCheck();
        }));
        if (this.hasStepper) {
            this.stepper.connectTo(((/** @type {?} */ (this.control))).numberInput);
        }
        // Run change detection if the value changes.
        /** @type {?} */
        const valueChanges = this.control.ngControl && this.control.ngControl.valueChanges || EMPTY;
        merge(valueChanges)
            .subscribe((/**
         * @return {?}
         */
        () => this._changeDetectorRef.markForCheck()));
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        this.validateControlChild();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // Avoid animations on load.
        this._changeDetectorRef.detectChanges();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    clearValue($event) {
        $event.stopPropagation();
        if (this.control && this.control.ngControl) {
            this.control.ngControl.reset();
            this.control.focus();
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onContainerClick($event) {
        if (this.control.onContainerClick) {
            this.control.onContainerClick($event);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        // tslint:disable-next-line:deprecation
        if (this.canCleanerClearByEsc && event.keyCode === ESCAPE && this.control.focused && this.hasCleaner) {
            if (this.control && this.control.ngControl) {
                this.control.ngControl.reset();
            }
            event.preventDefault();
        }
    }
    /**
     * @param {?} isHovered
     * @return {?}
     */
    onHoverChanged(isHovered) {
        if (isHovered !== this.hovered) {
            this.hovered = isHovered;
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
     * Gets an ElementRef for the element that a overlay attached to the form-field should be
     * positioned relative to.
     * @return {?}
     */
    getConnectedOverlayOrigin() {
        return this.connectionContainerRef || this._elementRef;
    }
    /**
     * Determines whether a class from the NgControl should be forwarded to the host element.
     * @param {?} prop
     * @return {?}
     */
    shouldForward(prop) {
        /** @type {?} */
        const ngControl = this.control ? this.control.ngControl : null;
        return ngControl && ngControl[prop];
    }
    /**
     * Throws an error if the form field's control is missing.
     * @protected
     * @return {?}
     */
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
                template: "<div class=\"mc-form-field__container\" (click)=\"onContainerClick($event)\">\n\n    <div class=\"mc-form-field__prefix\" *ngIf=\"hasPrefix\">\n        <ng-content select=\"[mcPrefix]\"></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__infix\">\n        <ng-content></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__suffix\" *ngIf=\"hasSuffix\">\n        <ng-content select=\"[mcSuffix]\"></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__cleaner\"\n         *ngIf=\"canShowCleaner && !hasSuffix\"\n         (click)=\"clearValue($event)\">\n        <ng-content select=\"mc-cleaner\"></ng-content>\n    </div>\n\n    <ng-content *ngIf=\"canShowStepper\" select=\"mc-stepper\"></ng-content>\n</div>\n\n<div class=\"mc-form-field__hint\" *ngIf=\"hasHint\">\n    <ng-content select=\"mc-hint\"></ng-content>\n</div>\n",
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
                styles: [".mc-form-field{border-radius:3px;display:inline-block;position:relative;width:100%}.mc-form-field:hover{z-index:1}.mc-form-field.mc-focused{z-index:2}.mc-form-field__hint{margin-top:4px}.mc-form-field__container{border:1px solid transparent;border-radius:3px;position:relative}.mc-form-field_without-borders .mc-form-field__container{border-color:transparent}.mc-form-field__prefix,.mc-form-field__suffix{align-items:center;bottom:0;display:flex;flex-direction:row;justify-content:center;position:absolute;top:0;width:32px}.mc-form-field__prefix{left:0}.mc-form-field__suffix{right:0}.mc-form-field_has-cleaner .mc-input,.mc-form-field_has-stepper .mc-input,.mc-form-field_has-suffix .mc-input{padding-right:32px}.mc-form-field_has-prefix .mc-input{padding-left:32px}.mc-cleaner{cursor:pointer;display:flex;height:100%;width:32px}.mc-cleaner .mc-icon{align-items:center;display:flex;height:100%;justify-content:center;width:100%}.mc-form-field__cleaner .mc-cleaner,mc-stepper{bottom:0;position:absolute;right:0;top:0}mc-stepper{align-items:center;display:flex;flex-direction:column;justify-content:center;width:32px}mc-stepper .mc-stepper-step-down,mc-stepper .mc-stepper-step-up{cursor:pointer;text-align:center;width:32px}mc-stepper .mc-stepper-step-up{transform:scaleY(-1)}", ".mc-input{background:transparent;border:none;box-sizing:border-box;margin:0;min-height:30px;outline:none;padding:5px 16px;width:100%}.mc-input::-ms-clear,.mc-input::-ms-reveal{display:none;height:0;width:0}.mc-input::-webkit-search-cancel-button,.mc-input::-webkit-search-decoration,.mc-input::-webkit-search-results-button,.mc-input::-webkit-search-results-decoration{display:none}.mc-input{display:inline-block}input.mc-input[type=number]{-moz-appearance:textfield}input.mc-input[type=number]::-webkit-inner-spin-button,input.mc-input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}input.mc-input:invalid{box-shadow:unset}", ".mc-textarea{-webkit-appearance:none;background:transparent;border:none;box-sizing:border-box;display:inline-block;margin:0;outline:none;overflow:auto;padding:5px 16px;resize:none;vertical-align:bottom;width:100%}.mc-textarea:not(.mc-textarea-resizable){box-sizing:border-box;overflow-y:hidden}.mc-textarea.mc-textarea-resizable{min-height:50px;resize:vertical}.mc-textarea:invalid{box-shadow:unset}"]
            }] }
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
if (false) {
    /** @type {?} */
    McFormField.prototype.control;
    /** @type {?} */
    McFormField.prototype.stepper;
    /** @type {?} */
    McFormField.prototype.cleaner;
    /** @type {?} */
    McFormField.prototype.hint;
    /** @type {?} */
    McFormField.prototype.suffix;
    /** @type {?} */
    McFormField.prototype.prefix;
    /** @type {?} */
    McFormField.prototype.connectionContainerRef;
    /** @type {?} */
    McFormField.prototype.labelId;
    /** @type {?} */
    McFormField.prototype.hovered;
    /** @type {?} */
    McFormField.prototype.canCleanerClearByEsc;
    /** @type {?} */
    McFormField.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    McFormField.prototype._changeDetectorRef;
}
class McFormFieldWithoutBorders {
}
McFormFieldWithoutBorders.decorators = [
    { type: Directive, args: [{
                selector: 'mc-form-field[mcFormFieldWithoutBorders]',
                exportAs: 'mcFormFieldWithoutBorders',
                host: { class: 'mc-form-field_without-borders' }
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: form-field.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ptsecurity-mosaic-form-field.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McCleaner, McFormField, McFormFieldBase, McFormFieldControl, McFormFieldMixinBase, McFormFieldModule, McFormFieldWithoutBorders, McHint, McPrefix, McStepper, McSuffix, getMcFormFieldMissingControlError, getMcFormFieldYouCanNotUseCleanerInNumberInputError };
//# sourceMappingURL=ptsecurity-mosaic-form-field.js.map
