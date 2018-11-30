/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('rxjs'), require('@ptsecurity/cdk/a11y'), require('@ptsecurity/cdk/collections'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/mosaic/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/list', ['exports', '@angular/core', '@angular/forms', 'rxjs', '@ptsecurity/cdk/a11y', '@ptsecurity/cdk/collections', '@ptsecurity/cdk/keycodes', '@ptsecurity/mosaic/core', '@angular/common'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.list = {}),global.ng.core,global.ng.forms,global.rxjs,global.ng.cdk.a11y,global.ng.cdk.collections,global.ng.cdk.keycodes,global.ng.mosaic.core,global.ng.common));
}(this, (function (exports,core,forms,rxjs,a11y,collections,keycodes,core$1,common) { 'use strict';

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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

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
        this._hasFocus = false;
        // Whether the label should appear before or after the checkbox. Defaults to 'after'
        this.checkboxPosition = 'after';
        this._selected = false;
        this._disabled = false;
    }
    Object.defineProperty(McListOption.prototype, "disabled", {
        get: function () {
            return this._disabled || (this.listSelection && this.listSelection.disabled);
        },
        set: function (value) {
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
        get: function () {
            return this.listSelection.selectedOptions && this.listSelection.selectedOptions.isSelected(this) || false;
        },
        set: function (value) {
            var isSelected = core$1.toBoolean(value);
            if (isSelected !== this._selected) {
                this.setSelected(isSelected);
                this.listSelection._reportValueChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    McListOption.prototype.ngOnInit = function () {
        var _this = this;
        if (this._selected) {
            // List options that are selected at initialization can't be reported properly to the form
            // control. This is because it takes some time until the selection-list knows about all
            // available options. Also it can happen that the ControlValueAccessor has an initial value
            // that should be used instead. Deferring the value change report to the next tick ensures
            // that the form control value is not being overwritten.
            var wasSelected_1 = this._selected;
            Promise.resolve().then(function () {
                if (_this._selected || wasSelected_1) {
                    _this.selected = true;
                    _this._changeDetector.markForCheck();
                }
            });
        }
    };
    McListOption.prototype.ngAfterContentInit = function () {
        this._lineSetter = new core$1.McLineSetter(this._lines, this._element);
    };
    McListOption.prototype.ngOnDestroy = function () {
        var _this = this;
        if (this.selected) {
            // We have to delay this until the next tick in order
            // to avoid changed after checked errors.
            Promise.resolve().then(function () { return _this.selected = false; });
        }
        this.listSelection._removeOptionFromList(this);
    };
    McListOption.prototype.toggle = function () {
        this.selected = !this.selected;
    };
    McListOption.prototype.focus = function () {
        this._element.nativeElement.focus();
        this.listSelection.setFocusedOption(this);
    };
    McListOption.prototype.getLabel = function () {
        return this._text ? this._text.nativeElement.textContent : '';
    };
    McListOption.prototype.setSelected = function (selected) {
        if (this._selected === selected || !this.listSelection.selectedOptions) {
            return;
        }
        this._selected = selected;
        if (selected) {
            this.listSelection.selectedOptions.select(this);
        }
        else {
            this.listSelection.selectedOptions.deselect(this);
        }
        this._changeDetector.markForCheck();
    };
    McListOption.prototype._getHeight = function () {
        return this._element.nativeElement.getClientRects()[0].height;
    };
    McListOption.prototype._handleClick = function () {
        if (this.disabled) {
            return;
        }
        this.listSelection.setFocusedOption(this);
    };
    McListOption.prototype._handleFocus = function () {
        if (this.disabled || this._hasFocus) {
            return;
        }
        this._hasFocus = true;
    };
    McListOption.prototype._handleBlur = function () {
        this._hasFocus = false;
        this.listSelection._onTouched();
    };
    McListOption.prototype._getHostElement = function () {
        return this._element.nativeElement;
    };
    __decorate([
        core.ContentChildren(core$1.McLine),
        __metadata("design:type", core.QueryList)
    ], McListOption.prototype, "_lines", void 0);
    __decorate([
        core.ViewChild('text'),
        __metadata("design:type", core.ElementRef)
    ], McListOption.prototype, "_text", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McListOption.prototype, "checkboxPosition", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McListOption.prototype, "value", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McListOption.prototype, "disabled", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McListOption.prototype, "selected", null);
    McListOption = __decorate([
        core.Component({
            exportAs: 'mcListOption',
            selector: 'mc-list-option',
            host: {
                tabindex: '-1',
                class: 'mc-list-option',
                '[class.mc-selected]': 'selected',
                '[class.mc-focused]': '_hasFocus',
                '(focus)': '_handleFocus()',
                '(blur)': '_handleBlur()',
                '(click)': '_handleClick()'
            },
            template: "<div class=\"mc-list-item-content\"><div class=\"mc-list-text\" #text><ng-content></ng-content></div></div>",
            encapsulation: core.ViewEncapsulation.None,
            preserveWhitespaces: false,
            changeDetection: core.ChangeDetectionStrategy.OnPush
        }),
        __param(2, core.Inject(core.forwardRef(function () { return McListSelection; }))),
        __metadata("design:paramtypes", [core.ElementRef,
            core.ChangeDetectorRef,
            McListSelection])
    ], McListOption);
    return McListOption;
}());
var MC_SELECTION_LIST_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return McListSelection; }),
    multi: true
};
// Change event that is being fired whenever the selected state of an option changes. */
var McListSelectionChange = /** @class */ (function () {
    function McListSelectionChange(
    // Reference to the selection list that emitted the event.
    source, 
    // Reference to the option that has been changed.
    option) {
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
var _McListSelectionMixinBase = core$1.mixinDisabled(McListSelectionBase);
var McListSelection = /** @class */ (function (_super) {
    __extends(McListSelection, _super);
    function McListSelection(_element, tabIndex, autoSelect, noUnselect, multiple) {
        var _this = _super.call(this) || this;
        _this._element = _element;
        _this.horizontal = false;
        // Emits a change event whenever the selected state of an option changes.
        _this.selectionChange = new core.EventEmitter();
        _this._modelChanges = rxjs.Subscription.EMPTY;
        // View to model callback that should be called if the list or its options lost focus.
        _this._onTouched = function () { };
        // View to model callback that should be called whenever the selected options change.
        _this._onChange = function (_) { };
        _this.autoSelect = autoSelect === null ? true : core$1.toBoolean(autoSelect);
        _this.multiple = multiple === null ? true : core$1.toBoolean(multiple);
        _this.noUnselect = noUnselect === null ? true : core$1.toBoolean(noUnselect);
        _this.tabIndex = parseInt(tabIndex) || 0;
        _this.selectedOptions = new collections.SelectionModel(_this.multiple);
        return _this;
    }
    McListSelection.prototype.ngAfterContentInit = function () {
        this.horizontal = core$1.toBoolean(this.horizontal);
        this._keyManager = new a11y.FocusKeyManager(this.options)
            .withTypeAhead()
            .withVerticalOrientation(!this.horizontal)
            .withHorizontalOrientation(this.horizontal ? 'ltr' : null);
        if (this._tempValues) {
            this._setOptionsFromValues(this._tempValues);
            this._tempValues = null;
        }
        // Sync external changes to the model back to the options.
        this._modelChanges = this.selectedOptions.onChange.subscribe(function (event) {
            for (var _i = 0, _a = event.added; _i < _a.length; _i++) {
                var item = _a[_i];
                item.selected = true;
            }
            for (var _b = 0, _c = event.removed; _b < _c.length; _b++) {
                var item = _c[_b];
                item.selected = false;
            }
        });
        this.updateScrollSize();
    };
    McListSelection.prototype.ngOnDestroy = function () {
        this._modelChanges.unsubscribe();
    };
    McListSelection.prototype.focus = function () {
        this._element.nativeElement.focus();
    };
    McListSelection.prototype.selectAll = function () {
        this.options.forEach(function (option) { return option.setSelected(true); });
        this._reportValueChange();
    };
    McListSelection.prototype.deselectAll = function () {
        this.options.forEach(function (option) { return option.setSelected(false); });
        this._reportValueChange();
    };
    McListSelection.prototype.updateScrollSize = function () {
        if (this.horizontal || !this.options.first) {
            return;
        }
        this._keyManager.withScrollSize(Math.floor(this._getHeight() / this.options.first._getHeight()));
    };
    // Sets the focused option of the selection-list.
    McListSelection.prototype.setFocusedOption = function (option) {
        this._keyManager.updateActiveItem(option);
        if (this.withShift && this.multiple) {
            var previousIndex_1 = this._keyManager.previousActiveItemIndex;
            var activeIndex_1 = this._keyManager.activeItemIndex;
            if (previousIndex_1 < activeIndex_1) {
                this.options.forEach(function (item, index) {
                    if (index >= previousIndex_1 && index <= activeIndex_1) {
                        item.setSelected(true);
                    }
                });
            }
            else {
                this.options.forEach(function (item, index) {
                    if (index >= activeIndex_1 && index <= previousIndex_1) {
                        item.setSelected(true);
                    }
                });
            }
            this.withShift = false;
        }
        else if (this.withCtrl) {
            this.withCtrl = false;
            if (!this._canDeselectLast(option)) {
                return;
            }
            option.toggle();
        }
        else {
            if (this.autoSelect) {
                this.options.forEach(function (item) { return item.setSelected(false); });
                option.setSelected(true);
            }
        }
        this._emitChangeEvent(option);
        this._reportValueChange();
    };
    // Implemented as part of ControlValueAccessor.
    McListSelection.prototype.writeValue = function (values) {
        if (this.options) {
            this._setOptionsFromValues(values || []);
        }
        else {
            this._tempValues = values;
        }
    };
    // Implemented as part of ControlValueAccessor.
    McListSelection.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    // Implemented as part of ControlValueAccessor.
    McListSelection.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    // Implemented as a part of ControlValueAccessor.
    McListSelection.prototype.setDisabledState = function (isDisabled) {
        if (this.options) {
            this.options.forEach(function (option) { return option.disabled = isDisabled; });
        }
    };
    McListSelection.prototype.getSelectedOptionValues = function () {
        return this.options.filter(function (option) { return option.selected; }).map(function (option) { return option.value; });
    };
    // Toggles the selected state of the currently focused option.
    McListSelection.prototype.toggleFocusedOption = function () {
        var focusedIndex = this._keyManager.activeItemIndex;
        if (focusedIndex != null && this._isValidIndex(focusedIndex)) {
            var focusedOption = this.options.toArray()[focusedIndex];
            if (focusedOption && this._canDeselectLast(focusedOption)) {
                focusedOption.toggle();
                // Emit a change event because the focused option changed its state through user interaction.
                this._emitChangeEvent(focusedOption);
            }
        }
    };
    McListSelection.prototype._canDeselectLast = function (listOption) {
        return !(this.noUnselect && this.selectedOptions.selected.length === 1 && listOption.selected);
    };
    McListSelection.prototype._getHeight = function () {
        return this._element.nativeElement.getClientRects()[0].height;
    };
    // Removes an option from the selection list and updates the active item.
    McListSelection.prototype._removeOptionFromList = function (option) {
        if (option._hasFocus) {
            var optionIndex = this._getOptionIndex(option);
            // Check whether the option is the last item
            if (optionIndex > 0) {
                this._keyManager.setPreviousItemActive();
            }
            else if (optionIndex === 0 && this.options.length > 1) {
                this._keyManager.setNextItemActive();
            }
        }
    };
    McListSelection.prototype._onKeyDown = function (event) {
        var keyCode = event.keyCode;
        this.withShift = event.shiftKey;
        this.withCtrl = event.ctrlKey;
        switch (keyCode) {
            case keycodes.SPACE:
            case keycodes.ENTER:
                this.toggleFocusedOption();
                event.preventDefault();
                break;
            case keycodes.HOME:
                this._keyManager.setFirstItemActive();
                event.preventDefault();
                break;
            case keycodes.END:
                this._keyManager.setLastItemActive();
                event.preventDefault();
                break;
            case keycodes.PAGE_UP:
                if (!this.horizontal) {
                    this._keyManager.setPreviousPageItemActive();
                }
                event.preventDefault();
                break;
            case keycodes.PAGE_DOWN:
                if (!this.horizontal) {
                    this._keyManager.setNextPageItemActive();
                }
                event.preventDefault();
                break;
            default:
                this._keyManager.onKeydown(event);
        }
    };
    // Reports a value change to the ControlValueAccessor
    McListSelection.prototype._reportValueChange = function () {
        if (this.options) {
            this._onChange(this.getSelectedOptionValues());
        }
    };
    // Emits a change event if the selected state of an option changed.
    McListSelection.prototype._emitChangeEvent = function (option) {
        this.selectionChange.emit(new McListSelectionChange(this, option));
    };
    // Returns the option with the specified value.
    McListSelection.prototype._getOptionByValue = function (value) {
        return this.options.find(function (option) { return option.value === value; });
    };
    // Sets the selected options based on the specified values.
    McListSelection.prototype._setOptionsFromValues = function (values) {
        var _this = this;
        this.options.forEach(function (option) { return option.setSelected(false); });
        values
            .map(function (value) { return _this._getOptionByValue(value); })
            .filter(Boolean)
            .forEach(function (option) { return option.setSelected(true); });
    };
    /**
     * Utility to ensure all indexes are valid.
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of options.
     */
    McListSelection.prototype._isValidIndex = function (index) {
        return index >= 0 && index < this.options.length;
    };
    // Returns the index of the specified list option.
    McListSelection.prototype._getOptionIndex = function (option) {
        return this.options.toArray().indexOf(option);
    };
    __decorate([
        core.ContentChildren(McListOption),
        __metadata("design:type", core.QueryList)
    ], McListSelection.prototype, "options", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean)
    ], McListSelection.prototype, "horizontal", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McListSelection.prototype, "selectionChange", void 0);
    McListSelection = __decorate([
        core.Component({
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
                '(blur)': '_onTouched()',
                '(keydown)': '_onKeyDown($event)',
                '(window:resize)': 'updateScrollSize()'
            },
            providers: [MC_SELECTION_LIST_VALUE_ACCESSOR],
            preserveWhitespaces: false
        }),
        __param(1, core.Attribute('tabindex')),
        __param(2, core.Attribute('auto-select')),
        __param(3, core.Attribute('no-unselect')),
        __param(4, core.Attribute('multiple')),
        __metadata("design:paramtypes", [core.ElementRef, String, String, String, String])
    ], McListSelection);
    return McListSelection;
}(_McListSelectionMixinBase));

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
    McList = __decorate([
        core.Component({
            selector: 'mc-list',
            host: { class: 'mc-list' },
            template: '<ng-content></ng-content>',
            styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-list,.mc-list-selection{display:block;outline:0}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{display:flex;box-sizing:border-box;height:32px;line-height:2px;padding:15px;align-items:center}.mc-list .mc-subheader:first-child,.mc-list-selection .mc-subheader:first-child{margin-top:0}.mc-list .mc-list .mc-subheader,.mc-list .mc-list-selection .mc-subheader,.mc-list-selection .mc-list .mc-subheader,.mc-list-selection .mc-list-selection .mc-subheader{margin:0}.mc-list-item,.mc-list-option{display:block;height:32px;border:2px solid transparent}.mc-list-item .mc-list-item-content,.mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:100%;padding:0 15px}.mc-list-item.mc-2-line,.mc-list-option.mc-2-line{height:72px}.mc-list-item.mc-3-line,.mc-list-option.mc-3-line{height:88px}.mc-list-item.mc-multi-line,.mc-list-option.mc-multi-line{height:auto}.mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-bottom:16px}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;height:24px;border-radius:50%;padding:4px;font-size:24px}.mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:auto;margin-right:62px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider-inset,.mc-list-option .mc-divider.mc-divider-inset{position:absolute}.mc-list-option:not([disabled]){cursor:pointer}"],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None
        })
    ], McList);
    return McList;
}(McListBase));
/**
 * Directive whose purpose is to add the mc- CSS styling to this selector.
 * @docs-private
 */
