/**
 * @fileoverview added by tsickle
 * Generated from: common-behaviors/tabindex.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvY29yZS8iLCJzb3VyY2VzIjpbImNvbW1vbi1iZWhhdmlvcnMvdGFiaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFLQSxpQ0FFQzs7O0lBREcsK0JBQWlCOzs7Ozs7Ozs7QUFNckIsTUFBTSxVQUFVLGFBQWEsQ0FBb0MsSUFBTyxFQUFFLGVBQWUsR0FBRyxDQUFDO0lBQ3pGLE9BQU8sS0FBTSxTQUFRLElBQUk7Ozs7UUFXckIsWUFBWSxHQUFHLElBQVc7WUFDdEIsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFIWCxjQUFTLEdBQVcsZUFBZSxDQUFDO1FBSTVDLENBQUM7Ozs7UUFaRCxJQUFJLFFBQVE7WUFDUixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQy9DLENBQUM7Ozs7O1FBRUQsSUFBSSxRQUFRLENBQUMsS0FBYTtZQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDO1FBQzdELENBQUM7S0FPSixDQUFDO0FBQ04sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdG9yIH0gZnJvbSAnLi9jb25zdHJ1Y3Rvcic7XG5pbXBvcnQgeyBDYW5EaXNhYmxlIH0gZnJvbSAnLi9kaXNhYmxlZCc7XG5cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIEhhc1RhYkluZGV4IHtcbiAgICB0YWJJbmRleDogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBIYXNUYWJJbmRleEN0b3IgPSBDb25zdHJ1Y3RvcjxIYXNUYWJJbmRleD47XG5cbi8vIE1peGluIHRvIGF1Z21lbnQgYSBkaXJlY3RpdmUgd2l0aCBhIGB0YWJJbmRleGAgcHJvcGVydHkuXG5leHBvcnQgZnVuY3Rpb24gbWl4aW5UYWJJbmRleDxUIGV4dGVuZHMgQ29uc3RydWN0b3I8Q2FuRGlzYWJsZT4+KGJhc2U6IFQsIGRlZmF1bHRUYWJJbmRleCA9IDApOiBIYXNUYWJJbmRleEN0b3IgJiBUIHtcbiAgICByZXR1cm4gY2xhc3MgZXh0ZW5kcyBiYXNlIHtcbiAgICAgICAgZ2V0IHRhYkluZGV4KCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCA/IC0xIDogdGhpcy5fdGFiSW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgdGFiSW5kZXgodmFsdWU6IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5fdGFiSW5kZXggPSB2YWx1ZSAhPSBudWxsID8gdmFsdWUgOiBkZWZhdWx0VGFiSW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF90YWJJbmRleDogbnVtYmVyID0gZGVmYXVsdFRhYkluZGV4O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgICAgICBzdXBlciguLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH07XG59XG4iXX0=