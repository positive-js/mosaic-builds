/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@ptsecurity/cdk/a11y'), require('@ptsecurity/cdk/collections'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/mosaic/core'), require('@angular/common'), require('@ptsecurity/cdk/platform')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/list', ['exports', '@angular/core', '@angular/forms', '@ptsecurity/cdk/a11y', '@ptsecurity/cdk/collections', '@ptsecurity/cdk/keycodes', '@ptsecurity/mosaic/core', '@angular/common', '@ptsecurity/cdk/platform'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.list = {}),global.ng.core,global.ng.forms,global.ng.cdk.a11y,global.ng.cdk.collections,global.ng.cdk.keycodes,global.ng.mosaic.core,global.ng.common,global.ng.cdk.platform));
}(this, (function (exports,core,forms,a11y,collections,keycodes,core$1,common,platform) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var McListOptionBase = /** @class */ (function () {
    function McListOptionBase() {
    }
    return McListOptionBase;
}());
var /** @type {?} */ MAT_SELECTION_LIST_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return McListSelection; }),
    multi: true
};
/**
 * Change event object emitted by McListOption whenever the selected state changes.
 * @deprecated Use the `McListSelectionChange` event on the selection list instead.
 * \@deletion-target 6.0.0
 */
var /**
 * Change event object emitted by McListOption whenever the selected state changes.
 * @deprecated Use the `McListSelectionChange` event on the selection list instead.
 * \@deletion-target 6.0.0
 */
McListOptionChange = /** @class */ (function () {
    function McListOptionChange(source, selected) {
        this.source = source;
        this.selected = selected;
    }
    return McListOptionChange;
}());
var McListSelectionChange = /** @class */ (function () {
    function McListSelectionChange(source, option) {
        this.source = source;
        this.option = option;
    }
    return McListSelectionChange;
}());
/**
 * Component for list-options of selection-list. Each list-option can automatically
 * generate a checkbox and can put current item into the selectionModel of selection-list
 * if the current item is selected.
 */
