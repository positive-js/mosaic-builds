/**
 * @fileoverview added by tsickle
 * Generated from: datepicker-animations.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1hbmltYXRpb25zLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbImRhdGVwaWNrZXItYW5pbWF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDSCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUVWLE1BQU0scUJBQXFCLENBQUM7Ozs7OztBQU83QixNQUFNLE9BQU8sc0JBQXNCLEdBRy9COzs7O0lBRUEsY0FBYyxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTtRQUN0QyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztZQUNoQixPQUFPLEVBQUUsQ0FBQztZQUNWLFNBQVMsRUFBRSxlQUFlO1NBQzdCLENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLGtDQUFrQyxFQUFFLEtBQUssQ0FBQztZQUMxRSxPQUFPLEVBQUUsQ0FBQztZQUNWLFNBQVMsRUFBRSxhQUFhO1NBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ0osVUFBVSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDMUUsQ0FBQzs7OztJQUdGLGNBQWMsRUFBRSxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7UUFDdEMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXJDLHdGQUF3RjtRQUN4RixVQUFVLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO0tBQ25GLENBQUM7Q0FDTDs7O0FBSUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO0lBQzVCLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsbUJBQUEsT0FBTyxDQUFDLFNBQVMsRUFBTyxDQUFDLENBQUMsaUJBQWlCLENBQUM7Q0FDNUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIGFuaW1hdGUsXG4gICAgc3RhdGUsXG4gICAgc3R5bGUsXG4gICAgdHJhbnNpdGlvbixcbiAgICB0cmlnZ2VyLFxuICAgIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YVxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuXG4vKipcbiAqIEFuaW1hdGlvbnMgdXNlZCBieSB0aGUgbW9zYWljIGRhdGVwaWNrZXIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBtY0RhdGVwaWNrZXJBbmltYXRpb25zOiB7XG4gICAgcmVhZG9ubHkgdHJhbnNmb3JtUGFuZWw6IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YTtcbiAgICByZWFkb25seSBmYWRlSW5DYWxlbmRhcjogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhO1xufSA9IHtcbiAgICAvKiogVHJhbnNmb3JtcyB0aGUgaGVpZ2h0IG9mIHRoZSBkYXRlcGlja2VyJ3MgY2FsZW5kYXIuICovXG4gICAgdHJhbnNmb3JtUGFuZWw6IHRyaWdnZXIoJ3RyYW5zZm9ybVBhbmVsJywgW1xuICAgICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgxLCAwLjgpJ1xuICAgICAgICB9KSksXG4gICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gZW50ZXInLCBhbmltYXRlKCcxMjBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKScsIHN0eWxlKHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgxLCAxKSdcbiAgICAgICAgfSkpKSxcbiAgICAgICAgdHJhbnNpdGlvbignKiA9PiB2b2lkJywgYW5pbWF0ZSgnMTAwbXMgbGluZWFyJywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKSlcbiAgICBdKSxcblxuICAgIC8qKiBGYWRlcyBpbiB0aGUgY29udGVudCBvZiB0aGUgY2FsZW5kYXIuICovXG4gICAgZmFkZUluQ2FsZW5kYXI6IHRyaWdnZXIoJ2ZhZGVJbkNhbGVuZGFyJywgW1xuICAgICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSksXG4gICAgICAgIHN0YXRlKCdlbnRlcicsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSksXG5cbiAgICAgICAgLy8gbmVlZCB0byBrZWVwIGl0IHVudGlsICMxMjQ0MCBnZXRzIGluLCBvdGhlcndpc2UgdGhlIGV4aXQgYW5pbWF0aW9uIHdpbGwgbG9vayBnbGl0Y2h5LlxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBhbmltYXRlKCcxMjBtcyAxMDBtcyBjdWJpYy1iZXppZXIoMC41NSwgMCwgMC41NSwgMC4yKScpKVxuICAgIF0pXG59O1xuXG4vLyB0b2RvIHNob3VsZCBiZSBwdXQgaW50byBwb2x5Zmlsc1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMjQ3NjlcbmlmICghRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcykge1xuICAgIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgPSAoRWxlbWVudC5wcm90b3R5cGUgYXMgYW55KS5tc01hdGNoZXNTZWxlY3Rvcjtcbn1cbiJdfQ==