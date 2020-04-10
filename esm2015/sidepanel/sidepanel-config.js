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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9zaWRlcGFuZWwvIiwic291cmNlcyI6WyJzaWRlcGFuZWwtY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFJL0MsTUFBTSxPQUFPLGlCQUFpQixHQUFHLElBQUksY0FBYyxDQUFNLGlCQUFpQixDQUFDOztBQUUzRSxNQUFZLG1CQUFtQjtJQUMzQixLQUFLLFNBQVU7SUFDZixJQUFJLFFBQVM7SUFDYixHQUFHLE9BQVE7SUFDWCxNQUFNLFVBQVc7RUFDcEI7Ozs7O0FBRUQsTUFBTSxPQUFPLGlCQUFpQjtJQUE5Qjs7OztRQUtJLFNBQUksR0FBYyxJQUFJLENBQUM7UUFFdkIsYUFBUSxHQUF5QixtQkFBbUIsQ0FBQyxLQUFLLENBQUM7Ozs7UUFHM0QsZ0JBQVcsR0FBYSxJQUFJLENBQUM7Ozs7UUFHN0IscUJBQWdCLEdBQWEsS0FBSyxDQUFDOzs7O1FBR25DLGlCQUFZLEdBQWEsS0FBSyxDQUFDOzs7O1FBRy9CLHNCQUFpQixHQUF1QixFQUFFLENBQUM7SUFDL0MsQ0FBQztDQUFBOzs7Ozs7SUFsQkcsK0JBQVk7Ozs7O0lBR1osaUNBQXVCOztJQUV2QixxQ0FBMkQ7Ozs7O0lBRzNELHdDQUE2Qjs7Ozs7SUFHN0IsNkNBQW1DOzs7OztJQUduQyx5Q0FBK0I7Ozs7O0lBRy9CLDhDQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuLyoqIEluamVjdGlvbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGFjY2VzcyB0aGUgZGF0YSB0aGF0IHdhcyBwYXNzZWQgaW4gdG8gYSBzaWRlcGFuZWwuICovXG5leHBvcnQgY29uc3QgTUNfU0lERVBBTkVMX0RBVEEgPSBuZXcgSW5qZWN0aW9uVG9rZW48YW55PignTWNTaWRlcGFuZWxEYXRhJyk7XG5cbmV4cG9ydCBlbnVtIE1jU2lkZXBhbmVsUG9zaXRpb24ge1xuICAgIFJpZ2h0ID0gJ3JpZ2h0JyxcbiAgICBMZWZ0ID0gJ2xlZnQnLFxuICAgIFRvcCA9ICd0b3AnLFxuICAgIEJvdHRvbSA9ICdib3R0b20nXG59XG5cbmV4cG9ydCBjbGFzcyBNY1NpZGVwYW5lbENvbmZpZzxEID0gYW55PiB7XG4gICAgLyoqIElEIGZvciB0aGUgc2lkZXBhbmVsLiBJZiBvbWl0dGVkLCBhIHVuaXF1ZSBvbmUgd2lsbCBiZSBnZW5lcmF0ZWQuICovXG4gICAgaWQ/OiBzdHJpbmc7XG5cbiAgICAvKiogRGF0YSBiZWluZyBpbmplY3RlZCBpbnRvIHRoZSBjaGlsZCBjb21wb25lbnQuICovXG4gICAgZGF0YT86IEQgfCBudWxsID0gbnVsbDtcblxuICAgIHBvc2l0aW9uPzogTWNTaWRlcGFuZWxQb3NpdGlvbiA9IE1jU2lkZXBhbmVsUG9zaXRpb24uUmlnaHQ7XG5cbiAgICAvKiogV2hldGhlciB0aGUgc2lkZXBhbmVsIGhhcyBhIGJhY2tkcm9wLiAqL1xuICAgIGhhc0JhY2tkcm9wPzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogV2hlbiB3ZSBvcGVuIG11bHRpcGxlIHNpZGVwYW5lbHMsIGJhY2tkcm9wIGFwcGVhcnMgb25seSBvbmNlLCBleGNlcHQgY2FzZXMgdGhlbiB0aGlzIGZsYWcgaXMgdHJ1ZS4gKi9cbiAgICByZXF1aXJlZEJhY2tkcm9wPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHVzZXIgY2FuIHVzZSBlc2NhcGUgb3IgY2xpY2tpbmcgb3V0c2lkZSB0byBjbG9zZSB0aGUgc2lkZXBhbmVsLiAqL1xuICAgIGRpc2FibGVDbG9zZT86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBDdXN0b20gY2xhc3MgZm9yIHRoZSBvdmVybGF5IHBhbmUuICovXG4gICAgb3ZlcmxheVBhbmVsQ2xhc3M/OiBzdHJpbmcgfCBzdHJpbmdbXSA9ICcnO1xufVxuIl19