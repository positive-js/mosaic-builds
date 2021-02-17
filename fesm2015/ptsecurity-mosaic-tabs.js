import { FocusMonitor, A11yModule } from '@angular/cdk/a11y';
import { CdkPortal, TemplatePortal, CdkPortalOutlet, PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { Directive, TemplateRef, Component, ChangeDetectionStrategy, ViewEncapsulation, ViewContainerRef, ContentChild, ViewChild, Input, EventEmitter, ElementRef, Optional, ChangeDetectorRef, Output, ComponentFactoryResolver, Inject, forwardRef, NgZone, ContentChildren, InjectionToken, Attribute, NgModule } from '@angular/core';
import { mixinDisabled, mixinColor, mixinTabIndex, McCommonModule } from '@ptsecurity/mosaic/core';
import { Subject, Subscription, of, merge } from 'rxjs';
import { Directionality } from '@angular/cdk/bidi';
import { startWith, takeUntil } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { SPACE, ENTER, END, HOME } from '@ptsecurity/cdk/keycodes';

/**
 * @fileoverview added by tsickle
 * Generated from: tab-content.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Decorates the `ng-template` tags and reads out the template from it.
 */
class McTabContent {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
McTabContent.decorators = [
    { type: Directive, args: [{ selector: '[mcTabContent]' },] }
];
/** @nocollapse */
McTabContent.ctorParameters = () => [
    { type: TemplateRef }
];
if (false) {
    /** @type {?} */
    McTabContent.prototype.template;
}

/**
 * @fileoverview added by tsickle
 * Generated from: tab-label.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Used to flag tab labels for use with the portal directive
 */
class McTabLabel extends CdkPortal {
}
McTabLabel.decorators = [
    { type: Directive, args: [{
                selector: '[mc-tab-label], [mcTabLabel]'
            },] }
];
// TODO: workaround for https://github.com/angular/material2/issues/12760
((/** @type {?} */ (McTabLabel))).ctorParameters = (/**
 * @return {?}
 */
() => ((/** @type {?} */ (CdkPortal))).ctorParameters);

/**
 * @fileoverview added by tsickle
 * Generated from: tab.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McTabBase {
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
const McTabMixinBase = mixinDisabled(McTabBase);
class McTab extends McTabMixinBase {
    /**
     * @param {?} viewContainerRef
     */
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        /**
         * Plain text label for the tab, used when there is no template label.
         */
        this.textLabel = '';
        /**
         * Emits whenever the internal state of the tab changes.
         */
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
        /**
         * Portal that will be the hosted content of the tab
         */
        this.contentPortal = null;
    }
    /**
     * \@docs-private
     * @return {?}
     */
    get content() {
        return this.contentPortal;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.hasOwnProperty('textLabel') || changes.hasOwnProperty('disabled')) {
            this.stateChanges.next();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stateChanges.complete();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.contentPortal = new TemplatePortal(this.explicitContent || this.implicitContent, this.viewContainerRef);
    }
}
McTab.decorators = [
    { type: Component, args: [{
                selector: 'mc-tab',
                // Create a template for the content of the <mc-tab> so that we can grab a reference to this
                // TemplateRef and use it in a Portal to render the tab content in the appropriate place in the
                // tab-group.
                template: '<ng-template><ng-content></ng-content></ng-template>',
                inputs: ['disabled'],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                exportAs: 'mcTab'
            }] }
];
/** @nocollapse */
McTab.ctorParameters = () => [
    { type: ViewContainerRef }
];
McTab.propDecorators = {
    templateLabel: [{ type: ContentChild, args: [McTabLabel, { static: false },] }],
    explicitContent: [{ type: ContentChild, args: [McTabContent, { read: TemplateRef, static: true },] }],
    implicitContent: [{ type: ViewChild, args: [TemplateRef, { static: true },] }],
    textLabel: [{ type: Input, args: ['label',] }],
    tabId: [{ type: Input, args: ['tabId',] }],
    ariaLabel: [{ type: Input, args: ['aria-label',] }],
    ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }]
};
if (false) {
    /**
     * Content for the tab label given by `<ng-template mc-tab-label>`.
     * @type {?}
     */
    McTab.prototype.templateLabel;
    /**
     * Template provided in the tab content that will be used if present, used to enable lazy-loading
     * @type {?}
     */
    McTab.prototype.explicitContent;
    /**
     * Template inside the McTab view that contains an `<ng-content>`.
     * @type {?}
     */
    McTab.prototype.implicitContent;
    /**
     * Plain text label for the tab, used when there is no template label.
     * @type {?}
     */
    McTab.prototype.textLabel;
    /** @type {?} */
    McTab.prototype.tabId;
    /**
     * Aria label for the tab.
     * @type {?}
     */
    McTab.prototype.ariaLabel;
    /**
     * Reference to the element that the tab is labelled by.
     * Will be cleared if `aria-label` is set at the same time.
     * @type {?}
     */
    McTab.prototype.ariaLabelledby;
    /**
     * Emits whenever the internal state of the tab changes.
     * @type {?}
     */
    McTab.prototype.stateChanges;
    /**
     * The relatively indexed position where 0 represents the center, negative is left, and positive
     * represents the right.
     * @type {?}
     */
    McTab.prototype.position;
    /**
     * The initial relatively index origin of the tab if it was created and selected after there
     * was already a selected tab. Provides context of what position the tab should originate from.
     * @type {?}
     */
    McTab.prototype.origin;
    /**
     * Whether the tab is currently active.
     * @type {?}
     */
    McTab.prototype.isActive;
    /**
     * Portal that will be the hosted content of the tab
     * @type {?}
     * @private
     */
    McTab.prototype.contentPortal;
    /**
     * @type {?}
     * @private
     */
    McTab.prototype.viewContainerRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: tabs-animations.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const mcTabsAnimations = {
    /**
     * Animation translates a tab along the X axis.
     */
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
 * @fileoverview added by tsickle
 * Generated from: tab-body.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Wrapper for the contents of a tab.
 * \@docs-private
 */
class McTabBody {
    /**
     * @param {?} elementRef
     * @param {?} dir
     * @param {?} changeDetectorRef
     */
    constructor(elementRef, dir, changeDetectorRef) {
        this.elementRef = elementRef;
        this.dir = dir;
        /**
         * Event emitted when the tab begins to animate towards the center as the active tab.
         */
        this.onCentering = new EventEmitter();
        /**
         * Event emitted before the centering of the tab begins.
         */
        this.beforeCentering = new EventEmitter();
        /**
         * Event emitted before the centering of the tab begins.
         */
        this.afterLeavingCenter = new EventEmitter();
        /**
         * Event emitted when the tab completes its animation towards the center.
         */
        this.onCentered = new EventEmitter(true);
        // Note that the default value will always be overwritten by `McTabBody`, but we need one
        // anyway to prevent the animations module from throwing an error if the body is used on its own.
        /**
         * Duration for the tab's animation.
         */
        this.animationDuration = '0ms';
        /**
         * Subscription to the directionality change observable.
         */
        this.dirChangeSubscription = Subscription.EMPTY;
        if (this.dir && changeDetectorRef) {
            this.dirChangeSubscription = this.dir.change
                .subscribe((/**
             * @param {?} direction
             * @return {?}
             */
            (direction) => {
                this.computePositionAnimationState(direction);
                changeDetectorRef.markForCheck();
            }));
        }
    }
    /**
     * The shifted index position of the tab body, where zero represents the active center tab.
     * @param {?} position
     * @return {?}
     */
    set position(position) {
        this.positionIndex = position;
        this.computePositionAnimationState();
    }
    /**
     * After initialized, check if the content is centered and has an origin. If so, set the
     * special position states that transition the tab from the left or right before centering.
     * @return {?}
     */
    ngOnInit() {
        if (this.bodyPosition === 'center' && this.origin != null) {
            this.bodyPosition = this.computePositionFromOrigin();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.dirChangeSubscription.unsubscribe();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onTranslateTabStarted(e) {
        /** @type {?} */
        const isCentering = this.isCenterPosition(e.toState);
        this.beforeCentering.emit(isCentering);
        if (isCentering) {
            this.onCentering.emit(this.elementRef.nativeElement.clientHeight);
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onTranslateTabComplete(e) {
        // If the transition to the center is complete, emit an event.
        if (this.isCenterPosition(e.toState) && this.isCenterPosition(this.bodyPosition)) {
            this.onCentered.emit();
        }
        if (this.isCenterPosition(e.fromState) && !this.isCenterPosition(this.bodyPosition)) {
            this.afterLeavingCenter.emit();
        }
    }
    /**
     * The text direction of the containing app.
     * @return {?}
     */
    getLayoutDirection() {
        return this.dir && this.dir.value === 'rtl' ? 'rtl' : 'ltr';
    }
    /**
     * Whether the provided position state is considered center, regardless of origin.
     * @param {?} position
     * @return {?}
     */
    isCenterPosition(position) {
        return position === 'center' || position === 'left-origin-center' || position === 'right-origin-center';
    }
    /**
     * Computes the position state that will be used for the tab-body animation trigger.
     * @private
     * @param {?=} dir
     * @return {?}
     */
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
     * @private
     * @return {?}
     */
    computePositionFromOrigin() {
        /** @type {?} */
        const dir = this.getLayoutDirection();
        if ((dir === 'ltr' && this.origin <= 0) || (dir === 'rtl' && this.origin > 0)) {
            return 'left-origin-center';
        }
        return 'right-origin-center';
    }
}
McTabBody.decorators = [
    { type: Component, args: [{
                selector: 'mc-tab-body',
                template: "<div class=\"mc-tab-body__content\"\n     #content\n     [@translateTab]=\"{\n        value: bodyPosition,\n        params: {animationDuration: animationDuration}\n     }\"\n     (@translateTab.start)=\"onTranslateTabStarted($event)\"\n     (@translateTab.done)=\"onTranslateTabComplete($event)\">\n    <ng-template mcTabBodyHost></ng-template>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [mcTabsAnimations.translateTab],
                host: {
                    class: 'mc-tab-body'
                },
                styles: [".mc-tab-body__content{height:100%;overflow:auto}.mc-tab-body__content .mc-tab-group_dynamic-height{overflow:hidden}"]
            }] }
];
/** @nocollapse */
McTabBody.ctorParameters = () => [
    { type: ElementRef },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef }
];
McTabBody.propDecorators = {
    position: [{ type: Input }],
    onCentering: [{ type: Output }],
    beforeCentering: [{ type: Output }],
    afterLeavingCenter: [{ type: Output }],
    onCentered: [{ type: Output }],
    portalHost: [{ type: ViewChild, args: [CdkPortalOutlet, { static: false },] }],
    content: [{ type: Input, args: ['content',] }],
    origin: [{ type: Input }],
    animationDuration: [{ type: Input }]
};
if (false) {
    /**
     * Tab body position state. Used by the animation trigger for the current state.
     * @type {?}
     */
    McTabBody.prototype.bodyPosition;
    /**
     * Event emitted when the tab begins to animate towards the center as the active tab.
     * @type {?}
     */
    McTabBody.prototype.onCentering;
    /**
     * Event emitted before the centering of the tab begins.
     * @type {?}
     */
    McTabBody.prototype.beforeCentering;
    /**
     * Event emitted before the centering of the tab begins.
     * @type {?}
     */
    McTabBody.prototype.afterLeavingCenter;
    /**
     * Event emitted when the tab completes its animation towards the center.
     * @type {?}
     */
    McTabBody.prototype.onCentered;
    /**
     * The portal host inside of this container into which the tab body content will be loaded.
     * @type {?}
     */
    McTabBody.prototype.portalHost;
    /**
     * The tab body content to display.
     * @type {?}
     */
    McTabBody.prototype.content;
    /**
     * Position that will be used when the tab is immediately becoming visible after creation.
     * @type {?}
     */
    McTabBody.prototype.origin;
    /**
     * Duration for the tab's animation.
     * @type {?}
     */
    McTabBody.prototype.animationDuration;
    /**
     * Current position of the tab-body in the tab-group. Zero means that the tab is visible.
     * @type {?}
     * @private
     */
    McTabBody.prototype.positionIndex;
    /**
     * Subscription to the directionality change observable.
     * @type {?}
     * @private
     */
    McTabBody.prototype.dirChangeSubscription;
    /**
     * @type {?}
     * @private
     */
    McTabBody.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    McTabBody.prototype.dir;
}
/**
 * The portal host directive for the contents of the tab.
 * \@docs-private
 */
class McTabBodyPortal extends CdkPortalOutlet {
    /**
     * @param {?} componentFactoryResolver
     * @param {?} viewContainerRef
     * @param {?} host
     */
    constructor(componentFactoryResolver, viewContainerRef, host) {
        super(componentFactoryResolver, viewContainerRef);
        this.host = host;
        /**
         * Subscription to events for when the tab body begins centering.
         */
        this.centeringSub = Subscription.EMPTY;
        /**
         * Subscription to events for when the tab body finishes leaving from center position.
         */
        this.leavingSub = Subscription.EMPTY;
    }
    /**
     * Set initial visibility or set up subscription for changing visibility.
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.centeringSub = this.host.beforeCentering
            .pipe(startWith(this.host.isCenterPosition(this.host.bodyPosition)))
            .subscribe((/**
         * @param {?} isCentering
         * @return {?}
         */
        (isCentering) => {
            if (isCentering && !this.hasAttached()) {
                this.attach(this.host.content);
            }
        }));
        this.leavingSub = this.host.afterLeavingCenter.subscribe((/**
         * @return {?}
         */
        () => {
            this.detach();
        }));
    }
    /**
     * Clean up centering subscription.
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this.centeringSub.unsubscribe();
        this.leavingSub.unsubscribe();
    }
}
McTabBodyPortal.decorators = [
    { type: Directive, args: [{
                selector: '[mcTabBodyHost]'
            },] }
];
/** @nocollapse */
McTabBodyPortal.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ViewContainerRef },
    { type: McTabBody, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => McTabBody)),] }] }
];
if (false) {
    /**
     * Subscription to events for when the tab body begins centering.
     * @type {?}
     * @private
     */
    McTabBodyPortal.prototype.centeringSub;
    /**
     * Subscription to events for when the tab body finishes leaving from center position.
     * @type {?}
     * @private
     */
    McTabBodyPortal.prototype.leavingSub;
    /**
     * @type {?}
     * @private
     */
    McTabBodyPortal.prototype.host;
}

/**
 * @fileoverview added by tsickle
 * Generated from: tab-label-wrapper.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Boilerplate for applying mixins to McTabLabelWrapper.
/**
 * \@docs-private
 */
class McTabLabelWrapperBase {
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
const McTabLabelWrapperMixinBase = mixinDisabled(McTabLabelWrapperBase);
/**
 * Used in the `mc-tab-group` view to display tab labels.
 * \@docs-private
 */
class McTabLabelWrapper extends McTabLabelWrapperMixinBase {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super();
        this.elementRef = elementRef;
    }
    /**
     * Sets focus on the wrapper element
     * @return {?}
     */
    focus() {
        this.elementRef.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    getOffsetLeft() {
        return this.elementRef.nativeElement.offsetLeft;
    }
    /**
     * @return {?}
     */
    getOffsetWidth() {
        return this.elementRef.nativeElement.offsetWidth;
    }
}
McTabLabelWrapper.decorators = [
    { type: Directive, args: [{
                selector: '[mcTabLabelWrapper]',
                inputs: ['disabled'],
                host: {
                    '[class.mc-disabled]': 'disabled',
                    '[attr.aria-disabled]': '!!disabled'
                }
            },] }
];
/** @nocollapse */
McTabLabelWrapper.ctorParameters = () => [
    { type: ElementRef }
];
if (false) {
    /** @type {?} */
    McTabLabelWrapper.prototype.elementRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: tab-header.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
class McTabHeaderBase {
}
/**
 * The header of the tab group which displays a list of all the tabs in the tab group.
 * When the tabs list's width exceeds the width of the header container,
 * then arrows will be displayed to allow the user to scroll
 * left and right across the header.
 * \@docs-private
 */
class McTabHeader extends McTabHeaderBase {
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
        const dirChange = this.dir ? this.dir.change : of(null);
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
                styles: [".mc-tab-header{display:flex}.mc-tab-header__pagination{align-items:center;cursor:pointer;display:none;justify-content:center;min-width:32px;position:relative;z-index:2}.mc-tab-header__pagination .mc-tab-header__pagination-controls_enabled{display:flex}.mc-tab-header__pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:\"\";height:8px;width:8px}.mc-tab-header__pagination_after,.mc-tab-header_rtl .mc-tab-header__pagination_before{padding-right:4px}.mc-tab-header__pagination_after .mc-tab-header__pagination-chevron,.mc-tab-header_rtl .mc-tab-header__pagination_before .mc-tab-header__pagination-chevron{transform:rotate(45deg)}.mc-tab-header__pagination_before,.mc-tab-header_rtl .mc-tab-header__pagination_after{padding-left:4px}.mc-tab-header__pagination_before .mc-tab-header__pagination-chevron,.mc-tab-header_rtl .mc-tab-header__pagination_after .mc-tab-header__pagination-chevron{transform:rotate(-135deg)}.mc-tab-header_disabled{box-shadow:none;cursor:default}.mc-tab-header__content{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mc-tab-list{flex-grow:1;position:relative;transition:transform .5s cubic-bezier(.35,0,.25,1)}.mc-tab-list__content{display:flex}.mc-tab-group_align-labels-center .mc-tab-list__content{justify-content:center}.mc-tab-group_align-labels-end .mc-tab-list__content{justify-content:flex-end}.mc-tab-group_stretch-labels .mc-tab-label,.mc-tab-group_stretch-labels .mc-tab-light-label{flex-basis:0;flex-grow:1}"]
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

/**
 * @fileoverview added by tsickle
 * Generated from: tab-group.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McLightTabsCssStyler {
}
McLightTabsCssStyler.decorators = [
    { type: Directive, args: [{
                selector: 'mc-tab-group[mc-light-tabs], [mc-tab-nav-bar][mc-light-tabs]',
                host: { class: 'mc-tab-group_light' }
            },] }
];
class McAlignTabsCenterCssStyler {
}
McAlignTabsCenterCssStyler.decorators = [
    { type: Directive, args: [{
                selector: 'mc-tab-group[mc-align-tabs-center], [mc-tab-nav-bar][mc-align-tabs-center]',
                host: { class: 'mc-tab-group_align-labels-center' }
            },] }
];
class McAlignTabsEndCssStyler {
}
McAlignTabsEndCssStyler.decorators = [
    { type: Directive, args: [{
                selector: 'mc-tab-group[mc-align-tabs-end], [mc-tab-nav-bar][mc-align-tabs-end]',
                host: { class: 'mc-tab-group_align-labels-end' }
            },] }
];
class McStretchTabsCssStyler {
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
class McTabChangeEvent {
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
function IMcTabsConfig() { }
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
const MC_TABS_CONFIG = new InjectionToken('MC_TABS_CONFIG');
// Boilerplate for applying mixins to McTabGroup.
/**
 * \@docs-private
 */
class McTabGroupBase {
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
const McTabGroupMixinBase = mixinColor(mixinDisabled(McTabGroupBase));
/**
 * Tab-group component.  Supports basic tab pairs (label + content) and includes
 * keyboard navigation.
 */
class McTabGroup extends McTabGroupMixinBase {
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

/**
 * @fileoverview added by tsickle
 * Generated from: tab-nav-bar/tab-nav-bar.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Boilerplate for applying mixins to McTabNav.
/**
 * \@docs-private
 */
class McTabNavBase {
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
    McTabNavBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
const McTabNavMixinBase = mixinColor(McTabNavBase);
/**
 * Navigation component matching the styles of the tab group header.
 */
class McTabNav extends McTabNavMixinBase {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
    }
}
McTabNav.decorators = [
    { type: Component, args: [{
                selector: '[mc-tab-nav-bar]',
                exportAs: 'mcTabNavBar, mcTabNav',
                inputs: ['color'],
                template: "<div class=\"mc-tab-links\">\n    <ng-content></ng-content>\n</div>\n",
                host: { class: 'mc-tab-nav-bar' },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-active:before,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link:hover:before,.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused:after{content:\"\";display:block;position:absolute}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-active:before,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link:hover:before{bottom:calc(var(--mc-tabs-size-border-width, 1px)*-1);height:var(--mc-tabs-size-highlight-height,4px);left:0;right:0}.mc-tab-link{-webkit-tap-highlight-color:transparent;text-decoration:none;vertical-align:top}.mc-tab-group_stretch-labels .mc-tab-link{flex-basis:0;flex-grow:1}.mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar{display:flex}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link{align-items:center;border-bottom-style:solid;border-bottom-width:var(--mc-tabs-size-border-width,1px);border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px);border-top-style:solid;border-top-width:var(--mc-tabs-size-border-width,1px);box-sizing:border-box;cursor:pointer;display:inline-flex;height:var(--mc-tabs-size-height,40px);justify-content:center;outline:none;padding-left:var(--mc-tabs-size-padding-horizontal,16px);padding-right:var(--mc-tabs-size-padding-horizontal,16px);position:relative;text-align:center;white-space:nowrap}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused{z-index:1}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused:after{border-bottom:none;border-style:solid;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px);border-width:calc(var(--mc-tabs-size-border-width, $tabs-size-border-width)*2);bottom:calc(var(--mc-tabs-size-border-width, 1px)*-1);left:calc(var(--mc-tabs-size-border-width, 1px)*-1);right:calc(var(--mc-tabs-size-border-width, 1px)*-1);top:-calc(var(--mc-tabs-size-border-width,$tabs-size-border-width)*2)}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link .mc-tab-overlay{bottom:0;left:0;pointer-events:none;position:absolute;right:0;top:-1px}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-active{border-style:solid;border-width:var(--mc-tabs-size-border-width,1px);padding-left:calc(var(--mc-tabs-size-padding-horizontal, 16px) - var(--mc-tabs-size-border-width, 1px));padding-right:calc(var(--mc-tabs-size-padding-horizontal, 16px) - var(--mc-tabs-size-border-width, 1px))}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-active.cdk-keyboard-focused:after{left:-calc(var(--mc-tabs-size-border-width,$tabs-size-border-width)*2);right:-calc(var(--mc-tabs-size-border-width,$tabs-size-border-width)*2);z-index:1}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link .mc-tab-overlay{border-top:var(--mc-tabs-size-border-width,1px) solid transparent;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px)}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link{align-items:center;border-bottom-style:solid;border-bottom-width:var(--mc-tabs-size-border-width,1px);box-sizing:border-box;cursor:pointer;display:inline-flex;height:var(--mc-tabs-size-height,40px);justify-content:center;outline:none;padding-left:var(--mc-tabs-size-padding-horizontal,16px);padding-right:var(--mc-tabs-size-padding-horizontal,16px);position:relative;text-align:center;white-space:nowrap}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused{z-index:1}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after{border-bottom:none;border-style:solid;border-top-left-radius:var(--mc-tabs-size-border-radius,3px);border-top-right-radius:var(--mc-tabs-size-border-radius,3px);border-width:calc(var(--mc-tabs-size-border-width, $tabs-size-border-width)*2);bottom:calc(var(--mc-tabs-size-border-width, 1px)*-1);left:calc(var(--mc-tabs-size-border-width, 1px)*-1);right:calc(var(--mc-tabs-size-border-width, 1px)*-1);top:-calc(var(--mc-tabs-size-border-width,$tabs-size-border-width)*2)}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link .mc-tab-overlay{bottom:0;left:0;pointer-events:none;right:0;top:-1px}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused+:hover:before{left:calc(var(--mc-tabs-size-border-width, $tabs-size-border-width)*2 - var(--mc-tabs-size-border-width, 1px))}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after{top:calc(var(--mc-tabs-size-border-width, 1px)*-1)}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link .mc-tab-overlay{position:absolute;top:0}.mc-tab-links{display:flex;flex-grow:1;padding:1px 1px 0;position:relative}.mc-tab-links .mc-tab-group_align-labels-center{justify-content:center}.mc-tab-links .mc-tab-group_align-labels-end{justify-content:flex-end}"]
            }] }
];
/** @nocollapse */
McTabNav.ctorParameters = () => [
    { type: ElementRef }
];
// Boilerplate for applying mixins to McTabLink.
class McTabLinkBase {
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
const McTabLinkMixinBase = mixinTabIndex(mixinDisabled(McTabLinkBase));
/**
 * Link inside of a `mc-tab-nav-bar`.
 */
class McTabLink extends McTabLinkMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} focusMonitor
     */
    constructor(elementRef, focusMonitor) {
        super();
        this.elementRef = elementRef;
        this.focusMonitor = focusMonitor;
        /**
         * Whether the tab link is active or not.
         */
        this.isActive = false;
        this.focusMonitor.monitor(this.elementRef.nativeElement);
    }
    /**
     * Whether the link is active.
     * @return {?}
     */
    get active() {
        return this.isActive;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set active(value) {
        if (value !== this.isActive) {
            this.isActive = value;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }
}
McTabLink.decorators = [
    { type: Directive, args: [{
                selector: '[mc-tab-link], [mcTabLink]',
                exportAs: 'mcTabLink',
                inputs: ['disabled', 'tabIndex'],
                host: {
                    class: 'mc-tab-link',
                    '[attr.aria-current]': 'active',
                    '[attr.aria-disabled]': 'disabled.toString()',
                    '[attr.tabindex]': 'tabIndex',
                    '[class.mc-disabled]': 'disabled',
                    '[class.mc-active]': 'active'
                }
            },] }
];
/** @nocollapse */
McTabLink.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor }
];
McTabLink.propDecorators = {
    active: [{ type: Input }]
};
if (false) {
    /**
     * Whether the tab link is active or not.
     * @type {?}
     * @protected
     */
    McTabLink.prototype.isActive;
    /** @type {?} */
    McTabLink.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    McTabLink.prototype.focusMonitor;
}

/**
 * @fileoverview added by tsickle
 * Generated from: tabs.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McTabsModule {
}
McTabsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    McCommonModule,
                    PortalModule,
                    A11yModule
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
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: tab-nav-bar/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ptsecurity-mosaic-tabs.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { MC_TABS_CONFIG, McAlignTabsCenterCssStyler, McAlignTabsEndCssStyler, McLightTabsCssStyler, McStretchTabsCssStyler, McTab, McTabBody, McTabBodyPortal, McTabChangeEvent, McTabContent, McTabGroup, McTabGroupBase, McTabGroupMixinBase, McTabHeader, McTabLabel, McTabLabelWrapper, McTabLink, McTabNav, McTabsModule, mcTabsAnimations, McTabHeaderBase as ɵa, McTabLabelWrapperBase as ɵb, McTabLabelWrapperMixinBase as ɵc, McTabBase as ɵd, McTabMixinBase as ɵe, McTabNavBase as ɵf, McTabNavMixinBase as ɵg, McTabLinkBase as ɵh, McTabLinkMixinBase as ɵi };
//# sourceMappingURL=ptsecurity-mosaic-tabs.js.map
