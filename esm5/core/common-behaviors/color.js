/**
 * @fileoverview added by tsickle
 * Generated from: common-behaviors/color.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends, __read, __spread } from "tslib";
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
var ThemePalette = {
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
export function mixinColor(base, defaultColor) {
    if (defaultColor === void 0) { defaultColor = ThemePalette.Default; }
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spread(args)) || this;
            _this.color = defaultColor;
            return _this;
        }
        Object.defineProperty(class_1.prototype, "color", {
            get: /**
             * @return {?}
             */
            function () {
                return this._color;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                /** @type {?} */
                var colorPalette = value || defaultColor;
                if (colorPalette !== this._color) {
                    if (this._color) {
                        this._elementRef.nativeElement.classList.remove("mc-" + this._color);
                    }
                    if (colorPalette) {
                        this._elementRef.nativeElement.classList.add("mc-" + colorPalette);
                    }
                    this._color = colorPalette;
                }
            },
            enumerable: true,
            configurable: true
        });
        return class_1;
    }(base));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvY29yZS8iLCJzb3VyY2VzIjpbImNvbW1vbi1iZWhhdmlvcnMvY29sb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsOEJBRUM7OztJQURHLHlCQUFvQjs7Ozs7QUFPeEIsbUNBRUM7OztJQURHLG9DQUF3Qjs7O0FBRzVCLElBQVksWUFBWTtJQUNwQixPQUFPLFdBQVk7SUFDbkIsTUFBTSxVQUFXO0lBQ2pCLEtBQUssU0FBVTtJQUNmLE9BQU8sVUFBVztJQUNsQixLQUFLLElBQUs7RUFDYjs7Ozs7Ozs7O0FBR0QsTUFBTSxVQUFVLFVBQVUsQ0FDdEIsSUFBTyxFQUNQLFlBQWlEO0lBQWpELDZCQUFBLEVBQUEsZUFBNkIsWUFBWSxDQUFDLE9BQU87SUFFakQ7UUFBcUIsMkJBQUk7UUF3QnJCO1lBQVksY0FBYztpQkFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO2dCQUFkLHlCQUFjOztZQUExQix3Q0FDYSxJQUFJLFdBR2hCO1lBREcsS0FBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7O1FBQzlCLENBQUM7UUExQkQsc0JBQUksMEJBQUs7Ozs7WUFBVDtnQkFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdkIsQ0FBQzs7Ozs7WUFFRCxVQUFVLEtBQW1COztvQkFDbkIsWUFBWSxHQUFHLEtBQUssSUFBSSxZQUFZO2dCQUUxQyxJQUFJLFlBQVksS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUM5QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7d0JBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFNLElBQUksQ0FBQyxNQUFRLENBQUMsQ0FBQztxQkFDeEU7b0JBRUQsSUFBSSxZQUFZLEVBQUU7d0JBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFNLFlBQWMsQ0FBQyxDQUFDO3FCQUN0RTtvQkFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQztpQkFDOUI7WUFDTCxDQUFDOzs7V0FoQkE7UUF5QkwsY0FBQztJQUFELENBQUMsQUE3Qk0sQ0FBYyxJQUFJLEdBNkJ2QjtBQUNOLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbnN0cnVjdG9yIH0gZnJvbSAnLi9jb25zdHJ1Y3Rvcic7XG5cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIENhbkNvbG9yIHtcbiAgICBjb2xvcjogVGhlbWVQYWxldHRlO1xufVxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IHR5cGUgQ2FuQ29sb3JDdG9yID0gQ29uc3RydWN0b3I8Q2FuQ29sb3I+O1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgSGFzRWxlbWVudFJlZiB7XG4gICAgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XG59XG5cbmV4cG9ydCBlbnVtIFRoZW1lUGFsZXR0ZSB7XG4gICAgUHJpbWFyeSA9ICdwcmltYXJ5JyxcbiAgICBTZWNvbmQgPSAnc2Vjb25kJyxcbiAgICBFcnJvciA9ICdlcnJvcicsXG4gICAgRGVmYXVsdCA9ICdzZWNvbmQnLFxuICAgIEVtcHR5ID0gJydcbn1cblxuLyoqIE1peGluIHRvIGF1Z21lbnQgYSBkaXJlY3RpdmUgd2l0aCBhIGBjb2xvcmAgcHJvcGVydHkuICovXG5leHBvcnQgZnVuY3Rpb24gbWl4aW5Db2xvcjxUIGV4dGVuZHMgQ29uc3RydWN0b3I8SGFzRWxlbWVudFJlZj4+KFxuICAgIGJhc2U6IFQsXG4gICAgZGVmYXVsdENvbG9yOiBUaGVtZVBhbGV0dGUgPSBUaGVtZVBhbGV0dGUuRGVmYXVsdFxuKTogQ2FuQ29sb3JDdG9yICYgVCB7XG4gICAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgYmFzZSB7XG5cbiAgICAgICAgZ2V0IGNvbG9yKCk6IFRoZW1lUGFsZXR0ZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgY29sb3IodmFsdWU6IFRoZW1lUGFsZXR0ZSkge1xuICAgICAgICAgICAgY29uc3QgY29sb3JQYWxldHRlID0gdmFsdWUgfHwgZGVmYXVsdENvbG9yO1xuXG4gICAgICAgICAgICBpZiAoY29sb3JQYWxldHRlICE9PSB0aGlzLl9jb2xvcikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jb2xvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShgbWMtJHt0aGlzLl9jb2xvcn1gKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY29sb3JQYWxldHRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGBtYy0ke2NvbG9yUGFsZXR0ZX1gKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jb2xvciA9IGNvbG9yUGFsZXR0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2NvbG9yOiBUaGVtZVBhbGV0dGU7XG5cbiAgICAgICAgY29uc3RydWN0b3IoLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gZGVmYXVsdENvbG9yO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuIl19