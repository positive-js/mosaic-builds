/**
 * @fileoverview added by tsickle
 * Generated from: divider.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
export class McDivider {
    constructor() {
        this._vertical = false;
        this._inset = false;
    }
    // Whether the divider is vertically aligned.
    /**
     * @return {?}
     */
    get vertical() {
        return this._vertical;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set vertical(value) {
        this._vertical = coerceBooleanProperty(value);
    }
    // Whether the divider is an inset divider.
    /**
     * @return {?}
     */
    get inset() {
        return this._inset;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set inset(value) {
        this._inset = coerceBooleanProperty(value);
    }
}
McDivider.decorators = [
    { type: Component, args: [{
                selector: 'mc-divider',
                host: {
                    class: 'mc-divider',
                    role: 'separator',
                    '[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
                    '[class.mc-divider_vertical]': 'vertical',
                    '[class.mc-divider_inset]': 'inset'
                },
                template: '',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider_vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider_inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:80px}"]
            }] }
];
McDivider.propDecorators = {
    vertical: [{ type: Input }],
    inset: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    McDivider.prototype._vertical;
    /**
     * @type {?}
     * @private
     */
    McDivider.prototype._inset;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGl2aWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvZGl2aWRlci8iLCJzb3VyY2VzIjpbImRpdmlkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFrQjdGLE1BQU0sT0FBTyxTQUFTO0lBZnRCO1FBMEJZLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFZM0IsV0FBTSxHQUFZLEtBQUssQ0FBQztJQUNwQyxDQUFDOzs7OztJQXRCRyxJQUNJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFjO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7Ozs7SUFLRCxJQUNJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFFRCxJQUFJLEtBQUssQ0FBQyxLQUFjO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7O1lBcENKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxZQUFZO29CQUNuQixJQUFJLEVBQUUsV0FBVztvQkFDakIseUJBQXlCLEVBQUUsc0NBQXNDO29CQUNqRSw2QkFBNkIsRUFBRSxVQUFVO29CQUN6QywwQkFBMEIsRUFBRSxPQUFPO2lCQUN0QztnQkFDRCxRQUFRLEVBQUUsRUFBRTtnQkFFWixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLG1CQUFtQixFQUFFLEtBQUs7O2FBQzdCOzs7dUJBR0ksS0FBSztvQkFZTCxLQUFLOzs7Ozs7O0lBSE4sOEJBQW1DOzs7OztJQVluQywyQkFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1kaXZpZGVyJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtZGl2aWRlcicsXG4gICAgICAgIHJvbGU6ICdzZXBhcmF0b3InLFxuICAgICAgICAnW2F0dHIuYXJpYS1vcmllbnRhdGlvbl0nOiAndmVydGljYWwgPyBcInZlcnRpY2FsXCIgOiBcImhvcml6b250YWxcIicsXG4gICAgICAgICdbY2xhc3MubWMtZGl2aWRlcl92ZXJ0aWNhbF0nOiAndmVydGljYWwnLFxuICAgICAgICAnW2NsYXNzLm1jLWRpdmlkZXJfaW5zZXRdJzogJ2luc2V0J1xuICAgIH0sXG4gICAgdGVtcGxhdGU6ICcnLFxuICAgIHN0eWxlVXJsczogWydkaXZpZGVyLnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIE1jRGl2aWRlciB7XG4gICAgLy8gV2hldGhlciB0aGUgZGl2aWRlciBpcyB2ZXJ0aWNhbGx5IGFsaWduZWQuXG4gICAgQElucHV0KClcbiAgICBnZXQgdmVydGljYWwoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl92ZXJ0aWNhbDtcbiAgICB9XG5cbiAgICBzZXQgdmVydGljYWwodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fdmVydGljYWwgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3ZlcnRpY2FsOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvLyBXaGV0aGVyIHRoZSBkaXZpZGVyIGlzIGFuIGluc2V0IGRpdmlkZXIuXG4gICAgQElucHV0KClcbiAgICBnZXQgaW5zZXQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnNldDtcbiAgICB9XG5cbiAgICBzZXQgaW5zZXQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faW5zZXQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2luc2V0OiBib29sZWFuID0gZmFsc2U7XG59XG4iXX0=