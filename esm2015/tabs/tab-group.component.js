import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewEncapsulation, InjectionToken, Inject, Optional, Directive, Attribute } from '@angular/core';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
import { merge, Subscription } from 'rxjs';
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
/** @nocollapse */ McOldTabsCssStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McOldTabsCssStyler, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McOldTabsCssStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McOldTabsCssStyler, selector: "mc-tab-group[mc-old-tabs]", host: { classAttribute: "mc-tab-group_old" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McOldTabsCssStyler, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-tab-group[mc-old-tabs]',
                    host: { class: 'mc-tab-group_old' }
                }]
        }] });
export class McAlignTabsCenterCssStyler {
}
/** @nocollapse */ McAlignTabsCenterCssStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McAlignTabsCenterCssStyler, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McAlignTabsCenterCssStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McAlignTabsCenterCssStyler, selector: "mc-tab-group[mc-align-tabs-center], [mc-tab-nav-bar][mc-align-tabs-center]", host: { classAttribute: "mc-tab-group_align-labels-center" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McAlignTabsCenterCssStyler, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-tab-group[mc-align-tabs-center], [mc-tab-nav-bar][mc-align-tabs-center]',
                    host: { class: 'mc-tab-group_align-labels-center' }
                }]
        }] });
export class McAlignTabsEndCssStyler {
}
/** @nocollapse */ McAlignTabsEndCssStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McAlignTabsEndCssStyler, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McAlignTabsEndCssStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McAlignTabsEndCssStyler, selector: "mc-tab-group[mc-align-tabs-end], [mc-tab-nav-bar][mc-align-tabs-end]", host: { classAttribute: "mc-tab-group_align-labels-end" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McAlignTabsEndCssStyler, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-tab-group[mc-align-tabs-end], [mc-tab-nav-bar][mc-align-tabs-end]',
                    host: { class: 'mc-tab-group_align-labels-end' }
                }]
        }] });
export class McStretchTabsCssStyler {
}
/** @nocollapse */ McStretchTabsCssStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McStretchTabsCssStyler, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McStretchTabsCssStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McStretchTabsCssStyler, selector: "mc-tab-group[mc-stretch-tabs], [mc-tab-nav-bar][mc-stretch-tabs]", host: { classAttribute: "mc-tab-group_stretch-labels" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McStretchTabsCssStyler, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-tab-group[mc-stretch-tabs], [mc-tab-nav-bar][mc-stretch-tabs]',
                    host: { class: 'mc-tab-group_stretch-labels' }
                }]
        }] });