var McListSubheaderCssStyler = /** @class */ (function () {
    function McListSubheaderCssStyler() {
    }
    McListSubheaderCssStyler = __decorate([
        core.Directive({
            selector: '[mc-subheader], [mcSubheader]',
            host: { class: 'mc-subheader' }
        })
    ], McListSubheaderCssStyler);
    return McListSubheaderCssStyler;
}());
// Boilerplate for applying mixins to McListItem.
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
    McListItem.prototype.ngAfterContentInit = function () {
        this._lineSetter = new core$1.McLineSetter(this._lines, this._element);
    };
    McListItem.prototype._handleFocus = function () {
        this._element.nativeElement.classList.add('mc-focused');
    };
    McListItem.prototype._handleBlur = function () {
        this._element.nativeElement.classList.remove('mc-focused');
    };
    McListItem.prototype._getHostElement = function () {
        return this._element.nativeElement;
    };
    __decorate([
        core.ContentChildren(core$1.McLine),
        __metadata("design:type", core.QueryList)
    ], McListItem.prototype, "_lines", void 0);
    McListItem = __decorate([
        core.Component({
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
        }),
        __metadata("design:paramtypes", [core.ElementRef])
    ], McListItem);
    return McListItem;
}(McListItemBase));

var McListModule = /** @class */ (function () {
    function McListModule() {
    }
    McListModule = __decorate([
        core.NgModule({
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
        })
    ], McListModule);
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
