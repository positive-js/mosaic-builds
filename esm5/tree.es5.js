/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __extends, __metadata, __param } from 'tslib';
import { Directive, Input, ChangeDetectorRef, Component, EventEmitter, Output, ElementRef, Inject, Optional, InjectionToken, Attribute, ChangeDetectionStrategy, ContentChildren, IterableDiffers, QueryList, ViewChild, ViewEncapsulation, NgModule } from '@angular/core';
import { CdkTreeNodeDef, CdkTreeNodePadding, CdkTreeNodeToggle, CdkTreeNode, CdkTree, CdkTreeNodeOutlet, CdkTreeModule } from '@ptsecurity/cdk/tree';
import { toBoolean, mixinDisabled, mixinTabIndex, McPseudoCheckboxModule } from '@ptsecurity/mosaic/core';
import { ActiveDescendantKeyManager } from '@ptsecurity/cdk/a11y';
import { SelectionModel, DataSource } from '@ptsecurity/cdk/collections';
import { END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, SPACE } from '@ptsecurity/cdk/keycodes';
import { Subject, BehaviorSubject, merge } from 'rxjs';
import { CommonModule } from '@angular/common';
import { map, take } from 'rxjs/operators';

var McTreeNodeDef = /** @class */ (function (_super) {
    __extends(McTreeNodeDef, _super);
    function McTreeNodeDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    McTreeNodeDef_1 = McTreeNodeDef;
    var McTreeNodeDef_1;
    __decorate([
        Input('mcTreeNode'),
        __metadata("design:type", Object)
    ], McTreeNodeDef.prototype, "data", void 0);
    McTreeNodeDef = McTreeNodeDef_1 = __decorate([
        Directive({
            selector: '[mcTreeNodeDef]',
            inputs: ['when: mcTreeNodeDefWhen'],
            providers: [{ provide: CdkTreeNodeDef, useExisting: McTreeNodeDef_1 }]
        })
    ], McTreeNodeDef);
    return McTreeNodeDef;
}(CdkTreeNodeDef));

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
    McTreeNodePadding_1 = McTreeNodePadding;
    Object.defineProperty(McTreeNodePadding.prototype, "leftPadding", {
        get: function () {
            return (this.withIcon ? 0 : this.iconWidth) + this.baseLeftPadding;
        },
        enumerable: true,
        configurable: true
    });
    McTreeNodePadding.prototype.paddingIndent = function () {
        var nodeLevel = (this.treeNode.data && this.tree.treeControl.getLevel)
            ? this.tree.treeControl.getLevel(this.treeNode.data)
            : null;
        var level = this.level || nodeLevel;
        return level ? (level * this._indent) + this.leftPadding + "px" : this.baseLeftPadding + "px";
    };
    McTreeNodePadding.prototype.ngOnInit = function () {
        this.withIcon = this.tree.treeControl.isExpandable(this.treeNode.data);
        this.setPadding();
    };
    var McTreeNodePadding_1;
    __decorate([
        Input('mcTreeNodePadding'),
        __metadata("design:type", Number)
    ], McTreeNodePadding.prototype, "level", void 0);
    __decorate([
        Input('mcTreeNodePaddingIndent'),
        __metadata("design:type", Number)
    ], McTreeNodePadding.prototype, "indent", void 0);
    McTreeNodePadding = McTreeNodePadding_1 = __decorate([
        Directive({
            selector: '[mcTreeNodePadding]',
            providers: [{ provide: CdkTreeNodePadding, useExisting: McTreeNodePadding_1 }]
        })
    ], McTreeNodePadding);
    return McTreeNodePadding;
}(CdkTreeNodePadding));

var McTreeNodeToggle = /** @class */ (function (_super) {
    __extends(McTreeNodeToggle, _super);
    function McTreeNodeToggle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    McTreeNodeToggle_1 = McTreeNodeToggle;
    var McTreeNodeToggle_1;
    McTreeNodeToggle = McTreeNodeToggle_1 = __decorate([
        Directive({
            selector: '[mcTreeNodeToggle]',
            host: {
                '(click)': 'toggle($event)'
            },
            providers: [{ provide: CdkTreeNodeToggle, useExisting: McTreeNodeToggle_1 }]
        })
    ], McTreeNodeToggle);
    return McTreeNodeToggle;
}(CdkTreeNodeToggle));