export class McVerticalTabsCssStyler {
}
/** @nocollapse */ McVerticalTabsCssStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McVerticalTabsCssStyler, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McVerticalTabsCssStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McVerticalTabsCssStyler, selector: "mc-tab-group[vertical], [mc-tab-nav-bar][vertical]", host: { classAttribute: "mc-tab-group_vertical" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McVerticalTabsCssStyler, decorators: [{
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
        this._dynamicHeight = false;
        this._selectedIndex = null;
        this.oldTab = coerceBooleanProperty(lightTabs);
        this.vertical = coerceBooleanProperty(vertical);
        this.groupId = nextId++;
        this.animationDuration = (defaultConfig === null || defaultConfig === void 0 ? void 0 : defaultConfig.animationDuration) || '0ms';
    }
    /** Whether the tab group should grow to the size of the active tab. */
    get dynamicHeight() { return this._dynamicHeight; }
    set dynamicHeight(value) {
        this._dynamicHeight = coerceBooleanProperty(value);
    }
    /** The index of the active tab. */
    get selectedIndex() { return this._selectedIndex; }
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
        this.tabsSubscription = this.tabs.changes.subscribe(() => {
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
    ngOnDestroy() {
        this.tabsSubscription.unsubscribe();
        this.tabLabelSubscription.unsubscribe();
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
    /** Clamps the given index to the bounds of 0 and the tabs length. */
    clampTabIndex(index) {
        // Note the `|| 0`, which ensures that values like NaN can't get through
        // and which would otherwise throw the component into an infinite loop
        // (since Mch.max(NaN, 0) === NaN).
        return Math.min(this.tabs.length - 1, Math.max(index || 0, 0));
    }
}
/** @nocollapse */ McTabGroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTabGroup, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: 'mc-old-tabs', attribute: true }, { token: 'vertical', attribute: true }, { token: MC_TABS_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McTabGroup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McTabGroup, selector: "mc-tab-group", inputs: { disabled: "disabled", dynamicHeight: "dynamicHeight", selectedIndex: "selectedIndex", headerPosition: "headerPosition", animationDuration: "animationDuration" }, outputs: { selectedIndexChange: "selectedIndexChange", focusChange: "focusChange", animationDone: "animationDone", selectedTabChange: "selectedTabChange" }, host: { properties: { "class.mc-tab-group_dynamic-height": "dynamicHeight", "class.mc-tab-group_inverted-header": "headerPosition === \"below\"" }, classAttribute: "mc-tab-group" }, queries: [{ propertyName: "tabs", predicate: McTab }], viewQueries: [{ propertyName: "tabBodyWrapper", first: true, predicate: ["tabBodyWrapper"], descendants: true }, { propertyName: "tabHeader", first: true, predicate: ["tabHeader"], descendants: true }], exportAs: ["mcTabGroup"], usesInheritance: true, ngImport: i0, template: "<mc-tab-header\n    #tabHeader\n    [vertical]=\"vertical\"\n    [selectedIndex]=\"selectedIndex\"\n    (indexFocused)=\"focusChanged($event)\"\n    (selectFocusedIndex)=\"selectedIndex = $event\">\n\n    <div class=\"mc-tab-label\"\n         mcTabLabelWrapper\n         cdkMonitorElementFocus\n         [attr.tabindex]=\"getTabIndex(tab, i)\"\n         [class.mc-tab-label_old]=\"oldTab\"\n         [class.mc-tab-label_horizontal]=\"!vertical && !oldTab\"\n         [class.mc-tab-label_vertical]=\"vertical && !oldTab\"\n         [class.mc-tab-label_empty]=\"tab.empty\"\n         [class.mc-active]=\"selectedIndex == i\"\n         *ngFor=\"let tab of tabs; let i = index\"\n         [id]=\"getTabLabelId(i)\"\n         [disabled]=\"tab.disabled\"\n         (click)=\"handleClick(tab, tabHeader, i)\"\n\n         [mcTooltip]=\"tab.tooltipTitle\"\n         [mcTooltipDisabled]=\"!tab.empty\"\n         [mcTrigger]=\"'hover, focus'\"\n         [mcPlacement]=\"tab.tooltipPlacement\">\n\n        <div class=\"mc-tab-label__content\"\n            [class.mc-tab-label__template]=\"tab.templateLabel\">\n            <!-- If there is a label template, use it. -->\n            <ng-template [ngIf]=\"tab.templateLabel\">\n                <ng-template [cdkPortalOutlet]=\"tab.templateLabel\"></ng-template>\n            </ng-template>\n\n            <!-- If there is not a label template, fall back to the text label. -->\n            <ng-template [ngIf]=\"!tab.templateLabel\">{{ tab.textLabel }}</ng-template>\n        </div>\n\n        <div class=\"mc-tab-overlay\"></div>\n    </div>\n</mc-tab-header>\n\n<div class=\"mc-tab-body__wrapper\" #tabBodyWrapper>\n    <mc-tab-body\n        *ngFor=\"let tab of tabs; let i = index\"\n        [id]=\"getTabContentId(i)\"\n        [class.mc-tab-body__active]=\"selectedIndex == i\"\n        [content]=\"tab.content\"\n        [position]=\"tab.position\"\n        [origin]=\"tab.origin\"\n        [animationDuration]=\"animationDuration\"\n        (onCentered)=\"removeTabBodyWrapperHeight()\"\n        (onCentering)=\"setTabBodyWrapperHeight($event)\">\n    </mc-tab-body>\n</div>\n", styles: [".mc-tab-group{display:flex;flex-direction:column;box-sizing:border-box;text-align:center;white-space:nowrap}.mc-tab-group.mc-tab-group_inverted-header{flex-direction:column-reverse}.mc-tab-group_vertical{flex-direction:row}.mc-tab-group_vertical .mc-tab-header__content{overflow-y:auto;padding-top:8px;padding-bottom:1px;border-right-width:1px;border-right-width:var(--mc-tabs-size-border-width, 1px);border-right-style:solid}.mc-tab-body__wrapper{display:flex;overflow:hidden;position:relative}.mc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;flex-basis:100%}.mc-tab-body.mc-tab-body__active{overflow-x:hidden;overflow-y:auto;position:relative;z-index:1;flex-grow:1}.mc-tab-group.mc-tab-group_dynamic-height .mc-tab-body.mc-tab-body__active{overflow-y:hidden}\n"], components: [{ type: i1.McTabHeader, selector: "mc-tab-header", inputs: ["selectedIndex", "vertical"], outputs: ["selectFocusedIndex", "indexFocused"] }, { type: i2.McTabBody, selector: "mc-tab-body", inputs: ["position", "content", "origin", "animationDuration"], outputs: ["onCentering", "beforeCentering", "afterLeavingCenter", "onCentered"] }], directives: [{ type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.McTabLabelWrapper, selector: "[mcTabLabelWrapper]", inputs: ["disabled"] }, { type: i5.CdkMonitorFocus, selector: "[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]", outputs: ["cdkFocusChange"] }, { type: i6.McTooltipTrigger, selector: "[mcTooltip]", inputs: ["mcTooltip", "mcTooltipDisabled", "mcEnterDelay", "mcTrigger", "mcTooltipClass"], exportAs: ["mcTooltip"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTabGroup, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-tab-group',
                    exportAs: 'mcTabGroup',
                    templateUrl: 'tab-group.html',
                    styleUrls: ['tab-group.scss'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    inputs: ['disabled'],
                    host: {
                        class: 'mc-tab-group',
                        '[class.mc-tab-group_dynamic-height]': 'dynamicHeight',
                        '[class.mc-tab-group_inverted-header]': 'headerPosition === "below"'
                    }
                }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy90YWJzL3RhYi1ncm91cC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdGFicy90YWItZ3JvdXAuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRixPQUFPLEVBR0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNqQixjQUFjLEVBQ2QsTUFBTSxFQUNOLFFBQVEsRUFDUixTQUFTLEVBQUUsU0FBUyxFQUN2QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWtCLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7OztBQU94QyxNQUFNLE9BQU8sa0JBQWtCOztrSUFBbEIsa0JBQWtCO3NIQUFsQixrQkFBa0I7MkZBQWxCLGtCQUFrQjtrQkFKOUIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUU7aUJBQ3RDOztBQU9ELE1BQU0sT0FBTywwQkFBMEI7OzBJQUExQiwwQkFBMEI7OEhBQTFCLDBCQUEwQjsyRkFBMUIsMEJBQTBCO2tCQUp0QyxTQUFTO21CQUFDO29CQUNQLFFB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WUFBWTtvQkFDdEIsV0FBVyxFQUFFLGdCQUFnQjtvQkFDN0IsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7b0JBQzdCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNwQixJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLGNBQWM7d0JBQ3JCLHFDQUFxQyxFQUFFLGVBQWU7d0JBQ3RELHNDQUFzQyxFQUFFLDRCQUE0QjtxQkFDdkU7aUJBQ0o7OzBCQWdFUSxTQUFTOzJCQUFDLGFBQWE7OzBCQUN2QixTQUFTOzJCQUFDLFVBQVU7OzBCQUNwQixNQUFNOzJCQUFDLGNBQWM7OzBCQUFHLFFBQVE7NENBNURiLElBQUk7c0JBQTNCLGVBQWU7dUJBQUMsS0FBSztnQkFFMEIsY0FBYztzQkFBN0QsU0FBUzt1QkFBQyxnQkFBZ0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBRUgsU0FBUztzQkFBbkQsU0FBUzt1QkFBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUlyQyxhQUFhO3NCQURoQixLQUFLO2dCQVFGLGFBQWE7c0JBRGhCLEtBQUs7Z0JBUUcsY0FBYztzQkFBdEIsS0FBSztnQkFHRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBR2EsbUJBQW1CO3NCQUFyQyxNQUFNO2dCQUdZLFdBQVc7c0JBQTdCLE1BQU07Z0JBR1ksYUFBYTtzQkFBL0IsTUFBTTtnQkFHWSxpQkFBaUI7c0JBQW5DLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHksIGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIEluamVjdCxcbiAgICBPcHRpb25hbCxcbiAgICBEaXJlY3RpdmUsIEF0dHJpYnV0ZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkRpc2FibGVDdG9yLCBtaXhpbkRpc2FibGVkIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgbWVyZ2UsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBNY1RhYkhlYWRlciB9IGZyb20gJy4vdGFiLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWNUYWIgfSBmcm9tICcuL3RhYi5jb21wb25lbnQnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFiLWdyb3VwW21jLW9sZC10YWJzXScsXG4gICAgaG9zdDogeyBjbGFzczogJ21jLXRhYi1ncm91cF9vbGQnIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNPbGRUYWJzQ3NzU3R5bGVyIHsgfVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLXRhYi1ncm91cFttYy1hbGlnbi10YWJzLWNlbnRlcl0sIFttYy10YWItbmF2LWJhcl1bbWMtYWxpZ24tdGFicy1jZW50ZXJdJyxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtdGFiLWdyb3VwX2FsaWduLWxhYmVscy1jZW50ZXInIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNBbGlnblRhYnNDZW50ZXJDc3NTdHlsZXIgeyB9XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFiLWdyb3VwW21jLWFsaWduLXRhYnMtZW5kXSwgW21jLXRhYi1uYXYtYmFyXVttYy1hbGlnbi10YWJzLWVuZF0nLFxuICAgIGhvc3Q6IHsgY2xhc3M6ICdtYy10YWItZ3JvdXBfYWxpZ24tbGFiZWxzLWVuZCcgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0FsaWduVGFic0VuZENzc1N0eWxlciB7IH1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy10YWItZ3JvdXBbbWMtc3RyZXRjaC10YWJzXSwgW21jLXRhYi1uYXYtYmFyXVttYy1zdHJldGNoLXRhYnNdJyxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtdGFiLWdyb3VwX3N0cmV0Y2gtbGFiZWxzJyB9XG59KVxuZXhwb3J0IGNsYXNzIE1jU3RyZXRjaFRhYnNDc3NTdHlsZXIgeyB9XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFiLWdyb3VwW3ZlcnRpY2FsXSwgW21jLXRhYi1uYXYtYmFyXVt2ZXJ0aWNhbF0nLFxuICAgIGhvc3Q6IHsgY2xhc3M6ICdtYy10YWItZ3JvdXBfdmVydGljYWwnIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNWZXJ0aWNhbFRhYnNDc3NTdHlsZXIgeyB9XG5cbi8qKiBVc2VkIHRvIGdlbmVyYXRlIHVuaXF1ZSBJRCdzIGZvciBlYWNoIHRhYiBjb21wb25lbnQgKi9cbmxldCBuZXh0SWQgPSAwO1xuXG4vKiogQSBzaW1wbGUgY2hhbmdlIGV2ZW50IGVtaXR0ZWQgb24gZm9jdXMgb3Igc2VsZWN0aW9uIGNoYW5nZXMuICovXG5leHBvcnQgY2xhc3MgTWNUYWJDaGFuZ2VFdmVudCB7XG4gICAgLyoqIEluZGV4IG9mIHRoZSBjdXJyZW50bHktc2VsZWN0ZWQgdGFiLiAqL1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgY3VycmVudGx5LXNlbGVjdGVkIHRhYi4gKi9cbiAgICB0YWI6IE1jVGFiO1xufVxuXG4vKiogUG9zc2libGUgcG9zaXRpb25zIGZvciB0aGUgdGFiIGhlYWRlci4gKi9cbmV4cG9ydCB0eXBlIE1jVGFiSGVhZGVyUG9zaXRpb24gPSAnYWJvdmUnIHwgJ2JlbG93JztcblxuLyoqIE9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIGNvbmZpZ3VyZSB0aGUgZGVmYXVsdCBvcHRpb25zIGZvciB0aGUgdGFicyBtb2R1bGUuICovXG5leHBvcnQgaW50ZXJmYWNlIElNY1RhYnNDb25maWcge1xuICAgIC8qKiBEdXJhdGlvbiBmb3IgdGhlIHRhYiBhbmltYXRpb24uIE11c3QgYmUgYSB2YWxpZCBDU1MgdmFsdWUgKGUuZy4gNjAwbXMpLiAqL1xuICAgIGFuaW1hdGlvbkR1cmF0aW9uPzogc3RyaW5nO1xufVxuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSB0aGUgZGVmYXVsdCBvcHRpb25zIHRoZSB0YWJzIG1vZHVsZS4gKi9cbmV4cG9ydCBjb25zdCBNQ19UQUJTX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdNQ19UQUJTX0NPTkZJRycpO1xuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1jVGFiR3JvdXAuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNsYXNzIE1jVGFiR3JvdXBCYXNlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1RhYkdyb3VwTWl4aW5CYXNlOiBDYW5EaXNhYmxlQ3RvciAmIHR5cGVvZiBNY1RhYkdyb3VwQmFzZSA9IG1peGluRGlzYWJsZWQoTWNUYWJHcm91cEJhc2UpO1xuXG4vKipcbiAqIFRhYi1ncm91cCBjb21wb25lbnQuICBTdXBwb3J0cyBiYXNpYyB0YWIgcGFpcnMgKGxhYmVsICsgY29udGVudCkgYW5kIGluY2x1ZGVzXG4gKiBrZXlib2FyZCBuYXZpZ2F0aW9uLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRhYi1ncm91cCcsXG4gICAgZXhwb3J0QXM6ICdtY1RhYkdyb3VwJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3RhYi1ncm91cC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsndGFiLWdyb3VwLnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGlucHV0czogWydkaXNhYmxlZCddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy10YWItZ3JvdXAnLFxuICAgICAgICAnW2NsYXNzLm1jLXRhYi1ncm91cF9keW5hbWljLWhlaWdodF0nOiAnZHluYW1pY0hlaWdodCcsXG4gICAgICAgICdbY2xhc3MubWMtdGFiLWdyb3VwX2ludmVydGVkLWhlYWRlcl0nOiAnaGVhZGVyUG9zaXRpb24gPT09IFwiYmVsb3dcIidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVGFiR3JvdXAgZXh0ZW5kcyBNY1RhYkdyb3VwTWl4aW5CYXNlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgT25EZXN0cm95IHtcblxuICAgIG9sZFRhYjogYm9vbGVhbjtcbiAgICB2ZXJ0aWNhbDogYm9vbGVhbjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNUYWIpIHRhYnM6IFF1ZXJ5TGlzdDxNY1RhYj47XG5cbiAgICBAVmlld0NoaWxkKCd0YWJCb2R5V3JhcHBlcicsIHsgc3RhdGljOiBmYWxzZSB9KSB0YWJCb2R5V3JhcHBlcjogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ3RhYkhlYWRlcicsIHsgc3RhdGljOiBmYWxzZSB9KSB0YWJIZWFkZXI6IE1jVGFiSGVhZGVyO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRhYiBncm91cCBzaG91bGQgZ3JvdyB0byB0aGUgc2l6ZSBvZiB0aGUgYWN0aXZlIHRhYi4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBkeW5hbWljSGVpZ2h0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZHluYW1pY0hlaWdodDsgfVxuICAgIHNldCBkeW5hbWljSGVpZ2h0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2R5bmFtaWNIZWlnaHQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgaW5kZXggb2YgdGhlIGFjdGl2ZSB0YWIuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgc2VsZWN0ZWRJbmRleCgpOiBudW1iZXIgfCBudWxsIHsgcmV0dXJuIHRoaXMuX3NlbGVjdGVkSW5kZXg7IH1cbiAgICBzZXQgc2VsZWN0ZWRJbmRleCh2YWx1ZTogbnVtYmVyIHwgbnVsbCkge1xuICAgICAgICB0aGlzLmluZGV4VG9TZWxlY3QgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSwgbnVsbCk7XG4gICAgfVxuXG5cbiAgICAvKiogUG9zaXRpb24gb2YgdGhlIHRhYiBoZWFkZXIuICovXG4gICAgQElucHV0KCkgaGVhZGVyUG9zaXRpb246IE1jVGFiSGVhZGVyUG9zaXRpb24gPSAnYWJvdmUnO1xuXG4gICAgLyoqIER1cmF0aW9uIGZvciB0aGUgdGFiIGFuaW1hdGlvbi4gTXVzdCBiZSBhIHZhbGlkIENTUyB2YWx1ZSAoZS5nLiA2MDBtcykuICovXG4gICAgQElucHV0KCkgYW5pbWF0aW9uRHVyYXRpb246IHN0cmluZztcblxuICAgIC8qKiBPdXRwdXQgdG8gZW5hYmxlIHN1cHBvcnQgZm9yIHR3by13YXkgYmluZGluZyBvbiBgWyhzZWxlY3RlZEluZGV4KV1gICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGVkSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIGZvY3VzIGhhcyBjaGFuZ2VkIHdpdGhpbiBhIHRhYiBncm91cC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgZm9jdXNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxNY1RhYkNoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TWNUYWJDaGFuZ2VFdmVudD4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGJvZHkgYW5pbWF0aW9uIGhhcyBjb21wbGV0ZWQgKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgYW5pbWF0aW9uRG9uZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgdGFiIHNlbGVjdGlvbiBoYXMgY2hhbmdlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0ZWRUYWJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxNY1RhYkNoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TWNUYWJDaGFuZ2VFdmVudD4odHJ1ZSk7XG5cbiAgICAvKiogVGhlIHRhYiBpbmRleCB0aGF0IHNob3VsZCBiZSBzZWxlY3RlZCBhZnRlciB0aGUgY29udGVudCBoYXMgYmVlbiBjaGVja2VkLiAqL1xuICAgIHByaXZhdGUgaW5kZXhUb1NlbGVjdDogbnVtYmVyIHwgbnVsbCA9IDA7XG5cbiAgICAvKiogU25hcHNob3Qgb2YgdGhlIGhlaWdodCBvZiB0aGUgdGFiIGJvZHkgd3JhcHBlciBiZWZvcmUgYW5vdGhlciB0YWIgaXMgYWN0aXZhdGVkLiAqL1xuICAgIHByaXZhdGUgdGFiQm9keVdyYXBwZXJIZWlnaHQgPSAwO1xuXG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byB0YWJzIGJlaW5nIGFkZGVkL3JlbW92ZWQuICovXG4gICAgcHJpdmF0ZSB0YWJzU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byBjaGFuZ2VzIGluIHRoZSB0YWIgbGFiZWxzLiAqL1xuICAgIHByaXZhdGUgdGFiTGFiZWxTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgcHJpdmF0ZSBfZHluYW1pY0hlaWdodCA9IGZhbHNlO1xuICAgIHByaXZhdGUgX3NlbGVjdGVkSW5kZXg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBncm91cElkOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIEBBdHRyaWJ1dGUoJ21jLW9sZC10YWJzJykgbGlnaHRUYWJzOiBzdHJpbmcsXG4gICAgICAgIEBBdHRyaWJ1dGUoJ3ZlcnRpY2FsJykgdmVydGljYWw6IHN0cmluZyxcbiAgICAgICAgQEluamVjdChNQ19UQUJTX0NPTkZJRykgQE9wdGlvbmFsKCkgZGVmYXVsdENvbmZpZz86IElNY1RhYnNDb25maWdcbiAgICApIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG5cbiAgICAgICAgdGhpcy5vbGRUYWIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkobGlnaHRUYWJzKTtcbiAgICAgICAgdGhpcy52ZXJ0aWNhbCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2ZXJ0aWNhbCk7XG5cbiAgICAgICAgdGhpcy5ncm91cElkID0gbmV4dElkKys7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uRHVyYXRpb24gPSBkZWZhdWx0Q29uZmlnPy5hbmltYXRpb25EdXJhdGlvbiB8fCAnMG1zJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZnRlciB0aGUgY29udGVudCBpcyBjaGVja2VkLCB0aGlzIGNvbXBvbmVudCBrbm93cyB3aGF0IHRhYnMgaGF2ZSBiZWVuIGRlZmluZWRcbiAgICAgKiBhbmQgd2hhdCB0aGUgc2VsZWN0ZWQgaW5kZXggc2hvdWxkIGJlLiBUaGlzIGlzIHdoZXJlIHdlIGNhbiBrbm93IGV4YWN0bHkgd2hhdCBwb3NpdGlvblxuICAgICAqIGVhY2ggdGFiIHNob3VsZCBiZSBpbiBhY2NvcmRpbmcgdG8gdGhlIG5ldyBzZWxlY3RlZCBpbmRleCwgYW5kIGFkZGl0aW9uYWxseSB3ZSBrbm93IGhvd1xuICAgICAqIGEgbmV3IHNlbGVjdGVkIHRhYiBzaG91bGQgdHJhbnNpdGlvbiBpbiAoZnJvbSB0aGUgbGVmdCBvciByaWdodCkuXG4gICAgICovXG4gICAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgICAgICAvLyBEb24ndCBjbGFtcCB0aGUgYGluZGV4VG9TZWxlY3RgIGltbWVkaWF0ZWx5IGluIHRoZSBzZXR0ZXIgYmVjYXVzZSBpdCBjYW4gaGFwcGVuIHRoYXRcbiAgICAgICAgLy8gdGhlIGFtb3VudCBvZiB0YWJzIGNoYW5nZXMgYmVmb3JlIHRoZSBhY3R1YWwgY2hhbmdlIGRldGVjdGlvbiBydW5zLlxuICAgICAgICBjb25zdCBpbmRleFRvU2VsZWN0ID0gdGhpcy5pbmRleFRvU2VsZWN0ID0gdGhpcy5jbGFtcFRhYkluZGV4KHRoaXMuaW5kZXhUb1NlbGVjdCk7XG5cbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSBjaGFuZ2UgaW4gc2VsZWN0ZWQgaW5kZXgsIGVtaXQgYSBjaGFuZ2UgZXZlbnQuIFNob3VsZCBub3QgdHJpZ2dlciBpZlxuICAgICAgICAvLyB0aGUgc2VsZWN0ZWQgaW5kZXggaGFzIG5vdCB5ZXQgYmVlbiBpbml0aWFsaXplZC5cbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSW5kZXggIT09IGluZGV4VG9TZWxlY3QpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzRmlyc3RSdW4gPSB0aGlzLl9zZWxlY3RlZEluZGV4ID09IG51bGw7XG5cbiAgICAgICAgICAgIGlmICghaXNGaXJzdFJ1bikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUYWJDaGFuZ2UuZW1pdCh0aGlzLmNyZWF0ZUNoYW5nZUV2ZW50KGluZGV4VG9TZWxlY3QpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ2hhbmdpbmcgdGhlc2UgdmFsdWVzIGFmdGVyIGNoYW5nZSBkZXRlY3Rpb24gaGFzIHJ1blxuICAgICAgICAgICAgLy8gc2luY2UgdGhlIGNoZWNrZWQgY29udGVudCBtYXkgY29udGFpbiByZWZlcmVuY2VzIHRvIHRoZW0uXG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhYnMuZm9yRWFjaCgodGFiLCBpbmRleCkgPT4gdGFiLmlzQWN0aXZlID0gaW5kZXggPT09IGluZGV4VG9TZWxlY3QpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFpc0ZpcnN0UnVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleENoYW5nZS5lbWl0KGluZGV4VG9TZWxlY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0dXAgdGhlIHBvc2l0aW9uIGZvciBlYWNoIHRhYiBhbmQgb3B0aW9uYWxseSBzZXR1cCBhbiBvcmlnaW4gb24gdGhlIG5leHQgc2VsZWN0ZWQgdGFiLlxuICAgICAgICB0aGlzLnRhYnMuZm9yRWFjaCgodGFiOiBNY1RhYiwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgdGFiLnBvc2l0aW9uID0gaW5kZXggLSBpbmRleFRvU2VsZWN0O1xuXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhbHJlYWR5IGEgc2VsZWN0ZWQgdGFiLCB0aGVuIHNldCB1cCBhbiBvcmlnaW4gZm9yIHRoZSBuZXh0IHNlbGVjdGVkIHRhYlxuICAgICAgICAgICAgLy8gaWYgaXQgZG9lc24ndCBoYXZlIG9uZSBhbHJlYWR5LlxuICAgICAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSW5kZXggIT0gbnVsbCAmJiB0YWIucG9zaXRpb24gPT09IDAgJiYgIXRhYi5vcmlnaW4pIHtcbiAgICAgICAgICAgICAgICB0YWIub3JpZ2luID0gaW5kZXhUb1NlbGVjdCAtIHRoaXMuX3NlbGVjdGVkSW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZEluZGV4ICE9PSBpbmRleFRvU2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gaW5kZXhUb1NlbGVjdDtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlVG9UYWJMYWJlbHMoKTtcblxuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gY2hhbmdlcyBpbiB0aGUgYW1vdW50IG9mIHRhYnMsIGluIG9yZGVyIHRvIGJlXG4gICAgICAgIC8vIGFibGUgdG8gcmUtcmVuZGVyIHRoZSBjb250ZW50IGFzIG5ldyB0YWJzIGFyZSBhZGRlZCBvciByZW1vdmVkLlxuICAgICAgICB0aGlzLnRhYnNTdWJzY3JpcHRpb24gPSB0aGlzLnRhYnMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5kZXhUb1NlbGVjdCA9IHRoaXMuY2xhbXBUYWJJbmRleCh0aGlzLmluZGV4VG9TZWxlY3QpO1xuXG4gICAgICAgICAgICAvLyBNYWludGFpbiB0aGUgcHJldmlvdXNseS1zZWxlY3RlZCB0YWIgaWYgYSBuZXcgdGFiIGlzIGFkZGVkIG9yIHJlbW92ZWQgYW5kIHRoZXJlIGlzIG5vXG4gICAgICAgICAgICAvLyBleHBsaWNpdCBjaGFuZ2UgdGhhdCBzZWxlY3RzIGEgZGlmZmVyZW50IHRhYi5cbiAgICAgICAgICAgIGlmIChpbmRleFRvU2VsZWN0ID09PSB0aGlzLl9zZWxlY3RlZEluZGV4KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFicyA9IHRoaXMudGFicy50b0FycmF5KCk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhYnNbaV0uaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFzc2lnbiBib3RoIHRvIHRoZSBgX2luZGV4VG9TZWxlY3RgIGFuZCBgX3NlbGVjdGVkSW5kZXhgIHNvIHdlIGRvbid0IGZpcmUgYSBjaGFuZ2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBldmVudCwgb3RoZXJ3aXNlIHRoZSBjb25zdW1lciBtYXkgZW5kIHVwIGluIGFuIGluZmluaXRlIGxvb3AgaW4gc29tZSBlZGdlIGNhc2VzIGxpa2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZGluZyBhIHRhYiB3aXRoaW4gdGhlIGBzZWxlY3RlZEluZGV4Q2hhbmdlYCBldmVudC5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhUb1NlbGVjdCA9IHRoaXMuX3NlbGVjdGVkSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlVG9UYWJMYWJlbHMoKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnRhYnNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy50YWJMYWJlbFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGZvY3VzQ2hhbmdlZChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZm9jdXNDaGFuZ2UuZW1pdCh0aGlzLmNyZWF0ZUNoYW5nZUV2ZW50KGluZGV4KSk7XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgYSB1bmlxdWUgaWQgZm9yIGVhY2ggdGFiIGxhYmVsIGVsZW1lbnQgKi9cbiAgICBnZXRUYWJMYWJlbElkKGk6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgbWMtdGFiLWxhYmVsLSR7dGhpcy5ncm91cElkfS0ke2l9YDtcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyBhIHVuaXF1ZSBpZCBmb3IgZWFjaCB0YWIgY29udGVudCBlbGVtZW50ICovXG4gICAgZ2V0VGFiQ29udGVudElkKGk6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgbWMtdGFiLWNvbnRlbnQtJHt0aGlzLmdyb3VwSWR9LSR7aX1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGhlaWdodCBvZiB0aGUgYm9keSB3cmFwcGVyIHRvIHRoZSBoZWlnaHQgb2YgdGhlIGFjdGl2YXRpbmcgdGFiIGlmIGR5bmFtaWNcbiAgICAgKiBoZWlnaHQgcHJvcGVydHkgaXMgdHJ1ZS5cbiAgICAgKi9cbiAgICBzZXRUYWJCb2R5V3JhcHBlckhlaWdodCh0YWJIZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX2R5bmFtaWNIZWlnaHQgfHwgIXRoaXMudGFiQm9keVdyYXBwZXJIZWlnaHQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgY29uc3Qgd3JhcHBlcjogSFRNTEVsZW1lbnQgPSB0aGlzLnRhYkJvZHlXcmFwcGVyLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgd3JhcHBlci5zdHlsZS5oZWlnaHQgPSBgJHt0aGlzLnRhYkJvZHlXcmFwcGVySGVpZ2h0fXB4YDtcblxuICAgICAgICAvLyBUaGlzIGNvbmRpdGlvbmFsIGZvcmNlcyB0aGUgYnJvd3NlciB0byBwYWludCB0aGUgaGVpZ2h0IHNvIHRoYXRcbiAgICAgICAgLy8gdGhlIGFuaW1hdGlvbiB0byB0aGUgbmV3IGhlaWdodCBjYW4gaGF2ZSBhbiBvcmlnaW4uXG4gICAgICAgIGlmICh0aGlzLnRhYkJvZHlXcmFwcGVyLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0KSB7XG4gICAgICAgICAgICB3cmFwcGVyLnN0eWxlLmhlaWdodCA9IGAke3RhYkhlaWdodH1weGA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogUmVtb3ZlcyB0aGUgaGVpZ2h0IG9mIHRoZSB0YWIgYm9keSB3cmFwcGVyLiAqL1xuICAgIHJlbW92ZVRhYkJvZHlXcmFwcGVySGVpZ2h0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhYkJvZHlXcmFwcGVySGVpZ2h0ID0gdGhpcy50YWJCb2R5V3JhcHBlci5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgdGhpcy50YWJCb2R5V3JhcHBlci5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9ICcnO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbkRvbmUuZW1pdCgpO1xuICAgIH1cblxuICAgIC8qKiBIYW5kbGUgY2xpY2sgZXZlbnRzLCBzZXR0aW5nIG5ldyBzZWxlY3RlZCBpbmRleCBpZiBhcHByb3ByaWF0ZS4gKi9cbiAgICBoYW5kbGVDbGljayh0YWI6IE1jVGFiLCB0YWJIZWFkZXI6IE1jVGFiSGVhZGVyLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0YWIuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gdGFiSGVhZGVyLmZvY3VzSW5kZXggPSBpbmRleDtcbiAgICB9XG5cbiAgICAvKiogUmV0cmlldmVzIHRoZSB0YWJpbmRleCBmb3IgdGhlIHRhYi4gKi9cbiAgICBnZXRUYWJJbmRleCh0YWI6IE1jVGFiLCBpbmRleDogbnVtYmVyKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIGlmICh0YWIuZGlzYWJsZWQpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEluZGV4ID09PSBpbmRleCA/IDAgOiAtMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUNoYW5nZUV2ZW50KGluZGV4OiBudW1iZXIpOiBNY1RhYkNoYW5nZUV2ZW50IHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgTWNUYWJDaGFuZ2VFdmVudCgpO1xuICAgICAgICBldmVudC5pbmRleCA9IGluZGV4O1xuXG4gICAgICAgIGlmICh0aGlzLnRhYnMgJiYgdGhpcy50YWJzLmxlbmd0aCkge1xuICAgICAgICAgICAgZXZlbnQudGFiID0gdGhpcy50YWJzLnRvQXJyYXkoKVtpbmRleF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlcyB0byBjaGFuZ2VzIGluIHRoZSB0YWIgbGFiZWxzLiBUaGlzIGlzIG5lZWRlZCwgYmVjYXVzZSB0aGUgQElucHV0IGZvciB0aGUgbGFiZWwgaXNcbiAgICAgKiBvbiB0aGUgTWNUYWIgY29tcG9uZW50LCB3aGVyZWFzIHRoZSBkYXRhIGJpbmRpbmcgaXMgaW5zaWRlIHRoZSBNY1RhYkdyb3VwLiBJbiBvcmRlciBmb3IgdGhlXG4gICAgICogYmluZGluZyB0byBiZSB1cGRhdGVkLCB3ZSBuZWVkIHRvIHN1YnNjcmliZSB0byBjaGFuZ2VzIGluIGl0IGFuZCB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb25cbiAgICAgKiBtYW51YWxseS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHN1YnNjcmliZVRvVGFiTGFiZWxzKCkge1xuICAgICAgICBpZiAodGhpcy50YWJMYWJlbFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy50YWJMYWJlbFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50YWJMYWJlbFN1YnNjcmlwdGlvbiA9IG1lcmdlKC4uLnRoaXMudGFicy5tYXAoKHRhYikgPT4gdGFiLnN0YXRlQ2hhbmdlcykpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpO1xuICAgIH1cblxuICAgIC8qKiBDbGFtcHMgdGhlIGdpdmVuIGluZGV4IHRvIHRoZSBib3VuZHMgb2YgMCBhbmQgdGhlIHRhYnMgbGVuZ3RoLiAqL1xuICAgIHByaXZhdGUgY2xhbXBUYWJJbmRleChpbmRleDogbnVtYmVyIHwgbnVsbCk6IG51bWJlciB7XG4gICAgICAgIC8vIE5vdGUgdGhlIGB8fCAwYCwgd2hpY2ggZW5zdXJlcyB0aGF0IHZhbHVlcyBsaWtlIE5hTiBjYW4ndCBnZXQgdGhyb3VnaFxuICAgICAgICAvLyBhbmQgd2hpY2ggd291bGQgb3RoZXJ3aXNlIHRocm93IHRoZSBjb21wb25lbnQgaW50byBhbiBpbmZpbml0ZSBsb29wXG4gICAgICAgIC8vIChzaW5jZSBNY2gubWF4KE5hTiwgMCkgPT09IE5hTikuXG4gICAgICAgIHJldHVybiBNYXRoLm1pbih0aGlzLnRhYnMubGVuZ3RoIC0gMSwgTWF0aC5tYXgoaW5kZXggfHwgMCwgMCkpO1xuICAgIH1cbn1cbiIsIjxtYy10YWItaGVhZGVyXG4gICAgI3RhYkhlYWRlclxuICAgIFt2ZXJ0aWNhbF09XCJ2ZXJ0aWNhbFwiXG4gICAgW3NlbGVjdGVkSW5kZXhdPVwic2VsZWN0ZWRJbmRleFwiXG4gICAgKGluZGV4Rm9jdXNlZCk9XCJmb2N1c0NoYW5nZWQoJGV2ZW50KVwiXG4gICAgKHNlbGVjdEZvY3VzZWRJbmRleCk9XCJzZWxlY3RlZEluZGV4ID0gJGV2ZW50XCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwibWMtdGFiLWxhYmVsXCJcbiAgICAgICAgIG1jVGFiTGFiZWxXcmFwcGVyXG4gICAgICAgICBjZGtNb25pdG9yRWxlbWVudEZvY3VzXG4gICAgICAgICBbYXR0ci50YWJpbmRleF09XCJnZXRUYWJJbmRleCh0YWIsIGkpXCJcbiAgICAgICAgIFtjbGFzcy5tYy10YWItbGFiZWxfb2xkXT1cIm9sZFRhYlwiXG4gICAgICAgICBbY2xhc3MubWMtdGFiLWxhYmVsX2hvcml6b250YWxdPVwiIXZlcnRpY2FsICYmICFvbGRUYWJcIlxuICAgICAgICAgW2NsYXNzLm1jLXRhYi1sYWJlbF92ZXJ0aWNhbF09XCJ2ZXJ0aWNhbCAmJiAhb2xkVGFiXCJcbiAgICAgICAgIFtjbGFzcy5tYy10YWItbGFiZWxfZW1wdHldPVwidGFiLmVtcHR5XCJcbiAgICAgICAgIFtjbGFzcy5tYy1hY3RpdmVdPVwic2VsZWN0ZWRJbmRleCA9PSBpXCJcbiAgICAgICAgICpuZ0Zvcj1cImxldCB0YWIgb2YgdGFiczsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICBbaWRdPVwiZ2V0VGFiTGFiZWxJZChpKVwiXG4gICAgICAgICBbZGlzYWJsZWRdPVwidGFiLmRpc2FibGVkXCJcbiAgICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljayh0YWIsIHRhYkhlYWRlciwgaSlcIlxuXG4gICAgICAgICBbbWNUb29sdGlwXT1cInRhYi50b29sdGlwVGl0bGVcIlxuICAgICAgICAgW21jVG9vbHRpcERpc2FibGVkXT1cIiF0YWIuZW1wdHlcIlxuICAgICAgICAgW21jVHJpZ2dlcl09XCInaG92ZXIsIGZvY3VzJ1wiXG4gICAgICAgICBbbWNQbGFjZW1lbnRdPVwidGFiLnRvb2x0aXBQbGFjZW1lbnRcIj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwibWMtdGFiLWxhYmVsX19jb250ZW50XCJcbiAgICAgICAgICAgIFtjbGFzcy5tYy10YWItbGFiZWxfX3RlbXBsYXRlXT1cInRhYi50ZW1wbGF0ZUxhYmVsXCI+XG4gICAgICAgICAgICA8IS0tIElmIHRoZXJlIGlzIGEgbGFiZWwgdGVtcGxhdGUsIHVzZSBpdC4gLS0+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwidGFiLnRlbXBsYXRlTGFiZWxcIj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW2Nka1BvcnRhbE91dGxldF09XCJ0YWIudGVtcGxhdGVMYWJlbFwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICAgICAgICA8IS0tIElmIHRoZXJlIGlzIG5vdCBhIGxhYmVsIHRlbXBsYXRlLCBmYWxsIGJhY2sgdG8gdGhlIHRleHQgbGFiZWwuIC0tPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiF0YWIudGVtcGxhdGVMYWJlbFwiPnt7IHRhYi50ZXh0TGFiZWwgfX08L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwibWMtdGFiLW92ZXJsYXlcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbjwvbWMtdGFiLWhlYWRlcj5cblxuPGRpdiBjbGFzcz1cIm1jLXRhYi1ib2R5X193cmFwcGVyXCIgI3RhYkJvZHlXcmFwcGVyPlxuICAgIDxtYy10YWItYm9keVxuICAgICAgICAqbmdGb3I9XCJsZXQgdGFiIG9mIHRhYnM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICBbaWRdPVwiZ2V0VGFiQ29udGVudElkKGkpXCJcbiAgICAgICAgW2NsYXNzLm1jLXRhYi1ib2R5X19hY3RpdmVdPVwic2VsZWN0ZWRJbmRleCA9PSBpXCJcbiAgICAgICAgW2NvbnRlbnRdPVwidGFiLmNvbnRlbnRcIlxuICAgICAgICBbcG9zaXRpb25dPVwidGFiLnBvc2l0aW9uXCJcbiAgICAgICAgW29yaWdpbl09XCJ0YWIub3JpZ2luXCJcbiAgICAgICAgW2FuaW1hdGlvbkR1cmF0aW9uXT1cImFuaW1hdGlvbkR1cmF0aW9uXCJcbiAgICAgICAgKG9uQ2VudGVyZWQpPVwicmVtb3ZlVGFiQm9keVdyYXBwZXJIZWlnaHQoKVwiXG4gICAgICAgIChvbkNlbnRlcmluZyk9XCJzZXRUYWJCb2R5V3JhcHBlckhlaWdodCgkZXZlbnQpXCI+XG4gICAgPC9tYy10YWItYm9keT5cbjwvZGl2PlxuIl19