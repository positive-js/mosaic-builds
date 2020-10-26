/**
 * @fileoverview added by tsickle
 * Generated from: select/animations.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { animate, state, style, transition, trigger, query, animateChild, group } from '@angular/animations';
/**
 * The following are all the animations for the mc-select component, with each
 * const containing the metadata for one animation.
 *
 * @type {?}
 */
export const mcSelectAnimations = {
    /**
     * This animation transforms the select's overlay panel on and off the page.
     *
     * When the panel is attached to the DOM, it expands its width by the amount of padding, scales it
     * up to 100% on the Y axis, fades in its border, and translates slightly up and to the
     * side to ensure the option text correctly overlaps the trigger text.
     *
     * When the panel is removed from the DOM, it simply fades out linearly.
     */
    transformPanel: trigger('transformPanel', [
        state('void', style({
            transform: 'scaleY(0)',
            minWidth: '100%',
            opacity: 0
        })),
        transition('void => *', group([
            query('@fadeInContent', animateChild()),
            animate('150ms cubic-bezier(0.25, 0.8, 0.25, 1)')
        ])),
        transition('* => void', [
            animate('250ms 100ms linear', style({ opacity: 0 }))
        ])
    ]),
    /**
     * This animation fades in the background color and text content of the
     * select's options. It is time delayed to occur 100ms after the overlay
     * panel has transformed in.
     */
    fadeInContent: trigger('fadeInContent', [
        state('showing', style({ opacity: 1 })),
        transition('void => showing', [
            style({ opacity: 0 }),
            animate('150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)')
        ])
    ])
};
/** @type {?} */
export const transformPanel = mcSelectAnimations.transformPanel;
/** @type {?} */
export const fadeInContent = mcSelectAnimations.fadeInContent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL2NvcmUvIiwic291cmNlcyI6WyJzZWxlY3QvYW5pbWF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDSCxPQUFPLEVBRVAsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUNQLEtBQUssRUFDTCxZQUFZLEVBQ1osS0FBSyxFQUNSLE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7QUFRN0IsTUFBTSxPQUFPLGtCQUFrQixHQUczQjs7Ozs7Ozs7OztJQVVBLGNBQWMsRUFBRSxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7UUFDdEMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7WUFDaEIsU0FBUyxFQUFFLFdBQVc7WUFDdEIsUUFBUSxFQUFFLE1BQU07WUFDaEIsT0FBTyxFQUFFLENBQUM7U0FDYixDQUFDLENBQUM7UUFDSCxVQUFVLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQztZQUMxQixLQUFLLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLENBQUM7WUFDdkMsT0FBTyxDQUFDLHdDQUF3QyxDQUFDO1NBQ3BELENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDcEIsT0FBTyxDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZELENBQUM7S0FDTCxDQUFDOzs7Ozs7SUFPRixhQUFhLEVBQUUsT0FBTyxDQUFDLGVBQWUsRUFBRTtRQUNwQyxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQixLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDckIsT0FBTyxDQUFDLDhDQUE4QyxDQUFDO1NBQzFELENBQUM7S0FDTCxDQUFDO0NBQ0w7O0FBR0QsTUFBTSxPQUFPLGNBQWMsR0FBRyxrQkFBa0IsQ0FBQyxjQUFjOztBQUUvRCxNQUFNLE9BQU8sYUFBYSxHQUFHLGtCQUFrQixDQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIGFuaW1hdGUsXG4gICAgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhLFxuICAgIHN0YXRlLFxuICAgIHN0eWxlLFxuICAgIHRyYW5zaXRpb24sXG4gICAgdHJpZ2dlcixcbiAgICBxdWVyeSxcbiAgICBhbmltYXRlQ2hpbGQsXG4gICAgZ3JvdXBcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cblxuLyoqXG4gKiBUaGUgZm9sbG93aW5nIGFyZSBhbGwgdGhlIGFuaW1hdGlvbnMgZm9yIHRoZSBtYy1zZWxlY3QgY29tcG9uZW50LCB3aXRoIGVhY2hcbiAqIGNvbnN0IGNvbnRhaW5pbmcgdGhlIG1ldGFkYXRhIGZvciBvbmUgYW5pbWF0aW9uLlxuICpcbiAqL1xuZXhwb3J0IGNvbnN0IG1jU2VsZWN0QW5pbWF0aW9uczoge1xuICAgIHJlYWRvbmx5IHRyYW5zZm9ybVBhbmVsOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGE7XG4gICAgcmVhZG9ubHkgZmFkZUluQ29udGVudDogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhO1xufSA9IHtcbiAgICAvKipcbiAgICAgKiBUaGlzIGFuaW1hdGlvbiB0cmFuc2Zvcm1zIHRoZSBzZWxlY3QncyBvdmVybGF5IHBhbmVsIG9uIGFuZCBvZmYgdGhlIHBhZ2UuXG4gICAgICpcbiAgICAgKiBXaGVuIHRoZSBwYW5lbCBpcyBhdHRhY2hlZCB0byB0aGUgRE9NLCBpdCBleHBhbmRzIGl0cyB3aWR0aCBieSB0aGUgYW1vdW50IG9mIHBhZGRpbmcsIHNjYWxlcyBpdFxuICAgICAqIHVwIHRvIDEwMCUgb24gdGhlIFkgYXhpcywgZmFkZXMgaW4gaXRzIGJvcmRlciwgYW5kIHRyYW5zbGF0ZXMgc2xpZ2h0bHkgdXAgYW5kIHRvIHRoZVxuICAgICAqIHNpZGUgdG8gZW5zdXJlIHRoZSBvcHRpb24gdGV4dCBjb3JyZWN0bHkgb3ZlcmxhcHMgdGhlIHRyaWdnZXIgdGV4dC5cbiAgICAgKlxuICAgICAqIFdoZW4gdGhlIHBhbmVsIGlzIHJlbW92ZWQgZnJvbSB0aGUgRE9NLCBpdCBzaW1wbHkgZmFkZXMgb3V0IGxpbmVhcmx5LlxuICAgICAqL1xuICAgIHRyYW5zZm9ybVBhbmVsOiB0cmlnZ2VyKCd0cmFuc2Zvcm1QYW5lbCcsIFtcbiAgICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7XG4gICAgICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZVkoMCknLFxuICAgICAgICAgICAgbWluV2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgfSkpLFxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBncm91cChbXG4gICAgICAgICAgICBxdWVyeSgnQGZhZGVJbkNvbnRlbnQnLCBhbmltYXRlQ2hpbGQoKSksXG4gICAgICAgICAgICBhbmltYXRlKCcxNTBtcyBjdWJpYy1iZXppZXIoMC4yNSwgMC44LCAwLjI1LCAxKScpXG4gICAgICAgIF0pKSxcbiAgICAgICAgdHJhbnNpdGlvbignKiA9PiB2b2lkJywgW1xuICAgICAgICAgICAgYW5pbWF0ZSgnMjUwbXMgMTAwbXMgbGluZWFyJywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxuICAgICAgICBdKVxuICAgIF0pLFxuXG4gICAgLyoqXG4gICAgICogVGhpcyBhbmltYXRpb24gZmFkZXMgaW4gdGhlIGJhY2tncm91bmQgY29sb3IgYW5kIHRleHQgY29udGVudCBvZiB0aGVcbiAgICAgKiBzZWxlY3QncyBvcHRpb25zLiBJdCBpcyB0aW1lIGRlbGF5ZWQgdG8gb2NjdXIgMTAwbXMgYWZ0ZXIgdGhlIG92ZXJsYXlcbiAgICAgKiBwYW5lbCBoYXMgdHJhbnNmb3JtZWQgaW4uXG4gICAgICovXG4gICAgZmFkZUluQ29udGVudDogdHJpZ2dlcignZmFkZUluQ29udGVudCcsIFtcbiAgICAgICAgc3RhdGUoJ3Nob3dpbmcnLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpLFxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHNob3dpbmcnLCBbXG4gICAgICAgICAgICBzdHlsZSh7IG9wYWNpdHk6IDAgfSksXG4gICAgICAgICAgICBhbmltYXRlKCcxNTBtcyAxMDBtcyBjdWJpYy1iZXppZXIoMC41NSwgMCwgMC41NSwgMC4yKScpXG4gICAgICAgIF0pXG4gICAgXSlcbn07XG5cblxuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybVBhbmVsID0gbWNTZWxlY3RBbmltYXRpb25zLnRyYW5zZm9ybVBhbmVsO1xuXG5leHBvcnQgY29uc3QgZmFkZUluQ29udGVudCA9IG1jU2VsZWN0QW5pbWF0aW9ucy5mYWRlSW5Db250ZW50O1xuIl19