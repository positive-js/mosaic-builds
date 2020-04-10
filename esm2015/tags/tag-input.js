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
     * Utility method to make host definition/tests more clear.
     * @param {?=} event
     * @return {?}
     */
    keydown(event) {
        this.emitTagEnd(event);
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
        if (this.addOnBlur && !(this.hasControl() && this.ngControl.invalid)) {
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
     * @param {?=} event
     * @return {?}
     */
    emitTagEnd(event) {
        if (!this.inputElement.value && !!event) {
            this._tagList.keydown(event);
        }
        if (!event || this.isSeparatorKey(event)) {
            this.tagEnd.emit({ input: this.inputElement, value: this.inputElement.value });
            this.updateInputWidth();
            if (event) {
                event.preventDefault();
            }
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
                    class: 'mc-tag-input mc-input-element',
                    '[id]': 'id',
                    '[attr.disabled]': 'disabled || null',
                    '[attr.placeholder]': 'placeholder || null',
                    '(keydown)': 'keydown($event)',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RhZ3MvIiwic291cmNlcyI6WyJ0YWctaW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0gsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxJQUFJLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFcEYsT0FBTyxFQUFFLHVCQUF1QixFQUF3QixNQUFNLHVCQUF1QixDQUFDO0FBQ3RGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7QUFNakQscUNBTUM7Ozs7OztJQUpHLGdDQUF3Qjs7Ozs7SUFHeEIsZ0NBQWM7Ozs7SUFJZCxZQUFZLEdBQUcsQ0FBQzs7Ozs7QUFxQnBCLE1BQU0sT0FBTyxVQUFVOzs7Ozs7O0lBd0VuQixZQUNZLFVBQXdDLEVBQ3hDLFFBQW1CLEVBQ2MsY0FBb0MsRUFDbEQsU0FBb0I7UUFIdkMsZUFBVSxHQUFWLFVBQVUsQ0FBOEI7UUFDeEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNjLG1CQUFjLEdBQWQsY0FBYyxDQUFzQjtRQUNsRCxjQUFTLEdBQVQsU0FBUyxDQUFXOzs7O1FBMUVuRCxZQUFPLEdBQVksS0FBSyxDQUFDOzs7Ozs7UUFRekIsc0JBQWlCLEdBQWEsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQzs7OztRQUlwRSxXQUFNLEdBQWtDLElBQUksWUFBWSxFQUFtQixD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aUJBQWlCO29CQUM5QixRQUFRLEVBQUUsUUFBUTtvQkFDbEIsU0FBUyxFQUFFLFdBQVc7b0JBQ3RCLFNBQVMsRUFBRSxXQUFXO29CQUN0QixTQUFTLEVBQUUsaUJBQWlCO2lCQUMvQjthQUNKOzs7O1lBakRHLFVBQVU7WUFPVixTQUFTOzRDQXNISixNQUFNLFNBQUMsdUJBQXVCO1lBbkg5QixTQUFTLHVCQW9IVCxRQUFRLFlBQUksSUFBSTs7O2dDQW5FcEIsS0FBSyxTQUFDLDZCQUE2QjtxQkFJbkMsTUFBTSxTQUFDLG9CQUFvQjswQkFJM0IsS0FBSztpQkFHTCxLQUFLO3NCQUdMLEtBQUssU0FBQyxlQUFlO3dCQWNyQixLQUFLLFNBQUMscUJBQXFCO3VCQVkzQixLQUFLOzs7Ozs7O0lBL0NOLDZCQUF5Qjs7Ozs7OztJQU96Qix1Q0FDb0U7Ozs7O0lBR3BFLDRCQUM0RTs7Ozs7SUFHNUUsaUNBQWtDOzs7OztJQUdsQyx3QkFBNEQ7Ozs7O0lBWTVELDhCQUE0Qjs7Ozs7SUFjNUIsZ0NBQW1DOzs7OztJQVluQywrQkFBbUM7O0lBT25DLGtEQUF5Qzs7Ozs7SUFFekMsb0NBQStCOzs7Ozs7SUFHL0Isa0NBQXVDOzs7OztJQUduQyxnQ0FBZ0Q7Ozs7O0lBQ2hELDhCQUEyQjs7Ozs7SUFDM0Isb0NBQTZFOztJQUM3RSwrQkFBK0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgUmVuZGVyZXIyLFxuICAgIFNlbGZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBoYXNNb2RpZmllcktleSwgRU5URVIsIFRBQiwgU1BBQ0UsIENPTU1BIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcblxuaW1wb3J0IHsgTUNfVEFHU19ERUZBVUxUX09QVElPTlMsIE1jVGFnc0RlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi90YWctZGVmYXVsdC1vcHRpb25zJztcbmltcG9ydCB7IE1jVGFnTGlzdCB9IGZyb20gJy4vdGFnLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IE1jVGFnVGV4dENvbnRyb2wgfSBmcm9tICcuL3RhZy10ZXh0LWNvbnRyb2wnO1xuXG5cbi8qKiBSZXByZXNlbnRzIGFuIGlucHV0IGV2ZW50IG9uIGEgYG1jVGFnSW5wdXRgLiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBNY1RhZ0lucHV0RXZlbnQge1xuICAgIC8qKiBUaGUgbmF0aXZlIGA8aW5wdXQ+YCBlbGVtZW50IHRoYXQgdGhlIGV2ZW50IGlzIGJlaW5nIGZpcmVkIGZvci4gKi9cbiAgICBpbnB1dDogSFRNTElucHV0RWxlbWVudDtcblxuICAgIC8qKiBUaGUgdmFsdWUgb2YgdGhlIGlucHV0LiAqL1xuICAgIHZhbHVlOiBzdHJpbmc7XG59XG5cbi8vIEluY3JlYXNpbmcgaW50ZWdlciBmb3IgZ2VuZXJhdGluZyB1bmlxdWUgaWRzLlxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgYWRkcyB0YWctc3BlY2lmaWMgYmVoYXZpb3JzIHRvIGFuIGlucHV0IGVsZW1lbnQgaW5zaWRlIGA8bWMtZm9ybS1maWVsZD5gLlxuICogTWF5IGJlIHBsYWNlZCBpbnNpZGUgb3Igb3V0c2lkZSBvZiBhbiBgPG1jLXRhZy1saXN0PmAuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnaW5wdXRbbWNUYWdJbnB1dEZvcl0nLFxuICAgIGV4cG9ydEFzOiAnbWNUYWdJbnB1dCwgbWNUYWdJbnB1dEZvcicsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRhZy1pbnB1dCBtYy1pbnB1dC1lbGVtZW50JyxcbiAgICAgICAgJ1tpZF0nOiAnaWQnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICAgICAnW2F0dHIucGxhY2Vob2xkZXJdJzogJ3BsYWNlaG9sZGVyIHx8IG51bGwnLFxuICAgICAgICAnKGtleWRvd24pJzogJ2tleWRvd24oJGV2ZW50KScsXG4gICAgICAgICcoYmx1ciknOiAnYmx1cigpJyxcbiAgICAgICAgJyhmb2N1cyknOiAnb25Gb2N1cygpJyxcbiAgICAgICAgJyhpbnB1dCknOiAnb25JbnB1dCgpJyxcbiAgICAgICAgJyhwYXN0ZSknOiAnb25QYXN0ZSgkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUYWdJbnB1dCBpbXBsZW1lbnRzIE1jVGFnVGV4dENvbnRyb2wsIE9uQ2hhbmdlcyB7XG4gICAgLyoqIFdoZXRoZXIgdGhlIGNvbnRyb2wgaXMgZm9jdXNlZC4gKi9cbiAgICBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbGlzdCBvZiBrZXkgY29kZXMgdGhhdCB3aWxsIHRyaWdnZXIgYSB0YWdFbmQgZXZlbnQuXG4gICAgICpcbiAgICAgKiBEZWZhdWx0cyB0byBgW0VOVEVSXWAuXG4gICAgICovXG4gICAgQElucHV0KCdtY1RhZ0lucHV0U2VwYXJhdG9yS2V5Q29kZXMnKVxuICAgIHNlcGFyYXRvcktleUNvZGVzOiBudW1iZXJbXSA9IHRoaXMuZGVmYXVsdE9wdGlvbnMuc2VwYXJhdG9yS2V5Q29kZXM7XG5cbiAgICAvKiogRW1pdHRlZCB3aGVuIGEgdGFnIGlzIHRvIGJlIGFkZGVkLiAqL1xuICAgIEBPdXRwdXQoJ21jVGFnSW5wdXRUb2tlbkVuZCcpXG4gICAgdGFnRW5kOiBFdmVudEVtaXR0ZXI8TWNUYWdJbnB1dEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TWNUYWdJbnB1dEV2ZW50PigpO1xuXG4gICAgLyoqIFRoZSBpbnB1dCdzIHBsYWNlaG9sZGVyIHRleHQuICovXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICcnO1xuXG4gICAgLyoqIFVuaXF1ZSBpZCBmb3IgdGhlIGlucHV0LiAqL1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgbWMtdGFnLWxpc3QtaW5wdXQtJHtuZXh0VW5pcXVlSWQrK31gO1xuXG4gICAgLyoqIFJlZ2lzdGVyIGlucHV0IGZvciB0YWcgbGlzdCAqL1xuICAgIEBJbnB1dCgnbWNUYWdJbnB1dEZvcicpXG4gICAgc2V0IHRhZ0xpc3QodmFsdWU6IE1jVGFnTGlzdCkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RhZ0xpc3QgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX3RhZ0xpc3QucmVnaXN0ZXJJbnB1dCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbmFtaW5nLWNvbnZlbnRpb25cbiAgICBwcml2YXRlIF90YWdMaXN0OiBNY1RhZ0xpc3Q7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgdGFnRW5kIGV2ZW50IHdpbGwgYmUgZW1pdHRlZCB3aGVuIHRoZSBpbnB1dCBpcyBibHVycmVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgnbWNUYWdJbnB1dEFkZE9uQmx1cicpXG4gICAgZ2V0IGFkZE9uQmx1cigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZE9uQmx1cjtcbiAgICB9XG5cbiAgICBzZXQgYWRkT25CbHVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2FkZE9uQmx1ciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYWRkT25CbHVyOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBpbnB1dCBpcyBkaXNhYmxlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkIHx8ICh0aGlzLl90YWdMaXN0ICYmIHRoaXMuX3RhZ0xpc3QuZGlzYWJsZWQpO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBpbnB1dCBpcyBlbXB0eS4gKi9cbiAgICBnZXQgZW1wdHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5pbnB1dEVsZW1lbnQudmFsdWU7XG4gICAgfVxuXG4gICAgY291bnRPZlN5bWJvbHNGb3JVcGRhdGVXaWR0aDogbnVtYmVyID0gMztcblxuICAgIHByaXZhdGUgb25lU3ltYm9sV2lkdGg6IG51bWJlcjtcblxuICAgIC8qKiBUaGUgbmF0aXZlIGlucHV0IGVsZW1lbnQgdG8gd2hpY2ggdGhpcyBkaXJlY3RpdmUgaXMgYXR0YWNoZWQuICovXG4gICAgcHJpdmF0ZSBpbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIEBJbmplY3QoTUNfVEFHU19ERUZBVUxUX09QVElPTlMpIHByaXZhdGUgZGVmYXVsdE9wdGlvbnM6IE1jVGFnc0RlZmF1bHRPcHRpb25zLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHB1YmxpYyBuZ0NvbnRyb2w6IE5nQ29udHJvbFxuICAgICkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVubmVjZXNzYXJ5LXR5cGUtYXNzZXJ0aW9uXG4gICAgICAgIHRoaXMuaW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTElucHV0RWxlbWVudDtcblxuICAgICAgICB0aGlzLnNldERlZmF1bHRJbnB1dFdpZHRoKCk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoKSB7XG4gICAgICAgIHRoaXMuX3RhZ0xpc3Quc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKiogVXRpbGl0eSBtZXRob2QgdG8gbWFrZSBob3N0IGRlZmluaXRpb24vdGVzdHMgbW9yZSBjbGVhci4gKi9cbiAgICBrZXlkb3duKGV2ZW50PzogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICB0aGlzLmVtaXRUYWdFbmQoZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKiBDaGVja3MgdG8gc2VlIGlmIHRoZSBibHVyIHNob3VsZCBlbWl0IHRoZSAodGFnRW5kKSBldmVudC4gKi9cbiAgICBibHVyKCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgLy8gQmx1ciB0aGUgdGFnIGxpc3QgaWYgaXQgaXMgbm90IGZvY3VzZWRcbiAgICAgICAgaWYgKCF0aGlzLl90YWdMaXN0LmZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlclZhbGlkYXRpb24oKTtcblxuICAgICAgICAgICAgdGhpcy5fdGFnTGlzdC5ibHVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVubmVjZXNzYXJ5LXR5cGUtYXNzZXJ0aW9uXG4gICAgICAgIGlmICh0aGlzLmFkZE9uQmx1ciAmJiAhKHRoaXMuaGFzQ29udHJvbCgpICYmIHRoaXMubmdDb250cm9sLmludmFsaWQpKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRUYWdFbmQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3RhZ0xpc3Quc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICB0cmlnZ2VyVmFsaWRhdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0NvbnRyb2woKSkgeyByZXR1cm47IH1cblxuICAgICAgICAodGhpcy5uZ0NvbnRyb2wuc3RhdHVzQ2hhbmdlcyBhcyBFdmVudEVtaXR0ZXI8c3RyaW5nIHwgbnVsbD4pLmVtaXQodGhpcy5uZ0NvbnRyb2wuc3RhdHVzKTtcbiAgICB9XG5cbiAgICAvKiogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgKHRhZ0VuZCkgZXZlbnQgbmVlZHMgdG8gYmUgZW1pdHRlZC4gKi9cbiAgICBlbWl0VGFnRW5kKGV2ZW50PzogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuaW5wdXRFbGVtZW50LnZhbHVlICYmICEhZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3RhZ0xpc3Qua2V5ZG93bihldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWV2ZW50IHx8IHRoaXMuaXNTZXBhcmF0b3JLZXkoZXZlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLnRhZ0VuZC5lbWl0KHsgaW5wdXQ6IHRoaXMuaW5wdXRFbGVtZW50LCB2YWx1ZTogdGhpcy5pbnB1dEVsZW1lbnQudmFsdWUgfSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0V2lkdGgoKTtcblxuICAgICAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5wdXQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRXaWR0aCgpO1xuICAgICAgICAvLyBMZXQgdGFnIGxpc3Qga25vdyB3aGVuZXZlciB0aGUgdmFsdWUgY2hhbmdlcy5cbiAgICAgICAgdGhpcy5fdGFnTGlzdC5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIG9uUGFzdGUoJGV2ZW50OiBDbGlwYm9hcmRFdmVudCkge1xuICAgICAgICBpZiAoISRldmVudC5jbGlwYm9hcmREYXRhKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNvbnN0IGRhdGEgPSAkZXZlbnQuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0Jyk7XG5cbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgY29uc3QgaXRlbXM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5zZXBhcmF0b3JLZXlDb2Rlcykge1xuICAgICAgICAgICAgY29uc3Qgc2VwYXJhdG9yID0gdGhpcy5zZXBhcmF0b3JLZXlUb1N5bWJvbChrZXkpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zZWFyY2goc2VwYXJhdG9yKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaCguLi5kYXRhLnNwbGl0KHNlcGFyYXRvcikpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKGRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4gdGhpcy50YWdFbmQuZW1pdCh7IGlucHV0OiB0aGlzLmlucHV0RWxlbWVudCwgdmFsdWU6IGl0ZW0gfSkpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRXaWR0aCgpO1xuXG4gICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlSW5wdXRXaWR0aCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5pbnB1dEVsZW1lbnQudmFsdWUubGVuZ3RoO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5pbnB1dEVsZW1lbnQsICdtYXgtd2lkdGgnLCAwKTtcbiAgICAgICAgdGhpcy5vbmVTeW1ib2xXaWR0aCA9IHRoaXMuaW5wdXRFbGVtZW50LnNjcm9sbFdpZHRoIC8gbGVuZ3RoO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaW5wdXRFbGVtZW50LCAnbWF4LXdpZHRoJywgJycpO1xuXG4gICAgICAgIGlmIChsZW5ndGggPiB0aGlzLmNvdW50T2ZTeW1ib2xzRm9yVXBkYXRlV2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5pbnB1dEVsZW1lbnQsICd3aWR0aCcsIGAke2xlbmd0aCAqIHRoaXMub25lU3ltYm9sV2lkdGh9cHhgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGVmYXVsdElucHV0V2lkdGgoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRm9jdXMoKSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX3RhZ0xpc3Quc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKiogRm9jdXNlcyB0aGUgaW5wdXQuICovXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXRFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXBhcmF0b3JLZXlUb1N5bWJvbChrKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3Qgc2VwID0ge1xuICAgICAgICAgICAgW0VOVEVSXTogL1xccj9cXG4vLFxuICAgICAgICAgICAgW1RBQl06IC9cXHQvLFxuICAgICAgICAgICAgW1NQQUNFXTogLyAvLFxuICAgICAgICAgICAgW0NPTU1BXTogLywvXG4gICAgICAgIH1ba107XG5cbiAgICAgICAgaWYgKHNlcCkgeyByZXR1cm4gc2VwOyB9XG5cbiAgICAgICAgcmV0dXJuIGs7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYXNDb250cm9sKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLm5nQ29udHJvbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldERlZmF1bHRJbnB1dFdpZHRoKCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaW5wdXRFbGVtZW50LCAnd2lkdGgnLCAnMzBweCcpO1xuICAgIH1cblxuICAgIC8qKiBDaGVja3Mgd2hldGhlciBhIGtleWNvZGUgaXMgb25lIG9mIHRoZSBjb25maWd1cmVkIHNlcGFyYXRvcnMuICovXG4gICAgcHJpdmF0ZSBpc1NlcGFyYXRvcktleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoaGFzTW9kaWZpZXJLZXkoZXZlbnQpKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VwYXJhdG9yS2V5Q29kZXMuaW5kZXhPZihldmVudC5rZXlDb2RlKSA+IC0xO1xuICAgIH1cbn1cbiJdfQ==