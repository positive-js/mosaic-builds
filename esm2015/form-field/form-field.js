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
export class McFormFieldWithoutBorders {
}
McFormFieldWithoutBorders.decorators = [
    { type: Directive, args: [{
                selector: 'mc-form-field[mcFormFieldWithoutBorders]',
                exportAs: 'mcFormFieldWithoutBorders',
                host: { class: 'mc-form-field_without-borders' }
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9mb3JtLWZpZWxkL2Zvcm0tZmllbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUlILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFFVixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUEwQixVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFDSCxpQ0FBaUMsRUFDakMsbURBQW1ELEVBQ3RELE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNoQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUdwQyxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFckIsTUFBTSxPQUFPLGVBQWU7SUFDeEIsNkNBQTZDO0lBQzdDLFlBQW1CLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZ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QVE7cUNBRXhCLFNBQVMsU0FBQyxxQkFBcUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7O0FBZ0t0RCxNQUFNLE9BQU8seUJBQXlCOzs7WUFMckMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwwQ0FBMEM7Z0JBQ3BELFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSwrQkFBK0IsRUFBRTthQUNuRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgT25EZXN0cm95LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBFU0NBUEUgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgQ2FuQ29sb3IsIENhbkNvbG9yQ3RvciwgbWl4aW5Db2xvciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IEVNUFRZLCBtZXJnZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1jQ2xlYW5lciB9IGZyb20gJy4vY2xlYW5lcic7XG5pbXBvcnQgeyBNY0Zvcm1GaWVsZENvbnRyb2wgfSBmcm9tICcuL2Zvcm0tZmllbGQtY29udHJvbCc7XG5pbXBvcnQge1xuICAgIGdldE1jRm9ybUZpZWxkTWlzc2luZ0NvbnRyb2xFcnJvcixcbiAgICBnZXRNY0Zvcm1GaWVsZFlvdUNhbk5vdFVzZUNsZWFuZXJJbk51bWJlcklucHV0RXJyb3Jcbn0gZnJvbSAnLi9mb3JtLWZpZWxkLWVycm9ycyc7XG5pbXBvcnQgeyBNY0hpbnQgfSBmcm9tICcuL2hpbnQnO1xuaW1wb3J0IHsgTWNQcmVmaXggfSBmcm9tICcuL3ByZWZpeCc7XG5pbXBvcnQgeyBNY1N0ZXBwZXIgfSBmcm9tICcuL3N0ZXBwZXInO1xuaW1wb3J0IHsgTWNTdWZmaXggfSBmcm9tICcuL3N1ZmZpeCc7XG5cblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBNY0Zvcm1GaWVsZEJhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNGb3JtRmllbGRNaXhpbkJhc2U6IENhbkNvbG9yQ3RvciAmIHR5cGVvZiBNY0Zvcm1GaWVsZEJhc2UgPSBtaXhpbkNvbG9yKE1jRm9ybUZpZWxkQmFzZSk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtZm9ybS1maWVsZCcsXG4gICAgZXhwb3J0QXM6ICdtY0Zvcm1GaWVsZCcsXG4gICAgdGVtcGxhdGVVcmw6ICdmb3JtLWZpZWxkLmh0bWwnLFxuICAgIC8vIE1jSW5wdXQgaXMgYSBkaXJlY3RpdmUgYW5kIGNhbid0IGhhdmUgc3R5bGVzLCBzbyB3ZSBuZWVkIHRvIGluY2x1ZGUgaXRzIHN0eWxlcyBoZXJlLlxuICAgIC8vIFRoZSBNY0lucHV0IHN0eWxlcyBhcmUgZmFpcmx5IG1pbmltYWwgc28gaXQgc2hvdWxkbid0IGJlIGEgYmlnIGRlYWwgZm9yIHBlb3BsZSB3aG9cbiAgICAvLyBhcmVuJ3QgdXNpbmcgTWNJbnB1dC5cbiAgICBzdHlsZVVybHM6IFtcbiAgICAgICAgJ2Zvcm0tZmllbGQuc2NzcycsXG4gICAgICAgICcuLi9pbnB1dC9pbnB1dC5zY3NzJyxcbiAgICAgICAgJy4uL3RpbWVwaWNrZXIvdGltZXBpY2tlci5zY3NzJyxcbiAgICAgICAgJy4uL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1pbnB1dC5zY3NzJyxcbiAgICAgICAgJy4uL3RleHRhcmVhL3RleHRhcmVhLnNjc3MnXG4gICAgXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtZm9ybS1maWVsZCcsXG4gICAgICAgICdbY2xhc3MubWMtZm9ybS1maWVsZF9pbnZhbGlkXSc6ICdjb250cm9sLmVycm9yU3RhdGUnLFxuICAgICAgICAnW2NsYXNzLm1jLWZvcm0tZmllbGRfaGFzLXByZWZpeF0nOiAnaGFzUHJlZml4JyxcbiAgICAgICAgJ1tjbGFzcy5tYy1mb3JtLWZpZWxkX2hhcy1zdWZmaXhdJzogJ2hhc1N1ZmZpeCcsXG4gICAgICAgICdbY2xhc3MubWMtZm9ybS1maWVsZF9oYXMtY2xlYW5lcl0nOiAnY2FuU2hvd0NsZWFuZXInLFxuICAgICAgICAnW2NsYXNzLm1jLWZvcm0tZmllbGRfaGFzLXN0ZXBwZXJdJzogJ2NhblNob3dTdGVwcGVyJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnY29udHJvbC5kaXNhYmxlZCcsXG4gICAgICAgICdbY2xhc3MubWMtZm9jdXNlZF0nOiAnY29udHJvbC5mb2N1c2VkJyxcbiAgICAgICAgJ1tjbGFzcy5uZy11bnRvdWNoZWRdJzogJ3Nob3VsZEZvcndhcmQoXCJ1bnRvdWNoZWRcIiknLFxuICAgICAgICAnW2NsYXNzLm5nLXRvdWNoZWRdJzogJ3Nob3VsZEZvcndhcmQoXCJ0b3VjaGVkXCIpJyxcbiAgICAgICAgJ1tjbGFzcy5uZy1wcmlzdGluZV0nOiAnc2hvdWxkRm9yd2FyZChcInByaXN0aW5lXCIpJyxcbiAgICAgICAgJ1tjbGFzcy5uZy1kaXJ0eV0nOiAnc2hvdWxkRm9yd2FyZChcImRpcnR5XCIpJyxcbiAgICAgICAgJ1tjbGFzcy5uZy12YWxpZF0nOiAnc2hvdWxkRm9yd2FyZChcInZhbGlkXCIpJyxcbiAgICAgICAgJ1tjbGFzcy5uZy1pbnZhbGlkXSc6ICdzaG91bGRGb3J3YXJkKFwiaW52YWxpZFwiKScsXG4gICAgICAgICdbY2xhc3MubmctcGVuZGluZ10nOiAnc2hvdWxkRm9yd2FyZChcInBlbmRpbmdcIiknLFxuICAgICAgICAnKGtleWRvd24pJzogJ29uS2V5RG93bigkZXZlbnQpJyxcbiAgICAgICAgJyhtb3VzZWVudGVyKSc6ICdvbkhvdmVyQ2hhbmdlZCh0cnVlKScsXG4gICAgICAgICcobW91c2VsZWF2ZSknOiAnb25Ib3ZlckNoYW5nZWQoZmFsc2UpJ1xuICAgIH0sXG4gICAgaW5wdXRzOiBbJ2NvbG9yJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY0Zvcm1GaWVsZCBleHRlbmRzIE1jRm9ybUZpZWxkTWl4aW5CYXNlIGltcGxlbWVudHNcbiAgICBBZnRlckNvbnRlbnRJbml0LCBBZnRlckNvbnRlbnRDaGVja2VkLCBBZnRlclZpZXdJbml0LCBDYW5Db2xvciwgT25EZXN0cm95IHtcblxuICAgIEBDb250ZW50Q2hpbGQoTWNGb3JtRmllbGRDb250cm9sLCB7IHN0YXRpYzogZmFsc2UgfSkgY29udHJvbDogTWNGb3JtRmllbGRDb250cm9sPGFueT47XG4gICAgQENvbnRlbnRDaGlsZChNY1N0ZXBwZXIsIHsgc3RhdGljOiBmYWxzZSB9KSBzdGVwcGVyOiBNY1N0ZXBwZXI7XG4gICAgQENvbnRlbnRDaGlsZChNY0NsZWFuZXIsIHsgc3RhdGljOiBmYWxzZSB9KSBjbGVhbmVyOiBNY0NsZWFuZXIgfCBudWxsO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY0hpbnQpIGhpbnQ6IFF1ZXJ5TGlzdDxNY0hpbnQ+O1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNTdWZmaXgpIHN1ZmZpeDogUXVlcnlMaXN0PE1jU3VmZml4PjtcbiAgICBAQ29udGVudENoaWxkcmVuKE1jUHJlZml4KSBwcmVmaXg6IFF1ZXJ5TGlzdDxNY1ByZWZpeD47XG5cbiAgICBAVmlld0NoaWxkKCdjb25uZWN0aW9uQ29udGFpbmVyJywgeyBzdGF0aWM6IHRydWUgfSkgY29ubmVjdGlvbkNvbnRhaW5lclJlZjogRWxlbWVudFJlZjtcblxuICAgIC8vIFVuaXF1ZSBpZCBmb3IgdGhlIGludGVybmFsIGZvcm0gZmllbGQgbGFiZWwuXG4gICAgbGFiZWxJZCA9IGBtYy1mb3JtLWZpZWxkLWxhYmVsLSR7bmV4dFVuaXF1ZUlkKyt9YDtcblxuICAgIGhvdmVyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNhbkNsZWFuZXJDbGVhckJ5RXNjOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIHByaXZhdGUgJHVuc3Vic2NyaWJlID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGdldCBoYXNIaW50KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oaW50ICYmIHRoaXMuaGludC5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGdldCBoYXNTdWZmaXgoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1ZmZpeCAmJiB0aGlzLnN1ZmZpeC5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGdldCBoYXNQcmVmaXgoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnByZWZpeCAmJiB0aGlzLnByZWZpeC5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGdldCBoYXNDbGVhbmVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLmNsZWFuZXI7XG4gICAgfVxuXG4gICAgZ2V0IGhhc1N0ZXBwZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuc3RlcHBlcjtcbiAgICB9XG5cbiAgICBnZXQgY2FuU2hvd0NsZWFuZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0NsZWFuZXIgJiZcbiAgICAgICAgdGhpcy5jb250cm9sICYmXG4gICAgICAgIHRoaXMuY29udHJvbC5uZ0NvbnRyb2xcbiAgICAgICAgICAgID8gdGhpcy5jb250cm9sLm5nQ29udHJvbC52YWx1ZSAmJiAhdGhpcy5jb250cm9sLmRpc2FibGVkXG4gICAgICAgICAgICA6IGZhbHNlO1xuICAgIH1cblxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbCAmJiB0aGlzLmNvbnRyb2wuZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgZ2V0IGNhblNob3dTdGVwcGVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNTdGVwcGVyICYmXG4gICAgICAgICAgICAhdGhpcy5kaXNhYmxlZCAmJlxuICAgICAgICAgICAgKHRoaXMuY29udHJvbD8uZm9jdXNlZCB8fCB0aGlzLmhvdmVyZWQpO1xuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHN1cGVyKF9lbGVtZW50UmVmKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIGlmICgodGhpcy5jb250cm9sIGFzIGFueSkubnVtYmVySW5wdXQgJiYgdGhpcy5oYXNDbGVhbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFuZXIgPSBudWxsO1xuICAgICAgICAgICAgdGhyb3cgZ2V0TWNGb3JtRmllbGRZb3VDYW5Ob3RVc2VDbGVhbmVySW5OdW1iZXJJbnB1dEVycm9yKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbGlkYXRlQ29udHJvbENoaWxkKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udHJvbC5jb250cm9sVHlwZSkge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoYG1jLWZvcm0tZmllbGQtdHlwZS0ke3RoaXMuY29udHJvbC5jb250cm9sVHlwZX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN1YnNjcmliZSB0byBjaGFuZ2VzIGluIHRoZSBjaGlsZCBjb250cm9sIHN0YXRlIGluIG9yZGVyIHRvIHVwZGF0ZSB0aGUgZm9ybSBmaWVsZCBVSS5cbiAgICAgICAgdGhpcy5jb250cm9sLnN0YXRlQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoc3RhcnRXaXRoKCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLmhhc1N0ZXBwZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RlcHBlci5jb25uZWN0VG8oKHRoaXMuY29udHJvbCBhcyBhbnkpLm51bWJlcklucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJ1biBjaGFuZ2UgZGV0ZWN0aW9uIGlmIHRoZSB2YWx1ZSBjaGFuZ2VzLlxuICAgICAgICBjb25zdCB2YWx1ZUNoYW5nZXMgPSB0aGlzLmNvbnRyb2wubmdDb250cm9sICYmIHRoaXMuY29udHJvbC5uZ0NvbnRyb2wudmFsdWVDaGFuZ2VzIHx8IEVNUFRZO1xuXG4gICAgICAgIG1lcmdlKHZhbHVlQ2hhbmdlcylcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLiR1bnN1YnNjcmliZSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVDb250cm9sQ2hpbGQoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIC8vIEF2b2lkIGFuaW1hdGlvbnMgb24gbG9hZC5cbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIGNsZWFyVmFsdWUoJGV2ZW50KSB7XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAodGhpcy5jb250cm9sICYmIHRoaXMuY29udHJvbC5uZ0NvbnRyb2wpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5uZ0NvbnRyb2wucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Db250YWluZXJDbGljaygkZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbC5vbkNvbnRhaW5lckNsaWNrKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wub25Db250YWluZXJDbGljaygkZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgICAgICBpZiAodGhpcy5jYW5DbGVhbmVyQ2xlYXJCeUVzYyAmJiBldmVudC5rZXlDb2RlID09PSBFU0NBUEUgJiYgdGhpcy5jb250cm9sLmZvY3VzZWQgJiYgdGhpcy5oYXNDbGVhbmVyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sICYmIHRoaXMuY29udHJvbC5uZ0NvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2wubmdDb250cm9sLnJlc2V0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkhvdmVyQ2hhbmdlZChpc0hvdmVyZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKGlzSG92ZXJlZCAhPT0gdGhpcy5ob3ZlcmVkKSB7XG4gICAgICAgICAgICB0aGlzLmhvdmVyZWQgPSBpc0hvdmVyZWQ7XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYW4gRWxlbWVudFJlZiBmb3IgdGhlIGVsZW1lbnQgdGhhdCBhIG92ZXJsYXkgYXR0YWNoZWQgdG8gdGhlIGZvcm0tZmllbGQgc2hvdWxkIGJlXG4gICAgICogcG9zaXRpb25lZCByZWxhdGl2ZSB0by5cbiAgICAgKi9cbiAgICBnZXRDb25uZWN0ZWRPdmVybGF5T3JpZ2luKCk6IEVsZW1lbnRSZWYge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uQ29udGFpbmVyUmVmIHx8IHRoaXMuX2VsZW1lbnRSZWY7XG4gICAgfVxuXG4gICAgLyoqIERldGVybWluZXMgd2hldGhlciBhIGNsYXNzIGZyb20gdGhlIE5nQ29udHJvbCBzaG91bGQgYmUgZm9yd2FyZGVkIHRvIHRoZSBob3N0IGVsZW1lbnQuICovXG4gICAgc2hvdWxkRm9yd2FyZChwcm9wOiBrZXlvZiBOZ0NvbnRyb2wpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgbmdDb250cm9sID0gdGhpcy5jb250cm9sID8gdGhpcy5jb250cm9sLm5nQ29udHJvbCA6IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIG5nQ29udHJvbCAmJiBuZ0NvbnRyb2xbcHJvcF07XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuJHVuc3Vic2NyaWJlLm5leHQoKTtcbiAgICAgICAgdGhpcy4kdW5zdWJzY3JpYmUuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKiogVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBmb3JtIGZpZWxkJ3MgY29udHJvbCBpcyBtaXNzaW5nLiAqL1xuICAgIHByb3RlY3RlZCB2YWxpZGF0ZUNvbnRyb2xDaGlsZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRyb2wpIHtcbiAgICAgICAgICAgIHRocm93IGdldE1jRm9ybUZpZWxkTWlzc2luZ0NvbnRyb2xFcnJvcigpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLWZvcm0tZmllbGRbbWNGb3JtRmllbGRXaXRob3V0Qm9yZGVyc10nLFxuICAgIGV4cG9ydEFzOiAnbWNGb3JtRmllbGRXaXRob3V0Qm9yZGVycycsXG4gICAgaG9zdDogeyBjbGFzczogJ21jLWZvcm0tZmllbGRfd2l0aG91dC1ib3JkZXJzJyB9XG59KVxuZXhwb3J0IGNsYXNzIE1jRm9ybUZpZWxkV2l0aG91dEJvcmRlcnMge31cbiJdfQ==