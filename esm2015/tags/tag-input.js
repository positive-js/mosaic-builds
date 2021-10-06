import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, EventEmitter, Inject, Input, Optional, Output, Renderer2, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { hasModifierKey, ENTER, TAB, SPACE, COMMA } from '@ptsecurity/cdk/keycodes';
import { MC_TAGS_DEFAULT_OPTIONS } from './tag-default-options';
import { McTagList } from './tag-list.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
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
/** @nocollapse */ McTagInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTagInput, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: MC_TAGS_DEFAULT_OPTIONS }, { token: i1.NgControl, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTagInput.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTagInput, selector: "input[mcTagInputFor]", inputs: { separatorKeyCodes: ["mcTagInputSeparatorKeyCodes", "separatorKeyCodes"], placeholder: "placeholder", id: "id", tagList: ["mcTagInputFor", "tagList"], addOnBlur: ["mcTagInputAddOnBlur", "addOnBlur"], disabled: "disabled" }, outputs: { tagEnd: "mcTagInputTokenEnd" }, host: { listeners: { "keydown": "onKeydown($event)", "blur": "blur()", "focus": "onFocus()", "input": "onInput()", "paste": "onPaste($event)" }, properties: { "id": "id", "attr.disabled": "disabled || null", "attr.placeholder": "placeholder || null" }, classAttribute: "mc-tag-input" }, exportAs: ["mcTagInput", "mcTagInputFor"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTagInput, decorators: [{
            type: Directive,
            args: [{
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
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_TAGS_DEFAULT_OPTIONS]
                }] }, { type: i1.NgControl, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }]; }, propDecorators: { separatorKeyCodes: [{
                type: Input,
                args: ['mcTagInputSeparatorKeyCodes']
            }], tagEnd: [{
                type: Output,
                args: ['mcTagInputTokenEnd']
            }], placeholder: [{
                type: Input
            }], id: [{
                type: Input
            }], tagList: [{
                type: Input,
                args: ['mcTagInputFor']
            }], addOnBlur: [{
                type: Input,
                args: ['mcTagInputAddOnBlur']
            }], disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RhZ3MvdGFnLWlucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUVMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULElBQUksRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVwRixPQUFPLEVBQUUsdUJBQXVCLEVBQXdCLE1BQU0sdUJBQXVCLENBQUM7QUFDdEYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7QUFjakQsZ0RBQWdEO0FBQ2hELElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUVyQjs7O0dBR0c7QUFrQkgsTUFBTSxPQUFPLFVBQVU7SUF3RW5CLFlBQ1ksVUFBd0MsRUFDeEMsUUFBbUIsRUFDYyxjQUFvQyxFQUNsRCxTQUFvQjtRQUh2QyxlQUFVLEdBQVYsVUFBVSxDQUE4QjtRQUN4QyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ2MsbUJBQWMsR0FBZCxjQUFjLENBQXNCO1FBQ2xELGNBQVMsR0FBVCxTQUFTLENBQVc7UUEzRW5ELHNDQUFzQztRQUN0QyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBRXpCOzs7O1dBSUc7UUFFSCxzQkFBaUIsR0FBYSxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDO1FBRXBFLHlDQUF5QztRQUV6QyxXQUFNLEdBQWtDLElBQUksWUFBWSxFQUFt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QUNaLGlCQUFpQixFQUFFLGtCQUFrQjt3QkFDckMsb0JBQW9CLEVBQUUscUJBQXFCO3dCQUUzQyxXQUFXLEVBQUUsbUJBQW1CO3dCQUNoQyxRQUFRLEVBQUUsUUFBUTt3QkFDbEIsU0FBUyxFQUFFLFdBQVc7d0JBQ3RCLFNBQVMsRUFBRSxXQUFXO3dCQUN0QixTQUFTLEVBQUUsaUJBQWlCO3FCQUMvQjtpQkFDSjs7MEJBNEVRLE1BQU07MkJBQUMsdUJBQXVCOzswQkFDOUIsUUFBUTs7MEJBQUksSUFBSTs0Q0FsRXJCLGlCQUFpQjtzQkFEaEIsS0FBSzt1QkFBQyw2QkFBNkI7Z0JBS3BDLE1BQU07c0JBREwsTUFBTTt1QkFBQyxvQkFBb0I7Z0JBSW5CLFdBQVc7c0JBQW5CLEtBQUs7Z0JBR0csRUFBRTtzQkFBVixLQUFLO2dCQUlGLE9BQU87c0JBRFYsS0FBSzt1QkFBQyxlQUFlO2dCQWVsQixTQUFTO3NCQURaLEtBQUs7dUJBQUMscUJBQXFCO2dCQWF4QixRQUFRO3NCQURYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgUmVuZGVyZXIyLFxuICAgIFNlbGZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBoYXNNb2RpZmllcktleSwgRU5URVIsIFRBQiwgU1BBQ0UsIENPTU1BIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcblxuaW1wb3J0IHsgTUNfVEFHU19ERUZBVUxUX09QVElPTlMsIE1jVGFnc0RlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi90YWctZGVmYXVsdC1vcHRpb25zJztcbmltcG9ydCB7IE1jVGFnTGlzdCB9IGZyb20gJy4vdGFnLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IE1jVGFnVGV4dENvbnRyb2wgfSBmcm9tICcuL3RhZy10ZXh0LWNvbnRyb2wnO1xuXG5cbi8qKiBSZXByZXNlbnRzIGFuIGlucHV0IGV2ZW50IG9uIGEgYG1jVGFnSW5wdXRgLiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBNY1RhZ0lucHV0RXZlbnQge1xuICAgIC8qKiBUaGUgbmF0aXZlIGA8aW5wdXQ+YCBlbGVtZW50IHRoYXQgdGhlIGV2ZW50IGlzIGJlaW5nIGZpcmVkIGZvci4gKi9cbiAgICBpbnB1dDogSFRNTElucHV0RWxlbWVudDtcblxuICAgIC8qKiBUaGUgdmFsdWUgb2YgdGhlIGlucHV0LiAqL1xuICAgIHZhbHVlOiBzdHJpbmc7XG59XG5cbi8vIEluY3JlYXNpbmcgaW50ZWdlciBmb3IgZ2VuZXJhdGluZyB1bmlxdWUgaWRzLlxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgYWRkcyB0YWctc3BlY2lmaWMgYmVoYXZpb3JzIHRvIGFuIGlucHV0IGVsZW1lbnQgaW5zaWRlIGA8bWMtZm9ybS1maWVsZD5gLlxuICogTWF5IGJlIHBsYWNlZCBpbnNpZGUgb3Igb3V0c2lkZSBvZiBhbiBgPG1jLXRhZy1saXN0PmAuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnaW5wdXRbbWNUYWdJbnB1dEZvcl0nLFxuICAgIGV4cG9ydEFzOiAnbWNUYWdJbnB1dCwgbWNUYWdJbnB1dEZvcicsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRhZy1pbnB1dCcsXG5cbiAgICAgICAgJ1tpZF0nOiAnaWQnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICAgICAnW2F0dHIucGxhY2Vob2xkZXJdJzogJ3BsYWNlaG9sZGVyIHx8IG51bGwnLFxuXG4gICAgICAgICcoa2V5ZG93biknOiAnb25LZXlkb3duKCRldmVudCknLFxuICAgICAgICAnKGJsdXIpJzogJ2JsdXIoKScsXG4gICAgICAgICcoZm9jdXMpJzogJ29uRm9jdXMoKScsXG4gICAgICAgICcoaW5wdXQpJzogJ29uSW5wdXQoKScsXG4gICAgICAgICcocGFzdGUpJzogJ29uUGFzdGUoJGV2ZW50KSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVGFnSW5wdXQgaW1wbGVtZW50cyBNY1RhZ1RleHRDb250cm9sLCBPbkNoYW5nZXMge1xuICAgIC8qKiBXaGV0aGVyIHRoZSBjb250cm9sIGlzIGZvY3VzZWQuICovXG4gICAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGxpc3Qgb2Yga2V5IGNvZGVzIHRoYXQgd2lsbCB0cmlnZ2VyIGEgdGFnRW5kIGV2ZW50LlxuICAgICAqXG4gICAgICogRGVmYXVsdHMgdG8gYFtFTlRFUl1gLlxuICAgICAqL1xuICAgIEBJbnB1dCgnbWNUYWdJbnB1dFNlcGFyYXRvcktleUNvZGVzJylcbiAgICBzZXBhcmF0b3JLZXlDb2RlczogbnVtYmVyW10gPSB0aGlzLmRlZmF1bHRPcHRpb25zLnNlcGFyYXRvcktleUNvZGVzO1xuXG4gICAgLyoqIEVtaXR0ZWQgd2hlbiBhIHRhZyBpcyB0byBiZSBhZGRlZC4gKi9cbiAgICBAT3V0cHV0KCdtY1RhZ0lucHV0VG9rZW5FbmQnKVxuICAgIHRhZ0VuZDogRXZlbnRFbWl0dGVyPE1jVGFnSW5wdXRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1jVGFnSW5wdXRFdmVudD4oKTtcblxuICAgIC8qKiBUaGUgaW5wdXQncyBwbGFjZWhvbGRlciB0ZXh0LiAqL1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnJztcblxuICAgIC8qKiBVbmlxdWUgaWQgZm9yIHRoZSBpbnB1dC4gKi9cbiAgICBASW5wdXQoKSBpZDogc3RyaW5nID0gYG1jLXRhZy1saXN0LWlucHV0LSR7bmV4dFVuaXF1ZUlkKyt9YDtcblxuICAgIC8qKiBSZWdpc3RlciBpbnB1dCBmb3IgdGFnIGxpc3QgKi9cbiAgICBASW5wdXQoJ21jVGFnSW5wdXRGb3InKVxuICAgIHNldCB0YWdMaXN0KHZhbHVlOiBNY1RhZ0xpc3QpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl90YWdMaXN0ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl90YWdMaXN0LnJlZ2lzdGVySW5wdXQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5hbWluZy1jb252ZW50aW9uXG4gICAgcHJpdmF0ZSBfdGFnTGlzdDogTWNUYWdMaXN0O1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBvciBub3QgdGhlIHRhZ0VuZCBldmVudCB3aWxsIGJlIGVtaXR0ZWQgd2hlbiB0aGUgaW5wdXQgaXMgYmx1cnJlZC5cbiAgICAgKi9cbiAgICBASW5wdXQoJ21jVGFnSW5wdXRBZGRPbkJsdXInKVxuICAgIGdldCBhZGRPbkJsdXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRPbkJsdXI7XG4gICAgfVxuXG4gICAgc2V0IGFkZE9uQmx1cih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9hZGRPbkJsdXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2FkZE9uQmx1cjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogV2hldGhlciB0aGUgaW5wdXQgaXMgZGlzYWJsZWQuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCB8fCAodGhpcy5fdGFnTGlzdCAmJiB0aGlzLl90YWdMaXN0LmRpc2FibGVkKTtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogV2hldGhlciB0aGUgaW5wdXQgaXMgZW1wdHkuICovXG4gICAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuaW5wdXRFbGVtZW50LnZhbHVlO1xuICAgIH1cblxuICAgIGNvdW50T2ZTeW1ib2xzRm9yVXBkYXRlV2lkdGg6IG51bWJlciA9IDM7XG5cbiAgICBwcml2YXRlIG9uZVN5bWJvbFdpZHRoOiBudW1iZXI7XG5cbiAgICAvKiogVGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50IHRvIHdoaWNoIHRoaXMgZGlyZWN0aXZlIGlzIGF0dGFjaGVkLiAqL1xuICAgIHByaXZhdGUgaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBASW5qZWN0KE1DX1RBR1NfREVGQVVMVF9PUFRJT05TKSBwcml2YXRlIGRlZmF1bHRPcHRpb25zOiBNY1RhZ3NEZWZhdWx0T3B0aW9ucyxcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2xcbiAgICApIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bm5lY2Vzc2FyeS10eXBlLWFzc2VydGlvblxuICAgICAgICB0aGlzLmlucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICAgICAgdGhpcy5zZXREZWZhdWx0SW5wdXRXaWR0aCgpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICB0aGlzLl90YWdMaXN0LnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pbnB1dEVsZW1lbnQudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RhZ0xpc3Qua2V5ZG93bihldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc1NlcGFyYXRvcktleShldmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdFRhZ0VuZCgpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB0byBzZWUgaWYgdGhlIGJsdXIgc2hvdWxkIGVtaXQgdGhlICh0YWdFbmQpIGV2ZW50LiAqL1xuICAgIGJsdXIoKSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICAvLyBCbHVyIHRoZSB0YWcgbGlzdCBpZiBpdCBpcyBub3QgZm9jdXNlZFxuICAgICAgICBpZiAoIXRoaXMuX3RhZ0xpc3QuZm9jdXNlZCkge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyVmFsaWRhdGlvbigpO1xuXG4gICAgICAgICAgICB0aGlzLl90YWdMaXN0LmJsdXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW5uZWNlc3NhcnktdHlwZS1hc3NlcnRpb25cbiAgICAgICAgaWYgKHRoaXMuYWRkT25CbHVyKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRUYWdFbmQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3RhZ0xpc3Quc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICB0cmlnZ2VyVmFsaWRhdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0NvbnRyb2woKSkgeyByZXR1cm47IH1cblxuICAgICAgICAodGhpcy5uZ0NvbnRyb2wuc3RhdHVzQ2hhbmdlcyBhcyBFdmVudEVtaXR0ZXI8c3RyaW5nIHwgbnVsbD4pLmVtaXQodGhpcy5uZ0NvbnRyb2wuc3RhdHVzKTtcbiAgICB9XG5cbiAgICAvKiogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgKHRhZ0VuZCkgZXZlbnQgbmVlZHMgdG8gYmUgZW1pdHRlZC4gKi9cbiAgICBlbWl0VGFnRW5kKCkge1xuICAgICAgICBpZiAoIXRoaXMuaGFzQ29udHJvbCgpIHx8ICh0aGlzLmhhc0NvbnRyb2woKSAmJiAhdGhpcy5uZ0NvbnRyb2wuaW52YWxpZCkpIHtcbiAgICAgICAgICAgIHRoaXMudGFnRW5kLmVtaXQoeyBpbnB1dDogdGhpcy5pbnB1dEVsZW1lbnQsIHZhbHVlOiB0aGlzLmlucHV0RWxlbWVudC52YWx1ZSB9KTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRXaWR0aCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JbnB1dCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dFdpZHRoKCk7XG4gICAgICAgIC8vIExldCB0YWcgbGlzdCBrbm93IHdoZW5ldmVyIHRoZSB2YWx1ZSBjaGFuZ2VzLlxuICAgICAgICB0aGlzLl90YWdMaXN0LnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgb25QYXN0ZSgkZXZlbnQ6IENsaXBib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICghJGV2ZW50LmNsaXBib2FyZERhdGEpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgY29uc3QgZGF0YSA9ICRldmVudC5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQnKTtcblxuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBpdGVtczogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiB0aGlzLnNlcGFyYXRvcktleUNvZGVzKSB7XG4gICAgICAgICAgICBjb25zdCBzZXBhcmF0b3IgPSB0aGlzLnNlcGFyYXRvcktleVRvU3ltYm9sKGtleSk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnNlYXJjaChzZXBhcmF0b3IpID4gLTEpIHtcbiAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKC4uLmRhdGEuc3BsaXQoc2VwYXJhdG9yKSk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB0aGlzLnRhZ0VuZC5lbWl0KHsgaW5wdXQ6IHRoaXMuaW5wdXRFbGVtZW50LCB2YWx1ZTogaXRlbSB9KSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dFdpZHRoKCk7XG5cbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICB1cGRhdGVJbnB1dFdpZHRoKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLmlucHV0RWxlbWVudC52YWx1ZS5sZW5ndGg7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmlucHV0RWxlbWVudCwgJ21heC13aWR0aCcsIDApO1xuICAgICAgICB0aGlzLm9uZVN5bWJvbFdpZHRoID0gdGhpcy5pbnB1dEVsZW1lbnQuc2Nyb2xsV2lkdGggLyBsZW5ndGg7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5pbnB1dEVsZW1lbnQsICdtYXgtd2lkdGgnLCAnJyk7XG5cbiAgICAgICAgaWYgKGxlbmd0aCA+IHRoaXMuY291bnRPZlN5bWJvbHNGb3JVcGRhdGVXaWR0aCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmlucHV0RWxlbWVudCwgJ3dpZHRoJywgYCR7bGVuZ3RoICogdGhpcy5vbmVTeW1ib2xXaWR0aH1weGApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXREZWZhdWx0SW5wdXRXaWR0aCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Gb2N1cygpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fdGFnTGlzdC5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIC8qKiBGb2N1c2VzIHRoZSBpbnB1dC4gKi9cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNlcGFyYXRvcktleVRvU3ltYm9sKGspOiBSZWdFeHAgfCBzdHJpbmcge1xuICAgICAgICBjb25zdCBzZXAgPSB7XG4gICAgICAgICAgICBbRU5URVJdOiAvXFxyP1xcbi8sXG4gICAgICAgICAgICBbVEFCXTogL1xcdC8sXG4gICAgICAgICAgICBbU1BBQ0VdOiAvIC8sXG4gICAgICAgICAgICBbQ09NTUFdOiAvLC9cbiAgICAgICAgfVtrXTtcblxuICAgICAgICBpZiAoc2VwKSB7IHJldHVybiBzZXA7IH1cblxuICAgICAgICByZXR1cm4gaztcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhc0NvbnRyb2woKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMubmdDb250cm9sO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0RGVmYXVsdElucHV0V2lkdGgoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5pbnB1dEVsZW1lbnQsICd3aWR0aCcsICczMHB4Jyk7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIGEga2V5Y29kZSBpcyBvbmUgb2YgdGhlIGNvbmZpZ3VyZWQgc2VwYXJhdG9ycy4gKi9cbiAgICBwcml2YXRlIGlzU2VwYXJhdG9yS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmIChoYXNNb2RpZmllcktleShldmVudCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICByZXR1cm4gdGhpcy5zZXBhcmF0b3JLZXlDb2Rlcy5pbmRleE9mKGV2ZW50LmtleUNvZGUpID4gLTE7XG4gICAgfVxufVxuIl19