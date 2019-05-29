/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { Component, Directive, Input, EventEmitter, Output, ChangeDetectionStrategy, ChangeDetectorRef, ContentChild, ContentChildren, ElementRef, ViewChild, ViewEncapsulation, NgModule } from '@angular/core';
import { __extends } from 'tslib';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { mixinColor } from '@ptsecurity/mosaic/core';
import { EMPTY, merge } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { McIconModule } from '@ptsecurity/mosaic/icon';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McCleaner = /** @class */ (function () {
    function McCleaner() {
    }
    McCleaner.decorators = [
        { type: Component, args: [{
                    selector: 'mc-cleaner',
                    template: '<i class="mc-icon_light" mc-icon="mc-close-M_16" color="second"></i>'
                },] },
    ];
    return McCleaner;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An interface which allows a control to work inside of a `MсFormField`.
 * @abstract
 * @template T
 */
var  /**
 * An interface which allows a control to work inside of a `MсFormField`.
 * @abstract
 * @template T
 */
McFormFieldControl = /** @class */ (function () {
    function McFormFieldControl() {
    }
    return McFormFieldControl;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function getMcFormFieldMissingControlError() {
    return Error('mc-form-field must contain a McFormFieldControl.');
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An interface which allows a control to work inside of a `MсFormField`.
 * @abstract
 * @template T
 */
var  /**
 * An interface which allows a control to work inside of a `MсFormField`.
 * @abstract
 * @template T
 */
McFormFieldNumberControl = /** @class */ (function () {
    function McFormFieldNumberControl() {
    }
    return McFormFieldNumberControl;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var nextUniqueId = 0;
var McHint = /** @class */ (function () {
    function McHint() {
        this.id = "mc-hint-" + nextUniqueId++;
    }
    McHint.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-hint',
                    host: {
                        class: 'mc-hint',
                        '[attr.id]': 'id'
                    }
                },] },
    ];
    McHint.propDecorators = {
        id: [{ type: Input }]
    };
    return McHint;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McPrefix = /** @class */ (function () {
    function McPrefix() {
    }
    McPrefix.decorators = [
        { type: Directive, args: [{
                    selector: '[mcPrefix]'
                },] },
    ];
    return McPrefix;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McStepper = /** @class */ (function () {
    function McStepper() {
        this.stepUp = new EventEmitter();
        this.stepDown = new EventEmitter();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    McStepper.prototype.onStepUp = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.stepUp.emit();
        $event.preventDefault();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    McStepper.prototype.onStepDown = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.stepDown.emit();
        $event.preventDefault();
    };
    McStepper.decorators = [
        { type: Component, args: [{
                    selector: 'mc-stepper',
                    template: "\n        <i class=\"mc mc-icon mc-icon_light mc-second mc-stepper-step-up mc-angle-down-L_16\"\n           (mousedown)=\"onStepUp($event)\">\n        </i>\n        <i class=\"mc mc-icon mc-icon_light mc-second mc-stepper-step-down mc-angle-down-L_16\"\n           (mousedown)=\"onStepDown($event)\">\n        </i>\n    "
                },] },
    ];
    McStepper.propDecorators = {
        stepUp: [{ type: Output }],
        stepDown: [{ type: Output }]
    };
    return McStepper;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McSuffix = /** @class */ (function () {
    function McSuffix() {
    }
    McSuffix.decorators = [
        { type: Directive, args: [{
                    selector: '[mcSuffix]'
                },] },
    ];
    return McSuffix;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var nextUniqueId$1 = 0;
var McFormFieldBase = /** @class */ (function () {
    function McFormFieldBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McFormFieldBase;
}());
/** @type {?} */
var _McFormFieldMixinBase = mixinColor(McFormFieldBase);
var McFormField = /** @class */ (function (_super) {
    __extends(McFormField, _super);
    function McFormField(_elementRef, _changeDetectorRef) {
        var _this = _super.call(this, _elementRef) || this;
        _this._elementRef = _elementRef;
        _this._changeDetectorRef = _changeDetectorRef;
        // Unique id for the internal form field label.
        _this._labelId = "mc-form-field-label-" + nextUniqueId$1++;
        _this.hovered = false;
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
        this._validateControlChild();
        if (this._control.controlType) {
            this._elementRef.nativeElement.classList
                .add("mc-form-field-type-" + this._control.controlType);
            if (this._numberControl && this.hasStepper) {
                this._stepper.stepUp.subscribe(this.onStepUp.bind(this));
                this._stepper.stepDown.subscribe(this.onStepDown.bind(this));
            }
        }
        // Subscribe to changes in the child control state in order to update the form field UI.
        this._control.stateChanges.pipe(startWith())
            .subscribe(function () {
            _this._changeDetectorRef.markForCheck();
        });
        if (this._numberControl) {
            this._numberControl.stateChanges.pipe(startWith())
                .subscribe(function () {
                _this._changeDetectorRef.markForCheck();
            });
        }
        // Run change detection if the value changes.
        /** @type {?} */
        var valueChanges = this._control.ngControl && this._control.ngControl.valueChanges || EMPTY;
        merge(valueChanges)
            .subscribe(function () { return _this._changeDetectorRef.markForCheck(); });
    };
    /**
     * @return {?}
     */
    McFormField.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        this._validateControlChild();
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
        if (this._control && this._control.ngControl) {
            this._control.ngControl.reset();
            this._control.focus();
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
        if (this._control.onContainerClick) {
            this._control.onContainerClick($event);
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
        if (event.keyCode === ESCAPE && this._control.focused && this.hasCleaner) {
            if (this._control && this._control.ngControl) {
                this._control.ngControl.reset();
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
     * @return {?}
     */
    McFormField.prototype.onStepUp = /**
     * @return {?}
     */
    function () {
        if (this._numberControl) {
            this._numberControl.stepUp(this._numberControl.step);
        }
    };
    /**
     * @return {?}
     */
    McFormField.prototype.onStepDown = /**
     * @return {?}
     */
    function () {
        if (this._numberControl) {
            this._numberControl.stepDown(this._numberControl.step);
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
    McFormField.prototype._shouldForward = /**
     * Determines whether a class from the NgControl should be forwarded to the host element.
     * @param {?} prop
     * @return {?}
     */
    function (prop) {
        /** @type {?} */
        var ngControl = this._control ? this._control.ngControl : null;
        return ngControl && ngControl[prop];
    };
    /** Throws an error if the form field's control is missing. */
    /**
     * Throws an error if the form field's control is missing.
     * @protected
     * @return {?}
     */
    McFormField.prototype._validateControlChild = /**
     * Throws an error if the form field's control is missing.
     * @protected
     * @return {?}
     */
    function () {
        if (!this._control) {
            throw getMcFormFieldMissingControlError();
        }
    };
    Object.defineProperty(McFormField.prototype, "hasHint", {
        get: /**
         * @return {?}
         */
        function () {
            return this._hint && this._hint.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "hasSuffix", {
        get: /**
         * @return {?}
         */
        function () {
            return this._suffix && this._suffix.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "hasPrefix", {
        get: /**
         * @return {?}
         */
        function () {
            return this._prefix && this._prefix.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "hasCleaner", {
        get: /**
         * @return {?}
         */
        function () {
            return this._cleaner && this._cleaner.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "hasStepper", {
        get: /**
         * @return {?}
         */
        function () {
            return !!this._stepper;
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
                this._control &&
                this._control.ngControl
                ? this._control.ngControl.value && !this._control.disabled
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
            return this._control && this._control.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "canShowStepper", {
        get: /**
         * @return {?}
         */
        function () {
            return this._numberControl &&
                !this.disabled &&
                (this._numberControl.focused ||
                    this.hovered);
        },
        enumerable: true,
        configurable: true
    });
    McFormField.decorators = [
        { type: Component, args: [{
                    selector: 'mc-form-field',
                    exportAs: 'mcFormField',
                    template: "<div class=\"mc-form-field__container\" (click)=\"onContainerClick($event)\"><div class=\"mc-form-field__prefix\" *ngIf=\"hasPrefix\"><ng-content select=\"[mcPrefix]\"></ng-content></div><div class=\"mc-form-field__infix\"><ng-content></ng-content></div><div class=\"mc-form-field__suffix\" *ngIf=\"hasSuffix\"><ng-content select=\"[mcSuffix]\"></ng-content></div><div class=\"mc-form-field__cleaner\" *ngIf=\"canShowCleaner && !hasSuffix\" (click)=\"clearValue($event)\"><ng-content select=\"mc-cleaner\"></ng-content></div><ng-content *ngIf=\"canShowStepper\" select=\"mc-stepper\"></ng-content></div><div class=\"mc-form-field__hint\" *ngIf=\"hasHint\"><ng-content select=\"mc-hint\"></ng-content></div>",
                    // McInput is a directive and can't have styles, so we need to include its styles here.
                    // The McInput styles are fairly minimal so it shouldn't be a big deal for people who
                    // aren't using McInput.
                    styles: [".mc-form-field{position:relative;display:inline-block;width:100%}.mc-form-field__hint{margin-top:4px}.mc-form-field__container{position:relative;border-width:1px;border-style:solid;border-color:initial;border-radius:3px}.mc-form-field_without-borders .mc-form-field__container{border-color:transparent}.mc-form-field__prefix,.mc-form-field__suffix{position:absolute;top:0;bottom:0;width:32px;display:flex;flex-direction:row;justify-content:center;align-items:center}.mc-form-field__prefix{left:0}.mc-form-field__suffix{right:0}.mc-form-field_has-cleaner .mc-input,.mc-form-field_has-stepper .mc-input,.mc-form-field_has-suffix .mc-input{padding-right:32px}.mc-form-field_has-prefix .mc-input{padding-left:32px}mc-cleaner{position:absolute;display:flex;flex-direction:row;justify-content:center;align-items:center;top:0;bottom:0;right:0;width:32px;cursor:pointer}mc-stepper{position:absolute;display:flex;flex-direction:column;justify-content:center;align-items:center;top:0;bottom:0;right:0;width:32px}mc-stepper .mc-stepper-step-down,mc-stepper .mc-stepper-step-up{cursor:pointer;width:32px;text-align:center}mc-stepper .mc-stepper-step-up{transform:scaleY(-1)} .mc-input{background:0 0;padding:0;margin:0;border:none;outline:0;box-sizing:border-box;padding:5px 16px;width:100%;min-height:30px}.mc-input::-ms-clear{display:none;width:0;height:0}.mc-input::-ms-reveal{display:none;width:0;height:0}.mc-input::-webkit-search-cancel-button,.mc-input::-webkit-search-decoration,.mc-input::-webkit-search-results-button,.mc-input::-webkit-search-results-decoration{display:none}.mc-input{display:inline-block}input.mc-input[type=number]{-moz-appearance:textfield}input.mc-input[type=number]::-webkit-inner-spin-button,input.mc-input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}input.mc-input:invalid{box-shadow:unset} .mc-textarea{background:0 0;margin:0;border:none;outline:0;resize:none;overflow:auto;width:100%;box-sizing:border-box;padding:5px 16px}.mc-textarea{display:inline-block;-webkit-appearance:none;vertical-align:bottom}.mc-textarea:not(.mc-textarea-resizable){box-sizing:border-box;overflow-y:hidden}.mc-textarea.mc-textarea-resizable{resize:vertical;min-height:50px}.mc-textarea:invalid{box-shadow:unset}"],
                    host: {
                        class: 'mc-form-field',
                        '[class.mc-form-field_invalid]': '_control.errorState',
                        '[class.mc-disabled]': '_control.disabled',
                        '[class.mc-form-field_has-prefix]': 'hasPrefix',
                        '[class.mc-form-field_has-suffix]': 'hasSuffix',
                        '[class.mc-form-field_has-cleaner]': 'canShowCleaner',
                        '[class.mc-form-field_has-stepper]': 'canShowStepper',
                        '[class.mc-focused]': '_control.focused',
                        '[class.ng-untouched]': '_shouldForward("untouched")',
                        '[class.ng-touched]': '_shouldForward("touched")',
                        '[class.ng-pristine]': '_shouldForward("pristine")',
                        '[class.ng-dirty]': '_shouldForward("dirty")',
                        '[class.ng-valid]': '_shouldForward("valid")',
                        '[class.ng-invalid]': '_shouldForward("invalid")',
                        '[class.ng-pending]': '_shouldForward("pending")',
                        '(keydown)': 'onKeyDown($event)',
                        '(mouseenter)': 'onHoverChanged(true)',
                        '(mouseleave)': 'onHoverChanged(false)'
                    },
                    inputs: ['color'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    McFormField.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    McFormField.propDecorators = {
        _control: [{ type: ContentChild, args: [McFormFieldControl,] }],
        _numberControl: [{ type: ContentChild, args: [McFormFieldNumberControl,] }],
        _stepper: [{ type: ContentChild, args: [McStepper,] }],
        _hint: [{ type: ContentChildren, args: [McHint,] }],
        _suffix: [{ type: ContentChildren, args: [McSuffix,] }],
        _prefix: [{ type: ContentChildren, args: [McPrefix,] }],
        _cleaner: [{ type: ContentChildren, args: [McCleaner,] }],
        connectionContainerRef: [{ type: ViewChild, args: ['connectionContainer',] }]
    };
    return McFormField;
}(_McFormFieldMixinBase));
var McFormFieldWithoutBorders = /** @class */ (function () {
    function McFormFieldWithoutBorders() {
    }
    McFormFieldWithoutBorders.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-form-field[mcFormFieldWithoutBorders]',
                    exportAs: 'mcFormFieldWithoutBorders',
                    host: { class: 'mc-form-field_without-borders' }
                },] },
    ];
    return McFormFieldWithoutBorders;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McFormFieldModule = /** @class */ (function () {
    function McFormFieldModule() {
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
                },] },
    ];
    return McFormFieldModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McFormFieldModule, McFormFieldBase, _McFormFieldMixinBase, McFormField, McFormFieldWithoutBorders, McFormFieldControl, McFormFieldNumberControl, getMcFormFieldMissingControlError, McHint, McSuffix, McPrefix, McCleaner, McStepper };
//# sourceMappingURL=form-field.es5.js.map
