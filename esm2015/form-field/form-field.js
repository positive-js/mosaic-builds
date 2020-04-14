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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9mb3JtLWZpZWxkLyIsInNvdXJjZXMiOlsiZm9ybS1maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFJSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBMEIsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDN0UsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDMUQsT0FBTyxFQUNILGlDQUFpQyxFQUNqQyxtREFBbUQsRUFDdEQsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDOztJQUdoQyxZQUFZLEdBQUcsQ0FBQztBQUVwQixNQUFNLE9BQU8sZUFBZTs7Ozs7SUFFeEIsWUFBbUIsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDO0NBQ2pEOzs7SUFEZSxzQ0FBOEI7Ozs7QUFJOUMsTUFBTSxPQUFPLG9CQUFvQixHQUEwQyxVQUFVLENBQUMsZUFBZSxDQUFDO0FBdUN0RyxNQUFNLE9BQU8sV0FBWSxTQUFRLG9CQUFvQjs7Ozs7O0lBeURqRCxZQUFtQixXQUF1QixFQUFVLGtCQUFxQztRQUNyRixLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFESixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7O1FBM0N6RixZQUFPLEdBQUcsdUJBQXVCLFlBQVksRUFBRSxFQUFFLENBQUM7UUFFbEQsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUV6Qix5QkFBb0IsR0FBWSxJQUFJLENBQUM7SUF5Q3JDLENBQUM7Ozs7SUF2Q0QsSUFBSSxPQUFPO1FBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUM3QyxDQUFDOzs7O0lBRUQsSUFBSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7O0lBRUQsSUFBSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7O0lBRUQsSUFBSSxVQUFVO1FBQ1YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUMxQixDQUFDOzs7O0lBRUQsSUFBSSxVQUFVO1FBQ1YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUMxQixDQUFDOzs7O0lBRUQsSUFBSSxjQUFjO1FBQ2QsT0FBTyxJQUFJLENBQUMsVUFBVTtZQUN0QixJQUFJLENBQUMsT0FBTztZQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUztZQUNsQixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRO1lBQ3hELENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDaEIsQ0FBQzs7OztJQUVELElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztJQUNqRCxDQUFDOzs7O0lBRUQsSUFBSSxjQUFjO1FBQ2QsT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNwRixDQUFDOzs7O0lBT0Qsa0JBQWtCO1FBQ2QsSUFBSSxDQUFDLG1CQUFBLElBQUksQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3RELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLE1BQU0sbURBQW1ELEVBQUUsQ0FBQztTQUMvRDtRQUVELElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBRTVCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQ2xHO1FBRUQsd0ZBQXdGO1FBQ3hGLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWTthQUNwQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDakIsU0FBUzs7O1FBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzNDLENBQUMsRUFBQyxDQUFDO1FBRVAsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDN0Q7OztjQUdLLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLElBQUksS0FBSztRQUUzRixLQUFLLENBQUMsWUFBWSxDQUFDO2FBQ2QsU0FBUzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxFQUFDLENBQUM7SUFDakUsQ0FBQzs7OztJQUVELHFCQUFxQjtRQUNqQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUNoQyxDQUFDOzs7O0lBRUQsZUFBZTtRQUNYLDRCQUE0QjtRQUM1QixJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDNUMsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsTUFBTTtRQUNiLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV6QixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN4QjtJQUNMLENBQUM7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsTUFBTTtRQUNuQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN6QztJQUNMLENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLEtBQW9CO1FBQzFCLHVDQUF1QztRQUN2QyxJQUFJLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2xHLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtnQkFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDbEM7WUFFRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDOzs7OztJQUVELGNBQWMsQ0FBQyxTQUFrQjtRQUM3QixJQUFJLFNBQVMsS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUMxQztJQUNMLENBQUM7Ozs7OztJQU1ELHlCQUF5QjtRQUNyQixPQUFPLElBQUksQ0FBQyxzQkFBc0IsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzNELENBQUM7Ozs7OztJQUdELGFBQWEsQ0FBQyxJQUFxQjs7Y0FDekIsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJO1FBRTlELE9BQU8sU0FBUyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs7Ozs7SUFHUyxvQkFBb0I7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixNQUFNLGlDQUFpQyxFQUFFLENBQUM7U0FDN0M7SUFDTCxDQUFDOzs7WUE5TEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUUsYUFBYTtnQkFDdkIsMDFCQUE4QjtnQkFTOUIsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxlQUFlO29CQUN0QiwrQkFBK0IsRUFBRSxvQkFBb0I7b0JBQ3JELGtDQUFrQyxFQUFFLFdBQVc7b0JBQy9DLGtDQUFrQyxFQUFFLFdBQVc7b0JBQy9DLG1DQUFtQyxFQUFFLGdCQUFnQjtvQkFDckQsbUNBQW1DLEVBQUUsZ0JBQWdCO29CQUNyRCxxQkFBcUIsRUFBRSxrQkFBa0I7b0JBQ3pDLG9CQUFvQixFQUFFLGlCQUFpQjtvQkFDdkMsc0JBQXNCLEVBQUUsNEJBQTRCO29CQUNwRCxvQkFBb0IsRUFBRSwwQkFBMEI7b0JBQ2hELHFCQUFxQixFQUFFLDJCQUEyQjtvQkFDbEQsa0JBQWtCLEVBQUUsd0JBQXdCO29CQUM1QyxrQkFBa0IsRUFBRSx3QkFBd0I7b0JBQzVDLG9CQUFvQixFQUFFLDBCQUEwQjtvQkFDaEQsb0JBQW9CLEVBQUUsMEJBQTBCO29CQUNoRCxXQUFXLEVBQUUsbUJBQW1CO29CQUNoQyxjQUFjLEVBQUUsc0JBQXNCO29CQUN0QyxjQUFjLEVBQUUsdUJBQXVCO2lCQUMxQztnQkFDRCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7Ozs7WUFwRUcsVUFBVTtZQUxWLGlCQUFpQjs7O3NCQThFaEIsWUFBWSxTQUFDLGtCQUFrQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtzQkFDbEQsWUFBWSxTQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7c0JBQ3pDLFlBQVksU0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO21CQUV6QyxlQUFlLFNBQUMsTUFBTTtxQkFDdEIsZUFBZSxTQUFDLFFBQVE7cUJBQ3hCLGVBQWUsU0FBQyxRQUFRO3FDQUV4QixTQUFTLFNBQUMscUJBQXFCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzs7O0lBUmxELDhCQUFzRjs7SUFDdEYsOEJBQStEOztJQUMvRCw4QkFBc0U7O0lBRXRFLDJCQUFpRDs7SUFDakQsNkJBQXVEOztJQUN2RCw2QkFBdUQ7O0lBRXZELDZDQUF1Rjs7SUFHdkYsOEJBQWtEOztJQUVsRCw4QkFBeUI7O0lBRXpCLDJDQUFxQzs7SUF1Q3pCLGtDQUE4Qjs7Ozs7SUFBRSx5Q0FBNkM7O0FBd0c3RixNQUFNLE9BQU8seUJBQXlCOzs7WUFMckMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwwQ0FBMEM7Z0JBQ3BELFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSwrQkFBK0IsRUFBRTthQUNuRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEVTQ0FQRSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBDYW5Db2xvciwgQ2FuQ29sb3JDdG9yLCBtaXhpbkNvbG9yIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgRU1QVFksIG1lcmdlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1jQ2xlYW5lciB9IGZyb20gJy4vY2xlYW5lcic7XG5pbXBvcnQgeyBNY0Zvcm1GaWVsZENvbnRyb2wgfSBmcm9tICcuL2Zvcm0tZmllbGQtY29udHJvbCc7XG5pbXBvcnQge1xuICAgIGdldE1jRm9ybUZpZWxkTWlzc2luZ0NvbnRyb2xFcnJvcixcbiAgICBnZXRNY0Zvcm1GaWVsZFlvdUNhbk5vdFVzZUNsZWFuZXJJbk51bWJlcklucHV0RXJyb3Jcbn0gZnJvbSAnLi9mb3JtLWZpZWxkLWVycm9ycyc7XG5pbXBvcnQgeyBNY0hpbnQgfSBmcm9tICcuL2hpbnQnO1xuaW1wb3J0IHsgTWNQcmVmaXggfSBmcm9tICcuL3ByZWZpeCc7XG5pbXBvcnQgeyBNY1N0ZXBwZXIgfSBmcm9tICcuL3N0ZXBwZXInO1xuaW1wb3J0IHsgTWNTdWZmaXggfSBmcm9tICcuL3N1ZmZpeCc7XG5cblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBNY0Zvcm1GaWVsZEJhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNGb3JtRmllbGRNaXhpbkJhc2U6IENhbkNvbG9yQ3RvciAmIHR5cGVvZiBNY0Zvcm1GaWVsZEJhc2UgPSBtaXhpbkNvbG9yKE1jRm9ybUZpZWxkQmFzZSk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtZm9ybS1maWVsZCcsXG4gICAgZXhwb3J0QXM6ICdtY0Zvcm1GaWVsZCcsXG4gICAgdGVtcGxhdGVVcmw6ICdmb3JtLWZpZWxkLmh0bWwnLFxuICAgIC8vIE1jSW5wdXQgaXMgYSBkaXJlY3RpdmUgYW5kIGNhbid0IGhhdmUgc3R5bGVzLCBzbyB3ZSBuZWVkIHRvIGluY2x1ZGUgaXRzIHN0eWxlcyBoZXJlLlxuICAgIC8vIFRoZSBNY0lucHV0IHN0eWxlcyBhcmUgZmFpcmx5IG1pbmltYWwgc28gaXQgc2hvdWxkbid0IGJlIGEgYmlnIGRlYWwgZm9yIHBlb3BsZSB3aG9cbiAgICAvLyBhcmVuJ3QgdXNpbmcgTWNJbnB1dC5cbiAgICBzdHlsZVVybHM6IFtcbiAgICAgICAgJ2Zvcm0tZmllbGQuc2NzcycsXG4gICAgICAgICcuLi9pbnB1dC9pbnB1dC5zY3NzJyxcbiAgICAgICAgJy4uL3RleHRhcmVhL3RleHRhcmVhLnNjc3MnXG4gICAgXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtZm9ybS1maWVsZCcsXG4gICAgICAgICdbY2xhc3MubWMtZm9ybS1maWVsZF9pbnZhbGlkXSc6ICdjb250cm9sLmVycm9yU3RhdGUnLFxuICAgICAgICAnW2NsYXNzLm1jLWZvcm0tZmllbGRfaGFzLXByZWZpeF0nOiAnaGFzUHJlZml4JyxcbiAgICAgICAgJ1tjbGFzcy5tYy1mb3JtLWZpZWxkX2hhcy1zdWZmaXhdJzogJ2hhc1N1ZmZpeCcsXG4gICAgICAgICdbY2xhc3MubWMtZm9ybS1maWVsZF9oYXMtY2xlYW5lcl0nOiAnY2FuU2hvd0NsZWFuZXInLFxuICAgICAgICAnW2NsYXNzLm1jLWZvcm0tZmllbGRfaGFzLXN0ZXBwZXJdJzogJ2NhblNob3dTdGVwcGVyJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnY29udHJvbC5kaXNhYmxlZCcsXG4gICAgICAgICdbY2xhc3MubWMtZm9jdXNlZF0nOiAnY29udHJvbC5mb2N1c2VkJyxcbiAgICAgICAgJ1tjbGFzcy5uZy11bnRvdWNoZWRdJzogJ3Nob3VsZEZvcndhcmQoXCJ1bnRvdWNoZWRcIiknLFxuICAgICAgICAnW2NsYXNzLm5nLXRvdWNoZWRdJzogJ3Nob3VsZEZvcndhcmQoXCJ0b3VjaGVkXCIpJyxcbiAgICAgICAgJ1tjbGFzcy5uZy1wcmlzdGluZV0nOiAnc2hvdWxkRm9yd2FyZChcInByaXN0aW5lXCIpJyxcbiAgICAgICAgJ1tjbGFzcy5uZy1kaXJ0eV0nOiAnc2hvdWxkRm9yd2FyZChcImRpcnR5XCIpJyxcbiAgICAgICAgJ1tjbGFzcy5uZy12YWxpZF0nOiAnc2hvdWxkRm9yd2FyZChcInZhbGlkXCIpJyxcbiAgICAgICAgJ1tjbGFzcy5uZy1pbnZhbGlkXSc6ICdzaG91bGRGb3J3YXJkKFwiaW52YWxpZFwiKScsXG4gICAgICAgICdbY2xhc3MubmctcGVuZGluZ10nOiAnc2hvdWxkRm9yd2FyZChcInBlbmRpbmdcIiknLFxuICAgICAgICAnKGtleWRvd24pJzogJ29uS2V5RG93bigkZXZlbnQpJyxcbiAgICAgICAgJyhtb3VzZWVudGVyKSc6ICdvbkhvdmVyQ2hhbmdlZCh0cnVlKScsXG4gICAgICAgICcobW91c2VsZWF2ZSknOiAnb25Ib3ZlckNoYW5nZWQoZmFsc2UpJ1xuICAgIH0sXG4gICAgaW5wdXRzOiBbJ2NvbG9yJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIE1jRm9ybUZpZWxkIGV4dGVuZHMgTWNGb3JtRmllbGRNaXhpbkJhc2UgaW1wbGVtZW50c1xuICAgIEFmdGVyQ29udGVudEluaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyVmlld0luaXQsIENhbkNvbG9yIHtcblxuICAgIEBDb250ZW50Q2hpbGQoTWNGb3JtRmllbGRDb250cm9sLCB7IHN0YXRpYzogZmFsc2UgfSkgY29udHJvbDogTWNGb3JtRmllbGRDb250cm9sPGFueT47XG4gICAgQENvbnRlbnRDaGlsZChNY1N0ZXBwZXIsIHsgc3RhdGljOiBmYWxzZSB9KSBzdGVwcGVyOiBNY1N0ZXBwZXI7XG4gICAgQENvbnRlbnRDaGlsZChNY0NsZWFuZXIsIHsgc3RhdGljOiBmYWxzZSB9KSBjbGVhbmVyOiBNY0NsZWFuZXIgfCBudWxsO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY0hpbnQpIGhpbnQ6IFF1ZXJ5TGlzdDxNY0hpbnQ+O1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNTdWZmaXgpIHN1ZmZpeDogUXVlcnlMaXN0PE1jU3VmZml4PjtcbiAgICBAQ29udGVudENoaWxkcmVuKE1jUHJlZml4KSBwcmVmaXg6IFF1ZXJ5TGlzdDxNY1ByZWZpeD47XG5cbiAgICBAVmlld0NoaWxkKCdjb25uZWN0aW9uQ29udGFpbmVyJywgeyBzdGF0aWM6IHRydWUgfSkgY29ubmVjdGlvbkNvbnRhaW5lclJlZjogRWxlbWVudFJlZjtcblxuICAgIC8vIFVuaXF1ZSBpZCBmb3IgdGhlIGludGVybmFsIGZvcm0gZmllbGQgbGFiZWwuXG4gICAgbGFiZWxJZCA9IGBtYy1mb3JtLWZpZWxkLWxhYmVsLSR7bmV4dFVuaXF1ZUlkKyt9YDtcblxuICAgIGhvdmVyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNhbkNsZWFuZXJDbGVhckJ5RXNjOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGdldCBoYXNIaW50KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oaW50ICYmIHRoaXMuaGludC5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGdldCBoYXNTdWZmaXgoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1ZmZpeCAmJiB0aGlzLnN1ZmZpeC5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGdldCBoYXNQcmVmaXgoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnByZWZpeCAmJiB0aGlzLnByZWZpeC5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGdldCBoYXNDbGVhbmVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLmNsZWFuZXI7XG4gICAgfVxuXG4gICAgZ2V0IGhhc1N0ZXBwZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuc3RlcHBlcjtcbiAgICB9XG5cbiAgICBnZXQgY2FuU2hvd0NsZWFuZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0NsZWFuZXIgJiZcbiAgICAgICAgdGhpcy5jb250cm9sICYmXG4gICAgICAgIHRoaXMuY29udHJvbC5uZ0NvbnRyb2xcbiAgICAgICAgICAgID8gdGhpcy5jb250cm9sLm5nQ29udHJvbC52YWx1ZSAmJiAhdGhpcy5jb250cm9sLmRpc2FibGVkXG4gICAgICAgICAgICA6IGZhbHNlO1xuICAgIH1cblxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbCAmJiB0aGlzLmNvbnRyb2wuZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgZ2V0IGNhblNob3dTdGVwcGVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sICYmICF0aGlzLmRpc2FibGVkICYmICh0aGlzLmNvbnRyb2wuZm9jdXNlZCB8fCB0aGlzLmhvdmVyZWQpO1xuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHN1cGVyKF9lbGVtZW50UmVmKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIGlmICgodGhpcy5jb250cm9sIGFzIGFueSkubnVtYmVySW5wdXQgJiYgdGhpcy5oYXNDbGVhbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFuZXIgPSBudWxsO1xuICAgICAgICAgICAgdGhyb3cgZ2V0TWNGb3JtRmllbGRZb3VDYW5Ob3RVc2VDbGVhbmVySW5OdW1iZXJJbnB1dEVycm9yKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbGlkYXRlQ29udHJvbENoaWxkKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udHJvbC5jb250cm9sVHlwZSkge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoYG1jLWZvcm0tZmllbGQtdHlwZS0ke3RoaXMuY29udHJvbC5jb250cm9sVHlwZX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN1YnNjcmliZSB0byBjaGFuZ2VzIGluIHRoZSBjaGlsZCBjb250cm9sIHN0YXRlIGluIG9yZGVyIHRvIHVwZGF0ZSB0aGUgZm9ybSBmaWVsZCBVSS5cbiAgICAgICAgdGhpcy5jb250cm9sLnN0YXRlQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoc3RhcnRXaXRoKCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLmhhc1N0ZXBwZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RlcHBlci5jb25uZWN0VG8oKHRoaXMuY29udHJvbCBhcyBhbnkpLm51bWJlcklucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJ1biBjaGFuZ2UgZGV0ZWN0aW9uIGlmIHRoZSB2YWx1ZSBjaGFuZ2VzLlxuICAgICAgICBjb25zdCB2YWx1ZUNoYW5nZXMgPSB0aGlzLmNvbnRyb2wubmdDb250cm9sICYmIHRoaXMuY29udHJvbC5uZ0NvbnRyb2wudmFsdWVDaGFuZ2VzIHx8IEVNUFRZO1xuXG4gICAgICAgIG1lcmdlKHZhbHVlQ2hhbmdlcylcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUNvbnRyb2xDaGlsZCgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgLy8gQXZvaWQgYW5pbWF0aW9ucyBvbiBsb2FkLlxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgY2xlYXJWYWx1ZSgkZXZlbnQpIHtcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2wgJiYgdGhpcy5jb250cm9sLm5nQ29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sLm5nQ29udHJvbC5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5jb250cm9sLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNvbnRhaW5lckNsaWNrKCRldmVudCkge1xuICAgICAgICBpZiAodGhpcy5jb250cm9sLm9uQ29udGFpbmVyQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5vbkNvbnRhaW5lckNsaWNrKCRldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgICAgIGlmICh0aGlzLmNhbkNsZWFuZXJDbGVhckJ5RXNjICYmIGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSAmJiB0aGlzLmNvbnRyb2wuZm9jdXNlZCAmJiB0aGlzLmhhc0NsZWFuZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2wgJiYgdGhpcy5jb250cm9sLm5nQ29udHJvbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbC5uZ0NvbnRyb2wucmVzZXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSG92ZXJDaGFuZ2VkKGlzSG92ZXJlZDogYm9vbGVhbikge1xuICAgICAgICBpZiAoaXNIb3ZlcmVkICE9PSB0aGlzLmhvdmVyZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaG92ZXJlZCA9IGlzSG92ZXJlZDtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhbiBFbGVtZW50UmVmIGZvciB0aGUgZWxlbWVudCB0aGF0IGEgb3ZlcmxheSBhdHRhY2hlZCB0byB0aGUgZm9ybS1maWVsZCBzaG91bGQgYmVcbiAgICAgKiBwb3NpdGlvbmVkIHJlbGF0aXZlIHRvLlxuICAgICAqL1xuICAgIGdldENvbm5lY3RlZE92ZXJsYXlPcmlnaW4oKTogRWxlbWVudFJlZiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb25Db250YWluZXJSZWYgfHwgdGhpcy5fZWxlbWVudFJlZjtcbiAgICB9XG5cbiAgICAvKiogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgY2xhc3MgZnJvbSB0aGUgTmdDb250cm9sIHNob3VsZCBiZSBmb3J3YXJkZWQgdG8gdGhlIGhvc3QgZWxlbWVudC4gKi9cbiAgICBzaG91bGRGb3J3YXJkKHByb3A6IGtleW9mIE5nQ29udHJvbCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBuZ0NvbnRyb2wgPSB0aGlzLmNvbnRyb2wgPyB0aGlzLmNvbnRyb2wubmdDb250cm9sIDogbnVsbDtcblxuICAgICAgICByZXR1cm4gbmdDb250cm9sICYmIG5nQ29udHJvbFtwcm9wXTtcbiAgICB9XG5cbiAgICAvKiogVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBmb3JtIGZpZWxkJ3MgY29udHJvbCBpcyBtaXNzaW5nLiAqL1xuICAgIHByb3RlY3RlZCB2YWxpZGF0ZUNvbnRyb2xDaGlsZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRyb2wpIHtcbiAgICAgICAgICAgIHRocm93IGdldE1jRm9ybUZpZWxkTWlzc2luZ0NvbnRyb2xFcnJvcigpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLWZvcm0tZmllbGRbbWNGb3JtRmllbGRXaXRob3V0Qm9yZGVyc10nLFxuICAgIGV4cG9ydEFzOiAnbWNGb3JtRmllbGRXaXRob3V0Qm9yZGVycycsXG4gICAgaG9zdDogeyBjbGFzczogJ21jLWZvcm0tZmllbGRfd2l0aG91dC1ib3JkZXJzJyB9XG59KVxuZXhwb3J0IGNsYXNzIE1jRm9ybUZpZWxkV2l0aG91dEJvcmRlcnMge31cbiJdfQ==