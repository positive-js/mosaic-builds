/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Output, ViewChild, ViewEncapsulation, Directive, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusKeyManager, A11yModule } from '@ptsecurity/cdk/a11y';
import { SelectionModel } from '@ptsecurity/cdk/collections';
import { END, ENTER, HOME, SPACE } from '@ptsecurity/cdk/keycodes';
import { mixinDisabled, mixinTabIndex, McLine, McLineSetter, toBoolean, McLineModule, McPseudoCheckboxModule } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';
import { PlatformModule } from '@ptsecurity/cdk/platform';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class McListOptionBase {
}
const /** @type {?} */ MAT_SELECTION_LIST_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => McListSelection),
    multi: true
};
/**
 * Change event object emitted by McListOption whenever the selected state changes.
 * @deprecated Use the `McListSelectionChange` event on the selection list instead.
 * \@deletion-target 6.0.0
 */
class McListOptionChange {
    /**
     * @param {?} source
     * @param {?} selected
     */
    constructor(source, selected) {
        this.source = source;
        this.selected = selected;
    }
}
class McListSelectionChange {
    /**
     * @param {?} source
     * @param {?} option
     */
    constructor(source, option) {
        this.source = source;
        this.option = option;
    }
}
/**
 * Component for list-options of selection-list. Each list-option can automatically
 * generate a checkbox and can put current item into the selectionModel of selection-list
 * if the current item is selected.
 */
