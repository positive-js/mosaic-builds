/**
 * @fileoverview added by tsickle
 * Generated from: select/constants.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Overlay } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';
/**
 * The max height of the select's overlay panel
 * @type {?}
 */
export var SELECT_PANEL_MAX_HEIGHT = 224;
/**
 * The panel's padding on the x-axis
 * @type {?}
 */
export var SELECT_PANEL_PADDING_X = 1;
/* tslint:disable-next-line:no-magic-numbers */
/**
 * The panel's x axis padding if it is indented (e.g. there is an option group).
 * @type {?}
 */
export var SELECT_PANEL_INDENT_PADDING_X = SELECT_PANEL_PADDING_X * 2;
/**
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
 * @type {?}
 */
export var SELECT_PANEL_VIEWPORT_PADDING = 8;
/**
 * Injection token that determines the scroll handling while a select is open.
 * @type {?}
 */
export var MC_SELECT_SCROLL_STRATEGY = new InjectionToken('mc-select-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
export function mcSelectScrollStrategyProviderFactory(overlay) {
    return (/**
     * @return {?}
     */
    function () { return overlay.scrollStrategies.reposition(); });
}
/**
 * \@docs-private
 * @type {?}
 */
export var MC_SELECT_SCROLL_STRATEGY_PROVIDER = {
    provide: MC_SELECT_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: mcSelectScrollStrategyProviderFactory
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUvIiwic291cmNlcyI6WyJzZWxlY3QvY29uc3RhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFrQixPQUFPLEVBQTRCLE1BQU0sc0JBQXNCLENBQUM7QUFDekYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFJL0MsTUFBTSxLQUFPLHVCQUF1QixHQUFHLEdBQUc7Ozs7O0FBRzFDLE1BQU0sS0FBTyxzQkFBc0IsR0FBRyxDQUFDOzs7Ozs7QUFJdkMsTUFBTSxLQUFPLDZCQUE2QixHQUFHLHNCQUFzQixHQUFHLENBQUM7Ozs7OztBQU12RSxNQUFNLEtBQU8sNkJBQTZCLEdBQUcsQ0FBQzs7Ozs7QUFJOUMsTUFBTSxLQUFPLHlCQUF5QixHQUNsQyxJQUFJLGNBQWMsQ0FBdUIsMkJBQTJCLENBQUM7Ozs7OztBQUd6RSxNQUFNLFVBQVUscUNBQXFDLENBQUMsT0FBZ0I7SUFFbEU7OztJQUFPLGNBQU0sT0FBQSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLEVBQXJDLENBQXFDLEVBQUM7QUFDdkQsQ0FBQzs7Ozs7QUFHRCxNQUFNLEtBQU8sa0NBQWtDLEdBQUc7SUFDOUMsT0FBTyxFQUFFLHlCQUF5QjtJQUNsQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDZixVQUFVLEVBQUUscUNBQXFDO0NBQ3BEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2Nyb2xsU3RyYXRlZ3ksIE92ZXJsYXksIFJlcG9zaXRpb25TY3JvbGxTdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuLyoqIFRoZSBtYXggaGVpZ2h0IG9mIHRoZSBzZWxlY3QncyBvdmVybGF5IHBhbmVsICovXG5leHBvcnQgY29uc3QgU0VMRUNUX1BBTkVMX01BWF9IRUlHSFQgPSAyMjQ7XG5cbi8qKiBUaGUgcGFuZWwncyBwYWRkaW5nIG9uIHRoZSB4LWF4aXMgKi9cbmV4cG9ydCBjb25zdCBTRUxFQ1RfUEFORUxfUEFERElOR19YID0gMTtcblxuLyoqIFRoZSBwYW5lbCdzIHggYXhpcyBwYWRkaW5nIGlmIGl0IGlzIGluZGVudGVkIChlLmcuIHRoZXJlIGlzIGFuIG9wdGlvbiBncm91cCkuICovXG4vKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbWFnaWMtbnVtYmVycyAqL1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9QQU5FTF9JTkRFTlRfUEFERElOR19YID0gU0VMRUNUX1BBTkVMX1BBRERJTkdfWCAqIDI7XG5cbi8qKlxuICogVGhlIHNlbGVjdCBwYW5lbCB3aWxsIG9ubHkgXCJmaXRcIiBpbnNpZGUgdGhlIHZpZXdwb3J0IGlmIGl0IGlzIHBvc2l0aW9uZWQgYXRcbiAqIHRoaXMgdmFsdWUgb3IgbW9yZSBhd2F5IGZyb20gdGhlIHZpZXdwb3J0IGJvdW5kYXJ5LlxuICovXG5leHBvcnQgY29uc3QgU0VMRUNUX1BBTkVMX1ZJRVdQT1JUX1BBRERJTkcgPSA4O1xuXG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBkZXRlcm1pbmVzIHRoZSBzY3JvbGwgaGFuZGxpbmcgd2hpbGUgYSBzZWxlY3QgaXMgb3Blbi4gKi9cbmV4cG9ydCBjb25zdCBNQ19TRUxFQ1RfU0NST0xMX1NUUkFURUdZID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+KCdtYy1zZWxlY3Qtc2Nyb2xsLXN0cmF0ZWd5Jyk7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZnVuY3Rpb24gbWNTZWxlY3RTY3JvbGxTdHJhdGVneVByb3ZpZGVyRmFjdG9yeShvdmVybGF5OiBPdmVybGF5KTpcbiAgICAoKSA9PiBSZXBvc2l0aW9uU2Nyb2xsU3RyYXRlZ3kge1xuICAgIHJldHVybiAoKSA9PiBvdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbigpO1xufVxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNvbnN0IE1DX1NFTEVDVF9TQ1JPTExfU1RSQVRFR1lfUFJPVklERVIgPSB7XG4gICAgcHJvdmlkZTogTUNfU0VMRUNUX1NDUk9MTF9TVFJBVEVHWSxcbiAgICBkZXBzOiBbT3ZlcmxheV0sXG4gICAgdXNlRmFjdG9yeTogbWNTZWxlY3RTY3JvbGxTdHJhdGVneVByb3ZpZGVyRmFjdG9yeVxufTtcbiJdfQ==