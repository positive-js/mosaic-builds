import { FocusMonitor } from '@angular/cdk/a11y';
import { Output, ChangeDetectionStrategy, Component, ElementRef, Input, EventEmitter, ViewEncapsulation } from '@angular/core';
import { SPACE } from '@ptsecurity/cdk/keycodes';
import { mixinColor } from '@ptsecurity/mosaic/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
export class McCardBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
export const McCardBaseMixin = mixinColor(McCardBase);
export class McCard extends McCardBaseMixin {
    constructor(elementRef, _focusMonitor) {
        super(elementRef);
        this._focusMonitor = _focusMonitor;
        this.readonly = false;
        this.selected = false;
        this.selectedChange = new EventEmitter();
        this._tabIndex = 0;
        this._focusMonitor.monitor(this._elementRef.nativeElement, false);
    }
    get tabIndex() {
        return this.readonly ? null : this._tabIndex;
    }
    set tabIndex(value) {
        this._tabIndex = value;
    }
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
    focus() {
        this.hostElement.focus();
    }
    onClick($event) {
        if (!this.readonly) {
            $event.stopPropagation();
            this.selectedChange.emit(!this.selected);
        }
    }
    onKeyDown($event) {
        // tslint:disable-next-line:deprecation
        switch ($event.keyCode) {
            case SPACE:
                if (!this.readonly) {
                    $event.preventDefault();
                    this.selectedChange.emit(!this.selected);
                }
                break;
            default:
        }
    }
    get hostElement() {
        return this._elementRef.nativeElement;
    }
}
/** @nocollapse */ /** @nocollapse */ McCard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McCard, deps: [{ token: i0.ElementRef }, { token: i1.FocusMonitor }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McCard.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: McCard, selector: "mc-card", inputs: { color: "color", readonly: "readonly", selected: "selected", tabIndex: "tabIndex" }, outputs: { selectedChange: "selectedChange" }, host: { listeners: { "keydown": "onKeyDown($event)", "click": "onClick($event)" }, properties: { "class.mc-card_readonly": "readonly", "class.mc-selected": "selected", "attr.tabindex": "tabIndex" }, classAttribute: "mc-card" }, usesInheritance: true, ngImport: i0, template: "<ng-content></ng-content>\n<div class=\"mc-card__overlay\"></div>\n", styles: [".mc-card{position:relative;box-sizing:border-box;display:flex;flex-direction:column;cursor:pointer;border-left-width:4px;border-left-width:var(--mc-card-size-vertical-line, 4px);border-left-style:solid;border-left-color:transparent}.mc-card:focus{outline:none}.mc-card .mc-card__overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;background:transparent}.mc-card.mc-card_readonly{cursor:auto}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McCard, decorators: [{
            type: Component,
            args: [{ selector: 'mc-card', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, inputs: ['color'], host: {
                        class: 'mc-card',
                        '[class.mc-card_readonly]': 'readonly',
                        '[class.mc-selected]': 'selected',
                        '[attr.tabindex]': 'tabIndex',
                        '(keydown)': 'onKeyDown($event)',
                        '(click)': 'onClick($event)'
                    }, template: "<ng-content></ng-content>\n<div class=\"mc-card__overlay\"></div>\n", styles: [".mc-card{position:relative;box-sizing:border-box;display:flex;flex-direction:column;cursor:pointer;border-left-width:4px;border-left-width:var(--mc-card-size-vertical-line, 4px);border-left-style:solid;border-left-color:transparent}.mc-card:focus{outline:none}.mc-card .mc-card__overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;background:transparent}.mc-card.mc-card_readonly{cursor:auto}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.FocusMonitor }]; }, propDecorators: { readonly: [{
                type: Input
            }], selected: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], tabIndex: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvY2FyZC9jYXJkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9jYXJkL2NhcmQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFDSCxNQUFNLEVBQ04sdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUVMLFlBQVksRUFDWixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pELE9BQU8sRUFBZ0IsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7OztBQUduRSxNQUFNLE9BQU8sVUFBVTtJQUNuQiw2Q0FBNkM7SUFDN0MsWUFBbUIsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDO0NBQ2pEO0FBRUQsNkNBQTZDO0FBQzdDLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBcUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBbUJ4RixNQUFNLE9BQU8sTUFBTyxTQUFRLGVBQWU7SUFxQnZDLFlBQVksVUFBc0IsRUFBVSxhQUEyQjtRQUNuRSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFEc0Isa0JBQWEsR0FBYixhQUFhLENBQWM7UUFuQnZFLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFHakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUdqQixtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFXckMsY0FBUyxHQUFrQixDQUFDLENBQUM7UUFLakMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQWZELElBQ0ksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ2pELENBQUM7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFvQjtRQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBVUQsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxPQUFPLENBQUMsTUFBa0I7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBRXpCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFxQjtRQUMzQix1Q0FBdUM7UUFDdkMsUUFBUSxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ3BCLEtBQUssS0FBSztnQkFDTixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDaEIsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDNUM7Z0JBQ0QsTUFBTTtZQUNWLFFBQVE7U0FDWDtJQUNMLENBQUM7SUFFRCxJQUFZLFdBQVc7UUFDbkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztJQUMxQyxDQUFDOzt5SUExRFEsTUFBTTs2SEFBTixNQUFNLHViQ3hDbkIscUVBRUE7MkZEc0NhLE1BQU07a0JBaEJsQixTQUFTOytCQUNJLFNBQVMsbUJBR0YsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSSxVQUM3QixDQUFDLE9BQU8sQ0FBQyxRQUNYO3dCQUNGLEtBQUssRUFBRSxTQUFTO3dCQUNoQiwwQkFBMEIsRUFBRSxVQUFVO3dCQUN0QyxxQkFBcUIsRUFBRSxVQUFVO3dCQUNqQyxpQkFBaUIsRUFBRSxVQUFVO3dCQUM3QixXQUFXLEVBQUUsbUJBQW1CO3dCQUNoQyxTQUFTLEVBQUUsaUJBQWlCO3FCQUMvQjs0SEFJRCxRQUFRO3NCQURQLEtBQUs7Z0JBSU4sUUFBUTtzQkFEUCxLQUFLO2dCQUlOLGNBQWM7c0JBRGIsTUFBTTtnQkFJSCxRQUFRO3NCQURYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIE91dHB1dCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU1BBQ0UgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgQ2FuQ29sb3JDdG9yLCBtaXhpbkNvbG9yIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5cbmV4cG9ydCBjbGFzcyBNY0NhcmRCYXNlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jQ2FyZEJhc2VNaXhpbjogQ2FuQ29sb3JDdG9yICYgdHlwZW9mIE1jQ2FyZEJhc2UgPSBtaXhpbkNvbG9yKE1jQ2FyZEJhc2UpO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtY2FyZCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NhcmQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NhcmQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGlucHV0czogWydjb2xvciddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1jYXJkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1jYXJkX3JlYWRvbmx5XSc6ICdyZWFkb25seScsXG4gICAgICAgICdbY2xhc3MubWMtc2VsZWN0ZWRdJzogJ3NlbGVjdGVkJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgICAgICcoa2V5ZG93biknOiAnb25LZXlEb3duKCRldmVudCknLFxuICAgICAgICAnKGNsaWNrKSc6ICdvbkNsaWNrKCRldmVudCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0NhcmQgZXh0ZW5kcyBNY0NhcmRCYXNlTWl4aW4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpXG4gICAgcmVhZG9ubHkgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0ZWQgPSBmYWxzZTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgdGFiSW5kZXgoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWRvbmx5ID8gbnVsbCA6IHRoaXMuX3RhYkluZGV4O1xuICAgIH1cblxuICAgIHNldCB0YWJJbmRleCh2YWx1ZTogbnVtYmVyIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl90YWJJbmRleCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RhYkluZGV4OiBudW1iZXIgfCBudWxsID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuXG4gICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgZmFsc2UpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ob3N0RWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIG9uQ2xpY2soJGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQoIXRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlEb3duKCRldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgc3dpdGNoICgkZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSBTUEFDRTpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCghdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IGhvc3RFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cbn1cbiIsIjxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjxkaXYgY2xhc3M9XCJtYy1jYXJkX19vdmVybGF5XCI+PC9kaXY+XG4iXX0=