class McListOption extends McListOptionBase {
    /**
     * @param {?} _element
     * @param {?} _changeDetector
     * @param {?} selectionList
     */
    constructor(_element, _changeDetector, selectionList) {
        super();
        this._element = _element;
        this._changeDetector = _changeDetector;
        this.selectionList = selectionList;
        // Whether the option has focus.
        this._hasFocus = false;
        // Whether the label should appear before or after the checkbox. Defaults to 'after'
        this.checkboxPosition = 'after';
        /**
         * Emits a change event whenever the selected state of an option changes.
         * @deprecated Use the `selectionChange` event on the `<mc-selection-list>` instead.
         * \@deletion-target 6.0.0
         */
        this.selectionChange = new EventEmitter();
        this._selected = false;
        this._disabled = false;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled || (this.selectionList && this.selectionList.disabled);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        const /** @type {?} */ newValue = toBoolean(value);
        if (newValue !== this._disabled) {
            this._disabled = newValue;
            this._changeDetector.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    get selected() {
        return this.selectionList.selectedOptions.isSelected(this);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        const /** @type {?} */ isSelected = toBoolean(value);
        if (isSelected !== this._selected) {
            this._setSelected(isSelected);
            this.selectionList._reportValueChange();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this._selected) {
            // List options that are selected at initialization can't be reported properly to the form
            // control. This is because it takes some time until the selection-list knows about all
            // available options. Also it can happen that the ControlValueAccessor has an initial value
            // that should be used instead. Deferring the value change report to the next tick ensures
            // that the form control value is not being overwritten.
            Promise.resolve().then(() => this.selected = true);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._lineSetter = new McLineSetter(this._lines, this._element);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.selected) {
            // We have to delay this until the next tick in order
            // to avoid changed after checked errors.
            Promise.resolve().then(() => this.selected = false);
        }
        this.selectionList._removeOptionFromList(this);
    }
    /**
     * @return {?}
     */
    toggle() {
        this.selected = !this.selected;
    }
    /**
     * @return {?}
     */
    focus() {
        this._element.nativeElement.focus();
    }
    /**
     * Returns the list item's text label. Implemented as a part of the FocusKeyManager.
     * \@docs-private
     * @return {?}
     */
    getLabel() {
        return this._text ? this._text.nativeElement.textContent : '';
    }
    /**
     * @return {?}
     */
    _handleClick() {
        if (!this.disabled) {
            this.toggle();
            // Emit a change event if the selected state of the option changed through user interaction.
            this.selectionList._emitChangeEvent(this);
            // TODO: the `selectionChange` event on the option is deprecated. Remove that in the future.
            this._emitDeprecatedChangeEvent();
        }
    }
    /**
     * @return {?}
     */
    _handleFocus() {
        if (this.disabled) {
            return;
        }
        this._hasFocus = true;
        this.selectionList._setFocusedOption(this);
    }
    /**
     * @return {?}
     */
    _handleBlur() {
        this._hasFocus = false;
        this.selectionList._onTouched();
    }
    /**
     * @return {?}
     */
    _getHostElement() {
        return this._element.nativeElement;
    }
    /**
     * @param {?} selected
     * @return {?}
     */
    _setSelected(selected) {
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
    }
    /**
     * @return {?}
     */
    _emitDeprecatedChangeEvent() {
        // TODO: the `selectionChange` event on the option is deprecated. Remove that in the future.
        this.selectionChange.emit(new McListOptionChange(this, this.selected));
    }
}
McListOption.decorators = [
    { type: Component, args: [{
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
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
McListOption.ctorParameters = () => [
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
    { type: McListSelection, decorators: [{ type: Optional }, { type: Inject, args: [forwardRef(() => McListSelection),] },] },
];
McListOption.propDecorators = {
    "_lines": [{ type: ContentChildren, args: [McLine,] },],
    "_text": [{ type: ViewChild, args: ['text',] },],
    "checkboxPosition": [{ type: Input },],
    "value": [{ type: Input },],
    "disabled": [{ type: Input },],
    "selected": [{ type: Input },],
    "selectionChange": [{ type: Output },],
};
class McListSelectionBase {
}
const /** @type {?} */ _McListSelectionMixinBase = mixinTabIndex(mixinDisabled(McListSelectionBase));
class McListSelection extends _McListSelectionMixinBase {
    /**
     * @param {?} _element
     * @param {?} tabIndex
     */
    constructor(_element, tabIndex) {
        super();
        this._element = _element;
        // Emits a change event whenever the selected state of an option changes.
        this.selectionChange = new EventEmitter();
        // The currently selected options.
        this.selectedOptions = new SelectionModel(true);
        // View to model callback that should be called if the list or its options lost focus.
        this._onTouched = () => { };
        this._onChange = (_) => { };
        this.tabIndex = parseInt(tabIndex) || 0;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._keyManager = new FocusKeyManager(this.options).withWrap().withTypeAhead();
        if (this._tempValues) {
            this._setOptionsFromValues(this._tempValues);
            this._tempValues = null;
        }
    }
    /**
     * @return {?}
     */
    focus() {
        this._element.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    selectAll() {
        this.options.forEach((option) => option._setSelected(true));
        this._reportValueChange();
    }
    /**
     * @return {?}
     */
    deselectAll() {
        this.options.forEach((option) => option._setSelected(false));
        this._reportValueChange();
    }
    /**
     * @param {?} option
     * @return {?}
     */
    _setFocusedOption(option) {
        this._keyManager.updateActiveItemIndex(this._getOptionIndex(option));
    }
    /**
     * @param {?} option
     * @return {?}
     */
    _removeOptionFromList(option) {
        if (option._hasFocus) {
            const /** @type {?} */ optionIndex = this._getOptionIndex(option);
            // Check whether the option is the last item
            if (optionIndex > 0) {
                this._keyManager.setPreviousItemActive();
            }
            else if (optionIndex === 0 && this.options.length > 1) {
                this._keyManager.setNextItemActive();
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _keydown(event) {
        switch (event.keyCode) {
            case SPACE:
            case ENTER:
                this._toggleSelectOnFocusedOption();
                // Always prevent space from scrolling the page since the list has focus
                event.preventDefault();
                break;
            case HOME:
            case END:
                event.keyCode === HOME ? this._keyManager.setFirstItemActive() : this._keyManager.setLastItemActive();
                event.preventDefault();
                break;
            default:
                this._keyManager.onKeydown(event);
        }
    }
    /**
     * @return {?}
     */
    _reportValueChange() {
        if (this.options) {
            this._onChange(this._getSelectedOptionValues());
        }
    }
    /**
     * @param {?} option
     * @return {?}
     */
    _emitChangeEvent(option) {
        this.selectionChange.emit(new McListSelectionChange(this, option));
    }
    /**
     * @param {?} values
     * @return {?}
     */
    writeValue(values) {
        if (this.options) {
            this._setOptionsFromValues(values || []);
        }
        else {
            this._tempValues = values;
        }
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        if (this.options) {
            this.options.forEach((option) => option.disabled = isDisabled);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _getOptionByValue(value) {
        return this.options.find((option) => option.value === value);
    }
    /**
     * @param {?} values
     * @return {?}
     */
    _setOptionsFromValues(values) {
        this.options.forEach((option) => option._setSelected(false));
        values
            .map((value) => this._getOptionByValue(value))
            .filter(Boolean)
            .forEach((option) => /** @type {?} */ ((option))._setSelected(true));
    }
    /**
     * @return {?}
     */
    _getSelectedOptionValues() {
        return this.options.filter((option) => option.selected).map((option) => option.value);
    }
    /**
     * @return {?}
     */
    _toggleSelectOnFocusedOption() {
        const /** @type {?} */ focusedIndex = this._keyManager.activeItemIndex;
        if (focusedIndex != null && this._isValidIndex(focusedIndex)) {
            const /** @type {?} */ focusedOption = this.options.toArray()[focusedIndex];
            if (focusedOption) {
                focusedOption.toggle();
                // Emit a change event because the focused option changed its state through user
                // interaction.
                this._emitChangeEvent(focusedOption);
                // TODO: the `selectionChange` event on the option is deprecated. Remove that in the future.
                focusedOption._emitDeprecatedChangeEvent();
            }
        }
    }
    /**
     * Utility to ensure all indexes are valid.
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of options.
     */
    _isValidIndex(index) {
        return index >= 0 && index < this.options.length;
    }
    /**
     * @param {?} option
     * @return {?}
     */
    _getOptionIndex(option) {
        return this.options.toArray().indexOf(option);
    }
}
McListSelection.decorators = [
    { type: Component, args: [{
                selector: 'mc-list-selection',
                template: '<ng-content></ng-content>',
                styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}@-webkit-keyframes mc-progress{from{background-position:0 0}to{background-position:60px 0}}@keyframes mc-progress{from{background-position:40px 0}to{background-position:0 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;top:0;left:0;width:100%;height:100%;animation:mc-progress 2s linear infinite;background:repeating-linear-gradient(135deg,rgba(0,0,0,.05),rgba(0,0,0,.05) 15px,transparent 0,transparent 30px)}.mc-subheader{display:flex;box-sizing:border-box;padding:15px;align-items:center}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{margin:0}.mc-list,.mc-list-selection{display:block}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{height:28px;line-height:-2px}.mc-list .mc-subheader:first-child,.mc-list-selection .mc-subheader:first-child{margin-top:0}.mc-list .mc-list-item,.mc-list .mc-list-option,.mc-list-selection .mc-list-item,.mc-list-selection .mc-list-option{display:block;height:28px}.mc-list .mc-list-item .mc-list-item-content,.mc-list .mc-list-option .mc-list-item-content,.mc-list-selection .mc-list-item .mc-list-item-content,.mc-list-selection .mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:inherit;padding:0 15px}.mc-list .mc-list-item.mc-2-line,.mc-list .mc-list-option.mc-2-line,.mc-list-selection .mc-list-item.mc-2-line,.mc-list-selection .mc-list-option.mc-2-line{height:72px}.mc-list .mc-list-item.mc-3-line,.mc-list .mc-list-option.mc-3-line,.mc-list-selection .mc-list-item.mc-3-line,.mc-list-selection .mc-list-option.mc-3-line{height:88px}.mc-list .mc-list-item.mc-multi-line,.mc-list .mc-list-option.mc-multi-line,.mc-list-selection .mc-list-item.mc-multi-line,.mc-list-selection .mc-list-option.mc-multi-line{height:auto}.mc-list .mc-list-item.mc-multi-line .mc-list-item-content,.mc-list .mc-list-option.mc-multi-line .mc-list-item-content,.mc-list-selection .mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-selection .mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-bottom:16px}.mc-list .mc-list-item .mc-list-text,.mc-list .mc-list-option .mc-list-text,.mc-list-selection .mc-list-item .mc-list-text,.mc-list-selection .mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list .mc-list-item .mc-list-text>*,.mc-list .mc-list-option .mc-list-text>*,.mc-list-selection .mc-list-item .mc-list-text>*,.mc-list-selection .mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list .mc-list-item .mc-list-text:empty,.mc-list .mc-list-option .mc-list-text:empty,.mc-list-selection .mc-list-item .mc-list-text:empty,.mc-list-selection .mc-list-option .mc-list-text:empty{display:none}.mc-list .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-selection .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-selection .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0;padding-left:15px}[dir=rtl] .mc-list .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-selection .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-selection .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:15px;padding-left:0}.mc-list .mc-list-item .mc-list-icon,.mc-list .mc-list-option .mc-list-icon,.mc-list-selection .mc-list-item .mc-list-icon,.mc-list-selection .mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;height:24px;border-radius:50%;padding:4px;font-size:24px}.mc-list .mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list .mc-list-option .mc-list-icon~.mc-divider-inset,.mc-list-selection .mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list-selection .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list .mc-list-option .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-selection .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-selection .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:auto;margin-right:62px}.mc-list .mc-list-item .mc-divider,.mc-list .mc-list-option .mc-divider,.mc-list-selection .mc-list-item .mc-divider,.mc-list-selection .mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list .mc-list-item .mc-divider,[dir=rtl] .mc-list .mc-list-option .mc-divider,[dir=rtl] .mc-list-selection .mc-list-item .mc-divider,[dir=rtl] .mc-list-selection .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list .mc-list-item .mc-divider.mc-divider-inset,.mc-list .mc-list-option .mc-divider.mc-divider-inset,.mc-list-selection .mc-list-item .mc-divider.mc-divider-inset,.mc-list-selection .mc-list-option .mc-divider.mc-divider-inset{position:absolute}.mc-list-option:not([disabled]){cursor:pointer}"],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
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
McListSelection.ctorParameters = () => [
    { type: ElementRef, },
    { type: undefined, decorators: [{ type: Attribute, args: ['tabindex',] },] },
];
McListSelection.propDecorators = {
    "options": [{ type: ContentChildren, args: [McListOption,] },],
    "selectionChange": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class McListBase {
}
class McList extends McListBase {
}
McList.decorators = [
    { type: Component, args: [{
                selector: 'mc-list',
                host: { class: 'mc-list' },
                template: '<ng-content></ng-content>',
                styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}@-webkit-keyframes mc-progress{from{background-position:0 0}to{background-position:60px 0}}@keyframes mc-progress{from{background-position:40px 0}to{background-position:0 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;top:0;left:0;width:100%;height:100%;animation:mc-progress 2s linear infinite;background:repeating-linear-gradient(135deg,rgba(0,0,0,.05),rgba(0,0,0,.05) 15px,transparent 0,transparent 30px)}.mc-subheader{display:flex;box-sizing:border-box;padding:15px;align-items:center}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{margin:0}.mc-list,.mc-list-selection{display:block}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{height:28px;line-height:-2px}.mc-list .mc-subheader:first-child,.mc-list-selection .mc-subheader:first-child{margin-top:0}.mc-list .mc-list-item,.mc-list .mc-list-option,.mc-list-selection .mc-list-item,.mc-list-selection .mc-list-option{display:block;height:28px}.mc-list .mc-list-item .mc-list-item-content,.mc-list .mc-list-option .mc-list-item-content,.mc-list-selection .mc-list-item .mc-list-item-content,.mc-list-selection .mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:inherit;padding:0 15px}.mc-list .mc-list-item.mc-2-line,.mc-list .mc-list-option.mc-2-line,.mc-list-selection .mc-list-item.mc-2-line,.mc-list-selection .mc-list-option.mc-2-line{height:72px}.mc-list .mc-list-item.mc-3-line,.mc-list .mc-list-option.mc-3-line,.mc-list-selection .mc-list-item.mc-3-line,.mc-list-selection .mc-list-option.mc-3-line{height:88px}.mc-list .mc-list-item.mc-multi-line,.mc-list .mc-list-option.mc-multi-line,.mc-list-selection .mc-list-item.mc-multi-line,.mc-list-selection .mc-list-option.mc-multi-line{height:auto}.mc-list .mc-list-item.mc-multi-line .mc-list-item-content,.mc-list .mc-list-option.mc-multi-line .mc-list-item-content,.mc-list-selection .mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-selection .mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-bottom:16px}.mc-list .mc-list-item .mc-list-text,.mc-list .mc-list-option .mc-list-text,.mc-list-selection .mc-list-item .mc-list-text,.mc-list-selection .mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list .mc-list-item .mc-list-text>*,.mc-list .mc-list-option .mc-list-text>*,.mc-list-selection .mc-list-item .mc-list-text>*,.mc-list-selection .mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list .mc-list-item .mc-list-text:empty,.mc-list .mc-list-option .mc-list-text:empty,.mc-list-selection .mc-list-item .mc-list-text:empty,.mc-list-selection .mc-list-option .mc-list-text:empty{display:none}.mc-list .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-selection .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-selection .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0;padding-left:15px}[dir=rtl] .mc-list .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-selection .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-selection .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:15px;padding-left:0}.mc-list .mc-list-item .mc-list-icon,.mc-list .mc-list-option .mc-list-icon,.mc-list-selection .mc-list-item .mc-list-icon,.mc-list-selection .mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;height:24px;border-radius:50%;padding:4px;font-size:24px}.mc-list .mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list .mc-list-option .mc-list-icon~.mc-divider-inset,.mc-list-selection .mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list-selection .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list .mc-list-option .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-selection .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-selection .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:auto;margin-right:62px}.mc-list .mc-list-item .mc-divider,.mc-list .mc-list-option .mc-divider,.mc-list-selection .mc-list-item .mc-divider,.mc-list-selection .mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list .mc-list-item .mc-divider,[dir=rtl] .mc-list .mc-list-option .mc-divider,[dir=rtl] .mc-list-selection .mc-list-item .mc-divider,[dir=rtl] .mc-list-selection .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list .mc-list-item .mc-divider.mc-divider-inset,.mc-list .mc-list-option .mc-divider.mc-divider-inset,.mc-list-selection .mc-list-item .mc-divider.mc-divider-inset,.mc-list-selection .mc-list-option .mc-divider.mc-divider-inset{position:absolute}.mc-list-option:not([disabled]){cursor:pointer}"],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
McList.ctorParameters = () => [];
/**
 * Directive whose purpose is to add the mc- CSS styling to this selector.
 * \@docs-private
 */
class McListSubheaderCssStyler {
}
McListSubheaderCssStyler.decorators = [
    { type: Directive, args: [{
                selector: '[mc-subheader], [mcSubheader]',
                host: { class: 'mc-subheader' }
            },] },
];
/** @nocollapse */
McListSubheaderCssStyler.ctorParameters = () => [];
class McListItemBase {
}
class McListItem extends McListItemBase {
    /**
     * @param {?} _element
     */
    constructor(_element) {
        super();
        this._element = _element;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._lineSetter = new McLineSetter(this._lines, this._element);
    }
    /**
     * @return {?}
     */
    _handleFocus() {
        this._element.nativeElement.classList.add('mc-focused');
    }
    /**
     * @return {?}
     */
    _handleBlur() {
        this._element.nativeElement.classList.remove('mc-focused');
    }
    /**
     * @return {?}
     */
    _getHostElement() {
        return this._element.nativeElement;
    }
}
McListItem.decorators = [
    { type: Component, args: [{
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
            },] },
];
/** @nocollapse */
McListItem.ctorParameters = () => [
    { type: ElementRef, },
];
McListItem.propDecorators = {
    "_lines": [{ type: ContentChildren, args: [McLine,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class McListModule {
}
McListModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    PlatformModule,
                    A11yModule,
                    McPseudoCheckboxModule,
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
            },] },
];
/** @nocollapse */
McListModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { McListModule, McListBase, McList, McListSubheaderCssStyler, McListItemBase, McListItem, MAT_SELECTION_LIST_VALUE_ACCESSOR as ɵb3, McListOption as ɵc3, McListOptionBase as ɵa3, McListSelection as ɵf3, McListSelectionBase as ɵd3, _McListSelectionMixinBase as ɵe3 };
//# sourceMappingURL=list.js.map
