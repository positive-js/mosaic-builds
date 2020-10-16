/**
 * @fileoverview added by tsickle
 * Generated from: vertical-navbar.animation.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { animate, style, transition, trigger, state } from '@angular/animations';
/**
 * @return {?}
 */
export function toggleVerticalNavbarAnimation() {
    return trigger('toggle', [
        state('0', style({
            width: '64px'
        })),
        state('1', style({
            width: '*'
        })),
        transition('0 <=> 1', animate('200ms cubic-bezier(0, 1, 0.5, 1)'))
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2YmFyLmFuaW1hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL3ZlcnRpY2FsLW5hdmJhci8iLCJzb3VyY2VzIjpbInZlcnRpY2FsLW5hdmJhci5hbmltYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUE0QixLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7OztBQUczRyxNQUFNLFVBQVUsNkJBQTZCO0lBQ3pDLE9BQU8sT0FBTyxDQUFDLFFBQVEsRUFBRTtRQUNyQixLQUFLLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQztZQUNiLEtBQUssRUFBRSxNQUFNO1NBQ2hCLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxHQUFHLEVBQUcsS0FBSyxDQUFDO1lBQ2QsS0FBSyxFQUFFLEdBQUc7U0FDYixDQUFDLENBQUM7UUFDSCxVQUFVLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0tBQ3JFLENBQUMsQ0FBQztBQUNQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyLCBzdGF0ZSB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVWZXJ0aWNhbE5hdmJhckFuaW1hdGlvbigpOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEge1xuICAgIHJldHVybiB0cmlnZ2VyKCd0b2dnbGUnLCBbXG4gICAgICAgIHN0YXRlKCcwJywgc3R5bGUoe1xuICAgICAgICAgICAgd2lkdGg6ICc2NHB4J1xuICAgICAgICB9KSksXG4gICAgICAgIHN0YXRlKCcxJywgIHN0eWxlKHtcbiAgICAgICAgICAgIHdpZHRoOiAnKidcbiAgICAgICAgfSkpLFxuICAgICAgICB0cmFuc2l0aW9uKCcwIDw9PiAxJywgYW5pbWF0ZSgnMjAwbXMgY3ViaWMtYmV6aWVyKDAsIDEsIDAuNSwgMSknKSlcbiAgICBdKTtcbn1cbiJdfQ==