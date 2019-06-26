/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __extends } from 'tslib';
import { Directive, Input, ChangeDetectorRef, Component, EventEmitter, Output, ElementRef, Inject, Optional, InjectionToken, ChangeDetectionStrategy, ViewEncapsulation, Attribute, ContentChildren, IterableDiffers, ViewChild, Self, NgModule } from '@angular/core';
import { CdkTreeNodeDef, CdkTreeNodePadding, CdkTreeNodeToggle, CdkTreeNode, CdkTree, CdkTreeNodeOutlet, CdkTreeModule } from '@ptsecurity/cdk/tree';
import { toBoolean, mixinDisabled, mixinTabIndex, McPseudoCheckboxModule } from '@ptsecurity/mosaic/core';
import { NgControl } from '@angular/forms';
import { ActiveDescendantKeyManager } from '@ptsecurity/cdk/a11y';
import { SelectionModel, DataSource } from '@ptsecurity/cdk/collections';
import { END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, SPACE } from '@ptsecurity/cdk/keycodes';
import { Subject, BehaviorSubject, merge } from 'rxjs';
import { takeUntil, map, take } from 'rxjs/operators';
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
        /* tslint:disable-next-line:naming-convention */
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
var McTreeNodeToggle = /** @class */ (function (_super) {
    __extends(McTreeNodeToggle, _super);
    function McTreeNodeToggle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    McTreeNodeToggle.decorators = [
        { type: Directive, args: [{
                    selector: '[mcTreeNodeToggle]',
                    host: {
                        '(click)': 'toggle($event)'
                    },
                    providers: [{ provide: CdkTreeNodeToggle, useExisting: McTreeNodeToggle }]
                },] },
    ];
    return McTreeNodeToggle;
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
    function McTreeOption(elementRef, changeDetectorRef, parent) {
        var _this = 
        // todo any
        _super.call(this, elementRef, (/** @type {?} */ (parent))) || this;
        _this.elementRef = elementRef;
        _this.changeDetectorRef = changeDetectorRef;
        _this.parent = parent;
        _this._disabled = false;
        _this.onSelectionChange = new EventEmitter();
        _this._selected = false;
        _this._active = false;
        _this._id = "mc-tree-option-" + uniqueIdCounter++;
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
            return this._disabled;
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
    Object.defineProperty(McTreeOption.prototype, "selected", {
        // @Input()
        // get selected(): boolean {
        //     return this.treeSelection.selectionModel && this.treeSelection.selectionModel.isSelected(this) || false;
        // }
        get: 
        // @Input()
        // get selected(): boolean {
        //     return this.treeSelection.selectionModel && this.treeSelection.selectionModel.isSelected(this) || false;
        // }
        /**
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
                // this.treeSelection._reportValueChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeOption.prototype, "active", {
        /**
         * Whether or not the option is currently active and ready to be selected.
         * An active option displays styles as if it is focused, but the
         * focus is actually retained somewhere else. This comes in handy
         * for components like autocomplete where focus must remain on the input.
         */
        get: /**
         * Whether or not the option is currently active and ready to be selected.
         * An active option displays styles as if it is focused, but the
         * focus is actually retained somewhere else. This comes in handy
         * for components like autocomplete where focus must remain on the input.
         * @return {?}
         */
        function () {
            return this._active;
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
            return this.parent.multiple;
        },
        enumerable: true,
        configurable: true
    });
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
        if (this._selected === selected || !this.parent.selectionModel) {
            return;
        }
        this._selected = selected;
        if (selected) {
            this.parent.selectionModel.select(this.value);
        }
        else {
            this.parent.selectionModel.deselect(this.value);
        }
        this.changeDetectorRef.markForCheck();
    };
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    McTreeOption.prototype.setActiveStyles = /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    function () {
        if (!this._active) {
            this._active = true;
            this.changeDetectorRef.markForCheck();
        }
    };
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    McTreeOption.prototype.setInactiveStyles = /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    function () {
        if (this._active) {
            this._active = false;
            this.changeDetectorRef.markForCheck();
        }
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
    McTreeOption.prototype.focus = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = this.getHostElement();
        if (typeof element.focus === 'function') {
            element.focus();
        }
    };
    Object.defineProperty(McTreeOption.prototype, "viewValue", {
        // todo старая реализация, нужно восстановить tree-selection
        // handleClick(): void {
        //     if (this.disabled) { return; }
        //
        //     this.treeSelection.setFocusedOption(this);
        // }
        get: 
        // todo старая реализация, нужно восстановить tree-selection
        // handleClick(): void {
        //     if (this.disabled) { return; }
        //
        //     this.treeSelection.setFocusedOption(this);
        // }
        /**
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
    McTreeOption.prototype.select = /**
     * @return {?}
     */
    function () {
        if (!this._selected) {
            this._selected = true;
            this.changeDetectorRef.markForCheck();
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
     * @return {?}
     */
    McTreeOption.prototype.selectViaInteraction = /**
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent(true);
            if (this.parent.setFocusedOption) {
                this.parent.setFocusedOption(this);
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
    McTreeOption.decorators = [
        { type: Component, args: [{
                    selector: 'mc-tree-option',
                    exportAs: 'mcTreeOption',
                    template: "<ng-content select=\"[mc-icon]\"></ng-content><mc-pseudo-checkbox *ngIf=\"multiple\" [state]=\"selected ? 'checked' : ''\" [disabled]=\"disabled\"></mc-pseudo-checkbox><span class=\"mc-option-text\"><ng-content></ng-content></span><div class=\"mc-option-overlay\"></div>",
                    host: {
                        '[attr.id]': 'id',
                        '[attr.tabindex]': 'getTabIndex()',
                        '[attr.disabled]': 'disabled || null',
                        class: 'mc-tree-option',
                        '[class.mc-selected]': 'selected',
                        '[class.mc-active]': 'active',
                        '(click)': 'selectViaInteraction()'
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
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_TREE_OPTION_PARENT_COMPONENT,] }] }
    ]; };
    McTreeOption.propDecorators = {
        value: [{ type: Input }],
        disabled: [{ type: Input }],
        onSelectionChange: [{ type: Output }]
    };
    return McTreeOption;
}(CdkTreeNode));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
/**
 * @template T
 */
var /**
 * @template T
 */
McTreeSelectionBase = /** @class */ (function (_super) {
    __extends(McTreeSelectionBase, _super);
    function McTreeSelectionBase(differs, changeDetectorRef) {
        return _super.call(this, differs, changeDetectorRef) || this;
    }
    return McTreeSelectionBase;
}(CdkTree));
/* tslint:disable-next-line:naming-convention */
/** @type {?} */
var McTreeSelectionBaseMixin = mixinTabIndex(mixinDisabled(McTreeSelectionBase));
var McTreeSelection = /** @class */ (function (_super) {
    __extends(McTreeSelection, _super);
    function McTreeSelection(elementRef, differs, changeDetectorRef, ngControl, tabIndex, multiple, autoSelect, noUnselect) {
        var _this = _super.call(this, differs, changeDetectorRef) || this;
        _this.elementRef = elementRef;
        _this.ngControl = ngControl;
        _this.navigationChange = new EventEmitter();
        _this.selectionChange = new EventEmitter();
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
        if (_this.ngControl) {
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            _this.ngControl.valueAccessor = _this;
        }
        _this.tabIndex = parseInt(tabIndex) || 0;
        _this.multiple = multiple === null ? false : toBoolean(multiple);
        _this.autoSelect = autoSelect === null ? true : toBoolean(autoSelect);
        _this.noUnselect = noUnselect === null ? true : toBoolean(noUnselect);
        _this.selectionModel = new SelectionModel(_this.multiple);
        return _this;
    }
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
            var value = toBoolean(rawValue);
            if (this._disabled !== value) {
                this._disabled = value;
                if (this._disabled) {
                    /* tslint:disable-next-line:no-console */
                    console.log('need disable all options');
                }
                else {
                    /* tslint:disable-next-line:no-console */
                    console.log('need enable all options');
                }
            }
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
        this.keyManager = new ActiveDescendantKeyManager(this.options)
            .withVerticalOrientation(true)
            .withHorizontalOrientation(null);
        this.selectionModel.changed
            .pipe(takeUntil(this.destroy))
            .subscribe((/**
         * @param {?} changeEvent
         * @return {?}
         */
        function (changeEvent) {
            _this.onChange(changeEvent.source.selected);
            // event.added.forEach((option) => option.select());
            // event.removed.forEach((option) => option.deselect());
        }));
        this.options.changes
            .pipe(takeUntil(this.destroy))
            .subscribe((/**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) {
                _this.selectionModel.selected.forEach((/**
                 * @param {?} selectedOption
                 * @return {?}
                 */
                function (selectedOption) {
                    if (option.value === selectedOption) {
                        option._selected = true;
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
        this.withShift = event.shiftKey;
        this.withCtrl = event.ctrlKey;
        switch (keyCode) {
            case LEFT_ARROW:
                if (this.keyManager.activeItem) {
                    this.treeControl.collapse(this.keyManager.activeItem.data);
                }
                event.preventDefault();
                break;
            case RIGHT_ARROW:
                if (this.keyManager.activeItem) {
                    this.treeControl.expand(this.keyManager.activeItem.data);
                }
                event.preventDefault();
                break;
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
    };
    /**
     * @return {?}
     */
    McTreeSelection.prototype.updateScrollSize = /**
     * @return {?}
     */
    function () {
        if (!this.options.first) {
            return;
        }
        this.keyManager.withScrollSize(Math.floor(this.getHeight() / this.options.first.getHeight()));
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
        if (this.multiple) {
            if (!this.canDeselectLast(option)) {
                return;
            }
            option.toggle();
        }
        else if (this.withShift) {
            /** @type {?} */
            var previousIndex_1 = this.keyManager.previousActiveItemIndex;
            /** @type {?} */
            var activeIndex_1 = this.keyManager.activeItemIndex;
            if (previousIndex_1 < activeIndex_1) {
                this.options.forEach((/**
                 * @param {?} item
                 * @param {?} index
                 * @return {?}
                 */
                function (item, index) {
                    if (index >= previousIndex_1 && index <= activeIndex_1) {
                        item.setSelected(true);
                    }
                }));
            }
            else {
                this.options.forEach((/**
                 * @param {?} item
                 * @param {?} index
                 * @return {?}
                 */
                function (item, index) {
                    if (index >= activeIndex_1 && index <= previousIndex_1) {
                        item.setSelected(true);
                    }
                }));
            }
            this.withShift = false;
        }
        else if (this.withCtrl) {
            this.withCtrl = false;
            if (!this.canDeselectLast(option)) {
                return;
            }
            option.toggle();
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
        this.emitNavigationEvent(option);
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
            this.setFocusedOption(focusedOption);
            // Emit a change event because the focused option changed its state through user interaction.
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
                    var nodeData_1 = view.nodes[node.nodeIndex];
                    arrayOfInstances.push((/** @type {?} */ (nodeData_1.instance)));
                    setTimeout((/**
                     * @return {?}
                     */
                    function () { return nodeData_1.instance.changeDetectorRef.detectChanges(); }));
                }
            }));
        }));
        if (this.options) {
            this.options.reset(arrayOfInstances);
            this.options.notifyOnChanges();
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
        if (this.options) {
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
     * @param {?} isDisabled
     * @return {?}
     */
    McTreeSelection.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this._disabled = isDisabled;
        this.changeDetectorRef.markForCheck();
        // this.stateChanges.next();
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    McTreeSelection.prototype.getCorrespondOption = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.options.find((/**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            try {
                // Treat null as a special reset value.
                return option.value != null && option.value === value;
            }
            catch (error) {
                console.warn(error);
                return false;
            }
        }));
    };
    /**
     * @private
     * @param {?} values
     * @return {?}
     */
    McTreeSelection.prototype.setOptionsFromValues = /**
     * @private
     * @param {?} values
     * @return {?}
     */
    function (values) {
        var _this = this;
        values.forEach((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var correspondingOption = _this.getCorrespondOption(value);
            _this.selectionModel.select(value);
            if (correspondingOption) {
                correspondingOption.selected = true;
            }
        }));
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
        return !(this.noUnselect && this.selectionModel.selected.length === 1 && option.selected);
    };
    McTreeSelection.decorators = [
        { type: Component, args: [{
                    selector: 'mc-tree-selection',
                    exportAs: 'mcTreeSelection',
                    template: "<ng-container cdkTreeNodeOutlet></ng-container>",
                    host: {
                        class: 'mc-tree-selection',
                        '[attr.tabindex]': 'tabIndex',
                        '(keydown)': 'onKeyDown($event)',
                        '(window:resize)': 'updateScrollSize()'
                    },
                    styles: [".mc-tree-selection{display:block}.mc-tree-option{display:flex;align-items:center;height:28px;word-wrap:break-word;border:2px solid transparent}.mc-tree-option>.mc-icon{margin-right:4px;cursor:pointer}.mc-tree-option:focus{outline:0}.mc-tree-option:not([disabled]){cursor:pointer}.mc-tree-option .mc-pseudo-checkbox{margin-right:8px}.mc-icon-rotate_90{transform:rotate(90deg)}.mc-icon-rotate_180{transform:rotate(180deg)}.mc-icon-rotate_270{transform:rotate(270deg)}"],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
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
        { type: NgControl, decorators: [{ type: Self }, { type: Optional }] },
        { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
        { type: String, decorators: [{ type: Attribute, args: ['multiple',] }] },
        { type: String, decorators: [{ type: Attribute, args: ['auto-select',] }] },
        { type: String, decorators: [{ type: Attribute, args: ['no-unselect',] }] }
    ]; };
    McTreeSelection.propDecorators = {
        nodeOutlet: [{ type: ViewChild, args: [CdkTreeNodeOutlet, { static: true },] }],
        options: [{ type: ContentChildren, args: [McTreeOption,] }],
        navigationChange: [{ type: Output }],
        selectionChange: [{ type: Output }],
        disabled: [{ type: Input }]
    };
    return McTreeSelection;
}(McTreeSelectionBaseMixin));

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
    McTreeNodeToggle
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
     * @param {?} parentMap
     * @return {?}
     */
    McTreeFlattener.prototype.flattenNode = /**
     * @param {?} node
     * @param {?} level
     * @param {?} resultNodes
     * @param {?} parentMap
     * @return {?}
     */
    function (node, level, resultNodes, parentMap) {
        var _this = this;
        /** @type {?} */
        var flatNode = this.transformFunction(node, level);
        resultNodes.push(flatNode);
        if (this.isExpandable(flatNode)) {
            this.getChildren(node)
                .pipe(take(1))
                .subscribe((/**
             * @param {?} children
             * @return {?}
             */
            function (children) {
                children.forEach((/**
                 * @param {?} child
                 * @param {?} index
                 * @return {?}
                 */
                function (child, index) {
                    /** @type {?} */
                    var childParentMap = parentMap.slice();
                    childParentMap.push(index !== children.length - 1);
                    _this.flattenNode(child, level + 1, resultNodes, childParentMap);
                }));
            }));
        }
        return resultNodes;
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
        function (node) { return _this.flattenNode(node, 0, resultNodes, []); }));
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
        /** @type {?} */
        var changes = [
            collectionViewer.viewChange,
            this.treeControl.expansionModel.changed,
            this.flattenedData
        ];
        return merge.apply(void 0, changes).pipe(map((/**
         * @return {?}
         */
        function () {
            _this.expandedData.next(_this.treeFlattener.expandFlattenedNodes(_this.flattenedData.value, _this.treeControl));
            return _this.expandedData.value;
        })));
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
 * or collapse. The expansion/collapsion will be handled by ITreeControl and each non-leaf node.
 * @template T
 */
var  /**
 * Data source for nested tree.
 *
 * The data source for nested tree doesn't have to consider node flattener, or the way to expand
 * or collapse. The expansion/collapsion will be handled by ITreeControl and each non-leaf node.
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

export { McTreeModule, McTreeNodeDef, McTreeNodePadding, McTreeNodeToggle, McTreeNavigationChange, McTreeSelectionChange, McTreeSelection, MC_TREE_OPTION_PARENT_COMPONENT, McTreeOptionChange, McTreeOption, McTreeFlattener, McTreeFlatDataSource, McTreeNestedDataSource };
//# sourceMappingURL=tree.es5.js.map
