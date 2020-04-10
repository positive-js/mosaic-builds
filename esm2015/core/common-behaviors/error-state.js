/**
 * @fileoverview added by tsickle
 * Generated from: common-behaviors/error-state.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
/**
 * \@docs-private
 * @record
 */
export function CanUpdateErrorState() { }
if (false) {
    /** @type {?} */
    CanUpdateErrorState.prototype.stateChanges;
    /** @type {?} */
    CanUpdateErrorState.prototype.errorState;
    /** @type {?} */
    CanUpdateErrorState.prototype.errorStateMatcher;
    /**
     * @return {?}
     */
    CanUpdateErrorState.prototype.updateErrorState = function () { };
}
/**
 * \@docs-private
 * @record
 */
export function HasErrorState() { }
if (false) {
    /** @type {?} */
    HasErrorState.prototype.parentFormGroup;
    /** @type {?} */
    HasErrorState.prototype.parentForm;
    /** @type {?} */
    HasErrorState.prototype.defaultErrorStateMatcher;
    /** @type {?} */
    HasErrorState.prototype.ngControl;
}
/**
 * Mixin to augment a directive with updateErrorState method.
 * For component with `errorState` and need to update `errorState`.
 * @template T
 * @param {?} base
 * @return {?}
 */
export function mixinErrorState(base) {
    return class extends base {
        /**
         * @param {...?} args
         */
        constructor(...args) {
            super(...args);
            /**
             * Whether the component is in an error state.
             */
            this.errorState = false;
            /**
             * Stream that emits whenever the state of the input changes such that the wrapping
             * `MatFormField` needs to run change detection.
             */
            this.stateChanges = new Subject();
        }
        /**
         * @return {?}
         */
        updateErrorState() {
            /** @type {?} */
            const oldState = this.errorState;
            /** @type {?} */
            const parent = this.parentFormGroup || this.parentForm;
            /** @type {?} */
            const matcher = this.errorStateMatcher || this.defaultErrorStateMatcher;
            /** @type {?} */
            const control = this.ngControl ? (/** @type {?} */ (this.ngControl.control)) : null;
            /** @type {?} */
            const newState = matcher.isErrorState(control, parent);
            if (newState !== oldState) {
                this.errorState = newState;
                this.stateChanges.next();
            }
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Itc3RhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvY29yZS8iLCJzb3VyY2VzIjpbImNvbW1vbi1iZWhhdmlvcnMvZXJyb3Itc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7OztBQVMvQix5Q0FRQzs7O0lBTkcsMkNBQXFDOztJQUVyQyx5Q0FBb0I7O0lBQ3BCLGdEQUFxQzs7OztJQUVyQyxpRUFBbUI7Ozs7OztBQVF2QixtQ0FLQzs7O0lBSkcsd0NBQW9DOztJQUNwQyxtQ0FBbUI7O0lBQ25CLGlEQUE0Qzs7SUFDNUMsa0NBQXFCOzs7Ozs7Ozs7QUFPekIsTUFBTSxVQUFVLGVBQWUsQ0FBdUMsSUFBTztJQUN6RSxPQUFPLEtBQU0sU0FBUSxJQUFJOzs7O1FBWXJCLFlBQVksR0FBRyxJQUFXO1lBQ3RCLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDOzs7O1lBWG5CLGVBQVUsR0FBWSxLQUFLLENBQUM7Ozs7O1lBTW5CLGlCQUFZLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQU01QyxDQUFDOzs7O1FBRUQsZ0JBQWdCOztrQkFDTixRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVU7O2tCQUMxQixNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsVUFBVTs7a0JBQ2hELE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLHdCQUF3Qjs7a0JBQ2pFLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJOztrQkFDdkUsUUFBUSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztZQUV0RCxJQUFJLFFBQVEsS0FBSyxRQUFRLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO2dCQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQzVCO1FBQ0wsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cERpcmVjdGl2ZSwgTmdDb250cm9sLCBOZ0Zvcm0gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEVycm9yU3RhdGVNYXRjaGVyIH0gZnJvbSAnLi4vZXJyb3IvZXJyb3Itb3B0aW9ucyc7XG5cbmltcG9ydCB7IENvbnN0cnVjdG9yIH0gZnJvbSAnLi9jb25zdHJ1Y3Rvcic7XG5cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBDYW5VcGRhdGVFcnJvclN0YXRlIHtcblxuICAgIHJlYWRvbmx5IHN0YXRlQ2hhbmdlczogU3ViamVjdDx2b2lkPjtcblxuICAgIGVycm9yU3RhdGU6IGJvb2xlYW47XG4gICAgZXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyO1xuXG4gICAgdXBkYXRlRXJyb3JTdGF0ZSgpO1xufVxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IHR5cGUgQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IgPSBDb25zdHJ1Y3RvcjxDYW5VcGRhdGVFcnJvclN0YXRlPjtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBIYXNFcnJvclN0YXRlIHtcbiAgICBwYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZTtcbiAgICBwYXJlbnRGb3JtOiBOZ0Zvcm07XG4gICAgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcjtcbiAgICBuZ0NvbnRyb2w6IE5nQ29udHJvbDtcbn1cblxuLyoqXG4gKiBNaXhpbiB0byBhdWdtZW50IGEgZGlyZWN0aXZlIHdpdGggdXBkYXRlRXJyb3JTdGF0ZSBtZXRob2QuXG4gKiBGb3IgY29tcG9uZW50IHdpdGggYGVycm9yU3RhdGVgIGFuZCBuZWVkIHRvIHVwZGF0ZSBgZXJyb3JTdGF0ZWAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtaXhpbkVycm9yU3RhdGU8VCBleHRlbmRzIENvbnN0cnVjdG9yPEhhc0Vycm9yU3RhdGU+PihiYXNlOiBUKTogQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IgJiBUIHtcbiAgICByZXR1cm4gY2xhc3MgZXh0ZW5kcyBiYXNlIHtcbiAgICAgICAgLyoqIFdoZXRoZXIgdGhlIGNvbXBvbmVudCBpcyBpbiBhbiBlcnJvciBzdGF0ZS4gKi9cbiAgICAgICAgZXJyb3JTdGF0ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuZXZlciB0aGUgc3RhdGUgb2YgdGhlIGlucHV0IGNoYW5nZXMgc3VjaCB0aGF0IHRoZSB3cmFwcGluZ1xuICAgICAgICAgKiBgTWF0Rm9ybUZpZWxkYCBuZWVkcyB0byBydW4gY2hhbmdlIGRldGVjdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIHJlYWRvbmx5IHN0YXRlQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICAgICAgZXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgICAgICBzdXBlciguLi5hcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZUVycm9yU3RhdGUoKSB7XG4gICAgICAgICAgICBjb25zdCBvbGRTdGF0ZSA9IHRoaXMuZXJyb3JTdGF0ZTtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50Rm9ybUdyb3VwIHx8IHRoaXMucGFyZW50Rm9ybTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXIgPSB0aGlzLmVycm9yU3RhdGVNYXRjaGVyIHx8IHRoaXMuZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyO1xuICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMubmdDb250cm9sID8gdGhpcy5uZ0NvbnRyb2wuY29udHJvbCBhcyBGb3JtQ29udHJvbCA6IG51bGw7XG4gICAgICAgICAgICBjb25zdCBuZXdTdGF0ZSA9IG1hdGNoZXIuaXNFcnJvclN0YXRlKGNvbnRyb2wsIHBhcmVudCk7XG5cbiAgICAgICAgICAgIGlmIChuZXdTdGF0ZSAhPT0gb2xkU3RhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yU3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuIl19