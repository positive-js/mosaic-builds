import { trigger, state, style, animate, transition, query, group } from '@angular/animations';
/**
 * Animations used by the mc-dropdown component.
 * @docs-private
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
export const fadeInItems = mcDropdownAnimations.fadeInItems;
export const transformDropdown = mcDropdownAnimations.transformDropdown;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tYW5pbWF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9kcm9wZG93bi9kcm9wZG93bi1hbmltYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxPQUFPLEVBQ1AsVUFBVSxFQUNWLEtBQUssRUFDTCxLQUFLLEVBRVIsTUFBTSxxQkFBcUIsQ0FBQztBQUc3Qjs7O0dBR0c7QUFDSCxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FHN0I7SUFDQTs7Ozs7OztPQU9HO0lBQ0gsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLG1CQUFtQixFQUFFO1FBQzVDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO1lBQ2hCLE9BQU8sRUFBRSxDQUFDO1lBQ1YsU0FBUyxFQUFFLFlBQVk7U0FDMUIsQ0FBQyxDQUFDO1FBQ0gsVUFBVSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUM7WUFDOUIsS0FBSyxDQUFDLHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztZQUMzRSxPQUFPLENBQUMsaUNBQWlDLEVBQUUsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7U0FDN0UsQ0FBQyxDQUFDO1FBQ0gsVUFBVSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztLQUM1RSxDQUFDO0lBR0Y7OztPQUdHO0lBQ0gsV0FBVyxFQUFFLE9BQU8sQ0FBQyxhQUFhLEVBQUU7UUFDaEMsZ0RBQWdEO1FBQ2hELEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDckMsVUFBVSxDQUFDLFdBQVcsRUFBRTtZQUNwQixLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUM7WUFDbkIsT0FBTyxDQUFDLDZDQUE2QyxDQUFDO1NBQ3pELENBQUM7S0FDTCxDQUFDO0NBQ0wsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQyxXQUFXLENBQUM7QUFFNUQsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsb0JBQW9CLENBQUMsaUJBQWlCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIHRyaWdnZXIsXG4gICAgc3RhdGUsXG4gICAgc3R5bGUsXG4gICAgYW5pbWF0ZSxcbiAgICB0cmFuc2l0aW9uLFxuICAgIHF1ZXJ5LFxuICAgIGdyb3VwLFxuICAgIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YVxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuXG4vKipcbiAqIEFuaW1hdGlvbnMgdXNlZCBieSB0aGUgbWMtZHJvcGRvd24gY29tcG9uZW50LlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgbWNEcm9wZG93bkFuaW1hdGlvbnM6IHtcbiAgICByZWFkb25seSB0cmFuc2Zvcm1Ecm9wZG93bjogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhO1xuICAgIHJlYWRvbmx5IGZhZGVJbkl0ZW1zOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGE7XG59ID0ge1xuICAgIC8qKlxuICAgICAqIFRoaXMgYW5pbWF0aW9uIGNvbnRyb2xzIHRoZSBkcm9wZG93biBwYW5lbCdzIGVudHJ5IGFuZCBleGl0IGZyb20gdGhlIHBhZ2UuXG4gICAgICpcbiAgICAgKiBXaGVuIHRoZSBkcm9wZG93biBwYW5lbCBpcyBhZGRlZCB0byB0aGUgRE9NLCBpdCBzY2FsZXMgaW4gYW5kIGZhZGVzIGluIGl0cyBib3JkZXIuXG4gICAgICpcbiAgICAgKiBXaGVuIHRoZSBkcm9wZG93biBwYW5lbCBpcyByZW1vdmVkIGZyb20gdGhlIERPTSwgaXQgc2ltcGx5IGZhZGVzIG91dCBhZnRlciBhIGJyaWVmXG4gICAgICogZGVsYXkgdG8gZGlzcGxheSB0aGUgcmlwcGxlLlxuICAgICAqL1xuICAgIHRyYW5zZm9ybURyb3Bkb3duOiB0cmlnZ2VyKCd0cmFuc2Zvcm1Ecm9wZG93bicsIFtcbiAgICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7XG4gICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMC44KSdcbiAgICAgICAgfSkpLFxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IGVudGVyJywgZ3JvdXAoW1xuICAgICAgICAgICAgcXVlcnkoJy5tYy1kcm9wZG93bl9fY29udGVudCcsIGFuaW1hdGUoJzUwbXMgbGluZWFyJywgc3R5bGUoe29wYWNpdHk6IDF9KSkpLFxuICAgICAgICAgICAgYW5pbWF0ZSgnNTBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKScsIHN0eWxlKHt0cmFuc2Zvcm06ICdzY2FsZSgxKSd9KSlcbiAgICAgICAgXSkpLFxuICAgICAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBhbmltYXRlKCc1MG1zIDI1bXMgbGluZWFyJywgc3R5bGUoe29wYWNpdHk6IDB9KSkpXG4gICAgXSksXG5cblxuICAgIC8qKlxuICAgICAqIFRoaXMgYW5pbWF0aW9uIGZhZGVzIGluIHRoZSBiYWNrZ3JvdW5kIGNvbG9yIGFuZCBjb250ZW50IG9mIHRoZSBkcm9wZG93biBwYW5lbFxuICAgICAqIGFmdGVyIGl0cyBjb250YWluaW5nIGVsZW1lbnQgaXMgc2NhbGVkIGluLlxuICAgICAqL1xuICAgIGZhZGVJbkl0ZW1zOiB0cmlnZ2VyKCdmYWRlSW5JdGVtcycsIFtcbiAgICAgICAgLy8gbm93LiBSZW1vdmUgbmV4dCB0aW1lIHdlIGRvIGJyZWFraW5nIGNoYW5nZXMuXG4gICAgICAgIHN0YXRlKCdzaG93aW5nJywgc3R5bGUoe29wYWNpdHk6IDF9KSksXG4gICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIFtcbiAgICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAwfSksXG4gICAgICAgICAgICBhbmltYXRlKCcyMDBtcyA2MG1zIGN1YmljLWJlemllcigwLjU1LCAwLCAwLjU1LCAwLjIpJylcbiAgICAgICAgXSlcbiAgICBdKVxufTtcblxuZXhwb3J0IGNvbnN0IGZhZGVJbkl0ZW1zID0gbWNEcm9wZG93bkFuaW1hdGlvbnMuZmFkZUluSXRlbXM7XG5cbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1Ecm9wZG93biA9IG1jRHJvcGRvd25BbmltYXRpb25zLnRyYW5zZm9ybURyb3Bkb3duO1xuIl19