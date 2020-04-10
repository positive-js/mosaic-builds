/**
 * @fileoverview added by tsickle
 * Generated from: vertical-navbar.animation.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { animate, style, transition, trigger, state } from '@angular/animations';
/**
 * @return {?}
 */
export function toggleVerticalNavbarAnimation() {
    return trigger('toggle', [
        state('0', style({
            width: '64px'
        })),
        state('1', style({
            width: '*'
        })),
        transition('0 <=> 1', animate('200ms cubic-bezier(0, 1, 0.5, 1)'))
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2YmFyLmFuaW1hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy92ZXJ0aWNhbC1uYXZiYXIvIiwic291cmNlcyI6WyJ2ZXJ0aWNhbC1uYXZiYXIuYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBNEIsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFHM0csTUFBTSxVQUFVLDZCQUE2QjtJQUN6QyxPQUFPLE9BQU8sQ0FBQyxRQUFRLEVBQUU7UUFDckIsS0FBSyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUM7WUFDYixLQUFLLEVBQUUsTUFBTTtTQUNoQixDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsR0FBRyxFQUFHLEtBQUssQ0FBQztZQUNkLEtBQUssRUFBRSxHQUFHO1NBQ2IsQ0FBQyxDQUFDO1FBQ0gsVUFBVSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztLQUNyRSxDQUFDLENBQUM7QUFDUCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0ZSwgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciwgc3RhdGUgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlVmVydGljYWxOYXZiYXJBbmltYXRpb24oKTogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhIHtcbiAgICByZXR1cm4gdHJpZ2dlcigndG9nZ2xlJywgW1xuICAgICAgICBzdGF0ZSgnMCcsIHN0eWxlKHtcbiAgICAgICAgICAgIHdpZHRoOiAnNjRweCdcbiAgICAgICAgfSkpLFxuICAgICAgICBzdGF0ZSgnMScsICBzdHlsZSh7XG4gICAgICAgICAgICB3aWR0aDogJyonXG4gICAgICAgIH0pKSxcbiAgICAgICAgdHJhbnNpdGlvbignMCA8PT4gMScsIGFuaW1hdGUoJzIwMG1zIGN1YmljLWJlemllcigwLCAxLCAwLjUsIDEpJykpXG4gICAgXSk7XG59XG4iXX0=