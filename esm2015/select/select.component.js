/**
 * @fileoverview added by tsickle
 * Generated from: select.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                styles: [".mc-divider{border-top-style:solid;border-top-width:1px;display:block;margin:0}.mc-divider.mc-divider_vertical{border-right-style:solid;border-right-width:1px;border-top:0}.mc-divider.mc-divider_inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:80px}.mc-select{box-sizing:border-box;display:inline-block;outline:none;vertical-align:top;width:100%}.mc-select .mc-select__trigger{box-sizing:border-box;cursor:pointer;display:flex;height:30px;padding-left:15px;padding-right:7px;position:relative}.mc-select .mc-select__trigger.mc-select__trigger_multiple{padding-left:7px}.mc-select.mc-disabled .mc-select__trigger{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;cursor:default;user-select:none}.mc-select__no-options-message{align-items:center;box-sizing:border-box;cursor:default;display:flex;flex-direction:row;height:32px;max-width:100%;outline:none;padding:0 16px;position:relative}.mc-select__matcher{align-items:center;display:flex;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%}.mc-select__matcher>span{width:100%}.mc-select__match-list{display:flex;flex-wrap:wrap;margin:0;max-height:28px;overflow:hidden;padding-left:0}.mc-select__match-list .mc-tag{margin-right:4px}.mc-select__match-container{display:flex;flex-direction:row;justify-content:space-between;width:100%}.mc-select__match-container .mc-select__match-hidden-text{-ms-grid-row-align:center;align-self:center;flex:0 0 70px;padding:0 8px;text-align:right}.mc-select__match-item{border:1px solid transparent;border-radius:3px;display:flex;margin-right:4px;max-width:100%;padding-left:7px}.mc-select__arrow-wrapper{-ms-grid-row-align:center;align-self:center}.mc-form-field-appearance-fill .mc-select__arrow-wrapper,.mc-form-field-appearance-standard .mc-select__arrow-wrapper{transform:translateY(-50%)}.mc-form-field-appearance-outline .mc-select__arrow-wrapper{transform:translateY(-25%)}.mc-select__panel{border-bottom-left-radius:3px;border-bottom-right-radius:3px;border-style:solid;border-width:1px;max-width:640px;min-width:100%;overflow:hidden}.mc-select__panel .mc-optgroup-label,.mc-select__panel .mc-option{font-size:inherit;height:32px;line-height:32px}.mc-select__content{max-height:232px;overflow:auto;padding:4px 0}.mc-form-field-type-mc-select:not(.mc-disabled) .mc-form-field-flex{cursor:pointer}.mc-form-field-type-mc-select .mc-form-field-label{width:calc(100% - 18px)}.mc-select__search-container{border-bottom-style:solid;border-bottom-width:1px}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL3NlbGVjdC8iLCJzb3VyY2VzIjpbInNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRCxPQUFPLEVBR0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixTQUFTLEVBRVQsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFNBQVMsRUFDVCxNQUFNLEVBSU4sUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULElBQUksRUFFSixTQUFTLEVBQ1QsWUFBWSxFQUNaLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUgsZUFBZSxFQUNmLGtCQUFrQixFQUNsQixhQUFhLEVBQ2IsU0FBUyxFQUNULE1BQU0sRUFDTixPQUFPLEVBRVYsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRSxPQUFPLEVBQ0gsVUFBVSxFQUNWLEdBQUcsRUFDSCxLQUFLLEVBQ0wsSUFBSSxFQUNKLFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUNMLFFBQVEsRUFDUixDQUFDLEVBQ0QsTUFBTSxFQUNOLE9BQU8sRUFDUCxTQUFTLEVBQ1osTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBQ0gsNEJBQTRCLEVB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O0lBNHJCckIsZ0NBQXVEOzs7OztJQTl5Qm5ELHNDQUFzRDs7Ozs7SUFDdEQsMkJBQWdDOzs7OztJQUNoQyw2QkFBcUM7O0lBR3JDLGlDQUFvRTs7Ozs7SUFDcEUsd0JBQWlEOzs7OztJQUdqRCxvQ0FBMEQ7O0lBRTFELDJCQUEyQzs7SUFDM0MsbUNBQTJEOzs7OztJQUMzRCwwQ0FBMEU7Ozs7O0lBQzFFLGdDQUE0RSIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlOm5vLWVtcHR5ICovXG5cbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IENka0Nvbm5lY3RlZE92ZXJsYXkgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBEaXJlY3RpdmUsXG4gICAgRG9DaGVjayxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgaXNEZXZNb2RlLFxuICAgIE5nWm9uZSxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFJlbmRlcmVyMixcbiAgICBTZWxmLFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDaGlsZHJlbixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgRm9ybUNvbnRyb2xOYW1lLFxuICAgIEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICBOR19WQUxJREFUT1JTLFxuICAgIE5nQ29udHJvbCxcbiAgICBOZ0Zvcm0sXG4gICAgTmdNb2RlbCxcbiAgICBWYWxpZGF0b3Jcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXIgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIERPV05fQVJST1csXG4gICAgRU5ELFxuICAgIEVOVEVSLFxuICAgIEhPTUUsXG4gICAgTEVGVF9BUlJPVyxcbiAgICBSSUdIVF9BUlJPVyxcbiAgICBTUEFDRSxcbiAgICBVUF9BUlJPVyxcbiAgICBBLFxuICAgIEVTQ0FQRSxcbiAgICBQQUdFX1VQLFxuICAgIFBBR0VfRE9XTlxufSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgICBjb3VudEdyb3VwTGFiZWxzQmVmb3JlT3B0aW9uLFxuICAgIGdldE9wdGlvblNjcm9sbFBvc2l0aW9uLFxuICAgIENhbkRpc2FibGUsXG4gICAgQ2FuRGlzYWJsZUN0b3IsXG4gICAgQ2FuVXBkYXRlRXJyb3JTdGF0ZSxcbiAgICBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvcixcbiAgICBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICBIYXNUYWJJbmRleCxcbiAgICBIYXNUYWJJbmRleEN0b3IsXG4gICAgTUNfT1BUSU9OX1BBUkVOVF9DT01QT05FTlQsXG4gICAgTWNPcHRncm91cCxcbiAgICBNY09wdGlvbixcbiAgICBNY09wdGlvblNlbGVjdGlvbkNoYW5nZSxcbiAgICBtaXhpbkRpc2FibGVkLFxuICAgIG1peGluRXJyb3JTdGF0ZSxcbiAgICBtaXhpblRhYkluZGV4LFxuICAgIG1jU2VsZWN0QW5pbWF0aW9ucyxcblxuICAgIFNFTEVDVF9QQU5FTF9JTkRFTlRfUEFERElOR19YLFxuICAgIFNFTEVDVF9QQU5FTF9NQVhfSEVJR0hULFxuICAgIFNFTEVDVF9QQU5FTF9QQURESU5HX1gsXG4gICAgU0VMRUNUX1BBTkVMX1ZJRVdQT1JUX1BBRERJTkcsXG4gICAgTUNfU0VMRUNUX1NDUk9MTF9TVFJBVEVHWSxcblxuICAgIGdldE1jU2VsZWN0RHluYW1pY011bHRpcGxlRXJyb3IsXG4gICAgZ2V0TWNTZWxlY3ROb25GdW5jdGlvblZhbHVlRXJyb3IsXG4gICAgZ2V0TWNTZWxlY3ROb25BcnJheVZhbHVlRXJyb3IsXG5cbiAgICBzZXRNb3NhaWNWYWxpZGF0aW9uLFxuICAgIE1DX1ZBTElEQVRJT04sXG4gICAgTWNWYWxpZGF0aW9uT3B0aW9uc1xufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0NsZWFuZXIsIE1jRm9ybUZpZWxkLCBNY0Zvcm1GaWVsZENvbnRyb2wgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBNY0lucHV0IH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2lucHV0JztcbmltcG9ydCB7IE1jVGFnIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL3RhZ3MnO1xuaW1wb3J0IHsgZGVmZXIsIG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gICAgZmlsdGVyLFxuICAgIG1hcCxcbiAgICBzdGFydFdpdGgsXG4gICAgc3dpdGNoTWFwLFxuICAgIHRha2UsXG4gICAgdGFrZVVudGlsLFxuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxuLyoqIENoYW5nZSBldmVudCBvYmplY3QgdGhhdCBpcyBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCB2YWx1ZSBoYXMgY2hhbmdlZC4gKi9cbmV4cG9ydCBjbGFzcyBNY1NlbGVjdENoYW5nZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZTogTWNTZWxlY3QsIHB1YmxpYyB2YWx1ZTogYW55KSB7fVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY1NlbGVjdFNlYXJjaF0nLFxuICAgIGV4cG9ydEFzOiAnbWNTZWxlY3RTZWFyY2gnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duKCRldmVudCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1NlbGVjdFNlYXJjaCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gICAgQENvbnRlbnRDaGlsZChNY0lucHV0LCB7IHN0YXRpYzogZmFsc2UgfSkgaW5wdXQ6IE1jSW5wdXQ7XG5cbiAgICBzZWFyY2hDaGFuZ2VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgICBpc1NlYXJjaENoYW5nZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKGZvcm1GaWVsZDogTWNGb3JtRmllbGQpIHtcbiAgICAgICAgZm9ybUZpZWxkLmNhbkNsZWFuZXJDbGVhckJ5RXNjID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICByZXNldCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnB1dC5uZ0NvbnRyb2wucmVzZXQoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pbnB1dCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ01jU2VsZWN0U2VhcmNoIGRvZXMgbm90IHdvcmsgd2l0aG91dCBtY0lucHV0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuaW5wdXQubmdDb250cm9sKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignTWNTZWxlY3RTZWFyY2ggZG9lcyBub3Qgd29yayB3aXRob3V0IG5nQ29udHJvbCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaENoYW5nZXNTdWJzY3JpcHRpb24gPSB0aGlzLmlucHV0Lm5nQ29udHJvbC52YWx1ZUNoYW5nZXMhLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1NlYXJjaENoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlYXJjaENoYW5nZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pbnB1dC52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWMtc2VsZWN0LXNlYXJjaC1lbXB0eS1yZXN1bHRdJyxcbiAgICBleHBvcnRBczogJ21jU2VsZWN0U2VhcmNoRW1wdHlSZXN1bHQnXG59KVxuZXhwb3J0IGNsYXNzIE1jU2VsZWN0U2VhcmNoRW1wdHlSZXN1bHQge31cblxuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdtYy1zZWxlY3QtdHJpZ2dlcicgfSlcbmV4cG9ydCBjbGFzcyBNY1NlbGVjdFRyaWdnZXIge31cblxuXG5leHBvcnQgY2xhc3MgTWNTZWxlY3RCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHB1YmxpYyBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICAgICAgICBwdWJsaWMgcGFyZW50Rm9ybTogTmdGb3JtLFxuICAgICAgICBwdWJsaWMgcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgICAgIHB1YmxpYyBuZ0NvbnRyb2w6IE5nQ29udHJvbFxuICAgICkge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5jb25zdCBNY1NlbGVjdE1peGluQmFzZTogQ2FuRGlzYWJsZUN0b3IgJiBIYXNUYWJJbmRleEN0b3IgJiBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvciAmXG4gICAgdHlwZW9mIE1jU2VsZWN0QmFzZSA9IG1peGluVGFiSW5kZXgobWl4aW5EaXNhYmxlZChtaXhpbkVycm9yU3RhdGUoTWNTZWxlY3RCYXNlKSkpO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtc2VsZWN0JyxcbiAgICBleHBvcnRBczogJ21jU2VsZWN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJ3NlbGVjdC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zZWxlY3Quc2NzcyddLFxuICAgIGlucHV0czogWydkaXNhYmxlZCcsICd0YWJJbmRleCddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG5cbiAgICAgICAgY2xhc3M6ICdtYy1zZWxlY3QnLFxuICAgICAgICAnW2NsYXNzLm1jLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgICAgICdbY2xhc3MubWMtaW52YWxpZF0nOiAnZXJyb3JTdGF0ZScsXG5cbiAgICAgICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duKCRldmVudCknLFxuICAgICAgICAnKGZvY3VzKSc6ICdvbkZvY3VzKCknLFxuICAgICAgICAnKGJsdXIpJzogJ29uQmx1cigpJyxcbiAgICAgICAgJyh3aW5kb3c6cmVzaXplKSc6ICdjYWxjdWxhdGVIaWRkZW5JdGVtcygpJ1xuICAgIH0sXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICBtY1NlbGVjdEFuaW1hdGlvbnMudHJhbnNmb3JtUGFuZWwsXG4gICAgICAgIG1jU2VsZWN0QW5pbWF0aW9ucy5mYWRlSW5Db250ZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBNY0Zvcm1GaWVsZENvbnRyb2wsIHVzZUV4aXN0aW5nOiBNY1NlbGVjdCB9LFxuICAgICAgICB7IHByb3ZpZGU6IE1DX09QVElPTl9QQVJFTlRfQ09NUE9ORU5ULCB1c2VFeGlzdGluZzogTWNTZWxlY3QgfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNTZWxlY3QgZXh0ZW5kcyBNY1NlbGVjdE1peGluQmFzZSBpbXBsZW1lbnRzXG4gICAgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgRG9DaGVjaywgQ29udHJvbFZhbHVlQWNjZXNzb3IsIENhbkRpc2FibGUsXG4gICAgSGFzVGFiSW5kZXgsIE1jRm9ybUZpZWxkQ29udHJvbDxhbnk+LCBDYW5VcGRhdGVFcnJvclN0YXRlIHtcblxuICAgIC8qKiBBIG5hbWUgZm9yIHRoaXMgY29udHJvbCB0aGF0IGNhbiBiZSB1c2VkIGJ5IGBtYy1mb3JtLWZpZWxkYC4gKi9cbiAgICBjb250cm9sVHlwZSA9ICdtYy1zZWxlY3QnO1xuXG4gICAgaGlkZGVuSXRlbXM6IG51bWJlciA9IDA7XG5cbiAgICAvKiogVGhlIGxhc3QgbWVhc3VyZWQgdmFsdWUgZm9yIHRoZSB0cmlnZ2VyJ3MgY2xpZW50IGJvdW5kaW5nIHJlY3QuICovXG4gICAgdHJpZ2dlclJlY3Q6IENsaWVudFJlY3Q7XG5cbiAgICAvKiogVGhlIGNhY2hlZCBmb250LXNpemUgb2YgdGhlIHRyaWdnZXIgZWxlbWVudC4gKi9cbiAgICB0cmlnZ2VyRm9udFNpemUgPSAwO1xuXG4gICAgLyoqIERlYWxzIHdpdGggdGhlIHNlbGVjdGlvbiBsb2dpYy4gKi9cbiAgICBzZWxlY3Rpb25Nb2RlbDogU2VsZWN0aW9uTW9kZWw8TWNPcHRpb24+O1xuXG4gICAgcHJldmlvdXNTZWxlY3Rpb25Nb2RlbFNlbGVjdGVkOiBNY09wdGlvbltdID0gW107XG5cbiAgICAvKiogTWFuYWdlcyBrZXlib2FyZCBldmVudHMgZm9yIG9wdGlvbnMgaW4gdGhlIHBhbmVsLiAqL1xuICAgIGtleU1hbmFnZXI6IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPE1jT3B0aW9uPjtcblxuICAgIC8qKiBUaGUgdmFsdWUgb2YgdGhlIHNlbGVjdCBwYW5lbCdzIHRyYW5zZm9ybS1vcmlnaW4gcHJvcGVydHkuICovXG4gICAgdHJhbnNmb3JtT3JpZ2luOiBzdHJpbmcgPSAndG9wJztcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBwYW5lbCdzIGFuaW1hdGlvbiBpcyBkb25lLiAqL1xuICAgIHBhbmVsRG9uZUFuaW1hdGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIHBhbmVsIGVsZW1lbnQgaXMgZmluaXNoZWQgdHJhbnNmb3JtaW5nIGluLiAqL1xuICAgIHBhbmVsRG9uZUFuaW1hdGluZ1N0cmVhbSA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuICAgIC8qKiBTdHJhdGVneSB0aGF0IHdpbGwgYmUgdXNlZCB0byBoYW5kbGUgc2Nyb2xsaW5nIHdoaWxlIHRoZSBzZWxlY3QgcGFuZWwgaXMgb3Blbi4gKi9cbiAgICBzY3JvbGxTdHJhdGVneSA9IHRoaXMuX3Njcm9sbFN0cmF0ZWd5RmFjdG9yeSgpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHktb2Zmc2V0IG9mIHRoZSBvdmVybGF5IHBhbmVsIGluIHJlbGF0aW9uIHRvIHRoZSB0cmlnZ2VyJ3MgdG9wIHN0YXJ0IGNvcm5lci5cbiAgICAgKiBUaGlzIG11c3QgYmUgYWRqdXN0ZWQgdG8gYWxpZ24gdGhlIHNlbGVjdGVkIG9wdGlvbiB0ZXh0IG92ZXIgdGhlIHRyaWdnZXIgdGV4dC5cbiAgICAgKiB3aGVuIHRoZSBwYW5lbCBvcGVucy4gV2lsbCBjaGFuZ2UgYmFzZWQgb24gdGhlIHktcG9zaXRpb24gb2YgdGhlIHNlbGVjdGVkIG9wdGlvbi5cbiAgICAgKi9cbiAgICBvZmZzZXRZID0gMDtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgcG9zaXRpb24gY29uZmlnIGVuc3VyZXMgdGhhdCB0aGUgdG9wIFwic3RhcnRcIiBjb3JuZXIgb2YgdGhlIG92ZXJsYXlcbiAgICAgKiBpcyBhbGlnbmVkIHdpdGggd2l0aCB0aGUgdG9wIFwic3RhcnRcIiBvZiB0aGUgb3JpZ2luIGJ5IGRlZmF1bHQgKG92ZXJsYXBwaW5nXG4gICAgICogdGhlIHRyaWdnZXIgY29tcGxldGVseSkuIElmIHRoZSBwYW5lbCBjYW5ub3QgZml0IGJlbG93IHRoZSB0cmlnZ2VyLCBpdFxuICAgICAqIHdpbGwgZmFsbCBiYWNrIHRvIGEgcG9zaXRpb24gYWJvdmUgdGhlIHRyaWdnZXIuXG4gICAgICovXG4gICAgcG9zaXRpb25zID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXG4gICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgIG92ZXJsYXlZOiAndG9wJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJ1xuICAgICAgICB9XG4gICAgXTtcblxuICAgIEBWaWV3Q2hpbGQoJ3RyaWdnZXInLCB7IHN0YXRpYzogZmFsc2UgfSkgdHJpZ2dlcjogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ3BhbmVsJywgeyBzdGF0aWM6IGZhbHNlIH0pIHBhbmVsOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgnb3B0aW9uc0NvbnRhaW5lcicsIHsgc3RhdGljOiBmYWxzZSB9KSBvcHRpb25zQ29udGFpbmVyOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZChDZGtDb25uZWN0ZWRPdmVybGF5LCB7IHN0YXRpYzogZmFsc2UgfSkgb3ZlcmxheURpcjogQ2RrQ29ubmVjdGVkT3ZlcmxheTtcblxuICAgIEBWaWV3Q2hpbGRyZW4oTWNUYWcpIHRhZ3M6IFF1ZXJ5TGlzdDxNY1RhZz47XG5cbiAgICAvKiogVXNlci1zdXBwbGllZCBvdmVycmlkZSBvZiB0aGUgdHJpZ2dlciBlbGVtZW50LiAqL1xuICAgIEBDb250ZW50Q2hpbGQoTWNTZWxlY3RUcmlnZ2VyLCB7IHN0YXRpYzogZmFsc2UgfSkgY3VzdG9tVHJpZ2dlcjogTWNTZWxlY3RUcmlnZ2VyO1xuXG4gICAgQENvbnRlbnRDaGlsZCgnbWNTZWxlY3RDbGVhbmVyJywgeyBzdGF0aWM6IHRydWUgfSkgY2xlYW5lcjogTWNDbGVhbmVyO1xuXG4gICAgLyoqIEFsbCBvZiB0aGUgZGVmaW5lZCBzZWxlY3Qgb3B0aW9ucy4gKi9cbiAgICBAQ29udGVudENoaWxkcmVuKE1jT3B0aW9uLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIG9wdGlvbnM6IFF1ZXJ5TGlzdDxNY09wdGlvbj47XG5cbiAgICAvKiogQWxsIG9mIHRoZSBkZWZpbmVkIGdyb3VwcyBvZiBvcHRpb25zLiAqL1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNPcHRncm91cCkgb3B0aW9uR3JvdXBzOiBRdWVyeUxpc3Q8TWNPcHRncm91cD47XG5cbiAgICBAQ29udGVudENoaWxkKE1jU2VsZWN0U2VhcmNoLCB7IHN0YXRpYzogZmFsc2UgfSkgc2VhcmNoOiBNY1NlbGVjdFNlYXJjaDtcblxuICAgIEBJbnB1dCgpIGhpZGRlbkl0ZW1zVGV4dDogc3RyaW5nID0gJy4uLtC10YnRkSc7XG5cbiAgICAvKiogQ2xhc3NlcyB0byBiZSBwYXNzZWQgdG8gdGhlIHNlbGVjdCBwYW5lbC4gU3VwcG9ydHMgdGhlIHNhbWUgc3ludGF4IGFzIGBuZ0NsYXNzYC4gKi9cbiAgICBASW5wdXQoKSBwYW5lbENsYXNzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+IHwgeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcblxuICAgIC8qKiBPYmplY3QgdXNlZCB0byBjb250cm9sIHdoZW4gZXJyb3IgbWVzc2FnZXMgYXJlIHNob3duLiAqL1xuICAgIEBJbnB1dCgpIGVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcjtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHVzZWQgdG8gc29ydCB0aGUgdmFsdWVzIGluIGEgc2VsZWN0IGluIG11bHRpcGxlIG1vZGUuXG4gICAgICogRm9sbG93cyB0aGUgc2FtZSBsb2dpYyBhcyBgQXJyYXkucHJvdG90eXBlLnNvcnRgLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHNvcnRDb21wYXJhdG9yOiAoYTogTWNPcHRpb24sIGI6IE1jT3B0aW9uLCBvcHRpb25zOiBNY09wdGlvbltdKSA9PiBudW1iZXI7XG5cbiAgICAvKiogQ29tYmluZWQgc3RyZWFtIG9mIGFsbCBvZiB0aGUgY2hpbGQgb3B0aW9ucycgY2hhbmdlIGV2ZW50cy4gKi9cbiAgICByZWFkb25seSBvcHRpb25TZWxlY3Rpb25DaGFuZ2VzOiBPYnNlcnZhYmxlPE1jT3B0aW9uU2VsZWN0aW9uQ2hhbmdlPiA9IGRlZmVyKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIG1lcmdlKFxuICAgICAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gb3B0aW9uLm9uU2VsZWN0aW9uQ2hhbmdlKSxcbiAgICAgICAgICAgICAgICAuLi50aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdGVkLm1hcCgob3B0aW9uKSA9PiBvcHRpb24ub25TZWxlY3Rpb25DaGFuZ2UpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX25nWm9uZS5vblN0YWJsZVxuICAgICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpLCBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5vcHRpb25TZWxlY3Rpb25DaGFuZ2VzKSk7XG4gICAgfSkgYXMgT2JzZXJ2YWJsZTxNY09wdGlvblNlbGVjdGlvbkNoYW5nZT47XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3QgcGFuZWwgaGFzIGJlZW4gdG9nZ2xlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgb3BlbmVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3QgaGFzIGJlZW4gb3BlbmVkLiAqL1xuICAgIEBPdXRwdXQoJ29wZW5lZCcpIHJlYWRvbmx5IG9wZW5lZFN0cmVhbTogT2JzZXJ2YWJsZTx2b2lkPiA9XG4gICAgICAgIHRoaXMub3BlbmVkQ2hhbmdlLnBpcGUoZmlsdGVyKChvKSA9PiBvKSwgbWFwKCgpID0+IHt9KSk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3QgaGFzIGJlZW4gY2xvc2VkLiAqL1xuICAgIEBPdXRwdXQoJ2Nsb3NlZCcpIHJlYWRvbmx5IGNsb3NlZFN0cmVhbTogT2JzZXJ2YWJsZTx2b2lkPiA9XG4gICAgICAgIHRoaXMub3BlbmVkQ2hhbmdlLnBpcGUoZmlsdGVyKChvKSA9PiAhbyksIG1hcCgoKSA9PiB7fSkpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0ZWQgdmFsdWUgaGFzIGJlZW4gY2hhbmdlZCBieSB0aGUgdXNlci4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TWNTZWxlY3RDaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxNY1NlbGVjdENoYW5nZT4oKTtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IHRoYXQgZW1pdHMgd2hlbmV2ZXIgdGhlIHJhdyB2YWx1ZSBvZiB0aGUgc2VsZWN0IGNoYW5nZXMuIFRoaXMgaXMgaGVyZSBwcmltYXJpbHlcbiAgICAgKiB0byBmYWNpbGl0YXRlIHRoZSB0d28td2F5IGJpbmRpbmcgZm9yIHRoZSBgdmFsdWVgIGlucHV0LlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBwbGFjZWhvbGRlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGxhY2Vob2xkZXI7XG4gICAgfVxuXG4gICAgc2V0IHBsYWNlaG9sZGVyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXIgPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7XG4gICAgfVxuXG4gICAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG11bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbXVsdGlwbGU7XG4gICAgfVxuXG4gICAgc2V0IG11bHRpcGxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGVsKSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRNY1NlbGVjdER5bmFtaWNNdWx0aXBsZUVycm9yKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9tdWx0aXBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGNvbXBhcmUgdGhlIG9wdGlvbiB2YWx1ZXMgd2l0aCB0aGUgc2VsZWN0ZWQgdmFsdWVzLiBUaGUgZmlyc3QgYXJndW1lbnRcbiAgICAgKiBpcyBhIHZhbHVlIGZyb20gYW4gb3B0aW9uLiBUaGUgc2Vjb25kIGlzIGEgdmFsdWUgZnJvbSB0aGUgc2VsZWN0aW9uLiBBIGJvb2xlYW5cbiAgICAgKiBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgY29tcGFyZVdpdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wYXJlV2l0aDtcbiAgICB9XG5cbiAgICBzZXQgY29tcGFyZVdpdGgoZm46IChvMTogYW55LCBvMjogYW55KSA9PiBib29sZWFuKSB7XG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpzdHJpY3QtdHlwZS1wcmVkaWNhdGVzICovXG4gICAgICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IGdldE1jU2VsZWN0Tm9uRnVuY3Rpb25WYWx1ZUVycm9yKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb21wYXJlV2l0aCA9IGZuO1xuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGVsKSB7XG4gICAgICAgICAgICAvLyBBIGRpZmZlcmVudCBjb21wYXJhdG9yIG1lYW5zIHRoZSBzZWxlY3Rpb24gY291bGQgY2hhbmdlLlxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVmFsdWUgb2YgdGhlIHNlbGVjdCBjb250cm9sLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUobmV3VmFsdWU6IGFueSkge1xuICAgICAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMuX3ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLndyaXRlVmFsdWUobmV3VmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3ZhbHVlOiBhbnk7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBpZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfVxuXG4gICAgc2V0IGlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faWQgPSB2YWx1ZSB8fCB0aGlzLnVpZDtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lkOiBzdHJpbmc7XG5cbiAgICAvKiogV2hldGhlciB0aGUgc2VsZWN0IGlzIGZvY3VzZWQuICovXG4gICAgZ2V0IGZvY3VzZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mb2N1c2VkIHx8IHRoaXMuX3BhbmVsT3BlbjtcbiAgICB9XG5cbiAgICBzZXQgZm9jdXNlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9mb2N1c2VkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZm9jdXNlZCA9IGZhbHNlO1xuXG4gICAgZ2V0IHBhbmVsT3BlbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhbmVsT3BlbjtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9wYW5lbE9wZW4gPSBmYWxzZTtcblxuICAgIGdldCBpc0VtcHR5U2VhcmNoUmVzdWx0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2ggJiYgdGhpcy5vcHRpb25zLmxlbmd0aCA9PT0gMCAmJiAhIXRoaXMuc2VhcmNoLmlucHV0LnZhbHVlO1xuICAgIH1cblxuICAgIGdldCBjYW5TaG93Q2xlYW5lcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xlYW5lciAmJiB0aGlzLnNlbGVjdGlvbk1vZGVsLmhhc1ZhbHVlKCk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBzY3JvbGwgcG9zaXRpb24gb2YgdGhlIG92ZXJsYXkgcGFuZWwsIGNhbGN1bGF0ZWQgdG8gY2VudGVyIHRoZSBzZWxlY3RlZCBvcHRpb24uICovXG4gICAgcHJpdmF0ZSBzY3JvbGxUb3AgPSAwO1xuXG4gICAgLyoqIFVuaXF1ZSBpZCBmb3IgdGhpcyBpbnB1dC4gKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IHVpZCA9IGBtYy1zZWxlY3QtJHtuZXh0VW5pcXVlSWQrK31gO1xuXG4gICAgLyoqIEVtaXRzIHdoZW5ldmVyIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkLiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChOR19WQUxJREFUT1JTKSBwdWJsaWMgcmF3VmFsaWRhdG9yczogVmFsaWRhdG9yW10sXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcmVhZG9ubHkgX2RpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgIEBPcHRpb25hbCgpIHBhcmVudEZvcm06IE5nRm9ybSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcmVhZG9ubHkgX3BhcmVudEZvcm1GaWVsZDogTWNGb3JtRmllbGQsXG4gICAgICAgIEBTZWxmKCkgQE9wdGlvbmFsKCkgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIG5nTW9kZWw6IE5nTW9kZWwsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIGZvcm1Db250cm9sTmFtZTogRm9ybUNvbnRyb2xOYW1lLFxuICAgICAgICBASW5qZWN0KE1DX1NFTEVDVF9TQ1JPTExfU1RSQVRFR1kpIHByaXZhdGUgcmVhZG9ubHkgX3Njcm9sbFN0cmF0ZWd5RmFjdG9yeSxcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQ19WQUxJREFUSU9OKSBwcml2YXRlIG1jVmFsaWRhdGlvbjogTWNWYWxpZGF0aW9uT3B0aW9uc1xuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmLCBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXIsIHBhcmVudEZvcm0sIHBhcmVudEZvcm1Hcm91cCwgbmdDb250cm9sKTtcblxuICAgICAgICBpZiAodGhpcy5uZ0NvbnRyb2wpIHtcbiAgICAgICAgICAgIC8vIE5vdGU6IHdlIHByb3ZpZGUgdGhlIHZhbHVlIGFjY2Vzc29yIHRocm91Z2ggaGVyZSwgaW5zdGVhZCBvZlxuICAgICAgICAgICAgLy8gdGhlIGBwcm92aWRlcnNgIHRvIGF2b2lkIHJ1bm5pbmcgaW50byBhIGNpcmN1bGFyIGltcG9ydC5cbiAgICAgICAgICAgIHRoaXMubmdDb250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRm9yY2Ugc2V0dGVyIHRvIGJlIGNhbGxlZCBpbiBjYXNlIGlkIHdhcyBub3Qgc3BlY2lmaWVkLlxuICAgICAgICB0aGlzLmlkID0gdGhpcy5pZDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbCA9IG5ldyBTZWxlY3Rpb25Nb2RlbDxNY09wdGlvbj4odGhpcy5tdWx0aXBsZSk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcblxuICAgICAgICAvLyBXZSBuZWVkIGBkaXN0aW5jdFVudGlsQ2hhbmdlZGAgaGVyZSwgYmVjYXVzZSBzb21lIGJyb3dzZXJzIHdpbGxcbiAgICAgICAgLy8gZmlyZSB0aGUgYW5pbWF0aW9uIGVuZCBldmVudCB0d2ljZSBmb3IgdGhlIHNhbWUgYW5pbWF0aW9uLiBTZWU6XG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzI0MDg0XG4gICAgICAgIHRoaXMucGFuZWxEb25lQW5pbWF0aW5nU3RyZWFtXG4gICAgICAgICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLCB0YWtlVW50aWwodGhpcy5kZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvcCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbmVkQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFuZWxEb25lQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMubWNWYWxpZGF0aW9uLnVzZVZhbGlkYXRpb24pIHtcbiAgICAgICAgICAgIHNldE1vc2FpY1ZhbGlkYXRpb24odGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRLZXlNYW5hZ2VyKCk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5jaGFuZ2VkXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQuYWRkZWQuZm9yRWFjaCgob3B0aW9uKSA9PiBvcHRpb24uc2VsZWN0KCkpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnJlbW92ZWQuZm9yRWFjaCgob3B0aW9uKSA9PiBvcHRpb24uZGVzZWxlY3QoKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm9wdGlvbnMuY2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoc3RhcnRXaXRoKG51bGwpLCB0YWtlVW50aWwodGhpcy5kZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRPcHRpb25zKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFncy5jaGFuZ2VzXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY2FsY3VsYXRlSGlkZGVuSXRlbXMoKSwgMCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0RvQ2hlY2soKSB7XG4gICAgICAgIGlmICh0aGlzLm5nQ29udHJvbCkgeyB0aGlzLnVwZGF0ZUVycm9yU3RhdGUoKTsgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgLy8gVXBkYXRpbmcgdGhlIGRpc2FibGVkIHN0YXRlIGlzIGhhbmRsZWQgYnkgYG1peGluRGlzYWJsZWRgLCBidXQgd2UgbmVlZCB0byBhZGRpdGlvbmFsbHkgbGV0XG4gICAgICAgIC8vIHRoZSBwYXJlbnQgZm9ybSBmaWVsZCBrbm93IHRvIHJ1biBjaGFuZ2UgZGV0ZWN0aW9uIHdoZW4gdGhlIGRpc2FibGVkIHN0YXRlIGNoYW5nZXMuXG4gICAgICAgIGlmIChjaGFuZ2VzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5kZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBoaWRkZW5JdGVtc1RleHRGb3JtYXR0ZXIoaGlkZGVuSXRlbXNUZXh0OiBzdHJpbmcsIGhpZGRlbkl0ZW1zOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7aGlkZGVuSXRlbXNUZXh0fSAke2hpZGRlbkl0ZW1zfWA7XG4gICAgfVxuXG4gICAgY2xlYXJWYWx1ZSgkZXZlbnQpOiB2b2lkIHtcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oLTEpO1xuXG4gICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlcygpO1xuICAgIH1cblxuICAgIC8qKiBgVmlldyAtPiBtb2RlbCBjYWxsYmFjayBjYWxsZWQgd2hlbiB2YWx1ZSBjaGFuZ2VzYCAqL1xuICAgIG9uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gICAgLyoqIGBWaWV3IC0+IG1vZGVsIGNhbGxiYWNrIGNhbGxlZCB3aGVuIHNlbGVjdCBoYXMgYmVlbiB0b3VjaGVkYCAqL1xuICAgIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gICAgcmVzZXRTZWFyY2goKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaCkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2gucmVzZXQoKTtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICB0b2RvIHRoZSBpbmNvcnJlY3QgYmVoYXZpb3VyIG9mIGtleU1hbmFnZXIgaXMgcG9zc2libGUgaGVyZVxuICAgICAgICAgICAgdG8gYXZvaWQgZmlyc3QgaXRlbSBzZWxlY3Rpb24gKHRvIHByb3ZpZGUgY29ycmVjdCBvcHRpb25zIGZsaXBwaW5nIG9uIGNsb3NlZCBzZWxlY3QpXG4gICAgICAgICAgICB3ZSBzaG91bGQgcHJvY2VzcyBvcHRpb25zIHVwZGF0ZSBsaWtlIGl0IGlzIHRoZSBmaXJzdCBvcHRpb25zIGFwcGVhcmFuY2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5zZWFyY2guaXNTZWFyY2hDaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVG9nZ2xlcyB0aGUgb3ZlcmxheSBwYW5lbCBvcGVuIG9yIGNsb3NlZC4gKi9cbiAgICB0b2dnbGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogT3BlbnMgdGhlIG92ZXJsYXkgcGFuZWwuICovXG4gICAgb3BlbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgIXRoaXMub3B0aW9ucyB8fCAhdGhpcy5vcHRpb25zLmxlbmd0aCB8fCB0aGlzLl9wYW5lbE9wZW4pIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyUmVjdCA9IHRoaXMudHJpZ2dlci5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAvLyBOb3RlOiBUaGUgY29tcHV0ZWQgZm9udC1zaXplIHdpbGwgYmUgYSBzdHJpbmcgcGl4ZWwgdmFsdWUgKGUuZy4gXCIxNnB4XCIpLlxuICAgICAgICAvLyBgcGFyc2VJbnRgIGlnbm9yZXMgdGhlIHRyYWlsaW5nICdweCcgYW5kIGNvbnZlcnRzIHRoaXMgdG8gYSBudW1iZXIuXG4gICAgICAgIHRoaXMudHJpZ2dlckZvbnRTaXplID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnRyaWdnZXIubmF0aXZlRWxlbWVudClbJ2ZvbnQtc2l6ZSddKTtcblxuICAgICAgICB0aGlzLl9wYW5lbE9wZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmtleU1hbmFnZXIud2l0aEhvcml6b250YWxPcmllbnRhdGlvbihudWxsKTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRDb3JyZWN0T3B0aW9uKCk7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICAgIC8vIFNldCB0aGUgZm9udCBzaXplIG9uIHRoZSBwYW5lbCBlbGVtZW50IG9uY2UgaXQgZXhpc3RzLlxuICAgICAgICB0aGlzLl9uZ1pvbmUub25TdGFibGUuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlnZ2VyRm9udFNpemUgJiYgdGhpcy5vdmVybGF5RGlyLm92ZXJsYXlSZWYgJiYgdGhpcy5vdmVybGF5RGlyLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5RGlyLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuc3R5bGUuZm9udFNpemUgPSBgJHt0aGlzLnRyaWdnZXJGb250U2l6ZX1weGA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIENsb3NlcyB0aGUgb3ZlcmxheSBwYW5lbCBhbmQgZm9jdXNlcyB0aGUgaG9zdCBlbGVtZW50LiAqL1xuICAgIGNsb3NlKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX3BhbmVsT3BlbikgeyByZXR1cm47IH1cblxuICAgICAgICAvLyB0aGUgb3JkZXIgb2YgY2FsbHMgaXMgaW1wb3J0YW50XG4gICAgICAgIHRoaXMucmVzZXRTZWFyY2goKTtcbiAgICAgICAgdGhpcy5fcGFuZWxPcGVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMua2V5TWFuYWdlci53aXRoSG9yaXpvbnRhbE9yaWVudGF0aW9uKHRoaXMuaXNSdGwoKSA/ICdydGwnIDogJ2x0cicpO1xuXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHNlbGVjdCdzIHZhbHVlLiBQYXJ0IG9mIHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgICAgKiByZXF1aXJlZCB0byBpbnRlZ3JhdGUgd2l0aCBBbmd1bGFyJ3MgY29yZSBmb3JtcyBBUEkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWUgTmV3IHZhbHVlIHRvIGJlIHdyaXR0ZW4gdG8gdGhlIG1vZGVsLlxuICAgICAqL1xuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvbkJ5VmFsdWUodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2F2ZXMgYSBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBpbnZva2VkIHdoZW4gdGhlIHNlbGVjdCdzIHZhbHVlXG4gICAgICogY2hhbmdlcyBmcm9tIHVzZXIgaW5wdXQuIFBhcnQgb2YgdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICAgICAqIHJlcXVpcmVkIHRvIGludGVncmF0ZSB3aXRoIEFuZ3VsYXIncyBjb3JlIGZvcm1zIEFQSS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmbiBDYWxsYmFjayB0byBiZSB0cmlnZ2VyZWQgd2hlbiB0aGUgdmFsdWUgY2hhbmdlcy5cbiAgICAgKi9cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2F2ZXMgYSBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBpbnZva2VkIHdoZW4gdGhlIHNlbGVjdCBpcyBibHVycmVkXG4gICAgICogYnkgdGhlIHVzZXIuIFBhcnQgb2YgdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZSByZXF1aXJlZFxuICAgICAqIHRvIGludGVncmF0ZSB3aXRoIEFuZ3VsYXIncyBjb3JlIGZvcm1zIEFQSS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmbiBDYWxsYmFjayB0byBiZSB0cmlnZ2VyZWQgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIHRvdWNoZWQuXG4gICAgICovXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZXMgdGhlIHNlbGVjdC4gUGFydCBvZiB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlIHJlcXVpcmVkXG4gICAgICogdG8gaW50ZWdyYXRlIHdpdGggQW5ndWxhcidzIGNvcmUgZm9ybXMgQVBJLlxuICAgICAqXG4gICAgICogQHBhcmFtIGlzRGlzYWJsZWQgU2V0cyB3aGV0aGVyIHRoZSBjb21wb25lbnQgaXMgZGlzYWJsZWQuXG4gICAgICovXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIGdldCBzZWxlY3RlZCgpOiBNY09wdGlvbiB8IE1jT3B0aW9uW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5tdWx0aXBsZSA/IHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWQgOiB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdGVkWzBdO1xuICAgIH1cblxuICAgIGdldCB0cmlnZ2VyVmFsdWUoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuZW1wdHkpIHsgcmV0dXJuICcnOyB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF0udmlld1ZhbHVlO1xuICAgIH1cblxuICAgIGdldCB0cmlnZ2VyVmFsdWVzKCk6IE1jT3B0aW9uW10ge1xuICAgICAgICBpZiAodGhpcy5lbXB0eSkgeyByZXR1cm4gW107IH1cblxuICAgICAgICBjb25zdCBzZWxlY3RlZE9wdGlvbnMgPSB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdGVkO1xuXG4gICAgICAgIGlmICh0aGlzLmlzUnRsKCkpIHsgc2VsZWN0ZWRPcHRpb25zLnJldmVyc2UoKTsgfVxuXG4gICAgICAgIHJldHVybiBzZWxlY3RlZE9wdGlvbnM7XG4gICAgfVxuXG4gICAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuc2VsZWN0aW9uTW9kZWwgfHwgdGhpcy5zZWxlY3Rpb25Nb2RlbC5pc0VtcHR5KCk7XG4gICAgfVxuXG4gICAgaXNSdGwoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXIgPyB0aGlzLl9kaXIudmFsdWUgPT09ICdydGwnIDogZmFsc2U7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlT3BlbktleWRvd24oZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNsb3NlZEtleWRvd24oZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiB0aGUgcGFuZWwgY29udGVudCBpcyBkb25lIGZhZGluZyBpbiwgdGhlIHBhbmVsRG9uZUFuaW1hdGluZyBwcm9wZXJ0eSBpc1xuICAgICAqIHNldCBzbyB0aGUgcHJvcGVyIGNsYXNzIGNhbiBiZSBhZGRlZCB0byB0aGUgcGFuZWwuXG4gICAgICovXG4gICAgb25GYWRlSW5Eb25lKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBhbmVsRG9uZUFuaW1hdGluZyA9IHRoaXMucGFuZWxPcGVuO1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcblxuICAgICAgICBpZiAodGhpcy5zZWFyY2ggJiYgdGhpcy5fcGFuZWxPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Gb2N1cygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9mb2N1c2VkID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbHMgdGhlIHRvdWNoZWQgY2FsbGJhY2sgb25seSBpZiB0aGUgcGFuZWwgaXMgY2xvc2VkLiBPdGhlcndpc2UsIHRoZSB0cmlnZ2VyIHdpbGxcbiAgICAgKiBcImJsdXJcIiB0byB0aGUgcGFuZWwgd2hlbiBpdCBvcGVucywgY2F1c2luZyBhIGZhbHNlIHBvc2l0aXZlLlxuICAgICAqL1xuICAgIG9uQmx1cigpIHtcbiAgICAgICAgdGhpcy5fZm9jdXNlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiAhdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRoYXQgaXMgaW52b2tlZCB3aGVuIHRoZSBvdmVybGF5IHBhbmVsIGhhcyBiZWVuIGF0dGFjaGVkLlxuICAgICAqL1xuICAgIG9uQXR0YWNoZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3ZlcmxheURpci5wb3NpdGlvbkNoYW5nZVxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldE92ZXJsYXlQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IHRoaXMuc2Nyb2xsVG9wO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JvbGxTaXplKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyB0aGUgdGhlbWUgdG8gYmUgdXNlZCBvbiB0aGUgcGFuZWwuICovXG4gICAgZ2V0UGFuZWxUaGVtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50Rm9ybUZpZWxkID8gYG1jLSR7dGhpcy5fcGFyZW50Rm9ybUZpZWxkLmNvbG9yfWAgOiAnJztcbiAgICB9XG5cbiAgICAvKiogRm9jdXNlcyB0aGUgc2VsZWN0IGVsZW1lbnQuICovXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uQ29udGFpbmVyQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuXG4gICAgLyoqIEludm9rZWQgd2hlbiBhbiBvcHRpb24gaXMgY2xpY2tlZC4gKi9cbiAgICBvblJlbW92ZU1hdGNoZXJJdGVtKG9wdGlvbjogTWNPcHRpb24sICRldmVudCk6IHZvaWQge1xuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlSGlkZGVuSXRlbXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbVRyaWdnZXIgfHwgdGhpcy5lbXB0eSB8fCAhdGhpcy5tdWx0aXBsZSkgeyByZXR1cm47IH1cblxuICAgICAgICBsZXQgdmlzaWJsZUl0ZW1zOiBudW1iZXIgPSAwO1xuICAgICAgICBjb25zdCB0b3RhbEl0ZW1zV2lkdGggPSB0aGlzLmdldFRvdGFsSXRlbXNXaWR0aEluTWF0Y2hlcigpO1xuICAgICAgICBsZXQgdG90YWxWaXNpYmxlSXRlbXNXaWR0aDogbnVtYmVyID0gMDtcblxuICAgICAgICB0aGlzLnRhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XG4gICAgICAgICAgICBpZiAodGFnLm5hdGl2ZUVsZW1lbnQub2Zmc2V0VG9wIDwgdGFnLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdG90YWxWaXNpYmxlSXRlbXNXaWR0aCArPSB0aGlzLmdldEl0ZW1XaWR0aCh0YWcubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgdmlzaWJsZUl0ZW1zKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaGlkZGVuSXRlbXMgPSAodGhpcy5zZWxlY3RlZCBhcyBBcnJheUxpa2U8TWNPcHRpb24+KS5sZW5ndGggLSB2aXNpYmxlSXRlbXM7XG5cbiAgICAgICAgaWYgKHRoaXMuaGlkZGVuSXRlbXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zQ291bnRlciA9IHRoaXMudHJpZ2dlci5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYy1zZWxlY3RfX21hdGNoLWhpZGRlbi10ZXh0Jyk7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVyTGlzdCA9IHRoaXMudHJpZ2dlci5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYy1zZWxlY3RfX21hdGNoLWxpc3QnKTtcblxuICAgICAgICAgICAgY29uc3QgaXRlbXNDb3VudGVyU2hvd2VkID0gaXRlbXNDb3VudGVyLm9mZnNldFRvcCA8IGl0ZW1zQ291bnRlci5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAvLyBjb25zdCBpdGVtc0NvdW50ZXJXaWR0aDogbnVtYmVyID0gaXRlbXNDb3VudGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICAgICAgY29uc3QgaXRlbXNDb3VudGVyV2lkdGg6IG51bWJlciA9IDg2O1xuXG4gICAgICAgICAgICBjb25zdCBtYXRjaGVyTGlzdFdpZHRoOiBudW1iZXIgPSBtYXRjaGVyTGlzdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXJXaWR0aDogbnVtYmVyID0gbWF0Y2hlckxpc3RXaWR0aCArIGl0ZW1zQ291bnRlcldpZHRoO1xuXG4gICAgICAgICAgICBpZiAoaXRlbXNDb3VudGVyU2hvd2VkICYmICh0b3RhbEl0ZW1zV2lkdGggPCBtYXRjaGVyV2lkdGgpKSB7IHRoaXMuaGlkZGVuSXRlbXMgPSAwOyB9XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0b3RhbFZpc2libGVJdGVtc1dpZHRoID09PSBtYXRjaGVyTGlzdFdpZHRoIHx8XG4gICAgICAgICAgICAgICAgKHRvdGFsVmlzaWJsZUl0ZW1zV2lkdGggKyBpdGVtc0NvdW50ZXJXaWR0aCkgPCBtYXRjaGVyTGlzdFdpZHRoXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFpdGVtc0NvdW50ZXJTaG93ZWQgJiYgKHRvdGFsSXRlbXNXaWR0aCArIGl0ZW1zQ291bnRlcldpZHRoKSA+IG1hdGNoZXJXaWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZGVuSXRlbXMrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGdldEl0ZW1IZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5maXJzdCA/IHRoaXMub3B0aW9ucy5maXJzdC5nZXRIZWlnaHQoKSA6IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRIZWlnaHRPZk9wdGlvbnNDb250YWluZXIoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LmdldENsaWVudFJlY3RzKClbMF0uaGVpZ2h0O1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlU2Nyb2xsU2l6ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuZmlyc3QpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLndpdGhTY3JvbGxTaXplKFxuICAgICAgICAgICAgTWF0aC5mbG9vcih0aGlzLmdldEhlaWdodE9mT3B0aW9uc0NvbnRhaW5lcigpIC8gdGhpcy5vcHRpb25zLmZpcnN0LmdldEhlaWdodCgpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VG90YWxJdGVtc1dpZHRoSW5NYXRjaGVyKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHRyaWdnZXJDbG9uZSA9IHRoaXMudHJpZ2dlci5uYXRpdmVFbGVtZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgdHJpZ2dlckNsb25lLnF1ZXJ5U2VsZWN0b3IoJy5tYy1zZWxlY3RfX21hdGNoLWhpZGRlbi10ZXh0JykucmVtb3ZlKCk7XG5cbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodHJpZ2dlckNsb25lLCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodHJpZ2dlckNsb25lLCAndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodHJpZ2dlckNsb25lLCAndG9wJywgJy0xMDAlJyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRyaWdnZXJDbG9uZSwgJ2xlZnQnLCAnMCcpO1xuXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMudHJpZ2dlci5uYXRpdmVFbGVtZW50LCB0cmlnZ2VyQ2xvbmUpO1xuXG4gICAgICAgIGxldCB0b3RhbEl0ZW1zV2lkdGg6IG51bWJlciA9IDA7XG4gICAgICAgIHRyaWdnZXJDbG9uZS5xdWVyeVNlbGVjdG9yQWxsKCdtYy10YWcnKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0b3RhbEl0ZW1zV2lkdGggKz0gdGhpcy5nZXRJdGVtV2lkdGgoaXRlbSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRyaWdnZXJDbG9uZS5yZW1vdmUoKTtcblxuICAgICAgICByZXR1cm4gdG90YWxJdGVtc1dpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SXRlbVdpZHRoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuXG4gICAgICAgIGNvbnN0IHdpZHRoOiBudW1iZXIgPSBwYXJzZUludChjb21wdXRlZFN0eWxlLndpZHRoIGFzIHN0cmluZyk7XG4gICAgICAgIGNvbnN0IG1hcmdpbkxlZnQ6IG51bWJlciA9IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUubWFyZ2luTGVmdCBhcyBzdHJpbmcpO1xuICAgICAgICBjb25zdCBtYXJnaW5SaWdodDogbnVtYmVyID0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS5tYXJnaW5SaWdodCBhcyBzdHJpbmcpO1xuXG4gICAgICAgIHJldHVybiB3aWR0aCArIG1hcmdpbkxlZnQgKyBtYXJnaW5SaWdodDtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyBrZXlib2FyZCBldmVudHMgd2hpbGUgdGhlIHNlbGVjdCBpcyBjbG9zZWQuICovXG4gICAgcHJpdmF0ZSBoYW5kbGVDbG9zZWRLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSAqL1xuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcbiAgICAgICAgY29uc3QgaXNBcnJvd0tleSA9IGtleUNvZGUgPT09IERPV05fQVJST1cgfHwga2V5Q29kZSA9PT0gVVBfQVJST1cgfHxcbiAgICAgICAgICAgIGtleUNvZGUgPT09IExFRlRfQVJST1cgfHwga2V5Q29kZSA9PT0gUklHSFRfQVJST1c7XG4gICAgICAgIGNvbnN0IGlzT3BlbktleSA9IGtleUNvZGUgPT09IEVOVEVSIHx8IGtleUNvZGUgPT09IFNQQUNFO1xuXG4gICAgICAgIC8vIE9wZW4gdGhlIHNlbGVjdCBvbiBBTFQgKyBhcnJvdyBrZXkgdG8gbWF0Y2ggdGhlIG5hdGl2ZSA8c2VsZWN0PlxuICAgICAgICBpZiAoaXNPcGVuS2V5IHx8ICgodGhpcy5tdWx0aXBsZSB8fCBldmVudC5hbHRLZXkpICYmIGlzQXJyb3dLZXkpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50cyB0aGUgcGFnZSBmcm9tIHNjcm9sbGluZyBkb3duIHdoZW4gcHJlc3Npbmcgc3BhY2VcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBIYW5kbGVzIGtleWJvYXJkIGV2ZW50cyB3aGVuIHRoZSBzZWxlY3RlZCBpcyBvcGVuLiAqL1xuICAgIHByaXZhdGUgaGFuZGxlT3BlbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lICovXG4gICAgICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuICAgICAgICBjb25zdCBpc0Fycm93S2V5ID0ga2V5Q29kZSA9PT0gRE9XTl9BUlJPVyB8fCBrZXlDb2RlID09PSBVUF9BUlJPVztcbiAgICAgICAgY29uc3QgbWFuYWdlciA9IHRoaXMua2V5TWFuYWdlcjtcblxuICAgICAgICBpZiAoaXNBcnJvd0tleSAmJiBldmVudC5hbHRLZXkpIHtcbiAgICAgICAgICAgIC8vIENsb3NlIHRoZSBzZWxlY3Qgb24gQUxUICsgYXJyb3cga2V5IHRvIG1hdGNoIHRoZSBuYXRpdmUgPHNlbGVjdD5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gSE9NRSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgbWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBFTkQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIG1hbmFnZXIuc2V0TGFzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBQQUdFX1VQKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBtYW5hZ2VyLnNldFByZXZpb3VzUGFnZUl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBQQUdFX0RPV04pIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIG1hbmFnZXIuc2V0TmV4dFBhZ2VJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoKGtleUNvZGUgPT09IEVOVEVSIHx8IGtleUNvZGUgPT09IFNQQUNFKSAmJiBtYW5hZ2VyLmFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBtYW5hZ2VyLmFjdGl2ZUl0ZW0uc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9tdWx0aXBsZSAmJiBrZXlDb2RlID09PSBBICYmIGV2ZW50LmN0cmxLZXkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBoYXNEZXNlbGVjdGVkT3B0aW9ucyA9IHRoaXMub3B0aW9ucy5zb21lKChvcHRpb24pID0+ICFvcHRpb24uc2VsZWN0ZWQpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChoYXNEZXNlbGVjdGVkT3B0aW9ucyAmJiAhb3B0aW9uLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3QoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb24uZGVzZWxlY3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzbHlGb2N1c2VkSW5kZXggPSBtYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleDtcblxuICAgICAgICAgICAgbWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGUgJiYgaXNBcnJvd0tleSAmJiBldmVudC5zaGlmdEtleSAmJiBtYW5hZ2VyLmFjdGl2ZUl0ZW0gJiZcbiAgICAgICAgICAgICAgICBtYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCAhPT0gcHJldmlvdXNseUZvY3VzZWRJbmRleCkge1xuICAgICAgICAgICAgICAgIG1hbmFnZXIuYWN0aXZlSXRlbS5zZWxlY3RWaWFJbnRlcmFjdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgICAgICAvLyBEZWZlciBzZXR0aW5nIHRoZSB2YWx1ZSBpbiBvcmRlciB0byBhdm9pZCB0aGUgXCJFeHByZXNzaW9uXG4gICAgICAgIC8vIGhhcyBjaGFuZ2VkIGFmdGVyIGl0IHdhcyBjaGVja2VkXCIgZXJyb3JzIGZyb20gQW5ndWxhci5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvbkJ5VmFsdWUodGhpcy5uZ0NvbnRyb2wgPyB0aGlzLm5nQ29udHJvbC52YWx1ZSA6IHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgc2VsZWN0ZWQgb3B0aW9uIGJhc2VkIG9uIGEgdmFsdWUuIElmIG5vIG9wdGlvbiBjYW4gYmVcbiAgICAgKiBmb3VuZCB3aXRoIHRoZSBkZXNpZ25hdGVkIHZhbHVlLCB0aGUgc2VsZWN0IHRyaWdnZXIgaXMgY2xlYXJlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNldFNlbGVjdGlvbkJ5VmFsdWUodmFsdWU6IGFueSB8IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMucHJldmlvdXNTZWxlY3Rpb25Nb2RlbFNlbGVjdGVkID0gdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZDtcblxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRocm93IGdldE1jU2VsZWN0Tm9uQXJyYXlWYWx1ZUVycm9yKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcbiAgICAgICAgICAgIHZhbHVlLmZvckVhY2goKGN1cnJlbnRWYWx1ZTogYW55KSA9PiB0aGlzLnNlbGVjdFZhbHVlKGN1cnJlbnRWYWx1ZSkpO1xuICAgICAgICAgICAgdGhpcy5zb3J0VmFsdWVzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgICAgICAgICBjb25zdCBjb3JyZXNwb25kaW5nT3B0aW9uID0gdGhpcy5zZWxlY3RWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgICAgICAgIC8vIFNoaWZ0IGZvY3VzIHRvIHRoZSBhY3RpdmUgaXRlbS4gTm90ZSB0aGF0IHdlIHNob3VsZG4ndCBkbyB0aGlzIGluIG11bHRpcGxlXG4gICAgICAgICAgICAvLyBtb2RlLCBiZWNhdXNlIHdlIGRvbid0IGtub3cgd2hhdCBvcHRpb24gdGhlIHVzZXIgaW50ZXJhY3RlZCB3aXRoIGxhc3QuXG4gICAgICAgICAgICBpZiAoY29ycmVzcG9uZGluZ09wdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKGNvcnJlc3BvbmRpbmdPcHRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDb3JyZXNwb25kT3B0aW9uKHZhbHVlOiBhbnkpOiBNY09wdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMudG9BcnJheSgpLFxuICAgICAgICAgICAgLi4udGhpcy5wcmV2aW91c1NlbGVjdGlvbk1vZGVsU2VsZWN0ZWRcbiAgICAgICAgXS5maW5kKChvcHRpb246IE1jT3B0aW9uKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIC8vIFRyZWF0IG51bGwgYXMgYSBzcGVjaWFsIHJlc2V0IHZhbHVlLlxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb24udmFsdWUgIT0gbnVsbCAmJiB0aGlzLmNvbXBhcmVXaXRoKG9wdGlvbi52YWx1ZSwgdmFsdWUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTm90aWZ5IGRldmVsb3BlcnMgb2YgZXJyb3JzIGluIHRoZWlyIGNvbXBhcmF0b3IuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyBhbmQgc2VsZWN0cyBhbmQgb3B0aW9uIGJhc2VkIG9uIGl0cyB2YWx1ZS5cbiAgICAgKiBAcmV0dXJucyBPcHRpb24gdGhhdCBoYXMgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZWxlY3RWYWx1ZSh2YWx1ZTogYW55KTogTWNPcHRpb24gfCB1bmRlZmluZWQge1xuICAgICAgICBjb25zdCBjb3JyZXNwb25kaW5nT3B0aW9uID0gdGhpcy5nZXRDb3JyZXNwb25kT3B0aW9uKHZhbHVlKTtcblxuICAgICAgICBpZiAoY29ycmVzcG9uZGluZ09wdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3QoY29ycmVzcG9uZGluZ09wdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29ycmVzcG9uZGluZ09wdGlvbjtcbiAgICB9XG5cbiAgICAvKiogU2V0cyB1cCBhIGtleSBtYW5hZ2VyIHRvIGxpc3RlbiB0byBrZXlib2FyZCBldmVudHMgb24gdGhlIG92ZXJsYXkgcGFuZWwuICovXG4gICAgcHJpdmF0ZSBpbml0S2V5TWFuYWdlcigpIHtcbiAgICAgICAgY29uc3QgdHlwZUFoZWFkRGVib3VuY2UgPSAyMDA7XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyID0gbmV3IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPE1jT3B0aW9uPih0aGlzLm9wdGlvbnMpXG4gICAgICAgICAgICAud2l0aFR5cGVBaGVhZCh0eXBlQWhlYWREZWJvdW5jZSwgdGhpcy5zZWFyY2ggPyAtMSA6IDApXG4gICAgICAgICAgICAud2l0aFZlcnRpY2FsT3JpZW50YXRpb24oKVxuICAgICAgICAgICAgLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24odGhpcy5pc1J0bCgpID8gJ3J0bCcgOiAnbHRyJyk7XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnRhYk91dFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBSZXN0b3JlIGZvY3VzIHRvIHRoZSB0cmlnZ2VyIGJlZm9yZSBjbG9zaW5nLiBFbnN1cmVzIHRoYXQgdGhlIGZvY3VzXG4gICAgICAgICAgICAgICAgLy8gcG9zaXRpb24gd29uJ3QgYmUgbG9zdCBpZiB0aGUgdXNlciBnb3QgZm9jdXMgaW50byB0aGUgb3ZlcmxheS5cbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLmNoYW5nZVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcGFuZWxPcGVuICYmIHRoaXMucGFuZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxBY3RpdmVPcHRpb25JbnRvVmlldygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX3BhbmVsT3BlbiAmJiAhdGhpcy5tdWx0aXBsZSAmJiB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbS5zZWxlY3RWaWFJbnRlcmFjdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBEcm9wcyBjdXJyZW50IG9wdGlvbiBzdWJzY3JpcHRpb25zIGFuZCBJRHMgYW5kIHJlc2V0cyBmcm9tIHNjcmF0Y2guICovXG4gICAgcHJpdmF0ZSByZXNldE9wdGlvbnMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNoYW5nZWRPckRlc3Ryb3llZCA9IG1lcmdlKHRoaXMub3B0aW9ucy5jaGFuZ2VzLCB0aGlzLmRlc3Ryb3kpO1xuXG4gICAgICAgIHRoaXMub3B0aW9uU2VsZWN0aW9uQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKGNoYW5nZWRPckRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3QoZXZlbnQuc291cmNlLCBldmVudC5pc1VzZXJJbnB1dCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWFyY2ggJiYgdGhpcy5zZWFyY2guaXNTZWFyY2hDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gdGhpcy5rZXlNYW5hZ2VyLnVwZGF0ZUFjdGl2ZUl0ZW0oMCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoLmlzU2VhcmNoQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChldmVudC5pc1VzZXJJbnB1dCAmJiAhdGhpcy5tdWx0aXBsZSAmJiB0aGlzLl9wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTGlzdGVuIHRvIGNoYW5nZXMgaW4gdGhlIGludGVybmFsIHN0YXRlIG9mIHRoZSBvcHRpb25zIGFuZCByZWFjdCBhY2NvcmRpbmdseS5cbiAgICAgICAgLy8gSGFuZGxlcyBjYXNlcyBsaWtlIHRoZSBsYWJlbHMgb2YgdGhlIHNlbGVjdGVkIG9wdGlvbnMgY2hhbmdpbmcuXG4gICAgICAgIG1lcmdlKC4uLnRoaXMub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gb3B0aW9uLnN0YXRlQ2hhbmdlcykpXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwoY2hhbmdlZE9yRGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBJbnZva2VkIHdoZW4gYW4gb3B0aW9uIGlzIGNsaWNrZWQuICovXG4gICAgcHJpdmF0ZSBvblNlbGVjdChvcHRpb246IE1jT3B0aW9uLCBpc1VzZXJJbnB1dDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBjb25zdCB3YXNTZWxlY3RlZCA9IHRoaXMuc2VsZWN0aW9uTW9kZWwuaXNTZWxlY3RlZChvcHRpb24pO1xuXG4gICAgICAgIGlmIChvcHRpb24udmFsdWUgPT0gbnVsbCAmJiAhdGhpcy5fbXVsdGlwbGUpIHtcbiAgICAgICAgICAgIG9wdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2VzKG9wdGlvbi52YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3Qob3B0aW9uKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5kZXNlbGVjdChvcHRpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNVc2VySW5wdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShvcHRpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc29ydFZhbHVlcygpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzVXNlcklucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEluIGNhc2UgdGhlIHVzZXIgc2VsZWN0ZWQgdGhlIG9wdGlvbiB3aXRoIHRoZWlyIG1vdXNlLCB3ZVxuICAgICAgICAgICAgICAgICAgICAvLyB3YW50IHRvIHJlc3RvcmUgZm9jdXMgYmFjayB0byB0aGUgdHJpZ2dlciwgaW4gb3JkZXIgdG9cbiAgICAgICAgICAgICAgICAgICAgLy8gcHJldmVudCB0aGUgc2VsZWN0IGtleWJvYXJkIGNvbnRyb2xzIGZyb20gY2xhc2hpbmcgd2l0aFxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgb25lcyBmcm9tIGBtYy1vcHRpb25gLlxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBzZWFyY2ggaXMgYXZhbGlhYmxlIHRoZW4gd2UgZm9jdXMgc2VhcmNoIGFnYWluLlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWFyY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAod2FzU2VsZWN0ZWQgIT09IHRoaXMuc2VsZWN0aW9uTW9kZWwuaXNTZWxlY3RlZChvcHRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKiogU29ydHMgdGhlIHNlbGVjdGVkIHZhbHVlcyBpbiB0aGUgc2VsZWN0ZWQgYmFzZWQgb24gdGhlaXIgb3JkZXIgaW4gdGhlIHBhbmVsLiAqL1xuICAgIHByaXZhdGUgc29ydFZhbHVlcygpIHtcbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMudG9BcnJheSgpO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zb3J0Q29tcGFyYXRvciA/IHRoaXMuc29ydENvbXBhcmF0b3IoYSwgYiwgb3B0aW9ucykgOlxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmluZGV4T2YoYSkgLSBvcHRpb25zLmluZGV4T2YoYik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBFbWl0cyBjaGFuZ2UgZXZlbnQgdG8gc2V0IHRoZSBtb2RlbCB2YWx1ZS4gKi9cbiAgICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZXMoZmFsbGJhY2tWYWx1ZT86IGFueSk6IHZvaWQge1xuICAgICAgICBsZXQgdmFsdWVUb0VtaXQ6IGFueSA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHZhbHVlVG9FbWl0ID0gKHRoaXMuc2VsZWN0ZWQgYXMgTWNPcHRpb25bXSkubWFwKChvcHRpb24pID0+IG9wdGlvbi52YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZVRvRW1pdCA9IHRoaXMuc2VsZWN0ZWQgPyAodGhpcy5zZWxlY3RlZCBhcyBNY09wdGlvbikudmFsdWUgOiBmYWxsYmFja1ZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZVRvRW1pdDtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlVG9FbWl0KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZVRvRW1pdCk7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQobmV3IE1jU2VsZWN0Q2hhbmdlKHRoaXMsIHZhbHVlVG9FbWl0KSk7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZ2hsaWdodHMgdGhlIHNlbGVjdGVkIGl0ZW0uIElmIG5vIG9wdGlvbiBpcyBzZWxlY3RlZCwgaXQgd2lsbCBoaWdobGlnaHRcbiAgICAgKiB0aGUgZmlyc3QgaXRlbSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIHByaXZhdGUgaGlnaGxpZ2h0Q29ycmVjdE9wdGlvbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMua2V5TWFuYWdlcikge1xuICAgICAgICAgICAgaWYgKHRoaXMuZW1wdHkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFNjcm9sbHMgdGhlIGFjdGl2ZSBvcHRpb24gaW50byB2aWV3LiAqL1xuICAgIHByaXZhdGUgc2Nyb2xsQWN0aXZlT3B0aW9uSW50b1ZpZXcoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZU9wdGlvbkluZGV4ID0gdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCB8fCAwO1xuICAgICAgICBjb25zdCBsYWJlbENvdW50ID0gY291bnRHcm91cExhYmVsc0JlZm9yZU9wdGlvbihhY3RpdmVPcHRpb25JbmRleCwgdGhpcy5vcHRpb25zLCB0aGlzLm9wdGlvbkdyb3Vwcyk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gZ2V0T3B0aW9uU2Nyb2xsUG9zaXRpb24oXG4gICAgICAgICAgICBhY3RpdmVPcHRpb25JbmRleCArIGxhYmVsQ291bnQsXG4gICAgICAgICAgICB0aGlzLmdldEl0ZW1IZWlnaHQoKSxcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCxcbiAgICAgICAgICAgIFNFTEVDVF9QQU5FTF9NQVhfSEVJR0hUXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgeC1vZmZzZXQgb2YgdGhlIG92ZXJsYXkgcGFuZWwgaW4gcmVsYXRpb24gdG8gdGhlIHRyaWdnZXIncyB0b3Agc3RhcnQgY29ybmVyLlxuICAgICAqIFRoaXMgbXVzdCBiZSBhZGp1c3RlZCB0byBhbGlnbiB0aGUgc2VsZWN0ZWQgb3B0aW9uIHRleHQgb3ZlciB0aGUgdHJpZ2dlciB0ZXh0IHdoZW5cbiAgICAgKiB0aGUgcGFuZWwgb3BlbnMuIFdpbGwgY2hhbmdlIGJhc2VkIG9uIExUUiBvciBSVEwgdGV4dCBkaXJlY3Rpb24uIE5vdGUgdGhhdCB0aGUgb2Zmc2V0XG4gICAgICogY2FuJ3QgYmUgY2FsY3VsYXRlZCB1bnRpbCB0aGUgcGFuZWwgaGFzIGJlZW4gYXR0YWNoZWQsIGJlY2F1c2Ugd2UgbmVlZCB0byBrbm93IHRoZVxuICAgICAqIGNvbnRlbnQgd2lkdGggaW4gb3JkZXIgdG8gY29uc3RyYWluIHRoZSBwYW5lbCB3aXRoaW4gdGhlIHZpZXdwb3J0LlxuICAgICAqL1xuICAgIHByaXZhdGUgc2V0T3ZlcmxheVBvc2l0aW9uKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlc2V0T3ZlcmxheSgpO1xuXG4gICAgICAgIGNvbnN0IG92ZXJsYXlSZWN0ID0gdGhpcy5nZXRPdmVybGF5UmVjdCgpO1xuICAgICAgICAvLyBXaW5kb3cgd2lkdGggd2l0aG91dCBzY3JvbGxiYXJcbiAgICAgICAgY29uc3Qgd2luZG93V2lkdGggPSB0aGlzLmdldEJhY2tkcm9wV2lkdGgoKTtcbiAgICAgICAgY29uc3QgaXNSdGwgPSB0aGlzLmlzUnRsKCk7XG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1tYWdpYy1udW1iZXJzICovXG4gICAgICAgIGNvbnN0IHBhZGRpbmdXaWR0aCA9IFNFTEVDVF9QQU5FTF9QQURESU5HX1ggKiAyO1xuICAgICAgICBsZXQgb2Zmc2V0WDogbnVtYmVyO1xuICAgICAgICBsZXQgb3ZlcmxheU1heFdpZHRoOiBudW1iZXI7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdGVkWzBdIHx8IHRoaXMub3B0aW9ucy5maXJzdDtcbiAgICAgICAgb2Zmc2V0WCA9IHNlbGVjdGVkICYmIHNlbGVjdGVkLmdyb3VwID8gU0VMRUNUX1BBTkVMX0lOREVOVF9QQURESU5HX1ggOiBTRUxFQ1RfUEFORUxfUEFERElOR19YO1xuXG4gICAgICAgIC8vIEludmVydCB0aGUgb2Zmc2V0IGluIExUUi5cbiAgICAgICAgaWYgKCFpc1J0bCkgeyBvZmZzZXRYICo9IC0xOyB9XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIGlmIHNlbGVjdCBvdmVyZmxvd3Mgb24gZWl0aGVyIHNpZGUuXG4gICAgICAgIGNvbnN0IGxlZnRPdmVyZmxvdyA9IDAgLSAob3ZlcmxheVJlY3QubGVmdCArIG9mZnNldFggLSAoaXNSdGwgPyBwYWRkaW5nV2lkdGggOiAwKSk7XG4gICAgICAgIGNvbnN0IHJpZ2h0T3ZlcmZsb3cgPSBvdmVybGF5UmVjdC5yaWdodCArIG9mZnNldFggLSB3aW5kb3dXaWR0aFxuICAgICAgICAgICAgKyAoaXNSdGwgPyAwIDogcGFkZGluZ1dpZHRoKTtcblxuICAgICAgICAvLyBJZiB0aGUgZWxlbWVudCBvdmVyZmxvd3Mgb24gZWl0aGVyIHNpZGUsIHJlZHVjZSB0aGUgb2Zmc2V0IHRvIGFsbG93IGl0IHRvIGZpdC5cbiAgICAgICAgaWYgKGxlZnRPdmVyZmxvdyA+IDAgfHwgcmlnaHRPdmVyZmxvdyA+IDApIHtcbiAgICAgICAgICAgIFtvZmZzZXRYLCBvdmVybGF5TWF4V2lkdGhdID0gdGhpcy5jYWxjdWxhdGVPdmVybGF5WFBvc2l0aW9uKG92ZXJsYXlSZWN0LCB3aW5kb3dXaWR0aCwgb2Zmc2V0WCk7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlEaXIub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5zdHlsZS5tYXhXaWR0aCA9IGAke292ZXJsYXlNYXhXaWR0aH1weGA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXQgdGhlIG9mZnNldCBkaXJlY3RseSBpbiBvcmRlciB0byBhdm9pZCBoYXZpbmcgdG8gZ28gdGhyb3VnaCBjaGFuZ2UgZGV0ZWN0aW9uIGFuZFxuICAgICAgICAvLyBwb3RlbnRpYWxseSB0cmlnZ2VyaW5nIFwiY2hhbmdlZCBhZnRlciBpdCB3YXMgY2hlY2tlZFwiIGVycm9ycy4gUm91bmQgdGhlIHZhbHVlIHRvIGF2b2lkXG4gICAgICAgIC8vIGJsdXJyeSBjb250ZW50IGluIHNvbWUgYnJvd3NlcnMuXG4gICAgICAgIHRoaXMub3ZlcmxheURpci5vZmZzZXRYID0gTWF0aC5yb3VuZChvZmZzZXRYKTtcbiAgICAgICAgdGhpcy5vdmVybGF5RGlyLm92ZXJsYXlSZWYudXBkYXRlUG9zaXRpb24oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGN1bGF0ZU92ZXJsYXlYUG9zaXRpb24ob3ZlcmxheVJlY3QsIHdpbmRvd1dpZHRoLCBiYXNpY09mZnNldFgpIHtcbiAgICAgICAgbGV0IG9mZnNldFggPSBiYXNpY09mZnNldFg7XG4gICAgICAgIGNvbnN0IGxlZnRJbmRlbnQgPSB0aGlzLnRyaWdnZXJSZWN0LmxlZnQ7XG4gICAgICAgIGNvbnN0IHJpZ2h0SW5kZW50ID0gd2luZG93V2lkdGggLSB0aGlzLnRyaWdnZXJSZWN0LnJpZ2h0O1xuICAgICAgICAvLyBTZXR0aW5nIGRpcmVjdGlvbiBvZiBkcm9wZG93biBleHBhbnNpb25cbiAgICAgICAgY29uc3QgaXNSaWdodERpcmVjdGlvbiA9IGxlZnRJbmRlbnQgPD0gcmlnaHRJbmRlbnQ7XG5cbiAgICAgICAgbGV0IG1heERyb3Bkb3duV2lkdGg6IG51bWJlcjtcbiAgICAgICAgbGV0IG92ZXJsYXlNYXhXaWR0aDogbnVtYmVyO1xuICAgICAgICBjb25zdCB0cmlnZ2VyV2lkdGggPSB0aGlzLnRyaWdnZXJSZWN0LndpZHRoICsgU0VMRUNUX1BBTkVMX0lOREVOVF9QQURESU5HX1g7XG5cbiAgICAgICAgaWYgKGlzUmlnaHREaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIG1heERyb3Bkb3duV2lkdGggPSByaWdodEluZGVudCArIHRyaWdnZXJXaWR0aCAtIFNFTEVDVF9QQU5FTF9WSUVXUE9SVF9QQURESU5HO1xuICAgICAgICAgICAgb3ZlcmxheU1heFdpZHRoID0gb3ZlcmxheVJlY3Qud2lkdGggPCBtYXhEcm9wZG93bldpZHRoID8gb3ZlcmxheVJlY3Qud2lkdGggOiBtYXhEcm9wZG93bldpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGxlZnRPZmZzZXQ7XG4gICAgICAgICAgICBtYXhEcm9wZG93bldpZHRoID0gbGVmdEluZGVudCArIHRyaWdnZXJXaWR0aCAtIFNFTEVDVF9QQU5FTF9WSUVXUE9SVF9QQURESU5HO1xuXG4gICAgICAgICAgICBpZiAob3ZlcmxheVJlY3Qud2lkdGggPCBtYXhEcm9wZG93bldpZHRoKSB7XG4gICAgICAgICAgICAgICAgb3ZlcmxheU1heFdpZHRoID0gb3ZlcmxheVJlY3Qud2lkdGg7XG4gICAgICAgICAgICAgICAgbGVmdE9mZnNldCA9IHRoaXMudHJpZ2dlclJlY3QucmlnaHQgLSBvdmVybGF5TWF4V2lkdGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG92ZXJsYXlNYXhXaWR0aCA9IG1heERyb3Bkb3duV2lkdGg7XG4gICAgICAgICAgICAgICAgbGVmdE9mZnNldCA9IHRoaXMudHJpZ2dlclJlY3QucmlnaHQgLSAob3ZlcmxheU1heFdpZHRoIC0gU0VMRUNUX1BBTkVMX0lOREVOVF9QQURESU5HX1gpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2Zmc2V0WCAtPSB0aGlzLnRyaWdnZXJSZWN0LmxlZnQgLSBsZWZ0T2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFtvZmZzZXRYLCBvdmVybGF5TWF4V2lkdGhdO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVzZXRPdmVybGF5KCkge1xuICAgICAgICB0aGlzLm92ZXJsYXlEaXIub2Zmc2V0WCA9IDA7XG4gICAgICAgIHRoaXMub3ZlcmxheURpci5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LnN0eWxlLm1heFdpZHRoID0gJ3Vuc2V0JztcbiAgICAgICAgdGhpcy5vdmVybGF5RGlyLm92ZXJsYXlSZWYudXBkYXRlUG9zaXRpb24oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE92ZXJsYXlSZWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5RGlyLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRCYWNrZHJvcFdpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY3JvbGxTdHJhdGVneS5fb3ZlcmxheVJlZi5iYWNrZHJvcEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgfVxuXG4gICAgLyoqIENvbXBhcmlzb24gZnVuY3Rpb24gdG8gc3BlY2lmeSB3aGljaCBvcHRpb24gaXMgZGlzcGxheWVkLiBEZWZhdWx0cyB0byBvYmplY3QgZXF1YWxpdHkuICovXG4gICAgcHJpdmF0ZSBfY29tcGFyZVdpdGggPSAobzE6IGFueSwgbzI6IGFueSkgPT4gbzEgPT09IG8yO1xufVxuIl19