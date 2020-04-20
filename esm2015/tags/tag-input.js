/**
 * @fileoverview added by tsickle
 * Generated from: tag-input.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, EventEmitter, Inject, Input, Optional, Output, Renderer2, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { hasModifierKey, ENTER, TAB, SPACE, COMMA } from '@ptsecurity/cdk/keycodes';
import { MC_TAGS_DEFAULT_OPTIONS } from './tag-default-options';
import { McTagList } from './tag-list.component';
/**
 * Represents an input event on a `mcTagInput`.
 * @record
 */
export function McTagInputEvent() { }
if (false) {
    /**
     * The native `<input>` element that the event is being fired for.
     * @type {?}
     */
    McTagInputEvent.prototype.input;
    /**
     * The value of the input.
     * @type {?}
     */
    McTagInputEvent.prototype.value;
}
// Increasing integer for generating unique ids.
/** @type {?} */
let nextUniqueId = 0;
/**
 * Directive that adds tag-specific behaviors to an input element inside `<mc-form-field>`.
 * May be placed inside or outside of an `<mc-tag-list>`.
 */
export class McTagInput {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     * @param {?} defaultOptions
     * @param {?} ngControl
     */
    constructor(elementRef, renderer, defaultOptions, ngControl) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.defaultOptions = defaultOptions;
        this.ngControl = ngControl;
        /**
         * Whether the control is focused.
         */
        this.focused = false;
        /**
         * The list of key codes that will trigger a tagEnd event.
         *
         * Defaults to `[ENTER]`.
         */
        this.separatorKeyCodes = this.defaultOptions.separatorKeyCodes;
        /**
         * Emitted when a tag is to be added.
         */
        this.tagEnd = new EventEmitter();
        /**
         * The input's placeholder text.
         */
        this.placeholder = '';
        /**
         * Unique id for the input.
         */
        this.id = `mc-tag-list-input-${nextUniqueId++}`;
        this._addOnBlur = true;
        this._disabled = false;
        this.countOfSymbolsForUpdateWidth = 3;
        // tslint:disable-next-line: no-unnecessary-type-assertion
        this.inputElement = (/** @type {?} */ (this.elementRef.nativeElement));
        this.setDefaultInputWidth();
    }
    /**
     * Register input for tag list
     * @param {?} value
     * @return {?}
     */
    set tagList(value) {
        if (value) {
            this._tagList = value;
            this._tagList.registerInput(this);
        }
    }
    /**
     * Whether or not the tagEnd event will be emitted when the input is blurred.
     * @return {?}
     */
    get addOnBlur() {
        return this._addOnBlur;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set addOnBlur(value) {
        this._addOnBlur = coerceBooleanProperty(value);
    }
    /**
     * Whether the input is disabled.
     * @return {?}
     */
    get disabled() {
        return this._disabled || (this._tagList && this._tagList.disabled);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * Whether the input is empty.
     * @return {?}
     */
    get empty() {
        return !this.inputElement.value;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this._tagList.stateChanges.next();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeydown(event) {
        if (!this.inputElement.value) {
            this._tagList.keydown(event);
        }
        if (this.isSeparatorKey(event)) {
            this.emitTagEnd();
            event.preventDefault();
        }
    }
    /**
     * Checks to see if the blur should emit the (tagEnd) event.
     * @return {?}
     */
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
    /**
     * @return {?}
     */
    triggerValidation() {
        if (!this.hasControl()) {
            return;
        }
        ((/** @type {?} */ (this.ngControl.statusChanges))).emit(this.ngControl.status);
    }
    /**
     * Checks to see if the (tagEnd) event needs to be emitted.
     * @return {?}
     */
    emitTagEnd() {
        if (!this.hasControl() || (this.hasControl() && !this.ngControl.invalid)) {
            this.tagEnd.emit({ input: this.inputElement, value: this.inputElement.value });
            this.updateInputWidth();
        }
    }
    /**
     * @return {?}
     */
    onInput() {
        this.updateInputWidth();
        // Let tag list know whenever the value changes.
        this._tagList.stateChanges.next();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onPaste($event) {
        if (!$event.clipboardData) {
            return;
        }
        /** @type {?} */
        const data = $event.clipboardData.getData('text');
        if (data && data.length === 0) {
            return;
        }
        /** @type {?} */
        const items = [];
        for (const key of this.separatorKeyCodes) {
            /** @type {?} */
            const separator = this.separatorKeyToSymbol(key);
            if (data.search(separator) > -1) {
                items.push(...data.split(separator));
                break;
            }
        }
        if (items.length === 0) {
            items.push(data);
        }
        items.forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => this.tagEnd.emit({ input: this.inputElement, value: item })));
        this.updateInputWidth();
        $event.preventDefault();
        $event.stopPropagation();
    }
    /**
     * @return {?}
     */
    updateInputWidth() {
        /** @type {?} */
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
    /**
     * @return {?}
     */
    onFocus() {
        this.focused = true;
        this._tagList.stateChanges.next();
    }
    /**
     * Focuses the input.
     * @return {?}
     */
    focus() {
        this.inputElement.focus();
    }
    /**
     * @private
     * @param {?} k
     * @return {?}
     */
    separatorKeyToSymbol(k) {
        /** @type {?} */
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
    /**
     * @private
     * @return {?}
     */
    hasControl() {
        return !!this.ngControl;
    }
    /**
     * @private
     * @return {?}
     */
    setDefaultInputWidth() {
        this.renderer.setStyle(this.inputElement, 'width', '30px');
    }
    /**
     * Checks whether a keycode is one of the configured separators.
     * @private
     * @param {?} event
     * @return {?}
     */
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
if (false) {
    /**
     * Whether the control is focused.
     * @type {?}
     */
    McTagInput.prototype.focused;
    /**
     * The list of key codes that will trigger a tagEnd event.
     *
     * Defaults to `[ENTER]`.
     * @type {?}
     */
    McTagInput.prototype.separatorKeyCodes;
    /**
     * Emitted when a tag is to be added.
     * @type {?}
     */
    McTagInput.prototype.tagEnd;
    /**
     * The input's placeholder text.
     * @type {?}
     */
    McTagInput.prototype.placeholder;
    /**
     * Unique id for the input.
     * @type {?}
     */
    McTagInput.prototype.id;
    /**
     * @type {?}
     * @private
     */
    McTagInput.prototype._tagList;
    /**
     * @type {?}
     * @private
     */
    McTagInput.prototype._addOnBlur;
    /**
     * @type {?}
     * @private
     */
    McTagInput.prototype._disabled;
    /** @type {?} */
    McTagInput.prototype.countOfSymbolsForUpdateWidth;
    /**
     * @type {?}
     * @private
     */
    McTagInput.prototype.oneSymbolWidth;
    /**
     * The native input element to which this directive is attached.
     * @type {?}
     * @private
     */
    McTagInput.prototype.inputElement;
    /**
     * @type {?}
     * @private
     */
    McTagInput.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    McTagInput.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    McTagInput.prototype.defaultOptions;
    /** @type {?} */
    McTagInput.prototype.ngControl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RhZ3MvIiwic291cmNlcyI6WyJ0YWctaW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0gsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxJQUFJLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFcEYsT0FBTyxFQUFFLHVCQUF1QixFQUF3QixNQUFNLHVCQUF1QixDQUFDO0FBQ3RGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7QUFNakQscUNBTUM7Ozs7OztJQUpHLGdDQUF3Qjs7Ozs7SUFHeEIsZ0NBQWM7Ozs7SUFJZCxZQUFZLEdBQUcsQ0FBQzs7Ozs7QUF1QnBCLE1BQU0sT0FBTyxVQUFVOzs7Ozs7O0lBd0VuQixZQUNZLFVBQXdDLEVBQ3hDLFFBQW1CLEVBQ2MsY0FBb0MsRUFDbEQsU0FBb0I7UUFIdkMsZUFBVSxHQUFWLFVBQVUsQ0FBOEI7UUFDeEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNjLG1CQUFjLEdBQWQsY0FBYyxDQUFzQjtRQUNsRCxjQUFTLEdBQVQsU0FBUyxDQUFXOzs7O1FBMUVuRCxZQUFPLEdBQVksS0FBSyxDQUFDOzs7Ozs7UUFRekIsc0JBQWlCLEdBQWEsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQzs7OztRQUlwRSxXQUFNLEdBQWtDLElBQUksWUFBWSxFQUFtQixD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RUFBRSxXQUFXO29CQUN0QixTQUFTLEVBQUUsV0FBVztvQkFDdEIsU0FBUyxFQUFFLGlCQUFpQjtpQkFDL0I7YUFDSjs7OztZQW5ERyxVQUFVO1lBT1YsU0FBUzs0Q0F3SEosTUFBTSxTQUFDLHVCQUF1QjtZQXJIOUIsU0FBUyx1QkFzSFQsUUFBUSxZQUFJLElBQUk7OztnQ0FuRXBCLEtBQUssU0FBQyw2QkFBNkI7cUJBSW5DLE1BQU0sU0FBQyxvQkFBb0I7MEJBSTNCLEtBQUs7aUJBR0wsS0FBSztzQkFHTCxLQUFLLFNBQUMsZUFBZTt3QkFjckIsS0FBSyxTQUFDLHFCQUFxQjt1QkFZM0IsS0FBSzs7Ozs7OztJQS9DTiw2QkFBeUI7Ozs7Ozs7SUFPekIsdUNBQ29FOzs7OztJQUdwRSw0QkFDNEU7Ozs7O0lBRzVFLGlDQUFrQzs7Ozs7SUFHbEMsd0JBQTREOzs7OztJQVk1RCw4QkFBNEI7Ozs7O0lBYzVCLGdDQUFtQzs7Ozs7SUFZbkMsK0JBQW1DOztJQU9uQyxrREFBeUM7Ozs7O0lBRXpDLG9DQUErQjs7Ozs7O0lBRy9CLGtDQUF1Qzs7Ozs7SUFHbkMsZ0NBQWdEOzs7OztJQUNoRCw4QkFBMkI7Ozs7O0lBQzNCLG9DQUE2RTs7SUFDN0UsK0JBQStDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFJlbmRlcmVyMixcbiAgICBTZWxmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgaGFzTW9kaWZpZXJLZXksIEVOVEVSLCBUQUIsIFNQQUNFLCBDT01NQSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5cbmltcG9ydCB7IE1DX1RBR1NfREVGQVVMVF9PUFRJT05TLCBNY1RhZ3NEZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vdGFnLWRlZmF1bHQtb3B0aW9ucyc7XG5pbXBvcnQgeyBNY1RhZ0xpc3QgfSBmcm9tICcuL3RhZy1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNY1RhZ1RleHRDb250cm9sIH0gZnJvbSAnLi90YWctdGV4dC1jb250cm9sJztcblxuXG4vKiogUmVwcmVzZW50cyBhbiBpbnB1dCBldmVudCBvbiBhIGBtY1RhZ0lucHV0YC4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgTWNUYWdJbnB1dEV2ZW50IHtcbiAgICAvKiogVGhlIG5hdGl2ZSBgPGlucHV0PmAgZWxlbWVudCB0aGF0IHRoZSBldmVudCBpcyBiZWluZyBmaXJlZCBmb3IuICovXG4gICAgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICAvKiogVGhlIHZhbHVlIG9mIHRoZSBpbnB1dC4gKi9cbiAgICB2YWx1ZTogc3RyaW5nO1xufVxuXG4vLyBJbmNyZWFzaW5nIGludGVnZXIgZm9yIGdlbmVyYXRpbmcgdW5pcXVlIGlkcy5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0aGF0IGFkZHMgdGFnLXNwZWNpZmljIGJlaGF2aW9ycyB0byBhbiBpbnB1dCBlbGVtZW50IGluc2lkZSBgPG1jLWZvcm0tZmllbGQ+YC5cbiAqIE1heSBiZSBwbGFjZWQgaW5zaWRlIG9yIG91dHNpZGUgb2YgYW4gYDxtYy10YWctbGlzdD5gLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2lucHV0W21jVGFnSW5wdXRGb3JdJyxcbiAgICBleHBvcnRBczogJ21jVGFnSW5wdXQsIG1jVGFnSW5wdXRGb3InLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy10YWctaW5wdXQnLFxuXG4gICAgICAgICdbaWRdJzogJ2lkJyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAgICAgJ1thdHRyLnBsYWNlaG9sZGVyXSc6ICdwbGFjZWhvbGRlciB8fCBudWxsJyxcblxuICAgICAgICAnKGtleWRvd24pJzogJ29uS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyhibHVyKSc6ICdibHVyKCknLFxuICAgICAgICAnKGZvY3VzKSc6ICdvbkZvY3VzKCknLFxuICAgICAgICAnKGlucHV0KSc6ICdvbklucHV0KCknLFxuICAgICAgICAnKHBhc3RlKSc6ICdvblBhc3RlKCRldmVudCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1RhZ0lucHV0IGltcGxlbWVudHMgTWNUYWdUZXh0Q29udHJvbCwgT25DaGFuZ2VzIHtcbiAgICAvKiogV2hldGhlciB0aGUgY29udHJvbCBpcyBmb2N1c2VkLiAqL1xuICAgIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBsaXN0IG9mIGtleSBjb2RlcyB0aGF0IHdpbGwgdHJpZ2dlciBhIHRhZ0VuZCBldmVudC5cbiAgICAgKlxuICAgICAqIERlZmF1bHRzIHRvIGBbRU5URVJdYC5cbiAgICAgKi9cbiAgICBASW5wdXQoJ21jVGFnSW5wdXRTZXBhcmF0b3JLZXlDb2RlcycpXG4gICAgc2VwYXJhdG9yS2V5Q29kZXM6IG51bWJlcltdID0gdGhpcy5kZWZhdWx0T3B0aW9ucy5zZXBhcmF0b3JLZXlDb2RlcztcblxuICAgIC8qKiBFbWl0dGVkIHdoZW4gYSB0YWcgaXMgdG8gYmUgYWRkZWQuICovXG4gICAgQE91dHB1dCgnbWNUYWdJbnB1dFRva2VuRW5kJylcbiAgICB0YWdFbmQ6IEV2ZW50RW1pdHRlcjxNY1RhZ0lucHV0RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNY1RhZ0lucHV0RXZlbnQ+KCk7XG5cbiAgICAvKiogVGhlIGlucHV0J3MgcGxhY2Vob2xkZXIgdGV4dC4gKi9cbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XG5cbiAgICAvKiogVW5pcXVlIGlkIGZvciB0aGUgaW5wdXQuICovXG4gICAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBtYy10YWctbGlzdC1pbnB1dC0ke25leHRVbmlxdWVJZCsrfWA7XG5cbiAgICAvKiogUmVnaXN0ZXIgaW5wdXQgZm9yIHRhZyBsaXN0ICovXG4gICAgQElucHV0KCdtY1RhZ0lucHV0Rm9yJylcbiAgICBzZXQgdGFnTGlzdCh2YWx1ZTogTWNUYWdMaXN0KSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fdGFnTGlzdCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fdGFnTGlzdC5yZWdpc3RlcklucHV0KHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuYW1pbmctY29udmVudGlvblxuICAgIHByaXZhdGUgX3RhZ0xpc3Q6IE1jVGFnTGlzdDtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgb3Igbm90IHRoZSB0YWdFbmQgZXZlbnQgd2lsbCBiZSBlbWl0dGVkIHdoZW4gdGhlIGlucHV0IGlzIGJsdXJyZWQuXG4gICAgICovXG4gICAgQElucHV0KCdtY1RhZ0lucHV0QWRkT25CbHVyJylcbiAgICBnZXQgYWRkT25CbHVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkT25CbHVyO1xuICAgIH1cblxuICAgIHNldCBhZGRPbkJsdXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fYWRkT25CbHVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hZGRPbkJsdXI6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGlucHV0IGlzIGRpc2FibGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQgfHwgKHRoaXMuX3RhZ0xpc3QgJiYgdGhpcy5fdGFnTGlzdC5kaXNhYmxlZCk7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGlucHV0IGlzIGVtcHR5LiAqL1xuICAgIGdldCBlbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmlucHV0RWxlbWVudC52YWx1ZTtcbiAgICB9XG5cbiAgICBjb3VudE9mU3ltYm9sc0ZvclVwZGF0ZVdpZHRoOiBudW1iZXIgPSAzO1xuXG4gICAgcHJpdmF0ZSBvbmVTeW1ib2xXaWR0aDogbnVtYmVyO1xuXG4gICAgLyoqIFRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudCB0byB3aGljaCB0aGlzIGRpcmVjdGl2ZSBpcyBhdHRhY2hlZC4gKi9cbiAgICBwcml2YXRlIGlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4sXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgQEluamVjdChNQ19UQUdTX0RFRkFVTFRfT1BUSU9OUykgcHJpdmF0ZSBkZWZhdWx0T3B0aW9uczogTWNUYWdzRGVmYXVsdE9wdGlvbnMsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sXG4gICAgKSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW5uZWNlc3NhcnktdHlwZS1hc3NlcnRpb25cbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgICAgIHRoaXMuc2V0RGVmYXVsdElucHV0V2lkdGgoKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgdGhpcy5fdGFnTGlzdC5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuaW5wdXRFbGVtZW50LnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl90YWdMaXN0LmtleWRvd24oZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTZXBhcmF0b3JLZXkoZXZlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRUYWdFbmQoKTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBDaGVja3MgdG8gc2VlIGlmIHRoZSBibHVyIHNob3VsZCBlbWl0IHRoZSAodGFnRW5kKSBldmVudC4gKi9cbiAgICBibHVyKCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgLy8gQmx1ciB0aGUgdGFnIGxpc3QgaWYgaXQgaXMgbm90IGZvY3VzZWRcbiAgICAgICAgaWYgKCF0aGlzLl90YWdMaXN0LmZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlclZhbGlkYXRpb24oKTtcblxuICAgICAgICAgICAgdGhpcy5fdGFnTGlzdC5ibHVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVubmVjZXNzYXJ5LXR5cGUtYXNzZXJ0aW9uXG4gICAgICAgIGlmICh0aGlzLmFkZE9uQmx1cikge1xuICAgICAgICAgICAgdGhpcy5lbWl0VGFnRW5kKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl90YWdMaXN0LnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgdHJpZ2dlclZhbGlkYXRpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNDb250cm9sKCkpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgKHRoaXMubmdDb250cm9sLnN0YXR1c0NoYW5nZXMgYXMgRXZlbnRFbWl0dGVyPHN0cmluZyB8IG51bGw+KS5lbWl0KHRoaXMubmdDb250cm9sLnN0YXR1cyk7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB0byBzZWUgaWYgdGhlICh0YWdFbmQpIGV2ZW50IG5lZWRzIHRvIGJlIGVtaXR0ZWQuICovXG4gICAgZW1pdFRhZ0VuZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0NvbnRyb2woKSB8fCAodGhpcy5oYXNDb250cm9sKCkgJiYgIXRoaXMubmdDb250cm9sLmludmFsaWQpKSB7XG4gICAgICAgICAgICB0aGlzLnRhZ0VuZC5lbWl0KHsgaW5wdXQ6IHRoaXMuaW5wdXRFbGVtZW50LCB2YWx1ZTogdGhpcy5pbnB1dEVsZW1lbnQudmFsdWUgfSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0V2lkdGgoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5wdXQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRXaWR0aCgpO1xuICAgICAgICAvLyBMZXQgdGFnIGxpc3Qga25vdyB3aGVuZXZlciB0aGUgdmFsdWUgY2hhbmdlcy5cbiAgICAgICAgdGhpcy5fdGFnTGlzdC5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIG9uUGFzdGUoJGV2ZW50OiBDbGlwYm9hcmRFdmVudCkge1xuICAgICAgICBpZiAoISRldmVudC5jbGlwYm9hcmREYXRhKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNvbnN0IGRhdGEgPSAkZXZlbnQuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0Jyk7XG5cbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgY29uc3QgaXRlbXM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5zZXBhcmF0b3JLZXlDb2Rlcykge1xuICAgICAgICAgICAgY29uc3Qgc2VwYXJhdG9yID0gdGhpcy5zZXBhcmF0b3JLZXlUb1N5bWJvbChrZXkpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zZWFyY2goc2VwYXJhdG9yKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaCguLi5kYXRhLnNwbGl0KHNlcGFyYXRvcikpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKGRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4gdGhpcy50YWdFbmQuZW1pdCh7IGlucHV0OiB0aGlzLmlucHV0RWxlbWVudCwgdmFsdWU6IGl0ZW0gfSkpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRXaWR0aCgpO1xuXG4gICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlSW5wdXRXaWR0aCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5pbnB1dEVsZW1lbnQudmFsdWUubGVuZ3RoO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5pbnB1dEVsZW1lbnQsICdtYXgtd2lkdGgnLCAwKTtcbiAgICAgICAgdGhpcy5vbmVTeW1ib2xXaWR0aCA9IHRoaXMuaW5wdXRFbGVtZW50LnNjcm9sbFdpZHRoIC8gbGVuZ3RoO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaW5wdXRFbGVtZW50LCAnbWF4LXdpZHRoJywgJycpO1xuXG4gICAgICAgIGlmIChsZW5ndGggPiB0aGlzLmNvdW50T2ZTeW1ib2xzRm9yVXBkYXRlV2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5pbnB1dEVsZW1lbnQsICd3aWR0aCcsIGAke2xlbmd0aCAqIHRoaXMub25lU3ltYm9sV2lkdGh9cHhgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGVmYXVsdElucHV0V2lkdGgoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRm9jdXMoKSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX3RhZ0xpc3Quc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKiogRm9jdXNlcyB0aGUgaW5wdXQuICovXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXRFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXBhcmF0b3JLZXlUb1N5bWJvbChrKTogUmVnRXhwIHwgc3RyaW5nIHtcbiAgICAgICAgY29uc3Qgc2VwID0ge1xuICAgICAgICAgICAgW0VOVEVSXTogL1xccj9cXG4vLFxuICAgICAgICAgICAgW1RBQl06IC9cXHQvLFxuICAgICAgICAgICAgW1NQQUNFXTogLyAvLFxuICAgICAgICAgICAgW0NPTU1BXTogLywvXG4gICAgICAgIH1ba107XG5cbiAgICAgICAgaWYgKHNlcCkgeyByZXR1cm4gc2VwOyB9XG5cbiAgICAgICAgcmV0dXJuIGs7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYXNDb250cm9sKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLm5nQ29udHJvbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldERlZmF1bHRJbnB1dFdpZHRoKCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaW5wdXRFbGVtZW50LCAnd2lkdGgnLCAnMzBweCcpO1xuICAgIH1cblxuICAgIC8qKiBDaGVja3Mgd2hldGhlciBhIGtleWNvZGUgaXMgb25lIG9mIHRoZSBjb25maWd1cmVkIHNlcGFyYXRvcnMuICovXG4gICAgcHJpdmF0ZSBpc1NlcGFyYXRvcktleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoaGFzTW9kaWZpZXJLZXkoZXZlbnQpKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VwYXJhdG9yS2V5Q29kZXMuaW5kZXhPZihldmVudC5rZXlDb2RlKSA+IC0xO1xuICAgIH1cbn1cbiJdfQ==