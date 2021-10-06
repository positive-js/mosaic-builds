import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
/**
 * Animations used by McTooltip.
 * @docs-private
 */
export const mcTooltipAnimations = {
    /** Animation that transitions a tooltip in and out. */
    tooltipState: trigger('state', [
        state('initial, void, hidden', style({ opacity: 0, transform: 'scale(0)' })),
        state('visible', style({ transform: 'scale(1)' })),
        transition('* => visible', animate('200ms cubic-bezier(0, 0, 0.2, 1)', keyframes([
            style({ opacity: 0, transform: 'scale(0)', offset: 0 }),
            style({ opacity: 0.5, transform: 'scale(0.99)', offset: 0.5 }),
            style({ opacity: 1, transform: 'scale(1)', offset: 1 })
        ]))),
        transition('* => hidden', animate('100ms cubic-bezier(0, 0, 0.2, 1)', style({ opacity: 0 })))
    ])
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5hbmltYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3Rvb2x0aXAvdG9vbHRpcC5hbmltYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxPQUFPLEVBRVAsU0FBUyxFQUNULEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sRUFDVixNQUFNLHFCQUFxQixDQUFDO0FBRzdCOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUU1QjtJQUNBLHVEQUF1RDtJQUN2RCxZQUFZLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRTtRQUMzQixLQUFLLENBQUMsdUJBQXVCLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUM1RSxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLGtDQUFrQyxFQUFFLFNBQVMsQ0FBQztZQUM3RSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ3ZELEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDOUQsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztTQUMxRCxDQUFDLENBQUMsQ0FBQztRQUNKLFVBQVUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLGtDQUFrQyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDaEcsQ0FBQztDQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIGFuaW1hdGUsXG4gICAgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhLFxuICAgIGtleWZyYW1lcyxcbiAgICBzdGF0ZSxcbiAgICBzdHlsZSxcbiAgICB0cmFuc2l0aW9uLFxuICAgIHRyaWdnZXJcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cblxuLyoqXG4gKiBBbmltYXRpb25zIHVzZWQgYnkgTWNUb29sdGlwLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgbWNUb29sdGlwQW5pbWF0aW9uczoge1xuICAgIHJlYWRvbmx5IHRvb2x0aXBTdGF0ZTogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhO1xufSA9IHtcbiAgICAvKiogQW5pbWF0aW9uIHRoYXQgdHJhbnNpdGlvbnMgYSB0b29sdGlwIGluIGFuZCBvdXQuICovXG4gICAgdG9vbHRpcFN0YXRlOiB0cmlnZ2VyKCdzdGF0ZScsIFtcbiAgICAgICAgc3RhdGUoJ2luaXRpYWwsIHZvaWQsIGhpZGRlbicsIHN0eWxlKHsgb3BhY2l0eTogMCwgdHJhbnNmb3JtOiAnc2NhbGUoMCknIH0pKSxcbiAgICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlKDEpJyB9KSksXG4gICAgICAgIHRyYW5zaXRpb24oJyogPT4gdmlzaWJsZScsIGFuaW1hdGUoJzIwMG1zIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpJywga2V5ZnJhbWVzKFtcbiAgICAgICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMCwgdHJhbnNmb3JtOiAnc2NhbGUoMCknLCBvZmZzZXQ6IDAgfSksXG4gICAgICAgICAgICBzdHlsZSh7IG9wYWNpdHk6IDAuNSwgdHJhbnNmb3JtOiAnc2NhbGUoMC45OSknLCBvZmZzZXQ6IDAuNSB9KSxcbiAgICAgICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMSwgdHJhbnNmb3JtOiAnc2NhbGUoMSknLCBvZmZzZXQ6IDEgfSlcbiAgICAgICAgXSkpKSxcbiAgICAgICAgdHJhbnNpdGlvbignKiA9PiBoaWRkZW4nLCBhbmltYXRlKCcxMDBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKScsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSkpXG4gICAgXSlcbn07XG4iXX0=