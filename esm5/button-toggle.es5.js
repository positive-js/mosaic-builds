/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Input, Optional, Output, ViewEncapsulation, ViewChild, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusMonitor } from '@ptsecurity/cdk/a11y';
import { coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { SelectionModel } from '@ptsecurity/cdk/collections';
import { McButton, McButtonModule } from '@ptsecurity/mosaic/button';
import { McCommonModule } from '@ptsecurity/mosaic/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Provider Expression that allows mc-button-toggle-group to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * \@docs-private
 * @type {?}
 */
var MC_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return McButtonToggleGroup; }),
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
        this.controlValueAccessorChangeFn = function () { };
        /**
         * onTouch function registered via registerOnTouch (ControlValueAccessor).
         */
        // tslint:disable-next-line:no-empty
        this.onTouched = function () { };
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
                return selected.map(function (toggle) { return toggle.value; });
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
            this.buttonToggles.forEach(function (toggle) { return toggle.markForCheck(); });
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
        (_a = this.selectionModel).select.apply(_a, this.buttonToggles.filter(function (toggle) { return toggle.checked; }));
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
            return this.rawValue.some(function (value) { return toggle.value != null && value === toggle.value; });
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
            value.forEach(function (currentValue) { return _this.selectValue(currentValue); });
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
        this.buttonToggles.forEach(function (toggle) { return toggle.checked = false; });
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
        var correspondingOption = this.buttonToggles.find(function (toggle) {
            return toggle.value != null && toggle.value === value;
        });
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
                        '[class.mc-button-toggle-vertical]': 'vertical'
                    },
                    exportAs: 'mcButtonToggleGroup'
                },] },
    ];
    /** @nocollapse */
    McButtonToggleGroup.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    McButtonToggleGroup.propDecorators = {
        vertical: [{ type: Input }],
        value: [{ type: Input }],
        multiple: [{ type: Input }],
        buttonToggles: [{ type: ContentChildren, args: [forwardRef(function () { return McButtonToggle; }),] }],
        disabled: [{ type: Input }],
        valueChange: [{ type: Output }],
        change: [{ type: Output }]
    };
    return McButtonToggleGroup;
}());
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
        function (value) { this._disabled = coerceBooleanProperty(value); },
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
            Promise.resolve().then(function () { return group.syncButtonToggle(_this, false); });
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
                    template: "\n        <button\n            mc-button\n            [disabled]=\"disabled\"\n            [attr.tabindex]=\"disabled ? -1 : tabIndex\"\n            (click)=\"onToggleClick()\">\n            <ng-content></ng-content>\n        </button>\n    ",
                    styles: [".mc-button-toggle-group{display:flex;flex-direction:row}.mc-button-toggle-group:not(.mc-button-toggle-vertical) .mc-button-toggle:not([disabled])+.mc-button-toggle:not([disabled]){margin-left:-1px}.mc-button-toggle-group .mc-button-toggle>.mc-button{padding:5px 7px}.mc-button-toggle-group .mc-button-toggle:first-of-type:not(:last-of-type)>.mc-button,.mc-button-toggle-group .mc-button-toggle:first-of-type:not(:last-of-type)>.mc-icon-button{border-bottom-right-radius:0;border-top-right-radius:0}.mc-button-toggle-group .mc-button-toggle:last-of-type:not(:first-of-type)>.mc-button,.mc-button-toggle-group .mc-button-toggle:last-of-type:not(:first-of-type)>.mc-icon-button{border-bottom-left-radius:0;border-top-left-radius:0}.mc-button-toggle-group .mc-button-toggle:not(:first-of-type):not(:last-of-type)>.mc-button,.mc-button-toggle-group .mc-button-toggle:not(:first-of-type):not(:last-of-type)>.mc-icon-button{border-radius:0}.mc-button-toggle-vertical{flex-direction:column}.mc-button-toggle-vertical .mc-button-toggle:not([disabled])+.mc-button-toggle:not([disabled]){margin-top:-1px}.mc-button-toggle-vertical .mc-button-toggle .mc-button,.mc-button-toggle-vertical .mc-button-toggle .mc-icon-button{width:100%}.mc-button-toggle-vertical .mc-button-toggle:first-child:not(:last-child)>.mc-button,.mc-button-toggle-vertical .mc-button-toggle:first-child:not(:last-child)>.mc-icon-button{border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-button-toggle-vertical .mc-button-toggle:last-child:not(:first-child)>.mc-button,.mc-button-toggle-vertical .mc-button-toggle:last-child:not(:first-child)>.mc-icon-button{border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-button-toggle-vertical .mc-button-toggle:not(:first-child):not(:last-child)>.mc-button,.mc-button-toggle-vertical .mc-button-toggle:not(:first-child):not(:last-child)>.mc-icon-button{border-radius:0}"],
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'mcButtonToggle',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '[class.mc-button-toggle-standalone]': '!buttonToggleGroup',
                        '[class.mc-button-toggle-checked]': 'checked',
                        class: 'mc-button-toggle',
                        // Always reset the tabindex to -1 so it doesn't conflict with the one on the `button`,
                        // but can still receive focus from things like cdkFocusInitial.
                        '[attr.tabindex]': '-1',
                        '[attr.disabled]': 'disabled || null',
                        '(focus)': 'focus()'
                    }
                },] },
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
        mcButton: [{ type: ViewChild, args: [McButton,] }],
        value: [{ type: Input }],
        tabIndex: [{ type: Input }],
        disabled: [{ type: Input }],
        change: [{ type: Output }]
    };
    return McButtonToggle;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McButtonToggleModule = /** @class */ (function () {
    function McButtonToggleModule() {
    }
    McButtonToggleModule.decorators = [
        { type: NgModule, args: [{
                    imports: [McCommonModule, McButtonModule],
                    exports: [McCommonModule, McButtonToggleGroup, McButtonToggle],
                    declarations: [McButtonToggleGroup, McButtonToggle]
                },] },
    ];
    return McButtonToggleModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McButtonToggleModule, MC_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR, McButtonToggleChange, McButtonToggleGroup, McButtonToggle };
//# sourceMappingURL=button-toggle.es5.js.map
