import { CommonModule } from '@angular/common';
import { Directive, Input, Component, ViewEncapsulation, InjectionToken, EventEmitter, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, NgZone, Inject, Output, forwardRef, IterableDiffers, Attribute, ViewChild, ContentChildren, NgModule } from '@angular/core';
import { CdkTreeNodeDef, CdkTreeNodePadding, CdkTreeNodeToggle, CdkTree, CdkTreeNode, CdkTreeNodeOutlet, CdkTreeModule } from '@ptsecurity/cdk/tree';
import { MultipleMode, getMcSelectNonArrayValueError, McPseudoCheckboxModule } from '@ptsecurity/mosaic/core';
import { __extends, __spread, __read } from 'tslib';
import { map, take, takeUntil } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { hasModifierKey, PAGE_DOWN, PAGE_UP, END, HOME, ENTER, SPACE, RIGHT_ARROW, LEFT_ARROW, UP_ARROW, DOWN_ARROW } from '@ptsecurity/cdk/keycodes';
import { Subject, merge, BehaviorSubject } from 'rxjs';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';

/**
 * @fileoverview added by tsickle
 * Generated from: node.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var McTreeNodeDef = /** @class */ (function (_super) {
    __extends(McTreeNodeDef, _super);
    function McTreeNodeDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    McTreeNodeDef.decorators = [
        { type: Directive, args: [{
                    selector: '[mcTreeNodeDef]',
                    inputs: ['when: mcTreeNodeDefWhen'],
                    providers: [{ provide: CdkTreeNodeDef, useExisting: McTreeNodeDef }]
                },] }
    ];
    McTreeNodeDef.propDecorators = {
        data: [{ type: Input, args: ['mcTreeNode',] }]
    };
    return McTreeNodeDef;
}(CdkTreeNodeDef));
if (false) {
    /** @type {?} */
    McTreeNodeDef.prototype.data;
}

/**
 * @fileoverview added by tsickle
 * Generated from: padding.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var McTreeNodePadding = /** @class */ (function (_super) {
    __extends(McTreeNodePadding, _super);
    function McTreeNodePadding() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.baseLeftPadding = 12;
        /* tslint:disable-next-line:naming-convention orthodox-getter-and-setter*/
        _this._indent = 20;
        _this.iconWidth = 20;
        return _this;
    }
    Object.defineProperty(McTreeNodePadding.prototype, "leftPadding", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.withIcon ? 0 : this.iconWidth) + this.baseLeftPadding;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McTreeNodePadding.prototype.paddingIndent = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var nodeLevel = (this.treeNode.data && this.tree.treeControl.getLevel)
            ? this.tree.treeControl.getLevel(this.treeNode.data)
            : 0;
        /** @type {?} */
        var level = this.level || nodeLevel;
        return level > 0 ? (level * this._indent) + this.leftPadding + "px" : this.leftPadding + "px";
    };
    /**
     * @return {?}
     */
    McTreeNodePadding.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.withIcon = this.tree.treeControl.isExpandable(this.treeNode.data);
        this.setPadding();
    };
    McTreeNodePadding.decorators = [
        { type: Directive, args: [{
                    selector: '[mcTreeNodePadding]',
                    providers: [{ provide: CdkTreeNodePadding, useExisting: McTreeNodePadding }]
                },] }
    ];
    McTreeNodePadding.propDecorators = {
        level: [{ type: Input, args: ['mcTreeNodePadding',] }],
        indent: [{ type: Input, args: ['mcTreeNodePaddingIndent',] }]
    };
    return McTreeNodePadding;
}(CdkTreeNodePadding));
if (false) {
    /** @type {?} */
    McTreeNodePadding.prototype.level;
    /** @type {?} */
    McTreeNodePadding.prototype.indent;
    /** @type {?} */
    McTreeNodePadding.prototype.baseLeftPadding;
    /** @type {?} */
    McTreeNodePadding.prototype._indent;
    /** @type {?} */
    McTreeNodePadding.prototype.withIcon;
    /** @type {?} */
    McTreeNodePadding.prototype.iconWidth;
}

