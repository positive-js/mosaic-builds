/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __extends } from 'tslib';
import { Directive, Input, Component, ViewEncapsulation, ChangeDetectorRef, EventEmitter, Output, ElementRef, Inject, InjectionToken, ChangeDetectionStrategy, Attribute, ContentChildren, forwardRef, IterableDiffers, ViewChild, NgModule } from '@angular/core';
import { CdkTreeNodeDef, CdkTreeNodePadding, CdkTree, CdkTreeNode, CdkTreeNodeToggle, CdkTreeNodeOutlet, CdkTreeModule } from '@ptsecurity/cdk/tree';
import { map, takeUntil, take } from 'rxjs/operators';
import { FocusMonitor, FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { toBoolean, getMcSelectNonArrayValueError, McPseudoCheckboxModule } from '@ptsecurity/mosaic/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { END, ENTER, hasModifierKey, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, SPACE } from '@ptsecurity/cdk/keycodes';
import { Subject, BehaviorSubject, merge } from 'rxjs';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                },] },
    ];
    McTreeNodeDef.propDecorators = {
        data: [{ type: Input, args: ['mcTreeNode',] }]
    };
    return McTreeNodeDef;
}(CdkTreeNodeDef));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            : null;
        /** @type {?} */
        var level = this.level || nodeLevel;
        return level ? (level * this._indent) + this.leftPadding + "px" : this.baseLeftPadding + "px";
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
                },] },
    ];
    McTreeNodePadding.propDecorators = {
        level: [{ type: Input, args: ['mcTreeNodePadding',] }],
        indent: [{ type: Input, args: ['mcTreeNodePaddingIndent',] }]
    };
    return McTreeNodePadding;
}(CdkTreeNodePadding));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                        '[class.mc-disabled]': 'disabled',
                        '[class.mc-opened]': 'iconState'
                    },
                    encapsulation: ViewEncapsulation.None,
                    providers: [{ provide: CdkTreeNodeToggle, useExisting: McTreeNodeToggleComponent }]
                },] },
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
                        '[class.mc-disabled]': 'disabled'
                    },
                    providers: [{ provide: CdkTreeNodeToggle, useExisting: McTreeNodeToggleDirective }]
                },] },
    ];
    /** @nocollapse */
    McTreeNodeToggleDirective.ctorParameters = function () { return [
        { type: CdkTree },
        { type: CdkTreeNode }
    ]; };
    return McTreeNodeToggleDirective;
}(CdkTreeNodeToggle));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
/** @type {?} */
var uniqueIdCounter = 0;
var McTreeOption = /** @class */ (function (_super) {
    __extends(McTreeOption, _super);
    function McTreeOption(elementRef, changeDetectorRef, focusMonitor, tree) {
        var _this = _super.call(this, elementRef, tree) || this;
        _this.changeDetectorRef = changeDetectorRef;
        _this.focusMonitor = focusMonitor;
        _this.tree = tree;
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
            var newValue = toBoolean(value);
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
            return this.tree.showCheckbox;
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
            var isSelected = toBoolean(value);
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
    McTreeOption.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.focusMonitor.monitor(this.elementRef.nativeElement, false);
    };
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
    McTreeOption.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
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
     * @return {?}
     */
    McTreeOption.prototype.handleFocus = /**
     * @return {?}
     */
    function () {
        if (this.disabled || this.hasFocus) {
            return;
        }
        this.hasFocus = true;
        if (this.tree.setFocusedOption) {
            this.tree.setFocusedOption(this);
        }
    };
    /**
     * @return {?}
     */
    McTreeOption.prototype.handleBlur = /**
     * @return {?}
     */
    function () {
        this.hasFocus = false;
    };
    /**
     * @return {?}
     */
    McTreeOption.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.focusMonitor.focusVia(this.getHostElement(), 'keyboard');
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
            if (this.tree.setSelectedOption) {
                this.tree.setSelectedOption(this, $event);
            }
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
    McTreeOption.prototype.getTabIndex = /**
     * @return {?}
     */
    function () {
        return this.disabled ? '-1' : '0';
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
                    template: "<ng-content select=\"[mc-icon]\"></ng-content><mc-pseudo-checkbox *ngIf=\"showCheckbox\" [state]=\"selected ? 'checked' : ''\" [disabled]=\"disabled\"></mc-pseudo-checkbox><span class=\"mc-option-text mc-no-select\"><ng-content></ng-content></span><div class=\"mc-option-overlay\"></div>",
                    host: {
                        '[attr.id]': 'id',
                        '[attr.tabindex]': 'getTabIndex()',
                        '[attr.disabled]': 'disabled || null',
                        class: 'mc-tree-option',
                        '[class.mc-selected]': 'selected',
                        '[class.mc-focused]': 'hasFocus',
                        '(focus)': 'handleFocus()',
                        '(blur)': 'handleBlur()',
                        '(click)': 'selectViaInteraction($event)'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    providers: [{ provide: CdkTreeNode, useExisting: McTreeOption }]
                },] },
    ];
    /** @nocollapse */
    McTreeOption.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: FocusMonitor },
        { type: undefined, decorators: [{ type: Inject, args: [MC_TREE_OPTION_PARENT_COMPONENT,] }] }
    ]; };
    McTreeOption.propDecorators = {
        disabled: [{ type: Input }],
        onSelectionChange: [{ type: Output }]
    };
    return McTreeOption;
}(CdkTreeNode));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var MultipleMode = {
    CHECKBOX: 'checkbox',
    KEYBOARD: 'keyboard',
};
/** @type {?} */
var MC_SELECTION_TREE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return McTreeSelection; })),
    multi: true
};
var McTreeNavigationChange = /** @class */ (function () {
    function McTreeNavigationChange(source, option) {
        this.source = source;
        this.option = option;
    }
    return McTreeNavigationChange;
}());
var McTreeSelectionChange = /** @class */ (function () {
    function McTreeSelectionChange(source, option) {
        this.source = source;
        this.option = option;
    }
    return McTreeSelectionChange;
}());
var McTreeSelection = /** @class */ (function (_super) {
    __extends(McTreeSelection, _super);
    function McTreeSelection(elementRef, differs, changeDetectorRef, tabIndex, multiple) {
        var _this = _super.call(this, differs, changeDetectorRef) || this;
        _this.elementRef = elementRef;
        _this.navigationChange = new EventEmitter();
        _this.selectionChange = new EventEmitter();
        _this._autoSelect = true;
        _this._noUnselectLast = true;
        _this._disabled = false;
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
        _this.tabIndex = parseInt(tabIndex) || 0;
        if (multiple === MultipleMode.CHECKBOX || multiple === MultipleMode.KEYBOARD) {
            _this.multipleMode = multiple;
        }
        else if (multiple !== null) {
            _this.multipleMode = MultipleMode.CHECKBOX;
        }
        if (_this.multiple) {
            _this.autoSelect = false;
            _this.noUnselectLast = false;
        }
        _this.selectionModel = new SelectionModel(_this.multiple);
        return _this;
    }
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
            this._tabIndex = value != null ? value : 0;
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
            }
        }));
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
     * @param {?} event
     * @return {?}
     */
    McTreeSelection.prototype.onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // tslint:disable-next-line: deprecation
        /** @type {?} */
        var keyCode = event.keyCode;
        switch (keyCode) {
            case LEFT_ARROW:
                if (this.keyManager.activeItem) {
                    this.treeControl.collapse(this.keyManager.activeItem.data);
                }
                event.preventDefault();
                return;
            case RIGHT_ARROW:
                if (this.keyManager.activeItem) {
                    this.treeControl.expand(this.keyManager.activeItem.data);
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
                this.keyManager.onKeydown(event);
        }
        if (this.autoSelect && this.keyManager.activeItem) {
            this.setSelectedOption(this.keyManager.activeItem);
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
     * @param {?=} $event
     * @return {?}
     */
    McTreeSelection.prototype.setSelectedOption = /**
     * @param {?} option
     * @param {?=} $event
     * @return {?}
     */
    function (option, $event) {
        var _a;
        /** @type {?} */
        var withShift = $event ? hasModifierKey($event, 'shiftKey') : false;
        /** @type {?} */
        var withCtrl = $event ? hasModifierKey($event, 'ctrlKey') : false;
        if (this.multiple) {
            if (withShift) {
                /** @type {?} */
                var previousIndex_1 = this.keyManager.previousActiveItemIndex;
                /** @type {?} */
                var activeIndex_1 = this.keyManager.activeItemIndex;
                /** @type {?} */
                var activeOption = this.renderedOptions.toArray()[activeIndex_1];
                /** @type {?} */
                var targetSelected_1 = !activeOption.selected;
                if (previousIndex_1 < activeIndex_1) {
                    this.renderedOptions.forEach((/**
                     * @param {?} item
                     * @param {?} index
                     * @return {?}
                     */
                    function (item, index) {
                        if (index >= previousIndex_1 && index <= activeIndex_1) {
                            item.setSelected(targetSelected_1);
                        }
                    }));
                }
                else {
                    this.renderedOptions.forEach((/**
                     * @param {?} item
                     * @param {?} index
                     * @return {?}
                     */
                    function (item, index) {
                        if (index >= activeIndex_1 && index <= previousIndex_1) {
                            item.setSelected(targetSelected_1);
                        }
                    }));
                }
            }
            else if (withCtrl) {
                if (!this.canDeselectLast(option)) {
                    return;
                }
                this.selectionModel.toggle(option.data);
            }
            else {
                if (this.multipleMode === MultipleMode.KEYBOARD) {
                    this.selectionModel.clear();
                }
                this.selectionModel.toggle(option.data);
            }
        }
        else {
            if (!this.canDeselectLast(option)) {
                return;
            }
            if (this.autoSelect) {
                (_a = this.selectionModel).deselect.apply(_a, this.selectionModel.selected);
                this.selectionModel.select(option.data);
            }
        }
        this.emitChangeEvent(option);
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
        if (focusedOption) {
            this.setSelectedOption(focusedOption);
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
        var _this = this;
        var _a;
        this.selectionModel.clear();
        /** @type {?} */
        var valuesToSelect = values.reduce((/**
         * @param {?} result
         * @param {?} value
         * @return {?}
         */
        function (result, value) {
            return _this.treeControl.hasValue(value) ? result.concat([_this.treeControl.hasValue(value)]) : result.slice();
        }), []);
        (_a = this.selectionModel).select.apply(_a, valuesToSelect);
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
    McTreeSelection.decorators = [
        { type: Component, args: [{
                    selector: 'mc-tree-selection',
                    exportAs: 'mcTreeSelection',
                    template: '<ng-container cdkTreeNodeOutlet></ng-container>',
                    host: {
                        class: 'mc-tree-selection',
                        '[tabindex]': 'tabIndex',
                        '(keydown)': 'onKeyDown($event)',
                        '(window:resize)': 'updateScrollSize()'
                    },
                    styles: [".mc-tree-selection{display:block}.mc-tree-option{display:flex;align-items:center;height:28px;word-wrap:break-word;border:2px solid transparent}.mc-tree-option>.mc-icon{margin-right:4px;cursor:pointer}.mc-tree-option:focus{outline:0}.mc-tree-option:not([disabled]){cursor:pointer}.mc-tree-option .mc-pseudo-checkbox{margin-right:8px}.mc-tree-node-toggle{margin-right:4px}.mc-tree-node-toggle .mc-icon{transform:rotate(-90deg)}.mc-tree-node-toggle.mc-opened .mc-icon{transform:rotate(0)}.mc-tree-node-toggle.mc-disabled{cursor:default}"],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        MC_SELECTION_TREE_VALUE_ACCESSOR,
                        { provide: MC_TREE_OPTION_PARENT_COMPONENT, useExisting: McTreeSelection },
                        { provide: CdkTree, useExisting: McTreeSelection }
                    ]
                },] },
    ];
    /** @nocollapse */
    McTreeSelection.ctorParameters = function () { return [
        { type: ElementRef },
        { type: IterableDiffers },
        { type: ChangeDetectorRef },
        { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
        { type: String, decorators: [{ type: Attribute, args: ['multiple',] }] }
    ]; };
    McTreeSelection.propDecorators = {
        nodeOutlet: [{ type: ViewChild, args: [CdkTreeNodeOutlet, { static: true },] }],
        renderedOptions: [{ type: ContentChildren, args: [McTreeOption,] }],
        treeControl: [{ type: Input }],
        navigationChange: [{ type: Output }],
        selectionChange: [{ type: Output }],
        autoSelect: [{ type: Input }],
        noUnselectLast: [{ type: Input }],
        disabled: [{ type: Input }]
    };
    return McTreeSelection;
}(CdkTree));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                },] },
    ];
    return McTreeModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
/** @enum {string} */
var McTreeDataSourceChangeTypes = {
    Expansion: 'expansion',
    Filter: 'filter',
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        return merge.apply(void 0, [collectionViewer.viewChange, this._data]).pipe(map((/**
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McTreeModule, McTreeNodeDef, McTreeNodePadding, McTreeNodeToggleComponent, McTreeNodeToggleDirective, MultipleMode, MC_SELECTION_TREE_VALUE_ACCESSOR, McTreeNavigationChange, McTreeSelectionChange, McTreeSelection, MC_TREE_OPTION_PARENT_COMPONENT, McTreeOptionChange, McTreeOption, McTreeFlattener, McTreeFlatDataSource, McTreeNestedDataSource };
//# sourceMappingURL=tree.es5.js.map
