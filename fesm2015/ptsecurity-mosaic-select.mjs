import * as i2 from '@angular/cdk/overlay';
import { CdkConnectedOverlay, OverlayModule } from '@angular/cdk/overlay';
import * as i8 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Directive, Inject, Optional, ContentChild, EventEmitter, isDevMode, Component, ViewEncapsulation, ChangeDetectionStrategy, Self, ViewChild, ViewChildren, ContentChildren, Input, Output, NgModule } from '@angular/core';
import * as i1 from '@ptsecurity/mosaic/core';
import { mixinTabIndex, mixinDisabled, mixinErrorState, getMcSelectDynamicMultipleError, getMcSelectNonFunctionValueError, setMosaicValidation, getMcSelectNonArrayValueError, SELECT_PANEL_PADDING_X, SELECT_PANEL_INDENT_PADDING_X, SELECT_PANEL_VIEWPORT_PADDING, MC_SELECT_SCROLL_STRATEGY, MC_VALIDATION, MC_OPTION_PARENT_COMPONENT, McOption, McOptgroup, mcSelectAnimations, McOptionModule, MC_SELECT_SCROLL_STRATEGY_PROVIDER } from '@ptsecurity/mosaic/core';
import * as i1$1 from '@ptsecurity/mosaic/form-field';
import { McFormFieldControl, McFormFieldModule } from '@ptsecurity/mosaic/form-field';
import * as i6 from '@ptsecurity/mosaic/icon';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import * as i5 from '@ptsecurity/mosaic/tags';
import { McTag, McTagsModule } from '@ptsecurity/mosaic/tags';
import { McTooltipTrigger, MC_TOOLTIP_SCROLL_STRATEGY, McToolTipModule } from '@ptsecurity/mosaic/tooltip';
import * as i3 from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import * as i4 from '@angular/forms';
import { NG_VALIDATORS } from '@angular/forms';
import { ActiveDescendantKeyManager } from '@ptsecurity/cdk/a11y';
import { ESCAPE, SPACE, HOME, END, DOWN_ARROW, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, ENTER, PAGE_UP, PAGE_DOWN, A } from '@ptsecurity/cdk/keycodes';
import { McInput } from '@ptsecurity/mosaic/input';
import { Subscription, Subject, defer, merge } from 'rxjs';
import { take, switchMap, filter, map, distinctUntilChanged, takeUntil, startWith } from 'rxjs/operators';

class McOptionTooltip extends McTooltipTrigger {
    constructor(option, overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) {
        super(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction);
        this.option = option;
    }
    get textElement() {
        return this.option.textElement.nativeElement;
    }
    get isOverflown() {
        return this.textElement.clientWidth < this.textElement.scrollWidth;
    }
    ngAfterViewInit() {
        this.content = this.option.viewValue;
        this.resizeObserver = new ResizeObserver(() => this.disabled = !this.isOverflown);
        this.mutationObserver = new MutationObserver(() => this.content = this.option.viewValue);
        this.mutationObserver.observe(this.textElement, {
            characterData: true, attributes: false, childList: true, subtree: true
        });
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.resizeObserver) {
            this.resizeObserver.unobserve(this.textElement);
            this.resizeObserver.disconnect();
        }
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
        }
    }
    onMouseEnter() {
        this.resizeObserver.observe(this.textElement);
        this.disabled = !this.isOverflown;
    }
    onMouseLeave() {
        this.resizeObserver.unobserve(this.textElement);
        this.disabled = true;
    }
}
/** @nocollapse */ /** @nocollapse */ McOptionTooltip.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McOptionTooltip, deps: [{ token: i1.McOption }, { token: i2.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i2.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_TOOLTIP_SCROLL_STRATEGY }, { token: i3.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McOptionTooltip.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: McOptionTooltip, selector: "mc-option", host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" } }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McOptionTooltip, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-option',
                    host: {
                        '(mouseenter)': 'onMouseEnter()',
                        '(mouseleave)': 'onMouseLeave()'
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: i1.McOption }, { type: i2.Overlay }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i2.ScrollDispatcher }, { type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [MC_TOOLTIP_SCROLL_STRATEGY]
                    }] }, { type: i3.Directionality, decorators: [{
                        type: Optional
                    }] }];
    } });

let nextUniqueId = 0;
/** Change event object that is emitted when the select value has changed. */
class McSelectChange {
    constructor(source, value) {
        this.source = source;
        this.value = value;
    }
}
class McSelectSearch {
    constructor(formField) {
        this.searchChangesSubscription = new Subscription();
        this.isSearchChanged = false;
        formField.canCleanerClearByEsc = false;
    }
    focus() {
        this.input.focus();
    }
    reset() {
        this.input.ngControl.reset();
    }
    ngAfterContentInit() {
        if (!this.input) {
            throw Error('McSelectSearch does not work without mcInput');
        }
        if (!this.input.ngControl) {
            throw Error('McSelectSearch does not work without ngControl');
        }
        Promise.resolve().then(() => {
            this.searchChangesSubscription = this.input.ngControl.valueChanges.subscribe(() => {
                this.isSearchChanged = true;
            });
        });
    }
    ngOnDestroy() {
        this.searchChangesSubscription.unsubscribe();
    }
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
/** @nocollapse */ /** @nocollapse */ McSelectSearch.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSelectSearch, deps: [{ token: i1$1.McFormField }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McSelectSearch.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: McSelectSearch, selector: "[mcSelectSearch]", host: { listeners: { "keydown": "handleKeydown($event)" } }, queries: [{ propertyName: "input", first: true, predicate: McInput, descendants: true }], exportAs: ["mcSelectSearch"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSelectSearch, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcSelectSearch]',
                    exportAs: 'mcSelectSearch',
                    host: {
                        '(keydown)': 'handleKeydown($event)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1$1.McFormField }]; }, propDecorators: { input: [{
                type: ContentChild,
                args: [McInput, { static: false }]
            }] } });
