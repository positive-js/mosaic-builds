/**
 * @fileoverview added by tsickle
 * Generated from: form-field.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
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
var nextUniqueId = 0;
var McFormFieldBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McFormFieldBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McFormFieldBase;
}());
export { McFormFieldBase };
if (false) {
    /** @type {?} */
    McFormFieldBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export var McFormFieldMixinBase = mixinColor(McFormFieldBase);
var McFormField = /** @class */ (function (_super) {
    __extends(McFormField, _super);
    // tslint:disable-next-line:naming-convention
    function McFormField(_elementRef, _changeDetectorRef) {
        var _this = _super.call(this, _elementRef) || this;
        _this._elementRef = _elementRef;
        _this._changeDetectorRef = _changeDetectorRef;
        // Unique id for the internal form field label.
        _this.labelId = "mc-form-field-label-" + nextUniqueId++;
        _this.hovered = false;
        _this.canCleanerClearByEsc = true;
        return _this;
    }
    Object.defineProperty(McFormField.prototype, "hasHint", {
        get: /**
         * @return {?}
         */
        function () {
            return this.hint && this.hint.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "hasSuffix", {
        get: /**
         * @return {?}
         */
        function () {
            return this.suffix && this.suffix.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "hasPrefix", {
        get: /**
         * @return {?}
         */
        function () {
            return this.prefix && this.prefix.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "hasCleaner", {
        get: /**
         * @return {?}
         */
        function () {
            return !!this.cleaner;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "hasStepper", {
        get: /**
         * @return {?}
         */
        function () {
            return !!this.stepper;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "canShowCleaner", {
        get: /**
         * @return {?}
         */
        function () {
            return this.hasCleaner &&
                this.control &&
                this.control.ngControl
                ? this.control.ngControl.value && !this.control.disabled
                : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this.control && this.control.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "canShowStepper", {
        get: /**
         * @return {?}
         */
        function () {
            return this.control && !this.disabled && (this.control.focused || this.hovered);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McFormField.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (((/** @type {?} */ (this.control))).numberInput && this.hasCleaner) {
            this.cleaner = null;
            throw getMcFormFieldYouCanNotUseCleanerInNumberInputError();
        }
        this.validateControlChild();
        if (this.control.controlType) {
            this._elementRef.nativeElement.classList.add("mc-form-field-type-" + this.control.controlType);
        }
        // Subscribe to changes in the child control state in order to update the form field UI.
        this.control.stateChanges
            .pipe(startWith())
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this._changeDetectorRef.markForCheck();
        }));
        if (this.hasStepper) {
            this.stepper.connectTo(((/** @type {?} */ (this.control))).numberInput);
        }
        // Run change detection if the value changes.
        /** @type {?} */
        var valueChanges = this.control.ngControl && this.control.ngControl.valueChanges || EMPTY;
        merge(valueChanges)
            .subscribe((/**
         * @return {?}
         */
        function () { return _this._changeDetectorRef.markForCheck(); }));
    };
    /**
     * @return {?}
     */
    McFormField.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        this.validateControlChild();
    };
    /**
     * @return {?}
     */
    McFormField.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        // Avoid animations on load.
        this._changeDetectorRef.detectChanges();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    McFormField.prototype.clearValue = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        $event.stopPropagation();
        if (this.control && this.control.ngControl) {
            this.control.ngControl.reset();
            this.control.focus();
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    McFormField.prototype.onContainerClick = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (this.control.onContainerClick) {
            this.control.onContainerClick($event);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McFormField.prototype.onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // tslint:disable-next-line:deprecation
        if (this.canCleanerClearByEsc && event.keyCode === ESCAPE && this.control.focused && this.hasCleaner) {
            if (this.control && this.control.ngControl) {
                this.control.ngControl.reset();
            }
            event.preventDefault();
        }
    };
    /**
     * @param {?} isHovered
     * @return {?}
     */
    McFormField.prototype.onHoverChanged = /**
     * @param {?} isHovered
     * @return {?}
     */
    function (isHovered) {
        if (isHovered !== this.hovered) {
            this.hovered = isHovered;
            this._changeDetectorRef.markForCheck();
        }
    };
    /**
     * Gets an ElementRef for the element that a overlay attached to the form-field should be
     * positioned relative to.
     */
    /**
     * Gets an ElementRef for the element that a overlay attached to the form-field should be
     * positioned relative to.
     * @return {?}
     */
    McFormField.prototype.getConnectedOverlayOrigin = /**
     * Gets an ElementRef for the element that a overlay attached to the form-field should be
     * positioned relative to.
     * @return {?}
     */
    function () {
        return this.connectionContainerRef || this._elementRef;
    };
    /** Determines whether a class from the NgControl should be forwarded to the host element. */
    /**
     * Determines whether a class from the NgControl should be forwarded to the host element.
     * @param {?} prop
     * @return {?}
     */
    McFormField.prototype.shouldForward = /**
     * Determines whether a class from the NgControl should be forwarded to the host element.
     * @param {?} prop
     * @return {?}
     */
    function (prop) {
        /** @type {?} */
        var ngControl = this.control ? this.control.ngControl : null;
        return ngControl && ngControl[prop];
    };
    /** Throws an error if the form field's control is missing. */
    /**
     * Throws an error if the form field's control is missing.
     * @protected
     * @return {?}
     */
    McFormField.prototype.validateControlChild = /**
     * Throws an error if the form field's control is missing.
     * @protected
     * @return {?}
     */
    function () {
        if (!this.control) {
            throw getMcFormFieldMissingControlError();
        }
    };
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
    McFormField.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    McFormField.propDecorators = {
        control: [{ type: ContentChild, args: [McFormFieldControl, { static: false },] }],
        stepper: [{ type: ContentChild, args: [McStepper, { static: false },] }],
        cleaner: [{ type: ContentChild, args: [McCleaner, { static: false },] }],
        hint: [{ type: ContentChildren, args: [McHint,] }],
        suffix: [{ type: ContentChildren, args: [McSuffix,] }],
        prefix: [{ type: ContentChildren, args: [McPrefix,] }],
        connectionContainerRef: [{ type: ViewChild, args: ['connectionContainer', { static: true },] }]
    };
    return McFormField;
}(McFormFieldMixinBase));
export { McFormField };
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
var McFormFieldWithoutBorders = /** @class */ (function () {
    function McFormFieldWithoutBorders() {
    }
    McFormFieldWithoutBorders.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-form-field[mcFormFieldWithoutBorders]',
                    exportAs: 'mcFormFieldWithoutBorders',
                    host: { class: 'mc-form-field_without-borders' }
                },] }
    ];
    return McFormFieldWithoutBorders;
}());
export { McFormFieldWithoutBorders };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9mb3JtLWZpZWxkLyIsInNvdXJjZXMiOlsiZm9ybS1maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBSUgsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUNWLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQTBCLFVBQVUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzdFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFDSCxpQ0FBaUMsRUFDakMsbURBQW1ELEVBQ3RELE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNoQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7SUFHaEMsWUFBWSxHQUFHLENBQUM7QUFFcEI7SUFDSSw2Q0FBNkM7SUFDN0MseUJBQW1CLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lBQUcsQ0FBQztJQUNsRCxzQkFBQztBQUFELENBQUMsQUFIRCxJQUdD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QUFDLE1BQU07eUJBQ3RCLGVBQWUsU0FBQyxRQUFRO3lCQUN4QixlQUFlLFNBQUMsUUFBUTt5Q0FFeEIsU0FBUyxTQUFDLHFCQUFxQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7SUErSXRELGtCQUFDO0NBQUEsQUE5TEQsQ0FvQ2lDLG9CQUFvQixHQTBKcEQ7U0ExSlksV0FBVzs7O0lBR3BCLDhCQUFzRjs7SUFDdEYsOEJBQStEOztJQUMvRCw4QkFBc0U7O0lBRXRFLDJCQUFpRDs7SUFDakQsNkJBQXVEOztJQUN2RCw2QkFBdUQ7O0lBRXZELDZDQUF1Rjs7SUFHdkYsOEJBQWtEOztJQUVsRCw4QkFBeUI7O0lBRXpCLDJDQUFxQzs7SUF1Q3pCLGtDQUE4Qjs7Ozs7SUFBRSx5Q0FBNkM7O0FBbUc3RjtJQUFBO0lBS3dDLENBQUM7O2dCQUx4QyxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLDBDQUEwQztvQkFDcEQsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLCtCQUErQixFQUFFO2lCQUNuRDs7SUFDdUMsZ0NBQUM7Q0FBQSxBQUx6QyxJQUt5QztTQUE1Qix5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyQ29udGVudENoZWNrZWQsXG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBFU0NBUEUgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgQ2FuQ29sb3IsIENhbkNvbG9yQ3RvciwgbWl4aW5Db2xvciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IEVNUFRZLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNY0NsZWFuZXIgfSBmcm9tICcuL2NsZWFuZXInO1xuaW1wb3J0IHsgTWNGb3JtRmllbGRDb250cm9sIH0gZnJvbSAnLi9mb3JtLWZpZWxkLWNvbnRyb2wnO1xuaW1wb3J0IHtcbiAgICBnZXRNY0Zvcm1GaWVsZE1pc3NpbmdDb250cm9sRXJyb3IsXG4gICAgZ2V0TWNGb3JtRmllbGRZb3VDYW5Ob3RVc2VDbGVhbmVySW5OdW1iZXJJbnB1dEVycm9yXG59IGZyb20gJy4vZm9ybS1maWVsZC1lcnJvcnMnO1xuaW1wb3J0IHsgTWNIaW50IH0gZnJvbSAnLi9oaW50JztcbmltcG9ydCB7IE1jUHJlZml4IH0gZnJvbSAnLi9wcmVmaXgnO1xuaW1wb3J0IHsgTWNTdGVwcGVyIH0gZnJvbSAnLi9zdGVwcGVyJztcbmltcG9ydCB7IE1jU3VmZml4IH0gZnJvbSAnLi9zdWZmaXgnO1xuXG5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG5leHBvcnQgY2xhc3MgTWNGb3JtRmllbGRCYXNlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jRm9ybUZpZWxkTWl4aW5CYXNlOiBDYW5Db2xvckN0b3IgJiB0eXBlb2YgTWNGb3JtRmllbGRCYXNlID0gbWl4aW5Db2xvcihNY0Zvcm1GaWVsZEJhc2UpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLWZvcm0tZmllbGQnLFxuICAgIGV4cG9ydEFzOiAnbWNGb3JtRmllbGQnLFxuICAgIHRlbXBsYXRlVXJsOiAnZm9ybS1maWVsZC5odG1sJyxcbiAgICAvLyBNY0lucHV0IGlzIGEgZGlyZWN0aXZlIGFuZCBjYW4ndCBoYXZlIHN0eWxlcywgc28gd2UgbmVlZCB0byBpbmNsdWRlIGl0cyBzdHlsZXMgaGVyZS5cbiAgICAvLyBUaGUgTWNJbnB1dCBzdHlsZXMgYXJlIGZhaXJseSBtaW5pbWFsIHNvIGl0IHNob3VsZG4ndCBiZSBhIGJpZyBkZWFsIGZvciBwZW9wbGUgd2hvXG4gICAgLy8gYXJlbid0IHVzaW5nIE1jSW5wdXQuXG4gICAgc3R5bGVVcmxzOiBbXG4gICAgICAgICdmb3JtLWZpZWxkLnNjc3MnLFxuICAgICAgICAnLi4vaW5wdXQvaW5wdXQuc2NzcycsXG4gICAgICAgICcuLi90ZXh0YXJlYS90ZXh0YXJlYS5zY3NzJ1xuICAgIF0sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWZvcm0tZmllbGQnLFxuICAgICAgICAnW2NsYXNzLm1jLWZvcm0tZmllbGRfaW52YWxpZF0nOiAnY29udHJvbC5lcnJvclN0YXRlJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1mb3JtLWZpZWxkX2hhcy1wcmVmaXhdJzogJ2hhc1ByZWZpeCcsXG4gICAgICAgICdbY2xhc3MubWMtZm9ybS1maWVsZF9oYXMtc3VmZml4XSc6ICdoYXNTdWZmaXgnLFxuICAgICAgICAnW2NsYXNzLm1jLWZvcm0tZmllbGRfaGFzLWNsZWFuZXJdJzogJ2NhblNob3dDbGVhbmVyJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1mb3JtLWZpZWxkX2hhcy1zdGVwcGVyXSc6ICdjYW5TaG93U3RlcHBlcicsXG4gICAgICAgICdbY2xhc3MubWMtZGlzYWJsZWRdJzogJ2NvbnRyb2wuZGlzYWJsZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWZvY3VzZWRdJzogJ2NvbnRyb2wuZm9jdXNlZCcsXG4gICAgICAgICdbY2xhc3MubmctdW50b3VjaGVkXSc6ICdzaG91bGRGb3J3YXJkKFwidW50b3VjaGVkXCIpJyxcbiAgICAgICAgJ1tjbGFzcy5uZy10b3VjaGVkXSc6ICdzaG91bGRGb3J3YXJkKFwidG91Y2hlZFwiKScsXG4gICAgICAgICdbY2xhc3MubmctcHJpc3RpbmVdJzogJ3Nob3VsZEZvcndhcmQoXCJwcmlzdGluZVwiKScsXG4gICAgICAgICdbY2xhc3MubmctZGlydHldJzogJ3Nob3VsZEZvcndhcmQoXCJkaXJ0eVwiKScsXG4gICAgICAgICdbY2xhc3MubmctdmFsaWRdJzogJ3Nob3VsZEZvcndhcmQoXCJ2YWxpZFwiKScsXG4gICAgICAgICdbY2xhc3MubmctaW52YWxpZF0nOiAnc2hvdWxkRm9yd2FyZChcImludmFsaWRcIiknLFxuICAgICAgICAnW2NsYXNzLm5nLXBlbmRpbmddJzogJ3Nob3VsZEZvcndhcmQoXCJwZW5kaW5nXCIpJyxcbiAgICAgICAgJyhrZXlkb3duKSc6ICdvbktleURvd24oJGV2ZW50KScsXG4gICAgICAgICcobW91c2VlbnRlciknOiAnb25Ib3ZlckNoYW5nZWQodHJ1ZSknLFxuICAgICAgICAnKG1vdXNlbGVhdmUpJzogJ29uSG92ZXJDaGFuZ2VkKGZhbHNlKSdcbiAgICB9LFxuICAgIGlucHV0czogWydjb2xvciddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWNGb3JtRmllbGQgZXh0ZW5kcyBNY0Zvcm1GaWVsZE1peGluQmFzZSBpbXBsZW1lbnRzXG4gICAgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQWZ0ZXJWaWV3SW5pdCwgQ2FuQ29sb3Ige1xuXG4gICAgQENvbnRlbnRDaGlsZChNY0Zvcm1GaWVsZENvbnRyb2wsIHsgc3RhdGljOiBmYWxzZSB9KSBjb250cm9sOiBNY0Zvcm1GaWVsZENvbnRyb2w8YW55PjtcbiAgICBAQ29udGVudENoaWxkKE1jU3RlcHBlciwgeyBzdGF0aWM6IGZhbHNlIH0pIHN0ZXBwZXI6IE1jU3RlcHBlcjtcbiAgICBAQ29udGVudENoaWxkKE1jQ2xlYW5lciwgeyBzdGF0aWM6IGZhbHNlIH0pIGNsZWFuZXI6IE1jQ2xlYW5lciB8IG51bGw7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKE1jSGludCkgaGludDogUXVlcnlMaXN0PE1jSGludD47XG4gICAgQENvbnRlbnRDaGlsZHJlbihNY1N1ZmZpeCkgc3VmZml4OiBRdWVyeUxpc3Q8TWNTdWZmaXg+O1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNQcmVmaXgpIHByZWZpeDogUXVlcnlMaXN0PE1jUHJlZml4PjtcblxuICAgIEBWaWV3Q2hpbGQoJ2Nvbm5lY3Rpb25Db250YWluZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBjb25uZWN0aW9uQ29udGFpbmVyUmVmOiBFbGVtZW50UmVmO1xuXG4gICAgLy8gVW5pcXVlIGlkIGZvciB0aGUgaW50ZXJuYWwgZm9ybSBmaWVsZCBsYWJlbC5cbiAgICBsYWJlbElkID0gYG1jLWZvcm0tZmllbGQtbGFiZWwtJHtuZXh0VW5pcXVlSWQrK31gO1xuXG4gICAgaG92ZXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY2FuQ2xlYW5lckNsZWFyQnlFc2M6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgZ2V0IGhhc0hpbnQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpbnQgJiYgdGhpcy5oaW50Lmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgZ2V0IGhhc1N1ZmZpeCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VmZml4ICYmIHRoaXMuc3VmZml4Lmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgZ2V0IGhhc1ByZWZpeCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJlZml4ICYmIHRoaXMucHJlZml4Lmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgZ2V0IGhhc0NsZWFuZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuY2xlYW5lcjtcbiAgICB9XG5cbiAgICBnZXQgaGFzU3RlcHBlcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5zdGVwcGVyO1xuICAgIH1cblxuICAgIGdldCBjYW5TaG93Q2xlYW5lcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQ2xlYW5lciAmJlxuICAgICAgICB0aGlzLmNvbnRyb2wgJiZcbiAgICAgICAgdGhpcy5jb250cm9sLm5nQ29udHJvbFxuICAgICAgICAgICAgPyB0aGlzLmNvbnRyb2wubmdDb250cm9sLnZhbHVlICYmICF0aGlzLmNvbnRyb2wuZGlzYWJsZWRcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sICYmIHRoaXMuY29udHJvbC5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBnZXQgY2FuU2hvd1N0ZXBwZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2wgJiYgIXRoaXMuZGlzYWJsZWQgJiYgKHRoaXMuY29udHJvbC5mb2N1c2VkIHx8IHRoaXMuaG92ZXJlZCk7XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgc3VwZXIoX2VsZW1lbnRSZWYpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgaWYgKCh0aGlzLmNvbnRyb2wgYXMgYW55KS5udW1iZXJJbnB1dCAmJiB0aGlzLmhhc0NsZWFuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYW5lciA9IG51bGw7XG4gICAgICAgICAgICB0aHJvdyBnZXRNY0Zvcm1GaWVsZFlvdUNhbk5vdFVzZUNsZWFuZXJJbk51bWJlcklucHV0RXJyb3IoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmFsaWRhdGVDb250cm9sQ2hpbGQoKTtcblxuICAgICAgICBpZiAodGhpcy5jb250cm9sLmNvbnRyb2xUeXBlKSB7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChgbWMtZm9ybS1maWVsZC10eXBlLSR7dGhpcy5jb250cm9sLmNvbnRyb2xUeXBlfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3Vic2NyaWJlIHRvIGNoYW5nZXMgaW4gdGhlIGNoaWxkIGNvbnRyb2wgc3RhdGUgaW4gb3JkZXIgdG8gdXBkYXRlIHRoZSBmb3JtIGZpZWxkIFVJLlxuICAgICAgICB0aGlzLmNvbnRyb2wuc3RhdGVDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShzdGFydFdpdGgoKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzU3RlcHBlcikge1xuICAgICAgICAgICAgdGhpcy5zdGVwcGVyLmNvbm5lY3RUbygodGhpcy5jb250cm9sIGFzIGFueSkubnVtYmVySW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUnVuIGNoYW5nZSBkZXRlY3Rpb24gaWYgdGhlIHZhbHVlIGNoYW5nZXMuXG4gICAgICAgIGNvbnN0IHZhbHVlQ2hhbmdlcyA9IHRoaXMuY29udHJvbC5uZ0NvbnRyb2wgJiYgdGhpcy5jb250cm9sLm5nQ29udHJvbC52YWx1ZUNoYW5nZXMgfHwgRU1QVFk7XG5cbiAgICAgICAgbWVyZ2UodmFsdWVDaGFuZ2VzKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKSk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgICAgICB0aGlzLnZhbGlkYXRlQ29udHJvbENoaWxkKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICAvLyBBdm9pZCBhbmltYXRpb25zIG9uIGxvYWQuXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBjbGVhclZhbHVlKCRldmVudCkge1xuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udHJvbCAmJiB0aGlzLmNvbnRyb2wubmdDb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wubmdDb250cm9sLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ29udGFpbmVyQ2xpY2soJGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2wub25Db250YWluZXJDbGljaykge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sLm9uQ29udGFpbmVyQ2xpY2soJGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgaWYgKHRoaXMuY2FuQ2xlYW5lckNsZWFyQnlFc2MgJiYgZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFICYmIHRoaXMuY29udHJvbC5mb2N1c2VkICYmIHRoaXMuaGFzQ2xlYW5lcikge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbCAmJiB0aGlzLmNvbnRyb2wubmdDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250cm9sLm5nQ29udHJvbC5yZXNldCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ib3ZlckNoYW5nZWQoaXNIb3ZlcmVkOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChpc0hvdmVyZWQgIT09IHRoaXMuaG92ZXJlZCkge1xuICAgICAgICAgICAgdGhpcy5ob3ZlcmVkID0gaXNIb3ZlcmVkO1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGFuIEVsZW1lbnRSZWYgZm9yIHRoZSBlbGVtZW50IHRoYXQgYSBvdmVybGF5IGF0dGFjaGVkIHRvIHRoZSBmb3JtLWZpZWxkIHNob3VsZCBiZVxuICAgICAqIHBvc2l0aW9uZWQgcmVsYXRpdmUgdG8uXG4gICAgICovXG4gICAgZ2V0Q29ubmVjdGVkT3ZlcmxheU9yaWdpbigpOiBFbGVtZW50UmVmIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbkNvbnRhaW5lclJlZiB8fCB0aGlzLl9lbGVtZW50UmVmO1xuICAgIH1cblxuICAgIC8qKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBjbGFzcyBmcm9tIHRoZSBOZ0NvbnRyb2wgc2hvdWxkIGJlIGZvcndhcmRlZCB0byB0aGUgaG9zdCBlbGVtZW50LiAqL1xuICAgIHNob3VsZEZvcndhcmQocHJvcDoga2V5b2YgTmdDb250cm9sKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IG5nQ29udHJvbCA9IHRoaXMuY29udHJvbCA/IHRoaXMuY29udHJvbC5uZ0NvbnRyb2wgOiBudWxsO1xuXG4gICAgICAgIHJldHVybiBuZ0NvbnRyb2wgJiYgbmdDb250cm9sW3Byb3BdO1xuICAgIH1cblxuICAgIC8qKiBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIGZvcm0gZmllbGQncyBjb250cm9sIGlzIG1pc3NpbmcuICovXG4gICAgcHJvdGVjdGVkIHZhbGlkYXRlQ29udHJvbENoaWxkKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udHJvbCkge1xuICAgICAgICAgICAgdGhyb3cgZ2V0TWNGb3JtRmllbGRNaXNzaW5nQ29udHJvbEVycm9yKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtZm9ybS1maWVsZFttY0Zvcm1GaWVsZFdpdGhvdXRCb3JkZXJzXScsXG4gICAgZXhwb3J0QXM6ICdtY0Zvcm1GaWVsZFdpdGhvdXRCb3JkZXJzJyxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtZm9ybS1maWVsZF93aXRob3V0LWJvcmRlcnMnIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNGb3JtRmllbGRXaXRob3V0Qm9yZGVycyB7fVxuIl19