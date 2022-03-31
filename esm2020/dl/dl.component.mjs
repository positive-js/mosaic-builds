import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class McDlComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.minWidth = 400;
        this.wide = false;
        this.vertical = null;
        this.resizeStream = new Subject();
        this.resizeDebounceInterval = 100;
        this.resizeSubscription = Subscription.EMPTY;
        this.updateState = () => {
            const { width } = this.elementRef.nativeElement.getClientRects()[0];
            this.vertical = width <= this.minWidth;
        };
    }
    ngAfterContentInit() {
        if (this.vertical !== null) {
            return;
        }
        this.resizeSubscription = this.resizeStream
            .pipe(debounceTime(this.resizeDebounceInterval))
            .subscribe(this.updateState);
    }
    ngOnDestroy() {
        this.resizeSubscription.unsubscribe();
    }
}
/** @nocollapse */ /** @nocollapse */ McDlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDlComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McDlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McDlComponent, selector: "mc-dl", inputs: { minWidth: "minWidth", wide: "wide", vertical: "vertical" }, host: { listeners: { "window:resize": "resizeStream.next()" }, properties: { "class.mc-dl_vertical": "vertical", "class.mc-dl_wide": "wide" }, classAttribute: "mc-dl" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [".mc-dl{display:grid;grid-column-gap:var(--mc-description-list-size-horizontal-column-gap, 16px);column-gap:var(--mc-description-list-size-horizontal-column-gap, 16px);grid-row-gap:var(--mc-description-list-size-horizontal-row-gap, 12px);row-gap:var(--mc-description-list-size-horizontal-row-gap, 12px);grid-template-columns:repeat(4,1fr)}.mc-dl .mc-dt{grid-column:var(--mc-description-list-size-dt-grid-column, 1)}.mc-dl .mc-dd{grid-column:var(--mc-description-list-size-dd-grid-column, 2/span 3)}.mc-dl.mc-dl_wide{grid-template-columns:repeat(2,1fr)}.mc-dl.mc-dl_wide .mc-dt{grid-column:1}.mc-dl.mc-dl_wide .mc-dd{grid-column:2}.mc-dl.mc-dl_vertical{grid-template-columns:repeat(1,1fr);column-gap:var(--mc-description-list-size-vertical-column-gap, 0);row-gap:var(--mc-description-list-size-vertical-row-gap, 2px)}.mc-dl.mc-dl_vertical .mc-dt,.mc-dl.mc-dl_vertical .mc-dd{grid-column:1}.mc-dl.mc-dl_vertical .mc-dd{margin-bottom:var(--mc-description-list-size-vertical-dd-margin-bottom, 16px)}\n"], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mc-dl', template: '<ng-content></ng-content>', host: {
                        class: 'mc-dl',
                        '[class.mc-dl_vertical]': 'vertical',
                        '[class.mc-dl_wide]': 'wide',
                        '(window:resize)': 'resizeStream.next()'
                    }, encapsulation: ViewEncapsulation.None, styles: [".mc-dl{display:grid;grid-column-gap:var(--mc-description-list-size-horizontal-column-gap, 16px);column-gap:var(--mc-description-list-size-horizontal-column-gap, 16px);grid-row-gap:var(--mc-description-list-size-horizontal-row-gap, 12px);row-gap:var(--mc-description-list-size-horizontal-row-gap, 12px);grid-template-columns:repeat(4,1fr)}.mc-dl .mc-dt{grid-column:var(--mc-description-list-size-dt-grid-column, 1)}.mc-dl .mc-dd{grid-column:var(--mc-description-list-size-dd-grid-column, 2/span 3)}.mc-dl.mc-dl_wide{grid-template-columns:repeat(2,1fr)}.mc-dl.mc-dl_wide .mc-dt{grid-column:1}.mc-dl.mc-dl_wide .mc-dd{grid-column:2}.mc-dl.mc-dl_vertical{grid-template-columns:repeat(1,1fr);column-gap:var(--mc-description-list-size-vertical-column-gap, 0);row-gap:var(--mc-description-list-size-vertical-row-gap, 2px)}.mc-dl.mc-dl_vertical .mc-dt,.mc-dl.mc-dl_vertical .mc-dd{grid-column:1}.mc-dl.mc-dl_vertical .mc-dd{margin-bottom:var(--mc-description-list-size-vertical-dd-margin-bottom, 16px)}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { minWidth: [{
                type: Input
            }], wide: [{
                type: Input
            }], vertical: [{
                type: Input
            }] } });
export class McDtComponent {
}
/** @nocollapse */ /** @nocollapse */ McDtComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDtComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McDtComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McDtComponent, selector: "mc-dt", host: { classAttribute: "mc-dt" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDtComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-dt',
                    template: '<ng-content></ng-content>',
                    host: {
                        class: 'mc-dt'
                    },
                    encapsulation: ViewEncapsulation.None
                }]
        }] });