class McSelectSearchEmptyResult {
}
/** @nocollapse */ /** @nocollapse */ McSelectSearchEmptyResult.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSelectSearchEmptyResult, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McSelectSearchEmptyResult.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: McSelectSearchEmptyResult, selector: "[mc-select-search-empty-result]", exportAs: ["mcSelectSearchEmptyResult"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSelectSearchEmptyResult, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mc-select-search-empty-result]',
                    exportAs: 'mcSelectSearchEmptyResult'
                }]
        }] });
class McSelectTrigger {
}
/** @nocollapse */ /** @nocollapse */ McSelectTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSelectTrigger, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McSelectTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: McSelectTrigger, selector: "mc-select-trigger", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSelectTrigger, decorators: [{
            type: Directive,
            args: [{ selector: 'mc-select-trigger' }]
        }] });
class McSelectBase {
    constructor(elementRef, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
        this.elementRef = elementRef;
        this.defaultErrorStateMatcher = defaultErrorStateMatcher;
        this.parentForm = parentForm;
        this.parentFormGroup = parentFormGroup;
        this.ngControl = ngControl;
    }
}
// tslint:disable-next-line:naming-convention
const McSelectMixinBase = mixinTabIndex(mixinDisabled(mixinErrorState(McSelectBase)));
class McSelect extends McSelectMixinBase {
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
        /** A name for this control that can be used by `mc-form-field`. */
        this.controlType = 'select';
        this.hiddenItems = 0;
        /** The cached font-size of the trigger element. */
        this.triggerFontSize = 0;
        this.previousSelectionModelSelected = [];
        /** The value of the select panel's transform-origin property. */
        this.transformOrigin = 'top';
        /** Emits when the panel element is finished transforming in. */
        this.panelDoneAnimatingStream = new Subject();
        /** Strategy that will be used to handle scrolling while the select panel is open. */
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
        this.backdropClass = 'cdk-overlay-transparent-backdrop';
        /** Combined stream of all of the child options' change events. */
        this.optionSelectionChanges = defer(() => {
            if (this.options) {
                return merge(...this.options.map((option) => option.onSelectionChange), ...this.selectionModel.selected.map((option) => option.onSelectionChange));
            }
            return this._ngZone.onStable
                .asObservable()
                .pipe(take(1), switchMap(() => this.optionSelectionChanges));
        });
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
        this._hasBackdrop = false;
        this._required = false;
        this._multiple = false;
        this._focused = false;
        this.panelOpen = false;
        this.closeSubscription = Subscription.EMPTY;
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
    get hasBackdrop() {
        return this._hasBackdrop;
    }
    set hasBackdrop(value) {
        this._hasBackdrop = coerceBooleanProperty(value);
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
    /** Value of the select control. */
    get value() {
        return this._value;
    }
    set value(newValue) {
        if (newValue !== this._value) {
            this.writeValue(newValue);
            this._value = newValue;
        }
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value || this.uid;
        this.stateChanges.next();
    }
    /** Whether the select is focused. */
    get focused() {
        return this._focused || this.panelOpen;
    }
    set focused(value) {
        this._focused = value;
    }
    get isEmptySearchResult() {
        return this.search && this.options.length === 0 && !!this.search.input.value;
    }
    get canShowCleaner() {
        return this.cleaner && this.selectionModel.hasValue();
    }
    get selected() {
        return this.multiple ? this.selectionModel.selected : this.selectionModel.selected[0];
    }
    get triggerValue() {
        if (this.empty) {
            return '';
        }
        return this.selectionModel.selected[0].viewValue;
    }
    get triggerValues() {
        if (this.empty) {
            return [];
        }
        const selectedOptions = this.selectionModel.selected;
        if (this.isRtl()) {
            selectedOptions.reverse();
        }
        return selectedOptions;
    }
    get empty() {
        return !this.selectionModel || this.selectionModel.isEmpty();
    }
    ngOnInit() {
        this.selectionModel = new SelectionModel(this.multiple);
        this.stateChanges.next();
        // We need `distinctUntilChanged` here, because some browsers will
        // fire the animation end event twice for the same animation. See:
        // https://github.com/angular/angular/issues/24084
        this.panelDoneAnimatingStream
            .pipe(distinctUntilChanged(), takeUntil(this.destroy))
            .subscribe(() => {
            if (this.panelOpen) {
                this.scrollTop = 0;
                if (this.search) {
                    this.search.focus();
                }
                this.openedChange.emit(true);
            }
            else {
                this.openedChange.emit(false);
                this._changeDetectorRef.markForCheck();
            }
        });
    }
    ngAfterContentInit() {
        if (this.mcValidation.useValidation) {
            setMosaicValidation(this);
        }
        this.initKeyManager();
        this.selectionModel.changed
            .pipe(takeUntil(this.destroy))
            .subscribe((event) => {
            event.added.forEach((option) => option.select());
            event.removed.forEach((option) => option.deselect());
        });
        this.options.changes
            .pipe(startWith(null), takeUntil(this.destroy))
            .subscribe(() => {
            this.resetOptions();
            this.initializeSelection();
        });
    }
    ngAfterViewInit() {
        this.tags.changes
            .subscribe(() => {
            setTimeout(() => this.calculateHiddenItems(), 0);
        });
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
        this.keyManager.setActiveItem(-1);
        this.propagateChanges();
    }
    resetSearch() {
        if (!this.search) {
            return;
        }
        this.search.reset();
        /*
        todo the incorrect behaviour of keyManager is possible here
        to avoid first item selection (to provide correct options flipping on closed select)
        we should process options update like it is the first options appearance
        */
        this.search.isSearchChanged = false;
    }
    /** Toggles the overlay panel open or closed. */
    toggle() {
        if (this.panelOpen) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /** Opens the overlay panel. */
    open() {
        var _a;
        if (this.disabled || !((_a = this.options) === null || _a === void 0 ? void 0 : _a.length) || this.panelOpen) {
            return;
        }
        this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
        // Note: The computed font-size will be a string pixel value (e.g. "16px").
        // `parseInt` ignores the trailing 'px' and converts this to a number.
        this.triggerFontSize = parseInt(getComputedStyle(this.trigger.nativeElement)['font-size']);
        this.panelOpen = true;
        this.keyManager.withHorizontalOrientation(null);
        this.highlightCorrectOption();
        this._changeDetectorRef.markForCheck();
        // Set the font size on the panel element once it exists.
        this._ngZone.onStable.asObservable()
            .pipe(take(1))
            .subscribe(() => {
            this.scrollActiveOptionIntoView();
            if (this.triggerFontSize && this.overlayDir.overlayRef && this.overlayDir.overlayRef.overlayElement) {
                this.overlayDir.overlayRef.overlayElement.style.fontSize = `${this.triggerFontSize}px`;
            }
        });
    }
    /** Closes the overlay panel and focuses the host element. */
    close() {
        if (!this.panelOpen) {
            return;
        }
        // the order of calls is important
        this.resetSearch();
        this.panelOpen = false;
        this.keyManager.withHorizontalOrientation(this.isRtl() ? 'rtl' : 'ltr');
        this._changeDetectorRef.markForCheck();
        this.onTouched();
    }
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param value New value to be written to the model.
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
        this._changeDetectorRef.markForCheck();
        this.stateChanges.next();
    }
    isRtl() {
        return this._dir ? this._dir.value === 'rtl' : false;
    }
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
            this._changeDetectorRef.markForCheck();
            this.stateChanges.next();
        }
    }
    /**
     * Callback that is invoked when the overlay panel has been attached.
     */
    onAttached() {
        this.overlayDir.positionChange
            .pipe(take(1))
            .subscribe(() => {
            this._changeDetectorRef.detectChanges();
            this.setOverlayPosition();
            this.optionsContainer.nativeElement.scrollTop = this.scrollTop;
            this.updateScrollSize();
        });
        this.closeSubscription = this.closingActions()
            .subscribe(() => this.close());
    }
    /** Returns the theme to be used on the panel. */
    getPanelTheme() {
        return this._parentFormField ? `mc-${this._parentFormField.color}` : '';
    }
    /** Focuses the select element. */
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
    onRemoveMatcherItem(option, $event) {
        $event.stopPropagation();
        option.deselect();
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
        this.hiddenItems = this.selected.length - visibleItems;
        if (this.hiddenItems) {
            const itemsCounter = this.trigger.nativeElement.querySelector('.mc-select__match-hidden-text');
            const matcherList = this.trigger.nativeElement.querySelector('.mc-select__match-list');
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
                this._changeDetectorRef.markForCheck();
                return;
            }
            else if (!itemsCounterShowed && (totalItemsWidth + itemsCounterWidth) > matcherWidth) {
                this.hiddenItems++;
            }
        }
        this._changeDetectorRef.markForCheck();
    }
    getItemHeight() {
        return this.options.first ? this.options.first.getHeight() : 0;
    }
    closingActions() {
        return merge(this.overlayDir.overlayRef.outsidePointerEvents()
            .pipe(filter((event) => !this.elementRef.nativeElement.contains(event.target))), this.overlayDir.overlayRef.detachments());
    }
    getHeightOfOptionsContainer() {
        return this.optionsContainer.nativeElement.getClientRects()[0].height;
    }
    updateScrollSize() {
        if (!this.options.first) {
            return;
        }
        this.keyManager.withScrollSize(Math.floor(this.getHeightOfOptionsContainer() / this.options.first.getHeight()));
    }
    getTotalItemsWidthInMatcher() {
        const triggerClone = this.trigger.nativeElement.cloneNode(true);
        triggerClone.querySelector('.mc-select__match-hidden-text').remove();
        this._renderer.setStyle(triggerClone, 'position', 'absolute');
        this._renderer.setStyle(triggerClone, 'visibility', 'hidden');
        this._renderer.setStyle(triggerClone, 'top', '-100%');
        this._renderer.setStyle(triggerClone, 'left', '0');
        this._renderer.appendChild(this.trigger.nativeElement, triggerClone);
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
    /** Handles keyboard events while the select is closed. */
    handleClosedKeydown(event) {
        /* tslint:disable-next-line */
        const keyCode = event.keyCode;
        const isArrowKey = [DOWN_ARROW, UP_ARROW, LEFT_ARROW, RIGHT_ARROW].includes(keyCode);
        const isOpenKey = [ENTER, SPACE].includes(keyCode);
        // Open the select on ALT + arrow key to match the native <select>
        if (isOpenKey || ((this.multiple || event.altKey) && isArrowKey)) {
            event.preventDefault(); // prevents the page from scrolling down when pressing space
            this.open();
        }
        else if (!this.multiple) {
            this.keyManager.onKeydown(event);
        }
    }
    /** Handles keyboard events when the selected is open. */
    handleOpenKeydown(event) {
        /* tslint:disable-next-line */
        const keyCode = event.keyCode;
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
        this.previousSelectionModelSelected = this.selectionModel.selected;
        if (this.multiple && value) {
            if (!Array.isArray(value)) {
                throw getMcSelectNonArrayValueError();
            }
            this.selectionModel.clear();
            value.forEach((currentValue) => this.selectValue(currentValue));
            this.sortValues();
        }
        else {
            this.selectionModel.clear();
            const correspondingOption = this.selectValue(value);
            // Shift focus to the active item. Note that we shouldn't do this in multiple
            // mode, because we don't know what option the user interacted with last.
            if (correspondingOption) {
                this.keyManager.setActiveItem(correspondingOption);
            }
        }
        this._changeDetectorRef.markForCheck();
    }
    getCorrespondOption(value) {
        return [
            ...this.options.toArray(),
            ...this.previousSelectionModelSelected
        ].find((option) => {
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
        });
    }
    /**
     * Finds and selects and option based on its value.
     * @returns Option that has the corresponding value.
     */
    selectValue(value) {
        const correspondingOption = this.getCorrespondOption(value);
        if (correspondingOption) {
            this.selectionModel.select(correspondingOption);
        }
        return correspondingOption;
    }
    /** Sets up a key manager to listen to keyboard events on the overlay panel. */
    initKeyManager() {
        const typeAheadDebounce = 200;
        this.keyManager = new ActiveDescendantKeyManager(this.options)
            .withTypeAhead(typeAheadDebounce, this.search ? -1 : 0)
            .withVerticalOrientation()
            .withHorizontalOrientation(this.isRtl() ? 'rtl' : 'ltr');
        this.keyManager.tabOut
            .pipe(takeUntil(this.destroy))
            .subscribe(() => {
            // Restore focus to the trigger before closing. Ensures that the focus
            // position won't be lost if the user got focus into the overlay.
            this.focus();
            this.close();
        });
        this.keyManager.change
            .pipe(takeUntil(this.destroy))
            .subscribe(() => {
            if (this.panelOpen && this.panel) {
                this.scrollActiveOptionIntoView();
            }
            else if (!this.panelOpen && !this.multiple && this.keyManager.activeItem) {
                this.keyManager.activeItem.selectViaInteraction();
            }
        });
    }
    /** Drops current option subscriptions and IDs and resets from scratch. */
    resetOptions() {
        const changedOrDestroyed = merge(this.options.changes, this.destroy);
        this.optionSelectionChanges
            .pipe(takeUntil(changedOrDestroyed))
            .subscribe((event) => {
            this.onSelect(event.source, event.isUserInput);
            if (this.search && this.search.isSearchChanged) {
                Promise.resolve().then(() => this.keyManager.updateActiveItem(0));
                this.search.isSearchChanged = false;
            }
            if (event.isUserInput && !this.multiple && this.panelOpen) {
                this.close();
                this.focus();
            }
        });
        // Listen to changes in the internal state of the options and react accordingly.
        // Handles cases like the labels of the selected options changing.
        merge(...this.options.map((option) => option.stateChanges))
            .pipe(takeUntil(changedOrDestroyed))
            .subscribe(() => {
            this._changeDetectorRef.markForCheck();
            this.stateChanges.next();
        });
    }
    /** Invoked when an option is clicked. */
    onSelect(option, isUserInput) {
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
    /** Emits change event to set the model value. */
    propagateChanges(fallbackValue) {
        let valueToEmit = null;
        if (this.multiple) {
            valueToEmit = this.selected.map((option) => option.value);
        }
        else {
            valueToEmit = this.selected ? this.selected.value : fallbackValue;
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
    /** Scrolls the active option into view. */
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
     */
    setOverlayPosition() {
        this.resetOverlay();
        const overlayRect = this.getOverlayRect();
        // Window width without scrollbar
        const windowWidth = this.getOverlayWidth();
        const isRtl = this.isRtl();
        /* tslint:disable-next-line:no-magic-numbers */
        const paddingWidth = SELECT_PANEL_PADDING_X * 2;
        let offsetX;
        let overlayMaxWidth;
        const selected = this.selectionModel.selected[0] || this.options.first;
        offsetX = selected && selected.group ? SELECT_PANEL_INDENT_PADDING_X : SELECT_PANEL_PADDING_X;
        // Invert the offset in LTR.
        if (!isRtl) {
            offsetX *= -1;
        }
        // Determine if select overflows on either side.
        const leftOverflow = 0 - (overlayRect.left + offsetX - (isRtl ? paddingWidth : 0));
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
    calculateOverlayXPosition(overlayRect, windowWidth, basicOffsetX) {
        let offsetX = basicOffsetX;
        const leftIndent = this.triggerRect.left;
        const rightIndent = windowWidth - this.triggerRect.right;
        // Setting direction of dropdown expansion
        const isRightDirection = leftIndent <= rightIndent;
        let maxDropdownWidth;
        let overlayMaxWidth;
        const triggerWidth = this.triggerRect.width + SELECT_PANEL_INDENT_PADDING_X;
        if (isRightDirection) {
            maxDropdownWidth = rightIndent + triggerWidth - SELECT_PANEL_VIEWPORT_PADDING;
            overlayMaxWidth = overlayRect.width < maxDropdownWidth ? overlayRect.width : maxDropdownWidth;
        }
        else {
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
    resetOverlay() {
        this.overlayDir.offsetX = 0;
        this.overlayDir.overlayRef.overlayElement.style.maxWidth = 'unset';
        this.overlayDir.overlayRef.updatePosition();
    }
    getOverlayRect() {
        return this.overlayDir.overlayRef.overlayElement.getBoundingClientRect();
    }
    getOverlayWidth() {
        return this.scrollStrategy._overlayRef.hostElement.clientWidth;
    }
}
/** @nocollapse */ /** @nocollapse */ McSelect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSelect, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i0.Renderer2 }, { token: i1.ErrorStateMatcher }, { token: i0.ElementRef }, { token: NG_VALIDATORS, optional: true }, { token: i3.Directionality, optional: true }, { token: i4.NgForm, optional: true }, { token: i4.FormGroupDirective, optional: true }, { token: i1$1.McFormField, optional: true }, { token: i4.NgControl, optional: true, self: true }, { token: i4.NgModel, optional: true, self: true }, { token: i4.FormControlName, optional: true, self: true }, { token: MC_SELECT_SCROLL_STRATEGY }, { token: MC_VALIDATION, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McSelect.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McSelect, selector: "mc-select", inputs: { disabled: "disabled", tabIndex: "tabIndex", hiddenItemsText: "hiddenItemsText", panelClass: "panelClass", backdropClass: "backdropClass", errorStateMatcher: "errorStateMatcher", sortComparator: "sortComparator", hasBackdrop: "hasBackdrop", placeholder: "placeholder", required: "required", multiple: "multiple", compareWith: "compareWith", value: "value", id: "id", hiddenItemsTextFormatter: "hiddenItemsTextFormatter" }, outputs: { openedChange: "openedChange", openedStream: "opened", closedStream: "closed", selectionChange: "selectionChange", valueChange: "valueChange" }, host: { listeners: { "keydown": "handleKeydown($event)", "focus": "onFocus()", "blur": "onBlur()", "window:resize": "calculateHiddenItems()" }, properties: { "attr.id": "id", "attr.tabindex": "tabIndex", "attr.disabled": "disabled || null", "class.mc-disabled": "disabled", "class.mc-invalid": "errorState" }, classAttribute: "mc-select" }, providers: [
        { provide: McFormFieldControl, useExisting: McSelect },
        { provide: MC_OPTION_PARENT_COMPONENT, useExisting: McSelect }
    ], queries: [{ propertyName: "customTrigger", first: true, predicate: McSelectTrigger, descendants: true }, { propertyName: "cleaner", first: true, predicate: ["mcSelectCleaner"], descendants: true, static: true }, { propertyName: "search", first: true, predicate: McSelectSearch, descendants: true }, { propertyName: "options", predicate: McOption, descendants: true }, { propertyName: "optionGroups", predicate: McOptgroup }], viewQueries: [{ propertyName: "trigger", first: true, predicate: ["trigger"], descendants: true }, { propertyName: "panel", first: true, predicate: ["panel"], descendants: true }, { propertyName: "optionsContainer", first: true, predicate: ["optionsContainer"], descendants: true }, { propertyName: "overlayDir", first: true, predicate: CdkConnectedOverlay, descendants: true }, { propertyName: "tags", predicate: McTag, descendants: true }], exportAs: ["mcSelect"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div cdk-overlay-origin\n     class=\"mc-select__trigger\"\n     (click)=\"toggle()\"\n     [class.mc-select__trigger_multiple]=\"multiple\"\n     #origin=\"cdkOverlayOrigin\"\n     #trigger>\n    <div class=\"mc-select__matcher\" [ngSwitch]=\"empty\">\n        <span class=\"mc-select__placeholder\" *ngSwitchCase=\"true\">{{ placeholder || '\\u00A0' }}</span>\n        <span *ngSwitchCase=\"false\" [ngSwitch]=\"!!customTrigger\">\n            <div *ngSwitchDefault [ngSwitch]=\"multiple\" class=\"mc-select__match-container\">\n                <span *ngSwitchCase=\"false\" class=\"mc-select__matcher-text\">{{ triggerValue }}</span>\n                <div *ngSwitchCase=\"true\" class=\"mc-select__match-list\">\n                    <mc-tag *ngFor=\"let option of triggerValues\"\n                            [disabled]=\"option.disabled || disabled\"\n                            [selectable]=\"false\"\n                            [class.mc-error]=\"errorState\">\n                        {{ option.viewValue }}\n                        <i mc-icon=\"mc-close-S_16\"\n                           *ngIf=\"!option.disabled && !disabled\"\n                           (click)=\"onRemoveMatcherItem(option, $event)\">\n                        </i>\n                    </mc-tag>\n                </div>\n                <div class=\"mc-select__match-hidden-text\" [style.display]=\"hiddenItems > 0 ? 'block' : 'none'\">\n                    {{ hiddenItemsTextFormatter(hiddenItemsText, hiddenItems) }}\n                </div>\n            </div>\n            <ng-content select=\"mc-select-trigger\" *ngSwitchCase=\"true\"></ng-content>\n        </span>\n    </div>\n\n    <div class=\"mc-select__cleaner\" *ngIf=\"canShowCleaner\" (click)=\"clearValue($event)\">\n        <ng-content select=\"mc-cleaner\"></ng-content>\n    </div>\n\n    <div class=\"mc-select__arrow-wrapper\">\n        <i class=\"mc-select__arrow\" mc-icon=\"mc-angle-down-L_16\"></i>\n    </div>\n</div>\n\n<ng-template\n    cdk-connected-overlay\n    cdkConnectedOverlayLockPosition\n    [cdkConnectedOverlayHasBackdrop]=\"hasBackdrop\"\n    [cdkConnectedOverlayBackdropClass]=\"backdropClass\"\n    [cdkConnectedOverlayScrollStrategy]=\"scrollStrategy\"\n    [cdkConnectedOverlayOrigin]=\"origin\"\n    [cdkConnectedOverlayOpen]=\"panelOpen\"\n    [cdkConnectedOverlayPositions]=\"positions\"\n    [cdkConnectedOverlayMinWidth]=\"triggerRect?.width!\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    (backdropClick)=\"close()\"\n    (attach)=\"onAttached()\"\n    (detach)=\"close()\">\n    <div\n        #panel\n        class=\"mc-select__panel {{ getPanelTheme() }}\"\n        [ngClass]=\"panelClass\"\n        [style.transformOrigin]=\"transformOrigin\"\n        [style.font-size.px]=\"triggerFontSize\"\n        (keydown)=\"handleKeydown($event)\">\n\n        <div *ngIf=\"search\" class=\"mc-select__search-container\">\n            <ng-content select=\"[mcSelectSearch]\"></ng-content>\n        </div>\n\n        <div #optionsContainer\n             class=\"mc-select__content\"\n             [@fadeInContent]=\"'showing'\"\n             (@fadeInContent.done)=\"panelDoneAnimatingStream.next($event.toState)\">\n\n            <div *ngIf=\"isEmptySearchResult\" class=\"mc-select__no-options-message\">\n                <ng-content select=\"[mc-select-search-empty-result]\"></ng-content>\n            </div>\n            <ng-content></ng-content>\n        </div>\n    </div>\n</ng-template>\n", styles: [".mc-option{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;position:relative;max-width:100%;height:var(--mc-option-size-height, 32px);border:var(--mc-option-size-border-width, 2px) solid transparent;cursor:pointer;outline:none;padding-left:var(--mc-option-size-horizontal-padding, 16px);padding-right:var(--mc-option-size-horizontal-padding, 16px);-webkit-tap-highlight-color:transparent}.mc-option.mc-disabled{cursor:default}.mc-option .mc-pseudo-checkbox{margin-right:8px}.mc-option .mc-option-overlay{position:absolute;top:calc(-1 * var(--mc-option-size-border-width, 2px));left:calc(-1 * var(--mc-option-size-border-width, 2px));right:calc(-1 * var(--mc-option-size-border-width, 2px));bottom:calc(-1 * var(--mc-option-size-border-width, 2px));pointer-events:none;border-radius:inherit}.mc-option-text{display:inline-block;flex-grow:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.mc-select{box-sizing:border-box;display:inline-block;width:100%;outline:none}.mc-select .mc-select__trigger{display:flex;box-sizing:border-box;position:relative;height:var(--mc-select-size-height, 30px);cursor:pointer;padding-left:calc(var(--mc-select-size-left-padding, 16px) - var(--mc-form-field-size-border-width, 1px));padding-right:calc(var(--mc-select-size-right-padding, 8px) - var(--mc-form-field-size-border-width, 1px))}.mc-select .mc-select__trigger.mc-select__trigger_multiple{padding-left:calc(var(--mc-select-size-left-padding-multiple, 8px) - var(--mc-form-field-size-border-width, 1px))}.mc-select .mc-select__trigger.mc-select__trigger_multiple .mc-tag.mc-disabled .mc-tag__text{margin-right:7px}.mc-select.mc-disabled .mc-select__trigger{-webkit-user-select:none;user-select:none;cursor:default}.mc-select__no-options-message{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;position:relative;max-width:100%;height:var(--mc-option-size-height, 32px);cursor:default;outline:none;padding-left:var(--mc-option-size-horizontal-padding, 16px);padding-right:var(--mc-option-size-horizontal-padding, 16px)}.mc-select__matcher{display:flex;align-items:center;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mc-select__matcher>span{width:100%}.mc-select__match-list{display:flex;flex-wrap:wrap;overflow:hidden;max-height:calc(var(--mc-select-size-height, 30px) - var(--mc-select-panel-size-border-width, 1px))}.mc-select__match-list .mc-tag{margin-right:4px}.mc-select__match-container{display:flex;flex-direction:row;justify-content:space-between;width:100%}.mc-select__match-container .mc-select__match-hidden-text{flex:0 0 70px;align-self:center;padding:0 8px;text-align:right}.mc-select__arrow-wrapper{align-self:center}.mc-form-field-appearance-fill .mc-select__arrow-wrapper,.mc-form-field-appearance-standard .mc-select__arrow-wrapper{transform:translateY(-50%)}.mc-form-field-appearance-outline .mc-select__arrow-wrapper{transform:translateY(-25%)}.mc-select__panel{min-width:100%;max-width:var(--mc-select-panel-size-max-width, 640px);overflow:hidden;border-width:var(--mc-select-panel-size-border-width, 1px);border-style:solid;border-bottom-left-radius:var(--mc-select-panel-size-border-radius, 3px);border-bottom-right-radius:var(--mc-select-panel-size-border-radius, 3px)}.mc-select__panel .mc-optgroup-label,.mc-select__panel .mc-option{font-size:inherit;line-height:var(--mc-option-size-height, 32px);height:var(--mc-option-size-height, 32px)}.mc-select__content{max-height:var(--mc-select-panel-size-max-height, 232px);padding:var(--mc-select-panel-size-vertical-padding, 4px) 0;overflow:auto}.mc-select__content .cdk-virtual-scroll-viewport{min-height:var(--mc-select-panel-size-max-height, 232px)-8px;max-height:var(--mc-select-panel-size-max-height, 232px)-8px}.mc-form-field-type-select:not(.mc-disabled) .mc-form-field-flex{cursor:pointer}.mc-select__search-container{border-bottom-width:1px;border-bottom-style:solid}\n"], components: [{ type: i5.McTag, selector: "mc-tag, [mc-tag], mc-basic-tag, [mc-basic-tag]", inputs: ["color", "selected", "value", "selectable", "removable", "disabled"], outputs: ["selectionChange", "destroyed", "removed"], exportAs: ["mcTag"] }, { type: i6.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }, { type: i8.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i8.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i8.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.McIconCSSStyler, selector: "[mc-icon]" }, { type: i2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { type: i8.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], animations: [
        mcSelectAnimations.transformPanel,
        mcSelectAnimations.fadeInContent
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSelect, decorators: [{
            type: Component,
            args: [{ selector: 'mc-select', exportAs: 'mcSelect', inputs: ['disabled', 'tabIndex'], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
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
                    }, animations: [
                        mcSelectAnimations.transformPanel,
                        mcSelectAnimations.fadeInContent
                    ], providers: [
                        { provide: McFormFieldControl, useExisting: McSelect },
                        { provide: MC_OPTION_PARENT_COMPONENT, useExisting: McSelect }
                    ], template: "<div cdk-overlay-origin\n     class=\"mc-select__trigger\"\n     (click)=\"toggle()\"\n     [class.mc-select__trigger_multiple]=\"multiple\"\n     #origin=\"cdkOverlayOrigin\"\n     #trigger>\n    <div class=\"mc-select__matcher\" [ngSwitch]=\"empty\">\n        <span class=\"mc-select__placeholder\" *ngSwitchCase=\"true\">{{ placeholder || '\\u00A0' }}</span>\n        <span *ngSwitchCase=\"false\" [ngSwitch]=\"!!customTrigger\">\n            <div *ngSwitchDefault [ngSwitch]=\"multiple\" class=\"mc-select__match-container\">\n                <span *ngSwitchCase=\"false\" class=\"mc-select__matcher-text\">{{ triggerValue }}</span>\n                <div *ngSwitchCase=\"true\" class=\"mc-select__match-list\">\n                    <mc-tag *ngFor=\"let option of triggerValues\"\n                            [disabled]=\"option.disabled || disabled\"\n                            [selectable]=\"false\"\n                            [class.mc-error]=\"errorState\">\n                        {{ option.viewValue }}\n                        <i mc-icon=\"mc-close-S_16\"\n                           *ngIf=\"!option.disabled && !disabled\"\n                           (click)=\"onRemoveMatcherItem(option, $event)\">\n                        </i>\n                    </mc-tag>\n                </div>\n                <div class=\"mc-select__match-hidden-text\" [style.display]=\"hiddenItems > 0 ? 'block' : 'none'\">\n                    {{ hiddenItemsTextFormatter(hiddenItemsText, hiddenItems) }}\n                </div>\n            </div>\n            <ng-content select=\"mc-select-trigger\" *ngSwitchCase=\"true\"></ng-content>\n        </span>\n    </div>\n\n    <div class=\"mc-select__cleaner\" *ngIf=\"canShowCleaner\" (click)=\"clearValue($event)\">\n        <ng-content select=\"mc-cleaner\"></ng-content>\n    </div>\n\n    <div class=\"mc-select__arrow-wrapper\">\n        <i class=\"mc-select__arrow\" mc-icon=\"mc-angle-down-L_16\"></i>\n    </div>\n</div>\n\n<ng-template\n    cdk-connected-overlay\n    cdkConnectedOverlayLockPosition\n    [cdkConnectedOverlayHasBackdrop]=\"hasBackdrop\"\n    [cdkConnectedOverlayBackdropClass]=\"backdropClass\"\n    [cdkConnectedOverlayScrollStrategy]=\"scrollStrategy\"\n    [cdkConnectedOverlayOrigin]=\"origin\"\n    [cdkConnectedOverlayOpen]=\"panelOpen\"\n    [cdkConnectedOverlayPositions]=\"positions\"\n    [cdkConnectedOverlayMinWidth]=\"triggerRect?.width!\"\n    [cdkConnectedOverlayOffsetY]=\"offsetY\"\n    (backdropClick)=\"close()\"\n    (attach)=\"onAttached()\"\n    (detach)=\"close()\">\n    <div\n        #panel\n        class=\"mc-select__panel {{ getPanelTheme() }}\"\n        [ngClass]=\"panelClass\"\n        [style.transformOrigin]=\"transformOrigin\"\n        [style.font-size.px]=\"triggerFontSize\"\n        (keydown)=\"handleKeydown($event)\">\n\n        <div *ngIf=\"search\" class=\"mc-select__search-container\">\n            <ng-content select=\"[mcSelectSearch]\"></ng-content>\n        </div>\n\n        <div #optionsContainer\n             class=\"mc-select__content\"\n             [@fadeInContent]=\"'showing'\"\n             (@fadeInContent.done)=\"panelDoneAnimatingStream.next($event.toState)\">\n\n            <div *ngIf=\"isEmptySearchResult\" class=\"mc-select__no-options-message\">\n                <ng-content select=\"[mc-select-search-empty-result]\"></ng-content>\n            </div>\n            <ng-content></ng-content>\n        </div>\n    </div>\n</ng-template>\n", styles: [".mc-option{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;position:relative;max-width:100%;height:var(--mc-option-size-height, 32px);border:var(--mc-option-size-border-width, 2px) solid transparent;cursor:pointer;outline:none;padding-left:var(--mc-option-size-horizontal-padding, 16px);padding-right:var(--mc-option-size-horizontal-padding, 16px);-webkit-tap-highlight-color:transparent}.mc-option.mc-disabled{cursor:default}.mc-option .mc-pseudo-checkbox{margin-right:8px}.mc-option .mc-option-overlay{position:absolute;top:calc(-1 * var(--mc-option-size-border-width, 2px));left:calc(-1 * var(--mc-option-size-border-width, 2px));right:calc(-1 * var(--mc-option-size-border-width, 2px));bottom:calc(-1 * var(--mc-option-size-border-width, 2px));pointer-events:none;border-radius:inherit}.mc-option-text{display:inline-block;flex-grow:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.mc-select{box-sizing:border-box;display:inline-block;width:100%;outline:none}.mc-select .mc-select__trigger{display:flex;box-sizing:border-box;position:relative;height:var(--mc-select-size-height, 30px);cursor:pointer;padding-left:calc(var(--mc-select-size-left-padding, 16px) - var(--mc-form-field-size-border-width, 1px));padding-right:calc(var(--mc-select-size-right-padding, 8px) - var(--mc-form-field-size-border-width, 1px))}.mc-select .mc-select__trigger.mc-select__trigger_multiple{padding-left:calc(var(--mc-select-size-left-padding-multiple, 8px) - var(--mc-form-field-size-border-width, 1px))}.mc-select .mc-select__trigger.mc-select__trigger_multiple .mc-tag.mc-disabled .mc-tag__text{margin-right:7px}.mc-select.mc-disabled .mc-select__trigger{-webkit-user-select:none;user-select:none;cursor:default}.mc-select__no-options-message{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;position:relative;max-width:100%;height:var(--mc-option-size-height, 32px);cursor:default;outline:none;padding-left:var(--mc-option-size-horizontal-padding, 16px);padding-right:var(--mc-option-size-horizontal-padding, 16px)}.mc-select__matcher{display:flex;align-items:center;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mc-select__matcher>span{width:100%}.mc-select__match-list{display:flex;flex-wrap:wrap;overflow:hidden;max-height:calc(var(--mc-select-size-height, 30px) - var(--mc-select-panel-size-border-width, 1px))}.mc-select__match-list .mc-tag{margin-right:4px}.mc-select__match-container{display:flex;flex-direction:row;justify-content:space-between;width:100%}.mc-select__match-container .mc-select__match-hidden-text{flex:0 0 70px;align-self:center;padding:0 8px;text-align:right}.mc-select__arrow-wrapper{align-self:center}.mc-form-field-appearance-fill .mc-select__arrow-wrapper,.mc-form-field-appearance-standard .mc-select__arrow-wrapper{transform:translateY(-50%)}.mc-form-field-appearance-outline .mc-select__arrow-wrapper{transform:translateY(-25%)}.mc-select__panel{min-width:100%;max-width:var(--mc-select-panel-size-max-width, 640px);overflow:hidden;border-width:var(--mc-select-panel-size-border-width, 1px);border-style:solid;border-bottom-left-radius:var(--mc-select-panel-size-border-radius, 3px);border-bottom-right-radius:var(--mc-select-panel-size-border-radius, 3px)}.mc-select__panel .mc-optgroup-label,.mc-select__panel .mc-option{font-size:inherit;line-height:var(--mc-option-size-height, 32px);height:var(--mc-option-size-height, 32px)}.mc-select__content{max-height:var(--mc-select-panel-size-max-height, 232px);padding:var(--mc-select-panel-size-vertical-padding, 4px) 0;overflow:auto}.mc-select__content .cdk-virtual-scroll-viewport{min-height:var(--mc-select-panel-size-max-height, 232px)-8px;max-height:var(--mc-select-panel-size-max-height, 232px)-8px}.mc-form-field-type-select:not(.mc-disabled) .mc-form-field-flex{cursor:pointer}.mc-select__search-container{border-bottom-width:1px;border-bottom-style:solid}\n"] }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i0.Renderer2 }, { type: i1.ErrorStateMatcher }, { type: i0.ElementRef }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [NG_VALIDATORS]
                    }] }, { type: i3.Directionality, decorators: [{
                        type: Optional
                    }] }, { type: i4.NgForm, decorators: [{
                        type: Optional
                    }] }, { type: i4.FormGroupDirective, decorators: [{
                        type: Optional
                    }] }, { type: i1$1.McFormField, decorators: [{
                        type: Optional
                    }] }, { type: i4.NgControl, decorators: [{
                        type: Self
                    }, {
                        type: Optional
                    }] }, { type: i4.NgModel, decorators: [{
                        type: Optional
                    }, {
                        type: Self
                    }] }, { type: i4.FormControlName, decorators: [{
                        type: Optional
                    }, {
                        type: Self
                    }] }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [MC_SELECT_SCROLL_STRATEGY]
                    }] }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [MC_VALIDATION]
                    }] }];
    }, propDecorators: { trigger: [{
                type: ViewChild,
                args: ['trigger', { static: false }]
            }], panel: [{
                type: ViewChild,
                args: ['panel', { static: false }]
            }], optionsContainer: [{
                type: ViewChild,
                args: ['optionsContainer', { static: false }]
            }], overlayDir: [{
                type: ViewChild,
                args: [CdkConnectedOverlay, { static: false }]
            }], tags: [{
                type: ViewChildren,
                args: [McTag]
            }], customTrigger: [{
                type: ContentChild,
                args: [McSelectTrigger, { static: false }]
            }], cleaner: [{
                type: ContentChild,
                args: ['mcSelectCleaner', { static: true }]
            }], options: [{
                type: ContentChildren,
                args: [McOption, { descendants: true }]
            }], optionGroups: [{
                type: ContentChildren,
                args: [McOptgroup]
            }], search: [{
                type: ContentChild,
                args: [McSelectSearch, { static: false }]
            }], hiddenItemsText: [{
                type: Input
            }], panelClass: [{
                type: Input
            }], backdropClass: [{
                type: Input
            }], errorStateMatcher: [{
                type: Input
            }], sortComparator: [{
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
            }], hasBackdrop: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], required: [{
                type: Input
            }], multiple: [{
                type: Input
            }], compareWith: [{
                type: Input
            }], value: [{
                type: Input
            }], id: [{
                type: Input
            }], hiddenItemsTextFormatter: [{
                type: Input
            }] } });

