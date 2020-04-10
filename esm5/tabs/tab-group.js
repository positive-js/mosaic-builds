/**
 * @fileoverview added by tsickle
 * Generated from: tab-group.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends, __read, __spread } from "tslib";
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewEncapsulation, InjectionToken, Inject, Optional, Directive, Attribute } from '@angular/core';
import { mixinColor, mixinDisabled } from '@ptsecurity/mosaic/core';
import { merge, Subscription } from 'rxjs';
import { McTab } from './tab';
import { McTabHeader } from './tab-header';
var McLightTabsCssStyler = /** @class */ (function () {
    function McLightTabsCssStyler() {
    }
    McLightTabsCssStyler.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-tab-group[mc-light-tabs], [mc-tab-nav-bar][mc-light-tabs]',
                    host: { class: 'mc-tab-group_light' }
                },] }
    ];
    return McLightTabsCssStyler;
}());
export { McLightTabsCssStyler };
var McAlignTabsCenterCssStyler = /** @class */ (function () {
    function McAlignTabsCenterCssStyler() {
    }
    McAlignTabsCenterCssStyler.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-tab-group[mc-align-tabs-center], [mc-tab-nav-bar][mc-align-tabs-center]',
                    host: { class: 'mc-tab-group_align-labels-center' }
                },] }
    ];
    return McAlignTabsCenterCssStyler;
}());
export { McAlignTabsCenterCssStyler };
var McAlignTabsEndCssStyler = /** @class */ (function () {
    function McAlignTabsEndCssStyler() {
    }
    McAlignTabsEndCssStyler.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-tab-group[mc-align-tabs-end], [mc-tab-nav-bar][mc-align-tabs-end]',
                    host: { class: 'mc-tab-group_align-labels-end' }
                },] }
    ];
    return McAlignTabsEndCssStyler;
}());
export { McAlignTabsEndCssStyler };
var McStretchTabsCssStyler = /** @class */ (function () {
    function McStretchTabsCssStyler() {
    }
    McStretchTabsCssStyler.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-tab-group[mc-stretch-tabs], [mc-tab-nav-bar][mc-stretch-tabs]',
                    host: { class: 'mc-tab-group_stretch-labels' }
                },] }
    ];
    return McStretchTabsCssStyler;
}());
export { McStretchTabsCssStyler };
/**
 * Used to generate unique ID's for each tab component
 * @type {?}
 */
var nextId = 0;
/**
 * A simple change event emitted on focus or selection changes.
 */
var /**
 * A simple change event emitted on focus or selection changes.
 */
McTabChangeEvent = /** @class */ (function () {
    function McTabChangeEvent() {
    }
    return McTabChangeEvent;
}());
/**
 * A simple change event emitted on focus or selection changes.
 */
export { McTabChangeEvent };
if (false) {
    /**
     * Index of the currently-selected tab.
     * @type {?}
     */
    McTabChangeEvent.prototype.index;
    /**
     * Reference to the currently-selected tab.
     * @type {?}
     */
    McTabChangeEvent.prototype.tab;
}
/**
 * Object that can be used to configure the default options for the tabs module.
 * @record
 */
export function IMcTabsConfig() { }
if (false) {
    /**
     * Duration for the tab animation. Must be a valid CSS value (e.g. 600ms).
     * @type {?|undefined}
     */
    IMcTabsConfig.prototype.animationDuration;
}
/**
 * Injection token that can be used to provide the default options the tabs module.
 * @type {?}
 */
export var MC_TABS_CONFIG = new InjectionToken('MC_TABS_CONFIG');
// Boilerplate for applying mixins to McTabGroup.
/**
 * \@docs-private
 */
var 
// Boilerplate for applying mixins to McTabGroup.
/**
 * \@docs-private
 */
McTabGroupBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McTabGroupBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McTabGroupBase;
}());
// Boilerplate for applying mixins to McTabGroup.
/**
 * \@docs-private
 */
