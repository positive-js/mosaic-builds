/**
 * @fileoverview added by tsickle
 * Generated from: stepper.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Output } from '@angular/core';
export class McStepper {
    constructor() {
        this.stepUp = new EventEmitter();
        this.stepDown = new EventEmitter();
    }
    /**
     * @param {?} numberInput
     * @return {?}
     */
    connectTo(numberInput) {
        if (!numberInput) {
            return;
        }
        this.stepUp.subscribe((/**
         * @return {?}
         */
        () => {
            numberInput.stepUp(numberInput.step);
        }));
        this.stepDown.subscribe((/**
         * @return {?}
         */
        () => {
            numberInput.stepDown(numberInput.step);
        }));
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onStepUp($event) {
        this.stepUp.emit();
        $event.preventDefault();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
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
            }] }
];
McStepper.propDecorators = {
    stepUp: [{ type: Output }],
    stepDown: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    McStepper.prototype.stepUp;
    /** @type {?} */
    McStepper.prototype.stepDown;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL2Zvcm0tZmllbGQvIiwic291cmNlcyI6WyJzdGVwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBY2hFLE1BQU0sT0FBTyxTQUFTO0lBWHRCO1FBYWEsV0FBTSxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRXRELGFBQVEsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQXVCckUsQ0FBQzs7Ozs7SUFyQkcsU0FBUyxDQUFDLFdBQWdCO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFFN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTOzs7UUFBQyxHQUFHLEVBQUU7WUFDdkIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7OztRQUFDLEdBQUcsRUFBRTtZQUN6QixXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLE1BQWtCO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkIsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLE1BQWtCO1FBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzVCLENBQUM7OztZQXJDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFFBQVEsRUFBRTs7Ozs7OztLQU9UO2FBQ0o7OztxQkFFSSxNQUFNO3VCQUVOLE1BQU07Ozs7SUFGUCwyQkFDK0Q7O0lBQy9ELDZCQUNpRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXN0ZXBwZXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpIGNsYXNzPVwibWMgbWMtaWNvbiBtYy1pY29uX2xpZ2h0IG1jLXNlY29uZCBtYy1zdGVwcGVyLXN0ZXAtdXAgbWMtYW5nbGUtZG93bi1MXzE2XCJcbiAgICAgICAgICAgKG1vdXNlZG93bik9XCJvblN0ZXBVcCgkZXZlbnQpXCI+XG4gICAgICAgIDwvaT5cbiAgICAgICAgPGkgY2xhc3M9XCJtYyBtYy1pY29uIG1jLWljb25fbGlnaHQgbWMtc2Vjb25kIG1jLXN0ZXBwZXItc3RlcC1kb3duIG1jLWFuZ2xlLWRvd24tTF8xNlwiXG4gICAgICAgICAgIChtb3VzZWRvd24pPVwib25TdGVwRG93bigkZXZlbnQpXCI+XG4gICAgICAgIDwvaT5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIE1jU3RlcHBlciB7XG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgc3RlcFVwOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgc3RlcERvd246IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIGNvbm5lY3RUbyhudW1iZXJJbnB1dDogYW55KSB7XG4gICAgICAgIGlmICghbnVtYmVySW5wdXQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5zdGVwVXAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIG51bWJlcklucHV0LnN0ZXBVcChudW1iZXJJbnB1dC5zdGVwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zdGVwRG93bi5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgbnVtYmVySW5wdXQuc3RlcERvd24obnVtYmVySW5wdXQuc3RlcCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uU3RlcFVwKCRldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICB0aGlzLnN0ZXBVcC5lbWl0KCk7XG4gICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uU3RlcERvd24oJGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMuc3RlcERvd24uZW1pdCgpO1xuICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59XG4iXX0=