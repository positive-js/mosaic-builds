import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { InjectionToken, Directive, Optional, Self, Inject, Input, NgModule } from '@angular/core';
import * as i1 from '@angular/forms';
import { NG_VALIDATORS, FormsModule } from '@angular/forms';
import * as i2 from '@ptsecurity/mosaic/core';
import { mixinErrorState, setMosaicValidation, MC_VALIDATION, McCommonModule } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { Subject, fromEvent } from 'rxjs';
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';

const MC_TEXTAREA_VALUE_ACCESSOR = new InjectionToken('MC_TEXTAREA_VALUE_ACCESSOR');
let nextUniqueId = 0;
class McTextareaBase {
    constructor(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
        this.defaultErrorStateMatcher = defaultErrorStateMatcher;
        this.parentForm = parentForm;
        this.parentFormGroup = parentFormGroup;
        this.ngControl = ngControl;
    }
}
// tslint:disable-next-line:naming-convention
const McTextareaMixinBase = mixinErrorState(McTextareaBase);
class McTextarea extends McTextareaMixinBase {
    constructor(elementRef, ngControl, parentForm, rawValidators, mcValidation, ngModel, parentFormGroup, defaultErrorStateMatcher, inputValueAccessor, ngZone) {
        super(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);
        this.elementRef = elementRef;
        this.ngControl = ngControl;
        this.rawValidators = rawValidators;
        this.mcValidation = mcValidation;
        this.ngModel = ngModel;
        this.ngZone = ngZone;
        this.canGrow = true;
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        this.focused = false;
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        this.stateChanges = new Subject();
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        this.controlType = 'textarea';
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
        const growObserver = fromEvent(elementRef.nativeElement, 'input');
        this.growSubscription = growObserver.subscribe(this.grow.bind(this));
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get disabled() {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        if (this.focused) {
            this.focused = false;
            this.stateChanges.next();
        }
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value || this.uid;
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get value() {
        return this.valueAccessor.value;
    }
    set value(value) {
        if (value !== this.value) {
            this.valueAccessor.value = value;
            this.stateChanges.next();
        }
    }
    ngOnInit() {
        setTimeout(() => this.grow(), 0);
        this.lineHeight = parseInt(getComputedStyle(this.elementRef.nativeElement).lineHeight, 10);
        const paddingTop = parseInt(getComputedStyle(this.elementRef.nativeElement).paddingTop, 10);
        const paddingBottom = parseInt(getComputedStyle(this.elementRef.nativeElement).paddingBottom, 10);
        // tslint:disable-next-line:no-magic-numbers
        this.minHeight = this.lineHeight * 2 + paddingTop + paddingBottom;
        this.freeRowsHeight = this.lineHeight;
    }
    ngOnChanges() {
        this.stateChanges.next();
    }
    ngOnDestroy() {
        this.stateChanges.complete();
        this.growSubscription.unsubscribe();
    }
    ngAfterContentInit() {
        if (!this.ngControl) {
            return;
        }
        if (this.mcValidation.useValidation) {
            setMosaicValidation(this);
        }
    }
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
    /** Grow textarea height to avoid vertical scroll  */
    grow() {
        if (!this.canGrow) {
            return;
        }
        this.ngZone.runOutsideAngular(() => {
            const textarea = this.elementRef.nativeElement;
            const outerHeight = parseInt(window.getComputedStyle(textarea).height, 10);
            const diff = outerHeight - textarea.clientHeight;
            textarea.style.minHeight = 0; // this line is important to height recalculation
            const height = Math.max(this.minHeight, +textarea.scrollHeight + diff + this.freeRowsHeight);
            textarea.style.minHeight = `${height}px`;
        });
    }
    /** Focuses the textarea. */
    focus() {
        this.elementRef.nativeElement.focus();
    }
    /** Callback for the cases where the focused state of the textarea changes. */
    focusChanged(isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get empty() {
        return !this.elementRef.nativeElement.value && !this.isBadInput();
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    onContainerClick() {
        this.focus();
    }
    /** Does some manual dirty checking on the native textarea `value` property. */
    dirtyCheckNativeValue() {
        const newValue = this.value;
        if (this.previousNativeValue !== newValue) {
            this.previousNativeValue = newValue;
            this.stateChanges.next();
        }
    }
    /** Checks whether the textarea is invalid based on the native validation. */
    isBadInput() {
        // The `validity` property won't be present on platform-server.
        const validity = this.elementRef.nativeElement.validity;
        return validity && validity.badInput;
    }
}
/** @nocollapse */ /** @nocollapse */ McTextarea.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTextarea, deps: [{ token: i0.ElementRef }, { token: i1.NgControl, optional: true, self: true }, { token: i1.NgForm, optional: true }, { token: NG_VALIDATORS, optional: true, self: true }, { token: MC_VALIDATION, optional: true }, { token: i1.NgModel, optional: true, self: true }, { token: i1.FormGroupDirective, optional: true }, { token: i2.ErrorStateMatcher }, { token: MC_TEXTAREA_VALUE_ACCESSOR, optional: true, self: true }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McTextarea.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: McTextarea, selector: "textarea[mcTextarea]", inputs: { canGrow: "canGrow", errorStateMatcher: "errorStateMatcher", disabled: "disabled", id: "id", placeholder: "placeholder", required: "required", value: "value" }, host: { listeners: { "blur": "focusChanged(false)", "focus": "focusChanged(true)" }, properties: { "class.mc-textarea-resizable": "!canGrow", "attr.id": "id", "attr.placeholder": "placeholder", "attr.aria-invalid": "errorState", "attr.disabled": "disabled || null", "attr.required": "required" }, classAttribute: "mc-textarea" }, providers: [{ provide: McFormFieldControl, useExisting: McTextarea }], exportAs: ["mcTextarea"], usesInheritance: true, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTextarea, decorators: [{
            type: Directive,
            args: [{
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
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NgControl, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }, { type: i1.NgForm, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }, {
                    type: Inject,
                    args: [NG_VALIDATORS]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MC_VALIDATION]
                }] }, { type: i1.NgModel, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }, { type: i1.FormGroupDirective, decorators: [{
                    type: Optional
                }] }, { type: i2.ErrorStateMatcher }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }, {
                    type: Inject,
                    args: [MC_TEXTAREA_VALUE_ACCESSOR]
                }] }, { type: i0.NgZone }]; }, propDecorators: { canGrow: [{
                type: Input
            }], errorStateMatcher: [{
                type: Input
            }], disabled: [{
                type: Input
            }], id: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], required: [{
                type: Input
            }], value: [{
                type: Input
            }] } });

class McTextareaModule {
}
/** @nocollapse */ /** @nocollapse */ McTextareaModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTextareaModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McTextareaModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTextareaModule, declarations: [McTextarea], imports: [CommonModule, A11yModule, McCommonModule, FormsModule], exports: [McTextarea] });
/** @nocollapse */ /** @nocollapse */ McTextareaModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTextareaModule, imports: [[CommonModule, A11yModule, McCommonModule, FormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTextareaModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, A11yModule, McCommonModule, FormsModule],
                    exports: [McTextarea],
                    declarations: [McTextarea]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MC_TEXTAREA_VALUE_ACCESSOR, McTextarea, McTextareaBase, McTextareaMixinBase, McTextareaModule };
//# sourceMappingURL=ptsecurity-mosaic-textarea.mjs.map
