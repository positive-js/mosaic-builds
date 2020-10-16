/**
 * @fileoverview added by tsickle
 * Generated from: list-selection.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
 * @record
 */
export function McOptionEvent() { }
if (false) {
    /** @type {?} */
    McOptionEvent.prototype.option;
}
/**
 * Component for list-options of selection-list. Each list-option can automatically
 * generate a checkbox and can put current item into the selectionModel of selection-list
 * if the current item is selected.
 */
export class McListOption {
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
        /**
         * This is set to true after the first OnChanges cycle so we don't clear the value of `selected`
         * in the first cycle.
         */
        this.inputsInitialized = false;
        this._disabled = false;
        this._selected = false;
    }
    /**
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * @param {?} newValue
     * @return {?}
     */
    set value(newValue) {
        if (this.selected && newValue !== this.value && this.inputsInitialized) {
            this.selected = false;
        }
        this._value = newValue;
    }
    /**
     * @return {?}
     */
    get disabled() {
        /** @type {?} */
        const listSelectionDisabled = this.listSelection && this.listSelection.disabled;
        /** @type {?} */
        const groupDisabled = this.group && this.group.disabled;
        return listSelectionDisabled || groupDisabled || this._disabled;
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
        /** @type {?} */
        const list = this.listSelection;
        if (list._value && list._value.some((/**
         * @param {?} value
         * @return {?}
         */
        (value) => list.compareWith(value, this._value)))) {
            this.setSelected(true);
        }
        /** @type {?} */
        const wasSelected = this._selected;
        // List options that are selected at initialization can't be reported properly to the form
        // control. This is because it takes some time until the selection-list knows about all
        // available options. Also it can happen that the ControlValueAccessor has an initial value
        // that should be used instead. Deferring the value change report to the next tick ensures
        // that the form control value is not being overwritten.
        Promise.resolve().then((/**
         * @return {?}
         */
        () => {
            if (this._selected || wasSelected) {
                this.selected = true;
                this.changeDetector.markForCheck();
            }
        }));
        this.inputsInitialized = true;
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
    /**
     * This is set to true after the first OnChanges cycle so we don't clear the value of `selected`
     * in the first cycle.
     * @type {?}
     * @private
     */
    McListOption.prototype.inputsInitialized;
    /**
     * @type {?}
     * @private
     */
    McListOption.prototype._value;
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
export const MC_SELECTION_LIST_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => McListSelection)),
    multi: true
};
export class McListSelectionChange {
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
export class McListSelectionBase {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
if (false) {
    /** @type {?} */
    McListSelectionBase.prototype.elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export const McListSelectionMixinBase = mixinTabIndex(mixinDisabled(McListSelectionBase));
export class McListSelection extends McListSelectionMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} changeDetectorRef
     * @param {?} multiple
     */
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
        /**
         * Emits whenever the component is destroyed.
         */
        this.destroyed = new Subject();
        /**
         * Function used for comparing an option against the selected value when determining which
         * options should appear as selected. The first argument is the value of an options. The second
         * one is a value from the selected value. A boolean must be returned.
         */
        this.compareWith = (/**
         * @param {?} a1
         * @param {?} a2
         * @return {?}
         */
        (a1, a2) => a1 === a2);
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
    /**
     * @return {?}
     */
    get autoSelect() {
        return this._autoSelect;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set autoSelect(value) {
        this._autoSelect = coerceBooleanProperty(value);
    }
    /**
     * @return {?}
     */
    get noUnselectLast() {
        return this._noUnselectLast;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set noUnselectLast(value) {
        this._noUnselectLast = coerceBooleanProperty(value);
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
        return this.disabled ? -1 : this._tabIndex;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set tabIndex(value) {
        this.userTabIndex = value;
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
                this._tabIndex = this.userTabIndex || 0;
                this.changeDetectorRef.markForCheck();
            }));
        }));
        if (this._value) {
            this.setOptionsFromValues(this._value);
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
                if (this.multipleMode !== MultipleMode.KEYBOARD) {
                    this.selectionModel.toggle(option);
                }
                if (this.multipleMode === MultipleMode.KEYBOARD || !this.multiple) {
                    this.options.forEach((/**
                     * @param {?} item
                     * @return {?}
                     */
                    (item) => item.setSelected(false)));
                    option.setSelected(true);
                }
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
            if (this.multipleMode === MultipleMode.KEYBOARD || !this.multiple) {
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
            if (isLastRenderedOption && renderedOption.selected && this.noUnselectLast) {
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
        this._value = values;
        if (this.options) {
            this.setOptionsFromValues(values || []);
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
        return !(this.noUnselectLast && this.selectionModel.selected.length === 1 && listOption.selected);
    }
    /**
     * @return {?}
     */
    getHeight() {
        return this.elementRef.nativeElement.getClientRects()[0].height;
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
            /** @type {?} */
            const value = this.getSelectedOptionValues();
            this.onChange(value);
            this._value = value;
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
        this._tabIndex = this.userTabIndex || (this.options.length === 0 ? -1 : 0);
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
                styles: [".mc-divider{border-top-style:solid;border-top-width:1px;display:block;margin:0}.mc-divider.mc-divider_vertical{border-right-style:solid;border-right-width:1px;border-top:0}.mc-divider.mc-divider_inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:80px}.mc-no-select{-moz-user-select:none;-ms-user-select:none;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.mc-list,.mc-list-selection{display:block;outline:none}.mc-list-item,.mc-list-option{border:2px solid transparent;display:block;height:28px}.mc-list-item .mc-list-item-content,.mc-list-option .mc-list-item-content{align-items:center;box-sizing:border-box;display:flex;flex-direction:row;height:100%;padding:0 15px;position:relative}.mc-list-item.mc-2-line,.mc-list-option.mc-2-line{height:72px}.mc-list-item.mc-3-line,.mc-list-option.mc-3-line{height:88px}.mc-list-item.mc-multi-line,.mc-list-option.mc-multi-line{height:auto}.mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-option.mc-multi-line .mc-list-item-content{padding-bottom:16px;padding-top:16px}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{box-sizing:border-box;display:flex;flex-direction:column;overflow:hidden;padding:0;width:100%}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{font-size:inherit;font-weight:400;margin:0;padding:0}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{border-radius:50%;box-sizing:content-box;flex-shrink:0;font-size:24px;height:24px;padding:4px;width:24px}.mc-list-item .mc-list-icon~.mc-divider_inset,.mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider_inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:auto;margin-right:62px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{bottom:0;left:0;margin:0;position:absolute;width:100%}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider_inset,.mc-list-option .mc-divider.mc-divider_inset{position:absolute}.mc-list-item .mc-pseudo-checkbox,.mc-list-option .mc-pseudo-checkbox{margin-right:8px}.mc-list-option:not([disabled]):not(.mc-disabled){cursor:pointer}"]
            }] }
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
if (false) {
    /** @type {?} */
    McListSelection.prototype.keyManager;
    /** @type {?} */
    McListSelection.prototype.options;
    /**
     * @type {?}
     * @private
     */
    McListSelection.prototype._autoSelect;
    /**
     * @type {?}
     * @private
     */
    McListSelection.prototype._noUnselectLast;
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
    McListSelection.prototype.userTabIndex;
    /** @type {?} */
    McListSelection.prototype.selectionChange;
    /** @type {?} */
    McListSelection.prototype.selectionModel;
    /** @type {?} */
    McListSelection.prototype._value;
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
    /**
     * Function used for comparing an option against the selected value when determining which
     * options should appear as selected. The first argument is the value of an options. The second
     * one is a value from the selected value. A boolean must be returned.
     * @type {?}
     */
    McListSelection.prototype.compareWith;
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
    McListSelection.prototype.changeDetectorRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zZWxlY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvbGlzdC8iLCJzb3VyY2VzIjpbImxpc3Qtc2VsZWN0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUVILFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLE1BQU0sRUFHTixTQUFTLEVBQ1QsTUFBTSxFQUNOLFFBQVEsRUFDWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBb0IsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RSxPQUFPLEVBQ0gsVUFBVSxFQUNWLEdBQUcsRUFDSCxLQUFLLEVBQ0wsY0FBYyxFQUNkLElBQUksRUFDSixTQUFTLEVBQ1QsT0FBTyxFQUNQLEtBQUssRUFDTCxHQUFHLEVBQ0gsUUFBUSxFQUNYLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUNILE1BQU0sRUFFTixhQUFhLEVBQ2IsU0FBUyxFQUdULGFBQWEsRUFFYixZQUFZLEVBQ1osVUFBVSxFQUNiLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLEtBQUssRUFBYyxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7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V3ZGLHNDQUFvQzs7Ozs7SUFXcEMsMENBQXdDOztJQUV4Qyx1Q0FBa0M7O0lBTWxDLHFDQUFxQzs7Ozs7SUFZckMsb0NBQXNCOztJQUV0Qix1Q0FBbUM7O0lBT25DLDBDQUFvSDs7SUFFcEgseUNBQTZDOztJQVc3QyxpQ0FBd0I7Ozs7OztJQUd4QixvQ0FBaUQ7Ozs7O0lBRWpELGtEQUFxRDs7Ozs7SUFFckQsaURBQW9EOzs7Ozs7O0lBNEJwRCxzQ0FBNEU7O0lBOE01RSxvQ0FBaUM7Ozs7O0lBeUpqQyxtQ0FBd0Q7Ozs7O0lBL1hwRCw0Q0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZTpuby1lbXB0eSAqL1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBdHRyaWJ1dGUsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgSW5qZWN0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgVmlld0NoaWxkLFxuICAgIE5nWm9uZSxcbiAgICBPcHRpb25hbFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvY3VzS2V5TWFuYWdlciwgSUZvY3VzYWJsZU9wdGlvbiB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9hMTF5JztcbmltcG9ydCB7XG4gICAgRE9XTl9BUlJPVyxcbiAgICBFTkQsXG4gICAgRU5URVIsXG4gICAgaGFzTW9kaWZpZXJLZXksXG4gICAgSE9NRSxcbiAgICBQQUdFX0RPV04sXG4gICAgUEFHRV9VUCxcbiAgICBTUEFDRSxcbiAgICBUQUIsXG4gICAgVVBfQVJST1dcbn0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gICAgTWNMaW5lLFxuICAgIENhbkRpc2FibGUsXG4gICAgbWl4aW5EaXNhYmxlZCxcbiAgICB0b0Jvb2xlYW4sXG4gICAgQ2FuRGlzYWJsZUN0b3IsXG4gICAgSGFzVGFiSW5kZXhDdG9yLFxuICAgIG1peGluVGFiSW5kZXgsXG4gICAgSGFzVGFiSW5kZXgsXG4gICAgTXVsdGlwbGVNb2RlLFxuICAgIE1jT3B0Z3JvdXBcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgbWVyZ2UsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoLCB0YWtlLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIE1jT3B0aW9uRXZlbnQge1xuICAgIG9wdGlvbjogTWNMaXN0T3B0aW9uO1xufVxuXG4vKipcbiAqIENvbXBvbmVudCBmb3IgbGlzdC1vcHRpb25zIG9mIHNlbGVjdGlvbi1saXN0LiBFYWNoIGxpc3Qtb3B0aW9uIGNhbiBhdXRvbWF0aWNhbGx5XG4gKiBnZW5lcmF0ZSBhIGNoZWNrYm94IGFuZCBjYW4gcHV0IGN1cnJlbnQgaXRlbSBpbnRvIHRoZSBzZWxlY3Rpb25Nb2RlbCBvZiBzZWxlY3Rpb24tbGlzdFxuICogaWYgdGhlIGN1cnJlbnQgaXRlbSBpcyBzZWxlY3RlZC5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgZXhwb3J0QXM6ICdtY0xpc3RPcHRpb24nLFxuICAgIHNlbGVjdG9yOiAnbWMtbGlzdC1vcHRpb24nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1saXN0LW9wdGlvbiBtYy1uby1zZWxlY3QnLFxuICAgICAgICAnW2NsYXNzLm1jLXNlbGVjdGVkXSc6ICdzZWxlY3RlZCcsXG4gICAgICAgICdbY2xhc3MubWMtZm9jdXNlZF0nOiAnaGFzRm9jdXMnLFxuICAgICAgICAnW2NsYXNzLm1jLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG5cbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG5cbiAgICAgICAgJyhmb2N1cyknOiAnZm9jdXMoKScsXG4gICAgICAgICcoYmx1ciknOiAnYmx1cigpJyxcbiAgICAgICAgJyhjbGljayknOiAnaGFuZGxlQ2xpY2soJGV2ZW50KSdcbiAgICB9LFxuICAgIHRlbXBsYXRlVXJsOiAnbGlzdC1vcHRpb24uaHRtbCcsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY0xpc3RPcHRpb24gaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCwgSUZvY3VzYWJsZU9wdGlvbiB7XG4gICAgaGFzRm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHJlYWRvbmx5IG9uRm9jdXMgPSBuZXcgU3ViamVjdDxNY09wdGlvbkV2ZW50PigpO1xuXG4gICAgcmVhZG9ubHkgb25CbHVyID0gbmV3IFN1YmplY3Q8TWNPcHRpb25FdmVudD4oKTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNMaW5lKSBsaW5lczogUXVlcnlMaXN0PE1jTGluZT47XG5cbiAgICBAVmlld0NoaWxkKCd0ZXh0JywgeyBzdGF0aWM6IGZhbHNlIH0pIHRleHQ6IEVsZW1lbnRSZWY7XG5cbiAgICAvLyBXaGV0aGVyIHRoZSBsYWJlbCBzaG91bGQgYXBwZWFyIGJlZm9yZSBvciBhZnRlciB0aGUgY2hlY2tib3guIERlZmF1bHRzIHRvICdhZnRlcidcbiAgICBASW5wdXQoKSBjaGVja2JveFBvc2l0aW9uOiAnYmVmb3JlJyB8ICdhZnRlcic7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHNldCB0byB0cnVlIGFmdGVyIHRoZSBmaXJzdCBPbkNoYW5nZXMgY3ljbGUgc28gd2UgZG9uJ3QgY2xlYXIgdGhlIHZhbHVlIG9mIGBzZWxlY3RlZGBcbiAgICAgKiBpbiB0aGUgZmlyc3QgY3ljbGUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbnB1dHNJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgdmFsdWUoKTogYW55IHsgcmV0dXJuIHRoaXMuX3ZhbHVlOyB9XG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQgJiYgbmV3VmFsdWUgIT09IHRoaXMudmFsdWUgJiYgdGhpcy5pbnB1dHNJbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB9XG4gICAgcHJpdmF0ZSBfdmFsdWU6IGFueTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICBjb25zdCBsaXN0U2VsZWN0aW9uRGlzYWJsZWQgPSB0aGlzLmxpc3RTZWxlY3Rpb24gJiYgdGhpcy5saXN0U2VsZWN0aW9uLmRpc2FibGVkO1xuICAgICAgICBjb25zdCBncm91cERpc2FibGVkID0gdGhpcy5ncm91cCAmJiB0aGlzLmdyb3VwLmRpc2FibGVkO1xuXG4gICAgICAgIHJldHVybiBsaXN0U2VsZWN0aW9uRGlzYWJsZWQgfHwgZ3JvdXBEaXNhYmxlZCB8fCB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGFueSkge1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRvQm9vbGVhbih2YWx1ZSk7XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgc2hvd0NoZWNrYm94KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hvd0NoZWNrYm94ICE9PSB1bmRlZmluZWQgPyB0aGlzLl9zaG93Q2hlY2tib3ggOiB0aGlzLmxpc3RTZWxlY3Rpb24uc2hvd0NoZWNrYm94O1xuICAgIH1cblxuICAgIHNldCBzaG93Q2hlY2tib3godmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl9zaG93Q2hlY2tib3ggPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3Nob3dDaGVja2JveDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0U2VsZWN0aW9uLnNlbGVjdGlvbk1vZGVsICYmIHRoaXMubGlzdFNlbGVjdGlvbi5zZWxlY3Rpb25Nb2RlbC5pc1NlbGVjdGVkKHRoaXMpIHx8IGZhbHNlO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gdG9Cb29sZWFuKHZhbHVlKTtcblxuICAgICAgICBpZiAoaXNTZWxlY3RlZCAhPT0gdGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWQoaXNTZWxlY3RlZCk7XG5cbiAgICAgICAgICAgIHRoaXMubGlzdFNlbGVjdGlvbi5yZXBvcnRWYWx1ZUNoYW5nZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQgPSBmYWxzZTtcblxuICAgIGdldCB0YWJJbmRleCgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCA/IG51bGwgOiAtMTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBNY0xpc3RTZWxlY3Rpb24pKSBwdWJsaWMgbGlzdFNlbGVjdGlvbjogTWNMaXN0U2VsZWN0aW9uLFxuICAgICAgICBAT3B0aW9uYWwoKSByZWFkb25seSBncm91cDogTWNPcHRncm91cFxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5saXN0U2VsZWN0aW9uO1xuXG4gICAgICAgIGlmIChsaXN0Ll92YWx1ZSAmJiBsaXN0Ll92YWx1ZS5zb21lKCh2YWx1ZSkgPT4gbGlzdC5jb21wYXJlV2l0aCh2YWx1ZSwgdGhpcy5fdmFsdWUpKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3RlZCh0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHdhc1NlbGVjdGVkID0gdGhpcy5fc2VsZWN0ZWQ7XG5cbiAgICAgICAgLy8gTGlzdCBvcHRpb25zIHRoYXQgYXJlIHNlbGVjdGVkIGF0IGluaXRpYWxpemF0aW9uIGNhbid0IGJlIHJlcG9ydGVkIHByb3Blcmx5IHRvIHRoZSBmb3JtXG4gICAgICAgIC8vIGNvbnRyb2wuIFRoaXMgaXMgYmVjYXVzZSBpdCB0YWtlcyBzb21lIHRpbWUgdW50aWwgdGhlIHNlbGVjdGlvbi1saXN0IGtub3dzIGFib3V0IGFsbFxuICAgICAgICAvLyBhdmFpbGFibGUgb3B0aW9ucy4gQWxzbyBpdCBjYW4gaGFwcGVuIHRoYXQgdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGhhcyBhbiBpbml0aWFsIHZhbHVlXG4gICAgICAgIC8vIHRoYXQgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZC4gRGVmZXJyaW5nIHRoZSB2YWx1ZSBjaGFuZ2UgcmVwb3J0IHRvIHRoZSBuZXh0IHRpY2sgZW5zdXJlc1xuICAgICAgICAvLyB0aGF0IHRoZSBmb3JtIGNvbnRyb2wgdmFsdWUgaXMgbm90IGJlaW5nIG92ZXJ3cml0dGVuLlxuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZCB8fCB3YXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaW5wdXRzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xuICAgICAgICAgICAgLy8gV2UgaGF2ZSB0byBkZWxheSB0aGlzIHVudGlsIHRoZSBuZXh0IHRpY2sgaW4gb3JkZXJcbiAgICAgICAgICAgIC8vIHRvIGF2b2lkIGNoYW5nZWQgYWZ0ZXIgY2hlY2tlZCBlcnJvcnMuXG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHRoaXMuc2VsZWN0ZWQgPSBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxpc3RTZWxlY3Rpb24ucmVtb3ZlT3B0aW9uRnJvbUxpc3QodGhpcyk7XG4gICAgfVxuXG4gICAgdG9nZ2xlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gIXRoaXMuc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgZ2V0TGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHQgPyB0aGlzLnRleHQubmF0aXZlRWxlbWVudC50ZXh0Q29udGVudCA6ICcnO1xuICAgIH1cblxuICAgIHNldFNlbGVjdGVkKHNlbGVjdGVkOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZCA9PT0gc2VsZWN0ZWQgfHwgIXRoaXMubGlzdFNlbGVjdGlvbi5zZWxlY3Rpb25Nb2RlbCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHNlbGVjdGVkO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5saXN0U2VsZWN0aW9uLnNlbGVjdGlvbk1vZGVsLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubGlzdFNlbGVjdGlvbi5zZWxlY3Rpb25Nb2RlbC5kZXNlbGVjdCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgZ2V0SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRDbGllbnRSZWN0cygpWzBdLmhlaWdodDtcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljaygkZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5saXN0U2VsZWN0aW9uLnNldFNlbGVjdGVkT3B0aW9uc0J5Q2xpY2soXG4gICAgICAgICAgICB0aGlzLCBoYXNNb2RpZmllcktleSgkZXZlbnQsICdzaGlmdEtleScpLCBoYXNNb2RpZmllcktleSgkZXZlbnQsICdjdHJsS2V5JylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmb2N1cygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0ZvY3VzKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXG4gICAgICAgICAgICB0aGlzLm9uRm9jdXMubmV4dCh7IG9wdGlvbjogdGhpcyB9KTtcblxuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYXNGb2N1cyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBibHVyKCk6IHZvaWQge1xuICAgICAgICAvLyBXaGVuIGFuaW1hdGlvbnMgYXJlIGVuYWJsZWQsIEFuZ3VsYXIgbWF5IGVuZCB1cCByZW1vdmluZyB0aGUgb3B0aW9uIGZyb20gdGhlIERPTSBhIGxpdHRsZVxuICAgICAgICAvLyBlYXJsaWVyIHRoYW4gdXN1YWwsIGNhdXNpbmcgaXQgdG8gYmUgYmx1cnJlZCBhbmQgdGhyb3dpbmcgb2ZmIHRoZSBsb2dpYyBpbiB0aGUgbGlzdFxuICAgICAgICAvLyB0aGF0IG1vdmVzIGZvY3VzIG5vdCB0aGUgbmV4dCBpdGVtLiBUbyB3b3JrIGFyb3VuZCB0aGUgaXNzdWUsIHdlIGRlZmVyIG1hcmtpbmcgdGhlIG9wdGlvblxuICAgICAgICAvLyBhcyBub3QgZm9jdXNlZCB1bnRpbCB0aGUgbmV4dCB0aW1lIHRoZSB6b25lIHN0YWJpbGl6ZXMuXG4gICAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlXG4gICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0ZvY3VzID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkJsdXIubmV4dCh7IG9wdGlvbjogdGhpcyB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEhvc3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cbn1cblxuXG5leHBvcnQgY29uc3QgTUNfU0VMRUNUSU9OX0xJU1RfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNY0xpc3RTZWxlY3Rpb24pLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5leHBvcnQgY2xhc3MgTWNMaXN0U2VsZWN0aW9uQ2hhbmdlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlOiBNY0xpc3RTZWxlY3Rpb24sIHB1YmxpYyBvcHRpb246IE1jTGlzdE9wdGlvbikge31cbn1cblxuXG5leHBvcnQgY2xhc3MgTWNMaXN0U2VsZWN0aW9uQmFzZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jTGlzdFNlbGVjdGlvbk1peGluQmFzZTogQ2FuRGlzYWJsZUN0b3IgJiBIYXNUYWJJbmRleEN0b3IgJiB0eXBlb2YgTWNMaXN0U2VsZWN0aW9uQmFzZVxuICAgID0gbWl4aW5UYWJJbmRleChtaXhpbkRpc2FibGVkKE1jTGlzdFNlbGVjdGlvbkJhc2UpKTtcblxuQENvbXBvbmVudCh7XG4gICAgZXhwb3J0QXM6ICdtY0xpc3RTZWxlY3Rpb24nLFxuICAgIHNlbGVjdG9yOiAnbWMtbGlzdC1zZWxlY3Rpb24nLFxuICAgIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gICAgc3R5bGVVcmxzOiBbJy4vbGlzdC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbGlzdC1zZWxlY3Rpb24nLFxuXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuXG4gICAgICAgICcoZm9jdXMpJzogJ2ZvY3VzKCknLFxuICAgICAgICAnKGJsdXIpJzogJ2JsdXIoKScsXG4gICAgICAgICcoa2V5ZG93biknOiAnb25LZXlEb3duKCRldmVudCknLFxuICAgICAgICAnKHdpbmRvdzpyZXNpemUpJzogJ3VwZGF0ZVNjcm9sbFNpemUoKSdcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW01DX1NFTEVDVElPTl9MSVNUX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZVxufSlcbmV4cG9ydCBjbGFzcyBNY0xpc3RTZWxlY3Rpb24gZXh0ZW5kcyBNY0xpc3RTZWxlY3Rpb25NaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5EaXNhYmxlLCBIYXNUYWJJbmRleCwgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgICBrZXlNYW5hZ2VyOiBGb2N1c0tleU1hbmFnZXI8TWNMaXN0T3B0aW9uPjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNMaXN0T3B0aW9uLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIG9wdGlvbnM6IFF1ZXJ5TGlzdDxNY0xpc3RPcHRpb24+O1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgYXV0b1NlbGVjdCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F1dG9TZWxlY3Q7XG4gICAgfVxuXG4gICAgc2V0IGF1dG9TZWxlY3QodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fYXV0b1NlbGVjdCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYXV0b1NlbGVjdDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBub1Vuc2VsZWN0TGFzdCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vVW5zZWxlY3RMYXN0O1xuICAgIH1cblxuICAgIHNldCBub1Vuc2VsZWN0TGFzdCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9ub1Vuc2VsZWN0TGFzdCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbm9VbnNlbGVjdExhc3Q6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgbXVsdGlwbGVNb2RlOiBNdWx0aXBsZU1vZGUgfCBudWxsO1xuXG4gICAgZ2V0IG11bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLm11bHRpcGxlTW9kZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBob3Jpem9udGFsOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCB0YWJJbmRleCgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCA/IC0xIDogdGhpcy5fdGFiSW5kZXg7XG4gICAgfVxuXG4gICAgc2V0IHRhYkluZGV4KHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy51c2VyVGFiSW5kZXggPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fdGFiSW5kZXggPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF90YWJJbmRleCA9IDA7XG5cbiAgICB1c2VyVGFiSW5kZXg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gICAgZ2V0IHNob3dDaGVja2JveCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGVNb2RlID09PSBNdWx0aXBsZU1vZGUuQ0hFQ0tCT1g7XG4gICAgfVxuXG4gICAgLy8gRW1pdHMgYSBjaGFuZ2UgZXZlbnQgd2hlbmV2ZXIgdGhlIHNlbGVjdGVkIHN0YXRlIG9mIGFuIG9wdGlvbiBjaGFuZ2VzLlxuICAgIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxNY0xpc3RTZWxlY3Rpb25DaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxNY0xpc3RTZWxlY3Rpb25DaGFuZ2U+KCk7XG5cbiAgICBzZWxlY3Rpb25Nb2RlbDogU2VsZWN0aW9uTW9kZWw8TWNMaXN0T3B0aW9uPjtcblxuICAgIGdldCBvcHRpb25Gb2N1c0NoYW5nZXMoKTogT2JzZXJ2YWJsZTxNY09wdGlvbkV2ZW50PiB7XG4gICAgICAgIHJldHVybiBtZXJnZSguLi50aGlzLm9wdGlvbnMubWFwKChvcHRpb24pID0+IG9wdGlvbi5vbkZvY3VzKSk7XG4gICAgfVxuXG4gICAgZ2V0IG9wdGlvbkJsdXJDaGFuZ2VzKCk6IE9ic2VydmFibGU8TWNPcHRpb25FdmVudD4ge1xuICAgICAgICByZXR1cm4gbWVyZ2UoLi4udGhpcy5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiBvcHRpb24ub25CbHVyKSk7XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm9ydGhvZG94LWdldHRlci1hbmQtc2V0dGVyIG5hbWluZy1jb252ZW50aW9uXG4gICAgX3ZhbHVlOiBzdHJpbmdbXSB8IG51bGw7XG5cbiAgICAvKiogRW1pdHMgd2hlbmV2ZXIgdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgcHJpdmF0ZSBvcHRpb25Gb2N1c1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbDtcblxuICAgIHByaXZhdGUgb3B0aW9uQmx1clN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgQEF0dHJpYnV0ZSgnbXVsdGlwbGUnKSBtdWx0aXBsZTogTXVsdGlwbGVNb2RlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuXG4gICAgICAgIGlmIChtdWx0aXBsZSA9PT0gTXVsdGlwbGVNb2RlLkNIRUNLQk9YIHx8IG11bHRpcGxlID09PSBNdWx0aXBsZU1vZGUuS0VZQk9BUkQpIHtcbiAgICAgICAgICAgIHRoaXMubXVsdGlwbGVNb2RlID0gbXVsdGlwbGU7XG4gICAgICAgIH0gZWxzZSBpZiAobXVsdGlwbGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubXVsdGlwbGVNb2RlID0gTXVsdGlwbGVNb2RlLkNIRUNLQk9YO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGVNb2RlID09PSBNdWx0aXBsZU1vZGUuQ0hFQ0tCT1gpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b1NlbGVjdCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5ub1Vuc2VsZWN0TGFzdCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbCA9IG5ldyBTZWxlY3Rpb25Nb2RlbDxNY0xpc3RPcHRpb24+KHRoaXMubXVsdGlwbGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHVzZWQgZm9yIGNvbXBhcmluZyBhbiBvcHRpb24gYWdhaW5zdCB0aGUgc2VsZWN0ZWQgdmFsdWUgd2hlbiBkZXRlcm1pbmluZyB3aGljaFxuICAgICAqIG9wdGlvbnMgc2hvdWxkIGFwcGVhciBhcyBzZWxlY3RlZC4gVGhlIGZpcnN0IGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiBhbiBvcHRpb25zLiBUaGUgc2Vjb25kXG4gICAgICogb25lIGlzIGEgdmFsdWUgZnJvbSB0aGUgc2VsZWN0ZWQgdmFsdWUuIEEgYm9vbGVhbiBtdXN0IGJlIHJldHVybmVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGNvbXBhcmVXaXRoOiAobzE6IGFueSwgbzI6IGFueSkgPT4gYm9vbGVhbiA9IChhMSwgYTIpID0+IGExID09PSBhMjtcblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ob3Jpem9udGFsID0gdG9Cb29sZWFuKHRoaXMuaG9yaXpvbnRhbCk7XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyID0gbmV3IEZvY3VzS2V5TWFuYWdlcjxNY0xpc3RPcHRpb24+KHRoaXMub3B0aW9ucylcbiAgICAgICAgICAgIC53aXRoVHlwZUFoZWFkKClcbiAgICAgICAgICAgIC53aXRoVmVydGljYWxPcmllbnRhdGlvbighdGhpcy5ob3Jpem9udGFsKVxuICAgICAgICAgICAgLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24odGhpcy5ob3Jpem9udGFsID8gJ2x0cicgOiBudWxsKTtcblxuICAgICAgICB0aGlzLmtleU1hbmFnZXIudGFiT3V0XG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGFiSW5kZXggPSAtMTtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90YWJJbmRleCA9IHRoaXMudXNlclRhYkluZGV4IHx8IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5fdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uc0Zyb21WYWx1ZXModGhpcy5fdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5jaGFuZ2VkXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgZXZlbnQuYWRkZWQpIHsgaXRlbS5zZWxlY3RlZCA9IHRydWU7IH1cblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBldmVudC5yZW1vdmVkKSB7IGl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTsgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zLmNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKHN0YXJ0V2l0aChudWxsKSwgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRPcHRpb25zKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgd2UgbmVlZCB0byB1cGRhdGUgb3VyIHRhYiBpbmRleFxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGFiSW5kZXgoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlU2Nyb2xsU2l6ZSgpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3llZC5uZXh0KCk7XG5cbiAgICAgICAgdGhpcy5kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuICAgIH1cblxuICAgIGJsdXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNGb2N1c2VkT3B0aW9uKCkpIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKC0xKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0QWxsKCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiBvcHRpb24uc2V0U2VsZWN0ZWQodHJ1ZSkpO1xuXG4gICAgICAgIHRoaXMucmVwb3J0VmFsdWVDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBkZXNlbGVjdEFsbCgpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uLnNldFNlbGVjdGVkKGZhbHNlKSk7XG5cbiAgICAgICAgdGhpcy5yZXBvcnRWYWx1ZUNoYW5nZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVNjcm9sbFNpemUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmhvcml6b250YWwgfHwgIXRoaXMub3B0aW9ucy5maXJzdCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmtleU1hbmFnZXIud2l0aFNjcm9sbFNpemUoTWF0aC5mbG9vcih0aGlzLmdldEhlaWdodCgpIC8gdGhpcy5vcHRpb25zLmZpcnN0LmdldEhlaWdodCgpKSk7XG4gICAgfVxuXG4gICAgc2V0U2VsZWN0ZWRPcHRpb25zQnlDbGljayhvcHRpb246IE1jTGlzdE9wdGlvbiwgc2hpZnRLZXk6IGJvb2xlYW4sIGN0cmxLZXk6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKHNoaWZ0S2V5ICYmIHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRPcHRpb25zKG9wdGlvbik7XG4gICAgICAgIH0gZWxzZSBpZiAoY3RybEtleSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmNhbkRlc2VsZWN0TGFzdChvcHRpb24pKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnRvZ2dsZShvcHRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1NlbGVjdCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm11bHRpcGxlTW9kZSAhPT0gTXVsdGlwbGVNb2RlLktFWUJPQVJEKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwudG9nZ2xlKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlwbGVNb2RlID09PSBNdWx0aXBsZU1vZGUuS0VZQk9BUkQgfHwgIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uc2V0U2VsZWN0ZWQoZmFsc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnNldFNlbGVjdGVkKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW1pdENoYW5nZUV2ZW50KG9wdGlvbik7XG4gICAgICAgIHRoaXMucmVwb3J0VmFsdWVDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBzZXRTZWxlY3RlZE9wdGlvbnNCeUtleShvcHRpb246IE1jTGlzdE9wdGlvbiwgc2hpZnRLZXk6IGJvb2xlYW4sIGN0cmxLZXk6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKHNoaWZ0S2V5ICYmIHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRPcHRpb25zKG9wdGlvbik7XG4gICAgICAgIH0gZWxzZSBpZiAoY3RybEtleSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmNhbkRlc2VsZWN0TGFzdChvcHRpb24pKSB7IHJldHVybjsgfVxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5tdWx0aXBsZU1vZGUgPT09IE11bHRpcGxlTW9kZS5LRVlCT0FSRCB8fCAhdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLnNldFNlbGVjdGVkKGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgb3B0aW9uLnNldFNlbGVjdGVkKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbWl0Q2hhbmdlRXZlbnQob3B0aW9uKTtcbiAgICAgICAgdGhpcy5yZXBvcnRWYWx1ZUNoYW5nZSgpO1xuICAgIH1cblxuICAgIHNldFNlbGVjdGVkT3B0aW9ucyhvcHRpb246IE1jTGlzdE9wdGlvbik6IHZvaWQge1xuICAgICAgICBjb25zdCBzZWxlY3RlZE9wdGlvblN0YXRlID0gb3B0aW9uLnNlbGVjdGVkO1xuXG4gICAgICAgIGxldCBmcm9tSW5kZXggPSB0aGlzLmtleU1hbmFnZXIucHJldmlvdXNBY3RpdmVJdGVtSW5kZXg7XG4gICAgICAgIGxldCB0b0luZGV4ID0gdGhpcy5rZXlNYW5hZ2VyLnByZXZpb3VzQWN0aXZlSXRlbUluZGV4ID0gdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleDtcblxuICAgICAgICBpZiAodG9JbmRleCA9PT0gZnJvbUluZGV4KSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmIChmcm9tSW5kZXggPiB0b0luZGV4KSB7XG4gICAgICAgICAgICBbZnJvbUluZGV4LCB0b0luZGV4XSA9IFt0b0luZGV4LCBmcm9tSW5kZXhdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vcHRpb25zXG4gICAgICAgICAgICAudG9BcnJheSgpXG4gICAgICAgICAgICAuc2xpY2UoZnJvbUluZGV4LCB0b0luZGV4ICsgMSlcbiAgICAgICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+ICFpdGVtLmRpc2FibGVkKVxuICAgICAgICAgICAgLmZvckVhY2goKHJlbmRlcmVkT3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNMYXN0UmVuZGVyZWRPcHRpb24gPSByZW5kZXJlZE9wdGlvbiA9PT0gdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW07XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNMYXN0UmVuZGVyZWRPcHRpb24gJiYgcmVuZGVyZWRPcHRpb24uc2VsZWN0ZWQgJiYgdGhpcy5ub1Vuc2VsZWN0TGFzdCkgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgICAgIHJlbmRlcmVkT3B0aW9uLnNldFNlbGVjdGVkKCFzZWxlY3RlZE9wdGlvblN0YXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZXM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWVzO1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uc0Zyb21WYWx1ZXModmFsdWVzIHx8IFtdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRlZCBhcyBhIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IG9wdGlvbi5kaXNhYmxlZCA9IGlzRGlzYWJsZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWRPcHRpb25WYWx1ZXMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmZpbHRlcigob3B0aW9uKSA9PiBvcHRpb24uc2VsZWN0ZWQpLm1hcCgob3B0aW9uKSA9PiBvcHRpb24udmFsdWUpO1xuICAgIH1cblxuICAgIC8vIFRvZ2dsZXMgdGhlIHNlbGVjdGVkIHN0YXRlIG9mIHRoZSBjdXJyZW50bHkgZm9jdXNlZCBvcHRpb24uXG4gICAgdG9nZ2xlRm9jdXNlZE9wdGlvbigpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZm9jdXNlZEluZGV4ID0gdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleDtcblxuICAgICAgICBpZiAoZm9jdXNlZEluZGV4ICE9IG51bGwgJiYgdGhpcy5pc1ZhbGlkSW5kZXgoZm9jdXNlZEluZGV4KSkge1xuICAgICAgICAgICAgY29uc3QgZm9jdXNlZE9wdGlvbjogTWNMaXN0T3B0aW9uID0gdGhpcy5vcHRpb25zLnRvQXJyYXkoKVtmb2N1c2VkSW5kZXhdO1xuXG4gICAgICAgICAgICBpZiAoZm9jdXNlZE9wdGlvbiAmJiB0aGlzLmNhbkRlc2VsZWN0TGFzdChmb2N1c2VkT3B0aW9uKSkge1xuICAgICAgICAgICAgICAgIGZvY3VzZWRPcHRpb24udG9nZ2xlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBFbWl0IGEgY2hhbmdlIGV2ZW50IGJlY2F1c2UgdGhlIGZvY3VzZWQgb3B0aW9uIGNoYW5nZWQgaXRzIHN0YXRlIHRocm91Z2ggdXNlciBpbnRlcmFjdGlvbi5cbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRDaGFuZ2VFdmVudChmb2N1c2VkT3B0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbkRlc2VsZWN0TGFzdChsaXN0T3B0aW9uOiBNY0xpc3RPcHRpb24pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEodGhpcy5ub1Vuc2VsZWN0TGFzdCAmJiB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdGVkLmxlbmd0aCA9PT0gMSAmJiBsaXN0T3B0aW9uLnNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICBnZXRIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldENsaWVudFJlY3RzKClbMF0uaGVpZ2h0O1xuICAgIH1cblxuICAgIC8vIFZpZXcgdG8gbW9kZWwgY2FsbGJhY2sgdGhhdCBzaG91bGQgYmUgY2FsbGVkIGlmIHRoZSBsaXN0IG9yIGl0cyBvcHRpb25zIGxvc3QgZm9jdXMuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5XG4gICAgb25Ub3VjaGVkOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgICAvLyBSZW1vdmVzIGFuIG9wdGlvbiBmcm9tIHRoZSBzZWxlY3Rpb24gbGlzdCBhbmQgdXBkYXRlcyB0aGUgYWN0aXZlIGl0ZW0uXG4gICAgcmVtb3ZlT3B0aW9uRnJvbUxpc3Qob3B0aW9uOiBNY0xpc3RPcHRpb24pIHtcbiAgICAgICAgaWYgKG9wdGlvbi5oYXNGb2N1cykge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uSW5kZXggPSB0aGlzLmdldE9wdGlvbkluZGV4KG9wdGlvbik7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlIG9wdGlvbiBpcyB0aGUgbGFzdCBpdGVtXG4gICAgICAgICAgICBpZiAob3B0aW9uSW5kZXggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldFByZXZpb3VzSXRlbUFjdGl2ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb25JbmRleCA9PT0gMCAmJiB0aGlzLm9wdGlvbnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXROZXh0SXRlbUFjdGl2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG5cbiAgICAgICAgc3dpdGNoIChrZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIFNQQUNFOlxuICAgICAgICAgICAgY2FzZSBFTlRFUjpcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUZvY3VzZWRPcHRpb24oKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFRBQjpcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIudGFiT3V0Lm5leHQoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXROZXh0SXRlbUFjdGl2ZSgpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFVQX0FSUk9XOlxuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRQcmV2aW91c0l0ZW1BY3RpdmUoKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBIT01FOlxuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFTkQ6XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldExhc3RJdGVtQWN0aXZlKCk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUEFHRV9VUDpcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0UHJldmlvdXNQYWdlSXRlbUFjdGl2ZSgpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBBR0VfRE9XTjpcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0TmV4dFBhZ2VJdGVtQWN0aXZlKCk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLnNldFNlbGVjdGVkT3B0aW9uc0J5S2V5KFxuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0gYXMgTWNMaXN0T3B0aW9uLFxuICAgICAgICAgICAgaGFzTW9kaWZpZXJLZXkoZXZlbnQsICdzaGlmdEtleScpLFxuICAgICAgICAgICAgaGFzTW9kaWZpZXJLZXkoZXZlbnQsICdjdHJsS2V5JylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZXBvcnRzIGEgdmFsdWUgY2hhbmdlIHRvIHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvclxuICAgIHJlcG9ydFZhbHVlQ2hhbmdlKCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0U2VsZWN0ZWRPcHRpb25WYWx1ZXMoKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEVtaXRzIGEgY2hhbmdlIGV2ZW50IGlmIHRoZSBzZWxlY3RlZCBzdGF0ZSBvZiBhbiBvcHRpb24gY2hhbmdlZC5cbiAgICBlbWl0Q2hhbmdlRXZlbnQob3B0aW9uOiBNY0xpc3RPcHRpb24pIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChuZXcgTWNMaXN0U2VsZWN0aW9uQ2hhbmdlKHRoaXMsIG9wdGlvbikpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVUYWJJbmRleCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdGFiSW5kZXggPSB0aGlzLnVzZXJUYWJJbmRleCB8fCAodGhpcy5vcHRpb25zLmxlbmd0aCA9PT0gMCA/IC0xIDogMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNldE9wdGlvbnMoKSB7XG4gICAgICAgIHRoaXMuZHJvcFN1YnNjcmlwdGlvbnMoKTtcbiAgICAgICAgdGhpcy5saXN0ZW5Ub09wdGlvbnNGb2N1cygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJvcFN1YnNjcmlwdGlvbnMoKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbkZvY3VzU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbkZvY3VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbkZvY3VzU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbkJsdXJTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uQmx1clN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25CbHVyU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbGlzdGVuVG9PcHRpb25zRm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3B0aW9uRm9jdXNTdWJzY3JpcHRpb24gPSB0aGlzLm9wdGlvbkZvY3VzQ2hhbmdlc1xuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleDogbnVtYmVyID0gdGhpcy5vcHRpb25zLnRvQXJyYXkoKS5pbmRleE9mKGV2ZW50Lm9wdGlvbik7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkSW5kZXgoaW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci51cGRhdGVBY3RpdmVJdGVtKGluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm9wdGlvbkJsdXJTdWJzY3JpcHRpb24gPSB0aGlzLm9wdGlvbkJsdXJDaGFuZ2VzXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuYmx1cigpKTtcbiAgICB9XG5cbiAgICAvKiogQ2hlY2tzIHdoZXRoZXIgYW55IG9mIHRoZSBvcHRpb25zIGlzIGZvY3VzZWQuICovXG4gICAgcHJpdmF0ZSBoYXNGb2N1c2VkT3B0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNvbWUoKG9wdGlvbikgPT4gb3B0aW9uLmhhc0ZvY3VzKTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5zIHRoZSBvcHRpb24gd2l0aCB0aGUgc3BlY2lmaWVkIHZhbHVlLlxuICAgIHByaXZhdGUgZ2V0T3B0aW9uQnlWYWx1ZSh2YWx1ZTogc3RyaW5nKTogTWNMaXN0T3B0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5maW5kKChvcHRpb24pID0+IG9wdGlvbi52YWx1ZSA9PT0gdmFsdWUpO1xuICAgIH1cblxuICAgIC8vIFNldHMgdGhlIHNlbGVjdGVkIG9wdGlvbnMgYmFzZWQgb24gdGhlIHNwZWNpZmllZCB2YWx1ZXMuXG4gICAgcHJpdmF0ZSBzZXRPcHRpb25zRnJvbVZhbHVlcyh2YWx1ZXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IG9wdGlvbi5zZXRTZWxlY3RlZChmYWxzZSkpO1xuXG4gICAgICAgIHZhbHVlc1xuICAgICAgICAgICAgLm1hcCgodmFsdWUpID0+IHRoaXMuZ2V0T3B0aW9uQnlWYWx1ZSh2YWx1ZSkpXG4gICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAuZm9yRWFjaCgob3B0aW9uKSA9PiBvcHRpb24hLnNldFNlbGVjdGVkKHRydWUpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVdGlsaXR5IHRvIGVuc3VyZSBhbGwgaW5kZXhlcyBhcmUgdmFsaWQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCB0byBiZSBjaGVja2VkLlxuICAgICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGluZGV4IGlzIHZhbGlkIGZvciBvdXIgbGlzdCBvZiBvcHRpb25zLlxuICAgICAqL1xuICAgIHByaXZhdGUgaXNWYWxpZEluZGV4KGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLm9wdGlvbnMubGVuZ3RoO1xuICAgIH1cblxuICAgIC8vIFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBzcGVjaWZpZWQgbGlzdCBvcHRpb24uXG4gICAgcHJpdmF0ZSBnZXRPcHRpb25JbmRleChvcHRpb246IE1jTGlzdE9wdGlvbik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMudG9BcnJheSgpLmluZGV4T2Yob3B0aW9uKTtcbiAgICB9XG5cbiAgICAvLyBWaWV3IHRvIG1vZGVsIGNhbGxiYWNrIHRoYXQgc2hvdWxkIGJlIGNhbGxlZCB3aGVuZXZlciB0aGUgc2VsZWN0ZWQgb3B0aW9ucyBjaGFuZ2UuXG4gICAgcHJpdmF0ZSBvbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoXzogYW55KSA9PiB7fTtcbn1cbiJdfQ==