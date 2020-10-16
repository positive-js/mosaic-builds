/**
 * @fileoverview added by tsickle
 * Generated from: css-unit.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
export class CssUnitPipe {
    /**
     * @param {?} value
     * @param {?=} defaultUnit
     * @return {?}
     */
    transform(value, defaultUnit = 'px') {
        /** @type {?} */
        const formatted = +value;
        return isNaN(formatted) ? `${value}` : `${formatted}${defaultUnit}`;
    }
}
CssUnitPipe.decorators = [
    { type: Pipe, args: [{
                name: 'toCssUnit'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLXVuaXQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL21vZGFsLyIsInNvdXJjZXMiOlsiY3NzLXVuaXQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBTXBELE1BQU0sT0FBTyxXQUFXOzs7Ozs7SUFDcEIsU0FBUyxDQUFDLEtBQXNCLEVBQUUsY0FBc0IsSUFBSTs7Y0FDbEQsU0FBUyxHQUFHLENBQUMsS0FBSztRQUV4QixPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLEdBQUcsV0FBVyxFQUFFLENBQUM7SUFDeEUsQ0FBQzs7O1lBUkosSUFBSSxTQUFDO2dCQUNGLElBQUksRUFBRSxXQUFXO2FBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbkBQaXBlKHtcbiAgICBuYW1lOiAndG9Dc3NVbml0J1xufSlcbmV4cG9ydCBjbGFzcyBDc3NVbml0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nLCBkZWZhdWx0VW5pdDogc3RyaW5nID0gJ3B4Jyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZCA9ICt2YWx1ZTtcblxuICAgICAgICByZXR1cm4gaXNOYU4oZm9ybWF0dGVkKSA/IGAke3ZhbHVlfWAgOiBgJHtmb3JtYXR0ZWR9JHtkZWZhdWx0VW5pdH1gO1xuICAgIH1cbn1cbiJdfQ==