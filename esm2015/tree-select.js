/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { ViewportRuler, CdkConnectedOverlay, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Directive, EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, NgZone, Renderer2, Attribute, Inject, Optional, Self, ViewChild, ViewChildren, ContentChild, Input, Output, NgModule } from '@angular/core';
import { CdkTree, CdkTreeModule } from '@ptsecurity/cdk/tree';
import { mixinTabIndex, mixinDisabled, mixinErrorState, getMcSelectDynamicMultipleError, getMcSelectNonFunctionValueError, setMosaicValidation, MultipleMode, getMcSelectNonArrayValueError, getOptionScrollPosition, SELECT_PANEL_MAX_HEIGHT, SELECT_PANEL_VIEWPORT_PADDING, mcSelectAnimations, ErrorStateMatcher, MC_SELECT_SCROLL_STRATEGY, MC_VALIDATION, SELECT_PANEL_PADDING_X, McPseudoCheckboxModule, MC_SELECT_SCROLL_STRATEGY_PROVIDER } from '@ptsecurity/mosaic/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McTag, McTagsModule } from '@ptsecurity/mosaic/tags';
import { McTreeSelection, McTreeModule } from '@ptsecurity/mosaic/tree';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { NG_VALIDATORS, NgForm, FormGroupDirective, NgControl, NgModel, FormControlName } from '@angular/forms';
import { LEFT_ARROW, RIGHT_ARROW, HOME, END, PAGE_UP, PAGE_DOWN, ENTER, SPACE, A, hasModifierKey, DOWN_ARROW, UP_ARROW } from '@ptsecurity/cdk/keycodes';
import { McFormFieldControl, McFormField } from '@ptsecurity/mosaic/form-field';
import { Subject, defer, merge } from 'rxjs';
import { filter, map, take, switchMap, distinctUntilChanged, takeUntil } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let nextUniqueId = 0;
/**
 * Change event object that is emitted when the select value has changed.
 */
