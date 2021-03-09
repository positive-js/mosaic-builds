import { Pipe } from '@angular/core';
export class CssUnitPipe {
    transform(value, defaultUnit = 'px') {
        const formatted = +value;
        return isNaN(formatted) ? `${value}` : `${formatted}${defaultUnit}`;
    }
}
CssUnitPipe.decorators = [
    { type: Pipe, args: [{
                name: 'toCssUnit'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLXVuaXQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9tb2RhbC9jc3MtdW5pdC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBTXBELE1BQU0sT0FBTyxXQUFXO0lBQ3BCLFNBQVMsQ0FBQyxLQUFzQixFQUFFLGNBQXNCLElBQUk7UUFDeEQsTUFBTSxTQUFTLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFFekIsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxHQUFHLFdBQVcsRUFBRSxDQUFDO0lBQ3hFLENBQUM7OztZQVJKLElBQUksU0FBQztnQkFDRixJQUFJLEVBQUUsV0FBVzthQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5AUGlwZSh7XG4gICAgbmFtZTogJ3RvQ3NzVW5pdCdcbn0pXG5leHBvcnQgY2xhc3MgQ3NzVW5pdFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0odmFsdWU6IG51bWJlciB8IHN0cmluZywgZGVmYXVsdFVuaXQ6IHN0cmluZyA9ICdweCcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWQgPSArdmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIGlzTmFOKGZvcm1hdHRlZCkgPyBgJHt2YWx1ZX1gIDogYCR7Zm9ybWF0dGVkfSR7ZGVmYXVsdFVuaXR9YDtcbiAgICB9XG59XG4iXX0=