var McListOption = /** @class */ (function (_super) {
    __extends(McListOption, _super);
    function McListOption(_element, _changeDetector, selectionList) {
        var _this = _super.call(this) || this;
        _this._element = _element;
        _this._changeDetector = _changeDetector;
        _this.selectionList = selectionList;
        // Whether the option has focus.
        _this._hasFocus = false;
        // Whether the label should appear before or after the checkbox. Defaults to 'after'
        _this.checkboxPosition = 'after';
        /**
         * Emits a change event whenever the selected state of an option changes.
         * @deprecated Use the `selectionChange` event on the `<mc-selection-list>` instead.
         * \@deletion-target 6.0.0
         */
        _this.selectionChange = new core.EventEmitter();
        _this._selected = false;
        _this._disabled = false;
        return _this;
    }
    Object.defineProperty(McListOption.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled || (this.selectionList && this.selectionList.disabled);
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var /** @type {?} */ newValue = core$1.toBoolean(value);
            if (newValue !== this._disabled) {
                this._disabled = newValue;
                this._changeDetector.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McListOption.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this.selectionList.selectedOptions.isSelected(this);
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var /** @type {?} */ isSelected = core$1.toBoolean(value);
            if (isSelected !== this._selected) {
                this._setSelected(isSelected);
                this.selectionList._reportValueChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McListOption.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._selected) {
            // List options that are selected at initialization can't be reported properly to the form
            // control. This is because it takes some time until the selection-list knows about all
            // available options. Also it can happen that the ControlValueAccessor has an initial value
            // that should be used instead. Deferring the value change report to the next tick ensures
            // that the form control value is not being overwritten.
            Promise.resolve().then(function () { return _this.selected = true; });
        }
    };
    /**
     * @return {?}
     */
    McListOption.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._lineSetter = new core$1.McLineSetter(this._lines, this._element);
    };
    /**
     * @return {?}
     */
    McListOption.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.selected) {
            // We have to delay this until the next tick in order
            // to avoid changed after checked errors.
            Promise.resolve().then(function () { return _this.selected = false; });
        }
        this.selectionList._removeOptionFromList(this);
    };
    // Toggles the selection state of the option.
    /**
     * @return {?}
     */
    McListOption.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.selected = !this.selected;
    };
    // Allows for programmatic focusing of the option.
    /**
     * @return {?}
     */
    McListOption.prototype.focus = /**
     * @return {?}
     */
    function () {
        this._element.nativeElement.focus();
    };
    /**
     * Returns the list item's text label. Implemented as a part of the FocusKeyManager.
     * @docs-private
     */
    /**
     * Returns the list item's text label. Implemented as a part of the FocusKeyManager.
     * \@docs-private
     * @return {?}
     */
    McListOption.prototype.getLabel = /**
     * Returns the list item's text label. Implemented as a part of the FocusKeyManager.
     * \@docs-private
     * @return {?}
     */
    function () {
        return this._text ? this._text.nativeElement.textContent : '';
    };
    /**
     * @return {?}
     */
    McListOption.prototype._handleClick = /**
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this.toggle();
            // Emit a change event if the selected state of the option changed through user interaction.
            this.selectionList._emitChangeEvent(this);
            // TODO: the `selectionChange` event on the option is deprecated. Remove that in the future.
            this._emitDeprecatedChangeEvent();
        }
    };
    /**
     * @return {?}
     */
    McListOption.prototype._handleFocus = /**
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        this._hasFocus = true;
        this.selectionList._setFocusedOption(this);
    };
    /**
     * @return {?}
     */
    McListOption.prototype._handleBlur = /**
     * @return {?}
     */
    function () {
        this._hasFocus = false;
        this.selectionList._onTouched();
    };
    // Retrieves the DOM element of the component host.
    /**
     * @return {?}
     */
    McListOption.prototype._getHostElement = /**
     * @return {?}
     */
    function () {
        return this._element.nativeElement;
    };
    // Sets the selected state of the option.
    /**
     * @param {?} selected
     * @return {?}
     */
    McListOption.prototype._setSelected = /**
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        if (selected === this._selected) {
            return;
        }
        this._selected = selected;
        if (selected) {
            this.selectionList.selectedOptions.select(this);
        }
        else {
            this.selectionList.selectedOptions.deselect(this);
        }
        this._changeDetector.markForCheck();
    };
    // Emits a selectionChange event for this option.
    /**
     * @return {?}
     */
    McListOption.prototype._emitDeprecatedChangeEvent = /**
     * @return {?}
     */
    function () {
        // TODO: the `selectionChange` event on the option is deprecated. Remove that in the future.
        this.selectionChange.emit(new McListOptionChange(this, this.selected));
    };
    McListOption.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-list-option',
                    host: {
                        role: 'option',
                        tabindex: '-1',
                        '(focus)': '_handleFocus()',
                        '(blur)': '_handleBlur()',
                        '(click)': '_handleClick()',
                        class: 'mc-list-option',
                        '[class.mc-disabled]': 'disabled',
                        '[class.mc-selected]': '_selected',
                        '[class.mc-focused]': '_hasFocus',
                        '[attr.disabled]': 'disabled'
                    },
                    template: "<div class=\"mc-list-item-content\"><div class=\"mc-list-text\" #text><ng-content></ng-content></div></div>",
                    encapsulation: core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    McListOption.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: core.ChangeDetectorRef, },
        { type: McListSelection, decorators: [{ type: core.Optional }, { type: core.Inject, args: [core.forwardRef(function () { return McListSelection; }),] },] },
    ]; };
    McListOption.propDecorators = {
        "_lines": [{ type: core.ContentChildren, args: [core$1.McLine,] },],
        "_text": [{ type: core.ViewChild, args: ['text',] },],
        "checkboxPosition": [{ type: core.Input },],
        "value": [{ type: core.Input },],
        "disabled": [{ type: core.Input },],
        "selected": [{ type: core.Input },],
        "selectionChange": [{ type: core.Output },],
    };
    return McListOption;
}(McListOptionBase));
var McListSelectionBase = /** @class */ (function () {
    function McListSelectionBase() {
    }
    return McListSelectionBase;
}());
var /** @type {?} */ _McListSelectionMixinBase = core$1.mixinTabIndex(core$1.mixinDisabled(McListSelectionBase));
var McListSelection = /** @class */ (function (_super) {
    __extends(McListSelection, _super);
    function McListSelection(_element, tabIndex) {
        var _this = _super.call(this) || this;
        _this._element = _element;
        // Emits a change event whenever the selected state of an option changes.
        _this.selectionChange = new core.EventEmitter();
        // The currently selected options.
        _this.selectedOptions = new collections.SelectionModel(true);
        // View to model callback that should be called if the list or its options lost focus.
        _this._onTouched = function () { };
        _this._onChange = function (_) { };
        _this.tabIndex = parseInt(tabIndex) || 0;
        return _this;
    }
    /**
     * @return {?}
     */
    McListSelection.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._keyManager = new a11y.FocusKeyManager(this.options).withWrap().withTypeAhead();
        if (this._tempValues) {
            this._setOptionsFromValues(this._tempValues);
            this._tempValues = null;
        }
    };
    // Focus the selection-list.
    /**
     * @return {?}
     */
    McListSelection.prototype.focus = /**
     * @return {?}
     */
    function () {
        this._element.nativeElement.focus();
    };
    // Selects all of the options.
    /**
     * @return {?}
     */
    McListSelection.prototype.selectAll = /**
     * @return {?}
     */
    function () {
        this.options.forEach(function (option) { return option._setSelected(true); });
        this._reportValueChange();
    };
    // Deselects all of the options.
    /**
     * @return {?}
     */
    McListSelection.prototype.deselectAll = /**
     * @return {?}
     */
    function () {
        this.options.forEach(function (option) { return option._setSelected(false); });
        this._reportValueChange();
    };
    // Sets the focused option of the selection-list.
    /**
     * @param {?} option
     * @return {?}
     */
    McListSelection.prototype._setFocusedOption = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this._keyManager.updateActiveItemIndex(this._getOptionIndex(option));
    };
    // Removes an option from the selection list and updates the active item.
    /**
     * @param {?} option
     * @return {?}
     */
    McListSelection.prototype._removeOptionFromList = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (option._hasFocus) {
            var /** @type {?} */ optionIndex = this._getOptionIndex(option);
            // Check whether the option is the last item
            if (optionIndex > 0) {
                this._keyManager.setPreviousItemActive();
            }
            else if (optionIndex === 0 && this.options.length > 1) {
                this._keyManager.setNextItemActive();
            }
        }
    };
    // Passes relevant key presses to our key manager.
    /**
     * @param {?} event
     * @return {?}
     */
    McListSelection.prototype._keydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        switch (event.keyCode) {
            case keycodes.SPACE:
            case keycodes.ENTER:
                this._toggleSelectOnFocusedOption();
                // Always prevent space from scrolling the page since the list has focus
                event.preventDefault();
                break;
            case keycodes.HOME:
            case keycodes.END:
                event.keyCode === keycodes.HOME ? this._keyManager.setFirstItemActive() : this._keyManager.setLastItemActive();
                event.preventDefault();
                break;
            default:
                this._keyManager.onKeydown(event);
        }
    };
    // Reports a value change to the ControlValueAccessor
    /**
     * @return {?}
     */
    McListSelection.prototype._reportValueChange = /**
     * @return {?}
     */
    function () {
        if (this.options) {
            this._onChange(this._getSelectedOptionValues());
        }
    };
    // Emits a change event if the selected state of an option changed.
    /**
     * @param {?} option
     * @return {?}
     */
    McListSelection.prototype._emitChangeEvent = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this.selectionChange.emit(new McListSelectionChange(this, option));
    };
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} values
     * @return {?}
     */
    McListSelection.prototype.writeValue = /**
     * @param {?} values
     * @return {?}
     */
    function (values) {
        if (this.options) {
            this._setOptionsFromValues(values || []);
        }
        else {
            this._tempValues = values;
        }
    };
    // Implemented as a part of ControlValueAccessor.
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    McListSelection.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        if (this.options) {
            this.options.forEach(function (option) { return option.disabled = isDisabled; });
        }
    };
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    McListSelection.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onChange = fn;
    };
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    McListSelection.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onTouched = fn;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    McListSelection.prototype._getOptionByValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.options.find(function (option) { return option.value === value; });
    };
    /**
     * @param {?} values
     * @return {?}
     */
    McListSelection.prototype._setOptionsFromValues = /**
     * @param {?} values
     * @return {?}
     */
    function (values) {
        var _this = this;
        this.options.forEach(function (option) { return option._setSelected(false); });
        values
            .map(function (value) { return _this._getOptionByValue(value); })
            .filter(Boolean)
            .forEach(function (option) { return ((option))._setSelected(true); });
    };
    /**
     * @return {?}
     */
    McListSelection.prototype._getSelectedOptionValues = /**
     * @return {?}
     */
    function () {
        return this.options.filter(function (option) { return option.selected; }).map(function (option) { return option.value; });
    };
    /**
     * @return {?}
     */
    McListSelection.prototype._toggleSelectOnFocusedOption = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ focusedIndex = this._keyManager.activeItemIndex;
        if (focusedIndex != null && this._isValidIndex(focusedIndex)) {
            var /** @type {?} */ focusedOption = this.options.toArray()[focusedIndex];
            if (focusedOption) {
                focusedOption.toggle();
                // Emit a change event because the focused option changed its state through user
                // interaction.
                this._emitChangeEvent(focusedOption);
                // TODO: the `selectionChange` event on the option is deprecated. Remove that in the future.
                focusedOption._emitDeprecatedChangeEvent();
            }
        }
    };
    /**
     * Utility to ensure all indexes are valid.
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of options.
     */
    McListSelection.prototype._isValidIndex = /**
     * Utility to ensure all indexes are valid.
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of options.
     */
    function (index) {
        return index >= 0 && index < this.options.length;
    };
    /**
     * @param {?} option
     * @return {?}
     */
    McListSelection.prototype._getOptionIndex = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        return this.options.toArray().indexOf(option);
    };
    McListSelection.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-list-selection',
                    template: '<ng-content></ng-content>',
                    styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}@-webkit-keyframes mc-progress{from{background-position:0 0}to{background-position:60px 0}}@keyframes mc-progress{from{background-position:40px 0}to{background-position:0 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;top:0;left:0;width:100%;height:100%;animation:mc-progress 2s linear infinite;background:repeating-linear-gradient(135deg,rgba(0,0,0,.05),rgba(0,0,0,.05) 15px,transparent 0,transparent 30px)}.mc-subheader{display:flex;box-sizing:border-box;padding:15px;align-items:center}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{margin:0}.mc-list,.mc-list-selection{display:block}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{height:28px;line-height:-2px}.mc-list .mc-subheader:first-child,.mc-list-selection .mc-subheader:first-child{margin-top:0}.mc-list .mc-list-item,.mc-list .mc-list-option,.mc-list-selection .mc-list-item,.mc-list-selection .mc-list-option{display:block;height:28px}.mc-list .mc-list-item .mc-list-item-content,.mc-list .mc-list-option .mc-list-item-content,.mc-list-selection .mc-list-item .mc-list-item-content,.mc-list-selection .mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:inherit;padding:0 15px}.mc-list .mc-list-item.mc-2-line,.mc-list .mc-list-option.mc-2-line,.mc-list-selection .mc-list-item.mc-2-line,.mc-list-selection .mc-list-option.mc-2-line{height:72px}.mc-list .mc-list-item.mc-3-line,.mc-list .mc-list-option.mc-3-line,.mc-list-selection .mc-list-item.mc-3-line,.mc-list-selection .mc-list-option.mc-3-line{height:88px}.mc-list .mc-list-item.mc-multi-line,.mc-list .mc-list-option.mc-multi-line,.mc-list-selection .mc-list-item.mc-multi-line,.mc-list-selection .mc-list-option.mc-multi-line{height:auto}.mc-list .mc-list-item.mc-multi-line .mc-list-item-content,.mc-list .mc-list-option.mc-multi-line .mc-list-item-content,.mc-list-selection .mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-selection .mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-bottom:16px}.mc-list .mc-list-item .mc-list-text,.mc-list .mc-list-option .mc-list-text,.mc-list-selection .mc-list-item .mc-list-text,.mc-list-selection .mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list .mc-list-item .mc-list-text>*,.mc-list .mc-list-option .mc-list-text>*,.mc-list-selection .mc-list-item .mc-list-text>*,.mc-list-selection .mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list .mc-list-item .mc-list-text:empty,.mc-list .mc-list-option .mc-list-text:empty,.mc-list-selection .mc-list-item .mc-list-text:empty,.mc-list-selection .mc-list-option .mc-list-text:empty{display:none}.mc-list .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-selection .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-selection .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0;padding-left:15px}[dir=rtl] .mc-list .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-selection .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-selection .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:15px;padding-left:0}.mc-list .mc-list-item .mc-list-icon,.mc-list .mc-list-option .mc-list-icon,.mc-list-selection .mc-list-item .mc-list-icon,.mc-list-selection .mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;height:24px;border-radius:50%;padding:4px;font-size:24px}.mc-list .mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list .mc-list-option .mc-list-icon~.mc-divider-inset,.mc-list-selection .mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list-selection .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list .mc-list-option .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-selection .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-selection .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:auto;margin-right:62px}.mc-list .mc-list-item .mc-divider,.mc-list .mc-list-option .mc-divider,.mc-list-selection .mc-list-item .mc-divider,.mc-list-selection .mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list .mc-list-item .mc-divider,[dir=rtl] .mc-list .mc-list-option .mc-divider,[dir=rtl] .mc-list-selection .mc-list-item .mc-divider,[dir=rtl] .mc-list-selection .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list .mc-list-item .mc-divider.mc-divider-inset,.mc-list .mc-list-option .mc-divider.mc-divider-inset,.mc-list-selection .mc-list-item .mc-divider.mc-divider-inset,.mc-list-selection .mc-list-option .mc-divider.mc-divider-inset{position:absolute}.mc-list-option:not([disabled]){cursor:pointer}"],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    inputs: ['disabled', 'tabIndex'],
                    host: {
                        class: 'mc-list-selection',
                        '[tabIndex]': 'tabIndex',
                        '(focus)': 'focus()',
                        '(blur)': '_onTouched()',
                        '(keydown)': '_keydown($event)'
                    },
                    providers: [MAT_SELECTION_LIST_VALUE_ACCESSOR],
                    preserveWhitespaces: false
                },] },
    ];
    /** @nocollapse */
    McListSelection.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: undefined, decorators: [{ type: core.Attribute, args: ['tabindex',] },] },
    ]; };
    McListSelection.propDecorators = {
        "options": [{ type: core.ContentChildren, args: [McListOption,] },],
        "selectionChange": [{ type: core.Output },],
    };
    return McListSelection;
}(_McListSelectionMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var McListBase = /** @class */ (function () {
    function McListBase() {
    }
    return McListBase;
}());
var McList = /** @class */ (function (_super) {
    __extends(McList, _super);
    function McList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    McList.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-list',
                    host: { class: 'mc-list' },
                    template: '<ng-content></ng-content>',
                    styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}@-webkit-keyframes mc-progress{from{background-position:0 0}to{background-position:60px 0}}@keyframes mc-progress{from{background-position:40px 0}to{background-position:0 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;top:0;left:0;width:100%;height:100%;animation:mc-progress 2s linear infinite;background:repeating-linear-gradient(135deg,rgba(0,0,0,.05),rgba(0,0,0,.05) 15px,transparent 0,transparent 30px)}.mc-subheader{display:flex;box-sizing:border-box;padding:15px;align-items:center}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{margin:0}.mc-list,.mc-list-selection{display:block}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{height:28px;line-height:-2px}.mc-list .mc-subheader:first-child,.mc-list-selection .mc-subheader:first-child{margin-top:0}.mc-list .mc-list-item,.mc-list .mc-list-option,.mc-list-selection .mc-list-item,.mc-list-selection .mc-list-option{display:block;height:28px}.mc-list .mc-list-item .mc-list-item-content,.mc-list .mc-list-option .mc-list-item-content,.mc-list-selection .mc-list-item .mc-list-item-content,.mc-list-selection .mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:inherit;padding:0 15px}.mc-list .mc-list-item.mc-2-line,.mc-list .mc-list-option.mc-2-line,.mc-list-selection .mc-list-item.mc-2-line,.mc-list-selection .mc-list-option.mc-2-line{height:72px}.mc-list .mc-list-item.mc-3-line,.mc-list .mc-list-option.mc-3-line,.mc-list-selection .mc-list-item.mc-3-line,.mc-list-selection .mc-list-option.mc-3-line{height:88px}.mc-list .mc-list-item.mc-multi-line,.mc-list .mc-list-option.mc-multi-line,.mc-list-selection .mc-list-item.mc-multi-line,.mc-list-selection .mc-list-option.mc-multi-line{height:auto}.mc-list .mc-list-item.mc-multi-line .mc-list-item-content,.mc-list .mc-list-option.mc-multi-line .mc-list-item-content,.mc-list-selection .mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-selection .mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-bottom:16px}.mc-list .mc-list-item .mc-list-text,.mc-list .mc-list-option .mc-list-text,.mc-list-selection .mc-list-item .mc-list-text,.mc-list-selection .mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list .mc-list-item .mc-list-text>*,.mc-list .mc-list-option .mc-list-text>*,.mc-list-selection .mc-list-item .mc-list-text>*,.mc-list-selection .mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list .mc-list-item .mc-list-text:empty,.mc-list .mc-list-option .mc-list-text:empty,.mc-list-selection .mc-list-item .mc-list-text:empty,.mc-list-selection .mc-list-option .mc-list-text:empty{display:none}.mc-list .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-selection .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-selection .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0;padding-left:15px}[dir=rtl] .mc-list .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-selection .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-selection .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:15px;padding-left:0}.mc-list .mc-list-item .mc-list-icon,.mc-list .mc-list-option .mc-list-icon,.mc-list-selection .mc-list-item .mc-list-icon,.mc-list-selection .mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;height:24px;border-radius:50%;padding:4px;font-size:24px}.mc-list .mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list .mc-list-option .mc-list-icon~.mc-divider-inset,.mc-list-selection .mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list-selection .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list .mc-list-option .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-selection .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-selection .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:auto;margin-right:62px}.mc-list .mc-list-item .mc-divider,.mc-list .mc-list-option .mc-divider,.mc-list-selection .mc-list-item .mc-divider,.mc-list-selection .mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list .mc-list-item .mc-divider,[dir=rtl] .mc-list .mc-list-option .mc-divider,[dir=rtl] .mc-list-selection .mc-list-item .mc-divider,[dir=rtl] .mc-list-selection .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list .mc-list-item .mc-divider.mc-divider-inset,.mc-list .mc-list-option .mc-divider.mc-divider-inset,.mc-list-selection .mc-list-item .mc-divider.mc-divider-inset,.mc-list-selection .mc-list-option .mc-divider.mc-divider-inset{position:absolute}.mc-list-option:not([disabled]){cursor:pointer}"],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    McList.ctorParameters = function () { return []; };
    return McList;
}(McListBase));
/**
 * Directive whose purpose is to add the mc- CSS styling to this selector.
 * \@docs-private
 */
