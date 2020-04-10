/**
 * @fileoverview added by tsickle
 * Generated from: common-behaviors/error-state.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends, __read, __spread } from "tslib";
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
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spread(args)) || this;
            /**
             * Whether the component is in an error state.
             */
            _this.errorState = false;
            /**
             * Stream that emits whenever the state of the input changes such that the wrapping
             * `MatFormField` needs to run change detection.
             */
            _this.stateChanges = new Subject();
            return _this;
        }
        /**
         * @return {?}
         */
        class_1.prototype.updateErrorState = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var oldState = this.errorState;
            /** @type {?} */
            var parent = this.parentFormGroup || this.parentForm;
            /** @type {?} */
            var matcher = this.errorStateMatcher || this.defaultErrorStateMatcher;
            /** @type {?} */
            var control = this.ngControl ? (/** @type {?} */ (this.ngControl.control)) : null;
            /** @type {?} */
            var newState = matcher.isErrorState(control, parent);
            if (newState !== oldState) {
                this.errorState = newState;
                this.stateChanges.next();
            }
        };
        return class_1;
    }(base));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Itc3RhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvY29yZS8iLCJzb3VyY2VzIjpbImNvbW1vbi1iZWhhdmlvcnMvZXJyb3Itc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7QUFTL0IseUNBUUM7OztJQU5HLDJDQUFxQzs7SUFFckMseUNBQW9COztJQUNwQixnREFBcUM7Ozs7SUFFckMsaUVBQW1COzs7Ozs7QUFRdkIsbUNBS0M7OztJQUpHLHdDQUFvQzs7SUFDcEMsbUNBQW1COztJQUNuQixpREFBNEM7O0lBQzVDLGtDQUFxQjs7Ozs7Ozs7O0FBT3pCLE1BQU0sVUFBVSxlQUFlLENBQXVDLElBQU87SUFDekU7UUFBcUIsMkJBQUk7UUFZckI7WUFBWSxjQUFjO2lCQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7Z0JBQWQseUJBQWM7O1lBQTFCLHdDQUNhLElBQUksV0FDaEI7Ozs7WUFaRCxnQkFBVSxHQUFZLEtBQUssQ0FBQzs7Ozs7WUFNbkIsa0JBQVksR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDOztRQU01QyxDQUFDOzs7O1FBRUQsa0NBQWdCOzs7UUFBaEI7O2dCQUNVLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVTs7Z0JBQzFCLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxVQUFVOztnQkFDaEQsT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsd0JBQXdCOztnQkFDakUsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLG1CQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFlLENBQUMsQ0FBQyxDQUFDLElBQUk7O2dCQUN2RSxRQUFRLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO1lBRXRELElBQUksUUFBUSxLQUFLLFFBQVEsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDNUI7UUFDTCxDQUFDO1FBQ0wsY0FBQztJQUFELENBQUMsQUE1Qk0sQ0FBYyxJQUFJLEdBNEJ2QjtBQUNOLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwRGlyZWN0aXZlLCBOZ0NvbnRyb2wsIE5nRm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRXJyb3JTdGF0ZU1hdGNoZXIgfSBmcm9tICcuLi9lcnJvci9lcnJvci1vcHRpb25zJztcblxuaW1wb3J0IHsgQ29uc3RydWN0b3IgfSBmcm9tICcuL2NvbnN0cnVjdG9yJztcblxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIENhblVwZGF0ZUVycm9yU3RhdGUge1xuXG4gICAgcmVhZG9ubHkgc3RhdGVDaGFuZ2VzOiBTdWJqZWN0PHZvaWQ+O1xuXG4gICAgZXJyb3JTdGF0ZTogYm9vbGVhbjtcbiAgICBlcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXI7XG5cbiAgICB1cGRhdGVFcnJvclN0YXRlKCk7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgdHlwZSBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvciA9IENvbnN0cnVjdG9yPENhblVwZGF0ZUVycm9yU3RhdGU+O1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIEhhc0Vycm9yU3RhdGUge1xuICAgIHBhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlO1xuICAgIHBhcmVudEZvcm06IE5nRm9ybTtcbiAgICBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyO1xuICAgIG5nQ29udHJvbDogTmdDb250cm9sO1xufVxuXG4vKipcbiAqIE1peGluIHRvIGF1Z21lbnQgYSBkaXJlY3RpdmUgd2l0aCB1cGRhdGVFcnJvclN0YXRlIG1ldGhvZC5cbiAqIEZvciBjb21wb25lbnQgd2l0aCBgZXJyb3JTdGF0ZWAgYW5kIG5lZWQgdG8gdXBkYXRlIGBlcnJvclN0YXRlYC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1peGluRXJyb3JTdGF0ZTxUIGV4dGVuZHMgQ29uc3RydWN0b3I8SGFzRXJyb3JTdGF0ZT4+KGJhc2U6IFQpOiBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvciAmIFQge1xuICAgIHJldHVybiBjbGFzcyBleHRlbmRzIGJhc2Uge1xuICAgICAgICAvKiogV2hldGhlciB0aGUgY29tcG9uZW50IGlzIGluIGFuIGVycm9yIHN0YXRlLiAqL1xuICAgICAgICBlcnJvclN0YXRlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSBzdGF0ZSBvZiB0aGUgaW5wdXQgY2hhbmdlcyBzdWNoIHRoYXQgdGhlIHdyYXBwaW5nXG4gICAgICAgICAqIGBNYXRGb3JtRmllbGRgIG5lZWRzIHRvIHJ1biBjaGFuZ2UgZGV0ZWN0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgcmVhZG9ubHkgc3RhdGVDaGFuZ2VzID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgICAgICBlcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXI7XG5cbiAgICAgICAgY29uc3RydWN0b3IoLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlRXJyb3JTdGF0ZSgpIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFN0YXRlID0gdGhpcy5lcnJvclN0YXRlO1xuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnRGb3JtR3JvdXAgfHwgdGhpcy5wYXJlbnRGb3JtO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlciA9IHRoaXMuZXJyb3JTdGF0ZU1hdGNoZXIgfHwgdGhpcy5kZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI7XG4gICAgICAgICAgICBjb25zdCBjb250cm9sID0gdGhpcy5uZ0NvbnRyb2wgPyB0aGlzLm5nQ29udHJvbC5jb250cm9sIGFzIEZvcm1Db250cm9sIDogbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IG5ld1N0YXRlID0gbWF0Y2hlci5pc0Vycm9yU3RhdGUoY29udHJvbCwgcGFyZW50KTtcblxuICAgICAgICAgICAgaWYgKG5ld1N0YXRlICE9PSBvbGRTdGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JTdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG4iXX0=