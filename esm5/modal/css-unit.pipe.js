/**
 * @fileoverview added by tsickle
 * Generated from: css-unit.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
var CssUnitPipe = /** @class */ (function () {
    function CssUnitPipe() {
    }
    /**
     * @param {?} value
     * @param {?=} defaultUnit
     * @return {?}
     */
    CssUnitPipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} defaultUnit
     * @return {?}
     */
    function (value, defaultUnit) {
        if (defaultUnit === void 0) { defaultUnit = 'px'; }
        /** @type {?} */
        var formatted = +value;
        return isNaN(formatted) ? "" + value : "" + formatted + defaultUnit;
    };
    CssUnitPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'toCssUnit'
                },] }
    ];
    return CssUnitPipe;
}());
export { CssUnitPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLXVuaXQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9tb2RhbC8iLCJzb3VyY2VzIjpbImNzcy11bml0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwRDtJQUFBO0lBU0EsQ0FBQzs7Ozs7O0lBTEcsK0JBQVM7Ozs7O0lBQVQsVUFBVSxLQUFzQixFQUFFLFdBQTBCO1FBQTFCLDRCQUFBLEVBQUEsa0JBQTBCOztZQUNsRCxTQUFTLEdBQUcsQ0FBQyxLQUFLO1FBRXhCLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLEtBQU8sQ0FBQyxDQUFDLENBQUMsS0FBRyxTQUFTLEdBQUcsV0FBYSxDQUFDO0lBQ3hFLENBQUM7O2dCQVJKLElBQUksU0FBQztvQkFDRixJQUFJLEVBQUUsV0FBVztpQkFDcEI7O0lBT0Qsa0JBQUM7Q0FBQSxBQVRELElBU0M7U0FOWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbkBQaXBlKHtcbiAgICBuYW1lOiAndG9Dc3NVbml0J1xufSlcbmV4cG9ydCBjbGFzcyBDc3NVbml0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nLCBkZWZhdWx0VW5pdDogc3RyaW5nID0gJ3B4Jyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZCA9ICt2YWx1ZTtcblxuICAgICAgICByZXR1cm4gaXNOYU4oZm9ybWF0dGVkKSA/IGAke3ZhbHVlfWAgOiBgJHtmb3JtYXR0ZWR9JHtkZWZhdWx0VW5pdH1gO1xuICAgIH1cbn1cbiJdfQ==