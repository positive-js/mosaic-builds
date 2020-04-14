/**
 * @fileoverview added by tsickle
 * Generated from: tab-header.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directionality } from '@angular/cdk/bidi';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input, NgZone, Optional, Output, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { END, ENTER, HOME, SPACE } from '@ptsecurity/cdk/keycodes';
import { merge, of as observableOf, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { McTabLabelWrapper } from './tab-label-wrapper';
/** @type {?} */
const VIEWPORT_THROTTLE_TIME = 150;
/** @type {?} */
const SCROLL_DISTANCE_DELIMITER = 3;
/**
 * The distance in pixels that will be overshot when scrolling a tab label into view. This helps
 * provide a small affordance to the label next to it.
 * @type {?}
 */
const EXAGGERATED_OVERSCROLL = 60;
// Boilerplate for applying mixins to McTabHeader.
/**
 * \@docs-private
 */
export class McTabHeaderBase {
}
/**
 * The header of the tab group which displays a list of all the tabs in the tab group.
 * When the tabs list's width exceeds the width of the header container,
 * then arrows will be displayed to allow the user to scroll
 * left and right across the header.
 * \@docs-private
 */
export class McTabHeader extends McTabHeaderBase {
    /**
     * @param {?} elementRef
     * @param {?} changeDetectorRef
     * @param {?} viewportRuler
     * @param {?} dir
     * @param {?} ngZone
     */
    constructor(elementRef, changeDetectorRef, viewportRuler, dir, ngZone) {
        super();
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this.viewportRuler = viewportRuler;
        this.dir = dir;
        this.ngZone = ngZone;
        /**
         * Whether the controls for pagination should be displayed
         */
        this.showPaginationControls = false;
        /**
         * Whether the tab list can be scrolled more towards the end of the tab label list.
         */
        this.disableScrollAfter = true;
        /**
         * Whether the tab list can be scrolled more towards the beginning of the tab label list.
         */
        this.disableScrollBefore = true;
        /**
         * Event emitted when the option is selected.
         */
        this.selectFocusedIndex = new EventEmitter();
        /**
         * Event emitted when a label is focused.
         */
        this.indexFocused = new EventEmitter();
        /**
         * The distance in pixels that the tab labels should be translated to the left.
         */
        this._scrollDistance = 0;
        /**
         * Whether the header should scroll to the selected index after the view has been checked.
         */
        this.selectedIndexChanged = false;
        /**
         * Emits when the component is destroyed.
         */
        this.destroyed = new Subject();
        this._selectedIndex = 0;
    }
    /**
     * The index of the active tab.
     * @return {?}
     */
    get selectedIndex() {
        return this._selectedIndex;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectedIndex(value) {
        /** @type {?} */
        const coercedValue = coerceNumberProperty(value);
        this.selectedIndexChanged = this._selectedIndex !== coercedValue;
        this._selectedIndex = coercedValue;
        if (this.keyManager) {
            this.keyManager.updateActiveItem(coercedValue);
        }
    }
    /**
     * Tracks which element has focus; used for keyboard navigation
     * @return {?}
     */
    get focusIndex() {
        return this.keyManager ? this.keyManager.activeItemIndex : 0;
    }
    /**
     * When the focus index is set, we must manually send focus to the correct label
     * @param {?} value
     * @return {?}
     */
    set focusIndex(value) {
        if (!this.isValidIndex(value) || this.focusIndex === value || !this.keyManager) {
            return;
        }
        this.keyManager.setActiveItem(value);
    }
    /**
     * Sets the distance in pixels that the tab header should be transformed in the X-axis.
     * @return {?}
     */
    get scrollDistance() {
        return this._scrollDistance;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set scrollDistance(v) {
        this._scrollDistance = Math.max(0, Math.min(this.getMaxScrollDistance(), v));
        // Mark that the scroll distance has changed so that after the view is checked, the CSS
        // transformation can move the header.
        this.scrollDistanceChanged = true;
        this.checkScrollingControls();
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        // If the number of tab labels have changed, check if scrolling should be enabled
        if (this.tabLabelCount !== this.labelWrappers.length) {
            this.updatePagination();
            this.tabLabelCount = this.labelWrappers.length;
            this.changeDetectorRef.markForCheck();
        }
        // If the selected index has changed, scroll to the label and check if the scrolling controls
        // should be disabled.
        if (this.selectedIndexChanged) {
            this.scrollToLabel(this._selectedIndex);
            this.checkScrollingControls();
            this.selectedIndexChanged = false;
            this.changeDetectorRef.markForCheck();
        }
        // If the scroll distance has been changed (tab selected, focused, scroll controls activated),
        // then translate the header to reflect this.
        if (this.scrollDistanceChanged) {
            this.updateTabScrollPosition();
            this.scrollDistanceChanged = false;
            this.changeDetectorRef.markForCheck();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleKeydown(event) {
        // tslint:disable-next-line: deprecation
        switch (event.keyCode) {
            case HOME:
                this.keyManager.setFirstItemActive();
                event.preventDefault();
                break;
            case END:
                this.keyManager.setLastItemActive();
                event.preventDefault();
                break;
            case ENTER:
            case SPACE:
                this.selectFocusedIndex.emit(this.focusIndex);
                event.preventDefault();
                break;
            default:
                this.keyManager.onKeydown(event);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        /** @type {?} */
        const dirChange = this.dir ? this.dir.change : observableOf(null);
        /** @type {?} */
        const resize = this.viewportRuler.change(VIEWPORT_THROTTLE_TIME);
        /** @type {?} */
        const realign = (/**
         * @return {?}
         */
        () => {
            this.updatePagination();
        });
        this.keyManager = new FocusKeyManager(this.labelWrappers)
            .withHorizontalOrientation(this.getLayoutDirection())
            .withWrap();
        this.keyManager.updateActiveItem(0);
        // Defer the first call in order to allow for slower browsers to lay out the elements.
        // This helps in cases where the user lands directly on a page with paginated tabs.
        typeof requestAnimationFrame === undefined
            ? realign()
            : requestAnimationFrame(realign);
        // On dir change or window resize, update the orientation of
        // the key manager if the direction has changed.
        merge(dirChange, resize)
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @return {?}
         */
        () => {
            realign();
            this.keyManager.withHorizontalOrientation(this.getLayoutDirection());
        }));
        // If there is a change in the focus key manager we need to emit the `indexFocused`
        // event in order to provide a public event that notifies about focus changes. Also we realign
        // the tabs container by scrolling the new focused tab into the visible section.
        this.keyManager.change
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @param {?} newFocusIndex
         * @return {?}
         */
        (newFocusIndex) => {
            this.indexFocused.emit(newFocusIndex);
            this.setTabFocus(newFocusIndex);
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
    /**
     * Callback for when the MutationObserver detects that the content has changed.
     * @return {?}
     */
    onContentChanges() {
        /** @type {?} */
        const textContent = this.elementRef.nativeElement.textContent;
        // We need to diff the text content of the header, because the MutationObserver callback
        // will fire even if the text content didn't change which is inefficient and is prone
        // to infinite loops if a poorly constructed expression is passed in.
        if (textContent !== this.currentTextContent) {
            this.currentTextContent = textContent;
            /** @type {?} */
            const zoneCallback = (/**
             * @return {?}
             */
            () => {
                this.updatePagination();
                this.changeDetectorRef.markForCheck();
            });
            // The content observer runs outside the `NgZone` by default, which
            // means that we need to bring the callback back in ourselves.
            // TODO: Remove null check for `_ngZone` once it's a required parameter.
            this.ngZone ? this.ngZone.run(zoneCallback) : zoneCallback();
        }
    }
    /**
     * Updating the view whether pagination should be enabled or not
     *
     * WARNING: Calling this method can be very costly in terms of performance.  It should be called
     * as infrequently as possible from outside of the Tabs component as it causes a reflow of the
     * page.
     * @return {?}
     */
    updatePagination() {
        this.checkPaginationEnabled();
        this.checkScrollingControls();
        this.updateTabScrollPosition();
    }
    /**
     * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
     * providing a valid index and return true.
     * @param {?} index
     * @return {?}
     */
    isValidIndex(index) {
        if (!this.labelWrappers) {
            return true;
        }
        /** @type {?} */
        const tab = this.labelWrappers
            ? this.labelWrappers.toArray()[index]
            : null;
        return !!tab && !tab.disabled;
    }
    /**
     * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
     * scrolling is enabled.
     * @param {?} tabIndex
     * @return {?}
     */
    setTabFocus(tabIndex) {
        if (this.showPaginationControls) {
            this.scrollToLabel(tabIndex);
        }
        if (this.labelWrappers && this.labelWrappers.length) {
            this.labelWrappers.toArray()[tabIndex].focus();
            // Do not let the browser manage scrolling to focus the element, this will be handled
            // by using translation. In LTR, the scroll left should be 0. In RTL, the scroll width
            // should be the full width minus the offset width.
            /** @type {?} */
            const containerEl = this.tabListContainer.nativeElement;
            /** @type {?} */
            const dir = this.getLayoutDirection();
            if (dir === 'ltr') {
                containerEl.scrollLeft = 0;
            }
            else {
                containerEl.scrollLeft =
                    containerEl.scrollWidth - containerEl.offsetWidth;
            }
        }
    }
    /**
     * The layout direction of the containing app.
     * @return {?}
     */
    getLayoutDirection() {
        return this.dir && this.dir.value === 'rtl' ? 'rtl' : 'ltr';
    }
    /**
     * Performs the CSS transformation on the tab list that will cause the list to scroll.
     * @return {?}
     */
    updateTabScrollPosition() {
        /** @type {?} */
        const scrollDistance = this.scrollDistance;
        /** @type {?} */
        const translateX = this.getLayoutDirection() === 'ltr'
            ? -scrollDistance
            : scrollDistance;
        // Don't use `translate3d` here because we don't want to create a new layer. A new layer
        // seems to cause flickering and overflow in Internet Explorer.
        // See: https://github.com/angular/material2/issues/10276
        // We round the `transform` here, because transforms with sub-pixel precision cause some
        // browsers to blur the content of the element.
        this.tabList.nativeElement.style.transform = `translateX(${Math.round(translateX)}px)`;
        // Setting the `transform` on IE will change the scroll offset of the parent, causing the
        // position to be thrown off in some cases. We have to reset it ourselves to ensure that
        // it doesn't get thrown off.
        this.tabList.nativeElement.scrollLeft = 0;
    }
    /**
     * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
     * the end of the list, respectively). The distance to scroll is computed to be a third of the
     * length of the tab list view window.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @param {?} scrollDir
     * @return {?}
     */
    scrollHeader(scrollDir) {
        /** @type {?} */
        const viewLength = this.tabListContainer.nativeElement.offsetWidth;
        // Move the scroll distance one-third the length of the tab list's viewport.
        this.scrollDistance +=
            ((scrollDir === 'before' ? -1 : 1) * viewLength) / SCROLL_DISTANCE_DELIMITER;
    }
    /**
     * Moves the tab list such that the desired tab label (marked by index) is moved into view.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @param {?} labelIndex
     * @return {?}
     */
    scrollToLabel(labelIndex) {
        /** @type {?} */
        const selectedLabel = this.labelWrappers
            ? this.labelWrappers.toArray()[labelIndex]
            : null;
        if (!selectedLabel) {
            return;
        }
        // The view length is the visible width of the tab labels.
        /** @type {?} */
        const viewLength = this.tabListContainer.nativeElement.offsetWidth;
        /** @type {?} */
        let labelBeforePos;
        /** @type {?} */
        let labelAfterPos;
        if (this.getLayoutDirection() === 'ltr') {
            labelBeforePos = selectedLabel.getOffsetLeft();
            labelAfterPos = labelBeforePos + selectedLabel.getOffsetWidth();
        }
        else {
            labelAfterPos =
                this.tabList.nativeElement.offsetWidth -
                    selectedLabel.getOffsetLeft();
            labelBeforePos = labelAfterPos - selectedLabel.getOffsetWidth();
        }
        /** @type {?} */
        const beforeVisiblePos = this.scrollDistance;
        /** @type {?} */
        const afterVisiblePos = this.scrollDistance + viewLength;
        if (labelBeforePos < beforeVisiblePos) {
            // Scroll header to move label to the before direction
            this.scrollDistance -=
                beforeVisiblePos - labelBeforePos + EXAGGERATED_OVERSCROLL;
        }
        else if (labelAfterPos > afterVisiblePos) {
            // Scroll header to move label to the after direction
            this.scrollDistance +=
                labelAfterPos - afterVisiblePos + EXAGGERATED_OVERSCROLL;
        }
    }
    /**
     * Evaluate whether the pagination controls should be displayed. If the scroll width of the
     * tab list is wider than the size of the header container, then the pagination controls should
     * be shown.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    checkPaginationEnabled() {
        /** @type {?} */
        const isEnabled = this.tabList.nativeElement.scrollWidth >
            this.elementRef.nativeElement.offsetWidth;
        if (!isEnabled) {
            this.scrollDistance = 0;
        }
        if (isEnabled !== this.showPaginationControls) {
            this.changeDetectorRef.markForCheck();
        }
        this.showPaginationControls = isEnabled;
    }
    /**
     * Evaluate whether the before and after controls should be enabled or disabled.
     * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
     * before button. If the header is at the end of the list (scroll distance is equal to the
     * maximum distance we can scroll), then disable the after button.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    checkScrollingControls() {
        // Check if the pagination arrows should be activated.
        this.disableScrollBefore = this.scrollDistance === 0;
        this.disableScrollAfter =
            this.scrollDistance === this.getMaxScrollDistance();
        this.changeDetectorRef.markForCheck();
    }
    /**
     * Determines what is the maximum length in pixels that can be set for the scroll distance. This
     * is equal to the difference in width between the tab list container and tab header container.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    getMaxScrollDistance() {
        /** @type {?} */
        const lengthOfTabList = this.tabList.nativeElement.scrollWidth;
        /** @type {?} */
        const viewLength = this.tabListContainer.nativeElement.offsetWidth;
        return lengthOfTabList - viewLength || 0;
    }
}
McTabHeader.decorators = [
    { type: Component, args: [{
                selector: 'mc-tab-header',
                template: "<div class=\"mc-tab-header__pagination mc-tab-header__pagination_before mc-elevation-z4\"\n     aria-hidden=\"true\"\n     [class.mc-tab-header_disabled]=\"disableScrollBefore\"\n     (click)=\"scrollHeader('before')\">\n    <div class=\"mc-tab-header__pagination-chevron\"></div>\n</div>\n\n<div class=\"mc-tab-header__content\"\n     #tabListContainer\n     (keydown)=\"handleKeydown($event)\">\n    <div class=\"mc-tab-list\"\n         #tabList\n         role=\"tablist\"\n         (cdkObserveContent)=\"onContentChanges()\">\n        <div class=\"mc-tab-list__content\">\n            <ng-content></ng-content>\n        </div>\n    </div>\n</div>\n\n<div class=\"mc-tab-header__pagination mc-tab-header__pagination_after mc-elevation-z4\"\n     aria-hidden=\"true\"\n     [class.mc-tab-header_disabled]=\"disableScrollAfter\"\n     (click)=\"scrollHeader('after')\">\n    <div class=\"mc-tab-header__pagination-chevron\"></div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    class: 'mc-tab-header',
                    '[class.mc-tab-header__pagination-controls_enabled]': 'showPaginationControls',
                    '[class.mc-tab-header_rtl]': 'getLayoutDirection() == \'rtl\''
                },
                styles: [".mc-tab-header{display:flex}.mc-tab-header__pagination{position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2}.mc-tab-header__pagination .mc-tab-header__pagination-controls_enabled{display:flex}.mc-tab-header__pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:\"\";height:8px;width:8px}.mc-tab-header__pagination_after,.mc-tab-header_rtl .mc-tab-header__pagination_before{padding-right:4px}.mc-tab-header__pagination_after .mc-tab-header__pagination-chevron,.mc-tab-header_rtl .mc-tab-header__pagination_before .mc-tab-header__pagination-chevron{transform:rotate(45deg)}.mc-tab-header__pagination_before,.mc-tab-header_rtl .mc-tab-header__pagination_after{padding-left:4px}.mc-tab-header__pagination_before .mc-tab-header__pagination-chevron,.mc-tab-header_rtl .mc-tab-header__pagination_after .mc-tab-header__pagination-chevron{transform:rotate(-135deg)}.mc-tab-header_disabled{box-shadow:none;cursor:default}.mc-tab-header__content{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mc-tab-list{flex-grow:1;position:relative;transition:transform .5s cubic-bezier(.35,0,.25,1)}.mc-tab-list__content{display:flex}.mc-tab-group_align-labels-center .mc-tab-list__content{justify-content:center}.mc-tab-group_align-labels-end .mc-tab-list__content{justify-content:flex-end}.mc-tab-group_stretch-labels .mc-tab-label,.mc-tab-group_stretch-labels .mc-tab-light-label{flex-basis:0;flex-grow:1}"]
            }] }
];
/** @nocollapse */
McTabHeader.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: ViewportRuler },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: NgZone }
];
McTabHeader.propDecorators = {
    selectedIndex: [{ type: Input }],
    labelWrappers: [{ type: ContentChildren, args: [McTabLabelWrapper,] }],
    tabListContainer: [{ type: ViewChild, args: ['tabListContainer', { static: true },] }],
    tabList: [{ type: ViewChild, args: ['tabList', { static: true },] }],
    selectFocusedIndex: [{ type: Output }],
    indexFocused: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    McTabHeader.prototype.labelWrappers;
    /** @type {?} */
    McTabHeader.prototype.tabListContainer;
    /** @type {?} */
    McTabHeader.prototype.tabList;
    /**
     * Whether the controls for pagination should be displayed
     * @type {?}
     */
    McTabHeader.prototype.showPaginationControls;
    /**
     * Whether the tab list can be scrolled more towards the end of the tab label list.
     * @type {?}
     */
    McTabHeader.prototype.disableScrollAfter;
    /**
     * Whether the tab list can be scrolled more towards the beginning of the tab label list.
     * @type {?}
     */
    McTabHeader.prototype.disableScrollBefore;
    /**
     * Event emitted when the option is selected.
     * @type {?}
     */
    McTabHeader.prototype.selectFocusedIndex;
    /**
     * Event emitted when a label is focused.
     * @type {?}
     */
    McTabHeader.prototype.indexFocused;
    /**
     * The distance in pixels that the tab labels should be translated to the left.
     * @type {?}
     * @private
     */
    McTabHeader.prototype._scrollDistance;
    /**
     * Whether the header should scroll to the selected index after the view has been checked.
     * @type {?}
     * @private
     */
    McTabHeader.prototype.selectedIndexChanged;
    /**
     * Emits when the component is destroyed.
     * @type {?}
     * @private
     */
    McTabHeader.prototype.destroyed;
    /**
     * The number of tab labels that are displayed on the header. When this changes, the header
     * should re-evaluate the scroll position.
     * @type {?}
     * @private
     */
    McTabHeader.prototype.tabLabelCount;
    /**
     * Whether the scroll distance has changed and should be applied after the view is checked.
     * @type {?}
     * @private
     */
    McTabHeader.prototype.scrollDistanceChanged;
    /**
     * Used to manage focus between the tabs.
     * @type {?}
     * @private
     */
    McTabHeader.prototype.keyManager;
    /**
     * Cached text content of the header.
     * @type {?}
     * @private
     */
    McTabHeader.prototype.currentTextContent;
    /**
     * @type {?}
     * @private
     */
    McTabHeader.prototype._selectedIndex;
    /**
     * @type {?}
     * @private
     */
    McTabHeader.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    McTabHeader.prototype.changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    McTabHeader.prototype.viewportRuler;
    /**
     * @type {?}
     * @private
     */
    McTabHeader.prototype.dir;
    /**
     * @type {?}
     * @private
     */
    McTabHeader.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWhlYWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy90YWJzLyIsInNvdXJjZXMiOlsidGFiLWhlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBYSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUdILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBRU4sUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztNQUdsRCxzQkFBc0IsR0FBRyxHQUFHOztNQUM1Qix5QkFBeUIsR0FBRyxDQUFDOzs7Ozs7TUFjN0Isc0JBQXNCLEdBQUcsRUFBRTs7Ozs7QUFJakMsTUFBTSxPQUFPLGVBQWU7Q0FBRzs7Ozs7Ozs7QUFxQi9CLE1BQU0sT0FBTyxXQUFZLFNBQVEsZUFBZTs7Ozs7Ozs7SUE4RjVDLFlBQ1ksVUFBc0IsRUFDdEIsaUJBQW9DLEVBQ3BD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QTJCOzs7OztJQUczQix5Q0FDK0U7Ozs7O0lBRy9FLG1DQUN5RTs7Ozs7O0lBR3pFLHNDQUE0Qjs7Ozs7O0lBRzVCLDJDQUFxQzs7Ozs7O0lBR3JDLGdDQUFpRDs7Ozs7OztJQU1qRCxvQ0FBOEI7Ozs7OztJQUc5Qiw0Q0FBdUM7Ozs7OztJQUd2QyxpQ0FBdUQ7Ozs7OztJQUd2RCx5Q0FBbUM7Ozs7O0lBRW5DLHFDQUFtQzs7Ozs7SUFHL0IsaUNBQThCOzs7OztJQUM5Qix3Q0FBNEM7Ozs7O0lBQzVDLG9DQUFvQzs7Ozs7SUFDcEMsMEJBQXVDOzs7OztJQUN2Qyw2QkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgVmlld3BvcnRSdWxlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9jdXNLZXlNYW5hZ2VyIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2ExMXknO1xuaW1wb3J0IHsgRU5ELCBFTlRFUiwgSE9NRSwgU1BBQ0UgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgbWVyZ2UsIG9mIGFzIG9ic2VydmFibGVPZiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNY1RhYkxhYmVsV3JhcHBlciB9IGZyb20gJy4vdGFiLWxhYmVsLXdyYXBwZXInO1xuXG5cbmNvbnN0IFZJRVdQT1JUX1RIUk9UVExFX1RJTUUgPSAxNTA7XG5jb25zdCBTQ1JPTExfRElTVEFOQ0VfREVMSU1JVEVSID0gMztcblxuXG4vKipcbiAqIFRoZSBkaXJlY3Rpb25zIHRoYXQgc2Nyb2xsaW5nIGNhbiBnbyBpbiB3aGVuIHRoZSBoZWFkZXIncyB0YWJzIGV4Y2VlZCB0aGUgaGVhZGVyIHdpZHRoLiAnQWZ0ZXInXG4gKiB3aWxsIHNjcm9sbCB0aGUgaGVhZGVyIHRvd2FyZHMgdGhlIGVuZCBvZiB0aGUgdGFicyBsaXN0IGFuZCAnYmVmb3JlJyB3aWxsIHNjcm9sbCB0b3dhcmRzIHRoZVxuICogYmVnaW5uaW5nIG9mIHRoZSBsaXN0LlxuICovXG5leHBvcnQgdHlwZSBTY3JvbGxEaXJlY3Rpb24gPSAnYWZ0ZXInIHwgJ2JlZm9yZSc7XG5cbi8qKlxuICogVGhlIGRpc3RhbmNlIGluIHBpeGVscyB0aGF0IHdpbGwgYmUgb3ZlcnNob3Qgd2hlbiBzY3JvbGxpbmcgYSB0YWIgbGFiZWwgaW50byB2aWV3LiBUaGlzIGhlbHBzXG4gKiBwcm92aWRlIGEgc21hbGwgYWZmb3JkYW5jZSB0byB0aGUgbGFiZWwgbmV4dCB0byBpdC5cbiAqL1xuY29uc3QgRVhBR0dFUkFURURfT1ZFUlNDUk9MTCA9IDYwO1xuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1jVGFiSGVhZGVyLlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjbGFzcyBNY1RhYkhlYWRlckJhc2Uge31cblxuLyoqXG4gKiBUaGUgaGVhZGVyIG9mIHRoZSB0YWIgZ3JvdXAgd2hpY2ggZGlzcGxheXMgYSBsaXN0IG9mIGFsbCB0aGUgdGFicyBpbiB0aGUgdGFiIGdyb3VwLlxuICogV2hlbiB0aGUgdGFicyBsaXN0J3Mgd2lkdGggZXhjZWVkcyB0aGUgd2lkdGggb2YgdGhlIGhlYWRlciBjb250YWluZXIsXG4gKiB0aGVuIGFycm93cyB3aWxsIGJlIGRpc3BsYXllZCB0byBhbGxvdyB0aGUgdXNlciB0byBzY3JvbGxcbiAqIGxlZnQgYW5kIHJpZ2h0IGFjcm9zcyB0aGUgaGVhZGVyLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRhYi1oZWFkZXInLFxuICAgIHRlbXBsYXRlVXJsOiAndGFiLWhlYWRlci5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsndGFiLWhlYWRlci5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdGFiLWhlYWRlcicsXG4gICAgICAgICdbY2xhc3MubWMtdGFiLWhlYWRlcl9fcGFnaW5hdGlvbi1jb250cm9sc19lbmFibGVkXSc6ICdzaG93UGFnaW5hdGlvbkNvbnRyb2xzJyxcbiAgICAgICAgJ1tjbGFzcy5tYy10YWItaGVhZGVyX3J0bF0nOiAnZ2V0TGF5b3V0RGlyZWN0aW9uKCkgPT0gXFwncnRsXFwnJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUYWJIZWFkZXIgZXh0ZW5kcyBNY1RhYkhlYWRlckJhc2VcbiAgICBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gICAgLyoqIFRoZSBpbmRleCBvZiB0aGUgYWN0aXZlIHRhYi4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RlZEluZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEluZGV4O1xuICAgIH1cbiAgICBzZXQgc2VsZWN0ZWRJbmRleCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGNvZXJjZWRWYWx1ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4Q2hhbmdlZCA9IHRoaXMuX3NlbGVjdGVkSW5kZXggIT09IGNvZXJjZWRWYWx1ZTtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IGNvZXJjZWRWYWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5rZXlNYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIudXBkYXRlQWN0aXZlSXRlbShjb2VyY2VkVmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFRyYWNrcyB3aGljaCBlbGVtZW50IGhhcyBmb2N1czsgdXNlZCBmb3Iga2V5Ym9hcmQgbmF2aWdhdGlvbiAqL1xuICAgIGdldCBmb2N1c0luZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmtleU1hbmFnZXIgPyB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4IDogMDtcbiAgICB9XG5cbiAgICAvKiogV2hlbiB0aGUgZm9jdXMgaW5kZXggaXMgc2V0LCB3ZSBtdXN0IG1hbnVhbGx5IHNlbmQgZm9jdXMgdG8gdGhlIGNvcnJlY3QgbGFiZWwgKi9cbiAgICBzZXQgZm9jdXNJbmRleCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkSW5kZXgodmFsdWUpIHx8IHRoaXMuZm9jdXNJbmRleCA9PT0gdmFsdWUgfHwgIXRoaXMua2V5TWFuYWdlcikgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqIFNldHMgdGhlIGRpc3RhbmNlIGluIHBpeGVscyB0aGF0IHRoZSB0YWIgaGVhZGVyIHNob3VsZCBiZSB0cmFuc2Zvcm1lZCBpbiB0aGUgWC1heGlzLiAqL1xuICAgIGdldCBzY3JvbGxEaXN0YW5jZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2Nyb2xsRGlzdGFuY2U7XG4gICAgfVxuICAgIHNldCBzY3JvbGxEaXN0YW5jZSh2OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsRGlzdGFuY2UgPSBNYXRoLm1heChcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBNYXRoLm1pbih0aGlzLmdldE1heFNjcm9sbERpc3RhbmNlKCksIHYpXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gTWFyayB0aGF0IHRoZSBzY3JvbGwgZGlzdGFuY2UgaGFzIGNoYW5nZWQgc28gdGhhdCBhZnRlciB0aGUgdmlldyBpcyBjaGVja2VkLCB0aGUgQ1NTXG4gICAgICAgIC8vIHRyYW5zZm9ybWF0aW9uIGNhbiBtb3ZlIHRoZSBoZWFkZXIuXG4gICAgICAgIHRoaXMuc2Nyb2xsRGlzdGFuY2VDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jaGVja1Njcm9sbGluZ0NvbnRyb2xzKCk7XG4gICAgfVxuXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY1RhYkxhYmVsV3JhcHBlcikgbGFiZWxXcmFwcGVyczogUXVlcnlMaXN0PE1jVGFiTGFiZWxXcmFwcGVyPjtcblxuICAgIEBWaWV3Q2hpbGQoJ3RhYkxpc3RDb250YWluZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSB0YWJMaXN0Q29udGFpbmVyOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgndGFiTGlzdCcsIHsgc3RhdGljOiB0cnVlIH0pIHRhYkxpc3Q6IEVsZW1lbnRSZWY7XG5cbiAgICAvKiogV2hldGhlciB0aGUgY29udHJvbHMgZm9yIHBhZ2luYXRpb24gc2hvdWxkIGJlIGRpc3BsYXllZCAqL1xuICAgIHNob3dQYWdpbmF0aW9uQ29udHJvbHMgPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSB0YWIgbGlzdCBjYW4gYmUgc2Nyb2xsZWQgbW9yZSB0b3dhcmRzIHRoZSBlbmQgb2YgdGhlIHRhYiBsYWJlbCBsaXN0LiAqL1xuICAgIGRpc2FibGVTY3JvbGxBZnRlciA9IHRydWU7XG5cbiAgICAvKiogV2hldGhlciB0aGUgdGFiIGxpc3QgY2FuIGJlIHNjcm9sbGVkIG1vcmUgdG93YXJkcyB0aGUgYmVnaW5uaW5nIG9mIHRoZSB0YWIgbGFiZWwgbGlzdC4gKi9cbiAgICBkaXNhYmxlU2Nyb2xsQmVmb3JlID0gdHJ1ZTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIG9wdGlvbiBpcyBzZWxlY3RlZC4gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBzZWxlY3RGb2N1c2VkSW5kZXg6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIGEgbGFiZWwgaXMgZm9jdXNlZC4gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBpbmRleEZvY3VzZWQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICAvKiogVGhlIGRpc3RhbmNlIGluIHBpeGVscyB0aGF0IHRoZSB0YWIgbGFiZWxzIHNob3VsZCBiZSB0cmFuc2xhdGVkIHRvIHRoZSBsZWZ0LiAqL1xuICAgIHByaXZhdGUgX3Njcm9sbERpc3RhbmNlID0gMDtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBoZWFkZXIgc2hvdWxkIHNjcm9sbCB0byB0aGUgc2VsZWN0ZWQgaW5kZXggYWZ0ZXIgdGhlIHZpZXcgaGFzIGJlZW4gY2hlY2tlZC4gKi9cbiAgICBwcml2YXRlIHNlbGVjdGVkSW5kZXhDaGFuZ2VkID0gZmFsc2U7XG5cbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZC4gKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbnVtYmVyIG9mIHRhYiBsYWJlbHMgdGhhdCBhcmUgZGlzcGxheWVkIG9uIHRoZSBoZWFkZXIuIFdoZW4gdGhpcyBjaGFuZ2VzLCB0aGUgaGVhZGVyXG4gICAgICogc2hvdWxkIHJlLWV2YWx1YXRlIHRoZSBzY3JvbGwgcG9zaXRpb24uXG4gICAgICovXG4gICAgcHJpdmF0ZSB0YWJMYWJlbENvdW50OiBudW1iZXI7XG5cbiAgICAvKiogV2hldGhlciB0aGUgc2Nyb2xsIGRpc3RhbmNlIGhhcyBjaGFuZ2VkIGFuZCBzaG91bGQgYmUgYXBwbGllZCBhZnRlciB0aGUgdmlldyBpcyBjaGVja2VkLiAqL1xuICAgIHByaXZhdGUgc2Nyb2xsRGlzdGFuY2VDaGFuZ2VkOiBib29sZWFuO1xuXG4gICAgLyoqIFVzZWQgdG8gbWFuYWdlIGZvY3VzIGJldHdlZW4gdGhlIHRhYnMuICovXG4gICAgcHJpdmF0ZSBrZXlNYW5hZ2VyOiBGb2N1c0tleU1hbmFnZXI8TWNUYWJMYWJlbFdyYXBwZXI+O1xuXG4gICAgLyoqIENhY2hlZCB0ZXh0IGNvbnRlbnQgb2YgdGhlIGhlYWRlci4gKi9cbiAgICBwcml2YXRlIGN1cnJlbnRUZXh0Q29udGVudDogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRJbmRleDogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIHZpZXdwb3J0UnVsZXI6IFZpZXdwb3J0UnVsZXIsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgLy8gSWYgdGhlIG51bWJlciBvZiB0YWIgbGFiZWxzIGhhdmUgY2hhbmdlZCwgY2hlY2sgaWYgc2Nyb2xsaW5nIHNob3VsZCBiZSBlbmFibGVkXG4gICAgICAgIGlmICh0aGlzLnRhYkxhYmVsQ291bnQgIT09IHRoaXMubGFiZWxXcmFwcGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbigpO1xuICAgICAgICAgICAgdGhpcy50YWJMYWJlbENvdW50ID0gdGhpcy5sYWJlbFdyYXBwZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGUgc2VsZWN0ZWQgaW5kZXggaGFzIGNoYW5nZWQsIHNjcm9sbCB0byB0aGUgbGFiZWwgYW5kIGNoZWNrIGlmIHRoZSBzY3JvbGxpbmcgY29udHJvbHNcbiAgICAgICAgLy8gc2hvdWxkIGJlIGRpc2FibGVkLlxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4Q2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxUb0xhYmVsKHRoaXMuX3NlbGVjdGVkSW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5jaGVja1Njcm9sbGluZ0NvbnRyb2xzKCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXhDaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlIHNjcm9sbCBkaXN0YW5jZSBoYXMgYmVlbiBjaGFuZ2VkICh0YWIgc2VsZWN0ZWQsIGZvY3VzZWQsIHNjcm9sbCBjb250cm9scyBhY3RpdmF0ZWQpLFxuICAgICAgICAvLyB0aGVuIHRyYW5zbGF0ZSB0aGUgaGVhZGVyIHRvIHJlZmxlY3QgdGhpcy5cbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsRGlzdGFuY2VDaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRhYlNjcm9sbFBvc2l0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbERpc3RhbmNlQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgSE9NRTpcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRU5EOlxuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRMYXN0SXRlbUFjdGl2ZSgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVOVEVSOlxuICAgICAgICAgICAgY2FzZSBTUEFDRTpcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEZvY3VzZWRJbmRleC5lbWl0KHRoaXMuZm9jdXNJbmRleCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIGNvbnN0IGRpckNoYW5nZSA9IHRoaXMuZGlyID8gdGhpcy5kaXIuY2hhbmdlIDogb2JzZXJ2YWJsZU9mKG51bGwpO1xuICAgICAgICBjb25zdCByZXNpemUgPSB0aGlzLnZpZXdwb3J0UnVsZXIuY2hhbmdlKFZJRVdQT1JUX1RIUk9UVExFX1RJTUUpO1xuICAgICAgICBjb25zdCByZWFsaWduID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0aW9uKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyID0gbmV3IEZvY3VzS2V5TWFuYWdlcih0aGlzLmxhYmVsV3JhcHBlcnMpXG4gICAgICAgICAgICAud2l0aEhvcml6b250YWxPcmllbnRhdGlvbih0aGlzLmdldExheW91dERpcmVjdGlvbigpKVxuICAgICAgICAgICAgLndpdGhXcmFwKCk7XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnVwZGF0ZUFjdGl2ZUl0ZW0oMCk7XG5cbiAgICAgICAgLy8gRGVmZXIgdGhlIGZpcnN0IGNhbGwgaW4gb3JkZXIgdG8gYWxsb3cgZm9yIHNsb3dlciBicm93c2VycyB0byBsYXkgb3V0IHRoZSBlbGVtZW50cy5cbiAgICAgICAgLy8gVGhpcyBoZWxwcyBpbiBjYXNlcyB3aGVyZSB0aGUgdXNlciBsYW5kcyBkaXJlY3RseSBvbiBhIHBhZ2Ugd2l0aCBwYWdpbmF0ZWQgdGFicy5cbiAgICAgICAgdHlwZW9mIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IHJlYWxpZ24oKVxuICAgICAgICAgICAgOiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVhbGlnbik7XG5cbiAgICAgICAgLy8gT24gZGlyIGNoYW5nZSBvciB3aW5kb3cgcmVzaXplLCB1cGRhdGUgdGhlIG9yaWVudGF0aW9uIG9mXG4gICAgICAgIC8vIHRoZSBrZXkgbWFuYWdlciBpZiB0aGUgZGlyZWN0aW9uIGhhcyBjaGFuZ2VkLlxuICAgICAgICBtZXJnZShkaXJDaGFuZ2UsIHJlc2l6ZSlcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZWFsaWduKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24oXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0TGF5b3V0RGlyZWN0aW9uKClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSBjaGFuZ2UgaW4gdGhlIGZvY3VzIGtleSBtYW5hZ2VyIHdlIG5lZWQgdG8gZW1pdCB0aGUgYGluZGV4Rm9jdXNlZGBcbiAgICAgICAgLy8gZXZlbnQgaW4gb3JkZXIgdG8gcHJvdmlkZSBhIHB1YmxpYyBldmVudCB0aGF0IG5vdGlmaWVzIGFib3V0IGZvY3VzIGNoYW5nZXMuIEFsc28gd2UgcmVhbGlnblxuICAgICAgICAvLyB0aGUgdGFicyBjb250YWluZXIgYnkgc2Nyb2xsaW5nIHRoZSBuZXcgZm9jdXNlZCB0YWIgaW50byB0aGUgdmlzaWJsZSBzZWN0aW9uLlxuICAgICAgICB0aGlzLmtleU1hbmFnZXIuY2hhbmdlXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgobmV3Rm9jdXNJbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhGb2N1c2VkLmVtaXQobmV3Rm9jdXNJbmRleCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUYWJGb2N1cyhuZXdGb2N1c0luZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3llZC5uZXh0KCk7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgZm9yIHdoZW4gdGhlIE11dGF0aW9uT2JzZXJ2ZXIgZGV0ZWN0cyB0aGF0IHRoZSBjb250ZW50IGhhcyBjaGFuZ2VkLlxuICAgICAqL1xuICAgIG9uQ29udGVudENoYW5nZXMoKSB7XG4gICAgICAgIGNvbnN0IHRleHRDb250ZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQ7XG5cbiAgICAgICAgLy8gV2UgbmVlZCB0byBkaWZmIHRoZSB0ZXh0IGNvbnRlbnQgb2YgdGhlIGhlYWRlciwgYmVjYXVzZSB0aGUgTXV0YXRpb25PYnNlcnZlciBjYWxsYmFja1xuICAgICAgICAvLyB3aWxsIGZpcmUgZXZlbiBpZiB0aGUgdGV4dCBjb250ZW50IGRpZG4ndCBjaGFuZ2Ugd2hpY2ggaXMgaW5lZmZpY2llbnQgYW5kIGlzIHByb25lXG4gICAgICAgIC8vIHRvIGluZmluaXRlIGxvb3BzIGlmIGEgcG9vcmx5IGNvbnN0cnVjdGVkIGV4cHJlc3Npb24gaXMgcGFzc2VkIGluLlxuXG4gICAgICAgIGlmICh0ZXh0Q29udGVudCAhPT0gdGhpcy5jdXJyZW50VGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRleHRDb250ZW50ID0gdGV4dENvbnRlbnQ7XG5cbiAgICAgICAgICAgIGNvbnN0IHpvbmVDYWxsYmFjayA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBhZ2luYXRpb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gVGhlIGNvbnRlbnQgb2JzZXJ2ZXIgcnVucyBvdXRzaWRlIHRoZSBgTmdab25lYCBieSBkZWZhdWx0LCB3aGljaFxuICAgICAgICAgICAgLy8gbWVhbnMgdGhhdCB3ZSBuZWVkIHRvIGJyaW5nIHRoZSBjYWxsYmFjayBiYWNrIGluIG91cnNlbHZlcy5cbiAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSBudWxsIGNoZWNrIGZvciBgX25nWm9uZWAgb25jZSBpdCdzIGEgcmVxdWlyZWQgcGFyYW1ldGVyLlxuICAgICAgICAgICAgdGhpcy5uZ1pvbmUgPyB0aGlzLm5nWm9uZS5ydW4oem9uZUNhbGxiYWNrKSA6IHpvbmVDYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRpbmcgdGhlIHZpZXcgd2hldGhlciBwYWdpbmF0aW9uIHNob3VsZCBiZSBlbmFibGVkIG9yIG5vdFxuICAgICAqXG4gICAgICogV0FSTklORzogQ2FsbGluZyB0aGlzIG1ldGhvZCBjYW4gYmUgdmVyeSBjb3N0bHkgaW4gdGVybXMgb2YgcGVyZm9ybWFuY2UuICBJdCBzaG91bGQgYmUgY2FsbGVkXG4gICAgICogYXMgaW5mcmVxdWVudGx5IGFzIHBvc3NpYmxlIGZyb20gb3V0c2lkZSBvZiB0aGUgVGFicyBjb21wb25lbnQgYXMgaXQgY2F1c2VzIGEgcmVmbG93IG9mIHRoZVxuICAgICAqIHBhZ2UuXG4gICAgICovXG4gICAgdXBkYXRlUGFnaW5hdGlvbigpIHtcbiAgICAgICAgdGhpcy5jaGVja1BhZ2luYXRpb25FbmFibGVkKCk7XG4gICAgICAgIHRoaXMuY2hlY2tTY3JvbGxpbmdDb250cm9scygpO1xuICAgICAgICB0aGlzLnVwZGF0ZVRhYlNjcm9sbFBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyBpZiBhbiBpbmRleCBpcyB2YWxpZC4gIElmIHRoZSB0YWJzIGFyZSBub3QgcmVhZHkgeWV0LCB3ZSBhc3N1bWUgdGhhdCB0aGUgdXNlciBpc1xuICAgICAqIHByb3ZpZGluZyBhIHZhbGlkIGluZGV4IGFuZCByZXR1cm4gdHJ1ZS5cbiAgICAgKi9cbiAgICBpc1ZhbGlkSW5kZXgoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIXRoaXMubGFiZWxXcmFwcGVycykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0YWIgPSB0aGlzLmxhYmVsV3JhcHBlcnNcbiAgICAgICAgICAgID8gdGhpcy5sYWJlbFdyYXBwZXJzLnRvQXJyYXkoKVtpbmRleF1cbiAgICAgICAgICAgIDogbnVsbDtcblxuICAgICAgICByZXR1cm4gISF0YWIgJiYgIXRhYi5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGZvY3VzIG9uIHRoZSBIVE1MIGVsZW1lbnQgZm9yIHRoZSBsYWJlbCB3cmFwcGVyIGFuZCBzY3JvbGxzIGl0IGludG8gdGhlIHZpZXcgaWZcbiAgICAgKiBzY3JvbGxpbmcgaXMgZW5hYmxlZC5cbiAgICAgKi9cbiAgICBzZXRUYWJGb2N1cyh0YWJJbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3dQYWdpbmF0aW9uQ29udHJvbHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9MYWJlbCh0YWJJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5sYWJlbFdyYXBwZXJzICYmIHRoaXMubGFiZWxXcmFwcGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMubGFiZWxXcmFwcGVycy50b0FycmF5KClbdGFiSW5kZXhdLmZvY3VzKCk7XG5cbiAgICAgICAgICAgIC8vIERvIG5vdCBsZXQgdGhlIGJyb3dzZXIgbWFuYWdlIHNjcm9sbGluZyB0byBmb2N1cyB0aGUgZWxlbWVudCwgdGhpcyB3aWxsIGJlIGhhbmRsZWRcbiAgICAgICAgICAgIC8vIGJ5IHVzaW5nIHRyYW5zbGF0aW9uLiBJbiBMVFIsIHRoZSBzY3JvbGwgbGVmdCBzaG91bGQgYmUgMC4gSW4gUlRMLCB0aGUgc2Nyb2xsIHdpZHRoXG4gICAgICAgICAgICAvLyBzaG91bGQgYmUgdGhlIGZ1bGwgd2lkdGggbWludXMgdGhlIG9mZnNldCB3aWR0aC5cbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lckVsID0gdGhpcy50YWJMaXN0Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBkaXIgPSB0aGlzLmdldExheW91dERpcmVjdGlvbigpO1xuXG4gICAgICAgICAgICBpZiAoZGlyID09PSAnbHRyJykge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lckVsLnNjcm9sbExlZnQgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXJFbC5zY3JvbGxMZWZ0ID1cbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyRWwuc2Nyb2xsV2lkdGggLSBjb250YWluZXJFbC5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBUaGUgbGF5b3V0IGRpcmVjdGlvbiBvZiB0aGUgY29udGFpbmluZyBhcHAuICovXG4gICAgZ2V0TGF5b3V0RGlyZWN0aW9uKCk6IERpcmVjdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpciAmJiB0aGlzLmRpci52YWx1ZSA9PT0gJ3J0bCcgPyAncnRsJyA6ICdsdHInO1xuICAgIH1cblxuICAgIC8qKiBQZXJmb3JtcyB0aGUgQ1NTIHRyYW5zZm9ybWF0aW9uIG9uIHRoZSB0YWIgbGlzdCB0aGF0IHdpbGwgY2F1c2UgdGhlIGxpc3QgdG8gc2Nyb2xsLiAqL1xuICAgIHVwZGF0ZVRhYlNjcm9sbFBvc2l0aW9uKCkge1xuICAgICAgICBjb25zdCBzY3JvbGxEaXN0YW5jZSA9IHRoaXMuc2Nyb2xsRGlzdGFuY2U7XG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZVggPVxuICAgICAgICAgICAgdGhpcy5nZXRMYXlvdXREaXJlY3Rpb24oKSA9PT0gJ2x0cidcbiAgICAgICAgICAgICAgICA/IC1zY3JvbGxEaXN0YW5jZVxuICAgICAgICAgICAgICAgIDogc2Nyb2xsRGlzdGFuY2U7XG5cbiAgICAgICAgLy8gRG9uJ3QgdXNlIGB0cmFuc2xhdGUzZGAgaGVyZSBiZWNhdXNlIHdlIGRvbid0IHdhbnQgdG8gY3JlYXRlIGEgbmV3IGxheWVyLiBBIG5ldyBsYXllclxuICAgICAgICAvLyBzZWVtcyB0byBjYXVzZSBmbGlja2VyaW5nIGFuZCBvdmVyZmxvdyBpbiBJbnRlcm5ldCBFeHBsb3Jlci5cbiAgICAgICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvaXNzdWVzLzEwMjc2XG4gICAgICAgIC8vIFdlIHJvdW5kIHRoZSBgdHJhbnNmb3JtYCBoZXJlLCBiZWNhdXNlIHRyYW5zZm9ybXMgd2l0aCBzdWItcGl4ZWwgcHJlY2lzaW9uIGNhdXNlIHNvbWVcbiAgICAgICAgLy8gYnJvd3NlcnMgdG8gYmx1ciB0aGUgY29udGVudCBvZiB0aGUgZWxlbWVudC5cbiAgICAgICAgdGhpcy50YWJMaXN0Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtNYXRoLnJvdW5kKHRyYW5zbGF0ZVgpfXB4KWA7XG5cbiAgICAgICAgLy8gU2V0dGluZyB0aGUgYHRyYW5zZm9ybWAgb24gSUUgd2lsbCBjaGFuZ2UgdGhlIHNjcm9sbCBvZmZzZXQgb2YgdGhlIHBhcmVudCwgY2F1c2luZyB0aGVcbiAgICAgICAgLy8gcG9zaXRpb24gdG8gYmUgdGhyb3duIG9mZiBpbiBzb21lIGNhc2VzLiBXZSBoYXZlIHRvIHJlc2V0IGl0IG91cnNlbHZlcyB0byBlbnN1cmUgdGhhdFxuICAgICAgICAvLyBpdCBkb2Vzbid0IGdldCB0aHJvd24gb2ZmLlxuICAgICAgICB0aGlzLnRhYkxpc3QubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0ID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3ZlcyB0aGUgdGFiIGxpc3QgaW4gdGhlICdiZWZvcmUnIG9yICdhZnRlcicgZGlyZWN0aW9uICh0b3dhcmRzIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpc3Qgb3JcbiAgICAgKiB0aGUgZW5kIG9mIHRoZSBsaXN0LCByZXNwZWN0aXZlbHkpLiBUaGUgZGlzdGFuY2UgdG8gc2Nyb2xsIGlzIGNvbXB1dGVkIHRvIGJlIGEgdGhpcmQgb2YgdGhlXG4gICAgICogbGVuZ3RoIG9mIHRoZSB0YWIgbGlzdCB2aWV3IHdpbmRvdy5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgYW4gZXhwZW5zaXZlIGNhbGwgdGhhdCBmb3JjZXMgYSBsYXlvdXQgcmVmbG93IHRvIGNvbXB1dGUgYm94IGFuZCBzY3JvbGwgbWV0cmljcyBhbmRcbiAgICAgKiBzaG91bGQgYmUgY2FsbGVkIHNwYXJpbmdseS5cbiAgICAgKi9cbiAgICBzY3JvbGxIZWFkZXIoc2Nyb2xsRGlyOiBTY3JvbGxEaXJlY3Rpb24pIHtcbiAgICAgICAgY29uc3Qgdmlld0xlbmd0aCA9IHRoaXMudGFiTGlzdENvbnRhaW5lci5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuXG4gICAgICAgIC8vIE1vdmUgdGhlIHNjcm9sbCBkaXN0YW5jZSBvbmUtdGhpcmQgdGhlIGxlbmd0aCBvZiB0aGUgdGFiIGxpc3QncyB2aWV3cG9ydC5cbiAgICAgICAgdGhpcy5zY3JvbGxEaXN0YW5jZSArPVxuICAgICAgICAgICAgKChzY3JvbGxEaXIgPT09ICdiZWZvcmUnID8gLTEgOiAxKSAqIHZpZXdMZW5ndGgpIC8gU0NST0xMX0RJU1RBTkNFX0RFTElNSVRFUjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3ZlcyB0aGUgdGFiIGxpc3Qgc3VjaCB0aGF0IHRoZSBkZXNpcmVkIHRhYiBsYWJlbCAobWFya2VkIGJ5IGluZGV4KSBpcyBtb3ZlZCBpbnRvIHZpZXcuXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIGFuIGV4cGVuc2l2ZSBjYWxsIHRoYXQgZm9yY2VzIGEgbGF5b3V0IHJlZmxvdyB0byBjb21wdXRlIGJveCBhbmQgc2Nyb2xsIG1ldHJpY3MgYW5kXG4gICAgICogc2hvdWxkIGJlIGNhbGxlZCBzcGFyaW5nbHkuXG4gICAgICovXG4gICAgc2Nyb2xsVG9MYWJlbChsYWJlbEluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRMYWJlbCA9IHRoaXMubGFiZWxXcmFwcGVyc1xuICAgICAgICAgICAgPyB0aGlzLmxhYmVsV3JhcHBlcnMudG9BcnJheSgpW2xhYmVsSW5kZXhdXG4gICAgICAgICAgICA6IG51bGw7XG5cbiAgICAgICAgaWYgKCFzZWxlY3RlZExhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgdmlldyBsZW5ndGggaXMgdGhlIHZpc2libGUgd2lkdGggb2YgdGhlIHRhYiBsYWJlbHMuXG4gICAgICAgIGNvbnN0IHZpZXdMZW5ndGg6IG51bWJlciA9IHRoaXMudGFiTGlzdENvbnRhaW5lci5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuXG4gICAgICAgIGxldCBsYWJlbEJlZm9yZVBvczogbnVtYmVyO1xuICAgICAgICBsZXQgbGFiZWxBZnRlclBvczogbnVtYmVyO1xuXG4gICAgICAgIGlmICh0aGlzLmdldExheW91dERpcmVjdGlvbigpID09PSAnbHRyJykge1xuICAgICAgICAgICAgbGFiZWxCZWZvcmVQb3MgPSBzZWxlY3RlZExhYmVsLmdldE9mZnNldExlZnQoKTtcbiAgICAgICAgICAgIGxhYmVsQWZ0ZXJQb3MgPSBsYWJlbEJlZm9yZVBvcyArIHNlbGVjdGVkTGFiZWwuZ2V0T2Zmc2V0V2lkdGgoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxhYmVsQWZ0ZXJQb3MgPVxuICAgICAgICAgICAgICAgIHRoaXMudGFiTGlzdC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIC1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZExhYmVsLmdldE9mZnNldExlZnQoKTtcbiAgICAgICAgICAgIGxhYmVsQmVmb3JlUG9zID0gbGFiZWxBZnRlclBvcyAtIHNlbGVjdGVkTGFiZWwuZ2V0T2Zmc2V0V2lkdGgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJlZm9yZVZpc2libGVQb3MgPSB0aGlzLnNjcm9sbERpc3RhbmNlO1xuICAgICAgICBjb25zdCBhZnRlclZpc2libGVQb3MgPSB0aGlzLnNjcm9sbERpc3RhbmNlICsgdmlld0xlbmd0aDtcblxuICAgICAgICBpZiAobGFiZWxCZWZvcmVQb3MgPCBiZWZvcmVWaXNpYmxlUG9zKSB7XG4gICAgICAgICAgICAvLyBTY3JvbGwgaGVhZGVyIHRvIG1vdmUgbGFiZWwgdG8gdGhlIGJlZm9yZSBkaXJlY3Rpb25cbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsRGlzdGFuY2UgLT1cbiAgICAgICAgICAgICAgICBiZWZvcmVWaXNpYmxlUG9zIC0gbGFiZWxCZWZvcmVQb3MgKyBFWEFHR0VSQVRFRF9PVkVSU0NST0xMO1xuICAgICAgICB9IGVsc2UgaWYgKGxhYmVsQWZ0ZXJQb3MgPiBhZnRlclZpc2libGVQb3MpIHtcbiAgICAgICAgICAgIC8vIFNjcm9sbCBoZWFkZXIgdG8gbW92ZSBsYWJlbCB0byB0aGUgYWZ0ZXIgZGlyZWN0aW9uXG4gICAgICAgICAgICB0aGlzLnNjcm9sbERpc3RhbmNlICs9XG4gICAgICAgICAgICAgICAgbGFiZWxBZnRlclBvcyAtIGFmdGVyVmlzaWJsZVBvcyArIEVYQUdHRVJBVEVEX09WRVJTQ1JPTEw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFdmFsdWF0ZSB3aGV0aGVyIHRoZSBwYWdpbmF0aW9uIGNvbnRyb2xzIHNob3VsZCBiZSBkaXNwbGF5ZWQuIElmIHRoZSBzY3JvbGwgd2lkdGggb2YgdGhlXG4gICAgICogdGFiIGxpc3QgaXMgd2lkZXIgdGhhbiB0aGUgc2l6ZSBvZiB0aGUgaGVhZGVyIGNvbnRhaW5lciwgdGhlbiB0aGUgcGFnaW5hdGlvbiBjb250cm9scyBzaG91bGRcbiAgICAgKiBiZSBzaG93bi5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgYW4gZXhwZW5zaXZlIGNhbGwgdGhhdCBmb3JjZXMgYSBsYXlvdXQgcmVmbG93IHRvIGNvbXB1dGUgYm94IGFuZCBzY3JvbGwgbWV0cmljcyBhbmRcbiAgICAgKiBzaG91bGQgYmUgY2FsbGVkIHNwYXJpbmdseS5cbiAgICAgKi9cbiAgICBjaGVja1BhZ2luYXRpb25FbmFibGVkKCkge1xuICAgICAgICBjb25zdCBpc0VuYWJsZWQgPVxuICAgICAgICAgICAgdGhpcy50YWJMaXN0Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGggPlxuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgaWYgKCFpc0VuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsRGlzdGFuY2UgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRW5hYmxlZCAhPT0gdGhpcy5zaG93UGFnaW5hdGlvbkNvbnRyb2xzKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaG93UGFnaW5hdGlvbkNvbnRyb2xzID0gaXNFbmFibGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV2YWx1YXRlIHdoZXRoZXIgdGhlIGJlZm9yZSBhbmQgYWZ0ZXIgY29udHJvbHMgc2hvdWxkIGJlIGVuYWJsZWQgb3IgZGlzYWJsZWQuXG4gICAgICogSWYgdGhlIGhlYWRlciBpcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsaXN0IChzY3JvbGwgZGlzdGFuY2UgaXMgZXF1YWwgdG8gMCkgdGhlbiBkaXNhYmxlIHRoZVxuICAgICAqIGJlZm9yZSBidXR0b24uIElmIHRoZSBoZWFkZXIgaXMgYXQgdGhlIGVuZCBvZiB0aGUgbGlzdCAoc2Nyb2xsIGRpc3RhbmNlIGlzIGVxdWFsIHRvIHRoZVxuICAgICAqIG1heGltdW0gZGlzdGFuY2Ugd2UgY2FuIHNjcm9sbCksIHRoZW4gZGlzYWJsZSB0aGUgYWZ0ZXIgYnV0dG9uLlxuICAgICAqXG4gICAgICogVGhpcyBpcyBhbiBleHBlbnNpdmUgY2FsbCB0aGF0IGZvcmNlcyBhIGxheW91dCByZWZsb3cgdG8gY29tcHV0ZSBib3ggYW5kIHNjcm9sbCBtZXRyaWNzIGFuZFxuICAgICAqIHNob3VsZCBiZSBjYWxsZWQgc3BhcmluZ2x5LlxuICAgICAqL1xuICAgIGNoZWNrU2Nyb2xsaW5nQ29udHJvbHMoKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBwYWdpbmF0aW9uIGFycm93cyBzaG91bGQgYmUgYWN0aXZhdGVkLlxuICAgICAgICB0aGlzLmRpc2FibGVTY3JvbGxCZWZvcmUgPSB0aGlzLnNjcm9sbERpc3RhbmNlID09PSAwO1xuICAgICAgICB0aGlzLmRpc2FibGVTY3JvbGxBZnRlciA9XG4gICAgICAgICAgICB0aGlzLnNjcm9sbERpc3RhbmNlID09PSB0aGlzLmdldE1heFNjcm9sbERpc3RhbmNlKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyB3aGF0IGlzIHRoZSBtYXhpbXVtIGxlbmd0aCBpbiBwaXhlbHMgdGhhdCBjYW4gYmUgc2V0IGZvciB0aGUgc2Nyb2xsIGRpc3RhbmNlLiBUaGlzXG4gICAgICogaXMgZXF1YWwgdG8gdGhlIGRpZmZlcmVuY2UgaW4gd2lkdGggYmV0d2VlbiB0aGUgdGFiIGxpc3QgY29udGFpbmVyIGFuZCB0YWIgaGVhZGVyIGNvbnRhaW5lci5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgYW4gZXhwZW5zaXZlIGNhbGwgdGhhdCBmb3JjZXMgYSBsYXlvdXQgcmVmbG93IHRvIGNvbXB1dGUgYm94IGFuZCBzY3JvbGwgbWV0cmljcyBhbmRcbiAgICAgKiBzaG91bGQgYmUgY2FsbGVkIHNwYXJpbmdseS5cbiAgICAgKi9cbiAgICBnZXRNYXhTY3JvbGxEaXN0YW5jZSgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBsZW5ndGhPZlRhYkxpc3QgPSB0aGlzLnRhYkxpc3QubmF0aXZlRWxlbWVudC5zY3JvbGxXaWR0aDtcbiAgICAgICAgY29uc3Qgdmlld0xlbmd0aCA9IHRoaXMudGFiTGlzdENvbnRhaW5lci5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuXG4gICAgICAgIHJldHVybiBsZW5ndGhPZlRhYkxpc3QgLSB2aWV3TGVuZ3RoIHx8IDA7XG4gICAgfVxufVxuIl19