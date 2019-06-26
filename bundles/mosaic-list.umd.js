/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@ptsecurity/cdk/a11y'), require('@ptsecurity/cdk/collections'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/mosaic/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/list', ['exports', '@angular/core', '@angular/forms', '@ptsecurity/cdk/a11y', '@ptsecurity/cdk/collections', '@ptsecurity/cdk/keycodes', '@ptsecurity/mosaic/core', 'rxjs', 'rxjs/operators', '@angular/common'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.list = {}),global.ng.core,global.ng.forms,global.ng.cdk.a11y,global.ng.cdk.collections,global.ng.cdk.keycodes,global.ng.mosaic.core,global.rxjs,global.rxjs.operators,global.ng.common));
}(this, (function (exports,core,forms,a11y,collections,keycodes,core$1,rxjs,operators,common) { 'use strict';

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

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Component for list-options of selection-list. Each list-option can automatically
 * generate a checkbox and can put current item into the selectionModel of selection-list
 * if the current item is selected.
 */
var McListOption = /** @class */ (function () {
    function McListOption(_element, _changeDetector, listSelection) {
        this._element = _element;
        this._changeDetector = _changeDetector;
        this.listSelection = listSelection;
        this.hasFocus = false;
        // Whether the label should appear before or after the checkbox. Defaults to 'after'
        this.checkboxPosition = 'after';
        this._disabled = false;
        this._selected = false;
    }
    Object.defineProperty(McListOption.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled || (this.listSelection && this.listSelection.disabled);
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var newValue = core$1.toBoolean(value);
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
            return this.listSelection.selectionModel && this.listSelection.selectionModel.isSelected(this) || false;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var isSelected = core$1.toBoolean(value);
            if (isSelected !== this._selected) {
                this.setSelected(isSelected);
                this.listSelection.reportValueChange();
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
            /** @type {?} */
            var wasSelected_1 = this._selected;
            Promise.resolve().then((/**
             * @return {?}
             */
            function () {
                if (_this._selected || wasSelected_1) {
                    _this.selected = true;
                    _this._changeDetector.markForCheck();
                }
            }));
        }
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
            Promise.resolve().then((/**
             * @return {?}
             */
            function () { return _this.selected = false; }));
        }
        this.listSelection.removeOptionFromList(this);
    };
    /**
     * @return {?}
     */
    McListOption.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.selected = !this.selected;
    };
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
     * @return {?}
     */
    McListOption.prototype.getLabel = /**
     * @return {?}
     */
    function () {
        return this.text ? this.text.nativeElement.textContent : '';
    };
    /**
     * @param {?} selected
     * @return {?}
     */
    McListOption.prototype.setSelected = /**
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        if (this._selected === selected || !this.listSelection.selectionModel) {
            return;
        }
        this._selected = selected;
        if (selected) {
            this.listSelection.selectionModel.select(this);
        }
        else {
            this.listSelection.selectionModel.deselect(this);
        }
        this._changeDetector.markForCheck();
    };
    /**
     * @return {?}
     */
    McListOption.prototype.getHeight = /**
     * @return {?}
     */
    function () {
        return this._element.nativeElement.getClientRects()[0].height;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    McListOption.prototype.handleClick = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (this.disabled) {
            return;
        }
        this.listSelection.setFocusedOption(this, $event);
    };
    /**
     * @return {?}
     */
    McListOption.prototype.handleFocus = /**
     * @return {?}
     */
    function () {
        if (this.disabled || this.hasFocus) {
            return;
        }
        this.hasFocus = true;
    };
    /**
     * @return {?}
     */
    McListOption.prototype.handleBlur = /**
     * @return {?}
     */
    function () {
        this.hasFocus = false;
        this.listSelection.onTouched();
    };
    /**
     * @return {?}
     */
    McListOption.prototype.getHostElement = /**
     * @return {?}
     */
    function () {
        return this._element.nativeElement;
    };
    McListOption.decorators = [
        { type: core.Component, args: [{
                    exportAs: 'mcListOption',
                    selector: 'mc-list-option',
                    host: {
                        tabindex: '-1',
                        class: 'mc-list-option',
                        '[class.mc-selected]': 'selected',
                        '[class.mc-focused]': 'hasFocus',
                        '(focus)': 'handleFocus()',
                        '(blur)': 'handleBlur()',
                        '(click)': 'handleClick($event)'
                    },
                    template: "<div class=\"mc-list-item-content\"><div class=\"mc-list-text\" #text><ng-content></ng-content></div></div>",
                    encapsulation: core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    McListOption.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef },
        { type: McListSelection, decorators: [{ type: core.Inject, args: [core.forwardRef((/**
                         * @return {?}
                         */
                        function () { return McListSelection; })),] }] }
    ]; };
    McListOption.propDecorators = {
        lines: [{ type: core.ContentChildren, args: [core$1.McLine,] }],
        text: [{ type: core.ViewChild, args: ['text', { static: false },] }],
        checkboxPosition: [{ type: core.Input }],
        value: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        selected: [{ type: core.Input }]
    };
    return McListOption;
}());
/** @type {?} */
var MC_SELECTION_LIST_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef((/**
     * @return {?}
     */
    function () { return McListSelection; })),
    multi: true
};
var McListSelectionChange = /** @class */ (function () {
    function McListSelectionChange(source, option) {
        this.source = source;
        this.option = option;
    }
    return McListSelectionChange;
}());
var McListSelectionBase = /** @class */ (function () {
    function McListSelectionBase() {
    }
    return McListSelectionBase;
}());
// tslint:disable-next-line:naming-convention
/** @type {?} */
var _McListSelectionMixinBase = core$1.mixinDisabled(McListSelectionBase);
var McListSelection = /** @class */ (function (_super) {
    __extends(McListSelection, _super);
    function McListSelection(element, tabIndex, autoSelect, noUnselect, multiple) {
        var _this = _super.call(this) || this;
        _this.element = element;
        _this.horizontal = false;
        // Emits a change event whenever the selected state of an option changes.
        _this.selectionChange = new core.EventEmitter();
        /**
         * Emits whenever the component is destroyed.
         */
        _this.destroy = new rxjs.Subject();
        // View to model callback that should be called if the list or its options lost focus.
        // tslint:disable-next-line:no-empty
        _this.onTouched = (/**
         * @return {?}
         */
        function () { });
        // View to model callback that should be called whenever the selected options change.
        _this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
        _this.autoSelect = autoSelect === null ? true : core$1.toBoolean(autoSelect);
        _this.multiple = multiple === null ? true : core$1.toBoolean(multiple);
        _this.noUnselect = noUnselect === null ? true : core$1.toBoolean(noUnselect);
        _this.tabIndex = parseInt(tabIndex) || 0;
        _this.selectionModel = new collections.SelectionModel(_this.multiple);
        return _this;
    }
    /**
     * @return {?}
     */
    McListSelection.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.horizontal = core$1.toBoolean(this.horizontal);
        this.keyManager = new a11y.FocusKeyManager(this.options)
            .withTypeAhead()
            .withVerticalOrientation(!this.horizontal)
            .withHorizontalOrientation(this.horizontal ? 'ltr' : null);
        if (this.tempValues) {
            this.setOptionsFromValues(this.tempValues);
            this.tempValues = null;
        }
        this.selectionModel.changed
            .pipe(operators.takeUntil(this.destroy))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            for (var _i = 0, _a = event.added; _i < _a.length; _i++) {
                var item = _a[_i];
                item.selected = true;
            }
            for (var _b = 0, _c = event.removed; _b < _c.length; _b++) {
                var item = _c[_b];
                item.selected = false;
            }
        }));
        this.updateScrollSize();
    };
    /**
     * @return {?}
     */
    McListSelection.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy.next();
        this.destroy.complete();
    };
    /**
     * @return {?}
     */
    McListSelection.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.element.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    McListSelection.prototype.selectAll = /**
     * @return {?}
     */
    function () {
        this.options.forEach((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return option.setSelected(true); }));
        this.reportValueChange();
    };
    /**
     * @return {?}
     */
    McListSelection.prototype.deselectAll = /**
     * @return {?}
     */
    function () {
        this.options.forEach((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return option.setSelected(false); }));
        this.reportValueChange();
    };
    /**
     * @return {?}
     */
    McListSelection.prototype.updateScrollSize = /**
     * @return {?}
     */
    function () {
        if (this.horizontal || !this.options.first) {
            return;
        }
        this.keyManager.withScrollSize(Math.floor(this.getHeight() / this.options.first.getHeight()));
    };
    // Sets the focused option of the selection-list.
    // Sets the focused option of the selection-list.
    /**
     * @param {?} option
     * @param {?=} $event
     * @return {?}
     */
    McListSelection.prototype.setFocusedOption = 
    // Sets the focused option of the selection-list.
    /**
     * @param {?} option
     * @param {?=} $event
     * @return {?}
     */
    function (option, $event) {
        this.keyManager.setActiveItem(option);
        /** @type {?} */
        var withShift = $event ? keycodes.hasModifierKey($event, 'shiftKey') : false;
        /** @type {?} */
        var withCtrl = $event ? keycodes.hasModifierKey($event, 'ctrlKey') : false;
        if (withShift && this.multiple) {
            /** @type {?} */
            var previousIndex_1 = this.keyManager.previousActiveItemIndex;
            /** @type {?} */
            var activeIndex_1 = this.keyManager.activeItemIndex;
            if (previousIndex_1 < activeIndex_1) {
                this.options.forEach((/**
                 * @param {?} item
                 * @param {?} index
                 * @return {?}
                 */
                function (item, index) {
                    if (index >= previousIndex_1 && index <= activeIndex_1) {
                        item.setSelected(true);
                    }
                }));
            }
            else {
                this.options.forEach((/**
                 * @param {?} item
                 * @param {?} index
                 * @return {?}
                 */
                function (item, index) {
                    if (index >= activeIndex_1 && index <= previousIndex_1) {
                        item.setSelected(true);
                    }
                }));
            }
        }
        else if (withCtrl) {
            if (!this.canDeselectLast(option)) {
                return;
            }
            option.toggle();
        }
        else {
            if (this.autoSelect) {
                this.options.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.setSelected(false); }));
                option.setSelected(true);
            }
        }
        this.emitChangeEvent(option);
        this.reportValueChange();
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} values
     * @return {?}
     */
    McListSelection.prototype.writeValue = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} values
     * @return {?}
     */
    function (values) {
        if (this.options) {
            this.setOptionsFromValues(values || []);
        }
        else {
            this.tempValues = values;
        }
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    McListSelection.prototype.registerOnChange = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    McListSelection.prototype.registerOnTouched = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    // Implemented as a part of ControlValueAccessor.
    // Implemented as a part of ControlValueAccessor.
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    McListSelection.prototype.setDisabledState = 
    // Implemented as a part of ControlValueAccessor.
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        if (this.options) {
            this.options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return option.disabled = isDisabled; }));
        }
    };
    /**
     * @return {?}
     */
    McListSelection.prototype.getSelectedOptionValues = /**
     * @return {?}
     */
    function () {
        return this.options.filter((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return option.selected; })).map((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return option.value; }));
    };
    // Toggles the selected state of the currently focused option.
    // Toggles the selected state of the currently focused option.
    /**
     * @return {?}
     */
    McListSelection.prototype.toggleFocusedOption = 
    // Toggles the selected state of the currently focused option.
    /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var focusedIndex = this.keyManager.activeItemIndex;
        if (focusedIndex != null && this.isValidIndex(focusedIndex)) {
            /** @type {?} */
            var focusedOption = this.options.toArray()[focusedIndex];
            if (focusedOption && this.canDeselectLast(focusedOption)) {
                focusedOption.toggle();
                // Emit a change event because the focused option changed its state through user interaction.
                this.emitChangeEvent(focusedOption);
            }
        }
    };
    /**
     * @param {?} listOption
     * @return {?}
     */
    McListSelection.prototype.canDeselectLast = /**
     * @param {?} listOption
     * @return {?}
     */
    function (listOption) {
        return !(this.noUnselect && this.selectionModel.selected.length === 1 && listOption.selected);
    };
    /**
     * @return {?}
     */
    McListSelection.prototype.getHeight = /**
     * @return {?}
     */
    function () {
        return this.element.nativeElement.getClientRects()[0].height;
    };
    // Removes an option from the selection list and updates the active item.
    // Removes an option from the selection list and updates the active item.
    /**
     * @param {?} option
     * @return {?}
     */
    McListSelection.prototype.removeOptionFromList = 
    // Removes an option from the selection list and updates the active item.
    /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (option.hasFocus) {
            /** @type {?} */
            var optionIndex = this.getOptionIndex(option);
            // Check whether the option is the last item
            if (optionIndex > 0) {
                this.keyManager.setPreviousItemActive();
            }
            else if (optionIndex === 0 && this.options.length > 1) {
                this.keyManager.setNextItemActive();
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McListSelection.prototype.onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var keyCode = event.keyCode;
        switch (keyCode) {
            case keycodes.SPACE:
            case keycodes.ENTER:
                this.toggleFocusedOption();
                break;
            case keycodes.TAB:
                this.keyManager.tabOut.next();
                return;
            case keycodes.DOWN_ARROW:
                this.keyManager.setNextItemActive();
                break;
            case keycodes.UP_ARROW:
                this.keyManager.setPreviousItemActive();
                break;
            case keycodes.HOME:
                this.keyManager.setFirstItemActive();
                break;
            case keycodes.END:
                this.keyManager.setLastItemActive();
                break;
            case keycodes.PAGE_UP:
                this.keyManager.setPreviousPageItemActive();
                break;
            case keycodes.PAGE_DOWN:
                this.keyManager.setNextPageItemActive();
                break;
            default:
                return;
        }
        event.preventDefault();
        this.setFocusedOption((/** @type {?} */ (this.keyManager.activeItem)), event);
    };
    // Reports a value change to the ControlValueAccessor
    // Reports a value change to the ControlValueAccessor
    /**
     * @return {?}
     */
    McListSelection.prototype.reportValueChange = 
    // Reports a value change to the ControlValueAccessor
    /**
     * @return {?}
     */
    function () {
        if (this.options) {
            this.onChange(this.getSelectedOptionValues());
        }
    };
    // Emits a change event if the selected state of an option changed.
    // Emits a change event if the selected state of an option changed.
    /**
     * @param {?} option
     * @return {?}
     */
    McListSelection.prototype.emitChangeEvent = 
    // Emits a change event if the selected state of an option changed.
    /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this.selectionChange.emit(new McListSelectionChange(this, option));
    };
    // Returns the option with the specified value.
    // Returns the option with the specified value.
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    McListSelection.prototype.getOptionByValue = 
    // Returns the option with the specified value.
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.options.find((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return option.value === value; }));
    };
    // Sets the selected options based on the specified values.
    // Sets the selected options based on the specified values.
    /**
     * @private
     * @param {?} values
     * @return {?}
     */
    McListSelection.prototype.setOptionsFromValues = 
    // Sets the selected options based on the specified values.
    /**
     * @private
     * @param {?} values
     * @return {?}
     */
    function (values) {
        var _this = this;
        this.options.forEach((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return option.setSelected(false); }));
        values
            .map((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _this.getOptionByValue(value); }))
            .filter(Boolean)
            .forEach((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return (/** @type {?} */ (option)).setSelected(true); }));
    };
    /**
     * Utility to ensure all indexes are valid.
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of options.
     */
    /**
     * Utility to ensure all indexes are valid.
     * @private
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of options.
     */
    McListSelection.prototype.isValidIndex = /**
     * Utility to ensure all indexes are valid.
     * @private
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of options.
     */
    function (index) {
        return index >= 0 && index < this.options.length;
    };
    // Returns the index of the specified list option.
    // Returns the index of the specified list option.
    /**
     * @private
     * @param {?} option
     * @return {?}
     */
    McListSelection.prototype.getOptionIndex = 
    // Returns the index of the specified list option.
    /**
     * @private
     * @param {?} option
     * @return {?}
     */
    function (option) {
        return this.options.toArray().indexOf(option);
    };
    McListSelection.decorators = [
        { type: core.Component, args: [{
                    exportAs: 'mcListSelection',
                    selector: 'mc-list-selection',
                    template: '<ng-content></ng-content>',
                    styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-list,.mc-list-selection{display:block;outline:0}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{display:flex;box-sizing:border-box;height:32px;line-height:2px;padding:15px;align-items:center}.mc-list .mc-subheader:first-child,.mc-list-selection .mc-subheader:first-child{margin-top:0}.mc-list .mc-list .mc-subheader,.mc-list .mc-list-selection .mc-subheader,.mc-list-selection .mc-list .mc-subheader,.mc-list-selection .mc-list-selection .mc-subheader{margin:0}.mc-list-item,.mc-list-option{display:block;height:32px;border:2px solid transparent}.mc-list-item .mc-list-item-content,.mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:100%;padding:0 15px}.mc-list-item.mc-2-line,.mc-list-option.mc-2-line{height:72px}.mc-list-item.mc-3-line,.mc-list-option.mc-3-line{height:88px}.mc-list-item.mc-multi-line,.mc-list-option.mc-multi-line{height:auto}.mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-bottom:16px}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;height:24px;border-radius:50%;padding:4px;font-size:24px}.mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:auto;margin-right:62px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider-inset,.mc-list-option .mc-divider.mc-divider-inset{position:absolute}.mc-list-option:not([disabled]){cursor:pointer}"],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    inputs: ['disabled', 'tabIndex'],
                    host: {
                        class: 'mc-list-selection',
                        '[tabIndex]': 'tabIndex',
                        '(focus)': 'focus()',
                        '(blur)': 'onTouched()',
                        '(keydown)': 'onKeyDown($event)',
                        '(window:resize)': 'updateScrollSize()'
                    },
                    providers: [MC_SELECTION_LIST_VALUE_ACCESSOR],
                    preserveWhitespaces: false
                },] },
    ];
    /** @nocollapse */
    McListSelection.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: String, decorators: [{ type: core.Attribute, args: ['tabindex',] }] },
        { type: String, decorators: [{ type: core.Attribute, args: ['auto-select',] }] },
        { type: String, decorators: [{ type: core.Attribute, args: ['no-unselect',] }] },
        { type: String, decorators: [{ type: core.Attribute, args: ['multiple',] }] }
    ]; };
    McListSelection.propDecorators = {
        options: [{ type: core.ContentChildren, args: [McListOption,] }],
        horizontal: [{ type: core.Input }],
        selectionChange: [{ type: core.Output }]
    };
    return McListSelection;
}(_McListSelectionMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                    styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-list,.mc-list-selection{display:block;outline:0}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{display:flex;box-sizing:border-box;height:32px;line-height:2px;padding:15px;align-items:center}.mc-list .mc-subheader:first-child,.mc-list-selection .mc-subheader:first-child{margin-top:0}.mc-list .mc-list .mc-subheader,.mc-list .mc-list-selection .mc-subheader,.mc-list-selection .mc-list .mc-subheader,.mc-list-selection .mc-list-selection .mc-subheader{margin:0}.mc-list-item,.mc-list-option{display:block;height:32px;border:2px solid transparent}.mc-list-item .mc-list-item-content,.mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:100%;padding:0 15px}.mc-list-item.mc-2-line,.mc-list-option.mc-2-line{height:72px}.mc-list-item.mc-3-line,.mc-list-option.mc-3-line{height:88px}.mc-list-item.mc-multi-line,.mc-list-option.mc-multi-line{height:auto}.mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-bottom:16px}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;height:24px;border-radius:50%;padding:4px;font-size:24px}.mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:auto;margin-right:62px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider-inset,.mc-list-option .mc-divider.mc-divider-inset{position:absolute}.mc-list-option:not([disabled]){cursor:pointer}"],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None
                },] },
    ];
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
    return McListSubheaderCssStyler;
}());
// Boilerplate for applying mixins to McListItem.
var   
// Boilerplate for applying mixins to McListItem.
McListItemBase = /** @class */ (function () {
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
        this.lineSetter = new core$1.McLineSetter(this.lines, this._element);
    };
    /**
     * @return {?}
     */
    McListItem.prototype.handleFocus = /**
     * @return {?}
     */
    function () {
        this._element.nativeElement.classList.add('mc-focused');
    };
    /**
     * @return {?}
     */
    McListItem.prototype.handleBlur = /**
     * @return {?}
     */
    function () {
        this._element.nativeElement.classList.remove('mc-focused');
    };
    /**
     * @return {?}
     */
    McListItem.prototype.getHostElement = /**
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
                        '(focus)': 'handleFocus()',
                        '(blur)': 'handleBlur()'
                    },
                    template: "<div class=\"mc-list-item-content\"><ng-content select=\"[mc-list-icon], [mcListIcon]\"></ng-content><div class=\"mc-list-text\"><ng-content select=\"[mc-line], [mcLine]\"></ng-content></div><ng-content></ng-content></div>",
                    encapsulation: core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    McListItem.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    McListItem.propDecorators = {
        lines: [{ type: core.ContentChildren, args: [core$1.McLine,] }]
    };
    return McListItem;
}(McListItemBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McListModule = /** @class */ (function () {
    function McListModule() {
    }
    McListModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        a11y.A11yModule,
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
    return McListModule;
}());

exports.McListModule = McListModule;
exports.McListBase = McListBase;
exports.McList = McList;
exports.McListSubheaderCssStyler = McListSubheaderCssStyler;
exports.McListItemBase = McListItemBase;
exports.McListItem = McListItem;
exports.McListOption = McListOption;
exports.MC_SELECTION_LIST_VALUE_ACCESSOR = MC_SELECTION_LIST_VALUE_ACCESSOR;
exports.McListSelectionChange = McListSelectionChange;
exports.McListSelectionBase = McListSelectionBase;
exports._McListSelectionMixinBase = _McListSelectionMixinBase;
exports.McListSelection = McListSelection;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-list.umd.js.map
