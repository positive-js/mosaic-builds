import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class CssUnitPipe {
    transform(value, defaultUnit = 'px') {
        const formatted = +value;
        return isNaN(formatted) ? `${value}` : `${formatted}${defaultUnit}`;
    }
}
/** @nocollapse */ CssUnitPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: CssUnitPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
/** @nocollapse */ CssUnitPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: CssUnitPipe, name: "toCssUnit" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: CssUnitPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'toCssUnit'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLXVuaXQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9tb2RhbC9jc3MtdW5pdC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQU1wRCxNQUFNLE9BQU8sV0FBVztJQUNwQixTQUFTLENBQUMsS0FBc0IsRUFBRSxjQUFzQixJQUFJO1FBQ3hELE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBRXpCLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsR0FBRyxXQUFXLEVBQUUsQ0FBQztJQUN4RSxDQUFDOzs0SEFMUSxXQUFXOzBIQUFYLFdBQVc7NEZBQVgsV0FBVztrQkFIdkIsSUFBSTttQkFBQztvQkFDRixJQUFJLEVBQUUsV0FBVztpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuQFBpcGUoe1xuICAgIG5hbWU6ICd0b0Nzc1VuaXQnXG59KVxuZXhwb3J0IGNsYXNzIENzc1VuaXRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcsIGRlZmF1bHRVbml0OiBzdHJpbmcgPSAncHgnKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkID0gK3ZhbHVlO1xuXG4gICAgICAgIHJldHVybiBpc05hTihmb3JtYXR0ZWQpID8gYCR7dmFsdWV9YCA6IGAke2Zvcm1hdHRlZH0ke2RlZmF1bHRVbml0fWA7XG4gICAgfVxufVxuIl19