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
        if (!this.isValidIndex(value) ||
            this.focusIndex === value ||
            !this.keyManager) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWhlYWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy90YWJzLyIsInNvdXJjZXMiOlsidGFiLWhlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBYSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUdILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBRU4sUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztNQUdsRCxzQkFBc0IsR0FBRyxHQUFHOztNQUM1Qix5QkFBeUIsR0FBRyxDQUFDOzs7Ozs7TUFjN0Isc0JBQXNCLEdBQUcsRUFBRTs7Ozs7QUFJakMsTUFBTSxPQUFPLGVBQWU7Q0FBRzs7Ozs7Ozs7QUFzQi9CLE1BQU0sT0FBTyxXQUFZLFNBQVEsZUFBZTs7Ozs7Ozs7SUFxRzVDLFlBQ1ksVUFBc0IsRUFDdEIsaUJBQW9DLEVBQ3BD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MENBQTJCOzs7OztJQUczQix5Q0FDK0U7Ozs7O0lBRy9FLG1DQUN5RTs7Ozs7O0lBR3pFLHNDQUE0Qjs7Ozs7O0lBRzVCLDJDQUFxQzs7Ozs7O0lBR3JDLGdDQUFpRDs7Ozs7OztJQU1qRCxvQ0FBOEI7Ozs7OztJQUc5Qiw0Q0FBdUM7Ozs7OztJQUd2QyxpQ0FBdUQ7Ozs7OztJQUd2RCx5Q0FBbUM7Ozs7O0lBRW5DLHFDQUFtQzs7Ozs7SUFHL0IsaUNBQThCOzs7OztJQUM5Qix3Q0FBNEM7Ozs7O0lBQzVDLG9DQUFvQzs7Ozs7SUFDcEMsMEJBQXVDOzs7OztJQUN2Qyw2QkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgVmlld3BvcnRSdWxlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9jdXNLZXlNYW5hZ2VyIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2ExMXknO1xuaW1wb3J0IHsgRU5ELCBFTlRFUiwgSE9NRSwgU1BBQ0UgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgbWVyZ2UsIG9mIGFzIG9ic2VydmFibGVPZiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNY1RhYkxhYmVsV3JhcHBlciB9IGZyb20gJy4vdGFiLWxhYmVsLXdyYXBwZXInO1xuXG5cbmNvbnN0IFZJRVdQT1JUX1RIUk9UVExFX1RJTUUgPSAxNTA7XG5jb25zdCBTQ1JPTExfRElTVEFOQ0VfREVMSU1JVEVSID0gMztcblxuXG4vKipcbiAqIFRoZSBkaXJlY3Rpb25zIHRoYXQgc2Nyb2xsaW5nIGNhbiBnbyBpbiB3aGVuIHRoZSBoZWFkZXIncyB0YWJzIGV4Y2VlZCB0aGUgaGVhZGVyIHdpZHRoLiAnQWZ0ZXInXG4gKiB3aWxsIHNjcm9sbCB0aGUgaGVhZGVyIHRvd2FyZHMgdGhlIGVuZCBvZiB0aGUgdGFicyBsaXN0IGFuZCAnYmVmb3JlJyB3aWxsIHNjcm9sbCB0b3dhcmRzIHRoZVxuICogYmVnaW5uaW5nIG9mIHRoZSBsaXN0LlxuICovXG5leHBvcnQgdHlwZSBTY3JvbGxEaXJlY3Rpb24gPSAnYWZ0ZXInIHwgJ2JlZm9yZSc7XG5cbi8qKlxuICogVGhlIGRpc3RhbmNlIGluIHBpeGVscyB0aGF0IHdpbGwgYmUgb3ZlcnNob3Qgd2hlbiBzY3JvbGxpbmcgYSB0YWIgbGFiZWwgaW50byB2aWV3LiBUaGlzIGhlbHBzXG4gKiBwcm92aWRlIGEgc21hbGwgYWZmb3JkYW5jZSB0byB0aGUgbGFiZWwgbmV4dCB0byBpdC5cbiAqL1xuY29uc3QgRVhBR0dFUkFURURfT1ZFUlNDUk9MTCA9IDYwO1xuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1jVGFiSGVhZGVyLlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjbGFzcyBNY1RhYkhlYWRlckJhc2Uge31cblxuLyoqXG4gKiBUaGUgaGVhZGVyIG9mIHRoZSB0YWIgZ3JvdXAgd2hpY2ggZGlzcGxheXMgYSBsaXN0IG9mIGFsbCB0aGUgdGFicyBpbiB0aGUgdGFiIGdyb3VwLlxuICogV2hlbiB0aGUgdGFicyBsaXN0J3Mgd2lkdGggZXhjZWVkcyB0aGUgd2lkdGggb2YgdGhlIGhlYWRlciBjb250YWluZXIsXG4gKiB0aGVuIGFycm93cyB3aWxsIGJlIGRpc3BsYXllZCB0byBhbGxvdyB0aGUgdXNlciB0byBzY3JvbGxcbiAqIGxlZnQgYW5kIHJpZ2h0IGFjcm9zcyB0aGUgaGVhZGVyLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRhYi1oZWFkZXInLFxuICAgIHRlbXBsYXRlVXJsOiAndGFiLWhlYWRlci5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsndGFiLWhlYWRlci5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdGFiLWhlYWRlcicsXG4gICAgICAgICdbY2xhc3MubWMtdGFiLWhlYWRlcl9fcGFnaW5hdGlvbi1jb250cm9sc19lbmFibGVkXSc6XG4gICAgICAgICAgICAnc2hvd1BhZ2luYXRpb25Db250cm9scycsXG4gICAgICAgICdbY2xhc3MubWMtdGFiLWhlYWRlcl9ydGxdJzogJ2dldExheW91dERpcmVjdGlvbigpID09IFxcJ3J0bFxcJydcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVGFiSGVhZGVyIGV4dGVuZHMgTWNUYWJIZWFkZXJCYXNlXG4gICAgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkLCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKiBUaGUgaW5kZXggb2YgdGhlIGFjdGl2ZSB0YWIuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgc2VsZWN0ZWRJbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRJbmRleDtcbiAgICB9XG4gICAgc2V0IHNlbGVjdGVkSW5kZXgodmFsdWU6IG51bWJlcikge1xuICAgICAgICBjb25zdCBjb2VyY2VkVmFsdWUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleENoYW5nZWQgPSB0aGlzLl9zZWxlY3RlZEluZGV4ICE9PSBjb2VyY2VkVmFsdWU7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSBjb2VyY2VkVmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMua2V5TWFuYWdlcikge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnVwZGF0ZUFjdGl2ZUl0ZW0oY29lcmNlZFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBUcmFja3Mgd2hpY2ggZWxlbWVudCBoYXMgZm9jdXM7IHVzZWQgZm9yIGtleWJvYXJkIG5hdmlnYXRpb24gKi9cbiAgICBnZXQgZm9jdXNJbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXlNYW5hZ2VyID8gdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCA6IDA7XG4gICAgfVxuXG4gICAgLyoqIFdoZW4gdGhlIGZvY3VzIGluZGV4IGlzIHNldCwgd2UgbXVzdCBtYW51YWxseSBzZW5kIGZvY3VzIHRvIHRoZSBjb3JyZWN0IGxhYmVsICovXG4gICAgc2V0IGZvY3VzSW5kZXgodmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAhdGhpcy5pc1ZhbGlkSW5kZXgodmFsdWUpIHx8XG4gICAgICAgICAgICB0aGlzLmZvY3VzSW5kZXggPT09IHZhbHVlIHx8XG4gICAgICAgICAgICAhdGhpcy5rZXlNYW5hZ2VyXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0odmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBTZXRzIHRoZSBkaXN0YW5jZSBpbiBwaXhlbHMgdGhhdCB0aGUgdGFiIGhlYWRlciBzaG91bGQgYmUgdHJhbnNmb3JtZWQgaW4gdGhlIFgtYXhpcy4gKi9cbiAgICBnZXQgc2Nyb2xsRGlzdGFuY2UoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njcm9sbERpc3RhbmNlO1xuICAgIH1cbiAgICBzZXQgc2Nyb2xsRGlzdGFuY2UodjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbERpc3RhbmNlID0gTWF0aC5tYXgoXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgTWF0aC5taW4odGhpcy5nZXRNYXhTY3JvbGxEaXN0YW5jZSgpLCB2KVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIE1hcmsgdGhhdCB0aGUgc2Nyb2xsIGRpc3RhbmNlIGhhcyBjaGFuZ2VkIHNvIHRoYXQgYWZ0ZXIgdGhlIHZpZXcgaXMgY2hlY2tlZCwgdGhlIENTU1xuICAgICAgICAvLyB0cmFuc2Zvcm1hdGlvbiBjYW4gbW92ZSB0aGUgaGVhZGVyLlxuICAgICAgICB0aGlzLnNjcm9sbERpc3RhbmNlQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2hlY2tTY3JvbGxpbmdDb250cm9scygpO1xuICAgIH1cblxuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNUYWJMYWJlbFdyYXBwZXIpXG4gICAgbGFiZWxXcmFwcGVyczogUXVlcnlMaXN0PE1jVGFiTGFiZWxXcmFwcGVyPjtcbiAgICBAVmlld0NoaWxkKCd0YWJMaXN0Q29udGFpbmVyJywge3N0YXRpYzogdHJ1ZX0pXG4gICAgdGFiTGlzdENvbnRhaW5lcjogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCd0YWJMaXN0Jywge3N0YXRpYzogdHJ1ZX0pXG4gICAgdGFiTGlzdDogRWxlbWVudFJlZjtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBjb250cm9scyBmb3IgcGFnaW5hdGlvbiBzaG91bGQgYmUgZGlzcGxheWVkICovXG4gICAgc2hvd1BhZ2luYXRpb25Db250cm9scyA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRhYiBsaXN0IGNhbiBiZSBzY3JvbGxlZCBtb3JlIHRvd2FyZHMgdGhlIGVuZCBvZiB0aGUgdGFiIGxhYmVsIGxpc3QuICovXG4gICAgZGlzYWJsZVNjcm9sbEFmdGVyID0gdHJ1ZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSB0YWIgbGlzdCBjYW4gYmUgc2Nyb2xsZWQgbW9yZSB0b3dhcmRzIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHRhYiBsYWJlbCBsaXN0LiAqL1xuICAgIGRpc2FibGVTY3JvbGxCZWZvcmUgPSB0cnVlO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgb3B0aW9uIGlzIHNlbGVjdGVkLiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IHNlbGVjdEZvY3VzZWRJbmRleDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gYSBsYWJlbCBpcyBmb2N1c2VkLiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IGluZGV4Rm9jdXNlZDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIC8qKiBUaGUgZGlzdGFuY2UgaW4gcGl4ZWxzIHRoYXQgdGhlIHRhYiBsYWJlbHMgc2hvdWxkIGJlIHRyYW5zbGF0ZWQgdG8gdGhlIGxlZnQuICovXG4gICAgcHJpdmF0ZSBfc2Nyb2xsRGlzdGFuY2UgPSAwO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGhlYWRlciBzaG91bGQgc2Nyb2xsIHRvIHRoZSBzZWxlY3RlZCBpbmRleCBhZnRlciB0aGUgdmlldyBoYXMgYmVlbiBjaGVja2VkLiAqL1xuICAgIHByaXZhdGUgc2VsZWN0ZWRJbmRleENoYW5nZWQgPSBmYWxzZTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkLiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBudW1iZXIgb2YgdGFiIGxhYmVscyB0aGF0IGFyZSBkaXNwbGF5ZWQgb24gdGhlIGhlYWRlci4gV2hlbiB0aGlzIGNoYW5nZXMsIHRoZSBoZWFkZXJcbiAgICAgKiBzaG91bGQgcmUtZXZhbHVhdGUgdGhlIHNjcm9sbCBwb3NpdGlvbi5cbiAgICAgKi9cbiAgICBwcml2YXRlIHRhYkxhYmVsQ291bnQ6IG51bWJlcjtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBzY3JvbGwgZGlzdGFuY2UgaGFzIGNoYW5nZWQgYW5kIHNob3VsZCBiZSBhcHBsaWVkIGFmdGVyIHRoZSB2aWV3IGlzIGNoZWNrZWQuICovXG4gICAgcHJpdmF0ZSBzY3JvbGxEaXN0YW5jZUNoYW5nZWQ6IGJvb2xlYW47XG5cbiAgICAvKiogVXNlZCB0byBtYW5hZ2UgZm9jdXMgYmV0d2VlbiB0aGUgdGFicy4gKi9cbiAgICBwcml2YXRlIGtleU1hbmFnZXI6IEZvY3VzS2V5TWFuYWdlcjxNY1RhYkxhYmVsV3JhcHBlcj47XG5cbiAgICAvKiogQ2FjaGVkIHRleHQgY29udGVudCBvZiB0aGUgaGVhZGVyLiAqL1xuICAgIHByaXZhdGUgY3VycmVudFRleHRDb250ZW50OiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIF9zZWxlY3RlZEluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgdmlld3BvcnRSdWxlcjogVmlld3BvcnRSdWxlcixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICAvLyBJZiB0aGUgbnVtYmVyIG9mIHRhYiBsYWJlbHMgaGF2ZSBjaGFuZ2VkLCBjaGVjayBpZiBzY3JvbGxpbmcgc2hvdWxkIGJlIGVuYWJsZWRcbiAgICAgICAgaWYgKHRoaXMudGFiTGFiZWxDb3VudCAhPT0gdGhpcy5sYWJlbFdyYXBwZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLnRhYkxhYmVsQ291bnQgPSB0aGlzLmxhYmVsV3JhcHBlcnMubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZSBzZWxlY3RlZCBpbmRleCBoYXMgY2hhbmdlZCwgc2Nyb2xsIHRvIHRoZSBsYWJlbCBhbmQgY2hlY2sgaWYgdGhlIHNjcm9sbGluZyBjb250cm9sc1xuICAgICAgICAvLyBzaG91bGQgYmUgZGlzYWJsZWQuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXhDaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFRvTGFiZWwodGhpcy5fc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrU2Nyb2xsaW5nQ29udHJvbHMoKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleENoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGUgc2Nyb2xsIGRpc3RhbmNlIGhhcyBiZWVuIGNoYW5nZWQgKHRhYiBzZWxlY3RlZCwgZm9jdXNlZCwgc2Nyb2xsIGNvbnRyb2xzIGFjdGl2YXRlZCksXG4gICAgICAgIC8vIHRoZW4gdHJhbnNsYXRlIHRoZSBoZWFkZXIgdG8gcmVmbGVjdCB0aGlzLlxuICAgICAgICBpZiAodGhpcy5zY3JvbGxEaXN0YW5jZUNoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGFiU2Nyb2xsUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsRGlzdGFuY2VDaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSBIT01FOlxuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFTkQ6XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldExhc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRU5URVI6XG4gICAgICAgICAgICBjYXNlIFNQQUNFOlxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Rm9jdXNlZEluZGV4LmVtaXQodGhpcy5mb2N1c0luZGV4KTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgY29uc3QgZGlyQ2hhbmdlID0gdGhpcy5kaXIgPyB0aGlzLmRpci5jaGFuZ2UgOiBvYnNlcnZhYmxlT2YobnVsbCk7XG4gICAgICAgIGNvbnN0IHJlc2l6ZSA9IHRoaXMudmlld3BvcnRSdWxlci5jaGFuZ2UoVklFV1BPUlRfVEhST1RUTEVfVElNRSk7XG4gICAgICAgIGNvbnN0IHJlYWxpZ24gPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBhZ2luYXRpb24oKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmtleU1hbmFnZXIgPSBuZXcgRm9jdXNLZXlNYW5hZ2VyKHRoaXMubGFiZWxXcmFwcGVycylcbiAgICAgICAgICAgIC53aXRoSG9yaXpvbnRhbE9yaWVudGF0aW9uKHRoaXMuZ2V0TGF5b3V0RGlyZWN0aW9uKCkpXG4gICAgICAgICAgICAud2l0aFdyYXAoKTtcblxuICAgICAgICB0aGlzLmtleU1hbmFnZXIudXBkYXRlQWN0aXZlSXRlbSgwKTtcblxuICAgICAgICAvLyBEZWZlciB0aGUgZmlyc3QgY2FsbCBpbiBvcmRlciB0byBhbGxvdyBmb3Igc2xvd2VyIGJyb3dzZXJzIHRvIGxheSBvdXQgdGhlIGVsZW1lbnRzLlxuICAgICAgICAvLyBUaGlzIGhlbHBzIGluIGNhc2VzIHdoZXJlIHRoZSB1c2VyIGxhbmRzIGRpcmVjdGx5IG9uIGEgcGFnZSB3aXRoIHBhZ2luYXRlZCB0YWJzLlxuICAgICAgICB0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gcmVhbGlnbigpXG4gICAgICAgICAgICA6IHJlcXVlc3RBbmltYXRpb25GcmFtZShyZWFsaWduKTtcblxuICAgICAgICAvLyBPbiBkaXIgY2hhbmdlIG9yIHdpbmRvdyByZXNpemUsIHVwZGF0ZSB0aGUgb3JpZW50YXRpb24gb2ZcbiAgICAgICAgLy8gdGhlIGtleSBtYW5hZ2VyIGlmIHRoZSBkaXJlY3Rpb24gaGFzIGNoYW5nZWQuXG4gICAgICAgIG1lcmdlKGRpckNoYW5nZSwgcmVzaXplKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlYWxpZ24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIud2l0aEhvcml6b250YWxPcmllbnRhdGlvbihcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRMYXlvdXREaXJlY3Rpb24oKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIGNoYW5nZSBpbiB0aGUgZm9jdXMga2V5IG1hbmFnZXIgd2UgbmVlZCB0byBlbWl0IHRoZSBgaW5kZXhGb2N1c2VkYFxuICAgICAgICAvLyBldmVudCBpbiBvcmRlciB0byBwcm92aWRlIGEgcHVibGljIGV2ZW50IHRoYXQgbm90aWZpZXMgYWJvdXQgZm9jdXMgY2hhbmdlcy4gQWxzbyB3ZSByZWFsaWduXG4gICAgICAgIC8vIHRoZSB0YWJzIGNvbnRhaW5lciBieSBzY3JvbGxpbmcgdGhlIG5ldyBmb2N1c2VkIHRhYiBpbnRvIHRoZSB2aXNpYmxlIHNlY3Rpb24uXG4gICAgICAgIHRoaXMua2V5TWFuYWdlci5jaGFuZ2VcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChuZXdGb2N1c0luZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleEZvY3VzZWQuZW1pdChuZXdGb2N1c0luZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRhYkZvY3VzKG5ld0ZvY3VzSW5kZXgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkLm5leHQoKTtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayBmb3Igd2hlbiB0aGUgTXV0YXRpb25PYnNlcnZlciBkZXRlY3RzIHRoYXQgdGhlIGNvbnRlbnQgaGFzIGNoYW5nZWQuXG4gICAgICovXG4gICAgb25Db250ZW50Q2hhbmdlcygpIHtcbiAgICAgICAgY29uc3QgdGV4dENvbnRlbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC50ZXh0Q29udGVudDtcblxuICAgICAgICAvLyBXZSBuZWVkIHRvIGRpZmYgdGhlIHRleHQgY29udGVudCBvZiB0aGUgaGVhZGVyLCBiZWNhdXNlIHRoZSBNdXRhdGlvbk9ic2VydmVyIGNhbGxiYWNrXG4gICAgICAgIC8vIHdpbGwgZmlyZSBldmVuIGlmIHRoZSB0ZXh0IGNvbnRlbnQgZGlkbid0IGNoYW5nZSB3aGljaCBpcyBpbmVmZmljaWVudCBhbmQgaXMgcHJvbmVcbiAgICAgICAgLy8gdG8gaW5maW5pdGUgbG9vcHMgaWYgYSBwb29ybHkgY29uc3RydWN0ZWQgZXhwcmVzc2lvbiBpcyBwYXNzZWQgaW4uXG5cbiAgICAgICAgaWYgKHRleHRDb250ZW50ICE9PSB0aGlzLmN1cnJlbnRUZXh0Q29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGV4dENvbnRlbnQgPSB0ZXh0Q29udGVudDtcblxuICAgICAgICAgICAgY29uc3Qgem9uZUNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbigpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBUaGUgY29udGVudCBvYnNlcnZlciBydW5zIG91dHNpZGUgdGhlIGBOZ1pvbmVgIGJ5IGRlZmF1bHQsIHdoaWNoXG4gICAgICAgICAgICAvLyBtZWFucyB0aGF0IHdlIG5lZWQgdG8gYnJpbmcgdGhlIGNhbGxiYWNrIGJhY2sgaW4gb3Vyc2VsdmVzLlxuICAgICAgICAgICAgLy8gVE9ETzogUmVtb3ZlIG51bGwgY2hlY2sgZm9yIGBfbmdab25lYCBvbmNlIGl0J3MgYSByZXF1aXJlZCBwYXJhbWV0ZXIuXG4gICAgICAgICAgICB0aGlzLm5nWm9uZSA/IHRoaXMubmdab25lLnJ1bih6b25lQ2FsbGJhY2spIDogem9uZUNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGluZyB0aGUgdmlldyB3aGV0aGVyIHBhZ2luYXRpb24gc2hvdWxkIGJlIGVuYWJsZWQgb3Igbm90XG4gICAgICpcbiAgICAgKiBXQVJOSU5HOiBDYWxsaW5nIHRoaXMgbWV0aG9kIGNhbiBiZSB2ZXJ5IGNvc3RseSBpbiB0ZXJtcyBvZiBwZXJmb3JtYW5jZS4gIEl0IHNob3VsZCBiZSBjYWxsZWRcbiAgICAgKiBhcyBpbmZyZXF1ZW50bHkgYXMgcG9zc2libGUgZnJvbSBvdXRzaWRlIG9mIHRoZSBUYWJzIGNvbXBvbmVudCBhcyBpdCBjYXVzZXMgYSByZWZsb3cgb2YgdGhlXG4gICAgICogcGFnZS5cbiAgICAgKi9cbiAgICB1cGRhdGVQYWdpbmF0aW9uKCkge1xuICAgICAgICB0aGlzLmNoZWNrUGFnaW5hdGlvbkVuYWJsZWQoKTtcbiAgICAgICAgdGhpcy5jaGVja1Njcm9sbGluZ0NvbnRyb2xzKCk7XG4gICAgICAgIHRoaXMudXBkYXRlVGFiU2Nyb2xsUG9zaXRpb24oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGlmIGFuIGluZGV4IGlzIHZhbGlkLiAgSWYgdGhlIHRhYnMgYXJlIG5vdCByZWFkeSB5ZXQsIHdlIGFzc3VtZSB0aGF0IHRoZSB1c2VyIGlzXG4gICAgICogcHJvdmlkaW5nIGEgdmFsaWQgaW5kZXggYW5kIHJldHVybiB0cnVlLlxuICAgICAqL1xuICAgIGlzVmFsaWRJbmRleChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghdGhpcy5sYWJlbFdyYXBwZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRhYiA9IHRoaXMubGFiZWxXcmFwcGVyc1xuICAgICAgICAgICAgPyB0aGlzLmxhYmVsV3JhcHBlcnMudG9BcnJheSgpW2luZGV4XVxuICAgICAgICAgICAgOiBudWxsO1xuXG4gICAgICAgIHJldHVybiAhIXRhYiAmJiAhdGFiLmRpc2FibGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgZm9jdXMgb24gdGhlIEhUTUwgZWxlbWVudCBmb3IgdGhlIGxhYmVsIHdyYXBwZXIgYW5kIHNjcm9sbHMgaXQgaW50byB0aGUgdmlldyBpZlxuICAgICAqIHNjcm9sbGluZyBpcyBlbmFibGVkLlxuICAgICAqL1xuICAgIHNldFRhYkZvY3VzKHRhYkluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd1BhZ2luYXRpb25Db250cm9scykge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxUb0xhYmVsKHRhYkluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxhYmVsV3JhcHBlcnMgJiYgdGhpcy5sYWJlbFdyYXBwZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5sYWJlbFdyYXBwZXJzLnRvQXJyYXkoKVt0YWJJbmRleF0uZm9jdXMoKTtcblxuICAgICAgICAgICAgLy8gRG8gbm90IGxldCB0aGUgYnJvd3NlciBtYW5hZ2Ugc2Nyb2xsaW5nIHRvIGZvY3VzIHRoZSBlbGVtZW50LCB0aGlzIHdpbGwgYmUgaGFuZGxlZFxuICAgICAgICAgICAgLy8gYnkgdXNpbmcgdHJhbnNsYXRpb24uIEluIExUUiwgdGhlIHNjcm9sbCBsZWZ0IHNob3VsZCBiZSAwLiBJbiBSVEwsIHRoZSBzY3JvbGwgd2lkdGhcbiAgICAgICAgICAgIC8vIHNob3VsZCBiZSB0aGUgZnVsbCB3aWR0aCBtaW51cyB0aGUgb2Zmc2V0IHdpZHRoLlxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyRWwgPSB0aGlzLnRhYkxpc3RDb250YWluZXIubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IGRpciA9IHRoaXMuZ2V0TGF5b3V0RGlyZWN0aW9uKCk7XG5cbiAgICAgICAgICAgIGlmIChkaXIgPT09ICdsdHInKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyRWwuc2Nyb2xsTGVmdCA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lckVsLnNjcm9sbExlZnQgPVxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXJFbC5zY3JvbGxXaWR0aCAtIGNvbnRhaW5lckVsLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFRoZSBsYXlvdXQgZGlyZWN0aW9uIG9mIHRoZSBjb250YWluaW5nIGFwcC4gKi9cbiAgICBnZXRMYXlvdXREaXJlY3Rpb24oKTogRGlyZWN0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlyICYmIHRoaXMuZGlyLnZhbHVlID09PSAncnRsJyA/ICdydGwnIDogJ2x0cic7XG4gICAgfVxuXG4gICAgLyoqIFBlcmZvcm1zIHRoZSBDU1MgdHJhbnNmb3JtYXRpb24gb24gdGhlIHRhYiBsaXN0IHRoYXQgd2lsbCBjYXVzZSB0aGUgbGlzdCB0byBzY3JvbGwuICovXG4gICAgdXBkYXRlVGFiU2Nyb2xsUG9zaXRpb24oKSB7XG4gICAgICAgIGNvbnN0IHNjcm9sbERpc3RhbmNlID0gdGhpcy5zY3JvbGxEaXN0YW5jZTtcbiAgICAgICAgY29uc3QgdHJhbnNsYXRlWCA9XG4gICAgICAgICAgICB0aGlzLmdldExheW91dERpcmVjdGlvbigpID09PSAnbHRyJ1xuICAgICAgICAgICAgICAgID8gLXNjcm9sbERpc3RhbmNlXG4gICAgICAgICAgICAgICAgOiBzY3JvbGxEaXN0YW5jZTtcblxuICAgICAgICAvLyBEb24ndCB1c2UgYHRyYW5zbGF0ZTNkYCBoZXJlIGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudCB0byBjcmVhdGUgYSBuZXcgbGF5ZXIuIEEgbmV3IGxheWVyXG4gICAgICAgIC8vIHNlZW1zIHRvIGNhdXNlIGZsaWNrZXJpbmcgYW5kIG92ZXJmbG93IGluIEludGVybmV0IEV4cGxvcmVyLlxuICAgICAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9pc3N1ZXMvMTAyNzZcbiAgICAgICAgLy8gV2Ugcm91bmQgdGhlIGB0cmFuc2Zvcm1gIGhlcmUsIGJlY2F1c2UgdHJhbnNmb3JtcyB3aXRoIHN1Yi1waXhlbCBwcmVjaXNpb24gY2F1c2Ugc29tZVxuICAgICAgICAvLyBicm93c2VycyB0byBibHVyIHRoZSBjb250ZW50IG9mIHRoZSBlbGVtZW50LlxuICAgICAgICB0aGlzLnRhYkxpc3QubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke01hdGgucm91bmQodHJhbnNsYXRlWCl9cHgpYDtcblxuICAgICAgICAvLyBTZXR0aW5nIHRoZSBgdHJhbnNmb3JtYCBvbiBJRSB3aWxsIGNoYW5nZSB0aGUgc2Nyb2xsIG9mZnNldCBvZiB0aGUgcGFyZW50LCBjYXVzaW5nIHRoZVxuICAgICAgICAvLyBwb3NpdGlvbiB0byBiZSB0aHJvd24gb2ZmIGluIHNvbWUgY2FzZXMuIFdlIGhhdmUgdG8gcmVzZXQgaXQgb3Vyc2VsdmVzIHRvIGVuc3VyZSB0aGF0XG4gICAgICAgIC8vIGl0IGRvZXNuJ3QgZ2V0IHRocm93biBvZmYuXG4gICAgICAgIHRoaXMudGFiTGlzdC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgPSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdmVzIHRoZSB0YWIgbGlzdCBpbiB0aGUgJ2JlZm9yZScgb3IgJ2FmdGVyJyBkaXJlY3Rpb24gKHRvd2FyZHMgdGhlIGJlZ2lubmluZyBvZiB0aGUgbGlzdCBvclxuICAgICAqIHRoZSBlbmQgb2YgdGhlIGxpc3QsIHJlc3BlY3RpdmVseSkuIFRoZSBkaXN0YW5jZSB0byBzY3JvbGwgaXMgY29tcHV0ZWQgdG8gYmUgYSB0aGlyZCBvZiB0aGVcbiAgICAgKiBsZW5ndGggb2YgdGhlIHRhYiBsaXN0IHZpZXcgd2luZG93LlxuICAgICAqXG4gICAgICogVGhpcyBpcyBhbiBleHBlbnNpdmUgY2FsbCB0aGF0IGZvcmNlcyBhIGxheW91dCByZWZsb3cgdG8gY29tcHV0ZSBib3ggYW5kIHNjcm9sbCBtZXRyaWNzIGFuZFxuICAgICAqIHNob3VsZCBiZSBjYWxsZWQgc3BhcmluZ2x5LlxuICAgICAqL1xuICAgIHNjcm9sbEhlYWRlcihzY3JvbGxEaXI6IFNjcm9sbERpcmVjdGlvbikge1xuICAgICAgICBjb25zdCB2aWV3TGVuZ3RoID0gdGhpcy50YWJMaXN0Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgLy8gTW92ZSB0aGUgc2Nyb2xsIGRpc3RhbmNlIG9uZS10aGlyZCB0aGUgbGVuZ3RoIG9mIHRoZSB0YWIgbGlzdCdzIHZpZXdwb3J0LlxuICAgICAgICB0aGlzLnNjcm9sbERpc3RhbmNlICs9XG4gICAgICAgICAgICAoKHNjcm9sbERpciA9PT0gJ2JlZm9yZScgPyAtMSA6IDEpICogdmlld0xlbmd0aCkgLyBTQ1JPTExfRElTVEFOQ0VfREVMSU1JVEVSO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdmVzIHRoZSB0YWIgbGlzdCBzdWNoIHRoYXQgdGhlIGRlc2lyZWQgdGFiIGxhYmVsIChtYXJrZWQgYnkgaW5kZXgpIGlzIG1vdmVkIGludG8gdmlldy5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgYW4gZXhwZW5zaXZlIGNhbGwgdGhhdCBmb3JjZXMgYSBsYXlvdXQgcmVmbG93IHRvIGNvbXB1dGUgYm94IGFuZCBzY3JvbGwgbWV0cmljcyBhbmRcbiAgICAgKiBzaG91bGQgYmUgY2FsbGVkIHNwYXJpbmdseS5cbiAgICAgKi9cbiAgICBzY3JvbGxUb0xhYmVsKGxhYmVsSW5kZXg6IG51bWJlcikge1xuICAgICAgICBjb25zdCBzZWxlY3RlZExhYmVsID0gdGhpcy5sYWJlbFdyYXBwZXJzXG4gICAgICAgICAgICA/IHRoaXMubGFiZWxXcmFwcGVycy50b0FycmF5KClbbGFiZWxJbmRleF1cbiAgICAgICAgICAgIDogbnVsbDtcblxuICAgICAgICBpZiAoIXNlbGVjdGVkTGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSB2aWV3IGxlbmd0aCBpcyB0aGUgdmlzaWJsZSB3aWR0aCBvZiB0aGUgdGFiIGxhYmVscy5cbiAgICAgICAgY29uc3Qgdmlld0xlbmd0aDogbnVtYmVyID0gdGhpcy50YWJMaXN0Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgbGV0IGxhYmVsQmVmb3JlUG9zOiBudW1iZXI7XG4gICAgICAgIGxldCBsYWJlbEFmdGVyUG9zOiBudW1iZXI7XG5cbiAgICAgICAgaWYgKHRoaXMuZ2V0TGF5b3V0RGlyZWN0aW9uKCkgPT09ICdsdHInKSB7XG4gICAgICAgICAgICBsYWJlbEJlZm9yZVBvcyA9IHNlbGVjdGVkTGFiZWwuZ2V0T2Zmc2V0TGVmdCgpO1xuICAgICAgICAgICAgbGFiZWxBZnRlclBvcyA9IGxhYmVsQmVmb3JlUG9zICsgc2VsZWN0ZWRMYWJlbC5nZXRPZmZzZXRXaWR0aCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGFiZWxBZnRlclBvcyA9XG4gICAgICAgICAgICAgICAgdGhpcy50YWJMaXN0Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggLVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkTGFiZWwuZ2V0T2Zmc2V0TGVmdCgpO1xuICAgICAgICAgICAgbGFiZWxCZWZvcmVQb3MgPSBsYWJlbEFmdGVyUG9zIC0gc2VsZWN0ZWRMYWJlbC5nZXRPZmZzZXRXaWR0aCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYmVmb3JlVmlzaWJsZVBvcyA9IHRoaXMuc2Nyb2xsRGlzdGFuY2U7XG4gICAgICAgIGNvbnN0IGFmdGVyVmlzaWJsZVBvcyA9IHRoaXMuc2Nyb2xsRGlzdGFuY2UgKyB2aWV3TGVuZ3RoO1xuXG4gICAgICAgIGlmIChsYWJlbEJlZm9yZVBvcyA8IGJlZm9yZVZpc2libGVQb3MpIHtcbiAgICAgICAgICAgIC8vIFNjcm9sbCBoZWFkZXIgdG8gbW92ZSBsYWJlbCB0byB0aGUgYmVmb3JlIGRpcmVjdGlvblxuICAgICAgICAgICAgdGhpcy5zY3JvbGxEaXN0YW5jZSAtPVxuICAgICAgICAgICAgICAgIGJlZm9yZVZpc2libGVQb3MgLSBsYWJlbEJlZm9yZVBvcyArIEVYQUdHRVJBVEVEX09WRVJTQ1JPTEw7XG4gICAgICAgIH0gZWxzZSBpZiAobGFiZWxBZnRlclBvcyA+IGFmdGVyVmlzaWJsZVBvcykge1xuICAgICAgICAgICAgLy8gU2Nyb2xsIGhlYWRlciB0byBtb3ZlIGxhYmVsIHRvIHRoZSBhZnRlciBkaXJlY3Rpb25cbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsRGlzdGFuY2UgKz1cbiAgICAgICAgICAgICAgICBsYWJlbEFmdGVyUG9zIC0gYWZ0ZXJWaXNpYmxlUG9zICsgRVhBR0dFUkFURURfT1ZFUlNDUk9MTDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV2YWx1YXRlIHdoZXRoZXIgdGhlIHBhZ2luYXRpb24gY29udHJvbHMgc2hvdWxkIGJlIGRpc3BsYXllZC4gSWYgdGhlIHNjcm9sbCB3aWR0aCBvZiB0aGVcbiAgICAgKiB0YWIgbGlzdCBpcyB3aWRlciB0aGFuIHRoZSBzaXplIG9mIHRoZSBoZWFkZXIgY29udGFpbmVyLCB0aGVuIHRoZSBwYWdpbmF0aW9uIGNvbnRyb2xzIHNob3VsZFxuICAgICAqIGJlIHNob3duLlxuICAgICAqXG4gICAgICogVGhpcyBpcyBhbiBleHBlbnNpdmUgY2FsbCB0aGF0IGZvcmNlcyBhIGxheW91dCByZWZsb3cgdG8gY29tcHV0ZSBib3ggYW5kIHNjcm9sbCBtZXRyaWNzIGFuZFxuICAgICAqIHNob3VsZCBiZSBjYWxsZWQgc3BhcmluZ2x5LlxuICAgICAqL1xuICAgIGNoZWNrUGFnaW5hdGlvbkVuYWJsZWQoKSB7XG4gICAgICAgIGNvbnN0IGlzRW5hYmxlZCA9XG4gICAgICAgICAgICB0aGlzLnRhYkxpc3QubmF0aXZlRWxlbWVudC5zY3JvbGxXaWR0aCA+XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcblxuICAgICAgICBpZiAoIWlzRW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxEaXN0YW5jZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNFbmFibGVkICE9PSB0aGlzLnNob3dQYWdpbmF0aW9uQ29udHJvbHMpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNob3dQYWdpbmF0aW9uQ29udHJvbHMgPSBpc0VuYWJsZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXZhbHVhdGUgd2hldGhlciB0aGUgYmVmb3JlIGFuZCBhZnRlciBjb250cm9scyBzaG91bGQgYmUgZW5hYmxlZCBvciBkaXNhYmxlZC5cbiAgICAgKiBJZiB0aGUgaGVhZGVyIGlzIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpc3QgKHNjcm9sbCBkaXN0YW5jZSBpcyBlcXVhbCB0byAwKSB0aGVuIGRpc2FibGUgdGhlXG4gICAgICogYmVmb3JlIGJ1dHRvbi4gSWYgdGhlIGhlYWRlciBpcyBhdCB0aGUgZW5kIG9mIHRoZSBsaXN0IChzY3JvbGwgZGlzdGFuY2UgaXMgZXF1YWwgdG8gdGhlXG4gICAgICogbWF4aW11bSBkaXN0YW5jZSB3ZSBjYW4gc2Nyb2xsKSwgdGhlbiBkaXNhYmxlIHRoZSBhZnRlciBidXR0b24uXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIGFuIGV4cGVuc2l2ZSBjYWxsIHRoYXQgZm9yY2VzIGEgbGF5b3V0IHJlZmxvdyB0byBjb21wdXRlIGJveCBhbmQgc2Nyb2xsIG1ldHJpY3MgYW5kXG4gICAgICogc2hvdWxkIGJlIGNhbGxlZCBzcGFyaW5nbHkuXG4gICAgICovXG4gICAgY2hlY2tTY3JvbGxpbmdDb250cm9scygpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHBhZ2luYXRpb24gYXJyb3dzIHNob3VsZCBiZSBhY3RpdmF0ZWQuXG4gICAgICAgIHRoaXMuZGlzYWJsZVNjcm9sbEJlZm9yZSA9IHRoaXMuc2Nyb2xsRGlzdGFuY2UgPT09IDA7XG4gICAgICAgIHRoaXMuZGlzYWJsZVNjcm9sbEFmdGVyID1cbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsRGlzdGFuY2UgPT09IHRoaXMuZ2V0TWF4U2Nyb2xsRGlzdGFuY2UoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoYXQgaXMgdGhlIG1heGltdW0gbGVuZ3RoIGluIHBpeGVscyB0aGF0IGNhbiBiZSBzZXQgZm9yIHRoZSBzY3JvbGwgZGlzdGFuY2UuIFRoaXNcbiAgICAgKiBpcyBlcXVhbCB0byB0aGUgZGlmZmVyZW5jZSBpbiB3aWR0aCBiZXR3ZWVuIHRoZSB0YWIgbGlzdCBjb250YWluZXIgYW5kIHRhYiBoZWFkZXIgY29udGFpbmVyLlxuICAgICAqXG4gICAgICogVGhpcyBpcyBhbiBleHBlbnNpdmUgY2FsbCB0aGF0IGZvcmNlcyBhIGxheW91dCByZWZsb3cgdG8gY29tcHV0ZSBib3ggYW5kIHNjcm9sbCBtZXRyaWNzIGFuZFxuICAgICAqIHNob3VsZCBiZSBjYWxsZWQgc3BhcmluZ2x5LlxuICAgICAqL1xuICAgIGdldE1heFNjcm9sbERpc3RhbmNlKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGxlbmd0aE9mVGFiTGlzdCA9IHRoaXMudGFiTGlzdC5uYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoO1xuICAgICAgICBjb25zdCB2aWV3TGVuZ3RoID0gdGhpcy50YWJMaXN0Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgcmV0dXJuIGxlbmd0aE9mVGFiTGlzdCAtIHZpZXdMZW5ndGggfHwgMDtcbiAgICB9XG59XG4iXX0=