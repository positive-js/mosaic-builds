/**
 * @fileoverview added by tsickle
 * Generated from: dropdown-animations.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { trigger, state, style, animate, transition, query, group } from '@angular/animations';
/**
 * Animations used by the mc-dropdown component.
 * \@docs-private
 * @type {?}
 */
export const mcDropdownAnimations = {
    /**
     * This animation controls the dropdown panel's entry and exit from the page.
     *
     * When the dropdown panel is added to the DOM, it scales in and fades in its border.
     *
     * When the dropdown panel is removed from the DOM, it simply fades out after a brief
     * delay to display the ripple.
     */
    transformDropdown: trigger('transformDropdown', [
        state('void', style({
            opacity: 0,
            transform: 'scale(0.8)'
        })),
        transition('void => enter', group([
            query('.mc-dropdown__content', animate('50ms linear', style({ opacity: 1 }))),
            animate('50ms cubic-bezier(0, 0, 0.2, 1)', style({ transform: 'scale(1)' }))
        ])),
        transition('* => void', animate('50ms 25ms linear', style({ opacity: 0 })))
    ]),
    /**
     * This animation fades in the background color and content of the dropdown panel
     * after its containing element is scaled in.
     */
    fadeInItems: trigger('fadeInItems', [
        // now. Remove next time we do breaking changes.
        state('showing', style({ opacity: 1 })),
        transition('void => *', [
            style({ opacity: 0 }),
            animate('200ms 60ms cubic-bezier(0.55, 0, 0.55, 0.2)')
        ])
    ])
};
/** @type {?} */
export const fadeInItems = mcDropdownAnimations.fadeInItems;
/** @type {?} */
export const transformDropdown = mcDropdownAnimations.transformDropdown;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tYW5pbWF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL2Ryb3Bkb3duLyIsInNvdXJjZXMiOlsiZHJvcGRvd24tYW5pbWF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDSCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxPQUFPLEVBQ1AsVUFBVSxFQUNWLEtBQUssRUFDTCxLQUFLLEVBRVIsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7O0FBTzdCLE1BQU0sT0FBTyxvQkFBb0IsR0FHN0I7Ozs7Ozs7OztJQVNBLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRTtRQUM1QyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztZQUNoQixPQUFPLEVBQUUsQ0FBQztZQUNWLFNBQVMsRUFBRSxZQUFZO1NBQzFCLENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDO1lBQzlCLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxPQUFPLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0UsT0FBTyxDQUFDLGlDQUFpQyxFQUFFLEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO1NBQzdFLENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7S0FDNUUsQ0FBQzs7Ozs7SUFPRixXQUFXLEVBQUUsT0FBTyxDQUFDLGFBQWEsRUFBRTtRQUNoQyxnREFBZ0Q7UUFDaEQsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUNyQyxVQUFVLENBQUMsV0FBVyxFQUFFO1lBQ3BCLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQztZQUNuQixPQUFPLENBQUMsNkNBQTZDLENBQUM7U0FDekQsQ0FBQztLQUNMLENBQUM7Q0FDTDs7QUFFRCxNQUFNLE9BQU8sV0FBVyxHQUFHLG9CQUFvQixDQUFDLFdBQVc7O0FBRTNELE1BQU0sT0FBTyxpQkFBaUIsR0FBRyxvQkFBb0IsQ0FBQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIHRyaWdnZXIsXG4gICAgc3RhdGUsXG4gICAgc3R5bGUsXG4gICAgYW5pbWF0ZSxcbiAgICB0cmFuc2l0aW9uLFxuICAgIHF1ZXJ5LFxuICAgIGdyb3VwLFxuICAgIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YVxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuXG4vKipcbiAqIEFuaW1hdGlvbnMgdXNlZCBieSB0aGUgbWMtZHJvcGRvd24gY29tcG9uZW50LlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgbWNEcm9wZG93bkFuaW1hdGlvbnM6IHtcbiAgICByZWFkb25seSB0cmFuc2Zvcm1Ecm9wZG93bjogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhO1xuICAgIHJlYWRvbmx5IGZhZGVJbkl0ZW1zOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGE7XG59ID0ge1xuICAgIC8qKlxuICAgICAqIFRoaXMgYW5pbWF0aW9uIGNvbnRyb2xzIHRoZSBkcm9wZG93biBwYW5lbCdzIGVudHJ5IGFuZCBleGl0IGZyb20gdGhlIHBhZ2UuXG4gICAgICpcbiAgICAgKiBXaGVuIHRoZSBkcm9wZG93biBwYW5lbCBpcyBhZGRlZCB0byB0aGUgRE9NLCBpdCBzY2FsZXMgaW4gYW5kIGZhZGVzIGluIGl0cyBib3JkZXIuXG4gICAgICpcbiAgICAgKiBXaGVuIHRoZSBkcm9wZG93biBwYW5lbCBpcyByZW1vdmVkIGZyb20gdGhlIERPTSwgaXQgc2ltcGx5IGZhZGVzIG91dCBhZnRlciBhIGJyaWVmXG4gICAgICogZGVsYXkgdG8gZGlzcGxheSB0aGUgcmlwcGxlLlxuICAgICAqL1xuICAgIHRyYW5zZm9ybURyb3Bkb3duOiB0cmlnZ2VyKCd0cmFuc2Zvcm1Ecm9wZG93bicsIFtcbiAgICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7XG4gICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMC44KSdcbiAgICAgICAgfSkpLFxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IGVudGVyJywgZ3JvdXAoW1xuICAgICAgICAgICAgcXVlcnkoJy5tYy1kcm9wZG93bl9fY29udGVudCcsIGFuaW1hdGUoJzUwbXMgbGluZWFyJywgc3R5bGUoe29wYWNpdHk6IDF9KSkpLFxuICAgICAgICAgICAgYW5pbWF0ZSgnNTBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKScsIHN0eWxlKHt0cmFuc2Zvcm06ICdzY2FsZSgxKSd9KSlcbiAgICAgICAgXSkpLFxuICAgICAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBhbmltYXRlKCc1MG1zIDI1bXMgbGluZWFyJywgc3R5bGUoe29wYWNpdHk6IDB9KSkpXG4gICAgXSksXG5cblxuICAgIC8qKlxuICAgICAqIFRoaXMgYW5pbWF0aW9uIGZhZGVzIGluIHRoZSBiYWNrZ3JvdW5kIGNvbG9yIGFuZCBjb250ZW50IG9mIHRoZSBkcm9wZG93biBwYW5lbFxuICAgICAqIGFmdGVyIGl0cyBjb250YWluaW5nIGVsZW1lbnQgaXMgc2NhbGVkIGluLlxuICAgICAqL1xuICAgIGZhZGVJbkl0ZW1zOiB0cmlnZ2VyKCdmYWRlSW5JdGVtcycsIFtcbiAgICAgICAgLy8gbm93LiBSZW1vdmUgbmV4dCB0aW1lIHdlIGRvIGJyZWFraW5nIGNoYW5nZXMuXG4gICAgICAgIHN0YXRlKCdzaG93aW5nJywgc3R5bGUoe29wYWNpdHk6IDF9KSksXG4gICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIFtcbiAgICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAwfSksXG4gICAgICAgICAgICBhbmltYXRlKCcyMDBtcyA2MG1zIGN1YmljLWJlemllcigwLjU1LCAwLCAwLjU1LCAwLjIpJylcbiAgICAgICAgXSlcbiAgICBdKVxufTtcblxuZXhwb3J0IGNvbnN0IGZhZGVJbkl0ZW1zID0gbWNEcm9wZG93bkFuaW1hdGlvbnMuZmFkZUluSXRlbXM7XG5cbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1Ecm9wZG93biA9IG1jRHJvcGRvd25BbmltYXRpb25zLnRyYW5zZm9ybURyb3Bkb3duO1xuIl19