/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { Directive, TemplateRef, ChangeDetectionStrategy, Component, ContentChild, Input, ViewChild, ViewContainerRef, ViewEncapsulation, ChangeDetectorRef, Inject, Output, EventEmitter, ElementRef, Optional, ComponentFactoryResolver, forwardRef, ContentChildren, NgZone, InjectionToken, Attribute, NgModule } from '@angular/core';
import { __extends } from 'tslib';
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Decorates the `ng-template` tags and reads out the template from it.
 */
var McTabContent = /** @class */ (function () {
    function McTabContent(template) {
        this.template = template;
    }
    McTabContent.decorators = [
        { type: Directive, args: [{ selector: '[mcTabContent]' },] },
    ];
    /** @nocollapse */
    McTabContent.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return McTabContent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Used to flag tab labels for use with the portal directive
 */
var McTabLabel = /** @class */ (function (_super) {
    __extends(McTabLabel, _super);
    function McTabLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    McTabLabel.decorators = [
        { type: Directive, args: [{
                    selector: '[mc-tab-label], [mcTabLabel]'
                },] },
    ];
    return McTabLabel;
}(CdkPortal));
// TODO: workaround for https://github.com/angular/material2/issues/12760
((/** @type {?} */ (McTabLabel))).ctorParameters = (/**
 * @return {?}
 */
function () { return ((/** @type {?} */ (CdkPortal))).ctorParameters; });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McTabBase = /** @class */ (function () {
    function McTabBase() {
    }
    return McTabBase;
}());
/** @type {?} */
var mcTabMixinBase = mixinDisabled(McTabBase);
var McTab = /** @class */ (function (_super) {
    __extends(McTab, _super);
    function McTab(viewContainerRef) {
        var _this = _super.call(this) || this;
        _this.viewContainerRef = viewContainerRef;
        /**
         * Plain text label for the tab, used when there is no template label.
         */
        _this.textLabel = '';
        /**
         * Emits whenever the internal state of the tab changes.
         */
        _this.stateChanges = new Subject();
        /**
         * The relatively indexed position where 0 represents the center, negative is left, and positive
         * represents the right.
         */
        _this.position = null;
        /**
         * The initial relatively index origin of the tab if it was created and selected after there
         * was already a selected tab. Provides context of what position the tab should originate from.
         */
        _this.origin = null;
        /**
         * Whether the tab is currently active.
         */
        _this.isActive = false;
        /**
         * Portal that will be the hosted content of the tab
         */
        _this.contentPortal = null;
        return _this;
    }
    Object.defineProperty(McTab.prototype, "content", {
        /** @docs-private */
        get: /**
         * \@docs-private
         * @return {?}
         */
        function () {
            return this.contentPortal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    McTab.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.hasOwnProperty('textLabel') ||
            changes.hasOwnProperty('disabled')) {
            this.stateChanges.next();
        }
    };
    /**
     * @return {?}
     */
    McTab.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stateChanges.complete();
    };
    /**
     * @return {?}
     */
    McTab.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.contentPortal = new TemplatePortal(this.explicitContent || this.implicitContent, this.viewContainerRef);
    };
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
                },] },
    ];
    /** @nocollapse */
    McTab.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    McTab.propDecorators = {
        templateLabel: [{ type: ContentChild, args: [McTabLabel, { static: false },] }],
        explicitContent: [{ type: ContentChild, args: [McTabContent, { read: TemplateRef, static: true },] }],
        implicitContent: [{ type: ViewChild, args: [TemplateRef, { static: true },] }],
        textLabel: [{ type: Input, args: ['label',] }],
        tabId: [{ type: Input, args: ['tabId',] }],
        ariaLabel: [{ type: Input, args: ['aria-label',] }],
        ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }]
    };
    return McTab;
}(mcTabMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var mcTabsAnimations = {
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Wrapper for the contents of a tab.
 * \@docs-private
 */
var McTabBody = /** @class */ (function () {
    function McTabBody(elementRef, dir, changeDetectorRef) {
        var _this = this;
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
            this.dirChangeSubscription = this.dir.change.subscribe((/**
             * @param {?} direction
             * @return {?}
             */
            function (direction) {
                _this.computePositionAnimationState(direction);
                changeDetectorRef.markForCheck();
            }));
        }
    }
    Object.defineProperty(McTabBody.prototype, "position", {
        /** The shifted index position of the tab body, where zero represents the active center tab. */
        set: /**
         * The shifted index position of the tab body, where zero represents the active center tab.
         * @param {?} position
         * @return {?}
         */
        function (position) {
            this.positionIndex = position;
            this.computePositionAnimationState();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * After initialized, check if the content is centered and has an origin. If so, set the
     * special position states that transition the tab from the left or right before centering.
     */
    /**
     * After initialized, check if the content is centered and has an origin. If so, set the
     * special position states that transition the tab from the left or right before centering.
     * @return {?}
     */
    McTabBody.prototype.ngOnInit = /**
     * After initialized, check if the content is centered and has an origin. If so, set the
     * special position states that transition the tab from the left or right before centering.
     * @return {?}
     */
    function () {
        if (this.bodyPosition === 'center' && this.origin != null) {
            this.bodyPosition = this.computePositionFromOrigin();
        }
    };
    /**
     * @return {?}
     */
    McTabBody.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.dirChangeSubscription.unsubscribe();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    McTabBody.prototype.onTranslateTabStarted = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var isCentering = this.isCenterPosition(e.toState);
        this.beforeCentering.emit(isCentering);
        if (isCentering) {
            this.onCentering.emit(this.elementRef.nativeElement.clientHeight);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    McTabBody.prototype.onTranslateTabComplete = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        // If the transition to the center is complete, emit an event.
        if (this.isCenterPosition(e.toState) && this.isCenterPosition(this.bodyPosition)) {
            this.onCentered.emit();
        }
        if (this.isCenterPosition(e.fromState) && !this.isCenterPosition(this.bodyPosition)) {
            this.afterLeavingCenter.emit();
        }
    };
    /** The text direction of the containing app. */
    /**
     * The text direction of the containing app.
     * @return {?}
     */
    McTabBody.prototype.getLayoutDirection = /**
     * The text direction of the containing app.
     * @return {?}
     */
    function () {
        return this.dir && this.dir.value === 'rtl' ? 'rtl' : 'ltr';
    };
    /** Whether the provided position state is considered center, regardless of origin. */
    /**
     * Whether the provided position state is considered center, regardless of origin.
     * @param {?} position
     * @return {?}
     */
    McTabBody.prototype.isCenterPosition = /**
     * Whether the provided position state is considered center, regardless of origin.
     * @param {?} position
     * @return {?}
     */
    function (position) {
        return position === 'center' ||
            position === 'left-origin-center' ||
            position === 'right-origin-center';
    };
    /** Computes the position state that will be used for the tab-body animation trigger. */
    /**
     * Computes the position state that will be used for the tab-body animation trigger.
     * @private
     * @param {?=} dir
     * @return {?}
     */
    McTabBody.prototype.computePositionAnimationState = /**
     * Computes the position state that will be used for the tab-body animation trigger.
     * @private
     * @param {?=} dir
     * @return {?}
     */
    function (dir) {
        if (dir === void 0) { dir = this.getLayoutDirection(); }
        if (this.positionIndex < 0) {
            this.bodyPosition = dir === 'ltr' ? 'left' : 'right';
        }
        else if (this.positionIndex > 0) {
            this.bodyPosition = dir === 'ltr' ? 'right' : 'left';
        }
        else {
            this.bodyPosition = 'center';
        }
    };
    /**
     * Computes the position state based on the specified origin position. This is used if the
     * tab is becoming visible immediately after creation.
     */
    /**
     * Computes the position state based on the specified origin position. This is used if the
     * tab is becoming visible immediately after creation.
     * @private
     * @return {?}
     */
    McTabBody.prototype.computePositionFromOrigin = /**
     * Computes the position state based on the specified origin position. This is used if the
     * tab is becoming visible immediately after creation.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var dir = this.getLayoutDirection();
        if ((dir === 'ltr' && this.origin <= 0) || (dir === 'rtl' && this.origin > 0)) {
            return 'left-origin-center';
        }
        return 'right-origin-center';
    };
    McTabBody.decorators = [
        { type: Component, args: [{
                    selector: 'mc-tab-body',
                    template: "<div class=\"mc-tab-body__content\" #content [@translateTab]=\"{ value: bodyPosition, params: {animationDuration: animationDuration} }\" (@translateTab.start)=\"onTranslateTabStarted($event)\" (@translateTab.done)=\"onTranslateTabComplete($event)\"><ng-template mcTabBodyHost></ng-template></div>",
                    styles: [".mc-tab-body__content{height:100%;overflow:auto}.mc-tab-body__content .mc-tab-group_dynamic-height{overflow:hidden}"],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [mcTabsAnimations.translateTab],
                    host: {
                        class: 'mc-tab-body'
                    }
                },] },
    ];
    /** @nocollapse */
    McTabBody.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: ChangeDetectorRef }
    ]; };
    McTabBody.propDecorators = {
        position: [{ type: Input }],
        onCentering: [{ type: Output }],
        beforeCentering: [{ type: Output }],
        afterLeavingCenter: [{ type: Output }],
        onCentered: [{ type: Output }],
        portalHost: [{ type: ViewChild, args: [PortalHostDirective, { static: false },] }],
        content: [{ type: Input, args: ['content',] }],
        origin: [{ type: Input }],
        animationDuration: [{ type: Input }]
    };
    return McTabBody;
}());
/**
 * The portal host directive for the contents of the tab.
 * \@docs-private
 */
var McTabBodyPortal = /** @class */ (function (_super) {
    __extends(McTabBodyPortal, _super);
    function McTabBodyPortal(componentFactoryResolver, viewContainerRef, host) {
        var _this = _super.call(this, componentFactoryResolver, viewContainerRef) || this;
        _this.host = host;
        /**
         * Subscription to events for when the tab body begins centering.
         */
        _this.centeringSub = Subscription.EMPTY;
        /**
         * Subscription to events for when the tab body finishes leaving from center position.
         */
        _this.leavingSub = Subscription.EMPTY;
        return _this;
    }
    /** Set initial visibility or set up subscription for changing visibility. */
    /**
     * Set initial visibility or set up subscription for changing visibility.
     * @return {?}
     */
    McTabBodyPortal.prototype.ngOnInit = /**
     * Set initial visibility or set up subscription for changing visibility.
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.centeringSub = this.host.beforeCentering
            .pipe(startWith(this.host.isCenterPosition(this.host.bodyPosition)))
            .subscribe((/**
         * @param {?} isCentering
         * @return {?}
         */
        function (isCentering) {
            if (isCentering && !_this.hasAttached()) {
                _this.attach(_this.host.content);
            }
        }));
        this.leavingSub = this.host.afterLeavingCenter.subscribe((/**
         * @return {?}
         */
        function () {
            _this.detach();
        }));
    };
    /** Clean up centering subscription. */
    /**
     * Clean up centering subscription.
     * @return {?}
     */
    McTabBodyPortal.prototype.ngOnDestroy = /**
     * Clean up centering subscription.
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        this.centeringSub.unsubscribe();
        this.leavingSub.unsubscribe();
    };
    McTabBodyPortal.decorators = [
        { type: Directive, args: [{
                    selector: '[mcTabBodyHost]'
                },] },
    ];
    /** @nocollapse */
    McTabBodyPortal.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: ViewContainerRef },
        { type: McTabBody, decorators: [{ type: Inject, args: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return McTabBody; })),] }] }
    ]; };
    return McTabBodyPortal;
}(CdkPortalOutlet));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Boilerplate for applying mixins to McTabLabelWrapper.
/**
 * \@docs-private
 */
