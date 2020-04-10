/**
 * @fileoverview added by tsickle
 * Generated from: dropdown-animations.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { trigger, state, style, animate, transition, query, group } from '@angular/animations';
/**
 * Animations used by the mc-dropdown component.
 * \@docs-private
 * @type {?}
 */
export var mcDropdownAnimations = {
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
export var fadeInItems = mcDropdownAnimations.fadeInItems;
/** @type {?} */
export var transformDropdown = mcDropdownAnimations.transformDropdown;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tYW5pbWF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9kcm9wZG93bi8iLCJzb3VyY2VzIjpbImRyb3Bkb3duLWFuaW1hdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0gsT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsT0FBTyxFQUNQLFVBQVUsRUFDVixLQUFLLEVBQ0wsS0FBSyxFQUVSLE1BQU0scUJBQXFCLENBQUM7Ozs7OztBQU83QixNQUFNLEtBQU8sb0JBQW9CLEdBRzdCOzs7Ozs7Ozs7SUFTQSxpQkFBaUIsRUFBRSxPQUFPLENBQUMsbUJBQW1CLEVBQUU7UUFDNUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7WUFDaEIsT0FBTyxFQUFFLENBQUM7WUFDVixTQUFTLEVBQUUsWUFBWTtTQUMxQixDQUFDLENBQUM7UUFDSCxVQUFVLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQztZQUM5QixLQUFLLENBQUMsdUJBQXVCLEVBQUUsT0FBTyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNFLE9BQU8sQ0FBQyxpQ0FBaUMsRUFBRSxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztTQUM3RSxDQUFDLENBQUM7UUFDSCxVQUFVLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzVFLENBQUM7Ozs7O0lBT0YsV0FBVyxFQUFFLE9BQU8sQ0FBQyxhQUFhLEVBQUU7UUFDaEMsZ0RBQWdEO1FBQ2hELEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDckMsVUFBVSxDQUFDLFdBQVcsRUFBRTtZQUNwQixLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUM7WUFDbkIsT0FBTyxDQUFDLDZDQUE2QyxDQUFDO1NBQ3pELENBQUM7S0FDTCxDQUFDO0NBQ0w7O0FBRUQsTUFBTSxLQUFPLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQyxXQUFXOztBQUUzRCxNQUFNLEtBQU8saUJBQWlCLEdBQUcsb0JBQW9CLENBQUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICB0cmlnZ2VyLFxuICAgIHN0YXRlLFxuICAgIHN0eWxlLFxuICAgIGFuaW1hdGUsXG4gICAgdHJhbnNpdGlvbixcbiAgICBxdWVyeSxcbiAgICBncm91cCxcbiAgICBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGFcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cblxuLyoqXG4gKiBBbmltYXRpb25zIHVzZWQgYnkgdGhlIG1jLWRyb3Bkb3duIGNvbXBvbmVudC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IG1jRHJvcGRvd25BbmltYXRpb25zOiB7XG4gICAgcmVhZG9ubHkgdHJhbnNmb3JtRHJvcGRvd246IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YTtcbiAgICByZWFkb25seSBmYWRlSW5JdGVtczogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhO1xufSA9IHtcbiAgICAvKipcbiAgICAgKiBUaGlzIGFuaW1hdGlvbiBjb250cm9scyB0aGUgZHJvcGRvd24gcGFuZWwncyBlbnRyeSBhbmQgZXhpdCBmcm9tIHRoZSBwYWdlLlxuICAgICAqXG4gICAgICogV2hlbiB0aGUgZHJvcGRvd24gcGFuZWwgaXMgYWRkZWQgdG8gdGhlIERPTSwgaXQgc2NhbGVzIGluIGFuZCBmYWRlcyBpbiBpdHMgYm9yZGVyLlxuICAgICAqXG4gICAgICogV2hlbiB0aGUgZHJvcGRvd24gcGFuZWwgaXMgcmVtb3ZlZCBmcm9tIHRoZSBET00sIGl0IHNpbXBseSBmYWRlcyBvdXQgYWZ0ZXIgYSBicmllZlxuICAgICAqIGRlbGF5IHRvIGRpc3BsYXkgdGhlIHJpcHBsZS5cbiAgICAgKi9cbiAgICB0cmFuc2Zvcm1Ecm9wZG93bjogdHJpZ2dlcigndHJhbnNmb3JtRHJvcGRvd24nLCBbXG4gICAgICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoe1xuICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDAuOCknXG4gICAgICAgIH0pKSxcbiAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiBlbnRlcicsIGdyb3VwKFtcbiAgICAgICAgICAgIHF1ZXJ5KCcubWMtZHJvcGRvd25fX2NvbnRlbnQnLCBhbmltYXRlKCc1MG1zIGxpbmVhcicsIHN0eWxlKHtvcGFjaXR5OiAxfSkpKSxcbiAgICAgICAgICAgIGFuaW1hdGUoJzUwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSknLCBzdHlsZSh7dHJhbnNmb3JtOiAnc2NhbGUoMSknfSkpXG4gICAgICAgIF0pKSxcbiAgICAgICAgdHJhbnNpdGlvbignKiA9PiB2b2lkJywgYW5pbWF0ZSgnNTBtcyAyNW1zIGxpbmVhcicsIHN0eWxlKHtvcGFjaXR5OiAwfSkpKVxuICAgIF0pLFxuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGFuaW1hdGlvbiBmYWRlcyBpbiB0aGUgYmFja2dyb3VuZCBjb2xvciBhbmQgY29udGVudCBvZiB0aGUgZHJvcGRvd24gcGFuZWxcbiAgICAgKiBhZnRlciBpdHMgY29udGFpbmluZyBlbGVtZW50IGlzIHNjYWxlZCBpbi5cbiAgICAgKi9cbiAgICBmYWRlSW5JdGVtczogdHJpZ2dlcignZmFkZUluSXRlbXMnLCBbXG4gICAgICAgIC8vIG5vdy4gUmVtb3ZlIG5leHQgdGltZSB3ZSBkbyBicmVha2luZyBjaGFuZ2VzLlxuICAgICAgICBzdGF0ZSgnc2hvd2luZycsIHN0eWxlKHtvcGFjaXR5OiAxfSkpLFxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBbXG4gICAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMH0pLFxuICAgICAgICAgICAgYW5pbWF0ZSgnMjAwbXMgNjBtcyBjdWJpYy1iZXppZXIoMC41NSwgMCwgMC41NSwgMC4yKScpXG4gICAgICAgIF0pXG4gICAgXSlcbn07XG5cbmV4cG9ydCBjb25zdCBmYWRlSW5JdGVtcyA9IG1jRHJvcGRvd25BbmltYXRpb25zLmZhZGVJbkl0ZW1zO1xuXG5leHBvcnQgY29uc3QgdHJhbnNmb3JtRHJvcGRvd24gPSBtY0Ryb3Bkb3duQW5pbWF0aW9ucy50cmFuc2Zvcm1Ecm9wZG93bjtcbiJdfQ==