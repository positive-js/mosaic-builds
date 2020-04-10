/**
 * @fileoverview added by tsickle
 * Generated from: select/errors.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Returns an exception to be thrown when attempting to change a select's `multiple` option
 * after initialization.
 * \@docs-private
 * @return {?}
 */
export function getMcSelectDynamicMultipleError() {
    return Error('Cannot change `multiple` mode of select after initialization.');
}
/**
 * Returns an exception to be thrown when attempting to assign a non-array value to a select
 * in `multiple` mode. Note that `undefined` and `null` are still valid values to allow for
 * resetting the value.
 * \@docs-private
 * @return {?}
 */
export function getMcSelectNonArrayValueError() {
    return Error('Value must be an array in multiple-selection mode.');
}
/**
 * Returns an exception to be thrown when assigning a non-function value to the comparator
 * used to determine if a value corresponds to an option. Note that whether the function
 * actually takes two values and returns a boolean is not checked.
 * @return {?}
 */
export function getMcSelectNonFunctionValueError() {
    return Error('`compareWith` must be a function.');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUvIiwic291cmNlcyI6WyJzZWxlY3QvZXJyb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBS0EsTUFBTSxVQUFVLCtCQUErQjtJQUMzQyxPQUFPLEtBQUssQ0FBQywrREFBK0QsQ0FBQyxDQUFDO0FBQ2xGLENBQUM7Ozs7Ozs7O0FBUUQsTUFBTSxVQUFVLDZCQUE2QjtJQUN6QyxPQUFPLEtBQUssQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO0FBQ3ZFLENBQUM7Ozs7Ozs7QUFPRCxNQUFNLFVBQVUsZ0NBQWdDO0lBQzVDLE9BQU8sS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7QUFDdEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUmV0dXJucyBhbiBleGNlcHRpb24gdG8gYmUgdGhyb3duIHdoZW4gYXR0ZW1wdGluZyB0byBjaGFuZ2UgYSBzZWxlY3QncyBgbXVsdGlwbGVgIG9wdGlvblxuICogYWZ0ZXIgaW5pdGlhbGl6YXRpb24uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNY1NlbGVjdER5bmFtaWNNdWx0aXBsZUVycm9yKCk6IEVycm9yIHtcbiAgICByZXR1cm4gRXJyb3IoJ0Nhbm5vdCBjaGFuZ2UgYG11bHRpcGxlYCBtb2RlIG9mIHNlbGVjdCBhZnRlciBpbml0aWFsaXphdGlvbi4nKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIGV4Y2VwdGlvbiB0byBiZSB0aHJvd24gd2hlbiBhdHRlbXB0aW5nIHRvIGFzc2lnbiBhIG5vbi1hcnJheSB2YWx1ZSB0byBhIHNlbGVjdFxuICogaW4gYG11bHRpcGxlYCBtb2RlLiBOb3RlIHRoYXQgYHVuZGVmaW5lZGAgYW5kIGBudWxsYCBhcmUgc3RpbGwgdmFsaWQgdmFsdWVzIHRvIGFsbG93IGZvclxuICogcmVzZXR0aW5nIHRoZSB2YWx1ZS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1jU2VsZWN0Tm9uQXJyYXlWYWx1ZUVycm9yKCk6IEVycm9yIHtcbiAgICByZXR1cm4gRXJyb3IoJ1ZhbHVlIG11c3QgYmUgYW4gYXJyYXkgaW4gbXVsdGlwbGUtc2VsZWN0aW9uIG1vZGUuJyk7XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBleGNlcHRpb24gdG8gYmUgdGhyb3duIHdoZW4gYXNzaWduaW5nIGEgbm9uLWZ1bmN0aW9uIHZhbHVlIHRvIHRoZSBjb21wYXJhdG9yXG4gKiB1c2VkIHRvIGRldGVybWluZSBpZiBhIHZhbHVlIGNvcnJlc3BvbmRzIHRvIGFuIG9wdGlvbi4gTm90ZSB0aGF0IHdoZXRoZXIgdGhlIGZ1bmN0aW9uXG4gKiBhY3R1YWxseSB0YWtlcyB0d28gdmFsdWVzIGFuZCByZXR1cm5zIGEgYm9vbGVhbiBpcyBub3QgY2hlY2tlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1jU2VsZWN0Tm9uRnVuY3Rpb25WYWx1ZUVycm9yKCk6IEVycm9yIHtcbiAgICByZXR1cm4gRXJyb3IoJ2Bjb21wYXJlV2l0aGAgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xufVxuIl19