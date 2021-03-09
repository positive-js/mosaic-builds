import { Directionality } from '@angular/cdk/bidi';
import { TemplatePortal, CdkPortalOutlet } from '@angular/cdk/portal';
import { Component, ChangeDetectorRef, Input, Inject, Output, EventEmitter, ElementRef, Directive, Optional, ViewEncapsulation, ChangeDetectionStrategy, ComponentFactoryResolver, ViewContainerRef, forwardRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { mcTabsAnimations } from './tabs-animations';
/**
 * Wrapper for the contents of a tab.
 * @docs-private
 */
export class McTabBody {
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
            },] }
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
/**
 * The portal host directive for the contents of the tab.
 * @docs-private
 */
export class McTabBodyPortal extends CdkPortalOutlet {
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
    { type: McTabBody, decorators: [{ type: Inject, args: [forwardRef(() => McTabBody),] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWJvZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdGFicy90YWItYm9keS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsY0FBYyxFQUFhLE1BQU0sbUJBQW1CLENBQUM7QUFDOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RSxPQUFPLEVBQ0gsU0FBUyxFQUNULGlCQUFpQixFQUNqQixLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTixZQUFZLEVBR1osVUFBVSxFQUNWLFNBQVMsRUFDVCxRQUFRLEVBQ1IsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2Qix3QkFBd0IsRUFDeEIsZ0JBQWdCLEVBQ2hCLFVBQVUsRUFDVixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUF3QnJEOzs7R0FHRztBQVlILE1BQU0sT0FBTyxTQUFTO0lBNENsQixZQUNZLFVBQW1DLEVBQ3ZCLEdBQW1CLEVBQ3ZDLGlCQUFvQztRQUY1QixlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUN2QixRQUFHLEdBQUgsR0FBRyxDQUFnQjtRQWxDM0MseUZBQXlGO1FBQ3RFLGdCQUFXLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFFbEYsNERBQTREO1FBQ3pDLG9CQUFlLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7UUFFeEYsNERBQTREO1FBQ3pDLHVCQUFrQixHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDO1FBRTNGLDZFQUE2RTtRQUMxRCxlQUFVLEdBQXVCLElBQUksWUFBWSxDQUFPLElBQUksQ0FBQyxDQUFDO1FB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QztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2FBQzlCOzs7O1lBckxHLHdCQUF3QjtZQUN4QixnQkFBZ0I7WUE4THVDLFNBQVMsdUJBQTNELE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5LCBEaXJlY3Rpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCwgQ2RrUG9ydGFsT3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBJbnB1dCxcbiAgICBJbmplY3QsXG4gICAgT3V0cHV0LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRGlyZWN0aXZlLFxuICAgIE9wdGlvbmFsLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIGZvcndhcmRSZWYsXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IG1jVGFic0FuaW1hdGlvbnMgfSBmcm9tICcuL3RhYnMtYW5pbWF0aW9ucyc7XG5cblxuLyoqXG4gKiBUaGVzZSBwb3NpdGlvbiBzdGF0ZXMgYXJlIHVzZWQgaW50ZXJuYWxseSBhcyBhbmltYXRpb24gc3RhdGVzIGZvciB0aGUgdGFiIGJvZHkuIFNldHRpbmcgdGhlXG4gKiBwb3NpdGlvbiBzdGF0ZSB0byBsZWZ0LCByaWdodCwgb3IgY2VudGVyIHdpbGwgdHJhbnNpdGlvbiB0aGUgdGFiIGJvZHkgZnJvbSBpdHMgY3VycmVudFxuICogcG9zaXRpb24gdG8gaXRzIHJlc3BlY3RpdmUgc3RhdGUuIElmIHRoZXJlIGlzIG5vdCBjdXJyZW50IHBvc2l0aW9uICh2b2lkLCBpbiB0aGUgY2FzZSBvZiBhIG5ld1xuICogdGFiIGJvZHkpLCB0aGVuIHRoZXJlIHdpbGwgYmUgbm8gdHJhbnNpdGlvbiBhbmltYXRpb24gdG8gaXRzIHN0YXRlLlxuICpcbiAqIEluIHRoZSBjYXNlIG9mIGEgbmV3IHRhYiBib2R5IHRoYXQgc2hvdWxkIGltbWVkaWF0ZWx5IGJlIGNlbnRlcmVkIHdpdGggYW4gYW5pbWF0aW5nIHRyYW5zaXRpb24sXG4gKiB0aGVuIGxlZnQtb3JpZ2luLWNlbnRlciBvciByaWdodC1vcmlnaW4tY2VudGVyIGNhbiBiZSB1c2VkLCB3aGljaCB3aWxsIHVzZSBsZWZ0IG9yIHJpZ2h0IGFzIGl0c1xuICogcHN1ZWRvLXByaW9yIHN0YXRlLlxuICovXG5leHBvcnQgdHlwZSBNY1RhYkJvZHlQb3NpdGlvblN0YXRlID1cbiAgICAnbGVmdCcgfCAnY2VudGVyJyB8ICdyaWdodCcgfCAnbGVmdC1vcmlnaW4tY2VudGVyJyB8ICdyaWdodC1vcmlnaW4tY2VudGVyJztcblxuLyoqXG4gKiBUaGUgb3JpZ2luIHN0YXRlIGlzIGFuIGludGVybmFsbHkgdXNlZCBzdGF0ZSB0aGF0IGlzIHNldCBvbiBhIG5ldyB0YWIgYm9keSBpbmRpY2F0aW5nIGlmIGl0XG4gKiBiZWdhbiB0byB0aGUgbGVmdCBvciByaWdodCBvZiB0aGUgcHJpb3Igc2VsZWN0ZWQgaW5kZXguIEZvciBleGFtcGxlLCBpZiB0aGUgc2VsZWN0ZWQgaW5kZXggd2FzXG4gKiBzZXQgdG8gMSwgYW5kIGEgbmV3IHRhYiBpcyBjcmVhdGVkIGFuZCBzZWxlY3RlZCBhdCBpbmRleCAyLCB0aGVuIHRoZSB0YWIgYm9keSB3b3VsZCBoYXZlIGFuXG4gKiBvcmlnaW4gb2YgcmlnaHQgYmVjYXVzZSBpdHMgaW5kZXggd2FzIGdyZWF0ZXIgdGhhbiB0aGUgcHJpb3Igc2VsZWN0ZWQgaW5kZXguXG4gKi9cbmV4cG9ydCB0eXBlIE1jVGFiQm9keU9yaWdpblN0YXRlID0gJ2xlZnQnIHwgJ3JpZ2h0JztcblxuLyoqXG4gKiBXcmFwcGVyIGZvciB0aGUgY29udGVudHMgb2YgYSB0YWIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFiLWJvZHknLFxuICAgIHRlbXBsYXRlVXJsOiAndGFiLWJvZHkuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3RhYi1ib2R5LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGFuaW1hdGlvbnM6IFttY1RhYnNBbmltYXRpb25zLnRyYW5zbGF0ZVRhYl0sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRhYi1ib2R5J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUYWJCb2R5IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIFRoZSBzaGlmdGVkIGluZGV4IHBvc2l0aW9uIG9mIHRoZSB0YWIgYm9keSwgd2hlcmUgemVybyByZXByZXNlbnRzIHRoZSBhY3RpdmUgY2VudGVyIHRhYi4gKi9cbiAgICBASW5wdXQoKVxuICAgIHNldCBwb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb25JbmRleCA9IHBvc2l0aW9uO1xuICAgICAgICB0aGlzLmNvbXB1dGVQb3NpdGlvbkFuaW1hdGlvblN0YXRlKCk7XG4gICAgfVxuXG4gICAgLyoqIFRhYiBib2R5IHBvc2l0aW9uIHN0YXRlLiBVc2VkIGJ5IHRoZSBhbmltYXRpb24gdHJpZ2dlciBmb3IgdGhlIGN1cnJlbnQgc3RhdGUuICovXG4gICAgYm9keVBvc2l0aW9uOiBNY1RhYkJvZHlQb3NpdGlvblN0YXRlO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgdGFiIGJlZ2lucyB0byBhbmltYXRlIHRvd2FyZHMgdGhlIGNlbnRlciBhcyB0aGUgYWN0aXZlIHRhYi4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgb25DZW50ZXJpbmc6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCBiZWZvcmUgdGhlIGNlbnRlcmluZyBvZiB0aGUgdGFiIGJlZ2lucy4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgYmVmb3JlQ2VudGVyaW5nOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCBiZWZvcmUgdGhlIGNlbnRlcmluZyBvZiB0aGUgdGFiIGJlZ2lucy4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgYWZ0ZXJMZWF2aW5nQ2VudGVyOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSB0YWIgY29tcGxldGVzIGl0cyBhbmltYXRpb24gdG93YXJkcyB0aGUgY2VudGVyLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBvbkNlbnRlcmVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KHRydWUpO1xuXG4gICAgLyoqIFRoZSBwb3J0YWwgaG9zdCBpbnNpZGUgb2YgdGhpcyBjb250YWluZXIgaW50byB3aGljaCB0aGUgdGFiIGJvZHkgY29udGVudCB3aWxsIGJlIGxvYWRlZC4gKi9cbiAgICBAVmlld0NoaWxkKENka1BvcnRhbE91dGxldCwge3N0YXRpYzogZmFsc2V9KSBwb3J0YWxIb3N0OiBDZGtQb3J0YWxPdXRsZXQ7XG5cbiAgICAvKiogVGhlIHRhYiBib2R5IGNvbnRlbnQgdG8gZGlzcGxheS4gKi9cbiAgICBASW5wdXQoJ2NvbnRlbnQnKSBjb250ZW50OiBUZW1wbGF0ZVBvcnRhbDtcblxuICAgIC8qKiBQb3NpdGlvbiB0aGF0IHdpbGwgYmUgdXNlZCB3aGVuIHRoZSB0YWIgaXMgaW1tZWRpYXRlbHkgYmVjb21pbmcgdmlzaWJsZSBhZnRlciBjcmVhdGlvbi4gKi9cbiAgICBASW5wdXQoKSBvcmlnaW46IG51bWJlcjtcblxuICAgIC8vIE5vdGUgdGhhdCB0aGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGFsd2F5cyBiZSBvdmVyd3JpdHRlbiBieSBgTWNUYWJCb2R5YCwgYnV0IHdlIG5lZWQgb25lXG4gICAgLy8gYW55d2F5IHRvIHByZXZlbnQgdGhlIGFuaW1hdGlvbnMgbW9kdWxlIGZyb20gdGhyb3dpbmcgYW4gZXJyb3IgaWYgdGhlIGJvZHkgaXMgdXNlZCBvbiBpdHMgb3duLlxuICAgIC8qKiBEdXJhdGlvbiBmb3IgdGhlIHRhYidzIGFuaW1hdGlvbi4gKi9cbiAgICBASW5wdXQoKSBhbmltYXRpb25EdXJhdGlvbjogc3RyaW5nID0gJzBtcyc7XG5cbiAgICAvKiogQ3VycmVudCBwb3NpdGlvbiBvZiB0aGUgdGFiLWJvZHkgaW4gdGhlIHRhYi1ncm91cC4gWmVybyBtZWFucyB0aGF0IHRoZSB0YWIgaXMgdmlzaWJsZS4gKi9cbiAgICBwcml2YXRlIHBvc2l0aW9uSW5kZXg6IG51bWJlcjtcblxuICAgIC8qKiBTdWJzY3JpcHRpb24gdG8gdGhlIGRpcmVjdGlvbmFsaXR5IGNoYW5nZSBvYnNlcnZhYmxlLiAqL1xuICAgIHByaXZhdGUgZGlyQ2hhbmdlU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7XG4gICAgICAgIGlmICh0aGlzLmRpciAmJiBjaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICAgICAgdGhpcy5kaXJDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLmRpci5jaGFuZ2VcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChkaXJlY3Rpb246IERpcmVjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXB1dGVQb3NpdGlvbkFuaW1hdGlvblN0YXRlKGRpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWZ0ZXIgaW5pdGlhbGl6ZWQsIGNoZWNrIGlmIHRoZSBjb250ZW50IGlzIGNlbnRlcmVkIGFuZCBoYXMgYW4gb3JpZ2luLiBJZiBzbywgc2V0IHRoZVxuICAgICAqIHNwZWNpYWwgcG9zaXRpb24gc3RhdGVzIHRoYXQgdHJhbnNpdGlvbiB0aGUgdGFiIGZyb20gdGhlIGxlZnQgb3IgcmlnaHQgYmVmb3JlIGNlbnRlcmluZy5cbiAgICAgKi9cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYm9keVBvc2l0aW9uID09PSAnY2VudGVyJyAmJiB0aGlzLm9yaWdpbiAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmJvZHlQb3NpdGlvbiA9IHRoaXMuY29tcHV0ZVBvc2l0aW9uRnJvbU9yaWdpbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGlyQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgb25UcmFuc2xhdGVUYWJTdGFydGVkKGU6IEFuaW1hdGlvbkV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGlzQ2VudGVyaW5nID0gdGhpcy5pc0NlbnRlclBvc2l0aW9uKGUudG9TdGF0ZSk7XG4gICAgICAgIHRoaXMuYmVmb3JlQ2VudGVyaW5nLmVtaXQoaXNDZW50ZXJpbmcpO1xuXG4gICAgICAgIGlmIChpc0NlbnRlcmluZykge1xuICAgICAgICAgICAgdGhpcy5vbkNlbnRlcmluZy5lbWl0KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRyYW5zbGF0ZVRhYkNvbXBsZXRlKGU6IEFuaW1hdGlvbkV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8vIElmIHRoZSB0cmFuc2l0aW9uIHRvIHRoZSBjZW50ZXIgaXMgY29tcGxldGUsIGVtaXQgYW4gZXZlbnQuXG4gICAgICAgIGlmICh0aGlzLmlzQ2VudGVyUG9zaXRpb24oZS50b1N0YXRlKSAmJiB0aGlzLmlzQ2VudGVyUG9zaXRpb24odGhpcy5ib2R5UG9zaXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2VudGVyZWQuZW1pdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNDZW50ZXJQb3NpdGlvbihlLmZyb21TdGF0ZSkgJiYgIXRoaXMuaXNDZW50ZXJQb3NpdGlvbih0aGlzLmJvZHlQb3NpdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuYWZ0ZXJMZWF2aW5nQ2VudGVyLmVtaXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBUaGUgdGV4dCBkaXJlY3Rpb24gb2YgdGhlIGNvbnRhaW5pbmcgYXBwLiAqL1xuICAgIGdldExheW91dERpcmVjdGlvbigpOiBEaXJlY3Rpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXIgJiYgdGhpcy5kaXIudmFsdWUgPT09ICdydGwnID8gJ3J0bCcgOiAnbHRyJztcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgcHJvdmlkZWQgcG9zaXRpb24gc3RhdGUgaXMgY29uc2lkZXJlZCBjZW50ZXIsIHJlZ2FyZGxlc3Mgb2Ygb3JpZ2luLiAqL1xuICAgIGlzQ2VudGVyUG9zaXRpb24ocG9zaXRpb246IE1jVGFiQm9keVBvc2l0aW9uU3RhdGUgfCBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHBvc2l0aW9uID09PSAnY2VudGVyJyB8fCBwb3NpdGlvbiA9PT0gJ2xlZnQtb3JpZ2luLWNlbnRlcicgfHwgcG9zaXRpb24gPT09ICdyaWdodC1vcmlnaW4tY2VudGVyJztcbiAgICB9XG5cbiAgICAvKiogQ29tcHV0ZXMgdGhlIHBvc2l0aW9uIHN0YXRlIHRoYXQgd2lsbCBiZSB1c2VkIGZvciB0aGUgdGFiLWJvZHkgYW5pbWF0aW9uIHRyaWdnZXIuICovXG4gICAgcHJpdmF0ZSBjb21wdXRlUG9zaXRpb25BbmltYXRpb25TdGF0ZShkaXI6IERpcmVjdGlvbiA9IHRoaXMuZ2V0TGF5b3V0RGlyZWN0aW9uKCkpIHtcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb25JbmRleCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuYm9keVBvc2l0aW9uID0gZGlyID09PSAnbHRyJyA/ICdsZWZ0JyA6ICdyaWdodCc7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wb3NpdGlvbkluZGV4ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5UG9zaXRpb24gPSBkaXIgPT09ICdsdHInID8gJ3JpZ2h0JyA6ICdsZWZ0JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYm9keVBvc2l0aW9uID0gJ2NlbnRlcic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb21wdXRlcyB0aGUgcG9zaXRpb24gc3RhdGUgYmFzZWQgb24gdGhlIHNwZWNpZmllZCBvcmlnaW4gcG9zaXRpb24uIFRoaXMgaXMgdXNlZCBpZiB0aGVcbiAgICAgKiB0YWIgaXMgYmVjb21pbmcgdmlzaWJsZSBpbW1lZGlhdGVseSBhZnRlciBjcmVhdGlvbi5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbXB1dGVQb3NpdGlvbkZyb21PcmlnaW4oKTogTWNUYWJCb2R5UG9zaXRpb25TdGF0ZSB7XG4gICAgICAgIGNvbnN0IGRpciA9IHRoaXMuZ2V0TGF5b3V0RGlyZWN0aW9uKCk7XG5cbiAgICAgICAgaWYgKChkaXIgPT09ICdsdHInICYmIHRoaXMub3JpZ2luIDw9IDApIHx8IChkaXIgPT09ICdydGwnICYmIHRoaXMub3JpZ2luID4gMCkpIHtcbiAgICAgICAgICAgIHJldHVybiAnbGVmdC1vcmlnaW4tY2VudGVyJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAncmlnaHQtb3JpZ2luLWNlbnRlcic7XG4gICAgfVxufVxuXG4vKipcbiAqIFRoZSBwb3J0YWwgaG9zdCBkaXJlY3RpdmUgZm9yIHRoZSBjb250ZW50cyBvZiB0aGUgdGFiLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY1RhYkJvZHlIb3N0XSdcbn0pXG5leHBvcnQgY2xhc3MgTWNUYWJCb2R5UG9ydGFsIGV4dGVuZHMgQ2RrUG9ydGFsT3V0bGV0IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKiBTdWJzY3JpcHRpb24gdG8gZXZlbnRzIGZvciB3aGVuIHRoZSB0YWIgYm9keSBiZWdpbnMgY2VudGVyaW5nLiAqL1xuICAgIHByaXZhdGUgY2VudGVyaW5nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIC8qKiBTdWJzY3JpcHRpb24gdG8gZXZlbnRzIGZvciB3aGVuIHRoZSB0YWIgYm9keSBmaW5pc2hlcyBsZWF2aW5nIGZyb20gY2VudGVyIHBvc2l0aW9uLiAqL1xuICAgIHByaXZhdGUgbGVhdmluZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE1jVGFiQm9keSkpIHByaXZhdGUgaG9zdDogTWNUYWJCb2R5KSB7XG4gICAgICAgIHN1cGVyKGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgdmlld0NvbnRhaW5lclJlZik7XG4gICAgfVxuXG4gICAgLyoqIFNldCBpbml0aWFsIHZpc2liaWxpdHkgb3Igc2V0IHVwIHN1YnNjcmlwdGlvbiBmb3IgY2hhbmdpbmcgdmlzaWJpbGl0eS4gKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICB0aGlzLmNlbnRlcmluZ1N1YiA9IHRoaXMuaG9zdC5iZWZvcmVDZW50ZXJpbmdcbiAgICAgICAgICAgIC5waXBlKHN0YXJ0V2l0aCh0aGlzLmhvc3QuaXNDZW50ZXJQb3NpdGlvbih0aGlzLmhvc3QuYm9keVBvc2l0aW9uKSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChpc0NlbnRlcmluZzogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpc0NlbnRlcmluZyAmJiAhdGhpcy5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNoKHRoaXMuaG9zdC5jb250ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmxlYXZpbmdTdWIgPSB0aGlzLmhvc3QuYWZ0ZXJMZWF2aW5nQ2VudGVyLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRldGFjaCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogQ2xlYW4gdXAgY2VudGVyaW5nIHN1YnNjcmlwdGlvbi4gKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5jZW50ZXJpbmdTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5sZWF2aW5nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxufVxuIl19