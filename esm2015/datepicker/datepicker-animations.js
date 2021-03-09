import { animate, state, style, transition, trigger } from '@angular/animations';
/**
 * Animations used by the mosaic datepicker.
 * @docs-private
 */
export const mcDatepickerAnimations = {
    /** Transforms the height of the datepicker's calendar. */
    transformPanel: trigger('transformPanel', [
        state('void', style({
            opacity: 0,
            transform: 'scale(1, 0.8)'
        })),
        transition('void => enter', animate('120ms cubic-bezier(0, 0, 0.2, 1)', style({
            opacity: 1,
            transform: 'scale(1, 1)'
        }))),
        transition('* => void', animate('100ms linear', style({ opacity: 0 })))
    ]),
    /** Fades in the content of the calendar. */
    fadeInCalendar: trigger('fadeInCalendar', [
        state('void', style({ opacity: 0 })),
        state('enter', style({ opacity: 1 })),
        // need to keep it until #12440 gets in, otherwise the exit animation will look glitchy.
        transition('void => *', animate('120ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)'))
    ])
};
// todo should be put into polyfils
// https://github.com/angular/angular/issues/24769
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1hbmltYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1hbmltYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUVWLE1BQU0scUJBQXFCLENBQUM7QUFHN0I7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBRy9CO0lBQ0EsMERBQTBEO0lBQzFELGNBQWMsRUFBRSxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7UUFDdEMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7WUFDaEIsT0FBTyxFQUFFLENBQUM7WUFDVixTQUFTLEVBQUUsZUFBZTtTQUM3QixDQUFDLENBQUM7UUFDSCxVQUFVLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxrQ0FBa0MsRUFBRSxLQUFLLENBQUM7WUFDMUUsT0FBTyxFQUFFLENBQUM7WUFDVixTQUFTLEVBQUUsYUFBYTtTQUMzQixDQUFDLENBQUMsQ0FBQztRQUNKLFVBQVUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzFFLENBQUM7SUFFRiw0Q0FBNEM7SUFDNUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTtRQUN0QyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFckMsd0ZBQXdGO1FBQ3hGLFVBQVUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7S0FDbkYsQ0FBQztDQUNMLENBQUM7QUFFRixtQ0FBbUM7QUFDbkMsa0RBQWtEO0FBQ2xELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtJQUM1QixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBSSxPQUFPLENBQUMsU0FBaUIsQ0FBQyxpQkFBaUIsQ0FBQztDQUM1RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgYW5pbWF0ZSxcbiAgICBzdGF0ZSxcbiAgICBzdHlsZSxcbiAgICB0cmFuc2l0aW9uLFxuICAgIHRyaWdnZXIsXG4gICAgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5cbi8qKlxuICogQW5pbWF0aW9ucyB1c2VkIGJ5IHRoZSBtb3NhaWMgZGF0ZXBpY2tlci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IG1jRGF0ZXBpY2tlckFuaW1hdGlvbnM6IHtcbiAgICByZWFkb25seSB0cmFuc2Zvcm1QYW5lbDogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhO1xuICAgIHJlYWRvbmx5IGZhZGVJbkNhbGVuZGFyOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGE7XG59ID0ge1xuICAgIC8qKiBUcmFuc2Zvcm1zIHRoZSBoZWlnaHQgb2YgdGhlIGRhdGVwaWNrZXIncyBjYWxlbmRhci4gKi9cbiAgICB0cmFuc2Zvcm1QYW5lbDogdHJpZ2dlcigndHJhbnNmb3JtUGFuZWwnLCBbXG4gICAgICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoe1xuICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDEsIDAuOCknXG4gICAgICAgIH0pKSxcbiAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiBlbnRlcicsIGFuaW1hdGUoJzEyMG1zIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpJywgc3R5bGUoe1xuICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDEsIDEpJ1xuICAgICAgICB9KSkpLFxuICAgICAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBhbmltYXRlKCcxMDBtcyBsaW5lYXInLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpKVxuICAgIF0pLFxuXG4gICAgLyoqIEZhZGVzIGluIHRoZSBjb250ZW50IG9mIHRoZSBjYWxlbmRhci4gKi9cbiAgICBmYWRlSW5DYWxlbmRhcjogdHJpZ2dlcignZmFkZUluQ2FsZW5kYXInLCBbXG4gICAgICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKSxcbiAgICAgICAgc3RhdGUoJ2VudGVyJywgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKSxcblxuICAgICAgICAvLyBuZWVkIHRvIGtlZXAgaXQgdW50aWwgIzEyNDQwIGdldHMgaW4sIG90aGVyd2lzZSB0aGUgZXhpdCBhbmltYXRpb24gd2lsbCBsb29rIGdsaXRjaHkuXG4gICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIGFuaW1hdGUoJzEyMG1zIDEwMG1zIGN1YmljLWJlemllcigwLjU1LCAwLCAwLjU1LCAwLjIpJykpXG4gICAgXSlcbn07XG5cbi8vIHRvZG8gc2hvdWxkIGJlIHB1dCBpbnRvIHBvbHlmaWxzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8yNDc2OVxuaWYgKCFFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzKSB7XG4gICAgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyA9IChFbGVtZW50LnByb3RvdHlwZSBhcyBhbnkpLm1zTWF0Y2hlc1NlbGVjdG9yO1xufVxuIl19