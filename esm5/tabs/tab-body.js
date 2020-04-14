/**
 * @fileoverview added by tsickle
 * Generated from: tab-body.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { Directionality } from '@angular/cdk/bidi';
import { TemplatePortal, CdkPortalOutlet } from '@angular/cdk/portal';
import { Component, ChangeDetectorRef, Input, Inject, Output, EventEmitter, ElementRef, Directive, Optional, ViewEncapsulation, ChangeDetectionStrategy, ComponentFactoryResolver, ViewContainerRef, forwardRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { mcTabsAnimations } from './tabs-animations';
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
            this.dirChangeSubscription = this.dir.change
                .subscribe((/**
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
        return position === 'center' || position === 'left-origin-center' || position === 'right-origin-center';
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
        portalHost: [{ type: ViewChild, args: [CdkPortalOutlet, { static: false },] }],
        content: [{ type: Input, args: ['content',] }],
        origin: [{ type: Input }],
        animationDuration: [{ type: Input }]
    };
    return McTabBody;
}());
export { McTabBody };
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
                },] }
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
export { McTabBodyPortal };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWJvZHkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvdGFicy8iLCJzb3VyY2VzIjpbInRhYi1ib2R5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxjQUFjLEVBQWEsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RFLE9BQU8sRUFDSCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNOLFlBQVksRUFHWixVQUFVLEVBQ1YsU0FBUyxFQUNULFFBQVEsRUFDUixpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLHdCQUF3QixFQUN4QixnQkFBZ0IsRUFDaEIsVUFBVSxFQUNWLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7QUE0QnJEO0lBdURJLG1CQUNZLFVBQW1DLEVBQ3ZCLEdBQW1CLEVBQ3ZDLGlCQUFvQztRQUh4QyxpQkFZQztRQVhXLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQ3ZCLFFBQUcsR0FBSCxHQUFHLENBQWdCOzs7O1FBakN4QixnQkFBVyxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDOzs7O1FBRy9ELG9CQUFlLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7Ozs7UUFHckUsdUJBQWtCLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7Ozs7UUFHeEUsZUFBVSxHQUF1QixJQUFJLFlBQVksQ0FBTyxJQUFJLENBQUMsQ0FBQzs7Ozs7O1FBY3hFLHNCQUFpQixHQUFXLEtBQUssQ0FBQzs7OztRQU1uQywwQkFBcUIsR0FB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LFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVM7OztRQUFDO1lBQ3JELEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx1Q0FBdUM7Ozs7O0lBQ3ZDLHFDQUFXOzs7O0lBQVg7UUFDSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7Z0JBdENKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2lCQUM5Qjs7OztnQkFyTEcsd0JBQXdCO2dCQUN4QixnQkFBZ0I7Z0JBOEx1QyxTQUFTLHVCQUEzRCxNQUFNLFNBQUMsVUFBVTs7O3dCQUFDLGNBQU0sT0FBQSxTQUFTLEVBQVQsQ0FBUyxFQUFDOztJQTJCM0Msc0JBQUM7Q0FBQSxBQXZDRCxDQUdxQyxlQUFlLEdBb0NuRDtTQXBDWSxlQUFlOzs7Ozs7O0lBRXhCLHVDQUEwQzs7Ozs7O0lBRTFDLHFDQUF3Qzs7Ozs7SUFLcEMsK0JBQTREIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5LCBEaXJlY3Rpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCwgQ2RrUG9ydGFsT3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBJbnB1dCxcbiAgICBJbmplY3QsXG4gICAgT3V0cHV0LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRGlyZWN0aXZlLFxuICAgIE9wdGlvbmFsLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIGZvcndhcmRSZWYsXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IG1jVGFic0FuaW1hdGlvbnMgfSBmcm9tICcuL3RhYnMtYW5pbWF0aW9ucyc7XG5cblxuLyoqXG4gKiBUaGVzZSBwb3NpdGlvbiBzdGF0ZXMgYXJlIHVzZWQgaW50ZXJuYWxseSBhcyBhbmltYXRpb24gc3RhdGVzIGZvciB0aGUgdGFiIGJvZHkuIFNldHRpbmcgdGhlXG4gKiBwb3NpdGlvbiBzdGF0ZSB0byBsZWZ0LCByaWdodCwgb3IgY2VudGVyIHdpbGwgdHJhbnNpdGlvbiB0aGUgdGFiIGJvZHkgZnJvbSBpdHMgY3VycmVudFxuICogcG9zaXRpb24gdG8gaXRzIHJlc3BlY3RpdmUgc3RhdGUuIElmIHRoZXJlIGlzIG5vdCBjdXJyZW50IHBvc2l0aW9uICh2b2lkLCBpbiB0aGUgY2FzZSBvZiBhIG5ld1xuICogdGFiIGJvZHkpLCB0aGVuIHRoZXJlIHdpbGwgYmUgbm8gdHJhbnNpdGlvbiBhbmltYXRpb24gdG8gaXRzIHN0YXRlLlxuICpcbiAqIEluIHRoZSBjYXNlIG9mIGEgbmV3IHRhYiBib2R5IHRoYXQgc2hvdWxkIGltbWVkaWF0ZWx5IGJlIGNlbnRlcmVkIHdpdGggYW4gYW5pbWF0aW5nIHRyYW5zaXRpb24sXG4gKiB0aGVuIGxlZnQtb3JpZ2luLWNlbnRlciBvciByaWdodC1vcmlnaW4tY2VudGVyIGNhbiBiZSB1c2VkLCB3aGljaCB3aWxsIHVzZSBsZWZ0IG9yIHJpZ2h0IGFzIGl0c1xuICogcHN1ZWRvLXByaW9yIHN0YXRlLlxuICovXG5leHBvcnQgdHlwZSBNY1RhYkJvZHlQb3NpdGlvblN0YXRlID1cbiAgICAnbGVmdCcgfCAnY2VudGVyJyB8ICdyaWdodCcgfCAnbGVmdC1vcmlnaW4tY2VudGVyJyB8ICdyaWdodC1vcmlnaW4tY2VudGVyJztcblxuLyoqXG4gKiBUaGUgb3JpZ2luIHN0YXRlIGlzIGFuIGludGVybmFsbHkgdXNlZCBzdGF0ZSB0aGF0IGlzIHNldCBvbiBhIG5ldyB0YWIgYm9keSBpbmRpY2F0aW5nIGlmIGl0XG4gKiBiZWdhbiB0byB0aGUgbGVmdCBvciByaWdodCBvZiB0aGUgcHJpb3Igc2VsZWN0ZWQgaW5kZXguIEZvciBleGFtcGxlLCBpZiB0aGUgc2VsZWN0ZWQgaW5kZXggd2FzXG4gKiBzZXQgdG8gMSwgYW5kIGEgbmV3IHRhYiBpcyBjcmVhdGVkIGFuZCBzZWxlY3RlZCBhdCBpbmRleCAyLCB0aGVuIHRoZSB0YWIgYm9keSB3b3VsZCBoYXZlIGFuXG4gKiBvcmlnaW4gb2YgcmlnaHQgYmVjYXVzZSBpdHMgaW5kZXggd2FzIGdyZWF0ZXIgdGhhbiB0aGUgcHJpb3Igc2VsZWN0ZWQgaW5kZXguXG4gKi9cbmV4cG9ydCB0eXBlIE1jVGFiQm9keU9yaWdpblN0YXRlID0gJ2xlZnQnIHwgJ3JpZ2h0JztcblxuLyoqXG4gKiBXcmFwcGVyIGZvciB0aGUgY29udGVudHMgb2YgYSB0YWIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFiLWJvZHknLFxuICAgIHRlbXBsYXRlVXJsOiAndGFiLWJvZHkuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3RhYi1ib2R5LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGFuaW1hdGlvbnM6IFttY1RhYnNBbmltYXRpb25zLnRyYW5zbGF0ZVRhYl0sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRhYi1ib2R5J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUYWJCb2R5IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIFRoZSBzaGlmdGVkIGluZGV4IHBvc2l0aW9uIG9mIHRoZSB0YWIgYm9keSwgd2hlcmUgemVybyByZXByZXNlbnRzIHRoZSBhY3RpdmUgY2VudGVyIHRhYi4gKi9cbiAgICBASW5wdXQoKVxuICAgIHNldCBwb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb25JbmRleCA9IHBvc2l0aW9uO1xuICAgICAgICB0aGlzLmNvbXB1dGVQb3NpdGlvbkFuaW1hdGlvblN0YXRlKCk7XG4gICAgfVxuXG4gICAgLyoqIFRhYiBib2R5IHBvc2l0aW9uIHN0YXRlLiBVc2VkIGJ5IHRoZSBhbmltYXRpb24gdHJpZ2dlciBmb3IgdGhlIGN1cnJlbnQgc3RhdGUuICovXG4gICAgYm9keVBvc2l0aW9uOiBNY1RhYkJvZHlQb3NpdGlvblN0YXRlO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgdGFiIGJlZ2lucyB0byBhbmltYXRlIHRvd2FyZHMgdGhlIGNlbnRlciBhcyB0aGUgYWN0aXZlIHRhYi4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgb25DZW50ZXJpbmc6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCBiZWZvcmUgdGhlIGNlbnRlcmluZyBvZiB0aGUgdGFiIGJlZ2lucy4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgYmVmb3JlQ2VudGVyaW5nOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCBiZWZvcmUgdGhlIGNlbnRlcmluZyBvZiB0aGUgdGFiIGJlZ2lucy4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgYWZ0ZXJMZWF2aW5nQ2VudGVyOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSB0YWIgY29tcGxldGVzIGl0cyBhbmltYXRpb24gdG93YXJkcyB0aGUgY2VudGVyLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBvbkNlbnRlcmVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KHRydWUpO1xuXG4gICAgLyoqIFRoZSBwb3J0YWwgaG9zdCBpbnNpZGUgb2YgdGhpcyBjb250YWluZXIgaW50byB3aGljaCB0aGUgdGFiIGJvZHkgY29udGVudCB3aWxsIGJlIGxvYWRlZC4gKi9cbiAgICBAVmlld0NoaWxkKENka1BvcnRhbE91dGxldCwge3N0YXRpYzogZmFsc2V9KSBwb3J0YWxIb3N0OiBDZGtQb3J0YWxPdXRsZXQ7XG5cbiAgICAvKiogVGhlIHRhYiBib2R5IGNvbnRlbnQgdG8gZGlzcGxheS4gKi9cbiAgICBASW5wdXQoJ2NvbnRlbnQnKSBjb250ZW50OiBUZW1wbGF0ZVBvcnRhbDtcblxuICAgIC8qKiBQb3NpdGlvbiB0aGF0IHdpbGwgYmUgdXNlZCB3aGVuIHRoZSB0YWIgaXMgaW1tZWRpYXRlbHkgYmVjb21pbmcgdmlzaWJsZSBhZnRlciBjcmVhdGlvbi4gKi9cbiAgICBASW5wdXQoKSBvcmlnaW46IG51bWJlcjtcblxuICAgIC8vIE5vdGUgdGhhdCB0aGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGFsd2F5cyBiZSBvdmVyd3JpdHRlbiBieSBgTWNUYWJCb2R5YCwgYnV0IHdlIG5lZWQgb25lXG4gICAgLy8gYW55d2F5IHRvIHByZXZlbnQgdGhlIGFuaW1hdGlvbnMgbW9kdWxlIGZyb20gdGhyb3dpbmcgYW4gZXJyb3IgaWYgdGhlIGJvZHkgaXMgdXNlZCBvbiBpdHMgb3duLlxuICAgIC8qKiBEdXJhdGlvbiBmb3IgdGhlIHRhYidzIGFuaW1hdGlvbi4gKi9cbiAgICBASW5wdXQoKSBhbmltYXRpb25EdXJhdGlvbjogc3RyaW5nID0gJzBtcyc7XG5cbiAgICAvKiogQ3VycmVudCBwb3NpdGlvbiBvZiB0aGUgdGFiLWJvZHkgaW4gdGhlIHRhYi1ncm91cC4gWmVybyBtZWFucyB0aGF0IHRoZSB0YWIgaXMgdmlzaWJsZS4gKi9cbiAgICBwcml2YXRlIHBvc2l0aW9uSW5kZXg6IG51bWJlcjtcblxuICAgIC8qKiBTdWJzY3JpcHRpb24gdG8gdGhlIGRpcmVjdGlvbmFsaXR5IGNoYW5nZSBvYnNlcnZhYmxlLiAqL1xuICAgIHByaXZhdGUgZGlyQ2hhbmdlU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7XG4gICAgICAgIGlmICh0aGlzLmRpciAmJiBjaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICAgICAgdGhpcy5kaXJDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLmRpci5jaGFuZ2VcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChkaXJlY3Rpb246IERpcmVjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXB1dGVQb3NpdGlvbkFuaW1hdGlvblN0YXRlKGRpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWZ0ZXIgaW5pdGlhbGl6ZWQsIGNoZWNrIGlmIHRoZSBjb250ZW50IGlzIGNlbnRlcmVkIGFuZCBoYXMgYW4gb3JpZ2luLiBJZiBzbywgc2V0IHRoZVxuICAgICAqIHNwZWNpYWwgcG9zaXRpb24gc3RhdGVzIHRoYXQgdHJhbnNpdGlvbiB0aGUgdGFiIGZyb20gdGhlIGxlZnQgb3IgcmlnaHQgYmVmb3JlIGNlbnRlcmluZy5cbiAgICAgKi9cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYm9keVBvc2l0aW9uID09PSAnY2VudGVyJyAmJiB0aGlzLm9yaWdpbiAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmJvZHlQb3NpdGlvbiA9IHRoaXMuY29tcHV0ZVBvc2l0aW9uRnJvbU9yaWdpbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGlyQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgb25UcmFuc2xhdGVUYWJTdGFydGVkKGU6IEFuaW1hdGlvbkV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGlzQ2VudGVyaW5nID0gdGhpcy5pc0NlbnRlclBvc2l0aW9uKGUudG9TdGF0ZSk7XG4gICAgICAgIHRoaXMuYmVmb3JlQ2VudGVyaW5nLmVtaXQoaXNDZW50ZXJpbmcpO1xuXG4gICAgICAgIGlmIChpc0NlbnRlcmluZykge1xuICAgICAgICAgICAgdGhpcy5vbkNlbnRlcmluZy5lbWl0KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRyYW5zbGF0ZVRhYkNvbXBsZXRlKGU6IEFuaW1hdGlvbkV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8vIElmIHRoZSB0cmFuc2l0aW9uIHRvIHRoZSBjZW50ZXIgaXMgY29tcGxldGUsIGVtaXQgYW4gZXZlbnQuXG4gICAgICAgIGlmICh0aGlzLmlzQ2VudGVyUG9zaXRpb24oZS50b1N0YXRlKSAmJiB0aGlzLmlzQ2VudGVyUG9zaXRpb24odGhpcy5ib2R5UG9zaXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2VudGVyZWQuZW1pdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNDZW50ZXJQb3NpdGlvbihlLmZyb21TdGF0ZSkgJiYgIXRoaXMuaXNDZW50ZXJQb3NpdGlvbih0aGlzLmJvZHlQb3NpdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuYWZ0ZXJMZWF2aW5nQ2VudGVyLmVtaXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBUaGUgdGV4dCBkaXJlY3Rpb24gb2YgdGhlIGNvbnRhaW5pbmcgYXBwLiAqL1xuICAgIGdldExheW91dERpcmVjdGlvbigpOiBEaXJlY3Rpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXIgJiYgdGhpcy5kaXIudmFsdWUgPT09ICdydGwnID8gJ3J0bCcgOiAnbHRyJztcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgcHJvdmlkZWQgcG9zaXRpb24gc3RhdGUgaXMgY29uc2lkZXJlZCBjZW50ZXIsIHJlZ2FyZGxlc3Mgb2Ygb3JpZ2luLiAqL1xuICAgIGlzQ2VudGVyUG9zaXRpb24ocG9zaXRpb246IE1jVGFiQm9keVBvc2l0aW9uU3RhdGUgfCBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHBvc2l0aW9uID09PSAnY2VudGVyJyB8fCBwb3NpdGlvbiA9PT0gJ2xlZnQtb3JpZ2luLWNlbnRlcicgfHwgcG9zaXRpb24gPT09ICdyaWdodC1vcmlnaW4tY2VudGVyJztcbiAgICB9XG5cbiAgICAvKiogQ29tcHV0ZXMgdGhlIHBvc2l0aW9uIHN0YXRlIHRoYXQgd2lsbCBiZSB1c2VkIGZvciB0aGUgdGFiLWJvZHkgYW5pbWF0aW9uIHRyaWdnZXIuICovXG4gICAgcHJpdmF0ZSBjb21wdXRlUG9zaXRpb25BbmltYXRpb25TdGF0ZShkaXI6IERpcmVjdGlvbiA9IHRoaXMuZ2V0TGF5b3V0RGlyZWN0aW9uKCkpIHtcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb25JbmRleCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuYm9keVBvc2l0aW9uID0gZGlyID09PSAnbHRyJyA/ICdsZWZ0JyA6ICdyaWdodCc7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wb3NpdGlvbkluZGV4ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5UG9zaXRpb24gPSBkaXIgPT09ICdsdHInID8gJ3JpZ2h0JyA6ICdsZWZ0JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYm9keVBvc2l0aW9uID0gJ2NlbnRlcic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb21wdXRlcyB0aGUgcG9zaXRpb24gc3RhdGUgYmFzZWQgb24gdGhlIHNwZWNpZmllZCBvcmlnaW4gcG9zaXRpb24uIFRoaXMgaXMgdXNlZCBpZiB0aGVcbiAgICAgKiB0YWIgaXMgYmVjb21pbmcgdmlzaWJsZSBpbW1lZGlhdGVseSBhZnRlciBjcmVhdGlvbi5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbXB1dGVQb3NpdGlvbkZyb21PcmlnaW4oKTogTWNUYWJCb2R5UG9zaXRpb25TdGF0ZSB7XG4gICAgICAgIGNvbnN0IGRpciA9IHRoaXMuZ2V0TGF5b3V0RGlyZWN0aW9uKCk7XG5cbiAgICAgICAgaWYgKChkaXIgPT09ICdsdHInICYmIHRoaXMub3JpZ2luIDw9IDApIHx8IChkaXIgPT09ICdydGwnICYmIHRoaXMub3JpZ2luID4gMCkpIHtcbiAgICAgICAgICAgIHJldHVybiAnbGVmdC1vcmlnaW4tY2VudGVyJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAncmlnaHQtb3JpZ2luLWNlbnRlcic7XG4gICAgfVxufVxuXG4vKipcbiAqIFRoZSBwb3J0YWwgaG9zdCBkaXJlY3RpdmUgZm9yIHRoZSBjb250ZW50cyBvZiB0aGUgdGFiLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY1RhYkJvZHlIb3N0XSdcbn0pXG5leHBvcnQgY2xhc3MgTWNUYWJCb2R5UG9ydGFsIGV4dGVuZHMgQ2RrUG9ydGFsT3V0bGV0IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKiBTdWJzY3JpcHRpb24gdG8gZXZlbnRzIGZvciB3aGVuIHRoZSB0YWIgYm9keSBiZWdpbnMgY2VudGVyaW5nLiAqL1xuICAgIHByaXZhdGUgY2VudGVyaW5nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIC8qKiBTdWJzY3JpcHRpb24gdG8gZXZlbnRzIGZvciB3aGVuIHRoZSB0YWIgYm9keSBmaW5pc2hlcyBsZWF2aW5nIGZyb20gY2VudGVyIHBvc2l0aW9uLiAqL1xuICAgIHByaXZhdGUgbGVhdmluZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE1jVGFiQm9keSkpIHByaXZhdGUgaG9zdDogTWNUYWJCb2R5KSB7XG4gICAgICAgIHN1cGVyKGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgdmlld0NvbnRhaW5lclJlZik7XG4gICAgfVxuXG4gICAgLyoqIFNldCBpbml0aWFsIHZpc2liaWxpdHkgb3Igc2V0IHVwIHN1YnNjcmlwdGlvbiBmb3IgY2hhbmdpbmcgdmlzaWJpbGl0eS4gKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICB0aGlzLmNlbnRlcmluZ1N1YiA9IHRoaXMuaG9zdC5iZWZvcmVDZW50ZXJpbmdcbiAgICAgICAgICAgIC5waXBlKHN0YXJ0V2l0aCh0aGlzLmhvc3QuaXNDZW50ZXJQb3NpdGlvbih0aGlzLmhvc3QuYm9keVBvc2l0aW9uKSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChpc0NlbnRlcmluZzogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpc0NlbnRlcmluZyAmJiAhdGhpcy5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNoKHRoaXMuaG9zdC5jb250ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmxlYXZpbmdTdWIgPSB0aGlzLmhvc3QuYWZ0ZXJMZWF2aW5nQ2VudGVyLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRldGFjaCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogQ2xlYW4gdXAgY2VudGVyaW5nIHN1YnNjcmlwdGlvbi4gKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5jZW50ZXJpbmdTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5sZWF2aW5nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxufVxuIl19