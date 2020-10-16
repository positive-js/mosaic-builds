/**
 * @fileoverview added by tsickle
 * Generated from: sidebar-animations.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { animate, state, style, transition, trigger } from '@angular/animations';
/** @enum {string} */
const McSidebarAnimationState = {
    Opened: "opened",
    Closed: "closed",
};
export { McSidebarAnimationState };
/** @type {?} */
export const mcSidebarAnimations = {
    sidebarState: trigger('state', [
        state('opened', style({
            minWidth: '{{ openedStateMinWidth }}',
            width: '{{ openedStateWidth }}',
            maxWidth: '{{ openedStateMaxWidth }}'
        }), { params: { openedStateMinWidth: '', openedStateWidth: '', openedStateMaxWidth: '' } }),
        state('closed', style({
            minWidth: '{{ closedStateWidth }}',
            width: '{{ closedStateWidth }}',
            maxWidth: '{{ closedStateWidth }}'
        }), { params: { closedStateWidth: '' } }),
        transition('opened => closed', [animate('0.1s')]),
        transition('closed => opened', [animate('0.2s')])
    ])
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci1hbmltYXRpb25zLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvc2lkZWJhci8iLCJzb3VyY2VzIjpbInNpZGViYXItYW5pbWF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQTRCLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDOztBQUczRyxNQUFZLHVCQUF1QjtJQUMvQixNQUFNLFVBQVc7SUFDakIsTUFBTSxVQUFXO0VBQ3BCOzs7QUFFRCxNQUFNLE9BQU8sbUJBQW1CLEdBRTVCO0lBQ0EsWUFBWSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUU7UUFDM0IsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUM7WUFDZCxRQUFRLEVBQUUsMkJBQTJCO1lBQ3JDLEtBQUssRUFBRSx3QkFBd0I7WUFDL0IsUUFBUSxFQUFFLDJCQUEyQjtTQUN4QyxDQUFDLEVBQ0YsRUFBRSxNQUFNLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLG1CQUFtQixFQUFFLEVBQUUsRUFBRSxFQUFDLENBQ3hGO1FBQ0QsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUM7WUFDZCxRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLEtBQUssRUFBRSx3QkFBd0I7WUFDL0IsUUFBUSxFQUFFLHdCQUF3QjtTQUNyQyxDQUFDLEVBQ0YsRUFBRSxNQUFNLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsRUFBQyxDQUN0QztRQUNELFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2pELFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ3BELENBQUM7Q0FDTCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFuaW1hdGUsIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cblxuZXhwb3J0IGVudW0gTWNTaWRlYmFyQW5pbWF0aW9uU3RhdGUge1xuICAgIE9wZW5lZCA9ICdvcGVuZWQnLFxuICAgIENsb3NlZCA9ICdjbG9zZWQnXG59XG5cbmV4cG9ydCBjb25zdCBtY1NpZGViYXJBbmltYXRpb25zOiB7XG4gICAgcmVhZG9ubHkgc2lkZWJhclN0YXRlOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGE7XG59ID0ge1xuICAgIHNpZGViYXJTdGF0ZTogdHJpZ2dlcignc3RhdGUnLCBbXG4gICAgICAgIHN0YXRlKCdvcGVuZWQnLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgbWluV2lkdGg6ICd7eyBvcGVuZWRTdGF0ZU1pbldpZHRoIH19JyxcbiAgICAgICAgICAgICAgICB3aWR0aDogJ3t7IG9wZW5lZFN0YXRlV2lkdGggfX0nLFxuICAgICAgICAgICAgICAgIG1heFdpZHRoOiAne3sgb3BlbmVkU3RhdGVNYXhXaWR0aCB9fSdcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgeyBwYXJhbXM6IHsgb3BlbmVkU3RhdGVNaW5XaWR0aDogJycsIG9wZW5lZFN0YXRlV2lkdGg6ICcnLCBvcGVuZWRTdGF0ZU1heFdpZHRoOiAnJyB9fVxuICAgICAgICApLFxuICAgICAgICBzdGF0ZSgnY2xvc2VkJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIG1pbldpZHRoOiAne3sgY2xvc2VkU3RhdGVXaWR0aCB9fScsXG4gICAgICAgICAgICAgICAgd2lkdGg6ICd7eyBjbG9zZWRTdGF0ZVdpZHRoIH19JyxcbiAgICAgICAgICAgICAgICBtYXhXaWR0aDogJ3t7IGNsb3NlZFN0YXRlV2lkdGggfX0nXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHsgcGFyYW1zOiB7IGNsb3NlZFN0YXRlV2lkdGg6ICcnIH19XG4gICAgICAgICksXG4gICAgICAgIHRyYW5zaXRpb24oJ29wZW5lZCA9PiBjbG9zZWQnLCBbYW5pbWF0ZSgnMC4xcycpXSksXG4gICAgICAgIHRyYW5zaXRpb24oJ2Nsb3NlZCA9PiBvcGVuZWQnLCBbYW5pbWF0ZSgnMC4ycycpXSlcbiAgICBdKVxufTtcbiJdfQ==