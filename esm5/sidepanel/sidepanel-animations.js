/**
 * @fileoverview added by tsickle
 * Generated from: sidepanel-animations.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AnimationCurves } from '@ptsecurity/mosaic/core';
import { McSidepanelPosition } from './sidepanel-config';
/** @enum {string} */
var McSidepanelAnimationState = {
    Void: "void",
    Visible: "visible",
    Hidden: "hidden",
};
export { McSidepanelAnimationState };
// TODO Find a way to use dynamic keys and avoid error "Expression form not supported."
// tslint:disable-next-line
/** @type {?} */
export var mcSidepanelTransformAnimation = {
    right: { in: 'translateX(100%)', out: 'translateX(0%)' },
    left: { in: 'translateX(-100%)', out: 'translateX(0%)' },
    top: { in: 'translateY(-100%)', out: 'translateY(0%)' },
    bottom: { in: 'translateY(100%)', out: 'translateY(0%)' }
};
/** @type {?} */
export var mcSidepanelAnimations = {
    sidepanelState: trigger('state', [
        state('hidden', style({ transform: '{{transformIn}}' }), { params: { transformIn: mcSidepanelTransformAnimation[McSidepanelPosition.Right].in } }),
        state('visible', style({ transform: '{{transformOut}}' }), { params: { transformOut: mcSidepanelTransformAnimation[McSidepanelPosition.Right].out } }),
        transition('visible => void, visible => hidden', animate("200ms " + AnimationCurves.AccelerationCurve)),
        transition('void => visible', animate("200ms " + AnimationCurves.DecelerationCurve))
    ])
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLWFuaW1hdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvc2lkZXBhbmVsLyIsInNvdXJjZXMiOlsic2lkZXBhbmVsLWFuaW1hdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUE0QixLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFMUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBR3pELElBQVkseUJBQXlCO0lBQ2pDLElBQUksUUFBUztJQUNiLE9BQU8sV0FBWTtJQUNuQixNQUFNLFVBQVc7RUFDcEI7Ozs7O0FBSUQsTUFBTSxLQUFPLDZCQUE2QixHQUE2RDtJQUNuRyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixFQUFFO0lBQ3hELElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxHQUFHLEVBQUUsZ0JBQWdCLEVBQUU7SUFDeEQsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLG1CQUFtQixFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRTtJQUN2RCxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixFQUFFO0NBQzVEOztBQUVELE1BQU0sS0FBTyxxQkFBcUIsR0FFOUI7SUFDQSxjQUFjLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRTtRQUM3QixLQUFLLENBQUMsUUFBUSxFQUNWLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxDQUFDLEVBQ3ZDLEVBQUUsTUFBTSxFQUFFLEVBQUUsV0FBVyxFQUFFLDZCQUE2QixDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFDLENBQzFGO1FBQ0QsS0FBSyxDQUFDLFNBQVMsRUFDWCxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxFQUN4QyxFQUFFLE1BQU0sRUFBRSxFQUFFLFlBQVksRUFBRSw2QkFBNkIsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBQyxDQUM1RjtRQUNELFVBQVUsQ0FBQyxvQ0FBb0MsRUFDM0MsT0FBTyxDQUFDLFdBQVMsZUFBZSxDQUFDLGlCQUFtQixDQUFDLENBQUM7UUFDMUQsVUFBVSxDQUFDLGlCQUFpQixFQUN4QixPQUFPLENBQUMsV0FBUyxlQUFlLENBQUMsaUJBQW1CLENBQUMsQ0FBQztLQUM3RCxDQUFDO0NBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQW5pbWF0aW9uQ3VydmVzIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5pbXBvcnQgeyBNY1NpZGVwYW5lbFBvc2l0aW9uIH0gZnJvbSAnLi9zaWRlcGFuZWwtY29uZmlnJztcblxuXG5leHBvcnQgZW51bSBNY1NpZGVwYW5lbEFuaW1hdGlvblN0YXRlIHtcbiAgICBWb2lkID0gJ3ZvaWQnLFxuICAgIFZpc2libGUgPSAndmlzaWJsZScsXG4gICAgSGlkZGVuID0gJ2hpZGRlbidcbn1cblxuLy8gVE9ETyBGaW5kIGEgd2F5IHRvIHVzZSBkeW5hbWljIGtleXMgYW5kIGF2b2lkIGVycm9yIFwiRXhwcmVzc2lvbiBmb3JtIG5vdCBzdXBwb3J0ZWQuXCJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuZXhwb3J0IGNvbnN0IG1jU2lkZXBhbmVsVHJhbnNmb3JtQW5pbWF0aW9uOiBSZWNvcmQ8TWNTaWRlcGFuZWxQb3NpdGlvbiwgeyBpbjogc3RyaW5nOyBvdXQ6IHN0cmluZyB9PiA9IHtcbiAgICByaWdodDogeyBpbjogJ3RyYW5zbGF0ZVgoMTAwJSknLCBvdXQ6ICd0cmFuc2xhdGVYKDAlKScgfSxcbiAgICBsZWZ0OiB7IGluOiAndHJhbnNsYXRlWCgtMTAwJSknLCBvdXQ6ICd0cmFuc2xhdGVYKDAlKScgfSxcbiAgICB0b3A6IHsgaW46ICd0cmFuc2xhdGVZKC0xMDAlKScsIG91dDogJ3RyYW5zbGF0ZVkoMCUpJyB9LFxuICAgIGJvdHRvbTogeyBpbjogJ3RyYW5zbGF0ZVkoMTAwJSknLCBvdXQ6ICd0cmFuc2xhdGVZKDAlKScgfVxufTtcblxuZXhwb3J0IGNvbnN0IG1jU2lkZXBhbmVsQW5pbWF0aW9uczoge1xuICAgIHJlYWRvbmx5IHNpZGVwYW5lbFN0YXRlOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGE7XG59ID0ge1xuICAgIHNpZGVwYW5lbFN0YXRlOiB0cmlnZ2VyKCdzdGF0ZScsIFtcbiAgICAgICAgc3RhdGUoJ2hpZGRlbicsXG4gICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3t7dHJhbnNmb3JtSW59fScgfSksXG4gICAgICAgICAgICB7IHBhcmFtczogeyB0cmFuc2Zvcm1JbjogbWNTaWRlcGFuZWxUcmFuc2Zvcm1BbmltYXRpb25bTWNTaWRlcGFuZWxQb3NpdGlvbi5SaWdodF0uaW4gfX1cbiAgICAgICAgKSxcbiAgICAgICAgc3RhdGUoJ3Zpc2libGUnLFxuICAgICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd7e3RyYW5zZm9ybU91dH19JyB9KSxcbiAgICAgICAgICAgIHsgcGFyYW1zOiB7IHRyYW5zZm9ybU91dDogbWNTaWRlcGFuZWxUcmFuc2Zvcm1BbmltYXRpb25bTWNTaWRlcGFuZWxQb3NpdGlvbi5SaWdodF0ub3V0IH19XG4gICAgICAgICksXG4gICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPT4gdm9pZCwgdmlzaWJsZSA9PiBoaWRkZW4nLFxuICAgICAgICAgICAgYW5pbWF0ZShgMjAwbXMgJHtBbmltYXRpb25DdXJ2ZXMuQWNjZWxlcmF0aW9uQ3VydmV9YCkpLFxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGUnLFxuICAgICAgICAgICAgYW5pbWF0ZShgMjAwbXMgJHtBbmltYXRpb25DdXJ2ZXMuRGVjZWxlcmF0aW9uQ3VydmV9YCkpXG4gICAgXSlcbn07XG4iXX0=