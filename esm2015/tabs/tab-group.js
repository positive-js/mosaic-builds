/**
 * @fileoverview added by tsickle
 * Generated from: tab-group.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                styles: [".mc-tab-label.cdk-keyboard-focused:after,.mc-tab-light-label.cdk-keyboard-focused:after,.mc-tab-light-label.mc-active:before,.mc-tab-light-label:hover:before{content:\"\";display:block;position:absolute}.mc-tab-light-label.mc-active:before,.mc-tab-light-label:hover:before{bottom:calc(var(--mc-tabs-size-border-width, 1px)*-1);height:var(--mc-tabs-size-highlight-height,4px);left:0;right:0}.mc-tab-group{box-sizing:border-box;display:flex;flex-direction:column;text-align:center;white-space:nowrap}.mc-tab-group.mc-tab-group_inverted-header{flex-direction:column-reverse}.mc-tab-label{align-items:center;border-bottom-style:solid;border-bottom-width:var(--mc-tabs-size-border-width,1px);border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px);border-top-style:solid;border-top-width:var(--mc-tabs-size-border-width,1px);box-sizing:border-box;cursor:pointer;display:inline-flex;height:var(--mc-tabs-size-height,40px);justify-content:center;outline:none;padding-left:var(--mc-tabs-size-padding-horizontal,16px);padding-right:var(--mc-tabs-size-padding-horizontal,16px);position:relative;text-align:center;white-space:nowrap}.mc-tab-label.cdk-keyboard-focused{z-index:1}.mc-tab-label.cdk-keyboard-focused:after{border-bottom:none;border-style:solid;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px);border-width:calc(var(--mc-tabs-size-border-width, $tabs-size-border-width)*2);bottom:calc(var(--mc-tabs-size-border-width, 1px)*-1);left:calc(var(--mc-tabs-size-border-width, 1px)*-1);right:calc(var(--mc-tabs-size-border-width, 1px)*-1);top:-calc(var(--mc-tabs-size-border-width,$tabs-size-border-width)*2)}.mc-tab-label.mc-disabled{pointer-events:none}.mc-tab-label .mc-tab-overlay{bottom:0;left:0;pointer-events:none;position:absolute;right:0;top:-1px}.mc-tab-label.mc-active{border-style:solid;border-width:var(--mc-tabs-size-border-width,1px);padding-left:calc(var(--mc-tabs-size-padding-horizontal, 16px) - var(--mc-tabs-size-border-width, 1px));padding-right:calc(var(--mc-tabs-size-padding-horizontal, 16px) - var(--mc-tabs-size-border-width, 1px))}.mc-tab-label.mc-active.cdk-keyboard-focused:after{left:-calc(var(--mc-tabs-size-border-width,$tabs-size-border-width)*2);right:-calc(var(--mc-tabs-size-border-width,$tabs-size-border-width)*2);z-index:1}.mc-tab-label .mc-tab-overlay{border-top:var(--mc-tabs-size-border-width,1px) solid transparent;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px)}.mc-tab-light-label{align-items:center;border-bottom-style:solid;border-bottom-width:var(--mc-tabs-size-border-width,1px);box-sizing:border-box;cursor:pointer;display:inline-flex;height:var(--mc-tabs-size-height,40px);justify-content:center;outline:none;padding-left:var(--mc-tabs-size-padding-horizontal,16px);padding-right:var(--mc-tabs-size-padding-horizontal,16px);position:relative;text-align:center;white-space:nowrap}.mc-tab-light-label.cdk-keyboard-focused{z-index:1}.mc-tab-light-label.cdk-keyboard-focused:after{border-bottom:none;border-style:solid;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px);border-width:calc(var(--mc-tabs-size-border-width, $tabs-size-border-width)*2);bottom:calc(var(--mc-tabs-size-border-width, 1px)*-1);left:calc(var(--mc-tabs-size-border-width, 1px)*-1);right:calc(var(--mc-tabs-size-border-width, 1px)*-1);top:-calc(var(--mc-tabs-size-border-width,$tabs-size-border-width)*2)}.mc-tab-light-label.mc-disabled{pointer-events:none}.mc-tab-light-label .mc-tab-overlay{bottom:0;left:0;pointer-events:none;right:0;top:-1px}.mc-tab-light-label.cdk-keyboard-focused+:hover:before{left:calc(var(--mc-tabs-size-border-width, $tabs-size-border-width)*2 - var(--mc-tabs-size-border-width, 1px))}.mc-tab-light-label.cdk-keyboard-focused:after{top:calc(var(--mc-tabs-size-border-width, 1px)*-1)}.mc-tab-light-label .mc-tab-overlay{position:absolute;top:0}.mc-tab-header__content{padding:1px 1px 0}.mc-tab-body__wrapper{display:flex;overflow:hidden;position:relative}.mc-tab-body{bottom:0;display:block;flex-basis:100%;left:0;overflow:hidden;position:absolute;right:0;top:0}.mc-tab-body.mc-tab-body__active{flex-grow:1;overflow-x:hidden;overflow-y:auto;position:relative;z-index:1}.mc-tab-group.mc-tab-group_dynamic-height .mc-tab-body.mc-tab-body__active{overflow-y:hidden}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWdyb3VwLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvdGFicy8iLCJzb3VyY2VzIjpbInRhYi1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BGLE9BQU8sRUFHSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLGNBQWMsRUFDZCxNQUFNLEVBQ04sUUFBUSxFQUNSLFNBQVMsRUFBRSxTQUFTLEVBQ3ZCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHSCxVQUFVLEVBQ1YsYUFBYSxFQUNoQixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDOUIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQU8zQyxNQUFNLE9BQU8sb0JBQW9COzs7WUFKaEMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw4REFBOEQ7Z0JBQ3hFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRTthQUN4Qzs7QUFPRCxNQUFNLE9BQU8sMEJBQTBCOzs7WUFKdEMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw0RUFBNEU7Z0JBQ3RGLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxrQ0FBa0MsRUFBRTthQUN0RDs7QUFPRCxNQUFNLE9BQU8sdUJBQXVCOzs7WUFKbkMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzRUFBc0U7Z0JBQ2hGLElBQUksRUFB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O0lBRzlDLDBDQUFrRDs7Ozs7SUFDbEQsb0NBQXdDOzs7OztJQUN4QyxvQ0FBNkM7Ozs7O0lBRTdDLDZCQUF3Qjs7Ozs7SUFJcEIsdUNBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5LCBjb2VyY2VOdW1iZXJQcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudENoZWNrZWQsXG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBJbmplY3QsXG4gICAgT3B0aW9uYWwsXG4gICAgRGlyZWN0aXZlLCBBdHRyaWJ1dGVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENhbkNvbG9yLFxuICAgIENhbkNvbG9yQ3RvcixcbiAgICBtaXhpbkNvbG9yLFxuICAgIG1peGluRGlzYWJsZWRcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgbWVyZ2UsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBNY1RhYiB9IGZyb20gJy4vdGFiJztcbmltcG9ydCB7IE1jVGFiSGVhZGVyIH0gZnJvbSAnLi90YWItaGVhZGVyJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLXRhYi1ncm91cFttYy1saWdodC10YWJzXSwgW21jLXRhYi1uYXYtYmFyXVttYy1saWdodC10YWJzXScsXG4gICAgaG9zdDogeyBjbGFzczogJ21jLXRhYi1ncm91cF9saWdodCcgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0xpZ2h0VGFic0Nzc1N0eWxlciB7IH1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy10YWItZ3JvdXBbbWMtYWxpZ24tdGFicy1jZW50ZXJdLCBbbWMtdGFiLW5hdi1iYXJdW21jLWFsaWduLXRhYnMtY2VudGVyXScsXG4gICAgaG9zdDogeyBjbGFzczogJ21jLXRhYi1ncm91cF9hbGlnbi1sYWJlbHMtY2VudGVyJyB9XG59KVxuZXhwb3J0IGNsYXNzIE1jQWxpZ25UYWJzQ2VudGVyQ3NzU3R5bGVyIHsgfVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLXRhYi1ncm91cFttYy1hbGlnbi10YWJzLWVuZF0sIFttYy10YWItbmF2LWJhcl1bbWMtYWxpZ24tdGFicy1lbmRdJyxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtdGFiLWdyb3VwX2FsaWduLWxhYmVscy1lbmQnIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNBbGlnblRhYnNFbmRDc3NTdHlsZXIgeyB9XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFiLWdyb3VwW21jLXN0cmV0Y2gtdGFic10sIFttYy10YWItbmF2LWJhcl1bbWMtc3RyZXRjaC10YWJzXScsXG4gICAgaG9zdDogeyBjbGFzczogJ21jLXRhYi1ncm91cF9zdHJldGNoLWxhYmVscycgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1N0cmV0Y2hUYWJzQ3NzU3R5bGVyIHsgfVxuXG4vKiogVXNlZCB0byBnZW5lcmF0ZSB1bmlxdWUgSUQncyBmb3IgZWFjaCB0YWIgY29tcG9uZW50ICovXG5sZXQgbmV4dElkID0gMDtcblxuLyoqIEEgc2ltcGxlIGNoYW5nZSBldmVudCBlbWl0dGVkIG9uIGZvY3VzIG9yIHNlbGVjdGlvbiBjaGFuZ2VzLiAqL1xuZXhwb3J0IGNsYXNzIE1jVGFiQ2hhbmdlRXZlbnQge1xuICAgIC8qKiBJbmRleCBvZiB0aGUgY3VycmVudGx5LXNlbGVjdGVkIHRhYi4gKi9cbiAgICBpbmRleDogbnVtYmVyO1xuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnRseS1zZWxlY3RlZCB0YWIuICovXG4gICAgdGFiOiBNY1RhYjtcbn1cblxuLyoqIFBvc3NpYmxlIHBvc2l0aW9ucyBmb3IgdGhlIHRhYiBoZWFkZXIuICovXG5leHBvcnQgdHlwZSBNY1RhYkhlYWRlclBvc2l0aW9uID0gJ2Fib3ZlJyB8ICdiZWxvdyc7XG5cbi8qKiBPYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byBjb25maWd1cmUgdGhlIGRlZmF1bHQgb3B0aW9ucyBmb3IgdGhlIHRhYnMgbW9kdWxlLiAqL1xuZXhwb3J0IGludGVyZmFjZSBJTWNUYWJzQ29uZmlnIHtcbiAgICAvKiogRHVyYXRpb24gZm9yIHRoZSB0YWIgYW5pbWF0aW9uLiBNdXN0IGJlIGEgdmFsaWQgQ1NTIHZhbHVlIChlLmcuIDYwMG1zKS4gKi9cbiAgICBhbmltYXRpb25EdXJhdGlvbj86IHN0cmluZztcbn1cblxuLyoqIEluamVjdGlvbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHByb3ZpZGUgdGhlIGRlZmF1bHQgb3B0aW9ucyB0aGUgdGFicyBtb2R1bGUuICovXG5leHBvcnQgY29uc3QgTUNfVEFCU19DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignTUNfVEFCU19DT05GSUcnKTtcblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNY1RhYkdyb3VwLlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjbGFzcyBNY1RhYkdyb3VwQmFzZSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7IH1cbn1cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jVGFiR3JvdXBNaXhpbkJhc2U6IENhbkNvbG9yQ3RvciAmIHR5cGVvZiBNY1RhYkdyb3VwQmFzZSA9IG1peGluQ29sb3IobWl4aW5EaXNhYmxlZChNY1RhYkdyb3VwQmFzZSkpO1xuXG4vKipcbiAqIFRhYi1ncm91cCBjb21wb25lbnQuICBTdXBwb3J0cyBiYXNpYyB0YWIgcGFpcnMgKGxhYmVsICsgY29udGVudCkgYW5kIGluY2x1ZGVzXG4gKiBrZXlib2FyZCBuYXZpZ2F0aW9uLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRhYi1ncm91cCcsXG4gICAgZXhwb3J0QXM6ICdtY1RhYkdyb3VwJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3RhYi1ncm91cC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsndGFiLWdyb3VwLnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGlucHV0czogWydjb2xvcicsICdkaXNhYmxlZCddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy10YWItZ3JvdXAnLFxuICAgICAgICAnW2NsYXNzLm1jLXRhYi1ncm91cF9keW5hbWljLWhlaWdodF0nOiAnZHluYW1pY0hlaWdodCcsXG4gICAgICAgICdbY2xhc3MubWMtdGFiLWdyb3VwX2ludmVydGVkLWhlYWRlcl0nOiAnaGVhZGVyUG9zaXRpb24gPT09IFwiYmVsb3dcIidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVGFiR3JvdXAgZXh0ZW5kcyBNY1RhYkdyb3VwTWl4aW5CYXNlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlckNvbnRlbnRDaGVja2VkLCBPbkRlc3Ryb3ksIENhbkNvbG9yIHtcbiAgICBsaWdodFRhYjogYm9vbGVhbjtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSB0YWIgZ3JvdXAgc2hvdWxkIGdyb3cgdG8gdGhlIHNpemUgb2YgdGhlIGFjdGl2ZSB0YWIuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgZHluYW1pY0hlaWdodCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2R5bmFtaWNIZWlnaHQ7IH1cbiAgICBzZXQgZHluYW1pY0hlaWdodCh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9keW5hbWljSGVpZ2h0ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuXG4gICAgLyoqIFRoZSBpbmRleCBvZiB0aGUgYWN0aXZlIHRhYi4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RlZEluZGV4KCk6IG51bWJlciB8IG51bGwgeyByZXR1cm4gdGhpcy5fc2VsZWN0ZWRJbmRleDsgfVxuICAgIHNldCBzZWxlY3RlZEluZGV4KHZhbHVlOiBudW1iZXIgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuaW5kZXhUb1NlbGVjdCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlLCBudWxsKTtcbiAgICB9XG5cbiAgICBAQ29udGVudENoaWxkcmVuKE1jVGFiKSB0YWJzOiBRdWVyeUxpc3Q8TWNUYWI+O1xuXG4gICAgQFZpZXdDaGlsZCgndGFiQm9keVdyYXBwZXInLCB7c3RhdGljOiBmYWxzZX0pIHRhYkJvZHlXcmFwcGVyOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgndGFiSGVhZGVyJywge3N0YXRpYzogZmFsc2V9KSB0YWJIZWFkZXI6IE1jVGFiSGVhZGVyO1xuXG4gICAgLyoqIFBvc2l0aW9uIG9mIHRoZSB0YWIgaGVhZGVyLiAqL1xuICAgIEBJbnB1dCgpIGhlYWRlclBvc2l0aW9uOiBNY1RhYkhlYWRlclBvc2l0aW9uID0gJ2Fib3ZlJztcblxuICAgIC8qKiBEdXJhdGlvbiBmb3IgdGhlIHRhYiBhbmltYXRpb24uIE11c3QgYmUgYSB2YWxpZCBDU1MgdmFsdWUgKGUuZy4gNjAwbXMpLiAqL1xuICAgIEBJbnB1dCgpIGFuaW1hdGlvbkR1cmF0aW9uOiBzdHJpbmc7XG5cbiAgICAvKiogT3V0cHV0IHRvIGVuYWJsZSBzdXBwb3J0IGZvciB0d28td2F5IGJpbmRpbmcgb24gYFsoc2VsZWN0ZWRJbmRleCldYCAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3RlZEluZGV4Q2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiBmb2N1cyBoYXMgY2hhbmdlZCB3aXRoaW4gYSB0YWIgZ3JvdXAuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGZvY3VzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TWNUYWJDaGFuZ2VFdmVudD4gPVxuICAgICAgICBuZXcgRXZlbnRFbWl0dGVyPE1jVGFiQ2hhbmdlRXZlbnQ+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBib2R5IGFuaW1hdGlvbiBoYXMgY29tcGxldGVkICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGFuaW1hdGlvbkRvbmU6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHRhYiBzZWxlY3Rpb24gaGFzIGNoYW5nZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGVkVGFiQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TWNUYWJDaGFuZ2VFdmVudD4gPVxuICAgICAgICBuZXcgRXZlbnRFbWl0dGVyPE1jVGFiQ2hhbmdlRXZlbnQ+KHRydWUpO1xuXG4gICAgLyoqIFRoZSB0YWIgaW5kZXggdGhhdCBzaG91bGQgYmUgc2VsZWN0ZWQgYWZ0ZXIgdGhlIGNvbnRlbnQgaGFzIGJlZW4gY2hlY2tlZC4gKi9cbiAgICBwcml2YXRlIGluZGV4VG9TZWxlY3Q6IG51bWJlciB8IG51bGwgPSAwO1xuXG4gICAgLyoqIFNuYXBzaG90IG9mIHRoZSBoZWlnaHQgb2YgdGhlIHRhYiBib2R5IHdyYXBwZXIgYmVmb3JlIGFub3RoZXIgdGFiIGlzIGFjdGl2YXRlZC4gKi9cbiAgICBwcml2YXRlIHRhYkJvZHlXcmFwcGVySGVpZ2h0OiBudW1iZXIgPSAwO1xuXG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byB0YWJzIGJlaW5nIGFkZGVkL3JlbW92ZWQuICovXG4gICAgcHJpdmF0ZSB0YWJzU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byBjaGFuZ2VzIGluIHRoZSB0YWIgbGFiZWxzLiAqL1xuICAgIHByaXZhdGUgdGFiTGFiZWxTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgcHJpdmF0ZSBfZHluYW1pY0hlaWdodDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX3NlbGVjdGVkSW5kZXg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBncm91cElkOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIEBBdHRyaWJ1dGUoJ21jLWxpZ2h0LXRhYnMnKSBsaWdodFRhYnM6IHN0cmluZyxcbiAgICAgICAgQEluamVjdChNQ19UQUJTX0NPTkZJRykgQE9wdGlvbmFsKCkgZGVmYXVsdENvbmZpZz86IElNY1RhYnNDb25maWdcbiAgICApIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG5cbiAgICAgICAgdGhpcy5saWdodFRhYiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShsaWdodFRhYnMpO1xuXG4gICAgICAgIHRoaXMuZ3JvdXBJZCA9IG5leHRJZCsrO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbkR1cmF0aW9uID0gZGVmYXVsdENvbmZpZyAmJiBkZWZhdWx0Q29uZmlnLmFuaW1hdGlvbkR1cmF0aW9uID9cbiAgICAgICAgICAgIGRlZmF1bHRDb25maWcuYW5pbWF0aW9uRHVyYXRpb24gOiAnMG1zJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZnRlciB0aGUgY29udGVudCBpcyBjaGVja2VkLCB0aGlzIGNvbXBvbmVudCBrbm93cyB3aGF0IHRhYnMgaGF2ZSBiZWVuIGRlZmluZWRcbiAgICAgKiBhbmQgd2hhdCB0aGUgc2VsZWN0ZWQgaW5kZXggc2hvdWxkIGJlLiBUaGlzIGlzIHdoZXJlIHdlIGNhbiBrbm93IGV4YWN0bHkgd2hhdCBwb3NpdGlvblxuICAgICAqIGVhY2ggdGFiIHNob3VsZCBiZSBpbiBhY2NvcmRpbmcgdG8gdGhlIG5ldyBzZWxlY3RlZCBpbmRleCwgYW5kIGFkZGl0aW9uYWxseSB3ZSBrbm93IGhvd1xuICAgICAqIGEgbmV3IHNlbGVjdGVkIHRhYiBzaG91bGQgdHJhbnNpdGlvbiBpbiAoZnJvbSB0aGUgbGVmdCBvciByaWdodCkuXG4gICAgICovXG4gICAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgICAgICAvLyBEb24ndCBjbGFtcCB0aGUgYGluZGV4VG9TZWxlY3RgIGltbWVkaWF0ZWx5IGluIHRoZSBzZXR0ZXIgYmVjYXVzZSBpdCBjYW4gaGFwcGVuIHRoYXRcbiAgICAgICAgLy8gdGhlIGFtb3VudCBvZiB0YWJzIGNoYW5nZXMgYmVmb3JlIHRoZSBhY3R1YWwgY2hhbmdlIGRldGVjdGlvbiBydW5zLlxuICAgICAgICBjb25zdCBpbmRleFRvU2VsZWN0ID0gdGhpcy5pbmRleFRvU2VsZWN0ID0gdGhpcy5jbGFtcFRhYkluZGV4KHRoaXMuaW5kZXhUb1NlbGVjdCk7XG5cbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSBjaGFuZ2UgaW4gc2VsZWN0ZWQgaW5kZXgsIGVtaXQgYSBjaGFuZ2UgZXZlbnQuIFNob3VsZCBub3QgdHJpZ2dlciBpZlxuICAgICAgICAvLyB0aGUgc2VsZWN0ZWQgaW5kZXggaGFzIG5vdCB5ZXQgYmVlbiBpbml0aWFsaXplZC5cbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSW5kZXggIT09IGluZGV4VG9TZWxlY3QpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzRmlyc3RSdW4gPSB0aGlzLl9zZWxlY3RlZEluZGV4ID09IG51bGw7XG5cbiAgICAgICAgICAgIGlmICghaXNGaXJzdFJ1bikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUYWJDaGFuZ2UuZW1pdCh0aGlzLmNyZWF0ZUNoYW5nZUV2ZW50KGluZGV4VG9TZWxlY3QpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ2hhbmdpbmcgdGhlc2UgdmFsdWVzIGFmdGVyIGNoYW5nZSBkZXRlY3Rpb24gaGFzIHJ1blxuICAgICAgICAgICAgLy8gc2luY2UgdGhlIGNoZWNrZWQgY29udGVudCBtYXkgY29udGFpbiByZWZlcmVuY2VzIHRvIHRoZW0uXG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhYnMuZm9yRWFjaCgodGFiLCBpbmRleCkgPT4gdGFiLmlzQWN0aXZlID0gaW5kZXggPT09IGluZGV4VG9TZWxlY3QpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFpc0ZpcnN0UnVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleENoYW5nZS5lbWl0KGluZGV4VG9TZWxlY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0dXAgdGhlIHBvc2l0aW9uIGZvciBlYWNoIHRhYiBhbmQgb3B0aW9uYWxseSBzZXR1cCBhbiBvcmlnaW4gb24gdGhlIG5leHQgc2VsZWN0ZWQgdGFiLlxuICAgICAgICB0aGlzLnRhYnMuZm9yRWFjaCgodGFiOiBNY1RhYiwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgdGFiLnBvc2l0aW9uID0gaW5kZXggLSBpbmRleFRvU2VsZWN0O1xuXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhbHJlYWR5IGEgc2VsZWN0ZWQgdGFiLCB0aGVuIHNldCB1cCBhbiBvcmlnaW4gZm9yIHRoZSBuZXh0IHNlbGVjdGVkIHRhYlxuICAgICAgICAgICAgLy8gaWYgaXQgZG9lc24ndCBoYXZlIG9uZSBhbHJlYWR5LlxuICAgICAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSW5kZXggIT0gbnVsbCAmJiB0YWIucG9zaXRpb24gPT09IDAgJiYgIXRhYi5vcmlnaW4pIHtcbiAgICAgICAgICAgICAgICB0YWIub3JpZ2luID0gaW5kZXhUb1NlbGVjdCAtIHRoaXMuX3NlbGVjdGVkSW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZEluZGV4ICE9PSBpbmRleFRvU2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gaW5kZXhUb1NlbGVjdDtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlVG9UYWJMYWJlbHMoKTtcblxuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gY2hhbmdlcyBpbiB0aGUgYW1vdW50IG9mIHRhYnMsIGluIG9yZGVyIHRvIGJlXG4gICAgICAgIC8vIGFibGUgdG8gcmUtcmVuZGVyIHRoZSBjb250ZW50IGFzIG5ldyB0YWJzIGFyZSBhZGRlZCBvciByZW1vdmVkLlxuICAgICAgICB0aGlzLnRhYnNTdWJzY3JpcHRpb24gPSB0aGlzLnRhYnMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5kZXhUb1NlbGVjdCA9IHRoaXMuY2xhbXBUYWJJbmRleCh0aGlzLmluZGV4VG9TZWxlY3QpO1xuXG4gICAgICAgICAgICAvLyBNYWludGFpbiB0aGUgcHJldmlvdXNseS1zZWxlY3RlZCB0YWIgaWYgYSBuZXcgdGFiIGlzIGFkZGVkIG9yIHJlbW92ZWQgYW5kIHRoZXJlIGlzIG5vXG4gICAgICAgICAgICAvLyBleHBsaWNpdCBjaGFuZ2UgdGhhdCBzZWxlY3RzIGEgZGlmZmVyZW50IHRhYi5cbiAgICAgICAgICAgIGlmIChpbmRleFRvU2VsZWN0ID09PSB0aGlzLl9zZWxlY3RlZEluZGV4KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFicyA9IHRoaXMudGFicy50b0FycmF5KCk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhYnNbaV0uaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFzc2lnbiBib3RoIHRvIHRoZSBgX2luZGV4VG9TZWxlY3RgIGFuZCBgX3NlbGVjdGVkSW5kZXhgIHNvIHdlIGRvbid0IGZpcmUgYSBjaGFuZ2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBldmVudCwgb3RoZXJ3aXNlIHRoZSBjb25zdW1lciBtYXkgZW5kIHVwIGluIGFuIGluZmluaXRlIGxvb3AgaW4gc29tZSBlZGdlIGNhc2VzIGxpa2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZGluZyBhIHRhYiB3aXRoaW4gdGhlIGBzZWxlY3RlZEluZGV4Q2hhbmdlYCBldmVudC5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhUb1NlbGVjdCA9IHRoaXMuX3NlbGVjdGVkSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlVG9UYWJMYWJlbHMoKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnRhYnNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy50YWJMYWJlbFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGZvY3VzQ2hhbmdlZChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZm9jdXNDaGFuZ2UuZW1pdCh0aGlzLmNyZWF0ZUNoYW5nZUV2ZW50KGluZGV4KSk7XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgYSB1bmlxdWUgaWQgZm9yIGVhY2ggdGFiIGxhYmVsIGVsZW1lbnQgKi9cbiAgICBnZXRUYWJMYWJlbElkKGk6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgbWMtdGFiLWxhYmVsLSR7dGhpcy5ncm91cElkfS0ke2l9YDtcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyBhIHVuaXF1ZSBpZCBmb3IgZWFjaCB0YWIgY29udGVudCBlbGVtZW50ICovXG4gICAgZ2V0VGFiQ29udGVudElkKGk6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgbWMtdGFiLWNvbnRlbnQtJHt0aGlzLmdyb3VwSWR9LSR7aX1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGhlaWdodCBvZiB0aGUgYm9keSB3cmFwcGVyIHRvIHRoZSBoZWlnaHQgb2YgdGhlIGFjdGl2YXRpbmcgdGFiIGlmIGR5bmFtaWNcbiAgICAgKiBoZWlnaHQgcHJvcGVydHkgaXMgdHJ1ZS5cbiAgICAgKi9cbiAgICBzZXRUYWJCb2R5V3JhcHBlckhlaWdodCh0YWJIZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX2R5bmFtaWNIZWlnaHQgfHwgIXRoaXMudGFiQm9keVdyYXBwZXJIZWlnaHQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgY29uc3Qgd3JhcHBlcjogSFRNTEVsZW1lbnQgPSB0aGlzLnRhYkJvZHlXcmFwcGVyLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgd3JhcHBlci5zdHlsZS5oZWlnaHQgPSBgJHt0aGlzLnRhYkJvZHlXcmFwcGVySGVpZ2h0fXB4YDtcblxuICAgICAgICAvLyBUaGlzIGNvbmRpdGlvbmFsIGZvcmNlcyB0aGUgYnJvd3NlciB0byBwYWludCB0aGUgaGVpZ2h0IHNvIHRoYXRcbiAgICAgICAgLy8gdGhlIGFuaW1hdGlvbiB0byB0aGUgbmV3IGhlaWdodCBjYW4gaGF2ZSBhbiBvcmlnaW4uXG4gICAgICAgIGlmICh0aGlzLnRhYkJvZHlXcmFwcGVyLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0KSB7XG4gICAgICAgICAgICB3cmFwcGVyLnN0eWxlLmhlaWdodCA9IGAke3RhYkhlaWdodH1weGA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogUmVtb3ZlcyB0aGUgaGVpZ2h0IG9mIHRoZSB0YWIgYm9keSB3cmFwcGVyLiAqL1xuICAgIHJlbW92ZVRhYkJvZHlXcmFwcGVySGVpZ2h0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhYkJvZHlXcmFwcGVySGVpZ2h0ID0gdGhpcy50YWJCb2R5V3JhcHBlci5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgdGhpcy50YWJCb2R5V3JhcHBlci5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9ICcnO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbkRvbmUuZW1pdCgpO1xuICAgIH1cblxuICAgIC8qKiBIYW5kbGUgY2xpY2sgZXZlbnRzLCBzZXR0aW5nIG5ldyBzZWxlY3RlZCBpbmRleCBpZiBhcHByb3ByaWF0ZS4gKi9cbiAgICBoYW5kbGVDbGljayh0YWI6IE1jVGFiLCB0YWJIZWFkZXI6IE1jVGFiSGVhZGVyLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICghdGFiLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0YWJIZWFkZXIuZm9jdXNJbmRleCA9IGluZGV4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFJldHJpZXZlcyB0aGUgdGFiaW5kZXggZm9yIHRoZSB0YWIuICovXG4gICAgZ2V0VGFiSW5kZXgodGFiOiBNY1RhYiwgaW5kZXg6IG51bWJlcik6IG51bWJlciB8IG51bGwge1xuICAgICAgICBpZiAodGFiLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSW5kZXggPT09IGluZGV4ID8gMCA6IC0xO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQ2hhbmdlRXZlbnQoaW5kZXg6IG51bWJlcik6IE1jVGFiQ2hhbmdlRXZlbnQge1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBNY1RhYkNoYW5nZUV2ZW50KCk7XG4gICAgICAgIGV2ZW50LmluZGV4ID0gaW5kZXg7XG4gICAgICAgIGlmICh0aGlzLnRhYnMgJiYgdGhpcy50YWJzLmxlbmd0aCkge1xuICAgICAgICAgICAgZXZlbnQudGFiID0gdGhpcy50YWJzLnRvQXJyYXkoKVtpbmRleF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlcyB0byBjaGFuZ2VzIGluIHRoZSB0YWIgbGFiZWxzLiBUaGlzIGlzIG5lZWRlZCwgYmVjYXVzZSB0aGUgQElucHV0IGZvciB0aGUgbGFiZWwgaXNcbiAgICAgKiBvbiB0aGUgTWNUYWIgY29tcG9uZW50LCB3aGVyZWFzIHRoZSBkYXRhIGJpbmRpbmcgaXMgaW5zaWRlIHRoZSBNY1RhYkdyb3VwLiBJbiBvcmRlciBmb3IgdGhlXG4gICAgICogYmluZGluZyB0byBiZSB1cGRhdGVkLCB3ZSBuZWVkIHRvIHN1YnNjcmliZSB0byBjaGFuZ2VzIGluIGl0IGFuZCB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb25cbiAgICAgKiBtYW51YWxseS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHN1YnNjcmliZVRvVGFiTGFiZWxzKCkge1xuICAgICAgICBpZiAodGhpcy50YWJMYWJlbFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy50YWJMYWJlbFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50YWJMYWJlbFN1YnNjcmlwdGlvbiA9IG1lcmdlKC4uLnRoaXMudGFicy5tYXAoKHRhYikgPT4gdGFiLnN0YXRlQ2hhbmdlcykpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpO1xuICAgIH1cblxuICAgIC8qKiBDbGFtcHMgdGhlIGdpdmVuIGluZGV4IHRvIHRoZSBib3VuZHMgb2YgMCBhbmQgdGhlIHRhYnMgbGVuZ3RoLiAqL1xuICAgIHByaXZhdGUgY2xhbXBUYWJJbmRleChpbmRleDogbnVtYmVyIHwgbnVsbCk6IG51bWJlciB7XG4gICAgICAgIC8vIE5vdGUgdGhlIGB8fCAwYCwgd2hpY2ggZW5zdXJlcyB0aGF0IHZhbHVlcyBsaWtlIE5hTiBjYW4ndCBnZXQgdGhyb3VnaFxuICAgICAgICAvLyBhbmQgd2hpY2ggd291bGQgb3RoZXJ3aXNlIHRocm93IHRoZSBjb21wb25lbnQgaW50byBhbiBpbmZpbml0ZSBsb29wXG4gICAgICAgIC8vIChzaW5jZSBNY2gubWF4KE5hTiwgMCkgPT09IE5hTikuXG4gICAgICAgIHJldHVybiBNYXRoLm1pbih0aGlzLnRhYnMubGVuZ3RoIC0gMSwgTWF0aC5tYXgoaW5kZXggfHwgMCwgMCkpO1xuICAgIH1cbn1cbiJdfQ==