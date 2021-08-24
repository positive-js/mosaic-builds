/* tslint:disable:no-empty */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { Attribute, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Input, Output, QueryList, ViewEncapsulation, ChangeDetectorRef, Inject, ViewChild, NgZone, Optional } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { DOWN_ARROW, END, ENTER, hasModifierKey, HOME, PAGE_DOWN, PAGE_UP, SPACE, TAB, UP_ARROW } from '@ptsecurity/cdk/keycodes';
import { McLine, mixinDisabled, toBoolean, mixinTabIndex, MultipleMode, McOptgroup } from '@ptsecurity/mosaic/core';
import { merge, Subject } from 'rxjs';
import { startWith, take, takeUntil } from 'rxjs/operators';
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
export class McListSelectionBase {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
// tslint:disable-next-line:naming-convention
export const McListSelectionMixinBase = mixinTabIndex(mixinDisabled(McListSelectionBase));
export class McListSelection extends McListSelectionMixinBase {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zZWxlY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2xpc3QvbGlzdC1zZWxlY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDZCQUE2QjtBQUM3QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUVILFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLE1BQU0sRUFHTixTQUFTLEVBQ1QsTUFBTSxFQUNOLFFBQVEsRUFDWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBb0IsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RSxPQUFPLEVBQ0gsVUFBVSxFQUNWLEdBQUcsRUFDSCxLQUFLLEVBQ0wsY0FBYyxFQUNkLElBQUksRUFDSixTQUFTLEVBQ1QsT0FBTyxFQUNQLEtBQUssRUFDTCxHQUFHLEVBQ0gsUUFBUSxFQUNYLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUNILE1BQU0sRUFFTixhQUFhLEVBQ2IsU0FBUyxFQUdULGFBQWEsRUFFYixZQUFZLEVBQ1osVUFBVSxFQUNiLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLEtBQUssRUFBYyxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBUTVE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RSxtQkFBbUI7b0JBRTFCLGlCQUFpQixFQUFFLFVBQVU7b0JBQzdCLGlCQUFpQixFQUFFLGtCQUFrQjtvQkFFckMsU0FBUyxFQUFFLFNBQVM7b0JBQ3BCLFFBQVEsRUFBRSxRQUFRO29CQUNsQixXQUFXLEVBQUUsbUJBQW1CO29CQUNoQyxpQkFBaUIsRUFBRSxvQkFBb0I7aUJBQzFDO2dCQUNELFNBQVMsRUFBRSxDQUFDLGdDQUFnQyxDQUFDO2dCQUM3QyxtQkFBbUIsRUFBRSxLQUFLOzthQUM3Qjs7OztZQXZURyxVQUFVO1lBT1YsaUJBQWlCO1lBK0JqQixZQUFZLHVCQW1XUCxTQUFTLFNBQUMsVUFBVTs7O3NCQTVFeEIsZUFBZSxTQUFDLFlBQVksRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7eUJBRW5ELEtBQUs7NkJBV0wsS0FBSzt5QkFpQkwsS0FBSzt1QkFFTCxLQUFLOzhCQW1CTCxNQUFNOzBCQWdETixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGU6bm8tZW1wdHkgKi9cbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQXR0cmlidXRlLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIEluamVjdCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBOZ1pvbmUsXG4gICAgT3B0aW9uYWxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb2N1c0tleU1hbmFnZXIsIElGb2N1c2FibGVPcHRpb24gfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIERPV05fQVJST1csXG4gICAgRU5ELFxuICAgIEVOVEVSLFxuICAgIGhhc01vZGlmaWVyS2V5LFxuICAgIEhPTUUsXG4gICAgUEFHRV9ET1dOLFxuICAgIFBBR0VfVVAsXG4gICAgU1BBQ0UsXG4gICAgVEFCLFxuICAgIFVQX0FSUk9XXG59IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICAgIE1jTGluZSxcbiAgICBDYW5EaXNhYmxlLFxuICAgIG1peGluRGlzYWJsZWQsXG4gICAgdG9Cb29sZWFuLFxuICAgIENhbkRpc2FibGVDdG9yLFxuICAgIEhhc1RhYkluZGV4Q3RvcixcbiAgICBtaXhpblRhYkluZGV4LFxuICAgIEhhc1RhYkluZGV4LFxuICAgIE11bHRpcGxlTW9kZSxcbiAgICBNY09wdGdyb3VwXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCwgdGFrZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBNY09wdGlvbkV2ZW50IHtcbiAgICBvcHRpb246IE1jTGlzdE9wdGlvbjtcbn1cblxuLyoqXG4gKiBDb21wb25lbnQgZm9yIGxpc3Qtb3B0aW9ucyBvZiBzZWxlY3Rpb24tbGlzdC4gRWFjaCBsaXN0LW9wdGlvbiBjYW4gYXV0b21hdGljYWxseVxuICogZ2VuZXJhdGUgYSBjaGVja2JveCBhbmQgY2FuIHB1dCBjdXJyZW50IGl0ZW0gaW50byB0aGUgc2VsZWN0aW9uTW9kZWwgb2Ygc2VsZWN0aW9uLWxpc3RcbiAqIGlmIHRoZSBjdXJyZW50IGl0ZW0gaXMgc2VsZWN0ZWQuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIGV4cG9ydEFzOiAnbWNMaXN0T3B0aW9uJyxcbiAgICBzZWxlY3RvcjogJ21jLWxpc3Qtb3B0aW9uJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbGlzdC1vcHRpb24gbWMtbm8tc2VsZWN0JyxcbiAgICAgICAgJ1tjbGFzcy5tYy1zZWxlY3RlZF0nOiAnc2VsZWN0ZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWZvY3VzZWRdJzogJ2hhc0ZvY3VzJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuXG4gICAgICAgICcoZm9jdXMpJzogJ2ZvY3VzKCknLFxuICAgICAgICAnKGJsdXIpJzogJ2JsdXIoKScsXG4gICAgICAgICcoY2xpY2spJzogJ2hhbmRsZUNsaWNrKCRldmVudCknXG4gICAgfSxcbiAgICB0ZW1wbGF0ZVVybDogJ2xpc3Qtb3B0aW9uLmh0bWwnLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWNMaXN0T3B0aW9uIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQsIElGb2N1c2FibGVPcHRpb24ge1xuICAgIGhhc0ZvY3VzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICByZWFkb25seSBvbkZvY3VzID0gbmV3IFN1YmplY3Q8TWNPcHRpb25FdmVudD4oKTtcblxuICAgIHJlYWRvbmx5IG9uQmx1ciA9IG5ldyBTdWJqZWN0PE1jT3B0aW9uRXZlbnQ+KCk7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKE1jTGluZSkgbGluZXM6IFF1ZXJ5TGlzdDxNY0xpbmU+O1xuXG4gICAgQFZpZXdDaGlsZCgndGV4dCcsIHsgc3RhdGljOiBmYWxzZSB9KSB0ZXh0OiBFbGVtZW50UmVmO1xuXG4gICAgLy8gV2hldGhlciB0aGUgbGFiZWwgc2hvdWxkIGFwcGVhciBiZWZvcmUgb3IgYWZ0ZXIgdGhlIGNoZWNrYm94LiBEZWZhdWx0cyB0byAnYWZ0ZXInXG4gICAgQElucHV0KCkgY2hlY2tib3hQb3NpdGlvbjogJ2JlZm9yZScgfCAnYWZ0ZXInO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBzZXQgdG8gdHJ1ZSBhZnRlciB0aGUgZmlyc3QgT25DaGFuZ2VzIGN5Y2xlIHNvIHdlIGRvbid0IGNsZWFyIHRoZSB2YWx1ZSBvZiBgc2VsZWN0ZWRgXG4gICAgICogaW4gdGhlIGZpcnN0IGN5Y2xlLlxuICAgICAqL1xuICAgIHByaXZhdGUgaW5wdXRzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHZhbHVlKCk6IGFueSB7IHJldHVybiB0aGlzLl92YWx1ZTsgfVxuICAgIHNldCB2YWx1ZShuZXdWYWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkICYmIG5ld1ZhbHVlICE9PSB0aGlzLnZhbHVlICYmIHRoaXMuaW5wdXRzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgfVxuICAgIHByaXZhdGUgX3ZhbHVlOiBhbnk7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpIHtcbiAgICAgICAgY29uc3QgbGlzdFNlbGVjdGlvbkRpc2FibGVkID0gdGhpcy5saXN0U2VsZWN0aW9uICYmIHRoaXMubGlzdFNlbGVjdGlvbi5kaXNhYmxlZDtcbiAgICAgICAgY29uc3QgZ3JvdXBEaXNhYmxlZCA9IHRoaXMuZ3JvdXAgJiYgdGhpcy5ncm91cC5kaXNhYmxlZDtcblxuICAgICAgICByZXR1cm4gbGlzdFNlbGVjdGlvbkRpc2FibGVkIHx8IGdyb3VwRGlzYWJsZWQgfHwgdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0b0Jvb2xlYW4odmFsdWUpO1xuXG4gICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gbmV3VmFsdWU7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNob3dDaGVja2JveCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3dDaGVja2JveCAhPT0gdW5kZWZpbmVkID8gdGhpcy5fc2hvd0NoZWNrYm94IDogdGhpcy5saXN0U2VsZWN0aW9uLnNob3dDaGVja2JveDtcbiAgICB9XG5cbiAgICBzZXQgc2hvd0NoZWNrYm94KHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fc2hvd0NoZWNrYm94ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zaG93Q2hlY2tib3g6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdFNlbGVjdGlvbi5zZWxlY3Rpb25Nb2RlbCAmJiB0aGlzLmxpc3RTZWxlY3Rpb24uc2VsZWN0aW9uTW9kZWwuaXNTZWxlY3RlZCh0aGlzKSB8fCBmYWxzZTtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHRvQm9vbGVhbih2YWx1ZSk7XG5cbiAgICAgICAgaWYgKGlzU2VsZWN0ZWQgIT09IHRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkKGlzU2VsZWN0ZWQpO1xuXG4gICAgICAgICAgICB0aGlzLmxpc3RTZWxlY3Rpb24ucmVwb3J0VmFsdWVDaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3NlbGVjdGVkID0gZmFsc2U7XG5cbiAgICBnZXQgdGFiSW5kZXgoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPyBudWxsIDogLTE7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTWNMaXN0U2VsZWN0aW9uKSkgcHVibGljIGxpc3RTZWxlY3Rpb246IE1jTGlzdFNlbGVjdGlvbixcbiAgICAgICAgQE9wdGlvbmFsKCkgcmVhZG9ubHkgZ3JvdXA6IE1jT3B0Z3JvdXBcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMubGlzdFNlbGVjdGlvbjtcblxuICAgICAgICBpZiAobGlzdC5fdmFsdWUgJiYgbGlzdC5fdmFsdWUuc29tZSgodmFsdWUpID0+IGxpc3QuY29tcGFyZVdpdGgodmFsdWUsIHRoaXMuX3ZhbHVlKSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWQodHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB3YXNTZWxlY3RlZCA9IHRoaXMuX3NlbGVjdGVkO1xuXG4gICAgICAgIC8vIExpc3Qgb3B0aW9ucyB0aGF0IGFyZSBzZWxlY3RlZCBhdCBpbml0aWFsaXphdGlvbiBjYW4ndCBiZSByZXBvcnRlZCBwcm9wZXJseSB0byB0aGUgZm9ybVxuICAgICAgICAvLyBjb250cm9sLiBUaGlzIGlzIGJlY2F1c2UgaXQgdGFrZXMgc29tZSB0aW1lIHVudGlsIHRoZSBzZWxlY3Rpb24tbGlzdCBrbm93cyBhYm91dCBhbGxcbiAgICAgICAgLy8gYXZhaWxhYmxlIG9wdGlvbnMuIEFsc28gaXQgY2FuIGhhcHBlbiB0aGF0IHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvciBoYXMgYW4gaW5pdGlhbCB2YWx1ZVxuICAgICAgICAvLyB0aGF0IHNob3VsZCBiZSB1c2VkIGluc3RlYWQuIERlZmVycmluZyB0aGUgdmFsdWUgY2hhbmdlIHJlcG9ydCB0byB0aGUgbmV4dCB0aWNrIGVuc3VyZXNcbiAgICAgICAgLy8gdGhhdCB0aGUgZm9ybSBjb250cm9sIHZhbHVlIGlzIG5vdCBiZWluZyBvdmVyd3JpdHRlbi5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWQgfHwgd2FzU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmlucHV0c0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gZGVsYXkgdGhpcyB1bnRpbCB0aGUgbmV4dCB0aWNrIGluIG9yZGVyXG4gICAgICAgICAgICAvLyB0byBhdm9pZCBjaGFuZ2VkIGFmdGVyIGNoZWNrZWQgZXJyb3JzLlxuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB0aGlzLnNlbGVjdGVkID0gZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5saXN0U2VsZWN0aW9uLnJlbW92ZU9wdGlvbkZyb21MaXN0KHRoaXMpO1xuICAgIH1cblxuICAgIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICF0aGlzLnNlbGVjdGVkO1xuICAgIH1cblxuICAgIGdldExhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0ID8gdGhpcy50ZXh0Lm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQgOiAnJztcbiAgICB9XG5cbiAgICBzZXRTZWxlY3RlZChzZWxlY3RlZDogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWQgPT09IHNlbGVjdGVkIHx8ICF0aGlzLmxpc3RTZWxlY3Rpb24uc2VsZWN0aW9uTW9kZWwpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSBzZWxlY3RlZDtcblxuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdFNlbGVjdGlvbi5zZWxlY3Rpb25Nb2RlbC5zZWxlY3QodGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RTZWxlY3Rpb24uc2VsZWN0aW9uTW9kZWwuZGVzZWxlY3QodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGdldEhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Q2xpZW50UmVjdHMoKVswXS5oZWlnaHQ7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soJGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMubGlzdFNlbGVjdGlvbi5zZXRTZWxlY3RlZE9wdGlvbnNCeUNsaWNrKFxuICAgICAgICAgICAgdGhpcywgaGFzTW9kaWZpZXJLZXkoJGV2ZW50LCAnc2hpZnRLZXknKSwgaGFzTW9kaWZpZXJLZXkoJGV2ZW50LCAnY3RybEtleScpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNGb2N1cykge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgICAgICAgdGhpcy5vbkZvY3VzLm5leHQoeyBvcHRpb246IHRoaXMgfSk7XG5cbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFzRm9jdXMgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmx1cigpOiB2b2lkIHtcbiAgICAgICAgLy8gV2hlbiBhbmltYXRpb25zIGFyZSBlbmFibGVkLCBBbmd1bGFyIG1heSBlbmQgdXAgcmVtb3ZpbmcgdGhlIG9wdGlvbiBmcm9tIHRoZSBET00gYSBsaXR0bGVcbiAgICAgICAgLy8gZWFybGllciB0aGFuIHVzdWFsLCBjYXVzaW5nIGl0IHRvIGJlIGJsdXJyZWQgYW5kIHRocm93aW5nIG9mZiB0aGUgbG9naWMgaW4gdGhlIGxpc3RcbiAgICAgICAgLy8gdGhhdCBtb3ZlcyBmb2N1cyBub3QgdGhlIG5leHQgaXRlbS4gVG8gd29yayBhcm91bmQgdGhlIGlzc3VlLCB3ZSBkZWZlciBtYXJraW5nIHRoZSBvcHRpb25cbiAgICAgICAgLy8gYXMgbm90IGZvY3VzZWQgdW50aWwgdGhlIG5leHQgdGltZSB0aGUgem9uZSBzdGFiaWxpemVzLlxuICAgICAgICB0aGlzLm5nWm9uZS5vblN0YWJsZVxuICAgICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNGb2N1cyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25CbHVyLm5leHQoeyBvcHRpb246IHRoaXMgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRIb3N0RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNvbnN0IE1DX1NFTEVDVElPTl9MSVNUX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWNMaXN0U2VsZWN0aW9uKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuZXhwb3J0IGNsYXNzIE1jTGlzdFNlbGVjdGlvbkNoYW5nZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZTogTWNMaXN0U2VsZWN0aW9uLCBwdWJsaWMgb3B0aW9uOiBNY0xpc3RPcHRpb24pIHt9XG59XG5cblxuZXhwb3J0IGNsYXNzIE1jTGlzdFNlbGVjdGlvbkJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY0xpc3RTZWxlY3Rpb25NaXhpbkJhc2U6IENhbkRpc2FibGVDdG9yICYgSGFzVGFiSW5kZXhDdG9yICYgdHlwZW9mIE1jTGlzdFNlbGVjdGlvbkJhc2VcbiAgICA9IG1peGluVGFiSW5kZXgobWl4aW5EaXNhYmxlZChNY0xpc3RTZWxlY3Rpb25CYXNlKSk7XG5cbkBDb21wb25lbnQoe1xuICAgIGV4cG9ydEFzOiAnbWNMaXN0U2VsZWN0aW9uJyxcbiAgICBzZWxlY3RvcjogJ21jLWxpc3Qtc2VsZWN0aW9uJyxcbiAgICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAgIHN0eWxlVXJsczogWycuL2xpc3Quc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaW5wdXRzOiBbJ2Rpc2FibGVkJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWxpc3Qtc2VsZWN0aW9uJyxcblxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcblxuICAgICAgICAnKGZvY3VzKSc6ICdmb2N1cygpJyxcbiAgICAgICAgJyhibHVyKSc6ICdibHVyKCknLFxuICAgICAgICAnKGtleWRvd24pJzogJ29uS2V5RG93bigkZXZlbnQpJyxcbiAgICAgICAgJyh3aW5kb3c6cmVzaXplKSc6ICd1cGRhdGVTY3JvbGxTaXplKCknXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtNQ19TRUxFQ1RJT05fTElTVF9WQUxVRV9BQ0NFU1NPUl0sXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgTWNMaXN0U2VsZWN0aW9uIGV4dGVuZHMgTWNMaXN0U2VsZWN0aW9uTWl4aW5CYXNlIGltcGxlbWVudHMgQ2FuRGlzYWJsZSwgSGFzVGFiSW5kZXgsIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAga2V5TWFuYWdlcjogRm9jdXNLZXlNYW5hZ2VyPE1jTGlzdE9wdGlvbj47XG5cbiAgICBAQ29udGVudENoaWxkcmVuKE1jTGlzdE9wdGlvbiwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBvcHRpb25zOiBRdWVyeUxpc3Q8TWNMaXN0T3B0aW9uPjtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGF1dG9TZWxlY3QoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRvU2VsZWN0O1xuICAgIH1cblxuICAgIHNldCBhdXRvU2VsZWN0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2F1dG9TZWxlY3QgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2F1dG9TZWxlY3Q6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbm9VbnNlbGVjdExhc3QoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ub1Vuc2VsZWN0TGFzdDtcbiAgICB9XG5cbiAgICBzZXQgbm9VbnNlbGVjdExhc3QodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fbm9VbnNlbGVjdExhc3QgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX25vVW5zZWxlY3RMYXN0OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIG11bHRpcGxlTW9kZTogTXVsdGlwbGVNb2RlIHwgbnVsbDtcblxuICAgIGdldCBtdWx0aXBsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5tdWx0aXBsZU1vZGU7XG4gICAgfVxuXG4gICAgQElucHV0KCkgaG9yaXpvbnRhbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgdGFiSW5kZXgoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPyAtMSA6IHRoaXMuX3RhYkluZGV4O1xuICAgIH1cblxuICAgIHNldCB0YWJJbmRleCh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMudXNlclRhYkluZGV4ID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX3RhYkluZGV4ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdGFiSW5kZXggPSAwO1xuXG4gICAgdXNlclRhYkluZGV4OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAgIGdldCBzaG93Q2hlY2tib3goKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlTW9kZSA9PT0gTXVsdGlwbGVNb2RlLkNIRUNLQk9YO1xuICAgIH1cblxuICAgIC8vIEVtaXRzIGEgY2hhbmdlIGV2ZW50IHdoZW5ldmVyIHRoZSBzZWxlY3RlZCBzdGF0ZSBvZiBhbiBvcHRpb24gY2hhbmdlcy5cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TWNMaXN0U2VsZWN0aW9uQ2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWNMaXN0U2VsZWN0aW9uQ2hhbmdlPigpO1xuXG4gICAgc2VsZWN0aW9uTW9kZWw6IFNlbGVjdGlvbk1vZGVsPE1jTGlzdE9wdGlvbj47XG5cbiAgICBnZXQgb3B0aW9uRm9jdXNDaGFuZ2VzKCk6IE9ic2VydmFibGU8TWNPcHRpb25FdmVudD4ge1xuICAgICAgICByZXR1cm4gbWVyZ2UoLi4udGhpcy5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiBvcHRpb24ub25Gb2N1cykpO1xuICAgIH1cblxuICAgIGdldCBvcHRpb25CbHVyQ2hhbmdlcygpOiBPYnNlcnZhYmxlPE1jT3B0aW9uRXZlbnQ+IHtcbiAgICAgICAgcmV0dXJuIG1lcmdlKC4uLnRoaXMub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gb3B0aW9uLm9uQmx1cikpO1xuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpvcnRob2RveC1nZXR0ZXItYW5kLXNldHRlciBuYW1pbmctY29udmVudGlvblxuICAgIF92YWx1ZTogc3RyaW5nW10gfCBudWxsO1xuXG4gICAgLyoqIEVtaXRzIHdoZW5ldmVyIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkLiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIHByaXZhdGUgb3B0aW9uRm9jdXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGw7XG5cbiAgICBwcml2YXRlIG9wdGlvbkJsdXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIEBBdHRyaWJ1dGUoJ211bHRpcGxlJykgbXVsdGlwbGU6IE11bHRpcGxlTW9kZVxuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgICAgICBpZiAobXVsdGlwbGUgPT09IE11bHRpcGxlTW9kZS5DSEVDS0JPWCB8fCBtdWx0aXBsZSA9PT0gTXVsdGlwbGVNb2RlLktFWUJPQVJEKSB7XG4gICAgICAgICAgICB0aGlzLm11bHRpcGxlTW9kZSA9IG11bHRpcGxlO1xuICAgICAgICB9IGVsc2UgaWYgKG11bHRpcGxlICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm11bHRpcGxlTW9kZSA9IE11bHRpcGxlTW9kZS5DSEVDS0JPWDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlTW9kZSA9PT0gTXVsdGlwbGVNb2RlLkNIRUNLQk9YKSB7XG4gICAgICAgICAgICB0aGlzLmF1dG9TZWxlY3QgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubm9VbnNlbGVjdExhc3QgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwgPSBuZXcgU2VsZWN0aW9uTW9kZWw8TWNMaXN0T3B0aW9uPih0aGlzLm11bHRpcGxlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB1c2VkIGZvciBjb21wYXJpbmcgYW4gb3B0aW9uIGFnYWluc3QgdGhlIHNlbGVjdGVkIHZhbHVlIHdoZW4gZGV0ZXJtaW5pbmcgd2hpY2hcbiAgICAgKiBvcHRpb25zIHNob3VsZCBhcHBlYXIgYXMgc2VsZWN0ZWQuIFRoZSBmaXJzdCBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgYW4gb3B0aW9ucy4gVGhlIHNlY29uZFxuICAgICAqIG9uZSBpcyBhIHZhbHVlIGZyb20gdGhlIHNlbGVjdGVkIHZhbHVlLiBBIGJvb2xlYW4gbXVzdCBiZSByZXR1cm5lZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBjb21wYXJlV2l0aDogKG8xOiBhbnksIG8yOiBhbnkpID0+IGJvb2xlYW4gPSAoYTEsIGEyKSA9PiBhMSA9PT0gYTI7XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaG9yaXpvbnRhbCA9IHRvQm9vbGVhbih0aGlzLmhvcml6b250YWwpO1xuXG4gICAgICAgIHRoaXMua2V5TWFuYWdlciA9IG5ldyBGb2N1c0tleU1hbmFnZXI8TWNMaXN0T3B0aW9uPih0aGlzLm9wdGlvbnMpXG4gICAgICAgICAgICAud2l0aFR5cGVBaGVhZCgpXG4gICAgICAgICAgICAud2l0aFZlcnRpY2FsT3JpZW50YXRpb24oIXRoaXMuaG9yaXpvbnRhbClcbiAgICAgICAgICAgIC53aXRoSG9yaXpvbnRhbE9yaWVudGF0aW9uKHRoaXMuaG9yaXpvbnRhbCA/ICdsdHInIDogbnVsbCk7XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnRhYk91dFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RhYkluZGV4ID0gLTE7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGFiSW5kZXggPSB0aGlzLnVzZXJUYWJJbmRleCB8fCAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbnNGcm9tVmFsdWVzKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuY2hhbmdlZFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGV2ZW50LmFkZGVkKSB7IGl0ZW0uc2VsZWN0ZWQgPSB0cnVlOyB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgZXZlbnQucmVtb3ZlZCkgeyBpdGVtLnNlbGVjdGVkID0gZmFsc2U7IH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub3B0aW9ucy5jaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShzdGFydFdpdGgobnVsbCksIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0T3B0aW9ucygpO1xuXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHdlIG5lZWQgdG8gdXBkYXRlIG91ciB0YWIgaW5kZXhcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRhYkluZGV4KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVNjcm9sbFNpemUoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQubmV4dCgpO1xuXG4gICAgICAgIHRoaXMuZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICB9XG5cbiAgICBibHVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuaGFzRm9jdXNlZE9wdGlvbigpKSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbSgtMSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHNlbGVjdEFsbCgpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uLnNldFNlbGVjdGVkKHRydWUpKTtcblxuICAgICAgICB0aGlzLnJlcG9ydFZhbHVlQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgZGVzZWxlY3RBbGwoKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IG9wdGlvbi5zZXRTZWxlY3RlZChmYWxzZSkpO1xuXG4gICAgICAgIHRoaXMucmVwb3J0VmFsdWVDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVTY3JvbGxTaXplKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5ob3Jpem9udGFsIHx8ICF0aGlzLm9wdGlvbnMuZmlyc3QpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLndpdGhTY3JvbGxTaXplKE1hdGguZmxvb3IodGhpcy5nZXRIZWlnaHQoKSAvIHRoaXMub3B0aW9ucy5maXJzdC5nZXRIZWlnaHQoKSkpO1xuICAgIH1cblxuICAgIHNldFNlbGVjdGVkT3B0aW9uc0J5Q2xpY2sob3B0aW9uOiBNY0xpc3RPcHRpb24sIHNoaWZ0S2V5OiBib29sZWFuLCBjdHJsS2V5OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChzaGlmdEtleSAmJiB0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkT3B0aW9ucyhvcHRpb24pO1xuICAgICAgICB9IGVsc2UgaWYgKGN0cmxLZXkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5jYW5EZXNlbGVjdExhc3Qob3B0aW9uKSkgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC50b2dnbGUob3B0aW9uKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmF1dG9TZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwudG9nZ2xlKG9wdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnRvZ2dsZShvcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbWl0Q2hhbmdlRXZlbnQob3B0aW9uKTtcbiAgICAgICAgdGhpcy5yZXBvcnRWYWx1ZUNoYW5nZSgpO1xuICAgIH1cblxuICAgIHNldFNlbGVjdGVkT3B0aW9uc0J5S2V5KG9wdGlvbjogTWNMaXN0T3B0aW9uLCBzaGlmdEtleTogYm9vbGVhbiwgY3RybEtleTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoc2hpZnRLZXkgJiYgdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3RlZE9wdGlvbnMob3B0aW9uKTtcbiAgICAgICAgfSBlbHNlIGlmIChjdHJsS2V5KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuY2FuRGVzZWxlY3RMYXN0KG9wdGlvbikpIHsgcmV0dXJuOyB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tdWx0aXBsZU1vZGUgPT09IE11bHRpcGxlTW9kZS5LRVlCT0FSRCB8fCAhdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLnNldFNlbGVjdGVkKGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgb3B0aW9uLnNldFNlbGVjdGVkKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbWl0Q2hhbmdlRXZlbnQob3B0aW9uKTtcbiAgICAgICAgdGhpcy5yZXBvcnRWYWx1ZUNoYW5nZSgpO1xuICAgIH1cblxuICAgIHNldFNlbGVjdGVkT3B0aW9ucyhvcHRpb246IE1jTGlzdE9wdGlvbik6IHZvaWQge1xuICAgICAgICBjb25zdCBzZWxlY3RlZE9wdGlvblN0YXRlID0gb3B0aW9uLnNlbGVjdGVkO1xuXG4gICAgICAgIGxldCBmcm9tSW5kZXggPSB0aGlzLmtleU1hbmFnZXIucHJldmlvdXNBY3RpdmVJdGVtSW5kZXg7XG4gICAgICAgIGxldCB0b0luZGV4ID0gdGhpcy5rZXlNYW5hZ2VyLnByZXZpb3VzQWN0aXZlSXRlbUluZGV4ID0gdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleDtcblxuICAgICAgICBpZiAodG9JbmRleCA9PT0gZnJvbUluZGV4KSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmIChmcm9tSW5kZXggPiB0b0luZGV4KSB7XG4gICAgICAgICAgICBbZnJvbUluZGV4LCB0b0luZGV4XSA9IFt0b0luZGV4LCBmcm9tSW5kZXhdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vcHRpb25zXG4gICAgICAgICAgICAudG9BcnJheSgpXG4gICAgICAgICAgICAuc2xpY2UoZnJvbUluZGV4LCB0b0luZGV4ICsgMSlcbiAgICAgICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+ICFpdGVtLmRpc2FibGVkKVxuICAgICAgICAgICAgLmZvckVhY2goKHJlbmRlcmVkT3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNMYXN0UmVuZGVyZWRPcHRpb24gPSByZW5kZXJlZE9wdGlvbiA9PT0gdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW07XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNMYXN0UmVuZGVyZWRPcHRpb24gJiYgcmVuZGVyZWRPcHRpb24uc2VsZWN0ZWQgJiYgdGhpcy5ub1Vuc2VsZWN0TGFzdCkgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgICAgIHJlbmRlcmVkT3B0aW9uLnNldFNlbGVjdGVkKCFzZWxlY3RlZE9wdGlvblN0YXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZXM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWVzO1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uc0Zyb21WYWx1ZXModmFsdWVzIHx8IFtdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBhIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IG9wdGlvbi5kaXNhYmxlZCA9IGlzRGlzYWJsZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWRPcHRpb25WYWx1ZXMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmZpbHRlcigob3B0aW9uKSA9PiBvcHRpb24uc2VsZWN0ZWQpLm1hcCgob3B0aW9uKSA9PiBvcHRpb24udmFsdWUpO1xuICAgIH1cblxuICAgIC8vIFRvZ2dsZXMgdGhlIHNlbGVjdGVkIHN0YXRlIG9mIHRoZSBjdXJyZW50bHkgZm9jdXNlZCBvcHRpb24uXG4gICAgdG9nZ2xlRm9jdXNlZE9wdGlvbigpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZm9jdXNlZEluZGV4ID0gdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleDtcblxuICAgICAgICBpZiAoZm9jdXNlZEluZGV4ICE9IG51bGwgJiYgdGhpcy5pc1ZhbGlkSW5kZXgoZm9jdXNlZEluZGV4KSkge1xuICAgICAgICAgICAgY29uc3QgZm9jdXNlZE9wdGlvbjogTWNMaXN0T3B0aW9uID0gdGhpcy5vcHRpb25zLnRvQXJyYXkoKVtmb2N1c2VkSW5kZXhdO1xuXG4gICAgICAgICAgICBpZiAoZm9jdXNlZE9wdGlvbiAmJiB0aGlzLmNhbkRlc2VsZWN0TGFzdChmb2N1c2VkT3B0aW9uKSkge1xuICAgICAgICAgICAgICAgIGZvY3VzZWRPcHRpb24udG9nZ2xlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBFbWl0IGEgY2hhbmdlIGV2ZW50IGJlY2F1c2UgdGhlIGZvY3VzZWQgb3B0aW9uIGNoYW5nZWQgaXRzIHN0YXRlIHRocm91Z2ggdXNlciBpbnRlcmFjdGlvbi5cbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRDaGFuZ2VFdmVudChmb2N1c2VkT3B0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbkRlc2VsZWN0TGFzdChsaXN0T3B0aW9uOiBNY0xpc3RPcHRpb24pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEodGhpcy5ub1Vuc2VsZWN0TGFzdCAmJiB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdGVkLmxlbmd0aCA9PT0gMSAmJiBsaXN0T3B0aW9uLnNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICBnZXRIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldENsaWVudFJlY3RzKClbMF0uaGVpZ2h0O1xuICAgIH1cblxuICAgIC8vIFZpZXcgdG8gbW9kZWwgY2FsbGJhY2sgdGhhdCBzaG91bGQgYmUgY2FsbGVkIGlmIHRoZSBsaXN0IG9yIGl0cyBvcHRpb25zIGxvc3QgZm9jdXMuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5XG4gICAgb25Ub3VjaGVkOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgICAvLyBSZW1vdmVzIGFuIG9wdGlvbiBmcm9tIHRoZSBzZWxlY3Rpb24gbGlzdCBhbmQgdXBkYXRlcyB0aGUgYWN0aXZlIGl0ZW0uXG4gICAgcmVtb3ZlT3B0aW9uRnJvbUxpc3Qob3B0aW9uOiBNY0xpc3RPcHRpb24pIHtcbiAgICAgICAgaWYgKG9wdGlvbi5oYXNGb2N1cykge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uSW5kZXggPSB0aGlzLmdldE9wdGlvbkluZGV4KG9wdGlvbik7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlIG9wdGlvbiBpcyB0aGUgbGFzdCBpdGVtXG4gICAgICAgICAgICBpZiAob3B0aW9uSW5kZXggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldFByZXZpb3VzSXRlbUFjdGl2ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb25JbmRleCA9PT0gMCAmJiB0aGlzLm9wdGlvbnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXROZXh0SXRlbUFjdGl2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG5cbiAgICAgICAgc3dpdGNoIChrZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIFNQQUNFOlxuICAgICAgICAgICAgY2FzZSBFTlRFUjpcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUZvY3VzZWRPcHRpb24oKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFRBQjpcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIudGFiT3V0Lm5leHQoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXROZXh0SXRlbUFjdGl2ZSgpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFVQX0FSUk9XOlxuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRQcmV2aW91c0l0ZW1BY3RpdmUoKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBIT01FOlxuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFTkQ6XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldExhc3RJdGVtQWN0aXZlKCk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUEFHRV9VUDpcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0UHJldmlvdXNQYWdlSXRlbUFjdGl2ZSgpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBBR0VfRE9XTjpcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0TmV4dFBhZ2VJdGVtQWN0aXZlKCk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLnNldFNlbGVjdGVkT3B0aW9uc0J5S2V5KFxuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0gYXMgTWNMaXN0T3B0aW9uLFxuICAgICAgICAgICAgaGFzTW9kaWZpZXJLZXkoZXZlbnQsICdzaGlmdEtleScpLFxuICAgICAgICAgICAgaGFzTW9kaWZpZXJLZXkoZXZlbnQsICdjdHJsS2V5JylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZXBvcnRzIGEgdmFsdWUgY2hhbmdlIHRvIHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvclxuICAgIHJlcG9ydFZhbHVlQ2hhbmdlKCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0U2VsZWN0ZWRPcHRpb25WYWx1ZXMoKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEVtaXRzIGEgY2hhbmdlIGV2ZW50IGlmIHRoZSBzZWxlY3RlZCBzdGF0ZSBvZiBhbiBvcHRpb24gY2hhbmdlZC5cbiAgICBlbWl0Q2hhbmdlRXZlbnQob3B0aW9uOiBNY0xpc3RPcHRpb24pIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChuZXcgTWNMaXN0U2VsZWN0aW9uQ2hhbmdlKHRoaXMsIG9wdGlvbikpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVUYWJJbmRleCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdGFiSW5kZXggPSB0aGlzLnVzZXJUYWJJbmRleCB8fCAodGhpcy5vcHRpb25zLmxlbmd0aCA9PT0gMCA/IC0xIDogMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNldE9wdGlvbnMoKSB7XG4gICAgICAgIHRoaXMuZHJvcFN1YnNjcmlwdGlvbnMoKTtcbiAgICAgICAgdGhpcy5saXN0ZW5Ub09wdGlvbnNGb2N1cygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJvcFN1YnNjcmlwdGlvbnMoKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbkZvY3VzU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbkZvY3VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbkZvY3VzU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbkJsdXJTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uQmx1clN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25CbHVyU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbGlzdGVuVG9PcHRpb25zRm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3B0aW9uRm9jdXNTdWJzY3JpcHRpb24gPSB0aGlzLm9wdGlvbkZvY3VzQ2hhbmdlc1xuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleDogbnVtYmVyID0gdGhpcy5vcHRpb25zLnRvQXJyYXkoKS5pbmRleE9mKGV2ZW50Lm9wdGlvbik7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkSW5kZXgoaW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci51cGRhdGVBY3RpdmVJdGVtKGluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm9wdGlvbkJsdXJTdWJzY3JpcHRpb24gPSB0aGlzLm9wdGlvbkJsdXJDaGFuZ2VzXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuYmx1cigpKTtcbiAgICB9XG5cbiAgICAvKiogQ2hlY2tzIHdoZXRoZXIgYW55IG9mIHRoZSBvcHRpb25zIGlzIGZvY3VzZWQuICovXG4gICAgcHJpdmF0ZSBoYXNGb2N1c2VkT3B0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNvbWUoKG9wdGlvbikgPT4gb3B0aW9uLmhhc0ZvY3VzKTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5zIHRoZSBvcHRpb24gd2l0aCB0aGUgc3BlY2lmaWVkIHZhbHVlLlxuICAgIHByaXZhdGUgZ2V0T3B0aW9uQnlWYWx1ZSh2YWx1ZTogc3RyaW5nKTogTWNMaXN0T3B0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5maW5kKChvcHRpb24pID0+IG9wdGlvbi52YWx1ZSA9PT0gdmFsdWUpO1xuICAgIH1cblxuICAgIC8vIFNldHMgdGhlIHNlbGVjdGVkIG9wdGlvbnMgYmFzZWQgb24gdGhlIHNwZWNpZmllZCB2YWx1ZXMuXG4gICAgcHJpdmF0ZSBzZXRPcHRpb25zRnJvbVZhbHVlcyh2YWx1ZXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IG9wdGlvbi5zZXRTZWxlY3RlZChmYWxzZSkpO1xuXG4gICAgICAgIHZhbHVlc1xuICAgICAgICAgICAgLm1hcCgodmFsdWUpID0+IHRoaXMuZ2V0T3B0aW9uQnlWYWx1ZSh2YWx1ZSkpXG4gICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAuZm9yRWFjaCgob3B0aW9uKSA9PiBvcHRpb24hLnNldFNlbGVjdGVkKHRydWUpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVdGlsaXR5IHRvIGVuc3VyZSBhbGwgaW5kZXhlcyBhcmUgdmFsaWQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCB0byBiZSBjaGVja2VkLlxuICAgICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGluZGV4IGlzIHZhbGlkIGZvciBvdXIgbGlzdCBvZiBvcHRpb25zLlxuICAgICAqL1xuICAgIHByaXZhdGUgaXNWYWxpZEluZGV4KGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLm9wdGlvbnMubGVuZ3RoO1xuICAgIH1cblxuICAgIC8vIFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBzcGVjaWZpZWQgbGlzdCBvcHRpb24uXG4gICAgcHJpdmF0ZSBnZXRPcHRpb25JbmRleChvcHRpb246IE1jTGlzdE9wdGlvbik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMudG9BcnJheSgpLmluZGV4T2Yob3B0aW9uKTtcbiAgICB9XG5cbiAgICAvLyBWaWV3IHRvIG1vZGVsIGNhbGxiYWNrIHRoYXQgc2hvdWxkIGJlIGNhbGxlZCB3aGVuZXZlciB0aGUgc2VsZWN0ZWQgb3B0aW9ucyBjaGFuZ2UuXG4gICAgcHJpdmF0ZSBvbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoXzogYW55KSA9PiB7fTtcbn1cbiJdfQ==