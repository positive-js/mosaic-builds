/**
 * @fileoverview added by tsickle
 * Generated from: stepper.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9mb3JtLWZpZWxkLyIsInNvdXJjZXMiOlsic3RlcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWNoRSxNQUFNLE9BQU8sU0FBUztJQVh0QjtRQWFhLFdBQU0sR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUV0RCxhQUFRLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7SUF1QnJFLENBQUM7Ozs7O0lBckJHLFNBQVMsQ0FBQyxXQUFnQjtRQUN0QixJQUFJLENBQUMsV0FBVyxFQUFFO1lBQUUsT0FBTztTQUFFO1FBRTdCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFO1lBQ3ZCLFdBQVcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTOzs7UUFBQyxHQUFHLEVBQUU7WUFDekIsV0FBVyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxNQUFrQjtRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25CLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxNQUFrQjtRQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7WUFyQ0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUU7Ozs7Ozs7S0FPVDthQUNKOzs7cUJBRUksTUFBTTt1QkFFTixNQUFNOzs7O0lBRlAsMkJBQytEOztJQUMvRCw2QkFDaUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1zdGVwcGVyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aSBjbGFzcz1cIm1jIG1jLWljb24gbWMtaWNvbl9saWdodCBtYy1zZWNvbmQgbWMtc3RlcHBlci1zdGVwLXVwIG1jLWFuZ2xlLWRvd24tTF8xNlwiXG4gICAgICAgICAgIChtb3VzZWRvd24pPVwib25TdGVwVXAoJGV2ZW50KVwiPlxuICAgICAgICA8L2k+XG4gICAgICAgIDxpIGNsYXNzPVwibWMgbWMtaWNvbiBtYy1pY29uX2xpZ2h0IG1jLXNlY29uZCBtYy1zdGVwcGVyLXN0ZXAtZG93biBtYy1hbmdsZS1kb3duLUxfMTZcIlxuICAgICAgICAgICAobW91c2Vkb3duKT1cIm9uU3RlcERvd24oJGV2ZW50KVwiPlxuICAgICAgICA8L2k+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBNY1N0ZXBwZXIge1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IHN0ZXBVcDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IHN0ZXBEb3duOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICBjb25uZWN0VG8obnVtYmVySW5wdXQ6IGFueSkge1xuICAgICAgICBpZiAoIW51bWJlcklucHV0KSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuc3RlcFVwLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBudW1iZXJJbnB1dC5zdGVwVXAobnVtYmVySW5wdXQuc3RlcCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc3RlcERvd24uc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIG51bWJlcklucHV0LnN0ZXBEb3duKG51bWJlcklucHV0LnN0ZXApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblN0ZXBVcCgkZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5zdGVwVXAuZW1pdCgpO1xuICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblN0ZXBEb3duKCRldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICB0aGlzLnN0ZXBEb3duLmVtaXQoKTtcbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufVxuIl19