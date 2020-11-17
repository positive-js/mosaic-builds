/**
 * @fileoverview added by tsickle
 * Generated from: tree-select.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
import { defer, merge, Observable, Subject, Subscription } from 'rxjs';
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
        this.backdropClass = 'cdk-overlay-transparent-backdrop';
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
        this._hasBackdrop = false;
        this._focused = false;
        this.closeSubscription = Subscription.EMPTY;
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
     * @return {?}
     */
    get hasBackdrop() {
        return this._hasBackdrop;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set hasBackdrop(value) {
        this._hasBackdrop = coerceBooleanProperty(value);
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
        this.closeSubscription.unsubscribe();
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
        this.closeSubscription = this.closingActions()
            .subscribe((/**
         * @return {?}
         */
        () => this.close()));
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
    closingActions() {
        /** @type {?} */
        const backdrop = (/** @type {?} */ (this.overlayDir.overlayRef)).backdropClick();
        /** @type {?} */
        const outsidePointerEvents = (/** @type {?} */ (this.overlayDir.overlayRef)).outsidePointerEvents();
        /** @type {?} */
        const detachments = (/** @type {?} */ (this.overlayDir.overlayRef)).detachments();
        return merge(backdrop, outsidePointerEvents, detachments);
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
                template: "<div cdk-overlay-origin\n     class=\"mc-tree-select__trigger\"\n     [class.mc-tree-select__trigger_multiple]=\"multiple\"\n     #origin=\"cdkOverlayOrigin\"\n     #trigger>\n    <div class=\"mc-tree-select__matcher\" [ngSwitch]=\"empty\">\n        <span class=\"mc-tree-select__placeholder\" *ngSwitchCase=\"true\">{{ placeholder || '\\u00A0' }}</span>\n        <span *ngSwitchCase=\"false\" [ngSwitch]=\"!!customTrigger\">\n            <div *ngSwitchDefault [ngSwitch]=\"multiple\" class=\"mc-tree-select__match-container\">\n                <span *ngSwitchCase=\"false\" class=\"mc-tree-select__matcher-text\">{{ triggerValue }}</span>\n                <div *ngSwitchCase=\"true\" class=\"mc-tree-select__multiple-matcher\">\n                    <div class=\"mc-tree-select__match-list\">\n                        <mc-tag *ngFor=\"let option of triggerValues\"\n                            [selectable]=\"false\"\n                            [disabled]=\"disabled\"\n                            [class.mc-error]=\"errorState\">\n\n                            {{ tree.treeControl.getViewValue(option) }}\n                            <i mc-icon=\"mc-close-S_16\" (click)=\"onRemoveSelectedOption(option, $event)\"></i>\n                        </mc-tag>\n                    </div>\n                    <div class=\"mc-tree-select__match-hidden-text\"\n                         [style.display]=\"hiddenItems > 0 ? 'block' : 'none'\"\n                         #hiddenItemsCounter>\n                        {{ hiddenItemsTextFormatter(hiddenItemsText, hiddenItems) }}\n                    </div>\n                </div>\n            </div>\n            <ng-content select=\"mc-tree-select-trigger\" *ngSwitchCase=\"true\"></ng-content>\n        </span>\n    </div>\n\n    <div class=\"mc-select__cleaner\" *ngIf=\"canShowCleaner\" (click)=\"clearValue($event)\">\n        <ng-content select=\"mc-cleaner\"></ng-content>\n    </div>\n\n    <div class=\"mc-tree-select__arrow-wrapper\">\n        <i class=\"mc-tree-select__arrow\" mc-icon=\"mc-angle-down-L_16\"></i>\n    </div>\n</div>\n\n<ng-template\n    cdk-connected-overlay\n    cdkConnectedOverlayLockPosition\n    [cdkConnectedOverlayHasBackdrop]=\"hasBackdrop\"\n    [cdkConnectedOverlayBackdropClass]=\"backdropClass\"\n    [cdkConnectedOverlayScrollStrategy]=\"scrollStrategy\"\n    [cdkConnectedOverlayOrigin]=\"origin\"\n    [cdkConnectedOverlayOpen]=\"panelOpen\"\n    [cdkConnectedOverlayPositions]=\"positions\"\n    [cdkConnectedOverlayMinWidth]=\"triggerRect?.width\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    (backdropClick)=\"close()\"\n    (attach)=\"onAttached()\"\n    (detach)=\"close()\">\n\n    <div #panel\n         class=\"mc-tree-select__panel {{ getPanelTheme() }}\"\n         [ngClass]=\"panelClass\"\n         [style.transformOrigin]=\"transformOrigin\"\n         [style.font-size.px]=\"triggerFontSize\"\n         (keydown)=\"handleKeydown($event)\">\n\n        <div #optionsContainer\n             class=\"mc-tree-select__content\"\n             [@fadeInContent]=\"'showing'\"\n             (@fadeInContent.done)=\"panelDoneAnimatingStream.next($event.toState)\">\n            <ng-content select=\"mc-tree-selection\"></ng-content>\n        </div>\n    </div>\n</ng-template>\n",
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
                styles: [".mc-divider{border-top-style:solid;border-top-width:1px;display:block;margin:0}.mc-divider.mc-divider_vertical{border-right-style:solid;border-right-width:1px;border-top:0}.mc-divider.mc-divider_inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:80px}.mc-tree-selection{display:block}.mc-tree-option{align-items:center;border:2px solid transparent;display:flex;height:28px;word-wrap:break-word}.mc-tree-option>.mc-icon{cursor:pointer;margin-right:4px}.mc-tree-option:focus{outline:none}.mc-tree-option:not([disabled]){cursor:pointer}.mc-tree-option .mc-pseudo-checkbox{margin-right:8px}.mc-tree-node-toggle{cursor:pointer;margin-right:4px}.mc-tree-node-toggle .mc-icon{transform:rotate(-90deg)}.mc-tree-node-toggle.mc-opened .mc-icon{transform:rotate(0)}.mc-tree-node-toggle[disabled]{cursor:default}.mc-tree-select{box-sizing:border-box;display:inline-block;outline:none;vertical-align:top;width:100%}.mc-tree-select.mc-disabled .mc-tree-select__trigger{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;cursor:default;user-select:none}.mc-tree-select__trigger{box-sizing:border-box;cursor:pointer;display:flex;height:30px;padding-left:15px;padding-right:7px;position:relative}.mc-tree-select__trigger.mc-tree-select__trigger_multiple{padding-left:7px}.mc-tree-select__trigger.mc-tree-select__trigger_multiple .mc-tree-select__placeholder{margin-left:8px}.mc-tree-select__matcher{align-items:center;display:flex;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%}.mc-tree-select__matcher>span{width:100%}.mc-tree-select__multiple-matcher{display:flex;width:100%}.mc-tree-select__match-list{display:flex;flex-wrap:wrap;margin:0;max-height:28px;overflow:hidden;padding-left:0}.mc-tree-select__match-list .mc-tag{margin-right:4px}.mc-tree-select__match-container{display:flex;flex-direction:row;justify-content:space-between;width:100%}.mc-tree-select__match-container .mc-tree-select__match-hidden-text{-ms-grid-row-align:center;align-self:center;flex:0 0 70px;padding:0 8px;text-align:right}.mc-tree-select__match-item{border:1px solid transparent;border-radius:3px;display:flex;margin-right:4px;max-width:100%;padding-left:7px}.mc-tree-select__arrow-wrapper{-ms-grid-row-align:center;align-self:center}.mc-form-field-appearance-fill .mc-tree-select__arrow-wrapper,.mc-form-field-appearance-standard .mc-tree-select__arrow-wrapper{transform:translateY(-50%)}.mc-form-field-appearance-outline .mc-tree-select__arrow-wrapper{transform:translateY(-25%)}.mc-tree-select__panel{border-bottom-left-radius:3px;border-bottom-right-radius:3px;border-style:solid;border-width:1px;max-height:224px;min-width:100%;overflow:auto;padding:4px 0}.mc-tree-select__panel .mc-optgroup-label,.mc-tree-select__panel .mc-tree-select-option{font-size:inherit;height:32px;line-height:32px}.mc-tree-select__content,.mc-tree-select__content .mc-tree-selection{height:100%}.mc-form-field-type-mc-select:not(.mc-disabled) .mc-form-field-flex{cursor:pointer}.mc-form-field-type-mc-select .mc-form-field-label{width:calc(100% - 18px)}"]
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
    backdropClass: [{ type: Input }],
    errorStateMatcher: [{ type: Input }],
    sortComparator: [{ type: Input }],
    placeholder: [{ type: Input }],
    required: [{ type: Input }],
    multiple: [{ type: Input }],
    autoSelect: [{ type: Input }],
    compareWith: [{ type: Input }],
    id: [{ type: Input }],
    hasBackdrop: [{ type: Input }],
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
    /** @type {?} */
    McTreeSelect.prototype.backdropClass;
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
    McTreeSelect.prototype._hasBackdrop;
    /**
     * @type {?}
     * @private
     */
    McTreeSelect.prototype._focused;
    /**
     * @type {?}
     * @private
     */
    McTreeSelect.prototype.closeSubscription;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvdHJlZS1zZWxlY3QvIiwic291cmNlcyI6WyJ0cmVlLXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQ0gsbUJBQW1CLEVBQ25CLGFBQWEsRUFDaEIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBR0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFNBQVMsRUFFVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUlOLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxJQUFJLEVBRUosU0FBUyxFQUNULFlBQVksRUFDWixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUVILGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsYUFBYSxFQUNiLFNBQVMsRUFDVCxNQUFNLEVBQ04sT0FBTyxFQUVWLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUNILFVBQVUsRUFDVixHQUFHLEVBQ0gsS0FBSyxFQUNMLElBQUksRUFDSixVQUFVLEVBQ1YsV0FBVyxFQUNYLEtBQUssRUFDTCxRQUFRLEVBQ1IsQ0FBQyxFQUNELE9BQU8sRUFDUCxTQUFTLEVBQ1QsY0FBYyxFQUNqQixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQ0gsdUJB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QUE4RTs7SUFFOUUscUNBQW9FOzs7OztJQUdwRSx5Q0FBOEM7Ozs7OztJQU05QyxzQ0FBK0Y7Ozs7O0lBRy9GLDhDQVdxQzs7Ozs7SUFhckMsb0NBQTZCOzs7OztJQWE3QixpQ0FBbUM7Ozs7O0lBZW5DLGlDQUFtQzs7Ozs7SUFhbkMsbUNBQW9DOzs7OztJQThCcEMsOEJBQTJCOzs7OztJQVkzQiwyQkFBb0I7Ozs7O0lBV3BCLG9DQUFzQzs7Ozs7SUFXdEMsZ0NBQXlCOzs7OztJQVV6Qix5Q0FBK0M7Ozs7O0lBRS9DLGtDQUEyQjs7Ozs7SUFFM0IseUNBQTBEOzs7Ozs7SUFHMUQsaUNBQXNCOzs7Ozs7SUFHdEIsMkJBQXFEOzs7Ozs7SUFHckQsK0JBQStDOzs7OztJQUcvQyxrQ0FBNkM7Ozs7O0lBNko3QyxnQ0FBMEM7Ozs7O0lBRzFDLGlDQUFxQjs7Ozs7O0lBcWZyQixvQ0FBdUQ7O0lBanBCbkQseUNBQTZDOzs7OztJQUM3QyxxQ0FBNkM7Ozs7O0lBQzdDLDhCQUErQjs7Ozs7SUFDL0IsZ0NBQW9DOzs7OztJQUVwQyw2Q0FBeUU7O0lBQ3pFLHFDQUFvRTs7Ozs7SUFDcEUsb0NBQTRFOzs7OztJQUM1RSwyQkFBZ0Q7Ozs7O0lBR2hELHVDQUF5RDs7SUFFekQsK0JBQTJDOztJQUMzQyx1Q0FBMkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZTpuby1lbXB0eSAqL1xuXG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQge1xuICAgIENka0Nvbm5lY3RlZE92ZXJsYXksXG4gICAgVmlld3BvcnRSdWxlclxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIERpcmVjdGl2ZSxcbiAgICBEb0NoZWNrLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgU2VsZixcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q2hpbGRyZW4sXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIEZvcm1Db250cm9sTmFtZSxcbiAgICBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgTkdfVkFMSURBVE9SUyxcbiAgICBOZ0NvbnRyb2wsXG4gICAgTmdGb3JtLFxuICAgIE5nTW9kZWwsXG4gICAgVmFsaWRhdG9yXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gICAgRE9XTl9BUlJPVyxcbiAgICBFTkQsXG4gICAgRU5URVIsXG4gICAgSE9NRSxcbiAgICBMRUZUX0FSUk9XLFxuICAgIFJJR0hUX0FSUk9XLFxuICAgIFNQQUNFLFxuICAgIFVQX0FSUk9XLFxuICAgIEEsXG4gICAgUEFHRV9VUCxcbiAgICBQQUdFX0RPV04sXG4gICAgaGFzTW9kaWZpZXJLZXlcbn0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IENka1RyZWUgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvdHJlZSc7XG5pbXBvcnQge1xuICAgIGdldE9wdGlvblNjcm9sbFBvc2l0aW9uLFxuICAgIENhbkRpc2FibGUsXG4gICAgQ2FuVXBkYXRlRXJyb3JTdGF0ZSxcbiAgICBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICBIYXNUYWJJbmRleCxcbiAgICBDYW5EaXNhYmxlQ3RvcixcbiAgICBIYXNUYWJJbmRleEN0b3IsXG4gICAgQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IsXG4gICAgbWl4aW5UYWJJbmRleCxcbiAgICBtaXhpbkRpc2FibGVkLFxuICAgIG1peGluRXJyb3JTdGF0ZSxcbiAgICBtY1NlbGVjdEFuaW1hdGlvbnMsXG5cbiAgICBTRUxFQ1RfUEFORUxfTUFYX0hFSUdIVCxcbiAgICBTRUxFQ1RfUEFORUxfUEFERElOR19YLFxuICAgIFNFTEVDVF9QQU5FTF9WSUVXUE9SVF9QQURESU5HLFxuICAgIE1DX1NFTEVDVF9TQ1JPTExfU1RSQVRFR1ksXG5cbiAgICBnZXRNY1NlbGVjdER5bmFtaWNNdWx0aXBsZUVycm9yLFxuICAgIGdldE1jU2VsZWN0Tm9uRnVuY3Rpb25WYWx1ZUVycm9yLFxuICAgIGdldE1jU2VsZWN0Tm9uQXJyYXlWYWx1ZUVycm9yLFxuICAgIE11bHRpcGxlTW9kZSxcblxuICAgIE1DX1ZBTElEQVRJT04sXG4gICAgc2V0TW9zYWljVmFsaWRhdGlvbixcbiAgICBNY1ZhbGlkYXRpb25PcHRpb25zXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IE1jQ2xlYW5lciwgTWNGb3JtRmllbGQsIE1jRm9ybUZpZWxkQ29udHJvbCB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9mb3JtLWZpZWxkJztcbmltcG9ydCB7IE1jVGFnIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL3RhZ3MnO1xuaW1wb3J0IHsgTWNUcmVlU2VsZWN0aW9uLCBNY1RyZWVPcHRpb24gfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvdHJlZSc7XG5pbXBvcnQgeyBkZWZlciwgbWVyZ2UsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgICBmaWx0ZXIsXG4gICAgbWFwLFxuICAgIHN3aXRjaE1hcCxcbiAgICB0YWtlLFxuICAgIHRha2VVbnRpbCxcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgICBzdGFydFdpdGhcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG4vKiogQ2hhbmdlIGV2ZW50IG9iamVjdCB0aGF0IGlzIGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IHZhbHVlIGhhcyBjaGFuZ2VkLiAqL1xuZXhwb3J0IGNsYXNzIE1jVHJlZVNlbGVjdENoYW5nZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZTogTWNUcmVlU2VsZWN0LCBwdWJsaWMgdmFsdWU6IGFueSwgcHVibGljIGlzVXNlcklucHV0ID0gZmFsc2UpIHt9XG59XG5cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbWMtdHJlZS1zZWxlY3QtdHJpZ2dlcicgfSlcbmV4cG9ydCBjbGFzcyBNY1RyZWVTZWxlY3RUcmlnZ2VyIHt9XG5cblxuY2xhc3MgTWNUcmVlU2VsZWN0QmFzZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwdWJsaWMgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICAgICAgcHVibGljIHBhcmVudEZvcm06IE5nRm9ybSxcbiAgICAgICAgcHVibGljIHBhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgICAgICBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2xcbiAgICApIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuY29uc3QgTWNUcmVlU2VsZWN0TWl4aW5CYXNlOiBDYW5EaXNhYmxlQ3RvciAmIEhhc1RhYkluZGV4Q3RvciAmIENhblVwZGF0ZUVycm9yU3RhdGVDdG9yICZcbiAgICB0eXBlb2YgTWNUcmVlU2VsZWN0QmFzZSA9IG1peGluVGFiSW5kZXgobWl4aW5EaXNhYmxlZChtaXhpbkVycm9yU3RhdGUoTWNUcmVlU2VsZWN0QmFzZSkpKTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRyZWUtc2VsZWN0JyxcbiAgICBleHBvcnRBczogJ21jVHJlZVNlbGVjdCcsXG4gICAgdGVtcGxhdGVVcmw6ICd0cmVlLXNlbGVjdC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90cmVlLXNlbGVjdC5zY3NzJ10sXG4gICAgaW5wdXRzOiBbJ2Rpc2FibGVkJywgJ3RhYkluZGV4J10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdHJlZS1zZWxlY3QnLFxuICAgICAgICAnW2NsYXNzLm1jLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgICAgICdbY2xhc3MubWMtaW52YWxpZF0nOiAnZXJyb3JTdGF0ZScsXG5cbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCcsXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuXG4gICAgICAgICcoY2xpY2spJzogJ3RvZ2dsZSgpJyxcbiAgICAgICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duKCRldmVudCknLFxuICAgICAgICAnKGZvY3VzKSc6ICdvbkZvY3VzKCknLFxuICAgICAgICAnKGJsdXIpJzogJ29uQmx1cigpJyxcbiAgICAgICAgJyh3aW5kb3c6cmVzaXplKSc6ICdjYWxjdWxhdGVIaWRkZW5JdGVtcygpJ1xuICAgIH0sXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICBtY1NlbGVjdEFuaW1hdGlvbnMudHJhbnNmb3JtUGFuZWwsXG4gICAgICAgIG1jU2VsZWN0QW5pbWF0aW9ucy5mYWRlSW5Db250ZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBNY0Zvcm1GaWVsZENvbnRyb2wsIHVzZUV4aXN0aW5nOiBNY1RyZWVTZWxlY3QgfSxcbiAgICAgICAgeyBwcm92aWRlOiBDZGtUcmVlLCB1c2VFeGlzdGluZzogTWNUcmVlU2VsZWN0IH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jVHJlZVNlbGVjdCBleHRlbmRzIE1jVHJlZVNlbGVjdE1peGluQmFzZSBpbXBsZW1lbnRzXG4gICAgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgRG9DaGVjaywgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgQ2FuRGlzYWJsZSwgSGFzVGFiSW5kZXgsIE1jRm9ybUZpZWxkQ29udHJvbDxNY1RyZWVPcHRpb24+LCBDYW5VcGRhdGVFcnJvclN0YXRlIHtcblxuICAgIC8qKiBBIG5hbWUgZm9yIHRoaXMgY29udHJvbCB0aGF0IGNhbiBiZSB1c2VkIGJ5IGBtYy1mb3JtLWZpZWxkYC4gKi9cbiAgICBjb250cm9sVHlwZSA9ICdtYy1zZWxlY3QnO1xuXG4gICAgaGlkZGVuSXRlbXM6IG51bWJlciA9IDA7XG5cbiAgICAvKiogVGhlIGxhc3QgbWVhc3VyZWQgdmFsdWUgZm9yIHRoZSB0cmlnZ2VyJ3MgY2xpZW50IGJvdW5kaW5nIHJlY3QuICovXG4gICAgdHJpZ2dlclJlY3Q6IENsaWVudFJlY3Q7XG5cbiAgICAvKiogVGhlIGNhY2hlZCBmb250LXNpemUgb2YgdGhlIHRyaWdnZXIgZWxlbWVudC4gKi9cbiAgICB0cmlnZ2VyRm9udFNpemUgPSAwO1xuXG4gICAgLyoqIERlYWxzIHdpdGggdGhlIHNlbGVjdGlvbiBsb2dpYy4gKi9cbiAgICBzZWxlY3Rpb25Nb2RlbDogU2VsZWN0aW9uTW9kZWw8YW55PjtcblxuICAgIC8qKiBUaGUgdmFsdWUgb2YgdGhlIHNlbGVjdCBwYW5lbCdzIHRyYW5zZm9ybS1vcmlnaW4gcHJvcGVydHkuICovXG4gICAgdHJhbnNmb3JtT3JpZ2luOiBzdHJpbmcgPSAndG9wJztcblxuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSBwYW5lbCBlbGVtZW50IGlzIGZpbmlzaGVkIHRyYW5zZm9ybWluZyBpbi4gKi9cbiAgICBwYW5lbERvbmVBbmltYXRpbmdTdHJlYW0gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbiAgICAvKiogU3RyYXRlZ3kgdGhhdCB3aWxsIGJlIHVzZWQgdG8gaGFuZGxlIHNjcm9sbGluZyB3aGlsZSB0aGUgc2VsZWN0IHBhbmVsIGlzIG9wZW4uICovXG4gICAgc2Nyb2xsU3RyYXRlZ3kgPSB0aGlzLnNjcm9sbFN0cmF0ZWd5RmFjdG9yeSgpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHktb2Zmc2V0IG9mIHRoZSBvdmVybGF5IHBhbmVsIGluIHJlbGF0aW9uIHRvIHRoZSB0cmlnZ2VyJ3MgdG9wIHN0YXJ0IGNvcm5lci5cbiAgICAgKiBUaGlzIG11c3QgYmUgYWRqdXN0ZWQgdG8gYWxpZ24gdGhlIHNlbGVjdGVkIG9wdGlvbiB0ZXh0IG92ZXIgdGhlIHRyaWdnZXIgdGV4dC5cbiAgICAgKiB3aGVuIHRoZSBwYW5lbCBvcGVucy4gV2lsbCBjaGFuZ2UgYmFzZWQgb24gdGhlIHktcG9zaXRpb24gb2YgdGhlIHNlbGVjdGVkIG9wdGlvbi5cbiAgICAgKi9cbiAgICBvZmZzZXRZID0gMDtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgcG9zaXRpb24gY29uZmlnIGVuc3VyZXMgdGhhdCB0aGUgdG9wIFwic3RhcnRcIiBjb3JuZXIgb2YgdGhlIG92ZXJsYXlcbiAgICAgKiBpcyBhbGlnbmVkIHdpdGggd2l0aCB0aGUgdG9wIFwic3RhcnRcIiBvZiB0aGUgb3JpZ2luIGJ5IGRlZmF1bHQgKG92ZXJsYXBwaW5nXG4gICAgICogdGhlIHRyaWdnZXIgY29tcGxldGVseSkuIElmIHRoZSBwYW5lbCBjYW5ub3QgZml0IGJlbG93IHRoZSB0cmlnZ2VyLCBpdFxuICAgICAqIHdpbGwgZmFsbCBiYWNrIHRvIGEgcG9zaXRpb24gYWJvdmUgdGhlIHRyaWdnZXIuXG4gICAgICovXG4gICAgcG9zaXRpb25zID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXG4gICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgIG92ZXJsYXlZOiAndG9wJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJ1xuICAgICAgICB9XG4gICAgXTtcblxuICAgIG9wdGlvbnM6IFF1ZXJ5TGlzdDxNY1RyZWVPcHRpb24+O1xuXG4gICAgQFZpZXdDaGlsZCgndHJpZ2dlcicsIHsgc3RhdGljOiBmYWxzZSB9KSB0cmlnZ2VyOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgncGFuZWwnLCB7IHN0YXRpYzogZmFsc2UgfSkgcGFuZWw6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKENka0Nvbm5lY3RlZE92ZXJsYXksIHsgc3RhdGljOiBmYWxzZSB9KSBvdmVybGF5RGlyOiBDZGtDb25uZWN0ZWRPdmVybGF5O1xuXG4gICAgQFZpZXdDaGlsZCgnaGlkZGVuSXRlbXNDb3VudGVyJywgeyBzdGF0aWM6IGZhbHNlIH0pIGhpZGRlbkl0ZW1zQ291bnRlcjogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGRyZW4oTWNUYWcpIHRhZ3M6IFF1ZXJ5TGlzdDxNY1RhZz47XG5cbiAgICBAQ29udGVudENoaWxkKCdtY1NlbGVjdENsZWFuZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBjbGVhbmVyOiBNY0NsZWFuZXI7XG5cbiAgICAvKiogVXNlci1zdXBwbGllZCBvdmVycmlkZSBvZiB0aGUgdHJpZ2dlciBlbGVtZW50LiAqL1xuICAgIEBDb250ZW50Q2hpbGQoTWNUcmVlU2VsZWN0VHJpZ2dlciwgeyBzdGF0aWM6IGZhbHNlIH0pIGN1c3RvbVRyaWdnZXI6IE1jVHJlZVNlbGVjdFRyaWdnZXI7XG5cbiAgICBAQ29udGVudENoaWxkKE1jVHJlZVNlbGVjdGlvbiwgeyBzdGF0aWM6IGZhbHNlIH0pIHRyZWU6IE1jVHJlZVNlbGVjdGlvbjxNY1RyZWVPcHRpb24+O1xuXG4gICAgQElucHV0KCkgaGlkZGVuSXRlbXNUZXh0OiBzdHJpbmcgPSAnLi4u0LXRidGRJztcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCBwYW5lbCBoYXMgYmVlbiB0b2dnbGVkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBvcGVuZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCBoYXMgYmVlbiBvcGVuZWQuICovXG4gICAgQE91dHB1dCgnb3BlbmVkJykgcmVhZG9ubHkgb3BlbmVkU3RyZWFtOiBPYnNlcnZhYmxlPHZvaWQ+ID1cbiAgICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UucGlwZShmaWx0ZXIoKG8pID0+IG8pLCBtYXAoKCkgPT4ge30pKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCBoYXMgYmVlbiBjbG9zZWQuICovXG4gICAgQE91dHB1dCgnY2xvc2VkJykgcmVhZG9ubHkgY2xvc2VkU3RyZWFtOiBPYnNlcnZhYmxlPHZvaWQ+ID1cbiAgICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UucGlwZShmaWx0ZXIoKG8pID0+ICFvKSwgbWFwKCgpID0+IHt9KSk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3RlZCB2YWx1ZSBoYXMgYmVlbiBjaGFuZ2VkIGJ5IHRoZSB1c2VyLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3Rpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE1jVHJlZVNlbGVjdENoYW5nZT4oKTtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IHRoYXQgZW1pdHMgd2hlbmV2ZXIgdGhlIHJhdyB2YWx1ZSBvZiB0aGUgc2VsZWN0IGNoYW5nZXMuIFRoaXMgaXMgaGVyZSBwcmltYXJpbHlcbiAgICAgKiB0byBmYWNpbGl0YXRlIHRoZSB0d28td2F5IGJpbmRpbmcgZm9yIHRoZSBgdmFsdWVgIGlucHV0LlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICAvKiogQ2xhc3NlcyB0byBiZSBwYXNzZWQgdG8gdGhlIHNlbGVjdCBwYW5lbC4gU3VwcG9ydHMgdGhlIHNhbWUgc3ludGF4IGFzIGBuZ0NsYXNzYC4gKi9cbiAgICBASW5wdXQoKSBwYW5lbENsYXNzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+IHwgeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcblxuICAgIEBJbnB1dCgpIGJhY2tkcm9wQ2xhc3M6IHN0cmluZyA9ICdjZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCc7XG5cbiAgICAvKiogT2JqZWN0IHVzZWQgdG8gY29udHJvbCB3aGVuIGVycm9yIG1lc3NhZ2VzIGFyZSBzaG93bi4gKi9cbiAgICBASW5wdXQoKSBlcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXI7XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB1c2VkIHRvIHNvcnQgdGhlIHZhbHVlcyBpbiBhIHNlbGVjdCBpbiBtdWx0aXBsZSBtb2RlLlxuICAgICAqIEZvbGxvd3MgdGhlIHNhbWUgbG9naWMgYXMgYEFycmF5LnByb3RvdHlwZS5zb3J0YC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBzb3J0Q29tcGFyYXRvcjogKGE6IE1jVHJlZU9wdGlvbiwgYjogTWNUcmVlT3B0aW9uLCBvcHRpb25zOiBNY1RyZWVPcHRpb25bXSkgPT4gbnVtYmVyO1xuXG4gICAgLyoqIENvbWJpbmVkIHN0cmVhbSBvZiBhbGwgb2YgdGhlIGNoaWxkIG9wdGlvbnMnIGNoYW5nZSBldmVudHMuICovXG4gICAgcmVhZG9ubHkgb3B0aW9uU2VsZWN0aW9uQ2hhbmdlczogT2JzZXJ2YWJsZTxNY1RyZWVTZWxlY3RDaGFuZ2U+ID0gZGVmZXIoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmNoYW5nZXMucGlwZShcbiAgICAgICAgICAgICAgICBzdGFydFdpdGgodGhpcy5vcHRpb25zKSxcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gbWVyZ2UoLi4udGhpcy5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiBvcHRpb24ub25TZWxlY3Rpb25DaGFuZ2UpKSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5uZ1pvbmUub25TdGFibGVcbiAgICAgICAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSwgc3dpdGNoTWFwKCgpID0+IHRoaXMub3B0aW9uU2VsZWN0aW9uQ2hhbmdlcykpO1xuICAgIH0pIGFzIE9ic2VydmFibGU8TWNUcmVlU2VsZWN0Q2hhbmdlPjtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wbGFjZWhvbGRlcjtcbiAgICB9XG5cbiAgICBzZXQgcGxhY2Vob2xkZXIodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHZhbHVlO1xuXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9wbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXF1aXJlZDtcbiAgICB9XG5cbiAgICBzZXQgcmVxdWlyZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fcmVxdWlyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tdWx0aXBsZTtcbiAgICB9XG5cbiAgICBzZXQgbXVsdGlwbGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZWwpIHtcbiAgICAgICAgICAgIHRocm93IGdldE1jU2VsZWN0RHluYW1pY011bHRpcGxlRXJyb3IoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX211bHRpcGxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tdWx0aXBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgYXV0b1NlbGVjdCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2F1dG9TZWxlY3Q7XG4gICAgfVxuXG4gICAgc2V0IGF1dG9TZWxlY3QodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fYXV0b1NlbGVjdCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYXV0b1NlbGVjdDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBjb21wYXJlIHRoZSBvcHRpb24gdmFsdWVzIHdpdGggdGhlIHNlbGVjdGVkIHZhbHVlcy4gVGhlIGZpcnN0IGFyZ3VtZW50XG4gICAgICogaXMgYSB2YWx1ZSBmcm9tIGFuIG9wdGlvbi4gVGhlIHNlY29uZCBpcyBhIHZhbHVlIGZyb20gdGhlIHNlbGVjdGlvbi4gQSBib29sZWFuXG4gICAgICogc2hvdWxkIGJlIHJldHVybmVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGNvbXBhcmVXaXRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29tcGFyZVdpdGg7XG4gICAgfVxuXG4gICAgc2V0IGNvbXBhcmVXaXRoKGZuOiAobzE6IGFueSwgbzI6IGFueSkgPT4gYm9vbGVhbikge1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6c3RyaWN0LXR5cGUtcHJlZGljYXRlcyAqL1xuICAgICAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRNY1NlbGVjdE5vbkZ1bmN0aW9uVmFsdWVFcnJvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY29tcGFyZVdpdGggPSBmbjtcblxuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlbCkge1xuICAgICAgICAgICAgLy8gQSBkaWZmZXJlbnQgY29tcGFyYXRvciBtZWFucyB0aGUgc2VsZWN0aW9uIGNvdWxkIGNoYW5nZS5cbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNlbGVjdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlID8gdGhpcy50cmVlLmdldFNlbGVjdGVkVmFsdWVzKCkgOiB0aGlzLnRyZWUuZ2V0U2VsZWN0ZWRWYWx1ZXMoKVswXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF92YWx1ZTogYW55ID0gbnVsbDtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG5cbiAgICBzZXQgaWQodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9pZCA9IHZhbHVlIHx8IHRoaXMudWlkO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGhhc0JhY2tkcm9wKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faGFzQmFja2Ryb3A7XG4gICAgfVxuXG4gICAgc2V0IGhhc0JhY2tkcm9wKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2hhc0JhY2tkcm9wID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9oYXNCYWNrZHJvcDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHNlbGVjdCBpcyBmb2N1c2VkLiAqL1xuICAgIGdldCBmb2N1c2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZm9jdXNlZCB8fCB0aGlzLl9wYW5lbE9wZW47XG4gICAgfVxuXG4gICAgc2V0IGZvY3VzZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZm9jdXNlZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZvY3VzZWQgPSBmYWxzZTtcblxuICAgIGdldCBwYW5lbE9wZW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYW5lbE9wZW47XG4gICAgfVxuXG4gICAgZ2V0IGNhblNob3dDbGVhbmVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jbGVhbmVyICYmIHRoaXMuc2VsZWN0aW9uTW9kZWwuaGFzVmFsdWUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNsb3NlU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgcHJpdmF0ZSBfcGFuZWxPcGVuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIG9yaWdpbmFsT25LZXlEb3duOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHZvaWQ7XG5cbiAgICAvKiogVGhlIHNjcm9sbCBwb3NpdGlvbiBvZiB0aGUgb3ZlcmxheSBwYW5lbCwgY2FsY3VsYXRlZCB0byBjZW50ZXIgdGhlIHNlbGVjdGVkIG9wdGlvbi4gKi9cbiAgICBwcml2YXRlIHNjcm9sbFRvcCA9IDA7XG5cbiAgICAvKiogVW5pcXVlIGlkIGZvciB0aGlzIGlucHV0LiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgdWlkID0gYG1jLXNlbGVjdC0ke25leHRVbmlxdWVJZCsrfWA7XG5cbiAgICAvKiogRW1pdHMgd2hlbmV2ZXIgdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8vIFVzZWQgZm9yIHN0b3JpbmcgdGhlIHZhbHVlcyB0aGF0IHdlcmUgYXNzaWduZWQgYmVmb3JlIHRoZSBvcHRpb25zIHdlcmUgaW5pdGlhbGl6ZWQuXG4gICAgcHJpdmF0ZSB0ZW1wVmFsdWVzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcmVhZG9ubHkgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHZpZXdwb3J0UnVsZXI6IFZpZXdwb3J0UnVsZXIsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICAgICAgQEluamVjdChNQ19TRUxFQ1RfU0NST0xMX1NUUkFURUdZKSBwcml2YXRlIHJlYWRvbmx5IHNjcm9sbFN0cmF0ZWd5RmFjdG9yeSxcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChOR19WQUxJREFUT1JTKSBwdWJsaWMgcmF3VmFsaWRhdG9yczogVmFsaWRhdG9yW10sXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfVkFMSURBVElPTikgcHJpdmF0ZSBtY1ZhbGlkYXRpb246IE1jVmFsaWRhdGlvbk9wdGlvbnMsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcmVhZG9ubHkgZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcGFyZW50Rm9ybTogTmdGb3JtLFxuICAgICAgICBAT3B0aW9uYWwoKSBwYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByZWFkb25seSBwYXJlbnRGb3JtRmllbGQ6IE1jRm9ybUZpZWxkLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIG5nQ29udHJvbDogTmdDb250cm9sLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHB1YmxpYyBuZ01vZGVsOiBOZ01vZGVsLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHB1YmxpYyBmb3JtQ29udHJvbE5hbWU6IEZvcm1Db250cm9sTmFtZVxuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmLCBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXIsIHBhcmVudEZvcm0sIHBhcmVudEZvcm1Hcm91cCwgbmdDb250cm9sKTtcblxuICAgICAgICBpZiAodGhpcy5uZ0NvbnRyb2wpIHtcbiAgICAgICAgICAgIC8vIE5vdGU6IHdlIHByb3ZpZGUgdGhlIHZhbHVlIGFjY2Vzc29yIHRocm91Z2ggaGVyZSwgaW5zdGVhZCBvZlxuICAgICAgICAgICAgLy8gdGhlIGBwcm92aWRlcnNgIHRvIGF2b2lkIHJ1bm5pbmcgaW50byBhIGNpcmN1bGFyIGltcG9ydC5cbiAgICAgICAgICAgIHRoaXMubmdDb250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRm9yY2Ugc2V0dGVyIHRvIGJlIGNhbGxlZCBpbiBjYXNlIGlkIHdhcyBub3Qgc3BlY2lmaWVkLlxuICAgICAgICB0aGlzLmlkID0gdGhpcy5pZDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuXG4gICAgICAgIC8vIFdlIG5lZWQgYGRpc3RpbmN0VW50aWxDaGFuZ2VkYCBoZXJlLCBiZWNhdXNlIHNvbWUgYnJvd3NlcnMgd2lsbFxuICAgICAgICAvLyBmaXJlIHRoZSBhbmltYXRpb24gZW5kIGV2ZW50IHR3aWNlIGZvciB0aGUgc2FtZSBhbmltYXRpb24uIFNlZTpcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMjQwODRcbiAgICAgICAgdGhpcy5wYW5lbERvbmVBbmltYXRpbmdTdHJlYW1cbiAgICAgICAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UuZW1pdCh0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5lZENoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5RGlyLm9mZnNldFggPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRyZWUpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKHRoaXMubWNWYWxpZGF0aW9uLnVzZVZhbGlkYXRpb24pIHtcbiAgICAgICAgICAgIHNldE1vc2FpY1ZhbGlkYXRpb24odGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyZWUucmVzZXRGb2N1c2VkSXRlbU9uQmx1ciA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwgPSB0aGlzLnRyZWUuc2VsZWN0aW9uTW9kZWwgPSBuZXcgU2VsZWN0aW9uTW9kZWw8YW55Pih0aGlzLm11bHRpcGxlKTtcbiAgICAgICAgdGhpcy50cmVlLm5nQWZ0ZXJDb250ZW50SW5pdCgpO1xuXG4gICAgICAgIHRoaXMuaW5pdEtleU1hbmFnZXIoKTtcblxuICAgICAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLnRyZWUucmVuZGVyZWRPcHRpb25zO1xuICAgICAgICB0aGlzLnRyZWUuYXV0b1NlbGVjdCA9IHRoaXMuYXV0b1NlbGVjdDtcblxuICAgICAgICBpZiAodGhpcy50cmVlLm11bHRpcGxlTW9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy50cmVlLm11bHRpcGxlTW9kZSA9IHRoaXMubXVsdGlwbGUgPyBNdWx0aXBsZU1vZGUuQ0hFQ0tCT1ggOiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRoaXMudHJlZS5ub1Vuc2VsZWN0TGFzdCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudGVtcFZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25CeVZhbHVlKHRoaXMudGVtcFZhbHVlcyk7XG4gICAgICAgICAgICB0aGlzLnRlbXBWYWx1ZXMgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vcHRpb25TZWxlY3Rpb25DaGFuZ2VzXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlICYmIHRoaXMucGFuZWxPcGVuICYmIGV2ZW50LmlzVXNlcklucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRyZWUuc2VsZWN0aW9uQ2hhbmdlXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnNlbGVjdGVkVmFsdWVzKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQobmV3IE1jVHJlZVNlbGVjdENoYW5nZSh0aGlzLCBldmVudC5vcHRpb24pKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuY2hhbmdlZFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5hZGRlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmtleU1hbmFnZXIuc2V0Rm9jdXNPcmlnaW4oJ3Byb2dyYW0nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5maW5kKChvcHRpb24pID0+IG9wdGlvbi5kYXRhID09PSBldmVudC5hZGRlZFswXSkgYXMgYW55XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMudHJlZSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnRhZ3MuY2hhbmdlc1xuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNhbGN1bGF0ZUhpZGRlbkl0ZW1zKCksIDApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNhbGN1bGF0ZUhpZGRlbkl0ZW1zKCksIDApO1xuICAgIH1cblxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgaWYgKHRoaXMubmdDb250cm9sKSB7IHRoaXMudXBkYXRlRXJyb3JTdGF0ZSgpOyB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICAvLyBVcGRhdGluZyB0aGUgZGlzYWJsZWQgc3RhdGUgaXMgaGFuZGxlZCBieSBgbWl4aW5EaXNhYmxlZGAsIGJ1dCB3ZSBuZWVkIHRvIGFkZGl0aW9uYWxseSBsZXRcbiAgICAgICAgLy8gdGhlIHBhcmVudCBmb3JtIGZpZWxkIGtub3cgdG8gcnVuIGNoYW5nZSBkZXRlY3Rpb24gd2hlbiB0aGUgZGlzYWJsZWQgc3RhdGUgY2hhbmdlcy5cbiAgICAgICAgaWYgKGNoYW5nZXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLmRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMuY29tcGxldGUoKTtcbiAgICAgICAgdGhpcy5jbG9zZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgaGlkZGVuSXRlbXNUZXh0Rm9ybWF0dGVyKGhpZGRlbkl0ZW1zVGV4dDogc3RyaW5nLCBoaWRkZW5JdGVtczogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke2hpZGRlbkl0ZW1zVGV4dH0gJHtoaWRkZW5JdGVtc31gO1xuICAgIH1cblxuICAgIGNsZWFyVmFsdWUoJGV2ZW50KTogdm9pZCB7XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oLTEpO1xuXG4gICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uQnlWYWx1ZShbXSk7XG5cbiAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnNlbGVjdGVkVmFsdWVzKTtcbiAgICB9XG5cbiAgICAvKiogYFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gdmFsdWUgY2hhbmdlc2AgKi9cbiAgICBvbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAgIC8qKiBgVmlldyAtPiBtb2RlbCBjYWxsYmFjayBjYWxsZWQgd2hlbiBzZWxlY3QgaGFzIGJlZW4gdG91Y2hlZGAgKi9cbiAgICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICAgIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wZW4oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICF0aGlzLm9wdGlvbnMgfHwgIXRoaXMub3B0aW9ucy5sZW5ndGggfHwgdGhpcy5fcGFuZWxPcGVuKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMudHJpZ2dlclJlY3QgPSB0aGlzLnRyaWdnZXIubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgLy8gTm90ZTogVGhlIGNvbXB1dGVkIGZvbnQtc2l6ZSB3aWxsIGJlIGEgc3RyaW5nIHBpeGVsIHZhbHVlIChlLmcuIFwiMTZweFwiKS5cbiAgICAgICAgLy8gYHBhcnNlSW50YCBpZ25vcmVzIHRoZSB0cmFpbGluZyAncHgnIGFuZCBjb252ZXJ0cyB0aGlzIHRvIGEgbnVtYmVyLlxuICAgICAgICB0aGlzLnRyaWdnZXJGb250U2l6ZSA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUodGhpcy50cmlnZ2VyLm5hdGl2ZUVsZW1lbnQpWydmb250LXNpemUnXSk7XG5cbiAgICAgICAgdGhpcy5fcGFuZWxPcGVuID0gdHJ1ZTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlnaGxpZ2h0Q29ycmVjdE9wdGlvbigpKTtcblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICAgIC8vIFNldCB0aGUgZm9udCBzaXplIG9uIHRoZSBwYW5lbCBlbGVtZW50IG9uY2UgaXQgZXhpc3RzLlxuICAgICAgICB0aGlzLm5nWm9uZS5vblN0YWJsZS5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWdnZXJGb250U2l6ZSAmJiB0aGlzLm92ZXJsYXlEaXIub3ZlcmxheVJlZiAmJiB0aGlzLm92ZXJsYXlEaXIub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlEaXIub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IGAke3RoaXMudHJpZ2dlckZvbnRTaXplfXB4YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogQ2xvc2VzIHRoZSBvdmVybGF5IHBhbmVsIGFuZCBmb2N1c2VzIHRoZSBob3N0IGVsZW1lbnQuICovXG4gICAgY2xvc2UoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fcGFuZWxPcGVuKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuX3BhbmVsT3BlbiA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmZvY3VzKCksIDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHNlbGVjdCdzIHZhbHVlLiBQYXJ0IG9mIHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgICAgKiByZXF1aXJlZCB0byBpbnRlZ3JhdGUgd2l0aCBBbmd1bGFyJ3MgY29yZSBmb3JtcyBBUEkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWUgTmV3IHZhbHVlIHRvIGJlIHdyaXR0ZW4gdG8gdGhlIG1vZGVsLlxuICAgICAqL1xuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50cmVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvbkJ5VmFsdWUodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50ZW1wVmFsdWVzID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTYXZlcyBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgd2hlbiB0aGUgc2VsZWN0J3MgdmFsdWVcbiAgICAgKiBjaGFuZ2VzIGZyb20gdXNlciBpbnB1dC4gUGFydCBvZiB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gICAgICogcmVxdWlyZWQgdG8gaW50ZWdyYXRlIHdpdGggQW5ndWxhcidzIGNvcmUgZm9ybXMgQVBJLlxuICAgICAqXG4gICAgICogQHBhcmFtIGZuIENhbGxiYWNrIHRvIGJlIHRyaWdnZXJlZCB3aGVuIHRoZSB2YWx1ZSBjaGFuZ2VzLlxuICAgICAqL1xuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTYXZlcyBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgd2hlbiB0aGUgc2VsZWN0IGlzIGJsdXJyZWRcbiAgICAgKiBieSB0aGUgdXNlci4gUGFydCBvZiB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlIHJlcXVpcmVkXG4gICAgICogdG8gaW50ZWdyYXRlIHdpdGggQW5ndWxhcidzIGNvcmUgZm9ybXMgQVBJLlxuICAgICAqXG4gICAgICogQHBhcmFtIGZuIENhbGxiYWNrIHRvIGJlIHRyaWdnZXJlZCB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gdG91Y2hlZC5cbiAgICAgKi9cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNhYmxlcyB0aGUgc2VsZWN0LiBQYXJ0IG9mIHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2UgcmVxdWlyZWRcbiAgICAgKiB0byBpbnRlZ3JhdGUgd2l0aCBBbmd1bGFyJ3MgY29yZSBmb3JtcyBBUEkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaXNEaXNhYmxlZCBTZXRzIHdoZXRoZXIgdGhlIGNvbXBvbmVudCBpcyBkaXNhYmxlZC5cbiAgICAgKi9cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWQoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGUgPyB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdGVkIDogdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZFswXTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWRWYWx1ZXMoKTogYW55IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZXMgPSB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdGVkLm1hcCgodmFsdWUpID0+IHRoaXMudHJlZS50cmVlQ29udHJvbC5nZXRWYWx1ZSh2YWx1ZSkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlID8gc2VsZWN0ZWRWYWx1ZXMgOiBzZWxlY3RlZFZhbHVlc1swXTtcbiAgICB9XG5cbiAgICBnZXQgdHJpZ2dlclZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLmVtcHR5KSB7IHJldHVybiAnJzsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZ2V0Vmlld1ZhbHVlKHRoaXMuc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIGdldCB0cmlnZ2VyVmFsdWVzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgaWYgKHRoaXMuZW1wdHkpIHsgcmV0dXJuIFtdOyB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuc2VsZWN0aW9uTW9kZWwgfHwgdGhpcy5zZWxlY3Rpb25Nb2RlbC5pc0VtcHR5KCk7XG4gICAgfVxuXG4gICAgaXNSdGwoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpciA/IHRoaXMuZGlyLnZhbHVlID09PSAncnRsJyA6IGZhbHNlO1xuICAgIH1cblxuICAgIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU9wZW5LZXlkb3duKGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDbG9zZWRLZXlkb3duKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRm9jdXMoKSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fZm9jdXNlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxzIHRoZSB0b3VjaGVkIGNhbGxiYWNrIG9ubHkgaWYgdGhlIHBhbmVsIGlzIGNsb3NlZC4gT3RoZXJ3aXNlLCB0aGUgdHJpZ2dlciB3aWxsXG4gICAgICogXCJibHVyXCIgdG8gdGhlIHBhbmVsIHdoZW4gaXQgb3BlbnMsIGNhdXNpbmcgYSBmYWxzZSBwb3NpdGl2ZS5cbiAgICAgKi9cbiAgICBvbkJsdXIoKSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgIXRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBDYWxsYmFjayB0aGF0IGlzIGludm9rZWQgd2hlbiB0aGUgb3ZlcmxheSBwYW5lbCBoYXMgYmVlbiBhdHRhY2hlZC4gKi9cbiAgICBvbkF0dGFjaGVkKCkge1xuICAgICAgICB0aGlzLm92ZXJsYXlEaXIucG9zaXRpb25DaGFuZ2VcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZU92ZXJsYXlPZmZzZXRYKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYW5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IHRoaXMuc2Nyb2xsVG9wO1xuXG4gICAgICAgICAgICAgICAgdGhpcy50cmVlLnVwZGF0ZVNjcm9sbFNpemUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2xvc2VTdWJzY3JpcHRpb24gPSB0aGlzLmNsb3NpbmdBY3Rpb25zKClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyB0aGUgdGhlbWUgdG8gYmUgdXNlZCBvbiB0aGUgcGFuZWwuICovXG4gICAgZ2V0UGFuZWxUaGVtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRGb3JtRmllbGQgPyBgbWMtJHt0aGlzLnBhcmVudEZvcm1GaWVsZC5jb2xvcn1gIDogJyc7XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uQ29udGFpbmVyQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvKiogSW52b2tlZCB3aGVuIGFuIG9wdGlvbiBpcyBjbGlja2VkLiAqL1xuICAgIG9uUmVtb3ZlU2VsZWN0ZWRPcHRpb24oc2VsZWN0ZWRPcHRpb246IGFueSwgJGV2ZW50KSB7XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmRlc2VsZWN0KHNlbGVjdGVkT3B0aW9uKTtcblxuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuc2VsZWN0ZWRWYWx1ZXMpO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZUhpZGRlbkl0ZW1zKCkge1xuICAgICAgICBpZiAodGhpcy5jdXN0b21UcmlnZ2VyIHx8IHRoaXMuZW1wdHkgfHwgIXRoaXMubXVsdGlwbGUpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgbGV0IHZpc2libGVJdGVtczogbnVtYmVyID0gMDtcbiAgICAgICAgY29uc3QgdG90YWxJdGVtc1dpZHRoID0gdGhpcy5nZXRUb3RhbEl0ZW1zV2lkdGhJbk1hdGNoZXIoKTtcbiAgICAgICAgbGV0IHRvdGFsVmlzaWJsZUl0ZW1zV2lkdGg6IG51bWJlciA9IDA7XG5cbiAgICAgICAgdGhpcy50YWdzLmZvckVhY2goKHRhZykgPT4ge1xuICAgICAgICAgICAgaWYgKHRhZy5uYXRpdmVFbGVtZW50Lm9mZnNldFRvcCA8IHRhZy5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCkge1xuICAgICAgICAgICAgICAgIHRvdGFsVmlzaWJsZUl0ZW1zV2lkdGggKz0gdGhpcy5nZXRJdGVtV2lkdGgodGFnLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHZpc2libGVJdGVtcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmhpZGRlbkl0ZW1zID0gdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZC5sZW5ndGggLSB2aXNpYmxlSXRlbXM7XG5cbiAgICAgICAgaWYgKHRoaXMuaGlkZGVuSXRlbXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zQ291bnRlciA9IHRoaXMudHJpZ2dlci5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYy10cmVlLXNlbGVjdF9fbWF0Y2gtaGlkZGVuLXRleHQnKTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXJMaXN0ID0gdGhpcy50cmlnZ2VyLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1jLXRyZWUtc2VsZWN0X19tYXRjaC1saXN0Jyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zQ291bnRlclNob3dlZCA9IGl0ZW1zQ291bnRlci5vZmZzZXRUb3AgPCBpdGVtc0NvdW50ZXIub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgLy8gY29uc3QgaXRlbXNDb3VudGVyV2lkdGg6IG51bWJlciA9IGl0ZW1zQ291bnRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zQ291bnRlcldpZHRoOiBudW1iZXIgPSA4NjtcblxuICAgICAgICAgICAgY29uc3QgbWF0Y2hlckxpc3RXaWR0aDogbnVtYmVyID0gbWF0Y2hlckxpc3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVyV2lkdGg6IG51bWJlciA9IG1hdGNoZXJMaXN0V2lkdGggKyBpdGVtc0NvdW50ZXJXaWR0aDtcblxuICAgICAgICAgICAgaWYgKGl0ZW1zQ291bnRlclNob3dlZCAmJiAodG90YWxJdGVtc1dpZHRoIDwgbWF0Y2hlcldpZHRoKSkgeyB0aGlzLmhpZGRlbkl0ZW1zID0gMDsgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdG90YWxWaXNpYmxlSXRlbXNXaWR0aCA9PT0gbWF0Y2hlckxpc3RXaWR0aCB8fFxuICAgICAgICAgICAgICAgICh0b3RhbFZpc2libGVJdGVtc1dpZHRoICsgaXRlbXNDb3VudGVyV2lkdGgpIDwgbWF0Y2hlckxpc3RXaWR0aFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFpdGVtc0NvdW50ZXJTaG93ZWQgJiYgKHRvdGFsSXRlbXNXaWR0aCArIGl0ZW1zQ291bnRlcldpZHRoKSA+IG1hdGNoZXJXaWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZGVuSXRlbXMrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbG9zaW5nQWN0aW9ucygpIHtcbiAgICAgICAgY29uc3QgYmFja2Ryb3AgPSB0aGlzLm92ZXJsYXlEaXIub3ZlcmxheVJlZiEuYmFja2Ryb3BDbGljaygpO1xuICAgICAgICBjb25zdCBvdXRzaWRlUG9pbnRlckV2ZW50cyA9IHRoaXMub3ZlcmxheURpci5vdmVybGF5UmVmIS5vdXRzaWRlUG9pbnRlckV2ZW50cygpO1xuICAgICAgICBjb25zdCBkZXRhY2htZW50cyA9IHRoaXMub3ZlcmxheURpci5vdmVybGF5UmVmIS5kZXRhY2htZW50cygpO1xuXG4gICAgICAgIHJldHVybiBtZXJnZShiYWNrZHJvcCwgb3V0c2lkZVBvaW50ZXJFdmVudHMsIGRldGFjaG1lbnRzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRvdGFsSXRlbXNXaWR0aEluTWF0Y2hlcigpOiBudW1iZXIge1xuICAgICAgICBjb25zdCB0cmlnZ2VyQ2xvbmUgPSB0aGlzLnRyaWdnZXIubmF0aXZlRWxlbWVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIHRyaWdnZXJDbG9uZS5xdWVyeVNlbGVjdG9yKCcubWMtdHJlZS1zZWxlY3RfX21hdGNoLWhpZGRlbi10ZXh0JykucmVtb3ZlKCk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0cmlnZ2VyQ2xvbmUsICdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRyaWdnZXJDbG9uZSwgJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodHJpZ2dlckNsb25lLCAndG9wJywgJy0xMDAlJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodHJpZ2dlckNsb25lLCAnbGVmdCcsICcwJyk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLnRyaWdnZXIubmF0aXZlRWxlbWVudCwgdHJpZ2dlckNsb25lKTtcblxuICAgICAgICBsZXQgdG90YWxJdGVtc1dpZHRoOiBudW1iZXIgPSAwO1xuICAgICAgICB0cmlnZ2VyQ2xvbmUucXVlcnlTZWxlY3RvckFsbCgnbWMtdGFnJykuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdG90YWxJdGVtc1dpZHRoICs9IHRoaXMuZ2V0SXRlbVdpZHRoKGl0ZW0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0cmlnZ2VyQ2xvbmUucmVtb3ZlKCk7XG5cbiAgICAgICAgcmV0dXJuIHRvdGFsSXRlbXNXaWR0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEl0ZW1XaWR0aChlbGVtZW50OiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcblxuICAgICAgICBjb25zdCB3aWR0aDogbnVtYmVyID0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS53aWR0aCBhcyBzdHJpbmcpO1xuICAgICAgICBjb25zdCBtYXJnaW5MZWZ0OiBudW1iZXIgPSBwYXJzZUludChjb21wdXRlZFN0eWxlLm1hcmdpbkxlZnQgYXMgc3RyaW5nKTtcbiAgICAgICAgY29uc3QgbWFyZ2luUmlnaHQ6IG51bWJlciA9IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUubWFyZ2luUmlnaHQgYXMgc3RyaW5nKTtcblxuICAgICAgICByZXR1cm4gd2lkdGggKyBtYXJnaW5MZWZ0ICsgbWFyZ2luUmlnaHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVDbG9zZWRLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG4gICAgICAgIGNvbnN0IGlzQXJyb3dLZXkgPSBrZXlDb2RlID09PSBET1dOX0FSUk9XIHx8IGtleUNvZGUgPT09IFVQX0FSUk9XIHx8XG4gICAgICAgICAgICBrZXlDb2RlID09PSBMRUZUX0FSUk9XIHx8IGtleUNvZGUgPT09IFJJR0hUX0FSUk9XO1xuICAgICAgICBjb25zdCBpc09wZW5LZXkgPSBrZXlDb2RlID09PSBFTlRFUiB8fCBrZXlDb2RlID09PSBTUEFDRTtcblxuICAgICAgICAvLyBPcGVuIHRoZSBzZWxlY3Qgb24gQUxUICsgYXJyb3cga2V5IHRvIG1hdGNoIHRoZSBuYXRpdmUgPHNlbGVjdD5cbiAgICAgICAgaWYgKGlzT3BlbktleSB8fCAoKHRoaXMubXVsdGlwbGUgfHwgZXZlbnQuYWx0S2V5KSAmJiBpc0Fycm93S2V5KSkge1xuICAgICAgICAgICAgLy8gcHJldmVudHMgdGhlIHBhZ2UgZnJvbSBzY3JvbGxpbmcgZG93biB3aGVuIHByZXNzaW5nIHNwYWNlXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5tdWx0aXBsZSAmJiB0aGlzLnRyZWUua2V5TWFuYWdlciAmJiB0aGlzLnRyZWUua2V5TWFuYWdlci5vbktleWRvd24pIHtcbiAgICAgICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZU9wZW5LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSAqL1xuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcbiAgICAgICAgY29uc3QgaXNBcnJvd0tleSA9IGtleUNvZGUgPT09IERPV05fQVJST1cgfHwga2V5Q29kZSA9PT0gVVBfQVJST1c7XG5cbiAgICAgICAgaWYgKGlzQXJyb3dLZXkgJiYgZXZlbnQuYWx0S2V5KSB7XG4gICAgICAgICAgICAvLyBDbG9zZSB0aGUgc2VsZWN0IG9uIEFMVCArIGFycm93IGtleSB0byBtYXRjaCB0aGUgbmF0aXZlIDxzZWxlY3Q+XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gTEVGVF9BUlJPVyB8fCBrZXlDb2RlID09PSBSSUdIVF9BUlJPVykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3JpZ2luYWxPbktleURvd24uY2FsbCh0aGlzLnRyZWUsIGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBIT01FKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLnRyZWUua2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBFTkQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLnNldExhc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gUEFHRV9VUCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy50cmVlLmtleU1hbmFnZXIuc2V0UHJldmlvdXNQYWdlSXRlbUFjdGl2ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFBBR0VfRE9XTikge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy50cmVlLmtleU1hbmFnZXIuc2V0TmV4dFBhZ2VJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoKGtleUNvZGUgPT09IEVOVEVSIHx8IGtleUNvZGUgPT09IFNQQUNFKSAmJiB0aGlzLnRyZWUua2V5TWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXV0b1NlbGVjdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwudG9nZ2xlKHRoaXMudHJlZS5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0uZGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm11bHRpcGxlICYmIGtleUNvZGUgPT09IEEgJiYgZXZlbnQuY3RybEtleSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgY29uc3QgaGFzRGVzZWxlY3RlZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiAhb3B0aW9uLnNlbGVjdGVkKTtcblxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChoYXNEZXNlbGVjdGVkT3B0aW9ucyAmJiAhb3B0aW9uLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3QoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb24uZGVzZWxlY3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzbHlGb2N1c2VkSW5kZXggPSB0aGlzLnRyZWUua2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXg7XG5cbiAgICAgICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLnNldEZvY3VzT3JpZ2luKCdrZXlib2FyZCcpO1xuICAgICAgICAgICAgdGhpcy50cmVlLmtleU1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRoaXMubXVsdGlwbGUgJiYgaXNBcnJvd0tleSAmJiBldmVudC5zaGlmdEtleSAmJiB0aGlzLnRyZWUua2V5TWFuYWdlci5hY3RpdmVJdGVtICYmXG4gICAgICAgICAgICAgICAgdGhpcy50cmVlLmtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ICE9PSBwcmV2aW91c2x5Rm9jdXNlZEluZGV4XG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWUua2V5TWFuYWdlci5hY3RpdmVJdGVtLnNlbGVjdFZpYUludGVyYWN0aW9uKGV2ZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1NlbGVjdCAmJiB0aGlzLnRyZWUua2V5TWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmVlLnNldFNlbGVjdGVkT3B0aW9uc0J5S2V5KFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUua2V5TWFuYWdlci5hY3RpdmVJdGVtLCBoYXNNb2RpZmllcktleShldmVudCwgJ3NoaWZ0S2V5JyksIGhhc01vZGlmaWVyS2V5KGV2ZW50LCAnY3RybEtleScpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZVNlbGVjdGlvbigpIHtcbiAgICAgICAgLy8gRGVmZXIgc2V0dGluZyB0aGUgdmFsdWUgaW4gb3JkZXIgdG8gYXZvaWQgdGhlIFwiRXhwcmVzc2lvblxuICAgICAgICAvLyBoYXMgY2hhbmdlZCBhZnRlciBpdCB3YXMgY2hlY2tlZFwiIGVycm9ycyBmcm9tIEFuZ3VsYXIuXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25CeVZhbHVlKHRoaXMubmdDb250cm9sID8gdGhpcy5uZ0NvbnRyb2wudmFsdWUgOiB0aGlzLl92YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHNlbGVjdGVkIG9wdGlvbiBiYXNlZCBvbiBhIHZhbHVlLiBJZiBubyBvcHRpb24gY2FuIGJlXG4gICAgICogZm91bmQgd2l0aCB0aGUgZGVzaWduYXRlZCB2YWx1ZSwgdGhlIHNlbGVjdCB0cmlnZ2VyIGlzIGNsZWFyZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRTZWxlY3Rpb25CeVZhbHVlKHZhbHVlOiBhbnkgfCBhbnlbXSkge1xuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkgeyB0aHJvdyBnZXRNY1NlbGVjdE5vbkFycmF5VmFsdWVFcnJvcigpOyB9XG5cbiAgICAgICAgICAgIHRoaXMudHJlZS5zZXRPcHRpb25zRnJvbVZhbHVlcyh2YWx1ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuc29ydFZhbHVlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50cmVlLnNldE9wdGlvbnNGcm9tVmFsdWVzKFt2YWx1ZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0S2V5TWFuYWdlcigpIHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbE9uS2V5RG93biA9IHRoaXMudHJlZS5vbktleURvd247XG5cbiAgICAgICAgdGhpcy50cmVlLm9uS2V5RG93biA9ICgpID0+IHt9O1xuXG4gICAgICAgIHRoaXMudHJlZS5rZXlNYW5hZ2VyLnRhYk91dFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBSZXN0b3JlIGZvY3VzIHRvIHRoZSB0cmlnZ2VyIGJlZm9yZSBjbG9zaW5nLiBFbnN1cmVzIHRoYXQgdGhlIGZvY3VzXG4gICAgICAgICAgICAgICAgLy8gcG9zaXRpb24gd29uJ3QgYmUgbG9zdCBpZiB0aGUgdXNlciBnb3QgZm9jdXMgaW50byB0aGUgb3ZlcmxheS5cbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50cmVlLmtleU1hbmFnZXIuY2hhbmdlXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wYW5lbE9wZW4gJiYgdGhpcy5wYW5lbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEFjdGl2ZU9wdGlvbkludG9WaWV3KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5fcGFuZWxPcGVuICYmICF0aGlzLm11bHRpcGxlICYmIHRoaXMudHJlZS5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmtleU1hbmFnZXIuYWN0aXZlSXRlbS5zZWxlY3RWaWFJbnRlcmFjdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBTb3J0cyB0aGUgc2VsZWN0ZWQgdmFsdWVzIGluIHRoZSBzZWxlY3RlZCBiYXNlZCBvbiB0aGVpciBvcmRlciBpbiB0aGUgcGFuZWwuICovXG4gICAgcHJpdmF0ZSBzb3J0VmFsdWVzKCkge1xuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucy50b0FycmF5KCk7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNvcnRDb21wYXJhdG9yID8gdGhpcy5zb3J0Q29tcGFyYXRvcihhLCBiLCBvcHRpb25zKSA6XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuaW5kZXhPZihhKSAtIG9wdGlvbnMuaW5kZXhPZihiKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWdobGlnaHRzIHRoZSBzZWxlY3RlZCBpdGVtLiBJZiBubyBvcHRpb24gaXMgc2VsZWN0ZWQsIGl0IHdpbGwgaGlnaGxpZ2h0XG4gICAgICogdGhlIGZpcnN0IGl0ZW0gaW5zdGVhZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGhpZ2hsaWdodENvcnJlY3RPcHRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmVtcHR5IHx8ICF0aGlzLnRyZWUua2V5TWFuYWdlcikgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBmaXJzdFNlbGVjdGVkVmFsdWUgPSB0aGlzLm11bHRpcGxlID8gdGhpcy5zZWxlY3RlZFZhbHVlc1swXSA6IHRoaXMuc2VsZWN0ZWRWYWx1ZXM7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSB0aGlzLm9wdGlvbnMuZmluZCgob3B0aW9uKSA9PiBvcHRpb24udmFsdWUgPT09IGZpcnN0U2VsZWN0ZWRWYWx1ZSk7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkT3B0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRyZWUua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKHNlbGVjdGVkT3B0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBTY3JvbGxzIHRoZSBhY3RpdmUgb3B0aW9uIGludG8gdmlldy4gKi9cbiAgICBwcml2YXRlIHNjcm9sbEFjdGl2ZU9wdGlvbkludG9WaWV3KCkge1xuICAgICAgICBjb25zdCBhY3RpdmVPcHRpb25JbmRleCA9IHRoaXMudHJlZS5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCB8fCAwO1xuXG4gICAgICAgIHRoaXMucGFuZWwubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSBnZXRPcHRpb25TY3JvbGxQb3NpdGlvbihcbiAgICAgICAgICAgIGFjdGl2ZU9wdGlvbkluZGV4LFxuICAgICAgICAgICAgdGhpcy50cmVlLmdldEl0ZW1IZWlnaHQoKSxcbiAgICAgICAgICAgIHRoaXMucGFuZWwubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICAgICAgICBTRUxFQ1RfUEFORUxfTUFYX0hFSUdIVFxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHgtb2Zmc2V0IG9mIHRoZSBvdmVybGF5IHBhbmVsIGluIHJlbGF0aW9uIHRvIHRoZSB0cmlnZ2VyJ3MgdG9wIHN0YXJ0IGNvcm5lci5cbiAgICAgKiBUaGlzIG11c3QgYmUgYWRqdXN0ZWQgdG8gYWxpZ24gdGhlIHNlbGVjdGVkIG9wdGlvbiB0ZXh0IG92ZXIgdGhlIHRyaWdnZXIgdGV4dCB3aGVuXG4gICAgICogdGhlIHBhbmVsIG9wZW5zLiBXaWxsIGNoYW5nZSBiYXNlZCBvbiBMVFIgb3IgUlRMIHRleHQgZGlyZWN0aW9uLiBOb3RlIHRoYXQgdGhlIG9mZnNldFxuICAgICAqIGNhbid0IGJlIGNhbGN1bGF0ZWQgdW50aWwgdGhlIHBhbmVsIGhhcyBiZWVuIGF0dGFjaGVkLCBiZWNhdXNlIHdlIG5lZWQgdG8ga25vdyB0aGVcbiAgICAgKiBjb250ZW50IHdpZHRoIGluIG9yZGVyIHRvIGNvbnN0cmFpbiB0aGUgcGFuZWwgd2l0aGluIHRoZSB2aWV3cG9ydC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbGN1bGF0ZU92ZXJsYXlPZmZzZXRYKCkge1xuICAgICAgICBjb25zdCBvdmVybGF5UmVjdCA9IHRoaXMub3ZlcmxheURpci5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCB2aWV3cG9ydFNpemUgPSB0aGlzLnZpZXdwb3J0UnVsZXIuZ2V0Vmlld3BvcnRTaXplKCk7XG4gICAgICAgIGNvbnN0IGlzUnRsID0gdGhpcy5pc1J0bCgpO1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbWFnaWMtbnVtYmVycyAqL1xuICAgICAgICBjb25zdCBwYWRkaW5nV2lkdGggPSBTRUxFQ1RfUEFORUxfUEFERElOR19YICogMjtcbiAgICAgICAgbGV0IG9mZnNldFg6IG51bWJlciA9IFNFTEVDVF9QQU5FTF9QQURESU5HX1g7XG5cbiAgICAgICAgLy8gSW52ZXJ0IHRoZSBvZmZzZXQgaW4gTFRSLlxuICAgICAgICBpZiAoIWlzUnRsKSB7IG9mZnNldFggKj0gLTE7IH1cblxuICAgICAgICAvLyBEZXRlcm1pbmUgaG93IG11Y2ggdGhlIHNlbGVjdCBvdmVyZmxvd3Mgb24gZWFjaCBzaWRlLlxuICAgICAgICBjb25zdCBsZWZ0T3ZlcmZsb3cgPSAwIC0gKG92ZXJsYXlSZWN0LmxlZnQgKyBvZmZzZXRYIC0gKGlzUnRsID8gcGFkZGluZ1dpZHRoIDogMCkpO1xuICAgICAgICBjb25zdCByaWdodE92ZXJmbG93ID0gb3ZlcmxheVJlY3QucmlnaHQgKyBvZmZzZXRYIC0gdmlld3BvcnRTaXplLndpZHRoXG4gICAgICAgICAgICArIChpc1J0bCA/IDAgOiBwYWRkaW5nV2lkdGgpO1xuXG4gICAgICAgIC8vIElmIHRoZSBlbGVtZW50IG92ZXJmbG93cyBvbiBlaXRoZXIgc2lkZSwgcmVkdWNlIHRoZSBvZmZzZXQgdG8gYWxsb3cgaXQgdG8gZml0LlxuICAgICAgICBpZiAobGVmdE92ZXJmbG93ID4gMCkge1xuICAgICAgICAgICAgb2Zmc2V0WCArPSBsZWZ0T3ZlcmZsb3cgKyBTRUxFQ1RfUEFORUxfVklFV1BPUlRfUEFERElORztcbiAgICAgICAgfSBlbHNlIGlmIChyaWdodE92ZXJmbG93ID4gMCkge1xuICAgICAgICAgICAgb2Zmc2V0WCAtPSByaWdodE92ZXJmbG93ICsgU0VMRUNUX1BBTkVMX1ZJRVdQT1JUX1BBRERJTkc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXQgdGhlIG9mZnNldCBkaXJlY3RseSBpbiBvcmRlciB0byBhdm9pZCBoYXZpbmcgdG8gZ28gdGhyb3VnaCBjaGFuZ2UgZGV0ZWN0aW9uIGFuZFxuICAgICAgICAvLyBwb3RlbnRpYWxseSB0cmlnZ2VyaW5nIFwiY2hhbmdlZCBhZnRlciBpdCB3YXMgY2hlY2tlZFwiIGVycm9ycy4gUm91bmQgdGhlIHZhbHVlIHRvIGF2b2lkXG4gICAgICAgIC8vIGJsdXJyeSBjb250ZW50IGluIHNvbWUgYnJvd3NlcnMuXG4gICAgICAgIHRoaXMub3ZlcmxheURpci5vZmZzZXRYID0gTWF0aC5yb3VuZChvZmZzZXRYKTtcbiAgICAgICAgdGhpcy5vdmVybGF5RGlyLm92ZXJsYXlSZWYudXBkYXRlUG9zaXRpb24oKTtcbiAgICB9XG5cbiAgICAvKiogQ29tcGFyaXNvbiBmdW5jdGlvbiB0byBzcGVjaWZ5IHdoaWNoIG9wdGlvbiBpcyBkaXNwbGF5ZWQuIERlZmF1bHRzIHRvIG9iamVjdCBlcXVhbGl0eS4gKi9cbiAgICBwcml2YXRlIF9jb21wYXJlV2l0aCA9IChvMTogYW55LCBvMjogYW55KSA9PiBvMSA9PT0gbzI7XG59XG4iXX0=