/**
 * @fileoverview added by tsickle
 * Generated from: toggle.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var McTreeNodeToggleComponent = /** @class */ (function (_super) {
    __extends(McTreeNodeToggleComponent, _super);
    function McTreeNodeToggleComponent(tree, treeNode) {
        var _this = _super.call(this, tree, treeNode) || this;
        _this.disabled = false;
        _this.tree.treeControl.filterValue
            .pipe(map((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return value.length > 0; })))
            .subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return _this.disabled = state; }));
        return _this;
    }
    Object.defineProperty(McTreeNodeToggleComponent.prototype, "iconState", {
        get: /**
         * @return {?}
         */
        function () {
            return this.disabled || this.tree.treeControl.isExpanded(this.node);
        },
        enumerable: true,
        configurable: true
    });
    McTreeNodeToggleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mc-tree-node-toggle',
                    template: "\n        <i class=\"mc mc-icon mc-angle-down-S_16\"></i>\n    ",
                    host: {
                        class: 'mc-tree-node-toggle',
                        '(click)': 'toggle($event)',
                        '[class.mc-opened]': 'iconState',
                        '[attr.disabled]': 'disabled || null'
                    },
                    encapsulation: ViewEncapsulation.None,
                    providers: [{ provide: CdkTreeNodeToggle, useExisting: McTreeNodeToggleComponent }]
                }] }
    ];
    /** @nocollapse */
    McTreeNodeToggleComponent.ctorParameters = function () { return [
        { type: CdkTree },
        { type: CdkTreeNode }
    ]; };
    McTreeNodeToggleComponent.propDecorators = {
        node: [{ type: Input }]
    };
    return McTreeNodeToggleComponent;
}(CdkTreeNodeToggle));
if (false) {
    /** @type {?} */
    McTreeNodeToggleComponent.prototype.disabled;
    /** @type {?} */
    McTreeNodeToggleComponent.prototype.node;
}
/**
 * @template T
 */
var McTreeNodeToggleDirective = /** @class */ (function (_super) {
    __extends(McTreeNodeToggleDirective, _super);
    function McTreeNodeToggleDirective(tree, treeNode) {
        var _this = _super.call(this, tree, treeNode) || this;
        _this.disabled = false;
        _this.tree.treeControl.filterValue
            .pipe(map((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return value.length > 0; })))
            .subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return _this.disabled = state; }));
        return _this;
    }
    McTreeNodeToggleDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mcTreeNodeToggle]',
                    host: {
                        '(click)': 'toggle($event)',
                        '[attr.disabled]': 'disabled || null'
                    },
                    providers: [{ provide: CdkTreeNodeToggle, useExisting: McTreeNodeToggleDirective }]
                },] }
    ];
    /** @nocollapse */
    McTreeNodeToggleDirective.ctorParameters = function () { return [
        { type: CdkTree },
        { type: CdkTreeNode }
    ]; };
    return McTreeNodeToggleDirective;
}(CdkTreeNodeToggle));
if (false) {
    /** @type {?} */
    McTreeNodeToggleDirective.prototype.disabled;
}

/**
 * @fileoverview added by tsickle
 * Generated from: tree-option.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function McTreeOptionEvent() { }
if (false) {
    /** @type {?} */
    McTreeOptionEvent.prototype.option;
}
/**
 * Injection token used to provide the parent component to options.
 * @type {?}
 */
