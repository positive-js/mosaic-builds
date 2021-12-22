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
        const clientRects = this.elementRef.nativeElement.getClientRects();
        if (clientRects.length) {
            return clientRects[0].height;
        }
        return 0;
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
/** @nocollapse */ /** @nocollapse */ McListOption.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McListOption, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: forwardRef(() => McListSelection) }, { token: i1.McOptgroup, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McListOption.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: McListOption, selector: "mc-list-option", inputs: { checkboxPosition: "checkboxPosition", value: "value", disabled: "disabled", showCheckbox: "showCheckbox", selected: "selected" }, host: { listeners: { "focusin": "focus()", "blur": "blur()", "click": "handleClick($event)", "keydown": "onKeydown($event)" }, properties: { "class.mc-selected": "selected", "class.mc-disabled": "disabled", "class.mc-focused": "hasFocus", "class.mc-action-button-focused": "actionButton?.active", "attr.tabindex": "tabIndex", "attr.disabled": "disabled || null" }, classAttribute: "mc-list-option" }, providers: [
        { provide: MC_OPTION_ACTION_PARENT, useExisting: McListOption }
    ], queries: [{ propertyName: "actionButton", first: true, predicate: McOptionActionComponent, descendants: true }, { propertyName: "tooltipTrigger", first: true, predicate: McTooltipTrigger, descendants: true }, { propertyName: "dropdownTrigger", first: true, predicate: McDropdownTrigger, descendants: true }], viewQueries: [{ propertyName: "text", first: true, predicate: ["text"], descendants: true }], exportAs: ["mcListOption"], ngImport: i0, template: "<mc-pseudo-checkbox\n    *ngIf=\"showCheckbox\"\n    [state]=\"selected ? 'checked' : 'unchecked'\"\n    [disabled]=\"disabled\">\n</mc-pseudo-checkbox>\n\n<div class=\"mc-list-text\" #text>\n    <ng-content></ng-content>\n</div>\n\n<ng-content select=\"mc-option-action\"></ng-content>\n", components: [{ type: i1.McPseudoCheckbox, selector: "mc-pseudo-checkbox", inputs: ["state", "disabled"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McListOption, decorators: [{
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
        if (clientRects.length) {
            return clientRects[0].height;
        }
        return 0;
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
/** @nocollapse */ /** @nocollapse */ McListSelection.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McListSelection, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: 'multiple', attribute: true }, { token: i3.Clipboard, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McListSelection.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: McListSelection, selector: "mc-list-selection", inputs: { disabled: "disabled", autoSelect: "autoSelect", noUnselectLast: "noUnselectLast", horizontal: "horizontal", tabIndex: "tabIndex", compareWith: "compareWith" }, outputs: { onSelectAll: "onSelectAll", onCopy: "onCopy", selectionChange: "selectionChange" }, host: { listeners: { "keydown": "onKeyDown($event)", "window:resize": "updateScrollSize()" }, properties: { "attr.tabindex": "-1", "attr.disabled": "disabled || null" }, classAttribute: "mc-list-selection" }, providers: [MC_SELECTION_LIST_VALUE_ACCESSOR], queries: [{ propertyName: "options", predicate: McListOption, descendants: true }], exportAs: ["mcListSelection"], usesInheritance: true, ngImport: i0, template: `
        <div [attr.tabindex]="tabIndex"
             (focus)="focus()"
             (blur)="blur()">
            <ng-content></ng-content>
        </div>`, isInline: true, styles: [".mc-divider{display:block;margin:0}.mc-divider.mc-divider_horizontal{border-top-width:1px;border-top-width:var(--mc-divider-size-width, 1px);border-top-style:solid}.mc-divider.mc-divider_vertical{height:100%;border-right-width:1px;border-right-width:var(--mc-divider-size-width, 1px);border-right-style:solid}.mc-divider.mc-divider_inset{margin-left:80px;margin-left:var(--mc-divider-size-inset-margin, 80px)}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:80px;margin-right:var(--mc-divider-size-inset-margin, 80px)}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.mc-list,.mc-list-selection{display:block;outline:none}.mc-list-item,.mc-list-option{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;position:relative;display:flex;align-items:center;box-sizing:border-box;height:32px;height:var(--mc-list-size-item-height, 32px);border:2px solid transparent;padding-left:16px;padding-left:var(--mc-list-size-horizontal-padding, 16px)}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding-right:16px;padding-right:var(--mc-list-size-horizontal-padding, 16px)}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;width:var(--mc-list-size-icon-width, 24px);height:24px;height:var(--mc-list-size-icon-width, 24px);border-radius:50%;padding:4px;padding:var(--mc-list-size-icon-padding, 4px);font-size:24px;font-size:var(--mc-list-size-icon-width, 24px)}.mc-list-item .mc-list-icon~.mc-divider_inset,.mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:32pxvar(--mc-list-size-icon-width,24px)8px;width:100%-32pxvar(--mc-list-size-icon-width,24px)8px}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider_inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:auto;margin-right:32pxvar(--mc-list-size-icon-width,24px)8px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider_inset,.mc-list-option .mc-divider.mc-divider_inset{position:absolute}.mc-list-item.mc-progress:after,.mc-list-option.mc-progress:after{top:-2px;right:-2px;bottom:-2px;left:-2px}.mc-list-item .mc-pseudo-checkbox,.mc-list-option .mc-pseudo-checkbox{margin-right:8px}.mc-list-item .mc-option-action,.mc-list-option .mc-option-action{display:none}.mc-list-item:not([disabled]):hover .mc-option-action,.mc-list-item:not([disabled]).mc-focused .mc-option-action,.mc-list-item:not([disabled]).mc-action-button-focused .mc-option-action,.mc-list-option:not([disabled]):hover .mc-option-action,.mc-list-option:not([disabled]).mc-focused .mc-option-action,.mc-list-option:not([disabled]).mc-action-button-focused .mc-option-action{display:flex}.mc-list-option:not([disabled]):not(.mc-disabled){cursor:pointer}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McListSelection, decorators: [{
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
                    }, providers: [MC_SELECTION_LIST_VALUE_ACCESSOR], preserveWhitespaces: false, styles: [".mc-divider{display:block;margin:0}.mc-divider.mc-divider_horizontal{border-top-width:1px;border-top-width:var(--mc-divider-size-width, 1px);border-top-style:solid}.mc-divider.mc-divider_vertical{height:100%;border-right-width:1px;border-right-width:var(--mc-divider-size-width, 1px);border-right-style:solid}.mc-divider.mc-divider_inset{margin-left:80px;margin-left:var(--mc-divider-size-inset-margin, 80px)}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:80px;margin-right:var(--mc-divider-size-inset-margin, 80px)}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.mc-list,.mc-list-selection{display:block;outline:none}.mc-list-item,.mc-list-option{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;position:relative;display:flex;align-items:center;box-sizing:border-box;height:32px;height:var(--mc-list-size-item-height, 32px);border:2px solid transparent;padding-left:16px;padding-left:var(--mc-list-size-horizontal-padding, 16px)}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding-right:16px;padding-right:var(--mc-list-size-horizontal-padding, 16px)}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;width:var(--mc-list-size-icon-width, 24px);height:24px;height:var(--mc-list-size-icon-width, 24px);border-radius:50%;padding:4px;padding:var(--mc-list-size-icon-padding, 4px);font-size:24px;font-size:var(--mc-list-size-icon-width, 24px)}.mc-list-item .mc-list-icon~.mc-divider_inset,.mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:32pxvar(--mc-list-size-icon-width,24px)8px;width:100%-32pxvar(--mc-list-size-icon-width,24px)8px}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider_inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:auto;margin-right:32pxvar(--mc-list-size-icon-width,24px)8px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider_inset,.mc-list-option .mc-divider.mc-divider_inset{position:absolute}.mc-list-item.mc-progress:after,.mc-list-option.mc-progress:after{top:-2px;right:-2px;bottom:-2px;left:-2px}.mc-list-item .mc-pseudo-checkbox,.mc-list-option .mc-pseudo-checkbox{margin-right:8px}.mc-list-item .mc-option-action,.mc-list-option .mc-option-action{display:none}.mc-list-item:not([disabled]):hover .mc-option-action,.mc-list-item:not([disabled]).mc-focused .mc-option-action,.mc-list-item:not([disabled]).mc-action-button-focused .mc-option-action,.mc-list-option:not([disabled]):hover .mc-option-action,.mc-list-option:not([disabled]).mc-focused .mc-option-action,.mc-list-option:not([disabled]).mc-action-button-focused .mc-option-action{display:flex}.mc-list-option:not([disabled]):not(.mc-disabled){cursor:pointer}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zZWxlY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2xpc3QvbGlzdC1zZWxlY3Rpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2xpc3QvbGlzdC1vcHRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2QkFBNkI7QUFDN0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBRUgsU0FBUyxFQUNULHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNqQixpQkFBaUIsRUFDakIsTUFBTSxFQUdOLFNBQVMsRUFDVCxNQUFNLEVBQ04sUUFBUSxFQUNSLFlBQVksRUFDZixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBb0IsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RSxPQUFPLEVBQ0gsY0FBYyxFQUNkLE1BQU0sRUFDTixXQUFXLEVBQ1gsa0JBQWtCLEVBQ2xCLFVBQVUsRUFDVixHQUFHLEVBQ0gsS0FBSyxFQUNMLElBQUksRUFDSixVQUFVLEVBQ1YsU0FBUyxFQUNULE9BQU8sRUFDUCxXQUFXLEVBQ1gsS0FBSyxFQUNMLEdBQUcsRUFDSCxRQUFRLEVBQ1gsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBRUgsYUFBYSxFQUNiLFNBQVMsRUFHVCxhQUFhLEVBRWIsWUFBWSxFQUNa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QUFvQjtxQkFDMUMsYUFDVSxDQUFDLGdDQUFnQyxDQUFDLHVCQUN4QixLQUFLOzswQkF1RnJCLFNBQVM7MkJBQUMsVUFBVTs7MEJBQ3BCLFFBQVE7NENBakZ5QyxPQUFPO3NCQUE1RCxlQUFlO3VCQUFDLFlBQVksRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7Z0JBRWpDLFdBQVc7c0JBQTdCLE1BQU07Z0JBRVksTUFBTTtzQkFBeEIsTUFBTTtnQkFHSCxVQUFVO3NCQURiLEtBQUs7Z0JBWUYsY0FBYztzQkFEakIsS0FBSztnQkFpQkcsVUFBVTtzQkFBbEIsS0FBSztnQkFHRixRQUFRO3NCQURYLEtBQUs7Z0JBbUJhLGVBQWU7c0JBQWpDLE1BQU07Z0JBaURFLFdBQVc7c0JBQW5CLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZTpuby1lbXB0eSAqL1xuaW1wb3J0IHsgQ2xpcGJvYXJkIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NsaXBib2FyZCc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEF0dHJpYnV0ZSxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5wdXQsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBJbmplY3QsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBWaWV3Q2hpbGQsXG4gICAgTmdab25lLFxuICAgIE9wdGlvbmFsLFxuICAgIENvbnRlbnRDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvY3VzS2V5TWFuYWdlciwgSUZvY3VzYWJsZU9wdGlvbiB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9hMTF5JztcbmltcG9ydCB7XG4gICAgaGFzTW9kaWZpZXJLZXksXG4gICAgaXNDb3B5LFxuICAgIGlzU2VsZWN0QWxsLFxuICAgIGlzVmVydGljYWxNb3ZlbWVudCxcbiAgICBET1dOX0FSUk9XLFxuICAgIEVORCxcbiAgICBFTlRFUixcbiAgICBIT01FLFxuICAgIExFRlRfQVJST1csXG4gICAgUEFHRV9ET1dOLFxuICAgIFBBR0VfVVAsXG4gICAgUklHSFRfQVJST1csXG4gICAgU1BBQ0UsXG4gICAgVEFCLFxuICAgIFVQX0FSUk9XXG59IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICAgIENhbkRpc2FibGUsXG4gICAgbWl4aW5EaXNhYmxlZCxcbiAgICB0b0Jvb2xlYW4sXG4gICAgQ2FuRGlzYWJsZUN0b3IsXG4gICAgSGFzVGFiSW5kZXhDdG9yLFxuICAgIG1peGluVGFiSW5kZXgsXG4gICAgSGFzVGFiSW5kZXgsXG4gICAgTXVsdGlwbGVNb2RlLFxuICAgIE1jT3B0Z3JvdXAsXG4gICAgTUNfT1BUSU9OX0FDVElPTl9QQVJFTlQsXG4gICAgTWNPcHRpb25BY3Rpb25Db21wb25lbnRcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNEcm9wZG93blRyaWdnZXIgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvZHJvcGRvd24nO1xuaW1wb3J0IHsgTWNUb29sdGlwVHJpZ2dlciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy90b29sdGlwJztcbmltcG9ydCB7IG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCwgdGFrZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBNY09wdGlvbkV2ZW50IHtcbiAgICBvcHRpb246IE1jTGlzdE9wdGlvbjtcbn1cblxuLyoqXG4gKiBDb21wb25lbnQgZm9yIGxpc3Qtb3B0aW9ucyBvZiBzZWxlY3Rpb24tbGlzdC4gRWFjaCBsaXN0LW9wdGlvbiBjYW4gYXV0b21hdGljYWxseVxuICogZ2VuZXJhdGUgYSBjaGVja2JveCBhbmQgY2FuIHB1dCBjdXJyZW50IGl0ZW0gaW50byB0aGUgc2VsZWN0aW9uTW9kZWwgb2Ygc2VsZWN0aW9uLWxpc3RcbiAqIGlmIHRoZSBjdXJyZW50IGl0ZW0gaXMgc2VsZWN0ZWQuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIGV4cG9ydEFzOiAnbWNMaXN0T3B0aW9uJyxcbiAgICBzZWxlY3RvcjogJ21jLWxpc3Qtb3B0aW9uJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbGlzdC1vcHRpb24uaHRtbCcsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWxpc3Qtb3B0aW9uJyxcblxuICAgICAgICAnW2NsYXNzLm1jLXNlbGVjdGVkXSc6ICdzZWxlY3RlZCcsXG4gICAgICAgICdbY2xhc3MubWMtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1mb2N1c2VkXSc6ICdoYXNGb2N1cycsXG5cbiAgICAgICAgJ1tjbGFzcy5tYy1hY3Rpb24tYnV0dG9uLWZvY3VzZWRdJzogJ2FjdGlvbkJ1dHRvbj8uYWN0aXZlJyxcblxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcblxuICAgICAgICAnKGZvY3VzaW4pJzogJ2ZvY3VzKCknLFxuICAgICAgICAnKGJsdXIpJzogJ2JsdXIoKScsXG4gICAgICAgICcoY2xpY2spJzogJ2hhbmRsZUNsaWNrKCRldmVudCknLFxuICAgICAgICAnKGtleWRvd24pJzogJ29uS2V5ZG93bigkZXZlbnQpJ1xuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBNQ19PUFRJT05fQUNUSU9OX1BBUkVOVCwgdXNlRXhpc3Rpbmc6IE1jTGlzdE9wdGlvbiB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNY0xpc3RPcHRpb24gaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCwgSUZvY3VzYWJsZU9wdGlvbiB7XG4gICAgaGFzRm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHJlYWRvbmx5IG9uRm9jdXMgPSBuZXcgU3ViamVjdDxNY09wdGlvbkV2ZW50PigpO1xuXG4gICAgcmVhZG9ubHkgb25CbHVyID0gbmV3IFN1YmplY3Q8TWNPcHRpb25FdmVudD4oKTtcblxuICAgIEBDb250ZW50Q2hpbGQoTWNPcHRpb25BY3Rpb25Db21wb25lbnQpIGFjdGlvbkJ1dHRvbjogTWNPcHRpb25BY3Rpb25Db21wb25lbnQ7XG4gICAgQENvbnRlbnRDaGlsZChNY1Rvb2x0aXBUcmlnZ2VyKSB0b29sdGlwVHJpZ2dlcjogTWNUb29sdGlwVHJpZ2dlcjtcbiAgICBAQ29udGVudENoaWxkKE1jRHJvcGRvd25UcmlnZ2VyKSBkcm9wZG93blRyaWdnZXI6IE1jRHJvcGRvd25UcmlnZ2VyO1xuXG4gICAgQFZpZXdDaGlsZCgndGV4dCcsIHsgc3RhdGljOiBmYWxzZSB9KSB0ZXh0OiBFbGVtZW50UmVmO1xuXG4gICAgLy8gV2hldGhlciB0aGUgbGFiZWwgc2hvdWxkIGFwcGVhciBiZWZvcmUgb3IgYWZ0ZXIgdGhlIGNoZWNrYm94LiBEZWZhdWx0cyB0byAnYWZ0ZXInXG4gICAgQElucHV0KCkgY2hlY2tib3hQb3NpdGlvbjogJ2JlZm9yZScgfCAnYWZ0ZXInO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBzZXQgdG8gdHJ1ZSBhZnRlciB0aGUgZmlyc3QgT25DaGFuZ2VzIGN5Y2xlIHNvIHdlIGRvbid0IGNsZWFyIHRoZSB2YWx1ZSBvZiBgc2VsZWN0ZWRgXG4gICAgICogaW4gdGhlIGZpcnN0IGN5Y2xlLlxuICAgICAqL1xuICAgIHByaXZhdGUgaW5wdXRzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHZhbHVlKCk6IGFueSB7IHJldHVybiB0aGlzLl92YWx1ZTsgfVxuICAgIHNldCB2YWx1ZShuZXdWYWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkICYmIG5ld1ZhbHVlICE9PSB0aGlzLnZhbHVlICYmIHRoaXMuaW5wdXRzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgfVxuICAgIHByaXZhdGUgX3ZhbHVlOiBhbnk7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpIHtcbiAgICAgICAgY29uc3QgbGlzdFNlbGVjdGlvbkRpc2FibGVkID0gdGhpcy5saXN0U2VsZWN0aW9uICYmIHRoaXMubGlzdFNlbGVjdGlvbi5kaXNhYmxlZDtcbiAgICAgICAgY29uc3QgZ3JvdXBEaXNhYmxlZCA9IHRoaXMuZ3JvdXAgJiYgdGhpcy5ncm91cC5kaXNhYmxlZDtcblxuICAgICAgICByZXR1cm4gbGlzdFNlbGVjdGlvbkRpc2FibGVkIHx8IGdyb3VwRGlzYWJsZWQgfHwgdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0b0Jvb2xlYW4odmFsdWUpO1xuXG4gICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gbmV3VmFsdWU7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNob3dDaGVja2JveCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3dDaGVja2JveCAhPT0gdW5kZWZpbmVkID8gdGhpcy5fc2hvd0NoZWNrYm94IDogdGhpcy5saXN0U2VsZWN0aW9uLnNob3dDaGVja2JveDtcbiAgICB9XG5cbiAgICBzZXQgc2hvd0NoZWNrYm94KHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fc2hvd0NoZWNrYm94ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zaG93Q2hlY2tib3g6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdFNlbGVjdGlvbi5zZWxlY3Rpb25Nb2RlbCAmJiB0aGlzLmxpc3RTZWxlY3Rpb24uc2VsZWN0aW9uTW9kZWwuaXNTZWxlY3RlZCh0aGlzKSB8fCBmYWxzZTtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHRvQm9vbGVhbih2YWx1ZSk7XG5cbiAgICAgICAgaWYgKGlzU2VsZWN0ZWQgIT09IHRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkKGlzU2VsZWN0ZWQpO1xuXG4gICAgICAgICAgICB0aGlzLmxpc3RTZWxlY3Rpb24ucmVwb3J0VmFsdWVDaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3NlbGVjdGVkID0gZmFsc2U7XG5cbiAgICBnZXQgdGFiSW5kZXgoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPyBudWxsIDogLTE7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTWNMaXN0U2VsZWN0aW9uKSkgcHVibGljIGxpc3RTZWxlY3Rpb246IE1jTGlzdFNlbGVjdGlvbixcbiAgICAgICAgQE9wdGlvbmFsKCkgcmVhZG9ubHkgZ3JvdXA6IE1jT3B0Z3JvdXBcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMubGlzdFNlbGVjdGlvbjtcblxuICAgICAgICBpZiAobGlzdC5fdmFsdWUgJiYgbGlzdC5fdmFsdWUuc29tZSgodmFsdWUpID0+IGxpc3QuY29tcGFyZVdpdGgodmFsdWUsIHRoaXMuX3ZhbHVlKSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWQodHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB3YXNTZWxlY3RlZCA9IHRoaXMuX3NlbGVjdGVkO1xuXG4gICAgICAgIC8vIExpc3Qgb3B0aW9ucyB0aGF0IGFyZSBzZWxlY3RlZCBhdCBpbml0aWFsaXphdGlvbiBjYW4ndCBiZSByZXBvcnRlZCBwcm9wZXJseSB0byB0aGUgZm9ybVxuICAgICAgICAvLyBjb250cm9sLiBUaGlzIGlzIGJlY2F1c2UgaXQgdGFrZXMgc29tZSB0aW1lIHVudGlsIHRoZSBzZWxlY3Rpb24tbGlzdCBrbm93cyBhYm91dCBhbGxcbiAgICAgICAgLy8gYXZhaWxhYmxlIG9wdGlvbnMuIEFsc28gaXQgY2FuIGhhcHBlbiB0aGF0IHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvciBoYXMgYW4gaW5pdGlhbCB2YWx1ZVxuICAgICAgICAvLyB0aGF0IHNob3VsZCBiZSB1c2VkIGluc3RlYWQuIERlZmVycmluZyB0aGUgdmFsdWUgY2hhbmdlIHJlcG9ydCB0byB0aGUgbmV4dCB0aWNrIGVuc3VyZXNcbiAgICAgICAgLy8gdGhhdCB0aGUgZm9ybSBjb250cm9sIHZhbHVlIGlzIG5vdCBiZWluZyBvdmVyd3JpdHRlbi5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWQgfHwgd2FzU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmlucHV0c0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gZGVsYXkgdGhpcyB1bnRpbCB0aGUgbmV4dCB0aWNrIGluIG9yZGVyXG4gICAgICAgICAgICAvLyB0byBhdm9pZCBjaGFuZ2VkIGFmdGVyIGNoZWNrZWQgZXJyb3JzLlxuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB0aGlzLnNlbGVjdGVkID0gZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5saXN0U2VsZWN0aW9uLnJlbW92ZU9wdGlvbkZyb21MaXN0KHRoaXMpO1xuICAgIH1cblxuICAgIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICF0aGlzLnNlbGVjdGVkO1xuICAgIH1cblxuICAgIGdldExhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0ID8gdGhpcy50ZXh0Lm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQgOiAnJztcbiAgICB9XG5cbiAgICBzZXRTZWxlY3RlZChzZWxlY3RlZDogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWQgPT09IHNlbGVjdGVkIHx8ICF0aGlzLmxpc3RTZWxlY3Rpb24uc2VsZWN0aW9uTW9kZWwpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSBzZWxlY3RlZDtcblxuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdFNlbGVjdGlvbi5zZWxlY3Rpb25Nb2RlbC5zZWxlY3QodGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RTZWxlY3Rpb24uc2VsZWN0aW9uTW9kZWwuZGVzZWxlY3QodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGdldEhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBjbGllbnRSZWN0cyA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldENsaWVudFJlY3RzKCk7XG5cbiAgICAgICAgaWYgKGNsaWVudFJlY3RzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGNsaWVudFJlY3RzWzBdLmhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKCRldmVudCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmxpc3RTZWxlY3Rpb24uc2V0U2VsZWN0ZWRPcHRpb25zQnlDbGljayhcbiAgICAgICAgICAgIHRoaXMsIGhhc01vZGlmaWVyS2V5KCRldmVudCwgJ3NoaWZ0S2V5JyksIGhhc01vZGlmaWVyS2V5KCRldmVudCwgJ2N0cmxLZXknKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIG9uS2V5ZG93bigkZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFjdGlvbkJ1dHRvbikgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAoJGV2ZW50LmtleUNvZGUgPT09IFRBQiAmJiAhJGV2ZW50LnNoaWZ0S2V5ICYmICF0aGlzLmFjdGlvbkJ1dHRvbi5oYXNGb2N1cykge1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25CdXR0b24uZm9jdXMoKTtcblxuICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb2N1cygpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5oYXNGb2N1cyB8fCB0aGlzLmFjdGlvbkJ1dHRvbj8uaGFzRm9jdXMpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgICB0aGlzLm9uRm9jdXMubmV4dCh7IG9wdGlvbjogdGhpcyB9KTtcblxuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGFzRm9jdXMgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBibHVyKCk6IHZvaWQge1xuICAgICAgICAvLyBXaGVuIGFuaW1hdGlvbnMgYXJlIGVuYWJsZWQsIEFuZ3VsYXIgbWF5IGVuZCB1cCByZW1vdmluZyB0aGUgb3B0aW9uIGZyb20gdGhlIERPTSBhIGxpdHRsZVxuICAgICAgICAvLyBlYXJsaWVyIHRoYW4gdXN1YWwsIGNhdXNpbmcgaXQgdG8gYmUgYmx1cnJlZCBhbmQgdGhyb3dpbmcgb2ZmIHRoZSBsb2dpYyBpbiB0aGUgbGlzdFxuICAgICAgICAvLyB0aGF0IG1vdmVzIGZvY3VzIG5vdCB0aGUgbmV4dCBpdGVtLiBUbyB3b3JrIGFyb3VuZCB0aGUgaXNzdWUsIHdlIGRlZmVyIG1hcmtpbmcgdGhlIG9wdGlvblxuICAgICAgICAvLyBhcyBub3QgZm9jdXNlZCB1bnRpbCB0aGUgbmV4dCB0aW1lIHRoZSB6b25lIHN0YWJpbGl6ZXMuXG4gICAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlXG4gICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0ZvY3VzID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0aW9uQnV0dG9uPy5oYXNGb2N1cykgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQmx1ci5uZXh0KHsgb3B0aW9uOiB0aGlzIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0SG9zdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCBNQ19TRUxFQ1RJT05fTElTVF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1jTGlzdFNlbGVjdGlvbiksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbmV4cG9ydCBjbGFzcyBNY0xpc3RTZWxlY3Rpb25DaGFuZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2U6IE1jTGlzdFNlbGVjdGlvbiwgcHVibGljIG9wdGlvbjogTWNMaXN0T3B0aW9uKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgTWNMaXN0U2VsZWN0QWxsRXZlbnQ8VD4ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2U6IE1jTGlzdFNlbGVjdGlvbiwgcHVibGljIG9wdGlvbnM6IFRbXSkge31cbn1cblxuZXhwb3J0IGNsYXNzIE1jTGlzdENvcHlFdmVudDxUPiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZTogTWNMaXN0U2VsZWN0aW9uLCBwdWJsaWMgb3B0aW9uOiBUKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgTWNMaXN0U2VsZWN0aW9uQmFzZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jTGlzdFNlbGVjdGlvbk1peGluQmFzZTogQ2FuRGlzYWJsZUN0b3IgJiBIYXNUYWJJbmRleEN0b3IgJiB0eXBlb2YgTWNMaXN0U2VsZWN0aW9uQmFzZVxuICAgID0gbWl4aW5UYWJJbmRleChtaXhpbkRpc2FibGVkKE1jTGlzdFNlbGVjdGlvbkJhc2UpKTtcblxuQENvbXBvbmVudCh7XG4gICAgZXhwb3J0QXM6ICdtY0xpc3RTZWxlY3Rpb24nLFxuICAgIHNlbGVjdG9yOiAnbWMtbGlzdC1zZWxlY3Rpb24nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW2F0dHIudGFiaW5kZXhdPVwidGFiSW5kZXhcIlxuICAgICAgICAgICAgIChmb2N1cyk9XCJmb2N1cygpXCJcbiAgICAgICAgICAgICAoYmx1cik9XCJibHVyKClcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+YCxcbiAgICBzdHlsZVVybHM6IFsnLi9saXN0LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGlucHV0czogWydkaXNhYmxlZCddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1saXN0LXNlbGVjdGlvbicsXG5cbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICctMScsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG5cbiAgICAgICAgJyhrZXlkb3duKSc6ICdvbktleURvd24oJGV2ZW50KScsXG4gICAgICAgICcod2luZG93OnJlc2l6ZSknOiAndXBkYXRlU2Nyb2xsU2l6ZSgpJ1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbTUNfU0VMRUNUSU9OX0xJU1RfVkFMVUVfQUNDRVNTT1JdLFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIE1jTGlzdFNlbGVjdGlvbiBleHRlbmRzIE1jTGlzdFNlbGVjdGlvbk1peGluQmFzZSBpbXBsZW1lbnRzIENhbkRpc2FibGUsIEhhc1RhYkluZGV4LCBBZnRlckNvbnRlbnRJbml0LFxuICAgIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICAgIGtleU1hbmFnZXI6IEZvY3VzS2V5TWFuYWdlcjxNY0xpc3RPcHRpb24+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY0xpc3RPcHRpb24sIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgb3B0aW9uczogUXVlcnlMaXN0PE1jTGlzdE9wdGlvbj47XG5cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgb25TZWxlY3RBbGwgPSBuZXcgRXZlbnRFbWl0dGVyPE1jTGlzdFNlbGVjdEFsbEV2ZW50PE1jTGlzdE9wdGlvbj4+KCk7XG5cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgb25Db3B5ID0gbmV3IEV2ZW50RW1pdHRlcjxNY0xpc3RDb3B5RXZlbnQ8TWNMaXN0T3B0aW9uPj4oKTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGF1dG9TZWxlY3QoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRvU2VsZWN0O1xuICAgIH1cblxuICAgIHNldCBhdXRvU2VsZWN0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2F1dG9TZWxlY3QgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2F1dG9TZWxlY3Q6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbm9VbnNlbGVjdExhc3QoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ub1Vuc2VsZWN0TGFzdDtcbiAgICB9XG5cbiAgICBzZXQgbm9VbnNlbGVjdExhc3QodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fbm9VbnNlbGVjdExhc3QgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX25vVW5zZWxlY3RMYXN0OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIG11bHRpcGxlTW9kZTogTXVsdGlwbGVNb2RlIHwgbnVsbDtcblxuICAgIGdldCBtdWx0aXBsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5tdWx0aXBsZU1vZGU7XG4gICAgfVxuXG4gICAgQElucHV0KCkgaG9yaXpvbnRhbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgdGFiSW5kZXgoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPyAtMSA6IHRoaXMuX3RhYkluZGV4O1xuICAgIH1cblxuICAgIHNldCB0YWJJbmRleCh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMudXNlclRhYkluZGV4ID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX3RhYkluZGV4ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdGFiSW5kZXggPSAwO1xuXG4gICAgdXNlclRhYkluZGV4OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAgIGdldCBzaG93Q2hlY2tib3goKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlTW9kZSA9PT0gTXVsdGlwbGVNb2RlLkNIRUNLQk9YO1xuICAgIH1cblxuICAgIC8vIEVtaXRzIGEgY2hhbmdlIGV2ZW50IHdoZW5ldmVyIHRoZSBzZWxlY3RlZCBzdGF0ZSBvZiBhbiBvcHRpb24gY2hhbmdlcy5cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TWNMaXN0U2VsZWN0aW9uQ2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWNMaXN0U2VsZWN0aW9uQ2hhbmdlPigpO1xuXG4gICAgc2VsZWN0aW9uTW9kZWw6IFNlbGVjdGlvbk1vZGVsPE1jTGlzdE9wdGlvbj47XG5cbiAgICBnZXQgb3B0aW9uRm9jdXNDaGFuZ2VzKCk6IE9ic2VydmFibGU8TWNPcHRpb25FdmVudD4ge1xuICAgICAgICByZXR1cm4gbWVyZ2UoLi4udGhpcy5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiBvcHRpb24ub25Gb2N1cykpO1xuICAgIH1cblxuICAgIGdldCBvcHRpb25CbHVyQ2hhbmdlcygpOiBPYnNlcnZhYmxlPE1jT3B0aW9uRXZlbnQ+IHtcbiAgICAgICAgcmV0dXJuIG1lcmdlKC4uLnRoaXMub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gb3B0aW9uLm9uQmx1cikpO1xuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpvcnRob2RveC1nZXR0ZXItYW5kLXNldHRlciBuYW1pbmctY29udmVudGlvblxuICAgIF92YWx1ZTogc3RyaW5nW10gfCBudWxsO1xuXG4gICAgLyoqIEVtaXRzIHdoZW5ldmVyIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkLiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIHByaXZhdGUgb3B0aW9uRm9jdXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGw7XG5cbiAgICBwcml2YXRlIG9wdGlvbkJsdXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIEBBdHRyaWJ1dGUoJ211bHRpcGxlJykgbXVsdGlwbGU6IE11bHRpcGxlTW9kZSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBjbGlwYm9hcmQ6IENsaXBib2FyZFxuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgICAgICBpZiAobXVsdGlwbGUgPT09IE11bHRpcGxlTW9kZS5DSEVDS0JPWCB8fCBtdWx0aXBsZSA9PT0gTXVsdGlwbGVNb2RlLktFWUJPQVJEKSB7XG4gICAgICAgICAgICB0aGlzLm11bHRpcGxlTW9kZSA9IG11bHRpcGxlO1xuICAgICAgICB9IGVsc2UgaWYgKG11bHRpcGxlICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm11bHRpcGxlTW9kZSA9IE11bHRpcGxlTW9kZS5DSEVDS0JPWDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlTW9kZSA9PT0gTXVsdGlwbGVNb2RlLkNIRUNLQk9YKSB7XG4gICAgICAgICAgICB0aGlzLmF1dG9TZWxlY3QgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubm9VbnNlbGVjdExhc3QgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwgPSBuZXcgU2VsZWN0aW9uTW9kZWw8TWNMaXN0T3B0aW9uPih0aGlzLm11bHRpcGxlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB1c2VkIGZvciBjb21wYXJpbmcgYW4gb3B0aW9uIGFnYWluc3QgdGhlIHNlbGVjdGVkIHZhbHVlIHdoZW4gZGV0ZXJtaW5pbmcgd2hpY2hcbiAgICAgKiBvcHRpb25zIHNob3VsZCBhcHBlYXIgYXMgc2VsZWN0ZWQuIFRoZSBmaXJzdCBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgYW4gb3B0aW9ucy4gVGhlIHNlY29uZFxuICAgICAqIG9uZSBpcyBhIHZhbHVlIGZyb20gdGhlIHNlbGVjdGVkIHZhbHVlLiBBIGJvb2xlYW4gbXVzdCBiZSByZXR1cm5lZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBjb21wYXJlV2l0aDogKG8xOiBhbnksIG8yOiBhbnkpID0+IGJvb2xlYW4gPSAoYTEsIGEyKSA9PiBhMSA9PT0gYTI7XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaG9yaXpvbnRhbCA9IHRvQm9vbGVhbih0aGlzLmhvcml6b250YWwpO1xuXG4gICAgICAgIHRoaXMua2V5TWFuYWdlciA9IG5ldyBGb2N1c0tleU1hbmFnZXI8TWNMaXN0T3B0aW9uPih0aGlzLm9wdGlvbnMpXG4gICAgICAgICAgICAud2l0aFR5cGVBaGVhZCgpXG4gICAgICAgICAgICAud2l0aFZlcnRpY2FsT3JpZW50YXRpb24oIXRoaXMuaG9yaXpvbnRhbClcbiAgICAgICAgICAgIC53aXRoSG9yaXpvbnRhbE9yaWVudGF0aW9uKHRoaXMuaG9yaXpvbnRhbCA/ICdsdHInIDogbnVsbCk7XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnRhYk91dFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RhYkluZGV4ID0gLTE7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGFiSW5kZXggPSB0aGlzLnVzZXJUYWJJbmRleCB8fCAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbnNGcm9tVmFsdWVzKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuY2hhbmdlZFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGV2ZW50LmFkZGVkKSB7IGl0ZW0uc2VsZWN0ZWQgPSB0cnVlOyB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgZXZlbnQucmVtb3ZlZCkgeyBpdGVtLnNlbGVjdGVkID0gZmFsc2U7IH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub3B0aW9ucy5jaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShzdGFydFdpdGgobnVsbCksIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0T3B0aW9ucygpO1xuXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHdlIG5lZWQgdG8gdXBkYXRlIG91ciB0YWIgaW5kZXhcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRhYkluZGV4KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVNjcm9sbFNpemUoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQubmV4dCgpO1xuXG4gICAgICAgIHRoaXMuZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICB9XG5cbiAgICBibHVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuaGFzRm9jdXNlZE9wdGlvbigpKSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbSgtMSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHNlbGVjdEFsbCgpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uLnNldFNlbGVjdGVkKHRydWUpKTtcblxuICAgICAgICB0aGlzLnJlcG9ydFZhbHVlQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgZGVzZWxlY3RBbGwoKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IG9wdGlvbi5zZXRTZWxlY3RlZChmYWxzZSkpO1xuXG4gICAgICAgIHRoaXMucmVwb3J0VmFsdWVDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVTY3JvbGxTaXplKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5ob3Jpem9udGFsIHx8ICF0aGlzLm9wdGlvbnMuZmlyc3QpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLndpdGhTY3JvbGxTaXplKE1hdGguZmxvb3IodGhpcy5nZXRIZWlnaHQoKSAvIHRoaXMub3B0aW9ucy5maXJzdC5nZXRIZWlnaHQoKSkpO1xuICAgIH1cblxuICAgIHNldFNlbGVjdGVkT3B0aW9uc0J5Q2xpY2sob3B0aW9uOiBNY0xpc3RPcHRpb24sIHNoaWZ0S2V5OiBib29sZWFuLCBjdHJsS2V5OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChzaGlmdEtleSAmJiB0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkT3B0aW9ucyhvcHRpb24pO1xuICAgICAgICB9IGVsc2UgaWYgKGN0cmxLZXkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5jYW5EZXNlbGVjdExhc3Qob3B0aW9uKSkgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC50b2dnbGUob3B0aW9uKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmF1dG9TZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwudG9nZ2xlKG9wdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnRvZ2dsZShvcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbWl0Q2hhbmdlRXZlbnQob3B0aW9uKTtcbiAgICAgICAgdGhpcy5yZXBvcnRWYWx1ZUNoYW5nZSgpO1xuICAgIH1cblxuICAgIHNldFNlbGVjdGVkT3B0aW9uc0J5S2V5KG9wdGlvbjogTWNMaXN0T3B0aW9uLCBzaGlmdEtleTogYm9vbGVhbiwgY3RybEtleTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoc2hpZnRLZXkgJiYgdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3RlZE9wdGlvbnMob3B0aW9uKTtcbiAgICAgICAgfSBlbHNlIGlmIChjdHJsS2V5KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuY2FuRGVzZWxlY3RMYXN0KG9wdGlvbikpIHsgcmV0dXJuOyB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvU2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5zZXRTZWxlY3RlZChmYWxzZSkpO1xuICAgICAgICAgICAgb3B0aW9uLnNldFNlbGVjdGVkKHRydWUpO1xuXG4gICAgICAgICAgICB0aGlzLmVtaXRDaGFuZ2VFdmVudChvcHRpb24pO1xuICAgICAgICAgICAgdGhpcy5yZXBvcnRWYWx1ZUNoYW5nZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0U2VsZWN0ZWRPcHRpb25zKG9wdGlvbjogTWNMaXN0T3B0aW9uKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uU3RhdGUgPSBvcHRpb24uc2VsZWN0ZWQ7XG5cbiAgICAgICAgbGV0IGZyb21JbmRleCA9IHRoaXMua2V5TWFuYWdlci5wcmV2aW91c0FjdGl2ZUl0ZW1JbmRleDtcbiAgICAgICAgbGV0IHRvSW5kZXggPSB0aGlzLmtleU1hbmFnZXIucHJldmlvdXNBY3RpdmVJdGVtSW5kZXggPSB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4O1xuXG4gICAgICAgIGlmICh0b0luZGV4ID09PSBmcm9tSW5kZXgpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKGZyb21JbmRleCA+IHRvSW5kZXgpIHtcbiAgICAgICAgICAgIFtmcm9tSW5kZXgsIHRvSW5kZXhdID0gW3RvSW5kZXgsIGZyb21JbmRleF07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgICAgIC50b0FycmF5KClcbiAgICAgICAgICAgIC5zbGljZShmcm9tSW5kZXgsIHRvSW5kZXggKyAxKVxuICAgICAgICAgICAgLmZpbHRlcigoaXRlbSkgPT4gIWl0ZW0uZGlzYWJsZWQpXG4gICAgICAgICAgICAuZm9yRWFjaCgocmVuZGVyZWRPcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc0xhc3RSZW5kZXJlZE9wdGlvbiA9IHJlbmRlcmVkT3B0aW9uID09PSB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbTtcblxuICAgICAgICAgICAgICAgIGlmIChpc0xhc3RSZW5kZXJlZE9wdGlvbiAmJiByZW5kZXJlZE9wdGlvbi5zZWxlY3RlZCAmJiB0aGlzLm5vVW5zZWxlY3RMYXN0KSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICAgICAgcmVuZGVyZWRPcHRpb24uc2V0U2VsZWN0ZWQoIXNlbGVjdGVkT3B0aW9uU3RhdGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICB3cml0ZVZhbHVlKHZhbHVlczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZXM7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5zZXRPcHRpb25zRnJvbVZhbHVlcyh2YWx1ZXMgfHwgW10pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIGEgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uLmRpc2FibGVkID0gaXNEaXNhYmxlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZE9wdGlvblZhbHVlcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZmlsdGVyKChvcHRpb24pID0+IG9wdGlvbi5zZWxlY3RlZCkubWFwKChvcHRpb24pID0+IG9wdGlvbi52YWx1ZSk7XG4gICAgfVxuXG4gICAgLy8gVG9nZ2xlcyB0aGUgc2VsZWN0ZWQgc3RhdGUgb2YgdGhlIGN1cnJlbnRseSBmb2N1c2VkIG9wdGlvbi5cbiAgICB0b2dnbGVGb2N1c2VkT3B0aW9uKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBmb2N1c2VkSW5kZXggPSB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4O1xuXG4gICAgICAgIGlmIChmb2N1c2VkSW5kZXggIT0gbnVsbCAmJiB0aGlzLmlzVmFsaWRJbmRleChmb2N1c2VkSW5kZXgpKSB7XG4gICAgICAgICAgICBjb25zdCBmb2N1c2VkT3B0aW9uOiBNY0xpc3RPcHRpb24gPSB0aGlzLm9wdGlvbnMudG9BcnJheSgpW2ZvY3VzZWRJbmRleF07XG5cbiAgICAgICAgICAgIGlmIChmb2N1c2VkT3B0aW9uICYmIHRoaXMuY2FuRGVzZWxlY3RMYXN0KGZvY3VzZWRPcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgZm9jdXNlZE9wdGlvbi50b2dnbGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIEVtaXQgYSBjaGFuZ2UgZXZlbnQgYmVjYXVzZSB0aGUgZm9jdXNlZCBvcHRpb24gY2hhbmdlZCBpdHMgc3RhdGUgdGhyb3VnaCB1c2VyIGludGVyYWN0aW9uLlxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdENoYW5nZUV2ZW50KGZvY3VzZWRPcHRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuRGVzZWxlY3RMYXN0KGxpc3RPcHRpb246IE1jTGlzdE9wdGlvbik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISh0aGlzLm5vVW5zZWxlY3RMYXN0ICYmIHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWQubGVuZ3RoID09PSAxICYmIGxpc3RPcHRpb24uc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIGdldEhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBjbGllbnRSZWN0cyA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldENsaWVudFJlY3RzKCk7XG5cbiAgICAgICAgaWYgKGNsaWVudFJlY3RzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGNsaWVudFJlY3RzWzBdLmhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIC8vIFZpZXcgdG8gbW9kZWwgY2FsbGJhY2sgdGhhdCBzaG91bGQgYmUgY2FsbGVkIGlmIHRoZSBsaXN0IG9yIGl0cyBvcHRpb25zIGxvc3QgZm9jdXMuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5XG4gICAgb25Ub3VjaGVkOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgICAvLyBSZW1vdmVzIGFuIG9wdGlvbiBmcm9tIHRoZSBzZWxlY3Rpb24gbGlzdCBhbmQgdXBkYXRlcyB0aGUgYWN0aXZlIGl0ZW0uXG4gICAgcmVtb3ZlT3B0aW9uRnJvbUxpc3Qob3B0aW9uOiBNY0xpc3RPcHRpb24pIHtcbiAgICAgICAgaWYgKG9wdGlvbi5oYXNGb2N1cykge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uSW5kZXggPSB0aGlzLmdldE9wdGlvbkluZGV4KG9wdGlvbik7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlIG9wdGlvbiBpcyB0aGUgbGFzdCBpdGVtXG4gICAgICAgICAgICBpZiAob3B0aW9uSW5kZXggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldFByZXZpb3VzSXRlbUFjdGl2ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb25JbmRleCA9PT0gMCAmJiB0aGlzLm9wdGlvbnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXROZXh0SXRlbUFjdGl2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG5cbiAgICAgICAgaWYgKFtTUEFDRSwgRU5URVIsIExFRlRfQVJST1csIFJJR0hUX0FSUk9XXS5pbmNsdWRlcyhrZXlDb2RlKSB8fCBpc1ZlcnRpY2FsTW92ZW1lbnQoZXZlbnQpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgaXNTZWxlY3RBbGwoZXZlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEFsbE9wdGlvbnMoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChpc0NvcHkoZXZlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmNvcHlBY3RpdmVPcHRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChbU1BBQ0UsIEVOVEVSXS5pbmNsdWRlcyhrZXlDb2RlKSkge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVGb2N1c2VkT3B0aW9uKCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBUQUIpIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci50YWJPdXQubmV4dCgpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gRE9XTl9BUlJPVykge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldE5leHRJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gVVBfQVJST1cpIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRQcmV2aW91c0l0ZW1BY3RpdmUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBIT01FKSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gRU5EKSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0TGFzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBQQUdFX1VQKSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0UHJldmlvdXNQYWdlSXRlbUFjdGl2ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFBBR0VfRE9XTikge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldE5leHRQYWdlSXRlbUFjdGl2ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtICYmIGlzVmVydGljYWxNb3ZlbWVudChldmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRPcHRpb25zQnlLZXkoXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0gYXMgTWNMaXN0T3B0aW9uLFxuICAgICAgICAgICAgICAgIGhhc01vZGlmaWVyS2V5KGV2ZW50LCAnc2hpZnRLZXknKSxcbiAgICAgICAgICAgICAgICBoYXNNb2RpZmllcktleShldmVudCwgJ2N0cmxLZXknKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlcG9ydHMgYSB2YWx1ZSBjaGFuZ2UgdG8gdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yXG4gICAgcmVwb3J0VmFsdWVDaGFuZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRTZWxlY3RlZE9wdGlvblZhbHVlcygpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gRW1pdHMgYSBjaGFuZ2UgZXZlbnQgaWYgdGhlIHNlbGVjdGVkIHN0YXRlIG9mIGFuIG9wdGlvbiBjaGFuZ2VkLlxuICAgIGVtaXRDaGFuZ2VFdmVudChvcHRpb246IE1jTGlzdE9wdGlvbikge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KG5ldyBNY0xpc3RTZWxlY3Rpb25DaGFuZ2UodGhpcywgb3B0aW9uKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVRhYkluZGV4KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl90YWJJbmRleCA9IHRoaXMudXNlclRhYkluZGV4IHx8ICh0aGlzLm9wdGlvbnMubGVuZ3RoID09PSAwID8gLTEgOiAwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ29weURlZmF1bHRIYW5kbGVyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsaXBib2FyZD8uY29weSh0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbSEudmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVzZXRPcHRpb25zKCkge1xuICAgICAgICB0aGlzLmRyb3BTdWJzY3JpcHRpb25zKCk7XG4gICAgICAgIHRoaXMubGlzdGVuVG9PcHRpb25zRm9jdXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyb3BTdWJzY3JpcHRpb25zKCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25Gb2N1c1N1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25Gb2N1c1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25Gb2N1c1N1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vcHRpb25CbHVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbkJsdXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uQmx1clN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGxpc3RlblRvT3B0aW9uc0ZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9wdGlvbkZvY3VzU3Vic2NyaXB0aW9uID0gdGhpcy5vcHRpb25Gb2N1c0NoYW5nZXNcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXg6IG51bWJlciA9IHRoaXMub3B0aW9ucy50b0FycmF5KCkuaW5kZXhPZihldmVudC5vcHRpb24pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZEluZGV4KGluZGV4KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIudXBkYXRlQWN0aXZlSXRlbShpbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25CbHVyU3Vic2NyaXB0aW9uID0gdGhpcy5vcHRpb25CbHVyQ2hhbmdlc1xuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmJsdXIoKSk7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIGFueSBvZiB0aGUgb3B0aW9ucyBpcyBmb2N1c2VkLiAqL1xuICAgIHByaXZhdGUgaGFzRm9jdXNlZE9wdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zb21lKChvcHRpb24pID0+IG9wdGlvbi5oYXNGb2N1cyk7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJucyB0aGUgb3B0aW9uIHdpdGggdGhlIHNwZWNpZmllZCB2YWx1ZS5cbiAgICBwcml2YXRlIGdldE9wdGlvbkJ5VmFsdWUodmFsdWU6IHN0cmluZyk6IE1jTGlzdE9wdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZmluZCgob3B0aW9uKSA9PiBvcHRpb24udmFsdWUgPT09IHZhbHVlKTtcbiAgICB9XG5cbiAgICAvLyBTZXRzIHRoZSBzZWxlY3RlZCBvcHRpb25zIGJhc2VkIG9uIHRoZSBzcGVjaWZpZWQgdmFsdWVzLlxuICAgIHByaXZhdGUgc2V0T3B0aW9uc0Zyb21WYWx1ZXModmFsdWVzOiBzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiBvcHRpb24uc2V0U2VsZWN0ZWQoZmFsc2UpKTtcblxuICAgICAgICB2YWx1ZXNcbiAgICAgICAgICAgIC5tYXAoKHZhbHVlKSA9PiB0aGlzLmdldE9wdGlvbkJ5VmFsdWUodmFsdWUpKVxuICAgICAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAgICAgLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uIS5zZXRTZWxlY3RlZCh0cnVlKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXRpbGl0eSB0byBlbnN1cmUgYWxsIGluZGV4ZXMgYXJlIHZhbGlkLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggdG8gYmUgY2hlY2tlZC5cbiAgICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpbmRleCBpcyB2YWxpZCBmb3Igb3VyIGxpc3Qgb2Ygb3B0aW9ucy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGlzVmFsaWRJbmRleChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5vcHRpb25zLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgc3BlY2lmaWVkIGxpc3Qgb3B0aW9uLlxuICAgIHByaXZhdGUgZ2V0T3B0aW9uSW5kZXgob3B0aW9uOiBNY0xpc3RPcHRpb24pOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnRvQXJyYXkoKS5pbmRleE9mKG9wdGlvbik7XG4gICAgfVxuXG4gICAgLy8gVmlldyB0byBtb2RlbCBjYWxsYmFjayB0aGF0IHNob3VsZCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlIHNlbGVjdGVkIG9wdGlvbnMgY2hhbmdlLlxuICAgIHByaXZhdGUgb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKF86IGFueSkgPT4ge307XG5cbiAgICBwcml2YXRlIHNlbGVjdEFsbE9wdGlvbnMoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnNUb1NlbGVjdCA9IHRoaXMub3B0aW9uc1xuICAgICAgICAgICAgLmZpbHRlcigob3B0aW9uKSA9PiAhb3B0aW9uLmRpc2FibGVkKTtcblxuICAgICAgICBvcHRpb25zVG9TZWxlY3RcbiAgICAgICAgLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uLnNldFNlbGVjdGVkKHRydWUpKTtcblxuICAgICAgICB0aGlzLm9uU2VsZWN0QWxsLmVtaXQobmV3IE1jTGlzdFNlbGVjdEFsbEV2ZW50KHRoaXMsIG9wdGlvbnNUb1NlbGVjdCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29weUFjdGl2ZU9wdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMub25Db3B5Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMub25Db3B5LmVtaXQobmV3IE1jTGlzdENvcHlFdmVudCh0aGlzLCB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbSBhcyBNY0xpc3RPcHRpb24pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub25Db3B5RGVmYXVsdEhhbmRsZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIjxtYy1wc2V1ZG8tY2hlY2tib3hcbiAgICAqbmdJZj1cInNob3dDaGVja2JveFwiXG4gICAgW3N0YXRlXT1cInNlbGVjdGVkID8gJ2NoZWNrZWQnIDogJ3VuY2hlY2tlZCdcIlxuICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuPC9tYy1wc2V1ZG8tY2hlY2tib3g+XG5cbjxkaXYgY2xhc3M9XCJtYy1saXN0LXRleHRcIiAjdGV4dD5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5cblxuPG5nLWNvbnRlbnQgc2VsZWN0PVwibWMtb3B0aW9uLWFjdGlvblwiPjwvbmctY29udGVudD5cbiJdfQ==