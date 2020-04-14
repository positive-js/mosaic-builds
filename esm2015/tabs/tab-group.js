/**
 * @fileoverview added by tsickle
 * Generated from: tab-group.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewEncapsulation, InjectionToken, Inject, Optional, Directive, Attribute } from '@angular/core';
import { mixinColor, mixinDisabled } from '@ptsecurity/mosaic/core';
import { merge, Subscription } from 'rxjs';
import { McTab } from './tab';
import { McTabHeader } from './tab-header';
export class McLightTabsCssStyler {
}
McLightTabsCssStyler.decorators = [
    { type: Directive, args: [{
                selector: 'mc-tab-group[mc-light-tabs], [mc-tab-nav-bar][mc-light-tabs]',
                host: { class: 'mc-tab-group_light' }
            },] }
];
export class McAlignTabsCenterCssStyler {
}
McAlignTabsCenterCssStyler.decorators = [
    { type: Directive, args: [{
                selector: 'mc-tab-group[mc-align-tabs-center], [mc-tab-nav-bar][mc-align-tabs-center]',
                host: { class: 'mc-tab-group_align-labels-center' }
            },] }
];
export class McAlignTabsEndCssStyler {
}
McAlignTabsEndCssStyler.decorators = [
    { type: Directive, args: [{
                selector: 'mc-tab-group[mc-align-tabs-end], [mc-tab-nav-bar][mc-align-tabs-end]',
                host: { class: 'mc-tab-group_align-labels-end' }
            },] }
];
export class McStretchTabsCssStyler {
}
McStretchTabsCssStyler.decorators = [
    { type: Directive, args: [{
                selector: 'mc-tab-group[mc-stretch-tabs], [mc-tab-nav-bar][mc-stretch-tabs]',
                host: { class: 'mc-tab-group_stretch-labels' }
            },] }
];
/**
 * Used to generate unique ID's for each tab component
 * @type {?}
 */
let nextId = 0;
/**
 * A simple change event emitted on focus or selection changes.
 */
export class McTabChangeEvent {
}
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
export const MC_TABS_CONFIG = new InjectionToken('MC_TABS_CONFIG');
// Boilerplate for applying mixins to McTabGroup.
/**
 * \@docs-private
 */
