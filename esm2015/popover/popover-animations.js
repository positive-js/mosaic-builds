/**
 * @fileoverview added by tsickle
 * Generated from: popover-animations.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { animate, state, style, transition, trigger } from '@angular/animations';
/** @type {?} */
export const mcPopoverAnimations = {
    /**
     * Animation that transitions a tooltip in and out.
     */
    popoverState: trigger('state', [
        state('initial', style({
            opacity: 0,
            transform: 'scale(1, 0.8)'
        })),
        transition('* => visible', animate('120ms cubic-bezier(0, 0, 0.2, 1)', style({
            opacity: 1,
            transform: 'scale(1, 1)'
        }))),
        transition('* => hidden', animate('100ms linear', style({ opacity: 0 })))
    ])
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1hbmltYXRpb25zLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvcG9wb3Zlci8iLCJzb3VyY2VzIjpbInBvcG92ZXItYW5pbWF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDSCxPQUFPLEVBRVAsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUNWLE1BQU0scUJBQXFCLENBQUM7O0FBRzdCLE1BQU0sT0FBTyxtQkFBbUIsR0FFNUI7Ozs7SUFFQSxZQUFZLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRTtRQUMzQixLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQztZQUNuQixPQUFPLEVBQUUsQ0FBQztZQUNWLFNBQVMsRUFBRSxlQUFlO1NBQzdCLENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLGtDQUFrQyxFQUFFLEtBQUssQ0FBQztZQUN6RSxPQUFPLEVBQUUsQ0FBQztZQUNWLFNBQVMsRUFBRSxhQUFhO1NBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ0osVUFBVSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDNUUsQ0FBQztDQUNMIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBhbmltYXRlLFxuICAgIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSxcbiAgICBzdGF0ZSxcbiAgICBzdHlsZSxcbiAgICB0cmFuc2l0aW9uLFxuICAgIHRyaWdnZXJcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cblxuZXhwb3J0IGNvbnN0IG1jUG9wb3ZlckFuaW1hdGlvbnM6IHtcbiAgICByZWFkb25seSBwb3BvdmVyU3RhdGU6IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YTtcbn0gPSB7XG4gICAgLyoqIEFuaW1hdGlvbiB0aGF0IHRyYW5zaXRpb25zIGEgdG9vbHRpcCBpbiBhbmQgb3V0LiAqL1xuICAgIHBvcG92ZXJTdGF0ZTogdHJpZ2dlcignc3RhdGUnLCBbXG4gICAgICAgIHN0YXRlKCdpbml0aWFsJywgc3R5bGUoe1xuICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDEsIDAuOCknXG4gICAgICAgIH0pKSxcbiAgICAgICAgdHJhbnNpdGlvbignKiA9PiB2aXNpYmxlJywgYW5pbWF0ZSgnMTIwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSknLCBzdHlsZSh7XG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMSwgMSknXG4gICAgICAgIH0pKSksXG4gICAgICAgIHRyYW5zaXRpb24oJyogPT4gaGlkZGVuJywgYW5pbWF0ZSgnMTAwbXMgbGluZWFyJywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKSlcbiAgICBdKVxufTtcbiJdfQ==