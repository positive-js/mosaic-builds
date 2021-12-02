import { Component, EventEmitter, Output } from '@angular/core';
import * as i0 from "@angular/core";
export class McStepper {
    constructor() {
        this.stepUp = new EventEmitter();
        this.stepDown = new EventEmitter();
    }
    connectTo(numberInput) {
        if (!numberInput) {
            return;
        }
        this.stepUp.subscribe(() => {
            numberInput.stepUp(numberInput.step);
        });
        this.stepDown.subscribe(() => {
            numberInput.stepDown(numberInput.step);
        });
    }
    onStepUp($event) {
        this.stepUp.emit();
        $event.preventDefault();
    }
    onStepDown($event) {
        this.stepDown.emit();
        $event.preventDefault();
    }
}
/** @nocollapse */ McStepper.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McStepper, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McStepper.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McStepper, selector: "mc-stepper", outputs: { stepUp: "stepUp", stepDown: "stepDown" }, ngImport: i0, template: `
        <i class="mc mc-icon mc-icon_light mc-second mc-stepper-step-up mc-angle-down-L_16"
           (mousedown)="onStepUp($event)">
        </i>
        <i class="mc mc-icon mc-icon_light mc-second mc-stepper-step-down mc-angle-down-L_16"
           (mousedown)="onStepDown($event)">
        </i>
    `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McStepper, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-stepper',
                    template: `
        <i class="mc mc-icon mc-icon_light mc-second mc-stepper-step-up mc-angle-down-L_16"
           (mousedown)="onStepUp($event)">
        </i>
        <i class="mc mc-icon mc-icon_light mc-second mc-stepper-step-down mc-angle-down-L_16"
           (mousedown)="onStepDown($event)">
        </i>
    `
                }]
        }], propDecorators: { stepUp: [{
                type: Output
            }], stepDown: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9mb3JtLWZpZWxkL3N0ZXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWNoRSxNQUFNLE9BQU8sU0FBUztJQVh0QjtRQWFhLFdBQU0sR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUV0RCxhQUFRLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7S0F1QnBFO0lBckJHLFNBQVMsQ0FBQyxXQUFnQjtRQUN0QixJQUFJLENBQUMsV0FBVyxFQUFFO1lBQUUsT0FBTztTQUFFO1FBRTdCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN2QixXQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN6QixXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxRQUFRLENBQUMsTUFBa0I7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFrQjtRQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUM1QixDQUFDOzswSEExQlEsU0FBUzs4R0FBVCxTQUFTLHVHQVRSOzs7Ozs7O0tBT1Q7NEZBRVEsU0FBUztrQkFYckIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsUUFBUSxFQUFFOzs7Ozs7O0tBT1Q7aUJBQ0o7OEJBR1ksTUFBTTtzQkFEZCxNQUFNO2dCQUdFLFFBQVE7c0JBRGhCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1zdGVwcGVyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aSBjbGFzcz1cIm1jIG1jLWljb24gbWMtaWNvbl9saWdodCBtYy1zZWNvbmQgbWMtc3RlcHBlci1zdGVwLXVwIG1jLWFuZ2xlLWRvd24tTF8xNlwiXG4gICAgICAgICAgIChtb3VzZWRvd24pPVwib25TdGVwVXAoJGV2ZW50KVwiPlxuICAgICAgICA8L2k+XG4gICAgICAgIDxpIGNsYXNzPVwibWMgbWMtaWNvbiBtYy1pY29uX2xpZ2h0IG1jLXNlY29uZCBtYy1zdGVwcGVyLXN0ZXAtZG93biBtYy1hbmdsZS1kb3duLUxfMTZcIlxuICAgICAgICAgICAobW91c2Vkb3duKT1cIm9uU3RlcERvd24oJGV2ZW50KVwiPlxuICAgICAgICA8L2k+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBNY1N0ZXBwZXIge1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IHN0ZXBVcDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IHN0ZXBEb3duOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICBjb25uZWN0VG8obnVtYmVySW5wdXQ6IGFueSkge1xuICAgICAgICBpZiAoIW51bWJlcklucHV0KSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuc3RlcFVwLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBudW1iZXJJbnB1dC5zdGVwVXAobnVtYmVySW5wdXQuc3RlcCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc3RlcERvd24uc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIG51bWJlcklucHV0LnN0ZXBEb3duKG51bWJlcklucHV0LnN0ZXApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblN0ZXBVcCgkZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5zdGVwVXAuZW1pdCgpO1xuICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblN0ZXBEb3duKCRldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICB0aGlzLnN0ZXBEb3duLmVtaXQoKTtcbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufVxuIl19