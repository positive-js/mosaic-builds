/**
 * @fileoverview added by tsickle
 * Generated from: stepper.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Output } from '@angular/core';
var McStepper = /** @class */ (function () {
    function McStepper() {
        this.stepUp = new EventEmitter();
        this.stepDown = new EventEmitter();
    }
    /**
     * @param {?} numberInput
     * @return {?}
     */
    McStepper.prototype.connectTo = /**
     * @param {?} numberInput
     * @return {?}
     */
    function (numberInput) {
        if (!numberInput) {
            return;
        }
        this.stepUp.subscribe((/**
         * @return {?}
         */
        function () {
            numberInput.stepUp(numberInput.step);
        }));
        this.stepDown.subscribe((/**
         * @return {?}
         */
        function () {
            numberInput.stepDown(numberInput.step);
        }));
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    McStepper.prototype.onStepUp = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.stepUp.emit();
        $event.preventDefault();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    McStepper.prototype.onStepDown = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.stepDown.emit();
        $event.preventDefault();
    };
    McStepper.decorators = [
        { type: Component, args: [{
                    selector: 'mc-stepper',
                    template: "\n        <i class=\"mc mc-icon mc-icon_light mc-second mc-stepper-step-up mc-angle-down-L_16\"\n           (mousedown)=\"onStepUp($event)\">\n        </i>\n        <i class=\"mc mc-icon mc-icon_light mc-second mc-stepper-step-down mc-angle-down-L_16\"\n           (mousedown)=\"onStepDown($event)\">\n        </i>\n    "
                }] }
    ];
    McStepper.propDecorators = {
        stepUp: [{ type: Output }],
        stepDown: [{ type: Output }]
    };
    return McStepper;
}());
export { McStepper };
if (false) {
    /** @type {?} */
    McStepper.prototype.stepUp;
    /** @type {?} */
    McStepper.prototype.stepDown;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9mb3JtLWZpZWxkLyIsInNvdXJjZXMiOlsic3RlcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdoRTtJQUFBO1FBYWEsV0FBTSxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRXRELGFBQVEsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQXVCckUsQ0FBQzs7Ozs7SUFyQkcsNkJBQVM7Ozs7SUFBVCxVQUFVLFdBQWdCO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFFN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTOzs7UUFBQztZQUNsQixXQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUzs7O1FBQUM7WUFDcEIsV0FBVyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVELDRCQUFROzs7O0lBQVIsVUFBUyxNQUFrQjtRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25CLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7OztJQUVELDhCQUFVOzs7O0lBQVYsVUFBVyxNQUFrQjtRQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUM1QixDQUFDOztnQkFyQ0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUUsa1VBT1Q7aUJBQ0o7Ozt5QkFFSSxNQUFNOzJCQUVOLE1BQU07O0lBd0JYLGdCQUFDO0NBQUEsQUF0Q0QsSUFzQ0M7U0EzQlksU0FBUzs7O0lBQ2xCLDJCQUMrRDs7SUFDL0QsNkJBQ2lFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtc3RlcHBlcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGkgY2xhc3M9XCJtYyBtYy1pY29uIG1jLWljb25fbGlnaHQgbWMtc2Vjb25kIG1jLXN0ZXBwZXItc3RlcC11cCBtYy1hbmdsZS1kb3duLUxfMTZcIlxuICAgICAgICAgICAobW91c2Vkb3duKT1cIm9uU3RlcFVwKCRldmVudClcIj5cbiAgICAgICAgPC9pPlxuICAgICAgICA8aSBjbGFzcz1cIm1jIG1jLWljb24gbWMtaWNvbl9saWdodCBtYy1zZWNvbmQgbWMtc3RlcHBlci1zdGVwLWRvd24gbWMtYW5nbGUtZG93bi1MXzE2XCJcbiAgICAgICAgICAgKG1vdXNlZG93bik9XCJvblN0ZXBEb3duKCRldmVudClcIj5cbiAgICAgICAgPC9pPlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgTWNTdGVwcGVyIHtcbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBzdGVwVXA6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBzdGVwRG93bjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgY29ubmVjdFRvKG51bWJlcklucHV0OiBhbnkpIHtcbiAgICAgICAgaWYgKCFudW1iZXJJbnB1dCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnN0ZXBVcC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgbnVtYmVySW5wdXQuc3RlcFVwKG51bWJlcklucHV0LnN0ZXApO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnN0ZXBEb3duLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBudW1iZXJJbnB1dC5zdGVwRG93bihudW1iZXJJbnB1dC5zdGVwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25TdGVwVXAoJGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMuc3RlcFVwLmVtaXQoKTtcbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25TdGVwRG93bigkZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5zdGVwRG93bi5lbWl0KCk7XG4gICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn1cbiJdfQ==