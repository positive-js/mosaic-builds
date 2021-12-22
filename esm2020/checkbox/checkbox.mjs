import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { mixinColor, mixinDisabled, mixinTabIndex, toBoolean } from '@ptsecurity/mosaic/core';
import { MC_CHECKBOX_CLICK_ACTION } from './checkbox-config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
// Increasing integer for generating unique ids for checkbox components.
let nextUniqueId = 0;
/**
 * Provider Expression that allows mc-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export const MC_CHECKBOX_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => McCheckbox),
    multi: true
};
/**
 * Represents the different states that require custom transitions between them.
 * @docs-private
 */
export var TransitionCheckState;
(function (TransitionCheckState) {
    /** The initial state of the component before any user interaction. */
    TransitionCheckState[TransitionCheckState["Init"] = 0] = "Init";
    /** The state representing the component when it's becoming checked. */
    TransitionCheckState[TransitionCheckState["Checked"] = 1] = "Checked";
    /** The state representing the component when it's becoming unchecked. */
    TransitionCheckState[TransitionCheckState["Unchecked"] = 2] = "Unchecked";
    /** The state representing the component when it's becoming indeterminate. */
    TransitionCheckState[TransitionCheckState["Indeterminate"] = 3] = "Indeterminate";
})(TransitionCheckState || (TransitionCheckState = {}));
/** Change event object emitted by McCheckbox. */
export class McCheckboxChange {
}
// Boilerplate for applying mixins to McCheckbox.
/** @docs-private */
export class McCheckboxBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
export const McCheckboxMixinBase = mixinTabIndex(mixinColor(mixinDisabled(McCheckboxBase)));
/**
 * A mosaic checkbox component. Supports all of the functionality of an HTML5 checkbox,
 * and exposes a similar API. A McCheckbox can be either checked, unchecked, indeterminate, or
 * disabled. Note that all additional accessibility attributes are taken care of by the component,
 * so there is no need to provide them yourself. However, if you want to omit a label and still
 * have the checkbox be accessible, you may supply an [aria-label] input.
 */
