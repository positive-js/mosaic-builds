/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __metadata, __param } from 'tslib';
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
let McListOption = class McListOption {
    constructor(_element, _changeDetector, listSelection) {
        this._element = _element;
        this._changeDetector = _changeDetector;
        this.listSelection = listSelection;
        this._hasFocus = false;
        // Whether the label should appear before or after the checkbox. Defaults to 'after'
        this.checkboxPosition = 'after';
        this._selected = false;
        this._disabled = false;
    }
    get disabled() {
        return this._disabled || (this.listSelection && this.listSelection.disabled);
    }
    set disabled(value) {
        const newValue = toBoolean(value);
        if (newValue !== this._disabled) {
            this._disabled = newValue;
            this._changeDetector.markForCheck();
        }
    }
    get selected() {
        return this.listSelection.selectedOptions && this.listSelection.selectedOptions.isSelected(this) || false;
    }
    set selected(value) {
        const isSelected = toBoolean(value);
        if (isSelected !== this._selected) {
            this.setSelected(isSelected);
            this.listSelection._reportValueChange();
        }
    }
    ngOnInit() {
        if (this._selected) {
            // List options that are selected at initialization can't be reported properly to the form
            // control. This is because it takes some time until the selection-list knows about all
            // available options. Also it can happen that the ControlValueAccessor has an initial value
            // that should be used instead. Deferring the value change report to the next tick ensures
            // that the form control value is not being overwritten.
            const wasSelected = this._selected;
            Promise.resolve().then(() => {
                if (this._selected || wasSelected) {
                    this.selected = true;
                    this._changeDetector.markForCheck();
                }
            });
        }
    }
    ngAfterContentInit() {
        this._lineSetter = new McLineSetter(this._lines, this._element);
    }
    ngOnDestroy() {
        if (this.selected) {
            // We have to delay this until the next tick in order
            // to avoid changed after checked errors.
            Promise.resolve().then(() => this.selected = false);
        }
        this.listSelection._removeOptionFromList(this);
    }
    toggle() {
        this.selected = !this.selected;
    }
    focus() {
        this._element.nativeElement.focus();
        this.listSelection.setFocusedOption(this);
    }
    getLabel() {
        return this._text ? this._text.nativeElement.textContent : '';
    }
    setSelected(selected) {
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
    }
    _getHeight() {
        return this._element.nativeElement.getClientRects()[0].height;
    }
    _handleClick() {
        if (this.disabled) {
            return;
        }
        this.listSelection.setFocusedOption(this);
    }
    _handleFocus() {
        if (this.disabled || this._hasFocus) {
            return;
        }
        this._hasFocus = true;
    }
    _handleBlur() {
        this._hasFocus = false;
        this.listSelection._onTouched();
    }
    _getHostElement() {
        return this._element.nativeElement;
    }
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
    __param(2, Inject(forwardRef(() => McListSelection))),
    __metadata("design:paramtypes", [ElementRef,
        ChangeDetectorRef,
        McListSelection])
], McListOption);
const MC_SELECTION_LIST_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => McListSelection),
    multi: true
};
// Change event that is being fired whenever the selected state of an option changes. */
class McListSelectionChange {
    constructor(
    // Reference to the selection list that emitted the event.
    source, 
    // Reference to the option that has been changed.
    option) {
        this.source = source;
        this.option = option;
    }
}
class McListSelectionBase {
}
const _McListSelectionMixinBase = mixinDisabled(McListSelectionBase);
let McListSelection = class McListSelection extends _McListSelectionMixinBase {
    constructor(_element, tabIndex, autoSelect, noUnselect, multiple) {
        super();
        this._element = _element;
        this.horizontal = false;
        // Emits a change event whenever the selected state of an option changes.
        this.selectionChange = new EventEmitter();
        this._modelChanges = Subscription.EMPTY;
        // View to model callback that should be called if the list or its options lost focus.
        this._onTouched = () => { };
        // View to model callback that should be called whenever the selected options change.
        this._onChange = (_) => { };
        this.autoSelect = autoSelect === null ? true : toBoolean(autoSelect);
        this.multiple = multiple === null ? true : toBoolean(multiple);
        this.noUnselect = noUnselect === null ? true : toBoolean(noUnselect);
        this.tabIndex = parseInt(tabIndex) || 0;
        this.selectedOptions = new SelectionModel(this.multiple);
    }
    ngAfterContentInit() {
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
        this._modelChanges = this.selectedOptions.onChange.subscribe((event) => {
            for (const item of event.added) {
                item.selected = true;
            }
            for (const item of event.removed) {
                item.selected = false;
            }
        });
        this.updateScrollSize();
    }
    ngOnDestroy() {
        this._modelChanges.unsubscribe();
    }
    focus() {
        this._element.nativeElement.focus();
    }
    selectAll() {
        this.options.forEach((option) => option.setSelected(true));
        this._reportValueChange();
    }
    deselectAll() {
        this.options.forEach((option) => option.setSelected(false));
        this._reportValueChange();
    }
    updateScrollSize() {
        if (this.horizontal || !this.options.first) {
            return;
        }
        this._keyManager.withScrollSize(Math.floor(this._getHeight() / this.options.first._getHeight()));
    }
    // Sets the focused option of the selection-list.
    setFocusedOption(option) {
        this._keyManager.updateActiveItem(option);
        if (this.withShift && this.multiple) {
            const previousIndex = this._keyManager.previousActiveItemIndex;
            const activeIndex = this._keyManager.activeItemIndex;
            if (previousIndex < activeIndex) {
                this.options.forEach((item, index) => {
                    if (index >= previousIndex && index <= activeIndex) {
                        item.setSelected(true);
                    }
                });
            }
            else {
                this.options.forEach((item, index) => {
                    if (index >= activeIndex && index <= previousIndex) {
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
                this.options.forEach((item) => item.setSelected(false));
                option.setSelected(true);
            }
        }
        this._emitChangeEvent(option);
        this._reportValueChange();
    }
    // Implemented as part of ControlValueAccessor.
    writeValue(values) {
        if (this.options) {
            this._setOptionsFromValues(values || []);
        }
        else {
            this._tempValues = values;
        }
    }
    // Implemented as part of ControlValueAccessor.
    registerOnChange(fn) {
        this._onChange = fn;
    }
    // Implemented as part of ControlValueAccessor.
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    // Implemented as a part of ControlValueAccessor.
    setDisabledState(isDisabled) {
        if (this.options) {
            this.options.forEach((option) => option.disabled = isDisabled);
        }
    }
    getSelectedOptionValues() {
        return this.options.filter((option) => option.selected).map((option) => option.value);
    }
    // Toggles the selected state of the currently focused option.
    toggleFocusedOption() {
        const focusedIndex = this._keyManager.activeItemIndex;
        if (focusedIndex != null && this._isValidIndex(focusedIndex)) {
            const focusedOption = this.options.toArray()[focusedIndex];
            if (focusedOption && this._canDeselectLast(focusedOption)) {
                focusedOption.toggle();
                // Emit a change event because the focused option changed its state through user interaction.
                this._emitChangeEvent(focusedOption);
            }
        }
    }
    _canDeselectLast(listOption) {
        return !(this.noUnselect && this.selectedOptions.selected.length === 1 && listOption.selected);
    }
    _getHeight() {
        return this._element.nativeElement.getClientRects()[0].height;
    }
    // Removes an option from the selection list and updates the active item.
    _removeOptionFromList(option) {
        if (option._hasFocus) {
            const optionIndex = this._getOptionIndex(option);
            // Check whether the option is the last item
            if (optionIndex > 0) {
                this._keyManager.setPreviousItemActive();
            }
            else if (optionIndex === 0 && this.options.length > 1) {
                this._keyManager.setNextItemActive();
            }
        }
    }
    _onKeyDown(event) {
        const keyCode = event.keyCode;
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
    }
    // Reports a value change to the ControlValueAccessor
    _reportValueChange() {
        if (this.options) {
            this._onChange(this.getSelectedOptionValues());
        }
    }
    // Emits a change event if the selected state of an option changed.
    _emitChangeEvent(option) {
        this.selectionChange.emit(new McListSelectionChange(this, option));
    }
    // Returns the option with the specified value.
    _getOptionByValue(value) {
        return this.options.find((option) => option.value === value);
    }
    // Sets the selected options based on the specified values.
    _setOptionsFromValues(values) {
        this.options.forEach((option) => option.setSelected(false));
        values
            .map((value) => this._getOptionByValue(value))
            .filter(Boolean)
            .forEach((option) => option.setSelected(true));
    }
    /**
     * Utility to ensure all indexes are valid.
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of options.
     */
    _isValidIndex(index) {
        return index >= 0 && index < this.options.length;
    }
    // Returns the index of the specified list option.
    _getOptionIndex(option) {
        return this.options.toArray().indexOf(option);
    }
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
        styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-list,.mc-list-selection{display:block;outline:0}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{display:flex;box-sizing:border-box;height:32px;line-height:2px;padding:15px;align-items:center}.mc-list .mc-subheader:first-child,.mc-list-selection .mc-subheader:first-child{margin-top:0}.mc-list .mc-list .mc-subheader,.mc-list .mc-list-selection .mc-subheader,.mc-list-selection .mc-list .mc-subheader,.mc-list-selection .mc-list-selection .mc-subheader{margin:0}.mc-list-item,.mc-list-option{display:block;height:32px;border:2px solid transparent}.mc-list-item .mc-list-item-content,.mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:100%;padding:0 15px}.mc-list-item.mc-2-line,.mc-list-option.mc-2-line{height:72px}.mc-list-item.mc-3-line,.mc-list-option.mc-3-line{height:88px}.mc-list-item.mc-multi-line,.mc-list-option.mc-multi-line{height:auto}.mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-bottom:16px}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;height:24px;border-radius:50%;padding:4px;font-size:24px}.mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:auto;margin-right:62px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider-inset,.mc-list-option .mc-divider.mc-divider-inset{position:absolute}.mc-list-option:not([disabled]){cursor:pointer}"],
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

class McListBase {
}
let McList = class McList extends McListBase {
};
McList = __decorate([
    Component({
        selector: 'mc-list',
        host: { class: 'mc-list' },
        template: '<ng-content></ng-content>',
        styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-list,.mc-list-selection{display:block;outline:0}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{display:flex;box-sizing:border-box;height:32px;line-height:2px;padding:15px;align-items:center}.mc-list .mc-subheader:first-child,.mc-list-selection .mc-subheader:first-child{margin-top:0}.mc-list .mc-list .mc-subheader,.mc-list .mc-list-selection .mc-subheader,.mc-list-selection .mc-list .mc-subheader,.mc-list-selection .mc-list-selection .mc-subheader{margin:0}.mc-list-item,.mc-list-option{display:block;height:32px;border:2px solid transparent}.mc-list-item .mc-list-item-content,.mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:100%;padding:0 15px}.mc-list-item.mc-2-line,.mc-list-option.mc-2-line{height:72px}.mc-list-item.mc-3-line,.mc-list-option.mc-3-line{height:88px}.mc-list-item.mc-multi-line,.mc-list-option.mc-multi-line{height:auto}.mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-bottom:16px}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;height:24px;border-radius:50%;padding:4px;font-size:24px}.mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:auto;margin-right:62px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider-inset,.mc-list-option .mc-divider.mc-divider-inset{position:absolute}.mc-list-option:not([disabled]){cursor:pointer}"],
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None
    })
], McList);
/**
 * Directive whose purpose is to add the mc- CSS styling to this selector.
 * @docs-private
 */
let McListSubheaderCssStyler = class McListSubheaderCssStyler {
};
McListSubheaderCssStyler = __decorate([
    Directive({
        selector: '[mc-subheader], [mcSubheader]',
        host: { class: 'mc-subheader' }
    })
], McListSubheaderCssStyler);
// Boilerplate for applying mixins to McListItem.
class McListItemBase {
}
let McListItem = class McListItem extends McListItemBase {
    constructor(_element) {
        super();
        this._element = _element;
    }
    ngAfterContentInit() {
        this._lineSetter = new McLineSetter(this._lines, this._element);
    }
    _handleFocus() {
        this._element.nativeElement.classList.add('mc-focused');
    }
    _handleBlur() {
        this._element.nativeElement.classList.remove('mc-focused');
    }
    _getHostElement() {
        return this._element.nativeElement;
    }
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

let McListModule = class McListModule {
};
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

/**
 * Generated bundle index. Do not edit.
 */

export { McListModule, McListBase, McList, McListSubheaderCssStyler, McListItemBase, McListItem, McListOption, MC_SELECTION_LIST_VALUE_ACCESSOR, McListSelectionChange, McListSelectionBase, _McListSelectionMixinBase, McListSelection };
//# sourceMappingURL=list.js.map
