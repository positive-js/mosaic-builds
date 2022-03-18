/* tslint:disable:no-empty */
import { Clipboard } from '@angular/cdk/clipboard';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { Attribute, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Input, Output, QueryList, ViewEncapsulation, ChangeDetectorRef, Inject, ViewChild, NgZone, Optional, ContentChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { hasModifierKey, isCopy, isSelectAll, isVerticalMovement, DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, SPACE, TAB, UP_ARROW } from '@ptsecurity/cdk/keycodes';
import { mixinDisabled, toBoolean, mixinTabIndex, MultipleMode, McOptgroup, MC_OPTION_ACTION_PARENT, McOptionActionComponent } from '@ptsecurity/mosaic/core';
import { McDropdownTrigger } from '@ptsecurity/mosaic/dropdown';
import { McTooltipTrigger } from '@ptsecurity/mosaic/tooltip';
import { merge, Subject } from 'rxjs';
import { startWith, take, takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@ptsecurity/mosaic/core";
import * as i2 from "@angular/common";
import * as i3 from "@angular/cdk/clipboard";
/**
 * Component for list-options of selection-list. Each list-option can automatically
 * generate a checkbox and can put current item into the selectionModel of selection-list
 * if the current item is selected.
 */
export class McListOption {
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
        return this.listSelection.selectionModel?.isSelected(this) || false;
    }
    set selected(value) {
        const isSelected = toBoolean(value);
        if (isSelected !== this._selected) {
            this.setSelected(isSelected);
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
        const clientRects = this.elementRef.nativeElement.getClientRects();
        return clientRects.length ? clientRects[0].height : 0;
    }
    handleClick($event) {
        if (this.disabled) {
            return;
        }
        this.listSelection.setSelectedOptionsByClick(this, hasModifierKey($event, 'shiftKey'), hasModifierKey($event, 'ctrlKey'));
    }
    onKeydown($event) {
        if (!this.actionButton) {
            return;
        }
        if ($event.keyCode === TAB && !$event.shiftKey && !this.actionButton.hasFocus) {
            this.actionButton.focus();
            $event.preventDefault();
        }
    }
    focus() {
        if (this.disabled || this.hasFocus || this.actionButton?.hasFocus) {
            return;
        }
        this.elementRef.nativeElement.focus();
        this.onFocus.next({ option: this });
        Promise.resolve().then(() => {
            this.hasFocus = true;
            this.changeDetector.markForCheck();
        });
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
                if (this.actionButton?.hasFocus) {
                    return;
                }
                this.onBlur.next({ option: this });
            });
        });
    }
    getHostElement() {
        return this.elementRef.nativeElement;
    }
}
/** @nocollapse */ /** @nocollapse */ McListOption.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McListOption, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: forwardRef(() => McListSelection) }, { token: i1.McOptgroup, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McListOption.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McListOption, selector: "mc-list-option", inputs: { checkboxPosition: "checkboxPosition", value: "value", disabled: "disabled", showCheckbox: "showCheckbox", selected: "selected" }, host: { listeners: { "focusin": "focus()", "blur": "blur()", "click": "handleClick($event)", "keydown": "onKeydown($event)" }, properties: { "class.mc-selected": "selected", "class.mc-disabled": "disabled", "class.mc-focused": "hasFocus", "class.mc-action-button-focused": "actionButton?.active", "attr.tabindex": "tabIndex", "attr.disabled": "disabled || null" }, classAttribute: "mc-list-option" }, providers: [
        { provide: MC_OPTION_ACTION_PARENT, useExisting: McListOption }
    ], queries: [{ propertyName: "actionButton", first: true, predicate: McOptionActionComponent, descendants: true }, { propertyName: "tooltipTrigger", first: true, predicate: McTooltipTrigger, descendants: true }, { propertyName: "dropdownTrigger", first: true, predicate: McDropdownTrigger, descendants: true }], viewQueries: [{ propertyName: "text", first: true, predicate: ["text"], descendants: true }], exportAs: ["mcListOption"], ngImport: i0, template: "<mc-pseudo-checkbox\n    *ngIf=\"showCheckbox\"\n    [state]=\"selected ? 'checked' : 'unchecked'\"\n    [disabled]=\"disabled\">\n</mc-pseudo-checkbox>\n\n<div class=\"mc-list-text\" #text>\n    <ng-content></ng-content>\n</div>\n\n<ng-content select=\"mc-option-action\"></ng-content>\n", components: [{ type: i1.McPseudoCheckbox, selector: "mc-pseudo-checkbox", inputs: ["state", "disabled"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McListOption, decorators: [{
            type: Component,
            args: [{ exportAs: 'mcListOption', selector: 'mc-list-option', host: {
                        class: 'mc-list-option',
                        '[class.mc-selected]': 'selected',
                        '[class.mc-disabled]': 'disabled',
                        '[class.mc-focused]': 'hasFocus',
                        '[class.mc-action-button-focused]': 'actionButton?.active',
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.disabled]': 'disabled || null',
                        '(focusin)': 'focus()',
                        '(blur)': 'blur()',
                        '(click)': 'handleClick($event)',
                        '(keydown)': 'onKeydown($event)'
                    }, encapsulation: ViewEncapsulation.None, preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        { provide: MC_OPTION_ACTION_PARENT, useExisting: McListOption }
                    ], template: "<mc-pseudo-checkbox\n    *ngIf=\"showCheckbox\"\n    [state]=\"selected ? 'checked' : 'unchecked'\"\n    [disabled]=\"disabled\">\n</mc-pseudo-checkbox>\n\n<div class=\"mc-list-text\" #text>\n    <ng-content></ng-content>\n</div>\n\n<ng-content select=\"mc-option-action\"></ng-content>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: McListSelection, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => McListSelection)]
                }] }, { type: i1.McOptgroup, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { actionButton: [{
                type: ContentChild,
                args: [McOptionActionComponent]
            }], tooltipTrigger: [{
                type: ContentChild,
                args: [McTooltipTrigger]
            }], dropdownTrigger: [{
                type: ContentChild,
                args: [McDropdownTrigger]
            }], text: [{
                type: ViewChild,
                args: ['text', { static: false }]
            }], checkboxPosition: [{
                type: Input
            }], value: [{
                type: Input
            }], disabled: [{
                type: Input
            }], showCheckbox: [{
                type: Input
            }], selected: [{
                type: Input
            }] } });
export const MC_SELECTION_LIST_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => McListSelection),
    multi: true
};
export class McListSelectionChange {
    constructor(source, option) {
        this.source = source;
        this.option = option;
    }
}
export class McListSelectAllEvent {
    constructor(source, options) {
        this.source = source;
        this.options = options;
    }
}
export class McListCopyEvent {
    constructor(source, option) {
        this.source = source;
        this.option = option;
    }
}
export class McListSelectionBase {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
// tslint:disable-next-line:naming-convention
export const McListSelectionMixinBase = mixinTabIndex(mixinDisabled(McListSelectionBase));
export class McListSelection extends McListSelectionMixinBase {
    constructor(elementRef, changeDetectorRef, multiple, clipboard) {
        super(elementRef);
        this.changeDetectorRef = changeDetectorRef;
        this.clipboard = clipboard;
        this.onSelectAll = new EventEmitter();
        this.onCopy = new EventEmitter();
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
        else if (this.autoSelect) {
            this.options.forEach((item) => item.setSelected(false));
            option.setSelected(true);
            this.emitChangeEvent(option);
            this.reportValueChange();
        }
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
        const clientRects = this.elementRef.nativeElement.getClientRects();
        return clientRects.length ? clientRects[0].height : 0;
    }
    // Removes an option from the selection list and updates the active item.
    removeOptionFromList(option) {
        if (!option.hasFocus) {
            return;
        }
        const optionIndex = this.getOptionIndex(option);
        // Check whether the option is the last item
        if (optionIndex > 0) {
            this.keyManager.setPreviousItemActive();
        }
        else if (optionIndex === 0 && this.options.length > 1) {
            this.keyManager.setNextItemActive();
        }
    }
    onKeyDown(event) {
        // tslint:disable-next-line: deprecation
        const keyCode = event.keyCode;
        if ([SPACE, ENTER, LEFT_ARROW, RIGHT_ARROW].includes(keyCode) || isVerticalMovement(event)) {
            event.preventDefault();
        }
        if (this.multiple && isSelectAll(event)) {
            this.selectAllOptions();
            event.preventDefault();
            return;
        }
        else if (isCopy(event)) {
            this.copyActiveOption();
            event.preventDefault();
            return;
        }
        else if ([SPACE, ENTER].includes(keyCode)) {
            this.toggleFocusedOption();
            return;
        }
        else if (keyCode === TAB) {
            this.keyManager.tabOut.next();
            return;
        }
        else if (keyCode === DOWN_ARROW) {
            this.keyManager.setNextItemActive();
        }
        else if (keyCode === UP_ARROW) {
            this.keyManager.setPreviousItemActive();
        }
        else if (keyCode === HOME) {
            this.keyManager.setFirstItemActive();
        }
        else if (keyCode === END) {
            this.keyManager.setLastItemActive();
        }
        else if (keyCode === PAGE_UP) {
            this.keyManager.setPreviousPageItemActive();
        }
        else if (keyCode === PAGE_DOWN) {
            this.keyManager.setNextPageItemActive();
        }
        if (this.keyManager.activeItem && isVerticalMovement(event)) {
            this.setSelectedOptionsByKey(this.keyManager.activeItem, hasModifierKey(event, 'shiftKey'), hasModifierKey(event, 'ctrlKey'));
        }
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
    onCopyDefaultHandler() {
        this.clipboard?.copy(this.keyManager.activeItem.value);
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
    selectAllOptions() {
        const optionsToSelect = this.options
            .filter((option) => !option.disabled);
        optionsToSelect
            .forEach((option) => option.setSelected(true));
        this.onSelectAll.emit(new McListSelectAllEvent(this, optionsToSelect));
    }
    copyActiveOption() {
        if (this.onCopy.observers.length) {
            this.onCopy.emit(new McListCopyEvent(this, this.keyManager.activeItem));
        }
        else {
            this.onCopyDefaultHandler();
        }
    }
}
/** @nocollapse */ /** @nocollapse */ McListSelection.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McListSelection, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: 'multiple', attribute: true }, { token: i3.Clipboard, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McListSelection.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McListSelection, selector: "mc-list-selection", inputs: { disabled: "disabled", autoSelect: "autoSelect", noUnselectLast: "noUnselectLast", horizontal: "horizontal", tabIndex: "tabIndex", compareWith: "compareWith" }, outputs: { onSelectAll: "onSelectAll", onCopy: "onCopy", selectionChange: "selectionChange" }, host: { listeners: { "keydown": "onKeyDown($event)", "window:resize": "updateScrollSize()" }, properties: { "attr.tabindex": "-1", "attr.disabled": "disabled || null" }, classAttribute: "mc-list-selection" }, providers: [MC_SELECTION_LIST_VALUE_ACCESSOR], queries: [{ propertyName: "options", predicate: McListOption, descendants: true }], exportAs: ["mcListSelection"], usesInheritance: true, ngImport: i0, template: `
        <div [attr.tabindex]="tabIndex"
             (focus)="focus()"
             (blur)="blur()">
            <ng-content></ng-content>
        </div>`, isInline: true, styles: [".mc-divider{display:block;margin:0}.mc-divider.mc-divider_horizontal{border-top-width:var(--mc-divider-size-width, 1px);border-top-style:solid}.mc-divider.mc-divider_vertical{height:100%;border-right-width:var(--mc-divider-size-width, 1px);border-right-style:solid}.mc-divider.mc-divider_inset{margin-left:var(--mc-divider-size-inset-margin, 80px)}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:var(--mc-divider-size-inset-margin, 80px)}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.mc-list,.mc-list-selection{display:block;outline:none}.mc-list-item,.mc-list-option{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;position:relative;display:flex;align-items:center;box-sizing:border-box;height:var(--mc-list-size-item-height, 32px);border:2px solid transparent;padding-left:var(--mc-list-size-horizontal-padding, 16px)}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding-right:var(--mc-list-size-horizontal-padding, 16px)}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:var(--mc-list-size-icon-width, 24px);height:var(--mc-list-size-icon-width, 24px);border-radius:50%;padding:var(--mc-list-size-icon-padding, 4px);font-size:var(--mc-list-size-icon-width, 24px)}.mc-list-item .mc-list-icon~.mc-divider_inset,.mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:32pxvar(--mc-list-size-icon-width,24px)8px;width:100%-32pxvar(--mc-list-size-icon-width,24px)8px}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider_inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:auto;margin-right:32pxvar(--mc-list-size-icon-width,24px)8px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider_inset,.mc-list-option .mc-divider.mc-divider_inset{position:absolute}.mc-list-item.mc-progress:after,.mc-list-option.mc-progress:after{top:-2px;right:-2px;bottom:-2px;left:-2px}.mc-list-item .mc-pseudo-checkbox,.mc-list-option .mc-pseudo-checkbox{margin-right:8px}.mc-list-item .mc-option-action,.mc-list-option .mc-option-action{display:none}.mc-list-item:not([disabled]):hover .mc-option-action,.mc-list-item:not([disabled]).mc-focused .mc-option-action,.mc-list-item:not([disabled]).mc-action-button-focused .mc-option-action,.mc-list-option:not([disabled]):hover .mc-option-action,.mc-list-option:not([disabled]).mc-focused .mc-option-action,.mc-list-option:not([disabled]).mc-action-button-focused .mc-option-action{display:flex}.mc-list-option:not([disabled]):not(.mc-disabled){cursor:pointer}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McListSelection, decorators: [{
            type: Component,
            args: [{ exportAs: 'mcListSelection', selector: 'mc-list-selection', template: `
        <div [attr.tabindex]="tabIndex"
             (focus)="focus()"
             (blur)="blur()">
            <ng-content></ng-content>
        </div>`, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, inputs: ['disabled'], host: {
                        class: 'mc-list-selection',
                        '[attr.tabindex]': '-1',
                        '[attr.disabled]': 'disabled || null',
                        '(keydown)': 'onKeyDown($event)',
                        '(window:resize)': 'updateScrollSize()'
                    }, providers: [MC_SELECTION_LIST_VALUE_ACCESSOR], preserveWhitespaces: false, styles: [".mc-divider{display:block;margin:0}.mc-divider.mc-divider_horizontal{border-top-width:var(--mc-divider-size-width, 1px);border-top-style:solid}.mc-divider.mc-divider_vertical{height:100%;border-right-width:var(--mc-divider-size-width, 1px);border-right-style:solid}.mc-divider.mc-divider_inset{margin-left:var(--mc-divider-size-inset-margin, 80px)}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:var(--mc-divider-size-inset-margin, 80px)}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.mc-list,.mc-list-selection{display:block;outline:none}.mc-list-item,.mc-list-option{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;position:relative;display:flex;align-items:center;box-sizing:border-box;height:var(--mc-list-size-item-height, 32px);border:2px solid transparent;padding-left:var(--mc-list-size-horizontal-padding, 16px)}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding-right:var(--mc-list-size-horizontal-padding, 16px)}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:var(--mc-list-size-icon-width, 24px);height:var(--mc-list-size-icon-width, 24px);border-radius:50%;padding:var(--mc-list-size-icon-padding, 4px);font-size:var(--mc-list-size-icon-width, 24px)}.mc-list-item .mc-list-icon~.mc-divider_inset,.mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:32pxvar(--mc-list-size-icon-width,24px)8px;width:100%-32pxvar(--mc-list-size-icon-width,24px)8px}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider_inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:auto;margin-right:32pxvar(--mc-list-size-icon-width,24px)8px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider_inset,.mc-list-option .mc-divider.mc-divider_inset{position:absolute}.mc-list-item.mc-progress:after,.mc-list-option.mc-progress:after{top:-2px;right:-2px;bottom:-2px;left:-2px}.mc-list-item .mc-pseudo-checkbox,.mc-list-option .mc-pseudo-checkbox{margin-right:8px}.mc-list-item .mc-option-action,.mc-list-option .mc-option-action{display:none}.mc-list-item:not([disabled]):hover .mc-option-action,.mc-list-item:not([disabled]).mc-focused .mc-option-action,.mc-list-item:not([disabled]).mc-action-button-focused .mc-option-action,.mc-list-option:not([disabled]):hover .mc-option-action,.mc-list-option:not([disabled]).mc-focused .mc-option-action,.mc-list-option:not([disabled]).mc-action-button-focused .mc-option-action{display:flex}.mc-list-option:not([disabled]):not(.mc-disabled){cursor:pointer}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.MultipleMode, decorators: [{
                    type: Attribute,
                    args: ['multiple']
                }] }, { type: i3.Clipboard, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { options: [{
                type: ContentChildren,
                args: [McListOption, { descendants: true }]
            }], onSelectAll: [{
                type: Output
            }], onCopy: [{
                type: Output
            }], autoSelect: [{
                type: Input
            }], noUnselectLast: [{
                type: Input
            }], horizontal: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], selectionChange: [{
                type: Output
            }], compareWith: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zZWxlY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2xpc3QvbGlzdC1zZWxlY3Rpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2xpc3QvbGlzdC1vcHRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2QkFBNkI7QUFDN0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBRUgsU0FBUyxFQUNULHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNqQixpQkFBaUIsRUFDakIsTUFBTSxFQUdOLFNBQVMsRUFDVCxNQUFNLEVBQ04sUUFBUSxFQUNSLFlBQVksRUFDZixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBb0IsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RSxPQUFPLEVBQ0gsY0FBYyxFQUNkLE1BQU0sRUFDTixXQUFXLEVBQ1gsa0JBQWtCLEVBQ2xCLFVBQVUsRUFDVixHQUFHLEVBQ0gsS0FBSyxFQUNMLElBQUksRUFDSixVQUFVLEVBQ1YsU0FBUyxFQUNULE9BQU8sRUFDUCxXQUFXLEVBQ1gsS0FBSyxFQUNMLEdBQUcsRUFDSCxRQUFRLEVBQ1gsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBRUgsYUFBYSxFQUNiLFNBQVMsRUFHVCxhQUFhLEVBRWIsWUFBWSxFQUNa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QkFDcEIsUUFBUTs0Q0FqRnlDLE9BQU87c0JBQTVELGVBQWU7dUJBQUMsWUFBWSxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtnQkFFakMsV0FBVztzQkFBN0IsTUFBTTtnQkFFWSxNQUFNO3NCQUF4QixNQUFNO2dCQUdILFVBQVU7c0JBRGIsS0FBSztnQkFZRixjQUFjO3NCQURqQixLQUFLO2dCQWlCRyxVQUFVO3NCQUFsQixLQUFLO2dCQUdGLFFBQVE7c0JBRFgsS0FBSztnQkFtQmEsZUFBZTtzQkFBakMsTUFBTTtnQkFpREUsV0FBVztzQkFBbkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlOm5vLWVtcHR5ICovXG5pbXBvcnQgeyBDbGlwYm9hcmQgfSBmcm9tICdAYW5ndWxhci9jZGsvY2xpcGJvYXJkJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQXR0cmlidXRlLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIEluamVjdCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBOZ1pvbmUsXG4gICAgT3B0aW9uYWwsXG4gICAgQ29udGVudENoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9jdXNLZXlNYW5hZ2VyLCBJRm9jdXNhYmxlT3B0aW9uIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2ExMXknO1xuaW1wb3J0IHtcbiAgICBoYXNNb2RpZmllcktleSxcbiAgICBpc0NvcHksXG4gICAgaXNTZWxlY3RBbGwsXG4gICAgaXNWZXJ0aWNhbE1vdmVtZW50LFxuICAgIERPV05fQVJST1csXG4gICAgRU5ELFxuICAgIEVOVEVSLFxuICAgIEhPTUUsXG4gICAgTEVGVF9BUlJPVyxcbiAgICBQQUdFX0RPV04sXG4gICAgUEFHRV9VUCxcbiAgICBSSUdIVF9BUlJPVyxcbiAgICBTUEFDRSxcbiAgICBUQUIsXG4gICAgVVBfQVJST1dcbn0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gICAgQ2FuRGlzYWJsZSxcbiAgICBtaXhpbkRpc2FibGVkLFxuICAgIHRvQm9vbGVhbixcbiAgICBDYW5EaXNhYmxlQ3RvcixcbiAgICBIYXNUYWJJbmRleEN0b3IsXG4gICAgbWl4aW5UYWJJbmRleCxcbiAgICBIYXNUYWJJbmRleCxcbiAgICBNdWx0aXBsZU1vZGUsXG4gICAgTWNPcHRncm91cCxcbiAgICBNQ19PUFRJT05fQUNUSU9OX1BBUkVOVCxcbiAgICBNY09wdGlvbkFjdGlvbkNvbXBvbmVudFxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0Ryb3Bkb3duVHJpZ2dlciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9kcm9wZG93bic7XG5pbXBvcnQgeyBNY1Rvb2x0aXBUcmlnZ2VyIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL3Rvb2x0aXAnO1xuaW1wb3J0IHsgbWVyZ2UsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoLCB0YWtlLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIE1jT3B0aW9uRXZlbnQge1xuICAgIG9wdGlvbjogTWNMaXN0T3B0aW9uO1xufVxuXG4vKipcbiAqIENvbXBvbmVudCBmb3IgbGlzdC1vcHRpb25zIG9mIHNlbGVjdGlvbi1saXN0LiBFYWNoIGxpc3Qtb3B0aW9uIGNhbiBhdXRvbWF0aWNhbGx5XG4gKiBnZW5lcmF0ZSBhIGNoZWNrYm94IGFuZCBjYW4gcHV0IGN1cnJlbnQgaXRlbSBpbnRvIHRoZSBzZWxlY3Rpb25Nb2RlbCBvZiBzZWxlY3Rpb24tbGlzdFxuICogaWYgdGhlIGN1cnJlbnQgaXRlbSBpcyBzZWxlY3RlZC5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgZXhwb3J0QXM6ICdtY0xpc3RPcHRpb24nLFxuICAgIHNlbGVjdG9yOiAnbWMtbGlzdC1vcHRpb24nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9saXN0LW9wdGlvbi5odG1sJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbGlzdC1vcHRpb24nLFxuXG4gICAgICAgICdbY2xhc3MubWMtc2VsZWN0ZWRdJzogJ3NlbGVjdGVkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWZvY3VzZWRdJzogJ2hhc0ZvY3VzJyxcblxuICAgICAgICAnW2NsYXNzLm1jLWFjdGlvbi1idXR0b24tZm9jdXNlZF0nOiAnYWN0aW9uQnV0dG9uPy5hY3RpdmUnLFxuXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuXG4gICAgICAgICcoZm9jdXNpbiknOiAnZm9jdXMoKScsXG4gICAgICAgICcoYmx1ciknOiAnYmx1cigpJyxcbiAgICAgICAgJyhjbGljayknOiAnaGFuZGxlQ2xpY2soJGV2ZW50KScsXG4gICAgICAgICcoa2V5ZG93biknOiAnb25LZXlkb3duKCRldmVudCknXG4gICAgfSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IE1DX09QVElPTl9BQ1RJT05fUEFSRU5ULCB1c2VFeGlzdGluZzogTWNMaXN0T3B0aW9uIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jTGlzdE9wdGlvbiBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0LCBJRm9jdXNhYmxlT3B0aW9uIHtcbiAgICBoYXNGb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcmVhZG9ubHkgb25Gb2N1cyA9IG5ldyBTdWJqZWN0PE1jT3B0aW9uRXZlbnQ+KCk7XG5cbiAgICByZWFkb25seSBvbkJsdXIgPSBuZXcgU3ViamVjdDxNY09wdGlvbkV2ZW50PigpO1xuXG4gICAgQENvbnRlbnRDaGlsZChNY09wdGlvbkFjdGlvbkNvbXBvbmVudCkgYWN0aW9uQnV0dG9uOiBNY09wdGlvbkFjdGlvbkNvbXBvbmVudDtcbiAgICBAQ29udGVudENoaWxkKE1jVG9vbHRpcFRyaWdnZXIpIHRvb2x0aXBUcmlnZ2VyOiBNY1Rvb2x0aXBUcmlnZ2VyO1xuICAgIEBDb250ZW50Q2hpbGQoTWNEcm9wZG93blRyaWdnZXIpIGRyb3Bkb3duVHJpZ2dlcjogTWNEcm9wZG93blRyaWdnZXI7XG5cbiAgICBAVmlld0NoaWxkKCd0ZXh0JywgeyBzdGF0aWM6IGZhbHNlIH0pIHRleHQ6IEVsZW1lbnRSZWY7XG5cbiAgICAvLyBXaGV0aGVyIHRoZSBsYWJlbCBzaG91bGQgYXBwZWFyIGJlZm9yZSBvciBhZnRlciB0aGUgY2hlY2tib3guIERlZmF1bHRzIHRvICdhZnRlcidcbiAgICBASW5wdXQoKSBjaGVja2JveFBvc2l0aW9uOiAnYmVmb3JlJyB8ICdhZnRlcic7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHNldCB0byB0cnVlIGFmdGVyIHRoZSBmaXJzdCBPbkNoYW5nZXMgY3ljbGUgc28gd2UgZG9uJ3QgY2xlYXIgdGhlIHZhbHVlIG9mIGBzZWxlY3RlZGBcbiAgICAgKiBpbiB0aGUgZmlyc3QgY3ljbGUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbnB1dHNJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgdmFsdWUoKTogYW55IHsgcmV0dXJuIHRoaXMuX3ZhbHVlOyB9XG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQgJiYgbmV3VmFsdWUgIT09IHRoaXMudmFsdWUgJiYgdGhpcy5pbnB1dHNJbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB9XG4gICAgcHJpdmF0ZSBfdmFsdWU6IGFueTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICBjb25zdCBsaXN0U2VsZWN0aW9uRGlzYWJsZWQgPSB0aGlzLmxpc3RTZWxlY3Rpb24gJiYgdGhpcy5saXN0U2VsZWN0aW9uLmRpc2FibGVkO1xuICAgICAgICBjb25zdCBncm91cERpc2FibGVkID0gdGhpcy5ncm91cCAmJiB0aGlzLmdyb3VwLmRpc2FibGVkO1xuXG4gICAgICAgIHJldHVybiBsaXN0U2VsZWN0aW9uRGlzYWJsZWQgfHwgZ3JvdXBEaXNhYmxlZCB8fCB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGFueSkge1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRvQm9vbGVhbih2YWx1ZSk7XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgc2hvd0NoZWNrYm94KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hvd0NoZWNrYm94ICE9PSB1bmRlZmluZWQgPyB0aGlzLl9zaG93Q2hlY2tib3ggOiB0aGlzLmxpc3RTZWxlY3Rpb24uc2hvd0NoZWNrYm94O1xuICAgIH1cblxuICAgIHNldCBzaG93Q2hlY2tib3godmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl9zaG93Q2hlY2tib3ggPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3Nob3dDaGVja2JveDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0U2VsZWN0aW9uLnNlbGVjdGlvbk1vZGVsPy5pc1NlbGVjdGVkKHRoaXMpIHx8IGZhbHNlO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gdG9Cb29sZWFuKHZhbHVlKTtcblxuICAgICAgICBpZiAoaXNTZWxlY3RlZCAhPT0gdGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWQoaXNTZWxlY3RlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZWxlY3RlZCA9IGZhbHNlO1xuXG4gICAgZ2V0IHRhYkluZGV4KCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkID8gbnVsbCA6IC0xO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE1jTGlzdFNlbGVjdGlvbikpIHB1YmxpYyBsaXN0U2VsZWN0aW9uOiBNY0xpc3RTZWxlY3Rpb24sXG4gICAgICAgIEBPcHRpb25hbCgpIHJlYWRvbmx5IGdyb3VwOiBNY09wdGdyb3VwXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLmxpc3RTZWxlY3Rpb247XG5cbiAgICAgICAgaWYgKGxpc3QuX3ZhbHVlICYmIGxpc3QuX3ZhbHVlLnNvbWUoKHZhbHVlKSA9PiBsaXN0LmNvbXBhcmVXaXRoKHZhbHVlLCB0aGlzLl92YWx1ZSkpKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkKHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgd2FzU2VsZWN0ZWQgPSB0aGlzLl9zZWxlY3RlZDtcblxuICAgICAgICAvLyBMaXN0IG9wdGlvbnMgdGhhdCBhcmUgc2VsZWN0ZWQgYXQgaW5pdGlhbGl6YXRpb24gY2FuJ3QgYmUgcmVwb3J0ZWQgcHJvcGVybHkgdG8gdGhlIGZvcm1cbiAgICAgICAgLy8gY29udHJvbC4gVGhpcyBpcyBiZWNhdXNlIGl0IHRha2VzIHNvbWUgdGltZSB1bnRpbCB0aGUgc2VsZWN0aW9uLWxpc3Qga25vd3MgYWJvdXQgYWxsXG4gICAgICAgIC8vIGF2YWlsYWJsZSBvcHRpb25zLiBBbHNvIGl0IGNhbiBoYXBwZW4gdGhhdCB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaGFzIGFuIGluaXRpYWwgdmFsdWVcbiAgICAgICAgLy8gdGhhdCBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkLiBEZWZlcnJpbmcgdGhlIHZhbHVlIGNoYW5nZSByZXBvcnQgdG8gdGhlIG5leHQgdGljayBlbnN1cmVzXG4gICAgICAgIC8vIHRoYXQgdGhlIGZvcm0gY29udHJvbCB2YWx1ZSBpcyBub3QgYmVpbmcgb3ZlcndyaXR0ZW4uXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkIHx8IHdhc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pbnB1dHNJbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAvLyBXZSBoYXZlIHRvIGRlbGF5IHRoaXMgdW50aWwgdGhlIG5leHQgdGljayBpbiBvcmRlclxuICAgICAgICAgICAgLy8gdG8gYXZvaWQgY2hhbmdlZCBhZnRlciBjaGVja2VkIGVycm9ycy5cbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gdGhpcy5zZWxlY3RlZCA9IGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGlzdFNlbGVjdGlvbi5yZW1vdmVPcHRpb25Gcm9tTGlzdCh0aGlzKTtcbiAgICB9XG5cbiAgICB0b2dnbGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAhdGhpcy5zZWxlY3RlZDtcbiAgICB9XG5cbiAgICBnZXRMYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dCA/IHRoaXMudGV4dC5uYXRpdmVFbGVtZW50LnRleHRDb250ZW50IDogJyc7XG4gICAgfVxuXG4gICAgc2V0U2VsZWN0ZWQoc2VsZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkID09PSBzZWxlY3RlZCB8fCAhdGhpcy5saXN0U2VsZWN0aW9uLnNlbGVjdGlvbk1vZGVsKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gc2VsZWN0ZWQ7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RTZWxlY3Rpb24uc2VsZWN0aW9uTW9kZWwuc2VsZWN0KHRoaXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5saXN0U2VsZWN0aW9uLnNlbGVjdGlvbk1vZGVsLmRlc2VsZWN0KHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBnZXRIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgY2xpZW50UmVjdHMgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRDbGllbnRSZWN0cygpO1xuXG4gICAgICAgIHJldHVybiBjbGllbnRSZWN0cy5sZW5ndGggPyBjbGllbnRSZWN0c1swXS5oZWlnaHQgOiAwO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKCRldmVudCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmxpc3RTZWxlY3Rpb24uc2V0U2VsZWN0ZWRPcHRpb25zQnlDbGljayhcbiAgICAgICAgICAgIHRoaXMsIGhhc01vZGlmaWVyS2V5KCRldmVudCwgJ3NoaWZ0S2V5JyksIGhhc01vZGlmaWVyS2V5KCRldmVudCwgJ2N0cmxLZXknKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIG9uS2V5ZG93bigkZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFjdGlvbkJ1dHRvbikgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAoJGV2ZW50LmtleUNvZGUgPT09IFRBQiAmJiAhJGV2ZW50LnNoaWZ0S2V5ICYmICF0aGlzLmFjdGlvbkJ1dHRvbi5oYXNGb2N1cykge1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25CdXR0b24uZm9jdXMoKTtcblxuICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb2N1cygpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5oYXNGb2N1cyB8fCB0aGlzLmFjdGlvbkJ1dHRvbj8uaGFzRm9jdXMpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgICB0aGlzLm9uRm9jdXMubmV4dCh7IG9wdGlvbjogdGhpcyB9KTtcblxuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGFzRm9jdXMgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBibHVyKCk6IHZvaWQge1xuICAgICAgICAvLyBXaGVuIGFuaW1hdGlvbnMgYXJlIGVuYWJsZWQsIEFuZ3VsYXIgbWF5IGVuZCB1cCByZW1vdmluZyB0aGUgb3B0aW9uIGZyb20gdGhlIERPTSBhIGxpdHRsZVxuICAgICAgICAvLyBlYXJsaWVyIHRoYW4gdXN1YWwsIGNhdXNpbmcgaXQgdG8gYmUgYmx1cnJlZCBhbmQgdGhyb3dpbmcgb2ZmIHRoZSBsb2dpYyBpbiB0aGUgbGlzdFxuICAgICAgICAvLyB0aGF0IG1vdmVzIGZvY3VzIG5vdCB0aGUgbmV4dCBpdGVtLiBUbyB3b3JrIGFyb3VuZCB0aGUgaXNzdWUsIHdlIGRlZmVyIG1hcmtpbmcgdGhlIG9wdGlvblxuICAgICAgICAvLyBhcyBub3QgZm9jdXNlZCB1bnRpbCB0aGUgbmV4dCB0aW1lIHRoZSB6b25lIHN0YWJpbGl6ZXMuXG4gICAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlXG4gICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0ZvY3VzID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0aW9uQnV0dG9uPy5oYXNGb2N1cykgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQmx1ci5uZXh0KHsgb3B0aW9uOiB0aGlzIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0SG9zdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCBNQ19TRUxFQ1RJT05fTElTVF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1jTGlzdFNlbGVjdGlvbiksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbmV4cG9ydCBjbGFzcyBNY0xpc3RTZWxlY3Rpb25DaGFuZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2U6IE1jTGlzdFNlbGVjdGlvbiwgcHVibGljIG9wdGlvbjogTWNMaXN0T3B0aW9uKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgTWNMaXN0U2VsZWN0QWxsRXZlbnQ8VD4ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2U6IE1jTGlzdFNlbGVjdGlvbiwgcHVibGljIG9wdGlvbnM6IFRbXSkge31cbn1cblxuZXhwb3J0IGNsYXNzIE1jTGlzdENvcHlFdmVudDxUPiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZTogTWNMaXN0U2VsZWN0aW9uLCBwdWJsaWMgb3B0aW9uOiBUKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgTWNMaXN0U2VsZWN0aW9uQmFzZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jTGlzdFNlbGVjdGlvbk1peGluQmFzZTogQ2FuRGlzYWJsZUN0b3IgJiBIYXNUYWJJbmRleEN0b3IgJiB0eXBlb2YgTWNMaXN0U2VsZWN0aW9uQmFzZVxuICAgID0gbWl4aW5UYWJJbmRleChtaXhpbkRpc2FibGVkKE1jTGlzdFNlbGVjdGlvbkJhc2UpKTtcblxuQENvbXBvbmVudCh7XG4gICAgZXhwb3J0QXM6ICdtY0xpc3RTZWxlY3Rpb24nLFxuICAgIHNlbGVjdG9yOiAnbWMtbGlzdC1zZWxlY3Rpb24nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW2F0dHIudGFiaW5kZXhdPVwidGFiSW5kZXhcIlxuICAgICAgICAgICAgIChmb2N1cyk9XCJmb2N1cygpXCJcbiAgICAgICAgICAgICAoYmx1cik9XCJibHVyKClcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+YCxcbiAgICBzdHlsZVVybHM6IFsnLi9saXN0LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGlucHV0czogWydkaXNhYmxlZCddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1saXN0LXNlbGVjdGlvbicsXG5cbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICctMScsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG5cbiAgICAgICAgJyhrZXlkb3duKSc6ICdvbktleURvd24oJGV2ZW50KScsXG4gICAgICAgICcod2luZG93OnJlc2l6ZSknOiAndXBkYXRlU2Nyb2xsU2l6ZSgpJ1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbTUNfU0VMRUNUSU9OX0xJU1RfVkFMVUVfQUNDRVNTT1JdLFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIE1jTGlzdFNlbGVjdGlvbiBleHRlbmRzIE1jTGlzdFNlbGVjdGlvbk1peGluQmFzZSBpbXBsZW1lbnRzIENhbkRpc2FibGUsIEhhc1RhYkluZGV4LCBBZnRlckNvbnRlbnRJbml0LFxuICAgIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICAgIGtleU1hbmFnZXI6IEZvY3VzS2V5TWFuYWdlcjxNY0xpc3RPcHRpb24+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY0xpc3RPcHRpb24sIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgb3B0aW9uczogUXVlcnlMaXN0PE1jTGlzdE9wdGlvbj47XG5cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgb25TZWxlY3RBbGwgPSBuZXcgRXZlbnRFbWl0dGVyPE1jTGlzdFNlbGVjdEFsbEV2ZW50PE1jTGlzdE9wdGlvbj4+KCk7XG5cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgb25Db3B5ID0gbmV3IEV2ZW50RW1pdHRlcjxNY0xpc3RDb3B5RXZlbnQ8TWNMaXN0T3B0aW9uPj4oKTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGF1dG9TZWxlY3QoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRvU2VsZWN0O1xuICAgIH1cblxuICAgIHNldCBhdXRvU2VsZWN0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2F1dG9TZWxlY3QgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2F1dG9TZWxlY3Q6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbm9VbnNlbGVjdExhc3QoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ub1Vuc2VsZWN0TGFzdDtcbiAgICB9XG5cbiAgICBzZXQgbm9VbnNlbGVjdExhc3QodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fbm9VbnNlbGVjdExhc3QgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX25vVW5zZWxlY3RMYXN0OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIG11bHRpcGxlTW9kZTogTXVsdGlwbGVNb2RlIHwgbnVsbDtcblxuICAgIGdldCBtdWx0aXBsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5tdWx0aXBsZU1vZGU7XG4gICAgfVxuXG4gICAgQElucHV0KCkgaG9yaXpvbnRhbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgdGFiSW5kZXgoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPyAtMSA6IHRoaXMuX3RhYkluZGV4O1xuICAgIH1cblxuICAgIHNldCB0YWJJbmRleCh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMudXNlclRhYkluZGV4ID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX3RhYkluZGV4ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdGFiSW5kZXggPSAwO1xuXG4gICAgdXNlclRhYkluZGV4OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAgIGdldCBzaG93Q2hlY2tib3goKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlTW9kZSA9PT0gTXVsdGlwbGVNb2RlLkNIRUNLQk9YO1xuICAgIH1cblxuICAgIC8vIEVtaXRzIGEgY2hhbmdlIGV2ZW50IHdoZW5ldmVyIHRoZSBzZWxlY3RlZCBzdGF0ZSBvZiBhbiBvcHRpb24gY2hhbmdlcy5cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TWNMaXN0U2VsZWN0aW9uQ2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWNMaXN0U2VsZWN0aW9uQ2hhbmdlPigpO1xuXG4gICAgc2VsZWN0aW9uTW9kZWw6IFNlbGVjdGlvbk1vZGVsPE1jTGlzdE9wdGlvbj47XG5cbiAgICBnZXQgb3B0aW9uRm9jdXNDaGFuZ2VzKCk6IE9ic2VydmFibGU8TWNPcHRpb25FdmVudD4ge1xuICAgICAgICByZXR1cm4gbWVyZ2UoLi4udGhpcy5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiBvcHRpb24ub25Gb2N1cykpO1xuICAgIH1cblxuICAgIGdldCBvcHRpb25CbHVyQ2hhbmdlcygpOiBPYnNlcnZhYmxlPE1jT3B0aW9uRXZlbnQ+IHtcbiAgICAgICAgcmV0dXJuIG1lcmdlKC4uLnRoaXMub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gb3B0aW9uLm9uQmx1cikpO1xuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpvcnRob2RveC1nZXR0ZXItYW5kLXNldHRlciBuYW1pbmctY29udmVudGlvblxuICAgIF92YWx1ZTogc3RyaW5nW10gfCBudWxsO1xuXG4gICAgLyoqIEVtaXRzIHdoZW5ldmVyIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkLiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIHByaXZhdGUgb3B0aW9uRm9jdXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGw7XG5cbiAgICBwcml2YXRlIG9wdGlvbkJsdXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIEBBdHRyaWJ1dGUoJ211bHRpcGxlJykgbXVsdGlwbGU6IE11bHRpcGxlTW9kZSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBjbGlwYm9hcmQ6IENsaXBib2FyZFxuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgICAgICBpZiAobXVsdGlwbGUgPT09IE11bHRpcGxlTW9kZS5DSEVDS0JPWCB8fCBtdWx0aXBsZSA9PT0gTXVsdGlwbGVNb2RlLktFWUJPQVJEKSB7XG4gICAgICAgICAgICB0aGlzLm11bHRpcGxlTW9kZSA9IG11bHRpcGxlO1xuICAgICAgICB9IGVsc2UgaWYgKG11bHRpcGxlICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm11bHRpcGxlTW9kZSA9IE11bHRpcGxlTW9kZS5DSEVDS0JPWDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlTW9kZSA9PT0gTXVsdGlwbGVNb2RlLkNIRUNLQk9YKSB7XG4gICAgICAgICAgICB0aGlzLmF1dG9TZWxlY3QgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubm9VbnNlbGVjdExhc3QgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwgPSBuZXcgU2VsZWN0aW9uTW9kZWw8TWNMaXN0T3B0aW9uPih0aGlzLm11bHRpcGxlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB1c2VkIGZvciBjb21wYXJpbmcgYW4gb3B0aW9uIGFnYWluc3QgdGhlIHNlbGVjdGVkIHZhbHVlIHdoZW4gZGV0ZXJtaW5pbmcgd2hpY2hcbiAgICAgKiBvcHRpb25zIHNob3VsZCBhcHBlYXIgYXMgc2VsZWN0ZWQuIFRoZSBmaXJzdCBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgYW4gb3B0aW9ucy4gVGhlIHNlY29uZFxuICAgICAqIG9uZSBpcyBhIHZhbHVlIGZyb20gdGhlIHNlbGVjdGVkIHZhbHVlLiBBIGJvb2xlYW4gbXVzdCBiZSByZXR1cm5lZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBjb21wYXJlV2l0aDogKG8xOiBhbnksIG8yOiBhbnkpID0+IGJvb2xlYW4gPSAoYTEsIGEyKSA9PiBhMSA9PT0gYTI7XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaG9yaXpvbnRhbCA9IHRvQm9vbGVhbih0aGlzLmhvcml6b250YWwpO1xuXG4gICAgICAgIHRoaXMua2V5TWFuYWdlciA9IG5ldyBGb2N1c0tleU1hbmFnZXI8TWNMaXN0T3B0aW9uPih0aGlzLm9wdGlvbnMpXG4gICAgICAgICAgICAud2l0aFR5cGVBaGVhZCgpXG4gICAgICAgICAgICAud2l0aFZlcnRpY2FsT3JpZW50YXRpb24oIXRoaXMuaG9yaXpvbnRhbClcbiAgICAgICAgICAgIC53aXRoSG9yaXpvbnRhbE9yaWVudGF0aW9uKHRoaXMuaG9yaXpvbnRhbCA/ICdsdHInIDogbnVsbCk7XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnRhYk91dFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RhYkluZGV4ID0gLTE7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGFiSW5kZXggPSB0aGlzLnVzZXJUYWJJbmRleCB8fCAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbnNGcm9tVmFsdWVzKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuY2hhbmdlZFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGV2ZW50LmFkZGVkKSB7IGl0ZW0uc2VsZWN0ZWQgPSB0cnVlOyB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgZXZlbnQucmVtb3ZlZCkgeyBpdGVtLnNlbGVjdGVkID0gZmFsc2U7IH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub3B0aW9ucy5jaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShzdGFydFdpdGgobnVsbCksIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0T3B0aW9ucygpO1xuXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHdlIG5lZWQgdG8gdXBkYXRlIG91ciB0YWIgaW5kZXhcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRhYkluZGV4KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVNjcm9sbFNpemUoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQubmV4dCgpO1xuXG4gICAgICAgIHRoaXMuZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICB9XG5cbiAgICBibHVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuaGFzRm9jdXNlZE9wdGlvbigpKSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbSgtMSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHNlbGVjdEFsbCgpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uLnNldFNlbGVjdGVkKHRydWUpKTtcblxuICAgICAgICB0aGlzLnJlcG9ydFZhbHVlQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgZGVzZWxlY3RBbGwoKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IG9wdGlvbi5zZXRTZWxlY3RlZChmYWxzZSkpO1xuXG4gICAgICAgIHRoaXMucmVwb3J0VmFsdWVDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVTY3JvbGxTaXplKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5ob3Jpem9udGFsIHx8ICF0aGlzLm9wdGlvbnMuZmlyc3QpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLndpdGhTY3JvbGxTaXplKE1hdGguZmxvb3IodGhpcy5nZXRIZWlnaHQoKSAvIHRoaXMub3B0aW9ucy5maXJzdC5nZXRIZWlnaHQoKSkpO1xuICAgIH1cblxuICAgIHNldFNlbGVjdGVkT3B0aW9uc0J5Q2xpY2sob3B0aW9uOiBNY0xpc3RPcHRpb24sIHNoaWZ0S2V5OiBib29sZWFuLCBjdHJsS2V5OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChzaGlmdEtleSAmJiB0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkT3B0aW9ucyhvcHRpb24pO1xuICAgICAgICB9IGVsc2UgaWYgKGN0cmxLZXkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5jYW5EZXNlbGVjdExhc3Qob3B0aW9uKSkgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC50b2dnbGUob3B0aW9uKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmF1dG9TZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwudG9nZ2xlKG9wdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnRvZ2dsZShvcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbWl0Q2hhbmdlRXZlbnQob3B0aW9uKTtcbiAgICAgICAgdGhpcy5yZXBvcnRWYWx1ZUNoYW5nZSgpO1xuICAgIH1cblxuICAgIHNldFNlbGVjdGVkT3B0aW9uc0J5S2V5KG9wdGlvbjogTWNMaXN0T3B0aW9uLCBzaGlmdEtleTogYm9vbGVhbiwgY3RybEtleTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoc2hpZnRLZXkgJiYgdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3RlZE9wdGlvbnMob3B0aW9uKTtcbiAgICAgICAgfSBlbHNlIGlmIChjdHJsS2V5KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuY2FuRGVzZWxlY3RMYXN0KG9wdGlvbikpIHsgcmV0dXJuOyB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvU2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5zZXRTZWxlY3RlZChmYWxzZSkpO1xuICAgICAgICAgICAgb3B0aW9uLnNldFNlbGVjdGVkKHRydWUpO1xuXG4gICAgICAgICAgICB0aGlzLmVtaXRDaGFuZ2VFdmVudChvcHRpb24pO1xuICAgICAgICAgICAgdGhpcy5yZXBvcnRWYWx1ZUNoYW5nZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0U2VsZWN0ZWRPcHRpb25zKG9wdGlvbjogTWNMaXN0T3B0aW9uKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uU3RhdGUgPSBvcHRpb24uc2VsZWN0ZWQ7XG5cbiAgICAgICAgbGV0IGZyb21JbmRleCA9IHRoaXMua2V5TWFuYWdlci5wcmV2aW91c0FjdGl2ZUl0ZW1JbmRleDtcbiAgICAgICAgbGV0IHRvSW5kZXggPSB0aGlzLmtleU1hbmFnZXIucHJldmlvdXNBY3RpdmVJdGVtSW5kZXggPSB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4O1xuXG4gICAgICAgIGlmICh0b0luZGV4ID09PSBmcm9tSW5kZXgpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKGZyb21JbmRleCA+IHRvSW5kZXgpIHtcbiAgICAgICAgICAgIFtmcm9tSW5kZXgsIHRvSW5kZXhdID0gW3RvSW5kZXgsIGZyb21JbmRleF07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgICAgIC50b0FycmF5KClcbiAgICAgICAgICAgIC5zbGljZShmcm9tSW5kZXgsIHRvSW5kZXggKyAxKVxuICAgICAgICAgICAgLmZpbHRlcigoaXRlbSkgPT4gIWl0ZW0uZGlzYWJsZWQpXG4gICAgICAgICAgICAuZm9yRWFjaCgocmVuZGVyZWRPcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc0xhc3RSZW5kZXJlZE9wdGlvbiA9IHJlbmRlcmVkT3B0aW9uID09PSB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbTtcblxuICAgICAgICAgICAgICAgIGlmIChpc0xhc3RSZW5kZXJlZE9wdGlvbiAmJiByZW5kZXJlZE9wdGlvbi5zZWxlY3RlZCAmJiB0aGlzLm5vVW5zZWxlY3RMYXN0KSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICAgICAgcmVuZGVyZWRPcHRpb24uc2V0U2VsZWN0ZWQoIXNlbGVjdGVkT3B0aW9uU3RhdGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICB3cml0ZVZhbHVlKHZhbHVlczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZXM7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5zZXRPcHRpb25zRnJvbVZhbHVlcyh2YWx1ZXMgfHwgW10pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIGEgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uLmRpc2FibGVkID0gaXNEaXNhYmxlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZE9wdGlvblZhbHVlcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZmlsdGVyKChvcHRpb24pID0+IG9wdGlvbi5zZWxlY3RlZCkubWFwKChvcHRpb24pID0+IG9wdGlvbi52YWx1ZSk7XG4gICAgfVxuXG4gICAgLy8gVG9nZ2xlcyB0aGUgc2VsZWN0ZWQgc3RhdGUgb2YgdGhlIGN1cnJlbnRseSBmb2N1c2VkIG9wdGlvbi5cbiAgICB0b2dnbGVGb2N1c2VkT3B0aW9uKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBmb2N1c2VkSW5kZXggPSB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4O1xuXG4gICAgICAgIGlmIChmb2N1c2VkSW5kZXggIT0gbnVsbCAmJiB0aGlzLmlzVmFsaWRJbmRleChmb2N1c2VkSW5kZXgpKSB7XG4gICAgICAgICAgICBjb25zdCBmb2N1c2VkT3B0aW9uOiBNY0xpc3RPcHRpb24gPSB0aGlzLm9wdGlvbnMudG9BcnJheSgpW2ZvY3VzZWRJbmRleF07XG5cbiAgICAgICAgICAgIGlmIChmb2N1c2VkT3B0aW9uICYmIHRoaXMuY2FuRGVzZWxlY3RMYXN0KGZvY3VzZWRPcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgZm9jdXNlZE9wdGlvbi50b2dnbGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIEVtaXQgYSBjaGFuZ2UgZXZlbnQgYmVjYXVzZSB0aGUgZm9jdXNlZCBvcHRpb24gY2hhbmdlZCBpdHMgc3RhdGUgdGhyb3VnaCB1c2VyIGludGVyYWN0aW9uLlxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdENoYW5nZUV2ZW50KGZvY3VzZWRPcHRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuRGVzZWxlY3RMYXN0KGxpc3RPcHRpb246IE1jTGlzdE9wdGlvbik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISh0aGlzLm5vVW5zZWxlY3RMYXN0ICYmIHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWQubGVuZ3RoID09PSAxICYmIGxpc3RPcHRpb24uc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIGdldEhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBjbGllbnRSZWN0cyA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldENsaWVudFJlY3RzKCk7XG5cbiAgICAgICAgcmV0dXJuIGNsaWVudFJlY3RzLmxlbmd0aCA/IGNsaWVudFJlY3RzWzBdLmhlaWdodCA6IDA7XG4gICAgfVxuXG4gICAgLy8gVmlldyB0byBtb2RlbCBjYWxsYmFjayB0aGF0IHNob3VsZCBiZSBjYWxsZWQgaWYgdGhlIGxpc3Qgb3IgaXRzIG9wdGlvbnMgbG9zdCBmb2N1cy5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcbiAgICBvblRvdWNoZWQ6ICgpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAgIC8vIFJlbW92ZXMgYW4gb3B0aW9uIGZyb20gdGhlIHNlbGVjdGlvbiBsaXN0IGFuZCB1cGRhdGVzIHRoZSBhY3RpdmUgaXRlbS5cbiAgICByZW1vdmVPcHRpb25Gcm9tTGlzdChvcHRpb246IE1jTGlzdE9wdGlvbikge1xuICAgICAgICBpZiAoIW9wdGlvbi5oYXNGb2N1cykgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBvcHRpb25JbmRleCA9IHRoaXMuZ2V0T3B0aW9uSW5kZXgob3B0aW9uKTtcblxuICAgICAgICAvLyBDaGVjayB3aGV0aGVyIHRoZSBvcHRpb24gaXMgdGhlIGxhc3QgaXRlbVxuICAgICAgICBpZiAob3B0aW9uSW5kZXggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0UHJldmlvdXNJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9uSW5kZXggPT09IDAgJiYgdGhpcy5vcHRpb25zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXROZXh0SXRlbUFjdGl2ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG5cbiAgICAgICAgaWYgKFtTUEFDRSwgRU5URVIsIExFRlRfQVJST1csIFJJR0hUX0FSUk9XXS5pbmNsdWRlcyhrZXlDb2RlKSB8fCBpc1ZlcnRpY2FsTW92ZW1lbnQoZXZlbnQpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgaXNTZWxlY3RBbGwoZXZlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEFsbE9wdGlvbnMoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChpc0NvcHkoZXZlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmNvcHlBY3RpdmVPcHRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChbU1BBQ0UsIEVOVEVSXS5pbmNsdWRlcyhrZXlDb2RlKSkge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVGb2N1c2VkT3B0aW9uKCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBUQUIpIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci50YWJPdXQubmV4dCgpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gRE9XTl9BUlJPVykge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldE5leHRJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gVVBfQVJST1cpIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRQcmV2aW91c0l0ZW1BY3RpdmUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBIT01FKSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gRU5EKSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0TGFzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBQQUdFX1VQKSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0UHJldmlvdXNQYWdlSXRlbUFjdGl2ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFBBR0VfRE9XTikge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldE5leHRQYWdlSXRlbUFjdGl2ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtICYmIGlzVmVydGljYWxNb3ZlbWVudChldmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRPcHRpb25zQnlLZXkoXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0gYXMgTWNMaXN0T3B0aW9uLFxuICAgICAgICAgICAgICAgIGhhc01vZGlmaWVyS2V5KGV2ZW50LCAnc2hpZnRLZXknKSxcbiAgICAgICAgICAgICAgICBoYXNNb2RpZmllcktleShldmVudCwgJ2N0cmxLZXknKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlcG9ydHMgYSB2YWx1ZSBjaGFuZ2UgdG8gdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yXG4gICAgcmVwb3J0VmFsdWVDaGFuZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRTZWxlY3RlZE9wdGlvblZhbHVlcygpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gRW1pdHMgYSBjaGFuZ2UgZXZlbnQgaWYgdGhlIHNlbGVjdGVkIHN0YXRlIG9mIGFuIG9wdGlvbiBjaGFuZ2VkLlxuICAgIGVtaXRDaGFuZ2VFdmVudChvcHRpb246IE1jTGlzdE9wdGlvbikge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KG5ldyBNY0xpc3RTZWxlY3Rpb25DaGFuZ2UodGhpcywgb3B0aW9uKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVRhYkluZGV4KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl90YWJJbmRleCA9IHRoaXMudXNlclRhYkluZGV4IHx8ICh0aGlzLm9wdGlvbnMubGVuZ3RoID09PSAwID8gLTEgOiAwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ29weURlZmF1bHRIYW5kbGVyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsaXBib2FyZD8uY29weSh0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbSEudmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVzZXRPcHRpb25zKCkge1xuICAgICAgICB0aGlzLmRyb3BTdWJzY3JpcHRpb25zKCk7XG4gICAgICAgIHRoaXMubGlzdGVuVG9PcHRpb25zRm9jdXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyb3BTdWJzY3JpcHRpb25zKCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25Gb2N1c1N1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25Gb2N1c1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25Gb2N1c1N1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vcHRpb25CbHVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbkJsdXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uQmx1clN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGxpc3RlblRvT3B0aW9uc0ZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9wdGlvbkZvY3VzU3Vic2NyaXB0aW9uID0gdGhpcy5vcHRpb25Gb2N1c0NoYW5nZXNcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXg6IG51bWJlciA9IHRoaXMub3B0aW9ucy50b0FycmF5KCkuaW5kZXhPZihldmVudC5vcHRpb24pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZEluZGV4KGluZGV4KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIudXBkYXRlQWN0aXZlSXRlbShpbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25CbHVyU3Vic2NyaXB0aW9uID0gdGhpcy5vcHRpb25CbHVyQ2hhbmdlc1xuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmJsdXIoKSk7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIGFueSBvZiB0aGUgb3B0aW9ucyBpcyBmb2N1c2VkLiAqL1xuICAgIHByaXZhdGUgaGFzRm9jdXNlZE9wdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zb21lKChvcHRpb24pID0+IG9wdGlvbi5oYXNGb2N1cyk7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJucyB0aGUgb3B0aW9uIHdpdGggdGhlIHNwZWNpZmllZCB2YWx1ZS5cbiAgICBwcml2YXRlIGdldE9wdGlvbkJ5VmFsdWUodmFsdWU6IHN0cmluZyk6IE1jTGlzdE9wdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZmluZCgob3B0aW9uKSA9PiBvcHRpb24udmFsdWUgPT09IHZhbHVlKTtcbiAgICB9XG5cbiAgICAvLyBTZXRzIHRoZSBzZWxlY3RlZCBvcHRpb25zIGJhc2VkIG9uIHRoZSBzcGVjaWZpZWQgdmFsdWVzLlxuICAgIHByaXZhdGUgc2V0T3B0aW9uc0Zyb21WYWx1ZXModmFsdWVzOiBzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiBvcHRpb24uc2V0U2VsZWN0ZWQoZmFsc2UpKTtcblxuICAgICAgICB2YWx1ZXNcbiAgICAgICAgICAgIC5tYXAoKHZhbHVlKSA9PiB0aGlzLmdldE9wdGlvbkJ5VmFsdWUodmFsdWUpKVxuICAgICAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAgICAgLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uIS5zZXRTZWxlY3RlZCh0cnVlKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXRpbGl0eSB0byBlbnN1cmUgYWxsIGluZGV4ZXMgYXJlIHZhbGlkLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggdG8gYmUgY2hlY2tlZC5cbiAgICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpbmRleCBpcyB2YWxpZCBmb3Igb3VyIGxpc3Qgb2Ygb3B0aW9ucy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGlzVmFsaWRJbmRleChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5vcHRpb25zLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgc3BlY2lmaWVkIGxpc3Qgb3B0aW9uLlxuICAgIHByaXZhdGUgZ2V0T3B0aW9uSW5kZXgob3B0aW9uOiBNY0xpc3RPcHRpb24pOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnRvQXJyYXkoKS5pbmRleE9mKG9wdGlvbik7XG4gICAgfVxuXG4gICAgLy8gVmlldyB0byBtb2RlbCBjYWxsYmFjayB0aGF0IHNob3VsZCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlIHNlbGVjdGVkIG9wdGlvbnMgY2hhbmdlLlxuICAgIHByaXZhdGUgb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKF86IGFueSkgPT4ge307XG5cbiAgICBwcml2YXRlIHNlbGVjdEFsbE9wdGlvbnMoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnNUb1NlbGVjdCA9IHRoaXMub3B0aW9uc1xuICAgICAgICAgICAgLmZpbHRlcigob3B0aW9uKSA9PiAhb3B0aW9uLmRpc2FibGVkKTtcblxuICAgICAgICBvcHRpb25zVG9TZWxlY3RcbiAgICAgICAgLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uLnNldFNlbGVjdGVkKHRydWUpKTtcblxuICAgICAgICB0aGlzLm9uU2VsZWN0QWxsLmVtaXQobmV3IE1jTGlzdFNlbGVjdEFsbEV2ZW50KHRoaXMsIG9wdGlvbnNUb1NlbGVjdCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29weUFjdGl2ZU9wdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMub25Db3B5Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMub25Db3B5LmVtaXQobmV3IE1jTGlzdENvcHlFdmVudCh0aGlzLCB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbSBhcyBNY0xpc3RPcHRpb24pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub25Db3B5RGVmYXVsdEhhbmRsZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIjxtYy1wc2V1ZG8tY2hlY2tib3hcbiAgICAqbmdJZj1cInNob3dDaGVja2JveFwiXG4gICAgW3N0YXRlXT1cInNlbGVjdGVkID8gJ2NoZWNrZWQnIDogJ3VuY2hlY2tlZCdcIlxuICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuPC9tYy1wc2V1ZG8tY2hlY2tib3g+XG5cbjxkaXYgY2xhc3M9XCJtYy1saXN0LXRleHRcIiAjdGV4dD5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5cblxuPG5nLWNvbnRlbnQgc2VsZWN0PVwibWMtb3B0aW9uLWFjdGlvblwiPjwvbmctY29udGVudD5cbiJdfQ==