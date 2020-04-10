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
                        '[disabled]': 'disabled',
                        '[required]': 'required',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RleHRhcmVhLyIsInNvdXJjZXMiOlsidGV4dGFyZWEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDSCxTQUFTLEVBQVcsVUFBVSxFQUFFLE1BQU0sRUFDdEMsS0FBSyxFQUF3QixRQUFRLEVBQ3JDLElBQUksRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUMvQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sRUFHSCxpQkFBaUIsRUFDakIsZUFBZSxFQUNsQixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxTQUFTLEVBQWdCLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFHeEQsTUFBTSxLQUFPLDBCQUEwQixHQUNuQyxJQUFJLGNBQWMsQ0FBaUIsNEJBQTRCLENBQUM7O0lBRWhFLFlBQVksR0FBRyxDQUFDO0FBR3BCO0lBQ0ksd0JBQW1CLHdCQUEyQyxFQUMzQyxVQUFrQixFQUNsQixlQUFtQyxFQUNuQyxTQUFvQjtRQUhwQiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQW1CO1FBQzNDLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDbEIsb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBQ25DLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFDdkMsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7Ozs7SUFMZSxrREFBa0Q7O0lBQ2xELG9DQUF5Qjs7SUFDekIseUNBQTBDOztJQUMxQyxtQ0FBMkI7Ozs7QUFLM0MsTUFB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Sy9DLDRCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIERpcmVjdGl2ZSwgRG9DaGVjaywgRWxlbWVudFJlZiwgSW5qZWN0LFxuICAgIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3B0aW9uYWwsXG4gICAgU2VsZiwgSW5qZWN0aW9uVG9rZW4sIE5nWm9uZSwgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwRGlyZWN0aXZlLCBOZ0NvbnRyb2wsIE5nRm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gICAgQ2FuVXBkYXRlRXJyb3JTdGF0ZSxcbiAgICBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvcixcbiAgICBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICBtaXhpbkVycm9yU3RhdGVcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNGb3JtRmllbGRDb250cm9sIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJzY3JpcHRpb24sIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuXG5leHBvcnQgY29uc3QgTUNfVEVYVEFSRUFfVkFMVUVfQUNDRVNTT1IgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjx7IHZhbHVlOiBhbnkgfT4oJ01DX1RFWFRBUkVBX1ZBTFVFX0FDQ0VTU09SJyk7XG5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG5cbmV4cG9ydCBjbGFzcyBNY1RleHRhcmVhQmFzZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgICAgICAgICAgICAgcHVibGljIHBhcmVudEZvcm06IE5nRm9ybSxcbiAgICAgICAgICAgICAgICBwdWJsaWMgcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgICAgICAgICAgICAgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sKSB7XG4gICAgfVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1RleHRhcmVhTWl4aW5CYXNlOiBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvciAmIHR5cGVvZiBNY1RleHRhcmVhQmFzZSA9IG1peGluRXJyb3JTdGF0ZShNY1RleHRhcmVhQmFzZSk7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAndGV4dGFyZWFbbWNUZXh0YXJlYV0nLFxuICAgIGV4cG9ydEFzOiAnbWNUZXh0YXJlYScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRleHRhcmVhJyxcbiAgICAgICAgJ1tjbGFzcy5tYy10ZXh0YXJlYS1yZXNpemFibGVdJzogJyFjYW5Hcm93JyxcbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCcsXG4gICAgICAgICdbYXR0ci5wbGFjZWhvbGRlcl0nOiAncGxhY2Vob2xkZXInLFxuICAgICAgICAnW2F0dHIuYXJpYS1pbnZhbGlkXSc6ICdlcnJvclN0YXRlJyxcbiAgICAgICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICAgICAnW3JlcXVpcmVkXSc6ICdyZXF1aXJlZCcsXG4gICAgICAgICcoYmx1ciknOiAnZm9jdXNDaGFuZ2VkKGZhbHNlKScsXG4gICAgICAgICcoZm9jdXMpJzogJ2ZvY3VzQ2hhbmdlZCh0cnVlKSdcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTWNGb3JtRmllbGRDb250cm9sLCB1c2VFeGlzdGluZzogTWNUZXh0YXJlYSB9XVxufSlcbmV4cG9ydCBjbGFzcyBNY1RleHRhcmVhIGV4dGVuZHMgTWNUZXh0YXJlYU1peGluQmFzZSBpbXBsZW1lbnRzIE1jRm9ybUZpZWxkQ29udHJvbDxhbnk+LCBPbkluaXQsIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksIERvQ2hlY2ssIENhblVwZGF0ZUVycm9yU3RhdGUge1xuXG4gICAgQElucHV0KCkgY2FuR3JvdzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogQW4gb2JqZWN0IHVzZWQgdG8gY29udHJvbCB3aGVuIGVycm9yIG1lc3NhZ2VzIGFyZSBzaG93bi4gKi9cbiAgICBASW5wdXQoKSBlcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXI7XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIHJlYWRvbmx5IHN0YXRlQ2hhbmdlczogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgY29udHJvbFR5cGU6IHN0cmluZyA9ICdtYy10ZXh0YXJlYSc7XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLm5nQ29udHJvbCAmJiB0aGlzLm5nQ29udHJvbC5kaXNhYmxlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmdDb250cm9sLmRpc2FibGVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZm9jdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cblxuICAgIHNldCBpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2lkID0gdmFsdWUgfHwgdGhpcy51aWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXF1aXJlZDtcbiAgICB9XG5cbiAgICBzZXQgcmVxdWlyZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fcmVxdWlyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZUFjY2Vzc29yLnZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZUFjY2Vzc29yLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdWlkID0gYG1jLXRleHRzcmVhLSR7bmV4dFVuaXF1ZUlkKyt9YDtcbiAgICBwcm90ZWN0ZWQgcHJldmlvdXNOYXRpdmVWYWx1ZTogYW55O1xuICAgIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcbiAgICBwcml2YXRlIF9yZXF1aXJlZCA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSB2YWx1ZUFjY2Vzc29yOiB7IHZhbHVlOiBhbnkgfTtcbiAgICBwcml2YXRlIGdyb3dTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIHByaXZhdGUgbGluZUhlaWdodDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGZyZWVSb3dzSGVpZ2h0OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgbWluSGVpZ2h0OiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgcGFyZW50Rm9ybTogTmdGb3JtLFxuICAgICAgICAgICAgICAgIEBPcHRpb25hbCgpIHBhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgICAgICAgICAgICAgIGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE1DX1RFWFRBUkVBX1ZBTFVFX0FDQ0VTU09SKSBpbnB1dFZhbHVlQWNjZXNzb3I6IGFueSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XG4gICAgICAgIHN1cGVyKGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlciwgcGFyZW50Rm9ybSwgcGFyZW50Rm9ybUdyb3VwLCBuZ0NvbnRyb2wpO1xuICAgICAgICAvLyBJZiBubyBpbnB1dCB2YWx1ZSBhY2Nlc3NvciB3YXMgZXhwbGljaXRseSBzcGVjaWZpZWQsIHVzZSB0aGUgZWxlbWVudCBhcyB0aGUgdGV4dGFyZWEgdmFsdWVcbiAgICAgICAgLy8gYWNjZXNzb3IuXG4gICAgICAgIHRoaXMudmFsdWVBY2Nlc3NvciA9IGlucHV0VmFsdWVBY2Nlc3NvciB8fCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgICB0aGlzLnByZXZpb3VzTmF0aXZlVmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgICAgIC8vIEZvcmNlIHNldHRlciB0byBiZSBjYWxsZWQgaW4gY2FzZSBpZCB3YXMgbm90IHNwZWNpZmllZC5cbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuaWQ7XG5cbiAgICAgICAgY29uc3QgZ3Jvd09ic2VydmVyID0gZnJvbUV2ZW50KGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2lucHV0Jyk7XG5cbiAgICAgICAgdGhpcy5ncm93U3Vic2NyaXB0aW9uID0gZ3Jvd09ic2VydmVyLnN1YnNjcmliZSh0aGlzLmdyb3cuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5ncm93KCksIDApO1xuICAgICAgICB0aGlzLmxpbmVIZWlnaHQgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5saW5lSGVpZ2h0ISwgMTApO1xuXG4gICAgICAgIGNvbnN0IHBhZGRpbmdUb3AgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5wYWRkaW5nVG9wISwgMTApO1xuICAgICAgICBjb25zdCBwYWRkaW5nQm90dG9tID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkucGFkZGluZ0JvdHRvbSEsIDEwKTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbWFnaWMtbnVtYmVyc1xuICAgICAgICB0aGlzLm1pbkhlaWdodCA9IHRoaXMubGluZUhlaWdodCAqIDIgKyBwYWRkaW5nVG9wICsgcGFkZGluZ0JvdHRvbTtcbiAgICAgICAgdGhpcy5mcmVlUm93c0hlaWdodCA9IHRoaXMubGluZUhlaWdodDtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLmdyb3dTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBuZ0RvQ2hlY2soKSB7XG4gICAgICAgIGlmICh0aGlzLm5nQ29udHJvbCkge1xuICAgICAgICAgICAgLy8gV2UgbmVlZCB0byByZS1ldmFsdWF0ZSB0aGlzIG9uIGV2ZXJ5IGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUsIGJlY2F1c2UgdGhlcmUgYXJlIHNvbWVcbiAgICAgICAgICAgIC8vIGVycm9yIHRyaWdnZXJzIHRoYXQgd2UgY2FuJ3Qgc3Vic2NyaWJlIHRvIChlLmcuIHBhcmVudCBmb3JtIHN1Ym1pc3Npb25zKS4gVGhpcyBtZWFuc1xuICAgICAgICAgICAgLy8gdGhhdCB3aGF0ZXZlciBsb2dpYyBpcyBpbiBoZXJlIGhhcyB0byBiZSBzdXBlciBsZWFuIG9yIHdlIHJpc2sgZGVzdHJveWluZyB0aGUgcGVyZm9ybWFuY2UuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUVycm9yU3RhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gZGlydHktY2hlY2sgdGhlIG5hdGl2ZSBlbGVtZW50J3MgdmFsdWUsIGJlY2F1c2UgdGhlcmUgYXJlIHNvbWUgY2FzZXMgd2hlcmVcbiAgICAgICAgLy8gd2Ugd29uJ3QgYmUgbm90aWZpZWQgd2hlbiBpdCBjaGFuZ2VzIChlLmcuIHRoZSBjb25zdW1lciBpc24ndCB1c2luZyBmb3JtcyBvciB0aGV5J3JlXG4gICAgICAgIC8vIHVwZGF0aW5nIHRoZSB2YWx1ZSB1c2luZyBgZW1pdEV2ZW50OiBmYWxzZWApLlxuICAgICAgICB0aGlzLmRpcnR5Q2hlY2tOYXRpdmVWYWx1ZSgpO1xuICAgIH1cblxuICAgIC8qKiBHcm93IHRleHRhcmVhIGhlaWdodCB0byBhdm9pZCB2ZXJ0aWNhbCBzY3JvbGwgICovXG4gICAgZ3JvdygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNhbkdyb3cpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRleHRhcmVhID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgICAgIGNvbnN0IG91dGVySGVpZ2h0ID0gcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUodGV4dGFyZWEpLmhlaWdodCEsIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IGRpZmYgPSBvdXRlckhlaWdodCAtIHRleHRhcmVhLmNsaWVudEhlaWdodDtcblxuICAgICAgICAgICAgdGV4dGFyZWEuc3R5bGUubWluSGVpZ2h0ID0gMDsgLy8gdGhpcyBsaW5lIGlzIGltcG9ydGFudCB0byBoZWlnaHQgcmVjYWxjdWxhdGlvblxuXG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBNYXRoLm1heCh0aGlzLm1pbkhlaWdodCwgK3RleHRhcmVhLnNjcm9sbEhlaWdodCArIGRpZmYgKyB0aGlzLmZyZWVSb3dzSGVpZ2h0KTtcbiAgICAgICAgICAgIHRleHRhcmVhLnN0eWxlLm1pbkhlaWdodCA9IGAke2hlaWdodH1weGA7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBGb2N1c2VzIHRoZSB0ZXh0YXJlYS4gKi9cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvKiogQ2FsbGJhY2sgZm9yIHRoZSBjYXNlcyB3aGVyZSB0aGUgZm9jdXNlZCBzdGF0ZSBvZiB0aGUgdGV4dGFyZWEgY2hhbmdlcy4gKi9cbiAgICBmb2N1c0NoYW5nZWQoaXNGb2N1c2VkOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChpc0ZvY3VzZWQgIT09IHRoaXMuZm9jdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gaXNGb2N1c2VkO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldCBlbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSAmJiAhdGhpcy5pc0JhZElucHV0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uQ29udGFpbmVyQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvKiogRG9lcyBzb21lIG1hbnVhbCBkaXJ0eSBjaGVja2luZyBvbiB0aGUgbmF0aXZlIHRleHRhcmVhIGB2YWx1ZWAgcHJvcGVydHkuICovXG4gICAgcHJvdGVjdGVkIGRpcnR5Q2hlY2tOYXRpdmVWYWx1ZSgpIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLnByZXZpb3VzTmF0aXZlVmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzTmF0aXZlVmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBDaGVja3Mgd2hldGhlciB0aGUgdGV4dGFyZWEgaXMgaW52YWxpZCBiYXNlZCBvbiB0aGUgbmF0aXZlIHZhbGlkYXRpb24uICovXG4gICAgcHJvdGVjdGVkIGlzQmFkSW5wdXQoKTogYm9vbGVhbiB7XG4gICAgICAgIC8vIFRoZSBgdmFsaWRpdHlgIHByb3BlcnR5IHdvbid0IGJlIHByZXNlbnQgb24gcGxhdGZvcm0tc2VydmVyLlxuICAgICAgICBjb25zdCB2YWxpZGl0eSA9ICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MVGV4dEFyZWFFbGVtZW50KS52YWxpZGl0eTtcblxuICAgICAgICByZXR1cm4gdmFsaWRpdHkgJiYgdmFsaWRpdHkuYmFkSW5wdXQ7XG4gICAgfVxuXG59XG4iXX0=