var MC_TREE_OPTION_PARENT_COMPONENT = new InjectionToken('MC_TREE_OPTION_PARENT_COMPONENT');
var McTreeOptionChange = /** @class */ (function () {
    function McTreeOptionChange(source, isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.source = source;
        this.isUserInput = isUserInput;
    }
    return McTreeOptionChange;
}());
if (false) {
    /** @type {?} */
    McTreeOptionChange.prototype.source;
    /** @type {?} */
    McTreeOptionChange.prototype.isUserInput;
}
/** @type {?} */
var uniqueIdCounter = 0;
var McTreeOption = /** @class */ (function (_super) {
    __extends(McTreeOption, _super);
    function McTreeOption(elementRef, changeDetectorRef, ngZone, tree) {
        var _this = _super.call(this, elementRef, tree) || this;
        _this.changeDetectorRef = changeDetectorRef;
        _this.ngZone = ngZone;
        _this.tree = tree;
        _this.onFocus = new Subject();
        _this.onBlur = new Subject();
        _this._disabled = false;
        _this.onSelectionChange = new EventEmitter();
        _this._selected = false;
        _this._id = "mc-tree-option-" + uniqueIdCounter++;
        _this.hasFocus = false;
        return _this;
    }
    Object.defineProperty(McTreeOption.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeOption.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled || (this.tree && this.tree.disabled);
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var newValue = coerceBooleanProperty(value);
            if (newValue !== this._disabled) {
                this._disabled = newValue;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeOption.prototype, "showCheckbox", {
        get: /**
         * @return {?}
         */
        function () {
            return this._showCheckbox !== undefined ? this._showCheckbox : this.tree.showCheckbox;
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
    Object.defineProperty(McTreeOption.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selected;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var isSelected = coerceBooleanProperty(value);
            if (isSelected !== this._selected) {
                this.setSelected(isSelected);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeOption.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeOption.prototype, "multiple", {
        get: /**
         * @return {?}
         */
        function () {
            return this.tree.multiple;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeOption.prototype, "viewValue", {
        get: /**
         * @return {?}
         */
        function () {
            // TODO: Add input property alternative for node envs.
            return (this.getHostElement().textContent || '').trim();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McTreeOption.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.value = this.tree.treeControl.getValue(this.data);
    };
    /**
     * @return {?}
     */
    McTreeOption.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.selected = !this.selected;
    };
    /**
     * @param {?} selected
     * @return {?}
     */
    McTreeOption.prototype.setSelected = /**
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        if (this._selected === selected || !this.tree.selectionModel) {
            return;
        }
        this._selected = selected;
        if (selected) {
            this.tree.selectionModel.select(this.data);
        }
        else {
            this.tree.selectionModel.deselect(this.data);
        }
        this.changeDetectorRef.markForCheck();
    };
    /**
     * @param {?=} focusOrigin
     * @return {?}
     */
    McTreeOption.prototype.focus = /**
     * @param {?=} focusOrigin
     * @return {?}
     */
    function (focusOrigin) {
        var _this = this;
        if (focusOrigin === 'program') {
            return;
        }
        if (this.disabled || this.hasFocus) {
            return;
        }
        this.elementRef.nativeElement.focus();
        this.onFocus.next({ option: this });
        Promise.resolve().then((/**
         * @return {?}
         */
        function () {
            _this.hasFocus = true;
            _this.changeDetectorRef.markForCheck();
        }));
    };
    /**
     * @return {?}
     */
    McTreeOption.prototype.blur = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // When animations are enabled, Angular may end up removing the option from the DOM a little
        // earlier than usual, causing it to be blurred and throwing off the logic in the tree
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
    McTreeOption.prototype.getHeight = /**
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
    McTreeOption.prototype.select = /**
     * @return {?}
     */
    function () {
        if (!this._selected) {
            this._selected = true;
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent();
        }
    };
    /**
     * @return {?}
     */
    McTreeOption.prototype.deselect = /**
     * @return {?}
     */
    function () {
        if (this._selected) {
            this._selected = false;
            this.changeDetectorRef.markForCheck();
        }
    };
    /**
     * @param {?=} $event
     * @return {?}
     */
    McTreeOption.prototype.selectViaInteraction = /**
     * @param {?=} $event
     * @return {?}
     */
    function ($event) {
        if (!this.disabled) {
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent(true);
            /** @type {?} */
            var shiftKey = $event ? hasModifierKey($event, 'shiftKey') : false;
            /** @type {?} */
            var ctrlKey = $event ? hasModifierKey($event, 'ctrlKey') : false;
            this.tree.setSelectedOptionsByClick(this, shiftKey, ctrlKey);
        }
    };
    /**
     * @param {?=} isUserInput
     * @return {?}
     */
    McTreeOption.prototype.emitSelectionChangeEvent = /**
     * @param {?=} isUserInput
     * @return {?}
     */
    function (isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.onSelectionChange.emit(new McTreeOptionChange(this, isUserInput));
    };
    /**
     * @return {?}
     */
    McTreeOption.prototype.getHostElement = /**
     * @return {?}
     */
    function () {
        return this.elementRef.nativeElement;
    };
    /**
     * @return {?}
     */
    McTreeOption.prototype.markForCheck = /**
     * @return {?}
     */
    function () {
        this.changeDetectorRef.markForCheck();
    };
    McTreeOption.decorators = [
        { type: Component, args: [{
                    selector: 'mc-tree-option',
                    exportAs: 'mcTreeOption',
                    template: "<ng-content select=\"[mc-icon]\"></ng-content>\n\n<ng-content select=\"mc-tree-node-toggle\"></ng-content>\n\n<mc-pseudo-checkbox\n    *ngIf=\"showCheckbox\"\n    [state]=\"selected ? 'checked' : 'unchecked'\"\n    [disabled]=\"disabled\">\n</mc-pseudo-checkbox>\n\n<span class=\"mc-option-text mc-no-select\"><ng-content></ng-content></span>\n\n<div class=\"mc-option-overlay\"></div>\n",
                    host: {
                        '[attr.id]': 'id',
                        '[attr.tabindex]': '-1',
                        '[attr.disabled]': 'disabled || null',
                        class: 'mc-tree-option',
                        '[class.mc-selected]': 'selected',
                        '[class.mc-focused]': 'hasFocus',
                        '(focus)': 'focus()',
                        '(blur)': 'blur()',
                        '(click)': 'selectViaInteraction($event)'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    providers: [{ provide: CdkTreeNode, useExisting: McTreeOption }]
                }] }
    ];
    /** @nocollapse */
    McTreeOption.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: NgZone },
        { type: undefined, decorators: [{ type: Inject, args: [MC_TREE_OPTION_PARENT_COMPONENT,] }] }
    ]; };
    McTreeOption.propDecorators = {
        disabled: [{ type: Input }],
        showCheckbox: [{ type: Input }],
        onSelectionChange: [{ type: Output }]
    };
    return McTreeOption;
}(CdkTreeNode));
if (false) {
    /** @type {?} */
    McTreeOption.prototype.onFocus;
    /** @type {?} */
    McTreeOption.prototype.onBlur;
    /**
     * @type {?}
     * @private
     */
    McTreeOption.prototype._value;
    /**
     * @type {?}
     * @private
     */
    McTreeOption.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    McTreeOption.prototype._showCheckbox;
    /** @type {?} */
    McTreeOption.prototype.onSelectionChange;
    /**
     * @type {?}
     * @private
     */
    McTreeOption.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    McTreeOption.prototype._id;
    /** @type {?} */
    McTreeOption.prototype.hasFocus;
    /**
     * @type {?}
     * @private
     */
    McTreeOption.prototype.changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    McTreeOption.prototype.ngZone;
    /** @type {?} */
    McTreeOption.prototype.tree;
}

/**
 * @fileoverview added by tsickle
 * Generated from: tree-selection.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var MC_SELECTION_TREE_VALUE_ACCESSOR = {
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
var  /**
 * @template T
 */
McTreeNavigationChange = /** @class */ (function () {
    function McTreeNavigationChange(source, option) {
        this.source = source;
        this.option = option;
    }
    return McTreeNavigationChange;
}());
if (false) {
    /** @type {?} */
    McTreeNavigationChange.prototype.source;
    /** @type {?} */
    McTreeNavigationChange.prototype.option;
}
/**
 * @template T
 */
var  /**
 * @template T
 */
McTreeSelectionChange = /** @class */ (function () {
    function McTreeSelectionChange(source, option) {
        this.source = source;
        this.option = option;
    }
    return McTreeSelectionChange;
}());
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

/**
 * @fileoverview added by tsickle
 * Generated from: tree.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var MC_TREE_DIRECTIVES = [
    McTreeSelection,
    McTreeOption,
    McTreeNodeDef,
    McTreeNodePadding,
    McTreeNodeToggleComponent,
    McTreeNodeToggleDirective
];
var McTreeModule = /** @class */ (function () {
    function McTreeModule() {
    }
    McTreeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, CdkTreeModule, McPseudoCheckboxModule],
                    exports: MC_TREE_DIRECTIVES,
                    declarations: MC_TREE_DIRECTIVES
                },] }
    ];
    return McTreeModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: data-source/flat-data-source.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Tree flattener to convert a normal type of node to node with children & level information.
 * Transform nested nodes of type `T` to flattened nodes of type `F`.
 *
 * For example, the input data of type `T` is nested, and contains its children data:
 *   SomeNode: {
 *     key: 'Fruits',
 *     children: [
 *       NodeOne: {
 *         key: 'Apple',
 *       },
 *       NodeTwo: {
 *        key: 'Pear',
 *      }
 *    ]
 *  }
 *  After flattener flatten the tree, the structure will become
 *  SomeNode: {
 *    key: 'Fruits',
 *    expandable: true,
 *    level: 1
 *  },
 *  NodeOne: {
 *    key: 'Apple',
 *    expandable: false,
 *    level: 2
 *  },
 *  NodeTwo: {
 *   key: 'Pear',
 *   expandable: false,
 *   level: 2
 * }
 * and the output flattened type is `F` with additional information.
 * @template T, F
 */
var  /**
 * Tree flattener to convert a normal type of node to node with children & level information.
 * Transform nested nodes of type `T` to flattened nodes of type `F`.
 *
 * For example, the input data of type `T` is nested, and contains its children data:
 *   SomeNode: {
 *     key: 'Fruits',
 *     children: [
 *       NodeOne: {
 *         key: 'Apple',
 *       },
 *       NodeTwo: {
 *        key: 'Pear',
 *      }
 *    ]
 *  }
 *  After flattener flatten the tree, the structure will become
 *  SomeNode: {
 *    key: 'Fruits',
 *    expandable: true,
 *    level: 1
 *  },
 *  NodeOne: {
 *    key: 'Apple',
 *    expandable: false,
 *    level: 2
 *  },
 *  NodeTwo: {
 *   key: 'Pear',
 *   expandable: false,
 *   level: 2
 * }
 * and the output flattened type is `F` with additional information.
 * @template T, F
 */
McTreeFlattener = /** @class */ (function () {
    function McTreeFlattener(transformFunction, getLevel, isExpandable, getChildren) {
        this.transformFunction = transformFunction;
        this.getLevel = getLevel;
        this.isExpandable = isExpandable;
        this.getChildren = getChildren;
    }
    /**
     * @param {?} node
     * @param {?} level
     * @param {?} resultNodes
     * @param {?} parent
     * @return {?}
     */
    McTreeFlattener.prototype.flattenNode = /**
     * @param {?} node
     * @param {?} level
     * @param {?} resultNodes
     * @param {?} parent
     * @return {?}
     */
    function (node, level, resultNodes, parent) {
        var _this = this;
        /** @type {?} */
        var flatNode = this.transformFunction(node, level, parent);
        resultNodes.push(flatNode);
        if (this.isExpandable(flatNode)) {
            /** @type {?} */
            var childrenNodes = this.getChildren(node);
            if (childrenNodes) {
                if (Array.isArray(childrenNodes)) {
                    this.flattenChildren(childrenNodes, level, resultNodes, flatNode);
                }
                else {
                    childrenNodes
                        .pipe(take(1))
                        .subscribe((/**
                     * @param {?} children
                     * @return {?}
                     */
                    function (children) {
                        _this.flattenChildren(children, level, resultNodes, flatNode);
                    }));
                }
            }
        }
        return resultNodes;
    };
    /**
     * @param {?} children
     * @param {?} level
     * @param {?} resultNodes
     * @param {?} parent
     * @return {?}
     */
    McTreeFlattener.prototype.flattenChildren = /**
     * @param {?} children
     * @param {?} level
     * @param {?} resultNodes
     * @param {?} parent
     * @return {?}
     */
    function (children, level, resultNodes, parent) {
        var _this = this;
        children.forEach((/**
         * @param {?} child
         * @return {?}
         */
        function (child) {
            _this.flattenNode(child, level + 1, resultNodes, parent);
        }));
    };
    /**
     * Flatten a list of node type T to flattened version of node F.
     * Please note that type T may be nested, and the length of `structuredData` may be different
     * from that of returned list `F[]`.
     */
    /**
     * Flatten a list of node type T to flattened version of node F.
     * Please note that type T may be nested, and the length of `structuredData` may be different
     * from that of returned list `F[]`.
     * @param {?} structuredData
     * @return {?}
     */
    McTreeFlattener.prototype.flattenNodes = /**
     * Flatten a list of node type T to flattened version of node F.
     * Please note that type T may be nested, and the length of `structuredData` may be different
     * from that of returned list `F[]`.
     * @param {?} structuredData
     * @return {?}
     */
    function (structuredData) {
        var _this = this;
        /** @type {?} */
        var resultNodes = [];
        structuredData.forEach((/**
         * @param {?} node
         * @return {?}
         */
        function (node) { return _this.flattenNode(node, 0, resultNodes, null); }));
        return resultNodes;
    };
    /**
     * Expand flattened node with current expansion status.
     * The returned list may have different length.
     */
    /**
     * Expand flattened node with current expansion status.
     * The returned list may have different length.
     * @param {?} nodes
     * @param {?} treeControl
     * @return {?}
     */
    McTreeFlattener.prototype.expandFlattenedNodes = /**
     * Expand flattened node with current expansion status.
     * The returned list may have different length.
     * @param {?} nodes
     * @param {?} treeControl
     * @return {?}
     */
    function (nodes, treeControl) {
        var _this = this;
        /** @type {?} */
        var results = [];
        /** @type {?} */
        var currentExpand = [];
        currentExpand[0] = true;
        nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            /** @type {?} */
            var expand = true;
            for (var i = 0; i <= _this.getLevel(node); i++) {
                expand = expand && currentExpand[i];
            }
            if (expand) {
                results.push(node);
            }
            if (_this.isExpandable(node)) {
                currentExpand[_this.getLevel(node) + 1] = treeControl.isExpanded(node);
            }
        }));
        return results;
    };
    return McTreeFlattener;
}());
if (false) {
    /** @type {?} */
    McTreeFlattener.prototype.transformFunction;
    /** @type {?} */
    McTreeFlattener.prototype.getLevel;
    /** @type {?} */
    McTreeFlattener.prototype.isExpandable;
    /** @type {?} */
    McTreeFlattener.prototype.getChildren;
}
/** @enum {string} */
var McTreeDataSourceChangeTypes = {
    Expansion: "expansion",
    Filter: "filter",
};
/**
 * Data source for flat tree.
 * The data source need to handle expansion/collapsion of the tree node and change the data feed
 * to `McTree`.
 * The nested tree nodes of type `T` are flattened through `MсTreeFlattener`, and converted
 * to type `F` for `McTree` to consume.
 * @template T, F
 */
