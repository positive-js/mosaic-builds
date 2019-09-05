/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/cdk/tree'), require('@ptsecurity/cdk/a11y'), require('@ptsecurity/mosaic/core'), require('@angular/cdk/collections'), require('@angular/forms'), require('@ptsecurity/cdk/keycodes'), require('rxjs'), require('rxjs/operators'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/tree', ['exports', '@angular/core', '@ptsecurity/cdk/tree', '@ptsecurity/cdk/a11y', '@ptsecurity/mosaic/core', '@angular/cdk/collections', '@angular/forms', '@ptsecurity/cdk/keycodes', 'rxjs', 'rxjs/operators', '@angular/common'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.tree = {}),global.ng.core,global.ng.cdk.tree,global.ng.cdk.a11y,global.ng.mosaic.core,global.ng.cdk.collections,global.ng.forms,global.ng.cdk.keycodes,global.rxjs,global.rxjs.operators,global.ng.common));
}(this, (function (exports,core,tree,a11y,core$1,collections,forms,keycodes,rxjs,operators,common) { 'use strict';

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
        { type: core.Directive, args: [{
                    selector: '[mcTreeNodeDef]',
                    inputs: ['when: mcTreeNodeDefWhen'],
                    providers: [{ provide: tree.CdkTreeNodeDef, useExisting: McTreeNodeDef }]
                },] },
    ];
    McTreeNodeDef.propDecorators = {
        data: [{ type: core.Input, args: ['mcTreeNode',] }]
    };
    return McTreeNodeDef;
}(tree.CdkTreeNodeDef));

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
        { type: core.Directive, args: [{
                    selector: '[mcTreeNodePadding]',
                    providers: [{ provide: tree.CdkTreeNodePadding, useExisting: McTreeNodePadding }]
                },] },
    ];
    McTreeNodePadding.propDecorators = {
        level: [{ type: core.Input, args: ['mcTreeNodePadding',] }],
        indent: [{ type: core.Input, args: ['mcTreeNodePaddingIndent',] }]
    };
    return McTreeNodePadding;
}(tree.CdkTreeNodePadding));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var McTreeNodeToggleComponent = /** @class */ (function (_super) {
    __extends(McTreeNodeToggleComponent, _super);
    function McTreeNodeToggleComponent(tree$$1, treeNode) {
        var _this = _super.call(this, tree$$1, treeNode) || this;
        _this.tree = tree$$1;
        _this.treeNode = treeNode;
        _this.disabled = false;
        // todo может пересмотреть, как то не очень
        ((/** @type {?} */ (_this.tree.treeControl))).filterValue
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { _this.disabled = value.length > 0; }));
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
        { type: core.Component, args: [{
                    selector: 'mc-tree-node-toggle',
                    template: "\n        <i class=\"mc mc-icon mc-angle-down-S_16\"></i>\n    ",
                    host: {
                        class: 'mc-tree-node-toggle',
                        '(click)': 'toggle($event)',
                        '[class.mc-disabled]': 'disabled',
                        '[class.mc-opened]': 'iconState'
                    },
                    encapsulation: core.ViewEncapsulation.None,
                    providers: [{ provide: tree.CdkTreeNodeToggle, useExisting: McTreeNodeToggleComponent }]
                },] },
    ];
    /** @nocollapse */
    McTreeNodeToggleComponent.ctorParameters = function () { return [
        { type: tree.CdkTree },
        { type: tree.CdkTreeNode }
    ]; };
    McTreeNodeToggleComponent.propDecorators = {
        node: [{ type: core.Input }]
    };
    return McTreeNodeToggleComponent;
}(tree.CdkTreeNodeToggle));
/**
 * @template T
 */
