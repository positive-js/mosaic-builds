/**
 * @fileoverview added by tsickle
 * Generated from: tag-input.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __spread, __values } from "tslib";
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
var nextUniqueId = 0;
/**
 * Directive that adds tag-specific behaviors to an input element inside `<mc-form-field>`.
 * May be placed inside or outside of an `<mc-tag-list>`.
 */
var McTagInput = /** @class */ (function () {
    function McTagInput(elementRef, renderer, defaultOptions, ngControl) {
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
        this.id = "mc-tag-list-input-" + nextUniqueId++;
        this._addOnBlur = true;
        this._disabled = false;
        this.countOfSymbolsForUpdateWidth = 3;
        // tslint:disable-next-line: no-unnecessary-type-assertion
        this.inputElement = (/** @type {?} */ (this.elementRef.nativeElement));
        this.setDefaultInputWidth();
    }
    Object.defineProperty(McTagInput.prototype, "tagList", {
        /** Register input for tag list */
        set: /**
         * Register input for tag list
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._tagList = value;
                this._tagList.registerInput(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTagInput.prototype, "addOnBlur", {
        /**
         * Whether or not the tagEnd event will be emitted when the input is blurred.
         */
        get: /**
         * Whether or not the tagEnd event will be emitted when the input is blurred.
         * @return {?}
         */
        function () {
            return this._addOnBlur;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._addOnBlur = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTagInput.prototype, "disabled", {
        /** Whether the input is disabled. */
        get: /**
         * Whether the input is disabled.
         * @return {?}
         */
        function () {
            return this._disabled || (this._tagList && this._tagList.disabled);
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTagInput.prototype, "empty", {
        /** Whether the input is empty. */
        get: /**
         * Whether the input is empty.
         * @return {?}
         */
        function () {
            return !this.inputElement.value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McTagInput.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this._tagList.stateChanges.next();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McTagInput.prototype.onKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.inputElement.value) {
            this._tagList.keydown(event);
        }
        if (this.isSeparatorKey(event)) {
            this.emitTagEnd();
            event.preventDefault();
        }
    };
    /** Checks to see if the blur should emit the (tagEnd) event. */
    /**
     * Checks to see if the blur should emit the (tagEnd) event.
     * @return {?}
     */
    McTagInput.prototype.blur = /**
     * Checks to see if the blur should emit the (tagEnd) event.
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    McTagInput.prototype.triggerValidation = /**
     * @return {?}
     */
    function () {
        if (!this.hasControl()) {
            return;
        }
        ((/** @type {?} */ (this.ngControl.statusChanges))).emit(this.ngControl.status);
    };
    /** Checks to see if the (tagEnd) event needs to be emitted. */
    /**
     * Checks to see if the (tagEnd) event needs to be emitted.
     * @return {?}
     */
    McTagInput.prototype.emitTagEnd = /**
     * Checks to see if the (tagEnd) event needs to be emitted.
     * @return {?}
     */
    function () {
        if (!this.hasControl() || (this.hasControl() && !this.ngControl.invalid)) {
            this.tagEnd.emit({ input: this.inputElement, value: this.inputElement.value });
            this.updateInputWidth();
        }
    };
    /**
     * @return {?}
     */
    McTagInput.prototype.onInput = /**
     * @return {?}
     */
    function () {
        this.updateInputWidth();
        // Let tag list know whenever the value changes.
        this._tagList.stateChanges.next();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    McTagInput.prototype.onPaste = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var e_1, _a;
        var _this = this;
        if (!$event.clipboardData) {
            return;
        }
        /** @type {?} */
        var data = $event.clipboardData.getData('text');
        if (data && data.length === 0) {
            return;
        }
        /** @type {?} */
        var items = [];
        try {
            for (var _b = __values(this.separatorKeyCodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                /** @type {?} */
                var separator = this.separatorKeyToSymbol(key);
                if (data.search(separator) > -1) {
                    items.push.apply(items, __spread(data.split(separator)));
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (items.length === 0) {
            items.push(data);
        }
        items.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this.tagEnd.emit({ input: _this.inputElement, value: item }); }));
        this.updateInputWidth();
        $event.preventDefault();
        $event.stopPropagation();
    };
    /**
     * @return {?}
     */
    McTagInput.prototype.updateInputWidth = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var length = this.inputElement.value.length;
        this.renderer.setStyle(this.inputElement, 'max-width', 0);
        this.oneSymbolWidth = this.inputElement.scrollWidth / length;
        this.renderer.setStyle(this.inputElement, 'max-width', '');
        if (length > this.countOfSymbolsForUpdateWidth) {
            this.renderer.setStyle(this.inputElement, 'width', length * this.oneSymbolWidth + "px");
        }
        else {
            this.setDefaultInputWidth();
        }
    };
    /**
     * @return {?}
     */
    McTagInput.prototype.onFocus = /**
     * @return {?}
     */
    function () {
        this.focused = true;
        this._tagList.stateChanges.next();
    };
    /** Focuses the input. */
    /**
     * Focuses the input.
     * @return {?}
     */
    McTagInput.prototype.focus = /**
     * Focuses the input.
     * @return {?}
     */
    function () {
        this.inputElement.focus();
    };
    /**
     * @private
     * @param {?} k
     * @return {?}
     */
    McTagInput.prototype.separatorKeyToSymbol = /**
     * @private
     * @param {?} k
     * @return {?}
     */
    function (k) {
        var _a;
        /** @type {?} */
        var sep = (_a = {},
            _a[ENTER] = /\r?\n/,
            _a[TAB] = /\t/,
            _a[SPACE] = / /,
            _a[COMMA] = /,/,
            _a)[k];
        if (sep) {
            return sep;
        }
        return k;
    };
    /**
     * @private
     * @return {?}
     */
    McTagInput.prototype.hasControl = /**
     * @private
     * @return {?}
     */
    function () {
        return !!this.ngControl;
    };
    /**
     * @private
     * @return {?}
     */
    McTagInput.prototype.setDefaultInputWidth = /**
     * @private
     * @return {?}
     */
    function () {
        this.renderer.setStyle(this.inputElement, 'width', '30px');
    };
    /** Checks whether a keycode is one of the configured separators. */
    /**
     * Checks whether a keycode is one of the configured separators.
     * @private
     * @param {?} event
     * @return {?}
     */
    McTagInput.prototype.isSeparatorKey = /**
     * Checks whether a keycode is one of the configured separators.
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (hasModifierKey(event)) {
            return false;
        }
        // tslint:disable-next-line: deprecation
        return this.separatorKeyCodes.indexOf(event.keyCode) > -1;
    };
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
    McTagInput.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: undefined, decorators: [{ type: Inject, args: [MC_TAGS_DEFAULT_OPTIONS,] }] },
        { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
    ]; };
    McTagInput.propDecorators = {
        separatorKeyCodes: [{ type: Input, args: ['mcTagInputSeparatorKeyCodes',] }],
        tagEnd: [{ type: Output, args: ['mcTagInputTokenEnd',] }],
        placeholder: [{ type: Input }],
        id: [{ type: Input }],
        tagList: [{ type: Input, args: ['mcTagInputFor',] }],
        addOnBlur: [{ type: Input, args: ['mcTagInputAddOnBlur',] }],
        disabled: [{ type: Input }]
    };
    return McTagInput;
}());
export { McTagInput };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RhZ3MvIiwic291cmNlcyI6WyJ0YWctaW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUNILFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsSUFBSSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXBGLE9BQU8sRUFBRSx1QkFBdUIsRUFBd0IsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7O0FBTWpELHFDQU1DOzs7Ozs7SUFKRyxnQ0FBd0I7Ozs7O0lBR3hCLGdDQUFjOzs7O0lBSWQsWUFBWSxHQUFHLENBQUM7Ozs7O0FBTXBCO0lBeUZJLG9CQUNZLFVBQXdDLEVBQ3hDLFFBQW1CLEVBQ2MsY0FBb0MsRUFDbEQsU0FBb0I7UUFIdkMsZUFBVSxHQUFWLFVBQVUsQ0FBOEI7UUFDeEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNjLG1CQUFjLEdBQWQsY0FBYyxDQUFzQjtRQUNsRCxjQUFTLEdBQVQsU0FBUyxDQUFXOzs7O1FBMUVuRCxZQUFPLEdBQVksS0FBSyxDQUFDOzs7Ozs7UUFRekIsc0JBQWlCLEdBQWEsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQzs7OztRQUlwRSxXQUFNLEdBQWtDLElBQUksWUFBWSxFQUFtQixDQUFDOzs7O1FBR25FLGdCQUFXLEdB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UHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgUmVuZGVyZXIyLFxuICAgIFNlbGZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBoYXNNb2RpZmllcktleSwgRU5URVIsIFRBQiwgU1BBQ0UsIENPTU1BIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcblxuaW1wb3J0IHsgTUNfVEFHU19ERUZBVUxUX09QVElPTlMsIE1jVGFnc0RlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi90YWctZGVmYXVsdC1vcHRpb25zJztcbmltcG9ydCB7IE1jVGFnTGlzdCB9IGZyb20gJy4vdGFnLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IE1jVGFnVGV4dENvbnRyb2wgfSBmcm9tICcuL3RhZy10ZXh0LWNvbnRyb2wnO1xuXG5cbi8qKiBSZXByZXNlbnRzIGFuIGlucHV0IGV2ZW50IG9uIGEgYG1jVGFnSW5wdXRgLiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBNY1RhZ0lucHV0RXZlbnQge1xuICAgIC8qKiBUaGUgbmF0aXZlIGA8aW5wdXQ+YCBlbGVtZW50IHRoYXQgdGhlIGV2ZW50IGlzIGJlaW5nIGZpcmVkIGZvci4gKi9cbiAgICBpbnB1dDogSFRNTElucHV0RWxlbWVudDtcblxuICAgIC8qKiBUaGUgdmFsdWUgb2YgdGhlIGlucHV0LiAqL1xuICAgIHZhbHVlOiBzdHJpbmc7XG59XG5cbi8vIEluY3JlYXNpbmcgaW50ZWdlciBmb3IgZ2VuZXJhdGluZyB1bmlxdWUgaWRzLlxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgYWRkcyB0YWctc3BlY2lmaWMgYmVoYXZpb3JzIHRvIGFuIGlucHV0IGVsZW1lbnQgaW5zaWRlIGA8bWMtZm9ybS1maWVsZD5gLlxuICogTWF5IGJlIHBsYWNlZCBpbnNpZGUgb3Igb3V0c2lkZSBvZiBhbiBgPG1jLXRhZy1saXN0PmAuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnaW5wdXRbbWNUYWdJbnB1dEZvcl0nLFxuICAgIGV4cG9ydEFzOiAnbWNUYWdJbnB1dCwgbWNUYWdJbnB1dEZvcicsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRhZy1pbnB1dCcsXG5cbiAgICAgICAgJ1tpZF0nOiAnaWQnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICAgICAnW2F0dHIucGxhY2Vob2xkZXJdJzogJ3BsYWNlaG9sZGVyIHx8IG51bGwnLFxuXG4gICAgICAgICcoa2V5ZG93biknOiAnb25LZXlkb3duKCRldmVudCknLFxuICAgICAgICAnKGJsdXIpJzogJ2JsdXIoKScsXG4gICAgICAgICcoZm9jdXMpJzogJ29uRm9jdXMoKScsXG4gICAgICAgICcoaW5wdXQpJzogJ29uSW5wdXQoKScsXG4gICAgICAgICcocGFzdGUpJzogJ29uUGFzdGUoJGV2ZW50KSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVGFnSW5wdXQgaW1wbGVtZW50cyBNY1RhZ1RleHRDb250cm9sLCBPbkNoYW5nZXMge1xuICAgIC8qKiBXaGV0aGVyIHRoZSBjb250cm9sIGlzIGZvY3VzZWQuICovXG4gICAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGxpc3Qgb2Yga2V5IGNvZGVzIHRoYXQgd2lsbCB0cmlnZ2VyIGEgdGFnRW5kIGV2ZW50LlxuICAgICAqXG4gICAgICogRGVmYXVsdHMgdG8gYFtFTlRFUl1gLlxuICAgICAqL1xuICAgIEBJbnB1dCgnbWNUYWdJbnB1dFNlcGFyYXRvcktleUNvZGVzJylcbiAgICBzZXBhcmF0b3JLZXlDb2RlczogbnVtYmVyW10gPSB0aGlzLmRlZmF1bHRPcHRpb25zLnNlcGFyYXRvcktleUNvZGVzO1xuXG4gICAgLyoqIEVtaXR0ZWQgd2hlbiBhIHRhZyBpcyB0byBiZSBhZGRlZC4gKi9cbiAgICBAT3V0cHV0KCdtY1RhZ0lucHV0VG9rZW5FbmQnKVxuICAgIHRhZ0VuZDogRXZlbnRFbWl0dGVyPE1jVGFnSW5wdXRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1jVGFnSW5wdXRFdmVudD4oKTtcblxuICAgIC8qKiBUaGUgaW5wdXQncyBwbGFjZWhvbGRlciB0ZXh0LiAqL1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnJztcblxuICAgIC8qKiBVbmlxdWUgaWQgZm9yIHRoZSBpbnB1dC4gKi9cbiAgICBASW5wdXQoKSBpZDogc3RyaW5nID0gYG1jLXRhZy1saXN0LWlucHV0LSR7bmV4dFVuaXF1ZUlkKyt9YDtcblxuICAgIC8qKiBSZWdpc3RlciBpbnB1dCBmb3IgdGFnIGxpc3QgKi9cbiAgICBASW5wdXQoJ21jVGFnSW5wdXRGb3InKVxuICAgIHNldCB0YWdMaXN0KHZhbHVlOiBNY1RhZ0xpc3QpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl90YWdMaXN0ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl90YWdMaXN0LnJlZ2lzdGVySW5wdXQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5hbWluZy1jb252ZW50aW9uXG4gICAgcHJpdmF0ZSBfdGFnTGlzdDogTWNUYWdMaXN0O1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBvciBub3QgdGhlIHRhZ0VuZCBldmVudCB3aWxsIGJlIGVtaXR0ZWQgd2hlbiB0aGUgaW5wdXQgaXMgYmx1cnJlZC5cbiAgICAgKi9cbiAgICBASW5wdXQoJ21jVGFnSW5wdXRBZGRPbkJsdXInKVxuICAgIGdldCBhZGRPbkJsdXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRPbkJsdXI7XG4gICAgfVxuXG4gICAgc2V0IGFkZE9uQmx1cih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9hZGRPbkJsdXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2FkZE9uQmx1cjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogV2hldGhlciB0aGUgaW5wdXQgaXMgZGlzYWJsZWQuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCB8fCAodGhpcy5fdGFnTGlzdCAmJiB0aGlzLl90YWdMaXN0LmRpc2FibGVkKTtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogV2hldGhlciB0aGUgaW5wdXQgaXMgZW1wdHkuICovXG4gICAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuaW5wdXRFbGVtZW50LnZhbHVlO1xuICAgIH1cblxuICAgIGNvdW50T2ZTeW1ib2xzRm9yVXBkYXRlV2lkdGg6IG51bWJlciA9IDM7XG5cbiAgICBwcml2YXRlIG9uZVN5bWJvbFdpZHRoOiBudW1iZXI7XG5cbiAgICAvKiogVGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50IHRvIHdoaWNoIHRoaXMgZGlyZWN0aXZlIGlzIGF0dGFjaGVkLiAqL1xuICAgIHByaXZhdGUgaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBASW5qZWN0KE1DX1RBR1NfREVGQVVMVF9PUFRJT05TKSBwcml2YXRlIGRlZmF1bHRPcHRpb25zOiBNY1RhZ3NEZWZhdWx0T3B0aW9ucyxcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2xcbiAgICApIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bm5lY2Vzc2FyeS10eXBlLWFzc2VydGlvblxuICAgICAgICB0aGlzLmlucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICAgICAgdGhpcy5zZXREZWZhdWx0SW5wdXRXaWR0aCgpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICB0aGlzLl90YWdMaXN0LnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pbnB1dEVsZW1lbnQudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RhZ0xpc3Qua2V5ZG93bihldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc1NlcGFyYXRvcktleShldmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdFRhZ0VuZCgpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB0byBzZWUgaWYgdGhlIGJsdXIgc2hvdWxkIGVtaXQgdGhlICh0YWdFbmQpIGV2ZW50LiAqL1xuICAgIGJsdXIoKSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICAvLyBCbHVyIHRoZSB0YWcgbGlzdCBpZiBpdCBpcyBub3QgZm9jdXNlZFxuICAgICAgICBpZiAoIXRoaXMuX3RhZ0xpc3QuZm9jdXNlZCkge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyVmFsaWRhdGlvbigpO1xuXG4gICAgICAgICAgICB0aGlzLl90YWdMaXN0LmJsdXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW5uZWNlc3NhcnktdHlwZS1hc3NlcnRpb25cbiAgICAgICAgaWYgKHRoaXMuYWRkT25CbHVyKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRUYWdFbmQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3RhZ0xpc3Quc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICB0cmlnZ2VyVmFsaWRhdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0NvbnRyb2woKSkgeyByZXR1cm47IH1cblxuICAgICAgICAodGhpcy5uZ0NvbnRyb2wuc3RhdHVzQ2hhbmdlcyBhcyBFdmVudEVtaXR0ZXI8c3RyaW5nIHwgbnVsbD4pLmVtaXQodGhpcy5uZ0NvbnRyb2wuc3RhdHVzKTtcbiAgICB9XG5cbiAgICAvKiogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgKHRhZ0VuZCkgZXZlbnQgbmVlZHMgdG8gYmUgZW1pdHRlZC4gKi9cbiAgICBlbWl0VGFnRW5kKCkge1xuICAgICAgICBpZiAoIXRoaXMuaGFzQ29udHJvbCgpIHx8ICh0aGlzLmhhc0NvbnRyb2woKSAmJiAhdGhpcy5uZ0NvbnRyb2wuaW52YWxpZCkpIHtcbiAgICAgICAgICAgIHRoaXMudGFnRW5kLmVtaXQoeyBpbnB1dDogdGhpcy5pbnB1dEVsZW1lbnQsIHZhbHVlOiB0aGlzLmlucHV0RWxlbWVudC52YWx1ZSB9KTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRXaWR0aCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JbnB1dCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dFdpZHRoKCk7XG4gICAgICAgIC8vIExldCB0YWcgbGlzdCBrbm93IHdoZW5ldmVyIHRoZSB2YWx1ZSBjaGFuZ2VzLlxuICAgICAgICB0aGlzLl90YWdMaXN0LnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgb25QYXN0ZSgkZXZlbnQ6IENsaXBib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICghJGV2ZW50LmNsaXBib2FyZERhdGEpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgY29uc3QgZGF0YSA9ICRldmVudC5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQnKTtcblxuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBpdGVtczogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiB0aGlzLnNlcGFyYXRvcktleUNvZGVzKSB7XG4gICAgICAgICAgICBjb25zdCBzZXBhcmF0b3IgPSB0aGlzLnNlcGFyYXRvcktleVRvU3ltYm9sKGtleSk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnNlYXJjaChzZXBhcmF0b3IpID4gLTEpIHtcbiAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKC4uLmRhdGEuc3BsaXQoc2VwYXJhdG9yKSk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB0aGlzLnRhZ0VuZC5lbWl0KHsgaW5wdXQ6IHRoaXMuaW5wdXRFbGVtZW50LCB2YWx1ZTogaXRlbSB9KSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dFdpZHRoKCk7XG5cbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICB1cGRhdGVJbnB1dFdpZHRoKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLmlucHV0RWxlbWVudC52YWx1ZS5sZW5ndGg7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmlucHV0RWxlbWVudCwgJ21heC13aWR0aCcsIDApO1xuICAgICAgICB0aGlzLm9uZVN5bWJvbFdpZHRoID0gdGhpcy5pbnB1dEVsZW1lbnQuc2Nyb2xsV2lkdGggLyBsZW5ndGg7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5pbnB1dEVsZW1lbnQsICdtYXgtd2lkdGgnLCAnJyk7XG5cbiAgICAgICAgaWYgKGxlbmd0aCA+IHRoaXMuY291bnRPZlN5bWJvbHNGb3JVcGRhdGVXaWR0aCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmlucHV0RWxlbWVudCwgJ3dpZHRoJywgYCR7bGVuZ3RoICogdGhpcy5vbmVTeW1ib2xXaWR0aH1weGApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXREZWZhdWx0SW5wdXRXaWR0aCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Gb2N1cygpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fdGFnTGlzdC5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIC8qKiBGb2N1c2VzIHRoZSBpbnB1dC4gKi9cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNlcGFyYXRvcktleVRvU3ltYm9sKGspOiBSZWdFeHAgfCBzdHJpbmcge1xuICAgICAgICBjb25zdCBzZXAgPSB7XG4gICAgICAgICAgICBbRU5URVJdOiAvXFxyP1xcbi8sXG4gICAgICAgICAgICBbVEFCXTogL1xcdC8sXG4gICAgICAgICAgICBbU1BBQ0VdOiAvIC8sXG4gICAgICAgICAgICBbQ09NTUFdOiAvLC9cbiAgICAgICAgfVtrXTtcblxuICAgICAgICBpZiAoc2VwKSB7IHJldHVybiBzZXA7IH1cblxuICAgICAgICByZXR1cm4gaztcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhc0NvbnRyb2woKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMubmdDb250cm9sO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0RGVmYXVsdElucHV0V2lkdGgoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5pbnB1dEVsZW1lbnQsICd3aWR0aCcsICczMHB4Jyk7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIGEga2V5Y29kZSBpcyBvbmUgb2YgdGhlIGNvbmZpZ3VyZWQgc2VwYXJhdG9ycy4gKi9cbiAgICBwcml2YXRlIGlzU2VwYXJhdG9yS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmIChoYXNNb2RpZmllcktleShldmVudCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICByZXR1cm4gdGhpcy5zZXBhcmF0b3JLZXlDb2Rlcy5pbmRleE9mKGV2ZW50LmtleUNvZGUpID4gLTE7XG4gICAgfVxufVxuIl19