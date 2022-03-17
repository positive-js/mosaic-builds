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
            this.instance.detectChanges();
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
        const strategy = this.overlay
            .position()
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
/** @nocollapse */ /** @nocollapse */ McPopUpTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McPopUpTrigger, deps: "invalid", target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McPopUpTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0", type: McPopUpTrigger, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McPopUpTrigger, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i1.ScrollDispatcher }, { type: i0.ViewContainerRef }, { type: undefined }, { type: i2.Directionality }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wLXVwLXRyaWdnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvY29yZS9wb3AtdXAvcG9wLXVwLXRyaWdnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFJSCxPQUFPLEVBRVAsZ0JBQWdCLEVBQ25CLE1BQU0sc0JBQXNCLENBQUM7QUFFOUIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUVWLE1BQU0sRUFHTixnQkFBZ0IsRUFDbkIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLEtBQUssSUFBSSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkYsT0FBTyxFQUNILDBCQUEwQixFQUMxQixZQUFZLEVBQ1osMEJBQTBCLEVBQzFCLG1CQUFtQixFQUN0QixNQUFNLGlDQUFpQyxDQUFDO0FBRXpDLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7O0FBSTdELDZDQUE2QztBQUM3QyxNQUFNLE9BQWdCLGNBQWM7SUFzQ2hDLFlBQ2MsT0FBZ0IsRUFDaEIsVUFBc0IsRUFDdEIsTUFBYyxFQUNkLGdCQUFrQyxFQUNsQyxRQUEwQixFQUMxQixjQUFjLEVBQ2QsU0FBMEI7UUFOMUIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFdBQU0sR0FBTixN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Y3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZSxcbiAgICBDb25uZWN0aW9uUG9zaXRpb25QYWlyLFxuICAgIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSxcbiAgICBPdmVybGF5LFxuICAgIE92ZXJsYXlSZWYsXG4gICAgU2Nyb2xsRGlzcGF0Y2hlclxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBPdmVybGF5Q29uZmlnIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXkvb3ZlcmxheS1jb25maWcnO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBOZ1pvbmUsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVHlwZSxcbiAgICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRVNDQVBFIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlbGF5IGFzIHJ4RGVsYXksIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7XG4gICAgRVhURU5ERURfT1ZFUkxBWV9QT1NJVElPTlMsXG4gICAgUE9TSVRJT05fTUFQLFxuICAgIFBPU0lUSU9OX1BSSU9SSVRZX1NUUkFURUdZLFxuICAgIFBPU0lUSU9OX1RPX0NTU19NQVBcbn0gZnJvbSAnLi4vb3ZlcmxheS9vdmVybGF5LXBvc2l0aW9uLW1hcCc7XG5cbmltcG9ydCB7IFBvcFVwUGxhY2VtZW50cywgUG9wVXBUcmlnZ2VycyB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuXG5ARGlyZWN0aXZlKClcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1jUG9wVXBUcmlnZ2VyPFQ+IHtcbiAgICBpc09wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGVudGVyRGVsYXk6IG51bWJlciA9IDA7XG4gICAgbGVhdmVEZWxheTogbnVtYmVyID0gMDtcblxuICAgIGFic3RyYWN0IGRpc2FibGVkOiBib29sZWFuO1xuICAgIGFic3RyYWN0IHRyaWdnZXI6IHN0cmluZztcbiAgICBhYnN0cmFjdCBjdXN0b21DbGFzczogc3RyaW5nO1xuICAgIGFic3RyYWN0IGNvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBhYnN0cmFjdCBwbGFjZW1lbnRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+O1xuICAgIGFic3RyYWN0IHZpc2libGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPjtcblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBvcmlnaW5TZWxlY3Rvcjogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBvdmVybGF5Q29uZmlnOiBPdmVybGF5Q29uZmlnO1xuXG4gICAgcHJvdGVjdGVkIHBsYWNlbWVudCA9IFBvcFVwUGxhY2VtZW50cy5Ub3A7XG4gICAgcHJvdGVjdGVkIHBsYWNlbWVudFByaW9yaXR5OiBzdHJpbmcgfCBzdHJpbmdbXSB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJvdGVjdGVkIHZpc2libGUgPSBmYWxzZTtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvbiBvcnRob2RveC1nZXR0ZXItYW5kLXNldHRlclxuICAgIHByb3RlY3RlZCBfY29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb24gb3J0aG9kb3gtZ2V0dGVyLWFuZC1zZXR0ZXJcbiAgICBwcm90ZWN0ZWQgX2Rpc2FibGVkOiBib29sZWFuO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvbiBvcnRob2RveC1nZXR0ZXItYW5kLXNldHRlclxuICAgIHByb3RlY3RlZCBfY3VzdG9tQ2xhc3M6IHN0cmluZztcblxuICAgIHByb3RlY3RlZCBvdmVybGF5UmVmOiBPdmVybGF5UmVmIHwgbnVsbDtcbiAgICBwcm90ZWN0ZWQgcG9ydGFsOiBDb21wb25lbnRQb3J0YWw8VD47XG4gICAgcHJvdGVjdGVkIGluc3RhbmNlOiBhbnkgfCBudWxsO1xuXG4gICAgcHJvdGVjdGVkIGxpc3RlbmVycyA9IG5ldyBNYXA8c3RyaW5nLCBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0PigpO1xuXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGF2YWlsYWJsZVBvc2l0aW9uczogeyBba2V5OiBzdHJpbmddOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyIH07XG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGRlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJvdGVjdGVkIG5nWm9uZTogTmdab25lLFxuICAgICAgICBwcm90ZWN0ZWQgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICAgICAgcHJvdGVjdGVkIGhvc3RWaWV3OiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwcm90ZWN0ZWQgc2Nyb2xsU3RyYXRlZ3ksXG4gICAgICAgIHByb3RlY3RlZCBkaXJlY3Rpb24/OiBEaXJlY3Rpb25hbGl0eVxuICAgICkge1xuICAgICAgICB0aGlzLmF2YWlsYWJsZVBvc2l0aW9ucyA9IFBPU0lUSU9OX01BUDtcbiAgICB9XG5cbiAgICBhYnN0cmFjdCB1cGRhdGVDbGFzc01hcChuZXdQbGFjZW1lbnQ/OiBzdHJpbmcpOiB2b2lkO1xuXG4gICAgYWJzdHJhY3QgdXBkYXRlRGF0YSgpOiB2b2lkO1xuXG4gICAgYWJzdHJhY3QgY2xvc2luZ0FjdGlvbnMoKTogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gICAgYWJzdHJhY3QgZ2V0T3ZlcmxheUhhbmRsZUNvbXBvbmVudFR5cGUoKTogVHlwZTxUPjtcblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXRMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2godGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKTtcblxuICAgICAgICB0aGlzLmxpc3RlbmVycy5jbGVhcigpO1xuXG4gICAgICAgIHRoaXMuZGVzdHJveWVkLm5leHQoKTtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVQbGFjZW1lbnQodmFsdWU6IFBvcFVwUGxhY2VtZW50cykge1xuICAgICAgICBpZiAoUE9TSVRJT05fVE9fQ1NTX01BUFt2YWx1ZV0pIHtcbiAgICAgICAgICAgIHRoaXMucGxhY2VtZW50ID0gdmFsdWU7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2xhc3NNYXAoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGxhY2VtZW50ID0gUG9wVXBQbGFjZW1lbnRzLlRvcDtcblxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBVbmtub3duIHBvc2l0aW9uOiAke3ZhbHVlfS4gV2lsbCB1c2VkIGRlZmF1bHQgcG9zaXRpb246ICR7dGhpcy5wbGFjZW1lbnR9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy52aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVQbGFjZW1lbnRQcmlvcml0eSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5wbGFjZW1lbnRQcmlvcml0eSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wbGFjZW1lbnRQcmlvcml0eSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVWaXNpYmxlKGV4dGVybmFsVmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZXh0ZXJuYWxWYWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMudmlzaWJsZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IHZhbHVlO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzT3BlbiAmJiBldmVudC5rZXlDb2RlID09PSBFU0NBUEUpIHsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVUb3VjaGVuZCgpIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgc2hvdyhkZWxheTogbnVtYmVyID0gdGhpcy5lbnRlckRlbGF5KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMuaW5zdGFuY2UpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgICAgIHRoaXMuZGV0YWNoKCk7XG5cbiAgICAgICAgdGhpcy5wb3J0YWwgPSB0aGlzLnBvcnRhbCB8fCBuZXcgQ29tcG9uZW50UG9ydGFsKHRoaXMuZ2V0T3ZlcmxheUhhbmRsZUNvbXBvbmVudFR5cGUoKSwgdGhpcy5ob3N0Vmlldyk7XG5cbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IHRoaXMub3ZlcmxheVJlZi5hdHRhY2godGhpcy5wb3J0YWwpLmluc3RhbmNlO1xuXG4gICAgICAgIHRoaXMuaW5zdGFuY2UuYWZ0ZXJIaWRkZW4oKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUodGhpcy5kZXRhY2gpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ2xhc3NNYXAoKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZURhdGEoKTtcblxuICAgICAgICB0aGlzLmluc3RhbmNlLnZpc2libGVDaGFuZ2VcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzT3BlbiA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuXG4gICAgICAgIHRoaXMuaW5zdGFuY2Uuc2hvdyhkZWxheSk7XG4gICAgfVxuXG4gICAgaGlkZShkZWxheTogbnVtYmVyID0gdGhpcy5sZWF2ZURlbGF5KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLmhpZGUoZGVsYXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGV0YWNoID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmICYmIHRoaXMub3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluc3RhbmNlID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKiogQ3JlYXRlIHRoZSBvdmVybGF5IGNvbmZpZyBhbmQgcG9zaXRpb24gc3RyYXRlZ3kgKi9cbiAgICBjcmVhdGVPdmVybGF5KCk6IE92ZXJsYXlSZWYge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7IHJldHVybiB0aGlzLm92ZXJsYXlSZWY7IH1cblxuICAgICAgICAvLyBDcmVhdGUgY29ubmVjdGVkIHBvc2l0aW9uIHN0cmF0ZWd5IHRoYXQgbGlzdGVucyBmb3Igc2Nyb2xsIGV2ZW50cyB0byByZXBvc2l0aW9uLlxuICAgICAgICBjb25zdCBzdHJhdGVneSA9IHRoaXMub3ZlcmxheVxuICAgICAgICAgICAgLnBvc2l0aW9uKClcbiAgICAgICAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHRoaXMuZWxlbWVudFJlZilcbiAgICAgICAgICAgIC53aXRoVHJhbnNmb3JtT3JpZ2luT24odGhpcy5vcmlnaW5TZWxlY3RvcilcbiAgICAgICAgICAgIC53aXRoRmxleGlibGVEaW1lbnNpb25zKGZhbHNlKVxuICAgICAgICAgICAgLndpdGhQb3NpdGlvbnMoWy4uLkVYVEVOREVEX09WRVJMQVlfUE9TSVRJT05TXSlcbiAgICAgICAgICAgIC53aXRoU2Nyb2xsYWJsZUNvbnRhaW5lcnModGhpcy5zY3JvbGxEaXNwYXRjaGVyLmdldEFuY2VzdG9yU2Nyb2xsQ29udGFpbmVycyh0aGlzLmVsZW1lbnRSZWYpKTtcblxuICAgICAgICBzdHJhdGVneS5wb3NpdGlvbkNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMub25Qb3NpdGlvbkNoYW5nZSk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh7XG4gICAgICAgICAgICAuLi50aGlzLm92ZXJsYXlDb25maWcsXG4gICAgICAgICAgICBkaXJlY3Rpb246IHRoaXMuZGlyZWN0aW9uLFxuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneTogc3RyYXRlZ3ksXG4gICAgICAgICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5zY3JvbGxTdHJhdGVneSgpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2xvc2luZ0FjdGlvbnMoKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5waXBlKHJ4RGVsYXkoMCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuaGlkZSgpKTtcblxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYub3V0c2lkZVBvaW50ZXJFdmVudHMoKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmluc3RhbmNlIS5oYW5kbGVCb2R5SW50ZXJhY3Rpb24oKSk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaG1lbnRzKClcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMuZGV0YWNoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5UmVmO1xuICAgIH1cblxuICAgIG9uUG9zaXRpb25DaGFuZ2UgPSAoJGV2ZW50OiBDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2UpOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGxldCBuZXdQbGFjZW1lbnQgPSB0aGlzLnBsYWNlbWVudDtcblxuICAgICAgICBjb25zdCB7IG9yaWdpblgsIG9yaWdpblksIG92ZXJsYXlYLCBvdmVybGF5WSB9ID0gJGV2ZW50LmNvbm5lY3Rpb25QYWlyO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zKS5zb21lKChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBvcmlnaW5YID09PSB0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1trZXldLm9yaWdpblggJiYgb3JpZ2luWSA9PT0gdGhpcy5hdmFpbGFibGVQb3NpdGlvbnNba2V5XS5vcmlnaW5ZICYmXG4gICAgICAgICAgICAgICAgb3ZlcmxheVggPT09IHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW2tleV0ub3ZlcmxheVggJiYgb3ZlcmxheVkgPT09IHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW2tleV0ub3ZlcmxheVlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5ld1BsYWNlbWVudCA9IGtleSBhcyBQb3BVcFBsYWNlbWVudHM7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnBsYWNlbWVudENoYW5nZS5lbWl0KG5ld1BsYWNlbWVudCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDbGFzc01hcChuZXdQbGFjZW1lbnQpO1xuXG4gICAgICAgIHRoaXMuaW5zdGFuY2UuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIGluaXRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJMaXN0ZW5lcnMoKTtcblxuICAgICAgICBpZiAodGhpcy50cmlnZ2VyLmluY2x1ZGVzKFBvcFVwVHJpZ2dlcnMuQ2xpY2spKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1xuICAgICAgICAgICAgICAgIC5zZXQoJ2NsaWNrJywgKCkgPT4gdGhpcy5zaG93KCkpXG4gICAgICAgICAgICAgICAgLmZvckVhY2godGhpcy5hZGRFdmVudExpc3RlbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXIuaW5jbHVkZXMoUG9wVXBUcmlnZ2Vycy5Ib3ZlcikpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgLnNldCgnbW91c2VlbnRlcicsICgpID0+IHRoaXMuc2hvdygpKVxuICAgICAgICAgICAgICAgIC5zZXQoJ21vdXNlbGVhdmUnLCAoKSA9PiB0aGlzLmhpZGUoKSlcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCh0aGlzLmFkZEV2ZW50TGlzdGVuZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlci5pbmNsdWRlcyhQb3BVcFRyaWdnZXJzLkZvY3VzKSkge1xuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNcbiAgICAgICAgICAgICAgICAuc2V0KCdmb2N1cycsICgpID0+IHRoaXMuc2hvdygpKVxuICAgICAgICAgICAgICAgIC5zZXQoJ2JsdXInLCAoKSA9PiB0aGlzLmhpZGUoKSlcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCh0aGlzLmFkZEV2ZW50TGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFVwZGF0ZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IHBvcG92ZXIuICovXG4gICAgdXBkYXRlUG9zaXRpb24ocmVhcHBseVBvc2l0aW9uOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG5cbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSAodGhpcy5vdmVybGF5UmVmLmdldENvbmZpZygpLnBvc2l0aW9uU3RyYXRlZ3kgYXMgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5KVxuICAgICAgICAgICAgLndpdGhQb3NpdGlvbnModGhpcy5nZXRQcmlvcml0aXplZFBvc2l0aW9ucygpKVxuICAgICAgICAgICAgLndpdGhQdXNoKHRydWUpO1xuXG4gICAgICAgIGlmIChyZWFwcGx5UG9zaXRpb24pIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcG9zaXRpb24ucmVhcHBseUxhc3RQb3NpdGlvbigpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRQcmlvcml0eVBsYWNlbWVudFN0cmF0ZWd5KHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSk6IENvbm5lY3Rpb25Qb3NpdGlvblBhaXJbXSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdDogQ29ubmVjdGlvblBvc2l0aW9uUGFpcltdID0gW107XG4gICAgICAgIGNvbnN0IHBvc3NpYmxlUG9zaXRpb25zID0gT2JqZWN0LmtleXModGhpcy5hdmFpbGFibGVQb3NpdGlvbnMpO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUuZm9yRWFjaCgocG9zaXRpb246IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwb3NzaWJsZVBvc2l0aW9ucy5pbmNsdWRlcyhwb3NpdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5hdmFpbGFibGVQb3NpdGlvbnNbcG9zaXRpb25dKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChwb3NzaWJsZVBvc2l0aW9ucy5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW3ZhbHVlXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRQcmlvcml0aXplZFBvc2l0aW9ucygpIHtcbiAgICAgICAgaWYgKHRoaXMucGxhY2VtZW50UHJpb3JpdHkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFByaW9yaXR5UGxhY2VtZW50U3RyYXRlZ3kodGhpcy5wbGFjZW1lbnRQcmlvcml0eSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUE9TSVRJT05fUFJJT1JJVFlfU1RSQVRFR1lbdGhpcy5wbGFjZW1lbnRdO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjbGVhckxpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaCh0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIpO1xuXG4gICAgICAgIHRoaXMubGlzdGVuZXJzLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRFdmVudExpc3RlbmVyID0gKGxpc3RlbmVyOiBFdmVudExpc3RlbmVyIHwgRXZlbnRMaXN0ZW5lck9iamVjdCwgZXZlbnQ6IHN0cmluZykgPT4ge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVFdmVudExpc3RlbmVyID0gKGxpc3RlbmVyOiBFdmVudExpc3RlbmVyIHwgRXZlbnRMaXN0ZW5lck9iamVjdCwgZXZlbnQ6IHN0cmluZykgPT4ge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgfVxufVxuIl19