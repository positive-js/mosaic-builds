/**
 * @fileoverview added by tsickle
 * Generated from: checkbox.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { mixinColor, mixinDisabled, mixinTabIndex, toBoolean } from '@ptsecurity/mosaic/core';
import { MC_CHECKBOX_CLICK_ACTION } from './checkbox-config';
// Increasing integer for generating unique ids for checkbox components.
/** @type {?} */
let nextUniqueId = 0;
/**
 * Provider Expression that allows mc-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * \@docs-private
 * @type {?}
 */
export const MC_CHECKBOX_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => McCheckbox)),
    multi: true
};
/** @enum {number} */
const TransitionCheckState = {
    /** The initial state of the component before any user interaction. */
    Init: 0,
    /** The state representing the component when it's becoming checked. */
    Checked: 1,
    /** The state representing the component when it's becoming unchecked. */
    Unchecked: 2,
    /** The state representing the component when it's becoming indeterminate. */
    Indeterminate: 3,
};
export { TransitionCheckState };
TransitionCheckState[TransitionCheckState.Init] = 'Init';
TransitionCheckState[TransitionCheckState.Checked] = 'Checked';
TransitionCheckState[TransitionCheckState.Unchecked] = 'Unchecked';
TransitionCheckState[TransitionCheckState.Indeterminate] = 'Indeterminate';
/**
 * Change event object emitted by McCheckbox.
 */
export class McCheckboxChange {
}
if (false) {
    /**
     * The source McCheckbox of the event.
     * @type {?}
     */
    McCheckboxChange.prototype.source;
    /**
     * The new `checked` value of the checkbox.
     * @type {?}
     */
    McCheckboxChange.prototype.checked;
}
// Boilerplate for applying mixins to McCheckbox.
/**
 * \@docs-private
 */
