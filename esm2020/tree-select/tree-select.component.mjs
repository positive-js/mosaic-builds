/* tslint:disable:no-empty */
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkConnectedOverlay, ViewportRuler } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Directive, ElementRef, EventEmitter, Inject, Input, NgZone, Optional, Output, QueryList, Renderer2, Self, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormControlName, FormGroupDirective, NG_VALIDATORS, NgControl, NgForm, NgModel } from '@angular/forms';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW, A, PAGE_UP, PAGE_DOWN, hasModifierKey } from '@ptsecurity/cdk/keycodes';
import { getOptionScrollPosition, ErrorStateMatcher, mixinTabIndex, mixinDisabled, mixinErrorState, mcSelectAnimations, SELECT_PANEL_MAX_HEIGHT, SELECT_PANEL_PADDING_X, SELECT_PANEL_VIEWPORT_PADDING, MC_SELECT_SCROLL_STRATEGY, getMcSelectDynamicMultipleError, getMcSelectNonFunctionValueError, getMcSelectNonArrayValueError, MultipleMode, MC_VALIDATION, setMosaicValidation } from '@ptsecurity/mosaic/core';
import { McCleaner, McFormField, McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { McTag } from '@ptsecurity/mosaic/tags';
import { McTree, McTreeSelection } from '@ptsecurity/mosaic/tree';
import { defer, merge, Observable, Subject, Subscription } from 'rxjs';
import { filter, map, switchMap, take, takeUntil, distinctUntilChanged, startWith } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "@ptsecurity/mosaic/core";
import * as i3 from "@angular/cdk/bidi";
import * as i4 from "@angular/forms";
import * as i5 from "@ptsecurity/mosaic/form-field";
import * as i6 from "@ptsecurity/mosaic/tags";
import * as i7 from "@ptsecurity/mosaic/icon";
import * as i8 from "@angular/common";
let nextUniqueId = 0;
/** Change event object that is emitted when the select value has changed. */
export class McTreeSelectChange {
    constructor(source, value, isUserInput = false) {
        this.source = source;
        this.value = value;
        this.isUserInput = isUserInput;
    }
}
export class McTreeSelectTrigger {
}
/** @nocollapse */ /** @nocollapse */ McTreeSelectTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTreeSelectTrigger, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McTreeSelectTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: McTreeSelectTrigger, selector: "mc-tree-select-trigger", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTreeSelectTrigger, decorators: [{
            type: Directive,
            args: [{ selector: 'mc-tree-select-trigger' }]
        }] });
