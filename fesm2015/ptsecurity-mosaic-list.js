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

/**
 * @fileoverview added by tsickle
 * Generated from: list-selection.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function McOptionEvent() { }
if (false) {
    /** @type {?} */
    McOptionEvent.prototype.option;
}
/**
 * Component for list-options of selection-list. Each list-option can automatically
 * generate a checkbox and can put current item into the selectionModel of selection-list
 * if the current item is selected.
 */
class McListOption {
    /**
     * @param {?} elementRef
     * @param {?} changeDetector
     * @param {?} ngZone
     * @param {?} listSelection
     * @param {?} group
     */
    constructor(elementRef, changeDetector, ngZone, listSelection, group) {
        this.elementRef = elementRef;
        this.changeDetector = changeDetector;
        this.ngZone = ngZone;
        this.listSelection = listSelection;
        this.group = group;
        this.hasFocus = false;
        this.onFocus = new Subject();
        this.onBlur = new Subject();
        this._disabled = false;
        this._selected = false;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return (this.listSelection && this.listSelection.disabled) || (this.group && this.group.disabled) ||
            this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        /** @type {?} */
        const newValue = toBoolean(value);
        if (newValue !== this._disabled) {
            this._disabled = newValue;
            this.changeDetector.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    get showCheckbox() {
        return this._showCheckbox !== undefined ? this._showCheckbox : this.listSelection.showCheckbox;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showCheckbox(value) {
        this._showCheckbox = coerceBooleanProperty(value);
    }
    /**
     * @return {?}
     */
    get selected() {
        return this.listSelection.selectionModel && this.listSelection.selectionModel.isSelected(this) || false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        /** @type {?} */
        const isSelected = toBoolean(value);
        if (isSelected !== this._selected) {
            this.setSelected(isSelected);
            this.listSelection.reportValueChange();
        }
    }
    /**
     * @return {?}
     */
    get tabIndex() {
        return this.disabled ? null : -1;
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
            /** @type {?} */
            const wasSelected = this._selected;
            Promise.resolve().then((/**
             * @return {?}
             */
            () => {
                if (this._selected || wasSelected) {
                    this.selected = true;
                    this.changeDetector.markForCheck();
                }
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.selected) {
            // We have to delay this until the next tick in order
            // to avoid changed after checked errors.
            Promise.resolve().then((/**
             * @return {?}
             */
            () => this.selected = false));
        }
        this.listSelection.removeOptionFromList(this);
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
    getLabel() {
        return this.text ? this.text.nativeElement.textContent : '';
    }
    /**
     * @param {?} selected
     * @return {?}
     */
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
    /**
     * @return {?}
     */
    getHeight() {
        return this.elementRef.nativeElement.getClientRects()[0].height;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    handleClick($event) {
        if (this.disabled) {
            return;
        }
        this.listSelection.setSelectedOptionsByClick(this, hasModifierKey($event, 'shiftKey'), hasModifierKey($event, 'ctrlKey'));
    }
    /**
     * @return {?}
     */
    focus() {
        if (!this.hasFocus) {
            this.elementRef.nativeElement.focus();
            this.onFocus.next({ option: this });
            Promise.resolve().then((/**
             * @return {?}
             */
            () => {
                this.hasFocus = true;
                this.changeDetector.markForCheck();
            }));
        }
    }
    /**
     * @return {?}
     */
    blur() {
        // When animations are enabled, Angular may end up removing the option from the DOM a little
        // earlier than usual, causing it to be blurred and throwing off the logic in the list
        // that moves focus not the next item. To work around the issue, we defer marking the option
        // as not focused until the next time the zone stabilizes.
        this.ngZone.onStable
            .asObservable()
            .pipe(take(1))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.ngZone.run((/**
             * @return {?}
             */
            () => {
                this.hasFocus = false;
                this.onBlur.next({ option: this });
            }));
        }));
    }
    /**
     * @return {?}
     */
    getHostElement() {
        return this.elementRef.nativeElement;
    }
}
McListOption.decorators = [
    { type: Component, args: [{
                exportAs: 'mcListOption',
                selector: 'mc-list-option',
                host: {
                    '[attr.tabindex]': 'tabIndex',
                    class: 'mc-list-option mc-no-select',
                    '[class.mc-selected]': 'selected',
                    '[class.mc-focused]': 'hasFocus',
                    '[class.mc-disabled]': 'disabled',
                    '(focus)': 'focus()',
                    '(blur)': 'blur()',
                    '(click)': 'handleClick($event)'
                },
                template: "<div class=\"mc-list-item-content\">\n    <mc-pseudo-checkbox\n        *ngIf=\"showCheckbox\"\n        [state]=\"selected ? 'checked' : 'unchecked'\"\n        [disabled]=\"disabled\">\n    </mc-pseudo-checkbox>\n\n    <div class=\"mc-list-text\" #text>\n        <ng-content></ng-content>\n    </div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
McListOption.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: McListSelection, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => McListSelection)),] }] },
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
if (false) {
    /** @type {?} */
    McListOption.prototype.hasFocus;
    /** @type {?} */
    McListOption.prototype.onFocus;
    /** @type {?} */
    McListOption.prototype.onBlur;
    /** @type {?} */
    McListOption.prototype.lines;
    /** @type {?} */
    McListOption.prototype.text;
    /** @type {?} */
    McListOption.prototype.checkboxPosition;
    /** @type {?} */
    McListOption.prototype.value;
    /**
     * @type {?}
     * @private
     */
    McListOption.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    McListOption.prototype._showCheckbox;
    /**
     * @type {?}
     * @private
     */
    McListOption.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    McListOption.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    McListOption.prototype.changeDetector;
    /**
     * @type {?}
     * @private
     */
    McListOption.prototype.ngZone;
    /** @type {?} */
    McListOption.prototype.listSelection;
    /** @type {?} */
    McListOption.prototype.group;
}
/** @type {?} */
const MC_SELECTION_LIST_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => McListSelection)),
    multi: true
};
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
if (false) {
    /** @type {?} */
    McListSelectionChange.prototype.source;
    /** @type {?} */
    McListSelectionChange.prototype.option;
}
class McListSelectionBase {
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
const McListSelectionMixinBase = mixinTabIndex(mixinDisabled(McListSelectionBase));
class McListSelection extends McListSelectionMixinBase {
    /**
     * @param {?} element
     * @param {?} changeDetectorRef
     * @param {?} tabIndex
     * @param {?} autoSelect
     * @param {?} noUnselect
     * @param {?} multiple
     */
    constructor(element, changeDetectorRef, tabIndex, autoSelect, noUnselect, multiple) {
        super();
        this.element = element;
        this.changeDetectorRef = changeDetectorRef;
        this.horizontal = false;
        this._tabIndex = 0;
        // Emits a change event whenever the selected state of an option changes.
        this.selectionChange = new EventEmitter();
        /**
         * Emits whenever the component is destroyed.
         */
        this.destroyed = new Subject();
        // View to model callback that should be called if the list or its options lost focus.
        // tslint:disable-next-line:no-empty
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
        // View to model callback that should be called whenever the selected options change.
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this.autoSelect = autoSelect === null ? true : toBoolean(autoSelect);
        this.noUnselect = noUnselect === null ? true : toBoolean(noUnselect);
        if (multiple === MultipleMode.CHECKBOX || multiple === MultipleMode.KEYBOARD) {
            this.multipleMode = multiple;
        }
        else if (multiple !== null) {
            this.multipleMode = MultipleMode.CHECKBOX;
        }
        if (this.multipleMode === MultipleMode.CHECKBOX) {
            this.autoSelect = false;
            this.noUnselect = false;
        }
        this._tabIndex = parseInt(tabIndex) || 0;
        this.selectionModel = new SelectionModel(this.multiple);
    }
    /**
     * @return {?}
     */
    get multiple() {
        return !!this.multipleMode;
    }
    /**
     * @return {?}
     */
    get tabIndex() {
        return this._tabIndex;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set tabIndex(value) {
        this._tabIndex = value;
    }
    /**
     * @return {?}
     */
    get showCheckbox() {
        return this.multipleMode === MultipleMode.CHECKBOX;
    }
    /**
     * @return {?}
     */
    get optionFocusChanges() {
        return merge(...this.options.map((/**
         * @param {?} option
         * @return {?}
         */
        (option) => option.onFocus)));
    }
    /**
     * @return {?}
     */
    get optionBlurChanges() {
        return merge(...this.options.map((/**
         * @param {?} option
         * @return {?}
         */
        (option) => option.onBlur)));
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.horizontal = toBoolean(this.horizontal);
        this.keyManager = new FocusKeyManager(this.options)
            .withTypeAhead()
            .withVerticalOrientation(!this.horizontal)
            .withHorizontalOrientation(this.horizontal ? 'ltr' : null);
        this.keyManager.tabOut
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this._tabIndex = -1;
            setTimeout((/**
             * @return {?}
             */
            () => {
                this._tabIndex = 0;
                this.changeDetectorRef.markForCheck();
            }));
        }));
        if (this.tempValues) {
            this.setOptionsFromValues(this.tempValues);
            this.tempValues = null;
        }
        this.selectionModel.changed
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            for (const item of event.added) {
                item.selected = true;
            }
            for (const item of event.removed) {
                item.selected = false;
            }
        }));
        this.options.changes
            .pipe(startWith(null), takeUntil(this.destroyed))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.resetOptions();
            // Check to see if we need to update our tab index
            this.updateTabIndex();
        }));
        this.updateScrollSize();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
    /**
     * @return {?}
     */
    focus() {
        if (this.options.length === 0) {
            return;
        }
        this.keyManager.setFirstItemActive();
    }
    /**
     * @return {?}
     */
    blur() {
        if (!this.hasFocusedOption()) {
            this.keyManager.setActiveItem(-1);
        }
        this.onTouched();
        this.changeDetectorRef.markForCheck();
    }
    /**
     * @return {?}
     */
    selectAll() {
        this.options.forEach((/**
         * @param {?} option
         * @return {?}
         */
        (option) => option.setSelected(true)));
        this.reportValueChange();
    }
    /**
     * @return {?}
     */
    deselectAll() {
        this.options.forEach((/**
         * @param {?} option
         * @return {?}
         */
        (option) => option.setSelected(false)));
        this.reportValueChange();
    }
    /**
     * @return {?}
     */
    updateScrollSize() {
        if (this.horizontal || !this.options.first) {
            return;
        }
        this.keyManager.withScrollSize(Math.floor(this.getHeight() / this.options.first.getHeight()));
    }
    /**
     * @param {?} option
     * @param {?} shiftKey
     * @param {?} ctrlKey
     * @return {?}
     */
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
        else {
            if (this.autoSelect) {
                this.options.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                (item) => item.setSelected(false)));
                option.setSelected(true);
            }
        }
        this.emitChangeEvent(option);
        this.reportValueChange();
    }
    /**
     * @param {?} option
     * @param {?} shiftKey
     * @param {?} ctrlKey
     * @return {?}
     */
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
            if (this.autoSelect) {
                this.options.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                (item) => item.setSelected(false)));
                option.setSelected(true);
            }
        }
        this.emitChangeEvent(option);
        this.reportValueChange();
    }
    /**
     * @param {?} option
     * @return {?}
     */
    setSelectedOptions(option) {
        /** @type {?} */
        const selectedOptionState = option.selected;
        /** @type {?} */
        let fromIndex = this.keyManager.previousActiveItemIndex;
        /** @type {?} */
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
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => !item.disabled))
            .forEach((/**
         * @param {?} renderedOption
         * @return {?}
         */
        (renderedOption) => {
            /** @type {?} */
            const isLastRenderedOption = renderedOption === this.keyManager.activeItem;
            if (isLastRenderedOption && renderedOption.selected && this.noUnselect) {
                return;
            }
            renderedOption.setSelected(!selectedOptionState);
        }));
    }
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} values
     * @return {?}
     */
    writeValue(values) {
        if (this.options) {
            this.setOptionsFromValues(values || []);
        }
        else {
            this.tempValues = values;
        }
    }
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    // Implemented as a part of ControlValueAccessor.
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        if (this.options) {
            this.options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            (option) => option.disabled = isDisabled));
        }
    }
    /**
     * @return {?}
     */
    getSelectedOptionValues() {
        return this.options.filter((/**
         * @param {?} option
         * @return {?}
         */
        (option) => option.selected)).map((/**
         * @param {?} option
         * @return {?}
         */
        (option) => option.value));
    }
    // Toggles the selected state of the currently focused option.
    /**
     * @return {?}
     */
    toggleFocusedOption() {
        /** @type {?} */
        const focusedIndex = this.keyManager.activeItemIndex;
        if (focusedIndex != null && this.isValidIndex(focusedIndex)) {
            /** @type {?} */
            const focusedOption = this.options.toArray()[focusedIndex];
            if (focusedOption && this.canDeselectLast(focusedOption)) {
                focusedOption.toggle();
                // Emit a change event because the focused option changed its state through user interaction.
                this.emitChangeEvent(focusedOption);
            }
        }
    }
    /**
     * @param {?} listOption
     * @return {?}
     */
    canDeselectLast(listOption) {
        return !(this.noUnselect && this.selectionModel.selected.length === 1 && listOption.selected);
    }
    /**
     * @return {?}
     */
    getHeight() {
        return this.element.nativeElement.getClientRects()[0].height;
    }
    // Removes an option from the selection list and updates the active item.
    /**
     * @param {?} option
     * @return {?}
     */
    removeOptionFromList(option) {
        if (option.hasFocus) {
            /** @type {?} */
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
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        // tslint:disable-next-line: deprecation
        /** @type {?} */
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
        this.setSelectedOptionsByKey((/** @type {?} */ (this.keyManager.activeItem)), hasModifierKey(event, 'shiftKey'), hasModifierKey(event, 'ctrlKey'));
    }
    // Reports a value change to the ControlValueAccessor
    /**
     * @return {?}
     */
    reportValueChange() {
        if (this.options) {
            this.onChange(this.getSelectedOptionValues());
        }
    }
    // Emits a change event if the selected state of an option changed.
    /**
     * @param {?} option
     * @return {?}
     */
    emitChangeEvent(option) {
        this.selectionChange.emit(new McListSelectionChange(this, option));
    }
    /**
     * @protected
     * @return {?}
     */
    updateTabIndex() {
        this._tabIndex = this.options.length === 0 ? -1 : 0;
    }
    /**
     * @private
     * @return {?}
     */
    resetOptions() {
        this.dropSubscriptions();
        this.listenToOptionsFocus();
    }
    /**
     * @private
     * @return {?}
     */
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
    /**
     * @private
     * @return {?}
     */
    listenToOptionsFocus() {
        this.optionFocusSubscription = this.optionFocusChanges
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const index = this.options.toArray().indexOf(event.option);
            if (this.isValidIndex(index)) {
                this.keyManager.updateActiveItem(index);
            }
        }));
        this.optionBlurSubscription = this.optionBlurChanges
            .subscribe((/**
         * @return {?}
         */
        () => this.blur()));
    }
    /**
     * Checks whether any of the options is focused.
     * @private
     * @return {?}
     */
    hasFocusedOption() {
        return this.options.some((/**
         * @param {?} option
         * @return {?}
         */
        (option) => option.hasFocus));
    }
    // Returns the option with the specified value.
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    getOptionByValue(value) {
        return this.options.find((/**
         * @param {?} option
         * @return {?}
         */
        (option) => option.value === value));
    }
    // Sets the selected options based on the specified values.
    /**
     * @private
     * @param {?} values
     * @return {?}
     */
    setOptionsFromValues(values) {
        this.options.forEach((/**
         * @param {?} option
         * @return {?}
         */
        (option) => option.setSelected(false)));
        values
            .map((/**
         * @param {?} value
         * @return {?}
         */
        (value) => this.getOptionByValue(value)))
            .filter(Boolean)
            .forEach((/**
         * @param {?} option
         * @return {?}
         */
        (option) => (/** @type {?} */ (option)).setSelected(true)));
    }
    /**
     * Utility to ensure all indexes are valid.
     * @private
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of options.
     */
    isValidIndex(index) {
        return index >= 0 && index < this.options.length;
    }
    // Returns the index of the specified list option.
    /**
     * @private
     * @param {?} option
     * @return {?}
     */
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
                    '[attr.tabindex]': 'tabIndex',
                    class: 'mc-list-selection',
                    '(focus)': 'focus()',
                    '(blur)': 'blur()',
                    '(keydown)': 'onKeyDown($event)',
                    '(window:resize)': 'updateScrollSize()'
                },
                providers: [MC_SELECTION_LIST_VALUE_ACCESSOR],
                preserveWhitespaces: false,
                styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-list,.mc-list-selection{display:block;outline:0}.mc-list-item,.mc-list-option{display:block;height:28px;border:2px solid transparent}.mc-list-item .mc-list-item-content,.mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:100%;padding:0 15px}.mc-list-item.mc-2-line,.mc-list-option.mc-2-line{height:72px}.mc-list-item.mc-3-line,.mc-list-option.mc-3-line{height:88px}.mc-list-item.mc-multi-line,.mc-list-option.mc-multi-line{height:auto}.mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-bottom:16px}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;height:24px;border-radius:50%;padding:4px;font-size:24px}.mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:auto;margin-right:62px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider-inset,.mc-list-option .mc-divider.mc-divider-inset{position:absolute}.mc-list-item .mc-pseudo-checkbox,.mc-list-option .mc-pseudo-checkbox{margin-right:8px}.mc-list-option:not([disabled]):not(.mc-disabled){cursor:pointer}"]
            }] }
];
/** @nocollapse */
McListSelection.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
    { type: String, decorators: [{ type: Attribute, args: ['auto-select',] }] },
    { type: String, decorators: [{ type: Attribute, args: ['no-unselect',] }] },
    { type: String, decorators: [{ type: Attribute, args: ['multiple',] }] }
];
McListSelection.propDecorators = {
    options: [{ type: ContentChildren, args: [McListOption, { descendants: true },] }],
    horizontal: [{ type: Input }],
    tabIndex: [{ type: Input }],
    selectionChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    McListSelection.prototype.keyManager;
    /** @type {?} */
    McListSelection.prototype.options;
    /** @type {?} */
    McListSelection.prototype.autoSelect;
    /** @type {?} */
    McListSelection.prototype.noUnselect;
    /** @type {?} */
    McListSelection.prototype.multipleMode;
    /** @type {?} */
    McListSelection.prototype.horizontal;
    /**
     * @type {?}
     * @private
     */
    McListSelection.prototype._tabIndex;
    /** @type {?} */
    McListSelection.prototype.selectionChange;
    /** @type {?} */
    McListSelection.prototype.selectionModel;
    /**
     * @type {?}
     * @private
     */
    McListSelection.prototype.tempValues;
    /**
     * Emits whenever the component is destroyed.
     * @type {?}
     * @private
     */
    McListSelection.prototype.destroyed;
    /**
     * @type {?}
     * @private
     */
    McListSelection.prototype.optionFocusSubscription;
    /**
     * @type {?}
     * @private
     */
    McListSelection.prototype.optionBlurSubscription;
    /** @type {?} */
    McListSelection.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    McListSelection.prototype.onChange;
    /**
     * @type {?}
     * @private
     */
    McListSelection.prototype.element;
    /**
     * @type {?}
     * @private
     */
    McListSelection.prototype.changeDetectorRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-list,.mc-list-selection{display:block;outline:0}.mc-list-item,.mc-list-option{display:block;height:28px;border:2px solid transparent}.mc-list-item .mc-list-item-content,.mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:100%;padding:0 15px}.mc-list-item.mc-2-line,.mc-list-option.mc-2-line{height:72px}.mc-list-item.mc-3-line,.mc-list-option.mc-3-line{height:88px}.mc-list-item.mc-multi-line,.mc-list-option.mc-multi-line{height:auto}.mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-bottom:16px}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;height:24px;border-radius:50%;padding:4px;font-size:24px}.mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:auto;margin-right:62px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider-inset,.mc-list-option .mc-divider.mc-divider-inset{position:absolute}.mc-list-item .mc-pseudo-checkbox,.mc-list-option .mc-pseudo-checkbox{margin-right:8px}.mc-list-option:not([disabled]):not(.mc-disabled){cursor:pointer}"]
            }] }
];
// Boilerplate for applying mixins to McListItem.
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
        // tslint:disable-next-line:no-unused-expression
        new McLineSetter(this.lines, this._element);
    }
    /**
     * @return {?}
     */
    handleFocus() {
        this._element.nativeElement.classList.add('mc-focused');
    }
    /**
     * @return {?}
     */
    handleBlur() {
        this._element.nativeElement.classList.remove('mc-focused');
    }
    /**
     * @return {?}
     */
    getHostElement() {
        return this._element.nativeElement;
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
            }] }
];
/** @nocollapse */
McListItem.ctorParameters = () => [
    { type: ElementRef }
];
McListItem.propDecorators = {
    lines: [{ type: ContentChildren, args: [McLine,] }]
};
if (false) {
    /** @type {?} */
    McListItem.prototype.lines;
    /**
     * @type {?}
     * @private
     */
    McListItem.prototype._element;
}

/**
 * @fileoverview added by tsickle
 * Generated from: list.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ptsecurity-mosaic-list.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { MC_SELECTION_LIST_VALUE_ACCESSOR, McList, McListBase, McListItem, McListItemBase, McListModule, McListOption, McListSelection, McListSelectionBase, McListSelectionChange, McListSelectionMixinBase };
//# sourceMappingURL=ptsecurity-mosaic-list.js.map
