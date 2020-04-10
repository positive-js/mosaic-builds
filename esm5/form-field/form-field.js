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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9mb3JtLWZpZWxkLyIsInNvdXJjZXMiOlsiZm9ybS1maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBSUgsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUNWLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQTBCLFVBQVUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzdFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFDSCxpQ0FBaUMsRUFDakMsbURBQW1ELEVBQ3RELE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNoQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7SUFHaEMsWUFBWSxHQUFHLENBQUM7QUFFcEI7SUFDSSw2Q0FBNkM7SUFDN0MseUJBQW1CLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lBQUcsQ0FBQztJQUNsRCxzQkFBQztBQUFELENBQUMsQUFIRCxJQUdD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LE1BQU07eUJBQ3RCLGVBQWUsU0FBQyxRQUFRO3lCQUN4QixlQUFlLFNBQUMsUUFBUTt5Q0FFeEIsU0FBUyxTQUFDLHFCQUFxQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7SUErSXRELGtCQUFDO0NBQUEsQUEvTEQsQ0FxQ2lDLG9CQUFvQixHQTBKcEQ7U0ExSlksV0FBVzs7O0lBR3BCLDhCQUFzRjs7SUFDdEYsOEJBQStEOztJQUMvRCw4QkFBc0U7O0lBRXRFLDJCQUFpRDs7SUFDakQsNkJBQXVEOztJQUN2RCw2QkFBdUQ7O0lBRXZELDZDQUF1Rjs7SUFHdkYsOEJBQWtEOztJQUVsRCw4QkFBeUI7O0lBRXpCLDJDQUFxQzs7SUFHekIsa0NBQThCOzs7OztJQUFFLHlDQUE2Qzs7QUF1STdGO0lBQUE7SUFLd0MsQ0FBQzs7Z0JBTHhDLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsMENBQTBDO29CQUNwRCxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsK0JBQStCLEVBQUU7aUJBQ25EOztJQUN1QyxnQ0FBQztDQUFBLEFBTHpDLElBS3lDO1NBQTVCLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEVTQ0FQRSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBDYW5Db2xvciwgQ2FuQ29sb3JDdG9yLCBtaXhpbkNvbG9yIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgRU1QVFksIG1lcmdlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1jQ2xlYW5lciB9IGZyb20gJy4vY2xlYW5lcic7XG5pbXBvcnQgeyBNY0Zvcm1GaWVsZENvbnRyb2wgfSBmcm9tICcuL2Zvcm0tZmllbGQtY29udHJvbCc7XG5pbXBvcnQge1xuICAgIGdldE1jRm9ybUZpZWxkTWlzc2luZ0NvbnRyb2xFcnJvcixcbiAgICBnZXRNY0Zvcm1GaWVsZFlvdUNhbk5vdFVzZUNsZWFuZXJJbk51bWJlcklucHV0RXJyb3Jcbn0gZnJvbSAnLi9mb3JtLWZpZWxkLWVycm9ycyc7XG5pbXBvcnQgeyBNY0hpbnQgfSBmcm9tICcuL2hpbnQnO1xuaW1wb3J0IHsgTWNQcmVmaXggfSBmcm9tICcuL3ByZWZpeCc7XG5pbXBvcnQgeyBNY1N0ZXBwZXIgfSBmcm9tICcuL3N0ZXBwZXInO1xuaW1wb3J0IHsgTWNTdWZmaXggfSBmcm9tICcuL3N1ZmZpeCc7XG5cblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBNY0Zvcm1GaWVsZEJhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNGb3JtRmllbGRNaXhpbkJhc2U6IENhbkNvbG9yQ3RvciAmIHR5cGVvZiBNY0Zvcm1GaWVsZEJhc2UgPSBtaXhpbkNvbG9yKE1jRm9ybUZpZWxkQmFzZSk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtZm9ybS1maWVsZCcsXG4gICAgZXhwb3J0QXM6ICdtY0Zvcm1GaWVsZCcsXG4gICAgdGVtcGxhdGVVcmw6ICdmb3JtLWZpZWxkLmh0bWwnLFxuICAgIC8vIE1jSW5wdXQgaXMgYSBkaXJlY3RpdmUgYW5kIGNhbid0IGhhdmUgc3R5bGVzLCBzbyB3ZSBuZWVkIHRvIGluY2x1ZGUgaXRzIHN0eWxlcyBoZXJlLlxuICAgIC8vIFRoZSBNY0lucHV0IHN0eWxlcyBhcmUgZmFpcmx5IG1pbmltYWwgc28gaXQgc2hvdWxkbid0IGJlIGEgYmlnIGRlYWwgZm9yIHBlb3BsZSB3aG9cbiAgICAvLyBhcmVuJ3QgdXNpbmcgTWNJbnB1dC5cbiAgICBzdHlsZVVybHM6IFtcbiAgICAgICAgJ2Zvcm0tZmllbGQuc2NzcycsXG4gICAgICAgICcuLi9pbnB1dC9pbnB1dC5zY3NzJyxcbiAgICAgICAgJy4uL3RleHRhcmVhL3RleHRhcmVhLnNjc3MnXG4gICAgXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtZm9ybS1maWVsZCcsXG4gICAgICAgICdbY2xhc3MubWMtZm9ybS1maWVsZF9pbnZhbGlkXSc6ICdjb250cm9sLmVycm9yU3RhdGUnLFxuICAgICAgICAnW2NsYXNzLm1jLWRpc2FibGVkXSc6ICdjb250cm9sLmRpc2FibGVkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1mb3JtLWZpZWxkX2hhcy1wcmVmaXhdJzogJ2hhc1ByZWZpeCcsXG4gICAgICAgICdbY2xhc3MubWMtZm9ybS1maWVsZF9oYXMtc3VmZml4XSc6ICdoYXNTdWZmaXgnLFxuICAgICAgICAnW2NsYXNzLm1jLWZvcm0tZmllbGRfaGFzLWNsZWFuZXJdJzogJ2NhblNob3dDbGVhbmVyJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1mb3JtLWZpZWxkX2hhcy1zdGVwcGVyXSc6ICdjYW5TaG93U3RlcHBlcicsXG4gICAgICAgICdbY2xhc3MubWMtZm9jdXNlZF0nOiAnY29udHJvbC5mb2N1c2VkJyxcbiAgICAgICAgJ1tjbGFzcy5uZy11bnRvdWNoZWRdJzogJ3Nob3VsZEZvcndhcmQoXCJ1bnRvdWNoZWRcIiknLFxuICAgICAgICAnW2NsYXNzLm5nLXRvdWNoZWRdJzogJ3Nob3VsZEZvcndhcmQoXCJ0b3VjaGVkXCIpJyxcbiAgICAgICAgJ1tjbGFzcy5uZy1wcmlzdGluZV0nOiAnc2hvdWxkRm9yd2FyZChcInByaXN0aW5lXCIpJyxcbiAgICAgICAgJ1tjbGFzcy5uZy1kaXJ0eV0nOiAnc2hvdWxkRm9yd2FyZChcImRpcnR5XCIpJyxcbiAgICAgICAgJ1tjbGFzcy5uZy12YWxpZF0nOiAnc2hvdWxkRm9yd2FyZChcInZhbGlkXCIpJyxcbiAgICAgICAgJ1tjbGFzcy5uZy1pbnZhbGlkXSc6ICdzaG91bGRGb3J3YXJkKFwiaW52YWxpZFwiKScsXG4gICAgICAgICdbY2xhc3MubmctcGVuZGluZ10nOiAnc2hvdWxkRm9yd2FyZChcInBlbmRpbmdcIiknLFxuICAgICAgICAnKGtleWRvd24pJzogJ29uS2V5RG93bigkZXZlbnQpJyxcbiAgICAgICAgJyhtb3VzZWVudGVyKSc6ICdvbkhvdmVyQ2hhbmdlZCh0cnVlKScsXG4gICAgICAgICcobW91c2VsZWF2ZSknOiAnb25Ib3ZlckNoYW5nZWQoZmFsc2UpJ1xuICAgIH0sXG4gICAgaW5wdXRzOiBbJ2NvbG9yJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIE1jRm9ybUZpZWxkIGV4dGVuZHMgTWNGb3JtRmllbGRNaXhpbkJhc2UgaW1wbGVtZW50c1xuICAgIEFmdGVyQ29udGVudEluaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyVmlld0luaXQsIENhbkNvbG9yIHtcblxuICAgIEBDb250ZW50Q2hpbGQoTWNGb3JtRmllbGRDb250cm9sLCB7IHN0YXRpYzogZmFsc2UgfSkgY29udHJvbDogTWNGb3JtRmllbGRDb250cm9sPGFueT47XG4gICAgQENvbnRlbnRDaGlsZChNY1N0ZXBwZXIsIHsgc3RhdGljOiBmYWxzZSB9KSBzdGVwcGVyOiBNY1N0ZXBwZXI7XG4gICAgQENvbnRlbnRDaGlsZChNY0NsZWFuZXIsIHsgc3RhdGljOiBmYWxzZSB9KSBjbGVhbmVyOiBNY0NsZWFuZXIgfCBudWxsO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY0hpbnQpIGhpbnQ6IFF1ZXJ5TGlzdDxNY0hpbnQ+O1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNTdWZmaXgpIHN1ZmZpeDogUXVlcnlMaXN0PE1jU3VmZml4PjtcbiAgICBAQ29udGVudENoaWxkcmVuKE1jUHJlZml4KSBwcmVmaXg6IFF1ZXJ5TGlzdDxNY1ByZWZpeD47XG5cbiAgICBAVmlld0NoaWxkKCdjb25uZWN0aW9uQ29udGFpbmVyJywgeyBzdGF0aWM6IHRydWUgfSkgY29ubmVjdGlvbkNvbnRhaW5lclJlZjogRWxlbWVudFJlZjtcblxuICAgIC8vIFVuaXF1ZSBpZCBmb3IgdGhlIGludGVybmFsIGZvcm0gZmllbGQgbGFiZWwuXG4gICAgbGFiZWxJZCA9IGBtYy1mb3JtLWZpZWxkLWxhYmVsLSR7bmV4dFVuaXF1ZUlkKyt9YDtcblxuICAgIGhvdmVyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNhbkNsZWFuZXJDbGVhckJ5RXNjOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHN1cGVyKF9lbGVtZW50UmVmKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIGlmICgodGhpcy5jb250cm9sIGFzIGFueSkubnVtYmVySW5wdXQgJiYgdGhpcy5oYXNDbGVhbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFuZXIgPSBudWxsO1xuICAgICAgICAgICAgdGhyb3cgZ2V0TWNGb3JtRmllbGRZb3VDYW5Ob3RVc2VDbGVhbmVySW5OdW1iZXJJbnB1dEVycm9yKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbGlkYXRlQ29udHJvbENoaWxkKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udHJvbC5jb250cm9sVHlwZSkge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoYG1jLWZvcm0tZmllbGQtdHlwZS0ke3RoaXMuY29udHJvbC5jb250cm9sVHlwZX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN1YnNjcmliZSB0byBjaGFuZ2VzIGluIHRoZSBjaGlsZCBjb250cm9sIHN0YXRlIGluIG9yZGVyIHRvIHVwZGF0ZSB0aGUgZm9ybSBmaWVsZCBVSS5cbiAgICAgICAgdGhpcy5jb250cm9sLnN0YXRlQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoc3RhcnRXaXRoKCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLmhhc1N0ZXBwZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RlcHBlci5jb25uZWN0VG8oKHRoaXMuY29udHJvbCBhcyBhbnkpLm51bWJlcklucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJ1biBjaGFuZ2UgZGV0ZWN0aW9uIGlmIHRoZSB2YWx1ZSBjaGFuZ2VzLlxuICAgICAgICBjb25zdCB2YWx1ZUNoYW5nZXMgPSB0aGlzLmNvbnRyb2wubmdDb250cm9sICYmIHRoaXMuY29udHJvbC5uZ0NvbnRyb2wudmFsdWVDaGFuZ2VzIHx8IEVNUFRZO1xuXG4gICAgICAgIG1lcmdlKHZhbHVlQ2hhbmdlcylcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUNvbnRyb2xDaGlsZCgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgLy8gQXZvaWQgYW5pbWF0aW9ucyBvbiBsb2FkLlxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgY2xlYXJWYWx1ZSgkZXZlbnQpIHtcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2wgJiYgdGhpcy5jb250cm9sLm5nQ29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sLm5nQ29udHJvbC5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5jb250cm9sLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNvbnRhaW5lckNsaWNrKCRldmVudCkge1xuICAgICAgICBpZiAodGhpcy5jb250cm9sLm9uQ29udGFpbmVyQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5vbkNvbnRhaW5lckNsaWNrKCRldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgICAgIGlmICh0aGlzLmNhbkNsZWFuZXJDbGVhckJ5RXNjICYmIGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSAmJiB0aGlzLmNvbnRyb2wuZm9jdXNlZCAmJiB0aGlzLmhhc0NsZWFuZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2wgJiYgdGhpcy5jb250cm9sLm5nQ29udHJvbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbC5uZ0NvbnRyb2wucmVzZXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSG92ZXJDaGFuZ2VkKGlzSG92ZXJlZDogYm9vbGVhbikge1xuICAgICAgICBpZiAoaXNIb3ZlcmVkICE9PSB0aGlzLmhvdmVyZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaG92ZXJlZCA9IGlzSG92ZXJlZDtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhbiBFbGVtZW50UmVmIGZvciB0aGUgZWxlbWVudCB0aGF0IGEgb3ZlcmxheSBhdHRhY2hlZCB0byB0aGUgZm9ybS1maWVsZCBzaG91bGQgYmVcbiAgICAgKiBwb3NpdGlvbmVkIHJlbGF0aXZlIHRvLlxuICAgICAqL1xuICAgIGdldENvbm5lY3RlZE92ZXJsYXlPcmlnaW4oKTogRWxlbWVudFJlZiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb25Db250YWluZXJSZWYgfHwgdGhpcy5fZWxlbWVudFJlZjtcbiAgICB9XG5cbiAgICAvKiogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgY2xhc3MgZnJvbSB0aGUgTmdDb250cm9sIHNob3VsZCBiZSBmb3J3YXJkZWQgdG8gdGhlIGhvc3QgZWxlbWVudC4gKi9cbiAgICBzaG91bGRGb3J3YXJkKHByb3A6IGtleW9mIE5nQ29udHJvbCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBuZ0NvbnRyb2wgPSB0aGlzLmNvbnRyb2wgPyB0aGlzLmNvbnRyb2wubmdDb250cm9sIDogbnVsbDtcblxuICAgICAgICByZXR1cm4gbmdDb250cm9sICYmIG5nQ29udHJvbFtwcm9wXTtcbiAgICB9XG5cbiAgICAvKiogVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBmb3JtIGZpZWxkJ3MgY29udHJvbCBpcyBtaXNzaW5nLiAqL1xuICAgIHByb3RlY3RlZCB2YWxpZGF0ZUNvbnRyb2xDaGlsZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRyb2wpIHtcbiAgICAgICAgICAgIHRocm93IGdldE1jRm9ybUZpZWxkTWlzc2luZ0NvbnRyb2xFcnJvcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGhhc0hpbnQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpbnQgJiYgdGhpcy5oaW50Lmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgZ2V0IGhhc1N1ZmZpeCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VmZml4ICYmIHRoaXMuc3VmZml4Lmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgZ2V0IGhhc1ByZWZpeCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJlZml4ICYmIHRoaXMucHJlZml4Lmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgZ2V0IGhhc0NsZWFuZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuY2xlYW5lcjtcbiAgICB9XG5cbiAgICBnZXQgaGFzU3RlcHBlcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5zdGVwcGVyO1xuICAgIH1cblxuICAgIGdldCBjYW5TaG93Q2xlYW5lcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQ2xlYW5lciAmJlxuICAgICAgICAgICAgdGhpcy5jb250cm9sICYmXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wubmdDb250cm9sXG4gICAgICAgICAgICAgICAgPyB0aGlzLmNvbnRyb2wubmdDb250cm9sLnZhbHVlICYmICF0aGlzLmNvbnRyb2wuZGlzYWJsZWRcbiAgICAgICAgICAgICAgICA6IGZhbHNlO1xuICAgIH1cblxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbCAmJiB0aGlzLmNvbnRyb2wuZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgZ2V0IGNhblNob3dTdGVwcGVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sICYmICF0aGlzLmRpc2FibGVkICYmICh0aGlzLmNvbnRyb2wuZm9jdXNlZCB8fCB0aGlzLmhvdmVyZWQpO1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1mb3JtLWZpZWxkW21jRm9ybUZpZWxkV2l0aG91dEJvcmRlcnNdJyxcbiAgICBleHBvcnRBczogJ21jRm9ybUZpZWxkV2l0aG91dEJvcmRlcnMnLFxuICAgIGhvc3Q6IHsgY2xhc3M6ICdtYy1mb3JtLWZpZWxkX3dpdGhvdXQtYm9yZGVycycgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0Zvcm1GaWVsZFdpdGhvdXRCb3JkZXJzIHt9XG4iXX0=