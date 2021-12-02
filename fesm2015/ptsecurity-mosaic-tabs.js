import * as i1$1 from '@angular/cdk/a11y';
import { FocusKeyManager, A11yModule } from '@angular/cdk/a11y';
import * as i7 from '@angular/cdk/portal';
import { CdkPortalOutlet, CdkPortal, TemplatePortal, PortalModule } from '@angular/cdk/portal';
import * as i3$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, Optional, Input, Output, ViewChild, forwardRef, Directive, Inject, InjectionToken, TemplateRef, ContentChild, ContentChildren, Attribute, NgModule } from '@angular/core';
import { mixinDisabled, PopUpPlacements, mixinTabIndex, McCommonModule } from '@ptsecurity/mosaic/core';
import * as i4 from '@ptsecurity/mosaic/icon';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import * as i6 from '@ptsecurity/mosaic/tooltip';
import { McToolTipModule } from '@ptsecurity/mosaic/tooltip';
import * as i3 from '@angular/cdk/bidi';
import { Subscription, Subject, fromEvent, of, merge, timer } from 'rxjs';
import { startWith, takeUntil, debounceTime, delay } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i2 from '@angular/cdk/platform';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import * as i1 from '@angular/cdk/scrolling';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { hasModifierKey, ENTER, SPACE } from '@angular/cdk/keycodes';
import { HOME, END, UP_ARROW, DOWN_ARROW, RIGHT_ARROW, LEFT_ARROW } from '@ptsecurity/cdk/keycodes';

const mcTabsAnimations = {
    /** Animation translates a tab along the X axis. */
    translateTab: trigger('translateTab', [
        // Note: transitions to `none` instead of 0, because some browsers might blur the content.
        state('center, void, left-origin-center, right-origin-center', style({ transform: 'none' })),
        // If the tab is either on the left or right, we additionally add a `min-height` of 1px
        // in order to ensure that the element has a height before its state changes. This is
        // necessary because Chrome does seem to skip the transition in RTL mode if the element does
        // not have a static height and is not rendered. See related issue: #9465
        state('left', style({ transform: 'translate3d(-100%, 0, 0)', minHeight: '1px' })),
        state('right', style({ transform: 'translate3d(100%, 0, 0)', minHeight: '1px' })),
        transition('* => left, * => right, left => center, right => center', animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')),
        transition('void => left-origin-center', [
            style({ transform: 'translate3d(-100%, 0, 0)' }),
            animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')
        ]),
        transition('void => right-origin-center', [
            style({ transform: 'translate3d(100%, 0, 0)' }),
            animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')
        ])
    ])
};

/**
 * Wrapper for the contents of a tab.
 * @docs-private
 */
class McTabBody {
    constructor(elementRef, dir, changeDetectorRef) {
        this.elementRef = elementRef;
        this.dir = dir;
        /** Event emitted when the tab begins to animate towards the center as the active tab. */
        this.onCentering = new EventEmitter();
        /** Event emitted before the centering of the tab begins. */
        this.beforeCentering = new EventEmitter();
        /** Event emitted before the centering of the tab begins. */
        this.afterLeavingCenter = new EventEmitter();
        /** Event emitted when the tab completes its animation towards the center. */
        this.onCentered = new EventEmitter(true);
        // Note that the default value will always be overwritten by `McTabBody`, but we need one
        // anyway to prevent the animations module from throwing an error if the body is used on its own.
        /** Duration for the tab's animation. */
        this.animationDuration = '0ms';
        /** Subscription to the directionality change observable. */
        this.dirChangeSubscription = Subscription.EMPTY;
        if (this.dir && changeDetectorRef) {
            this.dirChangeSubscription = this.dir.change
                .subscribe((direction) => {
                this.computePositionAnimationState(direction);
                changeDetectorRef.markForCheck();
            });
        }
    }
    /** The shifted index position of the tab body, where zero represents the active center tab. */
    set position(position) {
        this.positionIndex = position;
        this.computePositionAnimationState();
    }
    /**
     * After initialized, check if the content is centered and has an origin. If so, set the
     * special position states that transition the tab from the left or right before centering.
     */
    ngOnInit() {
        if (this.bodyPosition === 'center' && this.origin != null) {
            this.bodyPosition = this.computePositionFromOrigin();
        }
    }
    ngOnDestroy() {
        this.dirChangeSubscription.unsubscribe();
    }
    onTranslateTabStarted(e) {
        const isCentering = this.isCenterPosition(e.toState);
        this.beforeCentering.emit(isCentering);
        if (isCentering) {
            this.onCentering.emit(this.elementRef.nativeElement.clientHeight);
        }
    }
    onTranslateTabComplete(e) {
        // If the transition to the center is complete, emit an event.
        if (this.isCenterPosition(e.toState) && this.isCenterPosition(this.bodyPosition)) {
            this.onCentered.emit();
        }
        if (this.isCenterPosition(e.fromState) && !this.isCenterPosition(this.bodyPosition)) {
            this.afterLeavingCenter.emit();
        }
    }
    /** The text direction of the containing app. */
    getLayoutDirection() {
        return this.dir && this.dir.value === 'rtl' ? 'rtl' : 'ltr';
    }
    /** Whether the provided position state is considered center, regardless of origin. */
    isCenterPosition(position) {
        return position === 'center' || position === 'left-origin-center' || position === 'right-origin-center';
    }
    /** Computes the position state that will be used for the tab-body animation trigger. */
    computePositionAnimationState(dir = this.getLayoutDirection()) {
        if (this.positionIndex < 0) {
            this.bodyPosition = dir === 'ltr' ? 'left' : 'right';
        }
        else if (this.positionIndex > 0) {
            this.bodyPosition = dir === 'ltr' ? 'right' : 'left';
        }
        else {
            this.bodyPosition = 'center';
        }
    }
    /**
     * Computes the position state based on the specified origin position. This is used if the
     * tab is becoming visible immediately after creation.
     */
    computePositionFromOrigin() {
        const dir = this.getLayoutDirection();
        if ((dir === 'ltr' && this.origin <= 0) || (dir === 'rtl' && this.origin > 0)) {
            return 'left-origin-center';
        }
        return 'right-origin-center';
    }
}
/** @nocollapse */ McTabBody.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTabBody, deps: [{ token: i0.ElementRef }, { token: i3.Directionality, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McTabBody.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McTabBody, selector: "mc-tab-body", inputs: { position: "position", content: "content", origin: "origin", animationDuration: "animationDuration" }, outputs: { onCentering: "onCentering", beforeCentering: "beforeCentering", afterLeavingCenter: "afterLeavingCenter", onCentered: "onCentered" }, host: { classAttribute: "mc-tab-body" }, viewQueries: [{ propertyName: "portalHost", first: true, predicate: CdkPortalOutlet, descendants: true }], ngImport: i0, template: "<div class=\"mc-tab-body__content\"\n     #content\n     [@translateTab]=\"{\n        value: bodyPosition,\n        params: {animationDuration: animationDuration}\n     }\"\n     (@translateTab.start)=\"onTranslateTabStarted($event)\"\n     (@translateTab.done)=\"onTranslateTabComplete($event)\">\n    <ng-template mcTabBodyHost></ng-template>\n</div>\n", styles: [".mc-tab-body__content{height:100%;overflow:auto}.mc-tab-body__content .mc-tab-group_dynamic-height{overflow:hidden}\n"], directives: [{ type: i0.forwardRef(function () { return McTabBodyPortal; }), selector: "[mcTabBodyHost]" }], animations: [mcTabsAnimations.translateTab], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTabBody, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-tab-body',
                    templateUrl: 'tab-body.html',
                    styleUrls: ['tab-body.scss'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [mcTabsAnimations.translateTab],
                    host: {
                        class: 'mc-tab-body'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i3.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { position: [{
                type: Input
            }], onCentering: [{
                type: Output
            }], beforeCentering: [{
                type: Output
            }], afterLeavingCenter: [{
                type: Output
            }], onCentered: [{
                type: Output
            }], portalHost: [{
                type: ViewChild,
                args: [CdkPortalOutlet, { static: false }]
            }], content: [{
                type: Input,
                args: ['content']
            }], origin: [{
                type: Input
            }], animationDuration: [{
                type: Input
            }] } });
/**
 * The portal host directive for the contents of the tab.
 * @docs-private
 */
class McTabBodyPortal extends CdkPortalOutlet {
    constructor(componentFactoryResolver, viewContainerRef, host) {
        super(componentFactoryResolver, viewContainerRef);
        this.host = host;
        /** Subscription to events for when the tab body begins centering. */
        this.centeringSub = Subscription.EMPTY;
        /** Subscription to events for when the tab body finishes leaving from center position. */
        this.leavingSub = Subscription.EMPTY;
    }
    /** Set initial visibility or set up subscription for changing visibility. */
    ngOnInit() {
        super.ngOnInit();
        this.centeringSub = this.host.beforeCentering
            .pipe(startWith(this.host.isCenterPosition(this.host.bodyPosition)))
            .subscribe((isCentering) => {
            if (isCentering && !this.hasAttached()) {
                this.attach(this.host.content);
            }
        });
        this.leavingSub = this.host.afterLeavingCenter
            .subscribe(() => { this.detach(); });
    }
    /** Clean up centering subscription. */
    ngOnDestroy() {
        super.ngOnDestroy();
        this.centeringSub.unsubscribe();
        this.leavingSub.unsubscribe();
    }
}
/** @nocollapse */ McTabBodyPortal.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTabBodyPortal, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.ViewContainerRef }, { token: forwardRef(() => McTabBody) }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTabBodyPortal.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McTabBodyPortal, selector: "[mcTabBodyHost]", usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTabBodyPortal, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcTabBodyHost]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ViewContainerRef }, { type: McTabBody, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => McTabBody)]
                }] }]; } });

