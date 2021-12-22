import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, Inject, Input, Optional, Self, InjectionToken, NgZone } from '@angular/core';
import { FormGroupDirective, NG_VALIDATORS, NgControl, NgForm, NgModel } from '@angular/forms';
import { ErrorStateMatcher, MC_VALIDATION, setMosaicValidation, mixinErrorState } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { fromEvent, Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@ptsecurity/mosaic/core";
export const MC_TEXTAREA_VALUE_ACCESSOR = new InjectionToken('MC_TEXTAREA_VALUE_ACCESSOR');
let nextUniqueId = 0;
export class McTextareaBase {
    constructor(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
        this.defaultErrorStateMatcher = defaultErrorStateMatcher;
        this.parentForm = parentForm;
        this.parentFormGroup = parentFormGroup;
        this.ngControl = ngControl;
    }
}
// tslint:disable-next-line:naming-convention
export const McTextareaMixinBase = mixinErrorState(McTextareaBase);
export class McTextarea extends McTextareaMixinBase {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RleHRhcmVhL3RleHRhcmVhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0gsU0FBUyxFQUFXLFVBQVUsRUFBRSxNQUFNLEVBQ3RDLEtBQUssRUFBd0IsUUFBUSxFQUNyQyxJQUFJLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFFL0IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBQzFHLE9BQU8sRUFHSCxpQkFBaUIsRUFDakIsYUFBYSxFQUViLG1CQUFtQixFQUNuQixlQUFlLEVBQ2xCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBR3hELE1BQU0sQ0FBQyxNQUFNLDBCQUEwQixHQUFHLElBQUksY0FBYyxDQUFpQiw0QkFBNEIsQ0FBQyxDQUFDO0FBRTNHLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUdyQixNQUFNLE9BQU8sY0FBYztJQUN2QixZQUNXLHdCQUEyQyxFQUMzQyxVQUFrQixFQUNsQixlQUFtQyxFQUNuQyxTQUFvQjtRQUhwQiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQW1CO1FBQzNDLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDbEIsb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBQ25DLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFDNUIsQ0FBQztDQUNQO0FBRUQsNkNBQTZDO0FBQzdDLE1B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InNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIERpcmVjdGl2ZSwgRG9DaGVjaywgRWxlbWVudFJlZiwgSW5qZWN0LFxuICAgIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3B0aW9uYWwsXG4gICAgU2VsZiwgSW5qZWN0aW9uVG9rZW4sIE5nWm9uZSwgT25Jbml0LFxuICAgIEFmdGVyQ29udGVudEluaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXBEaXJlY3RpdmUsIE5HX1ZBTElEQVRPUlMsIE5nQ29udHJvbCwgTmdGb3JtLCBOZ01vZGVsLCBWYWxpZGF0b3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICAgIENhblVwZGF0ZUVycm9yU3RhdGUsXG4gICAgQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IsXG4gICAgRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgTUNfVkFMSURBVElPTixcbiAgICBNY1ZhbGlkYXRpb25PcHRpb25zLFxuICAgIHNldE1vc2FpY1ZhbGlkYXRpb24sXG4gICAgbWl4aW5FcnJvclN0YXRlXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IE1jRm9ybUZpZWxkQ29udHJvbCB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9mb3JtLWZpZWxkJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cblxuZXhwb3J0IGNvbnN0IE1DX1RFWFRBUkVBX1ZBTFVFX0FDQ0VTU09SID0gbmV3IEluamVjdGlvblRva2VuPHsgdmFsdWU6IGFueSB9PignTUNfVEVYVEFSRUFfVkFMVUVfQUNDRVNTT1InKTtcblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cblxuZXhwb3J0IGNsYXNzIE1jVGV4dGFyZWFCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgICAgIHB1YmxpYyBwYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgICAgIHB1YmxpYyBwYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICAgICAgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sXG4gICAgKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1RleHRhcmVhTWl4aW5CYXNlOiBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvciAmIHR5cGVvZiBNY1RleHRhcmVhQmFzZSA9IG1peGluRXJyb3JTdGF0ZShNY1RleHRhcmVhQmFzZSk7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAndGV4dGFyZWFbbWNUZXh0YXJlYV0nLFxuICAgIGV4cG9ydEFzOiAnbWNUZXh0YXJlYScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRleHRhcmVhJyxcbiAgICAgICAgJ1tjbGFzcy5tYy10ZXh0YXJlYS1yZXNpemFibGVdJzogJyFjYW5Hcm93JyxcblxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAgICAgJ1thdHRyLnBsYWNlaG9sZGVyXSc6ICdwbGFjZWhvbGRlcicsXG4gICAgICAgICdbYXR0ci5hcmlhLWludmFsaWRdJzogJ2Vycm9yU3RhdGUnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICAgICAnW2F0dHIucmVxdWlyZWRdJzogJ3JlcXVpcmVkJyxcblxuICAgICAgICAnKGJsdXIpJzogJ2ZvY3VzQ2hhbmdlZChmYWxzZSknLFxuICAgICAgICAnKGZvY3VzKSc6ICdmb2N1c0NoYW5nZWQodHJ1ZSknXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE1jRm9ybUZpZWxkQ29udHJvbCwgdXNlRXhpc3Rpbmc6IE1jVGV4dGFyZWEgfV1cbn0pXG5leHBvcnQgY2xhc3MgTWNUZXh0YXJlYSBleHRlbmRzIE1jVGV4dGFyZWFNaXhpbkJhc2UgaW1wbGVtZW50cyBNY0Zvcm1GaWVsZENvbnRyb2w8YW55PiwgT25Jbml0LCBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LCBEb0NoZWNrLCBDYW5VcGRhdGVFcnJvclN0YXRlLCBBZnRlckNvbnRlbnRJbml0IHtcblxuICAgIEBJbnB1dCgpIGNhbkdyb3c6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEFuIG9iamVjdCB1c2VkIHRvIGNvbnRyb2wgd2hlbiBlcnJvciBtZXNzYWdlcyBhcmUgc2hvd24uICovXG4gICAgQElucHV0KCkgZXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICByZWFkb25seSBzdGF0ZUNoYW5nZXM6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGNvbnRyb2xUeXBlOiBzdHJpbmcgPSAndGV4dGFyZWEnO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5uZ0NvbnRyb2wgJiYgdGhpcy5uZ0NvbnRyb2wuZGlzYWJsZWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5nQ29udHJvbC5kaXNhYmxlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG5cbiAgICBzZXQgaWQodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9pZCA9IHZhbHVlIHx8IHRoaXMudWlkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7XG4gICAgfVxuXG4gICAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgdmFsdWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVBY2Nlc3Nvci52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWVBY2Nlc3Nvci52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVpZCA9IGBtYy10ZXh0c3JlYS0ke25leHRVbmlxdWVJZCsrfWA7XG4gICAgcHJvdGVjdGVkIHByZXZpb3VzTmF0aXZlVmFsdWU6IGFueTtcbiAgICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2lkOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfcmVxdWlyZWQgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgdmFsdWVBY2Nlc3NvcjogeyB2YWx1ZTogYW55IH07XG4gICAgcHJpdmF0ZSBncm93U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBwcml2YXRlIGxpbmVIZWlnaHQ6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBmcmVlUm93c0hlaWdodDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIG1pbkhlaWdodDogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgICAgIEBPcHRpb25hbCgpIHBhcmVudEZvcm06IE5nRm9ybSxcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE5HX1ZBTElEQVRPUlMpIHB1YmxpYyByYXdWYWxpZGF0b3JzOiBWYWxpZGF0b3JbXSxcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQ19WQUxJREFUSU9OKSBwcml2YXRlIG1jVmFsaWRhdGlvbjogTWNWYWxpZGF0aW9uT3B0aW9ucyxcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgbmdNb2RlbDogTmdNb2RlbCxcbiAgICAgICAgQE9wdGlvbmFsKCkgcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgICAgIGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgQEluamVjdChNQ19URVhUQVJFQV9WQUxVRV9BQ0NFU1NPUikgaW5wdXRWYWx1ZUFjY2Vzc29yOiBhbnksXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmVcbiAgICApIHtcbiAgICAgICAgc3VwZXIoZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyLCBwYXJlbnRGb3JtLCBwYXJlbnRGb3JtR3JvdXAsIG5nQ29udHJvbCk7XG4gICAgICAgIC8vIElmIG5vIGlucHV0IHZhbHVlIGFjY2Vzc29yIHdhcyBleHBsaWNpdGx5IHNwZWNpZmllZCwgdXNlIHRoZSBlbGVtZW50IGFzIHRoZSB0ZXh0YXJlYSB2YWx1ZVxuICAgICAgICAvLyBhY2Nlc3Nvci5cbiAgICAgICAgdGhpcy52YWx1ZUFjY2Vzc29yID0gaW5wdXRWYWx1ZUFjY2Vzc29yIHx8IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIHRoaXMucHJldmlvdXNOYXRpdmVWYWx1ZSA9IHRoaXMudmFsdWU7XG5cbiAgICAgICAgLy8gRm9yY2Ugc2V0dGVyIHRvIGJlIGNhbGxlZCBpbiBjYXNlIGlkIHdhcyBub3Qgc3BlY2lmaWVkLlxuICAgICAgICB0aGlzLmlkID0gdGhpcy5pZDtcblxuICAgICAgICBjb25zdCBncm93T2JzZXJ2ZXIgPSBmcm9tRXZlbnQoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnaW5wdXQnKTtcblxuICAgICAgICB0aGlzLmdyb3dTdWJzY3JpcHRpb24gPSBncm93T2JzZXJ2ZXIuc3Vic2NyaWJlKHRoaXMuZ3Jvdy5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmdyb3coKSwgMCk7XG4gICAgICAgIHRoaXMubGluZUhlaWdodCA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLmxpbmVIZWlnaHQhLCAxMCk7XG5cbiAgICAgICAgY29uc3QgcGFkZGluZ1RvcCA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLnBhZGRpbmdUb3AhLCAxMCk7XG4gICAgICAgIGNvbnN0IHBhZGRpbmdCb3R0b20gPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5wYWRkaW5nQm90dG9tISwgMTApO1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1tYWdpYy1udW1iZXJzXG4gICAgICAgIHRoaXMubWluSGVpZ2h0ID0gdGhpcy5saW5lSGVpZ2h0ICogMiArIHBhZGRpbmdUb3AgKyBwYWRkaW5nQm90dG9tO1xuICAgICAgICB0aGlzLmZyZWVSb3dzSGVpZ2h0ID0gdGhpcy5saW5lSGVpZ2h0O1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMuZ3Jvd1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLm5nQ29udHJvbCkgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAodGhpcy5tY1ZhbGlkYXRpb24udXNlVmFsaWRhdGlvbikge1xuICAgICAgICAgICAgc2V0TW9zYWljVmFsaWRhdGlvbih0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgaWYgKHRoaXMubmdDb250cm9sKSB7XG4gICAgICAgICAgICAvLyBXZSBuZWVkIHRvIHJlLWV2YWx1YXRlIHRoaXMgb24gZXZlcnkgY2hhbmdlIGRldGVjdGlvbiBjeWNsZSwgYmVjYXVzZSB0aGVyZSBhcmUgc29tZVxuICAgICAgICAgICAgLy8gZXJyb3IgdHJpZ2dlcnMgdGhhdCB3ZSBjYW4ndCBzdWJzY3JpYmUgdG8gKGUuZy4gcGFyZW50IGZvcm0gc3VibWlzc2lvbnMpLiBUaGlzIG1lYW5zXG4gICAgICAgICAgICAvLyB0aGF0IHdoYXRldmVyIGxvZ2ljIGlzIGluIGhlcmUgaGFzIHRvIGJlIHN1cGVyIGxlYW4gb3Igd2UgcmlzayBkZXN0cm95aW5nIHRoZSBwZXJmb3JtYW5jZS5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlRXJyb3JTdGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgbmVlZCB0byBkaXJ0eS1jaGVjayB0aGUgbmF0aXZlIGVsZW1lbnQncyB2YWx1ZSwgYmVjYXVzZSB0aGVyZSBhcmUgc29tZSBjYXNlcyB3aGVyZVxuICAgICAgICAvLyB3ZSB3b24ndCBiZSBub3RpZmllZCB3aGVuIGl0IGNoYW5nZXMgKGUuZy4gdGhlIGNvbnN1bWVyIGlzbid0IHVzaW5nIGZvcm1zIG9yIHRoZXkncmVcbiAgICAgICAgLy8gdXBkYXRpbmcgdGhlIHZhbHVlIHVzaW5nIGBlbWl0RXZlbnQ6IGZhbHNlYCkuXG4gICAgICAgIHRoaXMuZGlydHlDaGVja05hdGl2ZVZhbHVlKCk7XG4gICAgfVxuXG4gICAgLyoqIEdyb3cgdGV4dGFyZWEgaGVpZ2h0IHRvIGF2b2lkIHZlcnRpY2FsIHNjcm9sbCAgKi9cbiAgICBncm93KCkge1xuICAgICAgICBpZiAoIXRoaXMuY2FuR3Jvdykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGV4dGFyZWEgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgICAgICAgY29uc3Qgb3V0ZXJIZWlnaHQgPSBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0ZXh0YXJlYSkuaGVpZ2h0ISwgMTApO1xuICAgICAgICAgICAgY29uc3QgZGlmZiA9IG91dGVySGVpZ2h0IC0gdGV4dGFyZWEuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgICB0ZXh0YXJlYS5zdHlsZS5taW5IZWlnaHQgPSAwOyAvLyB0aGlzIGxpbmUgaXMgaW1wb3J0YW50IHRvIGhlaWdodCByZWNhbGN1bGF0aW9uXG5cbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IE1hdGgubWF4KHRoaXMubWluSGVpZ2h0LCArdGV4dGFyZWEuc2Nyb2xsSGVpZ2h0ICsgZGlmZiArIHRoaXMuZnJlZVJvd3NIZWlnaHQpO1xuICAgICAgICAgICAgdGV4dGFyZWEuc3R5bGUubWluSGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIEZvY3VzZXMgdGhlIHRleHRhcmVhLiAqL1xuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIC8qKiBDYWxsYmFjayBmb3IgdGhlIGNhc2VzIHdoZXJlIHRoZSBmb2N1c2VkIHN0YXRlIG9mIHRoZSB0ZXh0YXJlYSBjaGFuZ2VzLiAqL1xuICAgIGZvY3VzQ2hhbmdlZChpc0ZvY3VzZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKGlzRm9jdXNlZCAhPT0gdGhpcy5mb2N1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSBpc0ZvY3VzZWQ7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlICYmICF0aGlzLmlzQmFkSW5wdXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgb25Db250YWluZXJDbGljaygpIHtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cblxuICAgIC8qKiBEb2VzIHNvbWUgbWFudWFsIGRpcnR5IGNoZWNraW5nIG9uIHRoZSBuYXRpdmUgdGV4dGFyZWEgYHZhbHVlYCBwcm9wZXJ0eS4gKi9cbiAgICBwcm90ZWN0ZWQgZGlydHlDaGVja05hdGl2ZVZhbHVlKCkge1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMudmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMucHJldmlvdXNOYXRpdmVWYWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNOYXRpdmVWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIHRoZSB0ZXh0YXJlYSBpcyBpbnZhbGlkIGJhc2VkIG9uIHRoZSBuYXRpdmUgdmFsaWRhdGlvbi4gKi9cbiAgICBwcm90ZWN0ZWQgaXNCYWRJbnB1dCgpOiBib29sZWFuIHtcbiAgICAgICAgLy8gVGhlIGB2YWxpZGl0eWAgcHJvcGVydHkgd29uJ3QgYmUgcHJlc2VudCBvbiBwbGF0Zm9ybS1zZXJ2ZXIuXG4gICAgICAgIGNvbnN0IHZhbGlkaXR5ID0gKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQpLnZhbGlkaXR5O1xuXG4gICAgICAgIHJldHVybiB2YWxpZGl0eSAmJiB2YWxpZGl0eS5iYWRJbnB1dDtcbiAgICB9XG5cbn1cbiJdfQ==