/**
 * @fileoverview added by tsickle
 * Generated from: divider.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                styles: [".mc-divider{border-top-style:solid;border-top-width:1px;display:block;margin:0}.mc-divider.mc-divider_vertical{border-right-style:solid;border-right-width:1px;border-top:0}.mc-divider.mc-divider_inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:80px}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGl2aWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9kaXZpZGVyLyIsInNvdXJjZXMiOlsiZGl2aWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWtCN0YsTUFBTSxPQUFPLFNBQVM7SUFmdEI7UUEwQlksY0FBUyxHQUFZLEtBQUssQ0FBQztRQVkzQixXQUFNLEdBQVksS0FBSyxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBdEJHLElBQ0ksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDOzs7OztJQUVELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRCxDQUFDOzs7OztJQUtELElBQ0ksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDOzs7OztJQUVELElBQUksS0FBSyxDQUFDLEtBQWM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQyxDQUFDOzs7WUFwQ0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxZQUFZO2dCQUN0QixJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLFlBQVk7b0JBQ25CLElBQUksRUFBRSxXQUFXO29CQUNqQix5QkFBeUIsRUFBRSxzQ0FBc0M7b0JBQ2pFLDZCQUE2QixFQUFFLFVBQVU7b0JBQ3pDLDBCQUEwQixFQUFFLE9BQU87aUJBQ3RDO2dCQUNELFFBQVEsRUFBRSxFQUFFO2dCQUVaLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsbUJBQW1CLEVBQUUsS0FBSzs7YUFDN0I7Ozt1QkFHSSxLQUFLO29CQVlMLEtBQUs7Ozs7Ozs7SUFITiw4QkFBbUM7Ozs7O0lBWW5DLDJCQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLWRpdmlkZXInLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1kaXZpZGVyJyxcbiAgICAgICAgcm9sZTogJ3NlcGFyYXRvcicsXG4gICAgICAgICdbYXR0ci5hcmlhLW9yaWVudGF0aW9uXSc6ICd2ZXJ0aWNhbCA/IFwidmVydGljYWxcIiA6IFwiaG9yaXpvbnRhbFwiJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXZpZGVyX3ZlcnRpY2FsXSc6ICd2ZXJ0aWNhbCcsXG4gICAgICAgICdbY2xhc3MubWMtZGl2aWRlcl9pbnNldF0nOiAnaW5zZXQnXG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogJycsXG4gICAgc3R5bGVVcmxzOiBbJ2RpdmlkZXIuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgTWNEaXZpZGVyIHtcbiAgICAvLyBXaGV0aGVyIHRoZSBkaXZpZGVyIGlzIHZlcnRpY2FsbHkgYWxpZ25lZC5cbiAgICBASW5wdXQoKVxuICAgIGdldCB2ZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnRpY2FsO1xuICAgIH1cblxuICAgIHNldCB2ZXJ0aWNhbCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl92ZXJ0aWNhbCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdmVydGljYWw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8vIFdoZXRoZXIgdGhlIGRpdmlkZXIgaXMgYW4gaW5zZXQgZGl2aWRlci5cbiAgICBASW5wdXQoKVxuICAgIGdldCBpbnNldCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc2V0O1xuICAgIH1cblxuICAgIHNldCBpbnNldCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9pbnNldCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5zZXQ6IGJvb2xlYW4gPSBmYWxzZTtcbn1cbiJdfQ==