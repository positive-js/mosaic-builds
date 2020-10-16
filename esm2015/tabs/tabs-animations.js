/**
 * @fileoverview added by tsickle
 * Generated from: tabs-animations.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { animate, state, style, transition, trigger } from '@angular/animations';
/** @type {?} */
export const mcTabsAnimations = {
    /**
     * Animation translates a tab along the X axis.
     */
    translateTab: trigger('translateTab', [
        // Note: transitions to `none` instead of 0, because some browsers might blur the content.
        state('center, void, left-origin-center, right-origin-center', style({ transform: 'none' })),
        // If the tab is either on the left or right, we additionally add a `min-height` of 1px
        // in order to ensure that the element has a height before its state changes. This is
        // necessary because Chrome does seem to skip the transition in RTL mode if the element does
        // not have a static height and is not rendered. See related issue: #9465
        state('left', style({ transform: 'translate3d(-100%, 0, 0)', minHeight: '1px' })),
        state('right', style({ transform: 'translate3d(100%, 0, 0)', minHeight: '1px' })),
        transition('* => left, * => right, left => center, right => center', animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')),
        transition('void => left-origin-center', [
            style({ transform: 'translate3d(-100%, 0, 0)' }),
            animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')
        ]),
        transition('void => right-origin-center', [
            style({ transform: 'translate3d(100%, 0, 0)' }),
            animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')
        ])
    ])
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy1hbmltYXRpb25zLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvdGFicy8iLCJzb3VyY2VzIjpbInRhYnMtYW5pbWF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDSCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUVWLE1BQU0scUJBQXFCLENBQUM7O0FBRzdCLE1BQU0sT0FBTyxnQkFBZ0IsR0FBd0Q7Ozs7SUFFakYsWUFBWSxFQUFFLE9BQU8sQ0FBQyxjQUFjLEVBQUU7UUFDbEMsMEZBQTBGO1FBQzFGLEtBQUssQ0FDRCx1REFBdUQsRUFDdkQsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQy9CO1FBRUQsdUZBQXVGO1FBQ3ZGLHFGQUFxRjtRQUNyRiw0RkFBNEY7UUFDNUYseUVBQXlFO1FBQ3pFLEtBQUssQ0FDRCxNQUFNLEVBQ04sS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLDBCQUEwQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUNyRTtRQUNELEtBQUssQ0FDRCxPQUFPLEVBQ1AsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLHlCQUF5QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUNwRTtRQUVELFVBQVUsQ0FDTix3REFBd0QsRUFDeEQsT0FBTyxDQUFDLHNEQUFzRCxDQUFDLENBQ2xFO1FBQ0QsVUFBVSxDQUFDLDRCQUE0QixFQUFFO1lBQ3JDLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSwwQkFBMEIsRUFBRSxDQUFDO1lBQ2hELE9BQU8sQ0FBQyxzREFBc0QsQ0FBQztTQUNsRSxDQUFDO1FBQ0YsVUFBVSxDQUFDLDZCQUE2QixFQUFFO1lBQ3RDLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSx5QkFBeUIsRUFBRSxDQUFDO1lBQy9DLE9BQU8sQ0FBQyxzREFBc0QsQ0FBQztTQUNsRSxDQUFDO0tBQ0wsQ0FBQztDQUNMIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBhbmltYXRlLFxuICAgIHN0YXRlLFxuICAgIHN0eWxlLFxuICAgIHRyYW5zaXRpb24sXG4gICAgdHJpZ2dlcixcbiAgICBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGFcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cblxuZXhwb3J0IGNvbnN0IG1jVGFic0FuaW1hdGlvbnM6IHsgcmVhZG9ubHkgdHJhbnNsYXRlVGFiOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEgfSA9IHtcbiAgICAvKiogQW5pbWF0aW9uIHRyYW5zbGF0ZXMgYSB0YWIgYWxvbmcgdGhlIFggYXhpcy4gKi9cbiAgICB0cmFuc2xhdGVUYWI6IHRyaWdnZXIoJ3RyYW5zbGF0ZVRhYicsIFtcbiAgICAgICAgLy8gTm90ZTogdHJhbnNpdGlvbnMgdG8gYG5vbmVgIGluc3RlYWQgb2YgMCwgYmVjYXVzZSBzb21lIGJyb3dzZXJzIG1pZ2h0IGJsdXIgdGhlIGNvbnRlbnQuXG4gICAgICAgIHN0YXRlKFxuICAgICAgICAgICAgJ2NlbnRlciwgdm9pZCwgbGVmdC1vcmlnaW4tY2VudGVyLCByaWdodC1vcmlnaW4tY2VudGVyJyxcbiAgICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAnbm9uZScgfSlcbiAgICAgICAgKSxcblxuICAgICAgICAvLyBJZiB0aGUgdGFiIGlzIGVpdGhlciBvbiB0aGUgbGVmdCBvciByaWdodCwgd2UgYWRkaXRpb25hbGx5IGFkZCBhIGBtaW4taGVpZ2h0YCBvZiAxcHhcbiAgICAgICAgLy8gaW4gb3JkZXIgdG8gZW5zdXJlIHRoYXQgdGhlIGVsZW1lbnQgaGFzIGEgaGVpZ2h0IGJlZm9yZSBpdHMgc3RhdGUgY2hhbmdlcy4gVGhpcyBpc1xuICAgICAgICAvLyBuZWNlc3NhcnkgYmVjYXVzZSBDaHJvbWUgZG9lcyBzZWVtIHRvIHNraXAgdGhlIHRyYW5zaXRpb24gaW4gUlRMIG1vZGUgaWYgdGhlIGVsZW1lbnQgZG9lc1xuICAgICAgICAvLyBub3QgaGF2ZSBhIHN0YXRpYyBoZWlnaHQgYW5kIGlzIG5vdCByZW5kZXJlZC4gU2VlIHJlbGF0ZWQgaXNzdWU6ICM5NDY1XG4gICAgICAgIHN0YXRlKFxuICAgICAgICAgICAgJ2xlZnQnLFxuICAgICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgtMTAwJSwgMCwgMCknLCBtaW5IZWlnaHQ6ICcxcHgnIH0pXG4gICAgICAgICksXG4gICAgICAgIHN0YXRlKFxuICAgICAgICAgICAgJ3JpZ2h0JyxcbiAgICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMTAwJSwgMCwgMCknLCBtaW5IZWlnaHQ6ICcxcHgnIH0pXG4gICAgICAgICksXG5cbiAgICAgICAgdHJhbnNpdGlvbihcbiAgICAgICAgICAgICcqID0+IGxlZnQsICogPT4gcmlnaHQsIGxlZnQgPT4gY2VudGVyLCByaWdodCA9PiBjZW50ZXInLFxuICAgICAgICAgICAgYW5pbWF0ZSgne3thbmltYXRpb25EdXJhdGlvbn19IGN1YmljLWJlemllcigwLjM1LCAwLCAwLjI1LCAxKScpXG4gICAgICAgICksXG4gICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gbGVmdC1vcmlnaW4tY2VudGVyJywgW1xuICAgICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgtMTAwJSwgMCwgMCknIH0pLFxuICAgICAgICAgICAgYW5pbWF0ZSgne3thbmltYXRpb25EdXJhdGlvbn19IGN1YmljLWJlemllcigwLjM1LCAwLCAwLjI1LCAxKScpXG4gICAgICAgIF0pLFxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHJpZ2h0LW9yaWdpbi1jZW50ZXInLCBbXG4gICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDEwMCUsIDAsIDApJyB9KSxcbiAgICAgICAgICAgIGFuaW1hdGUoJ3t7YW5pbWF0aW9uRHVyYXRpb259fSBjdWJpYy1iZXppZXIoMC4zNSwgMCwgMC4yNSwgMSknKVxuICAgICAgICBdKVxuICAgIF0pXG59O1xuIl19