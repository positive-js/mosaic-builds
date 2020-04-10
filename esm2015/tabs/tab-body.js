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
            this.dirChangeSubscription = this.dir.change.subscribe((/**
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
        return position === 'center' ||
            position === 'left-origin-center' ||
            position === 'right-origin-center';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWJvZHkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvdGFicy8iLCJzb3VyY2VzIjpbInRhYi1ib2R5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLGNBQWMsRUFBYSxNQUFNLG1CQUFtQixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEUsT0FBTyxFQUNILFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsS0FBSyxFQUNMLE1BQU0sRUFDTixNQUFNLEVBQ04sWUFBWSxFQUdaLFVBQVUsRUFDVixTQUFTLEVBQ1QsUUFBUSxFQUNSLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsd0JBQXdCLEVBQ3hCLGdCQUFnQixFQUNoQixVQUFVLEVBQ1YsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7OztBQXVDckQsTUFBTSxPQUFPLFNBQVM7Ozs7OztJQTRDbEIsWUFBb0IsVUFBbUMsRUFDdkIsR0FBbUIsRUFDdkMsaUJBQW9DO1FBRjVCLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQ3ZCLFFBQUcsR0FBSCxHQUFHLENBQWdCOzs7O1FBaENoQyxnQkFBVyxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDOzs7O1FBRy9ELG9CQUFlLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7Ozs7UUFHckUsdUJBQWtCLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7Ozs7UUFHeEUsZUFBVSxHQUF1QixJQUFJLFlBQVksQ0FBTyxJQUFJLENBQUMsQ0FBQzs7Ozs7O1FBY3hFLHNCQUFpQixHQUFXLEtBQUssQ0FBQzs7OztRQU1uQyww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Q0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7O1lBdENKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2FBQzlCOzs7O1lBcExHLHdCQUF3QjtZQUN4QixnQkFBZ0I7WUE2THVDLFNBQVMsdUJBQTNELE1BQU0sU0FBQyxVQUFVOzs7b0JBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxFQUFDOzs7Ozs7OztJQVB2Qyx1Q0FBMEM7Ozs7OztJQUUxQyxxQ0FBd0M7Ozs7O0lBS3BDLCtCQUE0RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSwgRGlyZWN0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgVGVtcGxhdGVQb3J0YWwsIENka1BvcnRhbE91dGxldCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgSW5wdXQsXG4gICAgSW5qZWN0LFxuICAgIE91dHB1dCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBFbGVtZW50UmVmLFxuICAgIERpcmVjdGl2ZSxcbiAgICBPcHRpb25hbCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBmb3J3YXJkUmVmLFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBtY1RhYnNBbmltYXRpb25zIH0gZnJvbSAnLi90YWJzLWFuaW1hdGlvbnMnO1xuXG5cbi8qKlxuICogVGhlc2UgcG9zaXRpb24gc3RhdGVzIGFyZSB1c2VkIGludGVybmFsbHkgYXMgYW5pbWF0aW9uIHN0YXRlcyBmb3IgdGhlIHRhYiBib2R5LiBTZXR0aW5nIHRoZVxuICogcG9zaXRpb24gc3RhdGUgdG8gbGVmdCwgcmlnaHQsIG9yIGNlbnRlciB3aWxsIHRyYW5zaXRpb24gdGhlIHRhYiBib2R5IGZyb20gaXRzIGN1cnJlbnRcbiAqIHBvc2l0aW9uIHRvIGl0cyByZXNwZWN0aXZlIHN0YXRlLiBJZiB0aGVyZSBpcyBub3QgY3VycmVudCBwb3NpdGlvbiAodm9pZCwgaW4gdGhlIGNhc2Ugb2YgYSBuZXdcbiAqIHRhYiBib2R5KSwgdGhlbiB0aGVyZSB3aWxsIGJlIG5vIHRyYW5zaXRpb24gYW5pbWF0aW9uIHRvIGl0cyBzdGF0ZS5cbiAqXG4gKiBJbiB0aGUgY2FzZSBvZiBhIG5ldyB0YWIgYm9keSB0aGF0IHNob3VsZCBpbW1lZGlhdGVseSBiZSBjZW50ZXJlZCB3aXRoIGFuIGFuaW1hdGluZyB0cmFuc2l0aW9uLFxuICogdGhlbiBsZWZ0LW9yaWdpbi1jZW50ZXIgb3IgcmlnaHQtb3JpZ2luLWNlbnRlciBjYW4gYmUgdXNlZCwgd2hpY2ggd2lsbCB1c2UgbGVmdCBvciByaWdodCBhcyBpdHNcbiAqIHBzdWVkby1wcmlvciBzdGF0ZS5cbiAqL1xuZXhwb3J0IHR5cGUgTWNUYWJCb2R5UG9zaXRpb25TdGF0ZSA9XG4gICAgJ2xlZnQnIHwgJ2NlbnRlcicgfCAncmlnaHQnIHwgJ2xlZnQtb3JpZ2luLWNlbnRlcicgfCAncmlnaHQtb3JpZ2luLWNlbnRlcic7XG5cbi8qKlxuICogVGhlIG9yaWdpbiBzdGF0ZSBpcyBhbiBpbnRlcm5hbGx5IHVzZWQgc3RhdGUgdGhhdCBpcyBzZXQgb24gYSBuZXcgdGFiIGJvZHkgaW5kaWNhdGluZyBpZiBpdFxuICogYmVnYW4gdG8gdGhlIGxlZnQgb3IgcmlnaHQgb2YgdGhlIHByaW9yIHNlbGVjdGVkIGluZGV4LiBGb3IgZXhhbXBsZSwgaWYgdGhlIHNlbGVjdGVkIGluZGV4IHdhc1xuICogc2V0IHRvIDEsIGFuZCBhIG5ldyB0YWIgaXMgY3JlYXRlZCBhbmQgc2VsZWN0ZWQgYXQgaW5kZXggMiwgdGhlbiB0aGUgdGFiIGJvZHkgd291bGQgaGF2ZSBhblxuICogb3JpZ2luIG9mIHJpZ2h0IGJlY2F1c2UgaXRzIGluZGV4IHdhcyBncmVhdGVyIHRoYW4gdGhlIHByaW9yIHNlbGVjdGVkIGluZGV4LlxuICovXG5leHBvcnQgdHlwZSBNY1RhYkJvZHlPcmlnaW5TdGF0ZSA9ICdsZWZ0JyB8ICdyaWdodCc7XG5cbi8qKlxuICogV3JhcHBlciBmb3IgdGhlIGNvbnRlbnRzIG9mIGEgdGFiLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRhYi1ib2R5JyxcbiAgICB0ZW1wbGF0ZVVybDogJ3RhYi1ib2R5Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWyd0YWItYm9keS5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBhbmltYXRpb25zOiBbbWNUYWJzQW5pbWF0aW9ucy50cmFuc2xhdGVUYWJdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy10YWItYm9keSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVGFiQm9keSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIC8qKiBUaGUgc2hpZnRlZCBpbmRleCBwb3NpdGlvbiBvZiB0aGUgdGFiIGJvZHksIHdoZXJlIHplcm8gcmVwcmVzZW50cyB0aGUgYWN0aXZlIGNlbnRlciB0YWIuICovXG4gICAgQElucHV0KClcbiAgICBzZXQgcG9zaXRpb24ocG9zaXRpb246IG51bWJlcikge1xuICAgICAgICB0aGlzLnBvc2l0aW9uSW5kZXggPSBwb3NpdGlvbjtcbiAgICAgICAgdGhpcy5jb21wdXRlUG9zaXRpb25BbmltYXRpb25TdGF0ZSgpO1xuICAgIH1cblxuICAgIC8qKiBUYWIgYm9keSBwb3NpdGlvbiBzdGF0ZS4gVXNlZCBieSB0aGUgYW5pbWF0aW9uIHRyaWdnZXIgZm9yIHRoZSBjdXJyZW50IHN0YXRlLiAqL1xuICAgIGJvZHlQb3NpdGlvbjogTWNUYWJCb2R5UG9zaXRpb25TdGF0ZTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHRhYiBiZWdpbnMgdG8gYW5pbWF0ZSB0b3dhcmRzIHRoZSBjZW50ZXIgYXMgdGhlIGFjdGl2ZSB0YWIuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IG9uQ2VudGVyaW5nOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgYmVmb3JlIHRoZSBjZW50ZXJpbmcgb2YgdGhlIHRhYiBiZWdpbnMuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGJlZm9yZUNlbnRlcmluZzogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgYmVmb3JlIHRoZSBjZW50ZXJpbmcgb2YgdGhlIHRhYiBiZWdpbnMuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGFmdGVyTGVhdmluZ0NlbnRlcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgdGFiIGNvbXBsZXRlcyBpdHMgYW5pbWF0aW9uIHRvd2FyZHMgdGhlIGNlbnRlci4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgb25DZW50ZXJlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPih0cnVlKTtcblxuICAgIC8qKiBUaGUgcG9ydGFsIGhvc3QgaW5zaWRlIG9mIHRoaXMgY29udGFpbmVyIGludG8gd2hpY2ggdGhlIHRhYiBib2R5IGNvbnRlbnQgd2lsbCBiZSBsb2FkZWQuICovXG4gICAgQFZpZXdDaGlsZChDZGtQb3J0YWxPdXRsZXQsIHtzdGF0aWM6IGZhbHNlfSkgcG9ydGFsSG9zdDogQ2RrUG9ydGFsT3V0bGV0O1xuXG4gICAgLyoqIFRoZSB0YWIgYm9keSBjb250ZW50IHRvIGRpc3BsYXkuICovXG4gICAgQElucHV0KCdjb250ZW50JykgY29udGVudDogVGVtcGxhdGVQb3J0YWw7XG5cbiAgICAvKiogUG9zaXRpb24gdGhhdCB3aWxsIGJlIHVzZWQgd2hlbiB0aGUgdGFiIGlzIGltbWVkaWF0ZWx5IGJlY29taW5nIHZpc2libGUgYWZ0ZXIgY3JlYXRpb24uICovXG4gICAgQElucHV0KCkgb3JpZ2luOiBudW1iZXI7XG5cbiAgICAvLyBOb3RlIHRoYXQgdGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBhbHdheXMgYmUgb3ZlcndyaXR0ZW4gYnkgYE1jVGFiQm9keWAsIGJ1dCB3ZSBuZWVkIG9uZVxuICAgIC8vIGFueXdheSB0byBwcmV2ZW50IHRoZSBhbmltYXRpb25zIG1vZHVsZSBmcm9tIHRocm93aW5nIGFuIGVycm9yIGlmIHRoZSBib2R5IGlzIHVzZWQgb24gaXRzIG93bi5cbiAgICAvKiogRHVyYXRpb24gZm9yIHRoZSB0YWIncyBhbmltYXRpb24uICovXG4gICAgQElucHV0KCkgYW5pbWF0aW9uRHVyYXRpb246IHN0cmluZyA9ICcwbXMnO1xuXG4gICAgLyoqIEN1cnJlbnQgcG9zaXRpb24gb2YgdGhlIHRhYi1ib2R5IGluIHRoZSB0YWItZ3JvdXAuIFplcm8gbWVhbnMgdGhhdCB0aGUgdGFiIGlzIHZpc2libGUuICovXG4gICAgcHJpdmF0ZSBwb3NpdGlvbkluZGV4OiBudW1iZXI7XG5cbiAgICAvKiogU3Vic2NyaXB0aW9uIHRvIHRoZSBkaXJlY3Rpb25hbGl0eSBjaGFuZ2Ugb2JzZXJ2YWJsZS4gKi9cbiAgICBwcml2YXRlIGRpckNoYW5nZVN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICAgICAgICAgIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuXG4gICAgICAgIGlmICh0aGlzLmRpciAmJiBjaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICAgICAgdGhpcy5kaXJDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLmRpci5jaGFuZ2Uuc3Vic2NyaWJlKChkaXJlY3Rpb246IERpcmVjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcHV0ZVBvc2l0aW9uQW5pbWF0aW9uU3RhdGUoZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWZ0ZXIgaW5pdGlhbGl6ZWQsIGNoZWNrIGlmIHRoZSBjb250ZW50IGlzIGNlbnRlcmVkIGFuZCBoYXMgYW4gb3JpZ2luLiBJZiBzbywgc2V0IHRoZVxuICAgICAqIHNwZWNpYWwgcG9zaXRpb24gc3RhdGVzIHRoYXQgdHJhbnNpdGlvbiB0aGUgdGFiIGZyb20gdGhlIGxlZnQgb3IgcmlnaHQgYmVmb3JlIGNlbnRlcmluZy5cbiAgICAgKi9cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYm9keVBvc2l0aW9uID09PSAnY2VudGVyJyAmJiB0aGlzLm9yaWdpbiAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmJvZHlQb3NpdGlvbiA9IHRoaXMuY29tcHV0ZVBvc2l0aW9uRnJvbU9yaWdpbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGlyQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgb25UcmFuc2xhdGVUYWJTdGFydGVkKGU6IEFuaW1hdGlvbkV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGlzQ2VudGVyaW5nID0gdGhpcy5pc0NlbnRlclBvc2l0aW9uKGUudG9TdGF0ZSk7XG4gICAgICAgIHRoaXMuYmVmb3JlQ2VudGVyaW5nLmVtaXQoaXNDZW50ZXJpbmcpO1xuICAgICAgICBpZiAoaXNDZW50ZXJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMub25DZW50ZXJpbmcuZW1pdCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25UcmFuc2xhdGVUYWJDb21wbGV0ZShlOiBBbmltYXRpb25FdmVudCk6IHZvaWQge1xuICAgICAgICAvLyBJZiB0aGUgdHJhbnNpdGlvbiB0byB0aGUgY2VudGVyIGlzIGNvbXBsZXRlLCBlbWl0IGFuIGV2ZW50LlxuICAgICAgICBpZiAodGhpcy5pc0NlbnRlclBvc2l0aW9uKGUudG9TdGF0ZSkgJiYgdGhpcy5pc0NlbnRlclBvc2l0aW9uKHRoaXMuYm9keVBvc2l0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5vbkNlbnRlcmVkLmVtaXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzQ2VudGVyUG9zaXRpb24oZS5mcm9tU3RhdGUpICYmICF0aGlzLmlzQ2VudGVyUG9zaXRpb24odGhpcy5ib2R5UG9zaXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLmFmdGVyTGVhdmluZ0NlbnRlci5lbWl0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVGhlIHRleHQgZGlyZWN0aW9uIG9mIHRoZSBjb250YWluaW5nIGFwcC4gKi9cbiAgICBnZXRMYXlvdXREaXJlY3Rpb24oKTogRGlyZWN0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlyICYmIHRoaXMuZGlyLnZhbHVlID09PSAncnRsJyA/ICdydGwnIDogJ2x0cic7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHByb3ZpZGVkIHBvc2l0aW9uIHN0YXRlIGlzIGNvbnNpZGVyZWQgY2VudGVyLCByZWdhcmRsZXNzIG9mIG9yaWdpbi4gKi9cbiAgICBpc0NlbnRlclBvc2l0aW9uKHBvc2l0aW9uOiBNY1RhYkJvZHlQb3NpdGlvblN0YXRlIHwgc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBwb3NpdGlvbiA9PT0gJ2NlbnRlcicgfHxcbiAgICAgICAgICAgIHBvc2l0aW9uID09PSAnbGVmdC1vcmlnaW4tY2VudGVyJyB8fFxuICAgICAgICAgICAgcG9zaXRpb24gPT09ICdyaWdodC1vcmlnaW4tY2VudGVyJztcbiAgICB9XG5cbiAgICAvKiogQ29tcHV0ZXMgdGhlIHBvc2l0aW9uIHN0YXRlIHRoYXQgd2lsbCBiZSB1c2VkIGZvciB0aGUgdGFiLWJvZHkgYW5pbWF0aW9uIHRyaWdnZXIuICovXG4gICAgcHJpdmF0ZSBjb21wdXRlUG9zaXRpb25BbmltYXRpb25TdGF0ZShkaXI6IERpcmVjdGlvbiA9IHRoaXMuZ2V0TGF5b3V0RGlyZWN0aW9uKCkpIHtcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb25JbmRleCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuYm9keVBvc2l0aW9uID0gZGlyID09PSAnbHRyJyA/ICdsZWZ0JyA6ICdyaWdodCc7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wb3NpdGlvbkluZGV4ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5UG9zaXRpb24gPSBkaXIgPT09ICdsdHInID8gJ3JpZ2h0JyA6ICdsZWZ0JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYm9keVBvc2l0aW9uID0gJ2NlbnRlcic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb21wdXRlcyB0aGUgcG9zaXRpb24gc3RhdGUgYmFzZWQgb24gdGhlIHNwZWNpZmllZCBvcmlnaW4gcG9zaXRpb24uIFRoaXMgaXMgdXNlZCBpZiB0aGVcbiAgICAgKiB0YWIgaXMgYmVjb21pbmcgdmlzaWJsZSBpbW1lZGlhdGVseSBhZnRlciBjcmVhdGlvbi5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbXB1dGVQb3NpdGlvbkZyb21PcmlnaW4oKTogTWNUYWJCb2R5UG9zaXRpb25TdGF0ZSB7XG4gICAgICAgIGNvbnN0IGRpciA9IHRoaXMuZ2V0TGF5b3V0RGlyZWN0aW9uKCk7XG5cbiAgICAgICAgaWYgKChkaXIgPT09ICdsdHInICYmIHRoaXMub3JpZ2luIDw9IDApIHx8IChkaXIgPT09ICdydGwnICYmIHRoaXMub3JpZ2luID4gMCkpIHtcbiAgICAgICAgICAgIHJldHVybiAnbGVmdC1vcmlnaW4tY2VudGVyJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAncmlnaHQtb3JpZ2luLWNlbnRlcic7XG4gICAgfVxufVxuXG4vKipcbiAqIFRoZSBwb3J0YWwgaG9zdCBkaXJlY3RpdmUgZm9yIHRoZSBjb250ZW50cyBvZiB0aGUgdGFiLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY1RhYkJvZHlIb3N0XSdcbn0pXG5leHBvcnQgY2xhc3MgTWNUYWJCb2R5UG9ydGFsIGV4dGVuZHMgQ2RrUG9ydGFsT3V0bGV0IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKiBTdWJzY3JpcHRpb24gdG8gZXZlbnRzIGZvciB3aGVuIHRoZSB0YWIgYm9keSBiZWdpbnMgY2VudGVyaW5nLiAqL1xuICAgIHByaXZhdGUgY2VudGVyaW5nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIC8qKiBTdWJzY3JpcHRpb24gdG8gZXZlbnRzIGZvciB3aGVuIHRoZSB0YWIgYm9keSBmaW5pc2hlcyBsZWF2aW5nIGZyb20gY2VudGVyIHBvc2l0aW9uLiAqL1xuICAgIHByaXZhdGUgbGVhdmluZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE1jVGFiQm9keSkpIHByaXZhdGUgaG9zdDogTWNUYWJCb2R5KSB7XG4gICAgICAgIHN1cGVyKGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgdmlld0NvbnRhaW5lclJlZik7XG4gICAgfVxuXG4gICAgLyoqIFNldCBpbml0aWFsIHZpc2liaWxpdHkgb3Igc2V0IHVwIHN1YnNjcmlwdGlvbiBmb3IgY2hhbmdpbmcgdmlzaWJpbGl0eS4gKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICB0aGlzLmNlbnRlcmluZ1N1YiA9IHRoaXMuaG9zdC5iZWZvcmVDZW50ZXJpbmdcbiAgICAgICAgICAgIC5waXBlKHN0YXJ0V2l0aCh0aGlzLmhvc3QuaXNDZW50ZXJQb3NpdGlvbih0aGlzLmhvc3QuYm9keVBvc2l0aW9uKSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChpc0NlbnRlcmluZzogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpc0NlbnRlcmluZyAmJiAhdGhpcy5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNoKHRoaXMuaG9zdC5jb250ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmxlYXZpbmdTdWIgPSB0aGlzLmhvc3QuYWZ0ZXJMZWF2aW5nQ2VudGVyLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRldGFjaCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogQ2xlYW4gdXAgY2VudGVyaW5nIHN1YnNjcmlwdGlvbi4gKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5jZW50ZXJpbmdTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5sZWF2aW5nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxufVxuIl19