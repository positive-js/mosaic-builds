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
                styles: [".mc-form-field{border-radius:3px;display:inline-block;position:relative;width:100%}.mc-form-field:hover{z-index:1}.mc-form-field.mc-focused{z-index:2}.mc-hint{display:block}.mc-form-field__hint>.mc-hint{margin-top:4px}.mc-form-field__container{border:1px solid transparent;border-radius:3px;position:relative}.mc-form-field_without-borders .mc-form-field__container{border-color:transparent}.mc-form-field__prefix,.mc-form-field__suffix{align-items:center;bottom:0;display:flex;flex-direction:row;justify-content:center;position:absolute;top:0;width:32px}.mc-form-field__prefix{left:0}.mc-form-field__suffix{right:0}.mc-form-field_has-cleaner .mc-input,.mc-form-field_has-stepper .mc-input,.mc-form-field_has-suffix .mc-input{padding-right:32px}.mc-form-field_has-prefix .mc-input{padding-left:32px}.mc-cleaner{cursor:pointer;display:flex;height:100%;width:32px}.mc-cleaner .mc-icon{align-items:center;display:flex;height:100%;justify-content:center;width:100%}.mc-form-field__cleaner .mc-cleaner,mc-stepper{bottom:0;position:absolute;right:0;top:0}mc-stepper{align-items:center;display:flex;flex-direction:column;justify-content:center;width:32px}mc-stepper .mc-stepper-step-down,mc-stepper .mc-stepper-step-up{cursor:pointer;text-align:center;width:32px}mc-stepper .mc-stepper-step-up{transform:scaleY(-1)}", ".mc-input{background:transparent;border:none;box-sizing:border-box;margin:0;min-height:30px;outline:none;padding:5px 16px;width:100%}.mc-input::-ms-clear,.mc-input::-ms-reveal{display:none;height:0;width:0}.mc-input::-webkit-search-cancel-button,.mc-input::-webkit-search-decoration,.mc-input::-webkit-search-results-button,.mc-input::-webkit-search-results-decoration{display:none}.mc-input{display:inline-block}input.mc-input[type=number]{-moz-appearance:textfield}input.mc-input[type=number]::-webkit-inner-spin-button,input.mc-input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}input.mc-input:invalid{box-shadow:unset}", ".mc-textarea{-webkit-appearance:none;background:transparent;border:none;box-sizing:border-box;display:inline-block;margin:0;outline:none;overflow:auto;padding:5px 16px;resize:none;vertical-align:bottom;width:100%}.mc-textarea:not(.mc-textarea-resizable){box-sizing:border-box;overflow-y:hidden}.mc-textarea.mc-textarea-resizable{min-height:50px;resize:vertical}.mc-textarea:invalid{box-shadow:unset}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL2Zvcm0tZmllbGQvIiwic291cmNlcyI6WyJmb3JtLWZpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUlILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFFVixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUEwQixVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFDSCxpQ0FBaUMsRUFDakMsbURBQW1ELEVBQ3RELE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNoQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7SUFHaEMsWUFBWSxHQUFHLENBQUM7QUFFcEIsTUFBTSxPQUFPLGVBQWU7Ozs7O0lBRXhCLFlBQW1CLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lB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ZSxTQUFDLFFBQVE7cUNBRXhCLFNBQVMsU0FBQyxxQkFBcUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Ozs7SUFSbEQsOEJBQXNGOztJQUN0Riw4QkFBK0Q7O0lBQy9ELDhCQUFzRTs7SUFFdEUsMkJBQWlEOztJQUNqRCw2QkFBdUQ7O0lBQ3ZELDZCQUF1RDs7SUFFdkQsNkNBQXVGOztJQUd2Riw4QkFBa0Q7O0lBRWxELDhCQUF5Qjs7SUFFekIsMkNBQXFDOzs7OztJQUVyQyxtQ0FBMkM7O0lBdUMvQixrQ0FBOEI7Ozs7O0lBQUUseUNBQTZDOztBQWdIN0YsTUFBTSxPQUFPLHlCQUF5Qjs7O1lBTHJDLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsMENBQTBDO2dCQUNwRCxRQUFRLEVBQUUsMkJBQTJCO2dCQUNyQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsK0JBQStCLEVBQUU7YUFDbkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyQ29udGVudENoZWNrZWQsXG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIE9uRGVzdHJveSxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRVNDQVBFIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IENhbkNvbG9yLCBDYW5Db2xvckN0b3IsIG1peGluQ29sb3IgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBFTVBUWSwgbWVyZ2UsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNY0NsZWFuZXIgfSBmcm9tICcuL2NsZWFuZXInO1xuaW1wb3J0IHsgTWNGb3JtRmllbGRDb250cm9sIH0gZnJvbSAnLi9mb3JtLWZpZWxkLWNvbnRyb2wnO1xuaW1wb3J0IHtcbiAgICBnZXRNY0Zvcm1GaWVsZE1pc3NpbmdDb250cm9sRXJyb3IsXG4gICAgZ2V0TWNGb3JtRmllbGRZb3VDYW5Ob3RVc2VDbGVhbmVySW5OdW1iZXJJbnB1dEVycm9yXG59IGZyb20gJy4vZm9ybS1maWVsZC1lcnJvcnMnO1xuaW1wb3J0IHsgTWNIaW50IH0gZnJvbSAnLi9oaW50JztcbmltcG9ydCB7IE1jUHJlZml4IH0gZnJvbSAnLi9wcmVmaXgnO1xuaW1wb3J0IHsgTWNTdGVwcGVyIH0gZnJvbSAnLi9zdGVwcGVyJztcbmltcG9ydCB7IE1jU3VmZml4IH0gZnJvbSAnLi9zdWZmaXgnO1xuXG5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG5leHBvcnQgY2xhc3MgTWNGb3JtRmllbGRCYXNlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jRm9ybUZpZWxkTWl4aW5CYXNlOiBDYW5Db2xvckN0b3IgJiB0eXBlb2YgTWNGb3JtRmllbGRCYXNlID0gbWl4aW5Db2xvcihNY0Zvcm1GaWVsZEJhc2UpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLWZvcm0tZmllbGQnLFxuICAgIGV4cG9ydEFzOiAnbWNGb3JtRmllbGQnLFxuICAgIHRlbXBsYXRlVXJsOiAnZm9ybS1maWVsZC5odG1sJyxcbiAgICAvLyBNY0lucHV0IGlzIGEgZGlyZWN0aXZlIGFuZCBjYW4ndCBoYXZlIHN0eWxlcywgc28gd2UgbmVlZCB0byBpbmNsdWRlIGl0cyBzdHlsZXMgaGVyZS5cbiAgICAvLyBUaGUgTWNJbnB1dCBzdHlsZXMgYXJlIGZhaXJseSBtaW5pbWFsIHNvIGl0IHNob3VsZG4ndCBiZSBhIGJpZyBkZWFsIGZvciBwZW9wbGUgd2hvXG4gICAgLy8gYXJlbid0IHVzaW5nIE1jSW5wdXQuXG4gICAgc3R5bGVVcmxzOiBbXG4gICAgICAgICdmb3JtLWZpZWxkLnNjc3MnLFxuICAgICAgICAnLi4vaW5wdXQvaW5wdXQuc2NzcycsXG4gICAgICAgICcuLi90ZXh0YXJlYS90ZXh0YXJlYS5zY3NzJ1xuICAgIF0sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWZvcm0tZmllbGQnLFxuICAgICAgICAnW2NsYXNzLm1jLWZvcm0tZmllbGRfaW52YWxpZF0nOiAnY29udHJvbC5lcnJvclN0YXRlJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1mb3JtLWZpZWxkX2hhcy1wcmVmaXhdJzogJ2hhc1ByZWZpeCcsXG4gICAgICAgICdbY2xhc3MubWMtZm9ybS1maWVsZF9oYXMtc3VmZml4XSc6ICdoYXNTdWZmaXgnLFxuICAgICAgICAnW2NsYXNzLm1jLWZvcm0tZmllbGRfaGFzLWNsZWFuZXJdJzogJ2NhblNob3dDbGVhbmVyJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1mb3JtLWZpZWxkX2hhcy1zdGVwcGVyXSc6ICdjYW5TaG93U3RlcHBlcicsXG4gICAgICAgICdbY2xhc3MubWMtZGlzYWJsZWRdJzogJ2NvbnRyb2wuZGlzYWJsZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWZvY3VzZWRdJzogJ2NvbnRyb2wuZm9jdXNlZCcsXG4gICAgICAgICdbY2xhc3MubmctdW50b3VjaGVkXSc6ICdzaG91bGRGb3J3YXJkKFwidW50b3VjaGVkXCIpJyxcbiAgICAgICAgJ1tjbGFzcy5uZy10b3VjaGVkXSc6ICdzaG91bGRGb3J3YXJkKFwidG91Y2hlZFwiKScsXG4gICAgICAgICdbY2xhc3MubmctcHJpc3RpbmVdJzogJ3Nob3VsZEZvcndhcmQoXCJwcmlzdGluZVwiKScsXG4gICAgICAgICdbY2xhc3MubmctZGlydHldJzogJ3Nob3VsZEZvcndhcmQoXCJkaXJ0eVwiKScsXG4gICAgICAgICdbY2xhc3MubmctdmFsaWRdJzogJ3Nob3VsZEZvcndhcmQoXCJ2YWxpZFwiKScsXG4gICAgICAgICdbY2xhc3MubmctaW52YWxpZF0nOiAnc2hvdWxkRm9yd2FyZChcImludmFsaWRcIiknLFxuICAgICAgICAnW2NsYXNzLm5nLXBlbmRpbmddJzogJ3Nob3VsZEZvcndhcmQoXCJwZW5kaW5nXCIpJyxcbiAgICAgICAgJyhrZXlkb3duKSc6ICdvbktleURvd24oJGV2ZW50KScsXG4gICAgICAgICcobW91c2VlbnRlciknOiAnb25Ib3ZlckNoYW5nZWQodHJ1ZSknLFxuICAgICAgICAnKG1vdXNlbGVhdmUpJzogJ29uSG92ZXJDaGFuZ2VkKGZhbHNlKSdcbiAgICB9LFxuICAgIGlucHV0czogWydjb2xvciddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWNGb3JtRmllbGQgZXh0ZW5kcyBNY0Zvcm1GaWVsZE1peGluQmFzZSBpbXBsZW1lbnRzXG4gICAgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQWZ0ZXJWaWV3SW5pdCwgQ2FuQ29sb3IsIE9uRGVzdHJveSB7XG5cbiAgICBAQ29udGVudENoaWxkKE1jRm9ybUZpZWxkQ29udHJvbCwgeyBzdGF0aWM6IGZhbHNlIH0pIGNvbnRyb2w6IE1jRm9ybUZpZWxkQ29udHJvbDxhbnk+O1xuICAgIEBDb250ZW50Q2hpbGQoTWNTdGVwcGVyLCB7IHN0YXRpYzogZmFsc2UgfSkgc3RlcHBlcjogTWNTdGVwcGVyO1xuICAgIEBDb250ZW50Q2hpbGQoTWNDbGVhbmVyLCB7IHN0YXRpYzogZmFsc2UgfSkgY2xlYW5lcjogTWNDbGVhbmVyIHwgbnVsbDtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNIaW50KSBoaW50OiBRdWVyeUxpc3Q8TWNIaW50PjtcbiAgICBAQ29udGVudENoaWxkcmVuKE1jU3VmZml4KSBzdWZmaXg6IFF1ZXJ5TGlzdDxNY1N1ZmZpeD47XG4gICAgQENvbnRlbnRDaGlsZHJlbihNY1ByZWZpeCkgcHJlZml4OiBRdWVyeUxpc3Q8TWNQcmVmaXg+O1xuXG4gICAgQFZpZXdDaGlsZCgnY29ubmVjdGlvbkNvbnRhaW5lcicsIHsgc3RhdGljOiB0cnVlIH0pIGNvbm5lY3Rpb25Db250YWluZXJSZWY6IEVsZW1lbnRSZWY7XG5cbiAgICAvLyBVbmlxdWUgaWQgZm9yIHRoZSBpbnRlcm5hbCBmb3JtIGZpZWxkIGxhYmVsLlxuICAgIGxhYmVsSWQgPSBgbWMtZm9ybS1maWVsZC1sYWJlbC0ke25leHRVbmlxdWVJZCsrfWA7XG5cbiAgICBob3ZlcmVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjYW5DbGVhbmVyQ2xlYXJCeUVzYzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBwcml2YXRlICR1bnN1YnNjcmliZSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBnZXQgaGFzSGludCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGludCAmJiB0aGlzLmhpbnQubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBnZXQgaGFzU3VmZml4KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWZmaXggJiYgdGhpcy5zdWZmaXgubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBnZXQgaGFzUHJlZml4KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmVmaXggJiYgdGhpcy5wcmVmaXgubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBnZXQgaGFzQ2xlYW5lcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5jbGVhbmVyO1xuICAgIH1cblxuICAgIGdldCBoYXNTdGVwcGVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLnN0ZXBwZXI7XG4gICAgfVxuXG4gICAgZ2V0IGNhblNob3dDbGVhbmVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNDbGVhbmVyICYmXG4gICAgICAgIHRoaXMuY29udHJvbCAmJlxuICAgICAgICB0aGlzLmNvbnRyb2wubmdDb250cm9sXG4gICAgICAgICAgICA/IHRoaXMuY29udHJvbC5uZ0NvbnRyb2wudmFsdWUgJiYgIXRoaXMuY29udHJvbC5kaXNhYmxlZFxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2wgJiYgdGhpcy5jb250cm9sLmRpc2FibGVkO1xuICAgIH1cblxuICAgIGdldCBjYW5TaG93U3RlcHBlcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbCAmJiAhdGhpcy5kaXNhYmxlZCAmJiAodGhpcy5jb250cm9sLmZvY3VzZWQgfHwgdGhpcy5ob3ZlcmVkKTtcbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICBzdXBlcihfZWxlbWVudFJlZik7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICBpZiAoKHRoaXMuY29udHJvbCBhcyBhbnkpLm51bWJlcklucHV0ICYmIHRoaXMuaGFzQ2xlYW5lcikge1xuICAgICAgICAgICAgdGhpcy5jbGVhbmVyID0gbnVsbDtcbiAgICAgICAgICAgIHRocm93IGdldE1jRm9ybUZpZWxkWW91Q2FuTm90VXNlQ2xlYW5lckluTnVtYmVySW5wdXRFcnJvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWxpZGF0ZUNvbnRyb2xDaGlsZCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2wuY29udHJvbFR5cGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGBtYy1mb3JtLWZpZWxkLXR5cGUtJHt0aGlzLmNvbnRyb2wuY29udHJvbFR5cGV9YCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gY2hhbmdlcyBpbiB0aGUgY2hpbGQgY29udHJvbCBzdGF0ZSBpbiBvcmRlciB0byB1cGRhdGUgdGhlIGZvcm0gZmllbGQgVUkuXG4gICAgICAgIHRoaXMuY29udHJvbC5zdGF0ZUNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKHN0YXJ0V2l0aCgpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5oYXNTdGVwcGVyKSB7XG4gICAgICAgICAgICB0aGlzLnN0ZXBwZXIuY29ubmVjdFRvKCh0aGlzLmNvbnRyb2wgYXMgYW55KS5udW1iZXJJbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSdW4gY2hhbmdlIGRldGVjdGlvbiBpZiB0aGUgdmFsdWUgY2hhbmdlcy5cbiAgICAgICAgY29uc3QgdmFsdWVDaGFuZ2VzID0gdGhpcy5jb250cm9sLm5nQ29udHJvbCAmJiB0aGlzLmNvbnRyb2wubmdDb250cm9sLnZhbHVlQ2hhbmdlcyB8fCBFTVBUWTtcblxuICAgICAgICBtZXJnZSh2YWx1ZUNoYW5nZXMpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy4kdW5zdWJzY3JpYmUpXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVDb250cm9sQ2hpbGQoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIC8vIEF2b2lkIGFuaW1hdGlvbnMgb24gbG9hZC5cbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIGNsZWFyVmFsdWUoJGV2ZW50KSB7XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAodGhpcy5jb250cm9sICYmIHRoaXMuY29udHJvbC5uZ0NvbnRyb2wpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5uZ0NvbnRyb2wucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Db250YWluZXJDbGljaygkZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbC5vbkNvbnRhaW5lckNsaWNrKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wub25Db250YWluZXJDbGljaygkZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgICAgICBpZiAodGhpcy5jYW5DbGVhbmVyQ2xlYXJCeUVzYyAmJiBldmVudC5rZXlDb2RlID09PSBFU0NBUEUgJiYgdGhpcy5jb250cm9sLmZvY3VzZWQgJiYgdGhpcy5oYXNDbGVhbmVyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sICYmIHRoaXMuY29udHJvbC5uZ0NvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2wubmdDb250cm9sLnJlc2V0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkhvdmVyQ2hhbmdlZChpc0hvdmVyZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKGlzSG92ZXJlZCAhPT0gdGhpcy5ob3ZlcmVkKSB7XG4gICAgICAgICAgICB0aGlzLmhvdmVyZWQgPSBpc0hvdmVyZWQ7XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYW4gRWxlbWVudFJlZiBmb3IgdGhlIGVsZW1lbnQgdGhhdCBhIG92ZXJsYXkgYXR0YWNoZWQgdG8gdGhlIGZvcm0tZmllbGQgc2hvdWxkIGJlXG4gICAgICogcG9zaXRpb25lZCByZWxhdGl2ZSB0by5cbiAgICAgKi9cbiAgICBnZXRDb25uZWN0ZWRPdmVybGF5T3JpZ2luKCk6IEVsZW1lbnRSZWYge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uQ29udGFpbmVyUmVmIHx8IHRoaXMuX2VsZW1lbnRSZWY7XG4gICAgfVxuXG4gICAgLyoqIERldGVybWluZXMgd2hldGhlciBhIGNsYXNzIGZyb20gdGhlIE5nQ29udHJvbCBzaG91bGQgYmUgZm9yd2FyZGVkIHRvIHRoZSBob3N0IGVsZW1lbnQuICovXG4gICAgc2hvdWxkRm9yd2FyZChwcm9wOiBrZXlvZiBOZ0NvbnRyb2wpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgbmdDb250cm9sID0gdGhpcy5jb250cm9sID8gdGhpcy5jb250cm9sLm5nQ29udHJvbCA6IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIG5nQ29udHJvbCAmJiBuZ0NvbnRyb2xbcHJvcF07XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuJHVuc3Vic2NyaWJlLm5leHQoKTtcbiAgICAgICAgdGhpcy4kdW5zdWJzY3JpYmUuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKiogVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBmb3JtIGZpZWxkJ3MgY29udHJvbCBpcyBtaXNzaW5nLiAqL1xuICAgIHByb3RlY3RlZCB2YWxpZGF0ZUNvbnRyb2xDaGlsZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRyb2wpIHtcbiAgICAgICAgICAgIHRocm93IGdldE1jRm9ybUZpZWxkTWlzc2luZ0NvbnRyb2xFcnJvcigpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLWZvcm0tZmllbGRbbWNGb3JtRmllbGRXaXRob3V0Qm9yZGVyc10nLFxuICAgIGV4cG9ydEFzOiAnbWNGb3JtRmllbGRXaXRob3V0Qm9yZGVycycsXG4gICAgaG9zdDogeyBjbGFzczogJ21jLWZvcm0tZmllbGRfd2l0aG91dC1ib3JkZXJzJyB9XG59KVxuZXhwb3J0IGNsYXNzIE1jRm9ybUZpZWxkV2l0aG91dEJvcmRlcnMge31cbiJdfQ==