import { animate, state, style, transition, trigger } from '@angular/animations';
import { AnimationCurves } from '@ptsecurity/mosaic/core';
import { McSidepanelPosition } from './sidepanel-config';
export var McSidepanelAnimationState;
(function (McSidepanelAnimationState) {
    McSidepanelAnimationState["Void"] = "void";
    McSidepanelAnimationState["Visible"] = "visible";
    McSidepanelAnimationState["Hidden"] = "hidden";
})(McSidepanelAnimationState || (McSidepanelAnimationState = {}));
// TODO Find a way to use dynamic keys and avoid error "Expression form not supported."
// tslint:disable-next-line
export const mcSidepanelTransformAnimation = {
    right: { in: 'translateX(100%)', out: 'translateX(0%)' },
    left: { in: 'translateX(-100%)', out: 'translateX(0%)' },
    top: { in: 'translateY(-100%)', out: 'translateY(0%)' },
    bottom: { in: 'translateY(100%)', out: 'translateY(0%)' }
};
export const mcSidepanelAnimations = {
    sidepanelState: trigger('state', [
        state('hidden', style({ transform: '{{transformIn}}' }), { params: { transformIn: mcSidepanelTransformAnimation[McSidepanelPosition.Right].in } }),
        state('visible', style({ transform: '{{transformOut}}' }), { params: { transformOut: mcSidepanelTransformAnimation[McSidepanelPosition.Right].out } }),
        transition('visible => void, visible => hidden', animate(`200ms ${AnimationCurves.AccelerationCurve}`)),
        transition('void => visible', animate(`200ms ${AnimationCurves.DecelerationCurve}`))
    ])
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLWFuaW1hdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvc2lkZXBhbmVsL3NpZGVwYW5lbC1hbmltYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQTRCLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNHLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUd6RCxNQUFNLENBQU4sSUFBWSx5QkFJWDtBQUpELFdBQVkseUJBQXlCO0lBQ2pDLDBDQUFhLENBQUE7SUFDYixnREFBbUIsQ0FBQTtJQUNuQiw4Q0FBaUIsQ0FBQTtBQUNyQixDQUFDLEVBSlcseUJBQXlCLEtBQXpCLHlCQUF5QixRQUlwQztBQUVELHVGQUF1RjtBQUN2RiwyQkFBMkI7QUFDM0IsTUFBTSxDQUFDLE1BQU0sNkJBQTZCLEdBQTZEO0lBQ25HLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxHQUFHLEVBQUUsZ0JBQWdCLEVBQUU7SUFDeEQsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLG1CQUFtQixFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRTtJQUN4RCxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixFQUFFO0lBQ3ZELE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxHQUFHLEVBQUUsZ0JBQWdCLEVBQUU7Q0FDNUQsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUEwRDtJQUN4RixjQUFjLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRTtRQUM3QixLQUFLLENBQ0QsUUFBUSxFQUNSLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxDQUFDLEVBQ3ZDLEVBQUUsTUFBTSxFQUFFLEVBQUUsV0FBVyxFQUFFLDZCQUE2QixDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFDLENBQzFGO1FBQ0QsS0FBSyxDQUNELFNBQVMsRUFDVCxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxFQUN4QyxFQUFFLE1BQU0sRUFBRSxFQUFFLFlBQVksRUFBRSw2QkFBNkIsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBQyxDQUM1RjtRQUNELFVBQVUsQ0FDTixvQ0FBb0MsRUFDcEMsT0FBTyxDQUFDLFNBQVMsZUFBZSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FDeEQ7UUFDRCxVQUFVLENBQ04saUJBQWlCLEVBQ2pCLE9BQU8sQ0FBQyxTQUFTLGVBQWUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQ3hEO0tBQ0osQ0FBQztDQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQW5pbWF0aW9uQ3VydmVzIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5pbXBvcnQgeyBNY1NpZGVwYW5lbFBvc2l0aW9uIH0gZnJvbSAnLi9zaWRlcGFuZWwtY29uZmlnJztcblxuXG5leHBvcnQgZW51bSBNY1NpZGVwYW5lbEFuaW1hdGlvblN0YXRlIHtcbiAgICBWb2lkID0gJ3ZvaWQnLFxuICAgIFZpc2libGUgPSAndmlzaWJsZScsXG4gICAgSGlkZGVuID0gJ2hpZGRlbidcbn1cblxuLy8gVE9ETyBGaW5kIGEgd2F5IHRvIHVzZSBkeW5hbWljIGtleXMgYW5kIGF2b2lkIGVycm9yIFwiRXhwcmVzc2lvbiBmb3JtIG5vdCBzdXBwb3J0ZWQuXCJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuZXhwb3J0IGNvbnN0IG1jU2lkZXBhbmVsVHJhbnNmb3JtQW5pbWF0aW9uOiBSZWNvcmQ8TWNTaWRlcGFuZWxQb3NpdGlvbiwgeyBpbjogc3RyaW5nOyBvdXQ6IHN0cmluZyB9PiA9IHtcbiAgICByaWdodDogeyBpbjogJ3RyYW5zbGF0ZVgoMTAwJSknLCBvdXQ6ICd0cmFuc2xhdGVYKDAlKScgfSxcbiAgICBsZWZ0OiB7IGluOiAndHJhbnNsYXRlWCgtMTAwJSknLCBvdXQ6ICd0cmFuc2xhdGVYKDAlKScgfSxcbiAgICB0b3A6IHsgaW46ICd0cmFuc2xhdGVZKC0xMDAlKScsIG91dDogJ3RyYW5zbGF0ZVkoMCUpJyB9LFxuICAgIGJvdHRvbTogeyBpbjogJ3RyYW5zbGF0ZVkoMTAwJSknLCBvdXQ6ICd0cmFuc2xhdGVZKDAlKScgfVxufTtcblxuZXhwb3J0IGNvbnN0IG1jU2lkZXBhbmVsQW5pbWF0aW9uczogeyByZWFkb25seSBzaWRlcGFuZWxTdGF0ZTogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhIH0gPSB7XG4gICAgc2lkZXBhbmVsU3RhdGU6IHRyaWdnZXIoJ3N0YXRlJywgW1xuICAgICAgICBzdGF0ZShcbiAgICAgICAgICAgICdoaWRkZW4nLFxuICAgICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd7e3RyYW5zZm9ybUlufX0nIH0pLFxuICAgICAgICAgICAgeyBwYXJhbXM6IHsgdHJhbnNmb3JtSW46IG1jU2lkZXBhbmVsVHJhbnNmb3JtQW5pbWF0aW9uW01jU2lkZXBhbmVsUG9zaXRpb24uUmlnaHRdLmluIH19XG4gICAgICAgICksXG4gICAgICAgIHN0YXRlKFxuICAgICAgICAgICAgJ3Zpc2libGUnLFxuICAgICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd7e3RyYW5zZm9ybU91dH19JyB9KSxcbiAgICAgICAgICAgIHsgcGFyYW1zOiB7IHRyYW5zZm9ybU91dDogbWNTaWRlcGFuZWxUcmFuc2Zvcm1BbmltYXRpb25bTWNTaWRlcGFuZWxQb3NpdGlvbi5SaWdodF0ub3V0IH19XG4gICAgICAgICksXG4gICAgICAgIHRyYW5zaXRpb24oXG4gICAgICAgICAgICAndmlzaWJsZSA9PiB2b2lkLCB2aXNpYmxlID0+IGhpZGRlbicsXG4gICAgICAgICAgICBhbmltYXRlKGAyMDBtcyAke0FuaW1hdGlvbkN1cnZlcy5BY2NlbGVyYXRpb25DdXJ2ZX1gKVxuICAgICAgICApLFxuICAgICAgICB0cmFuc2l0aW9uKFxuICAgICAgICAgICAgJ3ZvaWQgPT4gdmlzaWJsZScsXG4gICAgICAgICAgICBhbmltYXRlKGAyMDBtcyAke0FuaW1hdGlvbkN1cnZlcy5EZWNlbGVyYXRpb25DdXJ2ZX1gKVxuICAgICAgICApXG4gICAgXSlcbn07XG4iXX0=