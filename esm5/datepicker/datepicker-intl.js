/**
 * @fileoverview added by tsickle
 * Generated from: datepicker-intl.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Datepicker data that requires internationalization.
 */
var McDatepickerIntl = /** @class */ (function () {
    function McDatepickerIntl() {
        /**
         * Stream that emits whenever the labels here are changed. Use this to notify
         * components if the labels have changed after initialization.
         */
        this.changes = new Subject();
        /**
         * A label for the calendar popup (used by screen readers).
         */
        this.calendarLabel = 'Calendar';
        /**
         * A label for the button used to open the calendar popup (used by screen readers).
         */
        this.openCalendarLabel = 'Open calendar';
        /**
         * A label for the previous month button (used by screen readers).
         */
        this.prevMonthLabel = 'Previous month';
        /**
         * A label for the next month button (used by screen readers).
         */
        this.nextMonthLabel = 'Next month';
        /**
         * A label for the previous year button (used by screen readers).
         */
        this.prevYearLabel = 'Previous year';
        /**
         * A label for the next year button (used by screen readers).
         */
        this.nextYearLabel = 'Next year';
        /**
         * A label for the previous multi-year button (used by screen readers).
         */
        this.prevMultiYearLabel = 'Previous 20 years';
        /**
         * A label for the next multi-year button (used by screen readers).
         */
        this.nextMultiYearLabel = 'Next 20 years';
        /**
         * A label for the 'switch to month view' button (used by screen readers).
         */
        this.switchToMonthViewLabel = 'Choose date';
        /**
         * A label for the 'switch to year view' button (used by screen readers).
         */
        this.switchToMultiYearViewLabel = 'Choose month and year';
    }
    McDatepickerIntl.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ McDatepickerIntl.ɵprov = i0.ɵɵdefineInjectable({ factory: function McDatepickerIntl_Factory() { return new McDatepickerIntl(); }, token: McDatepickerIntl, providedIn: "root" });
    return McDatepickerIntl;
}());
export { McDatepickerIntl };
if (false) {
    /**
     * Stream that emits whenever the labels here are changed. Use this to notify
     * components if the labels have changed after initialization.
     * @type {?}
     */
    McDatepickerIntl.prototype.changes;
    /**
     * A label for the calendar popup (used by screen readers).
     * @type {?}
     */
    McDatepickerIntl.prototype.calendarLabel;
    /**
     * A label for the button used to open the calendar popup (used by screen readers).
     * @type {?}
     */
    McDatepickerIntl.prototype.openCalendarLabel;
    /**
     * A label for the previous month button (used by screen readers).
     * @type {?}
     */
    McDatepickerIntl.prototype.prevMonthLabel;
    /**
     * A label for the next month button (used by screen readers).
     * @type {?}
     */
    McDatepickerIntl.prototype.nextMonthLabel;
    /**
     * A label for the previous year button (used by screen readers).
     * @type {?}
     */
    McDatepickerIntl.prototype.prevYearLabel;
    /**
     * A label for the next year button (used by screen readers).
     * @type {?}
     */
    McDatepickerIntl.prototype.nextYearLabel;
    /**
     * A label for the previous multi-year button (used by screen readers).
     * @type {?}
     */
    McDatepickerIntl.prototype.prevMultiYearLabel;
    /**
     * A label for the next multi-year button (used by screen readers).
     * @type {?}
     */
    McDatepickerIntl.prototype.nextMultiYearLabel;
    /**
     * A label for the 'switch to month view' button (used by screen readers).
     * @type {?}
     */
    McDatepickerIntl.prototype.switchToMonthViewLabel;
    /**
     * A label for the 'switch to year view' button (used by screen readers).
     * @type {?}
     */
    McDatepickerIntl.prototype.switchToMultiYearViewLabel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pbnRsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL2RhdGVwaWNrZXIvIiwic291cmNlcyI6WyJkYXRlcGlja2VyLWludGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7O0FBSS9CO0lBQUE7Ozs7O1FBTWEsWUFBTyxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDOzs7O1FBR3RELGtCQUFhLEdBQVcsVUFBVSxDQUFDOzs7O1FBR25DLHNCQUFpQixHQUFXLGVBQWUsQ0FBQzs7OztRQUc1QyxtQkFBYyxHQUFXLGdCQUFnQixDQUFDOzs7O1FBRzFDLG1CQUFjLEdBQVcsWUFBWSxDQUFDOzs7O1FBR3RDLGtCQUFhLEdBQVcsZUFBZSxDQUFDOzs7O1FBR3hDLGtCQUFhLEdBQVcsV0FBVyxDQUFDOzs7O1FBR3BDLHVCQUFrQixHQUFXLG1CQUFtQixDQUFDOzs7O1FBR2pELHVCQUFrQixHQUFXLGVBQWUsQ0FBQzs7OztRQUc3QywyQkFBc0IsR0FBVyxhQUFhLENBQUM7Ozs7UUFHL0MsK0JBQTBCLEdBQVcsdUJBQXVCLENBQUM7S0FDaEU7O2dCQXJDQSxVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7MkJBTGxDO0NBMENDLEFBckNELElBcUNDO1NBcENZLGdCQUFnQjs7Ozs7OztJQUt6QixtQ0FBc0Q7Ozs7O0lBR3RELHlDQUFtQzs7Ozs7SUFHbkMsNkNBQTRDOzs7OztJQUc1QywwQ0FBMEM7Ozs7O0lBRzFDLDBDQUFzQzs7Ozs7SUFHdEMseUNBQXdDOzs7OztJQUd4Qyx5Q0FBb0M7Ozs7O0lBR3BDLDhDQUFpRDs7Ozs7SUFHakQsOENBQTZDOzs7OztJQUc3QyxrREFBK0M7Ozs7O0lBRy9DLHNEQUE2RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuXG4vKiogRGF0ZXBpY2tlciBkYXRhIHRoYXQgcmVxdWlyZXMgaW50ZXJuYXRpb25hbGl6YXRpb24uICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE1jRGF0ZXBpY2tlckludGwge1xuICAgIC8qKlxuICAgICAqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSBsYWJlbHMgaGVyZSBhcmUgY2hhbmdlZC4gVXNlIHRoaXMgdG8gbm90aWZ5XG4gICAgICogY29tcG9uZW50cyBpZiB0aGUgbGFiZWxzIGhhdmUgY2hhbmdlZCBhZnRlciBpbml0aWFsaXphdGlvbi5cbiAgICAgKi9cbiAgICByZWFkb25seSBjaGFuZ2VzOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgY2FsZW5kYXIgcG9wdXAgKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xuICAgIGNhbGVuZGFyTGFiZWw6IHN0cmluZyA9ICdDYWxlbmRhcic7XG5cbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIGJ1dHRvbiB1c2VkIHRvIG9wZW4gdGhlIGNhbGVuZGFyIHBvcHVwICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cbiAgICBvcGVuQ2FsZW5kYXJMYWJlbDogc3RyaW5nID0gJ09wZW4gY2FsZW5kYXInO1xuXG4gICAgLyoqIEEgbGFiZWwgZm9yIHRoZSBwcmV2aW91cyBtb250aCBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xuICAgIHByZXZNb250aExhYmVsOiBzdHJpbmcgPSAnUHJldmlvdXMgbW9udGgnO1xuXG4gICAgLyoqIEEgbGFiZWwgZm9yIHRoZSBuZXh0IG1vbnRoIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXG4gICAgbmV4dE1vbnRoTGFiZWw6IHN0cmluZyA9ICdOZXh0IG1vbnRoJztcblxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgcHJldmlvdXMgeWVhciBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xuICAgIHByZXZZZWFyTGFiZWw6IHN0cmluZyA9ICdQcmV2aW91cyB5ZWFyJztcblxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgbmV4dCB5ZWFyIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXG4gICAgbmV4dFllYXJMYWJlbDogc3RyaW5nID0gJ05leHQgeWVhcic7XG5cbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIHByZXZpb3VzIG11bHRpLXllYXIgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cbiAgICBwcmV2TXVsdGlZZWFyTGFiZWw6IHN0cmluZyA9ICdQcmV2aW91cyAyMCB5ZWFycyc7XG5cbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIG5leHQgbXVsdGkteWVhciBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xuICAgIG5leHRNdWx0aVllYXJMYWJlbDogc3RyaW5nID0gJ05leHQgMjAgeWVhcnMnO1xuXG4gICAgLyoqIEEgbGFiZWwgZm9yIHRoZSAnc3dpdGNoIHRvIG1vbnRoIHZpZXcnIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXG4gICAgc3dpdGNoVG9Nb250aFZpZXdMYWJlbDogc3RyaW5nID0gJ0Nob29zZSBkYXRlJztcblxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgJ3N3aXRjaCB0byB5ZWFyIHZpZXcnIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXG4gICAgc3dpdGNoVG9NdWx0aVllYXJWaWV3TGFiZWw6IHN0cmluZyA9ICdDaG9vc2UgbW9udGggYW5kIHllYXInO1xufVxuIl19