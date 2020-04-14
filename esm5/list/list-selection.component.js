/**
 * @fileoverview added by tsickle
 * Generated from: list-selection.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends, __read, __spread, __values } from "tslib";
/* tslint:disable:no-empty */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { Attribute, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Input, Output, QueryList, ViewEncapsulation, ChangeDetectorRef, Inject, ViewChild, NgZone, Optional } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { DOWN_ARROW, END, ENTER, hasModifierKey, HOME, PAGE_DOWN, PAGE_UP, SPACE, TAB, UP_ARROW } from '@ptsecurity/cdk/keycodes';
import { McLine, mixinDisabled, toBoolean, mixinTabIndex, MultipleMode, McOptgroup } from '@ptsecurity/mosaic/core';
import { merge, Subject } from 'rxjs';
import { startWith, take, takeUntil } from 'rxjs/operators';
/**
 * @record
 */
export function McOptionEvent() { }
if (false) {
    /** @type {?} */
    McOptionEvent.prototype.option;
}
/**
 * Component for list-options of selection-list. Each list-option can automatically
 * generate a checkbox and can put current item into the selectionModel of selection-list
 * if the current item is selected.
 */
var McListOption = /** @class */ (function () {
    function McListOption(elementRef, changeDetector, ngZone, listSelection, group) {
        this.elementRef = elementRef;
        this.changeDetector = changeDetector;
        this.ngZone = ngZone;
        this.listSelection = listSelection;
        this.group = group;
        this.hasFocus = false;
        this.onFocus = new Subject();
        this.onBlur = new Subject();
        this._disabled = false;
        this._selected = false;
    }
    Object.defineProperty(McListOption.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var listSelectionDisabled = this.listSelection && this.listSelection.disabled;
            /** @type {?} */
            var groupDisabled = this.group && this.group.disabled;
            return listSelectionDisabled || groupDisabled || this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var newValue = toBoolean(value);
            if (newValue !== this._disabled) {
                this._disabled = newValue;
                this.changeDetector.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McListOption.prototype, "showCheckbox", {
        get: /**
         * @return {?}
         */
        function () {
            return this._showCheckbox !== undefined ? this._showCheckbox : this.listSelection.showCheckbox;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._showCheckbox = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McListOption.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this.listSelection.selectionModel && this.listSelection.selectionModel.isSelected(this) || false;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var isSelected = toBoolean(value);
            if (isSelected !== this._selected) {
                this.setSelected(isSelected);
                this.listSelection.reportValueChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McListOption.prototype, "tabIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return this.disabled ? null : -1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McListOption.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._selected) {
            // List options that are selected at initialization can't be reported properly to the form
            // control. This is because it takes some time until the selection-list knows about all
            // available options. Also it can happen that the ControlValueAccessor has an initial value
            // that should be used instead. Deferring the value change report to the next tick ensures
            // that the form control value is not being overwritten.
            /** @type {?} */
            var wasSelected_1 = this._selected;
            Promise.resolve().then((/**
             * @return {?}
             */
            function () {
                if (_this._selected || wasSelected_1) {
                    _this.selected = true;
                    _this.changeDetector.markForCheck();
                }
            }));
        }
    };
    /**
     * @return {?}
     */
    McListOption.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.selected) {
            // We have to delay this until the next tick in order
            // to avoid changed after checked errors.
            Promise.resolve().then((/**
             * @return {?}
             */
            function () { return _this.selected = false; }));
        }
        this.listSelection.removeOptionFromList(this);
    };
    /**
     * @return {?}
     */
    McListOption.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.selected = !this.selected;
    };
    /**
     * @return {?}
     */
    McListOption.prototype.getLabel = /**
     * @return {?}
     */
    function () {
        return this.text ? this.text.nativeElement.textContent : '';
    };
    /**
     * @param {?} selected
     * @return {?}
     */
    McListOption.prototype.setSelected = /**
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        if (this._selected === selected || !this.listSelection.selectionModel) {
            return;
        }
        this._selected = selected;
        if (selected) {
            this.listSelection.selectionModel.select(this);
        }
        else {
            this.listSelection.selectionModel.deselect(this);
        }
        this.changeDetector.markForCheck();
    };
    /**
     * @return {?}
     */
    McListOption.prototype.getHeight = /**
     * @return {?}
     */
    function () {
        return this.elementRef.nativeElement.getClientRects()[0].height;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    McListOption.prototype.handleClick = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (this.disabled) {
            return;
        }
        this.listSelection.setSelectedOptionsByClick(this, hasModifierKey($event, 'shiftKey'), hasModifierKey($event, 'ctrlKey'));
    };
    /**
     * @return {?}
     */
    McListOption.prototype.focus = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.hasFocus) {
            this.elementRef.nativeElement.focus();
            this.onFocus.next({ option: this });
            Promise.resolve().then((/**
             * @return {?}
             */
            function () {
                _this.hasFocus = true;
                _this.changeDetector.markForCheck();
            }));
        }
    };
    /**
     * @return {?}
     */
    McListOption.prototype.blur = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // When animations are enabled, Angular may end up removing the option from the DOM a little
        // earlier than usual, causing it to be blurred and throwing off the logic in the list
        // that moves focus not the next item. To work around the issue, we defer marking the option
        // as not focused until the next time the zone stabilizes.
        this.ngZone.onStable
            .asObservable()
            .pipe(take(1))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.ngZone.run((/**
             * @return {?}
             */
            function () {
                _this.hasFocus = false;
                _this.onBlur.next({ option: _this });
            }));
        }));
    };
    /**
     * @return {?}
     */
    McListOption.prototype.getHostElement = /**
     * @return {?}
     */
    function () {
        return this.elementRef.nativeElement;
    };
    McListOption.decorators = [
        { type: Component, args: [{
                    exportAs: 'mcListOption',
                    selector: 'mc-list-option',
                    host: {
                        class: 'mc-list-option mc-no-select',
                        '[class.mc-selected]': 'selected',
                        '[class.mc-focused]': 'hasFocus',
                        '[class.mc-disabled]': 'disabled',
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.disabled]': 'disabled || null',
                        '(focus)': 'focus()',
                        '(blur)': 'blur()',
                        '(click)': 'handleClick($event)'
                    },
                    template: "<div class=\"mc-list-item-content\">\n    <mc-pseudo-checkbox\n        *ngIf=\"showCheckbox\"\n        [state]=\"selected ? 'checked' : 'unchecked'\"\n        [disabled]=\"disabled\">\n    </mc-pseudo-checkbox>\n\n    <div class=\"mc-list-text\" #text>\n        <ng-content></ng-content>\n    </div>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    McListOption.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: NgZone },
        { type: McListSelection, decorators: [{ type: Inject, args: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return McListSelection; })),] }] },
        { type: McOptgroup, decorators: [{ type: Optional }] }
    ]; };
    McListOption.propDecorators = {
        lines: [{ type: ContentChildren, args: [McLine,] }],
        text: [{ type: ViewChild, args: ['text', { static: false },] }],
        checkboxPosition: [{ type: Input }],
        value: [{ type: Input }],
        disabled: [{ type: Input }],
        showCheckbox: [{ type: Input }],
        selected: [{ type: Input }]
    };
    return McListOption;
}());
export { McListOption };
if (false) {
    /** @type {?} */
    McListOption.prototype.hasFocus;
    /** @type {?} */
    McListOption.prototype.onFocus;
    /** @type {?} */
    McListOption.prototype.onBlur;
    /** @type {?} */
    McListOption.prototype.lines;
    /** @type {?} */
    McListOption.prototype.text;
    /** @type {?} */
    McListOption.prototype.checkboxPosition;
    /** @type {?} */
    McListOption.prototype.value;
    /**
     * @type {?}
     * @private
     */
    McListOption.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    McListOption.prototype._showCheckbox;
    /**
     * @type {?}
     * @private
     */
    McListOption.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    McListOption.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    McListOption.prototype.changeDetector;
    /**
     * @type {?}
     * @private
     */
    McListOption.prototype.ngZone;
    /** @type {?} */
    McListOption.prototype.listSelection;
    /** @type {?} */
    McListOption.prototype.group;
}
/** @type {?} */
export var MC_SELECTION_LIST_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return McListSelection; })),
    multi: true
};
var McListSelectionChange = /** @class */ (function () {
    function McListSelectionChange(source, option) {
        this.source = source;
        this.option = option;
    }
    return McListSelectionChange;
}());
export { McListSelectionChange };
if (false) {
    /** @type {?} */
    McListSelectionChange.prototype.source;
    /** @type {?} */
    McListSelectionChange.prototype.option;
}
var McListSelectionBase = /** @class */ (function () {
    function McListSelectionBase(elementRef) {
        this.elementRef = elementRef;
    }
    return McListSelectionBase;
}());
export { McListSelectionBase };
if (false) {
    /** @type {?} */
    McListSelectionBase.prototype.elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export var McListSelectionMixinBase = mixinTabIndex(mixinDisabled(McListSelectionBase));
var McListSelection = /** @class */ (function (_super) {
    __extends(McListSelection, _super);
    function McListSelection(elementRef, changeDetectorRef, multiple) {
        var _this = _super.call(this, elementRef) || this;
        _this.changeDetectorRef = changeDetectorRef;
        _this._autoSelect = true;
        _this._noUnselectLast = true;
        _this.horizontal = false;
        _this._tabIndex = 0;
        _this.userTabIndex = null;
        // Emits a change event whenever the selected state of an option changes.
        _this.selectionChange = new EventEmitter();
        /**
         * Emits whenever the component is destroyed.
         */
        _this.destroyed = new Subject();
        // View to model callback that should be called if the list or its options lost focus.
        // tslint:disable-next-line:no-empty
        _this.onTouched = (/**
         * @return {?}
         */
        function () { });
        // View to model callback that should be called whenever the selected options change.
        _this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
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
    Object.defineProperty(McListSelection.prototype, "autoSelect", {
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
    Object.defineProperty(McListSelection.prototype, "noUnselectLast", {
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
    Object.defineProperty(McListSelection.prototype, "multiple", {
        get: /**
         * @return {?}
         */
        function () {
            return !!this.multipleMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McListSelection.prototype, "tabIndex", {
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
            this.userTabIndex = value;
            this._tabIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McListSelection.prototype, "showCheckbox", {
        get: /**
         * @return {?}
         */
        function () {
            return this.multipleMode === MultipleMode.CHECKBOX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McListSelection.prototype, "optionFocusChanges", {
        get: /**
         * @return {?}
         */
        function () {
            return merge.apply(void 0, __spread(this.options.map((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return option.onFocus; }))));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McListSelection.prototype, "optionBlurChanges", {
        get: /**
         * @return {?}
         */
        function () {
            return merge.apply(void 0, __spread(this.options.map((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return option.onBlur; }))));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McListSelection.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.horizontal = toBoolean(this.horizontal);
        this.keyManager = new FocusKeyManager(this.options)
            .withTypeAhead()
            .withVerticalOrientation(!this.horizontal)
            .withHorizontalOrientation(this.horizontal ? 'ltr' : null);
        this.keyManager.tabOut
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this._tabIndex = -1;
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this._tabIndex = _this.userTabIndex || 0;
                _this.changeDetectorRef.markForCheck();
            }));
        }));
        if (this.tempValues) {
            this.setOptionsFromValues(this.tempValues);
            this.tempValues = null;
        }
        this.selectionModel.changed
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            var e_1, _a, e_2, _b;
            try {
                for (var _c = __values(event.added), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var item = _d.value;
                    item.selected = true;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                for (var _e = __values(event.removed), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var item = _f.value;
                    item.selected = false;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }));
        this.options.changes
            .pipe(startWith(null), takeUntil(this.destroyed))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.resetOptions();
            // Check to see if we need to update our tab index
            _this.updateTabIndex();
        }));
        this.updateScrollSize();
    };
    /**
     * @return {?}
     */
    McListSelection.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed.next();
        this.destroyed.complete();
    };
    /**
     * @return {?}
     */
    McListSelection.prototype.focus = /**
     * @return {?}
     */
    function () {
        if (this.options.length === 0) {
            return;
        }
        this.keyManager.setFirstItemActive();
    };
    /**
     * @return {?}
     */
    McListSelection.prototype.blur = /**
     * @return {?}
     */
    function () {
        if (!this.hasFocusedOption()) {
            this.keyManager.setActiveItem(-1);
        }
        this.onTouched();
        this.changeDetectorRef.markForCheck();
    };
    /**
     * @return {?}
     */
    McListSelection.prototype.selectAll = /**
     * @return {?}
     */
    function () {
        this.options.forEach((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return option.setSelected(true); }));
        this.reportValueChange();
    };
    /**
     * @return {?}
     */
    McListSelection.prototype.deselectAll = /**
     * @return {?}
     */
    function () {
        this.options.forEach((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return option.setSelected(false); }));
        this.reportValueChange();
    };
    /**
     * @return {?}
     */
    McListSelection.prototype.updateScrollSize = /**
     * @return {?}
     */
    function () {
        if (this.horizontal || !this.options.first) {
            return;
        }
        this.keyManager.withScrollSize(Math.floor(this.getHeight() / this.options.first.getHeight()));
    };
    /**
     * @param {?} option
     * @param {?} shiftKey
     * @param {?} ctrlKey
     * @return {?}
     */
    McListSelection.prototype.setSelectedOptionsByClick = /**
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
            this.selectionModel.toggle(option);
        }
        else {
            if (this.autoSelect) {
                this.options.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.setSelected(false); }));
                option.setSelected(true);
            }
        }
        this.emitChangeEvent(option);
        this.reportValueChange();
    };
    /**
     * @param {?} option
     * @param {?} shiftKey
     * @param {?} ctrlKey
     * @return {?}
     */
    McListSelection.prototype.setSelectedOptionsByKey = /**
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
        else {
            if (this.autoSelect) {
                this.options.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.setSelected(false); }));
                option.setSelected(true);
            }
        }
        this.emitChangeEvent(option);
        this.reportValueChange();
    };
    /**
     * @param {?} option
     * @return {?}
     */
    McListSelection.prototype.setSelectedOptions = /**
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
        this.options
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
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} values
     * @return {?}
     */
    McListSelection.prototype.writeValue = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} values
     * @return {?}
     */
    function (values) {
        if (this.options) {
            this.setOptionsFromValues(values || []);
        }
        else {
            this.tempValues = values;
        }
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    McListSelection.prototype.registerOnChange = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    McListSelection.prototype.registerOnTouched = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    // Implemented as a part of ControlValueAccessor.
    // Implemented as a part of ControlValueAccessor.
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    McListSelection.prototype.setDisabledState = 
    // Implemented as a part of ControlValueAccessor.
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        if (this.options) {
            this.options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return option.disabled = isDisabled; }));
        }
    };
    /**
     * @return {?}
     */
    McListSelection.prototype.getSelectedOptionValues = /**
     * @return {?}
     */
    function () {
        return this.options.filter((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return option.selected; })).map((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return option.value; }));
    };
    // Toggles the selected state of the currently focused option.
    // Toggles the selected state of the currently focused option.
    /**
     * @return {?}
     */
    McListSelection.prototype.toggleFocusedOption = 
    // Toggles the selected state of the currently focused option.
    /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var focusedIndex = this.keyManager.activeItemIndex;
        if (focusedIndex != null && this.isValidIndex(focusedIndex)) {
            /** @type {?} */
            var focusedOption = this.options.toArray()[focusedIndex];
            if (focusedOption && this.canDeselectLast(focusedOption)) {
                focusedOption.toggle();
                // Emit a change event because the focused option changed its state through user interaction.
                this.emitChangeEvent(focusedOption);
            }
        }
    };
    /**
     * @param {?} listOption
     * @return {?}
     */
    McListSelection.prototype.canDeselectLast = /**
     * @param {?} listOption
     * @return {?}
     */
    function (listOption) {
        return !(this.noUnselectLast && this.selectionModel.selected.length === 1 && listOption.selected);
    };
    /**
     * @return {?}
     */
    McListSelection.prototype.getHeight = /**
     * @return {?}
     */
    function () {
        return this.elementRef.nativeElement.getClientRects()[0].height;
    };
    // Removes an option from the selection list and updates the active item.
    // Removes an option from the selection list and updates the active item.
    /**
     * @param {?} option
     * @return {?}
     */
    McListSelection.prototype.removeOptionFromList = 
    // Removes an option from the selection list and updates the active item.
    /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (option.hasFocus) {
            /** @type {?} */
            var optionIndex = this.getOptionIndex(option);
            // Check whether the option is the last item
            if (optionIndex > 0) {
                this.keyManager.setPreviousItemActive();
            }
            else if (optionIndex === 0 && this.options.length > 1) {
                this.keyManager.setNextItemActive();
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McListSelection.prototype.onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // tslint:disable-next-line: deprecation
        /** @type {?} */
        var keyCode = event.keyCode;
        switch (keyCode) {
            case SPACE:
            case ENTER:
                this.toggleFocusedOption();
                break;
            case TAB:
                this.keyManager.tabOut.next();
                return;
            case DOWN_ARROW:
                this.keyManager.setNextItemActive();
                break;
            case UP_ARROW:
                this.keyManager.setPreviousItemActive();
                break;
            case HOME:
                this.keyManager.setFirstItemActive();
                break;
            case END:
                this.keyManager.setLastItemActive();
                break;
            case PAGE_UP:
                this.keyManager.setPreviousPageItemActive();
                break;
            case PAGE_DOWN:
                this.keyManager.setNextPageItemActive();
                break;
            default:
                return;
        }
        event.preventDefault();
        this.setSelectedOptionsByKey((/** @type {?} */ (this.keyManager.activeItem)), hasModifierKey(event, 'shiftKey'), hasModifierKey(event, 'ctrlKey'));
    };
    // Reports a value change to the ControlValueAccessor
    // Reports a value change to the ControlValueAccessor
    /**
     * @return {?}
     */
    McListSelection.prototype.reportValueChange = 
    // Reports a value change to the ControlValueAccessor
    /**
     * @return {?}
     */
    function () {
        if (this.options) {
            this.onChange(this.getSelectedOptionValues());
        }
    };
    // Emits a change event if the selected state of an option changed.
    // Emits a change event if the selected state of an option changed.
    /**
     * @param {?} option
     * @return {?}
     */
    McListSelection.prototype.emitChangeEvent = 
    // Emits a change event if the selected state of an option changed.
    /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this.selectionChange.emit(new McListSelectionChange(this, option));
    };
    /**
     * @protected
     * @return {?}
     */
    McListSelection.prototype.updateTabIndex = /**
     * @protected
     * @return {?}
     */
    function () {
        this._tabIndex = this.userTabIndex || (this.options.length === 0 ? -1 : 0);
    };
    /**
     * @private
     * @return {?}
     */
    McListSelection.prototype.resetOptions = /**
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
    McListSelection.prototype.dropSubscriptions = /**
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
    McListSelection.prototype.listenToOptionsFocus = /**
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
            var index = _this.options.toArray().indexOf(event.option);
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
    /** Checks whether any of the options is focused. */
    /**
     * Checks whether any of the options is focused.
     * @private
     * @return {?}
     */
    McListSelection.prototype.hasFocusedOption = /**
     * Checks whether any of the options is focused.
     * @private
     * @return {?}
     */
    function () {
        return this.options.some((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return option.hasFocus; }));
    };
    // Returns the option with the specified value.
    // Returns the option with the specified value.
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    McListSelection.prototype.getOptionByValue = 
    // Returns the option with the specified value.
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.options.find((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return option.value === value; }));
    };
    // Sets the selected options based on the specified values.
    // Sets the selected options based on the specified values.
    /**
     * @private
     * @param {?} values
     * @return {?}
     */
    McListSelection.prototype.setOptionsFromValues = 
    // Sets the selected options based on the specified values.
    /**
     * @private
     * @param {?} values
     * @return {?}
     */
    function (values) {
        var _this = this;
        this.options.forEach((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return option.setSelected(false); }));
        values
            .map((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _this.getOptionByValue(value); }))
            .filter(Boolean)
            .forEach((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return (/** @type {?} */ (option)).setSelected(true); }));
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
    McListSelection.prototype.isValidIndex = /**
     * Utility to ensure all indexes are valid.
     * @private
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of options.
     */
    function (index) {
        return index >= 0 && index < this.options.length;
    };
    // Returns the index of the specified list option.
    // Returns the index of the specified list option.
    /**
     * @private
     * @param {?} option
     * @return {?}
     */
    McListSelection.prototype.getOptionIndex = 
    // Returns the index of the specified list option.
    /**
     * @private
     * @param {?} option
     * @return {?}
     */
    function (option) {
        return this.options.toArray().indexOf(option);
    };
    McListSelection.decorators = [
        { type: Component, args: [{
                    exportAs: 'mcListSelection',
                    selector: 'mc-list-selection',
                    template: '<ng-content></ng-content>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    inputs: ['disabled'],
                    host: {
                        class: 'mc-list-selection',
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.disabled]': 'disabled || null',
                        '(focus)': 'focus()',
                        '(blur)': 'blur()',
                        '(keydown)': 'onKeyDown($event)',
                        '(window:resize)': 'updateScrollSize()'
                    },
                    providers: [MC_SELECTION_LIST_VALUE_ACCESSOR],
                    preserveWhitespaces: false,
                    styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider_vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider_inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:80px}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-list,.mc-list-selection{display:block;outline:0}.mc-list-item,.mc-list-option{display:block;height:28px;border:2px solid transparent}.mc-list-item .mc-list-item-content,.mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:100%;padding:0 15px}.mc-list-item.mc-2-line,.mc-list-option.mc-2-line{height:72px}.mc-list-item.mc-3-line,.mc-list-option.mc-3-line{height:88px}.mc-list-item.mc-multi-line,.mc-list-option.mc-multi-line{height:auto}.mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-bottom:16px}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;height:24px;border-radius:50%;padding:4px;font-size:24px}.mc-list-item .mc-list-icon~.mc-divider_inset,.mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider_inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:auto;margin-right:62px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider_inset,.mc-list-option .mc-divider.mc-divider_inset{position:absolute}.mc-list-item .mc-pseudo-checkbox,.mc-list-option .mc-pseudo-checkbox{margin-right:8px}.mc-list-option:not([disabled]):not(.mc-disabled){cursor:pointer}"]
                }] }
    ];
    /** @nocollapse */
    McListSelection.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: MultipleMode, decorators: [{ type: Attribute, args: ['multiple',] }] }
    ]; };
    McListSelection.propDecorators = {
        options: [{ type: ContentChildren, args: [McListOption, { descendants: true },] }],
        autoSelect: [{ type: Input }],
        noUnselectLast: [{ type: Input }],
        horizontal: [{ type: Input }],
        tabIndex: [{ type: Input }],
        selectionChange: [{ type: Output }]
    };
    return McListSelection;
}(McListSelectionMixinBase));
export { McListSelection };
if (false) {
    /** @type {?} */
    McListSelection.prototype.keyManager;
    /** @type {?} */
    McListSelection.prototype.options;
    /**
     * @type {?}
     * @private
     */
    McListSelection.prototype._autoSelect;
    /**
     * @type {?}
     * @private
     */
    McListSelection.prototype._noUnselectLast;
    /** @type {?} */
    McListSelection.prototype.multipleMode;
    /** @type {?} */
    McListSelection.prototype.horizontal;
    /**
     * @type {?}
     * @private
     */
    McListSelection.prototype._tabIndex;
    /** @type {?} */
    McListSelection.prototype.userTabIndex;
    /** @type {?} */
    McListSelection.prototype.selectionChange;
    /** @type {?} */
    McListSelection.prototype.selectionModel;
    /**
     * @type {?}
     * @private
     */
    McListSelection.prototype.tempValues;
    /**
     * Emits whenever the component is destroyed.
     * @type {?}
     * @private
     */
    McListSelection.prototype.destroyed;
    /**
     * @type {?}
     * @private
     */
    McListSelection.prototype.optionFocusSubscription;
    /**
     * @type {?}
     * @private
     */
    McListSelection.prototype.optionBlurSubscription;
    /** @type {?} */
    McListSelection.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    McListSelection.prototype.onChange;
    /**
     * @type {?}
     * @private
     */
    McListSelection.prototype.changeDetectorRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zZWxlY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL2xpc3QvIiwic291cmNlcyI6WyJsaXN0LXNlbGVjdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBRUgsU0FBUyxFQUNULHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNqQixpQkFBaUIsRUFDakIsTUFBTSxFQUdOLFNBQVMsRUFDVCxNQUFNLEVBQ04sUUFBUSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZUFBZSxFQUFvQixNQUFNLHNCQUFzQixDQUFDO0FBQ3pFLE9BQU8sRUFDSCxVQUFVLEVBQ1YsR0FBRyxFQUNILEtBQUssRUFDTCxjQUFjLEVBQ2QsSUFBSSxFQUNKLFNBQVMsRUFDVCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEdBQUcsRUFDSCxRQUFRLEVBQ1gsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBQ0gsTUFBTSxFQUVOLGFBQWEsRUFDYixTQUFTLEVBR1QsYUFBYSxFQUViLFlBQVksRUFDWixVQUFVLEVBQ2IsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsS0FBSyxFQUFjLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDaEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFJNUQsbUNBRUM7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OztJQUV0Qix1Q0FBbUM7O0lBT25DLDBDQUFvSDs7SUFFcEgseUNBQTZDOzs7OztJQVc3QyxxQ0FBb0M7Ozs7OztJQUdwQyxvQ0FBaUQ7Ozs7O0lBRWpELGtEQUFxRDs7Ozs7SUFFckQsaURBQW9EOztJQTZOcEQsb0NBQWlDOzs7OztJQXVKakMsbUNBQXdEOzs7OztJQWhYcEQsNENBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGU6bm8tZW1wdHkgKi9cbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQXR0cmlidXRlLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIEluamVjdCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBOZ1pvbmUsXG4gICAgT3B0aW9uYWxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb2N1c0tleU1hbmFnZXIsIElGb2N1c2FibGVPcHRpb24gfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIERPV05fQVJST1csXG4gICAgRU5ELFxuICAgIEVOVEVSLFxuICAgIGhhc01vZGlmaWVyS2V5LFxuICAgIEhPTUUsXG4gICAgUEFHRV9ET1dOLFxuICAgIFBBR0VfVVAsXG4gICAgU1BBQ0UsXG4gICAgVEFCLFxuICAgIFVQX0FSUk9XXG59IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICAgIE1jTGluZSxcbiAgICBDYW5EaXNhYmxlLFxuICAgIG1peGluRGlzYWJsZWQsXG4gICAgdG9Cb29sZWFuLFxuICAgIENhbkRpc2FibGVDdG9yLFxuICAgIEhhc1RhYkluZGV4Q3RvcixcbiAgICBtaXhpblRhYkluZGV4LFxuICAgIEhhc1RhYkluZGV4LFxuICAgIE11bHRpcGxlTW9kZSxcbiAgICBNY09wdGdyb3VwXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCwgdGFrZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBNY09wdGlvbkV2ZW50IHtcbiAgICBvcHRpb246IE1jTGlzdE9wdGlvbjtcbn1cblxuLyoqXG4gKiBDb21wb25lbnQgZm9yIGxpc3Qtb3B0aW9ucyBvZiBzZWxlY3Rpb24tbGlzdC4gRWFjaCBsaXN0LW9wdGlvbiBjYW4gYXV0b21hdGljYWxseVxuICogZ2VuZXJhdGUgYSBjaGVja2JveCBhbmQgY2FuIHB1dCBjdXJyZW50IGl0ZW0gaW50byB0aGUgc2VsZWN0aW9uTW9kZWwgb2Ygc2VsZWN0aW9uLWxpc3RcbiAqIGlmIHRoZSBjdXJyZW50IGl0ZW0gaXMgc2VsZWN0ZWQuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIGV4cG9ydEFzOiAnbWNMaXN0T3B0aW9uJyxcbiAgICBzZWxlY3RvcjogJ21jLWxpc3Qtb3B0aW9uJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbGlzdC1vcHRpb24gbWMtbm8tc2VsZWN0JyxcbiAgICAgICAgJ1tjbGFzcy5tYy1zZWxlY3RlZF0nOiAnc2VsZWN0ZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWZvY3VzZWRdJzogJ2hhc0ZvY3VzJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuXG4gICAgICAgICcoZm9jdXMpJzogJ2ZvY3VzKCknLFxuICAgICAgICAnKGJsdXIpJzogJ2JsdXIoKScsXG4gICAgICAgICcoY2xpY2spJzogJ2hhbmRsZUNsaWNrKCRldmVudCknXG4gICAgfSxcbiAgICB0ZW1wbGF0ZVVybDogJ2xpc3Qtb3B0aW9uLmh0bWwnLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWNMaXN0T3B0aW9uIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQsIElGb2N1c2FibGVPcHRpb24ge1xuICAgIGhhc0ZvY3VzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICByZWFkb25seSBvbkZvY3VzID0gbmV3IFN1YmplY3Q8TWNPcHRpb25FdmVudD4oKTtcblxuICAgIHJlYWRvbmx5IG9uQmx1ciA9IG5ldyBTdWJqZWN0PE1jT3B0aW9uRXZlbnQ+KCk7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKE1jTGluZSkgbGluZXM6IFF1ZXJ5TGlzdDxNY0xpbmU+O1xuXG4gICAgQFZpZXdDaGlsZCgndGV4dCcsIHsgc3RhdGljOiBmYWxzZSB9KSB0ZXh0OiBFbGVtZW50UmVmO1xuXG4gICAgLy8gV2hldGhlciB0aGUgbGFiZWwgc2hvdWxkIGFwcGVhciBiZWZvcmUgb3IgYWZ0ZXIgdGhlIGNoZWNrYm94LiBEZWZhdWx0cyB0byAnYWZ0ZXInXG4gICAgQElucHV0KCkgY2hlY2tib3hQb3NpdGlvbjogJ2JlZm9yZScgfCAnYWZ0ZXInO1xuXG4gICAgQElucHV0KCkgdmFsdWU6IGFueTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICBjb25zdCBsaXN0U2VsZWN0aW9uRGlzYWJsZWQgPSB0aGlzLmxpc3RTZWxlY3Rpb24gJiYgdGhpcy5saXN0U2VsZWN0aW9uLmRpc2FibGVkO1xuICAgICAgICBjb25zdCBncm91cERpc2FibGVkID0gdGhpcy5ncm91cCAmJiB0aGlzLmdyb3VwLmRpc2FibGVkO1xuXG4gICAgICAgIHJldHVybiBsaXN0U2VsZWN0aW9uRGlzYWJsZWQgfHwgZ3JvdXBEaXNhYmxlZCB8fCB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGFueSkge1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRvQm9vbGVhbih2YWx1ZSk7XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgc2hvd0NoZWNrYm94KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hvd0NoZWNrYm94ICE9PSB1bmRlZmluZWQgPyB0aGlzLl9zaG93Q2hlY2tib3ggOiB0aGlzLmxpc3RTZWxlY3Rpb24uc2hvd0NoZWNrYm94O1xuICAgIH1cblxuICAgIHNldCBzaG93Q2hlY2tib3godmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl9zaG93Q2hlY2tib3ggPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3Nob3dDaGVja2JveDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0U2VsZWN0aW9uLnNlbGVjdGlvbk1vZGVsICYmIHRoaXMubGlzdFNlbGVjdGlvbi5zZWxlY3Rpb25Nb2RlbC5pc1NlbGVjdGVkKHRoaXMpIHx8IGZhbHNlO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gdG9Cb29sZWFuKHZhbHVlKTtcblxuICAgICAgICBpZiAoaXNTZWxlY3RlZCAhPT0gdGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWQoaXNTZWxlY3RlZCk7XG5cbiAgICAgICAgICAgIHRoaXMubGlzdFNlbGVjdGlvbi5yZXBvcnRWYWx1ZUNoYW5nZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQgPSBmYWxzZTtcblxuICAgIGdldCB0YWJJbmRleCgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCA/IG51bGwgOiAtMTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBNY0xpc3RTZWxlY3Rpb24pKSBwdWJsaWMgbGlzdFNlbGVjdGlvbjogTWNMaXN0U2VsZWN0aW9uLFxuICAgICAgICBAT3B0aW9uYWwoKSByZWFkb25seSBncm91cDogTWNPcHRncm91cFxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIC8vIExpc3Qgb3B0aW9ucyB0aGF0IGFyZSBzZWxlY3RlZCBhdCBpbml0aWFsaXphdGlvbiBjYW4ndCBiZSByZXBvcnRlZCBwcm9wZXJseSB0byB0aGUgZm9ybVxuICAgICAgICAgICAgLy8gY29udHJvbC4gVGhpcyBpcyBiZWNhdXNlIGl0IHRha2VzIHNvbWUgdGltZSB1bnRpbCB0aGUgc2VsZWN0aW9uLWxpc3Qga25vd3MgYWJvdXQgYWxsXG4gICAgICAgICAgICAvLyBhdmFpbGFibGUgb3B0aW9ucy4gQWxzbyBpdCBjYW4gaGFwcGVuIHRoYXQgdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGhhcyBhbiBpbml0aWFsIHZhbHVlXG4gICAgICAgICAgICAvLyB0aGF0IHNob3VsZCBiZSB1c2VkIGluc3RlYWQuIERlZmVycmluZyB0aGUgdmFsdWUgY2hhbmdlIHJlcG9ydCB0byB0aGUgbmV4dCB0aWNrIGVuc3VyZXNcbiAgICAgICAgICAgIC8vIHRoYXQgdGhlIGZvcm0gY29udHJvbCB2YWx1ZSBpcyBub3QgYmVpbmcgb3ZlcndyaXR0ZW4uXG4gICAgICAgICAgICBjb25zdCB3YXNTZWxlY3RlZCA9IHRoaXMuX3NlbGVjdGVkO1xuXG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWQgfHwgd2FzU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gZGVsYXkgdGhpcyB1bnRpbCB0aGUgbmV4dCB0aWNrIGluIG9yZGVyXG4gICAgICAgICAgICAvLyB0byBhdm9pZCBjaGFuZ2VkIGFmdGVyIGNoZWNrZWQgZXJyb3JzLlxuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB0aGlzLnNlbGVjdGVkID0gZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5saXN0U2VsZWN0aW9uLnJlbW92ZU9wdGlvbkZyb21MaXN0KHRoaXMpO1xuICAgIH1cblxuICAgIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICF0aGlzLnNlbGVjdGVkO1xuICAgIH1cblxuICAgIGdldExhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0ID8gdGhpcy50ZXh0Lm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQgOiAnJztcbiAgICB9XG5cbiAgICBzZXRTZWxlY3RlZChzZWxlY3RlZDogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWQgPT09IHNlbGVjdGVkIHx8ICF0aGlzLmxpc3RTZWxlY3Rpb24uc2VsZWN0aW9uTW9kZWwpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSBzZWxlY3RlZDtcblxuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdFNlbGVjdGlvbi5zZWxlY3Rpb25Nb2RlbC5zZWxlY3QodGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RTZWxlY3Rpb24uc2VsZWN0aW9uTW9kZWwuZGVzZWxlY3QodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGdldEhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Q2xpZW50UmVjdHMoKVswXS5oZWlnaHQ7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soJGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMubGlzdFNlbGVjdGlvbi5zZXRTZWxlY3RlZE9wdGlvbnNCeUNsaWNrKFxuICAgICAgICAgICAgdGhpcywgaGFzTW9kaWZpZXJLZXkoJGV2ZW50LCAnc2hpZnRLZXknKSwgaGFzTW9kaWZpZXJLZXkoJGV2ZW50LCAnY3RybEtleScpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNGb2N1cykge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgICAgICAgdGhpcy5vbkZvY3VzLm5leHQoeyBvcHRpb246IHRoaXMgfSk7XG5cbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFzRm9jdXMgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmx1cigpOiB2b2lkIHtcbiAgICAgICAgLy8gV2hlbiBhbmltYXRpb25zIGFyZSBlbmFibGVkLCBBbmd1bGFyIG1heSBlbmQgdXAgcmVtb3ZpbmcgdGhlIG9wdGlvbiBmcm9tIHRoZSBET00gYSBsaXR0bGVcbiAgICAgICAgLy8gZWFybGllciB0aGFuIHVzdWFsLCBjYXVzaW5nIGl0IHRvIGJlIGJsdXJyZWQgYW5kIHRocm93aW5nIG9mZiB0aGUgbG9naWMgaW4gdGhlIGxpc3RcbiAgICAgICAgLy8gdGhhdCBtb3ZlcyBmb2N1cyBub3QgdGhlIG5leHQgaXRlbS4gVG8gd29yayBhcm91bmQgdGhlIGlzc3VlLCB3ZSBkZWZlciBtYXJraW5nIHRoZSBvcHRpb25cbiAgICAgICAgLy8gYXMgbm90IGZvY3VzZWQgdW50aWwgdGhlIG5leHQgdGltZSB0aGUgem9uZSBzdGFiaWxpemVzLlxuICAgICAgICB0aGlzLm5nWm9uZS5vblN0YWJsZVxuICAgICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNGb2N1cyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25CbHVyLm5leHQoeyBvcHRpb246IHRoaXMgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRIb3N0RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNvbnN0IE1DX1NFTEVDVElPTl9MSVNUX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWNMaXN0U2VsZWN0aW9uKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuZXhwb3J0IGNsYXNzIE1jTGlzdFNlbGVjdGlvbkNoYW5nZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZTogTWNMaXN0U2VsZWN0aW9uLCBwdWJsaWMgb3B0aW9uOiBNY0xpc3RPcHRpb24pIHt9XG59XG5cblxuZXhwb3J0IGNsYXNzIE1jTGlzdFNlbGVjdGlvbkJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY0xpc3RTZWxlY3Rpb25NaXhpbkJhc2U6IENhbkRpc2FibGVDdG9yICYgSGFzVGFiSW5kZXhDdG9yICYgdHlwZW9mIE1jTGlzdFNlbGVjdGlvbkJhc2VcbiAgICA9IG1peGluVGFiSW5kZXgobWl4aW5EaXNhYmxlZChNY0xpc3RTZWxlY3Rpb25CYXNlKSk7XG5cbkBDb21wb25lbnQoe1xuICAgIGV4cG9ydEFzOiAnbWNMaXN0U2VsZWN0aW9uJyxcbiAgICBzZWxlY3RvcjogJ21jLWxpc3Qtc2VsZWN0aW9uJyxcbiAgICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAgIHN0eWxlVXJsczogWycuL2xpc3Quc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaW5wdXRzOiBbJ2Rpc2FibGVkJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWxpc3Qtc2VsZWN0aW9uJyxcblxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcblxuICAgICAgICAnKGZvY3VzKSc6ICdmb2N1cygpJyxcbiAgICAgICAgJyhibHVyKSc6ICdibHVyKCknLFxuICAgICAgICAnKGtleWRvd24pJzogJ29uS2V5RG93bigkZXZlbnQpJyxcbiAgICAgICAgJyh3aW5kb3c6cmVzaXplKSc6ICd1cGRhdGVTY3JvbGxTaXplKCknXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtNQ19TRUxFQ1RJT05fTElTVF9WQUxVRV9BQ0NFU1NPUl0sXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgTWNMaXN0U2VsZWN0aW9uIGV4dGVuZHMgTWNMaXN0U2VsZWN0aW9uTWl4aW5CYXNlIGltcGxlbWVudHMgQ2FuRGlzYWJsZSwgSGFzVGFiSW5kZXgsIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAga2V5TWFuYWdlcjogRm9jdXNLZXlNYW5hZ2VyPE1jTGlzdE9wdGlvbj47XG5cbiAgICBAQ29udGVudENoaWxkcmVuKE1jTGlzdE9wdGlvbiwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBvcHRpb25zOiBRdWVyeUxpc3Q8TWNMaXN0T3B0aW9uPjtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGF1dG9TZWxlY3QoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRvU2VsZWN0O1xuICAgIH1cblxuICAgIHNldCBhdXRvU2VsZWN0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2F1dG9TZWxlY3QgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2F1dG9TZWxlY3Q6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbm9VbnNlbGVjdExhc3QoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ub1Vuc2VsZWN0TGFzdDtcbiAgICB9XG5cbiAgICBzZXQgbm9VbnNlbGVjdExhc3QodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fbm9VbnNlbGVjdExhc3QgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX25vVW5zZWxlY3RMYXN0OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIG11bHRpcGxlTW9kZTogTXVsdGlwbGVNb2RlIHwgbnVsbDtcblxuICAgIGdldCBtdWx0aXBsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5tdWx0aXBsZU1vZGU7XG4gICAgfVxuXG4gICAgQElucHV0KCkgaG9yaXpvbnRhbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgdGFiSW5kZXgoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPyAtMSA6IHRoaXMuX3RhYkluZGV4O1xuICAgIH1cblxuICAgIHNldCB0YWJJbmRleCh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMudXNlclRhYkluZGV4ID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX3RhYkluZGV4ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdGFiSW5kZXggPSAwO1xuXG4gICAgdXNlclRhYkluZGV4OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAgIGdldCBzaG93Q2hlY2tib3goKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlTW9kZSA9PT0gTXVsdGlwbGVNb2RlLkNIRUNLQk9YO1xuICAgIH1cblxuICAgIC8vIEVtaXRzIGEgY2hhbmdlIGV2ZW50IHdoZW5ldmVyIHRoZSBzZWxlY3RlZCBzdGF0ZSBvZiBhbiBvcHRpb24gY2hhbmdlcy5cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TWNMaXN0U2VsZWN0aW9uQ2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWNMaXN0U2VsZWN0aW9uQ2hhbmdlPigpO1xuXG4gICAgc2VsZWN0aW9uTW9kZWw6IFNlbGVjdGlvbk1vZGVsPE1jTGlzdE9wdGlvbj47XG5cbiAgICBnZXQgb3B0aW9uRm9jdXNDaGFuZ2VzKCk6IE9ic2VydmFibGU8TWNPcHRpb25FdmVudD4ge1xuICAgICAgICByZXR1cm4gbWVyZ2UoLi4udGhpcy5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiBvcHRpb24ub25Gb2N1cykpO1xuICAgIH1cblxuICAgIGdldCBvcHRpb25CbHVyQ2hhbmdlcygpOiBPYnNlcnZhYmxlPE1jT3B0aW9uRXZlbnQ+IHtcbiAgICAgICAgcmV0dXJuIG1lcmdlKC4uLnRoaXMub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gb3B0aW9uLm9uQmx1cikpO1xuICAgIH1cblxuICAgIC8vIFVzZWQgZm9yIHN0b3JpbmcgdGhlIHZhbHVlcyB0aGF0IHdlcmUgYXNzaWduZWQgYmVmb3JlIHRoZSBvcHRpb25zIHdlcmUgaW5pdGlhbGl6ZWQuXG4gICAgcHJpdmF0ZSB0ZW1wVmFsdWVzOiBzdHJpbmdbXSB8IG51bGw7XG5cbiAgICAvKiogRW1pdHMgd2hlbmV2ZXIgdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgcHJpdmF0ZSBvcHRpb25Gb2N1c1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbDtcblxuICAgIHByaXZhdGUgb3B0aW9uQmx1clN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgQEF0dHJpYnV0ZSgnbXVsdGlwbGUnKSBtdWx0aXBsZTogTXVsdGlwbGVNb2RlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuXG4gICAgICAgIGlmIChtdWx0aXBsZSA9PT0gTXVsdGlwbGVNb2RlLkNIRUNLQk9YIHx8IG11bHRpcGxlID09PSBNdWx0aXBsZU1vZGUuS0VZQk9BUkQpIHtcbiAgICAgICAgICAgIHRoaXMubXVsdGlwbGVNb2RlID0gbXVsdGlwbGU7XG4gICAgICAgIH0gZWxzZSBpZiAobXVsdGlwbGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubXVsdGlwbGVNb2RlID0gTXVsdGlwbGVNb2RlLkNIRUNLQk9YO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGVNb2RlID09PSBNdWx0aXBsZU1vZGUuQ0hFQ0tCT1gpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b1NlbGVjdCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5ub1Vuc2VsZWN0TGFzdCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbCA9IG5ldyBTZWxlY3Rpb25Nb2RlbDxNY0xpc3RPcHRpb24+KHRoaXMubXVsdGlwbGUpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ob3Jpem9udGFsID0gdG9Cb29sZWFuKHRoaXMuaG9yaXpvbnRhbCk7XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyID0gbmV3IEZvY3VzS2V5TWFuYWdlcjxNY0xpc3RPcHRpb24+KHRoaXMub3B0aW9ucylcbiAgICAgICAgICAgIC53aXRoVHlwZUFoZWFkKClcbiAgICAgICAgICAgIC53aXRoVmVydGljYWxPcmllbnRhdGlvbighdGhpcy5ob3Jpem9udGFsKVxuICAgICAgICAgICAgLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24odGhpcy5ob3Jpem9udGFsID8gJ2x0cicgOiBudWxsKTtcblxuICAgICAgICB0aGlzLmtleU1hbmFnZXIudGFiT3V0XG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGFiSW5kZXggPSAtMTtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90YWJJbmRleCA9IHRoaXMudXNlclRhYkluZGV4IHx8IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy50ZW1wVmFsdWVzKSB7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbnNGcm9tVmFsdWVzKHRoaXMudGVtcFZhbHVlcyk7XG4gICAgICAgICAgICB0aGlzLnRlbXBWYWx1ZXMgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5jaGFuZ2VkXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgZXZlbnQuYWRkZWQpIHsgaXRlbS5zZWxlY3RlZCA9IHRydWU7IH1cblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBldmVudC5yZW1vdmVkKSB7IGl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTsgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zLmNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKHN0YXJ0V2l0aChudWxsKSwgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRPcHRpb25zKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgd2UgbmVlZCB0byB1cGRhdGUgb3VyIHRhYiBpbmRleFxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGFiSW5kZXgoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlU2Nyb2xsU2l6ZSgpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3llZC5uZXh0KCk7XG5cbiAgICAgICAgdGhpcy5kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuICAgIH1cblxuICAgIGJsdXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNGb2N1c2VkT3B0aW9uKCkpIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKC0xKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0QWxsKCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiBvcHRpb24uc2V0U2VsZWN0ZWQodHJ1ZSkpO1xuXG4gICAgICAgIHRoaXMucmVwb3J0VmFsdWVDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBkZXNlbGVjdEFsbCgpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uLnNldFNlbGVjdGVkKGZhbHNlKSk7XG5cbiAgICAgICAgdGhpcy5yZXBvcnRWYWx1ZUNoYW5nZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVNjcm9sbFNpemUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmhvcml6b250YWwgfHwgIXRoaXMub3B0aW9ucy5maXJzdCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmtleU1hbmFnZXIud2l0aFNjcm9sbFNpemUoTWF0aC5mbG9vcih0aGlzLmdldEhlaWdodCgpIC8gdGhpcy5vcHRpb25zLmZpcnN0LmdldEhlaWdodCgpKSk7XG4gICAgfVxuXG4gICAgc2V0U2VsZWN0ZWRPcHRpb25zQnlDbGljayhvcHRpb246IE1jTGlzdE9wdGlvbiwgc2hpZnRLZXk6IGJvb2xlYW4sIGN0cmxLZXk6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKHNoaWZ0S2V5ICYmIHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRPcHRpb25zKG9wdGlvbik7XG4gICAgICAgIH0gZWxzZSBpZiAoY3RybEtleSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmNhbkRlc2VsZWN0TGFzdChvcHRpb24pKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnRvZ2dsZShvcHRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1NlbGVjdCkge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLnNldFNlbGVjdGVkKGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgb3B0aW9uLnNldFNlbGVjdGVkKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbWl0Q2hhbmdlRXZlbnQob3B0aW9uKTtcbiAgICAgICAgdGhpcy5yZXBvcnRWYWx1ZUNoYW5nZSgpO1xuICAgIH1cblxuICAgIHNldFNlbGVjdGVkT3B0aW9uc0J5S2V5KG9wdGlvbjogTWNMaXN0T3B0aW9uLCBzaGlmdEtleTogYm9vbGVhbiwgY3RybEtleTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoc2hpZnRLZXkgJiYgdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3RlZE9wdGlvbnMob3B0aW9uKTtcbiAgICAgICAgfSBlbHNlIGlmIChjdHJsS2V5KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuY2FuRGVzZWxlY3RMYXN0KG9wdGlvbikpIHsgcmV0dXJuOyB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uc2V0U2VsZWN0ZWQoZmFsc2UpKTtcbiAgICAgICAgICAgICAgICBvcHRpb24uc2V0U2VsZWN0ZWQodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVtaXRDaGFuZ2VFdmVudChvcHRpb24pO1xuICAgICAgICB0aGlzLnJlcG9ydFZhbHVlQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgc2V0U2VsZWN0ZWRPcHRpb25zKG9wdGlvbjogTWNMaXN0T3B0aW9uKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uU3RhdGUgPSBvcHRpb24uc2VsZWN0ZWQ7XG5cbiAgICAgICAgbGV0IGZyb21JbmRleCA9IHRoaXMua2V5TWFuYWdlci5wcmV2aW91c0FjdGl2ZUl0ZW1JbmRleDtcbiAgICAgICAgbGV0IHRvSW5kZXggPSB0aGlzLmtleU1hbmFnZXIucHJldmlvdXNBY3RpdmVJdGVtSW5kZXggPSB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4O1xuXG4gICAgICAgIGlmICh0b0luZGV4ID09PSBmcm9tSW5kZXgpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKGZyb21JbmRleCA+IHRvSW5kZXgpIHtcbiAgICAgICAgICAgIFtmcm9tSW5kZXgsIHRvSW5kZXhdID0gW3RvSW5kZXgsIGZyb21JbmRleF07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgICAgIC50b0FycmF5KClcbiAgICAgICAgICAgIC5zbGljZShmcm9tSW5kZXgsIHRvSW5kZXggKyAxKVxuICAgICAgICAgICAgLmZpbHRlcigoaXRlbSkgPT4gIWl0ZW0uZGlzYWJsZWQpXG4gICAgICAgICAgICAuZm9yRWFjaCgocmVuZGVyZWRPcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc0xhc3RSZW5kZXJlZE9wdGlvbiA9IHJlbmRlcmVkT3B0aW9uID09PSB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbTtcblxuICAgICAgICAgICAgICAgIGlmIChpc0xhc3RSZW5kZXJlZE9wdGlvbiAmJiByZW5kZXJlZE9wdGlvbi5zZWxlY3RlZCAmJiB0aGlzLm5vVW5zZWxlY3RMYXN0KSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICAgICAgcmVuZGVyZWRPcHRpb24uc2V0U2VsZWN0ZWQoIXNlbGVjdGVkT3B0aW9uU3RhdGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICB3cml0ZVZhbHVlKHZhbHVlczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5zZXRPcHRpb25zRnJvbVZhbHVlcyh2YWx1ZXMgfHwgW10pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50ZW1wVmFsdWVzID0gdmFsdWVzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudGVkIGFzIGEgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uLmRpc2FibGVkID0gaXNEaXNhYmxlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZE9wdGlvblZhbHVlcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZmlsdGVyKChvcHRpb24pID0+IG9wdGlvbi5zZWxlY3RlZCkubWFwKChvcHRpb24pID0+IG9wdGlvbi52YWx1ZSk7XG4gICAgfVxuXG4gICAgLy8gVG9nZ2xlcyB0aGUgc2VsZWN0ZWQgc3RhdGUgb2YgdGhlIGN1cnJlbnRseSBmb2N1c2VkIG9wdGlvbi5cbiAgICB0b2dnbGVGb2N1c2VkT3B0aW9uKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBmb2N1c2VkSW5kZXggPSB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4O1xuXG4gICAgICAgIGlmIChmb2N1c2VkSW5kZXggIT0gbnVsbCAmJiB0aGlzLmlzVmFsaWRJbmRleChmb2N1c2VkSW5kZXgpKSB7XG4gICAgICAgICAgICBjb25zdCBmb2N1c2VkT3B0aW9uOiBNY0xpc3RPcHRpb24gPSB0aGlzLm9wdGlvbnMudG9BcnJheSgpW2ZvY3VzZWRJbmRleF07XG5cbiAgICAgICAgICAgIGlmIChmb2N1c2VkT3B0aW9uICYmIHRoaXMuY2FuRGVzZWxlY3RMYXN0KGZvY3VzZWRPcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgZm9jdXNlZE9wdGlvbi50b2dnbGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIEVtaXQgYSBjaGFuZ2UgZXZlbnQgYmVjYXVzZSB0aGUgZm9jdXNlZCBvcHRpb24gY2hhbmdlZCBpdHMgc3RhdGUgdGhyb3VnaCB1c2VyIGludGVyYWN0aW9uLlxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdENoYW5nZUV2ZW50KGZvY3VzZWRPcHRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuRGVzZWxlY3RMYXN0KGxpc3RPcHRpb246IE1jTGlzdE9wdGlvbik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISh0aGlzLm5vVW5zZWxlY3RMYXN0ICYmIHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWQubGVuZ3RoID09PSAxICYmIGxpc3RPcHRpb24uc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIGdldEhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Q2xpZW50UmVjdHMoKVswXS5oZWlnaHQ7XG4gICAgfVxuXG4gICAgLy8gVmlldyB0byBtb2RlbCBjYWxsYmFjayB0aGF0IHNob3VsZCBiZSBjYWxsZWQgaWYgdGhlIGxpc3Qgb3IgaXRzIG9wdGlvbnMgbG9zdCBmb2N1cy5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcbiAgICBvblRvdWNoZWQ6ICgpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAgIC8vIFJlbW92ZXMgYW4gb3B0aW9uIGZyb20gdGhlIHNlbGVjdGlvbiBsaXN0IGFuZCB1cGRhdGVzIHRoZSBhY3RpdmUgaXRlbS5cbiAgICByZW1vdmVPcHRpb25Gcm9tTGlzdChvcHRpb246IE1jTGlzdE9wdGlvbikge1xuICAgICAgICBpZiAob3B0aW9uLmhhc0ZvY3VzKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25JbmRleCA9IHRoaXMuZ2V0T3B0aW9uSW5kZXgob3B0aW9uKTtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgb3B0aW9uIGlzIHRoZSBsYXN0IGl0ZW1cbiAgICAgICAgICAgIGlmIChvcHRpb25JbmRleCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0UHJldmlvdXNJdGVtQWN0aXZlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbkluZGV4ID09PSAwICYmIHRoaXMub3B0aW9ucy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldE5leHRJdGVtQWN0aXZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcblxuICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICAgICAgICBjYXNlIEVOVEVSOlxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlRm9jdXNlZE9wdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgVEFCOlxuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci50YWJPdXQubmV4dCgpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldE5leHRJdGVtQWN0aXZlKCk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldFByZXZpb3VzSXRlbUFjdGl2ZSgpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEhPTUU6XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVORDpcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0TGFzdEl0ZW1BY3RpdmUoKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQQUdFX1VQOlxuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRQcmV2aW91c1BhZ2VJdGVtQWN0aXZlKCk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUEFHRV9ET1dOOlxuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXROZXh0UGFnZUl0ZW1BY3RpdmUoKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRPcHRpb25zQnlLZXkoXG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbSBhcyBNY0xpc3RPcHRpb24sXG4gICAgICAgICAgICBoYXNNb2RpZmllcktleShldmVudCwgJ3NoaWZ0S2V5JyksXG4gICAgICAgICAgICBoYXNNb2RpZmllcktleShldmVudCwgJ2N0cmxLZXknKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIFJlcG9ydHMgYSB2YWx1ZSBjaGFuZ2UgdG8gdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yXG4gICAgcmVwb3J0VmFsdWVDaGFuZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5nZXRTZWxlY3RlZE9wdGlvblZhbHVlcygpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEVtaXRzIGEgY2hhbmdlIGV2ZW50IGlmIHRoZSBzZWxlY3RlZCBzdGF0ZSBvZiBhbiBvcHRpb24gY2hhbmdlZC5cbiAgICBlbWl0Q2hhbmdlRXZlbnQob3B0aW9uOiBNY0xpc3RPcHRpb24pIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChuZXcgTWNMaXN0U2VsZWN0aW9uQ2hhbmdlKHRoaXMsIG9wdGlvbikpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVUYWJJbmRleCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdGFiSW5kZXggPSB0aGlzLnVzZXJUYWJJbmRleCB8fCAodGhpcy5vcHRpb25zLmxlbmd0aCA9PT0gMCA/IC0xIDogMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNldE9wdGlvbnMoKSB7XG4gICAgICAgIHRoaXMuZHJvcFN1YnNjcmlwdGlvbnMoKTtcbiAgICAgICAgdGhpcy5saXN0ZW5Ub09wdGlvbnNGb2N1cygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJvcFN1YnNjcmlwdGlvbnMoKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbkZvY3VzU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbkZvY3VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbkZvY3VzU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbkJsdXJTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uQmx1clN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25CbHVyU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbGlzdGVuVG9PcHRpb25zRm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3B0aW9uRm9jdXNTdWJzY3JpcHRpb24gPSB0aGlzLm9wdGlvbkZvY3VzQ2hhbmdlc1xuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleDogbnVtYmVyID0gdGhpcy5vcHRpb25zLnRvQXJyYXkoKS5pbmRleE9mKGV2ZW50Lm9wdGlvbik7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkSW5kZXgoaW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci51cGRhdGVBY3RpdmVJdGVtKGluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm9wdGlvbkJsdXJTdWJzY3JpcHRpb24gPSB0aGlzLm9wdGlvbkJsdXJDaGFuZ2VzXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuYmx1cigpKTtcbiAgICB9XG5cbiAgICAvKiogQ2hlY2tzIHdoZXRoZXIgYW55IG9mIHRoZSBvcHRpb25zIGlzIGZvY3VzZWQuICovXG4gICAgcHJpdmF0ZSBoYXNGb2N1c2VkT3B0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNvbWUoKG9wdGlvbikgPT4gb3B0aW9uLmhhc0ZvY3VzKTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5zIHRoZSBvcHRpb24gd2l0aCB0aGUgc3BlY2lmaWVkIHZhbHVlLlxuICAgIHByaXZhdGUgZ2V0T3B0aW9uQnlWYWx1ZSh2YWx1ZTogc3RyaW5nKTogTWNMaXN0T3B0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5maW5kKChvcHRpb24pID0+IG9wdGlvbi52YWx1ZSA9PT0gdmFsdWUpO1xuICAgIH1cblxuICAgIC8vIFNldHMgdGhlIHNlbGVjdGVkIG9wdGlvbnMgYmFzZWQgb24gdGhlIHNwZWNpZmllZCB2YWx1ZXMuXG4gICAgcHJpdmF0ZSBzZXRPcHRpb25zRnJvbVZhbHVlcyh2YWx1ZXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IG9wdGlvbi5zZXRTZWxlY3RlZChmYWxzZSkpO1xuXG4gICAgICAgIHZhbHVlc1xuICAgICAgICAgICAgLm1hcCgodmFsdWUpID0+IHRoaXMuZ2V0T3B0aW9uQnlWYWx1ZSh2YWx1ZSkpXG4gICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAuZm9yRWFjaCgob3B0aW9uKSA9PiBvcHRpb24hLnNldFNlbGVjdGVkKHRydWUpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVdGlsaXR5IHRvIGVuc3VyZSBhbGwgaW5kZXhlcyBhcmUgdmFsaWQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCB0byBiZSBjaGVja2VkLlxuICAgICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGluZGV4IGlzIHZhbGlkIGZvciBvdXIgbGlzdCBvZiBvcHRpb25zLlxuICAgICAqL1xuICAgIHByaXZhdGUgaXNWYWxpZEluZGV4KGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLm9wdGlvbnMubGVuZ3RoO1xuICAgIH1cblxuICAgIC8vIFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBzcGVjaWZpZWQgbGlzdCBvcHRpb24uXG4gICAgcHJpdmF0ZSBnZXRPcHRpb25JbmRleChvcHRpb246IE1jTGlzdE9wdGlvbik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMudG9BcnJheSgpLmluZGV4T2Yob3B0aW9uKTtcbiAgICB9XG5cbiAgICAvLyBWaWV3IHRvIG1vZGVsIGNhbGxiYWNrIHRoYXQgc2hvdWxkIGJlIGNhbGxlZCB3aGVuZXZlciB0aGUgc2VsZWN0ZWQgb3B0aW9ucyBjaGFuZ2UuXG4gICAgcHJpdmF0ZSBvbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoXzogYW55KSA9PiB7fTtcbn1cbiJdfQ==