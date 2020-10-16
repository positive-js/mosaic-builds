/**
 * @fileoverview added by tsickle
 * Generated from: sidepanel-config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
/**
 * Injection token that can be used to access the data that was passed in to a sidepanel.
 * @type {?}
 */
export const MC_SIDEPANEL_DATA = new InjectionToken('McSidepanelData');
/** @enum {string} */
const McSidepanelPosition = {
    Right: "right",
    Left: "left",
    Top: "top",
    Bottom: "bottom",
};
export { McSidepanelPosition };
/**
 * @template D
 */
export class McSidepanelConfig {
    constructor() {
        /**
         * Data being injected into the child component.
         */
        this.data = null;
        this.position = McSidepanelPosition.Right;
        /**
         * Whether the sidepanel has a backdrop.
         */
        this.hasBackdrop = true;
        /**
         * When we open multiple sidepanels, backdrop appears only once, except cases then this flag is true.
         */
        this.requiredBackdrop = false;
        /**
         * Whether the user can use escape or clicking outside to close the sidepanel.
         */
        this.disableClose = false;
        /**
         * Custom class for the overlay pane.
         */
        this.overlayPanelClass = '';
    }
}
if (false) {
    /**
     * ID for the sidepanel. If omitted, a unique one will be generated.
     * @type {?}
     */
    McSidepanelConfig.prototype.id;
    /**
     * Data being injected into the child component.
     * @type {?}
     */
    McSidepanelConfig.prototype.data;
    /** @type {?} */
    McSidepanelConfig.prototype.position;
    /**
     * Whether the sidepanel has a backdrop.
     * @type {?}
     */
    McSidepanelConfig.prototype.hasBackdrop;
    /**
     * When we open multiple sidepanels, backdrop appears only once, except cases then this flag is true.
     * @type {?}
     */
    McSidepanelConfig.prototype.requiredBackdrop;
    /**
     * Whether the user can use escape or clicking outside to close the sidepanel.
     * @type {?}
     */
    McSidepanelConfig.prototype.disableClose;
    /**
     * Custom class for the overlay pane.
     * @type {?}
     */
    McSidepanelConfig.prototype.overlayPanelClass;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL3NpZGVwYW5lbC8iLCJzb3VyY2VzIjpbInNpZGVwYW5lbC1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQUkvQyxNQUFNLE9BQU8saUJBQWlCLEdBQUcsSUFBSSxjQUFjLENBQU0saUJBQWlCLENBQUM7O0FBRTNFLE1BQVksbUJBQW1CO0lBQzNCLEtBQUssU0FBVTtJQUNmLElBQUksUUFBUztJQUNiLEdBQUcsT0FBUTtJQUNYLE1BQU0sVUFBVztFQUNwQjs7Ozs7QUFFRCxNQUFNLE9BQU8saUJBQWlCO0lBQTlCOzs7O1FBS0ksU0FBSSxHQUFjLElBQUksQ0FBQztRQUV2QixhQUFRLEdBQXlCLG1CQUFtQixDQUFDLEtBQUssQ0FBQzs7OztRQUczRCxnQkFBVyxHQUFhLElBQUksQ0FBQzs7OztRQUc3QixxQkFBZ0IsR0FBYSxLQUFLLENBQUM7Ozs7UUFHbkMsaUJBQVksR0FBYSxLQUFLLENBQUM7Ozs7UUFHL0Isc0JBQWlCLEdBQXVCLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0NBQUE7Ozs7OztJQWxCRywrQkFBWTs7Ozs7SUFHWixpQ0FBdUI7O0lBRXZCLHFDQUEyRDs7Ozs7SUFHM0Qsd0NBQTZCOzs7OztJQUc3Qiw2Q0FBbUM7Ozs7O0lBR25DLHlDQUErQjs7Ozs7SUFHL0IsOENBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gYWNjZXNzIHRoZSBkYXRhIHRoYXQgd2FzIHBhc3NlZCBpbiB0byBhIHNpZGVwYW5lbC4gKi9cbmV4cG9ydCBjb25zdCBNQ19TSURFUEFORUxfREFUQSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxhbnk+KCdNY1NpZGVwYW5lbERhdGEnKTtcblxuZXhwb3J0IGVudW0gTWNTaWRlcGFuZWxQb3NpdGlvbiB7XG4gICAgUmlnaHQgPSAncmlnaHQnLFxuICAgIExlZnQgPSAnbGVmdCcsXG4gICAgVG9wID0gJ3RvcCcsXG4gICAgQm90dG9tID0gJ2JvdHRvbSdcbn1cblxuZXhwb3J0IGNsYXNzIE1jU2lkZXBhbmVsQ29uZmlnPEQgPSBhbnk+IHtcbiAgICAvKiogSUQgZm9yIHRoZSBzaWRlcGFuZWwuIElmIG9taXR0ZWQsIGEgdW5pcXVlIG9uZSB3aWxsIGJlIGdlbmVyYXRlZC4gKi9cbiAgICBpZD86IHN0cmluZztcblxuICAgIC8qKiBEYXRhIGJlaW5nIGluamVjdGVkIGludG8gdGhlIGNoaWxkIGNvbXBvbmVudC4gKi9cbiAgICBkYXRhPzogRCB8IG51bGwgPSBudWxsO1xuXG4gICAgcG9zaXRpb24/OiBNY1NpZGVwYW5lbFBvc2l0aW9uID0gTWNTaWRlcGFuZWxQb3NpdGlvbi5SaWdodDtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBzaWRlcGFuZWwgaGFzIGEgYmFja2Ryb3AuICovXG4gICAgaGFzQmFja2Ryb3A/OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBXaGVuIHdlIG9wZW4gbXVsdGlwbGUgc2lkZXBhbmVscywgYmFja2Ryb3AgYXBwZWFycyBvbmx5IG9uY2UsIGV4Y2VwdCBjYXNlcyB0aGVuIHRoaXMgZmxhZyBpcyB0cnVlLiAqL1xuICAgIHJlcXVpcmVkQmFja2Ryb3A/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogV2hldGhlciB0aGUgdXNlciBjYW4gdXNlIGVzY2FwZSBvciBjbGlja2luZyBvdXRzaWRlIHRvIGNsb3NlIHRoZSBzaWRlcGFuZWwuICovXG4gICAgZGlzYWJsZUNsb3NlPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEN1c3RvbSBjbGFzcyBmb3IgdGhlIG92ZXJsYXkgcGFuZS4gKi9cbiAgICBvdmVybGF5UGFuZWxDbGFzcz86IHN0cmluZyB8IHN0cmluZ1tdID0gJyc7XG59XG4iXX0=