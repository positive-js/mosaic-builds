/* tslint:disable:naming-convention */
import { FocusKeyManager } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ENTER, SPACE, hasModifierKey } from '@angular/cdk/keycodes';
import { Platform, normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, ElementRef, NgZone, Optional, EventEmitter, Directive, Inject, Input } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { DOWN_ARROW, END, HOME, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@ptsecurity/cdk/keycodes';
import { merge, of as observableOf, Subject, timer, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/** Config used to bind passive event listeners */
const passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true });
/**
 * The distance in pixels that will be overshot when scrolling a tab label into view. This helps
 * provide a small affordance to the label next to it.
 */
const EXAGGERATED_OVERSCROLL = 60;
/**
 * Amount of milliseconds to wait before starting to scroll the header automatically.
 * Set a little conservatively in order to handle fake events dispatched on touch devices.
 */
const HEADER_SCROLL_DELAY = 650;
/**
 * Interval in milliseconds at which to scroll the header
 * while the user is holding their pointer.
 */
const HEADER_SCROLL_INTERVAL = 100;
const VIEWPORT_THROTTLE_TIME = 150;
const SCROLL_DISTANCE = 0.8;
/**
 * Base class for a tab header that supported pagination.
 * @docs-private
 */
export class McPaginatedTabHeader {
    constructor(elementRef, changeDetectorRef, viewportRuler, ngZone, platform, dir, animationMode) {
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this.viewportRuler = viewportRuler;
        this.ngZone = ngZone;
        this.platform = platform;
        this.dir = dir;
        this.animationMode = animationMode;
        this._selectedIndex = 0;
        /** The distance in pixels that the tab labels should be translated to the left. */
        this._scrollDistance = 0;
        /** Event emitted when the option is selected. */
        this.selectFocusedIndex = new EventEmitter();
        /** Event emitted when a label is focused. */
        this.indexFocused = new EventEmitter();
        /** Whether the controls for pagination should be displayed */
        this.showPaginationControls = false;
        /** Whether the tab list can be scrolled more towards the end of the tab label list. */
        this.disableScrollAfter = true;
        /** Whether the tab list can be scrolled more towards the beginning of the tab label list. */
        this.disableScrollBefore = true;
        /**
         * Whether pagination should be disabled. This can be used to avoid unnecessary
         * layout recalculations if it's known that pagination won't be required.
         */
        this.disablePagination = false;
        /** Emits when the component is destroyed. */
        this.destroyed = new Subject();
        this.vertical = false;
        /** Stream that will stop the automated scrolling. */
        this.stopScrolling = new Subject();
        /** Whether the header should scroll to the selected index after the view has been checked. */
        this.selectedIndexChanged = false;
        // Bind the `mouseleave` event on the outside since it doesn't change anything in the view.
        ngZone.runOutsideAngular(() => {
            fromEvent(elementRef.nativeElement, 'mouseleave')
                .pipe(takeUntil(this.destroyed))
                .subscribe(() => this.stopInterval());
        });
    }
    /** The index of the active tab. */
    get selectedIndex() {
        return this._selectedIndex;
    }
    set selectedIndex(value) {
        var _a;
        const coercedValue = coerceNumberProperty(value);
        this.selectedIndexChanged = this._selectedIndex !== coercedValue;
        this._selectedIndex = coercedValue;
        (_a = this.keyManager) === null || _a === void 0 ? void 0 : _a.updateActiveItem(coercedValue);
    }
    /** Tracks which element has focus; used for keyboard navigation */
    get focusIndex() {
        return this.keyManager ? this.keyManager.activeItemIndex : 0;
    }
    /** When the focus index is set, we must manually send focus to the correct label */
    set focusIndex(value) {
        if (!this.isValidIndex(value) || this.focusIndex === value || !this.keyManager) {
            return;
        }
        this.keyManager.setActiveItem(value);
    }
    /** Sets the distance in pixels that the tab header should be transformed in the X-axis. */
    get scrollDistance() {
        return this._scrollDistance;
    }
    set scrollDistance(v) {
        this._scrollDistance = Math.max(0, Math.min(this.getMaxScrollDistance(), v));
        // Mark that the scroll distance has changed so that after the view is checked, the CSS
        // transformation can move the header.
        this.scrollDistanceChanged = true;
        this.checkScrollingControls();
    }
    /** Called when the user has selected an item via the keyboard. */
    ngAfterViewInit() {
        // We need to handle these events manually, because we want to bind passive event listeners.
        fromEvent(this.previousPaginator.nativeElement, 'touchstart', passiveEventListenerOptions)
            .pipe(takeUntil(this.destroyed))
            .subscribe(() => this.handlePaginatorPress('before'));
        fromEvent(this.nextPaginator.nativeElement, 'touchstart', passiveEventListenerOptions)
            .pipe(takeUntil(this.destroyed))
            .subscribe(() => this.handlePaginatorPress('after'));
    }
    ngAfterContentInit() {
        const dirChange = this.dir ? this.dir.change : observableOf('ltr');
        const resize = this.viewportRuler.change(VIEWPORT_THROTTLE_TIME);
        const realign = () => {
            this.updatePagination();
        };
        this.keyManager = new FocusKeyManager(this.items)
            .withHorizontalOrientation(this.getLayoutDirection());
        this.keyManager.updateActiveItem(this._selectedIndex);
        // Defer the first call in order to allow for slower browsers to lay out the elements.
        // This helps in cases where the user lands directly on a page with paginated tabs.
        typeof requestAnimationFrame !== undefined ? requestAnimationFrame(realign) : realign();
        // On dir change or window resize, realign the ink bar and update the orientation of
        // the key manager if the direction has changed.
        merge(dirChange, resize, this.items.changes)
            .pipe(takeUntil(this.destroyed))
            .subscribe(() => {
            // We need to defer this to give the browser some time to recalculate
            // the element dimensions. The call has to be wrapped in `NgZone.run`,
            // because the viewport change handler runs outside of Angular.
            this.ngZone.run(() => Promise.resolve().then(realign));
            this.keyManager.withHorizontalOrientation(this.getLayoutDirection());
        });
        // If there is a change in the focus key manager we need to emit the `indexFocused`
        // event in order to provide a public event that notifies about focus changes. Also we realign
        // the tabs container by scrolling the new focused tab into the visible section.
        this.keyManager.change
            .pipe(takeUntil(this.destroyed))
            .subscribe((newFocusIndex) => {
            this.indexFocused.emit(newFocusIndex);
            this.setTabFocus(newFocusIndex);
        });
    }
    ngAfterContentChecked() {
        // If the number of tab labels have changed, check if scrolling should be enabled
        if (this.tabLabelCount !== this.items.length) {
            this.updatePagination();
            this.tabLabelCount = this.items.length;
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
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
        this.stopScrolling.complete();
    }
    handleKeydown(event) {
        // We don't handle any key bindings with a modifier key.
        if (hasModifierKey(event)) {
            return;
        }
        // tslint:disable-next-line: deprecation
        const key = event.keyCode;
        if (key === HOME) {
            this.keyManager.setFirstItemActive();
        }
        else if (key === END) {
            this.keyManager.setLastItemActive();
        }
        else if (key === UP_ARROW && this.vertical) {
            this.keyManager.setPreviousItemActive();
        }
        else if (key === DOWN_ARROW && this.vertical) {
            this.keyManager.setNextItemActive();
        }
        else if (key === RIGHT_ARROW && !this.vertical) {
            this.keyManager.setNextItemActive();
        }
        else if (key === LEFT_ARROW && !this.vertical) {
            this.keyManager.setPreviousItemActive();
        }
        else if ([ENTER, SPACE].includes(key)) {
            this.selectFocusedIndex.emit(this.focusIndex);
        }
        if ([HOME, END, UP_ARROW, DOWN_ARROW, RIGHT_ARROW, LEFT_ARROW, SPACE, ENTER].includes(key)) {
            event.preventDefault();
        }
    }
    /**
     * Callback for when the MutationObserver detects that the content has changed.
     */
    onContentChanges() {
        const textContent = this.elementRef.nativeElement.textContent;
        // We need to diff the text content of the header, because the MutationObserver callback
        // will fire even if the text content didn't change which is inefficient and is prone
        // to infinite loops if a poorly constructed expression is passed in (see #14249).
        if (textContent !== this.currentTextContent) {
            this.currentTextContent = textContent || '';
            // The content observer runs outside the `NgZone` by default, which
            // means that we need to bring the callback back in ourselves.
            this.ngZone.run(() => {
                this.updatePagination();
                this.changeDetectorRef.markForCheck();
            });
        }
    }
    /**
     * Updates the view whether pagination should be enabled or not.
     *
     * WARNING: Calling this method can be very costly in terms of performance. It should be called
     * as infrequently as possible from outside of the Tabs component as it causes a reflow of the
     * page.
     */
    updatePagination() {
        this.checkPaginationEnabled();
        this.checkScrollingControls();
        this.updateTabScrollPosition();
    }
    /**
     * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
     * providing a valid index and return true.
     */
    isValidIndex(index) {
        if (!this.items) {
            return true;
        }
        const tab = this.items ? this.items.toArray()[index] : null;
        return !!tab && !tab.disabled;
    }
    /**
     * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
     * scrolling is enabled.
     */
    setTabFocus(tabIndex) {
        var _a;
        if (this.showPaginationControls) {
            this.scrollToLabel(tabIndex);
        }
        if ((_a = this.items) === null || _a === void 0 ? void 0 : _a.length) {
            this.items.toArray()[tabIndex].focus();
            // Do not let the browser manage scrolling to focus the element, this will be handled
            // by using translation. In LTR, the scroll left should be 0. In RTL, the scroll width
            // should be the full width minus the offset width.
            const containerEl = this.tabListContainer.nativeElement;
            const dir = this.getLayoutDirection();
            if (dir === 'ltr') {
                containerEl.scrollLeft = 0;
            }
            else {
                containerEl.scrollLeft = containerEl.scrollWidth - containerEl.offsetWidth;
            }
        }
    }
    /** The layout direction of the containing app. */
    getLayoutDirection() {
        var _a;
        return ((_a = this.dir) === null || _a === void 0 ? void 0 : _a.value) === 'rtl' ? 'rtl' : 'ltr';
    }
    /** Performs the CSS transformation on the tab list that will cause the list to scroll. */
    updateTabScrollPosition() {
        if (this.disablePagination) {
            return;
        }
        const scrollDistance = this.scrollDistance;
        const translateX = this.getLayoutDirection() === 'ltr' ? -scrollDistance : scrollDistance;
        // Don't use `translate3d` here because we don't want to create a new layer. A new layer
        // seems to cause flickering and overflow in Internet Explorer. For example, the ink bar
        // and ripples will exceed the boundaries of the visible tab bar.
        // See: https://github.com/angular/components/issues/10276
        // We round the `transform` here, because transforms with sub-pixel precision cause some
        // browsers to blur the content of the element.
        this.tabList.nativeElement.style.transform = `translateX(${Math.round(translateX)}px)`;
        // Setting the `transform` on IE will change the scroll offset of the parent, causing the
        // position to be thrown off in some cases. We have to reset it ourselves to ensure that
        // it doesn't get thrown off. Note that we scope it only to IE and Edge, because messing
        // with the scroll position throws off Chrome 71+ in RTL mode (see #14689).
        if (this.platform.TRIDENT || this.platform.EDGE) {
            this.tabListContainer.nativeElement.scrollLeft = 0;
        }
    }
    /**
     * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
     * the end of the list, respectively). The distance to scroll is computed to be a third of the
     * length of the tab list view window.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    scrollHeader(direction) {
        const viewLength = this.tabListContainer.nativeElement.offsetWidth;
        // Move the scroll distance one-third the length of the tab list's viewport.
        const scrollAmount = (direction === 'before' ? -1 : 1) * viewLength * SCROLL_DISTANCE;
        return this.scrollTo(this.scrollDistance + scrollAmount);
    }
    /** Handles click events on the pagination arrows. */
    handlePaginatorClick(direction) {
        this.stopInterval();
        this.scrollHeader(direction);
    }
    /**
     * Moves the tab list such that the desired tab label (marked by index) is moved into view.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    scrollToLabel(labelIndex) {
        if (this.disablePagination) {
            return;
        }
        const selectedLabel = this.items ? this.items.toArray()[labelIndex] : null;
        if (!selectedLabel) {
            return;
        }
        // The view length is the visible width of the tab labels.
        const viewLength = this.tabListContainer.nativeElement.offsetWidth;
        const { offsetLeft, offsetWidth } = selectedLabel.elementRef.nativeElement;
        let labelBeforePos;
        let labelAfterPos;
        if (this.getLayoutDirection() === 'ltr') {
            labelBeforePos = offsetLeft;
            labelAfterPos = labelBeforePos + offsetWidth;
        }
        else {
            labelAfterPos = this.tabList.nativeElement.offsetWidth - offsetLeft;
            labelBeforePos = labelAfterPos - offsetWidth;
        }
        const beforeVisiblePos = this.scrollDistance;
        const afterVisiblePos = this.scrollDistance + viewLength;
        if (labelBeforePos < beforeVisiblePos) {
            // Scroll header to move label to the before direction
            this.scrollDistance -= beforeVisiblePos - labelBeforePos + EXAGGERATED_OVERSCROLL;
        }
        else if (labelAfterPos > afterVisiblePos) {
            // Scroll header to move label to the after direction
            this.scrollDistance += labelAfterPos - afterVisiblePos + EXAGGERATED_OVERSCROLL;
        }
    }
    /**
     * Evaluate whether the pagination controls should be displayed. If the scroll width of the
     * tab list is wider than the size of the header container, then the pagination controls should
     * be shown.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    checkPaginationEnabled() {
        if (this.disablePagination) {
            this.showPaginationControls = false;
        }
        else {
            const isEnabled = this.tabList.nativeElement.scrollWidth > this.elementRef.nativeElement.offsetWidth;
            if (!isEnabled) {
                this.scrollDistance = 0;
            }
            if (isEnabled !== this.showPaginationControls) {
                this.changeDetectorRef.markForCheck();
            }
            this.showPaginationControls = isEnabled;
        }
    }
    /**
     * Evaluate whether the before and after controls should be enabled or disabled.
     * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
     * before button. If the header is at the end of the list (scroll distance is equal to the
     * maximum distance we can scroll), then disable the after button.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    checkScrollingControls() {
        if (this.disablePagination) {
            this.disableScrollAfter = this.disableScrollBefore = true;
        }
        else {
            // Check if the pagination arrows should be activated.
            this.disableScrollBefore = this.scrollDistance === 0;
            this.disableScrollAfter = this.scrollDistance === this.getMaxScrollDistance();
            this.changeDetectorRef.markForCheck();
        }
    }
    /**
     * Determines what is the maximum length in pixels that can be set for the scroll distance. This
     * is equal to the difference in width between the tab list container and tab header container.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    getMaxScrollDistance() {
        const lengthOfTabList = this.tabList.nativeElement.scrollWidth;
        const viewLength = this.tabListContainer.nativeElement.offsetWidth;
        return (lengthOfTabList - viewLength) || 0;
    }
    /** Stops the currently-running paginator interval.  */
    stopInterval() {
        this.stopScrolling.next();
    }
    /**
     * Handles the user pressing down on one of the paginators.
     * Starts scrolling the header after a certain amount of time.
     * @param direction In which direction the paginator should be scrolled.
     */
    handlePaginatorPress(direction, mouseEvent) {
        // Don't start auto scrolling for right mouse button clicks. Note that we shouldn't have to
        // null check the `button`, but we do it so we don't break tests that use fake events.
        if (mouseEvent && mouseEvent.button != null && mouseEvent.button !== 0) {
            return;
        }
        // Avoid overlapping timers.
        this.stopInterval();
        // Start a timer after the delay and keep firing based on the interval.
        timer(HEADER_SCROLL_DELAY, HEADER_SCROLL_INTERVAL)
            // Keep the timer going until something tells it to stop or the component is destroyed.
            .pipe(takeUntil(merge(this.stopScrolling, this.destroyed)))
            .subscribe(() => {
            const { maxScrollDistance, distance } = this.scrollHeader(direction);
            // Stop the timer if we've reached the start or the end.
            if (distance === 0 || distance >= maxScrollDistance) {
                this.stopInterval();
            }
        });
    }
    /**
     * Scrolls the header to a given position.
     * @param position Position to which to scroll.
     * @returns Information on the current scroll distance and the maximum.
     */
    scrollTo(position) {
        if (this.disablePagination) {
            return { maxScrollDistance: 0, distance: 0 };
        }
        const maxScrollDistance = this.getMaxScrollDistance();
        this.scrollDistance = Math.max(0, Math.min(maxScrollDistance, position));
        // Mark that the scroll distance has changed so that after the view is checked, the CSS
        // transformation can move the header.
        this.scrollDistanceChanged = true;
        this.checkScrollingControls();
        return { maxScrollDistance, distance: this.scrollDistance };
    }
}
McPaginatedTabHeader.decorators = [
    { type: Directive }
];
/** @nocollapse */
McPaginatedTabHeader.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: ViewportRuler },
    { type: NgZone },
    { type: Platform },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];
