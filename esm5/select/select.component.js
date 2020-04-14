/**
 * @fileoverview added by tsickle
 * Generated from: select.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends, __read, __spread } from "tslib";
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
var nextUniqueId = 0;
/**
 * Change event object that is emitted when the select value has changed.
 */
var /**
 * Change event object that is emitted when the select value has changed.
 */
McSelectChange = /** @class */ (function () {
    function McSelectChange(source, value) {
        this.source = source;
        this.value = value;
    }
    return McSelectChange;
}());
/**
 * Change event object that is emitted when the select value has changed.
 */
export { McSelectChange };
if (false) {
    /** @type {?} */
    McSelectChange.prototype.source;
    /** @type {?} */
    McSelectChange.prototype.value;
}
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
                },] }
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
export { McSelectSearch };
if (false) {
    /** @type {?} */
    McSelectSearch.prototype.input;
    /** @type {?} */
    McSelectSearch.prototype.searchChangesSubscription;
    /** @type {?} */
    McSelectSearch.prototype.isSearchChanged;
}
var McSelectSearchEmptyResult = /** @class */ (function () {
    function McSelectSearchEmptyResult() {
    }
    McSelectSearchEmptyResult.decorators = [
        { type: Directive, args: [{
                    selector: '[mc-select-search-empty-result]',
                    exportAs: 'mcSelectSearchEmptyResult'
                },] }
    ];
    return McSelectSearchEmptyResult;
}());
export { McSelectSearchEmptyResult };
var McSelectTrigger = /** @class */ (function () {
    function McSelectTrigger() {
    }
    McSelectTrigger.decorators = [
        { type: Directive, args: [{ selector: 'mc-select-trigger' },] }
    ];
    return McSelectTrigger;
}());
export { McSelectTrigger };
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
export { McSelectBase };
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
var McSelectMixinBase = mixinTabIndex(mixinDisabled(mixinErrorState(McSelectBase)));
var McSelect = /** @class */ (function (_super) {
    __extends(McSelect, _super);
    function McSelect(_viewportRuler, _changeDetectorRef, _ngZone, _renderer, defaultErrorStateMatcher, elementRef, rawValidators, _dir, parentForm, parentFormGroup, _parentFormField, ngControl, ngModel, formControlName, _scrollStrategyFactory, mcValidation) {
        var _this = _super.call(this, elementRef, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) || this;
        _this._viewportRuler = _viewportRuler;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._ngZone = _ngZone;
        _this._renderer = _renderer;
        _this.rawValidators = rawValidators;
        _this._dir = _dir;
        _this._parentFormField = _parentFormField;
        _this.ngModel = ngModel;
        _this.formControlName = formControlName;
        _this._scrollStrategyFactory = _scrollStrategyFactory;
        _this.mcValidation = mcValidation;
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
                return merge.apply(void 0, __spread(_this.options.map((/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) { return option.onSelectionChange; })), _this.selectionModel.selected.map((/**
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
        set: /**
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
    Object.defineProperty(McSelect.prototype, "canShowCleaner", {
        get: /**
         * @return {?}
         */
        function () {
            return this.cleaner && this.selectionModel.hasValue();
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
     * @param {?} hiddenItemsText
     * @param {?} hiddenItems
     * @return {?}
     */
    McSelect.prototype.hiddenItemsTextFormatter = /**
     * @param {?} hiddenItemsText
     * @param {?} hiddenItems
     * @return {?}
     */
    function (hiddenItemsText, hiddenItems) {
        return hiddenItemsText + " " + hiddenItems;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    McSelect.prototype.clearValue = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        $event.stopPropagation();
        this.selectionModel.clear();
        this.keyManager.setActiveItem(-1);
        this.propagateChanges();
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
        if (!this._panelOpen) {
            return;
        }
        // the order of calls is important
        this.resetSearch();
        this._panelOpen = false;
        this.keyManager.withHorizontalOrientation(this.isRtl() ? 'rtl' : 'ltr');
        this._changeDetectorRef.markForCheck();
        this.onTouched();
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
            /** @type {?} */
            var selectedOptions = this.selectionModel.selected;
            if (this.isRtl()) {
                selectedOptions.reverse();
            }
            return selectedOptions;
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
        var _this = this;
        if (this.customTrigger || this.empty || !this.multiple) {
            return;
        }
        /** @type {?} */
        var visibleItems = 0;
        /** @type {?} */
        var totalItemsWidth = this.getTotalItemsWidthInMatcher();
        /** @type {?} */
        var totalVisibleItemsWidth = 0;
        this.tags.forEach((/**
         * @param {?} tag
         * @return {?}
         */
        function (tag) {
            if (tag.nativeElement.offsetTop < tag.nativeElement.offsetHeight) {
                totalVisibleItemsWidth += _this.getItemWidth(tag.nativeElement);
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
     * @return {?}
     */
    McSelect.prototype.getItemHeight = /**
     * @return {?}
     */
    function () {
        return this.options.first ? this.options.first.getHeight() : 0;
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
        var _this = this;
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
        triggerClone.querySelectorAll('mc-tag').forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            totalItemsWidth += _this.getItemWidth(item);
        }));
        triggerClone.remove();
        return totalItemsWidth;
    };
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    McSelect.prototype.getItemWidth = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var computedStyle = window.getComputedStyle(element);
        /** @type {?} */
        var width = parseInt((/** @type {?} */ (computedStyle.width)));
        /** @type {?} */
        var marginLeft = parseInt((/** @type {?} */ (computedStyle.marginLeft)));
        /** @type {?} */
        var marginRight = parseInt((/** @type {?} */ (computedStyle.marginRight)));
        return width + marginLeft + marginRight;
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
        return __spread(this.options.toArray(), this.previousSelectionModelSelected).find((/**
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
        merge.apply(void 0, __spread(this.options.map((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return option.stateChanges; })))).pipe(takeUntil(changedOrDestroyed))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this._changeDetectorRef.markForCheck();
            _this.stateChanges.next();
        }));
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
    McSelect.ctorParameters = function () { return [
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
    ]; };
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
    return McSelect;
}(McSelectMixinBase));
export { McSelect };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9zZWxlY3QvIiwic291cmNlcyI6WyJzZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIsYUFBYSxFQUNoQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFHSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFNBQVMsRUFFVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFJTixRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsSUFBSSxFQUVKLFNBQVMsRUFDVCxZQUFZLEVBQ1osaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFFSCxlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLGFBQWEsRUFDYixTQUFTLEVBQ1QsTUFBTSxFQUNOLE9BQU8sRUFFVixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xFLE9BQU8sRUFDSCxVQUFVLEVBQ1YsR0FBRyxFQUNILEtBQUssRUFDTCxJQUFJLEVBQ0osVUFBVSxFQUNWLFdBQVcsRUFDWCxLQUFLLEVBQ0wsUUFBUSxFQUNSLENBQUMsRUFDRCxNQUFNLEVBQ04sT0FBTyxFQUNQLFNBQVMsRUFDWixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFDSCw0QkFBNEIsRUFD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RTs7Ozs7SUFDMUUsZ0NBQTRFIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGU6bm8tZW1wdHkgKi9cblxuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtcbiAgICBDZGtDb25uZWN0ZWRPdmVybGF5LFxuICAgIFZpZXdwb3J0UnVsZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRGlyZWN0aXZlLFxuICAgIERvQ2hlY2ssXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIGlzRGV2TW9kZSxcbiAgICBOZ1pvbmUsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgU2VsZixcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q2hpbGRyZW4sXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIEZvcm1Db250cm9sTmFtZSxcbiAgICBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgTkdfVkFMSURBVE9SUyxcbiAgICBOZ0NvbnRyb2wsXG4gICAgTmdGb3JtLFxuICAgIE5nTW9kZWwsXG4gICAgVmFsaWRhdG9yXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2ExMXknO1xuaW1wb3J0IHtcbiAgICBET1dOX0FSUk9XLFxuICAgIEVORCxcbiAgICBFTlRFUixcbiAgICBIT01FLFxuICAgIExFRlRfQVJST1csXG4gICAgUklHSFRfQVJST1csXG4gICAgU1BBQ0UsXG4gICAgVVBfQVJST1csXG4gICAgQSxcbiAgICBFU0NBUEUsXG4gICAgUEFHRV9VUCxcbiAgICBQQUdFX0RPV05cbn0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gICAgY291bnRHcm91cExhYmVsc0JlZm9yZU9wdGlvbixcbiAgICBnZXRPcHRpb25TY3JvbGxQb3NpdGlvbixcbiAgICBDYW5EaXNhYmxlLFxuICAgIENhbkRpc2FibGVDdG9yLFxuICAgIENhblVwZGF0ZUVycm9yU3RhdGUsXG4gICAgQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IsXG4gICAgRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgSGFzVGFiSW5kZXgsXG4gICAgSGFzVGFiSW5kZXhDdG9yLFxuICAgIE1DX09QVElPTl9QQVJFTlRfQ09NUE9ORU5ULFxuICAgIE1jT3B0Z3JvdXAsXG4gICAgTWNPcHRpb24sXG4gICAgTWNPcHRpb25TZWxlY3Rpb25DaGFuZ2UsXG4gICAgbWl4aW5EaXNhYmxlZCxcbiAgICBtaXhpbkVycm9yU3RhdGUsXG4gICAgbWl4aW5UYWJJbmRleCxcbiAgICBtY1NlbGVjdEFuaW1hdGlvbnMsXG5cbiAgICBTRUxFQ1RfUEFORUxfSU5ERU5UX1BBRERJTkdfWCxcbiAgICBTRUxFQ1RfUEFORUxfTUFYX0hFSUdIVCxcbiAgICBTRUxFQ1RfUEFORUxfUEFERElOR19YLFxuICAgIFNFTEVDVF9QQU5FTF9WSUVXUE9SVF9QQURESU5HLFxuICAgIE1DX1NFTEVDVF9TQ1JPTExfU1RSQVRFR1ksXG5cbiAgICBnZXRNY1NlbGVjdER5bmFtaWNNdWx0aXBsZUVycm9yLFxuICAgIGdldE1jU2VsZWN0Tm9uRnVuY3Rpb25WYWx1ZUVycm9yLFxuICAgIGdldE1jU2VsZWN0Tm9uQXJyYXlWYWx1ZUVycm9yLFxuXG4gICAgc2V0TW9zYWljVmFsaWRhdGlvbixcbiAgICBNQ19WQUxJREFUSU9OLFxuICAgIE1jVmFsaWRhdGlvbk9wdGlvbnNcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNDbGVhbmVyLCBNY0Zvcm1GaWVsZCwgTWNGb3JtRmllbGRDb250cm9sIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgTWNJbnB1dCB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9pbnB1dCc7XG5pbXBvcnQgeyBNY1RhZyB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy90YWdzJztcbmltcG9ydCB7IGRlZmVyLCBtZXJnZSwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICAgIGZpbHRlcixcbiAgICBtYXAsXG4gICAgc3RhcnRXaXRoLFxuICAgIHN3aXRjaE1hcCxcbiAgICB0YWtlLFxuICAgIHRha2VVbnRpbCxcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKiBDaGFuZ2UgZXZlbnQgb2JqZWN0IHRoYXQgaXMgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3QgdmFsdWUgaGFzIGNoYW5nZWQuICovXG5leHBvcnQgY2xhc3MgTWNTZWxlY3RDaGFuZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2U6IE1jU2VsZWN0LCBwdWJsaWMgdmFsdWU6IGFueSkge31cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNTZWxlY3RTZWFyY2hdJyxcbiAgICBleHBvcnRBczogJ21jU2VsZWN0U2VhcmNoJyxcbiAgICBob3N0OiB7XG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNTZWxlY3RTZWFyY2ggaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIEBDb250ZW50Q2hpbGQoTWNJbnB1dCwgeyBzdGF0aWM6IGZhbHNlIH0pIGlucHV0OiBNY0lucHV0O1xuXG4gICAgc2VhcmNoQ2hhbmdlc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gICAgaXNTZWFyY2hDaGFuZ2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihmb3JtRmllbGQ6IE1jRm9ybUZpZWxkKSB7XG4gICAgICAgIGZvcm1GaWVsZC5jYW5DbGVhbmVyQ2xlYXJCeUVzYyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlucHV0LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgcmVzZXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXQubmdDb250cm9sLnJlc2V0KCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuaW5wdXQpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdNY1NlbGVjdFNlYXJjaCBkb2VzIG5vdCB3b3JrIHdpdGhvdXQgbWNJbnB1dCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmlucHV0Lm5nQ29udHJvbCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ01jU2VsZWN0U2VhcmNoIGRvZXMgbm90IHdvcmsgd2l0aG91dCBuZ0NvbnRyb2wnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VhcmNoQ2hhbmdlc1N1YnNjcmlwdGlvbiA9IHRoaXMuaW5wdXQubmdDb250cm9sLnZhbHVlQ2hhbmdlcyEuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNTZWFyY2hDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VhcmNoQ2hhbmdlc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBFU0NBUEUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlucHV0LnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttYy1zZWxlY3Qtc2VhcmNoLWVtcHR5LXJlc3VsdF0nLFxuICAgIGV4cG9ydEFzOiAnbWNTZWxlY3RTZWFyY2hFbXB0eVJlc3VsdCdcbn0pXG5leHBvcnQgY2xhc3MgTWNTZWxlY3RTZWFyY2hFbXB0eVJlc3VsdCB7fVxuXG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ21jLXNlbGVjdC10cmlnZ2VyJyB9KVxuZXhwb3J0IGNsYXNzIE1jU2VsZWN0VHJpZ2dlciB7fVxuXG5cbmV4cG9ydCBjbGFzcyBNY1NlbGVjdEJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHVibGljIGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgICAgIHB1YmxpYyBwYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgICAgIHB1YmxpYyBwYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICAgICAgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sXG4gICAgKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmNvbnN0IE1jU2VsZWN0TWl4aW5CYXNlOiBDYW5EaXNhYmxlQ3RvciAmIEhhc1RhYkluZGV4Q3RvciAmIENhblVwZGF0ZUVycm9yU3RhdGVDdG9yICZcbiAgICB0eXBlb2YgTWNTZWxlY3RCYXNlID0gbWl4aW5UYWJJbmRleChtaXhpbkRpc2FibGVkKG1peGluRXJyb3JTdGF0ZShNY1NlbGVjdEJhc2UpKSk7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1zZWxlY3QnLFxuICAgIGV4cG9ydEFzOiAnbWNTZWxlY3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnc2VsZWN0Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NlbGVjdC5zY3NzJ10sXG4gICAgaW5wdXRzOiBbJ2Rpc2FibGVkJywgJ3RhYkluZGV4J10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBob3N0OiB7XG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcblxuICAgICAgICBjbGFzczogJ21jLXNlbGVjdCcsXG4gICAgICAgICdbY2xhc3MubWMtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1pbnZhbGlkXSc6ICdlcnJvclN0YXRlJyxcblxuICAgICAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleWRvd24oJGV2ZW50KScsXG4gICAgICAgICcoZm9jdXMpJzogJ29uRm9jdXMoKScsXG4gICAgICAgICcoYmx1ciknOiAnb25CbHVyKCknLFxuICAgICAgICAnKHdpbmRvdzpyZXNpemUpJzogJ2NhbGN1bGF0ZUhpZGRlbkl0ZW1zKCknXG4gICAgfSxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIG1jU2VsZWN0QW5pbWF0aW9ucy50cmFuc2Zvcm1QYW5lbCxcbiAgICAgICAgbWNTZWxlY3RBbmltYXRpb25zLmZhZGVJbkNvbnRlbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IE1jRm9ybUZpZWxkQ29udHJvbCwgdXNlRXhpc3Rpbmc6IE1jU2VsZWN0IH0sXG4gICAgICAgIHsgcHJvdmlkZTogTUNfT1BUSU9OX1BBUkVOVF9DT01QT05FTlQsIHVzZUV4aXN0aW5nOiBNY1NlbGVjdCB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNY1NlbGVjdCBleHRlbmRzIE1jU2VsZWN0TWl4aW5CYXNlIGltcGxlbWVudHNcbiAgICBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBEb0NoZWNrLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgQ2FuRGlzYWJsZSxcbiAgICBIYXNUYWJJbmRleCwgTWNGb3JtRmllbGRDb250cm9sPGFueT4sIENhblVwZGF0ZUVycm9yU3RhdGUge1xuXG4gICAgLyoqIEEgbmFtZSBmb3IgdGhpcyBjb250cm9sIHRoYXQgY2FuIGJlIHVzZWQgYnkgYG1jLWZvcm0tZmllbGRgLiAqL1xuICAgIGNvbnRyb2xUeXBlID0gJ21jLXNlbGVjdCc7XG5cbiAgICBoaWRkZW5JdGVtczogbnVtYmVyID0gMDtcblxuICAgIC8qKiBUaGUgbGFzdCBtZWFzdXJlZCB2YWx1ZSBmb3IgdGhlIHRyaWdnZXIncyBjbGllbnQgYm91bmRpbmcgcmVjdC4gKi9cbiAgICB0cmlnZ2VyUmVjdDogQ2xpZW50UmVjdDtcblxuICAgIC8qKiBUaGUgY2FjaGVkIGZvbnQtc2l6ZSBvZiB0aGUgdHJpZ2dlciBlbGVtZW50LiAqL1xuICAgIHRyaWdnZXJGb250U2l6ZSA9IDA7XG5cbiAgICAvKiogRGVhbHMgd2l0aCB0aGUgc2VsZWN0aW9uIGxvZ2ljLiAqL1xuICAgIHNlbGVjdGlvbk1vZGVsOiBTZWxlY3Rpb25Nb2RlbDxNY09wdGlvbj47XG5cbiAgICBwcmV2aW91c1NlbGVjdGlvbk1vZGVsU2VsZWN0ZWQ6IE1jT3B0aW9uW10gPSBbXTtcblxuICAgIC8qKiBNYW5hZ2VzIGtleWJvYXJkIGV2ZW50cyBmb3Igb3B0aW9ucyBpbiB0aGUgcGFuZWwuICovXG4gICAga2V5TWFuYWdlcjogQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8TWNPcHRpb24+O1xuXG4gICAgLyoqIFRoZSB2YWx1ZSBvZiB0aGUgc2VsZWN0IHBhbmVsJ3MgdHJhbnNmb3JtLW9yaWdpbiBwcm9wZXJ0eS4gKi9cbiAgICB0cmFuc2Zvcm1PcmlnaW46IHN0cmluZyA9ICd0b3AnO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHBhbmVsJ3MgYW5pbWF0aW9uIGlzIGRvbmUuICovXG4gICAgcGFuZWxEb25lQW5pbWF0aW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgcGFuZWwgZWxlbWVudCBpcyBmaW5pc2hlZCB0cmFuc2Zvcm1pbmcgaW4uICovXG4gICAgcGFuZWxEb25lQW5pbWF0aW5nU3RyZWFtID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gICAgLyoqIFN0cmF0ZWd5IHRoYXQgd2lsbCBiZSB1c2VkIHRvIGhhbmRsZSBzY3JvbGxpbmcgd2hpbGUgdGhlIHNlbGVjdCBwYW5lbCBpcyBvcGVuLiAqL1xuICAgIHNjcm9sbFN0cmF0ZWd5ID0gdGhpcy5fc2Nyb2xsU3RyYXRlZ3lGYWN0b3J5KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgeS1vZmZzZXQgb2YgdGhlIG92ZXJsYXkgcGFuZWwgaW4gcmVsYXRpb24gdG8gdGhlIHRyaWdnZXIncyB0b3Agc3RhcnQgY29ybmVyLlxuICAgICAqIFRoaXMgbXVzdCBiZSBhZGp1c3RlZCB0byBhbGlnbiB0aGUgc2VsZWN0ZWQgb3B0aW9uIHRleHQgb3ZlciB0aGUgdHJpZ2dlciB0ZXh0LlxuICAgICAqIHdoZW4gdGhlIHBhbmVsIG9wZW5zLiBXaWxsIGNoYW5nZSBiYXNlZCBvbiB0aGUgeS1wb3NpdGlvbiBvZiB0aGUgc2VsZWN0ZWQgb3B0aW9uLlxuICAgICAqL1xuICAgIG9mZnNldFkgPSAwO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBwb3NpdGlvbiBjb25maWcgZW5zdXJlcyB0aGF0IHRoZSB0b3AgXCJzdGFydFwiIGNvcm5lciBvZiB0aGUgb3ZlcmxheVxuICAgICAqIGlzIGFsaWduZWQgd2l0aCB3aXRoIHRoZSB0b3AgXCJzdGFydFwiIG9mIHRoZSBvcmlnaW4gYnkgZGVmYXVsdCAob3ZlcmxhcHBpbmdcbiAgICAgKiB0aGUgdHJpZ2dlciBjb21wbGV0ZWx5KS4gSWYgdGhlIHBhbmVsIGNhbm5vdCBmaXQgYmVsb3cgdGhlIHRyaWdnZXIsIGl0XG4gICAgICogd2lsbCBmYWxsIGJhY2sgdG8gYSBwb3NpdGlvbiBhYm92ZSB0aGUgdHJpZ2dlci5cbiAgICAgKi9cbiAgICBwb3NpdGlvbnMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICAgICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcbiAgICAgICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgICAgICAgb3ZlcmxheVk6ICd0b3AnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICAgICAgICBvcmlnaW5ZOiAndG9wJyxcbiAgICAgICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgICAgICAgb3ZlcmxheVk6ICdib3R0b20nXG4gICAgICAgIH1cbiAgICBdO1xuXG4gICAgQFZpZXdDaGlsZCgndHJpZ2dlcicsIHsgc3RhdGljOiBmYWxzZSB9KSB0cmlnZ2VyOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgncGFuZWwnLCB7IHN0YXRpYzogZmFsc2UgfSkgcGFuZWw6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdvcHRpb25zQ29udGFpbmVyJywgeyBzdGF0aWM6IGZhbHNlIH0pIG9wdGlvbnNDb250YWluZXI6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKENka0Nvbm5lY3RlZE92ZXJsYXksIHsgc3RhdGljOiBmYWxzZSB9KSBvdmVybGF5RGlyOiBDZGtDb25uZWN0ZWRPdmVybGF5O1xuXG4gICAgQFZpZXdDaGlsZHJlbihNY1RhZykgdGFnczogUXVlcnlMaXN0PE1jVGFnPjtcblxuICAgIC8qKiBVc2VyLXN1cHBsaWVkIG92ZXJyaWRlIG9mIHRoZSB0cmlnZ2VyIGVsZW1lbnQuICovXG4gICAgQENvbnRlbnRDaGlsZChNY1NlbGVjdFRyaWdnZXIsIHsgc3RhdGljOiBmYWxzZSB9KSBjdXN0b21UcmlnZ2VyOiBNY1NlbGVjdFRyaWdnZXI7XG5cbiAgICBAQ29udGVudENoaWxkKCdtY1NlbGVjdENsZWFuZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBjbGVhbmVyOiBNY0NsZWFuZXI7XG5cbiAgICAvKiogQWxsIG9mIHRoZSBkZWZpbmVkIHNlbGVjdCBvcHRpb25zLiAqL1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNPcHRpb24sIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgb3B0aW9uczogUXVlcnlMaXN0PE1jT3B0aW9uPjtcblxuICAgIC8qKiBBbGwgb2YgdGhlIGRlZmluZWQgZ3JvdXBzIG9mIG9wdGlvbnMuICovXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY09wdGdyb3VwKSBvcHRpb25Hcm91cHM6IFF1ZXJ5TGlzdDxNY09wdGdyb3VwPjtcblxuICAgIEBDb250ZW50Q2hpbGQoTWNTZWxlY3RTZWFyY2gsIHsgc3RhdGljOiBmYWxzZSB9KSBzZWFyY2g6IE1jU2VsZWN0U2VhcmNoO1xuXG4gICAgQElucHV0KCkgaGlkZGVuSXRlbXNUZXh0OiBzdHJpbmcgPSAnLi4u0LXRidGRJztcblxuICAgIC8qKiBDbGFzc2VzIHRvIGJlIHBhc3NlZCB0byB0aGUgc2VsZWN0IHBhbmVsLiBTdXBwb3J0cyB0aGUgc2FtZSBzeW50YXggYXMgYG5nQ2xhc3NgLiAqL1xuICAgIEBJbnB1dCgpIHBhbmVsQ2xhc3M6IHN0cmluZyB8IHN0cmluZ1tdIHwgU2V0PHN0cmluZz4gfCB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xuXG4gICAgLyoqIE9iamVjdCB1c2VkIHRvIGNvbnRyb2wgd2hlbiBlcnJvciBtZXNzYWdlcyBhcmUgc2hvd24uICovXG4gICAgQElucHV0KCkgZXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyO1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdXNlZCB0byBzb3J0IHRoZSB2YWx1ZXMgaW4gYSBzZWxlY3QgaW4gbXVsdGlwbGUgbW9kZS5cbiAgICAgKiBGb2xsb3dzIHRoZSBzYW1lIGxvZ2ljIGFzIGBBcnJheS5wcm90b3R5cGUuc29ydGAuXG4gICAgICovXG4gICAgQElucHV0KCkgc29ydENvbXBhcmF0b3I6IChhOiBNY09wdGlvbiwgYjogTWNPcHRpb24sIG9wdGlvbnM6IE1jT3B0aW9uW10pID0+IG51bWJlcjtcblxuICAgIC8qKiBDb21iaW5lZCBzdHJlYW0gb2YgYWxsIG9mIHRoZSBjaGlsZCBvcHRpb25zJyBjaGFuZ2UgZXZlbnRzLiAqL1xuICAgIHJlYWRvbmx5IG9wdGlvblNlbGVjdGlvbkNoYW5nZXM6IE9ic2VydmFibGU8TWNPcHRpb25TZWxlY3Rpb25DaGFuZ2U+ID0gZGVmZXIoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gbWVyZ2UoXG4gICAgICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiBvcHRpb24ub25TZWxlY3Rpb25DaGFuZ2UpLFxuICAgICAgICAgICAgICAgIC4uLnRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWQubWFwKChvcHRpb24pID0+IG9wdGlvbi5vblNlbGVjdGlvbkNoYW5nZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fbmdab25lLm9uU3RhYmxlXG4gICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSksIHN3aXRjaE1hcCgoKSA9PiB0aGlzLm9wdGlvblNlbGVjdGlvbkNoYW5nZXMpKTtcbiAgICB9KSBhcyBPYnNlcnZhYmxlPE1jT3B0aW9uU2VsZWN0aW9uQ2hhbmdlPjtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCBwYW5lbCBoYXMgYmVlbiB0b2dnbGVkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBvcGVuZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCBoYXMgYmVlbiBvcGVuZWQuICovXG4gICAgQE91dHB1dCgnb3BlbmVkJykgcmVhZG9ubHkgb3BlbmVkU3RyZWFtOiBPYnNlcnZhYmxlPHZvaWQ+ID1cbiAgICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UucGlwZShmaWx0ZXIoKG8pID0+IG8pLCBtYXAoKCkgPT4ge30pKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCBoYXMgYmVlbiBjbG9zZWQuICovXG4gICAgQE91dHB1dCgnY2xvc2VkJykgcmVhZG9ubHkgY2xvc2VkU3RyZWFtOiBPYnNlcnZhYmxlPHZvaWQ+ID1cbiAgICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UucGlwZShmaWx0ZXIoKG8pID0+ICFvKSwgbWFwKCgpID0+IHt9KSk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3RlZCB2YWx1ZSBoYXMgYmVlbiBjaGFuZ2VkIGJ5IHRoZSB1c2VyLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxNY1NlbGVjdENoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1jU2VsZWN0Q2hhbmdlPigpO1xuXG4gICAgLyoqXG4gICAgICogRXZlbnQgdGhhdCBlbWl0cyB3aGVuZXZlciB0aGUgcmF3IHZhbHVlIG9mIHRoZSBzZWxlY3QgY2hhbmdlcy4gVGhpcyBpcyBoZXJlIHByaW1hcmlseVxuICAgICAqIHRvIGZhY2lsaXRhdGUgdGhlIHR3by13YXkgYmluZGluZyBmb3IgdGhlIGB2YWx1ZWAgaW5wdXQuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wbGFjZWhvbGRlcjtcbiAgICB9XG5cbiAgICBzZXQgcGxhY2Vob2xkZXIodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHZhbHVlO1xuXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9wbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXF1aXJlZDtcbiAgICB9XG5cbiAgICBzZXQgcmVxdWlyZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fcmVxdWlyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tdWx0aXBsZTtcbiAgICB9XG5cbiAgICBzZXQgbXVsdGlwbGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZWwpIHtcbiAgICAgICAgICAgIHRocm93IGdldE1jU2VsZWN0RHluYW1pY011bHRpcGxlRXJyb3IoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX211bHRpcGxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tdWx0aXBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gY29tcGFyZSB0aGUgb3B0aW9uIHZhbHVlcyB3aXRoIHRoZSBzZWxlY3RlZCB2YWx1ZXMuIFRoZSBmaXJzdCBhcmd1bWVudFxuICAgICAqIGlzIGEgdmFsdWUgZnJvbSBhbiBvcHRpb24uIFRoZSBzZWNvbmQgaXMgYSB2YWx1ZSBmcm9tIHRoZSBzZWxlY3Rpb24uIEEgYm9vbGVhblxuICAgICAqIHNob3VsZCBiZSByZXR1cm5lZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBjb21wYXJlV2l0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBhcmVXaXRoO1xuICAgIH1cblxuICAgIHNldCBjb21wYXJlV2l0aChmbjogKG8xOiBhbnksIG8yOiBhbnkpID0+IGJvb2xlYW4pIHtcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnN0cmljdC10eXBlLXByZWRpY2F0ZXMgKi9cbiAgICAgICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgZ2V0TWNTZWxlY3ROb25GdW5jdGlvblZhbHVlRXJyb3IoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NvbXBhcmVXaXRoID0gZm47XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZWwpIHtcbiAgICAgICAgICAgIC8vIEEgZGlmZmVyZW50IGNvbXBhcmF0b3IgbWVhbnMgdGhlIHNlbGVjdGlvbiBjb3VsZCBjaGFuZ2UuXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBWYWx1ZSBvZiB0aGUgc2VsZWN0IGNvbnRyb2wuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZShuZXdWYWx1ZTogYW55KSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy5fdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMud3JpdGVWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdmFsdWU6IGFueTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG5cbiAgICBzZXQgaWQodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9pZCA9IHZhbHVlIHx8IHRoaXMudWlkO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBzZWxlY3QgaXMgZm9jdXNlZC4gKi9cbiAgICBnZXQgZm9jdXNlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZvY3VzZWQgfHwgdGhpcy5fcGFuZWxPcGVuO1xuICAgIH1cblxuICAgIHNldCBmb2N1c2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9mb2N1c2VkID0gZmFsc2U7XG5cbiAgICBnZXQgcGFuZWxPcGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFuZWxPcGVuO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3BhbmVsT3BlbiA9IGZhbHNlO1xuXG4gICAgZ2V0IGlzRW1wdHlTZWFyY2hSZXN1bHQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXJjaCAmJiB0aGlzLm9wdGlvbnMubGVuZ3RoID09PSAwICYmICEhdGhpcy5zZWFyY2guaW5wdXQudmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGNhblNob3dDbGVhbmVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jbGVhbmVyICYmIHRoaXMuc2VsZWN0aW9uTW9kZWwuaGFzVmFsdWUoKTtcbiAgICB9XG5cbiAgICAvKiogVGhlIHNjcm9sbCBwb3NpdGlvbiBvZiB0aGUgb3ZlcmxheSBwYW5lbCwgY2FsY3VsYXRlZCB0byBjZW50ZXIgdGhlIHNlbGVjdGVkIG9wdGlvbi4gKi9cbiAgICBwcml2YXRlIHNjcm9sbFRvcCA9IDA7XG5cbiAgICAvKiogVW5pcXVlIGlkIGZvciB0aGlzIGlucHV0LiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgdWlkID0gYG1jLXNlbGVjdC0ke25leHRVbmlxdWVJZCsrfWA7XG5cbiAgICAvKiogRW1pdHMgd2hlbmV2ZXIgdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF92aWV3cG9ydFJ1bGVyOiBWaWV3cG9ydFJ1bGVyLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX25nWm9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE5HX1ZBTElEQVRPUlMpIHB1YmxpYyByYXdWYWxpZGF0b3JzOiBWYWxpZGF0b3JbXSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByZWFkb25seSBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcGFyZW50Rm9ybTogTmdGb3JtLFxuICAgICAgICBAT3B0aW9uYWwoKSBwYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByZWFkb25seSBfcGFyZW50Rm9ybUZpZWxkOiBNY0Zvcm1GaWVsZCxcbiAgICAgICAgQFNlbGYoKSBAT3B0aW9uYWwoKSBuZ0NvbnRyb2w6IE5nQ29udHJvbCxcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgbmdNb2RlbDogTmdNb2RlbCxcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgZm9ybUNvbnRyb2xOYW1lOiBGb3JtQ29udHJvbE5hbWUsXG4gICAgICAgIEBJbmplY3QoTUNfU0VMRUNUX1NDUk9MTF9TVFJBVEVHWSkgcHJpdmF0ZSByZWFkb25seSBfc2Nyb2xsU3RyYXRlZ3lGYWN0b3J5LFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1DX1ZBTElEQVRJT04pIHByaXZhdGUgbWNWYWxpZGF0aW9uOiBNY1ZhbGlkYXRpb25PcHRpb25zXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYsIGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlciwgcGFyZW50Rm9ybSwgcGFyZW50Rm9ybUdyb3VwLCBuZ0NvbnRyb2wpO1xuXG4gICAgICAgIGlmICh0aGlzLm5nQ29udHJvbCkge1xuICAgICAgICAgICAgLy8gTm90ZTogd2UgcHJvdmlkZSB0aGUgdmFsdWUgYWNjZXNzb3IgdGhyb3VnaCBoZXJlLCBpbnN0ZWFkIG9mXG4gICAgICAgICAgICAvLyB0aGUgYHByb3ZpZGVyc2AgdG8gYXZvaWQgcnVubmluZyBpbnRvIGEgY2lyY3VsYXIgaW1wb3J0LlxuICAgICAgICAgICAgdGhpcy5uZ0NvbnRyb2wudmFsdWVBY2Nlc3NvciA9IHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGb3JjZSBzZXR0ZXIgdG8gYmUgY2FsbGVkIGluIGNhc2UgaWQgd2FzIG5vdCBzcGVjaWZpZWQuXG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLmlkO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsPE1jT3B0aW9uPih0aGlzLm11bHRpcGxlKTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuXG4gICAgICAgIC8vIFdlIG5lZWQgYGRpc3RpbmN0VW50aWxDaGFuZ2VkYCBoZXJlLCBiZWNhdXNlIHNvbWUgYnJvd3NlcnMgd2lsbFxuICAgICAgICAvLyBmaXJlIHRoZSBhbmltYXRpb24gZW5kIGV2ZW50IHR3aWNlIGZvciB0aGUgc2FtZSBhbmltYXRpb24uIFNlZTpcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMjQwODRcbiAgICAgICAgdGhpcy5wYW5lbERvbmVBbmltYXRpbmdTdHJlYW1cbiAgICAgICAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UuZW1pdCh0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5lZENoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYW5lbERvbmVBbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5RGlyLm9mZnNldFggPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLm1jVmFsaWRhdGlvbi51c2VWYWxpZGF0aW9uKSB7XG4gICAgICAgICAgICBzZXRNb3NhaWNWYWxpZGF0aW9uKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0S2V5TWFuYWdlcigpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuY2hhbmdlZFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50LmFkZGVkLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uLnNlbGVjdCgpKTtcbiAgICAgICAgICAgICAgICBldmVudC5yZW1vdmVkLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uLmRlc2VsZWN0KCkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zLmNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKHN0YXJ0V2l0aChudWxsKSwgdGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0T3B0aW9ucygpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNlbGVjdGlvbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhZ3MuY2hhbmdlc1xuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNhbGN1bGF0ZUhpZGRlbkl0ZW1zKCksIDApO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdEb0NoZWNrKCkge1xuICAgICAgICBpZiAodGhpcy5uZ0NvbnRyb2wpIHsgdGhpcy51cGRhdGVFcnJvclN0YXRlKCk7IH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIC8vIFVwZGF0aW5nIHRoZSBkaXNhYmxlZCBzdGF0ZSBpcyBoYW5kbGVkIGJ5IGBtaXhpbkRpc2FibGVkYCwgYnV0IHdlIG5lZWQgdG8gYWRkaXRpb25hbGx5IGxldFxuICAgICAgICAvLyB0aGUgcGFyZW50IGZvcm0gZmllbGQga25vdyB0byBydW4gY2hhbmdlIGRldGVjdGlvbiB3aGVuIHRoZSBkaXNhYmxlZCBzdGF0ZSBjaGFuZ2VzLlxuICAgICAgICBpZiAoY2hhbmdlcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuZGVzdHJveS5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgaGlkZGVuSXRlbXNUZXh0Rm9ybWF0dGVyKGhpZGRlbkl0ZW1zVGV4dDogc3RyaW5nLCBoaWRkZW5JdGVtczogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke2hpZGRlbkl0ZW1zVGV4dH0gJHtoaWRkZW5JdGVtc31gO1xuICAgIH1cblxuICAgIGNsZWFyVmFsdWUoJGV2ZW50KTogdm9pZCB7XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKC0xKTtcblxuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZXMoKTtcbiAgICB9XG5cbiAgICAvKiogYFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gdmFsdWUgY2hhbmdlc2AgKi9cbiAgICBvbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAgIC8qKiBgVmlldyAtPiBtb2RlbCBjYWxsYmFjayBjYWxsZWQgd2hlbiBzZWxlY3QgaGFzIGJlZW4gdG91Y2hlZGAgKi9cbiAgICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICAgIHJlc2V0U2VhcmNoKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zZWFyY2gpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoLnJlc2V0KCk7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgdG9kbyB0aGUgaW5jb3JyZWN0IGJlaGF2aW91ciBvZiBrZXlNYW5hZ2VyIGlzIHBvc3NpYmxlIGhlcmVcbiAgICAgICAgICAgIHRvIGF2b2lkIGZpcnN0IGl0ZW0gc2VsZWN0aW9uICh0byBwcm92aWRlIGNvcnJlY3Qgb3B0aW9ucyBmbGlwcGluZyBvbiBjbG9zZWQgc2VsZWN0KVxuICAgICAgICAgICAgd2Ugc2hvdWxkIHByb2Nlc3Mgb3B0aW9ucyB1cGRhdGUgbGlrZSBpdCBpcyB0aGUgZmlyc3Qgb3B0aW9ucyBhcHBlYXJhbmNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuc2VhcmNoLmlzU2VhcmNoQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFRvZ2dsZXMgdGhlIG92ZXJsYXkgcGFuZWwgb3BlbiBvciBjbG9zZWQuICovXG4gICAgdG9nZ2xlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIE9wZW5zIHRoZSBvdmVybGF5IHBhbmVsLiAqL1xuICAgIG9wZW4oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICF0aGlzLm9wdGlvbnMgfHwgIXRoaXMub3B0aW9ucy5sZW5ndGggfHwgdGhpcy5fcGFuZWxPcGVuKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMudHJpZ2dlclJlY3QgPSB0aGlzLnRyaWdnZXIubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgLy8gTm90ZTogVGhlIGNvbXB1dGVkIGZvbnQtc2l6ZSB3aWxsIGJlIGEgc3RyaW5nIHBpeGVsIHZhbHVlIChlLmcuIFwiMTZweFwiKS5cbiAgICAgICAgLy8gYHBhcnNlSW50YCBpZ25vcmVzIHRoZSB0cmFpbGluZyAncHgnIGFuZCBjb252ZXJ0cyB0aGlzIHRvIGEgbnVtYmVyLlxuICAgICAgICB0aGlzLnRyaWdnZXJGb250U2l6ZSA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUodGhpcy50cmlnZ2VyLm5hdGl2ZUVsZW1lbnQpWydmb250LXNpemUnXSk7XG5cbiAgICAgICAgdGhpcy5fcGFuZWxPcGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24obnVsbCk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0Q29ycmVjdE9wdGlvbigpO1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcblxuICAgICAgICAvLyBTZXQgdGhlIGZvbnQgc2l6ZSBvbiB0aGUgcGFuZWwgZWxlbWVudCBvbmNlIGl0IGV4aXN0cy5cbiAgICAgICAgdGhpcy5fbmdab25lLm9uU3RhYmxlLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpZ2dlckZvbnRTaXplICYmIHRoaXMub3ZlcmxheURpci5vdmVybGF5UmVmICYmIHRoaXMub3ZlcmxheURpci5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheURpci5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gYCR7dGhpcy50cmlnZ2VyRm9udFNpemV9cHhgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBDbG9zZXMgdGhlIG92ZXJsYXkgcGFuZWwgYW5kIGZvY3VzZXMgdGhlIGhvc3QgZWxlbWVudC4gKi9cbiAgICBjbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9wYW5lbE9wZW4pIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgLy8gdGhlIG9yZGVyIG9mIGNhbGxzIGlzIGltcG9ydGFudFxuICAgICAgICB0aGlzLnJlc2V0U2VhcmNoKCk7XG4gICAgICAgIHRoaXMuX3BhbmVsT3BlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmtleU1hbmFnZXIud2l0aEhvcml6b250YWxPcmllbnRhdGlvbih0aGlzLmlzUnRsKCkgPyAncnRsJyA6ICdsdHInKTtcblxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBzZWxlY3QncyB2YWx1ZS4gUGFydCBvZiB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gICAgICogcmVxdWlyZWQgdG8gaW50ZWdyYXRlIHdpdGggQW5ndWxhcidzIGNvcmUgZm9ybXMgQVBJLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlIE5ldyB2YWx1ZSB0byBiZSB3cml0dGVuIHRvIHRoZSBtb2RlbC5cbiAgICAgKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25CeVZhbHVlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNhdmVzIGEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCB3aGVuIHRoZSBzZWxlY3QncyB2YWx1ZVxuICAgICAqIGNoYW5nZXMgZnJvbSB1c2VyIGlucHV0LiBQYXJ0IG9mIHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgICAgKiByZXF1aXJlZCB0byBpbnRlZ3JhdGUgd2l0aCBBbmd1bGFyJ3MgY29yZSBmb3JtcyBBUEkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZm4gQ2FsbGJhY2sgdG8gYmUgdHJpZ2dlcmVkIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXMuXG4gICAgICovXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNhdmVzIGEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCB3aGVuIHRoZSBzZWxlY3QgaXMgYmx1cnJlZFxuICAgICAqIGJ5IHRoZSB1c2VyLiBQYXJ0IG9mIHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2UgcmVxdWlyZWRcbiAgICAgKiB0byBpbnRlZ3JhdGUgd2l0aCBBbmd1bGFyJ3MgY29yZSBmb3JtcyBBUEkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZm4gQ2FsbGJhY2sgdG8gYmUgdHJpZ2dlcmVkIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiB0b3VjaGVkLlxuICAgICAqL1xuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc2FibGVzIHRoZSBzZWxlY3QuIFBhcnQgb2YgdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZSByZXF1aXJlZFxuICAgICAqIHRvIGludGVncmF0ZSB3aXRoIEFuZ3VsYXIncyBjb3JlIGZvcm1zIEFQSS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpc0Rpc2FibGVkIFNldHMgd2hldGhlciB0aGUgY29tcG9uZW50IGlzIGRpc2FibGVkLlxuICAgICAqL1xuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWQoKTogTWNPcHRpb24gfCBNY09wdGlvbltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGUgPyB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdGVkIDogdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZFswXTtcbiAgICB9XG5cbiAgICBnZXQgdHJpZ2dlclZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLmVtcHR5KSB7IHJldHVybiAnJzsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdGVkWzBdLnZpZXdWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgdHJpZ2dlclZhbHVlcygpOiBNY09wdGlvbltdIHtcbiAgICAgICAgaWYgKHRoaXMuZW1wdHkpIHsgcmV0dXJuIFtdOyB9XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb25zID0gdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZDtcblxuICAgICAgICBpZiAodGhpcy5pc1J0bCgpKSB7IHNlbGVjdGVkT3B0aW9ucy5yZXZlcnNlKCk7IH1cblxuICAgICAgICByZXR1cm4gc2VsZWN0ZWRPcHRpb25zO1xuICAgIH1cblxuICAgIGdldCBlbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnNlbGVjdGlvbk1vZGVsIHx8IHRoaXMuc2VsZWN0aW9uTW9kZWwuaXNFbXB0eSgpO1xuICAgIH1cblxuICAgIGlzUnRsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlyID8gdGhpcy5fZGlyLnZhbHVlID09PSAncnRsJyA6IGZhbHNlO1xuICAgIH1cblxuICAgIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU9wZW5LZXlkb3duKGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDbG9zZWRLZXlkb3duKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gdGhlIHBhbmVsIGNvbnRlbnQgaXMgZG9uZSBmYWRpbmcgaW4sIHRoZSBwYW5lbERvbmVBbmltYXRpbmcgcHJvcGVydHkgaXNcbiAgICAgKiBzZXQgc28gdGhlIHByb3BlciBjbGFzcyBjYW4gYmUgYWRkZWQgdG8gdGhlIHBhbmVsLlxuICAgICAqL1xuICAgIG9uRmFkZUluRG9uZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYW5lbERvbmVBbmltYXRpbmcgPSB0aGlzLnBhbmVsT3BlbjtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoICYmIHRoaXMuX3BhbmVsT3Blbikge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2guZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRm9jdXMoKSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fZm9jdXNlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxzIHRoZSB0b3VjaGVkIGNhbGxiYWNrIG9ubHkgaWYgdGhlIHBhbmVsIGlzIGNsb3NlZC4gT3RoZXJ3aXNlLCB0aGUgdHJpZ2dlciB3aWxsXG4gICAgICogXCJibHVyXCIgdG8gdGhlIHBhbmVsIHdoZW4gaXQgb3BlbnMsIGNhdXNpbmcgYSBmYWxzZSBwb3NpdGl2ZS5cbiAgICAgKi9cbiAgICBvbkJsdXIoKSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgIXRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0aGF0IGlzIGludm9rZWQgd2hlbiB0aGUgb3ZlcmxheSBwYW5lbCBoYXMgYmVlbiBhdHRhY2hlZC5cbiAgICAgKi9cbiAgICBvbkF0dGFjaGVkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm92ZXJsYXlEaXIucG9zaXRpb25DaGFuZ2VcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVPdmVybGF5T2Zmc2V0WCgpO1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IHRoaXMuc2Nyb2xsVG9wO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JvbGxTaXplKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyB0aGUgdGhlbWUgdG8gYmUgdXNlZCBvbiB0aGUgcGFuZWwuICovXG4gICAgZ2V0UGFuZWxUaGVtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50Rm9ybUZpZWxkID8gYG1jLSR7dGhpcy5fcGFyZW50Rm9ybUZpZWxkLmNvbG9yfWAgOiAnJztcbiAgICB9XG5cbiAgICAvKiogRm9jdXNlcyB0aGUgc2VsZWN0IGVsZW1lbnQuICovXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNY0Zvcm1GaWVsZENvbnRyb2wuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uQ29udGFpbmVyQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuXG4gICAgLyoqIEludm9rZWQgd2hlbiBhbiBvcHRpb24gaXMgY2xpY2tlZC4gKi9cbiAgICBvblJlbW92ZU1hdGNoZXJJdGVtKG9wdGlvbjogTWNPcHRpb24sICRldmVudCk6IHZvaWQge1xuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlSGlkZGVuSXRlbXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbVRyaWdnZXIgfHwgdGhpcy5lbXB0eSB8fCAhdGhpcy5tdWx0aXBsZSkgeyByZXR1cm47IH1cblxuICAgICAgICBsZXQgdmlzaWJsZUl0ZW1zOiBudW1iZXIgPSAwO1xuICAgICAgICBjb25zdCB0b3RhbEl0ZW1zV2lkdGggPSB0aGlzLmdldFRvdGFsSXRlbXNXaWR0aEluTWF0Y2hlcigpO1xuICAgICAgICBsZXQgdG90YWxWaXNpYmxlSXRlbXNXaWR0aDogbnVtYmVyID0gMDtcblxuICAgICAgICB0aGlzLnRhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XG4gICAgICAgICAgICBpZiAodGFnLm5hdGl2ZUVsZW1lbnQub2Zmc2V0VG9wIDwgdGFnLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdG90YWxWaXNpYmxlSXRlbXNXaWR0aCArPSB0aGlzLmdldEl0ZW1XaWR0aCh0YWcubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgdmlzaWJsZUl0ZW1zKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaGlkZGVuSXRlbXMgPSAodGhpcy5zZWxlY3RlZCBhcyBBcnJheUxpa2U8TWNPcHRpb24+KS5sZW5ndGggLSB2aXNpYmxlSXRlbXM7XG5cbiAgICAgICAgaWYgKHRoaXMuaGlkZGVuSXRlbXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zQ291bnRlciA9IHRoaXMudHJpZ2dlci5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYy1zZWxlY3RfX21hdGNoLWhpZGRlbi10ZXh0Jyk7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVyTGlzdCA9IHRoaXMudHJpZ2dlci5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYy1zZWxlY3RfX21hdGNoLWxpc3QnKTtcblxuICAgICAgICAgICAgY29uc3QgaXRlbXNDb3VudGVyU2hvd2VkID0gaXRlbXNDb3VudGVyLm9mZnNldFRvcCA8IGl0ZW1zQ291bnRlci5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAvLyBjb25zdCBpdGVtc0NvdW50ZXJXaWR0aDogbnVtYmVyID0gaXRlbXNDb3VudGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICAgICAgY29uc3QgaXRlbXNDb3VudGVyV2lkdGg6IG51bWJlciA9IDg2O1xuXG4gICAgICAgICAgICBjb25zdCBtYXRjaGVyTGlzdFdpZHRoOiBudW1iZXIgPSBtYXRjaGVyTGlzdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXJXaWR0aDogbnVtYmVyID0gbWF0Y2hlckxpc3RXaWR0aCArIGl0ZW1zQ291bnRlcldpZHRoO1xuXG4gICAgICAgICAgICBpZiAoaXRlbXNDb3VudGVyU2hvd2VkICYmICh0b3RhbEl0ZW1zV2lkdGggPCBtYXRjaGVyV2lkdGgpKSB7IHRoaXMuaGlkZGVuSXRlbXMgPSAwOyB9XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0b3RhbFZpc2libGVJdGVtc1dpZHRoID09PSBtYXRjaGVyTGlzdFdpZHRoIHx8XG4gICAgICAgICAgICAgICAgKHRvdGFsVmlzaWJsZUl0ZW1zV2lkdGggKyBpdGVtc0NvdW50ZXJXaWR0aCkgPCBtYXRjaGVyTGlzdFdpZHRoXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFpdGVtc0NvdW50ZXJTaG93ZWQgJiYgKHRvdGFsSXRlbXNXaWR0aCArIGl0ZW1zQ291bnRlcldpZHRoKSA+IG1hdGNoZXJXaWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZGVuSXRlbXMrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGdldEl0ZW1IZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5maXJzdCA/IHRoaXMub3B0aW9ucy5maXJzdC5nZXRIZWlnaHQoKSA6IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRIZWlnaHRPZk9wdGlvbnNDb250YWluZXIoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LmdldENsaWVudFJlY3RzKClbMF0uaGVpZ2h0O1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlU2Nyb2xsU2l6ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuZmlyc3QpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLndpdGhTY3JvbGxTaXplKFxuICAgICAgICAgICAgTWF0aC5mbG9vcih0aGlzLmdldEhlaWdodE9mT3B0aW9uc0NvbnRhaW5lcigpIC8gdGhpcy5vcHRpb25zLmZpcnN0LmdldEhlaWdodCgpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VG90YWxJdGVtc1dpZHRoSW5NYXRjaGVyKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHRyaWdnZXJDbG9uZSA9IHRoaXMudHJpZ2dlci5uYXRpdmVFbGVtZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgdHJpZ2dlckNsb25lLnF1ZXJ5U2VsZWN0b3IoJy5tYy1zZWxlY3RfX21hdGNoLWhpZGRlbi10ZXh0JykucmVtb3ZlKCk7XG5cbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodHJpZ2dlckNsb25lLCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodHJpZ2dlckNsb25lLCAndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodHJpZ2dlckNsb25lLCAndG9wJywgJy0xMDAlJyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRyaWdnZXJDbG9uZSwgJ2xlZnQnLCAnMCcpO1xuXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMudHJpZ2dlci5uYXRpdmVFbGVtZW50LCB0cmlnZ2VyQ2xvbmUpO1xuXG4gICAgICAgIGxldCB0b3RhbEl0ZW1zV2lkdGg6IG51bWJlciA9IDA7XG4gICAgICAgIHRyaWdnZXJDbG9uZS5xdWVyeVNlbGVjdG9yQWxsKCdtYy10YWcnKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0b3RhbEl0ZW1zV2lkdGggKz0gdGhpcy5nZXRJdGVtV2lkdGgoaXRlbSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRyaWdnZXJDbG9uZS5yZW1vdmUoKTtcblxuICAgICAgICByZXR1cm4gdG90YWxJdGVtc1dpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SXRlbVdpZHRoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuXG4gICAgICAgIGNvbnN0IHdpZHRoOiBudW1iZXIgPSBwYXJzZUludChjb21wdXRlZFN0eWxlLndpZHRoIGFzIHN0cmluZyk7XG4gICAgICAgIGNvbnN0IG1hcmdpbkxlZnQ6IG51bWJlciA9IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUubWFyZ2luTGVmdCBhcyBzdHJpbmcpO1xuICAgICAgICBjb25zdCBtYXJnaW5SaWdodDogbnVtYmVyID0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS5tYXJnaW5SaWdodCBhcyBzdHJpbmcpO1xuXG4gICAgICAgIHJldHVybiB3aWR0aCArIG1hcmdpbkxlZnQgKyBtYXJnaW5SaWdodDtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyBrZXlib2FyZCBldmVudHMgd2hpbGUgdGhlIHNlbGVjdCBpcyBjbG9zZWQuICovXG4gICAgcHJpdmF0ZSBoYW5kbGVDbG9zZWRLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSAqL1xuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcbiAgICAgICAgY29uc3QgaXNBcnJvd0tleSA9IGtleUNvZGUgPT09IERPV05fQVJST1cgfHwga2V5Q29kZSA9PT0gVVBfQVJST1cgfHxcbiAgICAgICAgICAgIGtleUNvZGUgPT09IExFRlRfQVJST1cgfHwga2V5Q29kZSA9PT0gUklHSFRfQVJST1c7XG4gICAgICAgIGNvbnN0IGlzT3BlbktleSA9IGtleUNvZGUgPT09IEVOVEVSIHx8IGtleUNvZGUgPT09IFNQQUNFO1xuXG4gICAgICAgIC8vIE9wZW4gdGhlIHNlbGVjdCBvbiBBTFQgKyBhcnJvdyBrZXkgdG8gbWF0Y2ggdGhlIG5hdGl2ZSA8c2VsZWN0PlxuICAgICAgICBpZiAoaXNPcGVuS2V5IHx8ICgodGhpcy5tdWx0aXBsZSB8fCBldmVudC5hbHRLZXkpICYmIGlzQXJyb3dLZXkpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50cyB0aGUgcGFnZSBmcm9tIHNjcm9sbGluZyBkb3duIHdoZW4gcHJlc3Npbmcgc3BhY2VcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBIYW5kbGVzIGtleWJvYXJkIGV2ZW50cyB3aGVuIHRoZSBzZWxlY3RlZCBpcyBvcGVuLiAqL1xuICAgIHByaXZhdGUgaGFuZGxlT3BlbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lICovXG4gICAgICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuICAgICAgICBjb25zdCBpc0Fycm93S2V5ID0ga2V5Q29kZSA9PT0gRE9XTl9BUlJPVyB8fCBrZXlDb2RlID09PSBVUF9BUlJPVztcbiAgICAgICAgY29uc3QgbWFuYWdlciA9IHRoaXMua2V5TWFuYWdlcjtcblxuICAgICAgICBpZiAoaXNBcnJvd0tleSAmJiBldmVudC5hbHRLZXkpIHtcbiAgICAgICAgICAgIC8vIENsb3NlIHRoZSBzZWxlY3Qgb24gQUxUICsgYXJyb3cga2V5IHRvIG1hdGNoIHRoZSBuYXRpdmUgPHNlbGVjdD5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gSE9NRSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgbWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBFTkQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIG1hbmFnZXIuc2V0TGFzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBQQUdFX1VQKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBtYW5hZ2VyLnNldFByZXZpb3VzUGFnZUl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBQQUdFX0RPV04pIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIG1hbmFnZXIuc2V0TmV4dFBhZ2VJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoKGtleUNvZGUgPT09IEVOVEVSIHx8IGtleUNvZGUgPT09IFNQQUNFKSAmJiBtYW5hZ2VyLmFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBtYW5hZ2VyLmFjdGl2ZUl0ZW0uc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9tdWx0aXBsZSAmJiBrZXlDb2RlID09PSBBICYmIGV2ZW50LmN0cmxLZXkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBoYXNEZXNlbGVjdGVkT3B0aW9ucyA9IHRoaXMub3B0aW9ucy5zb21lKChvcHRpb24pID0+ICFvcHRpb24uc2VsZWN0ZWQpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChoYXNEZXNlbGVjdGVkT3B0aW9ucyAmJiAhb3B0aW9uLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3QoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb24uZGVzZWxlY3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzbHlGb2N1c2VkSW5kZXggPSBtYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleDtcblxuICAgICAgICAgICAgbWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fbXVsdGlwbGUgJiYgaXNBcnJvd0tleSAmJiBldmVudC5zaGlmdEtleSAmJiBtYW5hZ2VyLmFjdGl2ZUl0ZW0gJiZcbiAgICAgICAgICAgICAgICBtYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCAhPT0gcHJldmlvdXNseUZvY3VzZWRJbmRleCkge1xuICAgICAgICAgICAgICAgIG1hbmFnZXIuYWN0aXZlSXRlbS5zZWxlY3RWaWFJbnRlcmFjdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgICAgICAvLyBEZWZlciBzZXR0aW5nIHRoZSB2YWx1ZSBpbiBvcmRlciB0byBhdm9pZCB0aGUgXCJFeHByZXNzaW9uXG4gICAgICAgIC8vIGhhcyBjaGFuZ2VkIGFmdGVyIGl0IHdhcyBjaGVja2VkXCIgZXJyb3JzIGZyb20gQW5ndWxhci5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvbkJ5VmFsdWUodGhpcy5uZ0NvbnRyb2wgPyB0aGlzLm5nQ29udHJvbC52YWx1ZSA6IHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgc2VsZWN0ZWQgb3B0aW9uIGJhc2VkIG9uIGEgdmFsdWUuIElmIG5vIG9wdGlvbiBjYW4gYmVcbiAgICAgKiBmb3VuZCB3aXRoIHRoZSBkZXNpZ25hdGVkIHZhbHVlLCB0aGUgc2VsZWN0IHRyaWdnZXIgaXMgY2xlYXJlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNldFNlbGVjdGlvbkJ5VmFsdWUodmFsdWU6IGFueSB8IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMucHJldmlvdXNTZWxlY3Rpb25Nb2RlbFNlbGVjdGVkID0gdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZDtcblxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRocm93IGdldE1jU2VsZWN0Tm9uQXJyYXlWYWx1ZUVycm9yKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcbiAgICAgICAgICAgIHZhbHVlLmZvckVhY2goKGN1cnJlbnRWYWx1ZTogYW55KSA9PiB0aGlzLnNlbGVjdFZhbHVlKGN1cnJlbnRWYWx1ZSkpO1xuICAgICAgICAgICAgdGhpcy5zb3J0VmFsdWVzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgICAgICAgICBjb25zdCBjb3JyZXNwb25kaW5nT3B0aW9uID0gdGhpcy5zZWxlY3RWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgICAgICAgIC8vIFNoaWZ0IGZvY3VzIHRvIHRoZSBhY3RpdmUgaXRlbS4gTm90ZSB0aGF0IHdlIHNob3VsZG4ndCBkbyB0aGlzIGluIG11bHRpcGxlXG4gICAgICAgICAgICAvLyBtb2RlLCBiZWNhdXNlIHdlIGRvbid0IGtub3cgd2hhdCBvcHRpb24gdGhlIHVzZXIgaW50ZXJhY3RlZCB3aXRoIGxhc3QuXG4gICAgICAgICAgICBpZiAoY29ycmVzcG9uZGluZ09wdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKGNvcnJlc3BvbmRpbmdPcHRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDb3JyZXNwb25kT3B0aW9uKHZhbHVlOiBhbnkpOiBNY09wdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMudG9BcnJheSgpLFxuICAgICAgICAgICAgLi4udGhpcy5wcmV2aW91c1NlbGVjdGlvbk1vZGVsU2VsZWN0ZWRcbiAgICAgICAgXS5maW5kKChvcHRpb246IE1jT3B0aW9uKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIC8vIFRyZWF0IG51bGwgYXMgYSBzcGVjaWFsIHJlc2V0IHZhbHVlLlxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb24udmFsdWUgIT0gbnVsbCAmJiB0aGlzLmNvbXBhcmVXaXRoKG9wdGlvbi52YWx1ZSwgdmFsdWUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTm90aWZ5IGRldmVsb3BlcnMgb2YgZXJyb3JzIGluIHRoZWlyIGNvbXBhcmF0b3IuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyBhbmQgc2VsZWN0cyBhbmQgb3B0aW9uIGJhc2VkIG9uIGl0cyB2YWx1ZS5cbiAgICAgKiBAcmV0dXJucyBPcHRpb24gdGhhdCBoYXMgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZWxlY3RWYWx1ZSh2YWx1ZTogYW55KTogTWNPcHRpb24gfCB1bmRlZmluZWQge1xuICAgICAgICBjb25zdCBjb3JyZXNwb25kaW5nT3B0aW9uID0gdGhpcy5nZXRDb3JyZXNwb25kT3B0aW9uKHZhbHVlKTtcblxuICAgICAgICBpZiAoY29ycmVzcG9uZGluZ09wdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3QoY29ycmVzcG9uZGluZ09wdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29ycmVzcG9uZGluZ09wdGlvbjtcbiAgICB9XG5cbiAgICAvKiogU2V0cyB1cCBhIGtleSBtYW5hZ2VyIHRvIGxpc3RlbiB0byBrZXlib2FyZCBldmVudHMgb24gdGhlIG92ZXJsYXkgcGFuZWwuICovXG4gICAgcHJpdmF0ZSBpbml0S2V5TWFuYWdlcigpIHtcbiAgICAgICAgY29uc3QgdHlwZUFoZWFkRGVib3VuY2UgPSAyMDA7XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyID0gbmV3IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPE1jT3B0aW9uPih0aGlzLm9wdGlvbnMpXG4gICAgICAgICAgICAud2l0aFR5cGVBaGVhZCh0eXBlQWhlYWREZWJvdW5jZSwgdGhpcy5zZWFyY2ggPyAtMSA6IDApXG4gICAgICAgICAgICAud2l0aFZlcnRpY2FsT3JpZW50YXRpb24oKVxuICAgICAgICAgICAgLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24odGhpcy5pc1J0bCgpID8gJ3J0bCcgOiAnbHRyJyk7XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnRhYk91dFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBSZXN0b3JlIGZvY3VzIHRvIHRoZSB0cmlnZ2VyIGJlZm9yZSBjbG9zaW5nLiBFbnN1cmVzIHRoYXQgdGhlIGZvY3VzXG4gICAgICAgICAgICAgICAgLy8gcG9zaXRpb24gd29uJ3QgYmUgbG9zdCBpZiB0aGUgdXNlciBnb3QgZm9jdXMgaW50byB0aGUgb3ZlcmxheS5cbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLmNoYW5nZVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcGFuZWxPcGVuICYmIHRoaXMucGFuZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxBY3RpdmVPcHRpb25JbnRvVmlldygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX3BhbmVsT3BlbiAmJiAhdGhpcy5tdWx0aXBsZSAmJiB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbS5zZWxlY3RWaWFJbnRlcmFjdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBEcm9wcyBjdXJyZW50IG9wdGlvbiBzdWJzY3JpcHRpb25zIGFuZCBJRHMgYW5kIHJlc2V0cyBmcm9tIHNjcmF0Y2guICovXG4gICAgcHJpdmF0ZSByZXNldE9wdGlvbnMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNoYW5nZWRPckRlc3Ryb3llZCA9IG1lcmdlKHRoaXMub3B0aW9ucy5jaGFuZ2VzLCB0aGlzLmRlc3Ryb3kpO1xuXG4gICAgICAgIHRoaXMub3B0aW9uU2VsZWN0aW9uQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKGNoYW5nZWRPckRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3QoZXZlbnQuc291cmNlLCBldmVudC5pc1VzZXJJbnB1dCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWFyY2ggJiYgdGhpcy5zZWFyY2guaXNTZWFyY2hDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gdGhpcy5rZXlNYW5hZ2VyLnNldEZpcnN0SXRlbUFjdGl2ZSgpKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaC5pc1NlYXJjaENoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuaXNVc2VySW5wdXQgJiYgIXRoaXMubXVsdGlwbGUgJiYgdGhpcy5fcGFuZWxPcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIExpc3RlbiB0byBjaGFuZ2VzIGluIHRoZSBpbnRlcm5hbCBzdGF0ZSBvZiB0aGUgb3B0aW9ucyBhbmQgcmVhY3QgYWNjb3JkaW5nbHkuXG4gICAgICAgIC8vIEhhbmRsZXMgY2FzZXMgbGlrZSB0aGUgbGFiZWxzIG9mIHRoZSBzZWxlY3RlZCBvcHRpb25zIGNoYW5naW5nLlxuICAgICAgICBtZXJnZSguLi50aGlzLm9wdGlvbnMubWFwKChvcHRpb24pID0+IG9wdGlvbi5zdGF0ZUNoYW5nZXMpKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKGNoYW5nZWRPckRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogSW52b2tlZCB3aGVuIGFuIG9wdGlvbiBpcyBjbGlja2VkLiAqL1xuICAgIHByaXZhdGUgb25TZWxlY3Qob3B0aW9uOiBNY09wdGlvbiwgaXNVc2VySW5wdXQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgd2FzU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGlvbk1vZGVsLmlzU2VsZWN0ZWQob3B0aW9uKTtcblxuICAgICAgICBpZiAob3B0aW9uLnZhbHVlID09IG51bGwgJiYgIXRoaXMuX211bHRpcGxlKSB7XG4gICAgICAgICAgICBvcHRpb24uZGVzZWxlY3QoKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlcyhvcHRpb24udmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0KG9wdGlvbik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuZGVzZWxlY3Qob3B0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzVXNlcklucHV0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0ob3B0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRWYWx1ZXMoKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc1VzZXJJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJbiBjYXNlIHRoZSB1c2VyIHNlbGVjdGVkIHRoZSBvcHRpb24gd2l0aCB0aGVpciBtb3VzZSwgd2VcbiAgICAgICAgICAgICAgICAgICAgLy8gd2FudCB0byByZXN0b3JlIGZvY3VzIGJhY2sgdG8gdGhlIHRyaWdnZXIsIGluIG9yZGVyIHRvXG4gICAgICAgICAgICAgICAgICAgIC8vIHByZXZlbnQgdGhlIHNlbGVjdCBrZXlib2FyZCBjb250cm9scyBmcm9tIGNsYXNoaW5nIHdpdGhcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIG9uZXMgZnJvbSBgbWMtb3B0aW9uYC5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgc2VhcmNoIGlzIGF2YWxpYWJsZSB0aGVuIHdlIGZvY3VzIHNlYXJjaCBhZ2Fpbi5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VhcmNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHdhc1NlbGVjdGVkICE9PSB0aGlzLnNlbGVjdGlvbk1vZGVsLmlzU2VsZWN0ZWQob3B0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgLyoqIFNvcnRzIHRoZSBzZWxlY3RlZCB2YWx1ZXMgaW4gdGhlIHNlbGVjdGVkIGJhc2VkIG9uIHRoZWlyIG9yZGVyIGluIHRoZSBwYW5lbC4gKi9cbiAgICBwcml2YXRlIHNvcnRWYWx1ZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zLnRvQXJyYXkoKTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc29ydENvbXBhcmF0b3IgPyB0aGlzLnNvcnRDb21wYXJhdG9yKGEsIGIsIG9wdGlvbnMpIDpcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5pbmRleE9mKGEpIC0gb3B0aW9ucy5pbmRleE9mKGIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRW1pdHMgY2hhbmdlIGV2ZW50IHRvIHNldCB0aGUgbW9kZWwgdmFsdWUuICovXG4gICAgcHJpdmF0ZSBwcm9wYWdhdGVDaGFuZ2VzKGZhbGxiYWNrVmFsdWU/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgbGV0IHZhbHVlVG9FbWl0OiBhbnkgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICB2YWx1ZVRvRW1pdCA9ICh0aGlzLnNlbGVjdGVkIGFzIE1jT3B0aW9uW10pLm1hcCgob3B0aW9uKSA9PiBvcHRpb24udmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsdWVUb0VtaXQgPSB0aGlzLnNlbGVjdGVkID8gKHRoaXMuc2VsZWN0ZWQgYXMgTWNPcHRpb24pLnZhbHVlIDogZmFsbGJhY2tWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWVUb0VtaXQ7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZVRvRW1pdCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWVUb0VtaXQpO1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KG5ldyBNY1NlbGVjdENoYW5nZSh0aGlzLCB2YWx1ZVRvRW1pdCkpO1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWdobGlnaHRzIHRoZSBzZWxlY3RlZCBpdGVtLiBJZiBubyBvcHRpb24gaXMgc2VsZWN0ZWQsIGl0IHdpbGwgaGlnaGxpZ2h0XG4gICAgICogdGhlIGZpcnN0IGl0ZW0gaW5zdGVhZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGhpZ2hsaWdodENvcnJlY3RPcHRpb24oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmtleU1hbmFnZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVtcHR5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbSh0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdGVkWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBTY3JvbGxzIHRoZSBhY3RpdmUgb3B0aW9uIGludG8gdmlldy4gKi9cbiAgICBwcml2YXRlIHNjcm9sbEFjdGl2ZU9wdGlvbkludG9WaWV3KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBhY3RpdmVPcHRpb25JbmRleCA9IHRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggfHwgMDtcbiAgICAgICAgY29uc3QgbGFiZWxDb3VudCA9IGNvdW50R3JvdXBMYWJlbHNCZWZvcmVPcHRpb24oYWN0aXZlT3B0aW9uSW5kZXgsIHRoaXMub3B0aW9ucywgdGhpcy5vcHRpb25Hcm91cHMpO1xuXG4gICAgICAgIHRoaXMub3B0aW9uc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IGdldE9wdGlvblNjcm9sbFBvc2l0aW9uKFxuICAgICAgICAgICAgYWN0aXZlT3B0aW9uSW5kZXggKyBsYWJlbENvdW50LFxuICAgICAgICAgICAgdGhpcy5nZXRJdGVtSGVpZ2h0KCksXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNDb250YWluZXIubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICAgICAgICBTRUxFQ1RfUEFORUxfTUFYX0hFSUdIVFxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHgtb2Zmc2V0IG9mIHRoZSBvdmVybGF5IHBhbmVsIGluIHJlbGF0aW9uIHRvIHRoZSB0cmlnZ2VyJ3MgdG9wIHN0YXJ0IGNvcm5lci5cbiAgICAgKiBUaGlzIG11c3QgYmUgYWRqdXN0ZWQgdG8gYWxpZ24gdGhlIHNlbGVjdGVkIG9wdGlvbiB0ZXh0IG92ZXIgdGhlIHRyaWdnZXIgdGV4dCB3aGVuXG4gICAgICogdGhlIHBhbmVsIG9wZW5zLiBXaWxsIGNoYW5nZSBiYXNlZCBvbiBMVFIgb3IgUlRMIHRleHQgZGlyZWN0aW9uLiBOb3RlIHRoYXQgdGhlIG9mZnNldFxuICAgICAqIGNhbid0IGJlIGNhbGN1bGF0ZWQgdW50aWwgdGhlIHBhbmVsIGhhcyBiZWVuIGF0dGFjaGVkLCBiZWNhdXNlIHdlIG5lZWQgdG8ga25vdyB0aGVcbiAgICAgKiBjb250ZW50IHdpZHRoIGluIG9yZGVyIHRvIGNvbnN0cmFpbiB0aGUgcGFuZWwgd2l0aGluIHRoZSB2aWV3cG9ydC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbGN1bGF0ZU92ZXJsYXlPZmZzZXRYKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBvdmVybGF5UmVjdCA9IHRoaXMub3ZlcmxheURpci5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCB2aWV3cG9ydFNpemUgPSB0aGlzLl92aWV3cG9ydFJ1bGVyLmdldFZpZXdwb3J0U2l6ZSgpO1xuICAgICAgICBjb25zdCBpc1J0bCA9IHRoaXMuaXNSdGwoKTtcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnMgKi9cbiAgICAgICAgY29uc3QgcGFkZGluZ1dpZHRoID0gU0VMRUNUX1BBTkVMX1BBRERJTkdfWCAqIDI7XG4gICAgICAgIGxldCBvZmZzZXRYOiBudW1iZXI7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdGVkWzBdIHx8IHRoaXMub3B0aW9ucy5maXJzdDtcbiAgICAgICAgb2Zmc2V0WCA9IHNlbGVjdGVkICYmIHNlbGVjdGVkLmdyb3VwID8gU0VMRUNUX1BBTkVMX0lOREVOVF9QQURESU5HX1ggOiBTRUxFQ1RfUEFORUxfUEFERElOR19YO1xuXG4gICAgICAgIC8vIEludmVydCB0aGUgb2Zmc2V0IGluIExUUi5cbiAgICAgICAgaWYgKCFpc1J0bCkgeyBvZmZzZXRYICo9IC0xOyB9XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIGhvdyBtdWNoIHRoZSBzZWxlY3Qgb3ZlcmZsb3dzIG9uIGVhY2ggc2lkZS5cbiAgICAgICAgY29uc3QgbGVmdE92ZXJmbG93ID0gMCAtIChvdmVybGF5UmVjdC5sZWZ0ICsgb2Zmc2V0WCAtIChpc1J0bCA/IHBhZGRpbmdXaWR0aCA6IDApKTtcbiAgICAgICAgY29uc3QgcmlnaHRPdmVyZmxvdyA9IG92ZXJsYXlSZWN0LnJpZ2h0ICsgb2Zmc2V0WCAtIHZpZXdwb3J0U2l6ZS53aWR0aFxuICAgICAgICAgICAgKyAoaXNSdGwgPyAwIDogcGFkZGluZ1dpZHRoKTtcblxuICAgICAgICAvLyBJZiB0aGUgZWxlbWVudCBvdmVyZmxvd3Mgb24gZWl0aGVyIHNpZGUsIHJlZHVjZSB0aGUgb2Zmc2V0IHRvIGFsbG93IGl0IHRvIGZpdC5cbiAgICAgICAgaWYgKGxlZnRPdmVyZmxvdyA+IDApIHtcbiAgICAgICAgICAgIG9mZnNldFggKz0gbGVmdE92ZXJmbG93ICsgU0VMRUNUX1BBTkVMX1ZJRVdQT1JUX1BBRERJTkc7XG4gICAgICAgIH0gZWxzZSBpZiAocmlnaHRPdmVyZmxvdyA+IDApIHtcbiAgICAgICAgICAgIG9mZnNldFggLT0gcmlnaHRPdmVyZmxvdyArIFNFTEVDVF9QQU5FTF9WSUVXUE9SVF9QQURESU5HO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0IHRoZSBvZmZzZXQgZGlyZWN0bHkgaW4gb3JkZXIgdG8gYXZvaWQgaGF2aW5nIHRvIGdvIHRocm91Z2ggY2hhbmdlIGRldGVjdGlvbiBhbmRcbiAgICAgICAgLy8gcG90ZW50aWFsbHkgdHJpZ2dlcmluZyBcImNoYW5nZWQgYWZ0ZXIgaXQgd2FzIGNoZWNrZWRcIiBlcnJvcnMuIFJvdW5kIHRoZSB2YWx1ZSB0byBhdm9pZFxuICAgICAgICAvLyBibHVycnkgY29udGVudCBpbiBzb21lIGJyb3dzZXJzLlxuICAgICAgICB0aGlzLm92ZXJsYXlEaXIub2Zmc2V0WCA9IE1hdGgucm91bmQob2Zmc2V0WCk7XG4gICAgICAgIHRoaXMub3ZlcmxheURpci5vdmVybGF5UmVmLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqIENvbXBhcmlzb24gZnVuY3Rpb24gdG8gc3BlY2lmeSB3aGljaCBvcHRpb24gaXMgZGlzcGxheWVkLiBEZWZhdWx0cyB0byBvYmplY3QgZXF1YWxpdHkuICovXG4gICAgcHJpdmF0ZSBfY29tcGFyZVdpdGggPSAobzE6IGFueSwgbzI6IGFueSkgPT4gbzEgPT09IG8yO1xufVxuIl19