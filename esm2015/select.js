/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { animate, state, style, transition, trigger, query, animateChild, group } from '@angular/animations';
import { __decorate, __metadata, __param } from 'tslib';
import { ActiveDescendantKeyManager } from '@ptsecurity/cdk/a11y';
import { Directionality } from '@ptsecurity/cdk/bidi';
import { coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { SelectionModel } from '@ptsecurity/cdk/collections';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW, A } from '@ptsecurity/cdk/keycodes';
import { CdkConnectedOverlay, Overlay, ViewportRuler, OverlayModule } from '@ptsecurity/cdk/overlay';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, Inject, InjectionToken, Input, isDevMode, NgZone, Optional, Output, QueryList, Renderer2, Self, ViewChild, ViewChildren, ViewEncapsulation, NgModule } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { _countGroupLabelsBeforeOption, _getOptionScrollPosition, ErrorStateMatcher, MC_OPTION_PARENT_COMPONENT, McOptgroup, McOption, mixinDisabled, mixinErrorState, mixinTabIndex, McOptionModule } from '@ptsecurity/mosaic/core';
import { McFormField, McFormFieldControl, McFormFieldModule } from '@ptsecurity/mosaic/form-field';
import { McTag, McTagModule } from '@ptsecurity/mosaic/tag';
import { defer, merge, Observable, Subject } from 'rxjs';
import { filter, map, startWith, switchMap, take, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { McIconModule } from '@ptsecurity/mosaic/icon';

/**
 * Returns an exception to be thrown when attempting to change a select's `multiple` option
 * after initialization.
 * @docs-private
 */
function getMcSelectDynamicMultipleError() {
    return Error('Cannot change `multiple` mode of select after initialization.');
}
/**
 * Returns an exception to be thrown when attempting to assign a non-array value to a select
 * in `multiple` mode. Note that `undefined` and `null` are still valid values to allow for
 * resetting the value.
 * @docs-private
 */
function getMcSelectNonArrayValueError() {
    return Error('Value must be an array in multiple-selection mode.');
}
/**
 * Returns an exception to be thrown when assigning a non-function value to the comparator
 * used to determine if a value corresponds to an option. Note that whether the function
 * actually takes two values and returns a boolean is not checked.
 */
function getMcSelectNonFunctionValueError() {
    return Error('`compareWith` must be a function.');
}

/**
 * The following are all the animations for the mat-select component, with each
 * const containing the metadata for one animation.
 *
 * The values below match the implementation of the AngularJS Material mat-select animation.
 */
const mcSelectAnimations = {
    /**
     * This animation transforms the select's overlay panel on and off the page.
     *
     * When the panel is attached to the DOM, it expands its width by the amount of padding, scales it
     * up to 100% on the Y axis, fades in its border, and translates slightly up and to the
     * side to ensure the option text correctly overlaps the trigger text.
     *
     * When the panel is removed from the DOM, it simply fades out linearly.
     */
    transformPanel: trigger('transformPanel', [
        state('void', style({
            transform: 'scaleY(0)',
            minWidth: '100%',
            opacity: 0
        })),
        transition('void => *', group([
            query('@fadeInContent', animateChild()),
            animate('150ms cubic-bezier(0.25, 0.8, 0.25, 1)')
        ])),
        transition('* => void', [
            animate('250ms 100ms linear', style({ opacity: 0 }))
        ])
    ]),
    /**
     * This animation fades in the background color and text content of the
     * select's options. It is time delayed to occur 100ms after the overlay
     * panel has transformed in.
     */
    fadeInContent: trigger('fadeInContent', [
        state('showing', style({ opacity: 1 })),
        transition('void => showing', [
            style({ opacity: 0 }),
            animate('150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)')
        ])
    ])
};

/* tslint:disable:no-empty */
var McSelect_1;
let nextUniqueId = 0;
/**
 * The following style constants are necessary to save here in order
 * to properly calculate the alignment of the selected option over
 * the trigger element.
 */
/** The max height of the select's overlay panel */
const SELECT_PANEL_MAX_HEIGHT = 224;
/** The panel's padding on the x-axis */
const SELECT_PANEL_PADDING_X = 1;
/** The panel's x axis padding if it is indented (e.g. there is an option group). */
/* tslint:disable-next-line:no-magic-numbers */
const SELECT_PANEL_INDENT_PADDING_X = SELECT_PANEL_PADDING_X * 2;
/** The height of the select items in `em` units. */
const SELECT_ITEM_HEIGHT_EM = 2;
/**
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
 */
const SELECT_PANEL_VIEWPORT_PADDING = 8;
/** Injection token that determines the scroll handling while a select is open. */
const MC_SELECT_SCROLL_STRATEGY = new InjectionToken('mc-select-scroll-strategy');
/** @docs-private */
function MC_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return () => overlay.scrollStrategies.reposition();
}
/** @docs-private */
const MC_SELECT_SCROLL_STRATEGY_PROVIDER = {
    provide: MC_SELECT_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MC_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY
};
/** Change event object that is emitted when the select value has changed. */
class McSelectChange {
    constructor(
    /** Reference to the select that emitted the change event. */
    source, 
    /** Current value of the select that emitted the event. */
    value) {
        this.source = source;
        this.value = value;
    }
}
// Boilerplate for applying mixins to McSelect.
/** @docs-private */
class McSelectBase {
    constructor(_elementRef, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) {
        this._elementRef = _elementRef;
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
}
const _McSelectMixinBase = mixinTabIndex(mixinDisabled(mixinErrorState(McSelectBase)));
/**
 * Allows the user to customize the trigger that is displayed when the select has a value.
 */
let McSelectTrigger = class McSelectTrigger {
};
McSelectTrigger = __decorate([
    Directive({ selector: 'mc-select-trigger' })
], McSelectTrigger);
let McSelect = McSelect_1 = class McSelect extends _McSelectMixinBase {
    constructor(_viewportRuler, _changeDetectorRef, _ngZone, _renderer, _defaultErrorStateMatcher, elementRef, _dir, _parentForm, _parentFormGroup, _parentFormField, ngControl, tabIndex, _scrollStrategyFactory) {
        super(elementRef, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
        this._viewportRuler = _viewportRuler;
        this._changeDetectorRef = _changeDetectorRef;
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._dir = _dir;
        this._parentFormField = _parentFormField;
        this.ngControl = ngControl;
        this._scrollStrategyFactory = _scrollStrategyFactory;
        /** The cached font-size of the trigger element. */
        this._triggerFontSize = 0;
        /** The IDs of child options to be passed to the aria-owns attribute. */
        this._optionIds = '';
        /** The value of the select panel's transform-origin property. */
        this._transformOrigin = 'top';
        /** Whether the panel's animation is done. */
        this._panelDoneAnimating = false;
        /** Emits when the panel element is finished transforming in. */
        this._panelDoneAnimatingStream = new Subject();
        /** Strategy that will be used to handle scrolling while the select panel is open. */
        this._scrollStrategy = this._scrollStrategyFactory();
        /**
         * The y-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text.
         * when the panel opens. Will change based on the y-position of the selected option.
         */
        this._offsetY = 0;
        /**
         * This position config ensures that the top "start" corner of the overlay
         * is aligned with with the top "start" of the origin by default (overlapping
         * the trigger completely). If the panel cannot fit below the trigger, it
         * will fall back to a position above the trigger.
         */
        this._positions = [
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
        /** A name for this control that can be used by `mc-form-field`. */
        this.controlType = 'mc-select';
        /** Combined stream of all of the child options' change events. */
        this.optionSelectionChanges = defer(() => {
            if (this.options) {
                return merge(...this.options.map((option) => option.onSelectionChange));
            }
            return this._ngZone.onStable
                .asObservable()
                .pipe(take(1), switchMap(() => this.optionSelectionChanges));
        });
        /** Event emitted when the select panel has been toggled. */
        this.openedChange = new EventEmitter();
        /** Event emitted when the select has been opened. */
        this._openedStream = this.openedChange.pipe(filter((o) => o), map(() => { }));
        /** Event emitted when the select has been closed. */
        this._closedStream = this.openedChange.pipe(filter((o) => !o), map(() => { }));
        /** Event emitted when the selected value has been changed by the user. */
        this.selectionChange = new EventEmitter();
        /**
         * Event that emits whenever the raw value of the select changes. This is here primarily
         * to facilitate the two-way binding for the `value` input.
         * @docs-private
         */
        this.valueChange = new EventEmitter();
        this.hiddenItems = 0;
        this.oneMoreText = '...ещё';
        /** Whether or not the overlay panel is open. */
        this._panelOpen = false;
        /** Whether filling out the select is required in the form. */
        this._required = false;
        /** The scroll position of the overlay panel, calculated to center the selected option. */
        this._scrollTop = 0;
        /** Whether the component is in multiple selection mode. */
        this._multiple = false;
        /** Unique id for this input. */
        this._uid = `mc-select-${nextUniqueId++}`;
        /** Emits whenever the component is destroyed. */
        this._destroy = new Subject();
        this._focused = false;
        /** `View -> model callback called when value changes` */
        this._onChange = () => { };
        /** `View -> model callback called when select has been touched` */
        this._onTouched = () => { };
        /** Comparison function to specify which option is displayed. Defaults to object equality. */
        this._compareWith = (o1, o2) => o1 === o2;
        if (this.ngControl) {
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }
        this.tabIndex = parseInt(tabIndex) || 0;
        // Force setter to be called in case id was not specified.
        this.id = this.id;
    }
    /** Whether the select is focused. */
    get focused() {
        return this._focused || this._panelOpen;
    }
    /**
     * @deprecated Setter to be removed as this property is intended to be readonly.
     * @breaking-change 8.0.0
     */
    set focused(value) {
        this._focused = value;
    }
    /** Placeholder to be shown if no value has been selected. */
    get placeholder() {
        return this._placeholder;
    }
    set placeholder(value) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    /** Whether the component is required. */
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    /** Whether the user should be allowed to select multiple options. */
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        if (this._selectionModel) {
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
        if (this._selectionModel) {
            // A different comparator means the selection could change.
            this._initializeSelection();
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
        this._id = value || this._uid;
        this.stateChanges.next();
    }
    ngOnInit() {
        this._selectionModel = new SelectionModel(this.multiple);
        this.stateChanges.next();
        // We need `distinctUntilChanged` here, because some browsers will
        // fire the animation end event twice for the same animation. See:
        // https://github.com/angular/angular/issues/24084
        this._panelDoneAnimatingStream
            .pipe(distinctUntilChanged(), takeUntil(this._destroy))
            .subscribe(() => {
            if (this.panelOpen) {
                this._scrollTop = 0;
                this.openedChange.emit(true);
            }
            else {
                this.openedChange.emit(false);
                this._panelDoneAnimating = false;
                this.overlayDir.offsetX = 0;
                this._changeDetectorRef.markForCheck();
            }
        });
    }
    ngAfterContentInit() {
        this._initKeyManager();
        this._selectionModel.onChange
            .pipe(takeUntil(this._destroy))
            .subscribe((event) => {
            event.added.forEach((option) => option.select());
            event.removed.forEach((option) => option.deselect());
        });
        this.options.changes
            .pipe(startWith(null), takeUntil(this._destroy))
            .subscribe(() => {
            this._resetOptions();
            this._initializeSelection();
        });
    }
    ngAfterViewInit() {
        this.tags.changes
            .subscribe(() => {
            setTimeout(() => this._calculateHiddenItems(), 0);
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
        this._destroy.next();
        this._destroy.complete();
        this.stateChanges.complete();
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
        if (this.disabled || !this.options || !this.options.length || this._panelOpen) {
            return;
        }
        this._triggerRect = this.trigger.nativeElement.getBoundingClientRect();
        // Note: The computed font-size will be a string pixel value (e.g. "16px").
        // `parseInt` ignores the trailing 'px' and converts this to a number.
        this._triggerFontSize = parseInt(getComputedStyle(this.trigger.nativeElement)['font-size']);
        this._panelOpen = true;
        this._keyManager.withHorizontalOrientation(null);
        this._calculateOverlayPosition();
        this._highlightCorrectOption();
        this._changeDetectorRef.markForCheck();
        // Set the font size on the panel element once it exists.
        this._ngZone.onStable.asObservable()
            .pipe(take(1))
            .subscribe(() => {
            if (this._triggerFontSize && this.overlayDir.overlayRef &&
                this.overlayDir.overlayRef.overlayElement) {
                this.overlayDir.overlayRef.overlayElement.style.fontSize = `${this._triggerFontSize}px`;
            }
        });
    }
    /** Closes the overlay panel and focuses the host element. */
    close() {
        if (this._panelOpen) {
            this._panelOpen = false;
            this._keyManager.withHorizontalOrientation(this._isRtl() ? 'rtl' : 'ltr');
            this._changeDetectorRef.markForCheck();
            this._onTouched();
        }
    }
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param value New value to be written to the model.
     */
    writeValue(value) {
        if (this.options) {
            this._setSelectionByValue(value);
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
        this._onChange = fn;
    }
    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the component has been touched.
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
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
    get panelOpen() {
        return this._panelOpen;
    }
    get selected() {
        return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
    }
    get triggerValue() {
        if (this.empty) {
            return '';
        }
        if (this._multiple) {
            const selectedOptions = this._selectionModel.selected.map((option) => option.viewValue);
            if (this._isRtl()) {
                selectedOptions.reverse();
            }
            return selectedOptions.join(', ');
        }
        return this._selectionModel.selected[0].viewValue;
    }
    get triggerValues() {
        if (this.empty) {
            return [];
        }
        if (this._multiple) {
            const selectedOptions = this._selectionModel.selected;
            if (this._isRtl()) {
                selectedOptions.reverse();
            }
            return selectedOptions;
        }
        return [this._selectionModel.selected[0]];
    }
    get empty() {
        return !this._selectionModel || this._selectionModel.isEmpty();
    }
    _isRtl() {
        return this._dir ? this._dir.value === 'rtl' : false;
    }
    _handleKeydown(event) {
        if (!this.disabled) {
            if (this.panelOpen) {
                this._handleOpenKeydown(event);
            }
            else {
                this._handleClosedKeydown(event);
            }
        }
    }
    /**
     * When the panel content is done fading in, the _panelDoneAnimating property is
     * set so the proper class can be added to the panel.
     */
    _onFadeInDone() {
        this._panelDoneAnimating = this.panelOpen;
        this._changeDetectorRef.markForCheck();
    }
    _onFocus() {
        if (!this.disabled) {
            this._focused = true;
            this.stateChanges.next();
        }
    }
    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     */
    _onBlur() {
        this._focused = false;
        if (!this.disabled && !this.panelOpen) {
            this._onTouched();
            this._changeDetectorRef.markForCheck();
            this.stateChanges.next();
        }
    }
    /**
     * Callback that is invoked when the overlay panel has been attached.
     */
    _onAttached() {
        this.overlayDir.positionChange
            .pipe(take(1))
            .subscribe(() => {
            this._changeDetectorRef.detectChanges();
            this._calculateOverlayOffsetX();
            this.panel.nativeElement.scrollTop = this._scrollTop;
        });
    }
    /** Returns the theme to be used on the panel. */
    _getPanelTheme() {
        return this._parentFormField ? `mc-${this._parentFormField.color}` : '';
    }
    /** Focuses the select element. */
    focus() {
        this._elementRef.nativeElement.focus();
    }
    /**
     * Calculates the scroll position of the select's overlay panel.
     *
     * Attempts to center the selected option in the panel. If the option is
     * too high or too low in the panel to be scrolled to the center, it clamps the
     * scroll position to the min or max scroll positions respectively.
     */
    _calculateOverlayScroll(selectedIndex, scrollBuffer, maxScroll) {
        const itemHeight = this._getItemHeight();
        const optionOffsetFromScrollTop = itemHeight * selectedIndex;
        /* tslint:disable-next-line:no-magic-numbers */
        const halfOptionHeight = itemHeight / 2;
        // Starts at the optionOffsetFromScrollTop, which scrolls the option to the top of the
        // scroll container, then subtracts the scroll buffer to scroll the option down to
        // the center of the overlay panel. Half the option height must be re-added to the
        // scrollTop so the option is centered based on its middle, not its top edge.
        const optimalScrollPosition = optionOffsetFromScrollTop - scrollBuffer + halfOptionHeight;
        return Math.min(Math.max(0, optimalScrollPosition), maxScroll);
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    onContainerClick() {
        this.focus();
        this.open();
    }
    /** Invoked when an option is clicked. */
    onRemoveMatcherItem(option, $event) {
        $event.stopPropagation();
        option.deselect();
    }
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get shouldLabelFloat() {
        return this._panelOpen || !this.empty;
    }
    _calculateHiddenItems() {
        if (this.empty) {
            return;
        }
        let visibleItems = 0;
        const totalItemsWidth = this._getTotalItemsWidthInMatcher();
        let totalVisibleItemsWidth = 0;
        const itemMargin = 4;
        this.tags.forEach((tag) => {
            if (tag.nativeElement.offsetTop < tag.nativeElement.offsetHeight) {
                totalVisibleItemsWidth += tag.nativeElement.getBoundingClientRect().width + itemMargin;
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
    _getTotalItemsWidthInMatcher() {
        const triggerClone = this.trigger.nativeElement.cloneNode(true);
        triggerClone.querySelector('.mc-select__match-hidden-text').remove();
        this._renderer.setStyle(triggerClone, 'position', 'absolute');
        this._renderer.setStyle(triggerClone, 'visibility', 'hidden');
        this._renderer.setStyle(triggerClone, 'top', '-100%');
        this._renderer.setStyle(triggerClone, 'left', '0');
        this._renderer.appendChild(this.trigger.nativeElement, triggerClone);
        let totalItemsWidth = 0;
        const itemMargin = 4;
        triggerClone.querySelectorAll('mc-tag').forEach((item) => {
            totalItemsWidth += item.getBoundingClientRect().width + itemMargin;
        });
        triggerClone.remove();
        return totalItemsWidth;
    }
    /** Handles keyboard events while the select is closed. */
    _handleClosedKeydown(event) {
        /* tslint:disable-next-line */
        const keyCode = event.keyCode;
        const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW ||
            keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW;
        const isOpenKey = keyCode === ENTER || keyCode === SPACE;
        // Open the select on ALT + arrow key to match the native <select>
        if (isOpenKey || ((this.multiple || event.altKey) && isArrowKey)) {
            event.preventDefault(); // prevents the page from scrolling down when pressing space
            this.open();
        }
        else if (!this.multiple) {
            this._keyManager.onKeydown(event);
        }
    }
    /** Handles keyboard events when the selected is open. */
    _handleOpenKeydown(event) {
        /* tslint:disable-next-line */
        const keyCode = event.keyCode;
        const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW;
        const manager = this._keyManager;
        if (keyCode === HOME || keyCode === END) {
            event.preventDefault();
            if (keyCode === HOME) {
                manager.setFirstItemActive();
            }
            else {
                manager.setLastItemActive();
            }
        }
        else if (isArrowKey && event.altKey) {
            // Close the select on ALT + arrow key to match the native <select>
            event.preventDefault();
            this.close();
        }
        else if ((keyCode === ENTER || keyCode === SPACE) && manager.activeItem) {
            event.preventDefault();
            manager.activeItem._selectViaInteraction();
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
            const previouslyFocusedIndex = manager.activeItemIndex;
            manager.onKeydown(event);
            if (this._multiple && isArrowKey && event.shiftKey && manager.activeItem &&
                manager.activeItemIndex !== previouslyFocusedIndex) {
                manager.activeItem._selectViaInteraction();
            }
        }
    }
    _initializeSelection() {
        // Defer setting the value in order to avoid the "Expression
        // has changed after it was checked" errors from Angular.
        Promise.resolve().then(() => {
            this._setSelectionByValue(this.ngControl ? this.ngControl.value : this._value);
        });
    }
    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     */
    _setSelectionByValue(value) {
        if (this.multiple && value) {
            if (!Array.isArray(value)) {
                throw getMcSelectNonArrayValueError();
            }
            this._selectionModel.clear();
            value.forEach((currentValue) => this._selectValue(currentValue));
            this._sortValues();
        }
        else {
            this._selectionModel.clear();
            const correspondingOption = this._selectValue(value);
            // Shift focus to the active item. Note that we shouldn't do this in multiple
            // mode, because we don't know what option the user interacted with last.
            if (correspondingOption) {
                this._keyManager.setActiveItem(correspondingOption);
            }
        }
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Finds and selects and option based on its value.
     * @returns Option that has the corresponding value.
     */
    _selectValue(value) {
        const correspondingOption = this.options.find((option) => {
            try {
                // Treat null as a special reset value.
                return option.value != null && this._compareWith(option.value, value);
            }
            catch (error) {
                if (isDevMode()) {
                    // Notify developers of errors in their comparator.
                    console.warn(error);
                }
                return false;
            }
        });
        if (correspondingOption) {
            this._selectionModel.select(correspondingOption);
        }
        return correspondingOption;
    }
    /** Sets up a key manager to listen to keyboard events on the overlay panel. */
    _initKeyManager() {
        this._keyManager = new ActiveDescendantKeyManager(this.options)
            .withTypeAhead()
            .withVerticalOrientation()
            .withHorizontalOrientation(this._isRtl() ? 'rtl' : 'ltr');
        this._keyManager.tabOut
            .pipe(takeUntil(this._destroy))
            .subscribe(() => {
            // Restore focus to the trigger before closing. Ensures that the focus
            // position won't be lost if the user got focus into the overlay.
            this.focus();
            this.close();
        });
        this._keyManager.change
            .pipe(takeUntil(this._destroy))
            .subscribe(() => {
            if (this._panelOpen && this.panel) {
                this._scrollActiveOptionIntoView();
            }
            else if (!this._panelOpen && !this.multiple && this._keyManager.activeItem) {
                this._keyManager.activeItem._selectViaInteraction();
            }
        });
    }
    /** Drops current option subscriptions and IDs and resets from scratch. */
    _resetOptions() {
        const changedOrDestroyed = merge(this.options.changes, this._destroy);
        this.optionSelectionChanges
            .pipe(takeUntil(changedOrDestroyed))
            .subscribe((event) => {
            this._onSelect(event.source, event.isUserInput);
            if (event.isUserInput && !this.multiple && this._panelOpen) {
                this.close();
                this.focus();
            }
        });
        // Listen to changes in the internal state of the options and react accordingly.
        // Handles cases like the labels of the selected options changing.
        merge(...this.options.map((option) => option._stateChanges))
            .pipe(takeUntil(changedOrDestroyed))
            .subscribe(() => {
            this._changeDetectorRef.markForCheck();
            this.stateChanges.next();
        });
        this._setOptionIds();
    }
    /** Invoked when an option is clicked. */
    _onSelect(option, isUserInput) {
        const wasSelected = this._selectionModel.isSelected(option);
        if (option.value == null && !this._multiple) {
            option.deselect();
            this._selectionModel.clear();
            this._propagateChanges(option.value);
        }
        else {
            if (option.selected) {
                this._selectionModel.select(option);
            }
            else {
                this._selectionModel.deselect(option);
            }
            if (isUserInput) {
                this._keyManager.setActiveItem(option);
            }
            if (this.multiple) {
                this._sortValues();
                if (isUserInput) {
                    // In case the user selected the option with their mouse, we
                    // want to restore focus back to the trigger, in order to
                    // prevent the select keyboard controls from clashing with
                    // the ones from `mc-option`.
                    this.focus();
                }
            }
        }
        if (wasSelected !== this._selectionModel.isSelected(option)) {
            this._propagateChanges();
        }
        this.stateChanges.next();
    }
    /** Sorts the selected values in the selected based on their order in the panel. */
    _sortValues() {
        if (this.multiple) {
            const options = this.options.toArray();
            this._selectionModel.sort((a, b) => {
                return this.sortComparator ? this.sortComparator(a, b, options) :
                    options.indexOf(a) - options.indexOf(b);
            });
            this.stateChanges.next();
        }
    }
    /** Emits change event to set the model value. */
    _propagateChanges(fallbackValue) {
        let valueToEmit = null;
        if (this.multiple) {
            valueToEmit = this.selected.map((option) => option.value);
        }
        else {
            valueToEmit = this.selected ? this.selected.value : fallbackValue;
        }
        this._value = valueToEmit;
        this.valueChange.emit(valueToEmit);
        this._onChange(valueToEmit);
        this.selectionChange.emit(new McSelectChange(this, valueToEmit));
        this._changeDetectorRef.markForCheck();
    }
    /** Records option IDs to pass to the aria-owns property. */
    _setOptionIds() {
        this._optionIds = this.options.map((option) => option.id).join(' ');
    }
    /**
     * Highlights the selected item. If no option is selected, it will highlight
     * the first item instead.
     */
    _highlightCorrectOption() {
        if (this._keyManager) {
            if (this.empty) {
                this._keyManager.setFirstItemActive();
            }
            else {
                this._keyManager.setActiveItem(this._selectionModel.selected[0]);
            }
        }
    }
    /** Scrolls the active option into view. */
    _scrollActiveOptionIntoView() {
        const activeOptionIndex = this._keyManager.activeItemIndex || 0;
        const labelCount = _countGroupLabelsBeforeOption(activeOptionIndex, this.options, this.optionGroups);
        this.panel.nativeElement.scrollTop = _getOptionScrollPosition(activeOptionIndex + labelCount, this._getItemHeight(), this.panel.nativeElement.scrollTop, SELECT_PANEL_MAX_HEIGHT);
    }
    /** Gets the index of the provided option in the option list. */
    _getOptionIndex(option) {
        /* tslint:disable-next-line */
        return this.options.reduce((result, current, index) => {
            /* tslint:disable-next-line:strict-type-predicates */
            return result === undefined ? (option === current ? index : undefined) : result;
        }, undefined);
    }
    /** Calculates the scroll position and x- and y-offsets of the overlay panel. */
    _calculateOverlayPosition() {
        const itemHeight = this._getItemHeight();
        const items = this._getItemCount();
        const panelHeight = Math.min(items * itemHeight, SELECT_PANEL_MAX_HEIGHT);
        const scrollContainerHeight = items * itemHeight;
        // The farthest the panel can be scrolled before it hits the bottom
        const maxScroll = scrollContainerHeight - panelHeight;
        // If no value is selected we open the popup to the first item.
        let selectedOptionOffset = this.empty ? 0 : this._getOptionIndex(this._selectionModel.selected[0]);
        selectedOptionOffset += _countGroupLabelsBeforeOption(selectedOptionOffset, this.options, this.optionGroups);
        // We must maintain a scroll buffer so the selected option will be scrolled to the
        // center of the overlay panel rather than the top.
        /* tslint:disable-next-line:no-magic-numbers */
        const scrollBuffer = panelHeight / 2;
        this._scrollTop = this._calculateOverlayScroll(selectedOptionOffset, scrollBuffer, maxScroll);
        this._offsetY = this._calculateOverlayOffsetY();
        this._checkOverlayWithinViewport(maxScroll);
    }
    /**
     * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text when
     * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
     * can't be calculated until the panel has been attached, because we need to know the
     * content width in order to constrain the panel within the viewport.
     */
    _calculateOverlayOffsetX() {
        const overlayRect = this.overlayDir.overlayRef.overlayElement.getBoundingClientRect();
        const viewportSize = this._viewportRuler.getViewportSize();
        const isRtl = this._isRtl();
        /* tslint:disable-next-line:no-magic-numbers */
        const paddingWidth = SELECT_PANEL_PADDING_X * 2;
        let offsetX;
        const selected = this._selectionModel.selected[0] || this.options.first;
        offsetX = selected && selected.group ? SELECT_PANEL_INDENT_PADDING_X : SELECT_PANEL_PADDING_X;
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
    /**
     * Calculates the y-offset of the select's overlay panel in relation to the
     * top start corner of the trigger. It has to be adjusted in order for the
     * selected option to be aligned over the trigger when the panel opens.
     */
    _calculateOverlayOffsetY() {
        // const itemHeight = this._getItemHeight();
        // const optionHeightAdjustment = (itemHeight - this._triggerRect.height) / 2;
        // todo I'm not sure that we will use it
        return 0;
        // return Math.round(-optionHeightAdjustment);
    }
    /**
     * Checks that the attempted overlay position will fit within the viewport.
     * If it will not fit, tries to adjust the scroll position and the associated
     * y-offset so the panel can open fully on-screen. If it still won't fit,
     * sets the offset back to 0 to allow the fallback position to take over.
     */
    _checkOverlayWithinViewport(maxScroll) {
        const itemHeight = this._getItemHeight();
        const viewportSize = this._viewportRuler.getViewportSize();
        const topSpaceAvailable = this._triggerRect.top - SELECT_PANEL_VIEWPORT_PADDING;
        const bottomSpaceAvailable = viewportSize.height - this._triggerRect.bottom - SELECT_PANEL_VIEWPORT_PADDING;
        const panelHeightTop = Math.abs(this._offsetY);
        const totalPanelHeight = Math.min(this._getItemCount() * itemHeight, SELECT_PANEL_MAX_HEIGHT);
        const panelHeightBottom = totalPanelHeight - panelHeightTop - this._triggerRect.height;
        if (panelHeightBottom > bottomSpaceAvailable) {
            this._adjustPanelUp(panelHeightBottom, bottomSpaceAvailable);
        }
        else if (panelHeightTop > topSpaceAvailable) {
            this._adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll);
        }
        else {
            this._transformOrigin = this._getOriginBasedOnOption();
        }
    }
    /** Adjusts the overlay panel up to fit in the viewport. */
    _adjustPanelUp(panelHeightBottom, bottomSpaceAvailable) {
        // Browsers ignore fractional scroll offsets, so we need to round.
        const distanceBelowViewport = Math.round(panelHeightBottom - bottomSpaceAvailable);
        // Scrolls the panel up by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel up into the viewport.
        this._scrollTop -= distanceBelowViewport;
        this._offsetY -= distanceBelowViewport;
        this._transformOrigin = this._getOriginBasedOnOption();
        // If the panel is scrolled to the very top, it won't be able to fit the panel
        // by scrolling, so set the offset to 0 to allow the fallback position to take
        // effect.
        if (this._scrollTop <= 0) {
            this._scrollTop = 0;
            this._offsetY = 0;
            this._transformOrigin = `50% bottom 0px`;
        }
    }
    /** Adjusts the overlay panel down to fit in the viewport. */
    _adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll) {
        // Browsers ignore fractional scroll offsets, so we need to round.
        const distanceAboveViewport = Math.round(panelHeightTop - topSpaceAvailable);
        // Scrolls the panel down by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel down into the viewport.
        this._scrollTop += distanceAboveViewport;
        this._offsetY += distanceAboveViewport;
        this._transformOrigin = this._getOriginBasedOnOption();
        // If the panel is scrolled to the very bottom, it won't be able to fit the
        // panel by scrolling, so set the offset to 0 to allow the fallback position
        // to take effect.
        if (this._scrollTop >= maxScroll) {
            this._scrollTop = maxScroll;
            this._offsetY = 0;
            this._transformOrigin = `50% top 0px`;
            return;
        }
    }
    /** Sets the transform origin point based on the selected option. */
    _getOriginBasedOnOption() {
        const itemHeight = this._getItemHeight();
        /* tslint:disable-next-line:no-magic-numbers */
        const optionHeightAdjustment = (itemHeight - this._triggerRect.height) / 2;
        /* tslint:disable-next-line:no-magic-numbers */
        const originY = Math.abs(this._offsetY) - optionHeightAdjustment + itemHeight / 2;
        return `50% ${originY}px 0px`;
    }
    /** Calculates the amount of items in the select. This includes options and group labels. */
    _getItemCount() {
        return this.options.length + this.optionGroups.length;
    }
    /** Calculates the height of the select's options. */
    _getItemHeight() {
        /* tslint:disable-next-line:no-magic-numbers */
        return 32;
        // return this._triggerFontSize * SELECT_ITEM_HEIGHT_EM;
    }
};
__decorate([
    ViewChild('trigger'),
    __metadata("design:type", ElementRef)
], McSelect.prototype, "trigger", void 0);
__decorate([
    ViewChildren(McTag),
    __metadata("design:type", QueryList)
], McSelect.prototype, "tags", void 0);
__decorate([
    ViewChild('panel'),
    __metadata("design:type", ElementRef)
], McSelect.prototype, "panel", void 0);
__decorate([
    ViewChild(CdkConnectedOverlay),
    __metadata("design:type", CdkConnectedOverlay)
], McSelect.prototype, "overlayDir", void 0);
__decorate([
    ContentChildren(McOption, { descendants: true }),
    __metadata("design:type", QueryList)
], McSelect.prototype, "options", void 0);
__decorate([
    ContentChildren(McOptgroup),
    __metadata("design:type", QueryList)
], McSelect.prototype, "optionGroups", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], McSelect.prototype, "panelClass", void 0);
__decorate([
    ContentChild(McSelectTrigger),
    __metadata("design:type", McSelectTrigger)
], McSelect.prototype, "customTrigger", void 0);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], McSelect.prototype, "placeholder", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], McSelect.prototype, "required", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], McSelect.prototype, "multiple", null);
__decorate([
    Input(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function])
], McSelect.prototype, "compareWith", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], McSelect.prototype, "value", null);
__decorate([
    Input(),
    __metadata("design:type", ErrorStateMatcher)
], McSelect.prototype, "errorStateMatcher", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], McSelect.prototype, "sortComparator", void 0);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], McSelect.prototype, "id", null);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], McSelect.prototype, "openedChange", void 0);
__decorate([
    Output('opened'),
    __metadata("design:type", Observable)
], McSelect.prototype, "_openedStream", void 0);
__decorate([
    Output('closed'),
    __metadata("design:type", Observable)
], McSelect.prototype, "_closedStream", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], McSelect.prototype, "selectionChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], McSelect.prototype, "valueChange", void 0);
McSelect = McSelect_1 = __decorate([
    Component({
        selector: 'mc-select',
        exportAs: 'mcSelect',
        template: "<div cdk-overlay-origin class=\"mc-select__trigger\" (click)=\"toggle()\" [class.mc-select__trigger_multiple]=\"multiple\" #origin=\"cdkOverlayOrigin\" #trigger><div class=\"mc-select__matcher\" [ngSwitch]=\"empty\"><span class=\"mc-select__placeholder\" *ngSwitchCase=\"true\">{{ placeholder || '\u00A0' }}</span> <span *ngSwitchCase=\"false\" [ngSwitch]=\"!!customTrigger\"><div *ngSwitchDefault [ngSwitch]=\"multiple\" class=\"mc-select__match-container\"><span *ngSwitchCase=\"false\" class=\"mc-select__matcher-text\">{{ triggerValue }}</span><div *ngSwitchCase=\"true\" class=\"mc-select__match-list\"><mc-tag *ngFor=\"let option of triggerValues\" [disabled]=\"disabled\" [class.mc-error]=\"errorState\">{{ option.viewValue || option.value }} <i mc-icon=\"mc-close-S_16\" (click)=\"onRemoveMatcherItem(option, $event)\"></i></mc-tag></div><div class=\"mc-select__match-hidden-text\" [style.display]=\"hiddenItems > 0 ? 'block' : 'none'\">{{ oneMoreText }} {{ hiddenItems }}</div></div><ng-content select=\"mc-select-trigger\" *ngSwitchCase=\"true\"></ng-content></span></div><div class=\"mc-select__arrow-wrapper\"><i class=\"mc-select__arrow\" mc-icon=\"mc-angle-down-L_16\" color=\"second\"></i></div></div><ng-template cdk-connected-overlay cdkConnectedOverlayLockPosition cdkConnectedOverlayHasBackdrop cdkConnectedOverlayBackdropClass=\"cdk-overlay-transparent-backdrop\" [cdkConnectedOverlayScrollStrategy]=\"_scrollStrategy\" [cdkConnectedOverlayOrigin]=\"origin\" [cdkConnectedOverlayOpen]=\"panelOpen\" [cdkConnectedOverlayPositions]=\"_positions\" [cdkConnectedOverlayMinWidth]=\"_triggerRect?.width\" [cdkConnectedOverlayOffsetY]=\"_offsetY\" (backdropClick)=\"close()\" (attach)=\"_onAttached()\" (detach)=\"close()\"><div #panel class=\"mc-select__panel {{ _getPanelTheme() }}\" [ngClass]=\"panelClass\" (@transformPanel.done)=\"_panelDoneAnimatingStream.next($event.toState)\" [style.transformOrigin]=\"_transformOrigin\" [class.mc-select-panel-done-animcing]=\"_panelDoneAnimating\" [style.font-size.px]=\"_triggerFontSize\" (keydown)=\"_handleKeydown($event)\"><div class=\"mc-select__content\" [@fadeInContent]=\"'showing'\" (@fadeInContent.done)=\"_onFadeInDone()\"><ng-content></ng-content></div></div></ng-template>",
        styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}.mc-select{box-sizing:border-box;display:inline-block;width:100%;outline:0}.mc-select.mc-disabled .mc-select__trigger{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.mc-select__trigger{display:flex;box-sizing:border-box;position:relative;height:30px;cursor:pointer;padding:3px 7px 3px 15px}.mc-select__trigger.mc-select__trigger_multiple{padding-left:7px}.mc-select__matcher{display:flex;align-items:center;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mc-select__matcher>span{width:100%}.mc-select__match-list{display:flex;flex-wrap:wrap;overflow:hidden;max-height:24px;margin:0;padding-left:0}.mc-select__match-list .mc-tag{margin-right:4px}.mc-select__match-container{display:flex;flex-direction:row;justify-content:space-between;width:100%}.mc-select__match-container .mc-select__match-hidden-text{flex:0 0 70px;align-self:center;padding:0 8px;text-align:right}.mc-select__match-item{display:flex;border:1px solid transparent;border-radius:3px;padding-left:7px;margin-right:4px;max-width:100%}.mc-select__arrow-wrapper{display:table-cell;vertical-align:middle}.mc-form-field-appearance-fill .mc-select__arrow-wrapper,.mc-form-field-appearance-standard .mc-select__arrow-wrapper{transform:translateY(-50%)}.mc-form-field-appearance-outline .mc-select__arrow-wrapper{transform:translateY(-25%)}.mc-select__panel{max-height:224px;min-width:100%;overflow:auto;border-width:1px;border-style:solid;border-bottom-left-radius:3px;border-bottom-right-radius:3px;padding:4px 0}.mc-select__content{height:100%}.mc-select__panel .mc-optgroup-label,.mc-select__panel .mc-option{font-size:inherit;line-height:32px;height:32px}.mc-form-field-type-mc-select:not(.mc-disabled) .mc-form-field-flex{cursor:pointer}.mc-form-field-type-mc-select .mc-form-field-label{width:calc(100% - 18px)}"],
        inputs: ['disabled', 'tabIndex'],
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        host: {
            '[attr.id]': 'id',
            '[attr.tabindex]': 'tabIndex',
            class: 'mc-select',
            '[class.mc-disabled]': 'disabled',
            '[class.mc-select-invalid]': 'errorState',
            '[class.mc-select-required]': 'required',
            '(keydown)': '_handleKeydown($event)',
            '(focus)': '_onFocus()',
            '(blur)': '_onBlur()',
            '(window:resize)': '_calculateHiddenItems()'
        },
        animations: [
            mcSelectAnimations.transformPanel,
            mcSelectAnimations.fadeInContent
        ],
        providers: [
            { provide: McFormFieldControl, useExisting: McSelect_1 },
            { provide: MC_OPTION_PARENT_COMPONENT, useExisting: McSelect_1 }
        ]
    }),
    __param(6, Optional()),
    __param(7, Optional()),
    __param(8, Optional()),
    __param(9, Optional()),
    __param(10, Self()), __param(10, Optional()),
    __param(11, Attribute('tabindex')),
    __param(12, Inject(MC_SELECT_SCROLL_STRATEGY)),
    __metadata("design:paramtypes", [ViewportRuler,
        ChangeDetectorRef,
        NgZone,
        Renderer2,
        ErrorStateMatcher,
        ElementRef,
        Directionality,
        NgForm,
        FormGroupDirective,
        McFormField,
        NgControl, String, Object])
], McSelect);

let McSelectModule = class McSelectModule {
};
McSelectModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            OverlayModule,
            McOptionModule,
            McIconModule,
            McTagModule
        ],
        exports: [McFormFieldModule, McSelect, McSelectTrigger, McOptionModule, CommonModule],
        declarations: [McSelect, McSelectTrigger],
        providers: [MC_SELECT_SCROLL_STRATEGY_PROVIDER]
    })
], McSelectModule);

/**
 * Generated bundle index. Do not edit.
 */

export { mcSelectAnimations as ɵa26, McSelectModule, SELECT_PANEL_MAX_HEIGHT, SELECT_PANEL_PADDING_X, SELECT_PANEL_INDENT_PADDING_X, SELECT_ITEM_HEIGHT_EM, SELECT_PANEL_VIEWPORT_PADDING, MC_SELECT_SCROLL_STRATEGY, MC_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY, MC_SELECT_SCROLL_STRATEGY_PROVIDER, McSelectChange, McSelectBase, _McSelectMixinBase, McSelectTrigger, McSelect };
//# sourceMappingURL=select.js.map
