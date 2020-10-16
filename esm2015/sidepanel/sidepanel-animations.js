/**
 * @fileoverview added by tsickle
 * Generated from: sidepanel-animations.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AnimationCurves } from '@ptsecurity/mosaic/core';
import { McSidepanelPosition } from './sidepanel-config';
/** @enum {string} */
const McSidepanelAnimationState = {
    Void: "void",
    Visible: "visible",
    Hidden: "hidden",
};
export { McSidepanelAnimationState };
// TODO Find a way to use dynamic keys and avoid error "Expression form not supported."
// tslint:disable-next-line
/** @type {?} */
export const mcSidepanelTransformAnimation = {
    right: { in: 'translateX(100%)', out: 'translateX(0%)' },
    left: { in: 'translateX(-100%)', out: 'translateX(0%)' },
    top: { in: 'translateY(-100%)', out: 'translateY(0%)' },
    bottom: { in: 'translateY(100%)', out: 'translateY(0%)' }
};
/** @type {?} */
export const mcSidepanelAnimations = {
    sidepanelState: trigger('state', [
        state('hidden', style({ transform: '{{transformIn}}' }), { params: { transformIn: mcSidepanelTransformAnimation[McSidepanelPosition.Right].in } }),
        state('visible', style({ transform: '{{transformOut}}' }), { params: { transformOut: mcSidepanelTransformAnimation[McSidepanelPosition.Right].out } }),
        transition('visible => void, visible => hidden', animate(`200ms ${AnimationCurves.AccelerationCurve}`)),
        transition('void => visible', animate(`200ms ${AnimationCurves.DecelerationCurve}`))
    ])
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLWFuaW1hdGlvbnMuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9zaWRlcGFuZWwvIiwic291cmNlcyI6WyJzaWRlcGFuZWwtYW5pbWF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQTRCLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNHLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7QUFHekQsTUFBWSx5QkFBeUI7SUFDakMsSUFBSSxRQUFTO0lBQ2IsT0FBTyxXQUFZO0lBQ25CLE1BQU0sVUFBVztFQUNwQjs7Ozs7QUFJRCxNQUFNLE9BQU8sNkJBQTZCLEdBQTZEO0lBQ25HLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxHQUFHLEVBQUUsZ0JBQWdCLEVBQUU7SUFDeEQsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLG1CQUFtQixFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRTtJQUN4RCxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixFQUFFO0lBQ3ZELE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxHQUFHLEVBQUUsZ0JBQWdCLEVBQUU7Q0FDNUQ7O0FBRUQsTUFBTSxPQUFPLHFCQUFxQixHQUU5QjtJQUNBLGNBQWMsRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFO1FBQzdCLEtBQUssQ0FBQyxRQUFRLEVBQ1YsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLENBQUMsRUFDdkMsRUFBRSxNQUFNLEVBQUUsRUFBRSxXQUFXLEVBQUUsNkJBQTZCLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUMsQ0FDMUY7UUFDRCxLQUFLLENBQUMsU0FBUyxFQUNYLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxDQUFDLEVBQ3hDLEVBQUUsTUFBTSxFQUFFLEVBQUUsWUFBWSxFQUFFLDZCQUE2QixDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFDLENBQzVGO1FBQ0QsVUFBVSxDQUFDLG9DQUFvQyxFQUMzQyxPQUFPLENBQUMsU0FBUyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBQzFELFVBQVUsQ0FBQyxpQkFBaUIsRUFDeEIsT0FBTyxDQUFDLFNBQVMsZUFBZSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztLQUM3RCxDQUFDO0NBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQW5pbWF0aW9uQ3VydmVzIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5pbXBvcnQgeyBNY1NpZGVwYW5lbFBvc2l0aW9uIH0gZnJvbSAnLi9zaWRlcGFuZWwtY29uZmlnJztcblxuXG5leHBvcnQgZW51bSBNY1NpZGVwYW5lbEFuaW1hdGlvblN0YXRlIHtcbiAgICBWb2lkID0gJ3ZvaWQnLFxuICAgIFZpc2libGUgPSAndmlzaWJsZScsXG4gICAgSGlkZGVuID0gJ2hpZGRlbidcbn1cblxuLy8gVE9ETyBGaW5kIGEgd2F5IHRvIHVzZSBkeW5hbWljIGtleXMgYW5kIGF2b2lkIGVycm9yIFwiRXhwcmVzc2lvbiBmb3JtIG5vdCBzdXBwb3J0ZWQuXCJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuZXhwb3J0IGNvbnN0IG1jU2lkZXBhbmVsVHJhbnNmb3JtQW5pbWF0aW9uOiBSZWNvcmQ8TWNTaWRlcGFuZWxQb3NpdGlvbiwgeyBpbjogc3RyaW5nOyBvdXQ6IHN0cmluZyB9PiA9IHtcbiAgICByaWdodDogeyBpbjogJ3RyYW5zbGF0ZVgoMTAwJSknLCBvdXQ6ICd0cmFuc2xhdGVYKDAlKScgfSxcbiAgICBsZWZ0OiB7IGluOiAndHJhbnNsYXRlWCgtMTAwJSknLCBvdXQ6ICd0cmFuc2xhdGVYKDAlKScgfSxcbiAgICB0b3A6IHsgaW46ICd0cmFuc2xhdGVZKC0xMDAlKScsIG91dDogJ3RyYW5zbGF0ZVkoMCUpJyB9LFxuICAgIGJvdHRvbTogeyBpbjogJ3RyYW5zbGF0ZVkoMTAwJSknLCBvdXQ6ICd0cmFuc2xhdGVZKDAlKScgfVxufTtcblxuZXhwb3J0IGNvbnN0IG1jU2lkZXBhbmVsQW5pbWF0aW9uczoge1xuICAgIHJlYWRvbmx5IHNpZGVwYW5lbFN0YXRlOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGE7XG59ID0ge1xuICAgIHNpZGVwYW5lbFN0YXRlOiB0cmlnZ2VyKCdzdGF0ZScsIFtcbiAgICAgICAgc3RhdGUoJ2hpZGRlbicsXG4gICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3t7dHJhbnNmb3JtSW59fScgfSksXG4gICAgICAgICAgICB7IHBhcmFtczogeyB0cmFuc2Zvcm1JbjogbWNTaWRlcGFuZWxUcmFuc2Zvcm1BbmltYXRpb25bTWNTaWRlcGFuZWxQb3NpdGlvbi5SaWdodF0uaW4gfX1cbiAgICAgICAgKSxcbiAgICAgICAgc3RhdGUoJ3Zpc2libGUnLFxuICAgICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd7e3RyYW5zZm9ybU91dH19JyB9KSxcbiAgICAgICAgICAgIHsgcGFyYW1zOiB7IHRyYW5zZm9ybU91dDogbWNTaWRlcGFuZWxUcmFuc2Zvcm1BbmltYXRpb25bTWNTaWRlcGFuZWxQb3NpdGlvbi5SaWdodF0ub3V0IH19XG4gICAgICAgICksXG4gICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPT4gdm9pZCwgdmlzaWJsZSA9PiBoaWRkZW4nLFxuICAgICAgICAgICAgYW5pbWF0ZShgMjAwbXMgJHtBbmltYXRpb25DdXJ2ZXMuQWNjZWxlcmF0aW9uQ3VydmV9YCkpLFxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGUnLFxuICAgICAgICAgICAgYW5pbWF0ZShgMjAwbXMgJHtBbmltYXRpb25DdXJ2ZXMuRGVjZWxlcmF0aW9uQ3VydmV9YCkpXG4gICAgXSlcbn07XG4iXX0=