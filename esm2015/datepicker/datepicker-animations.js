/**
 * @fileoverview added by tsickle
 * Generated from: datepicker-animations.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { animate, state, style, transition, trigger } from '@angular/animations';
/**
 * Animations used by the mosaic datepicker.
 * \@docs-private
 * @type {?}
 */
export const mcDatepickerAnimations = {
    /**
     * Transforms the height of the datepicker's calendar.
     */
    transformPanel: trigger('transformPanel', [
        state('void', style({
            opacity: 0,
            transform: 'scale(1, 0.8)'
        })),
        transition('void => enter', animate('120ms cubic-bezier(0, 0, 0.2, 1)', style({
            opacity: 1,
            transform: 'scale(1, 1)'
        }))),
        transition('* => void', animate('100ms linear', style({ opacity: 0 })))
    ]),
    /**
     * Fades in the content of the calendar.
     */
    fadeInCalendar: trigger('fadeInCalendar', [
        state('void', style({ opacity: 0 })),
        state('enter', style({ opacity: 1 })),
        // need to keep it until #12440 gets in, otherwise the exit animation will look glitchy.
        transition('void => *', animate('120ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)'))
    ])
};
// todo should be put into polyfils
// https://github.com/angular/angular/issues/24769
if (!Element.prototype.matches) {
    Element.prototype.matches = ((/** @type {?} */ (Element.prototype))).msMatchesSelector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1hbmltYXRpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL2RhdGVwaWNrZXIvIiwic291cmNlcyI6WyJkYXRlcGlja2VyLWFuaW1hdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0gsT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sRUFFVixNQUFNLHFCQUFxQixDQUFDOzs7Ozs7QUFPN0IsTUFBTSxPQUFPLHNCQUFzQixHQUcvQjs7OztJQUVBLGNBQWMsRUFBRSxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7UUFDdEMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7WUFDaEIsT0FBTyxFQUFFLENBQUM7WUFDVixTQUFTLEVBQUUsZUFBZTtTQUM3QixDQUFDLENBQUM7UUFDSCxVQUFVLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxrQ0FBa0MsRUFBRSxLQUFLLENBQUM7WUFDMUUsT0FBTyxFQUFFLENBQUM7WUFDVixTQUFTLEVBQUUsYUFBYTtTQUMzQixDQUFDLENBQUMsQ0FBQztRQUNKLFVBQVUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzFFLENBQUM7Ozs7SUFHRixjQUFjLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixFQUFFO1FBQ3RDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVyQyx3RkFBd0Y7UUFDeEYsVUFBVSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsOENBQThDLENBQUMsQ0FBQztLQUNuRixDQUFDO0NBQ0w7OztBQUlELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtJQUM1QixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLG1CQUFBLE9BQU8sQ0FBQyxTQUFTLEVBQU8sQ0FBQyxDQUFDLGlCQUFpQixDQUFDO0NBQzVFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBhbmltYXRlLFxuICAgIHN0YXRlLFxuICAgIHN0eWxlLFxuICAgIHRyYW5zaXRpb24sXG4gICAgdHJpZ2dlcixcbiAgICBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGFcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cblxuLyoqXG4gKiBBbmltYXRpb25zIHVzZWQgYnkgdGhlIG1vc2FpYyBkYXRlcGlja2VyLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgbWNEYXRlcGlja2VyQW5pbWF0aW9uczoge1xuICAgIHJlYWRvbmx5IHRyYW5zZm9ybVBhbmVsOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGE7XG4gICAgcmVhZG9ubHkgZmFkZUluQ2FsZW5kYXI6IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YTtcbn0gPSB7XG4gICAgLyoqIFRyYW5zZm9ybXMgdGhlIGhlaWdodCBvZiB0aGUgZGF0ZXBpY2tlcidzIGNhbGVuZGFyLiAqL1xuICAgIHRyYW5zZm9ybVBhbmVsOiB0cmlnZ2VyKCd0cmFuc2Zvcm1QYW5lbCcsIFtcbiAgICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7XG4gICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMSwgMC44KSdcbiAgICAgICAgfSkpLFxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IGVudGVyJywgYW5pbWF0ZSgnMTIwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSknLCBzdHlsZSh7XG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMSwgMSknXG4gICAgICAgIH0pKSksXG4gICAgICAgIHRyYW5zaXRpb24oJyogPT4gdm9pZCcsIGFuaW1hdGUoJzEwMG1zIGxpbmVhcicsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSkpXG4gICAgXSksXG5cbiAgICAvKiogRmFkZXMgaW4gdGhlIGNvbnRlbnQgb2YgdGhlIGNhbGVuZGFyLiAqL1xuICAgIGZhZGVJbkNhbGVuZGFyOiB0cmlnZ2VyKCdmYWRlSW5DYWxlbmRhcicsIFtcbiAgICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpLFxuICAgICAgICBzdGF0ZSgnZW50ZXInLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpLFxuXG4gICAgICAgIC8vIG5lZWQgdG8ga2VlcCBpdCB1bnRpbCAjMTI0NDAgZ2V0cyBpbiwgb3RoZXJ3aXNlIHRoZSBleGl0IGFuaW1hdGlvbiB3aWxsIGxvb2sgZ2xpdGNoeS5cbiAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiAqJywgYW5pbWF0ZSgnMTIwbXMgMTAwbXMgY3ViaWMtYmV6aWVyKDAuNTUsIDAsIDAuNTUsIDAuMiknKSlcbiAgICBdKVxufTtcblxuLy8gdG9kbyBzaG91bGQgYmUgcHV0IGludG8gcG9seWZpbHNcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzI0NzY5XG5pZiAoIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzID0gKEVsZW1lbnQucHJvdG90eXBlIGFzIGFueSkubXNNYXRjaGVzU2VsZWN0b3I7XG59XG4iXX0=