class McSelectModule {
}
/** @nocollapse */ /** @nocollapse */ McSelectModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McSelectModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSelectModule, declarations: [McSelect,
        McSelectSearch,
        McSelectSearchEmptyResult,
        McSelectTrigger,
        McOptionTooltip], imports: [CommonModule,
        OverlayModule,
        McOptionModule,
        McIconModule,
        McTagsModule,
        McToolTipModule], exports: [McFormFieldModule,
        McSelect,
        McSelectSearch,
        McSelectSearchEmptyResult,
        McSelectTrigger,
        McOptionTooltip,
        McOptionModule,
        CommonModule] });
/** @nocollapse */ /** @nocollapse */ McSelectModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSelectModule, providers: [MC_SELECT_SCROLL_STRATEGY_PROVIDER], imports: [[
            CommonModule,
            OverlayModule,
            McOptionModule,
            McIconModule,
            McTagsModule,
            McToolTipModule
        ], McFormFieldModule,
        McOptionModule,
        CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        McOptionModule,
                        McIconModule,
                        McTagsModule,
                        McToolTipModule
                    ],
                    exports: [
                        McFormFieldModule,
                        McSelect,
                        McSelectSearch,
                        McSelectSearchEmptyResult,
                        McSelectTrigger,
                        McOptionTooltip,
                        McOptionModule,
                        CommonModule
                    ],
                    declarations: [
                        McSelect,
                        McSelectSearch,
                        McSelectSearchEmptyResult,
                        McSelectTrigger,
                        McOptionTooltip
                    ],
                    providers: [MC_SELECT_SCROLL_STRATEGY_PROVIDER]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { McOptionTooltip, McSelect, McSelectBase, McSelectChange, McSelectModule, McSelectSearch, McSelectSearchEmptyResult, McSelectTrigger };
//# sourceMappingURL=ptsecurity-mosaic-select.mjs.map
