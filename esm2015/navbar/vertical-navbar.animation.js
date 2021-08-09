import { animate, style, transition, trigger, state } from '@angular/animations';
export function toggleVerticalNavbarAnimation() {
    return trigger('toggle', [
        state('0', style({ width: '48px' })),
        state('1', style({ width: '240px' })),
        transition('0 <=> 1', animate('200ms cubic-bezier(0, 1, 0.5, 1)'))
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2YmFyLmFuaW1hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9uYXZiYXIvdmVydGljYWwtbmF2YmFyLmFuaW1hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUE0QixLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUczRyxNQUFNLFVBQVUsNkJBQTZCO0lBQ3pDLE9BQU8sT0FBTyxDQUFDLFFBQVEsRUFBRTtRQUNyQixLQUFLLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLEtBQUssQ0FBQyxHQUFHLEVBQUcsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDdEMsVUFBVSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztLQUNyRSxDQUFDLENBQUM7QUFDUCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0ZSwgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciwgc3RhdGUgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlVmVydGljYWxOYXZiYXJBbmltYXRpb24oKTogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhIHtcbiAgICByZXR1cm4gdHJpZ2dlcigndG9nZ2xlJywgW1xuICAgICAgICBzdGF0ZSgnMCcsIHN0eWxlKHsgd2lkdGg6ICc0OHB4JyB9KSksXG4gICAgICAgIHN0YXRlKCcxJywgIHN0eWxlKHsgd2lkdGg6ICcyNDBweCcgfSkpLFxuICAgICAgICB0cmFuc2l0aW9uKCcwIDw9PiAxJywgYW5pbWF0ZSgnMjAwbXMgY3ViaWMtYmV6aWVyKDAsIDEsIDAuNSwgMSknKSlcbiAgICBdKTtcbn1cbiJdfQ==