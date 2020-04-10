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
    throw Error("mcDropdownTriggerFor: must pass in an mc-dropdown instance.\n    Example:\n      <mc-dropdown #dropdown=\"mcDropdown\"></mc-dropdown>\n      <button [mcDropdownTriggerFor]=\"dropdown\"></button>");
}
/**
 * Throws an exception for the case when dropdown's x-position value isn't valid.
 * In other words, it doesn't match 'before' or 'after'.
 * \@docs-private
 * @return {?}
 */
export function throwMcDropdownInvalidPositionX() {
    throw Error("xPosition value must be either 'before' or after'.\n      Example: <mc-dropdown xPosition=\"before\" #dropdown=\"mcDropdown\"></mc-dropdown>");
}
/**
 * Throws an exception for the case when dropdown's y-position value isn't valid.
 * In other words, it doesn't match 'above' or 'below'.
 * \@docs-private
 * @return {?}
 */
export function throwMcDropdownInvalidPositionY() {
    throw Error("yPosition value must be either 'above' or below'.\n      Example: <mc-dropdown yPosition=\"above\" #dropdown=\"mcDropdown\"></mc-dropdown>");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tZXJyb3JzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL2Ryb3Bkb3duLyIsInNvdXJjZXMiOlsiZHJvcGRvd24tZXJyb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFJQSxNQUFNLFVBQVUsMkJBQTJCO0lBQ3ZDLE1BQU0sS0FBSyxDQUFDLG9NQUcwQyxDQUFDLENBQUM7QUFDNUQsQ0FBQzs7Ozs7OztBQU9ELE1BQU0sVUFBVSwrQkFBK0I7SUFDM0MsTUFBTSxLQUFLLENBQUMsOElBQ3FFLENBQUMsQ0FBQztBQUN2RixDQUFDOzs7Ozs7O0FBT0QsTUFBTSxVQUFVLCtCQUErQjtJQUMzQyxNQUFNLEtBQUssQ0FBQyw0SUFDb0UsQ0FBQyxDQUFDO0FBQ3RGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRocm93cyBhbiBleGNlcHRpb24gZm9yIHRoZSBjYXNlIHdoZW4gZHJvcGRvd24gdHJpZ2dlciBkb2Vzbid0IGhhdmUgYSB2YWxpZCBtYy1kcm9wZG93biBpbnN0YW5jZVxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhyb3dNY0Ryb3Bkb3duTWlzc2luZ0Vycm9yKCkge1xuICAgIHRocm93IEVycm9yKGBtY0Ryb3Bkb3duVHJpZ2dlckZvcjogbXVzdCBwYXNzIGluIGFuIG1jLWRyb3Bkb3duIGluc3RhbmNlLlxuICAgIEV4YW1wbGU6XG4gICAgICA8bWMtZHJvcGRvd24gI2Ryb3Bkb3duPVwibWNEcm9wZG93blwiPjwvbWMtZHJvcGRvd24+XG4gICAgICA8YnV0dG9uIFttY0Ryb3Bkb3duVHJpZ2dlckZvcl09XCJkcm9wZG93blwiPjwvYnV0dG9uPmApO1xufVxuXG4vKipcbiAqIFRocm93cyBhbiBleGNlcHRpb24gZm9yIHRoZSBjYXNlIHdoZW4gZHJvcGRvd24ncyB4LXBvc2l0aW9uIHZhbHVlIGlzbid0IHZhbGlkLlxuICogSW4gb3RoZXIgd29yZHMsIGl0IGRvZXNuJ3QgbWF0Y2ggJ2JlZm9yZScgb3IgJ2FmdGVyJy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRocm93TWNEcm9wZG93bkludmFsaWRQb3NpdGlvblgoKSB7XG4gICAgdGhyb3cgRXJyb3IoYHhQb3NpdGlvbiB2YWx1ZSBtdXN0IGJlIGVpdGhlciAnYmVmb3JlJyBvciBhZnRlcicuXG4gICAgICBFeGFtcGxlOiA8bWMtZHJvcGRvd24geFBvc2l0aW9uPVwiYmVmb3JlXCIgI2Ryb3Bkb3duPVwibWNEcm9wZG93blwiPjwvbWMtZHJvcGRvd24+YCk7XG59XG5cbi8qKlxuICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBmb3IgdGhlIGNhc2Ugd2hlbiBkcm9wZG93bidzIHktcG9zaXRpb24gdmFsdWUgaXNuJ3QgdmFsaWQuXG4gKiBJbiBvdGhlciB3b3JkcywgaXQgZG9lc24ndCBtYXRjaCAnYWJvdmUnIG9yICdiZWxvdycuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0aHJvd01jRHJvcGRvd25JbnZhbGlkUG9zaXRpb25ZKCkge1xuICAgIHRocm93IEVycm9yKGB5UG9zaXRpb24gdmFsdWUgbXVzdCBiZSBlaXRoZXIgJ2Fib3ZlJyBvciBiZWxvdycuXG4gICAgICBFeGFtcGxlOiA8bWMtZHJvcGRvd24geVBvc2l0aW9uPVwiYWJvdmVcIiAjZHJvcGRvd249XCJtY0Ryb3Bkb3duXCI+PC9tYy1kcm9wZG93bj5gKTtcbn1cbiJdfQ==