class McTreeSelectChange {
    /**
     * @param {?} source
     * @param {?} value
     * @param {?=} isUserInput
     */
    constructor(source, value, isUserInput = false) {
        this.source = source;
        this.value = value;
        this.isUserInput = isUserInput;
    }
}
class McTreeSelectTrigger {
}
McTreeSelectTrigger.decorators = [
    { type: Directive, args: [{ selector: 'mc-tree-select-trigger' },] },
];
class McTreeSelectBase {
    /**
     * @param {?} elementRef
     * @param {?} defaultErrorStateMatcher
     * @param {?} parentForm
     * @param {?} parentFormGroup
     * @param {?} ngControl
     */
    constructor(elementRef, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
        this.elementRef = elementRef;
        this.defaultErrorStateMatcher = defaultErrorStateMatcher;
        this.parentForm = parentForm;
        this.parentFormGroup = parentFormGroup;
        this.ngControl = ngControl;
    }
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
const McTreeSelectMixinBase = mixinTabIndex(mixinDisabled(mixinErrorState(McTreeSelectBase)));
class McTreeSelect extends McTreeSelectMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} changeDetectorRef
     * @param {?} viewportRuler
     * @param {?} ngZone
     * @param {?} renderer
     * @param {?} defaultErrorStateMatcher
     * @param {?} tabIndex
     * @param {?} scrollStrategyFactory
     * @param {?} rawValidators
     * @param {?} mcValidation
     * @param {?} dir
     * @param {?} parentForm
     * @param {?} parentFormGroup
     * @param {?} parentFormField
     * @param {?} ngControl
     * @param {?} ngModel
     * @param {?} formControlName
     */
    constructor(elementRef, changeDetectorRef, viewportRuler, ngZone, renderer, defaultErrorStateMatcher, tabIndex, scrollStrategyFactory, rawValidators, mcValidation, dir, parentForm, parentFormGroup, parentFormField, ngControl, ngModel, formControlName) {
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
        /**
         * A name for this control that can be used by `mc-form-field`.
         */
        this.controlType = 'mc-select';
        this.hiddenItems = 0;
        /**
         * The cached font-size of the trigger element.
         */
        this.triggerFontSize = 0;
        /**
         * The value of the select panel's transform-origin property.
         */
        this.transformOrigin = 'top';
        /**
         * Whether the panel's animation is done.
         */
        this.panelDoneAnimating = false;
        /**
         * Emits when the panel element is finished transforming in.
         */
        this.panelDoneAnimatingStream = new Subject();
        /**
         * Strategy that will be used to handle scrolling while the select panel is open.
         */
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
        /**
         * Event emitted when the select panel has been toggled.
         */
        this.openedChange = new EventEmitter();
        /**
         * Event emitted when the select has been opened.
         */
        this.openedStream = this.openedChange.pipe(filter((/**
         * @param {?} o
         * @return {?}
         */
        (o) => o)), map((/**
         * @return {?}
         */
        () => { })));
        /**
         * Event emitted when the select has been closed.
         */
        this.closedStream = this.openedChange.pipe(filter((/**
         * @param {?} o
         * @return {?}
         */
        (o) => !o)), map((/**
         * @return {?}
         */
        () => { })));
        /**
         * Event emitted when the selected value has been changed by the user.
         */
        this.selectionChange = new EventEmitter();
        /**
         * Event that emits whenever the raw value of the select changes. This is here primarily
         * to facilitate the two-way binding for the `value` input.
         * \@docs-private
         */
        this.valueChange = new EventEmitter();
        /**
         * Combined stream of all of the child options' change events.
         */
        this.optionSelectionChanges = (/** @type {?} */ (defer((/**
         * @return {?}
         */
        () => {
            if (this.options) {
                return merge(...this.options.map((/**
                 * @param {?} option
                 * @return {?}
                 */
                (option) => option.onSelectionChange)));
            }
            return this.ngZone.onStable
                .asObservable()
                .pipe(take(1), switchMap((/**
             * @return {?}
             */
            () => this.optionSelectionChanges)));
        }))));
        this._required = false;
        this._multiple = false;
        this._autoSelect = true;
        this._value = null;
        this._focused = false;
        this._panelOpen = false;
        /**
         * The scroll position of the overlay panel, calculated to center the selected option.
         */
        this.scrollTop = 0;
        /**
         * Unique id for this input.
         */
        this.uid = `mc-select-${nextUniqueId++}`;
        /**
         * Emits whenever the component is destroyed.
         */
        this.destroy = new Subject();
        /**
         * `View -> model callback called when value changes`
         */
        this.onChange = (/**
         * @return {?}
         */
        () => { });
        /**
         * `View -> model callback called when select has been touched`
         */
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
        /**
         * Comparison function to specify which option is displayed. Defaults to object equality.
         */
        this._compareWith = (/**
         * @param {?} o1
         * @param {?} o2
         * @return {?}
         */
        (o1, o2) => o1 === o2);
        if (this.ngControl) {
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }
        this.tabIndex = parseInt(tabIndex) || 0;
        // Force setter to be called in case id was not specified.
        this.id = this.id;
    }
    /**
     * @return {?}
     */
    get placeholder() {
        return this._placeholder;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set placeholder(value) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    /**
     * @return {?}
     */
    get required() {
        return this._required;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    /**
     * @return {?}
     */
    get multiple() {
        return this._multiple;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set multiple(value) {
        if (this.selectionModel) {
            throw getMcSelectDynamicMultipleError();
        }
        this._multiple = coerceBooleanProperty(value);
    }
    /**
     * @return {?}
     */
    get autoSelect() {
        if (this.multiple) {
            return false;
        }
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
     * Function to compare the option values with the selected values. The first argument
     * is a value from an option. The second is a value from the selection. A boolean
     * should be returned.
     * @return {?}
     */
    get compareWith() {
        return this._compareWith;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
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
    /**
     * @return {?}
     */
    get value() {
        return this.multiple ? this.tree.getSelectedValues() : this.tree.getSelectedValues()[0];
    }
    /**
     * @return {?}
     */
    get id() {
        return this._id;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set id(value) {
        this._id = value || this.uid;
        this.stateChanges.next();
    }
    /**
     * Whether the select is focused.
     * @return {?}
     */
    get focused() {
        return this._focused || this._panelOpen;
    }
    /**
     * @deprecated Setter to be removed as this property is intended to be readonly.
     * \@breaking-change 8.0.0
     * @param {?} value
     * @return {?}
     */
    set focused(value) {
        this._focused = value;
    }
    /**
     * @return {?}
     */
    get panelOpen() {
        return this._panelOpen;
    }
    /**
     * @return {?}
     */
    get canShowCleaner() {
        return this.cleaner && this.selectionModel.hasValue();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.stateChanges.next();
        // We need `distinctUntilChanged` here, because some browsers will
        // fire the animation end event twice for the same animation. See:
        // https://github.com/angular/angular/issues/24084
        this.panelDoneAnimatingStream
            .pipe(distinctUntilChanged(), takeUntil(this.destroy))
            .subscribe((/**
         * @return {?}
         */
        () => {
            if (this.panelOpen) {
                this.scrollTop = 0;
                this.openedChange.emit(true);
            }
            else {
                this.openedChange.emit(false);
                this.panelDoneAnimating = false;
                this.overlayDir.offsetX = 0;
                this.changeDetectorRef.markForCheck();
            }
        }));
    }
    /**
     * @return {?}
     */
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
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (!this.multiple && this.panelOpen && event.isUserInput) {
                this.close();
            }
        }));
        this.tree.selectionChange
            .pipe(takeUntil(this.destroy))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.onChange(this.selectedValues);
            this.selectionChange.emit(new McTreeSelectChange(this, event.option));
        }));
        this.selectionModel.changed
            .pipe(takeUntil(this.destroy))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (event.added.length) {
                this.tree.keyManager.setFocusOrigin('program');
                this.tree.keyManager.setActiveItem((/** @type {?} */ (this.options.find((/**
                 * @param {?} option
                 * @return {?}
                 */
                (option) => option.data === event.added[0])))));
            }
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this.tree) {
            return;
        }
        this.tags.changes
            .subscribe((/**
         * @return {?}
         */
        () => {
            setTimeout((/**
             * @return {?}
             */
            () => this.calculateHiddenItems()), 0);
        }));
        setTimeout((/**
         * @return {?}
         */
        () => this.calculateHiddenItems()), 0);
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.ngControl) {
            this.updateErrorState();
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // Updating the disabled state is handled by `mixinDisabled`, but we need to additionally let
        // the parent form field know to run change detection when the disabled state changes.
        if (changes.disabled) {
            this.stateChanges.next();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy.next();
        this.destroy.complete();
        this.stateChanges.complete();
    }
    /**
     * @param {?} hiddenItemsText
     * @param {?} hiddenItems
     * @return {?}
     */
    hiddenItemsTextFormatter(hiddenItemsText, hiddenItems) {
        return `${hiddenItemsText} ${hiddenItems}`;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    clearValue($event) {
        $event.stopPropagation();
        this.selectionModel.clear();
        this.tree.keyManager.setActiveItem(-1);
        this.setSelectionByValue([]);
        this.onChange(this.selectedValues);
    }
    /**
     * @return {?}
     */
    toggle() {
        if (this.panelOpen) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * @return {?}
     */
    open() {
        if (this.disabled || !this.options || !this.options.length || this._panelOpen) {
            return;
        }
        this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
        // Note: The computed font-size will be a string pixel value (e.g. "16px").
        // `parseInt` ignores the trailing 'px' and converts this to a number.
        this.triggerFontSize = parseInt(getComputedStyle(this.trigger.nativeElement)['font-size']);
        this._panelOpen = true;
        setTimeout((/**
         * @return {?}
         */
        () => this.highlightCorrectOption()));
        this.changeDetectorRef.markForCheck();
        // Set the font size on the panel element once it exists.
        this.ngZone.onStable.asObservable()
            .pipe(take(1))
            .subscribe((/**
         * @return {?}
         */
        () => {
            if (this.triggerFontSize && this.overlayDir.overlayRef && this.overlayDir.overlayRef.overlayElement) {
                this.overlayDir.overlayRef.overlayElement.style.fontSize = `${this.triggerFontSize}px`;
            }
        }));
    }
    /**
     * Closes the overlay panel and focuses the host element.
     * @return {?}
     */
    close() {
        if (!this._panelOpen) {
            return;
        }
        this._panelOpen = false;
        this.changeDetectorRef.markForCheck();
        this.onTouched();
        setTimeout((/**
         * @return {?}
         */
        () => this.focus()), 0);
    }
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} value New value to be written to the model.
     * @return {?}
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
     * @param {?} fn Callback to be triggered when the value changes.
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param {?} fn Callback to be triggered when the component has been touched.
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param {?} isDisabled Sets whether the component is disabled.
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.changeDetectorRef.markForCheck();
        this.stateChanges.next();
    }
    /**
     * @return {?}
     */
    get selected() {
        return this.multiple ? this.selectionModel.selected : this.selectionModel.selected[0];
    }
    /**
     * @return {?}
     */
    get selectedValues() {
        /** @type {?} */
        const selectedValues = this.selectionModel.selected.map((/**
         * @param {?} value
         * @return {?}
         */
        (value) => this.tree.treeControl.getValue(value)));
        return this.multiple ? selectedValues : selectedValues[0];
    }
    /**
     * @return {?}
     */
    get triggerValue() {
        if (this.empty) {
            return '';
        }
        return this.tree.treeControl.getViewValue(this.selected);
    }
    /**
     * @return {?}
     */
    get triggerValues() {
        if (this.empty) {
            return [];
        }
        return this.selected;
    }
    /**
     * @return {?}
     */
    get empty() {
        return !this.selectionModel || this.selectionModel.isEmpty();
    }
    /**
     * @return {?}
     */
    isRtl() {
        return this.dir ? this.dir.value === 'rtl' : false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
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
    /**
     * When the panel content is done fading in, the panelDoneAnimating property is
     * set so the proper class can be added to the panel.
     * @return {?}
     */
    onFadeInDone() {
        this.panelDoneAnimating = this.panelOpen;
        this.changeDetectorRef.markForCheck();
    }
    /**
     * @return {?}
     */
    onFocus() {
        if (!this.disabled) {
            this._focused = true;
            this.stateChanges.next();
        }
    }
    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     * @return {?}
     */
    onBlur() {
        this._focused = false;
        if (!this.disabled && !this.panelOpen) {
            this.onTouched();
            this.changeDetectorRef.markForCheck();
            this.stateChanges.next();
        }
    }
    /**
     * Callback that is invoked when the overlay panel has been attached.
     * @return {?}
     */
    onAttached() {
        this.overlayDir.positionChange
            .pipe(take(1))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.changeDetectorRef.detectChanges();
            this.calculateOverlayOffsetX();
            this.panel.nativeElement.scrollTop = this.scrollTop;
            this.tree.updateScrollSize();
        }));
    }
    /**
     * Returns the theme to be used on the panel.
     * @return {?}
     */
    getPanelTheme() {
        return this.parentFormField ? `mc-${this.parentFormField.color}` : '';
    }
    /**
     * @return {?}
     */
    focus() {
        this.elementRef.nativeElement.focus();
    }
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    onContainerClick() {
        this.focus();
    }
    /**
     * Invoked when an option is clicked.
     * @param {?} selectedOption
     * @param {?} $event
     * @return {?}
     */
    onRemoveSelectedOption(selectedOption, $event) {
        $event.stopPropagation();
        if (this.disabled) {
            return;
        }
        this.selectionModel.deselect(selectedOption);
        this.onChange(this.selectedValues);
    }
    /**
     * @return {?}
     */
    calculateHiddenItems() {
        if (this.empty || !this.multiple) {
            return;
        }
        /** @type {?} */
        let visibleItems = 0;
        /** @type {?} */
        const totalItemsWidth = this.getTotalItemsWidthInMatcher();
        /** @type {?} */
        let totalVisibleItemsWidth = 0;
        this.tags.forEach((/**
         * @param {?} tag
         * @return {?}
         */
        (tag) => {
            if (tag.nativeElement.offsetTop < tag.nativeElement.offsetHeight) {
                totalVisibleItemsWidth += this.getItemWidth(tag.nativeElement);
                visibleItems++;
            }
        }));
        this.hiddenItems = this.selectionModel.selected.length - visibleItems;
        if (this.hiddenItems) {
            /** @type {?} */
            const itemsCounter = this.trigger.nativeElement.querySelector('.mc-tree-select__match-hidden-text');
            /** @type {?} */
            const matcherList = this.trigger.nativeElement.querySelector('.mc-tree-select__match-list');
            /** @type {?} */
            const itemsCounterShowed = itemsCounter.offsetTop < itemsCounter.offsetHeight;
            // const itemsCounterWidth: number = itemsCounter.getBoundingClientRect().width;
            /** @type {?} */
            const itemsCounterWidth = 86;
            /** @type {?} */
            const matcherListWidth = matcherList.getBoundingClientRect().width;
            /** @type {?} */
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
    /**
     * @private
     * @return {?}
     */
    getTotalItemsWidthInMatcher() {
        /** @type {?} */
        const triggerClone = this.trigger.nativeElement.cloneNode(true);
        triggerClone.querySelector('.mc-tree-select__match-hidden-text').remove();
        this.renderer.setStyle(triggerClone, 'position', 'absolute');
        this.renderer.setStyle(triggerClone, 'visibility', 'hidden');
        this.renderer.setStyle(triggerClone, 'top', '-100%');
        this.renderer.setStyle(triggerClone, 'left', '0');
        this.renderer.appendChild(this.trigger.nativeElement, triggerClone);
        /** @type {?} */
        let totalItemsWidth = 0;
        triggerClone.querySelectorAll('mc-tag').forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            totalItemsWidth += this.getItemWidth(item);
        }));
        triggerClone.remove();
        return totalItemsWidth;
    }
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    getItemWidth(element) {
        /** @type {?} */
        const computedStyle = window.getComputedStyle(element);
        /** @type {?} */
        const width = parseInt((/** @type {?} */ (computedStyle.width)));
        /** @type {?} */
        const marginLeft = parseInt((/** @type {?} */ (computedStyle.marginLeft)));
        /** @type {?} */
        const marginRight = parseInt((/** @type {?} */ (computedStyle.marginRight)));
        return width + marginLeft + marginRight;
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    handleClosedKeydown(event) {
        // tslint:disable-next-line: deprecation
        /** @type {?} */
        const keyCode = event.keyCode;
        /** @type {?} */
        const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW ||
            keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW;
        /** @type {?} */
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
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    handleOpenKeydown(event) {
        /* tslint:disable-next-line */
        /** @type {?} */
        const keyCode = event.keyCode;
        /** @type {?} */
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
            /** @type {?} */
            const hasDeselectedOptions = this.options.some((/**
             * @param {?} option
             * @return {?}
             */
            (option) => !option.selected));
            this.options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            (option) => {
                if (hasDeselectedOptions && !option.disabled) {
                    option.select();
                }
                else {
                    option.deselect();
                }
            }));
        }
        else {
            /** @type {?} */
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
    /**
     * @private
     * @return {?}
     */
    initializeSelection() {
        // Defer setting the value in order to avoid the "Expression
        // has changed after it was checked" errors from Angular.
        Promise.resolve().then((/**
         * @return {?}
         */
        () => {
            this.setSelectionByValue(this.ngControl ? this.ngControl.value : this._value);
        }));
    }
    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     * @private
     * @param {?} value
     * @return {?}
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
    /**
     * @private
     * @return {?}
     */
    initKeyManager() {
        this.originalOnKeyDown = this.tree.onKeyDown;
        this.tree.onKeyDown = (/**
         * @return {?}
         */
        () => { });
        this.tree.keyManager.tabOut
            .pipe(takeUntil(this.destroy))
            .subscribe((/**
         * @return {?}
         */
        () => {
            // Restore focus to the trigger before closing. Ensures that the focus
            // position won't be lost if the user got focus into the overlay.
            this.focus();
            this.close();
        }));
        this.tree.keyManager.change
            .pipe(takeUntil(this.destroy))
            .subscribe((/**
         * @return {?}
         */
        () => {
            if (this._panelOpen && this.panel) {
                this.scrollActiveOptionIntoView();
            }
            else if (!this._panelOpen && !this.multiple && this.tree.keyManager.activeItem) {
                this.tree.keyManager.activeItem.selectViaInteraction();
            }
        }));
    }
    /**
     * Sorts the selected values in the selected based on their order in the panel.
     * @private
     * @return {?}
     */
    sortValues() {
        if (this.multiple) {
            /** @type {?} */
            const options = this.options.toArray();
            this.selectionModel.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => {
                return this.sortComparator ? this.sortComparator(a, b, options) :
                    options.indexOf(a) - options.indexOf(b);
            }));
            this.stateChanges.next();
        }
    }
    /**
     * Highlights the selected item. If no option is selected, it will highlight
     * the first item instead.
     * @private
     * @return {?}
     */
    highlightCorrectOption() {
        if (this.empty || !this.tree.keyManager) {
            return;
        }
        /** @type {?} */
        const firstSelectedValue = this.multiple ? this.selectedValues[0] : this.selectedValues;
        /** @type {?} */
        const selectedOption = this.options.find((/**
         * @param {?} option
         * @return {?}
         */
        (option) => option.value === firstSelectedValue));
        if (selectedOption) {
            this.tree.keyManager.setActiveItem(selectedOption);
        }
    }
    /**
     * Scrolls the active option into view.
     * @private
     * @return {?}
     */
    scrollActiveOptionIntoView() {
        /** @type {?} */
        const activeOptionIndex = this.tree.keyManager.activeItemIndex || 0;
        this.panel.nativeElement.scrollTop = getOptionScrollPosition(activeOptionIndex, this.tree.getItemHeight(), this.panel.nativeElement.scrollTop, SELECT_PANEL_MAX_HEIGHT);
    }
    /**
     * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text when
     * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
     * can't be calculated until the panel has been attached, because we need to know the
     * content width in order to constrain the panel within the viewport.
     * @private
     * @return {?}
     */
    calculateOverlayOffsetX() {
        /** @type {?} */
        const overlayRect = this.overlayDir.overlayRef.overlayElement.getBoundingClientRect();
        /** @type {?} */
        const viewportSize = this.viewportRuler.getViewportSize();
        /** @type {?} */
        const isRtl = this.isRtl();
        /* tslint:disable-next-line:no-magic-numbers */
        /** @type {?} */
        const paddingWidth = SELECT_PANEL_PADDING_X * 2;
        /** @type {?} */
        let offsetX = SELECT_PANEL_PADDING_X;
        // Invert the offset in LTR.
        if (!isRtl) {
            offsetX *= -1;
        }
        // Determine how much the select overflows on each side.
        /** @type {?} */
        const leftOverflow = 0 - (overlayRect.left + offsetX - (isRtl ? paddingWidth : 0));
        /** @type {?} */
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
McTreeSelect.decorators = [
    { type: Component, args: [{
                selector: 'mc-tree-select',
                exportAs: 'mcTreeSelect',
                template: "<div cdk-overlay-origin class=\"mc-tree-select__trigger\" [class.mc-tree-select__trigger_multiple]=\"multiple\" #origin=\"cdkOverlayOrigin\" #trigger><div class=\"mc-tree-select__matcher\" [ngSwitch]=\"empty\"><span class=\"mc-tree-select__placeholder\" *ngSwitchCase=\"true\">{{ placeholder || '\u00A0' }}</span> <span *ngSwitchCase=\"false\" [ngSwitch]=\"!!customTrigger\"><div *ngSwitchDefault [ngSwitch]=\"multiple\" class=\"mc-tree-select__match-container\"><span *ngSwitchCase=\"false\" class=\"mc-tree-select__matcher-text\">{{ triggerValue }}</span><div *ngSwitchCase=\"true\" class=\"mc-tree-select__multiple-matcher\"><div class=\"mc-tree-select__match-list\"><mc-tag *ngFor=\"let option of triggerValues\" [selectable]=\"false\" [disabled]=\"disabled\" [class.mc-error]=\"errorState\">{{ tree.treeControl.getViewValue(option) }} <i mc-icon=\"mc-close-S_16\" (click)=\"onRemoveSelectedOption(option, $event)\"></i></mc-tag></div><div class=\"mc-tree-select__match-hidden-text\" [style.display]=\"hiddenItems > 0 ? 'block' : 'none'\" #hiddenItemsCounter>{{ hiddenItemsTextFormatter(hiddenItemsText, hiddenItems) }}</div></div></div><ng-content select=\"mc-tree-select-trigger\" *ngSwitchCase=\"true\"></ng-content></span></div><div class=\"mc-select__cleaner\" *ngIf=\"canShowCleaner\" (click)=\"clearValue($event)\"><ng-content select=\"mc-cleaner\"></ng-content></div><div class=\"mc-tree-select__arrow-wrapper\"><i class=\"mc-tree-select__arrow\" mc-icon=\"mc-angle-down-L_16\"></i></div></div><ng-template cdk-connected-overlay cdkConnectedOverlayLockPosition cdkConnectedOverlayHasBackdrop cdkConnectedOverlayBackdropClass=\"cdk-overlay-transparent-backdrop\" [cdkConnectedOverlayScrollStrategy]=\"scrollStrategy\" [cdkConnectedOverlayOrigin]=\"origin\" [cdkConnectedOverlayOpen]=\"panelOpen\" [cdkConnectedOverlayPositions]=\"positions\" [cdkConnectedOverlayMinWidth]=\"triggerRect?.width\" [cdkConnectedOverlayOffsetY]=\"offsetY\" (backdropClick)=\"close()\" (attach)=\"onAttached()\" (detach)=\"close()\"><div #panel class=\"mc-tree-select__panel {{ getPanelTheme() }}\" [ngClass]=\"panelClass\" (@transformPanel.done)=\"panelDoneAnimatingStream.next($event.toState)\" [style.transformOrigin]=\"transformOrigin\" [class.mc-select-panel-done-animcing]=\"panelDoneAnimating\" [style.font-size.px]=\"triggerFontSize\" (keydown)=\"handleKeydown($event)\"><div #optionsContainer class=\"mc-tree-select__content\" [@fadeInContent]=\"'showing'\" (@fadeInContent.done)=\"onFadeInDone()\"><ng-content select=\"mc-tree-selection\"></ng-content></div></div></ng-template>",
                styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}.mc-tree-selection{display:block}.mc-tree-option{display:flex;align-items:center;height:28px;word-wrap:break-word;border:2px solid transparent}.mc-tree-option>.mc-icon{margin-right:4px;cursor:pointer}.mc-tree-option:focus{outline:0}.mc-tree-option:not([disabled]){cursor:pointer}.mc-tree-option .mc-pseudo-checkbox{margin-right:8px}.mc-tree-node-toggle{margin-right:4px}.mc-tree-node-toggle .mc-icon{transform:rotate(-90deg)}.mc-tree-node-toggle.mc-opened .mc-icon{transform:rotate(0)}.mc-tree-node-toggle.mc-disabled{cursor:default}.mc-tree-select{box-sizing:border-box;display:inline-block;vertical-align:top;width:100%;outline:0}.mc-tree-select.mc-disabled .mc-tree-select__trigger{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.mc-tree-select__trigger{display:flex;box-sizing:border-box;position:relative;height:30px;cursor:pointer;padding-right:7px;padding-left:15px}.mc-tree-select__trigger.mc-tree-select__trigger_multiple{padding-left:7px}.mc-tree-select__trigger.mc-tree-select__trigger_multiple .mc-tree-select__placeholder{margin-left:8px}.mc-tree-select__matcher{display:flex;align-items:center;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mc-tree-select__matcher>span{width:100%}.mc-tree-select__multiple-matcher{display:flex;width:100%}.mc-tree-select__match-list{display:flex;flex-wrap:wrap;overflow:hidden;max-height:28px;margin:0;padding-left:0}.mc-tree-select__match-list .mc-tag{margin-right:4px}.mc-tree-select__match-container{display:flex;flex-direction:row;justify-content:space-between;width:100%}.mc-tree-select__match-container .mc-tree-select__match-hidden-text{flex:0 0 70px;align-self:center;padding:0 8px;text-align:right}.mc-tree-select__match-item{display:flex;border:1px solid transparent;border-radius:3px;padding-left:7px;margin-right:4px;max-width:100%}.mc-tree-select__arrow-wrapper{align-self:center}.mc-form-field-appearance-fill .mc-tree-select__arrow-wrapper,.mc-form-field-appearance-standard .mc-tree-select__arrow-wrapper{transform:translateY(-50%)}.mc-form-field-appearance-outline .mc-tree-select__arrow-wrapper{transform:translateY(-25%)}.mc-tree-select__panel{max-height:224px;min-width:100%;overflow:auto;border-width:1px;border-style:solid;border-bottom-left-radius:3px;border-bottom-right-radius:3px;padding:4px 0}.mc-tree-select__content{height:100%}.mc-tree-select__content .mc-tree-selection{height:100%}.mc-tree-select__panel .mc-optgroup-label,.mc-tree-select__panel .mc-tree-select-option{font-size:inherit;line-height:32px;height:32px}.mc-form-field-type-mc-select:not(.mc-disabled) .mc-form-field-flex{cursor:pointer}.mc-form-field-type-mc-select .mc-form-field-label{width:calc(100% - 18px)}"],
                inputs: ['disabled'],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '[attr.id]': 'id',
                    '[attr.tabindex]': 'tabIndex',
                    class: 'mc-tree-select',
                    '[class.mc-disabled]': 'disabled',
                    '[class.mc-select-invalid]': 'errorState',
                    '(click)': 'toggle()',
                    '(keydown)': 'handleKeydown($event)',
                    '(focus)': 'onFocus()',
                    '(blur)': 'onBlur()',
                    '(window:resize)': 'calculateHiddenItems()'
                },
                animations: [
                    mcSelectAnimations.transformPanel,
                    mcSelectAnimations.fadeInContent
                ],
                providers: [
                    { provide: McFormFieldControl, useExisting: McTreeSelect },
                    { provide: CdkTree, useExisting: McTreeSelect }
                ]
            },] },
];
/** @nocollapse */
McTreeSelect.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: ViewportRuler },
    { type: NgZone },
    { type: Renderer2 },
    { type: ErrorStateMatcher },
    { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
    { type: undefined, decorators: [{ type: Inject, args: [MC_SELECT_SCROLL_STRATEGY,] }] },
    { type: Array, decorators: [{ type: Optional }, { type: Inject, args: [NG_VALIDATORS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_VALIDATION,] }] },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: NgForm, decorators: [{ type: Optional }] },
    { type: FormGroupDirective, decorators: [{ type: Optional }] },
    { type: McFormField, decorators: [{ type: Optional }] },
    { type: NgControl, decorators: [{ type: Optional }, { type: Self }] },
    { type: NgModel, decorators: [{ type: Optional }, { type: Self }] },
    { type: FormControlName, decorators: [{ type: Optional }, { type: Self }] }
];
McTreeSelect.propDecorators = {
    trigger: [{ type: ViewChild, args: ['trigger', { static: false },] }],
    panel: [{ type: ViewChild, args: ['panel', { static: false },] }],
    overlayDir: [{ type: ViewChild, args: [CdkConnectedOverlay, { static: false },] }],
    hiddenItemsCounter: [{ type: ViewChild, args: ['hiddenItemsCounter', { static: false },] }],
    tags: [{ type: ViewChildren, args: [McTag,] }],
    cleaner: [{ type: ContentChild, args: ['mcSelectCleaner', { static: true },] }],
    customTrigger: [{ type: ContentChild, args: [McTreeSelectTrigger, { static: false },] }],
    tree: [{ type: ContentChild, args: [McTreeSelection, { static: false },] }],
    hiddenItemsText: [{ type: Input }],
    openedChange: [{ type: Output }],
    openedStream: [{ type: Output, args: ['opened',] }],
    closedStream: [{ type: Output, args: ['closed',] }],
    selectionChange: [{ type: Output }],
    valueChange: [{ type: Output }],
    panelClass: [{ type: Input }],
    errorStateMatcher: [{ type: Input }],
    sortComparator: [{ type: Input }],
    placeholder: [{ type: Input }],
    required: [{ type: Input }],
    multiple: [{ type: Input }],
    autoSelect: [{ type: Input }],
    compareWith: [{ type: Input }],
    id: [{ type: Input }],
    hiddenItemsTextFormatter: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McTreeSelectModule {
}
McTreeSelectModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    OverlayModule,
                    CdkTreeModule,
                    McTreeModule,
                    McIconModule,
                    McTagsModule,
                    McPseudoCheckboxModule
                ],
                exports: [McTreeSelect, McTreeSelectTrigger, CommonModule],
                declarations: [McTreeSelect, McTreeSelectTrigger],
                providers: [MC_SELECT_SCROLL_STRATEGY_PROVIDER]
            },] },
];

export { McTreeSelect, McTreeSelectChange, McTreeSelectModule, McTreeSelectTrigger };
//# sourceMappingURL=tree-select.js.map
