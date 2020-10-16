/**
 * @fileoverview added by tsickle
 * Generated from: select/constants.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Overlay } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';
/**
 * The max height of the select's overlay panel
 * @type {?}
 */
export const SELECT_PANEL_MAX_HEIGHT = 224;
/**
 * The panel's padding on the x-axis
 * @type {?}
 */
export const SELECT_PANEL_PADDING_X = 1;
/* tslint:disable-next-line:no-magic-numbers */
/**
 * The panel's x axis padding if it is indented (e.g. there is an option group).
 * @type {?}
 */
export const SELECT_PANEL_INDENT_PADDING_X = SELECT_PANEL_PADDING_X * 2;
/**
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
 * @type {?}
 */
export const SELECT_PANEL_VIEWPORT_PADDING = 8;
/**
 * Injection token that determines the scroll handling while a select is open.
 * @type {?}
 */
export const MC_SELECT_SCROLL_STRATEGY = new InjectionToken('mc-select-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
export function mcSelectScrollStrategyProviderFactory(overlay) {
    return (/**
     * @return {?}
     */
    () => overlay.scrollStrategies.reposition());
}
/**
 * \@docs-private
 * @type {?}
 */
export const MC_SELECT_SCROLL_STRATEGY_PROVIDER = {
    provide: MC_SELECT_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: mcSelectScrollStrategyProviderFactory
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvY29yZS8iLCJzb3VyY2VzIjpbInNlbGVjdC9jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWtCLE9BQU8sRUFBNEIsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQUkvQyxNQUFNLE9BQU8sdUJBQXVCLEdBQUcsR0FBRzs7Ozs7QUFHMUMsTUFBTSxPQUFPLHNCQUFzQixHQUFHLENBQUM7Ozs7OztBQUl2QyxNQUFNLE9BQU8sNkJBQTZCLEdBQUcsc0JBQXNCLEdBQUcsQ0FBQzs7Ozs7O0FBTXZFLE1BQU0sT0FBTyw2QkFBNkIsR0FBRyxDQUFDOzs7OztBQUk5QyxNQUFNLE9BQU8seUJBQXlCLEdBQ2xDLElBQUksY0FBYyxDQUF1QiwyQkFBMkIsQ0FBQzs7Ozs7O0FBR3pFLE1BQU0sVUFBVSxxQ0FBcUMsQ0FBQyxPQUFnQjtJQUVsRTs7O0lBQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxFQUFDO0FBQ3ZELENBQUM7Ozs7O0FBR0QsTUFBTSxPQUFPLGtDQUFrQyxHQUFHO0lBQzlDLE9BQU8sRUFBRSx5QkFBeUI7SUFDbEMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ2YsVUFBVSxFQUFFLHFDQUFxQztDQUNwRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNjcm9sbFN0cmF0ZWd5LCBPdmVybGF5LCBSZXBvc2l0aW9uU2Nyb2xsU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbi8qKiBUaGUgbWF4IGhlaWdodCBvZiB0aGUgc2VsZWN0J3Mgb3ZlcmxheSBwYW5lbCAqL1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9QQU5FTF9NQVhfSEVJR0hUID0gMjI0O1xuXG4vKiogVGhlIHBhbmVsJ3MgcGFkZGluZyBvbiB0aGUgeC1heGlzICovXG5leHBvcnQgY29uc3QgU0VMRUNUX1BBTkVMX1BBRERJTkdfWCA9IDE7XG5cbi8qKiBUaGUgcGFuZWwncyB4IGF4aXMgcGFkZGluZyBpZiBpdCBpcyBpbmRlbnRlZCAoZS5nLiB0aGVyZSBpcyBhbiBvcHRpb24gZ3JvdXApLiAqL1xuLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnMgKi9cbmV4cG9ydCBjb25zdCBTRUxFQ1RfUEFORUxfSU5ERU5UX1BBRERJTkdfWCA9IFNFTEVDVF9QQU5FTF9QQURESU5HX1ggKiAyO1xuXG4vKipcbiAqIFRoZSBzZWxlY3QgcGFuZWwgd2lsbCBvbmx5IFwiZml0XCIgaW5zaWRlIHRoZSB2aWV3cG9ydCBpZiBpdCBpcyBwb3NpdGlvbmVkIGF0XG4gKiB0aGlzIHZhbHVlIG9yIG1vcmUgYXdheSBmcm9tIHRoZSB2aWV3cG9ydCBib3VuZGFyeS5cbiAqL1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9QQU5FTF9WSUVXUE9SVF9QQURESU5HID0gODtcblxuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgZGV0ZXJtaW5lcyB0aGUgc2Nyb2xsIGhhbmRsaW5nIHdoaWxlIGEgc2VsZWN0IGlzIG9wZW4uICovXG5leHBvcnQgY29uc3QgTUNfU0VMRUNUX1NDUk9MTF9TVFJBVEVHWSA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPCgpID0+IFNjcm9sbFN0cmF0ZWd5PignbWMtc2VsZWN0LXNjcm9sbC1zdHJhdGVneScpO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1jU2VsZWN0U2Nyb2xsU3RyYXRlZ3lQcm92aWRlckZhY3Rvcnkob3ZlcmxheTogT3ZlcmxheSk6XG4gICAgKCkgPT4gUmVwb3NpdGlvblNjcm9sbFN0cmF0ZWd5IHtcbiAgICByZXR1cm4gKCkgPT4gb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oKTtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19TRUxFQ1RfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSID0ge1xuICAgIHByb3ZpZGU6IE1DX1NFTEVDVF9TQ1JPTExfU1RSQVRFR1ksXG4gICAgZGVwczogW092ZXJsYXldLFxuICAgIHVzZUZhY3Rvcnk6IG1jU2VsZWN0U2Nyb2xsU3RyYXRlZ3lQcm92aWRlckZhY3Rvcnlcbn07XG4iXX0=