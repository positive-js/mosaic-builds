/**
 * @fileoverview added by tsickle
 * Generated from: animation/fade-animations.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { animate, state, style, transition, trigger } from '@angular/animations';
/** @type {?} */
export var fadeAnimation = trigger('fadeAnimation', [
    state('void', style({ opacity: 0 })),
    state('true', style({ opacity: 1 })),
    state('false', style({ opacity: 0 })),
    transition('* => true', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
    transition('* => void', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)'))
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFkZS1hbmltYXRpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUvIiwic291cmNlcyI6WyJhbmltYXRpb24vZmFkZS1hbmltYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNILE9BQU8sRUFDUCxLQUFLLEVBQ0wsS0FBSyxFQUNMLFVBQVUsRUFDVixPQUFPLEVBRVYsTUFBTSxxQkFBcUIsQ0FBQzs7QUFHN0IsTUFBTSxLQUFPLGFBQWEsR0FBOEIsT0FBTyxDQUFDLGVBQWUsRUFBRTtJQUM3RSxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQyxVQUFVLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO0lBQ3hFLFVBQVUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7Q0FDekUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgYW5pbWF0ZSxcbiAgICBzdGF0ZSxcbiAgICBzdHlsZSxcbiAgICB0cmFuc2l0aW9uLFxuICAgIHRyaWdnZXIsXG4gICAgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5cbmV4cG9ydCBjb25zdCBmYWRlQW5pbWF0aW9uOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEgPSAgdHJpZ2dlcignZmFkZUFuaW1hdGlvbicsIFtcbiAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSksXG4gICAgc3RhdGUoJ3RydWUnLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpLFxuICAgIHN0YXRlKCdmYWxzZScsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSksXG4gICAgdHJhbnNpdGlvbignKiA9PiB0cnVlJywgYW5pbWF0ZSgnMTUwbXMgY3ViaWMtYmV6aWVyKDAuMCwgMC4wLCAwLjIsIDEpJykpLFxuICAgIHRyYW5zaXRpb24oJyogPT4gdm9pZCcsIGFuaW1hdGUoJzE1MG1zIGN1YmljLWJlemllcigwLjQsIDAuMCwgMSwgMSknKSlcbl0pO1xuIl19