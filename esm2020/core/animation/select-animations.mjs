import { animate, state, style, transition, trigger, group } from '@angular/animations';
/**
 * The following are all the animations for the mc-select component, with each
 * const containing the metadata for one animation.
 *
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
export const transformPanel = mcSelectAnimations.transformPanel;
export const fadeInContent = mcSelectAnimations.fadeInContent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWFuaW1hdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvY29yZS9hbmltYXRpb24vc2VsZWN0LWFuaW1hdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILE9BQU8sRUFFUCxLQUFLLEVBQ0wsS0FBSyxFQUNMLFVBQVUsRUFDVixPQUFPLEVBQ1AsS0FBSyxFQUNSLE1BQU0scUJBQXFCLENBQUM7QUFHN0I7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUczQjtJQUNBOzs7Ozs7OztPQVFHO0lBQ0gsY0FBYyxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTtRQUN0QyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztZQUNoQixTQUFTLEVBQUUsV0FBVztZQUN0QixRQUFRLEVBQUUsTUFBTTtZQUNoQixPQUFPLEVBQUUsQ0FBQztTQUNiLENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyx3Q0FBd0MsQ0FBQztTQUNwRCxDQUFDLENBQUM7UUFDSCxVQUFVLENBQUMsV0FBVyxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN2RCxDQUFDO0tBQ0wsQ0FBQztJQUVGOzs7O09BSUc7SUFDSCxhQUFhLEVBQUUsT0FBTyxDQUFDLGVBQWUsRUFBRTtRQUNwQyxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQixLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDckIsT0FBTyxDQUFDLDhDQUE4QyxDQUFDO1NBQzFELENBQUM7S0FDTCxDQUFDO0NBQ0wsQ0FBQztBQUdGLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxrQkFBa0IsQ0FBQyxjQUFjLENBQUM7QUFFaEUsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgYW5pbWF0ZSxcbiAgICBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEsXG4gICAgc3RhdGUsXG4gICAgc3R5bGUsXG4gICAgdHJhbnNpdGlvbixcbiAgICB0cmlnZ2VyLFxuICAgIGdyb3VwXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5cbi8qKlxuICogVGhlIGZvbGxvd2luZyBhcmUgYWxsIHRoZSBhbmltYXRpb25zIGZvciB0aGUgbWMtc2VsZWN0IGNvbXBvbmVudCwgd2l0aCBlYWNoXG4gKiBjb25zdCBjb250YWluaW5nIHRoZSBtZXRhZGF0YSBmb3Igb25lIGFuaW1hdGlvbi5cbiAqXG4gKi9cbmV4cG9ydCBjb25zdCBtY1NlbGVjdEFuaW1hdGlvbnM6IHtcbiAgICByZWFkb25seSB0cmFuc2Zvcm1QYW5lbDogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhO1xuICAgIHJlYWRvbmx5IGZhZGVJbkNvbnRlbnQ6IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YTtcbn0gPSB7XG4gICAgLyoqXG4gICAgICogVGhpcyBhbmltYXRpb24gdHJhbnNmb3JtcyB0aGUgc2VsZWN0J3Mgb3ZlcmxheSBwYW5lbCBvbiBhbmQgb2ZmIHRoZSBwYWdlLlxuICAgICAqXG4gICAgICogV2hlbiB0aGUgcGFuZWwgaXMgYXR0YWNoZWQgdG8gdGhlIERPTSwgaXQgZXhwYW5kcyBpdHMgd2lkdGggYnkgdGhlIGFtb3VudCBvZiBwYWRkaW5nLCBzY2FsZXMgaXRcbiAgICAgKiB1cCB0byAxMDAlIG9uIHRoZSBZIGF4aXMsIGZhZGVzIGluIGl0cyBib3JkZXIsIGFuZCB0cmFuc2xhdGVzIHNsaWdodGx5IHVwIGFuZCB0byB0aGVcbiAgICAgKiBzaWRlIHRvIGVuc3VyZSB0aGUgb3B0aW9uIHRleHQgY29ycmVjdGx5IG92ZXJsYXBzIHRoZSB0cmlnZ2VyIHRleHQuXG4gICAgICpcbiAgICAgKiBXaGVuIHRoZSBwYW5lbCBpcyByZW1vdmVkIGZyb20gdGhlIERPTSwgaXQgc2ltcGx5IGZhZGVzIG91dCBsaW5lYXJseS5cbiAgICAgKi9cbiAgICB0cmFuc2Zvcm1QYW5lbDogdHJpZ2dlcigndHJhbnNmb3JtUGFuZWwnLCBbXG4gICAgICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoe1xuICAgICAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGVZKDApJyxcbiAgICAgICAgICAgIG1pbldpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgIH0pKSxcbiAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiAqJywgZ3JvdXAoW1xuICAgICAgICAgICAgYW5pbWF0ZSgnMTUwbXMgY3ViaWMtYmV6aWVyKDAuMjUsIDAuOCwgMC4yNSwgMSknKVxuICAgICAgICBdKSksXG4gICAgICAgIHRyYW5zaXRpb24oJyogPT4gdm9pZCcsIFtcbiAgICAgICAgICAgIGFuaW1hdGUoJzI1MG1zIDEwMG1zIGxpbmVhcicsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSlcbiAgICAgICAgXSlcbiAgICBdKSxcblxuICAgIC8qKlxuICAgICAqIFRoaXMgYW5pbWF0aW9uIGZhZGVzIGluIHRoZSBiYWNrZ3JvdW5kIGNvbG9yIGFuZCB0ZXh0IGNvbnRlbnQgb2YgdGhlXG4gICAgICogc2VsZWN0J3Mgb3B0aW9ucy4gSXQgaXMgdGltZSBkZWxheWVkIHRvIG9jY3VyIDEwMG1zIGFmdGVyIHRoZSBvdmVybGF5XG4gICAgICogcGFuZWwgaGFzIHRyYW5zZm9ybWVkIGluLlxuICAgICAqL1xuICAgIGZhZGVJbkNvbnRlbnQ6IHRyaWdnZXIoJ2ZhZGVJbkNvbnRlbnQnLCBbXG4gICAgICAgIHN0YXRlKCdzaG93aW5nJywgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKSxcbiAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiBzaG93aW5nJywgW1xuICAgICAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAwIH0pLFxuICAgICAgICAgICAgYW5pbWF0ZSgnMTUwbXMgMTAwbXMgY3ViaWMtYmV6aWVyKDAuNTUsIDAsIDAuNTUsIDAuMiknKVxuICAgICAgICBdKVxuICAgIF0pXG59O1xuXG5cbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1QYW5lbCA9IG1jU2VsZWN0QW5pbWF0aW9ucy50cmFuc2Zvcm1QYW5lbDtcblxuZXhwb3J0IGNvbnN0IGZhZGVJbkNvbnRlbnQgPSBtY1NlbGVjdEFuaW1hdGlvbnMuZmFkZUluQ29udGVudDtcbiJdfQ==