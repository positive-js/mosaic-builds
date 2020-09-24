/**
 * @fileoverview added by tsickle
 * Generated from: tree-selection.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends, __read, __spread } from "tslib";
/* tslint:disable:no-empty */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Input, IterableDiffers, Output, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { hasModifierKey, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, SPACE, DOWN_ARROW, UP_ARROW } from '@ptsecurity/cdk/keycodes';
import { CdkTree, CdkTreeNodeOutlet, FlatTreeControl } from '@ptsecurity/cdk/tree';
import { getMcSelectNonArrayValueError, MultipleMode } from '@ptsecurity/mosaic/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MC_TREE_OPTION_PARENT_COMPONENT, McTreeOption } from './tree-option.component';
/** @type {?} */
export var MC_SELECTION_TREE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return McTreeSelection; })),
    multi: true
};
/**
 * @template T
 */
var /**
 * @template T
 */
McTreeNavigationChange = /** @class */ (function () {
    function McTreeNavigationChange(source, option) {
        this.source = source;
        this.option = option;
    }
    return McTreeNavigationChange;
}());
/**
 * @template T
 */
export { McTreeNavigationChange };
if (false) {
    /** @type {?} */
    McTreeNavigationChange.prototype.source;
    /** @type {?} */
    McTreeNavigationChange.prototype.option;
}
/**
 * @template T
 */
var /**
 * @template T
 */
McTreeSelectionChange = /** @class */ (function () {
    function McTreeSelectionChange(source, option) {
        this.source = source;
        this.option = option;
    }
    return McTreeSelectionChange;
}());
/**
 * @template T
 */
export { McTreeSelectionChange };
if (false) {
    /** @type {?} */
    McTreeSelectionChange.prototype.source;
    /** @type {?} */
    McTreeSelectionChange.prototype.option;
}
/**
 * @record
 */
function SelectionModelOption() { }
if (false) {
    /** @type {?} */
    SelectionModelOption.prototype.id;
    /** @type {?} */
    SelectionModelOption.prototype.value;
}
/**
 * @template T
 */
