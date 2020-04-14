/**
 * @fileoverview added by tsickle
 * Generated from: tabs-animations.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy1hbmltYXRpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RhYnMvIiwic291cmNlcyI6WyJ0YWJzLWFuaW1hdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0gsT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sRUFFVixNQUFNLHFCQUFxQixDQUFDOztBQUc3QixNQUFNLE9BQU8sZ0JBQWdCLEdBQXdEOzs7O0lBRWpGLFlBQVksRUFBRSxPQUFPLENBQUMsY0FBYyxFQUFFO1FBQ2xDLDBGQUEwRjtRQUMxRixLQUFLLENBQ0QsdURBQXVELEVBQ3ZELEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUMvQjtRQUVELHVGQUF1RjtRQUN2RixxRkFBcUY7UUFDckYsNEZBQTRGO1FBQzVGLHlFQUF5RTtRQUN6RSxLQUFLLENBQ0QsTUFBTSxFQUNOLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSwwQkFBMEIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FDckU7UUFDRCxLQUFLLENBQ0QsT0FBTyxFQUNQLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSx5QkFBeUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FDcEU7UUFFRCxVQUFVLENBQ04sd0RBQXdELEVBQ3hELE9BQU8sQ0FBQyxzREFBc0QsQ0FBQyxDQUNsRTtRQUNELFVBQVUsQ0FBQyw0QkFBNEIsRUFBRTtZQUNyQyxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQztZQUNoRCxPQUFPLENBQUMsc0RBQXNELENBQUM7U0FDbEUsQ0FBQztRQUNGLFVBQVUsQ0FBQyw2QkFBNkIsRUFBRTtZQUN0QyxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUseUJBQXlCLEVBQUUsQ0FBQztZQUMvQyxPQUFPLENBQUMsc0RBQXNELENBQUM7U0FDbEUsQ0FBQztLQUNMLENBQUM7Q0FDTCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgYW5pbWF0ZSxcbiAgICBzdGF0ZSxcbiAgICBzdHlsZSxcbiAgICB0cmFuc2l0aW9uLFxuICAgIHRyaWdnZXIsXG4gICAgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5cbmV4cG9ydCBjb25zdCBtY1RhYnNBbmltYXRpb25zOiB7IHJlYWRvbmx5IHRyYW5zbGF0ZVRhYjogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhIH0gPSB7XG4gICAgLyoqIEFuaW1hdGlvbiB0cmFuc2xhdGVzIGEgdGFiIGFsb25nIHRoZSBYIGF4aXMuICovXG4gICAgdHJhbnNsYXRlVGFiOiB0cmlnZ2VyKCd0cmFuc2xhdGVUYWInLCBbXG4gICAgICAgIC8vIE5vdGU6IHRyYW5zaXRpb25zIHRvIGBub25lYCBpbnN0ZWFkIG9mIDAsIGJlY2F1c2Ugc29tZSBicm93c2VycyBtaWdodCBibHVyIHRoZSBjb250ZW50LlxuICAgICAgICBzdGF0ZShcbiAgICAgICAgICAgICdjZW50ZXIsIHZvaWQsIGxlZnQtb3JpZ2luLWNlbnRlciwgcmlnaHQtb3JpZ2luLWNlbnRlcicsXG4gICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ25vbmUnIH0pXG4gICAgICAgICksXG5cbiAgICAgICAgLy8gSWYgdGhlIHRhYiBpcyBlaXRoZXIgb24gdGhlIGxlZnQgb3IgcmlnaHQsIHdlIGFkZGl0aW9uYWxseSBhZGQgYSBgbWluLWhlaWdodGAgb2YgMXB4XG4gICAgICAgIC8vIGluIG9yZGVyIHRvIGVuc3VyZSB0aGF0IHRoZSBlbGVtZW50IGhhcyBhIGhlaWdodCBiZWZvcmUgaXRzIHN0YXRlIGNoYW5nZXMuIFRoaXMgaXNcbiAgICAgICAgLy8gbmVjZXNzYXJ5IGJlY2F1c2UgQ2hyb21lIGRvZXMgc2VlbSB0byBza2lwIHRoZSB0cmFuc2l0aW9uIGluIFJUTCBtb2RlIGlmIHRoZSBlbGVtZW50IGRvZXNcbiAgICAgICAgLy8gbm90IGhhdmUgYSBzdGF0aWMgaGVpZ2h0IGFuZCBpcyBub3QgcmVuZGVyZWQuIFNlZSByZWxhdGVkIGlzc3VlOiAjOTQ2NVxuICAgICAgICBzdGF0ZShcbiAgICAgICAgICAgICdsZWZ0JyxcbiAgICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoLTEwMCUsIDAsIDApJywgbWluSGVpZ2h0OiAnMXB4JyB9KVxuICAgICAgICApLFxuICAgICAgICBzdGF0ZShcbiAgICAgICAgICAgICdyaWdodCcsXG4gICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDEwMCUsIDAsIDApJywgbWluSGVpZ2h0OiAnMXB4JyB9KVxuICAgICAgICApLFxuXG4gICAgICAgIHRyYW5zaXRpb24oXG4gICAgICAgICAgICAnKiA9PiBsZWZ0LCAqID0+IHJpZ2h0LCBsZWZ0ID0+IGNlbnRlciwgcmlnaHQgPT4gY2VudGVyJyxcbiAgICAgICAgICAgIGFuaW1hdGUoJ3t7YW5pbWF0aW9uRHVyYXRpb259fSBjdWJpYy1iZXppZXIoMC4zNSwgMCwgMC4yNSwgMSknKVxuICAgICAgICApLFxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IGxlZnQtb3JpZ2luLWNlbnRlcicsIFtcbiAgICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoLTEwMCUsIDAsIDApJyB9KSxcbiAgICAgICAgICAgIGFuaW1hdGUoJ3t7YW5pbWF0aW9uRHVyYXRpb259fSBjdWJpYy1iZXppZXIoMC4zNSwgMCwgMC4yNSwgMSknKVxuICAgICAgICBdKSxcbiAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiByaWdodC1vcmlnaW4tY2VudGVyJywgW1xuICAgICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgxMDAlLCAwLCAwKScgfSksXG4gICAgICAgICAgICBhbmltYXRlKCd7e2FuaW1hdGlvbkR1cmF0aW9ufX0gY3ViaWMtYmV6aWVyKDAuMzUsIDAsIDAuMjUsIDEpJylcbiAgICAgICAgXSlcbiAgICBdKVxufTtcbiJdfQ==