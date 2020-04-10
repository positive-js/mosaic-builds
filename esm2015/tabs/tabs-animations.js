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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy1hbmltYXRpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RhYnMvIiwic291cmNlcyI6WyJ0YWJzLWFuaW1hdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0gsT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sRUFFVixNQUFNLHFCQUFxQixDQUFDOztBQUc3QixNQUFNLE9BQU8sZ0JBQWdCLEdBRXpCOzs7O0lBRUEsWUFBWSxFQUFFLE9BQU8sQ0FBQyxjQUFjLEVBQUU7UUFDbEMsMEZBQTBGO1FBQzFGLEtBQUssQ0FDRCx1REFBdUQsRUFDdkQsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQy9CO1FBRUQsdUZBQXVGO1FBQ3ZGLHFGQUFxRjtRQUNyRiw0RkFBNEY7UUFDNUYseUVBQXlFO1FBQ3pFLEtBQUssQ0FDRCxNQUFNLEVBQ04sS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLDBCQUEwQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUNyRTtRQUNELEtBQUssQ0FDRCxPQUFPLEVBQ1AsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLHlCQUF5QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUNwRTtRQUVELFVBQVUsQ0FDTix3REFBd0QsRUFDeEQsT0FBTyxDQUFDLHNEQUFzRCxDQUFDLENBQ2xFO1FBQ0QsVUFBVSxDQUFDLDRCQUE0QixFQUFFO1lBQ3JDLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSwwQkFBMEIsRUFBRSxDQUFDO1lBQ2hELE9BQU8sQ0FBQyxzREFBc0QsQ0FBQztTQUNsRSxDQUFDO1FBQ0YsVUFBVSxDQUFDLDZCQUE2QixFQUFFO1lBQ3RDLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSx5QkFBeUIsRUFBRSxDQUFDO1lBQy9DLE9BQU8sQ0FBQyxzREFBc0QsQ0FBQztTQUNsRSxDQUFDO0tBQ0wsQ0FBQztDQUNMIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBhbmltYXRlLFxuICAgIHN0YXRlLFxuICAgIHN0eWxlLFxuICAgIHRyYW5zaXRpb24sXG4gICAgdHJpZ2dlcixcbiAgICBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGFcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cblxuZXhwb3J0IGNvbnN0IG1jVGFic0FuaW1hdGlvbnM6IHtcbiAgICByZWFkb25seSB0cmFuc2xhdGVUYWI6IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YTtcbn0gPSB7XG4gICAgLyoqIEFuaW1hdGlvbiB0cmFuc2xhdGVzIGEgdGFiIGFsb25nIHRoZSBYIGF4aXMuICovXG4gICAgdHJhbnNsYXRlVGFiOiB0cmlnZ2VyKCd0cmFuc2xhdGVUYWInLCBbXG4gICAgICAgIC8vIE5vdGU6IHRyYW5zaXRpb25zIHRvIGBub25lYCBpbnN0ZWFkIG9mIDAsIGJlY2F1c2Ugc29tZSBicm93c2VycyBtaWdodCBibHVyIHRoZSBjb250ZW50LlxuICAgICAgICBzdGF0ZShcbiAgICAgICAgICAgICdjZW50ZXIsIHZvaWQsIGxlZnQtb3JpZ2luLWNlbnRlciwgcmlnaHQtb3JpZ2luLWNlbnRlcicsXG4gICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ25vbmUnIH0pXG4gICAgICAgICksXG5cbiAgICAgICAgLy8gSWYgdGhlIHRhYiBpcyBlaXRoZXIgb24gdGhlIGxlZnQgb3IgcmlnaHQsIHdlIGFkZGl0aW9uYWxseSBhZGQgYSBgbWluLWhlaWdodGAgb2YgMXB4XG4gICAgICAgIC8vIGluIG9yZGVyIHRvIGVuc3VyZSB0aGF0IHRoZSBlbGVtZW50IGhhcyBhIGhlaWdodCBiZWZvcmUgaXRzIHN0YXRlIGNoYW5nZXMuIFRoaXMgaXNcbiAgICAgICAgLy8gbmVjZXNzYXJ5IGJlY2F1c2UgQ2hyb21lIGRvZXMgc2VlbSB0byBza2lwIHRoZSB0cmFuc2l0aW9uIGluIFJUTCBtb2RlIGlmIHRoZSBlbGVtZW50IGRvZXNcbiAgICAgICAgLy8gbm90IGhhdmUgYSBzdGF0aWMgaGVpZ2h0IGFuZCBpcyBub3QgcmVuZGVyZWQuIFNlZSByZWxhdGVkIGlzc3VlOiAjOTQ2NVxuICAgICAgICBzdGF0ZShcbiAgICAgICAgICAgICdsZWZ0JyxcbiAgICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoLTEwMCUsIDAsIDApJywgbWluSGVpZ2h0OiAnMXB4JyB9KVxuICAgICAgICApLFxuICAgICAgICBzdGF0ZShcbiAgICAgICAgICAgICdyaWdodCcsXG4gICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDEwMCUsIDAsIDApJywgbWluSGVpZ2h0OiAnMXB4JyB9KVxuICAgICAgICApLFxuXG4gICAgICAgIHRyYW5zaXRpb24oXG4gICAgICAgICAgICAnKiA9PiBsZWZ0LCAqID0+IHJpZ2h0LCBsZWZ0ID0+IGNlbnRlciwgcmlnaHQgPT4gY2VudGVyJyxcbiAgICAgICAgICAgIGFuaW1hdGUoJ3t7YW5pbWF0aW9uRHVyYXRpb259fSBjdWJpYy1iZXppZXIoMC4zNSwgMCwgMC4yNSwgMSknKVxuICAgICAgICApLFxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IGxlZnQtb3JpZ2luLWNlbnRlcicsIFtcbiAgICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoLTEwMCUsIDAsIDApJyB9KSxcbiAgICAgICAgICAgIGFuaW1hdGUoJ3t7YW5pbWF0aW9uRHVyYXRpb259fSBjdWJpYy1iZXppZXIoMC4zNSwgMCwgMC4yNSwgMSknKVxuICAgICAgICBdKSxcbiAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiByaWdodC1vcmlnaW4tY2VudGVyJywgW1xuICAgICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgxMDAlLCAwLCAwKScgfSksXG4gICAgICAgICAgICBhbmltYXRlKCd7e2FuaW1hdGlvbkR1cmF0aW9ufX0gY3ViaWMtYmV6aWVyKDAuMzUsIDAsIDAuMjUsIDEpJylcbiAgICAgICAgXSlcbiAgICBdKVxufTtcbiJdfQ==