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
    /** @type {?|undefined} */
    McDropdownPanel.prototype.closeOnOutsideClick;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tcGFuZWwuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9kcm9wZG93bi8iLCJzb3VyY2VzIjpbImRyb3Bkb3duLXBhbmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUE2QixjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7OztBQVUxRSxNQUFNLE9BQU8saUJBQWlCLEdBQUcsSUFBSSxjQUFjLENBQWtCLG1CQUFtQixDQUFDOzs7Ozs7O0FBT3pGLHFDQWtCQzs7O0lBakJHLG9DQUE2Qjs7SUFDN0Isb0NBQTZCOztJQUM3QiwwQ0FBeUI7O0lBQ3pCLDBDQUF5Qjs7SUFDekIsc0NBQThCOztJQUM5QixpQ0FBeUQ7O0lBQ3pELGlDQUFxQzs7SUFDckMsb0NBQXNCOztJQUN0QixzQ0FBZ0M7O0lBQ2hDLHdDQUF1Qjs7SUFDdkIsc0NBQXNCOztJQUN0Qiw4Q0FBOEI7Ozs7O0lBQzlCLGlFQUEyQzs7OztJQUMzQyw0REFBd0I7Ozs7OztJQUN4QixtRUFBc0U7Ozs7O0lBQ3RFLHdEQUF3Qjs7Ozs7SUFDeEIsMkRBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNPcmlnaW4gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBEaXJlY3Rpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIsIFRlbXBsYXRlUmVmLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNY0Ryb3Bkb3duQ29udGVudCB9IGZyb20gJy4vZHJvcGRvd24tY29udGVudCc7XG5pbXBvcnQgeyBEcm9wZG93blBvc2l0aW9uWCwgRHJvcGRvd25Qb3NpdGlvblkgfSBmcm9tICcuL2Ryb3Bkb3duLXBvc2l0aW9ucyc7XG5cblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdXNlZCB0byBwcm92aWRlIHRoZSBwYXJlbnQgZHJvcGRvd24gdG8gZHJvcGRvd24tc3BlY2lmaWMgY29tcG9uZW50cy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IE1DX0RST1BET1dOX1BBTkVMID0gbmV3IEluamVjdGlvblRva2VuPE1jRHJvcGRvd25QYW5lbD4oJ01DX0RST1BET1dOX1BBTkVMJyk7XG5cbi8qKlxuICogSW50ZXJmYWNlIGZvciBhIGN1c3RvbSBkcm9wZG93biBwYW5lbCB0aGF0IGNhbiBiZSB1c2VkIHdpdGggYG1jRHJvcGRvd25UcmlnZ2VyRm9yYC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIE1jRHJvcGRvd25QYW5lbDxUID0gYW55PiB7XG4gICAgeFBvc2l0aW9uOiBEcm9wZG93blBvc2l0aW9uWDtcbiAgICB5UG9zaXRpb246IERyb3Bkb3duUG9zaXRpb25ZO1xuICAgIG92ZXJsYXBUcmlnZ2VyWDogYm9vbGVhbjtcbiAgICBvdmVybGFwVHJpZ2dlclk6IGJvb2xlYW47XG4gICAgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgY2xvc2VkOiBFdmVudEVtaXR0ZXI8dm9pZCB8ICdjbGljaycgfCAna2V5ZG93bicgfCAndGFiJz47XG4gICAgcGFyZW50PzogTWNEcm9wZG93blBhbmVsIHwgdW5kZWZpbmVkO1xuICAgIGRpcmVjdGlvbj86IERpcmVjdGlvbjtcbiAgICBsYXp5Q29udGVudD86IE1jRHJvcGRvd25Db250ZW50O1xuICAgIGJhY2tkcm9wQ2xhc3M/OiBzdHJpbmc7XG4gICAgaGFzQmFja2Ryb3A/OiBib29sZWFuO1xuICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s/OiBib29sZWFuO1xuICAgIGZvY3VzRmlyc3RJdGVtKG9yaWdpbj86IEZvY3VzT3JpZ2luKTogdm9pZDtcbiAgICByZXNldEFjdGl2ZUl0ZW0oKTogdm9pZDtcbiAgICBzZXRQb3NpdGlvbkNsYXNzZXM/KHg6IERyb3Bkb3duUG9zaXRpb25YLCB5OiBEcm9wZG93blBvc2l0aW9uWSk6IHZvaWQ7XG4gICAgYWRkSXRlbT8oaXRlbTogVCk6IHZvaWQ7XG4gICAgcmVtb3ZlSXRlbT8oaXRlbTogVCk6IHZvaWQ7XG59XG4iXX0=