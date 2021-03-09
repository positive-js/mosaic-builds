import { Component, EventEmitter, Output } from '@angular/core';
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
McStepper.decorators = [
    { type: Component, args: [{
                selector: 'mc-stepper',
                template: `
        <i class="mc mc-icon mc-icon_light mc-second mc-stepper-step-up mc-angle-down-L_16"
           (mousedown)="onStepUp($event)">
        </i>
        <i class="mc mc-icon mc-icon_light mc-second mc-stepper-step-down mc-angle-down-L_16"
           (mousedown)="onStepDown($event)">
        </i>
    `
            },] }
];
McStepper.propDecorators = {
    stepUp: [{ type: Output }],
    stepDown: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9mb3JtLWZpZWxkL3N0ZXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBY2hFLE1BQU0sT0FBTyxTQUFTO0lBWHRCO1FBYWEsV0FBTSxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRXRELGFBQVEsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQXVCckUsQ0FBQztJQXJCRyxTQUFTLENBQUMsV0FBZ0I7UUFDdEIsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUFFLE9BQU87U0FBRTtRQUU3QixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDdkIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDekIsV0FBVyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsUUFBUSxDQUFDLE1BQWtCO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkIsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxVQUFVLENBQUMsTUFBa0I7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDNUIsQ0FBQzs7O1lBckNKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsUUFBUSxFQUFFOzs7Ozs7O0tBT1Q7YUFDSjs7O3FCQUVJLE1BQU07dUJBRU4sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXN0ZXBwZXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpIGNsYXNzPVwibWMgbWMtaWNvbiBtYy1pY29uX2xpZ2h0IG1jLXNlY29uZCBtYy1zdGVwcGVyLXN0ZXAtdXAgbWMtYW5nbGUtZG93bi1MXzE2XCJcbiAgICAgICAgICAgKG1vdXNlZG93bik9XCJvblN0ZXBVcCgkZXZlbnQpXCI+XG4gICAgICAgIDwvaT5cbiAgICAgICAgPGkgY2xhc3M9XCJtYyBtYy1pY29uIG1jLWljb25fbGlnaHQgbWMtc2Vjb25kIG1jLXN0ZXBwZXItc3RlcC1kb3duIG1jLWFuZ2xlLWRvd24tTF8xNlwiXG4gICAgICAgICAgIChtb3VzZWRvd24pPVwib25TdGVwRG93bigkZXZlbnQpXCI+XG4gICAgICAgIDwvaT5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIE1jU3RlcHBlciB7XG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgc3RlcFVwOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgc3RlcERvd246IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIGNvbm5lY3RUbyhudW1iZXJJbnB1dDogYW55KSB7XG4gICAgICAgIGlmICghbnVtYmVySW5wdXQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5zdGVwVXAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIG51bWJlcklucHV0LnN0ZXBVcChudW1iZXJJbnB1dC5zdGVwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zdGVwRG93bi5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgbnVtYmVySW5wdXQuc3RlcERvd24obnVtYmVySW5wdXQuc3RlcCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uU3RlcFVwKCRldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICB0aGlzLnN0ZXBVcC5lbWl0KCk7XG4gICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uU3RlcERvd24oJGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMuc3RlcERvd24uZW1pdCgpO1xuICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59XG4iXX0=