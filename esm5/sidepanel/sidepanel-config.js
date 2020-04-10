/**
 * @fileoverview added by tsickle
 * Generated from: sidepanel-config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
/**
 * Injection token that can be used to access the data that was passed in to a sidepanel.
 * @type {?}
 */
export var MC_SIDEPANEL_DATA = new InjectionToken('McSidepanelData');
/** @enum {string} */
var McSidepanelPosition = {
    Right: "right",
    Left: "left",
    Top: "top",
    Bottom: "bottom",
};
export { McSidepanelPosition };
/**
 * @template D
 */
var /**
 * @template D
 */
McSidepanelConfig = /** @class */ (function () {
    function McSidepanelConfig() {
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
    return McSidepanelConfig;
}());
/**
 * @template D
 */
export { McSidepanelConfig };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9zaWRlcGFuZWwvIiwic291cmNlcyI6WyJzaWRlcGFuZWwtY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFJL0MsTUFBTSxLQUFPLGlCQUFpQixHQUFHLElBQUksY0FBYyxDQUFNLGlCQUFpQixDQUFDOztBQUUzRSxJQUFZLG1CQUFtQjtJQUMzQixLQUFLLFNBQVU7SUFDZixJQUFJLFFBQVM7SUFDYixHQUFHLE9BQVE7SUFDWCxNQUFNLFVBQVc7RUFDcEI7Ozs7O0FBRUQ7Ozs7SUFBQTs7OztRQUtJLFNBQUksR0FBYyxJQUFJLENBQUM7UUFFdkIsYUFBUSxHQUF5QixtQkFBbUIsQ0FBQyxLQUFLLENBQUM7Ozs7UUFHM0QsZ0JBQVcsR0FBYSxJQUFJLENBQUM7Ozs7UUFHN0IscUJBQWdCLEdBQWEsS0FBSyxDQUFDOzs7O1FBR25DLGlCQUFZLEdBQWEsS0FBSyxDQUFDOzs7O1FBRy9CLHNCQUFpQixHQUF1QixFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0FBQyxBQXBCRCxJQW9CQzs7Ozs7Ozs7OztJQWxCRywrQkFBWTs7Ozs7SUFHWixpQ0FBdUI7O0lBRXZCLHFDQUEyRDs7Ozs7SUFHM0Qsd0NBQTZCOzs7OztJQUc3Qiw2Q0FBbUM7Ozs7O0lBR25DLHlDQUErQjs7Ozs7SUFHL0IsOENBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gYWNjZXNzIHRoZSBkYXRhIHRoYXQgd2FzIHBhc3NlZCBpbiB0byBhIHNpZGVwYW5lbC4gKi9cbmV4cG9ydCBjb25zdCBNQ19TSURFUEFORUxfREFUQSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxhbnk+KCdNY1NpZGVwYW5lbERhdGEnKTtcblxuZXhwb3J0IGVudW0gTWNTaWRlcGFuZWxQb3NpdGlvbiB7XG4gICAgUmlnaHQgPSAncmlnaHQnLFxuICAgIExlZnQgPSAnbGVmdCcsXG4gICAgVG9wID0gJ3RvcCcsXG4gICAgQm90dG9tID0gJ2JvdHRvbSdcbn1cblxuZXhwb3J0IGNsYXNzIE1jU2lkZXBhbmVsQ29uZmlnPEQgPSBhbnk+IHtcbiAgICAvKiogSUQgZm9yIHRoZSBzaWRlcGFuZWwuIElmIG9taXR0ZWQsIGEgdW5pcXVlIG9uZSB3aWxsIGJlIGdlbmVyYXRlZC4gKi9cbiAgICBpZD86IHN0cmluZztcblxuICAgIC8qKiBEYXRhIGJlaW5nIGluamVjdGVkIGludG8gdGhlIGNoaWxkIGNvbXBvbmVudC4gKi9cbiAgICBkYXRhPzogRCB8IG51bGwgPSBudWxsO1xuXG4gICAgcG9zaXRpb24/OiBNY1NpZGVwYW5lbFBvc2l0aW9uID0gTWNTaWRlcGFuZWxQb3NpdGlvbi5SaWdodDtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBzaWRlcGFuZWwgaGFzIGEgYmFja2Ryb3AuICovXG4gICAgaGFzQmFja2Ryb3A/OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBXaGVuIHdlIG9wZW4gbXVsdGlwbGUgc2lkZXBhbmVscywgYmFja2Ryb3AgYXBwZWFycyBvbmx5IG9uY2UsIGV4Y2VwdCBjYXNlcyB0aGVuIHRoaXMgZmxhZyBpcyB0cnVlLiAqL1xuICAgIHJlcXVpcmVkQmFja2Ryb3A/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogV2hldGhlciB0aGUgdXNlciBjYW4gdXNlIGVzY2FwZSBvciBjbGlja2luZyBvdXRzaWRlIHRvIGNsb3NlIHRoZSBzaWRlcGFuZWwuICovXG4gICAgZGlzYWJsZUNsb3NlPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEN1c3RvbSBjbGFzcyBmb3IgdGhlIG92ZXJsYXkgcGFuZS4gKi9cbiAgICBvdmVybGF5UGFuZWxDbGFzcz86IHN0cmluZyB8IHN0cmluZ1tdID0gJyc7XG59XG4iXX0=