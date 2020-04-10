/**
 * @fileoverview added by tsickle
 * Generated from: css-unit.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLXVuaXQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9tb2RhbC8iLCJzb3VyY2VzIjpbImNzcy11bml0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQU1wRCxNQUFNLE9BQU8sV0FBVzs7Ozs7O0lBQ3BCLFNBQVMsQ0FBQyxLQUFzQixFQUFFLGNBQXNCLElBQUk7O2NBQ2xELFNBQVMsR0FBRyxDQUFDLEtBQUs7UUFFeEIsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxHQUFHLFdBQVcsRUFBRSxDQUFDO0lBQ3hFLENBQUM7OztZQVJKLElBQUksU0FBQztnQkFDRixJQUFJLEVBQUUsV0FBVzthQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5AUGlwZSh7XG4gICAgbmFtZTogJ3RvQ3NzVW5pdCdcbn0pXG5leHBvcnQgY2xhc3MgQ3NzVW5pdFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0odmFsdWU6IG51bWJlciB8IHN0cmluZywgZGVmYXVsdFVuaXQ6IHN0cmluZyA9ICdweCcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWQgPSArdmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIGlzTmFOKGZvcm1hdHRlZCkgPyBgJHt2YWx1ZX1gIDogYCR7Zm9ybWF0dGVkfSR7ZGVmYXVsdFVuaXR9YDtcbiAgICB9XG59XG4iXX0=