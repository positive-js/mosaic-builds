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
/**
 * @deprecated
 * \@breaking-change 7.0.0
 * @type {?}
 */
export const transformPanel = mcSelectAnimations.transformPanel;
/**
 * @deprecated
 * \@breaking-change 7.0.0
 * @type {?}
 */
export const fadeInContent = mcSelectAnimations.fadeInContent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL2NvcmUvIiwic291cmNlcyI6WyJzZWxlY3QvYW5pbWF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDSCxPQUFPLEVBRVAsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUNQLEtBQUssRUFDTCxZQUFZLEVBQ1osS0FBSyxFQUNSLE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7QUFRN0IsTUFBTSxPQUFPLGtCQUFrQixHQUczQjs7Ozs7Ozs7OztJQVVBLGNBQWMsRUFBRSxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7UUFDdEMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7WUFDaEIsU0FBUyxFQUFFLFdBQVc7WUFDdEIsUUFBUSxFQUFFLE1BQU07WUFDaEIsT0FBTyxFQUFFLENBQUM7U0FDYixDQUFDLENBQUM7UUFDSCxVQUFVLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQztZQUMxQixLQUFLLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLENBQUM7WUFDdkMsT0FBTyxDQUFDLHdDQUF3QyxDQUFDO1NBQ3BELENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDcEIsT0FBTyxDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZELENBQUM7S0FDTCxDQUFDOzs7Ozs7SUFPRixhQUFhLEVBQUUsT0FBTyxDQUFDLGVBQWUsRUFBRTtRQUNwQyxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQixLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDckIsT0FBTyxDQUFDLDhDQUE4QyxDQUFDO1NBQzFELENBQUM7S0FDTCxDQUFDO0NBQ0w7Ozs7OztBQU9ELE1BQU0sT0FBTyxjQUFjLEdBQUcsa0JBQWtCLENBQUMsY0FBYzs7Ozs7O0FBTS9ELE1BQU0sT0FBTyxhQUFhLEdBQUcsa0JBQWtCLENBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgYW5pbWF0ZSxcbiAgICBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEsXG4gICAgc3RhdGUsXG4gICAgc3R5bGUsXG4gICAgdHJhbnNpdGlvbixcbiAgICB0cmlnZ2VyLFxuICAgIHF1ZXJ5LFxuICAgIGFuaW1hdGVDaGlsZCxcbiAgICBncm91cFxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuXG4vKipcbiAqIFRoZSBmb2xsb3dpbmcgYXJlIGFsbCB0aGUgYW5pbWF0aW9ucyBmb3IgdGhlIG1jLXNlbGVjdCBjb21wb25lbnQsIHdpdGggZWFjaFxuICogY29uc3QgY29udGFpbmluZyB0aGUgbWV0YWRhdGEgZm9yIG9uZSBhbmltYXRpb24uXG4gKlxuICovXG5leHBvcnQgY29uc3QgbWNTZWxlY3RBbmltYXRpb25zOiB7XG4gICAgcmVhZG9ubHkgdHJhbnNmb3JtUGFuZWw6IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YTtcbiAgICByZWFkb25seSBmYWRlSW5Db250ZW50OiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGE7XG59ID0ge1xuICAgIC8qKlxuICAgICAqIFRoaXMgYW5pbWF0aW9uIHRyYW5zZm9ybXMgdGhlIHNlbGVjdCdzIG92ZXJsYXkgcGFuZWwgb24gYW5kIG9mZiB0aGUgcGFnZS5cbiAgICAgKlxuICAgICAqIFdoZW4gdGhlIHBhbmVsIGlzIGF0dGFjaGVkIHRvIHRoZSBET00sIGl0IGV4cGFuZHMgaXRzIHdpZHRoIGJ5IHRoZSBhbW91bnQgb2YgcGFkZGluZywgc2NhbGVzIGl0XG4gICAgICogdXAgdG8gMTAwJSBvbiB0aGUgWSBheGlzLCBmYWRlcyBpbiBpdHMgYm9yZGVyLCBhbmQgdHJhbnNsYXRlcyBzbGlnaHRseSB1cCBhbmQgdG8gdGhlXG4gICAgICogc2lkZSB0byBlbnN1cmUgdGhlIG9wdGlvbiB0ZXh0IGNvcnJlY3RseSBvdmVybGFwcyB0aGUgdHJpZ2dlciB0ZXh0LlxuICAgICAqXG4gICAgICogV2hlbiB0aGUgcGFuZWwgaXMgcmVtb3ZlZCBmcm9tIHRoZSBET00sIGl0IHNpbXBseSBmYWRlcyBvdXQgbGluZWFybHkuXG4gICAgICovXG4gICAgdHJhbnNmb3JtUGFuZWw6IHRyaWdnZXIoJ3RyYW5zZm9ybVBhbmVsJywgW1xuICAgICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlWSgwKScsXG4gICAgICAgICAgICBtaW5XaWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICB9KSksXG4gICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIGdyb3VwKFtcbiAgICAgICAgICAgIHF1ZXJ5KCdAZmFkZUluQ29udGVudCcsIGFuaW1hdGVDaGlsZCgpKSxcbiAgICAgICAgICAgIGFuaW1hdGUoJzE1MG1zIGN1YmljLWJlemllcigwLjI1LCAwLjgsIDAuMjUsIDEpJylcbiAgICAgICAgXSkpLFxuICAgICAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBbXG4gICAgICAgICAgICBhbmltYXRlKCcyNTBtcyAxMDBtcyBsaW5lYXInLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXG4gICAgICAgIF0pXG4gICAgXSksXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGFuaW1hdGlvbiBmYWRlcyBpbiB0aGUgYmFja2dyb3VuZCBjb2xvciBhbmQgdGV4dCBjb250ZW50IG9mIHRoZVxuICAgICAqIHNlbGVjdCdzIG9wdGlvbnMuIEl0IGlzIHRpbWUgZGVsYXllZCB0byBvY2N1ciAxMDBtcyBhZnRlciB0aGUgb3ZlcmxheVxuICAgICAqIHBhbmVsIGhhcyB0cmFuc2Zvcm1lZCBpbi5cbiAgICAgKi9cbiAgICBmYWRlSW5Db250ZW50OiB0cmlnZ2VyKCdmYWRlSW5Db250ZW50JywgW1xuICAgICAgICBzdGF0ZSgnc2hvd2luZycsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSksXG4gICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gc2hvd2luZycsIFtcbiAgICAgICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMCB9KSxcbiAgICAgICAgICAgIGFuaW1hdGUoJzE1MG1zIDEwMG1zIGN1YmljLWJlemllcigwLjU1LCAwLCAwLjU1LCAwLjIpJylcbiAgICAgICAgXSlcbiAgICBdKVxufTtcblxuXG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKiBAYnJlYWtpbmctY2hhbmdlIDcuMC4wXG4gKi9cbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1QYW5lbCA9IG1jU2VsZWN0QW5pbWF0aW9ucy50cmFuc2Zvcm1QYW5lbDtcblxuLyoqXG4gKiBAZGVwcmVjYXRlZFxuICogQGJyZWFraW5nLWNoYW5nZSA3LjAuMFxuICovXG5leHBvcnQgY29uc3QgZmFkZUluQ29udGVudCA9IG1jU2VsZWN0QW5pbWF0aW9ucy5mYWRlSW5Db250ZW50O1xuIl19