export { McTabGroupBase };
if (false) {
    /** @type {?} */
    McTabGroupBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export var McTabGroupMixinBase = mixinColor(mixinDisabled(McTabGroupBase));
/**
 * Tab-group component.  Supports basic tab pairs (label + content) and includes
 * keyboard navigation.
 */
var McTabGroup = /** @class */ (function (_super) {
    __extends(McTabGroup, _super);
    function McTabGroup(elementRef, changeDetectorRef, lightTabs, defaultConfig) {
        var _this = _super.call(this, elementRef) || this;
        _this.changeDetectorRef = changeDetectorRef;
        /**
         * Position of the tab header.
         */
        _this.headerPosition = 'above';
        /**
         * Output to enable support for two-way binding on `[(selectedIndex)]`
         */
        _this.selectedIndexChange = new EventEmitter();
        /**
         * Event emitted when focus has changed within a tab group.
         */
        _this.focusChange = new EventEmitter();
        /**
         * Event emitted when the body animation has completed
         */
        _this.animationDone = new EventEmitter();
        /**
         * Event emitted when the tab selection has changed.
         */
        _this.selectedTabChange = new EventEmitter(true);
        /**
         * The tab index that should be selected after the content has been checked.
         */
        _this.indexToSelect = 0;
        /**
         * Snapshot of the height of the tab body wrapper before another tab is activated.
         */
        _this.tabBodyWrapperHeight = 0;
        /**
         * Subscription to tabs being added/removed.
         */
        _this.tabsSubscription = Subscription.EMPTY;
        /**
         * Subscription to changes in the tab labels.
         */
        _this.tabLabelSubscription = Subscription.EMPTY;
        _this._dynamicHeight = false;
        _this._selectedIndex = null;
        _this.lightTab = coerceBooleanProperty(lightTabs);
        _this.groupId = nextId++;
        _this.animationDuration = defaultConfig && defaultConfig.animationDuration ?
            defaultConfig.animationDuration : '0ms';
        return _this;
    }
    Object.defineProperty(McTabGroup.prototype, "dynamicHeight", {
        /** Whether the tab group should grow to the size of the active tab. */
        get: /**
         * Whether the tab group should grow to the size of the active tab.
         * @return {?}
         */
        function () { return this._dynamicHeight; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._dynamicHeight = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTabGroup.prototype, "selectedIndex", {
        /** The index of the active tab. */
        get: /**
         * The index of the active tab.
         * @return {?}
         */
        function () { return this._selectedIndex; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.indexToSelect = coerceNumberProperty(value, null);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * After the content is checked, this component knows what tabs have been defined
     * and what the selected index should be. This is where we can know exactly what position
     * each tab should be in according to the new selected index, and additionally we know how
     * a new selected tab should transition in (from the left or right).
     */
    /**
     * After the content is checked, this component knows what tabs have been defined
     * and what the selected index should be. This is where we can know exactly what position
     * each tab should be in according to the new selected index, and additionally we know how
     * a new selected tab should transition in (from the left or right).
     * @return {?}
     */
    McTabGroup.prototype.ngAfterContentChecked = /**
     * After the content is checked, this component knows what tabs have been defined
     * and what the selected index should be. This is where we can know exactly what position
     * each tab should be in according to the new selected index, and additionally we know how
     * a new selected tab should transition in (from the left or right).
     * @return {?}
     */
    function () {
        var _this = this;
        // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
        // the amount of tabs changes before the actual change detection runs.
        /** @type {?} */
        var indexToSelect = this.indexToSelect = this.clampTabIndex(this.indexToSelect);
        // If there is a change in selected index, emit a change event. Should not trigger if
        // the selected index has not yet been initialized.
        if (this._selectedIndex !== indexToSelect) {
            /** @type {?} */
            var isFirstRun_1 = this._selectedIndex == null;
            if (!isFirstRun_1) {
                this.selectedTabChange.emit(this.createChangeEvent(indexToSelect));
            }
            // Changing these values after change detection has run
            // since the checked content may contain references to them.
            Promise.resolve().then((/**
             * @return {?}
             */
            function () {
                _this.tabs.forEach((/**
                 * @param {?} tab
                 * @param {?} index
                 * @return {?}
                 */
                function (tab, index) { return tab.isActive = index === indexToSelect; }));
                if (!isFirstRun_1) {
                    _this.selectedIndexChange.emit(indexToSelect);
                }
            }));
        }
        // Setup the position for each tab and optionally setup an origin on the next selected tab.
        this.tabs.forEach((/**
         * @param {?} tab
         * @param {?} index
         * @return {?}
         */
        function (tab, index) {
            tab.position = index - indexToSelect;
            // If there is already a selected tab, then set up an origin for the next selected tab
            // if it doesn't have one already.
            if (_this._selectedIndex != null && tab.position === 0 && !tab.origin) {
                tab.origin = indexToSelect - _this._selectedIndex;
            }
        }));
        if (this._selectedIndex !== indexToSelect) {
            this._selectedIndex = indexToSelect;
            this.changeDetectorRef.markForCheck();
        }
    };
    /**
     * @return {?}
     */
    McTabGroup.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscribeToTabLabels();
        // Subscribe to changes in the amount of tabs, in order to be
        // able to re-render the content as new tabs are added or removed.
        this.tabsSubscription = this.tabs.changes.subscribe((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var indexToSelect = _this.clampTabIndex(_this.indexToSelect);
            // Maintain the previously-selected tab if a new tab is added or removed and there is no
            // explicit change that selects a different tab.
            if (indexToSelect === _this._selectedIndex) {
                /** @type {?} */
                var tabs = _this.tabs.toArray();
                for (var i = 0; i < tabs.length; i++) {
                    if (tabs[i].isActive) {
                        // Assign both to the `_indexToSelect` and `_selectedIndex` so we don't fire a changed
                        // event, otherwise the consumer may end up in an infinite loop in some edge cases like
                        // adding a tab within the `selectedIndexChange` event.
                        _this.indexToSelect = _this._selectedIndex = i;
                        break;
                    }
                }
            }
            _this.subscribeToTabLabels();
            _this.changeDetectorRef.markForCheck();
        }));
    };
    /**
     * @return {?}
     */
    McTabGroup.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.tabsSubscription.unsubscribe();
        this.tabLabelSubscription.unsubscribe();
    };
    /**
     * @param {?} index
     * @return {?}
     */
    McTabGroup.prototype.focusChanged = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.focusChange.emit(this.createChangeEvent(index));
    };
    /** Returns a unique id for each tab label element */
    /**
     * Returns a unique id for each tab label element
     * @param {?} i
     * @return {?}
     */
    McTabGroup.prototype.getTabLabelId = /**
     * Returns a unique id for each tab label element
     * @param {?} i
     * @return {?}
     */
    function (i) {
        return "mc-tab-label-" + this.groupId + "-" + i;
    };
    /** Returns a unique id for each tab content element */
    /**
     * Returns a unique id for each tab content element
     * @param {?} i
     * @return {?}
     */
    McTabGroup.prototype.getTabContentId = /**
     * Returns a unique id for each tab content element
     * @param {?} i
     * @return {?}
     */
    function (i) {
        return "mc-tab-content-" + this.groupId + "-" + i;
    };
    /**
     * Sets the height of the body wrapper to the height of the activating tab if dynamic
     * height property is true.
     */
    /**
     * Sets the height of the body wrapper to the height of the activating tab if dynamic
     * height property is true.
     * @param {?} tabHeight
     * @return {?}
     */
    McTabGroup.prototype.setTabBodyWrapperHeight = /**
     * Sets the height of the body wrapper to the height of the activating tab if dynamic
     * height property is true.
     * @param {?} tabHeight
     * @return {?}
     */
    function (tabHeight) {
        if (!this._dynamicHeight || !this.tabBodyWrapperHeight) {
            return;
        }
        /** @type {?} */
        var wrapper = this.tabBodyWrapper.nativeElement;
        wrapper.style.height = this.tabBodyWrapperHeight + "px";
        // This conditional forces the browser to paint the height so that
        // the animation to the new height can have an origin.
        if (this.tabBodyWrapper.nativeElement.offsetHeight) {
            wrapper.style.height = tabHeight + "px";
        }
    };
    /** Removes the height of the tab body wrapper. */
    /**
     * Removes the height of the tab body wrapper.
     * @return {?}
     */
    McTabGroup.prototype.removeTabBodyWrapperHeight = /**
     * Removes the height of the tab body wrapper.
     * @return {?}
     */
    function () {
        this.tabBodyWrapperHeight = this.tabBodyWrapper.nativeElement.clientHeight;
        this.tabBodyWrapper.nativeElement.style.height = '';
        this.animationDone.emit();
    };
    /** Handle click events, setting new selected index if appropriate. */
    /**
     * Handle click events, setting new selected index if appropriate.
     * @param {?} tab
     * @param {?} tabHeader
     * @param {?} index
     * @return {?}
     */
    McTabGroup.prototype.handleClick = /**
     * Handle click events, setting new selected index if appropriate.
     * @param {?} tab
     * @param {?} tabHeader
     * @param {?} index
     * @return {?}
     */
    function (tab, tabHeader, index) {
        if (!tab.disabled) {
            this.selectedIndex = tabHeader.focusIndex = index;
        }
    };
    /** Retrieves the tabindex for the tab. */
    /**
     * Retrieves the tabindex for the tab.
     * @param {?} tab
     * @param {?} index
     * @return {?}
     */
    McTabGroup.prototype.getTabIndex = /**
     * Retrieves the tabindex for the tab.
     * @param {?} tab
     * @param {?} index
     * @return {?}
     */
    function (tab, index) {
        if (tab.disabled) {
            return null;
        }
        return this.selectedIndex === index ? 0 : -1;
    };
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    McTabGroup.prototype.createChangeEvent = /**
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var event = new McTabChangeEvent();
        event.index = index;
        if (this.tabs && this.tabs.length) {
            event.tab = this.tabs.toArray()[index];
        }
        return event;
    };
    /**
     * Subscribes to changes in the tab labels. This is needed, because the @Input for the label is
     * on the McTab component, whereas the data binding is inside the McTabGroup. In order for the
     * binding to be updated, we need to subscribe to changes in it and trigger change detection
     * manually.
     */
    /**
     * Subscribes to changes in the tab labels. This is needed, because the \@Input for the label is
     * on the McTab component, whereas the data binding is inside the McTabGroup. In order for the
     * binding to be updated, we need to subscribe to changes in it and trigger change detection
     * manually.
     * @private
     * @return {?}
     */
    McTabGroup.prototype.subscribeToTabLabels = /**
     * Subscribes to changes in the tab labels. This is needed, because the \@Input for the label is
     * on the McTab component, whereas the data binding is inside the McTabGroup. In order for the
     * binding to be updated, we need to subscribe to changes in it and trigger change detection
     * manually.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.tabLabelSubscription) {
            this.tabLabelSubscription.unsubscribe();
        }
        this.tabLabelSubscription = merge.apply(void 0, __spread(this.tabs.map((/**
         * @param {?} tab
         * @return {?}
         */
        function (tab) { return tab.stateChanges; })))).subscribe((/**
         * @return {?}
         */
        function () { return _this.changeDetectorRef.markForCheck(); }));
    };
    /** Clamps the given index to the bounds of 0 and the tabs length. */
    /**
     * Clamps the given index to the bounds of 0 and the tabs length.
     * @private
     * @param {?} index
     * @return {?}
     */
    McTabGroup.prototype.clampTabIndex = /**
     * Clamps the given index to the bounds of 0 and the tabs length.
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        // Note the `|| 0`, which ensures that values like NaN can't get through
        // and which would otherwise throw the component into an infinite loop
        // (since Mch.max(NaN, 0) === NaN).
        return Math.min(this.tabs.length - 1, Math.max(index || 0, 0));
    };
    McTabGroup.decorators = [
        { type: Component, args: [{
                    selector: 'mc-tab-group',
                    exportAs: 'mcTabGroup',
                    template: "<mc-tab-header #tabHeader\n               [selectedIndex]=\"selectedIndex\"\n               (indexFocused)=\"focusChanged($event)\"\n               (selectFocusedIndex)=\"selectedIndex = $event\">\n    <div role=\"tab\"\n         mcTabLabelWrapper\n         cdkMonitorElementFocus\n         [class.mc-tab-label]=\"!lightTab\"\n         [class.mc-tab-light-label]=\"lightTab\"\n         *ngFor=\"let tab of tabs; let i = index\"\n         [id]=\"getTabLabelId(i)\"\n         [attr.tabIndex]=\"getTabIndex(tab, i)\"\n         [attr.aria-posinset]=\"i + 1\"\n         [attr.aria-setsize]=\"tabs.length\"\n         [attr.aria-controls]=\"getTabContentId(i)\"\n         [attr.aria-selected]=\"selectedIndex == i\"\n         [attr.aria-label]=\"tab.ariaLabel || null\"\n         [attr.aria-labelledby]=\"(!tab.ariaLabel && tab.ariaLabelledby) ? tab.ariaLabelledby : null\"\n         [class.mc-active]=\"selectedIndex == i\"\n         [disabled]=\"tab.disabled\"\n         (click)=\"handleClick(tab, tabHeader, i)\">\n\n        <div class=\"mc-tab-label__content\">\n            <!-- If there is a label template, use it. -->\n            <ng-template [ngIf]=\"tab.templateLabel\">\n                <ng-template [cdkPortalOutlet]=\"tab.templateLabel\"></ng-template>\n            </ng-template>\n\n            <!-- If there is not a label template, fall back to the text label. -->\n            <ng-template [ngIf]=\"!tab.templateLabel\">{{tab.textLabel}}</ng-template>\n        </div>\n\n        <div class=\"mc-tab-overlay\"></div>\n    </div>\n</mc-tab-header>\n\n<div class=\"mc-tab-body__wrapper\"\n     #tabBodyWrapper>\n    <mc-tab-body role=\"tabpanel\"\n                 *ngFor=\"let tab of tabs; let i = index\"\n                 [id]=\"getTabContentId(i)\"\n                 [attr.aria-labelledby]=\"getTabLabelId(i)\"\n                 [class.mc-tab-body__active]=\"selectedIndex == i\"\n                 [content]=\"tab.content\"\n                 [position]=\"tab.position\"\n                 [origin]=\"tab.origin\"\n                 [animationDuration]=\"animationDuration\"\n                 (onCentered)=\"removeTabBodyWrapperHeight()\"\n                 (onCentering)=\"setTabBodyWrapperHeight($event)\">\n    </mc-tab-body>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    inputs: ['color'],
                    host: {
                        class: 'mc-tab-group',
                        '[class.mc-tab-group_dynamic-height]': 'dynamicHeight',
                        '[class.mc-tab-group_inverted-header]': 'headerPosition === "below"'
                    },
                    styles: [".mc-tab-label.cdk-keyboard-focused:after,.mc-tab-light-label.cdk-keyboard-focused:after,.mc-tab-light-label.mc-active:before,.mc-tab-light-label:hover:before{display:block;position:absolute;content:\"\"}.mc-tab-light-label.mc-active:before,.mc-tab-light-label:hover:before{bottom:-1px;left:0;height:4px;right:0}.mc-tab-group{display:flex;flex-direction:column;box-sizing:border-box;text-align:center;white-space:nowrap}.mc-tab-group.mc-tab-group_inverted-header{flex-direction:column-reverse}.mc-tab-label{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:40px;text-align:center;white-space:nowrap;cursor:pointer;padding-right:16px;padding-left:16px;outline:0;border-bottom-width:1px;border-bottom-style:solid;border-top-width:1px;border-top-style:solid;border-top-left-radius:3px;border-top-right-radius:3px}.mc-tab-label.cdk-keyboard-focused{z-index:1}.mc-tab-label.cdk-keyboard-focused:after{top:-2px;right:-1px;bottom:-1px;left:-1px;border-width:2px;border-style:solid;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom:none}.mc-tab-label.mc-disabled{pointer-events:none}.mc-tab-label.mc-active{padding-right:15px;padding-left:15px;border-width:1px;border-style:solid}.mc-tab-label.mc-active.cdk-keyboard-focused:after{z-index:1;right:-2px;left:-2px}.mc-tab-label .mc-tab-overlay{position:absolute;top:-1px;left:0;right:0;bottom:0;pointer-events:none;border-top-left-radius:3px;border-top-right-radius:3px;border-top:1px solid transparent}.mc-tab-light-label{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:40px;text-align:center;white-space:nowrap;cursor:pointer;padding-right:16px;padding-left:16px;outline:0;border-bottom-width:1px;border-bottom-style:solid}.mc-tab-light-label.cdk-keyboard-focused{z-index:1}.mc-tab-light-label.cdk-keyboard-focused:after{right:-1px;bottom:-1px;left:-1px;border-width:2px;border-style:solid;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom:none;top:-1px}.mc-tab-light-label.mc-disabled{pointer-events:none}.mc-tab-light-label .mc-tab-overlay{left:0;right:0;bottom:0;pointer-events:none;position:absolute;top:0}.mc-tab-light-label.cdk-keyboard-focused+:hover:before{left:1px}.mc-tab-header__content{padding:1px 1px 0}.mc-tab-body__wrapper{display:flex;overflow:hidden;position:relative}.mc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;flex-basis:100%}.mc-tab-body.mc-tab-body__active{overflow-x:hidden;overflow-y:auto;position:relative;z-index:1;flex-grow:1}.mc-tab-group.mc-tab-group_dynamic-height .mc-tab-body.mc-tab-body__active{overflow-y:hidden}"]
                }] }
    ];
    /** @nocollapse */
    McTabGroup.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: String, decorators: [{ type: Attribute, args: ['mc-light-tabs',] }] },
        { type: undefined, decorators: [{ type: Inject, args: [MC_TABS_CONFIG,] }, { type: Optional }] }
    ]; };
    McTabGroup.propDecorators = {
        dynamicHeight: [{ type: Input }],
        selectedIndex: [{ type: Input }],
        tabs: [{ type: ContentChildren, args: [McTab,] }],
        tabBodyWrapper: [{ type: ViewChild, args: ['tabBodyWrapper', { static: false },] }],
        tabHeader: [{ type: ViewChild, args: ['tabHeader', { static: false },] }],
        headerPosition: [{ type: Input }],
        animationDuration: [{ type: Input }],
        selectedIndexChange: [{ type: Output }],
        focusChange: [{ type: Output }],
        animationDone: [{ type: Output }],
        selectedTabChange: [{ type: Output }]
    };
    return McTabGroup;
}(McTabGroupMixinBase));
export { McTabGroup };
if (false) {
    /** @type {?} */
    McTabGroup.prototype.lightTab;
    /** @type {?} */
    McTabGroup.prototype.tabs;
    /** @type {?} */
    McTabGroup.prototype.tabBodyWrapper;
    /** @type {?} */
    McTabGroup.prototype.tabHeader;
    /**
     * Position of the tab header.
     * @type {?}
     */
    McTabGroup.prototype.headerPosition;
    /**
     * Duration for the tab animation. Must be a valid CSS value (e.g. 600ms).
     * @type {?}
     */
    McTabGroup.prototype.animationDuration;
    /**
     * Output to enable support for two-way binding on `[(selectedIndex)]`
     * @type {?}
     */
    McTabGroup.prototype.selectedIndexChange;
    /**
     * Event emitted when focus has changed within a tab group.
     * @type {?}
     */
    McTabGroup.prototype.focusChange;
    /**
     * Event emitted when the body animation has completed
     * @type {?}
     */
    McTabGroup.prototype.animationDone;
    /**
     * Event emitted when the tab selection has changed.
     * @type {?}
     */
    McTabGroup.prototype.selectedTabChange;
    /**
     * The tab index that should be selected after the content has been checked.
     * @type {?}
     * @private
     */
    McTabGroup.prototype.indexToSelect;
    /**
     * Snapshot of the height of the tab body wrapper before another tab is activated.
     * @type {?}
     * @private
     */
    McTabGroup.prototype.tabBodyWrapperHeight;
    /**
     * Subscription to tabs being added/removed.
     * @type {?}
     * @private
     */
    McTabGroup.prototype.tabsSubscription;
    /**
     * Subscription to changes in the tab labels.
     * @type {?}
     * @private
     */
    McTabGroup.prototype.tabLabelSubscription;
    /**
     * @type {?}
     * @private
     */
    McTabGroup.prototype._dynamicHeight;
    /**
     * @type {?}
     * @private
     */
    McTabGroup.prototype._selectedIndex;
    /**
     * @type {?}
     * @private
     */
    McTabGroup.prototype.groupId;
    /**
     * @type {?}
     * @private
     */
    McTabGroup.prototype.changeDetectorRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWdyb3VwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RhYnMvIiwic291cmNlcyI6WyJ0YWItZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEYsT0FBTyxFQUdILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsY0FBYyxFQUNkLE1BQU0sRUFDTixRQUFRLEVBQ1IsU0FBUyxFQUFFLFNBQVMsRUFDdkIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUdILFVBQVUsRUFDVixhQUFhLEVBQ2hCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUM5QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRzNDO0lBQUE7SUFJb0MsQ0FBQzs7Z0JBSnBDLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsOERBQThEO29CQUN4RSxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUU7aUJBQ3hDOztJQUNtQywyQkFBQztDQUFBLEFBSnJDLElBSXFDO1NBQXhCLG9CQUFvQjtBQUVqQztJQUFBO0lBSTBDLENBQUM7O2dCQUoxQyxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLDRFQUE0RTtvQkFDdEYsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLGtDQUFrQyxFQUFFO2lCQUN0RDs7SUFDeUMsaUNBQUM7Q0FBQSxBQUozQyxJQUkyQztTQUE5QiwwQkFBMEI7QUFFdkM7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Q0FzS1osU0FBUyxTQUFDLGVBQWU7Z0RBQ3pCLE1BQU0sU0FBQyxjQUFjLGNBQUcsUUFBUTs7O2dDQXpEcEMsS0FBSztnQ0FLTCxLQUFLO3VCQU1MLGVBQWUsU0FBQyxLQUFLO2lDQUVyQixTQUFTLFNBQUMsZ0JBQWdCLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDOzRCQUUzQyxTQUFTLFNBQUMsV0FBVyxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQztpQ0FHdEMsS0FBSztvQ0FHTCxLQUFLO3NDQUdMLE1BQU07OEJBR04sTUFBTTtnQ0FJTixNQUFNO29DQUdOLE1BQU07O0lBMk1YLGlCQUFDO0NBQUEsQUFoUUQsQ0FjZ0MsbUJBQW1CLEdBa1BsRDtTQWxQWSxVQUFVOzs7SUFFbkIsOEJBQWtCOztJQWNsQiwwQkFBK0M7O0lBRS9DLG9DQUF5RTs7SUFFekUsK0JBQWdFOzs7OztJQUdoRSxvQ0FBdUQ7Ozs7O0lBR3ZELHVDQUFtQzs7Ozs7SUFHbkMseUNBQTBGOzs7OztJQUcxRixpQ0FDeUM7Ozs7O0lBR3pDLG1DQUFnRjs7Ozs7SUFHaEYsdUNBQzZDOzs7Ozs7SUFHN0MsbUNBQXlDOzs7Ozs7SUFHekMsMENBQXlDOzs7Ozs7SUFHekMsc0NBQThDOzs7Ozs7SUFHOUMsMENBQWtEOzs7OztJQUNsRCxvQ0FBd0M7Ozs7O0lBQ3hDLG9DQUE2Qzs7Ozs7SUFFN0MsNkJBQXdCOzs7OztJQUlwQix1Q0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHksIGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIEluamVjdCxcbiAgICBPcHRpb25hbCxcbiAgICBEaXJlY3RpdmUsIEF0dHJpYnV0ZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQ2FuQ29sb3IsXG4gICAgQ2FuQ29sb3JDdG9yLFxuICAgIG1peGluQ29sb3IsXG4gICAgbWl4aW5EaXNhYmxlZFxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBtZXJnZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE1jVGFiIH0gZnJvbSAnLi90YWInO1xuaW1wb3J0IHsgTWNUYWJIZWFkZXIgfSBmcm9tICcuL3RhYi1oZWFkZXInO1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFiLWdyb3VwW21jLWxpZ2h0LXRhYnNdLCBbbWMtdGFiLW5hdi1iYXJdW21jLWxpZ2h0LXRhYnNdJyxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtdGFiLWdyb3VwX2xpZ2h0JyB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTGlnaHRUYWJzQ3NzU3R5bGVyIHsgfVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLXRhYi1ncm91cFttYy1hbGlnbi10YWJzLWNlbnRlcl0sIFttYy10YWItbmF2LWJhcl1bbWMtYWxpZ24tdGFicy1jZW50ZXJdJyxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtdGFiLWdyb3VwX2FsaWduLWxhYmVscy1jZW50ZXInIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNBbGlnblRhYnNDZW50ZXJDc3NTdHlsZXIgeyB9XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFiLWdyb3VwW21jLWFsaWduLXRhYnMtZW5kXSwgW21jLXRhYi1uYXYtYmFyXVttYy1hbGlnbi10YWJzLWVuZF0nLFxuICAgIGhvc3Q6IHsgY2xhc3M6ICdtYy10YWItZ3JvdXBfYWxpZ24tbGFiZWxzLWVuZCcgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0FsaWduVGFic0VuZENzc1N0eWxlciB7IH1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy10YWItZ3JvdXBbbWMtc3RyZXRjaC10YWJzXSwgW21jLXRhYi1uYXYtYmFyXVttYy1zdHJldGNoLXRhYnNdJyxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtdGFiLWdyb3VwX3N0cmV0Y2gtbGFiZWxzJyB9XG59KVxuZXhwb3J0IGNsYXNzIE1jU3RyZXRjaFRhYnNDc3NTdHlsZXIgeyB9XG5cbi8qKiBVc2VkIHRvIGdlbmVyYXRlIHVuaXF1ZSBJRCdzIGZvciBlYWNoIHRhYiBjb21wb25lbnQgKi9cbmxldCBuZXh0SWQgPSAwO1xuXG4vKiogQSBzaW1wbGUgY2hhbmdlIGV2ZW50IGVtaXR0ZWQgb24gZm9jdXMgb3Igc2VsZWN0aW9uIGNoYW5nZXMuICovXG5leHBvcnQgY2xhc3MgTWNUYWJDaGFuZ2VFdmVudCB7XG4gICAgLyoqIEluZGV4IG9mIHRoZSBjdXJyZW50bHktc2VsZWN0ZWQgdGFiLiAqL1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgY3VycmVudGx5LXNlbGVjdGVkIHRhYi4gKi9cbiAgICB0YWI6IE1jVGFiO1xufVxuXG4vKiogUG9zc2libGUgcG9zaXRpb25zIGZvciB0aGUgdGFiIGhlYWRlci4gKi9cbmV4cG9ydCB0eXBlIE1jVGFiSGVhZGVyUG9zaXRpb24gPSAnYWJvdmUnIHwgJ2JlbG93JztcblxuLyoqIE9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIGNvbmZpZ3VyZSB0aGUgZGVmYXVsdCBvcHRpb25zIGZvciB0aGUgdGFicyBtb2R1bGUuICovXG5leHBvcnQgaW50ZXJmYWNlIElNY1RhYnNDb25maWcge1xuICAgIC8qKiBEdXJhdGlvbiBmb3IgdGhlIHRhYiBhbmltYXRpb24uIE11c3QgYmUgYSB2YWxpZCBDU1MgdmFsdWUgKGUuZy4gNjAwbXMpLiAqL1xuICAgIGFuaW1hdGlvbkR1cmF0aW9uPzogc3RyaW5nO1xufVxuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSB0aGUgZGVmYXVsdCBvcHRpb25zIHRoZSB0YWJzIG1vZHVsZS4gKi9cbmV4cG9ydCBjb25zdCBNQ19UQUJTX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdNQ19UQUJTX0NPTkZJRycpO1xuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1jVGFiR3JvdXAuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNsYXNzIE1jVGFiR3JvdXBCYXNlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHsgfVxufVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNUYWJHcm91cE1peGluQmFzZTpcbiAgICBDYW5Db2xvckN0b3IgJlxuICAgIHR5cGVvZiBNY1RhYkdyb3VwQmFzZSA9XG4gICAgbWl4aW5Db2xvcihtaXhpbkRpc2FibGVkKE1jVGFiR3JvdXBCYXNlKSk7XG5cbi8qKlxuICogVGFiLWdyb3VwIGNvbXBvbmVudC4gIFN1cHBvcnRzIGJhc2ljIHRhYiBwYWlycyAobGFiZWwgKyBjb250ZW50KSBhbmQgaW5jbHVkZXNcbiAqIGtleWJvYXJkIG5hdmlnYXRpb24uXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFiLWdyb3VwJyxcbiAgICBleHBvcnRBczogJ21jVGFiR3JvdXAnLFxuICAgIHRlbXBsYXRlVXJsOiAndGFiLWdyb3VwLmh0bWwnLFxuICAgIHN0eWxlVXJsczogWyd0YWItZ3JvdXAuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgaW5wdXRzOiBbJ2NvbG9yJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRhYi1ncm91cCcsXG4gICAgICAgICdbY2xhc3MubWMtdGFiLWdyb3VwX2R5bmFtaWMtaGVpZ2h0XSc6ICdkeW5hbWljSGVpZ2h0JyxcbiAgICAgICAgJ1tjbGFzcy5tYy10YWItZ3JvdXBfaW52ZXJ0ZWQtaGVhZGVyXSc6ICdoZWFkZXJQb3NpdGlvbiA9PT0gXCJiZWxvd1wiJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUYWJHcm91cCBleHRlbmRzIE1jVGFiR3JvdXBNaXhpbkJhc2UgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyQ29udGVudENoZWNrZWQsIE9uRGVzdHJveSwgQ2FuQ29sb3Ige1xuICAgIGxpZ2h0VGFiOiBib29sZWFuO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRhYiBncm91cCBzaG91bGQgZ3JvdyB0byB0aGUgc2l6ZSBvZiB0aGUgYWN0aXZlIHRhYi4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBkeW5hbWljSGVpZ2h0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZHluYW1pY0hlaWdodDsgfVxuICAgIHNldCBkeW5hbWljSGVpZ2h0KHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX2R5bmFtaWNIZWlnaHQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG5cbiAgICAvKiogVGhlIGluZGV4IG9mIHRoZSBhY3RpdmUgdGFiLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNlbGVjdGVkSW5kZXgoKTogbnVtYmVyIHwgbnVsbCB7IHJldHVybiB0aGlzLl9zZWxlY3RlZEluZGV4OyB9XG4gICAgc2V0IHNlbGVjdGVkSW5kZXgodmFsdWU6IG51bWJlciB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5pbmRleFRvU2VsZWN0ID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUsIG51bGwpO1xuICAgIH1cblxuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNUYWIpIHRhYnM6IFF1ZXJ5TGlzdDxNY1RhYj47XG5cbiAgICBAVmlld0NoaWxkKCd0YWJCb2R5V3JhcHBlcicsIHtzdGF0aWM6IGZhbHNlfSkgdGFiQm9keVdyYXBwZXI6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCd0YWJIZWFkZXInLCB7c3RhdGljOiBmYWxzZX0pIHRhYkhlYWRlcjogTWNUYWJIZWFkZXI7XG5cbiAgICAvKiogUG9zaXRpb24gb2YgdGhlIHRhYiBoZWFkZXIuICovXG4gICAgQElucHV0KCkgaGVhZGVyUG9zaXRpb246IE1jVGFiSGVhZGVyUG9zaXRpb24gPSAnYWJvdmUnO1xuXG4gICAgLyoqIER1cmF0aW9uIGZvciB0aGUgdGFiIGFuaW1hdGlvbi4gTXVzdCBiZSBhIHZhbGlkIENTUyB2YWx1ZSAoZS5nLiA2MDBtcykuICovXG4gICAgQElucHV0KCkgYW5pbWF0aW9uRHVyYXRpb246IHN0cmluZztcblxuICAgIC8qKiBPdXRwdXQgdG8gZW5hYmxlIHN1cHBvcnQgZm9yIHR3by13YXkgYmluZGluZyBvbiBgWyhzZWxlY3RlZEluZGV4KV1gICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGVkSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIGZvY3VzIGhhcyBjaGFuZ2VkIHdpdGhpbiBhIHRhYiBncm91cC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgZm9jdXNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxNY1RhYkNoYW5nZUV2ZW50PiA9XG4gICAgICAgIG5ldyBFdmVudEVtaXR0ZXI8TWNUYWJDaGFuZ2VFdmVudD4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGJvZHkgYW5pbWF0aW9uIGhhcyBjb21wbGV0ZWQgKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgYW5pbWF0aW9uRG9uZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgdGFiIHNlbGVjdGlvbiBoYXMgY2hhbmdlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0ZWRUYWJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxNY1RhYkNoYW5nZUV2ZW50PiA9XG4gICAgICAgIG5ldyBFdmVudEVtaXR0ZXI8TWNUYWJDaGFuZ2VFdmVudD4odHJ1ZSk7XG5cbiAgICAvKiogVGhlIHRhYiBpbmRleCB0aGF0IHNob3VsZCBiZSBzZWxlY3RlZCBhZnRlciB0aGUgY29udGVudCBoYXMgYmVlbiBjaGVja2VkLiAqL1xuICAgIHByaXZhdGUgaW5kZXhUb1NlbGVjdDogbnVtYmVyIHwgbnVsbCA9IDA7XG5cbiAgICAvKiogU25hcHNob3Qgb2YgdGhlIGhlaWdodCBvZiB0aGUgdGFiIGJvZHkgd3JhcHBlciBiZWZvcmUgYW5vdGhlciB0YWIgaXMgYWN0aXZhdGVkLiAqL1xuICAgIHByaXZhdGUgdGFiQm9keVdyYXBwZXJIZWlnaHQ6IG51bWJlciA9IDA7XG5cbiAgICAvKiogU3Vic2NyaXB0aW9uIHRvIHRhYnMgYmVpbmcgYWRkZWQvcmVtb3ZlZC4gKi9cbiAgICBwcml2YXRlIHRhYnNTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICAvKiogU3Vic2NyaXB0aW9uIHRvIGNoYW5nZXMgaW4gdGhlIHRhYiBsYWJlbHMuICovXG4gICAgcHJpdmF0ZSB0YWJMYWJlbFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICBwcml2YXRlIF9keW5hbWljSGVpZ2h0OiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRJbmRleDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICBwcml2YXRlIGdyb3VwSWQ6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgQEF0dHJpYnV0ZSgnbWMtbGlnaHQtdGFicycpIGxpZ2h0VGFiczogc3RyaW5nLFxuICAgICAgICBASW5qZWN0KE1DX1RBQlNfQ09ORklHKSBAT3B0aW9uYWwoKSBkZWZhdWx0Q29uZmlnPzogSU1jVGFic0NvbmZpZ1xuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgICAgICB0aGlzLmxpZ2h0VGFiID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGxpZ2h0VGFicyk7XG5cbiAgICAgICAgdGhpcy5ncm91cElkID0gbmV4dElkKys7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uRHVyYXRpb24gPSBkZWZhdWx0Q29uZmlnICYmIGRlZmF1bHRDb25maWcuYW5pbWF0aW9uRHVyYXRpb24gP1xuICAgICAgICAgICAgZGVmYXVsdENvbmZpZy5hbmltYXRpb25EdXJhdGlvbiA6ICcwbXMnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFmdGVyIHRoZSBjb250ZW50IGlzIGNoZWNrZWQsIHRoaXMgY29tcG9uZW50IGtub3dzIHdoYXQgdGFicyBoYXZlIGJlZW4gZGVmaW5lZFxuICAgICAqIGFuZCB3aGF0IHRoZSBzZWxlY3RlZCBpbmRleCBzaG91bGQgYmUuIFRoaXMgaXMgd2hlcmUgd2UgY2FuIGtub3cgZXhhY3RseSB3aGF0IHBvc2l0aW9uXG4gICAgICogZWFjaCB0YWIgc2hvdWxkIGJlIGluIGFjY29yZGluZyB0byB0aGUgbmV3IHNlbGVjdGVkIGluZGV4LCBhbmQgYWRkaXRpb25hbGx5IHdlIGtub3cgaG93XG4gICAgICogYSBuZXcgc2VsZWN0ZWQgdGFiIHNob3VsZCB0cmFuc2l0aW9uIGluIChmcm9tIHRoZSBsZWZ0IG9yIHJpZ2h0KS5cbiAgICAgKi9cbiAgICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgICAgIC8vIERvbid0IGNsYW1wIHRoZSBgaW5kZXhUb1NlbGVjdGAgaW1tZWRpYXRlbHkgaW4gdGhlIHNldHRlciBiZWNhdXNlIGl0IGNhbiBoYXBwZW4gdGhhdFxuICAgICAgICAvLyB0aGUgYW1vdW50IG9mIHRhYnMgY2hhbmdlcyBiZWZvcmUgdGhlIGFjdHVhbCBjaGFuZ2UgZGV0ZWN0aW9uIHJ1bnMuXG4gICAgICAgIGNvbnN0IGluZGV4VG9TZWxlY3QgPSB0aGlzLmluZGV4VG9TZWxlY3QgPSB0aGlzLmNsYW1wVGFiSW5kZXgodGhpcy5pbmRleFRvU2VsZWN0KTtcblxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIGNoYW5nZSBpbiBzZWxlY3RlZCBpbmRleCwgZW1pdCBhIGNoYW5nZSBldmVudC4gU2hvdWxkIG5vdCB0cmlnZ2VyIGlmXG4gICAgICAgIC8vIHRoZSBzZWxlY3RlZCBpbmRleCBoYXMgbm90IHlldCBiZWVuIGluaXRpYWxpemVkLlxuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWRJbmRleCAhPT0gaW5kZXhUb1NlbGVjdCkge1xuICAgICAgICAgICAgY29uc3QgaXNGaXJzdFJ1biA9IHRoaXMuX3NlbGVjdGVkSW5kZXggPT0gbnVsbDtcblxuICAgICAgICAgICAgaWYgKCFpc0ZpcnN0UnVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRhYkNoYW5nZS5lbWl0KHRoaXMuY3JlYXRlQ2hhbmdlRXZlbnQoaW5kZXhUb1NlbGVjdCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDaGFuZ2luZyB0aGVzZSB2YWx1ZXMgYWZ0ZXIgY2hhbmdlIGRldGVjdGlvbiBoYXMgcnVuXG4gICAgICAgICAgICAvLyBzaW5jZSB0aGUgY2hlY2tlZCBjb250ZW50IG1heSBjb250YWluIHJlZmVyZW5jZXMgdG8gdGhlbS5cbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudGFicy5mb3JFYWNoKCh0YWIsIGluZGV4KSA9PiB0YWIuaXNBY3RpdmUgPSBpbmRleCA9PT0gaW5kZXhUb1NlbGVjdCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWlzRmlyc3RSdW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4Q2hhbmdlLmVtaXQoaW5kZXhUb1NlbGVjdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXR1cCB0aGUgcG9zaXRpb24gZm9yIGVhY2ggdGFiIGFuZCBvcHRpb25hbGx5IHNldHVwIGFuIG9yaWdpbiBvbiB0aGUgbmV4dCBzZWxlY3RlZCB0YWIuXG4gICAgICAgIHRoaXMudGFicy5mb3JFYWNoKCh0YWI6IE1jVGFiLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICB0YWIucG9zaXRpb24gPSBpbmRleCAtIGluZGV4VG9TZWxlY3Q7XG5cbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIGFscmVhZHkgYSBzZWxlY3RlZCB0YWIsIHRoZW4gc2V0IHVwIGFuIG9yaWdpbiBmb3IgdGhlIG5leHQgc2VsZWN0ZWQgdGFiXG4gICAgICAgICAgICAvLyBpZiBpdCBkb2Vzbid0IGhhdmUgb25lIGFscmVhZHkuXG4gICAgICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWRJbmRleCAhPSBudWxsICYmIHRhYi5wb3NpdGlvbiA9PT0gMCAmJiAhdGFiLm9yaWdpbikge1xuICAgICAgICAgICAgICAgIHRhYi5vcmlnaW4gPSBpbmRleFRvU2VsZWN0IC0gdGhpcy5fc2VsZWN0ZWRJbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSW5kZXggIT09IGluZGV4VG9TZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSBpbmRleFRvU2VsZWN0O1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVUb1RhYkxhYmVscygpO1xuXG4gICAgICAgIC8vIFN1YnNjcmliZSB0byBjaGFuZ2VzIGluIHRoZSBhbW91bnQgb2YgdGFicywgaW4gb3JkZXIgdG8gYmVcbiAgICAgICAgLy8gYWJsZSB0byByZS1yZW5kZXIgdGhlIGNvbnRlbnQgYXMgbmV3IHRhYnMgYXJlIGFkZGVkIG9yIHJlbW92ZWQuXG4gICAgICAgIHRoaXMudGFic1N1YnNjcmlwdGlvbiA9IHRoaXMudGFicy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmRleFRvU2VsZWN0ID0gdGhpcy5jbGFtcFRhYkluZGV4KHRoaXMuaW5kZXhUb1NlbGVjdCk7XG5cbiAgICAgICAgICAgIC8vIE1haW50YWluIHRoZSBwcmV2aW91c2x5LXNlbGVjdGVkIHRhYiBpZiBhIG5ldyB0YWIgaXMgYWRkZWQgb3IgcmVtb3ZlZCBhbmQgdGhlcmUgaXMgbm9cbiAgICAgICAgICAgIC8vIGV4cGxpY2l0IGNoYW5nZSB0aGF0IHNlbGVjdHMgYSBkaWZmZXJlbnQgdGFiLlxuICAgICAgICAgICAgaWYgKGluZGV4VG9TZWxlY3QgPT09IHRoaXMuX3NlbGVjdGVkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YWJzID0gdGhpcy50YWJzLnRvQXJyYXkoKTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFic1tpXS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXNzaWduIGJvdGggdG8gdGhlIGBfaW5kZXhUb1NlbGVjdGAgYW5kIGBfc2VsZWN0ZWRJbmRleGAgc28gd2UgZG9uJ3QgZmlyZSBhIGNoYW5nZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV2ZW50LCBvdGhlcndpc2UgdGhlIGNvbnN1bWVyIG1heSBlbmQgdXAgaW4gYW4gaW5maW5pdGUgbG9vcCBpbiBzb21lIGVkZ2UgY2FzZXMgbGlrZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkaW5nIGEgdGFiIHdpdGhpbiB0aGUgYHNlbGVjdGVkSW5kZXhDaGFuZ2VgIGV2ZW50LlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleFRvU2VsZWN0ID0gdGhpcy5fc2VsZWN0ZWRJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVUb1RhYkxhYmVscygpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudGFic1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnRhYkxhYmVsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgZm9jdXNDaGFuZ2VkKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5mb2N1c0NoYW5nZS5lbWl0KHRoaXMuY3JlYXRlQ2hhbmdlRXZlbnQoaW5kZXgpKTtcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyBhIHVuaXF1ZSBpZCBmb3IgZWFjaCB0YWIgbGFiZWwgZWxlbWVudCAqL1xuICAgIGdldFRhYkxhYmVsSWQoaTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBtYy10YWItbGFiZWwtJHt0aGlzLmdyb3VwSWR9LSR7aX1gO1xuICAgIH1cblxuICAgIC8qKiBSZXR1cm5zIGEgdW5pcXVlIGlkIGZvciBlYWNoIHRhYiBjb250ZW50IGVsZW1lbnQgKi9cbiAgICBnZXRUYWJDb250ZW50SWQoaTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBtYy10YWItY29udGVudC0ke3RoaXMuZ3JvdXBJZH0tJHtpfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgaGVpZ2h0IG9mIHRoZSBib2R5IHdyYXBwZXIgdG8gdGhlIGhlaWdodCBvZiB0aGUgYWN0aXZhdGluZyB0YWIgaWYgZHluYW1pY1xuICAgICAqIGhlaWdodCBwcm9wZXJ0eSBpcyB0cnVlLlxuICAgICAqL1xuICAgIHNldFRhYkJvZHlXcmFwcGVySGVpZ2h0KHRhYkhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fZHluYW1pY0hlaWdodCB8fCAhdGhpcy50YWJCb2R5V3JhcHBlckhlaWdodCkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCB3cmFwcGVyOiBIVE1MRWxlbWVudCA9IHRoaXMudGFiQm9keVdyYXBwZXIubmF0aXZlRWxlbWVudDtcblxuICAgICAgICB3cmFwcGVyLnN0eWxlLmhlaWdodCA9IGAke3RoaXMudGFiQm9keVdyYXBwZXJIZWlnaHR9cHhgO1xuXG4gICAgICAgIC8vIFRoaXMgY29uZGl0aW9uYWwgZm9yY2VzIHRoZSBicm93c2VyIHRvIHBhaW50IHRoZSBoZWlnaHQgc28gdGhhdFxuICAgICAgICAvLyB0aGUgYW5pbWF0aW9uIHRvIHRoZSBuZXcgaGVpZ2h0IGNhbiBoYXZlIGFuIG9yaWdpbi5cbiAgICAgICAgaWYgKHRoaXMudGFiQm9keVdyYXBwZXIubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQpIHtcbiAgICAgICAgICAgIHdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gYCR7dGFiSGVpZ2h0fXB4YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBSZW1vdmVzIHRoZSBoZWlnaHQgb2YgdGhlIHRhYiBib2R5IHdyYXBwZXIuICovXG4gICAgcmVtb3ZlVGFiQm9keVdyYXBwZXJIZWlnaHQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFiQm9keVdyYXBwZXJIZWlnaHQgPSB0aGlzLnRhYkJvZHlXcmFwcGVyLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICB0aGlzLnRhYkJvZHlXcmFwcGVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJyc7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uRG9uZS5lbWl0KCk7XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZSBjbGljayBldmVudHMsIHNldHRpbmcgbmV3IHNlbGVjdGVkIGluZGV4IGlmIGFwcHJvcHJpYXRlLiAqL1xuICAgIGhhbmRsZUNsaWNrKHRhYjogTWNUYWIsIHRhYkhlYWRlcjogTWNUYWJIZWFkZXIsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCF0YWIuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRhYkhlYWRlci5mb2N1c0luZGV4ID0gaW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogUmV0cmlldmVzIHRoZSB0YWJpbmRleCBmb3IgdGhlIHRhYi4gKi9cbiAgICBnZXRUYWJJbmRleCh0YWI6IE1jVGFiLCBpbmRleDogbnVtYmVyKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIGlmICh0YWIuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJbmRleCA9PT0gaW5kZXggPyAwIDogLTE7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVDaGFuZ2VFdmVudChpbmRleDogbnVtYmVyKTogTWNUYWJDaGFuZ2VFdmVudCB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IE1jVGFiQ2hhbmdlRXZlbnQoKTtcbiAgICAgICAgZXZlbnQuaW5kZXggPSBpbmRleDtcbiAgICAgICAgaWYgKHRoaXMudGFicyAmJiB0aGlzLnRhYnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBldmVudC50YWIgPSB0aGlzLnRhYnMudG9BcnJheSgpW2luZGV4XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBldmVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmVzIHRvIGNoYW5nZXMgaW4gdGhlIHRhYiBsYWJlbHMuIFRoaXMgaXMgbmVlZGVkLCBiZWNhdXNlIHRoZSBASW5wdXQgZm9yIHRoZSBsYWJlbCBpc1xuICAgICAqIG9uIHRoZSBNY1RhYiBjb21wb25lbnQsIHdoZXJlYXMgdGhlIGRhdGEgYmluZGluZyBpcyBpbnNpZGUgdGhlIE1jVGFiR3JvdXAuIEluIG9yZGVyIGZvciB0aGVcbiAgICAgKiBiaW5kaW5nIHRvIGJlIHVwZGF0ZWQsIHdlIG5lZWQgdG8gc3Vic2NyaWJlIHRvIGNoYW5nZXMgaW4gaXQgYW5kIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvblxuICAgICAqIG1hbnVhbGx5LlxuICAgICAqL1xuICAgIHByaXZhdGUgc3Vic2NyaWJlVG9UYWJMYWJlbHMoKSB7XG4gICAgICAgIGlmICh0aGlzLnRhYkxhYmVsU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRhYkxhYmVsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRhYkxhYmVsU3Vic2NyaXB0aW9uID0gbWVyZ2UoLi4udGhpcy50YWJzLm1hcCgodGFiKSA9PiB0YWIuc3RhdGVDaGFuZ2VzKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKSk7XG4gICAgfVxuXG4gICAgLyoqIENsYW1wcyB0aGUgZ2l2ZW4gaW5kZXggdG8gdGhlIGJvdW5kcyBvZiAwIGFuZCB0aGUgdGFicyBsZW5ndGguICovXG4gICAgcHJpdmF0ZSBjbGFtcFRhYkluZGV4KGluZGV4OiBudW1iZXIgfCBudWxsKTogbnVtYmVyIHtcbiAgICAgICAgLy8gTm90ZSB0aGUgYHx8IDBgLCB3aGljaCBlbnN1cmVzIHRoYXQgdmFsdWVzIGxpa2UgTmFOIGNhbid0IGdldCB0aHJvdWdoXG4gICAgICAgIC8vIGFuZCB3aGljaCB3b3VsZCBvdGhlcndpc2UgdGhyb3cgdGhlIGNvbXBvbmVudCBpbnRvIGFuIGluZmluaXRlIGxvb3BcbiAgICAgICAgLy8gKHNpbmNlIE1jaC5tYXgoTmFOLCAwKSA9PT0gTmFOKS5cbiAgICAgICAgcmV0dXJuIE1hdGgubWluKHRoaXMudGFicy5sZW5ndGggLSAxLCBNYXRoLm1heChpbmRleCB8fCAwLCAwKSk7XG4gICAgfVxufVxuIl19