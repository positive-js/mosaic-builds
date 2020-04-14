/**
 * @fileoverview added by tsickle
 * Generated from: textarea.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, Inject, Input, Optional, Self, InjectionToken, NgZone } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher, mixinErrorState } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { fromEvent, Subject } from 'rxjs';
/** @type {?} */
export var MC_TEXTAREA_VALUE_ACCESSOR = new InjectionToken('MC_TEXTAREA_VALUE_ACCESSOR');
/** @type {?} */
var nextUniqueId = 0;
var McTextareaBase = /** @class */ (function () {
    function McTextareaBase(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
        this.defaultErrorStateMatcher = defaultErrorStateMatcher;
        this.parentForm = parentForm;
        this.parentFormGroup = parentFormGroup;
        this.ngControl = ngControl;
    }
    return McTextareaBase;
}());
export { McTextareaBase };
if (false) {
    /** @type {?} */
    McTextareaBase.prototype.defaultErrorStateMatcher;
    /** @type {?} */
    McTextareaBase.prototype.parentForm;
    /** @type {?} */
    McTextareaBase.prototype.parentFormGroup;
    /** @type {?} */
    McTextareaBase.prototype.ngControl;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export var McTextareaMixinBase = mixinErrorState(McTextareaBase);
var McTextarea = /** @class */ (function (_super) {
    __extends(McTextarea, _super);
    function McTextarea(elementRef, ngControl, parentForm, parentFormGroup, defaultErrorStateMatcher, inputValueAccessor, ngZone) {
        var _this = _super.call(this, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) || this;
        _this.elementRef = elementRef;
        _this.ngControl = ngControl;
        _this.ngZone = ngZone;
        _this.canGrow = true;
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         */
        _this.focused = false;
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         */
        _this.stateChanges = new Subject();
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         */
        _this.controlType = 'mc-textarea';
        _this.uid = "mc-textsrea-" + nextUniqueId++;
        _this._disabled = false;
        _this._required = false;
        _this.lineHeight = 0;
        _this.freeRowsHeight = 0;
        _this.minHeight = 0;
        // If no input value accessor was explicitly specified, use the element as the textarea value
        // accessor.
        _this.valueAccessor = inputValueAccessor || _this.elementRef.nativeElement;
        _this.previousNativeValue = _this.value;
        // Force setter to be called in case id was not specified.
        _this.id = _this.id;
        /** @type {?} */
        var growObserver = fromEvent(elementRef.nativeElement, 'input');
        _this.growSubscription = growObserver.subscribe(_this.grow.bind(_this));
        return _this;
    }
    Object.defineProperty(McTextarea.prototype, "disabled", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            if (this.ngControl && this.ngControl.disabled !== null) {
                return this.ngControl.disabled;
            }
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = coerceBooleanProperty(value);
            if (this.focused) {
                this.focused = false;
                this.stateChanges.next();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTextarea.prototype, "id", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            return this._id;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._id = value || this.uid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTextarea.prototype, "required", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            return this._required;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._required = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTextarea.prototype, "value", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            return this.valueAccessor.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this.value) {
                this.valueAccessor.value = value;
                this.stateChanges.next();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McTextarea.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () { return _this.grow(); }), 0);
        this.lineHeight = parseInt((/** @type {?} */ (getComputedStyle(this.elementRef.nativeElement).lineHeight)), 10);
        /** @type {?} */
        var paddingTop = parseInt((/** @type {?} */ (getComputedStyle(this.elementRef.nativeElement).paddingTop)), 10);
        /** @type {?} */
        var paddingBottom = parseInt((/** @type {?} */ (getComputedStyle(this.elementRef.nativeElement).paddingBottom)), 10);
        // tslint:disable-next-line:no-magic-numbers
        this.minHeight = this.lineHeight * 2 + paddingTop + paddingBottom;
        this.freeRowsHeight = this.lineHeight;
    };
    /**
     * @return {?}
     */
    McTextarea.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.stateChanges.next();
    };
    /**
     * @return {?}
     */
    McTextarea.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stateChanges.complete();
        this.growSubscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    McTextarea.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
        // We need to dirty-check the native element's value, because there are some cases where
        // we won't be notified when it changes (e.g. the consumer isn't using forms or they're
        // updating the value using `emitEvent: false`).
        this.dirtyCheckNativeValue();
    };
    /** Grow textarea height to avoid vertical scroll  */
    /**
     * Grow textarea height to avoid vertical scroll
     * @return {?}
     */
    McTextarea.prototype.grow = /**
     * Grow textarea height to avoid vertical scroll
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.canGrow) {
            return;
        }
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var textarea = _this.elementRef.nativeElement;
            /** @type {?} */
            var outerHeight = parseInt((/** @type {?} */ (window.getComputedStyle(textarea).height)), 10);
            /** @type {?} */
            var diff = outerHeight - textarea.clientHeight;
            textarea.style.minHeight = 0; // this line is important to height recalculation
            // this line is important to height recalculation
            /** @type {?} */
            var height = Math.max(_this.minHeight, +textarea.scrollHeight + diff + _this.freeRowsHeight);
            textarea.style.minHeight = height + "px";
        }));
    };
    /** Focuses the textarea. */
    /**
     * Focuses the textarea.
     * @return {?}
     */
    McTextarea.prototype.focus = /**
     * Focuses the textarea.
     * @return {?}
     */
    function () {
        this.elementRef.nativeElement.focus();
    };
    /** Callback for the cases where the focused state of the textarea changes. */
    /**
     * Callback for the cases where the focused state of the textarea changes.
     * @param {?} isFocused
     * @return {?}
     */
    McTextarea.prototype.focusChanged = /**
     * Callback for the cases where the focused state of the textarea changes.
     * @param {?} isFocused
     * @return {?}
     */
    function (isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    };
    Object.defineProperty(McTextarea.prototype, "empty", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            return !this.elementRef.nativeElement.value && !this.isBadInput();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    McTextarea.prototype.onContainerClick = /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    function () {
        this.focus();
    };
    /** Does some manual dirty checking on the native textarea `value` property. */
    /**
     * Does some manual dirty checking on the native textarea `value` property.
     * @protected
     * @return {?}
     */
    McTextarea.prototype.dirtyCheckNativeValue = /**
     * Does some manual dirty checking on the native textarea `value` property.
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var newValue = this.value;
        if (this.previousNativeValue !== newValue) {
            this.previousNativeValue = newValue;
            this.stateChanges.next();
        }
    };
    /** Checks whether the textarea is invalid based on the native validation. */
    /**
     * Checks whether the textarea is invalid based on the native validation.
     * @protected
     * @return {?}
     */
    McTextarea.prototype.isBadInput = /**
     * Checks whether the textarea is invalid based on the native validation.
     * @protected
     * @return {?}
     */
    function () {
        // The `validity` property won't be present on platform-server.
        /** @type {?} */
        var validity = ((/** @type {?} */ (this.elementRef.nativeElement))).validity;
        return validity && validity.badInput;
    };
    McTextarea.decorators = [
        { type: Directive, args: [{
                    selector: 'textarea[mcTextarea]',
                    exportAs: 'mcTextarea',
                    host: {
                        class: 'mc-textarea',
                        '[class.mc-textarea-resizable]': '!canGrow',
                        '[attr.id]': 'id',
                        '[attr.placeholder]': 'placeholder',
                        '[attr.aria-invalid]': 'errorState',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.required]': 'required',
                        '(blur)': 'focusChanged(false)',
                        '(focus)': 'focusChanged(true)'
                    },
                    providers: [{ provide: McFormFieldControl, useExisting: McTextarea }]
                },] }
    ];
    /** @nocollapse */
    McTextarea.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgControl, decorators: [{ type: Optional }, { type: Self }] },
        { type: NgForm, decorators: [{ type: Optional }] },
        { type: FormGroupDirective, decorators: [{ type: Optional }] },
        { type: ErrorStateMatcher },
        { type: undefined, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [MC_TEXTAREA_VALUE_ACCESSOR,] }] },
        { type: NgZone }
    ]; };
    McTextarea.propDecorators = {
        canGrow: [{ type: Input }],
        errorStateMatcher: [{ type: Input }],
        disabled: [{ type: Input }],
        id: [{ type: Input }],
        placeholder: [{ type: Input }],
        required: [{ type: Input }],
        value: [{ type: Input }]
    };
    return McTextarea;
}(McTextareaMixinBase));
export { McTextarea };
if (false) {
    /** @type {?} */
    McTextarea.prototype.canGrow;
    /**
     * An object used to control when error messages are shown.
     * @type {?}
     */
    McTextarea.prototype.errorStateMatcher;
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @type {?}
     */
    McTextarea.prototype.focused;
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @type {?}
     */
    McTextarea.prototype.stateChanges;
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @type {?}
     */
    McTextarea.prototype.controlType;
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @type {?}
     */
    McTextarea.prototype.placeholder;
    /**
     * @type {?}
     * @protected
     */
    McTextarea.prototype.uid;
    /**
     * @type {?}
     * @protected
     */
    McTextarea.prototype.previousNativeValue;
    /**
     * @type {?}
     * @private
     */
    McTextarea.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    McTextarea.prototype._id;
    /**
     * @type {?}
     * @private
     */
    McTextarea.prototype._required;
    /**
     * @type {?}
     * @private
     */
    McTextarea.prototype.valueAccessor;
    /**
     * @type {?}
     * @private
     */
    McTextarea.prototype.growSubscription;
    /**
     * @type {?}
     * @private
     */
    McTextarea.prototype.lineHeight;
    /**
     * @type {?}
     * @private
     */
    McTextarea.prototype.freeRowsHeight;
    /**
     * @type {?}
     * @private
     */
    McTextarea.prototype.minHeight;
    /**
     * @type {?}
     * @protected
     */
    McTextarea.prototype.elementRef;
    /** @type {?} */
    McTextarea.prototype.ngControl;
    /**
     * @type {?}
     * @private
     */
    McTextarea.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RleHRhcmVhLyIsInNvdXJjZXMiOlsidGV4dGFyZWEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDSCxTQUFTLEVBQVcsVUFBVSxFQUFFLE1BQU0sRUFDdEMsS0FBSyxFQUF3QixRQUFRLEVBQ3JDLElBQUksRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUMvQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sRUFHSCxpQkFBaUIsRUFDakIsZUFBZSxFQUNsQixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxTQUFTLEVBQWdCLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFHeEQsTUFBTSxLQUFPLDBCQUEwQixHQUFHLElBQUksY0FBYyxDQUFpQiw0QkFBNEIsQ0FBQzs7SUFFdEcsWUFBWSxHQUFHLENBQUM7QUFHcEI7SUFDSSx3QkFDVyx3QkFBMkMsRUFDM0MsVUFBa0IsRUFDbEIsZUFBbUMsRUFDbkMsU0FBb0I7UUFIcEIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUFtQjtRQUMzQyxlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ2xCLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtRQUNuQyxjQUFTLEdBQVQsU0FBUyxDQUFXO0lBQzVCLENBQUM7SUFDUixxQkFBQztBQUFELENBQUMsQUFQRCxJQU9DOzs7O0lBTE8sa0RBQWtEOztJQUNsRCxvQ0FBeUI7O0lBQ3pCLHlDQUEwQzs7SUFDMUMsbUNBQTJCOzs7O0FBS25DLE1BQU0s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QUsvQyw0QkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsIERvQ2hlY2ssIEVsZW1lbnRSZWYsIEluamVjdCxcbiAgICBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9wdGlvbmFsLFxuICAgIFNlbGYsIEluamVjdGlvblRva2VuLCBOZ1pvbmUsIE9uSW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cERpcmVjdGl2ZSwgTmdDb250cm9sLCBOZ0Zvcm0gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICAgIENhblVwZGF0ZUVycm9yU3RhdGUsXG4gICAgQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IsXG4gICAgRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgbWl4aW5FcnJvclN0YXRlXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IE1jRm9ybUZpZWxkQ29udHJvbCB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9mb3JtLWZpZWxkJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cblxuZXhwb3J0IGNvbnN0IE1DX1RFWFRBUkVBX1ZBTFVFX0FDQ0VTU09SID0gbmV3IEluamVjdGlvblRva2VuPHsgdmFsdWU6IGFueSB9PignTUNfVEVYVEFSRUFfVkFMVUVfQUNDRVNTT1InKTtcblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cblxuZXhwb3J0IGNsYXNzIE1jVGV4dGFyZWFCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgICAgIHB1YmxpYyBwYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgICAgIHB1YmxpYyBwYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICAgICAgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sXG4gICAgKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1RleHRhcmVhTWl4aW5CYXNlOiBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvciAmIHR5cGVvZiBNY1RleHRhcmVhQmFzZSA9IG1peGluRXJyb3JTdGF0ZShNY1RleHRhcmVhQmFzZSk7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAndGV4dGFyZWFbbWNUZXh0YXJlYV0nLFxuICAgIGV4cG9ydEFzOiAnbWNUZXh0YXJlYScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRleHRhcmVhJyxcbiAgICAgICAgJ1tjbGFzcy5tYy10ZXh0YXJlYS1yZXNpemFibGVdJzogJyFjYW5Hcm93JyxcblxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAgICAgJ1thdHRyLnBsYWNlaG9sZGVyXSc6ICdwbGFjZWhvbGRlcicsXG4gICAgICAgICdbYXR0ci5hcmlhLWludmFsaWRdJzogJ2Vycm9yU3RhdGUnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICAgICAnW2F0dHIucmVxdWlyZWRdJzogJ3JlcXVpcmVkJyxcblxuICAgICAgICAnKGJsdXIpJzogJ2ZvY3VzQ2hhbmdlZChmYWxzZSknLFxuICAgICAgICAnKGZvY3VzKSc6ICdmb2N1c0NoYW5nZWQodHJ1ZSknXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE1jRm9ybUZpZWxkQ29udHJvbCwgdXNlRXhpc3Rpbmc6IE1jVGV4dGFyZWEgfV1cbn0pXG5leHBvcnQgY2xhc3MgTWNUZXh0YXJlYSBleHRlbmRzIE1jVGV4dGFyZWFNaXhpbkJhc2UgaW1wbGVtZW50cyBNY0Zvcm1GaWVsZENvbnRyb2w8YW55PiwgT25Jbml0LCBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LCBEb0NoZWNrLCBDYW5VcGRhdGVFcnJvclN0YXRlIHtcblxuICAgIEBJbnB1dCgpIGNhbkdyb3c6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEFuIG9iamVjdCB1c2VkIHRvIGNvbnRyb2wgd2hlbiBlcnJvciBtZXNzYWdlcyBhcmUgc2hvd24uICovXG4gICAgQElucHV0KCkgZXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICByZWFkb25seSBzdGF0ZUNoYW5nZXM6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGNvbnRyb2xUeXBlOiBzdHJpbmcgPSAnbWMtdGV4dGFyZWEnO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5uZ0NvbnRyb2wgJiYgdGhpcy5uZ0NvbnRyb2wuZGlzYWJsZWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5nQ29udHJvbC5kaXNhYmxlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG5cbiAgICBzZXQgaWQodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9pZCA9IHZhbHVlIHx8IHRoaXMudWlkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7XG4gICAgfVxuXG4gICAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgdmFsdWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVBY2Nlc3Nvci52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWVBY2Nlc3Nvci52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVpZCA9IGBtYy10ZXh0c3JlYS0ke25leHRVbmlxdWVJZCsrfWA7XG4gICAgcHJvdGVjdGVkIHByZXZpb3VzTmF0aXZlVmFsdWU6IGFueTtcbiAgICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2lkOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfcmVxdWlyZWQgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgdmFsdWVBY2Nlc3NvcjogeyB2YWx1ZTogYW55IH07XG4gICAgcHJpdmF0ZSBncm93U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBwcml2YXRlIGxpbmVIZWlnaHQ6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBmcmVlUm93c0hlaWdodDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIG1pbkhlaWdodDogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgICAgIEBPcHRpb25hbCgpIHBhcmVudEZvcm06IE5nRm9ybSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgICAgIGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgQEluamVjdChNQ19URVhUQVJFQV9WQUxVRV9BQ0NFU1NPUikgaW5wdXRWYWx1ZUFjY2Vzc29yOiBhbnksXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmVcbiAgICApIHtcbiAgICAgICAgc3VwZXIoZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyLCBwYXJlbnRGb3JtLCBwYXJlbnRGb3JtR3JvdXAsIG5nQ29udHJvbCk7XG4gICAgICAgIC8vIElmIG5vIGlucHV0IHZhbHVlIGFjY2Vzc29yIHdhcyBleHBsaWNpdGx5IHNwZWNpZmllZCwgdXNlIHRoZSBlbGVtZW50IGFzIHRoZSB0ZXh0YXJlYSB2YWx1ZVxuICAgICAgICAvLyBhY2Nlc3Nvci5cbiAgICAgICAgdGhpcy52YWx1ZUFjY2Vzc29yID0gaW5wdXRWYWx1ZUFjY2Vzc29yIHx8IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIHRoaXMucHJldmlvdXNOYXRpdmVWYWx1ZSA9IHRoaXMudmFsdWU7XG5cbiAgICAgICAgLy8gRm9yY2Ugc2V0dGVyIHRvIGJlIGNhbGxlZCBpbiBjYXNlIGlkIHdhcyBub3Qgc3BlY2lmaWVkLlxuICAgICAgICB0aGlzLmlkID0gdGhpcy5pZDtcblxuICAgICAgICBjb25zdCBncm93T2JzZXJ2ZXIgPSBmcm9tRXZlbnQoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnaW5wdXQnKTtcblxuICAgICAgICB0aGlzLmdyb3dTdWJzY3JpcHRpb24gPSBncm93T2JzZXJ2ZXIuc3Vic2NyaWJlKHRoaXMuZ3Jvdy5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmdyb3coKSwgMCk7XG4gICAgICAgIHRoaXMubGluZUhlaWdodCA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLmxpbmVIZWlnaHQhLCAxMCk7XG5cbiAgICAgICAgY29uc3QgcGFkZGluZ1RvcCA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLnBhZGRpbmdUb3AhLCAxMCk7XG4gICAgICAgIGNvbnN0IHBhZGRpbmdCb3R0b20gPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5wYWRkaW5nQm90dG9tISwgMTApO1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1tYWdpYy1udW1iZXJzXG4gICAgICAgIHRoaXMubWluSGVpZ2h0ID0gdGhpcy5saW5lSGVpZ2h0ICogMiArIHBhZGRpbmdUb3AgKyBwYWRkaW5nQm90dG9tO1xuICAgICAgICB0aGlzLmZyZWVSb3dzSGVpZ2h0ID0gdGhpcy5saW5lSGVpZ2h0O1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMuZ3Jvd1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgaWYgKHRoaXMubmdDb250cm9sKSB7XG4gICAgICAgICAgICAvLyBXZSBuZWVkIHRvIHJlLWV2YWx1YXRlIHRoaXMgb24gZXZlcnkgY2hhbmdlIGRldGVjdGlvbiBjeWNsZSwgYmVjYXVzZSB0aGVyZSBhcmUgc29tZVxuICAgICAgICAgICAgLy8gZXJyb3IgdHJpZ2dlcnMgdGhhdCB3ZSBjYW4ndCBzdWJzY3JpYmUgdG8gKGUuZy4gcGFyZW50IGZvcm0gc3VibWlzc2lvbnMpLiBUaGlzIG1lYW5zXG4gICAgICAgICAgICAvLyB0aGF0IHdoYXRldmVyIGxvZ2ljIGlzIGluIGhlcmUgaGFzIHRvIGJlIHN1cGVyIGxlYW4gb3Igd2UgcmlzayBkZXN0cm95aW5nIHRoZSBwZXJmb3JtYW5jZS5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlRXJyb3JTdGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgbmVlZCB0byBkaXJ0eS1jaGVjayB0aGUgbmF0aXZlIGVsZW1lbnQncyB2YWx1ZSwgYmVjYXVzZSB0aGVyZSBhcmUgc29tZSBjYXNlcyB3aGVyZVxuICAgICAgICAvLyB3ZSB3b24ndCBiZSBub3RpZmllZCB3aGVuIGl0IGNoYW5nZXMgKGUuZy4gdGhlIGNvbnN1bWVyIGlzbid0IHVzaW5nIGZvcm1zIG9yIHRoZXkncmVcbiAgICAgICAgLy8gdXBkYXRpbmcgdGhlIHZhbHVlIHVzaW5nIGBlbWl0RXZlbnQ6IGZhbHNlYCkuXG4gICAgICAgIHRoaXMuZGlydHlDaGVja05hdGl2ZVZhbHVlKCk7XG4gICAgfVxuXG4gICAgLyoqIEdyb3cgdGV4dGFyZWEgaGVpZ2h0IHRvIGF2b2lkIHZlcnRpY2FsIHNjcm9sbCAgKi9cbiAgICBncm93KCkge1xuICAgICAgICBpZiAoIXRoaXMuY2FuR3Jvdykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGV4dGFyZWEgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgICAgICAgY29uc3Qgb3V0ZXJIZWlnaHQgPSBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0ZXh0YXJlYSkuaGVpZ2h0ISwgMTApO1xuICAgICAgICAgICAgY29uc3QgZGlmZiA9IG91dGVySGVpZ2h0IC0gdGV4dGFyZWEuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgICB0ZXh0YXJlYS5zdHlsZS5taW5IZWlnaHQgPSAwOyAvLyB0aGlzIGxpbmUgaXMgaW1wb3J0YW50IHRvIGhlaWdodCByZWNhbGN1bGF0aW9uXG5cbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IE1hdGgubWF4KHRoaXMubWluSGVpZ2h0LCArdGV4dGFyZWEuc2Nyb2xsSGVpZ2h0ICsgZGlmZiArIHRoaXMuZnJlZVJvd3NIZWlnaHQpO1xuICAgICAgICAgICAgdGV4dGFyZWEuc3R5bGUubWluSGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIEZvY3VzZXMgdGhlIHRleHRhcmVhLiAqL1xuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIC8qKiBDYWxsYmFjayBmb3IgdGhlIGNhc2VzIHdoZXJlIHRoZSBmb2N1c2VkIHN0YXRlIG9mIHRoZSB0ZXh0YXJlYSBjaGFuZ2VzLiAqL1xuICAgIGZvY3VzQ2hhbmdlZChpc0ZvY3VzZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKGlzRm9jdXNlZCAhPT0gdGhpcy5mb2N1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSBpc0ZvY3VzZWQ7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlICYmICF0aGlzLmlzQmFkSW5wdXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgb25Db250YWluZXJDbGljaygpIHtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cblxuICAgIC8qKiBEb2VzIHNvbWUgbWFudWFsIGRpcnR5IGNoZWNraW5nIG9uIHRoZSBuYXRpdmUgdGV4dGFyZWEgYHZhbHVlYCBwcm9wZXJ0eS4gKi9cbiAgICBwcm90ZWN0ZWQgZGlydHlDaGVja05hdGl2ZVZhbHVlKCkge1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMudmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMucHJldmlvdXNOYXRpdmVWYWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNOYXRpdmVWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIHRoZSB0ZXh0YXJlYSBpcyBpbnZhbGlkIGJhc2VkIG9uIHRoZSBuYXRpdmUgdmFsaWRhdGlvbi4gKi9cbiAgICBwcm90ZWN0ZWQgaXNCYWRJbnB1dCgpOiBib29sZWFuIHtcbiAgICAgICAgLy8gVGhlIGB2YWxpZGl0eWAgcHJvcGVydHkgd29uJ3QgYmUgcHJlc2VudCBvbiBwbGF0Zm9ybS1zZXJ2ZXIuXG4gICAgICAgIGNvbnN0IHZhbGlkaXR5ID0gKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQpLnZhbGlkaXR5O1xuXG4gICAgICAgIHJldHVybiB2YWxpZGl0eSAmJiB2YWxpZGl0eS5iYWRJbnB1dDtcbiAgICB9XG5cbn1cbiJdfQ==