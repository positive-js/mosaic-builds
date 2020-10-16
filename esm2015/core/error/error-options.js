/**
 * @fileoverview added by tsickle
 * Generated from: error/error-options.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Error state matcher that matches when a control is invalid and dirty.
 */
export class ShowOnDirtyErrorStateMatcher {
    /**
     * @param {?} control
     * @param {?} form
     * @return {?}
     */
    isErrorState(control, form) {
        return !!(control && control.invalid && (control.dirty || (form && form.submitted)));
    }
}
ShowOnDirtyErrorStateMatcher.decorators = [
    { type: Injectable }
];
/**
 * Provider that defines how form controls behave with regards to displaying error messages.
 */
export class ErrorStateMatcher {
    /**
     * @param {?} control
     * @param {?} form
     * @return {?}
     */
    isErrorState(control, form) {
        return !!(control && control.invalid && (control.touched || (form && form.submitted)));
    }
}
ErrorStateMatcher.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ ErrorStateMatcher.ɵprov = i0.ɵɵdefineInjectable({ factory: function ErrorStateMatcher_Factory() { return new ErrorStateMatcher(); }, token: ErrorStateMatcher, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Itb3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL2NvcmUvIiwic291cmNlcyI6WyJlcnJvci9lcnJvci1vcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFNM0MsTUFBTSxPQUFPLDRCQUE0Qjs7Ozs7O0lBQ3JDLFlBQVksQ0FBQyxPQUEyQixFQUFFLElBQXdDO1FBQzlFLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekYsQ0FBQzs7O1lBSkosVUFBVTs7Ozs7QUFTWCxNQUFNLE9BQU8saUJBQWlCOzs7Ozs7SUFDMUIsWUFBWSxDQUFDLE9BQTJCLEVBQUUsSUFBd0M7UUFDOUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzRixDQUFDOzs7WUFKSixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwRGlyZWN0aXZlLCBOZ0Zvcm0sIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5cbi8qKiBFcnJvciBzdGF0ZSBtYXRjaGVyIHRoYXQgbWF0Y2hlcyB3aGVuIGEgY29udHJvbCBpcyBpbnZhbGlkIGFuZCBkaXJ0eS4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTaG93T25EaXJ0eUVycm9yU3RhdGVNYXRjaGVyIGltcGxlbWVudHMgRXJyb3JTdGF0ZU1hdGNoZXIge1xuICAgIGlzRXJyb3JTdGF0ZShjb250cm9sOiBGb3JtQ29udHJvbCB8IG51bGwsIGZvcm06IEZvcm1Hcm91cERpcmVjdGl2ZSB8IE5nRm9ybSB8IG51bGwpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhKGNvbnRyb2wgJiYgY29udHJvbC5pbnZhbGlkICYmIChjb250cm9sLmRpcnR5IHx8IChmb3JtICYmIGZvcm0uc3VibWl0dGVkKSkpO1xuICAgIH1cbn1cblxuLyoqIFByb3ZpZGVyIHRoYXQgZGVmaW5lcyBob3cgZm9ybSBjb250cm9scyBiZWhhdmUgd2l0aCByZWdhcmRzIHRvIGRpc3BsYXlpbmcgZXJyb3IgbWVzc2FnZXMuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEVycm9yU3RhdGVNYXRjaGVyIHtcbiAgICBpc0Vycm9yU3RhdGUoY29udHJvbDogRm9ybUNvbnRyb2wgfCBudWxsLCBmb3JtOiBGb3JtR3JvdXBEaXJlY3RpdmUgfCBOZ0Zvcm0gfCBudWxsKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIShjb250cm9sICYmIGNvbnRyb2wuaW52YWxpZCAmJiAoY29udHJvbC50b3VjaGVkIHx8IChmb3JtICYmIGZvcm0uc3VibWl0dGVkKSkpO1xuICAgIH1cbn1cbiJdfQ==