var  
// Boilerplate for applying mixins to McTabLabelWrapper.
/**
 * \@docs-private
 */
McTabLabelWrapperBase = /** @class */ (function () {
    function McTabLabelWrapperBase() {
    }
    return McTabLabelWrapperBase;
}());
/** @type {?} */
var mcTabLabelWrapperMixinBase = mixinDisabled(McTabLabelWrapperBase);
/**
 * Used in the `mc-tab-group` view to display tab labels.
 * \@docs-private
 */
var McTabLabelWrapper = /** @class */ (function (_super) {
    __extends(McTabLabelWrapper, _super);
    function McTabLabelWrapper(elementRef) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        return _this;
    }
    /** Sets focus on the wrapper element */
    /**
     * Sets focus on the wrapper element
     * @return {?}
     */
    McTabLabelWrapper.prototype.focus = /**
     * Sets focus on the wrapper element
     * @return {?}
     */
    function () {
        this.elementRef.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    McTabLabelWrapper.prototype.getOffsetLeft = /**
     * @return {?}
     */
    function () {
        return this.elementRef.nativeElement.offsetLeft;
    };
    /**
     * @return {?}
     */
    McTabLabelWrapper.prototype.getOffsetWidth = /**
     * @return {?}
     */
    function () {
        return this.elementRef.nativeElement.offsetWidth;
    };
    McTabLabelWrapper.decorators = [
        { type: Directive, args: [{
                    selector: '[mcTabLabelWrapper]',
                    inputs: ['disabled'],
                    host: {
                        '[class.mc-disabled]': 'disabled',
                        '[attr.aria-disabled]': '!!disabled'
                    }
                },] },
    ];
    /** @nocollapse */
    McTabLabelWrapper.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return McTabLabelWrapper;
}(mcTabLabelWrapperMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var VIEWPORT_THROTTLE_TIME = 150;
/** @type {?} */
var SCROLL_DISTANCE_DELIMITER = 3;
/**
 * The distance in pixels that will be overshot when scrolling a tab label into view. This helps
 * provide a small affordance to the label next to it.
 * @type {?}
 */
var EXAGGERATED_OVERSCROLL = 60;
// Boilerplate for applying mixins to McTabHeader.
/**
 * \@docs-private
 */
var  
// Boilerplate for applying mixins to McTabHeader.
/**
 * \@docs-private
 */
McTabHeaderBase = /** @class */ (function () {
    function McTabHeaderBase() {
    }
    return McTabHeaderBase;
}());
/**
 * The header of the tab group which displays a list of all the tabs in the tab group.
 * When the tabs list's width exceeds the width of the header container,
 * then arrows will be displayed to allow the user to scroll
 * left and right across the header.
 * \@docs-private
 */
var McTabHeader = /** @class */ (function (_super) {
    __extends(McTabHeader, _super);
    function McTabHeader(elementRef, changeDetectorRef, viewportRuler, dir, ngZone) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.changeDetectorRef = changeDetectorRef;
        _this.viewportRuler = viewportRuler;
        _this.dir = dir;
        _this.ngZone = ngZone;
        /**
         * Whether the controls for pagination should be displayed
         */
        _this.showPaginationControls = false;
        /**
         * Whether the tab list can be scrolled more towards the end of the tab label list.
         */
        _this.disableScrollAfter = true;
        /**
         * Whether the tab list can be scrolled more towards the beginning of the tab label list.
         */
        _this.disableScrollBefore = true;
        /**
         * Event emitted when the option is selected.
         */
        _this.selectFocusedIndex = new EventEmitter();
        /**
         * Event emitted when a label is focused.
         */
        _this.indexFocused = new EventEmitter();
        /**
         * The distance in pixels that the tab labels should be translated to the left.
         */
        _this._scrollDistance = 0;
        /**
         * Whether the header should scroll to the selected index after the view has been checked.
         */
        _this.selectedIndexChanged = false;
        /**
         * Emits when the component is destroyed.
         */
        _this.destroyed = new Subject();
        _this._selectedIndex = 0;
        return _this;
    }
    Object.defineProperty(McTabHeader.prototype, "selectedIndex", {
        /** The index of the active tab. */
        get: /**
         * The index of the active tab.
         * @return {?}
         */
        function () {
            return this._selectedIndex;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var coercedValue = coerceNumberProperty(value);
            this.selectedIndexChanged = this._selectedIndex !== coercedValue;
            this._selectedIndex = coercedValue;
            if (this.keyManager) {
                this.keyManager.updateActiveItem(coercedValue);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTabHeader.prototype, "focusIndex", {
        /** Tracks which element has focus; used for keyboard navigation */
        get: /**
         * Tracks which element has focus; used for keyboard navigation
         * @return {?}
         */
        function () {
            return this.keyManager ? (/** @type {?} */ (this.keyManager.activeItemIndex)) : 0;
        },
        /** When the focus index is set, we must manually send focus to the correct label */
        set: /**
         * When the focus index is set, we must manually send focus to the correct label
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!this.isValidIndex(value) ||
                this.focusIndex === value ||
                !this.keyManager) {
                return;
            }
            this.keyManager.setActiveItem(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTabHeader.prototype, "scrollDistance", {
        /** Sets the distance in pixels that the tab header should be transformed in the X-axis. */
        get: /**
         * Sets the distance in pixels that the tab header should be transformed in the X-axis.
         * @return {?}
         */
        function () {
            return this._scrollDistance;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._scrollDistance = Math.max(0, Math.min(this.getMaxScrollDistance(), v));
            // Mark that the scroll distance has changed so that after the view is checked, the CSS
            // transformation can move the header.
            this.scrollDistanceChanged = true;
            this.checkScrollingControls();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McTabHeader.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McTabHeader.prototype.handleKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    /**
     * @return {?}
     */
    McTabHeader.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var dirChange = this.dir ? this.dir.change : of(null);
        /** @type {?} */
        var resize = this.viewportRuler.change(VIEWPORT_THROTTLE_TIME);
        /** @type {?} */
        var realign = (/**
         * @return {?}
         */
        function () {
            _this.updatePagination();
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
        function () {
            realign();
            _this.keyManager.withHorizontalOrientation(_this.getLayoutDirection());
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
        function (newFocusIndex) {
            _this.indexFocused.emit(newFocusIndex);
            _this.setTabFocus(newFocusIndex);
        }));
    };
    /**
     * @return {?}
     */
    McTabHeader.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed.next();
        this.destroyed.complete();
    };
    /**
     * Callback for when the MutationObserver detects that the content has changed.
     */
    /**
     * Callback for when the MutationObserver detects that the content has changed.
     * @return {?}
     */
    McTabHeader.prototype.onContentChanges = /**
     * Callback for when the MutationObserver detects that the content has changed.
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var textContent = this.elementRef.nativeElement.textContent;
        // We need to diff the text content of the header, because the MutationObserver callback
        // will fire even if the text content didn't change which is inefficient and is prone
        // to infinite loops if a poorly constructed expression is passed in.
        if (textContent !== this.currentTextContent) {
            this.currentTextContent = textContent;
            /** @type {?} */
            var zoneCallback = (/**
             * @return {?}
             */
            function () {
                _this.updatePagination();
                _this.changeDetectorRef.markForCheck();
            });
            // The content observer runs outside the `NgZone` by default, which
            // means that we need to bring the callback back in ourselves.
            // TODO: Remove null check for `_ngZone` once it's a required parameter.
            this.ngZone ? this.ngZone.run(zoneCallback) : zoneCallback();
        }
    };
    /**
     * Updating the view whether pagination should be enabled or not
     *
     * WARNING: Calling this method can be very costly in terms of performance.  It should be called
     * as infrequently as possible from outside of the Tabs component as it causes a reflow of the
     * page.
     */
    /**
     * Updating the view whether pagination should be enabled or not
     *
     * WARNING: Calling this method can be very costly in terms of performance.  It should be called
     * as infrequently as possible from outside of the Tabs component as it causes a reflow of the
     * page.
     * @return {?}
     */
    McTabHeader.prototype.updatePagination = /**
     * Updating the view whether pagination should be enabled or not
     *
     * WARNING: Calling this method can be very costly in terms of performance.  It should be called
     * as infrequently as possible from outside of the Tabs component as it causes a reflow of the
     * page.
     * @return {?}
     */
    function () {
        this.checkPaginationEnabled();
        this.checkScrollingControls();
        this.updateTabScrollPosition();
    };
    /**
     * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
     * providing a valid index and return true.
     */
    /**
     * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
     * providing a valid index and return true.
     * @param {?} index
     * @return {?}
     */
    McTabHeader.prototype.isValidIndex = /**
     * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
     * providing a valid index and return true.
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (!this.labelWrappers) {
            return true;
        }
        /** @type {?} */
        var tab = this.labelWrappers
            ? this.labelWrappers.toArray()[index]
            : null;
        return !!tab && !tab.disabled;
    };
    /**
     * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
     * scrolling is enabled.
     */
    /**
     * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
     * scrolling is enabled.
     * @param {?} tabIndex
     * @return {?}
     */
    McTabHeader.prototype.setTabFocus = /**
     * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
     * scrolling is enabled.
     * @param {?} tabIndex
     * @return {?}
     */
    function (tabIndex) {
        if (this.showPaginationControls) {
            this.scrollToLabel(tabIndex);
        }
        if (this.labelWrappers && this.labelWrappers.length) {
            this.labelWrappers.toArray()[tabIndex].focus();
            // Do not let the browser manage scrolling to focus the element, this will be handled
            // by using translation. In LTR, the scroll left should be 0. In RTL, the scroll width
            // should be the full width minus the offset width.
            /** @type {?} */
            var containerEl = this.tabListContainer.nativeElement;
            /** @type {?} */
            var dir = this.getLayoutDirection();
            if (dir === 'ltr') {
                containerEl.scrollLeft = 0;
            }
            else {
                containerEl.scrollLeft =
                    containerEl.scrollWidth - containerEl.offsetWidth;
            }
        }
    };
    /** The layout direction of the containing app. */
    /**
     * The layout direction of the containing app.
     * @return {?}
     */
    McTabHeader.prototype.getLayoutDirection = /**
     * The layout direction of the containing app.
     * @return {?}
     */
    function () {
        return this.dir && this.dir.value === 'rtl' ? 'rtl' : 'ltr';
    };
    /** Performs the CSS transformation on the tab list that will cause the list to scroll. */
    /**
     * Performs the CSS transformation on the tab list that will cause the list to scroll.
     * @return {?}
     */
    McTabHeader.prototype.updateTabScrollPosition = /**
     * Performs the CSS transformation on the tab list that will cause the list to scroll.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var scrollDistance = this.scrollDistance;
        /** @type {?} */
        var translateX = this.getLayoutDirection() === 'ltr'
            ? -scrollDistance
            : scrollDistance;
        // Don't use `translate3d` here because we don't want to create a new layer. A new layer
        // seems to cause flickering and overflow in Internet Explorer.
        // See: https://github.com/angular/material2/issues/10276
        // We round the `transform` here, because transforms with sub-pixel precision cause some
        // browsers to blur the content of the element.
        this.tabList.nativeElement.style.transform = "translateX(" + Math.round(translateX) + "px)";
        // Setting the `transform` on IE will change the scroll offset of the parent, causing the
        // position to be thrown off in some cases. We have to reset it ourselves to ensure that
        // it doesn't get thrown off.
        this.tabList.nativeElement.scrollLeft = 0;
    };
    /**
     * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
     * the end of the list, respectively). The distance to scroll is computed to be a third of the
     * length of the tab list view window.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
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
    McTabHeader.prototype.scrollHeader = /**
     * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
     * the end of the list, respectively). The distance to scroll is computed to be a third of the
     * length of the tab list view window.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @param {?} scrollDir
     * @return {?}
     */
    function (scrollDir) {
        /** @type {?} */
        var viewLength = this.tabListContainer.nativeElement.offsetWidth;
        // Move the scroll distance one-third the length of the tab list's viewport.
        this.scrollDistance +=
            ((scrollDir === 'before' ? -1 : 1) * viewLength) / SCROLL_DISTANCE_DELIMITER;
    };
    /**
     * Moves the tab list such that the desired tab label (marked by index) is moved into view.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    /**
     * Moves the tab list such that the desired tab label (marked by index) is moved into view.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @param {?} labelIndex
     * @return {?}
     */
    McTabHeader.prototype.scrollToLabel = /**
     * Moves the tab list such that the desired tab label (marked by index) is moved into view.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @param {?} labelIndex
     * @return {?}
     */
    function (labelIndex) {
        /** @type {?} */
        var selectedLabel = this.labelWrappers
            ? this.labelWrappers.toArray()[labelIndex]
            : null;
        if (!selectedLabel) {
            return;
        }
        // The view length is the visible width of the tab labels.
        /** @type {?} */
        var viewLength = this.tabListContainer.nativeElement.offsetWidth;
        /** @type {?} */
        var labelBeforePos;
        /** @type {?} */
        var labelAfterPos;
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
        var beforeVisiblePos = this.scrollDistance;
        /** @type {?} */
        var afterVisiblePos = this.scrollDistance + viewLength;
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
    };
    /**
     * Evaluate whether the pagination controls should be displayed. If the scroll width of the
     * tab list is wider than the size of the header container, then the pagination controls should
     * be shown.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    /**
     * Evaluate whether the pagination controls should be displayed. If the scroll width of the
     * tab list is wider than the size of the header container, then the pagination controls should
     * be shown.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    McTabHeader.prototype.checkPaginationEnabled = /**
     * Evaluate whether the pagination controls should be displayed. If the scroll width of the
     * tab list is wider than the size of the header container, then the pagination controls should
     * be shown.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var isEnabled = this.tabList.nativeElement.scrollWidth >
            this.elementRef.nativeElement.offsetWidth;
        if (!isEnabled) {
            this.scrollDistance = 0;
        }
        if (isEnabled !== this.showPaginationControls) {
            this.changeDetectorRef.markForCheck();
        }
        this.showPaginationControls = isEnabled;
    };
    /**
     * Evaluate whether the before and after controls should be enabled or disabled.
     * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
     * before button. If the header is at the end of the list (scroll distance is equal to the
     * maximum distance we can scroll), then disable the after button.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
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
    McTabHeader.prototype.checkScrollingControls = /**
     * Evaluate whether the before and after controls should be enabled or disabled.
     * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
     * before button. If the header is at the end of the list (scroll distance is equal to the
     * maximum distance we can scroll), then disable the after button.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    function () {
        // Check if the pagination arrows should be activated.
        this.disableScrollBefore = this.scrollDistance === 0;
        this.disableScrollAfter =
            this.scrollDistance === this.getMaxScrollDistance();
        this.changeDetectorRef.markForCheck();
    };
    /**
     * Determines what is the maximum length in pixels that can be set for the scroll distance. This
     * is equal to the difference in width between the tab list container and tab header container.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    /**
     * Determines what is the maximum length in pixels that can be set for the scroll distance. This
     * is equal to the difference in width between the tab list container and tab header container.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    McTabHeader.prototype.getMaxScrollDistance = /**
     * Determines what is the maximum length in pixels that can be set for the scroll distance. This
     * is equal to the difference in width between the tab list container and tab header container.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var lengthOfTabList = this.tabList.nativeElement.scrollWidth;
        /** @type {?} */
        var viewLength = this.tabListContainer.nativeElement.offsetWidth;
        return lengthOfTabList - viewLength || 0;
    };
    McTabHeader.decorators = [
        { type: Component, args: [{
                    selector: 'mc-tab-header',
                    template: "<div class=\"mc-tab-header__pagination mc-tab-header__pagination_before mc-elevation-z4\" aria-hidden=\"true\" [class.mc-tab-header_disabled]=\"disableScrollBefore\" (click)=\"scrollHeader('before')\"><div class=\"mc-tab-header__pagination-chevron\"></div></div><div class=\"mc-tab-header__content\" #tabListContainer (keydown)=\"handleKeydown($event)\"><div class=\"mc-tab-list\" #tabList role=\"tablist\" (cdkObserveContent)=\"onContentChanges()\"><div class=\"mc-tab-list__content\"><ng-content></ng-content></div></div></div><div class=\"mc-tab-header__pagination mc-tab-header__pagination_after mc-elevation-z4\" aria-hidden=\"true\" [class.mc-tab-header_disabled]=\"disableScrollAfter\" (click)=\"scrollHeader('after')\"><div class=\"mc-tab-header__pagination-chevron\"></div></div>",
                    styles: [".mc-tab-header{display:flex}.mc-tab-header__pagination{position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2}.mc-tab-header__pagination .mc-tab-header__pagination-controls_enabled{display:flex}.mc-tab-header__pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:\"\";height:8px;width:8px}.mc-tab-header__pagination_after,.mc-tab-header_rtl .mc-tab-header__pagination_before{padding-right:4px}.mc-tab-header__pagination_after .mc-tab-header__pagination-chevron,.mc-tab-header_rtl .mc-tab-header__pagination_before .mc-tab-header__pagination-chevron{transform:rotate(45deg)}.mc-tab-header__pagination_before,.mc-tab-header_rtl .mc-tab-header__pagination_after{padding-left:4px}.mc-tab-header__pagination_before .mc-tab-header__pagination-chevron,.mc-tab-header_rtl .mc-tab-header__pagination_after .mc-tab-header__pagination-chevron{transform:rotate(-135deg)}.mc-tab-header_disabled{box-shadow:none;cursor:default}.mc-tab-header__content{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mc-tab-list{flex-grow:1;position:relative;transition:transform .5s cubic-bezier(.35,0,.25,1)}.mc-tab-list__content{display:flex}.mc-tab-group_align-labels-center .mc-tab-list__content{justify-content:center}.mc-tab-group_align-labels-end .mc-tab-list__content{justify-content:flex-end}.mc-tab-group_stretch-labels .mc-tab-label,.mc-tab-group_stretch-labels .mc-tab-light-label{flex-basis:0;flex-grow:1}"],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'mc-tab-header',
                        '[class.mc-tab-header__pagination-controls_enabled]': 'showPaginationControls',
                        '[class.mc-tab-header_rtl]': 'getLayoutDirection() == \'rtl\''
                    }
                },] },
    ];
    /** @nocollapse */
    McTabHeader.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: ViewportRuler },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: NgZone }
    ]; };
    McTabHeader.propDecorators = {
        selectedIndex: [{ type: Input }],
        labelWrappers: [{ type: ContentChildren, args: [McTabLabelWrapper,] }],
        tabListContainer: [{ type: ViewChild, args: ['tabListContainer', { static: true },] }],
        tabList: [{ type: ViewChild, args: ['tabList', { static: true },] }],
        selectFocusedIndex: [{ type: Output }],
        indexFocused: [{ type: Output }]
    };
    return McTabHeader;
}(McTabHeaderBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McLightTabsCssStyler = /** @class */ (function () {
    function McLightTabsCssStyler() {
    }
    McLightTabsCssStyler.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-tab-group[mc-light-tabs], [mc-tab-nav-bar][mc-light-tabs]',
                    host: { class: 'mc-tab-group_light' }
                },] },
    ];
    return McLightTabsCssStyler;
}());
var McAlignTabsCenterCssStyler = /** @class */ (function () {
    function McAlignTabsCenterCssStyler() {
    }
    McAlignTabsCenterCssStyler.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-tab-group[mc-align-tabs-center], [mc-tab-nav-bar][mc-align-tabs-center]',
                    host: { class: 'mc-tab-group_align-labels-center' }
                },] },
    ];
    return McAlignTabsCenterCssStyler;
}());
var McAlignTabsEndCssStyler = /** @class */ (function () {
    function McAlignTabsEndCssStyler() {
    }
    McAlignTabsEndCssStyler.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-tab-group[mc-align-tabs-end], [mc-tab-nav-bar][mc-align-tabs-end]',
                    host: { class: 'mc-tab-group_align-labels-end' }
                },] },
    ];
    return McAlignTabsEndCssStyler;
}());
var McStretchTabsCssStyler = /** @class */ (function () {
    function McStretchTabsCssStyler() {
    }
    McStretchTabsCssStyler.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-tab-group[mc-stretch-tabs], [mc-tab-nav-bar][mc-stretch-tabs]',
                    host: { class: 'mc-tab-group_stretch-labels' }
                },] },
    ];
    return McStretchTabsCssStyler;
}());
/**
 * Used to generate unique ID's for each tab component
 * @type {?}
 */
