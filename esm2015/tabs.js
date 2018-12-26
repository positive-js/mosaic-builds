/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __metadata, __param } from 'tslib';
import { Directive, TemplateRef, ChangeDetectionStrategy, Component, ContentChild, Input, ViewChild, ViewContainerRef, ViewEncapsulation, ChangeDetectorRef, Inject, Output, EventEmitter, ElementRef, Optional, ComponentFactoryResolver, forwardRef, ContentChildren, NgZone, QueryList, InjectionToken, Attribute, NgModule } from '@angular/core';
import { CdkPortal, TemplatePortal, CdkPortalOutlet, PortalHostDirective, PortalModule } from '@ptsecurity/cdk/portal';
import { mixinDisabled, mixinColor, mixinTabIndex, McCommonModule } from '@ptsecurity/mosaic/core';
import { Subject, Subscription, merge, of } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Directionality } from '@ptsecurity/cdk/bidi';
import { startWith, takeUntil } from 'rxjs/operators';
import { FocusKeyManager, FocusMonitor, A11yModule } from '@ptsecurity/cdk/a11y';
import { coerceNumberProperty, coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { END, ENTER, HOME, SPACE } from '@ptsecurity/cdk/keycodes';
import { ViewportRuler } from '@ptsecurity/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** Decorates the `ng-template` tags and reads out the template from it. */
let McTabContent = class McTabContent {
    constructor(template) {
        this.template = template;
    }
};
McTabContent = __decorate([
    Directive({ selector: '[mcTabContent]' }),
    __metadata("design:paramtypes", [TemplateRef])
], McTabContent);

/** Used to flag tab labels for use with the portal directive */
let McTabLabel = class McTabLabel extends CdkPortal {
};
McTabLabel = __decorate([
    Directive({
        selector: '[mc-tab-label], [mcTabLabel]'
    })
], McTabLabel);
// TODO: workaround for https://github.com/angular/material2/issues/12760
McTabLabel.ctorParameters = () => CdkPortal.ctorParameters;

class McTabBase {
}
const mcTabMixinBase = mixinDisabled(McTabBase);
let McTab = class McTab extends mcTabMixinBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        /** Plain text label for the tab, used when there is no template label. */
        this.textLabel = '';
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
        /** Portal that will be the hosted content of the tab */
        this.contentPortal = null;
    }
    /** @docs-private */
    get content() {
        return this.contentPortal;
    }
    ngOnChanges(changes) {
        if (changes.hasOwnProperty('textLabel') ||
            changes.hasOwnProperty('disabled')) {
            this.stateChanges.next();
        }
    }
    ngOnDestroy() {
        this.stateChanges.complete();
    }
    ngOnInit() {
        this.contentPortal = new TemplatePortal(this.explicitContent || this.implicitContent, this.viewContainerRef);
    }
};
__decorate([
    ContentChild(McTabLabel),
    __metadata("design:type", McTabLabel)
], McTab.prototype, "templateLabel", void 0);
__decorate([
    ContentChild(McTabContent, { read: TemplateRef }),
    __metadata("design:type", TemplateRef)
], McTab.prototype, "explicitContent", void 0);
__decorate([
    ViewChild(TemplateRef),
    __metadata("design:type", TemplateRef)
], McTab.prototype, "implicitContent", void 0);
__decorate([
    Input('label'),
    __metadata("design:type", String)
], McTab.prototype, "textLabel", void 0);
__decorate([
    Input('aria-label'),
    __metadata("design:type", String)
], McTab.prototype, "ariaLabel", void 0);
__decorate([
    Input('aria-labelledby'),
    __metadata("design:type", String)
], McTab.prototype, "ariaLabelledby", void 0);
McTab = __decorate([
    Component({
        selector: 'mc-tab',
        // Create a template for the content of the <mc-tab> so that we can grab a reference to this
        // TemplateRef and use it in a Portal to render the tab content in the appropriate place in the
        // tab-group.
        template: '<ng-template><ng-content></ng-content></ng-template>',
        inputs: ['disabled'],
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
        exportAs: 'mcTab'
    }),
    __metadata("design:paramtypes", [ViewContainerRef])
], McTab);

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
 * The portal host directive for the contents of the tab.
 * @docs-private
 */
