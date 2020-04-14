/**
 * @fileoverview added by tsickle
 * Generated from: tab-body.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class McTabBody {
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
export class McTabBodyPortal extends CdkPortalOutlet {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWJvZHkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvdGFicy8iLCJzb3VyY2VzIjpbInRhYi1ib2R5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLGNBQWMsRUFBYSxNQUFNLG1CQUFtQixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEUsT0FBTyxFQUNILFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsS0FBSyxFQUNMLE1BQU0sRUFDTixNQUFNLEVBQ04sWUFBWSxFQUdaLFVBQVUsRUFDVixTQUFTLEVBQ1QsUUFBUSxFQUNSLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsd0JBQXdCLEVBQ3hCLGdCQUFnQixFQUNoQixVQUFVLEVBQ1YsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7OztBQXVDckQsTUFBTSxPQUFPLFNBQVM7Ozs7OztJQTRDbEIsWUFDWSxVQUFtQyxFQUN2QixHQUFtQixFQUN2QyxpQkFBb0M7UUFGNUIsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFDdkIsUUFBRyxHQUFILEdBQUcsQ0FBZ0I7Ozs7UUFqQ3hCLGdCQUFXLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7Ozs7UUFHL0Qsb0JBQWUsR0FBMEIsSUFBSSxZQUFZLEVBQVcsQ0FBQzs7OztRQUdyRSx1QkFBa0IsR0FBMEIsSUFBSSxZQUFZLEVBQVcsQ0FBQzs7OztRQUd4RSxlQUFVLEdBQXVCLElBQUksWUFBWSxDQUFPLElBQUksQ0FBQyxDQUFDOzs7Ozs7UUFjeEUsc0JBQWlCLEdBQVcsS0FBSyxDQUFDOzs7O1FBTW5DLDBCQUFxQixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFPL0MsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLGlCQUFpQixFQUFFO1lBQy9CLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU07aUJBQ3ZDLFNBQVM7Ozs7WUFBQyxDQUFDLFNBQW9CLEVBQUUsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM5QyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNyQyxDQUFDLEVBQUMsQ0FBQztTQUNWO0lBQ0wsQ0FBQzs7Ozs7O0lBckRELElBQ0ksUUFBUSxDQUFDLFFBQWdCO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO0lBQ3pDLENBQUM7Ozs7OztJQXVERCxRQUFRO1FBQ0osSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtZQUN2RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1NBQ3hEO0lBQ0wsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDN0MsQ0FBQzs7Ozs7SUFFRCxxQkFBcUIsQ0FBQyxDQUFpQjs7Y0FDN0IsV0FBVyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3BELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXZDLElBQUksV0FBVyxFQUFFO1lBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDckU7SUFDTCxDQUFDOzs7OztJQUVELHNCQUFzQixDQUFDLENBQWlCO1FBQ3BDLDhEQUE4RDtRQUM5RCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUM5RSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzFCO1FBRUQsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNqRixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDbEM7SUFDTCxDQUFDOzs7OztJQUdELGtCQUFrQjtRQUNkLE9BQU8sSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2hFLENBQUM7Ozs7OztJQUdELGdCQUFnQixDQUFDLFFBQXlDO1FBQ3RELE9BQU8sUUFBUSxLQUFLLFFBQVEsSUFBSSxRQUFRLEtBQUssb0JBQW9CLElBQUksUUFBUSxLQUFLLHFCQUFxQixDQUFDO0lBQzVHLENBQUM7Ozs7Ozs7SUFHTyw2QkFBNkIsQ0FBQyxNQUFpQixJQUFJLENBQUMsa0JBQWtCLEVBQUU7UUFDNUUsSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsRUFBRTtZQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1NBQ3hEO2FBQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsRUFBRTtZQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1NBQ3hEO2FBQU07WUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQztTQUNoQztJQUNMLENBQUM7Ozs7Ozs7SUFNTyx5QkFBeUI7O2NBQ3ZCLEdBQUcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7UUFFckMsSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRTtZQUMzRSxPQUFPLG9CQUFvQixDQUFDO1NBQy9CO1FBRUQsT0FBTyxxQkFBcUIsQ0FBQztJQUNqQyxDQUFDOzs7WUF4SUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxhQUFhO2dCQUN2Qiw4V0FBNEI7Z0JBRTVCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsVUFBVSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO2dCQUMzQyxJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLGFBQWE7aUJBQ3ZCOzthQUNKOzs7O1lBbkRHLFVBQVU7WUFYTCxjQUFjLHVCQTZHZCxRQUFRO1lBekdiLGlCQUFpQjs7O3VCQThEaEIsS0FBSzswQkFVTCxNQUFNOzhCQUdOLE1BQU07aUNBR04sTUFBTTt5QkFHTixNQUFNO3lCQUdOLFNBQVMsU0FBQyxlQUFlLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDO3NCQUcxQyxLQUFLLFNBQUMsU0FBUztxQkFHZixLQUFLO2dDQUtMLEtBQUs7Ozs7Ozs7SUExQk4saUNBQXFDOzs7OztJQUdyQyxnQ0FBa0Y7Ozs7O0lBR2xGLG9DQUF3Rjs7Ozs7SUFHeEYsdUNBQTJGOzs7OztJQUczRiwrQkFBaUY7Ozs7O0lBR2pGLCtCQUF5RTs7Ozs7SUFHekUsNEJBQTBDOzs7OztJQUcxQywyQkFBd0I7Ozs7O0lBS3hCLHNDQUEyQzs7Ozs7O0lBRzNDLGtDQUE4Qjs7Ozs7O0lBRzlCLDBDQUFtRDs7Ozs7SUFHL0MsK0JBQTJDOzs7OztJQUMzQyx3QkFBdUM7Ozs7OztBQXlGL0MsTUFBTSxPQUFPLGVBQWdCLFNBQVEsZUFBZTs7Ozs7O0lBTWhELFlBQ0ksd0JBQWtELEVBQ2xELGdCQUFrQyxFQUNXLElBQWU7UUFDNUQsS0FBSyxDQUFDLHdCQUF3QixFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFETCxTQUFJLEdBQUosSUFBSSxDQUFXOzs7O1FBUHhELGlCQUFZLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQzs7OztRQUVsQyxlQUFVLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztJQU94QyxDQUFDOzs7OztJQUdELFFBQVE7UUFDSixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWU7YUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzthQUNuRSxTQUFTOzs7O1FBQUMsQ0FBQyxXQUFvQixFQUFFLEVBQUU7WUFDaEMsSUFBSSxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNsQztRQUNMLENBQUMsRUFBQyxDQUFDO1FBRVAsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVM7OztRQUFDLEdBQUcsRUFBRTtZQUMxRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUdELFdBQVc7UUFDUCxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7OztZQXRDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjthQUM5Qjs7OztZQXJMRyx3QkFBd0I7WUFDeEIsZ0JBQWdCO1lBOEx1QyxTQUFTLHVCQUEzRCxNQUFNLFNBQUMsVUFBVTs7O29CQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsRUFBQzs7Ozs7Ozs7SUFQdkMsdUNBQTBDOzs7Ozs7SUFFMUMscUNBQXdDOzs7OztJQUtwQywrQkFBNEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHksIERpcmVjdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IFRlbXBsYXRlUG9ydGFsLCBDZGtQb3J0YWxPdXRsZXQgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIElucHV0LFxuICAgIEluamVjdCxcbiAgICBPdXRwdXQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgRWxlbWVudFJlZixcbiAgICBEaXJlY3RpdmUsXG4gICAgT3B0aW9uYWwsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgZm9yd2FyZFJlZixcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgbWNUYWJzQW5pbWF0aW9ucyB9IGZyb20gJy4vdGFicy1hbmltYXRpb25zJztcblxuXG4vKipcbiAqIFRoZXNlIHBvc2l0aW9uIHN0YXRlcyBhcmUgdXNlZCBpbnRlcm5hbGx5IGFzIGFuaW1hdGlvbiBzdGF0ZXMgZm9yIHRoZSB0YWIgYm9keS4gU2V0dGluZyB0aGVcbiAqIHBvc2l0aW9uIHN0YXRlIHRvIGxlZnQsIHJpZ2h0LCBvciBjZW50ZXIgd2lsbCB0cmFuc2l0aW9uIHRoZSB0YWIgYm9keSBmcm9tIGl0cyBjdXJyZW50XG4gKiBwb3NpdGlvbiB0byBpdHMgcmVzcGVjdGl2ZSBzdGF0ZS4gSWYgdGhlcmUgaXMgbm90IGN1cnJlbnQgcG9zaXRpb24gKHZvaWQsIGluIHRoZSBjYXNlIG9mIGEgbmV3XG4gKiB0YWIgYm9keSksIHRoZW4gdGhlcmUgd2lsbCBiZSBubyB0cmFuc2l0aW9uIGFuaW1hdGlvbiB0byBpdHMgc3RhdGUuXG4gKlxuICogSW4gdGhlIGNhc2Ugb2YgYSBuZXcgdGFiIGJvZHkgdGhhdCBzaG91bGQgaW1tZWRpYXRlbHkgYmUgY2VudGVyZWQgd2l0aCBhbiBhbmltYXRpbmcgdHJhbnNpdGlvbixcbiAqIHRoZW4gbGVmdC1vcmlnaW4tY2VudGVyIG9yIHJpZ2h0LW9yaWdpbi1jZW50ZXIgY2FuIGJlIHVzZWQsIHdoaWNoIHdpbGwgdXNlIGxlZnQgb3IgcmlnaHQgYXMgaXRzXG4gKiBwc3VlZG8tcHJpb3Igc3RhdGUuXG4gKi9cbmV4cG9ydCB0eXBlIE1jVGFiQm9keVBvc2l0aW9uU3RhdGUgPVxuICAgICdsZWZ0JyB8ICdjZW50ZXInIHwgJ3JpZ2h0JyB8ICdsZWZ0LW9yaWdpbi1jZW50ZXInIHwgJ3JpZ2h0LW9yaWdpbi1jZW50ZXInO1xuXG4vKipcbiAqIFRoZSBvcmlnaW4gc3RhdGUgaXMgYW4gaW50ZXJuYWxseSB1c2VkIHN0YXRlIHRoYXQgaXMgc2V0IG9uIGEgbmV3IHRhYiBib2R5IGluZGljYXRpbmcgaWYgaXRcbiAqIGJlZ2FuIHRvIHRoZSBsZWZ0IG9yIHJpZ2h0IG9mIHRoZSBwcmlvciBzZWxlY3RlZCBpbmRleC4gRm9yIGV4YW1wbGUsIGlmIHRoZSBzZWxlY3RlZCBpbmRleCB3YXNcbiAqIHNldCB0byAxLCBhbmQgYSBuZXcgdGFiIGlzIGNyZWF0ZWQgYW5kIHNlbGVjdGVkIGF0IGluZGV4IDIsIHRoZW4gdGhlIHRhYiBib2R5IHdvdWxkIGhhdmUgYW5cbiAqIG9yaWdpbiBvZiByaWdodCBiZWNhdXNlIGl0cyBpbmRleCB3YXMgZ3JlYXRlciB0aGFuIHRoZSBwcmlvciBzZWxlY3RlZCBpbmRleC5cbiAqL1xuZXhwb3J0IHR5cGUgTWNUYWJCb2R5T3JpZ2luU3RhdGUgPSAnbGVmdCcgfCAncmlnaHQnO1xuXG4vKipcbiAqIFdyYXBwZXIgZm9yIHRoZSBjb250ZW50cyBvZiBhIHRhYi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy10YWItYm9keScsXG4gICAgdGVtcGxhdGVVcmw6ICd0YWItYm9keS5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsndGFiLWJvZHkuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgYW5pbWF0aW9uczogW21jVGFic0FuaW1hdGlvbnMudHJhbnNsYXRlVGFiXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdGFiLWJvZHknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1RhYkJvZHkgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICAvKiogVGhlIHNoaWZ0ZWQgaW5kZXggcG9zaXRpb24gb2YgdGhlIHRhYiBib2R5LCB3aGVyZSB6ZXJvIHJlcHJlc2VudHMgdGhlIGFjdGl2ZSBjZW50ZXIgdGFiLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IHBvc2l0aW9uKHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbkluZGV4ID0gcG9zaXRpb247XG4gICAgICAgIHRoaXMuY29tcHV0ZVBvc2l0aW9uQW5pbWF0aW9uU3RhdGUoKTtcbiAgICB9XG5cbiAgICAvKiogVGFiIGJvZHkgcG9zaXRpb24gc3RhdGUuIFVzZWQgYnkgdGhlIGFuaW1hdGlvbiB0cmlnZ2VyIGZvciB0aGUgY3VycmVudCBzdGF0ZS4gKi9cbiAgICBib2R5UG9zaXRpb246IE1jVGFiQm9keVBvc2l0aW9uU3RhdGU7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSB0YWIgYmVnaW5zIHRvIGFuaW1hdGUgdG93YXJkcyB0aGUgY2VudGVyIGFzIHRoZSBhY3RpdmUgdGFiLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBvbkNlbnRlcmluZzogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIGJlZm9yZSB0aGUgY2VudGVyaW5nIG9mIHRoZSB0YWIgYmVnaW5zLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBiZWZvcmVDZW50ZXJpbmc6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIGJlZm9yZSB0aGUgY2VudGVyaW5nIG9mIHRoZSB0YWIgYmVnaW5zLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBhZnRlckxlYXZpbmdDZW50ZXI6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHRhYiBjb21wbGV0ZXMgaXRzIGFuaW1hdGlvbiB0b3dhcmRzIHRoZSBjZW50ZXIuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IG9uQ2VudGVyZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4odHJ1ZSk7XG5cbiAgICAvKiogVGhlIHBvcnRhbCBob3N0IGluc2lkZSBvZiB0aGlzIGNvbnRhaW5lciBpbnRvIHdoaWNoIHRoZSB0YWIgYm9keSBjb250ZW50IHdpbGwgYmUgbG9hZGVkLiAqL1xuICAgIEBWaWV3Q2hpbGQoQ2RrUG9ydGFsT3V0bGV0LCB7c3RhdGljOiBmYWxzZX0pIHBvcnRhbEhvc3Q6IENka1BvcnRhbE91dGxldDtcblxuICAgIC8qKiBUaGUgdGFiIGJvZHkgY29udGVudCB0byBkaXNwbGF5LiAqL1xuICAgIEBJbnB1dCgnY29udGVudCcpIGNvbnRlbnQ6IFRlbXBsYXRlUG9ydGFsO1xuXG4gICAgLyoqIFBvc2l0aW9uIHRoYXQgd2lsbCBiZSB1c2VkIHdoZW4gdGhlIHRhYiBpcyBpbW1lZGlhdGVseSBiZWNvbWluZyB2aXNpYmxlIGFmdGVyIGNyZWF0aW9uLiAqL1xuICAgIEBJbnB1dCgpIG9yaWdpbjogbnVtYmVyO1xuXG4gICAgLy8gTm90ZSB0aGF0IHRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYWx3YXlzIGJlIG92ZXJ3cml0dGVuIGJ5IGBNY1RhYkJvZHlgLCBidXQgd2UgbmVlZCBvbmVcbiAgICAvLyBhbnl3YXkgdG8gcHJldmVudCB0aGUgYW5pbWF0aW9ucyBtb2R1bGUgZnJvbSB0aHJvd2luZyBhbiBlcnJvciBpZiB0aGUgYm9keSBpcyB1c2VkIG9uIGl0cyBvd24uXG4gICAgLyoqIER1cmF0aW9uIGZvciB0aGUgdGFiJ3MgYW5pbWF0aW9uLiAqL1xuICAgIEBJbnB1dCgpIGFuaW1hdGlvbkR1cmF0aW9uOiBzdHJpbmcgPSAnMG1zJztcblxuICAgIC8qKiBDdXJyZW50IHBvc2l0aW9uIG9mIHRoZSB0YWItYm9keSBpbiB0aGUgdGFiLWdyb3VwLiBaZXJvIG1lYW5zIHRoYXQgdGhlIHRhYiBpcyB2aXNpYmxlLiAqL1xuICAgIHByaXZhdGUgcG9zaXRpb25JbmRleDogbnVtYmVyO1xuXG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byB0aGUgZGlyZWN0aW9uYWxpdHkgY2hhbmdlIG9ic2VydmFibGUuICovXG4gICAgcHJpdmF0ZSBkaXJDaGFuZ2VTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHtcbiAgICAgICAgaWYgKHRoaXMuZGlyICYmIGNoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgICAgICB0aGlzLmRpckNoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuZGlyLmNoYW5nZVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKGRpcmVjdGlvbjogRGlyZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcHV0ZVBvc2l0aW9uQW5pbWF0aW9uU3RhdGUoZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZnRlciBpbml0aWFsaXplZCwgY2hlY2sgaWYgdGhlIGNvbnRlbnQgaXMgY2VudGVyZWQgYW5kIGhhcyBhbiBvcmlnaW4uIElmIHNvLCBzZXQgdGhlXG4gICAgICogc3BlY2lhbCBwb3NpdGlvbiBzdGF0ZXMgdGhhdCB0cmFuc2l0aW9uIHRoZSB0YWIgZnJvbSB0aGUgbGVmdCBvciByaWdodCBiZWZvcmUgY2VudGVyaW5nLlxuICAgICAqL1xuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5ib2R5UG9zaXRpb24gPT09ICdjZW50ZXInICYmIHRoaXMub3JpZ2luICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keVBvc2l0aW9uID0gdGhpcy5jb21wdXRlUG9zaXRpb25Gcm9tT3JpZ2luKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kaXJDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBvblRyYW5zbGF0ZVRhYlN0YXJ0ZWQoZTogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaXNDZW50ZXJpbmcgPSB0aGlzLmlzQ2VudGVyUG9zaXRpb24oZS50b1N0YXRlKTtcbiAgICAgICAgdGhpcy5iZWZvcmVDZW50ZXJpbmcuZW1pdChpc0NlbnRlcmluZyk7XG5cbiAgICAgICAgaWYgKGlzQ2VudGVyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2VudGVyaW5nLmVtaXQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVHJhbnNsYXRlVGFiQ29tcGxldGUoZTogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gSWYgdGhlIHRyYW5zaXRpb24gdG8gdGhlIGNlbnRlciBpcyBjb21wbGV0ZSwgZW1pdCBhbiBldmVudC5cbiAgICAgICAgaWYgKHRoaXMuaXNDZW50ZXJQb3NpdGlvbihlLnRvU3RhdGUpICYmIHRoaXMuaXNDZW50ZXJQb3NpdGlvbih0aGlzLmJvZHlQb3NpdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMub25DZW50ZXJlZC5lbWl0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc0NlbnRlclBvc2l0aW9uKGUuZnJvbVN0YXRlKSAmJiAhdGhpcy5pc0NlbnRlclBvc2l0aW9uKHRoaXMuYm9keVBvc2l0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5hZnRlckxlYXZpbmdDZW50ZXIuZW1pdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFRoZSB0ZXh0IGRpcmVjdGlvbiBvZiB0aGUgY29udGFpbmluZyBhcHAuICovXG4gICAgZ2V0TGF5b3V0RGlyZWN0aW9uKCk6IERpcmVjdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpciAmJiB0aGlzLmRpci52YWx1ZSA9PT0gJ3J0bCcgPyAncnRsJyA6ICdsdHInO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBwcm92aWRlZCBwb3NpdGlvbiBzdGF0ZSBpcyBjb25zaWRlcmVkIGNlbnRlciwgcmVnYXJkbGVzcyBvZiBvcmlnaW4uICovXG4gICAgaXNDZW50ZXJQb3NpdGlvbihwb3NpdGlvbjogTWNUYWJCb2R5UG9zaXRpb25TdGF0ZSB8IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gcG9zaXRpb24gPT09ICdjZW50ZXInIHx8IHBvc2l0aW9uID09PSAnbGVmdC1vcmlnaW4tY2VudGVyJyB8fCBwb3NpdGlvbiA9PT0gJ3JpZ2h0LW9yaWdpbi1jZW50ZXInO1xuICAgIH1cblxuICAgIC8qKiBDb21wdXRlcyB0aGUgcG9zaXRpb24gc3RhdGUgdGhhdCB3aWxsIGJlIHVzZWQgZm9yIHRoZSB0YWItYm9keSBhbmltYXRpb24gdHJpZ2dlci4gKi9cbiAgICBwcml2YXRlIGNvbXB1dGVQb3NpdGlvbkFuaW1hdGlvblN0YXRlKGRpcjogRGlyZWN0aW9uID0gdGhpcy5nZXRMYXlvdXREaXJlY3Rpb24oKSkge1xuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbkluZGV4IDwgMCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5UG9zaXRpb24gPSBkaXIgPT09ICdsdHInID8gJ2xlZnQnIDogJ3JpZ2h0JztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBvc2l0aW9uSW5kZXggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmJvZHlQb3NpdGlvbiA9IGRpciA9PT0gJ2x0cicgPyAncmlnaHQnIDogJ2xlZnQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ib2R5UG9zaXRpb24gPSAnY2VudGVyJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbXB1dGVzIHRoZSBwb3NpdGlvbiBzdGF0ZSBiYXNlZCBvbiB0aGUgc3BlY2lmaWVkIG9yaWdpbiBwb3NpdGlvbi4gVGhpcyBpcyB1c2VkIGlmIHRoZVxuICAgICAqIHRhYiBpcyBiZWNvbWluZyB2aXNpYmxlIGltbWVkaWF0ZWx5IGFmdGVyIGNyZWF0aW9uLlxuICAgICAqL1xuICAgIHByaXZhdGUgY29tcHV0ZVBvc2l0aW9uRnJvbU9yaWdpbigpOiBNY1RhYkJvZHlQb3NpdGlvblN0YXRlIHtcbiAgICAgICAgY29uc3QgZGlyID0gdGhpcy5nZXRMYXlvdXREaXJlY3Rpb24oKTtcblxuICAgICAgICBpZiAoKGRpciA9PT0gJ2x0cicgJiYgdGhpcy5vcmlnaW4gPD0gMCkgfHwgKGRpciA9PT0gJ3J0bCcgJiYgdGhpcy5vcmlnaW4gPiAwKSkge1xuICAgICAgICAgICAgcmV0dXJuICdsZWZ0LW9yaWdpbi1jZW50ZXInO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICdyaWdodC1vcmlnaW4tY2VudGVyJztcbiAgICB9XG59XG5cbi8qKlxuICogVGhlIHBvcnRhbCBob3N0IGRpcmVjdGl2ZSBmb3IgdGhlIGNvbnRlbnRzIG9mIHRoZSB0YWIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jVGFiQm9keUhvc3RdJ1xufSlcbmV4cG9ydCBjbGFzcyBNY1RhYkJvZHlQb3J0YWwgZXh0ZW5kcyBDZGtQb3J0YWxPdXRsZXQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byBldmVudHMgZm9yIHdoZW4gdGhlIHRhYiBib2R5IGJlZ2lucyBjZW50ZXJpbmcuICovXG4gICAgcHJpdmF0ZSBjZW50ZXJpbmdTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byBldmVudHMgZm9yIHdoZW4gdGhlIHRhYiBib2R5IGZpbmlzaGVzIGxlYXZpbmcgZnJvbSBjZW50ZXIgcG9zaXRpb24uICovXG4gICAgcHJpdmF0ZSBsZWF2aW5nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTWNUYWJCb2R5KSkgcHJpdmF0ZSBob3N0OiBNY1RhYkJvZHkpIHtcbiAgICAgICAgc3VwZXIoY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCB2aWV3Q29udGFpbmVyUmVmKTtcbiAgICB9XG5cbiAgICAvKiogU2V0IGluaXRpYWwgdmlzaWJpbGl0eSBvciBzZXQgdXAgc3Vic2NyaXB0aW9uIGZvciBjaGFuZ2luZyB2aXNpYmlsaXR5LiAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgICAgIHRoaXMuY2VudGVyaW5nU3ViID0gdGhpcy5ob3N0LmJlZm9yZUNlbnRlcmluZ1xuICAgICAgICAgICAgLnBpcGUoc3RhcnRXaXRoKHRoaXMuaG9zdC5pc0NlbnRlclBvc2l0aW9uKHRoaXMuaG9zdC5ib2R5UG9zaXRpb24pKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGlzQ2VudGVyaW5nOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlzQ2VudGVyaW5nICYmICF0aGlzLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2godGhpcy5ob3N0LmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubGVhdmluZ1N1YiA9IHRoaXMuaG9zdC5hZnRlckxlYXZpbmdDZW50ZXIuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBDbGVhbiB1cCBjZW50ZXJpbmcgc3Vic2NyaXB0aW9uLiAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgICAgICB0aGlzLmNlbnRlcmluZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLmxlYXZpbmdTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG59XG4iXX0=