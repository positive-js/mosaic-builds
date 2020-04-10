/**
 * @fileoverview added by tsickle
 * Generated from: form-field.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { mixinColor } from '@ptsecurity/mosaic/core';
import { EMPTY, merge } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { McCleaner } from './cleaner';
import { McFormFieldControl } from './form-field-control';
import { getMcFormFieldMissingControlError, getMcFormFieldYouCanNotUseCleanerInNumberInputError } from './form-field-errors';
import { McHint } from './hint';
import { McPrefix } from './prefix';
import { McStepper } from './stepper';
import { McSuffix } from './suffix';
/** @type {?} */
let nextUniqueId = 0;
export class McFormFieldBase {
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
export const McFormFieldMixinBase = mixinColor(McFormFieldBase);
export class McFormField extends McFormFieldMixinBase {
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
        this.labelId = `mc-form-field-label-${nextUniqueId++}`;
        this.hovered = false;
        this.canCleanerClearByEsc = true;
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
}
McFormField.decorators = [
    { type: Component, args: [{
                selector: 'mc-form-field',
                exportAs: 'mcFormField',
                template: "<div class=\"mc-form-field__container\" (click)=\"onContainerClick($event)\">\n\n    <div class=\"mc-form-field__prefix\" *ngIf=\"hasPrefix\">\n        <ng-content select=\"[mcPrefix]\"></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__infix\">\n        <ng-content></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__suffix\" *ngIf=\"hasSuffix\">\n        <ng-content select=\"[mcSuffix]\"></ng-content>\n    </div>\n\n    <div class=\"mc-form-field__cleaner\"\n         *ngIf=\"canShowCleaner && !hasSuffix\"\n         (click)=\"clearValue($event)\">\n        <ng-content select=\"mc-cleaner\"></ng-content>\n    </div>\n\n    <ng-content *ngIf=\"canShowStepper\" select=\"mc-stepper\"></ng-content>\n</div>\n\n<div class=\"mc-form-field__hint\" *ngIf=\"hasHint\">\n    <ng-content select=\"mc-hint\"></ng-content>\n</div>\n",
                host: {
                    class: 'mc-form-field',
                    '[class.mc-form-field_invalid]': 'control.errorState',
                    '[class.mc-disabled]': 'control.disabled',
                    '[class.mc-form-field_has-prefix]': 'hasPrefix',
                    '[class.mc-form-field_has-suffix]': 'hasSuffix',
                    '[class.mc-form-field_has-cleaner]': 'canShowCleaner',
                    '[class.mc-form-field_has-stepper]': 'canShowStepper',
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
                styles: [".mc-form-field{position:relative;display:inline-block;width:100%;border-radius:3px}.mc-form-field:hover{z-index:1}.mc-form-field.mc-focused{z-index:2}.mc-form-field__hint{margin-top:4px}.mc-form-field__container{position:relative;border-radius:3px;border:1px solid transparent}.mc-form-field_without-borders .mc-form-field__container{border-color:transparent}.mc-form-field__prefix,.mc-form-field__suffix{position:absolute;top:0;bottom:0;width:32px;display:flex;flex-direction:row;justify-content:center;align-items:center}.mc-form-field__prefix{left:0}.mc-form-field__suffix{right:0}.mc-form-field_has-cleaner .mc-input,.mc-form-field_has-stepper .mc-input,.mc-form-field_has-suffix .mc-input{padding-right:32px}.mc-form-field_has-prefix .mc-input{padding-left:32px}.mc-cleaner{display:flex;width:32px;height:100%;cursor:pointer}.mc-cleaner .mc-icon{display:flex;align-items:center;justify-content:center;width:100%;height:100%}.mc-form-field__cleaner .mc-cleaner{position:absolute;top:0;bottom:0;right:0}mc-stepper{position:absolute;display:flex;flex-direction:column;justify-content:center;align-items:center;top:0;bottom:0;right:0;width:32px}mc-stepper .mc-stepper-step-down,mc-stepper .mc-stepper-step-up{cursor:pointer;width:32px;text-align:center}mc-stepper .mc-stepper-step-up{transform:scaleY(-1)}", ".mc-input{background:0 0;padding:5px 16px;margin:0;border:none;outline:0;box-sizing:border-box;width:100%;min-height:30px;display:inline-block}.mc-input::-ms-clear{display:none;width:0;height:0}.mc-input::-ms-reveal{display:none;width:0;height:0}.mc-input::-webkit-search-cancel-button,.mc-input::-webkit-search-decoration,.mc-input::-webkit-search-results-button,.mc-input::-webkit-search-results-decoration{display:none}input.mc-input[type=number]{-moz-appearance:textfield}input.mc-input[type=number]::-webkit-inner-spin-button,input.mc-input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}input.mc-input:invalid{box-shadow:unset}", ".mc-textarea{background:0 0;margin:0;border:none;outline:0;resize:none;overflow:auto;width:100%;box-sizing:border-box;padding:5px 16px;display:inline-block;-webkit-appearance:none;vertical-align:bottom}.mc-textarea:not(.mc-textarea-resizable){box-sizing:border-box;overflow-y:hidden}.mc-textarea.mc-textarea-resizable{resize:vertical;min-height:50px}.mc-textarea:invalid{box-shadow:unset}"]
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
export class McFormFieldWithoutBorders {
}
McFormFieldWithoutBorders.decorators = [
    { type: Directive, args: [{
                selector: 'mc-form-field[mcFormFieldWithoutBorders]',
                exportAs: 'mcFormFieldWithoutBorders',
                host: { class: 'mc-form-field_without-borders' }
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9mb3JtLWZpZWxkLyIsInNvdXJjZXMiOlsiZm9ybS1maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFJSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBMEIsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDN0UsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDMUQsT0FBTyxFQUNILGlDQUFpQyxFQUNqQyxtREFBbUQsRUFDdEQsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDOztJQUdoQyxZQUFZLEdBQUcsQ0FBQztBQUVwQixNQUFNLE9BQU8sZUFBZTs7Ozs7SUFFeEIsWUFBbUIsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDO0NBQ2pEOzs7SUFEZSxzQ0FBOEI7Ozs7QUFJ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LHlDQUE2Qzs7QUE0STdGLE1BQU0sT0FBTyx5QkFBeUI7OztZQUxyQyxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDBDQUEwQztnQkFDcEQsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLCtCQUErQixFQUFFO2FBQ25EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRVNDQVBFIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IENhbkNvbG9yLCBDYW5Db2xvckN0b3IsIG1peGluQ29sb3IgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBFTVBUWSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWNDbGVhbmVyIH0gZnJvbSAnLi9jbGVhbmVyJztcbmltcG9ydCB7IE1jRm9ybUZpZWxkQ29udHJvbCB9IGZyb20gJy4vZm9ybS1maWVsZC1jb250cm9sJztcbmltcG9ydCB7XG4gICAgZ2V0TWNGb3JtRmllbGRNaXNzaW5nQ29udHJvbEVycm9yLFxuICAgIGdldE1jRm9ybUZpZWxkWW91Q2FuTm90VXNlQ2xlYW5lckluTnVtYmVySW5wdXRFcnJvclxufSBmcm9tICcuL2Zvcm0tZmllbGQtZXJyb3JzJztcbmltcG9ydCB7IE1jSGludCB9IGZyb20gJy4vaGludCc7XG5pbXBvcnQgeyBNY1ByZWZpeCB9IGZyb20gJy4vcHJlZml4JztcbmltcG9ydCB7IE1jU3RlcHBlciB9IGZyb20gJy4vc3RlcHBlcic7XG5pbXBvcnQgeyBNY1N1ZmZpeCB9IGZyb20gJy4vc3VmZml4JztcblxuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxuZXhwb3J0IGNsYXNzIE1jRm9ybUZpZWxkQmFzZSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY0Zvcm1GaWVsZE1peGluQmFzZTogQ2FuQ29sb3JDdG9yICYgdHlwZW9mIE1jRm9ybUZpZWxkQmFzZSA9IG1peGluQ29sb3IoTWNGb3JtRmllbGRCYXNlKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1mb3JtLWZpZWxkJyxcbiAgICBleHBvcnRBczogJ21jRm9ybUZpZWxkJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2Zvcm0tZmllbGQuaHRtbCcsXG4gICAgLy8gTWNJbnB1dCBpcyBhIGRpcmVjdGl2ZSBhbmQgY2FuJ3QgaGF2ZSBzdHlsZXMsIHNvIHdlIG5lZWQgdG8gaW5jbHVkZSBpdHMgc3R5bGVzIGhlcmUuXG4gICAgLy8gVGhlIE1jSW5wdXQgc3R5bGVzIGFyZSBmYWlybHkgbWluaW1hbCBzbyBpdCBzaG91bGRuJ3QgYmUgYSBiaWcgZGVhbCBmb3IgcGVvcGxlIHdob1xuICAgIC8vIGFyZW4ndCB1c2luZyBNY0lucHV0LlxuICAgIHN0eWxlVXJsczogW1xuICAgICAgICAnZm9ybS1maWVsZC5zY3NzJyxcbiAgICAgICAgJy4uL2lucHV0L2lucHV0LnNjc3MnLFxuICAgICAgICAnLi4vdGV4dGFyZWEvdGV4dGFyZWEuc2NzcydcbiAgICBdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1mb3JtLWZpZWxkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1mb3JtLWZpZWxkX2ludmFsaWRdJzogJ2NvbnRyb2wuZXJyb3JTdGF0ZScsXG4gICAgICAgICdbY2xhc3MubWMtZGlzYWJsZWRdJzogJ2NvbnRyb2wuZGlzYWJsZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWZvcm0tZmllbGRfaGFzLXByZWZpeF0nOiAnaGFzUHJlZml4JyxcbiAgICAgICAgJ1tjbGFzcy5tYy1mb3JtLWZpZWxkX2hhcy1zdWZmaXhdJzogJ2hhc1N1ZmZpeCcsXG4gICAgICAgICdbY2xhc3MubWMtZm9ybS1maWVsZF9oYXMtY2xlYW5lcl0nOiAnY2FuU2hvd0NsZWFuZXInLFxuICAgICAgICAnW2NsYXNzLm1jLWZvcm0tZmllbGRfaGFzLXN0ZXBwZXJdJzogJ2NhblNob3dTdGVwcGVyJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1mb2N1c2VkXSc6ICdjb250cm9sLmZvY3VzZWQnLFxuICAgICAgICAnW2NsYXNzLm5nLXVudG91Y2hlZF0nOiAnc2hvdWxkRm9yd2FyZChcInVudG91Y2hlZFwiKScsXG4gICAgICAgICdbY2xhc3MubmctdG91Y2hlZF0nOiAnc2hvdWxkRm9yd2FyZChcInRvdWNoZWRcIiknLFxuICAgICAgICAnW2NsYXNzLm5nLXByaXN0aW5lXSc6ICdzaG91bGRGb3J3YXJkKFwicHJpc3RpbmVcIiknLFxuICAgICAgICAnW2NsYXNzLm5nLWRpcnR5XSc6ICdzaG91bGRGb3J3YXJkKFwiZGlydHlcIiknLFxuICAgICAgICAnW2NsYXNzLm5nLXZhbGlkXSc6ICdzaG91bGRGb3J3YXJkKFwidmFsaWRcIiknLFxuICAgICAgICAnW2NsYXNzLm5nLWludmFsaWRdJzogJ3Nob3VsZEZvcndhcmQoXCJpbnZhbGlkXCIpJyxcbiAgICAgICAgJ1tjbGFzcy5uZy1wZW5kaW5nXSc6ICdzaG91bGRGb3J3YXJkKFwicGVuZGluZ1wiKScsXG4gICAgICAgICcoa2V5ZG93biknOiAnb25LZXlEb3duKCRldmVudCknLFxuICAgICAgICAnKG1vdXNlZW50ZXIpJzogJ29uSG92ZXJDaGFuZ2VkKHRydWUpJyxcbiAgICAgICAgJyhtb3VzZWxlYXZlKSc6ICdvbkhvdmVyQ2hhbmdlZChmYWxzZSknXG4gICAgfSxcbiAgICBpbnB1dHM6IFsnY29sb3InXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuXG5leHBvcnQgY2xhc3MgTWNGb3JtRmllbGQgZXh0ZW5kcyBNY0Zvcm1GaWVsZE1peGluQmFzZSBpbXBsZW1lbnRzXG4gICAgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQWZ0ZXJWaWV3SW5pdCwgQ2FuQ29sb3Ige1xuXG4gICAgQENvbnRlbnRDaGlsZChNY0Zvcm1GaWVsZENvbnRyb2wsIHsgc3RhdGljOiBmYWxzZSB9KSBjb250cm9sOiBNY0Zvcm1GaWVsZENvbnRyb2w8YW55PjtcbiAgICBAQ29udGVudENoaWxkKE1jU3RlcHBlciwgeyBzdGF0aWM6IGZhbHNlIH0pIHN0ZXBwZXI6IE1jU3RlcHBlcjtcbiAgICBAQ29udGVudENoaWxkKE1jQ2xlYW5lciwgeyBzdGF0aWM6IGZhbHNlIH0pIGNsZWFuZXI6IE1jQ2xlYW5lciB8IG51bGw7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKE1jSGludCkgaGludDogUXVlcnlMaXN0PE1jSGludD47XG4gICAgQENvbnRlbnRDaGlsZHJlbihNY1N1ZmZpeCkgc3VmZml4OiBRdWVyeUxpc3Q8TWNTdWZmaXg+O1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNQcmVmaXgpIHByZWZpeDogUXVlcnlMaXN0PE1jUHJlZml4PjtcblxuICAgIEBWaWV3Q2hpbGQoJ2Nvbm5lY3Rpb25Db250YWluZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBjb25uZWN0aW9uQ29udGFpbmVyUmVmOiBFbGVtZW50UmVmO1xuXG4gICAgLy8gVW5pcXVlIGlkIGZvciB0aGUgaW50ZXJuYWwgZm9ybSBmaWVsZCBsYWJlbC5cbiAgICBsYWJlbElkID0gYG1jLWZvcm0tZmllbGQtbGFiZWwtJHtuZXh0VW5pcXVlSWQrK31gO1xuXG4gICAgaG92ZXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY2FuQ2xlYW5lckNsZWFyQnlFc2M6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgc3VwZXIoX2VsZW1lbnRSZWYpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgaWYgKCh0aGlzLmNvbnRyb2wgYXMgYW55KS5udW1iZXJJbnB1dCAmJiB0aGlzLmhhc0NsZWFuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYW5lciA9IG51bGw7XG4gICAgICAgICAgICB0aHJvdyBnZXRNY0Zvcm1GaWVsZFlvdUNhbk5vdFVzZUNsZWFuZXJJbk51bWJlcklucHV0RXJyb3IoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmFsaWRhdGVDb250cm9sQ2hpbGQoKTtcblxuICAgICAgICBpZiAodGhpcy5jb250cm9sLmNvbnRyb2xUeXBlKSB7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChgbWMtZm9ybS1maWVsZC10eXBlLSR7dGhpcy5jb250cm9sLmNvbnRyb2xUeXBlfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3Vic2NyaWJlIHRvIGNoYW5nZXMgaW4gdGhlIGNoaWxkIGNvbnRyb2wgc3RhdGUgaW4gb3JkZXIgdG8gdXBkYXRlIHRoZSBmb3JtIGZpZWxkIFVJLlxuICAgICAgICB0aGlzLmNvbnRyb2wuc3RhdGVDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShzdGFydFdpdGgoKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzU3RlcHBlcikge1xuICAgICAgICAgICAgdGhpcy5zdGVwcGVyLmNvbm5lY3RUbygodGhpcy5jb250cm9sIGFzIGFueSkubnVtYmVySW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUnVuIGNoYW5nZSBkZXRlY3Rpb24gaWYgdGhlIHZhbHVlIGNoYW5nZXMuXG4gICAgICAgIGNvbnN0IHZhbHVlQ2hhbmdlcyA9IHRoaXMuY29udHJvbC5uZ0NvbnRyb2wgJiYgdGhpcy5jb250cm9sLm5nQ29udHJvbC52YWx1ZUNoYW5nZXMgfHwgRU1QVFk7XG5cbiAgICAgICAgbWVyZ2UodmFsdWVDaGFuZ2VzKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKSk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgICAgICB0aGlzLnZhbGlkYXRlQ29udHJvbENoaWxkKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICAvLyBBdm9pZCBhbmltYXRpb25zIG9uIGxvYWQuXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBjbGVhclZhbHVlKCRldmVudCkge1xuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udHJvbCAmJiB0aGlzLmNvbnRyb2wubmdDb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wubmdDb250cm9sLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ29udGFpbmVyQ2xpY2soJGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2wub25Db250YWluZXJDbGljaykge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sLm9uQ29udGFpbmVyQ2xpY2soJGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgaWYgKHRoaXMuY2FuQ2xlYW5lckNsZWFyQnlFc2MgJiYgZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFICYmIHRoaXMuY29udHJvbC5mb2N1c2VkICYmIHRoaXMuaGFzQ2xlYW5lcikge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbCAmJiB0aGlzLmNvbnRyb2wubmdDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250cm9sLm5nQ29udHJvbC5yZXNldCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ib3ZlckNoYW5nZWQoaXNIb3ZlcmVkOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChpc0hvdmVyZWQgIT09IHRoaXMuaG92ZXJlZCkge1xuICAgICAgICAgICAgdGhpcy5ob3ZlcmVkID0gaXNIb3ZlcmVkO1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGFuIEVsZW1lbnRSZWYgZm9yIHRoZSBlbGVtZW50IHRoYXQgYSBvdmVybGF5IGF0dGFjaGVkIHRvIHRoZSBmb3JtLWZpZWxkIHNob3VsZCBiZVxuICAgICAqIHBvc2l0aW9uZWQgcmVsYXRpdmUgdG8uXG4gICAgICovXG4gICAgZ2V0Q29ubmVjdGVkT3ZlcmxheU9yaWdpbigpOiBFbGVtZW50UmVmIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbkNvbnRhaW5lclJlZiB8fCB0aGlzLl9lbGVtZW50UmVmO1xuICAgIH1cblxuICAgIC8qKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBjbGFzcyBmcm9tIHRoZSBOZ0NvbnRyb2wgc2hvdWxkIGJlIGZvcndhcmRlZCB0byB0aGUgaG9zdCBlbGVtZW50LiAqL1xuICAgIHNob3VsZEZvcndhcmQocHJvcDoga2V5b2YgTmdDb250cm9sKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IG5nQ29udHJvbCA9IHRoaXMuY29udHJvbCA/IHRoaXMuY29udHJvbC5uZ0NvbnRyb2wgOiBudWxsO1xuXG4gICAgICAgIHJldHVybiBuZ0NvbnRyb2wgJiYgbmdDb250cm9sW3Byb3BdO1xuICAgIH1cblxuICAgIC8qKiBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIGZvcm0gZmllbGQncyBjb250cm9sIGlzIG1pc3NpbmcuICovXG4gICAgcHJvdGVjdGVkIHZhbGlkYXRlQ29udHJvbENoaWxkKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udHJvbCkge1xuICAgICAgICAgICAgdGhyb3cgZ2V0TWNGb3JtRmllbGRNaXNzaW5nQ29udHJvbEVycm9yKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgaGFzSGludCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGludCAmJiB0aGlzLmhpbnQubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBnZXQgaGFzU3VmZml4KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWZmaXggJiYgdGhpcy5zdWZmaXgubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBnZXQgaGFzUHJlZml4KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmVmaXggJiYgdGhpcy5wcmVmaXgubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBnZXQgaGFzQ2xlYW5lcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5jbGVhbmVyO1xuICAgIH1cblxuICAgIGdldCBoYXNTdGVwcGVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLnN0ZXBwZXI7XG4gICAgfVxuXG4gICAgZ2V0IGNhblNob3dDbGVhbmVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNDbGVhbmVyICYmXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wgJiZcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5uZ0NvbnRyb2xcbiAgICAgICAgICAgICAgICA/IHRoaXMuY29udHJvbC5uZ0NvbnRyb2wudmFsdWUgJiYgIXRoaXMuY29udHJvbC5kaXNhYmxlZFxuICAgICAgICAgICAgICAgIDogZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sICYmIHRoaXMuY29udHJvbC5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBnZXQgY2FuU2hvd1N0ZXBwZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2wgJiYgIXRoaXMuZGlzYWJsZWQgJiYgKHRoaXMuY29udHJvbC5mb2N1c2VkIHx8IHRoaXMuaG92ZXJlZCk7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLWZvcm0tZmllbGRbbWNGb3JtRmllbGRXaXRob3V0Qm9yZGVyc10nLFxuICAgIGV4cG9ydEFzOiAnbWNGb3JtRmllbGRXaXRob3V0Qm9yZGVycycsXG4gICAgaG9zdDogeyBjbGFzczogJ21jLWZvcm0tZmllbGRfd2l0aG91dC1ib3JkZXJzJyB9XG59KVxuZXhwb3J0IGNsYXNzIE1jRm9ybUZpZWxkV2l0aG91dEJvcmRlcnMge31cbiJdfQ==