var nextId = 0;
/**
 * A simple change event emitted on focus or selection changes.
 */
var  /**
 * A simple change event emitted on focus or selection changes.
 */
McTabChangeEvent = /** @class */ (function () {
    function McTabChangeEvent() {
    }
    return McTabChangeEvent;
}());
/**
 * Injection token that can be used to provide the default options the tabs module.
 * @type {?}
 */
var MC_TABS_CONFIG = new InjectionToken('MC_TABS_CONFIG');
// Boilerplate for applying mixins to McTabGroup.
/**
 * \@docs-private
 */
var  
// Boilerplate for applying mixins to McTabGroup.
/**
 * \@docs-private
 */
McTabGroupBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McTabGroupBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McTabGroupBase;
}());
/** @type {?} */
var mcTabGroupMixinBase = mixinColor(mixinDisabled(McTabGroupBase));
/**
 * Tab-group component.  Supports basic tab pairs (label + content) and includes
 * keyboard navigation.
 */
var McTabGroup = /** @class */ (function (_super) {
    __extends(McTabGroup, _super);
    function McTabGroup(elementRef, changeDetectorRef, lightTabs, defaultConfig) {
        var _this = _super.call(this, elementRef) || this;
        _this.changeDetectorRef = changeDetectorRef;
        /**
         * Position of the tab header.
         */
        _this.headerPosition = 'above';
        /**
         * Output to enable support for two-way binding on `[(selectedIndex)]`
         */
        _this.selectedIndexChange = new EventEmitter();
        /**
         * Event emitted when focus has changed within a tab group.
         */
        _this.focusChange = new EventEmitter();
        /**
         * Event emitted when the body animation has completed
         */
        _this.animationDone = new EventEmitter();
        /**
         * Event emitted when the tab selection has changed.
         */
        _this.selectedTabChange = new EventEmitter(true);
        /**
         * The tab index that should be selected after the content has been checked.
         */
        _this.indexToSelect = 0;
        /**
         * Snapshot of the height of the tab body wrapper before another tab is activated.
         */
        _this.tabBodyWrapperHeight = 0;
        /**
         * Subscription to tabs being added/removed.
         */
        _this.tabsSubscription = Subscription.EMPTY;
        /**
         * Subscription to changes in the tab labels.
         */
        _this.tabLabelSubscription = Subscription.EMPTY;
        _this._dynamicHeight = false;
        _this._selectedIndex = null;
        _this.lightTab = coerceBooleanProperty(lightTabs);
        _this.groupId = nextId++;
        _this.animationDuration = defaultConfig && defaultConfig.animationDuration ?
            defaultConfig.animationDuration : '0ms';
        return _this;
    }
    Object.defineProperty(McTabGroup.prototype, "dynamicHeight", {
        /** Whether the tab group should grow to the size of the active tab. */
        get: /**
         * Whether the tab group should grow to the size of the active tab.
         * @return {?}
         */
        function () { return this._dynamicHeight; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._dynamicHeight = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTabGroup.prototype, "selectedIndex", {
        /** The index of the active tab. */
        get: /**
         * The index of the active tab.
         * @return {?}
         */
        function () { return this._selectedIndex; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.indexToSelect = coerceNumberProperty(value, null);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * After the content is checked, this component knows what tabs have been defined
     * and what the selected index should be. This is where we can know exactly what position
     * each tab should be in according to the new selected index, and additionally we know how
     * a new selected tab should transition in (from the left or right).
     */
    /**
     * After the content is checked, this component knows what tabs have been defined
     * and what the selected index should be. This is where we can know exactly what position
     * each tab should be in according to the new selected index, and additionally we know how
     * a new selected tab should transition in (from the left or right).
     * @return {?}
     */
    McTabGroup.prototype.ngAfterContentChecked = /**
     * After the content is checked, this component knows what tabs have been defined
     * and what the selected index should be. This is where we can know exactly what position
     * each tab should be in according to the new selected index, and additionally we know how
     * a new selected tab should transition in (from the left or right).
     * @return {?}
     */
    function () {
        var _this = this;
        // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
        // the amount of tabs changes before the actual change detection runs.
        /** @type {?} */
        var indexToSelect = this.indexToSelect = this.clampTabIndex(this.indexToSelect);
        // If there is a change in selected index, emit a change event. Should not trigger if
        // the selected index has not yet been initialized.
        if (this._selectedIndex !== indexToSelect) {
            /** @type {?} */
            var isFirstRun_1 = this._selectedIndex == null;
            if (!isFirstRun_1) {
                this.selectedTabChange.emit(this.createChangeEvent(indexToSelect));
            }
            // Changing these values after change detection has run
            // since the checked content may contain references to them.
            Promise.resolve().then((/**
             * @return {?}
             */
            function () {
                _this.tabs.forEach((/**
                 * @param {?} tab
                 * @param {?} index
                 * @return {?}
                 */
                function (tab, index) { return tab.isActive = index === indexToSelect; }));
                if (!isFirstRun_1) {
                    _this.selectedIndexChange.emit(indexToSelect);
                }
            }));
        }
        // Setup the position for each tab and optionally setup an origin on the next selected tab.
        this.tabs.forEach((/**
         * @param {?} tab
         * @param {?} index
         * @return {?}
         */
        function (tab, index) {
            tab.position = index - indexToSelect;
            // If there is already a selected tab, then set up an origin for the next selected tab
            // if it doesn't have one already.
            if (_this._selectedIndex != null && tab.position === 0 && !tab.origin) {
                tab.origin = indexToSelect - _this._selectedIndex;
            }
        }));
        if (this._selectedIndex !== indexToSelect) {
            this._selectedIndex = indexToSelect;
            this.changeDetectorRef.markForCheck();
        }
    };
    /**
     * @return {?}
     */
    McTabGroup.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscribeToTabLabels();
        // Subscribe to changes in the amount of tabs, in order to be
        // able to re-render the content as new tabs are added or removed.
        this.tabsSubscription = this.tabs.changes.subscribe((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var indexToSelect = _this.clampTabIndex(_this.indexToSelect);
            // Maintain the previously-selected tab if a new tab is added or removed and there is no
            // explicit change that selects a different tab.
            if (indexToSelect === _this._selectedIndex) {
                /** @type {?} */
                var tabs = _this.tabs.toArray();
                for (var i = 0; i < tabs.length; i++) {
                    if (tabs[i].isActive) {
                        // Assign both to the `_indexToSelect` and `_selectedIndex` so we don't fire a changed
                        // event, otherwise the consumer may end up in an infinite loop in some edge cases like
                        // adding a tab within the `selectedIndexChange` event.
                        _this.indexToSelect = _this._selectedIndex = i;
                        break;
                    }
                }
            }
            _this.subscribeToTabLabels();
            _this.changeDetectorRef.markForCheck();
        }));
    };
    /**
     * @return {?}
     */
    McTabGroup.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.tabsSubscription.unsubscribe();
        this.tabLabelSubscription.unsubscribe();
    };
    /**
     * @param {?} index
     * @return {?}
     */
    McTabGroup.prototype.focusChanged = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.focusChange.emit(this.createChangeEvent(index));
    };
    /** Returns a unique id for each tab label element */
    /**
     * Returns a unique id for each tab label element
     * @param {?} i
     * @return {?}
     */
    McTabGroup.prototype.getTabLabelId = /**
     * Returns a unique id for each tab label element
     * @param {?} i
     * @return {?}
     */
    function (i) {
        return "mc-tab-label-" + this.groupId + "-" + i;
    };
    /** Returns a unique id for each tab content element */
    /**
     * Returns a unique id for each tab content element
     * @param {?} i
     * @return {?}
     */
    McTabGroup.prototype.getTabContentId = /**
     * Returns a unique id for each tab content element
     * @param {?} i
     * @return {?}
     */
    function (i) {
        return "mc-tab-content-" + this.groupId + "-" + i;
    };
    /**
     * Sets the height of the body wrapper to the height of the activating tab if dynamic
     * height property is true.
     */
    /**
     * Sets the height of the body wrapper to the height of the activating tab if dynamic
     * height property is true.
     * @param {?} tabHeight
     * @return {?}
     */
    McTabGroup.prototype.setTabBodyWrapperHeight = /**
     * Sets the height of the body wrapper to the height of the activating tab if dynamic
     * height property is true.
     * @param {?} tabHeight
     * @return {?}
     */
    function (tabHeight) {
        if (!this._dynamicHeight || !this.tabBodyWrapperHeight) {
            return;
        }
        /** @type {?} */
        var wrapper = this.tabBodyWrapper.nativeElement;
        wrapper.style.height = this.tabBodyWrapperHeight + "px";
        // This conditional forces the browser to paint the height so that
        // the animation to the new height can have an origin.
        if (this.tabBodyWrapper.nativeElement.offsetHeight) {
            wrapper.style.height = tabHeight + "px";
        }
    };
    /** Removes the height of the tab body wrapper. */
    /**
     * Removes the height of the tab body wrapper.
     * @return {?}
     */
    McTabGroup.prototype.removeTabBodyWrapperHeight = /**
     * Removes the height of the tab body wrapper.
     * @return {?}
     */
    function () {
        this.tabBodyWrapperHeight = this.tabBodyWrapper.nativeElement.clientHeight;
        this.tabBodyWrapper.nativeElement.style.height = '';
        this.animationDone.emit();
    };
    /** Handle click events, setting new selected index if appropriate. */
    /**
     * Handle click events, setting new selected index if appropriate.
     * @param {?} tab
     * @param {?} tabHeader
     * @param {?} index
     * @return {?}
     */
    McTabGroup.prototype.handleClick = /**
     * Handle click events, setting new selected index if appropriate.
     * @param {?} tab
     * @param {?} tabHeader
     * @param {?} index
     * @return {?}
     */
    function (tab, tabHeader, index) {
        if (!tab.disabled) {
            this.selectedIndex = tabHeader.focusIndex = index;
        }
    };
    /** Retrieves the tabindex for the tab. */
    /**
     * Retrieves the tabindex for the tab.
     * @param {?} tab
     * @param {?} index
     * @return {?}
     */
    McTabGroup.prototype.getTabIndex = /**
     * Retrieves the tabindex for the tab.
     * @param {?} tab
     * @param {?} index
     * @return {?}
     */
    function (tab, index) {
        if (tab.disabled) {
            return null;
        }
        return this.selectedIndex === index ? 0 : -1;
    };
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    McTabGroup.prototype.createChangeEvent = /**
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var event = new McTabChangeEvent();
        event.index = index;
        if (this.tabs && this.tabs.length) {
            event.tab = this.tabs.toArray()[index];
        }
        return event;
    };
    /**
     * Subscribes to changes in the tab labels. This is needed, because the @Input for the label is
     * on the McTab component, whereas the data binding is inside the McTabGroup. In order for the
     * binding to be updated, we need to subscribe to changes in it and trigger change detection
     * manually.
     */
    /**
     * Subscribes to changes in the tab labels. This is needed, because the \@Input for the label is
     * on the McTab component, whereas the data binding is inside the McTabGroup. In order for the
     * binding to be updated, we need to subscribe to changes in it and trigger change detection
     * manually.
     * @private
     * @return {?}
     */
    McTabGroup.prototype.subscribeToTabLabels = /**
     * Subscribes to changes in the tab labels. This is needed, because the \@Input for the label is
     * on the McTab component, whereas the data binding is inside the McTabGroup. In order for the
     * binding to be updated, we need to subscribe to changes in it and trigger change detection
     * manually.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.tabLabelSubscription) {
            this.tabLabelSubscription.unsubscribe();
        }
        this.tabLabelSubscription = merge.apply(void 0, this.tabs.map((/**
         * @param {?} tab
         * @return {?}
         */
        function (tab) { return tab.stateChanges; }))).subscribe((/**
         * @return {?}
         */
        function () { return _this.changeDetectorRef.markForCheck(); }));
    };
    /** Clamps the given index to the bounds of 0 and the tabs length. */
    /**
     * Clamps the given index to the bounds of 0 and the tabs length.
     * @private
     * @param {?} index
     * @return {?}
     */
    McTabGroup.prototype.clampTabIndex = /**
     * Clamps the given index to the bounds of 0 and the tabs length.
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        // Note the `|| 0`, which ensures that values like NaN can't get through
        // and which would otherwise throw the component into an infinite loop
        // (since Mch.max(NaN, 0) === NaN).
        return Math.min(this.tabs.length - 1, Math.max(index || 0, 0));
    };
    McTabGroup.decorators = [
        { type: Component, args: [{
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
                },] },
    ];
    /** @nocollapse */
    McTabGroup.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: String, decorators: [{ type: Attribute, args: ['mc-light-tabs',] }] },
        { type: undefined, decorators: [{ type: Inject, args: [MC_TABS_CONFIG,] }, { type: Optional }] }
    ]; };
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
    return McTabGroup;
}(mcTabGroupMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Boilerplate for applying mixins to McTabNav.
/**
 * \@docs-private
 */
var  
// Boilerplate for applying mixins to McTabNav.
/**
 * \@docs-private
 */
McTabNavBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McTabNavBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McTabNavBase;
}());
/** @type {?} */
var mcTabNavMixinBase = mixinColor(McTabNavBase);
/**
 * Navigation component matching the styles of the tab group header.
 */
