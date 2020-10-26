/**
 * @fileoverview added by tsickle
 * Generated from: common-behaviors/tabindex.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { coerceNumberProperty } from '@angular/cdk/coercion';
/**
 * @record
 */
export function HasTabIndex() { }
if (false) {
    /** @type {?} */
    HasTabIndex.prototype.tabIndex;
}
// Mixin to augment a directive with a `tabIndex` property.
/**
 * @template T
 * @param {?} base
 * @param {?=} defaultTabIndex
 * @return {?}
 */
export function mixinTabIndex(base, defaultTabIndex = 0) {
    // Note: We cast `base` to `unknown` and then `Constructor`. It could be an abstract class,
    // but given we `extend` it from another class, we can assume a constructor being accessible.
    // tslint:disable-next-line:naming-convention
    /**
     * @abstract
     */
    class Mixin extends base {
        /**
         * @param {...?} args
         */
        constructor(...args) {
            super(...args);
            // tslint:disable-next-line:orthodox-getter-and-setter
            this._tabIndex = defaultTabIndex;
            this.defaultTabIndex = defaultTabIndex;
        }
        /**
         * @return {?}
         */
        get tabIndex() { return this.disabled ? -1 : this._tabIndex; }
        /**
         * @param {?} value
         * @return {?}
         */
        set tabIndex(value) {
            // If the specified tabIndex value is null or undefined, fall back to the default value.
            this._tabIndex = value != null ? coerceNumberProperty(value) : this.defaultTabIndex;
        }
    }
    if (false) {
        /**
         * @type {?}
         * @private
         */
        Mixin.prototype._tabIndex;
        /** @type {?} */
        Mixin.prototype.defaultTabIndex;
    }
    // Since we don't directly extend from `base` with it's original types, and we instruct
    // TypeScript that `T` actually is instantiatable through `new`, the types don't overlap.
    // This is a limitation in TS as abstract classes cannot be typed properly dynamically.
    return (/** @type {?} */ ((/** @type {?} */ (Mixin))));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9jb3JlLyIsInNvdXJjZXMiOlsiY29tbW9uLWJlaGF2aW9ycy90YWJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7O0FBTzdELGlDQUVDOzs7SUFERywrQkFBaUI7Ozs7Ozs7OztBQU1yQixNQUFNLFVBQVUsYUFBYSxDQUE0QyxJQUFPLEVBQUUsZUFBZSxHQUFHLENBQUM7Ozs7Ozs7SUFLakcsTUFBZSxLQUFNLFNBQVMsSUFBMkM7Ozs7UUFXckUsWUFBWSxHQUFHLElBQVc7WUFDdEIsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7O1lBVlgsY0FBUyxHQUFXLGVBQWUsQ0FBQztZQUM1QyxvQkFBZSxHQUFHLGVBQWUsQ0FBQztRQVVsQyxDQUFDOzs7O1FBUkQsSUFBSSxRQUFRLEtBQWEsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQ3RFLElBQUksUUFBUSxDQUFDLEtBQWE7WUFDdEIsd0ZBQXdGO1lBQ3hGLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDeEYsQ0FBQztLQUtKOzs7Ozs7UUFaRywwQkFBNEM7O1FBQzVDLGdDQUFrQzs7SUFhdEMsdUZBQXVGO0lBQ3ZGLHlGQUF5RjtJQUN6Rix1RkFBdUY7SUFDdkYsT0FBTyxtQkFBQSxtQkFBQSxLQUFLLEVBQVcsRUFBZ0MsQ0FBQztBQUM1RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5pbXBvcnQgeyBBYnN0cmFjdENvbnN0cnVjdG9yLCBDb25zdHJ1Y3RvciB9IGZyb20gJy4vY29uc3RydWN0b3InO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZSB9IGZyb20gJy4vZGlzYWJsZWQnO1xuXG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBIYXNUYWJJbmRleCB7XG4gICAgdGFiSW5kZXg6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgSGFzVGFiSW5kZXhDdG9yID0gQ29uc3RydWN0b3I8SGFzVGFiSW5kZXg+O1xuXG4vLyBNaXhpbiB0byBhdWdtZW50IGEgZGlyZWN0aXZlIHdpdGggYSBgdGFiSW5kZXhgIHByb3BlcnR5LlxuZXhwb3J0IGZ1bmN0aW9uIG1peGluVGFiSW5kZXg8VCBleHRlbmRzIEFic3RyYWN0Q29uc3RydWN0b3I8Q2FuRGlzYWJsZT4+KGJhc2U6IFQsIGRlZmF1bHRUYWJJbmRleCA9IDApOlxuICAgIEhhc1RhYkluZGV4Q3RvciAmIFQge1xuICAgIC8vIE5vdGU6IFdlIGNhc3QgYGJhc2VgIHRvIGB1bmtub3duYCBhbmQgdGhlbiBgQ29uc3RydWN0b3JgLiBJdCBjb3VsZCBiZSBhbiBhYnN0cmFjdCBjbGFzcyxcbiAgICAvLyBidXQgZ2l2ZW4gd2UgYGV4dGVuZGAgaXQgZnJvbSBhbm90aGVyIGNsYXNzLCB3ZSBjYW4gYXNzdW1lIGEgY29uc3RydWN0b3IgYmVpbmcgYWNjZXNzaWJsZS5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBhYnN0cmFjdCBjbGFzcyBNaXhpbiBleHRlbmRzIChiYXNlIGFzIHVua25vd24gYXMgQ29uc3RydWN0b3I8Q2FuRGlzYWJsZT4pIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm9ydGhvZG94LWdldHRlci1hbmQtc2V0dGVyXG4gICAgICAgIHByaXZhdGUgX3RhYkluZGV4OiBudW1iZXIgPSBkZWZhdWx0VGFiSW5kZXg7XG4gICAgICAgIGRlZmF1bHRUYWJJbmRleCA9IGRlZmF1bHRUYWJJbmRleDtcblxuICAgICAgICBnZXQgdGFiSW5kZXgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPyAtMSA6IHRoaXMuX3RhYkluZGV4OyB9XG4gICAgICAgIHNldCB0YWJJbmRleCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgc3BlY2lmaWVkIHRhYkluZGV4IHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkLCBmYWxsIGJhY2sgdG8gdGhlIGRlZmF1bHQgdmFsdWUuXG4gICAgICAgICAgICB0aGlzLl90YWJJbmRleCA9IHZhbHVlICE9IG51bGwgPyBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSkgOiB0aGlzLmRlZmF1bHRUYWJJbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgICAgICBzdXBlciguLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNpbmNlIHdlIGRvbid0IGRpcmVjdGx5IGV4dGVuZCBmcm9tIGBiYXNlYCB3aXRoIGl0J3Mgb3JpZ2luYWwgdHlwZXMsIGFuZCB3ZSBpbnN0cnVjdFxuICAgIC8vIFR5cGVTY3JpcHQgdGhhdCBgVGAgYWN0dWFsbHkgaXMgaW5zdGFudGlhdGFibGUgdGhyb3VnaCBgbmV3YCwgdGhlIHR5cGVzIGRvbid0IG92ZXJsYXAuXG4gICAgLy8gVGhpcyBpcyBhIGxpbWl0YXRpb24gaW4gVFMgYXMgYWJzdHJhY3QgY2xhc3NlcyBjYW5ub3QgYmUgdHlwZWQgcHJvcGVybHkgZHluYW1pY2FsbHkuXG4gICAgcmV0dXJuIE1peGluIGFzIHVua25vd24gYXMgVCAmIENvbnN0cnVjdG9yPEhhc1RhYkluZGV4Pjtcbn1cbiJdfQ==