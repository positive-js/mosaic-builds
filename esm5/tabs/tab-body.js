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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWJvZHkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvdGFicy8iLCJzb3VyY2VzIjpbInRhYi1ib2R5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxjQUFjLEVBQWEsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RFLE9BQU8sRUFDSCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNOLFlBQVksRUFHWixVQUFVLEVBQ1YsU0FBUyxFQUNULFFBQVEsRUFDUixpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLHdCQUF3QixFQUN4QixnQkFBZ0IsRUFDaEIsVUFBVSxFQUNWLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7QUE0QnJEO0lBdURJLG1CQUFvQixVQUFtQyxFQUN2QixHQUFtQixFQUN2QyxpQkFBb0M7UUFGaEQsaUJBVUM7UUFWbUIsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFDdkIsUUFBRyxHQUFILEdBQUcsQ0FBZ0I7Ozs7UUFoQ2hDLGdCQUFXLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7Ozs7UUFHL0Qsb0JBQWUsR0FBMEIsSUFBSSxZQUFZLEVBQVcsQ0FBQzs7OztRQUdyRSx1QkFBa0IsR0FBMEIsSUFBSSxZQUFZLEVBQVcsQ0FBQzs7OztRQUd4RSxlQUFVLEdBQXVCLElBQUksWUFBWSxDQUFPLElBQUksQ0FBQyxDQUFDOzs7Ozs7UUFjeEUsc0JBQWlCLEdBQVcsS0FBSyxDQUFDOzs7O1FBTW5DLDBCQUFxQixH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QUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVM7OztRQUFDO1lBQ3JELEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx1Q0FBdUM7Ozs7O0lBQ3ZDLHFDQUFXOzs7O0lBQVg7UUFDSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7Z0JBdENKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2lCQUM5Qjs7OztnQkFwTEcsd0JBQXdCO2dCQUN4QixnQkFBZ0I7Z0JBNkx1QyxTQUFTLHVCQUEzRCxNQUFNLFNBQUMsVUFBVTs7O3dCQUFDLGNBQU0sT0FBQSxTQUFTLEVBQVQsQ0FBUyxFQUFDOztJQTJCM0Msc0JBQUM7Q0FBQSxBQXZDRCxDQUdxQyxlQUFlLEdBb0NuRDtTQXBDWSxlQUFlOzs7Ozs7O0lBRXhCLHVDQUEwQzs7Ozs7O0lBRTFDLHFDQUF3Qzs7Ozs7SUFLcEMsK0JBQTREIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5LCBEaXJlY3Rpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCwgQ2RrUG9ydGFsT3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBJbnB1dCxcbiAgICBJbmplY3QsXG4gICAgT3V0cHV0LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRGlyZWN0aXZlLFxuICAgIE9wdGlvbmFsLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIGZvcndhcmRSZWYsXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IG1jVGFic0FuaW1hdGlvbnMgfSBmcm9tICcuL3RhYnMtYW5pbWF0aW9ucyc7XG5cblxuLyoqXG4gKiBUaGVzZSBwb3NpdGlvbiBzdGF0ZXMgYXJlIHVzZWQgaW50ZXJuYWxseSBhcyBhbmltYXRpb24gc3RhdGVzIGZvciB0aGUgdGFiIGJvZHkuIFNldHRpbmcgdGhlXG4gKiBwb3NpdGlvbiBzdGF0ZSB0byBsZWZ0LCByaWdodCwgb3IgY2VudGVyIHdpbGwgdHJhbnNpdGlvbiB0aGUgdGFiIGJvZHkgZnJvbSBpdHMgY3VycmVudFxuICogcG9zaXRpb24gdG8gaXRzIHJlc3BlY3RpdmUgc3RhdGUuIElmIHRoZXJlIGlzIG5vdCBjdXJyZW50IHBvc2l0aW9uICh2b2lkLCBpbiB0aGUgY2FzZSBvZiBhIG5ld1xuICogdGFiIGJvZHkpLCB0aGVuIHRoZXJlIHdpbGwgYmUgbm8gdHJhbnNpdGlvbiBhbmltYXRpb24gdG8gaXRzIHN0YXRlLlxuICpcbiAqIEluIHRoZSBjYXNlIG9mIGEgbmV3IHRhYiBib2R5IHRoYXQgc2hvdWxkIGltbWVkaWF0ZWx5IGJlIGNlbnRlcmVkIHdpdGggYW4gYW5pbWF0aW5nIHRyYW5zaXRpb24sXG4gKiB0aGVuIGxlZnQtb3JpZ2luLWNlbnRlciBvciByaWdodC1vcmlnaW4tY2VudGVyIGNhbiBiZSB1c2VkLCB3aGljaCB3aWxsIHVzZSBsZWZ0IG9yIHJpZ2h0IGFzIGl0c1xuICogcHN1ZWRvLXByaW9yIHN0YXRlLlxuICovXG5leHBvcnQgdHlwZSBNY1RhYkJvZHlQb3NpdGlvblN0YXRlID1cbiAgICAnbGVmdCcgfCAnY2VudGVyJyB8ICdyaWdodCcgfCAnbGVmdC1vcmlnaW4tY2VudGVyJyB8ICdyaWdodC1vcmlnaW4tY2VudGVyJztcblxuLyoqXG4gKiBUaGUgb3JpZ2luIHN0YXRlIGlzIGFuIGludGVybmFsbHkgdXNlZCBzdGF0ZSB0aGF0IGlzIHNldCBvbiBhIG5ldyB0YWIgYm9keSBpbmRpY2F0aW5nIGlmIGl0XG4gKiBiZWdhbiB0byB0aGUgbGVmdCBvciByaWdodCBvZiB0aGUgcHJpb3Igc2VsZWN0ZWQgaW5kZXguIEZvciBleGFtcGxlLCBpZiB0aGUgc2VsZWN0ZWQgaW5kZXggd2FzXG4gKiBzZXQgdG8gMSwgYW5kIGEgbmV3IHRhYiBpcyBjcmVhdGVkIGFuZCBzZWxlY3RlZCBhdCBpbmRleCAyLCB0aGVuIHRoZSB0YWIgYm9keSB3b3VsZCBoYXZlIGFuXG4gKiBvcmlnaW4gb2YgcmlnaHQgYmVjYXVzZSBpdHMgaW5kZXggd2FzIGdyZWF0ZXIgdGhhbiB0aGUgcHJpb3Igc2VsZWN0ZWQgaW5kZXguXG4gKi9cbmV4cG9ydCB0eXBlIE1jVGFiQm9keU9yaWdpblN0YXRlID0gJ2xlZnQnIHwgJ3JpZ2h0JztcblxuLyoqXG4gKiBXcmFwcGVyIGZvciB0aGUgY29udGVudHMgb2YgYSB0YWIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFiLWJvZHknLFxuICAgIHRlbXBsYXRlVXJsOiAndGFiLWJvZHkuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3RhYi1ib2R5LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGFuaW1hdGlvbnM6IFttY1RhYnNBbmltYXRpb25zLnRyYW5zbGF0ZVRhYl0sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRhYi1ib2R5J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUYWJCb2R5IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIFRoZSBzaGlmdGVkIGluZGV4IHBvc2l0aW9uIG9mIHRoZSB0YWIgYm9keSwgd2hlcmUgemVybyByZXByZXNlbnRzIHRoZSBhY3RpdmUgY2VudGVyIHRhYi4gKi9cbiAgICBASW5wdXQoKVxuICAgIHNldCBwb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb25JbmRleCA9IHBvc2l0aW9uO1xuICAgICAgICB0aGlzLmNvbXB1dGVQb3NpdGlvbkFuaW1hdGlvblN0YXRlKCk7XG4gICAgfVxuXG4gICAgLyoqIFRhYiBib2R5IHBvc2l0aW9uIHN0YXRlLiBVc2VkIGJ5IHRoZSBhbmltYXRpb24gdHJpZ2dlciBmb3IgdGhlIGN1cnJlbnQgc3RhdGUuICovXG4gICAgYm9keVBvc2l0aW9uOiBNY1RhYkJvZHlQb3NpdGlvblN0YXRlO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgdGFiIGJlZ2lucyB0byBhbmltYXRlIHRvd2FyZHMgdGhlIGNlbnRlciBhcyB0aGUgYWN0aXZlIHRhYi4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgb25DZW50ZXJpbmc6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCBiZWZvcmUgdGhlIGNlbnRlcmluZyBvZiB0aGUgdGFiIGJlZ2lucy4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgYmVmb3JlQ2VudGVyaW5nOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCBiZWZvcmUgdGhlIGNlbnRlcmluZyBvZiB0aGUgdGFiIGJlZ2lucy4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgYWZ0ZXJMZWF2aW5nQ2VudGVyOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSB0YWIgY29tcGxldGVzIGl0cyBhbmltYXRpb24gdG93YXJkcyB0aGUgY2VudGVyLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBvbkNlbnRlcmVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KHRydWUpO1xuXG4gICAgLyoqIFRoZSBwb3J0YWwgaG9zdCBpbnNpZGUgb2YgdGhpcyBjb250YWluZXIgaW50byB3aGljaCB0aGUgdGFiIGJvZHkgY29udGVudCB3aWxsIGJlIGxvYWRlZC4gKi9cbiAgICBAVmlld0NoaWxkKENka1BvcnRhbE91dGxldCwge3N0YXRpYzogZmFsc2V9KSBwb3J0YWxIb3N0OiBDZGtQb3J0YWxPdXRsZXQ7XG5cbiAgICAvKiogVGhlIHRhYiBib2R5IGNvbnRlbnQgdG8gZGlzcGxheS4gKi9cbiAgICBASW5wdXQoJ2NvbnRlbnQnKSBjb250ZW50OiBUZW1wbGF0ZVBvcnRhbDtcblxuICAgIC8qKiBQb3NpdGlvbiB0aGF0IHdpbGwgYmUgdXNlZCB3aGVuIHRoZSB0YWIgaXMgaW1tZWRpYXRlbHkgYmVjb21pbmcgdmlzaWJsZSBhZnRlciBjcmVhdGlvbi4gKi9cbiAgICBASW5wdXQoKSBvcmlnaW46IG51bWJlcjtcblxuICAgIC8vIE5vdGUgdGhhdCB0aGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGFsd2F5cyBiZSBvdmVyd3JpdHRlbiBieSBgTWNUYWJCb2R5YCwgYnV0IHdlIG5lZWQgb25lXG4gICAgLy8gYW55d2F5IHRvIHByZXZlbnQgdGhlIGFuaW1hdGlvbnMgbW9kdWxlIGZyb20gdGhyb3dpbmcgYW4gZXJyb3IgaWYgdGhlIGJvZHkgaXMgdXNlZCBvbiBpdHMgb3duLlxuICAgIC8qKiBEdXJhdGlvbiBmb3IgdGhlIHRhYidzIGFuaW1hdGlvbi4gKi9cbiAgICBASW5wdXQoKSBhbmltYXRpb25EdXJhdGlvbjogc3RyaW5nID0gJzBtcyc7XG5cbiAgICAvKiogQ3VycmVudCBwb3NpdGlvbiBvZiB0aGUgdGFiLWJvZHkgaW4gdGhlIHRhYi1ncm91cC4gWmVybyBtZWFucyB0aGF0IHRoZSB0YWIgaXMgdmlzaWJsZS4gKi9cbiAgICBwcml2YXRlIHBvc2l0aW9uSW5kZXg6IG51bWJlcjtcblxuICAgIC8qKiBTdWJzY3JpcHRpb24gdG8gdGhlIGRpcmVjdGlvbmFsaXR5IGNoYW5nZSBvYnNlcnZhYmxlLiAqL1xuICAgIHByaXZhdGUgZGlyQ2hhbmdlU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgICAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlyICYmIGNoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgICAgICB0aGlzLmRpckNoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuZGlyLmNoYW5nZS5zdWJzY3JpYmUoKGRpcmVjdGlvbjogRGlyZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wdXRlUG9zaXRpb25BbmltYXRpb25TdGF0ZShkaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZnRlciBpbml0aWFsaXplZCwgY2hlY2sgaWYgdGhlIGNvbnRlbnQgaXMgY2VudGVyZWQgYW5kIGhhcyBhbiBvcmlnaW4uIElmIHNvLCBzZXQgdGhlXG4gICAgICogc3BlY2lhbCBwb3NpdGlvbiBzdGF0ZXMgdGhhdCB0cmFuc2l0aW9uIHRoZSB0YWIgZnJvbSB0aGUgbGVmdCBvciByaWdodCBiZWZvcmUgY2VudGVyaW5nLlxuICAgICAqL1xuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5ib2R5UG9zaXRpb24gPT09ICdjZW50ZXInICYmIHRoaXMub3JpZ2luICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keVBvc2l0aW9uID0gdGhpcy5jb21wdXRlUG9zaXRpb25Gcm9tT3JpZ2luKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kaXJDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBvblRyYW5zbGF0ZVRhYlN0YXJ0ZWQoZTogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaXNDZW50ZXJpbmcgPSB0aGlzLmlzQ2VudGVyUG9zaXRpb24oZS50b1N0YXRlKTtcbiAgICAgICAgdGhpcy5iZWZvcmVDZW50ZXJpbmcuZW1pdChpc0NlbnRlcmluZyk7XG4gICAgICAgIGlmIChpc0NlbnRlcmluZykge1xuICAgICAgICAgICAgdGhpcy5vbkNlbnRlcmluZy5lbWl0KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRyYW5zbGF0ZVRhYkNvbXBsZXRlKGU6IEFuaW1hdGlvbkV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8vIElmIHRoZSB0cmFuc2l0aW9uIHRvIHRoZSBjZW50ZXIgaXMgY29tcGxldGUsIGVtaXQgYW4gZXZlbnQuXG4gICAgICAgIGlmICh0aGlzLmlzQ2VudGVyUG9zaXRpb24oZS50b1N0YXRlKSAmJiB0aGlzLmlzQ2VudGVyUG9zaXRpb24odGhpcy5ib2R5UG9zaXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2VudGVyZWQuZW1pdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNDZW50ZXJQb3NpdGlvbihlLmZyb21TdGF0ZSkgJiYgIXRoaXMuaXNDZW50ZXJQb3NpdGlvbih0aGlzLmJvZHlQb3NpdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuYWZ0ZXJMZWF2aW5nQ2VudGVyLmVtaXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBUaGUgdGV4dCBkaXJlY3Rpb24gb2YgdGhlIGNvbnRhaW5pbmcgYXBwLiAqL1xuICAgIGdldExheW91dERpcmVjdGlvbigpOiBEaXJlY3Rpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXIgJiYgdGhpcy5kaXIudmFsdWUgPT09ICdydGwnID8gJ3J0bCcgOiAnbHRyJztcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgcHJvdmlkZWQgcG9zaXRpb24gc3RhdGUgaXMgY29uc2lkZXJlZCBjZW50ZXIsIHJlZ2FyZGxlc3Mgb2Ygb3JpZ2luLiAqL1xuICAgIGlzQ2VudGVyUG9zaXRpb24ocG9zaXRpb246IE1jVGFiQm9keVBvc2l0aW9uU3RhdGUgfCBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHBvc2l0aW9uID09PSAnY2VudGVyJyB8fFxuICAgICAgICAgICAgcG9zaXRpb24gPT09ICdsZWZ0LW9yaWdpbi1jZW50ZXInIHx8XG4gICAgICAgICAgICBwb3NpdGlvbiA9PT0gJ3JpZ2h0LW9yaWdpbi1jZW50ZXInO1xuICAgIH1cblxuICAgIC8qKiBDb21wdXRlcyB0aGUgcG9zaXRpb24gc3RhdGUgdGhhdCB3aWxsIGJlIHVzZWQgZm9yIHRoZSB0YWItYm9keSBhbmltYXRpb24gdHJpZ2dlci4gKi9cbiAgICBwcml2YXRlIGNvbXB1dGVQb3NpdGlvbkFuaW1hdGlvblN0YXRlKGRpcjogRGlyZWN0aW9uID0gdGhpcy5nZXRMYXlvdXREaXJlY3Rpb24oKSkge1xuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbkluZGV4IDwgMCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5UG9zaXRpb24gPSBkaXIgPT09ICdsdHInID8gJ2xlZnQnIDogJ3JpZ2h0JztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBvc2l0aW9uSW5kZXggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmJvZHlQb3NpdGlvbiA9IGRpciA9PT0gJ2x0cicgPyAncmlnaHQnIDogJ2xlZnQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ib2R5UG9zaXRpb24gPSAnY2VudGVyJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbXB1dGVzIHRoZSBwb3NpdGlvbiBzdGF0ZSBiYXNlZCBvbiB0aGUgc3BlY2lmaWVkIG9yaWdpbiBwb3NpdGlvbi4gVGhpcyBpcyB1c2VkIGlmIHRoZVxuICAgICAqIHRhYiBpcyBiZWNvbWluZyB2aXNpYmxlIGltbWVkaWF0ZWx5IGFmdGVyIGNyZWF0aW9uLlxuICAgICAqL1xuICAgIHByaXZhdGUgY29tcHV0ZVBvc2l0aW9uRnJvbU9yaWdpbigpOiBNY1RhYkJvZHlQb3NpdGlvblN0YXRlIHtcbiAgICAgICAgY29uc3QgZGlyID0gdGhpcy5nZXRMYXlvdXREaXJlY3Rpb24oKTtcblxuICAgICAgICBpZiAoKGRpciA9PT0gJ2x0cicgJiYgdGhpcy5vcmlnaW4gPD0gMCkgfHwgKGRpciA9PT0gJ3J0bCcgJiYgdGhpcy5vcmlnaW4gPiAwKSkge1xuICAgICAgICAgICAgcmV0dXJuICdsZWZ0LW9yaWdpbi1jZW50ZXInO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICdyaWdodC1vcmlnaW4tY2VudGVyJztcbiAgICB9XG59XG5cbi8qKlxuICogVGhlIHBvcnRhbCBob3N0IGRpcmVjdGl2ZSBmb3IgdGhlIGNvbnRlbnRzIG9mIHRoZSB0YWIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jVGFiQm9keUhvc3RdJ1xufSlcbmV4cG9ydCBjbGFzcyBNY1RhYkJvZHlQb3J0YWwgZXh0ZW5kcyBDZGtQb3J0YWxPdXRsZXQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byBldmVudHMgZm9yIHdoZW4gdGhlIHRhYiBib2R5IGJlZ2lucyBjZW50ZXJpbmcuICovXG4gICAgcHJpdmF0ZSBjZW50ZXJpbmdTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byBldmVudHMgZm9yIHdoZW4gdGhlIHRhYiBib2R5IGZpbmlzaGVzIGxlYXZpbmcgZnJvbSBjZW50ZXIgcG9zaXRpb24uICovXG4gICAgcHJpdmF0ZSBsZWF2aW5nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTWNUYWJCb2R5KSkgcHJpdmF0ZSBob3N0OiBNY1RhYkJvZHkpIHtcbiAgICAgICAgc3VwZXIoY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCB2aWV3Q29udGFpbmVyUmVmKTtcbiAgICB9XG5cbiAgICAvKiogU2V0IGluaXRpYWwgdmlzaWJpbGl0eSBvciBzZXQgdXAgc3Vic2NyaXB0aW9uIGZvciBjaGFuZ2luZyB2aXNpYmlsaXR5LiAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgICAgIHRoaXMuY2VudGVyaW5nU3ViID0gdGhpcy5ob3N0LmJlZm9yZUNlbnRlcmluZ1xuICAgICAgICAgICAgLnBpcGUoc3RhcnRXaXRoKHRoaXMuaG9zdC5pc0NlbnRlclBvc2l0aW9uKHRoaXMuaG9zdC5ib2R5UG9zaXRpb24pKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGlzQ2VudGVyaW5nOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlzQ2VudGVyaW5nICYmICF0aGlzLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2godGhpcy5ob3N0LmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubGVhdmluZ1N1YiA9IHRoaXMuaG9zdC5hZnRlckxlYXZpbmdDZW50ZXIuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBDbGVhbiB1cCBjZW50ZXJpbmcgc3Vic2NyaXB0aW9uLiAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgICAgICB0aGlzLmNlbnRlcmluZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLmxlYXZpbmdTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG59XG4iXX0=