/** Decorates the `ng-template` tags and reads out the template from it. */
class McTabContent {
    constructor(template) {
        this.template = template;
    }
}
/** @nocollapse */ McTabContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTabContent, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTabContent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McTabContent, selector: "[mcTabContent]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTabContent, decorators: [{
            type: Directive,
            args: [{ selector: '[mcTabContent]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });

/* tslint:disable:naming-convention */
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
class McPaginatedTabHeader {
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
        const dirChange = this.dir ? this.dir.change : of('ltr');
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
        if (this.disablePagination || this.vertical) {
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
/** @nocollapse */ McPaginatedTabHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McPaginatedTabHeader, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.ViewportRuler }, { token: i0.NgZone }, { token: i2.Platform }, { token: i3.Directionality, optional: true }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McPaginatedTabHeader.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McPaginatedTabHeader, inputs: { disablePagination: "disablePagination" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McPaginatedTabHeader, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.ViewportRuler }, { type: i0.NgZone }, { type: i2.Platform }, { type: i3.Directionality, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }]; }, propDecorators: { disablePagination: [{
                type: Input
            }] } });

const MC_TAB_LABEL = new InjectionToken('McTabLabel');
/** Used to flag tab labels for use with the portal directive */
class McTabLabel extends CdkPortal {
}
/** @nocollapse */ McTabLabel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTabLabel, deps: null, target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTabLabel.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McTabLabel, selector: "[mc-tab-label], [mcTabLabel]", providers: [{ provide: MC_TAB_LABEL, useExisting: McTabLabel }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTabLabel, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mc-tab-label], [mcTabLabel]',
                    providers: [{ provide: MC_TAB_LABEL, useExisting: McTabLabel }]
                }]
        }] });

