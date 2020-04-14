/**
 * @fileoverview added by tsickle
 * Generated from: button-toggle.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __spread } from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Input, Optional, Output, QueryList, ViewEncapsulation, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { McButton } from '@ptsecurity/mosaic/button';
/**
 * Provider Expression that allows mc-button-toggle-group to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * \@docs-private
 * @type {?}
 */
export var MC_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return McButtonToggleGroup; })),
    multi: true
};
/**
 * Change event object emitted by MсButtonToggle.
 */
var /**
 * Change event object emitted by MсButtonToggle.
 */
McButtonToggleChange = /** @class */ (function () {
    function McButtonToggleChange(source, value) {
        this.source = source;
        this.value = value;
    }
    return McButtonToggleChange;
}());
/**
 * Change event object emitted by MсButtonToggle.
 */
export { McButtonToggleChange };
if (false) {
    /**
     * The MсButtonToggle that emits the event.
     * @type {?}
     */
    McButtonToggleChange.prototype.source;
    /**
     * The value assigned to the MсButtonToggle.
     * @type {?}
     */
    McButtonToggleChange.prototype.value;
}
/**
 * Exclusive selection button toggle group that behaves like a radio-button group.
 */
var McButtonToggleGroup = /** @class */ (function () {
    function McButtonToggleGroup(_changeDetector) {
        this._changeDetector = _changeDetector;
        /**
         * Event that emits whenever the value of the group changes.
         * Used to facilitate two-way data binding.
         * \@docs-private
         */
        this.valueChange = new EventEmitter();
        /**
         * Event emitted when the group's value changes.
         */
        this.change = new EventEmitter();
        this._vertical = false;
        this._multiple = false;
        this._disabled = false;
        /**
         * The method to be called in order to update ngModel.
         * Now `ngModel` binding is not supported in multiple selection mode.
         */
        // tslint:disable-next-line:no-empty
        this.controlValueAccessorChangeFn = (/**
         * @return {?}
         */
        function () { });
        /**
         * onTouch function registered via registerOnTouch (ControlValueAccessor).
         */
        // tslint:disable-next-line:no-empty
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
    }
    Object.defineProperty(McButtonToggleGroup.prototype, "vertical", {
        /** Whether the toggle group is vertical. */
        get: /**
         * Whether the toggle group is vertical.
         * @return {?}
         */
        function () {
            return this._vertical;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._vertical = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McButtonToggleGroup.prototype, "value", {
        /** Value of the toggle group. */
        get: /**
         * Value of the toggle group.
         * @return {?}
         */
        function () {
            /** @type {?} */
            var selected = this.selectionModel ? this.selectionModel.selected : [];
            if (this.multiple) {
                return selected.map((/**
                 * @param {?} toggle
                 * @return {?}
                 */
                function (toggle) { return toggle.value; }));
            }
            return selected[0] ? selected[0].value : undefined;
        },
        set: /**
         * @param {?} newValue
         * @return {?}
         */
        function (newValue) {
            this.setSelectionByValue(newValue);
            this.valueChange.emit(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McButtonToggleGroup.prototype, "selected", {
        /** Selected button toggles in the group. */
        get: /**
         * Selected button toggles in the group.
         * @return {?}
         */
        function () {
            /** @type {?} */
            var selected = this.selectionModel.selected;
            return this.multiple ? selected : (selected[0] || null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McButtonToggleGroup.prototype, "multiple", {
        /** Whether multiple button toggles can be selected. */
        get: /**
         * Whether multiple button toggles can be selected.
         * @return {?}
         */
        function () {
            return this._multiple;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._multiple = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McButtonToggleGroup.prototype, "disabled", {
        /** Whether multiple button toggle group is disabled. */
        get: /**
         * Whether multiple button toggle group is disabled.
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = coerceBooleanProperty(value);
            if (!this.buttonToggles) {
                return;
            }
            this.buttonToggles.forEach((/**
             * @param {?} toggle
             * @return {?}
             */
            function (toggle) { return toggle.markForCheck(); }));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McButtonToggleGroup.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.selectionModel = new SelectionModel(this.multiple, undefined, false);
    };
    /**
     * @return {?}
     */
    McButtonToggleGroup.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _a;
        (_a = this.selectionModel).select.apply(_a, __spread(this.buttonToggles.filter((/**
         * @param {?} toggle
         * @return {?}
         */
        function (toggle) { return toggle.checked; }))));
        this.disabled = this._disabled;
    };
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value Value to be set to the model.
     */
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param {?} value Value to be set to the model.
     * @return {?}
     */
    McButtonToggleGroup.prototype.writeValue = /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param {?} value Value to be set to the model.
     * @return {?}
     */
    function (value) {
        this.value = value;
        this._changeDetector.markForCheck();
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    McButtonToggleGroup.prototype.registerOnChange = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.controlValueAccessorChangeFn = fn;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    McButtonToggleGroup.prototype.registerOnTouched = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    McButtonToggleGroup.prototype.setDisabledState = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /** Dispatch change event with current selection and group value. */
    /**
     * Dispatch change event with current selection and group value.
     * @return {?}
     */
    McButtonToggleGroup.prototype.emitChangeEvent = /**
     * Dispatch change event with current selection and group value.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var selected = this.selected;
        /** @type {?} */
        var source = Array.isArray(selected) ? selected[selected.length - 1] : selected;
        /** @type {?} */
        var event = new McButtonToggleChange(source, this.value);
        this.controlValueAccessorChangeFn(event.value);
        this.change.emit(event);
    };
    /**
     * Syncs a button toggle's selected state with the model value.
     * @param toggle Toggle to be synced.
     * @param select Whether the toggle should be selected.
     * @param isUserInput Whether the change was a result of a user interaction.
     */
    /**
     * Syncs a button toggle's selected state with the model value.
     * @param {?} toggle Toggle to be synced.
     * @param {?} select Whether the toggle should be selected.
     * @param {?=} isUserInput Whether the change was a result of a user interaction.
     * @return {?}
     */
    McButtonToggleGroup.prototype.syncButtonToggle = /**
     * Syncs a button toggle's selected state with the model value.
     * @param {?} toggle Toggle to be synced.
     * @param {?} select Whether the toggle should be selected.
     * @param {?=} isUserInput Whether the change was a result of a user interaction.
     * @return {?}
     */
    function (toggle, select, isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        // Deselect the currently-selected toggle, if we're in single-selection
        // mode and the button being toggled isn't selected at the moment.
        if (!this.multiple && this.selected && !toggle.checked) {
            ((/** @type {?} */ (this.selected))).checked = false;
        }
        if (select) {
            this.selectionModel.select(toggle);
        }
        else {
            this.selectionModel.deselect(toggle);
        }
        // Only emit the change event for user input.
        if (isUserInput) {
            this.emitChangeEvent();
        }
        // Note: we emit this one no matter whether it was a user interaction, because
        // it is used by Angular to sync up the two-way data binding.
        this.valueChange.emit(this.value);
    };
    /** Checks whether a button toggle is selected. */
    /**
     * Checks whether a button toggle is selected.
     * @param {?} toggle
     * @return {?}
     */
    McButtonToggleGroup.prototype.isSelected = /**
     * Checks whether a button toggle is selected.
     * @param {?} toggle
     * @return {?}
     */
    function (toggle) {
        return this.selectionModel.isSelected(toggle);
    };
    /** Determines whether a button toggle should be checked on init. */
    /**
     * Determines whether a button toggle should be checked on init.
     * @param {?} toggle
     * @return {?}
     */
    McButtonToggleGroup.prototype.isPrechecked = /**
     * Determines whether a button toggle should be checked on init.
     * @param {?} toggle
     * @return {?}
     */
    function (toggle) {
        if (this.rawValue === undefined) {
            return false;
        }
        if (this.multiple && Array.isArray(this.rawValue)) {
            return this.rawValue.some((/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return toggle.value != null && value === toggle.value; }));
        }
        return toggle.value === this.rawValue;
    };
    /** Updates the selection state of the toggles in the group based on a value. */
    /**
     * Updates the selection state of the toggles in the group based on a value.
     * @private
     * @param {?} value
     * @return {?}
     */
    McButtonToggleGroup.prototype.setSelectionByValue = /**
     * Updates the selection state of the toggles in the group based on a value.
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        this.rawValue = value;
        if (!this.buttonToggles) {
            return;
        }
        if (this.multiple && value) {
            if (!Array.isArray(value)) {
                throw Error('Value must be an array in multiple-selection mode.');
            }
            this.clearSelection();
            value.forEach((/**
             * @param {?} currentValue
             * @return {?}
             */
            function (currentValue) { return _this.selectValue(currentValue); }));
        }
        else {
            this.clearSelection();
            this.selectValue(value);
        }
    };
    /** Clears the selected toggles. */
    /**
     * Clears the selected toggles.
     * @private
     * @return {?}
     */
    McButtonToggleGroup.prototype.clearSelection = /**
     * Clears the selected toggles.
     * @private
     * @return {?}
     */
    function () {
        this.selectionModel.clear();
        this.buttonToggles.forEach((/**
         * @param {?} toggle
         * @return {?}
         */
        function (toggle) { return toggle.checked = false; }));
    };
    /** Selects a value if there's a toggle that corresponds to it. */
    /**
     * Selects a value if there's a toggle that corresponds to it.
     * @private
     * @param {?} value
     * @return {?}
     */
    McButtonToggleGroup.prototype.selectValue = /**
     * Selects a value if there's a toggle that corresponds to it.
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var correspondingOption = this.buttonToggles.find((/**
         * @param {?} toggle
         * @return {?}
         */
        function (toggle) {
            return toggle.value != null && toggle.value === value;
        }));
        if (correspondingOption) {
            correspondingOption.checked = true;
            this.selectionModel.select(correspondingOption);
        }
    };
    McButtonToggleGroup.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-button-toggle-group',
                    providers: [MC_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR],
                    host: {
                        role: 'group',
                        class: 'mc-button-toggle-group',
                        '[class.mc-button-toggle_vertical]': 'vertical'
                    },
                    exportAs: 'mcButtonToggleGroup'
                },] }
    ];
    /** @nocollapse */
    McButtonToggleGroup.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    McButtonToggleGroup.propDecorators = {
        vertical: [{ type: Input }],
        value: [{ type: Input }],
        multiple: [{ type: Input }],
        buttonToggles: [{ type: ContentChildren, args: [forwardRef((/**
                     * @return {?}
                     */
                    function () { return McButtonToggle; })),] }],
        disabled: [{ type: Input }],
        valueChange: [{ type: Output }],
        change: [{ type: Output }]
    };
    return McButtonToggleGroup;
}());
export { McButtonToggleGroup };
if (false) {
    /**
     * Child button toggle buttons.
     * @type {?}
     */
    McButtonToggleGroup.prototype.buttonToggles;
    /**
     * Event that emits whenever the value of the group changes.
     * Used to facilitate two-way data binding.
     * \@docs-private
     * @type {?}
     */
    McButtonToggleGroup.prototype.valueChange;
    /**
     * Event emitted when the group's value changes.
     * @type {?}
     */
    McButtonToggleGroup.prototype.change;
    /**
     * @type {?}
     * @private
     */
    McButtonToggleGroup.prototype._vertical;
    /**
     * @type {?}
     * @private
     */
    McButtonToggleGroup.prototype._multiple;
    /**
     * @type {?}
     * @private
     */
    McButtonToggleGroup.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    McButtonToggleGroup.prototype.selectionModel;
    /**
     * Reference to the raw value that the consumer tried to assign. The real
     * value will exclude any values from this one that don't correspond to a
     * toggle. Useful for the cases where the value is assigned before the toggles
     * have been initialized or at the same that they're being swapped out.
     * @type {?}
     * @private
     */
    McButtonToggleGroup.prototype.rawValue;
    /**
     * The method to be called in order to update ngModel.
     * Now `ngModel` binding is not supported in multiple selection mode.
     * @type {?}
     */
    McButtonToggleGroup.prototype.controlValueAccessorChangeFn;
    /**
     * onTouch function registered via registerOnTouch (ControlValueAccessor).
     * @type {?}
     */
    McButtonToggleGroup.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    McButtonToggleGroup.prototype._changeDetector;
}
/**
 * Single button inside of a toggle group.
 */