export class McCheckbox extends McCheckboxMixinBase {
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
        /** Whether the label should appear after or before the checkbox. Defaults to 'after' */
        this.labelPosition = 'after';
        /** Name value will be applied to the input element if present */
        this.name = null;
        /** Event emitted when the checkbox's `checked` value changes. */
        this.change = new EventEmitter();
        /** Event emitted when the checkbox's `indeterminate` value changes. */
        this.indeterminateChange = new EventEmitter();
        this._checked = false;
        this._disabled = false;
        this._indeterminate = false;
        this.uniqueId = `mc-checkbox-${++nextUniqueId}`;
        this.currentAnimationClass = '';
        this.currentCheckState = TransitionCheckState.Init;
        /**
         * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
         * @docs-private
         */
        // tslint:disable-next-line:no-empty
        this.onTouched = () => { };
        // tslint:disable-next-line:no-empty
        this.controlValueAccessorChangeFn = () => { };
        this.id = this.uniqueId;
    }
    /** Returns the unique id for the visual hidden input. */
    get inputId() {
        return `${this.id || this.uniqueId}-input`;
    }
    /** Whether the checkbox is required. */
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = toBoolean(value);
    }
    /**
     * Whether the checkbox is checked.
     */
    get checked() {
        return this._checked;
    }
    set checked(value) {
        if (value !== this.checked) {
            this._checked = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
     * Whether the checkbox is disabled. This fully overrides the implementation provided by
     * mixinDisabled, but the mixin is still required because mixinTabIndex requires it.
     */
    get disabled() {
        return this._disabled;
    }
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
     */
    get indeterminate() {
        return this._indeterminate;
    }
    set indeterminate(value) {
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
    ngAfterViewInit() {
        this._focusMonitor
            .monitor(this.inputElement.nativeElement)
            .subscribe((focusOrigin) => this.onInputFocusChange(focusOrigin));
    }
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this.inputElement.nativeElement);
    }
    /** Method being called whenever the label text changes. */
    onLabelTextChange() {
        // This method is getting called whenever the label of the checkbox changes.
        // Since the checkbox uses the OnPush strategy we need to notify it about the change
        // that has been recognized by the cdkObserveContent directive.
        this._changeDetectorRef.markForCheck();
    }
    // Implemented as part of ControlValueAccessor.
    writeValue(value) {
        this.checked = !!value;
    }
    // Implemented as part of ControlValueAccessor.
    registerOnChange(fn) {
        this.controlValueAccessorChangeFn = fn;
    }
    // Implemented as part of ControlValueAccessor.
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    // Implemented as part of ControlValueAccessor.
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    getAriaChecked() {
        return this.checked ? 'true' : (this.indeterminate ? 'mixed' : 'false');
    }
    /** Toggles the `checked` state of the checkbox. */
    toggle() {
        this.checked = !this.checked;
    }
    /**
     * Event handler for checkbox input element.
     * Toggles checked state if element is not disabled.
     * Do not toggle on (change) event since IE doesn't fire change event when
     *   indeterminate checkbox is clicked.
     * @param event Input click event
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
                Promise.resolve().then(() => {
                    this._indeterminate = false;
                    this.indeterminateChange.emit(this._indeterminate);
                });
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
    /** Focuses the checkbox. */
    focus() {
        this._focusMonitor.focusVia(this.inputElement.nativeElement, 'keyboard');
    }
    onInteractionEvent(event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
    }
    transitionCheckState(newState) {
        const oldState = this.currentCheckState;
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
    emitChangeEvent() {
        const event = new McCheckboxChange();
        event.source = this;
        event.checked = this.checked;
        this.controlValueAccessorChangeFn(this.checked);
        this.change.emit(event);
    }
    /** Function is called whenever the focus changes for the input element. */
    onInputFocusChange(focusOrigin) {
        if (focusOrigin) {
            this.onTouched();
        }
    }
}
/** @nocollapse */ /** @nocollapse */ McCheckbox.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McCheckbox, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.FocusMonitor }, { token: MC_CHECKBOX_CLICK_ACTION, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McCheckbox.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: McCheckbox, selector: "mc-checkbox", inputs: { color: "color", tabIndex: "tabIndex", ariaLabel: ["aria-label", "ariaLabel"], ariaLabelledby: ["aria-labelledby", "ariaLabelledby"], id: "id", labelPosition: "labelPosition", name: "name", value: "value", required: "required", checked: "checked", disabled: "disabled", indeterminate: "indeterminate" }, outputs: { change: "change", indeterminateChange: "indeterminateChange" }, host: { properties: { "id": "id", "attr.id": "id", "class.mc-indeterminate": "indeterminate", "class.mc-checked": "checked", "class.mc-disabled": "disabled", "class.mc-checkbox-label-before": "labelPosition == \"before\"" }, classAttribute: "mc-checkbox" }, providers: [MC_CHECKBOX_CONTROL_VALUE_ACCESSOR], viewQueries: [{ propertyName: "inputElement", first: true, predicate: ["input"], descendants: true }], exportAs: ["mcCheckbox"], usesInheritance: true, ngImport: i0, template: "<label [attr.for]=\"inputId\" class=\"mc-checkbox-layout\" #label>\n    <div class=\"mc-checkbox-inner-container\"\n         [class.mc-checkbox-inner-container-no-side-margin]=\"!checkboxLabel.textContent || !checkboxLabel.textContent.trim()\">\n        <input #input\n               type=\"checkbox\"\n               class=\"mc-checkbox-input cdk-visually-hidden\"\n               [id]=\"inputId\"\n               [required]=\"required\"\n               [checked]=\"checked\"\n               [attr.value]=\"value\"\n               [disabled]=\"disabled\"\n               [attr.name]=\"name\"\n               [tabIndex]=\"tabIndex\"\n               [indeterminate]=\"indeterminate\"\n               [attr.aria-label]=\"ariaLabel || null\"\n               [attr.aria-labelledby]=\"ariaLabelledby\"\n               [attr.aria-checked]=\"getAriaChecked()\"\n               (change)=\"onInteractionEvent($event)\"\n               (click)=\"onInputClick($event)\">\n        <div class=\"mc-checkbox-frame\">\n            <i class=\"mc-checkbox-checkmark mc mc-check_16\"></i>\n            <i class=\"mc-checkbox-mixedmark mc mc-minus_16\"></i>\n        </div>\n    </div>\n\n    <span class=\"mc-checkbox-label\" #checkboxLabel (cdkObserveContent)=\"onLabelTextChange()\">\n    <ng-content></ng-content>\n  </span>\n</label>\n", styles: [".mc-checkbox-frame{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:3px;box-sizing:border-box;pointer-events:none}.mc-checkbox-checkmark,.mc-checkbox-mixedmark{display:none;position:absolute;top:-1px;left:-1px;right:0;bottom:0}.mc-checkbox-frame{background-color:transparent;border-width:1px;border-width:var(--mc-checkbox-size-border-width, 1px);border-style:solid;box-shadow:inset 0 0 1px #0003;box-shadow:var(--mc-checkbox-size-toggle-box-shadow, inset 0 0 1px 0 rgba(0, 0, 0, .2))}.mc-checkbox{display:inline-block;cursor:pointer;-webkit-tap-highlight-color:transparent}.mc-checkbox.mc-checked .mc-checkbox-checkmark{display:block}.mc-checkbox.mc-checked .mc-checkbox-mixedmark,.mc-checkbox.mc-indeterminate .mc-checkbox-checkmark{display:none}.mc-checkbox.mc-indeterminate .mc-checkbox-mixedmark{display:block}.mc-checkbox.mc-disabled{cursor:default}.mc-checkbox.mc-disabled .mc-checkbox-frame{box-shadow:none}.mc-checkbox-layout{cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap;width:100%}.mc-checkbox-inner-container{display:inline-block;height:16px;height:var(--mc-checkbox-size-width, 16px);line-height:0;margin-right:8px;order:0;position:relative;align-self:center;white-space:nowrap;width:16px;width:var(--mc-checkbox-size-width, 16px);flex-shrink:0}[dir=rtl] .mc-checkbox-inner-container{margin-left:8px;margin-right:auto}.mc-checkbox-inner-container-no-side-margin{margin-left:0;margin-right:0}.mc-checkbox-label-before .mc-checkbox-inner-container{order:1;margin-left:8px;margin-right:auto}[dir=rtl] .mc-checkbox-label-before .mc-checkbox-inner-container{margin-left:auto;margin-right:8px}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McCheckbox, decorators: [{
            type: Component,
            args: [{ selector: 'mc-checkbox', exportAs: 'mcCheckbox', host: {
                        class: 'mc-checkbox',
                        '[id]': 'id',
                        '[attr.id]': 'id',
                        '[class.mc-indeterminate]': 'indeterminate',
                        '[class.mc-checked]': 'checked',
                        '[class.mc-disabled]': 'disabled',
                        '[class.mc-checkbox-label-before]': 'labelPosition == "before"'
                    }, providers: [MC_CHECKBOX_CONTROL_VALUE_ACCESSOR], inputs: ['color', 'tabIndex'], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<label [attr.for]=\"inputId\" class=\"mc-checkbox-layout\" #label>\n    <div class=\"mc-checkbox-inner-container\"\n         [class.mc-checkbox-inner-container-no-side-margin]=\"!checkboxLabel.textContent || !checkboxLabel.textContent.trim()\">\n        <input #input\n               type=\"checkbox\"\n               class=\"mc-checkbox-input cdk-visually-hidden\"\n               [id]=\"inputId\"\n               [required]=\"required\"\n               [checked]=\"checked\"\n               [attr.value]=\"value\"\n               [disabled]=\"disabled\"\n               [attr.name]=\"name\"\n               [tabIndex]=\"tabIndex\"\n               [indeterminate]=\"indeterminate\"\n               [attr.aria-label]=\"ariaLabel || null\"\n               [attr.aria-labelledby]=\"ariaLabelledby\"\n               [attr.aria-checked]=\"getAriaChecked()\"\n               (change)=\"onInteractionEvent($event)\"\n               (click)=\"onInputClick($event)\">\n        <div class=\"mc-checkbox-frame\">\n            <i class=\"mc-checkbox-checkmark mc mc-check_16\"></i>\n            <i class=\"mc-checkbox-mixedmark mc mc-minus_16\"></i>\n        </div>\n    </div>\n\n    <span class=\"mc-checkbox-label\" #checkboxLabel (cdkObserveContent)=\"onLabelTextChange()\">\n    <ng-content></ng-content>\n  </span>\n</label>\n", styles: [".mc-checkbox-frame{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:3px;box-sizing:border-box;pointer-events:none}.mc-checkbox-checkmark,.mc-checkbox-mixedmark{display:none;position:absolute;top:-1px;left:-1px;right:0;bottom:0}.mc-checkbox-frame{background-color:transparent;border-width:1px;border-width:var(--mc-checkbox-size-border-width, 1px);border-style:solid;box-shadow:inset 0 0 1px #0003;box-shadow:var(--mc-checkbox-size-toggle-box-shadow, inset 0 0 1px 0 rgba(0, 0, 0, .2))}.mc-checkbox{display:inline-block;cursor:pointer;-webkit-tap-highlight-color:transparent}.mc-checkbox.mc-checked .mc-checkbox-checkmark{display:block}.mc-checkbox.mc-checked .mc-checkbox-mixedmark,.mc-checkbox.mc-indeterminate .mc-checkbox-checkmark{display:none}.mc-checkbox.mc-indeterminate .mc-checkbox-mixedmark{display:block}.mc-checkbox.mc-disabled{cursor:default}.mc-checkbox.mc-disabled .mc-checkbox-frame{box-shadow:none}.mc-checkbox-layout{cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap;width:100%}.mc-checkbox-inner-container{display:inline-block;height:16px;height:var(--mc-checkbox-size-width, 16px);line-height:0;margin-right:8px;order:0;position:relative;align-self:center;white-space:nowrap;width:16px;width:var(--mc-checkbox-size-width, 16px);flex-shrink:0}[dir=rtl] .mc-checkbox-inner-container{margin-left:8px;margin-right:auto}.mc-checkbox-inner-container-no-side-margin{margin-left:0;margin-right:0}.mc-checkbox-label-before .mc-checkbox-inner-container{order:1;margin-left:8px;margin-right:auto}[dir=rtl] .mc-checkbox-label-before .mc-checkbox-inner-container{margin-left:auto;margin-right:8px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.FocusMonitor }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MC_CHECKBOX_CLICK_ACTION]
                }] }]; }, propDecorators: { ariaLabel: [{
                type: Input,
                args: ['aria-label']
            }], ariaLabelledby: [{
                type: Input,
                args: ['aria-labelledby']
            }], id: [{
                type: Input
            }], labelPosition: [{
                type: Input
            }], name: [{
                type: Input
            }], change: [{
                type: Output
            }], indeterminateChange: [{
                type: Output
            }], value: [{
                type: Input
            }], inputElement: [{
                type: ViewChild,
                args: ['input', { static: false }]
            }], required: [{
                type: Input
            }], checked: [{
                type: Input
            }], disabled: [{
                type: Input
            }], indeterminate: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvY2hlY2tib3gvY2hlY2tib3gudHMiLCIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvY2hlY2tib3gvY2hlY2tib3guaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFDOUQsT0FBTyxFQUVILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBT0gsVUFBVSxFQUNWLGFBQWEsRUFDYixhQUFhLEVBQ2IsU0FBUyxFQUNaLE1BQU0seUJBQXlCLENBQUM7QUFFakMsT0FBTyxFQUFFLHdCQUF3QixFQUF5QixNQUFNLG1CQUFtQixDQUFDOzs7QUFHcEYsd0VBQXdFO0FBQ3hFLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUVyQjs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sa0NBQWtDLEdBQVE7SUFDbkQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztJQUN6QyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFFRjs7O0dBR0c7QUFDSCxNQUFNLENBQU4sSUFBWSxvQkFTWDtBQVRELFdBQVksb0JBQW9CO0lBQzVCLHNFQUFzRTtJQUN0RSwrREFBSSxDQUFBO0lBQ0osdUVBQXVFO0lBQ3ZFLHFFQUFPLENBQUE7SUFDUCx5RUFBeUU7SUFDekUseUVBQVMsQ0FBQTtJQUNU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R25ELDJ5Q0E2QkE7MkZEbUZhLFVBQVU7a0JBbkJ0QixTQUFTOytCQUNJLGFBQWEsWUFDYixZQUFZLFFBR2hCO3dCQUNGLEtBQUssRUFBRSxhQUFhO3dCQUNwQixNQUFNLEVBQUUsSUFBSTt3QkFDWixXQUFXLEVBQUUsSUFBSTt3QkFDakIsMEJBQTBCLEVBQUUsZUFBZTt3QkFDM0Msb0JBQW9CLEVBQUUsU0FBUzt3QkFDL0IscUJBQXFCLEVBQUUsVUFBVTt3QkFDakMsa0NBQWtDLEVBQUUsMkJBQTJCO3FCQUNsRSxhQUNVLENBQUMsa0NBQWtDLENBQUMsVUFDdkMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLGlCQUNkLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU07OzBCQWdJMUMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyx3QkFBd0I7NENBdkgzQixTQUFTO3NCQUE3QixLQUFLO3VCQUFDLFlBQVk7Z0JBS08sY0FBYztzQkFBdkMsS0FBSzt1QkFBQyxpQkFBaUI7Z0JBR2YsRUFBRTtzQkFBVixLQUFLO2dCQUdHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBR0csSUFBSTtzQkFBWixLQUFLO2dCQUdhLE1BQU07c0JBQXhCLE1BQU07Z0JBR1ksbUJBQW1CO3NCQUFyQyxNQUFNO2dCQUdFLEtBQUs7c0JBQWIsS0FBSztnQkFHaUMsWUFBWTtzQkFBbEQsU0FBUzt1QkFBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQVNqQyxRQUFRO3NCQURYLEtBQUs7Z0JBZUYsT0FBTztzQkFEVixLQUFLO2dCQW1CRixRQUFRO3NCQURYLEtBQUs7Z0JBcUJGLGFBQWE7c0JBRGhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IsIEZvY3VzT3JpZ2luIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gICAgQ2FuQ29sb3IsXG4gICAgQ2FuQ29sb3JDdG9yLFxuICAgIENhbkRpc2FibGUsXG4gICAgQ2FuRGlzYWJsZUN0b3IsXG4gICAgSGFzVGFiSW5kZXgsXG4gICAgSGFzVGFiSW5kZXhDdG9yLFxuICAgIG1peGluQ29sb3IsXG4gICAgbWl4aW5EaXNhYmxlZCxcbiAgICBtaXhpblRhYkluZGV4LFxuICAgIHRvQm9vbGVhblxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cbmltcG9ydCB7IE1DX0NIRUNLQk9YX0NMSUNLX0FDVElPTiwgTWNDaGVja2JveENsaWNrQWN0aW9uIH0gZnJvbSAnLi9jaGVja2JveC1jb25maWcnO1xuXG5cbi8vIEluY3JlYXNpbmcgaW50ZWdlciBmb3IgZ2VuZXJhdGluZyB1bmlxdWUgaWRzIGZvciBjaGVja2JveCBjb21wb25lbnRzLlxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKlxuICogUHJvdmlkZXIgRXhwcmVzc2lvbiB0aGF0IGFsbG93cyBtYy1jaGVja2JveCB0byByZWdpc3RlciBhcyBhIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICogVGhpcyBhbGxvd3MgaXQgdG8gc3VwcG9ydCBbKG5nTW9kZWwpXS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IE1DX0NIRUNLQk9YX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNY0NoZWNrYm94KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBkaWZmZXJlbnQgc3RhdGVzIHRoYXQgcmVxdWlyZSBjdXN0b20gdHJhbnNpdGlvbnMgYmV0d2VlbiB0aGVtLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZW51bSBUcmFuc2l0aW9uQ2hlY2tTdGF0ZSB7XG4gICAgLyoqIFRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSBjb21wb25lbnQgYmVmb3JlIGFueSB1c2VyIGludGVyYWN0aW9uLiAqL1xuICAgIEluaXQsXG4gICAgLyoqIFRoZSBzdGF0ZSByZXByZXNlbnRpbmcgdGhlIGNvbXBvbmVudCB3aGVuIGl0J3MgYmVjb21pbmcgY2hlY2tlZC4gKi9cbiAgICBDaGVja2VkLFxuICAgIC8qKiBUaGUgc3RhdGUgcmVwcmVzZW50aW5nIHRoZSBjb21wb25lbnQgd2hlbiBpdCdzIGJlY29taW5nIHVuY2hlY2tlZC4gKi9cbiAgICBVbmNoZWNrZWQsXG4gICAgLyoqIFRoZSBzdGF0ZSByZXByZXNlbnRpbmcgdGhlIGNvbXBvbmVudCB3aGVuIGl0J3MgYmVjb21pbmcgaW5kZXRlcm1pbmF0ZS4gKi9cbiAgICBJbmRldGVybWluYXRlXG59XG5cbi8qKiBDaGFuZ2UgZXZlbnQgb2JqZWN0IGVtaXR0ZWQgYnkgTWNDaGVja2JveC4gKi9cbmV4cG9ydCBjbGFzcyBNY0NoZWNrYm94Q2hhbmdlIHtcbiAgICAvKiogVGhlIHNvdXJjZSBNY0NoZWNrYm94IG9mIHRoZSBldmVudC4gKi9cbiAgICBzb3VyY2U6IE1jQ2hlY2tib3g7XG4gICAgLyoqIFRoZSBuZXcgYGNoZWNrZWRgIHZhbHVlIG9mIHRoZSBjaGVja2JveC4gKi9cbiAgICBjaGVja2VkOiBib29sZWFuO1xufVxuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1jQ2hlY2tib3guXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNsYXNzIE1jQ2hlY2tib3hCYXNlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jQ2hlY2tib3hNaXhpbkJhc2U6XG4gICAgSGFzVGFiSW5kZXhDdG9yICZcbiAgICBDYW5Db2xvckN0b3IgJlxuICAgIENhbkRpc2FibGVDdG9yICZcbiAgICB0eXBlb2YgTWNDaGVja2JveEJhc2UgPSBtaXhpblRhYkluZGV4KG1peGluQ29sb3IobWl4aW5EaXNhYmxlZChNY0NoZWNrYm94QmFzZSkpKTtcblxuXG4vKipcbiAqIEEgbW9zYWljIGNoZWNrYm94IGNvbXBvbmVudC4gU3VwcG9ydHMgYWxsIG9mIHRoZSBmdW5jdGlvbmFsaXR5IG9mIGFuIEhUTUw1IGNoZWNrYm94LFxuICogYW5kIGV4cG9zZXMgYSBzaW1pbGFyIEFQSS4gQSBNY0NoZWNrYm94IGNhbiBiZSBlaXRoZXIgY2hlY2tlZCwgdW5jaGVja2VkLCBpbmRldGVybWluYXRlLCBvclxuICogZGlzYWJsZWQuIE5vdGUgdGhhdCBhbGwgYWRkaXRpb25hbCBhY2Nlc3NpYmlsaXR5IGF0dHJpYnV0ZXMgYXJlIHRha2VuIGNhcmUgb2YgYnkgdGhlIGNvbXBvbmVudCxcbiAqIHNvIHRoZXJlIGlzIG5vIG5lZWQgdG8gcHJvdmlkZSB0aGVtIHlvdXJzZWxmLiBIb3dldmVyLCBpZiB5b3Ugd2FudCB0byBvbWl0IGEgbGFiZWwgYW5kIHN0aWxsXG4gKiBoYXZlIHRoZSBjaGVja2JveCBiZSBhY2Nlc3NpYmxlLCB5b3UgbWF5IHN1cHBseSBhbiBbYXJpYS1sYWJlbF0gaW5wdXQuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtY2hlY2tib3gnLFxuICAgIGV4cG9ydEFzOiAnbWNDaGVja2JveCcsXG4gICAgdGVtcGxhdGVVcmw6ICdjaGVja2JveC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnY2hlY2tib3guc2NzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1jaGVja2JveCcsXG4gICAgICAgICdbaWRdJzogJ2lkJyxcbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCcsXG4gICAgICAgICdbY2xhc3MubWMtaW5kZXRlcm1pbmF0ZV0nOiAnaW5kZXRlcm1pbmF0ZScsXG4gICAgICAgICdbY2xhc3MubWMtY2hlY2tlZF0nOiAnY2hlY2tlZCcsXG4gICAgICAgICdbY2xhc3MubWMtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1jaGVja2JveC1sYWJlbC1iZWZvcmVdJzogJ2xhYmVsUG9zaXRpb24gPT0gXCJiZWZvcmVcIidcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW01DX0NIRUNLQk9YX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGlucHV0czogWydjb2xvcicsICd0YWJJbmRleCddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWNDaGVja2JveCBleHRlbmRzIE1jQ2hlY2tib3hNaXhpbkJhc2UgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgICBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIENhbkNvbG9yLCBDYW5EaXNhYmxlLCBIYXNUYWJJbmRleCB7XG5cbiAgICAvKipcbiAgICAgKiBBdHRhY2hlZCB0byB0aGUgYXJpYS1sYWJlbCBhdHRyaWJ1dGUgb2YgdGhlIGhvc3QgZWxlbWVudC4gSW4gbW9zdCBjYXNlcywgYXJpYWwtbGFiZWxsZWRieSB3aWxsXG4gICAgICogdGFrZSBwcmVjZWRlbmNlIHNvIHRoaXMgbWF5IGJlIG9taXR0ZWQuXG4gICAgICovXG4gICAgQElucHV0KCdhcmlhLWxhYmVsJykgYXJpYUxhYmVsOiBzdHJpbmcgPSAnJztcblxuICAgIC8qKlxuICAgICAqIFVzZXJzIGNhbiBzcGVjaWZ5IHRoZSBgYXJpYS1sYWJlbGxlZGJ5YCBhdHRyaWJ1dGUgd2hpY2ggd2lsbCBiZSBmb3J3YXJkZWQgdG8gdGhlIGlucHV0IGVsZW1lbnRcbiAgICAgKi9cbiAgICBASW5wdXQoJ2FyaWEtbGFiZWxsZWRieScpIGFyaWFMYWJlbGxlZGJ5OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgIC8qKiBBIHVuaXF1ZSBpZCBmb3IgdGhlIGNoZWNrYm94IGlucHV0LiBJZiBub25lIGlzIHN1cHBsaWVkLCBpdCB3aWxsIGJlIGF1dG8tZ2VuZXJhdGVkLiAqL1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgICAvKiogV2hldGhlciB0aGUgbGFiZWwgc2hvdWxkIGFwcGVhciBhZnRlciBvciBiZWZvcmUgdGhlIGNoZWNrYm94LiBEZWZhdWx0cyB0byAnYWZ0ZXInICovXG4gICAgQElucHV0KCkgbGFiZWxQb3NpdGlvbjogJ2JlZm9yZScgfCAnYWZ0ZXInID0gJ2FmdGVyJztcblxuICAgIC8qKiBOYW1lIHZhbHVlIHdpbGwgYmUgYXBwbGllZCB0byB0aGUgaW5wdXQgZWxlbWVudCBpZiBwcmVzZW50ICovXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBjaGVja2JveCdzIGBjaGVja2VkYCB2YWx1ZSBjaGFuZ2VzLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxNY0NoZWNrYm94Q2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWNDaGVja2JveENoYW5nZT4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGNoZWNrYm94J3MgYGluZGV0ZXJtaW5hdGVgIHZhbHVlIGNoYW5nZXMuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGluZGV0ZXJtaW5hdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIC8qKiBUaGUgdmFsdWUgYXR0cmlidXRlIG9mIHRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudCAqL1xuICAgIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmc7XG5cbiAgICAvKiogVGhlIG5hdGl2ZSBgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiPmAgZWxlbWVudCAqL1xuICAgIEBWaWV3Q2hpbGQoJ2lucHV0JywgeyBzdGF0aWM6IGZhbHNlIH0pIGlucHV0RWxlbWVudDogRWxlbWVudFJlZjtcblxuICAgIC8qKiBSZXR1cm5zIHRoZSB1bmlxdWUgaWQgZm9yIHRoZSB2aXN1YWwgaGlkZGVuIGlucHV0LiAqL1xuICAgIGdldCBpbnB1dElkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmlkIHx8IHRoaXMudW5pcXVlSWR9LWlucHV0YDtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgY2hlY2tib3ggaXMgcmVxdWlyZWQuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXF1aXJlZDtcbiAgICB9XG5cbiAgICBzZXQgcmVxdWlyZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fcmVxdWlyZWQgPSB0b0Jvb2xlYW4odmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlcXVpcmVkOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgY2hlY2tib3ggaXMgY2hlY2tlZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBjaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hlY2tlZDtcbiAgICB9XG5cbiAgICBzZXQgY2hlY2tlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tlZCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9jaGVja2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBjaGVja2JveCBpcyBkaXNhYmxlZC4gVGhpcyBmdWxseSBvdmVycmlkZXMgdGhlIGltcGxlbWVudGF0aW9uIHByb3ZpZGVkIGJ5XG4gICAgICogbWl4aW5EaXNhYmxlZCwgYnV0IHRoZSBtaXhpbiBpcyBzdGlsbCByZXF1aXJlZCBiZWNhdXNlIG1peGluVGFiSW5kZXggcmVxdWlyZXMgaXQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGFueSkge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBjaGVja2JveCBpcyBpbmRldGVybWluYXRlLiBUaGlzIGlzIGFsc28ga25vd24gYXMgXCJtaXhlZFwiIG1vZGUgYW5kIGNhbiBiZSB1c2VkIHRvXG4gICAgICogcmVwcmVzZW50IGEgY2hlY2tib3ggd2l0aCB0aHJlZSBzdGF0ZXMsIGUuZy4gYSBjaGVja2JveCB0aGF0IHJlcHJlc2VudHMgYSBuZXN0ZWQgbGlzdCBvZlxuICAgICAqIGNoZWNrYWJsZSBpdGVtcy4gTm90ZSB0aGF0IHdoZW5ldmVyIGNoZWNrYm94IGlzIG1hbnVhbGx5IGNsaWNrZWQsIGluZGV0ZXJtaW5hdGUgaXMgaW1tZWRpYXRlbHlcbiAgICAgKiBzZXQgdG8gZmFsc2UuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgaW5kZXRlcm1pbmF0ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luZGV0ZXJtaW5hdGU7XG4gICAgfVxuXG4gICAgc2V0IGluZGV0ZXJtaW5hdGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgY2hhbmdlZCA9IHZhbHVlICE9PSB0aGlzLl9pbmRldGVybWluYXRlO1xuICAgICAgICB0aGlzLl9pbmRldGVybWluYXRlID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbmRldGVybWluYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uQ2hlY2tTdGF0ZShUcmFuc2l0aW9uQ2hlY2tTdGF0ZS5JbmRldGVybWluYXRlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uQ2hlY2tTdGF0ZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkID8gVHJhbnNpdGlvbkNoZWNrU3RhdGUuQ2hlY2tlZCA6IFRyYW5zaXRpb25DaGVja1N0YXRlLlVuY2hlY2tlZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaW5kZXRlcm1pbmF0ZUNoYW5nZS5lbWl0KHRoaXMuX2luZGV0ZXJtaW5hdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5kZXRlcm1pbmF0ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSB1bmlxdWVJZDogc3RyaW5nID0gYG1jLWNoZWNrYm94LSR7KytuZXh0VW5pcXVlSWR9YDtcblxuICAgIHByaXZhdGUgY3VycmVudEFuaW1hdGlvbkNsYXNzOiBzdHJpbmcgPSAnJztcblxuICAgIHByaXZhdGUgY3VycmVudENoZWNrU3RhdGU6IFRyYW5zaXRpb25DaGVja1N0YXRlID0gVHJhbnNpdGlvbkNoZWNrU3RhdGUuSW5pdDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1DX0NIRUNLQk9YX0NMSUNLX0FDVElPTilcbiAgICAgICAgcHJpdmF0ZSBfY2xpY2tBY3Rpb246IE1jQ2hlY2tib3hDbGlja0FjdGlvblxuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgICAgICB0aGlzLmlkID0gdGhpcy51bmlxdWVJZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgY2hlY2tib3ggaXMgYmx1cnJlZC4gTmVlZGVkIHRvIHByb3Blcmx5IGltcGxlbWVudCBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5XG4gICAgb25Ub3VjaGVkOiAoKSA9PiBhbnkgPSAoKSA9PiB7fTtcblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5fZm9jdXNNb25pdG9yXG4gICAgICAgICAgICAubW9uaXRvcih0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50KVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZm9jdXNPcmlnaW4pID0+IHRoaXMub25JbnB1dEZvY3VzQ2hhbmdlKGZvY3VzT3JpZ2luKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICAvKiogTWV0aG9kIGJlaW5nIGNhbGxlZCB3aGVuZXZlciB0aGUgbGFiZWwgdGV4dCBjaGFuZ2VzLiAqL1xuICAgIG9uTGFiZWxUZXh0Q2hhbmdlKCkge1xuICAgICAgICAvLyBUaGlzIG1ldGhvZCBpcyBnZXR0aW5nIGNhbGxlZCB3aGVuZXZlciB0aGUgbGFiZWwgb2YgdGhlIGNoZWNrYm94IGNoYW5nZXMuXG4gICAgICAgIC8vIFNpbmNlIHRoZSBjaGVja2JveCB1c2VzIHRoZSBPblB1c2ggc3RyYXRlZ3kgd2UgbmVlZCB0byBub3RpZnkgaXQgYWJvdXQgdGhlIGNoYW5nZVxuICAgICAgICAvLyB0aGF0IGhhcyBiZWVuIHJlY29nbml6ZWQgYnkgdGhlIGNka09ic2VydmVDb250ZW50IGRpcmVjdGl2ZS5cbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gISF2YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMuY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbiA9IGZuO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIGdldEFyaWFDaGVja2VkKCk6ICd0cnVlJyB8ICdmYWxzZScgfCAnbWl4ZWQnIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tlZCA/ICd0cnVlJyA6ICh0aGlzLmluZGV0ZXJtaW5hdGUgPyAnbWl4ZWQnIDogJ2ZhbHNlJyk7XG4gICAgfVxuXG4gICAgLyoqIFRvZ2dsZXMgdGhlIGBjaGVja2VkYCBzdGF0ZSBvZiB0aGUgY2hlY2tib3guICovXG4gICAgdG9nZ2xlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGhhbmRsZXIgZm9yIGNoZWNrYm94IGlucHV0IGVsZW1lbnQuXG4gICAgICogVG9nZ2xlcyBjaGVja2VkIHN0YXRlIGlmIGVsZW1lbnQgaXMgbm90IGRpc2FibGVkLlxuICAgICAqIERvIG5vdCB0b2dnbGUgb24gKGNoYW5nZSkgZXZlbnQgc2luY2UgSUUgZG9lc24ndCBmaXJlIGNoYW5nZSBldmVudCB3aGVuXG4gICAgICogICBpbmRldGVybWluYXRlIGNoZWNrYm94IGlzIGNsaWNrZWQuXG4gICAgICogQHBhcmFtIGV2ZW50IElucHV0IGNsaWNrIGV2ZW50XG4gICAgICovXG4gICAgb25JbnB1dENsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICAvLyBXZSBoYXZlIHRvIHN0b3AgcHJvcGFnYXRpb24gZm9yIGNsaWNrIGV2ZW50cyBvbiB0aGUgdmlzdWFsIGhpZGRlbiBpbnB1dCBlbGVtZW50LlxuICAgICAgICAvLyBCeSBkZWZhdWx0LCB3aGVuIGEgdXNlciBjbGlja3Mgb24gYSBsYWJlbCBlbGVtZW50LCBhIGdlbmVyYXRlZCBjbGljayBldmVudCB3aWxsIGJlXG4gICAgICAgIC8vIGRpc3BhdGNoZWQgb24gdGhlIGFzc29jaWF0ZWQgaW5wdXQgZWxlbWVudC4gU2luY2Ugd2UgYXJlIHVzaW5nIGEgbGFiZWwgZWxlbWVudCBhcyBvdXJcbiAgICAgICAgLy8gcm9vdCBjb250YWluZXIsIHRoZSBjbGljayBldmVudCBvbiB0aGUgYGNoZWNrYm94YCB3aWxsIGJlIGV4ZWN1dGVkIHR3aWNlLlxuICAgICAgICAvLyBUaGUgcmVhbCBjbGljayBldmVudCB3aWxsIGJ1YmJsZSB1cCwgYW5kIHRoZSBnZW5lcmF0ZWQgY2xpY2sgZXZlbnQgYWxzbyB0cmllcyB0byBidWJibGUgdXAuXG4gICAgICAgIC8vIFRoaXMgd2lsbCBsZWFkIHRvIG11bHRpcGxlIGNsaWNrIGV2ZW50cy5cbiAgICAgICAgLy8gUHJldmVudGluZyBidWJibGluZyBmb3IgdGhlIHNlY29uZCBldmVudCB3aWxsIHNvbHZlIHRoYXQgaXNzdWUuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIC8vIElmIHJlc2V0SW5kZXRlcm1pbmF0ZSBpcyBmYWxzZSwgYW5kIHRoZSBjdXJyZW50IHN0YXRlIGlzIGluZGV0ZXJtaW5hdGUsIGRvIG5vdGhpbmcgb24gY2xpY2tcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkICYmIHRoaXMuX2NsaWNrQWN0aW9uICE9PSAnbm9vcCcpIHtcbiAgICAgICAgICAgIC8vIFdoZW4gdXNlciBtYW51YWxseSBjbGljayBvbiB0aGUgY2hlY2tib3gsIGBpbmRldGVybWluYXRlYCBpcyBzZXQgdG8gZmFsc2UuXG4gICAgICAgICAgICBpZiAodGhpcy5pbmRldGVybWluYXRlICYmIHRoaXMuX2NsaWNrQWN0aW9uICE9PSAnY2hlY2snKSB7XG5cbiAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV0ZXJtaW5hdGVDaGFuZ2UuZW1pdCh0aGlzLl9pbmRldGVybWluYXRlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkNoZWNrU3RhdGUoXG4gICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tlZCA/IFRyYW5zaXRpb25DaGVja1N0YXRlLkNoZWNrZWQgOiBUcmFuc2l0aW9uQ2hlY2tTdGF0ZS5VbmNoZWNrZWQpO1xuXG4gICAgICAgICAgICAvLyBFbWl0IG91ciBjdXN0b20gY2hhbmdlIGV2ZW50IGlmIHRoZSBuYXRpdmUgaW5wdXQgZW1pdHRlZCBvbmUuXG4gICAgICAgICAgICAvLyBJdCBpcyBpbXBvcnRhbnQgdG8gb25seSBlbWl0IGl0LCBpZiB0aGUgbmF0aXZlIGlucHV0IHRyaWdnZXJlZCBvbmUsIGJlY2F1c2VcbiAgICAgICAgICAgIC8vIHdlIGRvbid0IHdhbnQgdG8gdHJpZ2dlciBhIGNoYW5nZSBldmVudCwgd2hlbiB0aGUgYGNoZWNrZWRgIHZhcmlhYmxlIGNoYW5nZXMgZm9yIGV4YW1wbGUuXG4gICAgICAgICAgICB0aGlzLmVtaXRDaGFuZ2VFdmVudCgpO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmRpc2FibGVkICYmIHRoaXMuX2NsaWNrQWN0aW9uID09PSAnbm9vcCcpIHtcbiAgICAgICAgICAgIC8vIFJlc2V0IG5hdGl2ZSBpbnB1dCB3aGVuIGNsaWNrZWQgd2l0aCBub29wLiBUaGUgbmF0aXZlIGNoZWNrYm94IGJlY29tZXMgY2hlY2tlZCBhZnRlclxuICAgICAgICAgICAgLy8gY2xpY2ssIHJlc2V0IGl0IHRvIGJlIGFsaWduIHdpdGggYGNoZWNrZWRgIHZhbHVlIG9mIGBtYy1jaGVja2JveGAuXG4gICAgICAgICAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmNoZWNrZWQgPSB0aGlzLmNoZWNrZWQ7XG4gICAgICAgICAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmluZGV0ZXJtaW5hdGUgPSB0aGlzLmluZGV0ZXJtaW5hdGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRm9jdXNlcyB0aGUgY2hlY2tib3guICovXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5mb2N1c1ZpYSh0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LCAna2V5Ym9hcmQnKTtcbiAgICB9XG5cbiAgICBvbkludGVyYWN0aW9uRXZlbnQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIC8vIFdlIGFsd2F5cyBoYXZlIHRvIHN0b3AgcHJvcGFnYXRpb24gb24gdGhlIGNoYW5nZSBldmVudC5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIHRoZSBjaGFuZ2UgZXZlbnQsIGZyb20gdGhlIGlucHV0IGVsZW1lbnQsIHdpbGwgYnViYmxlIHVwIGFuZFxuICAgICAgICAvLyBlbWl0IGl0cyBldmVudCBvYmplY3QgdG8gdGhlIGBjaGFuZ2VgIG91dHB1dC5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eVxuICAgIHByaXZhdGUgY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbjogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAgIHByaXZhdGUgdHJhbnNpdGlvbkNoZWNrU3RhdGUobmV3U3RhdGU6IFRyYW5zaXRpb25DaGVja1N0YXRlKSB7XG4gICAgICAgIGNvbnN0IG9sZFN0YXRlID0gdGhpcy5jdXJyZW50Q2hlY2tTdGF0ZTtcbiAgICAgICAgY29uc3QgZWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKG9sZFN0YXRlID09PSBuZXdTdGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRBbmltYXRpb25DbGFzcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jdXJyZW50QW5pbWF0aW9uQ2xhc3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdXJyZW50Q2hlY2tTdGF0ZSA9IG5ld1N0YXRlO1xuXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRBbmltYXRpb25DbGFzcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jdXJyZW50QW5pbWF0aW9uQ2xhc3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbWl0Q2hhbmdlRXZlbnQoKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IE1jQ2hlY2tib3hDaGFuZ2UoKTtcbiAgICAgICAgZXZlbnQuc291cmNlID0gdGhpcztcbiAgICAgICAgZXZlbnQuY2hlY2tlZCA9IHRoaXMuY2hlY2tlZDtcblxuICAgICAgICB0aGlzLmNvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4odGhpcy5jaGVja2VkKTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgLyoqIEZ1bmN0aW9uIGlzIGNhbGxlZCB3aGVuZXZlciB0aGUgZm9jdXMgY2hhbmdlcyBmb3IgdGhlIGlucHV0IGVsZW1lbnQuICovXG4gICAgcHJpdmF0ZSBvbklucHV0Rm9jdXNDaGFuZ2UoZm9jdXNPcmlnaW46IEZvY3VzT3JpZ2luKSB7XG4gICAgICAgIGlmIChmb2N1c09yaWdpbikge1xuICAgICAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIjxsYWJlbCBbYXR0ci5mb3JdPVwiaW5wdXRJZFwiIGNsYXNzPVwibWMtY2hlY2tib3gtbGF5b3V0XCIgI2xhYmVsPlxuICAgIDxkaXYgY2xhc3M9XCJtYy1jaGVja2JveC1pbm5lci1jb250YWluZXJcIlxuICAgICAgICAgW2NsYXNzLm1jLWNoZWNrYm94LWlubmVyLWNvbnRhaW5lci1uby1zaWRlLW1hcmdpbl09XCIhY2hlY2tib3hMYWJlbC50ZXh0Q29udGVudCB8fCAhY2hlY2tib3hMYWJlbC50ZXh0Q29udGVudC50cmltKClcIj5cbiAgICAgICAgPGlucHV0ICNpbnB1dFxuICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgIGNsYXNzPVwibWMtY2hlY2tib3gtaW5wdXQgY2RrLXZpc3VhbGx5LWhpZGRlblwiXG4gICAgICAgICAgICAgICBbaWRdPVwiaW5wdXRJZFwiXG4gICAgICAgICAgICAgICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgW2NoZWNrZWRdPVwiY2hlY2tlZFwiXG4gICAgICAgICAgICAgICBbYXR0ci52YWx1ZV09XCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgW2F0dHIubmFtZV09XCJuYW1lXCJcbiAgICAgICAgICAgICAgIFt0YWJJbmRleF09XCJ0YWJJbmRleFwiXG4gICAgICAgICAgICAgICBbaW5kZXRlcm1pbmF0ZV09XCJpbmRldGVybWluYXRlXCJcbiAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsIHx8IG51bGxcIlxuICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImFyaWFMYWJlbGxlZGJ5XCJcbiAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY2hlY2tlZF09XCJnZXRBcmlhQ2hlY2tlZCgpXCJcbiAgICAgICAgICAgICAgIChjaGFuZ2UpPVwib25JbnRlcmFjdGlvbkV2ZW50KCRldmVudClcIlxuICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uSW5wdXRDbGljaygkZXZlbnQpXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYy1jaGVja2JveC1mcmFtZVwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJtYy1jaGVja2JveC1jaGVja21hcmsgbWMgbWMtY2hlY2tfMTZcIj48L2k+XG4gICAgICAgICAgICA8aSBjbGFzcz1cIm1jLWNoZWNrYm94LW1peGVkbWFyayBtYyBtYy1taW51c18xNlwiPjwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8c3BhbiBjbGFzcz1cIm1jLWNoZWNrYm94LWxhYmVsXCIgI2NoZWNrYm94TGFiZWwgKGNka09ic2VydmVDb250ZW50KT1cIm9uTGFiZWxUZXh0Q2hhbmdlKClcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvc3Bhbj5cbjwvbGFiZWw+XG4iXX0=