var  /**
 * Data source for flat tree.
 * The data source need to handle expansion/collapsion of the tree node and change the data feed
 * to `McTree`.
 * The nested tree nodes of type `T` are flattened through `MсTreeFlattener`, and converted
 * to type `F` for `McTree` to consume.
 * @template T, F
 */
McTreeFlatDataSource = /** @class */ (function (_super) {
    __extends(McTreeFlatDataSource, _super);
    function McTreeFlatDataSource(treeControl, treeFlattener, initialData) {
        if (initialData === void 0) { initialData = []; }
        var _this = _super.call(this) || this;
        _this.treeControl = treeControl;
        _this.treeFlattener = treeFlattener;
        _this.flattenedData = new BehaviorSubject([]);
        _this.expandedData = new BehaviorSubject([]);
        _this.filteredData = new BehaviorSubject([]);
        _this._data = new BehaviorSubject(initialData);
        return _this;
    }
    Object.defineProperty(McTreeFlatDataSource.prototype, "data", {
        get: /**
         * @return {?}
         */
        function () {
            return this._data.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._data.next(value);
            this.flattenedData.next(this.treeFlattener.flattenNodes(this.data));
            this.treeControl.dataNodes = this.flattenedData.value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} collectionViewer
     * @return {?}
     */
    McTreeFlatDataSource.prototype.connect = /**
     * @param {?} collectionViewer
     * @return {?}
     */
    function (collectionViewer) {
        var _this = this;
        return merge(collectionViewer.viewChange, this.treeControl.expansionModel.changed
            .pipe(map((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return ({ type: McTreeDataSourceChangeTypes.Expansion, value: value }); }))), this.treeControl.filterValue
            .pipe(map((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return ({ type: McTreeDataSourceChangeTypes.Filter, value: value }); }))), this.flattenedData)
            .pipe(map((/**
         * @param {?} changeObj
         * @return {?}
         */
        function (changeObj) {
            if (changeObj.type === McTreeDataSourceChangeTypes.Filter) {
                if (changeObj.value && changeObj.value.length > 0) {
                    return _this.filterHandler();
                }
                else {
                    return _this.expansionHandler();
                }
            }
            return _this.expansionHandler();
        })));
    };
    /**
     * @return {?}
     */
    McTreeFlatDataSource.prototype.filterHandler = /**
     * @return {?}
     */
    function () {
        this.filteredData.next(this.treeControl.filterModel.selected);
        return this.filteredData.value;
    };
    /**
     * @return {?}
     */
    McTreeFlatDataSource.prototype.expansionHandler = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var expandedNodes = this.treeFlattener.expandFlattenedNodes(this.flattenedData.value, this.treeControl);
        this.expandedData.next(expandedNodes);
        return this.expandedData.value;
    };
    /**
     * @return {?}
     */
    McTreeFlatDataSource.prototype.disconnect = /**
     * @return {?}
     */
    function () {
        // no op
    };
    return McTreeFlatDataSource;
}(DataSource));
if (false) {
    /** @type {?} */
    McTreeFlatDataSource.prototype.flattenedData;
    /** @type {?} */
    McTreeFlatDataSource.prototype.expandedData;
    /** @type {?} */
    McTreeFlatDataSource.prototype.filteredData;
    /**
     * @type {?}
     * @private
     */
    McTreeFlatDataSource.prototype._data;
    /**
     * @type {?}
     * @private
     */
    McTreeFlatDataSource.prototype.treeControl;
    /**
     * @type {?}
     * @private
     */
    McTreeFlatDataSource.prototype.treeFlattener;
}

