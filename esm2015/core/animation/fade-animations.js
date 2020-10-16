/**
 * @fileoverview added by tsickle
 * Generated from: animation/fade-animations.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { animate, state, style, transition, trigger } from '@angular/animations';
/** @type {?} */
export const fadeAnimation = trigger('fadeAnimation', [
    state('void', style({ opacity: 0 })),
    state('true', style({ opacity: 1 })),
    state('false', style({ opacity: 0 })),
    transition('* => true', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
    transition('* => void', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)'))
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFkZS1hbmltYXRpb25zLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvY29yZS8iLCJzb3VyY2VzIjpbImFuaW1hdGlvbi9mYWRlLWFuaW1hdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0gsT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sRUFFVixNQUFNLHFCQUFxQixDQUFDOztBQUc3QixNQUFNLE9BQU8sYUFBYSxHQUE4QixPQUFPLENBQUMsZUFBZSxFQUFFO0lBQzdFLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7SUFDeEUsVUFBVSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsb0NBQW9DLENBQUMsQ0FBQztDQUN6RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBhbmltYXRlLFxuICAgIHN0YXRlLFxuICAgIHN0eWxlLFxuICAgIHRyYW5zaXRpb24sXG4gICAgdHJpZ2dlcixcbiAgICBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGFcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cblxuZXhwb3J0IGNvbnN0IGZhZGVBbmltYXRpb246IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSA9ICB0cmlnZ2VyKCdmYWRlQW5pbWF0aW9uJywgW1xuICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKSxcbiAgICBzdGF0ZSgndHJ1ZScsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSksXG4gICAgc3RhdGUoJ2ZhbHNlJywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKSxcbiAgICB0cmFuc2l0aW9uKCcqID0+IHRydWUnLCBhbmltYXRlKCcxNTBtcyBjdWJpYy1iZXppZXIoMC4wLCAwLjAsIDAuMiwgMSknKSksXG4gICAgdHJhbnNpdGlvbignKiA9PiB2b2lkJywgYW5pbWF0ZSgnMTUwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAxLCAxKScpKVxuXSk7XG4iXX0=