import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, EventEmitter, Inject, Input, Optional, Output, Renderer2, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { hasModifierKey, ENTER, TAB, SPACE, COMMA } from '@ptsecurity/cdk/keycodes';
import { MC_TAGS_DEFAULT_OPTIONS } from './tag-default-options';
import { McTagList } from './tag-list.component';
// Increasing integer for generating unique ids.
let nextUniqueId = 0;
/**
 * Directive that adds tag-specific behaviors to an input element inside `<mc-form-field>`.
 * May be placed inside or outside of an `<mc-tag-list>`.
 */
export class McTagInput {
    constructor(elementRef, renderer, defaultOptions, ngControl) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.defaultOptions = defaultOptions;
        this.ngControl = ngControl;
        /** Whether the control is focused. */
        this.focused = false;
        /**
         * The list of key codes that will trigger a tagEnd event.
         *
         * Defaults to `[ENTER]`.
         */
        this.separatorKeyCodes = this.defaultOptions.separatorKeyCodes;
        /** Emitted when a tag is to be added. */
        this.tagEnd = new EventEmitter();
        /** The input's placeholder text. */
        this.placeholder = '';
        /** Unique id for the input. */
        this.id = `mc-tag-list-input-${nextUniqueId++}`;
        this._addOnBlur = true;
        this._disabled = false;
        this.countOfSymbolsForUpdateWidth = 3;
        // tslint:disable-next-line: no-unnecessary-type-assertion
        this.inputElement = this.elementRef.nativeElement;
        this.setDefaultInputWidth();
    }
    /** Register input for tag list */
    set tagList(value) {
        if (value) {
            this._tagList = value;
            this._tagList.registerInput(this);
        }
    }
    /**
     * Whether or not the tagEnd event will be emitted when the input is blurred.
     */
    get addOnBlur() {
        return this._addOnBlur;
    }
    set addOnBlur(value) {
        this._addOnBlur = coerceBooleanProperty(value);
    }
    /** Whether the input is disabled. */
    get disabled() {
        return this._disabled || (this._tagList && this._tagList.disabled);
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /** Whether the input is empty. */
    get empty() {
        return !this.inputElement.value;
    }
    ngOnChanges() {
        this._tagList.stateChanges.next();
    }
    onKeydown(event) {
        if (!this.inputElement.value) {
            this._tagList.keydown(event);
        }
        if (this.isSeparatorKey(event)) {
            this.emitTagEnd();
            event.preventDefault();
        }
    }
    /** Checks to see if the blur should emit the (tagEnd) event. */
    blur() {
        this.focused = false;
        // Blur the tag list if it is not focused
        if (!this._tagList.focused) {
            this.triggerValidation();
            this._tagList.blur();
        }
        // tslint:disable-next-line: no-unnecessary-type-assertion
        if (this.addOnBlur) {
            this.emitTagEnd();
        }
        this._tagList.stateChanges.next();
    }
    triggerValidation() {
        if (!this.hasControl()) {
            return;
        }
        this.ngControl.statusChanges.emit(this.ngControl.status);
    }
    /** Checks to see if the (tagEnd) event needs to be emitted. */
    emitTagEnd() {
        if (!this.hasControl() || (this.hasControl() && !this.ngControl.invalid)) {
            this.tagEnd.emit({ input: this.inputElement, value: this.inputElement.value });
            this.updateInputWidth();
        }
    }
    onInput() {
        this.updateInputWidth();
        // Let tag list know whenever the value changes.
        this._tagList.stateChanges.next();
    }
    onPaste($event) {
        if (!$event.clipboardData) {
            return;
        }
        const data = $event.clipboardData.getData('text');
        if (data && data.length === 0) {
            return;
        }
        const items = [];
        for (const key of this.separatorKeyCodes) {
            const separator = this.separatorKeyToSymbol(key);
            if (data.search(separator) > -1) {
                items.push(...data.split(separator));
                break;
            }
        }
        if (items.length === 0) {
            items.push(data);
        }
        items.forEach((item) => this.tagEnd.emit({ input: this.inputElement, value: item }));
        this.updateInputWidth();
        $event.preventDefault();
        $event.stopPropagation();
    }
    updateInputWidth() {
        const length = this.inputElement.value.length;
        this.renderer.setStyle(this.inputElement, 'max-width', 0);
        this.oneSymbolWidth = this.inputElement.scrollWidth / length;
        this.renderer.setStyle(this.inputElement, 'max-width', '');
        if (length > this.countOfSymbolsForUpdateWidth) {
            this.renderer.setStyle(this.inputElement, 'width', `${length * this.oneSymbolWidth}px`);
        }
        else {
            this.setDefaultInputWidth();
        }
    }
    onFocus() {
        this.focused = true;
        this._tagList.stateChanges.next();
    }
    /** Focuses the input. */
    focus() {
        this.inputElement.focus();
    }
    separatorKeyToSymbol(k) {
        const sep = {
            [ENTER]: /\r?\n/,
            [TAB]: /\t/,
            [SPACE]: / /,
            [COMMA]: /,/
        }[k];
        if (sep) {
            return sep;
        }
        return k;
    }
    hasControl() {
        return !!this.ngControl;
    }
    setDefaultInputWidth() {
        this.renderer.setStyle(this.inputElement, 'width', '30px');
    }
    /** Checks whether a keycode is one of the configured separators. */
    isSeparatorKey(event) {
        if (hasModifierKey(event)) {
            return false;
        }
        // tslint:disable-next-line: deprecation
        return this.separatorKeyCodes.indexOf(event.keyCode) > -1;
    }
}
McTagInput.decorators = [
    { type: Directive, args: [{
                selector: 'input[mcTagInputFor]',
                exportAs: 'mcTagInput, mcTagInputFor',
                host: {
                    class: 'mc-tag-input',
                    '[id]': 'id',
                    '[attr.disabled]': 'disabled || null',
                    '[attr.placeholder]': 'placeholder || null',
                    '(keydown)': 'onKeydown($event)',
                    '(blur)': 'blur()',
                    '(focus)': 'onFocus()',
                    '(input)': 'onInput()',
                    '(paste)': 'onPaste($event)'
                }
            },] }
];
/** @nocollapse */
McTagInput.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: undefined, decorators: [{ type: Inject, args: [MC_TAGS_DEFAULT_OPTIONS,] }] },
    { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
];
McTagInput.propDecorators = {
    separatorKeyCodes: [{ type: Input, args: ['mcTagInputSeparatorKeyCodes',] }],
    tagEnd: [{ type: Output, args: ['mcTagInputTokenEnd',] }],
    placeholder: [{ type: Input }],
    id: [{ type: Input }],
    tagList: [{ type: Input, args: ['mcTagInputFor',] }],
    addOnBlur: [{ type: Input, args: ['mcTagInputAddOnBlur',] }],
    disabled: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RhZ3MvdGFnLWlucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUVMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULElBQUksRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVwRixPQUFPLEVBQUUsdUJBQXVCLEVBQXdCLE1BQU0sdUJBQXVCLENBQUM7QUFDdEYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBY2pELGdEQUFnRDtBQUNoRCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFckI7OztHQUdHO0FBa0JILE1BQU0sT0FBTyxVQUFVO0lBd0VuQixZQUNZLFVBQXdDLEVBQ3hDLFFBQW1CLEVBQ2MsY0FBb0MsRUFDbEQsU0FBb0I7UUFIdkMsZUFBVSxHQUFWLFVBQVUsQ0FBOEI7UUFDeEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNjLG1CQUFjLEdBQWQsY0FBYyxDQUFzQjtRQUNsRCxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBM0VuRCxzQ0FBc0M7UUFDdEMsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUV6Qjs7OztXQUlHO1FBRUgsc0JBQWlCLEdBQWEsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQztRQUVwRSx5Q0FBeUM7UUFFekMsV0FBTSxHQUFrQyxJQUFJLFlBQVksRUFBbUIs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QyxXQUFXLEVBQUUsbUJBQW1CO29CQUNoQyxRQUFRLEVBQUUsUUFBUTtvQkFDbEIsU0FBUyxFQUFFLFdBQVc7b0JBQ3RCLFNBQVMsRUFBRSxXQUFXO29CQUN0QixTQUFTLEVBQUUsaUJBQWlCO2lCQUMvQjthQUNKOzs7O1lBbkRHLFVBQVU7WUFPVixTQUFTOzRDQXdISixNQUFNLFNBQUMsdUJBQXVCO1lBckg5QixTQUFTLHVCQXNIVCxRQUFRLFlBQUksSUFBSTs7O2dDQW5FcEIsS0FBSyxTQUFDLDZCQUE2QjtxQkFJbkMsTUFBTSxTQUFDLG9CQUFvQjswQkFJM0IsS0FBSztpQkFHTCxLQUFLO3NCQUdMLEtBQUssU0FBQyxlQUFlO3dCQWNyQixLQUFLLFNBQUMscUJBQXFCO3VCQVkzQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFJlbmRlcmVyMixcbiAgICBTZWxmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgaGFzTW9kaWZpZXJLZXksIEVOVEVSLCBUQUIsIFNQQUNFLCBDT01NQSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5cbmltcG9ydCB7IE1DX1RBR1NfREVGQVVMVF9PUFRJT05TLCBNY1RhZ3NEZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vdGFnLWRlZmF1bHQtb3B0aW9ucyc7XG5pbXBvcnQgeyBNY1RhZ0xpc3QgfSBmcm9tICcuL3RhZy1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNY1RhZ1RleHRDb250cm9sIH0gZnJvbSAnLi90YWctdGV4dC1jb250cm9sJztcblxuXG4vKiogUmVwcmVzZW50cyBhbiBpbnB1dCBldmVudCBvbiBhIGBtY1RhZ0lucHV0YC4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgTWNUYWdJbnB1dEV2ZW50IHtcbiAgICAvKiogVGhlIG5hdGl2ZSBgPGlucHV0PmAgZWxlbWVudCB0aGF0IHRoZSBldmVudCBpcyBiZWluZyBmaXJlZCBmb3IuICovXG4gICAgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICAvKiogVGhlIHZhbHVlIG9mIHRoZSBpbnB1dC4gKi9cbiAgICB2YWx1ZTogc3RyaW5nO1xufVxuXG4vLyBJbmNyZWFzaW5nIGludGVnZXIgZm9yIGdlbmVyYXRpbmcgdW5pcXVlIGlkcy5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0aGF0IGFkZHMgdGFnLXNwZWNpZmljIGJlaGF2aW9ycyB0byBhbiBpbnB1dCBlbGVtZW50IGluc2lkZSBgPG1jLWZvcm0tZmllbGQ+YC5cbiAqIE1heSBiZSBwbGFjZWQgaW5zaWRlIG9yIG91dHNpZGUgb2YgYW4gYDxtYy10YWctbGlzdD5gLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2lucHV0W21jVGFnSW5wdXRGb3JdJyxcbiAgICBleHBvcnRBczogJ21jVGFnSW5wdXQsIG1jVGFnSW5wdXRGb3InLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy10YWctaW5wdXQnLFxuXG4gICAgICAgICdbaWRdJzogJ2lkJyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAgICAgJ1thdHRyLnBsYWNlaG9sZGVyXSc6ICdwbGFjZWhvbGRlciB8fCBudWxsJyxcblxuICAgICAgICAnKGtleWRvd24pJzogJ29uS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyhibHVyKSc6ICdibHVyKCknLFxuICAgICAgICAnKGZvY3VzKSc6ICdvbkZvY3VzKCknLFxuICAgICAgICAnKGlucHV0KSc6ICdvbklucHV0KCknLFxuICAgICAgICAnKHBhc3RlKSc6ICdvblBhc3RlKCRldmVudCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1RhZ0lucHV0IGltcGxlbWVudHMgTWNUYWdUZXh0Q29udHJvbCwgT25DaGFuZ2VzIHtcbiAgICAvKiogV2hldGhlciB0aGUgY29udHJvbCBpcyBmb2N1c2VkLiAqL1xuICAgIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBsaXN0IG9mIGtleSBjb2RlcyB0aGF0IHdpbGwgdHJpZ2dlciBhIHRhZ0VuZCBldmVudC5cbiAgICAgKlxuICAgICAqIERlZmF1bHRzIHRvIGBbRU5URVJdYC5cbiAgICAgKi9cbiAgICBASW5wdXQoJ21jVGFnSW5wdXRTZXBhcmF0b3JLZXlDb2RlcycpXG4gICAgc2VwYXJhdG9yS2V5Q29kZXM6IG51bWJlcltdID0gdGhpcy5kZWZhdWx0T3B0aW9ucy5zZXBhcmF0b3JLZXlDb2RlcztcblxuICAgIC8qKiBFbWl0dGVkIHdoZW4gYSB0YWcgaXMgdG8gYmUgYWRkZWQuICovXG4gICAgQE91dHB1dCgnbWNUYWdJbnB1dFRva2VuRW5kJylcbiAgICB0YWdFbmQ6IEV2ZW50RW1pdHRlcjxNY1RhZ0lucHV0RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNY1RhZ0lucHV0RXZlbnQ+KCk7XG5cbiAgICAvKiogVGhlIGlucHV0J3MgcGxhY2Vob2xkZXIgdGV4dC4gKi9cbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XG5cbiAgICAvKiogVW5pcXVlIGlkIGZvciB0aGUgaW5wdXQuICovXG4gICAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBtYy10YWctbGlzdC1pbnB1dC0ke25leHRVbmlxdWVJZCsrfWA7XG5cbiAgICAvKiogUmVnaXN0ZXIgaW5wdXQgZm9yIHRhZyBsaXN0ICovXG4gICAgQElucHV0KCdtY1RhZ0lucHV0Rm9yJylcbiAgICBzZXQgdGFnTGlzdCh2YWx1ZTogTWNUYWdMaXN0KSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fdGFnTGlzdCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fdGFnTGlzdC5yZWdpc3RlcklucHV0KHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuYW1pbmctY29udmVudGlvblxuICAgIHByaXZhdGUgX3RhZ0xpc3Q6IE1jVGFnTGlzdDtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgb3Igbm90IHRoZSB0YWdFbmQgZXZlbnQgd2lsbCBiZSBlbWl0dGVkIHdoZW4gdGhlIGlucHV0IGlzIGJsdXJyZWQuXG4gICAgICovXG4gICAgQElucHV0KCdtY1RhZ0lucHV0QWRkT25CbHVyJylcbiAgICBnZXQgYWRkT25CbHVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkT25CbHVyO1xuICAgIH1cblxuICAgIHNldCBhZGRPbkJsdXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fYWRkT25CbHVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hZGRPbkJsdXI6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGlucHV0IGlzIGRpc2FibGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQgfHwgKHRoaXMuX3RhZ0xpc3QgJiYgdGhpcy5fdGFnTGlzdC5kaXNhYmxlZCk7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGlucHV0IGlzIGVtcHR5LiAqL1xuICAgIGdldCBlbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmlucHV0RWxlbWVudC52YWx1ZTtcbiAgICB9XG5cbiAgICBjb3VudE9mU3ltYm9sc0ZvclVwZGF0ZVdpZHRoOiBudW1iZXIgPSAzO1xuXG4gICAgcHJpdmF0ZSBvbmVTeW1ib2xXaWR0aDogbnVtYmVyO1xuXG4gICAgLyoqIFRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudCB0byB3aGljaCB0aGlzIGRpcmVjdGl2ZSBpcyBhdHRhY2hlZC4gKi9cbiAgICBwcml2YXRlIGlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4sXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgQEluamVjdChNQ19UQUdTX0RFRkFVTFRfT1BUSU9OUykgcHJpdmF0ZSBkZWZhdWx0T3B0aW9uczogTWNUYWdzRGVmYXVsdE9wdGlvbnMsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sXG4gICAgKSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW5uZWNlc3NhcnktdHlwZS1hc3NlcnRpb25cbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgICAgIHRoaXMuc2V0RGVmYXVsdElucHV0V2lkdGgoKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgdGhpcy5fdGFnTGlzdC5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuaW5wdXRFbGVtZW50LnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl90YWdMaXN0LmtleWRvd24oZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTZXBhcmF0b3JLZXkoZXZlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRUYWdFbmQoKTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBDaGVja3MgdG8gc2VlIGlmIHRoZSBibHVyIHNob3VsZCBlbWl0IHRoZSAodGFnRW5kKSBldmVudC4gKi9cbiAgICBibHVyKCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgLy8gQmx1ciB0aGUgdGFnIGxpc3QgaWYgaXQgaXMgbm90IGZvY3VzZWRcbiAgICAgICAgaWYgKCF0aGlzLl90YWdMaXN0LmZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlclZhbGlkYXRpb24oKTtcblxuICAgICAgICAgICAgdGhpcy5fdGFnTGlzdC5ibHVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVubmVjZXNzYXJ5LXR5cGUtYXNzZXJ0aW9uXG4gICAgICAgIGlmICh0aGlzLmFkZE9uQmx1cikge1xuICAgICAgICAgICAgdGhpcy5lbWl0VGFnRW5kKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl90YWdMaXN0LnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgdHJpZ2dlclZhbGlkYXRpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNDb250cm9sKCkpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgKHRoaXMubmdDb250cm9sLnN0YXR1c0NoYW5nZXMgYXMgRXZlbnRFbWl0dGVyPHN0cmluZyB8IG51bGw+KS5lbWl0KHRoaXMubmdDb250cm9sLnN0YXR1cyk7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB0byBzZWUgaWYgdGhlICh0YWdFbmQpIGV2ZW50IG5lZWRzIHRvIGJlIGVtaXR0ZWQuICovXG4gICAgZW1pdFRhZ0VuZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0NvbnRyb2woKSB8fCAodGhpcy5oYXNDb250cm9sKCkgJiYgIXRoaXMubmdDb250cm9sLmludmFsaWQpKSB7XG4gICAgICAgICAgICB0aGlzLnRhZ0VuZC5lbWl0KHsgaW5wdXQ6IHRoaXMuaW5wdXRFbGVtZW50LCB2YWx1ZTogdGhpcy5pbnB1dEVsZW1lbnQudmFsdWUgfSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0V2lkdGgoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5wdXQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRXaWR0aCgpO1xuICAgICAgICAvLyBMZXQgdGFnIGxpc3Qga25vdyB3aGVuZXZlciB0aGUgdmFsdWUgY2hhbmdlcy5cbiAgICAgICAgdGhpcy5fdGFnTGlzdC5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIG9uUGFzdGUoJGV2ZW50OiBDbGlwYm9hcmRFdmVudCkge1xuICAgICAgICBpZiAoISRldmVudC5jbGlwYm9hcmREYXRhKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNvbnN0IGRhdGEgPSAkZXZlbnQuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0Jyk7XG5cbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgY29uc3QgaXRlbXM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5zZXBhcmF0b3JLZXlDb2Rlcykge1xuICAgICAgICAgICAgY29uc3Qgc2VwYXJhdG9yID0gdGhpcy5zZXBhcmF0b3JLZXlUb1N5bWJvbChrZXkpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zZWFyY2goc2VwYXJhdG9yKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaCguLi5kYXRhLnNwbGl0KHNlcGFyYXRvcikpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKGRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4gdGhpcy50YWdFbmQuZW1pdCh7IGlucHV0OiB0aGlzLmlucHV0RWxlbWVudCwgdmFsdWU6IGl0ZW0gfSkpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRXaWR0aCgpO1xuXG4gICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlSW5wdXRXaWR0aCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5pbnB1dEVsZW1lbnQudmFsdWUubGVuZ3RoO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5pbnB1dEVsZW1lbnQsICdtYXgtd2lkdGgnLCAwKTtcbiAgICAgICAgdGhpcy5vbmVTeW1ib2xXaWR0aCA9IHRoaXMuaW5wdXRFbGVtZW50LnNjcm9sbFdpZHRoIC8gbGVuZ3RoO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaW5wdXRFbGVtZW50LCAnbWF4LXdpZHRoJywgJycpO1xuXG4gICAgICAgIGlmIChsZW5ndGggPiB0aGlzLmNvdW50T2ZTeW1ib2xzRm9yVXBkYXRlV2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5pbnB1dEVsZW1lbnQsICd3aWR0aCcsIGAke2xlbmd0aCAqIHRoaXMub25lU3ltYm9sV2lkdGh9cHhgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGVmYXVsdElucHV0V2lkdGgoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRm9jdXMoKSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX3RhZ0xpc3Quc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKiogRm9jdXNlcyB0aGUgaW5wdXQuICovXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXRFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXBhcmF0b3JLZXlUb1N5bWJvbChrKTogUmVnRXhwIHwgc3RyaW5nIHtcbiAgICAgICAgY29uc3Qgc2VwID0ge1xuICAgICAgICAgICAgW0VOVEVSXTogL1xccj9cXG4vLFxuICAgICAgICAgICAgW1RBQl06IC9cXHQvLFxuICAgICAgICAgICAgW1NQQUNFXTogLyAvLFxuICAgICAgICAgICAgW0NPTU1BXTogLywvXG4gICAgICAgIH1ba107XG5cbiAgICAgICAgaWYgKHNlcCkgeyByZXR1cm4gc2VwOyB9XG5cbiAgICAgICAgcmV0dXJuIGs7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYXNDb250cm9sKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLm5nQ29udHJvbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldERlZmF1bHRJbnB1dFdpZHRoKCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaW5wdXRFbGVtZW50LCAnd2lkdGgnLCAnMzBweCcpO1xuICAgIH1cblxuICAgIC8qKiBDaGVja3Mgd2hldGhlciBhIGtleWNvZGUgaXMgb25lIG9mIHRoZSBjb25maWd1cmVkIHNlcGFyYXRvcnMuICovXG4gICAgcHJpdmF0ZSBpc1NlcGFyYXRvcktleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoaGFzTW9kaWZpZXJLZXkoZXZlbnQpKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VwYXJhdG9yS2V5Q29kZXMuaW5kZXhPZihldmVudC5rZXlDb2RlKSA+IC0xO1xuICAgIH1cbn1cbiJdfQ==