/**
 * Injection token used to provide the parent component to options.
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
var uniqueIdCounter = 0;
var McTreeOption = /** @class */ (function (_super) {
    __extends(McTreeOption, _super);
    function McTreeOption(elementRef, changeDetectorRef, parent) {
        var _this = 
        // todo any
        _super.call(this, elementRef, parent) || this;
        _this.elementRef = elementRef;
        _this.changeDetectorRef = changeDetectorRef;
        _this.parent = parent;
        _this.onSelectionChange = new EventEmitter();
        _this._disabled = false;
        _this._selected = false;
        _this._active = false;
        _this._id = "mc-tree-option-" + uniqueIdCounter++;
        return _this;
    }
    McTreeOption_1 = McTreeOption;
    Object.defineProperty(McTreeOption.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
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
        get: function () {
            return this._selected;
        },
        set: function (value) {
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
        get: function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeOption.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeOption.prototype, "multiple", {
        get: function () {
            return this.parent.multiple;
        },
        enumerable: true,
        configurable: true
    });
    McTreeOption.prototype.toggle = function () {
        this.selected = !this.selected;
    };
    McTreeOption.prototype.setSelected = function (selected) {
        if (this._selected === selected || !this.parent.selectionModel) {
            return;
        }
        this._selected = selected;
        if (selected) {
            this.parent.selectionModel.select(this);
        }
        else {
            this.parent.selectionModel.deselect(this);
        }
        // this._changeDetector.markForCheck();
    };
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    McTreeOption.prototype.setActiveStyles = function () {
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
    McTreeOption.prototype.setInactiveStyles = function () {
        if (this._active) {
            this._active = false;
            this.changeDetectorRef.markForCheck();
        }
    };
    McTreeOption.prototype.getHeight = function () {
        var clientRects = this.elementRef.nativeElement.getClientRects();
        if (clientRects.length) {
            return clientRects[0].height;
        }
        return 0;
    };
    McTreeOption.prototype.focus = function () {
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
        /**
         * The displayed value of the option. It is necessary to show the selected option in the
         * select's trigger.
         */
        get: function () {
            // TODO(kara): Add input property alternative for node envs.
            return (this.getHostElement().textContent || '').trim();
        },
        enumerable: true,
        configurable: true
    });
    McTreeOption.prototype.select = function () {
        if (!this._selected) {
            this._selected = true;
            this.changeDetectorRef.markForCheck();
        }
    };
    McTreeOption.prototype.deselect = function () {
        if (this._selected) {
            this._selected = false;
            this.changeDetectorRef.markForCheck();
        }
    };
    McTreeOption.prototype.selectViaInteraction = function () {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent(true);
            if (this.parent.setFocusedOption) {
                this.parent.setFocusedOption(this);
            }
        }
    };
    McTreeOption.prototype.emitSelectionChangeEvent = function (isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.onSelectionChange.emit(new McTreeOptionChange(this, isUserInput));
    };
    McTreeOption.prototype.getHostElement = function () {
        return this.elementRef.nativeElement;
    };
    McTreeOption.prototype.getTabIndex = function () {
        return this.disabled ? '-1' : '0';
    };
    var McTreeOption_1;
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], McTreeOption.prototype, "onSelectionChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], McTreeOption.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McTreeOption.prototype, "disabled", null);
    McTreeOption = McTreeOption_1 = __decorate([
        Component({
            selector: 'mc-tree-option',
            exportAs: 'mcTreeOption',
            host: {
                '[attr.id]': 'id',
                '[attr.tabindex]': 'getTabIndex()',
                '[attr.disabled]': 'disabled || null',
                class: 'mc-tree-option',
                '[class.mc-selected]': 'selected',
                '[class.mc-active]': 'active',
                '(click)': 'selectViaInteraction()'
            },
            template: "<ng-content select=\"[mc-icon]\"></ng-content><mc-pseudo-checkbox *ngIf=\"multiple\" [state]=\"selected ? 'checked' : ''\" [disabled]=\"disabled\"></mc-pseudo-checkbox><span class=\"mc-option-text\"><ng-content></ng-content></span><div class=\"mc-option-overlay\"></div>",
            providers: [{ provide: CdkTreeNode, useExisting: McTreeOption_1 }]
        }),
        __param(2, Optional()), __param(2, Inject(MC_TREE_OPTION_PARENT_COMPONENT)),
        __metadata("design:paramtypes", [ElementRef,
            ChangeDetectorRef, Object])
    ], McTreeOption);
    return McTreeOption;
}(CdkTreeNode));

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
var McTreeSelectionBase = /** @class */ (function (_super) {
    __extends(McTreeSelectionBase, _super);
    function McTreeSelectionBase(differs, changeDetectorRef) {
        return _super.call(this, differs, changeDetectorRef) || this;
    }
    return McTreeSelectionBase;
}(CdkTree));
/* tslint:disable-next-line:naming-convention */
var McTreeSelectionBaseMixin = mixinTabIndex(mixinDisabled(McTreeSelectionBase));
var McTreeSelection = /** @class */ (function (_super) {
    __extends(McTreeSelection, _super);
    function McTreeSelection(elementRef, differs, changeDetectorRef, tabIndex, multiple, autoSelect, noUnselect) {
        var _this = _super.call(this, differs, changeDetectorRef) || this;
        _this.elementRef = elementRef;
        _this.navigationChange = new EventEmitter();
        _this.selectionChange = new EventEmitter();
        _this._disabled = false;
        _this.destroy = new Subject();
        _this.tabIndex = parseInt(tabIndex) || 0;
        _this.multiple = multiple === null ? false : toBoolean(multiple);
        _this.autoSelect = autoSelect === null ? true : toBoolean(autoSelect);
        _this.noUnselect = noUnselect === null ? true : toBoolean(noUnselect);
        _this.selectionModel = new SelectionModel(_this.multiple);
        return _this;
    }
    McTreeSelection_1 = McTreeSelection;
    Object.defineProperty(McTreeSelection.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (rawValue) {
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
    McTreeSelection.prototype.ngAfterContentInit = function () {
        this.keyManager = new ActiveDescendantKeyManager(this.options)
            // .withTypeAhead()
            .withVerticalOrientation(true)
            .withHorizontalOrientation(null);
    };
    McTreeSelection.prototype.ngOnDestroy = function () {
        this.destroy.next();
        this.destroy.complete();
    };
    McTreeSelection.prototype.onKeyDown = function (event) {
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
    McTreeSelection.prototype.updateScrollSize = function () {
        if (!this.options.first) {
            return;
        }
        this.keyManager.withScrollSize(Math.floor(this.getHeight() / this.options.first.getHeight()));
    };
    McTreeSelection.prototype.setFocusedOption = function (option) {
        this.keyManager.setActiveItem(option);
        if (this.withShift && this.multiple) {
            var previousIndex_1 = this.keyManager.previousActiveItemIndex;
            var activeIndex_1 = this.keyManager.activeItemIndex;
            if (previousIndex_1 < activeIndex_1) {
                this.options.forEach(function (item, index) {
                    if (index >= previousIndex_1 && index <= activeIndex_1) {
                        item.setSelected(true);
                    }
                });
            }
            else {
                this.options.forEach(function (item, index) {
                    if (index >= activeIndex_1 && index <= previousIndex_1) {
                        item.setSelected(true);
                    }
                });
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
                this.options.forEach(function (item) { return item.setSelected(false); });
                option.setSelected(true);
            }
        }
        this.emitNavigationEvent(option);
    };
    McTreeSelection.prototype.toggleFocusedOption = function () {
        var focusedIndex = this.keyManager.activeItemIndex;
        if (focusedIndex != null && this.isValidIndex(focusedIndex)) {
            var focusedOption = this.options.toArray()[focusedIndex];
            if (focusedOption && this.canDeselectLast(focusedOption)) {
                focusedOption.toggle();
                // Emit a change event because the focused option changed its state through user interaction.
                this.emitChangeEvent(focusedOption);
            }
        }
    };
    McTreeSelection.prototype.renderNodeChanges = function (data, dataDiffer, viewContainer, parentData) {
        if (dataDiffer === void 0) { dataDiffer = this.dataDiffer; }
        if (viewContainer === void 0) { viewContainer = this.nodeOutlet.viewContainer; }
        _super.prototype.renderNodeChanges.call(this, data, dataDiffer, viewContainer, parentData);
        var arrayOfInstances = [];
        viewContainer._embeddedViews.forEach(function (view) {
            var viewDef = view.def;
            viewDef.nodes.forEach(function (node) {
                if (viewDef.nodeMatchedQueries === node.matchedQueryIds) {
                    var nodeData = view.nodes[node.nodeIndex];
                    arrayOfInstances.push(nodeData.instance);
                }
            });
        });
        if (this.options) {
            this.options.reset(arrayOfInstances);
            this.options.notifyOnChanges();
        }
        this.updateScrollSize();
    };
    McTreeSelection.prototype.getHeight = function () {
        var clientRects = this.elementRef.nativeElement.getClientRects();
        if (clientRects.length) {
            return clientRects[0].height;
        }
        return 0;
    };
    McTreeSelection.prototype.emitNavigationEvent = function (option) {
        this.navigationChange.emit(new McTreeNavigationChange(this, option));
    };
    McTreeSelection.prototype.emitChangeEvent = function (option) {
        this.selectionChange.emit(new McTreeNavigationChange(this, option));
    };
    McTreeSelection.prototype.isValidIndex = function (index) {
        return index >= 0 && index < this.options.length;
    };
    McTreeSelection.prototype.canDeselectLast = function (option) {
        return !(this.noUnselect && this.selectionModel.selected.length === 1 && option.selected);
    };
    var McTreeSelection_1;
    __decorate([
        ViewChild(CdkTreeNodeOutlet),
        __metadata("design:type", CdkTreeNodeOutlet)
    ], McTreeSelection.prototype, "nodeOutlet", void 0);
    __decorate([
        ContentChildren(McTreeOption),
        __metadata("design:type", QueryList)
    ], McTreeSelection.prototype, "options", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], McTreeSelection.prototype, "navigationChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], McTreeSelection.prototype, "selectionChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McTreeSelection.prototype, "disabled", null);
    McTreeSelection = McTreeSelection_1 = __decorate([
        Component({
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
                { provide: MC_TREE_OPTION_PARENT_COMPONENT, useExisting: McTreeSelection_1 },
                { provide: CdkTree, useExisting: McTreeSelection_1 }
            ]
        }),
        __param(3, Attribute('tabindex')),
        __param(4, Attribute('multiple')),
        __param(5, Attribute('auto-select')),
        __param(6, Attribute('no-unselect')),
        __metadata("design:paramtypes", [ElementRef,
            IterableDiffers,
            ChangeDetectorRef, String, String, String, String])
    ], McTreeSelection);
    return McTreeSelection;
}(McTreeSelectionBaseMixin));

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
    McTreeModule = __decorate([
        NgModule({
            imports: [CommonModule, CdkTreeModule, McPseudoCheckboxModule],
            exports: MC_TREE_DIRECTIVES,
            declarations: MC_TREE_DIRECTIVES
        })
    ], McTreeModule);
    return McTreeModule;
}());

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
 */
