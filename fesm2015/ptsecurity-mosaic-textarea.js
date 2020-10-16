import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { InjectionToken, Directive, ElementRef, Optional, Self, Inject, NgZone, Input, NgModule } from '@angular/core';
import { NgControl, NgForm, FormGroupDirective, FormsModule } from '@angular/forms';
import { mixinErrorState, ErrorStateMatcher, McCommonModule } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { Subject, fromEvent } from 'rxjs';
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * Generated from: textarea.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const MC_TEXTAREA_VALUE_ACCESSOR = new InjectionToken('MC_TEXTAREA_VALUE_ACCESSOR');
/** @type {?} */
let nextUniqueId = 0;
class McTextareaBase {
    /**
     * @param {?} defaultErrorStateMatcher
     * @param {?} parentForm
     * @param {?} parentFormGroup
     * @param {?} ngControl
     */
    constructor(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
        this.defaultErrorStateMatcher = defaultErrorStateMatcher;
        this.parentForm = parentForm;
        this.parentFormGroup = parentFormGroup;
        this.ngControl = ngControl;
    }
}
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
const McTextareaMixinBase = mixinErrorState(McTextareaBase);
class McTextarea extends McTextareaMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} ngControl
     * @param {?} parentForm
     * @param {?} parentFormGroup
     * @param {?} defaultErrorStateMatcher
     * @param {?} inputValueAccessor
     * @param {?} ngZone
     */
    constructor(elementRef, ngControl, parentForm, parentFormGroup, defaultErrorStateMatcher, inputValueAccessor, ngZone) {
        super(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);
        this.elementRef = elementRef;
        this.ngControl = ngControl;
        this.ngZone = ngZone;
        this.canGrow = true;
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         */
        this.focused = false;
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         */
        this.stateChanges = new Subject();
        /**
         * Implemented as part of McFormFieldControl.
         * \@docs-private
         */
        this.controlType = 'mc-textarea';
        this.uid = `mc-textsrea-${nextUniqueId++}`;
        this._disabled = false;
        this._required = false;
        this.lineHeight = 0;
        this.freeRowsHeight = 0;
        this.minHeight = 0;
        // If no input value accessor was explicitly specified, use the element as the textarea value
        // accessor.
        this.valueAccessor = inputValueAccessor || this.elementRef.nativeElement;
        this.previousNativeValue = this.value;
        // Force setter to be called in case id was not specified.
        this.id = this.id;
        /** @type {?} */
        const growObserver = fromEvent(elementRef.nativeElement, 'input');
        this.growSubscription = growObserver.subscribe(this.grow.bind(this));
    }
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    get disabled() {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        if (this.focused) {
            this.focused = false;
            this.stateChanges.next();
        }
    }
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    get id() {
        return this._id;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set id(value) {
        this._id = value || this.uid;
    }
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    get required() {
        return this._required;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) {
        this._required = coerceBooleanProperty(value);
    }
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    get value() {
        return this.valueAccessor.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        if (value !== this.value) {
            this.valueAccessor.value = value;
            this.stateChanges.next();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        setTimeout((/**
         * @return {?}
         */
        () => this.grow()), 0);
        this.lineHeight = parseInt((/** @type {?} */ (getComputedStyle(this.elementRef.nativeElement).lineHeight)), 10);
        /** @type {?} */
        const paddingTop = parseInt((/** @type {?} */ (getComputedStyle(this.elementRef.nativeElement).paddingTop)), 10);
        /** @type {?} */
        const paddingBottom = parseInt((/** @type {?} */ (getComputedStyle(this.elementRef.nativeElement).paddingBottom)), 10);
        // tslint:disable-next-line:no-magic-numbers
        this.minHeight = this.lineHeight * 2 + paddingTop + paddingBottom;
        this.freeRowsHeight = this.lineHeight;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.stateChanges.next();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stateChanges.complete();
        this.growSubscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
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
    }
    /**
     * Grow textarea height to avoid vertical scroll
     * @return {?}
     */
    grow() {
        if (!this.canGrow) {
            return;
        }
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const textarea = this.elementRef.nativeElement;
            /** @type {?} */
            const outerHeight = parseInt((/** @type {?} */ (window.getComputedStyle(textarea).height)), 10);
            /** @type {?} */
            const diff = outerHeight - textarea.clientHeight;
            textarea.style.minHeight = 0; // this line is important to height recalculation
            // this line is important to height recalculation
            /** @type {?} */
            const height = Math.max(this.minHeight, +textarea.scrollHeight + diff + this.freeRowsHeight);
            textarea.style.minHeight = `${height}px`;
        }));
    }
    /**
     * Focuses the textarea.
     * @return {?}
     */
    focus() {
        this.elementRef.nativeElement.focus();
    }
    /**
     * Callback for the cases where the focused state of the textarea changes.
     * @param {?} isFocused
     * @return {?}
     */
    focusChanged(isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    }
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    get empty() {
        return !this.elementRef.nativeElement.value && !this.isBadInput();
    }
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    onContainerClick() {
        this.focus();
    }
    /**
     * Does some manual dirty checking on the native textarea `value` property.
     * @protected
     * @return {?}
     */
    dirtyCheckNativeValue() {
        /** @type {?} */
        const newValue = this.value;
        if (this.previousNativeValue !== newValue) {
            this.previousNativeValue = newValue;
            this.stateChanges.next();
        }
    }
    /**
     * Checks whether the textarea is invalid based on the native validation.
     * @protected
     * @return {?}
     */
    isBadInput() {
        // The `validity` property won't be present on platform-server.
        /** @type {?} */
        const validity = ((/** @type {?} */ (this.elementRef.nativeElement))).validity;
        return validity && validity.badInput;
    }
}
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
McTextarea.ctorParameters = () => [
    { type: ElementRef },
    { type: NgControl, decorators: [{ type: Optional }, { type: Self }] },
    { type: NgForm, decorators: [{ type: Optional }] },
    { type: FormGroupDirective, decorators: [{ type: Optional }] },
    { type: ErrorStateMatcher },
    { type: undefined, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [MC_TEXTAREA_VALUE_ACCESSOR,] }] },
    { type: NgZone }
];
McTextarea.propDecorators = {
    canGrow: [{ type: Input }],
    errorStateMatcher: [{ type: Input }],
    disabled: [{ type: Input }],
    id: [{ type: Input }],
    placeholder: [{ type: Input }],
    required: [{ type: Input }],
    value: [{ type: Input }]
};
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

/**
 * @fileoverview added by tsickle
 * Generated from: textarea.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McTextareaModule {
}
McTextareaModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, A11yModule, McCommonModule, FormsModule],
                exports: [McTextarea],
                declarations: [McTextarea]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ptsecurity-mosaic-textarea.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { MC_TEXTAREA_VALUE_ACCESSOR, McTextarea, McTextareaBase, McTextareaMixinBase, McTextareaModule };
//# sourceMappingURL=ptsecurity-mosaic-textarea.js.map
