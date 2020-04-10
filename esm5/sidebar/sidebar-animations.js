/**
 * @fileoverview added by tsickle
 * Generated from: sidebar-animations.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { animate, state, style, transition, trigger } from '@angular/animations';
/** @enum {string} */
var McSidebarAnimationState = {
    Opened: "opened",
    Closed: "closed",
};
export { McSidebarAnimationState };
/** @type {?} */
export var mcSidebarAnimations = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci1hbmltYXRpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3NpZGViYXIvIiwic291cmNlcyI6WyJzaWRlYmFyLWFuaW1hdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUE0QixLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFHM0csSUFBWSx1QkFBdUI7SUFDL0IsTUFBTSxVQUFXO0lBQ2pCLE1BQU0sVUFBVztFQUNwQjs7O0FBRUQsTUFBTSxLQUFPLG1CQUFtQixHQUU1QjtJQUNBLFlBQVksRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFO1FBQzNCLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDO1lBQ2QsUUFBUSxFQUFFLDJCQUEyQjtZQUNyQyxLQUFLLEVBQUUsd0JBQXdCO1lBQy9CLFFBQVEsRUFBRSwyQkFBMkI7U0FDeEMsQ0FBQyxFQUNGLEVBQUUsTUFBTSxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxFQUFFLEVBQUUsRUFBQyxDQUN4RjtRQUNELEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDO1lBQ2QsUUFBUSxFQUFFLHdCQUF3QjtZQUNsQyxLQUFLLEVBQUUsd0JBQXdCO1lBQy9CLFFBQVEsRUFBRSx3QkFBd0I7U0FDckMsQ0FBQyxFQUNGLEVBQUUsTUFBTSxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLEVBQUMsQ0FDdEM7UUFDRCxVQUFVLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNqRCxVQUFVLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUNwRCxDQUFDO0NBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5cbmV4cG9ydCBlbnVtIE1jU2lkZWJhckFuaW1hdGlvblN0YXRlIHtcbiAgICBPcGVuZWQgPSAnb3BlbmVkJyxcbiAgICBDbG9zZWQgPSAnY2xvc2VkJ1xufVxuXG5leHBvcnQgY29uc3QgbWNTaWRlYmFyQW5pbWF0aW9uczoge1xuICAgIHJlYWRvbmx5IHNpZGViYXJTdGF0ZTogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhO1xufSA9IHtcbiAgICBzaWRlYmFyU3RhdGU6IHRyaWdnZXIoJ3N0YXRlJywgW1xuICAgICAgICBzdGF0ZSgnb3BlbmVkJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIG1pbldpZHRoOiAne3sgb3BlbmVkU3RhdGVNaW5XaWR0aCB9fScsXG4gICAgICAgICAgICAgICAgd2lkdGg6ICd7eyBvcGVuZWRTdGF0ZVdpZHRoIH19JyxcbiAgICAgICAgICAgICAgICBtYXhXaWR0aDogJ3t7IG9wZW5lZFN0YXRlTWF4V2lkdGggfX0nXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHsgcGFyYW1zOiB7IG9wZW5lZFN0YXRlTWluV2lkdGg6ICcnLCBvcGVuZWRTdGF0ZVdpZHRoOiAnJywgb3BlbmVkU3RhdGVNYXhXaWR0aDogJycgfX1cbiAgICAgICAgKSxcbiAgICAgICAgc3RhdGUoJ2Nsb3NlZCcsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICBtaW5XaWR0aDogJ3t7IGNsb3NlZFN0YXRlV2lkdGggfX0nLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAne3sgY2xvc2VkU3RhdGVXaWR0aCB9fScsXG4gICAgICAgICAgICAgICAgbWF4V2lkdGg6ICd7eyBjbG9zZWRTdGF0ZVdpZHRoIH19J1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB7IHBhcmFtczogeyBjbG9zZWRTdGF0ZVdpZHRoOiAnJyB9fVxuICAgICAgICApLFxuICAgICAgICB0cmFuc2l0aW9uKCdvcGVuZWQgPT4gY2xvc2VkJywgW2FuaW1hdGUoJzAuMXMnKV0pLFxuICAgICAgICB0cmFuc2l0aW9uKCdjbG9zZWQgPT4gb3BlbmVkJywgW2FuaW1hdGUoJzAuMnMnKV0pXG4gICAgXSlcbn07XG4iXX0=