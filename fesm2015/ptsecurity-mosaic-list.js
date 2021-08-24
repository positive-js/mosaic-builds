import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, NgZone, Inject, forwardRef, Optional, ContentChildren, ViewChild, Input, EventEmitter, Attribute, Output, NgModule } from '@angular/core';
import { toBoolean, McOptgroup, McLine, mixinTabIndex, mixinDisabled, MultipleMode, McLineSetter, McPseudoCheckboxModule, McLineModule, McOptionModule } from '@ptsecurity/mosaic/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { hasModifierKey, PAGE_DOWN, PAGE_UP, END, HOME, UP_ARROW, DOWN_ARROW, TAB, ENTER, SPACE } from '@ptsecurity/cdk/keycodes';
import { Subject, merge } from 'rxjs';
import { take, takeUntil, startWith } from 'rxjs/operators';

/* tslint:disable:no-empty */
/**
 * Component for list-options of selection-list. Each list-option can automatically
 * generate a checkbox and can put current item into the selectionModel of selection-list
 * if the current item is selected.
 */
class McListOption {
    constructor(elementRef, changeDetector, ngZone, listSelection, group) {
        this.elementRef = elementRef;
        this.changeDetector = changeDetector;
        this.ngZone = ngZone;
        this.listSelection = listSelection;
        this.group = group;
        this.hasFocus = false;
        this.onFocus = new Subject();
        this.onBlur = new Subject();
        /**
         * This is set to true after the first OnChanges cycle so we don't clear the value of `selected`
         * in the first cycle.
         */
        this.inputsInitialized = false;
        this._disabled = false;
        this._selected = false;
    }
    get value() { return this._value; }
    set value(newValue) {
        if (this.selected && newValue !== this.value && this.inputsInitialized) {
            this.selected = false;
        }
        this._value = newValue;
    }
    get disabled() {
        const listSelectionDisabled = this.listSelection && this.listSelection.disabled;
        const groupDisabled = this.group && this.group.disabled;
        return listSelectionDisabled || groupDisabled || this._disabled;
    }
    set disabled(value) {
        const newValue = toBoolean(value);
        if (newValue !== this._disabled) {
            this._disabled = newValue;
            this.changeDetector.markForCheck();
        }
    }
    get showCheckbox() {
        return this._showCheckbox !== undefined ? this._showCheckbox : this.listSelection.showCheckbox;
    }
    set showCheckbox(value) {
        this._showCheckbox = coerceBooleanProperty(value);
    }
    get selected() {
        return this.listSelection.selectionModel && this.listSelection.selectionModel.isSelected(this) || false;
    }
    set selected(value) {
        const isSelected = toBoolean(value);
        if (isSelected !== this._selected) {
            this.setSelected(isSelected);
            this.listSelection.reportValueChange();
        }
    }
    get tabIndex() {
        return this.disabled ? null : -1;
    }
    ngOnInit() {
        const list = this.listSelection;
        if (list._value && list._value.some((value) => list.compareWith(value, this._value))) {
            this.setSelected(true);
        }
        const wasSelected = this._selected;
        // List options that are selected at initialization can't be reported properly to the form
        // control. This is because it takes some time until the selection-list knows about all
        // available options. Also it can happen that the ControlValueAccessor has an initial value
        // that should be used instead. Deferring the value change report to the next tick ensures
        // that the form control value is not being overwritten.
        Promise.resolve().then(() => {
            if (this._selected || wasSelected) {
                this.selected = true;
                this.changeDetector.markForCheck();
            }
        });
        this.inputsInitialized = true;
    }
    ngOnDestroy() {
        if (this.selected) {
            // We have to delay this until the next tick in order
            // to avoid changed after checked errors.
            Promise.resolve().then(() => this.selected = false);
        }
        this.listSelection.removeOptionFromList(this);
    }
    toggle() {
        this.selected = !this.selected;
    }
    getLabel() {
        return this.text ? this.text.nativeElement.textContent : '';
    }
    setSelected(selected) {
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
        this.changeDetector.markForCheck();
    }
    getHeight() {
        return this.elementRef.nativeElement.getClientRects()[0].height;
    }
    handleClick($event) {
        if (this.disabled) {
            return;
        }
        this.listSelection.setSelectedOptionsByClick(this, hasModifierKey($event, 'shiftKey'), hasModifierKey($event, 'ctrlKey'));
    }
    focus() {
        if (!this.hasFocus) {
            this.elementRef.nativeElement.focus();
            this.onFocus.next({ option: this });
            Promise.resolve().then(() => {
                this.hasFocus = true;
                this.changeDetector.markForCheck();
            });
        }
    }
    blur() {
        // When animations are enabled, Angular may end up removing the option from the DOM a little
        // earlier than usual, causing it to be blurred and throwing off the logic in the list
        // that moves focus not the next item. To work around the issue, we defer marking the option
        // as not focused until the next time the zone stabilizes.
        this.ngZone.onStable
            .asObservable()
            .pipe(take(1))
            .subscribe(() => {
            this.ngZone.run(() => {
                this.hasFocus = false;
                this.onBlur.next({ option: this });
            });
        });
    }
    getHostElement() {
        return this.elementRef.nativeElement;
    }
}
McListOption.decorators = [
    { type: Component, args: [{
                exportAs: 'mcListOption',
                selector: 'mc-list-option',
                host: {
                    class: 'mc-list-option mc-no-select',
                    '[class.mc-selected]': 'selected',
                    '[class.mc-focused]': 'hasFocus',
                    '[class.mc-disabled]': 'disabled',
                    '[attr.tabindex]': 'tabIndex',
                    '[attr.disabled]': 'disabled || null',
                    '(focus)': 'focus()',
                    '(blur)': 'blur()',
                    '(click)': 'handleClick($event)'
                },
                template: "<div class=\"mc-list-item-content\">\n    <mc-pseudo-checkbox\n        *ngIf=\"showCheckbox\"\n        [state]=\"selected ? 'checked' : 'unchecked'\"\n        [disabled]=\"disabled\">\n    </mc-pseudo-checkbox>\n\n    <div class=\"mc-list-text\" #text>\n        <ng-content></ng-content>\n    </div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
/** @nocollapse */
McListOption.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: McListSelection, decorators: [{ type: Inject, args: [forwardRef(() => McListSelection),] }] },
    { type: McOptgroup, decorators: [{ type: Optional }] }
];
McListOption.propDecorators = {
    lines: [{ type: ContentChildren, args: [McLine,] }],
    text: [{ type: ViewChild, args: ['text', { static: false },] }],
    checkboxPosition: [{ type: Input }],
    value: [{ type: Input }],
    disabled: [{ type: Input }],
    showCheckbox: [{ type: Input }],
    selected: [{ type: Input }]
};
const MC_SELECTION_LIST_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => McListSelection),
    multi: true
};
class McListSelectionChange {
    constructor(source, option) {
        this.source = source;
        this.option = option;
    }
}
class McListSelectionBase {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
// tslint:disable-next-line:naming-convention
const McListSelectionMixinBase = mixinTabIndex(mixinDisabled(McListSelectionBase));
class McListSelection extends McListSelectionMixinBase {
    constructor(elementRef, changeDetectorRef, multiple) {
        super(elementRef);
        this.changeDetectorRef = changeDetectorRef;
        this._autoSelect = true;
        this._noUnselectLast = true;
        this.horizontal = false;
        this._tabIndex = 0;
        this.userTabIndex = null;
        // Emits a change event whenever the selected state of an option changes.
        this.selectionChange = new EventEmitter();
        /** Emits whenever the component is destroyed. */
        this.destroyed = new Subject();
        /**
         * Function used for comparing an option against the selected value when determining which
         * options should appear as selected. The first argument is the value of an options. The second
         * one is a value from the selected value. A boolean must be returned.
         */
        this.compareWith = (a1, a2) => a1 === a2;
        // View to model callback that should be called if the list or its options lost focus.
        // tslint:disable-next-line:no-empty
        this.onTouched = () => { };
        // View to model callback that should be called whenever the selected options change.
        this.onChange = (_) => { };
        if (multiple === MultipleMode.CHECKBOX || multiple === MultipleMode.KEYBOARD) {
            this.multipleMode = multiple;
        }
        else if (multiple !== null) {
            this.multipleMode = MultipleMode.CHECKBOX;
        }
        if (this.multipleMode === MultipleMode.CHECKBOX) {
            this.autoSelect = false;
            this.noUnselectLast = false;
        }
        this.selectionModel = new SelectionModel(this.multiple);
    }
    get autoSelect() {
        return this._autoSelect;
    }
    set autoSelect(value) {
        this._autoSelect = coerceBooleanProperty(value);
    }
    get noUnselectLast() {
        return this._noUnselectLast;
    }
    set noUnselectLast(value) {
        this._noUnselectLast = coerceBooleanProperty(value);
    }
    get multiple() {
        return !!this.multipleMode;
    }
    get tabIndex() {
        return this.disabled ? -1 : this._tabIndex;
    }
    set tabIndex(value) {
        this.userTabIndex = value;
        this._tabIndex = value;
    }
    get showCheckbox() {
        return this.multipleMode === MultipleMode.CHECKBOX;
    }
    get optionFocusChanges() {
        return merge(...this.options.map((option) => option.onFocus));
    }
    get optionBlurChanges() {
        return merge(...this.options.map((option) => option.onBlur));
    }
    ngAfterContentInit() {
        this.horizontal = toBoolean(this.horizontal);
        this.keyManager = new FocusKeyManager(this.options)
            .withTypeAhead()
            .withVerticalOrientation(!this.horizontal)
            .withHorizontalOrientation(this.horizontal ? 'ltr' : null);
        this.keyManager.tabOut
            .pipe(takeUntil(this.destroyed))
            .subscribe(() => {
            this._tabIndex = -1;
            setTimeout(() => {
                this._tabIndex = this.userTabIndex || 0;
                this.changeDetectorRef.markForCheck();
            });
        });
        if (this._value) {
            this.setOptionsFromValues(this._value);
        }
        this.selectionModel.changed
            .pipe(takeUntil(this.destroyed))
            .subscribe((event) => {
            for (const item of event.added) {
                item.selected = true;
            }
            for (const item of event.removed) {
                item.selected = false;
            }
        });
        this.options.changes
            .pipe(startWith(null), takeUntil(this.destroyed))
            .subscribe(() => {
            this.resetOptions();
            // Check to see if we need to update our tab index
            this.updateTabIndex();
        });
        this.updateScrollSize();
    }
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
    focus() {
        if (this.options.length === 0) {
            return;
        }
        this.keyManager.setFirstItemActive();
    }
    blur() {
        if (!this.hasFocusedOption()) {
            this.keyManager.setActiveItem(-1);
        }
        this.onTouched();
        this.changeDetectorRef.markForCheck();
    }
    selectAll() {
        this.options.forEach((option) => option.setSelected(true));
        this.reportValueChange();
    }
    deselectAll() {
        this.options.forEach((option) => option.setSelected(false));
        this.reportValueChange();
    }
    updateScrollSize() {
        if (this.horizontal || !this.options.first) {
            return;
        }
        this.keyManager.withScrollSize(Math.floor(this.getHeight() / this.options.first.getHeight()));
    }
    setSelectedOptionsByClick(option, shiftKey, ctrlKey) {
        if (shiftKey && this.multiple) {
            this.setSelectedOptions(option);
        }
        else if (ctrlKey) {
            if (!this.canDeselectLast(option)) {
                return;
            }
            this.selectionModel.toggle(option);
        }
        else if (this.autoSelect) {
            this.selectionModel.clear();
            this.selectionModel.toggle(option);
        }
        else {
            this.selectionModel.toggle(option);
        }
        this.emitChangeEvent(option);
        this.reportValueChange();
    }
    setSelectedOptionsByKey(option, shiftKey, ctrlKey) {
        if (shiftKey && this.multiple) {
            this.setSelectedOptions(option);
        }
        else if (ctrlKey) {
            if (!this.canDeselectLast(option)) {
                return;
            }
        }
        else {
            if (this.multipleMode === MultipleMode.KEYBOARD || !this.multiple) {
                this.options.forEach((item) => item.setSelected(false));
                option.setSelected(true);
            }
        }
        this.emitChangeEvent(option);
        this.reportValueChange();
    }
    setSelectedOptions(option) {
        const selectedOptionState = option.selected;
        let fromIndex = this.keyManager.previousActiveItemIndex;
        let toIndex = this.keyManager.previousActiveItemIndex = this.keyManager.activeItemIndex;
        if (toIndex === fromIndex) {
            return;
        }
        if (fromIndex > toIndex) {
            [fromIndex, toIndex] = [toIndex, fromIndex];
        }
        this.options
            .toArray()
            .slice(fromIndex, toIndex + 1)
            .filter((item) => !item.disabled)
            .forEach((renderedOption) => {
            const isLastRenderedOption = renderedOption === this.keyManager.activeItem;
            if (isLastRenderedOption && renderedOption.selected && this.noUnselectLast) {
                return;
            }
            renderedOption.setSelected(!selectedOptionState);
        });
    }
    // Implemented as part of ControlValueAccessor.
    writeValue(values) {
        this._value = values;
        if (this.options) {
            this.setOptionsFromValues(values || []);
        }
    }
    // Implemented as part of ControlValueAccessor.
    registerOnChange(fn) {
        this.onChange = fn;
    }
    // Implemented as part of ControlValueAccessor.
    registerOnTouched(fn) {
        this.onTouched = fn;
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
        const focusedIndex = this.keyManager.activeItemIndex;
        if (focusedIndex != null && this.isValidIndex(focusedIndex)) {
            const focusedOption = this.options.toArray()[focusedIndex];
            if (focusedOption && this.canDeselectLast(focusedOption)) {
                focusedOption.toggle();
                // Emit a change event because the focused option changed its state through user interaction.
                this.emitChangeEvent(focusedOption);
            }
        }
    }
    canDeselectLast(listOption) {
        return !(this.noUnselectLast && this.selectionModel.selected.length === 1 && listOption.selected);
    }
    getHeight() {
        return this.elementRef.nativeElement.getClientRects()[0].height;
    }
    // Removes an option from the selection list and updates the active item.
    removeOptionFromList(option) {
        if (option.hasFocus) {
            const optionIndex = this.getOptionIndex(option);
            // Check whether the option is the last item
            if (optionIndex > 0) {
                this.keyManager.setPreviousItemActive();
            }
            else if (optionIndex === 0 && this.options.length > 1) {
                this.keyManager.setNextItemActive();
            }
        }
    }
    onKeyDown(event) {
        // tslint:disable-next-line: deprecation
        const keyCode = event.keyCode;
        switch (keyCode) {
            case SPACE:
            case ENTER:
                this.toggleFocusedOption();
                break;
            case TAB:
                this.keyManager.tabOut.next();
                return;
            case DOWN_ARROW:
                this.keyManager.setNextItemActive();
                break;
            case UP_ARROW:
                this.keyManager.setPreviousItemActive();
                break;
            case HOME:
                this.keyManager.setFirstItemActive();
                break;
            case END:
                this.keyManager.setLastItemActive();
                break;
            case PAGE_UP:
                this.keyManager.setPreviousPageItemActive();
                break;
            case PAGE_DOWN:
                this.keyManager.setNextPageItemActive();
                break;
            default:
                return;
        }
        event.preventDefault();
        this.setSelectedOptionsByKey(this.keyManager.activeItem, hasModifierKey(event, 'shiftKey'), hasModifierKey(event, 'ctrlKey'));
    }
    // Reports a value change to the ControlValueAccessor
    reportValueChange() {
        if (this.options) {
            const value = this.getSelectedOptionValues();
            this.onChange(value);
            this._value = value;
        }
    }
    // Emits a change event if the selected state of an option changed.
    emitChangeEvent(option) {
        this.selectionChange.emit(new McListSelectionChange(this, option));
    }
    updateTabIndex() {
        this._tabIndex = this.userTabIndex || (this.options.length === 0 ? -1 : 0);
    }
    resetOptions() {
        this.dropSubscriptions();
        this.listenToOptionsFocus();
    }
    dropSubscriptions() {
        if (this.optionFocusSubscription) {
            this.optionFocusSubscription.unsubscribe();
            this.optionFocusSubscription = null;
        }
        if (this.optionBlurSubscription) {
            this.optionBlurSubscription.unsubscribe();
            this.optionBlurSubscription = null;
        }
    }
    listenToOptionsFocus() {
        this.optionFocusSubscription = this.optionFocusChanges
            .subscribe((event) => {
            const index = this.options.toArray().indexOf(event.option);
            if (this.isValidIndex(index)) {
                this.keyManager.updateActiveItem(index);
            }
        });
        this.optionBlurSubscription = this.optionBlurChanges
            .subscribe(() => this.blur());
    }
    /** Checks whether any of the options is focused. */
    hasFocusedOption() {
        return this.options.some((option) => option.hasFocus);
    }
    // Returns the option with the specified value.
    getOptionByValue(value) {
        return this.options.find((option) => option.value === value);
    }
    // Sets the selected options based on the specified values.
    setOptionsFromValues(values) {
        this.options.forEach((option) => option.setSelected(false));
        values
            .map((value) => this.getOptionByValue(value))
            .filter(Boolean)
            .forEach((option) => option.setSelected(true));
    }
    /**
     * Utility to ensure all indexes are valid.
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of options.
     */
    isValidIndex(index) {
        return index >= 0 && index < this.options.length;
    }
    // Returns the index of the specified list option.
    getOptionIndex(option) {
        return this.options.toArray().indexOf(option);
    }
}
McListSelection.decorators = [
    { type: Component, args: [{
                exportAs: 'mcListSelection',
                selector: 'mc-list-selection',
                template: '<ng-content></ng-content>',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                inputs: ['disabled'],
                host: {
                    class: 'mc-list-selection',
                    '[attr.tabindex]': 'tabIndex',
                    '[attr.disabled]': 'disabled || null',
                    '(focus)': 'focus()',
                    '(blur)': 'blur()',
                    '(keydown)': 'onKeyDown($event)',
                    '(window:resize)': 'updateScrollSize()'
                },
                providers: [MC_SELECTION_LIST_VALUE_ACCESSOR],
                preserveWhitespaces: false,
                styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-divider{display:block;margin:0;border-top-width:var(--mc-divider-size-width,1px);border-top-style:solid}.mc-divider.mc-divider_vertical{border-top:0;border-right-width:var(--mc-divider-size-width,1px);border-right-style:solid}.mc-divider.mc-divider_inset{margin-left:var(--mc-divider-size-inset-margin,80px)}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:var(--mc-divider-size-inset-margin,80px)}.mc-list,.mc-list-selection{display:block;outline:none}.mc-list-item,.mc-list-option{display:block;height:var(--mc-list-size-item-height,28px);border:2px solid transparent}.mc-list-item .mc-list-item-content,.mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:100%;padding:0 var(--mc-list-size-horizontal-padding,16px)}.mc-list-item.mc-2-line,.mc-list-option.mc-2-line{height:var(--mc-list-size-two-line-height,72px)}.mc-list-item.mc-3-line,.mc-list-option.mc-3-line{height:var(--mc-list-size-three-line-height,88px)}.mc-list-item.mc-multi-line,.mc-list-option.mc-multi-line{height:auto}.mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-option.mc-multi-line .mc-list-item-content{padding-top:var(--mc-list-size-multi-line-padding,16px);padding-bottom:var(--mc-list-size-multi-line-padding,16px)}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:var(--mc-list-size-icon-width,24px);height:var(--mc-list-size-icon-width,24px);border-radius:50%;padding:var(--mc-list-size-icon-padding,4px);font-size:var(--mc-list-size-icon-width,24px)}.mc-list-item .mc-list-icon~.mc-divider_inset,.mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:32pxvar(--mc-list-size-icon-width,24px)8px;width:100%-32pxvar(--mc-list-size-icon-width,24px)8px}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider_inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:auto;margin-right:32pxvar(--mc-list-size-icon-width,24px)8px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider_inset,.mc-list-option .mc-divider.mc-divider_inset{position:absolute}.mc-list-item .mc-pseudo-checkbox,.mc-list-option .mc-pseudo-checkbox{margin-right:8px}.mc-list-option:not([disabled]):not(.mc-disabled){cursor:pointer}"]
            },] }
];
/** @nocollapse */
McListSelection.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: MultipleMode, decorators: [{ type: Attribute, args: ['multiple',] }] }
];
McListSelection.propDecorators = {
    options: [{ type: ContentChildren, args: [McListOption, { descendants: true },] }],
    autoSelect: [{ type: Input }],
    noUnselectLast: [{ type: Input }],
    horizontal: [{ type: Input }],
    tabIndex: [{ type: Input }],
    selectionChange: [{ type: Output }],
    compareWith: [{ type: Input }]
};

