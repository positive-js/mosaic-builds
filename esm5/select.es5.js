/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __extends } from 'tslib';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, Inject, Input, isDevMode, NgZone, Optional, Output, Renderer2, Self, ViewChild, ViewChildren, ViewEncapsulation, NgModule } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ActiveDescendantKeyManager } from '@ptsecurity/cdk/a11y';
import { Directionality } from '@ptsecurity/cdk/bidi';
import { coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { SelectionModel } from '@ptsecurity/cdk/collections';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW, A, ESCAPE, PAGE_UP, PAGE_DOWN } from '@ptsecurity/cdk/keycodes';
import { CdkConnectedOverlay, ViewportRuler, OverlayModule } from '@ptsecurity/cdk/overlay';
import { countGroupLabelsBeforeOption, getOptionScrollPosition, ErrorStateMatcher, MC_OPTION_PARENT_COMPONENT, McOptgroup, McOption, mixinDisabled, mixinErrorState, mixinTabIndex, mcSelectAnimations, SELECT_PANEL_INDENT_PADDING_X, SELECT_PANEL_MAX_HEIGHT, SELECT_PANEL_PADDING_X, SELECT_PANEL_VIEWPORT_PADDING, getMcSelectDynamicMultipleError, getMcSelectNonFunctionValueError, getMcSelectNonArrayValueError, MC_SELECT_SCROLL_STRATEGY, MC_SELECT_SCROLL_STRATEGY_PROVIDER, McOptionModule } from '@ptsecurity/mosaic/core';
import { McFormField, McFormFieldControl, McFormFieldModule } from '@ptsecurity/mosaic/form-field';
import { McInput } from '@ptsecurity/mosaic/input';
import { McTag, McTagsModule } from '@ptsecurity/mosaic/tags';
import { defer, merge, Subject, Subscription } from 'rxjs';
import { filter, map, startWith, switchMap, take, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { McIconModule } from '@ptsecurity/mosaic/icon';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var nextUniqueId = 0;
/**
 * The height of the select items in `em` units.
 * @type {?}
 */
var SELECT_ITEM_HEIGHT_EM = 2;
/**
 * Change event object that is emitted when the select value has changed.
 */
var  /**
 * Change event object that is emitted when the select value has changed.
 */
McSelectChange = /** @class */ (function () {
    function McSelectChange(source, value) {
        this.source = source;
        this.value = value;
    }
    return McSelectChange;
}());
var McSelectBase = /** @class */ (function () {
    function McSelectBase(elementRef, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
        this.elementRef = elementRef;
        this.defaultErrorStateMatcher = defaultErrorStateMatcher;
        this.parentForm = parentForm;
        this.parentFormGroup = parentFormGroup;
        this.ngControl = ngControl;
    }
    return McSelectBase;
}());
/** @type {?} */
var McSelectMixinBase = mixinTabIndex(mixinDisabled(mixinErrorState(McSelectBase)));
var McSelectSearch = /** @class */ (function () {
    function McSelectSearch(formField) {
        this.searchChangesSubscription = new Subscription();
        this.isSearchChanged = false;
        formField.canCleanerClearByEsc = false;
    }
    /**
     * @return {?}
     */
    McSelectSearch.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.input.focus();
    };
    /**
     * @return {?}
     */
    McSelectSearch.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.input.ngControl.reset();
    };
    /**
     * @return {?}
     */
    McSelectSearch.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.input) {
            throw Error('McSelectSearch does not work without mcInput');
        }
        if (!this.input.ngControl) {
            throw Error('McSelectSearch does not work without ngControl');
        }
        this.searchChangesSubscription = (/** @type {?} */ (this.input.ngControl.valueChanges)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.isSearchChanged = true;
        }));
    };
    /**
     * @return {?}
     */
    McSelectSearch.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.searchChangesSubscription.unsubscribe();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McSelectSearch.prototype.handleKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // tslint:disable-next-line:deprecation
        if (event.keyCode === ESCAPE) {
            if (this.input.value) {
                this.reset();
                event.stopPropagation();
            }
        }
    };
    McSelectSearch.decorators = [
        { type: Directive, args: [{
                    selector: '[mcSelectSearch]',
                    exportAs: 'mcSelectSearch',
                    host: {
                        '(keydown)': 'handleKeydown($event)'
                    }
                },] },
    ];
    /** @nocollapse */
    McSelectSearch.ctorParameters = function () { return [
        { type: McFormField }
    ]; };
    McSelectSearch.propDecorators = {
        input: [{ type: ContentChild, args: [McInput, { static: false },] }]
    };
    return McSelectSearch;
}());
var McSelectSearchEmptyResult = /** @class */ (function () {
    function McSelectSearchEmptyResult() {
    }
    McSelectSearchEmptyResult.decorators = [
        { type: Directive, args: [{
                    selector: '[mc-select-search-empty-result]',
                    exportAs: 'mcSelectSearchEmptyResult'
                },] },
    ];
    return McSelectSearchEmptyResult;
}());
var McSelectTrigger = /** @class */ (function () {
    function McSelectTrigger() {
    }
    McSelectTrigger.decorators = [
        { type: Directive, args: [{ selector: 'mc-select-trigger' },] },
    ];
    return McSelectTrigger;
}());
var McSelect = /** @class */ (function (_super) {
    __extends(McSelect, _super);
    function McSelect(_viewportRuler, _changeDetectorRef, _ngZone, _renderer, defaultErrorStateMatcher, elementRef, _dir, parentForm, parentFormGroup, _parentFormField, ngControl, tabIndex, _scrollStrategyFactory) {
        var _this = _super.call(this, elementRef, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) || this;
        _this._viewportRuler = _viewportRuler;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._ngZone = _ngZone;
        _this._renderer = _renderer;
        _this._dir = _dir;
        _this._parentFormField = _parentFormField;
        _this.ngControl = ngControl;
        _this._scrollStrategyFactory = _scrollStrategyFactory;
        /**
         * A name for this control that can be used by `mc-form-field`.
         */
        _this.controlType = 'mc-select';
        _this.hiddenItems = 0;
        /**
         * The cached font-size of the trigger element.
         */
        _this.triggerFontSize = 0;
        _this.previousSelectionModelSelected = [];
        /**
         * The IDs of child options to be passed to the aria-owns attribute.
         */
        _this.optionIds = '';
        /**
         * The value of the select panel's transform-origin property.
         */
        _this.transformOrigin = 'top';
        /**
         * Whether the panel's animation is done.
         */
        _this.panelDoneAnimating = false;
        /**
         * Emits when the panel element is finished transforming in.
         */
        _this.panelDoneAnimatingStream = new Subject();
        /**
         * Strategy that will be used to handle scrolling while the select panel is open.
         */
        _this.scrollStrategy = _this._scrollStrategyFactory();
        /**
         * The y-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text.
         * when the panel opens. Will change based on the y-position of the selected option.
         */
        _this.offsetY = 0;
        /**
         * This position config ensures that the top "start" corner of the overlay
         * is aligned with with the top "start" of the origin by default (overlapping
         * the trigger completely). If the panel cannot fit below the trigger, it
         * will fall back to a position above the trigger.
         */
        _this.positions = [
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
        _this.hiddenItemsText = '...ещё';
        /**
         * Combined stream of all of the child options' change events.
         */
        _this.optionSelectionChanges = (/** @type {?} */ (defer((/**
         * @return {?}
         */
        function () {
            if (_this.options) {
                return merge.apply(void 0, _this.options.map((/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) { return option.onSelectionChange; })).concat(_this.selectionModel.selected.map((/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) { return option.onSelectionChange; }))));
            }
            return _this._ngZone.onStable
                .asObservable()
                .pipe(take(1), switchMap((/**
             * @return {?}
             */
            function () { return _this.optionSelectionChanges; })));
        }))));
        /**
         * Event emitted when the select panel has been toggled.
         */
        _this.openedChange = new EventEmitter();
        /**
         * Event emitted when the select has been opened.
         */
        _this.openedStream = _this.openedChange.pipe(filter((/**
         * @param {?} o
         * @return {?}
         */
        function (o) { return o; })), map((/**
         * @return {?}
         */
        function () { })));
        /**
         * Event emitted when the select has been closed.
         */
        _this.closedStream = _this.openedChange.pipe(filter((/**
         * @param {?} o
         * @return {?}
         */
        function (o) { return !o; })), map((/**
         * @return {?}
         */
        function () { })));
        /**
         * Event emitted when the selected value has been changed by the user.
         */
        _this.selectionChange = new EventEmitter();
        /**
         * Event that emits whenever the raw value of the select changes. This is here primarily
         * to facilitate the two-way binding for the `value` input.
         * \@docs-private
         */
        _this.valueChange = new EventEmitter();
        _this._required = false;
        _this._multiple = false;
        _this._focused = false;
        _this._panelOpen = false;
        /**
         * The scroll position of the overlay panel, calculated to center the selected option.
         */
        _this.scrollTop = 0;
        /**
         * Unique id for this input.
         */
        _this.uid = "mc-select-" + nextUniqueId++;
        /**
         * Emits whenever the component is destroyed.
         */
        _this.destroy = new Subject();
        /**
         * `View -> model callback called when value changes`
         */
        _this.onChange = (/**
         * @return {?}
         */
        function () { });
        /**
         * `View -> model callback called when select has been touched`
         */
        _this.onTouched = (/**
         * @return {?}
         */
        function () { });
        /**
         * Comparison function to specify which option is displayed. Defaults to object equality.
         */
        _this._compareWith = (/**
         * @param {?} o1
         * @param {?} o2
         * @return {?}
         */
        function (o1, o2) { return o1 === o2; });
        if (_this.ngControl) {
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            _this.ngControl.valueAccessor = _this;
        }
        _this.tabIndex = parseInt(tabIndex) || 0;
        // Force setter to be called in case id was not specified.
        _this.id = _this.id;
        return _this;
    }
    Object.defineProperty(McSelect.prototype, "placeholder", {
        get: /**
         * @return {?}
         */
        function () {
            return this._placeholder;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._placeholder = value;
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSelect.prototype, "required", {
        get: /**
         * @return {?}
         */
        function () {
            return this._required;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._required = coerceBooleanProperty(value);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSelect.prototype, "multiple", {
        get: /**
         * @return {?}
         */
        function () {
            return this._multiple;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this.selectionModel) {
                throw getMcSelectDynamicMultipleError();
            }
            this._multiple = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSelect.prototype, "compareWith", {
        /**
         * Function to compare the option values with the selected values. The first argument
         * is a value from an option. The second is a value from the selection. A boolean
         * should be returned.
         */
        get: /**
         * Function to compare the option values with the selected values. The first argument
         * is a value from an option. The second is a value from the selection. A boolean
         * should be returned.
         * @return {?}
         */
        function () {
            return this._compareWith;
        },
        set: /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            /* tslint:disable-next-line:strict-type-predicates */
            if (typeof fn !== 'function') {
                throw getMcSelectNonFunctionValueError();
            }
            this._compareWith = fn;
            if (this.selectionModel) {
                // A different comparator means the selection could change.
                this.initializeSelection();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSelect.prototype, "value", {
        /** Value of the select control. */
        get: /**
         * Value of the select control.
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} newValue
         * @return {?}
         */
        function (newValue) {
            if (newValue !== this._value) {
                this.writeValue(newValue);
                this._value = newValue;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSelect.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return this._id;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._id = value || this.uid;
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSelect.prototype, "focused", {
        /** Whether the select is focused. */
        get: /**
         * Whether the select is focused.
         * @return {?}
         */
        function () {
            return this._focused || this._panelOpen;
        },
        /**
         * @deprecated Setter to be removed as this property is intended to be readonly.
         * @breaking-change 8.0.0
         */
        set: /**
         * @deprecated Setter to be removed as this property is intended to be readonly.
         * \@breaking-change 8.0.0
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._focused = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSelect.prototype, "panelOpen", {
        get: /**
         * @return {?}
         */
        function () {
            return this._panelOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSelect.prototype, "isEmptySearchResult", {
        get: /**
         * @return {?}
         */
        function () {
            return this.search && this.options.length === 0 && !!this.search.input.value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McSelect.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
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
        function () {
            if (_this.panelOpen) {
                _this.scrollTop = 0;
                _this.openedChange.emit(true);
            }
            else {
                _this.openedChange.emit(false);
                _this.panelDoneAnimating = false;
                _this.overlayDir.offsetX = 0;
                _this._changeDetectorRef.markForCheck();
            }
        }));
    };
    /**
     * @return {?}
     */
    McSelect.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.initKeyManager();
        this.selectionModel.changed
            .pipe(takeUntil(this.destroy))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            event.added.forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return option.select(); }));
            event.removed.forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return option.deselect(); }));
        }));
        this.options.changes
            .pipe(startWith(null), takeUntil(this.destroy))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.resetOptions();
            _this.initializeSelection();
        }));
    };
    /**
     * @return {?}
     */
    McSelect.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.tags.changes
            .subscribe((/**
         * @return {?}
         */
        function () {
            setTimeout((/**
             * @return {?}
             */
            function () { return _this.calculateHiddenItems(); }), 0);
        }));
    };
    /**
     * @return {?}
     */
    McSelect.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this.ngControl) {
            this.updateErrorState();
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    McSelect.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        // Updating the disabled state is handled by `mixinDisabled`, but we need to additionally let
        // the parent form field know to run change detection when the disabled state changes.
        if (changes.disabled) {
            this.stateChanges.next();
        }
    };
    /**
     * @return {?}
     */
    McSelect.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy.next();
        this.destroy.complete();
        this.stateChanges.complete();
    };
    /**
     * @return {?}
     */
    McSelect.prototype.resetSearch = /**
     * @return {?}
     */
    function () {
        if (this.search) {
            this.search.reset();
            /*
            todo the incorrect behaviour of keyManager is possible here
            to avoid first item selection (to provide correct options flipping on closed select)
            we should process options update like it is the first options appearance
             */
            this.search.isSearchChanged = false;
        }
    };
    /** Toggles the overlay panel open or closed. */
    /**
     * Toggles the overlay panel open or closed.
     * @return {?}
     */
    McSelect.prototype.toggle = /**
     * Toggles the overlay panel open or closed.
     * @return {?}
     */
    function () {
        if (this.panelOpen) {
            this.close();
        }
        else {
            this.open();
        }
    };
    /** Opens the overlay panel. */
    /**
     * Opens the overlay panel.
     * @return {?}
     */
    McSelect.prototype.open = /**
     * Opens the overlay panel.
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.disabled || !this.options || !this.options.length || this._panelOpen) {
            return;
        }
        this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
        // Note: The computed font-size will be a string pixel value (e.g. "16px").
        // `parseInt` ignores the trailing 'px' and converts this to a number.
        this.triggerFontSize = parseInt(getComputedStyle(this.trigger.nativeElement)['font-size']);
        this._panelOpen = true;
        this.keyManager.withHorizontalOrientation(null);
        this.calculateOverlayPosition();
        this.highlightCorrectOption();
        this._changeDetectorRef.markForCheck();
        // Set the font size on the panel element once it exists.
        this._ngZone.onStable.asObservable()
            .pipe(take(1))
            .subscribe((/**
         * @return {?}
         */
        function () {
            if (_this.triggerFontSize && _this.overlayDir.overlayRef && _this.overlayDir.overlayRef.overlayElement) {
                _this.overlayDir.overlayRef.overlayElement.style.fontSize = _this.triggerFontSize + "px";
            }
        }));
    };
    /** Closes the overlay panel and focuses the host element. */
    /**
     * Closes the overlay panel and focuses the host element.
     * @return {?}
     */
    McSelect.prototype.close = /**
     * Closes the overlay panel and focuses the host element.
     * @return {?}
     */
    function () {
        if (this._panelOpen) {
            // the order of calls is important
            this.resetSearch();
            this._panelOpen = false;
            this.keyManager.withHorizontalOrientation(this.isRtl() ? 'rtl' : 'ltr');
            this._changeDetectorRef.markForCheck();
            this.onTouched();
        }
    };
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param value New value to be written to the model.
     */
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} value New value to be written to the model.
     * @return {?}
     */
    McSelect.prototype.writeValue = /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} value New value to be written to the model.
     * @return {?}
     */
    function (value) {
        if (this.options) {
            this.setSelectionByValue(value);
        }
    };
    /**
     * Saves a callback function to be invoked when the select's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the value changes.
     */
    /**
     * Saves a callback function to be invoked when the select's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} fn Callback to be triggered when the value changes.
     * @return {?}
     */
    McSelect.prototype.registerOnChange = /**
     * Saves a callback function to be invoked when the select's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} fn Callback to be triggered when the value changes.
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the component has been touched.
     */
    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param {?} fn Callback to be triggered when the component has been touched.
     * @return {?}
     */
    McSelect.prototype.registerOnTouched = /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param {?} fn Callback to be triggered when the component has been touched.
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param isDisabled Sets whether the component is disabled.
     */
    /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param {?} isDisabled Sets whether the component is disabled.
     * @return {?}
     */
    McSelect.prototype.setDisabledState = /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param {?} isDisabled Sets whether the component is disabled.
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
        this._changeDetectorRef.markForCheck();
        this.stateChanges.next();
    };
    Object.defineProperty(McSelect.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this.multiple ? this.selectionModel.selected : this.selectionModel.selected[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSelect.prototype, "triggerValue", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.empty) {
                return '';
            }
            if (this._multiple) {
                /** @type {?} */
                var selectedOptions = this.selectionModel.selected.map((/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) { return option.viewValue; }));
                if (this.isRtl()) {
                    selectedOptions.reverse();
                }
                return selectedOptions.join(', ');
            }
            return this.selectionModel.selected[0].viewValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSelect.prototype, "triggerValues", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.empty) {
                return [];
            }
            if (this._multiple) {
                /** @type {?} */
                var selectedOptions = this.selectionModel.selected;
                if (this.isRtl()) {
                    selectedOptions.reverse();
                }
                return selectedOptions;
            }
            return [this.selectionModel.selected[0]];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSelect.prototype, "empty", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.selectionModel || this.selectionModel.isEmpty();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McSelect.prototype.isRtl = /**
     * @return {?}
     */
    function () {
        return this._dir ? this._dir.value === 'rtl' : false;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McSelect.prototype.handleKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.disabled) {
            if (this.panelOpen) {
                this.handleOpenKeydown(event);
            }
            else {
                this.handleClosedKeydown(event);
            }
        }
    };
    /**
     * When the panel content is done fading in, the panelDoneAnimating property is
     * set so the proper class can be added to the panel.
     */
    /**
     * When the panel content is done fading in, the panelDoneAnimating property is
     * set so the proper class can be added to the panel.
     * @return {?}
     */
    McSelect.prototype.onFadeInDone = /**
     * When the panel content is done fading in, the panelDoneAnimating property is
     * set so the proper class can be added to the panel.
     * @return {?}
     */
    function () {
        this.panelDoneAnimating = this.panelOpen;
        this._changeDetectorRef.markForCheck();
        if (this.search && this._panelOpen) {
            this.search.focus();
        }
    };
    /**
     * @return {?}
     */
    McSelect.prototype.onFocus = /**
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this._focused = true;
            this.stateChanges.next();
        }
    };
    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     */
    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     * @return {?}
     */
    McSelect.prototype.onBlur = /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     * @return {?}
     */
    function () {
        this._focused = false;
        if (!this.disabled && !this.panelOpen) {
            this.onTouched();
            this._changeDetectorRef.markForCheck();
            this.stateChanges.next();
        }
    };
    /**
     * Callback that is invoked when the overlay panel has been attached.
     */
    /**
     * Callback that is invoked when the overlay panel has been attached.
     * @return {?}
     */
    McSelect.prototype.onAttached = /**
     * Callback that is invoked when the overlay panel has been attached.
     * @return {?}
     */
    function () {
        var _this = this;
        this.overlayDir.positionChange
            .pipe(take(1))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this._changeDetectorRef.detectChanges();
            _this.calculateOverlayOffsetX();
            _this.optionsContainer.nativeElement.scrollTop = _this.scrollTop;
            _this.updateScrollSize();
        }));
    };
    /** Returns the theme to be used on the panel. */
    /**
     * Returns the theme to be used on the panel.
     * @return {?}
     */
    McSelect.prototype.getPanelTheme = /**
     * Returns the theme to be used on the panel.
     * @return {?}
     */
    function () {
        return this._parentFormField ? "mc-" + this._parentFormField.color : '';
    };
    /** Focuses the select element. */
    /**
     * Focuses the select element.
     * @return {?}
     */
    McSelect.prototype.focus = /**
     * Focuses the select element.
     * @return {?}
     */
    function () {
        this.elementRef.nativeElement.focus();
    };
    /**
     * Calculates the scroll position of the select's overlay panel.
     *
     * Attempts to center the selected option in the panel. If the option is
     * too high or too low in the panel to be scrolled to the center, it clamps the
     * scroll position to the min or max scroll positions respectively.
     */
    /**
     * Calculates the scroll position of the select's overlay panel.
     *
     * Attempts to center the selected option in the panel. If the option is
     * too high or too low in the panel to be scrolled to the center, it clamps the
     * scroll position to the min or max scroll positions respectively.
     * @param {?} selectedIndex
     * @param {?} scrollBuffer
     * @param {?} maxScroll
     * @return {?}
     */
    McSelect.prototype.calculateOverlayScroll = /**
     * Calculates the scroll position of the select's overlay panel.
     *
     * Attempts to center the selected option in the panel. If the option is
     * too high or too low in the panel to be scrolled to the center, it clamps the
     * scroll position to the min or max scroll positions respectively.
     * @param {?} selectedIndex
     * @param {?} scrollBuffer
     * @param {?} maxScroll
     * @return {?}
     */
    function (selectedIndex, scrollBuffer, maxScroll) {
        /** @type {?} */
        var itemHeight = this.getItemHeight();
        /** @type {?} */
        var optionOffsetFromScrollTop = itemHeight * selectedIndex;
        /* tslint:disable-next-line:no-magic-numbers */
        /** @type {?} */
        var halfOptionHeight = itemHeight / 2;
        // Starts at the optionOffsetFromScrollTop, which scrolls the option to the top of the
        // scroll container, then subtracts the scroll buffer to scroll the option down to
        // the center of the overlay panel. Half the option height must be re-added to the
        // scrollTop so the option is centered based on its middle, not its top edge.
        /** @type {?} */
        var optimalScrollPosition = optionOffsetFromScrollTop - scrollBuffer + halfOptionHeight;
        return Math.min(Math.max(0, optimalScrollPosition), maxScroll);
    };
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    McSelect.prototype.onContainerClick = /**
     * Implemented as part of McFormFieldControl.
     * \@docs-private
     * @return {?}
     */
    function () {
        this.focus();
        this.open();
    };
    /** Invoked when an option is clicked. */
    /**
     * Invoked when an option is clicked.
     * @param {?} option
     * @param {?} $event
     * @return {?}
     */
    McSelect.prototype.onRemoveMatcherItem = /**
     * Invoked when an option is clicked.
     * @param {?} option
     * @param {?} $event
     * @return {?}
     */
    function (option, $event) {
        $event.stopPropagation();
        option.deselect();
    };
    /**
     * @return {?}
     */
    McSelect.prototype.calculateHiddenItems = /**
     * @return {?}
     */
    function () {
        if (this.empty || !this.multiple) {
            return;
        }
        /** @type {?} */
        var visibleItems = 0;
        /** @type {?} */
        var totalItemsWidth = this.getTotalItemsWidthInMatcher();
        /** @type {?} */
        var totalVisibleItemsWidth = 0;
        /** @type {?} */
        var itemMargin = 4;
        this.tags.forEach((/**
         * @param {?} tag
         * @return {?}
         */
        function (tag) {
            if (tag.nativeElement.offsetTop < tag.nativeElement.offsetHeight) {
                totalVisibleItemsWidth += tag.nativeElement.getBoundingClientRect().width + itemMargin;
                visibleItems++;
            }
        }));
        this.hiddenItems = ((/** @type {?} */ (this.selected))).length - visibleItems;
        if (this.hiddenItems) {
            /** @type {?} */
            var itemsCounter = this.trigger.nativeElement.querySelector('.mc-select__match-hidden-text');
            /** @type {?} */
            var matcherList = this.trigger.nativeElement.querySelector('.mc-select__match-list');
            /** @type {?} */
            var itemsCounterShowed = itemsCounter.offsetTop < itemsCounter.offsetHeight;
            // const itemsCounterWidth: number = itemsCounter.getBoundingClientRect().width;
            /** @type {?} */
            var itemsCounterWidth = 86;
            /** @type {?} */
            var matcherListWidth = matcherList.getBoundingClientRect().width;
            /** @type {?} */
            var matcherWidth = matcherListWidth + itemsCounterWidth;
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
    };
    /**
     * @private
     * @return {?}
     */
    McSelect.prototype.getHeightOfOptionsContainer = /**
     * @private
     * @return {?}
     */
    function () {
        return this.optionsContainer.nativeElement.getClientRects()[0].height;
    };
    /**
     * @private
     * @return {?}
     */
    McSelect.prototype.updateScrollSize = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.options.first) {
            return;
        }
        this.keyManager.withScrollSize(Math.floor(this.getHeightOfOptionsContainer() / this.options.first.getHeight()));
    };
    /**
     * @private
     * @return {?}
     */
    McSelect.prototype.getTotalItemsWidthInMatcher = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var triggerClone = this.trigger.nativeElement.cloneNode(true);
        triggerClone.querySelector('.mc-select__match-hidden-text').remove();
        this._renderer.setStyle(triggerClone, 'position', 'absolute');
        this._renderer.setStyle(triggerClone, 'visibility', 'hidden');
        this._renderer.setStyle(triggerClone, 'top', '-100%');
        this._renderer.setStyle(triggerClone, 'left', '0');
        this._renderer.appendChild(this.trigger.nativeElement, triggerClone);
        /** @type {?} */
        var totalItemsWidth = 0;
        /** @type {?} */
        var itemMargin = 4;
        triggerClone.querySelectorAll('mc-tag').forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            totalItemsWidth += (/** @type {?} */ (item.getBoundingClientRect().width)) + itemMargin;
        }));
        triggerClone.remove();
        return totalItemsWidth;
    };
    /** Handles keyboard events while the select is closed. */
    /**
     * Handles keyboard events while the select is closed.
     * @private
     * @param {?} event
     * @return {?}
     */
    McSelect.prototype.handleClosedKeydown = /**
     * Handles keyboard events while the select is closed.
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /* tslint:disable-next-line */
        /** @type {?} */
        var keyCode = event.keyCode;
        /** @type {?} */
        var isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW ||
            keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW;
        /** @type {?} */
        var isOpenKey = keyCode === ENTER || keyCode === SPACE;
        // Open the select on ALT + arrow key to match the native <select>
        if (isOpenKey || ((this.multiple || event.altKey) && isArrowKey)) {
            event.preventDefault(); // prevents the page from scrolling down when pressing space
            this.open();
        }
        else if (!this.multiple) {
            this.keyManager.onKeydown(event);
        }
    };
    /** Handles keyboard events when the selected is open. */
    /**
     * Handles keyboard events when the selected is open.
     * @private
     * @param {?} event
     * @return {?}
     */
    McSelect.prototype.handleOpenKeydown = /**
     * Handles keyboard events when the selected is open.
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /* tslint:disable-next-line */
        /** @type {?} */
        var keyCode = event.keyCode;
        /** @type {?} */
        var isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW;
        /** @type {?} */
        var manager = this.keyManager;
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
            var hasDeselectedOptions_1 = this.options.some((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return !option.selected; }));
            this.options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) {
                if (hasDeselectedOptions_1 && !option.disabled) {
                    option.select();
                }
                else {
                    option.deselect();
                }
            }));
        }
        else {
            /** @type {?} */
            var previouslyFocusedIndex = manager.activeItemIndex;
            manager.onKeydown(event);
            if (this._multiple && isArrowKey && event.shiftKey && manager.activeItem &&
                manager.activeItemIndex !== previouslyFocusedIndex) {
                manager.activeItem.selectViaInteraction();
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    McSelect.prototype.initializeSelection = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        // Defer setting the value in order to avoid the "Expression
        // has changed after it was checked" errors from Angular.
        Promise.resolve().then((/**
         * @return {?}
         */
        function () {
            _this.setSelectionByValue(_this.ngControl ? _this.ngControl.value : _this._value);
        }));
    };
    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     */
    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     * @private
     * @param {?} value
     * @return {?}
     */
    McSelect.prototype.setSelectionByValue = /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
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
            function (currentValue) { return _this.selectValue(currentValue); }));
            this.sortValues();
        }
        else {
            this.selectionModel.clear();
            /** @type {?} */
            var correspondingOption = this.selectValue(value);
            // Shift focus to the active item. Note that we shouldn't do this in multiple
            // mode, because we don't know what option the user interacted with last.
            if (correspondingOption) {
                this.keyManager.setActiveItem(correspondingOption);
            }
        }
        this._changeDetectorRef.markForCheck();
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    McSelect.prototype.getCorrespondOption = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        return this.options.toArray().concat(this.previousSelectionModelSelected).find((/**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            try {
                // Treat null as a special reset value.
                return option.value != null && _this.compareWith(option.value, value);
            }
            catch (error) {
                if (isDevMode()) {
                    // Notify developers of errors in their comparator.
                    console.warn(error);
                }
                return false;
            }
        }));
    };
    /**
     * Finds and selects and option based on its value.
     * @returns Option that has the corresponding value.
     */
    /**
     * Finds and selects and option based on its value.
     * @private
     * @param {?} value
     * @return {?} Option that has the corresponding value.
     */
    McSelect.prototype.selectValue = /**
     * Finds and selects and option based on its value.
     * @private
     * @param {?} value
     * @return {?} Option that has the corresponding value.
     */
    function (value) {
        /** @type {?} */
        var correspondingOption = this.getCorrespondOption(value);
        if (correspondingOption) {
            this.selectionModel.select(correspondingOption);
        }
        return correspondingOption;
    };
    /** Sets up a key manager to listen to keyboard events on the overlay panel. */
    /**
     * Sets up a key manager to listen to keyboard events on the overlay panel.
     * @private
     * @return {?}
     */
    McSelect.prototype.initKeyManager = /**
     * Sets up a key manager to listen to keyboard events on the overlay panel.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var typeAheadDebounce = 200;
        this.keyManager = new ActiveDescendantKeyManager(this.options)
            .withTypeAhead(typeAheadDebounce, this.search ? -1 : 0)
            .withVerticalOrientation()
            .withHorizontalOrientation(this.isRtl() ? 'rtl' : 'ltr');
        this.keyManager.tabOut
            .pipe(takeUntil(this.destroy))
            .subscribe((/**
         * @return {?}
         */
        function () {
            // Restore focus to the trigger before closing. Ensures that the focus
            // position won't be lost if the user got focus into the overlay.
            _this.focus();
            _this.close();
        }));
        this.keyManager.change
            .pipe(takeUntil(this.destroy))
            .subscribe((/**
         * @return {?}
         */
        function () {
            if (_this._panelOpen && _this.panel) {
                _this.scrollActiveOptionIntoView();
            }
            else if (!_this._panelOpen && !_this.multiple && _this.keyManager.activeItem) {
                _this.keyManager.activeItem.selectViaInteraction();
            }
        }));
    };
    /** Drops current option subscriptions and IDs and resets from scratch. */
    /**
     * Drops current option subscriptions and IDs and resets from scratch.
     * @private
     * @return {?}
     */
    McSelect.prototype.resetOptions = /**
     * Drops current option subscriptions and IDs and resets from scratch.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var changedOrDestroyed = merge(this.options.changes, this.destroy);
        this.optionSelectionChanges
            .pipe(takeUntil(changedOrDestroyed))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.onSelect(event.source, event.isUserInput);
            if (_this.search && _this.search.isSearchChanged) {
                Promise.resolve().then((/**
                 * @return {?}
                 */
                function () { return _this.keyManager.setFirstItemActive(); }));
                _this.search.isSearchChanged = false;
            }
            if (event.isUserInput && !_this.multiple && _this._panelOpen) {
                _this.close();
                _this.focus();
            }
        }));
        // Listen to changes in the internal state of the options and react accordingly.
        // Handles cases like the labels of the selected options changing.
        merge.apply(void 0, this.options.map((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return option.stateChanges; }))).pipe(takeUntil(changedOrDestroyed))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this._changeDetectorRef.markForCheck();
            _this.stateChanges.next();
        }));
        this.setOptionIds();
    };
    /** Invoked when an option is clicked. */
    /**
     * Invoked when an option is clicked.
     * @private
     * @param {?} option
     * @param {?} isUserInput
     * @return {?}
     */
    McSelect.prototype.onSelect = /**
     * Invoked when an option is clicked.
     * @private
     * @param {?} option
     * @param {?} isUserInput
     * @return {?}
     */
    function (option, isUserInput) {
        /** @type {?} */
        var wasSelected = this.selectionModel.isSelected(option);
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
    };
    /** Sorts the selected values in the selected based on their order in the panel. */
    /**
     * Sorts the selected values in the selected based on their order in the panel.
     * @private
     * @return {?}
     */
    McSelect.prototype.sortValues = /**
     * Sorts the selected values in the selected based on their order in the panel.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.multiple) {
            /** @type {?} */
            var options_1 = this.options.toArray();
            this.selectionModel.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) {
                return _this.sortComparator ? _this.sortComparator(a, b, options_1) :
                    options_1.indexOf(a) - options_1.indexOf(b);
            }));
            this.stateChanges.next();
        }
    };
    /** Emits change event to set the model value. */
    /**
     * Emits change event to set the model value.
     * @private
     * @param {?=} fallbackValue
     * @return {?}
     */
    McSelect.prototype.propagateChanges = /**
     * Emits change event to set the model value.
     * @private
     * @param {?=} fallbackValue
     * @return {?}
     */
    function (fallbackValue) {
        /** @type {?} */
        var valueToEmit = null;
        if (this.multiple) {
            valueToEmit = ((/** @type {?} */ (this.selected))).map((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return option.value; }));
        }
        else {
            valueToEmit = this.selected ? ((/** @type {?} */ (this.selected))).value : fallbackValue;
        }
        this._value = valueToEmit;
        this.valueChange.emit(valueToEmit);
        this.onChange(valueToEmit);
        this.selectionChange.emit(new McSelectChange(this, valueToEmit));
        this._changeDetectorRef.markForCheck();
    };
    /** Records option IDs to pass to the aria-owns property. */
    /**
     * Records option IDs to pass to the aria-owns property.
     * @private
     * @return {?}
     */
    McSelect.prototype.setOptionIds = /**
     * Records option IDs to pass to the aria-owns property.
     * @private
     * @return {?}
     */
    function () {
        this.optionIds = this.options.map((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return option.id; })).join(' ');
    };
    /**
     * Highlights the selected item. If no option is selected, it will highlight
     * the first item instead.
     */
    /**
     * Highlights the selected item. If no option is selected, it will highlight
     * the first item instead.
     * @private
     * @return {?}
     */
    McSelect.prototype.highlightCorrectOption = /**
     * Highlights the selected item. If no option is selected, it will highlight
     * the first item instead.
     * @private
     * @return {?}
     */
    function () {
        if (this.keyManager) {
            if (this.empty) {
                this.keyManager.setFirstItemActive();
            }
            else {
                this.keyManager.setActiveItem(this.selectionModel.selected[0]);
            }
        }
    };
    /** Scrolls the active option into view. */
    /**
     * Scrolls the active option into view.
     * @private
     * @return {?}
     */
    McSelect.prototype.scrollActiveOptionIntoView = /**
     * Scrolls the active option into view.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var activeOptionIndex = this.keyManager.activeItemIndex || 0;
        /** @type {?} */
        var labelCount = countGroupLabelsBeforeOption(activeOptionIndex, this.options, this.optionGroups);
        this.optionsContainer.nativeElement.scrollTop = getOptionScrollPosition(activeOptionIndex + labelCount, this.getItemHeight(), this.optionsContainer.nativeElement.scrollTop, SELECT_PANEL_MAX_HEIGHT);
    };
    /** Gets the index of the provided option in the option list. */
    /**
     * Gets the index of the provided option in the option list.
     * @private
     * @param {?} option
     * @return {?}
     */
    McSelect.prototype.getOptionIndex = /**
     * Gets the index of the provided option in the option list.
     * @private
     * @param {?} option
     * @return {?}
     */
    function (option) {
        /* tslint:disable-next-line */
        return this.options.reduce((/**
         * @param {?} result
         * @param {?} current
         * @param {?} index
         * @return {?}
         */
        function (result, current, index) {
            /* tslint:disable-next-line:strict-type-predicates */
            return result === undefined ? (option === current ? index : undefined) : result;
        }), undefined);
    };
    /** Calculates the scroll position and x- and y-offsets of the overlay panel. */
    /**
     * Calculates the scroll position and x- and y-offsets of the overlay panel.
     * @private
     * @return {?}
     */
    McSelect.prototype.calculateOverlayPosition = /**
     * Calculates the scroll position and x- and y-offsets of the overlay panel.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var itemHeight = this.getItemHeight();
        /** @type {?} */
        var items = this.getItemCount();
        /** @type {?} */
        var panelHeight = Math.min(items * itemHeight, SELECT_PANEL_MAX_HEIGHT);
        /** @type {?} */
        var scrollContainerHeight = items * itemHeight;
        // The farthest the panel can be scrolled before it hits the bottom
        /** @type {?} */
        var maxScroll = scrollContainerHeight - panelHeight;
        // If no value is selected we open the popup to the first item.
        /** @type {?} */
        var selectedOptionOffset = this.empty ? 0 : (/** @type {?} */ (this.getOptionIndex(this.selectionModel.selected[0])));
        selectedOptionOffset += countGroupLabelsBeforeOption(selectedOptionOffset, this.options, this.optionGroups);
        // We must maintain a scroll buffer so the selected option will be scrolled to the
        // center of the overlay panel rather than the top.
        /* tslint:disable-next-line:no-magic-numbers */
        /** @type {?} */
        var scrollBuffer = panelHeight / 2;
        this.scrollTop = this.calculateOverlayScroll(selectedOptionOffset, scrollBuffer, maxScroll);
        this.offsetY = this.calculateOverlayOffsetY();
        this.checkOverlayWithinViewport(maxScroll);
    };
    /**
     * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text when
     * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
     * can't be calculated until the panel has been attached, because we need to know the
     * content width in order to constrain the panel within the viewport.
     */
    /**
     * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text when
     * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
     * can't be calculated until the panel has been attached, because we need to know the
     * content width in order to constrain the panel within the viewport.
     * @private
     * @return {?}
     */
    McSelect.prototype.calculateOverlayOffsetX = /**
     * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text when
     * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
     * can't be calculated until the panel has been attached, because we need to know the
     * content width in order to constrain the panel within the viewport.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var overlayRect = this.overlayDir.overlayRef.overlayElement.getBoundingClientRect();
        /** @type {?} */
        var viewportSize = this._viewportRuler.getViewportSize();
        /** @type {?} */
        var isRtl = this.isRtl();
        /* tslint:disable-next-line:no-magic-numbers */
        /** @type {?} */
        var paddingWidth = SELECT_PANEL_PADDING_X * 2;
        /** @type {?} */
        var offsetX;
        /** @type {?} */
        var selected = this.selectionModel.selected[0] || this.options.first;
        offsetX = selected && selected.group ? SELECT_PANEL_INDENT_PADDING_X : SELECT_PANEL_PADDING_X;
        // Invert the offset in LTR.
        if (!isRtl) {
            offsetX *= -1;
        }
        // Determine how much the select overflows on each side.
        /** @type {?} */
        var leftOverflow = 0 - (overlayRect.left + offsetX - (isRtl ? paddingWidth : 0));
        /** @type {?} */
        var rightOverflow = overlayRect.right + offsetX - viewportSize.width
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
    };
    /**
     * Calculates the y-offset of the select's overlay panel in relation to the
     * top start corner of the trigger. It has to be adjusted in order for the
     * selected option to be aligned over the trigger when the panel opens.
     */
    /**
     * Calculates the y-offset of the select's overlay panel in relation to the
     * top start corner of the trigger. It has to be adjusted in order for the
     * selected option to be aligned over the trigger when the panel opens.
     * @private
     * @return {?}
     */
    McSelect.prototype.calculateOverlayOffsetY = /**
     * Calculates the y-offset of the select's overlay panel in relation to the
     * top start corner of the trigger. It has to be adjusted in order for the
     * selected option to be aligned over the trigger when the panel opens.
     * @private
     * @return {?}
     */
    function () {
        // const itemHeight = this.getItemHeight();
        // const optionHeightAdjustment = (itemHeight - this.triggerRect.height) / 2;
        // todo I'm not sure that we will use it
        return 0;
        // return Math.round(-optionHeightAdjustment);
    };
    /**
     * Checks that the attempted overlay position will fit within the viewport.
     * If it will not fit, tries to adjust the scroll position and the associated
     * y-offset so the panel can open fully on-screen. If it still won't fit,
     * sets the offset back to 0 to allow the fallback position to take over.
     */
    /**
     * Checks that the attempted overlay position will fit within the viewport.
     * If it will not fit, tries to adjust the scroll position and the associated
     * y-offset so the panel can open fully on-screen. If it still won't fit,
     * sets the offset back to 0 to allow the fallback position to take over.
     * @private
     * @param {?} maxScroll
     * @return {?}
     */
    McSelect.prototype.checkOverlayWithinViewport = /**
     * Checks that the attempted overlay position will fit within the viewport.
     * If it will not fit, tries to adjust the scroll position and the associated
     * y-offset so the panel can open fully on-screen. If it still won't fit,
     * sets the offset back to 0 to allow the fallback position to take over.
     * @private
     * @param {?} maxScroll
     * @return {?}
     */
    function (maxScroll) {
        /** @type {?} */
        var itemHeight = this.getItemHeight();
        /** @type {?} */
        var viewportSize = this._viewportRuler.getViewportSize();
        /** @type {?} */
        var topSpaceAvailable = this.triggerRect.top - SELECT_PANEL_VIEWPORT_PADDING;
        /** @type {?} */
        var bottomSpaceAvailable = viewportSize.height - this.triggerRect.bottom - SELECT_PANEL_VIEWPORT_PADDING;
        /** @type {?} */
        var panelHeightTop = Math.abs(this.offsetY);
        /** @type {?} */
        var totalPanelHeight = Math.min(this.getItemCount() * itemHeight, SELECT_PANEL_MAX_HEIGHT);
        /** @type {?} */
        var panelHeightBottom = totalPanelHeight - panelHeightTop - this.triggerRect.height;
        if (panelHeightBottom > bottomSpaceAvailable) {
            this.adjustPanelUp(panelHeightBottom, bottomSpaceAvailable);
        }
        else if (panelHeightTop > topSpaceAvailable) {
            this.adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll);
        }
        else {
            this.transformOrigin = this.getOriginBasedOnOption();
        }
    };
    /** Adjusts the overlay panel up to fit in the viewport. */
    /**
     * Adjusts the overlay panel up to fit in the viewport.
     * @private
     * @param {?} panelHeightBottom
     * @param {?} bottomSpaceAvailable
     * @return {?}
     */
    McSelect.prototype.adjustPanelUp = /**
     * Adjusts the overlay panel up to fit in the viewport.
     * @private
     * @param {?} panelHeightBottom
     * @param {?} bottomSpaceAvailable
     * @return {?}
     */
    function (panelHeightBottom, bottomSpaceAvailable) {
        // Browsers ignore fractional scroll offsets, so we need to round.
        /** @type {?} */
        var distanceBelowViewport = Math.round(panelHeightBottom - bottomSpaceAvailable);
        // Scrolls the panel up by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel up into the viewport.
        this.scrollTop -= distanceBelowViewport;
        this.offsetY -= distanceBelowViewport;
        this.transformOrigin = this.getOriginBasedOnOption();
        // If the panel is scrolled to the very top, it won't be able to fit the panel
        // by scrolling, so set the offset to 0 to allow the fallback position to take
        // effect.
        if (this.scrollTop <= 0) {
            this.scrollTop = 0;
            this.offsetY = 0;
            this.transformOrigin = "50% bottom 0px";
        }
    };
    /** Adjusts the overlay panel down to fit in the viewport. */
    /**
     * Adjusts the overlay panel down to fit in the viewport.
     * @private
     * @param {?} panelHeightTop
     * @param {?} topSpaceAvailable
     * @param {?} maxScroll
     * @return {?}
     */
    McSelect.prototype.adjustPanelDown = /**
     * Adjusts the overlay panel down to fit in the viewport.
     * @private
     * @param {?} panelHeightTop
     * @param {?} topSpaceAvailable
     * @param {?} maxScroll
     * @return {?}
     */
    function (panelHeightTop, topSpaceAvailable, maxScroll) {
        // Browsers ignore fractional scroll offsets, so we need to round.
        /** @type {?} */
        var distanceAboveViewport = Math.round(panelHeightTop - topSpaceAvailable);
        // Scrolls the panel down by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel down into the viewport.
        this.scrollTop += distanceAboveViewport;
        this.offsetY += distanceAboveViewport;
        this.transformOrigin = this.getOriginBasedOnOption();
        // If the panel is scrolled to the very bottom, it won't be able to fit the
        // panel by scrolling, so set the offset to 0 to allow the fallback position
        // to take effect.
        if (this.scrollTop >= maxScroll) {
            this.scrollTop = maxScroll;
            this.offsetY = 0;
            this.transformOrigin = "50% top 0px";
            return;
        }
    };
    /** Sets the transform origin point based on the selected option. */
    /**
     * Sets the transform origin point based on the selected option.
     * @private
     * @return {?}
     */
    McSelect.prototype.getOriginBasedOnOption = /**
     * Sets the transform origin point based on the selected option.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var itemHeight = this.getItemHeight();
        /* tslint:disable-next-line:no-magic-numbers */
        /** @type {?} */
        var optionHeightAdjustment = (itemHeight - this.triggerRect.height) / 2;
        /* tslint:disable-next-line:no-magic-numbers */
        /** @type {?} */
        var originY = Math.abs(this.offsetY) - optionHeightAdjustment + itemHeight / 2;
        return "50% " + originY + "px 0px";
    };
    /** Calculates the amount of items in the select. This includes options and group labels. */
    /**
     * Calculates the amount of items in the select. This includes options and group labels.
     * @private
     * @return {?}
     */
    McSelect.prototype.getItemCount = /**
     * Calculates the amount of items in the select. This includes options and group labels.
     * @private
     * @return {?}
     */
    function () {
        return this.options.length + this.optionGroups.length;
    };
    /** Calculates the height of the select's options. */
    /**
     * Calculates the height of the select's options.
     * @private
     * @return {?}
     */
    McSelect.prototype.getItemHeight = /**
     * Calculates the height of the select's options.
     * @private
     * @return {?}
     */
    function () {
        // todo доделать
        /* tslint:disable-next-line:no-magic-numbers */
        return 32;
        // return this.triggerFontSize * SELECT_ITEM_HEIGHT_EM;
    };
    McSelect.decorators = [
        { type: Component, args: [{
                    selector: 'mc-select',
                    exportAs: 'mcSelect',
                    template: "<div cdk-overlay-origin class=\"mc-select__trigger\" (click)=\"toggle()\" [class.mc-select__trigger_multiple]=\"multiple\" #origin=\"cdkOverlayOrigin\" #trigger><div class=\"mc-select__matcher\" [ngSwitch]=\"empty\"><span class=\"mc-select__placeholder\" *ngSwitchCase=\"true\">{{ placeholder || '\u00A0' }}</span> <span *ngSwitchCase=\"false\" [ngSwitch]=\"!!customTrigger\"><div *ngSwitchDefault [ngSwitch]=\"multiple\" class=\"mc-select__match-container\"><span *ngSwitchCase=\"false\" class=\"mc-select__matcher-text\">{{ triggerValue }}</span><div *ngSwitchCase=\"true\" class=\"mc-select__match-list\"><mc-tag *ngFor=\"let option of triggerValues\" [disabled]=\"disabled\" [class.mc-error]=\"errorState\">{{ option.viewValue || option.value }} <i mc-icon=\"mc-close-S_16\" (click)=\"onRemoveMatcherItem(option, $event)\"></i></mc-tag></div><div class=\"mc-select__match-hidden-text\" [style.display]=\"hiddenItems > 0 ? 'block' : 'none'\">{{ hiddenItemsText }} {{ hiddenItems }}</div></div><ng-content select=\"mc-select-trigger\" *ngSwitchCase=\"true\"></ng-content></span></div><div class=\"mc-select__arrow-wrapper\"><i class=\"mc-select__arrow\" mc-icon=\"mc-angle-down-L_16\" color=\"second\"></i></div></div><ng-template cdk-connected-overlay cdkConnectedOverlayLockPosition cdkConnectedOverlayHasBackdrop cdkConnectedOverlayBackdropClass=\"cdk-overlay-transparent-backdrop\" [cdkConnectedOverlayScrollStrategy]=\"scrollStrategy\" [cdkConnectedOverlayOrigin]=\"origin\" [cdkConnectedOverlayOpen]=\"panelOpen\" [cdkConnectedOverlayPositions]=\"positions\" [cdkConnectedOverlayMinWidth]=\"triggerRect?.width\" [cdkConnectedOverlayOffsetY]=\"offsetY\" (backdropClick)=\"close()\" (attach)=\"onAttached()\" (detach)=\"close()\"><div #panel class=\"mc-select__panel {{ getPanelTheme() }}\" [ngClass]=\"panelClass\" (@transformPanel.done)=\"panelDoneAnimatingStream.next($event.toState)\" [style.transformOrigin]=\"transformOrigin\" [class.mc-select-panel-done-animcing]=\"panelDoneAnimating\" [style.font-size.px]=\"triggerFontSize\" (keydown)=\"handleKeydown($event)\"><div *ngIf=\"search\" class=\"mc-select__search-container\"><ng-content select=\"[mcSelectSearch]\"></ng-content></div><div #optionsContainer class=\"mc-select__content\" [@fadeInContent]=\"'showing'\" (@fadeInContent.done)=\"onFadeInDone()\"><div *ngIf=\"isEmptySearchResult\" class=\"mc-select__no-options-message\"><ng-content select=\"[mc-select-search-empty-result]\"></ng-content></div><ng-content select=\"mc-option,mc-optgroup\"></ng-content></div></div></ng-template>",
                    styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}.mc-select{box-sizing:border-box;display:inline-block;width:100%;outline:0}.mc-select.mc-disabled .mc-select__trigger{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.mc-select__no-options-message{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;position:relative;max-width:100%;height:32px;cursor:default;outline:0;padding:0 16px}.mc-select__trigger{display:flex;box-sizing:border-box;position:relative;height:30px;cursor:pointer;padding:3px 7px 3px 15px}.mc-select__trigger.mc-select__trigger_multiple{padding-left:7px}.mc-select__matcher{display:flex;align-items:center;width:100%;overflow:hidden;text-overflow:ellipsis;margin-top:-2px;white-space:nowrap}.mc-select__matcher>span{width:100%}.mc-select__match-list{display:flex;flex-wrap:wrap;overflow:hidden;max-height:26px;margin:0;padding-left:0}.mc-select__match-list .mc-tag{margin-right:4px}.mc-select__match-container{display:flex;flex-direction:row;justify-content:space-between;width:100%}.mc-select__match-container .mc-select__match-hidden-text{flex:0 0 70px;align-self:center;padding:0 8px;text-align:right}.mc-select__match-item{display:flex;border:1px solid transparent;border-radius:3px;padding-left:7px;margin-right:4px;max-width:100%}.mc-select__arrow-wrapper{display:table-cell;vertical-align:middle}.mc-form-field-appearance-fill .mc-select__arrow-wrapper,.mc-form-field-appearance-standard .mc-select__arrow-wrapper{transform:translateY(-50%)}.mc-form-field-appearance-outline .mc-select__arrow-wrapper{transform:translateY(-25%)}.mc-select__panel{min-width:100%;overflow:hidden;border-width:1px;border-style:solid;border-bottom-left-radius:3px;border-bottom-right-radius:3px;padding:4px 0}.mc-select__content{max-height:224px;overflow:auto}.mc-select__panel .mc-optgroup-label,.mc-select__panel .mc-option{font-size:inherit;line-height:32px;height:32px}.mc-form-field-type-mc-select:not(.mc-disabled) .mc-form-field-flex{cursor:pointer}.mc-form-field-type-mc-select .mc-form-field-label{width:calc(100% - 18px)}"],
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
                    ]
                },] },
    ];
    /** @nocollapse */
    McSelect.ctorParameters = function () { return [
        { type: ViewportRuler },
        { type: ChangeDetectorRef },
        { type: NgZone },
        { type: Renderer2 },
        { type: ErrorStateMatcher },
        { type: ElementRef },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: NgForm, decorators: [{ type: Optional }] },
        { type: FormGroupDirective, decorators: [{ type: Optional }] },
        { type: McFormField, decorators: [{ type: Optional }] },
        { type: NgControl, decorators: [{ type: Self }, { type: Optional }] },
        { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
        { type: undefined, decorators: [{ type: Inject, args: [MC_SELECT_SCROLL_STRATEGY,] }] }
    ]; };
    McSelect.propDecorators = {
        trigger: [{ type: ViewChild, args: ['trigger', { static: false },] }],
        panel: [{ type: ViewChild, args: ['panel', { static: false },] }],
        optionsContainer: [{ type: ViewChild, args: ['optionsContainer', { static: false },] }],
        overlayDir: [{ type: ViewChild, args: [CdkConnectedOverlay, { static: false },] }],
        tags: [{ type: ViewChildren, args: [McTag,] }],
        customTrigger: [{ type: ContentChild, args: [McSelectTrigger, { static: false },] }],
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
        id: [{ type: Input }]
    };
    return McSelect;
}(McSelectMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McSelectModule = /** @class */ (function () {
    function McSelectModule() {
    }
    McSelectModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        McOptionModule,
                        McIconModule,
                        McTagsModule
                    ],
                    exports: [
                        McFormFieldModule,
                        McSelect,
                        McSelectSearch,
                        McSelectSearchEmptyResult,
                        McSelectTrigger,
                        McOptionModule,
                        CommonModule
                    ],
                    declarations: [
                        McSelect,
                        McSelectSearch,
                        McSelectSearchEmptyResult,
                        McSelectTrigger
                    ],
                    providers: [MC_SELECT_SCROLL_STRATEGY_PROVIDER]
                },] },
    ];
    return McSelectModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McSelectModule, SELECT_ITEM_HEIGHT_EM, McSelectChange, McSelectBase, McSelectSearch, McSelectSearchEmptyResult, McSelectTrigger, McSelect };
//# sourceMappingURL=select.es5.js.map