var McTreeNodeToggleDirective = /** @class */ (function (_super) {
    __extends(McTreeNodeToggleDirective, _super);
    function McTreeNodeToggleDirective(tree$$1, treeNode) {
        var _this = _super.call(this, tree$$1, treeNode) || this;
        _this.tree = tree$$1;
        _this.treeNode = treeNode;
        _this.disabled = false;
        // todo может пересмотреть, как то не очень
        ((/** @type {?} */ (_this.tree.treeControl))).filterValue
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { _this.disabled = value.length > 0; }));
        return _this;
    }
    McTreeNodeToggleDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mcTreeNodeToggle]',
                    host: {
                        '(click)': 'toggle($event)',
                        '[class.mc-disabled]': 'disabled'
                    },
                    providers: [{ provide: tree.CdkTreeNodeToggle, useExisting: McTreeNodeToggleDirective }]
                },] },
    ];
    /** @nocollapse */
    McTreeNodeToggleDirective.ctorParameters = function () { return [
        { type: tree.CdkTree },
        { type: tree.CdkTreeNode }
    ]; };
    return McTreeNodeToggleDirective;
}(tree.CdkTreeNodeToggle));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Injection token used to provide the parent component to options.
 * @type {?}
 */
var MC_TREE_OPTION_PARENT_COMPONENT = new core.InjectionToken('MC_TREE_OPTION_PARENT_COMPONENT');
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
    function McTreeOption(elementRef, changeDetectorRef, focusMonitor, parent) {
        var _this = 
        // todo any
        _super.call(this, elementRef, (/** @type {?} */ (parent))) || this;
        _this.elementRef = elementRef;
        _this.changeDetectorRef = changeDetectorRef;
        _this.focusMonitor = focusMonitor;
        _this.parent = parent;
        _this._disabled = false;
        _this.onSelectionChange = new core.EventEmitter();
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
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var newValue = core$1.toBoolean(value);
            if (newValue !== this._disabled) {
                this._disabled = newValue;
            }
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
            var isSelected = core$1.toBoolean(value);
            if (isSelected !== this._selected) {
                this.setSelected(isSelected);
                // this.treeSelection._reportValueChange();
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
            return this.parent.multiple;
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
        if (this.parent.setFocusedOption) {
            this.parent.setFocusedOption(this);
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
        /** @type {?} */
        var element = this.getHostElement();
        if (typeof element.focus === 'function') {
            element.focus();
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
            if (this.parent.setSelectedOption) {
                this.parent.setSelectedOption(this, $event);
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
        { type: core.Component, args: [{
                    selector: 'mc-tree-option',
                    exportAs: 'mcTreeOption',
                    template: "<ng-content select=\"[mc-icon]\"></ng-content><mc-pseudo-checkbox *ngIf=\"multiple\" [state]=\"selected ? 'checked' : ''\" [disabled]=\"disabled\"></mc-pseudo-checkbox><span class=\"mc-option-text\"><ng-content></ng-content></span><div class=\"mc-option-overlay\"></div>",
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
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    providers: [{ provide: tree.CdkTreeNode, useExisting: McTreeOption }]
                },] },
    ];
    /** @nocollapse */
    McTreeOption.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef },
        { type: a11y.FocusMonitor },
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [MC_TREE_OPTION_PARENT_COMPONENT,] }] }
    ]; };
    McTreeOption.propDecorators = {
        value: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        onSelectionChange: [{ type: core.Output }]
    };
    return McTreeOption;
}(tree.CdkTreeNode));

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
var McTreeSelection = /** @class */ (function (_super) {
    __extends(McTreeSelection, _super);
    function McTreeSelection(elementRef, differs, changeDetectorRef, ngControl, multiple, autoSelect, noUnselect) {
        var _this = _super.call(this, differs, changeDetectorRef) || this;
        _this.elementRef = elementRef;
        _this.ngControl = ngControl;
        _this.navigationChange = new core.EventEmitter();
        _this.selectionChange = new core.EventEmitter();
        _this._disabled = false;
        _this.destroy = new rxjs.Subject();
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
        _this.multiple = multiple === null ? false : core$1.toBoolean(multiple);
        _this.autoSelect = autoSelect === null ? true : core$1.toBoolean(autoSelect);
        _this.noUnselectLastSelected = noUnselect === null ? true : core$1.toBoolean(noUnselect);
        _this.selectionModel = new collections.SelectionModel(_this.multiple);
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
            var value = core$1.toBoolean(rawValue);
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
    /**
     * @return {?}
     */
    McTreeSelection.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.keyManager = new a11y.FocusKeyManager(this.options)
            .withVerticalOrientation(true)
            .withHorizontalOrientation(null);
        this.keyManager.change
            .pipe(operators.takeUntil(this.destroy))
            .subscribe((/**
         * @return {?}
         */
        function () {
            if (_this.keyManager.activeItem) {
                _this.emitNavigationEvent(_this.keyManager.activeItem);
            }
        }));
        this.selectionModel.changed
            .pipe(operators.takeUntil(this.destroy))
            .subscribe((/**
         * @param {?} changeEvent
         * @return {?}
         */
        function (changeEvent) {
            _this.onChange(changeEvent.source.selected);
            _this.options.notifyOnChanges();
        }));
        this.options.changes
            .pipe(operators.takeUntil(this.destroy))
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
                option.deselect();
                _this.selectionModel.selected.forEach((/**
                 * @param {?} selectedOption
                 * @return {?}
                 */
                function (selectedOption) {
                    if (option.value === selectedOption) {
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
            case keycodes.LEFT_ARROW:
                if (this.keyManager.activeItem) {
                    this.treeControl.collapse(this.keyManager.activeItem.data);
                }
                event.preventDefault();
                break;
            case keycodes.RIGHT_ARROW:
                if (this.keyManager.activeItem) {
                    this.treeControl.expand(this.keyManager.activeItem.data);
                }
                event.preventDefault();
                break;
            case keycodes.SPACE:
            case keycodes.ENTER:
                this.toggleFocusedOption();
                event.preventDefault();
                break;
            case keycodes.HOME:
                this.keyManager.setFirstItemActive();
                event.preventDefault();
                break;
            case keycodes.END:
                this.keyManager.setLastItemActive();
                event.preventDefault();
                break;
            case keycodes.PAGE_UP:
                this.keyManager.setPreviousPageItemActive();
                event.preventDefault();
                break;
            case keycodes.PAGE_DOWN:
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
     * @param {?=} $event
     * @return {?}
     */
    McTreeSelection.prototype.setSelectedOption = /**
     * @param {?} option
     * @param {?=} $event
     * @return {?}
     */
    function (option, $event) {
        /** @type {?} */
        var withShift = $event ? keycodes.hasModifierKey($event, 'shiftKey') : false;
        /** @type {?} */
        var withCtrl = $event ? keycodes.hasModifierKey($event, 'ctrlKey') : false;
        if (this.multiple) {
            if (!this.canDeselectLast(option)) {
                return;
            }
            option.toggle();
            this.emitChangeEvent(option);
        }
        else if (withShift) {
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
            this.emitChangeEvent(option);
        }
        else if (withCtrl) {
            if (!this.canDeselectLast(option)) {
                return;
            }
            option.toggle();
            this.emitChangeEvent(option);
        }
        else {
            if (this.autoSelect) {
                this.options.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.setSelected(false); }));
                option.setSelected(true);
                this.emitChangeEvent(option);
            }
        }
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
        this.selectionModel.clear();
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
        this.options.notifyOnChanges();
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
        return !(this.noUnselectLastSelected && this.selectionModel.selected.length === 1 && option.selected);
    };
    McTreeSelection.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-tree-selection',
                    exportAs: 'mcTreeSelection',
                    template: "<ng-container cdkTreeNodeOutlet></ng-container>",
                    host: {
                        class: 'mc-tree-selection',
                        '[attr.tabindex]': 'tabIndex',
                        '(keydown)': 'onKeyDown($event)',
                        '(window:resize)': 'updateScrollSize()'
                    },
                    styles: [".mc-tree-selection{display:block}.mc-tree-option{display:flex;align-items:center;height:28px;word-wrap:break-word;border:2px solid transparent}.mc-tree-option>.mc-icon{margin-right:4px;cursor:pointer}.mc-tree-option:focus{outline:0}.mc-tree-option:not([disabled]){cursor:pointer}.mc-tree-option .mc-pseudo-checkbox{margin-right:8px}.mc-tree-node-toggle{margin-right:4px}.mc-tree-node-toggle .mc-icon{transform:rotate(-90deg)}.mc-tree-node-toggle.mc-opened .mc-icon{transform:rotate(0)}.mc-tree-node-toggle.mc-disabled{cursor:default}"],
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    providers: [
                        { provide: MC_TREE_OPTION_PARENT_COMPONENT, useExisting: McTreeSelection },
                        { provide: tree.CdkTree, useExisting: McTreeSelection }
                    ]
                },] },
    ];
    /** @nocollapse */
    McTreeSelection.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.IterableDiffers },
        { type: core.ChangeDetectorRef },
        { type: forms.NgControl, decorators: [{ type: core.Self }, { type: core.Optional }] },
        { type: String, decorators: [{ type: core.Attribute, args: ['multiple',] }] },
        { type: String, decorators: [{ type: core.Attribute, args: ['auto-select',] }] },
        { type: String, decorators: [{ type: core.Attribute, args: ['no-unselect',] }] }
    ]; };
    McTreeSelection.propDecorators = {
        nodeOutlet: [{ type: core.ViewChild, args: [tree.CdkTreeNodeOutlet, { static: true },] }],
        options: [{ type: core.ContentChildren, args: [McTreeOption,] }],
        navigationChange: [{ type: core.Output }],
        selectionChange: [{ type: core.Output }],
        disabled: [{ type: core.Input }],
        tabIndex: [{ type: core.Input }]
    };
    return McTreeSelection;
}(tree.CdkTree));

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
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, tree.CdkTreeModule, core$1.McPseudoCheckboxModule],
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
var   /**
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
                        .pipe(operators.take(1))
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
var   /**
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
        _this.flattenedData = new rxjs.BehaviorSubject([]);
        _this.expandedData = new rxjs.BehaviorSubject([]);
        _this.filteredData = new rxjs.BehaviorSubject([]);
        _this._data = new rxjs.BehaviorSubject(initialData);
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
        return rxjs.merge(collectionViewer.viewChange, this.treeControl.expansionModel.changed
            .pipe(operators.map((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return ({ type: McTreeDataSourceChangeTypes.Expansion, value: value }); }))), this.treeControl.filterValue
            .pipe(operators.map((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return ({ type: McTreeDataSourceChangeTypes.Filter, value: value }); }))), this.flattenedData)
            .pipe(operators.map((/**
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
}(collections.DataSource));

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
var   /**
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
        _this._data = new rxjs.BehaviorSubject([]);
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
        return rxjs.merge.apply(void 0, [collectionViewer.viewChange, this._data]).pipe(operators.map((/**
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
}(collections.DataSource));

exports.McTreeModule = McTreeModule;
exports.McTreeNodeDef = McTreeNodeDef;
exports.McTreeNodePadding = McTreeNodePadding;
exports.McTreeNodeToggleComponent = McTreeNodeToggleComponent;
exports.McTreeNodeToggleDirective = McTreeNodeToggleDirective;
exports.McTreeNavigationChange = McTreeNavigationChange;
exports.McTreeSelectionChange = McTreeSelectionChange;
exports.McTreeSelection = McTreeSelection;
exports.MC_TREE_OPTION_PARENT_COMPONENT = MC_TREE_OPTION_PARENT_COMPONENT;
exports.McTreeOptionChange = McTreeOptionChange;
exports.McTreeOption = McTreeOption;
exports.McTreeFlattener = McTreeFlattener;
exports.McTreeFlatDataSource = McTreeFlatDataSource;
exports.McTreeNestedDataSource = McTreeNestedDataSource;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-tree.umd.js.map
