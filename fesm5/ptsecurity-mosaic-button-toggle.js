import { forwardRef, EventEmitter, Directive, ChangeDetectorRef, Input, ContentChildren, Output, Component, ViewEncapsulation, ChangeDetectionStrategy, Optional, ElementRef, ViewChild, NgModule } from '@angular/core';
import { McButton, McButtonModule } from '@ptsecurity/mosaic/button';
import { McCommonModule } from '@ptsecurity/mosaic/core';
import { __spread } from 'tslib';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * Generated from: button-toggle.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Provider Expression that allows mc-button-toggle-group to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * \@docs-private
 * @type {?}
 */
var MC_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR = {
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
var  /**
 * Change event object emitted by MсButtonToggle.
 */
McButtonToggleChange = /** @class */ (function () {
    function McButtonToggleChange(source, value) {
        this.source = source;
        this.value = value;
    }
    return McButtonToggleChange;
}());
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

/**
 * @fileoverview added by tsickle
 * Generated from: button-toggle.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McButtonToggleModule = /** @class */ (function () {
    function McButtonToggleModule() {
    }
    McButtonToggleModule.decorators = [
        { type: NgModule, args: [{
                    imports: [McCommonModule, McButtonModule],
                    exports: [McCommonModule, McButtonToggleGroup, McButtonToggle],
                    declarations: [McButtonToggleGroup, McButtonToggle]
                },] }
    ];
    return McButtonToggleModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ptsecurity-mosaic-button-toggle.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { MC_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR, McButtonToggle, McButtonToggleChange, McButtonToggleGroup, McButtonToggleModule };
//# sourceMappingURL=ptsecurity-mosaic-button-toggle.js.map
