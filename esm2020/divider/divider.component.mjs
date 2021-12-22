import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
export class McDivider {
    constructor() {
        this._vertical = false;
        this._inset = false;
    }
    // Whether the divider is vertically aligned.
    get vertical() {
        return this._vertical;
    }
    set vertical(value) {
        this._vertical = coerceBooleanProperty(value);
    }
    // Whether the divider is an inset divider.
    get inset() {
        return this._inset;
    }
    set inset(value) {
        this._inset = coerceBooleanProperty(value);
    }
}
/** @nocollapse */ /** @nocollapse */ McDivider.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McDivider, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McDivider.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: McDivider, selector: "mc-divider", inputs: { vertical: "vertical", inset: "inset" }, host: { properties: { "class.mc-divider_vertical": "vertical", "class.mc-divider_horizontal": "!vertical", "class.mc-divider_inset": "inset" }, classAttribute: "mc-divider" }, ngImport: i0, template: '', isInline: true, styles: [".mc-divider{display:block;margin:0}.mc-divider.mc-divider_horizontal{border-top-width:1px;border-top-width:var(--mc-divider-size-width, 1px);border-top-style:solid}.mc-divider.mc-divider_vertical{height:100%;border-right-width:1px;border-right-width:var(--mc-divider-size-width, 1px);border-right-style:solid}.mc-divider.mc-divider_inset{margin-left:80px;margin-left:var(--mc-divider-size-inset-margin, 80px)}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:80px;margin-right:var(--mc-divider-size-inset-margin, 80px)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McDivider, decorators: [{
            type: Component,
            args: [{ selector: 'mc-divider', host: {
                        class: 'mc-divider',
                        '[class.mc-divider_vertical]': 'vertical',
                        '[class.mc-divider_horizontal]': '!vertical',
                        '[class.mc-divider_inset]': 'inset'
                    }, template: '', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".mc-divider{display:block;margin:0}.mc-divider.mc-divider_horizontal{border-top-width:1px;border-top-width:var(--mc-divider-size-width, 1px);border-top-style:solid}.mc-divider.mc-divider_vertical{height:100%;border-right-width:1px;border-right-width:var(--mc-divider-size-width, 1px);border-right-style:solid}.mc-divider.mc-divider_inset{margin-left:80px;margin-left:var(--mc-divider-size-inset-margin, 80px)}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:80px;margin-right:var(--mc-divider-size-inset-margin, 80px)}\n"] }]
        }], propDecorators: { vertical: [{
                type: Input
            }], inset: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGl2aWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvZGl2aWRlci9kaXZpZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFnQjdGLE1BQU0sT0FBTyxTQUFTO0lBYnRCO1FBd0JZLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFZM0IsV0FBTSxHQUFZLEtBQUssQ0FBQztLQUNuQztJQXZCRyw2Q0FBNkM7SUFDN0MsSUFDSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFjO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUlELDJDQUEyQztJQUMzQyxJQUNJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksS0FBSyxDQUFDLEtBQWM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQyxDQUFDOzs0SUFyQlEsU0FBUztnSUFBVCxTQUFTLG9SQUxSLEVBQUU7MkZBS0gsU0FBUztrQkFickIsU0FBUzsrQkFDSSxZQUFZLFFBQ2hCO3dCQUNGLEtBQUssRUFBRSxZQUFZO3dCQUNuQiw2QkFBNkIsRUFBRSxVQUFVO3dCQUN6QywrQkFBK0IsRUFBRSxXQUFXO3dCQUM1QywwQkFBMEIsRUFBRSxPQUFPO3FCQUN0QyxZQUNTLEVBQUUsaUJBRUcsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTs4QkFLM0MsUUFBUTtzQkFEWCxLQUFLO2dCQWFGLEtBQUs7c0JBRFIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLWRpdmlkZXInLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1kaXZpZGVyJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXZpZGVyX3ZlcnRpY2FsXSc6ICd2ZXJ0aWNhbCcsXG4gICAgICAgICdbY2xhc3MubWMtZGl2aWRlcl9ob3Jpem9udGFsXSc6ICchdmVydGljYWwnLFxuICAgICAgICAnW2NsYXNzLm1jLWRpdmlkZXJfaW5zZXRdJzogJ2luc2V0J1xuICAgIH0sXG4gICAgdGVtcGxhdGU6ICcnLFxuICAgIHN0eWxlVXJsczogWydkaXZpZGVyLnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1jRGl2aWRlciB7XG4gICAgLy8gV2hldGhlciB0aGUgZGl2aWRlciBpcyB2ZXJ0aWNhbGx5IGFsaWduZWQuXG4gICAgQElucHV0KClcbiAgICBnZXQgdmVydGljYWwoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl92ZXJ0aWNhbDtcbiAgICB9XG5cbiAgICBzZXQgdmVydGljYWwodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fdmVydGljYWwgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3ZlcnRpY2FsOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvLyBXaGV0aGVyIHRoZSBkaXZpZGVyIGlzIGFuIGluc2V0IGRpdmlkZXIuXG4gICAgQElucHV0KClcbiAgICBnZXQgaW5zZXQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnNldDtcbiAgICB9XG5cbiAgICBzZXQgaW5zZXQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faW5zZXQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2luc2V0OiBib29sZWFuID0gZmFsc2U7XG59XG4iXX0=