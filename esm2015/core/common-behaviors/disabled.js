/**
 * @fileoverview added by tsickle
 * Generated from: common-behaviors/disabled.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    return class extends base {
        /**
         * @param {...?} args
         */
        constructor(...args) {
            // tslint:disable-next-line
            super(...args);
            this._disabled = false;
        }
        /**
         * @return {?}
         */
        get disabled() {
            return this._disabled;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set disabled(value) {
            this._disabled = coerceBooleanProperty(value);
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzYWJsZWQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9jb3JlLyIsInNvdXJjZXMiOlsiY29tbW9uLWJlaGF2aW9ycy9kaXNhYmxlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7O0FBTTlELGdDQUVDOzs7SUFERyw4QkFBa0I7Ozs7Ozs7QUFNdEIsTUFBTSxVQUFVLGFBQWEsQ0FBNEIsSUFBTztJQUM1RCxPQUFPLEtBQU0sU0FBUSxJQUFJOzs7O1FBV3JCLFlBQVksR0FBRyxJQUFXO1lBQ3RCLDJCQUEyQjtZQUMzQixLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUpYLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFLbkMsQ0FBQzs7OztRQWJELElBQUksUUFBUTtZQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDOzs7OztRQUVELElBQUksUUFBUSxDQUFDLEtBQVU7WUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRCxDQUFDO0tBUUosQ0FBQztBQUNOLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5pbXBvcnQgeyBDb25zdHJ1Y3RvciB9IGZyb20gJy4vY29uc3RydWN0b3InO1xuXG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBDYW5EaXNhYmxlIHtcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCB0eXBlIENhbkRpc2FibGVDdG9yID0gQ29uc3RydWN0b3I8Q2FuRGlzYWJsZT47XG5cbmV4cG9ydCBmdW5jdGlvbiBtaXhpbkRpc2FibGVkPFQgZXh0ZW5kcyBDb25zdHJ1Y3Rvcjx7fT4+KGJhc2U6IFQpOiBDYW5EaXNhYmxlQ3RvciAmIFQge1xuICAgIHJldHVybiBjbGFzcyBleHRlbmRzIGJhc2Uge1xuICAgICAgICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGFueSkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgICAgICBjb25zdHJ1Y3RvciguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgICBzdXBlciguLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH07XG59XG4iXX0=