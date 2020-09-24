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
import { filter, map, switchMap, take, takeUntil, distinctUntilChanged, startWith } from 'rxjs/operators';
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
                return this.options.changes.pipe(startWith(this.options), switchMap((/**
                 * @return {?}
                 */
                () => merge(...this.options.map((/**
                 * @param {?} option
                 * @return {?}
                 */
                (option) => option.onSelectionChange))))));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RyZWUtc2VsZWN0LyIsInNvdXJjZXMiOlsidHJlZS1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUNILG1CQUFtQixFQUNuQixhQUFhLEVBQ2hCLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUdILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBRVQsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFJTixRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsSUFBSSxFQUVKLFNBQVMsRUFDVCxZQUFZLEVBQ1osaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFFSCxlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLGFBQWEsRUFDYixTQUFTLEVBQ1QsTUFBTSxFQUNOLE9BQU8sRUFFVixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFDSCxVQUFVLEVBQ1YsR0FBRyxFQUNILEtBQUssRUFDTCxJQUFJLEVBQ0osVUFBVSxFQUNWLFdBQVcsRUFDWCxLQUFLLEVBQ0wsUUFBUSxFQUNSLENBQUMsRUFDRCxPQUFPLEVBQ1AsU0FBUyxFQUNULGNBQWMsRUFDakIsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0MsT0FBTyxFQUNILHVCQUF1QixFQUd2QixpQkFB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LyogdHNsaW50OmRpc2FibGU6bm8tZW1wdHkgKi9cblxuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtcbiAgICBDZGtDb25uZWN0ZWRPdmVybGF5LFxuICAgIFZpZXdwb3J0UnVsZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRG9DaGVjayxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgUmVuZGVyZXIyLFxuICAgIFNlbGYsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0NoaWxkcmVuLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgICBGb3JtQ29udHJvbE5hbWUsXG4gICAgRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgIE5HX1ZBTElEQVRPUlMsXG4gICAgTmdDb250cm9sLFxuICAgIE5nRm9ybSxcbiAgICBOZ01vZGVsLFxuICAgIFZhbGlkYXRvclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICAgIERPV05fQVJST1csXG4gICAgRU5ELFxuICAgIEVOVEVSLFxuICAgIEhPTUUsXG4gICAgTEVGVF9BUlJPVyxcbiAgICBSSUdIVF9BUlJPVyxcbiAgICBTUEFDRSxcbiAgICBVUF9BUlJPVyxcbiAgICBBLFxuICAgIFBBR0VfVVAsXG4gICAgUEFHRV9ET1dOLFxuICAgIGhhc01vZGlmaWVyS2V5XG59IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBDZGtUcmVlIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL3RyZWUnO1xuaW1wb3J0IHtcbiAgICBnZXRPcHRpb25TY3JvbGxQb3NpdGlvbixcbiAgICBDYW5EaXNhYmxlLFxuICAgIENhblVwZGF0ZUVycm9yU3RhdGUsXG4gICAgRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgSGFzVGFiSW5kZXgsXG4gICAgQ2FuRGlzYWJsZUN0b3IsXG4gICAgSGFzVGFiSW5kZXhDdG9yLFxuICAgIENhblVwZGF0ZUVycm9yU3RhdGVDdG9yLFxuICAgIG1peGluVGFiSW5kZXgsXG4gICAgbWl4aW5EaXNhYmxlZCxcbiAgICBtaXhpbkVycm9yU3RhdGUsXG4gICAgbWNTZWxlY3RBbmltYXRpb25zLFxuXG4gICAgU0VMRUNUX1BBTkVMX01BWF9IRUlHSFQsXG4gICAgU0VMRUNUX1BBTkVMX1BBRERJTkdfWCxcbiAgICBTRUxFQ1RfUEFORUxfVklFV1BPUlRfUEFERElORyxcbiAgICBNQ19TRUxFQ1RfU0NST0xMX1NUUkFURUdZLFxuXG4gICAgZ2V0TWNTZWxlY3REeW5hbWljTXVsdGlwbGVFcnJvcixcbiAgICBnZXRNY1NlbGVjdE5vbkZ1bmN0aW9uVmFsdWVFcnJvcixcbiAgICBnZXRNY1NlbGVjdE5vbkFycmF5VmFsdWVFcnJvcixcbiAgICBNdWx0aXBsZU1vZGUsXG5cbiAgICBNQ19WQUxJREFUSU9OLFxuICAgIHNldE1vc2FpY1ZhbGlkYXRpb24sXG4gICAgTWNWYWxpZGF0aW9uT3B0aW9uc1xufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0NsZWFuZXIsIE1jRm9ybUZpZWxkLCBNY0Zvcm1GaWVsZENvbnRyb2wgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBNY1RhZyB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy90YWdzJztcbmltcG9ydCB7IE1jVHJlZVNlbGVjdGlvbiwgTWNUcmVlT3B0aW9uIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL3RyZWUnO1xuaW1wb3J0IHsgZGVmZXIsIG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICAgIGZpbHRlcixcbiAgICBtYXAsXG4gICAgc3dpdGNoTWFwLFxuICAgIHRha2UsXG4gICAgdGFrZVVudGlsLFxuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuICAgIHN0YXJ0V2l0aFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKiBDaGFuZ2UgZXZlbnQgb2JqZWN0IHRoYXQgaXMgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3QgdmFsdWUgaGFzIGNoYW5nZWQuICovXG5leHBvcnQgY2xhc3MgTWNUcmVlU2VsZWN0Q2hhbmdlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlOiBNY1RyZWVTZWxlY3QsIHB1YmxpYyB2YWx1ZTogYW55LCBwdWJsaWMgaXNVc2VySW5wdXQgPSBmYWxzZSkge31cbn1cblxuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdtYy10cmVlLXNlbGVjdC10cmlnZ2VyJyB9KVxuZXhwb3J0IGNsYXNzIE1jVHJlZVNlbGVjdFRyaWdnZXIge31cblxuXG5jbGFzcyBNY1RyZWVTZWxlY3RCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHB1YmxpYyBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICAgICAgICBwdWJsaWMgcGFyZW50Rm9ybTogTmdGb3JtLFxuICAgICAgICBwdWJsaWMgcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgICAgIHB1YmxpYyBuZ0NvbnRyb2w6IE5nQ29udHJvbFxuICAgICkge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5jb25zdCBNY1RyZWVTZWxlY3RNaXhpbkJhc2U6IENhbkRpc2FibGVDdG9yICYgSGFzVGFiSW5kZXhDdG9yICYgQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IgJlxuICAgIHR5cGVvZiBNY1RyZWVTZWxlY3RCYXNlID0gbWl4aW5UYWJJbmRleChtaXhpbkRpc2FibGVkKG1peGluRXJyb3JTdGF0ZShNY1RyZWVTZWxlY3RCYXNlKSkpO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdHJlZS1zZWxlY3QnLFxuICAgIGV4cG9ydEFzOiAnbWNUcmVlU2VsZWN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJ3RyZWUtc2VsZWN0Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3RyZWUtc2VsZWN0LnNjc3MnXSxcbiAgICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAndGFiSW5kZXgnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy10cmVlLXNlbGVjdCcsXG4gICAgICAgICdbY2xhc3MubWMtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1pbnZhbGlkXSc6ICdlcnJvclN0YXRlJyxcblxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG5cbiAgICAgICAgJyhjbGljayknOiAndG9nZ2xlKCknLFxuICAgICAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleWRvd24oJGV2ZW50KScsXG4gICAgICAgICcoZm9jdXMpJzogJ29uRm9jdXMoKScsXG4gICAgICAgICcoYmx1ciknOiAnb25CbHVyKCknLFxuICAgICAgICAnKHdpbmRvdzpyZXNpemUpJzogJ2NhbGN1bGF0ZUhpZGRlbkl0ZW1zKCknXG4gICAgfSxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIG1jU2VsZWN0QW5pbWF0aW9ucy50cmFuc2Zvcm1QYW5lbCxcbiAgICAgICAgbWNTZWxlY3RBbmltYXRpb25zLmZhZGVJbkNvbnRlbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IE1jRm9ybUZpZWxkQ29udHJvbCwgdXNlRXhpc3Rpbmc6IE1jVHJlZVNlbGVjdCB9LFxuICAgICAgICB7IHByb3ZpZGU6IENka1RyZWUsIHVzZUV4aXN0aW5nOiBNY1RyZWVTZWxlY3QgfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNUcmVlU2VsZWN0IGV4dGVuZHMgTWNUcmVlU2VsZWN0TWl4aW5CYXNlIGltcGxlbWVudHNcbiAgICBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBEb0NoZWNrLCBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgICBDYW5EaXNhYmxlLCBIYXNUYWJJbmRleCwgTWNGb3JtRmllbGRDb250cm9sPE1jVHJlZU9wdGlvbj4sIENhblVwZGF0ZUVycm9yU3RhdGUge1xuXG4gICAgLyoqIEEgbmFtZSBmb3IgdGhpcyBjb250cm9sIHRoYXQgY2FuIGJlIHVzZWQgYnkgYG1jLWZvcm0tZmllbGRgLiAqL1xuICAgIGNvbnRyb2xUeXBlID0gJ21jLXNlbGVjdCc7XG5cbiAgICBoaWRkZW5JdGVtczogbnVtYmVyID0gMDtcblxuICAgIC8qKiBUaGUgbGFzdCBtZWFzdXJlZCB2YWx1ZSBmb3IgdGhlIHRyaWdnZXIncyBjbGllbnQgYm91bmRpbmcgcmVjdC4gKi9cbiAgICB0cmlnZ2VyUmVjdDogQ2xpZW50UmVjdDtcblxuICAgIC8qKiBUaGUgY2FjaGVkIGZvbnQtc2l6ZSBvZiB0aGUgdHJpZ2dlciBlbGVtZW50LiAqL1xuICAgIHRyaWdnZXJGb250U2l6ZSA9IDA7XG5cbiAgICAvKiogRGVhbHMgd2l0aCB0aGUgc2VsZWN0aW9uIGxvZ2ljLiAqL1xuICAgIHNlbGVjdGlvbk1vZGVsOiBTZWxlY3Rpb25Nb2RlbDxhbnk+O1xuXG4gICAgLyoqIFRoZSB2YWx1ZSBvZiB0aGUgc2VsZWN0IHBhbmVsJ3MgdHJhbnNmb3JtLW9yaWdpbiBwcm9wZXJ0eS4gKi9cbiAgICB0cmFuc2Zvcm1PcmlnaW46IHN0cmluZyA9ICd0b3AnO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHBhbmVsJ3MgYW5pbWF0aW9uIGlzIGRvbmUuICovXG4gICAgcGFuZWxEb25lQW5pbWF0aW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgcGFuZWwgZWxlbWVudCBpcyBmaW5pc2hlZCB0cmFuc2Zvcm1pbmcgaW4uICovXG4gICAgcGFuZWxEb25lQW5pbWF0aW5nU3RyZWFtID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gICAgLyoqIFN0cmF0ZWd5IHRoYXQgd2lsbCBiZSB1c2VkIHRvIGhhbmRsZSBzY3JvbGxpbmcgd2hpbGUgdGhlIHNlbGVjdCBwYW5lbCBpcyBvcGVuLiAqL1xuICAgIHNjcm9sbFN0cmF0ZWd5ID0gdGhpcy5zY3JvbGxTdHJhdGVneUZhY3RvcnkoKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSB5LW9mZnNldCBvZiB0aGUgb3ZlcmxheSBwYW5lbCBpbiByZWxhdGlvbiB0byB0aGUgdHJpZ2dlcidzIHRvcCBzdGFydCBjb3JuZXIuXG4gICAgICogVGhpcyBtdXN0IGJlIGFkanVzdGVkIHRvIGFsaWduIHRoZSBzZWxlY3RlZCBvcHRpb24gdGV4dCBvdmVyIHRoZSB0cmlnZ2VyIHRleHQuXG4gICAgICogd2hlbiB0aGUgcGFuZWwgb3BlbnMuIFdpbGwgY2hhbmdlIGJhc2VkIG9uIHRoZSB5LXBvc2l0aW9uIG9mIHRoZSBzZWxlY3RlZCBvcHRpb24uXG4gICAgICovXG4gICAgb2Zmc2V0WSA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIHBvc2l0aW9uIGNvbmZpZyBlbnN1cmVzIHRoYXQgdGhlIHRvcCBcInN0YXJ0XCIgY29ybmVyIG9mIHRoZSBvdmVybGF5XG4gICAgICogaXMgYWxpZ25lZCB3aXRoIHdpdGggdGhlIHRvcCBcInN0YXJ0XCIgb2YgdGhlIG9yaWdpbiBieSBkZWZhdWx0IChvdmVybGFwcGluZ1xuICAgICAqIHRoZSB0cmlnZ2VyIGNvbXBsZXRlbHkpLiBJZiB0aGUgcGFuZWwgY2Fubm90IGZpdCBiZWxvdyB0aGUgdHJpZ2dlciwgaXRcbiAgICAgKiB3aWxsIGZhbGwgYmFjayB0byBhIHBvc2l0aW9uIGFib3ZlIHRoZSB0cmlnZ2VyLlxuICAgICAqL1xuICAgIHBvc2l0aW9ucyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgICAgICBvdmVybGF5WTogJ3RvcCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgICAgICBvdmVybGF5WTogJ2JvdHRvbSdcbiAgICAgICAgfVxuICAgIF07XG5cbiAgICBvcHRpb25zOiBRdWVyeUxpc3Q8TWNUcmVlT3B0aW9uPjtcblxuICAgIEBWaWV3Q2hpbGQoJ3RyaWdnZXInLCB7IHN0YXRpYzogZmFsc2UgfSkgdHJpZ2dlcjogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ3BhbmVsJywgeyBzdGF0aWM6IGZhbHNlIH0pIHBhbmVsOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZChDZGtDb25uZWN0ZWRPdmVybGF5LCB7IHN0YXRpYzogZmFsc2UgfSkgb3ZlcmxheURpcjogQ2RrQ29ubmVjdGVkT3ZlcmxheTtcblxuICAgIEBWaWV3Q2hpbGQoJ2hpZGRlbkl0ZW1zQ291bnRlcicsIHsgc3RhdGljOiBmYWxzZSB9KSBoaWRkZW5JdGVtc0NvdW50ZXI6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkcmVuKE1jVGFnKSB0YWdzOiBRdWVyeUxpc3Q8TWNUYWc+O1xuXG4gICAgQENvbnRlbnRDaGlsZCgnbWNTZWxlY3RDbGVhbmVyJywgeyBzdGF0aWM6IHRydWUgfSkgY2xlYW5lcjogTWNDbGVhbmVyO1xuXG4gICAgLyoqIFVzZXItc3VwcGxpZWQgb3ZlcnJpZGUgb2YgdGhlIHRyaWdnZXIgZWxlbWVudC4gKi9cbiAgICBAQ29udGVudENoaWxkKE1jVHJlZVNlbGVjdFRyaWdnZXIsIHsgc3RhdGljOiBmYWxzZSB9KSBjdXN0b21UcmlnZ2VyOiBNY1RyZWVTZWxlY3RUcmlnZ2VyO1xuXG4gICAgQENvbnRlbnRDaGlsZChNY1RyZWVTZWxlY3Rpb24sIHsgc3RhdGljOiBmYWxzZSB9KSB0cmVlOiBNY1RyZWVTZWxlY3Rpb248TWNUcmVlT3B0aW9uPjtcblxuICAgIEBJbnB1dCgpIGhpZGRlbkl0ZW1zVGV4dDogc3RyaW5nID0gJy4uLtC10YnRkSc7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3QgcGFuZWwgaGFzIGJlZW4gdG9nZ2xlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgb3BlbmVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3QgaGFzIGJlZW4gb3BlbmVkLiAqL1xuICAgIEBPdXRwdXQoJ29wZW5lZCcpIHJlYWRvbmx5IG9wZW5lZFN0cmVhbTogT2JzZXJ2YWJsZTx2b2lkPiA9XG4gICAgICAgIHRoaXMub3BlbmVkQ2hhbmdlLnBpcGUoZmlsdGVyKChvKSA9PiBvKSwgbWFwKCgpID0+IHt9KSk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3QgaGFzIGJlZW4gY2xvc2VkLiAqL1xuICAgIEBPdXRwdXQoJ2Nsb3NlZCcpIHJlYWRvbmx5IGNsb3NlZFN0cmVhbTogT2JzZXJ2YWJsZTx2b2lkPiA9XG4gICAgICAgIHRoaXMub3BlbmVkQ2hhbmdlLnBpcGUoZmlsdGVyKChvKSA9PiAhbyksIG1hcCgoKSA9PiB7fSkpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0ZWQgdmFsdWUgaGFzIGJlZW4gY2hhbmdlZCBieSB0aGUgdXNlci4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxNY1RyZWVTZWxlY3RDaGFuZ2U+KCk7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSByYXcgdmFsdWUgb2YgdGhlIHNlbGVjdCBjaGFuZ2VzLiBUaGlzIGlzIGhlcmUgcHJpbWFyaWx5XG4gICAgICogdG8gZmFjaWxpdGF0ZSB0aGUgdHdvLXdheSBiaW5kaW5nIGZvciB0aGUgYHZhbHVlYCBpbnB1dC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgLyoqIENsYXNzZXMgdG8gYmUgcGFzc2VkIHRvIHRoZSBzZWxlY3QgcGFuZWwuIFN1cHBvcnRzIHRoZSBzYW1lIHN5bnRheCBhcyBgbmdDbGFzc2AuICovXG4gICAgQElucHV0KCkgcGFuZWxDbGFzczogc3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPiB8IHsgW2tleTogc3RyaW5nXTogYW55IH07XG5cbiAgICAvKiogT2JqZWN0IHVzZWQgdG8gY29udHJvbCB3aGVuIGVycm9yIG1lc3NhZ2VzIGFyZSBzaG93bi4gKi9cbiAgICBASW5wdXQoKSBlcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXI7XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB1c2VkIHRvIHNvcnQgdGhlIHZhbHVlcyBpbiBhIHNlbGVjdCBpbiBtdWx0aXBsZSBtb2RlLlxuICAgICAqIEZvbGxvd3MgdGhlIHNhbWUgbG9naWMgYXMgYEFycmF5LnByb3RvdHlwZS5zb3J0YC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBzb3J0Q29tcGFyYXRvcjogKGE6IE1jVHJlZU9wdGlvbiwgYjogTWNUcmVlT3B0aW9uLCBvcHRpb25zOiBNY1RyZWVPcHRpb25bXSkgPT4gbnVtYmVyO1xuXG4gICAgLyoqIENvbWJpbmVkIHN0cmVhbSBvZiBhbGwgb2YgdGhlIGNoaWxkIG9wdGlvbnMnIGNoYW5nZSBldmVudHMuICovXG4gICAgcmVhZG9ubHkgb3B0aW9uU2VsZWN0aW9uQ2hhbmdlczogT2JzZXJ2YWJsZTxNY1RyZWVTZWxlY3RDaGFuZ2U+ID0gZGVmZXIoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmNoYW5nZXMucGlwZShcbiAgICAgICAgICAgICAgICBzdGFydFdpdGgodGhpcy5vcHRpb25zKSxcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gbWVyZ2UoLi4udGhpcy5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiBvcHRpb24ub25TZWxlY3Rpb25DaGFuZ2UpKSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5uZ1pvbmUub25TdGFibGVcbiAgICAgICAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSwgc3dpdGNoTWFwKCgpID0+IHRoaXMub3B0aW9uU2VsZWN0aW9uQ2hhbmdlcykpO1xuICAgIH0pIGFzIE9ic2VydmFibGU8TWNUcmVlU2VsZWN0Q2hhbmdlPjtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wbGFjZWhvbGRlcjtcbiAgICB9XG5cbiAgICBzZXQgcGxhY2Vob2xkZXIodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHZhbHVlO1xuXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9wbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXF1aXJlZDtcbiAgICB9XG5cbiAgICBzZXQgcmVxdWlyZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fcmVxdWlyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tdWx0aXBsZTtcbiAgICB9XG5cbiAgICBzZXQgbXVsdGlwbGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZWwpIHtcbiAgICAgICAgICAgIHRocm93IGdldE1jU2VsZWN0RHluYW1pY011bHRpcGxlRXJyb3IoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX211bHRpcGxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tdWx0aXBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgYXV0b1NlbGVjdCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2F1dG9TZWxlY3Q7XG4gICAgfVxuXG4gICAgc2V0IGF1dG9TZWxlY3QodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fYXV0b1NlbGVjdCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYXV0b1NlbGVjdDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBjb21wYXJlIHRoZSBvcHRpb24gdmFsdWVzIHdpdGggdGhlIHNlbGVjdGVkIHZhbHVlcy4gVGhlIGZpcnN0IGFyZ3VtZW50XG4gICAgICogaXMgYSB2YWx1ZSBmcm9tIGFuIG9wdGlvbi4gVGhlIHNlY29uZCBpcyBhIHZhbHVlIGZyb20gdGhlIHNlbGVjdGlvbi4gQSBib29sZWFuXG4gICAgICogc2hvdWxkIGJlIHJldHVybmVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGNvbXBhcmVXaXRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29tcGFyZVdpdGg7XG4gICAgfVxuXG4gICAgc2V0IGNvbXBhcmVXaXRoKGZuOiAobzE6IGFueSwgbzI6IGFueSkgPT4gYm9vbGVhbikge1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6c3RyaWN0LXR5cGUtcHJlZGljYXRlcyAqL1xuICAgICAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRNY1NlbGVjdE5vbkZ1bmN0aW9uVmFsdWVFcnJvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY29tcGFyZVdpdGggPSBmbjtcblxuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlbCkge1xuICAgICAgICAgICAgLy8gQSBkaWZmZXJlbnQgY29tcGFyYXRvciBtZWFucyB0aGUgc2VsZWN0aW9uIGNvdWxkIGNoYW5nZS5cbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNlbGVjdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlID8gdGhpcy50cmVlLmdldFNlbGVjdGVkVmFsdWVzKCkgOiB0aGlzLnRyZWUuZ2V0U2VsZWN0ZWRWYWx1ZXMoKVswXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF92YWx1ZTogYW55ID0gbnVsbDtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG5cbiAgICBzZXQgaWQodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9pZCA9IHZhbHVlIHx8IHRoaXMudWlkO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBzZWxlY3QgaXMgZm9jdXNlZC4gKi9cbiAgICBnZXQgZm9jdXNlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZvY3VzZWQgfHwgdGhpcy5fcGFuZWxPcGVuO1xuICAgIH1cblxuICAgIHNldCBmb2N1c2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9mb2N1c2VkID0gZmFsc2U7XG5cbiAgICBnZXQgcGFuZWxPcGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFuZWxPcGVuO1xuICAgIH1cblxuICAgIGdldCBjYW5TaG93Q2xlYW5lcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xlYW5lciAmJiB0aGlzLnNlbGVjdGlvbk1vZGVsLmhhc1ZhbHVlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcGFuZWxPcGVuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIG9yaWdpbmFsT25LZXlEb3duOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHZvaWQ7XG5cbiAgICAvKiogVGhlIHNjcm9sbCBwb3NpdGlvbiBvZiB0aGUgb3ZlcmxheSBwYW5lbCwgY2FsY3VsYXRlZCB0byBjZW50ZXIgdGhlIHNlbGVjdGVkIG9wdGlvbi4gKi9cbiAgICBwcml2YXRlIHNjcm9sbFRvcCA9IDA7XG5cbiAgICAvKiogVW5pcXVlIGlkIGZvciB0aGlzIGlucHV0LiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgdWlkID0gYG1jLXNlbGVjdC0ke25leHRVbmlxdWVJZCsrfWA7XG5cbiAgICAvKiogRW1pdHMgd2hlbmV2ZXIgdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8vIFVzZWQgZm9yIHN0b3JpbmcgdGhlIHZhbHVlcyB0aGF0IHdlcmUgYXNzaWduZWQgYmVmb3JlIHRoZSBvcHRpb25zIHdlcmUgaW5pdGlhbGl6ZWQuXG4gICAgcHJpdmF0ZSB0ZW1wVmFsdWVzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcmVhZG9ubHkgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHZpZXdwb3J0UnVsZXI6IFZpZXdwb3J0UnVsZXIsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICAgICAgQEluamVjdChNQ19TRUxFQ1RfU0NST0xMX1NUUkFURUdZKSBwcml2YXRlIHJlYWRvbmx5IHNjcm9sbFN0cmF0ZWd5RmFjdG9yeSxcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChOR19WQUxJREFUT1JTKSBwdWJsaWMgcmF3VmFsaWRhdG9yczogVmFsaWRhdG9yW10sXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfVkFMSURBVElPTikgcHJpdmF0ZSBtY1ZhbGlkYXRpb246IE1jVmFsaWRhdGlvbk9wdGlvbnMsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcmVhZG9ubHkgZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcGFyZW50Rm9ybTogTmdGb3JtLFxuICAgICAgICBAT3B0aW9uYWwoKSBwYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByZWFkb25seSBwYXJlbnRGb3JtRmllbGQ6IE1jRm9ybUZpZWxkLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIG5nQ29udHJvbDogTmdDb250cm9sLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHB1YmxpYyBuZ01vZGVsOiBOZ01vZGVsLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHB1YmxpYyBmb3JtQ29udHJvbE5hbWU6IEZvcm1Db250cm9sTmFtZVxuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmLCBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXIsIHBhcmVudEZvcm0sIHBhcmVudEZvcm1Hcm91cCwgbmdDb250cm9sKTtcblxuICAgICAgICBpZiAodGhpcy5uZ0NvbnRyb2wpIHtcbiAgICAgICAgICAgIC8vIE5vdGU6IHdlIHByb3ZpZGUgdGhlIHZhbHVlIGFjY2Vzc29yIHRocm91Z2ggaGVyZSwgaW5zdGVhZCBvZlxuICAgICAgICAgICAgLy8gdGhlIGBwcm92aWRlcnNgIHRvIGF2b2lkIHJ1bm5pbmcgaW50byBhIGNpcmN1bGFyIGltcG9ydC5cbiAgICAgICAgICAgIHRoaXMubmdDb250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRm9yY2Ugc2V0dGVyIHRvIGJlIGNhbGxlZCBpbiBjYXNlIGlkIHdhcyBub3Qgc3BlY2lmaWVkLlxuICAgICAgICB0aGlzLmlkID0gdGhpcy5pZDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuXG4gICAgICAgIC8vIFdlIG5lZWQgYGRpc3RpbmN0VW50aWxDaGFuZ2VkYCBoZXJlLCBiZWNhdXNlIHNvbWUgYnJvd3NlcnMgd2lsbFxuICAgICAgICAvLyBmaXJlIHRoZSBhbmltYXRpb24gZW5kIGV2ZW50IHR3aWNlIGZvciB0aGUgc2FtZSBhbmltYXRpb24uIFNlZTpcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMjQwODRcbiAgICAgICAgdGhpcy5wYW5lbERvbmVBbmltYXRpbmdTdHJlYW1cbiAgICAgICAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UuZW1pdCh0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5lZENoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYW5lbERvbmVBbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5RGlyLm9mZnNldFggPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRyZWUpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKHRoaXMubWNWYWxpZGF0aW9uLnVzZVZhbGlkYXRpb24pIHtcbiAgICAgICAgICAgIHNldE1vc2FpY1ZhbGlkYXRpb24odGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyZWUucmVzZXRGb2N1c2VkSXRlbU9uQmx1ciA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwgPSB0aGlzLnRyZWUuc2VsZWN0aW9uTW9kZWwgPSBuZXcgU2VsZWN0aW9uTW9kZWw8YW55Pih0aGlzLm11bHRpcGxlKTtcbiAgICAgICAgdGhpcy50cmVlLm5nQWZ0ZXJDb250ZW50SW5pdCgpO1xuXG4gICAgICAgIHRoaXMuaW5pdEtleU1hbmFnZXIoKTtcblxuICAgICAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLnRyZWUucmVuZGVyZWRPcHRpb25zO1xuICAgICAgICB0aGlzLnRyZWUuYXV0b1NlbGVjdCA9IHRoaXMuYXV0b1NlbGVjdDtcblxuICAgICAgICBpZiAodGhpcy50cmVlLm11bHRpcGxlTW9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy50cmVlLm11bHRpcGxlTW9kZSA9IHRoaXMubXVsdGlwbGUgPyBNdWx0aXBsZU1vZGUuQ0hFQ0tCT1ggOiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRoaXMudHJlZS5ub1Vuc2VsZWN0TGFzdCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudGVtcFZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25CeVZhbHVlKHRoaXMudGVtcFZhbHVlcyk7XG4gICAgICAgICAgICB0aGlzLnRlbXBWYWx1ZXMgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vcHRpb25TZWxlY3Rpb25DaGFuZ2VzXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlICYmIHRoaXMucGFuZWxPcGVuICYmIGV2ZW50LmlzVXNlcklucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRyZWUuc2VsZWN0aW9uQ2hhbmdlXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnNlbGVjdGVkVmFsdWVzKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQobmV3IE1jVHJlZVNlbGVjdENoYW5nZSh0aGlzLCBldmVudC5vcHRpb24pKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuY2hhbmdlZFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5hZGRlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmtleU1hbmFnZXIuc2V0Rm9jdXNPcmlnaW4oJ3Byb2dyYW0nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5maW5kKChvcHRpb24pID0+IG9wdGlvbi5kYXRhID09PSBldmVudC5hZGRlZFswXSkgYXMgYW55XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMudHJlZSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnRhZ3MuY2hhbmdlc1xuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNhbGN1bGF0ZUhpZGRlbkl0ZW1zKCksIDApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNhbGN1bGF0ZUhpZGRlbkl0ZW1zKCksIDApO1xuICAgIH1cblxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgaWYgKHRoaXMubmdDb250cm9sKSB7IHRoaXMudXBkYXRlRXJyb3JTdGF0ZSgpOyB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICAvLyBVcGRhdGluZyB0aGUgZGlzYWJsZWQgc3RhdGUgaXMgaGFuZGxlZCBieSBgbWl4aW5EaXNhYmxlZGAsIGJ1dCB3ZSBuZWVkIHRvIGFkZGl0aW9uYWxseSBsZXRcbiAgICAgICAgLy8gdGhlIHBhcmVudCBmb3JtIGZpZWxkIGtub3cgdG8gcnVuIGNoYW5nZSBkZXRlY3Rpb24gd2hlbiB0aGUgZGlzYWJsZWQgc3RhdGUgY2hhbmdlcy5cbiAgICAgICAgaWYgKGNoYW5nZXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3kubmV4dCgpO1xuXG4gICAgICAgIHRoaXMuZGVzdHJveS5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgaGlkZGVuSXRlbXNUZXh0Rm9ybWF0dGVyKGhpZGRlbkl0ZW1zVGV4dDogc3RyaW5nLCBoaWRkZW5JdGVtczogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke2hpZGRlbkl0ZW1zVGV4dH0gJHtoaWRkZW5JdGVtc31gO1xuICAgIH1cblxuICAgIGNsZWFyVmFsdWUoJGV2ZW50KTogdm9pZCB7XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oLTEpO1xuXG4gICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uQnlWYWx1ZShbXSk7XG5cbiAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnNlbGVjdGVkVmFsdWVzKTtcbiAgICB9XG5cbiAgICAvKiogYFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gdmFsdWUgY2hhbmdlc2AgKi9cbiAgICBvbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAgIC8qKiBgVmlldyAtPiBtb2RlbCBjYWxsYmFjayBjYWxsZWQgd2hlbiBzZWxlY3QgaGFzIGJlZW4gdG91Y2hlZGAgKi9cbiAgICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICAgIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wZW4oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICF0aGlzLm9wdGlvbnMgfHwgIXRoaXMub3B0aW9ucy5sZW5ndGggfHwgdGhpcy5fcGFuZWxPcGVuKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMudHJpZ2dlclJlY3QgPSB0aGlzLnRyaWdnZXIubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgLy8gTm90ZTogVGhlIGNvbXB1dGVkIGZvbnQtc2l6ZSB3aWxsIGJlIGEgc3RyaW5nIHBpeGVsIHZhbHVlIChlLmcuIFwiMTZweFwiKS5cbiAgICAgICAgLy8gYHBhcnNlSW50YCBpZ25vcmVzIHRoZSB0cmFpbGluZyAncHgnIGFuZCBjb252ZXJ0cyB0aGlzIHRvIGEgbnVtYmVyLlxuICAgICAgICB0aGlzLnRyaWdnZXJGb250U2l6ZSA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUodGhpcy50cmlnZ2VyLm5hdGl2ZUVsZW1lbnQpWydmb250LXNpemUnXSk7XG5cbiAgICAgICAgdGhpcy5fcGFuZWxPcGVuID0gdHJ1ZTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlnaGxpZ2h0Q29ycmVjdE9wdGlvbigpKTtcblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICAgIC8vIFNldCB0aGUgZm9udCBzaXplIG9uIHRoZSBwYW5lbCBlbGVtZW50IG9uY2UgaXQgZXhpc3RzLlxuICAgICAgICB0aGlzLm5nWm9uZS5vblN0YWJsZS5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWdnZXJGb250U2l6ZSAmJiB0aGlzLm92ZXJsYXlEaXIub3ZlcmxheVJlZiAmJiB0aGlzLm92ZXJsYXlEaXIub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlEaXIub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IGAke3RoaXMudHJpZ2dlckZvbnRTaXplfXB4YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogQ2xvc2VzIHRoZSBvdmVybGF5IHBhbmVsIGFuZCBmb2N1c2VzIHRoZSBob3N0IGVsZW1lbnQuICovXG4gICAgY2xvc2UoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fcGFuZWxPcGVuKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuX3BhbmVsT3BlbiA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmZvY3VzKCksIDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHNlbGVjdCdzIHZhbHVlLiBQYXJ0IG9mIHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgICAgKiByZXF1aXJlZCB0byBpbnRlZ3JhdGUgd2l0aCBBbmd1bGFyJ3MgY29yZSBmb3JtcyBBUEkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWUgTmV3IHZhbHVlIHRvIGJlIHdyaXR0ZW4gdG8gdGhlIG1vZGVsLlxuICAgICAqL1xuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50cmVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvbkJ5VmFsdWUodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50ZW1wVmFsdWVzID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTYXZlcyBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgd2hlbiB0aGUgc2VsZWN0J3MgdmFsdWVcbiAgICAgKiBjaGFuZ2VzIGZyb20gdXNlciBpbnB1dC4gUGFydCBvZiB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gICAgICogcmVxdWlyZWQgdG8gaW50ZWdyYXRlIHdpdGggQW5ndWxhcidzIGNvcmUgZm9ybXMgQVBJLlxuICAgICAqXG4gICAgICogQHBhcmFtIGZuIENhbGxiYWNrIHRvIGJlIHRyaWdnZXJlZCB3aGVuIHRoZSB2YWx1ZSBjaGFuZ2VzLlxuICAgICAqL1xuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTYXZlcyBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgd2hlbiB0aGUgc2VsZWN0IGlzIGJsdXJyZWRcbiAgICAgKiBieSB0aGUgdXNlci4gUGFydCBvZiB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlIHJlcXVpcmVkXG4gICAgICogdG8gaW50ZWdyYXRlIHdpdGggQW5ndWxhcidzIGNvcmUgZm9ybXMgQVBJLlxuICAgICAqXG4gICAgICogQHBhcmFtIGZuIENhbGxiYWNrIHRvIGJlIHRyaWdnZXJlZCB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gdG91Y2hlZC5cbiAgICAgKi9cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNhYmxlcyB0aGUgc2VsZWN0LiBQYXJ0IG9mIHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2UgcmVxdWlyZWRcbiAgICAgKiB0byBpbnRlZ3JhdGUgd2l0aCBBbmd1bGFyJ3MgY29yZSBmb3JtcyBBUEkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaXNEaXNhYmxlZCBTZXRzIHdoZXRoZXIgdGhlIGNvbXBvbmVudCBpcyBkaXNhYmxlZC5cbiAgICAgKi9cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWQoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGUgPyB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdGVkIDogdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZFswXTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWRWYWx1ZXMoKTogYW55IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZXMgPSB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdGVkLm1hcCgodmFsdWUpID0+IHRoaXMudHJlZS50cmVlQ29udHJvbC5nZXRWYWx1ZSh2YWx1ZSkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlID8gc2VsZWN0ZWRWYWx1ZXMgOiBzZWxlY3RlZFZhbHVlc1swXTtcbiAgICB9XG5cbiAgICBnZXQgdHJpZ2dlclZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLmVtcHR5KSB7IHJldHVybiAnJzsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZ2V0Vmlld1ZhbHVlKHRoaXMuc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIGdldCB0cmlnZ2VyVmFsdWVzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgaWYgKHRoaXMuZW1wdHkpIHsgcmV0dXJuIFtdOyB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuc2VsZWN0aW9uTW9kZWwgfHwgdGhpcy5zZWxlY3Rpb25Nb2RlbC5pc0VtcHR5KCk7XG4gICAgfVxuXG4gICAgaXNSdGwoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpciA/IHRoaXMuZGlyLnZhbHVlID09PSAncnRsJyA6IGZhbHNlO1xuICAgIH1cblxuICAgIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU9wZW5LZXlkb3duKGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDbG9zZWRLZXlkb3duKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gdGhlIHBhbmVsIGNvbnRlbnQgaXMgZG9uZSBmYWRpbmcgaW4sIHRoZSBwYW5lbERvbmVBbmltYXRpbmcgcHJvcGVydHkgaXNcbiAgICAgKiBzZXQgc28gdGhlIHByb3BlciBjbGFzcyBjYW4gYmUgYWRkZWQgdG8gdGhlIHBhbmVsLlxuICAgICAqL1xuICAgIG9uRmFkZUluRG9uZSgpIHtcbiAgICAgICAgdGhpcy5wYW5lbERvbmVBbmltYXRpbmcgPSB0aGlzLnBhbmVsT3BlbjtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBvbkZvY3VzKCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyB0aGUgdG91Y2hlZCBjYWxsYmFjayBvbmx5IGlmIHRoZSBwYW5lbCBpcyBjbG9zZWQuIE90aGVyd2lzZSwgdGhlIHRyaWdnZXIgd2lsbFxuICAgICAqIFwiYmx1clwiIHRvIHRoZSBwYW5lbCB3aGVuIGl0IG9wZW5zLCBjYXVzaW5nIGEgZmFsc2UgcG9zaXRpdmUuXG4gICAgICovXG4gICAgb25CbHVyKCkge1xuICAgICAgICB0aGlzLl9mb2N1c2VkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkICYmICF0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQ2FsbGJhY2sgdGhhdCBpcyBpbnZva2VkIHdoZW4gdGhlIG92ZXJsYXkgcGFuZWwgaGFzIGJlZW4gYXR0YWNoZWQuICovXG4gICAgb25BdHRhY2hlZCgpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5RGlyLnBvc2l0aW9uQ2hhbmdlXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVPdmVybGF5T2Zmc2V0WCgpO1xuICAgICAgICAgICAgICAgIHRoaXMucGFuZWwubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSB0aGlzLnNjcm9sbFRvcDtcblxuICAgICAgICAgICAgICAgIHRoaXMudHJlZS51cGRhdGVTY3JvbGxTaXplKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyB0aGUgdGhlbWUgdG8gYmUgdXNlZCBvbiB0aGUgcGFuZWwuICovXG4gICAgZ2V0UGFuZWxUaGVtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRGb3JtRmllbGQgPyBgbWMtJHt0aGlzLnBhcmVudEZvcm1GaWVsZC5jb2xvcn1gIDogJyc7XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uQ29udGFpbmVyQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvKiogSW52b2tlZCB3aGVuIGFuIG9wdGlvbiBpcyBjbGlja2VkLiAqL1xuICAgIG9uUmVtb3ZlU2VsZWN0ZWRPcHRpb24oc2VsZWN0ZWRPcHRpb246IGFueSwgJGV2ZW50KSB7XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmRlc2VsZWN0KHNlbGVjdGVkT3B0aW9uKTtcblxuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuc2VsZWN0ZWRWYWx1ZXMpO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZUhpZGRlbkl0ZW1zKCkge1xuICAgICAgICBpZiAodGhpcy5jdXN0b21UcmlnZ2VyIHx8IHRoaXMuZW1wdHkgfHwgIXRoaXMubXVsdGlwbGUpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgbGV0IHZpc2libGVJdGVtczogbnVtYmVyID0gMDtcbiAgICAgICAgY29uc3QgdG90YWxJdGVtc1dpZHRoID0gdGhpcy5nZXRUb3RhbEl0ZW1zV2lkdGhJbk1hdGNoZXIoKTtcbiAgICAgICAgbGV0IHRvdGFsVmlzaWJsZUl0ZW1zV2lkdGg6IG51bWJlciA9IDA7XG5cbiAgICAgICAgdGhpcy50YWdzLmZvckVhY2goKHRhZykgPT4ge1xuICAgICAgICAgICAgaWYgKHRhZy5uYXRpdmVFbGVtZW50Lm9mZnNldFRvcCA8IHRhZy5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCkge1xuICAgICAgICAgICAgICAgIHRvdGFsVmlzaWJsZUl0ZW1zV2lkdGggKz0gdGhpcy5nZXRJdGVtV2lkdGgodGFnLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHZpc2libGVJdGVtcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmhpZGRlbkl0ZW1zID0gdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZC5sZW5ndGggLSB2aXNpYmxlSXRlbXM7XG5cbiAgICAgICAgaWYgKHRoaXMuaGlkZGVuSXRlbXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zQ291bnRlciA9IHRoaXMudHJpZ2dlci5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYy10cmVlLXNlbGVjdF9fbWF0Y2gtaGlkZGVuLXRleHQnKTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXJMaXN0ID0gdGhpcy50cmlnZ2VyLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1jLXRyZWUtc2VsZWN0X19tYXRjaC1saXN0Jyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zQ291bnRlclNob3dlZCA9IGl0ZW1zQ291bnRlci5vZmZzZXRUb3AgPCBpdGVtc0NvdW50ZXIub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgLy8gY29uc3QgaXRlbXNDb3VudGVyV2lkdGg6IG51bWJlciA9IGl0ZW1zQ291bnRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zQ291bnRlcldpZHRoOiBudW1iZXIgPSA4NjtcblxuICAgICAgICAgICAgY29uc3QgbWF0Y2hlckxpc3RXaWR0aDogbnVtYmVyID0gbWF0Y2hlckxpc3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVyV2lkdGg6IG51bWJlciA9IG1hdGNoZXJMaXN0V2lkdGggKyBpdGVtc0NvdW50ZXJXaWR0aDtcblxuICAgICAgICAgICAgaWYgKGl0ZW1zQ291bnRlclNob3dlZCAmJiAodG90YWxJdGVtc1dpZHRoIDwgbWF0Y2hlcldpZHRoKSkgeyB0aGlzLmhpZGRlbkl0ZW1zID0gMDsgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdG90YWxWaXNpYmxlSXRlbXNXaWR0aCA9PT0gbWF0Y2hlckxpc3RXaWR0aCB8fFxuICAgICAgICAgICAgICAgICh0b3RhbFZpc2libGVJdGVtc1dpZHRoICsgaXRlbXNDb3VudGVyV2lkdGgpIDwgbWF0Y2hlckxpc3RXaWR0aFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFpdGVtc0NvdW50ZXJTaG93ZWQgJiYgKHRvdGFsSXRlbXNXaWR0aCArIGl0ZW1zQ291bnRlcldpZHRoKSA+IG1hdGNoZXJXaWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZGVuSXRlbXMrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUb3RhbEl0ZW1zV2lkdGhJbk1hdGNoZXIoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgdHJpZ2dlckNsb25lID0gdGhpcy50cmlnZ2VyLm5hdGl2ZUVsZW1lbnQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICB0cmlnZ2VyQ2xvbmUucXVlcnlTZWxlY3RvcignLm1jLXRyZWUtc2VsZWN0X19tYXRjaC1oaWRkZW4tdGV4dCcpLnJlbW92ZSgpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodHJpZ2dlckNsb25lLCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0cmlnZ2VyQ2xvbmUsICd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRyaWdnZXJDbG9uZSwgJ3RvcCcsICctMTAwJScpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRyaWdnZXJDbG9uZSwgJ2xlZnQnLCAnMCcpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy50cmlnZ2VyLm5hdGl2ZUVsZW1lbnQsIHRyaWdnZXJDbG9uZSk7XG5cbiAgICAgICAgbGV0IHRvdGFsSXRlbXNXaWR0aDogbnVtYmVyID0gMDtcbiAgICAgICAgdHJpZ2dlckNsb25lLnF1ZXJ5U2VsZWN0b3JBbGwoJ21jLXRhZycpLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHRvdGFsSXRlbXNXaWR0aCArPSB0aGlzLmdldEl0ZW1XaWR0aChpdGVtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdHJpZ2dlckNsb25lLnJlbW92ZSgpO1xuXG4gICAgICAgIHJldHVybiB0b3RhbEl0ZW1zV2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRJdGVtV2lkdGgoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG5cbiAgICAgICAgY29uc3Qgd2lkdGg6IG51bWJlciA9IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUud2lkdGggYXMgc3RyaW5nKTtcbiAgICAgICAgY29uc3QgbWFyZ2luTGVmdDogbnVtYmVyID0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS5tYXJnaW5MZWZ0IGFzIHN0cmluZyk7XG4gICAgICAgIGNvbnN0IG1hcmdpblJpZ2h0OiBudW1iZXIgPSBwYXJzZUludChjb21wdXRlZFN0eWxlLm1hcmdpblJpZ2h0IGFzIHN0cmluZyk7XG5cbiAgICAgICAgcmV0dXJuIHdpZHRoICsgbWFyZ2luTGVmdCArIG1hcmdpblJpZ2h0O1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlQ2xvc2VkS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuICAgICAgICBjb25zdCBpc0Fycm93S2V5ID0ga2V5Q29kZSA9PT0gRE9XTl9BUlJPVyB8fCBrZXlDb2RlID09PSBVUF9BUlJPVyB8fFxuICAgICAgICAgICAga2V5Q29kZSA9PT0gTEVGVF9BUlJPVyB8fCBrZXlDb2RlID09PSBSSUdIVF9BUlJPVztcbiAgICAgICAgY29uc3QgaXNPcGVuS2V5ID0ga2V5Q29kZSA9PT0gRU5URVIgfHwga2V5Q29kZSA9PT0gU1BBQ0U7XG5cbiAgICAgICAgLy8gT3BlbiB0aGUgc2VsZWN0IG9uIEFMVCArIGFycm93IGtleSB0byBtYXRjaCB0aGUgbmF0aXZlIDxzZWxlY3Q+XG4gICAgICAgIGlmIChpc09wZW5LZXkgfHwgKCh0aGlzLm11bHRpcGxlIHx8IGV2ZW50LmFsdEtleSkgJiYgaXNBcnJvd0tleSkpIHtcbiAgICAgICAgICAgIC8vIHByZXZlbnRzIHRoZSBwYWdlIGZyb20gc2Nyb2xsaW5nIGRvd24gd2hlbiBwcmVzc2luZyBzcGFjZVxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMubXVsdGlwbGUgJiYgdGhpcy50cmVlLmtleU1hbmFnZXIgJiYgdGhpcy50cmVlLmtleU1hbmFnZXIub25LZXlkb3duKSB7XG4gICAgICAgICAgICB0aGlzLnRyZWUua2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVPcGVuS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgKi9cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG4gICAgICAgIGNvbnN0IGlzQXJyb3dLZXkgPSBrZXlDb2RlID09PSBET1dOX0FSUk9XIHx8IGtleUNvZGUgPT09IFVQX0FSUk9XO1xuXG4gICAgICAgIGlmIChpc0Fycm93S2V5ICYmIGV2ZW50LmFsdEtleSkge1xuICAgICAgICAgICAgLy8gQ2xvc2UgdGhlIHNlbGVjdCBvbiBBTFQgKyBhcnJvdyBrZXkgdG8gbWF0Y2ggdGhlIG5hdGl2ZSA8c2VsZWN0PlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IExFRlRfQVJST1cgfHwga2V5Q29kZSA9PT0gUklHSFRfQVJST1cpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9yaWdpbmFsT25LZXlEb3duLmNhbGwodGhpcy50cmVlLCBldmVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gSE9NRSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy50cmVlLmtleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gRU5EKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLnRyZWUua2V5TWFuYWdlci5zZXRMYXN0SXRlbUFjdGl2ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFBBR0VfVVApIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLnNldFByZXZpb3VzUGFnZUl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBQQUdFX0RPV04pIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLnNldE5leHRQYWdlSXRlbUFjdGl2ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKChrZXlDb2RlID09PSBFTlRFUiB8fCBrZXlDb2RlID09PSBTUEFDRSkgJiYgdGhpcy50cmVlLmtleU1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmF1dG9TZWxlY3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnRvZ2dsZSh0aGlzLnRyZWUua2V5TWFuYWdlci5hY3RpdmVJdGVtLmRhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tdWx0aXBsZSAmJiBrZXlDb2RlID09PSBBICYmIGV2ZW50LmN0cmxLZXkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGhhc0Rlc2VsZWN0ZWRPcHRpb25zID0gdGhpcy5vcHRpb25zLnNvbWUoKG9wdGlvbikgPT4gIW9wdGlvbi5zZWxlY3RlZCk7XG5cbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzRGVzZWxlY3RlZE9wdGlvbnMgJiYgIW9wdGlvbi5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb24uc2VsZWN0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c2x5Rm9jdXNlZEluZGV4ID0gdGhpcy50cmVlLmtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4O1xuXG4gICAgICAgICAgICB0aGlzLnRyZWUua2V5TWFuYWdlci5zZXRGb2N1c09yaWdpbigna2V5Ym9hcmQnKTtcbiAgICAgICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLm11bHRpcGxlICYmIGlzQXJyb3dLZXkgJiYgZXZlbnQuc2hpZnRLZXkgJiYgdGhpcy50cmVlLmtleU1hbmFnZXIuYWN0aXZlSXRlbSAmJlxuICAgICAgICAgICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCAhPT0gcHJldmlvdXNseUZvY3VzZWRJbmRleFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmVlLmtleU1hbmFnZXIuYWN0aXZlSXRlbS5zZWxlY3RWaWFJbnRlcmFjdGlvbihldmVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9TZWxlY3QgJiYgdGhpcy50cmVlLmtleU1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJlZS5zZXRTZWxlY3RlZE9wdGlvbnNCeUtleShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmtleU1hbmFnZXIuYWN0aXZlSXRlbSwgaGFzTW9kaWZpZXJLZXkoZXZlbnQsICdzaGlmdEtleScpLCBoYXNNb2RpZmllcktleShldmVudCwgJ2N0cmxLZXknKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRpYWxpemVTZWxlY3Rpb24oKSB7XG4gICAgICAgIC8vIERlZmVyIHNldHRpbmcgdGhlIHZhbHVlIGluIG9yZGVyIHRvIGF2b2lkIHRoZSBcIkV4cHJlc3Npb25cbiAgICAgICAgLy8gaGFzIGNoYW5nZWQgYWZ0ZXIgaXQgd2FzIGNoZWNrZWRcIiBlcnJvcnMgZnJvbSBBbmd1bGFyLlxuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uQnlWYWx1ZSh0aGlzLm5nQ29udHJvbCA/IHRoaXMubmdDb250cm9sLnZhbHVlIDogdGhpcy5fdmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBzZWxlY3RlZCBvcHRpb24gYmFzZWQgb24gYSB2YWx1ZS4gSWYgbm8gb3B0aW9uIGNhbiBiZVxuICAgICAqIGZvdW5kIHdpdGggdGhlIGRlc2lnbmF0ZWQgdmFsdWUsIHRoZSBzZWxlY3QgdHJpZ2dlciBpcyBjbGVhcmVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgc2V0U2VsZWN0aW9uQnlWYWx1ZSh2YWx1ZTogYW55IHwgYW55W10pIHtcbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHsgdGhyb3cgZ2V0TWNTZWxlY3ROb25BcnJheVZhbHVlRXJyb3IoKTsgfVxuXG4gICAgICAgICAgICB0aGlzLnRyZWUuc2V0T3B0aW9uc0Zyb21WYWx1ZXModmFsdWUpO1xuXG4gICAgICAgICAgICB0aGlzLnNvcnRWYWx1ZXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHJlZS5zZXRPcHRpb25zRnJvbVZhbHVlcyhbdmFsdWVdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEtleU1hbmFnZXIoKSB7XG4gICAgICAgIHRoaXMub3JpZ2luYWxPbktleURvd24gPSB0aGlzLnRyZWUub25LZXlEb3duO1xuXG4gICAgICAgIHRoaXMudHJlZS5vbktleURvd24gPSAoKSA9PiB7fTtcblxuICAgICAgICB0aGlzLnRyZWUua2V5TWFuYWdlci50YWJPdXRcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gUmVzdG9yZSBmb2N1cyB0byB0aGUgdHJpZ2dlciBiZWZvcmUgY2xvc2luZy4gRW5zdXJlcyB0aGF0IHRoZSBmb2N1c1xuICAgICAgICAgICAgICAgIC8vIHBvc2l0aW9uIHdvbid0IGJlIGxvc3QgaWYgdGhlIHVzZXIgZ290IGZvY3VzIGludG8gdGhlIG92ZXJsYXkuXG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLmNoYW5nZVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcGFuZWxPcGVuICYmIHRoaXMucGFuZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxBY3RpdmVPcHRpb25JbnRvVmlldygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX3BhbmVsT3BlbiAmJiAhdGhpcy5tdWx0aXBsZSAmJiB0aGlzLnRyZWUua2V5TWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0uc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogU29ydHMgdGhlIHNlbGVjdGVkIHZhbHVlcyBpbiB0aGUgc2VsZWN0ZWQgYmFzZWQgb24gdGhlaXIgb3JkZXIgaW4gdGhlIHBhbmVsLiAqL1xuICAgIHByaXZhdGUgc29ydFZhbHVlcygpIHtcbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMudG9BcnJheSgpO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zb3J0Q29tcGFyYXRvciA/IHRoaXMuc29ydENvbXBhcmF0b3IoYSwgYiwgb3B0aW9ucykgOlxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmluZGV4T2YoYSkgLSBvcHRpb25zLmluZGV4T2YoYik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlnaGxpZ2h0cyB0aGUgc2VsZWN0ZWQgaXRlbS4gSWYgbm8gb3B0aW9uIGlzIHNlbGVjdGVkLCBpdCB3aWxsIGhpZ2hsaWdodFxuICAgICAqIHRoZSBmaXJzdCBpdGVtIGluc3RlYWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBoaWdobGlnaHRDb3JyZWN0T3B0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5lbXB0eSB8fCAhdGhpcy50cmVlLmtleU1hbmFnZXIpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgY29uc3QgZmlyc3RTZWxlY3RlZFZhbHVlID0gdGhpcy5tdWx0aXBsZSA/IHRoaXMuc2VsZWN0ZWRWYWx1ZXNbMF0gOiB0aGlzLnNlbGVjdGVkVmFsdWVzO1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gdGhpcy5vcHRpb25zLmZpbmQoKG9wdGlvbikgPT4gb3B0aW9uLnZhbHVlID09PSBmaXJzdFNlbGVjdGVkVmFsdWUpO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZE9wdGlvbikge1xuICAgICAgICAgICAgdGhpcy50cmVlLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShzZWxlY3RlZE9wdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogU2Nyb2xscyB0aGUgYWN0aXZlIG9wdGlvbiBpbnRvIHZpZXcuICovXG4gICAgcHJpdmF0ZSBzY3JvbGxBY3RpdmVPcHRpb25JbnRvVmlldygpIHtcbiAgICAgICAgY29uc3QgYWN0aXZlT3B0aW9uSW5kZXggPSB0aGlzLnRyZWUua2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggfHwgMDtcblxuICAgICAgICB0aGlzLnBhbmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gZ2V0T3B0aW9uU2Nyb2xsUG9zaXRpb24oXG4gICAgICAgICAgICBhY3RpdmVPcHRpb25JbmRleCxcbiAgICAgICAgICAgIHRoaXMudHJlZS5nZXRJdGVtSGVpZ2h0KCksXG4gICAgICAgICAgICB0aGlzLnBhbmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgU0VMRUNUX1BBTkVMX01BWF9IRUlHSFRcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB4LW9mZnNldCBvZiB0aGUgb3ZlcmxheSBwYW5lbCBpbiByZWxhdGlvbiB0byB0aGUgdHJpZ2dlcidzIHRvcCBzdGFydCBjb3JuZXIuXG4gICAgICogVGhpcyBtdXN0IGJlIGFkanVzdGVkIHRvIGFsaWduIHRoZSBzZWxlY3RlZCBvcHRpb24gdGV4dCBvdmVyIHRoZSB0cmlnZ2VyIHRleHQgd2hlblxuICAgICAqIHRoZSBwYW5lbCBvcGVucy4gV2lsbCBjaGFuZ2UgYmFzZWQgb24gTFRSIG9yIFJUTCB0ZXh0IGRpcmVjdGlvbi4gTm90ZSB0aGF0IHRoZSBvZmZzZXRcbiAgICAgKiBjYW4ndCBiZSBjYWxjdWxhdGVkIHVudGlsIHRoZSBwYW5lbCBoYXMgYmVlbiBhdHRhY2hlZCwgYmVjYXVzZSB3ZSBuZWVkIHRvIGtub3cgdGhlXG4gICAgICogY29udGVudCB3aWR0aCBpbiBvcmRlciB0byBjb25zdHJhaW4gdGhlIHBhbmVsIHdpdGhpbiB0aGUgdmlld3BvcnQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVPdmVybGF5T2Zmc2V0WCgpIHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheVJlY3QgPSB0aGlzLm92ZXJsYXlEaXIub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3Qgdmlld3BvcnRTaXplID0gdGhpcy52aWV3cG9ydFJ1bGVyLmdldFZpZXdwb3J0U2l6ZSgpO1xuICAgICAgICBjb25zdCBpc1J0bCA9IHRoaXMuaXNSdGwoKTtcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnMgKi9cbiAgICAgICAgY29uc3QgcGFkZGluZ1dpZHRoID0gU0VMRUNUX1BBTkVMX1BBRERJTkdfWCAqIDI7XG4gICAgICAgIGxldCBvZmZzZXRYOiBudW1iZXIgPSBTRUxFQ1RfUEFORUxfUEFERElOR19YO1xuXG4gICAgICAgIC8vIEludmVydCB0aGUgb2Zmc2V0IGluIExUUi5cbiAgICAgICAgaWYgKCFpc1J0bCkgeyBvZmZzZXRYICo9IC0xOyB9XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIGhvdyBtdWNoIHRoZSBzZWxlY3Qgb3ZlcmZsb3dzIG9uIGVhY2ggc2lkZS5cbiAgICAgICAgY29uc3QgbGVmdE92ZXJmbG93ID0gMCAtIChvdmVybGF5UmVjdC5sZWZ0ICsgb2Zmc2V0WCAtIChpc1J0bCA/IHBhZGRpbmdXaWR0aCA6IDApKTtcbiAgICAgICAgY29uc3QgcmlnaHRPdmVyZmxvdyA9IG92ZXJsYXlSZWN0LnJpZ2h0ICsgb2Zmc2V0WCAtIHZpZXdwb3J0U2l6ZS53aWR0aFxuICAgICAgICAgICAgKyAoaXNSdGwgPyAwIDogcGFkZGluZ1dpZHRoKTtcblxuICAgICAgICAvLyBJZiB0aGUgZWxlbWVudCBvdmVyZmxvd3Mgb24gZWl0aGVyIHNpZGUsIHJlZHVjZSB0aGUgb2Zmc2V0IHRvIGFsbG93IGl0IHRvIGZpdC5cbiAgICAgICAgaWYgKGxlZnRPdmVyZmxvdyA+IDApIHtcbiAgICAgICAgICAgIG9mZnNldFggKz0gbGVmdE92ZXJmbG93ICsgU0VMRUNUX1BBTkVMX1ZJRVdQT1JUX1BBRERJTkc7XG4gICAgICAgIH0gZWxzZSBpZiAocmlnaHRPdmVyZmxvdyA+IDApIHtcbiAgICAgICAgICAgIG9mZnNldFggLT0gcmlnaHRPdmVyZmxvdyArIFNFTEVDVF9QQU5FTF9WSUVXUE9SVF9QQURESU5HO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0IHRoZSBvZmZzZXQgZGlyZWN0bHkgaW4gb3JkZXIgdG8gYXZvaWQgaGF2aW5nIHRvIGdvIHRocm91Z2ggY2hhbmdlIGRldGVjdGlvbiBhbmRcbiAgICAgICAgLy8gcG90ZW50aWFsbHkgdHJpZ2dlcmluZyBcImNoYW5nZWQgYWZ0ZXIgaXQgd2FzIGNoZWNrZWRcIiBlcnJvcnMuIFJvdW5kIHRoZSB2YWx1ZSB0byBhdm9pZFxuICAgICAgICAvLyBibHVycnkgY29udGVudCBpbiBzb21lIGJyb3dzZXJzLlxuICAgICAgICB0aGlzLm92ZXJsYXlEaXIub2Zmc2V0WCA9IE1hdGgucm91bmQob2Zmc2V0WCk7XG4gICAgICAgIHRoaXMub3ZlcmxheURpci5vdmVybGF5UmVmLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqIENvbXBhcmlzb24gZnVuY3Rpb24gdG8gc3BlY2lmeSB3aGljaCBvcHRpb24gaXMgZGlzcGxheWVkLiBEZWZhdWx0cyB0byBvYmplY3QgZXF1YWxpdHkuICovXG4gICAgcHJpdmF0ZSBfY29tcGFyZVdpdGggPSAobzE6IGFueSwgbzI6IGFueSkgPT4gbzEgPT09IG8yO1xufVxuIl19