var McTreeSelection = /** @class */ (function (_super) {
    __extends(McTreeSelection, _super);
    function McTreeSelection(elementRef, differs, changeDetectorRef, multiple) {
        var _this = _super.call(this, differs, changeDetectorRef) || this;
        _this.elementRef = elementRef;
        _this.renderedOptions = new QueryList();
        _this.resetFocusedItemOnBlur = true;
        _this.navigationChange = new EventEmitter();
        _this.selectionChange = new EventEmitter();
        _this.multipleMode = null;
        _this.userTabIndex = null;
        _this.sortedNodes = [];
        _this._autoSelect = true;
        _this._noUnselectLast = true;
        _this._disabled = false;
        _this._tabIndex = 0;
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
        _this.updateRenderedOptions = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var orderedOptions = [];
            _this.sortedNodes.forEach((/**
             * @param {?} node
             * @return {?}
             */
            function (node) {
                /** @type {?} */
                var found = _this.unorderedOptions.find((/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) { return option.value === _this.treeControl.getValue(node); }));
                if (found) {
                    orderedOptions.push(found);
                }
            }));
            _this.renderedOptions.reset(orderedOptions);
            _this.renderedOptions.notifyOnChanges();
        });
        if (multiple === MultipleMode.CHECKBOX || multiple === MultipleMode.KEYBOARD) {
            _this.multipleMode = multiple;
        }
        else if (multiple !== null) {
            _this.multipleMode = MultipleMode.CHECKBOX;
        }
        if (_this.multipleMode === MultipleMode.CHECKBOX) {
            _this.autoSelect = false;
            _this.noUnselectLast = false;
        }
        _this.selectionModel = new SelectionModel(_this.multiple);
        return _this;
    }
    Object.defineProperty(McTreeSelection.prototype, "autoSelect", {
        get: /**
         * @return {?}
         */
        function () {
            return this._autoSelect;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._autoSelect = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeSelection.prototype, "optionFocusChanges", {
        get: /**
         * @return {?}
         */
        function () {
            return merge.apply(void 0, __spread(this.renderedOptions.map((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return option.onFocus; }))));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeSelection.prototype, "optionBlurChanges", {
        get: /**
         * @return {?}
         */
        function () {
            return merge.apply(void 0, __spread(this.renderedOptions.map((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return option.onBlur; }))));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeSelection.prototype, "multiple", {
        get: /**
         * @return {?}
         */
        function () {
            return !!this.multipleMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeSelection.prototype, "noUnselectLast", {
        get: /**
         * @return {?}
         */
        function () {
            return this._noUnselectLast;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._noUnselectLast = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeSelection.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} rawValue
         * @return {?}
         */
        function (rawValue) {
            /** @type {?} */
            var value = coerceBooleanProperty(rawValue);
            if (this._disabled !== value) {
                this._disabled = value;
                this.markOptionsForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeSelection.prototype, "tabIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return this.disabled ? -1 : this._tabIndex;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._tabIndex = value;
            this.userTabIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeSelection.prototype, "showCheckbox", {
        get: /**
         * @return {?}
         */
        function () {
            return this.multipleMode === MultipleMode.CHECKBOX;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McTreeSelection.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.unorderedOptions.changes.subscribe(this.updateRenderedOptions);
        this.keyManager = new FocusKeyManager(this.renderedOptions)
            .withVerticalOrientation(true)
            .withHorizontalOrientation(null);
        this.keyManager.change
            .pipe(takeUntil(this.destroy))
            .subscribe((/**
         * @return {?}
         */
        function () {
            if (_this.keyManager.activeItem) {
                _this.emitNavigationEvent(_this.keyManager.activeItem);
                // todo need check this logic
                if (_this.autoSelect && !_this.keyManager.activeItem.disabled) {
                    _this.updateOptionsFocus();
                }
            }
        }));
        this.keyManager.tabOut
            .pipe(takeUntil(this.destroy))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.allowFocusEscape(); }));
        this.selectionModel.changed
            .pipe(takeUntil(this.destroy))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.onChange(_this.getSelectedValues());
            _this.renderedOptions.notifyOnChanges();
        }));
        this.renderedOptions.changes
            .pipe(takeUntil(this.destroy))
            .subscribe((/**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            _this.resetOptions();
            // Check to see if we need to update our tab index
            _this.updateTabIndex();
            // todo need to do optimisation
            options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) {
                option.deselect();
                _this.getSelectedValues().forEach((/**
                 * @param {?} selectedValue
                 * @return {?}
                 */
                function (selectedValue) {
                    if (option.value === selectedValue) {
                        option.select();
                    }
                }));
            }));
        }));
    };
    /**
     * @return {?}
     */
    McTreeSelection.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy.next();
        this.destroy.complete();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    McTreeSelection.prototype.focus = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (this.renderedOptions.length === 0 || this.isFocusReceivedFromNestedOption($event)) {
            return;
        }
        this.keyManager.setFirstItemActive();
    };
    /**
     * @return {?}
     */
    McTreeSelection.prototype.blur = /**
     * @return {?}
     */
    function () {
        if (!this.hasFocusedOption() && this.resetFocusedItemOnBlur) {
            this.keyManager.setActiveItem(-1);
        }
        this.onTouched();
        this.changeDetectorRef.markForCheck();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McTreeSelection.prototype.onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.keyManager.setFocusOrigin('keyboard');
        // tslint:disable-next-line: deprecation
        /** @type {?} */
        var keyCode = event.keyCode;
        switch (keyCode) {
            case DOWN_ARROW:
                this.keyManager.setNextItemActive();
                break;
            case UP_ARROW:
                this.keyManager.setPreviousItemActive();
                break;
            case LEFT_ARROW:
                if (this.keyManager.activeItem) {
                    this.treeControl.collapse((/** @type {?} */ (this.keyManager.activeItem.data)));
                }
                event.preventDefault();
                return;
            case RIGHT_ARROW:
                if (this.keyManager.activeItem) {
                    this.treeControl.expand((/** @type {?} */ (this.keyManager.activeItem.data)));
                }
                event.preventDefault();
                return;
            case SPACE:
            case ENTER:
                this.toggleFocusedOption();
                event.preventDefault();
                break;
            case HOME:
                this.keyManager.setFirstItemActive();
                event.preventDefault();
                break;
            case END:
                this.keyManager.setLastItemActive();
                event.preventDefault();
                break;
            case PAGE_UP:
                this.keyManager.setPreviousPageItemActive();
                event.preventDefault();
                break;
            case PAGE_DOWN:
                this.keyManager.setNextPageItemActive();
                event.preventDefault();
                break;
            default:
                return;
        }
        if (this.keyManager.activeItem) {
            this.setSelectedOptionsByKey(this.keyManager.activeItem, hasModifierKey(event, 'shiftKey'), hasModifierKey(event, 'ctrlKey'));
        }
    };
    /**
     * @return {?}
     */
    McTreeSelection.prototype.updateScrollSize = /**
     * @return {?}
     */
    function () {
        if (!this.renderedOptions.first) {
            return;
        }
        this.keyManager.withScrollSize(Math.floor(this.getHeight() / this.renderedOptions.first.getHeight()));
    };
    /**
     * @param {?} option
     * @param {?} shiftKey
     * @param {?} ctrlKey
     * @return {?}
     */
    McTreeSelection.prototype.setSelectedOptionsByKey = /**
     * @param {?} option
     * @param {?} shiftKey
     * @param {?} ctrlKey
     * @return {?}
     */
    function (option, shiftKey, ctrlKey) {
        if (shiftKey && this.multiple) {
            this.setSelectedOptions(option);
        }
        else if (ctrlKey) {
            if (!this.canDeselectLast(option)) {
                return;
            }
        }
        else if (this.autoSelect) {
            this.selectionModel.clear();
            this.selectionModel.toggle(option.data);
        }
        this.emitChangeEvent(option);
    };
    /**
     * @param {?} option
     * @param {?} shiftKey
     * @param {?} ctrlKey
     * @return {?}
     */
    McTreeSelection.prototype.setSelectedOptionsByClick = /**
     * @param {?} option
     * @param {?} shiftKey
     * @param {?} ctrlKey
     * @return {?}
     */
    function (option, shiftKey, ctrlKey) {
        if (!shiftKey && !ctrlKey) {
            this.keyManager.setActiveItem(option);
        }
        if (shiftKey && this.multiple) {
            this.setSelectedOptions(option);
        }
        else if (ctrlKey) {
            if (!this.canDeselectLast(option)) {
                return;
            }
            this.selectionModel.toggle(option.data);
        }
        else if (this.autoSelect) {
            this.selectionModel.clear();
            this.selectionModel.toggle(option.data);
        }
        else {
            this.selectionModel.toggle(option.data);
        }
        this.emitChangeEvent(option);
    };
    /**
     * @param {?} option
     * @return {?}
     */
    McTreeSelection.prototype.setSelectedOptions = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        var _a;
        var _this = this;
        /** @type {?} */
        var selectedOptionState = option.selected;
        /** @type {?} */
        var fromIndex = this.keyManager.previousActiveItemIndex;
        /** @type {?} */
        var toIndex = this.keyManager.previousActiveItemIndex = this.keyManager.activeItemIndex;
        if (toIndex === fromIndex) {
            return;
        }
        if (fromIndex > toIndex) {
            _a = __read([toIndex, fromIndex], 2), fromIndex = _a[0], toIndex = _a[1];
        }
        this.renderedOptions
            .toArray()
            .slice(fromIndex, toIndex + 1)
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return !item.disabled; }))
            .forEach((/**
         * @param {?} renderedOption
         * @return {?}
         */
        function (renderedOption) {
            /** @type {?} */
            var isLastRenderedOption = renderedOption === _this.keyManager.activeItem;
            if (isLastRenderedOption && renderedOption.selected && _this.noUnselectLast) {
                return;
            }
            renderedOption.setSelected(!selectedOptionState);
        }));
    };
    /**
     * @param {?} option
     * @return {?}
     */
    McTreeSelection.prototype.setFocusedOption = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this.keyManager.setActiveItem(option);
    };
    /**
     * @return {?}
     */
    McTreeSelection.prototype.toggleFocusedOption = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var focusedOption = this.keyManager.activeItem;
        if (focusedOption && (!focusedOption.selected || this.canDeselectLast(focusedOption))) {
            focusedOption.toggle();
            this.emitChangeEvent(focusedOption);
        }
    };
    /**
     * @param {?} data
     * @param {?=} dataDiffer
     * @param {?=} viewContainer
     * @param {?=} parentData
     * @return {?}
     */
    McTreeSelection.prototype.renderNodeChanges = /**
     * @param {?} data
     * @param {?=} dataDiffer
     * @param {?=} viewContainer
     * @param {?=} parentData
     * @return {?}
     */
    function (data, dataDiffer, viewContainer, parentData) {
        if (dataDiffer === void 0) { dataDiffer = this.dataDiffer; }
        if (viewContainer === void 0) { viewContainer = this.nodeOutlet.viewContainer; }
        _super.prototype.renderNodeChanges.call(this, data, dataDiffer, viewContainer, parentData);
        this.sortedNodes = this.getSortedNodes(viewContainer);
        this.updateScrollSize();
        this.nodeOutlet.changeDetectorRef.detectChanges();
    };
    /**
     * @return {?}
     */
    McTreeSelection.prototype.getHeight = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var clientRects = this.elementRef.nativeElement.getClientRects();
        if (clientRects.length) {
            return clientRects[0].height;
        }
        return 0;
    };
    /**
     * @return {?}
     */
    McTreeSelection.prototype.getItemHeight = /**
     * @return {?}
     */
    function () {
        return this.renderedOptions.first ? this.renderedOptions.first.getHeight() : 0;
    };
    /**
     * @param {?} option
     * @return {?}
     */
    McTreeSelection.prototype.emitNavigationEvent = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this.navigationChange.emit(new McTreeNavigationChange(this, option));
    };
    /**
     * @param {?} option
     * @return {?}
     */
    McTreeSelection.prototype.emitChangeEvent = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this.selectionChange.emit(new McTreeNavigationChange(this, option));
    };
    /**
     * @param {?} value
     * @return {?}
     */
    McTreeSelection.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.multiple && value && !Array.isArray(value)) {
            throw getMcSelectNonArrayValueError();
        }
        if (this.renderedOptions.length) {
            this.setOptionsFromValues(this.multiple ? value : [value]);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    McTreeSelection.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    McTreeSelection.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
     */
    /**
     * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
     * @param {?} isDisabled
     * @return {?}
     */
    McTreeSelection.prototype.setDisabledState = /**
     * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this._disabled = isDisabled;
        this.changeDetectorRef.markForCheck();
    };
    /**
     * @param {?} values
     * @return {?}
     */
    McTreeSelection.prototype.setOptionsFromValues = /**
     * @param {?} values
     * @return {?}
     */
    function (values) {
        var _a;
        var _this = this;
        this.selectionModel.clear();
        /** @type {?} */
        var valuesToSelect = values.reduce((/**
         * @param {?} result
         * @param {?} value
         * @return {?}
         */
        function (result, value) {
            return _this.treeControl.hasValue(value) ? __spread(result, [_this.treeControl.hasValue(value)]) : __spread(result);
        }), []);
        (_a = this.selectionModel).select.apply(_a, __spread(valuesToSelect));
    };
    /**
     * @return {?}
     */
    McTreeSelection.prototype.getSelectedValues = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.selectionModel.selected.map((/**
         * @param {?} selected
         * @return {?}
         */
        function (selected) { return _this.treeControl.getValue(selected); }));
    };
    /**
     * @protected
     * @return {?}
     */
    McTreeSelection.prototype.updateTabIndex = /**
     * @protected
     * @return {?}
     */
    function () {
        this._tabIndex = this.renderedOptions.length === 0 ? -1 : 0;
    };
    /**
     * @private
     * @param {?} viewContainer
     * @return {?}
     */
    McTreeSelection.prototype.getSortedNodes = /**
     * @private
     * @param {?} viewContainer
     * @return {?}
     */
    function (viewContainer) {
        /** @type {?} */
        var array = [];
        for (var i = 0; i < viewContainer.length; i++) {
            /** @type {?} */
            var viewRef = (/** @type {?} */ (viewContainer.get(i)));
            array.push(viewRef.context.$implicit);
        }
        return array;
    };
    /**
     * @private
     * @return {?}
     */
    McTreeSelection.prototype.allowFocusEscape = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._tabIndex !== -1) {
            this._tabIndex = -1;
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this._tabIndex = _this.userTabIndex || 0;
                _this.changeDetectorRef.markForCheck();
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    McTreeSelection.prototype.resetOptions = /**
     * @private
     * @return {?}
     */
    function () {
        this.dropSubscriptions();
        this.listenToOptionsFocus();
    };
    /**
     * @private
     * @return {?}
     */
    McTreeSelection.prototype.dropSubscriptions = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.optionFocusSubscription) {
            this.optionFocusSubscription.unsubscribe();
            this.optionFocusSubscription = null;
        }
        if (this.optionBlurSubscription) {
            this.optionBlurSubscription.unsubscribe();
            this.optionBlurSubscription = null;
        }
    };
    /**
     * @private
     * @return {?}
     */
    McTreeSelection.prototype.listenToOptionsFocus = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.optionFocusSubscription = this.optionFocusChanges
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var index = _this.renderedOptions.toArray().indexOf((/** @type {?} */ (event.option)));
            _this.renderedOptions
                .filter((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return option.hasFocus; }))
                .forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return option.hasFocus = false; }));
            if (_this.isValidIndex(index)) {
                _this.keyManager.updateActiveItem(index);
            }
        }));
        this.optionBlurSubscription = this.optionBlurChanges
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.blur(); }));
    };
    /**
     * Utility to ensure all indexes are valid.
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of options.
     */
    /**
     * Utility to ensure all indexes are valid.
     * @private
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of options.
     */
    McTreeSelection.prototype.isValidIndex = /**
     * Utility to ensure all indexes are valid.
     * @private
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of options.
     */
    function (index) {
        return index >= 0 && index < this.renderedOptions.length;
    };
    /** Checks whether any of the options is focused. */
    /**
     * Checks whether any of the options is focused.
     * @private
     * @return {?}
     */
    McTreeSelection.prototype.hasFocusedOption = /**
     * Checks whether any of the options is focused.
     * @private
     * @return {?}
     */
    function () {
        return this.renderedOptions.some((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return option.hasFocus; }));
    };
    /**
     * @private
     * @return {?}
     */
    McTreeSelection.prototype.markOptionsForCheck = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.renderedOptions.length) {
            this.renderedOptions.forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return option.markForCheck(); }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    McTreeSelection.prototype.updateOptionsFocus = /**
     * @private
     * @return {?}
     */
    function () {
        this.renderedOptions
            .filter((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return option.hasFocus; }))
            .forEach((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return option.hasFocus = false; }));
    };
    /**
     * @private
     * @param {?} option
     * @return {?}
     */
    McTreeSelection.prototype.canDeselectLast = /**
     * @private
     * @param {?} option
     * @return {?}
     */
    function (option) {
        return !(this.noUnselectLast && this.selectionModel.selected.length === 1 && option.selected);
    };
    /**
     * @private
     * @param {?} $event
     * @return {?}
     */
    McTreeSelection.prototype.isFocusReceivedFromNestedOption = /**
     * @private
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (!$event || !$event.relatedTarget) {
            return false;
        }
        return ((/** @type {?} */ ($event.relatedTarget))).classList.contains('mc-tree-option');
    };
    McTreeSelection.decorators = [
        { type: Component, args: [{
                    selector: 'mc-tree-selection',
                    exportAs: 'mcTreeSelection',
                    template: '<ng-container cdkTreeNodeOutlet></ng-container>',
                    host: {
                        class: 'mc-tree-selection',
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.disabled]': 'disabled || null',
                        '(blur)': 'blur()',
                        '(focus)': 'focus($event)',
                        '(keydown)': 'onKeyDown($event)',
                        '(window:resize)': 'updateScrollSize()'
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        MC_SELECTION_TREE_VALUE_ACCESSOR,
                        { provide: MC_TREE_OPTION_PARENT_COMPONENT, useExisting: McTreeSelection },
                        { provide: CdkTree, useExisting: McTreeSelection }
                    ],
                    styles: [".mc-tree-selection{display:block}.mc-tree-option{display:flex;align-items:center;height:28px;word-wrap:break-word;border:2px solid transparent}.mc-tree-option>.mc-icon{margin-right:4px;cursor:pointer}.mc-tree-option:focus{outline:0}.mc-tree-option:not([disabled]){cursor:pointer}.mc-tree-option .mc-pseudo-checkbox{margin-right:8px}.mc-tree-node-toggle{margin-right:4px;cursor:pointer}.mc-tree-node-toggle .mc-icon{transform:rotate(-90deg)}.mc-tree-node-toggle.mc-opened .mc-icon{transform:rotate(0)}.mc-tree-node-toggle[disabled]{cursor:default}"]
                }] }
    ];
    /** @nocollapse */
    McTreeSelection.ctorParameters = function () { return [
        { type: ElementRef },
        { type: IterableDiffers },
        { type: ChangeDetectorRef },
        { type: MultipleMode, decorators: [{ type: Attribute, args: ['multiple',] }] }
    ]; };
    McTreeSelection.propDecorators = {
        nodeOutlet: [{ type: ViewChild, args: [CdkTreeNodeOutlet, { static: true },] }],
        unorderedOptions: [{ type: ContentChildren, args: [McTreeOption,] }],
        treeControl: [{ type: Input }],
        navigationChange: [{ type: Output }],
        selectionChange: [{ type: Output }],
        autoSelect: [{ type: Input }],
        noUnselectLast: [{ type: Input }],
        disabled: [{ type: Input }],
        tabIndex: [{ type: Input }]
    };
    return McTreeSelection;
}(CdkTree));
export { McTreeSelection };
if (false) {
    /** @type {?} */
    McTreeSelection.prototype.nodeOutlet;
    /** @type {?} */
    McTreeSelection.prototype.unorderedOptions;
    /** @type {?} */
    McTreeSelection.prototype.renderedOptions;
    /** @type {?} */
    McTreeSelection.prototype.keyManager;
    /** @type {?} */
    McTreeSelection.prototype.selectionModel;
    /** @type {?} */
    McTreeSelection.prototype.resetFocusedItemOnBlur;
    /** @type {?} */
    McTreeSelection.prototype.treeControl;
    /** @type {?} */
    McTreeSelection.prototype.navigationChange;
    /** @type {?} */
    McTreeSelection.prototype.selectionChange;
    /** @type {?} */
    McTreeSelection.prototype.multipleMode;
    /** @type {?} */
    McTreeSelection.prototype.userTabIndex;
    /**
     * @type {?}
     * @private
     */
    McTreeSelection.prototype.sortedNodes;
    /**
     * @type {?}
     * @private
     */
    McTreeSelection.prototype._autoSelect;
    /**
     * @type {?}
     * @private
     */
    McTreeSelection.prototype._noUnselectLast;
    /**
     * @type {?}
     * @private
     */
    McTreeSelection.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    McTreeSelection.prototype._tabIndex;
    /**
     * @type {?}
     * @private
     */
    McTreeSelection.prototype.destroy;
    /**
     * @type {?}
     * @private
     */
    McTreeSelection.prototype.optionFocusSubscription;
    /**
     * @type {?}
     * @private
     */
    McTreeSelection.prototype.optionBlurSubscription;
    /**
     * `View -> model callback called when value changes`
     * @type {?}
     */
    McTreeSelection.prototype.onChange;
    /**
     * `View -> model callback called when select has been touched`
     * @type {?}
     */
    McTreeSelection.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    McTreeSelection.prototype.updateRenderedOptions;
    /**
     * @type {?}
     * @private
     */
    McTreeSelection.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1zZWxlY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RyZWUvIiwic291cmNlcyI6WyJ0cmVlLXNlbGVjdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBRUgsU0FBUyxFQUNULHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBRUwsZUFBZSxFQUNmLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFDSCxjQUFjLEVBQ2QsR0FBRyxFQUNILEtBQUssRUFDTCxJQUFJLEVBQ0osVUFBVSxFQUNWLFNBQVMsRUFDVCxPQUFPLEVBQ1AsV0FBVyxFQUNYLEtBQUssRUFDTCxVQUFVLEVBQ1YsUUFBUSxFQUNYLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRixPQUFPLEVBRUgsNkJBQTZCLEVBRTdCLFlBQVksRUFDZixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxLQUFLLEVBQWMsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLCtC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K0IsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFO3dCQUMxRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRTtxQkFDckQ7O2lCQUNKOzs7O2dCQXBGRyxVQUFVO2dCQUtWLGVBQWU7Z0JBUmYsaUJBQWlCO2dCQWtDakIsWUFBWSx1QkE4SlAsU0FBUyxTQUFDLFVBQVU7Ozs2QkFyR3hCLFNBQVMsU0FBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7bUNBRTdDLGVBQWUsU0FBQyxZQUFZOzhCQVU1QixLQUFLO21DQUVMLE1BQU07a0NBRU4sTUFBTTs2QkFRTixLQUFLO2lDQXVCTCxLQUFLOzJCQVdMLEtBQUs7MkJBaUJMLEtBQUs7O0lBeWNWLHNCQUFDO0NBQUEsQUFoakJELENBeUI2RCxPQUFPLEdBdWhCbkU7U0F2aEJZLGVBQWU7OztJQUd4QixxQ0FBOEU7O0lBRTlFLDJDQUE4RDs7SUFFOUQsMENBQXFDOztJQUVyQyxxQ0FBK0I7O0lBRS9CLHlDQUFxRDs7SUFFckQsaURBQXVDOztJQUV2QyxzQ0FBeUM7O0lBRXpDLDJDQUFvRjs7SUFFcEYsMENBQWtGOztJQUVsRix1Q0FBeUM7O0lBRXpDLHVDQUFtQzs7Ozs7SUFFbkMsc0NBQThCOzs7OztJQVc5QixzQ0FBb0M7Ozs7O0lBdUJwQywwQ0FBd0M7Ozs7O0lBaUJ4QyxvQ0FBbUM7Ozs7O0lBWW5DLG9DQUFzQjs7Ozs7SUFNdEIsa0NBQStDOzs7OztJQUUvQyxrREFBcUQ7Ozs7O0lBRXJELGlEQUFvRDs7Ozs7SUFrU3BELG1DQUEwQzs7Ozs7SUFPMUMsb0NBQXFCOzs7OztJQWdDckIsZ0RBYUM7Ozs7O0lBblZHLHFDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlOm5vLWVtcHR5ICovXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEF0dHJpYnV0ZSxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5wdXQsXG4gICAgSXRlcmFibGVEaWZmZXIsXG4gICAgSXRlcmFibGVEaWZmZXJzLFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9jdXNLZXlNYW5hZ2VyIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2ExMXknO1xuaW1wb3J0IHtcbiAgICBoYXNNb2RpZmllcktleSxcbiAgICBFTkQsXG4gICAgRU5URVIsXG4gICAgSE9NRSxcbiAgICBMRUZUX0FSUk9XLFxuICAgIFBBR0VfRE9XTixcbiAgICBQQUdFX1VQLFxuICAgIFJJR0hUX0FSUk9XLFxuICAgIFNQQUNFLFxuICAgIERPV05fQVJST1csXG4gICAgVVBfQVJST1dcbn0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IENka1RyZWUsIENka1RyZWVOb2RlT3V0bGV0LCBGbGF0VHJlZUNvbnRyb2wgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvdHJlZSc7XG5pbXBvcnQge1xuICAgIENhbkRpc2FibGUsXG4gICAgZ2V0TWNTZWxlY3ROb25BcnJheVZhbHVlRXJyb3IsXG4gICAgSGFzVGFiSW5kZXgsXG4gICAgTXVsdGlwbGVNb2RlXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTUNfVFJFRV9PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCwgTWNUcmVlT3B0aW9uLCBNY1RyZWVPcHRpb25FdmVudCB9IGZyb20gJy4vdHJlZS1vcHRpb24uY29tcG9uZW50JztcblxuXG5leHBvcnQgY29uc3QgTUNfU0VMRUNUSU9OX1RSRUVfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNY1RyZWVTZWxlY3Rpb24pLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5leHBvcnQgY2xhc3MgTWNUcmVlTmF2aWdhdGlvbkNoYW5nZTxUPiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZTogTWNUcmVlU2VsZWN0aW9uPGFueT4sIHB1YmxpYyBvcHRpb246IFQpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBNY1RyZWVTZWxlY3Rpb25DaGFuZ2U8VD4ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2U6IE1jVHJlZVNlbGVjdGlvbjxhbnk+LCBwdWJsaWMgb3B0aW9uOiBUKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmludGVyZmFjZSBTZWxlY3Rpb25Nb2RlbE9wdGlvbiB7XG4gICAgaWQ6IG51bWJlciB8IHN0cmluZztcbiAgICB2YWx1ZTogc3RyaW5nO1xufVxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdHJlZS1zZWxlY3Rpb24nLFxuICAgIGV4cG9ydEFzOiAnbWNUcmVlU2VsZWN0aW9uJyxcbiAgICB0ZW1wbGF0ZTogJzxuZy1jb250YWluZXIgY2RrVHJlZU5vZGVPdXRsZXQ+PC9uZy1jb250YWluZXI+JyxcbiAgICBzdHlsZVVybHM6IFsnLi90cmVlLnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdHJlZS1zZWxlY3Rpb24nLFxuXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuXG4gICAgICAgICcoYmx1ciknOiAnYmx1cigpJyxcbiAgICAgICAgJyhmb2N1cyknOiAnZm9jdXMoJGV2ZW50KScsXG5cbiAgICAgICAgJyhrZXlkb3duKSc6ICdvbktleURvd24oJGV2ZW50KScsXG4gICAgICAgICcod2luZG93OnJlc2l6ZSknOiAndXBkYXRlU2Nyb2xsU2l6ZSgpJ1xuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTUNfU0VMRUNUSU9OX1RSRUVfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIHsgcHJvdmlkZTogTUNfVFJFRV9PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCwgdXNlRXhpc3Rpbmc6IE1jVHJlZVNlbGVjdGlvbiB9LFxuICAgICAgICB7IHByb3ZpZGU6IENka1RyZWUsIHVzZUV4aXN0aW5nOiBNY1RyZWVTZWxlY3Rpb24gfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNUcmVlU2VsZWN0aW9uPFQgZXh0ZW5kcyBNY1RyZWVPcHRpb24+IGV4dGVuZHMgQ2RrVHJlZTxUPlxuICAgIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyQ29udGVudEluaXQsIENhbkRpc2FibGUsIEhhc1RhYkluZGV4IHtcblxuICAgIEBWaWV3Q2hpbGQoQ2RrVHJlZU5vZGVPdXRsZXQsIHsgc3RhdGljOiB0cnVlIH0pIG5vZGVPdXRsZXQ6IENka1RyZWVOb2RlT3V0bGV0O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY1RyZWVPcHRpb24pIHVub3JkZXJlZE9wdGlvbnM6IFF1ZXJ5TGlzdDxUPjtcblxuICAgIHJlbmRlcmVkT3B0aW9ucyA9IG5ldyBRdWVyeUxpc3Q8VD4oKTtcblxuICAgIGtleU1hbmFnZXI6IEZvY3VzS2V5TWFuYWdlcjxUPjtcblxuICAgIHNlbGVjdGlvbk1vZGVsOiBTZWxlY3Rpb25Nb2RlbDxTZWxlY3Rpb25Nb2RlbE9wdGlvbj47XG5cbiAgICByZXNldEZvY3VzZWRJdGVtT25CbHVyOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHRyZWVDb250cm9sOiBGbGF0VHJlZUNvbnRyb2w8VD47XG5cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgbmF2aWdhdGlvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWNUcmVlTmF2aWdhdGlvbkNoYW5nZTxUPj4oKTtcblxuICAgIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3Rpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE1jVHJlZVNlbGVjdGlvbkNoYW5nZTxUPj4oKTtcblxuICAgIG11bHRpcGxlTW9kZTogTXVsdGlwbGVNb2RlIHwgbnVsbCA9IG51bGw7XG5cbiAgICB1c2VyVGFiSW5kZXg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBzb3J0ZWROb2RlczogVFtdID0gW107XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBhdXRvU2VsZWN0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXV0b1NlbGVjdDtcbiAgICB9XG5cbiAgICBzZXQgYXV0b1NlbGVjdCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9hdXRvU2VsZWN0ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hdXRvU2VsZWN0OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGdldCBvcHRpb25Gb2N1c0NoYW5nZXMoKTogT2JzZXJ2YWJsZTxNY1RyZWVPcHRpb25FdmVudD4ge1xuICAgICAgICByZXR1cm4gbWVyZ2UoLi4udGhpcy5yZW5kZXJlZE9wdGlvbnMubWFwKChvcHRpb24pID0+IG9wdGlvbi5vbkZvY3VzKSk7XG4gICAgfVxuXG4gICAgZ2V0IG9wdGlvbkJsdXJDaGFuZ2VzKCk6IE9ic2VydmFibGU8TWNUcmVlT3B0aW9uRXZlbnQ+IHtcbiAgICAgICAgcmV0dXJuIG1lcmdlKC4uLnRoaXMucmVuZGVyZWRPcHRpb25zLm1hcCgob3B0aW9uKSA9PiBvcHRpb24ub25CbHVyKSk7XG4gICAgfVxuXG4gICAgZ2V0IG11bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLm11bHRpcGxlTW9kZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBub1Vuc2VsZWN0TGFzdCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vVW5zZWxlY3RMYXN0O1xuICAgIH1cblxuICAgIHNldCBub1Vuc2VsZWN0TGFzdCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9ub1Vuc2VsZWN0TGFzdCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbm9VbnNlbGVjdExhc3Q6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQocmF3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkocmF3VmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLl9kaXNhYmxlZCAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsdWU7XG5cbiAgICAgICAgICAgIHRoaXMubWFya09wdGlvbnNGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHRhYkluZGV4KCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkID8gLTEgOiB0aGlzLl90YWJJbmRleDtcbiAgICB9XG5cbiAgICBzZXQgdGFiSW5kZXgodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl90YWJJbmRleCA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVzZXJUYWJJbmRleCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RhYkluZGV4ID0gMDtcblxuICAgIGdldCBzaG93Q2hlY2tib3goKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlTW9kZSA9PT0gTXVsdGlwbGVNb2RlLkNIRUNLQk9YO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBwcml2YXRlIG9wdGlvbkZvY3VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsO1xuXG4gICAgcHJpdmF0ZSBvcHRpb25CbHVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgZGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIEBBdHRyaWJ1dGUoJ211bHRpcGxlJykgbXVsdGlwbGU6IE11bHRpcGxlTW9kZVxuICAgICkge1xuICAgICAgICBzdXBlcihkaWZmZXJzLCBjaGFuZ2VEZXRlY3RvclJlZik7XG5cbiAgICAgICAgaWYgKG11bHRpcGxlID09PSBNdWx0aXBsZU1vZGUuQ0hFQ0tCT1ggfHwgbXVsdGlwbGUgPT09IE11bHRpcGxlTW9kZS5LRVlCT0FSRCkge1xuICAgICAgICAgICAgdGhpcy5tdWx0aXBsZU1vZGUgPSBtdWx0aXBsZTtcbiAgICAgICAgfSBlbHNlIGlmIChtdWx0aXBsZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5tdWx0aXBsZU1vZGUgPSBNdWx0aXBsZU1vZGUuQ0hFQ0tCT1g7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZU1vZGUgPT09IE11bHRpcGxlTW9kZS5DSEVDS0JPWCkge1xuICAgICAgICAgICAgdGhpcy5hdXRvU2VsZWN0ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm5vVW5zZWxlY3RMYXN0ID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsPFNlbGVjdGlvbk1vZGVsT3B0aW9uPih0aGlzLm11bHRpcGxlKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudW5vcmRlcmVkT3B0aW9ucy5jaGFuZ2VzLnN1YnNjcmliZSh0aGlzLnVwZGF0ZVJlbmRlcmVkT3B0aW9ucyk7XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyID0gbmV3IEZvY3VzS2V5TWFuYWdlcjxUPih0aGlzLnJlbmRlcmVkT3B0aW9ucylcbiAgICAgICAgICAgIC53aXRoVmVydGljYWxPcmllbnRhdGlvbih0cnVlKVxuICAgICAgICAgICAgLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24obnVsbCk7XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLmNoYW5nZVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0TmF2aWdhdGlvbkV2ZW50KHRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyB0b2RvIG5lZWQgY2hlY2sgdGhpcyBsb2dpY1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRvU2VsZWN0ICYmICF0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVPcHRpb25zRm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMua2V5TWFuYWdlci50YWJPdXRcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmFsbG93Rm9jdXNFc2NhcGUoKSk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5jaGFuZ2VkXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5nZXRTZWxlY3RlZFZhbHVlcygpKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZWRPcHRpb25zLm5vdGlmeU9uQ2hhbmdlcygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlZE9wdGlvbnMuY2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChvcHRpb25zKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldE9wdGlvbnMoKTtcblxuICAgICAgICAgICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB3ZSBuZWVkIHRvIHVwZGF0ZSBvdXIgdGFiIGluZGV4XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUYWJJbmRleCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gdG9kbyBuZWVkIHRvIGRvIG9wdGltaXNhdGlvblxuICAgICAgICAgICAgICAgIG9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5kZXNlbGVjdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0U2VsZWN0ZWRWYWx1ZXMoKS5mb3JFYWNoKChzZWxlY3RlZFZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uLnZhbHVlID09PSBzZWxlY3RlZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnNlbGVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLmRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBmb2N1cygkZXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucmVuZGVyZWRPcHRpb25zLmxlbmd0aCA9PT0gMCB8fCB0aGlzLmlzRm9jdXNSZWNlaXZlZEZyb21OZXN0ZWRPcHRpb24oJGV2ZW50KSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgfVxuXG4gICAgYmx1cigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0ZvY3VzZWRPcHRpb24oKSAmJiB0aGlzLnJlc2V0Rm9jdXNlZEl0ZW1PbkJsdXIpIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKC0xKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRGb2N1c09yaWdpbigna2V5Ym9hcmQnKTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcblxuICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgRE9XTl9BUlJPVzpcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0TmV4dEl0ZW1BY3RpdmUoKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBVUF9BUlJPVzpcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0UHJldmlvdXNJdGVtQWN0aXZlKCk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlQ29udHJvbC5jb2xsYXBzZSh0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbS5kYXRhIGFzIFQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWVDb250cm9sLmV4cGFuZCh0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbS5kYXRhIGFzIFQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIFNQQUNFOlxuICAgICAgICAgICAgY2FzZSBFTlRFUjpcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUZvY3VzZWRPcHRpb24oKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEhPTUU6XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRU5EOlxuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRMYXN0SXRlbUFjdGl2ZSgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUEFHRV9VUDpcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0UHJldmlvdXNQYWdlSXRlbUFjdGl2ZSgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUEFHRV9ET1dOOlxuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXROZXh0UGFnZUl0ZW1BY3RpdmUoKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3RlZE9wdGlvbnNCeUtleShcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbSwgaGFzTW9kaWZpZXJLZXkoZXZlbnQsICdzaGlmdEtleScpLCBoYXNNb2RpZmllcktleShldmVudCwgJ2N0cmxLZXknKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVNjcm9sbFNpemUoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5yZW5kZXJlZE9wdGlvbnMuZmlyc3QpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLndpdGhTY3JvbGxTaXplKE1hdGguZmxvb3IodGhpcy5nZXRIZWlnaHQoKSAvIHRoaXMucmVuZGVyZWRPcHRpb25zLmZpcnN0LmdldEhlaWdodCgpKSk7XG4gICAgfVxuXG4gICAgc2V0U2VsZWN0ZWRPcHRpb25zQnlLZXkob3B0aW9uOiBULCBzaGlmdEtleTogYm9vbGVhbiwgY3RybEtleTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoc2hpZnRLZXkgJiYgdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3RlZE9wdGlvbnMob3B0aW9uKTtcbiAgICAgICAgfSBlbHNlIGlmIChjdHJsS2V5KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuY2FuRGVzZWxlY3RMYXN0KG9wdGlvbikpIHsgcmV0dXJuOyB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvU2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnRvZ2dsZShvcHRpb24uZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVtaXRDaGFuZ2VFdmVudChvcHRpb24pO1xuICAgIH1cblxuICAgIHNldFNlbGVjdGVkT3B0aW9uc0J5Q2xpY2sob3B0aW9uOiBULCBzaGlmdEtleTogYm9vbGVhbiwgY3RybEtleTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoIXNoaWZ0S2V5ICYmICFjdHJsS2V5KSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShvcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNoaWZ0S2V5ICYmIHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRPcHRpb25zKG9wdGlvbik7XG4gICAgICAgIH0gZWxzZSBpZiAoY3RybEtleSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmNhbkRlc2VsZWN0TGFzdChvcHRpb24pKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnRvZ2dsZShvcHRpb24uZGF0YSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvU2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnRvZ2dsZShvcHRpb24uZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnRvZ2dsZShvcHRpb24uZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVtaXRDaGFuZ2VFdmVudChvcHRpb24pO1xuICAgIH1cblxuICAgIHNldFNlbGVjdGVkT3B0aW9ucyhvcHRpb246IFQpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb25TdGF0ZSA9IG9wdGlvbi5zZWxlY3RlZDtcblxuICAgICAgICBsZXQgZnJvbUluZGV4ID0gdGhpcy5rZXlNYW5hZ2VyLnByZXZpb3VzQWN0aXZlSXRlbUluZGV4O1xuICAgICAgICBsZXQgdG9JbmRleCA9IHRoaXMua2V5TWFuYWdlci5wcmV2aW91c0FjdGl2ZUl0ZW1JbmRleCA9IHRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXg7XG5cbiAgICAgICAgaWYgKHRvSW5kZXggPT09IGZyb21JbmRleCkgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAoZnJvbUluZGV4ID4gdG9JbmRleCkge1xuICAgICAgICAgICAgW2Zyb21JbmRleCwgdG9JbmRleF0gPSBbdG9JbmRleCwgZnJvbUluZGV4XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVuZGVyZWRPcHRpb25zXG4gICAgICAgICAgICAudG9BcnJheSgpXG4gICAgICAgICAgICAuc2xpY2UoZnJvbUluZGV4LCB0b0luZGV4ICsgMSlcbiAgICAgICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+ICFpdGVtLmRpc2FibGVkKVxuICAgICAgICAgICAgLmZvckVhY2goKHJlbmRlcmVkT3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNMYXN0UmVuZGVyZWRPcHRpb24gPSByZW5kZXJlZE9wdGlvbiA9PT0gdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW07XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNMYXN0UmVuZGVyZWRPcHRpb24gJiYgcmVuZGVyZWRPcHRpb24uc2VsZWN0ZWQgJiYgdGhpcy5ub1Vuc2VsZWN0TGFzdCkgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgICAgIHJlbmRlcmVkT3B0aW9uLnNldFNlbGVjdGVkKCFzZWxlY3RlZE9wdGlvblN0YXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldEZvY3VzZWRPcHRpb24ob3B0aW9uOiBUKTogdm9pZCB7XG4gICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKG9wdGlvbik7XG4gICAgfVxuXG4gICAgdG9nZ2xlRm9jdXNlZE9wdGlvbigpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZm9jdXNlZE9wdGlvbiA9IHRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtO1xuXG4gICAgICAgIGlmIChmb2N1c2VkT3B0aW9uICYmICghZm9jdXNlZE9wdGlvbi5zZWxlY3RlZCB8fCB0aGlzLmNhbkRlc2VsZWN0TGFzdChmb2N1c2VkT3B0aW9uKSkpIHtcbiAgICAgICAgICAgIGZvY3VzZWRPcHRpb24udG9nZ2xlKCk7XG4gICAgICAgICAgICB0aGlzLmVtaXRDaGFuZ2VFdmVudChmb2N1c2VkT3B0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlck5vZGVDaGFuZ2VzKFxuICAgICAgICBkYXRhOiBUW10sXG4gICAgICAgIGRhdGFEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPFQ+ID0gdGhpcy5kYXRhRGlmZmVyLFxuICAgICAgICB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmID0gdGhpcy5ub2RlT3V0bGV0LnZpZXdDb250YWluZXIsXG4gICAgICAgIHBhcmVudERhdGE/OiBUXG4gICAgKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnJlbmRlck5vZGVDaGFuZ2VzKGRhdGEsIGRhdGFEaWZmZXIsIHZpZXdDb250YWluZXIsIHBhcmVudERhdGEpO1xuXG4gICAgICAgIHRoaXMuc29ydGVkTm9kZXMgPSB0aGlzLmdldFNvcnRlZE5vZGVzKHZpZXdDb250YWluZXIpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlU2Nyb2xsU2l6ZSgpO1xuXG4gICAgICAgIHRoaXMubm9kZU91dGxldC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgZ2V0SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGNsaWVudFJlY3RzID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Q2xpZW50UmVjdHMoKTtcblxuICAgICAgICBpZiAoY2xpZW50UmVjdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gY2xpZW50UmVjdHNbMF0uaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgZ2V0SXRlbUhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJlZE9wdGlvbnMuZmlyc3QgPyB0aGlzLnJlbmRlcmVkT3B0aW9ucy5maXJzdC5nZXRIZWlnaHQoKSA6IDA7XG4gICAgfVxuXG4gICAgZW1pdE5hdmlnYXRpb25FdmVudChvcHRpb246IFQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uQ2hhbmdlLmVtaXQobmV3IE1jVHJlZU5hdmlnYXRpb25DaGFuZ2UodGhpcywgb3B0aW9uKSk7XG4gICAgfVxuXG4gICAgZW1pdENoYW5nZUV2ZW50KG9wdGlvbjogVCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KG5ldyBNY1RyZWVOYXZpZ2F0aW9uQ2hhbmdlKHRoaXMsIG9wdGlvbikpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB2YWx1ZSAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRocm93IGdldE1jU2VsZWN0Tm9uQXJyYXlWYWx1ZUVycm9yKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yZW5kZXJlZE9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbnNGcm9tVmFsdWVzKHRoaXMubXVsdGlwbGUgPyB2YWx1ZSA6IFt2YWx1ZV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIGBWaWV3IC0+IG1vZGVsIGNhbGxiYWNrIGNhbGxlZCB3aGVuIHZhbHVlIGNoYW5nZXNgICovXG4gICAgb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLyoqIGBWaWV3IC0+IG1vZGVsIGNhbGxiYWNrIGNhbGxlZCB3aGVuIHNlbGVjdCBoYXMgYmVlbiB0b3VjaGVkYCAqL1xuICAgIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZGlzYWJsZWQgc3RhdGUgb2YgdGhlIGNvbnRyb2wuIEltcGxlbWVudGVkIGFzIGEgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICAgKi9cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHNldE9wdGlvbnNGcm9tVmFsdWVzKHZhbHVlczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuXG4gICAgICAgIGNvbnN0IHZhbHVlc1RvU2VsZWN0ID0gdmFsdWVzLnJlZHVjZSgocmVzdWx0LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJlZUNvbnRyb2wuaGFzVmFsdWUodmFsdWUpID8gWy4uLnJlc3VsdCwgdGhpcy50cmVlQ29udHJvbC5oYXNWYWx1ZSh2YWx1ZSldIDogWy4uLnJlc3VsdF07XG4gICAgICAgIH0sIFtdKTtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdCguLi52YWx1ZXNUb1NlbGVjdCk7XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWRWYWx1ZXMoKTogYW55W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZC5tYXAoKHNlbGVjdGVkKSA9PiB0aGlzLnRyZWVDb250cm9sLmdldFZhbHVlKHNlbGVjdGVkKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVRhYkluZGV4KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl90YWJJbmRleCA9IHRoaXMucmVuZGVyZWRPcHRpb25zLmxlbmd0aCA9PT0gMCA/IC0xIDogMDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVJlbmRlcmVkT3B0aW9ucyA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgb3JkZXJlZE9wdGlvbnM6IFRbXSA9IFtdO1xuXG4gICAgICAgIHRoaXMuc29ydGVkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZm91bmQgPSB0aGlzLnVub3JkZXJlZE9wdGlvbnMuZmluZCgob3B0aW9uKSA9PiBvcHRpb24udmFsdWUgPT09IHRoaXMudHJlZUNvbnRyb2wuZ2V0VmFsdWUobm9kZSkpO1xuXG4gICAgICAgICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgICAgICAgICBvcmRlcmVkT3B0aW9ucy5wdXNoKGZvdW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlZE9wdGlvbnMucmVzZXQob3JkZXJlZE9wdGlvbnMpO1xuICAgICAgICB0aGlzLnJlbmRlcmVkT3B0aW9ucy5ub3RpZnlPbkNoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFNvcnRlZE5vZGVzKHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgY29uc3QgYXJyYXk6IFRbXSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmlld0NvbnRhaW5lci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgdmlld1JlZiA9IHZpZXdDb250YWluZXIuZ2V0KGkpIGFzIGFueTtcblxuICAgICAgICAgICAgYXJyYXkucHVzaCh2aWV3UmVmLmNvbnRleHQuJGltcGxpY2l0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFsbG93Rm9jdXNFc2NhcGUoKSB7XG4gICAgICAgIGlmICh0aGlzLl90YWJJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX3RhYkluZGV4ID0gLTE7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RhYkluZGV4ID0gdGhpcy51c2VyVGFiSW5kZXggfHwgMDtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2V0T3B0aW9ucygpIHtcbiAgICAgICAgdGhpcy5kcm9wU3Vic2NyaXB0aW9ucygpO1xuICAgICAgICB0aGlzLmxpc3RlblRvT3B0aW9uc0ZvY3VzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcm9wU3Vic2NyaXB0aW9ucygpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uRm9jdXNTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uRm9jdXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uRm9jdXNTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uQmx1clN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25CbHVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbkJsdXJTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsaXN0ZW5Ub09wdGlvbnNGb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vcHRpb25Gb2N1c1N1YnNjcmlwdGlvbiA9IHRoaXMub3B0aW9uRm9jdXNDaGFuZ2VzXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSB0aGlzLnJlbmRlcmVkT3B0aW9ucy50b0FycmF5KCkuaW5kZXhPZihldmVudC5vcHRpb24gYXMgVCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVkT3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChvcHRpb24pID0+IG9wdGlvbi5oYXNGb2N1cylcbiAgICAgICAgICAgICAgICAgICAgLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uLmhhc0ZvY3VzID0gZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZEluZGV4KGluZGV4KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIudXBkYXRlQWN0aXZlSXRlbShpbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25CbHVyU3Vic2NyaXB0aW9uID0gdGhpcy5vcHRpb25CbHVyQ2hhbmdlc1xuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmJsdXIoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXRpbGl0eSB0byBlbnN1cmUgYWxsIGluZGV4ZXMgYXJlIHZhbGlkLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggdG8gYmUgY2hlY2tlZC5cbiAgICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpbmRleCBpcyB2YWxpZCBmb3Igb3VyIGxpc3Qgb2Ygb3B0aW9ucy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGlzVmFsaWRJbmRleChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5yZW5kZXJlZE9wdGlvbnMubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKiBDaGVja3Mgd2hldGhlciBhbnkgb2YgdGhlIG9wdGlvbnMgaXMgZm9jdXNlZC4gKi9cbiAgICBwcml2YXRlIGhhc0ZvY3VzZWRPcHRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVkT3B0aW9ucy5zb21lKChvcHRpb24pID0+IG9wdGlvbi5oYXNGb2N1cyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXJrT3B0aW9uc0ZvckNoZWNrKCkge1xuICAgICAgICBpZiAodGhpcy5yZW5kZXJlZE9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVkT3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IG9wdGlvbi5tYXJrRm9yQ2hlY2soKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZU9wdGlvbnNGb2N1cygpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlZE9wdGlvbnNcbiAgICAgICAgICAgIC5maWx0ZXIoKG9wdGlvbikgPT4gb3B0aW9uLmhhc0ZvY3VzKVxuICAgICAgICAgICAgLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uLmhhc0ZvY3VzID0gZmFsc2UpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FuRGVzZWxlY3RMYXN0KG9wdGlvbjogTWNUcmVlT3B0aW9uKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhKHRoaXMubm9VbnNlbGVjdExhc3QgJiYgdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZC5sZW5ndGggPT09IDEgJiYgb3B0aW9uLnNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzRm9jdXNSZWNlaXZlZEZyb21OZXN0ZWRPcHRpb24oJGV2ZW50OiBGb2N1c0V2ZW50KSB7XG4gICAgICAgIGlmICghJGV2ZW50IHx8ICEkZXZlbnQucmVsYXRlZFRhcmdldCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICByZXR1cm4gKCRldmVudC5yZWxhdGVkVGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3QuY29udGFpbnMoJ21jLXRyZWUtb3B0aW9uJyk7XG4gICAgfVxufVxuXG4iXX0=