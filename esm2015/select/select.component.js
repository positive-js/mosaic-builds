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
import { ErrorStateMatcher, MC_OPTION_PARENT_COMPONENT, McOptgroup, McOption, mixinDisabled, mixinErrorState, mixinTabIndex, mcSelectAnimations, SELECT_PANEL_INDENT_PADDING_X, SELECT_PANEL_PADDING_X, SELECT_PANEL_VIEWPORT_PADDING, MC_SELECT_SCROLL_STRATEGY, getMcSelectDynamicMultipleError, getMcSelectNonFunctionValueError, getMcSelectNonArrayValueError, setMosaicValidation, MC_VALIDATION } from '@ptsecurity/mosaic/core';
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
        // tslint:disable-next-line:deprecation
        if ([SPACE, HOME, END].includes(event.keyCode)) {
            event.stopPropagation();
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
            this.scrollActiveOptionIntoView();
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
        if (this.disabled) {
            return;
        }
        if (this.panelOpen) {
            this.handleOpenKeydown(event);
        }
        else {
            this.handleClosedKeydown(event);
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
        if (isArrowKey && event.altKey) {
            // Close the select on ALT + arrow key to match the native <select>
            event.preventDefault();
            this.close();
        }
        else if (keyCode === HOME) {
            event.preventDefault();
            this.keyManager.setFirstItemActive();
        }
        else if (keyCode === END) {
            event.preventDefault();
            this.keyManager.setLastItemActive();
        }
        else if (keyCode === PAGE_UP) {
            event.preventDefault();
            this.keyManager.setPreviousPageItemActive();
        }
        else if (keyCode === PAGE_DOWN) {
            event.preventDefault();
            this.keyManager.setNextPageItemActive();
        }
        else if ((keyCode === ENTER || keyCode === SPACE) && this.keyManager.activeItem) {
            event.preventDefault();
            this.keyManager.activeItem.selectViaInteraction();
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
            const previouslyFocusedIndex = this.keyManager.activeItemIndex;
            this.keyManager.onKeydown(event);
            if (this._multiple && isArrowKey && event.shiftKey && this.keyManager.activeItem &&
                this.keyManager.activeItemIndex !== previouslyFocusedIndex) {
                this.keyManager.activeItem.selectViaInteraction();
            }
            if (this.search) {
                this.search.focus();
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
        if (!this.keyManager.activeItem) {
            return;
        }
        this.keyManager.activeItem.focus();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL3NlbGVjdC8iLCJzb3VyY2VzIjpbInNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRCxPQUFPLEVBR0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixTQUFTLEVBRVQsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFNBQVMsRUFDVCxNQUFNLEVBSU4sUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULElBQUksRUFFSixTQUFTLEVBQ1QsWUFBWSxFQUNaLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUgsZUFBZSxFQUNmLGtCQUFrQixFQUNsQixhQUFhLEVBQ2IsU0FBUyxFQUNULE1BQU0sRUFDTixPQUFPLEVBRVYsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRSxPQUFPLEVBQ0gsVUFBVSxFQUNWLEdBQUcsRUFDSCxLQUFLLEVBQ0wsSUFBSSxFQUNKLFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUNMLFFBQVEsRUFDUixDQUFDLEVBQ0QsTUFBTSxFQUNOLE9BQU8sRUFDUCxTQUFTLEVBQ1osTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBS0gsaUJBQWlCLEVB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Ozs7OztJQVczQiw2QkFBc0I7Ozs7OztJQUd0Qix1QkFBcUQ7Ozs7OztJQUdyRCwyQkFBK0M7Ozs7O0lBa0gvQyw0QkFBMEM7Ozs7O0lBRzFDLDZCQUFxQjs7Ozs7O0lBMnJCckIsZ0NBQXVEOzs7OztJQTd5Qm5ELHNDQUFzRDs7Ozs7SUFDdEQsMkJBQWdDOzs7OztJQUNoQyw2QkFBcUM7O0lBR3JDLGlDQUFvRTs7Ozs7SUFDcEUsd0JBQWlEOzs7OztJQUdqRCxvQ0FBMEQ7O0lBRTFELDJCQUEyQzs7SUFDM0MsbUNBQTJEOzs7OztJQUMzRCwwQ0FBMEU7Ozs7O0lBQzFFLGdDQUE0RSIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlOm5vLWVtcHR5ICovXG5cbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IENka0Nvbm5lY3RlZE92ZXJsYXkgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBEaXJlY3RpdmUsXG4gICAgRG9DaGVjayxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgaXNEZXZNb2RlLFxuICAgIE5nWm9uZSxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFJlbmRlcmVyMixcbiAgICBTZWxmLFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDaGlsZHJlbixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgRm9ybUNvbnRyb2xOYW1lLFxuICAgIEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICBOR19WQUxJREFUT1JTLFxuICAgIE5nQ29udHJvbCxcbiAgICBOZ0Zvcm0sXG4gICAgTmdNb2RlbCxcbiAgICBWYWxpZGF0b3Jcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXIgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIERPV05fQVJST1csXG4gICAgRU5ELFxuICAgIEVOVEVSLFxuICAgIEhPTUUsXG4gICAgTEVGVF9BUlJPVyxcbiAgICBSSUdIVF9BUlJPVyxcbiAgICBTUEFDRSxcbiAgICBVUF9BUlJPVyxcbiAgICBBLFxuICAgIEVTQ0FQRSxcbiAgICBQQUdFX1VQLFxuICAgIFBBR0VfRE9XTlxufSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgICBDYW5EaXNhYmxlLFxuICAgIENhbkRpc2FibGVDdG9yLFxuICAgIENhblVwZGF0ZUVycm9yU3RhdGUsXG4gICAgQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IsXG4gICAgRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgSGFzVGFiSW5kZXgsXG4gICAgSGFzVGFiSW5kZXhDdG9yLFxuICAgIE1DX09QVElPTl9QQVJFTlRfQ09NUE9ORU5ULFxuICAgIE1jT3B0Z3JvdXAsXG4gICAgTWNPcHRpb24sXG4gICAgTWNPcHRpb25TZWxlY3Rpb25DaGFuZ2UsXG4gICAgbWl4aW5EaXNhYmxlZCxcbiAgICBtaXhpbkVycm9yU3RhdGUsXG4gICAgbWl4aW5UYWJJbmRleCxcbiAgICBtY1NlbGVjdEFuaW1hdGlvbnMsXG5cbiAgICBTRUxFQ1RfUEFORUxfSU5ERU5UX1BBRERJTkdfWCxcbiAgICBTRUxFQ1RfUEFORUxfUEFERElOR19YLFxuICAgIFNFTEVDVF9QQU5FTF9WSUVXUE9SVF9QQURESU5HLFxuICAgIE1DX1NFTEVDVF9TQ1JPTExfU1RSQVRFR1ksXG5cbiAgICBnZXRNY1NlbGVjdER5bmFtaWNNdWx0aXBsZUVycm9yLFxuICAgIGdldE1jU2VsZWN0Tm9uRnVuY3Rpb25WYWx1ZUVycm9yLFxuICAgIGdldE1jU2VsZWN0Tm9uQXJyYXlWYWx1ZUVycm9yLFxuXG4gICAgc2V0TW9zYWljVmFsaWRhdGlvbixcbiAgICBNQ19WQUxJREFUSU9OLFxuICAgIE1jVmFsaWRhdGlvbk9wdGlvbnNcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNDbGVhbmVyLCBNY0Zvcm1GaWVsZCwgTWNGb3JtRmllbGRDb250cm9sIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgTWNJbnB1dCB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9pbnB1dCc7XG5pbXBvcnQgeyBNY1RhZyB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy90YWdzJztcbmltcG9ydCB7IGRlZmVyLCBtZXJnZSwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICAgIGZpbHRlcixcbiAgICBtYXAsXG4gICAgc3RhcnRXaXRoLFxuICAgIHN3aXRjaE1hcCxcbiAgICB0YWtlLFxuICAgIHRha2VVbnRpbCxcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKiBDaGFuZ2UgZXZlbnQgb2JqZWN0IHRoYXQgaXMgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3QgdmFsdWUgaGFzIGNoYW5nZWQuICovXG5leHBvcnQgY2xhc3MgTWNTZWxlY3RDaGFuZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2U6IE1jU2VsZWN0LCBwdWJsaWMgdmFsdWU6IGFueSkge31cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNTZWxlY3RTZWFyY2hdJyxcbiAgICBleHBvcnRBczogJ21jU2VsZWN0U2VhcmNoJyxcbiAgICBob3N0OiB7XG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNTZWxlY3RTZWFyY2ggaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIEBDb250ZW50Q2hpbGQoTWNJbnB1dCwgeyBzdGF0aWM6IGZhbHNlIH0pIGlucHV0OiBNY0lucHV0O1xuXG4gICAgc2VhcmNoQ2hhbmdlc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gICAgaXNTZWFyY2hDaGFuZ2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihmb3JtRmllbGQ6IE1jRm9ybUZpZWxkKSB7XG4gICAgICAgIGZvcm1GaWVsZC5jYW5DbGVhbmVyQ2xlYXJCeUVzYyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlucHV0LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgcmVzZXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXQubmdDb250cm9sLnJlc2V0KCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuaW5wdXQpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdNY1NlbGVjdFNlYXJjaCBkb2VzIG5vdCB3b3JrIHdpdGhvdXQgbWNJbnB1dCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmlucHV0Lm5nQ29udHJvbCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ01jU2VsZWN0U2VhcmNoIGRvZXMgbm90IHdvcmsgd2l0aG91dCBuZ0NvbnRyb2wnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hDaGFuZ2VzU3Vic2NyaXB0aW9uID0gdGhpcy5pbnB1dC5uZ0NvbnRyb2wudmFsdWVDaGFuZ2VzIS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNTZWFyY2hDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWFyY2hDaGFuZ2VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXQudmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgaWYgKFtTUEFDRSwgSE9NRSwgRU5EXS5pbmNsdWRlcyhldmVudC5rZXlDb2RlKSkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jLXNlbGVjdC1zZWFyY2gtZW1wdHktcmVzdWx0XScsXG4gICAgZXhwb3J0QXM6ICdtY1NlbGVjdFNlYXJjaEVtcHR5UmVzdWx0J1xufSlcbmV4cG9ydCBjbGFzcyBNY1NlbGVjdFNlYXJjaEVtcHR5UmVzdWx0IHt9XG5cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbWMtc2VsZWN0LXRyaWdnZXInIH0pXG5leHBvcnQgY2xhc3MgTWNTZWxlY3RUcmlnZ2VyIHt9XG5cblxuZXhwb3J0IGNsYXNzIE1jU2VsZWN0QmFzZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwdWJsaWMgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICAgICAgcHVibGljIHBhcmVudEZvcm06IE5nRm9ybSxcbiAgICAgICAgcHVibGljIHBhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgICAgICBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2xcbiAgICApIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuY29uc3QgTWNTZWxlY3RNaXhpbkJhc2U6IENhbkRpc2FibGVDdG9yICYgSGFzVGFiSW5kZXhDdG9yICYgQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IgJlxuICAgIHR5cGVvZiBNY1NlbGVjdEJhc2UgPSBtaXhpblRhYkluZGV4KG1peGluRGlzYWJsZWQobWl4aW5FcnJvclN0YXRlKE1jU2VsZWN0QmFzZSkpKTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXNlbGVjdCcsXG4gICAgZXhwb3J0QXM6ICdtY1NlbGVjdCcsXG4gICAgdGVtcGxhdGVVcmw6ICdzZWxlY3QuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2VsZWN0LnNjc3MnXSxcbiAgICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAndGFiSW5kZXgnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCcsXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuXG4gICAgICAgIGNsYXNzOiAnbWMtc2VsZWN0JyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWludmFsaWRdJzogJ2Vycm9yU3RhdGUnLFxuXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyhmb2N1cyknOiAnb25Gb2N1cygpJyxcbiAgICAgICAgJyhibHVyKSc6ICdvbkJsdXIoKScsXG4gICAgICAgICcod2luZG93OnJlc2l6ZSknOiAnY2FsY3VsYXRlSGlkZGVuSXRlbXMoKSdcbiAgICB9LFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgbWNTZWxlY3RBbmltYXRpb25zLnRyYW5zZm9ybVBhbmVsLFxuICAgICAgICBtY1NlbGVjdEFuaW1hdGlvbnMuZmFkZUluQ29udGVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogTWNGb3JtRmllbGRDb250cm9sLCB1c2VFeGlzdGluZzogTWNTZWxlY3QgfSxcbiAgICAgICAgeyBwcm92aWRlOiBNQ19PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCwgdXNlRXhpc3Rpbmc6IE1jU2VsZWN0IH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jU2VsZWN0IGV4dGVuZHMgTWNTZWxlY3RNaXhpbkJhc2UgaW1wbGVtZW50c1xuICAgIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIERvQ2hlY2ssIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBDYW5EaXNhYmxlLFxuICAgIEhhc1RhYkluZGV4LCBNY0Zvcm1GaWVsZENvbnRyb2w8YW55PiwgQ2FuVXBkYXRlRXJyb3JTdGF0ZSB7XG5cbiAgICAvKiogQSBuYW1lIGZvciB0aGlzIGNvbnRyb2wgdGhhdCBjYW4gYmUgdXNlZCBieSBgbWMtZm9ybS1maWVsZGAuICovXG4gICAgY29udHJvbFR5cGUgPSAnbWMtc2VsZWN0JztcblxuICAgIGhpZGRlbkl0ZW1zOiBudW1iZXIgPSAwO1xuXG4gICAgLyoqIFRoZSBsYXN0IG1lYXN1cmVkIHZhbHVlIGZvciB0aGUgdHJpZ2dlcidzIGNsaWVudCBib3VuZGluZyByZWN0LiAqL1xuICAgIHRyaWdnZXJSZWN0OiBDbGllbnRSZWN0O1xuXG4gICAgLyoqIFRoZSBjYWNoZWQgZm9udC1zaXplIG9mIHRoZSB0cmlnZ2VyIGVsZW1lbnQuICovXG4gICAgdHJpZ2dlckZvbnRTaXplID0gMDtcblxuICAgIC8qKiBEZWFscyB3aXRoIHRoZSBzZWxlY3Rpb24gbG9naWMuICovXG4gICAgc2VsZWN0aW9uTW9kZWw6IFNlbGVjdGlvbk1vZGVsPE1jT3B0aW9uPjtcblxuICAgIHByZXZpb3VzU2VsZWN0aW9uTW9kZWxTZWxlY3RlZDogTWNPcHRpb25bXSA9IFtdO1xuXG4gICAgLyoqIE1hbmFnZXMga2V5Ym9hcmQgZXZlbnRzIGZvciBvcHRpb25zIGluIHRoZSBwYW5lbC4gKi9cbiAgICBrZXlNYW5hZ2VyOiBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlcjxNY09wdGlvbj47XG5cbiAgICAvKiogVGhlIHZhbHVlIG9mIHRoZSBzZWxlY3QgcGFuZWwncyB0cmFuc2Zvcm0tb3JpZ2luIHByb3BlcnR5LiAqL1xuICAgIHRyYW5zZm9ybU9yaWdpbjogc3RyaW5nID0gJ3RvcCc7XG5cbiAgICAvKiogV2hldGhlciB0aGUgcGFuZWwncyBhbmltYXRpb24gaXMgZG9uZS4gKi9cbiAgICBwYW5lbERvbmVBbmltYXRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSBwYW5lbCBlbGVtZW50IGlzIGZpbmlzaGVkIHRyYW5zZm9ybWluZyBpbi4gKi9cbiAgICBwYW5lbERvbmVBbmltYXRpbmdTdHJlYW0gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbiAgICAvKiogU3RyYXRlZ3kgdGhhdCB3aWxsIGJlIHVzZWQgdG8gaGFuZGxlIHNjcm9sbGluZyB3aGlsZSB0aGUgc2VsZWN0IHBhbmVsIGlzIG9wZW4uICovXG4gICAgc2Nyb2xsU3RyYXRlZ3kgPSB0aGlzLl9zY3JvbGxTdHJhdGVneUZhY3RvcnkoKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSB5LW9mZnNldCBvZiB0aGUgb3ZlcmxheSBwYW5lbCBpbiByZWxhdGlvbiB0byB0aGUgdHJpZ2dlcidzIHRvcCBzdGFydCBjb3JuZXIuXG4gICAgICogVGhpcyBtdXN0IGJlIGFkanVzdGVkIHRvIGFsaWduIHRoZSBzZWxlY3RlZCBvcHRpb24gdGV4dCBvdmVyIHRoZSB0cmlnZ2VyIHRleHQuXG4gICAgICogd2hlbiB0aGUgcGFuZWwgb3BlbnMuIFdpbGwgY2hhbmdlIGJhc2VkIG9uIHRoZSB5LXBvc2l0aW9uIG9mIHRoZSBzZWxlY3RlZCBvcHRpb24uXG4gICAgICovXG4gICAgb2Zmc2V0WSA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIHBvc2l0aW9uIGNvbmZpZyBlbnN1cmVzIHRoYXQgdGhlIHRvcCBcInN0YXJ0XCIgY29ybmVyIG9mIHRoZSBvdmVybGF5XG4gICAgICogaXMgYWxpZ25lZCB3aXRoIHdpdGggdGhlIHRvcCBcInN0YXJ0XCIgb2YgdGhlIG9yaWdpbiBieSBkZWZhdWx0IChvdmVybGFwcGluZ1xuICAgICAqIHRoZSB0cmlnZ2VyIGNvbXBsZXRlbHkpLiBJZiB0aGUgcGFuZWwgY2Fubm90IGZpdCBiZWxvdyB0aGUgdHJpZ2dlciwgaXRcbiAgICAgKiB3aWxsIGZhbGwgYmFjayB0byBhIHBvc2l0aW9uIGFib3ZlIHRoZSB0cmlnZ2VyLlxuICAgICAqL1xuICAgIHBvc2l0aW9ucyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgICAgICBvdmVybGF5WTogJ3RvcCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgICAgICBvdmVybGF5WTogJ2JvdHRvbSdcbiAgICAgICAgfVxuICAgIF07XG5cbiAgICBAVmlld0NoaWxkKCd0cmlnZ2VyJywgeyBzdGF0aWM6IGZhbHNlIH0pIHRyaWdnZXI6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdwYW5lbCcsIHsgc3RhdGljOiBmYWxzZSB9KSBwYW5lbDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ29wdGlvbnNDb250YWluZXInLCB7IHN0YXRpYzogZmFsc2UgfSkgb3B0aW9uc0NvbnRhaW5lcjogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoQ2RrQ29ubmVjdGVkT3ZlcmxheSwgeyBzdGF0aWM6IGZhbHNlIH0pIG92ZXJsYXlEaXI6IENka0Nvbm5lY3RlZE92ZXJsYXk7XG5cbiAgICBAVmlld0NoaWxkcmVuKE1jVGFnKSB0YWdzOiBRdWVyeUxpc3Q8TWNUYWc+O1xuXG4gICAgLyoqIFVzZXItc3VwcGxpZWQgb3ZlcnJpZGUgb2YgdGhlIHRyaWdnZXIgZWxlbWVudC4gKi9cbiAgICBAQ29udGVudENoaWxkKE1jU2VsZWN0VHJpZ2dlciwgeyBzdGF0aWM6IGZhbHNlIH0pIGN1c3RvbVRyaWdnZXI6IE1jU2VsZWN0VHJpZ2dlcjtcblxuICAgIEBDb250ZW50Q2hpbGQoJ21jU2VsZWN0Q2xlYW5lcicsIHsgc3RhdGljOiB0cnVlIH0pIGNsZWFuZXI6IE1jQ2xlYW5lcjtcblxuICAgIC8qKiBBbGwgb2YgdGhlIGRlZmluZWQgc2VsZWN0IG9wdGlvbnMuICovXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY09wdGlvbiwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBvcHRpb25zOiBRdWVyeUxpc3Q8TWNPcHRpb24+O1xuXG4gICAgLyoqIEFsbCBvZiB0aGUgZGVmaW5lZCBncm91cHMgb2Ygb3B0aW9ucy4gKi9cbiAgICBAQ29udGVudENoaWxkcmVuKE1jT3B0Z3JvdXApIG9wdGlvbkdyb3VwczogUXVlcnlMaXN0PE1jT3B0Z3JvdXA+O1xuXG4gICAgQENvbnRlbnRDaGlsZChNY1NlbGVjdFNlYXJjaCwgeyBzdGF0aWM6IGZhbHNlIH0pIHNlYXJjaDogTWNTZWxlY3RTZWFyY2g7XG5cbiAgICBASW5wdXQoKSBoaWRkZW5JdGVtc1RleHQ6IHN0cmluZyA9ICcuLi7QtdGJ0ZEnO1xuXG4gICAgLyoqIENsYXNzZXMgdG8gYmUgcGFzc2VkIHRvIHRoZSBzZWxlY3QgcGFuZWwuIFN1cHBvcnRzIHRoZSBzYW1lIHN5bnRheCBhcyBgbmdDbGFzc2AuICovXG4gICAgQElucHV0KCkgcGFuZWxDbGFzczogc3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPiB8IHsgW2tleTogc3RyaW5nXTogYW55IH07XG5cbiAgICAvKiogT2JqZWN0IHVzZWQgdG8gY29udHJvbCB3aGVuIGVycm9yIG1lc3NhZ2VzIGFyZSBzaG93bi4gKi9cbiAgICBASW5wdXQoKSBlcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXI7XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB1c2VkIHRvIHNvcnQgdGhlIHZhbHVlcyBpbiBhIHNlbGVjdCBpbiBtdWx0aXBsZSBtb2RlLlxuICAgICAqIEZvbGxvd3MgdGhlIHNhbWUgbG9naWMgYXMgYEFycmF5LnByb3RvdHlwZS5zb3J0YC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBzb3J0Q29tcGFyYXRvcjogKGE6IE1jT3B0aW9uLCBiOiBNY09wdGlvbiwgb3B0aW9uczogTWNPcHRpb25bXSkgPT4gbnVtYmVyO1xuXG4gICAgLyoqIENvbWJpbmVkIHN0cmVhbSBvZiBhbGwgb2YgdGhlIGNoaWxkIG9wdGlvbnMnIGNoYW5nZSBldmVudHMuICovXG4gICAgcmVhZG9ubHkgb3B0aW9uU2VsZWN0aW9uQ2hhbmdlczogT2JzZXJ2YWJsZTxNY09wdGlvblNlbGVjdGlvbkNoYW5nZT4gPSBkZWZlcigoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBtZXJnZShcbiAgICAgICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMubWFwKChvcHRpb24pID0+IG9wdGlvbi5vblNlbGVjdGlvbkNoYW5nZSksXG4gICAgICAgICAgICAgICAgLi4udGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZC5tYXAoKG9wdGlvbikgPT4gb3B0aW9uLm9uU2VsZWN0aW9uQ2hhbmdlKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9uZ1pvbmUub25TdGFibGVcbiAgICAgICAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSwgc3dpdGNoTWFwKCgpID0+IHRoaXMub3B0aW9uU2VsZWN0aW9uQ2hhbmdlcykpO1xuICAgIH0pIGFzIE9ic2VydmFibGU8TWNPcHRpb25TZWxlY3Rpb25DaGFuZ2U+O1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IHBhbmVsIGhhcyBiZWVuIHRvZ2dsZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IG9wZW5lZENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IGhhcyBiZWVuIG9wZW5lZC4gKi9cbiAgICBAT3V0cHV0KCdvcGVuZWQnKSByZWFkb25seSBvcGVuZWRTdHJlYW06IE9ic2VydmFibGU8dm9pZD4gPVxuICAgICAgICB0aGlzLm9wZW5lZENoYW5nZS5waXBlKGZpbHRlcigobykgPT4gbyksIG1hcCgoKSA9PiB7fSkpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IGhhcyBiZWVuIGNsb3NlZC4gKi9cbiAgICBAT3V0cHV0KCdjbG9zZWQnKSByZWFkb25seSBjbG9zZWRTdHJlYW06IE9ic2VydmFibGU8dm9pZD4gPVxuICAgICAgICB0aGlzLm9wZW5lZENoYW5nZS5waXBlKGZpbHRlcigobykgPT4gIW8pLCBtYXAoKCkgPT4ge30pKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdGVkIHZhbHVlIGhhcyBiZWVuIGNoYW5nZWQgYnkgdGhlIHVzZXIuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPE1jU2VsZWN0Q2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWNTZWxlY3RDaGFuZ2U+KCk7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSByYXcgdmFsdWUgb2YgdGhlIHNlbGVjdCBjaGFuZ2VzLiBUaGlzIGlzIGhlcmUgcHJpbWFyaWx5XG4gICAgICogdG8gZmFjaWxpdGF0ZSB0aGUgdHdvLXdheSBiaW5kaW5nIGZvciB0aGUgYHZhbHVlYCBpbnB1dC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgcGxhY2Vob2xkZXIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BsYWNlaG9sZGVyO1xuICAgIH1cblxuICAgIHNldCBwbGFjZWhvbGRlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3BsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVpcmVkO1xuICAgIH1cblxuICAgIHNldCByZXF1aXJlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9yZXF1aXJlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlcXVpcmVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtdWx0aXBsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX211bHRpcGxlO1xuICAgIH1cblxuICAgIHNldCBtdWx0aXBsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlbCkge1xuICAgICAgICAgICAgdGhyb3cgZ2V0TWNTZWxlY3REeW5hbWljTXVsdGlwbGVFcnJvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbXVsdGlwbGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX211bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBjb21wYXJlIHRoZSBvcHRpb24gdmFsdWVzIHdpdGggdGhlIHNlbGVjdGVkIHZhbHVlcy4gVGhlIGZpcnN0IGFyZ3VtZW50XG4gICAgICogaXMgYSB2YWx1ZSBmcm9tIGFuIG9wdGlvbi4gVGhlIHNlY29uZCBpcyBhIHZhbHVlIGZyb20gdGhlIHNlbGVjdGlvbi4gQSBib29sZWFuXG4gICAgICogc2hvdWxkIGJlIHJldHVybmVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGNvbXBhcmVXaXRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29tcGFyZVdpdGg7XG4gICAgfVxuXG4gICAgc2V0IGNvbXBhcmVXaXRoKGZuOiAobzE6IGFueSwgbzI6IGFueSkgPT4gYm9vbGVhbikge1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6c3RyaWN0LXR5cGUtcHJlZGljYXRlcyAqL1xuICAgICAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRNY1NlbGVjdE5vbkZ1bmN0aW9uVmFsdWVFcnJvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY29tcGFyZVdpdGggPSBmbjtcblxuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlbCkge1xuICAgICAgICAgICAgLy8gQSBkaWZmZXJlbnQgY29tcGFyYXRvciBtZWFucyB0aGUgc2VsZWN0aW9uIGNvdWxkIGNoYW5nZS5cbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNlbGVjdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFZhbHVlIG9mIHRoZSBzZWxlY3QgY29udHJvbC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLl92YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy53cml0ZVZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF92YWx1ZTogYW55O1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cblxuICAgIHNldCBpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2lkID0gdmFsdWUgfHwgdGhpcy51aWQ7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pZDogc3RyaW5nO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHNlbGVjdCBpcyBmb2N1c2VkLiAqL1xuICAgIGdldCBmb2N1c2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZm9jdXNlZCB8fCB0aGlzLl9wYW5lbE9wZW47XG4gICAgfVxuXG4gICAgc2V0IGZvY3VzZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZm9jdXNlZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZvY3VzZWQgPSBmYWxzZTtcblxuICAgIGdldCBwYW5lbE9wZW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYW5lbE9wZW47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcGFuZWxPcGVuID0gZmFsc2U7XG5cbiAgICBnZXQgaXNFbXB0eVNlYXJjaFJlc3VsdCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoICYmIHRoaXMub3B0aW9ucy5sZW5ndGggPT09IDAgJiYgISF0aGlzLnNlYXJjaC5pbnB1dC52YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgY2FuU2hvd0NsZWFuZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsZWFuZXIgJiYgdGhpcy5zZWxlY3Rpb25Nb2RlbC5oYXNWYWx1ZSgpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgc2Nyb2xsIHBvc2l0aW9uIG9mIHRoZSBvdmVybGF5IHBhbmVsLCBjYWxjdWxhdGVkIHRvIGNlbnRlciB0aGUgc2VsZWN0ZWQgb3B0aW9uLiAqL1xuICAgIHByaXZhdGUgc2Nyb2xsVG9wID0gMDtcblxuICAgIC8qKiBVbmlxdWUgaWQgZm9yIHRoaXMgaW5wdXQuICovXG4gICAgcHJpdmF0ZSByZWFkb25seSB1aWQgPSBgbWMtc2VsZWN0LSR7bmV4dFVuaXF1ZUlkKyt9YDtcblxuICAgIC8qKiBFbWl0cyB3aGVuZXZlciB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZC4gKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTkdfVkFMSURBVE9SUykgcHVibGljIHJhd1ZhbGlkYXRvcnM6IFZhbGlkYXRvcltdLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJlYWRvbmx5IF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICBAT3B0aW9uYWwoKSBwYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgICAgIEBPcHRpb25hbCgpIHBhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJlYWRvbmx5IF9wYXJlbnRGb3JtRmllbGQ6IE1jRm9ybUZpZWxkLFxuICAgICAgICBAU2VsZigpIEBPcHRpb25hbCgpIG5nQ29udHJvbDogTmdDb250cm9sLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHB1YmxpYyBuZ01vZGVsOiBOZ01vZGVsLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHB1YmxpYyBmb3JtQ29udHJvbE5hbWU6IEZvcm1Db250cm9sTmFtZSxcbiAgICAgICAgQEluamVjdChNQ19TRUxFQ1RfU0NST0xMX1NUUkFURUdZKSBwcml2YXRlIHJlYWRvbmx5IF9zY3JvbGxTdHJhdGVneUZhY3RvcnksXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfVkFMSURBVElPTikgcHJpdmF0ZSBtY1ZhbGlkYXRpb246IE1jVmFsaWRhdGlvbk9wdGlvbnNcbiAgICApIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZiwgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyLCBwYXJlbnRGb3JtLCBwYXJlbnRGb3JtR3JvdXAsIG5nQ29udHJvbCk7XG5cbiAgICAgICAgaWYgKHRoaXMubmdDb250cm9sKSB7XG4gICAgICAgICAgICAvLyBOb3RlOiB3ZSBwcm92aWRlIHRoZSB2YWx1ZSBhY2Nlc3NvciB0aHJvdWdoIGhlcmUsIGluc3RlYWQgb2ZcbiAgICAgICAgICAgIC8vIHRoZSBgcHJvdmlkZXJzYCB0byBhdm9pZCBydW5uaW5nIGludG8gYSBjaXJjdWxhciBpbXBvcnQuXG4gICAgICAgICAgICB0aGlzLm5nQ29udHJvbC52YWx1ZUFjY2Vzc29yID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZvcmNlIHNldHRlciB0byBiZSBjYWxsZWQgaW4gY2FzZSBpZCB3YXMgbm90IHNwZWNpZmllZC5cbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuaWQ7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwgPSBuZXcgU2VsZWN0aW9uTW9kZWw8TWNPcHRpb24+KHRoaXMubXVsdGlwbGUpO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG5cbiAgICAgICAgLy8gV2UgbmVlZCBgZGlzdGluY3RVbnRpbENoYW5nZWRgIGhlcmUsIGJlY2F1c2Ugc29tZSBicm93c2VycyB3aWxsXG4gICAgICAgIC8vIGZpcmUgdGhlIGFuaW1hdGlvbiBlbmQgZXZlbnQgdHdpY2UgZm9yIHRoZSBzYW1lIGFuaW1hdGlvbi4gU2VlOlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8yNDA4NFxuICAgICAgICB0aGlzLnBhbmVsRG9uZUFuaW1hdGluZ1N0cmVhbVxuICAgICAgICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgdGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUb3AgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5lZENoYW5nZS5lbWl0KHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbmVkQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbmVsRG9uZUFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLm1jVmFsaWRhdGlvbi51c2VWYWxpZGF0aW9uKSB7XG4gICAgICAgICAgICBzZXRNb3NhaWNWYWxpZGF0aW9uKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0S2V5TWFuYWdlcigpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuY2hhbmdlZFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50LmFkZGVkLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uLnNlbGVjdCgpKTtcbiAgICAgICAgICAgICAgICBldmVudC5yZW1vdmVkLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uLmRlc2VsZWN0KCkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zLmNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKHN0YXJ0V2l0aChudWxsKSwgdGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0T3B0aW9ucygpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNlbGVjdGlvbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhZ3MuY2hhbmdlc1xuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNhbGN1bGF0ZUhpZGRlbkl0ZW1zKCksIDApO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdEb0NoZWNrKCkge1xuICAgICAgICBpZiAodGhpcy5uZ0NvbnRyb2wpIHsgdGhpcy51cGRhdGVFcnJvclN0YXRlKCk7IH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIC8vIFVwZGF0aW5nIHRoZSBkaXNhYmxlZCBzdGF0ZSBpcyBoYW5kbGVkIGJ5IGBtaXhpbkRpc2FibGVkYCwgYnV0IHdlIG5lZWQgdG8gYWRkaXRpb25hbGx5IGxldFxuICAgICAgICAvLyB0aGUgcGFyZW50IGZvcm0gZmllbGQga25vdyB0byBydW4gY2hhbmdlIGRldGVjdGlvbiB3aGVuIHRoZSBkaXNhYmxlZCBzdGF0ZSBjaGFuZ2VzLlxuICAgICAgICBpZiAoY2hhbmdlcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuZGVzdHJveS5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgaGlkZGVuSXRlbXNUZXh0Rm9ybWF0dGVyKGhpZGRlbkl0ZW1zVGV4dDogc3RyaW5nLCBoaWRkZW5JdGVtczogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke2hpZGRlbkl0ZW1zVGV4dH0gJHtoaWRkZW5JdGVtc31gO1xuICAgIH1cblxuICAgIGNsZWFyVmFsdWUoJGV2ZW50KTogdm9pZCB7XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKC0xKTtcblxuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZXMoKTtcbiAgICB9XG5cbiAgICAvKiogYFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gdmFsdWUgY2hhbmdlc2AgKi9cbiAgICBvbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAgIC8qKiBgVmlldyAtPiBtb2RlbCBjYWxsYmFjayBjYWxsZWQgd2hlbiBzZWxlY3QgaGFzIGJlZW4gdG91Y2hlZGAgKi9cbiAgICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICAgIHJlc2V0U2VhcmNoKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zZWFyY2gpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoLnJlc2V0KCk7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgdG9kbyB0aGUgaW5jb3JyZWN0IGJlaGF2aW91ciBvZiBrZXlNYW5hZ2VyIGlzIHBvc3NpYmxlIGhlcmVcbiAgICAgICAgICAgIHRvIGF2b2lkIGZpcnN0IGl0ZW0gc2VsZWN0aW9uICh0byBwcm92aWRlIGNvcnJlY3Qgb3B0aW9ucyBmbGlwcGluZyBvbiBjbG9zZWQgc2VsZWN0KVxuICAgICAgICAgICAgd2Ugc2hvdWxkIHByb2Nlc3Mgb3B0aW9ucyB1cGRhdGUgbGlrZSBpdCBpcyB0aGUgZmlyc3Qgb3B0aW9ucyBhcHBlYXJhbmNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuc2VhcmNoLmlzU2VhcmNoQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFRvZ2dsZXMgdGhlIG92ZXJsYXkgcGFuZWwgb3BlbiBvciBjbG9zZWQuICovXG4gICAgdG9nZ2xlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIE9wZW5zIHRoZSBvdmVybGF5IHBhbmVsLiAqL1xuICAgIG9wZW4oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICF0aGlzLm9wdGlvbnMgfHwgIXRoaXMub3B0aW9ucy5sZW5ndGggfHwgdGhpcy5fcGFuZWxPcGVuKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMudHJpZ2dlclJlY3QgPSB0aGlzLnRyaWdnZXIubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgLy8gTm90ZTogVGhlIGNvbXB1dGVkIGZvbnQtc2l6ZSB3aWxsIGJlIGEgc3RyaW5nIHBpeGVsIHZhbHVlIChlLmcuIFwiMTZweFwiKS5cbiAgICAgICAgLy8gYHBhcnNlSW50YCBpZ25vcmVzIHRoZSB0cmFpbGluZyAncHgnIGFuZCBjb252ZXJ0cyB0aGlzIHRvIGEgbnVtYmVyLlxuICAgICAgICB0aGlzLnRyaWdnZXJGb250U2l6ZSA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUodGhpcy50cmlnZ2VyLm5hdGl2ZUVsZW1lbnQpWydmb250LXNpemUnXSk7XG5cbiAgICAgICAgdGhpcy5fcGFuZWxPcGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24obnVsbCk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0Q29ycmVjdE9wdGlvbigpO1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcblxuICAgICAgICAvLyBTZXQgdGhlIGZvbnQgc2l6ZSBvbiB0aGUgcGFuZWwgZWxlbWVudCBvbmNlIGl0IGV4aXN0cy5cbiAgICAgICAgdGhpcy5fbmdab25lLm9uU3RhYmxlLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxBY3RpdmVPcHRpb25JbnRvVmlldygpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpZ2dlckZvbnRTaXplICYmIHRoaXMub3ZlcmxheURpci5vdmVybGF5UmVmICYmIHRoaXMub3ZlcmxheURpci5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheURpci5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gYCR7dGhpcy50cmlnZ2VyRm9udFNpemV9cHhgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBDbG9zZXMgdGhlIG92ZXJsYXkgcGFuZWwgYW5kIGZvY3VzZXMgdGhlIGhvc3QgZWxlbWVudC4gKi9cbiAgICBjbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9wYW5lbE9wZW4pIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgLy8gdGhlIG9yZGVyIG9mIGNhbGxzIGlzIGltcG9ydGFudFxuICAgICAgICB0aGlzLnJlc2V0U2VhcmNoKCk7XG4gICAgICAgIHRoaXMuX3BhbmVsT3BlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmtleU1hbmFnZXIud2l0aEhvcml6b250YWxPcmllbnRhdGlvbih0aGlzLmlzUnRsKCkgPyAncnRsJyA6ICdsdHInKTtcblxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBzZWxlY3QncyB2YWx1ZS4gUGFydCBvZiB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gICAgICogcmVxdWlyZWQgdG8gaW50ZWdyYXRlIHdpdGggQW5ndWxhcidzIGNvcmUgZm9ybXMgQVBJLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlIE5ldyB2YWx1ZSB0byBiZSB3cml0dGVuIHRvIHRoZSBtb2RlbC5cbiAgICAgKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25CeVZhbHVlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNhdmVzIGEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCB3aGVuIHRoZSBzZWxlY3QncyB2YWx1ZVxuICAgICAqIGNoYW5nZXMgZnJvbSB1c2VyIGlucHV0LiBQYXJ0IG9mIHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgICAgKiByZXF1aXJlZCB0byBpbnRlZ3JhdGUgd2l0aCBBbmd1bGFyJ3MgY29yZSBmb3JtcyBBUEkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZm4gQ2FsbGJhY2sgdG8gYmUgdHJpZ2dlcmVkIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXMuXG4gICAgICovXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNhdmVzIGEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCB3aGVuIHRoZSBzZWxlY3QgaXMgYmx1cnJlZFxuICAgICAqIGJ5IHRoZSB1c2VyLiBQYXJ0IG9mIHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2UgcmVxdWlyZWRcbiAgICAgKiB0byBpbnRlZ3JhdGUgd2l0aCBBbmd1bGFyJ3MgY29yZSBmb3JtcyBBUEkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZm4gQ2FsbGJhY2sgdG8gYmUgdHJpZ2dlcmVkIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiB0b3VjaGVkLlxuICAgICAqL1xuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc2FibGVzIHRoZSBzZWxlY3QuIFBhcnQgb2YgdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZSByZXF1aXJlZFxuICAgICAqIHRvIGludGVncmF0ZSB3aXRoIEFuZ3VsYXIncyBjb3JlIGZvcm1zIEFQSS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpc0Rpc2FibGVkIFNldHMgd2hldGhlciB0aGUgY29tcG9uZW50IGlzIGRpc2FibGVkLlxuICAgICAqL1xuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWQoKTogTWNPcHRpb24gfCBNY09wdGlvbltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGUgPyB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdGVkIDogdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZFswXTtcbiAgICB9XG5cbiAgICBnZXQgdHJpZ2dlclZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLmVtcHR5KSB7IHJldHVybiAnJzsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdGVkWzBdLnZpZXdWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgdHJpZ2dlclZhbHVlcygpOiBNY09wdGlvbltdIHtcbiAgICAgICAgaWYgKHRoaXMuZW1wdHkpIHsgcmV0dXJuIFtdOyB9XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb25zID0gdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZDtcblxuICAgICAgICBpZiAodGhpcy5pc1J0bCgpKSB7IHNlbGVjdGVkT3B0aW9ucy5yZXZlcnNlKCk7IH1cblxuICAgICAgICByZXR1cm4gc2VsZWN0ZWRPcHRpb25zO1xuICAgIH1cblxuICAgIGdldCBlbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnNlbGVjdGlvbk1vZGVsIHx8IHRoaXMuc2VsZWN0aW9uTW9kZWwuaXNFbXB0eSgpO1xuICAgIH1cblxuICAgIGlzUnRsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlyID8gdGhpcy5fZGlyLnZhbHVlID09PSAncnRsJyA6IGZhbHNlO1xuICAgIH1cblxuICAgIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZU9wZW5LZXlkb3duKGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2xvc2VkS2V5ZG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHRoZSBwYW5lbCBjb250ZW50IGlzIGRvbmUgZmFkaW5nIGluLCB0aGUgcGFuZWxEb25lQW5pbWF0aW5nIHByb3BlcnR5IGlzXG4gICAgICogc2V0IHNvIHRoZSBwcm9wZXIgY2xhc3MgY2FuIGJlIGFkZGVkIHRvIHRoZSBwYW5lbC5cbiAgICAgKi9cbiAgICBvbkZhZGVJbkRvbmUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGFuZWxEb25lQW5pbWF0aW5nID0gdGhpcy5wYW5lbE9wZW47XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaCAmJiB0aGlzLl9wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkZvY3VzKCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyB0aGUgdG91Y2hlZCBjYWxsYmFjayBvbmx5IGlmIHRoZSBwYW5lbCBpcyBjbG9zZWQuIE90aGVyd2lzZSwgdGhlIHRyaWdnZXIgd2lsbFxuICAgICAqIFwiYmx1clwiIHRvIHRoZSBwYW5lbCB3aGVuIGl0IG9wZW5zLCBjYXVzaW5nIGEgZmFsc2UgcG9zaXRpdmUuXG4gICAgICovXG4gICAgb25CbHVyKCkge1xuICAgICAgICB0aGlzLl9mb2N1c2VkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkICYmICF0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdGhhdCBpcyBpbnZva2VkIHdoZW4gdGhlIG92ZXJsYXkgcGFuZWwgaGFzIGJlZW4gYXR0YWNoZWQuXG4gICAgICovXG4gICAgb25BdHRhY2hlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vdmVybGF5RGlyLnBvc2l0aW9uQ2hhbmdlXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0T3ZlcmxheVBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gdGhpcy5zY3JvbGxUb3A7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcm9sbFNpemUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBSZXR1cm5zIHRoZSB0aGVtZSB0byBiZSB1c2VkIG9uIHRoZSBwYW5lbC4gKi9cbiAgICBnZXRQYW5lbFRoZW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnRGb3JtRmllbGQgPyBgbWMtJHt0aGlzLl9wYXJlbnRGb3JtRmllbGQuY29sb3J9YCA6ICcnO1xuICAgIH1cblxuICAgIC8qKiBGb2N1c2VzIHRoZSBzZWxlY3QgZWxlbWVudC4gKi9cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1jRm9ybUZpZWxkQ29udHJvbC5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgb25Db250YWluZXJDbGljaygpIHtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG5cbiAgICAvKiogSW52b2tlZCB3aGVuIGFuIG9wdGlvbiBpcyBjbGlja2VkLiAqL1xuICAgIG9uUmVtb3ZlTWF0Y2hlckl0ZW0ob3B0aW9uOiBNY09wdGlvbiwgJGV2ZW50KTogdm9pZCB7XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBvcHRpb24uZGVzZWxlY3QoKTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVIaWRkZW5JdGVtcygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tVHJpZ2dlciB8fCB0aGlzLmVtcHR5IHx8ICF0aGlzLm11bHRpcGxlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGxldCB2aXNpYmxlSXRlbXM6IG51bWJlciA9IDA7XG4gICAgICAgIGNvbnN0IHRvdGFsSXRlbXNXaWR0aCA9IHRoaXMuZ2V0VG90YWxJdGVtc1dpZHRoSW5NYXRjaGVyKCk7XG4gICAgICAgIGxldCB0b3RhbFZpc2libGVJdGVtc1dpZHRoOiBudW1iZXIgPSAwO1xuXG4gICAgICAgIHRoaXMudGFncy5mb3JFYWNoKCh0YWcpID0+IHtcbiAgICAgICAgICAgIGlmICh0YWcubmF0aXZlRWxlbWVudC5vZmZzZXRUb3AgPCB0YWcubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICB0b3RhbFZpc2libGVJdGVtc1dpZHRoICs9IHRoaXMuZ2V0SXRlbVdpZHRoKHRhZy5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgICAgICB2aXNpYmxlSXRlbXMrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5oaWRkZW5JdGVtcyA9ICh0aGlzLnNlbGVjdGVkIGFzIEFycmF5TGlrZTxNY09wdGlvbj4pLmxlbmd0aCAtIHZpc2libGVJdGVtcztcblxuICAgICAgICBpZiAodGhpcy5oaWRkZW5JdGVtcykge1xuICAgICAgICAgICAgY29uc3QgaXRlbXNDb3VudGVyID0gdGhpcy50cmlnZ2VyLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1jLXNlbGVjdF9fbWF0Y2gtaGlkZGVuLXRleHQnKTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXJMaXN0ID0gdGhpcy50cmlnZ2VyLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1jLXNlbGVjdF9fbWF0Y2gtbGlzdCcpO1xuXG4gICAgICAgICAgICBjb25zdCBpdGVtc0NvdW50ZXJTaG93ZWQgPSBpdGVtc0NvdW50ZXIub2Zmc2V0VG9wIDwgaXRlbXNDb3VudGVyLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIC8vIGNvbnN0IGl0ZW1zQ291bnRlcldpZHRoOiBudW1iZXIgPSBpdGVtc0NvdW50ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBpdGVtc0NvdW50ZXJXaWR0aDogbnVtYmVyID0gODY7XG5cbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXJMaXN0V2lkdGg6IG51bWJlciA9IG1hdGNoZXJMaXN0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlcldpZHRoOiBudW1iZXIgPSBtYXRjaGVyTGlzdFdpZHRoICsgaXRlbXNDb3VudGVyV2lkdGg7XG5cbiAgICAgICAgICAgIGlmIChpdGVtc0NvdW50ZXJTaG93ZWQgJiYgKHRvdGFsSXRlbXNXaWR0aCA8IG1hdGNoZXJXaWR0aCkpIHsgdGhpcy5oaWRkZW5JdGVtcyA9IDA7IH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRvdGFsVmlzaWJsZUl0ZW1zV2lkdGggPT09IG1hdGNoZXJMaXN0V2lkdGggfHxcbiAgICAgICAgICAgICAgICAodG90YWxWaXNpYmxlSXRlbXNXaWR0aCArIGl0ZW1zQ291bnRlcldpZHRoKSA8IG1hdGNoZXJMaXN0V2lkdGhcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWl0ZW1zQ291bnRlclNob3dlZCAmJiAodG90YWxJdGVtc1dpZHRoICsgaXRlbXNDb3VudGVyV2lkdGgpID4gbWF0Y2hlcldpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRkZW5JdGVtcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgZ2V0SXRlbUhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmZpcnN0ID8gdGhpcy5vcHRpb25zLmZpcnN0LmdldEhlaWdodCgpIDogMDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEhlaWdodE9mT3B0aW9uc0NvbnRhaW5lcigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuZ2V0Q2xpZW50UmVjdHMoKVswXS5oZWlnaHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVTY3JvbGxTaXplKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5maXJzdCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmtleU1hbmFnZXIud2l0aFNjcm9sbFNpemUoXG4gICAgICAgICAgICBNYXRoLmZsb29yKHRoaXMuZ2V0SGVpZ2h0T2ZPcHRpb25zQ29udGFpbmVyKCkgLyB0aGlzLm9wdGlvbnMuZmlyc3QuZ2V0SGVpZ2h0KCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUb3RhbEl0ZW1zV2lkdGhJbk1hdGNoZXIoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgdHJpZ2dlckNsb25lID0gdGhpcy50cmlnZ2VyLm5hdGl2ZUVsZW1lbnQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICB0cmlnZ2VyQ2xvbmUucXVlcnlTZWxlY3RvcignLm1jLXNlbGVjdF9fbWF0Y2gtaGlkZGVuLXRleHQnKS5yZW1vdmUoKTtcblxuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0cmlnZ2VyQ2xvbmUsICdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0cmlnZ2VyQ2xvbmUsICd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0cmlnZ2VyQ2xvbmUsICd0b3AnLCAnLTEwMCUnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodHJpZ2dlckNsb25lLCAnbGVmdCcsICcwJyk7XG5cbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy50cmlnZ2VyLm5hdGl2ZUVsZW1lbnQsIHRyaWdnZXJDbG9uZSk7XG5cbiAgICAgICAgbGV0IHRvdGFsSXRlbXNXaWR0aDogbnVtYmVyID0gMDtcbiAgICAgICAgdHJpZ2dlckNsb25lLnF1ZXJ5U2VsZWN0b3JBbGwoJ21jLXRhZycpLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHRvdGFsSXRlbXNXaWR0aCArPSB0aGlzLmdldEl0ZW1XaWR0aChpdGVtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdHJpZ2dlckNsb25lLnJlbW92ZSgpO1xuXG4gICAgICAgIHJldHVybiB0b3RhbEl0ZW1zV2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRJdGVtV2lkdGgoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG5cbiAgICAgICAgY29uc3Qgd2lkdGg6IG51bWJlciA9IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUud2lkdGggYXMgc3RyaW5nKTtcbiAgICAgICAgY29uc3QgbWFyZ2luTGVmdDogbnVtYmVyID0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS5tYXJnaW5MZWZ0IGFzIHN0cmluZyk7XG4gICAgICAgIGNvbnN0IG1hcmdpblJpZ2h0OiBudW1iZXIgPSBwYXJzZUludChjb21wdXRlZFN0eWxlLm1hcmdpblJpZ2h0IGFzIHN0cmluZyk7XG5cbiAgICAgICAgcmV0dXJuIHdpZHRoICsgbWFyZ2luTGVmdCArIG1hcmdpblJpZ2h0O1xuICAgIH1cblxuICAgIC8qKiBIYW5kbGVzIGtleWJvYXJkIGV2ZW50cyB3aGlsZSB0aGUgc2VsZWN0IGlzIGNsb3NlZC4gKi9cbiAgICBwcml2YXRlIGhhbmRsZUNsb3NlZEtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lICovXG4gICAgICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuICAgICAgICBjb25zdCBpc0Fycm93S2V5ID0ga2V5Q29kZSA9PT0gRE9XTl9BUlJPVyB8fCBrZXlDb2RlID09PSBVUF9BUlJPVyB8fFxuICAgICAgICAgICAga2V5Q29kZSA9PT0gTEVGVF9BUlJPVyB8fCBrZXlDb2RlID09PSBSSUdIVF9BUlJPVztcbiAgICAgICAgY29uc3QgaXNPcGVuS2V5ID0ga2V5Q29kZSA9PT0gRU5URVIgfHwga2V5Q29kZSA9PT0gU1BBQ0U7XG5cbiAgICAgICAgLy8gT3BlbiB0aGUgc2VsZWN0IG9uIEFMVCArIGFycm93IGtleSB0byBtYXRjaCB0aGUgbmF0aXZlIDxzZWxlY3Q+XG4gICAgICAgIGlmIChpc09wZW5LZXkgfHwgKCh0aGlzLm11bHRpcGxlIHx8IGV2ZW50LmFsdEtleSkgJiYgaXNBcnJvd0tleSkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnRzIHRoZSBwYWdlIGZyb20gc2Nyb2xsaW5nIGRvd24gd2hlbiBwcmVzc2luZyBzcGFjZVxuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMga2V5Ym9hcmQgZXZlbnRzIHdoZW4gdGhlIHNlbGVjdGVkIGlzIG9wZW4uICovXG4gICAgcHJpdmF0ZSBoYW5kbGVPcGVuS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgKi9cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG4gICAgICAgIGNvbnN0IGlzQXJyb3dLZXkgPSBrZXlDb2RlID09PSBET1dOX0FSUk9XIHx8IGtleUNvZGUgPT09IFVQX0FSUk9XO1xuXG4gICAgICAgIGlmIChpc0Fycm93S2V5ICYmIGV2ZW50LmFsdEtleSkge1xuICAgICAgICAgICAgLy8gQ2xvc2UgdGhlIHNlbGVjdCBvbiBBTFQgKyBhcnJvdyBrZXkgdG8gbWF0Y2ggdGhlIG5hdGl2ZSA8c2VsZWN0PlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBIT01FKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gRU5EKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0TGFzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBQQUdFX1VQKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0UHJldmlvdXNQYWdlSXRlbUFjdGl2ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFBBR0VfRE9XTikge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldE5leHRQYWdlSXRlbUFjdGl2ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKChrZXlDb2RlID09PSBFTlRFUiB8fCBrZXlDb2RlID09PSBTUEFDRSkgJiYgdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbS5zZWxlY3RWaWFJbnRlcmFjdGlvbigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX211bHRpcGxlICYmIGtleUNvZGUgPT09IEEgJiYgZXZlbnQuY3RybEtleSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IGhhc0Rlc2VsZWN0ZWRPcHRpb25zID0gdGhpcy5vcHRpb25zLnNvbWUoKG9wdGlvbikgPT4gIW9wdGlvbi5zZWxlY3RlZCk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc0Rlc2VsZWN0ZWRPcHRpb25zICYmICFvcHRpb24uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnNlbGVjdCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNseUZvY3VzZWRJbmRleCA9IHRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXg7XG5cbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGUgJiYgaXNBcnJvd0tleSAmJiBldmVudC5zaGlmdEtleSAmJiB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbSAmJlxuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggIT09IHByZXZpb3VzbHlGb2N1c2VkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbS5zZWxlY3RWaWFJbnRlcmFjdGlvbigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5zZWFyY2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgICAgICAvLyBEZWZlciBzZXR0aW5nIHRoZSB2YWx1ZSBpbiBvcmRlciB0byBhdm9pZCB0aGUgXCJFeHByZXNzaW9uXG4gICAgICAgIC8vIGhhcyBjaGFuZ2VkIGFmdGVyIGl0IHdhcyBjaGVja2VkXCIgZXJyb3JzIGZyb20gQW5ndWxhci5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvbkJ5VmFsdWUodGhpcy5uZ0NvbnRyb2wgPyB0aGlzLm5nQ29udHJvbC52YWx1ZSA6IHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgc2VsZWN0ZWQgb3B0aW9uIGJhc2VkIG9uIGEgdmFsdWUuIElmIG5vIG9wdGlvbiBjYW4gYmVcbiAgICAgKiBmb3VuZCB3aXRoIHRoZSBkZXNpZ25hdGVkIHZhbHVlLCB0aGUgc2VsZWN0IHRyaWdnZXIgaXMgY2xlYXJlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNldFNlbGVjdGlvbkJ5VmFsdWUodmFsdWU6IGFueSB8IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMucHJldmlvdXNTZWxlY3Rpb25Nb2RlbFNlbGVjdGVkID0gdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZDtcblxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRocm93IGdldE1jU2VsZWN0Tm9uQXJyYXlWYWx1ZUVycm9yKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcbiAgICAgICAgICAgIHZhbHVlLmZvckVhY2goKGN1cnJlbnRWYWx1ZTogYW55KSA9PiB0aGlzLnNlbGVjdFZhbHVlKGN1cnJlbnRWYWx1ZSkpO1xuICAgICAgICAgICAgdGhpcy5zb3J0VmFsdWVzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgICAgICAgICBjb25zdCBjb3JyZXNwb25kaW5nT3B0aW9uID0gdGhpcy5zZWxlY3RWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgICAgICAgIC8vIFNoaWZ0IGZvY3VzIHRvIHRoZSBhY3RpdmUgaXRlbS4gTm90ZSB0aGF0IHdlIHNob3VsZG4ndCBkbyB0aGlzIGluIG11bHRpcGxlXG4gICAgICAgICAgICAvLyBtb2RlLCBiZWNhdXNlIHdlIGRvbid0IGtub3cgd2hhdCBvcHRpb24gdGhlIHVzZXIgaW50ZXJhY3RlZCB3aXRoIGxhc3QuXG4gICAgICAgICAgICBpZiAoY29ycmVzcG9uZGluZ09wdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKGNvcnJlc3BvbmRpbmdPcHRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDb3JyZXNwb25kT3B0aW9uKHZhbHVlOiBhbnkpOiBNY09wdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMudG9BcnJheSgpLFxuICAgICAgICAgICAgLi4udGhpcy5wcmV2aW91c1NlbGVjdGlvbk1vZGVsU2VsZWN0ZWRcbiAgICAgICAgXS5maW5kKChvcHRpb246IE1jT3B0aW9uKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIC8vIFRyZWF0IG51bGwgYXMgYSBzcGVjaWFsIHJlc2V0IHZhbHVlLlxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb24udmFsdWUgIT0gbnVsbCAmJiB0aGlzLmNvbXBhcmVXaXRoKG9wdGlvbi52YWx1ZSwgdmFsdWUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTm90aWZ5IGRldmVsb3BlcnMgb2YgZXJyb3JzIGluIHRoZWlyIGNvbXBhcmF0b3IuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyBhbmQgc2VsZWN0cyBhbmQgb3B0aW9uIGJhc2VkIG9uIGl0cyB2YWx1ZS5cbiAgICAgKiBAcmV0dXJucyBPcHRpb24gdGhhdCBoYXMgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZWxlY3RWYWx1ZSh2YWx1ZTogYW55KTogTWNPcHRpb24gfCB1bmRlZmluZWQge1xuICAgICAgICBjb25zdCBjb3JyZXNwb25kaW5nT3B0aW9uID0gdGhpcy5nZXRDb3JyZXNwb25kT3B0aW9uKHZhbHVlKTtcblxuICAgICAgICBpZiAoY29ycmVzcG9uZGluZ09wdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3QoY29ycmVzcG9uZGluZ09wdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29ycmVzcG9uZGluZ09wdGlvbjtcbiAgICB9XG5cbiAgICAvKiogU2V0cyB1cCBhIGtleSBtYW5hZ2VyIHRvIGxpc3RlbiB0byBrZXlib2FyZCBldmVudHMgb24gdGhlIG92ZXJsYXkgcGFuZWwuICovXG4gICAgcHJpdmF0ZSBpbml0S2V5TWFuYWdlcigpIHtcbiAgICAgICAgY29uc3QgdHlwZUFoZWFkRGVib3VuY2UgPSAyMDA7XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyID0gbmV3IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPE1jT3B0aW9uPih0aGlzLm9wdGlvbnMpXG4gICAgICAgICAgICAud2l0aFR5cGVBaGVhZCh0eXBlQWhlYWREZWJvdW5jZSwgdGhpcy5zZWFyY2ggPyAtMSA6IDApXG4gICAgICAgICAgICAud2l0aFZlcnRpY2FsT3JpZW50YXRpb24oKVxuICAgICAgICAgICAgLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24odGhpcy5pc1J0bCgpID8gJ3J0bCcgOiAnbHRyJyk7XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnRhYk91dFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBSZXN0b3JlIGZvY3VzIHRvIHRoZSB0cmlnZ2VyIGJlZm9yZSBjbG9zaW5nLiBFbnN1cmVzIHRoYXQgdGhlIGZvY3VzXG4gICAgICAgICAgICAgICAgLy8gcG9zaXRpb24gd29uJ3QgYmUgbG9zdCBpZiB0aGUgdXNlciBnb3QgZm9jdXMgaW50byB0aGUgb3ZlcmxheS5cbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLmNoYW5nZVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcGFuZWxPcGVuICYmIHRoaXMucGFuZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxBY3RpdmVPcHRpb25JbnRvVmlldygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX3BhbmVsT3BlbiAmJiAhdGhpcy5tdWx0aXBsZSAmJiB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbS5zZWxlY3RWaWFJbnRlcmFjdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBEcm9wcyBjdXJyZW50IG9wdGlvbiBzdWJzY3JpcHRpb25zIGFuZCBJRHMgYW5kIHJlc2V0cyBmcm9tIHNjcmF0Y2guICovXG4gICAgcHJpdmF0ZSByZXNldE9wdGlvbnMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNoYW5nZWRPckRlc3Ryb3llZCA9IG1lcmdlKHRoaXMub3B0aW9ucy5jaGFuZ2VzLCB0aGlzLmRlc3Ryb3kpO1xuXG4gICAgICAgIHRoaXMub3B0aW9uU2VsZWN0aW9uQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKGNoYW5nZWRPckRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3QoZXZlbnQuc291cmNlLCBldmVudC5pc1VzZXJJbnB1dCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWFyY2ggJiYgdGhpcy5zZWFyY2guaXNTZWFyY2hDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gdGhpcy5rZXlNYW5hZ2VyLnVwZGF0ZUFjdGl2ZUl0ZW0oMCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoLmlzU2VhcmNoQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChldmVudC5pc1VzZXJJbnB1dCAmJiAhdGhpcy5tdWx0aXBsZSAmJiB0aGlzLl9wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTGlzdGVuIHRvIGNoYW5nZXMgaW4gdGhlIGludGVybmFsIHN0YXRlIG9mIHRoZSBvcHRpb25zIGFuZCByZWFjdCBhY2NvcmRpbmdseS5cbiAgICAgICAgLy8gSGFuZGxlcyBjYXNlcyBsaWtlIHRoZSBsYWJlbHMgb2YgdGhlIHNlbGVjdGVkIG9wdGlvbnMgY2hhbmdpbmcuXG4gICAgICAgIG1lcmdlKC4uLnRoaXMub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gb3B0aW9uLnN0YXRlQ2hhbmdlcykpXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwoY2hhbmdlZE9yRGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBJbnZva2VkIHdoZW4gYW4gb3B0aW9uIGlzIGNsaWNrZWQuICovXG4gICAgcHJpdmF0ZSBvblNlbGVjdChvcHRpb246IE1jT3B0aW9uLCBpc1VzZXJJbnB1dDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBjb25zdCB3YXNTZWxlY3RlZCA9IHRoaXMuc2VsZWN0aW9uTW9kZWwuaXNTZWxlY3RlZChvcHRpb24pO1xuXG4gICAgICAgIGlmIChvcHRpb24udmFsdWUgPT0gbnVsbCAmJiAhdGhpcy5fbXVsdGlwbGUpIHtcbiAgICAgICAgICAgIG9wdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2VzKG9wdGlvbi52YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3Qob3B0aW9uKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5kZXNlbGVjdChvcHRpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNVc2VySW5wdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShvcHRpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc29ydFZhbHVlcygpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzVXNlcklucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEluIGNhc2UgdGhlIHVzZXIgc2VsZWN0ZWQgdGhlIG9wdGlvbiB3aXRoIHRoZWlyIG1vdXNlLCB3ZVxuICAgICAgICAgICAgICAgICAgICAvLyB3YW50IHRvIHJlc3RvcmUgZm9jdXMgYmFjayB0byB0aGUgdHJpZ2dlciwgaW4gb3JkZXIgdG9cbiAgICAgICAgICAgICAgICAgICAgLy8gcHJldmVudCB0aGUgc2VsZWN0IGtleWJvYXJkIGNvbnRyb2xzIGZyb20gY2xhc2hpbmcgd2l0aFxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgb25lcyBmcm9tIGBtYy1vcHRpb25gLlxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBzZWFyY2ggaXMgYXZhbGlhYmxlIHRoZW4gd2UgZm9jdXMgc2VhcmNoIGFnYWluLlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWFyY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAod2FzU2VsZWN0ZWQgIT09IHRoaXMuc2VsZWN0aW9uTW9kZWwuaXNTZWxlY3RlZChvcHRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKiogU29ydHMgdGhlIHNlbGVjdGVkIHZhbHVlcyBpbiB0aGUgc2VsZWN0ZWQgYmFzZWQgb24gdGhlaXIgb3JkZXIgaW4gdGhlIHBhbmVsLiAqL1xuICAgIHByaXZhdGUgc29ydFZhbHVlcygpIHtcbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMudG9BcnJheSgpO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zb3J0Q29tcGFyYXRvciA/IHRoaXMuc29ydENvbXBhcmF0b3IoYSwgYiwgb3B0aW9ucykgOlxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmluZGV4T2YoYSkgLSBvcHRpb25zLmluZGV4T2YoYik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBFbWl0cyBjaGFuZ2UgZXZlbnQgdG8gc2V0IHRoZSBtb2RlbCB2YWx1ZS4gKi9cbiAgICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZXMoZmFsbGJhY2tWYWx1ZT86IGFueSk6IHZvaWQge1xuICAgICAgICBsZXQgdmFsdWVUb0VtaXQ6IGFueSA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHZhbHVlVG9FbWl0ID0gKHRoaXMuc2VsZWN0ZWQgYXMgTWNPcHRpb25bXSkubWFwKChvcHRpb24pID0+IG9wdGlvbi52YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZVRvRW1pdCA9IHRoaXMuc2VsZWN0ZWQgPyAodGhpcy5zZWxlY3RlZCBhcyBNY09wdGlvbikudmFsdWUgOiBmYWxsYmFja1ZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZVRvRW1pdDtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlVG9FbWl0KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZVRvRW1pdCk7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQobmV3IE1jU2VsZWN0Q2hhbmdlKHRoaXMsIHZhbHVlVG9FbWl0KSk7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZ2hsaWdodHMgdGhlIHNlbGVjdGVkIGl0ZW0uIElmIG5vIG9wdGlvbiBpcyBzZWxlY3RlZCwgaXQgd2lsbCBoaWdobGlnaHRcbiAgICAgKiB0aGUgZmlyc3QgaXRlbSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIHByaXZhdGUgaGlnaGxpZ2h0Q29ycmVjdE9wdGlvbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMua2V5TWFuYWdlcikge1xuICAgICAgICAgICAgaWYgKHRoaXMuZW1wdHkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFNjcm9sbHMgdGhlIGFjdGl2ZSBvcHRpb24gaW50byB2aWV3LiAqL1xuICAgIHByaXZhdGUgc2Nyb2xsQWN0aXZlT3B0aW9uSW50b1ZpZXcoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0pIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0uZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB4LW9mZnNldCBvZiB0aGUgb3ZlcmxheSBwYW5lbCBpbiByZWxhdGlvbiB0byB0aGUgdHJpZ2dlcidzIHRvcCBzdGFydCBjb3JuZXIuXG4gICAgICogVGhpcyBtdXN0IGJlIGFkanVzdGVkIHRvIGFsaWduIHRoZSBzZWxlY3RlZCBvcHRpb24gdGV4dCBvdmVyIHRoZSB0cmlnZ2VyIHRleHQgd2hlblxuICAgICAqIHRoZSBwYW5lbCBvcGVucy4gV2lsbCBjaGFuZ2UgYmFzZWQgb24gTFRSIG9yIFJUTCB0ZXh0IGRpcmVjdGlvbi4gTm90ZSB0aGF0IHRoZSBvZmZzZXRcbiAgICAgKiBjYW4ndCBiZSBjYWxjdWxhdGVkIHVudGlsIHRoZSBwYW5lbCBoYXMgYmVlbiBhdHRhY2hlZCwgYmVjYXVzZSB3ZSBuZWVkIHRvIGtub3cgdGhlXG4gICAgICogY29udGVudCB3aWR0aCBpbiBvcmRlciB0byBjb25zdHJhaW4gdGhlIHBhbmVsIHdpdGhpbiB0aGUgdmlld3BvcnQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRPdmVybGF5UG9zaXRpb24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVzZXRPdmVybGF5KCk7XG5cbiAgICAgICAgY29uc3Qgb3ZlcmxheVJlY3QgPSB0aGlzLmdldE92ZXJsYXlSZWN0KCk7XG4gICAgICAgIC8vIFdpbmRvdyB3aWR0aCB3aXRob3V0IHNjcm9sbGJhclxuICAgICAgICBjb25zdCB3aW5kb3dXaWR0aCA9IHRoaXMuZ2V0QmFja2Ryb3BXaWR0aCgpO1xuICAgICAgICBjb25zdCBpc1J0bCA9IHRoaXMuaXNSdGwoKTtcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnMgKi9cbiAgICAgICAgY29uc3QgcGFkZGluZ1dpZHRoID0gU0VMRUNUX1BBTkVMX1BBRERJTkdfWCAqIDI7XG4gICAgICAgIGxldCBvZmZzZXRYOiBudW1iZXI7XG4gICAgICAgIGxldCBvdmVybGF5TWF4V2lkdGg6IG51bWJlcjtcblxuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF0gfHwgdGhpcy5vcHRpb25zLmZpcnN0O1xuICAgICAgICBvZmZzZXRYID0gc2VsZWN0ZWQgJiYgc2VsZWN0ZWQuZ3JvdXAgPyBTRUxFQ1RfUEFORUxfSU5ERU5UX1BBRERJTkdfWCA6IFNFTEVDVF9QQU5FTF9QQURESU5HX1g7XG5cbiAgICAgICAgLy8gSW52ZXJ0IHRoZSBvZmZzZXQgaW4gTFRSLlxuICAgICAgICBpZiAoIWlzUnRsKSB7IG9mZnNldFggKj0gLTE7IH1cblxuICAgICAgICAvLyBEZXRlcm1pbmUgaWYgc2VsZWN0IG92ZXJmbG93cyBvbiBlaXRoZXIgc2lkZS5cbiAgICAgICAgY29uc3QgbGVmdE92ZXJmbG93ID0gMCAtIChvdmVybGF5UmVjdC5sZWZ0ICsgb2Zmc2V0WCAtIChpc1J0bCA/IHBhZGRpbmdXaWR0aCA6IDApKTtcbiAgICAgICAgY29uc3QgcmlnaHRPdmVyZmxvdyA9IG92ZXJsYXlSZWN0LnJpZ2h0ICsgb2Zmc2V0WCAtIHdpbmRvd1dpZHRoXG4gICAgICAgICAgICArIChpc1J0bCA/IDAgOiBwYWRkaW5nV2lkdGgpO1xuXG4gICAgICAgIC8vIElmIHRoZSBlbGVtZW50IG92ZXJmbG93cyBvbiBlaXRoZXIgc2lkZSwgcmVkdWNlIHRoZSBvZmZzZXQgdG8gYWxsb3cgaXQgdG8gZml0LlxuICAgICAgICBpZiAobGVmdE92ZXJmbG93ID4gMCB8fCByaWdodE92ZXJmbG93ID4gMCkge1xuICAgICAgICAgICAgW29mZnNldFgsIG92ZXJsYXlNYXhXaWR0aF0gPSB0aGlzLmNhbGN1bGF0ZU92ZXJsYXlYUG9zaXRpb24ob3ZlcmxheVJlY3QsIHdpbmRvd1dpZHRoLCBvZmZzZXRYKTtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheURpci5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LnN0eWxlLm1heFdpZHRoID0gYCR7b3ZlcmxheU1heFdpZHRofXB4YDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldCB0aGUgb2Zmc2V0IGRpcmVjdGx5IGluIG9yZGVyIHRvIGF2b2lkIGhhdmluZyB0byBnbyB0aHJvdWdoIGNoYW5nZSBkZXRlY3Rpb24gYW5kXG4gICAgICAgIC8vIHBvdGVudGlhbGx5IHRyaWdnZXJpbmcgXCJjaGFuZ2VkIGFmdGVyIGl0IHdhcyBjaGVja2VkXCIgZXJyb3JzLiBSb3VuZCB0aGUgdmFsdWUgdG8gYXZvaWRcbiAgICAgICAgLy8gYmx1cnJ5IGNvbnRlbnQgaW4gc29tZSBicm93c2Vycy5cbiAgICAgICAgdGhpcy5vdmVybGF5RGlyLm9mZnNldFggPSBNYXRoLnJvdW5kKG9mZnNldFgpO1xuICAgICAgICB0aGlzLm92ZXJsYXlEaXIub3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlT3ZlcmxheVhQb3NpdGlvbihvdmVybGF5UmVjdCwgd2luZG93V2lkdGgsIGJhc2ljT2Zmc2V0WCkge1xuICAgICAgICBsZXQgb2Zmc2V0WCA9IGJhc2ljT2Zmc2V0WDtcbiAgICAgICAgY29uc3QgbGVmdEluZGVudCA9IHRoaXMudHJpZ2dlclJlY3QubGVmdDtcbiAgICAgICAgY29uc3QgcmlnaHRJbmRlbnQgPSB3aW5kb3dXaWR0aCAtIHRoaXMudHJpZ2dlclJlY3QucmlnaHQ7XG4gICAgICAgIC8vIFNldHRpbmcgZGlyZWN0aW9uIG9mIGRyb3Bkb3duIGV4cGFuc2lvblxuICAgICAgICBjb25zdCBpc1JpZ2h0RGlyZWN0aW9uID0gbGVmdEluZGVudCA8PSByaWdodEluZGVudDtcblxuICAgICAgICBsZXQgbWF4RHJvcGRvd25XaWR0aDogbnVtYmVyO1xuICAgICAgICBsZXQgb3ZlcmxheU1heFdpZHRoOiBudW1iZXI7XG4gICAgICAgIGNvbnN0IHRyaWdnZXJXaWR0aCA9IHRoaXMudHJpZ2dlclJlY3Qud2lkdGggKyBTRUxFQ1RfUEFORUxfSU5ERU5UX1BBRERJTkdfWDtcblxuICAgICAgICBpZiAoaXNSaWdodERpcmVjdGlvbikge1xuICAgICAgICAgICAgbWF4RHJvcGRvd25XaWR0aCA9IHJpZ2h0SW5kZW50ICsgdHJpZ2dlcldpZHRoIC0gU0VMRUNUX1BBTkVMX1ZJRVdQT1JUX1BBRERJTkc7XG4gICAgICAgICAgICBvdmVybGF5TWF4V2lkdGggPSBvdmVybGF5UmVjdC53aWR0aCA8IG1heERyb3Bkb3duV2lkdGggPyBvdmVybGF5UmVjdC53aWR0aCA6IG1heERyb3Bkb3duV2lkdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgbGVmdE9mZnNldDtcbiAgICAgICAgICAgIG1heERyb3Bkb3duV2lkdGggPSBsZWZ0SW5kZW50ICsgdHJpZ2dlcldpZHRoIC0gU0VMRUNUX1BBTkVMX1ZJRVdQT1JUX1BBRERJTkc7XG5cbiAgICAgICAgICAgIGlmIChvdmVybGF5UmVjdC53aWR0aCA8IG1heERyb3Bkb3duV2lkdGgpIHtcbiAgICAgICAgICAgICAgICBvdmVybGF5TWF4V2lkdGggPSBvdmVybGF5UmVjdC53aWR0aDtcbiAgICAgICAgICAgICAgICBsZWZ0T2Zmc2V0ID0gdGhpcy50cmlnZ2VyUmVjdC5yaWdodCAtIG92ZXJsYXlNYXhXaWR0aDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb3ZlcmxheU1heFdpZHRoID0gbWF4RHJvcGRvd25XaWR0aDtcbiAgICAgICAgICAgICAgICBsZWZ0T2Zmc2V0ID0gdGhpcy50cmlnZ2VyUmVjdC5yaWdodCAtIChvdmVybGF5TWF4V2lkdGggLSBTRUxFQ1RfUEFORUxfSU5ERU5UX1BBRERJTkdfWCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvZmZzZXRYIC09IHRoaXMudHJpZ2dlclJlY3QubGVmdCAtIGxlZnRPZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW29mZnNldFgsIG92ZXJsYXlNYXhXaWR0aF07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNldE92ZXJsYXkoKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheURpci5vZmZzZXRYID0gMDtcbiAgICAgICAgdGhpcy5vdmVybGF5RGlyLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuc3R5bGUubWF4V2lkdGggPSAndW5zZXQnO1xuICAgICAgICB0aGlzLm92ZXJsYXlEaXIub3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0T3ZlcmxheVJlY3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlEaXIub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEJhY2tkcm9wV2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjcm9sbFN0cmF0ZWd5Ll9vdmVybGF5UmVmLmJhY2tkcm9wRWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICB9XG5cbiAgICAvKiogQ29tcGFyaXNvbiBmdW5jdGlvbiB0byBzcGVjaWZ5IHdoaWNoIG9wdGlvbiBpcyBkaXNwbGF5ZWQuIERlZmF1bHRzIHRvIG9iamVjdCBlcXVhbGl0eS4gKi9cbiAgICBwcml2YXRlIF9jb21wYXJlV2l0aCA9IChvMTogYW55LCBvMjogYW55KSA9PiBvMSA9PT0gbzI7XG59XG4iXX0=