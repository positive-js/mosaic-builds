/**
 * @fileoverview added by tsickle
 * Generated from: error/error-options.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Itb3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlLyIsInNvdXJjZXMiOlsiZXJyb3IvZXJyb3Itb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBTTNDLE1BQU0sT0FBTyw0QkFBNEI7Ozs7OztJQUNyQyxZQUFZLENBQUMsT0FBMkIsRUFBRSxJQUF3QztRQUM5RSxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7OztZQUpKLFVBQVU7Ozs7O0FBU1gsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7O0lBQzFCLFlBQVksQ0FBQyxPQUEyQixFQUFFLElBQXdDO1FBQzlFLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0YsQ0FBQzs7O1lBSkosVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cERpcmVjdGl2ZSwgTmdGb3JtLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuXG4vKiogRXJyb3Igc3RhdGUgbWF0Y2hlciB0aGF0IG1hdGNoZXMgd2hlbiBhIGNvbnRyb2wgaXMgaW52YWxpZCBhbmQgZGlydHkuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2hvd09uRGlydHlFcnJvclN0YXRlTWF0Y2hlciBpbXBsZW1lbnRzIEVycm9yU3RhdGVNYXRjaGVyIHtcbiAgICBpc0Vycm9yU3RhdGUoY29udHJvbDogRm9ybUNvbnRyb2wgfCBudWxsLCBmb3JtOiBGb3JtR3JvdXBEaXJlY3RpdmUgfCBOZ0Zvcm0gfCBudWxsKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIShjb250cm9sICYmIGNvbnRyb2wuaW52YWxpZCAmJiAoY29udHJvbC5kaXJ0eSB8fCAoZm9ybSAmJiBmb3JtLnN1Ym1pdHRlZCkpKTtcbiAgICB9XG59XG5cbi8qKiBQcm92aWRlciB0aGF0IGRlZmluZXMgaG93IGZvcm0gY29udHJvbHMgYmVoYXZlIHdpdGggcmVnYXJkcyB0byBkaXNwbGF5aW5nIGVycm9yIG1lc3NhZ2VzLiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBFcnJvclN0YXRlTWF0Y2hlciB7XG4gICAgaXNFcnJvclN0YXRlKGNvbnRyb2w6IEZvcm1Db250cm9sIHwgbnVsbCwgZm9ybTogRm9ybUdyb3VwRGlyZWN0aXZlIHwgTmdGb3JtIHwgbnVsbCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISEoY29udHJvbCAmJiBjb250cm9sLmludmFsaWQgJiYgKGNvbnRyb2wudG91Y2hlZCB8fCAoZm9ybSAmJiBmb3JtLnN1Ym1pdHRlZCkpKTtcbiAgICB9XG59XG4iXX0=