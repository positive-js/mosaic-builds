/**
 * @fileoverview added by tsickle
 * Generated from: popover-animations.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { animate, state, style, transition, trigger } from '@angular/animations';
/** @type {?} */
export var mcPopoverAnimations = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1hbmltYXRpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3BvcG92ZXIvIiwic291cmNlcyI6WyJwb3BvdmVyLWFuaW1hdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0gsT0FBTyxFQUVQLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sRUFDVixNQUFNLHFCQUFxQixDQUFDOztBQUc3QixNQUFNLEtBQU8sbUJBQW1CLEdBRTVCOzs7O0lBRUEsWUFBWSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUU7UUFDM0IsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUM7WUFDbkIsT0FBTyxFQUFFLENBQUM7WUFDVixTQUFTLEVBQUUsZUFBZTtTQUM3QixDQUFDLENBQUM7UUFDSCxVQUFVLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxrQ0FBa0MsRUFBRSxLQUFLLENBQUM7WUFDekUsT0FBTyxFQUFFLENBQUM7WUFDVixTQUFTLEVBQUUsYUFBYTtTQUMzQixDQUFDLENBQUMsQ0FBQztRQUNKLFVBQVUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzVFLENBQUM7Q0FDTCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgYW5pbWF0ZSxcbiAgICBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEsXG4gICAgc3RhdGUsXG4gICAgc3R5bGUsXG4gICAgdHJhbnNpdGlvbixcbiAgICB0cmlnZ2VyXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5cbmV4cG9ydCBjb25zdCBtY1BvcG92ZXJBbmltYXRpb25zOiB7XG4gICAgcmVhZG9ubHkgcG9wb3ZlclN0YXRlOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGE7XG59ID0ge1xuICAgIC8qKiBBbmltYXRpb24gdGhhdCB0cmFuc2l0aW9ucyBhIHRvb2x0aXAgaW4gYW5kIG91dC4gKi9cbiAgICBwb3BvdmVyU3RhdGU6IHRyaWdnZXIoJ3N0YXRlJywgW1xuICAgICAgICBzdGF0ZSgnaW5pdGlhbCcsIHN0eWxlKHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgxLCAwLjgpJ1xuICAgICAgICB9KSksXG4gICAgICAgIHRyYW5zaXRpb24oJyogPT4gdmlzaWJsZScsIGFuaW1hdGUoJzEyMG1zIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpJywgc3R5bGUoe1xuICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDEsIDEpJ1xuICAgICAgICB9KSkpLFxuICAgICAgICB0cmFuc2l0aW9uKCcqID0+IGhpZGRlbicsIGFuaW1hdGUoJzEwMG1zIGxpbmVhcicsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSkpXG4gICAgXSlcbn07XG4iXX0=