let McTabBodyPortal = class McTabBodyPortal extends CdkPortalOutlet {
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
        this.leavingSub = this.host.afterLeavingCenter.subscribe(() => {
            this.detach();
        });
    }
    /** Clean up centering subscription. */
    ngOnDestroy() {
        super.ngOnDestroy();
        this.centeringSub.unsubscribe();
        this.leavingSub.unsubscribe();
    }
};
McTabBodyPortal = __decorate([
    Directive({
        selector: '[mcTabBodyHost]'
    }),
    __param(2, Inject(forwardRef(() => McTabBody))),
    __metadata("design:paramtypes", [ComponentFactoryResolver,
        ViewContainerRef,
        McTabBody])
], McTabBodyPortal);
/**
 * Wrapper for the contents of a tab.
 * @docs-private
 */
let McTabBody = class McTabBody {
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
            this.dirChangeSubscription = this.dir.change.subscribe((direction) => {
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
        return position === 'center' ||
            position === 'left-origin-center' ||
            position === 'right-origin-center';
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
};
__decorate([
    Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], McTabBody.prototype, "position", null);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], McTabBody.prototype, "onCentering", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], McTabBody.prototype, "beforeCentering", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], McTabBody.prototype, "afterLeavingCenter", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], McTabBody.prototype, "onCentered", void 0);
__decorate([
    ViewChild(PortalHostDirective),
    __metadata("design:type", PortalHostDirective)
], McTabBody.prototype, "portalHost", void 0);
__decorate([
    Input('content'),
    __metadata("design:type", TemplatePortal)
], McTabBody.prototype, "content", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], McTabBody.prototype, "origin", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], McTabBody.prototype, "animationDuration", void 0);
McTabBody = __decorate([
    Component({
        selector: 'mc-tab-body',
        template: "<div class=\"mc-tab-body__content\" #content [@translateTab]=\"{ value: bodyPosition, params: {animationDuration: animationDuration} }\" (@translateTab.start)=\"onTranslateTabStarted($event)\" (@translateTab.done)=\"onTranslateTabComplete($event)\"><ng-template mcTabBodyHost></ng-template></div>",
        styles: [".mc-tab-body__content{height:100%;overflow:auto}.mc-tab-body__content .mc-tab-group_dynamic-height{overflow:hidden}"],
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [mcTabsAnimations.translateTab],
        host: {
            class: 'mc-tab-body'
        }
    }),
    __param(1, Optional()),
    __metadata("design:paramtypes", [ElementRef,
        Directionality,
        ChangeDetectorRef])
], McTabBody);

// Boilerplate for applying mixins to McTabLabelWrapper.
/** @docs-private */
class McTabLabelWrapperBase {
}
const mcTabLabelWrapperMixinBase = mixinDisabled(McTabLabelWrapperBase);
/**
 * Used in the `mc-tab-group` view to display tab labels.
 * @docs-private
 */