class McTabBase {
}
// tslint:disable-next-line:naming-convention
const McTabMixinBase = mixinDisabled(McTabBase);
class McTab extends McTabMixinBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        this._tooltipTitle = '';
        this.tooltipPlacement = PopUpPlacements.Right;
        /** Plain text label for the tab, used when there is no template label. */
        this.textLabel = '';
        this.empty = false;
        /** Emits whenever the internal state of the tab changes. */
        this.stateChanges = new Subject();
        /**
         * The relatively indexed position where 0 represents the center, negative is left, and positive
         * represents the right.
         */
        this.position = null;
        /**
         * The initial relatively index origin of the tab if it was created and selected after there
         * was already a selected tab. Provides context of what position the tab should originate from.
         */
        this.origin = null;
        /**
         * Whether the tab is currently active.
         */
        this.isActive = false;
        this._overflowTooltipTitle = '';
        /** Portal that will be the hosted content of the tab */
        this.contentPortal = null;
    }
    /** @docs-private */
    get content() {
        return this.contentPortal;
    }
    get templateLabel() {
        return this._templateLabel;
    }
    set templateLabel(value) {
        this.setTemplateLabelInput(value);
    }
    get tooltipTitle() {
        return this.overflowTooltipTitle + this._tooltipTitle;
    }
    set tooltipTitle(value) {
        this._tooltipTitle = value;
    }
    get isOverflown() {
        return !!this._overflowTooltipTitle;
    }
    get overflowTooltipTitle() {
        if (this.isOverflown) {
            return `${this._overflowTooltipTitle}\n`;
        }
        return '';
    }
    set overflowTooltipTitle(value) {
        this._overflowTooltipTitle = value;
    }
    ngOnChanges(changes) {
        if (changes.hasOwnProperty('textLabel') || changes.hasOwnProperty('disabled')) {
            this.stateChanges.next();
        }
    }
    ngOnDestroy() {
        this.stateChanges.complete();
    }
    ngOnInit() {
        this.contentPortal = new TemplatePortal(this.explicitContent || this.implicitContent, this.viewContainerRef);
    }
    /**
     * This has been extracted to a util because of TS 4 and VE.
     * View Engine doesn't support property rename inheritance.
     * TS 4.0 doesn't allow properties to override accessors or vice-versa.
     * @docs-private
     */
    setTemplateLabelInput(value) {
        // Only update the templateLabel via query if there is actually
        // a McTabLabel found. This works around an issue where a user may have
        // manually set `templateLabel` during creation mode, which would then get clobbered
        // by `undefined` when this query resolves.
        if (value) {
            this._templateLabel = value;
        }
    }
}
/** @nocollapse */ McTab.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTab, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McTab.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McTab, selector: "mc-tab", inputs: { disabled: "disabled", tooltipTitle: "tooltipTitle", tooltipPlacement: "tooltipPlacement", textLabel: ["label", "textLabel"], empty: "empty", tabId: "tabId" }, queries: [{ propertyName: "templateLabel", first: true, predicate: MC_TAB_LABEL, descendants: true }, { propertyName: "explicitContent", first: true, predicate: McTabContent, descendants: true, read: TemplateRef, static: true }], viewQueries: [{ propertyName: "implicitContent", first: true, predicate: TemplateRef, descendants: true, static: true }], exportAs: ["mcTab"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: '<ng-template><ng-content></ng-content></ng-template>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTab, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-tab',
                    exportAs: 'mcTab',
                    // Create a template for the content of the <mc-tab> so that we can grab a reference to this
                    // TemplateRef and use it in a Portal to render the tab content in the appropriate place in the
                    // tab-group.
                    template: '<ng-template><ng-content></ng-content></ng-template>',
                    inputs: ['disabled'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { templateLabel: [{
                type: ContentChild,
                args: [MC_TAB_LABEL]
            }], explicitContent: [{
                type: ContentChild,
                args: [McTabContent, { read: TemplateRef, static: true }]
            }], implicitContent: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }], tooltipTitle: [{
                type: Input
            }], tooltipPlacement: [{
                type: Input
            }], textLabel: [{
                type: Input,
                args: ['label']
            }], empty: [{
                type: Input
            }], tabId: [{
                type: Input,
                args: ['tabId']
            }] } });

// Boilerplate for applying mixins to McTabLabelWrapper.
/** @docs-private */
class McTabLabelWrapperBase {
}
// tslint:disable-next-line:naming-convention
const McTabLabelWrapperMixinBase = mixinDisabled(McTabLabelWrapperBase);
/**
 * Used in the `mc-tab-group` view to display tab labels.
 * @docs-private
 */
class McTabLabelWrapper extends McTabLabelWrapperMixinBase {
    constructor(elementRef, renderer) {
        super();
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    ngAfterViewInit() {
        this.addClassModifierForIcons(Array.from(this.elementRef.nativeElement.querySelectorAll('.mc-icon')));
    }
    /** Sets focus on the wrapper element */
    focus() {
        this.elementRef.nativeElement.focus();
    }
    getOffsetLeft() {
        return this.elementRef.nativeElement.offsetLeft;
    }
    getOffsetWidth() {
        return this.elementRef.nativeElement.offsetWidth;
    }
    checkOverflow() {
        this.tab.overflowTooltipTitle = this.isOverflown() ? this.getInnerText() : '';
    }
    isOverflown() {
        return this.labelContent.nativeElement.scrollWidth > this.labelContent.nativeElement.clientWidth;
    }
    getInnerText() {
        return this.labelContent.nativeElement.innerText;
    }
    addClassModifierForIcons(icons) {
        const twoIcons = 2;
        const [firstIconElement, secondIconElement] = icons;
        if (icons.length === 1) {
            const COMMENT_NODE = 8;
            if (firstIconElement.nextSibling && firstIconElement.nextSibling.nodeType !== COMMENT_NODE) {
                this.renderer.addClass(firstIconElement, 'mc-icon_left');
            }
            if (firstIconElement.previousSibling && firstIconElement.previousSibling.nodeType !== COMMENT_NODE) {
                this.renderer.addClass(firstIconElement, 'mc-icon_right');
            }
        }
        else if (icons.length === twoIcons) {
            this.renderer.addClass(firstIconElement, 'mc-icon_left');
            this.renderer.addClass(secondIconElement, 'mc-icon_right');
        }
    }
}
/** @nocollapse */ McTabLabelWrapper.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTabLabelWrapper, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTabLabelWrapper.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McTabLabelWrapper, selector: "[mcTabLabelWrapper]", inputs: { disabled: "disabled", tab: "tab" }, host: { properties: { "attr.disabled": "disabled || null" } }, queries: [{ propertyName: "labelContent", first: true, predicate: ["labelContent"], descendants: true }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTabLabelWrapper, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcTabLabelWrapper]',
                    inputs: ['disabled'],
                    host: {
                        '[attr.disabled]': 'disabled || null'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { labelContent: [{
                type: ContentChild,
                args: ['labelContent']
            }], tab: [{
                type: Input
            }] } });

/**
 * The header of the tab group which displays a list of all the tabs in the tab group.
 * When the tabs list's width exceeds the width of the header container,
 * then arrows will be displayed to allow the user to scroll
 * left and right across the header.
 * @docs-private
 */
class McTabHeader extends McPaginatedTabHeader {
    constructor(elementRef, changeDetectorRef, viewportRuler, ngZone, platform, dir, animationMode) {
        super(elementRef, changeDetectorRef, viewportRuler, ngZone, platform, dir, animationMode);
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        /** The index of the active tab. */
        this.vertical = false;
    }
    itemSelected(event) {
        event.preventDefault();
    }
}
/** @nocollapse */ McTabHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTabHeader, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.ViewportRuler }, { token: i0.NgZone }, { token: i2.Platform }, { token: i3.Directionality, optional: true }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McTabHeader.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McTabHeader, selector: "mc-tab-header", inputs: { selectedIndex: "selectedIndex", vertical: "vertical" }, outputs: { selectFocusedIndex: "selectFocusedIndex", indexFocused: "indexFocused" }, host: { properties: { "class.mc-tab-header_vertical": "vertical", "class.mc-tab-header__pagination-controls_enabled": "showPaginationControls", "class.mc-tab-header_rtl": "getLayoutDirection() == 'rtl'" }, classAttribute: "mc-tab-header" }, queries: [{ propertyName: "items", predicate: McTabLabelWrapper }], viewQueries: [{ propertyName: "tabListContainer", first: true, predicate: ["tabListContainer"], descendants: true, static: true }, { propertyName: "tabList", first: true, predicate: ["tabList"], descendants: true, static: true }, { propertyName: "nextPaginator", first: true, predicate: ["nextPaginator"], descendants: true }, { propertyName: "previousPaginator", first: true, predicate: ["previousPaginator"], descendants: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"mc-tab-header__pagination mc-tab-header__pagination_before\"\n     #previousPaginator\n     [class.mc-disabled]=\"disableScrollBefore\"\n     (click)=\"handlePaginatorClick('before')\"\n     (mousedown)=\"handlePaginatorPress('before', $event)\"\n     (touchend)=\"stopInterval()\">\n\n    <i mc-icon=\"mc-angle-left-M_16\"></i>\n</div>\n\n<div class=\"mc-tab-header__content\"\n     #tabListContainer\n     (keydown)=\"handleKeydown($event)\">\n\n    <div class=\"mc-tab-list\"\n         #tabList\n         (cdkObserveContent)=\"onContentChanges()\">\n        <div class=\"mc-tab-list__content\">\n            <ng-content></ng-content>\n        </div>\n    </div>\n</div>\n\n<div class=\"mc-tab-header__pagination mc-tab-header__pagination_after\"\n     #nextPaginator\n     [class.mc-disabled]=\"disableScrollAfter\"\n     (mousedown)=\"handlePaginatorPress('after', $event)\"\n     (click)=\"handlePaginatorClick('after')\"\n     (touchend)=\"stopInterval()\">\n\n    <i mc-icon=\"mc-angle-right-M_16\"></i>\n</div>\n", styles: [".mc-tab-label.cdk-keyboard-focused:after{display:block;content:\"\";position:absolute;top:0;right:calc(-1 * 1px);right:calc(-1 * var(--mc-tabs-size-border-width, 1px));bottom:calc(-1 * 1px);bottom:calc(-1 * var(--mc-tabs-size-border-width, 1px));left:calc(-1 * 1px);left:calc(-1 * var(--mc-tabs-size-border-width, 1px))}.mc-tab-label_horizontal.cdk-keyboard-focused:after,.mc-tab-label_old.cdk-keyboard-focused:after{border-width:calc(1px * 2);border-width:calc(var(--mc-tabs-size-border-width, 1px) * 2);border-style:solid;border-top-left-radius:3px;border-top-left-radius:var(--mc-tabs-size-border-radius, 3px);border-top-right-radius:3px;border-top-right-radius:var(--mc-tabs-size-border-radius, 3px);border-bottom-color:transparent}.mc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mc-tab-list__content{display:flex}.mc-tab-group_align-labels-center .mc-tab-list__content{justify-content:center}.mc-tab-group_align-labels-end .mc-tab-list__content{justify-content:flex-end}.mc-tab-header_vertical .mc-tab-list__content{flex-direction:column}.mc-tab-header__pagination{-webkit-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;cursor:pointer;z-index:2;-webkit-tap-highlight-color:transparent;touch-action:none;padding-left:12px;padding-right:12px;border-bottom-style:solid;border-bottom-width:1px;border-bottom-width:var(--mc-tabs-size-border-width, 1px)}.mc-tab-header__pagination.mc-tab-header__pagination_before{border-right-style:solid;border-right-width:1px;border-right-width:var(--mc-tabs-size-border-width, 1px)}.mc-tab-header__pagination.mc-tab-header__pagination_after{border-left-style:solid;border-left-width:1px;border-left-width:var(--mc-tabs-size-border-width, 1px)}.mc-tab-header__pagination-controls_enabled .mc-tab-header__pagination{display:flex}.mc-tab-header__content{display:flex;flex-grow:1;z-index:1;overflow:hidden}.mc-tab-list{position:relative;width:100%;transition:transform .5s cubic-bezier(.35,0,.25,1)}.mc-tab-label{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:40px;height:var(--mc-tabs-size-height, 40px);text-align:center;white-space:nowrap;cursor:pointer;padding-right:16px;padding-right:var(--mc-tabs-size-padding-horizontal, 16px);padding-left:16px;padding-left:var(--mc-tabs-size-padding-horizontal, 16px);outline:none;-webkit-user-select:none;user-select:none}.mc-tab-label .mc-tab-overlay{position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none}.mc-tab-label.mc-active{cursor:default}.mc-tab-label.mc-active:before{display:block;content:\"\";position:absolute}.mc-tab-label.mc-active[disabled] .mc-tab-overlay{bottom:-1px}.mc-tab-label.cdk-keyboard-focused{z-index:1}.mc-tab-label:first-child.cdk-keyboard-focused:after{left:0}.mc-tab-label:last-child.cdk-keyboard-focused:after{right:0}.mc-tab-label[disabled]{pointer-events:none}.mc-tab-label .mc-tab-label__content>.mc-icon.mc-icon_left{margin-right:8px;margin-right:var(--mc-tabs-size-label-icon-margin, 8px)}.mc-tab-label .mc-tab-label__content>.mc-icon.mc-icon_right{margin-left:8px;margin-left:var(--mc-tabs-size-label-icon-margin, 8px)}.mc-tab-label.mc-tab-label_vertical .mc-tab-label__content{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mc-tab-label_old{border-bottom-width:1px;border-bottom-width:var(--mc-tabs-size-border-width, 1px);border-bottom-style:solid;border-width:1px;border-width:var(--mc-tabs-size-border-width, 1px);border-style:solid;border-top-left-radius:3px;border-top-left-radius:var(--mc-tabs-size-border-radius, 3px);border-top-right-radius:3px;border-top-right-radius:var(--mc-tabs-size-border-radius, 3px);border-left:none;border-left-color:transparent;border-right:none;border-right-color:transparent}.mc-tab-label_old.mc-active{border-width:1px;border-width:var(--mc-tabs-size-border-width, 1px);border-style:solid;padding-right:calc(16px - 1px);padding-right:calc(var(--mc-tabs-size-padding-horizontal, 16px) - var(--mc-tabs-size-border-width, 1px));padding-left:calc(16px - 1px);padding-left:calc(var(--mc-tabs-size-padding-horizontal, 16px) - var(--mc-tabs-size-border-width, 1px))}.mc-tab-label_old.mc-active.cdk-keyboard-focused:after{right:calc(-2 * 1px);right:calc(-2 * var(--mc-tabs-size-border-width, 1px));left:calc(-2 * 1px);left:calc(-2 * var(--mc-tabs-size-border-width, 1px))}.mc-tab-label_old.cdk-keyboard-focused:after{top:-1px}.mc-tab-label_old .mc-tab-overlay{top:-1px;border-top-left-radius:3px;border-top-left-radius:var(--mc-tabs-size-border-radius, 3px);border-top-right-radius:3px;border-top-right-radius:var(--mc-tabs-size-border-radius, 3px)}.mc-tab-label_horizontal{border-bottom-width:1px;border-bottom-width:var(--mc-tabs-size-border-width, 1px);border-bottom-style:solid}.mc-tab-label_horizontal.mc-active:before{bottom:calc(-1 * 1px);bottom:calc(-1 * var(--mc-tabs-size-border-width, 1px));left:0;right:0;height:4px;height:var(--mc-tabs-size-highlight-height, 4px)}.mc-tab-label_vertical{justify-content:flex-start}.mc-tab-label_vertical.mc-active:before{top:0;bottom:0;left:calc(-1 * 1px);left:calc(-1 * var(--mc-tabs-size-border-width, 1px));width:5px;width:var(--mc-tabs-size-highlight-height, 5px)}.mc-tab-label_vertical.cdk-keyboard-focused:after{right:0;left:0;border-width:calc(1px * 2);border-width:calc(var(--mc-tabs-size-border-width, 1px) * 2);border-style:solid}.mc-tab-group_stretch-labels .mc-tab-label,.mc-tab-group_stretch-labels .mc-tab-label_old{flex-basis:0;flex-grow:1}\n"], components: [{ type: i4.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i4.McIconCSSStyler, selector: "[mc-icon]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTabHeader, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-tab-header',
                    templateUrl: 'tab-header.html',
                    styleUrls: ['tab-header.scss'],
                    inputs: ['selectedIndex'],
                    outputs: ['selectFocusedIndex', 'indexFocused'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.Default,
                    host: {
                        class: 'mc-tab-header',
                        '[class.mc-tab-header_vertical]': 'vertical',
                        '[class.mc-tab-header__pagination-controls_enabled]': 'showPaginationControls',
                        '[class.mc-tab-header_rtl]': 'getLayoutDirection() == \'rtl\''
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.ViewportRuler }, { type: i0.NgZone }, { type: i2.Platform }, { type: i3.Directionality, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }]; }, propDecorators: { vertical: [{
                type: Input
            }], items: [{
                type: ContentChildren,
                args: [McTabLabelWrapper, { descendants: false }]
            }], tabListContainer: [{
                type: ViewChild,
                args: ['tabListContainer', { static: true }]
            }], tabList: [{
                type: ViewChild,
                args: ['tabList', { static: true }]
            }], nextPaginator: [{
                type: ViewChild,
                args: ['nextPaginator']
            }], previousPaginator: [{
                type: ViewChild,
                args: ['previousPaginator']
            }] } });

class McOldTabsCssStyler {
}
/** @nocollapse */ McOldTabsCssStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McOldTabsCssStyler, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McOldTabsCssStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McOldTabsCssStyler, selector: "mc-tab-group[mc-old-tabs]", host: { classAttribute: "mc-tab-group_old" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McOldTabsCssStyler, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-tab-group[mc-old-tabs]',
                    host: { class: 'mc-tab-group_old' }
                }]
        }] });