/**
 * @fileoverview added by tsickle
 * Generated from: data-source/nested-data-source.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Data source for nested tree.
 *
 * The data source for nested tree doesn't have to consider node flattener, or the way to expand
 * or collapse. The expansion/collapsion will be handled by TreeControl and each non-leaf node.
 * @template T
 */
var  /**
 * Data source for nested tree.
 *
 * The data source for nested tree doesn't have to consider node flattener, or the way to expand
 * or collapse. The expansion/collapsion will be handled by TreeControl and each non-leaf node.
 * @template T
 */
McTreeNestedDataSource = /** @class */ (function (_super) {
    __extends(McTreeNestedDataSource, _super);
    function McTreeNestedDataSource() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /* tslint:disable-next-line:naming-convention */
        _this._data = new BehaviorSubject([]);
        return _this;
    }
    Object.defineProperty(McTreeNestedDataSource.prototype, "data", {
        get: /**
         * @return {?}
         */
        function () {
            return this._data.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._data.next(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} collectionViewer
     * @return {?}
     */
    McTreeNestedDataSource.prototype.connect = /**
     * @param {?} collectionViewer
     * @return {?}
     */
    function (collectionViewer) {
        var _this = this;
        return merge.apply(void 0, __spread([collectionViewer.viewChange, this._data])).pipe(map((/**
         * @return {?}
         */
        function () { return _this.data; })));
    };
    /**
     * @return {?}
     */
    McTreeNestedDataSource.prototype.disconnect = /**
     * @return {?}
     */
    function () {
        // no op
    };
    return McTreeNestedDataSource;
}(DataSource));
if (false) {
    /**
     * @type {?}
     * @private
     */
    McTreeNestedDataSource.prototype._data;
}

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ptsecurity-mosaic-tree.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { MC_SELECTION_TREE_VALUE_ACCESSOR, MC_TREE_OPTION_PARENT_COMPONENT, McTreeFlatDataSource, McTreeFlattener, McTreeModule, McTreeNavigationChange, McTreeNestedDataSource, McTreeNodeDef, McTreeNodePadding, McTreeNodeToggleComponent, McTreeNodeToggleDirective, McTreeOption, McTreeOptionChange, McTreeSelection, McTreeSelectionChange };
//# sourceMappingURL=ptsecurity-mosaic-tree.js.map