export class McDdComponent {
}
/** @nocollapse */ /** @nocollapse */ McDdComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDdComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McDdComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McDdComponent, selector: "mc-dd", host: { classAttribute: "mc-dd" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDdComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-dd',
                    template: '<ng-content></ng-content>',
                    host: {
                        class: 'mc-dd'
                    },
                    encapsulation: ViewEncapsulation.None
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2RsL2RsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUgsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBRUwsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFlOUMsTUFBTSxPQUFPLGFBQWE7SUFXdEIsWUFBc0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQVZuQyxhQUFRLEdBQVcsR0FBRyxDQUFDO1FBQ3ZCLFNBQUksR0FBRyxLQUFLLENBQUM7UUFDYixhQUFRLEdBQW1CLElBQUksQ0FBQztRQUVoQyxpQkFBWSxHQUFHLElBQUksT0FBTyxFQUFTLENBQUM7UUFDNUIsMkJBQXNCLEdBQVcsR0FBRyxDQUFDO1FBRTlDLHVCQUFrQixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFpQmhELGdCQUFXLEdBQUcsR0FBRyxFQUFFO1lBQ2YsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXBFLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDM0MsQ0FBQyxDQUFBO0lBbEI4QyxDQUFDO0lBRWhELGtCQUFrQjtRQUNkLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFFdkMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxZQUFZO2FBQ3RDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7YUFDL0MsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQyxDQUFDOztnSkF2QlEsYUFBYTtvSUFBYixhQUFhLDZSQVZaLDJCQUEyQjsyRkFVNUIsYUFBYTtrQkFaekIsU0FBUzsrQkFDSSxPQUFPLFlBQ1AsMkJBQTJCLFFBRS9CO3dCQUNGLEtBQUssRUFBRSxPQUFPO3dCQUNkLHdCQUF3QixFQUFFLFVBQVU7d0JBQ3BDLG9CQUFvQixFQUFFLE1BQU07d0JBQzVCLGlCQUFpQixFQUFFLHFCQUFxQjtxQkFDM0MsaUJBQ2MsaUJBQWlCLENBQUMsSUFBSTtpR0FHNUIsUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSzs7QUFxQ1YsTUFBTSxPQUFPLGFBQWE7O2dKQUFiLGFBQWE7b0lBQWIsYUFBYSxnRkFOWiwyQkFBMkI7MkZBTTVCLGFBQWE7a0JBUnpCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLE9BQU87b0JBQ2pCLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsT0FBTztxQkFDakI7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7aUJBQ3hDOztBQVdELE1BQU0sT0FBTyxhQUFhOztnSkFBYixhQUFhO29JQUFiLGFBQWEsZ0ZBTlosMkJBQTJCOzJGQU01QixhQUFhO2tCQVJ6QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxPQUFPO29CQUNqQixRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLE9BQU87cUJBQ2pCO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLWRsJyxcbiAgICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAgIHN0eWxlVXJsczogWydkbC5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWRsJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kbF92ZXJ0aWNhbF0nOiAndmVydGljYWwnLFxuICAgICAgICAnW2NsYXNzLm1jLWRsX3dpZGVdJzogJ3dpZGUnLFxuICAgICAgICAnKHdpbmRvdzpyZXNpemUpJzogJ3Jlc2l6ZVN0cmVhbS5uZXh0KCknXG4gICAgfSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1jRGxDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIG1pbldpZHRoOiBudW1iZXIgPSA0MDA7XG4gICAgQElucHV0KCkgd2lkZSA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHZlcnRpY2FsOiBib29sZWFuIHwgbnVsbCA9IG51bGw7XG5cbiAgICByZWFkb25seSByZXNpemVTdHJlYW0gPSBuZXcgU3ViamVjdDxFdmVudD4oKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJlc2l6ZURlYm91bmNlSW50ZXJ2YWw6IG51bWJlciA9IDEwMDtcblxuICAgIHByaXZhdGUgcmVzaXplU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudmVydGljYWwgIT09IG51bGwpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5yZXNpemVTdWJzY3JpcHRpb24gPSB0aGlzLnJlc2l6ZVN0cmVhbVxuICAgICAgICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKHRoaXMucmVzaXplRGVib3VuY2VJbnRlcnZhbCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMudXBkYXRlU3RhdGUpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVN0YXRlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB7IHdpZHRoIH0gPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRDbGllbnRSZWN0cygpWzBdO1xuXG4gICAgICAgIHRoaXMudmVydGljYWwgPSB3aWR0aCA8PSB0aGlzLm1pbldpZHRoO1xuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1kdCcsXG4gICAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtZHQnXG4gICAgfSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1jRHRDb21wb25lbnQge31cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1kZCcsXG4gICAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtZGQnXG4gICAgfSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1jRGRDb21wb25lbnQge31cbiJdfQ==