class McTreeSelectBase {
    constructor(elementRef, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
        this.elementRef = elementRef;
        this.defaultErrorStateMatcher = defaultErrorStateMatcher;
        this.parentForm = parentForm;
        this.parentFormGroup = parentFormGroup;
        this.ngControl = ngControl;
    }
}
// tslint:disable-next-line:naming-convention
const McTreeSelectMixinBase = mixinTabIndex(mixinDisabled(mixinErrorState(McTreeSelectBase)));
export class McTreeSelect extends McTreeSelectMixinBase {
    constructor(elementRef, changeDetectorRef, viewportRuler, ngZone, renderer, defaultErrorStateMatcher, scrollStrategyFactory, rawValidators, mcValidation, dir, parentForm, parentFormGroup, parentFormField, ngControl, ngModel, formControlName) {
        super(elementRef, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);
        this.changeDetectorRef = changeDetectorRef;
        this.viewportRuler = viewportRuler;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.scrollStrategyFactory = scrollStrategyFactory;
        this.rawValidators = rawValidators;
        this.mcValidation = mcValidation;
        this.dir = dir;
        this.parentFormField = parentFormField;
        this.ngModel = ngModel;
        this.formControlName = formControlName;
        /** A name for this control that can be used by `mc-form-field`. */
        this.controlType = 'select';
        this.hiddenItems = 0;
        /** The cached font-size of the trigger element. */
        this.triggerFontSize = 0;
        /** The value of the select panel's transform-origin property. */
        this.transformOrigin = 'top';
        /** Emits when the panel element is finished transforming in. */
        this.panelDoneAnimatingStream = new Subject();
        /** Strategy that will be used to handle scrolling while the select panel is open. */
        this.scrollStrategy = this.scrollStrategyFactory();
        /**
         * The y-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text.
         * when the panel opens. Will change based on the y-position of the selected option.
         */
        this.offsetY = 0;
        /**
         * This position config ensures that the top "start" corner of the overlay
         * is aligned with with the top "start" of the origin by default (overlapping
         * the trigger completely). If the panel cannot fit below the trigger, it
         * will fall back to a position above the trigger.
         */
        this.positions = [
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom'
            }
        ];
        this.hiddenItemsText = '...ещё';
        /** Event emitted when the select panel has been toggled. */
        this.openedChange = new EventEmitter();
        /** Event emitted when the select has been opened. */
        this.openedStream = this.openedChange.pipe(filter((o) => o), map(() => { }));
        /** Event emitted when the select has been closed. */
        this.closedStream = this.openedChange.pipe(filter((o) => !o), map(() => { }));
        /** Event emitted when the selected value has been changed by the user. */
        this.selectionChange = new EventEmitter();
        /**
         * Event that emits whenever the raw value of the select changes. This is here primarily
         * to facilitate the two-way binding for the `value` input.
         * @docs-private
         */
        this.valueChange = new EventEmitter();
        this.backdropClass = 'cdk-overlay-transparent-backdrop';
        /** Combined stream of all of the child options' change events. */
        this.optionSelectionChanges = defer(() => {
            if (this.options) {
                return this.options.changes.pipe(startWith(this.options), switchMap(() => merge(...this.options.map((option) => option.onSelectionChange))));
            }
            return this.ngZone.onStable
                .asObservable()
                .pipe(take(1), switchMap(() => this.optionSelectionChanges));
        });
        this._required = false;
        this._multiple = false;
        this._autoSelect = true;
        this._value = null;
        this._hasBackdrop = false;
        this._focused = false;
        this.closeSubscription = Subscription.EMPTY;
        this._panelOpen = false;
        /** The scroll position of the overlay panel, calculated to center the selected option. */
        this.scrollTop = 0;
        /** Unique id for this input. */
        this.uid = `mc-select-${nextUniqueId++}`;
        /** Emits whenever the component is destroyed. */
        this.destroy = new Subject();
        /** `View -> model callback called when value changes` */
        this.onChange = () => { };
        /** `View -> model callback called when select has been touched` */
        this.onTouched = () => { };
        /** Comparison function to specify which option is displayed. Defaults to object equality. */
        this._compareWith = (o1, o2) => o1 === o2;
        if (this.ngControl) {
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }
        // Force setter to be called in case id was not specified.
        this.id = this.id;
    }
    get placeholder() {
        return this._placeholder;
    }
    set placeholder(value) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        if (this.selectionModel) {
            throw getMcSelectDynamicMultipleError();
        }
        this._multiple = coerceBooleanProperty(value);
    }
    get autoSelect() {
        if (this.multiple) {
            return false;
        }
        return this._autoSelect;
    }
    set autoSelect(value) {
        this._autoSelect = coerceBooleanProperty(value);
    }
    /**
     * Function to compare the option values with the selected values. The first argument
     * is a value from an option. The second is a value from the selection. A boolean
     * should be returned.
     */
    get compareWith() {
        return this._compareWith;
    }
    set compareWith(fn) {
        /* tslint:disable-next-line:strict-type-predicates */
        if (typeof fn !== 'function') {
            throw getMcSelectNonFunctionValueError();
        }
        this._compareWith = fn;
        if (this.selectionModel) {
            // A different comparator means the selection could change.
            this.initializeSelection();
        }
    }
    get value() {
        return this.multiple ? this.tree.getSelectedValues() : this.tree.getSelectedValues()[0];
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value || this.uid;
        this.stateChanges.next();
    }
    get hasBackdrop() {
        return this._hasBackdrop;
    }
    set hasBackdrop(value) {
        this._hasBackdrop = coerceBooleanProperty(value);
    }
    /** Whether the select is focused. */
    get focused() {
        return this._focused || this._panelOpen;
    }
    set focused(value) {
        this._focused = value;
    }
    get panelOpen() {
        return this._panelOpen;
    }
    get canShowCleaner() {
        return this.cleaner && this.selectionModel.hasValue();
    }
    ngOnInit() {
        this.stateChanges.next();
        // We need `distinctUntilChanged` here, because some browsers will
        // fire the animation end event twice for the same animation. See:
        // https://github.com/angular/angular/issues/24084
        this.panelDoneAnimatingStream
            .pipe(distinctUntilChanged(), takeUntil(this.destroy))
            .subscribe(() => {
            if (this.panelOpen) {
                this.scrollTop = 0;
                this.openedChange.emit(true);
            }
            else {
                this.openedChange.emit(false);
                this.overlayDir.offsetX = 0;
                this.changeDetectorRef.markForCheck();
            }
        });
    }
    ngAfterContentInit() {
        if (!this.tree) {
            return;
        }
        if (this.mcValidation.useValidation) {
            setMosaicValidation(this);
        }
        this.tree.resetFocusedItemOnBlur = false;
        this.selectionModel = this.tree.selectionModel = new SelectionModel(this.multiple);
        this.tree.ngAfterContentInit();
        this.initKeyManager();
        this.options = this.tree.renderedOptions;
        this.tree.autoSelect = this.autoSelect;
        if (this.tree.multipleMode === null) {
            this.tree.multipleMode = this.multiple ? MultipleMode.CHECKBOX : null;
        }
        if (this.multiple) {
            this.tree.noUnselectLast = false;
        }
        if (this.tempValues) {
            this.setSelectionByValue(this.tempValues);
            this.tempValues = null;
        }
        this.optionSelectionChanges
            .pipe(takeUntil(this.destroy))
            .subscribe((event) => {
            if (!this.multiple && this.panelOpen && event.isUserInput) {
                this.close();
            }
        });
        this.tree.selectionChange
            .pipe(takeUntil(this.destroy))
            .subscribe((event) => {
            this.onChange(this.selectedValues);
            this.selectionChange.emit(new McTreeSelectChange(this, event.option));
        });
        this.selectionModel.changed
            .pipe(takeUntil(this.destroy))
            .subscribe((event) => {
            if (event.added.length) {
                this.tree.keyManager.setFocusOrigin('program');
                this.tree.keyManager.setActiveItem(this.options.find((option) => option.data === event.added[0]));
            }
        });
    }
    ngAfterViewInit() {
        if (!this.tree) {
            return;
        }
        this.tags.changes
            .subscribe(() => {
            setTimeout(() => this.calculateHiddenItems(), 0);
        });
        setTimeout(() => this.calculateHiddenItems(), 0);
    }
    ngDoCheck() {
        if (this.ngControl) {
            this.updateErrorState();
        }
    }
    ngOnChanges(changes) {
        // Updating the disabled state is handled by `mixinDisabled`, but we need to additionally let
        // the parent form field know to run change detection when the disabled state changes.
        if (changes.disabled) {
            this.stateChanges.next();
        }
    }
    ngOnDestroy() {
        this.destroy.next();
        this.destroy.complete();
        this.stateChanges.complete();
        this.closeSubscription.unsubscribe();
    }
    hiddenItemsTextFormatter(hiddenItemsText, hiddenItems) {
        return `${hiddenItemsText} ${hiddenItems}`;
    }
    clearValue($event) {
        $event.stopPropagation();
        this.selectionModel.clear();
        this.tree.keyManager.setActiveItem(-1);
        this.setSelectionByValue([]);
        this.onChange(this.selectedValues);
    }
    toggle() {
        if (this.panelOpen) {
            this.close();
        }
        else {
            this.open();
        }
    }
    open() {
        if (this.disabled || !this.options || !this.options.length || this._panelOpen) {
            return;
        }
        this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
        // Note: The computed font-size will be a string pixel value (e.g. "16px").
        // `parseInt` ignores the trailing 'px' and converts this to a number.
        this.triggerFontSize = parseInt(getComputedStyle(this.trigger.nativeElement)['font-size']);
        this._panelOpen = true;
        setTimeout(() => this.highlightCorrectOption());
        this.changeDetectorRef.markForCheck();
        // Set the font size on the panel element once it exists.
        this.ngZone.onStable.asObservable()
            .pipe(take(1))
            .subscribe(() => {
            if (this.triggerFontSize && this.overlayDir.overlayRef && this.overlayDir.overlayRef.overlayElement) {
                this.overlayDir.overlayRef.overlayElement.style.fontSize = `${this.triggerFontSize}px`;
            }
        });
    }
    /** Closes the overlay panel and focuses the host element. */
    close() {
        if (!this._panelOpen) {
            return;
        }
        this._panelOpen = false;
        this.changeDetectorRef.markForCheck();
        this.onTouched();
        setTimeout(() => this.focus(), 0);
    }
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param value New value to be written to the model.
     */
    writeValue(value) {
        if (this.tree) {
            this.setSelectionByValue(value);
        }
        else {
            this.tempValues = value;
        }
    }
    /**
     * Saves a callback function to be invoked when the select's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the value changes.
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the component has been touched.
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param isDisabled Sets whether the component is disabled.
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.changeDetectorRef.markForCheck();
        this.stateChanges.next();
    }
    get selected() {
        return this.multiple ? this.selectionModel.selected : this.selectionModel.selected[0];
    }
    get selectedValues() {
        const selectedValues = this.selectionModel.selected.map((value) => this.tree.treeControl.getValue(value));
        return this.multiple ? selectedValues : selectedValues[0];
    }
    get triggerValue() {
        if (this.empty) {
            return '';
        }
        return this.tree.treeControl.getViewValue(this.selected);
    }
    get triggerValues() {
        if (this.empty) {
            return [];
        }
        return this.selectedValues
            .map((value) => this.tree.renderedOptions.find((option) => option.value === value))
            .filter((option) => option);
    }
    get empty() {
        return !this.selectionModel || this.selectionModel.isEmpty();
    }
    isRtl() {
        return this.dir ? this.dir.value === 'rtl' : false;
    }
    handleKeydown(event) {
        if (!this.disabled) {
            if (this.panelOpen) {
                this.handleOpenKeydown(event);
            }
            else {
                this.handleClosedKeydown(event);
            }
        }
    }
    onFocus() {
        if (!this.disabled) {
            this._focused = true;
            this.stateChanges.next();
        }
    }
    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     */
    onBlur() {
        this._focused = false;
        if (!this.disabled && !this.panelOpen) {
            this.onTouched();
            this.changeDetectorRef.markForCheck();
            this.stateChanges.next();
        }
    }
    /** Callback that is invoked when the overlay panel has been attached. */
    onAttached() {
        this.overlayDir.positionChange
            .pipe(take(1))
            .subscribe(() => {
            this.changeDetectorRef.detectChanges();
            this.calculateOverlayOffsetX();
            this.panel.nativeElement.scrollTop = this.scrollTop;
            this.tree.updateScrollSize();
        });
        this.closeSubscription = this.closingActions()
            .subscribe(() => this.close());
    }
    /** Returns the theme to be used on the panel. */
    getPanelTheme() {
        return this.parentFormField ? `mc-${this.parentFormField.color}` : '';
    }
    focus() {
        this.elementRef.nativeElement.focus();
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    onContainerClick() {
        this.focus();
    }
    /** Invoked when an option is clicked. */
    onRemoveSelectedOption(selectedOption, $event) {
        $event.stopPropagation();
        this.selectionModel
            .deselect(this.selected.find((value) => this.tree.treeControl.getValue(value) === selectedOption.value));
        this.onChange(this.selectedValues);
    }
    calculateHiddenItems() {
        if (this.customTrigger || this.empty || !this.multiple) {
            return;
        }
        let visibleItems = 0;
        const totalItemsWidth = this.getTotalItemsWidthInMatcher();
        let totalVisibleItemsWidth = 0;
        this.tags.forEach((tag) => {
            if (tag.nativeElement.offsetTop < tag.nativeElement.offsetHeight) {
                totalVisibleItemsWidth += this.getItemWidth(tag.nativeElement);
                visibleItems++;
            }
        });
        this.hiddenItems = this.selectionModel.selected.length - visibleItems;
        if (this.hiddenItems) {
            const itemsCounter = this.trigger.nativeElement.querySelector('.mc-tree-select__match-hidden-text');
            const matcherList = this.trigger.nativeElement.querySelector('.mc-tree-select__match-list');
            const itemsCounterShowed = itemsCounter.offsetTop < itemsCounter.offsetHeight;
            // const itemsCounterWidth: number = itemsCounter.getBoundingClientRect().width;
            const itemsCounterWidth = 86;
            const matcherListWidth = matcherList.getBoundingClientRect().width;
            const matcherWidth = matcherListWidth + itemsCounterWidth;
            if (itemsCounterShowed && (totalItemsWidth < matcherWidth)) {
                this.hiddenItems = 0;
            }
            if (totalVisibleItemsWidth === matcherListWidth ||
                (totalVisibleItemsWidth + itemsCounterWidth) < matcherListWidth) {
                this.changeDetectorRef.markForCheck();
                return;
            }
            else if (!itemsCounterShowed && (totalItemsWidth + itemsCounterWidth) > matcherWidth) {
                this.hiddenItems++;
            }
        }
        this.changeDetectorRef.markForCheck();
    }
    closingActions() {
        const backdrop = this.overlayDir.overlayRef.backdropClick();
        const outsidePointerEvents = this.overlayDir.overlayRef.outsidePointerEvents();
        const detachments = this.overlayDir.overlayRef.detachments();
        return merge(backdrop, outsidePointerEvents, detachments);
    }
    getTotalItemsWidthInMatcher() {
        const triggerClone = this.trigger.nativeElement.cloneNode(true);
        triggerClone.querySelector('.mc-tree-select__match-hidden-text').remove();
        this.renderer.setStyle(triggerClone, 'position', 'absolute');
        this.renderer.setStyle(triggerClone, 'visibility', 'hidden');
        this.renderer.setStyle(triggerClone, 'top', '-100%');
        this.renderer.setStyle(triggerClone, 'left', '0');
        this.renderer.appendChild(this.trigger.nativeElement, triggerClone);
        let totalItemsWidth = 0;
        triggerClone.querySelectorAll('mc-tag').forEach((item) => {
            totalItemsWidth += this.getItemWidth(item);
        });
        triggerClone.remove();
        return totalItemsWidth;
    }
    getItemWidth(element) {
        const computedStyle = window.getComputedStyle(element);
        const width = parseInt(computedStyle.width);
        const marginLeft = parseInt(computedStyle.marginLeft);
        const marginRight = parseInt(computedStyle.marginRight);
        return width + marginLeft + marginRight;
    }
    handleClosedKeydown(event) {
        // tslint:disable-next-line: deprecation
        const keyCode = event.keyCode;
        const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW ||
            keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW;
        const isOpenKey = keyCode === ENTER || keyCode === SPACE;
        // Open the select on ALT + arrow key to match the native <select>
        if (isOpenKey || ((this.multiple || event.altKey) && isArrowKey)) {
            // prevents the page from scrolling down when pressing space
            event.preventDefault();
            this.open();
        }
        else if (!this.multiple && this.tree.keyManager && this.tree.keyManager.onKeydown) {
            this.tree.keyManager.onKeydown(event);
        }
    }
    handleOpenKeydown(event) {
        /* tslint:disable-next-line */
        const keyCode = event.keyCode;
        const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW;
        if (isArrowKey && event.altKey) {
            // Close the select on ALT + arrow key to match the native <select>
            event.preventDefault();
            this.close();
        }
        else if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
            return this.originalOnKeyDown.call(this.tree, event);
        }
        else if (keyCode === HOME) {
            event.preventDefault();
            this.tree.keyManager.setFirstItemActive();
        }
        else if (keyCode === END) {
            event.preventDefault();
            this.tree.keyManager.setLastItemActive();
        }
        else if (keyCode === PAGE_UP) {
            event.preventDefault();
            this.tree.keyManager.setPreviousPageItemActive();
        }
        else if (keyCode === PAGE_DOWN) {
            event.preventDefault();
            this.tree.keyManager.setNextPageItemActive();
        }
        else if ((keyCode === ENTER || keyCode === SPACE) && this.tree.keyManager.activeItem) {
            event.preventDefault();
            if (!this.autoSelect) {
                this.selectionModel.toggle(this.tree.keyManager.activeItem.data);
            }
            else {
                this.close();
            }
        }
        else if (this.multiple && keyCode === A && event.ctrlKey) {
            event.preventDefault();
            const hasDeselectedOptions = this.options.some((option) => !option.selected);
            this.options.forEach((option) => {
                if (hasDeselectedOptions && !option.disabled) {
                    option.select();
                }
                else {
                    option.deselect();
                }
            });
        }
        else {
            const previouslyFocusedIndex = this.tree.keyManager.activeItemIndex;
            this.tree.keyManager.setFocusOrigin('keyboard');
            this.tree.keyManager.onKeydown(event);
            if (this.multiple && isArrowKey && event.shiftKey && this.tree.keyManager.activeItem &&
                this.tree.keyManager.activeItemIndex !== previouslyFocusedIndex) {
                this.tree.keyManager.activeItem.selectViaInteraction(event);
            }
            if (this.autoSelect && this.tree.keyManager.activeItem) {
                this.tree.setSelectedOptionsByKey(this.tree.keyManager.activeItem, hasModifierKey(event, 'shiftKey'), hasModifierKey(event, 'ctrlKey'));
            }
        }
    }
    initializeSelection() {
        // Defer setting the value in order to avoid the "Expression
        // has changed after it was checked" errors from Angular.
        Promise.resolve().then(() => {
            this.setSelectionByValue(this.ngControl ? this.ngControl.value : this._value);
        });
    }
    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     */
    setSelectionByValue(value) {
        if (this.multiple && value) {
            if (!Array.isArray(value)) {
                throw getMcSelectNonArrayValueError();
            }
            this.tree.setOptionsFromValues(value);
            this.sortValues();
        }
        else {
            this.tree.setOptionsFromValues([value]);
        }
        this.changeDetectorRef.detectChanges();
    }
    initKeyManager() {
        this.originalOnKeyDown = this.tree.onKeyDown;
        this.tree.onKeyDown = () => { };
        this.tree.keyManager.tabOut
            .pipe(takeUntil(this.destroy))
            .subscribe(() => {
            // Restore focus to the trigger before closing. Ensures that the focus
            // position won't be lost if the user got focus into the overlay.
            this.focus();
            this.close();
        });
        this.tree.keyManager.change
            .pipe(takeUntil(this.destroy))
            .subscribe(() => {
            if (this._panelOpen && this.panel) {
                this.scrollActiveOptionIntoView();
            }
            else if (!this._panelOpen && !this.multiple && this.tree.keyManager.activeItem) {
                this.tree.keyManager.activeItem.selectViaInteraction();
            }
        });
    }
    /** Sorts the selected values in the selected based on their order in the panel. */
    sortValues() {
        if (this.multiple) {
            const options = this.options.toArray();
            this.selectionModel.sort((a, b) => {
                return this.sortComparator ? this.sortComparator(a, b, options) :
                    options.indexOf(a) - options.indexOf(b);
            });
            this.stateChanges.next();
        }
    }
    /**
     * Highlights the selected item. If no option is selected, it will highlight
     * the first item instead.
     */
    highlightCorrectOption() {
        if (this.empty || !this.tree.keyManager) {
            return;
        }
        const firstSelectedValue = this.multiple ? this.selectedValues[0] : this.selectedValues;
        const selectedOption = this.options.find((option) => option.value === firstSelectedValue);
        if (selectedOption) {
            this.tree.keyManager.setActiveItem(selectedOption);
        }
    }
    /** Scrolls the active option into view. */
    scrollActiveOptionIntoView() {
        const activeOptionIndex = this.tree.keyManager.activeItemIndex || 0;
        this.panel.nativeElement.scrollTop = getOptionScrollPosition(activeOptionIndex, this.tree.getItemHeight(), this.panel.nativeElement.scrollTop, SELECT_PANEL_MAX_HEIGHT);
    }
    /**
     * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text when
     * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
     * can't be calculated until the panel has been attached, because we need to know the
     * content width in order to constrain the panel within the viewport.
     */
    calculateOverlayOffsetX() {
        const overlayRect = this.overlayDir.overlayRef.overlayElement.getBoundingClientRect();
        const viewportSize = this.viewportRuler.getViewportSize();
        const isRtl = this.isRtl();
        /* tslint:disable-next-line:no-magic-numbers */
        const paddingWidth = SELECT_PANEL_PADDING_X * 2;
        let offsetX = SELECT_PANEL_PADDING_X;
        // Invert the offset in LTR.
        if (!isRtl) {
            offsetX *= -1;
        }
        // Determine how much the select overflows on each side.
        const leftOverflow = 0 - (overlayRect.left + offsetX - (isRtl ? paddingWidth : 0));
        const rightOverflow = overlayRect.right + offsetX - viewportSize.width
            + (isRtl ? 0 : paddingWidth);
        // If the element overflows on either side, reduce the offset to allow it to fit.
        if (leftOverflow > 0) {
            offsetX += leftOverflow + SELECT_PANEL_VIEWPORT_PADDING;
        }
        else if (rightOverflow > 0) {
            offsetX -= rightOverflow + SELECT_PANEL_VIEWPORT_PADDING;
        }
        // Set the offset directly in order to avoid having to go through change detection and
        // potentially triggering "changed after it was checked" errors. Round the value to avoid
        // blurry content in some browsers.
        this.overlayDir.offsetX = Math.round(offsetX);
        this.overlayDir.overlayRef.updatePosition();
    }
}
/** @nocollapse */ /** @nocollapse */ McTreeSelect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTreeSelect, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.ViewportRuler }, { token: i0.NgZone }, { token: i0.Renderer2 }, { token: i2.ErrorStateMatcher }, { token: MC_SELECT_SCROLL_STRATEGY }, { token: NG_VALIDATORS, optional: true }, { token: MC_VALIDATION, optional: true }, { token: i3.Directionality, optional: true }, { token: i4.NgForm, optional: true }, { token: i4.FormGroupDirective, optional: true }, { token: i5.McFormField, optional: true }, { token: i4.NgControl, optional: true, self: true }, { token: i4.NgModel, optional: true, self: true }, { token: i4.FormControlName, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McTreeSelect.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: McTreeSelect, selector: "mc-tree-select", inputs: { disabled: "disabled", tabIndex: "tabIndex", hiddenItemsText: "hiddenItemsText", panelClass: "panelClass", backdropClass: "backdropClass", errorStateMatcher: "errorStateMatcher", sortComparator: "sortComparator", placeholder: "placeholder", required: "required", multiple: "multiple", autoSelect: "autoSelect", compareWith: "compareWith", id: "id", hasBackdrop: "hasBackdrop", hiddenItemsTextFormatter: "hiddenItemsTextFormatter" }, outputs: { openedChange: "openedChange", openedStream: "opened", closedStream: "closed", selectionChange: "selectionChange", valueChange: "valueChange" }, host: { listeners: { "click": "toggle()", "keydown": "handleKeydown($event)", "focus": "onFocus()", "blur": "onBlur()", "window:resize": "calculateHiddenItems()" }, properties: { "class.mc-disabled": "disabled", "class.mc-invalid": "errorState", "attr.id": "id", "attr.tabindex": "tabIndex", "attr.disabled": "disabled || null" }, classAttribute: "mc-tree-select" }, providers: [
        { provide: McFormFieldControl, useExisting: McTreeSelect },
        { provide: McTree, useExisting: McTreeSelect }
    ], queries: [{ propertyName: "cleaner", first: true, predicate: ["mcSelectCleaner"], descendants: true, static: true }, { propertyName: "customTrigger", first: true, predicate: McTreeSelectTrigger, descendants: true }, { propertyName: "tree", first: true, predicate: McTreeSelection, descendants: true }], viewQueries: [{ propertyName: "trigger", first: true, predicate: ["trigger"], descendants: true }, { propertyName: "panel", first: true, predicate: ["panel"], descendants: true }, { propertyName: "overlayDir", first: true, predicate: CdkConnectedOverlay, descendants: true }, { propertyName: "hiddenItemsCounter", first: true, predicate: ["hiddenItemsCounter"], descendants: true }, { propertyName: "tags", predicate: McTag, descendants: true }], exportAs: ["mcTreeSelect"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div cdk-overlay-origin\n     class=\"mc-tree-select__trigger\"\n     [class.mc-tree-select__trigger_multiple]=\"multiple\"\n     #origin=\"cdkOverlayOrigin\"\n     #trigger>\n    <div class=\"mc-tree-select__matcher\" [ngSwitch]=\"empty\">\n        <span class=\"mc-tree-select__placeholder\" *ngSwitchCase=\"true\">{{ placeholder || '\\u00A0' }}</span>\n        <span *ngSwitchCase=\"false\" [ngSwitch]=\"!!customTrigger\">\n            <div *ngSwitchDefault [ngSwitch]=\"multiple\" class=\"mc-tree-select__match-container\">\n                <span *ngSwitchCase=\"false\" class=\"mc-tree-select__matcher-text\">{{ triggerValue }}</span>\n                <div *ngSwitchCase=\"true\" class=\"mc-tree-select__multiple-matcher\">\n                    <div class=\"mc-tree-select__match-list\">\n                        <mc-tag *ngFor=\"let option of triggerValues\"\n                            [selectable]=\"false\"\n                            [disabled]=\"option.disabled || disabled\"\n                            [class.mc-error]=\"errorState\">\n\n                            {{ option.viewValue }}\n                            <i mc-icon=\"mc-close-S_16\"\n                               *ngIf=\"!option.disabled && !disabled\"\n                               (click)=\"onRemoveSelectedOption(option, $event)\">\n                            </i>\n                        </mc-tag>\n                    </div>\n                    <div class=\"mc-tree-select__match-hidden-text\"\n                         [style.display]=\"hiddenItems > 0 ? 'block' : 'none'\"\n                         #hiddenItemsCounter>\n                        {{ hiddenItemsTextFormatter(hiddenItemsText, hiddenItems) }}\n                    </div>\n                </div>\n            </div>\n            <ng-content select=\"mc-tree-select-trigger\" *ngSwitchCase=\"true\"></ng-content>\n        </span>\n    </div>\n\n    <div class=\"mc-select__cleaner\" *ngIf=\"canShowCleaner\" (click)=\"clearValue($event)\">\n        <ng-content select=\"mc-cleaner\"></ng-content>\n    </div>\n\n    <div class=\"mc-tree-select__arrow-wrapper\">\n        <i class=\"mc-tree-select__arrow\" mc-icon=\"mc-angle-down-L_16\"></i>\n    </div>\n</div>\n\n<ng-template\n    cdk-connected-overlay\n    cdkConnectedOverlayLockPosition\n    [cdkConnectedOverlayHasBackdrop]=\"hasBackdrop\"\n    [cdkConnectedOverlayBackdropClass]=\"backdropClass\"\n    [cdkConnectedOverlayScrollStrategy]=\"scrollStrategy\"\n    [cdkConnectedOverlayOrigin]=\"origin\"\n    [cdkConnectedOverlayOpen]=\"panelOpen\"\n    [cdkConnectedOverlayPositions]=\"positions\"\n    [cdkConnectedOverlayMinWidth]=\"triggerRect?.width!\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    (backdropClick)=\"close()\"\n    (attach)=\"onAttached()\"\n    (detach)=\"close()\">\n\n    <div #panel\n         class=\"mc-tree-select__panel {{ getPanelTheme() }}\"\n         [ngClass]=\"panelClass\"\n         [style.transformOrigin]=\"transformOrigin\"\n         [style.font-size.px]=\"triggerFontSize\"\n         (keydown)=\"handleKeydown($event)\">\n\n        <div #optionsContainer\n             class=\"mc-tree-select__content\"\n             [@fadeInContent]=\"'showing'\"\n             (@fadeInContent.done)=\"panelDoneAnimatingStream.next($event.toState)\">\n            <ng-content select=\"mc-tree-selection\"></ng-content>\n        </div>\n    </div>\n</ng-template>\n", styles: [".mc-option{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;position:relative;max-width:100%;height:32px;height:var(--mc-option-size-height, 32px);border:2px solid transparent;border:var(--mc-option-size-border-width, 2px) solid transparent;cursor:pointer;outline:none;padding-left:16px;padding-left:var(--mc-option-size-horizontal-padding, 16px);padding-right:16px;padding-right:var(--mc-option-size-horizontal-padding, 16px);-webkit-tap-highlight-color:transparent}.mc-option.mc-disabled{cursor:default}.mc-option .mc-pseudo-checkbox{margin-right:8px}.mc-option .mc-option-overlay{position:absolute;top:-2px;top:calc(-1 * var(--mc-option-size-border-width, 2px));left:-2px;left:calc(-1 * var(--mc-option-size-border-width, 2px));right:-2px;right:calc(-1 * var(--mc-option-size-border-width, 2px));bottom:-2px;bottom:calc(-1 * var(--mc-option-size-border-width, 2px));pointer-events:none;border-radius:inherit}.mc-option-text{display:inline-block;flex-grow:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.mc-tree-select{box-sizing:border-box;display:inline-block;width:100%;outline:none}.mc-tree-select.mc-disabled .mc-tree-select__trigger{-webkit-user-select:none;user-select:none;cursor:default}.mc-tree-select__trigger{display:flex;box-sizing:border-box;position:relative;height:30px;height:var(--mc-select-size-height, 30px);cursor:pointer;padding-left:15px;padding-left:calc(var(--mc-select-size-left-padding, 16px) - var(--mc-form-field-size-border-width, 1px));padding-right:7px;padding-right:calc(var(--mc-select-size-right-padding, 8px) - var(--mc-form-field-size-border-width, 1px))}.mc-tree-select__trigger.mc-tree-select__trigger_multiple{padding-left:7px;padding-left:calc(var(--mc-select-size-left-padding-multiple, 8px) - var(--mc-form-field-size-border-width, 1px))}.mc-tree-select__trigger.mc-tree-select__trigger_multiple .mc-tree-select__placeholder{margin-left:8px}.mc-tree-select__trigger.mc-tree-select__trigger_multiple .mc-tag.mc-disabled .mc-tag__text{margin-right:7px}.mc-tree-select__matcher{display:flex;align-items:center;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mc-tree-select__matcher>span{width:100%}.mc-tree-select__multiple-matcher{display:flex;width:100%}.mc-tree-select__match-list{display:flex;flex-wrap:wrap;overflow:hidden;max-height:29px;max-height:calc(var(--mc-select-size-height, 30px) - var(--mc-select-panel-size-border-width, 1px))}.mc-tree-select__match-list .mc-tag{margin-right:4px}.mc-tree-select__match-container{display:flex;flex-direction:row;justify-content:space-between;width:100%}.mc-tree-select__match-container .mc-tree-select__match-hidden-text{flex:0 0 70px;align-self:center;padding:0 8px;text-align:right}.mc-tree-select__match-item{display:flex;border:1px solid transparent;border-radius:3px;padding-left:7px;margin-right:4px;max-width:100%}.mc-tree-select__arrow-wrapper{align-self:center}.mc-form-field-appearance-fill .mc-tree-select__arrow-wrapper,.mc-form-field-appearance-standard .mc-tree-select__arrow-wrapper{transform:translateY(-50%)}.mc-form-field-appearance-outline .mc-tree-select__arrow-wrapper{transform:translateY(-25%)}.mc-tree-select__panel{max-height:232px;max-height:var(--mc-select-panel-size-max-height, 232px);min-width:100%;overflow:auto;border-width:1px;border-width:var(--mc-select-panel-size-border-width, 1px);border-style:solid;border-bottom-left-radius:3px;border-bottom-left-radius:var(--mc-select-panel-size-border-radius, 3px);border-bottom-right-radius:3px;border-bottom-right-radius:var(--mc-select-panel-size-border-radius, 3px);padding:4px 0}.mc-tree-select__panel .mc-optgroup-label,.mc-tree-select__panel .mc-tree-select-option{font-size:inherit;line-height:32px;line-height:var(--mc-option-size-height, 32px);height:32px;height:var(--mc-option-size-height, 32px)}.mc-tree-select__content,.mc-tree-select__content .mc-tree-selection{height:100%}.mc-form-field-type-select:not(.mc-disabled) .mc-form-field-flex{cursor:pointer}\n"], components: [{ type: i6.McTag, selector: "mc-tag, [mc-tag], mc-basic-tag, [mc-basic-tag]", inputs: ["color", "selected", "value", "selectable", "removable", "disabled"], outputs: ["selectionChange", "destroyed", "removed"], exportAs: ["mcTag"] }, { type: i7.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i1.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }, { type: i8.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i8.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i8.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.McIconCSSStyler, selector: "[mc-icon]" }, { type: i1.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { type: i8.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], animations: [
        mcSelectAnimations.transformPanel,
        mcSelectAnimations.fadeInContent
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTreeSelect, decorators: [{
            type: Component,
            args: [{ selector: 'mc-tree-select', exportAs: 'mcTreeSelect', inputs: ['disabled', 'tabIndex'], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        class: 'mc-tree-select',
                        '[class.mc-disabled]': 'disabled',
                        '[class.mc-invalid]': 'errorState',
                        '[attr.id]': 'id',
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.disabled]': 'disabled || null',
                        '(click)': 'toggle()',
                        '(keydown)': 'handleKeydown($event)',
                        '(focus)': 'onFocus()',
                        '(blur)': 'onBlur()',
                        '(window:resize)': 'calculateHiddenItems()'
                    }, animations: [
                        mcSelectAnimations.transformPanel,
                        mcSelectAnimations.fadeInContent
                    ], providers: [
                        { provide: McFormFieldControl, useExisting: McTreeSelect },
                        { provide: McTree, useExisting: McTreeSelect }
                    ], template: "<div cdk-overlay-origin\n     class=\"mc-tree-select__trigger\"\n     [class.mc-tree-select__trigger_multiple]=\"multiple\"\n     #origin=\"cdkOverlayOrigin\"\n     #trigger>\n    <div class=\"mc-tree-select__matcher\" [ngSwitch]=\"empty\">\n        <span class=\"mc-tree-select__placeholder\" *ngSwitchCase=\"true\">{{ placeholder || '\\u00A0' }}</span>\n        <span *ngSwitchCase=\"false\" [ngSwitch]=\"!!customTrigger\">\n            <div *ngSwitchDefault [ngSwitch]=\"multiple\" class=\"mc-tree-select__match-container\">\n                <span *ngSwitchCase=\"false\" class=\"mc-tree-select__matcher-text\">{{ triggerValue }}</span>\n                <div *ngSwitchCase=\"true\" class=\"mc-tree-select__multiple-matcher\">\n                    <div class=\"mc-tree-select__match-list\">\n                        <mc-tag *ngFor=\"let option of triggerValues\"\n                            [selectable]=\"false\"\n                            [disabled]=\"option.disabled || disabled\"\n                            [class.mc-error]=\"errorState\">\n\n                            {{ option.viewValue }}\n                            <i mc-icon=\"mc-close-S_16\"\n                               *ngIf=\"!option.disabled && !disabled\"\n                               (click)=\"onRemoveSelectedOption(option, $event)\">\n                            </i>\n                        </mc-tag>\n                    </div>\n                    <div class=\"mc-tree-select__match-hidden-text\"\n                         [style.display]=\"hiddenItems > 0 ? 'block' : 'none'\"\n                         #hiddenItemsCounter>\n                        {{ hiddenItemsTextFormatter(hiddenItemsText, hiddenItems) }}\n                    </div>\n                </div>\n            </div>\n            <ng-content select=\"mc-tree-select-trigger\" *ngSwitchCase=\"true\"></ng-content>\n        </span>\n    </div>\n\n    <div class=\"mc-select__cleaner\" *ngIf=\"canShowCleaner\" (click)=\"clearValue($event)\">\n        <ng-content select=\"mc-cleaner\"></ng-content>\n    </div>\n\n    <div class=\"mc-tree-select__arrow-wrapper\">\n        <i class=\"mc-tree-select__arrow\" mc-icon=\"mc-angle-down-L_16\"></i>\n    </div>\n</div>\n\n<ng-template\n    cdk-connected-overlay\n    cdkConnectedOverlayLockPosition\n    [cdkConnectedOverlayHasBackdrop]=\"hasBackdrop\"\n    [cdkConnectedOverlayBackdropClass]=\"backdropClass\"\n    [cdkConnectedOverlayScrollStrategy]=\"scrollStrategy\"\n    [cdkConnectedOverlayOrigin]=\"origin\"\n    [cdkConnectedOverlayOpen]=\"panelOpen\"\n    [cdkConnectedOverlayPositions]=\"positions\"\n    [cdkConnectedOverlayMinWidth]=\"triggerRect?.width!\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    (backdropClick)=\"close()\"\n    (attach)=\"onAttached()\"\n    (detach)=\"close()\">\n\n    <div #panel\n         class=\"mc-tree-select__panel {{ getPanelTheme() }}\"\n         [ngClass]=\"panelClass\"\n         [style.transformOrigin]=\"transformOrigin\"\n         [style.font-size.px]=\"triggerFontSize\"\n         (keydown)=\"handleKeydown($event)\">\n\n        <div #optionsContainer\n             class=\"mc-tree-select__content\"\n             [@fadeInContent]=\"'showing'\"\n             (@fadeInContent.done)=\"panelDoneAnimatingStream.next($event.toState)\">\n            <ng-content select=\"mc-tree-selection\"></ng-content>\n        </div>\n    </div>\n</ng-template>\n", styles: [".mc-option{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;position:relative;max-width:100%;height:32px;height:var(--mc-option-size-height, 32px);border:2px solid transparent;border:var(--mc-option-size-border-width, 2px) solid transparent;cursor:pointer;outline:none;padding-left:16px;padding-left:var(--mc-option-size-horizontal-padding, 16px);padding-right:16px;padding-right:var(--mc-option-size-horizontal-padding, 16px);-webkit-tap-highlight-color:transparent}.mc-option.mc-disabled{cursor:default}.mc-option .mc-pseudo-checkbox{margin-right:8px}.mc-option .mc-option-overlay{position:absolute;top:-2px;top:calc(-1 * var(--mc-option-size-border-width, 2px));left:-2px;left:calc(-1 * var(--mc-option-size-border-width, 2px));right:-2px;right:calc(-1 * var(--mc-option-size-border-width, 2px));bottom:-2px;bottom:calc(-1 * var(--mc-option-size-border-width, 2px));pointer-events:none;border-radius:inherit}.mc-option-text{display:inline-block;flex-grow:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.mc-tree-select{box-sizing:border-box;display:inline-block;width:100%;outline:none}.mc-tree-select.mc-disabled .mc-tree-select__trigger{-webkit-user-select:none;user-select:none;cursor:default}.mc-tree-select__trigger{display:flex;box-sizing:border-box;position:relative;height:30px;height:var(--mc-select-size-height, 30px);cursor:pointer;padding-left:15px;padding-left:calc(var(--mc-select-size-left-padding, 16px) - var(--mc-form-field-size-border-width, 1px));padding-right:7px;padding-right:calc(var(--mc-select-size-right-padding, 8px) - var(--mc-form-field-size-border-width, 1px))}.mc-tree-select__trigger.mc-tree-select__trigger_multiple{padding-left:7px;padding-left:calc(var(--mc-select-size-left-padding-multiple, 8px) - var(--mc-form-field-size-border-width, 1px))}.mc-tree-select__trigger.mc-tree-select__trigger_multiple .mc-tree-select__placeholder{margin-left:8px}.mc-tree-select__trigger.mc-tree-select__trigger_multiple .mc-tag.mc-disabled .mc-tag__text{margin-right:7px}.mc-tree-select__matcher{display:flex;align-items:center;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mc-tree-select__matcher>span{width:100%}.mc-tree-select__multiple-matcher{display:flex;width:100%}.mc-tree-select__match-list{display:flex;flex-wrap:wrap;overflow:hidden;max-height:29px;max-height:calc(var(--mc-select-size-height, 30px) - var(--mc-select-panel-size-border-width, 1px))}.mc-tree-select__match-list .mc-tag{margin-right:4px}.mc-tree-select__match-container{display:flex;flex-direction:row;justify-content:space-between;width:100%}.mc-tree-select__match-container .mc-tree-select__match-hidden-text{flex:0 0 70px;align-self:center;padding:0 8px;text-align:right}.mc-tree-select__match-item{display:flex;border:1px solid transparent;border-radius:3px;padding-left:7px;margin-right:4px;max-width:100%}.mc-tree-select__arrow-wrapper{align-self:center}.mc-form-field-appearance-fill .mc-tree-select__arrow-wrapper,.mc-form-field-appearance-standard .mc-tree-select__arrow-wrapper{transform:translateY(-50%)}.mc-form-field-appearance-outline .mc-tree-select__arrow-wrapper{transform:translateY(-25%)}.mc-tree-select__panel{max-height:232px;max-height:var(--mc-select-panel-size-max-height, 232px);min-width:100%;overflow:auto;border-width:1px;border-width:var(--mc-select-panel-size-border-width, 1px);border-style:solid;border-bottom-left-radius:3px;border-bottom-left-radius:var(--mc-select-panel-size-border-radius, 3px);border-bottom-right-radius:3px;border-bottom-right-radius:var(--mc-select-panel-size-border-radius, 3px);padding:4px 0}.mc-tree-select__panel .mc-optgroup-label,.mc-tree-select__panel .mc-tree-select-option{font-size:inherit;line-height:32px;line-height:var(--mc-option-size-height, 32px);height:32px;height:var(--mc-option-size-height, 32px)}.mc-tree-select__content,.mc-tree-select__content .mc-tree-selection{height:100%}.mc-form-field-type-select:not(.mc-disabled) .mc-form-field-flex{cursor:pointer}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.ViewportRuler }, { type: i0.NgZone }, { type: i0.Renderer2 }, { type: i2.ErrorStateMatcher }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_SELECT_SCROLL_STRATEGY]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NG_VALIDATORS]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MC_VALIDATION]
                }] }, { type: i3.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i4.NgForm, decorators: [{
                    type: Optional
                }] }, { type: i4.FormGroupDirective, decorators: [{
                    type: Optional
                }] }, { type: i5.McFormField, decorators: [{
                    type: Optional
                }] }, { type: i4.NgControl, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }, { type: i4.NgModel, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }, { type: i4.FormControlName, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }]; }, propDecorators: { trigger: [{
                type: ViewChild,
                args: ['trigger', { static: false }]
            }], panel: [{
                type: ViewChild,
                args: ['panel', { static: false }]
            }], overlayDir: [{
                type: ViewChild,
                args: [CdkConnectedOverlay, { static: false }]
            }], hiddenItemsCounter: [{
                type: ViewChild,
                args: ['hiddenItemsCounter', { static: false }]
            }], tags: [{
                type: ViewChildren,
                args: [McTag]
            }], cleaner: [{
                type: ContentChild,
                args: ['mcSelectCleaner', { static: true }]
            }], customTrigger: [{
                type: ContentChild,
                args: [McTreeSelectTrigger, { static: false }]
            }], tree: [{
                type: ContentChild,
                args: [McTreeSelection, { static: false }]
            }], hiddenItemsText: [{
                type: Input
            }], openedChange: [{
                type: Output
            }], openedStream: [{
                type: Output,
                args: ['opened']
            }], closedStream: [{
                type: Output,
                args: ['closed']
            }], selectionChange: [{
                type: Output
            }], valueChange: [{
                type: Output
            }], panelClass: [{
                type: Input
            }], backdropClass: [{
                type: Input
            }], errorStateMatcher: [{
                type: Input
            }], sortComparator: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], required: [{
                type: Input
            }], multiple: [{
                type: Input
            }], autoSelect: [{
                type: Input
            }], compareWith: [{
                type: Input
            }], id: [{
                type: Input
            }], hasBackdrop: [{
                type: Input
            }], hiddenItemsTextFormatter: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RyZWUtc2VsZWN0L3RyZWUtc2VsZWN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy90cmVlLXNlbGVjdC90cmVlLXNlbGVjdC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDZCQUE2QjtBQUU3QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFDSCxtQkFBbUIsRUFFbkIsYUFBYSxFQUNoQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFHSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUVULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBSU4sUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULElBQUksRUFFSixTQUFTLEVBQ1QsWUFBWSxFQUNaLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUgsZUFBZSxFQUNmLGtCQUFrQixFQUNsQixhQUFhLEVBQ2IsU0FBUyxFQUNULE1BQU0sRUFDTixPQUFPLEVBRVYsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQ0gsVUFBVSxFQUNWLEdBQUcsRUFDSCxLQUFLLEVBQ0wsSUFBSSxFQUNKLFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUNMLFFBQVEsRUFDUixDQUFDLEVBQ0QsT0FBTyxFQUNQLFNBQVMsRUFDVCxjQUFjLEVBQ2pCLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMs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Z0JBR0ssYUFBYTtzQkFBbEUsWUFBWTt1QkFBQyxtQkFBbUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBRUYsSUFBSTtzQkFBckQsWUFBWTt1QkFBQyxlQUFlLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUV2QyxlQUFlO3NCQUF2QixLQUFLO2dCQUdhLFlBQVk7c0JBQTlCLE1BQU07Z0JBR29CLFlBQVk7c0JBQXRDLE1BQU07dUJBQUMsUUFBUTtnQkFJVyxZQUFZO3NCQUF0QyxNQUFNO3VCQUFDLFFBQVE7Z0JBSUcsZUFBZTtzQkFBakMsTUFBTTtnQkFPWSxXQUFXO3NCQUE3QixNQUFNO2dCQUdFLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUcsYUFBYTtzQkFBckIsS0FBSztnQkFHRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBTUcsY0FBYztzQkFBdEIsS0FBSztnQkFpQkYsV0FBVztzQkFEZCxLQUFLO2dCQWNGLFFBQVE7c0JBRFgsS0FBSztnQkFjRixRQUFRO3NCQURYLEtBQUs7Z0JBZ0JGLFVBQVU7c0JBRGIsS0FBSztnQkFtQkYsV0FBVztzQkFEZCxLQUFLO2dCQTBCRixFQUFFO3NCQURMLEtBQUs7Z0JBYUYsV0FBVztzQkFEZCxLQUFLO2dCQTJMTix3QkFBd0I7c0JBRHZCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZTpuby1lbXB0eSAqL1xuXG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQge1xuICAgIENka0Nvbm5lY3RlZE92ZXJsYXksXG4gICAgQ29ubmVjdGVkUG9zaXRpb24sXG4gICAgVmlld3BvcnRSdWxlclxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIERpcmVjdGl2ZSxcbiAgICBEb0NoZWNrLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgU2VsZixcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q2hpbGRyZW4sXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIEZvcm1Db250cm9sTmFtZSxcbiAgICBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgTkdfVkFMSURBVE9SUyxcbiAgICBOZ0NvbnRyb2wsXG4gICAgTmdGb3JtLFxuICAgIE5nTW9kZWwsXG4gICAgVmFsaWRhdG9yXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gICAgRE9XTl9BUlJPVyxcbiAgICBFTkQsXG4gICAgRU5URVIsXG4gICAgSE9NRSxcbiAgICBMRUZUX0FSUk9XLFxuICAgIFJJR0hUX0FSUk9XLFxuICAgIFNQQUNFLFxuICAgIFVQX0FSUk9XLFxuICAgIEEsXG4gICAgUEFHRV9VUCxcbiAgICBQQUdFX0RPV04sXG4gICAgaGFzTW9kaWZpZXJLZXlcbn0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gICAgZ2V0T3B0aW9uU2Nyb2xsUG9zaXRpb24sXG4gICAgQ2FuRGlzYWJsZSxcbiAgICBDYW5VcGRhdGVFcnJvclN0YXRlLFxuICAgIEVycm9yU3RhdGVNYXRjaGVyLFxuICAgIEhhc1RhYkluZGV4LFxuICAgIENhbkRpc2FibGVDdG9yLFxuICAgIEhhc1RhYkluZGV4Q3RvcixcbiAgICBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvcixcbiAgICBtaXhpblRhYkluZGV4LFxuICAgIG1peGluRGlzYWJsZWQsXG4gICAgbWl4aW5FcnJvclN0YXRlLFxuICAgIG1jU2VsZWN0QW5pbWF0aW9ucyxcblxuICAgIFNFTEVDVF9QQU5FTF9NQVhfSEVJR0hULFxuICAgIFNFTEVDVF9QQU5FTF9QQURESU5HX1gsXG4gICAgU0VMRUNUX1BBTkVMX1ZJRVdQT1JUX1BBRERJTkcsXG4gICAgTUNfU0VMRUNUX1NDUk9MTF9TVFJBVEVHWSxcblxuICAgIGdldE1jU2VsZWN0RHluYW1pY011bHRpcGxlRXJyb3IsXG4gICAgZ2V0TWNTZWxlY3ROb25GdW5jdGlvblZhbHVlRXJyb3IsXG4gICAgZ2V0TWNTZWxlY3ROb25BcnJheVZhbHVlRXJyb3IsXG4gICAgTXVsdGlwbGVNb2RlLFxuXG4gICAgTUNfVkFMSURBVElPTixcbiAgICBzZXRNb3NhaWNWYWxpZGF0aW9uLFxuICAgIE1jVmFsaWRhdGlvbk9wdGlvbnNcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNDbGVhbmVyLCBNY0Zvcm1GaWVsZCwgTWNGb3JtRmllbGRDb250cm9sIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgTWNUYWcgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvdGFncyc7XG5pbXBvcnQgeyBNY1RyZWUsIE1jVHJlZVNlbGVjdGlvbiwgTWNUcmVlT3B0aW9uIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL3RyZWUnO1xuaW1wb3J0IHsgZGVmZXIsIG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gICAgZmlsdGVyLFxuICAgIG1hcCxcbiAgICBzd2l0Y2hNYXAsXG4gICAgdGFrZSxcbiAgICB0YWtlVW50aWwsXG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gICAgc3RhcnRXaXRoXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxuLyoqIENoYW5nZSBldmVudCBvYmplY3QgdGhhdCBpcyBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCB2YWx1ZSBoYXMgY2hhbmdlZC4gKi9cbmV4cG9ydCBjbGFzcyBNY1RyZWVTZWxlY3RDaGFuZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2U6IE1jVHJlZVNlbGVjdCwgcHVibGljIHZhbHVlOiBhbnksIHB1YmxpYyBpc1VzZXJJbnB1dCA9IGZhbHNlKSB7fVxufVxuXG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ21jLXRyZWUtc2VsZWN0LXRyaWdnZXInIH0pXG5leHBvcnQgY2xhc3MgTWNUcmVlU2VsZWN0VHJpZ2dlciB7fVxuXG5cbmNsYXNzIE1jVHJlZVNlbGVjdEJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHVibGljIGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgICAgIHB1YmxpYyBwYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgICAgIHB1YmxpYyBwYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICAgICAgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sXG4gICAgKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmNvbnN0IE1jVHJlZVNlbGVjdE1peGluQmFzZTogQ2FuRGlzYWJsZUN0b3IgJiBIYXNUYWJJbmRleEN0b3IgJiBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvciAmXG4gICAgdHlwZW9mIE1jVHJlZVNlbGVjdEJhc2UgPSBtaXhpblRhYkluZGV4KG1peGluRGlzYWJsZWQobWl4aW5FcnJvclN0YXRlKE1jVHJlZVNlbGVjdEJhc2UpKSk7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy10cmVlLXNlbGVjdCcsXG4gICAgZXhwb3J0QXM6ICdtY1RyZWVTZWxlY3QnLFxuICAgIHRlbXBsYXRlVXJsOiAndHJlZS1zZWxlY3QuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdHJlZS1zZWxlY3Quc2NzcyddLFxuICAgIGlucHV0czogWydkaXNhYmxlZCcsICd0YWJJbmRleCddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRyZWUtc2VsZWN0JyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWludmFsaWRdJzogJ2Vycm9yU3RhdGUnLFxuXG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcblxuICAgICAgICAnKGNsaWNrKSc6ICd0b2dnbGUoKScsXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyhmb2N1cyknOiAnb25Gb2N1cygpJyxcbiAgICAgICAgJyhibHVyKSc6ICdvbkJsdXIoKScsXG4gICAgICAgICcod2luZG93OnJlc2l6ZSknOiAnY2FsY3VsYXRlSGlkZGVuSXRlbXMoKSdcbiAgICB9LFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgbWNTZWxlY3RBbmltYXRpb25zLnRyYW5zZm9ybVBhbmVsLFxuICAgICAgICBtY1NlbGVjdEFuaW1hdGlvbnMuZmFkZUluQ29udGVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogTWNGb3JtRmllbGRDb250cm9sLCB1c2VFeGlzdGluZzogTWNUcmVlU2VsZWN0IH0sXG4gICAgICAgIHsgcHJvdmlkZTogTWNUcmVlLCB1c2VFeGlzdGluZzogTWNUcmVlU2VsZWN0IH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jVHJlZVNlbGVjdCBleHRlbmRzIE1jVHJlZVNlbGVjdE1peGluQmFzZSBpbXBsZW1lbnRzXG4gICAgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgRG9DaGVjaywgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgQ2FuRGlzYWJsZSwgSGFzVGFiSW5kZXgsIE1jRm9ybUZpZWxkQ29udHJvbDxNY1RyZWVPcHRpb24+LCBDYW5VcGRhdGVFcnJvclN0YXRlIHtcblxuICAgIC8qKiBBIG5hbWUgZm9yIHRoaXMgY29udHJvbCB0aGF0IGNhbiBiZSB1c2VkIGJ5IGBtYy1mb3JtLWZpZWxkYC4gKi9cbiAgICBjb250cm9sVHlwZSA9ICdzZWxlY3QnO1xuXG4gICAgaGlkZGVuSXRlbXM6IG51bWJlciA9IDA7XG5cbiAgICAvKiogVGhlIGxhc3QgbWVhc3VyZWQgdmFsdWUgZm9yIHRoZSB0cmlnZ2VyJ3MgY2xpZW50IGJvdW5kaW5nIHJlY3QuICovXG4gICAgdHJpZ2dlclJlY3Q6IENsaWVudFJlY3Q7XG5cbiAgICAvKiogVGhlIGNhY2hlZCBmb250LXNpemUgb2YgdGhlIHRyaWdnZXIgZWxlbWVudC4gKi9cbiAgICB0cmlnZ2VyRm9udFNpemUgPSAwO1xuXG4gICAgLyoqIERlYWxzIHdpdGggdGhlIHNlbGVjdGlvbiBsb2dpYy4gKi9cbiAgICBzZWxlY3Rpb25Nb2RlbDogU2VsZWN0aW9uTW9kZWw8YW55PjtcblxuICAgIC8qKiBUaGUgdmFsdWUgb2YgdGhlIHNlbGVjdCBwYW5lbCdzIHRyYW5zZm9ybS1vcmlnaW4gcHJvcGVydHkuICovXG4gICAgdHJhbnNmb3JtT3JpZ2luOiBzdHJpbmcgPSAndG9wJztcblxuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSBwYW5lbCBlbGVtZW50IGlzIGZpbmlzaGVkIHRyYW5zZm9ybWluZyBpbi4gKi9cbiAgICBwYW5lbERvbmVBbmltYXRpbmdTdHJlYW0gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbiAgICAvKiogU3RyYXRlZ3kgdGhhdCB3aWxsIGJlIHVzZWQgdG8gaGFuZGxlIHNjcm9sbGluZyB3aGlsZSB0aGUgc2VsZWN0IHBhbmVsIGlzIG9wZW4uICovXG4gICAgc2Nyb2xsU3RyYXRlZ3kgPSB0aGlzLnNjcm9sbFN0cmF0ZWd5RmFjdG9yeSgpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHktb2Zmc2V0IG9mIHRoZSBvdmVybGF5IHBhbmVsIGluIHJlbGF0aW9uIHRvIHRoZSB0cmlnZ2VyJ3MgdG9wIHN0YXJ0IGNvcm5lci5cbiAgICAgKiBUaGlzIG11c3QgYmUgYWRqdXN0ZWQgdG8gYWxpZ24gdGhlIHNlbGVjdGVkIG9wdGlvbiB0ZXh0IG92ZXIgdGhlIHRyaWdnZXIgdGV4dC5cbiAgICAgKiB3aGVuIHRoZSBwYW5lbCBvcGVucy4gV2lsbCBjaGFuZ2UgYmFzZWQgb24gdGhlIHktcG9zaXRpb24gb2YgdGhlIHNlbGVjdGVkIG9wdGlvbi5cbiAgICAgKi9cbiAgICBvZmZzZXRZID0gMDtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgcG9zaXRpb24gY29uZmlnIGVuc3VyZXMgdGhhdCB0aGUgdG9wIFwic3RhcnRcIiBjb3JuZXIgb2YgdGhlIG92ZXJsYXlcbiAgICAgKiBpcyBhbGlnbmVkIHdpdGggd2l0aCB0aGUgdG9wIFwic3RhcnRcIiBvZiB0aGUgb3JpZ2luIGJ5IGRlZmF1bHQgKG92ZXJsYXBwaW5nXG4gICAgICogdGhlIHRyaWdnZXIgY29tcGxldGVseSkuIElmIHRoZSBwYW5lbCBjYW5ub3QgZml0IGJlbG93IHRoZSB0cmlnZ2VyLCBpdFxuICAgICAqIHdpbGwgZmFsbCBiYWNrIHRvIGEgcG9zaXRpb24gYWJvdmUgdGhlIHRyaWdnZXIuXG4gICAgICovXG4gICAgcG9zaXRpb25zOiBDb25uZWN0ZWRQb3NpdGlvbltdID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXG4gICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgIG92ZXJsYXlZOiAndG9wJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJ1xuICAgICAgICB9XG4gICAgXTtcblxuICAgIG9wdGlvbnM6IFF1ZXJ5TGlzdDxNY1RyZWVPcHRpb24+O1xuXG4gICAgQFZpZXdDaGlsZCgndHJpZ2dlcicsIHsgc3RhdGljOiBmYWxzZSB9KSB0cmlnZ2VyOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgncGFuZWwnLCB7IHN0YXRpYzogZmFsc2UgfSkgcGFuZWw6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKENka0Nvbm5lY3RlZE92ZXJsYXksIHsgc3RhdGljOiBmYWxzZSB9KSBvdmVybGF5RGlyOiBDZGtDb25uZWN0ZWRPdmVybGF5O1xuXG4gICAgQFZpZXdDaGlsZCgnaGlkZGVuSXRlbXNDb3VudGVyJywgeyBzdGF0aWM6IGZhbHNlIH0pIGhpZGRlbkl0ZW1zQ291bnRlcjogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGRyZW4oTWNUYWcpIHRhZ3M6IFF1ZXJ5TGlzdDxNY1RhZz47XG5cbiAgICBAQ29udGVudENoaWxkKCdtY1NlbGVjdENsZWFuZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBjbGVhbmVyOiBNY0NsZWFuZXI7XG5cbiAgICAvKiogVXNlci1zdXBwbGllZCBvdmVycmlkZSBvZiB0aGUgdHJpZ2dlciBlbGVtZW50LiAqL1xuICAgIEBDb250ZW50Q2hpbGQoTWNUcmVlU2VsZWN0VHJpZ2dlciwgeyBzdGF0aWM6IGZhbHNlIH0pIGN1c3RvbVRyaWdnZXI6IE1jVHJlZVNlbGVjdFRyaWdnZXI7XG5cbiAgICBAQ29udGVudENoaWxkKE1jVHJlZVNlbGVjdGlvbiwgeyBzdGF0aWM6IGZhbHNlIH0pIHRyZWU6IE1jVHJlZVNlbGVjdGlvbjtcblxuICAgIEBJbnB1dCgpIGhpZGRlbkl0ZW1zVGV4dDogc3RyaW5nID0gJy4uLtC10YnRkSc7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3QgcGFuZWwgaGFzIGJlZW4gdG9nZ2xlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgb3BlbmVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3QgaGFzIGJlZW4gb3BlbmVkLiAqL1xuICAgIEBPdXRwdXQoJ29wZW5lZCcpIHJlYWRvbmx5IG9wZW5lZFN0cmVhbTogT2JzZXJ2YWJsZTx2b2lkPiA9XG4gICAgICAgIHRoaXMub3BlbmVkQ2hhbmdlLnBpcGUoZmlsdGVyKChvKSA9PiBvKSwgbWFwKCgpID0+IHt9KSk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3QgaGFzIGJlZW4gY2xvc2VkLiAqL1xuICAgIEBPdXRwdXQoJ2Nsb3NlZCcpIHJlYWRvbmx5IGNsb3NlZFN0cmVhbTogT2JzZXJ2YWJsZTx2b2lkPiA9XG4gICAgICAgIHRoaXMub3BlbmVkQ2hhbmdlLnBpcGUoZmlsdGVyKChvKSA9PiAhbyksIG1hcCgoKSA9PiB7fSkpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0ZWQgdmFsdWUgaGFzIGJlZW4gY2hhbmdlZCBieSB0aGUgdXNlci4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxNY1RyZWVTZWxlY3RDaGFuZ2U+KCk7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSByYXcgdmFsdWUgb2YgdGhlIHNlbGVjdCBjaGFuZ2VzLiBUaGlzIGlzIGhlcmUgcHJpbWFyaWx5XG4gICAgICogdG8gZmFjaWxpdGF0ZSB0aGUgdHdvLXdheSBiaW5kaW5nIGZvciB0aGUgYHZhbHVlYCBpbnB1dC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgLyoqIENsYXNzZXMgdG8gYmUgcGFzc2VkIHRvIHRoZSBzZWxlY3QgcGFuZWwuIFN1cHBvcnRzIHRoZSBzYW1lIHN5bnRheCBhcyBgbmdDbGFzc2AuICovXG4gICAgQElucHV0KCkgcGFuZWxDbGFzczogc3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPiB8IHsgW2tleTogc3RyaW5nXTogYW55IH07XG5cbiAgICBASW5wdXQoKSBiYWNrZHJvcENsYXNzOiBzdHJpbmcgPSAnY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AnO1xuXG4gICAgLyoqIE9iamVjdCB1c2VkIHRvIGNvbnRyb2wgd2hlbiBlcnJvciBtZXNzYWdlcyBhcmUgc2hvd24uICovXG4gICAgQElucHV0KCkgZXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyO1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdXNlZCB0byBzb3J0IHRoZSB2YWx1ZXMgaW4gYSBzZWxlY3QgaW4gbXVsdGlwbGUgbW9kZS5cbiAgICAgKiBGb2xsb3dzIHRoZSBzYW1lIGxvZ2ljIGFzIGBBcnJheS5wcm90b3R5cGUuc29ydGAuXG4gICAgICovXG4gICAgQElucHV0KCkgc29ydENvbXBhcmF0b3I6IChhOiBNY1RyZWVPcHRpb24sIGI6IE1jVHJlZU9wdGlvbiwgb3B0aW9uczogTWNUcmVlT3B0aW9uW10pID0+IG51bWJlcjtcblxuICAgIC8qKiBDb21iaW5lZCBzdHJlYW0gb2YgYWxsIG9mIHRoZSBjaGlsZCBvcHRpb25zJyBjaGFuZ2UgZXZlbnRzLiAqL1xuICAgIHJlYWRvbmx5IG9wdGlvblNlbGVjdGlvbkNoYW5nZXM6IE9ic2VydmFibGU8TWNUcmVlU2VsZWN0Q2hhbmdlPiA9IGRlZmVyKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5jaGFuZ2VzLnBpcGUoXG4gICAgICAgICAgICAgICAgc3RhcnRXaXRoKHRoaXMub3B0aW9ucyksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IG1lcmdlKC4uLnRoaXMub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gb3B0aW9uLm9uU2VsZWN0aW9uQ2hhbmdlKSkpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubmdab25lLm9uU3RhYmxlXG4gICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSksIHN3aXRjaE1hcCgoKSA9PiB0aGlzLm9wdGlvblNlbGVjdGlvbkNoYW5nZXMpKTtcbiAgICB9KSBhcyBPYnNlcnZhYmxlPE1jVHJlZVNlbGVjdENoYW5nZT47XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBwbGFjZWhvbGRlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGxhY2Vob2xkZXI7XG4gICAgfVxuXG4gICAgc2V0IHBsYWNlaG9sZGVyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXIgPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7XG4gICAgfVxuXG4gICAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG11bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbXVsdGlwbGU7XG4gICAgfVxuXG4gICAgc2V0IG11bHRpcGxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGVsKSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRNY1NlbGVjdER5bmFtaWNNdWx0aXBsZUVycm9yKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9tdWx0aXBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGF1dG9TZWxlY3QoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRvU2VsZWN0O1xuICAgIH1cblxuICAgIHNldCBhdXRvU2VsZWN0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2F1dG9TZWxlY3QgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2F1dG9TZWxlY3Q6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gY29tcGFyZSB0aGUgb3B0aW9uIHZhbHVlcyB3aXRoIHRoZSBzZWxlY3RlZCB2YWx1ZXMuIFRoZSBmaXJzdCBhcmd1bWVudFxuICAgICAqIGlzIGEgdmFsdWUgZnJvbSBhbiBvcHRpb24uIFRoZSBzZWNvbmQgaXMgYSB2YWx1ZSBmcm9tIHRoZSBzZWxlY3Rpb24uIEEgYm9vbGVhblxuICAgICAqIHNob3VsZCBiZSByZXR1cm5lZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBjb21wYXJlV2l0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBhcmVXaXRoO1xuICAgIH1cblxuICAgIHNldCBjb21wYXJlV2l0aChmbjogKG8xOiBhbnksIG8yOiBhbnkpID0+IGJvb2xlYW4pIHtcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnN0cmljdC10eXBlLXByZWRpY2F0ZXMgKi9cbiAgICAgICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgZ2V0TWNTZWxlY3ROb25GdW5jdGlvblZhbHVlRXJyb3IoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NvbXBhcmVXaXRoID0gZm47XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZWwpIHtcbiAgICAgICAgICAgIC8vIEEgZGlmZmVyZW50IGNvbXBhcmF0b3IgbWVhbnMgdGhlIHNlbGVjdGlvbiBjb3VsZCBjaGFuZ2UuXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5tdWx0aXBsZSA/IHRoaXMudHJlZS5nZXRTZWxlY3RlZFZhbHVlcygpIDogdGhpcy50cmVlLmdldFNlbGVjdGVkVmFsdWVzKClbMF07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdmFsdWU6IGFueSA9IG51bGw7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBpZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfVxuXG4gICAgc2V0IGlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faWQgPSB2YWx1ZSB8fCB0aGlzLnVpZDtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lkOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBoYXNCYWNrZHJvcCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhc0JhY2tkcm9wO1xuICAgIH1cblxuICAgIHNldCBoYXNCYWNrZHJvcCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9oYXNCYWNrZHJvcCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGFzQmFja2Ryb3A6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBzZWxlY3QgaXMgZm9jdXNlZC4gKi9cbiAgICBnZXQgZm9jdXNlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZvY3VzZWQgfHwgdGhpcy5fcGFuZWxPcGVuO1xuICAgIH1cblxuICAgIHNldCBmb2N1c2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9mb2N1c2VkID0gZmFsc2U7XG5cbiAgICBnZXQgcGFuZWxPcGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFuZWxPcGVuO1xuICAgIH1cblxuICAgIGdldCBjYW5TaG93Q2xlYW5lcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xlYW5lciAmJiB0aGlzLnNlbGVjdGlvbk1vZGVsLmhhc1ZhbHVlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbG9zZVN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIHByaXZhdGUgX3BhbmVsT3BlbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBvcmlnaW5hbE9uS2V5RG93bjogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB2b2lkO1xuXG4gICAgLyoqIFRoZSBzY3JvbGwgcG9zaXRpb24gb2YgdGhlIG92ZXJsYXkgcGFuZWwsIGNhbGN1bGF0ZWQgdG8gY2VudGVyIHRoZSBzZWxlY3RlZCBvcHRpb24uICovXG4gICAgcHJpdmF0ZSBzY3JvbGxUb3AgPSAwO1xuXG4gICAgLyoqIFVuaXF1ZSBpZCBmb3IgdGhpcyBpbnB1dC4gKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IHVpZCA9IGBtYy1zZWxlY3QtJHtuZXh0VW5pcXVlSWQrK31gO1xuXG4gICAgLyoqIEVtaXRzIHdoZW5ldmVyIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkLiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICAvLyBVc2VkIGZvciBzdG9yaW5nIHRoZSB2YWx1ZXMgdGhhdCB3ZXJlIGFzc2lnbmVkIGJlZm9yZSB0aGUgb3B0aW9ucyB3ZXJlIGluaXRpYWxpemVkLlxuICAgIHByaXZhdGUgdGVtcFZhbHVlczogc3RyaW5nIHwgc3RyaW5nW10gfCBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHJlYWRvbmx5IGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSB2aWV3cG9ydFJ1bGVyOiBWaWV3cG9ydFJ1bGVyLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IG5nWm9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgICAgIEBJbmplY3QoTUNfU0VMRUNUX1NDUk9MTF9TVFJBVEVHWSkgcHJpdmF0ZSByZWFkb25seSBzY3JvbGxTdHJhdGVneUZhY3RvcnksXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTkdfVkFMSURBVE9SUykgcHVibGljIHJhd1ZhbGlkYXRvcnM6IFZhbGlkYXRvcltdLFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1DX1ZBTElEQVRJT04pIHByaXZhdGUgbWNWYWxpZGF0aW9uOiBNY1ZhbGlkYXRpb25PcHRpb25zLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJlYWRvbmx5IGRpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgIEBPcHRpb25hbCgpIHBhcmVudEZvcm06IE5nRm9ybSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcmVhZG9ubHkgcGFyZW50Rm9ybUZpZWxkOiBNY0Zvcm1GaWVsZCxcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBuZ0NvbnRyb2w6IE5nQ29udHJvbCxcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgbmdNb2RlbDogTmdNb2RlbCxcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgZm9ybUNvbnRyb2xOYW1lOiBGb3JtQ29udHJvbE5hbWVcbiAgICApIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZiwgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyLCBwYXJlbnRGb3JtLCBwYXJlbnRGb3JtR3JvdXAsIG5nQ29udHJvbCk7XG5cbiAgICAgICAgaWYgKHRoaXMubmdDb250cm9sKSB7XG4gICAgICAgICAgICAvLyBOb3RlOiB3ZSBwcm92aWRlIHRoZSB2YWx1ZSBhY2Nlc3NvciB0aHJvdWdoIGhlcmUsIGluc3RlYWQgb2ZcbiAgICAgICAgICAgIC8vIHRoZSBgcHJvdmlkZXJzYCB0byBhdm9pZCBydW5uaW5nIGludG8gYSBjaXJjdWxhciBpbXBvcnQuXG4gICAgICAgICAgICB0aGlzLm5nQ29udHJvbC52YWx1ZUFjY2Vzc29yID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZvcmNlIHNldHRlciB0byBiZSBjYWxsZWQgaW4gY2FzZSBpZCB3YXMgbm90IHNwZWNpZmllZC5cbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuaWQ7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcblxuICAgICAgICAvLyBXZSBuZWVkIGBkaXN0aW5jdFVudGlsQ2hhbmdlZGAgaGVyZSwgYmVjYXVzZSBzb21lIGJyb3dzZXJzIHdpbGxcbiAgICAgICAgLy8gZmlyZSB0aGUgYW5pbWF0aW9uIGVuZCBldmVudCB0d2ljZSBmb3IgdGhlIHNhbWUgYW5pbWF0aW9uLiBTZWU6XG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzI0MDg0XG4gICAgICAgIHRoaXMucGFuZWxEb25lQW5pbWF0aW5nU3RyZWFtXG4gICAgICAgICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLCB0YWtlVW50aWwodGhpcy5kZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvcCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbmVkQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheURpci5vZmZzZXRYID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy50cmVlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmICh0aGlzLm1jVmFsaWRhdGlvbi51c2VWYWxpZGF0aW9uKSB7XG4gICAgICAgICAgICBzZXRNb3NhaWNWYWxpZGF0aW9uKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmVlLnJlc2V0Rm9jdXNlZEl0ZW1PbkJsdXIgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsID0gdGhpcy50cmVlLnNlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsPGFueT4odGhpcy5tdWx0aXBsZSk7XG4gICAgICAgIHRoaXMudHJlZS5uZ0FmdGVyQ29udGVudEluaXQoKTtcblxuICAgICAgICB0aGlzLmluaXRLZXlNYW5hZ2VyKCk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy50cmVlLnJlbmRlcmVkT3B0aW9ucztcbiAgICAgICAgdGhpcy50cmVlLmF1dG9TZWxlY3QgPSB0aGlzLmF1dG9TZWxlY3Q7XG5cbiAgICAgICAgaWYgKHRoaXMudHJlZS5tdWx0aXBsZU1vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudHJlZS5tdWx0aXBsZU1vZGUgPSB0aGlzLm11bHRpcGxlID8gTXVsdGlwbGVNb2RlLkNIRUNLQk9YIDogbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLnRyZWUubm9VbnNlbGVjdExhc3QgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRlbXBWYWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uQnlWYWx1ZSh0aGlzLnRlbXBWYWx1ZXMpO1xuICAgICAgICAgICAgdGhpcy50ZW1wVmFsdWVzID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3B0aW9uU2VsZWN0aW9uQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSAmJiB0aGlzLnBhbmVsT3BlbiAmJiBldmVudC5pc1VzZXJJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50cmVlLnNlbGVjdGlvbkNoYW5nZVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5zZWxlY3RlZFZhbHVlcyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KG5ldyBNY1RyZWVTZWxlY3RDaGFuZ2UodGhpcywgZXZlbnQub3B0aW9uKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmNoYW5nZWRcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuYWRkZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLnNldEZvY3VzT3JpZ2luKCdwcm9ncmFtJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuZmluZCgob3B0aW9uKSA9PiBvcHRpb24uZGF0YSA9PT0gZXZlbnQuYWRkZWRbMF0pIGFzIGFueVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRyZWUpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy50YWdzLmNoYW5nZXNcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jYWxjdWxhdGVIaWRkZW5JdGVtcygpLCAwKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jYWxjdWxhdGVIaWRkZW5JdGVtcygpLCAwKTtcbiAgICB9XG5cbiAgICBuZ0RvQ2hlY2soKSB7XG4gICAgICAgIGlmICh0aGlzLm5nQ29udHJvbCkgeyB0aGlzLnVwZGF0ZUVycm9yU3RhdGUoKTsgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgLy8gVXBkYXRpbmcgdGhlIGRpc2FibGVkIHN0YXRlIGlzIGhhbmRsZWQgYnkgYG1peGluRGlzYWJsZWRgLCBidXQgd2UgbmVlZCB0byBhZGRpdGlvbmFsbHkgbGV0XG4gICAgICAgIC8vIHRoZSBwYXJlbnQgZm9ybSBmaWVsZCBrbm93IHRvIHJ1biBjaGFuZ2UgZGV0ZWN0aW9uIHdoZW4gdGhlIGRpc2FibGVkIHN0YXRlIGNoYW5nZXMuXG4gICAgICAgIGlmIChjaGFuZ2VzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5kZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMuY2xvc2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGhpZGRlbkl0ZW1zVGV4dEZvcm1hdHRlcihoaWRkZW5JdGVtc1RleHQ6IHN0cmluZywgaGlkZGVuSXRlbXM6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHtoaWRkZW5JdGVtc1RleHR9ICR7aGlkZGVuSXRlbXN9YDtcbiAgICB9XG5cbiAgICBjbGVhclZhbHVlKCRldmVudCk6IHZvaWQge1xuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuICAgICAgICB0aGlzLnRyZWUua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKC0xKTtcblxuICAgICAgICB0aGlzLnNldFNlbGVjdGlvbkJ5VmFsdWUoW10pO1xuXG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5zZWxlY3RlZFZhbHVlcyk7XG4gICAgfVxuXG4gICAgLyoqIGBWaWV3IC0+IG1vZGVsIGNhbGxiYWNrIGNhbGxlZCB3aGVuIHZhbHVlIGNoYW5nZXNgICovXG4gICAgb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgICAvKiogYFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gc2VsZWN0IGhhcyBiZWVuIHRvdWNoZWRgICovXG4gICAgb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgICB0b2dnbGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAhdGhpcy5vcHRpb25zIHx8ICF0aGlzLm9wdGlvbnMubGVuZ3RoIHx8IHRoaXMuX3BhbmVsT3BlbikgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnRyaWdnZXJSZWN0ID0gdGhpcy50cmlnZ2VyLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIC8vIE5vdGU6IFRoZSBjb21wdXRlZCBmb250LXNpemUgd2lsbCBiZSBhIHN0cmluZyBwaXhlbCB2YWx1ZSAoZS5nLiBcIjE2cHhcIikuXG4gICAgICAgIC8vIGBwYXJzZUludGAgaWdub3JlcyB0aGUgdHJhaWxpbmcgJ3B4JyBhbmQgY29udmVydHMgdGhpcyB0byBhIG51bWJlci5cbiAgICAgICAgdGhpcy50cmlnZ2VyRm9udFNpemUgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKHRoaXMudHJpZ2dlci5uYXRpdmVFbGVtZW50KVsnZm9udC1zaXplJ10pO1xuXG4gICAgICAgIHRoaXMuX3BhbmVsT3BlbiA9IHRydWU7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZ2hsaWdodENvcnJlY3RPcHRpb24oKSk7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcblxuICAgICAgICAvLyBTZXQgdGhlIGZvbnQgc2l6ZSBvbiB0aGUgcGFuZWwgZWxlbWVudCBvbmNlIGl0IGV4aXN0cy5cbiAgICAgICAgdGhpcy5uZ1pvbmUub25TdGFibGUuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlnZ2VyRm9udFNpemUgJiYgdGhpcy5vdmVybGF5RGlyLm92ZXJsYXlSZWYgJiYgdGhpcy5vdmVybGF5RGlyLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5RGlyLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuc3R5bGUuZm9udFNpemUgPSBgJHt0aGlzLnRyaWdnZXJGb250U2l6ZX1weGA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIENsb3NlcyB0aGUgb3ZlcmxheSBwYW5lbCBhbmQgZm9jdXNlcyB0aGUgaG9zdCBlbGVtZW50LiAqL1xuICAgIGNsb3NlKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX3BhbmVsT3BlbikgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLl9wYW5lbE9wZW4gPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5mb2N1cygpLCAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBzZWxlY3QncyB2YWx1ZS4gUGFydCBvZiB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gICAgICogcmVxdWlyZWQgdG8gaW50ZWdyYXRlIHdpdGggQW5ndWxhcidzIGNvcmUgZm9ybXMgQVBJLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlIE5ldyB2YWx1ZSB0byBiZSB3cml0dGVuIHRvIHRoZSBtb2RlbC5cbiAgICAgKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudHJlZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25CeVZhbHVlKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGVtcFZhbHVlcyA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2F2ZXMgYSBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBpbnZva2VkIHdoZW4gdGhlIHNlbGVjdCdzIHZhbHVlXG4gICAgICogY2hhbmdlcyBmcm9tIHVzZXIgaW5wdXQuIFBhcnQgb2YgdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICAgICAqIHJlcXVpcmVkIHRvIGludGVncmF0ZSB3aXRoIEFuZ3VsYXIncyBjb3JlIGZvcm1zIEFQSS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmbiBDYWxsYmFjayB0byBiZSB0cmlnZ2VyZWQgd2hlbiB0aGUgdmFsdWUgY2hhbmdlcy5cbiAgICAgKi9cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCkge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2F2ZXMgYSBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBpbnZva2VkIHdoZW4gdGhlIHNlbGVjdCBpcyBibHVycmVkXG4gICAgICogYnkgdGhlIHVzZXIuIFBhcnQgb2YgdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZSByZXF1aXJlZFxuICAgICAqIHRvIGludGVncmF0ZSB3aXRoIEFuZ3VsYXIncyBjb3JlIGZvcm1zIEFQSS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmbiBDYWxsYmFjayB0byBiZSB0cmlnZ2VyZWQgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIHRvdWNoZWQuXG4gICAgICovXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZXMgdGhlIHNlbGVjdC4gUGFydCBvZiB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlIHJlcXVpcmVkXG4gICAgICogdG8gaW50ZWdyYXRlIHdpdGggQW5ndWxhcidzIGNvcmUgZm9ybXMgQVBJLlxuICAgICAqXG4gICAgICogQHBhcmFtIGlzRGlzYWJsZWQgU2V0cyB3aGV0aGVyIHRoZSBjb21wb25lbnQgaXMgZGlzYWJsZWQuXG4gICAgICovXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGVkKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlID8gdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZCA6IHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF07XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGVkVmFsdWVzKCk6IGFueSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVmFsdWVzID0gdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZC5tYXAoKHZhbHVlKSA9PiB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZ2V0VmFsdWUodmFsdWUpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5tdWx0aXBsZSA/IHNlbGVjdGVkVmFsdWVzIDogc2VsZWN0ZWRWYWx1ZXNbMF07XG4gICAgfVxuXG4gICAgZ2V0IHRyaWdnZXJWYWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5lbXB0eSkgeyByZXR1cm4gJyc7IH1cblxuICAgICAgICByZXR1cm4gdGhpcy50cmVlLnRyZWVDb250cm9sLmdldFZpZXdWYWx1ZSh0aGlzLnNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICBnZXQgdHJpZ2dlclZhbHVlcygpOiBNY1RyZWVPcHRpb25bXSB7XG4gICAgICAgIGlmICh0aGlzLmVtcHR5KSB7IHJldHVybiBbXTsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkVmFsdWVzXG4gICAgICAgICAgICAubWFwKCh2YWx1ZSkgPT4gdGhpcy50cmVlLnJlbmRlcmVkT3B0aW9ucy5maW5kKChvcHRpb24pID0+IG9wdGlvbi52YWx1ZSA9PT0gdmFsdWUpKVxuICAgICAgICAgICAgLmZpbHRlcigob3B0aW9uKSA9PiBvcHRpb24pO1xuICAgIH1cblxuICAgIGdldCBlbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnNlbGVjdGlvbk1vZGVsIHx8IHRoaXMuc2VsZWN0aW9uTW9kZWwuaXNFbXB0eSgpO1xuICAgIH1cblxuICAgIGlzUnRsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXIgPyB0aGlzLmRpci52YWx1ZSA9PT0gJ3J0bCcgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVPcGVuS2V5ZG93bihldmVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2xvc2VkS2V5ZG93bihldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkZvY3VzKCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyB0aGUgdG91Y2hlZCBjYWxsYmFjayBvbmx5IGlmIHRoZSBwYW5lbCBpcyBjbG9zZWQuIE90aGVyd2lzZSwgdGhlIHRyaWdnZXIgd2lsbFxuICAgICAqIFwiYmx1clwiIHRvIHRoZSBwYW5lbCB3aGVuIGl0IG9wZW5zLCBjYXVzaW5nIGEgZmFsc2UgcG9zaXRpdmUuXG4gICAgICovXG4gICAgb25CbHVyKCkge1xuICAgICAgICB0aGlzLl9mb2N1c2VkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkICYmICF0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQ2FsbGJhY2sgdGhhdCBpcyBpbnZva2VkIHdoZW4gdGhlIG92ZXJsYXkgcGFuZWwgaGFzIGJlZW4gYXR0YWNoZWQuICovXG4gICAgb25BdHRhY2hlZCgpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5RGlyLnBvc2l0aW9uQ2hhbmdlXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVPdmVybGF5T2Zmc2V0WCgpO1xuICAgICAgICAgICAgICAgIHRoaXMucGFuZWwubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSB0aGlzLnNjcm9sbFRvcDtcblxuICAgICAgICAgICAgICAgIHRoaXMudHJlZS51cGRhdGVTY3JvbGxTaXplKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNsb3NlU3Vic2NyaXB0aW9uID0gdGhpcy5jbG9zaW5nQWN0aW9ucygpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgdGhlIHRoZW1lIHRvIGJlIHVzZWQgb24gdGhlIHBhbmVsLiAqL1xuICAgIGdldFBhbmVsVGhlbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Rm9ybUZpZWxkID8gYG1jLSR7dGhpcy5wYXJlbnRGb3JtRmllbGQuY29sb3J9YCA6ICcnO1xuICAgIH1cblxuICAgIGZvY3VzKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBvbkNvbnRhaW5lckNsaWNrKCkge1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLyoqIEludm9rZWQgd2hlbiBhbiBvcHRpb24gaXMgY2xpY2tlZC4gKi9cbiAgICBvblJlbW92ZVNlbGVjdGVkT3B0aW9uKHNlbGVjdGVkT3B0aW9uOiBhbnksICRldmVudCkge1xuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbFxuICAgICAgICAgICAgLmRlc2VsZWN0KHRoaXMuc2VsZWN0ZWQuZmluZCgodmFsdWUpID0+IHRoaXMudHJlZS50cmVlQ29udHJvbC5nZXRWYWx1ZSh2YWx1ZSkgPT09IHNlbGVjdGVkT3B0aW9uLnZhbHVlKSk7XG5cbiAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnNlbGVjdGVkVmFsdWVzKTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVIaWRkZW5JdGVtcygpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tVHJpZ2dlciB8fCB0aGlzLmVtcHR5IHx8ICF0aGlzLm11bHRpcGxlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGxldCB2aXNpYmxlSXRlbXM6IG51bWJlciA9IDA7XG4gICAgICAgIGNvbnN0IHRvdGFsSXRlbXNXaWR0aCA9IHRoaXMuZ2V0VG90YWxJdGVtc1dpZHRoSW5NYXRjaGVyKCk7XG4gICAgICAgIGxldCB0b3RhbFZpc2libGVJdGVtc1dpZHRoOiBudW1iZXIgPSAwO1xuXG4gICAgICAgIHRoaXMudGFncy5mb3JFYWNoKCh0YWcpID0+IHtcbiAgICAgICAgICAgIGlmICh0YWcubmF0aXZlRWxlbWVudC5vZmZzZXRUb3AgPCB0YWcubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICB0b3RhbFZpc2libGVJdGVtc1dpZHRoICs9IHRoaXMuZ2V0SXRlbVdpZHRoKHRhZy5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgICAgICB2aXNpYmxlSXRlbXMrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5oaWRkZW5JdGVtcyA9IHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWQubGVuZ3RoIC0gdmlzaWJsZUl0ZW1zO1xuXG4gICAgICAgIGlmICh0aGlzLmhpZGRlbkl0ZW1zKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtc0NvdW50ZXIgPSB0aGlzLnRyaWdnZXIubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWMtdHJlZS1zZWxlY3RfX21hdGNoLWhpZGRlbi10ZXh0Jyk7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVyTGlzdCA9IHRoaXMudHJpZ2dlci5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYy10cmVlLXNlbGVjdF9fbWF0Y2gtbGlzdCcpO1xuXG4gICAgICAgICAgICBjb25zdCBpdGVtc0NvdW50ZXJTaG93ZWQgPSBpdGVtc0NvdW50ZXIub2Zmc2V0VG9wIDwgaXRlbXNDb3VudGVyLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIC8vIGNvbnN0IGl0ZW1zQ291bnRlcldpZHRoOiBudW1iZXIgPSBpdGVtc0NvdW50ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBpdGVtc0NvdW50ZXJXaWR0aDogbnVtYmVyID0gODY7XG5cbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXJMaXN0V2lkdGg6IG51bWJlciA9IG1hdGNoZXJMaXN0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlcldpZHRoOiBudW1iZXIgPSBtYXRjaGVyTGlzdFdpZHRoICsgaXRlbXNDb3VudGVyV2lkdGg7XG5cbiAgICAgICAgICAgIGlmIChpdGVtc0NvdW50ZXJTaG93ZWQgJiYgKHRvdGFsSXRlbXNXaWR0aCA8IG1hdGNoZXJXaWR0aCkpIHsgdGhpcy5oaWRkZW5JdGVtcyA9IDA7IH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRvdGFsVmlzaWJsZUl0ZW1zV2lkdGggPT09IG1hdGNoZXJMaXN0V2lkdGggfHxcbiAgICAgICAgICAgICAgICAodG90YWxWaXNpYmxlSXRlbXNXaWR0aCArIGl0ZW1zQ291bnRlcldpZHRoKSA8IG1hdGNoZXJMaXN0V2lkdGhcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghaXRlbXNDb3VudGVyU2hvd2VkICYmICh0b3RhbEl0ZW1zV2lkdGggKyBpdGVtc0NvdW50ZXJXaWR0aCkgPiBtYXRjaGVyV2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkl0ZW1zKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2xvc2luZ0FjdGlvbnMoKSB7XG4gICAgICAgIGNvbnN0IGJhY2tkcm9wID0gdGhpcy5vdmVybGF5RGlyLm92ZXJsYXlSZWYhLmJhY2tkcm9wQ2xpY2soKTtcbiAgICAgICAgY29uc3Qgb3V0c2lkZVBvaW50ZXJFdmVudHMgPSB0aGlzLm92ZXJsYXlEaXIub3ZlcmxheVJlZiEub3V0c2lkZVBvaW50ZXJFdmVudHMoKTtcbiAgICAgICAgY29uc3QgZGV0YWNobWVudHMgPSB0aGlzLm92ZXJsYXlEaXIub3ZlcmxheVJlZiEuZGV0YWNobWVudHMoKTtcblxuICAgICAgICByZXR1cm4gbWVyZ2UoYmFja2Ryb3AsIG91dHNpZGVQb2ludGVyRXZlbnRzLCBkZXRhY2htZW50cyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUb3RhbEl0ZW1zV2lkdGhJbk1hdGNoZXIoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgdHJpZ2dlckNsb25lID0gdGhpcy50cmlnZ2VyLm5hdGl2ZUVsZW1lbnQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICB0cmlnZ2VyQ2xvbmUucXVlcnlTZWxlY3RvcignLm1jLXRyZWUtc2VsZWN0X19tYXRjaC1oaWRkZW4tdGV4dCcpLnJlbW92ZSgpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodHJpZ2dlckNsb25lLCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0cmlnZ2VyQ2xvbmUsICd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRyaWdnZXJDbG9uZSwgJ3RvcCcsICctMTAwJScpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRyaWdnZXJDbG9uZSwgJ2xlZnQnLCAnMCcpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy50cmlnZ2VyLm5hdGl2ZUVsZW1lbnQsIHRyaWdnZXJDbG9uZSk7XG5cbiAgICAgICAgbGV0IHRvdGFsSXRlbXNXaWR0aDogbnVtYmVyID0gMDtcbiAgICAgICAgdHJpZ2dlckNsb25lLnF1ZXJ5U2VsZWN0b3JBbGwoJ21jLXRhZycpLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHRvdGFsSXRlbXNXaWR0aCArPSB0aGlzLmdldEl0ZW1XaWR0aChpdGVtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdHJpZ2dlckNsb25lLnJlbW92ZSgpO1xuXG4gICAgICAgIHJldHVybiB0b3RhbEl0ZW1zV2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRJdGVtV2lkdGgoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG5cbiAgICAgICAgY29uc3Qgd2lkdGg6IG51bWJlciA9IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUud2lkdGggYXMgc3RyaW5nKTtcbiAgICAgICAgY29uc3QgbWFyZ2luTGVmdDogbnVtYmVyID0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS5tYXJnaW5MZWZ0IGFzIHN0cmluZyk7XG4gICAgICAgIGNvbnN0IG1hcmdpblJpZ2h0OiBudW1iZXIgPSBwYXJzZUludChjb21wdXRlZFN0eWxlLm1hcmdpblJpZ2h0IGFzIHN0cmluZyk7XG5cbiAgICAgICAgcmV0dXJuIHdpZHRoICsgbWFyZ2luTGVmdCArIG1hcmdpblJpZ2h0O1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlQ2xvc2VkS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuICAgICAgICBjb25zdCBpc0Fycm93S2V5ID0ga2V5Q29kZSA9PT0gRE9XTl9BUlJPVyB8fCBrZXlDb2RlID09PSBVUF9BUlJPVyB8fFxuICAgICAgICAgICAga2V5Q29kZSA9PT0gTEVGVF9BUlJPVyB8fCBrZXlDb2RlID09PSBSSUdIVF9BUlJPVztcbiAgICAgICAgY29uc3QgaXNPcGVuS2V5ID0ga2V5Q29kZSA9PT0gRU5URVIgfHwga2V5Q29kZSA9PT0gU1BBQ0U7XG5cbiAgICAgICAgLy8gT3BlbiB0aGUgc2VsZWN0IG9uIEFMVCArIGFycm93IGtleSB0byBtYXRjaCB0aGUgbmF0aXZlIDxzZWxlY3Q+XG4gICAgICAgIGlmIChpc09wZW5LZXkgfHwgKCh0aGlzLm11bHRpcGxlIHx8IGV2ZW50LmFsdEtleSkgJiYgaXNBcnJvd0tleSkpIHtcbiAgICAgICAgICAgIC8vIHByZXZlbnRzIHRoZSBwYWdlIGZyb20gc2Nyb2xsaW5nIGRvd24gd2hlbiBwcmVzc2luZyBzcGFjZVxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMubXVsdGlwbGUgJiYgdGhpcy50cmVlLmtleU1hbmFnZXIgJiYgdGhpcy50cmVlLmtleU1hbmFnZXIub25LZXlkb3duKSB7XG4gICAgICAgICAgICB0aGlzLnRyZWUua2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVPcGVuS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgKi9cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG4gICAgICAgIGNvbnN0IGlzQXJyb3dLZXkgPSBrZXlDb2RlID09PSBET1dOX0FSUk9XIHx8IGtleUNvZGUgPT09IFVQX0FSUk9XO1xuXG4gICAgICAgIGlmIChpc0Fycm93S2V5ICYmIGV2ZW50LmFsdEtleSkge1xuICAgICAgICAgICAgLy8gQ2xvc2UgdGhlIHNlbGVjdCBvbiBBTFQgKyBhcnJvdyBrZXkgdG8gbWF0Y2ggdGhlIG5hdGl2ZSA8c2VsZWN0PlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IExFRlRfQVJST1cgfHwga2V5Q29kZSA9PT0gUklHSFRfQVJST1cpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9yaWdpbmFsT25LZXlEb3duLmNhbGwodGhpcy50cmVlLCBldmVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gSE9NRSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy50cmVlLmtleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gRU5EKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLnRyZWUua2V5TWFuYWdlci5zZXRMYXN0SXRlbUFjdGl2ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFBBR0VfVVApIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLnNldFByZXZpb3VzUGFnZUl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBQQUdFX0RPV04pIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLnNldE5leHRQYWdlSXRlbUFjdGl2ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKChrZXlDb2RlID09PSBFTlRFUiB8fCBrZXlDb2RlID09PSBTUEFDRSkgJiYgdGhpcy50cmVlLmtleU1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmF1dG9TZWxlY3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnRvZ2dsZSh0aGlzLnRyZWUua2V5TWFuYWdlci5hY3RpdmVJdGVtLmRhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tdWx0aXBsZSAmJiBrZXlDb2RlID09PSBBICYmIGV2ZW50LmN0cmxLZXkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGhhc0Rlc2VsZWN0ZWRPcHRpb25zID0gdGhpcy5vcHRpb25zLnNvbWUoKG9wdGlvbikgPT4gIW9wdGlvbi5zZWxlY3RlZCk7XG5cbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzRGVzZWxlY3RlZE9wdGlvbnMgJiYgIW9wdGlvbi5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb24uc2VsZWN0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c2x5Rm9jdXNlZEluZGV4ID0gdGhpcy50cmVlLmtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4O1xuXG4gICAgICAgICAgICB0aGlzLnRyZWUua2V5TWFuYWdlci5zZXRGb2N1c09yaWdpbigna2V5Ym9hcmQnKTtcbiAgICAgICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLm11bHRpcGxlICYmIGlzQXJyb3dLZXkgJiYgZXZlbnQuc2hpZnRLZXkgJiYgdGhpcy50cmVlLmtleU1hbmFnZXIuYWN0aXZlSXRlbSAmJlxuICAgICAgICAgICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCAhPT0gcHJldmlvdXNseUZvY3VzZWRJbmRleFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmVlLmtleU1hbmFnZXIuYWN0aXZlSXRlbS5zZWxlY3RWaWFJbnRlcmFjdGlvbihldmVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9TZWxlY3QgJiYgdGhpcy50cmVlLmtleU1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJlZS5zZXRTZWxlY3RlZE9wdGlvbnNCeUtleShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmtleU1hbmFnZXIuYWN0aXZlSXRlbSwgaGFzTW9kaWZpZXJLZXkoZXZlbnQsICdzaGlmdEtleScpLCBoYXNNb2RpZmllcktleShldmVudCwgJ2N0cmxLZXknKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRpYWxpemVTZWxlY3Rpb24oKSB7XG4gICAgICAgIC8vIERlZmVyIHNldHRpbmcgdGhlIHZhbHVlIGluIG9yZGVyIHRvIGF2b2lkIHRoZSBcIkV4cHJlc3Npb25cbiAgICAgICAgLy8gaGFzIGNoYW5nZWQgYWZ0ZXIgaXQgd2FzIGNoZWNrZWRcIiBlcnJvcnMgZnJvbSBBbmd1bGFyLlxuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uQnlWYWx1ZSh0aGlzLm5nQ29udHJvbCA/IHRoaXMubmdDb250cm9sLnZhbHVlIDogdGhpcy5fdmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBzZWxlY3RlZCBvcHRpb24gYmFzZWQgb24gYSB2YWx1ZS4gSWYgbm8gb3B0aW9uIGNhbiBiZVxuICAgICAqIGZvdW5kIHdpdGggdGhlIGRlc2lnbmF0ZWQgdmFsdWUsIHRoZSBzZWxlY3QgdHJpZ2dlciBpcyBjbGVhcmVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgc2V0U2VsZWN0aW9uQnlWYWx1ZSh2YWx1ZTogYW55IHwgYW55W10pIHtcbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHsgdGhyb3cgZ2V0TWNTZWxlY3ROb25BcnJheVZhbHVlRXJyb3IoKTsgfVxuXG4gICAgICAgICAgICB0aGlzLnRyZWUuc2V0T3B0aW9uc0Zyb21WYWx1ZXModmFsdWUpO1xuXG4gICAgICAgICAgICB0aGlzLnNvcnRWYWx1ZXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHJlZS5zZXRPcHRpb25zRnJvbVZhbHVlcyhbdmFsdWVdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEtleU1hbmFnZXIoKSB7XG4gICAgICAgIHRoaXMub3JpZ2luYWxPbktleURvd24gPSB0aGlzLnRyZWUub25LZXlEb3duO1xuXG4gICAgICAgIHRoaXMudHJlZS5vbktleURvd24gPSAoKSA9PiB7fTtcblxuICAgICAgICB0aGlzLnRyZWUua2V5TWFuYWdlci50YWJPdXRcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gUmVzdG9yZSBmb2N1cyB0byB0aGUgdHJpZ2dlciBiZWZvcmUgY2xvc2luZy4gRW5zdXJlcyB0aGF0IHRoZSBmb2N1c1xuICAgICAgICAgICAgICAgIC8vIHBvc2l0aW9uIHdvbid0IGJlIGxvc3QgaWYgdGhlIHVzZXIgZ290IGZvY3VzIGludG8gdGhlIG92ZXJsYXkuXG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLmNoYW5nZVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcGFuZWxPcGVuICYmIHRoaXMucGFuZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxBY3RpdmVPcHRpb25JbnRvVmlldygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX3BhbmVsT3BlbiAmJiAhdGhpcy5tdWx0aXBsZSAmJiB0aGlzLnRyZWUua2V5TWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0uc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogU29ydHMgdGhlIHNlbGVjdGVkIHZhbHVlcyBpbiB0aGUgc2VsZWN0ZWQgYmFzZWQgb24gdGhlaXIgb3JkZXIgaW4gdGhlIHBhbmVsLiAqL1xuICAgIHByaXZhdGUgc29ydFZhbHVlcygpIHtcbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMudG9BcnJheSgpO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zb3J0Q29tcGFyYXRvciA/IHRoaXMuc29ydENvbXBhcmF0b3IoYSwgYiwgb3B0aW9ucykgOlxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmluZGV4T2YoYSkgLSBvcHRpb25zLmluZGV4T2YoYik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlnaGxpZ2h0cyB0aGUgc2VsZWN0ZWQgaXRlbS4gSWYgbm8gb3B0aW9uIGlzIHNlbGVjdGVkLCBpdCB3aWxsIGhpZ2hsaWdodFxuICAgICAqIHRoZSBmaXJzdCBpdGVtIGluc3RlYWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBoaWdobGlnaHRDb3JyZWN0T3B0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5lbXB0eSB8fCAhdGhpcy50cmVlLmtleU1hbmFnZXIpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgY29uc3QgZmlyc3RTZWxlY3RlZFZhbHVlID0gdGhpcy5tdWx0aXBsZSA/IHRoaXMuc2VsZWN0ZWRWYWx1ZXNbMF0gOiB0aGlzLnNlbGVjdGVkVmFsdWVzO1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gdGhpcy5vcHRpb25zLmZpbmQoKG9wdGlvbikgPT4gb3B0aW9uLnZhbHVlID09PSBmaXJzdFNlbGVjdGVkVmFsdWUpO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZE9wdGlvbikge1xuICAgICAgICAgICAgdGhpcy50cmVlLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShzZWxlY3RlZE9wdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogU2Nyb2xscyB0aGUgYWN0aXZlIG9wdGlvbiBpbnRvIHZpZXcuICovXG4gICAgcHJpdmF0ZSBzY3JvbGxBY3RpdmVPcHRpb25JbnRvVmlldygpIHtcbiAgICAgICAgY29uc3QgYWN0aXZlT3B0aW9uSW5kZXggPSB0aGlzLnRyZWUua2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggfHwgMDtcblxuICAgICAgICB0aGlzLnBhbmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gZ2V0T3B0aW9uU2Nyb2xsUG9zaXRpb24oXG4gICAgICAgICAgICBhY3RpdmVPcHRpb25JbmRleCxcbiAgICAgICAgICAgIHRoaXMudHJlZS5nZXRJdGVtSGVpZ2h0KCksXG4gICAgICAgICAgICB0aGlzLnBhbmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgU0VMRUNUX1BBTkVMX01BWF9IRUlHSFRcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB4LW9mZnNldCBvZiB0aGUgb3ZlcmxheSBwYW5lbCBpbiByZWxhdGlvbiB0byB0aGUgdHJpZ2dlcidzIHRvcCBzdGFydCBjb3JuZXIuXG4gICAgICogVGhpcyBtdXN0IGJlIGFkanVzdGVkIHRvIGFsaWduIHRoZSBzZWxlY3RlZCBvcHRpb24gdGV4dCBvdmVyIHRoZSB0cmlnZ2VyIHRleHQgd2hlblxuICAgICAqIHRoZSBwYW5lbCBvcGVucy4gV2lsbCBjaGFuZ2UgYmFzZWQgb24gTFRSIG9yIFJUTCB0ZXh0IGRpcmVjdGlvbi4gTm90ZSB0aGF0IHRoZSBvZmZzZXRcbiAgICAgKiBjYW4ndCBiZSBjYWxjdWxhdGVkIHVudGlsIHRoZSBwYW5lbCBoYXMgYmVlbiBhdHRhY2hlZCwgYmVjYXVzZSB3ZSBuZWVkIHRvIGtub3cgdGhlXG4gICAgICogY29udGVudCB3aWR0aCBpbiBvcmRlciB0byBjb25zdHJhaW4gdGhlIHBhbmVsIHdpdGhpbiB0aGUgdmlld3BvcnQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVPdmVybGF5T2Zmc2V0WCgpIHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheVJlY3QgPSB0aGlzLm92ZXJsYXlEaXIub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3Qgdmlld3BvcnRTaXplID0gdGhpcy52aWV3cG9ydFJ1bGVyLmdldFZpZXdwb3J0U2l6ZSgpO1xuICAgICAgICBjb25zdCBpc1J0bCA9IHRoaXMuaXNSdGwoKTtcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnMgKi9cbiAgICAgICAgY29uc3QgcGFkZGluZ1dpZHRoID0gU0VMRUNUX1BBTkVMX1BBRERJTkdfWCAqIDI7XG4gICAgICAgIGxldCBvZmZzZXRYOiBudW1iZXIgPSBTRUxFQ1RfUEFORUxfUEFERElOR19YO1xuXG4gICAgICAgIC8vIEludmVydCB0aGUgb2Zmc2V0IGluIExUUi5cbiAgICAgICAgaWYgKCFpc1J0bCkgeyBvZmZzZXRYICo9IC0xOyB9XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIGhvdyBtdWNoIHRoZSBzZWxlY3Qgb3ZlcmZsb3dzIG9uIGVhY2ggc2lkZS5cbiAgICAgICAgY29uc3QgbGVmdE92ZXJmbG93ID0gMCAtIChvdmVybGF5UmVjdC5sZWZ0ICsgb2Zmc2V0WCAtIChpc1J0bCA/IHBhZGRpbmdXaWR0aCA6IDApKTtcbiAgICAgICAgY29uc3QgcmlnaHRPdmVyZmxvdyA9IG92ZXJsYXlSZWN0LnJpZ2h0ICsgb2Zmc2V0WCAtIHZpZXdwb3J0U2l6ZS53aWR0aFxuICAgICAgICAgICAgKyAoaXNSdGwgPyAwIDogcGFkZGluZ1dpZHRoKTtcblxuICAgICAgICAvLyBJZiB0aGUgZWxlbWVudCBvdmVyZmxvd3Mgb24gZWl0aGVyIHNpZGUsIHJlZHVjZSB0aGUgb2Zmc2V0IHRvIGFsbG93IGl0IHRvIGZpdC5cbiAgICAgICAgaWYgKGxlZnRPdmVyZmxvdyA+IDApIHtcbiAgICAgICAgICAgIG9mZnNldFggKz0gbGVmdE92ZXJmbG93ICsgU0VMRUNUX1BBTkVMX1ZJRVdQT1JUX1BBRERJTkc7XG4gICAgICAgIH0gZWxzZSBpZiAocmlnaHRPdmVyZmxvdyA+IDApIHtcbiAgICAgICAgICAgIG9mZnNldFggLT0gcmlnaHRPdmVyZmxvdyArIFNFTEVDVF9QQU5FTF9WSUVXUE9SVF9QQURESU5HO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0IHRoZSBvZmZzZXQgZGlyZWN0bHkgaW4gb3JkZXIgdG8gYXZvaWQgaGF2aW5nIHRvIGdvIHRocm91Z2ggY2hhbmdlIGRldGVjdGlvbiBhbmRcbiAgICAgICAgLy8gcG90ZW50aWFsbHkgdHJpZ2dlcmluZyBcImNoYW5nZWQgYWZ0ZXIgaXQgd2FzIGNoZWNrZWRcIiBlcnJvcnMuIFJvdW5kIHRoZSB2YWx1ZSB0byBhdm9pZFxuICAgICAgICAvLyBibHVycnkgY29udGVudCBpbiBzb21lIGJyb3dzZXJzLlxuICAgICAgICB0aGlzLm92ZXJsYXlEaXIub2Zmc2V0WCA9IE1hdGgucm91bmQob2Zmc2V0WCk7XG4gICAgICAgIHRoaXMub3ZlcmxheURpci5vdmVybGF5UmVmLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqIENvbXBhcmlzb24gZnVuY3Rpb24gdG8gc3BlY2lmeSB3aGljaCBvcHRpb24gaXMgZGlzcGxheWVkLiBEZWZhdWx0cyB0byBvYmplY3QgZXF1YWxpdHkuICovXG4gICAgcHJpdmF0ZSBfY29tcGFyZVdpdGggPSAobzE6IGFueSwgbzI6IGFueSkgPT4gbzEgPT09IG8yO1xufVxuIiwiPGRpdiBjZGstb3ZlcmxheS1vcmlnaW5cbiAgICAgY2xhc3M9XCJtYy10cmVlLXNlbGVjdF9fdHJpZ2dlclwiXG4gICAgIFtjbGFzcy5tYy10cmVlLXNlbGVjdF9fdHJpZ2dlcl9tdWx0aXBsZV09XCJtdWx0aXBsZVwiXG4gICAgICNvcmlnaW49XCJjZGtPdmVybGF5T3JpZ2luXCJcbiAgICAgI3RyaWdnZXI+XG4gICAgPGRpdiBjbGFzcz1cIm1jLXRyZWUtc2VsZWN0X19tYXRjaGVyXCIgW25nU3dpdGNoXT1cImVtcHR5XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibWMtdHJlZS1zZWxlY3RfX3BsYWNlaG9sZGVyXCIgKm5nU3dpdGNoQ2FzZT1cInRydWVcIj57eyBwbGFjZWhvbGRlciB8fCAnXFx1MDBBMCcgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCJmYWxzZVwiIFtuZ1N3aXRjaF09XCIhIWN1c3RvbVRyaWdnZXJcIj5cbiAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoRGVmYXVsdCBbbmdTd2l0Y2hdPVwibXVsdGlwbGVcIiBjbGFzcz1cIm1jLXRyZWUtc2VsZWN0X19tYXRjaC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiZmFsc2VcIiBjbGFzcz1cIm1jLXRyZWUtc2VsZWN0X19tYXRjaGVyLXRleHRcIj57eyB0cmlnZ2VyVmFsdWUgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiIGNsYXNzPVwibWMtdHJlZS1zZWxlY3RfX211bHRpcGxlLW1hdGNoZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1jLXRyZWUtc2VsZWN0X19tYXRjaC1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWMtdGFnICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgdHJpZ2dlclZhbHVlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3NlbGVjdGFibGVdPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJvcHRpb24uZGlzYWJsZWQgfHwgZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5tYy1lcnJvcl09XCJlcnJvclN0YXRlXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBvcHRpb24udmlld1ZhbHVlIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgbWMtaWNvbj1cIm1jLWNsb3NlLVNfMTZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiIW9wdGlvbi5kaXNhYmxlZCAmJiAhZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvblJlbW92ZVNlbGVjdGVkT3B0aW9uKG9wdGlvbiwgJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbWMtdGFnPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1jLXRyZWUtc2VsZWN0X19tYXRjaC1oaWRkZW4tdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwiaGlkZGVuSXRlbXMgPiAwID8gJ2Jsb2NrJyA6ICdub25lJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgI2hpZGRlbkl0ZW1zQ291bnRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IGhpZGRlbkl0ZW1zVGV4dEZvcm1hdHRlcihoaWRkZW5JdGVtc1RleHQsIGhpZGRlbkl0ZW1zKSB9fVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibWMtdHJlZS1zZWxlY3QtdHJpZ2dlclwiICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwibWMtc2VsZWN0X19jbGVhbmVyXCIgKm5nSWY9XCJjYW5TaG93Q2xlYW5lclwiIChjbGljayk9XCJjbGVhclZhbHVlKCRldmVudClcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibWMtY2xlYW5lclwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJtYy10cmVlLXNlbGVjdF9fYXJyb3ctd3JhcHBlclwiPlxuICAgICAgICA8aSBjbGFzcz1cIm1jLXRyZWUtc2VsZWN0X19hcnJvd1wiIG1jLWljb249XCJtYy1hbmdsZS1kb3duLUxfMTZcIj48L2k+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlXG4gICAgY2RrLWNvbm5lY3RlZC1vdmVybGF5XG4gICAgY2RrQ29ubmVjdGVkT3ZlcmxheUxvY2tQb3NpdGlvblxuICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5SGFzQmFja2Ryb3BdPVwiaGFzQmFja2Ryb3BcIlxuICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5QmFja2Ryb3BDbGFzc109XCJiYWNrZHJvcENsYXNzXCJcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheVNjcm9sbFN0cmF0ZWd5XT1cInNjcm9sbFN0cmF0ZWd5XCJcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9yaWdpbl09XCJvcmlnaW5cIlxuICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3Blbl09XCJwYW5lbE9wZW5cIlxuICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25zXT1cInBvc2l0aW9uc1wiXG4gICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlNaW5XaWR0aF09XCJ0cmlnZ2VyUmVjdD8ud2lkdGghXCJcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9mZnNldFldPVwib2Zmc2V0WVwiXG4gICAgKGJhY2tkcm9wQ2xpY2spPVwiY2xvc2UoKVwiXG4gICAgKGF0dGFjaCk9XCJvbkF0dGFjaGVkKClcIlxuICAgIChkZXRhY2gpPVwiY2xvc2UoKVwiPlxuXG4gICAgPGRpdiAjcGFuZWxcbiAgICAgICAgIGNsYXNzPVwibWMtdHJlZS1zZWxlY3RfX3BhbmVsIHt7IGdldFBhbmVsVGhlbWUoKSB9fVwiXG4gICAgICAgICBbbmdDbGFzc109XCJwYW5lbENsYXNzXCJcbiAgICAgICAgIFtzdHlsZS50cmFuc2Zvcm1PcmlnaW5dPVwidHJhbnNmb3JtT3JpZ2luXCJcbiAgICAgICAgIFtzdHlsZS5mb250LXNpemUucHhdPVwidHJpZ2dlckZvbnRTaXplXCJcbiAgICAgICAgIChrZXlkb3duKT1cImhhbmRsZUtleWRvd24oJGV2ZW50KVwiPlxuXG4gICAgICAgIDxkaXYgI29wdGlvbnNDb250YWluZXJcbiAgICAgICAgICAgICBjbGFzcz1cIm1jLXRyZWUtc2VsZWN0X19jb250ZW50XCJcbiAgICAgICAgICAgICBbQGZhZGVJbkNvbnRlbnRdPVwiJ3Nob3dpbmcnXCJcbiAgICAgICAgICAgICAoQGZhZGVJbkNvbnRlbnQuZG9uZSk9XCJwYW5lbERvbmVBbmltYXRpbmdTdHJlYW0ubmV4dCgkZXZlbnQudG9TdGF0ZSlcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1jLXRyZWUtc2VsZWN0aW9uXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG4iXX0=