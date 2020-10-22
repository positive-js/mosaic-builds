/**
 * @fileoverview added by tsickle
 * Generated from: dropdown-panel.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
/**
 * Injection token used to provide the parent dropdown to dropdown-specific components.
 * \@docs-private
 * @type {?}
 */
export const MC_DROPDOWN_PANEL = new InjectionToken('MC_DROPDOWN_PANEL');
/**
 * Interface for a custom dropdown panel that can be used with `mcDropdownTriggerFor`.
 * \@docs-private
 * @record
 * @template T
 */
export function McDropdownPanel() { }
if (false) {
    /** @type {?} */
    McDropdownPanel.prototype.xPosition;
    /** @type {?} */
    McDropdownPanel.prototype.yPosition;
    /** @type {?} */
    McDropdownPanel.prototype.overlapTriggerX;
    /** @type {?} */
    McDropdownPanel.prototype.overlapTriggerY;
    /** @type {?} */
    McDropdownPanel.prototype.templateRef;
    /** @type {?} */
    McDropdownPanel.prototype.closed;
    /** @type {?|undefined} */
    McDropdownPanel.prototype.parent;
    /** @type {?|undefined} */
    McDropdownPanel.prototype.direction;
    /** @type {?|undefined} */
    McDropdownPanel.prototype.lazyContent;
    /** @type {?|undefined} */
    McDropdownPanel.prototype.backdropClass;
    /** @type {?|undefined} */
    McDropdownPanel.prototype.hasBackdrop;
    /**
     * @param {?=} origin
     * @return {?}
     */
    McDropdownPanel.prototype.focusFirstItem = function (origin) { };
    /**
     * @return {?}
     */
    McDropdownPanel.prototype.resetActiveItem = function () { };
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    McDropdownPanel.prototype.setPositionClasses = function (x, y) { };
    /**
     * @param {?} item
     * @return {?}
     */
    McDropdownPanel.prototype.addItem = function (item) { };
    /**
     * @param {?} item
     * @return {?}
     */
    McDropdownPanel.prototype.removeItem = function (item) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tcGFuZWwuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9kcm9wZG93bi8iLCJzb3VyY2VzIjpbImRyb3Bkb3duLXBhbmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUE2QixjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7OztBQVUxRSxNQUFNLE9BQU8saUJBQWlCLEdBQUcsSUFBSSxjQUFjLENBQWtCLG1CQUFtQixDQUFDOzs7Ozs7O0FBT3pGLHFDQWlCQzs7O0lBaEJHLG9DQUE2Qjs7SUFDN0Isb0NBQTZCOztJQUM3QiwwQ0FBeUI7O0lBQ3pCLDBDQUF5Qjs7SUFDekIsc0NBQThCOztJQUM5QixpQ0FBeUQ7O0lBQ3pELGlDQUFxQzs7SUFDckMsb0NBQXNCOztJQUN0QixzQ0FBZ0M7O0lBQ2hDLHdDQUF1Qjs7SUFDdkIsc0NBQXNCOzs7OztJQUN0QixpRUFBMkM7Ozs7SUFDM0MsNERBQXdCOzs7Ozs7SUFDeEIsbUVBQXNFOzs7OztJQUN0RSx3REFBd0I7Ozs7O0lBQ3hCLDJEQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzT3JpZ2luIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRGlyZWN0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBUZW1wbGF0ZVJlZiwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTWNEcm9wZG93bkNvbnRlbnQgfSBmcm9tICcuL2Ryb3Bkb3duLWNvbnRlbnQnO1xuaW1wb3J0IHsgRHJvcGRvd25Qb3NpdGlvblgsIERyb3Bkb3duUG9zaXRpb25ZIH0gZnJvbSAnLi9kcm9wZG93bi1wb3NpdGlvbnMnO1xuXG5cbi8qKlxuICogSW5qZWN0aW9uIHRva2VuIHVzZWQgdG8gcHJvdmlkZSB0aGUgcGFyZW50IGRyb3Bkb3duIHRvIGRyb3Bkb3duLXNwZWNpZmljIGNvbXBvbmVudHMuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBNQ19EUk9QRE9XTl9QQU5FTCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxNY0Ryb3Bkb3duUGFuZWw+KCdNQ19EUk9QRE9XTl9QQU5FTCcpO1xuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgYSBjdXN0b20gZHJvcGRvd24gcGFuZWwgdGhhdCBjYW4gYmUgdXNlZCB3aXRoIGBtY0Ryb3Bkb3duVHJpZ2dlckZvcmAuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBNY0Ryb3Bkb3duUGFuZWw8VCA9IGFueT4ge1xuICAgIHhQb3NpdGlvbjogRHJvcGRvd25Qb3NpdGlvblg7XG4gICAgeVBvc2l0aW9uOiBEcm9wZG93blBvc2l0aW9uWTtcbiAgICBvdmVybGFwVHJpZ2dlclg6IGJvb2xlYW47XG4gICAgb3ZlcmxhcFRyaWdnZXJZOiBib29sZWFuO1xuICAgIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIGNsb3NlZDogRXZlbnRFbWl0dGVyPHZvaWQgfCAnY2xpY2snIHwgJ2tleWRvd24nIHwgJ3RhYic+O1xuICAgIHBhcmVudD86IE1jRHJvcGRvd25QYW5lbCB8IHVuZGVmaW5lZDtcbiAgICBkaXJlY3Rpb24/OiBEaXJlY3Rpb247XG4gICAgbGF6eUNvbnRlbnQ/OiBNY0Ryb3Bkb3duQ29udGVudDtcbiAgICBiYWNrZHJvcENsYXNzPzogc3RyaW5nO1xuICAgIGhhc0JhY2tkcm9wPzogYm9vbGVhbjtcbiAgICBmb2N1c0ZpcnN0SXRlbShvcmlnaW4/OiBGb2N1c09yaWdpbik6IHZvaWQ7XG4gICAgcmVzZXRBY3RpdmVJdGVtKCk6IHZvaWQ7XG4gICAgc2V0UG9zaXRpb25DbGFzc2VzPyh4OiBEcm9wZG93blBvc2l0aW9uWCwgeTogRHJvcGRvd25Qb3NpdGlvblkpOiB2b2lkO1xuICAgIGFkZEl0ZW0/KGl0ZW06IFQpOiB2b2lkO1xuICAgIHJlbW92ZUl0ZW0/KGl0ZW06IFQpOiB2b2lkO1xufVxuIl19