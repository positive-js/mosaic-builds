/**
 * @fileoverview added by tsickle
 * Generated from: common-behaviors/tabindex.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    return class extends base {
        /**
         * @param {...?} args
         */
        constructor(...args) {
            super(...args);
            this._tabIndex = defaultTabIndex;
        }
        /**
         * @return {?}
         */
        get tabIndex() {
            return this.disabled ? -1 : this._tabIndex;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set tabIndex(value) {
            this._tabIndex = value != null ? value : defaultTabIndex;
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9jb3JlLyIsInNvdXJjZXMiOlsiY29tbW9uLWJlaGF2aW9ycy90YWJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUtBLGlDQUVDOzs7SUFERywrQkFBaUI7Ozs7Ozs7OztBQU1yQixNQUFNLFVBQVUsYUFBYSxDQUFvQyxJQUFPLEVBQUUsZUFBZSxHQUFHLENBQUM7SUFDekYsT0FBTyxLQUFNLFNBQVEsSUFBSTs7OztRQVdyQixZQUFZLEdBQUcsSUFBVztZQUN0QixLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUhYLGNBQVMsR0FBVyxlQUFlLENBQUM7UUFJNUMsQ0FBQzs7OztRQVpELElBQUksUUFBUTtZQUNSLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDL0MsQ0FBQzs7Ozs7UUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFhO1lBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUM7UUFDN0QsQ0FBQztLQU9KLENBQUM7QUFDTixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RydWN0b3IgfSBmcm9tICcuL2NvbnN0cnVjdG9yJztcbmltcG9ydCB7IENhbkRpc2FibGUgfSBmcm9tICcuL2Rpc2FibGVkJztcblxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgSGFzVGFiSW5kZXgge1xuICAgIHRhYkluZGV4OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIEhhc1RhYkluZGV4Q3RvciA9IENvbnN0cnVjdG9yPEhhc1RhYkluZGV4PjtcblxuLy8gTWl4aW4gdG8gYXVnbWVudCBhIGRpcmVjdGl2ZSB3aXRoIGEgYHRhYkluZGV4YCBwcm9wZXJ0eS5cbmV4cG9ydCBmdW5jdGlvbiBtaXhpblRhYkluZGV4PFQgZXh0ZW5kcyBDb25zdHJ1Y3RvcjxDYW5EaXNhYmxlPj4oYmFzZTogVCwgZGVmYXVsdFRhYkluZGV4ID0gMCk6IEhhc1RhYkluZGV4Q3RvciAmIFQge1xuICAgIHJldHVybiBjbGFzcyBleHRlbmRzIGJhc2Uge1xuICAgICAgICBnZXQgdGFiSW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkID8gLTEgOiB0aGlzLl90YWJJbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCB0YWJJbmRleCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl90YWJJbmRleCA9IHZhbHVlICE9IG51bGwgPyB2YWx1ZSA6IGRlZmF1bHRUYWJJbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3RhYkluZGV4OiBudW1iZXIgPSBkZWZhdWx0VGFiSW5kZXg7XG5cbiAgICAgICAgY29uc3RydWN0b3IoLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbiJdfQ==