/**
 * @fileoverview added by tsickle
 * Generated from: select.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable:no-empty */
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkConnectedOverlay, ViewportRuler } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, Inject, Input, isDevMode, NgZone, Optional, Output, QueryList, Renderer2, Self, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormControlName, FormGroupDirective, NG_VALIDATORS, NgControl, NgForm, NgModel } from '@angular/forms';
import { ActiveDescendantKeyManager } from '@ptsecurity/cdk/a11y';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW, A, ESCAPE, PAGE_UP, PAGE_DOWN } from '@ptsecurity/cdk/keycodes';
import { countGroupLabelsBeforeOption, getOptionScrollPosition, ErrorStateMatcher, MC_OPTION_PARENT_COMPONENT, McOptgroup, McOption, mixinDisabled, mixinErrorState, mixinTabIndex, mcSelectAnimations, SELECT_PANEL_INDENT_PADDING_X, SELECT_PANEL_MAX_HEIGHT, SELECT_PANEL_PADDING_X, SELECT_PANEL_VIEWPORT_PADDING, MC_SELECT_SCROLL_STRATEGY, getMcSelectDynamicMultipleError, getMcSelectNonFunctionValueError, getMcSelectNonArrayValueError, setMosaicValidation, MC_VALIDATION } from '@ptsecurity/mosaic/core';
import { McCleaner, McFormField, McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { McInput } from '@ptsecurity/mosaic/input';
import { McTag } from '@ptsecurity/mosaic/tags';
import { defer, merge, Observable, Subject, Subscription } from 'rxjs';
import { filter, map, startWith, switchMap, take, takeUntil, distinctUntilChanged } from 'rxjs/operators';
/** @type {?} */
let nextUniqueId = 0;
/**
 * Change event object that is emitted when the select value has changed.
 */
export class McSelectChange {
    /**
     * @param {?} source
     * @param {?} value
     */
    constructor(source, value) {
        this.source = source;
        this.value = value;
    }
}
if (false) {
    /** @type {?} */
    McSelectChange.prototype.source;
    /** @type {?} */
    McSelectChange.prototype.value;
}
export class McSelectSearch {
    /**
     * @param {?} formField
     */
    constructor(formField) {
        this.searchChangesSubscription = new Subscription();
        this.isSearchChanged = false;
        formField.canCleanerClearByEsc = false;
    }
    /**
     * @return {?}
     */
    focus() {
        this.input.focus();
    }
    /**
     * @return {?}
     */
    reset() {
        this.input.ngControl.reset();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (!this.input) {
            throw Error('McSelectSearch does not work without mcInput');
        }
        if (!this.input.ngControl) {
            throw Error('McSelectSearch does not work without ngControl');
        }
        this.searchChangesSubscription = (/** @type {?} */ (this.input.ngControl.valueChanges)).subscribe((/**
         * @return {?}
         */
        () => {
            this.isSearchChanged = true;
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.searchChangesSubscription.unsubscribe();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleKeydown(event) {
        // tslint:disable-next-line:deprecation
        if (event.keyCode === ESCAPE) {
            if (this.input.value) {
                this.reset();
                event.stopPropagation();
            }
        }
    }
}
McSelectSearch.decorators = [
    { type: Directive, args: [{
                selector: '[mcSelectSearch]',
                exportAs: 'mcSelectSearch',
                host: {
                    '(keydown)': 'handleKeydown($event)'
                }
            },] }
];
/** @nocollapse */
McSelectSearch.ctorParameters = () => [
    { type: McFormField }
];
McSelectSearch.propDecorators = {
    input: [{ type: ContentChild, args: [McInput, { static: false },] }]
};
if (false) {
    /** @type {?} */
    McSelectSearch.prototype.input;
    /** @type {?} */
    McSelectSearch.prototype.searchChangesSubscription;
    /** @type {?} */
    McSelectSearch.prototype.isSearchChanged;
}
export class McSelectSearchEmptyResult {
}
McSelectSearchEmptyResult.decorators = [
    { type: Directive, args: [{
                selector: '[mc-select-search-empty-result]',
                exportAs: 'mcSelectSearchEmptyResult'
            },] }
];
export class McSelectTrigger {
}
McSelectTrigger.decorators = [
    { type: Directive, args: [{ selector: 'mc-select-trigger' },] }
];
export class McSelectBase {
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
    McSelectBase.prototype.elementRef;
    /** @type {?} */
    McSelectBase.prototype.defaultErrorStateMatcher;
    /** @type {?} */
    McSelectBase.prototype.parentForm;
    /** @type {?} */
    McSelectBase.prototype.parentFormGroup;
    /** @type {?} */
    McSelectBase.prototype.ngControl;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
const McSelectMixinBase = mixinTabIndex(mixinDisabled(mixinErrorState(McSelectBase)));
export class McSelect extends McSelectMixinBase {
    /**
     * @param {?} _viewportRuler
     * @param {?} _changeDetectorRef
     * @param {?} _ngZone
     * @param {?} _renderer
     * @param {?} defaultErrorStateMatcher
     * @param {?} elementRef
     * @param {?} rawValidators
     * @param {?} _dir
     * @param {?} parentForm
     * @param {?} parentFormGroup
     * @param {?} _parentFormField
     * @param {?} ngControl
     * @param {?} ngModel
     * @param {?} formControlName
     * @param {?} _scrollStrategyFactory
     * @param {?} mcValidation
     */
    constructor(_viewportRuler, _changeDetectorRef, _ngZone, _renderer, defaultErrorStateMatcher, elementRef, rawValidators, _dir, parentForm, parentFormGroup, _parentFormField, ngControl, ngModel, formControlName, _scrollStrategyFactory, mcValidation) {
        super(elementRef, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);
        this._viewportRuler = _viewportRuler;
        this._changeDetectorRef = _changeDetectorRef;
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this.rawValidators = rawValidators;
        this._dir = _dir;
        this._parentFormField = _parentFormField;
        this.ngModel = ngModel;
        this.formControlName = formControlName;
        this._scrollStrategyFactory = _scrollStrategyFactory;
        this.mcValidation = mcValidation;
        /**
         * A name for this control that can be used by `mc-form-field`.
         */
        this.controlType = 'mc-select';
        this.hiddenItems = 0;
        /**
         * The cached font-size of the trigger element.
         */
        this.triggerFontSize = 0;
        this.previousSelectionModelSelected = [];
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
        this.scrollStrategy = this._scrollStrategyFactory();
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
                (option) => option.onSelectionChange)), ...this.selectionModel.selected.map((/**
                 * @param {?} option
                 * @return {?}
                 */
                (option) => option.onSelectionChange)));
            }
            return this._ngZone.onStable
                .asObservable()
                .pipe(take(1), switchMap((/**
             * @return {?}
             */
            () => this.optionSelectionChanges)));
        }))));
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
        this._required = false;
        this._multiple = false;
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
     * Value of the select control.
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} newValue
     * @return {?}
     */
    set value(newValue) {
        if (newValue !== this._value) {
            this.writeValue(newValue);
            this._value = newValue;
        }
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
    get isEmptySearchResult() {
        return this.search && this.options.length === 0 && !!this.search.input.value;
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
        this.selectionModel = new SelectionModel(this.multiple);
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
                this._changeDetectorRef.markForCheck();
            }
        }));
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (this.mcValidation.useValidation) {
            setMosaicValidation(this);
        }
        this.initKeyManager();
        this.selectionModel.changed
            .pipe(takeUntil(this.destroy))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            event.added.forEach((/**
             * @param {?} option
             * @return {?}
             */
            (option) => option.select()));
            event.removed.forEach((/**
             * @param {?} option
             * @return {?}
             */
            (option) => option.deselect()));
        }));
        this.options.changes
            .pipe(startWith(null), takeUntil(this.destroy))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.resetOptions();
            this.initializeSelection();
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
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
        this.keyManager.setActiveItem(-1);
        this.propagateChanges();
    }
    /**
     * @return {?}
     */
    resetSearch() {
        if (this.search) {
            this.search.reset();
            /*
            todo the incorrect behaviour of keyManager is possible here
            to avoid first item selection (to provide correct options flipping on closed select)
            we should process options update like it is the first options appearance
             */
            this.search.isSearchChanged = false;
        }
    }
    /**
     * Toggles the overlay panel open or closed.
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
     * Opens the overlay panel.
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
        this.keyManager.withHorizontalOrientation(null);
        this.highlightCorrectOption();
        this._changeDetectorRef.markForCheck();
        // Set the font size on the panel element once it exists.
        this._ngZone.onStable.asObservable()
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
        // the order of calls is important
        this.resetSearch();
        this._panelOpen = false;
        this.keyManager.withHorizontalOrientation(this.isRtl() ? 'rtl' : 'ltr');
        this._changeDetectorRef.markForCheck();
        this.onTouched();
    }
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} value New value to be written to the model.
     * @return {?}
     */
    writeValue(value) {
        if (this.options) {
            this.setSelectionByValue(value);
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
        this._changeDetectorRef.markForCheck();
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
    get triggerValue() {
        if (this.empty) {
            return '';
        }
        return this.selectionModel.selected[0].viewValue;
    }
    /**
     * @return {?}
     */
    get triggerValues() {
        if (this.empty) {
            return [];
        }
        /** @type {?} */
        const selectedOptions = this.selectionModel.selected;
        if (this.isRtl()) {
            selectedOptions.reverse();
        }
        return selectedOptions;
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
        return this._dir ? this._dir.value === 'rtl' : false;
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
        this._changeDetectorRef.markForCheck();
        if (this.search && this._panelOpen) {
            this.search.focus();
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
            this._changeDetectorRef.markForCheck();
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
            this._changeDetectorRef.detectChanges();
            this.calculateOverlayOffsetX();
            this.optionsContainer.nativeElement.scrollTop = this.scrollTop;
            this.updateScrollSize();
        }));
    }
    /**
     * Returns the theme to be used on the panel.
     * @return {?}
     */
    getPanelTheme() {
        return this._parentFormField ? `mc-${this._parentFormField.color}` : '';
    }
    /**
     * Focuses the select element.
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
        this.open();
    }
    /**
     * Invoked when an option is clicked.
     * @param {?} option
     * @param {?} $event
     * @return {?}
     */
    onRemoveMatcherItem(option, $event) {
        $event.stopPropagation();
        option.deselect();
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
        this.hiddenItems = ((/** @type {?} */ (this.selected))).length - visibleItems;
        if (this.hiddenItems) {
            /** @type {?} */
            const itemsCounter = this.trigger.nativeElement.querySelector('.mc-select__match-hidden-text');
            /** @type {?} */
            const matcherList = this.trigger.nativeElement.querySelector('.mc-select__match-list');
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
                this._changeDetectorRef.markForCheck();
                return;
            }
            else if (!itemsCounterShowed && (totalItemsWidth + itemsCounterWidth) > matcherWidth) {
                this.hiddenItems++;
            }
        }
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @return {?}
     */
    getItemHeight() {
        return this.options.first ? this.options.first.getHeight() : 0;
    }
    /**
     * @private
     * @return {?}
     */
    getHeightOfOptionsContainer() {
        return this.optionsContainer.nativeElement.getClientRects()[0].height;
    }
    /**
     * @private
     * @return {?}
     */
    updateScrollSize() {
        if (!this.options.first) {
            return;
        }
        this.keyManager.withScrollSize(Math.floor(this.getHeightOfOptionsContainer() / this.options.first.getHeight()));
    }
    /**
     * @private
     * @return {?}
     */
    getTotalItemsWidthInMatcher() {
        /** @type {?} */
        const triggerClone = this.trigger.nativeElement.cloneNode(true);
        triggerClone.querySelector('.mc-select__match-hidden-text').remove();
        this._renderer.setStyle(triggerClone, 'position', 'absolute');
        this._renderer.setStyle(triggerClone, 'visibility', 'hidden');
        this._renderer.setStyle(triggerClone, 'top', '-100%');
        this._renderer.setStyle(triggerClone, 'left', '0');
        this._renderer.appendChild(this.trigger.nativeElement, triggerClone);
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
     * Handles keyboard events while the select is closed.
     * @private
     * @param {?} event
     * @return {?}
     */
    handleClosedKeydown(event) {
        /* tslint:disable-next-line */
        /** @type {?} */
        const keyCode = event.keyCode;
        /** @type {?} */
        const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW ||
            keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW;
        /** @type {?} */
        const isOpenKey = keyCode === ENTER || keyCode === SPACE;
        // Open the select on ALT + arrow key to match the native <select>
        if (isOpenKey || ((this.multiple || event.altKey) && isArrowKey)) {
            event.preventDefault(); // prevents the page from scrolling down when pressing space
            this.open();
        }
        else if (!this.multiple) {
            this.keyManager.onKeydown(event);
        }
    }
    /**
     * Handles keyboard events when the selected is open.
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
        /** @type {?} */
        const manager = this.keyManager;
        if (isArrowKey && event.altKey) {
            // Close the select on ALT + arrow key to match the native <select>
            event.preventDefault();
            this.close();
        }
        else if (keyCode === HOME) {
            event.preventDefault();
            manager.setFirstItemActive();
        }
        else if (keyCode === END) {
            event.preventDefault();
            manager.setLastItemActive();
        }
        else if (keyCode === PAGE_UP) {
            event.preventDefault();
            manager.setPreviousPageItemActive();
        }
        else if (keyCode === PAGE_DOWN) {
            event.preventDefault();
            manager.setNextPageItemActive();
        }
        else if ((keyCode === ENTER || keyCode === SPACE) && manager.activeItem) {
            event.preventDefault();
            manager.activeItem.selectViaInteraction();
        }
        else if (this._multiple && keyCode === A && event.ctrlKey) {
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
            const previouslyFocusedIndex = manager.activeItemIndex;
            manager.onKeydown(event);
            if (this._multiple && isArrowKey && event.shiftKey && manager.activeItem &&
                manager.activeItemIndex !== previouslyFocusedIndex) {
                manager.activeItem.selectViaInteraction();
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
        this.previousSelectionModelSelected = this.selectionModel.selected;
        if (this.multiple && value) {
            if (!Array.isArray(value)) {
                throw getMcSelectNonArrayValueError();
            }
            this.selectionModel.clear();
            value.forEach((/**
             * @param {?} currentValue
             * @return {?}
             */
            (currentValue) => this.selectValue(currentValue)));
            this.sortValues();
        }
        else {
            this.selectionModel.clear();
            /** @type {?} */
            const correspondingOption = this.selectValue(value);
            // Shift focus to the active item. Note that we shouldn't do this in multiple
            // mode, because we don't know what option the user interacted with last.
            if (correspondingOption) {
                this.keyManager.setActiveItem(correspondingOption);
            }
        }
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    getCorrespondOption(value) {
        return [
            ...this.options.toArray(),
            ...this.previousSelectionModelSelected
        ].find((/**
         * @param {?} option
         * @return {?}
         */
        (option) => {
            try {
                // Treat null as a special reset value.
                return option.value != null && this.compareWith(option.value, value);
            }
            catch (error) {
                if (isDevMode()) {
                    // Notify developers of errors in their comparator.
                    console.warn(error);
                }
                return false;
            }
        }));
    }
    /**
     * Finds and selects and option based on its value.
     * @private
     * @param {?} value
     * @return {?} Option that has the corresponding value.
     */
    selectValue(value) {
        /** @type {?} */
        const correspondingOption = this.getCorrespondOption(value);
        if (correspondingOption) {
            this.selectionModel.select(correspondingOption);
        }
        return correspondingOption;
    }
    /**
     * Sets up a key manager to listen to keyboard events on the overlay panel.
     * @private
     * @return {?}
     */
    initKeyManager() {
        /** @type {?} */
        const typeAheadDebounce = 200;
        this.keyManager = new ActiveDescendantKeyManager(this.options)
            .withTypeAhead(typeAheadDebounce, this.search ? -1 : 0)
            .withVerticalOrientation()
            .withHorizontalOrientation(this.isRtl() ? 'rtl' : 'ltr');
        this.keyManager.tabOut
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
        this.keyManager.change
            .pipe(takeUntil(this.destroy))
            .subscribe((/**
         * @return {?}
         */
        () => {
            if (this._panelOpen && this.panel) {
                this.scrollActiveOptionIntoView();
            }
            else if (!this._panelOpen && !this.multiple && this.keyManager.activeItem) {
                this.keyManager.activeItem.selectViaInteraction();
            }
        }));
    }
    /**
     * Drops current option subscriptions and IDs and resets from scratch.
     * @private
     * @return {?}
     */
    resetOptions() {
        /** @type {?} */
        const changedOrDestroyed = merge(this.options.changes, this.destroy);
        this.optionSelectionChanges
            .pipe(takeUntil(changedOrDestroyed))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.onSelect(event.source, event.isUserInput);
            if (this.search && this.search.isSearchChanged) {
                Promise.resolve().then((/**
                 * @return {?}
                 */
                () => this.keyManager.setFirstItemActive()));
                this.search.isSearchChanged = false;
            }
            if (event.isUserInput && !this.multiple && this._panelOpen) {
                this.close();
                this.focus();
            }
        }));
        // Listen to changes in the internal state of the options and react accordingly.
        // Handles cases like the labels of the selected options changing.
        merge(...this.options.map((/**
         * @param {?} option
         * @return {?}
         */
        (option) => option.stateChanges)))
            .pipe(takeUntil(changedOrDestroyed))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this._changeDetectorRef.markForCheck();
            this.stateChanges.next();
        }));
    }
    /**
     * Invoked when an option is clicked.
     * @private
     * @param {?} option
     * @param {?} isUserInput
     * @return {?}
     */
    onSelect(option, isUserInput) {
        /** @type {?} */
        const wasSelected = this.selectionModel.isSelected(option);
        if (option.value == null && !this._multiple) {
            option.deselect();
            this.selectionModel.clear();
            this.propagateChanges(option.value);
        }
        else {
            if (option.selected) {
                this.selectionModel.select(option);
            }
            else {
                this.selectionModel.deselect(option);
            }
            if (isUserInput) {
                this.keyManager.setActiveItem(option);
            }
            if (this.multiple) {
                this.sortValues();
                if (isUserInput) {
                    // In case the user selected the option with their mouse, we
                    // want to restore focus back to the trigger, in order to
                    // prevent the select keyboard controls from clashing with
                    // the ones from `mc-option`.
                    // If search is avaliable then we focus search again.
                    if (this.search) {
                        this.search.focus();
                    }
                    else {
                        this.focus();
                    }
                }
            }
        }
        if (wasSelected !== this.selectionModel.isSelected(option)) {
            this.propagateChanges();
        }
        this.stateChanges.next();
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
     * Emits change event to set the model value.
     * @private
     * @param {?=} fallbackValue
     * @return {?}
     */
    propagateChanges(fallbackValue) {
        /** @type {?} */
        let valueToEmit = null;
        if (this.multiple) {
            valueToEmit = ((/** @type {?} */ (this.selected))).map((/**
             * @param {?} option
             * @return {?}
             */
            (option) => option.value));
        }
        else {
            valueToEmit = this.selected ? ((/** @type {?} */ (this.selected))).value : fallbackValue;
        }
        this._value = valueToEmit;
        this.valueChange.emit(valueToEmit);
        this.onChange(valueToEmit);
        this.selectionChange.emit(new McSelectChange(this, valueToEmit));
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Highlights the selected item. If no option is selected, it will highlight
     * the first item instead.
     * @private
     * @return {?}
     */
    highlightCorrectOption() {
        if (this.keyManager) {
            if (this.empty) {
                this.keyManager.setFirstItemActive();
            }
            else {
                this.keyManager.setActiveItem(this.selectionModel.selected[0]);
            }
        }
    }
    /**
     * Scrolls the active option into view.
     * @private
     * @return {?}
     */
    scrollActiveOptionIntoView() {
        /** @type {?} */
        const activeOptionIndex = this.keyManager.activeItemIndex || 0;
        /** @type {?} */
        const labelCount = countGroupLabelsBeforeOption(activeOptionIndex, this.options, this.optionGroups);
        this.optionsContainer.nativeElement.scrollTop = getOptionScrollPosition(activeOptionIndex + labelCount, this.getItemHeight(), this.optionsContainer.nativeElement.scrollTop, SELECT_PANEL_MAX_HEIGHT);
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
        const viewportSize = this._viewportRuler.getViewportSize();
        /** @type {?} */
        const isRtl = this.isRtl();
        /* tslint:disable-next-line:no-magic-numbers */
        /** @type {?} */
        const paddingWidth = SELECT_PANEL_PADDING_X * 2;
        /** @type {?} */
        let offsetX;
        /** @type {?} */
        const selected = this.selectionModel.selected[0] || this.options.first;
        offsetX = selected && selected.group ? SELECT_PANEL_INDENT_PADDING_X : SELECT_PANEL_PADDING_X;
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
McSelect.decorators = [
    { type: Component, args: [{
                selector: 'mc-select',
                exportAs: 'mcSelect',
                template: "<div cdk-overlay-origin\n     class=\"mc-select__trigger\"\n     (click)=\"toggle()\"\n     [class.mc-select__trigger_multiple]=\"multiple\"\n     #origin=\"cdkOverlayOrigin\"\n     #trigger>\n    <div class=\"mc-select__matcher\" [ngSwitch]=\"empty\">\n        <span class=\"mc-select__placeholder\" *ngSwitchCase=\"true\">{{ placeholder || '\\u00A0' }}</span>\n        <span *ngSwitchCase=\"false\" [ngSwitch]=\"!!customTrigger\">\n            <div *ngSwitchDefault [ngSwitch]=\"multiple\" class=\"mc-select__match-container\">\n                <span *ngSwitchCase=\"false\" class=\"mc-select__matcher-text\">{{ triggerValue }}</span>\n                <div *ngSwitchCase=\"true\" class=\"mc-select__match-list\">\n                    <mc-tag *ngFor=\"let option of triggerValues\"\n                            [disabled]=\"disabled\"\n                            [selectable]=\"false\"\n                            [class.mc-error]=\"errorState\">\n                        {{ option.viewValue }}\n                        <i mc-icon=\"mc-close-S_16\" (click)=\"onRemoveMatcherItem(option, $event)\"></i>\n                    </mc-tag>\n                </div>\n                <div class=\"mc-select__match-hidden-text\" [style.display]=\"hiddenItems > 0 ? 'block' : 'none'\">\n                    {{ hiddenItemsTextFormatter(hiddenItemsText, hiddenItems) }}\n                </div>\n            </div>\n            <ng-content select=\"mc-select-trigger\" *ngSwitchCase=\"true\"></ng-content>\n        </span>\n    </div>\n\n    <div class=\"mc-select__cleaner\" *ngIf=\"canShowCleaner\" (click)=\"clearValue($event)\">\n        <ng-content select=\"mc-cleaner\"></ng-content>\n    </div>\n\n    <div class=\"mc-select__arrow-wrapper\">\n        <i class=\"mc-select__arrow\" mc-icon=\"mc-angle-down-L_16\"></i>\n    </div>\n</div>\n\n<ng-template\n    cdk-connected-overlay\n    cdkConnectedOverlayLockPosition\n    cdkConnectedOverlayHasBackdrop\n    cdkConnectedOverlayBackdropClass=\"cdk-overlay-transparent-backdrop\"\n    [cdkConnectedOverlayScrollStrategy]=\"scrollStrategy\"\n    [cdkConnectedOverlayOrigin]=\"origin\"\n    [cdkConnectedOverlayOpen]=\"panelOpen\"\n    [cdkConnectedOverlayPositions]=\"positions\"\n    [cdkConnectedOverlayMinWidth]=\"triggerRect?.width\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    (backdropClick)=\"close()\"\n    (attach)=\"onAttached()\"\n    (detach)=\"close()\">\n    <div\n        #panel\n        class=\"mc-select__panel {{ getPanelTheme() }}\"\n        [ngClass]=\"panelClass\"\n        (@transformPanel.done)=\"panelDoneAnimatingStream.next($event.toState)\"\n        [style.transformOrigin]=\"transformOrigin\"\n        [class.mc-select-panel-done-animcing]=\"panelDoneAnimating\"\n        [style.font-size.px]=\"triggerFontSize\"\n        (keydown)=\"handleKeydown($event)\">\n\n        <div *ngIf=\"search\" class=\"mc-select__search-container\">\n            <ng-content select=\"[mcSelectSearch]\"></ng-content>\n        </div>\n\n        <div #optionsContainer\n             class=\"mc-select__content\"\n             [@fadeInContent]=\"'showing'\"\n             (@fadeInContent.done)=\"onFadeInDone()\">\n\n            <div *ngIf=\"isEmptySearchResult\" class=\"mc-select__no-options-message\">\n                <ng-content select=\"[mc-select-search-empty-result]\"></ng-content>\n            </div>\n            <ng-content select=\"mc-option,mc-optgroup\"></ng-content>\n        </div>\n    </div>\n</ng-template>\n",
                inputs: ['disabled', 'tabIndex'],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '[attr.id]': 'id',
                    '[attr.tabindex]': 'tabIndex',
                    '[attr.disabled]': 'disabled || null',
                    class: 'mc-select',
                    '[class.mc-disabled]': 'disabled',
                    '[class.mc-invalid]': 'errorState',
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
                    { provide: McFormFieldControl, useExisting: McSelect },
                    { provide: MC_OPTION_PARENT_COMPONENT, useExisting: McSelect }
                ],
                styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider_vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider_inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:80px}.mc-select{box-sizing:border-box;display:inline-block;vertical-align:top;width:100%;outline:0}.mc-select .mc-select__trigger{display:flex;box-sizing:border-box;position:relative;height:30px;cursor:pointer;padding-right:7px;padding-left:15px}.mc-select .mc-select__trigger.mc-select__trigger_multiple{padding-left:7px}.mc-select.mc-disabled .mc-select__trigger{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.mc-select__no-options-message{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;position:relative;max-width:100%;height:32px;cursor:default;outline:0;padding:0 16px}.mc-select__matcher{display:flex;align-items:center;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mc-select__matcher>span{width:100%}.mc-select__match-list{display:flex;flex-wrap:wrap;overflow:hidden;max-height:28px;margin:0;padding-left:0}.mc-select__match-list .mc-tag{margin-right:4px}.mc-select__match-container{display:flex;flex-direction:row;justify-content:space-between;width:100%}.mc-select__match-container .mc-select__match-hidden-text{flex:0 0 70px;-ms-grid-row-align:center;align-self:center;padding:0 8px;text-align:right}.mc-select__match-item{display:flex;border:1px solid transparent;border-radius:3px;padding-left:7px;margin-right:4px;max-width:100%}.mc-select__arrow-wrapper{-ms-grid-row-align:center;align-self:center}.mc-form-field-appearance-fill .mc-select__arrow-wrapper,.mc-form-field-appearance-standard .mc-select__arrow-wrapper{transform:translateY(-50%)}.mc-form-field-appearance-outline .mc-select__arrow-wrapper{transform:translateY(-25%)}.mc-select__panel{min-width:100%;overflow:hidden;border-width:1px;border-style:solid;border-bottom-left-radius:3px;border-bottom-right-radius:3px;padding:4px 0}.mc-select__panel .mc-optgroup-label,.mc-select__panel .mc-option{font-size:inherit;line-height:32px;height:32px}.mc-select__content{max-height:224px;overflow:auto}.mc-form-field-type-mc-select:not(.mc-disabled) .mc-form-field-flex{cursor:pointer}.mc-form-field-type-mc-select .mc-form-field-label{width:calc(100% - 18px)}.mc-select__search-container{border-bottom-width:1px;border-bottom-style:solid}"]
            }] }
];
/** @nocollapse */
McSelect.ctorParameters = () => [
    { type: ViewportRuler },
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: Renderer2 },
    { type: ErrorStateMatcher },
    { type: ElementRef },
    { type: Array, decorators: [{ type: Optional }, { type: Inject, args: [NG_VALIDATORS,] }] },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: NgForm, decorators: [{ type: Optional }] },
    { type: FormGroupDirective, decorators: [{ type: Optional }] },
    { type: McFormField, decorators: [{ type: Optional }] },
    { type: NgControl, decorators: [{ type: Self }, { type: Optional }] },
    { type: NgModel, decorators: [{ type: Optional }, { type: Self }] },
    { type: FormControlName, decorators: [{ type: Optional }, { type: Self }] },
    { type: undefined, decorators: [{ type: Inject, args: [MC_SELECT_SCROLL_STRATEGY,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_VALIDATION,] }] }
];
McSelect.propDecorators = {
    trigger: [{ type: ViewChild, args: ['trigger', { static: false },] }],
    panel: [{ type: ViewChild, args: ['panel', { static: false },] }],
    optionsContainer: [{ type: ViewChild, args: ['optionsContainer', { static: false },] }],
    overlayDir: [{ type: ViewChild, args: [CdkConnectedOverlay, { static: false },] }],
    tags: [{ type: ViewChildren, args: [McTag,] }],
    customTrigger: [{ type: ContentChild, args: [McSelectTrigger, { static: false },] }],
    cleaner: [{ type: ContentChild, args: ['mcSelectCleaner', { static: true },] }],
    options: [{ type: ContentChildren, args: [McOption, { descendants: true },] }],
    optionGroups: [{ type: ContentChildren, args: [McOptgroup,] }],
    search: [{ type: ContentChild, args: [McSelectSearch, { static: false },] }],
    hiddenItemsText: [{ type: Input }],
    panelClass: [{ type: Input }],
    errorStateMatcher: [{ type: Input }],
    sortComparator: [{ type: Input }],
    openedChange: [{ type: Output }],
    openedStream: [{ type: Output, args: ['opened',] }],
    closedStream: [{ type: Output, args: ['closed',] }],
    selectionChange: [{ type: Output }],
    valueChange: [{ type: Output }],
    placeholder: [{ type: Input }],
    required: [{ type: Input }],
    multiple: [{ type: Input }],
    compareWith: [{ type: Input }],
    value: [{ type: Input }],
    id: [{ type: Input }],
    hiddenItemsTextFormatter: [{ type: Input }]
};
if (false) {
    /**
     * A name for this control that can be used by `mc-form-field`.
     * @type {?}
     */
    McSelect.prototype.controlType;
    /** @type {?} */
    McSelect.prototype.hiddenItems;
    /**
     * The last measured value for the trigger's client bounding rect.
     * @type {?}
     */
    McSelect.prototype.triggerRect;
    /**
     * The cached font-size of the trigger element.
     * @type {?}
     */
    McSelect.prototype.triggerFontSize;
    /**
     * Deals with the selection logic.
     * @type {?}
     */
    McSelect.prototype.selectionModel;
    /** @type {?} */
    McSelect.prototype.previousSelectionModelSelected;
    /**
     * Manages keyboard events for options in the panel.
     * @type {?}
     */
    McSelect.prototype.keyManager;
    /**
     * The value of the select panel's transform-origin property.
     * @type {?}
     */
    McSelect.prototype.transformOrigin;
    /**
     * Whether the panel's animation is done.
     * @type {?}
     */
    McSelect.prototype.panelDoneAnimating;
    /**
     * Emits when the panel element is finished transforming in.
     * @type {?}
     */
    McSelect.prototype.panelDoneAnimatingStream;
    /**
     * Strategy that will be used to handle scrolling while the select panel is open.
     * @type {?}
     */
    McSelect.prototype.scrollStrategy;
    /**
     * The y-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text.
     * when the panel opens. Will change based on the y-position of the selected option.
     * @type {?}
     */
    McSelect.prototype.offsetY;
    /**
     * This position config ensures that the top "start" corner of the overlay
     * is aligned with with the top "start" of the origin by default (overlapping
     * the trigger completely). If the panel cannot fit below the trigger, it
     * will fall back to a position above the trigger.
     * @type {?}
     */
    McSelect.prototype.positions;
    /** @type {?} */
    McSelect.prototype.trigger;
    /** @type {?} */
    McSelect.prototype.panel;
    /** @type {?} */
    McSelect.prototype.optionsContainer;
    /** @type {?} */
    McSelect.prototype.overlayDir;
    /** @type {?} */
    McSelect.prototype.tags;
    /**
     * User-supplied override of the trigger element.
     * @type {?}
     */
    McSelect.prototype.customTrigger;
    /** @type {?} */
    McSelect.prototype.cleaner;
    /**
     * All of the defined select options.
     * @type {?}
     */
    McSelect.prototype.options;
    /**
     * All of the defined groups of options.
     * @type {?}
     */
    McSelect.prototype.optionGroups;
    /** @type {?} */
    McSelect.prototype.search;
    /** @type {?} */
    McSelect.prototype.hiddenItemsText;
    /**
     * Classes to be passed to the select panel. Supports the same syntax as `ngClass`.
     * @type {?}
     */
    McSelect.prototype.panelClass;
    /**
     * Object used to control when error messages are shown.
     * @type {?}
     */
    McSelect.prototype.errorStateMatcher;
    /**
     * Function used to sort the values in a select in multiple mode.
     * Follows the same logic as `Array.prototype.sort`.
     * @type {?}
     */
    McSelect.prototype.sortComparator;
    /**
     * Combined stream of all of the child options' change events.
     * @type {?}
     */
    McSelect.prototype.optionSelectionChanges;
    /**
     * Event emitted when the select panel has been toggled.
     * @type {?}
     */
    McSelect.prototype.openedChange;
    /**
     * Event emitted when the select has been opened.
     * @type {?}
     */
    McSelect.prototype.openedStream;
    /**
     * Event emitted when the select has been closed.
     * @type {?}
     */
    McSelect.prototype.closedStream;
    /**
     * Event emitted when the selected value has been changed by the user.
     * @type {?}
     */
    McSelect.prototype.selectionChange;
    /**
     * Event that emits whenever the raw value of the select changes. This is here primarily
     * to facilitate the two-way binding for the `value` input.
     * \@docs-private
     * @type {?}
     */
    McSelect.prototype.valueChange;
    /**
     * @type {?}
     * @private
     */
    McSelect.prototype._placeholder;
    /**
     * @type {?}
     * @private
     */
    McSelect.prototype._required;
    /**
     * @type {?}
     * @private
     */
    McSelect.prototype._multiple;
    /**
     * @type {?}
     * @private
     */
    McSelect.prototype._value;
    /**
     * @type {?}
     * @private
     */
    McSelect.prototype._id;
    /**
     * @type {?}
     * @private
     */
    McSelect.prototype._focused;
    /**
     * @type {?}
     * @private
     */
    McSelect.prototype._panelOpen;
    /**
     * The scroll position of the overlay panel, calculated to center the selected option.
     * @type {?}
     * @private
     */
    McSelect.prototype.scrollTop;
    /**
     * Unique id for this input.
     * @type {?}
     * @private
     */
    McSelect.prototype.uid;
    /**
     * Emits whenever the component is destroyed.
     * @type {?}
     * @private
     */
    McSelect.prototype.destroy;
    /**
     * `View -> model callback called when value changes`
     * @type {?}
     */
    McSelect.prototype.onChange;
    /**
     * `View -> model callback called when select has been touched`
     * @type {?}
     */
    McSelect.prototype.onTouched;
    /**
     * Comparison function to specify which option is displayed. Defaults to object equality.
     * @type {?}
     * @private
     */
    McSelect.prototype._compareWith;
    /**
     * @type {?}
     * @private
     */
    McSelect.prototype._viewportRuler;
    /**
     * @type {?}
     * @private
     */
    McSelect.prototype._changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    McSelect.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    McSelect.prototype._renderer;
    /** @type {?} */
    McSelect.prototype.rawValidators;
    /**
     * @type {?}
     * @private
     */
    McSelect.prototype._dir;
    /**
     * @type {?}
     * @private
     */
    McSelect.prototype._parentFormField;
    /** @type {?} */
    McSelect.prototype.ngModel;
    /** @type {?} */
    McSelect.prototype.formControlName;
    /**
     * @type {?}
     * @private
     */
    McSelect.prototype._scrollStrategyFactory;
    /**
     * @type {?}
     * @private
     */
    McSelect.prototype.mcValidation;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9zZWxlY3QvIiwic291cmNlcyI6WyJzZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUNILG1CQUFtQixFQUNuQixhQUFhLEVBQ2hCLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUdILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2YsU0FBUyxFQUVULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUlOLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxJQUFJLEVBRUosU0FBUyxFQUNULFlBQVksRUFDWixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUVILGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsYUFBYSxFQUNiLFNBQVMsRUFDVCxNQUFNLEVBQ04sT0FBTyxFQUVWLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEUsT0FBTyxFQUNILFVBQVUsRUFDVixHQUFHLEVBQ0gsS0FBSyxFQUNMLElBQUksRUFDSixVQUFVLEVBQ1YsV0FBVyxFQUNYLEtBQUssRUFDTCxRQUFRLEVBQ1IsQ0FBQyxFQUNELE1BQU0sRUFDTixPQUFPLEVBQ1AsU0FBUyxFQUNaLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUNILDRCQUE0QixFQUM1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Q0FBaUY7O0lBRWpGLDJCQUFzRTs7Ozs7SUFHdEUsMkJBQStFOzs7OztJQUcvRSxnQ0FBaUU7O0lBRWpFLDBCQUF3RTs7SUFFeEUsbUNBQTRDOzs7OztJQUc1Qyw4QkFBOEU7Ozs7O0lBRzlFLHFDQUE4Qzs7Ozs7O0lBTTlDLGtDQUFtRjs7Ozs7SUFHbkYsMENBVzBDOzs7OztJQUcxQyxnQ0FBcUY7Ozs7O0lBR3JGLGdDQUM0RDs7Ozs7SUFHNUQsZ0NBQzZEOzs7OztJQUc3RCxtQ0FBc0c7Ozs7Ozs7SUFPdEcsK0JBQTRFOzs7OztJQWE1RSxnQ0FBNkI7Ozs7O0lBYTdCLDZCQUFtQzs7Ozs7SUFlbkMsNkJBQW1DOzs7OztJQXVDbkMsMEJBQW9COzs7OztJQVlwQix1QkFBb0I7Ozs7O0lBV3BCLDRCQUF5Qjs7Ozs7SUFNekIsOEJBQTJCOzs7Ozs7SUFXM0IsNkJBQXNCOzs7Ozs7SUFHdEIsdUJBQXFEOzs7Ozs7SUFHckQsMkJBQStDOzs7OztJQW9IL0MsNEJBQTBDOzs7OztJQUcxQyw2QkFBcUI7Ozs7OztJQTRvQnJCLGdDQUF1RDs7Ozs7SUFod0JuRCxrQ0FBOEM7Ozs7O0lBQzlDLHNDQUFzRDs7Ozs7SUFDdEQsMkJBQWdDOzs7OztJQUNoQyw2QkFBcUM7O0lBR3JDLGlDQUFvRTs7Ozs7SUFDcEUsd0JBQWlEOzs7OztJQUdqRCxvQ0FBMEQ7O0lBRTFELDJCQUEyQzs7SUFDM0MsbUNBQTJEOzs7OztJQUMzRCwwQ0FBMEU7Ozs7O0lBQzFFLGdDQUE0RSIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlOm5vLWVtcHR5ICovXG5cbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7XG4gICAgQ2RrQ29ubmVjdGVkT3ZlcmxheSxcbiAgICBWaWV3cG9ydFJ1bGVyXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIERpcmVjdGl2ZSxcbiAgICBEb0NoZWNrLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBpc0Rldk1vZGUsXG4gICAgTmdab25lLFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgUmVuZGVyZXIyLFxuICAgIFNlbGYsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0NoaWxkcmVuLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgICBGb3JtQ29udHJvbE5hbWUsXG4gICAgRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgIE5HX1ZBTElEQVRPUlMsXG4gICAgTmdDb250cm9sLFxuICAgIE5nRm9ybSxcbiAgICBOZ01vZGVsLFxuICAgIFZhbGlkYXRvclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlciB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9hMTF5JztcbmltcG9ydCB7XG4gICAgRE9XTl9BUlJPVyxcbiAgICBFTkQsXG4gICAgRU5URVIsXG4gICAgSE9NRSxcbiAgICBMRUZUX0FSUk9XLFxuICAgIFJJR0hUX0FSUk9XLFxuICAgIFNQQUNFLFxuICAgIFVQX0FSUk9XLFxuICAgIEEsXG4gICAgRVNDQVBFLFxuICAgIFBBR0VfVVAsXG4gICAgUEFHRV9ET1dOXG59IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICAgIGNvdW50R3JvdXBMYWJlbHNCZWZvcmVPcHRpb24sXG4gICAgZ2V0T3B0aW9uU2Nyb2xsUG9zaXRpb24sXG4gICAgQ2FuRGlzYWJsZSxcbiAgICBDYW5EaXNhYmxlQ3RvcixcbiAgICBDYW5VcGRhdGVFcnJvclN0YXRlLFxuICAgIENhblVwZGF0ZUVycm9yU3RhdGVDdG9yLFxuICAgIEVycm9yU3RhdGVNYXRjaGVyLFxuICAgIEhhc1RhYkluZGV4LFxuICAgIEhhc1RhYkluZGV4Q3RvcixcbiAgICBNQ19PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCxcbiAgICBNY09wdGdyb3VwLFxuICAgIE1jT3B0aW9uLFxuICAgIE1jT3B0aW9uU2VsZWN0aW9uQ2hhbmdlLFxuICAgIG1peGluRGlzYWJsZWQsXG4gICAgbWl4aW5FcnJvclN0YXRlLFxuICAgIG1peGluVGFiSW5kZXgsXG4gICAgbWNTZWxlY3RBbmltYXRpb25zLFxuXG4gICAgU0VMRUNUX1BBTkVMX0lOREVOVF9QQURESU5HX1gsXG4gICAgU0VMRUNUX1BBTkVMX01BWF9IRUlHSFQsXG4gICAgU0VMRUNUX1BBTkVMX1BBRERJTkdfWCxcbiAgICBTRUxFQ1RfUEFORUxfVklFV1BPUlRfUEFERElORyxcbiAgICBNQ19TRUxFQ1RfU0NST0xMX1NUUkFURUdZLFxuXG4gICAgZ2V0TWNTZWxlY3REeW5hbWljTXVsdGlwbGVFcnJvcixcbiAgICBnZXRNY1NlbGVjdE5vbkZ1bmN0aW9uVmFsdWVFcnJvcixcbiAgICBnZXRNY1NlbGVjdE5vbkFycmF5VmFsdWVFcnJvcixcblxuICAgIHNldE1vc2FpY1ZhbGlkYXRpb24sXG4gICAgTUNfVkFMSURBVElPTixcbiAgICBNY1ZhbGlkYXRpb25PcHRpb25zXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IE1jQ2xlYW5lciwgTWNGb3JtRmllbGQsIE1jRm9ybUZpZWxkQ29udHJvbCB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9mb3JtLWZpZWxkJztcbmltcG9ydCB7IE1jSW5wdXQgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvaW5wdXQnO1xuaW1wb3J0IHsgTWNUYWcgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvdGFncyc7XG5pbXBvcnQgeyBkZWZlciwgbWVyZ2UsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgICBmaWx0ZXIsXG4gICAgbWFwLFxuICAgIHN0YXJ0V2l0aCxcbiAgICBzd2l0Y2hNYXAsXG4gICAgdGFrZSxcbiAgICB0YWtlVW50aWwsXG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWRcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG4vKiogQ2hhbmdlIGV2ZW50IG9iamVjdCB0aGF0IGlzIGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IHZhbHVlIGhhcyBjaGFuZ2VkLiAqL1xuZXhwb3J0IGNsYXNzIE1jU2VsZWN0Q2hhbmdlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlOiBNY1NlbGVjdCwgcHVibGljIHZhbHVlOiBhbnkpIHt9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jU2VsZWN0U2VhcmNoXScsXG4gICAgZXhwb3J0QXM6ICdtY1NlbGVjdFNlYXJjaCcsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleWRvd24oJGV2ZW50KSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jU2VsZWN0U2VhcmNoIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICBAQ29udGVudENoaWxkKE1jSW5wdXQsIHsgc3RhdGljOiBmYWxzZSB9KSBpbnB1dDogTWNJbnB1dDtcblxuICAgIHNlYXJjaENoYW5nZXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICAgIGlzU2VhcmNoQ2hhbmdlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoZm9ybUZpZWxkOiBNY0Zvcm1GaWVsZCkge1xuICAgICAgICBmb3JtRmllbGQuY2FuQ2xlYW5lckNsZWFyQnlFc2MgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnB1dC5mb2N1cygpO1xuICAgIH1cblxuICAgIHJlc2V0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlucHV0Lm5nQ29udHJvbC5yZXNldCgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlucHV0KSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignTWNTZWxlY3RTZWFyY2ggZG9lcyBub3Qgd29yayB3aXRob3V0IG1jSW5wdXQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5pbnB1dC5uZ0NvbnRyb2wpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdNY1NlbGVjdFNlYXJjaCBkb2VzIG5vdCB3b3JrIHdpdGhvdXQgbmdDb250cm9sJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlYXJjaENoYW5nZXNTdWJzY3JpcHRpb24gPSB0aGlzLmlucHV0Lm5nQ29udHJvbC52YWx1ZUNoYW5nZXMhLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzU2VhcmNoQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlYXJjaENoYW5nZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pbnB1dC52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWMtc2VsZWN0LXNlYXJjaC1lbXB0eS1yZXN1bHRdJyxcbiAgICBleHBvcnRBczogJ21jU2VsZWN0U2VhcmNoRW1wdHlSZXN1bHQnXG59KVxuZXhwb3J0IGNsYXNzIE1jU2VsZWN0U2VhcmNoRW1wdHlSZXN1bHQge31cblxuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdtYy1zZWxlY3QtdHJpZ2dlcicgfSlcbmV4cG9ydCBjbGFzcyBNY1NlbGVjdFRyaWdnZXIge31cblxuXG5leHBvcnQgY2xhc3MgTWNTZWxlY3RCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHB1YmxpYyBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICAgICAgICBwdWJsaWMgcGFyZW50Rm9ybTogTmdGb3JtLFxuICAgICAgICBwdWJsaWMgcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgICAgIHB1YmxpYyBuZ0NvbnRyb2w6IE5nQ29udHJvbFxuICAgICkge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5jb25zdCBNY1NlbGVjdE1peGluQmFzZTogQ2FuRGlzYWJsZUN0b3IgJiBIYXNUYWJJbmRleEN0b3IgJiBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvciAmXG4gICAgdHlwZW9mIE1jU2VsZWN0QmFzZSA9IG1peGluVGFiSW5kZXgobWl4aW5EaXNhYmxlZChtaXhpbkVycm9yU3RhdGUoTWNTZWxlY3RCYXNlKSkpO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtc2VsZWN0JyxcbiAgICBleHBvcnRBczogJ21jU2VsZWN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJ3NlbGVjdC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zZWxlY3Quc2NzcyddLFxuICAgIGlucHV0czogWydkaXNhYmxlZCcsICd0YWJJbmRleCddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG5cbiAgICAgICAgY2xhc3M6ICdtYy1zZWxlY3QnLFxuICAgICAgICAnW2NsYXNzLm1jLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgICAgICdbY2xhc3MubWMtaW52YWxpZF0nOiAnZXJyb3JTdGF0ZScsXG5cbiAgICAgICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duKCRldmVudCknLFxuICAgICAgICAnKGZvY3VzKSc6ICdvbkZvY3VzKCknLFxuICAgICAgICAnKGJsdXIpJzogJ29uQmx1cigpJyxcbiAgICAgICAgJyh3aW5kb3c6cmVzaXplKSc6ICdjYWxjdWxhdGVIaWRkZW5JdGVtcygpJ1xuICAgIH0sXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICBtY1NlbGVjdEFuaW1hdGlvbnMudHJhbnNmb3JtUGFuZWwsXG4gICAgICAgIG1jU2VsZWN0QW5pbWF0aW9ucy5mYWRlSW5Db250ZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBNY0Zvcm1GaWVsZENvbnRyb2wsIHVzZUV4aXN0aW5nOiBNY1NlbGVjdCB9LFxuICAgICAgICB7IHByb3ZpZGU6IE1DX09QVElPTl9QQVJFTlRfQ09NUE9ORU5ULCB1c2VFeGlzdGluZzogTWNTZWxlY3QgfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNTZWxlY3QgZXh0ZW5kcyBNY1NlbGVjdE1peGluQmFzZSBpbXBsZW1lbnRzXG4gICAgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgRG9DaGVjaywgQ29udHJvbFZhbHVlQWNjZXNzb3IsIENhbkRpc2FibGUsXG4gICAgSGFzVGFiSW5kZXgsIE1jRm9ybUZpZWxkQ29udHJvbDxhbnk+LCBDYW5VcGRhdGVFcnJvclN0YXRlIHtcblxuICAgIC8qKiBBIG5hbWUgZm9yIHRoaXMgY29udHJvbCB0aGF0IGNhbiBiZSB1c2VkIGJ5IGBtYy1mb3JtLWZpZWxkYC4gKi9cbiAgICBjb250cm9sVHlwZSA9ICdtYy1zZWxlY3QnO1xuXG4gICAgaGlkZGVuSXRlbXM6IG51bWJlciA9IDA7XG5cbiAgICAvKiogVGhlIGxhc3QgbWVhc3VyZWQgdmFsdWUgZm9yIHRoZSB0cmlnZ2VyJ3MgY2xpZW50IGJvdW5kaW5nIHJlY3QuICovXG4gICAgdHJpZ2dlclJlY3Q6IENsaWVudFJlY3Q7XG5cbiAgICAvKiogVGhlIGNhY2hlZCBmb250LXNpemUgb2YgdGhlIHRyaWdnZXIgZWxlbWVudC4gKi9cbiAgICB0cmlnZ2VyRm9udFNpemUgPSAwO1xuXG4gICAgLyoqIERlYWxzIHdpdGggdGhlIHNlbGVjdGlvbiBsb2dpYy4gKi9cbiAgICBzZWxlY3Rpb25Nb2RlbDogU2VsZWN0aW9uTW9kZWw8TWNPcHRpb24+O1xuXG4gICAgcHJldmlvdXNTZWxlY3Rpb25Nb2RlbFNlbGVjdGVkOiBNY09wdGlvbltdID0gW107XG5cbiAgICAvKiogTWFuYWdlcyBrZXlib2FyZCBldmVudHMgZm9yIG9wdGlvbnMgaW4gdGhlIHBhbmVsLiAqL1xuICAgIGtleU1hbmFnZXI6IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPE1jT3B0aW9uPjtcblxuICAgIC8qKiBUaGUgdmFsdWUgb2YgdGhlIHNlbGVjdCBwYW5lbCdzIHRyYW5zZm9ybS1vcmlnaW4gcHJvcGVydHkuICovXG4gICAgdHJhbnNmb3JtT3JpZ2luOiBzdHJpbmcgPSAndG9wJztcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBwYW5lbCdzIGFuaW1hdGlvbiBpcyBkb25lLiAqL1xuICAgIHBhbmVsRG9uZUFuaW1hdGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIHBhbmVsIGVsZW1lbnQgaXMgZmluaXNoZWQgdHJhbnNmb3JtaW5nIGluLiAqL1xuICAgIHBhbmVsRG9uZUFuaW1hdGluZ1N0cmVhbSA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuICAgIC8qKiBTdHJhdGVneSB0aGF0IHdpbGwgYmUgdXNlZCB0byBoYW5kbGUgc2Nyb2xsaW5nIHdoaWxlIHRoZSBzZWxlY3QgcGFuZWwgaXMgb3Blbi4gKi9cbiAgICBzY3JvbGxTdHJhdGVneSA9IHRoaXMuX3Njcm9sbFN0cmF0ZWd5RmFjdG9yeSgpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHktb2Zmc2V0IG9mIHRoZSBvdmVybGF5IHBhbmVsIGluIHJlbGF0aW9uIHRvIHRoZSB0cmlnZ2VyJ3MgdG9wIHN0YXJ0IGNvcm5lci5cbiAgICAgKiBUaGlzIG11c3QgYmUgYWRqdXN0ZWQgdG8gYWxpZ24gdGhlIHNlbGVjdGVkIG9wdGlvbiB0ZXh0IG92ZXIgdGhlIHRyaWdnZXIgdGV4dC5cbiAgICAgKiB3aGVuIHRoZSBwYW5lbCBvcGVucy4gV2lsbCBjaGFuZ2UgYmFzZWQgb24gdGhlIHktcG9zaXRpb24gb2YgdGhlIHNlbGVjdGVkIG9wdGlvbi5cbiAgICAgKi9cbiAgICBvZmZzZXRZID0gMDtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgcG9zaXRpb24gY29uZmlnIGVuc3VyZXMgdGhhdCB0aGUgdG9wIFwic3RhcnRcIiBjb3JuZXIgb2YgdGhlIG92ZXJsYXlcbiAgICAgKiBpcyBhbGlnbmVkIHdpdGggd2l0aCB0aGUgdG9wIFwic3RhcnRcIiBvZiB0aGUgb3JpZ2luIGJ5IGRlZmF1bHQgKG92ZXJsYXBwaW5nXG4gICAgICogdGhlIHRyaWdnZXIgY29tcGxldGVseSkuIElmIHRoZSBwYW5lbCBjYW5ub3QgZml0IGJlbG93IHRoZSB0cmlnZ2VyLCBpdFxuICAgICAqIHdpbGwgZmFsbCBiYWNrIHRvIGEgcG9zaXRpb24gYWJvdmUgdGhlIHRyaWdnZXIuXG4gICAgICovXG4gICAgcG9zaXRpb25zID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXG4gICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgIG92ZXJsYXlZOiAndG9wJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJ1xuICAgICAgICB9XG4gICAgXTtcblxuICAgIEBWaWV3Q2hpbGQoJ3RyaWdnZXInLCB7IHN0YXRpYzogZmFsc2UgfSkgdHJpZ2dlcjogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ3BhbmVsJywgeyBzdGF0aWM6IGZhbHNlIH0pIHBhbmVsOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgnb3B0aW9uc0NvbnRhaW5lcicsIHsgc3RhdGljOiBmYWxzZSB9KSBvcHRpb25zQ29udGFpbmVyOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZChDZGtDb25uZWN0ZWRPdmVybGF5LCB7IHN0YXRpYzogZmFsc2UgfSkgb3ZlcmxheURpcjogQ2RrQ29ubmVjdGVkT3ZlcmxheTtcblxuICAgIEBWaWV3Q2hpbGRyZW4oTWNUYWcpIHRhZ3M6IFF1ZXJ5TGlzdDxNY1RhZz47XG5cbiAgICAvKiogVXNlci1zdXBwbGllZCBvdmVycmlkZSBvZiB0aGUgdHJpZ2dlciBlbGVtZW50LiAqL1xuICAgIEBDb250ZW50Q2hpbGQoTWNTZWxlY3RUcmlnZ2VyLCB7IHN0YXRpYzogZmFsc2UgfSkgY3VzdG9tVHJpZ2dlcjogTWNTZWxlY3RUcmlnZ2VyO1xuXG4gICAgQENvbnRlbnRDaGlsZCgnbWNTZWxlY3RDbGVhbmVyJywgeyBzdGF0aWM6IHRydWUgfSkgY2xlYW5lcjogTWNDbGVhbmVyO1xuXG4gICAgLyoqIEFsbCBvZiB0aGUgZGVmaW5lZCBzZWxlY3Qgb3B0aW9ucy4gKi9cbiAgICBAQ29udGVudENoaWxkcmVuKE1jT3B0aW9uLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIG9wdGlvbnM6IFF1ZXJ5TGlzdDxNY09wdGlvbj47XG5cbiAgICAvKiogQWxsIG9mIHRoZSBkZWZpbmVkIGdyb3VwcyBvZiBvcHRpb25zLiAqL1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNPcHRncm91cCkgb3B0aW9uR3JvdXBzOiBRdWVyeUxpc3Q8TWNPcHRncm91cD47XG5cbiAgICBAQ29udGVudENoaWxkKE1jU2VsZWN0U2VhcmNoLCB7IHN0YXRpYzogZmFsc2UgfSkgc2VhcmNoOiBNY1NlbGVjdFNlYXJjaDtcblxuICAgIEBJbnB1dCgpIGhpZGRlbkl0ZW1zVGV4dDogc3RyaW5nID0gJy4uLtC10YnRkSc7XG5cbiAgICAvKiogQ2xhc3NlcyB0byBiZSBwYXNzZWQgdG8gdGhlIHNlbGVjdCBwYW5lbC4gU3VwcG9ydHMgdGhlIHNhbWUgc3ludGF4IGFzIGBuZ0NsYXNzYC4gKi9cbiAgICBASW5wdXQoKSBwYW5lbENsYXNzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+IHwgeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcblxuICAgIC8qKiBPYmplY3QgdXNlZCB0byBjb250cm9sIHdoZW4gZXJyb3IgbWVzc2FnZXMgYXJlIHNob3duLiAqL1xuICAgIEBJbnB1dCgpIGVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcjtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHVzZWQgdG8gc29ydCB0aGUgdmFsdWVzIGluIGEgc2VsZWN0IGluIG11bHRpcGxlIG1vZGUuXG4gICAgICogRm9sbG93cyB0aGUgc2FtZSBsb2dpYyBhcyBgQXJyYXkucHJvdG90eXBlLnNvcnRgLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHNvcnRDb21wYXJhdG9yOiAoYTogTWNPcHRpb24sIGI6IE1jT3B0aW9uLCBvcHRpb25zOiBNY09wdGlvbltdKSA9PiBudW1iZXI7XG5cbiAgICAvKiogQ29tYmluZWQgc3RyZWFtIG9mIGFsbCBvZiB0aGUgY2hpbGQgb3B0aW9ucycgY2hhbmdlIGV2ZW50cy4gKi9cbiAgICByZWFkb25seSBvcHRpb25TZWxlY3Rpb25DaGFuZ2VzOiBPYnNlcnZhYmxlPE1jT3B0aW9uU2VsZWN0aW9uQ2hhbmdlPiA9IGRlZmVyKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIG1lcmdlKFxuICAgICAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gb3B0aW9uLm9uU2VsZWN0aW9uQ2hhbmdlKSxcbiAgICAgICAgICAgICAgICAuLi50aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdGVkLm1hcCgob3B0aW9uKSA9PiBvcHRpb24ub25TZWxlY3Rpb25DaGFuZ2UpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX25nWm9uZS5vblN0YWJsZVxuICAgICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpLCBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5vcHRpb25TZWxlY3Rpb25DaGFuZ2VzKSk7XG4gICAgfSkgYXMgT2JzZXJ2YWJsZTxNY09wdGlvblNlbGVjdGlvbkNoYW5nZT47XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3QgcGFuZWwgaGFzIGJlZW4gdG9nZ2xlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgb3BlbmVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3QgaGFzIGJlZW4gb3BlbmVkLiAqL1xuICAgIEBPdXRwdXQoJ29wZW5lZCcpIHJlYWRvbmx5IG9wZW5lZFN0cmVhbTogT2JzZXJ2YWJsZTx2b2lkPiA9XG4gICAgICAgIHRoaXMub3BlbmVkQ2hhbmdlLnBpcGUoZmlsdGVyKChvKSA9PiBvKSwgbWFwKCgpID0+IHt9KSk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3QgaGFzIGJlZW4gY2xvc2VkLiAqL1xuICAgIEBPdXRwdXQoJ2Nsb3NlZCcpIHJlYWRvbmx5IGNsb3NlZFN0cmVhbTogT2JzZXJ2YWJsZTx2b2lkPiA9XG4gICAgICAgIHRoaXMub3BlbmVkQ2hhbmdlLnBpcGUoZmlsdGVyKChvKSA9PiAhbyksIG1hcCgoKSA9PiB7fSkpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0ZWQgdmFsdWUgaGFzIGJlZW4gY2hhbmdlZCBieSB0aGUgdXNlci4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TWNTZWxlY3RDaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxNY1NlbGVjdENoYW5nZT4oKTtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IHRoYXQgZW1pdHMgd2hlbmV2ZXIgdGhlIHJhdyB2YWx1ZSBvZiB0aGUgc2VsZWN0IGNoYW5nZXMuIFRoaXMgaXMgaGVyZSBwcmltYXJpbHlcbiAgICAgKiB0byBmYWNpbGl0YXRlIHRoZSB0d28td2F5IGJpbmRpbmcgZm9yIHRoZSBgdmFsdWVgIGlucHV0LlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBwbGFjZWhvbGRlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGxhY2Vob2xkZXI7XG4gICAgfVxuXG4gICAgc2V0IHBsYWNlaG9sZGVyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXIgPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7XG4gICAgfVxuXG4gICAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG11bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbXVsdGlwbGU7XG4gICAgfVxuXG4gICAgc2V0IG11bHRpcGxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGVsKSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRNY1NlbGVjdER5bmFtaWNNdWx0aXBsZUVycm9yKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9tdWx0aXBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGNvbXBhcmUgdGhlIG9wdGlvbiB2YWx1ZXMgd2l0aCB0aGUgc2VsZWN0ZWQgdmFsdWVzLiBUaGUgZmlyc3QgYXJndW1lbnRcbiAgICAgKiBpcyBhIHZhbHVlIGZyb20gYW4gb3B0aW9uLiBUaGUgc2Vjb25kIGlzIGEgdmFsdWUgZnJvbSB0aGUgc2VsZWN0aW9uLiBBIGJvb2xlYW5cbiAgICAgKiBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgY29tcGFyZVdpdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wYXJlV2l0aDtcbiAgICB9XG5cbiAgICBzZXQgY29tcGFyZVdpdGgoZm46IChvMTogYW55LCBvMjogYW55KSA9PiBib29sZWFuKSB7XG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpzdHJpY3QtdHlwZS1wcmVkaWNhdGVzICovXG4gICAgICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IGdldE1jU2VsZWN0Tm9uRnVuY3Rpb25WYWx1ZUVycm9yKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb21wYXJlV2l0aCA9IGZuO1xuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGVsKSB7XG4gICAgICAgICAgICAvLyBBIGRpZmZlcmVudCBjb21wYXJhdG9yIG1lYW5zIHRoZSBzZWxlY3Rpb24gY291bGQgY2hhbmdlLlxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVmFsdWUgb2YgdGhlIHNlbGVjdCBjb250cm9sLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUobmV3VmFsdWU6IGFueSkge1xuICAgICAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMuX3ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLndyaXRlVmFsdWUobmV3VmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3ZhbHVlOiBhbnk7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBpZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfVxuXG4gICAgc2V0IGlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faWQgPSB2YWx1ZSB8fCB0aGlzLnVpZDtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lkOiBzdHJpbmc7XG5cbiAgICAvKiogV2hldGhlciB0aGUgc2VsZWN0IGlzIGZvY3VzZWQuICovXG4gICAgZ2V0IGZvY3VzZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mb2N1c2VkIHx8IHRoaXMuX3BhbmVsT3BlbjtcbiAgICB9XG5cbiAgICBzZXQgZm9jdXNlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9mb2N1c2VkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZm9jdXNlZCA9IGZhbHNlO1xuXG4gICAgZ2V0IHBhbmVsT3BlbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhbmVsT3BlbjtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9wYW5lbE9wZW4gPSBmYWxzZTtcblxuICAgIGdldCBpc0VtcHR5U2VhcmNoUmVzdWx0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2ggJiYgdGhpcy5vcHRpb25zLmxlbmd0aCA9PT0gMCAmJiAhIXRoaXMuc2VhcmNoLmlucHV0LnZhbHVlO1xuICAgIH1cblxuICAgIGdldCBjYW5TaG93Q2xlYW5lcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xlYW5lciAmJiB0aGlzLnNlbGVjdGlvbk1vZGVsLmhhc1ZhbHVlKCk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBzY3JvbGwgcG9zaXRpb24gb2YgdGhlIG92ZXJsYXkgcGFuZWwsIGNhbGN1bGF0ZWQgdG8gY2VudGVyIHRoZSBzZWxlY3RlZCBvcHRpb24uICovXG4gICAgcHJpdmF0ZSBzY3JvbGxUb3AgPSAwO1xuXG4gICAgLyoqIFVuaXF1ZSBpZCBmb3IgdGhpcyBpbnB1dC4gKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IHVpZCA9IGBtYy1zZWxlY3QtJHtuZXh0VW5pcXVlSWQrK31gO1xuXG4gICAgLyoqIEVtaXRzIHdoZW5ldmVyIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkLiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfdmlld3BvcnRSdWxlcjogVmlld3BvcnRSdWxlcixcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChOR19WQUxJREFUT1JTKSBwdWJsaWMgcmF3VmFsaWRhdG9yczogVmFsaWRhdG9yW10sXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcmVhZG9ubHkgX2RpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgIEBPcHRpb25hbCgpIHBhcmVudEZvcm06IE5nRm9ybSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcmVhZG9ubHkgX3BhcmVudEZvcm1GaWVsZDogTWNGb3JtRmllbGQsXG4gICAgICAgIEBTZWxmKCkgQE9wdGlvbmFsKCkgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIG5nTW9kZWw6IE5nTW9kZWwsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIGZvcm1Db250cm9sTmFtZTogRm9ybUNvbnRyb2xOYW1lLFxuICAgICAgICBASW5qZWN0KE1DX1NFTEVDVF9TQ1JPTExfU1RSQVRFR1kpIHByaXZhdGUgcmVhZG9ubHkgX3Njcm9sbFN0cmF0ZWd5RmFjdG9yeSxcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQ19WQUxJREFUSU9OKSBwcml2YXRlIG1jVmFsaWRhdGlvbjogTWNWYWxpZGF0aW9uT3B0aW9uc1xuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmLCBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXIsIHBhcmVudEZvcm0sIHBhcmVudEZvcm1Hcm91cCwgbmdDb250cm9sKTtcblxuICAgICAgICBpZiAodGhpcy5uZ0NvbnRyb2wpIHtcbiAgICAgICAgICAgIC8vIE5vdGU6IHdlIHByb3ZpZGUgdGhlIHZhbHVlIGFjY2Vzc29yIHRocm91Z2ggaGVyZSwgaW5zdGVhZCBvZlxuICAgICAgICAgICAgLy8gdGhlIGBwcm92aWRlcnNgIHRvIGF2b2lkIHJ1bm5pbmcgaW50byBhIGNpcmN1bGFyIGltcG9ydC5cbiAgICAgICAgICAgIHRoaXMubmdDb250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRm9yY2Ugc2V0dGVyIHRvIGJlIGNhbGxlZCBpbiBjYXNlIGlkIHdhcyBub3Qgc3BlY2lmaWVkLlxuICAgICAgICB0aGlzLmlkID0gdGhpcy5pZDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbCA9IG5ldyBTZWxlY3Rpb25Nb2RlbDxNY09wdGlvbj4odGhpcy5tdWx0aXBsZSk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcblxuICAgICAgICAvLyBXZSBuZWVkIGBkaXN0aW5jdFVudGlsQ2hhbmdlZGAgaGVyZSwgYmVjYXVzZSBzb21lIGJyb3dzZXJzIHdpbGxcbiAgICAgICAgLy8gZmlyZSB0aGUgYW5pbWF0aW9uIGVuZCBldmVudCB0d2ljZSBmb3IgdGhlIHNhbWUgYW5pbWF0aW9uLiBTZWU6XG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzI0MDg0XG4gICAgICAgIHRoaXMucGFuZWxEb25lQW5pbWF0aW5nU3RyZWFtXG4gICAgICAgICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLCB0YWtlVW50aWwodGhpcy5kZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvcCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbmVkQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFuZWxEb25lQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheURpci5vZmZzZXRYID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICBpZiAodGhpcy5tY1ZhbGlkYXRpb24udXNlVmFsaWRhdGlvbikge1xuICAgICAgICAgICAgc2V0TW9zYWljVmFsaWRhdGlvbih0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5pdEtleU1hbmFnZXIoKTtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmNoYW5nZWRcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBldmVudC5hZGRlZC5mb3JFYWNoKChvcHRpb24pID0+IG9wdGlvbi5zZWxlY3QoKSk7XG4gICAgICAgICAgICAgICAgZXZlbnQucmVtb3ZlZC5mb3JFYWNoKChvcHRpb24pID0+IG9wdGlvbi5kZXNlbGVjdCgpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub3B0aW9ucy5jaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShzdGFydFdpdGgobnVsbCksIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldE9wdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YWdzLmNoYW5nZXNcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jYWxjdWxhdGVIaWRkZW5JdGVtcygpLCAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgaWYgKHRoaXMubmdDb250cm9sKSB7IHRoaXMudXBkYXRlRXJyb3JTdGF0ZSgpOyB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICAvLyBVcGRhdGluZyB0aGUgZGlzYWJsZWQgc3RhdGUgaXMgaGFuZGxlZCBieSBgbWl4aW5EaXNhYmxlZGAsIGJ1dCB3ZSBuZWVkIHRvIGFkZGl0aW9uYWxseSBsZXRcbiAgICAgICAgLy8gdGhlIHBhcmVudCBmb3JtIGZpZWxkIGtub3cgdG8gcnVuIGNoYW5nZSBkZXRlY3Rpb24gd2hlbiB0aGUgZGlzYWJsZWQgc3RhdGUgY2hhbmdlcy5cbiAgICAgICAgaWYgKGNoYW5nZXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLmRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGhpZGRlbkl0ZW1zVGV4dEZvcm1hdHRlcihoaWRkZW5JdGVtc1RleHQ6IHN0cmluZywgaGlkZGVuSXRlbXM6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHtoaWRkZW5JdGVtc1RleHR9ICR7aGlkZGVuSXRlbXN9YDtcbiAgICB9XG5cbiAgICBjbGVhclZhbHVlKCRldmVudCk6IHZvaWQge1xuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbSgtMSk7XG5cbiAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgLyoqIGBWaWV3IC0+IG1vZGVsIGNhbGxiYWNrIGNhbGxlZCB3aGVuIHZhbHVlIGNoYW5nZXNgICovXG4gICAgb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgICAvKiogYFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gc2VsZWN0IGhhcyBiZWVuIHRvdWNoZWRgICovXG4gICAgb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgICByZXNldFNlYXJjaCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaC5yZXNldCgpO1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIHRvZG8gdGhlIGluY29ycmVjdCBiZWhhdmlvdXIgb2Yga2V5TWFuYWdlciBpcyBwb3NzaWJsZSBoZXJlXG4gICAgICAgICAgICB0byBhdm9pZCBmaXJzdCBpdGVtIHNlbGVjdGlvbiAodG8gcHJvdmlkZSBjb3JyZWN0IG9wdGlvbnMgZmxpcHBpbmcgb24gY2xvc2VkIHNlbGVjdClcbiAgICAgICAgICAgIHdlIHNob3VsZCBwcm9jZXNzIG9wdGlvbnMgdXBkYXRlIGxpa2UgaXQgaXMgdGhlIGZpcnN0IG9wdGlvbnMgYXBwZWFyYW5jZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnNlYXJjaC5pc1NlYXJjaENoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBUb2dnbGVzIHRoZSBvdmVybGF5IHBhbmVsIG9wZW4gb3IgY2xvc2VkLiAqL1xuICAgIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBPcGVucyB0aGUgb3ZlcmxheSBwYW5lbC4gKi9cbiAgICBvcGVuKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAhdGhpcy5vcHRpb25zIHx8ICF0aGlzLm9wdGlvbnMubGVuZ3RoIHx8IHRoaXMuX3BhbmVsT3BlbikgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnRyaWdnZXJSZWN0ID0gdGhpcy50cmlnZ2VyLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIC8vIE5vdGU6IFRoZSBjb21wdXRlZCBmb250LXNpemUgd2lsbCBiZSBhIHN0cmluZyBwaXhlbCB2YWx1ZSAoZS5nLiBcIjE2cHhcIikuXG4gICAgICAgIC8vIGBwYXJzZUludGAgaWdub3JlcyB0aGUgdHJhaWxpbmcgJ3B4JyBhbmQgY29udmVydHMgdGhpcyB0byBhIG51bWJlci5cbiAgICAgICAgdGhpcy50cmlnZ2VyRm9udFNpemUgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKHRoaXMudHJpZ2dlci5uYXRpdmVFbGVtZW50KVsnZm9udC1zaXplJ10pO1xuXG4gICAgICAgIHRoaXMuX3BhbmVsT3BlbiA9IHRydWU7XG4gICAgICAgIHRoaXMua2V5TWFuYWdlci53aXRoSG9yaXpvbnRhbE9yaWVudGF0aW9uKG51bGwpO1xuICAgICAgICB0aGlzLmhpZ2hsaWdodENvcnJlY3RPcHRpb24oKTtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgICAgLy8gU2V0IHRoZSBmb250IHNpemUgb24gdGhlIHBhbmVsIGVsZW1lbnQgb25jZSBpdCBleGlzdHMuXG4gICAgICAgIHRoaXMuX25nWm9uZS5vblN0YWJsZS5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWdnZXJGb250U2l6ZSAmJiB0aGlzLm92ZXJsYXlEaXIub3ZlcmxheVJlZiAmJiB0aGlzLm92ZXJsYXlEaXIub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlEaXIub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IGAke3RoaXMudHJpZ2dlckZvbnRTaXplfXB4YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogQ2xvc2VzIHRoZSBvdmVybGF5IHBhbmVsIGFuZCBmb2N1c2VzIHRoZSBob3N0IGVsZW1lbnQuICovXG4gICAgY2xvc2UoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fcGFuZWxPcGVuKSB7IHJldHVybjsgfVxuXG4gICAgICAgIC8vIHRoZSBvcmRlciBvZiBjYWxscyBpcyBpbXBvcnRhbnRcbiAgICAgICAgdGhpcy5yZXNldFNlYXJjaCgpO1xuICAgICAgICB0aGlzLl9wYW5lbE9wZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24odGhpcy5pc1J0bCgpID8gJ3J0bCcgOiAnbHRyJyk7XG5cbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgc2VsZWN0J3MgdmFsdWUuIFBhcnQgb2YgdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICAgICAqIHJlcXVpcmVkIHRvIGludGVncmF0ZSB3aXRoIEFuZ3VsYXIncyBjb3JlIGZvcm1zIEFQSS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZSBOZXcgdmFsdWUgdG8gYmUgd3JpdHRlbiB0byB0aGUgbW9kZWwuXG4gICAgICovXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uQnlWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTYXZlcyBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgd2hlbiB0aGUgc2VsZWN0J3MgdmFsdWVcbiAgICAgKiBjaGFuZ2VzIGZyb20gdXNlciBpbnB1dC4gUGFydCBvZiB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gICAgICogcmVxdWlyZWQgdG8gaW50ZWdyYXRlIHdpdGggQW5ndWxhcidzIGNvcmUgZm9ybXMgQVBJLlxuICAgICAqXG4gICAgICogQHBhcmFtIGZuIENhbGxiYWNrIHRvIGJlIHRyaWdnZXJlZCB3aGVuIHRoZSB2YWx1ZSBjaGFuZ2VzLlxuICAgICAqL1xuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTYXZlcyBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgd2hlbiB0aGUgc2VsZWN0IGlzIGJsdXJyZWRcbiAgICAgKiBieSB0aGUgdXNlci4gUGFydCBvZiB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlIHJlcXVpcmVkXG4gICAgICogdG8gaW50ZWdyYXRlIHdpdGggQW5ndWxhcidzIGNvcmUgZm9ybXMgQVBJLlxuICAgICAqXG4gICAgICogQHBhcmFtIGZuIENhbGxiYWNrIHRvIGJlIHRyaWdnZXJlZCB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gdG91Y2hlZC5cbiAgICAgKi9cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNhYmxlcyB0aGUgc2VsZWN0LiBQYXJ0IG9mIHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2UgcmVxdWlyZWRcbiAgICAgKiB0byBpbnRlZ3JhdGUgd2l0aCBBbmd1bGFyJ3MgY29yZSBmb3JtcyBBUEkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaXNEaXNhYmxlZCBTZXRzIHdoZXRoZXIgdGhlIGNvbXBvbmVudCBpcyBkaXNhYmxlZC5cbiAgICAgKi9cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGVkKCk6IE1jT3B0aW9uIHwgTWNPcHRpb25bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlID8gdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZCA6IHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF07XG4gICAgfVxuXG4gICAgZ2V0IHRyaWdnZXJWYWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5lbXB0eSkgeyByZXR1cm4gJyc7IH1cblxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZFswXS52aWV3VmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHRyaWdnZXJWYWx1ZXMoKTogTWNPcHRpb25bXSB7XG4gICAgICAgIGlmICh0aGlzLmVtcHR5KSB7IHJldHVybiBbXTsgfVxuXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9ucyA9IHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWQ7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNSdGwoKSkgeyBzZWxlY3RlZE9wdGlvbnMucmV2ZXJzZSgpOyB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkT3B0aW9ucztcbiAgICB9XG5cbiAgICBnZXQgZW1wdHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5zZWxlY3Rpb25Nb2RlbCB8fCB0aGlzLnNlbGVjdGlvbk1vZGVsLmlzRW1wdHkoKTtcbiAgICB9XG5cbiAgICBpc1J0bCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpciA/IHRoaXMuX2Rpci52YWx1ZSA9PT0gJ3J0bCcgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVPcGVuS2V5ZG93bihldmVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2xvc2VkS2V5ZG93bihldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHRoZSBwYW5lbCBjb250ZW50IGlzIGRvbmUgZmFkaW5nIGluLCB0aGUgcGFuZWxEb25lQW5pbWF0aW5nIHByb3BlcnR5IGlzXG4gICAgICogc2V0IHNvIHRoZSBwcm9wZXIgY2xhc3MgY2FuIGJlIGFkZGVkIHRvIHRoZSBwYW5lbC5cbiAgICAgKi9cbiAgICBvbkZhZGVJbkRvbmUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGFuZWxEb25lQW5pbWF0aW5nID0gdGhpcy5wYW5lbE9wZW47XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaCAmJiB0aGlzLl9wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkZvY3VzKCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyB0aGUgdG91Y2hlZCBjYWxsYmFjayBvbmx5IGlmIHRoZSBwYW5lbCBpcyBjbG9zZWQuIE90aGVyd2lzZSwgdGhlIHRyaWdnZXIgd2lsbFxuICAgICAqIFwiYmx1clwiIHRvIHRoZSBwYW5lbCB3aGVuIGl0IG9wZW5zLCBjYXVzaW5nIGEgZmFsc2UgcG9zaXRpdmUuXG4gICAgICovXG4gICAgb25CbHVyKCkge1xuICAgICAgICB0aGlzLl9mb2N1c2VkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkICYmICF0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdGhhdCBpcyBpbnZva2VkIHdoZW4gdGhlIG92ZXJsYXkgcGFuZWwgaGFzIGJlZW4gYXR0YWNoZWQuXG4gICAgICovXG4gICAgb25BdHRhY2hlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vdmVybGF5RGlyLnBvc2l0aW9uQ2hhbmdlXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlT3ZlcmxheU9mZnNldFgoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNDb250YWluZXIubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSB0aGlzLnNjcm9sbFRvcDtcblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2Nyb2xsU2l6ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgdGhlIHRoZW1lIHRvIGJlIHVzZWQgb24gdGhlIHBhbmVsLiAqL1xuICAgIGdldFBhbmVsVGhlbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudEZvcm1GaWVsZCA/IGBtYy0ke3RoaXMuX3BhcmVudEZvcm1GaWVsZC5jb2xvcn1gIDogJyc7XG4gICAgfVxuXG4gICAgLyoqIEZvY3VzZXMgdGhlIHNlbGVjdCBlbGVtZW50LiAqL1xuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBvbkNvbnRhaW5lckNsaWNrKCkge1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cblxuICAgIC8qKiBJbnZva2VkIHdoZW4gYW4gb3B0aW9uIGlzIGNsaWNrZWQuICovXG4gICAgb25SZW1vdmVNYXRjaGVySXRlbShvcHRpb246IE1jT3B0aW9uLCAkZXZlbnQpOiB2b2lkIHtcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIG9wdGlvbi5kZXNlbGVjdCgpO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZUhpZGRlbkl0ZW1zKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jdXN0b21UcmlnZ2VyIHx8IHRoaXMuZW1wdHkgfHwgIXRoaXMubXVsdGlwbGUpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgbGV0IHZpc2libGVJdGVtczogbnVtYmVyID0gMDtcbiAgICAgICAgY29uc3QgdG90YWxJdGVtc1dpZHRoID0gdGhpcy5nZXRUb3RhbEl0ZW1zV2lkdGhJbk1hdGNoZXIoKTtcbiAgICAgICAgbGV0IHRvdGFsVmlzaWJsZUl0ZW1zV2lkdGg6IG51bWJlciA9IDA7XG5cbiAgICAgICAgdGhpcy50YWdzLmZvckVhY2goKHRhZykgPT4ge1xuICAgICAgICAgICAgaWYgKHRhZy5uYXRpdmVFbGVtZW50Lm9mZnNldFRvcCA8IHRhZy5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCkge1xuICAgICAgICAgICAgICAgIHRvdGFsVmlzaWJsZUl0ZW1zV2lkdGggKz0gdGhpcy5nZXRJdGVtV2lkdGgodGFnLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHZpc2libGVJdGVtcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmhpZGRlbkl0ZW1zID0gKHRoaXMuc2VsZWN0ZWQgYXMgQXJyYXlMaWtlPE1jT3B0aW9uPikubGVuZ3RoIC0gdmlzaWJsZUl0ZW1zO1xuXG4gICAgICAgIGlmICh0aGlzLmhpZGRlbkl0ZW1zKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtc0NvdW50ZXIgPSB0aGlzLnRyaWdnZXIubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWMtc2VsZWN0X19tYXRjaC1oaWRkZW4tdGV4dCcpO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlckxpc3QgPSB0aGlzLnRyaWdnZXIubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWMtc2VsZWN0X19tYXRjaC1saXN0Jyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zQ291bnRlclNob3dlZCA9IGl0ZW1zQ291bnRlci5vZmZzZXRUb3AgPCBpdGVtc0NvdW50ZXIub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgLy8gY29uc3QgaXRlbXNDb3VudGVyV2lkdGg6IG51bWJlciA9IGl0ZW1zQ291bnRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zQ291bnRlcldpZHRoOiBudW1iZXIgPSA4NjtcblxuICAgICAgICAgICAgY29uc3QgbWF0Y2hlckxpc3RXaWR0aDogbnVtYmVyID0gbWF0Y2hlckxpc3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVyV2lkdGg6IG51bWJlciA9IG1hdGNoZXJMaXN0V2lkdGggKyBpdGVtc0NvdW50ZXJXaWR0aDtcblxuICAgICAgICAgICAgaWYgKGl0ZW1zQ291bnRlclNob3dlZCAmJiAodG90YWxJdGVtc1dpZHRoIDwgbWF0Y2hlcldpZHRoKSkgeyB0aGlzLmhpZGRlbkl0ZW1zID0gMDsgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdG90YWxWaXNpYmxlSXRlbXNXaWR0aCA9PT0gbWF0Y2hlckxpc3RXaWR0aCB8fFxuICAgICAgICAgICAgICAgICh0b3RhbFZpc2libGVJdGVtc1dpZHRoICsgaXRlbXNDb3VudGVyV2lkdGgpIDwgbWF0Y2hlckxpc3RXaWR0aFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghaXRlbXNDb3VudGVyU2hvd2VkICYmICh0b3RhbEl0ZW1zV2lkdGggKyBpdGVtc0NvdW50ZXJXaWR0aCkgPiBtYXRjaGVyV2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkl0ZW1zKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBnZXRJdGVtSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZmlyc3QgPyB0aGlzLm9wdGlvbnMuZmlyc3QuZ2V0SGVpZ2h0KCkgOiAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SGVpZ2h0T2ZPcHRpb25zQ29udGFpbmVyKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnNDb250YWluZXIubmF0aXZlRWxlbWVudC5nZXRDbGllbnRSZWN0cygpWzBdLmhlaWdodDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVNjcm9sbFNpemUoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLmZpcnN0KSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMua2V5TWFuYWdlci53aXRoU2Nyb2xsU2l6ZShcbiAgICAgICAgICAgIE1hdGguZmxvb3IodGhpcy5nZXRIZWlnaHRPZk9wdGlvbnNDb250YWluZXIoKSAvIHRoaXMub3B0aW9ucy5maXJzdC5nZXRIZWlnaHQoKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRvdGFsSXRlbXNXaWR0aEluTWF0Y2hlcigpOiBudW1iZXIge1xuICAgICAgICBjb25zdCB0cmlnZ2VyQ2xvbmUgPSB0aGlzLnRyaWdnZXIubmF0aXZlRWxlbWVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIHRyaWdnZXJDbG9uZS5xdWVyeVNlbGVjdG9yKCcubWMtc2VsZWN0X19tYXRjaC1oaWRkZW4tdGV4dCcpLnJlbW92ZSgpO1xuXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRyaWdnZXJDbG9uZSwgJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRyaWdnZXJDbG9uZSwgJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRyaWdnZXJDbG9uZSwgJ3RvcCcsICctMTAwJScpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0cmlnZ2VyQ2xvbmUsICdsZWZ0JywgJzAnKTtcblxuICAgICAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLnRyaWdnZXIubmF0aXZlRWxlbWVudCwgdHJpZ2dlckNsb25lKTtcblxuICAgICAgICBsZXQgdG90YWxJdGVtc1dpZHRoOiBudW1iZXIgPSAwO1xuICAgICAgICB0cmlnZ2VyQ2xvbmUucXVlcnlTZWxlY3RvckFsbCgnbWMtdGFnJykuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdG90YWxJdGVtc1dpZHRoICs9IHRoaXMuZ2V0SXRlbVdpZHRoKGl0ZW0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0cmlnZ2VyQ2xvbmUucmVtb3ZlKCk7XG5cbiAgICAgICAgcmV0dXJuIHRvdGFsSXRlbXNXaWR0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEl0ZW1XaWR0aChlbGVtZW50OiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcblxuICAgICAgICBjb25zdCB3aWR0aDogbnVtYmVyID0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS53aWR0aCBhcyBzdHJpbmcpO1xuICAgICAgICBjb25zdCBtYXJnaW5MZWZ0OiBudW1iZXIgPSBwYXJzZUludChjb21wdXRlZFN0eWxlLm1hcmdpbkxlZnQgYXMgc3RyaW5nKTtcbiAgICAgICAgY29uc3QgbWFyZ2luUmlnaHQ6IG51bWJlciA9IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUubWFyZ2luUmlnaHQgYXMgc3RyaW5nKTtcblxuICAgICAgICByZXR1cm4gd2lkdGggKyBtYXJnaW5MZWZ0ICsgbWFyZ2luUmlnaHQ7XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMga2V5Ym9hcmQgZXZlbnRzIHdoaWxlIHRoZSBzZWxlY3QgaXMgY2xvc2VkLiAqL1xuICAgIHByaXZhdGUgaGFuZGxlQ2xvc2VkS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgKi9cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG4gICAgICAgIGNvbnN0IGlzQXJyb3dLZXkgPSBrZXlDb2RlID09PSBET1dOX0FSUk9XIHx8IGtleUNvZGUgPT09IFVQX0FSUk9XIHx8XG4gICAgICAgICAgICBrZXlDb2RlID09PSBMRUZUX0FSUk9XIHx8IGtleUNvZGUgPT09IFJJR0hUX0FSUk9XO1xuICAgICAgICBjb25zdCBpc09wZW5LZXkgPSBrZXlDb2RlID09PSBFTlRFUiB8fCBrZXlDb2RlID09PSBTUEFDRTtcblxuICAgICAgICAvLyBPcGVuIHRoZSBzZWxlY3Qgb24gQUxUICsgYXJyb3cga2V5IHRvIG1hdGNoIHRoZSBuYXRpdmUgPHNlbGVjdD5cbiAgICAgICAgaWYgKGlzT3BlbktleSB8fCAoKHRoaXMubXVsdGlwbGUgfHwgZXZlbnQuYWx0S2V5KSAmJiBpc0Fycm93S2V5KSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudHMgdGhlIHBhZ2UgZnJvbSBzY3JvbGxpbmcgZG93biB3aGVuIHByZXNzaW5nIHNwYWNlXG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyBrZXlib2FyZCBldmVudHMgd2hlbiB0aGUgc2VsZWN0ZWQgaXMgb3Blbi4gKi9cbiAgICBwcml2YXRlIGhhbmRsZU9wZW5LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSAqL1xuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcbiAgICAgICAgY29uc3QgaXNBcnJvd0tleSA9IGtleUNvZGUgPT09IERPV05fQVJST1cgfHwga2V5Q29kZSA9PT0gVVBfQVJST1c7XG4gICAgICAgIGNvbnN0IG1hbmFnZXIgPSB0aGlzLmtleU1hbmFnZXI7XG5cbiAgICAgICAgaWYgKGlzQXJyb3dLZXkgJiYgZXZlbnQuYWx0S2V5KSB7XG4gICAgICAgICAgICAvLyBDbG9zZSB0aGUgc2VsZWN0IG9uIEFMVCArIGFycm93IGtleSB0byBtYXRjaCB0aGUgbmF0aXZlIDxzZWxlY3Q+XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IEhPTUUpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIG1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gRU5EKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBtYW5hZ2VyLnNldExhc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gUEFHRV9VUCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgbWFuYWdlci5zZXRQcmV2aW91c1BhZ2VJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gUEFHRV9ET1dOKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBtYW5hZ2VyLnNldE5leHRQYWdlSXRlbUFjdGl2ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKChrZXlDb2RlID09PSBFTlRFUiB8fCBrZXlDb2RlID09PSBTUEFDRSkgJiYgbWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbWFuYWdlci5hY3RpdmVJdGVtLnNlbGVjdFZpYUludGVyYWN0aW9uKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbXVsdGlwbGUgJiYga2V5Q29kZSA9PT0gQSAmJiBldmVudC5jdHJsS2V5KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgaGFzRGVzZWxlY3RlZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiAhb3B0aW9uLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzRGVzZWxlY3RlZE9wdGlvbnMgJiYgIW9wdGlvbi5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb24uc2VsZWN0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c2x5Rm9jdXNlZEluZGV4ID0gbWFuYWdlci5hY3RpdmVJdGVtSW5kZXg7XG5cbiAgICAgICAgICAgIG1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX211bHRpcGxlICYmIGlzQXJyb3dLZXkgJiYgZXZlbnQuc2hpZnRLZXkgJiYgbWFuYWdlci5hY3RpdmVJdGVtICYmXG4gICAgICAgICAgICAgICAgbWFuYWdlci5hY3RpdmVJdGVtSW5kZXggIT09IHByZXZpb3VzbHlGb2N1c2VkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBtYW5hZ2VyLmFjdGl2ZUl0ZW0uc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZVNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICAgICAgLy8gRGVmZXIgc2V0dGluZyB0aGUgdmFsdWUgaW4gb3JkZXIgdG8gYXZvaWQgdGhlIFwiRXhwcmVzc2lvblxuICAgICAgICAvLyBoYXMgY2hhbmdlZCBhZnRlciBpdCB3YXMgY2hlY2tlZFwiIGVycm9ycyBmcm9tIEFuZ3VsYXIuXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25CeVZhbHVlKHRoaXMubmdDb250cm9sID8gdGhpcy5uZ0NvbnRyb2wudmFsdWUgOiB0aGlzLl92YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHNlbGVjdGVkIG9wdGlvbiBiYXNlZCBvbiBhIHZhbHVlLiBJZiBubyBvcHRpb24gY2FuIGJlXG4gICAgICogZm91bmQgd2l0aCB0aGUgZGVzaWduYXRlZCB2YWx1ZSwgdGhlIHNlbGVjdCB0cmlnZ2VyIGlzIGNsZWFyZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRTZWxlY3Rpb25CeVZhbHVlKHZhbHVlOiBhbnkgfCBhbnlbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLnByZXZpb3VzU2VsZWN0aW9uTW9kZWxTZWxlY3RlZCA9IHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWQ7XG5cbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBnZXRNY1NlbGVjdE5vbkFycmF5VmFsdWVFcnJvcigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKChjdXJyZW50VmFsdWU6IGFueSkgPT4gdGhpcy5zZWxlY3RWYWx1ZShjdXJyZW50VmFsdWUpKTtcbiAgICAgICAgICAgIHRoaXMuc29ydFZhbHVlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuICAgICAgICAgICAgY29uc3QgY29ycmVzcG9uZGluZ09wdGlvbiA9IHRoaXMuc2VsZWN0VmFsdWUodmFsdWUpO1xuXG4gICAgICAgICAgICAvLyBTaGlmdCBmb2N1cyB0byB0aGUgYWN0aXZlIGl0ZW0uIE5vdGUgdGhhdCB3ZSBzaG91bGRuJ3QgZG8gdGhpcyBpbiBtdWx0aXBsZVxuICAgICAgICAgICAgLy8gbW9kZSwgYmVjYXVzZSB3ZSBkb24ndCBrbm93IHdoYXQgb3B0aW9uIHRoZSB1c2VyIGludGVyYWN0ZWQgd2l0aCBsYXN0LlxuICAgICAgICAgICAgaWYgKGNvcnJlc3BvbmRpbmdPcHRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShjb3JyZXNwb25kaW5nT3B0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q29ycmVzcG9uZE9wdGlvbih2YWx1ZTogYW55KTogTWNPcHRpb24gfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLnRvQXJyYXkoKSxcbiAgICAgICAgICAgIC4uLnRoaXMucHJldmlvdXNTZWxlY3Rpb25Nb2RlbFNlbGVjdGVkXG4gICAgICAgIF0uZmluZCgob3B0aW9uOiBNY09wdGlvbikgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAvLyBUcmVhdCBudWxsIGFzIGEgc3BlY2lhbCByZXNldCB2YWx1ZS5cbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uLnZhbHVlICE9IG51bGwgJiYgdGhpcy5jb21wYXJlV2l0aChvcHRpb24udmFsdWUsIHZhbHVlKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5vdGlmeSBkZXZlbG9wZXJzIG9mIGVycm9ycyBpbiB0aGVpciBjb21wYXJhdG9yLlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZHMgYW5kIHNlbGVjdHMgYW5kIG9wdGlvbiBiYXNlZCBvbiBpdHMgdmFsdWUuXG4gICAgICogQHJldHVybnMgT3B0aW9uIHRoYXQgaGFzIHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlLlxuICAgICAqL1xuICAgIHByaXZhdGUgc2VsZWN0VmFsdWUodmFsdWU6IGFueSk6IE1jT3B0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgY29uc3QgY29ycmVzcG9uZGluZ09wdGlvbiA9IHRoaXMuZ2V0Q29ycmVzcG9uZE9wdGlvbih2YWx1ZSk7XG5cbiAgICAgICAgaWYgKGNvcnJlc3BvbmRpbmdPcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0KGNvcnJlc3BvbmRpbmdPcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvcnJlc3BvbmRpbmdPcHRpb247XG4gICAgfVxuXG4gICAgLyoqIFNldHMgdXAgYSBrZXkgbWFuYWdlciB0byBsaXN0ZW4gdG8ga2V5Ym9hcmQgZXZlbnRzIG9uIHRoZSBvdmVybGF5IHBhbmVsLiAqL1xuICAgIHByaXZhdGUgaW5pdEtleU1hbmFnZXIoKSB7XG4gICAgICAgIGNvbnN0IHR5cGVBaGVhZERlYm91bmNlID0gMjAwO1xuXG4gICAgICAgIHRoaXMua2V5TWFuYWdlciA9IG5ldyBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlcjxNY09wdGlvbj4odGhpcy5vcHRpb25zKVxuICAgICAgICAgICAgLndpdGhUeXBlQWhlYWQodHlwZUFoZWFkRGVib3VuY2UsIHRoaXMuc2VhcmNoID8gLTEgOiAwKVxuICAgICAgICAgICAgLndpdGhWZXJ0aWNhbE9yaWVudGF0aW9uKClcbiAgICAgICAgICAgIC53aXRoSG9yaXpvbnRhbE9yaWVudGF0aW9uKHRoaXMuaXNSdGwoKSA/ICdydGwnIDogJ2x0cicpO1xuXG4gICAgICAgIHRoaXMua2V5TWFuYWdlci50YWJPdXRcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gUmVzdG9yZSBmb2N1cyB0byB0aGUgdHJpZ2dlciBiZWZvcmUgY2xvc2luZy4gRW5zdXJlcyB0aGF0IHRoZSBmb2N1c1xuICAgICAgICAgICAgICAgIC8vIHBvc2l0aW9uIHdvbid0IGJlIGxvc3QgaWYgdGhlIHVzZXIgZ290IGZvY3VzIGludG8gdGhlIG92ZXJsYXkuXG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMua2V5TWFuYWdlci5jaGFuZ2VcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3BhbmVsT3BlbiAmJiB0aGlzLnBhbmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsQWN0aXZlT3B0aW9uSW50b1ZpZXcoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl9wYW5lbE9wZW4gJiYgIXRoaXMubXVsdGlwbGUgJiYgdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0uc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogRHJvcHMgY3VycmVudCBvcHRpb24gc3Vic2NyaXB0aW9ucyBhbmQgSURzIGFuZCByZXNldHMgZnJvbSBzY3JhdGNoLiAqL1xuICAgIHByaXZhdGUgcmVzZXRPcHRpb25zKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjaGFuZ2VkT3JEZXN0cm95ZWQgPSBtZXJnZSh0aGlzLm9wdGlvbnMuY2hhbmdlcywgdGhpcy5kZXN0cm95KTtcblxuICAgICAgICB0aGlzLm9wdGlvblNlbGVjdGlvbkNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbChjaGFuZ2VkT3JEZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0KGV2ZW50LnNvdXJjZSwgZXZlbnQuaXNVc2VySW5wdXQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VhcmNoICYmIHRoaXMuc2VhcmNoLmlzU2VhcmNoQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHRoaXMua2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2guaXNTZWFyY2hDaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmlzVXNlcklucHV0ICYmICF0aGlzLm11bHRpcGxlICYmIHRoaXMuX3BhbmVsT3Blbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBMaXN0ZW4gdG8gY2hhbmdlcyBpbiB0aGUgaW50ZXJuYWwgc3RhdGUgb2YgdGhlIG9wdGlvbnMgYW5kIHJlYWN0IGFjY29yZGluZ2x5LlxuICAgICAgICAvLyBIYW5kbGVzIGNhc2VzIGxpa2UgdGhlIGxhYmVscyBvZiB0aGUgc2VsZWN0ZWQgb3B0aW9ucyBjaGFuZ2luZy5cbiAgICAgICAgbWVyZ2UoLi4udGhpcy5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiBvcHRpb24uc3RhdGVDaGFuZ2VzKSlcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbChjaGFuZ2VkT3JEZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIEludm9rZWQgd2hlbiBhbiBvcHRpb24gaXMgY2xpY2tlZC4gKi9cbiAgICBwcml2YXRlIG9uU2VsZWN0KG9wdGlvbjogTWNPcHRpb24sIGlzVXNlcklucHV0OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHdhc1NlbGVjdGVkID0gdGhpcy5zZWxlY3Rpb25Nb2RlbC5pc1NlbGVjdGVkKG9wdGlvbik7XG5cbiAgICAgICAgaWYgKG9wdGlvbi52YWx1ZSA9PSBudWxsICYmICF0aGlzLl9tdWx0aXBsZSkge1xuICAgICAgICAgICAgb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZXMob3B0aW9uLnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdChvcHRpb24pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmRlc2VsZWN0KG9wdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc1VzZXJJbnB1dCkge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKG9wdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0VmFsdWVzKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNVc2VySW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSW4gY2FzZSB0aGUgdXNlciBzZWxlY3RlZCB0aGUgb3B0aW9uIHdpdGggdGhlaXIgbW91c2UsIHdlXG4gICAgICAgICAgICAgICAgICAgIC8vIHdhbnQgdG8gcmVzdG9yZSBmb2N1cyBiYWNrIHRvIHRoZSB0cmlnZ2VyLCBpbiBvcmRlciB0b1xuICAgICAgICAgICAgICAgICAgICAvLyBwcmV2ZW50IHRoZSBzZWxlY3Qga2V5Ym9hcmQgY29udHJvbHMgZnJvbSBjbGFzaGluZyB3aXRoXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBvbmVzIGZyb20gYG1jLW9wdGlvbmAuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHNlYXJjaCBpcyBhdmFsaWFibGUgdGhlbiB3ZSBmb2N1cyBzZWFyY2ggYWdhaW4uXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2guZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh3YXNTZWxlY3RlZCAhPT0gdGhpcy5zZWxlY3Rpb25Nb2RlbC5pc1NlbGVjdGVkKG9wdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIC8qKiBTb3J0cyB0aGUgc2VsZWN0ZWQgdmFsdWVzIGluIHRoZSBzZWxlY3RlZCBiYXNlZCBvbiB0aGVpciBvcmRlciBpbiB0aGUgcGFuZWwuICovXG4gICAgcHJpdmF0ZSBzb3J0VmFsdWVzKCkge1xuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucy50b0FycmF5KCk7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNvcnRDb21wYXJhdG9yID8gdGhpcy5zb3J0Q29tcGFyYXRvcihhLCBiLCBvcHRpb25zKSA6XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuaW5kZXhPZihhKSAtIG9wdGlvbnMuaW5kZXhPZihiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEVtaXRzIGNoYW5nZSBldmVudCB0byBzZXQgdGhlIG1vZGVsIHZhbHVlLiAqL1xuICAgIHByaXZhdGUgcHJvcGFnYXRlQ2hhbmdlcyhmYWxsYmFja1ZhbHVlPzogYW55KTogdm9pZCB7XG4gICAgICAgIGxldCB2YWx1ZVRvRW1pdDogYW55ID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgdmFsdWVUb0VtaXQgPSAodGhpcy5zZWxlY3RlZCBhcyBNY09wdGlvbltdKS5tYXAoKG9wdGlvbikgPT4gb3B0aW9uLnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlVG9FbWl0ID0gdGhpcy5zZWxlY3RlZCA/ICh0aGlzLnNlbGVjdGVkIGFzIE1jT3B0aW9uKS52YWx1ZSA6IGZhbGxiYWNrVmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlVG9FbWl0O1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWVUb0VtaXQpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlVG9FbWl0KTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChuZXcgTWNTZWxlY3RDaGFuZ2UodGhpcywgdmFsdWVUb0VtaXQpKTtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlnaGxpZ2h0cyB0aGUgc2VsZWN0ZWQgaXRlbS4gSWYgbm8gb3B0aW9uIGlzIHNlbGVjdGVkLCBpdCB3aWxsIGhpZ2hsaWdodFxuICAgICAqIHRoZSBmaXJzdCBpdGVtIGluc3RlYWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBoaWdobGlnaHRDb3JyZWN0T3B0aW9uKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5rZXlNYW5hZ2VyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbXB0eSkge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0odGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZFswXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogU2Nyb2xscyB0aGUgYWN0aXZlIG9wdGlvbiBpbnRvIHZpZXcuICovXG4gICAgcHJpdmF0ZSBzY3JvbGxBY3RpdmVPcHRpb25JbnRvVmlldygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYWN0aXZlT3B0aW9uSW5kZXggPSB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4IHx8IDA7XG4gICAgICAgIGNvbnN0IGxhYmVsQ291bnQgPSBjb3VudEdyb3VwTGFiZWxzQmVmb3JlT3B0aW9uKGFjdGl2ZU9wdGlvbkluZGV4LCB0aGlzLm9wdGlvbnMsIHRoaXMub3B0aW9uR3JvdXBzKTtcblxuICAgICAgICB0aGlzLm9wdGlvbnNDb250YWluZXIubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSBnZXRPcHRpb25TY3JvbGxQb3NpdGlvbihcbiAgICAgICAgICAgIGFjdGl2ZU9wdGlvbkluZGV4ICsgbGFiZWxDb3VudCxcbiAgICAgICAgICAgIHRoaXMuZ2V0SXRlbUhlaWdodCgpLFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgU0VMRUNUX1BBTkVMX01BWF9IRUlHSFRcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB4LW9mZnNldCBvZiB0aGUgb3ZlcmxheSBwYW5lbCBpbiByZWxhdGlvbiB0byB0aGUgdHJpZ2dlcidzIHRvcCBzdGFydCBjb3JuZXIuXG4gICAgICogVGhpcyBtdXN0IGJlIGFkanVzdGVkIHRvIGFsaWduIHRoZSBzZWxlY3RlZCBvcHRpb24gdGV4dCBvdmVyIHRoZSB0cmlnZ2VyIHRleHQgd2hlblxuICAgICAqIHRoZSBwYW5lbCBvcGVucy4gV2lsbCBjaGFuZ2UgYmFzZWQgb24gTFRSIG9yIFJUTCB0ZXh0IGRpcmVjdGlvbi4gTm90ZSB0aGF0IHRoZSBvZmZzZXRcbiAgICAgKiBjYW4ndCBiZSBjYWxjdWxhdGVkIHVudGlsIHRoZSBwYW5lbCBoYXMgYmVlbiBhdHRhY2hlZCwgYmVjYXVzZSB3ZSBuZWVkIHRvIGtub3cgdGhlXG4gICAgICogY29udGVudCB3aWR0aCBpbiBvcmRlciB0byBjb25zdHJhaW4gdGhlIHBhbmVsIHdpdGhpbiB0aGUgdmlld3BvcnQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVPdmVybGF5T2Zmc2V0WCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheVJlY3QgPSB0aGlzLm92ZXJsYXlEaXIub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3Qgdmlld3BvcnRTaXplID0gdGhpcy5fdmlld3BvcnRSdWxlci5nZXRWaWV3cG9ydFNpemUoKTtcbiAgICAgICAgY29uc3QgaXNSdGwgPSB0aGlzLmlzUnRsKCk7XG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1tYWdpYy1udW1iZXJzICovXG4gICAgICAgIGNvbnN0IHBhZGRpbmdXaWR0aCA9IFNFTEVDVF9QQU5FTF9QQURESU5HX1ggKiAyO1xuICAgICAgICBsZXQgb2Zmc2V0WDogbnVtYmVyO1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZFswXSB8fCB0aGlzLm9wdGlvbnMuZmlyc3Q7XG4gICAgICAgIG9mZnNldFggPSBzZWxlY3RlZCAmJiBzZWxlY3RlZC5ncm91cCA/IFNFTEVDVF9QQU5FTF9JTkRFTlRfUEFERElOR19YIDogU0VMRUNUX1BBTkVMX1BBRERJTkdfWDtcblxuICAgICAgICAvLyBJbnZlcnQgdGhlIG9mZnNldCBpbiBMVFIuXG4gICAgICAgIGlmICghaXNSdGwpIHsgb2Zmc2V0WCAqPSAtMTsgfVxuXG4gICAgICAgIC8vIERldGVybWluZSBob3cgbXVjaCB0aGUgc2VsZWN0IG92ZXJmbG93cyBvbiBlYWNoIHNpZGUuXG4gICAgICAgIGNvbnN0IGxlZnRPdmVyZmxvdyA9IDAgLSAob3ZlcmxheVJlY3QubGVmdCArIG9mZnNldFggLSAoaXNSdGwgPyBwYWRkaW5nV2lkdGggOiAwKSk7XG4gICAgICAgIGNvbnN0IHJpZ2h0T3ZlcmZsb3cgPSBvdmVybGF5UmVjdC5yaWdodCArIG9mZnNldFggLSB2aWV3cG9ydFNpemUud2lkdGhcbiAgICAgICAgICAgICsgKGlzUnRsID8gMCA6IHBhZGRpbmdXaWR0aCk7XG5cbiAgICAgICAgLy8gSWYgdGhlIGVsZW1lbnQgb3ZlcmZsb3dzIG9uIGVpdGhlciBzaWRlLCByZWR1Y2UgdGhlIG9mZnNldCB0byBhbGxvdyBpdCB0byBmaXQuXG4gICAgICAgIGlmIChsZWZ0T3ZlcmZsb3cgPiAwKSB7XG4gICAgICAgICAgICBvZmZzZXRYICs9IGxlZnRPdmVyZmxvdyArIFNFTEVDVF9QQU5FTF9WSUVXUE9SVF9QQURESU5HO1xuICAgICAgICB9IGVsc2UgaWYgKHJpZ2h0T3ZlcmZsb3cgPiAwKSB7XG4gICAgICAgICAgICBvZmZzZXRYIC09IHJpZ2h0T3ZlcmZsb3cgKyBTRUxFQ1RfUEFORUxfVklFV1BPUlRfUEFERElORztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldCB0aGUgb2Zmc2V0IGRpcmVjdGx5IGluIG9yZGVyIHRvIGF2b2lkIGhhdmluZyB0byBnbyB0aHJvdWdoIGNoYW5nZSBkZXRlY3Rpb24gYW5kXG4gICAgICAgIC8vIHBvdGVudGlhbGx5IHRyaWdnZXJpbmcgXCJjaGFuZ2VkIGFmdGVyIGl0IHdhcyBjaGVja2VkXCIgZXJyb3JzLiBSb3VuZCB0aGUgdmFsdWUgdG8gYXZvaWRcbiAgICAgICAgLy8gYmx1cnJ5IGNvbnRlbnQgaW4gc29tZSBicm93c2Vycy5cbiAgICAgICAgdGhpcy5vdmVybGF5RGlyLm9mZnNldFggPSBNYXRoLnJvdW5kKG9mZnNldFgpO1xuICAgICAgICB0aGlzLm92ZXJsYXlEaXIub3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvbigpO1xuICAgIH1cblxuICAgIC8qKiBDb21wYXJpc29uIGZ1bmN0aW9uIHRvIHNwZWNpZnkgd2hpY2ggb3B0aW9uIGlzIGRpc3BsYXllZC4gRGVmYXVsdHMgdG8gb2JqZWN0IGVxdWFsaXR5LiAqL1xuICAgIHByaXZhdGUgX2NvbXBhcmVXaXRoID0gKG8xOiBhbnksIG8yOiBhbnkpID0+IG8xID09PSBvMjtcbn1cbiJdfQ==