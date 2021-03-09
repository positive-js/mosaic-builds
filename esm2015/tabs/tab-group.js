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
export const McTabGroupMixinBase = mixinColor(mixinDisabled(McTabGroupBase));
/**
 * Tab-group component.  Supports basic tab pairs (label + content) and includes
 * keyboard navigation.
 */
export class McTabGroup extends McTabGroupMixinBase {
    constructor(elementRef, changeDetectorRef, lightTabs, defaultConfig) {
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
        this.lightTab = coerceBooleanProperty(lightTabs);
        this.groupId = nextId++;
        this.animationDuration = defaultConfig && defaultConfig.animationDuration ?
            defaultConfig.animationDuration : '0ms';
    }
    /** Whether the tab group should grow to the size of the active tab. */
    get dynamicHeight() { return this._dynamicHeight; }
    set dynamicHeight(value) { this._dynamicHeight = coerceBooleanProperty(value); }
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
        if (!tab.disabled) {
            this.selectedIndex = tabHeader.focusIndex = index;
        }
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
                styles: [".mc-tab-label.cdk-keyboard-focused:after,.mc-tab-light-label.cdk-keyboard-focused:after,.mc-tab-light-label.mc-active:before,.mc-tab-light-label:hover:before{display:block;position:absolute;content:\"\"}.mc-tab-light-label.mc-active:before,.mc-tab-light-label:hover:before{bottom:calc(-1 * var(--mc-tabs-size-border-width, 1px));left:0;height:var(--mc-tabs-size-highlight-height,4px);right:0}.mc-tab-group{display:flex;flex-direction:column;box-sizing:border-box;text-align:center;white-space:nowrap}.mc-tab-group.mc-tab-group_inverted-header{flex-direction:column-reverse}.mc-tab-label{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:var(--mc-tabs-size-height,40px);text-align:center;white-space:nowrap;cursor:pointer;padding-right:var(--mc-tabs-size-padding-horizontal,16px);padding-left:var(--mc-tabs-size-padding-horizontal,16px);outline:none;border-bottom-width:var(--mc-tabs-size-border-width,1px);border-bottom-style:solid;border-top-width:var(--mc-tabs-size-border-width,1px);border-top-style:solid;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px)}.mc-tab-label.cdk-keyboard-focused{z-index:1}.mc-tab-label.cdk-keyboard-focused:after{top:-calc(var(--mc-tabs-size-border-width,$tabs-size-border-width) * 2);right:calc(-1 * var(--mc-tabs-size-border-width, 1px));bottom:calc(-1 * var(--mc-tabs-size-border-width, 1px));left:calc(-1 * var(--mc-tabs-size-border-width, 1px));border-width:calc(var(--mc-tabs-size-border-width, $tabs-size-border-width) * 2);border-style:solid;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px);border-bottom:none}.mc-tab-label.mc-disabled{pointer-events:none}.mc-tab-label .mc-tab-overlay{position:absolute;top:-1px;left:0;right:0;bottom:0;pointer-events:none}.mc-tab-label.mc-active{padding-right:calc(var(--mc-tabs-size-padding-horizontal, 16px) - var(--mc-tabs-size-border-width, 1px));padding-left:calc(var(--mc-tabs-size-padding-horizontal, 16px) - var(--mc-tabs-size-border-width, 1px));border-width:var(--mc-tabs-size-border-width,1px);border-style:solid}.mc-tab-label.mc-active.cdk-keyboard-focused:after{z-index:1;right:-calc(var(--mc-tabs-size-border-width,$tabs-size-border-width) * 2);left:-calc(var(--mc-tabs-size-border-width,$tabs-size-border-width) * 2)}.mc-tab-label .mc-tab-overlay{border-top:var(--mc-tabs-size-border-width,1px) solid transparent;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px)}.mc-tab-light-label{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:var(--mc-tabs-size-height,40px);text-align:center;white-space:nowrap;cursor:pointer;padding-right:var(--mc-tabs-size-padding-horizontal,16px);padding-left:var(--mc-tabs-size-padding-horizontal,16px);outline:none;border-bottom-width:var(--mc-tabs-size-border-width,1px);border-bottom-style:solid}.mc-tab-light-label.cdk-keyboard-focused{z-index:1}.mc-tab-light-label.cdk-keyboard-focused:after{top:-calc(var(--mc-tabs-size-border-width,$tabs-size-border-width) * 2);right:calc(-1 * var(--mc-tabs-size-border-width, 1px));bottom:calc(-1 * var(--mc-tabs-size-border-width, 1px));left:calc(-1 * var(--mc-tabs-size-border-width, 1px));border-width:calc(var(--mc-tabs-size-border-width, $tabs-size-border-width) * 2);border-style:solid;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px);border-bottom:none}.mc-tab-light-label.mc-disabled{pointer-events:none}.mc-tab-light-label .mc-tab-overlay{top:-1px;left:0;right:0;bottom:0;pointer-events:none}.mc-tab-light-label.cdk-keyboard-focused+:hover:before{left:calc(calc(var(--mc-tabs-size-border-width, $tabs-size-border-width) * 2) - var(--mc-tabs-size-border-width, 1px))}.mc-tab-light-label.cdk-keyboard-focused:after{top:calc(-1 * var(--mc-tabs-size-border-width, 1px))}.mc-tab-light-label .mc-tab-overlay{position:absolute;top:0}.mc-tab-header__content{padding:1px 1px 0}.mc-tab-body__wrapper{display:flex;overflow:hidden;position:relative}.mc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;flex-basis:100%}.mc-tab-body.mc-tab-body__active{overflow-x:hidden;overflow-y:auto;position:relative;z-index:1;flex-grow:1}.mc-tab-group.mc-tab-group_dynamic-height .mc-tab-body.mc-tab-body__active{overflow-y:hidden}"]
            },] }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWdyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RhYnMvdGFiLWdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BGLE9BQU8sRUFHSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLGNBQWMsRUFDZCxNQUFNLEVBQ04sUUFBUSxFQUNSLFNBQVMsRUFBRSxTQUFTLEVBQ3ZCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHSCxVQUFVLEVBQ1YsYUFBYSxFQUNoQixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDOUIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQU8zQyxNQUFNLE9BQU8sb0JBQW9COzs7WUFKaEMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw4REFBOEQ7Z0JBQ3hFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRTthQUN4Qzs7QUFPRCxNQUFNLE9BQU8sMEJBQTBCOzs7WUFKdEMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw0RUFBNEU7Z0JBQ3RGLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxrQ0FBa0MsRUFBRTthQUN0RDs7QUFPRCxNQUFNLE9BQU8sdUJBQXVCOzs7WUFKbkMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzRUFBc0U7Z0JBQ2hGLElBQUksRUFBRSxFQUFFLEtBQUssRUFB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Y2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHksIGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIEluamVjdCxcbiAgICBPcHRpb25hbCxcbiAgICBEaXJlY3RpdmUsIEF0dHJpYnV0ZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQ2FuQ29sb3IsXG4gICAgQ2FuQ29sb3JDdG9yLFxuICAgIG1peGluQ29sb3IsXG4gICAgbWl4aW5EaXNhYmxlZFxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBtZXJnZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE1jVGFiIH0gZnJvbSAnLi90YWInO1xuaW1wb3J0IHsgTWNUYWJIZWFkZXIgfSBmcm9tICcuL3RhYi1oZWFkZXInO1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFiLWdyb3VwW21jLWxpZ2h0LXRhYnNdLCBbbWMtdGFiLW5hdi1iYXJdW21jLWxpZ2h0LXRhYnNdJyxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtdGFiLWdyb3VwX2xpZ2h0JyB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTGlnaHRUYWJzQ3NzU3R5bGVyIHsgfVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLXRhYi1ncm91cFttYy1hbGlnbi10YWJzLWNlbnRlcl0sIFttYy10YWItbmF2LWJhcl1bbWMtYWxpZ24tdGFicy1jZW50ZXJdJyxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtdGFiLWdyb3VwX2FsaWduLWxhYmVscy1jZW50ZXInIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNBbGlnblRhYnNDZW50ZXJDc3NTdHlsZXIgeyB9XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFiLWdyb3VwW21jLWFsaWduLXRhYnMtZW5kXSwgW21jLXRhYi1uYXYtYmFyXVttYy1hbGlnbi10YWJzLWVuZF0nLFxuICAgIGhvc3Q6IHsgY2xhc3M6ICdtYy10YWItZ3JvdXBfYWxpZ24tbGFiZWxzLWVuZCcgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0FsaWduVGFic0VuZENzc1N0eWxlciB7IH1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy10YWItZ3JvdXBbbWMtc3RyZXRjaC10YWJzXSwgW21jLXRhYi1uYXYtYmFyXVttYy1zdHJldGNoLXRhYnNdJyxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtdGFiLWdyb3VwX3N0cmV0Y2gtbGFiZWxzJyB9XG59KVxuZXhwb3J0IGNsYXNzIE1jU3RyZXRjaFRhYnNDc3NTdHlsZXIgeyB9XG5cbi8qKiBVc2VkIHRvIGdlbmVyYXRlIHVuaXF1ZSBJRCdzIGZvciBlYWNoIHRhYiBjb21wb25lbnQgKi9cbmxldCBuZXh0SWQgPSAwO1xuXG4vKiogQSBzaW1wbGUgY2hhbmdlIGV2ZW50IGVtaXR0ZWQgb24gZm9jdXMgb3Igc2VsZWN0aW9uIGNoYW5nZXMuICovXG5leHBvcnQgY2xhc3MgTWNUYWJDaGFuZ2VFdmVudCB7XG4gICAgLyoqIEluZGV4IG9mIHRoZSBjdXJyZW50bHktc2VsZWN0ZWQgdGFiLiAqL1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgY3VycmVudGx5LXNlbGVjdGVkIHRhYi4gKi9cbiAgICB0YWI6IE1jVGFiO1xufVxuXG4vKiogUG9zc2libGUgcG9zaXRpb25zIGZvciB0aGUgdGFiIGhlYWRlci4gKi9cbmV4cG9ydCB0eXBlIE1jVGFiSGVhZGVyUG9zaXRpb24gPSAnYWJvdmUnIHwgJ2JlbG93JztcblxuLyoqIE9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIGNvbmZpZ3VyZSB0aGUgZGVmYXVsdCBvcHRpb25zIGZvciB0aGUgdGFicyBtb2R1bGUuICovXG5leHBvcnQgaW50ZXJmYWNlIElNY1RhYnNDb25maWcge1xuICAgIC8qKiBEdXJhdGlvbiBmb3IgdGhlIHRhYiBhbmltYXRpb24uIE11c3QgYmUgYSB2YWxpZCBDU1MgdmFsdWUgKGUuZy4gNjAwbXMpLiAqL1xuICAgIGFuaW1hdGlvbkR1cmF0aW9uPzogc3RyaW5nO1xufVxuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSB0aGUgZGVmYXVsdCBvcHRpb25zIHRoZSB0YWJzIG1vZHVsZS4gKi9cbmV4cG9ydCBjb25zdCBNQ19UQUJTX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdNQ19UQUJTX0NPTkZJRycpO1xuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1jVGFiR3JvdXAuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNsYXNzIE1jVGFiR3JvdXBCYXNlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHsgfVxufVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNUYWJHcm91cE1peGluQmFzZTogQ2FuQ29sb3JDdG9yICYgdHlwZW9mIE1jVGFiR3JvdXBCYXNlID0gbWl4aW5Db2xvcihtaXhpbkRpc2FibGVkKE1jVGFiR3JvdXBCYXNlKSk7XG5cbi8qKlxuICogVGFiLWdyb3VwIGNvbXBvbmVudC4gIFN1cHBvcnRzIGJhc2ljIHRhYiBwYWlycyAobGFiZWwgKyBjb250ZW50KSBhbmQgaW5jbHVkZXNcbiAqIGtleWJvYXJkIG5hdmlnYXRpb24uXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFiLWdyb3VwJyxcbiAgICBleHBvcnRBczogJ21jVGFiR3JvdXAnLFxuICAgIHRlbXBsYXRlVXJsOiAndGFiLWdyb3VwLmh0bWwnLFxuICAgIHN0eWxlVXJsczogWyd0YWItZ3JvdXAuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgaW5wdXRzOiBbJ2NvbG9yJywgJ2Rpc2FibGVkJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRhYi1ncm91cCcsXG4gICAgICAgICdbY2xhc3MubWMtdGFiLWdyb3VwX2R5bmFtaWMtaGVpZ2h0XSc6ICdkeW5hbWljSGVpZ2h0JyxcbiAgICAgICAgJ1tjbGFzcy5tYy10YWItZ3JvdXBfaW52ZXJ0ZWQtaGVhZGVyXSc6ICdoZWFkZXJQb3NpdGlvbiA9PT0gXCJiZWxvd1wiJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUYWJHcm91cCBleHRlbmRzIE1jVGFiR3JvdXBNaXhpbkJhc2UgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyQ29udGVudENoZWNrZWQsIE9uRGVzdHJveSwgQ2FuQ29sb3Ige1xuICAgIGxpZ2h0VGFiOiBib29sZWFuO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRhYiBncm91cCBzaG91bGQgZ3JvdyB0byB0aGUgc2l6ZSBvZiB0aGUgYWN0aXZlIHRhYi4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBkeW5hbWljSGVpZ2h0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZHluYW1pY0hlaWdodDsgfVxuICAgIHNldCBkeW5hbWljSGVpZ2h0KHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX2R5bmFtaWNIZWlnaHQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG5cbiAgICAvKiogVGhlIGluZGV4IG9mIHRoZSBhY3RpdmUgdGFiLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNlbGVjdGVkSW5kZXgoKTogbnVtYmVyIHwgbnVsbCB7IHJldHVybiB0aGlzLl9zZWxlY3RlZEluZGV4OyB9XG4gICAgc2V0IHNlbGVjdGVkSW5kZXgodmFsdWU6IG51bWJlciB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5pbmRleFRvU2VsZWN0ID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUsIG51bGwpO1xuICAgIH1cblxuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNUYWIpIHRhYnM6IFF1ZXJ5TGlzdDxNY1RhYj47XG5cbiAgICBAVmlld0NoaWxkKCd0YWJCb2R5V3JhcHBlcicsIHtzdGF0aWM6IGZhbHNlfSkgdGFiQm9keVdyYXBwZXI6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCd0YWJIZWFkZXInLCB7c3RhdGljOiBmYWxzZX0pIHRhYkhlYWRlcjogTWNUYWJIZWFkZXI7XG5cbiAgICAvKiogUG9zaXRpb24gb2YgdGhlIHRhYiBoZWFkZXIuICovXG4gICAgQElucHV0KCkgaGVhZGVyUG9zaXRpb246IE1jVGFiSGVhZGVyUG9zaXRpb24gPSAnYWJvdmUnO1xuXG4gICAgLyoqIER1cmF0aW9uIGZvciB0aGUgdGFiIGFuaW1hdGlvbi4gTXVzdCBiZSBhIHZhbGlkIENTUyB2YWx1ZSAoZS5nLiA2MDBtcykuICovXG4gICAgQElucHV0KCkgYW5pbWF0aW9uRHVyYXRpb246IHN0cmluZztcblxuICAgIC8qKiBPdXRwdXQgdG8gZW5hYmxlIHN1cHBvcnQgZm9yIHR3by13YXkgYmluZGluZyBvbiBgWyhzZWxlY3RlZEluZGV4KV1gICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGVkSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIGZvY3VzIGhhcyBjaGFuZ2VkIHdpdGhpbiBhIHRhYiBncm91cC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgZm9jdXNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxNY1RhYkNoYW5nZUV2ZW50PiA9XG4gICAgICAgIG5ldyBFdmVudEVtaXR0ZXI8TWNUYWJDaGFuZ2VFdmVudD4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGJvZHkgYW5pbWF0aW9uIGhhcyBjb21wbGV0ZWQgKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgYW5pbWF0aW9uRG9uZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgdGFiIHNlbGVjdGlvbiBoYXMgY2hhbmdlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0ZWRUYWJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxNY1RhYkNoYW5nZUV2ZW50PiA9XG4gICAgICAgIG5ldyBFdmVudEVtaXR0ZXI8TWNUYWJDaGFuZ2VFdmVudD4odHJ1ZSk7XG5cbiAgICAvKiogVGhlIHRhYiBpbmRleCB0aGF0IHNob3VsZCBiZSBzZWxlY3RlZCBhZnRlciB0aGUgY29udGVudCBoYXMgYmVlbiBjaGVja2VkLiAqL1xuICAgIHByaXZhdGUgaW5kZXhUb1NlbGVjdDogbnVtYmVyIHwgbnVsbCA9IDA7XG5cbiAgICAvKiogU25hcHNob3Qgb2YgdGhlIGhlaWdodCBvZiB0aGUgdGFiIGJvZHkgd3JhcHBlciBiZWZvcmUgYW5vdGhlciB0YWIgaXMgYWN0aXZhdGVkLiAqL1xuICAgIHByaXZhdGUgdGFiQm9keVdyYXBwZXJIZWlnaHQ6IG51bWJlciA9IDA7XG5cbiAgICAvKiogU3Vic2NyaXB0aW9uIHRvIHRhYnMgYmVpbmcgYWRkZWQvcmVtb3ZlZC4gKi9cbiAgICBwcml2YXRlIHRhYnNTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICAvKiogU3Vic2NyaXB0aW9uIHRvIGNoYW5nZXMgaW4gdGhlIHRhYiBsYWJlbHMuICovXG4gICAgcHJpdmF0ZSB0YWJMYWJlbFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICBwcml2YXRlIF9keW5hbWljSGVpZ2h0OiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRJbmRleDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICBwcml2YXRlIGdyb3VwSWQ6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgQEF0dHJpYnV0ZSgnbWMtbGlnaHQtdGFicycpIGxpZ2h0VGFiczogc3RyaW5nLFxuICAgICAgICBASW5qZWN0KE1DX1RBQlNfQ09ORklHKSBAT3B0aW9uYWwoKSBkZWZhdWx0Q29uZmlnPzogSU1jVGFic0NvbmZpZ1xuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgICAgICB0aGlzLmxpZ2h0VGFiID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGxpZ2h0VGFicyk7XG5cbiAgICAgICAgdGhpcy5ncm91cElkID0gbmV4dElkKys7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uRHVyYXRpb24gPSBkZWZhdWx0Q29uZmlnICYmIGRlZmF1bHRDb25maWcuYW5pbWF0aW9uRHVyYXRpb24gP1xuICAgICAgICAgICAgZGVmYXVsdENvbmZpZy5hbmltYXRpb25EdXJhdGlvbiA6ICcwbXMnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFmdGVyIHRoZSBjb250ZW50IGlzIGNoZWNrZWQsIHRoaXMgY29tcG9uZW50IGtub3dzIHdoYXQgdGFicyBoYXZlIGJlZW4gZGVmaW5lZFxuICAgICAqIGFuZCB3aGF0IHRoZSBzZWxlY3RlZCBpbmRleCBzaG91bGQgYmUuIFRoaXMgaXMgd2hlcmUgd2UgY2FuIGtub3cgZXhhY3RseSB3aGF0IHBvc2l0aW9uXG4gICAgICogZWFjaCB0YWIgc2hvdWxkIGJlIGluIGFjY29yZGluZyB0byB0aGUgbmV3IHNlbGVjdGVkIGluZGV4LCBhbmQgYWRkaXRpb25hbGx5IHdlIGtub3cgaG93XG4gICAgICogYSBuZXcgc2VsZWN0ZWQgdGFiIHNob3VsZCB0cmFuc2l0aW9uIGluIChmcm9tIHRoZSBsZWZ0IG9yIHJpZ2h0KS5cbiAgICAgKi9cbiAgICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgICAgIC8vIERvbid0IGNsYW1wIHRoZSBgaW5kZXhUb1NlbGVjdGAgaW1tZWRpYXRlbHkgaW4gdGhlIHNldHRlciBiZWNhdXNlIGl0IGNhbiBoYXBwZW4gdGhhdFxuICAgICAgICAvLyB0aGUgYW1vdW50IG9mIHRhYnMgY2hhbmdlcyBiZWZvcmUgdGhlIGFjdHVhbCBjaGFuZ2UgZGV0ZWN0aW9uIHJ1bnMuXG4gICAgICAgIGNvbnN0IGluZGV4VG9TZWxlY3QgPSB0aGlzLmluZGV4VG9TZWxlY3QgPSB0aGlzLmNsYW1wVGFiSW5kZXgodGhpcy5pbmRleFRvU2VsZWN0KTtcblxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIGNoYW5nZSBpbiBzZWxlY3RlZCBpbmRleCwgZW1pdCBhIGNoYW5nZSBldmVudC4gU2hvdWxkIG5vdCB0cmlnZ2VyIGlmXG4gICAgICAgIC8vIHRoZSBzZWxlY3RlZCBpbmRleCBoYXMgbm90IHlldCBiZWVuIGluaXRpYWxpemVkLlxuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWRJbmRleCAhPT0gaW5kZXhUb1NlbGVjdCkge1xuICAgICAgICAgICAgY29uc3QgaXNGaXJzdFJ1biA9IHRoaXMuX3NlbGVjdGVkSW5kZXggPT0gbnVsbDtcblxuICAgICAgICAgICAgaWYgKCFpc0ZpcnN0UnVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRhYkNoYW5nZS5lbWl0KHRoaXMuY3JlYXRlQ2hhbmdlRXZlbnQoaW5kZXhUb1NlbGVjdCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDaGFuZ2luZyB0aGVzZSB2YWx1ZXMgYWZ0ZXIgY2hhbmdlIGRldGVjdGlvbiBoYXMgcnVuXG4gICAgICAgICAgICAvLyBzaW5jZSB0aGUgY2hlY2tlZCBjb250ZW50IG1heSBjb250YWluIHJlZmVyZW5jZXMgdG8gdGhlbS5cbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudGFicy5mb3JFYWNoKCh0YWIsIGluZGV4KSA9PiB0YWIuaXNBY3RpdmUgPSBpbmRleCA9PT0gaW5kZXhUb1NlbGVjdCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWlzRmlyc3RSdW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4Q2hhbmdlLmVtaXQoaW5kZXhUb1NlbGVjdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXR1cCB0aGUgcG9zaXRpb24gZm9yIGVhY2ggdGFiIGFuZCBvcHRpb25hbGx5IHNldHVwIGFuIG9yaWdpbiBvbiB0aGUgbmV4dCBzZWxlY3RlZCB0YWIuXG4gICAgICAgIHRoaXMudGFicy5mb3JFYWNoKCh0YWI6IE1jVGFiLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICB0YWIucG9zaXRpb24gPSBpbmRleCAtIGluZGV4VG9TZWxlY3Q7XG5cbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIGFscmVhZHkgYSBzZWxlY3RlZCB0YWIsIHRoZW4gc2V0IHVwIGFuIG9yaWdpbiBmb3IgdGhlIG5leHQgc2VsZWN0ZWQgdGFiXG4gICAgICAgICAgICAvLyBpZiBpdCBkb2Vzbid0IGhhdmUgb25lIGFscmVhZHkuXG4gICAgICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWRJbmRleCAhPSBudWxsICYmIHRhYi5wb3NpdGlvbiA9PT0gMCAmJiAhdGFiLm9yaWdpbikge1xuICAgICAgICAgICAgICAgIHRhYi5vcmlnaW4gPSBpbmRleFRvU2VsZWN0IC0gdGhpcy5fc2VsZWN0ZWRJbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSW5kZXggIT09IGluZGV4VG9TZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSBpbmRleFRvU2VsZWN0O1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVUb1RhYkxhYmVscygpO1xuXG4gICAgICAgIC8vIFN1YnNjcmliZSB0byBjaGFuZ2VzIGluIHRoZSBhbW91bnQgb2YgdGFicywgaW4gb3JkZXIgdG8gYmVcbiAgICAgICAgLy8gYWJsZSB0byByZS1yZW5kZXIgdGhlIGNvbnRlbnQgYXMgbmV3IHRhYnMgYXJlIGFkZGVkIG9yIHJlbW92ZWQuXG4gICAgICAgIHRoaXMudGFic1N1YnNjcmlwdGlvbiA9IHRoaXMudGFicy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmRleFRvU2VsZWN0ID0gdGhpcy5jbGFtcFRhYkluZGV4KHRoaXMuaW5kZXhUb1NlbGVjdCk7XG5cbiAgICAgICAgICAgIC8vIE1haW50YWluIHRoZSBwcmV2aW91c2x5LXNlbGVjdGVkIHRhYiBpZiBhIG5ldyB0YWIgaXMgYWRkZWQgb3IgcmVtb3ZlZCBhbmQgdGhlcmUgaXMgbm9cbiAgICAgICAgICAgIC8vIGV4cGxpY2l0IGNoYW5nZSB0aGF0IHNlbGVjdHMgYSBkaWZmZXJlbnQgdGFiLlxuICAgICAgICAgICAgaWYgKGluZGV4VG9TZWxlY3QgPT09IHRoaXMuX3NlbGVjdGVkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YWJzID0gdGhpcy50YWJzLnRvQXJyYXkoKTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFic1tpXS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXNzaWduIGJvdGggdG8gdGhlIGBfaW5kZXhUb1NlbGVjdGAgYW5kIGBfc2VsZWN0ZWRJbmRleGAgc28gd2UgZG9uJ3QgZmlyZSBhIGNoYW5nZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV2ZW50LCBvdGhlcndpc2UgdGhlIGNvbnN1bWVyIG1heSBlbmQgdXAgaW4gYW4gaW5maW5pdGUgbG9vcCBpbiBzb21lIGVkZ2UgY2FzZXMgbGlrZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkaW5nIGEgdGFiIHdpdGhpbiB0aGUgYHNlbGVjdGVkSW5kZXhDaGFuZ2VgIGV2ZW50LlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleFRvU2VsZWN0ID0gdGhpcy5fc2VsZWN0ZWRJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVUb1RhYkxhYmVscygpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudGFic1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnRhYkxhYmVsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgZm9jdXNDaGFuZ2VkKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5mb2N1c0NoYW5nZS5lbWl0KHRoaXMuY3JlYXRlQ2hhbmdlRXZlbnQoaW5kZXgpKTtcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyBhIHVuaXF1ZSBpZCBmb3IgZWFjaCB0YWIgbGFiZWwgZWxlbWVudCAqL1xuICAgIGdldFRhYkxhYmVsSWQoaTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBtYy10YWItbGFiZWwtJHt0aGlzLmdyb3VwSWR9LSR7aX1gO1xuICAgIH1cblxuICAgIC8qKiBSZXR1cm5zIGEgdW5pcXVlIGlkIGZvciBlYWNoIHRhYiBjb250ZW50IGVsZW1lbnQgKi9cbiAgICBnZXRUYWJDb250ZW50SWQoaTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBtYy10YWItY29udGVudC0ke3RoaXMuZ3JvdXBJZH0tJHtpfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgaGVpZ2h0IG9mIHRoZSBib2R5IHdyYXBwZXIgdG8gdGhlIGhlaWdodCBvZiB0aGUgYWN0aXZhdGluZyB0YWIgaWYgZHluYW1pY1xuICAgICAqIGhlaWdodCBwcm9wZXJ0eSBpcyB0cnVlLlxuICAgICAqL1xuICAgIHNldFRhYkJvZHlXcmFwcGVySGVpZ2h0KHRhYkhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fZHluYW1pY0hlaWdodCB8fCAhdGhpcy50YWJCb2R5V3JhcHBlckhlaWdodCkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCB3cmFwcGVyOiBIVE1MRWxlbWVudCA9IHRoaXMudGFiQm9keVdyYXBwZXIubmF0aXZlRWxlbWVudDtcblxuICAgICAgICB3cmFwcGVyLnN0eWxlLmhlaWdodCA9IGAke3RoaXMudGFiQm9keVdyYXBwZXJIZWlnaHR9cHhgO1xuXG4gICAgICAgIC8vIFRoaXMgY29uZGl0aW9uYWwgZm9yY2VzIHRoZSBicm93c2VyIHRvIHBhaW50IHRoZSBoZWlnaHQgc28gdGhhdFxuICAgICAgICAvLyB0aGUgYW5pbWF0aW9uIHRvIHRoZSBuZXcgaGVpZ2h0IGNhbiBoYXZlIGFuIG9yaWdpbi5cbiAgICAgICAgaWYgKHRoaXMudGFiQm9keVdyYXBwZXIubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQpIHtcbiAgICAgICAgICAgIHdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gYCR7dGFiSGVpZ2h0fXB4YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBSZW1vdmVzIHRoZSBoZWlnaHQgb2YgdGhlIHRhYiBib2R5IHdyYXBwZXIuICovXG4gICAgcmVtb3ZlVGFiQm9keVdyYXBwZXJIZWlnaHQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFiQm9keVdyYXBwZXJIZWlnaHQgPSB0aGlzLnRhYkJvZHlXcmFwcGVyLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICB0aGlzLnRhYkJvZHlXcmFwcGVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJyc7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uRG9uZS5lbWl0KCk7XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZSBjbGljayBldmVudHMsIHNldHRpbmcgbmV3IHNlbGVjdGVkIGluZGV4IGlmIGFwcHJvcHJpYXRlLiAqL1xuICAgIGhhbmRsZUNsaWNrKHRhYjogTWNUYWIsIHRhYkhlYWRlcjogTWNUYWJIZWFkZXIsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCF0YWIuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRhYkhlYWRlci5mb2N1c0luZGV4ID0gaW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogUmV0cmlldmVzIHRoZSB0YWJpbmRleCBmb3IgdGhlIHRhYi4gKi9cbiAgICBnZXRUYWJJbmRleCh0YWI6IE1jVGFiLCBpbmRleDogbnVtYmVyKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIGlmICh0YWIuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJbmRleCA9PT0gaW5kZXggPyAwIDogLTE7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVDaGFuZ2VFdmVudChpbmRleDogbnVtYmVyKTogTWNUYWJDaGFuZ2VFdmVudCB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IE1jVGFiQ2hhbmdlRXZlbnQoKTtcbiAgICAgICAgZXZlbnQuaW5kZXggPSBpbmRleDtcbiAgICAgICAgaWYgKHRoaXMudGFicyAmJiB0aGlzLnRhYnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBldmVudC50YWIgPSB0aGlzLnRhYnMudG9BcnJheSgpW2luZGV4XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBldmVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmVzIHRvIGNoYW5nZXMgaW4gdGhlIHRhYiBsYWJlbHMuIFRoaXMgaXMgbmVlZGVkLCBiZWNhdXNlIHRoZSBASW5wdXQgZm9yIHRoZSBsYWJlbCBpc1xuICAgICAqIG9uIHRoZSBNY1RhYiBjb21wb25lbnQsIHdoZXJlYXMgdGhlIGRhdGEgYmluZGluZyBpcyBpbnNpZGUgdGhlIE1jVGFiR3JvdXAuIEluIG9yZGVyIGZvciB0aGVcbiAgICAgKiBiaW5kaW5nIHRvIGJlIHVwZGF0ZWQsIHdlIG5lZWQgdG8gc3Vic2NyaWJlIHRvIGNoYW5nZXMgaW4gaXQgYW5kIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvblxuICAgICAqIG1hbnVhbGx5LlxuICAgICAqL1xuICAgIHByaXZhdGUgc3Vic2NyaWJlVG9UYWJMYWJlbHMoKSB7XG4gICAgICAgIGlmICh0aGlzLnRhYkxhYmVsU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRhYkxhYmVsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRhYkxhYmVsU3Vic2NyaXB0aW9uID0gbWVyZ2UoLi4udGhpcy50YWJzLm1hcCgodGFiKSA9PiB0YWIuc3RhdGVDaGFuZ2VzKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKSk7XG4gICAgfVxuXG4gICAgLyoqIENsYW1wcyB0aGUgZ2l2ZW4gaW5kZXggdG8gdGhlIGJvdW5kcyBvZiAwIGFuZCB0aGUgdGFicyBsZW5ndGguICovXG4gICAgcHJpdmF0ZSBjbGFtcFRhYkluZGV4KGluZGV4OiBudW1iZXIgfCBudWxsKTogbnVtYmVyIHtcbiAgICAgICAgLy8gTm90ZSB0aGUgYHx8IDBgLCB3aGljaCBlbnN1cmVzIHRoYXQgdmFsdWVzIGxpa2UgTmFOIGNhbid0IGdldCB0aHJvdWdoXG4gICAgICAgIC8vIGFuZCB3aGljaCB3b3VsZCBvdGhlcndpc2UgdGhyb3cgdGhlIGNvbXBvbmVudCBpbnRvIGFuIGluZmluaXRlIGxvb3BcbiAgICAgICAgLy8gKHNpbmNlIE1jaC5tYXgoTmFOLCAwKSA9PT0gTmFOKS5cbiAgICAgICAgcmV0dXJuIE1hdGgubWluKHRoaXMudGFicy5sZW5ndGggLSAxLCBNYXRoLm1heChpbmRleCB8fCAwLCAwKSk7XG4gICAgfVxufVxuIl19