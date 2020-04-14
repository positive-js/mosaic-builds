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
        _this.resetFocusedItemOnBlur = true;
        _this.navigationChange = new EventEmitter();
        _this.selectionChange = new EventEmitter();
        _this.multipleMode = null;
        _this.userTabIndex = null;
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
        /** @type {?} */
        var arrayOfInstances = [];
        /** @type {?} */
        var changeDetectorRefs = [];
        viewContainer._embeddedViews.forEach((/**
         * @param {?} view
         * @return {?}
         */
        function (view) {
            /** @type {?} */
            var viewDef = view.def;
            viewDef.nodes.forEach((/**
             * @param {?} node
             * @return {?}
             */
            function (node) {
                if (viewDef.nodeMatchedQueries === node.matchedQueryIds) {
                    /** @type {?} */
                    var nodeData = view.nodes[node.nodeIndex];
                    arrayOfInstances.push((/** @type {?} */ (nodeData.instance)));
                    changeDetectorRefs.push(nodeData.instance.changeDetectorRef);
                }
            }));
        }));
        setTimeout((/**
         * @return {?}
         */
        function () {
            changeDetectorRefs.forEach((/**
             * @param {?} changeDetectorRef
             * @return {?}
             */
            function (changeDetectorRef) {
                if (!changeDetectorRef.destroyed) {
                    changeDetectorRef.detectChanges();
                }
            }));
        }));
        if (this.renderedOptions) {
            this.renderedOptions.reset(arrayOfInstances);
            this.renderedOptions.notifyOnChanges();
        }
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
        if (this.renderedOptions) {
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
        if (this.renderedOptions) {
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
        renderedOptions: [{ type: ContentChildren, args: [McTreeOption,] }],
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
    McTreeSelection.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1zZWxlY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RyZWUvIiwic291cmNlcyI6WyJ0cmVlLXNlbGVjdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBRUgsU0FBUyxFQUNULHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBRUwsZUFBZSxFQUNmLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFDSCxjQUFjLEVBQ2QsR0FBRyxFQUNILEtBQUssRUFDTCxJQUFJLEVBQ0osVUFBVSxFQUNWLFNBQVMsRUFDVCxPQUFPLEVBQ1AsV0FBVyxFQUNYLEtBQUssRUFDTCxVQUFVLEVBQ1YsUUFBUSxFQUNYLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRixPQUFPLEVBRUgsNkJBQTZCLEVBRTdCLFlBQVksRUFDZixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxLQUFLLEVBQWMsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLCtC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UyxTQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtrQ0FFN0MsZUFBZSxTQUFDLFlBQVk7OEJBUTVCLEtBQUs7bUNBRUwsTUFBTTtrQ0FFTixNQUFNOzZCQU1OLEtBQUs7aUNBdUJMLEtBQUs7MkJBV0wsS0FBSzsyQkFpQkwsS0FBSzs7SUF1Y1Ysc0JBQUM7Q0FBQSxBQTFpQkQsQ0F5QjZELE9BQU8sR0FpaEJuRTtTQWpoQlksZUFBZTs7O0lBR3hCLHFDQUE4RTs7SUFFOUUsMENBQTZEOztJQUU3RCxxQ0FBK0I7O0lBRS9CLHlDQUFxRDs7SUFFckQsaURBQXVDOztJQUV2QyxzQ0FBeUM7O0lBRXpDLDJDQUFvRjs7SUFFcEYsMENBQWtGOztJQUVsRix1Q0FBeUM7O0lBRXpDLHVDQUFtQzs7Ozs7SUFXbkMsc0NBQW9DOzs7OztJQXVCcEMsMENBQXdDOzs7OztJQWlCeEMsb0NBQW1DOzs7OztJQVluQyxvQ0FBc0I7Ozs7O0lBTXRCLGtDQUErQzs7Ozs7SUFFL0Msa0RBQXFEOzs7OztJQUVyRCxpREFBb0Q7Ozs7O0lBMlRwRCxtQ0FBMEM7Ozs7O0lBTzFDLG9DQUFxQjs7Ozs7SUEvVGpCLHFDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlOm5vLWVtcHR5ICovXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEF0dHJpYnV0ZSxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5wdXQsXG4gICAgSXRlcmFibGVEaWZmZXIsXG4gICAgSXRlcmFibGVEaWZmZXJzLFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm9kZURlZiwgVmlld0RhdGEgfSBmcm9tICdAYW5ndWxhci9jb3JlL2VzbTIwMTUvc3JjL3ZpZXcnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9jdXNLZXlNYW5hZ2VyIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2ExMXknO1xuaW1wb3J0IHtcbiAgICBoYXNNb2RpZmllcktleSxcbiAgICBFTkQsXG4gICAgRU5URVIsXG4gICAgSE9NRSxcbiAgICBMRUZUX0FSUk9XLFxuICAgIFBBR0VfRE9XTixcbiAgICBQQUdFX1VQLFxuICAgIFJJR0hUX0FSUk9XLFxuICAgIFNQQUNFLFxuICAgIERPV05fQVJST1csXG4gICAgVVBfQVJST1dcbn0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IENka1RyZWUsIENka1RyZWVOb2RlT3V0bGV0LCBGbGF0VHJlZUNvbnRyb2wgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvdHJlZSc7XG5pbXBvcnQge1xuICAgIENhbkRpc2FibGUsXG4gICAgZ2V0TWNTZWxlY3ROb25BcnJheVZhbHVlRXJyb3IsXG4gICAgSGFzVGFiSW5kZXgsXG4gICAgTXVsdGlwbGVNb2RlXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTUNfVFJFRV9PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCwgTWNUcmVlT3B0aW9uLCBNY1RyZWVPcHRpb25FdmVudCB9IGZyb20gJy4vdHJlZS1vcHRpb24uY29tcG9uZW50JztcblxuXG5leHBvcnQgY29uc3QgTUNfU0VMRUNUSU9OX1RSRUVfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNY1RyZWVTZWxlY3Rpb24pLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5leHBvcnQgY2xhc3MgTWNUcmVlTmF2aWdhdGlvbkNoYW5nZTxUPiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZTogTWNUcmVlU2VsZWN0aW9uPGFueT4sIHB1YmxpYyBvcHRpb246IFQpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBNY1RyZWVTZWxlY3Rpb25DaGFuZ2U8VD4ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2U6IE1jVHJlZVNlbGVjdGlvbjxhbnk+LCBwdWJsaWMgb3B0aW9uOiBUKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmludGVyZmFjZSBTZWxlY3Rpb25Nb2RlbE9wdGlvbiB7XG4gICAgaWQ6IG51bWJlciB8IHN0cmluZztcbiAgICB2YWx1ZTogc3RyaW5nO1xufVxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdHJlZS1zZWxlY3Rpb24nLFxuICAgIGV4cG9ydEFzOiAnbWNUcmVlU2VsZWN0aW9uJyxcbiAgICB0ZW1wbGF0ZTogJzxuZy1jb250YWluZXIgY2RrVHJlZU5vZGVPdXRsZXQ+PC9uZy1jb250YWluZXI+JyxcbiAgICBzdHlsZVVybHM6IFsnLi90cmVlLnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdHJlZS1zZWxlY3Rpb24nLFxuXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuXG4gICAgICAgICcoYmx1ciknOiAnYmx1cigpJyxcbiAgICAgICAgJyhmb2N1cyknOiAnZm9jdXMoJGV2ZW50KScsXG5cbiAgICAgICAgJyhrZXlkb3duKSc6ICdvbktleURvd24oJGV2ZW50KScsXG4gICAgICAgICcod2luZG93OnJlc2l6ZSknOiAndXBkYXRlU2Nyb2xsU2l6ZSgpJ1xuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTUNfU0VMRUNUSU9OX1RSRUVfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIHsgcHJvdmlkZTogTUNfVFJFRV9PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCwgdXNlRXhpc3Rpbmc6IE1jVHJlZVNlbGVjdGlvbiB9LFxuICAgICAgICB7IHByb3ZpZGU6IENka1RyZWUsIHVzZUV4aXN0aW5nOiBNY1RyZWVTZWxlY3Rpb24gfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNUcmVlU2VsZWN0aW9uPFQgZXh0ZW5kcyBNY1RyZWVPcHRpb24+IGV4dGVuZHMgQ2RrVHJlZTxUPlxuICAgIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyQ29udGVudEluaXQsIENhbkRpc2FibGUsIEhhc1RhYkluZGV4IHtcblxuICAgIEBWaWV3Q2hpbGQoQ2RrVHJlZU5vZGVPdXRsZXQsIHsgc3RhdGljOiB0cnVlIH0pIG5vZGVPdXRsZXQ6IENka1RyZWVOb2RlT3V0bGV0O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY1RyZWVPcHRpb24pIHJlbmRlcmVkT3B0aW9uczogUXVlcnlMaXN0PFQ+O1xuXG4gICAga2V5TWFuYWdlcjogRm9jdXNLZXlNYW5hZ2VyPFQ+O1xuXG4gICAgc2VsZWN0aW9uTW9kZWw6IFNlbGVjdGlvbk1vZGVsPFNlbGVjdGlvbk1vZGVsT3B0aW9uPjtcblxuICAgIHJlc2V0Rm9jdXNlZEl0ZW1PbkJsdXI6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgdHJlZUNvbnRyb2w6IEZsYXRUcmVlQ29udHJvbDxUPjtcblxuICAgIEBPdXRwdXQoKSByZWFkb25seSBuYXZpZ2F0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxNY1RyZWVOYXZpZ2F0aW9uQ2hhbmdlPFQ+PigpO1xuXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGlvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWNUcmVlU2VsZWN0aW9uQ2hhbmdlPFQ+PigpO1xuXG4gICAgbXVsdGlwbGVNb2RlOiBNdWx0aXBsZU1vZGUgfCBudWxsID0gbnVsbDtcblxuICAgIHVzZXJUYWJJbmRleDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBhdXRvU2VsZWN0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXV0b1NlbGVjdDtcbiAgICB9XG5cbiAgICBzZXQgYXV0b1NlbGVjdCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9hdXRvU2VsZWN0ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hdXRvU2VsZWN0OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGdldCBvcHRpb25Gb2N1c0NoYW5nZXMoKTogT2JzZXJ2YWJsZTxNY1RyZWVPcHRpb25FdmVudD4ge1xuICAgICAgICByZXR1cm4gbWVyZ2UoLi4udGhpcy5yZW5kZXJlZE9wdGlvbnMubWFwKChvcHRpb24pID0+IG9wdGlvbi5vbkZvY3VzKSk7XG4gICAgfVxuXG4gICAgZ2V0IG9wdGlvbkJsdXJDaGFuZ2VzKCk6IE9ic2VydmFibGU8TWNUcmVlT3B0aW9uRXZlbnQ+IHtcbiAgICAgICAgcmV0dXJuIG1lcmdlKC4uLnRoaXMucmVuZGVyZWRPcHRpb25zLm1hcCgob3B0aW9uKSA9PiBvcHRpb24ub25CbHVyKSk7XG4gICAgfVxuXG4gICAgZ2V0IG11bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLm11bHRpcGxlTW9kZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBub1Vuc2VsZWN0TGFzdCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vVW5zZWxlY3RMYXN0O1xuICAgIH1cblxuICAgIHNldCBub1Vuc2VsZWN0TGFzdCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9ub1Vuc2VsZWN0TGFzdCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbm9VbnNlbGVjdExhc3Q6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQocmF3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkocmF3VmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLl9kaXNhYmxlZCAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsdWU7XG5cbiAgICAgICAgICAgIHRoaXMubWFya09wdGlvbnNGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHRhYkluZGV4KCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkID8gLTEgOiB0aGlzLl90YWJJbmRleDtcbiAgICB9XG5cbiAgICBzZXQgdGFiSW5kZXgodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl90YWJJbmRleCA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVzZXJUYWJJbmRleCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RhYkluZGV4ID0gMDtcblxuICAgIGdldCBzaG93Q2hlY2tib3goKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlTW9kZSA9PT0gTXVsdGlwbGVNb2RlLkNIRUNLQk9YO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBwcml2YXRlIG9wdGlvbkZvY3VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsO1xuXG4gICAgcHJpdmF0ZSBvcHRpb25CbHVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgZGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIEBBdHRyaWJ1dGUoJ211bHRpcGxlJykgbXVsdGlwbGU6IE11bHRpcGxlTW9kZVxuICAgICkge1xuICAgICAgICBzdXBlcihkaWZmZXJzLCBjaGFuZ2VEZXRlY3RvclJlZik7XG5cbiAgICAgICAgaWYgKG11bHRpcGxlID09PSBNdWx0aXBsZU1vZGUuQ0hFQ0tCT1ggfHwgbXVsdGlwbGUgPT09IE11bHRpcGxlTW9kZS5LRVlCT0FSRCkge1xuICAgICAgICAgICAgdGhpcy5tdWx0aXBsZU1vZGUgPSBtdWx0aXBsZTtcbiAgICAgICAgfSBlbHNlIGlmIChtdWx0aXBsZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5tdWx0aXBsZU1vZGUgPSBNdWx0aXBsZU1vZGUuQ0hFQ0tCT1g7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZU1vZGUgPT09IE11bHRpcGxlTW9kZS5DSEVDS0JPWCkge1xuICAgICAgICAgICAgdGhpcy5hdXRvU2VsZWN0ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm5vVW5zZWxlY3RMYXN0ID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsPFNlbGVjdGlvbk1vZGVsT3B0aW9uPih0aGlzLm11bHRpcGxlKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMua2V5TWFuYWdlciA9IG5ldyBGb2N1c0tleU1hbmFnZXI8VD4odGhpcy5yZW5kZXJlZE9wdGlvbnMpXG4gICAgICAgICAgICAud2l0aFZlcnRpY2FsT3JpZW50YXRpb24odHJ1ZSlcbiAgICAgICAgICAgIC53aXRoSG9yaXpvbnRhbE9yaWVudGF0aW9uKG51bGwpO1xuXG4gICAgICAgIHRoaXMua2V5TWFuYWdlci5jaGFuZ2VcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdE5hdmlnYXRpb25FdmVudCh0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gdG9kbyBuZWVkIGNoZWNrIHRoaXMgbG9naWNcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1NlbGVjdCAmJiAhdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlT3B0aW9uc0ZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmtleU1hbmFnZXIudGFiT3V0XG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5hbGxvd0ZvY3VzRXNjYXBlKCkpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuY2hhbmdlZFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuZ2V0U2VsZWN0ZWRWYWx1ZXMoKSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVkT3B0aW9ucy5ub3RpZnlPbkNoYW5nZXMoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZWRPcHRpb25zLmNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgob3B0aW9ucykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRPcHRpb25zKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgd2UgbmVlZCB0byB1cGRhdGUgb3VyIHRhYiBpbmRleFxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGFiSW5kZXgoKTtcblxuICAgICAgICAgICAgICAgIC8vIHRvZG8gbmVlZCB0byBkbyBvcHRpbWlzYXRpb25cbiAgICAgICAgICAgICAgICBvcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb24uZGVzZWxlY3QoKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFNlbGVjdGVkVmFsdWVzKCkuZm9yRWFjaCgoc2VsZWN0ZWRWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbi52YWx1ZSA9PT0gc2VsZWN0ZWRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5kZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgZm9jdXMoJGV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnJlbmRlcmVkT3B0aW9ucy5sZW5ndGggPT09IDAgfHwgdGhpcy5pc0ZvY3VzUmVjZWl2ZWRGcm9tTmVzdGVkT3B0aW9uKCRldmVudCkpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuICAgIH1cblxuICAgIGJsdXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNGb2N1c2VkT3B0aW9uKCkgJiYgdGhpcy5yZXNldEZvY3VzZWRJdGVtT25CbHVyKSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbSgtMSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0Rm9jdXNPcmlnaW4oJ2tleWJvYXJkJyk7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG5cbiAgICAgICAgc3dpdGNoIChrZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldE5leHRJdGVtQWN0aXZlKCk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldFByZXZpb3VzSXRlbUFjdGl2ZSgpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZUNvbnRyb2wuY29sbGFwc2UodGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0uZGF0YSBhcyBUKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlQ29udHJvbC5leHBhbmQodGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0uZGF0YSBhcyBUKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSBTUEFDRTpcbiAgICAgICAgICAgIGNhc2UgRU5URVI6XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVGb2N1c2VkT3B0aW9uKCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBIT01FOlxuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVORDpcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0TGFzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBBR0VfVVA6XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldFByZXZpb3VzUGFnZUl0ZW1BY3RpdmUoKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBBR0VfRE9XTjpcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0TmV4dFBhZ2VJdGVtQWN0aXZlKCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRPcHRpb25zQnlLZXkoXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0sIGhhc01vZGlmaWVyS2V5KGV2ZW50LCAnc2hpZnRLZXknKSwgaGFzTW9kaWZpZXJLZXkoZXZlbnQsICdjdHJsS2V5JylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVTY3JvbGxTaXplKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMucmVuZGVyZWRPcHRpb25zLmZpcnN0KSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMua2V5TWFuYWdlci53aXRoU2Nyb2xsU2l6ZShNYXRoLmZsb29yKHRoaXMuZ2V0SGVpZ2h0KCkgLyB0aGlzLnJlbmRlcmVkT3B0aW9ucy5maXJzdC5nZXRIZWlnaHQoKSkpO1xuICAgIH1cblxuICAgIHNldFNlbGVjdGVkT3B0aW9uc0J5S2V5KG9wdGlvbjogVCwgc2hpZnRLZXk6IGJvb2xlYW4sIGN0cmxLZXk6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKHNoaWZ0S2V5ICYmIHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRPcHRpb25zKG9wdGlvbik7XG4gICAgICAgIH0gZWxzZSBpZiAoY3RybEtleSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmNhbkRlc2VsZWN0TGFzdChvcHRpb24pKSB7IHJldHVybjsgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXV0b1NlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC50b2dnbGUob3B0aW9uLmRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbWl0Q2hhbmdlRXZlbnQob3B0aW9uKTtcbiAgICB9XG5cbiAgICBzZXRTZWxlY3RlZE9wdGlvbnNCeUNsaWNrKG9wdGlvbjogVCwgc2hpZnRLZXk6IGJvb2xlYW4sIGN0cmxLZXk6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKCFzaGlmdEtleSAmJiAhY3RybEtleSkge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0ob3B0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaGlmdEtleSAmJiB0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkT3B0aW9ucyhvcHRpb24pO1xuICAgICAgICB9IGVsc2UgaWYgKGN0cmxLZXkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5jYW5EZXNlbGVjdExhc3Qob3B0aW9uKSkgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC50b2dnbGUob3B0aW9uLmRhdGEpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXV0b1NlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC50b2dnbGUob3B0aW9uLmRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC50b2dnbGUob3B0aW9uLmRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbWl0Q2hhbmdlRXZlbnQob3B0aW9uKTtcbiAgICB9XG5cbiAgICBzZXRTZWxlY3RlZE9wdGlvbnMob3B0aW9uOiBUKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uU3RhdGUgPSBvcHRpb24uc2VsZWN0ZWQ7XG5cbiAgICAgICAgbGV0IGZyb21JbmRleCA9IHRoaXMua2V5TWFuYWdlci5wcmV2aW91c0FjdGl2ZUl0ZW1JbmRleDtcbiAgICAgICAgbGV0IHRvSW5kZXggPSB0aGlzLmtleU1hbmFnZXIucHJldmlvdXNBY3RpdmVJdGVtSW5kZXggPSB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4O1xuXG4gICAgICAgIGlmICh0b0luZGV4ID09PSBmcm9tSW5kZXgpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKGZyb21JbmRleCA+IHRvSW5kZXgpIHtcbiAgICAgICAgICAgIFtmcm9tSW5kZXgsIHRvSW5kZXhdID0gW3RvSW5kZXgsIGZyb21JbmRleF07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbmRlcmVkT3B0aW9uc1xuICAgICAgICAgICAgLnRvQXJyYXkoKVxuICAgICAgICAgICAgLnNsaWNlKGZyb21JbmRleCwgdG9JbmRleCArIDEpXG4gICAgICAgICAgICAuZmlsdGVyKChpdGVtKSA9PiAhaXRlbS5kaXNhYmxlZClcbiAgICAgICAgICAgIC5mb3JFYWNoKChyZW5kZXJlZE9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzTGFzdFJlbmRlcmVkT3B0aW9uID0gcmVuZGVyZWRPcHRpb24gPT09IHRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzTGFzdFJlbmRlcmVkT3B0aW9uICYmIHJlbmRlcmVkT3B0aW9uLnNlbGVjdGVkICYmIHRoaXMubm9VbnNlbGVjdExhc3QpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICAgICAgICByZW5kZXJlZE9wdGlvbi5zZXRTZWxlY3RlZCghc2VsZWN0ZWRPcHRpb25TdGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRGb2N1c2VkT3B0aW9uKG9wdGlvbjogVCk6IHZvaWQge1xuICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShvcHRpb24pO1xuICAgIH1cblxuICAgIHRvZ2dsZUZvY3VzZWRPcHRpb24oKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGZvY3VzZWRPcHRpb24gPSB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbTtcblxuICAgICAgICBpZiAoZm9jdXNlZE9wdGlvbiAmJiAoIWZvY3VzZWRPcHRpb24uc2VsZWN0ZWQgfHwgdGhpcy5jYW5EZXNlbGVjdExhc3QoZm9jdXNlZE9wdGlvbikpKSB7XG4gICAgICAgICAgICBmb2N1c2VkT3B0aW9uLnRvZ2dsZSgpO1xuICAgICAgICAgICAgdGhpcy5lbWl0Q2hhbmdlRXZlbnQoZm9jdXNlZE9wdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJOb2RlQ2hhbmdlcyhcbiAgICAgICAgZGF0YTogVFtdLFxuICAgICAgICBkYXRhRGlmZmVyOiBJdGVyYWJsZURpZmZlcjxUPiA9IHRoaXMuZGF0YURpZmZlcixcbiAgICAgICAgdmlld0NvbnRhaW5lcjogYW55ID0gdGhpcy5ub2RlT3V0bGV0LnZpZXdDb250YWluZXIsXG4gICAgICAgIHBhcmVudERhdGE/OiBUXG4gICAgKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnJlbmRlck5vZGVDaGFuZ2VzKGRhdGEsIGRhdGFEaWZmZXIsIHZpZXdDb250YWluZXIsIHBhcmVudERhdGEpO1xuXG4gICAgICAgIGNvbnN0IGFycmF5T2ZJbnN0YW5jZXMgPSBbXTtcbiAgICAgICAgY29uc3QgY2hhbmdlRGV0ZWN0b3JSZWZzOiBhbnlbXSA9IFtdO1xuXG4gICAgICAgIHZpZXdDb250YWluZXIuX2VtYmVkZGVkVmlld3MuZm9yRWFjaCgodmlldzogVmlld0RhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZpZXdEZWYgPSB2aWV3LmRlZjtcblxuICAgICAgICAgICAgdmlld0RlZi5ub2Rlcy5mb3JFYWNoKChub2RlOiBOb2RlRGVmKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZpZXdEZWYubm9kZU1hdGNoZWRRdWVyaWVzID09PSBub2RlLm1hdGNoZWRRdWVyeUlkcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBub2RlRGF0YTogYW55ID0gdmlldy5ub2Rlc1tub2RlLm5vZGVJbmRleF07XG5cbiAgICAgICAgICAgICAgICAgICAgYXJyYXlPZkluc3RhbmNlcy5wdXNoKG5vZGVEYXRhLmluc3RhbmNlIGFzIG5ldmVyKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWZzLnB1c2gobm9kZURhdGEuaW5zdGFuY2UuY2hhbmdlRGV0ZWN0b3JSZWYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNoYW5nZURldGVjdG9yUmVmcy5mb3JFYWNoKChjaGFuZ2VEZXRlY3RvclJlZikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghY2hhbmdlRGV0ZWN0b3JSZWYuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMucmVuZGVyZWRPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVkT3B0aW9ucy5yZXNldChhcnJheU9mSW5zdGFuY2VzKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZWRPcHRpb25zLm5vdGlmeU9uQ2hhbmdlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVTY3JvbGxTaXplKCk7XG5cbiAgICAgICAgdGhpcy5ub2RlT3V0bGV0LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBnZXRIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgY2xpZW50UmVjdHMgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRDbGllbnRSZWN0cygpO1xuXG4gICAgICAgIGlmIChjbGllbnRSZWN0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBjbGllbnRSZWN0c1swXS5oZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBnZXRJdGVtSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVkT3B0aW9ucy5maXJzdCA/IHRoaXMucmVuZGVyZWRPcHRpb25zLmZpcnN0LmdldEhlaWdodCgpIDogMDtcbiAgICB9XG5cbiAgICBlbWl0TmF2aWdhdGlvbkV2ZW50KG9wdGlvbjogVCk6IHZvaWQge1xuICAgICAgICB0aGlzLm5hdmlnYXRpb25DaGFuZ2UuZW1pdChuZXcgTWNUcmVlTmF2aWdhdGlvbkNoYW5nZSh0aGlzLCBvcHRpb24pKTtcbiAgICB9XG5cbiAgICBlbWl0Q2hhbmdlRXZlbnQob3B0aW9uOiBUKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQobmV3IE1jVHJlZU5hdmlnYXRpb25DaGFuZ2UodGhpcywgb3B0aW9uKSk7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHZhbHVlICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgdGhyb3cgZ2V0TWNTZWxlY3ROb25BcnJheVZhbHVlRXJyb3IoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJlbmRlcmVkT3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5zZXRPcHRpb25zRnJvbVZhbHVlcyh0aGlzLm11bHRpcGxlID8gdmFsdWUgOiBbdmFsdWVdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBgVmlldyAtPiBtb2RlbCBjYWxsYmFjayBjYWxsZWQgd2hlbiB2YWx1ZSBjaGFuZ2VzYCAqL1xuICAgIG9uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8qKiBgVmlldyAtPiBtb2RlbCBjYWxsYmFjayBjYWxsZWQgd2hlbiBzZWxlY3QgaGFzIGJlZW4gdG91Y2hlZGAgKi9cbiAgICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGRpc2FibGVkIHN0YXRlIG9mIHRoZSBjb250cm9sLiBJbXBsZW1lbnRlZCBhcyBhIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAgICovXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBzZXRPcHRpb25zRnJvbVZhbHVlcyh2YWx1ZXM6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcblxuICAgICAgICBjb25zdCB2YWx1ZXNUb1NlbGVjdCA9IHZhbHVlcy5yZWR1Y2UoKHJlc3VsdCwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyZWVDb250cm9sLmhhc1ZhbHVlKHZhbHVlKSA/IFsuLi5yZXN1bHQsIHRoaXMudHJlZUNvbnRyb2wuaGFzVmFsdWUodmFsdWUpXSA6IFsuLi5yZXN1bHRdO1xuICAgICAgICB9LCBbXSk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3QoLi4udmFsdWVzVG9TZWxlY3QpO1xuICAgIH1cblxuICAgIGdldFNlbGVjdGVkVmFsdWVzKCk6IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWQubWFwKChzZWxlY3RlZCkgPT4gdGhpcy50cmVlQ29udHJvbC5nZXRWYWx1ZShzZWxlY3RlZCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVUYWJJbmRleCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdGFiSW5kZXggPSB0aGlzLnJlbmRlcmVkT3B0aW9ucy5sZW5ndGggPT09IDAgPyAtMSA6IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhbGxvd0ZvY3VzRXNjYXBlKCkge1xuICAgICAgICBpZiAodGhpcy5fdGFiSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl90YWJJbmRleCA9IC0xO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl90YWJJbmRleCA9IHRoaXMudXNlclRhYkluZGV4IHx8IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNldE9wdGlvbnMoKSB7XG4gICAgICAgIHRoaXMuZHJvcFN1YnNjcmlwdGlvbnMoKTtcbiAgICAgICAgdGhpcy5saXN0ZW5Ub09wdGlvbnNGb2N1cygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJvcFN1YnNjcmlwdGlvbnMoKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbkZvY3VzU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbkZvY3VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbkZvY3VzU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbkJsdXJTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uQmx1clN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25CbHVyU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbGlzdGVuVG9PcHRpb25zRm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3B0aW9uRm9jdXNTdWJzY3JpcHRpb24gPSB0aGlzLm9wdGlvbkZvY3VzQ2hhbmdlc1xuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleDogbnVtYmVyID0gdGhpcy5yZW5kZXJlZE9wdGlvbnMudG9BcnJheSgpLmluZGV4T2YoZXZlbnQub3B0aW9uIGFzIFQpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlZE9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigob3B0aW9uKSA9PiBvcHRpb24uaGFzRm9jdXMpXG4gICAgICAgICAgICAgICAgICAgIC5mb3JFYWNoKChvcHRpb24pID0+IG9wdGlvbi5oYXNGb2N1cyA9IGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRJbmRleChpbmRleCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnVwZGF0ZUFjdGl2ZUl0ZW0oaW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub3B0aW9uQmx1clN1YnNjcmlwdGlvbiA9IHRoaXMub3B0aW9uQmx1ckNoYW5nZXNcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5ibHVyKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFV0aWxpdHkgdG8gZW5zdXJlIGFsbCBpbmRleGVzIGFyZSB2YWxpZC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IHRvIGJlIGNoZWNrZWQuXG4gICAgICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgaW5kZXggaXMgdmFsaWQgZm9yIG91ciBsaXN0IG9mIG9wdGlvbnMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBpc1ZhbGlkSW5kZXgoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gaW5kZXggPj0gMCAmJiBpbmRleCA8IHRoaXMucmVuZGVyZWRPcHRpb25zLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKiogQ2hlY2tzIHdoZXRoZXIgYW55IG9mIHRoZSBvcHRpb25zIGlzIGZvY3VzZWQuICovXG4gICAgcHJpdmF0ZSBoYXNGb2N1c2VkT3B0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJlZE9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiBvcHRpb24uaGFzRm9jdXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWFya09wdGlvbnNGb3JDaGVjaygpIHtcbiAgICAgICAgaWYgKHRoaXMucmVuZGVyZWRPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVkT3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IG9wdGlvbi5tYXJrRm9yQ2hlY2soKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZU9wdGlvbnNGb2N1cygpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlZE9wdGlvbnNcbiAgICAgICAgICAgIC5maWx0ZXIoKG9wdGlvbikgPT4gb3B0aW9uLmhhc0ZvY3VzKVxuICAgICAgICAgICAgLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uLmhhc0ZvY3VzID0gZmFsc2UpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FuRGVzZWxlY3RMYXN0KG9wdGlvbjogTWNUcmVlT3B0aW9uKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhKHRoaXMubm9VbnNlbGVjdExhc3QgJiYgdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZC5sZW5ndGggPT09IDEgJiYgb3B0aW9uLnNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzRm9jdXNSZWNlaXZlZEZyb21OZXN0ZWRPcHRpb24oJGV2ZW50OiBGb2N1c0V2ZW50KSB7XG4gICAgICAgIGlmICghJGV2ZW50IHx8ICEkZXZlbnQucmVsYXRlZFRhcmdldCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICByZXR1cm4gKCRldmVudC5yZWxhdGVkVGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3QuY29udGFpbnMoJ21jLXRyZWUtb3B0aW9uJyk7XG4gICAgfVxufVxuXG4iXX0=