var McButtonToggle = /** @class */ (function () {
    function McButtonToggle(buttonToggleGroup, changeDetectorRef, focusMonitor, element) {
        this.buttonToggleGroup = buttonToggleGroup;
        this.changeDetectorRef = changeDetectorRef;
        this.focusMonitor = focusMonitor;
        this.element = element;
        /**
         * Event emitted when the group value changes.
         */
        this.change = new EventEmitter();
        this.isSingleSelector = false;
        this._checked = false;
        this._disabled = false;
    }
    Object.defineProperty(McButtonToggle.prototype, "checked", {
        /** Whether the button is checked. */
        get: /**
         * Whether the button is checked.
         * @return {?}
         */
        function () {
            return this.buttonToggleGroup ? this.buttonToggleGroup.isSelected(this) : this._checked;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var newValue = coerceBooleanProperty(value);
            if (newValue !== this._checked) {
                this._checked = newValue;
                if (this.buttonToggleGroup) {
                    this.buttonToggleGroup.syncButtonToggle(this, this._checked);
                }
                this.changeDetectorRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McButtonToggle.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled || (this.buttonToggleGroup && this.buttonToggleGroup.disabled);
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
    /**
     * @return {?}
     */
    McButtonToggle.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.isSingleSelector = this.buttonToggleGroup && !this.buttonToggleGroup.multiple;
        this.type = this.isSingleSelector ? 'radio' : 'checkbox';
        if (this.buttonToggleGroup && this.buttonToggleGroup.isPrechecked(this)) {
            this.checked = true;
        }
        this.focusMonitor.monitor(this.element.nativeElement, true);
    };
    /**
     * @return {?}
     */
    McButtonToggle.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var group = this.buttonToggleGroup;
        this.focusMonitor.stopMonitoring(this.element.nativeElement);
        // Remove the toggle from the selection once it's destroyed. Needs to happen
        // on the next tick in order to avoid "changed after checked" errors.
        if (group && group.isSelected(this)) {
            Promise.resolve().then((/**
             * @return {?}
             */
            function () { return group.syncButtonToggle(_this, false); }));
        }
    };
    /** Focuses the button. */
    /**
     * Focuses the button.
     * @return {?}
     */
    McButtonToggle.prototype.focus = /**
     * Focuses the button.
     * @return {?}
     */
    function () {
        this.element.nativeElement.focus();
    };
    /** Checks the button toggle due to an interaction with the underlying native button. */
    /**
     * Checks the button toggle due to an interaction with the underlying native button.
     * @return {?}
     */
    McButtonToggle.prototype.onToggleClick = /**
     * Checks the button toggle due to an interaction with the underlying native button.
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        /** @type {?} */
        var newChecked = this.isSingleSelector ? true : !this._checked;
        if (newChecked !== this._checked) {
            this._checked = newChecked;
            if (this.buttonToggleGroup) {
                this.buttonToggleGroup.syncButtonToggle(this, this._checked, true);
                this.buttonToggleGroup.onTouched();
            }
        }
        // Emit a change event when it's the single selector
        this.change.emit(new McButtonToggleChange(this, this.value));
    };
    /**
     * Marks the button toggle as needing checking for change detection.
     * This method is exposed because the parent button toggle group will directly
     * update bound properties of the radio button.
     */
    /**
     * Marks the button toggle as needing checking for change detection.
     * This method is exposed because the parent button toggle group will directly
     * update bound properties of the radio button.
     * @return {?}
     */
    McButtonToggle.prototype.markForCheck = /**
     * Marks the button toggle as needing checking for change detection.
     * This method is exposed because the parent button toggle group will directly
     * update bound properties of the radio button.
     * @return {?}
     */
    function () {
        // When the group value changes, the button will not be notified.
        // Use `markForCheck` to explicit update button toggle's status.
        this.changeDetectorRef.markForCheck();
    };
    McButtonToggle.decorators = [
        { type: Component, args: [{
                    selector: 'mc-button-toggle',
                    exportAs: 'mcButtonToggle',
                    template: "\n        <button\n            mc-button\n            type=\"button\"\n            [class.mc-active]=\"checked\"\n            [disabled]=\"disabled\"\n            [tabIndex]=\"tabIndex\"\n            (click)=\"onToggleClick()\">\n            <ng-content></ng-content>\n        </button>\n    ",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'mc-button-toggle',
                        '[class.mc-button-toggle-standalone]': '!buttonToggleGroup'
                    },
                    styles: [".mc-group{display:flex;flex-direction:row}.mc-group .mc-group_justified>.mc-group-item{width:100%}.mc-group .mc-group-item+.mc-group-item{margin-left:-1px}.mc-group>.mc-group-item:first-child:not(:last-child),.mc-group>.mc-group-item:first-child:not(:last-child)>.mc-form-field__container{border-bottom-right-radius:0;border-top-right-radius:0}.mc-group>.mc-group-item:last-child:not(:first-child),.mc-group>.mc-group-item:last-child:not(:first-child)>.mc-form-field__container{border-bottom-left-radius:0;border-top-left-radius:0}.mc-group>.mc-group-item:not(:first-child):not(:last-child),.mc-group>.mc-group-item:not(:first-child):not(:last-child)>.mc-form-field__container{border-radius:0}.mc-vertical-group{display:flex;flex-direction:column}.mc-vertical-group>.mc-group-item:first-child:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-vertical-group>.mc-group-item:first-child:not(:last-child)>.mc-form-field__container{border-bottom-right-radius:0;border-bottom-left-radius:0}.mc-vertical-group>.mc-group-item:last-child:not(:first-child){border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-vertical-group>.mc-group-item:last-child:not(:first-child)>.mc-form-field__container{border-top-right-radius:0;border-top-left-radius:0}.mc-vertical-group>.mc-group-item:not(:first-child):not(:last-child),.mc-vertical-group>.mc-group-item:not(:first-child):not(:last-child)>.mc-form-field__container{border-radius:0}.mc-vertical-group .mc-group-item+.mc-group-item{margin-top:-1px}.mc-button-toggle-group{display:flex;flex-direction:row}.mc-button-toggle-group .mc-button-toggle:first-of-type:not(:last-of-type)>.mc-button,.mc-button-toggle-group .mc-button-toggle:first-of-type:not(:last-of-type)>.mc-icon-button{border-bottom-right-radius:0;border-top-right-radius:0}.mc-button-toggle-group .mc-button-toggle:last-of-type:not(:first-of-type)>.mc-button,.mc-button-toggle-group .mc-button-toggle:last-of-type:not(:first-of-type)>.mc-icon-button{border-bottom-left-radius:0;border-top-left-radius:0}.mc-button-toggle-group .mc-button-toggle:not(:first-of-type):not(:last-of-type)>.mc-button,.mc-button-toggle-group .mc-button-toggle:not(:first-of-type):not(:last-of-type)>.mc-icon-button{border-radius:0}.mc-button-toggle-group .mc-button-toggle[disabled]{outline:0}.mc-button-toggle-group:not(.mc-button-toggle_vertical) .mc-button-toggle:not([disabled])+.mc-button-toggle:not([disabled]){margin-left:-1px}.mc-button-toggle_vertical{flex-direction:column}.mc-button-toggle_vertical .mc-button-toggle+.mc-button-toggle{border-left:none;border-right:none}.mc-button-toggle_vertical .mc-button-toggle:not([disabled])+.mc-button-toggle:not([disabled]){margin-top:-1px}.mc-button-toggle_vertical .mc-button-toggle .mc-button,.mc-button-toggle_vertical .mc-button-toggle .mc-icon-button{width:100%}.mc-button-toggle_vertical .mc-button-toggle:first-child:not(:last-child)>.mc-button,.mc-button-toggle_vertical .mc-button-toggle:first-child:not(:last-child)>.mc-icon-button{border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-button-toggle_vertical .mc-button-toggle:last-child:not(:first-child)>.mc-button,.mc-button-toggle_vertical .mc-button-toggle:last-child:not(:first-child)>.mc-icon-button{border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-button-toggle_vertical .mc-button-toggle:not(:first-child):not(:last-child)>.mc-button,.mc-button-toggle_vertical .mc-button-toggle:not(:first-child):not(:last-child)>.mc-icon-button{border-radius:0}.mc-button-toggle-standalone{box-shadow:none}"]
                }] }
    ];
    /** @nocollapse */
    McButtonToggle.ctorParameters = function () { return [
        { type: McButtonToggleGroup, decorators: [{ type: Optional }] },
        { type: ChangeDetectorRef },
        { type: FocusMonitor },
        { type: ElementRef }
    ]; };
    McButtonToggle.propDecorators = {
        checked: [{ type: Input }],
        mcButton: [{ type: ViewChild, args: [McButton, { static: false },] }],
        value: [{ type: Input }],
        tabIndex: [{ type: Input }],
        disabled: [{ type: Input }],
        change: [{ type: Output }]
    };
    return McButtonToggle;
}());
export { McButtonToggle };
if (false) {
    /** @type {?} */
    McButtonToggle.prototype.type;
    /** @type {?} */
    McButtonToggle.prototype.mcButton;
    /**
     * McButtonToggleGroup reads this to assign its own value.
     * @type {?}
     */
    McButtonToggle.prototype.value;
    /**
     * Tabindex for the toggle.
     * @type {?}
     */
    McButtonToggle.prototype.tabIndex;
    /**
     * Event emitted when the group value changes.
     * @type {?}
     */
    McButtonToggle.prototype.change;
    /**
     * @type {?}
     * @private
     */
    McButtonToggle.prototype.isSingleSelector;
    /**
     * @type {?}
     * @private
     */
    McButtonToggle.prototype._checked;
    /**
     * @type {?}
     * @private
     */
    McButtonToggle.prototype._disabled;
    /** @type {?} */
    McButtonToggle.prototype.buttonToggleGroup;
    /**
     * @type {?}
     * @private
     */
    McButtonToggle.prototype.changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    McButtonToggle.prototype.focusMonitor;
    /**
     * @type {?}
     * @private
     */
    McButtonToggle.prototype.element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLXRvZ2dsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvYnV0dG9uLXRvZ2dsZS8iLCJzb3VyY2VzIjpbImJ1dHRvbi10b2dnbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUVILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNqQixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7OztBQVdyRCxNQUFNLEtBQU8scUNBQXFDLEdBQVE7SUFDdEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsY0FBTSxPQUFBLG1CQUFtQixFQUFuQixDQUFtQixFQUFDO0lBQ2xELEtBQUssRUFBRSxJQUFJO0NBQ2Q7Ozs7QUFHRDs7OztJQUNJLDhCQUVXLE1BQXNCLEVBRXRCLEtBQVU7UUFGVixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUV0QixVQUFLLEdBQUwsS0FBSyxDQUFLO0lBQ2xCLENBQUM7SUFDUiwyQkFBQztBQUFELENBQUMsQUFQRCxJQU9DOzs7Ozs7Ozs7O0lBSk8sc0NBQTZCOzs7OztJQUU3QixxQ0FBaUI7Ozs7O0FBS3pCO0lB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SixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLHNTQVVUO29CQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsSUFBSSxFQUFFO3dCQUNGLEtBQUssRUFBRSxrQkFBa0I7d0JBQ3pCLHFDQUFxQyxFQUFFLG9CQUFvQjtxQkFDOUQ7O2lCQUNKOzs7O2dCQW1ENkMsbUJBQW1CLHVCQUF4RCxRQUFRO2dCQW5XYixpQkFBaUI7Z0JBTlosWUFBWTtnQkFVakIsVUFBVTs7OzBCQWdUVCxLQUFLOzJCQXNCTCxTQUFTLFNBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTt3QkFHckMsS0FBSzsyQkFHTCxLQUFLOzJCQUVMLEtBQUs7eUJBVUwsTUFBTTs7SUFvRVgscUJBQUM7Q0FBQSxBQXJJRCxJQXFJQztTQS9HWSxjQUFjOzs7SUF1QnZCLDhCQUFpQjs7SUFFakIsa0NBQTJEOzs7OztJQUczRCwrQkFBb0I7Ozs7O0lBR3BCLGtDQUFpQzs7Ozs7SUFZakMsZ0NBQXlHOzs7OztJQUV6RywwQ0FBaUM7Ozs7O0lBQ2pDLGtDQUF5Qjs7Ozs7SUFDekIsbUNBQW1DOztJQUcvQiwyQ0FBeUQ7Ozs7O0lBQ3pELDJDQUE0Qzs7Ozs7SUFDNUMsc0NBQWtDOzs7OztJQUNsQyxpQ0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1jQnV0dG9uIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2J1dHRvbic7XG5cblxuLyoqIEFjY2VwdGFibGUgdHlwZXMgZm9yIGEgYnV0dG9uIHRvZ2dsZS4gKi9cbmV4cG9ydCB0eXBlIFRvZ2dsZVR5cGUgPSAnY2hlY2tib3gnIHwgJ3JhZGlvJztcblxuLyoqXG4gKiBQcm92aWRlciBFeHByZXNzaW9uIHRoYXQgYWxsb3dzIG1jLWJ1dHRvbi10b2dnbGUtZ3JvdXAgdG8gcmVnaXN0ZXIgYXMgYSBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAqIFRoaXMgYWxsb3dzIGl0IHRvIHN1cHBvcnQgWyhuZ01vZGVsKV0uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBNQ19CVVRUT05fVE9HR0xFX0dST1VQX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWNCdXR0b25Ub2dnbGVHcm91cCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbi8qKiBDaGFuZ2UgZXZlbnQgb2JqZWN0IGVtaXR0ZWQgYnkgTdGBQnV0dG9uVG9nZ2xlLiAqL1xuZXhwb3J0IGNsYXNzIE1jQnV0dG9uVG9nZ2xlQ2hhbmdlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgLyoqIFRoZSBN0YFCdXR0b25Ub2dnbGUgdGhhdCBlbWl0cyB0aGUgZXZlbnQuICovXG4gICAgICAgIHB1YmxpYyBzb3VyY2U6IE1jQnV0dG9uVG9nZ2xlLFxuICAgICAgICAvKiogVGhlIHZhbHVlIGFzc2lnbmVkIHRvIHRoZSBN0YFCdXR0b25Ub2dnbGUuICovXG4gICAgICAgIHB1YmxpYyB2YWx1ZTogYW55XG4gICAgKSB7fVxufVxuXG4vKiogRXhjbHVzaXZlIHNlbGVjdGlvbiBidXR0b24gdG9nZ2xlIGdyb3VwIHRoYXQgYmVoYXZlcyBsaWtlIGEgcmFkaW8tYnV0dG9uIGdyb3VwLiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1idXR0b24tdG9nZ2xlLWdyb3VwJyxcbiAgICBwcm92aWRlcnM6IFtNQ19CVVRUT05fVE9HR0xFX0dST1VQX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBob3N0OiB7XG4gICAgICAgIHJvbGU6ICdncm91cCcsXG4gICAgICAgIGNsYXNzOiAnbWMtYnV0dG9uLXRvZ2dsZS1ncm91cCcsXG4gICAgICAgICdbY2xhc3MubWMtYnV0dG9uLXRvZ2dsZV92ZXJ0aWNhbF0nOiAndmVydGljYWwnXG4gICAgfSxcbiAgICBleHBvcnRBczogJ21jQnV0dG9uVG9nZ2xlR3JvdXAnXG59KVxuZXhwb3J0IGNsYXNzIE1jQnV0dG9uVG9nZ2xlR3JvdXAgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0IHtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSB0b2dnbGUgZ3JvdXAgaXMgdmVydGljYWwuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgdmVydGljYWwoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl92ZXJ0aWNhbDtcbiAgICB9XG5cbiAgICBzZXQgdmVydGljYWwodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fdmVydGljYWwgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBWYWx1ZSBvZiB0aGUgdG9nZ2xlIGdyb3VwLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5zZWxlY3Rpb25Nb2RlbCA/IHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWQgOiBbXTtcblxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkLm1hcCgodG9nZ2xlKSA9PiB0b2dnbGUudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkWzBdID8gc2VsZWN0ZWRbMF0udmFsdWUgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25CeVZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBTZWxlY3RlZCBidXR0b24gdG9nZ2xlcyBpbiB0aGUgZ3JvdXAuICovXG4gICAgZ2V0IHNlbGVjdGVkKCk6IGFueSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZDtcblxuICAgICAgICByZXR1cm4gdGhpcy5tdWx0aXBsZSA/IHNlbGVjdGVkIDogKHNlbGVjdGVkWzBdIHx8IG51bGwpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIG11bHRpcGxlIGJ1dHRvbiB0b2dnbGVzIGNhbiBiZSBzZWxlY3RlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBtdWx0aXBsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX211bHRpcGxlO1xuICAgIH1cblxuICAgIHNldCBtdWx0aXBsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9tdWx0aXBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqIENoaWxkIGJ1dHRvbiB0b2dnbGUgYnV0dG9ucy4gKi9cbiAgICBAQ29udGVudENoaWxkcmVuKGZvcndhcmRSZWYoKCkgPT4gTWNCdXR0b25Ub2dnbGUpKSBidXR0b25Ub2dnbGVzOiBRdWVyeUxpc3Q8TWNCdXR0b25Ub2dnbGU+O1xuXG4gICAgLyoqIFdoZXRoZXIgbXVsdGlwbGUgYnV0dG9uIHRvZ2dsZSBncm91cCBpcyBkaXNhYmxlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmJ1dHRvblRvZ2dsZXMpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5idXR0b25Ub2dnbGVzLmZvckVhY2goKHRvZ2dsZSkgPT4gdG9nZ2xlLm1hcmtGb3JDaGVjaygpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSB2YWx1ZSBvZiB0aGUgZ3JvdXAgY2hhbmdlcy5cbiAgICAgKiBVc2VkIHRvIGZhY2lsaXRhdGUgdHdvLXdheSBkYXRhIGJpbmRpbmcuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZ3JvdXAncyB2YWx1ZSBjaGFuZ2VzLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxNY0J1dHRvblRvZ2dsZUNoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1jQnV0dG9uVG9nZ2xlQ2hhbmdlPigpO1xuICAgIHByaXZhdGUgX3ZlcnRpY2FsID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfbXVsdGlwbGUgPSBmYWxzZTtcbiAgICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuICAgIHByaXZhdGUgc2VsZWN0aW9uTW9kZWw6IFNlbGVjdGlvbk1vZGVsPE1jQnV0dG9uVG9nZ2xlPjtcblxuICAgIC8qKlxuICAgICAqIFJlZmVyZW5jZSB0byB0aGUgcmF3IHZhbHVlIHRoYXQgdGhlIGNvbnN1bWVyIHRyaWVkIHRvIGFzc2lnbi4gVGhlIHJlYWxcbiAgICAgKiB2YWx1ZSB3aWxsIGV4Y2x1ZGUgYW55IHZhbHVlcyBmcm9tIHRoaXMgb25lIHRoYXQgZG9uJ3QgY29ycmVzcG9uZCB0byBhXG4gICAgICogdG9nZ2xlLiBVc2VmdWwgZm9yIHRoZSBjYXNlcyB3aGVyZSB0aGUgdmFsdWUgaXMgYXNzaWduZWQgYmVmb3JlIHRoZSB0b2dnbGVzXG4gICAgICogaGF2ZSBiZWVuIGluaXRpYWxpemVkIG9yIGF0IHRoZSBzYW1lIHRoYXQgdGhleSdyZSBiZWluZyBzd2FwcGVkIG91dC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHJhd1ZhbHVlOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbWV0aG9kIHRvIGJlIGNhbGxlZCBpbiBvcmRlciB0byB1cGRhdGUgbmdNb2RlbC5cbiAgICAgKiBOb3cgYG5nTW9kZWxgIGJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCBpbiBtdWx0aXBsZSBzZWxlY3Rpb24gbW9kZS5cbiAgICAgKi9cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcbiAgICBjb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gICAgLyoqIG9uVG91Y2ggZnVuY3Rpb24gcmVnaXN0ZXJlZCB2aWEgcmVnaXN0ZXJPblRvdWNoIChDb250cm9sVmFsdWVBY2Nlc3NvcikuICovXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5XG4gICAgb25Ub3VjaGVkOiAoKSA9PiBhbnkgPSAoKSA9PiB7fTtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsPE1jQnV0dG9uVG9nZ2xlPih0aGlzLm11bHRpcGxlLCB1bmRlZmluZWQsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0KC4uLnRoaXMuYnV0dG9uVG9nZ2xlcy5maWx0ZXIoKHRvZ2dsZSkgPT4gdG9nZ2xlLmNoZWNrZWQpKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG1vZGVsIHZhbHVlLiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgICAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSB0byBiZSBzZXQgdG8gdGhlIG1vZGVsLlxuICAgICAqL1xuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuID0gZm47XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgLyoqIERpc3BhdGNoIGNoYW5nZSBldmVudCB3aXRoIGN1cnJlbnQgc2VsZWN0aW9uIGFuZCBncm91cCB2YWx1ZS4gKi9cbiAgICBlbWl0Q2hhbmdlRXZlbnQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZDtcbiAgICAgICAgY29uc3Qgc291cmNlID0gQXJyYXkuaXNBcnJheShzZWxlY3RlZCkgPyBzZWxlY3RlZFtzZWxlY3RlZC5sZW5ndGggLSAxXSA6IHNlbGVjdGVkO1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBNY0J1dHRvblRvZ2dsZUNoYW5nZShzb3VyY2UsIHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLmNvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4oZXZlbnQudmFsdWUpO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTeW5jcyBhIGJ1dHRvbiB0b2dnbGUncyBzZWxlY3RlZCBzdGF0ZSB3aXRoIHRoZSBtb2RlbCB2YWx1ZS5cbiAgICAgKiBAcGFyYW0gdG9nZ2xlIFRvZ2dsZSB0byBiZSBzeW5jZWQuXG4gICAgICogQHBhcmFtIHNlbGVjdCBXaGV0aGVyIHRoZSB0b2dnbGUgc2hvdWxkIGJlIHNlbGVjdGVkLlxuICAgICAqIEBwYXJhbSBpc1VzZXJJbnB1dCBXaGV0aGVyIHRoZSBjaGFuZ2Ugd2FzIGEgcmVzdWx0IG9mIGEgdXNlciBpbnRlcmFjdGlvbi5cbiAgICAgKi9cbiAgICBzeW5jQnV0dG9uVG9nZ2xlKHRvZ2dsZTogTWNCdXR0b25Ub2dnbGUsIHNlbGVjdDogYm9vbGVhbiwgaXNVc2VySW5wdXQgPSBmYWxzZSkge1xuICAgICAgICAvLyBEZXNlbGVjdCB0aGUgY3VycmVudGx5LXNlbGVjdGVkIHRvZ2dsZSwgaWYgd2UncmUgaW4gc2luZ2xlLXNlbGVjdGlvblxuICAgICAgICAvLyBtb2RlIGFuZCB0aGUgYnV0dG9uIGJlaW5nIHRvZ2dsZWQgaXNuJ3Qgc2VsZWN0ZWQgYXQgdGhlIG1vbWVudC5cbiAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlICYmIHRoaXMuc2VsZWN0ZWQgJiYgIXRvZ2dsZS5jaGVja2VkKSB7XG4gICAgICAgICAgICAodGhpcy5zZWxlY3RlZCBhcyBNY0J1dHRvblRvZ2dsZSkuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3QodG9nZ2xlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuZGVzZWxlY3QodG9nZ2xlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE9ubHkgZW1pdCB0aGUgY2hhbmdlIGV2ZW50IGZvciB1c2VyIGlucHV0LlxuICAgICAgICBpZiAoaXNVc2VySW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdENoYW5nZUV2ZW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBOb3RlOiB3ZSBlbWl0IHRoaXMgb25lIG5vIG1hdHRlciB3aGV0aGVyIGl0IHdhcyBhIHVzZXIgaW50ZXJhY3Rpb24sIGJlY2F1c2VcbiAgICAgICAgLy8gaXQgaXMgdXNlZCBieSBBbmd1bGFyIHRvIHN5bmMgdXAgdGhlIHR3by13YXkgZGF0YSBiaW5kaW5nLlxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIGEgYnV0dG9uIHRvZ2dsZSBpcyBzZWxlY3RlZC4gKi9cbiAgICBpc1NlbGVjdGVkKHRvZ2dsZTogTWNCdXR0b25Ub2dnbGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uTW9kZWwuaXNTZWxlY3RlZCh0b2dnbGUpO1xuICAgIH1cblxuICAgIC8qKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBidXR0b24gdG9nZ2xlIHNob3VsZCBiZSBjaGVja2VkIG9uIGluaXQuICovXG4gICAgaXNQcmVjaGVja2VkKHRvZ2dsZTogTWNCdXR0b25Ub2dnbGUpIHtcbiAgICAgICAgaWYgKHRoaXMucmF3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgQXJyYXkuaXNBcnJheSh0aGlzLnJhd1ZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmF3VmFsdWUuc29tZSgodmFsdWUpID0+IHRvZ2dsZS52YWx1ZSAhPSBudWxsICYmIHZhbHVlID09PSB0b2dnbGUudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvZ2dsZS52YWx1ZSA9PT0gdGhpcy5yYXdWYWx1ZTtcbiAgICB9XG5cbiAgICAvKiogVXBkYXRlcyB0aGUgc2VsZWN0aW9uIHN0YXRlIG9mIHRoZSB0b2dnbGVzIGluIHRoZSBncm91cCBiYXNlZCBvbiBhIHZhbHVlLiAqL1xuICAgIHByaXZhdGUgc2V0U2VsZWN0aW9uQnlWYWx1ZSh2YWx1ZTogYW55IHwgYW55W10pIHtcbiAgICAgICAgdGhpcy5yYXdWYWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgIGlmICghdGhpcy5idXR0b25Ub2dnbGVzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdWYWx1ZSBtdXN0IGJlIGFuIGFycmF5IGluIG11bHRpcGxlLXNlbGVjdGlvbiBtb2RlLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKChjdXJyZW50VmFsdWU6IGFueSkgPT4gdGhpcy5zZWxlY3RWYWx1ZShjdXJyZW50VmFsdWUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VmFsdWUodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIENsZWFycyB0aGUgc2VsZWN0ZWQgdG9nZ2xlcy4gKi9cbiAgICBwcml2YXRlIGNsZWFyU2VsZWN0aW9uKCkge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuYnV0dG9uVG9nZ2xlcy5mb3JFYWNoKCh0b2dnbGUpID0+IHRvZ2dsZS5jaGVja2VkID0gZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKiBTZWxlY3RzIGEgdmFsdWUgaWYgdGhlcmUncyBhIHRvZ2dsZSB0aGF0IGNvcnJlc3BvbmRzIHRvIGl0LiAqL1xuICAgIHByaXZhdGUgc2VsZWN0VmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICBjb25zdCBjb3JyZXNwb25kaW5nT3B0aW9uID0gdGhpcy5idXR0b25Ub2dnbGVzLmZpbmQoKHRvZ2dsZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRvZ2dsZS52YWx1ZSAhPSBudWxsICYmIHRvZ2dsZS52YWx1ZSA9PT0gdmFsdWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChjb3JyZXNwb25kaW5nT3B0aW9uKSB7XG4gICAgICAgICAgICBjb3JyZXNwb25kaW5nT3B0aW9uLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3QoY29ycmVzcG9uZGluZ09wdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKiBTaW5nbGUgYnV0dG9uIGluc2lkZSBvZiBhIHRvZ2dsZSBncm91cC4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtYnV0dG9uLXRvZ2dsZScsXG4gICAgZXhwb3J0QXM6ICdtY0J1dHRvblRvZ2dsZScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgbWMtYnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIFtjbGFzcy5tYy1hY3RpdmVdPVwiY2hlY2tlZFwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgW3RhYkluZGV4XT1cInRhYkluZGV4XCJcbiAgICAgICAgICAgIChjbGljayk9XCJvblRvZ2dsZUNsaWNrKClcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9idXR0b24+XG4gICAgYCxcbiAgICBzdHlsZVVybHM6IFsnYnV0dG9uLXRvZ2dsZS5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtYnV0dG9uLXRvZ2dsZScsXG4gICAgICAgICdbY2xhc3MubWMtYnV0dG9uLXRvZ2dsZS1zdGFuZGFsb25lXSc6ICchYnV0dG9uVG9nZ2xlR3JvdXAnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0J1dHRvblRvZ2dsZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBidXR0b24gaXMgY2hlY2tlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBjaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5idXR0b25Ub2dnbGVHcm91cCA/IHRoaXMuYnV0dG9uVG9nZ2xlR3JvdXAuaXNTZWxlY3RlZCh0aGlzKSA6IHRoaXMuX2NoZWNrZWQ7XG4gICAgfVxuXG4gICAgc2V0IGNoZWNrZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy5fY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tlZCA9IG5ld1ZhbHVlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5idXR0b25Ub2dnbGVHcm91cCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uVG9nZ2xlR3JvdXAuc3luY0J1dHRvblRvZ2dsZSh0aGlzLCB0aGlzLl9jaGVja2VkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1yZXNlcnZlZC1rZXl3b3Jkc1xuICAgIHR5cGU6IFRvZ2dsZVR5cGU7XG5cbiAgICBAVmlld0NoaWxkKE1jQnV0dG9uLCB7IHN0YXRpYzogZmFsc2UgfSkgbWNCdXR0b246IE1jQnV0dG9uO1xuXG4gICAgLyoqIE1jQnV0dG9uVG9nZ2xlR3JvdXAgcmVhZHMgdGhpcyB0byBhc3NpZ24gaXRzIG93biB2YWx1ZS4gKi9cbiAgICBASW5wdXQoKSB2YWx1ZTogYW55O1xuXG4gICAgLyoqIFRhYmluZGV4IGZvciB0aGUgdG9nZ2xlLiAqL1xuICAgIEBJbnB1dCgpIHRhYkluZGV4OiBudW1iZXIgfCBudWxsO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCB8fCAodGhpcy5idXR0b25Ub2dnbGVHcm91cCAmJiB0aGlzLmJ1dHRvblRvZ2dsZUdyb3VwLmRpc2FibGVkKTtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGdyb3VwIHZhbHVlIGNoYW5nZXMuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZTogRXZlbnRFbWl0dGVyPE1jQnV0dG9uVG9nZ2xlQ2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWNCdXR0b25Ub2dnbGVDaGFuZ2U+KCk7XG5cbiAgICBwcml2YXRlIGlzU2luZ2xlU2VsZWN0b3IgPSBmYWxzZTtcbiAgICBwcml2YXRlIF9jaGVja2VkID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAT3B0aW9uYWwoKSBwdWJsaWMgYnV0dG9uVG9nZ2xlR3JvdXA6IE1jQnV0dG9uVG9nZ2xlR3JvdXAsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWZcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pc1NpbmdsZVNlbGVjdG9yID0gdGhpcy5idXR0b25Ub2dnbGVHcm91cCAmJiAhdGhpcy5idXR0b25Ub2dnbGVHcm91cC5tdWx0aXBsZTtcbiAgICAgICAgdGhpcy50eXBlID0gdGhpcy5pc1NpbmdsZVNlbGVjdG9yID8gJ3JhZGlvJyA6ICdjaGVja2JveCc7XG5cbiAgICAgICAgaWYgKHRoaXMuYnV0dG9uVG9nZ2xlR3JvdXAgJiYgdGhpcy5idXR0b25Ub2dnbGVHcm91cC5pc1ByZWNoZWNrZWQodGhpcykpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCB0cnVlKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgY29uc3QgZ3JvdXAgPSB0aGlzLmJ1dHRvblRvZ2dsZUdyb3VwO1xuXG4gICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICAvLyBSZW1vdmUgdGhlIHRvZ2dsZSBmcm9tIHRoZSBzZWxlY3Rpb24gb25jZSBpdCdzIGRlc3Ryb3llZC4gTmVlZHMgdG8gaGFwcGVuXG4gICAgICAgIC8vIG9uIHRoZSBuZXh0IHRpY2sgaW4gb3JkZXIgdG8gYXZvaWQgXCJjaGFuZ2VkIGFmdGVyIGNoZWNrZWRcIiBlcnJvcnMuXG4gICAgICAgIGlmIChncm91cCAmJiBncm91cC5pc1NlbGVjdGVkKHRoaXMpKSB7XG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IGdyb3VwLnN5bmNCdXR0b25Ub2dnbGUodGhpcywgZmFsc2UpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBGb2N1c2VzIHRoZSBidXR0b24uICovXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB0aGUgYnV0dG9uIHRvZ2dsZSBkdWUgdG8gYW4gaW50ZXJhY3Rpb24gd2l0aCB0aGUgdW5kZXJseWluZyBuYXRpdmUgYnV0dG9uLiAqL1xuICAgIG9uVG9nZ2xlQ2xpY2soKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNvbnN0IG5ld0NoZWNrZWQgPSB0aGlzLmlzU2luZ2xlU2VsZWN0b3IgPyB0cnVlIDogIXRoaXMuX2NoZWNrZWQ7XG5cbiAgICAgICAgaWYgKG5ld0NoZWNrZWQgIT09IHRoaXMuX2NoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrZWQgPSBuZXdDaGVja2VkO1xuICAgICAgICAgICAgaWYgKHRoaXMuYnV0dG9uVG9nZ2xlR3JvdXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvblRvZ2dsZUdyb3VwLnN5bmNCdXR0b25Ub2dnbGUodGhpcywgdGhpcy5fY2hlY2tlZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25Ub2dnbGVHcm91cC5vblRvdWNoZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBFbWl0IGEgY2hhbmdlIGV2ZW50IHdoZW4gaXQncyB0aGUgc2luZ2xlIHNlbGVjdG9yXG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQobmV3IE1jQnV0dG9uVG9nZ2xlQ2hhbmdlKHRoaXMsIHRoaXMudmFsdWUpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXJrcyB0aGUgYnV0dG9uIHRvZ2dsZSBhcyBuZWVkaW5nIGNoZWNraW5nIGZvciBjaGFuZ2UgZGV0ZWN0aW9uLlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIGV4cG9zZWQgYmVjYXVzZSB0aGUgcGFyZW50IGJ1dHRvbiB0b2dnbGUgZ3JvdXAgd2lsbCBkaXJlY3RseVxuICAgICAqIHVwZGF0ZSBib3VuZCBwcm9wZXJ0aWVzIG9mIHRoZSByYWRpbyBidXR0b24uXG4gICAgICovXG4gICAgbWFya0ZvckNoZWNrKCkge1xuICAgICAgICAvLyBXaGVuIHRoZSBncm91cCB2YWx1ZSBjaGFuZ2VzLCB0aGUgYnV0dG9uIHdpbGwgbm90IGJlIG5vdGlmaWVkLlxuICAgICAgICAvLyBVc2UgYG1hcmtGb3JDaGVja2AgdG8gZXhwbGljaXQgdXBkYXRlIGJ1dHRvbiB0b2dnbGUncyBzdGF0dXMuXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxufVxuIl19