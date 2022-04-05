import { Directionality } from '@angular/cdk/bidi';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { Directive, ElementRef, Inject, NgZone, Optional, ViewContainerRef } from '@angular/core';
import { McOption } from '@ptsecurity/mosaic/core';
import { McTooltipTrigger, MC_TOOLTIP_SCROLL_STRATEGY } from '@ptsecurity/mosaic/tooltip';
import * as i0 from "@angular/core";
import * as i1 from "@ptsecurity/mosaic/core";
import * as i2 from "@angular/cdk/overlay";
import * as i3 from "@angular/cdk/bidi";
export class McOptionTooltip extends McTooltipTrigger {
    constructor(option, overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) {
        super(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction);
        this.option = option;
    }
    get textElement() {
        return this.option.textElement.nativeElement;
    }
    get isOverflown() {
        return this.textElement.clientWidth < this.textElement.scrollWidth;
    }
    ngAfterViewInit() {
        this.content = this.option.viewValue;
        this.resizeObserver = new ResizeObserver(() => this.disabled = !this.isOverflown);
        this.mutationObserver = new MutationObserver(() => this.content = this.option.viewValue);
        this.mutationObserver.observe(this.textElement, {
            characterData: true, attributes: false, childList: true, subtree: true
        });
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.resizeObserver) {
            this.resizeObserver.unobserve(this.textElement);
            this.resizeObserver.disconnect();
        }
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
        }
    }
    onMouseEnter() {
        this.resizeObserver.observe(this.textElement);
        this.disabled = !this.isOverflown;
    }
    onMouseLeave() {
        this.resizeObserver.unobserve(this.textElement);
        this.disabled = true;
    }
}
/** @nocollapse */ /** @nocollapse */ McOptionTooltip.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McOptionTooltip, deps: [{ token: i1.McOption }, { token: i2.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i2.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_TOOLTIP_SCROLL_STRATEGY }, { token: i3.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McOptionTooltip.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: McOptionTooltip, selector: "mc-option", host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" } }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McOptionTooltip, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-option',
                    host: {
                        '(mouseenter)': 'onMouseEnter()',
                        '(mouseleave)': 'onMouseLeave()'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.McOption }, { type: i2.Overlay }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i2.ScrollDispatcher }, { type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_TOOLTIP_SCROLL_STRATEGY]
                }] }, { type: i3.Directionality, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LW9wdGlvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvc2VsZWN0L3NlbGVjdC1vcHRpb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakUsT0FBTyxFQUVILFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLE1BQU0sRUFFTixRQUFRLEVBQ1IsZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7QUFVMUYsTUFBTSxPQUFPLGVBQWdCLFNBQVEsZ0JBQWdCO0lBWWpELFlBQ1ksTUFBZ0IsRUFDeEIsT0FBZ0IsRUFDaEIsVUFBc0IsRUFDdEIsTUFBYyxFQUNkLGdCQUFrQyxFQUNsQyxRQUEwQixFQUNVLGNBQWMsRUFDdEMsU0FBeUI7UUFFckMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFUbEYsV0FBTSxHQUFOLE1BQU0sQ0FBVTtJQVU1QixDQUFDO0lBbkJELElBQUksV0FBVztRQUNYLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO0lBQ2pELENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDWCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO0lBQ3ZFLENBQUM7SUFlRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUVyQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFbEYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXpGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUM1QyxhQUFhLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSTtTQUN6RSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsV0FBVztRQUNQLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVwQixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDcEM7UUFFRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDdEM7SUFDTCxDQUFDO0lBRUQsWUFBWTtRQUNSLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUU5QyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUN0QyxDQUFDO0lBRUQsWUFBWTtRQUNSLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVoRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDOztrSkE1RFEsZUFBZSxpTEFtQlosMEJBQTBCO3NJQW5CN0IsZUFBZTsyRkFBZixlQUFlO2tCQVAzQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxXQUFXO29CQUNyQixJQUFJLEVBQUU7d0JBQ0YsY0FBYyxFQUFFLGdCQUFnQjt3QkFDaEMsY0FBYyxFQUFFLGdCQUFnQjtxQkFDbkM7aUJBQ0o7OzBCQW9CUSxNQUFNOzJCQUFDLDBCQUEwQjs7MEJBQ2pDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IE92ZXJsYXksIFNjcm9sbERpc3BhdGNoZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5qZWN0LFxuICAgIE5nWm9uZSxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3B0aW9uYWwsXG4gICAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1jT3B0aW9uIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNUb29sdGlwVHJpZ2dlciwgTUNfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1kgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvdG9vbHRpcCc7XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1vcHRpb24nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhtb3VzZWVudGVyKSc6ICdvbk1vdXNlRW50ZXIoKScsXG4gICAgICAgICcobW91c2VsZWF2ZSknOiAnb25Nb3VzZUxlYXZlKCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY09wdGlvblRvb2x0aXAgZXh0ZW5kcyBNY1Rvb2x0aXBUcmlnZ2VyIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIHJlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlcjtcbiAgICBwcml2YXRlIG11dGF0aW9uT2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG5cbiAgICBnZXQgdGV4dEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb24udGV4dEVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBnZXQgaXNPdmVyZmxvd24oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHRFbGVtZW50LmNsaWVudFdpZHRoIDwgdGhpcy50ZXh0RWxlbWVudC5zY3JvbGxXaWR0aDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBvcHRpb246IE1jT3B0aW9uLFxuICAgICAgICBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICAgICAgaG9zdFZpZXc6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIEBJbmplY3QoTUNfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1kpIHNjcm9sbFN0cmF0ZWd5LFxuICAgICAgICBAT3B0aW9uYWwoKSBkaXJlY3Rpb246IERpcmVjdGlvbmFsaXR5XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKG92ZXJsYXksIGVsZW1lbnRSZWYsIG5nWm9uZSwgc2Nyb2xsRGlzcGF0Y2hlciwgaG9zdFZpZXcsIHNjcm9sbFN0cmF0ZWd5LCBkaXJlY3Rpb24pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5vcHRpb24udmlld1ZhbHVlO1xuXG4gICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdGhpcy5kaXNhYmxlZCA9ICF0aGlzLmlzT3ZlcmZsb3duKTtcblxuICAgICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB0aGlzLmNvbnRlbnQgPSB0aGlzLm9wdGlvbi52aWV3VmFsdWUpO1xuXG4gICAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMudGV4dEVsZW1lbnQsIHtcbiAgICAgICAgICAgIGNoYXJhY3RlckRhdGE6IHRydWUsIGF0dHJpYnV0ZXM6IGZhbHNlLCBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG5cbiAgICAgICAgaWYgKHRoaXMucmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIudW5vYnNlcnZlKHRoaXMudGV4dEVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Nb3VzZUVudGVyKCkge1xuICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy50ZXh0RWxlbWVudCk7XG5cbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9ICF0aGlzLmlzT3ZlcmZsb3duO1xuICAgIH1cblxuICAgIG9uTW91c2VMZWF2ZSgpIHtcbiAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci51bm9ic2VydmUodGhpcy50ZXh0RWxlbWVudCk7XG5cbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxufVxuIl19