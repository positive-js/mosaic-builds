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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9mb3JtLWZpZWxkLyIsInNvdXJjZXMiOlsiZm9ybS1maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBSUgsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUNWLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQTBCLFVBQVUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzdFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFDSCxpQ0FBaUMsRUFDakMsbURBQW1ELEVBQ3RELE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNoQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7SUFHaEMsWUFBWSxHQUFHLENBQUM7QUFFcEI7SUFDSSw2Q0FBNkM7SUFDN0MseUJBQW1CLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lBQUcsQ0FBQztJQUNsRCxzQkFBQztBQUFELENBQUMsQUFIRCxJQUdD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QUFDLE1BQU07eUJBQ3RCLGVBQWUsU0FBQyxRQUFRO3lCQUN4QixlQUFlLFNBQUMsUUFBUTt5Q0FFeEIsU0FBUyxTQUFDLHFCQUFxQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7SUErSXRELGtCQUFDO0NBQUEsQUEvTEQsQ0FxQ2lDLG9CQUFvQixHQTBKcEQ7U0ExSlksV0FBVzs7O0lBR3BCLDhCQUFzRjs7SUFDdEYsOEJBQStEOztJQUMvRCw4QkFBc0U7O0lBRXRFLDJCQUFpRDs7SUFDakQsNkJBQXVEOztJQUN2RCw2QkFBdUQ7O0lBRXZELDZDQUF1Rjs7SUFHdkYsOEJBQWtEOztJQUVsRCw4QkFBeUI7O0lBRXpCLDJDQUFxQzs7SUF1Q3pCLGtDQUE4Qjs7Ozs7SUFBRSx5Q0FBNkM7O0FBbUc3RjtJQUFBO0lBS3dDLENBQUM7O2dCQUx4QyxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLDBDQUEwQztvQkFDcEQsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLCtCQUErQixFQUFFO2lCQUNuRDs7SUFDdUMsZ0NBQUM7Q0FBQSxBQUx6QyxJQUt5QztTQUE1Qix5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyQ29udGVudENoZWNrZWQsXG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBFU0NBUEUgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgQ2FuQ29sb3IsIENhbkNvbG9yQ3RvciwgbWl4aW5Db2xvciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IEVNUFRZLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNY0NsZWFuZXIgfSBmcm9tICcuL2NsZWFuZXInO1xuaW1wb3J0IHsgTWNGb3JtRmllbGRDb250cm9sIH0gZnJvbSAnLi9mb3JtLWZpZWxkLWNvbnRyb2wnO1xuaW1wb3J0IHtcbiAgICBnZXRNY0Zvcm1GaWVsZE1pc3NpbmdDb250cm9sRXJyb3IsXG4gICAgZ2V0TWNGb3JtRmllbGRZb3VDYW5Ob3RVc2VDbGVhbmVySW5OdW1iZXJJbnB1dEVycm9yXG59IGZyb20gJy4vZm9ybS1maWVsZC1lcnJvcnMnO1xuaW1wb3J0IHsgTWNIaW50IH0gZnJvbSAnLi9oaW50JztcbmltcG9ydCB7IE1jUHJlZml4IH0gZnJvbSAnLi9wcmVmaXgnO1xuaW1wb3J0IHsgTWNTdGVwcGVyIH0gZnJvbSAnLi9zdGVwcGVyJztcbmltcG9ydCB7IE1jU3VmZml4IH0gZnJvbSAnLi9zdWZmaXgnO1xuXG5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG5leHBvcnQgY2xhc3MgTWNGb3JtRmllbGRCYXNlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jRm9ybUZpZWxkTWl4aW5CYXNlOiBDYW5Db2xvckN0b3IgJiB0eXBlb2YgTWNGb3JtRmllbGRCYXNlID0gbWl4aW5Db2xvcihNY0Zvcm1GaWVsZEJhc2UpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLWZvcm0tZmllbGQnLFxuICAgIGV4cG9ydEFzOiAnbWNGb3JtRmllbGQnLFxuICAgIHRlbXBsYXRlVXJsOiAnZm9ybS1maWVsZC5odG1sJyxcbiAgICAvLyBNY0lucHV0IGlzIGEgZGlyZWN0aXZlIGFuZCBjYW4ndCBoYXZlIHN0eWxlcywgc28gd2UgbmVlZCB0byBpbmNsdWRlIGl0cyBzdHlsZXMgaGVyZS5cbiAgICAvLyBUaGUgTWNJbnB1dCBzdHlsZXMgYXJlIGZhaXJseSBtaW5pbWFsIHNvIGl0IHNob3VsZG4ndCBiZSBhIGJpZyBkZWFsIGZvciBwZW9wbGUgd2hvXG4gICAgLy8gYXJlbid0IHVzaW5nIE1jSW5wdXQuXG4gICAgc3R5bGVVcmxzOiBbXG4gICAgICAgICdmb3JtLWZpZWxkLnNjc3MnLFxuICAgICAgICAnLi4vaW5wdXQvaW5wdXQuc2NzcycsXG4gICAgICAgICcuLi90ZXh0YXJlYS90ZXh0YXJlYS5zY3NzJ1xuICAgIF0sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWZvcm0tZmllbGQnLFxuICAgICAgICAnW2NsYXNzLm1jLWZvcm0tZmllbGRfaW52YWxpZF0nOiAnY29udHJvbC5lcnJvclN0YXRlJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1mb3JtLWZpZWxkX2hhcy1wcmVmaXhdJzogJ2hhc1ByZWZpeCcsXG4gICAgICAgICdbY2xhc3MubWMtZm9ybS1maWVsZF9oYXMtc3VmZml4XSc6ICdoYXNTdWZmaXgnLFxuICAgICAgICAnW2NsYXNzLm1jLWZvcm0tZmllbGRfaGFzLWNsZWFuZXJdJzogJ2NhblNob3dDbGVhbmVyJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1mb3JtLWZpZWxkX2hhcy1zdGVwcGVyXSc6ICdjYW5TaG93U3RlcHBlcicsXG4gICAgICAgICdbY2xhc3MubWMtZGlzYWJsZWRdJzogJ2NvbnRyb2wuZGlzYWJsZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWZvY3VzZWRdJzogJ2NvbnRyb2wuZm9jdXNlZCcsXG4gICAgICAgICdbY2xhc3MubmctdW50b3VjaGVkXSc6ICdzaG91bGRGb3J3YXJkKFwidW50b3VjaGVkXCIpJyxcbiAgICAgICAgJ1tjbGFzcy5uZy10b3VjaGVkXSc6ICdzaG91bGRGb3J3YXJkKFwidG91Y2hlZFwiKScsXG4gICAgICAgICdbY2xhc3MubmctcHJpc3RpbmVdJzogJ3Nob3VsZEZvcndhcmQoXCJwcmlzdGluZVwiKScsXG4gICAgICAgICdbY2xhc3MubmctZGlydHldJzogJ3Nob3VsZEZvcndhcmQoXCJkaXJ0eVwiKScsXG4gICAgICAgICdbY2xhc3MubmctdmFsaWRdJzogJ3Nob3VsZEZvcndhcmQoXCJ2YWxpZFwiKScsXG4gICAgICAgICdbY2xhc3MubmctaW52YWxpZF0nOiAnc2hvdWxkRm9yd2FyZChcImludmFsaWRcIiknLFxuICAgICAgICAnW2NsYXNzLm5nLXBlbmRpbmddJzogJ3Nob3VsZEZvcndhcmQoXCJwZW5kaW5nXCIpJyxcbiAgICAgICAgJyhrZXlkb3duKSc6ICdvbktleURvd24oJGV2ZW50KScsXG4gICAgICAgICcobW91c2VlbnRlciknOiAnb25Ib3ZlckNoYW5nZWQodHJ1ZSknLFxuICAgICAgICAnKG1vdXNlbGVhdmUpJzogJ29uSG92ZXJDaGFuZ2VkKGZhbHNlKSdcbiAgICB9LFxuICAgIGlucHV0czogWydjb2xvciddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5cbmV4cG9ydCBjbGFzcyBNY0Zvcm1GaWVsZCBleHRlbmRzIE1jRm9ybUZpZWxkTWl4aW5CYXNlIGltcGxlbWVudHNcbiAgICBBZnRlckNvbnRlbnRJbml0LCBBZnRlckNvbnRlbnRDaGVja2VkLCBBZnRlclZpZXdJbml0LCBDYW5Db2xvciB7XG5cbiAgICBAQ29udGVudENoaWxkKE1jRm9ybUZpZWxkQ29udHJvbCwgeyBzdGF0aWM6IGZhbHNlIH0pIGNvbnRyb2w6IE1jRm9ybUZpZWxkQ29udHJvbDxhbnk+O1xuICAgIEBDb250ZW50Q2hpbGQoTWNTdGVwcGVyLCB7IHN0YXRpYzogZmFsc2UgfSkgc3RlcHBlcjogTWNTdGVwcGVyO1xuICAgIEBDb250ZW50Q2hpbGQoTWNDbGVhbmVyLCB7IHN0YXRpYzogZmFsc2UgfSkgY2xlYW5lcjogTWNDbGVhbmVyIHwgbnVsbDtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNIaW50KSBoaW50OiBRdWVyeUxpc3Q8TWNIaW50PjtcbiAgICBAQ29udGVudENoaWxkcmVuKE1jU3VmZml4KSBzdWZmaXg6IFF1ZXJ5TGlzdDxNY1N1ZmZpeD47XG4gICAgQENvbnRlbnRDaGlsZHJlbihNY1ByZWZpeCkgcHJlZml4OiBRdWVyeUxpc3Q8TWNQcmVmaXg+O1xuXG4gICAgQFZpZXdDaGlsZCgnY29ubmVjdGlvbkNvbnRhaW5lcicsIHsgc3RhdGljOiB0cnVlIH0pIGNvbm5lY3Rpb25Db250YWluZXJSZWY6IEVsZW1lbnRSZWY7XG5cbiAgICAvLyBVbmlxdWUgaWQgZm9yIHRoZSBpbnRlcm5hbCBmb3JtIGZpZWxkIGxhYmVsLlxuICAgIGxhYmVsSWQgPSBgbWMtZm9ybS1maWVsZC1sYWJlbC0ke25leHRVbmlxdWVJZCsrfWA7XG5cbiAgICBob3ZlcmVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjYW5DbGVhbmVyQ2xlYXJCeUVzYzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBnZXQgaGFzSGludCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGludCAmJiB0aGlzLmhpbnQubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBnZXQgaGFzU3VmZml4KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWZmaXggJiYgdGhpcy5zdWZmaXgubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBnZXQgaGFzUHJlZml4KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmVmaXggJiYgdGhpcy5wcmVmaXgubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBnZXQgaGFzQ2xlYW5lcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5jbGVhbmVyO1xuICAgIH1cblxuICAgIGdldCBoYXNTdGVwcGVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLnN0ZXBwZXI7XG4gICAgfVxuXG4gICAgZ2V0IGNhblNob3dDbGVhbmVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNDbGVhbmVyICYmXG4gICAgICAgIHRoaXMuY29udHJvbCAmJlxuICAgICAgICB0aGlzLmNvbnRyb2wubmdDb250cm9sXG4gICAgICAgICAgICA/IHRoaXMuY29udHJvbC5uZ0NvbnRyb2wudmFsdWUgJiYgIXRoaXMuY29udHJvbC5kaXNhYmxlZFxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2wgJiYgdGhpcy5jb250cm9sLmRpc2FibGVkO1xuICAgIH1cblxuICAgIGdldCBjYW5TaG93U3RlcHBlcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbCAmJiAhdGhpcy5kaXNhYmxlZCAmJiAodGhpcy5jb250cm9sLmZvY3VzZWQgfHwgdGhpcy5ob3ZlcmVkKTtcbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICBzdXBlcihfZWxlbWVudFJlZik7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICBpZiAoKHRoaXMuY29udHJvbCBhcyBhbnkpLm51bWJlcklucHV0ICYmIHRoaXMuaGFzQ2xlYW5lcikge1xuICAgICAgICAgICAgdGhpcy5jbGVhbmVyID0gbnVsbDtcbiAgICAgICAgICAgIHRocm93IGdldE1jRm9ybUZpZWxkWW91Q2FuTm90VXNlQ2xlYW5lckluTnVtYmVySW5wdXRFcnJvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWxpZGF0ZUNvbnRyb2xDaGlsZCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2wuY29udHJvbFR5cGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGBtYy1mb3JtLWZpZWxkLXR5cGUtJHt0aGlzLmNvbnRyb2wuY29udHJvbFR5cGV9YCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gY2hhbmdlcyBpbiB0aGUgY2hpbGQgY29udHJvbCBzdGF0ZSBpbiBvcmRlciB0byB1cGRhdGUgdGhlIGZvcm0gZmllbGQgVUkuXG4gICAgICAgIHRoaXMuY29udHJvbC5zdGF0ZUNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKHN0YXJ0V2l0aCgpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5oYXNTdGVwcGVyKSB7XG4gICAgICAgICAgICB0aGlzLnN0ZXBwZXIuY29ubmVjdFRvKCh0aGlzLmNvbnRyb2wgYXMgYW55KS5udW1iZXJJbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSdW4gY2hhbmdlIGRldGVjdGlvbiBpZiB0aGUgdmFsdWUgY2hhbmdlcy5cbiAgICAgICAgY29uc3QgdmFsdWVDaGFuZ2VzID0gdGhpcy5jb250cm9sLm5nQ29udHJvbCAmJiB0aGlzLmNvbnRyb2wubmdDb250cm9sLnZhbHVlQ2hhbmdlcyB8fCBFTVBUWTtcblxuICAgICAgICBtZXJnZSh2YWx1ZUNoYW5nZXMpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVDb250cm9sQ2hpbGQoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIC8vIEF2b2lkIGFuaW1hdGlvbnMgb24gbG9hZC5cbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIGNsZWFyVmFsdWUoJGV2ZW50KSB7XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAodGhpcy5jb250cm9sICYmIHRoaXMuY29udHJvbC5uZ0NvbnRyb2wpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5uZ0NvbnRyb2wucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Db250YWluZXJDbGljaygkZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbC5vbkNvbnRhaW5lckNsaWNrKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wub25Db250YWluZXJDbGljaygkZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgICAgICBpZiAodGhpcy5jYW5DbGVhbmVyQ2xlYXJCeUVzYyAmJiBldmVudC5rZXlDb2RlID09PSBFU0NBUEUgJiYgdGhpcy5jb250cm9sLmZvY3VzZWQgJiYgdGhpcy5oYXNDbGVhbmVyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sICYmIHRoaXMuY29udHJvbC5uZ0NvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2wubmdDb250cm9sLnJlc2V0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkhvdmVyQ2hhbmdlZChpc0hvdmVyZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKGlzSG92ZXJlZCAhPT0gdGhpcy5ob3ZlcmVkKSB7XG4gICAgICAgICAgICB0aGlzLmhvdmVyZWQgPSBpc0hvdmVyZWQ7XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYW4gRWxlbWVudFJlZiBmb3IgdGhlIGVsZW1lbnQgdGhhdCBhIG92ZXJsYXkgYXR0YWNoZWQgdG8gdGhlIGZvcm0tZmllbGQgc2hvdWxkIGJlXG4gICAgICogcG9zaXRpb25lZCByZWxhdGl2ZSB0by5cbiAgICAgKi9cbiAgICBnZXRDb25uZWN0ZWRPdmVybGF5T3JpZ2luKCk6IEVsZW1lbnRSZWYge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uQ29udGFpbmVyUmVmIHx8IHRoaXMuX2VsZW1lbnRSZWY7XG4gICAgfVxuXG4gICAgLyoqIERldGVybWluZXMgd2hldGhlciBhIGNsYXNzIGZyb20gdGhlIE5nQ29udHJvbCBzaG91bGQgYmUgZm9yd2FyZGVkIHRvIHRoZSBob3N0IGVsZW1lbnQuICovXG4gICAgc2hvdWxkRm9yd2FyZChwcm9wOiBrZXlvZiBOZ0NvbnRyb2wpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgbmdDb250cm9sID0gdGhpcy5jb250cm9sID8gdGhpcy5jb250cm9sLm5nQ29udHJvbCA6IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIG5nQ29udHJvbCAmJiBuZ0NvbnRyb2xbcHJvcF07XG4gICAgfVxuXG4gICAgLyoqIFRocm93cyBhbiBlcnJvciBpZiB0aGUgZm9ybSBmaWVsZCdzIGNvbnRyb2wgaXMgbWlzc2luZy4gKi9cbiAgICBwcm90ZWN0ZWQgdmFsaWRhdGVDb250cm9sQ2hpbGQoKSB7XG4gICAgICAgIGlmICghdGhpcy5jb250cm9sKSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRNY0Zvcm1GaWVsZE1pc3NpbmdDb250cm9sRXJyb3IoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1mb3JtLWZpZWxkW21jRm9ybUZpZWxkV2l0aG91dEJvcmRlcnNdJyxcbiAgICBleHBvcnRBczogJ21jRm9ybUZpZWxkV2l0aG91dEJvcmRlcnMnLFxuICAgIGhvc3Q6IHsgY2xhc3M6ICdtYy1mb3JtLWZpZWxkX3dpdGhvdXQtYm9yZGVycycgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0Zvcm1GaWVsZFdpdGhvdXRCb3JkZXJzIHt9XG4iXX0=