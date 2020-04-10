/**
 * @fileoverview added by tsickle
 * Generated from: common-behaviors/disabled.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends, __read, __spread } from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
/**
 * @record
 */
export function CanDisable() { }
if (false) {
    /** @type {?} */
    CanDisable.prototype.disabled;
}
/**
 * @template T
 * @param {?} base
 * @return {?}
 */
export function mixinDisabled(base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spread(args)) || this;
            _this._disabled = false;
            return _this;
        }
        Object.defineProperty(class_1.prototype, "disabled", {
            get: /**
             * @return {?}
             */
            function () {
                return this._disabled;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._disabled = coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        return class_1;
    }(base));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzYWJsZWQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvY29yZS8iLCJzb3VyY2VzIjpbImNvbW1vbi1iZWhhdmlvcnMvZGlzYWJsZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7QUFNOUQsZ0NBRUM7OztJQURHLDhCQUFrQjs7Ozs7OztBQU10QixNQUFNLFVBQVUsYUFBYSxDQUE0QixJQUFPO0lBQzVEO1FBQXFCLDJCQUFJO1FBV3JCO1lBQVksY0FBYztpQkFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO2dCQUFkLHlCQUFjOztZQUExQix3Q0FFYSxJQUFJLFdBQ2hCO1lBTE8sZUFBUyxHQUFZLEtBQUssQ0FBQzs7UUFLbkMsQ0FBQztRQWJELHNCQUFJLDZCQUFROzs7O1lBQVo7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFCLENBQUM7Ozs7O1lBRUQsVUFBYSxLQUFVO2dCQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xELENBQUM7OztXQUpBO1FBWUwsY0FBQztJQUFELENBQUMsQUFmTSxDQUFjLElBQUksR0FldkI7QUFDTixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcblxuaW1wb3J0IHsgQ29uc3RydWN0b3IgfSBmcm9tICcuL2NvbnN0cnVjdG9yJztcblxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgQ2FuRGlzYWJsZSB7XG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgdHlwZSBDYW5EaXNhYmxlQ3RvciA9IENvbnN0cnVjdG9yPENhbkRpc2FibGU+O1xuXG5leHBvcnQgZnVuY3Rpb24gbWl4aW5EaXNhYmxlZDxUIGV4dGVuZHMgQ29uc3RydWN0b3I8e30+PihiYXNlOiBUKTogQ2FuRGlzYWJsZUN0b3IgJiBUIHtcbiAgICByZXR1cm4gY2xhc3MgZXh0ZW5kcyBiYXNlIHtcbiAgICAgICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IGRpc2FibGVkKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAgICAgY29uc3RydWN0b3IoLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgICAgc3VwZXIoLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIl19