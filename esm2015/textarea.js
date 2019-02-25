/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __metadata, __param } from 'tslib';
import { Directive, ElementRef, Inject, Input, Optional, Self, InjectionToken, NgZone, NgModule } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm, FormsModule } from '@angular/forms';
import { coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { ErrorStateMatcher, mixinErrorState, McCommonModule } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { fromEvent, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@ptsecurity/cdk/a11y';

var McTextarea_1;
const MC_TEXTAREA_VALUE_ACCESSOR = new InjectionToken('MC_TEXTAREA_VALUE_ACCESSOR');
let nextUniqueId = 0;
class McTextareaBase {
    constructor(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
}
// tslint:disable-next-line:naming-convention
const McTextareaMixinBase = mixinErrorState(McTextareaBase);
let McTextarea = McTextarea_1 = class McTextarea extends McTextareaMixinBase {
    constructor(elementRef, ngControl, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, inputValueAccessor, ngZone) {
        super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
        this.elementRef = elementRef;
        this.ngControl = ngControl;
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
            textarea.style.height = 0; // this line is important to height recalculation
            const height = Math.max(this.minHeight, textarea.scrollHeight + diff + this.freeRowsHeight);
            textarea.style.height = `${height}px`;
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
    getGrowHeight() {
        const textarea = this.elementRef.nativeElement;
        const outerHeight = parseInt(window.getComputedStyle(textarea).height.toString(), 10);
        const diff = outerHeight - textarea.clientHeight;
        return Math.max(this.minHeight, textarea.scrollHeight + diff);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], McTextarea.prototype, "canGrow", void 0);
__decorate([
    Input(),
    __metadata("design:type", ErrorStateMatcher)
], McTextarea.prototype, "errorStateMatcher", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], McTextarea.prototype, "disabled", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], McTextarea.prototype, "id", null);
__decorate([
    Input(),
    __metadata("design:type", String)
], McTextarea.prototype, "placeholder", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], McTextarea.prototype, "required", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], McTextarea.prototype, "value", null);
McTextarea = McTextarea_1 = __decorate([
    Directive({
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
        providers: [{ provide: McFormFieldControl, useExisting: McTextarea_1 }]
    }),
    __param(1, Optional()), __param(1, Self()),
    __param(2, Optional()),
    __param(3, Optional()),
    __param(5, Optional()), __param(5, Self()), __param(5, Inject(MC_TEXTAREA_VALUE_ACCESSOR)),
    __metadata("design:paramtypes", [ElementRef,
        NgControl,
        NgForm,
        FormGroupDirective,
        ErrorStateMatcher, Object, NgZone])
], McTextarea);

let McTextareaModule = class McTextareaModule {
};
McTextareaModule = __decorate([
    NgModule({
        imports: [CommonModule, A11yModule, McCommonModule, FormsModule],
        exports: [McTextarea],
        declarations: [McTextarea]
    })
], McTextareaModule);

/**
 * Generated bundle index. Do not edit.
 */

export { MC_TEXTAREA_VALUE_ACCESSOR, McTextareaBase, McTextareaMixinBase, McTextarea, McTextareaModule };
//# sourceMappingURL=textarea.js.map
