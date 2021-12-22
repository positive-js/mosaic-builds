import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewEncapsulation, InjectionToken, Inject, Optional, Directive, Attribute } from '@angular/core';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
import { merge, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { McTabHeader } from './tab-header.component';
import { McTab } from './tab.component';
import * as i0 from "@angular/core";
import * as i1 from "./tab-header.component";
import * as i2 from "./tab-body.component";
import * as i3 from "@angular/common";
import * as i4 from "./tab-label-wrapper.directive";
import * as i5 from "@angular/cdk/a11y";
import * as i6 from "@ptsecurity/mosaic/tooltip";
import * as i7 from "@angular/cdk/portal";
export class McOldTabsCssStyler {
}
/** @nocollapse */ /** @nocollapse */ McOldTabsCssStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McOldTabsCssStyler, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McOldTabsCssStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: McOldTabsCssStyler, selector: "mc-tab-group[mc-old-tabs]", host: { classAttribute: "mc-tab-group_old" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McOldTabsCssStyler, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-tab-group[mc-old-tabs]',
                    host: { class: 'mc-tab-group_old' }
                }]
        }] });
export class McAlignTabsCenterCssStyler {
}
/** @nocollapse */ /** @nocollapse */ McAlignTabsCenterCssStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McAlignTabsCenterCssStyler, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McAlignTabsCenterCssStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: McAlignTabsCenterCssStyler, selector: "mc-tab-group[mc-align-tabs-center], [mc-tab-nav-bar][mc-align-tabs-center]", host: { classAttribute: "mc-tab-group_align-labels-center" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McAlignTabsCenterCssStyler, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-tab-group[mc-align-tabs-center], [mc-tab-nav-bar][mc-align-tabs-center]',
                    host: { class: 'mc-tab-group_align-labels-center' }
                }]
        }] });
export class McAlignTabsEndCssStyler {
}
/** @nocollapse */ /** @nocollapse */ McAlignTabsEndCssStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McAlignTabsEndCssStyler, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McAlignTabsEndCssStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: McAlignTabsEndCssStyler, selector: "mc-tab-group[mc-align-tabs-end], [mc-tab-nav-bar][mc-align-tabs-end]", host: { classAttribute: "mc-tab-group_align-labels-end" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McAlignTabsEndCssStyler, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-tab-group[mc-align-tabs-end], [mc-tab-nav-bar][mc-align-tabs-end]',
                    host: { class: 'mc-tab-group_align-labels-end' }
                }]
        }] });
export class McStretchTabsCssStyler {
}
/** @nocollapse */ /** @nocollapse */ McStretchTabsCssStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McStretchTabsCssStyler, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McStretchTabsCssStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: McStretchTabsCssStyler, selector: "mc-tab-group[mc-stretch-tabs], [mc-tab-nav-bar][mc-stretch-tabs]", host: { classAttribute: "mc-tab-group_stretch-labels" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McStretchTabsCssStyler, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-tab-group[mc-stretch-tabs], [mc-tab-nav-bar][mc-stretch-tabs]',
                    host: { class: 'mc-tab-group_stretch-labels' }
                }]
        }] });
export class McVerticalTabsCssStyler {
}
/** @nocollapse */ /** @nocollapse */ McVerticalTabsCssStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McVerticalTabsCssStyler, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McVerticalTabsCssStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: McVerticalTabsCssStyler, selector: "mc-tab-group[vertical], [mc-tab-nav-bar][vertical]", host: { classAttribute: "mc-tab-group_vertical" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McVerticalTabsCssStyler, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-tab-group[vertical], [mc-tab-nav-bar][vertical]',
                    host: { class: 'mc-tab-group_vertical' }
                }]
        }] });
/** Used to generate unique ID's for each tab component */
let nextId = 0;
/** A simple change event emitted on focus or selection changes. */
export class McTabChangeEvent {
}
/** Injection token that can be used to provide the default options the tabs module. */
export const MC_TABS_CONFIG = new InjectionToken('MC_TABS_CONFIG');
// Boilerplate for applying mixins to McTabGroup.
/** @docs-private */
export class McTabGroupBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
export const McTabGroupMixinBase = mixinDisabled(McTabGroupBase);
/**
 * Tab-group component.  Supports basic tab pairs (label + content) and includes
 * keyboard navigation.
 */
