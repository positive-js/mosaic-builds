/**
 * @fileoverview added by tsickle
 * Generated from: form-field.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        this.$unsubscribe = new Subject();
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
        var _a;
        return this.hasStepper &&
            !this.disabled &&
            (((_a = this.control) === null || _a === void 0 ? void 0 : _a.focused) || this.hovered);
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
            .pipe(takeUntil(this.$unsubscribe))
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
     * @return {?}
     */
    ngOnDestroy() {
        this.$unsubscribe.next();
        this.$unsubscribe.complete();
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
                styles: [".mc-form-field{border-radius:var(--mc-form-field-size-border-radius,3px);display:inline-block;position:relative;width:100%}.mc-form-field:hover{z-index:1}.mc-form-field.mc-focused{z-index:2}.mc-hint{display:block}.mc-form-field__hint>.mc-hint{margin-top:var(--mc-form-field-hint-size-margin-top,4px)}.mc-form-field__container{border:var(--mc-form-field-size-border-width,1px) solid transparent;border-radius:var(--mc-form-field-size-border-radius,3px);position:relative}.mc-form-field_without-borders .mc-form-field__container{border-color:transparent}.mc-form-field__prefix,.mc-form-field__suffix{align-items:center;bottom:0;display:flex;flex-direction:row;justify-content:center;position:absolute;top:0;width:32px}.mc-form-field__prefix{left:0}.mc-form-field__suffix{right:0}.mc-form-field_has-cleaner .mc-input,.mc-form-field_has-stepper .mc-input,.mc-form-field_has-suffix .mc-input{padding-right:var(--mc-form-field-size-button-width,32px)}.mc-form-field_has-prefix .mc-input{padding-left:var(--mc-form-field-size-button-width,32px)}.mc-cleaner{cursor:pointer;display:flex;height:100%;width:var(--mc-form-field-size-button-width,32px)}.mc-cleaner .mc-icon{align-items:center;display:flex;height:100%;justify-content:center;width:100%}.mc-form-field__cleaner .mc-cleaner,mc-stepper{bottom:0;position:absolute;right:0;top:0}mc-stepper{align-items:center;display:flex;flex-direction:column;justify-content:center;width:var(--mc-form-field-size-button-width,32px)}mc-stepper .mc-stepper-step-down,mc-stepper .mc-stepper-step-up{cursor:pointer;text-align:center;width:var(--mc-form-field-size-button-width,32px)}mc-stepper .mc-stepper-step-up{transform:scaleY(-1)}", ".mc-input{background:transparent;border:none;box-sizing:border-box;margin:0;min-height:var(--mc-input-size-min-height,30px);outline:none;padding:0;padding:var(--mc-input-size-padding,5px 16px);width:var(--mc-input-size-width,100%)}.mc-input::-ms-clear,.mc-input::-ms-reveal{display:none;height:0;width:0}.mc-input::-webkit-search-cancel-button,.mc-input::-webkit-search-decoration,.mc-input::-webkit-search-results-button,.mc-input::-webkit-search-results-decoration{display:none}.mc-input{display:inline-block}input.mc-input[type=number]{-moz-appearance:textfield}input.mc-input[type=number]::-webkit-inner-spin-button,input.mc-input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}input.mc-input:invalid{box-shadow:unset}", ".mc-textarea{-webkit-appearance:none;background:transparent;border:none;box-sizing:border-box;display:inline-block;margin:0;outline:none;overflow:auto;padding:var(--mc-textarea-size-padding,5px 16px);resize:none;vertical-align:bottom;width:100%}.mc-textarea:not(.mc-textarea-resizable){box-sizing:border-box;overflow-y:hidden}.mc-textarea.mc-textarea-resizable{min-height:var(--mc-textarea-size-min-height,50px);resize:vertical}.mc-textarea:invalid{box-shadow:unset}"]
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
    /**
     * @type {?}
     * @private
     */
    McFormField.prototype.$unsubscribe;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL2Zvcm0tZmllbGQvIiwic291cmNlcyI6WyJmb3JtLWZpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUlILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFFVixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUEwQixVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFDSCxpQ0FBaUMsRUFDakMsbURBQW1ELEVBQ3RELE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNoQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7SUFHaEMsWUFBWSxHQUFHLENBQUM7QUFFcEIsTUFBTSxPQUFPLGVBQWU7Ozs7O0lBRXhCLFlBQW1CLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lB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QUN4QixlQUFlLFNBQUMsUUFBUTtxQ0FFeEIsU0FBUyxTQUFDLHFCQUFxQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7OztJQVJsRCw4QkFBc0Y7O0lBQ3RGLDhCQUErRDs7SUFDL0QsOEJBQXNFOztJQUV0RSwyQkFBaUQ7O0lBQ2pELDZCQUF1RDs7SUFDdkQsNkJBQXVEOztJQUV2RCw2Q0FBdUY7O0lBR3ZGLDhCQUFrRDs7SUFFbEQsOEJBQXlCOztJQUV6QiwyQ0FBcUM7Ozs7O0lBRXJDLG1DQUEyQzs7SUF5Qy9CLGtDQUE4Qjs7Ozs7SUFBRSx5Q0FBNkM7O0FBZ0g3RixNQUFNLE9BQU8seUJBQXlCOzs7WUFMckMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwwQ0FBMEM7Z0JBQ3BELFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSwrQkFBK0IsRUFBRTthQUNuRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgT25EZXN0cm95LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBFU0NBUEUgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgQ2FuQ29sb3IsIENhbkNvbG9yQ3RvciwgbWl4aW5Db2xvciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IEVNUFRZLCBtZXJnZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1jQ2xlYW5lciB9IGZyb20gJy4vY2xlYW5lcic7XG5pbXBvcnQgeyBNY0Zvcm1GaWVsZENvbnRyb2wgfSBmcm9tICcuL2Zvcm0tZmllbGQtY29udHJvbCc7XG5pbXBvcnQge1xuICAgIGdldE1jRm9ybUZpZWxkTWlzc2luZ0NvbnRyb2xFcnJvcixcbiAgICBnZXRNY0Zvcm1GaWVsZFlvdUNhbk5vdFVzZUNsZWFuZXJJbk51bWJlcklucHV0RXJyb3Jcbn0gZnJvbSAnLi9mb3JtLWZpZWxkLWVycm9ycyc7XG5pbXBvcnQgeyBNY0hpbnQgfSBmcm9tICcuL2hpbnQnO1xuaW1wb3J0IHsgTWNQcmVmaXggfSBmcm9tICcuL3ByZWZpeCc7XG5pbXBvcnQgeyBNY1N0ZXBwZXIgfSBmcm9tICcuL3N0ZXBwZXInO1xuaW1wb3J0IHsgTWNTdWZmaXggfSBmcm9tICcuL3N1ZmZpeCc7XG5cblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBNY0Zvcm1GaWVsZEJhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNGb3JtRmllbGRNaXhpbkJhc2U6IENhbkNvbG9yQ3RvciAmIHR5cGVvZiBNY0Zvcm1GaWVsZEJhc2UgPSBtaXhpbkNvbG9yKE1jRm9ybUZpZWxkQmFzZSk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtZm9ybS1maWVsZCcsXG4gICAgZXhwb3J0QXM6ICdtY0Zvcm1GaWVsZCcsXG4gICAgdGVtcGxhdGVVcmw6ICdmb3JtLWZpZWxkLmh0bWwnLFxuICAgIC8vIE1jSW5wdXQgaXMgYSBkaXJlY3RpdmUgYW5kIGNhbid0IGhhdmUgc3R5bGVzLCBzbyB3ZSBuZWVkIHRvIGluY2x1ZGUgaXRzIHN0eWxlcyBoZXJlLlxuICAgIC8vIFRoZSBNY0lucHV0IHN0eWxlcyBhcmUgZmFpcmx5IG1pbmltYWwgc28gaXQgc2hvdWxkbid0IGJlIGEgYmlnIGRlYWwgZm9yIHBlb3BsZSB3aG9cbiAgICAvLyBhcmVuJ3QgdXNpbmcgTWNJbnB1dC5cbiAgICBzdHlsZVVybHM6IFtcbiAgICAgICAgJ2Zvcm0tZmllbGQuc2NzcycsXG4gICAgICAgICcuLi9pbnB1dC9pbnB1dC5zY3NzJyxcbiAgICAgICAgJy4uL3RleHRhcmVhL3RleHRhcmVhLnNjc3MnXG4gICAgXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtZm9ybS1maWVsZCcsXG4gICAgICAgICdbY2xhc3MubWMtZm9ybS1maWVsZF9pbnZhbGlkXSc6ICdjb250cm9sLmVycm9yU3RhdGUnLFxuICAgICAgICAnW2NsYXNzLm1jLWZvcm0tZmllbGRfaGFzLXByZWZpeF0nOiAnaGFzUHJlZml4JyxcbiAgICAgICAgJ1tjbGFzcy5tYy1mb3JtLWZpZWxkX2hhcy1zdWZmaXhdJzogJ2hhc1N1ZmZpeCcsXG4gICAgICAgICdbY2xhc3MubWMtZm9ybS1maWVsZF9oYXMtY2xlYW5lcl0nOiAnY2FuU2hvd0NsZWFuZXInLFxuICAgICAgICAnW2NsYXNzLm1jLWZvcm0tZmllbGRfaGFzLXN0ZXBwZXJdJzogJ2NhblNob3dTdGVwcGVyJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnY29udHJvbC5kaXNhYmxlZCcsXG4gICAgICAgICdbY2xhc3MubWMtZm9jdXNlZF0nOiAnY29udHJvbC5mb2N1c2VkJyxcbiAgICAgICAgJ1tjbGFzcy5uZy11bnRvdWNoZWRdJzogJ3Nob3VsZEZvcndhcmQoXCJ1bnRvdWNoZWRcIiknLFxuICAgICAgICAnW2NsYXNzLm5nLXRvdWNoZWRdJzogJ3Nob3VsZEZvcndhcmQoXCJ0b3VjaGVkXCIpJyxcbiAgICAgICAgJ1tjbGFzcy5uZy1wcmlzdGluZV0nOiAnc2hvdWxkRm9yd2FyZChcInByaXN0aW5lXCIpJyxcbiAgICAgICAgJ1tjbGFzcy5uZy1kaXJ0eV0nOiAnc2hvdWxkRm9yd2FyZChcImRpcnR5XCIpJyxcbiAgICAgICAgJ1tjbGFzcy5uZy12YWxpZF0nOiAnc2hvdWxkRm9yd2FyZChcInZhbGlkXCIpJyxcbiAgICAgICAgJ1tjbGFzcy5uZy1pbnZhbGlkXSc6ICdzaG91bGRGb3J3YXJkKFwiaW52YWxpZFwiKScsXG4gICAgICAgICdbY2xhc3MubmctcGVuZGluZ10nOiAnc2hvdWxkRm9yd2FyZChcInBlbmRpbmdcIiknLFxuICAgICAgICAnKGtleWRvd24pJzogJ29uS2V5RG93bigkZXZlbnQpJyxcbiAgICAgICAgJyhtb3VzZWVudGVyKSc6ICdvbkhvdmVyQ2hhbmdlZCh0cnVlKScsXG4gICAgICAgICcobW91c2VsZWF2ZSknOiAnb25Ib3ZlckNoYW5nZWQoZmFsc2UpJ1xuICAgIH0sXG4gICAgaW5wdXRzOiBbJ2NvbG9yJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY0Zvcm1GaWVsZCBleHRlbmRzIE1jRm9ybUZpZWxkTWl4aW5CYXNlIGltcGxlbWVudHNcbiAgICBBZnRlckNvbnRlbnRJbml0LCBBZnRlckNvbnRlbnRDaGVja2VkLCBBZnRlclZpZXdJbml0LCBDYW5Db2xvciwgT25EZXN0cm95IHtcblxuICAgIEBDb250ZW50Q2hpbGQoTWNGb3JtRmllbGRDb250cm9sLCB7IHN0YXRpYzogZmFsc2UgfSkgY29udHJvbDogTWNGb3JtRmllbGRDb250cm9sPGFueT47XG4gICAgQENvbnRlbnRDaGlsZChNY1N0ZXBwZXIsIHsgc3RhdGljOiBmYWxzZSB9KSBzdGVwcGVyOiBNY1N0ZXBwZXI7XG4gICAgQENvbnRlbnRDaGlsZChNY0NsZWFuZXIsIHsgc3RhdGljOiBmYWxzZSB9KSBjbGVhbmVyOiBNY0NsZWFuZXIgfCBudWxsO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY0hpbnQpIGhpbnQ6IFF1ZXJ5TGlzdDxNY0hpbnQ+O1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNTdWZmaXgpIHN1ZmZpeDogUXVlcnlMaXN0PE1jU3VmZml4PjtcbiAgICBAQ29udGVudENoaWxkcmVuKE1jUHJlZml4KSBwcmVmaXg6IFF1ZXJ5TGlzdDxNY1ByZWZpeD47XG5cbiAgICBAVmlld0NoaWxkKCdjb25uZWN0aW9uQ29udGFpbmVyJywgeyBzdGF0aWM6IHRydWUgfSkgY29ubmVjdGlvbkNvbnRhaW5lclJlZjogRWxlbWVudFJlZjtcblxuICAgIC8vIFVuaXF1ZSBpZCBmb3IgdGhlIGludGVybmFsIGZvcm0gZmllbGQgbGFiZWwuXG4gICAgbGFiZWxJZCA9IGBtYy1mb3JtLWZpZWxkLWxhYmVsLSR7bmV4dFVuaXF1ZUlkKyt9YDtcblxuICAgIGhvdmVyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNhbkNsZWFuZXJDbGVhckJ5RXNjOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIHByaXZhdGUgJHVuc3Vic2NyaWJlID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGdldCBoYXNIaW50KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oaW50ICYmIHRoaXMuaGludC5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGdldCBoYXNTdWZmaXgoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1ZmZpeCAmJiB0aGlzLnN1ZmZpeC5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGdldCBoYXNQcmVmaXgoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnByZWZpeCAmJiB0aGlzLnByZWZpeC5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGdldCBoYXNDbGVhbmVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLmNsZWFuZXI7XG4gICAgfVxuXG4gICAgZ2V0IGhhc1N0ZXBwZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuc3RlcHBlcjtcbiAgICB9XG5cbiAgICBnZXQgY2FuU2hvd0NsZWFuZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0NsZWFuZXIgJiZcbiAgICAgICAgdGhpcy5jb250cm9sICYmXG4gICAgICAgIHRoaXMuY29udHJvbC5uZ0NvbnRyb2xcbiAgICAgICAgICAgID8gdGhpcy5jb250cm9sLm5nQ29udHJvbC52YWx1ZSAmJiAhdGhpcy5jb250cm9sLmRpc2FibGVkXG4gICAgICAgICAgICA6IGZhbHNlO1xuICAgIH1cblxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbCAmJiB0aGlzLmNvbnRyb2wuZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgZ2V0IGNhblNob3dTdGVwcGVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNTdGVwcGVyICYmXG4gICAgICAgICAgICAhdGhpcy5kaXNhYmxlZCAmJlxuICAgICAgICAgICAgKHRoaXMuY29udHJvbD8uZm9jdXNlZCB8fCB0aGlzLmhvdmVyZWQpO1xuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHN1cGVyKF9lbGVtZW50UmVmKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIGlmICgodGhpcy5jb250cm9sIGFzIGFueSkubnVtYmVySW5wdXQgJiYgdGhpcy5oYXNDbGVhbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFuZXIgPSBudWxsO1xuICAgICAgICAgICAgdGhyb3cgZ2V0TWNGb3JtRmllbGRZb3VDYW5Ob3RVc2VDbGVhbmVySW5OdW1iZXJJbnB1dEVycm9yKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbGlkYXRlQ29udHJvbENoaWxkKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udHJvbC5jb250cm9sVHlwZSkge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoYG1jLWZvcm0tZmllbGQtdHlwZS0ke3RoaXMuY29udHJvbC5jb250cm9sVHlwZX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN1YnNjcmliZSB0byBjaGFuZ2VzIGluIHRoZSBjaGlsZCBjb250cm9sIHN0YXRlIGluIG9yZGVyIHRvIHVwZGF0ZSB0aGUgZm9ybSBmaWVsZCBVSS5cbiAgICAgICAgdGhpcy5jb250cm9sLnN0YXRlQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoc3RhcnRXaXRoKCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLmhhc1N0ZXBwZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RlcHBlci5jb25uZWN0VG8oKHRoaXMuY29udHJvbCBhcyBhbnkpLm51bWJlcklucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJ1biBjaGFuZ2UgZGV0ZWN0aW9uIGlmIHRoZSB2YWx1ZSBjaGFuZ2VzLlxuICAgICAgICBjb25zdCB2YWx1ZUNoYW5nZXMgPSB0aGlzLmNvbnRyb2wubmdDb250cm9sICYmIHRoaXMuY29udHJvbC5uZ0NvbnRyb2wudmFsdWVDaGFuZ2VzIHx8IEVNUFRZO1xuXG4gICAgICAgIG1lcmdlKHZhbHVlQ2hhbmdlcylcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLiR1bnN1YnNjcmliZSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUNvbnRyb2xDaGlsZCgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgLy8gQXZvaWQgYW5pbWF0aW9ucyBvbiBsb2FkLlxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgY2xlYXJWYWx1ZSgkZXZlbnQpIHtcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2wgJiYgdGhpcy5jb250cm9sLm5nQ29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sLm5nQ29udHJvbC5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5jb250cm9sLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNvbnRhaW5lckNsaWNrKCRldmVudCkge1xuICAgICAgICBpZiAodGhpcy5jb250cm9sLm9uQ29udGFpbmVyQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5vbkNvbnRhaW5lckNsaWNrKCRldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgICAgIGlmICh0aGlzLmNhbkNsZWFuZXJDbGVhckJ5RXNjICYmIGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSAmJiB0aGlzLmNvbnRyb2wuZm9jdXNlZCAmJiB0aGlzLmhhc0NsZWFuZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2wgJiYgdGhpcy5jb250cm9sLm5nQ29udHJvbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbC5uZ0NvbnRyb2wucmVzZXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSG92ZXJDaGFuZ2VkKGlzSG92ZXJlZDogYm9vbGVhbikge1xuICAgICAgICBpZiAoaXNIb3ZlcmVkICE9PSB0aGlzLmhvdmVyZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaG92ZXJlZCA9IGlzSG92ZXJlZDtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhbiBFbGVtZW50UmVmIGZvciB0aGUgZWxlbWVudCB0aGF0IGEgb3ZlcmxheSBhdHRhY2hlZCB0byB0aGUgZm9ybS1maWVsZCBzaG91bGQgYmVcbiAgICAgKiBwb3NpdGlvbmVkIHJlbGF0aXZlIHRvLlxuICAgICAqL1xuICAgIGdldENvbm5lY3RlZE92ZXJsYXlPcmlnaW4oKTogRWxlbWVudFJlZiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb25Db250YWluZXJSZWYgfHwgdGhpcy5fZWxlbWVudFJlZjtcbiAgICB9XG5cbiAgICAvKiogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgY2xhc3MgZnJvbSB0aGUgTmdDb250cm9sIHNob3VsZCBiZSBmb3J3YXJkZWQgdG8gdGhlIGhvc3QgZWxlbWVudC4gKi9cbiAgICBzaG91bGRGb3J3YXJkKHByb3A6IGtleW9mIE5nQ29udHJvbCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBuZ0NvbnRyb2wgPSB0aGlzLmNvbnRyb2wgPyB0aGlzLmNvbnRyb2wubmdDb250cm9sIDogbnVsbDtcblxuICAgICAgICByZXR1cm4gbmdDb250cm9sICYmIG5nQ29udHJvbFtwcm9wXTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy4kdW5zdWJzY3JpYmUubmV4dCgpO1xuICAgICAgICB0aGlzLiR1bnN1YnNjcmliZS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8qKiBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIGZvcm0gZmllbGQncyBjb250cm9sIGlzIG1pc3NpbmcuICovXG4gICAgcHJvdGVjdGVkIHZhbGlkYXRlQ29udHJvbENoaWxkKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udHJvbCkge1xuICAgICAgICAgICAgdGhyb3cgZ2V0TWNGb3JtRmllbGRNaXNzaW5nQ29udHJvbEVycm9yKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtZm9ybS1maWVsZFttY0Zvcm1GaWVsZFdpdGhvdXRCb3JkZXJzXScsXG4gICAgZXhwb3J0QXM6ICdtY0Zvcm1GaWVsZFdpdGhvdXRCb3JkZXJzJyxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtZm9ybS1maWVsZF93aXRob3V0LWJvcmRlcnMnIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNGb3JtRmllbGRXaXRob3V0Qm9yZGVycyB7fVxuIl19