class McAlignTabsCenterCssStyler {
}
/** @nocollapse */ McAlignTabsCenterCssStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McAlignTabsCenterCssStyler, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McAlignTabsCenterCssStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McAlignTabsCenterCssStyler, selector: "mc-tab-group[mc-align-tabs-center], [mc-tab-nav-bar][mc-align-tabs-center]", host: { classAttribute: "mc-tab-group_align-labels-center" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McAlignTabsCenterCssStyler, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-tab-group[mc-align-tabs-center], [mc-tab-nav-bar][mc-align-tabs-center]',
                    host: { class: 'mc-tab-group_align-labels-center' }
                }]
        }] });
class McAlignTabsEndCssStyler {
}
/** @nocollapse */ McAlignTabsEndCssStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McAlignTabsEndCssStyler, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McAlignTabsEndCssStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McAlignTabsEndCssStyler, selector: "mc-tab-group[mc-align-tabs-end], [mc-tab-nav-bar][mc-align-tabs-end]", host: { classAttribute: "mc-tab-group_align-labels-end" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McAlignTabsEndCssStyler, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-tab-group[mc-align-tabs-end], [mc-tab-nav-bar][mc-align-tabs-end]',
                    host: { class: 'mc-tab-group_align-labels-end' }
                }]
        }] });