var McListSubheaderCssStyler = /** @class */ (function () {
    function McListSubheaderCssStyler() {
    }
    McListSubheaderCssStyler.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mc-subheader], [mcSubheader]',
                    host: { class: 'mc-subheader' }
                },] },
    ];
    /** @nocollapse */
    McListSubheaderCssStyler.ctorParameters = function () { return []; };
    return McListSubheaderCssStyler;
}());
var McListItemBase = /** @class */ (function () {
    function McListItemBase() {
    }
    return McListItemBase;
}());
var McListItem = /** @class */ (function (_super) {
    __extends(McListItem, _super);
    function McListItem(_element) {
        var _this = _super.call(this) || this;
        _this._element = _element;
        return _this;
    }
    /**
     * @return {?}
     */
    McListItem.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._lineSetter = new core$1.McLineSetter(this._lines, this._element);
    };
    /**
     * @return {?}
     */
    McListItem.prototype._handleFocus = /**
     * @return {?}
     */
    function () {
        this._element.nativeElement.classList.add('mc-focused');
    };
    /**
     * @return {?}
     */
    McListItem.prototype._handleBlur = /**
     * @return {?}
     */
    function () {
        this._element.nativeElement.classList.remove('mc-focused');
    };
    /**
     * @return {?}
     */
    McListItem.prototype._getHostElement = /**
     * @return {?}
     */
    function () {
        return this._element.nativeElement;
    };
    McListItem.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-list-item, a[mc-list-item]',
                    host: {
                        class: 'mc-list-item',
                        '(focus)': '_handleFocus()',
                        '(blur)': '_handleBlur()'
                    },
                    template: "<div class=\"mc-list-item-content\"><ng-content select=\"[mc-list-icon], [mcListIcon]\"></ng-content><div class=\"mc-list-text\"><ng-content select=\"[mc-line], [mcLine]\"></ng-content></div><ng-content></ng-content></div>",
                    encapsulation: core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    McListItem.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    McListItem.propDecorators = {
        "_lines": [{ type: core.ContentChildren, args: [core$1.McLine,] },],
    };
    return McListItem;
}(McListItemBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var McListModule = /** @class */ (function () {
    function McListModule() {
    }
    McListModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        platform.PlatformModule,
                        a11y.A11yModule,
                        core$1.McPseudoCheckboxModule,
                        core$1.McLineModule
                    ],
                    exports: [
                        McList,
                        McListSelection,
                        McListItem,
                        McListOption,
                        McListSubheaderCssStyler
                    ],
                    declarations: [
                        McList,
                        McListSelection,
                        McListItem,
                        McListOption,
                        McListSubheaderCssStyler
                    ]
                },] },
    ];
    /** @nocollapse */
    McListModule.ctorParameters = function () { return []; };
    return McListModule;
}());

exports.McListModule = McListModule;
exports.McListBase = McListBase;
exports.McList = McList;
exports.McListSubheaderCssStyler = McListSubheaderCssStyler;
exports.McListItemBase = McListItemBase;
exports.McListItem = McListItem;
exports.ɵb3 = MAT_SELECTION_LIST_VALUE_ACCESSOR;
exports.ɵc3 = McListOption;
exports.ɵa3 = McListOptionBase;
exports.ɵf3 = McListSelection;
exports.ɵd3 = McListSelectionBase;
exports.ɵe3 = _McListSelectionMixinBase;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-list.umd.js.map