export class McTabGroupBase {
    // tslint:disable-next-line:naming-convention
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
if (false) {
    /** @type {?} */
    McTabGroupBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export const McTabGroupMixinBase = mixinColor(mixinDisabled(McTabGroupBase));
/**
 * Tab-group component.  Supports basic tab pairs (label + content) and includes
 * keyboard navigation.
 */
export class McTabGroup extends McTabGroupMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} changeDetectorRef
     * @param {?} lightTabs
     * @param {?=} defaultConfig
     */
    constructor(elementRef, changeDetectorRef, lightTabs, defaultConfig) {
        super(elementRef);
        this.changeDetectorRef = changeDetectorRef;
        /**
         * Position of the tab header.
         */
        this.headerPosition = 'above';
        /**
         * Output to enable support for two-way binding on `[(selectedIndex)]`
         */
        this.selectedIndexChange = new EventEmitter();
        /**
         * Event emitted when focus has changed within a tab group.
         */
        this.focusChange = new EventEmitter();
        /**
         * Event emitted when the body animation has completed
         */
        this.animationDone = new EventEmitter();
        /**
         * Event emitted when the tab selection has changed.
         */
        this.selectedTabChange = new EventEmitter(true);
        /**
         * The tab index that should be selected after the content has been checked.
         */
        this.indexToSelect = 0;
        /**
         * Snapshot of the height of the tab body wrapper before another tab is activated.
         */
        this.tabBodyWrapperHeight = 0;
        /**
         * Subscription to tabs being added/removed.
         */
        this.tabsSubscription = Subscription.EMPTY;
        /**
         * Subscription to changes in the tab labels.
         */
        this.tabLabelSubscription = Subscription.EMPTY;
        this._dynamicHeight = false;
        this._selectedIndex = null;
        this.lightTab = coerceBooleanProperty(lightTabs);
        this.groupId = nextId++;
        this.animationDuration = defaultConfig && defaultConfig.animationDuration ?
            defaultConfig.animationDuration : '0ms';
    }
    /**
     * Whether the tab group should grow to the size of the active tab.
     * @return {?}
     */
    get dynamicHeight() { return this._dynamicHeight; }
    /**
     * @param {?} value
     * @return {?}
     */
    set dynamicHeight(value) { this._dynamicHeight = coerceBooleanProperty(value); }
    /**
     * The index of the active tab.
     * @return {?}
     */
    get selectedIndex() { return this._selectedIndex; }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectedIndex(value) {
        this.indexToSelect = coerceNumberProperty(value, null);
    }
    /**
     * After the content is checked, this component knows what tabs have been defined
     * and what the selected index should be. This is where we can know exactly what position
     * each tab should be in according to the new selected index, and additionally we know how
     * a new selected tab should transition in (from the left or right).
     * @return {?}
     */
    ngAfterContentChecked() {
        // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
        // the amount of tabs changes before the actual change detection runs.
        /** @type {?} */
        const indexToSelect = this.indexToSelect = this.clampTabIndex(this.indexToSelect);
        // If there is a change in selected index, emit a change event. Should not trigger if
        // the selected index has not yet been initialized.
        if (this._selectedIndex !== indexToSelect) {
            /** @type {?} */
            const isFirstRun = this._selectedIndex == null;
            if (!isFirstRun) {
                this.selectedTabChange.emit(this.createChangeEvent(indexToSelect));
            }
            // Changing these values after change detection has run
            // since the checked content may contain references to them.
            Promise.resolve().then((/**
             * @return {?}
             */
            () => {
                this.tabs.forEach((/**
                 * @param {?} tab
                 * @param {?} index
                 * @return {?}
                 */
                (tab, index) => tab.isActive = index === indexToSelect));
                if (!isFirstRun) {
                    this.selectedIndexChange.emit(indexToSelect);
                }
            }));
        }
        // Setup the position for each tab and optionally setup an origin on the next selected tab.
        this.tabs.forEach((/**
         * @param {?} tab
         * @param {?} index
         * @return {?}
         */
        (tab, index) => {
            tab.position = index - indexToSelect;
            // If there is already a selected tab, then set up an origin for the next selected tab
            // if it doesn't have one already.
            if (this._selectedIndex != null && tab.position === 0 && !tab.origin) {
                tab.origin = indexToSelect - this._selectedIndex;
            }
        }));
        if (this._selectedIndex !== indexToSelect) {
            this._selectedIndex = indexToSelect;
            this.changeDetectorRef.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.subscribeToTabLabels();
        // Subscribe to changes in the amount of tabs, in order to be
        // able to re-render the content as new tabs are added or removed.
        this.tabsSubscription = this.tabs.changes.subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const indexToSelect = this.clampTabIndex(this.indexToSelect);
            // Maintain the previously-selected tab if a new tab is added or removed and there is no
            // explicit change that selects a different tab.
            if (indexToSelect === this._selectedIndex) {
                /** @type {?} */
                const tabs = this.tabs.toArray();
                for (let i = 0; i < tabs.length; i++) {
                    if (tabs[i].isActive) {
                        // Assign both to the `_indexToSelect` and `_selectedIndex` so we don't fire a changed
                        // event, otherwise the consumer may end up in an infinite loop in some edge cases like
                        // adding a tab within the `selectedIndexChange` event.
                        this.indexToSelect = this._selectedIndex = i;
                        break;
                    }
                }
            }
            this.subscribeToTabLabels();
            this.changeDetectorRef.markForCheck();
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.tabsSubscription.unsubscribe();
        this.tabLabelSubscription.unsubscribe();
    }
    /**
     * @param {?} index
     * @return {?}
     */
    focusChanged(index) {
        this.focusChange.emit(this.createChangeEvent(index));
    }
    /**
     * Returns a unique id for each tab label element
     * @param {?} i
     * @return {?}
     */
    getTabLabelId(i) {
        return `mc-tab-label-${this.groupId}-${i}`;
    }
    /**
     * Returns a unique id for each tab content element
     * @param {?} i
     * @return {?}
     */
    getTabContentId(i) {
        return `mc-tab-content-${this.groupId}-${i}`;
    }
    /**
     * Sets the height of the body wrapper to the height of the activating tab if dynamic
     * height property is true.
     * @param {?} tabHeight
     * @return {?}
     */
    setTabBodyWrapperHeight(tabHeight) {
        if (!this._dynamicHeight || !this.tabBodyWrapperHeight) {
            return;
        }
        /** @type {?} */
        const wrapper = this.tabBodyWrapper.nativeElement;
        wrapper.style.height = `${this.tabBodyWrapperHeight}px`;
        // This conditional forces the browser to paint the height so that
        // the animation to the new height can have an origin.
        if (this.tabBodyWrapper.nativeElement.offsetHeight) {
            wrapper.style.height = `${tabHeight}px`;
        }
    }
    /**
     * Removes the height of the tab body wrapper.
     * @return {?}
     */
    removeTabBodyWrapperHeight() {
        this.tabBodyWrapperHeight = this.tabBodyWrapper.nativeElement.clientHeight;
        this.tabBodyWrapper.nativeElement.style.height = '';
        this.animationDone.emit();
    }
    /**
     * Handle click events, setting new selected index if appropriate.
     * @param {?} tab
     * @param {?} tabHeader
     * @param {?} index
     * @return {?}
     */
    handleClick(tab, tabHeader, index) {
        if (!tab.disabled) {
            this.selectedIndex = tabHeader.focusIndex = index;
        }
    }
    /**
     * Retrieves the tabindex for the tab.
     * @param {?} tab
     * @param {?} index
     * @return {?}
     */
    getTabIndex(tab, index) {
        if (tab.disabled) {
            return null;
        }
        return this.selectedIndex === index ? 0 : -1;
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    createChangeEvent(index) {
        /** @type {?} */
        const event = new McTabChangeEvent();
        event.index = index;
        if (this.tabs && this.tabs.length) {
            event.tab = this.tabs.toArray()[index];
        }
        return event;
    }
    /**
     * Subscribes to changes in the tab labels. This is needed, because the \@Input for the label is
     * on the McTab component, whereas the data binding is inside the McTabGroup. In order for the
     * binding to be updated, we need to subscribe to changes in it and trigger change detection
     * manually.
     * @private
     * @return {?}
     */
    subscribeToTabLabels() {
        if (this.tabLabelSubscription) {
            this.tabLabelSubscription.unsubscribe();
        }
        this.tabLabelSubscription = merge(...this.tabs.map((/**
         * @param {?} tab
         * @return {?}
         */
        (tab) => tab.stateChanges)))
            .subscribe((/**
         * @return {?}
         */
        () => this.changeDetectorRef.markForCheck()));
    }
    /**
     * Clamps the given index to the bounds of 0 and the tabs length.
     * @private
     * @param {?} index
     * @return {?}
     */
    clampTabIndex(index) {
        // Note the `|| 0`, which ensures that values like NaN can't get through
        // and which would otherwise throw the component into an infinite loop
        // (since Mch.max(NaN, 0) === NaN).
        return Math.min(this.tabs.length - 1, Math.max(index || 0, 0));
    }
}
McTabGroup.decorators = [
    { type: Component, args: [{
                selector: 'mc-tab-group',
                exportAs: 'mcTabGroup',
                template: "<mc-tab-header #tabHeader\n               [selectedIndex]=\"selectedIndex\"\n               (indexFocused)=\"focusChanged($event)\"\n               (selectFocusedIndex)=\"selectedIndex = $event\">\n    <div role=\"tab\"\n         mcTabLabelWrapper\n         cdkMonitorElementFocus\n         [class.mc-tab-label]=\"!lightTab\"\n         [class.mc-tab-light-label]=\"lightTab\"\n         *ngFor=\"let tab of tabs; let i = index\"\n         [id]=\"getTabLabelId(i)\"\n         [attr.tabindex]=\"getTabIndex(tab, i)\"\n         [attr.aria-posinset]=\"i + 1\"\n         [attr.aria-setsize]=\"tabs.length\"\n         [attr.aria-controls]=\"getTabContentId(i)\"\n         [attr.aria-selected]=\"selectedIndex == i\"\n         [attr.aria-label]=\"tab.ariaLabel || null\"\n         [attr.aria-labelledby]=\"(!tab.ariaLabel && tab.ariaLabelledby) ? tab.ariaLabelledby : null\"\n         [class.mc-active]=\"selectedIndex == i\"\n         [disabled]=\"tab.disabled\"\n         (click)=\"handleClick(tab, tabHeader, i)\">\n\n        <div class=\"mc-tab-label__content\">\n            <!-- If there is a label template, use it. -->\n            <ng-template [ngIf]=\"tab.templateLabel\">\n                <ng-template [cdkPortalOutlet]=\"tab.templateLabel\"></ng-template>\n            </ng-template>\n\n            <!-- If there is not a label template, fall back to the text label. -->\n            <ng-template [ngIf]=\"!tab.templateLabel\">{{tab.textLabel}}</ng-template>\n        </div>\n\n        <div class=\"mc-tab-overlay\"></div>\n    </div>\n</mc-tab-header>\n\n<div class=\"mc-tab-body__wrapper\"\n     #tabBodyWrapper>\n    <mc-tab-body role=\"tabpanel\"\n                 *ngFor=\"let tab of tabs; let i = index\"\n                 [id]=\"getTabContentId(i)\"\n                 [attr.aria-labelledby]=\"getTabLabelId(i)\"\n                 [class.mc-tab-body__active]=\"selectedIndex == i\"\n                 [content]=\"tab.content\"\n                 [position]=\"tab.position\"\n                 [origin]=\"tab.origin\"\n                 [animationDuration]=\"animationDuration\"\n                 (onCentered)=\"removeTabBodyWrapperHeight()\"\n                 (onCentering)=\"setTabBodyWrapperHeight($event)\">\n    </mc-tab-body>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                inputs: ['color', 'disabled'],
                host: {
                    class: 'mc-tab-group',
                    '[class.mc-tab-group_dynamic-height]': 'dynamicHeight',
                    '[class.mc-tab-group_inverted-header]': 'headerPosition === "below"'
                },
                styles: [".mc-tab-label.cdk-keyboard-focused:after,.mc-tab-light-label.cdk-keyboard-focused:after,.mc-tab-light-label.mc-active:before,.mc-tab-light-label:hover:before{display:block;position:absolute;content:\"\"}.mc-tab-light-label.mc-active:before,.mc-tab-light-label:hover:before{bottom:-1px;left:0;height:4px;right:0}.mc-tab-group{display:flex;flex-direction:column;box-sizing:border-box;text-align:center;white-space:nowrap}.mc-tab-group.mc-tab-group_inverted-header{flex-direction:column-reverse}.mc-tab-label{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:40px;text-align:center;white-space:nowrap;cursor:pointer;padding-right:16px;padding-left:16px;outline:0;border-bottom-width:1px;border-bottom-style:solid;border-top-width:1px;border-top-style:solid;border-top-left-radius:3px;border-top-right-radius:3px}.mc-tab-label.cdk-keyboard-focused{z-index:1}.mc-tab-label.cdk-keyboard-focused:after{top:-2px;right:-1px;bottom:-1px;left:-1px;border-width:2px;border-style:solid;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom:none}.mc-tab-label.mc-disabled{pointer-events:none}.mc-tab-label.mc-active{padding-right:15px;padding-left:15px;border-width:1px;border-style:solid}.mc-tab-label.mc-active.cdk-keyboard-focused:after{z-index:1;right:-2px;left:-2px}.mc-tab-label .mc-tab-overlay{position:absolute;top:-1px;left:0;right:0;bottom:0;pointer-events:none;border-top-left-radius:3px;border-top-right-radius:3px;border-top:1px solid transparent}.mc-tab-light-label{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:40px;text-align:center;white-space:nowrap;cursor:pointer;padding-right:16px;padding-left:16px;outline:0;border-bottom-width:1px;border-bottom-style:solid}.mc-tab-light-label.cdk-keyboard-focused{z-index:1}.mc-tab-light-label.cdk-keyboard-focused:after{right:-1px;bottom:-1px;left:-1px;border-width:2px;border-style:solid;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom:none;top:-1px}.mc-tab-light-label.mc-disabled{pointer-events:none}.mc-tab-light-label .mc-tab-overlay{left:0;right:0;bottom:0;pointer-events:none;position:absolute;top:0}.mc-tab-light-label.cdk-keyboard-focused+:hover:before{left:1px}.mc-tab-header__content{padding:1px 1px 0}.mc-tab-body__wrapper{display:flex;overflow:hidden;position:relative}.mc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;flex-basis:100%}.mc-tab-body.mc-tab-body__active{overflow-x:hidden;overflow-y:auto;position:relative;z-index:1;flex-grow:1}.mc-tab-group.mc-tab-group_dynamic-height .mc-tab-body.mc-tab-body__active{overflow-y:hidden}"]
            }] }
];
/** @nocollapse */
McTabGroup.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: String, decorators: [{ type: Attribute, args: ['mc-light-tabs',] }] },
    { type: undefined, decorators: [{ type: Inject, args: [MC_TABS_CONFIG,] }, { type: Optional }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWdyb3VwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RhYnMvIiwic291cmNlcyI6WyJ0YWItZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRixPQUFPLEVBR0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNqQixjQUFjLEVBQ2QsTUFBTSxFQUNOLFFBQVEsRUFDUixTQUFTLEVBQUUsU0FBUyxFQUN2QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBR0gsVUFBVSxFQUNWLGFBQWEsRUFDaEIsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUzQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQzlCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFPM0MsTUFBTSxPQUFPLG9CQUFvQjs7O1lBSmhDLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsOERBQThEO2dCQUN4RSxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUU7YUFDeEM7O0FBT0QsTUFBTSxPQUFPLDBCQUEwQjs7O1lBSnRDLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsNEVBQTRFO2dCQUN0RixJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsa0NBQWtDLEVBQUU7YUFDdEQ7O0FBT0QsTUFBTSxPQUFPLHVCQUF1Qjs7O1lBSm5DLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsc0VBQXNFO2dCQUNoRixJQUFJLEVBQUUsRUFBRSxLQUFLLEVB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Ozs7O0lBQ2xELG9DQUF3Qzs7Ozs7SUFDeEMsb0NBQTZDOzs7OztJQUU3Qyw2QkFBd0I7Ozs7O0lBSXBCLHVDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSwgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5qZWN0LFxuICAgIE9wdGlvbmFsLFxuICAgIERpcmVjdGl2ZSwgQXR0cmlidXRlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDYW5Db2xvcixcbiAgICBDYW5Db2xvckN0b3IsXG4gICAgbWl4aW5Db2xvcixcbiAgICBtaXhpbkRpc2FibGVkXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IG1lcmdlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTWNUYWIgfSBmcm9tICcuL3RhYic7XG5pbXBvcnQgeyBNY1RhYkhlYWRlciB9IGZyb20gJy4vdGFiLWhlYWRlcic7XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy10YWItZ3JvdXBbbWMtbGlnaHQtdGFic10sIFttYy10YWItbmF2LWJhcl1bbWMtbGlnaHQtdGFic10nLFxuICAgIGhvc3Q6IHsgY2xhc3M6ICdtYy10YWItZ3JvdXBfbGlnaHQnIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNMaWdodFRhYnNDc3NTdHlsZXIgeyB9XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFiLWdyb3VwW21jLWFsaWduLXRhYnMtY2VudGVyXSwgW21jLXRhYi1uYXYtYmFyXVttYy1hbGlnbi10YWJzLWNlbnRlcl0nLFxuICAgIGhvc3Q6IHsgY2xhc3M6ICdtYy10YWItZ3JvdXBfYWxpZ24tbGFiZWxzLWNlbnRlcicgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0FsaWduVGFic0NlbnRlckNzc1N0eWxlciB7IH1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy10YWItZ3JvdXBbbWMtYWxpZ24tdGFicy1lbmRdLCBbbWMtdGFiLW5hdi1iYXJdW21jLWFsaWduLXRhYnMtZW5kXScsXG4gICAgaG9zdDogeyBjbGFzczogJ21jLXRhYi1ncm91cF9hbGlnbi1sYWJlbHMtZW5kJyB9XG59KVxuZXhwb3J0IGNsYXNzIE1jQWxpZ25UYWJzRW5kQ3NzU3R5bGVyIHsgfVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLXRhYi1ncm91cFttYy1zdHJldGNoLXRhYnNdLCBbbWMtdGFiLW5hdi1iYXJdW21jLXN0cmV0Y2gtdGFic10nLFxuICAgIGhvc3Q6IHsgY2xhc3M6ICdtYy10YWItZ3JvdXBfc3RyZXRjaC1sYWJlbHMnIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNTdHJldGNoVGFic0Nzc1N0eWxlciB7IH1cblxuLyoqIFVzZWQgdG8gZ2VuZXJhdGUgdW5pcXVlIElEJ3MgZm9yIGVhY2ggdGFiIGNvbXBvbmVudCAqL1xubGV0IG5leHRJZCA9IDA7XG5cbi8qKiBBIHNpbXBsZSBjaGFuZ2UgZXZlbnQgZW1pdHRlZCBvbiBmb2N1cyBvciBzZWxlY3Rpb24gY2hhbmdlcy4gKi9cbmV4cG9ydCBjbGFzcyBNY1RhYkNoYW5nZUV2ZW50IHtcbiAgICAvKiogSW5kZXggb2YgdGhlIGN1cnJlbnRseS1zZWxlY3RlZCB0YWIuICovXG4gICAgaW5kZXg6IG51bWJlcjtcbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50bHktc2VsZWN0ZWQgdGFiLiAqL1xuICAgIHRhYjogTWNUYWI7XG59XG5cbi8qKiBQb3NzaWJsZSBwb3NpdGlvbnMgZm9yIHRoZSB0YWIgaGVhZGVyLiAqL1xuZXhwb3J0IHR5cGUgTWNUYWJIZWFkZXJQb3NpdGlvbiA9ICdhYm92ZScgfCAnYmVsb3cnO1xuXG4vKiogT2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gY29uZmlndXJlIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yIHRoZSB0YWJzIG1vZHVsZS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSU1jVGFic0NvbmZpZyB7XG4gICAgLyoqIER1cmF0aW9uIGZvciB0aGUgdGFiIGFuaW1hdGlvbi4gTXVzdCBiZSBhIHZhbGlkIENTUyB2YWx1ZSAoZS5nLiA2MDBtcykuICovXG4gICAgYW5pbWF0aW9uRHVyYXRpb24/OiBzdHJpbmc7XG59XG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byBwcm92aWRlIHRoZSBkZWZhdWx0IG9wdGlvbnMgdGhlIHRhYnMgbW9kdWxlLiAqL1xuZXhwb3J0IGNvbnN0IE1DX1RBQlNfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ01DX1RBQlNfQ09ORklHJyk7XG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWNUYWJHcm91cC5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY2xhc3MgTWNUYWJHcm91cEJhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikgeyB9XG59XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1RhYkdyb3VwTWl4aW5CYXNlOiBDYW5Db2xvckN0b3IgJiB0eXBlb2YgTWNUYWJHcm91cEJhc2UgPSBtaXhpbkNvbG9yKG1peGluRGlzYWJsZWQoTWNUYWJHcm91cEJhc2UpKTtcblxuLyoqXG4gKiBUYWItZ3JvdXAgY29tcG9uZW50LiAgU3VwcG9ydHMgYmFzaWMgdGFiIHBhaXJzIChsYWJlbCArIGNvbnRlbnQpIGFuZCBpbmNsdWRlc1xuICoga2V5Ym9hcmQgbmF2aWdhdGlvbi5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy10YWItZ3JvdXAnLFxuICAgIGV4cG9ydEFzOiAnbWNUYWJHcm91cCcsXG4gICAgdGVtcGxhdGVVcmw6ICd0YWItZ3JvdXAuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3RhYi1ncm91cC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBpbnB1dHM6IFsnY29sb3InLCAnZGlzYWJsZWQnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdGFiLWdyb3VwJyxcbiAgICAgICAgJ1tjbGFzcy5tYy10YWItZ3JvdXBfZHluYW1pYy1oZWlnaHRdJzogJ2R5bmFtaWNIZWlnaHQnLFxuICAgICAgICAnW2NsYXNzLm1jLXRhYi1ncm91cF9pbnZlcnRlZC1oZWFkZXJdJzogJ2hlYWRlclBvc2l0aW9uID09PSBcImJlbG93XCInXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1RhYkdyb3VwIGV4dGVuZHMgTWNUYWJHcm91cE1peGluQmFzZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgT25EZXN0cm95LCBDYW5Db2xvciB7XG4gICAgbGlnaHRUYWI6IGJvb2xlYW47XG5cbiAgICAvKiogV2hldGhlciB0aGUgdGFiIGdyb3VwIHNob3VsZCBncm93IHRvIHRoZSBzaXplIG9mIHRoZSBhY3RpdmUgdGFiLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGR5bmFtaWNIZWlnaHQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9keW5hbWljSGVpZ2h0OyB9XG4gICAgc2V0IGR5bmFtaWNIZWlnaHQodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fZHluYW1pY0hlaWdodCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cblxuICAgIC8qKiBUaGUgaW5kZXggb2YgdGhlIGFjdGl2ZSB0YWIuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgc2VsZWN0ZWRJbmRleCgpOiBudW1iZXIgfCBudWxsIHsgcmV0dXJuIHRoaXMuX3NlbGVjdGVkSW5kZXg7IH1cbiAgICBzZXQgc2VsZWN0ZWRJbmRleCh2YWx1ZTogbnVtYmVyIHwgbnVsbCkge1xuICAgICAgICB0aGlzLmluZGV4VG9TZWxlY3QgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSwgbnVsbCk7XG4gICAgfVxuXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY1RhYikgdGFiczogUXVlcnlMaXN0PE1jVGFiPjtcblxuICAgIEBWaWV3Q2hpbGQoJ3RhYkJvZHlXcmFwcGVyJywge3N0YXRpYzogZmFsc2V9KSB0YWJCb2R5V3JhcHBlcjogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ3RhYkhlYWRlcicsIHtzdGF0aWM6IGZhbHNlfSkgdGFiSGVhZGVyOiBNY1RhYkhlYWRlcjtcblxuICAgIC8qKiBQb3NpdGlvbiBvZiB0aGUgdGFiIGhlYWRlci4gKi9cbiAgICBASW5wdXQoKSBoZWFkZXJQb3NpdGlvbjogTWNUYWJIZWFkZXJQb3NpdGlvbiA9ICdhYm92ZSc7XG5cbiAgICAvKiogRHVyYXRpb24gZm9yIHRoZSB0YWIgYW5pbWF0aW9uLiBNdXN0IGJlIGEgdmFsaWQgQ1NTIHZhbHVlIChlLmcuIDYwMG1zKS4gKi9cbiAgICBASW5wdXQoKSBhbmltYXRpb25EdXJhdGlvbjogc3RyaW5nO1xuXG4gICAgLyoqIE91dHB1dCB0byBlbmFibGUgc3VwcG9ydCBmb3IgdHdvLXdheSBiaW5kaW5nIG9uIGBbKHNlbGVjdGVkSW5kZXgpXWAgKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0ZWRJbmRleENoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gZm9jdXMgaGFzIGNoYW5nZWQgd2l0aGluIGEgdGFiIGdyb3VwLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBmb2N1c0NoYW5nZTogRXZlbnRFbWl0dGVyPE1jVGFiQ2hhbmdlRXZlbnQ+ID1cbiAgICAgICAgbmV3IEV2ZW50RW1pdHRlcjxNY1RhYkNoYW5nZUV2ZW50PigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgYm9keSBhbmltYXRpb24gaGFzIGNvbXBsZXRlZCAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBhbmltYXRpb25Eb25lOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSB0YWIgc2VsZWN0aW9uIGhhcyBjaGFuZ2VkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3RlZFRhYkNoYW5nZTogRXZlbnRFbWl0dGVyPE1jVGFiQ2hhbmdlRXZlbnQ+ID1cbiAgICAgICAgbmV3IEV2ZW50RW1pdHRlcjxNY1RhYkNoYW5nZUV2ZW50Pih0cnVlKTtcblxuICAgIC8qKiBUaGUgdGFiIGluZGV4IHRoYXQgc2hvdWxkIGJlIHNlbGVjdGVkIGFmdGVyIHRoZSBjb250ZW50IGhhcyBiZWVuIGNoZWNrZWQuICovXG4gICAgcHJpdmF0ZSBpbmRleFRvU2VsZWN0OiBudW1iZXIgfCBudWxsID0gMDtcblxuICAgIC8qKiBTbmFwc2hvdCBvZiB0aGUgaGVpZ2h0IG9mIHRoZSB0YWIgYm9keSB3cmFwcGVyIGJlZm9yZSBhbm90aGVyIHRhYiBpcyBhY3RpdmF0ZWQuICovXG4gICAgcHJpdmF0ZSB0YWJCb2R5V3JhcHBlckhlaWdodDogbnVtYmVyID0gMDtcblxuICAgIC8qKiBTdWJzY3JpcHRpb24gdG8gdGFicyBiZWluZyBhZGRlZC9yZW1vdmVkLiAqL1xuICAgIHByaXZhdGUgdGFic1N1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIC8qKiBTdWJzY3JpcHRpb24gdG8gY2hhbmdlcyBpbiB0aGUgdGFiIGxhYmVscy4gKi9cbiAgICBwcml2YXRlIHRhYkxhYmVsU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIHByaXZhdGUgX2R5bmFtaWNIZWlnaHQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9zZWxlY3RlZEluZGV4OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAgIHByaXZhdGUgZ3JvdXBJZDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBAQXR0cmlidXRlKCdtYy1saWdodC10YWJzJykgbGlnaHRUYWJzOiBzdHJpbmcsXG4gICAgICAgIEBJbmplY3QoTUNfVEFCU19DT05GSUcpIEBPcHRpb25hbCgpIGRlZmF1bHRDb25maWc/OiBJTWNUYWJzQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuXG4gICAgICAgIHRoaXMubGlnaHRUYWIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkobGlnaHRUYWJzKTtcblxuICAgICAgICB0aGlzLmdyb3VwSWQgPSBuZXh0SWQrKztcbiAgICAgICAgdGhpcy5hbmltYXRpb25EdXJhdGlvbiA9IGRlZmF1bHRDb25maWcgJiYgZGVmYXVsdENvbmZpZy5hbmltYXRpb25EdXJhdGlvbiA/XG4gICAgICAgICAgICBkZWZhdWx0Q29uZmlnLmFuaW1hdGlvbkR1cmF0aW9uIDogJzBtcyc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWZ0ZXIgdGhlIGNvbnRlbnQgaXMgY2hlY2tlZCwgdGhpcyBjb21wb25lbnQga25vd3Mgd2hhdCB0YWJzIGhhdmUgYmVlbiBkZWZpbmVkXG4gICAgICogYW5kIHdoYXQgdGhlIHNlbGVjdGVkIGluZGV4IHNob3VsZCBiZS4gVGhpcyBpcyB3aGVyZSB3ZSBjYW4ga25vdyBleGFjdGx5IHdoYXQgcG9zaXRpb25cbiAgICAgKiBlYWNoIHRhYiBzaG91bGQgYmUgaW4gYWNjb3JkaW5nIHRvIHRoZSBuZXcgc2VsZWN0ZWQgaW5kZXgsIGFuZCBhZGRpdGlvbmFsbHkgd2Uga25vdyBob3dcbiAgICAgKiBhIG5ldyBzZWxlY3RlZCB0YWIgc2hvdWxkIHRyYW5zaXRpb24gaW4gKGZyb20gdGhlIGxlZnQgb3IgcmlnaHQpLlxuICAgICAqL1xuICAgIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAgICAgLy8gRG9uJ3QgY2xhbXAgdGhlIGBpbmRleFRvU2VsZWN0YCBpbW1lZGlhdGVseSBpbiB0aGUgc2V0dGVyIGJlY2F1c2UgaXQgY2FuIGhhcHBlbiB0aGF0XG4gICAgICAgIC8vIHRoZSBhbW91bnQgb2YgdGFicyBjaGFuZ2VzIGJlZm9yZSB0aGUgYWN0dWFsIGNoYW5nZSBkZXRlY3Rpb24gcnVucy5cbiAgICAgICAgY29uc3QgaW5kZXhUb1NlbGVjdCA9IHRoaXMuaW5kZXhUb1NlbGVjdCA9IHRoaXMuY2xhbXBUYWJJbmRleCh0aGlzLmluZGV4VG9TZWxlY3QpO1xuXG4gICAgICAgIC8vIElmIHRoZXJlIGlzIGEgY2hhbmdlIGluIHNlbGVjdGVkIGluZGV4LCBlbWl0IGEgY2hhbmdlIGV2ZW50LiBTaG91bGQgbm90IHRyaWdnZXIgaWZcbiAgICAgICAgLy8gdGhlIHNlbGVjdGVkIGluZGV4IGhhcyBub3QgeWV0IGJlZW4gaW5pdGlhbGl6ZWQuXG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZEluZGV4ICE9PSBpbmRleFRvU2VsZWN0KSB7XG4gICAgICAgICAgICBjb25zdCBpc0ZpcnN0UnVuID0gdGhpcy5fc2VsZWN0ZWRJbmRleCA9PSBudWxsO1xuXG4gICAgICAgICAgICBpZiAoIWlzRmlyc3RSdW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGFiQ2hhbmdlLmVtaXQodGhpcy5jcmVhdGVDaGFuZ2VFdmVudChpbmRleFRvU2VsZWN0KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENoYW5naW5nIHRoZXNlIHZhbHVlcyBhZnRlciBjaGFuZ2UgZGV0ZWN0aW9uIGhhcyBydW5cbiAgICAgICAgICAgIC8vIHNpbmNlIHRoZSBjaGVja2VkIGNvbnRlbnQgbWF5IGNvbnRhaW4gcmVmZXJlbmNlcyB0byB0aGVtLlxuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50YWJzLmZvckVhY2goKHRhYiwgaW5kZXgpID0+IHRhYi5pc0FjdGl2ZSA9IGluZGV4ID09PSBpbmRleFRvU2VsZWN0KTtcblxuICAgICAgICAgICAgICAgIGlmICghaXNGaXJzdFJ1bikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXhDaGFuZ2UuZW1pdChpbmRleFRvU2VsZWN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldHVwIHRoZSBwb3NpdGlvbiBmb3IgZWFjaCB0YWIgYW5kIG9wdGlvbmFsbHkgc2V0dXAgYW4gb3JpZ2luIG9uIHRoZSBuZXh0IHNlbGVjdGVkIHRhYi5cbiAgICAgICAgdGhpcy50YWJzLmZvckVhY2goKHRhYjogTWNUYWIsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIHRhYi5wb3NpdGlvbiA9IGluZGV4IC0gaW5kZXhUb1NlbGVjdDtcblxuICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgYWxyZWFkeSBhIHNlbGVjdGVkIHRhYiwgdGhlbiBzZXQgdXAgYW4gb3JpZ2luIGZvciB0aGUgbmV4dCBzZWxlY3RlZCB0YWJcbiAgICAgICAgICAgIC8vIGlmIGl0IGRvZXNuJ3QgaGF2ZSBvbmUgYWxyZWFkeS5cbiAgICAgICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZEluZGV4ICE9IG51bGwgJiYgdGFiLnBvc2l0aW9uID09PSAwICYmICF0YWIub3JpZ2luKSB7XG4gICAgICAgICAgICAgICAgdGFiLm9yaWdpbiA9IGluZGV4VG9TZWxlY3QgLSB0aGlzLl9zZWxlY3RlZEluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWRJbmRleCAhPT0gaW5kZXhUb1NlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IGluZGV4VG9TZWxlY3Q7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnN1YnNjcmliZVRvVGFiTGFiZWxzKCk7XG5cbiAgICAgICAgLy8gU3Vic2NyaWJlIHRvIGNoYW5nZXMgaW4gdGhlIGFtb3VudCBvZiB0YWJzLCBpbiBvcmRlciB0byBiZVxuICAgICAgICAvLyBhYmxlIHRvIHJlLXJlbmRlciB0aGUgY29udGVudCBhcyBuZXcgdGFicyBhcmUgYWRkZWQgb3IgcmVtb3ZlZC5cbiAgICAgICAgdGhpcy50YWJzU3Vic2NyaXB0aW9uID0gdGhpcy50YWJzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4VG9TZWxlY3QgPSB0aGlzLmNsYW1wVGFiSW5kZXgodGhpcy5pbmRleFRvU2VsZWN0KTtcblxuICAgICAgICAgICAgLy8gTWFpbnRhaW4gdGhlIHByZXZpb3VzbHktc2VsZWN0ZWQgdGFiIGlmIGEgbmV3IHRhYiBpcyBhZGRlZCBvciByZW1vdmVkIGFuZCB0aGVyZSBpcyBub1xuICAgICAgICAgICAgLy8gZXhwbGljaXQgY2hhbmdlIHRoYXQgc2VsZWN0cyBhIGRpZmZlcmVudCB0YWIuXG4gICAgICAgICAgICBpZiAoaW5kZXhUb1NlbGVjdCA9PT0gdGhpcy5fc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhYnMgPSB0aGlzLnRhYnMudG9BcnJheSgpO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWJzW2ldLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBc3NpZ24gYm90aCB0byB0aGUgYF9pbmRleFRvU2VsZWN0YCBhbmQgYF9zZWxlY3RlZEluZGV4YCBzbyB3ZSBkb24ndCBmaXJlIGEgY2hhbmdlZFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXZlbnQsIG90aGVyd2lzZSB0aGUgY29uc3VtZXIgbWF5IGVuZCB1cCBpbiBhbiBpbmZpbml0ZSBsb29wIGluIHNvbWUgZWRnZSBjYXNlcyBsaWtlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGRpbmcgYSB0YWIgd2l0aGluIHRoZSBgc2VsZWN0ZWRJbmRleENoYW5nZWAgZXZlbnQuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4VG9TZWxlY3QgPSB0aGlzLl9zZWxlY3RlZEluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZVRvVGFiTGFiZWxzKCk7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy50YWJzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMudGFiTGFiZWxTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBmb2N1c0NoYW5nZWQoaW5kZXg6IG51bWJlcikge1xuICAgICAgICB0aGlzLmZvY3VzQ2hhbmdlLmVtaXQodGhpcy5jcmVhdGVDaGFuZ2VFdmVudChpbmRleCkpO1xuICAgIH1cblxuICAgIC8qKiBSZXR1cm5zIGEgdW5pcXVlIGlkIGZvciBlYWNoIHRhYiBsYWJlbCBlbGVtZW50ICovXG4gICAgZ2V0VGFiTGFiZWxJZChpOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYG1jLXRhYi1sYWJlbC0ke3RoaXMuZ3JvdXBJZH0tJHtpfWA7XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgYSB1bmlxdWUgaWQgZm9yIGVhY2ggdGFiIGNvbnRlbnQgZWxlbWVudCAqL1xuICAgIGdldFRhYkNvbnRlbnRJZChpOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYG1jLXRhYi1jb250ZW50LSR7dGhpcy5ncm91cElkfS0ke2l9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBoZWlnaHQgb2YgdGhlIGJvZHkgd3JhcHBlciB0byB0aGUgaGVpZ2h0IG9mIHRoZSBhY3RpdmF0aW5nIHRhYiBpZiBkeW5hbWljXG4gICAgICogaGVpZ2h0IHByb3BlcnR5IGlzIHRydWUuXG4gICAgICovXG4gICAgc2V0VGFiQm9keVdyYXBwZXJIZWlnaHQodGFiSGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9keW5hbWljSGVpZ2h0IHx8ICF0aGlzLnRhYkJvZHlXcmFwcGVySGVpZ2h0KSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNvbnN0IHdyYXBwZXI6IEhUTUxFbGVtZW50ID0gdGhpcy50YWJCb2R5V3JhcHBlci5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIHdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy50YWJCb2R5V3JhcHBlckhlaWdodH1weGA7XG5cbiAgICAgICAgLy8gVGhpcyBjb25kaXRpb25hbCBmb3JjZXMgdGhlIGJyb3dzZXIgdG8gcGFpbnQgdGhlIGhlaWdodCBzbyB0aGF0XG4gICAgICAgIC8vIHRoZSBhbmltYXRpb24gdG8gdGhlIG5ldyBoZWlnaHQgY2FuIGhhdmUgYW4gb3JpZ2luLlxuICAgICAgICBpZiAodGhpcy50YWJCb2R5V3JhcHBlci5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCkge1xuICAgICAgICAgICAgd3JhcHBlci5zdHlsZS5oZWlnaHQgPSBgJHt0YWJIZWlnaHR9cHhgO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFJlbW92ZXMgdGhlIGhlaWdodCBvZiB0aGUgdGFiIGJvZHkgd3JhcHBlci4gKi9cbiAgICByZW1vdmVUYWJCb2R5V3JhcHBlckhlaWdodCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YWJCb2R5V3JhcHBlckhlaWdodCA9IHRoaXMudGFiQm9keVdyYXBwZXIubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHRoaXMudGFiQm9keVdyYXBwZXIubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSAnJztcbiAgICAgICAgdGhpcy5hbmltYXRpb25Eb25lLmVtaXQoKTtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlIGNsaWNrIGV2ZW50cywgc2V0dGluZyBuZXcgc2VsZWN0ZWQgaW5kZXggaWYgYXBwcm9wcmlhdGUuICovXG4gICAgaGFuZGxlQ2xpY2sodGFiOiBNY1RhYiwgdGFiSGVhZGVyOiBNY1RhYkhlYWRlciwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAoIXRhYi5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gdGFiSGVhZGVyLmZvY3VzSW5kZXggPSBpbmRleDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBSZXRyaWV2ZXMgdGhlIHRhYmluZGV4IGZvciB0aGUgdGFiLiAqL1xuICAgIGdldFRhYkluZGV4KHRhYjogTWNUYWIsIGluZGV4OiBudW1iZXIpOiBudW1iZXIgfCBudWxsIHtcbiAgICAgICAgaWYgKHRhYi5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEluZGV4ID09PSBpbmRleCA/IDAgOiAtMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUNoYW5nZUV2ZW50KGluZGV4OiBudW1iZXIpOiBNY1RhYkNoYW5nZUV2ZW50IHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgTWNUYWJDaGFuZ2VFdmVudCgpO1xuICAgICAgICBldmVudC5pbmRleCA9IGluZGV4O1xuICAgICAgICBpZiAodGhpcy50YWJzICYmIHRoaXMudGFicy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGV2ZW50LnRhYiA9IHRoaXMudGFicy50b0FycmF5KClbaW5kZXhdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN1YnNjcmliZXMgdG8gY2hhbmdlcyBpbiB0aGUgdGFiIGxhYmVscy4gVGhpcyBpcyBuZWVkZWQsIGJlY2F1c2UgdGhlIEBJbnB1dCBmb3IgdGhlIGxhYmVsIGlzXG4gICAgICogb24gdGhlIE1jVGFiIGNvbXBvbmVudCwgd2hlcmVhcyB0aGUgZGF0YSBiaW5kaW5nIGlzIGluc2lkZSB0aGUgTWNUYWJHcm91cC4gSW4gb3JkZXIgZm9yIHRoZVxuICAgICAqIGJpbmRpbmcgdG8gYmUgdXBkYXRlZCwgd2UgbmVlZCB0byBzdWJzY3JpYmUgdG8gY2hhbmdlcyBpbiBpdCBhbmQgdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAgICogbWFudWFsbHkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdWJzY3JpYmVUb1RhYkxhYmVscygpIHtcbiAgICAgICAgaWYgKHRoaXMudGFiTGFiZWxTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudGFiTGFiZWxTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGFiTGFiZWxTdWJzY3JpcHRpb24gPSBtZXJnZSguLi50aGlzLnRhYnMubWFwKCh0YWIpID0+IHRhYi5zdGF0ZUNoYW5nZXMpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpKTtcbiAgICB9XG5cbiAgICAvKiogQ2xhbXBzIHRoZSBnaXZlbiBpbmRleCB0byB0aGUgYm91bmRzIG9mIDAgYW5kIHRoZSB0YWJzIGxlbmd0aC4gKi9cbiAgICBwcml2YXRlIGNsYW1wVGFiSW5kZXgoaW5kZXg6IG51bWJlciB8IG51bGwpOiBudW1iZXIge1xuICAgICAgICAvLyBOb3RlIHRoZSBgfHwgMGAsIHdoaWNoIGVuc3VyZXMgdGhhdCB2YWx1ZXMgbGlrZSBOYU4gY2FuJ3QgZ2V0IHRocm91Z2hcbiAgICAgICAgLy8gYW5kIHdoaWNoIHdvdWxkIG90aGVyd2lzZSB0aHJvdyB0aGUgY29tcG9uZW50IGludG8gYW4gaW5maW5pdGUgbG9vcFxuICAgICAgICAvLyAoc2luY2UgTWNoLm1heChOYU4sIDApID09PSBOYU4pLlxuICAgICAgICByZXR1cm4gTWF0aC5taW4odGhpcy50YWJzLmxlbmd0aCAtIDEsIE1hdGgubWF4KGluZGV4IHx8IDAsIDApKTtcbiAgICB9XG59XG4iXX0=