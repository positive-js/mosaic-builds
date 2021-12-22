import { Directionality } from '@angular/cdk/bidi';
import { TemplatePortal, CdkPortalOutlet } from '@angular/cdk/portal';
import { Component, ChangeDetectorRef, Input, Inject, Output, EventEmitter, ElementRef, Directive, Optional, ViewEncapsulation, ChangeDetectionStrategy, ComponentFactoryResolver, ViewContainerRef, forwardRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { mcTabsAnimations } from './tabs-animations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
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
/** @nocollapse */ /** @nocollapse */ McTabBody.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McTabBody, deps: [{ token: i0.ElementRef }, { token: i1.Directionality, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McTabBody.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: McTabBody, selector: "mc-tab-body", inputs: { position: "position", content: "content", origin: "origin", animationDuration: "animationDuration" }, outputs: { onCentering: "onCentering", beforeCentering: "beforeCentering", afterLeavingCenter: "afterLeavingCenter", onCentered: "onCentered" }, host: { classAttribute: "mc-tab-body" }, viewQueries: [{ propertyName: "portalHost", first: true, predicate: CdkPortalOutlet, descendants: true }], ngImport: i0, template: "<div class=\"mc-tab-body__content\"\n     #content\n     [@translateTab]=\"{\n        value: bodyPosition,\n        params: {animationDuration: animationDuration}\n     }\"\n     (@translateTab.start)=\"onTranslateTabStarted($event)\"\n     (@translateTab.done)=\"onTranslateTabComplete($event)\">\n    <ng-template mcTabBodyHost></ng-template>\n</div>\n", styles: [".mc-tab-body__content{height:100%;overflow:auto}.mc-tab-body__content .mc-tab-group_dynamic-height{overflow:hidden}\n"], directives: [{ type: i0.forwardRef(function () { return McTabBodyPortal; }), selector: "[mcTabBodyHost]" }], animations: [mcTabsAnimations.translateTab], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McTabBody, decorators: [{
            type: Component,
            args: [{ selector: 'mc-tab-body', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, animations: [mcTabsAnimations.translateTab], host: {
                        class: 'mc-tab-body'
                    }, template: "<div class=\"mc-tab-body__content\"\n     #content\n     [@translateTab]=\"{\n        value: bodyPosition,\n        params: {animationDuration: animationDuration}\n     }\"\n     (@translateTab.start)=\"onTranslateTabStarted($event)\"\n     (@translateTab.done)=\"onTranslateTabComplete($event)\">\n    <ng-template mcTabBodyHost></ng-template>\n</div>\n", styles: [".mc-tab-body__content{height:100%;overflow:auto}.mc-tab-body__content .mc-tab-group_dynamic-height{overflow:hidden}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.Directionality, decorators: [{
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
/** @nocollapse */ /** @nocollapse */ McTabBodyPortal.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McTabBodyPortal, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.ViewContainerRef }, { token: forwardRef(() => McTabBody) }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McTabBodyPortal.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: McTabBodyPortal, selector: "[mcTabBodyHost]", usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McTabBodyPortal, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcTabBodyHost]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ViewContainerRef }, { type: McTabBody, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => McTabBody)]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWJvZHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RhYnMvdGFiLWJvZHkuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RhYnMvdGFiLWJvZHkuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsY0FBYyxFQUFhLE1BQU0sbUJBQW1CLENBQUM7QUFDOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RSxPQUFPLEVBQ0gsU0FBUyxFQUNULGlCQUFpQixFQUNqQixLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTixZQUFZLEVBR1osVUFBVSxFQUNWLFNBQVMsRUFDVCxRQUFRLEVBQ1IsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2Qix3QkFBd0IsRUFDeEIsZ0JBQWdCLEVBQ2hCLFVBQVUsRUFDVixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7OztBQXVCckQ7OztHQUdHO0FBWUgsTUFBTSxPQUFPLFNBQVM7SUE0Q2xCLFlBQ3FCLFVBQW1DLEVBQ3ZCLEdBQW1CLEVBQ2hELGlCQUFvQztRQUZuQixlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUN2QixRQUFHLEdBQUgsR0FBRyxDQUFnQjtRQWxDcEQseUZBQXlGO1FBQ3RFLGdCQUFXLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFFbEYsNERBQTREO1FBQ3pDLG9CQUFlLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7UUFFeEYsNERBQTREO1FBQ3pDLHVCQUFrQixHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDO1FBRTNGLDZFQUE2RTtRQUMxRCxlQUFVLEdBQXVCLElBQUksWUFBWSxDQUFPLElBQUksQ0FBQyxDQUFDO1FBV2pGLHlGQUF5RjtRQUN6RixpR0FBaUc7UUFDakcsd0NBQXdDO1FBQy9CLHNCQUFpQixHQUFXLEtBQUssQ0FBQztRQUszQyw0REFBNEQ7UUFDM0MsMEJBQXFCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQU94RCxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksaUJBQWlCLEVBQUU7WUFDL0IsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTTtpQkFDdkMsU0FBUyxDQUFDLENBQUMsU0FBb0IsRUFBRSxFQUFFO2dCQUNoQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzlDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDO1NBQ1Y7SUFDTCxDQUFDO0lBdERELCtGQUErRjtJQUMvRixJQUNJLFFBQVEsQ0FBQyxRQUFnQjtRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBbUREOzs7T0FHRztJQUNILFFBQVE7UUFDSixJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ3ZELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7U0FDeEQ7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQscUJBQXFCLENBQUMsQ0FBaUI7UUFDbkMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV2QyxJQUFJLFdBQVcsRUFBRTtZQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3JFO0lBQ0wsQ0FBQztJQUVELHNCQUFzQixDQUFDLENBQWlCO1FBQ3BDLDhEQUE4RDtRQUM5RCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUM5RSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzFCO1FBRUQsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNqRixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDbEM7SUFDTCxDQUFDO0lBRUQsZ0RBQWdEO0lBQ2hELGtCQUFrQjtRQUNkLE9BQU8sSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxzRkFBc0Y7SUFDdEYsZ0JBQWdCLENBQUMsUUFBeUM7UUFDdEQsT0FBTyxRQUFRLEtBQUssUUFBUSxJQUFJLFFBQVEsS0FBSyxvQkFBb0IsSUFBSSxRQUFRLEtBQUsscUJBQXFCLENBQUM7SUFDNUcsQ0FBQztJQUVELHdGQUF3RjtJQUNoRiw2QkFBNkIsQ0FBQyxNQUFpQixJQUFJLENBQUMsa0JBQWtCLEVBQUU7UUFDNUUsSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsRUFBRTtZQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1NBQ3hEO2FBQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsRUFBRTtZQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1NBQ3hEO2FBQU07WUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQztTQUNoQztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSyx5QkFBeUI7UUFDN0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFdEMsSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRTtZQUMzRSxPQUFPLG9CQUFvQixDQUFDO1NBQy9CO1FBRUQsT0FBTyxxQkFBcUIsQ0FBQztJQUNqQyxDQUFDOzs0SUE3SFEsU0FBUztnSUFBVCxTQUFTLHlZQXlCUCxlQUFlLGdEQ3hGOUIsb1dBVUEsNkxENExhLGVBQWUsa0RBNUlaLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDOzJGQUtsQyxTQUFTO2tCQVhyQixTQUFTOytCQUNJLGFBQWEsaUJBR1IsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTSxjQUNuQyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxRQUNyQzt3QkFDRixLQUFLLEVBQUUsYUFBYTtxQkFDdkI7OzBCQWdESSxRQUFROzRFQTFDVCxRQUFRO3NCQURYLEtBQUs7Z0JBVWEsV0FBVztzQkFBN0IsTUFBTTtnQkFHWSxlQUFlO3NCQUFqQyxNQUFNO2dCQUdZLGtCQUFrQjtzQkFBcEMsTUFBTTtnQkFHWSxVQUFVO3NCQUE1QixNQUFNO2dCQUdzQyxVQUFVO3NCQUF0RCxTQUFTO3VCQUFDLGVBQWUsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7Z0JBR3pCLE9BQU87c0JBQXhCLEtBQUs7dUJBQUMsU0FBUztnQkFHUCxNQUFNO3NCQUFkLEtBQUs7Z0JBS0csaUJBQWlCO3NCQUF6QixLQUFLOztBQTRGVjs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxlQUFlO0lBTWhELFlBQ0ksd0JBQWtELEVBQ2xELGdCQUFrQyxFQUNvQixJQUFlO1FBQ3JFLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBREksU0FBSSxHQUFKLElBQUksQ0FBVztRQVJ6RSxxRUFBcUU7UUFDN0QsaUJBQVksR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQzFDLDBGQUEwRjtRQUNsRixlQUFVLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztJQU94QyxDQUFDO0lBRUQsNkVBQTZFO0lBQzdFLFFBQVE7UUFDSixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWU7YUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzthQUNuRSxTQUFTLENBQUMsQ0FBQyxXQUFvQixFQUFFLEVBQUU7WUFDaEMsSUFBSSxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNsQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRVAsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQjthQUN6QyxTQUFTLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELHVDQUF1QztJQUN2QyxXQUFXO1FBQ1AsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOztrSkFsQ1EsZUFBZSwwRkFTWixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO3NJQVQ5QixlQUFlOzJGQUFmLGVBQWU7a0JBSDNCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtpQkFDOUI7Z0lBVW1FLFNBQVM7MEJBQXBFLE1BQU07MkJBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSwgRGlyZWN0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgVGVtcGxhdGVQb3J0YWwsIENka1BvcnRhbE91dGxldCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgSW5wdXQsXG4gICAgSW5qZWN0LFxuICAgIE91dHB1dCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBFbGVtZW50UmVmLFxuICAgIERpcmVjdGl2ZSxcbiAgICBPcHRpb25hbCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBmb3J3YXJkUmVmLFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBtY1RhYnNBbmltYXRpb25zIH0gZnJvbSAnLi90YWJzLWFuaW1hdGlvbnMnO1xuXG5cbi8qKlxuICogVGhlc2UgcG9zaXRpb24gc3RhdGVzIGFyZSB1c2VkIGludGVybmFsbHkgYXMgYW5pbWF0aW9uIHN0YXRlcyBmb3IgdGhlIHRhYiBib2R5LiBTZXR0aW5nIHRoZVxuICogcG9zaXRpb24gc3RhdGUgdG8gbGVmdCwgcmlnaHQsIG9yIGNlbnRlciB3aWxsIHRyYW5zaXRpb24gdGhlIHRhYiBib2R5IGZyb20gaXRzIGN1cnJlbnRcbiAqIHBvc2l0aW9uIHRvIGl0cyByZXNwZWN0aXZlIHN0YXRlLiBJZiB0aGVyZSBpcyBub3QgY3VycmVudCBwb3NpdGlvbiAodm9pZCwgaW4gdGhlIGNhc2Ugb2YgYSBuZXdcbiAqIHRhYiBib2R5KSwgdGhlbiB0aGVyZSB3aWxsIGJlIG5vIHRyYW5zaXRpb24gYW5pbWF0aW9uIHRvIGl0cyBzdGF0ZS5cbiAqXG4gKiBJbiB0aGUgY2FzZSBvZiBhIG5ldyB0YWIgYm9keSB0aGF0IHNob3VsZCBpbW1lZGlhdGVseSBiZSBjZW50ZXJlZCB3aXRoIGFuIGFuaW1hdGluZyB0cmFuc2l0aW9uLFxuICogdGhlbiBsZWZ0LW9yaWdpbi1jZW50ZXIgb3IgcmlnaHQtb3JpZ2luLWNlbnRlciBjYW4gYmUgdXNlZCwgd2hpY2ggd2lsbCB1c2UgbGVmdCBvciByaWdodCBhcyBpdHNcbiAqIHBzdWVkby1wcmlvciBzdGF0ZS5cbiAqL1xuZXhwb3J0IHR5cGUgTWNUYWJCb2R5UG9zaXRpb25TdGF0ZSA9ICdsZWZ0JyB8ICdjZW50ZXInIHwgJ3JpZ2h0JyB8ICdsZWZ0LW9yaWdpbi1jZW50ZXInIHwgJ3JpZ2h0LW9yaWdpbi1jZW50ZXInO1xuXG4vKipcbiAqIFRoZSBvcmlnaW4gc3RhdGUgaXMgYW4gaW50ZXJuYWxseSB1c2VkIHN0YXRlIHRoYXQgaXMgc2V0IG9uIGEgbmV3IHRhYiBib2R5IGluZGljYXRpbmcgaWYgaXRcbiAqIGJlZ2FuIHRvIHRoZSBsZWZ0IG9yIHJpZ2h0IG9mIHRoZSBwcmlvciBzZWxlY3RlZCBpbmRleC4gRm9yIGV4YW1wbGUsIGlmIHRoZSBzZWxlY3RlZCBpbmRleCB3YXNcbiAqIHNldCB0byAxLCBhbmQgYSBuZXcgdGFiIGlzIGNyZWF0ZWQgYW5kIHNlbGVjdGVkIGF0IGluZGV4IDIsIHRoZW4gdGhlIHRhYiBib2R5IHdvdWxkIGhhdmUgYW5cbiAqIG9yaWdpbiBvZiByaWdodCBiZWNhdXNlIGl0cyBpbmRleCB3YXMgZ3JlYXRlciB0aGFuIHRoZSBwcmlvciBzZWxlY3RlZCBpbmRleC5cbiAqL1xuZXhwb3J0IHR5cGUgTWNUYWJCb2R5T3JpZ2luU3RhdGUgPSAnbGVmdCcgfCAncmlnaHQnO1xuXG4vKipcbiAqIFdyYXBwZXIgZm9yIHRoZSBjb250ZW50cyBvZiBhIHRhYi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy10YWItYm9keScsXG4gICAgdGVtcGxhdGVVcmw6ICd0YWItYm9keS5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsndGFiLWJvZHkuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgYW5pbWF0aW9uczogW21jVGFic0FuaW1hdGlvbnMudHJhbnNsYXRlVGFiXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdGFiLWJvZHknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1RhYkJvZHkgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICAvKiogVGhlIHNoaWZ0ZWQgaW5kZXggcG9zaXRpb24gb2YgdGhlIHRhYiBib2R5LCB3aGVyZSB6ZXJvIHJlcHJlc2VudHMgdGhlIGFjdGl2ZSBjZW50ZXIgdGFiLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IHBvc2l0aW9uKHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbkluZGV4ID0gcG9zaXRpb247XG4gICAgICAgIHRoaXMuY29tcHV0ZVBvc2l0aW9uQW5pbWF0aW9uU3RhdGUoKTtcbiAgICB9XG5cbiAgICAvKiogVGFiIGJvZHkgcG9zaXRpb24gc3RhdGUuIFVzZWQgYnkgdGhlIGFuaW1hdGlvbiB0cmlnZ2VyIGZvciB0aGUgY3VycmVudCBzdGF0ZS4gKi9cbiAgICBib2R5UG9zaXRpb246IE1jVGFiQm9keVBvc2l0aW9uU3RhdGU7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSB0YWIgYmVnaW5zIHRvIGFuaW1hdGUgdG93YXJkcyB0aGUgY2VudGVyIGFzIHRoZSBhY3RpdmUgdGFiLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBvbkNlbnRlcmluZzogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIGJlZm9yZSB0aGUgY2VudGVyaW5nIG9mIHRoZSB0YWIgYmVnaW5zLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBiZWZvcmVDZW50ZXJpbmc6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIGJlZm9yZSB0aGUgY2VudGVyaW5nIG9mIHRoZSB0YWIgYmVnaW5zLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBhZnRlckxlYXZpbmdDZW50ZXI6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHRhYiBjb21wbGV0ZXMgaXRzIGFuaW1hdGlvbiB0b3dhcmRzIHRoZSBjZW50ZXIuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IG9uQ2VudGVyZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4odHJ1ZSk7XG5cbiAgICAvKiogVGhlIHBvcnRhbCBob3N0IGluc2lkZSBvZiB0aGlzIGNvbnRhaW5lciBpbnRvIHdoaWNoIHRoZSB0YWIgYm9keSBjb250ZW50IHdpbGwgYmUgbG9hZGVkLiAqL1xuICAgIEBWaWV3Q2hpbGQoQ2RrUG9ydGFsT3V0bGV0LCB7c3RhdGljOiBmYWxzZX0pIHBvcnRhbEhvc3Q6IENka1BvcnRhbE91dGxldDtcblxuICAgIC8qKiBUaGUgdGFiIGJvZHkgY29udGVudCB0byBkaXNwbGF5LiAqL1xuICAgIEBJbnB1dCgnY29udGVudCcpIGNvbnRlbnQ6IFRlbXBsYXRlUG9ydGFsO1xuXG4gICAgLyoqIFBvc2l0aW9uIHRoYXQgd2lsbCBiZSB1c2VkIHdoZW4gdGhlIHRhYiBpcyBpbW1lZGlhdGVseSBiZWNvbWluZyB2aXNpYmxlIGFmdGVyIGNyZWF0aW9uLiAqL1xuICAgIEBJbnB1dCgpIG9yaWdpbjogbnVtYmVyO1xuXG4gICAgLy8gTm90ZSB0aGF0IHRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYWx3YXlzIGJlIG92ZXJ3cml0dGVuIGJ5IGBNY1RhYkJvZHlgLCBidXQgd2UgbmVlZCBvbmVcbiAgICAvLyBhbnl3YXkgdG8gcHJldmVudCB0aGUgYW5pbWF0aW9ucyBtb2R1bGUgZnJvbSB0aHJvd2luZyBhbiBlcnJvciBpZiB0aGUgYm9keSBpcyB1c2VkIG9uIGl0cyBvd24uXG4gICAgLyoqIER1cmF0aW9uIGZvciB0aGUgdGFiJ3MgYW5pbWF0aW9uLiAqL1xuICAgIEBJbnB1dCgpIGFuaW1hdGlvbkR1cmF0aW9uOiBzdHJpbmcgPSAnMG1zJztcblxuICAgIC8qKiBDdXJyZW50IHBvc2l0aW9uIG9mIHRoZSB0YWItYm9keSBpbiB0aGUgdGFiLWdyb3VwLiBaZXJvIG1lYW5zIHRoYXQgdGhlIHRhYiBpcyB2aXNpYmxlLiAqL1xuICAgIHByaXZhdGUgcG9zaXRpb25JbmRleDogbnVtYmVyO1xuXG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byB0aGUgZGlyZWN0aW9uYWxpdHkgY2hhbmdlIG9ic2VydmFibGUuICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBkaXJDaGFuZ2VTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByZWFkb25seSBkaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHtcbiAgICAgICAgaWYgKHRoaXMuZGlyICYmIGNoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgICAgICB0aGlzLmRpckNoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuZGlyLmNoYW5nZVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKGRpcmVjdGlvbjogRGlyZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcHV0ZVBvc2l0aW9uQW5pbWF0aW9uU3RhdGUoZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZnRlciBpbml0aWFsaXplZCwgY2hlY2sgaWYgdGhlIGNvbnRlbnQgaXMgY2VudGVyZWQgYW5kIGhhcyBhbiBvcmlnaW4uIElmIHNvLCBzZXQgdGhlXG4gICAgICogc3BlY2lhbCBwb3NpdGlvbiBzdGF0ZXMgdGhhdCB0cmFuc2l0aW9uIHRoZSB0YWIgZnJvbSB0aGUgbGVmdCBvciByaWdodCBiZWZvcmUgY2VudGVyaW5nLlxuICAgICAqL1xuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5ib2R5UG9zaXRpb24gPT09ICdjZW50ZXInICYmIHRoaXMub3JpZ2luICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keVBvc2l0aW9uID0gdGhpcy5jb21wdXRlUG9zaXRpb25Gcm9tT3JpZ2luKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kaXJDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBvblRyYW5zbGF0ZVRhYlN0YXJ0ZWQoZTogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaXNDZW50ZXJpbmcgPSB0aGlzLmlzQ2VudGVyUG9zaXRpb24oZS50b1N0YXRlKTtcbiAgICAgICAgdGhpcy5iZWZvcmVDZW50ZXJpbmcuZW1pdChpc0NlbnRlcmluZyk7XG5cbiAgICAgICAgaWYgKGlzQ2VudGVyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2VudGVyaW5nLmVtaXQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVHJhbnNsYXRlVGFiQ29tcGxldGUoZTogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gSWYgdGhlIHRyYW5zaXRpb24gdG8gdGhlIGNlbnRlciBpcyBjb21wbGV0ZSwgZW1pdCBhbiBldmVudC5cbiAgICAgICAgaWYgKHRoaXMuaXNDZW50ZXJQb3NpdGlvbihlLnRvU3RhdGUpICYmIHRoaXMuaXNDZW50ZXJQb3NpdGlvbih0aGlzLmJvZHlQb3NpdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMub25DZW50ZXJlZC5lbWl0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc0NlbnRlclBvc2l0aW9uKGUuZnJvbVN0YXRlKSAmJiAhdGhpcy5pc0NlbnRlclBvc2l0aW9uKHRoaXMuYm9keVBvc2l0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5hZnRlckxlYXZpbmdDZW50ZXIuZW1pdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFRoZSB0ZXh0IGRpcmVjdGlvbiBvZiB0aGUgY29udGFpbmluZyBhcHAuICovXG4gICAgZ2V0TGF5b3V0RGlyZWN0aW9uKCk6IERpcmVjdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpciAmJiB0aGlzLmRpci52YWx1ZSA9PT0gJ3J0bCcgPyAncnRsJyA6ICdsdHInO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBwcm92aWRlZCBwb3NpdGlvbiBzdGF0ZSBpcyBjb25zaWRlcmVkIGNlbnRlciwgcmVnYXJkbGVzcyBvZiBvcmlnaW4uICovXG4gICAgaXNDZW50ZXJQb3NpdGlvbihwb3NpdGlvbjogTWNUYWJCb2R5UG9zaXRpb25TdGF0ZSB8IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gcG9zaXRpb24gPT09ICdjZW50ZXInIHx8IHBvc2l0aW9uID09PSAnbGVmdC1vcmlnaW4tY2VudGVyJyB8fCBwb3NpdGlvbiA9PT0gJ3JpZ2h0LW9yaWdpbi1jZW50ZXInO1xuICAgIH1cblxuICAgIC8qKiBDb21wdXRlcyB0aGUgcG9zaXRpb24gc3RhdGUgdGhhdCB3aWxsIGJlIHVzZWQgZm9yIHRoZSB0YWItYm9keSBhbmltYXRpb24gdHJpZ2dlci4gKi9cbiAgICBwcml2YXRlIGNvbXB1dGVQb3NpdGlvbkFuaW1hdGlvblN0YXRlKGRpcjogRGlyZWN0aW9uID0gdGhpcy5nZXRMYXlvdXREaXJlY3Rpb24oKSkge1xuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbkluZGV4IDwgMCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5UG9zaXRpb24gPSBkaXIgPT09ICdsdHInID8gJ2xlZnQnIDogJ3JpZ2h0JztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBvc2l0aW9uSW5kZXggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmJvZHlQb3NpdGlvbiA9IGRpciA9PT0gJ2x0cicgPyAncmlnaHQnIDogJ2xlZnQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ib2R5UG9zaXRpb24gPSAnY2VudGVyJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbXB1dGVzIHRoZSBwb3NpdGlvbiBzdGF0ZSBiYXNlZCBvbiB0aGUgc3BlY2lmaWVkIG9yaWdpbiBwb3NpdGlvbi4gVGhpcyBpcyB1c2VkIGlmIHRoZVxuICAgICAqIHRhYiBpcyBiZWNvbWluZyB2aXNpYmxlIGltbWVkaWF0ZWx5IGFmdGVyIGNyZWF0aW9uLlxuICAgICAqL1xuICAgIHByaXZhdGUgY29tcHV0ZVBvc2l0aW9uRnJvbU9yaWdpbigpOiBNY1RhYkJvZHlQb3NpdGlvblN0YXRlIHtcbiAgICAgICAgY29uc3QgZGlyID0gdGhpcy5nZXRMYXlvdXREaXJlY3Rpb24oKTtcblxuICAgICAgICBpZiAoKGRpciA9PT0gJ2x0cicgJiYgdGhpcy5vcmlnaW4gPD0gMCkgfHwgKGRpciA9PT0gJ3J0bCcgJiYgdGhpcy5vcmlnaW4gPiAwKSkge1xuICAgICAgICAgICAgcmV0dXJuICdsZWZ0LW9yaWdpbi1jZW50ZXInO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICdyaWdodC1vcmlnaW4tY2VudGVyJztcbiAgICB9XG59XG5cbi8qKlxuICogVGhlIHBvcnRhbCBob3N0IGRpcmVjdGl2ZSBmb3IgdGhlIGNvbnRlbnRzIG9mIHRoZSB0YWIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jVGFiQm9keUhvc3RdJ1xufSlcbmV4cG9ydCBjbGFzcyBNY1RhYkJvZHlQb3J0YWwgZXh0ZW5kcyBDZGtQb3J0YWxPdXRsZXQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byBldmVudHMgZm9yIHdoZW4gdGhlIHRhYiBib2R5IGJlZ2lucyBjZW50ZXJpbmcuICovXG4gICAgcHJpdmF0ZSBjZW50ZXJpbmdTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byBldmVudHMgZm9yIHdoZW4gdGhlIHRhYiBib2R5IGZpbmlzaGVzIGxlYXZpbmcgZnJvbSBjZW50ZXIgcG9zaXRpb24uICovXG4gICAgcHJpdmF0ZSBsZWF2aW5nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTWNUYWJCb2R5KSkgcHJpdmF0ZSByZWFkb25seSBob3N0OiBNY1RhYkJvZHkpIHtcbiAgICAgICAgc3VwZXIoY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCB2aWV3Q29udGFpbmVyUmVmKTtcbiAgICB9XG5cbiAgICAvKiogU2V0IGluaXRpYWwgdmlzaWJpbGl0eSBvciBzZXQgdXAgc3Vic2NyaXB0aW9uIGZvciBjaGFuZ2luZyB2aXNpYmlsaXR5LiAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgICAgIHRoaXMuY2VudGVyaW5nU3ViID0gdGhpcy5ob3N0LmJlZm9yZUNlbnRlcmluZ1xuICAgICAgICAgICAgLnBpcGUoc3RhcnRXaXRoKHRoaXMuaG9zdC5pc0NlbnRlclBvc2l0aW9uKHRoaXMuaG9zdC5ib2R5UG9zaXRpb24pKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGlzQ2VudGVyaW5nOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlzQ2VudGVyaW5nICYmICF0aGlzLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2godGhpcy5ob3N0LmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubGVhdmluZ1N1YiA9IHRoaXMuaG9zdC5hZnRlckxlYXZpbmdDZW50ZXJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4geyB0aGlzLmRldGFjaCgpOyB9KTtcbiAgICB9XG5cbiAgICAvKiogQ2xlYW4gdXAgY2VudGVyaW5nIHN1YnNjcmlwdGlvbi4gKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5jZW50ZXJpbmdTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5sZWF2aW5nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIm1jLXRhYi1ib2R5X19jb250ZW50XCJcbiAgICAgI2NvbnRlbnRcbiAgICAgW0B0cmFuc2xhdGVUYWJdPVwie1xuICAgICAgICB2YWx1ZTogYm9keVBvc2l0aW9uLFxuICAgICAgICBwYXJhbXM6IHthbmltYXRpb25EdXJhdGlvbjogYW5pbWF0aW9uRHVyYXRpb259XG4gICAgIH1cIlxuICAgICAoQHRyYW5zbGF0ZVRhYi5zdGFydCk9XCJvblRyYW5zbGF0ZVRhYlN0YXJ0ZWQoJGV2ZW50KVwiXG4gICAgIChAdHJhbnNsYXRlVGFiLmRvbmUpPVwib25UcmFuc2xhdGVUYWJDb21wbGV0ZSgkZXZlbnQpXCI+XG4gICAgPG5nLXRlbXBsYXRlIG1jVGFiQm9keUhvc3Q+PC9uZy10ZW1wbGF0ZT5cbjwvZGl2PlxuIl19