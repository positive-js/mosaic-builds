import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, Inject, Input, Optional, Self, InjectionToken, NgZone } from '@angular/core';
import { FormGroupDirective, NG_VALIDATORS, NgControl, NgForm, NgModel } from '@angular/forms';
import { ErrorStateMatcher, MC_VALIDATION, setMosaicValidation, mixinErrorState } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { fromEvent, Subject } from 'rxjs';
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
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_VALIDATORS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_VALIDATION,] }] },
    { type: NgModel, decorators: [{ type: Optional }, { type: Self }] },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RleHRhcmVhL3RleHRhcmVhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0gsU0FBUyxFQUFXLFVBQVUsRUFBRSxNQUFNLEVBQ3RDLEtBQUssRUFBd0IsUUFBUSxFQUNyQyxJQUFJLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFFL0IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBQzFHLE9BQU8sRUFHSCxpQkFBaUIsRUFDakIsYUFBYSxFQUViLG1CQUFtQixFQUNuQixlQUFlLEVBQ2xCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR3hELE1BQU0sQ0FBQyxNQUFNLDBCQUEwQixHQUFHLElBQUksY0FBYyxDQUFpQiw0QkFBNEIsQ0FBQyxDQUFDO0FBRTNHLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUdyQixNQUFNLE9BQU8sY0FBYztJQUN2QixZQUNXLHdCQUEyQyxFQUMzQyxVQUFrQixFQUNsQixlQUFtQyxFQUNuQyxTQUFvQjtRQUhwQiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQW1CO1FBQzNDLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDbEIsb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBQ25DLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFDNUIsQ0FBQztDQUNQO0FBRUQsNkNBQTZDO0FBQzdDLE1BQU0s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SUFDekMsQ0FBQzs7O1lBclFKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxhQUFhO29CQUNwQiwrQkFBK0IsRUFBRSxVQUFVO29CQUUzQyxXQUFXLEVBQUUsSUFBSTtvQkFDakIsb0JBQW9CLEVBQUUsYUFBYTtvQkFDbkMscUJBQXFCLEVBQUUsWUFBWTtvQkFDbkMsaUJBQWlCLEVBQUUsa0JBQWtCO29CQUNyQyxpQkFBaUIsRUFBRSxVQUFVO29CQUU3QixRQUFRLEVBQUUscUJBQXFCO29CQUMvQixTQUFTLEVBQUUsb0JBQW9CO2lCQUNsQztnQkFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLENBQUM7YUFDeEU7Ozs7WUFyRHVCLFVBQVU7WUFLVSxTQUFTLHVCQWdLNUMsUUFBUSxZQUFJLElBQUk7WUFoSzhCLE1BQU0sdUJBaUtwRCxRQUFRO3dDQUNSLFFBQVEsWUFBSSxJQUFJLFlBQUksTUFBTSxTQUFDLGFBQWE7NENBQ3hDLFFBQVEsWUFBSSxNQUFNLFNBQUMsYUFBYTtZQW5Lc0IsT0FBTyx1QkFvSzdELFFBQVEsWUFBSSxJQUFJO1lBcEtoQixrQkFBa0IsdUJBcUtsQixRQUFRO1lBaktiLGlCQUFpQjs0Q0FtS1osUUFBUSxZQUFJLElBQUksWUFBSSxNQUFNLFNBQUMsMEJBQTBCO1lBMUtwQyxNQUFNOzs7c0JBdUQzQixLQUFLO2dDQUdMLEtBQUs7dUJBd0JMLEtBQUs7aUJBc0JMLEtBQUs7MEJBYUwsS0FBSzt1QkFNTCxLQUFLO29CQWFMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsIERvQ2hlY2ssIEVsZW1lbnRSZWYsIEluamVjdCxcbiAgICBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9wdGlvbmFsLFxuICAgIFNlbGYsIEluamVjdGlvblRva2VuLCBOZ1pvbmUsIE9uSW5pdCxcbiAgICBBZnRlckNvbnRlbnRJbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwRGlyZWN0aXZlLCBOR19WQUxJREFUT1JTLCBOZ0NvbnRyb2wsIE5nRm9ybSwgTmdNb2RlbCwgVmFsaWRhdG9yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgICBDYW5VcGRhdGVFcnJvclN0YXRlLFxuICAgIENhblVwZGF0ZUVycm9yU3RhdGVDdG9yLFxuICAgIEVycm9yU3RhdGVNYXRjaGVyLFxuICAgIE1DX1ZBTElEQVRJT04sXG4gICAgTWNWYWxpZGF0aW9uT3B0aW9ucyxcbiAgICBzZXRNb3NhaWNWYWxpZGF0aW9uLFxuICAgIG1peGluRXJyb3JTdGF0ZVxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0Zvcm1GaWVsZENvbnRyb2wgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5cbmV4cG9ydCBjb25zdCBNQ19URVhUQVJFQV9WQUxVRV9BQ0NFU1NPUiA9IG5ldyBJbmplY3Rpb25Ub2tlbjx7IHZhbHVlOiBhbnkgfT4oJ01DX1RFWFRBUkVBX1ZBTFVFX0FDQ0VTU09SJyk7XG5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG5cbmV4cG9ydCBjbGFzcyBNY1RleHRhcmVhQmFzZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICAgICAgICBwdWJsaWMgcGFyZW50Rm9ybTogTmdGb3JtLFxuICAgICAgICBwdWJsaWMgcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgICAgIHB1YmxpYyBuZ0NvbnRyb2w6IE5nQ29udHJvbFxuICAgICkge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNUZXh0YXJlYU1peGluQmFzZTogQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IgJiB0eXBlb2YgTWNUZXh0YXJlYUJhc2UgPSBtaXhpbkVycm9yU3RhdGUoTWNUZXh0YXJlYUJhc2UpO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ3RleHRhcmVhW21jVGV4dGFyZWFdJyxcbiAgICBleHBvcnRBczogJ21jVGV4dGFyZWEnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy10ZXh0YXJlYScsXG4gICAgICAgICdbY2xhc3MubWMtdGV4dGFyZWEtcmVzaXphYmxlXSc6ICchY2FuR3JvdycsXG5cbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCcsXG4gICAgICAgICdbYXR0ci5wbGFjZWhvbGRlcl0nOiAncGxhY2Vob2xkZXInLFxuICAgICAgICAnW2F0dHIuYXJpYS1pbnZhbGlkXSc6ICdlcnJvclN0YXRlJyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAgICAgJ1thdHRyLnJlcXVpcmVkXSc6ICdyZXF1aXJlZCcsXG5cbiAgICAgICAgJyhibHVyKSc6ICdmb2N1c0NoYW5nZWQoZmFsc2UpJyxcbiAgICAgICAgJyhmb2N1cyknOiAnZm9jdXNDaGFuZ2VkKHRydWUpJ1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBNY0Zvcm1GaWVsZENvbnRyb2wsIHVzZUV4aXN0aW5nOiBNY1RleHRhcmVhIH1dXG59KVxuZXhwb3J0IGNsYXNzIE1jVGV4dGFyZWEgZXh0ZW5kcyBNY1RleHRhcmVhTWl4aW5CYXNlIGltcGxlbWVudHMgTWNGb3JtRmllbGRDb250cm9sPGFueT4sIE9uSW5pdCwgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSwgRG9DaGVjaywgQ2FuVXBkYXRlRXJyb3JTdGF0ZSwgQWZ0ZXJDb250ZW50SW5pdCB7XG5cbiAgICBASW5wdXQoKSBjYW5Hcm93OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBBbiBvYmplY3QgdXNlZCB0byBjb250cm9sIHdoZW4gZXJyb3IgbWVzc2FnZXMgYXJlIHNob3duLiAqL1xuICAgIEBJbnB1dCgpIGVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcjtcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgcmVhZG9ubHkgc3RhdGVDaGFuZ2VzOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBjb250cm9sVHlwZTogc3RyaW5nID0gJ3RleHRhcmVhJztcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMubmdDb250cm9sICYmIHRoaXMubmdDb250cm9sLmRpc2FibGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uZ0NvbnRyb2wuZGlzYWJsZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5mb2N1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBpZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfVxuXG4gICAgc2V0IGlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faWQgPSB2YWx1ZSB8fCB0aGlzLnVpZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVpcmVkO1xuICAgIH1cblxuICAgIHNldCByZXF1aXJlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9yZXF1aXJlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlQWNjZXNzb3IudmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlQWNjZXNzb3IudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCB1aWQgPSBgbWMtdGV4dHNyZWEtJHtuZXh0VW5pcXVlSWQrK31gO1xuICAgIHByb3RlY3RlZCBwcmV2aW91c05hdGl2ZVZhbHVlOiBhbnk7XG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBwcml2YXRlIF9pZDogc3RyaW5nO1xuICAgIHByaXZhdGUgX3JlcXVpcmVkID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIHZhbHVlQWNjZXNzb3I6IHsgdmFsdWU6IGFueSB9O1xuICAgIHByaXZhdGUgZ3Jvd1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgcHJpdmF0ZSBsaW5lSGVpZ2h0OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgZnJlZVJvd3NIZWlnaHQ6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBtaW5IZWlnaHQ6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sLFxuICAgICAgICBAT3B0aW9uYWwoKSBwYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgQEluamVjdChOR19WQUxJREFUT1JTKSBwdWJsaWMgcmF3VmFsaWRhdG9yczogVmFsaWRhdG9yW10sXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfVkFMSURBVElPTikgcHJpdmF0ZSBtY1ZhbGlkYXRpb246IE1jVmFsaWRhdGlvbk9wdGlvbnMsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIG5nTW9kZWw6IE5nTW9kZWwsXG4gICAgICAgIEBPcHRpb25hbCgpIHBhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgICAgICBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIEBJbmplY3QoTUNfVEVYVEFSRUFfVkFMVUVfQUNDRVNTT1IpIGlucHV0VmFsdWVBY2Nlc3NvcjogYW55LFxuICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlciwgcGFyZW50Rm9ybSwgcGFyZW50Rm9ybUdyb3VwLCBuZ0NvbnRyb2wpO1xuICAgICAgICAvLyBJZiBubyBpbnB1dCB2YWx1ZSBhY2Nlc3NvciB3YXMgZXhwbGljaXRseSBzcGVjaWZpZWQsIHVzZSB0aGUgZWxlbWVudCBhcyB0aGUgdGV4dGFyZWEgdmFsdWVcbiAgICAgICAgLy8gYWNjZXNzb3IuXG4gICAgICAgIHRoaXMudmFsdWVBY2Nlc3NvciA9IGlucHV0VmFsdWVBY2Nlc3NvciB8fCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgICB0aGlzLnByZXZpb3VzTmF0aXZlVmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgICAgIC8vIEZvcmNlIHNldHRlciB0byBiZSBjYWxsZWQgaW4gY2FzZSBpZCB3YXMgbm90IHNwZWNpZmllZC5cbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuaWQ7XG5cbiAgICAgICAgY29uc3QgZ3Jvd09ic2VydmVyID0gZnJvbUV2ZW50KGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2lucHV0Jyk7XG5cbiAgICAgICAgdGhpcy5ncm93U3Vic2NyaXB0aW9uID0gZ3Jvd09ic2VydmVyLnN1YnNjcmliZSh0aGlzLmdyb3cuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5ncm93KCksIDApO1xuICAgICAgICB0aGlzLmxpbmVIZWlnaHQgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5saW5lSGVpZ2h0ISwgMTApO1xuXG4gICAgICAgIGNvbnN0IHBhZGRpbmdUb3AgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5wYWRkaW5nVG9wISwgMTApO1xuICAgICAgICBjb25zdCBwYWRkaW5nQm90dG9tID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkucGFkZGluZ0JvdHRvbSEsIDEwKTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbWFnaWMtbnVtYmVyc1xuICAgICAgICB0aGlzLm1pbkhlaWdodCA9IHRoaXMubGluZUhlaWdodCAqIDIgKyBwYWRkaW5nVG9wICsgcGFkZGluZ0JvdHRvbTtcbiAgICAgICAgdGhpcy5mcmVlUm93c0hlaWdodCA9IHRoaXMubGluZUhlaWdodDtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLmdyb3dTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5uZ0NvbnRyb2wpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKHRoaXMubWNWYWxpZGF0aW9uLnVzZVZhbGlkYXRpb24pIHtcbiAgICAgICAgICAgIHNldE1vc2FpY1ZhbGlkYXRpb24odGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0RvQ2hlY2soKSB7XG4gICAgICAgIGlmICh0aGlzLm5nQ29udHJvbCkge1xuICAgICAgICAgICAgLy8gV2UgbmVlZCB0byByZS1ldmFsdWF0ZSB0aGlzIG9uIGV2ZXJ5IGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUsIGJlY2F1c2UgdGhlcmUgYXJlIHNvbWVcbiAgICAgICAgICAgIC8vIGVycm9yIHRyaWdnZXJzIHRoYXQgd2UgY2FuJ3Qgc3Vic2NyaWJlIHRvIChlLmcuIHBhcmVudCBmb3JtIHN1Ym1pc3Npb25zKS4gVGhpcyBtZWFuc1xuICAgICAgICAgICAgLy8gdGhhdCB3aGF0ZXZlciBsb2dpYyBpcyBpbiBoZXJlIGhhcyB0byBiZSBzdXBlciBsZWFuIG9yIHdlIHJpc2sgZGVzdHJveWluZyB0aGUgcGVyZm9ybWFuY2UuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUVycm9yU3RhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gZGlydHktY2hlY2sgdGhlIG5hdGl2ZSBlbGVtZW50J3MgdmFsdWUsIGJlY2F1c2UgdGhlcmUgYXJlIHNvbWUgY2FzZXMgd2hlcmVcbiAgICAgICAgLy8gd2Ugd29uJ3QgYmUgbm90aWZpZWQgd2hlbiBpdCBjaGFuZ2VzIChlLmcuIHRoZSBjb25zdW1lciBpc24ndCB1c2luZyBmb3JtcyBvciB0aGV5J3JlXG4gICAgICAgIC8vIHVwZGF0aW5nIHRoZSB2YWx1ZSB1c2luZyBgZW1pdEV2ZW50OiBmYWxzZWApLlxuICAgICAgICB0aGlzLmRpcnR5Q2hlY2tOYXRpdmVWYWx1ZSgpO1xuICAgIH1cblxuICAgIC8qKiBHcm93IHRleHRhcmVhIGhlaWdodCB0byBhdm9pZCB2ZXJ0aWNhbCBzY3JvbGwgICovXG4gICAgZ3JvdygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNhbkdyb3cpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRleHRhcmVhID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgICAgIGNvbnN0IG91dGVySGVpZ2h0ID0gcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUodGV4dGFyZWEpLmhlaWdodCEsIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IGRpZmYgPSBvdXRlckhlaWdodCAtIHRleHRhcmVhLmNsaWVudEhlaWdodDtcblxuICAgICAgICAgICAgdGV4dGFyZWEuc3R5bGUubWluSGVpZ2h0ID0gMDsgLy8gdGhpcyBsaW5lIGlzIGltcG9ydGFudCB0byBoZWlnaHQgcmVjYWxjdWxhdGlvblxuXG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBNYXRoLm1heCh0aGlzLm1pbkhlaWdodCwgK3RleHRhcmVhLnNjcm9sbEhlaWdodCArIGRpZmYgKyB0aGlzLmZyZWVSb3dzSGVpZ2h0KTtcbiAgICAgICAgICAgIHRleHRhcmVhLnN0eWxlLm1pbkhlaWdodCA9IGAke2hlaWdodH1weGA7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBGb2N1c2VzIHRoZSB0ZXh0YXJlYS4gKi9cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvKiogQ2FsbGJhY2sgZm9yIHRoZSBjYXNlcyB3aGVyZSB0aGUgZm9jdXNlZCBzdGF0ZSBvZiB0aGUgdGV4dGFyZWEgY2hhbmdlcy4gKi9cbiAgICBmb2N1c0NoYW5nZWQoaXNGb2N1c2VkOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChpc0ZvY3VzZWQgIT09IHRoaXMuZm9jdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gaXNGb2N1c2VkO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldCBlbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSAmJiAhdGhpcy5pc0JhZElucHV0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uQ29udGFpbmVyQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvKiogRG9lcyBzb21lIG1hbnVhbCBkaXJ0eSBjaGVja2luZyBvbiB0aGUgbmF0aXZlIHRleHRhcmVhIGB2YWx1ZWAgcHJvcGVydHkuICovXG4gICAgcHJvdGVjdGVkIGRpcnR5Q2hlY2tOYXRpdmVWYWx1ZSgpIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLnByZXZpb3VzTmF0aXZlVmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzTmF0aXZlVmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBDaGVja3Mgd2hldGhlciB0aGUgdGV4dGFyZWEgaXMgaW52YWxpZCBiYXNlZCBvbiB0aGUgbmF0aXZlIHZhbGlkYXRpb24uICovXG4gICAgcHJvdGVjdGVkIGlzQmFkSW5wdXQoKTogYm9vbGVhbiB7XG4gICAgICAgIC8vIFRoZSBgdmFsaWRpdHlgIHByb3BlcnR5IHdvbid0IGJlIHByZXNlbnQgb24gcGxhdGZvcm0tc2VydmVyLlxuICAgICAgICBjb25zdCB2YWxpZGl0eSA9ICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MVGV4dEFyZWFFbGVtZW50KS52YWxpZGl0eTtcblxuICAgICAgICByZXR1cm4gdmFsaWRpdHkgJiYgdmFsaWRpdHkuYmFkSW5wdXQ7XG4gICAgfVxuXG59XG4iXX0=