var McTabNav = /** @class */ (function (_super) {
    __extends(McTabNav, _super);
    function McTabNav(elementRef) {
        return _super.call(this, elementRef) || this;
    }
    McTabNav.decorators = [
        { type: Component, args: [{
                    selector: '[mc-tab-nav-bar]',
                    exportAs: 'mcTabNavBar, mcTabNav',
                    inputs: ['color'],
                    template: "<div class=\"mc-tab-links\"><ng-content></ng-content></div>",
                    styles: [".mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-active:before,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link:hover:before,.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused:after{display:block;position:absolute;content:\"\"}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-active:before,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link:hover:before{bottom:-1px;left:0;height:4px;right:0}.mc-tab-link{vertical-align:top;text-decoration:none;-webkit-tap-highlight-color:transparent}.mc-tab-group_stretch-labels .mc-tab-link{flex-basis:0;flex-grow:1}.mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar{display:flex}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:40px;text-align:center;white-space:nowrap;cursor:pointer;padding-right:16px;padding-left:16px;outline:0;border-bottom-width:1px;border-bottom-style:solid;border-top-width:1px;border-top-style:solid;border-top-left-radius:3px;border-top-right-radius:3px}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused{z-index:1}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused:after{top:-2px;right:-1px;bottom:-1px;left:-1px;border-width:2px;border-style:solid;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom:none}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link .mc-tab-overlay{position:absolute;top:-1px;left:0;right:0;bottom:0;pointer-events:none}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-active{padding-right:15px;padding-left:15px;border-width:1px;border-style:solid}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-active.cdk-keyboard-focused:after{z-index:1;right:-2px;left:-2px}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link .mc-tab-overlay{border-top-width:1px;border-top-style:solid;border-top-color:transparent;border-top-left-radius:3px;border-top-right-radius:3px}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:40px;text-align:center;white-space:nowrap;cursor:pointer;padding-right:16px;padding-left:16px;outline:0;border-bottom-width:1px;border-bottom-style:solid}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused{z-index:1}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after{top:-2px;right:-1px;bottom:-1px;left:-1px;border-width:2px;border-style:solid;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom:none}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link .mc-tab-overlay{position:absolute;top:-1px;left:0;right:0;bottom:0;pointer-events:none}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused+:hover:before{left:1px}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after{top:-1px}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link .mc-tab-overlay{position:absolute;top:0}.mc-tab-links{display:flex;position:relative;padding:1px 1px 0 1px;flex-grow:1}.mc-tab-links .mc-tab-group_align-labels-center{justify-content:center}.mc-tab-links .mc-tab-group_align-labels-end{justify-content:flex-end}"],
                    host: { class: 'mc-tab-nav-bar' },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    McTabNav.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return McTabNav;
}(mcTabNavMixinBase));
// Boilerplate for applying mixins to McTabLink.
var  
// Boilerplate for applying mixins to McTabLink.
McTabLinkBase = /** @class */ (function () {
    function McTabLinkBase() {
    }
    return McTabLinkBase;
}());
/** @type {?} */
var mcTabLinkMixinBase = mixinTabIndex(mixinDisabled(McTabLinkBase));
/**
 * Link inside of a `mc-tab-nav-bar`.
 */
var McTabLink = /** @class */ (function (_super) {
    __extends(McTabLink, _super);
    function McTabLink(elementRef, tabIndex, focusMonitor) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.focusMonitor = focusMonitor;
        /**
         * Whether the tab link is active or not.
         */
        _this.isActive = false;
        _this.tabIndex = parseInt(tabIndex) || 0;
        _this.focusMonitor.monitor(_this.elementRef.nativeElement);
        return _this;
    }
    Object.defineProperty(McTabLink.prototype, "active", {
        /** Whether the link is active. */
        get: /**
         * Whether the link is active.
         * @return {?}
         */
        function () {
            return this.isActive;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this.isActive) {
                this.isActive = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McTabLink.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    };
    McTabLink.decorators = [
        { type: Directive, args: [{
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
                },] },
    ];
    /** @nocollapse */
    McTabLink.ctorParameters = function () { return [
        { type: ElementRef },
        { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
        { type: FocusMonitor }
    ]; };
    McTabLink.propDecorators = {
        active: [{ type: Input }]
    };
    return McTabLink;
}(mcTabLinkMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McTabsModule = /** @class */ (function () {
    function McTabsModule() {
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
                },] },
    ];
    return McTabsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McTabBody, McTabBodyPortal, McTabHeader, McTabLabelWrapper, McTab, McTabLabel, McTabNav, McTabLink, McTabContent, McTabsModule, McLightTabsCssStyler, McAlignTabsCenterCssStyler, McAlignTabsEndCssStyler, McStretchTabsCssStyler, McTabChangeEvent, MC_TABS_CONFIG, McTabGroupBase, mcTabGroupMixinBase, McTabGroup, mcTabsAnimations, McTabBase as ɵd16, mcTabMixinBase as ɵe16, McTabHeaderBase as ɵa16, McTabLabelWrapperBase as ɵb16, mcTabLabelWrapperMixinBase as ɵc16, McTabLinkBase as ɵh16, McTabNavBase as ɵf16, mcTabLinkMixinBase as ɵi16, mcTabNavMixinBase as ɵg16 };
//# sourceMappingURL=tabs.es5.js.map
