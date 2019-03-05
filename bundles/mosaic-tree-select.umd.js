/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@ptsecurity/cdk/bidi'), require('@ptsecurity/cdk/coercion'), require('@ptsecurity/cdk/collections'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/cdk/overlay'), require('@ptsecurity/cdk/tree'), require('@ptsecurity/mosaic/core'), require('@ptsecurity/mosaic/form-field'), require('@ptsecurity/mosaic/tag'), require('@ptsecurity/mosaic/tree'), require('rxjs'), require('rxjs/operators'), require('@angular/common'), require('@ptsecurity/mosaic/icon')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/treeSelect', ['exports', '@angular/core', '@angular/forms', '@ptsecurity/cdk/bidi', '@ptsecurity/cdk/coercion', '@ptsecurity/cdk/collections', '@ptsecurity/cdk/keycodes', '@ptsecurity/cdk/overlay', '@ptsecurity/cdk/tree', '@ptsecurity/mosaic/core', '@ptsecurity/mosaic/form-field', '@ptsecurity/mosaic/tag', '@ptsecurity/mosaic/tree', 'rxjs', 'rxjs/operators', '@angular/common', '@ptsecurity/mosaic/icon'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.treeSelect = {}),global.ng.core,global.ng.forms,global.ng.cdk.bidi,global.ng.cdk.coercion,global.ng.cdk.collections,global.ng.cdk.keycodes,global.ng.cdk.overlay,global.ng.cdk.tree,global.ng.mosaic.core,global.ng.mosaic.formField,global.ng.mosaic.tag,global.ng.mosaic.tree,global.rxjs,global.rxjs.operators,global.ng.common,global.ng.mosaic.icon));
}(this, (function (exports,core,forms,bidi,coercion,collections,keycodes,overlay,tree,core$1,formField,tag,tree$1,rxjs,operators,common,icon) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

/* tslint:disable:no-empty */
var nextUniqueId = 0;
/** Change event object that is emitted when the select value has changed. */
var McTreeSelectChange = /** @class */ (function () {
    function McTreeSelectChange(source, value, isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.source = source;
        this.value = value;
        this.isUserInput = isUserInput;
    }
    return McTreeSelectChange;
}());
var McTreeSelectTrigger = /** @class */ (function () {
    function McTreeSelectTrigger() {
    }
    McTreeSelectTrigger = __decorate([
        core.Directive({ selector: 'mc-tree-select-trigger' })
    ], McTreeSelectTrigger);
    return McTreeSelectTrigger;
}());
var McTreeSelectBase = /** @class */ (function () {
    function McTreeSelectBase(elementRef, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) {
        this.elementRef = elementRef;
        this.defaultErrorStateMatcher = defaultErrorStateMatcher;
        this.parentForm = parentForm;
        this.parentFormGroup = parentFormGroup;
        this.ngControl = ngControl;
    }
    return McTreeSelectBase;
}());
// tslint:disable-next-line:naming-convention
var McTreeSelectMixinBase = core$1.mixinTabIndex(core$1.mixinDisabled(core$1.mixinErrorState(McTreeSelectBase)));
var McTreeSelect = /** @class */ (function (_super) {
    __extends(McTreeSelect, _super);
    function McTreeSelect(viewportRuler, changeDetectorRef, ngZone, renderer, defaultErrorStateMatcher, elementRef, dir, parentForm, parentFormGroup, parentFormField, ngControl, tabIndex, scrollStrategyFactory) {
        var _this = _super.call(this, elementRef, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl) || this;
        _this.viewportRuler = viewportRuler;
        _this.changeDetectorRef = changeDetectorRef;
        _this.ngZone = ngZone;
        _this.renderer = renderer;
        _this.elementRef = elementRef;
        _this.dir = dir;
        _this.parentFormField = parentFormField;
        _this.ngControl = ngControl;
        _this.scrollStrategyFactory = scrollStrategyFactory;
        /** A name for this control that can be used by `mc-form-field`. */
        _this.controlType = 'mc-select';
        _this.hiddenItems = 0;
        _this.oneMoreText = '...ещё';
        /** The cached font-size of the trigger element. */
        _this.triggerFontSize = 0;
        /** The IDs of child options to be passed to the aria-owns attribute. */
        _this.optionIds = '';
        /** The value of the select panel's transform-origin property. */
        _this.transformOrigin = 'top';
        /** Whether the panel's animation is done. */
        _this.panelDoneAnimating = false;
        /** Emits when the panel element is finished transforming in. */
        _this.panelDoneAnimatingStream = new rxjs.Subject();
        /** Strategy that will be used to handle scrolling while the select panel is open. */
        _this.scrollStrategy = _this.scrollStrategyFactory();
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
        /** Event emitted when the select panel has been toggled. */
        _this.openedChange = new core.EventEmitter();
        /** Event emitted when the select has been opened. */
        _this.openedStream = _this.openedChange.pipe(operators.filter(function (o) { return o; }), operators.map(function () { }));
        /** Event emitted when the select has been closed. */
        _this.closedStream = _this.openedChange.pipe(operators.filter(function (o) { return !o; }), operators.map(function () { }));
        /** Event emitted when the selected value has been changed by the user. */
        _this.selectionChange = new core.EventEmitter();
        /**
         * Event that emits whenever the raw value of the select changes. This is here primarily
         * to facilitate the two-way binding for the `value` input.
         * @docs-private
         */
        _this.valueChange = new core.EventEmitter();
        /** Combined stream of all of the child options' change events. */
        _this.optionSelectionChanges = rxjs.defer(function () {
            if (_this.options) {
                return rxjs.merge.apply(void 0, _this.options.map(function (option) { return option.onSelectionChange; }));
            }
            return _this.ngZone.onStable
                .asObservable()
                .pipe(operators.take(1), operators.switchMap(function () { return _this.optionSelectionChanges; }));
        });
        _this._required = false;
        _this._multiple = false;
        _this._autoSelect = true;
        _this._focused = false;
        _this._panelOpen = false;
        /** The scroll position of the overlay panel, calculated to center the selected option. */
        _this.scrollTop = 0;
        /** Unique id for this input. */
        _this.uid = "mc-select-" + nextUniqueId++;
        /** Emits whenever the component is destroyed. */
        _this.destroy = new rxjs.Subject();
        /** `View -> model callback called when value changes` */
        _this.onChange = function () { };
        /** `View -> model callback called when select has been touched` */
        _this.onTouched = function () { };
        /** Comparison function to specify which option is displayed. Defaults to object equality. */
        _this._compareWith = function (o1, o2) { return o1 === o2; };
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
    McTreeSelect_1 = McTreeSelect;
    Object.defineProperty(McTreeSelect.prototype, "placeholder", {
        get: function () {
            return this._placeholder;
        },
        set: function (value) {
            this._placeholder = value;
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeSelect.prototype, "required", {
        get: function () {
            return this._required;
        },
        set: function (value) {
            this._required = coercion.coerceBooleanProperty(value);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeSelect.prototype, "multiple", {
        get: function () {
            return this._multiple;
        },
        set: function (value) {
            if (this.selectionModel) {
                throw core$1.getMcSelectDynamicMultipleError();
            }
            this._multiple = coercion.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeSelect.prototype, "autoSelect", {
        get: function () {
            if (this.multiple) {
                return false;
            }
            return this._autoSelect;
        },
        set: function (value) {
            this._autoSelect = coercion.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeSelect.prototype, "compareWith", {
        /**
         * Function to compare the option values with the selected values. The first argument
         * is a value from an option. The second is a value from the selection. A boolean
         * should be returned.
         */
        get: function () {
            return this._compareWith;
        },
        set: function (fn) {
            /* tslint:disable-next-line:strict-type-predicates */
            if (typeof fn !== 'function') {
                throw core$1.getMcSelectNonFunctionValueError();
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
    Object.defineProperty(McTreeSelect.prototype, "value", {
        /** Value of the select control. */
        get: function () {
            return this._value;
        },
        set: function (newValue) {
            if (newValue !== this._value) {
                this.writeValue(newValue);
                this._value = newValue;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeSelect.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value || this.uid;
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeSelect.prototype, "focused", {
        /** Whether the select is focused. */
        get: function () {
            return this._focused || this._panelOpen;
        },
        /**
         * @deprecated Setter to be removed as this property is intended to be readonly.
         * @breaking-change 8.0.0
         */
        set: function (value) {
            this._focused = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeSelect.prototype, "panelOpen", {
        get: function () {
            return this._panelOpen;
        },
        enumerable: true,
        configurable: true
    });
    McTreeSelect.prototype.ngOnInit = function () {
        var _this = this;
        if (this.tree) {
            this.tree.multiple = this.multiple;
        }
        this.stateChanges.next();
        // We need `distinctUntilChanged` here, because some browsers will
        // fire the animation end event twice for the same animation. See:
        // https://github.com/angular/angular/issues/24084
        this.panelDoneAnimatingStream
            .pipe(operators.distinctUntilChanged(), operators.takeUntil(this.destroy))
            .subscribe(function () {
            if (_this.panelOpen) {
                _this.scrollTop = 0;
                _this.openedChange.emit(true);
            }
            else {
                _this.openedChange.emit(false);
                _this.panelDoneAnimating = false;
                _this.overlayDir.offsetX = 0;
                _this.changeDetectorRef.markForCheck();
            }
        });
    };
    McTreeSelect.prototype.ngAfterContentInit = function () {
        if (!this.tree) {
            return;
        }
        this.initKeyManager();
        this.selectionModel = this.tree.selectionModel = new collections.SelectionModel(this.multiple);
        this.options = this.tree.options;
        this.tree.autoSelect = this.autoSelect;
        this.selectionModel.changed
            .pipe(operators.takeUntil(this.destroy))
            .subscribe(function (event) {
            event.added.forEach(function (option) { return option.select(); });
            event.removed.forEach(function (option) { return option.deselect(); });
        });
    };
    McTreeSelect.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!this.tree) {
            return;
        }
        this.tags.changes
            .subscribe(function () {
            setTimeout(function () { return _this.calculateHiddenItems(); }, 0);
        });
        this.options.changes
            .pipe(operators.startWith(null), operators.takeUntil(this.destroy))
            .subscribe(function () {
            _this.updateSelectedOptions();
            _this.resetOptions();
        });
    };
    McTreeSelect.prototype.ngDoCheck = function () {
        if (this.ngControl) {
            this.updateErrorState();
        }
    };
    McTreeSelect.prototype.ngOnChanges = function (changes) {
        // Updating the disabled state is handled by `mixinDisabled`, but we need to additionally let
        // the parent form field know to run change detection when the disabled state changes.
        if (changes.disabled) {
            this.stateChanges.next();
        }
    };
    McTreeSelect.prototype.ngOnDestroy = function () {
        this.destroy.next();
        this.destroy.complete();
        this.stateChanges.complete();
    };
    McTreeSelect.prototype.toggle = function () {
        if (this.panelOpen) {
            this.close();
        }
        else {
            this.open();
        }
    };
    McTreeSelect.prototype.open = function () {
        var _this = this;
        if (this.disabled || !this.options || !this.options.length || this._panelOpen) {
            return;
        }
        this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
        // Note: The computed font-size will be a string pixel value (e.g. "16px").
        // `parseInt` ignores the trailing 'px' and converts this to a number.
        this.triggerFontSize = parseInt(getComputedStyle(this.trigger.nativeElement)['font-size']);
        this._panelOpen = true;
        // this.tree.keyManager.withHorizontalOrientation(null);
        this.calculateOverlayPosition();
        this.highlightCorrectOption();
        this.changeDetectorRef.markForCheck();
        // Set the font size on the panel element once it exists.
        this.ngZone.onStable.asObservable()
            .pipe(operators.take(1))
            .subscribe(function () {
            if (_this.triggerFontSize && _this.overlayDir.overlayRef &&
                _this.overlayDir.overlayRef.overlayElement) {
                _this.overlayDir.overlayRef.overlayElement.style.fontSize = _this.triggerFontSize + "px";
            }
        });
    };
    /** Closes the overlay panel and focuses the host element. */
    McTreeSelect.prototype.close = function () {
        if (this._panelOpen) {
            this._panelOpen = false;
            // this.tree.keyManager.setActiveItem(-1);
            // this.tree.keyManager.withHorizontalOrientation(this.isRtl() ? 'rtl' : 'ltr');
            this.changeDetectorRef.markForCheck();
            this.onTouched();
        }
    };
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param value New value to be written to the model.
     */
    // todo нужно доделать!
    McTreeSelect.prototype.writeValue = function (value) {
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
    McTreeSelect.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the component has been touched.
     */
    McTreeSelect.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param isDisabled Sets whether the component is disabled.
     */
    McTreeSelect.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this.changeDetectorRef.markForCheck();
        this.stateChanges.next();
    };
    Object.defineProperty(McTreeSelect.prototype, "selected", {
        get: function () {
            return this.multiple ? this.selectionModel.selected : this.selectionModel.selected[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeSelect.prototype, "triggerValue", {
        get: function () {
            if (this.empty) {
                return '';
            }
            return this.selected.viewValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeSelect.prototype, "triggerValues", {
        get: function () {
            if (this.empty) {
                return [];
            }
            var selectedOptions = this.selectionModel.selected;
            if (this.isRtl()) {
                selectedOptions.reverse();
            }
            return selectedOptions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeSelect.prototype, "empty", {
        get: function () {
            return !this.selectionModel || this.selectionModel.isEmpty();
        },
        enumerable: true,
        configurable: true
    });
    McTreeSelect.prototype.isRtl = function () {
        return this.dir ? this.dir.value === 'rtl' : false;
    };
    McTreeSelect.prototype.handleKeydown = function (event) {
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
    McTreeSelect.prototype.onFadeInDone = function () {
        this.panelDoneAnimating = this.panelOpen;
        this.changeDetectorRef.markForCheck();
    };
    McTreeSelect.prototype.onFocus = function () {
        if (!this.disabled) {
            this._focused = true;
            this.stateChanges.next();
        }
    };
    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     */
    McTreeSelect.prototype.onBlur = function () {
        this._focused = false;
        if (!this.disabled && !this.panelOpen) {
            this.onTouched();
            this.changeDetectorRef.markForCheck();
            this.stateChanges.next();
        }
    };
    /** Callback that is invoked when the overlay panel has been attached. */
    McTreeSelect.prototype.onAttached = function () {
        var _this = this;
        this.overlayDir.positionChange
            .pipe(operators.take(1))
            .subscribe(function () {
            _this.changeDetectorRef.detectChanges();
            _this.calculateOverlayOffsetX();
            _this.panel.nativeElement.scrollTop = _this.scrollTop;
        });
    };
    /** Returns the theme to be used on the panel. */
    McTreeSelect.prototype.getPanelTheme = function () {
        return this.parentFormField ? "mc-" + this.parentFormField.color : '';
    };
    /** Focuses the select element. */
    McTreeSelect.prototype.focus = function () {
        this.elementRef.nativeElement.focus();
    };
    /**
     * Calculates the scroll position of the select's overlay panel.
     *
     * Attempts to center the selected option in the panel. If the option is
     * too high or too low in the panel to be scrolled to the center, it clamps the
     * scroll position to the min or max scroll positions respectively.
     */
    McTreeSelect.prototype.calculateOverlayScroll = function (selectedIndex, scrollBuffer, maxScroll) {
        var itemHeight = this.getItemHeight();
        var optionOffsetFromScrollTop = itemHeight * selectedIndex;
        /* tslint:disable-next-line:no-magic-numbers */
        var halfOptionHeight = itemHeight / 2;
        // Starts at the optionOffsetFromScrollTop, which scrolls the option to the top of the
        // scroll container, then subtracts the scroll buffer to scroll the option down to
        // the center of the overlay panel. Half the option height must be re-added to the
        // scrollTop so the option is centered based on its middle, not its top edge.
        var optimalScrollPosition = optionOffsetFromScrollTop - scrollBuffer + halfOptionHeight;
        return Math.min(Math.max(0, optimalScrollPosition), maxScroll);
    };
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    McTreeSelect.prototype.onContainerClick = function () {
        this.focus();
        this.open();
    };
    /** Invoked when an option is clicked. */
    McTreeSelect.prototype.onRemoveSelectedOption = function (selectedOption, $event) {
        $event.stopPropagation();
        this.options.forEach(function (option) {
            if (option.data === selectedOption.data) {
                option.deselect();
            }
        });
        this.selectionModel.deselect(selectedOption);
    };
    McTreeSelect.prototype.calculateHiddenItems = function () {
        if (this.empty || !this.multiple) {
            return;
        }
        var visibleItems = 0;
        var totalItemsWidth = this.getTotalItemsWidthInMatcher();
        var totalVisibleItemsWidth = 0;
        var itemMargin = 4;
        this.tags.forEach(function (tag$$1) {
            if (tag$$1.nativeElement.offsetTop < tag$$1.nativeElement.offsetHeight) {
                totalVisibleItemsWidth += tag$$1.nativeElement.getBoundingClientRect().width + itemMargin;
                visibleItems++;
            }
        });
        this.hiddenItems = this.selectionModel.selected.length - visibleItems;
        if (this.hiddenItems) {
            var itemsCounter = this.trigger.nativeElement.querySelector('.mc-tree-select__match-hidden-text');
            var matcherList = this.trigger.nativeElement.querySelector('.mc-tree-select__match-list');
            var itemsCounterShowed = itemsCounter.offsetTop < itemsCounter.offsetHeight;
            // const itemsCounterWidth: number = itemsCounter.getBoundingClientRect().width;
            var itemsCounterWidth = 86;
            var matcherListWidth = matcherList.getBoundingClientRect().width;
            var matcherWidth = matcherListWidth + itemsCounterWidth;
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
    };
    McTreeSelect.prototype.updateSelectedOptions = function () {
        var _this = this;
        this.selectionModel.selected.forEach(function (selectedOption) {
            _this.options.forEach(function (option) {
                if (option.data === selectedOption.data) {
                    _this.selectionModel.deselect(selectedOption);
                    _this.selectionModel.select(option);
                    option.select();
                }
            });
        });
    };
    McTreeSelect.prototype.getTotalItemsWidthInMatcher = function () {
        var triggerClone = this.trigger.nativeElement.cloneNode(true);
        triggerClone.querySelector('.mc-tree-select__match-hidden-text').remove();
        this.renderer.setStyle(triggerClone, 'position', 'absolute');
        this.renderer.setStyle(triggerClone, 'visibility', 'hidden');
        this.renderer.setStyle(triggerClone, 'top', '-100%');
        this.renderer.setStyle(triggerClone, 'left', '0');
        this.renderer.appendChild(this.trigger.nativeElement, triggerClone);
        var totalItemsWidth = 0;
        var itemMargin = 4;
        triggerClone.querySelectorAll('mc-tag').forEach(function (item) {
            totalItemsWidth += item.getBoundingClientRect().width + itemMargin;
        });
        triggerClone.remove();
        return totalItemsWidth;
    };
    McTreeSelect.prototype.handleClosedKeydown = function (event) {
        /* tslint:disable-next-line */
        var keyCode = event.keyCode;
        var isArrowKey = keyCode === keycodes.DOWN_ARROW || keyCode === keycodes.UP_ARROW ||
            keyCode === keycodes.LEFT_ARROW || keyCode === keycodes.RIGHT_ARROW;
        var isOpenKey = keyCode === keycodes.ENTER || keyCode === keycodes.SPACE;
        // Open the select on ALT + arrow key to match the native <select>
        if (isOpenKey || ((this.multiple || event.altKey) && isArrowKey)) {
            // prevents the page from scrolling down when pressing space
            event.preventDefault();
            this.open();
        }
        else if (!this.multiple) {
            this.tree.keyManager.onKeydown(event);
        }
    };
    McTreeSelect.prototype.handleOpenKeydown = function (event) {
        /* tslint:disable-next-line */
        var keyCode = event.keyCode;
        var isArrowKey = keyCode === keycodes.DOWN_ARROW || keyCode === keycodes.UP_ARROW;
        if (isArrowKey && event.altKey) {
            // Close the select on ALT + arrow key to match the native <select>
            event.preventDefault();
            this.close();
        }
        else if (keyCode === keycodes.LEFT_ARROW || keyCode === keycodes.RIGHT_ARROW) {
            return this.originalOnKeyDown.call(this.tree, event);
        }
        else if (keyCode === keycodes.HOME || keyCode === keycodes.END) {
            event.preventDefault();
            if (keyCode === keycodes.HOME) {
                this.tree.keyManager.setFirstItemActive();
            }
            else {
                this.tree.keyManager.setLastItemActive();
            }
        }
        else if ((keyCode === keycodes.ENTER || keyCode === keycodes.SPACE) && this.tree.keyManager.activeItem) {
            event.preventDefault();
            this.tree.keyManager.activeItem.selectViaInteraction();
        }
        else if (this.multiple && keyCode === keycodes.A && event.ctrlKey) {
            event.preventDefault();
            var hasDeselectedOptions_1 = this.options.some(function (option) { return !option.selected; });
            this.options.forEach(function (option) {
                if (hasDeselectedOptions_1 && !option.disabled) {
                    option.select();
                }
                else {
                    option.deselect();
                }
            });
        }
        else {
            var previouslyFocusedIndex = this.tree.keyManager.activeItemIndex;
            this.tree.keyManager.onKeydown(event);
            if (this.multiple && isArrowKey && event.shiftKey && this.tree.keyManager.activeItem &&
                this.tree.keyManager.activeItemIndex !== previouslyFocusedIndex) {
                this.tree.keyManager.activeItem.selectViaInteraction();
            }
        }
    };
    McTreeSelect.prototype.initializeSelection = function () {
        var _this = this;
        // Defer setting the value in order to avoid the "Expression
        // has changed after it was checked" errors from Angular.
        Promise.resolve().then(function () {
            _this.setSelectionByValue(_this.ngControl ? _this.ngControl.value : _this._value);
        });
    };
    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     */
    McTreeSelect.prototype.setSelectionByValue = function (value) {
        var _this = this;
        if (this.multiple && value) {
            if (!Array.isArray(value)) {
                throw core$1.getMcSelectNonArrayValueError();
            }
            this.selectionModel.clear();
            value.forEach(function (currentValue) { return _this.selectValue(currentValue); });
            this.sortValues();
        }
        else {
            this.selectionModel.clear();
            var correspondingOption = this.selectValue(value);
            // Shift focus to the active item. Note that we shouldn't do this in multiple
            // mode, because we don't know what option the user interacted with last.
            if (correspondingOption) {
                this.tree.keyManager.setActiveItem(correspondingOption);
            }
        }
        this.changeDetectorRef.markForCheck();
    };
    /**
     * Finds and selects and option based on its value.
     * @returns Option that has the corresponding value.
     */
    McTreeSelect.prototype.selectValue = function (value) {
        var _this = this;
        var correspondingOption = this.options.find(function (option) {
            try {
                // Treat null as a special reset value.
                return option.value != null && _this._compareWith(option.value, value);
            }
            catch (error) {
                if (core.isDevMode()) {
                    // Notify developers of errors in their comparator.
                    console.warn(error);
                }
                return false;
            }
        });
        if (correspondingOption) {
            this.selectionModel.select(correspondingOption);
        }
        return correspondingOption;
    };
    McTreeSelect.prototype.initKeyManager = function () {
        var _this = this;
        this.originalOnKeyDown = this.tree.onKeyDown;
        this.tree.onKeyDown = function () { };
        this.tree.keyManager.tabOut
            .pipe(operators.takeUntil(this.destroy))
            .subscribe(function () {
            // Restore focus to the trigger before closing. Ensures that the focus
            // position won't be lost if the user got focus into the overlay.
            _this.focus();
            _this.close();
        });
        this.tree.keyManager.change
            .pipe(operators.takeUntil(this.destroy))
            .subscribe(function () {
            if (_this._panelOpen && _this.panel) {
                _this.scrollActiveOptionIntoView();
            }
            else if (!_this._panelOpen && !_this.multiple && _this.tree.keyManager.activeItem) {
                _this.tree.keyManager.activeItem.selectViaInteraction();
            }
        });
    };
    /** Drops current option subscriptions and IDs and resets from scratch. */
    McTreeSelect.prototype.resetOptions = function () {
        var _this = this;
        var changedOrDestroyed = rxjs.merge(this.options.changes, this.destroy);
        this.optionSelectionChanges
            .pipe(operators.takeUntil(changedOrDestroyed))
            .subscribe(function (event) {
            _this.onSelect(event.source, event.isUserInput);
            if (event.isUserInput && !_this.multiple && _this._panelOpen) {
                _this.close();
                _this.focus();
            }
        });
        // Listen to changes in the internal state of the options and react accordingly.
        // Handles cases like the labels of the selected options changing.
        // merge(...this.options.map((option) => option.stateChanges))
        //     .pipe(takeUntil(changedOrDestroyed))
        //     .subscribe(() => {
        //         this.changeDetectorRef.markForCheck();
        //         this.stateChanges.next();
        //     });
        this.setOptionIds();
    };
    /** Invoked when an option is clicked. */
    McTreeSelect.prototype.onSelect = function (option, isUserInput) {
        var wasSelected = this.selectionModel.isSelected(option);
        if (option.value == null && !this.multiple) {
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
                this.tree.keyManager.setActiveItem(option);
            }
            if (this.multiple) {
                this.sortValues();
                if (isUserInput) {
                    // In case the user selected the option with their mouse, we
                    // want to restore focus back to the trigger, in order to
                    // prevent the select keyboard controls from clashing with
                    // the ones from `mc-option`.
                    this.focus();
                }
            }
        }
        if (wasSelected !== this.selectionModel.isSelected(option)) {
            this.propagateChanges();
        }
        this.stateChanges.next();
    };
    /** Sorts the selected values in the selected based on their order in the panel. */
    McTreeSelect.prototype.sortValues = function () {
        var _this = this;
        if (this.multiple) {
            var options_1 = this.options.toArray();
            this.selectionModel.sort(function (a, b) {
                return _this.sortComparator ? _this.sortComparator(a, b, options_1) :
                    options_1.indexOf(a) - options_1.indexOf(b);
            });
            this.stateChanges.next();
        }
    };
    /** Emits change event to set the model value. */
    McTreeSelect.prototype.propagateChanges = function (fallbackValue) {
        var valueToEmit = null;
        if (this.multiple) {
            valueToEmit = this.selected.map(function (option) { return option.value; });
        }
        else {
            valueToEmit = this.selected ? this.selected.value : fallbackValue;
        }
        this._value = valueToEmit;
        this.valueChange.emit(valueToEmit);
        this.onChange(valueToEmit);
        this.selectionChange.emit(new McTreeSelectChange(this, valueToEmit));
        this.changeDetectorRef.markForCheck();
    };
    /** Records option IDs to pass to the aria-owns property. */
    McTreeSelect.prototype.setOptionIds = function () {
        this.optionIds = this.options.map(function (option) { return option.id; }).join(' ');
    };
    /**
     * Highlights the selected item. If no option is selected, it will highlight
     * the first item instead.
     */
    McTreeSelect.prototype.highlightCorrectOption = function () {
        if (this.tree.keyManager) {
            if (this.empty) {
                this.tree.keyManager.setFirstItemActive();
            }
            else {
                this.tree.keyManager.setActiveItem(this.selectionModel.selected[0]);
            }
        }
    };
    /** Scrolls the active option into view. */
    McTreeSelect.prototype.scrollActiveOptionIntoView = function () {
        var activeOptionIndex = this.tree.keyManager.activeItemIndex || 0;
        this.panel.nativeElement.scrollTop = core$1.getOptionScrollPosition(activeOptionIndex, this.getItemHeight(), this.panel.nativeElement.scrollTop, core$1.SELECT_PANEL_MAX_HEIGHT);
    };
    /** Gets the index of the provided option in the option list. */
    McTreeSelect.prototype.getOptionIndex = function (option) {
        // todo разобраться с этим срачем!
        return this.options.reduce(function (result, current, index) {
            /* tslint:disable-next-line:strict-type-predicates */
            return result === undefined ? (option === current ? index : undefined) : result;
        }, undefined);
    };
    /** Calculates the scroll position and x- and y-offsets of the overlay panel. */
    McTreeSelect.prototype.calculateOverlayPosition = function () {
        var itemHeight = this.getItemHeight();
        var items = this.getItemCount();
        var panelHeight = Math.min(items * itemHeight, core$1.SELECT_PANEL_MAX_HEIGHT);
        var scrollContainerHeight = items * itemHeight;
        // The farthest the panel can be scrolled before it hits the bottom
        var maxScroll = scrollContainerHeight - panelHeight;
        // If no value is selected we open the popup to the first item.
        var selectedOptionOffset = this.empty ? 0 : this.getOptionIndex(this.selectionModel.selected[0]);
        // We must maintain a scroll buffer so the selected option will be scrolled to the
        // center of the overlay panel rather than the top.
        /* tslint:disable-next-line:no-magic-numbers */
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
    McTreeSelect.prototype.calculateOverlayOffsetX = function () {
        var overlayRect = this.overlayDir.overlayRef.overlayElement.getBoundingClientRect();
        var viewportSize = this.viewportRuler.getViewportSize();
        var isRtl = this.isRtl();
        /* tslint:disable-next-line:no-magic-numbers */
        var paddingWidth = core$1.SELECT_PANEL_PADDING_X * 2;
        var offsetX = core$1.SELECT_PANEL_PADDING_X;
        // Invert the offset in LTR.
        if (!isRtl) {
            offsetX *= -1;
        }
        // Determine how much the select overflows on each side.
        var leftOverflow = 0 - (overlayRect.left + offsetX - (isRtl ? paddingWidth : 0));
        var rightOverflow = overlayRect.right + offsetX - viewportSize.width
            + (isRtl ? 0 : paddingWidth);
        // If the element overflows on either side, reduce the offset to allow it to fit.
        if (leftOverflow > 0) {
            offsetX += leftOverflow + core$1.SELECT_PANEL_VIEWPORT_PADDING;
        }
        else if (rightOverflow > 0) {
            offsetX -= rightOverflow + core$1.SELECT_PANEL_VIEWPORT_PADDING;
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
    McTreeSelect.prototype.calculateOverlayOffsetY = function () {
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
    McTreeSelect.prototype.checkOverlayWithinViewport = function (maxScroll) {
        var itemHeight = this.getItemHeight();
        var viewportSize = this.viewportRuler.getViewportSize();
        var topSpaceAvailable = this.triggerRect.top - core$1.SELECT_PANEL_VIEWPORT_PADDING;
        var bottomSpaceAvailable = viewportSize.height - this.triggerRect.bottom - core$1.SELECT_PANEL_VIEWPORT_PADDING;
        var panelHeightTop = Math.abs(this.offsetY);
        var totalPanelHeight = Math.min(this.getItemCount() * itemHeight, core$1.SELECT_PANEL_MAX_HEIGHT);
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
    McTreeSelect.prototype.adjustPanelUp = function (panelHeightBottom, bottomSpaceAvailable) {
        // Browsers ignore fractional scroll offsets, so we need to round.
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
    McTreeSelect.prototype.adjustPanelDown = function (panelHeightTop, topSpaceAvailable, maxScroll) {
        // Browsers ignore fractional scroll offsets, so we need to round.
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
    McTreeSelect.prototype.getOriginBasedOnOption = function () {
        var itemHeight = this.getItemHeight();
        /* tslint:disable-next-line:no-magic-numbers */
        var optionHeightAdjustment = (itemHeight - this.triggerRect.height) / 2;
        /* tslint:disable-next-line:no-magic-numbers */
        var originY = Math.abs(this.offsetY) - optionHeightAdjustment + itemHeight / 2;
        return "50% " + originY + "px 0px";
    };
    /** Calculates the amount of items in the select. This includes options and group labels. */
    McTreeSelect.prototype.getItemCount = function () {
        return this.options.length;
    };
    /** Calculates the height of the select's options. */
    McTreeSelect.prototype.getItemHeight = function () {
        // todo доделать
        /* tslint:disable-next-line:no-magic-numbers */
        return 32;
        // return this.triggerFontSize * SELECT_ITEM_HEIGHT_EM;
    };
    var McTreeSelect_1;
    __decorate([
        core.ViewChild('trigger'),
        __metadata("design:type", core.ElementRef)
    ], McTreeSelect.prototype, "trigger", void 0);
    __decorate([
        core.ViewChild('panel'),
        __metadata("design:type", core.ElementRef)
    ], McTreeSelect.prototype, "panel", void 0);
    __decorate([
        core.ViewChild(overlay.CdkConnectedOverlay),
        __metadata("design:type", overlay.CdkConnectedOverlay)
    ], McTreeSelect.prototype, "overlayDir", void 0);
    __decorate([
        core.ViewChildren(tag.McTag),
        __metadata("design:type", core.QueryList)
    ], McTreeSelect.prototype, "tags", void 0);
    __decorate([
        core.ContentChild(McTreeSelectTrigger),
        __metadata("design:type", McTreeSelectTrigger)
    ], McTreeSelect.prototype, "customTrigger", void 0);
    __decorate([
        core.ContentChild(tree$1.McTreeSelection),
        __metadata("design:type", tree$1.McTreeSelection)
    ], McTreeSelect.prototype, "tree", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McTreeSelect.prototype, "openedChange", void 0);
    __decorate([
        core.Output('opened'),
        __metadata("design:type", rxjs.Observable)
    ], McTreeSelect.prototype, "openedStream", void 0);
    __decorate([
        core.Output('closed'),
        __metadata("design:type", rxjs.Observable)
    ], McTreeSelect.prototype, "closedStream", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", Object)
    ], McTreeSelect.prototype, "selectionChange", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McTreeSelect.prototype, "valueChange", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McTreeSelect.prototype, "panelClass", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", core$1.ErrorStateMatcher)
    ], McTreeSelect.prototype, "errorStateMatcher", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Function)
    ], McTreeSelect.prototype, "sortComparator", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McTreeSelect.prototype, "placeholder", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McTreeSelect.prototype, "required", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McTreeSelect.prototype, "multiple", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McTreeSelect.prototype, "autoSelect", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function])
    ], McTreeSelect.prototype, "compareWith", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McTreeSelect.prototype, "value", null);
    __decorate([
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McTreeSelect.prototype, "id", null);
    McTreeSelect = McTreeSelect_1 = __decorate([
        core.Component({
            selector: 'mc-tree-select',
            exportAs: 'mcTreeSelect',
            template: "<div cdk-overlay-origin class=\"mc-tree-select__trigger\" (click)=\"toggle()\" [class.mc-tree-select__trigger_multiple]=\"multiple\" #origin=\"cdkOverlayOrigin\" #trigger><div class=\"mc-tree-select__matcher\" [ngSwitch]=\"empty\"><span class=\"mc-tree-select__placeholder\" *ngSwitchCase=\"true\">{{ placeholder || '\u00A0' }}</span> <span *ngSwitchCase=\"false\" [ngSwitch]=\"!!customTrigger\"><div *ngSwitchDefault [ngSwitch]=\"multiple\" class=\"mc-tree-select__match-container\"><span *ngSwitchCase=\"false\" class=\"mc-tree-select__matcher-text\">{{ triggerValue }}</span><div *ngSwitchCase=\"true\" class=\"mc-tree-select__match-list\"><mc-tag *ngFor=\"let option of selected\" [disabled]=\"disabled\" [class.mc-error]=\"errorState\">{{ option.viewValue }} <i mc-icon=\"mc-close-S_16\" (click)=\"onRemoveSelectedOption(option, $event)\"></i></mc-tag></div><div class=\"mc-tree-select__match-hidden-text\" [style.display]=\"hiddenItems > 0 ? 'block' : 'none'\">{{ oneMoreText }} {{ hiddenItems }}</div></div><ng-content select=\"mc-select-trigger\" *ngSwitchCase=\"true\"></ng-content></span></div><div class=\"mc-tree-select__arrow-wrapper\"><i class=\"mc-tree-select__arrow\" mc-icon=\"mc-angle-down-L_16\" color=\"second\"></i></div></div><ng-template cdk-connected-overlay cdkConnectedOverlayLockPosition cdkConnectedOverlayHasBackdrop cdkConnectedOverlayBackdropClass=\"cdk-overlay-transparent-backdrop\" [cdkConnectedOverlayScrollStrategy]=\"scrollStrategy\" [cdkConnectedOverlayOrigin]=\"origin\" [cdkConnectedOverlayOpen]=\"panelOpen\" [cdkConnectedOverlayPositions]=\"positions\" [cdkConnectedOverlayMinWidth]=\"triggerRect?.width\" [cdkConnectedOverlayOffsetY]=\"offsetY\" (backdropClick)=\"close()\" (attach)=\"onAttached()\" (detach)=\"close()\"><div #panel class=\"mc-tree-select__panel {{ getPanelTheme() }}\" [ngClass]=\"panelClass\" (@transformPanel.done)=\"panelDoneAnimatingStream.next($event.toState)\" [style.transformOrigin]=\"transformOrigin\" [class.mc-select-panel-done-animcing]=\"panelDoneAnimating\" [style.font-size.px]=\"triggerFontSize\" (keydown)=\"handleKeydown($event)\"><div class=\"mc-tree-select__content\" [@fadeInContent]=\"'showing'\" (@fadeInContent.done)=\"onFadeInDone()\"><ng-content select=\"mc-tree-selection\"></ng-content></div></div></ng-template>",
            styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}.mc-tree-selection{display:block}.mc-tree-option{display:flex;align-items:center;height:28px;word-wrap:break-word;border:2px solid transparent}.mc-tree-option>.mc-icon{margin-right:4px;cursor:pointer}.mc-tree-option:focus{outline:0}.mc-tree-option:not([disabled]){cursor:pointer}.mc-tree-option .mc-pseudo-checkbox{margin-right:8px}.mc-icon-rotate_90{transform:rotate(90deg)}.mc-icon-rotate_180{transform:rotate(180deg)}.mc-icon-rotate_270{transform:rotate(270deg)}.mc-tree-select{box-sizing:border-box;display:inline-block;width:100%;outline:0}.mc-tree-select.mc-disabled .mc-tree-select__trigger{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.mc-tree-select__trigger{display:flex;box-sizing:border-box;position:relative;height:30px;cursor:pointer;padding:3px 7px 3px 15px}.mc-tree-select__trigger.mc-tree-select__trigger_multiple{padding-left:7px}.mc-tree-select__trigger.mc-tree-select__trigger_multiple .mc-tree-select__placeholder{margin-left:8px}.mc-tree-select__matcher{display:flex;align-items:center;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mc-tree-select__matcher>span{width:100%}.mc-tree-select__match-list{display:flex;flex-wrap:wrap;overflow:hidden;max-height:24px;margin:0;padding-left:0}.mc-tree-select__match-list .mc-tag{margin-right:4px}.mc-tree-select__match-container{display:flex;flex-direction:row;justify-content:space-between;width:100%}.mc-tree-select__match-container .mc-tree-select__match-hidden-text{flex:0 0 70px;align-self:center;padding:0 8px;text-align:right}.mc-tree-select__match-item{display:flex;border:1px solid transparent;border-radius:3px;padding-left:7px;margin-right:4px;max-width:100%}.mc-tree-select__arrow-wrapper{display:table-cell;vertical-align:middle}.mc-form-field-appearance-fill .mc-tree-select__arrow-wrapper,.mc-form-field-appearance-standard .mc-tree-select__arrow-wrapper{transform:translateY(-50%)}.mc-form-field-appearance-outline .mc-tree-select__arrow-wrapper{transform:translateY(-25%)}.mc-tree-select__panel{max-height:224px;min-width:100%;overflow:auto;border-width:1px;border-style:solid;border-bottom-left-radius:3px;border-bottom-right-radius:3px;padding:4px 0}.mc-tree-select__content{height:100%}.mc-tree-select__panel .mc-optgroup-label,.mc-tree-select__panel .mc-tree-select-option{font-size:inherit;line-height:32px;height:32px}.mc-form-field-type-mc-select:not(.mc-disabled) .mc-form-field-flex{cursor:pointer}.mc-form-field-type-mc-select .mc-form-field-label{width:calc(100% - 18px)}"],
            inputs: ['disabled', 'tabIndex'],
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            host: {
                '[attr.id]': 'id',
                '[attr.tabindex]': 'tabIndex',
                class: 'mc-tree-select',
                '[class.mc-disabled]': 'disabled',
                '[class.mc-select-invalid]': 'errorState',
                '[class.mc-select-required]': 'required',
                '(keydown)': 'handleKeydown($event)',
                '(focus)': 'onFocus()',
                '(blur)': 'onBlur()',
                '(window:resize)': 'calculateHiddenItems()'
            },
            animations: [
                core$1.mcSelectAnimations.transformPanel,
                core$1.mcSelectAnimations.fadeInContent
            ],
            providers: [
                { provide: formField.McFormFieldControl, useExisting: McTreeSelect_1 },
                { provide: tree.CdkTree, useExisting: McTreeSelect_1 }
            ]
        }),
        __param(6, core.Optional()),
        __param(7, core.Optional()),
        __param(8, core.Optional()),
        __param(9, core.Optional()),
        __param(10, core.Self()), __param(10, core.Optional()),
        __param(11, core.Attribute('tabindex')),
        __param(12, core.Inject(core$1.MC_SELECT_SCROLL_STRATEGY)),
        __metadata("design:paramtypes", [overlay.ViewportRuler,
            core.ChangeDetectorRef,
            core.NgZone,
            core.Renderer2,
            core$1.ErrorStateMatcher,
            core.ElementRef,
            bidi.Directionality,
            forms.NgForm,
            forms.FormGroupDirective,
            formField.McFormField,
            forms.NgControl, String, Object])
    ], McTreeSelect);
    return McTreeSelect;
}(McTreeSelectMixinBase));

var McTreeSelectModule = /** @class */ (function () {
    function McTreeSelectModule() {
    }
    McTreeSelectModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                overlay.OverlayModule,
                tree.CdkTreeModule,
                tree$1.McTreeModule,
                icon.McIconModule,
                tag.McTagModule,
                core$1.McPseudoCheckboxModule
            ],
            exports: [McTreeSelect, McTreeSelectTrigger, common.CommonModule],
            declarations: [McTreeSelect, McTreeSelectTrigger],
            providers: [core$1.MC_SELECT_SCROLL_STRATEGY_PROVIDER]
        })
    ], McTreeSelectModule);
    return McTreeSelectModule;
}());

exports.McTreeSelectModule = McTreeSelectModule;
exports.McTreeSelectChange = McTreeSelectChange;
exports.McTreeSelectTrigger = McTreeSelectTrigger;
exports.McTreeSelect = McTreeSelect;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-tree-select.umd.js.map
