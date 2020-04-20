/**
 * @fileoverview added by tsickle
 * Generated from: tree-select.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable:no-empty */
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkConnectedOverlay, ViewportRuler } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Directive, ElementRef, EventEmitter, Inject, Input, NgZone, Optional, Output, QueryList, Renderer2, Self, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormControlName, FormGroupDirective, NG_VALIDATORS, NgControl, NgForm, NgModel } from '@angular/forms';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW, A, PAGE_UP, PAGE_DOWN, hasModifierKey } from '@ptsecurity/cdk/keycodes';
import { CdkTree } from '@ptsecurity/cdk/tree';
import { getOptionScrollPosition, ErrorStateMatcher, mixinTabIndex, mixinDisabled, mixinErrorState, mcSelectAnimations, SELECT_PANEL_MAX_HEIGHT, SELECT_PANEL_PADDING_X, SELECT_PANEL_VIEWPORT_PADDING, MC_SELECT_SCROLL_STRATEGY, getMcSelectDynamicMultipleError, getMcSelectNonFunctionValueError, getMcSelectNonArrayValueError, MultipleMode, MC_VALIDATION, setMosaicValidation } from '@ptsecurity/mosaic/core';
import { McCleaner, McFormField, McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { McTag } from '@ptsecurity/mosaic/tags';
import { McTreeSelection } from '@ptsecurity/mosaic/tree';
import { defer, merge, Observable, Subject } from 'rxjs';
import { filter, map, switchMap, take, takeUntil, distinctUntilChanged } from 'rxjs/operators';
/** @type {?} */
let nextUniqueId = 0;
/**
 * Change event object that is emitted when the select value has changed.
 */
export class McTreeSelectChange {
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
if (false) {
    /** @type {?} */
    McTreeSelectChange.prototype.source;
    /** @type {?} */
    McTreeSelectChange.prototype.value;
    /** @type {?} */
    McTreeSelectChange.prototype.isUserInput;
}
export class McTreeSelectTrigger {
}
McTreeSelectTrigger.decorators = [
    { type: Directive, args: [{ selector: 'mc-tree-select-trigger' },] }
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
if (false) {
    /** @type {?} */
    McTreeSelectBase.prototype.elementRef;
    /** @type {?} */
    McTreeSelectBase.prototype.defaultErrorStateMatcher;
    /** @type {?} */
    McTreeSelectBase.prototype.parentForm;
    /** @type {?} */
    McTreeSelectBase.prototype.parentFormGroup;
    /** @type {?} */
    McTreeSelectBase.prototype.ngControl;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
const McTreeSelectMixinBase = mixinTabIndex(mixinDisabled(mixinErrorState(McTreeSelectBase)));
export class McTreeSelect extends McTreeSelectMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} changeDetectorRef
     * @param {?} viewportRuler
     * @param {?} ngZone
     * @param {?} renderer
     * @param {?} defaultErrorStateMatcher
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
        if (this.customTrigger || this.empty || !this.multiple) {
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
                template: "<div cdk-overlay-origin\n     class=\"mc-tree-select__trigger\"\n     [class.mc-tree-select__trigger_multiple]=\"multiple\"\n     #origin=\"cdkOverlayOrigin\"\n     #trigger>\n    <div class=\"mc-tree-select__matcher\" [ngSwitch]=\"empty\">\n        <span class=\"mc-tree-select__placeholder\" *ngSwitchCase=\"true\">{{ placeholder || '\\u00A0' }}</span>\n        <span *ngSwitchCase=\"false\" [ngSwitch]=\"!!customTrigger\">\n            <div *ngSwitchDefault [ngSwitch]=\"multiple\" class=\"mc-tree-select__match-container\">\n                <span *ngSwitchCase=\"false\" class=\"mc-tree-select__matcher-text\">{{ triggerValue }}</span>\n                <div *ngSwitchCase=\"true\" class=\"mc-tree-select__multiple-matcher\">\n                    <div class=\"mc-tree-select__match-list\">\n                        <mc-tag *ngFor=\"let option of triggerValues\"\n                            [selectable]=\"false\"\n                            [disabled]=\"disabled\"\n                            [class.mc-error]=\"errorState\">\n\n                            {{ tree.treeControl.getViewValue(option) }}\n                            <i mc-icon=\"mc-close-S_16\" (click)=\"onRemoveSelectedOption(option, $event)\"></i>\n                        </mc-tag>\n                    </div>\n                    <div class=\"mc-tree-select__match-hidden-text\"\n                         [style.display]=\"hiddenItems > 0 ? 'block' : 'none'\"\n                         #hiddenItemsCounter>\n                        {{ hiddenItemsTextFormatter(hiddenItemsText, hiddenItems) }}\n                    </div>\n                </div>\n            </div>\n            <ng-content select=\"mc-tree-select-trigger\" *ngSwitchCase=\"true\"></ng-content>\n        </span>\n    </div>\n\n    <div class=\"mc-select__cleaner\" *ngIf=\"canShowCleaner\" (click)=\"clearValue($event)\">\n        <ng-content select=\"mc-cleaner\"></ng-content>\n    </div>\n\n    <div class=\"mc-tree-select__arrow-wrapper\">\n        <i class=\"mc-tree-select__arrow\" mc-icon=\"mc-angle-down-L_16\"></i>\n    </div>\n</div>\n\n<ng-template\n    cdk-connected-overlay\n    cdkConnectedOverlayLockPosition\n    cdkConnectedOverlayHasBackdrop\n    cdkConnectedOverlayBackdropClass=\"cdk-overlay-transparent-backdrop\"\n    [cdkConnectedOverlayScrollStrategy]=\"scrollStrategy\"\n    [cdkConnectedOverlayOrigin]=\"origin\"\n    [cdkConnectedOverlayOpen]=\"panelOpen\"\n    [cdkConnectedOverlayPositions]=\"positions\"\n    [cdkConnectedOverlayMinWidth]=\"triggerRect?.width\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    (backdropClick)=\"close()\"\n    (attach)=\"onAttached()\"\n    (detach)=\"close()\">\n\n    <div #panel\n         class=\"mc-tree-select__panel {{ getPanelTheme() }}\"\n         [ngClass]=\"panelClass\"\n         (@transformPanel.done)=\"panelDoneAnimatingStream.next($event.toState)\"\n         [style.transformOrigin]=\"transformOrigin\"\n         [class.mc-select-panel-done-animcing]=\"panelDoneAnimating\"\n         [style.font-size.px]=\"triggerFontSize\"\n         (keydown)=\"handleKeydown($event)\">\n\n        <div #optionsContainer\n             class=\"mc-tree-select__content\"\n             [@fadeInContent]=\"'showing'\"\n             (@fadeInContent.done)=\"onFadeInDone()\">\n            <ng-content select=\"mc-tree-selection\"></ng-content>\n        </div>\n    </div>\n</ng-template>\n",
                inputs: ['disabled', 'tabIndex'],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
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
                },
                animations: [
                    mcSelectAnimations.transformPanel,
                    mcSelectAnimations.fadeInContent
                ],
                providers: [
                    { provide: McFormFieldControl, useExisting: McTreeSelect },
                    { provide: CdkTree, useExisting: McTreeSelect }
                ],
                styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider_vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider_inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:80px}.mc-tree-selection{display:block}.mc-tree-option{display:flex;align-items:center;height:28px;word-wrap:break-word;border:2px solid transparent}.mc-tree-option>.mc-icon{margin-right:4px;cursor:pointer}.mc-tree-option:focus{outline:0}.mc-tree-option:not([disabled]){cursor:pointer}.mc-tree-option .mc-pseudo-checkbox{margin-right:8px}.mc-tree-node-toggle{margin-right:4px;cursor:pointer}.mc-tree-node-toggle .mc-icon{transform:rotate(-90deg)}.mc-tree-node-toggle.mc-opened .mc-icon{transform:rotate(0)}.mc-tree-node-toggle[disabled]{cursor:default}.mc-tree-select{box-sizing:border-box;display:inline-block;vertical-align:top;width:100%;outline:0}.mc-tree-select.mc-disabled .mc-tree-select__trigger{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.mc-tree-select__trigger{display:flex;box-sizing:border-box;position:relative;height:30px;cursor:pointer;padding-right:7px;padding-left:15px}.mc-tree-select__trigger.mc-tree-select__trigger_multiple{padding-left:7px}.mc-tree-select__trigger.mc-tree-select__trigger_multiple .mc-tree-select__placeholder{margin-left:8px}.mc-tree-select__matcher{display:flex;align-items:center;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mc-tree-select__matcher>span{width:100%}.mc-tree-select__multiple-matcher{display:flex;width:100%}.mc-tree-select__match-list{display:flex;flex-wrap:wrap;overflow:hidden;max-height:28px;margin:0;padding-left:0}.mc-tree-select__match-list .mc-tag{margin-right:4px}.mc-tree-select__match-container{display:flex;flex-direction:row;justify-content:space-between;width:100%}.mc-tree-select__match-container .mc-tree-select__match-hidden-text{flex:0 0 70px;-ms-grid-row-align:center;align-self:center;padding:0 8px;text-align:right}.mc-tree-select__match-item{display:flex;border:1px solid transparent;border-radius:3px;padding-left:7px;margin-right:4px;max-width:100%}.mc-tree-select__arrow-wrapper{-ms-grid-row-align:center;align-self:center}.mc-form-field-appearance-fill .mc-tree-select__arrow-wrapper,.mc-form-field-appearance-standard .mc-tree-select__arrow-wrapper{transform:translateY(-50%)}.mc-form-field-appearance-outline .mc-tree-select__arrow-wrapper{transform:translateY(-25%)}.mc-tree-select__panel{max-height:224px;min-width:100%;overflow:auto;border-width:1px;border-style:solid;border-bottom-left-radius:3px;border-bottom-right-radius:3px;padding:4px 0}.mc-tree-select__panel .mc-optgroup-label,.mc-tree-select__panel .mc-tree-select-option{font-size:inherit;line-height:32px;height:32px}.mc-tree-select__content,.mc-tree-select__content .mc-tree-selection{height:100%}.mc-form-field-type-mc-select:not(.mc-disabled) .mc-form-field-flex{cursor:pointer}.mc-form-field-type-mc-select .mc-form-field-label{width:calc(100% - 18px)}"]
            }] }
];
/** @nocollapse */
McTreeSelect.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: ViewportRuler },
    { type: NgZone },
    { type: Renderer2 },
    { type: ErrorStateMatcher },
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
if (false) {
    /**
     * A name for this control that can be used by `mc-form-field`.
     * @type {?}
     */
    McTreeSelect.prototype.controlType;
    /** @type {?} */
    McTreeSelect.prototype.hiddenItems;
    /**
     * The last measured value for the trigger's client bounding rect.
     * @type {?}
     */
    McTreeSelect.prototype.triggerRect;
    /**
     * The cached font-size of the trigger element.
     * @type {?}
     */
    McTreeSelect.prototype.triggerFontSize;
    /**
     * Deals with the selection logic.
     * @type {?}
     */
    McTreeSelect.prototype.selectionModel;
    /**
     * The value of the select panel's transform-origin property.
     * @type {?}
     */
    McTreeSelect.prototype.transformOrigin;
    /**
     * Whether the panel's animation is done.
     * @type {?}
     */
    McTreeSelect.prototype.panelDoneAnimating;
    /**
     * Emits when the panel element is finished transforming in.
     * @type {?}
     */
    McTreeSelect.prototype.panelDoneAnimatingStream;
    /**
     * Strategy that will be used to handle scrolling while the select panel is open.
     * @type {?}
     */
    McTreeSelect.prototype.scrollStrategy;
    /**
     * The y-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text.
     * when the panel opens. Will change based on the y-position of the selected option.
     * @type {?}
     */
    McTreeSelect.prototype.offsetY;
    /**
     * This position config ensures that the top "start" corner of the overlay
     * is aligned with with the top "start" of the origin by default (overlapping
     * the trigger completely). If the panel cannot fit below the trigger, it
     * will fall back to a position above the trigger.
     * @type {?}
     */
    McTreeSelect.prototype.positions;
    /** @type {?} */
    McTreeSelect.prototype.options;
    /** @type {?} */
    McTreeSelect.prototype.trigger;
    /** @type {?} */
    McTreeSelect.prototype.panel;
    /** @type {?} */
    McTreeSelect.prototype.overlayDir;
    /** @type {?} */
    McTreeSelect.prototype.hiddenItemsCounter;
    /** @type {?} */
    McTreeSelect.prototype.tags;
    /** @type {?} */
    McTreeSelect.prototype.cleaner;
    /**
     * User-supplied override of the trigger element.
     * @type {?}
     */
    McTreeSelect.prototype.customTrigger;
    /** @type {?} */
    McTreeSelect.prototype.tree;
    /** @type {?} */
    McTreeSelect.prototype.hiddenItemsText;
    /**
     * Event emitted when the select panel has been toggled.
     * @type {?}
     */
    McTreeSelect.prototype.openedChange;
    /**
     * Event emitted when the select has been opened.
     * @type {?}
     */
    McTreeSelect.prototype.openedStream;
    /**
     * Event emitted when the select has been closed.
     * @type {?}
     */
    McTreeSelect.prototype.closedStream;
    /**
     * Event emitted when the selected value has been changed by the user.
     * @type {?}
     */
    McTreeSelect.prototype.selectionChange;
    /**
     * Event that emits whenever the raw value of the select changes. This is here primarily
     * to facilitate the two-way binding for the `value` input.
     * \@docs-private
     * @type {?}
     */
    McTreeSelect.prototype.valueChange;
    /**
     * Classes to be passed to the select panel. Supports the same syntax as `ngClass`.
     * @type {?}
     */
    McTreeSelect.prototype.panelClass;
    /**
     * Object used to control when error messages are shown.
     * @type {?}
     */
    McTreeSelect.prototype.errorStateMatcher;
    /**
     * Function used to sort the values in a select in multiple mode.
     * Follows the same logic as `Array.prototype.sort`.
     * @type {?}
     */
    McTreeSelect.prototype.sortComparator;
    /**
     * Combined stream of all of the child options' change events.
     * @type {?}
     */
    McTreeSelect.prototype.optionSelectionChanges;
    /**
     * @type {?}
     * @private
     */
    McTreeSelect.prototype._placeholder;
    /**
     * @type {?}
     * @private
     */
    McTreeSelect.prototype._required;
    /**
     * @type {?}
     * @private
     */
    McTreeSelect.prototype._multiple;
    /**
     * @type {?}
     * @private
     */
    McTreeSelect.prototype._autoSelect;
    /**
     * @type {?}
     * @private
     */
    McTreeSelect.prototype._value;
    /**
     * @type {?}
     * @private
     */
    McTreeSelect.prototype._id;
    /**
     * @type {?}
     * @private
     */
    McTreeSelect.prototype._focused;
    /**
     * @type {?}
     * @private
     */
    McTreeSelect.prototype._panelOpen;
    /**
     * @type {?}
     * @private
     */
    McTreeSelect.prototype.originalOnKeyDown;
    /**
     * The scroll position of the overlay panel, calculated to center the selected option.
     * @type {?}
     * @private
     */
    McTreeSelect.prototype.scrollTop;
    /**
     * Unique id for this input.
     * @type {?}
     * @private
     */
    McTreeSelect.prototype.uid;
    /**
     * Emits whenever the component is destroyed.
     * @type {?}
     * @private
     */
    McTreeSelect.prototype.destroy;
    /**
     * @type {?}
     * @private
     */
    McTreeSelect.prototype.tempValues;
    /**
     * `View -> model callback called when value changes`
     * @type {?}
     */
    McTreeSelect.prototype.onChange;
    /**
     * `View -> model callback called when select has been touched`
     * @type {?}
     */
    McTreeSelect.prototype.onTouched;
    /**
     * Comparison function to specify which option is displayed. Defaults to object equality.
     * @type {?}
     * @private
     */
    McTreeSelect.prototype._compareWith;
    /** @type {?} */
    McTreeSelect.prototype.changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    McTreeSelect.prototype.viewportRuler;
    /**
     * @type {?}
     * @private
     */
    McTreeSelect.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    McTreeSelect.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    McTreeSelect.prototype.scrollStrategyFactory;
    /** @type {?} */
    McTreeSelect.prototype.rawValidators;
    /**
     * @type {?}
     * @private
     */
    McTreeSelect.prototype.mcValidation;
    /**
     * @type {?}
     * @private
     */
    McTreeSelect.prototype.dir;
    /**
     * @type {?}
     * @private
     */
    McTreeSelect.prototype.parentFormField;
    /** @type {?} */
    McTreeSelect.prototype.ngModel;
    /** @type {?} */
    McTreeSelect.prototype.formControlName;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RyZWUtc2VsZWN0LyIsInNvdXJjZXMiOlsidHJlZS1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUNILG1CQUFtQixFQUNuQixhQUFhLEVBQ2hCLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUdILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBRVQsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFJTixRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsSUFBSSxFQUVKLFNBQVMsRUFDVCxZQUFZLEVBQ1osaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFFSCxlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLGFBQWEsRUFDYixTQUFTLEVBQ1QsTUFBTSxFQUNOLE9BQU8sRUFFVixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFDSCxVQUFVLEVBQ1YsR0FBRyxFQUNILEtBQUssRUFDTCxJQUFJLEVBQ0osVUFBVSxFQUNWLFdBQVcsRUFDWCxLQUFLLEVBQ0wsUUFBUSxFQUNSLENBQUMsRUFDRCxPQUFPLEVBQ1AsU0FBUyxFQUNULGNBQWMsRUFDakIsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0MsT0FBTyxFQUNILHVCQUF1QixFQUd2QixpQkFB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O0lBRUYsK0JBQWlDOztJQUVqQywrQkFBNkQ7O0lBRTdELDZCQUF5RDs7SUFFekQsa0NBQW1GOztJQUVuRiwwQ0FBbUY7O0lBRW5GLDRCQUE0Qzs7SUFFNUMsK0JBQXNFOzs7OztJQUd0RSxxQ0FBeUY7O0lBRXpGLDRCQUFzRjs7SUFFdEYsdUNBQTRDOzs7OztJQUc1QyxvQ0FBcUY7Ozs7O0lBR3JGLG9DQUM0RDs7Ozs7SUFHNUQsb0NBQzZEOzs7OztJQUc3RCx1Q0FBNEU7Ozs7Ozs7SUFPNUUsbUNBQTRFOzs7OztJQUc1RSxrQ0FBOEU7Ozs7O0lBRzlFLHlDQUE4Qzs7Ozs7O0lBTTlDLHNDQUErRjs7Ozs7SUFHL0YsOENBUXFDOzs7OztJQWFyQyxvQ0FBNkI7Ozs7O0lBYTdCLGlDQUFtQzs7Ozs7SUFlbkMsaUNBQW1DOzs7OztJQWFuQyxtQ0FBb0M7Ozs7O0lBOEJwQyw4QkFBMkI7Ozs7O0lBWTNCLDJCQUFvQjs7Ozs7SUFXcEIsZ0NBQXlCOzs7OztJQVV6QixrQ0FBMkI7Ozs7O0lBRTNCLHlDQUEwRDs7Ozs7O0lBRzFELGlDQUFzQjs7Ozs7O0lBR3RCLDJCQUFxRDs7Ozs7O0lBR3JELCtCQUErQzs7Ozs7SUFHL0Msa0NBQTZDOzs7OztJQThKN0MsZ0NBQTBDOzs7OztJQUcxQyxpQ0FBcUI7Ozs7OztJQW1mckIsb0NBQXVEOztJQWhwQm5ELHlDQUE2Qzs7Ozs7SUFDN0MscUNBQTZDOzs7OztJQUM3Qyw4QkFBK0I7Ozs7O0lBQy9CLGdDQUFvQzs7Ozs7SUFFcEMsNkNBQXlFOztJQUN6RSxxQ0FBb0U7Ozs7O0lBQ3BFLG9DQUE0RTs7Ozs7SUFDNUUsMkJBQWdEOzs7OztJQUdoRCx1Q0FBeUQ7O0lBRXpELCtCQUEyQzs7SUFDM0MsdUNBQTJEIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGU6bm8tZW1wdHkgKi9cblxuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtcbiAgICBDZGtDb25uZWN0ZWRPdmVybGF5LFxuICAgIFZpZXdwb3J0UnVsZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRG9DaGVjayxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgUmVuZGVyZXIyLFxuICAgIFNlbGYsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0NoaWxkcmVuLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgICBGb3JtQ29udHJvbE5hbWUsXG4gICAgRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgIE5HX1ZBTElEQVRPUlMsXG4gICAgTmdDb250cm9sLFxuICAgIE5nRm9ybSxcbiAgICBOZ01vZGVsLFxuICAgIFZhbGlkYXRvclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICAgIERPV05fQVJST1csXG4gICAgRU5ELFxuICAgIEVOVEVSLFxuICAgIEhPTUUsXG4gICAgTEVGVF9BUlJPVyxcbiAgICBSSUdIVF9BUlJPVyxcbiAgICBTUEFDRSxcbiAgICBVUF9BUlJPVyxcbiAgICBBLFxuICAgIFBBR0VfVVAsXG4gICAgUEFHRV9ET1dOLFxuICAgIGhhc01vZGlmaWVyS2V5XG59IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBDZGtUcmVlIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL3RyZWUnO1xuaW1wb3J0IHtcbiAgICBnZXRPcHRpb25TY3JvbGxQb3NpdGlvbixcbiAgICBDYW5EaXNhYmxlLFxuICAgIENhblVwZGF0ZUVycm9yU3RhdGUsXG4gICAgRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgSGFzVGFiSW5kZXgsXG4gICAgQ2FuRGlzYWJsZUN0b3IsXG4gICAgSGFzVGFiSW5kZXhDdG9yLFxuICAgIENhblVwZGF0ZUVycm9yU3RhdGVDdG9yLFxuICAgIG1peGluVGFiSW5kZXgsXG4gICAgbWl4aW5EaXNhYmxlZCxcbiAgICBtaXhpbkVycm9yU3RhdGUsXG4gICAgbWNTZWxlY3RBbmltYXRpb25zLFxuXG4gICAgU0VMRUNUX1BBTkVMX01BWF9IRUlHSFQsXG4gICAgU0VMRUNUX1BBTkVMX1BBRERJTkdfWCxcbiAgICBTRUxFQ1RfUEFORUxfVklFV1BPUlRfUEFERElORyxcbiAgICBNQ19TRUxFQ1RfU0NST0xMX1NUUkFURUdZLFxuXG4gICAgZ2V0TWNTZWxlY3REeW5hbWljTXVsdGlwbGVFcnJvcixcbiAgICBnZXRNY1NlbGVjdE5vbkZ1bmN0aW9uVmFsdWVFcnJvcixcbiAgICBnZXRNY1NlbGVjdE5vbkFycmF5VmFsdWVFcnJvcixcbiAgICBNdWx0aXBsZU1vZGUsXG5cbiAgICBNQ19WQUxJREFUSU9OLFxuICAgIHNldE1vc2FpY1ZhbGlkYXRpb24sXG4gICAgTWNWYWxpZGF0aW9uT3B0aW9uc1xufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0NsZWFuZXIsIE1jRm9ybUZpZWxkLCBNY0Zvcm1GaWVsZENvbnRyb2wgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBNY1RhZyB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy90YWdzJztcbmltcG9ydCB7IE1jVHJlZVNlbGVjdGlvbiwgTWNUcmVlT3B0aW9uIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL3RyZWUnO1xuaW1wb3J0IHsgZGVmZXIsIG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICAgIGZpbHRlcixcbiAgICBtYXAsXG4gICAgc3dpdGNoTWFwLFxuICAgIHRha2UsXG4gICAgdGFrZVVudGlsLFxuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxuLyoqIENoYW5nZSBldmVudCBvYmplY3QgdGhhdCBpcyBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCB2YWx1ZSBoYXMgY2hhbmdlZC4gKi9cbmV4cG9ydCBjbGFzcyBNY1RyZWVTZWxlY3RDaGFuZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2U6IE1jVHJlZVNlbGVjdCwgcHVibGljIHZhbHVlOiBhbnksIHB1YmxpYyBpc1VzZXJJbnB1dCA9IGZhbHNlKSB7fVxufVxuXG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ21jLXRyZWUtc2VsZWN0LXRyaWdnZXInIH0pXG5leHBvcnQgY2xhc3MgTWNUcmVlU2VsZWN0VHJpZ2dlciB7fVxuXG5cbmNsYXNzIE1jVHJlZVNlbGVjdEJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHVibGljIGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgICAgIHB1YmxpYyBwYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgICAgIHB1YmxpYyBwYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICAgICAgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sXG4gICAgKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmNvbnN0IE1jVHJlZVNlbGVjdE1peGluQmFzZTogQ2FuRGlzYWJsZUN0b3IgJiBIYXNUYWJJbmRleEN0b3IgJiBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvciAmXG4gICAgdHlwZW9mIE1jVHJlZVNlbGVjdEJhc2UgPSBtaXhpblRhYkluZGV4KG1peGluRGlzYWJsZWQobWl4aW5FcnJvclN0YXRlKE1jVHJlZVNlbGVjdEJhc2UpKSk7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy10cmVlLXNlbGVjdCcsXG4gICAgZXhwb3J0QXM6ICdtY1RyZWVTZWxlY3QnLFxuICAgIHRlbXBsYXRlVXJsOiAndHJlZS1zZWxlY3QuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdHJlZS1zZWxlY3Quc2NzcyddLFxuICAgIGlucHV0czogWydkaXNhYmxlZCcsICd0YWJJbmRleCddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRyZWUtc2VsZWN0JyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWludmFsaWRdJzogJ2Vycm9yU3RhdGUnLFxuXG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcblxuICAgICAgICAnKGNsaWNrKSc6ICd0b2dnbGUoKScsXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyhmb2N1cyknOiAnb25Gb2N1cygpJyxcbiAgICAgICAgJyhibHVyKSc6ICdvbkJsdXIoKScsXG4gICAgICAgICcod2luZG93OnJlc2l6ZSknOiAnY2FsY3VsYXRlSGlkZGVuSXRlbXMoKSdcbiAgICB9LFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgbWNTZWxlY3RBbmltYXRpb25zLnRyYW5zZm9ybVBhbmVsLFxuICAgICAgICBtY1NlbGVjdEFuaW1hdGlvbnMuZmFkZUluQ29udGVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogTWNGb3JtRmllbGRDb250cm9sLCB1c2VFeGlzdGluZzogTWNUcmVlU2VsZWN0IH0sXG4gICAgICAgIHsgcHJvdmlkZTogQ2RrVHJlZSwgdXNlRXhpc3Rpbmc6IE1jVHJlZVNlbGVjdCB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNY1RyZWVTZWxlY3QgZXh0ZW5kcyBNY1RyZWVTZWxlY3RNaXhpbkJhc2UgaW1wbGVtZW50c1xuICAgIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIERvQ2hlY2ssIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIENhbkRpc2FibGUsIEhhc1RhYkluZGV4LCBNY0Zvcm1GaWVsZENvbnRyb2w8TWNUcmVlT3B0aW9uPiwgQ2FuVXBkYXRlRXJyb3JTdGF0ZSB7XG5cbiAgICAvKiogQSBuYW1lIGZvciB0aGlzIGNvbnRyb2wgdGhhdCBjYW4gYmUgdXNlZCBieSBgbWMtZm9ybS1maWVsZGAuICovXG4gICAgY29udHJvbFR5cGUgPSAnbWMtc2VsZWN0JztcblxuICAgIGhpZGRlbkl0ZW1zOiBudW1iZXIgPSAwO1xuXG4gICAgLyoqIFRoZSBsYXN0IG1lYXN1cmVkIHZhbHVlIGZvciB0aGUgdHJpZ2dlcidzIGNsaWVudCBib3VuZGluZyByZWN0LiAqL1xuICAgIHRyaWdnZXJSZWN0OiBDbGllbnRSZWN0O1xuXG4gICAgLyoqIFRoZSBjYWNoZWQgZm9udC1zaXplIG9mIHRoZSB0cmlnZ2VyIGVsZW1lbnQuICovXG4gICAgdHJpZ2dlckZvbnRTaXplID0gMDtcblxuICAgIC8qKiBEZWFscyB3aXRoIHRoZSBzZWxlY3Rpb24gbG9naWMuICovXG4gICAgc2VsZWN0aW9uTW9kZWw6IFNlbGVjdGlvbk1vZGVsPGFueT47XG5cbiAgICAvKiogVGhlIHZhbHVlIG9mIHRoZSBzZWxlY3QgcGFuZWwncyB0cmFuc2Zvcm0tb3JpZ2luIHByb3BlcnR5LiAqL1xuICAgIHRyYW5zZm9ybU9yaWdpbjogc3RyaW5nID0gJ3RvcCc7XG5cbiAgICAvKiogV2hldGhlciB0aGUgcGFuZWwncyBhbmltYXRpb24gaXMgZG9uZS4gKi9cbiAgICBwYW5lbERvbmVBbmltYXRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSBwYW5lbCBlbGVtZW50IGlzIGZpbmlzaGVkIHRyYW5zZm9ybWluZyBpbi4gKi9cbiAgICBwYW5lbERvbmVBbmltYXRpbmdTdHJlYW0gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbiAgICAvKiogU3RyYXRlZ3kgdGhhdCB3aWxsIGJlIHVzZWQgdG8gaGFuZGxlIHNjcm9sbGluZyB3aGlsZSB0aGUgc2VsZWN0IHBhbmVsIGlzIG9wZW4uICovXG4gICAgc2Nyb2xsU3RyYXRlZ3kgPSB0aGlzLnNjcm9sbFN0cmF0ZWd5RmFjdG9yeSgpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHktb2Zmc2V0IG9mIHRoZSBvdmVybGF5IHBhbmVsIGluIHJlbGF0aW9uIHRvIHRoZSB0cmlnZ2VyJ3MgdG9wIHN0YXJ0IGNvcm5lci5cbiAgICAgKiBUaGlzIG11c3QgYmUgYWRqdXN0ZWQgdG8gYWxpZ24gdGhlIHNlbGVjdGVkIG9wdGlvbiB0ZXh0IG92ZXIgdGhlIHRyaWdnZXIgdGV4dC5cbiAgICAgKiB3aGVuIHRoZSBwYW5lbCBvcGVucy4gV2lsbCBjaGFuZ2UgYmFzZWQgb24gdGhlIHktcG9zaXRpb24gb2YgdGhlIHNlbGVjdGVkIG9wdGlvbi5cbiAgICAgKi9cbiAgICBvZmZzZXRZID0gMDtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgcG9zaXRpb24gY29uZmlnIGVuc3VyZXMgdGhhdCB0aGUgdG9wIFwic3RhcnRcIiBjb3JuZXIgb2YgdGhlIG92ZXJsYXlcbiAgICAgKiBpcyBhbGlnbmVkIHdpdGggd2l0aCB0aGUgdG9wIFwic3RhcnRcIiBvZiB0aGUgb3JpZ2luIGJ5IGRlZmF1bHQgKG92ZXJsYXBwaW5nXG4gICAgICogdGhlIHRyaWdnZXIgY29tcGxldGVseSkuIElmIHRoZSBwYW5lbCBjYW5ub3QgZml0IGJlbG93IHRoZSB0cmlnZ2VyLCBpdFxuICAgICAqIHdpbGwgZmFsbCBiYWNrIHRvIGEgcG9zaXRpb24gYWJvdmUgdGhlIHRyaWdnZXIuXG4gICAgICovXG4gICAgcG9zaXRpb25zID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXG4gICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgIG92ZXJsYXlZOiAndG9wJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJ1xuICAgICAgICB9XG4gICAgXTtcblxuICAgIG9wdGlvbnM6IFF1ZXJ5TGlzdDxNY1RyZWVPcHRpb24+O1xuXG4gICAgQFZpZXdDaGlsZCgndHJpZ2dlcicsIHsgc3RhdGljOiBmYWxzZSB9KSB0cmlnZ2VyOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgncGFuZWwnLCB7IHN0YXRpYzogZmFsc2UgfSkgcGFuZWw6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKENka0Nvbm5lY3RlZE92ZXJsYXksIHsgc3RhdGljOiBmYWxzZSB9KSBvdmVybGF5RGlyOiBDZGtDb25uZWN0ZWRPdmVybGF5O1xuXG4gICAgQFZpZXdDaGlsZCgnaGlkZGVuSXRlbXNDb3VudGVyJywgeyBzdGF0aWM6IGZhbHNlIH0pIGhpZGRlbkl0ZW1zQ291bnRlcjogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGRyZW4oTWNUYWcpIHRhZ3M6IFF1ZXJ5TGlzdDxNY1RhZz47XG5cbiAgICBAQ29udGVudENoaWxkKCdtY1NlbGVjdENsZWFuZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBjbGVhbmVyOiBNY0NsZWFuZXI7XG5cbiAgICAvKiogVXNlci1zdXBwbGllZCBvdmVycmlkZSBvZiB0aGUgdHJpZ2dlciBlbGVtZW50LiAqL1xuICAgIEBDb250ZW50Q2hpbGQoTWNUcmVlU2VsZWN0VHJpZ2dlciwgeyBzdGF0aWM6IGZhbHNlIH0pIGN1c3RvbVRyaWdnZXI6IE1jVHJlZVNlbGVjdFRyaWdnZXI7XG5cbiAgICBAQ29udGVudENoaWxkKE1jVHJlZVNlbGVjdGlvbiwgeyBzdGF0aWM6IGZhbHNlIH0pIHRyZWU6IE1jVHJlZVNlbGVjdGlvbjxNY1RyZWVPcHRpb24+O1xuXG4gICAgQElucHV0KCkgaGlkZGVuSXRlbXNUZXh0OiBzdHJpbmcgPSAnLi4u0LXRidGRJztcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCBwYW5lbCBoYXMgYmVlbiB0b2dnbGVkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBvcGVuZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCBoYXMgYmVlbiBvcGVuZWQuICovXG4gICAgQE91dHB1dCgnb3BlbmVkJykgcmVhZG9ubHkgb3BlbmVkU3RyZWFtOiBPYnNlcnZhYmxlPHZvaWQ+ID1cbiAgICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UucGlwZShmaWx0ZXIoKG8pID0+IG8pLCBtYXAoKCkgPT4ge30pKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCBoYXMgYmVlbiBjbG9zZWQuICovXG4gICAgQE91dHB1dCgnY2xvc2VkJykgcmVhZG9ubHkgY2xvc2VkU3RyZWFtOiBPYnNlcnZhYmxlPHZvaWQ+ID1cbiAgICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UucGlwZShmaWx0ZXIoKG8pID0+ICFvKSwgbWFwKCgpID0+IHt9KSk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3RlZCB2YWx1ZSBoYXMgYmVlbiBjaGFuZ2VkIGJ5IHRoZSB1c2VyLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3Rpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE1jVHJlZVNlbGVjdENoYW5nZT4oKTtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IHRoYXQgZW1pdHMgd2hlbmV2ZXIgdGhlIHJhdyB2YWx1ZSBvZiB0aGUgc2VsZWN0IGNoYW5nZXMuIFRoaXMgaXMgaGVyZSBwcmltYXJpbHlcbiAgICAgKiB0byBmYWNpbGl0YXRlIHRoZSB0d28td2F5IGJpbmRpbmcgZm9yIHRoZSBgdmFsdWVgIGlucHV0LlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICAvKiogQ2xhc3NlcyB0byBiZSBwYXNzZWQgdG8gdGhlIHNlbGVjdCBwYW5lbC4gU3VwcG9ydHMgdGhlIHNhbWUgc3ludGF4IGFzIGBuZ0NsYXNzYC4gKi9cbiAgICBASW5wdXQoKSBwYW5lbENsYXNzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+IHwgeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcblxuICAgIC8qKiBPYmplY3QgdXNlZCB0byBjb250cm9sIHdoZW4gZXJyb3IgbWVzc2FnZXMgYXJlIHNob3duLiAqL1xuICAgIEBJbnB1dCgpIGVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcjtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHVzZWQgdG8gc29ydCB0aGUgdmFsdWVzIGluIGEgc2VsZWN0IGluIG11bHRpcGxlIG1vZGUuXG4gICAgICogRm9sbG93cyB0aGUgc2FtZSBsb2dpYyBhcyBgQXJyYXkucHJvdG90eXBlLnNvcnRgLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHNvcnRDb21wYXJhdG9yOiAoYTogTWNUcmVlT3B0aW9uLCBiOiBNY1RyZWVPcHRpb24sIG9wdGlvbnM6IE1jVHJlZU9wdGlvbltdKSA9PiBudW1iZXI7XG5cbiAgICAvKiogQ29tYmluZWQgc3RyZWFtIG9mIGFsbCBvZiB0aGUgY2hpbGQgb3B0aW9ucycgY2hhbmdlIGV2ZW50cy4gKi9cbiAgICByZWFkb25seSBvcHRpb25TZWxlY3Rpb25DaGFuZ2VzOiBPYnNlcnZhYmxlPE1jVHJlZVNlbGVjdENoYW5nZT4gPSBkZWZlcigoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBtZXJnZSguLi50aGlzLm9wdGlvbnMubWFwKChvcHRpb24pID0+IG9wdGlvbi5vblNlbGVjdGlvbkNoYW5nZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubmdab25lLm9uU3RhYmxlXG4gICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSksIHN3aXRjaE1hcCgoKSA9PiB0aGlzLm9wdGlvblNlbGVjdGlvbkNoYW5nZXMpKTtcbiAgICB9KSBhcyBPYnNlcnZhYmxlPE1jVHJlZVNlbGVjdENoYW5nZT47XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBwbGFjZWhvbGRlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGxhY2Vob2xkZXI7XG4gICAgfVxuXG4gICAgc2V0IHBsYWNlaG9sZGVyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXIgPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7XG4gICAgfVxuXG4gICAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG11bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbXVsdGlwbGU7XG4gICAgfVxuXG4gICAgc2V0IG11bHRpcGxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGVsKSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRNY1NlbGVjdER5bmFtaWNNdWx0aXBsZUVycm9yKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9tdWx0aXBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGF1dG9TZWxlY3QoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRvU2VsZWN0O1xuICAgIH1cblxuICAgIHNldCBhdXRvU2VsZWN0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2F1dG9TZWxlY3QgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2F1dG9TZWxlY3Q6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gY29tcGFyZSB0aGUgb3B0aW9uIHZhbHVlcyB3aXRoIHRoZSBzZWxlY3RlZCB2YWx1ZXMuIFRoZSBmaXJzdCBhcmd1bWVudFxuICAgICAqIGlzIGEgdmFsdWUgZnJvbSBhbiBvcHRpb24uIFRoZSBzZWNvbmQgaXMgYSB2YWx1ZSBmcm9tIHRoZSBzZWxlY3Rpb24uIEEgYm9vbGVhblxuICAgICAqIHNob3VsZCBiZSByZXR1cm5lZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBjb21wYXJlV2l0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBhcmVXaXRoO1xuICAgIH1cblxuICAgIHNldCBjb21wYXJlV2l0aChmbjogKG8xOiBhbnksIG8yOiBhbnkpID0+IGJvb2xlYW4pIHtcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnN0cmljdC10eXBlLXByZWRpY2F0ZXMgKi9cbiAgICAgICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgZ2V0TWNTZWxlY3ROb25GdW5jdGlvblZhbHVlRXJyb3IoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NvbXBhcmVXaXRoID0gZm47XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZWwpIHtcbiAgICAgICAgICAgIC8vIEEgZGlmZmVyZW50IGNvbXBhcmF0b3IgbWVhbnMgdGhlIHNlbGVjdGlvbiBjb3VsZCBjaGFuZ2UuXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5tdWx0aXBsZSA/IHRoaXMudHJlZS5nZXRTZWxlY3RlZFZhbHVlcygpIDogdGhpcy50cmVlLmdldFNlbGVjdGVkVmFsdWVzKClbMF07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdmFsdWU6IGFueSA9IG51bGw7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBpZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfVxuXG4gICAgc2V0IGlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faWQgPSB2YWx1ZSB8fCB0aGlzLnVpZDtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lkOiBzdHJpbmc7XG5cbiAgICAvKiogV2hldGhlciB0aGUgc2VsZWN0IGlzIGZvY3VzZWQuICovXG4gICAgZ2V0IGZvY3VzZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mb2N1c2VkIHx8IHRoaXMuX3BhbmVsT3BlbjtcbiAgICB9XG5cbiAgICBzZXQgZm9jdXNlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9mb2N1c2VkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZm9jdXNlZCA9IGZhbHNlO1xuXG4gICAgZ2V0IHBhbmVsT3BlbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhbmVsT3BlbjtcbiAgICB9XG5cbiAgICBnZXQgY2FuU2hvd0NsZWFuZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsZWFuZXIgJiYgdGhpcy5zZWxlY3Rpb25Nb2RlbC5oYXNWYWx1ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3BhbmVsT3BlbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBvcmlnaW5hbE9uS2V5RG93bjogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB2b2lkO1xuXG4gICAgLyoqIFRoZSBzY3JvbGwgcG9zaXRpb24gb2YgdGhlIG92ZXJsYXkgcGFuZWwsIGNhbGN1bGF0ZWQgdG8gY2VudGVyIHRoZSBzZWxlY3RlZCBvcHRpb24uICovXG4gICAgcHJpdmF0ZSBzY3JvbGxUb3AgPSAwO1xuXG4gICAgLyoqIFVuaXF1ZSBpZCBmb3IgdGhpcyBpbnB1dC4gKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IHVpZCA9IGBtYy1zZWxlY3QtJHtuZXh0VW5pcXVlSWQrK31gO1xuXG4gICAgLyoqIEVtaXRzIHdoZW5ldmVyIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkLiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICAvLyBVc2VkIGZvciBzdG9yaW5nIHRoZSB2YWx1ZXMgdGhhdCB3ZXJlIGFzc2lnbmVkIGJlZm9yZSB0aGUgb3B0aW9ucyB3ZXJlIGluaXRpYWxpemVkLlxuICAgIHByaXZhdGUgdGVtcFZhbHVlczogc3RyaW5nIHwgc3RyaW5nW10gfCBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHJlYWRvbmx5IGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSB2aWV3cG9ydFJ1bGVyOiBWaWV3cG9ydFJ1bGVyLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IG5nWm9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgICAgIEBJbmplY3QoTUNfU0VMRUNUX1NDUk9MTF9TVFJBVEVHWSkgcHJpdmF0ZSByZWFkb25seSBzY3JvbGxTdHJhdGVneUZhY3RvcnksXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTkdfVkFMSURBVE9SUykgcHVibGljIHJhd1ZhbGlkYXRvcnM6IFZhbGlkYXRvcltdLFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1DX1ZBTElEQVRJT04pIHByaXZhdGUgbWNWYWxpZGF0aW9uOiBNY1ZhbGlkYXRpb25PcHRpb25zLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJlYWRvbmx5IGRpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgIEBPcHRpb25hbCgpIHBhcmVudEZvcm06IE5nRm9ybSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcmVhZG9ubHkgcGFyZW50Rm9ybUZpZWxkOiBNY0Zvcm1GaWVsZCxcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBuZ0NvbnRyb2w6IE5nQ29udHJvbCxcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgbmdNb2RlbDogTmdNb2RlbCxcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgZm9ybUNvbnRyb2xOYW1lOiBGb3JtQ29udHJvbE5hbWVcbiAgICApIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZiwgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyLCBwYXJlbnRGb3JtLCBwYXJlbnRGb3JtR3JvdXAsIG5nQ29udHJvbCk7XG5cbiAgICAgICAgaWYgKHRoaXMubmdDb250cm9sKSB7XG4gICAgICAgICAgICAvLyBOb3RlOiB3ZSBwcm92aWRlIHRoZSB2YWx1ZSBhY2Nlc3NvciB0aHJvdWdoIGhlcmUsIGluc3RlYWQgb2ZcbiAgICAgICAgICAgIC8vIHRoZSBgcHJvdmlkZXJzYCB0byBhdm9pZCBydW5uaW5nIGludG8gYSBjaXJjdWxhciBpbXBvcnQuXG4gICAgICAgICAgICB0aGlzLm5nQ29udHJvbC52YWx1ZUFjY2Vzc29yID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZvcmNlIHNldHRlciB0byBiZSBjYWxsZWQgaW4gY2FzZSBpZCB3YXMgbm90IHNwZWNpZmllZC5cbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuaWQ7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcblxuICAgICAgICAvLyBXZSBuZWVkIGBkaXN0aW5jdFVudGlsQ2hhbmdlZGAgaGVyZSwgYmVjYXVzZSBzb21lIGJyb3dzZXJzIHdpbGxcbiAgICAgICAgLy8gZmlyZSB0aGUgYW5pbWF0aW9uIGVuZCBldmVudCB0d2ljZSBmb3IgdGhlIHNhbWUgYW5pbWF0aW9uLiBTZWU6XG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzI0MDg0XG4gICAgICAgIHRoaXMucGFuZWxEb25lQW5pbWF0aW5nU3RyZWFtXG4gICAgICAgICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLCB0YWtlVW50aWwodGhpcy5kZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvcCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbmVkQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFuZWxEb25lQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheURpci5vZmZzZXRYID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy50cmVlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmICh0aGlzLm1jVmFsaWRhdGlvbi51c2VWYWxpZGF0aW9uKSB7XG4gICAgICAgICAgICBzZXRNb3NhaWNWYWxpZGF0aW9uKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmVlLnJlc2V0Rm9jdXNlZEl0ZW1PbkJsdXIgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsID0gdGhpcy50cmVlLnNlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsPGFueT4odGhpcy5tdWx0aXBsZSk7XG4gICAgICAgIHRoaXMudHJlZS5uZ0FmdGVyQ29udGVudEluaXQoKTtcblxuICAgICAgICB0aGlzLmluaXRLZXlNYW5hZ2VyKCk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy50cmVlLnJlbmRlcmVkT3B0aW9ucztcbiAgICAgICAgdGhpcy50cmVlLmF1dG9TZWxlY3QgPSB0aGlzLmF1dG9TZWxlY3Q7XG5cbiAgICAgICAgaWYgKHRoaXMudHJlZS5tdWx0aXBsZU1vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudHJlZS5tdWx0aXBsZU1vZGUgPSB0aGlzLm11bHRpcGxlID8gTXVsdGlwbGVNb2RlLkNIRUNLQk9YIDogbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLnRyZWUubm9VbnNlbGVjdExhc3QgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRlbXBWYWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uQnlWYWx1ZSh0aGlzLnRlbXBWYWx1ZXMpO1xuICAgICAgICAgICAgdGhpcy50ZW1wVmFsdWVzID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3B0aW9uU2VsZWN0aW9uQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSAmJiB0aGlzLnBhbmVsT3BlbiAmJiBldmVudC5pc1VzZXJJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50cmVlLnNlbGVjdGlvbkNoYW5nZVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5zZWxlY3RlZFZhbHVlcyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KG5ldyBNY1RyZWVTZWxlY3RDaGFuZ2UodGhpcywgZXZlbnQub3B0aW9uKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmNoYW5nZWRcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuYWRkZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLnNldEZvY3VzT3JpZ2luKCdwcm9ncmFtJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuZmluZCgob3B0aW9uKSA9PiBvcHRpb24uZGF0YSA9PT0gZXZlbnQuYWRkZWRbMF0pIGFzIGFueVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRyZWUpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy50YWdzLmNoYW5nZXNcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jYWxjdWxhdGVIaWRkZW5JdGVtcygpLCAwKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jYWxjdWxhdGVIaWRkZW5JdGVtcygpLCAwKTtcbiAgICB9XG5cbiAgICBuZ0RvQ2hlY2soKSB7XG4gICAgICAgIGlmICh0aGlzLm5nQ29udHJvbCkgeyB0aGlzLnVwZGF0ZUVycm9yU3RhdGUoKTsgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgLy8gVXBkYXRpbmcgdGhlIGRpc2FibGVkIHN0YXRlIGlzIGhhbmRsZWQgYnkgYG1peGluRGlzYWJsZWRgLCBidXQgd2UgbmVlZCB0byBhZGRpdGlvbmFsbHkgbGV0XG4gICAgICAgIC8vIHRoZSBwYXJlbnQgZm9ybSBmaWVsZCBrbm93IHRvIHJ1biBjaGFuZ2UgZGV0ZWN0aW9uIHdoZW4gdGhlIGRpc2FibGVkIHN0YXRlIGNoYW5nZXMuXG4gICAgICAgIGlmIChjaGFuZ2VzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95Lm5leHQoKTtcblxuICAgICAgICB0aGlzLmRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGhpZGRlbkl0ZW1zVGV4dEZvcm1hdHRlcihoaWRkZW5JdGVtc1RleHQ6IHN0cmluZywgaGlkZGVuSXRlbXM6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHtoaWRkZW5JdGVtc1RleHR9ICR7aGlkZGVuSXRlbXN9YDtcbiAgICB9XG5cbiAgICBjbGVhclZhbHVlKCRldmVudCk6IHZvaWQge1xuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuICAgICAgICB0aGlzLnRyZWUua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKC0xKTtcblxuICAgICAgICB0aGlzLnNldFNlbGVjdGlvbkJ5VmFsdWUoW10pO1xuXG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5zZWxlY3RlZFZhbHVlcyk7XG4gICAgfVxuXG4gICAgLyoqIGBWaWV3IC0+IG1vZGVsIGNhbGxiYWNrIGNhbGxlZCB3aGVuIHZhbHVlIGNoYW5nZXNgICovXG4gICAgb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgICAvKiogYFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gc2VsZWN0IGhhcyBiZWVuIHRvdWNoZWRgICovXG4gICAgb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgICB0b2dnbGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAhdGhpcy5vcHRpb25zIHx8ICF0aGlzLm9wdGlvbnMubGVuZ3RoIHx8IHRoaXMuX3BhbmVsT3BlbikgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnRyaWdnZXJSZWN0ID0gdGhpcy50cmlnZ2VyLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIC8vIE5vdGU6IFRoZSBjb21wdXRlZCBmb250LXNpemUgd2lsbCBiZSBhIHN0cmluZyBwaXhlbCB2YWx1ZSAoZS5nLiBcIjE2cHhcIikuXG4gICAgICAgIC8vIGBwYXJzZUludGAgaWdub3JlcyB0aGUgdHJhaWxpbmcgJ3B4JyBhbmQgY29udmVydHMgdGhpcyB0byBhIG51bWJlci5cbiAgICAgICAgdGhpcy50cmlnZ2VyRm9udFNpemUgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKHRoaXMudHJpZ2dlci5uYXRpdmVFbGVtZW50KVsnZm9udC1zaXplJ10pO1xuXG4gICAgICAgIHRoaXMuX3BhbmVsT3BlbiA9IHRydWU7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZ2hsaWdodENvcnJlY3RPcHRpb24oKSk7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcblxuICAgICAgICAvLyBTZXQgdGhlIGZvbnQgc2l6ZSBvbiB0aGUgcGFuZWwgZWxlbWVudCBvbmNlIGl0IGV4aXN0cy5cbiAgICAgICAgdGhpcy5uZ1pvbmUub25TdGFibGUuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlnZ2VyRm9udFNpemUgJiYgdGhpcy5vdmVybGF5RGlyLm92ZXJsYXlSZWYgJiYgdGhpcy5vdmVybGF5RGlyLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5RGlyLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuc3R5bGUuZm9udFNpemUgPSBgJHt0aGlzLnRyaWdnZXJGb250U2l6ZX1weGA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIENsb3NlcyB0aGUgb3ZlcmxheSBwYW5lbCBhbmQgZm9jdXNlcyB0aGUgaG9zdCBlbGVtZW50LiAqL1xuICAgIGNsb3NlKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX3BhbmVsT3BlbikgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLl9wYW5lbE9wZW4gPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5mb2N1cygpLCAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBzZWxlY3QncyB2YWx1ZS4gUGFydCBvZiB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gICAgICogcmVxdWlyZWQgdG8gaW50ZWdyYXRlIHdpdGggQW5ndWxhcidzIGNvcmUgZm9ybXMgQVBJLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlIE5ldyB2YWx1ZSB0byBiZSB3cml0dGVuIHRvIHRoZSBtb2RlbC5cbiAgICAgKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudHJlZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25CeVZhbHVlKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGVtcFZhbHVlcyA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2F2ZXMgYSBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBpbnZva2VkIHdoZW4gdGhlIHNlbGVjdCdzIHZhbHVlXG4gICAgICogY2hhbmdlcyBmcm9tIHVzZXIgaW5wdXQuIFBhcnQgb2YgdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICAgICAqIHJlcXVpcmVkIHRvIGludGVncmF0ZSB3aXRoIEFuZ3VsYXIncyBjb3JlIGZvcm1zIEFQSS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmbiBDYWxsYmFjayB0byBiZSB0cmlnZ2VyZWQgd2hlbiB0aGUgdmFsdWUgY2hhbmdlcy5cbiAgICAgKi9cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCkge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2F2ZXMgYSBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBpbnZva2VkIHdoZW4gdGhlIHNlbGVjdCBpcyBibHVycmVkXG4gICAgICogYnkgdGhlIHVzZXIuIFBhcnQgb2YgdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZSByZXF1aXJlZFxuICAgICAqIHRvIGludGVncmF0ZSB3aXRoIEFuZ3VsYXIncyBjb3JlIGZvcm1zIEFQSS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmbiBDYWxsYmFjayB0byBiZSB0cmlnZ2VyZWQgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIHRvdWNoZWQuXG4gICAgICovXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZXMgdGhlIHNlbGVjdC4gUGFydCBvZiB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlIHJlcXVpcmVkXG4gICAgICogdG8gaW50ZWdyYXRlIHdpdGggQW5ndWxhcidzIGNvcmUgZm9ybXMgQVBJLlxuICAgICAqXG4gICAgICogQHBhcmFtIGlzRGlzYWJsZWQgU2V0cyB3aGV0aGVyIHRoZSBjb21wb25lbnQgaXMgZGlzYWJsZWQuXG4gICAgICovXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGVkKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlID8gdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZCA6IHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF07XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGVkVmFsdWVzKCk6IGFueSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVmFsdWVzID0gdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZC5tYXAoKHZhbHVlKSA9PiB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZ2V0VmFsdWUodmFsdWUpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5tdWx0aXBsZSA/IHNlbGVjdGVkVmFsdWVzIDogc2VsZWN0ZWRWYWx1ZXNbMF07XG4gICAgfVxuXG4gICAgZ2V0IHRyaWdnZXJWYWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5lbXB0eSkgeyByZXR1cm4gJyc7IH1cblxuICAgICAgICByZXR1cm4gdGhpcy50cmVlLnRyZWVDb250cm9sLmdldFZpZXdWYWx1ZSh0aGlzLnNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICBnZXQgdHJpZ2dlclZhbHVlcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIGlmICh0aGlzLmVtcHR5KSB7IHJldHVybiBbXTsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICAgIH1cblxuICAgIGdldCBlbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnNlbGVjdGlvbk1vZGVsIHx8IHRoaXMuc2VsZWN0aW9uTW9kZWwuaXNFbXB0eSgpO1xuICAgIH1cblxuICAgIGlzUnRsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXIgPyB0aGlzLmRpci52YWx1ZSA9PT0gJ3J0bCcgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVPcGVuS2V5ZG93bihldmVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2xvc2VkS2V5ZG93bihldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHRoZSBwYW5lbCBjb250ZW50IGlzIGRvbmUgZmFkaW5nIGluLCB0aGUgcGFuZWxEb25lQW5pbWF0aW5nIHByb3BlcnR5IGlzXG4gICAgICogc2V0IHNvIHRoZSBwcm9wZXIgY2xhc3MgY2FuIGJlIGFkZGVkIHRvIHRoZSBwYW5lbC5cbiAgICAgKi9cbiAgICBvbkZhZGVJbkRvbmUoKSB7XG4gICAgICAgIHRoaXMucGFuZWxEb25lQW5pbWF0aW5nID0gdGhpcy5wYW5lbE9wZW47XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgb25Gb2N1cygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9mb2N1c2VkID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbHMgdGhlIHRvdWNoZWQgY2FsbGJhY2sgb25seSBpZiB0aGUgcGFuZWwgaXMgY2xvc2VkLiBPdGhlcndpc2UsIHRoZSB0cmlnZ2VyIHdpbGxcbiAgICAgKiBcImJsdXJcIiB0byB0aGUgcGFuZWwgd2hlbiBpdCBvcGVucywgY2F1c2luZyBhIGZhbHNlIHBvc2l0aXZlLlxuICAgICAqL1xuICAgIG9uQmx1cigpIHtcbiAgICAgICAgdGhpcy5fZm9jdXNlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiAhdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIENhbGxiYWNrIHRoYXQgaXMgaW52b2tlZCB3aGVuIHRoZSBvdmVybGF5IHBhbmVsIGhhcyBiZWVuIGF0dGFjaGVkLiAqL1xuICAgIG9uQXR0YWNoZWQoKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheURpci5wb3NpdGlvbkNoYW5nZVxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlT3ZlcmxheU9mZnNldFgoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhbmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gdGhpcy5zY3JvbGxUb3A7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRyZWUudXBkYXRlU2Nyb2xsU2l6ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgdGhlIHRoZW1lIHRvIGJlIHVzZWQgb24gdGhlIHBhbmVsLiAqL1xuICAgIGdldFBhbmVsVGhlbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Rm9ybUZpZWxkID8gYG1jLSR7dGhpcy5wYXJlbnRGb3JtRmllbGQuY29sb3J9YCA6ICcnO1xuICAgIH1cblxuICAgIGZvY3VzKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBvbkNvbnRhaW5lckNsaWNrKCkge1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLyoqIEludm9rZWQgd2hlbiBhbiBvcHRpb24gaXMgY2xpY2tlZC4gKi9cbiAgICBvblJlbW92ZVNlbGVjdGVkT3B0aW9uKHNlbGVjdGVkT3B0aW9uOiBhbnksICRldmVudCkge1xuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5kZXNlbGVjdChzZWxlY3RlZE9wdGlvbik7XG5cbiAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnNlbGVjdGVkVmFsdWVzKTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVIaWRkZW5JdGVtcygpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tVHJpZ2dlciB8fCB0aGlzLmVtcHR5IHx8ICF0aGlzLm11bHRpcGxlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGxldCB2aXNpYmxlSXRlbXM6IG51bWJlciA9IDA7XG4gICAgICAgIGNvbnN0IHRvdGFsSXRlbXNXaWR0aCA9IHRoaXMuZ2V0VG90YWxJdGVtc1dpZHRoSW5NYXRjaGVyKCk7XG4gICAgICAgIGxldCB0b3RhbFZpc2libGVJdGVtc1dpZHRoOiBudW1iZXIgPSAwO1xuXG4gICAgICAgIHRoaXMudGFncy5mb3JFYWNoKCh0YWcpID0+IHtcbiAgICAgICAgICAgIGlmICh0YWcubmF0aXZlRWxlbWVudC5vZmZzZXRUb3AgPCB0YWcubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICB0b3RhbFZpc2libGVJdGVtc1dpZHRoICs9IHRoaXMuZ2V0SXRlbVdpZHRoKHRhZy5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgICAgICB2aXNpYmxlSXRlbXMrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5oaWRkZW5JdGVtcyA9IHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWQubGVuZ3RoIC0gdmlzaWJsZUl0ZW1zO1xuXG4gICAgICAgIGlmICh0aGlzLmhpZGRlbkl0ZW1zKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtc0NvdW50ZXIgPSB0aGlzLnRyaWdnZXIubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWMtdHJlZS1zZWxlY3RfX21hdGNoLWhpZGRlbi10ZXh0Jyk7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVyTGlzdCA9IHRoaXMudHJpZ2dlci5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYy10cmVlLXNlbGVjdF9fbWF0Y2gtbGlzdCcpO1xuXG4gICAgICAgICAgICBjb25zdCBpdGVtc0NvdW50ZXJTaG93ZWQgPSBpdGVtc0NvdW50ZXIub2Zmc2V0VG9wIDwgaXRlbXNDb3VudGVyLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIC8vIGNvbnN0IGl0ZW1zQ291bnRlcldpZHRoOiBudW1iZXIgPSBpdGVtc0NvdW50ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBpdGVtc0NvdW50ZXJXaWR0aDogbnVtYmVyID0gODY7XG5cbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXJMaXN0V2lkdGg6IG51bWJlciA9IG1hdGNoZXJMaXN0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlcldpZHRoOiBudW1iZXIgPSBtYXRjaGVyTGlzdFdpZHRoICsgaXRlbXNDb3VudGVyV2lkdGg7XG5cbiAgICAgICAgICAgIGlmIChpdGVtc0NvdW50ZXJTaG93ZWQgJiYgKHRvdGFsSXRlbXNXaWR0aCA8IG1hdGNoZXJXaWR0aCkpIHsgdGhpcy5oaWRkZW5JdGVtcyA9IDA7IH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRvdGFsVmlzaWJsZUl0ZW1zV2lkdGggPT09IG1hdGNoZXJMaXN0V2lkdGggfHxcbiAgICAgICAgICAgICAgICAodG90YWxWaXNpYmxlSXRlbXNXaWR0aCArIGl0ZW1zQ291bnRlcldpZHRoKSA8IG1hdGNoZXJMaXN0V2lkdGhcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghaXRlbXNDb3VudGVyU2hvd2VkICYmICh0b3RhbEl0ZW1zV2lkdGggKyBpdGVtc0NvdW50ZXJXaWR0aCkgPiBtYXRjaGVyV2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkl0ZW1zKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VG90YWxJdGVtc1dpZHRoSW5NYXRjaGVyKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHRyaWdnZXJDbG9uZSA9IHRoaXMudHJpZ2dlci5uYXRpdmVFbGVtZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgdHJpZ2dlckNsb25lLnF1ZXJ5U2VsZWN0b3IoJy5tYy10cmVlLXNlbGVjdF9fbWF0Y2gtaGlkZGVuLXRleHQnKS5yZW1vdmUoKTtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRyaWdnZXJDbG9uZSwgJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodHJpZ2dlckNsb25lLCAndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0cmlnZ2VyQ2xvbmUsICd0b3AnLCAnLTEwMCUnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0cmlnZ2VyQ2xvbmUsICdsZWZ0JywgJzAnKTtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMudHJpZ2dlci5uYXRpdmVFbGVtZW50LCB0cmlnZ2VyQ2xvbmUpO1xuXG4gICAgICAgIGxldCB0b3RhbEl0ZW1zV2lkdGg6IG51bWJlciA9IDA7XG4gICAgICAgIHRyaWdnZXJDbG9uZS5xdWVyeVNlbGVjdG9yQWxsKCdtYy10YWcnKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0b3RhbEl0ZW1zV2lkdGggKz0gdGhpcy5nZXRJdGVtV2lkdGgoaXRlbSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRyaWdnZXJDbG9uZS5yZW1vdmUoKTtcblxuICAgICAgICByZXR1cm4gdG90YWxJdGVtc1dpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SXRlbVdpZHRoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuXG4gICAgICAgIGNvbnN0IHdpZHRoOiBudW1iZXIgPSBwYXJzZUludChjb21wdXRlZFN0eWxlLndpZHRoIGFzIHN0cmluZyk7XG4gICAgICAgIGNvbnN0IG1hcmdpbkxlZnQ6IG51bWJlciA9IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUubWFyZ2luTGVmdCBhcyBzdHJpbmcpO1xuICAgICAgICBjb25zdCBtYXJnaW5SaWdodDogbnVtYmVyID0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS5tYXJnaW5SaWdodCBhcyBzdHJpbmcpO1xuXG4gICAgICAgIHJldHVybiB3aWR0aCArIG1hcmdpbkxlZnQgKyBtYXJnaW5SaWdodDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUNsb3NlZEtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcbiAgICAgICAgY29uc3QgaXNBcnJvd0tleSA9IGtleUNvZGUgPT09IERPV05fQVJST1cgfHwga2V5Q29kZSA9PT0gVVBfQVJST1cgfHxcbiAgICAgICAgICAgIGtleUNvZGUgPT09IExFRlRfQVJST1cgfHwga2V5Q29kZSA9PT0gUklHSFRfQVJST1c7XG4gICAgICAgIGNvbnN0IGlzT3BlbktleSA9IGtleUNvZGUgPT09IEVOVEVSIHx8IGtleUNvZGUgPT09IFNQQUNFO1xuXG4gICAgICAgIC8vIE9wZW4gdGhlIHNlbGVjdCBvbiBBTFQgKyBhcnJvdyBrZXkgdG8gbWF0Y2ggdGhlIG5hdGl2ZSA8c2VsZWN0PlxuICAgICAgICBpZiAoaXNPcGVuS2V5IHx8ICgodGhpcy5tdWx0aXBsZSB8fCBldmVudC5hbHRLZXkpICYmIGlzQXJyb3dLZXkpKSB7XG4gICAgICAgICAgICAvLyBwcmV2ZW50cyB0aGUgcGFnZSBmcm9tIHNjcm9sbGluZyBkb3duIHdoZW4gcHJlc3Npbmcgc3BhY2VcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm11bHRpcGxlICYmIHRoaXMudHJlZS5rZXlNYW5hZ2VyICYmIHRoaXMudHJlZS5rZXlNYW5hZ2VyLm9uS2V5ZG93bikge1xuICAgICAgICAgICAgdGhpcy50cmVlLmtleU1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlT3BlbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lICovXG4gICAgICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuICAgICAgICBjb25zdCBpc0Fycm93S2V5ID0ga2V5Q29kZSA9PT0gRE9XTl9BUlJPVyB8fCBrZXlDb2RlID09PSBVUF9BUlJPVztcblxuICAgICAgICBpZiAoaXNBcnJvd0tleSAmJiBldmVudC5hbHRLZXkpIHtcbiAgICAgICAgICAgIC8vIENsb3NlIHRoZSBzZWxlY3Qgb24gQUxUICsgYXJyb3cga2V5IHRvIG1hdGNoIHRoZSBuYXRpdmUgPHNlbGVjdD5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBMRUZUX0FSUk9XIHx8IGtleUNvZGUgPT09IFJJR0hUX0FSUk9XKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5hbE9uS2V5RG93bi5jYWxsKHRoaXMudHJlZSwgZXZlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IEhPTUUpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IEVORCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy50cmVlLmtleU1hbmFnZXIuc2V0TGFzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBQQUdFX1VQKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLnRyZWUua2V5TWFuYWdlci5zZXRQcmV2aW91c1BhZ2VJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gUEFHRV9ET1dOKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLnRyZWUua2V5TWFuYWdlci5zZXROZXh0UGFnZUl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfSBlbHNlIGlmICgoa2V5Q29kZSA9PT0gRU5URVIgfHwga2V5Q29kZSA9PT0gU1BBQ0UpICYmIHRoaXMudHJlZS5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5hdXRvU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC50b2dnbGUodGhpcy50cmVlLmtleU1hbmFnZXIuYWN0aXZlSXRlbS5kYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubXVsdGlwbGUgJiYga2V5Q29kZSA9PT0gQSAmJiBldmVudC5jdHJsS2V5KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBjb25zdCBoYXNEZXNlbGVjdGVkT3B0aW9ucyA9IHRoaXMub3B0aW9ucy5zb21lKChvcHRpb24pID0+ICFvcHRpb24uc2VsZWN0ZWQpO1xuXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc0Rlc2VsZWN0ZWRPcHRpb25zICYmICFvcHRpb24uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnNlbGVjdCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNseUZvY3VzZWRJbmRleCA9IHRoaXMudHJlZS5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleDtcblxuICAgICAgICAgICAgdGhpcy50cmVlLmtleU1hbmFnZXIuc2V0Rm9jdXNPcmlnaW4oJ2tleWJvYXJkJyk7XG4gICAgICAgICAgICB0aGlzLnRyZWUua2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdGhpcy5tdWx0aXBsZSAmJiBpc0Fycm93S2V5ICYmIGV2ZW50LnNoaWZ0S2V5ICYmIHRoaXMudHJlZS5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0gJiZcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWUua2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggIT09IHByZXZpb3VzbHlGb2N1c2VkSW5kZXhcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0uc2VsZWN0VmlhSW50ZXJhY3Rpb24oZXZlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvU2VsZWN0ICYmIHRoaXMudHJlZS5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWUuc2V0U2VsZWN0ZWRPcHRpb25zQnlLZXkoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0sIGhhc01vZGlmaWVyS2V5KGV2ZW50LCAnc2hpZnRLZXknKSwgaGFzTW9kaWZpZXJLZXkoZXZlbnQsICdjdHJsS2V5JylcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplU2VsZWN0aW9uKCkge1xuICAgICAgICAvLyBEZWZlciBzZXR0aW5nIHRoZSB2YWx1ZSBpbiBvcmRlciB0byBhdm9pZCB0aGUgXCJFeHByZXNzaW9uXG4gICAgICAgIC8vIGhhcyBjaGFuZ2VkIGFmdGVyIGl0IHdhcyBjaGVja2VkXCIgZXJyb3JzIGZyb20gQW5ndWxhci5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvbkJ5VmFsdWUodGhpcy5uZ0NvbnRyb2wgPyB0aGlzLm5nQ29udHJvbC52YWx1ZSA6IHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgc2VsZWN0ZWQgb3B0aW9uIGJhc2VkIG9uIGEgdmFsdWUuIElmIG5vIG9wdGlvbiBjYW4gYmVcbiAgICAgKiBmb3VuZCB3aXRoIHRoZSBkZXNpZ25hdGVkIHZhbHVlLCB0aGUgc2VsZWN0IHRyaWdnZXIgaXMgY2xlYXJlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNldFNlbGVjdGlvbkJ5VmFsdWUodmFsdWU6IGFueSB8IGFueVtdKSB7XG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7IHRocm93IGdldE1jU2VsZWN0Tm9uQXJyYXlWYWx1ZUVycm9yKCk7IH1cblxuICAgICAgICAgICAgdGhpcy50cmVlLnNldE9wdGlvbnNGcm9tVmFsdWVzKHZhbHVlKTtcblxuICAgICAgICAgICAgdGhpcy5zb3J0VmFsdWVzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRyZWUuc2V0T3B0aW9uc0Zyb21WYWx1ZXMoW3ZhbHVlXSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRLZXlNYW5hZ2VyKCkge1xuICAgICAgICB0aGlzLm9yaWdpbmFsT25LZXlEb3duID0gdGhpcy50cmVlLm9uS2V5RG93bjtcblxuICAgICAgICB0aGlzLnRyZWUub25LZXlEb3duID0gKCkgPT4ge307XG5cbiAgICAgICAgdGhpcy50cmVlLmtleU1hbmFnZXIudGFiT3V0XG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFJlc3RvcmUgZm9jdXMgdG8gdGhlIHRyaWdnZXIgYmVmb3JlIGNsb3NpbmcuIEVuc3VyZXMgdGhhdCB0aGUgZm9jdXNcbiAgICAgICAgICAgICAgICAvLyBwb3NpdGlvbiB3b24ndCBiZSBsb3N0IGlmIHRoZSB1c2VyIGdvdCBmb2N1cyBpbnRvIHRoZSBvdmVybGF5LlxuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRyZWUua2V5TWFuYWdlci5jaGFuZ2VcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3BhbmVsT3BlbiAmJiB0aGlzLnBhbmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsQWN0aXZlT3B0aW9uSW50b1ZpZXcoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl9wYW5lbE9wZW4gJiYgIXRoaXMubXVsdGlwbGUgJiYgdGhpcy50cmVlLmtleU1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUua2V5TWFuYWdlci5hY3RpdmVJdGVtLnNlbGVjdFZpYUludGVyYWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIFNvcnRzIHRoZSBzZWxlY3RlZCB2YWx1ZXMgaW4gdGhlIHNlbGVjdGVkIGJhc2VkIG9uIHRoZWlyIG9yZGVyIGluIHRoZSBwYW5lbC4gKi9cbiAgICBwcml2YXRlIHNvcnRWYWx1ZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zLnRvQXJyYXkoKTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc29ydENvbXBhcmF0b3IgPyB0aGlzLnNvcnRDb21wYXJhdG9yKGEsIGIsIG9wdGlvbnMpIDpcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5pbmRleE9mKGEpIC0gb3B0aW9ucy5pbmRleE9mKGIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZ2hsaWdodHMgdGhlIHNlbGVjdGVkIGl0ZW0uIElmIG5vIG9wdGlvbiBpcyBzZWxlY3RlZCwgaXQgd2lsbCBoaWdobGlnaHRcbiAgICAgKiB0aGUgZmlyc3QgaXRlbSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIHByaXZhdGUgaGlnaGxpZ2h0Q29ycmVjdE9wdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuZW1wdHkgfHwgIXRoaXMudHJlZS5rZXlNYW5hZ2VyKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNvbnN0IGZpcnN0U2VsZWN0ZWRWYWx1ZSA9IHRoaXMubXVsdGlwbGUgPyB0aGlzLnNlbGVjdGVkVmFsdWVzWzBdIDogdGhpcy5zZWxlY3RlZFZhbHVlcztcblxuICAgICAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IHRoaXMub3B0aW9ucy5maW5kKChvcHRpb24pID0+IG9wdGlvbi52YWx1ZSA9PT0gZmlyc3RTZWxlY3RlZFZhbHVlKTtcblxuICAgICAgICBpZiAoc2VsZWN0ZWRPcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oc2VsZWN0ZWRPcHRpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFNjcm9sbHMgdGhlIGFjdGl2ZSBvcHRpb24gaW50byB2aWV3LiAqL1xuICAgIHByaXZhdGUgc2Nyb2xsQWN0aXZlT3B0aW9uSW50b1ZpZXcoKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZU9wdGlvbkluZGV4ID0gdGhpcy50cmVlLmtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4IHx8IDA7XG5cbiAgICAgICAgdGhpcy5wYW5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IGdldE9wdGlvblNjcm9sbFBvc2l0aW9uKFxuICAgICAgICAgICAgYWN0aXZlT3B0aW9uSW5kZXgsXG4gICAgICAgICAgICB0aGlzLnRyZWUuZ2V0SXRlbUhlaWdodCgpLFxuICAgICAgICAgICAgdGhpcy5wYW5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCxcbiAgICAgICAgICAgIFNFTEVDVF9QQU5FTF9NQVhfSEVJR0hUXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgeC1vZmZzZXQgb2YgdGhlIG92ZXJsYXkgcGFuZWwgaW4gcmVsYXRpb24gdG8gdGhlIHRyaWdnZXIncyB0b3Agc3RhcnQgY29ybmVyLlxuICAgICAqIFRoaXMgbXVzdCBiZSBhZGp1c3RlZCB0byBhbGlnbiB0aGUgc2VsZWN0ZWQgb3B0aW9uIHRleHQgb3ZlciB0aGUgdHJpZ2dlciB0ZXh0IHdoZW5cbiAgICAgKiB0aGUgcGFuZWwgb3BlbnMuIFdpbGwgY2hhbmdlIGJhc2VkIG9uIExUUiBvciBSVEwgdGV4dCBkaXJlY3Rpb24uIE5vdGUgdGhhdCB0aGUgb2Zmc2V0XG4gICAgICogY2FuJ3QgYmUgY2FsY3VsYXRlZCB1bnRpbCB0aGUgcGFuZWwgaGFzIGJlZW4gYXR0YWNoZWQsIGJlY2F1c2Ugd2UgbmVlZCB0byBrbm93IHRoZVxuICAgICAqIGNvbnRlbnQgd2lkdGggaW4gb3JkZXIgdG8gY29uc3RyYWluIHRoZSBwYW5lbCB3aXRoaW4gdGhlIHZpZXdwb3J0LlxuICAgICAqL1xuICAgIHByaXZhdGUgY2FsY3VsYXRlT3ZlcmxheU9mZnNldFgoKSB7XG4gICAgICAgIGNvbnN0IG92ZXJsYXlSZWN0ID0gdGhpcy5vdmVybGF5RGlyLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IHZpZXdwb3J0U2l6ZSA9IHRoaXMudmlld3BvcnRSdWxlci5nZXRWaWV3cG9ydFNpemUoKTtcbiAgICAgICAgY29uc3QgaXNSdGwgPSB0aGlzLmlzUnRsKCk7XG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1tYWdpYy1udW1iZXJzICovXG4gICAgICAgIGNvbnN0IHBhZGRpbmdXaWR0aCA9IFNFTEVDVF9QQU5FTF9QQURESU5HX1ggKiAyO1xuICAgICAgICBsZXQgb2Zmc2V0WDogbnVtYmVyID0gU0VMRUNUX1BBTkVMX1BBRERJTkdfWDtcblxuICAgICAgICAvLyBJbnZlcnQgdGhlIG9mZnNldCBpbiBMVFIuXG4gICAgICAgIGlmICghaXNSdGwpIHsgb2Zmc2V0WCAqPSAtMTsgfVxuXG4gICAgICAgIC8vIERldGVybWluZSBob3cgbXVjaCB0aGUgc2VsZWN0IG92ZXJmbG93cyBvbiBlYWNoIHNpZGUuXG4gICAgICAgIGNvbnN0IGxlZnRPdmVyZmxvdyA9IDAgLSAob3ZlcmxheVJlY3QubGVmdCArIG9mZnNldFggLSAoaXNSdGwgPyBwYWRkaW5nV2lkdGggOiAwKSk7XG4gICAgICAgIGNvbnN0IHJpZ2h0T3ZlcmZsb3cgPSBvdmVybGF5UmVjdC5yaWdodCArIG9mZnNldFggLSB2aWV3cG9ydFNpemUud2lkdGhcbiAgICAgICAgICAgICsgKGlzUnRsID8gMCA6IHBhZGRpbmdXaWR0aCk7XG5cbiAgICAgICAgLy8gSWYgdGhlIGVsZW1lbnQgb3ZlcmZsb3dzIG9uIGVpdGhlciBzaWRlLCByZWR1Y2UgdGhlIG9mZnNldCB0byBhbGxvdyBpdCB0byBmaXQuXG4gICAgICAgIGlmIChsZWZ0T3ZlcmZsb3cgPiAwKSB7XG4gICAgICAgICAgICBvZmZzZXRYICs9IGxlZnRPdmVyZmxvdyArIFNFTEVDVF9QQU5FTF9WSUVXUE9SVF9QQURESU5HO1xuICAgICAgICB9IGVsc2UgaWYgKHJpZ2h0T3ZlcmZsb3cgPiAwKSB7XG4gICAgICAgICAgICBvZmZzZXRYIC09IHJpZ2h0T3ZlcmZsb3cgKyBTRUxFQ1RfUEFORUxfVklFV1BPUlRfUEFERElORztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldCB0aGUgb2Zmc2V0IGRpcmVjdGx5IGluIG9yZGVyIHRvIGF2b2lkIGhhdmluZyB0byBnbyB0aHJvdWdoIGNoYW5nZSBkZXRlY3Rpb24gYW5kXG4gICAgICAgIC8vIHBvdGVudGlhbGx5IHRyaWdnZXJpbmcgXCJjaGFuZ2VkIGFmdGVyIGl0IHdhcyBjaGVja2VkXCIgZXJyb3JzLiBSb3VuZCB0aGUgdmFsdWUgdG8gYXZvaWRcbiAgICAgICAgLy8gYmx1cnJ5IGNvbnRlbnQgaW4gc29tZSBicm93c2Vycy5cbiAgICAgICAgdGhpcy5vdmVybGF5RGlyLm9mZnNldFggPSBNYXRoLnJvdW5kKG9mZnNldFgpO1xuICAgICAgICB0aGlzLm92ZXJsYXlEaXIub3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvbigpO1xuICAgIH1cblxuICAgIC8qKiBDb21wYXJpc29uIGZ1bmN0aW9uIHRvIHNwZWNpZnkgd2hpY2ggb3B0aW9uIGlzIGRpc3BsYXllZC4gRGVmYXVsdHMgdG8gb2JqZWN0IGVxdWFsaXR5LiAqL1xuICAgIHByaXZhdGUgX2NvbXBhcmVXaXRoID0gKG8xOiBhbnksIG8yOiBhbnkpID0+IG8xID09PSBvMjtcbn1cbiJdfQ==