var McTreeFlattener = /** @class */ (function () {
    function McTreeFlattener(transformFunction, getLevel, isExpandable, getChildren) {
        this.transformFunction = transformFunction;
        this.getLevel = getLevel;
        this.isExpandable = isExpandable;
        this.getChildren = getChildren;
    }
    McTreeFlattener.prototype.flattenNode = function (node, level, resultNodes, parentMap) {
        var _this = this;
        var flatNode = this.transformFunction(node, level);
        resultNodes.push(flatNode);
        if (this.isExpandable(flatNode)) {
            this.getChildren(node)
                .pipe(take(1))
                .subscribe(function (children) {
                children.forEach(function (child, index) {
                    var childParentMap = parentMap.slice();
                    childParentMap.push(index !== children.length - 1);
                    _this.flattenNode(child, level + 1, resultNodes, childParentMap);
                });
            });
        }
        return resultNodes;
    };
    /**
     * Flatten a list of node type T to flattened version of node F.
     * Please note that type T may be nested, and the length of `structuredData` may be different
     * from that of returned list `F[]`.
     */
    McTreeFlattener.prototype.flattenNodes = function (structuredData) {
        var _this = this;
        var resultNodes = [];
        structuredData.forEach(function (node) { return _this.flattenNode(node, 0, resultNodes, []); });
        return resultNodes;
    };
    /**
     * Expand flattened node with current expansion status.
     * The returned list may have different length.
     */
    McTreeFlattener.prototype.expandFlattenedNodes = function (nodes, treeControl) {
        var _this = this;
        var results = [];
        var currentExpand = [];
        currentExpand[0] = true;
        nodes.forEach(function (node) {
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
        });
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
 */
var McTreeFlatDataSource = /** @class */ (function (_super) {
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
        get: function () {
            return this._data.value;
        },
        set: function (value) {
            this._data.next(value);
            this.flattenedData.next(this.treeFlattener.flattenNodes(this.data));
            this.treeControl.dataNodes = this.flattenedData.value;
        },
        enumerable: true,
        configurable: true
    });
    McTreeFlatDataSource.prototype.connect = function (collectionViewer) {
        var _this = this;
        var changes = [
            collectionViewer.viewChange,
            this.treeControl.expansionModel.changed,
            this.flattenedData
        ];
        return merge.apply(void 0, changes).pipe(map(function () {
            _this.expandedData.next(_this.treeFlattener.expandFlattenedNodes(_this.flattenedData.value, _this.treeControl));
            return _this.expandedData.value;
        }));
    };
    McTreeFlatDataSource.prototype.disconnect = function () {
        // no op
    };
    return McTreeFlatDataSource;
}(DataSource));

/**
 * Data source for nested tree.
 *
 * The data source for nested tree doesn't have to consider node flattener, or the way to expand
 * or collapse. The expansion/collapsion will be handled by ITreeControl and each non-leaf node.
 */
var McTreeNestedDataSource = /** @class */ (function (_super) {
    __extends(McTreeNestedDataSource, _super);
    function McTreeNestedDataSource() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /* tslint:disable-next-line:naming-convention */
        _this._data = new BehaviorSubject([]);
        return _this;
    }
    Object.defineProperty(McTreeNestedDataSource.prototype, "data", {
        get: function () {
            return this._data.value;
        },
        set: function (value) {
            this._data.next(value);
        },
        enumerable: true,
        configurable: true
    });
    McTreeNestedDataSource.prototype.connect = function (collectionViewer) {
        var _this = this;
        return merge.apply(void 0, [collectionViewer.viewChange, this._data]).pipe(map(function () { return _this.data; }));
    };
    McTreeNestedDataSource.prototype.disconnect = function () {
        // no op
    };
    return McTreeNestedDataSource;
}(DataSource));

/**
 * Generated bundle index. Do not edit.
 */

export { McTreeModule, McTreeNodeDef, McTreeNodePadding, McTreeNodeToggle, McTreeNavigationChange, McTreeSelectionChange, McTreeSelection, MC_TREE_OPTION_PARENT_COMPONENT, McTreeOptionChange, McTreeOption, McTreeFlattener, McTreeFlatDataSource, McTreeNestedDataSource };
//# sourceMappingURL=tree.es5.js.map