class McStretchTabsCssStyler {
}
/** @nocollapse */ McStretchTabsCssStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McStretchTabsCssStyler, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McStretchTabsCssStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McStretchTabsCssStyler, selector: "mc-tab-group[mc-stretch-tabs], [mc-tab-nav-bar][mc-stretch-tabs]", host: { classAttribute: "mc-tab-group_stretch-labels" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McStretchTabsCssStyler, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-tab-group[mc-stretch-tabs], [mc-tab-nav-bar][mc-stretch-tabs]',
                    host: { class: 'mc-tab-group_stretch-labels' }
                }]
        }] });
class McVerticalTabsCssStyler {
}
/** @nocollapse */ McVerticalTabsCssStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McVerticalTabsCssStyler, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McVerticalTabsCssStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McVerticalTabsCssStyler, selector: "mc-tab-group[vertical], [mc-tab-nav-bar][vertical]", host: { classAttribute: "mc-tab-group_vertical" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McVerticalTabsCssStyler, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-tab-group[vertical], [mc-tab-nav-bar][vertical]',
                    host: { class: 'mc-tab-group_vertical' }
                }]
        }] });
/** Used to generate unique ID's for each tab component */
let nextId = 0;
/** A simple change event emitted on focus or selection changes. */
class McTabChangeEvent {
}
/** Injection token that can be used to provide the default options the tabs module. */
const MC_TABS_CONFIG = new InjectionToken('MC_TABS_CONFIG');
// Boilerplate for applying mixins to McTabGroup.
/** @docs-private */
class McTabGroupBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
const McTabGroupMixinBase = mixinDisabled(McTabGroupBase);
/**
 * Tab-group component.  Supports basic tab pairs (label + content) and includes
 * keyboard navigation.
 */
