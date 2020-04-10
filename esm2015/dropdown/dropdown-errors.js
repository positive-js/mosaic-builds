/**
 * @fileoverview added by tsickle
 * Generated from: dropdown-errors.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Throws an exception for the case when dropdown trigger doesn't have a valid mc-dropdown instance
 * \@docs-private
 * @return {?}
 */
export function throwMcDropdownMissingError() {
    throw Error(`mcDropdownTriggerFor: must pass in an mc-dropdown instance.
    Example:
      <mc-dropdown #dropdown="mcDropdown"></mc-dropdown>
      <button [mcDropdownTriggerFor]="dropdown"></button>`);
}
/**
 * Throws an exception for the case when dropdown's x-position value isn't valid.
 * In other words, it doesn't match 'before' or 'after'.
 * \@docs-private
 * @return {?}
 */
export function throwMcDropdownInvalidPositionX() {
    throw Error(`xPosition value must be either 'before' or after'.
      Example: <mc-dropdown xPosition="before" #dropdown="mcDropdown"></mc-dropdown>`);
}
/**
 * Throws an exception for the case when dropdown's y-position value isn't valid.
 * In other words, it doesn't match 'above' or 'below'.
 * \@docs-private
 * @return {?}
 */
export function throwMcDropdownInvalidPositionY() {
    throw Error(`yPosition value must be either 'above' or below'.
      Example: <mc-dropdown yPosition="above" #dropdown="mcDropdown"></mc-dropdown>`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tZXJyb3JzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL2Ryb3Bkb3duLyIsInNvdXJjZXMiOlsiZHJvcGRvd24tZXJyb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFJQSxNQUFNLFVBQVUsMkJBQTJCO0lBQ3ZDLE1BQU0sS0FBSyxDQUFDOzs7MERBRzBDLENBQUMsQ0FBQztBQUM1RCxDQUFDOzs7Ozs7O0FBT0QsTUFBTSxVQUFVLCtCQUErQjtJQUMzQyxNQUFNLEtBQUssQ0FBQztxRkFDcUUsQ0FBQyxDQUFDO0FBQ3ZGLENBQUM7Ozs7Ozs7QUFPRCxNQUFNLFVBQVUsK0JBQStCO0lBQzNDLE1BQU0sS0FBSyxDQUFDO29GQUNvRSxDQUFDLENBQUM7QUFDdEYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBmb3IgdGhlIGNhc2Ugd2hlbiBkcm9wZG93biB0cmlnZ2VyIGRvZXNuJ3QgaGF2ZSBhIHZhbGlkIG1jLWRyb3Bkb3duIGluc3RhbmNlXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0aHJvd01jRHJvcGRvd25NaXNzaW5nRXJyb3IoKSB7XG4gICAgdGhyb3cgRXJyb3IoYG1jRHJvcGRvd25UcmlnZ2VyRm9yOiBtdXN0IHBhc3MgaW4gYW4gbWMtZHJvcGRvd24gaW5zdGFuY2UuXG4gICAgRXhhbXBsZTpcbiAgICAgIDxtYy1kcm9wZG93biAjZHJvcGRvd249XCJtY0Ryb3Bkb3duXCI+PC9tYy1kcm9wZG93bj5cbiAgICAgIDxidXR0b24gW21jRHJvcGRvd25UcmlnZ2VyRm9yXT1cImRyb3Bkb3duXCI+PC9idXR0b24+YCk7XG59XG5cbi8qKlxuICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBmb3IgdGhlIGNhc2Ugd2hlbiBkcm9wZG93bidzIHgtcG9zaXRpb24gdmFsdWUgaXNuJ3QgdmFsaWQuXG4gKiBJbiBvdGhlciB3b3JkcywgaXQgZG9lc24ndCBtYXRjaCAnYmVmb3JlJyBvciAnYWZ0ZXInLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhyb3dNY0Ryb3Bkb3duSW52YWxpZFBvc2l0aW9uWCgpIHtcbiAgICB0aHJvdyBFcnJvcihgeFBvc2l0aW9uIHZhbHVlIG11c3QgYmUgZWl0aGVyICdiZWZvcmUnIG9yIGFmdGVyJy5cbiAgICAgIEV4YW1wbGU6IDxtYy1kcm9wZG93biB4UG9zaXRpb249XCJiZWZvcmVcIiAjZHJvcGRvd249XCJtY0Ryb3Bkb3duXCI+PC9tYy1kcm9wZG93bj5gKTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYW4gZXhjZXB0aW9uIGZvciB0aGUgY2FzZSB3aGVuIGRyb3Bkb3duJ3MgeS1wb3NpdGlvbiB2YWx1ZSBpc24ndCB2YWxpZC5cbiAqIEluIG90aGVyIHdvcmRzLCBpdCBkb2Vzbid0IG1hdGNoICdhYm92ZScgb3IgJ2JlbG93Jy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRocm93TWNEcm9wZG93bkludmFsaWRQb3NpdGlvblkoKSB7XG4gICAgdGhyb3cgRXJyb3IoYHlQb3NpdGlvbiB2YWx1ZSBtdXN0IGJlIGVpdGhlciAnYWJvdmUnIG9yIGJlbG93Jy5cbiAgICAgIEV4YW1wbGU6IDxtYy1kcm9wZG93biB5UG9zaXRpb249XCJhYm92ZVwiICNkcm9wZG93bj1cIm1jRHJvcGRvd25cIj48L21jLWRyb3Bkb3duPmApO1xufVxuIl19