export class McCheckboxBase {
    // tslint:disable-next-line:naming-convention
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
if (false) {
    /** @type {?} */
    McCheckboxBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export const McCheckboxMixinBase = mixinTabIndex(mixinColor(mixinDisabled(McCheckboxBase)));
/**
 * A mosaic checkbox component. Supports all of the functionality of an HTML5 checkbox,
 * and exposes a similar API. A McCheckbox can be either checked, unchecked, indeterminate, or
 * disabled. Note that all additional accessibility attributes are taken care of by the component,
 * so there is no need to provide them yourself. However, if you want to omit a label and still
 * have the checkbox be accessible, you may supply an [aria-label] input.
 */
export class McCheckbox extends McCheckboxMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} _changeDetectorRef
     * @param {?} _focusMonitor
     * @param {?} _clickAction
     */
    constructor(elementRef, _changeDetectorRef, _focusMonitor, _clickAction) {
        super(elementRef);
        this._changeDetectorRef = _changeDetectorRef;
        this._focusMonitor = _focusMonitor;
        this._clickAction = _clickAction;
        /**
         * Attached to the aria-label attribute of the host element. In most cases, arial-labelledby will
         * take precedence so this may be omitted.
         */
        this.ariaLabel = '';
        /**
         * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
         */
        this.ariaLabelledby = null;
        /**
         * Whether the label should appear after or before the checkbox. Defaults to 'after'
         */
        this.labelPosition = 'after';
        /**
         * Name value will be applied to the input element if present
         */
        this.name = null;
        /**
         * Event emitted when the checkbox's `checked` value changes.
         */
        this.change = new EventEmitter();
        /**
         * Event emitted when the checkbox's `indeterminate` value changes.
         */
        this.indeterminateChange = new EventEmitter();
        this._checked = false;
        this._disabled = false;
        this._indeterminate = false;
        this.uniqueId = `mc-checkbox-${++nextUniqueId}`;
        this.currentAnimationClass = '';
        this.currentCheckState = TransitionCheckState.Init;
        /**
         * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
         * \@docs-private
         */
        // tslint:disable-next-line:no-empty
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
        // tslint:disable-next-line:no-empty
        this.controlValueAccessorChangeFn = (/**
         * @return {?}
         */
        () => { });
        this.id = this.uniqueId;
    }
    /**
     * Returns the unique id for the visual hidden input.
     * @return {?}
     */
    get inputId() {
        return `${this.id || this.uniqueId}-input`;
    }
    /**
     * Whether the checkbox is required.
     * @return {?}
     */
    get required() {
        return this._required;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) {
        this._required = toBoolean(value);
    }
    /**
     * Whether the checkbox is checked.
     * @return {?}
     */
    get checked() {
        return this._checked;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set checked(value) {
        if (value !== this.checked) {
            this._checked = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
     * Whether the checkbox is disabled. This fully overrides the implementation provided by
     * mixinDisabled, but the mixin is still required because mixinTabIndex requires it.
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        if (value !== this.disabled) {
            this._disabled = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
     * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
     * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
     * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
     * set to false.
     * @return {?}
     */
    get indeterminate() {
        return this._indeterminate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set indeterminate(value) {
        /** @type {?} */
        const changed = value !== this._indeterminate;
        this._indeterminate = value;
        if (changed) {
            if (this._indeterminate) {
                this.transitionCheckState(TransitionCheckState.Indeterminate);
            }
            else {
                this.transitionCheckState(this.checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
            }
            this.indeterminateChange.emit(this._indeterminate);
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._focusMonitor
            .monitor(this.inputElement.nativeElement)
            .subscribe((/**
         * @param {?} focusOrigin
         * @return {?}
         */
        (focusOrigin) => this.onInputFocusChange(focusOrigin)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this.inputElement.nativeElement);
    }
    /**
     * Method being called whenever the label text changes.
     * @return {?}
     */
    onLabelTextChange() {
        // This method is getting called whenever the label of the checkbox changes.
        // Since the checkbox uses the OnPush strategy we need to notify it about the change
        // that has been recognized by the cdkObserveContent directive.
        this._changeDetectorRef.markForCheck();
    }
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.checked = !!value;
    }
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.controlValueAccessorChangeFn = fn;
    }
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @return {?}
     */
    getAriaChecked() {
        return this.checked ? 'true' : (this.indeterminate ? 'mixed' : 'false');
    }
    /**
     * Toggles the `checked` state of the checkbox.
     * @return {?}
     */
    toggle() {
        this.checked = !this.checked;
    }
    /**
     * Event handler for checkbox input element.
     * Toggles checked state if element is not disabled.
     * Do not toggle on (change) event since IE doesn't fire change event when
     *   indeterminate checkbox is clicked.
     * @param {?} event Input click event
     * @return {?}
     */
    onInputClick(event) {
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `checkbox` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
        // If resetIndeterminate is false, and the current state is indeterminate, do nothing on click
        if (!this.disabled && this._clickAction !== 'noop') {
            // When user manually click on the checkbox, `indeterminate` is set to false.
            if (this.indeterminate && this._clickAction !== 'check') {
                Promise.resolve().then((/**
                 * @return {?}
                 */
                () => {
                    this._indeterminate = false;
                    this.indeterminateChange.emit(this._indeterminate);
                }));
            }
            this.toggle();
            this.transitionCheckState(this._checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
            // Emit our custom change event if the native input emitted one.
            // It is important to only emit it, if the native input triggered one, because
            // we don't want to trigger a change event, when the `checked` variable changes for example.
            this.emitChangeEvent();
        }
        else if (!this.disabled && this._clickAction === 'noop') {
            // Reset native input when clicked with noop. The native checkbox becomes checked after
            // click, reset it to be align with `checked` value of `mc-checkbox`.
            this.inputElement.nativeElement.checked = this.checked;
            this.inputElement.nativeElement.indeterminate = this.indeterminate;
        }
    }
    /**
     * Focuses the checkbox.
     * @return {?}
     */
    focus() {
        this._focusMonitor.focusVia(this.inputElement.nativeElement, 'keyboard');
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onInteractionEvent(event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
    }
    /**
     * @private
     * @param {?} newState
     * @return {?}
     */
    transitionCheckState(newState) {
        /** @type {?} */
        const oldState = this.currentCheckState;
        /** @type {?} */
        const element = this._elementRef.nativeElement;
        if (oldState === newState) {
            return;
        }
        if (this.currentAnimationClass.length > 0) {
            element.classList.remove(this.currentAnimationClass);
        }
        this.currentCheckState = newState;
        if (this.currentAnimationClass.length > 0) {
            element.classList.add(this.currentAnimationClass);
        }
    }
    /**
     * @private
     * @return {?}
     */
    emitChangeEvent() {
        /** @type {?} */
        const event = new McCheckboxChange();
        event.source = this;
        event.checked = this.checked;
        this.controlValueAccessorChangeFn(this.checked);
        this.change.emit(event);
    }
    /**
     * Function is called whenever the focus changes for the input element.
     * @private
     * @param {?} focusOrigin
     * @return {?}
     */
    onInputFocusChange(focusOrigin) {
        if (focusOrigin) {
            this.onTouched();
        }
    }
}
McCheckbox.decorators = [
    { type: Component, args: [{
                selector: 'mc-checkbox',
                exportAs: 'mcCheckbox',
                template: "<label [attr.for]=\"inputId\" class=\"mc-checkbox-layout\" #label>\n    <div class=\"mc-checkbox-inner-container\"\n         [class.mc-checkbox-inner-container-no-side-margin]=\"!checkboxLabel.textContent || !checkboxLabel.textContent.trim()\">\n        <input #input\n               type=\"checkbox\"\n               class=\"mc-checkbox-input cdk-visually-hidden\"\n               [id]=\"inputId\"\n               [required]=\"required\"\n               [checked]=\"checked\"\n               [attr.value]=\"value\"\n               [disabled]=\"disabled\"\n               [attr.name]=\"name\"\n               [tabIndex]=\"tabIndex\"\n               [indeterminate]=\"indeterminate\"\n               [attr.aria-label]=\"ariaLabel || null\"\n               [attr.aria-labelledby]=\"ariaLabelledby\"\n               [attr.aria-checked]=\"getAriaChecked()\"\n               (change)=\"onInteractionEvent($event)\"\n               (click)=\"onInputClick($event)\">\n        <div class=\"mc-checkbox-frame\">\n            <i class=\"mc-checkbox-checkmark mc mc-check_16\"></i>\n            <i class=\"mc-checkbox-mixedmark mc mc-minus_16\"></i>\n        </div>\n    </div>\n\n    <span class=\"mc-checkbox-label\" #checkboxLabel (cdkObserveContent)=\"onLabelTextChange()\">\n    <ng-content></ng-content>\n  </span>\n</label>\n",
                host: {
                    class: 'mc-checkbox',
                    '[id]': 'id',
                    '[attr.id]': 'id',
                    '[class.mc-indeterminate]': 'indeterminate',
                    '[class.mc-checked]': 'checked',
                    '[class.mc-disabled]': 'disabled',
                    '[class.mc-checkbox-label-before]': 'labelPosition == "before"'
                },
                providers: [MC_CHECKBOX_CONTROL_VALUE_ACCESSOR],
                inputs: ['color', 'tabIndex'],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mc-checkbox-frame{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:3px;box-sizing:border-box;pointer-events:none;background-color:transparent;border-width:1px;border-style:solid;box-shadow:inset 0 0 1px 0 rgba(0,0,0,.2)}.mc-checkbox-checkmark,.mc-checkbox-mixedmark{display:none;position:absolute;top:-1px;left:-1px;right:0;bottom:0}.mc-checkbox{display:inline-block;cursor:pointer;-webkit-tap-highlight-color:transparent}.mc-checkbox.mc-checked .mc-checkbox-checkmark{display:block}.mc-checkbox.mc-checked .mc-checkbox-mixedmark,.mc-checkbox.mc-indeterminate .mc-checkbox-checkmark{display:none}.mc-checkbox.mc-indeterminate .mc-checkbox-mixedmark{display:block}.mc-checkbox.mc-disabled{cursor:default}.mc-checkbox.mc-disabled .mc-checkbox-frame{box-shadow:none}.mc-checkbox-layout{cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap;width:100%}.mc-checkbox-inner-container{display:inline-block;height:16px;line-height:0;margin-right:8px;order:0;position:relative;-ms-grid-row-align:center;align-self:center;white-space:nowrap;width:16px;flex-shrink:0}[dir=rtl] .mc-checkbox-inner-container{margin-left:8px;margin-right:auto}.mc-checkbox-inner-container-no-side-margin{margin-left:0;margin-right:0}.mc-checkbox-label-before .mc-checkbox-inner-container{order:1;margin-left:8px;margin-right:auto}[dir=rtl] .mc-checkbox-label-before .mc-checkbox-inner-container{margin-left:auto;margin-right:8px}"]
            }] }
];
/** @nocollapse */
McCheckbox.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: FocusMonitor },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_CHECKBOX_CLICK_ACTION,] }] }
];
McCheckbox.propDecorators = {
    ariaLabel: [{ type: Input, args: ['aria-label',] }],
    ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }],
    id: [{ type: Input }],
    labelPosition: [{ type: Input }],
    name: [{ type: Input }],
    change: [{ type: Output }],
    indeterminateChange: [{ type: Output }],
    value: [{ type: Input }],
    inputElement: [{ type: ViewChild, args: ['input', { static: false },] }],
    required: [{ type: Input }],
    checked: [{ type: Input }],
    disabled: [{ type: Input }],
    indeterminate: [{ type: Input }]
};
if (false) {
    /**
     * Attached to the aria-label attribute of the host element. In most cases, arial-labelledby will
     * take precedence so this may be omitted.
     * @type {?}
     */
    McCheckbox.prototype.ariaLabel;
    /**
     * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
     * @type {?}
     */
    McCheckbox.prototype.ariaLabelledby;
    /**
     * A unique id for the checkbox input. If none is supplied, it will be auto-generated.
     * @type {?}
     */
    McCheckbox.prototype.id;
    /**
     * Whether the label should appear after or before the checkbox. Defaults to 'after'
     * @type {?}
     */
    McCheckbox.prototype.labelPosition;
    /**
     * Name value will be applied to the input element if present
     * @type {?}
     */
    McCheckbox.prototype.name;
    /**
     * Event emitted when the checkbox's `checked` value changes.
     * @type {?}
     */
    McCheckbox.prototype.change;
    /**
     * Event emitted when the checkbox's `indeterminate` value changes.
     * @type {?}
     */
    McCheckbox.prototype.indeterminateChange;
    /**
     * The value attribute of the native input element
     * @type {?}
     */
    McCheckbox.prototype.value;
    /**
     * The native `<input type="checkbox">` element
     * @type {?}
     */
    McCheckbox.prototype.inputElement;
    /**
     * @type {?}
     * @private
     */
    McCheckbox.prototype._required;
    /**
     * @type {?}
     * @private
     */
    McCheckbox.prototype._checked;
    /**
     * @type {?}
     * @private
     */
    McCheckbox.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    McCheckbox.prototype._indeterminate;
    /**
     * @type {?}
     * @private
     */
    McCheckbox.prototype.uniqueId;
    /**
     * @type {?}
     * @private
     */
    McCheckbox.prototype.currentAnimationClass;
    /**
     * @type {?}
     * @private
     */
    McCheckbox.prototype.currentCheckState;
    /**
     * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
     * \@docs-private
     * @type {?}
     */
    McCheckbox.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    McCheckbox.prototype.controlValueAccessorChangeFn;
    /**
     * @type {?}
     * @private
     */
    McCheckbox.prototype._changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    McCheckbox.prototype._focusMonitor;
    /**
     * @type {?}
     * @private
     */
    McCheckbox.prototype._clickAction;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvY2hlY2tib3gvIiwic291cmNlcyI6WyJjaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFPSCxVQUFVLEVBQ1YsYUFBYSxFQUNiLGFBQWEsRUFDYixTQUFTLEVBQ1osTUFBTSx5QkFBeUIsQ0FBQztBQUVqQyxPQUFPLEVBQUUsd0JBQXdCLEVBQXlCLE1BQU0sbUJBQW1CLENBQUM7OztJQUloRixZQUFZLEdBQUcsQ0FBQzs7Ozs7OztBQU9wQixNQUFNLE9BQU8sa0NBQWtDLEdBQVE7SUFDbkQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxFQUFDO0lBQ3pDLEtBQUssRUFBRSxJQUFJO0NBQ2Q7O0FBTUQsTUFBWSxvQkFBb0I7SUFDNUIsc0VBQXNFO0lBQ3RFLElBQUksR0FBQTtJQUNKLHVFQUF1RTtJQUN2RSxPQUFPLEdBQUE7SUFDUCx5RUFBeUU7SUFDekUsU0FBUyxHQUFBO0lBQ1QsNkVBQTZFO0lBQzdFLGFBQWEsR0FBQTtFQUNoQjs7Ozs7Ozs7O0FBR0QsTUFBTSxPQUFPLGdCQUFnQjtDQUs1Qjs7Ozs7O0lBSEcsa0NBQW1COzs7OztJQUVuQixtQ0FBaUI7Ozs7OztBQUtyQixNQUFNLE9BQU8sY0FBYzs7Ozs7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QkFBaUI7WUFKWixZQUFZOzRDQThPWixRQUFRLFlBQUksTUFBTSxTQUFDLHdCQUF3Qjs7O3dCQXZIL0MsS0FBSyxTQUFDLFlBQVk7NkJBS2xCLEtBQUssU0FBQyxpQkFBaUI7aUJBR3ZCLEtBQUs7NEJBR0wsS0FBSzttQkFHTCxLQUFLO3FCQUdMLE1BQU07a0NBR04sTUFBTTtvQkFHTixLQUFLOzJCQUdMLFNBQVMsU0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO3VCQVFwQyxLQUFLO3NCQWNMLEtBQUs7dUJBa0JMLEtBQUs7NEJBb0JMLEtBQUs7Ozs7Ozs7O0lBdEZOLCtCQUE0Qzs7Ozs7SUFLNUMsb0NBQStEOzs7OztJQUcvRCx3QkFBb0I7Ozs7O0lBR3BCLG1DQUFxRDs7Ozs7SUFHckQsMEJBQW9DOzs7OztJQUdwQyw0QkFBaUc7Ozs7O0lBR2pHLHlDQUE0Rjs7Ozs7SUFHNUYsMkJBQXVCOzs7OztJQUd2QixrQ0FBZ0U7Ozs7O0lBaUJoRSwrQkFBMkI7Ozs7O0lBaUIzQiw4QkFBa0M7Ozs7O0lBa0JsQywrQkFBbUM7Ozs7O0lBNkJuQyxvQ0FBd0M7Ozs7O0lBRXhDLDhCQUEyRDs7Ozs7SUFFM0QsMkNBQTJDOzs7OztJQUUzQyx1Q0FBNEU7Ozs7OztJQW1CNUUsK0JBQWdDOzs7OztJQXlHaEMsa0RBQXNFOzs7OztJQXhIbEUsd0NBQTZDOzs7OztJQUM3QyxtQ0FBbUM7Ozs7O0lBQ25DLGtDQUMyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciwgRm9jdXNPcmlnaW4gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgICBDYW5Db2xvcixcbiAgICBDYW5Db2xvckN0b3IsXG4gICAgQ2FuRGlzYWJsZSxcbiAgICBDYW5EaXNhYmxlQ3RvcixcbiAgICBIYXNUYWJJbmRleCxcbiAgICBIYXNUYWJJbmRleEN0b3IsXG4gICAgbWl4aW5Db2xvcixcbiAgICBtaXhpbkRpc2FibGVkLFxuICAgIG1peGluVGFiSW5kZXgsXG4gICAgdG9Cb29sZWFuXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuaW1wb3J0IHsgTUNfQ0hFQ0tCT1hfQ0xJQ0tfQUNUSU9OLCBNY0NoZWNrYm94Q2xpY2tBY3Rpb24gfSBmcm9tICcuL2NoZWNrYm94LWNvbmZpZyc7XG5cblxuLy8gSW5jcmVhc2luZyBpbnRlZ2VyIGZvciBnZW5lcmF0aW5nIHVuaXF1ZSBpZHMgZm9yIGNoZWNrYm94IGNvbXBvbmVudHMuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxuLyoqXG4gKiBQcm92aWRlciBFeHByZXNzaW9uIHRoYXQgYWxsb3dzIG1jLWNoZWNrYm94IHRvIHJlZ2lzdGVyIGFzIGEgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gKiBUaGlzIGFsbG93cyBpdCB0byBzdXBwb3J0IFsobmdNb2RlbCldLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgTUNfQ0hFQ0tCT1hfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1jQ2hlY2tib3gpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGRpZmZlcmVudCBzdGF0ZXMgdGhhdCByZXF1aXJlIGN1c3RvbSB0cmFuc2l0aW9ucyBiZXR3ZWVuIHRoZW0uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBlbnVtIFRyYW5zaXRpb25DaGVja1N0YXRlIHtcbiAgICAvKiogVGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIGNvbXBvbmVudCBiZWZvcmUgYW55IHVzZXIgaW50ZXJhY3Rpb24uICovXG4gICAgSW5pdCxcbiAgICAvKiogVGhlIHN0YXRlIHJlcHJlc2VudGluZyB0aGUgY29tcG9uZW50IHdoZW4gaXQncyBiZWNvbWluZyBjaGVja2VkLiAqL1xuICAgIENoZWNrZWQsXG4gICAgLyoqIFRoZSBzdGF0ZSByZXByZXNlbnRpbmcgdGhlIGNvbXBvbmVudCB3aGVuIGl0J3MgYmVjb21pbmcgdW5jaGVja2VkLiAqL1xuICAgIFVuY2hlY2tlZCxcbiAgICAvKiogVGhlIHN0YXRlIHJlcHJlc2VudGluZyB0aGUgY29tcG9uZW50IHdoZW4gaXQncyBiZWNvbWluZyBpbmRldGVybWluYXRlLiAqL1xuICAgIEluZGV0ZXJtaW5hdGVcbn1cblxuLyoqIENoYW5nZSBldmVudCBvYmplY3QgZW1pdHRlZCBieSBNY0NoZWNrYm94LiAqL1xuZXhwb3J0IGNsYXNzIE1jQ2hlY2tib3hDaGFuZ2Uge1xuICAgIC8qKiBUaGUgc291cmNlIE1jQ2hlY2tib3ggb2YgdGhlIGV2ZW50LiAqL1xuICAgIHNvdXJjZTogTWNDaGVja2JveDtcbiAgICAvKiogVGhlIG5ldyBgY2hlY2tlZGAgdmFsdWUgb2YgdGhlIGNoZWNrYm94LiAqL1xuICAgIGNoZWNrZWQ6IGJvb2xlYW47XG59XG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWNDaGVja2JveC5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY2xhc3MgTWNDaGVja2JveEJhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNDaGVja2JveE1peGluQmFzZTpcbiAgICBIYXNUYWJJbmRleEN0b3IgJlxuICAgIENhbkNvbG9yQ3RvciAmXG4gICAgQ2FuRGlzYWJsZUN0b3IgJlxuICAgIHR5cGVvZiBNY0NoZWNrYm94QmFzZSA9IG1peGluVGFiSW5kZXgobWl4aW5Db2xvcihtaXhpbkRpc2FibGVkKE1jQ2hlY2tib3hCYXNlKSkpO1xuXG5cbi8qKlxuICogQSBtb3NhaWMgY2hlY2tib3ggY29tcG9uZW50LiBTdXBwb3J0cyBhbGwgb2YgdGhlIGZ1bmN0aW9uYWxpdHkgb2YgYW4gSFRNTDUgY2hlY2tib3gsXG4gKiBhbmQgZXhwb3NlcyBhIHNpbWlsYXIgQVBJLiBBIE1jQ2hlY2tib3ggY2FuIGJlIGVpdGhlciBjaGVja2VkLCB1bmNoZWNrZWQsIGluZGV0ZXJtaW5hdGUsIG9yXG4gKiBkaXNhYmxlZC4gTm90ZSB0aGF0IGFsbCBhZGRpdGlvbmFsIGFjY2Vzc2liaWxpdHkgYXR0cmlidXRlcyBhcmUgdGFrZW4gY2FyZSBvZiBieSB0aGUgY29tcG9uZW50LFxuICogc28gdGhlcmUgaXMgbm8gbmVlZCB0byBwcm92aWRlIHRoZW0geW91cnNlbGYuIEhvd2V2ZXIsIGlmIHlvdSB3YW50IHRvIG9taXQgYSBsYWJlbCBhbmQgc3RpbGxcbiAqIGhhdmUgdGhlIGNoZWNrYm94IGJlIGFjY2Vzc2libGUsIHlvdSBtYXkgc3VwcGx5IGFuIFthcmlhLWxhYmVsXSBpbnB1dC5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1jaGVja2JveCcsXG4gICAgZXhwb3J0QXM6ICdtY0NoZWNrYm94JyxcbiAgICB0ZW1wbGF0ZVVybDogJ2NoZWNrYm94Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydjaGVja2JveC5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWNoZWNrYm94JyxcbiAgICAgICAgJ1tpZF0nOiAnaWQnLFxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1pbmRldGVybWluYXRlXSc6ICdpbmRldGVybWluYXRlJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1jaGVja2VkXSc6ICdjaGVja2VkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWNoZWNrYm94LWxhYmVsLWJlZm9yZV0nOiAnbGFiZWxQb3NpdGlvbiA9PSBcImJlZm9yZVwiJ1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbTUNfQ0hFQ0tCT1hfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl0sXG4gICAgaW5wdXRzOiBbJ2NvbG9yJywgJ3RhYkluZGV4J10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY0NoZWNrYm94IGV4dGVuZHMgTWNDaGVja2JveE1peGluQmFzZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgQ2FuQ29sb3IsIENhbkRpc2FibGUsIEhhc1RhYkluZGV4IHtcblxuICAgIC8qKlxuICAgICAqIEF0dGFjaGVkIHRvIHRoZSBhcmlhLWxhYmVsIGF0dHJpYnV0ZSBvZiB0aGUgaG9zdCBlbGVtZW50LiBJbiBtb3N0IGNhc2VzLCBhcmlhbC1sYWJlbGxlZGJ5IHdpbGxcbiAgICAgKiB0YWtlIHByZWNlZGVuY2Ugc28gdGhpcyBtYXkgYmUgb21pdHRlZC5cbiAgICAgKi9cbiAgICBASW5wdXQoJ2FyaWEtbGFiZWwnKSBhcmlhTGFiZWw6IHN0cmluZyA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogVXNlcnMgY2FuIHNwZWNpZnkgdGhlIGBhcmlhLWxhYmVsbGVkYnlgIGF0dHJpYnV0ZSB3aGljaCB3aWxsIGJlIGZvcndhcmRlZCB0byB0aGUgaW5wdXQgZWxlbWVudFxuICAgICAqL1xuICAgIEBJbnB1dCgnYXJpYS1sYWJlbGxlZGJ5JykgYXJpYUxhYmVsbGVkYnk6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgLyoqIEEgdW5pcXVlIGlkIGZvciB0aGUgY2hlY2tib3ggaW5wdXQuIElmIG5vbmUgaXMgc3VwcGxpZWQsIGl0IHdpbGwgYmUgYXV0by1nZW5lcmF0ZWQuICovXG4gICAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBsYWJlbCBzaG91bGQgYXBwZWFyIGFmdGVyIG9yIGJlZm9yZSB0aGUgY2hlY2tib3guIERlZmF1bHRzIHRvICdhZnRlcicgKi9cbiAgICBASW5wdXQoKSBsYWJlbFBvc2l0aW9uOiAnYmVmb3JlJyB8ICdhZnRlcicgPSAnYWZ0ZXInO1xuXG4gICAgLyoqIE5hbWUgdmFsdWUgd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBpbnB1dCBlbGVtZW50IGlmIHByZXNlbnQgKi9cbiAgICBASW5wdXQoKSBuYW1lOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGNoZWNrYm94J3MgYGNoZWNrZWRgIHZhbHVlIGNoYW5nZXMuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZTogRXZlbnRFbWl0dGVyPE1jQ2hlY2tib3hDaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxNY0NoZWNrYm94Q2hhbmdlPigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgY2hlY2tib3gncyBgaW5kZXRlcm1pbmF0ZWAgdmFsdWUgY2hhbmdlcy4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgaW5kZXRlcm1pbmF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgLyoqIFRoZSB2YWx1ZSBhdHRyaWJ1dGUgb2YgdGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50ICovXG4gICAgQElucHV0KCkgdmFsdWU6IHN0cmluZztcblxuICAgIC8qKiBUaGUgbmF0aXZlIGA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCI+YCBlbGVtZW50ICovXG4gICAgQFZpZXdDaGlsZCgnaW5wdXQnLCB7IHN0YXRpYzogZmFsc2UgfSkgaW5wdXRFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gICAgLyoqIFJldHVybnMgdGhlIHVuaXF1ZSBpZCBmb3IgdGhlIHZpc3VhbCBoaWRkZW4gaW5wdXQuICovXG4gICAgZ2V0IGlucHV0SWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuaWQgfHwgdGhpcy51bmlxdWVJZH0taW5wdXRgO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBjaGVja2JveCBpcyByZXF1aXJlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVpcmVkO1xuICAgIH1cblxuICAgIHNldCByZXF1aXJlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9yZXF1aXJlZCA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBjaGVja2JveCBpcyBjaGVja2VkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGNoZWNrZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGVja2VkO1xuICAgIH1cblxuICAgIHNldCBjaGVja2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLl9jaGVja2VkID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2NoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGNoZWNrYm94IGlzIGRpc2FibGVkLiBUaGlzIGZ1bGx5IG92ZXJyaWRlcyB0aGUgaW1wbGVtZW50YXRpb24gcHJvdmlkZWQgYnlcbiAgICAgKiBtaXhpbkRpc2FibGVkLCBidXQgdGhlIG1peGluIGlzIHN0aWxsIHJlcXVpcmVkIGJlY2F1c2UgbWl4aW5UYWJJbmRleCByZXF1aXJlcyBpdC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGNoZWNrYm94IGlzIGluZGV0ZXJtaW5hdGUuIFRoaXMgaXMgYWxzbyBrbm93biBhcyBcIm1peGVkXCIgbW9kZSBhbmQgY2FuIGJlIHVzZWQgdG9cbiAgICAgKiByZXByZXNlbnQgYSBjaGVja2JveCB3aXRoIHRocmVlIHN0YXRlcywgZS5nLiBhIGNoZWNrYm94IHRoYXQgcmVwcmVzZW50cyBhIG5lc3RlZCBsaXN0IG9mXG4gICAgICogY2hlY2thYmxlIGl0ZW1zLiBOb3RlIHRoYXQgd2hlbmV2ZXIgY2hlY2tib3ggaXMgbWFudWFsbHkgY2xpY2tlZCwgaW5kZXRlcm1pbmF0ZSBpcyBpbW1lZGlhdGVseVxuICAgICAqIHNldCB0byBmYWxzZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBpbmRldGVybWluYXRlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5kZXRlcm1pbmF0ZTtcbiAgICB9XG5cbiAgICBzZXQgaW5kZXRlcm1pbmF0ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBjaGFuZ2VkID0gdmFsdWUgIT09IHRoaXMuX2luZGV0ZXJtaW5hdGU7XG4gICAgICAgIHRoaXMuX2luZGV0ZXJtaW5hdGUgPSB2YWx1ZTtcblxuICAgICAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2luZGV0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zaXRpb25DaGVja1N0YXRlKFRyYW5zaXRpb25DaGVja1N0YXRlLkluZGV0ZXJtaW5hdGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zaXRpb25DaGVja1N0YXRlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWQgPyBUcmFuc2l0aW9uQ2hlY2tTdGF0ZS5DaGVja2VkIDogVHJhbnNpdGlvbkNoZWNrU3RhdGUuVW5jaGVja2VkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5pbmRldGVybWluYXRlQ2hhbmdlLmVtaXQodGhpcy5faW5kZXRlcm1pbmF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbmRldGVybWluYXRlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIHVuaXF1ZUlkOiBzdHJpbmcgPSBgbWMtY2hlY2tib3gtJHsrK25leHRVbmlxdWVJZH1gO1xuXG4gICAgcHJpdmF0ZSBjdXJyZW50QW5pbWF0aW9uQ2xhc3M6IHN0cmluZyA9ICcnO1xuXG4gICAgcHJpdmF0ZSBjdXJyZW50Q2hlY2tTdGF0ZTogVHJhbnNpdGlvbkNoZWNrU3RhdGUgPSBUcmFuc2l0aW9uQ2hlY2tTdGF0ZS5Jbml0O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfQ0hFQ0tCT1hfQ0xJQ0tfQUNUSU9OKVxuICAgICAgICBwcml2YXRlIF9jbGlja0FjdGlvbjogTWNDaGVja2JveENsaWNrQWN0aW9uXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuXG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLnVuaXF1ZUlkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIHRoZSBjaGVja2JveCBpcyBibHVycmVkLiBOZWVkZWQgdG8gcHJvcGVybHkgaW1wbGVtZW50IENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcbiAgICBvblRvdWNoZWQ6ICgpID0+IGFueSA9ICgpID0+IHt9O1xuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLl9mb2N1c01vbml0b3JcbiAgICAgICAgICAgIC5tb25pdG9yKHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChmb2N1c09yaWdpbikgPT4gdGhpcy5vbklucHV0Rm9jdXNDaGFuZ2UoZm9jdXNPcmlnaW4pKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8qKiBNZXRob2QgYmVpbmcgY2FsbGVkIHdoZW5ldmVyIHRoZSBsYWJlbCB0ZXh0IGNoYW5nZXMuICovXG4gICAgb25MYWJlbFRleHRDaGFuZ2UoKSB7XG4gICAgICAgIC8vIFRoaXMgbWV0aG9kIGlzIGdldHRpbmcgY2FsbGVkIHdoZW5ldmVyIHRoZSBsYWJlbCBvZiB0aGUgY2hlY2tib3ggY2hhbmdlcy5cbiAgICAgICAgLy8gU2luY2UgdGhlIGNoZWNrYm94IHVzZXMgdGhlIE9uUHVzaCBzdHJhdGVneSB3ZSBuZWVkIHRvIG5vdGlmeSBpdCBhYm91dCB0aGUgY2hhbmdlXG4gICAgICAgIC8vIHRoYXQgaGFzIGJlZW4gcmVjb2duaXplZCBieSB0aGUgY2RrT2JzZXJ2ZUNvbnRlbnQgZGlyZWN0aXZlLlxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSAhIXZhbHVlO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuID0gZm47XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgZ2V0QXJpYUNoZWNrZWQoKTogJ3RydWUnIHwgJ2ZhbHNlJyB8ICdtaXhlZCcge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGVja2VkID8gJ3RydWUnIDogKHRoaXMuaW5kZXRlcm1pbmF0ZSA/ICdtaXhlZCcgOiAnZmFsc2UnKTtcbiAgICB9XG5cbiAgICAvKiogVG9nZ2xlcyB0aGUgYGNoZWNrZWRgIHN0YXRlIG9mIHRoZSBjaGVja2JveC4gKi9cbiAgICB0b2dnbGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXZlbnQgaGFuZGxlciBmb3IgY2hlY2tib3ggaW5wdXQgZWxlbWVudC5cbiAgICAgKiBUb2dnbGVzIGNoZWNrZWQgc3RhdGUgaWYgZWxlbWVudCBpcyBub3QgZGlzYWJsZWQuXG4gICAgICogRG8gbm90IHRvZ2dsZSBvbiAoY2hhbmdlKSBldmVudCBzaW5jZSBJRSBkb2Vzbid0IGZpcmUgY2hhbmdlIGV2ZW50IHdoZW5cbiAgICAgKiAgIGluZGV0ZXJtaW5hdGUgY2hlY2tib3ggaXMgY2xpY2tlZC5cbiAgICAgKiBAcGFyYW0gZXZlbnQgSW5wdXQgY2xpY2sgZXZlbnRcbiAgICAgKi9cbiAgICBvbklucHV0Q2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIC8vIFdlIGhhdmUgdG8gc3RvcCBwcm9wYWdhdGlvbiBmb3IgY2xpY2sgZXZlbnRzIG9uIHRoZSB2aXN1YWwgaGlkZGVuIGlucHV0IGVsZW1lbnQuXG4gICAgICAgIC8vIEJ5IGRlZmF1bHQsIHdoZW4gYSB1c2VyIGNsaWNrcyBvbiBhIGxhYmVsIGVsZW1lbnQsIGEgZ2VuZXJhdGVkIGNsaWNrIGV2ZW50IHdpbGwgYmVcbiAgICAgICAgLy8gZGlzcGF0Y2hlZCBvbiB0aGUgYXNzb2NpYXRlZCBpbnB1dCBlbGVtZW50LiBTaW5jZSB3ZSBhcmUgdXNpbmcgYSBsYWJlbCBlbGVtZW50IGFzIG91clxuICAgICAgICAvLyByb290IGNvbnRhaW5lciwgdGhlIGNsaWNrIGV2ZW50IG9uIHRoZSBgY2hlY2tib3hgIHdpbGwgYmUgZXhlY3V0ZWQgdHdpY2UuXG4gICAgICAgIC8vIFRoZSByZWFsIGNsaWNrIGV2ZW50IHdpbGwgYnViYmxlIHVwLCBhbmQgdGhlIGdlbmVyYXRlZCBjbGljayBldmVudCBhbHNvIHRyaWVzIHRvIGJ1YmJsZSB1cC5cbiAgICAgICAgLy8gVGhpcyB3aWxsIGxlYWQgdG8gbXVsdGlwbGUgY2xpY2sgZXZlbnRzLlxuICAgICAgICAvLyBQcmV2ZW50aW5nIGJ1YmJsaW5nIGZvciB0aGUgc2Vjb25kIGV2ZW50IHdpbGwgc29sdmUgdGhhdCBpc3N1ZS5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgLy8gSWYgcmVzZXRJbmRldGVybWluYXRlIGlzIGZhbHNlLCBhbmQgdGhlIGN1cnJlbnQgc3RhdGUgaXMgaW5kZXRlcm1pbmF0ZSwgZG8gbm90aGluZyBvbiBjbGlja1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgdGhpcy5fY2xpY2tBY3Rpb24gIT09ICdub29wJykge1xuICAgICAgICAgICAgLy8gV2hlbiB1c2VyIG1hbnVhbGx5IGNsaWNrIG9uIHRoZSBjaGVja2JveCwgYGluZGV0ZXJtaW5hdGVgIGlzIHNldCB0byBmYWxzZS5cbiAgICAgICAgICAgIGlmICh0aGlzLmluZGV0ZXJtaW5hdGUgJiYgdGhpcy5fY2xpY2tBY3Rpb24gIT09ICdjaGVjaycpIHtcblxuICAgICAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRldGVybWluYXRlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXRlcm1pbmF0ZUNoYW5nZS5lbWl0KHRoaXMuX2luZGV0ZXJtaW5hdGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uQ2hlY2tTdGF0ZShcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja2VkID8gVHJhbnNpdGlvbkNoZWNrU3RhdGUuQ2hlY2tlZCA6IFRyYW5zaXRpb25DaGVja1N0YXRlLlVuY2hlY2tlZCk7XG5cbiAgICAgICAgICAgIC8vIEVtaXQgb3VyIGN1c3RvbSBjaGFuZ2UgZXZlbnQgaWYgdGhlIG5hdGl2ZSBpbnB1dCBlbWl0dGVkIG9uZS5cbiAgICAgICAgICAgIC8vIEl0IGlzIGltcG9ydGFudCB0byBvbmx5IGVtaXQgaXQsIGlmIHRoZSBuYXRpdmUgaW5wdXQgdHJpZ2dlcmVkIG9uZSwgYmVjYXVzZVxuICAgICAgICAgICAgLy8gd2UgZG9uJ3Qgd2FudCB0byB0cmlnZ2VyIGEgY2hhbmdlIGV2ZW50LCB3aGVuIHRoZSBgY2hlY2tlZGAgdmFyaWFibGUgY2hhbmdlcyBmb3IgZXhhbXBsZS5cbiAgICAgICAgICAgIHRoaXMuZW1pdENoYW5nZUV2ZW50KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgdGhpcy5fY2xpY2tBY3Rpb24gPT09ICdub29wJykge1xuICAgICAgICAgICAgLy8gUmVzZXQgbmF0aXZlIGlucHV0IHdoZW4gY2xpY2tlZCB3aXRoIG5vb3AuIFRoZSBuYXRpdmUgY2hlY2tib3ggYmVjb21lcyBjaGVja2VkIGFmdGVyXG4gICAgICAgICAgICAvLyBjbGljaywgcmVzZXQgaXQgdG8gYmUgYWxpZ24gd2l0aCBgY2hlY2tlZGAgdmFsdWUgb2YgYG1jLWNoZWNrYm94YC5cbiAgICAgICAgICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCA9IHRoaXMuY2hlY2tlZDtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuaW5kZXRlcm1pbmF0ZSA9IHRoaXMuaW5kZXRlcm1pbmF0ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBGb2N1c2VzIHRoZSBjaGVja2JveC4gKi9cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLmZvY3VzVmlhKHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdrZXlib2FyZCcpO1xuICAgIH1cblxuICAgIG9uSW50ZXJhY3Rpb25FdmVudChldmVudDogRXZlbnQpIHtcbiAgICAgICAgLy8gV2UgYWx3YXlzIGhhdmUgdG8gc3RvcCBwcm9wYWdhdGlvbiBvbiB0aGUgY2hhbmdlIGV2ZW50LlxuICAgICAgICAvLyBPdGhlcndpc2UgdGhlIGNoYW5nZSBldmVudCwgZnJvbSB0aGUgaW5wdXQgZWxlbWVudCwgd2lsbCBidWJibGUgdXAgYW5kXG4gICAgICAgIC8vIGVtaXQgaXRzIGV2ZW50IG9iamVjdCB0byB0aGUgYGNoYW5nZWAgb3V0cHV0LlxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5XG4gICAgcHJpdmF0ZSBjb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gICAgcHJpdmF0ZSB0cmFuc2l0aW9uQ2hlY2tTdGF0ZShuZXdTdGF0ZTogVHJhbnNpdGlvbkNoZWNrU3RhdGUpIHtcbiAgICAgICAgY29uc3Qgb2xkU3RhdGUgPSB0aGlzLmN1cnJlbnRDaGVja1N0YXRlO1xuICAgICAgICBjb25zdCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgICBpZiAob2xkU3RhdGUgPT09IG5ld1N0YXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEFuaW1hdGlvbkNsYXNzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmN1cnJlbnRBbmltYXRpb25DbGFzcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN1cnJlbnRDaGVja1N0YXRlID0gbmV3U3RhdGU7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEFuaW1hdGlvbkNsYXNzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmN1cnJlbnRBbmltYXRpb25DbGFzcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGVtaXRDaGFuZ2VFdmVudCgpIHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgTWNDaGVja2JveENoYW5nZSgpO1xuICAgICAgICBldmVudC5zb3VyY2UgPSB0aGlzO1xuICAgICAgICBldmVudC5jaGVja2VkID0gdGhpcy5jaGVja2VkO1xuXG4gICAgICAgIHRoaXMuY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbih0aGlzLmNoZWNrZWQpO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKiogRnVuY3Rpb24gaXMgY2FsbGVkIHdoZW5ldmVyIHRoZSBmb2N1cyBjaGFuZ2VzIGZvciB0aGUgaW5wdXQgZWxlbWVudC4gKi9cbiAgICBwcml2YXRlIG9uSW5wdXRGb2N1c0NoYW5nZShmb2N1c09yaWdpbjogRm9jdXNPcmlnaW4pIHtcbiAgICAgICAgaWYgKGZvY3VzT3JpZ2luKSB7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19