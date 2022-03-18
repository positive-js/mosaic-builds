/* tslint:disable:no-empty */
import { Clipboard } from '@angular/cdk/clipboard';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Input, IterableDiffers, Optional, Output, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { hasModifierKey, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, SPACE, DOWN_ARROW, UP_ARROW, TAB, isCopy, isSelectAll, isVerticalMovement } from '@ptsecurity/cdk/keycodes';
import { getMcSelectNonArrayValueError, MultipleMode } from '@ptsecurity/mosaic/core';
import { merge, Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { FlatTreeControl } from './control/flat-tree-control';
import { McTreeNodeOutlet } from './outlet';
import { McTreeBase } from './tree-base';
import { MC_TREE_OPTION_PARENT_COMPONENT, McTreeOption } from './tree-option.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/clipboard";
import * as i2 from "./outlet";
import * as i3 from "@ptsecurity/mosaic/core";
export const MC_SELECTION_TREE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => McTreeSelection),
    multi: true
};
export class McTreeSelectAllEvent {
    constructor(source, options) {
        this.source = source;
        this.options = options;
    }
}
export class McTreeCopyEvent {
    constructor(source, option) {
        this.source = source;
        this.option = option;
    }
}
export class McTreeNavigationChange {
    constructor(source, option) {
        this.source = source;
        this.option = option;
    }
}
export class McTreeSelectionChange {
    constructor(source, option) {
        this.source = source;
        this.option = option;
    }
}
export class McTreeSelection extends McTreeBase {
    constructor(elementRef, differs, changeDetectorRef, multiple, clipboard) {
        super(differs, changeDetectorRef);
        this.elementRef = elementRef;
        this.clipboard = clipboard;
        this.renderedOptions = new QueryList();
        this.resetFocusedItemOnBlur = true;
        this.multipleMode = null;
        this.userTabIndex = null;
        this.navigationChange = new EventEmitter();
        this.selectionChange = new EventEmitter();
        this.onSelectAll = new EventEmitter();
        this.onCopy = new EventEmitter();
        this.sortedNodes = [];
        this._autoSelect = true;
        this._noUnselectLast = true;
        this._disabled = false;
        this._tabIndex = 0;
        this.destroy = new Subject();
        /** `View -> model callback called when value changes` */
        this.onChange = () => { };
        /** `View -> model callback called when select has been touched` */
        this.onTouched = () => { };
        this.updateRenderedOptions = () => {
            const orderedOptions = [];
            this.sortedNodes.forEach((node) => {
                const found = this.unorderedOptions.find((option) => option.value === this.treeControl.getValue(node));
                if (found) {
                    orderedOptions.push(found);
                }
            });
            this.renderedOptions.reset(orderedOptions);
            this.renderedOptions.notifyOnChanges();
            this.updateScrollSize();
        };
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
    get optionFocusChanges() {
        return merge(...this.renderedOptions.map((option) => option.onFocus));
    }
    get optionBlurChanges() {
        return merge(...this.renderedOptions.map((option) => option.onBlur));
    }
    get multiple() {
        return !!this.multipleMode;
    }
    get noUnselectLast() {
        return this._noUnselectLast;
    }
    set noUnselectLast(value) {
        this._noUnselectLast = coerceBooleanProperty(value);
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(rawValue) {
        const value = coerceBooleanProperty(rawValue);
        if (this._disabled !== value) {
            this._disabled = value;
            this.markOptionsForCheck();
        }
    }
    get tabIndex() {
        return this.disabled ? -1 : this._tabIndex;
    }
    set tabIndex(value) {
        this._tabIndex = value;
        this.userTabIndex = value;
    }
    get showCheckbox() {
        return this.multipleMode === MultipleMode.CHECKBOX;
    }
    get isEmpty() {
        return this.sortedNodes.length === 0;
    }
    ngAfterContentInit() {
        this.unorderedOptions.changes
            .subscribe(this.updateRenderedOptions);
        this.keyManager = new FocusKeyManager(this.renderedOptions)
            .withVerticalOrientation(true)
            .withHorizontalOrientation(null);
        this.keyManager.change
            .pipe(takeUntil(this.destroy))
            .subscribe(() => {
            if (this.keyManager.activeItem) {
                this.emitNavigationEvent(this.keyManager.activeItem);
                // todo need check this logic
                if (this.autoSelect && !this.keyManager.activeItem.disabled) {
                    this.updateOptionsFocus();
                }
            }
        });
        this.keyManager.tabOut
            .pipe(takeUntil(this.destroy))
            .subscribe(() => this.allowFocusEscape());
        this.selectionModel.changed
            .pipe(takeUntil(this.destroy))
            .subscribe(() => {
            this.onChange(this.getSelectedValues());
            this.renderedOptions.notifyOnChanges();
        });
        this.renderedOptions.changes
            .pipe(takeUntil(this.destroy), delay(0))
            .subscribe((options) => {
            this.resetOptions();
            // Check to see if we need to update our tab index
            this.updateTabIndex();
            options.forEach((option) => {
                if (this.getSelectedValues().includes(option.value)) {
                    option.select(false);
                }
                else {
                    option.deselect();
                }
                option.markForCheck();
            });
        });
    }
    ngOnDestroy() {
        this.destroy.next();
        this.destroy.complete();
    }
    focus($event) {
        if (this.renderedOptions.length === 0 || this.isFocusReceivedFromNestedOption($event)) {
            return;
        }
        this.keyManager.setFocusOrigin('keyboard');
        this.keyManager.setFirstItemActive();
        this.keyManager.setFocusOrigin('program');
    }
    blur() {
        if (!this.hasFocusedOption() && this.resetFocusedItemOnBlur) {
            this.keyManager.setActiveItem(-1);
        }
        this.onTouched();
        this.changeDetectorRef.markForCheck();
    }
    onKeyDown(event) {
        this.keyManager.setFocusOrigin('keyboard');
        // tslint:disable-next-line: deprecation
        const keyCode = event.keyCode;
        if ([SPACE, LEFT_ARROW, RIGHT_ARROW].includes(keyCode) || isVerticalMovement(event)) {
            event.preventDefault();
        }
        if (this.multiple && isSelectAll(event)) {
            this.selectAllOptions();
            return;
        }
        else if (isCopy(event)) {
            this.copyActiveOption();
            return;
        }
        else if (keyCode === TAB) {
            this.keyManager.tabOut.next();
            return;
        }
        else if (keyCode === LEFT_ARROW && this.keyManager.activeItem?.isExpandable) {
            this.treeControl.collapse(this.keyManager.activeItem.data);
            return;
        }
        else if (keyCode === RIGHT_ARROW && this.keyManager.activeItem?.isExpandable) {
            this.treeControl.expand(this.keyManager.activeItem.data);
            return;
        }
        else if (keyCode === DOWN_ARROW) {
            this.keyManager.setNextItemActive();
        }
        else if (keyCode === UP_ARROW) {
            this.keyManager.setPreviousItemActive();
        }
        else if ([SPACE, ENTER].includes(keyCode)) {
            this.toggleFocusedOption();
            return;
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
        if (this.keyManager.activeItem) {
            this.setSelectedOptionsByKey(this.keyManager.activeItem, hasModifierKey(event, 'shiftKey'), hasModifierKey(event, 'ctrlKey'));
        }
    }
    updateScrollSize() {
        if (!this.renderedOptions.first) {
            return;
        }
        this.keyManager.withScrollSize(Math.floor(this.getHeight() / this.renderedOptions.first.getHeight()));
    }
    setSelectedOptionsByKey(option, shiftKey, ctrlKey) {
        if (shiftKey && this.multiple) {
            this.setSelectedOptions(option);
            this.emitChangeEvent(option);
        }
        else if (ctrlKey) {
            if (!this.canDeselectLast(option)) {
                return;
            }
        }
        else if (this.autoSelect) {
            this.selectionModel.clear();
            this.selectionModel.toggle(option.data);
            this.emitChangeEvent(option);
        }
    }
    setSelectedOptionsByClick(option, shiftKey, ctrlKey) {
        if (!shiftKey && !ctrlKey) {
            this.keyManager.setActiveItem(option);
        }
        if (shiftKey && this.multiple) {
            this.setSelectedOptions(option);
        }
        else if (ctrlKey) {
            if (!this.canDeselectLast(option)) {
                return;
            }
            this.selectionModel.toggle(option.data);
        }
        else if (this.autoSelect) {
            this.selectionModel.clear();
            this.selectionModel.toggle(option.data);
        }
        else {
            this.selectionModel.toggle(option.data);
        }
        this.emitChangeEvent(option);
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
        this.renderedOptions
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
    setFocusedOption(option) {
        this.keyManager.setActiveItem(option);
    }
    toggleFocusedOption() {
        const focusedOption = this.keyManager.activeItem;
        if (focusedOption && (!focusedOption.selected || this.canDeselectLast(focusedOption))) {
            focusedOption.toggle();
            this.emitChangeEvent(focusedOption);
        }
    }
    renderNodeChanges(data, dataDiffer = this.dataDiffer, viewContainer = this.nodeOutlet.viewContainer, parentData) {
        super.renderNodeChanges(data, dataDiffer, viewContainer, parentData);
        this.sortedNodes = this.getSortedNodes(viewContainer);
        this.nodeOutlet.changeDetectorRef.detectChanges();
    }
    emitNavigationEvent(option) {
        this.navigationChange.emit(new McTreeNavigationChange(this, option));
    }
    emitChangeEvent(option) {
        this.selectionChange.emit(new McTreeNavigationChange(this, option));
    }
    selectAllOptions() {
        const optionsToSelect = this.renderedOptions
            .filter((option) => !option.disabled);
        optionsToSelect
            .forEach((option) => option.setSelected(true));
        this.onSelectAll.emit(new McTreeSelectAllEvent(this, optionsToSelect));
    }
    copyActiveOption() {
        if (this.onCopy.observers.length) {
            this.onCopy.emit(new McTreeCopyEvent(this, this.keyManager.activeItem));
        }
        else {
            this.onCopyDefaultHandler();
        }
    }
    writeValue(value) {
        if (this.multiple && value && !Array.isArray(value)) {
            throw getMcSelectNonArrayValueError();
        }
        if (value) {
            this.setOptionsFromValues(this.multiple ? value : [value]);
        }
        else {
            this.selectionModel.clear();
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
     */
    setDisabledState(isDisabled) {
        this._disabled = isDisabled;
        this.changeDetectorRef.markForCheck();
    }
    setOptionsFromValues(values) {
        this.selectionModel.clear();
        const valuesToSelect = values.reduce((result, value) => {
            return this.treeControl.hasValue(value) ? [...result, this.treeControl.hasValue(value)] : [...result];
        }, []);
        this.selectionModel.select(...valuesToSelect);
    }
    getSelectedValues() {
        return this.selectionModel.selected.map((selected) => this.treeControl.getValue(selected));
    }
    getItemHeight() {
        return this.renderedOptions.first ? this.renderedOptions.first.getHeight() : 0;
    }
    onCopyDefaultHandler() {
        this.clipboard?.copy(this.keyManager.activeItem.value);
    }
    getHeight() {
        const clientRects = this.elementRef.nativeElement.getClientRects();
        if (clientRects.length) {
            return clientRects[0].height;
        }
        return 0;
    }
    updateTabIndex() {
        this._tabIndex = this.renderedOptions.length === 0 ? -1 : 0;
    }
    getSortedNodes(viewContainer) {
        const array = [];
        for (let i = 0; i < viewContainer.length; i++) {
            const viewRef = viewContainer.get(i);
            array.push(viewRef.context.$implicit);
        }
        return array;
    }
    allowFocusEscape() {
        if (this._tabIndex !== -1) {
            this._tabIndex = -1;
            setTimeout(() => {
                this._tabIndex = this.userTabIndex || 0;
                this.changeDetectorRef.markForCheck();
            });
        }
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
            const index = this.renderedOptions.toArray().indexOf(event.option);
            this.renderedOptions
                .filter((option) => option.hasFocus)
                .forEach((option) => option.hasFocus = false);
            if (this.isValidIndex(index)) {
                this.keyManager.updateActiveItem(index);
            }
        });
        this.optionBlurSubscription = this.optionBlurChanges
            .subscribe(() => this.blur());
    }
    /**
     * Utility to ensure all indexes are valid.
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of options.
     */
    isValidIndex(index) {
        return index >= 0 && index < this.renderedOptions.length;
    }
    /** Checks whether any of the options is focused. */
    hasFocusedOption() {
        return this.renderedOptions.some((option) => option.hasFocus);
    }
    markOptionsForCheck() {
        this.renderedOptions.forEach((option) => option.markForCheck());
    }
    updateOptionsFocus() {
        this.renderedOptions
            .filter((option) => option.hasFocus)
            .forEach((option) => option.hasFocus = false);
    }
    canDeselectLast(option) {
        return !(this.noUnselectLast && this.selectionModel.selected.length === 1 && option.selected);
    }
    isFocusReceivedFromNestedOption($event) {
        if (!$event || !$event.relatedTarget) {
            return false;
        }
        return $event.relatedTarget.classList.contains('mc-tree-option');
    }
}
/** @nocollapse */ /** @nocollapse */ McTreeSelection.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McTreeSelection, deps: [{ token: i0.ElementRef }, { token: i0.IterableDiffers }, { token: i0.ChangeDetectorRef }, { token: 'multiple', attribute: true }, { token: i1.Clipboard, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McTreeSelection.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McTreeSelection, selector: "mc-tree-selection", inputs: { treeControl: "treeControl", autoSelect: "autoSelect", noUnselectLast: "noUnselectLast", disabled: "disabled", tabIndex: "tabIndex" }, outputs: { navigationChange: "navigationChange", selectionChange: "selectionChange", onSelectAll: "onSelectAll", onCopy: "onCopy" }, host: { listeners: { "blur": "blur()", "focus": "focus($event)", "keydown": "onKeyDown($event)", "window:resize": "updateScrollSize()" }, properties: { "attr.tabindex": "tabIndex", "attr.disabled": "disabled || null" }, classAttribute: "mc-tree-selection" }, providers: [
        MC_SELECTION_TREE_VALUE_ACCESSOR,
        { provide: MC_TREE_OPTION_PARENT_COMPONENT, useExisting: McTreeSelection },
        { provide: McTreeBase, useExisting: McTreeSelection }
    ], queries: [{ propertyName: "unorderedOptions", predicate: McTreeOption }], viewQueries: [{ propertyName: "nodeOutlet", first: true, predicate: McTreeNodeOutlet, descendants: true, static: true }], exportAs: ["mcTreeSelection"], usesInheritance: true, ngImport: i0, template: '<ng-container mcTreeNodeOutlet></ng-container>', isInline: true, styles: [".mc-tree-selection{display:block}\n"], directives: [{ type: i2.McTreeNodeOutlet, selector: "[mcTreeNodeOutlet]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McTreeSelection, decorators: [{
            type: Component,
            args: [{ selector: 'mc-tree-selection', exportAs: 'mcTreeSelection', template: '<ng-container mcTreeNodeOutlet></ng-container>', host: {
                        class: 'mc-tree-selection',
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.disabled]': 'disabled || null',
                        '(blur)': 'blur()',
                        '(focus)': 'focus($event)',
                        '(keydown)': 'onKeyDown($event)',
                        '(window:resize)': 'updateScrollSize()'
                    }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        MC_SELECTION_TREE_VALUE_ACCESSOR,
                        { provide: MC_TREE_OPTION_PARENT_COMPONENT, useExisting: McTreeSelection },
                        { provide: McTreeBase, useExisting: McTreeSelection }
                    ], styles: [".mc-tree-selection{display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.IterableDiffers }, { type: i0.ChangeDetectorRef }, { type: i3.MultipleMode, decorators: [{
                    type: Attribute,
                    args: ['multiple']
                }] }, { type: i1.Clipboard, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nodeOutlet: [{
                type: ViewChild,
                args: [McTreeNodeOutlet, { static: true }]
            }], unorderedOptions: [{
                type: ContentChildren,
                args: [McTreeOption]
            }], treeControl: [{
                type: Input
            }], navigationChange: [{
                type: Output
            }], selectionChange: [{
                type: Output
            }], onSelectAll: [{
                type: Output
            }], onCopy: [{
                type: Output
            }], autoSelect: [{
                type: Input
            }], noUnselectLast: [{
                type: Input
            }], disabled: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1zZWxlY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RyZWUvdHJlZS1zZWxlY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDZCQUE2QjtBQUM3QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFFSCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFFTCxlQUFlLEVBQ2YsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFDSCxjQUFjLEVBQ2QsR0FBRyxFQUNILEtBQUssRUFDTCxJQUFJLEVBQ0osVUFBVSxFQUNWLFNBQVMsRUFDVCxPQUFPLEVBQ1AsV0FBVyxFQUNYLEtBQUssRUFDTCxVQUFVLEVBQ1YsUUFBUSxFQUNSLEdBQUcsRUFDSCxNQUFNLEVBQ04sV0FBVyxFQUFFLGtCQUFrQixFQUNsQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFFSCw2QkFBNkIsRUFFN0IsWUFBWSxFQUNmLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLEtBQUssRUFBYyxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxLQUFL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aUJBQWlCLEVBQUUsa0JBQWtCO3dCQUVyQyxRQUFRLEVBQUUsUUFBUTt3QkFDbEIsU0FBUyxFQUFFLGVBQWU7d0JBRTFCLFdBQVcsRUFBRSxtQkFBbUI7d0JBQ2hDLGlCQUFpQixFQUFFLG9CQUFvQjtxQkFDMUMsaUJBQ2MsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTSxhQUNwQzt3QkFDUCxnQ0FBZ0M7d0JBQ2hDLEVBQUUsT0FBTyxFQUFFLCtCQUErQixFQUFFLFdBQVcsaUJBQWlCLEVBQUU7d0JBQzFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLGlCQUFpQixFQUFFO3FCQUN4RDs7MEJBa0hJLFNBQVM7MkJBQUMsVUFBVTs7MEJBQ3BCLFFBQVE7NENBbEdrQyxVQUFVO3NCQUF4RCxTQUFTO3VCQUFDLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFFZCxnQkFBZ0I7c0JBQTlDLGVBQWU7dUJBQUMsWUFBWTtnQkFFcEIsV0FBVztzQkFBbkIsS0FBSztnQkFFYSxnQkFBZ0I7c0JBQWxDLE1BQU07Z0JBRVksZUFBZTtzQkFBakMsTUFBTTtnQkFFWSxXQUFXO3NCQUE3QixNQUFNO2dCQUVZLE1BQU07c0JBQXhCLE1BQU07Z0JBS0gsVUFBVTtzQkFEYixLQUFLO2dCQXdCRixjQUFjO3NCQURqQixLQUFLO2dCQVlGLFFBQVE7c0JBRFgsS0FBSztnQkFrQkYsUUFBUTtzQkFEWCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGU6bm8tZW1wdHkgKi9cbmltcG9ydCB7IENsaXBib2FyZCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jbGlwYm9hcmQnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBdHRyaWJ1dGUsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIElucHV0LFxuICAgIEl0ZXJhYmxlRGlmZmVyLFxuICAgIEl0ZXJhYmxlRGlmZmVycyxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvY3VzS2V5TWFuYWdlciB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9hMTF5JztcbmltcG9ydCB7XG4gICAgaGFzTW9kaWZpZXJLZXksXG4gICAgRU5ELFxuICAgIEVOVEVSLFxuICAgIEhPTUUsXG4gICAgTEVGVF9BUlJPVyxcbiAgICBQQUdFX0RPV04sXG4gICAgUEFHRV9VUCxcbiAgICBSSUdIVF9BUlJPVyxcbiAgICBTUEFDRSxcbiAgICBET1dOX0FSUk9XLFxuICAgIFVQX0FSUk9XLFxuICAgIFRBQixcbiAgICBpc0NvcHksXG4gICAgaXNTZWxlY3RBbGwsIGlzVmVydGljYWxNb3ZlbWVudFxufSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgICBDYW5EaXNhYmxlLFxuICAgIGdldE1jU2VsZWN0Tm9uQXJyYXlWYWx1ZUVycm9yLFxuICAgIEhhc1RhYkluZGV4LFxuICAgIE11bHRpcGxlTW9kZVxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWxheSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBGbGF0VHJlZUNvbnRyb2wgfSBmcm9tICcuL2NvbnRyb2wvZmxhdC10cmVlLWNvbnRyb2wnO1xuaW1wb3J0IHsgTWNUcmVlTm9kZU91dGxldCB9IGZyb20gJy4vb3V0bGV0JztcbmltcG9ydCB7IE1jVHJlZUJhc2UgfSBmcm9tICcuL3RyZWUtYmFzZSc7XG5pbXBvcnQgeyBNQ19UUkVFX09QVElPTl9QQVJFTlRfQ09NUE9ORU5ULCBNY1RyZWVPcHRpb24sIE1jVHJlZU9wdGlvbkV2ZW50IH0gZnJvbSAnLi90cmVlLW9wdGlvbi5jb21wb25lbnQnO1xuXG5cbmV4cG9ydCBjb25zdCBNQ19TRUxFQ1RJT05fVFJFRV9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1jVHJlZVNlbGVjdGlvbiksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbmV4cG9ydCBjbGFzcyBNY1RyZWVTZWxlY3RBbGxFdmVudDxUPiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZTogTWNUcmVlU2VsZWN0aW9uLCBwdWJsaWMgb3B0aW9uczogVFtdKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgTWNUcmVlQ29weUV2ZW50PFQ+IHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlOiBNY1RyZWVTZWxlY3Rpb24sIHB1YmxpYyBvcHRpb246IFQpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBNY1RyZWVOYXZpZ2F0aW9uQ2hhbmdlPFQ+IHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlOiBNY1RyZWVTZWxlY3Rpb24sIHB1YmxpYyBvcHRpb246IFQpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBNY1RyZWVTZWxlY3Rpb25DaGFuZ2U8VD4ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2U6IE1jVHJlZVNlbGVjdGlvbiwgcHVibGljIG9wdGlvbjogVCkge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5pbnRlcmZhY2UgU2VsZWN0aW9uTW9kZWxPcHRpb24ge1xuICAgIGlkOiBudW1iZXIgfCBzdHJpbmc7XG4gICAgdmFsdWU6IHN0cmluZztcbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRyZWUtc2VsZWN0aW9uJyxcbiAgICBleHBvcnRBczogJ21jVHJlZVNlbGVjdGlvbicsXG4gICAgdGVtcGxhdGU6ICc8bmctY29udGFpbmVyIG1jVHJlZU5vZGVPdXRsZXQ+PC9uZy1jb250YWluZXI+JyxcbiAgICBzdHlsZVVybHM6IFsnLi90cmVlLXNlbGVjdGlvbi5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRyZWUtc2VsZWN0aW9uJyxcblxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcblxuICAgICAgICAnKGJsdXIpJzogJ2JsdXIoKScsXG4gICAgICAgICcoZm9jdXMpJzogJ2ZvY3VzKCRldmVudCknLFxuXG4gICAgICAgICcoa2V5ZG93biknOiAnb25LZXlEb3duKCRldmVudCknLFxuICAgICAgICAnKHdpbmRvdzpyZXNpemUpJzogJ3VwZGF0ZVNjcm9sbFNpemUoKSdcbiAgICB9LFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE1DX1NFTEVDVElPTl9UUkVFX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICB7IHByb3ZpZGU6IE1DX1RSRUVfT1BUSU9OX1BBUkVOVF9DT01QT05FTlQsIHVzZUV4aXN0aW5nOiBNY1RyZWVTZWxlY3Rpb24gfSxcbiAgICAgICAgeyBwcm92aWRlOiBNY1RyZWVCYXNlLCB1c2VFeGlzdGluZzogTWNUcmVlU2VsZWN0aW9uIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jVHJlZVNlbGVjdGlvbiBleHRlbmRzIE1jVHJlZUJhc2U8YW55PlxuICAgIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyQ29udGVudEluaXQsIENhbkRpc2FibGUsIEhhc1RhYkluZGV4IHtcblxuICAgIHJlbmRlcmVkT3B0aW9ucyA9IG5ldyBRdWVyeUxpc3Q8TWNUcmVlT3B0aW9uPigpO1xuXG4gICAga2V5TWFuYWdlcjogRm9jdXNLZXlNYW5hZ2VyPE1jVHJlZU9wdGlvbj47XG5cbiAgICBzZWxlY3Rpb25Nb2RlbDogU2VsZWN0aW9uTW9kZWw8U2VsZWN0aW9uTW9kZWxPcHRpb24+O1xuXG4gICAgcmVzZXRGb2N1c2VkSXRlbU9uQmx1cjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBtdWx0aXBsZU1vZGU6IE11bHRpcGxlTW9kZSB8IG51bGwgPSBudWxsO1xuXG4gICAgdXNlclRhYkluZGV4OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAgIEBWaWV3Q2hpbGQoTWNUcmVlTm9kZU91dGxldCwgeyBzdGF0aWM6IHRydWUgfSkgbm9kZU91dGxldDogTWNUcmVlTm9kZU91dGxldDtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNUcmVlT3B0aW9uKSB1bm9yZGVyZWRPcHRpb25zOiBRdWVyeUxpc3Q8TWNUcmVlT3B0aW9uPjtcblxuICAgIEBJbnB1dCgpIHRyZWVDb250cm9sOiBGbGF0VHJlZUNvbnRyb2w8YW55PjtcblxuICAgIEBPdXRwdXQoKSByZWFkb25seSBuYXZpZ2F0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxNY1RyZWVOYXZpZ2F0aW9uQ2hhbmdlPE1jVHJlZU9wdGlvbj4+KCk7XG5cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxNY1RyZWVTZWxlY3Rpb25DaGFuZ2U8TWNUcmVlT3B0aW9uPj4oKTtcblxuICAgIEBPdXRwdXQoKSByZWFkb25seSBvblNlbGVjdEFsbCA9IG5ldyBFdmVudEVtaXR0ZXI8TWNUcmVlU2VsZWN0QWxsRXZlbnQ8TWNUcmVlT3B0aW9uPj4oKTtcblxuICAgIEBPdXRwdXQoKSByZWFkb25seSBvbkNvcHkgPSBuZXcgRXZlbnRFbWl0dGVyPE1jVHJlZUNvcHlFdmVudDxNY1RyZWVPcHRpb24+PigpO1xuXG4gICAgcHJpdmF0ZSBzb3J0ZWROb2RlczogTWNUcmVlT3B0aW9uW10gPSBbXTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGF1dG9TZWxlY3QoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRvU2VsZWN0O1xuICAgIH1cblxuICAgIHNldCBhdXRvU2VsZWN0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2F1dG9TZWxlY3QgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2F1dG9TZWxlY3Q6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgZ2V0IG9wdGlvbkZvY3VzQ2hhbmdlcygpOiBPYnNlcnZhYmxlPE1jVHJlZU9wdGlvbkV2ZW50PiB7XG4gICAgICAgIHJldHVybiBtZXJnZSguLi50aGlzLnJlbmRlcmVkT3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gb3B0aW9uLm9uRm9jdXMpKTtcbiAgICB9XG5cbiAgICBnZXQgb3B0aW9uQmx1ckNoYW5nZXMoKTogT2JzZXJ2YWJsZTxNY1RyZWVPcHRpb25FdmVudD4ge1xuICAgICAgICByZXR1cm4gbWVyZ2UoLi4udGhpcy5yZW5kZXJlZE9wdGlvbnMubWFwKChvcHRpb24pID0+IG9wdGlvbi5vbkJsdXIpKTtcbiAgICB9XG5cbiAgICBnZXQgbXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMubXVsdGlwbGVNb2RlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG5vVW5zZWxlY3RMYXN0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbm9VbnNlbGVjdExhc3Q7XG4gICAgfVxuXG4gICAgc2V0IG5vVW5zZWxlY3RMYXN0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX25vVW5zZWxlY3RMYXN0ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9ub1Vuc2VsZWN0TGFzdDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZChyYXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShyYXdWYWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2Rpc2FibGVkICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZTtcblxuICAgICAgICAgICAgdGhpcy5tYXJrT3B0aW9uc0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgdGFiSW5kZXgoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPyAtMSA6IHRoaXMuX3RhYkluZGV4O1xuICAgIH1cblxuICAgIHNldCB0YWJJbmRleCh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuX3RhYkluZGV4ID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXNlclRhYkluZGV4ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdGFiSW5kZXggPSAwO1xuXG4gICAgZ2V0IHNob3dDaGVja2JveCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGVNb2RlID09PSBNdWx0aXBsZU1vZGUuQ0hFQ0tCT1g7XG4gICAgfVxuXG4gICAgZ2V0IGlzRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNvcnRlZE5vZGVzLmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgcHJpdmF0ZSBvcHRpb25Gb2N1c1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbDtcblxuICAgIHByaXZhdGUgb3B0aW9uQmx1clN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBAQXR0cmlidXRlKCdtdWx0aXBsZScpIG11bHRpcGxlOiBNdWx0aXBsZU1vZGUsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY2xpcGJvYXJkOiBDbGlwYm9hcmRcbiAgICApIHtcbiAgICAgICAgc3VwZXIoZGlmZmVycywgY2hhbmdlRGV0ZWN0b3JSZWYpO1xuXG4gICAgICAgIGlmIChtdWx0aXBsZSA9PT0gTXVsdGlwbGVNb2RlLkNIRUNLQk9YIHx8IG11bHRpcGxlID09PSBNdWx0aXBsZU1vZGUuS0VZQk9BUkQpIHtcbiAgICAgICAgICAgIHRoaXMubXVsdGlwbGVNb2RlID0gbXVsdGlwbGU7XG4gICAgICAgIH0gZWxzZSBpZiAobXVsdGlwbGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubXVsdGlwbGVNb2RlID0gTXVsdGlwbGVNb2RlLkNIRUNLQk9YO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGVNb2RlID09PSBNdWx0aXBsZU1vZGUuQ0hFQ0tCT1gpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b1NlbGVjdCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5ub1Vuc2VsZWN0TGFzdCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbCA9IG5ldyBTZWxlY3Rpb25Nb2RlbDxTZWxlY3Rpb25Nb2RlbE9wdGlvbj4odGhpcy5tdWx0aXBsZSk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVub3JkZXJlZE9wdGlvbnMuY2hhbmdlc1xuICAgICAgICAgICAgLnN1YnNjcmliZSh0aGlzLnVwZGF0ZVJlbmRlcmVkT3B0aW9ucyk7XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyID0gbmV3IEZvY3VzS2V5TWFuYWdlcjxNY1RyZWVPcHRpb24+KHRoaXMucmVuZGVyZWRPcHRpb25zKVxuICAgICAgICAgICAgLndpdGhWZXJ0aWNhbE9yaWVudGF0aW9uKHRydWUpXG4gICAgICAgICAgICAud2l0aEhvcml6b250YWxPcmllbnRhdGlvbihudWxsKTtcblxuICAgICAgICB0aGlzLmtleU1hbmFnZXIuY2hhbmdlXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXROYXZpZ2F0aW9uRXZlbnQodGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRvZG8gbmVlZCBjaGVjayB0aGlzIGxvZ2ljXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmF1dG9TZWxlY3QgJiYgIXRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU9wdGlvbnNGb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnRhYk91dFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuYWxsb3dGb2N1c0VzY2FwZSgpKTtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmNoYW5nZWRcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLmdldFNlbGVjdGVkVmFsdWVzKCkpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlZE9wdGlvbnMubm90aWZ5T25DaGFuZ2VzKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnJlbmRlcmVkT3B0aW9ucy5jaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95KSxcbiAgICAgICAgICAgICAgICBkZWxheSgwKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgob3B0aW9ucykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRPcHRpb25zKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgd2UgbmVlZCB0byB1cGRhdGUgb3VyIHRhYiBpbmRleFxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGFiSW5kZXgoKTtcblxuICAgICAgICAgICAgICAgIG9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFNlbGVjdGVkVmFsdWVzKCkuaW5jbHVkZXMob3B0aW9uLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnNlbGVjdChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24uZGVzZWxlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLmRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBmb2N1cygkZXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucmVuZGVyZWRPcHRpb25zLmxlbmd0aCA9PT0gMCB8fCB0aGlzLmlzRm9jdXNSZWNlaXZlZEZyb21OZXN0ZWRPcHRpb24oJGV2ZW50KSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0Rm9jdXNPcmlnaW4oJ2tleWJvYXJkJyk7XG4gICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEZvY3VzT3JpZ2luKCdwcm9ncmFtJyk7XG4gICAgfVxuXG4gICAgYmx1cigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0ZvY3VzZWRPcHRpb24oKSAmJiB0aGlzLnJlc2V0Rm9jdXNlZEl0ZW1PbkJsdXIpIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKC0xKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRGb2N1c09yaWdpbigna2V5Ym9hcmQnKTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcblxuICAgICAgICBpZiAoW1NQQUNFLCBMRUZUX0FSUk9XLCBSSUdIVF9BUlJPV10uaW5jbHVkZXMoa2V5Q29kZSkgfHwgaXNWZXJ0aWNhbE1vdmVtZW50KGV2ZW50KSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlICYmIGlzU2VsZWN0QWxsKGV2ZW50KSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RBbGxPcHRpb25zKCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChpc0NvcHkoZXZlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmNvcHlBY3RpdmVPcHRpb24oKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFRBQikge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnRhYk91dC5uZXh0KCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBMRUZUX0FSUk9XICYmIHRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtPy5pc0V4cGFuZGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMudHJlZUNvbnRyb2wuY29sbGFwc2UodGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0uZGF0YSBhcyBNY1RyZWVPcHRpb24pO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gUklHSFRfQVJST1cgJiYgdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0/LmlzRXhwYW5kYWJsZSkge1xuICAgICAgICAgICAgdGhpcy50cmVlQ29udHJvbC5leHBhbmQodGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0uZGF0YSBhcyBNY1RyZWVPcHRpb24pO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gRE9XTl9BUlJPVykge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldE5leHRJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gVVBfQVJST1cpIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRQcmV2aW91c0l0ZW1BY3RpdmUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChbU1BBQ0UsIEVOVEVSXS5pbmNsdWRlcyhrZXlDb2RlKSkge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVGb2N1c2VkT3B0aW9uKCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBIT01FKSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gRU5EKSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0TGFzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBQQUdFX1VQKSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0UHJldmlvdXNQYWdlSXRlbUFjdGl2ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFBBR0VfRE9XTikge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldE5leHRQYWdlSXRlbUFjdGl2ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkT3B0aW9uc0J5S2V5KFxuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtLCBoYXNNb2RpZmllcktleShldmVudCwgJ3NoaWZ0S2V5JyksIGhhc01vZGlmaWVyS2V5KGV2ZW50LCAnY3RybEtleScpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlU2Nyb2xsU2l6ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnJlbmRlcmVkT3B0aW9ucy5maXJzdCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmtleU1hbmFnZXIud2l0aFNjcm9sbFNpemUoTWF0aC5mbG9vcih0aGlzLmdldEhlaWdodCgpIC8gdGhpcy5yZW5kZXJlZE9wdGlvbnMuZmlyc3QuZ2V0SGVpZ2h0KCkpKTtcbiAgICB9XG5cbiAgICBzZXRTZWxlY3RlZE9wdGlvbnNCeUtleShvcHRpb246IE1jVHJlZU9wdGlvbiwgc2hpZnRLZXk6IGJvb2xlYW4sIGN0cmxLZXk6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKHNoaWZ0S2V5ICYmIHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRPcHRpb25zKG9wdGlvbik7XG5cbiAgICAgICAgICAgIHRoaXMuZW1pdENoYW5nZUV2ZW50KG9wdGlvbik7XG4gICAgICAgIH0gZWxzZSBpZiAoY3RybEtleSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmNhbkRlc2VsZWN0TGFzdChvcHRpb24pKSB7IHJldHVybjsgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXV0b1NlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC50b2dnbGUob3B0aW9uLmRhdGEpO1xuXG4gICAgICAgICAgICB0aGlzLmVtaXRDaGFuZ2VFdmVudChvcHRpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0U2VsZWN0ZWRPcHRpb25zQnlDbGljayhvcHRpb246IE1jVHJlZU9wdGlvbiwgc2hpZnRLZXk6IGJvb2xlYW4sIGN0cmxLZXk6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKCFzaGlmdEtleSAmJiAhY3RybEtleSkge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0ob3B0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaGlmdEtleSAmJiB0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkT3B0aW9ucyhvcHRpb24pO1xuICAgICAgICB9IGVsc2UgaWYgKGN0cmxLZXkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5jYW5EZXNlbGVjdExhc3Qob3B0aW9uKSkgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC50b2dnbGUob3B0aW9uLmRhdGEpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXV0b1NlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC50b2dnbGUob3B0aW9uLmRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC50b2dnbGUob3B0aW9uLmRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbWl0Q2hhbmdlRXZlbnQob3B0aW9uKTtcbiAgICB9XG5cbiAgICBzZXRTZWxlY3RlZE9wdGlvbnMob3B0aW9uOiBNY1RyZWVPcHRpb24pOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb25TdGF0ZSA9IG9wdGlvbi5zZWxlY3RlZDtcblxuICAgICAgICBsZXQgZnJvbUluZGV4ID0gdGhpcy5rZXlNYW5hZ2VyLnByZXZpb3VzQWN0aXZlSXRlbUluZGV4O1xuICAgICAgICBsZXQgdG9JbmRleCA9IHRoaXMua2V5TWFuYWdlci5wcmV2aW91c0FjdGl2ZUl0ZW1JbmRleCA9IHRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXg7XG5cbiAgICAgICAgaWYgKHRvSW5kZXggPT09IGZyb21JbmRleCkgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAoZnJvbUluZGV4ID4gdG9JbmRleCkge1xuICAgICAgICAgICAgW2Zyb21JbmRleCwgdG9JbmRleF0gPSBbdG9JbmRleCwgZnJvbUluZGV4XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVuZGVyZWRPcHRpb25zXG4gICAgICAgICAgICAudG9BcnJheSgpXG4gICAgICAgICAgICAuc2xpY2UoZnJvbUluZGV4LCB0b0luZGV4ICsgMSlcbiAgICAgICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+ICFpdGVtLmRpc2FibGVkKVxuICAgICAgICAgICAgLmZvckVhY2goKHJlbmRlcmVkT3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNMYXN0UmVuZGVyZWRPcHRpb24gPSByZW5kZXJlZE9wdGlvbiA9PT0gdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW07XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNMYXN0UmVuZGVyZWRPcHRpb24gJiYgcmVuZGVyZWRPcHRpb24uc2VsZWN0ZWQgJiYgdGhpcy5ub1Vuc2VsZWN0TGFzdCkgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgICAgIHJlbmRlcmVkT3B0aW9uLnNldFNlbGVjdGVkKCFzZWxlY3RlZE9wdGlvblN0YXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldEZvY3VzZWRPcHRpb24ob3B0aW9uOiBNY1RyZWVPcHRpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0ob3B0aW9uKTtcbiAgICB9XG5cbiAgICB0b2dnbGVGb2N1c2VkT3B0aW9uKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBmb2N1c2VkT3B0aW9uID0gdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW07XG5cbiAgICAgICAgaWYgKGZvY3VzZWRPcHRpb24gJiYgKCFmb2N1c2VkT3B0aW9uLnNlbGVjdGVkIHx8IHRoaXMuY2FuRGVzZWxlY3RMYXN0KGZvY3VzZWRPcHRpb24pKSkge1xuICAgICAgICAgICAgZm9jdXNlZE9wdGlvbi50b2dnbGUoKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdENoYW5nZUV2ZW50KGZvY3VzZWRPcHRpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyTm9kZUNoYW5nZXMoXG4gICAgICAgIGRhdGE6IE1jVHJlZU9wdGlvbltdLFxuICAgICAgICBkYXRhRGlmZmVyOiBJdGVyYWJsZURpZmZlcjxNY1RyZWVPcHRpb24+ID0gdGhpcy5kYXRhRGlmZmVyLFxuICAgICAgICB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmID0gdGhpcy5ub2RlT3V0bGV0LnZpZXdDb250YWluZXIsXG4gICAgICAgIHBhcmVudERhdGE/OiBNY1RyZWVPcHRpb25cbiAgICApOiB2b2lkIHtcbiAgICAgICAgc3VwZXIucmVuZGVyTm9kZUNoYW5nZXMoZGF0YSwgZGF0YURpZmZlciwgdmlld0NvbnRhaW5lciwgcGFyZW50RGF0YSk7XG5cbiAgICAgICAgdGhpcy5zb3J0ZWROb2RlcyA9IHRoaXMuZ2V0U29ydGVkTm9kZXModmlld0NvbnRhaW5lcik7XG5cbiAgICAgICAgdGhpcy5ub2RlT3V0bGV0LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBlbWl0TmF2aWdhdGlvbkV2ZW50KG9wdGlvbjogTWNUcmVlT3B0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMubmF2aWdhdGlvbkNoYW5nZS5lbWl0KG5ldyBNY1RyZWVOYXZpZ2F0aW9uQ2hhbmdlKHRoaXMsIG9wdGlvbikpO1xuICAgIH1cblxuICAgIGVtaXRDaGFuZ2VFdmVudChvcHRpb246IE1jVHJlZU9wdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KG5ldyBNY1RyZWVOYXZpZ2F0aW9uQ2hhbmdlKHRoaXMsIG9wdGlvbikpO1xuICAgIH1cblxuICAgIHNlbGVjdEFsbE9wdGlvbnMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnNUb1NlbGVjdCA9IHRoaXMucmVuZGVyZWRPcHRpb25zXG4gICAgICAgICAgICAuZmlsdGVyKChvcHRpb24pID0+ICFvcHRpb24uZGlzYWJsZWQpO1xuXG4gICAgICAgIG9wdGlvbnNUb1NlbGVjdFxuICAgICAgICAgICAgLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uLnNldFNlbGVjdGVkKHRydWUpKTtcblxuICAgICAgICB0aGlzLm9uU2VsZWN0QWxsLmVtaXQobmV3IE1jVHJlZVNlbGVjdEFsbEV2ZW50KHRoaXMsIG9wdGlvbnNUb1NlbGVjdCkpO1xuICAgIH1cblxuICAgIGNvcHlBY3RpdmVPcHRpb24oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm9uQ29weS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ29weS5lbWl0KG5ldyBNY1RyZWVDb3B5RXZlbnQodGhpcywgdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0gYXMgTWNUcmVlT3B0aW9uKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uQ29weURlZmF1bHRIYW5kbGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdmFsdWUgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRNY1NlbGVjdE5vbkFycmF5VmFsdWVFcnJvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbnNGcm9tVmFsdWVzKHRoaXMubXVsdGlwbGUgPyB2YWx1ZSA6IFt2YWx1ZV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIGBWaWV3IC0+IG1vZGVsIGNhbGxiYWNrIGNhbGxlZCB3aGVuIHZhbHVlIGNoYW5nZXNgICovXG4gICAgb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLyoqIGBWaWV3IC0+IG1vZGVsIGNhbGxiYWNrIGNhbGxlZCB3aGVuIHNlbGVjdCBoYXMgYmVlbiB0b3VjaGVkYCAqL1xuICAgIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZGlzYWJsZWQgc3RhdGUgb2YgdGhlIGNvbnRyb2wuIEltcGxlbWVudGVkIGFzIGEgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICAgKi9cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHNldE9wdGlvbnNGcm9tVmFsdWVzKHZhbHVlczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuXG4gICAgICAgIGNvbnN0IHZhbHVlc1RvU2VsZWN0ID0gdmFsdWVzLnJlZHVjZShcbiAgICAgICAgICAgIChyZXN1bHQsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJlZUNvbnRyb2wuaGFzVmFsdWUodmFsdWUpID8gWy4uLnJlc3VsdCwgdGhpcy50cmVlQ29udHJvbC5oYXNWYWx1ZSh2YWx1ZSldIDogWy4uLnJlc3VsdF07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW11cbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdCguLi52YWx1ZXNUb1NlbGVjdCk7XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWRWYWx1ZXMoKTogYW55W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZC5tYXAoKHNlbGVjdGVkKSA9PiB0aGlzLnRyZWVDb250cm9sLmdldFZhbHVlKHNlbGVjdGVkKSk7XG4gICAgfVxuXG4gICAgZ2V0SXRlbUhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJlZE9wdGlvbnMuZmlyc3QgPyB0aGlzLnJlbmRlcmVkT3B0aW9ucy5maXJzdC5nZXRIZWlnaHQoKSA6IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNvcHlEZWZhdWx0SGFuZGxlcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jbGlwYm9hcmQ/LmNvcHkodGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0hLnZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBjbGllbnRSZWN0cyA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldENsaWVudFJlY3RzKCk7XG5cbiAgICAgICAgaWYgKGNsaWVudFJlY3RzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGNsaWVudFJlY3RzWzBdLmhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVGFiSW5kZXgoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3RhYkluZGV4ID0gdGhpcy5yZW5kZXJlZE9wdGlvbnMubGVuZ3RoID09PSAwID8gLTEgOiAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlUmVuZGVyZWRPcHRpb25zID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBvcmRlcmVkT3B0aW9uczogTWNUcmVlT3B0aW9uW10gPSBbXTtcblxuICAgICAgICB0aGlzLnNvcnRlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gdGhpcy51bm9yZGVyZWRPcHRpb25zLmZpbmQoKG9wdGlvbikgPT4gb3B0aW9uLnZhbHVlID09PSB0aGlzLnRyZWVDb250cm9sLmdldFZhbHVlKG5vZGUpKTtcblxuICAgICAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgICAgICAgb3JkZXJlZE9wdGlvbnMucHVzaChmb3VuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZWRPcHRpb25zLnJlc2V0KG9yZGVyZWRPcHRpb25zKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlZE9wdGlvbnMubm90aWZ5T25DaGFuZ2VzKCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVTY3JvbGxTaXplKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRTb3J0ZWROb2Rlcyh2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIGNvbnN0IGFycmF5OiBNY1RyZWVPcHRpb25bXSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmlld0NvbnRhaW5lci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgdmlld1JlZiA9IHZpZXdDb250YWluZXIuZ2V0KGkpIGFzIGFueTtcblxuICAgICAgICAgICAgYXJyYXkucHVzaCh2aWV3UmVmLmNvbnRleHQuJGltcGxpY2l0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFsbG93Rm9jdXNFc2NhcGUoKSB7XG4gICAgICAgIGlmICh0aGlzLl90YWJJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX3RhYkluZGV4ID0gLTE7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RhYkluZGV4ID0gdGhpcy51c2VyVGFiSW5kZXggfHwgMDtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2V0T3B0aW9ucygpIHtcbiAgICAgICAgdGhpcy5kcm9wU3Vic2NyaXB0aW9ucygpO1xuICAgICAgICB0aGlzLmxpc3RlblRvT3B0aW9uc0ZvY3VzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcm9wU3Vic2NyaXB0aW9ucygpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uRm9jdXNTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uRm9jdXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uRm9jdXNTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uQmx1clN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25CbHVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbkJsdXJTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsaXN0ZW5Ub09wdGlvbnNGb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vcHRpb25Gb2N1c1N1YnNjcmlwdGlvbiA9IHRoaXMub3B0aW9uRm9jdXNDaGFuZ2VzXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSB0aGlzLnJlbmRlcmVkT3B0aW9ucy50b0FycmF5KCkuaW5kZXhPZihldmVudC5vcHRpb24gYXMgTWNUcmVlT3B0aW9uKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZWRPcHRpb25zXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKG9wdGlvbikgPT4gb3B0aW9uLmhhc0ZvY3VzKVxuICAgICAgICAgICAgICAgICAgICAuZm9yRWFjaCgob3B0aW9uKSA9PiBvcHRpb24uaGFzRm9jdXMgPSBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkSW5kZXgoaW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci51cGRhdGVBY3RpdmVJdGVtKGluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm9wdGlvbkJsdXJTdWJzY3JpcHRpb24gPSB0aGlzLm9wdGlvbkJsdXJDaGFuZ2VzXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuYmx1cigpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVdGlsaXR5IHRvIGVuc3VyZSBhbGwgaW5kZXhlcyBhcmUgdmFsaWQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCB0byBiZSBjaGVja2VkLlxuICAgICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGluZGV4IGlzIHZhbGlkIGZvciBvdXIgbGlzdCBvZiBvcHRpb25zLlxuICAgICAqL1xuICAgIHByaXZhdGUgaXNWYWxpZEluZGV4KGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLnJlbmRlcmVkT3B0aW9ucy5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIGFueSBvZiB0aGUgb3B0aW9ucyBpcyBmb2N1c2VkLiAqL1xuICAgIHByaXZhdGUgaGFzRm9jdXNlZE9wdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZWRPcHRpb25zLnNvbWUoKG9wdGlvbikgPT4gb3B0aW9uLmhhc0ZvY3VzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1hcmtPcHRpb25zRm9yQ2hlY2soKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZWRPcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uLm1hcmtGb3JDaGVjaygpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZU9wdGlvbnNGb2N1cygpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlZE9wdGlvbnNcbiAgICAgICAgICAgIC5maWx0ZXIoKG9wdGlvbikgPT4gb3B0aW9uLmhhc0ZvY3VzKVxuICAgICAgICAgICAgLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uLmhhc0ZvY3VzID0gZmFsc2UpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FuRGVzZWxlY3RMYXN0KG9wdGlvbjogTWNUcmVlT3B0aW9uKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhKHRoaXMubm9VbnNlbGVjdExhc3QgJiYgdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZC5sZW5ndGggPT09IDEgJiYgb3B0aW9uLnNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzRm9jdXNSZWNlaXZlZEZyb21OZXN0ZWRPcHRpb24oJGV2ZW50OiBGb2N1c0V2ZW50KSB7XG4gICAgICAgIGlmICghJGV2ZW50IHx8ICEkZXZlbnQucmVsYXRlZFRhcmdldCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICByZXR1cm4gKCRldmVudC5yZWxhdGVkVGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3QuY29udGFpbnMoJ21jLXRyZWUtb3B0aW9uJyk7XG4gICAgfVxufVxuIl19