export class McTabGroup extends McTabGroupMixinBase {
    constructor(elementRef, changeDetectorRef, lightTabs, vertical, defaultConfig) {
        super(elementRef);
        this.changeDetectorRef = changeDetectorRef;
        this.resizeStream = new Subject();
        this._dynamicHeight = false;
        this._selectedIndex = null;
        /** Position of the tab header. */
        this.headerPosition = 'above';
        /** Output to enable support for two-way binding on `[(selectedIndex)]` */
        this.selectedIndexChange = new EventEmitter();
        /** Event emitted when focus has changed within a tab group. */
        this.focusChange = new EventEmitter();
        /** Event emitted when the body animation has completed */
        this.animationDone = new EventEmitter();
        /** Event emitted when the tab selection has changed. */
        this.selectedTabChange = new EventEmitter(true);
        /** The tab index that should be selected after the content has been checked. */
        this.indexToSelect = 0;
        /** Snapshot of the height of the tab body wrapper before another tab is activated. */
        this.tabBodyWrapperHeight = 0;
        /** Subscription to tabs being added/removed. */
        this.tabsSubscription = Subscription.EMPTY;
        /** Subscription to changes in the tab labels. */
        this.tabLabelSubscription = Subscription.EMPTY;
        this.resizeSubscription = Subscription.EMPTY;
        this.resizeDebounceInterval = 100;
        this.checkOverflow = () => {
            this.tabHeader.items
                .forEach((headerTab) => headerTab.checkOverflow());
        };
        this.oldTab = coerceBooleanProperty(lightTabs);
        this.vertical = coerceBooleanProperty(vertical);
        this.groupId = nextId++;
        this.animationDuration = defaultConfig?.animationDuration || '0ms';
        this.subscribeToResize();
    }
    /** Whether the tab group should grow to the size of the active tab. */
    get dynamicHeight() {
        return this._dynamicHeight;
    }
    set dynamicHeight(value) {
        this._dynamicHeight = coerceBooleanProperty(value);
    }
    /** The index of the active tab. */
    get selectedIndex() {
        return this._selectedIndex;
    }
    set selectedIndex(value) {
        this.indexToSelect = coerceNumberProperty(value, null);
    }
    /**
     * After the content is checked, this component knows what tabs have been defined
     * and what the selected index should be. This is where we can know exactly what position
     * each tab should be in according to the new selected index, and additionally we know how
     * a new selected tab should transition in (from the left or right).
     */
    ngAfterContentChecked() {
        // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
        // the amount of tabs changes before the actual change detection runs.
        const indexToSelect = this.indexToSelect = this.clampTabIndex(this.indexToSelect);
        // If there is a change in selected index, emit a change event. Should not trigger if
        // the selected index has not yet been initialized.
        if (this._selectedIndex !== indexToSelect) {
            const isFirstRun = this._selectedIndex == null;
            if (!isFirstRun) {
                this.selectedTabChange.emit(this.createChangeEvent(indexToSelect));
            }
            // Changing these values after change detection has run
            // since the checked content may contain references to them.
            Promise.resolve().then(() => {
                this.tabs.forEach((tab, index) => tab.isActive = index === indexToSelect);
                if (!isFirstRun) {
                    this.selectedIndexChange.emit(indexToSelect);
                }
            });
        }
        // Setup the position for each tab and optionally setup an origin on the next selected tab.
        this.tabs.forEach((tab, index) => {
            tab.position = index - indexToSelect;
            // If there is already a selected tab, then set up an origin for the next selected tab
            // if it doesn't have one already.
            if (this._selectedIndex != null && tab.position === 0 && !tab.origin) {
                tab.origin = indexToSelect - this._selectedIndex;
            }
        });
        if (this._selectedIndex !== indexToSelect) {
            this._selectedIndex = indexToSelect;
            this.changeDetectorRef.markForCheck();
        }
    }
    ngAfterContentInit() {
        this.subscribeToTabLabels();
        // Subscribe to changes in the amount of tabs, in order to be
        // able to re-render the content as new tabs are added or removed.
        this.tabsSubscription = this.tabs.changes
            .subscribe(() => {
            const indexToSelect = this.clampTabIndex(this.indexToSelect);
            // Maintain the previously-selected tab if a new tab is added or removed and there is no
            // explicit change that selects a different tab.
            if (indexToSelect === this._selectedIndex) {
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
        });
    }
    ngAfterViewInit() {
        this.checkOverflow();
    }
    ngOnDestroy() {
        this.tabsSubscription.unsubscribe();
        this.tabLabelSubscription.unsubscribe();
        this.resizeSubscription.unsubscribe();
    }
    focusChanged(index) {
        this.focusChange.emit(this.createChangeEvent(index));
    }
    /** Returns a unique id for each tab label element */
    getTabLabelId(i) {
        return `mc-tab-label-${this.groupId}-${i}`;
    }
    /** Returns a unique id for each tab content element */
    getTabContentId(i) {
        return `mc-tab-content-${this.groupId}-${i}`;
    }
    /**
     * Sets the height of the body wrapper to the height of the activating tab if dynamic
     * height property is true.
     */
    setTabBodyWrapperHeight(tabHeight) {
        if (!this._dynamicHeight || !this.tabBodyWrapperHeight) {
            return;
        }
        const wrapper = this.tabBodyWrapper.nativeElement;
        wrapper.style.height = `${this.tabBodyWrapperHeight}px`;
        // This conditional forces the browser to paint the height so that
        // the animation to the new height can have an origin.
        if (this.tabBodyWrapper.nativeElement.offsetHeight) {
            wrapper.style.height = `${tabHeight}px`;
        }
    }
    /** Removes the height of the tab body wrapper. */
    removeTabBodyWrapperHeight() {
        this.tabBodyWrapperHeight = this.tabBodyWrapper.nativeElement.clientHeight;
        this.tabBodyWrapper.nativeElement.style.height = '';
        this.animationDone.emit();
    }
    /** Handle click events, setting new selected index if appropriate. */
    handleClick(tab, tabHeader, index) {
        if (tab.disabled) {
            return;
        }
        this.selectedIndex = tabHeader.focusIndex = index;
    }
    /** Retrieves the tabindex for the tab. */
    getTabIndex(tab, index) {
        if (tab.disabled) {
            return null;
        }
        return this.selectedIndex === index ? 0 : -1;
    }
    createChangeEvent(index) {
        const event = new McTabChangeEvent();
        event.index = index;
        if (this.tabs && this.tabs.length) {
            event.tab = this.tabs.toArray()[index];
        }
        return event;
    }
    /**
     * Subscribes to changes in the tab labels. This is needed, because the @Input for the label is
     * on the McTab component, whereas the data binding is inside the McTabGroup. In order for the
     * binding to be updated, we need to subscribe to changes in it and trigger change detection
     * manually.
     */
    subscribeToTabLabels() {
        if (this.tabLabelSubscription) {
            this.tabLabelSubscription.unsubscribe();
        }
        this.tabLabelSubscription = merge(...this.tabs.map((tab) => tab.stateChanges))
            .subscribe(() => this.changeDetectorRef.markForCheck());
    }
    subscribeToResize() {
        if (!this.vertical) {
            return;
        }
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
        this.resizeSubscription = this.resizeStream
            .pipe(debounceTime(this.resizeDebounceInterval))
            .subscribe(this.checkOverflow);
    }
    /** Clamps the given index to the bounds of 0 and the tabs length. */
    clampTabIndex(index) {
        // Note the `|| 0`, which ensures that values like NaN can't get through
        // and which would otherwise throw the component into an infinite loop
        // (since Mch.max(NaN, 0) === NaN).
        return Math.min(this.tabs.length - 1, Math.max(index || 0, 0));
    }
}
/** @nocollapse */ /** @nocollapse */ McTabGroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McTabGroup, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: 'mc-old-tabs', attribute: true }, { token: 'vertical', attribute: true }, { token: MC_TABS_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McTabGroup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: McTabGroup, selector: "mc-tab-group", inputs: { disabled: "disabled", dynamicHeight: "dynamicHeight", selectedIndex: "selectedIndex", headerPosition: "headerPosition", animationDuration: "animationDuration" }, outputs: { selectedIndexChange: "selectedIndexChange", focusChange: "focusChange", animationDone: "animationDone", selectedTabChange: "selectedTabChange" }, host: { listeners: { "window:resize": "resizeStream.next()" }, properties: { "class.mc-tab-group_dynamic-height": "dynamicHeight", "class.mc-tab-group_inverted-header": "headerPosition === \"below\"" }, classAttribute: "mc-tab-group" }, queries: [{ propertyName: "tabs", predicate: McTab }], viewQueries: [{ propertyName: "tabBodyWrapper", first: true, predicate: ["tabBodyWrapper"], descendants: true }, { propertyName: "tabHeader", first: true, predicate: ["tabHeader"], descendants: true }], exportAs: ["mcTabGroup"], usesInheritance: true, ngImport: i0, template: "<mc-tab-header\n    #tabHeader\n    [vertical]=\"vertical\"\n    [selectedIndex]=\"selectedIndex\"\n    (indexFocused)=\"focusChanged($event)\"\n    (selectFocusedIndex)=\"selectedIndex = $event\">\n\n    <div class=\"mc-tab-label\"\n         mcTabLabelWrapper\n         cdkMonitorElementFocus\n         [attr.tabindex]=\"getTabIndex(tab, i)\"\n         [class.mc-tab-label_old]=\"oldTab\"\n         [class.mc-tab-label_horizontal]=\"!vertical && !oldTab\"\n         [class.mc-tab-label_vertical]=\"vertical && !oldTab\"\n         [class.mc-tab-label_empty]=\"tab.empty\"\n         [class.mc-active]=\"selectedIndex == i\"\n         *ngFor=\"let tab of tabs; let i = index\"\n         [tab]=\"tab\"\n         [id]=\"getTabLabelId(i)\"\n         [disabled]=\"tab.disabled\"\n         (click)=\"handleClick(tab, tabHeader, i)\"\n\n         [mcTooltip]=\"tab.tooltipTitle\"\n         [mcTooltipDisabled]=\"!tab.empty && !tab.isOverflown\"\n         [mcTrigger]=\"'hover, focus'\"\n         [mcPlacement]=\"tab.tooltipPlacement\">\n\n        <div #labelContent class=\"mc-tab-label__content\"\n            [class.mc-tab-label__template]=\"tab.templateLabel\">\n            <!-- If there is a label template, use it. -->\n            <ng-template [ngIf]=\"tab.templateLabel\">\n                <ng-template [cdkPortalOutlet]=\"tab.templateLabel\"></ng-template>\n            </ng-template>\n\n            <!-- If there is not a label template, fall back to the text label. -->\n            <ng-template [ngIf]=\"!tab.templateLabel\">{{ tab.textLabel }}</ng-template>\n        </div>\n\n        <div class=\"mc-tab-overlay\"></div>\n    </div>\n</mc-tab-header>\n\n<div class=\"mc-tab-body__wrapper\" #tabBodyWrapper>\n    <mc-tab-body\n        *ngFor=\"let tab of tabs; let i = index\"\n        [id]=\"getTabContentId(i)\"\n        [class.mc-tab-body__active]=\"selectedIndex == i\"\n        [content]=\"tab.content!\"\n        [position]=\"tab.position!\"\n        [origin]=\"tab.origin!\"\n        [animationDuration]=\"animationDuration\"\n        (onCentered)=\"removeTabBodyWrapperHeight()\"\n        (onCentering)=\"setTabBodyWrapperHeight($event)\">\n    </mc-tab-body>\n</div>\n", styles: [".mc-tab-group{display:flex;flex-direction:column;box-sizing:border-box;text-align:center;white-space:nowrap}.mc-tab-group.mc-tab-group_inverted-header{flex-direction:column-reverse}.mc-tab-group_vertical{flex-direction:row}.mc-tab-group_vertical .mc-tab-header__content{overflow-y:auto;padding-top:8px;padding-bottom:1px;border-right-width:1px;border-right-width:var(--mc-tabs-size-border-width, 1px);border-right-style:solid}.mc-tab-body__wrapper{display:flex;overflow:hidden;position:relative}.mc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;flex-basis:100%}.mc-tab-body.mc-tab-body__active{overflow-x:hidden;overflow-y:auto;position:relative;z-index:1;flex-grow:1}.mc-tab-group.mc-tab-group_dynamic-height .mc-tab-body.mc-tab-body__active{overflow-y:hidden}\n"], components: [{ type: i1.McTabHeader, selector: "mc-tab-header", inputs: ["selectedIndex", "vertical"], outputs: ["selectFocusedIndex", "indexFocused"] }, { type: i2.McTabBody, selector: "mc-tab-body", inputs: ["position", "content", "origin", "animationDuration"], outputs: ["onCentering", "beforeCentering", "afterLeavingCenter", "onCentered"] }], directives: [{ type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.McTabLabelWrapper, selector: "[mcTabLabelWrapper]", inputs: ["disabled", "tab"] }, { type: i5.CdkMonitorFocus, selector: "[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]", outputs: ["cdkFocusChange"] }, { type: i6.McTooltipTrigger, selector: "[mcTooltip]", inputs: ["mcVisible", "mcPlacement", "mcPlacementPriority", "mcTooltip", "mcTooltipDisabled", "mcEnterDelay", "mcLeaveDelay", "mcTrigger", "mcTooltipClass"], outputs: ["mcPlacementChange", "mcVisibleChange"], exportAs: ["mcTooltip"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McTabGroup, decorators: [{
            type: Component,
            args: [{ selector: 'mc-tab-group', exportAs: 'mcTabGroup', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, inputs: ['disabled'], host: {
                        class: 'mc-tab-group',
                        '[class.mc-tab-group_dynamic-height]': 'dynamicHeight',
                        '[class.mc-tab-group_inverted-header]': 'headerPosition === "below"',
                        '(window:resize)': 'resizeStream.next()'
                    }, template: "<mc-tab-header\n    #tabHeader\n    [vertical]=\"vertical\"\n    [selectedIndex]=\"selectedIndex\"\n    (indexFocused)=\"focusChanged($event)\"\n    (selectFocusedIndex)=\"selectedIndex = $event\">\n\n    <div class=\"mc-tab-label\"\n         mcTabLabelWrapper\n         cdkMonitorElementFocus\n         [attr.tabindex]=\"getTabIndex(tab, i)\"\n         [class.mc-tab-label_old]=\"oldTab\"\n         [class.mc-tab-label_horizontal]=\"!vertical && !oldTab\"\n         [class.mc-tab-label_vertical]=\"vertical && !oldTab\"\n         [class.mc-tab-label_empty]=\"tab.empty\"\n         [class.mc-active]=\"selectedIndex == i\"\n         *ngFor=\"let tab of tabs; let i = index\"\n         [tab]=\"tab\"\n         [id]=\"getTabLabelId(i)\"\n         [disabled]=\"tab.disabled\"\n         (click)=\"handleClick(tab, tabHeader, i)\"\n\n         [mcTooltip]=\"tab.tooltipTitle\"\n         [mcTooltipDisabled]=\"!tab.empty && !tab.isOverflown\"\n         [mcTrigger]=\"'hover, focus'\"\n         [mcPlacement]=\"tab.tooltipPlacement\">\n\n        <div #labelContent class=\"mc-tab-label__content\"\n            [class.mc-tab-label__template]=\"tab.templateLabel\">\n            <!-- If there is a label template, use it. -->\n            <ng-template [ngIf]=\"tab.templateLabel\">\n                <ng-template [cdkPortalOutlet]=\"tab.templateLabel\"></ng-template>\n            </ng-template>\n\n            <!-- If there is not a label template, fall back to the text label. -->\n            <ng-template [ngIf]=\"!tab.templateLabel\">{{ tab.textLabel }}</ng-template>\n        </div>\n\n        <div class=\"mc-tab-overlay\"></div>\n    </div>\n</mc-tab-header>\n\n<div class=\"mc-tab-body__wrapper\" #tabBodyWrapper>\n    <mc-tab-body\n        *ngFor=\"let tab of tabs; let i = index\"\n        [id]=\"getTabContentId(i)\"\n        [class.mc-tab-body__active]=\"selectedIndex == i\"\n        [content]=\"tab.content!\"\n        [position]=\"tab.position!\"\n        [origin]=\"tab.origin!\"\n        [animationDuration]=\"animationDuration\"\n        (onCentered)=\"removeTabBodyWrapperHeight()\"\n        (onCentering)=\"setTabBodyWrapperHeight($event)\">\n    </mc-tab-body>\n</div>\n", styles: [".mc-tab-group{display:flex;flex-direction:column;box-sizing:border-box;text-align:center;white-space:nowrap}.mc-tab-group.mc-tab-group_inverted-header{flex-direction:column-reverse}.mc-tab-group_vertical{flex-direction:row}.mc-tab-group_vertical .mc-tab-header__content{overflow-y:auto;padding-top:8px;padding-bottom:1px;border-right-width:1px;border-right-width:var(--mc-tabs-size-border-width, 1px);border-right-style:solid}.mc-tab-body__wrapper{display:flex;overflow:hidden;position:relative}.mc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;flex-basis:100%}.mc-tab-body.mc-tab-body__active{overflow-x:hidden;overflow-y:auto;position:relative;z-index:1;flex-grow:1}.mc-tab-group.mc-tab-group_dynamic-height .mc-tab-body.mc-tab-body__active{overflow-y:hidden}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['mc-old-tabs']
                }] }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['vertical']
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_TABS_CONFIG]
                }, {
                    type: Optional
                }] }]; }, propDecorators: { tabs: [{
                type: ContentChildren,
                args: [McTab]
            }], tabBodyWrapper: [{
                type: ViewChild,
                args: ['tabBodyWrapper', { static: false }]
            }], tabHeader: [{
                type: ViewChild,
                args: ['tabHeader', { static: false }]
            }], dynamicHeight: [{
                type: Input
            }], selectedIndex: [{
                type: Input
            }], headerPosition: [{
                type: Input
            }], animationDuration: [{
                type: Input
            }], selectedIndexChange: [{
                type: Output
            }], focusChange: [{
                type: Output
            }], animationDone: [{
                type: Output
            }], selectedTabChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy90YWJzL3RhYi1ncm91cC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdGFicy90YWItZ3JvdXAuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRixPQUFPLEVBR0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNqQixjQUFjLEVBQ2QsTUFBTSxFQUNOLFFBQVEsRUFDUixTQUFTLEVBQ1QsU0FBUyxFQUVaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBa0IsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7Ozs7QUFPeEMsTUFBTSxPQUFPLGtCQUFrQjs7cUpBQWxCLGtCQUFrQjt5SUFBbEIsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBSjlCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFO2lCQUN0Qzs7QUFPRCxNQUFNLE9BQU8sMEJBQTBCOzs2SkFBMUIsMEJBQTBCO2lK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QUNwQixNQUFNOzJCQUFDLGNBQWM7OzBCQUFHLFFBQVE7NENBckViLElBQUk7c0JBQTNCLGVBQWU7dUJBQUMsS0FBSztnQkFFMEIsY0FBYztzQkFBN0QsU0FBUzt1QkFBQyxnQkFBZ0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBRUgsU0FBUztzQkFBbkQsU0FBUzt1QkFBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUlyQyxhQUFhO3NCQURoQixLQUFLO2dCQWFGLGFBQWE7c0JBRGhCLEtBQUs7Z0JBWUcsY0FBYztzQkFBdEIsS0FBSztnQkFHRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBR2EsbUJBQW1CO3NCQUFyQyxNQUFNO2dCQUdZLFdBQVc7c0JBQTdCLE1BQU07Z0JBR1ksYUFBYTtzQkFBL0IsTUFBTTtnQkFHWSxpQkFBaUI7c0JBQW5DLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHksIGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIEluamVjdCxcbiAgICBPcHRpb25hbCxcbiAgICBEaXJlY3RpdmUsXG4gICAgQXR0cmlidXRlLFxuICAgIEFmdGVyVmlld0luaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5EaXNhYmxlQ3RvciwgbWl4aW5EaXNhYmxlZCB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IG1lcmdlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWNUYWJIZWFkZXIgfSBmcm9tICcuL3RhYi1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1jVGFiIH0gZnJvbSAnLi90YWIuY29tcG9uZW50JztcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLXRhYi1ncm91cFttYy1vbGQtdGFic10nLFxuICAgIGhvc3Q6IHsgY2xhc3M6ICdtYy10YWItZ3JvdXBfb2xkJyB9XG59KVxuZXhwb3J0IGNsYXNzIE1jT2xkVGFic0Nzc1N0eWxlciB7IH1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy10YWItZ3JvdXBbbWMtYWxpZ24tdGFicy1jZW50ZXJdLCBbbWMtdGFiLW5hdi1iYXJdW21jLWFsaWduLXRhYnMtY2VudGVyXScsXG4gICAgaG9zdDogeyBjbGFzczogJ21jLXRhYi1ncm91cF9hbGlnbi1sYWJlbHMtY2VudGVyJyB9XG59KVxuZXhwb3J0IGNsYXNzIE1jQWxpZ25UYWJzQ2VudGVyQ3NzU3R5bGVyIHsgfVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLXRhYi1ncm91cFttYy1hbGlnbi10YWJzLWVuZF0sIFttYy10YWItbmF2LWJhcl1bbWMtYWxpZ24tdGFicy1lbmRdJyxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtdGFiLWdyb3VwX2FsaWduLWxhYmVscy1lbmQnIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNBbGlnblRhYnNFbmRDc3NTdHlsZXIgeyB9XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFiLWdyb3VwW21jLXN0cmV0Y2gtdGFic10sIFttYy10YWItbmF2LWJhcl1bbWMtc3RyZXRjaC10YWJzXScsXG4gICAgaG9zdDogeyBjbGFzczogJ21jLXRhYi1ncm91cF9zdHJldGNoLWxhYmVscycgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1N0cmV0Y2hUYWJzQ3NzU3R5bGVyIHsgfVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLXRhYi1ncm91cFt2ZXJ0aWNhbF0sIFttYy10YWItbmF2LWJhcl1bdmVydGljYWxdJyxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtdGFiLWdyb3VwX3ZlcnRpY2FsJyB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVmVydGljYWxUYWJzQ3NzU3R5bGVyIHsgfVxuXG4vKiogVXNlZCB0byBnZW5lcmF0ZSB1bmlxdWUgSUQncyBmb3IgZWFjaCB0YWIgY29tcG9uZW50ICovXG5sZXQgbmV4dElkID0gMDtcblxuLyoqIEEgc2ltcGxlIGNoYW5nZSBldmVudCBlbWl0dGVkIG9uIGZvY3VzIG9yIHNlbGVjdGlvbiBjaGFuZ2VzLiAqL1xuZXhwb3J0IGNsYXNzIE1jVGFiQ2hhbmdlRXZlbnQge1xuICAgIC8qKiBJbmRleCBvZiB0aGUgY3VycmVudGx5LXNlbGVjdGVkIHRhYi4gKi9cbiAgICBpbmRleDogbnVtYmVyO1xuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnRseS1zZWxlY3RlZCB0YWIuICovXG4gICAgdGFiOiBNY1RhYjtcbn1cblxuLyoqIFBvc3NpYmxlIHBvc2l0aW9ucyBmb3IgdGhlIHRhYiBoZWFkZXIuICovXG5leHBvcnQgdHlwZSBNY1RhYkhlYWRlclBvc2l0aW9uID0gJ2Fib3ZlJyB8ICdiZWxvdyc7XG5cbi8qKiBPYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byBjb25maWd1cmUgdGhlIGRlZmF1bHQgb3B0aW9ucyBmb3IgdGhlIHRhYnMgbW9kdWxlLiAqL1xuZXhwb3J0IGludGVyZmFjZSBJTWNUYWJzQ29uZmlnIHtcbiAgICAvKiogRHVyYXRpb24gZm9yIHRoZSB0YWIgYW5pbWF0aW9uLiBNdXN0IGJlIGEgdmFsaWQgQ1NTIHZhbHVlIChlLmcuIDYwMG1zKS4gKi9cbiAgICBhbmltYXRpb25EdXJhdGlvbj86IHN0cmluZztcbn1cblxuLyoqIEluamVjdGlvbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHByb3ZpZGUgdGhlIGRlZmF1bHQgb3B0aW9ucyB0aGUgdGFicyBtb2R1bGUuICovXG5leHBvcnQgY29uc3QgTUNfVEFCU19DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignTUNfVEFCU19DT05GSUcnKTtcblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNY1RhYkdyb3VwLlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjbGFzcyBNY1RhYkdyb3VwQmFzZSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNUYWJHcm91cE1peGluQmFzZTogQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgTWNUYWJHcm91cEJhc2UgPSBtaXhpbkRpc2FibGVkKE1jVGFiR3JvdXBCYXNlKTtcblxuLyoqXG4gKiBUYWItZ3JvdXAgY29tcG9uZW50LiAgU3VwcG9ydHMgYmFzaWMgdGFiIHBhaXJzIChsYWJlbCArIGNvbnRlbnQpIGFuZCBpbmNsdWRlc1xuICoga2V5Ym9hcmQgbmF2aWdhdGlvbi5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy10YWItZ3JvdXAnLFxuICAgIGV4cG9ydEFzOiAnbWNUYWJHcm91cCcsXG4gICAgdGVtcGxhdGVVcmw6ICd0YWItZ3JvdXAuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3RhYi1ncm91cC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdGFiLWdyb3VwJyxcbiAgICAgICAgJ1tjbGFzcy5tYy10YWItZ3JvdXBfZHluYW1pYy1oZWlnaHRdJzogJ2R5bmFtaWNIZWlnaHQnLFxuICAgICAgICAnW2NsYXNzLm1jLXRhYi1ncm91cF9pbnZlcnRlZC1oZWFkZXJdJzogJ2hlYWRlclBvc2l0aW9uID09PSBcImJlbG93XCInLFxuICAgICAgICAnKHdpbmRvdzpyZXNpemUpJzogJ3Jlc2l6ZVN0cmVhbS5uZXh0KCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1RhYkdyb3VwIGV4dGVuZHMgTWNUYWJHcm91cE1peGluQmFzZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIE9uRGVzdHJveSB7XG4gICAgcmVhZG9ubHkgcmVzaXplU3RyZWFtID0gbmV3IFN1YmplY3Q8RXZlbnQ+KCk7XG5cbiAgICBvbGRUYWI6IGJvb2xlYW47XG4gICAgdmVydGljYWw6IGJvb2xlYW47XG5cbiAgICBAQ29udGVudENoaWxkcmVuKE1jVGFiKSB0YWJzOiBRdWVyeUxpc3Q8TWNUYWI+O1xuXG4gICAgQFZpZXdDaGlsZCgndGFiQm9keVdyYXBwZXInLCB7IHN0YXRpYzogZmFsc2UgfSkgdGFiQm9keVdyYXBwZXI6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCd0YWJIZWFkZXInLCB7IHN0YXRpYzogZmFsc2UgfSkgdGFiSGVhZGVyOiBNY1RhYkhlYWRlcjtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSB0YWIgZ3JvdXAgc2hvdWxkIGdyb3cgdG8gdGhlIHNpemUgb2YgdGhlIGFjdGl2ZSB0YWIuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgZHluYW1pY0hlaWdodCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2R5bmFtaWNIZWlnaHQ7XG4gICAgfVxuXG4gICAgc2V0IGR5bmFtaWNIZWlnaHQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZHluYW1pY0hlaWdodCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZHluYW1pY0hlaWdodCA9IGZhbHNlO1xuXG4gICAgLyoqIFRoZSBpbmRleCBvZiB0aGUgYWN0aXZlIHRhYi4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RlZEluZGV4KCk6IG51bWJlciB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRJbmRleDtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWRJbmRleCh2YWx1ZTogbnVtYmVyIHwgbnVsbCkge1xuICAgICAgICB0aGlzLmluZGV4VG9TZWxlY3QgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSwgbnVsbCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRJbmRleDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICAvKiogUG9zaXRpb24gb2YgdGhlIHRhYiBoZWFkZXIuICovXG4gICAgQElucHV0KCkgaGVhZGVyUG9zaXRpb246IE1jVGFiSGVhZGVyUG9zaXRpb24gPSAnYWJvdmUnO1xuXG4gICAgLyoqIER1cmF0aW9uIGZvciB0aGUgdGFiIGFuaW1hdGlvbi4gTXVzdCBiZSBhIHZhbGlkIENTUyB2YWx1ZSAoZS5nLiA2MDBtcykuICovXG4gICAgQElucHV0KCkgYW5pbWF0aW9uRHVyYXRpb246IHN0cmluZztcblxuICAgIC8qKiBPdXRwdXQgdG8gZW5hYmxlIHN1cHBvcnQgZm9yIHR3by13YXkgYmluZGluZyBvbiBgWyhzZWxlY3RlZEluZGV4KV1gICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGVkSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIGZvY3VzIGhhcyBjaGFuZ2VkIHdpdGhpbiBhIHRhYiBncm91cC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgZm9jdXNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxNY1RhYkNoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TWNUYWJDaGFuZ2VFdmVudD4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGJvZHkgYW5pbWF0aW9uIGhhcyBjb21wbGV0ZWQgKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgYW5pbWF0aW9uRG9uZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgdGFiIHNlbGVjdGlvbiBoYXMgY2hhbmdlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0ZWRUYWJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxNY1RhYkNoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TWNUYWJDaGFuZ2VFdmVudD4odHJ1ZSk7XG5cbiAgICAvKiogVGhlIHRhYiBpbmRleCB0aGF0IHNob3VsZCBiZSBzZWxlY3RlZCBhZnRlciB0aGUgY29udGVudCBoYXMgYmVlbiBjaGVja2VkLiAqL1xuICAgIHByaXZhdGUgaW5kZXhUb1NlbGVjdDogbnVtYmVyIHwgbnVsbCA9IDA7XG5cbiAgICAvKiogU25hcHNob3Qgb2YgdGhlIGhlaWdodCBvZiB0aGUgdGFiIGJvZHkgd3JhcHBlciBiZWZvcmUgYW5vdGhlciB0YWIgaXMgYWN0aXZhdGVkLiAqL1xuICAgIHByaXZhdGUgdGFiQm9keVdyYXBwZXJIZWlnaHQgPSAwO1xuXG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byB0YWJzIGJlaW5nIGFkZGVkL3JlbW92ZWQuICovXG4gICAgcHJpdmF0ZSB0YWJzU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byBjaGFuZ2VzIGluIHRoZSB0YWIgbGFiZWxzLiAqL1xuICAgIHByaXZhdGUgdGFiTGFiZWxTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgcHJpdmF0ZSByZXNpemVTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IGdyb3VwSWQ6IG51bWJlcjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJlc2l6ZURlYm91bmNlSW50ZXJ2YWw6IG51bWJlciA9IDEwMDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgQEF0dHJpYnV0ZSgnbWMtb2xkLXRhYnMnKSBsaWdodFRhYnM6IHN0cmluZyxcbiAgICAgICAgQEF0dHJpYnV0ZSgndmVydGljYWwnKSB2ZXJ0aWNhbDogc3RyaW5nLFxuICAgICAgICBASW5qZWN0KE1DX1RBQlNfQ09ORklHKSBAT3B0aW9uYWwoKSBkZWZhdWx0Q29uZmlnPzogSU1jVGFic0NvbmZpZ1xuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgICAgICB0aGlzLm9sZFRhYiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShsaWdodFRhYnMpO1xuICAgICAgICB0aGlzLnZlcnRpY2FsID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZlcnRpY2FsKTtcblxuICAgICAgICB0aGlzLmdyb3VwSWQgPSBuZXh0SWQrKztcbiAgICAgICAgdGhpcy5hbmltYXRpb25EdXJhdGlvbiA9IGRlZmF1bHRDb25maWc/LmFuaW1hdGlvbkR1cmF0aW9uIHx8ICcwbXMnO1xuXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlVG9SZXNpemUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZnRlciB0aGUgY29udGVudCBpcyBjaGVja2VkLCB0aGlzIGNvbXBvbmVudCBrbm93cyB3aGF0IHRhYnMgaGF2ZSBiZWVuIGRlZmluZWRcbiAgICAgKiBhbmQgd2hhdCB0aGUgc2VsZWN0ZWQgaW5kZXggc2hvdWxkIGJlLiBUaGlzIGlzIHdoZXJlIHdlIGNhbiBrbm93IGV4YWN0bHkgd2hhdCBwb3NpdGlvblxuICAgICAqIGVhY2ggdGFiIHNob3VsZCBiZSBpbiBhY2NvcmRpbmcgdG8gdGhlIG5ldyBzZWxlY3RlZCBpbmRleCwgYW5kIGFkZGl0aW9uYWxseSB3ZSBrbm93IGhvd1xuICAgICAqIGEgbmV3IHNlbGVjdGVkIHRhYiBzaG91bGQgdHJhbnNpdGlvbiBpbiAoZnJvbSB0aGUgbGVmdCBvciByaWdodCkuXG4gICAgICovXG4gICAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgICAgICAvLyBEb24ndCBjbGFtcCB0aGUgYGluZGV4VG9TZWxlY3RgIGltbWVkaWF0ZWx5IGluIHRoZSBzZXR0ZXIgYmVjYXVzZSBpdCBjYW4gaGFwcGVuIHRoYXRcbiAgICAgICAgLy8gdGhlIGFtb3VudCBvZiB0YWJzIGNoYW5nZXMgYmVmb3JlIHRoZSBhY3R1YWwgY2hhbmdlIGRldGVjdGlvbiBydW5zLlxuICAgICAgICBjb25zdCBpbmRleFRvU2VsZWN0ID0gdGhpcy5pbmRleFRvU2VsZWN0ID0gdGhpcy5jbGFtcFRhYkluZGV4KHRoaXMuaW5kZXhUb1NlbGVjdCk7XG5cbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSBjaGFuZ2UgaW4gc2VsZWN0ZWQgaW5kZXgsIGVtaXQgYSBjaGFuZ2UgZXZlbnQuIFNob3VsZCBub3QgdHJpZ2dlciBpZlxuICAgICAgICAvLyB0aGUgc2VsZWN0ZWQgaW5kZXggaGFzIG5vdCB5ZXQgYmVlbiBpbml0aWFsaXplZC5cbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSW5kZXggIT09IGluZGV4VG9TZWxlY3QpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzRmlyc3RSdW4gPSB0aGlzLl9zZWxlY3RlZEluZGV4ID09IG51bGw7XG5cbiAgICAgICAgICAgIGlmICghaXNGaXJzdFJ1bikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUYWJDaGFuZ2UuZW1pdCh0aGlzLmNyZWF0ZUNoYW5nZUV2ZW50KGluZGV4VG9TZWxlY3QpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ2hhbmdpbmcgdGhlc2UgdmFsdWVzIGFmdGVyIGNoYW5nZSBkZXRlY3Rpb24gaGFzIHJ1blxuICAgICAgICAgICAgLy8gc2luY2UgdGhlIGNoZWNrZWQgY29udGVudCBtYXkgY29udGFpbiByZWZlcmVuY2VzIHRvIHRoZW0uXG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhYnMuZm9yRWFjaCgodGFiLCBpbmRleCkgPT4gdGFiLmlzQWN0aXZlID0gaW5kZXggPT09IGluZGV4VG9TZWxlY3QpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFpc0ZpcnN0UnVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleENoYW5nZS5lbWl0KGluZGV4VG9TZWxlY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0dXAgdGhlIHBvc2l0aW9uIGZvciBlYWNoIHRhYiBhbmQgb3B0aW9uYWxseSBzZXR1cCBhbiBvcmlnaW4gb24gdGhlIG5leHQgc2VsZWN0ZWQgdGFiLlxuICAgICAgICB0aGlzLnRhYnMuZm9yRWFjaCgodGFiOiBNY1RhYiwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgdGFiLnBvc2l0aW9uID0gaW5kZXggLSBpbmRleFRvU2VsZWN0O1xuXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhbHJlYWR5IGEgc2VsZWN0ZWQgdGFiLCB0aGVuIHNldCB1cCBhbiBvcmlnaW4gZm9yIHRoZSBuZXh0IHNlbGVjdGVkIHRhYlxuICAgICAgICAgICAgLy8gaWYgaXQgZG9lc24ndCBoYXZlIG9uZSBhbHJlYWR5LlxuICAgICAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSW5kZXggIT0gbnVsbCAmJiB0YWIucG9zaXRpb24gPT09IDAgJiYgIXRhYi5vcmlnaW4pIHtcbiAgICAgICAgICAgICAgICB0YWIub3JpZ2luID0gaW5kZXhUb1NlbGVjdCAtIHRoaXMuX3NlbGVjdGVkSW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZEluZGV4ICE9PSBpbmRleFRvU2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gaW5kZXhUb1NlbGVjdDtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlVG9UYWJMYWJlbHMoKTtcblxuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gY2hhbmdlcyBpbiB0aGUgYW1vdW50IG9mIHRhYnMsIGluIG9yZGVyIHRvIGJlXG4gICAgICAgIC8vIGFibGUgdG8gcmUtcmVuZGVyIHRoZSBjb250ZW50IGFzIG5ldyB0YWJzIGFyZSBhZGRlZCBvciByZW1vdmVkLlxuICAgICAgICB0aGlzLnRhYnNTdWJzY3JpcHRpb24gPSB0aGlzLnRhYnMuY2hhbmdlc1xuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXhUb1NlbGVjdCA9IHRoaXMuY2xhbXBUYWJJbmRleCh0aGlzLmluZGV4VG9TZWxlY3QpO1xuXG4gICAgICAgICAgICAgICAgLy8gTWFpbnRhaW4gdGhlIHByZXZpb3VzbHktc2VsZWN0ZWQgdGFiIGlmIGEgbmV3IHRhYiBpcyBhZGRlZCBvciByZW1vdmVkIGFuZCB0aGVyZSBpcyBub1xuICAgICAgICAgICAgICAgIC8vIGV4cGxpY2l0IGNoYW5nZSB0aGF0IHNlbGVjdHMgYSBkaWZmZXJlbnQgdGFiLlxuICAgICAgICAgICAgICAgIGlmIChpbmRleFRvU2VsZWN0ID09PSB0aGlzLl9zZWxlY3RlZEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhYnMgPSB0aGlzLnRhYnMudG9BcnJheSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhYnNbaV0uaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBc3NpZ24gYm90aCB0byB0aGUgYF9pbmRleFRvU2VsZWN0YCBhbmQgYF9zZWxlY3RlZEluZGV4YCBzbyB3ZSBkb24ndCBmaXJlIGEgY2hhbmdlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV2ZW50LCBvdGhlcndpc2UgdGhlIGNvbnN1bWVyIG1heSBlbmQgdXAgaW4gYW4gaW5maW5pdGUgbG9vcCBpbiBzb21lIGVkZ2UgY2FzZXMgbGlrZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZGluZyBhIHRhYiB3aXRoaW4gdGhlIGBzZWxlY3RlZEluZGV4Q2hhbmdlYCBldmVudC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4VG9TZWxlY3QgPSB0aGlzLl9zZWxlY3RlZEluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlVG9UYWJMYWJlbHMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNoZWNrT3ZlcmZsb3coKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy50YWJzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMudGFiTGFiZWxTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5yZXNpemVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBmb2N1c0NoYW5nZWQoaW5kZXg6IG51bWJlcikge1xuICAgICAgICB0aGlzLmZvY3VzQ2hhbmdlLmVtaXQodGhpcy5jcmVhdGVDaGFuZ2VFdmVudChpbmRleCkpO1xuICAgIH1cblxuICAgIC8qKiBSZXR1cm5zIGEgdW5pcXVlIGlkIGZvciBlYWNoIHRhYiBsYWJlbCBlbGVtZW50ICovXG4gICAgZ2V0VGFiTGFiZWxJZChpOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYG1jLXRhYi1sYWJlbC0ke3RoaXMuZ3JvdXBJZH0tJHtpfWA7XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgYSB1bmlxdWUgaWQgZm9yIGVhY2ggdGFiIGNvbnRlbnQgZWxlbWVudCAqL1xuICAgIGdldFRhYkNvbnRlbnRJZChpOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYG1jLXRhYi1jb250ZW50LSR7dGhpcy5ncm91cElkfS0ke2l9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBoZWlnaHQgb2YgdGhlIGJvZHkgd3JhcHBlciB0byB0aGUgaGVpZ2h0IG9mIHRoZSBhY3RpdmF0aW5nIHRhYiBpZiBkeW5hbWljXG4gICAgICogaGVpZ2h0IHByb3BlcnR5IGlzIHRydWUuXG4gICAgICovXG4gICAgc2V0VGFiQm9keVdyYXBwZXJIZWlnaHQodGFiSGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9keW5hbWljSGVpZ2h0IHx8ICF0aGlzLnRhYkJvZHlXcmFwcGVySGVpZ2h0KSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNvbnN0IHdyYXBwZXI6IEhUTUxFbGVtZW50ID0gdGhpcy50YWJCb2R5V3JhcHBlci5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIHdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy50YWJCb2R5V3JhcHBlckhlaWdodH1weGA7XG5cbiAgICAgICAgLy8gVGhpcyBjb25kaXRpb25hbCBmb3JjZXMgdGhlIGJyb3dzZXIgdG8gcGFpbnQgdGhlIGhlaWdodCBzbyB0aGF0XG4gICAgICAgIC8vIHRoZSBhbmltYXRpb24gdG8gdGhlIG5ldyBoZWlnaHQgY2FuIGhhdmUgYW4gb3JpZ2luLlxuICAgICAgICBpZiAodGhpcy50YWJCb2R5V3JhcHBlci5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCkge1xuICAgICAgICAgICAgd3JhcHBlci5zdHlsZS5oZWlnaHQgPSBgJHt0YWJIZWlnaHR9cHhgO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFJlbW92ZXMgdGhlIGhlaWdodCBvZiB0aGUgdGFiIGJvZHkgd3JhcHBlci4gKi9cbiAgICByZW1vdmVUYWJCb2R5V3JhcHBlckhlaWdodCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YWJCb2R5V3JhcHBlckhlaWdodCA9IHRoaXMudGFiQm9keVdyYXBwZXIubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHRoaXMudGFiQm9keVdyYXBwZXIubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSAnJztcbiAgICAgICAgdGhpcy5hbmltYXRpb25Eb25lLmVtaXQoKTtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlIGNsaWNrIGV2ZW50cywgc2V0dGluZyBuZXcgc2VsZWN0ZWQgaW5kZXggaWYgYXBwcm9wcmlhdGUuICovXG4gICAgaGFuZGxlQ2xpY2sodGFiOiBNY1RhYiwgdGFiSGVhZGVyOiBNY1RhYkhlYWRlciwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAodGFiLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRhYkhlYWRlci5mb2N1c0luZGV4ID0gaW5kZXg7XG4gICAgfVxuXG4gICAgLyoqIFJldHJpZXZlcyB0aGUgdGFiaW5kZXggZm9yIHRoZSB0YWIuICovXG4gICAgZ2V0VGFiSW5kZXgodGFiOiBNY1RhYiwgaW5kZXg6IG51bWJlcik6IG51bWJlciB8IG51bGwge1xuICAgICAgICBpZiAodGFiLmRpc2FibGVkKSB7IHJldHVybiBudWxsOyB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJbmRleCA9PT0gaW5kZXggPyAwIDogLTE7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja092ZXJmbG93ID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnRhYkhlYWRlci5pdGVtc1xuICAgICAgICAgICAgLmZvckVhY2goKGhlYWRlclRhYikgPT4gaGVhZGVyVGFiLmNoZWNrT3ZlcmZsb3coKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVDaGFuZ2VFdmVudChpbmRleDogbnVtYmVyKTogTWNUYWJDaGFuZ2VFdmVudCB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IE1jVGFiQ2hhbmdlRXZlbnQoKTtcbiAgICAgICAgZXZlbnQuaW5kZXggPSBpbmRleDtcblxuICAgICAgICBpZiAodGhpcy50YWJzICYmIHRoaXMudGFicy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGV2ZW50LnRhYiA9IHRoaXMudGFicy50b0FycmF5KClbaW5kZXhdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN1YnNjcmliZXMgdG8gY2hhbmdlcyBpbiB0aGUgdGFiIGxhYmVscy4gVGhpcyBpcyBuZWVkZWQsIGJlY2F1c2UgdGhlIEBJbnB1dCBmb3IgdGhlIGxhYmVsIGlzXG4gICAgICogb24gdGhlIE1jVGFiIGNvbXBvbmVudCwgd2hlcmVhcyB0aGUgZGF0YSBiaW5kaW5nIGlzIGluc2lkZSB0aGUgTWNUYWJHcm91cC4gSW4gb3JkZXIgZm9yIHRoZVxuICAgICAqIGJpbmRpbmcgdG8gYmUgdXBkYXRlZCwgd2UgbmVlZCB0byBzdWJzY3JpYmUgdG8gY2hhbmdlcyBpbiBpdCBhbmQgdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAgICogbWFudWFsbHkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdWJzY3JpYmVUb1RhYkxhYmVscygpIHtcbiAgICAgICAgaWYgKHRoaXMudGFiTGFiZWxTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudGFiTGFiZWxTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGFiTGFiZWxTdWJzY3JpcHRpb24gPSBtZXJnZSguLi50aGlzLnRhYnMubWFwKCh0YWIpID0+IHRhYi5zdGF0ZUNoYW5nZXMpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN1YnNjcmliZVRvUmVzaXplKCkge1xuICAgICAgICBpZiAoIXRoaXMudmVydGljYWwpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKHRoaXMucmVzaXplU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZXNpemVTdWJzY3JpcHRpb24gPSB0aGlzLnJlc2l6ZVN0cmVhbVxuICAgICAgICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKHRoaXMucmVzaXplRGVib3VuY2VJbnRlcnZhbCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMuY2hlY2tPdmVyZmxvdyk7XG4gICAgfVxuXG4gICAgLyoqIENsYW1wcyB0aGUgZ2l2ZW4gaW5kZXggdG8gdGhlIGJvdW5kcyBvZiAwIGFuZCB0aGUgdGFicyBsZW5ndGguICovXG4gICAgcHJpdmF0ZSBjbGFtcFRhYkluZGV4KGluZGV4OiBudW1iZXIgfCBudWxsKTogbnVtYmVyIHtcbiAgICAgICAgLy8gTm90ZSB0aGUgYHx8IDBgLCB3aGljaCBlbnN1cmVzIHRoYXQgdmFsdWVzIGxpa2UgTmFOIGNhbid0IGdldCB0aHJvdWdoXG4gICAgICAgIC8vIGFuZCB3aGljaCB3b3VsZCBvdGhlcndpc2UgdGhyb3cgdGhlIGNvbXBvbmVudCBpbnRvIGFuIGluZmluaXRlIGxvb3BcbiAgICAgICAgLy8gKHNpbmNlIE1jaC5tYXgoTmFOLCAwKSA9PT0gTmFOKS5cbiAgICAgICAgcmV0dXJuIE1hdGgubWluKHRoaXMudGFicy5sZW5ndGggLSAxLCBNYXRoLm1heChpbmRleCB8fCAwLCAwKSk7XG4gICAgfVxufVxuIiwiPG1jLXRhYi1oZWFkZXJcbiAgICAjdGFiSGVhZGVyXG4gICAgW3ZlcnRpY2FsXT1cInZlcnRpY2FsXCJcbiAgICBbc2VsZWN0ZWRJbmRleF09XCJzZWxlY3RlZEluZGV4XCJcbiAgICAoaW5kZXhGb2N1c2VkKT1cImZvY3VzQ2hhbmdlZCgkZXZlbnQpXCJcbiAgICAoc2VsZWN0Rm9jdXNlZEluZGV4KT1cInNlbGVjdGVkSW5kZXggPSAkZXZlbnRcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJtYy10YWItbGFiZWxcIlxuICAgICAgICAgbWNUYWJMYWJlbFdyYXBwZXJcbiAgICAgICAgIGNka01vbml0b3JFbGVtZW50Rm9jdXNcbiAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cImdldFRhYkluZGV4KHRhYiwgaSlcIlxuICAgICAgICAgW2NsYXNzLm1jLXRhYi1sYWJlbF9vbGRdPVwib2xkVGFiXCJcbiAgICAgICAgIFtjbGFzcy5tYy10YWItbGFiZWxfaG9yaXpvbnRhbF09XCIhdmVydGljYWwgJiYgIW9sZFRhYlwiXG4gICAgICAgICBbY2xhc3MubWMtdGFiLWxhYmVsX3ZlcnRpY2FsXT1cInZlcnRpY2FsICYmICFvbGRUYWJcIlxuICAgICAgICAgW2NsYXNzLm1jLXRhYi1sYWJlbF9lbXB0eV09XCJ0YWIuZW1wdHlcIlxuICAgICAgICAgW2NsYXNzLm1jLWFjdGl2ZV09XCJzZWxlY3RlZEluZGV4ID09IGlcIlxuICAgICAgICAgKm5nRm9yPVwibGV0IHRhYiBvZiB0YWJzOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgIFt0YWJdPVwidGFiXCJcbiAgICAgICAgIFtpZF09XCJnZXRUYWJMYWJlbElkKGkpXCJcbiAgICAgICAgIFtkaXNhYmxlZF09XCJ0YWIuZGlzYWJsZWRcIlxuICAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKHRhYiwgdGFiSGVhZGVyLCBpKVwiXG5cbiAgICAgICAgIFttY1Rvb2x0aXBdPVwidGFiLnRvb2x0aXBUaXRsZVwiXG4gICAgICAgICBbbWNUb29sdGlwRGlzYWJsZWRdPVwiIXRhYi5lbXB0eSAmJiAhdGFiLmlzT3ZlcmZsb3duXCJcbiAgICAgICAgIFttY1RyaWdnZXJdPVwiJ2hvdmVyLCBmb2N1cydcIlxuICAgICAgICAgW21jUGxhY2VtZW50XT1cInRhYi50b29sdGlwUGxhY2VtZW50XCI+XG5cbiAgICAgICAgPGRpdiAjbGFiZWxDb250ZW50IGNsYXNzPVwibWMtdGFiLWxhYmVsX19jb250ZW50XCJcbiAgICAgICAgICAgIFtjbGFzcy5tYy10YWItbGFiZWxfX3RlbXBsYXRlXT1cInRhYi50ZW1wbGF0ZUxhYmVsXCI+XG4gICAgICAgICAgICA8IS0tIElmIHRoZXJlIGlzIGEgbGFiZWwgdGVtcGxhdGUsIHVzZSBpdC4gLS0+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwidGFiLnRlbXBsYXRlTGFiZWxcIj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW2Nka1BvcnRhbE91dGxldF09XCJ0YWIudGVtcGxhdGVMYWJlbFwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICAgICAgICA8IS0tIElmIHRoZXJlIGlzIG5vdCBhIGxhYmVsIHRlbXBsYXRlLCBmYWxsIGJhY2sgdG8gdGhlIHRleHQgbGFiZWwuIC0tPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiF0YWIudGVtcGxhdGVMYWJlbFwiPnt7IHRhYi50ZXh0TGFiZWwgfX08L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwibWMtdGFiLW92ZXJsYXlcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbjwvbWMtdGFiLWhlYWRlcj5cblxuPGRpdiBjbGFzcz1cIm1jLXRhYi1ib2R5X193cmFwcGVyXCIgI3RhYkJvZHlXcmFwcGVyPlxuICAgIDxtYy10YWItYm9keVxuICAgICAgICAqbmdGb3I9XCJsZXQgdGFiIG9mIHRhYnM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICBbaWRdPVwiZ2V0VGFiQ29udGVudElkKGkpXCJcbiAgICAgICAgW2NsYXNzLm1jLXRhYi1ib2R5X19hY3RpdmVdPVwic2VsZWN0ZWRJbmRleCA9PSBpXCJcbiAgICAgICAgW2NvbnRlbnRdPVwidGFiLmNvbnRlbnQhXCJcbiAgICAgICAgW3Bvc2l0aW9uXT1cInRhYi5wb3NpdGlvbiFcIlxuICAgICAgICBbb3JpZ2luXT1cInRhYi5vcmlnaW4hXCJcbiAgICAgICAgW2FuaW1hdGlvbkR1cmF0aW9uXT1cImFuaW1hdGlvbkR1cmF0aW9uXCJcbiAgICAgICAgKG9uQ2VudGVyZWQpPVwicmVtb3ZlVGFiQm9keVdyYXBwZXJIZWlnaHQoKVwiXG4gICAgICAgIChvbkNlbnRlcmluZyk9XCJzZXRUYWJCb2R5V3JhcHBlckhlaWdodCgkZXZlbnQpXCI+XG4gICAgPC9tYy10YWItYm9keT5cbjwvZGl2PlxuIl19