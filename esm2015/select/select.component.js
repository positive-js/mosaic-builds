/**
 * @fileoverview added by tsickle
 * Generated from: select.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable:no-empty */
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
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
        Promise.resolve().then((/**
         * @return {?}
         */
        () => {
            this.searchChangesSubscription = (/** @type {?} */ (this.input.ngControl.valueChanges)).subscribe((/**
             * @return {?}
             */
            () => {
                this.isSearchChanged = true;
            }));
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
    constructor(_changeDetectorRef, _ngZone, _renderer, defaultErrorStateMatcher, elementRef, rawValidators, _dir, parentForm, parentFormGroup, _parentFormField, ngControl, ngModel, formControlName, _scrollStrategyFactory, mcValidation) {
        super(elementRef, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);
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
            this.setOverlayPosition();
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
                () => this.keyManager.updateActiveItem(0)));
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
    setOverlayPosition() {
        this.resetOverlay();
        /** @type {?} */
        const overlayRect = this.getOverlayRect();
        // Window width without scrollbar
        /** @type {?} */
        const windowWidth = this.getBackdropWidth();
        /** @type {?} */
        const isRtl = this.isRtl();
        /* tslint:disable-next-line:no-magic-numbers */
        /** @type {?} */
        const paddingWidth = SELECT_PANEL_PADDING_X * 2;
        /** @type {?} */
        let offsetX;
        /** @type {?} */
        let overlayMaxWidth;
        /** @type {?} */
        const selected = this.selectionModel.selected[0] || this.options.first;
        offsetX = selected && selected.group ? SELECT_PANEL_INDENT_PADDING_X : SELECT_PANEL_PADDING_X;
        // Invert the offset in LTR.
        if (!isRtl) {
            offsetX *= -1;
        }
        // Determine if select overflows on either side.
        /** @type {?} */
        const leftOverflow = 0 - (overlayRect.left + offsetX - (isRtl ? paddingWidth : 0));
        /** @type {?} */
        const rightOverflow = overlayRect.right + offsetX - windowWidth
            + (isRtl ? 0 : paddingWidth);
        // If the element overflows on either side, reduce the offset to allow it to fit.
        if (leftOverflow > 0 || rightOverflow > 0) {
            [offsetX, overlayMaxWidth] = this.calculateOverlayXPosition(overlayRect, windowWidth, offsetX);
            this.overlayDir.overlayRef.overlayElement.style.maxWidth = `${overlayMaxWidth}px`;
        }
        // Set the offset directly in order to avoid having to go through change detection and
        // potentially triggering "changed after it was checked" errors. Round the value to avoid
        // blurry content in some browsers.
        this.overlayDir.offsetX = Math.round(offsetX);
        this.overlayDir.overlayRef.updatePosition();
    }
    /**
     * @private
     * @param {?} overlayRect
     * @param {?} windowWidth
     * @param {?} basicOffsetX
     * @return {?}
     */
    calculateOverlayXPosition(overlayRect, windowWidth, basicOffsetX) {
        /** @type {?} */
        let offsetX = basicOffsetX;
        /** @type {?} */
        const leftIndent = this.triggerRect.left;
        /** @type {?} */
        const rightIndent = windowWidth - this.triggerRect.right;
        // Setting direction of dropdown expansion
        /** @type {?} */
        const isRightDirection = leftIndent <= rightIndent;
        /** @type {?} */
        let maxDropdownWidth;
        /** @type {?} */
        let overlayMaxWidth;
        /** @type {?} */
        const triggerWidth = this.triggerRect.width + SELECT_PANEL_INDENT_PADDING_X;
        if (isRightDirection) {
            maxDropdownWidth = rightIndent + triggerWidth - SELECT_PANEL_VIEWPORT_PADDING;
            overlayMaxWidth = overlayRect.width < maxDropdownWidth ? overlayRect.width : maxDropdownWidth;
        }
        else {
            /** @type {?} */
            let leftOffset;
            maxDropdownWidth = leftIndent + triggerWidth - SELECT_PANEL_VIEWPORT_PADDING;
            if (overlayRect.width < maxDropdownWidth) {
                overlayMaxWidth = overlayRect.width;
                leftOffset = this.triggerRect.right - overlayMaxWidth;
            }
            else {
                overlayMaxWidth = maxDropdownWidth;
                leftOffset = this.triggerRect.right - (overlayMaxWidth - SELECT_PANEL_INDENT_PADDING_X);
            }
            offsetX -= this.triggerRect.left - leftOffset;
        }
        return [offsetX, overlayMaxWidth];
    }
    /**
     * @private
     * @return {?}
     */
    resetOverlay() {
        this.overlayDir.offsetX = 0;
        this.overlayDir.overlayRef.overlayElement.style.maxWidth = 'unset';
        this.overlayDir.overlayRef.updatePosition();
    }
    /**
     * @private
     * @return {?}
     */
    getOverlayRect() {
        return this.overlayDir.overlayRef.overlayElement.getBoundingClientRect();
    }
    /**
     * @private
     * @return {?}
     */
    getBackdropWidth() {
        return this.scrollStrategy._overlayRef.backdropElement.clientWidth;
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
                styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider_vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider_inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:80px}.mc-select{box-sizing:border-box;display:inline-block;vertical-align:top;width:100%;outline:0}.mc-select .mc-select__trigger{display:flex;box-sizing:border-box;position:relative;height:30px;cursor:pointer;padding-right:7px;padding-left:15px}.mc-select .mc-select__trigger.mc-select__trigger_multiple{padding-left:7px}.mc-select.mc-disabled .mc-select__trigger{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.mc-select__no-options-message{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;position:relative;max-width:100%;height:32px;cursor:default;outline:0;padding:0 16px}.mc-select__matcher{display:flex;align-items:center;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mc-select__matcher>span{width:100%}.mc-select__match-list{display:flex;flex-wrap:wrap;overflow:hidden;max-height:28px;margin:0;padding-left:0}.mc-select__match-list .mc-tag{margin-right:4px}.mc-select__match-container{display:flex;flex-direction:row;justify-content:space-between;width:100%}.mc-select__match-container .mc-select__match-hidden-text{flex:0 0 70px;-ms-grid-row-align:center;align-self:center;padding:0 8px;text-align:right}.mc-select__match-item{display:flex;border:1px solid transparent;border-radius:3px;padding-left:7px;margin-right:4px;max-width:100%}.mc-select__arrow-wrapper{-ms-grid-row-align:center;align-self:center}.mc-form-field-appearance-fill .mc-select__arrow-wrapper,.mc-form-field-appearance-standard .mc-select__arrow-wrapper{transform:translateY(-50%)}.mc-form-field-appearance-outline .mc-select__arrow-wrapper{transform:translateY(-25%)}.mc-select__panel{min-width:100%;max-width:640px;overflow:hidden;border-width:1px;border-style:solid;border-bottom-left-radius:3px;border-bottom-right-radius:3px}.mc-select__panel .mc-optgroup-label,.mc-select__panel .mc-option{font-size:inherit;line-height:32px;height:32px}.mc-select__content{max-height:232px;padding:4px 0;overflow:auto}.mc-form-field-type-mc-select:not(.mc-disabled) .mc-form-field-flex{cursor:pointer}.mc-form-field-type-mc-select .mc-form-field-label{width:calc(100% - 18px)}.mc-select__search-container{border-bottom-width:1px;border-bottom-style:solid}"]
            }] }
];
/** @nocollapse */
McSelect.ctorParameters = () => [
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9zZWxlY3QvIiwic291cmNlcyI6WyJzZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDM0QsT0FBTyxFQUdILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2YsU0FBUyxFQUVULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUlOLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxJQUFJLEVBRUosU0FBUyxFQUNULFlBQVksRUFDWixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUVILGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsYUFBYSxFQUNiLFNBQVMsRUFDVCxNQUFNLEVBQ04sT0FBTyxFQUVWLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEUsT0FBTyxFQUNILFVBQVUsRUFDVixHQUFHLEVBQ0gsS0FBSyxFQUNMLElBQUksRUFDSixVQUFVLEVBQ1YsV0FBVyxFQUNYLEtBQUssRUFDTCxRQUFRLEVBQ1IsQ0FBQyxFQUNELE1BQU0sRUFDTixPQUFPLEVBQ1AsU0FBUyxFQUNaLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUNILDRCQUE0QixFQUM1Qix1QkFBdUIsRUFL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RDs7Ozs7SUE5eUJuRCxzQ0FBc0Q7Ozs7O0lBQ3RELDJCQUFnQzs7Ozs7SUFDaEMsNkJBQXFDOztJQUdyQyxpQ0FBb0U7Ozs7O0lBQ3BFLHdCQUFpRDs7Ozs7SUFHakQsb0NBQTBEOztJQUUxRCwyQkFBMkM7O0lBQzNDLG1DQUEyRDs7Ozs7SUFDM0QsMENBQTBFOzs7OztJQUMxRSxnQ0FBNEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZTpuby1lbXB0eSAqL1xuXG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBDZGtDb25uZWN0ZWRPdmVybGF5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRGlyZWN0aXZlLFxuICAgIERvQ2hlY2ssXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIGlzRGV2TW9kZSxcbiAgICBOZ1pvbmUsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgU2VsZixcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q2hpbGRyZW4sXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIEZvcm1Db250cm9sTmFtZSxcbiAgICBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgTkdfVkFMSURBVE9SUyxcbiAgICBOZ0NvbnRyb2wsXG4gICAgTmdGb3JtLFxuICAgIE5nTW9kZWwsXG4gICAgVmFsaWRhdG9yXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2ExMXknO1xuaW1wb3J0IHtcbiAgICBET1dOX0FSUk9XLFxuICAgIEVORCxcbiAgICBFTlRFUixcbiAgICBIT01FLFxuICAgIExFRlRfQVJST1csXG4gICAgUklHSFRfQVJST1csXG4gICAgU1BBQ0UsXG4gICAgVVBfQVJST1csXG4gICAgQSxcbiAgICBFU0NBUEUsXG4gICAgUEFHRV9VUCxcbiAgICBQQUdFX0RPV05cbn0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gICAgY291bnRHcm91cExhYmVsc0JlZm9yZU9wdGlvbixcbiAgICBnZXRPcHRpb25TY3JvbGxQb3NpdGlvbixcbiAgICBDYW5EaXNhYmxlLFxuICAgIENhbkRpc2FibGVDdG9yLFxuICAgIENhblVwZGF0ZUVycm9yU3RhdGUsXG4gICAgQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IsXG4gICAgRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgSGFzVGFiSW5kZXgsXG4gICAgSGFzVGFiSW5kZXhDdG9yLFxuICAgIE1DX09QVElPTl9QQVJFTlRfQ09NUE9ORU5ULFxuICAgIE1jT3B0Z3JvdXAsXG4gICAgTWNPcHRpb24sXG4gICAgTWNPcHRpb25TZWxlY3Rpb25DaGFuZ2UsXG4gICAgbWl4aW5EaXNhYmxlZCxcbiAgICBtaXhpbkVycm9yU3RhdGUsXG4gICAgbWl4aW5UYWJJbmRleCxcbiAgICBtY1NlbGVjdEFuaW1hdGlvbnMsXG5cbiAgICBTRUxFQ1RfUEFORUxfSU5ERU5UX1BBRERJTkdfWCxcbiAgICBTRUxFQ1RfUEFORUxfTUFYX0hFSUdIVCxcbiAgICBTRUxFQ1RfUEFORUxfUEFERElOR19YLFxuICAgIFNFTEVDVF9QQU5FTF9WSUVXUE9SVF9QQURESU5HLFxuICAgIE1DX1NFTEVDVF9TQ1JPTExfU1RSQVRFR1ksXG5cbiAgICBnZXRNY1NlbGVjdER5bmFtaWNNdWx0aXBsZUVycm9yLFxuICAgIGdldE1jU2VsZWN0Tm9uRnVuY3Rpb25WYWx1ZUVycm9yLFxuICAgIGdldE1jU2VsZWN0Tm9uQXJyYXlWYWx1ZUVycm9yLFxuXG4gICAgc2V0TW9zYWljVmFsaWRhdGlvbixcbiAgICBNQ19WQUxJREFUSU9OLFxuICAgIE1jVmFsaWRhdGlvbk9wdGlvbnNcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNDbGVhbmVyLCBNY0Zvcm1GaWVsZCwgTWNGb3JtRmllbGRDb250cm9sIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgTWNJbnB1dCB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9pbnB1dCc7XG5pbXBvcnQgeyBNY1RhZyB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy90YWdzJztcbmltcG9ydCB7IGRlZmVyLCBtZXJnZSwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICAgIGZpbHRlcixcbiAgICBtYXAsXG4gICAgc3RhcnRXaXRoLFxuICAgIHN3aXRjaE1hcCxcbiAgICB0YWtlLFxuICAgIHRha2VVbnRpbCxcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKiBDaGFuZ2UgZXZlbnQgb2JqZWN0IHRoYXQgaXMgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3QgdmFsdWUgaGFzIGNoYW5nZWQuICovXG5leHBvcnQgY2xhc3MgTWNTZWxlY3RDaGFuZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2U6IE1jU2VsZWN0LCBwdWJsaWMgdmFsdWU6IGFueSkge31cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNTZWxlY3RTZWFyY2hdJyxcbiAgICBleHBvcnRBczogJ21jU2VsZWN0U2VhcmNoJyxcbiAgICBob3N0OiB7XG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNTZWxlY3RTZWFyY2ggaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIEBDb250ZW50Q2hpbGQoTWNJbnB1dCwgeyBzdGF0aWM6IGZhbHNlIH0pIGlucHV0OiBNY0lucHV0O1xuXG4gICAgc2VhcmNoQ2hhbmdlc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gICAgaXNTZWFyY2hDaGFuZ2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihmb3JtRmllbGQ6IE1jRm9ybUZpZWxkKSB7XG4gICAgICAgIGZvcm1GaWVsZC5jYW5DbGVhbmVyQ2xlYXJCeUVzYyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlucHV0LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgcmVzZXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXQubmdDb250cm9sLnJlc2V0KCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuaW5wdXQpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdNY1NlbGVjdFNlYXJjaCBkb2VzIG5vdCB3b3JrIHdpdGhvdXQgbWNJbnB1dCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmlucHV0Lm5nQ29udHJvbCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ01jU2VsZWN0U2VhcmNoIGRvZXMgbm90IHdvcmsgd2l0aG91dCBuZ0NvbnRyb2wnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hDaGFuZ2VzU3Vic2NyaXB0aW9uID0gdGhpcy5pbnB1dC5uZ0NvbnRyb2wudmFsdWVDaGFuZ2VzIS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNTZWFyY2hDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWFyY2hDaGFuZ2VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXQudmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jLXNlbGVjdC1zZWFyY2gtZW1wdHktcmVzdWx0XScsXG4gICAgZXhwb3J0QXM6ICdtY1NlbGVjdFNlYXJjaEVtcHR5UmVzdWx0J1xufSlcbmV4cG9ydCBjbGFzcyBNY1NlbGVjdFNlYXJjaEVtcHR5UmVzdWx0IHt9XG5cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbWMtc2VsZWN0LXRyaWdnZXInIH0pXG5leHBvcnQgY2xhc3MgTWNTZWxlY3RUcmlnZ2VyIHt9XG5cblxuZXhwb3J0IGNsYXNzIE1jU2VsZWN0QmFzZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwdWJsaWMgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICAgICAgcHVibGljIHBhcmVudEZvcm06IE5nRm9ybSxcbiAgICAgICAgcHVibGljIHBhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgICAgICBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2xcbiAgICApIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuY29uc3QgTWNTZWxlY3RNaXhpbkJhc2U6IENhbkRpc2FibGVDdG9yICYgSGFzVGFiSW5kZXhDdG9yICYgQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IgJlxuICAgIHR5cGVvZiBNY1NlbGVjdEJhc2UgPSBtaXhpblRhYkluZGV4KG1peGluRGlzYWJsZWQobWl4aW5FcnJvclN0YXRlKE1jU2VsZWN0QmFzZSkpKTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXNlbGVjdCcsXG4gICAgZXhwb3J0QXM6ICdtY1NlbGVjdCcsXG4gICAgdGVtcGxhdGVVcmw6ICdzZWxlY3QuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2VsZWN0LnNjc3MnXSxcbiAgICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAndGFiSW5kZXgnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCcsXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuXG4gICAgICAgIGNsYXNzOiAnbWMtc2VsZWN0JyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWludmFsaWRdJzogJ2Vycm9yU3RhdGUnLFxuXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyhmb2N1cyknOiAnb25Gb2N1cygpJyxcbiAgICAgICAgJyhibHVyKSc6ICdvbkJsdXIoKScsXG4gICAgICAgICcod2luZG93OnJlc2l6ZSknOiAnY2FsY3VsYXRlSGlkZGVuSXRlbXMoKSdcbiAgICB9LFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgbWNTZWxlY3RBbmltYXRpb25zLnRyYW5zZm9ybVBhbmVsLFxuICAgICAgICBtY1NlbGVjdEFuaW1hdGlvbnMuZmFkZUluQ29udGVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogTWNGb3JtRmllbGRDb250cm9sLCB1c2VFeGlzdGluZzogTWNTZWxlY3QgfSxcbiAgICAgICAgeyBwcm92aWRlOiBNQ19PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCwgdXNlRXhpc3Rpbmc6IE1jU2VsZWN0IH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jU2VsZWN0IGV4dGVuZHMgTWNTZWxlY3RNaXhpbkJhc2UgaW1wbGVtZW50c1xuICAgIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIERvQ2hlY2ssIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBDYW5EaXNhYmxlLFxuICAgIEhhc1RhYkluZGV4LCBNY0Zvcm1GaWVsZENvbnRyb2w8YW55PiwgQ2FuVXBkYXRlRXJyb3JTdGF0ZSB7XG5cbiAgICAvKiogQSBuYW1lIGZvciB0aGlzIGNvbnRyb2wgdGhhdCBjYW4gYmUgdXNlZCBieSBgbWMtZm9ybS1maWVsZGAuICovXG4gICAgY29udHJvbFR5cGUgPSAnbWMtc2VsZWN0JztcblxuICAgIGhpZGRlbkl0ZW1zOiBudW1iZXIgPSAwO1xuXG4gICAgLyoqIFRoZSBsYXN0IG1lYXN1cmVkIHZhbHVlIGZvciB0aGUgdHJpZ2dlcidzIGNsaWVudCBib3VuZGluZyByZWN0LiAqL1xuICAgIHRyaWdnZXJSZWN0OiBDbGllbnRSZWN0O1xuXG4gICAgLyoqIFRoZSBjYWNoZWQgZm9udC1zaXplIG9mIHRoZSB0cmlnZ2VyIGVsZW1lbnQuICovXG4gICAgdHJpZ2dlckZvbnRTaXplID0gMDtcblxuICAgIC8qKiBEZWFscyB3aXRoIHRoZSBzZWxlY3Rpb24gbG9naWMuICovXG4gICAgc2VsZWN0aW9uTW9kZWw6IFNlbGVjdGlvbk1vZGVsPE1jT3B0aW9uPjtcblxuICAgIHByZXZpb3VzU2VsZWN0aW9uTW9kZWxTZWxlY3RlZDogTWNPcHRpb25bXSA9IFtdO1xuXG4gICAgLyoqIE1hbmFnZXMga2V5Ym9hcmQgZXZlbnRzIGZvciBvcHRpb25zIGluIHRoZSBwYW5lbC4gKi9cbiAgICBrZXlNYW5hZ2VyOiBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlcjxNY09wdGlvbj47XG5cbiAgICAvKiogVGhlIHZhbHVlIG9mIHRoZSBzZWxlY3QgcGFuZWwncyB0cmFuc2Zvcm0tb3JpZ2luIHByb3BlcnR5LiAqL1xuICAgIHRyYW5zZm9ybU9yaWdpbjogc3RyaW5nID0gJ3RvcCc7XG5cbiAgICAvKiogV2hldGhlciB0aGUgcGFuZWwncyBhbmltYXRpb24gaXMgZG9uZS4gKi9cbiAgICBwYW5lbERvbmVBbmltYXRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSBwYW5lbCBlbGVtZW50IGlzIGZpbmlzaGVkIHRyYW5zZm9ybWluZyBpbi4gKi9cbiAgICBwYW5lbERvbmVBbmltYXRpbmdTdHJlYW0gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbiAgICAvKiogU3RyYXRlZ3kgdGhhdCB3aWxsIGJlIHVzZWQgdG8gaGFuZGxlIHNjcm9sbGluZyB3aGlsZSB0aGUgc2VsZWN0IHBhbmVsIGlzIG9wZW4uICovXG4gICAgc2Nyb2xsU3RyYXRlZ3kgPSB0aGlzLl9zY3JvbGxTdHJhdGVneUZhY3RvcnkoKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSB5LW9mZnNldCBvZiB0aGUgb3ZlcmxheSBwYW5lbCBpbiByZWxhdGlvbiB0byB0aGUgdHJpZ2dlcidzIHRvcCBzdGFydCBjb3JuZXIuXG4gICAgICogVGhpcyBtdXN0IGJlIGFkanVzdGVkIHRvIGFsaWduIHRoZSBzZWxlY3RlZCBvcHRpb24gdGV4dCBvdmVyIHRoZSB0cmlnZ2VyIHRleHQuXG4gICAgICogd2hlbiB0aGUgcGFuZWwgb3BlbnMuIFdpbGwgY2hhbmdlIGJhc2VkIG9uIHRoZSB5LXBvc2l0aW9uIG9mIHRoZSBzZWxlY3RlZCBvcHRpb24uXG4gICAgICovXG4gICAgb2Zmc2V0WSA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIHBvc2l0aW9uIGNvbmZpZyBlbnN1cmVzIHRoYXQgdGhlIHRvcCBcInN0YXJ0XCIgY29ybmVyIG9mIHRoZSBvdmVybGF5XG4gICAgICogaXMgYWxpZ25lZCB3aXRoIHdpdGggdGhlIHRvcCBcInN0YXJ0XCIgb2YgdGhlIG9yaWdpbiBieSBkZWZhdWx0IChvdmVybGFwcGluZ1xuICAgICAqIHRoZSB0cmlnZ2VyIGNvbXBsZXRlbHkpLiBJZiB0aGUgcGFuZWwgY2Fubm90IGZpdCBiZWxvdyB0aGUgdHJpZ2dlciwgaXRcbiAgICAgKiB3aWxsIGZhbGwgYmFjayB0byBhIHBvc2l0aW9uIGFib3ZlIHRoZSB0cmlnZ2VyLlxuICAgICAqL1xuICAgIHBvc2l0aW9ucyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgICAgICBvdmVybGF5WTogJ3RvcCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgICAgICBvdmVybGF5WTogJ2JvdHRvbSdcbiAgICAgICAgfVxuICAgIF07XG5cbiAgICBAVmlld0NoaWxkKCd0cmlnZ2VyJywgeyBzdGF0aWM6IGZhbHNlIH0pIHRyaWdnZXI6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdwYW5lbCcsIHsgc3RhdGljOiBmYWxzZSB9KSBwYW5lbDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ29wdGlvbnNDb250YWluZXInLCB7IHN0YXRpYzogZmFsc2UgfSkgb3B0aW9uc0NvbnRhaW5lcjogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoQ2RrQ29ubmVjdGVkT3ZlcmxheSwgeyBzdGF0aWM6IGZhbHNlIH0pIG92ZXJsYXlEaXI6IENka0Nvbm5lY3RlZE92ZXJsYXk7XG5cbiAgICBAVmlld0NoaWxkcmVuKE1jVGFnKSB0YWdzOiBRdWVyeUxpc3Q8TWNUYWc+O1xuXG4gICAgLyoqIFVzZXItc3VwcGxpZWQgb3ZlcnJpZGUgb2YgdGhlIHRyaWdnZXIgZWxlbWVudC4gKi9cbiAgICBAQ29udGVudENoaWxkKE1jU2VsZWN0VHJpZ2dlciwgeyBzdGF0aWM6IGZhbHNlIH0pIGN1c3RvbVRyaWdnZXI6IE1jU2VsZWN0VHJpZ2dlcjtcblxuICAgIEBDb250ZW50Q2hpbGQoJ21jU2VsZWN0Q2xlYW5lcicsIHsgc3RhdGljOiB0cnVlIH0pIGNsZWFuZXI6IE1jQ2xlYW5lcjtcblxuICAgIC8qKiBBbGwgb2YgdGhlIGRlZmluZWQgc2VsZWN0IG9wdGlvbnMuICovXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY09wdGlvbiwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBvcHRpb25zOiBRdWVyeUxpc3Q8TWNPcHRpb24+O1xuXG4gICAgLyoqIEFsbCBvZiB0aGUgZGVmaW5lZCBncm91cHMgb2Ygb3B0aW9ucy4gKi9cbiAgICBAQ29udGVudENoaWxkcmVuKE1jT3B0Z3JvdXApIG9wdGlvbkdyb3VwczogUXVlcnlMaXN0PE1jT3B0Z3JvdXA+O1xuXG4gICAgQENvbnRlbnRDaGlsZChNY1NlbGVjdFNlYXJjaCwgeyBzdGF0aWM6IGZhbHNlIH0pIHNlYXJjaDogTWNTZWxlY3RTZWFyY2g7XG5cbiAgICBASW5wdXQoKSBoaWRkZW5JdGVtc1RleHQ6IHN0cmluZyA9ICcuLi7QtdGJ0ZEnO1xuXG4gICAgLyoqIENsYXNzZXMgdG8gYmUgcGFzc2VkIHRvIHRoZSBzZWxlY3QgcGFuZWwuIFN1cHBvcnRzIHRoZSBzYW1lIHN5bnRheCBhcyBgbmdDbGFzc2AuICovXG4gICAgQElucHV0KCkgcGFuZWxDbGFzczogc3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPiB8IHsgW2tleTogc3RyaW5nXTogYW55IH07XG5cbiAgICAvKiogT2JqZWN0IHVzZWQgdG8gY29udHJvbCB3aGVuIGVycm9yIG1lc3NhZ2VzIGFyZSBzaG93bi4gKi9cbiAgICBASW5wdXQoKSBlcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXI7XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB1c2VkIHRvIHNvcnQgdGhlIHZhbHVlcyBpbiBhIHNlbGVjdCBpbiBtdWx0aXBsZSBtb2RlLlxuICAgICAqIEZvbGxvd3MgdGhlIHNhbWUgbG9naWMgYXMgYEFycmF5LnByb3RvdHlwZS5zb3J0YC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBzb3J0Q29tcGFyYXRvcjogKGE6IE1jT3B0aW9uLCBiOiBNY09wdGlvbiwgb3B0aW9uczogTWNPcHRpb25bXSkgPT4gbnVtYmVyO1xuXG4gICAgLyoqIENvbWJpbmVkIHN0cmVhbSBvZiBhbGwgb2YgdGhlIGNoaWxkIG9wdGlvbnMnIGNoYW5nZSBldmVudHMuICovXG4gICAgcmVhZG9ubHkgb3B0aW9uU2VsZWN0aW9uQ2hhbmdlczogT2JzZXJ2YWJsZTxNY09wdGlvblNlbGVjdGlvbkNoYW5nZT4gPSBkZWZlcigoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBtZXJnZShcbiAgICAgICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMubWFwKChvcHRpb24pID0+IG9wdGlvbi5vblNlbGVjdGlvbkNoYW5nZSksXG4gICAgICAgICAgICAgICAgLi4udGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZC5tYXAoKG9wdGlvbikgPT4gb3B0aW9uLm9uU2VsZWN0aW9uQ2hhbmdlKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9uZ1pvbmUub25TdGFibGVcbiAgICAgICAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSwgc3dpdGNoTWFwKCgpID0+IHRoaXMub3B0aW9uU2VsZWN0aW9uQ2hhbmdlcykpO1xuICAgIH0pIGFzIE9ic2VydmFibGU8TWNPcHRpb25TZWxlY3Rpb25DaGFuZ2U+O1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IHBhbmVsIGhhcyBiZWVuIHRvZ2dsZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IG9wZW5lZENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IGhhcyBiZWVuIG9wZW5lZC4gKi9cbiAgICBAT3V0cHV0KCdvcGVuZWQnKSByZWFkb25seSBvcGVuZWRTdHJlYW06IE9ic2VydmFibGU8dm9pZD4gPVxuICAgICAgICB0aGlzLm9wZW5lZENoYW5nZS5waXBlKGZpbHRlcigobykgPT4gbyksIG1hcCgoKSA9PiB7fSkpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IGhhcyBiZWVuIGNsb3NlZC4gKi9cbiAgICBAT3V0cHV0KCdjbG9zZWQnKSByZWFkb25seSBjbG9zZWRTdHJlYW06IE9ic2VydmFibGU8dm9pZD4gPVxuICAgICAgICB0aGlzLm9wZW5lZENoYW5nZS5waXBlKGZpbHRlcigobykgPT4gIW8pLCBtYXAoKCkgPT4ge30pKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdGVkIHZhbHVlIGhhcyBiZWVuIGNoYW5nZWQgYnkgdGhlIHVzZXIuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPE1jU2VsZWN0Q2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWNTZWxlY3RDaGFuZ2U+KCk7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSByYXcgdmFsdWUgb2YgdGhlIHNlbGVjdCBjaGFuZ2VzLiBUaGlzIGlzIGhlcmUgcHJpbWFyaWx5XG4gICAgICogdG8gZmFjaWxpdGF0ZSB0aGUgdHdvLXdheSBiaW5kaW5nIGZvciB0aGUgYHZhbHVlYCBpbnB1dC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgcGxhY2Vob2xkZXIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BsYWNlaG9sZGVyO1xuICAgIH1cblxuICAgIHNldCBwbGFjZWhvbGRlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3BsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVpcmVkO1xuICAgIH1cblxuICAgIHNldCByZXF1aXJlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9yZXF1aXJlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlcXVpcmVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtdWx0aXBsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX211bHRpcGxlO1xuICAgIH1cblxuICAgIHNldCBtdWx0aXBsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlbCkge1xuICAgICAgICAgICAgdGhyb3cgZ2V0TWNTZWxlY3REeW5hbWljTXVsdGlwbGVFcnJvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbXVsdGlwbGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX211bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBjb21wYXJlIHRoZSBvcHRpb24gdmFsdWVzIHdpdGggdGhlIHNlbGVjdGVkIHZhbHVlcy4gVGhlIGZpcnN0IGFyZ3VtZW50XG4gICAgICogaXMgYSB2YWx1ZSBmcm9tIGFuIG9wdGlvbi4gVGhlIHNlY29uZCBpcyBhIHZhbHVlIGZyb20gdGhlIHNlbGVjdGlvbi4gQSBib29sZWFuXG4gICAgICogc2hvdWxkIGJlIHJldHVybmVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGNvbXBhcmVXaXRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29tcGFyZVdpdGg7XG4gICAgfVxuXG4gICAgc2V0IGNvbXBhcmVXaXRoKGZuOiAobzE6IGFueSwgbzI6IGFueSkgPT4gYm9vbGVhbikge1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6c3RyaWN0LXR5cGUtcHJlZGljYXRlcyAqL1xuICAgICAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRNY1NlbGVjdE5vbkZ1bmN0aW9uVmFsdWVFcnJvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY29tcGFyZVdpdGggPSBmbjtcblxuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlbCkge1xuICAgICAgICAgICAgLy8gQSBkaWZmZXJlbnQgY29tcGFyYXRvciBtZWFucyB0aGUgc2VsZWN0aW9uIGNvdWxkIGNoYW5nZS5cbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNlbGVjdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFZhbHVlIG9mIHRoZSBzZWxlY3QgY29udHJvbC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLl92YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy53cml0ZVZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF92YWx1ZTogYW55O1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cblxuICAgIHNldCBpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2lkID0gdmFsdWUgfHwgdGhpcy51aWQ7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pZDogc3RyaW5nO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHNlbGVjdCBpcyBmb2N1c2VkLiAqL1xuICAgIGdldCBmb2N1c2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZm9jdXNlZCB8fCB0aGlzLl9wYW5lbE9wZW47XG4gICAgfVxuXG4gICAgc2V0IGZvY3VzZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZm9jdXNlZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZvY3VzZWQgPSBmYWxzZTtcblxuICAgIGdldCBwYW5lbE9wZW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYW5lbE9wZW47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcGFuZWxPcGVuID0gZmFsc2U7XG5cbiAgICBnZXQgaXNFbXB0eVNlYXJjaFJlc3VsdCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoICYmIHRoaXMub3B0aW9ucy5sZW5ndGggPT09IDAgJiYgISF0aGlzLnNlYXJjaC5pbnB1dC52YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgY2FuU2hvd0NsZWFuZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsZWFuZXIgJiYgdGhpcy5zZWxlY3Rpb25Nb2RlbC5oYXNWYWx1ZSgpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgc2Nyb2xsIHBvc2l0aW9uIG9mIHRoZSBvdmVybGF5IHBhbmVsLCBjYWxjdWxhdGVkIHRvIGNlbnRlciB0aGUgc2VsZWN0ZWQgb3B0aW9uLiAqL1xuICAgIHByaXZhdGUgc2Nyb2xsVG9wID0gMDtcblxuICAgIC8qKiBVbmlxdWUgaWQgZm9yIHRoaXMgaW5wdXQuICovXG4gICAgcHJpdmF0ZSByZWFkb25seSB1aWQgPSBgbWMtc2VsZWN0LSR7bmV4dFVuaXF1ZUlkKyt9YDtcblxuICAgIC8qKiBFbWl0cyB3aGVuZXZlciB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZC4gKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTkdfVkFMSURBVE9SUykgcHVibGljIHJhd1ZhbGlkYXRvcnM6IFZhbGlkYXRvcltdLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJlYWRvbmx5IF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICBAT3B0aW9uYWwoKSBwYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgICAgIEBPcHRpb25hbCgpIHBhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJlYWRvbmx5IF9wYXJlbnRGb3JtRmllbGQ6IE1jRm9ybUZpZWxkLFxuICAgICAgICBAU2VsZigpIEBPcHRpb25hbCgpIG5nQ29udHJvbDogTmdDb250cm9sLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHB1YmxpYyBuZ01vZGVsOiBOZ01vZGVsLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHB1YmxpYyBmb3JtQ29udHJvbE5hbWU6IEZvcm1Db250cm9sTmFtZSxcbiAgICAgICAgQEluamVjdChNQ19TRUxFQ1RfU0NST0xMX1NUUkFURUdZKSBwcml2YXRlIHJlYWRvbmx5IF9zY3JvbGxTdHJhdGVneUZhY3RvcnksXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfVkFMSURBVElPTikgcHJpdmF0ZSBtY1ZhbGlkYXRpb246IE1jVmFsaWRhdGlvbk9wdGlvbnNcbiAgICApIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZiwgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyLCBwYXJlbnRGb3JtLCBwYXJlbnRGb3JtR3JvdXAsIG5nQ29udHJvbCk7XG5cbiAgICAgICAgaWYgKHRoaXMubmdDb250cm9sKSB7XG4gICAgICAgICAgICAvLyBOb3RlOiB3ZSBwcm92aWRlIHRoZSB2YWx1ZSBhY2Nlc3NvciB0aHJvdWdoIGhlcmUsIGluc3RlYWQgb2ZcbiAgICAgICAgICAgIC8vIHRoZSBgcHJvdmlkZXJzYCB0byBhdm9pZCBydW5uaW5nIGludG8gYSBjaXJjdWxhciBpbXBvcnQuXG4gICAgICAgICAgICB0aGlzLm5nQ29udHJvbC52YWx1ZUFjY2Vzc29yID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZvcmNlIHNldHRlciB0byBiZSBjYWxsZWQgaW4gY2FzZSBpZCB3YXMgbm90IHNwZWNpZmllZC5cbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuaWQ7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwgPSBuZXcgU2VsZWN0aW9uTW9kZWw8TWNPcHRpb24+KHRoaXMubXVsdGlwbGUpO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG5cbiAgICAgICAgLy8gV2UgbmVlZCBgZGlzdGluY3RVbnRpbENoYW5nZWRgIGhlcmUsIGJlY2F1c2Ugc29tZSBicm93c2VycyB3aWxsXG4gICAgICAgIC8vIGZpcmUgdGhlIGFuaW1hdGlvbiBlbmQgZXZlbnQgdHdpY2UgZm9yIHRoZSBzYW1lIGFuaW1hdGlvbi4gU2VlOlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8yNDA4NFxuICAgICAgICB0aGlzLnBhbmVsRG9uZUFuaW1hdGluZ1N0cmVhbVxuICAgICAgICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgdGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUb3AgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5lZENoYW5nZS5lbWl0KHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbmVkQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbmVsRG9uZUFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLm1jVmFsaWRhdGlvbi51c2VWYWxpZGF0aW9uKSB7XG4gICAgICAgICAgICBzZXRNb3NhaWNWYWxpZGF0aW9uKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0S2V5TWFuYWdlcigpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuY2hhbmdlZFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50LmFkZGVkLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uLnNlbGVjdCgpKTtcbiAgICAgICAgICAgICAgICBldmVudC5yZW1vdmVkLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uLmRlc2VsZWN0KCkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zLmNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKHN0YXJ0V2l0aChudWxsKSwgdGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0T3B0aW9ucygpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNlbGVjdGlvbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhZ3MuY2hhbmdlc1xuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNhbGN1bGF0ZUhpZGRlbkl0ZW1zKCksIDApO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdEb0NoZWNrKCkge1xuICAgICAgICBpZiAodGhpcy5uZ0NvbnRyb2wpIHsgdGhpcy51cGRhdGVFcnJvclN0YXRlKCk7IH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIC8vIFVwZGF0aW5nIHRoZSBkaXNhYmxlZCBzdGF0ZSBpcyBoYW5kbGVkIGJ5IGBtaXhpbkRpc2FibGVkYCwgYnV0IHdlIG5lZWQgdG8gYWRkaXRpb25hbGx5IGxldFxuICAgICAgICAvLyB0aGUgcGFyZW50IGZvcm0gZmllbGQga25vdyB0byBydW4gY2hhbmdlIGRldGVjdGlvbiB3aGVuIHRoZSBkaXNhYmxlZCBzdGF0ZSBjaGFuZ2VzLlxuICAgICAgICBpZiAoY2hhbmdlcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuZGVzdHJveS5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgaGlkZGVuSXRlbXNUZXh0Rm9ybWF0dGVyKGhpZGRlbkl0ZW1zVGV4dDogc3RyaW5nLCBoaWRkZW5JdGVtczogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke2hpZGRlbkl0ZW1zVGV4dH0gJHtoaWRkZW5JdGVtc31gO1xuICAgIH1cblxuICAgIGNsZWFyVmFsdWUoJGV2ZW50KTogdm9pZCB7XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKC0xKTtcblxuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZXMoKTtcbiAgICB9XG5cbiAgICAvKiogYFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gdmFsdWUgY2hhbmdlc2AgKi9cbiAgICBvbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAgIC8qKiBgVmlldyAtPiBtb2RlbCBjYWxsYmFjayBjYWxsZWQgd2hlbiBzZWxlY3QgaGFzIGJlZW4gdG91Y2hlZGAgKi9cbiAgICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICAgIHJlc2V0U2VhcmNoKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zZWFyY2gpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoLnJlc2V0KCk7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgdG9kbyB0aGUgaW5jb3JyZWN0IGJlaGF2aW91ciBvZiBrZXlNYW5hZ2VyIGlzIHBvc3NpYmxlIGhlcmVcbiAgICAgICAgICAgIHRvIGF2b2lkIGZpcnN0IGl0ZW0gc2VsZWN0aW9uICh0byBwcm92aWRlIGNvcnJlY3Qgb3B0aW9ucyBmbGlwcGluZyBvbiBjbG9zZWQgc2VsZWN0KVxuICAgICAgICAgICAgd2Ugc2hvdWxkIHByb2Nlc3Mgb3B0aW9ucyB1cGRhdGUgbGlrZSBpdCBpcyB0aGUgZmlyc3Qgb3B0aW9ucyBhcHBlYXJhbmNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuc2VhcmNoLmlzU2VhcmNoQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFRvZ2dsZXMgdGhlIG92ZXJsYXkgcGFuZWwgb3BlbiBvciBjbG9zZWQuICovXG4gICAgdG9nZ2xlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIE9wZW5zIHRoZSBvdmVybGF5IHBhbmVsLiAqL1xuICAgIG9wZW4oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICF0aGlzLm9wdGlvbnMgfHwgIXRoaXMub3B0aW9ucy5sZW5ndGggfHwgdGhpcy5fcGFuZWxPcGVuKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMudHJpZ2dlclJlY3QgPSB0aGlzLnRyaWdnZXIubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgLy8gTm90ZTogVGhlIGNvbXB1dGVkIGZvbnQtc2l6ZSB3aWxsIGJlIGEgc3RyaW5nIHBpeGVsIHZhbHVlIChlLmcuIFwiMTZweFwiKS5cbiAgICAgICAgLy8gYHBhcnNlSW50YCBpZ25vcmVzIHRoZSB0cmFpbGluZyAncHgnIGFuZCBjb252ZXJ0cyB0aGlzIHRvIGEgbnVtYmVyLlxuICAgICAgICB0aGlzLnRyaWdnZXJGb250U2l6ZSA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUodGhpcy50cmlnZ2VyLm5hdGl2ZUVsZW1lbnQpWydmb250LXNpemUnXSk7XG5cbiAgICAgICAgdGhpcy5fcGFuZWxPcGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24obnVsbCk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0Q29ycmVjdE9wdGlvbigpO1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcblxuICAgICAgICAvLyBTZXQgdGhlIGZvbnQgc2l6ZSBvbiB0aGUgcGFuZWwgZWxlbWVudCBvbmNlIGl0IGV4aXN0cy5cbiAgICAgICAgdGhpcy5fbmdab25lLm9uU3RhYmxlLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpZ2dlckZvbnRTaXplICYmIHRoaXMub3ZlcmxheURpci5vdmVybGF5UmVmICYmIHRoaXMub3ZlcmxheURpci5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheURpci5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gYCR7dGhpcy50cmlnZ2VyRm9udFNpemV9cHhgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBDbG9zZXMgdGhlIG92ZXJsYXkgcGFuZWwgYW5kIGZvY3VzZXMgdGhlIGhvc3QgZWxlbWVudC4gKi9cbiAgICBjbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9wYW5lbE9wZW4pIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgLy8gdGhlIG9yZGVyIG9mIGNhbGxzIGlzIGltcG9ydGFudFxuICAgICAgICB0aGlzLnJlc2V0U2VhcmNoKCk7XG4gICAgICAgIHRoaXMuX3BhbmVsT3BlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmtleU1hbmFnZXIud2l0aEhvcml6b250YWxPcmllbnRhdGlvbih0aGlzLmlzUnRsKCkgPyAncnRsJyA6ICdsdHInKTtcblxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBzZWxlY3QncyB2YWx1ZS4gUGFydCBvZiB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gICAgICogcmVxdWlyZWQgdG8gaW50ZWdyYXRlIHdpdGggQW5ndWxhcidzIGNvcmUgZm9ybXMgQVBJLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlIE5ldyB2YWx1ZSB0byBiZSB3cml0dGVuIHRvIHRoZSBtb2RlbC5cbiAgICAgKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25CeVZhbHVlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNhdmVzIGEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCB3aGVuIHRoZSBzZWxlY3QncyB2YWx1ZVxuICAgICAqIGNoYW5nZXMgZnJvbSB1c2VyIGlucHV0LiBQYXJ0IG9mIHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgICAgKiByZXF1aXJlZCB0byBpbnRlZ3JhdGUgd2l0aCBBbmd1bGFyJ3MgY29yZSBmb3JtcyBBUEkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZm4gQ2FsbGJhY2sgdG8gYmUgdHJpZ2dlcmVkIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXMuXG4gICAgICovXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNhdmVzIGEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCB3aGVuIHRoZSBzZWxlY3QgaXMgYmx1cnJlZFxuICAgICAqIGJ5IHRoZSB1c2VyLiBQYXJ0IG9mIHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2UgcmVxdWlyZWRcbiAgICAgKiB0byBpbnRlZ3JhdGUgd2l0aCBBbmd1bGFyJ3MgY29yZSBmb3JtcyBBUEkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZm4gQ2FsbGJhY2sgdG8gYmUgdHJpZ2dlcmVkIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiB0b3VjaGVkLlxuICAgICAqL1xuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc2FibGVzIHRoZSBzZWxlY3QuIFBhcnQgb2YgdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZSByZXF1aXJlZFxuICAgICAqIHRvIGludGVncmF0ZSB3aXRoIEFuZ3VsYXIncyBjb3JlIGZvcm1zIEFQSS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpc0Rpc2FibGVkIFNldHMgd2hldGhlciB0aGUgY29tcG9uZW50IGlzIGRpc2FibGVkLlxuICAgICAqL1xuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWQoKTogTWNPcHRpb24gfCBNY09wdGlvbltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGUgPyB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdGVkIDogdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZFswXTtcbiAgICB9XG5cbiAgICBnZXQgdHJpZ2dlclZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLmVtcHR5KSB7IHJldHVybiAnJzsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdGVkWzBdLnZpZXdWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgdHJpZ2dlclZhbHVlcygpOiBNY09wdGlvbltdIHtcbiAgICAgICAgaWYgKHRoaXMuZW1wdHkpIHsgcmV0dXJuIFtdOyB9XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb25zID0gdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZDtcblxuICAgICAgICBpZiAodGhpcy5pc1J0bCgpKSB7IHNlbGVjdGVkT3B0aW9ucy5yZXZlcnNlKCk7IH1cblxuICAgICAgICByZXR1cm4gc2VsZWN0ZWRPcHRpb25zO1xuICAgIH1cblxuICAgIGdldCBlbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnNlbGVjdGlvbk1vZGVsIHx8IHRoaXMuc2VsZWN0aW9uTW9kZWwuaXNFbXB0eSgpO1xuICAgIH1cblxuICAgIGlzUnRsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlyID8gdGhpcy5fZGlyLnZhbHVlID09PSAncnRsJyA6IGZhbHNlO1xuICAgIH1cblxuICAgIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU9wZW5LZXlkb3duKGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDbG9zZWRLZXlkb3duKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gdGhlIHBhbmVsIGNvbnRlbnQgaXMgZG9uZSBmYWRpbmcgaW4sIHRoZSBwYW5lbERvbmVBbmltYXRpbmcgcHJvcGVydHkgaXNcbiAgICAgKiBzZXQgc28gdGhlIHByb3BlciBjbGFzcyBjYW4gYmUgYWRkZWQgdG8gdGhlIHBhbmVsLlxuICAgICAqL1xuICAgIG9uRmFkZUluRG9uZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYW5lbERvbmVBbmltYXRpbmcgPSB0aGlzLnBhbmVsT3BlbjtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoICYmIHRoaXMuX3BhbmVsT3Blbikge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2guZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRm9jdXMoKSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fZm9jdXNlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxzIHRoZSB0b3VjaGVkIGNhbGxiYWNrIG9ubHkgaWYgdGhlIHBhbmVsIGlzIGNsb3NlZC4gT3RoZXJ3aXNlLCB0aGUgdHJpZ2dlciB3aWxsXG4gICAgICogXCJibHVyXCIgdG8gdGhlIHBhbmVsIHdoZW4gaXQgb3BlbnMsIGNhdXNpbmcgYSBmYWxzZSBwb3NpdGl2ZS5cbiAgICAgKi9cbiAgICBvbkJsdXIoKSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgIXRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0aGF0IGlzIGludm9rZWQgd2hlbiB0aGUgb3ZlcmxheSBwYW5lbCBoYXMgYmVlbiBhdHRhY2hlZC5cbiAgICAgKi9cbiAgICBvbkF0dGFjaGVkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm92ZXJsYXlEaXIucG9zaXRpb25DaGFuZ2VcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRPdmVybGF5UG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNDb250YWluZXIubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSB0aGlzLnNjcm9sbFRvcDtcblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2Nyb2xsU2l6ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgdGhlIHRoZW1lIHRvIGJlIHVzZWQgb24gdGhlIHBhbmVsLiAqL1xuICAgIGdldFBhbmVsVGhlbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudEZvcm1GaWVsZCA/IGBtYy0ke3RoaXMuX3BhcmVudEZvcm1GaWVsZC5jb2xvcn1gIDogJyc7XG4gICAgfVxuXG4gICAgLyoqIEZvY3VzZXMgdGhlIHNlbGVjdCBlbGVtZW50LiAqL1xuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWNGb3JtRmllbGRDb250cm9sLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBvbkNvbnRhaW5lckNsaWNrKCkge1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cblxuICAgIC8qKiBJbnZva2VkIHdoZW4gYW4gb3B0aW9uIGlzIGNsaWNrZWQuICovXG4gICAgb25SZW1vdmVNYXRjaGVySXRlbShvcHRpb246IE1jT3B0aW9uLCAkZXZlbnQpOiB2b2lkIHtcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIG9wdGlvbi5kZXNlbGVjdCgpO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZUhpZGRlbkl0ZW1zKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jdXN0b21UcmlnZ2VyIHx8IHRoaXMuZW1wdHkgfHwgIXRoaXMubXVsdGlwbGUpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgbGV0IHZpc2libGVJdGVtczogbnVtYmVyID0gMDtcbiAgICAgICAgY29uc3QgdG90YWxJdGVtc1dpZHRoID0gdGhpcy5nZXRUb3RhbEl0ZW1zV2lkdGhJbk1hdGNoZXIoKTtcbiAgICAgICAgbGV0IHRvdGFsVmlzaWJsZUl0ZW1zV2lkdGg6IG51bWJlciA9IDA7XG5cbiAgICAgICAgdGhpcy50YWdzLmZvckVhY2goKHRhZykgPT4ge1xuICAgICAgICAgICAgaWYgKHRhZy5uYXRpdmVFbGVtZW50Lm9mZnNldFRvcCA8IHRhZy5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCkge1xuICAgICAgICAgICAgICAgIHRvdGFsVmlzaWJsZUl0ZW1zV2lkdGggKz0gdGhpcy5nZXRJdGVtV2lkdGgodGFnLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHZpc2libGVJdGVtcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmhpZGRlbkl0ZW1zID0gKHRoaXMuc2VsZWN0ZWQgYXMgQXJyYXlMaWtlPE1jT3B0aW9uPikubGVuZ3RoIC0gdmlzaWJsZUl0ZW1zO1xuXG4gICAgICAgIGlmICh0aGlzLmhpZGRlbkl0ZW1zKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtc0NvdW50ZXIgPSB0aGlzLnRyaWdnZXIubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWMtc2VsZWN0X19tYXRjaC1oaWRkZW4tdGV4dCcpO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlckxpc3QgPSB0aGlzLnRyaWdnZXIubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWMtc2VsZWN0X19tYXRjaC1saXN0Jyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zQ291bnRlclNob3dlZCA9IGl0ZW1zQ291bnRlci5vZmZzZXRUb3AgPCBpdGVtc0NvdW50ZXIub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgLy8gY29uc3QgaXRlbXNDb3VudGVyV2lkdGg6IG51bWJlciA9IGl0ZW1zQ291bnRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zQ291bnRlcldpZHRoOiBudW1iZXIgPSA4NjtcblxuICAgICAgICAgICAgY29uc3QgbWF0Y2hlckxpc3RXaWR0aDogbnVtYmVyID0gbWF0Y2hlckxpc3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVyV2lkdGg6IG51bWJlciA9IG1hdGNoZXJMaXN0V2lkdGggKyBpdGVtc0NvdW50ZXJXaWR0aDtcblxuICAgICAgICAgICAgaWYgKGl0ZW1zQ291bnRlclNob3dlZCAmJiAodG90YWxJdGVtc1dpZHRoIDwgbWF0Y2hlcldpZHRoKSkgeyB0aGlzLmhpZGRlbkl0ZW1zID0gMDsgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdG90YWxWaXNpYmxlSXRlbXNXaWR0aCA9PT0gbWF0Y2hlckxpc3RXaWR0aCB8fFxuICAgICAgICAgICAgICAgICh0b3RhbFZpc2libGVJdGVtc1dpZHRoICsgaXRlbXNDb3VudGVyV2lkdGgpIDwgbWF0Y2hlckxpc3RXaWR0aFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghaXRlbXNDb3VudGVyU2hvd2VkICYmICh0b3RhbEl0ZW1zV2lkdGggKyBpdGVtc0NvdW50ZXJXaWR0aCkgPiBtYXRjaGVyV2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkl0ZW1zKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBnZXRJdGVtSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZmlyc3QgPyB0aGlzLm9wdGlvbnMuZmlyc3QuZ2V0SGVpZ2h0KCkgOiAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SGVpZ2h0T2ZPcHRpb25zQ29udGFpbmVyKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnNDb250YWluZXIubmF0aXZlRWxlbWVudC5nZXRDbGllbnRSZWN0cygpWzBdLmhlaWdodDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVNjcm9sbFNpemUoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLmZpcnN0KSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMua2V5TWFuYWdlci53aXRoU2Nyb2xsU2l6ZShcbiAgICAgICAgICAgIE1hdGguZmxvb3IodGhpcy5nZXRIZWlnaHRPZk9wdGlvbnNDb250YWluZXIoKSAvIHRoaXMub3B0aW9ucy5maXJzdC5nZXRIZWlnaHQoKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRvdGFsSXRlbXNXaWR0aEluTWF0Y2hlcigpOiBudW1iZXIge1xuICAgICAgICBjb25zdCB0cmlnZ2VyQ2xvbmUgPSB0aGlzLnRyaWdnZXIubmF0aXZlRWxlbWVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIHRyaWdnZXJDbG9uZS5xdWVyeVNlbGVjdG9yKCcubWMtc2VsZWN0X19tYXRjaC1oaWRkZW4tdGV4dCcpLnJlbW92ZSgpO1xuXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRyaWdnZXJDbG9uZSwgJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRyaWdnZXJDbG9uZSwgJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRyaWdnZXJDbG9uZSwgJ3RvcCcsICctMTAwJScpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0cmlnZ2VyQ2xvbmUsICdsZWZ0JywgJzAnKTtcblxuICAgICAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLnRyaWdnZXIubmF0aXZlRWxlbWVudCwgdHJpZ2dlckNsb25lKTtcblxuICAgICAgICBsZXQgdG90YWxJdGVtc1dpZHRoOiBudW1iZXIgPSAwO1xuICAgICAgICB0cmlnZ2VyQ2xvbmUucXVlcnlTZWxlY3RvckFsbCgnbWMtdGFnJykuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdG90YWxJdGVtc1dpZHRoICs9IHRoaXMuZ2V0SXRlbVdpZHRoKGl0ZW0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0cmlnZ2VyQ2xvbmUucmVtb3ZlKCk7XG5cbiAgICAgICAgcmV0dXJuIHRvdGFsSXRlbXNXaWR0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEl0ZW1XaWR0aChlbGVtZW50OiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcblxuICAgICAgICBjb25zdCB3aWR0aDogbnVtYmVyID0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS53aWR0aCBhcyBzdHJpbmcpO1xuICAgICAgICBjb25zdCBtYXJnaW5MZWZ0OiBudW1iZXIgPSBwYXJzZUludChjb21wdXRlZFN0eWxlLm1hcmdpbkxlZnQgYXMgc3RyaW5nKTtcbiAgICAgICAgY29uc3QgbWFyZ2luUmlnaHQ6IG51bWJlciA9IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUubWFyZ2luUmlnaHQgYXMgc3RyaW5nKTtcblxuICAgICAgICByZXR1cm4gd2lkdGggKyBtYXJnaW5MZWZ0ICsgbWFyZ2luUmlnaHQ7XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMga2V5Ym9hcmQgZXZlbnRzIHdoaWxlIHRoZSBzZWxlY3QgaXMgY2xvc2VkLiAqL1xuICAgIHByaXZhdGUgaGFuZGxlQ2xvc2VkS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgKi9cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG4gICAgICAgIGNvbnN0IGlzQXJyb3dLZXkgPSBrZXlDb2RlID09PSBET1dOX0FSUk9XIHx8IGtleUNvZGUgPT09IFVQX0FSUk9XIHx8XG4gICAgICAgICAgICBrZXlDb2RlID09PSBMRUZUX0FSUk9XIHx8IGtleUNvZGUgPT09IFJJR0hUX0FSUk9XO1xuICAgICAgICBjb25zdCBpc09wZW5LZXkgPSBrZXlDb2RlID09PSBFTlRFUiB8fCBrZXlDb2RlID09PSBTUEFDRTtcblxuICAgICAgICAvLyBPcGVuIHRoZSBzZWxlY3Qgb24gQUxUICsgYXJyb3cga2V5IHRvIG1hdGNoIHRoZSBuYXRpdmUgPHNlbGVjdD5cbiAgICAgICAgaWYgKGlzT3BlbktleSB8fCAoKHRoaXMubXVsdGlwbGUgfHwgZXZlbnQuYWx0S2V5KSAmJiBpc0Fycm93S2V5KSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudHMgdGhlIHBhZ2UgZnJvbSBzY3JvbGxpbmcgZG93biB3aGVuIHByZXNzaW5nIHNwYWNlXG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyBrZXlib2FyZCBldmVudHMgd2hlbiB0aGUgc2VsZWN0ZWQgaXMgb3Blbi4gKi9cbiAgICBwcml2YXRlIGhhbmRsZU9wZW5LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSAqL1xuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcbiAgICAgICAgY29uc3QgaXNBcnJvd0tleSA9IGtleUNvZGUgPT09IERPV05fQVJST1cgfHwga2V5Q29kZSA9PT0gVVBfQVJST1c7XG4gICAgICAgIGNvbnN0IG1hbmFnZXIgPSB0aGlzLmtleU1hbmFnZXI7XG5cbiAgICAgICAgaWYgKGlzQXJyb3dLZXkgJiYgZXZlbnQuYWx0S2V5KSB7XG4gICAgICAgICAgICAvLyBDbG9zZSB0aGUgc2VsZWN0IG9uIEFMVCArIGFycm93IGtleSB0byBtYXRjaCB0aGUgbmF0aXZlIDxzZWxlY3Q+XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IEhPTUUpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIG1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gRU5EKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBtYW5hZ2VyLnNldExhc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gUEFHRV9VUCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgbWFuYWdlci5zZXRQcmV2aW91c1BhZ2VJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gUEFHRV9ET1dOKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBtYW5hZ2VyLnNldE5leHRQYWdlSXRlbUFjdGl2ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKChrZXlDb2RlID09PSBFTlRFUiB8fCBrZXlDb2RlID09PSBTUEFDRSkgJiYgbWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbWFuYWdlci5hY3RpdmVJdGVtLnNlbGVjdFZpYUludGVyYWN0aW9uKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbXVsdGlwbGUgJiYga2V5Q29kZSA9PT0gQSAmJiBldmVudC5jdHJsS2V5KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgaGFzRGVzZWxlY3RlZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiAhb3B0aW9uLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzRGVzZWxlY3RlZE9wdGlvbnMgJiYgIW9wdGlvbi5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb24uc2VsZWN0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c2x5Rm9jdXNlZEluZGV4ID0gbWFuYWdlci5hY3RpdmVJdGVtSW5kZXg7XG5cbiAgICAgICAgICAgIG1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX211bHRpcGxlICYmIGlzQXJyb3dLZXkgJiYgZXZlbnQuc2hpZnRLZXkgJiYgbWFuYWdlci5hY3RpdmVJdGVtICYmXG4gICAgICAgICAgICAgICAgbWFuYWdlci5hY3RpdmVJdGVtSW5kZXggIT09IHByZXZpb3VzbHlGb2N1c2VkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBtYW5hZ2VyLmFjdGl2ZUl0ZW0uc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZVNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICAgICAgLy8gRGVmZXIgc2V0dGluZyB0aGUgdmFsdWUgaW4gb3JkZXIgdG8gYXZvaWQgdGhlIFwiRXhwcmVzc2lvblxuICAgICAgICAvLyBoYXMgY2hhbmdlZCBhZnRlciBpdCB3YXMgY2hlY2tlZFwiIGVycm9ycyBmcm9tIEFuZ3VsYXIuXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25CeVZhbHVlKHRoaXMubmdDb250cm9sID8gdGhpcy5uZ0NvbnRyb2wudmFsdWUgOiB0aGlzLl92YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHNlbGVjdGVkIG9wdGlvbiBiYXNlZCBvbiBhIHZhbHVlLiBJZiBubyBvcHRpb24gY2FuIGJlXG4gICAgICogZm91bmQgd2l0aCB0aGUgZGVzaWduYXRlZCB2YWx1ZSwgdGhlIHNlbGVjdCB0cmlnZ2VyIGlzIGNsZWFyZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRTZWxlY3Rpb25CeVZhbHVlKHZhbHVlOiBhbnkgfCBhbnlbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLnByZXZpb3VzU2VsZWN0aW9uTW9kZWxTZWxlY3RlZCA9IHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWQ7XG5cbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBnZXRNY1NlbGVjdE5vbkFycmF5VmFsdWVFcnJvcigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKChjdXJyZW50VmFsdWU6IGFueSkgPT4gdGhpcy5zZWxlY3RWYWx1ZShjdXJyZW50VmFsdWUpKTtcbiAgICAgICAgICAgIHRoaXMuc29ydFZhbHVlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuICAgICAgICAgICAgY29uc3QgY29ycmVzcG9uZGluZ09wdGlvbiA9IHRoaXMuc2VsZWN0VmFsdWUodmFsdWUpO1xuXG4gICAgICAgICAgICAvLyBTaGlmdCBmb2N1cyB0byB0aGUgYWN0aXZlIGl0ZW0uIE5vdGUgdGhhdCB3ZSBzaG91bGRuJ3QgZG8gdGhpcyBpbiBtdWx0aXBsZVxuICAgICAgICAgICAgLy8gbW9kZSwgYmVjYXVzZSB3ZSBkb24ndCBrbm93IHdoYXQgb3B0aW9uIHRoZSB1c2VyIGludGVyYWN0ZWQgd2l0aCBsYXN0LlxuICAgICAgICAgICAgaWYgKGNvcnJlc3BvbmRpbmdPcHRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShjb3JyZXNwb25kaW5nT3B0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q29ycmVzcG9uZE9wdGlvbih2YWx1ZTogYW55KTogTWNPcHRpb24gfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLnRvQXJyYXkoKSxcbiAgICAgICAgICAgIC4uLnRoaXMucHJldmlvdXNTZWxlY3Rpb25Nb2RlbFNlbGVjdGVkXG4gICAgICAgIF0uZmluZCgob3B0aW9uOiBNY09wdGlvbikgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAvLyBUcmVhdCBudWxsIGFzIGEgc3BlY2lhbCByZXNldCB2YWx1ZS5cbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uLnZhbHVlICE9IG51bGwgJiYgdGhpcy5jb21wYXJlV2l0aChvcHRpb24udmFsdWUsIHZhbHVlKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5vdGlmeSBkZXZlbG9wZXJzIG9mIGVycm9ycyBpbiB0aGVpciBjb21wYXJhdG9yLlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZHMgYW5kIHNlbGVjdHMgYW5kIG9wdGlvbiBiYXNlZCBvbiBpdHMgdmFsdWUuXG4gICAgICogQHJldHVybnMgT3B0aW9uIHRoYXQgaGFzIHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlLlxuICAgICAqL1xuICAgIHByaXZhdGUgc2VsZWN0VmFsdWUodmFsdWU6IGFueSk6IE1jT3B0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgY29uc3QgY29ycmVzcG9uZGluZ09wdGlvbiA9IHRoaXMuZ2V0Q29ycmVzcG9uZE9wdGlvbih2YWx1ZSk7XG5cbiAgICAgICAgaWYgKGNvcnJlc3BvbmRpbmdPcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0KGNvcnJlc3BvbmRpbmdPcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvcnJlc3BvbmRpbmdPcHRpb247XG4gICAgfVxuXG4gICAgLyoqIFNldHMgdXAgYSBrZXkgbWFuYWdlciB0byBsaXN0ZW4gdG8ga2V5Ym9hcmQgZXZlbnRzIG9uIHRoZSBvdmVybGF5IHBhbmVsLiAqL1xuICAgIHByaXZhdGUgaW5pdEtleU1hbmFnZXIoKSB7XG4gICAgICAgIGNvbnN0IHR5cGVBaGVhZERlYm91bmNlID0gMjAwO1xuXG4gICAgICAgIHRoaXMua2V5TWFuYWdlciA9IG5ldyBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlcjxNY09wdGlvbj4odGhpcy5vcHRpb25zKVxuICAgICAgICAgICAgLndpdGhUeXBlQWhlYWQodHlwZUFoZWFkRGVib3VuY2UsIHRoaXMuc2VhcmNoID8gLTEgOiAwKVxuICAgICAgICAgICAgLndpdGhWZXJ0aWNhbE9yaWVudGF0aW9uKClcbiAgICAgICAgICAgIC53aXRoSG9yaXpvbnRhbE9yaWVudGF0aW9uKHRoaXMuaXNSdGwoKSA/ICdydGwnIDogJ2x0cicpO1xuXG4gICAgICAgIHRoaXMua2V5TWFuYWdlci50YWJPdXRcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gUmVzdG9yZSBmb2N1cyB0byB0aGUgdHJpZ2dlciBiZWZvcmUgY2xvc2luZy4gRW5zdXJlcyB0aGF0IHRoZSBmb2N1c1xuICAgICAgICAgICAgICAgIC8vIHBvc2l0aW9uIHdvbid0IGJlIGxvc3QgaWYgdGhlIHVzZXIgZ290IGZvY3VzIGludG8gdGhlIG92ZXJsYXkuXG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMua2V5TWFuYWdlci5jaGFuZ2VcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3BhbmVsT3BlbiAmJiB0aGlzLnBhbmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsQWN0aXZlT3B0aW9uSW50b1ZpZXcoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl9wYW5lbE9wZW4gJiYgIXRoaXMubXVsdGlwbGUgJiYgdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0uc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogRHJvcHMgY3VycmVudCBvcHRpb24gc3Vic2NyaXB0aW9ucyBhbmQgSURzIGFuZCByZXNldHMgZnJvbSBzY3JhdGNoLiAqL1xuICAgIHByaXZhdGUgcmVzZXRPcHRpb25zKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjaGFuZ2VkT3JEZXN0cm95ZWQgPSBtZXJnZSh0aGlzLm9wdGlvbnMuY2hhbmdlcywgdGhpcy5kZXN0cm95KTtcblxuICAgICAgICB0aGlzLm9wdGlvblNlbGVjdGlvbkNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbChjaGFuZ2VkT3JEZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0KGV2ZW50LnNvdXJjZSwgZXZlbnQuaXNVc2VySW5wdXQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VhcmNoICYmIHRoaXMuc2VhcmNoLmlzU2VhcmNoQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHRoaXMua2V5TWFuYWdlci51cGRhdGVBY3RpdmVJdGVtKDApKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaC5pc1NlYXJjaENoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuaXNVc2VySW5wdXQgJiYgIXRoaXMubXVsdGlwbGUgJiYgdGhpcy5fcGFuZWxPcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIExpc3RlbiB0byBjaGFuZ2VzIGluIHRoZSBpbnRlcm5hbCBzdGF0ZSBvZiB0aGUgb3B0aW9ucyBhbmQgcmVhY3QgYWNjb3JkaW5nbHkuXG4gICAgICAgIC8vIEhhbmRsZXMgY2FzZXMgbGlrZSB0aGUgbGFiZWxzIG9mIHRoZSBzZWxlY3RlZCBvcHRpb25zIGNoYW5naW5nLlxuICAgICAgICBtZXJnZSguLi50aGlzLm9wdGlvbnMubWFwKChvcHRpb24pID0+IG9wdGlvbi5zdGF0ZUNoYW5nZXMpKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKGNoYW5nZWRPckRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogSW52b2tlZCB3aGVuIGFuIG9wdGlvbiBpcyBjbGlja2VkLiAqL1xuICAgIHByaXZhdGUgb25TZWxlY3Qob3B0aW9uOiBNY09wdGlvbiwgaXNVc2VySW5wdXQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgd2FzU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGlvbk1vZGVsLmlzU2VsZWN0ZWQob3B0aW9uKTtcblxuICAgICAgICBpZiAob3B0aW9uLnZhbHVlID09IG51bGwgJiYgIXRoaXMuX211bHRpcGxlKSB7XG4gICAgICAgICAgICBvcHRpb24uZGVzZWxlY3QoKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlcyhvcHRpb24udmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0KG9wdGlvbik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuZGVzZWxlY3Qob3B0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzVXNlcklucHV0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0ob3B0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRWYWx1ZXMoKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc1VzZXJJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJbiBjYXNlIHRoZSB1c2VyIHNlbGVjdGVkIHRoZSBvcHRpb24gd2l0aCB0aGVpciBtb3VzZSwgd2VcbiAgICAgICAgICAgICAgICAgICAgLy8gd2FudCB0byByZXN0b3JlIGZvY3VzIGJhY2sgdG8gdGhlIHRyaWdnZXIsIGluIG9yZGVyIHRvXG4gICAgICAgICAgICAgICAgICAgIC8vIHByZXZlbnQgdGhlIHNlbGVjdCBrZXlib2FyZCBjb250cm9scyBmcm9tIGNsYXNoaW5nIHdpdGhcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIG9uZXMgZnJvbSBgbWMtb3B0aW9uYC5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgc2VhcmNoIGlzIGF2YWxpYWJsZSB0aGVuIHdlIGZvY3VzIHNlYXJjaCBhZ2Fpbi5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VhcmNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHdhc1NlbGVjdGVkICE9PSB0aGlzLnNlbGVjdGlvbk1vZGVsLmlzU2VsZWN0ZWQob3B0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgLyoqIFNvcnRzIHRoZSBzZWxlY3RlZCB2YWx1ZXMgaW4gdGhlIHNlbGVjdGVkIGJhc2VkIG9uIHRoZWlyIG9yZGVyIGluIHRoZSBwYW5lbC4gKi9cbiAgICBwcml2YXRlIHNvcnRWYWx1ZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zLnRvQXJyYXkoKTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc29ydENvbXBhcmF0b3IgPyB0aGlzLnNvcnRDb21wYXJhdG9yKGEsIGIsIG9wdGlvbnMpIDpcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5pbmRleE9mKGEpIC0gb3B0aW9ucy5pbmRleE9mKGIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRW1pdHMgY2hhbmdlIGV2ZW50IHRvIHNldCB0aGUgbW9kZWwgdmFsdWUuICovXG4gICAgcHJpdmF0ZSBwcm9wYWdhdGVDaGFuZ2VzKGZhbGxiYWNrVmFsdWU/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgbGV0IHZhbHVlVG9FbWl0OiBhbnkgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICB2YWx1ZVRvRW1pdCA9ICh0aGlzLnNlbGVjdGVkIGFzIE1jT3B0aW9uW10pLm1hcCgob3B0aW9uKSA9PiBvcHRpb24udmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsdWVUb0VtaXQgPSB0aGlzLnNlbGVjdGVkID8gKHRoaXMuc2VsZWN0ZWQgYXMgTWNPcHRpb24pLnZhbHVlIDogZmFsbGJhY2tWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWVUb0VtaXQ7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZVRvRW1pdCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWVUb0VtaXQpO1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KG5ldyBNY1NlbGVjdENoYW5nZSh0aGlzLCB2YWx1ZVRvRW1pdCkpO1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWdobGlnaHRzIHRoZSBzZWxlY3RlZCBpdGVtLiBJZiBubyBvcHRpb24gaXMgc2VsZWN0ZWQsIGl0IHdpbGwgaGlnaGxpZ2h0XG4gICAgICogdGhlIGZpcnN0IGl0ZW0gaW5zdGVhZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGhpZ2hsaWdodENvcnJlY3RPcHRpb24oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmtleU1hbmFnZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVtcHR5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbSh0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdGVkWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBTY3JvbGxzIHRoZSBhY3RpdmUgb3B0aW9uIGludG8gdmlldy4gKi9cbiAgICBwcml2YXRlIHNjcm9sbEFjdGl2ZU9wdGlvbkludG9WaWV3KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBhY3RpdmVPcHRpb25JbmRleCA9IHRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggfHwgMDtcbiAgICAgICAgY29uc3QgbGFiZWxDb3VudCA9IGNvdW50R3JvdXBMYWJlbHNCZWZvcmVPcHRpb24oYWN0aXZlT3B0aW9uSW5kZXgsIHRoaXMub3B0aW9ucywgdGhpcy5vcHRpb25Hcm91cHMpO1xuXG4gICAgICAgIHRoaXMub3B0aW9uc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IGdldE9wdGlvblNjcm9sbFBvc2l0aW9uKFxuICAgICAgICAgICAgYWN0aXZlT3B0aW9uSW5kZXggKyBsYWJlbENvdW50LFxuICAgICAgICAgICAgdGhpcy5nZXRJdGVtSGVpZ2h0KCksXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNDb250YWluZXIubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICAgICAgICBTRUxFQ1RfUEFORUxfTUFYX0hFSUdIVFxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHgtb2Zmc2V0IG9mIHRoZSBvdmVybGF5IHBhbmVsIGluIHJlbGF0aW9uIHRvIHRoZSB0cmlnZ2VyJ3MgdG9wIHN0YXJ0IGNvcm5lci5cbiAgICAgKiBUaGlzIG11c3QgYmUgYWRqdXN0ZWQgdG8gYWxpZ24gdGhlIHNlbGVjdGVkIG9wdGlvbiB0ZXh0IG92ZXIgdGhlIHRyaWdnZXIgdGV4dCB3aGVuXG4gICAgICogdGhlIHBhbmVsIG9wZW5zLiBXaWxsIGNoYW5nZSBiYXNlZCBvbiBMVFIgb3IgUlRMIHRleHQgZGlyZWN0aW9uLiBOb3RlIHRoYXQgdGhlIG9mZnNldFxuICAgICAqIGNhbid0IGJlIGNhbGN1bGF0ZWQgdW50aWwgdGhlIHBhbmVsIGhhcyBiZWVuIGF0dGFjaGVkLCBiZWNhdXNlIHdlIG5lZWQgdG8ga25vdyB0aGVcbiAgICAgKiBjb250ZW50IHdpZHRoIGluIG9yZGVyIHRvIGNvbnN0cmFpbiB0aGUgcGFuZWwgd2l0aGluIHRoZSB2aWV3cG9ydC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNldE92ZXJsYXlQb3NpdGlvbigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXNldE92ZXJsYXkoKTtcblxuICAgICAgICBjb25zdCBvdmVybGF5UmVjdCA9IHRoaXMuZ2V0T3ZlcmxheVJlY3QoKTtcbiAgICAgICAgLy8gV2luZG93IHdpZHRoIHdpdGhvdXQgc2Nyb2xsYmFyXG4gICAgICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gdGhpcy5nZXRCYWNrZHJvcFdpZHRoKCk7XG4gICAgICAgIGNvbnN0IGlzUnRsID0gdGhpcy5pc1J0bCgpO1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbWFnaWMtbnVtYmVycyAqL1xuICAgICAgICBjb25zdCBwYWRkaW5nV2lkdGggPSBTRUxFQ1RfUEFORUxfUEFERElOR19YICogMjtcbiAgICAgICAgbGV0IG9mZnNldFg6IG51bWJlcjtcbiAgICAgICAgbGV0IG92ZXJsYXlNYXhXaWR0aDogbnVtYmVyO1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZFswXSB8fCB0aGlzLm9wdGlvbnMuZmlyc3Q7XG4gICAgICAgIG9mZnNldFggPSBzZWxlY3RlZCAmJiBzZWxlY3RlZC5ncm91cCA/IFNFTEVDVF9QQU5FTF9JTkRFTlRfUEFERElOR19YIDogU0VMRUNUX1BBTkVMX1BBRERJTkdfWDtcblxuICAgICAgICAvLyBJbnZlcnQgdGhlIG9mZnNldCBpbiBMVFIuXG4gICAgICAgIGlmICghaXNSdGwpIHsgb2Zmc2V0WCAqPSAtMTsgfVxuXG4gICAgICAgIC8vIERldGVybWluZSBpZiBzZWxlY3Qgb3ZlcmZsb3dzIG9uIGVpdGhlciBzaWRlLlxuICAgICAgICBjb25zdCBsZWZ0T3ZlcmZsb3cgPSAwIC0gKG92ZXJsYXlSZWN0LmxlZnQgKyBvZmZzZXRYIC0gKGlzUnRsID8gcGFkZGluZ1dpZHRoIDogMCkpO1xuICAgICAgICBjb25zdCByaWdodE92ZXJmbG93ID0gb3ZlcmxheVJlY3QucmlnaHQgKyBvZmZzZXRYIC0gd2luZG93V2lkdGhcbiAgICAgICAgICAgICsgKGlzUnRsID8gMCA6IHBhZGRpbmdXaWR0aCk7XG5cbiAgICAgICAgLy8gSWYgdGhlIGVsZW1lbnQgb3ZlcmZsb3dzIG9uIGVpdGhlciBzaWRlLCByZWR1Y2UgdGhlIG9mZnNldCB0byBhbGxvdyBpdCB0byBmaXQuXG4gICAgICAgIGlmIChsZWZ0T3ZlcmZsb3cgPiAwIHx8IHJpZ2h0T3ZlcmZsb3cgPiAwKSB7XG4gICAgICAgICAgICBbb2Zmc2V0WCwgb3ZlcmxheU1heFdpZHRoXSA9IHRoaXMuY2FsY3VsYXRlT3ZlcmxheVhQb3NpdGlvbihvdmVybGF5UmVjdCwgd2luZG93V2lkdGgsIG9mZnNldFgpO1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5RGlyLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuc3R5bGUubWF4V2lkdGggPSBgJHtvdmVybGF5TWF4V2lkdGh9cHhgO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0IHRoZSBvZmZzZXQgZGlyZWN0bHkgaW4gb3JkZXIgdG8gYXZvaWQgaGF2aW5nIHRvIGdvIHRocm91Z2ggY2hhbmdlIGRldGVjdGlvbiBhbmRcbiAgICAgICAgLy8gcG90ZW50aWFsbHkgdHJpZ2dlcmluZyBcImNoYW5nZWQgYWZ0ZXIgaXQgd2FzIGNoZWNrZWRcIiBlcnJvcnMuIFJvdW5kIHRoZSB2YWx1ZSB0byBhdm9pZFxuICAgICAgICAvLyBibHVycnkgY29udGVudCBpbiBzb21lIGJyb3dzZXJzLlxuICAgICAgICB0aGlzLm92ZXJsYXlEaXIub2Zmc2V0WCA9IE1hdGgucm91bmQob2Zmc2V0WCk7XG4gICAgICAgIHRoaXMub3ZlcmxheURpci5vdmVybGF5UmVmLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVPdmVybGF5WFBvc2l0aW9uKG92ZXJsYXlSZWN0LCB3aW5kb3dXaWR0aCwgYmFzaWNPZmZzZXRYKSB7XG4gICAgICAgIGxldCBvZmZzZXRYID0gYmFzaWNPZmZzZXRYO1xuICAgICAgICBjb25zdCBsZWZ0SW5kZW50ID0gdGhpcy50cmlnZ2VyUmVjdC5sZWZ0O1xuICAgICAgICBjb25zdCByaWdodEluZGVudCA9IHdpbmRvd1dpZHRoIC0gdGhpcy50cmlnZ2VyUmVjdC5yaWdodDtcbiAgICAgICAgLy8gU2V0dGluZyBkaXJlY3Rpb24gb2YgZHJvcGRvd24gZXhwYW5zaW9uXG4gICAgICAgIGNvbnN0IGlzUmlnaHREaXJlY3Rpb24gPSBsZWZ0SW5kZW50IDw9IHJpZ2h0SW5kZW50O1xuXG4gICAgICAgIGxldCBtYXhEcm9wZG93bldpZHRoOiBudW1iZXI7XG4gICAgICAgIGxldCBvdmVybGF5TWF4V2lkdGg6IG51bWJlcjtcbiAgICAgICAgY29uc3QgdHJpZ2dlcldpZHRoID0gdGhpcy50cmlnZ2VyUmVjdC53aWR0aCArIFNFTEVDVF9QQU5FTF9JTkRFTlRfUEFERElOR19YO1xuXG4gICAgICAgIGlmIChpc1JpZ2h0RGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBtYXhEcm9wZG93bldpZHRoID0gcmlnaHRJbmRlbnQgKyB0cmlnZ2VyV2lkdGggLSBTRUxFQ1RfUEFORUxfVklFV1BPUlRfUEFERElORztcbiAgICAgICAgICAgIG92ZXJsYXlNYXhXaWR0aCA9IG92ZXJsYXlSZWN0LndpZHRoIDwgbWF4RHJvcGRvd25XaWR0aCA/IG92ZXJsYXlSZWN0LndpZHRoIDogbWF4RHJvcGRvd25XaWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBsZWZ0T2Zmc2V0O1xuICAgICAgICAgICAgbWF4RHJvcGRvd25XaWR0aCA9IGxlZnRJbmRlbnQgKyB0cmlnZ2VyV2lkdGggLSBTRUxFQ1RfUEFORUxfVklFV1BPUlRfUEFERElORztcblxuICAgICAgICAgICAgaWYgKG92ZXJsYXlSZWN0LndpZHRoIDwgbWF4RHJvcGRvd25XaWR0aCkge1xuICAgICAgICAgICAgICAgIG92ZXJsYXlNYXhXaWR0aCA9IG92ZXJsYXlSZWN0LndpZHRoO1xuICAgICAgICAgICAgICAgIGxlZnRPZmZzZXQgPSB0aGlzLnRyaWdnZXJSZWN0LnJpZ2h0IC0gb3ZlcmxheU1heFdpZHRoO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvdmVybGF5TWF4V2lkdGggPSBtYXhEcm9wZG93bldpZHRoO1xuICAgICAgICAgICAgICAgIGxlZnRPZmZzZXQgPSB0aGlzLnRyaWdnZXJSZWN0LnJpZ2h0IC0gKG92ZXJsYXlNYXhXaWR0aCAtIFNFTEVDVF9QQU5FTF9JTkRFTlRfUEFERElOR19YKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9mZnNldFggLT0gdGhpcy50cmlnZ2VyUmVjdC5sZWZ0IC0gbGVmdE9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbb2Zmc2V0WCwgb3ZlcmxheU1heFdpZHRoXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2V0T3ZlcmxheSgpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5RGlyLm9mZnNldFggPSAwO1xuICAgICAgICB0aGlzLm92ZXJsYXlEaXIub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5zdHlsZS5tYXhXaWR0aCA9ICd1bnNldCc7XG4gICAgICAgIHRoaXMub3ZlcmxheURpci5vdmVybGF5UmVmLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRPdmVybGF5UmVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheURpci5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0QmFja2Ryb3BXaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Nyb2xsU3RyYXRlZ3kuX292ZXJsYXlSZWYuYmFja2Ryb3BFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIH1cblxuICAgIC8qKiBDb21wYXJpc29uIGZ1bmN0aW9uIHRvIHNwZWNpZnkgd2hpY2ggb3B0aW9uIGlzIGRpc3BsYXllZC4gRGVmYXVsdHMgdG8gb2JqZWN0IGVxdWFsaXR5LiAqL1xuICAgIHByaXZhdGUgX2NvbXBhcmVXaXRoID0gKG8xOiBhbnksIG8yOiBhbnkpID0+IG8xID09PSBvMjtcbn1cbiJdfQ==