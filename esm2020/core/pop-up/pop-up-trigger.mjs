import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Directive, ElementRef, NgZone, ViewContainerRef } from '@angular/core';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { Subject } from 'rxjs';
import { delay as rxDelay, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { EXTENDED_OVERLAY_POSITIONS, POSITION_MAP, POSITION_PRIORITY_STRATEGY, POSITION_TO_CSS_MAP } from '../overlay/overlay-position-map';
import { PopUpPlacements, PopUpTriggers } from './constants';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "@angular/cdk/bidi";
// tslint:disable-next-line:naming-convention
export class McPopUpTrigger {
    constructor(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) {
        this.overlay = overlay;
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        this.scrollDispatcher = scrollDispatcher;
        this.hostView = hostView;
        this.scrollStrategy = scrollStrategy;
        this.direction = direction;
        this.isOpen = false;
        this.enterDelay = 0;
        this.leaveDelay = 0;
        this.placement = PopUpPlacements.Top;
        this.placementPriority = null;
        this.visible = false;
        // tslint:disable-next-line:naming-convention orthodox-getter-and-setter
        this._disabled = false;
        this.listeners = new Map();
        this.destroyed = new Subject();
        this.detach = () => {
            if (this.overlayRef && this.overlayRef.hasAttached()) {
                this.overlayRef.detach();
            }
            this.instance = null;
        };
        this.onPositionChange = ($event) => {
            if (!this.instance) {
                return;
            }
            let newPlacement = this.placement;
            const { originX, originY, overlayX, overlayY } = $event.connectionPair;
            Object.keys(this.availablePositions).some((key) => {
                if (originX === this.availablePositions[key].originX && originY === this.availablePositions[key].originY &&
                    overlayX === this.availablePositions[key].overlayX && overlayY === this.availablePositions[key].overlayY) {
                    newPlacement = key;
                    return true;
                }
                return false;
            });
            this.placementChange.emit(newPlacement);
            this.updateClassMap(newPlacement);
            if ($event.scrollableViewProperties.isOverlayClipped && this.instance.isVisible()) {
                // After position changes occur and the overlay is clipped by
                // a parent scrollable then close the tooltip.
                this.ngZone.run(() => this.hide());
            }
        };
        this.addEventListener = (listener, event) => {
            this.elementRef.nativeElement.addEventListener(event, listener);
        };
        this.removeEventListener = (listener, event) => {
            this.elementRef.nativeElement.removeEventListener(event, listener);
        };
        this.availablePositions = POSITION_MAP;
    }
    ngOnInit() {
        this.initListeners();
    }
    ngOnDestroy() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
        this.listeners.forEach(this.removeEventListener);
        this.listeners.clear();
        this.destroyed.next();
        this.destroyed.complete();
    }
    updatePlacement(value) {
        if (POSITION_TO_CSS_MAP[value]) {
            this.placement = value;
            this.updateClassMap();
        }
        else {
            this.placement = PopUpPlacements.Top;
            console.warn(`Unknown position: ${value}. Will used default position: ${this.placement}`);
        }
        if (this.visible) {
            this.updatePosition();
        }
    }
    updatePlacementPriority(value) {
        if (value && value.length > 0) {
            this.placementPriority = value;
        }
        else {
            this.placementPriority = null;
        }
    }
    updateVisible(externalValue) {
        const value = coerceBooleanProperty(externalValue);
        if (this.visible !== value) {
            this.visible = value;
            if (value) {
                this.show();
            }
            else {
                this.hide();
            }
        }
    }
    handleKeydown(event) {
        if (this.isOpen && event.keyCode === ESCAPE) { // tslint:disable-line
            this.hide();
        }
    }
    handleTouchend() {
        this.hide();
    }
    show(delay = this.enterDelay) {
        if (this.disabled || this.instance) {
            return;
        }
        this.overlayRef = this.createOverlay();
        this.detach();
        this.portal = this.portal || new ComponentPortal(this.getOverlayHandleComponentType(), this.hostView);
        this.instance = this.overlayRef.attach(this.portal).instance;
        this.instance.afterHidden()
            .pipe(takeUntil(this.destroyed))
            .subscribe(this.detach);
        this.updateClassMap();
        this.updateData();
        this.instance.visibleChange
            .pipe(takeUntil(this.destroyed), distinctUntilChanged())
            .subscribe((value) => {
            this.visible = value;
            this.visibleChange.emit(value);
            this.isOpen = value;
        });
        this.updatePosition();
        this.instance.show(delay);
    }
    hide(delay = this.leaveDelay) {
        if (this.instance) {
            this.instance.hide(delay);
        }
    }
    /** Create the overlay config and position strategy */
    createOverlay() {
        if (this.overlayRef) {
            return this.overlayRef;
        }
        // Create connected position strategy that listens for scroll events to reposition.
        const strategy = this.overlay.position()
            .flexibleConnectedTo(this.elementRef)
            .withTransformOriginOn(this.originSelector)
            .withFlexibleDimensions(false)
            .withPositions([...EXTENDED_OVERLAY_POSITIONS])
            .withScrollableContainers(this.scrollDispatcher.getAncestorScrollContainers(this.elementRef));
        strategy.positionChanges
            .pipe(takeUntil(this.destroyed))
            .subscribe(this.onPositionChange);
        this.overlayRef = this.overlay.create({
            ...this.overlayConfig,
            direction: this.direction,
            positionStrategy: strategy,
            scrollStrategy: this.scrollStrategy()
        });
        this.closingActions()
            .pipe(takeUntil(this.destroyed))
            .pipe(rxDelay(0))
            .subscribe(() => this.hide());
        this.overlayRef.outsidePointerEvents()
            .subscribe(() => this.instance.handleBodyInteraction());
        this.overlayRef.detachments()
            .pipe(takeUntil(this.destroyed))
            .subscribe(this.detach);
        return this.overlayRef;
    }
    initListeners() {
        this.clearListeners();
        if (this.trigger.includes(PopUpTriggers.Click)) {
            this.listeners
                .set('click', () => this.show())
                .forEach(this.addEventListener);
        }
        if (this.trigger.includes(PopUpTriggers.Hover)) {
            this.listeners
                .set('mouseenter', () => this.show())
                .set('mouseleave', () => this.hide())
                .forEach(this.addEventListener);
        }
        if (this.trigger.includes(PopUpTriggers.Focus)) {
            this.listeners
                .set('focus', () => this.show())
                .set('blur', () => this.hide())
                .forEach(this.addEventListener);
        }
    }
    /** Updates the position of the current popover. */
    updatePosition(reapplyPosition = false) {
        this.overlayRef = this.createOverlay();
        const position = this.overlayRef.getConfig().positionStrategy
            .withPositions(this.getPrioritizedPositions())
            .withPush(true);
        if (reapplyPosition) {
            setTimeout(() => position.reapplyLastPosition());
        }
    }
    getPriorityPlacementStrategy(value) {
        const result = [];
        const possiblePositions = Object.keys(this.availablePositions);
        if (Array.isArray(value)) {
            value.forEach((position) => {
                if (possiblePositions.includes(position)) {
                    result.push(this.availablePositions[position]);
                }
            });
        }
        else if (possiblePositions.includes(value)) {
            result.push(this.availablePositions[value]);
        }
        return result;
    }
    getPrioritizedPositions() {
        if (this.placementPriority) {
            return this.getPriorityPlacementStrategy(this.placementPriority);
        }
        return POSITION_PRIORITY_STRATEGY[this.placement];
    }
    clearListeners() {
        this.listeners.forEach(this.removeEventListener);
        this.listeners.clear();
    }
}
/** @nocollapse */ /** @nocollapse */ McPopUpTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McPopUpTrigger, deps: "invalid", target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McPopUpTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: McPopUpTrigger, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McPopUpTrigger, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i1.ScrollDispatcher }, { type: i0.ViewContainerRef }, { type: undefined }, { type: i2.Directionality }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wLXVwLXRyaWdnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvY29yZS9wb3AtdXAvcG9wLXVwLXRyaWdnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFJSCxPQUFPLEVBRVAsZ0JBQWdCLEVBQ25CLE1BQU0sc0JBQXNCLENBQUM7QUFFOUIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUVWLE1BQU0sRUFHTixnQkFBZ0IsRUFDbkIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLEtBQUssSUFBSSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkYsT0FBTyxFQUNILDBCQUEwQixFQUMxQixZQUFZLEVBQ1osMEJBQTBCLEVBQzFCLG1CQUFtQixFQUN0QixNQUFNLGlDQUFpQyxDQUFDO0FBRXpDLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7O0FBSTdELDZDQUE2QztBQUM3QyxNQUFNLE9BQWdCLGNBQWM7SUFzQ2hDLFlBQ2MsT0FBZ0IsRUFDaEIsVUFBc0IsRUFDdEIsTUFBYyxFQUNkLGdCQUFrQyxFQUNsQyxRQUEwQixFQUMxQixjQUFjLEVBQ2QsU0FBMEI7UUFOMUIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFdBQU0sR0FBTixN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cEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMzQixDQUFDOztpSkEvU2lCLGNBQWM7cUlBQWQsY0FBYzsyRkFBZCxjQUFjO2tCQUZuQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2UsXG4gICAgQ29ubmVjdGlvblBvc2l0aW9uUGFpcixcbiAgICBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3ksXG4gICAgT3ZlcmxheSxcbiAgICBPdmVybGF5UmVmLFxuICAgIFNjcm9sbERpc3BhdGNoZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgT3ZlcmxheUNvbmZpZyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5L292ZXJsYXktY29uZmlnJztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgTmdab25lLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFR5cGUsXG4gICAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVTQ0FQRSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWxheSBhcyByeERlbGF5LCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICAgIEVYVEVOREVEX09WRVJMQVlfUE9TSVRJT05TLFxuICAgIFBPU0lUSU9OX01BUCxcbiAgICBQT1NJVElPTl9QUklPUklUWV9TVFJBVEVHWSxcbiAgICBQT1NJVElPTl9UT19DU1NfTUFQXG59IGZyb20gJy4uL292ZXJsYXkvb3ZlcmxheS1wb3NpdGlvbi1tYXAnO1xuXG5pbXBvcnQgeyBQb3BVcFBsYWNlbWVudHMsIFBvcFVwVHJpZ2dlcnMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cblxuQERpcmVjdGl2ZSgpXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNY1BvcFVwVHJpZ2dlcjxUPiB7XG4gICAgaXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBlbnRlckRlbGF5OiBudW1iZXIgPSAwO1xuICAgIGxlYXZlRGVsYXk6IG51bWJlciA9IDA7XG5cbiAgICBhYnN0cmFjdCBkaXNhYmxlZDogYm9vbGVhbjtcbiAgICBhYnN0cmFjdCB0cmlnZ2VyOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgY3VzdG9tQ2xhc3M6IHN0cmluZztcbiAgICBhYnN0cmFjdCBjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgYWJzdHJhY3QgcGxhY2VtZW50Q2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPjtcbiAgICBhYnN0cmFjdCB2aXNpYmxlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj47XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgb3JpZ2luU2VsZWN0b3I6IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgb3ZlcmxheUNvbmZpZzogT3ZlcmxheUNvbmZpZztcblxuICAgIHByb3RlY3RlZCBwbGFjZW1lbnQgPSBQb3BVcFBsYWNlbWVudHMuVG9wO1xuICAgIHByb3RlY3RlZCBwbGFjZW1lbnRQcmlvcml0eTogc3RyaW5nIHwgc3RyaW5nW10gfCBudWxsID0gbnVsbDtcblxuICAgIHByb3RlY3RlZCB2aXNpYmxlID0gZmFsc2U7XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb24gb3J0aG9kb3gtZ2V0dGVyLWFuZC1zZXR0ZXJcbiAgICBwcm90ZWN0ZWQgX2NvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uIG9ydGhvZG94LWdldHRlci1hbmQtc2V0dGVyXG4gICAgcHJvdGVjdGVkIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvbiBvcnRob2RveC1nZXR0ZXItYW5kLXNldHRlclxuICAgIHByb3RlY3RlZCBfY3VzdG9tQ2xhc3M6IHN0cmluZztcblxuICAgIHByb3RlY3RlZCBvdmVybGF5UmVmOiBPdmVybGF5UmVmIHwgbnVsbDtcbiAgICBwcm90ZWN0ZWQgcG9ydGFsOiBDb21wb25lbnRQb3J0YWw8VD47XG4gICAgcHJvdGVjdGVkIGluc3RhbmNlOiBhbnkgfCBudWxsO1xuXG4gICAgcHJvdGVjdGVkIGxpc3RlbmVycyA9IG5ldyBNYXA8c3RyaW5nLCBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0PigpO1xuXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGF2YWlsYWJsZVBvc2l0aW9uczogeyBba2V5OiBzdHJpbmddOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyIH07XG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGRlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJvdGVjdGVkIG5nWm9uZTogTmdab25lLFxuICAgICAgICBwcm90ZWN0ZWQgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICAgICAgcHJvdGVjdGVkIGhvc3RWaWV3OiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwcm90ZWN0ZWQgc2Nyb2xsU3RyYXRlZ3ksXG4gICAgICAgIHByb3RlY3RlZCBkaXJlY3Rpb24/OiBEaXJlY3Rpb25hbGl0eVxuICAgICkge1xuICAgICAgICB0aGlzLmF2YWlsYWJsZVBvc2l0aW9ucyA9IFBPU0lUSU9OX01BUDtcbiAgICB9XG5cbiAgICBhYnN0cmFjdCB1cGRhdGVDbGFzc01hcChuZXdQbGFjZW1lbnQ/OiBzdHJpbmcpOiB2b2lkO1xuXG4gICAgYWJzdHJhY3QgdXBkYXRlRGF0YSgpOiB2b2lkO1xuXG4gICAgYWJzdHJhY3QgY2xvc2luZ0FjdGlvbnMoKTogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gICAgYWJzdHJhY3QgZ2V0T3ZlcmxheUhhbmRsZUNvbXBvbmVudFR5cGUoKTogVHlwZTxUPjtcblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXRMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2godGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKTtcblxuICAgICAgICB0aGlzLmxpc3RlbmVycy5jbGVhcigpO1xuXG4gICAgICAgIHRoaXMuZGVzdHJveWVkLm5leHQoKTtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVQbGFjZW1lbnQodmFsdWU6IFBvcFVwUGxhY2VtZW50cykge1xuICAgICAgICBpZiAoUE9TSVRJT05fVE9fQ1NTX01BUFt2YWx1ZV0pIHtcbiAgICAgICAgICAgIHRoaXMucGxhY2VtZW50ID0gdmFsdWU7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2xhc3NNYXAoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGxhY2VtZW50ID0gUG9wVXBQbGFjZW1lbnRzLlRvcDtcblxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBVbmtub3duIHBvc2l0aW9uOiAke3ZhbHVlfS4gV2lsbCB1c2VkIGRlZmF1bHQgcG9zaXRpb246ICR7dGhpcy5wbGFjZW1lbnR9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy52aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVQbGFjZW1lbnRQcmlvcml0eSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5wbGFjZW1lbnRQcmlvcml0eSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wbGFjZW1lbnRQcmlvcml0eSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVWaXNpYmxlKGV4dGVybmFsVmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZXh0ZXJuYWxWYWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMudmlzaWJsZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IHZhbHVlO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzT3BlbiAmJiBldmVudC5rZXlDb2RlID09PSBFU0NBUEUpIHsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVUb3VjaGVuZCgpIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgc2hvdyhkZWxheTogbnVtYmVyID0gdGhpcy5lbnRlckRlbGF5KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMuaW5zdGFuY2UpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgICAgIHRoaXMuZGV0YWNoKCk7XG5cbiAgICAgICAgdGhpcy5wb3J0YWwgPSB0aGlzLnBvcnRhbCB8fCBuZXcgQ29tcG9uZW50UG9ydGFsKHRoaXMuZ2V0T3ZlcmxheUhhbmRsZUNvbXBvbmVudFR5cGUoKSwgdGhpcy5ob3N0Vmlldyk7XG5cbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IHRoaXMub3ZlcmxheVJlZi5hdHRhY2godGhpcy5wb3J0YWwpLmluc3RhbmNlO1xuXG4gICAgICAgIHRoaXMuaW5zdGFuY2UuYWZ0ZXJIaWRkZW4oKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUodGhpcy5kZXRhY2gpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ2xhc3NNYXAoKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZURhdGEoKTtcblxuICAgICAgICB0aGlzLmluc3RhbmNlLnZpc2libGVDaGFuZ2VcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzT3BlbiA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuXG4gICAgICAgIHRoaXMuaW5zdGFuY2Uuc2hvdyhkZWxheSk7XG4gICAgfVxuXG4gICAgaGlkZShkZWxheTogbnVtYmVyID0gdGhpcy5sZWF2ZURlbGF5KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLmhpZGUoZGVsYXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGV0YWNoID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmICYmIHRoaXMub3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluc3RhbmNlID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKiogQ3JlYXRlIHRoZSBvdmVybGF5IGNvbmZpZyBhbmQgcG9zaXRpb24gc3RyYXRlZ3kgKi9cbiAgICBjcmVhdGVPdmVybGF5KCk6IE92ZXJsYXlSZWYge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7IHJldHVybiB0aGlzLm92ZXJsYXlSZWY7IH1cblxuICAgICAgICAvLyBDcmVhdGUgY29ubmVjdGVkIHBvc2l0aW9uIHN0cmF0ZWd5IHRoYXQgbGlzdGVucyBmb3Igc2Nyb2xsIGV2ZW50cyB0byByZXBvc2l0aW9uLlxuICAgICAgICBjb25zdCBzdHJhdGVneSA9IHRoaXMub3ZlcmxheS5wb3NpdGlvbigpXG4gICAgICAgICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLmVsZW1lbnRSZWYpXG4gICAgICAgICAgICAud2l0aFRyYW5zZm9ybU9yaWdpbk9uKHRoaXMub3JpZ2luU2VsZWN0b3IpXG4gICAgICAgICAgICAud2l0aEZsZXhpYmxlRGltZW5zaW9ucyhmYWxzZSlcbiAgICAgICAgICAgIC53aXRoUG9zaXRpb25zKFsuLi5FWFRFTkRFRF9PVkVSTEFZX1BPU0lUSU9OU10pXG4gICAgICAgICAgICAud2l0aFNjcm9sbGFibGVDb250YWluZXJzKHRoaXMuc2Nyb2xsRGlzcGF0Y2hlci5nZXRBbmNlc3RvclNjcm9sbENvbnRhaW5lcnModGhpcy5lbGVtZW50UmVmKSk7XG5cbiAgICAgICAgc3RyYXRlZ3kucG9zaXRpb25DaGFuZ2VzXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSh0aGlzLm9uUG9zaXRpb25DaGFuZ2UpO1xuXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUoe1xuICAgICAgICAgICAgLi4udGhpcy5vdmVybGF5Q29uZmlnLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiB0aGlzLmRpcmVjdGlvbixcbiAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHN0cmF0ZWd5LFxuICAgICAgICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuc2Nyb2xsU3RyYXRlZ3koKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNsb3NpbmdBY3Rpb25zKClcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAucGlwZShyeERlbGF5KDApKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmhpZGUoKSk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLm91dHNpZGVQb2ludGVyRXZlbnRzKClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5pbnN0YW5jZSEuaGFuZGxlQm9keUludGVyYWN0aW9uKCkpO1xuXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2htZW50cygpXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSh0aGlzLmRldGFjaCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheVJlZjtcbiAgICB9XG5cbiAgICBvblBvc2l0aW9uQ2hhbmdlID0gKCRldmVudDogQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlKTogdm9pZCA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgeyByZXR1cm47IH1cblxuICAgICAgICBsZXQgbmV3UGxhY2VtZW50ID0gdGhpcy5wbGFjZW1lbnQ7XG5cbiAgICAgICAgY29uc3QgeyBvcmlnaW5YLCBvcmlnaW5ZLCBvdmVybGF5WCwgb3ZlcmxheVkgfSA9ICRldmVudC5jb25uZWN0aW9uUGFpcjtcblxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmF2YWlsYWJsZVBvc2l0aW9ucykuc29tZSgoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgb3JpZ2luWCA9PT0gdGhpcy5hdmFpbGFibGVQb3NpdGlvbnNba2V5XS5vcmlnaW5YICYmIG9yaWdpblkgPT09IHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW2tleV0ub3JpZ2luWSAmJlxuICAgICAgICAgICAgICAgIG92ZXJsYXlYID09PSB0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1trZXldLm92ZXJsYXlYICYmIG92ZXJsYXlZID09PSB0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1trZXldLm92ZXJsYXlZXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBuZXdQbGFjZW1lbnQgPSBrZXkgYXMgUG9wVXBQbGFjZW1lbnRzO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wbGFjZW1lbnRDaGFuZ2UuZW1pdChuZXdQbGFjZW1lbnQpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ2xhc3NNYXAobmV3UGxhY2VtZW50KTtcblxuICAgICAgICBpZiAoJGV2ZW50LnNjcm9sbGFibGVWaWV3UHJvcGVydGllcy5pc092ZXJsYXlDbGlwcGVkICYmIHRoaXMuaW5zdGFuY2UuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgIC8vIEFmdGVyIHBvc2l0aW9uIGNoYW5nZXMgb2NjdXIgYW5kIHRoZSBvdmVybGF5IGlzIGNsaXBwZWQgYnlcbiAgICAgICAgICAgIC8vIGEgcGFyZW50IHNjcm9sbGFibGUgdGhlbiBjbG9zZSB0aGUgdG9vbHRpcC5cbiAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLmhpZGUoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0TGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLmNsZWFyTGlzdGVuZXJzKCk7XG5cbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlci5pbmNsdWRlcyhQb3BVcFRyaWdnZXJzLkNsaWNrKSkge1xuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNcbiAgICAgICAgICAgICAgICAuc2V0KCdjbGljaycsICgpID0+IHRoaXMuc2hvdygpKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKHRoaXMuYWRkRXZlbnRMaXN0ZW5lcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50cmlnZ2VyLmluY2x1ZGVzKFBvcFVwVHJpZ2dlcnMuSG92ZXIpKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1xuICAgICAgICAgICAgICAgIC5zZXQoJ21vdXNlZW50ZXInLCAoKSA9PiB0aGlzLnNob3coKSlcbiAgICAgICAgICAgICAgICAuc2V0KCdtb3VzZWxlYXZlJywgKCkgPT4gdGhpcy5oaWRlKCkpXG4gICAgICAgICAgICAgICAgLmZvckVhY2godGhpcy5hZGRFdmVudExpc3RlbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXIuaW5jbHVkZXMoUG9wVXBUcmlnZ2Vycy5Gb2N1cykpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgLnNldCgnZm9jdXMnLCAoKSA9PiB0aGlzLnNob3coKSlcbiAgICAgICAgICAgICAgICAuc2V0KCdibHVyJywgKCkgPT4gdGhpcy5oaWRlKCkpXG4gICAgICAgICAgICAgICAgLmZvckVhY2godGhpcy5hZGRFdmVudExpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBVcGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBwb3BvdmVyLiAqL1xuICAgIHVwZGF0ZVBvc2l0aW9uKHJlYXBwbHlQb3NpdGlvbjogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheSgpO1xuXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gKHRoaXMub3ZlcmxheVJlZi5nZXRDb25maWcoKS5wb3NpdGlvblN0cmF0ZWd5IGFzIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSlcbiAgICAgICAgICAgIC53aXRoUG9zaXRpb25zKHRoaXMuZ2V0UHJpb3JpdGl6ZWRQb3NpdGlvbnMoKSlcbiAgICAgICAgICAgIC53aXRoUHVzaCh0cnVlKTtcblxuICAgICAgICBpZiAocmVhcHBseVBvc2l0aW9uKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHBvc2l0aW9uLnJlYXBwbHlMYXN0UG9zaXRpb24oKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0UHJpb3JpdHlQbGFjZW1lbnRTdHJhdGVneSh2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW10pOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyW10ge1xuICAgICAgICBjb25zdCByZXN1bHQ6IENvbm5lY3Rpb25Qb3NpdGlvblBhaXJbXSA9IFtdO1xuICAgICAgICBjb25zdCBwb3NzaWJsZVBvc2l0aW9ucyA9IE9iamVjdC5rZXlzKHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zKTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlLmZvckVhY2goKHBvc2l0aW9uOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocG9zc2libGVQb3NpdGlvbnMuaW5jbHVkZXMocG9zaXRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW3Bvc2l0aW9uXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAocG9zc2libGVQb3NpdGlvbnMuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1t2YWx1ZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0UHJpb3JpdGl6ZWRQb3NpdGlvbnMoKSB7XG4gICAgICAgIGlmICh0aGlzLnBsYWNlbWVudFByaW9yaXR5KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRQcmlvcml0eVBsYWNlbWVudFN0cmF0ZWd5KHRoaXMucGxhY2VtZW50UHJpb3JpdHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFBPU0lUSU9OX1BSSU9SSVRZX1NUUkFURUdZW3RoaXMucGxhY2VtZW50XTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY2xlYXJMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2godGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKTtcblxuICAgICAgICB0aGlzLmxpc3RlbmVycy5jbGVhcigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkRXZlbnRMaXN0ZW5lciA9IChsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lciB8IEV2ZW50TGlzdGVuZXJPYmplY3QsIGV2ZW50OiBzdHJpbmcpID0+IHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlRXZlbnRMaXN0ZW5lciA9IChsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lciB8IEV2ZW50TGlzdGVuZXJPYmplY3QsIGV2ZW50OiBzdHJpbmcpID0+IHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIpO1xuICAgIH1cbn1cbiJdfQ==