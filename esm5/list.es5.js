/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __metadata, __param, __extends } from 'tslib';
import { Attribute, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Input, Output, QueryList, ViewEncapsulation, ChangeDetectorRef, Inject, ViewChild, Directive, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FocusKeyManager, A11yModule } from '@ptsecurity/cdk/a11y';
import { SelectionModel } from '@ptsecurity/cdk/collections';
import { END, ENTER, HOME, PAGE_DOWN, PAGE_UP, SPACE } from '@ptsecurity/cdk/keycodes';
import { McLine, McLineSetter, mixinDisabled, toBoolean, McLineModule } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';

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
            var newValue = toBoolean(value);
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
            var isSelected = toBoolean(value);
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
        this._lineSetter = new McLineSetter(this._lines, this._element);
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
        ContentChildren(McLine),
        __metadata("design:type", QueryList)
    ], McListOption.prototype, "_lines", void 0);
    __decorate([
        ViewChild('text'),
        __metadata("design:type", ElementRef)
    ], McListOption.prototype, "_text", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], McListOption.prototype, "checkboxPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], McListOption.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McListOption.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McListOption.prototype, "selected", null);
    McListOption = __decorate([
        Component({
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
            encapsulation: ViewEncapsulation.None,
            preserveWhitespaces: false,
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param(2, Inject(forwardRef(function () { return McListSelection; }))),
        __metadata("design:paramtypes", [ElementRef,
            ChangeDetectorRef,
            McListSelection])
    ], McListOption);
    return McListOption;
}());
var MC_SELECTION_LIST_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return McListSelection; }),
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
var _McListSelectionMixinBase = mixinDisabled(McListSelectionBase);
var McListSelection = /** @class */ (function (_super) {
    __extends(McListSelection, _super);
    function McListSelection(_element, tabIndex, autoSelect, noUnselect, multiple) {
        var _this = _super.call(this) || this;
        _this._element = _element;
        _this.horizontal = false;
        // Emits a change event whenever the selected state of an option changes.
        _this.selectionChange = new EventEmitter();
        _this._modelChanges = Subscription.EMPTY;
        // View to model callback that should be called if the list or its options lost focus.
        _this._onTouched = function () { };
        // View to model callback that should be called whenever the selected options change.
        _this._onChange = function (_) { };
        _this.autoSelect = autoSelect === null ? true : toBoolean(autoSelect);
        _this.multiple = multiple === null ? true : toBoolean(multiple);
        _this.noUnselect = noUnselect === null ? true : toBoolean(noUnselect);
        _this.tabIndex = parseInt(tabIndex) || 0;
        _this.selectedOptions = new SelectionModel(_this.multiple);
        return _this;
    }
    McListSelection.prototype.ngAfterContentInit = function () {
        this.horizontal = toBoolean(this.horizontal);
        this._keyManager = new FocusKeyManager(this.options)
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
            case SPACE:
            case ENTER:
                this.toggleFocusedOption();
                event.preventDefault();
                break;
            case HOME:
                this._keyManager.setFirstItemActive();
                event.preventDefault();
                break;
            case END:
                this._keyManager.setLastItemActive();
                event.preventDefault();
                break;
            case PAGE_UP:
                if (!this.horizontal) {
                    this._keyManager.setPreviousPageItemActive();
                }
                event.preventDefault();
                break;
            case PAGE_DOWN:
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
        ContentChildren(McListOption),
        __metadata("design:type", QueryList)
    ], McListSelection.prototype, "options", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], McListSelection.prototype, "horizontal", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McListSelection.prototype, "selectionChange", void 0);
    McListSelection = __decorate([
        Component({
            exportAs: 'mcListSelection',
            selector: 'mc-list-selection',
            template: '<ng-content></ng-content>',
            styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-subheader{display:flex;box-sizing:border-box;padding:15px;align-items:center}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{margin:0}.mc-list,.mc-list-selection{display:block}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{height:32px;line-height:2px}.mc-list .mc-subheader:first-child,.mc-list-selection .mc-subheader:first-child{margin-top:0}.mc-list .mc-list-item,.mc-list .mc-list-option,.mc-list-selection .mc-list-item,.mc-list-selection .mc-list-option{display:block;height:32px}.mc-list .mc-list-item .mc-list-item-content,.mc-list .mc-list-option .mc-list-item-content,.mc-list-selection .mc-list-item .mc-list-item-content,.mc-list-selection .mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:100%;padding:0 15px}.mc-list .mc-list-item.mc-2-line,.mc-list .mc-list-option.mc-2-line,.mc-list-selection .mc-list-item.mc-2-line,.mc-list-selection .mc-list-option.mc-2-line{height:72px}.mc-list .mc-list-item.mc-3-line,.mc-list .mc-list-option.mc-3-line,.mc-list-selection .mc-list-item.mc-3-line,.mc-list-selection .mc-list-option.mc-3-line{height:88px}.mc-list .mc-list-item.mc-multi-line,.mc-list .mc-list-option.mc-multi-line,.mc-list-selection .mc-list-item.mc-multi-line,.mc-list-selection .mc-list-option.mc-multi-line{height:auto}.mc-list .mc-list-item.mc-multi-line .mc-list-item-content,.mc-list .mc-list-option.mc-multi-line .mc-list-item-content,.mc-list-selection .mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-selection .mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-bottom:16px}.mc-list .mc-list-item .mc-list-text,.mc-list .mc-list-option .mc-list-text,.mc-list-selection .mc-list-item .mc-list-text,.mc-list-selection .mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list .mc-list-item .mc-list-text>*,.mc-list .mc-list-option .mc-list-text>*,.mc-list-selection .mc-list-item .mc-list-text>*,.mc-list-selection .mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list .mc-list-item .mc-list-text:empty,.mc-list .mc-list-option .mc-list-text:empty,.mc-list-selection .mc-list-item .mc-list-text:empty,.mc-list-selection .mc-list-option .mc-list-text:empty{display:none}.mc-list .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-selection .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-selection .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-selection .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-selection .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list .mc-list-item .mc-list-icon,.mc-list .mc-list-option .mc-list-icon,.mc-list-selection .mc-list-item .mc-list-icon,.mc-list-selection .mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;height:24px;border-radius:50%;padding:4px;font-size:24px}.mc-list .mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list .mc-list-option .mc-list-icon~.mc-divider-inset,.mc-list-selection .mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list-selection .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list .mc-list-option .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-selection .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-selection .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:auto;margin-right:62px}.mc-list .mc-list-item .mc-divider,.mc-list .mc-list-option .mc-divider,.mc-list-selection .mc-list-item .mc-divider,.mc-list-selection .mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list .mc-list-item .mc-divider,[dir=rtl] .mc-list .mc-list-option .mc-divider,[dir=rtl] .mc-list-selection .mc-list-item .mc-divider,[dir=rtl] .mc-list-selection .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list .mc-list-item .mc-divider.mc-divider-inset,.mc-list .mc-list-option .mc-divider.mc-divider-inset,.mc-list-selection .mc-list-item .mc-divider.mc-divider-inset,.mc-list-selection .mc-list-option .mc-divider.mc-divider-inset{position:absolute}.mc-list-option:not([disabled]){cursor:pointer}"],
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
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
        __param(1, Attribute('tabindex')),
        __param(2, Attribute('auto-select')),
        __param(3, Attribute('no-unselect')),
        __param(4, Attribute('multiple')),
        __metadata("design:paramtypes", [ElementRef, String, String, String, String])
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
        Component({
            selector: 'mc-list',
            host: { class: 'mc-list' },
            template: '<ng-content></ng-content>',
            styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-subheader{display:flex;box-sizing:border-box;padding:15px;align-items:center}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{margin:0}.mc-list,.mc-list-selection{display:block}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{height:32px;line-height:2px}.mc-list .mc-subheader:first-child,.mc-list-selection .mc-subheader:first-child{margin-top:0}.mc-list .mc-list-item,.mc-list .mc-list-option,.mc-list-selection .mc-list-item,.mc-list-selection .mc-list-option{display:block;height:32px}.mc-list .mc-list-item .mc-list-item-content,.mc-list .mc-list-option .mc-list-item-content,.mc-list-selection .mc-list-item .mc-list-item-content,.mc-list-selection .mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:100%;padding:0 15px}.mc-list .mc-list-item.mc-2-line,.mc-list .mc-list-option.mc-2-line,.mc-list-selection .mc-list-item.mc-2-line,.mc-list-selection .mc-list-option.mc-2-line{height:72px}.mc-list .mc-list-item.mc-3-line,.mc-list .mc-list-option.mc-3-line,.mc-list-selection .mc-list-item.mc-3-line,.mc-list-selection .mc-list-option.mc-3-line{height:88px}.mc-list .mc-list-item.mc-multi-line,.mc-list .mc-list-option.mc-multi-line,.mc-list-selection .mc-list-item.mc-multi-line,.mc-list-selection .mc-list-option.mc-multi-line{height:auto}.mc-list .mc-list-item.mc-multi-line .mc-list-item-content,.mc-list .mc-list-option.mc-multi-line .mc-list-item-content,.mc-list-selection .mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-selection .mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-bottom:16px}.mc-list .mc-list-item .mc-list-text,.mc-list .mc-list-option .mc-list-text,.mc-list-selection .mc-list-item .mc-list-text,.mc-list-selection .mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list .mc-list-item .mc-list-text>*,.mc-list .mc-list-option .mc-list-text>*,.mc-list-selection .mc-list-item .mc-list-text>*,.mc-list-selection .mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list .mc-list-item .mc-list-text:empty,.mc-list .mc-list-option .mc-list-text:empty,.mc-list-selection .mc-list-item .mc-list-text:empty,.mc-list-selection .mc-list-option .mc-list-text:empty{display:none}.mc-list .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-selection .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-selection .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-selection .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-selection .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list .mc-list-item .mc-list-icon,.mc-list .mc-list-option .mc-list-icon,.mc-list-selection .mc-list-item .mc-list-icon,.mc-list-selection .mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;height:24px;border-radius:50%;padding:4px;font-size:24px}.mc-list .mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list .mc-list-option .mc-list-icon~.mc-divider-inset,.mc-list-selection .mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list-selection .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list .mc-list-option .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-selection .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-selection .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:auto;margin-right:62px}.mc-list .mc-list-item .mc-divider,.mc-list .mc-list-option .mc-divider,.mc-list-selection .mc-list-item .mc-divider,.mc-list-selection .mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list .mc-list-item .mc-divider,[dir=rtl] .mc-list .mc-list-option .mc-divider,[dir=rtl] .mc-list-selection .mc-list-item .mc-divider,[dir=rtl] .mc-list-selection .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list .mc-list-item .mc-divider.mc-divider-inset,.mc-list .mc-list-option .mc-divider.mc-divider-inset,.mc-list-selection .mc-list-item .mc-divider.mc-divider-inset,.mc-list-selection .mc-list-option .mc-divider.mc-divider-inset{position:absolute}.mc-list-option:not([disabled]){cursor:pointer}"],
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None
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
        Directive({
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
        this._lineSetter = new McLineSetter(this._lines, this._element);
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
        ContentChildren(McLine),
        __metadata("design:type", QueryList)
    ], McListItem.prototype, "_lines", void 0);
    McListItem = __decorate([
        Component({
            selector: 'mc-list-item, a[mc-list-item]',
            host: {
                class: 'mc-list-item',
                '(focus)': '_handleFocus()',
                '(blur)': '_handleBlur()'
            },
            template: "<div class=\"mc-list-item-content\"><ng-content select=\"[mc-list-icon], [mcListIcon]\"></ng-content><div class=\"mc-list-text\"><ng-content select=\"[mc-line], [mcLine]\"></ng-content></div><ng-content></ng-content></div>",
            encapsulation: ViewEncapsulation.None,
            preserveWhitespaces: false,
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], McListItem);
    return McListItem;
}(McListItemBase));

var McListModule = /** @class */ (function () {
    function McListModule() {
    }
    McListModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                A11yModule,
                McLineModule
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

/**
 * Generated bundle index. Do not edit.
 */

export { McListModule, McListBase, McList, McListSubheaderCssStyler, McListItemBase, McListItem, McListOption, MC_SELECTION_LIST_VALUE_ACCESSOR, McListSelectionChange, McListSelectionBase, _McListSelectionMixinBase, McListSelection };
//# sourceMappingURL=list.es5.js.map