class McTabGroup extends McTabGroupMixinBase {
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
        this.animationDuration = (defaultConfig === null || defaultConfig === void 0 ? void 0 : defaultConfig.animationDuration) || '0ms';
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
/** @nocollapse */ McTabGroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTabGroup, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: 'mc-old-tabs', attribute: true }, { token: 'vertical', attribute: true }, { token: MC_TABS_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McTabGroup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McTabGroup, selector: "mc-tab-group", inputs: { disabled: "disabled", dynamicHeight: "dynamicHeight", selectedIndex: "selectedIndex", headerPosition: "headerPosition", animationDuration: "animationDuration" }, outputs: { selectedIndexChange: "selectedIndexChange", focusChange: "focusChange", animationDone: "animationDone", selectedTabChange: "selectedTabChange" }, host: { listeners: { "window:resize": "resizeStream.next()" }, properties: { "class.mc-tab-group_dynamic-height": "dynamicHeight", "class.mc-tab-group_inverted-header": "headerPosition === \"below\"" }, classAttribute: "mc-tab-group" }, queries: [{ propertyName: "tabs", predicate: McTab }], viewQueries: [{ propertyName: "tabBodyWrapper", first: true, predicate: ["tabBodyWrapper"], descendants: true }, { propertyName: "tabHeader", first: true, predicate: ["tabHeader"], descendants: true }], exportAs: ["mcTabGroup"], usesInheritance: true, ngImport: i0, template: "<mc-tab-header\n    #tabHeader\n    [vertical]=\"vertical\"\n    [selectedIndex]=\"selectedIndex\"\n    (indexFocused)=\"focusChanged($event)\"\n    (selectFocusedIndex)=\"selectedIndex = $event\">\n\n    <div class=\"mc-tab-label\"\n         mcTabLabelWrapper\n         cdkMonitorElementFocus\n         [attr.tabindex]=\"getTabIndex(tab, i)\"\n         [class.mc-tab-label_old]=\"oldTab\"\n         [class.mc-tab-label_horizontal]=\"!vertical && !oldTab\"\n         [class.mc-tab-label_vertical]=\"vertical && !oldTab\"\n         [class.mc-tab-label_empty]=\"tab.empty\"\n         [class.mc-active]=\"selectedIndex == i\"\n         *ngFor=\"let tab of tabs; let i = index\"\n         [tab]=\"tab\"\n         [id]=\"getTabLabelId(i)\"\n         [disabled]=\"tab.disabled\"\n         (click)=\"handleClick(tab, tabHeader, i)\"\n\n         [mcTooltip]=\"tab.tooltipTitle\"\n         [mcTooltipDisabled]=\"!tab.empty && !tab.isOverflown\"\n         [mcTrigger]=\"'hover, focus'\"\n         [mcPlacement]=\"tab.tooltipPlacement\">\n\n        <div #labelContent class=\"mc-tab-label__content\"\n            [class.mc-tab-label__template]=\"tab.templateLabel\">\n            <!-- If there is a label template, use it. -->\n            <ng-template [ngIf]=\"tab.templateLabel\">\n                <ng-template [cdkPortalOutlet]=\"tab.templateLabel\"></ng-template>\n            </ng-template>\n\n            <!-- If there is not a label template, fall back to the text label. -->\n            <ng-template [ngIf]=\"!tab.templateLabel\">{{ tab.textLabel }}</ng-template>\n        </div>\n\n        <div class=\"mc-tab-overlay\"></div>\n    </div>\n</mc-tab-header>\n\n<div class=\"mc-tab-body__wrapper\" #tabBodyWrapper>\n    <mc-tab-body\n        *ngFor=\"let tab of tabs; let i = index\"\n        [id]=\"getTabContentId(i)\"\n        [class.mc-tab-body__active]=\"selectedIndex == i\"\n        [content]=\"tab.content!\"\n        [position]=\"tab.position!\"\n        [origin]=\"tab.origin!\"\n        [animationDuration]=\"animationDuration\"\n        (onCentered)=\"removeTabBodyWrapperHeight()\"\n        (onCentering)=\"setTabBodyWrapperHeight($event)\">\n    </mc-tab-body>\n</div>\n", styles: [".mc-tab-group{display:flex;flex-direction:column;box-sizing:border-box;text-align:center;white-space:nowrap}.mc-tab-group.mc-tab-group_inverted-header{flex-direction:column-reverse}.mc-tab-group_vertical{flex-direction:row}.mc-tab-group_vertical .mc-tab-header__content{overflow-y:auto;padding-top:8px;padding-bottom:1px;border-right-width:1px;border-right-width:var(--mc-tabs-size-border-width, 1px);border-right-style:solid}.mc-tab-body__wrapper{display:flex;overflow:hidden;position:relative}.mc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;flex-basis:100%}.mc-tab-body.mc-tab-body__active{overflow-x:hidden;overflow-y:auto;position:relative;z-index:1;flex-grow:1}.mc-tab-group.mc-tab-group_dynamic-height .mc-tab-body.mc-tab-body__active{overflow-y:hidden}\n"], components: [{ type: McTabHeader, selector: "mc-tab-header", inputs: ["selectedIndex", "vertical"], outputs: ["selectFocusedIndex", "indexFocused"] }, { type: McTabBody, selector: "mc-tab-body", inputs: ["position", "content", "origin", "animationDuration"], outputs: ["onCentering", "beforeCentering", "afterLeavingCenter", "onCentered"] }], directives: [{ type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: McTabLabelWrapper, selector: "[mcTabLabelWrapper]", inputs: ["disabled", "tab"] }, { type: i1$1.CdkMonitorFocus, selector: "[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]", outputs: ["cdkFocusChange"] }, { type: i6.McTooltipTrigger, selector: "[mcTooltip]", inputs: ["mcVisible", "mcPlacement", "mcPlacementPriority", "mcTooltip", "mcTooltipDisabled", "mcEnterDelay", "mcLeaveDelay", "mcTrigger", "mcTooltipClass"], outputs: ["mcPlacementChange", "mcVisibleChange"], exportAs: ["mcTooltip"] }, { type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTabGroup, decorators: [{
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
                        '[class.mc-tab-group_inverted-header]': 'headerPosition === "below"',
                        '(window:resize)': 'resizeStream.next()'
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

// Boilerplate for applying mixins to McTabLink.
class McTabLinkBase {
}
// tslint:disable-next-line:naming-convention
const McTabLinkMixinBase = mixinTabIndex(mixinDisabled(McTabLinkBase));
/**
 * Link inside of a `mc-tab-nav-bar`.
 */
class McTabLink extends McTabLinkMixinBase {
    constructor(elementRef, focusMonitor, renderer) {
        super();
        this.elementRef = elementRef;
        this.focusMonitor = focusMonitor;
        this.renderer = renderer;
        this.vertical = false;
        /** Whether the tab link is active or not. */
        this.isActive = false;
        this.focusMonitor.monitor(this.elementRef.nativeElement);
    }
    /** Whether the link is active. */
    get active() {
        return this.isActive;
    }
    set active(value) {
        if (value !== this.isActive) {
            this.isActive = value;
        }
    }
    ngAfterViewInit() {
        this.addClassModifierForIcons(Array.from(this.elementRef.nativeElement.querySelectorAll('.mc-icon')));
    }
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }
    addClassModifierForIcons(icons) {
        const twoIcons = 2;
        const [firstIconElement, secondIconElement] = icons;
        if (icons.length === 1) {
            const COMMENT_NODE = 8;
            if (firstIconElement.nextSibling && firstIconElement.nextSibling.nodeType !== COMMENT_NODE) {
                this.renderer.addClass(firstIconElement, 'mc-icon_left');
            }
            if (firstIconElement.previousSibling && firstIconElement.previousSibling.nodeType !== COMMENT_NODE) {
                this.renderer.addClass(firstIconElement, 'mc-icon_right');
            }
        }
        else if (icons.length === twoIcons) {
            this.renderer.addClass(firstIconElement, 'mc-icon_left');
            this.renderer.addClass(secondIconElement, 'mc-icon_right');
        }
    }
}
/** @nocollapse */ McTabLink.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTabLink, deps: [{ token: i0.ElementRef }, { token: i1$1.FocusMonitor }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McTabLink.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McTabLink, selector: "a[mc-tab-link], a[mcTabLink]", inputs: { disabled: "disabled", tabIndex: "tabIndex", active: "active" }, host: { properties: { "class.mc-active": "active", "class.mc-tab-label_vertical": "vertical", "class.mc-tab-label_horizontal": "!vertical", "attr.tabindex": "tabIndex", "attr.disabled": "disabled || null" }, classAttribute: "mc-tab-link" }, exportAs: ["mcTabLink"], usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content><div class="mc-tab-overlay"></div>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTabLink, decorators: [{
            type: Component,
            args: [{
                    selector: 'a[mc-tab-link], a[mcTabLink]',
                    exportAs: 'mcTabLink',
                    template: '<ng-content></ng-content><div class="mc-tab-overlay"></div>',
                    inputs: ['disabled', 'tabIndex'],
                    host: {
                        class: 'mc-tab-link',
                        '[class.mc-active]': 'active',
                        '[class.mc-tab-label_vertical]': 'vertical',
                        '[class.mc-tab-label_horizontal]': '!vertical',
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.disabled]': 'disabled || null'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1$1.FocusMonitor }, { type: i0.Renderer2 }]; }, propDecorators: { active: [{
                type: Input
            }] } });
/**
 * Navigation component matching the styles of the tab group header.
 */
class McTabNav {
    constructor(vertical) {
        this.vertical = false;
        this.vertical = coerceBooleanProperty(vertical);
    }
    ngAfterContentInit() {
        this.links.changes
            .pipe(delay(0))
            .subscribe((links) => links.forEach((link) => link.vertical = this.vertical));
        this.links.notifyOnChanges();
    }
}
/** @nocollapse */ McTabNav.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTabNav, deps: [{ token: 'vertical', attribute: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McTabNav.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McTabNav, selector: "[mc-tab-nav-bar]", host: { classAttribute: "mc-tab-nav-bar" }, queries: [{ propertyName: "links", predicate: McTabLink }], exportAs: ["mcTabNavBar", "mcTabNav"], ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [".mc-tab-link.cdk-keyboard-focused:after{display:block;content:\"\";position:absolute;top:0;right:calc(-1 * 1px);right:calc(-1 * var(--mc-tabs-size-border-width, 1px));bottom:calc(-1 * 1px);bottom:calc(-1 * var(--mc-tabs-size-border-width, 1px));left:calc(-1 * 1px);left:calc(-1 * var(--mc-tabs-size-border-width, 1px))}.mc-tab-link{vertical-align:top;text-decoration:none;-webkit-tap-highlight-color:transparent;position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:40px;height:var(--mc-tabs-size-height, 40px);text-align:center;white-space:nowrap;cursor:pointer;padding-right:16px;padding-right:var(--mc-tabs-size-padding-horizontal, 16px);padding-left:16px;padding-left:var(--mc-tabs-size-padding-horizontal, 16px);outline:none}.mc-tab-link .mc-tab-overlay{position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none}.mc-tab-link.mc-active{cursor:default}.mc-tab-link.mc-active:before{display:block;content:\"\";position:absolute}.mc-tab-link.mc-active[disabled] .mc-tab-overlay{bottom:-1px}.mc-tab-link.cdk-keyboard-focused{z-index:1}.mc-tab-link:first-child.cdk-keyboard-focused:after{left:0}.mc-tab-link:last-child.cdk-keyboard-focused:after{right:0}.mc-tab-link[disabled]{pointer-events:none}.mc-tab-link .mc-tab-label__content>.mc-icon.mc-icon_left{margin-right:8px;margin-right:var(--mc-tabs-size-label-icon-margin, 8px)}.mc-tab-link .mc-tab-label__content>.mc-icon.mc-icon_right{margin-left:8px;margin-left:var(--mc-tabs-size-label-icon-margin, 8px)}.mc-tab-link.mc-tab-label_vertical .mc-tab-label__content{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mc-tab-link .mc-tab-group_stretch-labels .mc-tab-link{flex-basis:0;flex-grow:1}.mc-tab-link>.mc-icon.mc-icon_left{margin-right:8px;margin-right:var(--mc-tabs-size-label-icon-margin, 8px)}.mc-tab-link>.mc-icon.mc-icon_right{margin-left:8px;margin-left:var(--mc-tabs-size-label-icon-margin, 8px)}.mc-tab-nav-bar{display:flex;flex-grow:1;position:relative;padding:1px 1px 0}.mc-tab-nav-bar .mc-tab-group_align-labels-center{justify-content:center}.mc-tab-nav-bar .mc-tab-group_align-labels-end{justify-content:flex-end}.mc-tab-nav-bar.mc-tab-group_vertical{flex-direction:column;flex-grow:0}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTabNav, decorators: [{
            type: Component,
            args: [{
                    selector: '[mc-tab-nav-bar]',
                    exportAs: 'mcTabNavBar, mcTabNav',
                    template: '<ng-content></ng-content>',
                    styleUrls: ['tab-nav-bar.scss'],
                    host: {
                        class: 'mc-tab-nav-bar'
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Attribute,
                    args: ['vertical']
                }] }]; }, propDecorators: { links: [{
                type: ContentChildren,
                args: [McTabLink]
            }] } });

class McTabsModule {
}
/** @nocollapse */ McTabsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTabsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McTabsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTabsModule, declarations: [McTabGroup,
        McTabLabel,
        McTab,
        McTabLabelWrapper,
        McTabNav,
        McTabLink,
        McTabBody,
        McTabBodyPortal,
        McTabHeader,
        McTabContent,
        McOldTabsCssStyler,
        McAlignTabsCenterCssStyler,
        McAlignTabsEndCssStyler,
        McStretchTabsCssStyler,
        McVerticalTabsCssStyler], imports: [CommonModule,
        PortalModule,
        A11yModule,
        McCommonModule,
        McIconModule,
        McToolTipModule], exports: [McCommonModule,
        McTabGroup,
        McTabLabel,
        McTab,
        McTabNav,
        McTabLink,
        McTabContent,
        McOldTabsCssStyler,
        McAlignTabsCenterCssStyler,
        McAlignTabsEndCssStyler,
        McStretchTabsCssStyler,
        McVerticalTabsCssStyler] });
/** @nocollapse */ McTabsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTabsModule, imports: [[
            CommonModule,
            PortalModule,
            A11yModule,
            McCommonModule,
            McIconModule,
            McToolTipModule
        ], McCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTabsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        PortalModule,
                        A11yModule,
                        McCommonModule,
                        McIconModule,
                        McToolTipModule
                    ],
                    // Don't export all components because some are only to be used internally.
                    exports: [
                        McCommonModule,
                        McTabGroup,
                        McTabLabel,
                        McTab,
                        McTabNav,
                        McTabLink,
                        McTabContent,
                        McOldTabsCssStyler,
                        McAlignTabsCenterCssStyler,
                        McAlignTabsEndCssStyler,
                        McStretchTabsCssStyler,
                        McVerticalTabsCssStyler
                    ],
                    declarations: [
                        McTabGroup,
                        McTabLabel,
                        McTab,
                        McTabLabelWrapper,
                        McTabNav,
                        McTabLink,
                        McTabBody,
                        McTabBodyPortal,
                        McTabHeader,
                        McTabContent,
                        McOldTabsCssStyler,
                        McAlignTabsCenterCssStyler,
                        McAlignTabsEndCssStyler,
                        McStretchTabsCssStyler,
                        McVerticalTabsCssStyler
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MC_TABS_CONFIG, McAlignTabsCenterCssStyler, McAlignTabsEndCssStyler, McOldTabsCssStyler, McStretchTabsCssStyler, McTab, McTabBody, McTabBodyPortal, McTabChangeEvent, McTabContent, McTabGroup, McTabGroupBase, McTabGroupMixinBase, McTabHeader, McTabLabel, McTabLabelWrapper, McTabLink, McTabNav, McTabsModule, McVerticalTabsCssStyler, mcTabsAnimations };
//# sourceMappingURL=ptsecurity-mosaic-tabs.js.map
