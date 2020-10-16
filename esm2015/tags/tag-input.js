/**
 * @fileoverview added by tsickle
 * Generated from: tag-input.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvdGFncy8iLCJzb3VyY2VzIjpbInRhZy1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUVMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULElBQUksRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVwRixPQUFPLEVBQUUsdUJBQXVCLEVBQXdCLE1BQU0sdUJBQXVCLENBQUM7QUFDdEYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7OztBQU1qRCxxQ0FNQzs7Ozs7O0lBSkcsZ0NBQXdCOzs7OztJQUd4QixnQ0FBYzs7OztJQUlkLFlBQVksR0FBRyxDQUFDOzs7OztBQXVCcEIsTUFBTSxPQUFPLFVBQVU7Ozs7Ozs7SUF3RW5CLFlBQ1ksVUFBd0MsRUFDeEMsUUFBbUIsRUFDYyxjQUFvQyxFQUNsRCxTQUFvQjtRQUh2QyxlQUFVLEdBQVYsVUFBVSxDQUE4QjtRQUN4QyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ2MsbUJBQWMsR0FBZCxjQUFjLENBQXNCO1FBQ2xELGNBQVMsR0FBVCxTQUFTLENBQVc7Ozs7UUExRW5ELFlBQU8sR0FBWSxLQUFLLENBQUM7Ozs7OztRQVF6QixzQkFBaUIsR0FBYSxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDOzs7O1FBSXBFLFdBQU0sR0FBa0MsSUFB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UTtvQkFDbEIsU0FBUyxFQUFFLFdBQVc7b0JBQ3RCLFNBQVMsRUFBRSxXQUFXO29CQUN0QixTQUFTLEVBQUUsaUJBQWlCO2lCQUMvQjthQUNKOzs7O1lBbkRHLFVBQVU7WUFPVixTQUFTOzRDQXdISixNQUFNLFNBQUMsdUJBQXVCO1lBckg5QixTQUFTLHVCQXNIVCxRQUFRLFlBQUksSUFBSTs7O2dDQW5FcEIsS0FBSyxTQUFDLDZCQUE2QjtxQkFJbkMsTUFBTSxTQUFDLG9CQUFvQjswQkFJM0IsS0FBSztpQkFHTCxLQUFLO3NCQUdMLEtBQUssU0FBQyxlQUFlO3dCQWNyQixLQUFLLFNBQUMscUJBQXFCO3VCQVkzQixLQUFLOzs7Ozs7O0lBL0NOLDZCQUF5Qjs7Ozs7OztJQU96Qix1Q0FDb0U7Ozs7O0lBR3BFLDRCQUM0RTs7Ozs7SUFHNUUsaUNBQWtDOzs7OztJQUdsQyx3QkFBNEQ7Ozs7O0lBWTVELDhCQUE0Qjs7Ozs7SUFjNUIsZ0NBQW1DOzs7OztJQVluQywrQkFBbUM7O0lBT25DLGtEQUF5Qzs7Ozs7SUFFekMsb0NBQStCOzs7Ozs7SUFHL0Isa0NBQXVDOzs7OztJQUduQyxnQ0FBZ0Q7Ozs7O0lBQ2hELDhCQUEyQjs7Ozs7SUFDM0Isb0NBQTZFOztJQUM3RSwrQkFBK0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgUmVuZGVyZXIyLFxuICAgIFNlbGZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBoYXNNb2RpZmllcktleSwgRU5URVIsIFRBQiwgU1BBQ0UsIENPTU1BIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcblxuaW1wb3J0IHsgTUNfVEFHU19ERUZBVUxUX09QVElPTlMsIE1jVGFnc0RlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi90YWctZGVmYXVsdC1vcHRpb25zJztcbmltcG9ydCB7IE1jVGFnTGlzdCB9IGZyb20gJy4vdGFnLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IE1jVGFnVGV4dENvbnRyb2wgfSBmcm9tICcuL3RhZy10ZXh0LWNvbnRyb2wnO1xuXG5cbi8qKiBSZXByZXNlbnRzIGFuIGlucHV0IGV2ZW50IG9uIGEgYG1jVGFnSW5wdXRgLiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBNY1RhZ0lucHV0RXZlbnQge1xuICAgIC8qKiBUaGUgbmF0aXZlIGA8aW5wdXQ+YCBlbGVtZW50IHRoYXQgdGhlIGV2ZW50IGlzIGJlaW5nIGZpcmVkIGZvci4gKi9cbiAgICBpbnB1dDogSFRNTElucHV0RWxlbWVudDtcblxuICAgIC8qKiBUaGUgdmFsdWUgb2YgdGhlIGlucHV0LiAqL1xuICAgIHZhbHVlOiBzdHJpbmc7XG59XG5cbi8vIEluY3JlYXNpbmcgaW50ZWdlciBmb3IgZ2VuZXJhdGluZyB1bmlxdWUgaWRzLlxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgYWRkcyB0YWctc3BlY2lmaWMgYmVoYXZpb3JzIHRvIGFuIGlucHV0IGVsZW1lbnQgaW5zaWRlIGA8bWMtZm9ybS1maWVsZD5gLlxuICogTWF5IGJlIHBsYWNlZCBpbnNpZGUgb3Igb3V0c2lkZSBvZiBhbiBgPG1jLXRhZy1saXN0PmAuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnaW5wdXRbbWNUYWdJbnB1dEZvcl0nLFxuICAgIGV4cG9ydEFzOiAnbWNUYWdJbnB1dCwgbWNUYWdJbnB1dEZvcicsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRhZy1pbnB1dCcsXG5cbiAgICAgICAgJ1tpZF0nOiAnaWQnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICAgICAnW2F0dHIucGxhY2Vob2xkZXJdJzogJ3BsYWNlaG9sZGVyIHx8IG51bGwnLFxuXG4gICAgICAgICcoa2V5ZG93biknOiAnb25LZXlkb3duKCRldmVudCknLFxuICAgICAgICAnKGJsdXIpJzogJ2JsdXIoKScsXG4gICAgICAgICcoZm9jdXMpJzogJ29uRm9jdXMoKScsXG4gICAgICAgICcoaW5wdXQpJzogJ29uSW5wdXQoKScsXG4gICAgICAgICcocGFzdGUpJzogJ29uUGFzdGUoJGV2ZW50KSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVGFnSW5wdXQgaW1wbGVtZW50cyBNY1RhZ1RleHRDb250cm9sLCBPbkNoYW5nZXMge1xuICAgIC8qKiBXaGV0aGVyIHRoZSBjb250cm9sIGlzIGZvY3VzZWQuICovXG4gICAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGxpc3Qgb2Yga2V5IGNvZGVzIHRoYXQgd2lsbCB0cmlnZ2VyIGEgdGFnRW5kIGV2ZW50LlxuICAgICAqXG4gICAgICogRGVmYXVsdHMgdG8gYFtFTlRFUl1gLlxuICAgICAqL1xuICAgIEBJbnB1dCgnbWNUYWdJbnB1dFNlcGFyYXRvcktleUNvZGVzJylcbiAgICBzZXBhcmF0b3JLZXlDb2RlczogbnVtYmVyW10gPSB0aGlzLmRlZmF1bHRPcHRpb25zLnNlcGFyYXRvcktleUNvZGVzO1xuXG4gICAgLyoqIEVtaXR0ZWQgd2hlbiBhIHRhZyBpcyB0byBiZSBhZGRlZC4gKi9cbiAgICBAT3V0cHV0KCdtY1RhZ0lucHV0VG9rZW5FbmQnKVxuICAgIHRhZ0VuZDogRXZlbnRFbWl0dGVyPE1jVGFnSW5wdXRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1jVGFnSW5wdXRFdmVudD4oKTtcblxuICAgIC8qKiBUaGUgaW5wdXQncyBwbGFjZWhvbGRlciB0ZXh0LiAqL1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnJztcblxuICAgIC8qKiBVbmlxdWUgaWQgZm9yIHRoZSBpbnB1dC4gKi9cbiAgICBASW5wdXQoKSBpZDogc3RyaW5nID0gYG1jLXRhZy1saXN0LWlucHV0LSR7bmV4dFVuaXF1ZUlkKyt9YDtcblxuICAgIC8qKiBSZWdpc3RlciBpbnB1dCBmb3IgdGFnIGxpc3QgKi9cbiAgICBASW5wdXQoJ21jVGFnSW5wdXRGb3InKVxuICAgIHNldCB0YWdMaXN0KHZhbHVlOiBNY1RhZ0xpc3QpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl90YWdMaXN0ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl90YWdMaXN0LnJlZ2lzdGVySW5wdXQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5hbWluZy1jb252ZW50aW9uXG4gICAgcHJpdmF0ZSBfdGFnTGlzdDogTWNUYWdMaXN0O1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBvciBub3QgdGhlIHRhZ0VuZCBldmVudCB3aWxsIGJlIGVtaXR0ZWQgd2hlbiB0aGUgaW5wdXQgaXMgYmx1cnJlZC5cbiAgICAgKi9cbiAgICBASW5wdXQoJ21jVGFnSW5wdXRBZGRPbkJsdXInKVxuICAgIGdldCBhZGRPbkJsdXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRPbkJsdXI7XG4gICAgfVxuXG4gICAgc2V0IGFkZE9uQmx1cih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9hZGRPbkJsdXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2FkZE9uQmx1cjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogV2hldGhlciB0aGUgaW5wdXQgaXMgZGlzYWJsZWQuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCB8fCAodGhpcy5fdGFnTGlzdCAmJiB0aGlzLl90YWdMaXN0LmRpc2FibGVkKTtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogV2hldGhlciB0aGUgaW5wdXQgaXMgZW1wdHkuICovXG4gICAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuaW5wdXRFbGVtZW50LnZhbHVlO1xuICAgIH1cblxuICAgIGNvdW50T2ZTeW1ib2xzRm9yVXBkYXRlV2lkdGg6IG51bWJlciA9IDM7XG5cbiAgICBwcml2YXRlIG9uZVN5bWJvbFdpZHRoOiBudW1iZXI7XG5cbiAgICAvKiogVGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50IHRvIHdoaWNoIHRoaXMgZGlyZWN0aXZlIGlzIGF0dGFjaGVkLiAqL1xuICAgIHByaXZhdGUgaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBASW5qZWN0KE1DX1RBR1NfREVGQVVMVF9PUFRJT05TKSBwcml2YXRlIGRlZmF1bHRPcHRpb25zOiBNY1RhZ3NEZWZhdWx0T3B0aW9ucyxcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2xcbiAgICApIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bm5lY2Vzc2FyeS10eXBlLWFzc2VydGlvblxuICAgICAgICB0aGlzLmlucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICAgICAgdGhpcy5zZXREZWZhdWx0SW5wdXRXaWR0aCgpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICB0aGlzLl90YWdMaXN0LnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pbnB1dEVsZW1lbnQudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RhZ0xpc3Qua2V5ZG93bihldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc1NlcGFyYXRvcktleShldmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdFRhZ0VuZCgpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB0byBzZWUgaWYgdGhlIGJsdXIgc2hvdWxkIGVtaXQgdGhlICh0YWdFbmQpIGV2ZW50LiAqL1xuICAgIGJsdXIoKSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICAvLyBCbHVyIHRoZSB0YWcgbGlzdCBpZiBpdCBpcyBub3QgZm9jdXNlZFxuICAgICAgICBpZiAoIXRoaXMuX3RhZ0xpc3QuZm9jdXNlZCkge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyVmFsaWRhdGlvbigpO1xuXG4gICAgICAgICAgICB0aGlzLl90YWdMaXN0LmJsdXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW5uZWNlc3NhcnktdHlwZS1hc3NlcnRpb25cbiAgICAgICAgaWYgKHRoaXMuYWRkT25CbHVyKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRUYWdFbmQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3RhZ0xpc3Quc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICB0cmlnZ2VyVmFsaWRhdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0NvbnRyb2woKSkgeyByZXR1cm47IH1cblxuICAgICAgICAodGhpcy5uZ0NvbnRyb2wuc3RhdHVzQ2hhbmdlcyBhcyBFdmVudEVtaXR0ZXI8c3RyaW5nIHwgbnVsbD4pLmVtaXQodGhpcy5uZ0NvbnRyb2wuc3RhdHVzKTtcbiAgICB9XG5cbiAgICAvKiogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgKHRhZ0VuZCkgZXZlbnQgbmVlZHMgdG8gYmUgZW1pdHRlZC4gKi9cbiAgICBlbWl0VGFnRW5kKCkge1xuICAgICAgICBpZiAoIXRoaXMuaGFzQ29udHJvbCgpIHx8ICh0aGlzLmhhc0NvbnRyb2woKSAmJiAhdGhpcy5uZ0NvbnRyb2wuaW52YWxpZCkpIHtcbiAgICAgICAgICAgIHRoaXMudGFnRW5kLmVtaXQoeyBpbnB1dDogdGhpcy5pbnB1dEVsZW1lbnQsIHZhbHVlOiB0aGlzLmlucHV0RWxlbWVudC52YWx1ZSB9KTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRXaWR0aCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JbnB1dCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dFdpZHRoKCk7XG4gICAgICAgIC8vIExldCB0YWcgbGlzdCBrbm93IHdoZW5ldmVyIHRoZSB2YWx1ZSBjaGFuZ2VzLlxuICAgICAgICB0aGlzLl90YWdMaXN0LnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgb25QYXN0ZSgkZXZlbnQ6IENsaXBib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICghJGV2ZW50LmNsaXBib2FyZERhdGEpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgY29uc3QgZGF0YSA9ICRldmVudC5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQnKTtcblxuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBpdGVtczogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiB0aGlzLnNlcGFyYXRvcktleUNvZGVzKSB7XG4gICAgICAgICAgICBjb25zdCBzZXBhcmF0b3IgPSB0aGlzLnNlcGFyYXRvcktleVRvU3ltYm9sKGtleSk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnNlYXJjaChzZXBhcmF0b3IpID4gLTEpIHtcbiAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKC4uLmRhdGEuc3BsaXQoc2VwYXJhdG9yKSk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB0aGlzLnRhZ0VuZC5lbWl0KHsgaW5wdXQ6IHRoaXMuaW5wdXRFbGVtZW50LCB2YWx1ZTogaXRlbSB9KSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dFdpZHRoKCk7XG5cbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICB1cGRhdGVJbnB1dFdpZHRoKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLmlucHV0RWxlbWVudC52YWx1ZS5sZW5ndGg7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmlucHV0RWxlbWVudCwgJ21heC13aWR0aCcsIDApO1xuICAgICAgICB0aGlzLm9uZVN5bWJvbFdpZHRoID0gdGhpcy5pbnB1dEVsZW1lbnQuc2Nyb2xsV2lkdGggLyBsZW5ndGg7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5pbnB1dEVsZW1lbnQsICdtYXgtd2lkdGgnLCAnJyk7XG5cbiAgICAgICAgaWYgKGxlbmd0aCA+IHRoaXMuY291bnRPZlN5bWJvbHNGb3JVcGRhdGVXaWR0aCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmlucHV0RWxlbWVudCwgJ3dpZHRoJywgYCR7bGVuZ3RoICogdGhpcy5vbmVTeW1ib2xXaWR0aH1weGApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXREZWZhdWx0SW5wdXRXaWR0aCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Gb2N1cygpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fdGFnTGlzdC5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIC8qKiBGb2N1c2VzIHRoZSBpbnB1dC4gKi9cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNlcGFyYXRvcktleVRvU3ltYm9sKGspOiBSZWdFeHAgfCBzdHJpbmcge1xuICAgICAgICBjb25zdCBzZXAgPSB7XG4gICAgICAgICAgICBbRU5URVJdOiAvXFxyP1xcbi8sXG4gICAgICAgICAgICBbVEFCXTogL1xcdC8sXG4gICAgICAgICAgICBbU1BBQ0VdOiAvIC8sXG4gICAgICAgICAgICBbQ09NTUFdOiAvLC9cbiAgICAgICAgfVtrXTtcblxuICAgICAgICBpZiAoc2VwKSB7IHJldHVybiBzZXA7IH1cblxuICAgICAgICByZXR1cm4gaztcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhc0NvbnRyb2woKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMubmdDb250cm9sO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0RGVmYXVsdElucHV0V2lkdGgoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5pbnB1dEVsZW1lbnQsICd3aWR0aCcsICczMHB4Jyk7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIGEga2V5Y29kZSBpcyBvbmUgb2YgdGhlIGNvbmZpZ3VyZWQgc2VwYXJhdG9ycy4gKi9cbiAgICBwcml2YXRlIGlzU2VwYXJhdG9yS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmIChoYXNNb2RpZmllcktleShldmVudCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICByZXR1cm4gdGhpcy5zZXBhcmF0b3JLZXlDb2Rlcy5pbmRleE9mKGV2ZW50LmtleUNvZGUpID4gLTE7XG4gICAgfVxufVxuIl19