// todo пока не делаем, перенесено из материала, но у нас в доках таких простых списков нет.
class McList {
}
McList.decorators = [
    { type: Component, args: [{
                selector: 'mc-list',
                host: { class: 'mc-list' },
                template: '<ng-content></ng-content>',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-divider{display:block;margin:0;border-top-width:var(--mc-divider-size-width,1px);border-top-style:solid}.mc-divider.mc-divider_vertical{border-top:0;border-right-width:var(--mc-divider-size-width,1px);border-right-style:solid}.mc-divider.mc-divider_inset{margin-left:var(--mc-divider-size-inset-margin,80px)}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:var(--mc-divider-size-inset-margin,80px)}.mc-list,.mc-list-selection{display:block;outline:none}.mc-list-item,.mc-list-option{display:block;height:var(--mc-list-size-item-height,28px);border:2px solid transparent}.mc-list-item .mc-list-item-content,.mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:100%;padding:0 var(--mc-list-size-horizontal-padding,16px)}.mc-list-item.mc-2-line,.mc-list-option.mc-2-line{height:var(--mc-list-size-two-line-height,72px)}.mc-list-item.mc-3-line,.mc-list-option.mc-3-line{height:var(--mc-list-size-three-line-height,88px)}.mc-list-item.mc-multi-line,.mc-list-option.mc-multi-line{height:auto}.mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-option.mc-multi-line .mc-list-item-content{padding-top:var(--mc-list-size-multi-line-padding,16px);padding-bottom:var(--mc-list-size-multi-line-padding,16px)}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:var(--mc-list-size-icon-width,24px);height:var(--mc-list-size-icon-width,24px);border-radius:50%;padding:var(--mc-list-size-icon-padding,4px);font-size:var(--mc-list-size-icon-width,24px)}.mc-list-item .mc-list-icon~.mc-divider_inset,.mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:32pxvar(--mc-list-size-icon-width,24px)8px;width:100%-32pxvar(--mc-list-size-icon-width,24px)8px}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider_inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:auto;margin-right:32pxvar(--mc-list-size-icon-width,24px)8px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider_inset,.mc-list-option .mc-divider.mc-divider_inset{position:absolute}.mc-list-item .mc-pseudo-checkbox,.mc-list-option .mc-pseudo-checkbox{margin-right:8px}.mc-list-option:not([disabled]):not(.mc-disabled){cursor:pointer}"]
            },] }
];
class McListItem {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngAfterContentInit() {
        // tslint:disable-next-line:no-unused-expression
        new McLineSetter(this.lines, this.elementRef);
    }
    handleFocus() {
        this.elementRef.nativeElement.classList.add('mc-focused');
    }
    handleBlur() {
        this.elementRef.nativeElement.classList.remove('mc-focused');
    }
    getHostElement() {
        return this.elementRef.nativeElement;
    }
}
McListItem.decorators = [
    { type: Component, args: [{
                selector: 'mc-list-item, a[mc-list-item]',
                host: {
                    class: 'mc-list-item',
                    '(focus)': 'handleFocus()',
                    '(blur)': 'handleBlur()'
                },
                template: "<div class=\"mc-list-item-content\">\n    <ng-content select=\"[mc-list-icon], [mcListIcon]\"></ng-content>\n\n    <div class=\"mc-list-text\">\n        <ng-content select=\"[mc-line], [mcLine]\"></ng-content>\n    </div>\n\n    <ng-content></ng-content>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
/** @nocollapse */
McListItem.ctorParameters = () => [
    { type: ElementRef }
];
McListItem.propDecorators = {
    lines: [{ type: ContentChildren, args: [McLine,] }]
};

class McListModule {
}
McListModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    A11yModule,
                    McPseudoCheckboxModule,
                    McLineModule,
                    McOptionModule
                ],
                exports: [
                    McList,
                    McListSelection,
                    McListItem,
                    McListOption,
                    McOptionModule
                ],
                declarations: [
                    McList,
                    McListSelection,
                    McListItem,
                    McListOption
                ]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { MC_SELECTION_LIST_VALUE_ACCESSOR, McList, McListItem, McListModule, McListOption, McListSelection, McListSelectionBase, McListSelectionChange, McListSelectionMixinBase };
//# sourceMappingURL=ptsecurity-mosaic-list.js.map
