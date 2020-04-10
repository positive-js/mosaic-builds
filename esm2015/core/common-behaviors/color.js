/**
 * @fileoverview added by tsickle
 * Generated from: common-behaviors/color.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function CanColor() { }
if (false) {
    /** @type {?} */
    CanColor.prototype.color;
}
/**
 * @record
 */
export function HasElementRef() { }
if (false) {
    /** @type {?} */
    HasElementRef.prototype._elementRef;
}
/** @enum {string} */
const ThemePalette = {
    Primary: "primary",
    Second: "second",
    Error: "error",
    Default: "second",
    Empty: "",
};
export { ThemePalette };
/**
 * Mixin to augment a directive with a `color` property.
 * @template T
 * @param {?} base
 * @param {?=} defaultColor
 * @return {?}
 */
export function mixinColor(base, defaultColor = ThemePalette.Default) {
    return class extends base {
        /**
         * @param {...?} args
         */
        constructor(...args) {
            super(...args);
            this.color = defaultColor;
        }
        /**
         * @return {?}
         */
        get color() {
            return this._color;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set color(value) {
            /** @type {?} */
            const colorPalette = value || defaultColor;
            if (colorPalette !== this._color) {
                if (this._color) {
                    this._elementRef.nativeElement.classList.remove(`mc-${this._color}`);
                }
                if (colorPalette) {
                    this._elementRef.nativeElement.classList.add(`mc-${colorPalette}`);
                }
                this._color = colorPalette;
            }
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvY29yZS8iLCJzb3VyY2VzIjpbImNvbW1vbi1iZWhhdmlvcnMvY29sb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFNQSw4QkFFQzs7O0lBREcseUJBQW9COzs7OztBQU94QixtQ0FFQzs7O0lBREcsb0NBQXdCOzs7QUFHNUIsTUFBWSxZQUFZO0lBQ3BCLE9BQU8sV0FBWTtJQUNuQixNQUFNLFVBQVc7SUFDakIsS0FBSyxTQUFVO0lBQ2YsT0FBTyxVQUFXO0lBQ2xCLEtBQUssSUFBSztFQUNiOzs7Ozs7Ozs7QUFHRCxNQUFNLFVBQVUsVUFBVSxDQUN0QixJQUFPLEVBQ1AsZUFBNkIsWUFBWSxDQUFDLE9BQU87SUFFakQsT0FBTyxLQUFNLFNBQVEsSUFBSTs7OztRQXdCckIsWUFBWSxHQUFHLElBQVc7WUFDdEIsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFFZixJQUFJLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztRQUM5QixDQUFDOzs7O1FBMUJELElBQUksS0FBSztZQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDOzs7OztRQUVELElBQUksS0FBSyxDQUFDLEtBQW1COztrQkFDbkIsWUFBWSxHQUFHLEtBQUssSUFBSSxZQUFZO1lBRTFDLElBQUksWUFBWSxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQzlCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDYixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7aUJBQ3hFO2dCQUVELElBQUksWUFBWSxFQUFFO29CQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxZQUFZLEVBQUUsQ0FBQyxDQUFDO2lCQUN0RTtnQkFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQzthQUM5QjtRQUNMLENBQUM7S0FTSixDQUFDO0FBQ04sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29uc3RydWN0b3IgfSBmcm9tICcuL2NvbnN0cnVjdG9yJztcblxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgQ2FuQ29sb3Ige1xuICAgIGNvbG9yOiBUaGVtZVBhbGV0dGU7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgdHlwZSBDYW5Db2xvckN0b3IgPSBDb25zdHJ1Y3RvcjxDYW5Db2xvcj47XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBIYXNFbGVtZW50UmVmIHtcbiAgICBfZWxlbWVudFJlZjogRWxlbWVudFJlZjtcbn1cblxuZXhwb3J0IGVudW0gVGhlbWVQYWxldHRlIHtcbiAgICBQcmltYXJ5ID0gJ3ByaW1hcnknLFxuICAgIFNlY29uZCA9ICdzZWNvbmQnLFxuICAgIEVycm9yID0gJ2Vycm9yJyxcbiAgICBEZWZhdWx0ID0gJ3NlY29uZCcsXG4gICAgRW1wdHkgPSAnJ1xufVxuXG4vKiogTWl4aW4gdG8gYXVnbWVudCBhIGRpcmVjdGl2ZSB3aXRoIGEgYGNvbG9yYCBwcm9wZXJ0eS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtaXhpbkNvbG9yPFQgZXh0ZW5kcyBDb25zdHJ1Y3RvcjxIYXNFbGVtZW50UmVmPj4oXG4gICAgYmFzZTogVCxcbiAgICBkZWZhdWx0Q29sb3I6IFRoZW1lUGFsZXR0ZSA9IFRoZW1lUGFsZXR0ZS5EZWZhdWx0XG4pOiBDYW5Db2xvckN0b3IgJiBUIHtcbiAgICByZXR1cm4gY2xhc3MgZXh0ZW5kcyBiYXNlIHtcblxuICAgICAgICBnZXQgY29sb3IoKTogVGhlbWVQYWxldHRlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBjb2xvcih2YWx1ZTogVGhlbWVQYWxldHRlKSB7XG4gICAgICAgICAgICBjb25zdCBjb2xvclBhbGV0dGUgPSB2YWx1ZSB8fCBkZWZhdWx0Q29sb3I7XG5cbiAgICAgICAgICAgIGlmIChjb2xvclBhbGV0dGUgIT09IHRoaXMuX2NvbG9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGBtYy0ke3RoaXMuX2NvbG9yfWApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjb2xvclBhbGV0dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoYG1jLSR7Y29sb3JQYWxldHRlfWApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbG9yID0gY29sb3JQYWxldHRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfY29sb3I6IFRoZW1lUGFsZXR0ZTtcblxuICAgICAgICBjb25zdHJ1Y3RvciguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSBkZWZhdWx0Q29sb3I7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG4iXX0=