let McTabLabelWrapper = class McTabLabelWrapper extends mcTabLabelWrapperMixinBase {
    constructor(elementRef) {
        super();
        this.elementRef = elementRef;
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
};
McTabLabelWrapper = __decorate([
    Directive({
        selector: '[mcTabLabelWrapper]',
        inputs: ['disabled'],
        host: {
            '[class.mc-disabled]': 'disabled',
            '[attr.aria-disabled]': '!!disabled'
        }
    }),
    __metadata("design:paramtypes", [ElementRef])
], McTabLabelWrapper);

const VIEWPORT_THROTTLE_TIME = 150;
const SCROLL_DISTANCE_DELIMITER = 3;
/**
 * The distance in pixels that will be overshot when scrolling a tab label into view. This helps
 * provide a small affordance to the label next to it.
 */
const EXAGGERATED_OVERSCROLL = 60;
// Boilerplate for applying mixins to McTabHeader.
/** @docs-private */
class McTabHeaderBase {
}
/**
 * The header of the tab group which displays a list of all the tabs in the tab group.
 * When the tabs list's width exceeds the width of the header container,
 * then arrows will be displayed to allow the user to scroll
 * left and right across the header.
 * @docs-private
 */
let McTabHeader = class McTabHeader extends McTabHeaderBase {
    constructor(elementRef, changeDetectorRef, viewportRuler, dir, ngZone) {
        super();
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this.viewportRuler = viewportRuler;
        this.dir = dir;
        this.ngZone = ngZone;
        /** Whether the controls for pagination should be displayed */
        this.showPaginationControls = false;
        /** Whether the tab list can be scrolled more towards the end of the tab label list. */
        this.disableScrollAfter = true;
        /** Whether the tab list can be scrolled more towards the beginning of the tab label list. */
        this.disableScrollBefore = true;
        /** Event emitted when the option is selected. */
        this.selectFocusedIndex = new EventEmitter();
        /** Event emitted when a label is focused. */
        this.indexFocused = new EventEmitter();
        /** The distance in pixels that the tab labels should be translated to the left. */
        this._scrollDistance = 0;
        /** Whether the header should scroll to the selected index after the view has been checked. */
        this.selectedIndexChanged = false;
        /** Emits when the component is destroyed. */
        this.destroyed = new Subject();
        this._selectedIndex = 0;
    }
    /** The index of the active tab. */
    get selectedIndex() {
        return this._selectedIndex;
    }
    set selectedIndex(value) {
        const coercedValue = coerceNumberProperty(value);
        this.selectedIndexChanged = this._selectedIndex !== coercedValue;
        this._selectedIndex = coercedValue;
        if (this.keyManager) {
            this.keyManager.updateActiveItem(coercedValue);
        }
    }
    /** Tracks which element has focus; used for keyboard navigation */
    get focusIndex() {
        return this.keyManager ? this.keyManager.activeItemIndex : 0;
    }
    /** When the focus index is set, we must manually send focus to the correct label */
    set focusIndex(value) {
        if (!this.isValidIndex(value) ||
            this.focusIndex === value ||
            !this.keyManager) {
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
    handleKeydown(event) {
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
    ngAfterContentInit() {
        const dirChange = this.dir ? this.dir.change : of(null);
        const resize = this.viewportRuler.change(VIEWPORT_THROTTLE_TIME);
        const realign = () => {
            this.updatePagination();
        };
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
            .subscribe(() => {
            realign();
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
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
    /**
     * Callback for when the MutationObserver detects that the content has changed.
     */
    onContentChanges() {
        const zoneCallback = () => {
            this.updatePagination();
            this.changeDetectorRef.markForCheck();
        };
        // The content observer runs outside the `NgZone` by default, which
        // means that we need to bring the callback back in ourselves.
        this.ngZone.run(zoneCallback);
    }
    /**
     * Updating the view whether pagination should be enabled or not
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
        if (!this.labelWrappers) {
            return true;
        }
        const tab = this.labelWrappers
            ? this.labelWrappers.toArray()[index]
            : null;
        return !!tab && !tab.disabled;
    }
    /**
     * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
     * scrolling is enabled.
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
            const containerEl = this.tabListContainer.nativeElement;
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
    /** The layout direction of the containing app. */
    getLayoutDirection() {
        return this.dir && this.dir.value === 'rtl' ? 'rtl' : 'ltr';
    }
    /** Performs the CSS transformation on the tab list that will cause the list to scroll. */
    updateTabScrollPosition() {
        const scrollDistance = this.scrollDistance;
        const translateX = this.getLayoutDirection() === 'ltr'
            ? -scrollDistance
            : scrollDistance;
        // Don't use `translate3d` here because we don't want to create a new layer. A new layer
        // seems to cause flickering and overflow in Internet Explorer.
        // See: https://github.com/angular/material2/issues/10276
        this.tabList.nativeElement.style.transform = `translateX(${translateX}px)`;
    }
    /**
     * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
     * the end of the list, respectively). The distance to scroll is computed to be a third of the
     * length of the tab list view window.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    scrollHeader(scrollDir) {
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
     */
    scrollToLabel(labelIndex) {
        const selectedLabel = this.labelWrappers
            ? this.labelWrappers.toArray()[labelIndex]
            : null;
        if (!selectedLabel) {
            return;
        }
        // The view length is the visible width of the tab labels.
        const viewLength = this.tabListContainer.nativeElement.offsetWidth;
        let labelBeforePos;
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
        const beforeVisiblePos = this.scrollDistance;
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
     */
    checkPaginationEnabled() {
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
     */
    getMaxScrollDistance() {
        const lengthOfTabList = this.tabList.nativeElement.scrollWidth;
        const viewLength = this.tabListContainer.nativeElement.offsetWidth;
        return lengthOfTabList - viewLength || 0;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], McTabHeader.prototype, "selectedIndex", null);
__decorate([
    ContentChildren(McTabLabelWrapper),
    __metadata("design:type", QueryList)
], McTabHeader.prototype, "labelWrappers", void 0);
__decorate([
    ViewChild('tabListContainer'),
    __metadata("design:type", ElementRef)
], McTabHeader.prototype, "tabListContainer", void 0);
__decorate([
    ViewChild('tabList'),
    __metadata("design:type", ElementRef)
], McTabHeader.prototype, "tabList", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], McTabHeader.prototype, "selectFocusedIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], McTabHeader.prototype, "indexFocused", void 0);
McTabHeader = __decorate([
    Component({
        selector: 'mc-tab-header',
        template: "<div class=\"mc-tab-header__pagination mc-tab-header__pagination_before mc-elevation-z4\" aria-hidden=\"true\" [class.mc-tab-header_disabled]=\"disableScrollBefore\" (click)=\"scrollHeader('before')\"><div class=\"mc-tab-header__pagination-chevron\"></div></div><div class=\"mc-tab-header__content\" #tabListContainer (keydown)=\"handleKeydown($event)\"><div class=\"mc-tab-list\" #tabList role=\"tablist\" (cdkObserveContent)=\"onContentChanges()\"><div class=\"mc-tab-list__content\"><ng-content></ng-content></div></div></div><div class=\"mc-tab-header__pagination mc-tab-header__pagination_after mc-elevation-z4\" aria-hidden=\"true\" [class.mc-tab-header_disabled]=\"disableScrollAfter\" (click)=\"scrollHeader('after')\"><div class=\"mc-tab-header__pagination-chevron\"></div></div>",
        styles: [".mc-tab-header{display:flex}.mc-tab-header__pagination{position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2}.mc-tab-header__pagination .mc-tab-header__pagination-controls_enabled{display:flex}.mc-tab-header__pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:\"\";height:8px;width:8px}.mc-tab-header__pagination_after,.mc-tab-header_rtl .mc-tab-header__pagination_before{padding-right:4px}.mc-tab-header__pagination_after .mc-tab-header__pagination-chevron,.mc-tab-header_rtl .mc-tab-header__pagination_before .mc-tab-header__pagination-chevron{transform:rotate(45deg)}.mc-tab-header__pagination_before,.mc-tab-header_rtl .mc-tab-header__pagination_after{padding-left:4px}.mc-tab-header__pagination_before .mc-tab-header__pagination-chevron,.mc-tab-header_rtl .mc-tab-header__pagination_after .mc-tab-header__pagination-chevron{transform:rotate(-135deg)}.mc-tab-header_disabled{box-shadow:none;cursor:default}.mc-tab-header__content{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mc-tab-list{flex-grow:1;position:relative;transition:transform .5s cubic-bezier(.35,0,.25,1)}.mc-tab-list__content{display:flex}.mc-tab-group_align-labels-center .mc-tab-list__content{justify-content:center}.mc-tab-group_align-labels-end .mc-tab-list__content{justify-content:flex-end}.mc-tab-group_stretch-labels .mc-tab-label{flex-basis:0;flex-grow:1}"],
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        host: {
            class: 'mc-tab-header',
            '[class.mc-tab-header__pagination-controls_enabled]': 'showPaginationControls',
            '[class.mc-tab-header_rtl]': 'getLayoutDirection() == \'rtl\''
        }
    }),
    __param(3, Optional()),
    __metadata("design:paramtypes", [ElementRef,
        ChangeDetectorRef,
        ViewportRuler,
        Directionality,
        NgZone])
], McTabHeader);

let McLightTabsCssStyler = class McLightTabsCssStyler {
};
McLightTabsCssStyler = __decorate([
    Directive({
        selector: 'mc-tab-group[mc-light-tabs], [mc-tab-nav-bar][mc-light-tabs]',
        host: { class: 'mc-tab-group_light' }
    })
], McLightTabsCssStyler);
let McAlignTabsCenterCssStyler = class McAlignTabsCenterCssStyler {
};
McAlignTabsCenterCssStyler = __decorate([
    Directive({
        selector: 'mc-tab-group[mc-align-tabs-center], [mc-tab-nav-bar][mc-align-tabs-center]',
        host: { class: 'mc-tab-group_align-labels-center' }
    })
], McAlignTabsCenterCssStyler);
let McAlignTabsEndCssStyler = class McAlignTabsEndCssStyler {
};
McAlignTabsEndCssStyler = __decorate([
    Directive({
        selector: 'mc-tab-group[mc-align-tabs-end], [mc-tab-nav-bar][mc-align-tabs-end]',
        host: { class: 'mc-tab-group_align-labels-end' }
    })
], McAlignTabsEndCssStyler);
let McStretchTabsCssStyler = class McStretchTabsCssStyler {
};
McStretchTabsCssStyler = __decorate([
    Directive({
        selector: 'mc-tab-group[mc-stretch-tabs], [mc-tab-nav-bar][mc-stretch-tabs]',
        host: { class: 'mc-tab-group_stretch-labels' }
    })
], McStretchTabsCssStyler);
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
const mcTabGroupMixinBase = mixinColor(mixinDisabled(McTabGroupBase));
/**
 * Tab-group component.  Supports basic tab pairs (label + content) and includes
 * keyboard navigation.
 */
let McTabGroup = class McTabGroup extends mcTabGroupMixinBase {
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
};
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], McTabGroup.prototype, "dynamicHeight", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], McTabGroup.prototype, "selectedIndex", null);
__decorate([
    ContentChildren(McTab),
    __metadata("design:type", QueryList)
], McTabGroup.prototype, "tabs", void 0);
__decorate([
    ViewChild('tabBodyWrapper'),
    __metadata("design:type", ElementRef)
], McTabGroup.prototype, "tabBodyWrapper", void 0);
__decorate([
    ViewChild('tabHeader'),
    __metadata("design:type", McTabHeader)
], McTabGroup.prototype, "tabHeader", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], McTabGroup.prototype, "headerPosition", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], McTabGroup.prototype, "animationDuration", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], McTabGroup.prototype, "selectedIndexChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], McTabGroup.prototype, "focusChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], McTabGroup.prototype, "animationDone", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], McTabGroup.prototype, "selectedTabChange", void 0);
McTabGroup = __decorate([
    Component({
        selector: 'mc-tab-group',
        exportAs: 'mcTabGroup',
        template: "<mc-tab-header #tabHeader [selectedIndex]=\"selectedIndex\" (indexFocused)=\"focusChanged($event)\" (selectFocusedIndex)=\"selectedIndex = $event\"><div role=\"tab\" mcTabLabelWrapper cdkMonitorElementFocus [class.mc-tab-label]=\"!lightTab\" [class.mc-tab-light-label]=\"lightTab\" *ngFor=\"let tab of tabs; let i = index\" [id]=\"getTabLabelId(i)\" [attr.tabIndex]=\"getTabIndex(tab, i)\" [attr.aria-posinset]=\"i + 1\" [attr.aria-setsize]=\"tabs.length\" [attr.aria-controls]=\"getTabContentId(i)\" [attr.aria-selected]=\"selectedIndex == i\" [attr.aria-label]=\"tab.ariaLabel || null\" [attr.aria-labelledby]=\"(!tab.ariaLabel && tab.ariaLabelledby) ? tab.ariaLabelledby : null\" [class.mc-active]=\"selectedIndex == i\" [disabled]=\"tab.disabled\" (click)=\"handleClick(tab, tabHeader, i)\"><div class=\"mc-tab-label__content\"><ng-template [ngIf]=\"tab.templateLabel\"><ng-template [cdkPortalOutlet]=\"tab.templateLabel\"></ng-template></ng-template><ng-template [ngIf]=\"!tab.templateLabel\">{{tab.textLabel}}</ng-template></div><div class=\"mc-tab-overlay\"></div></div></mc-tab-header><div class=\"mc-tab-body__wrapper\" #tabBodyWrapper><mc-tab-body role=\"tabpanel\" *ngFor=\"let tab of tabs; let i = index\" [id]=\"getTabContentId(i)\" [attr.aria-labelledby]=\"getTabLabelId(i)\" [class.mc-tab-body__active]=\"selectedIndex == i\" [content]=\"tab.content\" [position]=\"tab.position\" [origin]=\"tab.origin\" [animationDuration]=\"animationDuration\" (onCentered)=\"removeTabBodyWrapperHeight()\" (onCentering)=\"setTabBodyWrapperHeight($event)\"></mc-tab-body></div>",
        styles: [".mc-tab-label.cdk-keyboard-focused:after,.mc-tab-light-label.cdk-keyboard-focused:after,.mc-tab-light-label.mc-active:before,.mc-tab-light-label:hover:before{display:block;position:absolute;content:\"\"}.mc-tab-light-label.mc-active:before,.mc-tab-light-label:hover:before{bottom:-1px;left:0;height:4px;right:0}.mc-tab-group{display:flex;flex-direction:column;box-sizing:border-box;text-align:center;white-space:nowrap}.mc-tab-group.mc-tab-group_inverted-header{flex-direction:column-reverse}.mc-tab-label{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:40px;text-align:center;white-space:nowrap;cursor:pointer;padding-right:16px;padding-left:16px;outline:0;border-bottom-width:1px;border-bottom-style:solid;border-top-width:1px;border-top-style:solid;border-top-left-radius:3px;border-top-right-radius:3px}.mc-tab-label.cdk-keyboard-focused{z-index:1}.mc-tab-label.cdk-keyboard-focused:after{top:-2px;right:-1px;bottom:-1px;left:-1px;border-width:2px;border-style:solid;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom:none}.mc-tab-label.mc-disabled{pointer-events:none}.mc-tab-label .mc-tab-overlay{position:absolute;top:-1px;left:0;right:0;bottom:0;pointer-events:none}.mc-tab-label.mc-active{padding-right:15px;padding-left:15px;border-width:1px;border-style:solid}.mc-tab-label.mc-active.cdk-keyboard-focused:after{z-index:1;right:-2px;left:-2px}.mc-tab-label .mc-tab-overlay{border-top-width:1px;border-top-style:solid;border-top-color:transparent;border-top-left-radius:3px;border-top-right-radius:3px}.mc-tab-light-label{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:40px;text-align:center;white-space:nowrap;cursor:pointer;padding-right:16px;padding-left:16px;outline:0;border-bottom-width:1px;border-bottom-style:solid}.mc-tab-light-label.cdk-keyboard-focused{z-index:1}.mc-tab-light-label.cdk-keyboard-focused:after{top:-2px;right:-1px;bottom:-1px;left:-1px;border-width:2px;border-style:solid;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom:none}.mc-tab-light-label.mc-disabled{pointer-events:none}.mc-tab-light-label .mc-tab-overlay{position:absolute;top:-1px;left:0;right:0;bottom:0;pointer-events:none}.mc-tab-light-label.cdk-keyboard-focused+:hover:before{left:1px}.mc-tab-light-label.cdk-keyboard-focused:after{top:-1px}.mc-tab-light-label .mc-tab-overlay{position:absolute;top:0}.mc-tab-header__content{padding:1px 1px 0 1px}.mc-tab-body__wrapper{display:flex;overflow:hidden;position:relative}.mc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;flex-basis:100%}.mc-tab-body.mc-tab-body__active{overflow-x:hidden;overflow-y:auto;position:relative;z-index:1;flex-grow:1}.mc-tab-group.mc-tab-group_dynamic-height .mc-tab-body.mc-tab-body__active{overflow-y:hidden}"],
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        inputs: ['color'],
        host: {
            class: 'mc-tab-group',
            '[class.mc-tab-group_dynamic-height]': 'dynamicHeight',
            '[class.mc-tab-group_inverted-header]': 'headerPosition === "below"'
        }
    }),
    __param(2, Attribute('mc-light-tabs')),
    __param(3, Inject(MC_TABS_CONFIG)), __param(3, Optional()),
    __metadata("design:paramtypes", [ElementRef,
        ChangeDetectorRef, String, Object])
], McTabGroup);

// Boilerplate for applying mixins to McTabNav.
/** @docs-private */
class McTabNavBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const mcTabNavMixinBase = mixinColor(McTabNavBase);
/**
 * Navigation component matching the styles of the tab group header.
 */
let McTabNav = class McTabNav extends mcTabNavMixinBase {
    constructor(elementRef) {
        super(elementRef);
    }
};
McTabNav = __decorate([
    Component({
        selector: '[mc-tab-nav-bar]',
        exportAs: 'mcTabNavBar, mcTabNav',
        inputs: ['color'],
        template: "<div class=\"mc-tab-links\"><ng-content></ng-content></div>",
        styles: [".mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-active:before,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link:hover:before,.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused:after{display:block;position:absolute;content:\"\"}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-active:before,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link:hover:before{bottom:-1px;left:0;height:4px;right:0}.mc-tab-link{vertical-align:top;text-decoration:none;-webkit-tap-highlight-color:transparent}.mc-tab-group_stretch-labels .mc-tab-link{flex-basis:0;flex-grow:1}.mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar{display:flex}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:40px;text-align:center;white-space:nowrap;cursor:pointer;padding-right:16px;padding-left:16px;outline:0;border-bottom-width:1px;border-bottom-style:solid;border-top-width:1px;border-top-style:solid;border-top-left-radius:3px;border-top-right-radius:3px}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused{z-index:1}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused:after{top:-2px;right:-1px;bottom:-1px;left:-1px;border-width:2px;border-style:solid;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom:none}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link .mc-tab-overlay{position:absolute;top:-1px;left:0;right:0;bottom:0;pointer-events:none}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-active{padding-right:15px;padding-left:15px;border-width:1px;border-style:solid}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-active.cdk-keyboard-focused:after{z-index:1;right:-2px;left:-2px}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link .mc-tab-overlay{border-top-width:1px;border-top-style:solid;border-top-color:transparent;border-top-left-radius:3px;border-top-right-radius:3px}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:40px;text-align:center;white-space:nowrap;cursor:pointer;padding-right:16px;padding-left:16px;outline:0;border-bottom-width:1px;border-bottom-style:solid}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused{z-index:1}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after{top:-2px;right:-1px;bottom:-1px;left:-1px;border-width:2px;border-style:solid;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom:none}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link .mc-tab-overlay{position:absolute;top:-1px;left:0;right:0;bottom:0;pointer-events:none}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused+:hover:before{left:1px}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after{top:-1px}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link .mc-tab-overlay{position:absolute;top:0}.mc-tab-links{display:flex;position:relative;padding:1px 1px 0 1px;flex-grow:1}.mc-tab-links .mc-tab-group_align-labels-center{justify-content:center}.mc-tab-links .mc-tab-group_align-labels-end{justify-content:flex-end}"],
        host: { class: 'mc-tab-nav-bar' },
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [ElementRef])
], McTabNav);
// Boilerplate for applying mixins to McTabLink.
class McTabLinkBase {
}
const mcTabLinkMixinBase = mixinTabIndex(mixinDisabled(McTabLinkBase));
/**
 * Link inside of a `mc-tab-nav-bar`.
 */
let McTabLink = class McTabLink extends mcTabLinkMixinBase {
    constructor(elementRef, tabIndex, focusMonitor) {
        super();
        this.elementRef = elementRef;
        this.focusMonitor = focusMonitor;
        /** Whether the tab link is active or not. */
        this.isActive = false;
        this.tabIndex = parseInt(tabIndex) || 0;
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
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], McTabLink.prototype, "active", null);
McTabLink = __decorate([
    Directive({
        selector: '[mc-tab-link], [mcTabLink]',
        exportAs: 'mcTabLink',
        inputs: ['disabled', 'tabIndex'],
        host: {
            class: 'mc-tab-link',
            '[attr.aria-current]': 'active',
            '[attr.aria-disabled]': 'disabled.toString()',
            '[attr.tabIndex]': 'tabIndex',
            '[class.mc-disabled]': 'disabled',
            '[class.mc-active]': 'active'
        }
    }),
    __param(1, Attribute('tabindex')),
    __metadata("design:paramtypes", [ElementRef, String, FocusMonitor])
], McTabLink);

let McTabsModule = class McTabsModule {
};
McTabsModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            McCommonModule,
            PortalModule,
            A11yModule,
            BrowserAnimationsModule
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
            McLightTabsCssStyler,
            McAlignTabsCenterCssStyler,
            McAlignTabsEndCssStyler,
            McStretchTabsCssStyler
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
            McLightTabsCssStyler,
            McAlignTabsCenterCssStyler,
            McAlignTabsEndCssStyler,
            McStretchTabsCssStyler
        ]
    })
], McTabsModule);

/**
 * Generated bundle index. Do not edit.
 */

export { McTabBase as ɵd15, mcTabMixinBase as ɵe15, McTabHeaderBase as ɵa15, McTabLabelWrapperBase as ɵb15, mcTabLabelWrapperMixinBase as ɵc15, McTabLinkBase as ɵh15, McTabNavBase as ɵf15, mcTabLinkMixinBase as ɵi15, mcTabNavMixinBase as ɵg15, McTabBody, McTabBodyPortal, McTabHeader, McTabLabelWrapper, McTab, McTabLabel, McTabNav, McTabLink, McTabContent, McTabsModule, McLightTabsCssStyler, McAlignTabsCenterCssStyler, McAlignTabsEndCssStyler, McStretchTabsCssStyler, McTabChangeEvent, MC_TABS_CONFIG, McTabGroupBase, mcTabGroupMixinBase, McTabGroup, mcTabsAnimations };
//# sourceMappingURL=tabs.js.map
