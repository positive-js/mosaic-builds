import * as i1 from '@angular/cdk/overlay';
import { CdkConnectedOverlay, OverlayModule } from '@angular/cdk/overlay';
import * as i8 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Directive, EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, Inject, Optional, Self, ViewChild, ViewChildren, ContentChild, Input, Output, NgModule } from '@angular/core';
import * as i2 from '@ptsecurity/mosaic/core';
import { mixinTabIndex, mixinDisabled, mixinErrorState, getMcSelectDynamicMultipleError, getMcSelectNonFunctionValueError, setMosaicValidation, MultipleMode, getMcSelectNonArrayValueError, getOptionScrollPosition, SELECT_PANEL_MAX_HEIGHT, SELECT_PANEL_PADDING_X, SELECT_PANEL_VIEWPORT_PADDING, MC_SELECT_SCROLL_STRATEGY, MC_VALIDATION, mcSelectAnimations, McPseudoCheckboxModule, MC_SELECT_SCROLL_STRATEGY_PROVIDER } from '@ptsecurity/mosaic/core';
import * as i7 from '@ptsecurity/mosaic/icon';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import * as i6 from '@ptsecurity/mosaic/tags';
import { McTag, McTagsModule } from '@ptsecurity/mosaic/tags';
import { McTree, McTreeSelection, McTreeModule } from '@ptsecurity/mosaic/tree';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import * as i4 from '@angular/forms';
import { NG_VALIDATORS } from '@angular/forms';
import { DOWN_ARROW, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, ENTER, SPACE, HOME, END, PAGE_UP, PAGE_DOWN, A, hasModifierKey } from '@ptsecurity/cdk/keycodes';
import * as i5 from '@ptsecurity/mosaic/form-field';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { Subject, defer, merge, Subscription } from 'rxjs';
import { filter, map, startWith, switchMap, take, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import * as i3 from '@angular/cdk/bidi';

let nextUniqueId = 0;
/** Change event object that is emitted when the select value has changed. */
class McTreeSelectChange {
    constructor(source, value, isUserInput = false) {
        this.source = source;
        this.value = value;
        this.isUserInput = isUserInput;
    }
}
class McTreeSelectTrigger {
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
class McTreeSelect extends McTreeSelectMixinBase {
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
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.ViewportRuler }, { type: i0.NgZone }, { type: i0.Renderer2 }, { type: i2.ErrorStateMatcher }, { type: undefined, decorators: [{
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
                    }] }];
    }, propDecorators: { trigger: [{
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

class McTreeSelectModule {
}
/** @nocollapse */ /** @nocollapse */ McTreeSelectModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTreeSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McTreeSelectModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTreeSelectModule, declarations: [McTreeSelect, McTreeSelectTrigger], imports: [CommonModule,
        OverlayModule,
        McTreeModule,
        McIconModule,
        McTagsModule,
        McPseudoCheckboxModule], exports: [McTreeSelect, McTreeSelectTrigger, CommonModule] });
/** @nocollapse */ /** @nocollapse */ McTreeSelectModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTreeSelectModule, providers: [MC_SELECT_SCROLL_STRATEGY_PROVIDER], imports: [[
            CommonModule,
            OverlayModule,
            McTreeModule,
            McIconModule,
            McTagsModule,
            McPseudoCheckboxModule
        ], CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTreeSelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        McTreeModule,
                        McIconModule,
                        McTagsModule,
                        McPseudoCheckboxModule
                    ],
                    exports: [McTreeSelect, McTreeSelectTrigger, CommonModule],
                    declarations: [McTreeSelect, McTreeSelectTrigger],
                    providers: [MC_SELECT_SCROLL_STRATEGY_PROVIDER]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { McTreeSelect, McTreeSelectChange, McTreeSelectModule, McTreeSelectTrigger };
//# sourceMappingURL=ptsecurity-mosaic-tree-select.mjs.map
