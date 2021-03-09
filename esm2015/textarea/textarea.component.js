import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, Inject, Input, Optional, Self, InjectionToken, NgZone } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher, mixinErrorState } from '@ptsecurity/mosaic/core';
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
    constructor(elementRef, ngControl, parentForm, parentFormGroup, defaultErrorStateMatcher, inputValueAccessor, ngZone) {
        super(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RleHRhcmVhL3RleHRhcmVhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0gsU0FBUyxFQUFXLFVBQVUsRUFBRSxNQUFNLEVBQ3RDLEtBQUssRUFBd0IsUUFBUSxFQUNyQyxJQUFJLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFDL0IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBR0gsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDbEIsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsU0FBUyxFQUFnQixPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHeEQsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQUcsSUFBSSxjQUFjLENBQWlCLDRCQUE0QixDQUFDLENBQUM7QUFFM0csSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBR3JCLE1BQU0sT0FBTyxjQUFjO0lBQ3ZCLFlBQ1csd0JBQTJDLEVBQzNDLFVBQWtCLEVBQ2xCLGVBQW1DLEVBQ25DLFNBQW9CO1FBSHBCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBbUI7UUFDM0MsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNsQixvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7UUFDbkMsY0FBUyxHQUFULFNBQVMsQ0FBVztJQUM1QixDQUFDO0NBQ1A7QUFFRCw2Q0FBNkM7QUFDN0MsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQW9ELGVBQWUsQ0FBQyxjQUFjLENBQUMs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Z0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxDQUFDO2FBQ3hFOzs7O1lBakR1QixVQUFVO1lBSUwsU0FBUyx1QkE2SjdCLFFBQVEsWUFBSSxJQUFJO1lBN0plLE1BQU0sdUJBOEpyQyxRQUFRO1lBOUpSLGtCQUFrQix1QkErSmxCLFFBQVE7WUEzSmIsaUJBQWlCOzRDQTZKWixRQUFRLFlBQUksSUFBSSxZQUFJLE1BQU0sU0FBQywwQkFBMEI7WUFuS3BDLE1BQU07OztzQkFtRDNCLEtBQUs7Z0NBR0wsS0FBSzt1QkF3QkwsS0FBSztpQkFzQkwsS0FBSzswQkFhTCxLQUFLO3VCQU1MLEtBQUs7b0JBYUwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIERpcmVjdGl2ZSwgRG9DaGVjaywgRWxlbWVudFJlZiwgSW5qZWN0LFxuICAgIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3B0aW9uYWwsXG4gICAgU2VsZiwgSW5qZWN0aW9uVG9rZW4sIE5nWm9uZSwgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwRGlyZWN0aXZlLCBOZ0NvbnRyb2wsIE5nRm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gICAgQ2FuVXBkYXRlRXJyb3JTdGF0ZSxcbiAgICBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvcixcbiAgICBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICBtaXhpbkVycm9yU3RhdGVcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNGb3JtRmllbGRDb250cm9sIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJzY3JpcHRpb24sIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuXG5leHBvcnQgY29uc3QgTUNfVEVYVEFSRUFfVkFMVUVfQUNDRVNTT1IgPSBuZXcgSW5qZWN0aW9uVG9rZW48eyB2YWx1ZTogYW55IH0+KCdNQ19URVhUQVJFQV9WQUxVRV9BQ0NFU1NPUicpO1xuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxuXG5leHBvcnQgY2xhc3MgTWNUZXh0YXJlYUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICAgICAgcHVibGljIHBhcmVudEZvcm06IE5nRm9ybSxcbiAgICAgICAgcHVibGljIHBhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgICAgICBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2xcbiAgICApIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jVGV4dGFyZWFNaXhpbkJhc2U6IENhblVwZGF0ZUVycm9yU3RhdGVDdG9yICYgdHlwZW9mIE1jVGV4dGFyZWFCYXNlID0gbWl4aW5FcnJvclN0YXRlKE1jVGV4dGFyZWFCYXNlKTtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICd0ZXh0YXJlYVttY1RleHRhcmVhXScsXG4gICAgZXhwb3J0QXM6ICdtY1RleHRhcmVhJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdGV4dGFyZWEnLFxuICAgICAgICAnW2NsYXNzLm1jLXRleHRhcmVhLXJlc2l6YWJsZV0nOiAnIWNhbkdyb3cnLFxuXG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgICAgICAnW2F0dHIucGxhY2Vob2xkZXJdJzogJ3BsYWNlaG9sZGVyJyxcbiAgICAgICAgJ1thdHRyLmFyaWEtaW52YWxpZF0nOiAnZXJyb3JTdGF0ZScsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgICAgICdbYXR0ci5yZXF1aXJlZF0nOiAncmVxdWlyZWQnLFxuXG4gICAgICAgICcoYmx1ciknOiAnZm9jdXNDaGFuZ2VkKGZhbHNlKScsXG4gICAgICAgICcoZm9jdXMpJzogJ2ZvY3VzQ2hhbmdlZCh0cnVlKSdcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTWNGb3JtRmllbGRDb250cm9sLCB1c2VFeGlzdGluZzogTWNUZXh0YXJlYSB9XVxufSlcbmV4cG9ydCBjbGFzcyBNY1RleHRhcmVhIGV4dGVuZHMgTWNUZXh0YXJlYU1peGluQmFzZSBpbXBsZW1lbnRzIE1jRm9ybUZpZWxkQ29udHJvbDxhbnk+LCBPbkluaXQsIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksIERvQ2hlY2ssIENhblVwZGF0ZUVycm9yU3RhdGUge1xuXG4gICAgQElucHV0KCkgY2FuR3JvdzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogQW4gb2JqZWN0IHVzZWQgdG8gY29udHJvbCB3aGVuIGVycm9yIG1lc3NhZ2VzIGFyZSBzaG93bi4gKi9cbiAgICBASW5wdXQoKSBlcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXI7XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIHJlYWRvbmx5IHN0YXRlQ2hhbmdlczogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgY29udHJvbFR5cGU6IHN0cmluZyA9ICdtYy10ZXh0YXJlYSc7XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLm5nQ29udHJvbCAmJiB0aGlzLm5nQ29udHJvbC5kaXNhYmxlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmdDb250cm9sLmRpc2FibGVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZm9jdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cblxuICAgIHNldCBpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2lkID0gdmFsdWUgfHwgdGhpcy51aWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXF1aXJlZDtcbiAgICB9XG5cbiAgICBzZXQgcmVxdWlyZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fcmVxdWlyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZUFjY2Vzc29yLnZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZUFjY2Vzc29yLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdWlkID0gYG1jLXRleHRzcmVhLSR7bmV4dFVuaXF1ZUlkKyt9YDtcbiAgICBwcm90ZWN0ZWQgcHJldmlvdXNOYXRpdmVWYWx1ZTogYW55O1xuICAgIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcbiAgICBwcml2YXRlIF9yZXF1aXJlZCA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSB2YWx1ZUFjY2Vzc29yOiB7IHZhbHVlOiBhbnkgfTtcbiAgICBwcml2YXRlIGdyb3dTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIHByaXZhdGUgbGluZUhlaWdodDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGZyZWVSb3dzSGVpZ2h0OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgbWluSGVpZ2h0OiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHB1YmxpYyBuZ0NvbnRyb2w6IE5nQ29udHJvbCxcbiAgICAgICAgQE9wdGlvbmFsKCkgcGFyZW50Rm9ybTogTmdGb3JtLFxuICAgICAgICBAT3B0aW9uYWwoKSBwYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICAgICAgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE1DX1RFWFRBUkVBX1ZBTFVFX0FDQ0VTU09SKSBpbnB1dFZhbHVlQWNjZXNzb3I6IGFueSxcbiAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxuICAgICkge1xuICAgICAgICBzdXBlcihkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXIsIHBhcmVudEZvcm0sIHBhcmVudEZvcm1Hcm91cCwgbmdDb250cm9sKTtcbiAgICAgICAgLy8gSWYgbm8gaW5wdXQgdmFsdWUgYWNjZXNzb3Igd2FzIGV4cGxpY2l0bHkgc3BlY2lmaWVkLCB1c2UgdGhlIGVsZW1lbnQgYXMgdGhlIHRleHRhcmVhIHZhbHVlXG4gICAgICAgIC8vIGFjY2Vzc29yLlxuICAgICAgICB0aGlzLnZhbHVlQWNjZXNzb3IgPSBpbnB1dFZhbHVlQWNjZXNzb3IgfHwgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgdGhpcy5wcmV2aW91c05hdGl2ZVZhbHVlID0gdGhpcy52YWx1ZTtcblxuICAgICAgICAvLyBGb3JjZSBzZXR0ZXIgdG8gYmUgY2FsbGVkIGluIGNhc2UgaWQgd2FzIG5vdCBzcGVjaWZpZWQuXG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLmlkO1xuXG4gICAgICAgIGNvbnN0IGdyb3dPYnNlcnZlciA9IGZyb21FdmVudChlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdpbnB1dCcpO1xuXG4gICAgICAgIHRoaXMuZ3Jvd1N1YnNjcmlwdGlvbiA9IGdyb3dPYnNlcnZlci5zdWJzY3JpYmUodGhpcy5ncm93LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZ3JvdygpLCAwKTtcbiAgICAgICAgdGhpcy5saW5lSGVpZ2h0ID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkubGluZUhlaWdodCEsIDEwKTtcblxuICAgICAgICBjb25zdCBwYWRkaW5nVG9wID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkucGFkZGluZ1RvcCEsIDEwKTtcbiAgICAgICAgY29uc3QgcGFkZGluZ0JvdHRvbSA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLnBhZGRpbmdCb3R0b20hLCAxMCk7XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnNcbiAgICAgICAgdGhpcy5taW5IZWlnaHQgPSB0aGlzLmxpbmVIZWlnaHQgKiAyICsgcGFkZGluZ1RvcCArIHBhZGRpbmdCb3R0b207XG4gICAgICAgIHRoaXMuZnJlZVJvd3NIZWlnaHQgPSB0aGlzLmxpbmVIZWlnaHQ7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoKSB7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMuY29tcGxldGUoKTtcbiAgICAgICAgdGhpcy5ncm93U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgbmdEb0NoZWNrKCkge1xuICAgICAgICBpZiAodGhpcy5uZ0NvbnRyb2wpIHtcbiAgICAgICAgICAgIC8vIFdlIG5lZWQgdG8gcmUtZXZhbHVhdGUgdGhpcyBvbiBldmVyeSBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlLCBiZWNhdXNlIHRoZXJlIGFyZSBzb21lXG4gICAgICAgICAgICAvLyBlcnJvciB0cmlnZ2VycyB0aGF0IHdlIGNhbid0IHN1YnNjcmliZSB0byAoZS5nLiBwYXJlbnQgZm9ybSBzdWJtaXNzaW9ucykuIFRoaXMgbWVhbnNcbiAgICAgICAgICAgIC8vIHRoYXQgd2hhdGV2ZXIgbG9naWMgaXMgaW4gaGVyZSBoYXMgdG8gYmUgc3VwZXIgbGVhbiBvciB3ZSByaXNrIGRlc3Ryb3lpbmcgdGhlIHBlcmZvcm1hbmNlLlxuICAgICAgICAgICAgdGhpcy51cGRhdGVFcnJvclN0YXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBuZWVkIHRvIGRpcnR5LWNoZWNrIHRoZSBuYXRpdmUgZWxlbWVudCdzIHZhbHVlLCBiZWNhdXNlIHRoZXJlIGFyZSBzb21lIGNhc2VzIHdoZXJlXG4gICAgICAgIC8vIHdlIHdvbid0IGJlIG5vdGlmaWVkIHdoZW4gaXQgY2hhbmdlcyAoZS5nLiB0aGUgY29uc3VtZXIgaXNuJ3QgdXNpbmcgZm9ybXMgb3IgdGhleSdyZVxuICAgICAgICAvLyB1cGRhdGluZyB0aGUgdmFsdWUgdXNpbmcgYGVtaXRFdmVudDogZmFsc2VgKS5cbiAgICAgICAgdGhpcy5kaXJ0eUNoZWNrTmF0aXZlVmFsdWUoKTtcbiAgICB9XG5cbiAgICAvKiogR3JvdyB0ZXh0YXJlYSBoZWlnaHQgdG8gYXZvaWQgdmVydGljYWwgc2Nyb2xsICAqL1xuICAgIGdyb3coKSB7XG4gICAgICAgIGlmICghdGhpcy5jYW5Hcm93KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZXh0YXJlYSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgICAgICBjb25zdCBvdXRlckhlaWdodCA9IHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRleHRhcmVhKS5oZWlnaHQhLCAxMCk7XG4gICAgICAgICAgICBjb25zdCBkaWZmID0gb3V0ZXJIZWlnaHQgLSB0ZXh0YXJlYS5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgICAgIHRleHRhcmVhLnN0eWxlLm1pbkhlaWdodCA9IDA7IC8vIHRoaXMgbGluZSBpcyBpbXBvcnRhbnQgdG8gaGVpZ2h0IHJlY2FsY3VsYXRpb25cblxuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gTWF0aC5tYXgodGhpcy5taW5IZWlnaHQsICt0ZXh0YXJlYS5zY3JvbGxIZWlnaHQgKyBkaWZmICsgdGhpcy5mcmVlUm93c0hlaWdodCk7XG4gICAgICAgICAgICB0ZXh0YXJlYS5zdHlsZS5taW5IZWlnaHQgPSBgJHtoZWlnaHR9cHhgO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogRm9jdXNlcyB0aGUgdGV4dGFyZWEuICovXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLyoqIENhbGxiYWNrIGZvciB0aGUgY2FzZXMgd2hlcmUgdGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHRleHRhcmVhIGNoYW5nZXMuICovXG4gICAgZm9jdXNDaGFuZ2VkKGlzRm9jdXNlZDogYm9vbGVhbikge1xuICAgICAgICBpZiAoaXNGb2N1c2VkICE9PSB0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IGlzRm9jdXNlZDtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBnZXQgZW1wdHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgJiYgIXRoaXMuaXNCYWRJbnB1dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBvbkNvbnRhaW5lckNsaWNrKCkge1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLyoqIERvZXMgc29tZSBtYW51YWwgZGlydHkgY2hlY2tpbmcgb24gdGhlIG5hdGl2ZSB0ZXh0YXJlYSBgdmFsdWVgIHByb3BlcnR5LiAqL1xuICAgIHByb3RlY3RlZCBkaXJ0eUNoZWNrTmF0aXZlVmFsdWUoKSB7XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy52YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5wcmV2aW91c05hdGl2ZVZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91c05hdGl2ZVZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQ2hlY2tzIHdoZXRoZXIgdGhlIHRleHRhcmVhIGlzIGludmFsaWQgYmFzZWQgb24gdGhlIG5hdGl2ZSB2YWxpZGF0aW9uLiAqL1xuICAgIHByb3RlY3RlZCBpc0JhZElucHV0KCk6IGJvb2xlYW4ge1xuICAgICAgICAvLyBUaGUgYHZhbGlkaXR5YCBwcm9wZXJ0eSB3b24ndCBiZSBwcmVzZW50IG9uIHBsYXRmb3JtLXNlcnZlci5cbiAgICAgICAgY29uc3QgdmFsaWRpdHkgPSAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTFRleHRBcmVhRWxlbWVudCkudmFsaWRpdHk7XG5cbiAgICAgICAgcmV0dXJuIHZhbGlkaXR5ICYmIHZhbGlkaXR5LmJhZElucHV0O1xuICAgIH1cblxufVxuIl19