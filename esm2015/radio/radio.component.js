import { FocusMonitor } from '@angular/cdk/a11y';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Input, Optional, Output, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { mixinColor, mixinDisabled, mixinTabIndex, toBoolean } from '@ptsecurity/mosaic/core';
// Increasing integer for generating unique ids for radio components.
let nextUniqueId = 0;
/** Change event object emitted by McRadio. */
export class McRadioChange {
    constructor(
    /** The McRadioButton that emits the change event. */
    source, 
    /** The value of the McRadioButton. */
    value) {
        this.source = source;
        this.value = value;
    }
}
// Boilerplate for applying mixins to McRadioGroup.
/** @docs-private */
export class McRadioGroupBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
export const McRadioGroupMixinBase = mixinDisabled(McRadioGroupBase);
/**
 * Provider Expression that allows mc-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
export const MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => McRadioGroup),
    multi: true
};
export class McRadioGroup extends McRadioGroupMixinBase {
    constructor(elementRef, _changeDetector) {
        super(elementRef);
        this._changeDetector = _changeDetector;
        /**
         * Event emitted when the group value changes.
         * Change events are only emitted when the value changes due to user interaction with
         * a radio button (the same behavior as `<input type-"radio">`).
         */
        this.change = new EventEmitter();
        /**
         * Selected value for group. Should equal the value of the selected radio button if there *is*
         * a corresponding radio button with a matching value. If there is *not* such a corresponding
         * radio button, this value persists to be applied in case a new radio button is added with a
         * matching value.
         */
        this._value = null;
        /** The HTML name attribute applied to radio buttons in this group. */
        this._name = `mc-radio-group-${nextUniqueId++}`;
        /** The currently selected radio button. Should match value. */
        this._selected = null;
        /** Whether the `value` has been set to its initial value. */
        this.isInitialized = false;
        /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
        this._labelPosition = 'after';
        /** Whether the radio group is disabled. */
        this._disabled = false;
        /** Whether the radio group is required. */
        this._required = false;
        /** The method to be called in order to update ngModel */
        // tslint:disable-next-line
        this.controlValueAccessorChangeFn = () => { };
        /**
         * onTouch function registered via registerOnTouch (ControlValueAccessor).
         * @docs-private
         */
        // tslint:disable-next-line
        this.onTouched = () => { };
    }
    /** Name of the radio button group. All radio buttons inside this group will use this name. */
    get name() { return this._name; }
    set name(value) {
        this._name = value;
        this.updateRadioButtonNames();
    }
    /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
    get labelPosition() {
        return this._labelPosition;
    }
    set labelPosition(v) {
        this._labelPosition = v === 'before' ? 'before' : 'after';
        this.markRadiosForCheck();
    }
    /** Value of the radio button. */
    get value() { return this._value; }
    set value(newValue) {
        if (this._value !== newValue) {
            // Set this before proceeding to ensure no circular loop occurs with selection.
            this._value = newValue;
            this.updateSelectedRadioFromValue();
            this.checkSelectedRadioButton();
        }
    }
    /** Whether the radio button is selected. */
    get selected() { return this._selected; }
    set selected(selected) {
        this._selected = selected;
        this.value = selected ? selected.value : null;
        this.checkSelectedRadioButton();
    }
    /** Whether the radio group is disabled */
    get disabled() { return this._disabled; }
    set disabled(value) {
        this._disabled = toBoolean(value);
        this.markRadiosForCheck();
    }
    /** Whether the radio group is required */
    get required() { return this._required; }
    set required(value) {
        this._required = toBoolean(value);
        this.markRadiosForCheck();
    }
    checkSelectedRadioButton() {
        if (this._selected && !this._selected.checked) {
            this._selected.checked = true;
        }
    }
    /**
     * Initialize properties once content children are available.
     * This allows us to propagate relevant attributes to associated buttons.
     */
    ngAfterContentInit() {
        // Mark this component as initialized in AfterContentInit because the initial value can
        // possibly be set by NgModel on McRadioGroup, and it is possible that the OnInit of the
        // NgModel occurs *after* the OnInit of the McRadioGroup.
        this.isInitialized = true;
    }
    /**
     * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
     * radio buttons upon their blur.
     */
    touch() {
        if (this.onTouched) {
            this.onTouched();
        }
    }
    /** Dispatch change event with current selection and group value. */
    emitChangeEvent() {
        if (this.isInitialized) {
            this.change.emit(new McRadioChange(this._selected, this._value));
        }
    }
    markRadiosForCheck() {
        if (this.radios) {
            this.radios.forEach((radio) => radio.markForCheck());
        }
    }
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     */
    writeValue(value) {
        this.value = value;
        this._changeDetector.markForCheck();
    }
    /**
     * Registers a callback to be triggered when the model value changes.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    registerOnChange(fn) {
        this.controlValueAccessorChangeFn = fn;
    }
    /**
     * Registers a callback to be triggered when the control is touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
     * @param isDisabled Whether the control should be disabled.
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this._changeDetector.markForCheck();
    }
    updateRadioButtonNames() {
        if (this.radios) {
            this.radios.forEach((radio) => {
                radio.name = this.name;
            });
        }
    }
    /** Updates the `selected` radio button from the internal _value state. */
    updateSelectedRadioFromValue() {
        // If the value already matches the selected radio, do nothing.
        const isAlreadySelected = this._selected !== null && this._selected.value === this._value;
        if (this.radios != null && !isAlreadySelected) {
            this._selected = null;
            this.radios.forEach((radio) => {
                radio.checked = this.value === radio.value;
                if (radio.checked) {
                    this._selected = radio;
                }
            });
        }
    }
}
McRadioGroup.decorators = [
    { type: Directive, args: [{
                selector: 'mc-radio-group',
                exportAs: 'mcRadioGroup',
                host: {
                    role: 'radiogroup',
                    class: 'mc-radio-group'
                },
                providers: [MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR]
            },] }
];
/** @nocollapse */
McRadioGroup.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
McRadioGroup.propDecorators = {
    name: [{ type: Input }],
    labelPosition: [{ type: Input }],
    value: [{ type: Input }],
    selected: [{ type: Input }],
    disabled: [{ type: Input }],
    required: [{ type: Input }],
    change: [{ type: Output }],
    radios: [{ type: ContentChildren, args: [forwardRef(() => McRadioButton), { descendants: true },] }]
};
// Boilerplate for applying mixins to McRadioButton.
/** @docs-private */
// tslint:disable-next-line:naming-convention
class McRadioButtonBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
export const McRadioButtonMixinBase = mixinColor(mixinTabIndex(McRadioButtonBase));
export class McRadioButton extends McRadioButtonMixinBase {
    constructor(radioGroup, elementRef, _changeDetector, focusMonitor, _radioDispatcher) {
        super(elementRef);
        this._changeDetector = _changeDetector;
        this.focusMonitor = focusMonitor;
        this._radioDispatcher = _radioDispatcher;
        /**
         * Event emitted when the checked state of this radio button changes.
         * Change events are only emitted when the value changes due to user interaction with
         * the radio button (the same behavior as `<input type-"radio">`).
         */
        this.change = new EventEmitter();
        this.isFocused = false;
        /* tslint:disable:member-ordering */
        this.uniqueId = `mc-radio-${++nextUniqueId}`;
        /** Whether this radio is checked. */
        this._checked = false;
        /** Value assigned to this radio. */
        this._value = null;
        /** Unregister function for _radioDispatcher */
        // tslint:disable-next-line
        this.removeUniqueSelectionListener = () => { };
        this.id = this.uniqueId;
        this.radioGroup = radioGroup;
        this.removeUniqueSelectionListener =
            _radioDispatcher.listen((id, name) => {
                if (id !== this.id && name === this.name) {
                    this.checked = false;
                }
            });
    }
    /** Whether this radio button is checked. */
    get checked() { return this._checked; }
    set checked(value) {
        const newCheckedState = toBoolean(value);
        if (this._checked !== newCheckedState) {
            this._checked = newCheckedState;
            if (newCheckedState && this.radioGroup && this.radioGroup.value !== this.value) {
                this.radioGroup.selected = this;
            }
            else if (!newCheckedState && this.radioGroup && this.radioGroup.value === this.value) {
                // When unchecking the selected radio button, update the selected radio
                // property on the group.
                this.radioGroup.selected = null;
            }
            if (newCheckedState) {
                // Notify all radio buttons with the same name to un-check.
                this._radioDispatcher.notify(this.id, this.name);
            }
            this._changeDetector.markForCheck();
        }
    }
    /** The value of this radio button. */
    get value() { return this._value; }
    set value(value) {
        if (this._value !== value) {
            this._value = value;
            if (this.radioGroup != null) {
                if (!this.checked) {
                    // Update checked when the value changed to match the radio group's value
                    this.checked = this.radioGroup.value === value;
                }
                if (this.checked) {
                    this.radioGroup.selected = this;
                }
            }
        }
    }
    /** Whether the radio button is disabled. */
    get disabled() {
        return this._disabled || (this.radioGroup != null && this.radioGroup.disabled);
    }
    set disabled(value) {
        const newDisabledState = toBoolean(value);
        if (this._disabled !== newDisabledState) {
            this._disabled = newDisabledState;
            this._changeDetector.markForCheck();
        }
    }
    /** Whether the radio button is required. */
    get required() {
        return this._required || (this.radioGroup && this.radioGroup.required);
    }
    set required(value) {
        this._required = toBoolean(value);
    }
    /** Whether the label should appear after or before the radio button. Defaults to 'after' */
    get labelPosition() {
        return this._labelPosition || (this.radioGroup && this.radioGroup.labelPosition) || 'after';
    }
    set labelPosition(value) {
        this._labelPosition = value;
    }
    /** ID of the native input element inside `<mc-radio-button>` */
    get inputId() { return `${this.id || this.uniqueId}-input`; }
    ngOnInit() {
        if (this.radioGroup) {
            // If the radio is inside a radio group, determine if it should be checked
            this.checked = this.radioGroup.value === this._value;
            // Copy name from parent radio group
            this.name = this.radioGroup.name;
        }
    }
    ngAfterViewInit() {
        this.focusMonitor
            .monitor(this._elementRef, true)
            .subscribe((focusOrigin) => {
            if (!focusOrigin && this.radioGroup) {
                this.radioGroup.touch();
            }
        });
    }
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this._elementRef);
        this.removeUniqueSelectionListener();
    }
    /** Focuses the radio button. */
    focus() {
        this.inputElement.nativeElement.focus();
    }
    /**
     * Marks the radio button as needing checking for change detection.
     * This method is exposed because the parent radio group will directly
     * update bound properties of the radio button.
     */
    markForCheck() {
        // When group value changes, the button will not be notified. Use `markForCheck` to explicit
        // update radio button's status
        this._changeDetector.markForCheck();
    }
    onInputClick(event) {
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `radio-button` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
    }
    onInputChange(event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
        const groupValueChanged = this.radioGroup && this.value !== this.radioGroup.value;
        this.checked = true;
        this.emitChangeEvent();
        if (this.radioGroup) {
            this.radioGroup.controlValueAccessorChangeFn(this.value);
            this.radioGroup.touch();
            if (groupValueChanged) {
                this.radioGroup.emitChangeEvent();
            }
        }
    }
    /** Dispatch change event with current value. */
    emitChangeEvent() {
        this.change.emit(new McRadioChange(this, this._value));
    }
}
McRadioButton.decorators = [
    { type: Component, args: [{
                selector: 'mc-radio-button',
                template: "<label class=\"mc-radio-label\" [attr.for]=\"inputId\" #label>\n    <input type=\"radio\"\n           class=\"mc-radio-input cdk-visually-hidden\"\n           #input\n           [id]=\"inputId\"\n           [checked]=\"checked\"\n           [disabled]=\"disabled\"\n           [tabIndex]=\"tabIndex\"\n           [attr.name]=\"name\"\n           [required]=\"required\"\n           [attr.aria-label]=\"ariaLabel\"\n           [attr.aria-labelledby]=\"ariaLabelledby\"\n           [attr.aria-describedby]=\"ariaDescribedby\"\n           (change)=\"onInputChange($event)\"\n           (click)=\"onInputClick($event)\">\n\n    <div class=\"mc-radio-label-content\" [class.mc-radio-label-before]=\"labelPosition == 'before'\">\n        <div class=\"mc-radio-button__outer-circle\"></div>\n        <div class=\"mc-radio-button__inner-circle\"></div>\n        <ng-content></ng-content>\n    </div>\n</label>\n",
                inputs: ['color', 'tabIndex'],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                exportAs: 'mcRadioButton',
                host: {
                    class: 'mc-radio-button',
                    '[attr.id]': 'id',
                    '[class.mc-selected]': 'checked',
                    '[class.mc-disabled]': 'disabled'
                },
                styles: [".mc-radio-button{display:inline-block}.mc-radio-label{display:inline-flex;align-items:center;vertical-align:middle;cursor:pointer;white-space:nowrap;width:100%}.mc-radio-label-content{display:inline-block;position:relative;order:0;line-height:inherit;padding-left:var(--mc-radio-size-padding,8px);padding-right:0}.mc-radio-label-content .mc-radio-button__inner-circle,.mc-radio-label-content .mc-radio-button__outer-circle{box-sizing:content-box;position:absolute;content:\"\";border-style:solid;border-radius:50%}.mc-radio-label-content .mc-radio-button__outer-circle{left:0;top:calc(50% - 8px);width:var(--mc-radio-size-size,14px);height:var(--mc-radio-size-size,14px);border-width:1px}.mc-radio-label-content .mc-radio-button__inner-circle{display:none;left:1px;top:calc(50% - 7px);width:6px;height:6px;border-width:4px}[dir=rtl] .mc-radio-label-content{padding-right:var(--mc-radio-size-padding,8px);padding-left:0}.mc-radio-input{position:absolute;outline:none;opacity:0}"]
            },] }
];
/** @nocollapse */
McRadioButton.ctorParameters = () => [
    { type: McRadioGroup, decorators: [{ type: Optional }] },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: FocusMonitor },
    { type: UniqueSelectionDispatcher }
];
McRadioButton.propDecorators = {
    checked: [{ type: Input }],
    value: [{ type: Input }],
    disabled: [{ type: Input }],
    required: [{ type: Input }],
    labelPosition: [{ type: Input }],
    name: [{ type: Input }],
    ariaLabel: [{ type: Input, args: ['aria-label',] }],
    ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }],
    ariaDescribedby: [{ type: Input, args: ['aria-describedby',] }],
    inputElement: [{ type: ViewChild, args: ['input', { static: false },] }],
    change: [{ type: Output }],
    isFocused: [{ type: Input }],
    id: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3JhZGlvL3JhZGlvLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckUsT0FBTyxFQUdILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFPSCxVQUFVLEVBQ1YsYUFBYSxFQUNiLGFBQWEsRUFDYixTQUFTLEVBQ1osTUFBTSx5QkFBeUIsQ0FBQztBQUdqQyxxRUFBcUU7QUFDckUsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBRXJCLDhDQUE4QztBQUM5QyxNQUFNLE9BQU8sYUFBYTtJQUN0QjtJQUNJLHFEQUFxRDtJQUM5QyxNQUFxQjtJQUM1QixzQ0FBc0M7SUFDL0IsS0FBVTtRQUZWLFdBQU0sR0FBTixNQUFNLENBQWU7UUFFckIsVUFBSyxHQUFMLEtBQUssQ0FBSztJQUFHLENBQUM7Q0FDNUI7QUFFRCxtREFBbUQ7QUFDbkQsb0JBQW9CO0FBQ3BCLE1BQU0sT0FBTyxnQkFBZ0I7SUFDekIsNkNBQTZDO0lBQzdDLFlBQW1CLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lBQUcsQ0FBQztDQUNqRDtBQUNELDZDQUE2QztBQUM3QyxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBNkMs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QkFBcUIsRUFBRSxTQUFTO29CQUNoQyxxQkFBcUIsRUFBRSxVQUFVO2lCQUNwQzs7YUFDSjs7OztZQW9JK0IsWUFBWSx1QkFBbkMsUUFBUTtZQTViYixVQUFVO1lBSlYsaUJBQWlCO1lBTlosWUFBWTtZQUNaLHlCQUF5Qjs7O3NCQXNVN0IsS0FBSztvQkF5QkwsS0FBSzt1QkFrQkwsS0FBSzt1QkFlTCxLQUFLOzRCQVNMLEtBQUs7bUJBU0wsS0FBSzt3QkFHTCxLQUFLLFNBQUMsWUFBWTs2QkFHbEIsS0FBSyxTQUFDLGlCQUFpQjs4QkFHdkIsS0FBSyxTQUFDLGtCQUFrQjsyQkFHeEIsU0FBUyxTQUFDLE9BQU8sRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7cUJBT2xDLE1BQU07d0JBS04sS0FBSztpQkFJTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgVW5pcXVlU2VsZWN0aW9uRGlzcGF0Y2hlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICAgIENhbkNvbG9yLFxuICAgIENhbkNvbG9yQ3RvcixcbiAgICBDYW5EaXNhYmxlLFxuICAgIENhbkRpc2FibGVDdG9yLFxuICAgIEhhc1RhYkluZGV4LFxuICAgIEhhc1RhYkluZGV4Q3RvcixcbiAgICBtaXhpbkNvbG9yLFxuICAgIG1peGluRGlzYWJsZWQsXG4gICAgbWl4aW5UYWJJbmRleCxcbiAgICB0b0Jvb2xlYW5cbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5cbi8vIEluY3JlYXNpbmcgaW50ZWdlciBmb3IgZ2VuZXJhdGluZyB1bmlxdWUgaWRzIGZvciByYWRpbyBjb21wb25lbnRzLlxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKiBDaGFuZ2UgZXZlbnQgb2JqZWN0IGVtaXR0ZWQgYnkgTWNSYWRpby4gKi9cbmV4cG9ydCBjbGFzcyBNY1JhZGlvQ2hhbmdlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgLyoqIFRoZSBNY1JhZGlvQnV0dG9uIHRoYXQgZW1pdHMgdGhlIGNoYW5nZSBldmVudC4gKi9cbiAgICAgICAgcHVibGljIHNvdXJjZTogTWNSYWRpb0J1dHRvbixcbiAgICAgICAgLyoqIFRoZSB2YWx1ZSBvZiB0aGUgTWNSYWRpb0J1dHRvbi4gKi9cbiAgICAgICAgcHVibGljIHZhbHVlOiBhbnkpIHt9XG59XG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWNSYWRpb0dyb3VwLlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjbGFzcyBNY1JhZGlvR3JvdXBCYXNlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1JhZGlvR3JvdXBNaXhpbkJhc2U6IENhbkRpc2FibGVDdG9yICYgdHlwZW9mIE1jUmFkaW9Hcm91cEJhc2UgPSBtaXhpbkRpc2FibGVkKE1jUmFkaW9Hcm91cEJhc2UpO1xuXG4vKipcbiAqIFByb3ZpZGVyIEV4cHJlc3Npb24gdGhhdCBhbGxvd3MgbWMtcmFkaW8tZ3JvdXAgdG8gcmVnaXN0ZXIgYXMgYSBDb250cm9sVmFsdWVBY2Nlc3Nvci4gVGhpc1xuICogYWxsb3dzIGl0IHRvIHN1cHBvcnQgWyhuZ01vZGVsKV0gYW5kIG5nQ29udHJvbC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IE1DX1JBRElPX0dST1VQX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNY1JhZGlvR3JvdXApLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLXJhZGlvLWdyb3VwJyxcbiAgICBleHBvcnRBczogJ21jUmFkaW9Hcm91cCcsXG4gICAgaG9zdDoge1xuICAgICAgICByb2xlOiAncmFkaW9ncm91cCcsXG4gICAgICAgIGNsYXNzOiAnbWMtcmFkaW8tZ3JvdXAnXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtNQ19SQURJT19HUk9VUF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBNY1JhZGlvR3JvdXAgZXh0ZW5kcyBNY1JhZGlvR3JvdXBNaXhpbkJhc2VcbiAgICBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBDYW5EaXNhYmxlIHtcblxuICAgIC8qKiBOYW1lIG9mIHRoZSByYWRpbyBidXR0b24gZ3JvdXAuIEFsbCByYWRpbyBidXR0b25zIGluc2lkZSB0aGlzIGdyb3VwIHdpbGwgdXNlIHRoaXMgbmFtZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBuYW1lKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9uYW1lOyB9XG4gICAgc2V0IG5hbWUodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlUmFkaW9CdXR0b25OYW1lcygpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBsYWJlbHMgc2hvdWxkIGFwcGVhciBhZnRlciBvciBiZWZvcmUgdGhlIHJhZGlvLWJ1dHRvbnMuIERlZmF1bHRzIHRvICdhZnRlcicgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBsYWJlbFBvc2l0aW9uKCk6ICdiZWZvcmUnIHwgJ2FmdGVyJyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYWJlbFBvc2l0aW9uO1xuICAgIH1cbiAgICBzZXQgbGFiZWxQb3NpdGlvbih2KSB7XG4gICAgICAgIHRoaXMuX2xhYmVsUG9zaXRpb24gPSB2ID09PSAnYmVmb3JlJyA/ICdiZWZvcmUnIDogJ2FmdGVyJztcbiAgICAgICAgdGhpcy5tYXJrUmFkaW9zRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICAvKiogVmFsdWUgb2YgdGhlIHJhZGlvIGJ1dHRvbi4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpOiBhbnkgeyByZXR1cm4gdGhpcy5fdmFsdWU7IH1cbiAgICBzZXQgdmFsdWUobmV3VmFsdWU6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5fdmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAvLyBTZXQgdGhpcyBiZWZvcmUgcHJvY2VlZGluZyB0byBlbnN1cmUgbm8gY2lyY3VsYXIgbG9vcCBvY2N1cnMgd2l0aCBzZWxlY3Rpb24uXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbHVlO1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkUmFkaW9Gcm9tVmFsdWUoKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tTZWxlY3RlZFJhZGlvQnV0dG9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgcmFkaW8gYnV0dG9uIGlzIHNlbGVjdGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNlbGVjdGVkKCkgeyByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7IH1cbiAgICBzZXQgc2VsZWN0ZWQoc2VsZWN0ZWQ6IE1jUmFkaW9CdXR0b24gfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgICAgIHRoaXMudmFsdWUgPSBzZWxlY3RlZCA/IHNlbGVjdGVkLnZhbHVlIDogbnVsbDtcbiAgICAgICAgdGhpcy5jaGVja1NlbGVjdGVkUmFkaW9CdXR0b24oKTtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgcmFkaW8gZ3JvdXAgaXMgZGlzYWJsZWQgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9XG4gICAgc2V0IGRpc2FibGVkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgICAgICAgdGhpcy5tYXJrUmFkaW9zRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgcmFkaW8gZ3JvdXAgaXMgcmVxdWlyZWQgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3JlcXVpcmVkOyB9XG4gICAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlcXVpcmVkID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgICAgICAgdGhpcy5tYXJrUmFkaW9zRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGdyb3VwIHZhbHVlIGNoYW5nZXMuXG4gICAgICogQ2hhbmdlIGV2ZW50cyBhcmUgb25seSBlbWl0dGVkIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXMgZHVlIHRvIHVzZXIgaW50ZXJhY3Rpb24gd2l0aFxuICAgICAqIGEgcmFkaW8gYnV0dG9uICh0aGUgc2FtZSBiZWhhdmlvciBhcyBgPGlucHV0IHR5cGUtXCJyYWRpb1wiPmApLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxNY1JhZGlvQ2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWNSYWRpb0NoYW5nZT4oKTtcblxuICAgIC8qKiBDaGlsZCByYWRpbyBidXR0b25zLiAqL1xuICAgIEBDb250ZW50Q2hpbGRyZW4oZm9yd2FyZFJlZigoKSA9PiBNY1JhZGlvQnV0dG9uKSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICAgIHJhZGlvczogUXVlcnlMaXN0PE1jUmFkaW9CdXR0b24+O1xuXG4gICAgLyoqXG4gICAgICogU2VsZWN0ZWQgdmFsdWUgZm9yIGdyb3VwLiBTaG91bGQgZXF1YWwgdGhlIHZhbHVlIG9mIHRoZSBzZWxlY3RlZCByYWRpbyBidXR0b24gaWYgdGhlcmUgKmlzKlxuICAgICAqIGEgY29ycmVzcG9uZGluZyByYWRpbyBidXR0b24gd2l0aCBhIG1hdGNoaW5nIHZhbHVlLiBJZiB0aGVyZSBpcyAqbm90KiBzdWNoIGEgY29ycmVzcG9uZGluZ1xuICAgICAqIHJhZGlvIGJ1dHRvbiwgdGhpcyB2YWx1ZSBwZXJzaXN0cyB0byBiZSBhcHBsaWVkIGluIGNhc2UgYSBuZXcgcmFkaW8gYnV0dG9uIGlzIGFkZGVkIHdpdGggYVxuICAgICAqIG1hdGNoaW5nIHZhbHVlLlxuICAgICAqL1xuICAgIHByaXZhdGUgX3ZhbHVlOiBhbnkgPSBudWxsO1xuXG4gICAgLyoqIFRoZSBIVE1MIG5hbWUgYXR0cmlidXRlIGFwcGxpZWQgdG8gcmFkaW8gYnV0dG9ucyBpbiB0aGlzIGdyb3VwLiAqL1xuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZyA9IGBtYy1yYWRpby1ncm91cC0ke25leHRVbmlxdWVJZCsrfWA7XG5cbiAgICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCByYWRpbyBidXR0b24uIFNob3VsZCBtYXRjaCB2YWx1ZS4gKi9cbiAgICBwcml2YXRlIF9zZWxlY3RlZDogTWNSYWRpb0J1dHRvbiB8IG51bGwgPSBudWxsO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGB2YWx1ZWAgaGFzIGJlZW4gc2V0IHRvIGl0cyBpbml0aWFsIHZhbHVlLiAqL1xuICAgIHByaXZhdGUgaXNJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGxhYmVscyBzaG91bGQgYXBwZWFyIGFmdGVyIG9yIGJlZm9yZSB0aGUgcmFkaW8tYnV0dG9ucy4gRGVmYXVsdHMgdG8gJ2FmdGVyJyAqL1xuICAgIHByaXZhdGUgX2xhYmVsUG9zaXRpb246ICdiZWZvcmUnIHwgJ2FmdGVyJyA9ICdhZnRlcic7XG5cbiAgICAvKiogV2hldGhlciB0aGUgcmFkaW8gZ3JvdXAgaXMgZGlzYWJsZWQuICovXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSByYWRpbyBncm91cCBpcyByZXF1aXJlZC4gKi9cbiAgICBwcml2YXRlIF9yZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSByZWFkb25seSBfY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgbWV0aG9kIHRvIGJlIGNhbGxlZCBpbiBvcmRlciB0byB1cGRhdGUgbmdNb2RlbCAqL1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgIGNvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm46ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgICAvKipcbiAgICAgKiBvblRvdWNoIGZ1bmN0aW9uIHJlZ2lzdGVyZWQgdmlhIHJlZ2lzdGVyT25Ub3VjaCAoQ29udHJvbFZhbHVlQWNjZXNzb3IpLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICBvblRvdWNoZWQ6ICgpID0+IGFueSA9ICgpID0+IHt9O1xuXG4gICAgY2hlY2tTZWxlY3RlZFJhZGlvQnV0dG9uKCkge1xuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWQgJiYgIXRoaXMuX3NlbGVjdGVkLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBwcm9wZXJ0aWVzIG9uY2UgY29udGVudCBjaGlsZHJlbiBhcmUgYXZhaWxhYmxlLlxuICAgICAqIFRoaXMgYWxsb3dzIHVzIHRvIHByb3BhZ2F0ZSByZWxldmFudCBhdHRyaWJ1dGVzIHRvIGFzc29jaWF0ZWQgYnV0dG9ucy5cbiAgICAgKi9cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIC8vIE1hcmsgdGhpcyBjb21wb25lbnQgYXMgaW5pdGlhbGl6ZWQgaW4gQWZ0ZXJDb250ZW50SW5pdCBiZWNhdXNlIHRoZSBpbml0aWFsIHZhbHVlIGNhblxuICAgICAgICAvLyBwb3NzaWJseSBiZSBzZXQgYnkgTmdNb2RlbCBvbiBNY1JhZGlvR3JvdXAsIGFuZCBpdCBpcyBwb3NzaWJsZSB0aGF0IHRoZSBPbkluaXQgb2YgdGhlXG4gICAgICAgIC8vIE5nTW9kZWwgb2NjdXJzICphZnRlciogdGhlIE9uSW5pdCBvZiB0aGUgTWNSYWRpb0dyb3VwLlxuICAgICAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1hcmsgdGhpcyBncm91cCBhcyBiZWluZyBcInRvdWNoZWRcIiAoZm9yIG5nTW9kZWwpLiBNZWFudCB0byBiZSBjYWxsZWQgYnkgdGhlIGNvbnRhaW5lZFxuICAgICAqIHJhZGlvIGJ1dHRvbnMgdXBvbiB0aGVpciBibHVyLlxuICAgICAqL1xuICAgIHRvdWNoKCkge1xuICAgICAgICBpZiAodGhpcy5vblRvdWNoZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRGlzcGF0Y2ggY2hhbmdlIGV2ZW50IHdpdGggY3VycmVudCBzZWxlY3Rpb24gYW5kIGdyb3VwIHZhbHVlLiAqL1xuICAgIGVtaXRDaGFuZ2VFdmVudCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNJbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdChuZXcgTWNSYWRpb0NoYW5nZSh0aGlzLl9zZWxlY3RlZCEsIHRoaXMuX3ZhbHVlKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtYXJrUmFkaW9zRm9yQ2hlY2soKSB7XG4gICAgICAgIGlmICh0aGlzLnJhZGlvcykge1xuICAgICAgICAgICAgdGhpcy5yYWRpb3MuZm9yRWFjaCgocmFkaW8pID0+IHJhZGlvLm1hcmtGb3JDaGVjaygpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG1vZGVsIHZhbHVlLiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgICAqL1xuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIHRvIGJlIHRyaWdnZXJlZCB3aGVuIHRoZSBtb2RlbCB2YWx1ZSBjaGFuZ2VzLlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgICogQHBhcmFtIGZuIENhbGxiYWNrIHRvIGJlIHJlZ2lzdGVyZWQuXG4gICAgICovXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuID0gZm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgdG8gYmUgdHJpZ2dlcmVkIHdoZW4gdGhlIGNvbnRyb2wgaXMgdG91Y2hlZC5cbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgICAqIEBwYXJhbSBmbiBDYWxsYmFjayB0byBiZSByZWdpc3RlcmVkLlxuICAgICAqL1xuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBkaXNhYmxlZCBzdGF0ZSBvZiB0aGUgY29udHJvbC4gSW1wbGVtZW50ZWQgYXMgYSBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgICAqIEBwYXJhbSBpc0Rpc2FibGVkIFdoZXRoZXIgdGhlIGNvbnRyb2wgc2hvdWxkIGJlIGRpc2FibGVkLlxuICAgICAqL1xuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVSYWRpb0J1dHRvbk5hbWVzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5yYWRpb3MpIHtcbiAgICAgICAgICAgIHRoaXMucmFkaW9zLmZvckVhY2goKHJhZGlvKSA9PiB7XG4gICAgICAgICAgICAgICAgcmFkaW8ubmFtZSA9IHRoaXMubmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFVwZGF0ZXMgdGhlIGBzZWxlY3RlZGAgcmFkaW8gYnV0dG9uIGZyb20gdGhlIGludGVybmFsIF92YWx1ZSBzdGF0ZS4gKi9cbiAgICBwcml2YXRlIHVwZGF0ZVNlbGVjdGVkUmFkaW9Gcm9tVmFsdWUoKTogdm9pZCB7XG4gICAgICAgIC8vIElmIHRoZSB2YWx1ZSBhbHJlYWR5IG1hdGNoZXMgdGhlIHNlbGVjdGVkIHJhZGlvLCBkbyBub3RoaW5nLlxuICAgICAgICBjb25zdCBpc0FscmVhZHlTZWxlY3RlZCA9IHRoaXMuX3NlbGVjdGVkICE9PSBudWxsICYmIHRoaXMuX3NlbGVjdGVkLnZhbHVlID09PSB0aGlzLl92YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5yYWRpb3MgIT0gbnVsbCAmJiAhaXNBbHJlYWR5U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMucmFkaW9zLmZvckVhY2goKHJhZGlvKSA9PiB7XG4gICAgICAgICAgICAgICAgcmFkaW8uY2hlY2tlZCA9IHRoaXMudmFsdWUgPT09IHJhZGlvLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChyYWRpby5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkID0gcmFkaW87XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNY1JhZGlvQnV0dG9uLlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuYWJzdHJhY3QgY2xhc3MgTWNSYWRpb0J1dHRvbkJhc2Uge1xuICAgIC8vIFNpbmNlIHRoZSBkaXNhYmxlZCBwcm9wZXJ0eSBpcyBtYW51YWxseSBkZWZpbmVkIGZvciB0aGUgTWNSYWRpb0J1dHRvbiBhbmQgaXNuJ3Qgc2V0IHVwIGluXG4gICAgLy8gdGhlIG1peGluIGJhc2UgY2xhc3MuIFRvIGJlIGFibGUgdG8gdXNlIHRoZSB0YWJpbmRleCBtaXhpbiwgYSBkaXNhYmxlZCBwcm9wZXJ0eSBtdXN0IGJlXG4gICAgLy8gZGVmaW5lZCB0byBwcm9wZXJseSB3b3JrLlxuICAgIGFic3RyYWN0IGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1JhZGlvQnV0dG9uTWl4aW5CYXNlOlxuICAgIENhbkNvbG9yQ3RvciAmIEhhc1RhYkluZGV4Q3RvciAmIHR5cGVvZiBNY1JhZGlvQnV0dG9uQmFzZSA9IG1peGluQ29sb3IobWl4aW5UYWJJbmRleChNY1JhZGlvQnV0dG9uQmFzZSkpO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtcmFkaW8tYnV0dG9uJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3JhZGlvLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsncmFkaW8uc2NzcyddLFxuICAgIGlucHV0czogWydjb2xvcicsICd0YWJJbmRleCddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZXhwb3J0QXM6ICdtY1JhZGlvQnV0dG9uJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtcmFkaW8tYnV0dG9uJyxcbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCcsXG4gICAgICAgICdbY2xhc3MubWMtc2VsZWN0ZWRdJzogJ2NoZWNrZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWRpc2FibGVkXSc6ICdkaXNhYmxlZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jUmFkaW9CdXR0b24gZXh0ZW5kcyBNY1JhZGlvQnV0dG9uTWl4aW5CYXNlXG4gICAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgQ2FuQ29sb3IsIEhhc1RhYkluZGV4IHtcblxuICAgIC8qKiBXaGV0aGVyIHRoaXMgcmFkaW8gYnV0dG9uIGlzIGNoZWNrZWQuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgY2hlY2tlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2NoZWNrZWQ7IH1cbiAgICBzZXQgY2hlY2tlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBuZXdDaGVja2VkU3RhdGUgPSB0b0Jvb2xlYW4odmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLl9jaGVja2VkICE9PSBuZXdDaGVja2VkU3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrZWQgPSBuZXdDaGVja2VkU3RhdGU7XG5cbiAgICAgICAgICAgIGlmIChuZXdDaGVja2VkU3RhdGUgJiYgdGhpcy5yYWRpb0dyb3VwICYmIHRoaXMucmFkaW9Hcm91cC52YWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmFkaW9Hcm91cC5zZWxlY3RlZCA9IHRoaXM7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFuZXdDaGVja2VkU3RhdGUgJiYgdGhpcy5yYWRpb0dyb3VwICYmIHRoaXMucmFkaW9Hcm91cC52YWx1ZSA9PT0gdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIFdoZW4gdW5jaGVja2luZyB0aGUgc2VsZWN0ZWQgcmFkaW8gYnV0dG9uLCB1cGRhdGUgdGhlIHNlbGVjdGVkIHJhZGlvXG4gICAgICAgICAgICAgICAgLy8gcHJvcGVydHkgb24gdGhlIGdyb3VwLlxuICAgICAgICAgICAgICAgIHRoaXMucmFkaW9Hcm91cC5zZWxlY3RlZCA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChuZXdDaGVja2VkU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAvLyBOb3RpZnkgYWxsIHJhZGlvIGJ1dHRvbnMgd2l0aCB0aGUgc2FtZSBuYW1lIHRvIHVuLWNoZWNrLlxuICAgICAgICAgICAgICAgIHRoaXMuX3JhZGlvRGlzcGF0Y2hlci5ub3RpZnkodGhpcy5pZCwgdGhpcy5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFRoZSB2YWx1ZSBvZiB0aGlzIHJhZGlvIGJ1dHRvbi4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpOiBhbnkgeyByZXR1cm4gdGhpcy5fdmFsdWU7IH1cbiAgICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5fdmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgaWYgKHRoaXMucmFkaW9Hcm91cCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIGNoZWNrZWQgd2hlbiB0aGUgdmFsdWUgY2hhbmdlZCB0byBtYXRjaCB0aGUgcmFkaW8gZ3JvdXAncyB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLnJhZGlvR3JvdXAudmFsdWUgPT09IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmFkaW9Hcm91cC5zZWxlY3RlZCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHJhZGlvIGJ1dHRvbiBpcyBkaXNhYmxlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkIHx8ICh0aGlzLnJhZGlvR3JvdXAgIT0gbnVsbCAmJiB0aGlzLnJhZGlvR3JvdXAuZGlzYWJsZWQpO1xuICAgIH1cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgbmV3RGlzYWJsZWRTdGF0ZSA9IHRvQm9vbGVhbih2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2Rpc2FibGVkICE9PSBuZXdEaXNhYmxlZFN0YXRlKSB7XG5cbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gbmV3RGlzYWJsZWRTdGF0ZTtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHJhZGlvIGJ1dHRvbiBpcyByZXF1aXJlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVpcmVkIHx8ICh0aGlzLnJhZGlvR3JvdXAgJiYgdGhpcy5yYWRpb0dyb3VwLnJlcXVpcmVkKTtcbiAgICB9XG4gICAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlcXVpcmVkID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgbGFiZWwgc2hvdWxkIGFwcGVhciBhZnRlciBvciBiZWZvcmUgdGhlIHJhZGlvIGJ1dHRvbi4gRGVmYXVsdHMgdG8gJ2FmdGVyJyAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGxhYmVsUG9zaXRpb24oKTogJ2JlZm9yZScgfCAnYWZ0ZXInIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhYmVsUG9zaXRpb24gfHwgKHRoaXMucmFkaW9Hcm91cCAmJiB0aGlzLnJhZGlvR3JvdXAubGFiZWxQb3NpdGlvbikgfHwgJ2FmdGVyJztcbiAgICB9XG4gICAgc2V0IGxhYmVsUG9zaXRpb24odmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbGFiZWxQb3NpdGlvbiA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKiBBbmFsb2cgdG8gSFRNTCAnbmFtZScgYXR0cmlidXRlIHVzZWQgdG8gZ3JvdXAgcmFkaW9zIGZvciB1bmlxdWUgc2VsZWN0aW9uLiAqL1xuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICAgIC8qKiBVc2VkIHRvIHNldCB0aGUgJ2FyaWEtbGFiZWwnIGF0dHJpYnV0ZSBvbiB0aGUgdW5kZXJseWluZyBpbnB1dCBlbGVtZW50LiAqL1xuICAgIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nO1xuXG4gICAgLyoqIFRoZSAnYXJpYS1sYWJlbGxlZGJ5JyBhdHRyaWJ1dGUgdGFrZXMgcHJlY2VkZW5jZSBhcyB0aGUgZWxlbWVudCdzIHRleHQgYWx0ZXJuYXRpdmUuICovXG4gICAgQElucHV0KCdhcmlhLWxhYmVsbGVkYnknKSBhcmlhTGFiZWxsZWRieTogc3RyaW5nO1xuXG4gICAgLyoqIFRoZSAnYXJpYS1kZXNjcmliZWRieScgYXR0cmlidXRlIGlzIHJlYWQgYWZ0ZXIgdGhlIGVsZW1lbnQncyBsYWJlbCBhbmQgZmllbGQgdHlwZS4gKi9cbiAgICBASW5wdXQoJ2FyaWEtZGVzY3JpYmVkYnknKSBhcmlhRGVzY3JpYmVkYnk6IHN0cmluZztcblxuICAgIC8qKiBUaGUgbmF0aXZlIGA8aW5wdXQgdHlwZT1yYWRpbz5gIGVsZW1lbnQgKi9cbiAgICBAVmlld0NoaWxkKCdpbnB1dCcsIHtzdGF0aWM6IGZhbHNlfSkgaW5wdXRFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gICAgLyoqXG4gICAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBjaGVja2VkIHN0YXRlIG9mIHRoaXMgcmFkaW8gYnV0dG9uIGNoYW5nZXMuXG4gICAgICogQ2hhbmdlIGV2ZW50cyBhcmUgb25seSBlbWl0dGVkIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXMgZHVlIHRvIHVzZXIgaW50ZXJhY3Rpb24gd2l0aFxuICAgICAqIHRoZSByYWRpbyBidXR0b24gKHRoZSBzYW1lIGJlaGF2aW9yIGFzIGA8aW5wdXQgdHlwZS1cInJhZGlvXCI+YCkuXG4gICAgICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZTogRXZlbnRFbWl0dGVyPE1jUmFkaW9DaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxNY1JhZGlvQ2hhbmdlPigpO1xuXG4gICAgLyoqIFRoZSBwYXJlbnQgcmFkaW8gZ3JvdXAuIE1heSBvciBtYXkgbm90IGJlIHByZXNlbnQuICovXG4gICAgcmFkaW9Hcm91cDogTWNSYWRpb0dyb3VwO1xuXG4gICAgQElucHV0KClcbiAgICBpc0ZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBUaGUgdW5pcXVlIElEIGZvciB0aGUgcmFkaW8gYnV0dG9uLiAqL1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgICAvKiogSUQgb2YgdGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50IGluc2lkZSBgPG1jLXJhZGlvLWJ1dHRvbj5gICovXG4gICAgZ2V0IGlucHV0SWQoKTogc3RyaW5nIHsgcmV0dXJuIGAke3RoaXMuaWQgfHwgdGhpcy51bmlxdWVJZH0taW5wdXRgOyB9XG5cbiAgICBwcml2YXRlIF9sYWJlbFBvc2l0aW9uOiAnYmVmb3JlJyB8ICdhZnRlcic7XG5cbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZTptZW1iZXItb3JkZXJpbmcgKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IHVuaXF1ZUlkOiBzdHJpbmcgPSBgbWMtcmFkaW8tJHsrK25leHRVbmlxdWVJZH1gO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhpcyByYWRpbyBpcyBjaGVja2VkLiAqL1xuICAgIHByaXZhdGUgX2NoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoaXMgcmFkaW8gaXMgZGlzYWJsZWQuICovXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICAvKiogV2hldGhlciB0aGlzIHJhZGlvIGlzIHJlcXVpcmVkLiAqL1xuICAgIHByaXZhdGUgX3JlcXVpcmVkOiBib29sZWFuO1xuXG4gICAgLyoqIFZhbHVlIGFzc2lnbmVkIHRvIHRoaXMgcmFkaW8uICovXG4gICAgcHJpdmF0ZSBfdmFsdWU6IGFueSA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQE9wdGlvbmFsKCkgcmFkaW9Hcm91cDogTWNSYWRpb0dyb3VwLFxuICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9jaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3JhZGlvRGlzcGF0Y2hlcjogVW5pcXVlU2VsZWN0aW9uRGlzcGF0Y2hlclxuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgICAgICB0aGlzLmlkID0gdGhpcy51bmlxdWVJZDtcblxuICAgICAgICB0aGlzLnJhZGlvR3JvdXAgPSByYWRpb0dyb3VwO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlVW5pcXVlU2VsZWN0aW9uTGlzdGVuZXIgPVxuICAgICAgICAgICAgX3JhZGlvRGlzcGF0Y2hlci5saXN0ZW4oKGlkOiBzdHJpbmcsIG5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpZCAhPT0gdGhpcy5pZCAmJiBuYW1lID09PSB0aGlzLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnJhZGlvR3JvdXApIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSByYWRpbyBpcyBpbnNpZGUgYSByYWRpbyBncm91cCwgZGV0ZXJtaW5lIGlmIGl0IHNob3VsZCBiZSBjaGVja2VkXG4gICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLnJhZGlvR3JvdXAudmFsdWUgPT09IHRoaXMuX3ZhbHVlO1xuICAgICAgICAgICAgLy8gQ29weSBuYW1lIGZyb20gcGFyZW50IHJhZGlvIGdyb3VwXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLnJhZGlvR3JvdXAubmFtZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3JcbiAgICAgICAgICAgIC5tb25pdG9yKHRoaXMuX2VsZW1lbnRSZWYsIHRydWUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChmb2N1c09yaWdpbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZm9jdXNPcmlnaW4gJiYgdGhpcy5yYWRpb0dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmFkaW9Hcm91cC50b3VjaCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLl9lbGVtZW50UmVmKTtcbiAgICAgICAgdGhpcy5yZW1vdmVVbmlxdWVTZWxlY3Rpb25MaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIC8qKiBGb2N1c2VzIHRoZSByYWRpbyBidXR0b24uICovXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXJrcyB0aGUgcmFkaW8gYnV0dG9uIGFzIG5lZWRpbmcgY2hlY2tpbmcgZm9yIGNoYW5nZSBkZXRlY3Rpb24uXG4gICAgICogVGhpcyBtZXRob2QgaXMgZXhwb3NlZCBiZWNhdXNlIHRoZSBwYXJlbnQgcmFkaW8gZ3JvdXAgd2lsbCBkaXJlY3RseVxuICAgICAqIHVwZGF0ZSBib3VuZCBwcm9wZXJ0aWVzIG9mIHRoZSByYWRpbyBidXR0b24uXG4gICAgICovXG4gICAgbWFya0ZvckNoZWNrKCkge1xuICAgICAgICAvLyBXaGVuIGdyb3VwIHZhbHVlIGNoYW5nZXMsIHRoZSBidXR0b24gd2lsbCBub3QgYmUgbm90aWZpZWQuIFVzZSBgbWFya0ZvckNoZWNrYCB0byBleHBsaWNpdFxuICAgICAgICAvLyB1cGRhdGUgcmFkaW8gYnV0dG9uJ3Mgc3RhdHVzXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIG9uSW5wdXRDbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgLy8gV2UgaGF2ZSB0byBzdG9wIHByb3BhZ2F0aW9uIGZvciBjbGljayBldmVudHMgb24gdGhlIHZpc3VhbCBoaWRkZW4gaW5wdXQgZWxlbWVudC5cbiAgICAgICAgLy8gQnkgZGVmYXVsdCwgd2hlbiBhIHVzZXIgY2xpY2tzIG9uIGEgbGFiZWwgZWxlbWVudCwgYSBnZW5lcmF0ZWQgY2xpY2sgZXZlbnQgd2lsbCBiZVxuICAgICAgICAvLyBkaXNwYXRjaGVkIG9uIHRoZSBhc3NvY2lhdGVkIGlucHV0IGVsZW1lbnQuIFNpbmNlIHdlIGFyZSB1c2luZyBhIGxhYmVsIGVsZW1lbnQgYXMgb3VyXG4gICAgICAgIC8vIHJvb3QgY29udGFpbmVyLCB0aGUgY2xpY2sgZXZlbnQgb24gdGhlIGByYWRpby1idXR0b25gIHdpbGwgYmUgZXhlY3V0ZWQgdHdpY2UuXG4gICAgICAgIC8vIFRoZSByZWFsIGNsaWNrIGV2ZW50IHdpbGwgYnViYmxlIHVwLCBhbmQgdGhlIGdlbmVyYXRlZCBjbGljayBldmVudCBhbHNvIHRyaWVzIHRvIGJ1YmJsZSB1cC5cbiAgICAgICAgLy8gVGhpcyB3aWxsIGxlYWQgdG8gbXVsdGlwbGUgY2xpY2sgZXZlbnRzLlxuICAgICAgICAvLyBQcmV2ZW50aW5nIGJ1YmJsaW5nIGZvciB0aGUgc2Vjb25kIGV2ZW50IHdpbGwgc29sdmUgdGhhdCBpc3N1ZS5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgb25JbnB1dENoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgLy8gV2UgYWx3YXlzIGhhdmUgdG8gc3RvcCBwcm9wYWdhdGlvbiBvbiB0aGUgY2hhbmdlIGV2ZW50LlxuICAgICAgICAvLyBPdGhlcndpc2UgdGhlIGNoYW5nZSBldmVudCwgZnJvbSB0aGUgaW5wdXQgZWxlbWVudCwgd2lsbCBidWJibGUgdXAgYW5kXG4gICAgICAgIC8vIGVtaXQgaXRzIGV2ZW50IG9iamVjdCB0byB0aGUgYGNoYW5nZWAgb3V0cHV0LlxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBjb25zdCBncm91cFZhbHVlQ2hhbmdlZCA9IHRoaXMucmFkaW9Hcm91cCAmJiB0aGlzLnZhbHVlICE9PSB0aGlzLnJhZGlvR3JvdXAudmFsdWU7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1pdENoYW5nZUV2ZW50KCk7XG5cbiAgICAgICAgaWYgKHRoaXMucmFkaW9Hcm91cCkge1xuICAgICAgICAgICAgdGhpcy5yYWRpb0dyb3VwLmNvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4odGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnJhZGlvR3JvdXAudG91Y2goKTtcbiAgICAgICAgICAgIGlmIChncm91cFZhbHVlQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmFkaW9Hcm91cC5lbWl0Q2hhbmdlRXZlbnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBVbnJlZ2lzdGVyIGZ1bmN0aW9uIGZvciBfcmFkaW9EaXNwYXRjaGVyICovXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgcHJpdmF0ZSByZWFkb25seSByZW1vdmVVbmlxdWVTZWxlY3Rpb25MaXN0ZW5lcjogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gICAgLyoqIERpc3BhdGNoIGNoYW5nZSBldmVudCB3aXRoIGN1cnJlbnQgdmFsdWUuICovXG4gICAgcHJpdmF0ZSBlbWl0Q2hhbmdlRXZlbnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQobmV3IE1jUmFkaW9DaGFuZ2UodGhpcywgdGhpcy5fdmFsdWUpKTtcbiAgICB9XG59XG4iXX0=