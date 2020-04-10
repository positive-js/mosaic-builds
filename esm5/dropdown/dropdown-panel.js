/**
 * @fileoverview added by tsickle
 * Generated from: dropdown-panel.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
/**
 * Injection token used to provide the parent dropdown to dropdown-specific components.
 * \@docs-private
 * @type {?}
 */
export var MC_DROPDOWN_PANEL = new InjectionToken('MC_DROPDOWN_PANEL');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tcGFuZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvZHJvcGRvd24vIiwic291cmNlcyI6WyJkcm9wZG93bi1wYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBNkIsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFVMUUsTUFBTSxLQUFPLGlCQUFpQixHQUFHLElBQUksY0FBYyxDQUFrQixtQkFBbUIsQ0FBQzs7Ozs7OztBQU96RixxQ0FpQkM7OztJQWhCRyxvQ0FBNkI7O0lBQzdCLG9DQUE2Qjs7SUFDN0IsMENBQXlCOztJQUN6QiwwQ0FBeUI7O0lBQ3pCLHNDQUE4Qjs7SUFDOUIsaUNBQXlEOztJQUN6RCxpQ0FBcUM7O0lBQ3JDLG9DQUFzQjs7SUFDdEIsc0NBQWdDOztJQUNoQyx3Q0FBdUI7O0lBQ3ZCLHNDQUFzQjs7Ozs7SUFDdEIsaUVBQTJDOzs7O0lBQzNDLDREQUF3Qjs7Ozs7O0lBQ3hCLG1FQUFzRTs7Ozs7SUFDdEUsd0RBQXdCOzs7OztJQUN4QiwyREFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c09yaWdpbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IERpcmVjdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IEV2ZW50RW1pdHRlciwgVGVtcGxhdGVSZWYsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1jRHJvcGRvd25Db250ZW50IH0gZnJvbSAnLi9kcm9wZG93bi1jb250ZW50JztcbmltcG9ydCB7IERyb3Bkb3duUG9zaXRpb25YLCBEcm9wZG93blBvc2l0aW9uWSB9IGZyb20gJy4vZHJvcGRvd24tcG9zaXRpb25zJztcblxuXG4vKipcbiAqIEluamVjdGlvbiB0b2tlbiB1c2VkIHRvIHByb3ZpZGUgdGhlIHBhcmVudCBkcm9wZG93biB0byBkcm9wZG93bi1zcGVjaWZpYyBjb21wb25lbnRzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgTUNfRFJPUERPV05fUEFORUwgPSBuZXcgSW5qZWN0aW9uVG9rZW48TWNEcm9wZG93blBhbmVsPignTUNfRFJPUERPV05fUEFORUwnKTtcblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIGEgY3VzdG9tIGRyb3Bkb3duIHBhbmVsIHRoYXQgY2FuIGJlIHVzZWQgd2l0aCBgbWNEcm9wZG93blRyaWdnZXJGb3JgLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgTWNEcm9wZG93blBhbmVsPFQgPSBhbnk+IHtcbiAgICB4UG9zaXRpb246IERyb3Bkb3duUG9zaXRpb25YO1xuICAgIHlQb3NpdGlvbjogRHJvcGRvd25Qb3NpdGlvblk7XG4gICAgb3ZlcmxhcFRyaWdnZXJYOiBib29sZWFuO1xuICAgIG92ZXJsYXBUcmlnZ2VyWTogYm9vbGVhbjtcbiAgICB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PjtcbiAgICBjbG9zZWQ6IEV2ZW50RW1pdHRlcjx2b2lkIHwgJ2NsaWNrJyB8ICdrZXlkb3duJyB8ICd0YWInPjtcbiAgICBwYXJlbnQ/OiBNY0Ryb3Bkb3duUGFuZWwgfCB1bmRlZmluZWQ7XG4gICAgZGlyZWN0aW9uPzogRGlyZWN0aW9uO1xuICAgIGxhenlDb250ZW50PzogTWNEcm9wZG93bkNvbnRlbnQ7XG4gICAgYmFja2Ryb3BDbGFzcz86IHN0cmluZztcbiAgICBoYXNCYWNrZHJvcD86IGJvb2xlYW47XG4gICAgZm9jdXNGaXJzdEl0ZW0ob3JpZ2luPzogRm9jdXNPcmlnaW4pOiB2b2lkO1xuICAgIHJlc2V0QWN0aXZlSXRlbSgpOiB2b2lkO1xuICAgIHNldFBvc2l0aW9uQ2xhc3Nlcz8oeDogRHJvcGRvd25Qb3NpdGlvblgsIHk6IERyb3Bkb3duUG9zaXRpb25ZKTogdm9pZDtcbiAgICBhZGRJdGVtPyhpdGVtOiBUKTogdm9pZDtcbiAgICByZW1vdmVJdGVtPyhpdGVtOiBUKTogdm9pZDtcbn1cbiJdfQ==