McPaginatedTabHeader.propDecorators = {
    disablePagination: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGVkLXRhYi1oZWFkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdGFicy9wYWdpbmF0ZWQtdGFiLWhlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxzQ0FBc0M7QUFDdEMsT0FBTyxFQUFFLGVBQWUsRUFBbUIsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRSxPQUFPLEVBQWEsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckUsT0FBTyxFQUFFLFFBQVEsRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQ0gsaUJBQWlCLEVBQ2pCLFVBQVUsRUFDVixNQUFNLEVBQ04sUUFBUSxFQUVSLFlBQVksRUFLWixTQUFTLEVBQ1QsTUFBTSxFQUNOLEtBQUssRUFDUixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxZQUFZLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzNDLGtEQUFrRDtBQUNsRCxNQUFNLDJCQUEyQixHQUFHLCtCQUErQixDQUFDLEVBQUUs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QkFBaUIsRUFBRTtnQkFDakQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ3ZCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBSUQ7Ozs7T0FJRztJQUNLLFFBQVEsQ0FBQyxRQUFnQjtRQUM3QixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN4QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQztTQUNoRDtRQUVELE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDdEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFekUsdUZBQXVGO1FBQ3ZGLHNDQUFzQztRQUN0QyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBRTlCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ2hFLENBQUM7OztZQTVmSixTQUFTOzs7O1lBekROLFVBQVU7WUFEVixpQkFBaUI7WUFGWixhQUFhO1lBSWxCLE1BQU07WUFMRCxRQUFRO1lBSEcsY0FBYyx1QkEyS3pCLFFBQVE7eUNBQ1IsUUFBUSxZQUFJLE1BQU0sU0FBQyxxQkFBcUI7OztnQ0FwQzVDLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZTpuYW1pbmctY29udmVudGlvbiAqL1xuaW1wb3J0IHsgRm9jdXNLZXlNYW5hZ2VyLCBGb2N1c2FibGVPcHRpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgRU5URVIsIFNQQUNFLCBoYXNNb2RpZmllcktleSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBQbGF0Zm9ybSwgbm9ybWFsaXplUGFzc2l2ZUxpc3RlbmVyT3B0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBWaWV3cG9ydFJ1bGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgTmdab25lLFxuICAgIE9wdGlvbmFsLFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgT25EZXN0cm95LFxuICAgIERpcmVjdGl2ZSxcbiAgICBJbmplY3QsXG4gICAgSW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBTklNQVRJT05fTU9EVUxFX1RZUEUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgRE9XTl9BUlJPVywgRU5ELCBIT01FLCBMRUZUX0FSUk9XLCBSSUdIVF9BUlJPVywgVVBfQVJST1cgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgbWVyZ2UsIG9mIGFzIG9ic2VydmFibGVPZiwgU3ViamVjdCwgdGltZXIsIGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbi8qKiBDb25maWcgdXNlZCB0byBiaW5kIHBhc3NpdmUgZXZlbnQgbGlzdGVuZXJzICovXG5jb25zdCBwYXNzaXZlRXZlbnRMaXN0ZW5lck9wdGlvbnMgPSBub3JtYWxpemVQYXNzaXZlTGlzdGVuZXJPcHRpb25zKHsgcGFzc2l2ZTogdHJ1ZSB9KSBhcyBFdmVudExpc3RlbmVyT3B0aW9ucztcblxuLyoqXG4gKiBUaGUgZGlyZWN0aW9ucyB0aGF0IHNjcm9sbGluZyBjYW4gZ28gaW4gd2hlbiB0aGUgaGVhZGVyJ3MgdGFicyBleGNlZWQgdGhlIGhlYWRlciB3aWR0aC4gJ0FmdGVyJ1xuICogd2lsbCBzY3JvbGwgdGhlIGhlYWRlciB0b3dhcmRzIHRoZSBlbmQgb2YgdGhlIHRhYnMgbGlzdCBhbmQgJ2JlZm9yZScgd2lsbCBzY3JvbGwgdG93YXJkcyB0aGVcbiAqIGJlZ2lubmluZyBvZiB0aGUgbGlzdC5cbiAqL1xuZXhwb3J0IHR5cGUgU2Nyb2xsRGlyZWN0aW9uID0gJ2FmdGVyJyB8ICdiZWZvcmUnO1xuXG4vKipcbiAqIFRoZSBkaXN0YW5jZSBpbiBwaXhlbHMgdGhhdCB3aWxsIGJlIG92ZXJzaG90IHdoZW4gc2Nyb2xsaW5nIGEgdGFiIGxhYmVsIGludG8gdmlldy4gVGhpcyBoZWxwc1xuICogcHJvdmlkZSBhIHNtYWxsIGFmZm9yZGFuY2UgdG8gdGhlIGxhYmVsIG5leHQgdG8gaXQuXG4gKi9cbmNvbnN0IEVYQUdHRVJBVEVEX09WRVJTQ1JPTEwgPSA2MDtcblxuLyoqXG4gKiBBbW91bnQgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQgYmVmb3JlIHN0YXJ0aW5nIHRvIHNjcm9sbCB0aGUgaGVhZGVyIGF1dG9tYXRpY2FsbHkuXG4gKiBTZXQgYSBsaXR0bGUgY29uc2VydmF0aXZlbHkgaW4gb3JkZXIgdG8gaGFuZGxlIGZha2UgZXZlbnRzIGRpc3BhdGNoZWQgb24gdG91Y2ggZGV2aWNlcy5cbiAqL1xuY29uc3QgSEVBREVSX1NDUk9MTF9ERUxBWSA9IDY1MDtcblxuLyoqXG4gKiBJbnRlcnZhbCBpbiBtaWxsaXNlY29uZHMgYXQgd2hpY2ggdG8gc2Nyb2xsIHRoZSBoZWFkZXJcbiAqIHdoaWxlIHRoZSB1c2VyIGlzIGhvbGRpbmcgdGhlaXIgcG9pbnRlci5cbiAqL1xuY29uc3QgSEVBREVSX1NDUk9MTF9JTlRFUlZBTCA9IDEwMDtcblxuY29uc3QgVklFV1BPUlRfVEhST1RUTEVfVElNRSA9IDE1MDtcbmNvbnN0IFNDUk9MTF9ESVNUQU5DRSA9IDAuODtcblxuLyoqIEl0ZW0gaW5zaWRlIGEgcGFnaW5hdGVkIHRhYiBoZWFkZXIuICovXG5leHBvcnQgdHlwZSBNY1BhZ2luYXRlZFRhYkhlYWRlckl0ZW0gPSBGb2N1c2FibGVPcHRpb24gJiB7IGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYgfTtcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBhIHRhYiBoZWFkZXIgdGhhdCBzdXBwb3J0ZWQgcGFnaW5hdGlvbi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWNQYWdpbmF0ZWRUYWJIZWFkZXIgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkLCBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKiBUaGUgaW5kZXggb2YgdGhlIGFjdGl2ZSB0YWIuICovXG4gICAgZ2V0IHNlbGVjdGVkSW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkSW5kZXg7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkSW5kZXgodmFsdWU6IG51bWJlcikge1xuICAgICAgICBjb25zdCBjb2VyY2VkVmFsdWUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleENoYW5nZWQgPSB0aGlzLl9zZWxlY3RlZEluZGV4ICE9PSBjb2VyY2VkVmFsdWU7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSBjb2VyY2VkVmFsdWU7XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyPy51cGRhdGVBY3RpdmVJdGVtKGNvZXJjZWRWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRJbmRleCA9IDA7XG5cblxuICAgIC8qKiBUcmFja3Mgd2hpY2ggZWxlbWVudCBoYXMgZm9jdXM7IHVzZWQgZm9yIGtleWJvYXJkIG5hdmlnYXRpb24gKi9cbiAgICBnZXQgZm9jdXNJbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXlNYW5hZ2VyID8gdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCEgOiAwO1xuICAgIH1cblxuICAgIC8qKiBXaGVuIHRoZSBmb2N1cyBpbmRleCBpcyBzZXQsIHdlIG11c3QgbWFudWFsbHkgc2VuZCBmb2N1cyB0byB0aGUgY29ycmVjdCBsYWJlbCAqL1xuICAgIHNldCBmb2N1c0luZGV4KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWRJbmRleCh2YWx1ZSkgfHwgdGhpcy5mb2N1c0luZGV4ID09PSB2YWx1ZSB8fCAhdGhpcy5rZXlNYW5hZ2VyKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKiogU2V0cyB0aGUgZGlzdGFuY2UgaW4gcGl4ZWxzIHRoYXQgdGhlIHRhYiBoZWFkZXIgc2hvdWxkIGJlIHRyYW5zZm9ybWVkIGluIHRoZSBYLWF4aXMuICovXG4gICAgZ2V0IHNjcm9sbERpc3RhbmNlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY3JvbGxEaXN0YW5jZTtcbiAgICB9XG5cbiAgICBzZXQgc2Nyb2xsRGlzdGFuY2UodjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbERpc3RhbmNlID0gTWF0aC5tYXgoMCwgTWF0aC5taW4odGhpcy5nZXRNYXhTY3JvbGxEaXN0YW5jZSgpLCB2KSk7XG5cbiAgICAgICAgLy8gTWFyayB0aGF0IHRoZSBzY3JvbGwgZGlzdGFuY2UgaGFzIGNoYW5nZWQgc28gdGhhdCBhZnRlciB0aGUgdmlldyBpcyBjaGVja2VkLCB0aGUgQ1NTXG4gICAgICAgIC8vIHRyYW5zZm9ybWF0aW9uIGNhbiBtb3ZlIHRoZSBoZWFkZXIuXG4gICAgICAgIHRoaXMuc2Nyb2xsRGlzdGFuY2VDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jaGVja1Njcm9sbGluZ0NvbnRyb2xzKCk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBkaXN0YW5jZSBpbiBwaXhlbHMgdGhhdCB0aGUgdGFiIGxhYmVscyBzaG91bGQgYmUgdHJhbnNsYXRlZCB0byB0aGUgbGVmdC4gKi9cbiAgICBwcml2YXRlIF9zY3JvbGxEaXN0YW5jZSA9IDA7XG5cbiAgICBhYnN0cmFjdCBpdGVtczogUXVlcnlMaXN0PE1jUGFnaW5hdGVkVGFiSGVhZGVySXRlbT47XG4gICAgYWJzdHJhY3QgdGFiTGlzdENvbnRhaW5lcjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gICAgYWJzdHJhY3QgdGFiTGlzdDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gICAgYWJzdHJhY3QgbmV4dFBhZ2luYXRvcjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gICAgYWJzdHJhY3QgcHJldmlvdXNQYWdpbmF0b3I6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgb3B0aW9uIGlzIHNlbGVjdGVkLiAqL1xuICAgIHJlYWRvbmx5IHNlbGVjdEZvY3VzZWRJbmRleDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gYSBsYWJlbCBpcyBmb2N1c2VkLiAqL1xuICAgIHJlYWRvbmx5IGluZGV4Rm9jdXNlZDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBjb250cm9scyBmb3IgcGFnaW5hdGlvbiBzaG91bGQgYmUgZGlzcGxheWVkICovXG4gICAgc2hvd1BhZ2luYXRpb25Db250cm9scyA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRhYiBsaXN0IGNhbiBiZSBzY3JvbGxlZCBtb3JlIHRvd2FyZHMgdGhlIGVuZCBvZiB0aGUgdGFiIGxhYmVsIGxpc3QuICovXG4gICAgZGlzYWJsZVNjcm9sbEFmdGVyID0gdHJ1ZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSB0YWIgbGlzdCBjYW4gYmUgc2Nyb2xsZWQgbW9yZSB0b3dhcmRzIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHRhYiBsYWJlbCBsaXN0LiAqL1xuICAgIGRpc2FibGVTY3JvbGxCZWZvcmUgPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBwYWdpbmF0aW9uIHNob3VsZCBiZSBkaXNhYmxlZC4gVGhpcyBjYW4gYmUgdXNlZCB0byBhdm9pZCB1bm5lY2Vzc2FyeVxuICAgICAqIGxheW91dCByZWNhbGN1bGF0aW9ucyBpZiBpdCdzIGtub3duIHRoYXQgcGFnaW5hdGlvbiB3b24ndCBiZSByZXF1aXJlZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc2FibGVQYWdpbmF0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZC4gKi9cbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIHByb3RlY3RlZCB2ZXJ0aWNhbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG51bWJlciBvZiB0YWIgbGFiZWxzIHRoYXQgYXJlIGRpc3BsYXllZCBvbiB0aGUgaGVhZGVyLiBXaGVuIHRoaXMgY2hhbmdlcywgdGhlIGhlYWRlclxuICAgICAqIHNob3VsZCByZS1ldmFsdWF0ZSB0aGUgc2Nyb2xsIHBvc2l0aW9uLlxuICAgICAqL1xuICAgIHByaXZhdGUgdGFiTGFiZWxDb3VudDogbnVtYmVyO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHNjcm9sbCBkaXN0YW5jZSBoYXMgY2hhbmdlZCBhbmQgc2hvdWxkIGJlIGFwcGxpZWQgYWZ0ZXIgdGhlIHZpZXcgaXMgY2hlY2tlZC4gKi9cbiAgICBwcml2YXRlIHNjcm9sbERpc3RhbmNlQ2hhbmdlZDogYm9vbGVhbjtcblxuICAgIC8qKiBVc2VkIHRvIG1hbmFnZSBmb2N1cyBiZXR3ZWVuIHRoZSB0YWJzLiAqL1xuICAgIHByaXZhdGUga2V5TWFuYWdlcjogRm9jdXNLZXlNYW5hZ2VyPE1jUGFnaW5hdGVkVGFiSGVhZGVySXRlbT47XG5cbiAgICAvKiogQ2FjaGVkIHRleHQgY29udGVudCBvZiB0aGUgaGVhZGVyLiAqL1xuICAgIHByaXZhdGUgY3VycmVudFRleHRDb250ZW50OiBzdHJpbmc7XG5cbiAgICAvKiogU3RyZWFtIHRoYXQgd2lsbCBzdG9wIHRoZSBhdXRvbWF0ZWQgc2Nyb2xsaW5nLiAqL1xuICAgIHByaXZhdGUgc3RvcFNjcm9sbGluZyA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICAvKiogV2hldGhlciB0aGUgaGVhZGVyIHNob3VsZCBzY3JvbGwgdG8gdGhlIHNlbGVjdGVkIGluZGV4IGFmdGVyIHRoZSB2aWV3IGhhcyBiZWVuIGNoZWNrZWQuICovXG4gICAgcHJpdmF0ZSBzZWxlY3RlZEluZGV4Q2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJvdGVjdGVkIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSB2aWV3cG9ydFJ1bGVyOiBWaWV3cG9ydFJ1bGVyLFxuICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgcHVibGljIGFuaW1hdGlvbk1vZGU/OiBzdHJpbmdcbiAgICApIHtcblxuICAgICAgICAvLyBCaW5kIHRoZSBgbW91c2VsZWF2ZWAgZXZlbnQgb24gdGhlIG91dHNpZGUgc2luY2UgaXQgZG9lc24ndCBjaGFuZ2UgYW55dGhpbmcgaW4gdGhlIHZpZXcuXG4gICAgICAgIG5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICBmcm9tRXZlbnQoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbW91c2VsZWF2ZScpXG4gICAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuc3RvcEludGVydmFsKCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogQ2FsbGVkIHdoZW4gdGhlIHVzZXIgaGFzIHNlbGVjdGVkIGFuIGl0ZW0gdmlhIHRoZSBrZXlib2FyZC4gKi9cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIC8vIFdlIG5lZWQgdG8gaGFuZGxlIHRoZXNlIGV2ZW50cyBtYW51YWxseSwgYmVjYXVzZSB3ZSB3YW50IHRvIGJpbmQgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMuXG4gICAgICAgIGZyb21FdmVudCh0aGlzLnByZXZpb3VzUGFnaW5hdG9yLm5hdGl2ZUVsZW1lbnQsICd0b3VjaHN0YXJ0JywgcGFzc2l2ZUV2ZW50TGlzdGVuZXJPcHRpb25zKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5oYW5kbGVQYWdpbmF0b3JQcmVzcygnYmVmb3JlJykpO1xuXG4gICAgICAgIGZyb21FdmVudCh0aGlzLm5leHRQYWdpbmF0b3IubmF0aXZlRWxlbWVudCwgJ3RvdWNoc3RhcnQnLCBwYXNzaXZlRXZlbnRMaXN0ZW5lck9wdGlvbnMpXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmhhbmRsZVBhZ2luYXRvclByZXNzKCdhZnRlcicpKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIGNvbnN0IGRpckNoYW5nZSA9IHRoaXMuZGlyID8gdGhpcy5kaXIuY2hhbmdlIDogb2JzZXJ2YWJsZU9mKCdsdHInKTtcbiAgICAgICAgY29uc3QgcmVzaXplID0gdGhpcy52aWV3cG9ydFJ1bGVyLmNoYW5nZShWSUVXUE9SVF9USFJPVFRMRV9USU1FKTtcblxuICAgICAgICBjb25zdCByZWFsaWduID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0aW9uKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyID0gbmV3IEZvY3VzS2V5TWFuYWdlcjxNY1BhZ2luYXRlZFRhYkhlYWRlckl0ZW0+KHRoaXMuaXRlbXMpXG4gICAgICAgICAgICAud2l0aEhvcml6b250YWxPcmllbnRhdGlvbih0aGlzLmdldExheW91dERpcmVjdGlvbigpKTtcblxuICAgICAgICB0aGlzLmtleU1hbmFnZXIudXBkYXRlQWN0aXZlSXRlbSh0aGlzLl9zZWxlY3RlZEluZGV4KTtcblxuICAgICAgICAvLyBEZWZlciB0aGUgZmlyc3QgY2FsbCBpbiBvcmRlciB0byBhbGxvdyBmb3Igc2xvd2VyIGJyb3dzZXJzIHRvIGxheSBvdXQgdGhlIGVsZW1lbnRzLlxuICAgICAgICAvLyBUaGlzIGhlbHBzIGluIGNhc2VzIHdoZXJlIHRoZSB1c2VyIGxhbmRzIGRpcmVjdGx5IG9uIGEgcGFnZSB3aXRoIHBhZ2luYXRlZCB0YWJzLlxuICAgICAgICB0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lICE9PSB1bmRlZmluZWQgPyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVhbGlnbikgOiByZWFsaWduKCk7XG5cbiAgICAgICAgLy8gT24gZGlyIGNoYW5nZSBvciB3aW5kb3cgcmVzaXplLCByZWFsaWduIHRoZSBpbmsgYmFyIGFuZCB1cGRhdGUgdGhlIG9yaWVudGF0aW9uIG9mXG4gICAgICAgIC8vIHRoZSBrZXkgbWFuYWdlciBpZiB0aGUgZGlyZWN0aW9uIGhhcyBjaGFuZ2VkLlxuICAgICAgICBtZXJnZShkaXJDaGFuZ2UsIHJlc2l6ZSwgdGhpcy5pdGVtcy5jaGFuZ2VzKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFdlIG5lZWQgdG8gZGVmZXIgdGhpcyB0byBnaXZlIHRoZSBicm93c2VyIHNvbWUgdGltZSB0byByZWNhbGN1bGF0ZVxuICAgICAgICAgICAgICAgIC8vIHRoZSBlbGVtZW50IGRpbWVuc2lvbnMuIFRoZSBjYWxsIGhhcyB0byBiZSB3cmFwcGVkIGluIGBOZ1pvbmUucnVuYCxcbiAgICAgICAgICAgICAgICAvLyBiZWNhdXNlIHRoZSB2aWV3cG9ydCBjaGFuZ2UgaGFuZGxlciBydW5zIG91dHNpZGUgb2YgQW5ndWxhci5cbiAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihyZWFsaWduKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24odGhpcy5nZXRMYXlvdXREaXJlY3Rpb24oKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIGNoYW5nZSBpbiB0aGUgZm9jdXMga2V5IG1hbmFnZXIgd2UgbmVlZCB0byBlbWl0IHRoZSBgaW5kZXhGb2N1c2VkYFxuICAgICAgICAvLyBldmVudCBpbiBvcmRlciB0byBwcm92aWRlIGEgcHVibGljIGV2ZW50IHRoYXQgbm90aWZpZXMgYWJvdXQgZm9jdXMgY2hhbmdlcy4gQWxzbyB3ZSByZWFsaWduXG4gICAgICAgIC8vIHRoZSB0YWJzIGNvbnRhaW5lciBieSBzY3JvbGxpbmcgdGhlIG5ldyBmb2N1c2VkIHRhYiBpbnRvIHRoZSB2aXNpYmxlIHNlY3Rpb24uXG4gICAgICAgIHRoaXMua2V5TWFuYWdlci5jaGFuZ2VcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChuZXdGb2N1c0luZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleEZvY3VzZWQuZW1pdChuZXdGb2N1c0luZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRhYkZvY3VzKG5ld0ZvY3VzSW5kZXgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICAvLyBJZiB0aGUgbnVtYmVyIG9mIHRhYiBsYWJlbHMgaGF2ZSBjaGFuZ2VkLCBjaGVjayBpZiBzY3JvbGxpbmcgc2hvdWxkIGJlIGVuYWJsZWRcbiAgICAgICAgaWYgKHRoaXMudGFiTGFiZWxDb3VudCAhPT0gdGhpcy5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbigpO1xuICAgICAgICAgICAgdGhpcy50YWJMYWJlbENvdW50ID0gdGhpcy5pdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlIHNlbGVjdGVkIGluZGV4IGhhcyBjaGFuZ2VkLCBzY3JvbGwgdG8gdGhlIGxhYmVsIGFuZCBjaGVjayBpZiB0aGUgc2Nyb2xsaW5nIGNvbnRyb2xzXG4gICAgICAgIC8vIHNob3VsZCBiZSBkaXNhYmxlZC5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleENoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9MYWJlbCh0aGlzLl9zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tTY3JvbGxpbmdDb250cm9scygpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4Q2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZSBzY3JvbGwgZGlzdGFuY2UgaGFzIGJlZW4gY2hhbmdlZCAodGFiIHNlbGVjdGVkLCBmb2N1c2VkLCBzY3JvbGwgY29udHJvbHMgYWN0aXZhdGVkKSxcbiAgICAgICAgLy8gdGhlbiB0cmFuc2xhdGUgdGhlIGhlYWRlciB0byByZWZsZWN0IHRoaXMuXG4gICAgICAgIGlmICh0aGlzLnNjcm9sbERpc3RhbmNlQ2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUYWJTY3JvbGxQb3NpdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxEaXN0YW5jZUNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQubmV4dCgpO1xuICAgICAgICB0aGlzLmRlc3Ryb3llZC5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLnN0b3BTY3JvbGxpbmcuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8vIFdlIGRvbid0IGhhbmRsZSBhbnkga2V5IGJpbmRpbmdzIHdpdGggYSBtb2RpZmllciBrZXkuXG4gICAgICAgIGlmIChoYXNNb2RpZmllcktleShldmVudCkpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICBjb25zdCBrZXkgPSBldmVudC5rZXlDb2RlO1xuXG4gICAgICAgIGlmIChrZXkgPT09IEhPTUUpIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IEVORCkge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldExhc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBVUF9BUlJPVyAmJiB0aGlzLnZlcnRpY2FsKSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0UHJldmlvdXNJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBET1dOX0FSUk9XICYmIHRoaXMudmVydGljYWwpIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXROZXh0SXRlbUFjdGl2ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gUklHSFRfQVJST1cgJiYgIXRoaXMudmVydGljYWwpIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXROZXh0SXRlbUFjdGl2ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gTEVGVF9BUlJPVyAmJiAhdGhpcy52ZXJ0aWNhbCkge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldFByZXZpb3VzSXRlbUFjdGl2ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKFtFTlRFUiwgU1BBQ0VdLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0Rm9jdXNlZEluZGV4LmVtaXQodGhpcy5mb2N1c0luZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChbSE9NRSwgRU5ELCBVUF9BUlJPVywgRE9XTl9BUlJPVywgUklHSFRfQVJST1csIExFRlRfQVJST1csIFNQQUNFLCBFTlRFUl0uaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIGZvciB3aGVuIHRoZSBNdXRhdGlvbk9ic2VydmVyIGRldGVjdHMgdGhhdCB0aGUgY29udGVudCBoYXMgY2hhbmdlZC5cbiAgICAgKi9cbiAgICBvbkNvbnRlbnRDaGFuZ2VzKCkge1xuICAgICAgICBjb25zdCB0ZXh0Q29udGVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnRleHRDb250ZW50O1xuXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gZGlmZiB0aGUgdGV4dCBjb250ZW50IG9mIHRoZSBoZWFkZXIsIGJlY2F1c2UgdGhlIE11dGF0aW9uT2JzZXJ2ZXIgY2FsbGJhY2tcbiAgICAgICAgLy8gd2lsbCBmaXJlIGV2ZW4gaWYgdGhlIHRleHQgY29udGVudCBkaWRuJ3QgY2hhbmdlIHdoaWNoIGlzIGluZWZmaWNpZW50IGFuZCBpcyBwcm9uZVxuICAgICAgICAvLyB0byBpbmZpbml0ZSBsb29wcyBpZiBhIHBvb3JseSBjb25zdHJ1Y3RlZCBleHByZXNzaW9uIGlzIHBhc3NlZCBpbiAoc2VlICMxNDI0OSkuXG4gICAgICAgIGlmICh0ZXh0Q29udGVudCAhPT0gdGhpcy5jdXJyZW50VGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRleHRDb250ZW50ID0gdGV4dENvbnRlbnQgfHwgJyc7XG5cbiAgICAgICAgICAgIC8vIFRoZSBjb250ZW50IG9ic2VydmVyIHJ1bnMgb3V0c2lkZSB0aGUgYE5nWm9uZWAgYnkgZGVmYXVsdCwgd2hpY2hcbiAgICAgICAgICAgIC8vIG1lYW5zIHRoYXQgd2UgbmVlZCB0byBicmluZyB0aGUgY2FsbGJhY2sgYmFjayBpbiBvdXJzZWx2ZXMuXG4gICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbigpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHZpZXcgd2hldGhlciBwYWdpbmF0aW9uIHNob3VsZCBiZSBlbmFibGVkIG9yIG5vdC5cbiAgICAgKlxuICAgICAqIFdBUk5JTkc6IENhbGxpbmcgdGhpcyBtZXRob2QgY2FuIGJlIHZlcnkgY29zdGx5IGluIHRlcm1zIG9mIHBlcmZvcm1hbmNlLiBJdCBzaG91bGQgYmUgY2FsbGVkXG4gICAgICogYXMgaW5mcmVxdWVudGx5IGFzIHBvc3NpYmxlIGZyb20gb3V0c2lkZSBvZiB0aGUgVGFicyBjb21wb25lbnQgYXMgaXQgY2F1c2VzIGEgcmVmbG93IG9mIHRoZVxuICAgICAqIHBhZ2UuXG4gICAgICovXG4gICAgdXBkYXRlUGFnaW5hdGlvbigpIHtcbiAgICAgICAgdGhpcy5jaGVja1BhZ2luYXRpb25FbmFibGVkKCk7XG4gICAgICAgIHRoaXMuY2hlY2tTY3JvbGxpbmdDb250cm9scygpO1xuICAgICAgICB0aGlzLnVwZGF0ZVRhYlNjcm9sbFBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyBpZiBhbiBpbmRleCBpcyB2YWxpZC4gIElmIHRoZSB0YWJzIGFyZSBub3QgcmVhZHkgeWV0LCB3ZSBhc3N1bWUgdGhhdCB0aGUgdXNlciBpc1xuICAgICAqIHByb3ZpZGluZyBhIHZhbGlkIGluZGV4IGFuZCByZXR1cm4gdHJ1ZS5cbiAgICAgKi9cbiAgICBpc1ZhbGlkSW5kZXgoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIXRoaXMuaXRlbXMpIHsgcmV0dXJuIHRydWU7IH1cblxuICAgICAgICBjb25zdCB0YWIgPSB0aGlzLml0ZW1zID8gdGhpcy5pdGVtcy50b0FycmF5KClbaW5kZXhdIDogbnVsbDtcblxuICAgICAgICByZXR1cm4gISF0YWIgJiYgIXRhYi5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGZvY3VzIG9uIHRoZSBIVE1MIGVsZW1lbnQgZm9yIHRoZSBsYWJlbCB3cmFwcGVyIGFuZCBzY3JvbGxzIGl0IGludG8gdGhlIHZpZXcgaWZcbiAgICAgKiBzY3JvbGxpbmcgaXMgZW5hYmxlZC5cbiAgICAgKi9cbiAgICBzZXRUYWJGb2N1cyh0YWJJbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3dQYWdpbmF0aW9uQ29udHJvbHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9MYWJlbCh0YWJJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pdGVtcz8ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zLnRvQXJyYXkoKVt0YWJJbmRleF0uZm9jdXMoKTtcblxuICAgICAgICAgICAgLy8gRG8gbm90IGxldCB0aGUgYnJvd3NlciBtYW5hZ2Ugc2Nyb2xsaW5nIHRvIGZvY3VzIHRoZSBlbGVtZW50LCB0aGlzIHdpbGwgYmUgaGFuZGxlZFxuICAgICAgICAgICAgLy8gYnkgdXNpbmcgdHJhbnNsYXRpb24uIEluIExUUiwgdGhlIHNjcm9sbCBsZWZ0IHNob3VsZCBiZSAwLiBJbiBSVEwsIHRoZSBzY3JvbGwgd2lkdGhcbiAgICAgICAgICAgIC8vIHNob3VsZCBiZSB0aGUgZnVsbCB3aWR0aCBtaW51cyB0aGUgb2Zmc2V0IHdpZHRoLlxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyRWwgPSB0aGlzLnRhYkxpc3RDb250YWluZXIubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IGRpciA9IHRoaXMuZ2V0TGF5b3V0RGlyZWN0aW9uKCk7XG5cbiAgICAgICAgICAgIGlmIChkaXIgPT09ICdsdHInKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyRWwuc2Nyb2xsTGVmdCA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lckVsLnNjcm9sbExlZnQgPSBjb250YWluZXJFbC5zY3JvbGxXaWR0aCAtIGNvbnRhaW5lckVsLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFRoZSBsYXlvdXQgZGlyZWN0aW9uIG9mIHRoZSBjb250YWluaW5nIGFwcC4gKi9cbiAgICBnZXRMYXlvdXREaXJlY3Rpb24oKTogRGlyZWN0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlyPy52YWx1ZSA9PT0gJ3J0bCcgPyAncnRsJyA6ICdsdHInO1xuICAgIH1cblxuICAgIC8qKiBQZXJmb3JtcyB0aGUgQ1NTIHRyYW5zZm9ybWF0aW9uIG9uIHRoZSB0YWIgbGlzdCB0aGF0IHdpbGwgY2F1c2UgdGhlIGxpc3QgdG8gc2Nyb2xsLiAqL1xuICAgIHVwZGF0ZVRhYlNjcm9sbFBvc2l0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlUGFnaW5hdGlvbikgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBzY3JvbGxEaXN0YW5jZSA9IHRoaXMuc2Nyb2xsRGlzdGFuY2U7XG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZVggPSB0aGlzLmdldExheW91dERpcmVjdGlvbigpID09PSAnbHRyJyA/IC1zY3JvbGxEaXN0YW5jZSA6IHNjcm9sbERpc3RhbmNlO1xuXG4gICAgICAgIC8vIERvbid0IHVzZSBgdHJhbnNsYXRlM2RgIGhlcmUgYmVjYXVzZSB3ZSBkb24ndCB3YW50IHRvIGNyZWF0ZSBhIG5ldyBsYXllci4gQSBuZXcgbGF5ZXJcbiAgICAgICAgLy8gc2VlbXMgdG8gY2F1c2UgZmxpY2tlcmluZyBhbmQgb3ZlcmZsb3cgaW4gSW50ZXJuZXQgRXhwbG9yZXIuIEZvciBleGFtcGxlLCB0aGUgaW5rIGJhclxuICAgICAgICAvLyBhbmQgcmlwcGxlcyB3aWxsIGV4Y2VlZCB0aGUgYm91bmRhcmllcyBvZiB0aGUgdmlzaWJsZSB0YWIgYmFyLlxuICAgICAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2NvbXBvbmVudHMvaXNzdWVzLzEwMjc2XG4gICAgICAgIC8vIFdlIHJvdW5kIHRoZSBgdHJhbnNmb3JtYCBoZXJlLCBiZWNhdXNlIHRyYW5zZm9ybXMgd2l0aCBzdWItcGl4ZWwgcHJlY2lzaW9uIGNhdXNlIHNvbWVcbiAgICAgICAgLy8gYnJvd3NlcnMgdG8gYmx1ciB0aGUgY29udGVudCBvZiB0aGUgZWxlbWVudC5cbiAgICAgICAgdGhpcy50YWJMaXN0Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtNYXRoLnJvdW5kKHRyYW5zbGF0ZVgpfXB4KWA7XG5cbiAgICAgICAgLy8gU2V0dGluZyB0aGUgYHRyYW5zZm9ybWAgb24gSUUgd2lsbCBjaGFuZ2UgdGhlIHNjcm9sbCBvZmZzZXQgb2YgdGhlIHBhcmVudCwgY2F1c2luZyB0aGVcbiAgICAgICAgLy8gcG9zaXRpb24gdG8gYmUgdGhyb3duIG9mZiBpbiBzb21lIGNhc2VzLiBXZSBoYXZlIHRvIHJlc2V0IGl0IG91cnNlbHZlcyB0byBlbnN1cmUgdGhhdFxuICAgICAgICAvLyBpdCBkb2Vzbid0IGdldCB0aHJvd24gb2ZmLiBOb3RlIHRoYXQgd2Ugc2NvcGUgaXQgb25seSB0byBJRSBhbmQgRWRnZSwgYmVjYXVzZSBtZXNzaW5nXG4gICAgICAgIC8vIHdpdGggdGhlIHNjcm9sbCBwb3NpdGlvbiB0aHJvd3Mgb2ZmIENocm9tZSA3MSsgaW4gUlRMIG1vZGUgKHNlZSAjMTQ2ODkpLlxuICAgICAgICBpZiAodGhpcy5wbGF0Zm9ybS5UUklERU5UIHx8IHRoaXMucGxhdGZvcm0uRURHRSkge1xuICAgICAgICAgICAgdGhpcy50YWJMaXN0Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3ZlcyB0aGUgdGFiIGxpc3QgaW4gdGhlICdiZWZvcmUnIG9yICdhZnRlcicgZGlyZWN0aW9uICh0b3dhcmRzIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpc3Qgb3JcbiAgICAgKiB0aGUgZW5kIG9mIHRoZSBsaXN0LCByZXNwZWN0aXZlbHkpLiBUaGUgZGlzdGFuY2UgdG8gc2Nyb2xsIGlzIGNvbXB1dGVkIHRvIGJlIGEgdGhpcmQgb2YgdGhlXG4gICAgICogbGVuZ3RoIG9mIHRoZSB0YWIgbGlzdCB2aWV3IHdpbmRvdy5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgYW4gZXhwZW5zaXZlIGNhbGwgdGhhdCBmb3JjZXMgYSBsYXlvdXQgcmVmbG93IHRvIGNvbXB1dGUgYm94IGFuZCBzY3JvbGwgbWV0cmljcyBhbmRcbiAgICAgKiBzaG91bGQgYmUgY2FsbGVkIHNwYXJpbmdseS5cbiAgICAgKi9cbiAgICBzY3JvbGxIZWFkZXIoZGlyZWN0aW9uOiBTY3JvbGxEaXJlY3Rpb24pIHtcbiAgICAgICAgY29uc3Qgdmlld0xlbmd0aCA9IHRoaXMudGFiTGlzdENvbnRhaW5lci5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuXG4gICAgICAgIC8vIE1vdmUgdGhlIHNjcm9sbCBkaXN0YW5jZSBvbmUtdGhpcmQgdGhlIGxlbmd0aCBvZiB0aGUgdGFiIGxpc3QncyB2aWV3cG9ydC5cbiAgICAgICAgY29uc3Qgc2Nyb2xsQW1vdW50ID0gKGRpcmVjdGlvbiA9PT0gJ2JlZm9yZScgPyAtMSA6IDEpICogdmlld0xlbmd0aCAqIFNDUk9MTF9ESVNUQU5DRTtcblxuICAgICAgICByZXR1cm4gdGhpcy5zY3JvbGxUbyh0aGlzLnNjcm9sbERpc3RhbmNlICsgc2Nyb2xsQW1vdW50KTtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyBjbGljayBldmVudHMgb24gdGhlIHBhZ2luYXRpb24gYXJyb3dzLiAqL1xuICAgIGhhbmRsZVBhZ2luYXRvckNsaWNrKGRpcmVjdGlvbjogU2Nyb2xsRGlyZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuc3RvcEludGVydmFsKCk7XG4gICAgICAgIHRoaXMuc2Nyb2xsSGVhZGVyKGRpcmVjdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW92ZXMgdGhlIHRhYiBsaXN0IHN1Y2ggdGhhdCB0aGUgZGVzaXJlZCB0YWIgbGFiZWwgKG1hcmtlZCBieSBpbmRleCkgaXMgbW92ZWQgaW50byB2aWV3LlxuICAgICAqXG4gICAgICogVGhpcyBpcyBhbiBleHBlbnNpdmUgY2FsbCB0aGF0IGZvcmNlcyBhIGxheW91dCByZWZsb3cgdG8gY29tcHV0ZSBib3ggYW5kIHNjcm9sbCBtZXRyaWNzIGFuZFxuICAgICAqIHNob3VsZCBiZSBjYWxsZWQgc3BhcmluZ2x5LlxuICAgICAqL1xuICAgIHNjcm9sbFRvTGFiZWwobGFiZWxJbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVQYWdpbmF0aW9uKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkTGFiZWwgPSB0aGlzLml0ZW1zID8gdGhpcy5pdGVtcy50b0FycmF5KClbbGFiZWxJbmRleF0gOiBudWxsO1xuXG4gICAgICAgIGlmICghc2VsZWN0ZWRMYWJlbCkgeyByZXR1cm47IH1cblxuICAgICAgICAvLyBUaGUgdmlldyBsZW5ndGggaXMgdGhlIHZpc2libGUgd2lkdGggb2YgdGhlIHRhYiBsYWJlbHMuXG4gICAgICAgIGNvbnN0IHZpZXdMZW5ndGggPSB0aGlzLnRhYkxpc3RDb250YWluZXIubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgICAgY29uc3QgeyBvZmZzZXRMZWZ0LCBvZmZzZXRXaWR0aCB9ID0gc2VsZWN0ZWRMYWJlbC5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgbGV0IGxhYmVsQmVmb3JlUG9zOiBudW1iZXI7XG4gICAgICAgIGxldCBsYWJlbEFmdGVyUG9zOiBudW1iZXI7XG5cbiAgICAgICAgaWYgKHRoaXMuZ2V0TGF5b3V0RGlyZWN0aW9uKCkgPT09ICdsdHInKSB7XG4gICAgICAgICAgICBsYWJlbEJlZm9yZVBvcyA9IG9mZnNldExlZnQ7XG4gICAgICAgICAgICBsYWJlbEFmdGVyUG9zID0gbGFiZWxCZWZvcmVQb3MgKyAob2Zmc2V0V2lkdGggYXMgbnVtYmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxhYmVsQWZ0ZXJQb3MgPSB0aGlzLnRhYkxpc3QubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCAtIG9mZnNldExlZnQ7XG4gICAgICAgICAgICBsYWJlbEJlZm9yZVBvcyA9IGxhYmVsQWZ0ZXJQb3MgLSBvZmZzZXRXaWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJlZm9yZVZpc2libGVQb3MgPSB0aGlzLnNjcm9sbERpc3RhbmNlO1xuICAgICAgICBjb25zdCBhZnRlclZpc2libGVQb3MgPSB0aGlzLnNjcm9sbERpc3RhbmNlICsgdmlld0xlbmd0aDtcblxuICAgICAgICBpZiAobGFiZWxCZWZvcmVQb3MgPCBiZWZvcmVWaXNpYmxlUG9zKSB7XG4gICAgICAgICAgICAvLyBTY3JvbGwgaGVhZGVyIHRvIG1vdmUgbGFiZWwgdG8gdGhlIGJlZm9yZSBkaXJlY3Rpb25cbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsRGlzdGFuY2UgLT0gYmVmb3JlVmlzaWJsZVBvcyAtIGxhYmVsQmVmb3JlUG9zICsgRVhBR0dFUkFURURfT1ZFUlNDUk9MTDtcbiAgICAgICAgfSBlbHNlIGlmIChsYWJlbEFmdGVyUG9zID4gYWZ0ZXJWaXNpYmxlUG9zKSB7XG4gICAgICAgICAgICAvLyBTY3JvbGwgaGVhZGVyIHRvIG1vdmUgbGFiZWwgdG8gdGhlIGFmdGVyIGRpcmVjdGlvblxuICAgICAgICAgICAgdGhpcy5zY3JvbGxEaXN0YW5jZSArPSBsYWJlbEFmdGVyUG9zIC0gYWZ0ZXJWaXNpYmxlUG9zICsgRVhBR0dFUkFURURfT1ZFUlNDUk9MTDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV2YWx1YXRlIHdoZXRoZXIgdGhlIHBhZ2luYXRpb24gY29udHJvbHMgc2hvdWxkIGJlIGRpc3BsYXllZC4gSWYgdGhlIHNjcm9sbCB3aWR0aCBvZiB0aGVcbiAgICAgKiB0YWIgbGlzdCBpcyB3aWRlciB0aGFuIHRoZSBzaXplIG9mIHRoZSBoZWFkZXIgY29udGFpbmVyLCB0aGVuIHRoZSBwYWdpbmF0aW9uIGNvbnRyb2xzIHNob3VsZFxuICAgICAqIGJlIHNob3duLlxuICAgICAqXG4gICAgICogVGhpcyBpcyBhbiBleHBlbnNpdmUgY2FsbCB0aGF0IGZvcmNlcyBhIGxheW91dCByZWZsb3cgdG8gY29tcHV0ZSBib3ggYW5kIHNjcm9sbCBtZXRyaWNzIGFuZFxuICAgICAqIHNob3VsZCBiZSBjYWxsZWQgc3BhcmluZ2x5LlxuICAgICAqL1xuICAgIGNoZWNrUGFnaW5hdGlvbkVuYWJsZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVQYWdpbmF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dQYWdpbmF0aW9uQ29udHJvbHMgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGlzRW5hYmxlZCA9IHRoaXMudGFiTGlzdC5uYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoID4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgICAgIGlmICghaXNFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxEaXN0YW5jZSA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc0VuYWJsZWQgIT09IHRoaXMuc2hvd1BhZ2luYXRpb25Db250cm9scykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2hvd1BhZ2luYXRpb25Db250cm9scyA9IGlzRW5hYmxlZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV2YWx1YXRlIHdoZXRoZXIgdGhlIGJlZm9yZSBhbmQgYWZ0ZXIgY29udHJvbHMgc2hvdWxkIGJlIGVuYWJsZWQgb3IgZGlzYWJsZWQuXG4gICAgICogSWYgdGhlIGhlYWRlciBpcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsaXN0IChzY3JvbGwgZGlzdGFuY2UgaXMgZXF1YWwgdG8gMCkgdGhlbiBkaXNhYmxlIHRoZVxuICAgICAqIGJlZm9yZSBidXR0b24uIElmIHRoZSBoZWFkZXIgaXMgYXQgdGhlIGVuZCBvZiB0aGUgbGlzdCAoc2Nyb2xsIGRpc3RhbmNlIGlzIGVxdWFsIHRvIHRoZVxuICAgICAqIG1heGltdW0gZGlzdGFuY2Ugd2UgY2FuIHNjcm9sbCksIHRoZW4gZGlzYWJsZSB0aGUgYWZ0ZXIgYnV0dG9uLlxuICAgICAqXG4gICAgICogVGhpcyBpcyBhbiBleHBlbnNpdmUgY2FsbCB0aGF0IGZvcmNlcyBhIGxheW91dCByZWZsb3cgdG8gY29tcHV0ZSBib3ggYW5kIHNjcm9sbCBtZXRyaWNzIGFuZFxuICAgICAqIHNob3VsZCBiZSBjYWxsZWQgc3BhcmluZ2x5LlxuICAgICAqL1xuICAgIGNoZWNrU2Nyb2xsaW5nQ29udHJvbHMoKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVQYWdpbmF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVTY3JvbGxBZnRlciA9IHRoaXMuZGlzYWJsZVNjcm9sbEJlZm9yZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgcGFnaW5hdGlvbiBhcnJvd3Mgc2hvdWxkIGJlIGFjdGl2YXRlZC5cbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZVNjcm9sbEJlZm9yZSA9IHRoaXMuc2Nyb2xsRGlzdGFuY2UgPT09IDA7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVTY3JvbGxBZnRlciA9IHRoaXMuc2Nyb2xsRGlzdGFuY2UgPT09IHRoaXMuZ2V0TWF4U2Nyb2xsRGlzdGFuY2UoKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoYXQgaXMgdGhlIG1heGltdW0gbGVuZ3RoIGluIHBpeGVscyB0aGF0IGNhbiBiZSBzZXQgZm9yIHRoZSBzY3JvbGwgZGlzdGFuY2UuIFRoaXNcbiAgICAgKiBpcyBlcXVhbCB0byB0aGUgZGlmZmVyZW5jZSBpbiB3aWR0aCBiZXR3ZWVuIHRoZSB0YWIgbGlzdCBjb250YWluZXIgYW5kIHRhYiBoZWFkZXIgY29udGFpbmVyLlxuICAgICAqXG4gICAgICogVGhpcyBpcyBhbiBleHBlbnNpdmUgY2FsbCB0aGF0IGZvcmNlcyBhIGxheW91dCByZWZsb3cgdG8gY29tcHV0ZSBib3ggYW5kIHNjcm9sbCBtZXRyaWNzIGFuZFxuICAgICAqIHNob3VsZCBiZSBjYWxsZWQgc3BhcmluZ2x5LlxuICAgICAqL1xuICAgIGdldE1heFNjcm9sbERpc3RhbmNlKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGxlbmd0aE9mVGFiTGlzdCA9IHRoaXMudGFiTGlzdC5uYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoO1xuICAgICAgICBjb25zdCB2aWV3TGVuZ3RoID0gdGhpcy50YWJMaXN0Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgcmV0dXJuIChsZW5ndGhPZlRhYkxpc3QgLSB2aWV3TGVuZ3RoKSB8fCAwO1xuICAgIH1cblxuICAgIC8qKiBTdG9wcyB0aGUgY3VycmVudGx5LXJ1bm5pbmcgcGFnaW5hdG9yIGludGVydmFsLiAgKi9cbiAgICBzdG9wSW50ZXJ2YWwoKSB7XG4gICAgICAgIHRoaXMuc3RvcFNjcm9sbGluZy5uZXh0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyB0aGUgdXNlciBwcmVzc2luZyBkb3duIG9uIG9uZSBvZiB0aGUgcGFnaW5hdG9ycy5cbiAgICAgKiBTdGFydHMgc2Nyb2xsaW5nIHRoZSBoZWFkZXIgYWZ0ZXIgYSBjZXJ0YWluIGFtb3VudCBvZiB0aW1lLlxuICAgICAqIEBwYXJhbSBkaXJlY3Rpb24gSW4gd2hpY2ggZGlyZWN0aW9uIHRoZSBwYWdpbmF0b3Igc2hvdWxkIGJlIHNjcm9sbGVkLlxuICAgICAqL1xuICAgIGhhbmRsZVBhZ2luYXRvclByZXNzKGRpcmVjdGlvbjogU2Nyb2xsRGlyZWN0aW9uLCBtb3VzZUV2ZW50PzogTW91c2VFdmVudCkge1xuICAgICAgICAvLyBEb24ndCBzdGFydCBhdXRvIHNjcm9sbGluZyBmb3IgcmlnaHQgbW91c2UgYnV0dG9uIGNsaWNrcy4gTm90ZSB0aGF0IHdlIHNob3VsZG4ndCBoYXZlIHRvXG4gICAgICAgIC8vIG51bGwgY2hlY2sgdGhlIGBidXR0b25gLCBidXQgd2UgZG8gaXQgc28gd2UgZG9uJ3QgYnJlYWsgdGVzdHMgdGhhdCB1c2UgZmFrZSBldmVudHMuXG4gICAgICAgIGlmIChtb3VzZUV2ZW50ICYmIG1vdXNlRXZlbnQuYnV0dG9uICE9IG51bGwgJiYgbW91c2VFdmVudC5idXR0b24gIT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgLy8gQXZvaWQgb3ZlcmxhcHBpbmcgdGltZXJzLlxuICAgICAgICB0aGlzLnN0b3BJbnRlcnZhbCgpO1xuXG4gICAgICAgIC8vIFN0YXJ0IGEgdGltZXIgYWZ0ZXIgdGhlIGRlbGF5IGFuZCBrZWVwIGZpcmluZyBiYXNlZCBvbiB0aGUgaW50ZXJ2YWwuXG4gICAgICAgIHRpbWVyKEhFQURFUl9TQ1JPTExfREVMQVksIEhFQURFUl9TQ1JPTExfSU5URVJWQUwpXG4gICAgICAgICAgICAvLyBLZWVwIHRoZSB0aW1lciBnb2luZyB1bnRpbCBzb21ldGhpbmcgdGVsbHMgaXQgdG8gc3RvcCBvciB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZC5cbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbChtZXJnZSh0aGlzLnN0b3BTY3JvbGxpbmcsIHRoaXMuZGVzdHJveWVkKSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IG1heFNjcm9sbERpc3RhbmNlLCBkaXN0YW5jZSB9ID0gdGhpcy5zY3JvbGxIZWFkZXIoZGlyZWN0aW9uKTtcblxuICAgICAgICAgICAgICAgIC8vIFN0b3AgdGhlIHRpbWVyIGlmIHdlJ3ZlIHJlYWNoZWQgdGhlIHN0YXJ0IG9yIHRoZSBlbmQuXG4gICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlID09PSAwIHx8IGRpc3RhbmNlID49IG1heFNjcm9sbERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEludGVydmFsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGl0ZW1TZWxlY3RlZChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBTY3JvbGxzIHRoZSBoZWFkZXIgdG8gYSBnaXZlbiBwb3NpdGlvbi5cbiAgICAgKiBAcGFyYW0gcG9zaXRpb24gUG9zaXRpb24gdG8gd2hpY2ggdG8gc2Nyb2xsLlxuICAgICAqIEByZXR1cm5zIEluZm9ybWF0aW9uIG9uIHRoZSBjdXJyZW50IHNjcm9sbCBkaXN0YW5jZSBhbmQgdGhlIG1heGltdW0uXG4gICAgICovXG4gICAgcHJpdmF0ZSBzY3JvbGxUbyhwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVQYWdpbmF0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4geyBtYXhTY3JvbGxEaXN0YW5jZTogMCwgZGlzdGFuY2U6IDAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1heFNjcm9sbERpc3RhbmNlID0gdGhpcy5nZXRNYXhTY3JvbGxEaXN0YW5jZSgpO1xuICAgICAgICB0aGlzLnNjcm9sbERpc3RhbmNlID0gTWF0aC5tYXgoMCwgTWF0aC5taW4obWF4U2Nyb2xsRGlzdGFuY2UsIHBvc2l0aW9uKSk7XG5cbiAgICAgICAgLy8gTWFyayB0aGF0IHRoZSBzY3JvbGwgZGlzdGFuY2UgaGFzIGNoYW5nZWQgc28gdGhhdCBhZnRlciB0aGUgdmlldyBpcyBjaGVja2VkLCB0aGUgQ1NTXG4gICAgICAgIC8vIHRyYW5zZm9ybWF0aW9uIGNhbiBtb3ZlIHRoZSBoZWFkZXIuXG4gICAgICAgIHRoaXMuc2Nyb2xsRGlzdGFuY2VDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jaGVja1Njcm9sbGluZ0NvbnRyb2xzKCk7XG5cbiAgICAgICAgcmV0dXJuIHsgbWF4U2Nyb2xsRGlzdGFuY2UsIGRpc3RhbmNlOiB0aGlzLnNjcm9sbERpc3RhbmNlIH07XG4gICAgfVxufVxuIl19