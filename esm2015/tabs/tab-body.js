/**
 * @fileoverview added by tsickle
 * Generated from: tab-body.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWJvZHkuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy90YWJzLyIsInNvdXJjZXMiOlsidGFiLWJvZHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsY0FBYyxFQUFhLE1BQU0sbUJBQW1CLENBQUM7QUFDOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RSxPQUFPLEVBQ0gsU0FBUyxFQUNULGlCQUFpQixFQUNqQixLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTixZQUFZLEVBR1osVUFBVSxFQUNWLFNBQVMsRUFDVCxRQUFRLEVBQ1IsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2Qix3QkFBd0IsRUFDeEIsZ0JBQWdCLEVBQ2hCLFVBQVUsRUFDVixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7O0FBdUNyRCxNQUFNLE9BQU8sU0FBUzs7Ozs7O0lBNENsQixZQUNZLFVBQW1DLEVBQ3ZCLEdBQW1CLEVBQ3ZDLGlCQUFvQztRQUY1QixlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUN2QixRQUFHLEdBQUgsR0FBRyxDQUFnQjs7OztRQWpDeEIsZ0JBQVcsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQzs7OztRQUcvRCxvQkFBZSxHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDOzs7O1FBR3JFLHVCQUFrQixHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDOzs7O1FBR3hFLGVBQVUsR0FBdUIsSUFBSSxZQUFZLENBQU8sSUFBSSxDQUFDLENBQUM7Ozs7OztRQWN4RSxzQkFBaUIsR0FBVyxLQUFLLENB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O1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7O1lBdENKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2FBQzlCOzs7O1lBckxHLHdCQUF3QjtZQUN4QixnQkFBZ0I7WUE4THVDLFNBQVMsdUJBQTNELE1BQU0sU0FBQyxVQUFVOzs7b0JBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxFQUFDOzs7Ozs7OztJQVB2Qyx1Q0FBMEM7Ozs7OztJQUUxQyxxQ0FBd0M7Ozs7O0lBS3BDLCtCQUE0RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSwgRGlyZWN0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgVGVtcGxhdGVQb3J0YWwsIENka1BvcnRhbE91dGxldCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgSW5wdXQsXG4gICAgSW5qZWN0LFxuICAgIE91dHB1dCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBFbGVtZW50UmVmLFxuICAgIERpcmVjdGl2ZSxcbiAgICBPcHRpb25hbCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBmb3J3YXJkUmVmLFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBtY1RhYnNBbmltYXRpb25zIH0gZnJvbSAnLi90YWJzLWFuaW1hdGlvbnMnO1xuXG5cbi8qKlxuICogVGhlc2UgcG9zaXRpb24gc3RhdGVzIGFyZSB1c2VkIGludGVybmFsbHkgYXMgYW5pbWF0aW9uIHN0YXRlcyBmb3IgdGhlIHRhYiBib2R5LiBTZXR0aW5nIHRoZVxuICogcG9zaXRpb24gc3RhdGUgdG8gbGVmdCwgcmlnaHQsIG9yIGNlbnRlciB3aWxsIHRyYW5zaXRpb24gdGhlIHRhYiBib2R5IGZyb20gaXRzIGN1cnJlbnRcbiAqIHBvc2l0aW9uIHRvIGl0cyByZXNwZWN0aXZlIHN0YXRlLiBJZiB0aGVyZSBpcyBub3QgY3VycmVudCBwb3NpdGlvbiAodm9pZCwgaW4gdGhlIGNhc2Ugb2YgYSBuZXdcbiAqIHRhYiBib2R5KSwgdGhlbiB0aGVyZSB3aWxsIGJlIG5vIHRyYW5zaXRpb24gYW5pbWF0aW9uIHRvIGl0cyBzdGF0ZS5cbiAqXG4gKiBJbiB0aGUgY2FzZSBvZiBhIG5ldyB0YWIgYm9keSB0aGF0IHNob3VsZCBpbW1lZGlhdGVseSBiZSBjZW50ZXJlZCB3aXRoIGFuIGFuaW1hdGluZyB0cmFuc2l0aW9uLFxuICogdGhlbiBsZWZ0LW9yaWdpbi1jZW50ZXIgb3IgcmlnaHQtb3JpZ2luLWNlbnRlciBjYW4gYmUgdXNlZCwgd2hpY2ggd2lsbCB1c2UgbGVmdCBvciByaWdodCBhcyBpdHNcbiAqIHBzdWVkby1wcmlvciBzdGF0ZS5cbiAqL1xuZXhwb3J0IHR5cGUgTWNUYWJCb2R5UG9zaXRpb25TdGF0ZSA9XG4gICAgJ2xlZnQnIHwgJ2NlbnRlcicgfCAncmlnaHQnIHwgJ2xlZnQtb3JpZ2luLWNlbnRlcicgfCAncmlnaHQtb3JpZ2luLWNlbnRlcic7XG5cbi8qKlxuICogVGhlIG9yaWdpbiBzdGF0ZSBpcyBhbiBpbnRlcm5hbGx5IHVzZWQgc3RhdGUgdGhhdCBpcyBzZXQgb24gYSBuZXcgdGFiIGJvZHkgaW5kaWNhdGluZyBpZiBpdFxuICogYmVnYW4gdG8gdGhlIGxlZnQgb3IgcmlnaHQgb2YgdGhlIHByaW9yIHNlbGVjdGVkIGluZGV4LiBGb3IgZXhhbXBsZSwgaWYgdGhlIHNlbGVjdGVkIGluZGV4IHdhc1xuICogc2V0IHRvIDEsIGFuZCBhIG5ldyB0YWIgaXMgY3JlYXRlZCBhbmQgc2VsZWN0ZWQgYXQgaW5kZXggMiwgdGhlbiB0aGUgdGFiIGJvZHkgd291bGQgaGF2ZSBhblxuICogb3JpZ2luIG9mIHJpZ2h0IGJlY2F1c2UgaXRzIGluZGV4IHdhcyBncmVhdGVyIHRoYW4gdGhlIHByaW9yIHNlbGVjdGVkIGluZGV4LlxuICovXG5leHBvcnQgdHlwZSBNY1RhYkJvZHlPcmlnaW5TdGF0ZSA9ICdsZWZ0JyB8ICdyaWdodCc7XG5cbi8qKlxuICogV3JhcHBlciBmb3IgdGhlIGNvbnRlbnRzIG9mIGEgdGFiLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRhYi1ib2R5JyxcbiAgICB0ZW1wbGF0ZVVybDogJ3RhYi1ib2R5Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWyd0YWItYm9keS5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBhbmltYXRpb25zOiBbbWNUYWJzQW5pbWF0aW9ucy50cmFuc2xhdGVUYWJdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy10YWItYm9keSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVGFiQm9keSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIC8qKiBUaGUgc2hpZnRlZCBpbmRleCBwb3NpdGlvbiBvZiB0aGUgdGFiIGJvZHksIHdoZXJlIHplcm8gcmVwcmVzZW50cyB0aGUgYWN0aXZlIGNlbnRlciB0YWIuICovXG4gICAgQElucHV0KClcbiAgICBzZXQgcG9zaXRpb24ocG9zaXRpb246IG51bWJlcikge1xuICAgICAgICB0aGlzLnBvc2l0aW9uSW5kZXggPSBwb3NpdGlvbjtcbiAgICAgICAgdGhpcy5jb21wdXRlUG9zaXRpb25BbmltYXRpb25TdGF0ZSgpO1xuICAgIH1cblxuICAgIC8qKiBUYWIgYm9keSBwb3NpdGlvbiBzdGF0ZS4gVXNlZCBieSB0aGUgYW5pbWF0aW9uIHRyaWdnZXIgZm9yIHRoZSBjdXJyZW50IHN0YXRlLiAqL1xuICAgIGJvZHlQb3NpdGlvbjogTWNUYWJCb2R5UG9zaXRpb25TdGF0ZTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHRhYiBiZWdpbnMgdG8gYW5pbWF0ZSB0b3dhcmRzIHRoZSBjZW50ZXIgYXMgdGhlIGFjdGl2ZSB0YWIuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IG9uQ2VudGVyaW5nOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgYmVmb3JlIHRoZSBjZW50ZXJpbmcgb2YgdGhlIHRhYiBiZWdpbnMuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGJlZm9yZUNlbnRlcmluZzogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgYmVmb3JlIHRoZSBjZW50ZXJpbmcgb2YgdGhlIHRhYiBiZWdpbnMuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGFmdGVyTGVhdmluZ0NlbnRlcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgdGFiIGNvbXBsZXRlcyBpdHMgYW5pbWF0aW9uIHRvd2FyZHMgdGhlIGNlbnRlci4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgb25DZW50ZXJlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPih0cnVlKTtcblxuICAgIC8qKiBUaGUgcG9ydGFsIGhvc3QgaW5zaWRlIG9mIHRoaXMgY29udGFpbmVyIGludG8gd2hpY2ggdGhlIHRhYiBib2R5IGNvbnRlbnQgd2lsbCBiZSBsb2FkZWQuICovXG4gICAgQFZpZXdDaGlsZChDZGtQb3J0YWxPdXRsZXQsIHtzdGF0aWM6IGZhbHNlfSkgcG9ydGFsSG9zdDogQ2RrUG9ydGFsT3V0bGV0O1xuXG4gICAgLyoqIFRoZSB0YWIgYm9keSBjb250ZW50IHRvIGRpc3BsYXkuICovXG4gICAgQElucHV0KCdjb250ZW50JykgY29udGVudDogVGVtcGxhdGVQb3J0YWw7XG5cbiAgICAvKiogUG9zaXRpb24gdGhhdCB3aWxsIGJlIHVzZWQgd2hlbiB0aGUgdGFiIGlzIGltbWVkaWF0ZWx5IGJlY29taW5nIHZpc2libGUgYWZ0ZXIgY3JlYXRpb24uICovXG4gICAgQElucHV0KCkgb3JpZ2luOiBudW1iZXI7XG5cbiAgICAvLyBOb3RlIHRoYXQgdGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBhbHdheXMgYmUgb3ZlcndyaXR0ZW4gYnkgYE1jVGFiQm9keWAsIGJ1dCB3ZSBuZWVkIG9uZVxuICAgIC8vIGFueXdheSB0byBwcmV2ZW50IHRoZSBhbmltYXRpb25zIG1vZHVsZSBmcm9tIHRocm93aW5nIGFuIGVycm9yIGlmIHRoZSBib2R5IGlzIHVzZWQgb24gaXRzIG93bi5cbiAgICAvKiogRHVyYXRpb24gZm9yIHRoZSB0YWIncyBhbmltYXRpb24uICovXG4gICAgQElucHV0KCkgYW5pbWF0aW9uRHVyYXRpb246IHN0cmluZyA9ICcwbXMnO1xuXG4gICAgLyoqIEN1cnJlbnQgcG9zaXRpb24gb2YgdGhlIHRhYi1ib2R5IGluIHRoZSB0YWItZ3JvdXAuIFplcm8gbWVhbnMgdGhhdCB0aGUgdGFiIGlzIHZpc2libGUuICovXG4gICAgcHJpdmF0ZSBwb3NpdGlvbkluZGV4OiBudW1iZXI7XG5cbiAgICAvKiogU3Vic2NyaXB0aW9uIHRvIHRoZSBkaXJlY3Rpb25hbGl0eSBjaGFuZ2Ugb2JzZXJ2YWJsZS4gKi9cbiAgICBwcml2YXRlIGRpckNoYW5nZVN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkge1xuICAgICAgICBpZiAodGhpcy5kaXIgJiYgY2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuZGlyQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5kaXIuY2hhbmdlXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoZGlyZWN0aW9uOiBEaXJlY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wdXRlUG9zaXRpb25BbmltYXRpb25TdGF0ZShkaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFmdGVyIGluaXRpYWxpemVkLCBjaGVjayBpZiB0aGUgY29udGVudCBpcyBjZW50ZXJlZCBhbmQgaGFzIGFuIG9yaWdpbi4gSWYgc28sIHNldCB0aGVcbiAgICAgKiBzcGVjaWFsIHBvc2l0aW9uIHN0YXRlcyB0aGF0IHRyYW5zaXRpb24gdGhlIHRhYiBmcm9tIHRoZSBsZWZ0IG9yIHJpZ2h0IGJlZm9yZSBjZW50ZXJpbmcuXG4gICAgICovXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmJvZHlQb3NpdGlvbiA9PT0gJ2NlbnRlcicgJiYgdGhpcy5vcmlnaW4gIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5UG9zaXRpb24gPSB0aGlzLmNvbXB1dGVQb3NpdGlvbkZyb21PcmlnaW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRpckNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIG9uVHJhbnNsYXRlVGFiU3RhcnRlZChlOiBBbmltYXRpb25FdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBpc0NlbnRlcmluZyA9IHRoaXMuaXNDZW50ZXJQb3NpdGlvbihlLnRvU3RhdGUpO1xuICAgICAgICB0aGlzLmJlZm9yZUNlbnRlcmluZy5lbWl0KGlzQ2VudGVyaW5nKTtcblxuICAgICAgICBpZiAoaXNDZW50ZXJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMub25DZW50ZXJpbmcuZW1pdCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25UcmFuc2xhdGVUYWJDb21wbGV0ZShlOiBBbmltYXRpb25FdmVudCk6IHZvaWQge1xuICAgICAgICAvLyBJZiB0aGUgdHJhbnNpdGlvbiB0byB0aGUgY2VudGVyIGlzIGNvbXBsZXRlLCBlbWl0IGFuIGV2ZW50LlxuICAgICAgICBpZiAodGhpcy5pc0NlbnRlclBvc2l0aW9uKGUudG9TdGF0ZSkgJiYgdGhpcy5pc0NlbnRlclBvc2l0aW9uKHRoaXMuYm9keVBvc2l0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5vbkNlbnRlcmVkLmVtaXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzQ2VudGVyUG9zaXRpb24oZS5mcm9tU3RhdGUpICYmICF0aGlzLmlzQ2VudGVyUG9zaXRpb24odGhpcy5ib2R5UG9zaXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLmFmdGVyTGVhdmluZ0NlbnRlci5lbWl0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVGhlIHRleHQgZGlyZWN0aW9uIG9mIHRoZSBjb250YWluaW5nIGFwcC4gKi9cbiAgICBnZXRMYXlvdXREaXJlY3Rpb24oKTogRGlyZWN0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlyICYmIHRoaXMuZGlyLnZhbHVlID09PSAncnRsJyA/ICdydGwnIDogJ2x0cic7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHByb3ZpZGVkIHBvc2l0aW9uIHN0YXRlIGlzIGNvbnNpZGVyZWQgY2VudGVyLCByZWdhcmRsZXNzIG9mIG9yaWdpbi4gKi9cbiAgICBpc0NlbnRlclBvc2l0aW9uKHBvc2l0aW9uOiBNY1RhYkJvZHlQb3NpdGlvblN0YXRlIHwgc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBwb3NpdGlvbiA9PT0gJ2NlbnRlcicgfHwgcG9zaXRpb24gPT09ICdsZWZ0LW9yaWdpbi1jZW50ZXInIHx8IHBvc2l0aW9uID09PSAncmlnaHQtb3JpZ2luLWNlbnRlcic7XG4gICAgfVxuXG4gICAgLyoqIENvbXB1dGVzIHRoZSBwb3NpdGlvbiBzdGF0ZSB0aGF0IHdpbGwgYmUgdXNlZCBmb3IgdGhlIHRhYi1ib2R5IGFuaW1hdGlvbiB0cmlnZ2VyLiAqL1xuICAgIHByaXZhdGUgY29tcHV0ZVBvc2l0aW9uQW5pbWF0aW9uU3RhdGUoZGlyOiBEaXJlY3Rpb24gPSB0aGlzLmdldExheW91dERpcmVjdGlvbigpKSB7XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uSW5kZXggPCAwKSB7XG4gICAgICAgICAgICB0aGlzLmJvZHlQb3NpdGlvbiA9IGRpciA9PT0gJ2x0cicgPyAnbGVmdCcgOiAncmlnaHQnO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucG9zaXRpb25JbmRleCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuYm9keVBvc2l0aW9uID0gZGlyID09PSAnbHRyJyA/ICdyaWdodCcgOiAnbGVmdCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJvZHlQb3NpdGlvbiA9ICdjZW50ZXInO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tcHV0ZXMgdGhlIHBvc2l0aW9uIHN0YXRlIGJhc2VkIG9uIHRoZSBzcGVjaWZpZWQgb3JpZ2luIHBvc2l0aW9uLiBUaGlzIGlzIHVzZWQgaWYgdGhlXG4gICAgICogdGFiIGlzIGJlY29taW5nIHZpc2libGUgaW1tZWRpYXRlbHkgYWZ0ZXIgY3JlYXRpb24uXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb21wdXRlUG9zaXRpb25Gcm9tT3JpZ2luKCk6IE1jVGFiQm9keVBvc2l0aW9uU3RhdGUge1xuICAgICAgICBjb25zdCBkaXIgPSB0aGlzLmdldExheW91dERpcmVjdGlvbigpO1xuXG4gICAgICAgIGlmICgoZGlyID09PSAnbHRyJyAmJiB0aGlzLm9yaWdpbiA8PSAwKSB8fCAoZGlyID09PSAncnRsJyAmJiB0aGlzLm9yaWdpbiA+IDApKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2xlZnQtb3JpZ2luLWNlbnRlcic7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJ3JpZ2h0LW9yaWdpbi1jZW50ZXInO1xuICAgIH1cbn1cblxuLyoqXG4gKiBUaGUgcG9ydGFsIGhvc3QgZGlyZWN0aXZlIGZvciB0aGUgY29udGVudHMgb2YgdGhlIHRhYi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNUYWJCb2R5SG9zdF0nXG59KVxuZXhwb3J0IGNsYXNzIE1jVGFiQm9keVBvcnRhbCBleHRlbmRzIENka1BvcnRhbE91dGxldCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICAvKiogU3Vic2NyaXB0aW9uIHRvIGV2ZW50cyBmb3Igd2hlbiB0aGUgdGFiIGJvZHkgYmVnaW5zIGNlbnRlcmluZy4gKi9cbiAgICBwcml2YXRlIGNlbnRlcmluZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAvKiogU3Vic2NyaXB0aW9uIHRvIGV2ZW50cyBmb3Igd2hlbiB0aGUgdGFiIGJvZHkgZmluaXNoZXMgbGVhdmluZyBmcm9tIGNlbnRlciBwb3NpdGlvbi4gKi9cbiAgICBwcml2YXRlIGxlYXZpbmdTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBNY1RhYkJvZHkpKSBwcml2YXRlIGhvc3Q6IE1jVGFiQm9keSkge1xuICAgICAgICBzdXBlcihjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHZpZXdDb250YWluZXJSZWYpO1xuICAgIH1cblxuICAgIC8qKiBTZXQgaW5pdGlhbCB2aXNpYmlsaXR5IG9yIHNldCB1cCBzdWJzY3JpcHRpb24gZm9yIGNoYW5naW5nIHZpc2liaWxpdHkuICovXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgdGhpcy5jZW50ZXJpbmdTdWIgPSB0aGlzLmhvc3QuYmVmb3JlQ2VudGVyaW5nXG4gICAgICAgICAgICAucGlwZShzdGFydFdpdGgodGhpcy5ob3N0LmlzQ2VudGVyUG9zaXRpb24odGhpcy5ob3N0LmJvZHlQb3NpdGlvbikpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoaXNDZW50ZXJpbmc6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXNDZW50ZXJpbmcgJiYgIXRoaXMuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFjaCh0aGlzLmhvc3QuY29udGVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5sZWF2aW5nU3ViID0gdGhpcy5ob3N0LmFmdGVyTGVhdmluZ0NlbnRlci5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIENsZWFuIHVwIGNlbnRlcmluZyBzdWJzY3JpcHRpb24uICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgICAgIHRoaXMuY2VudGVyaW5nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMubGVhdmluZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbn1cbiJdfQ==