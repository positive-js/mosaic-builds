/**
 * @fileoverview added by tsickle
 * Generated from: select/errors.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvY29yZS8iLCJzb3VyY2VzIjpbInNlbGVjdC9lcnJvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFLQSxNQUFNLFVBQVUsK0JBQStCO0lBQzNDLE9BQU8sS0FBSyxDQUFDLCtEQUErRCxDQUFDLENBQUM7QUFDbEYsQ0FBQzs7Ozs7Ozs7QUFRRCxNQUFNLFVBQVUsNkJBQTZCO0lBQ3pDLE9BQU8sS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7QUFDdkUsQ0FBQzs7Ozs7OztBQU9ELE1BQU0sVUFBVSxnQ0FBZ0M7SUFDNUMsT0FBTyxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztBQUN0RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBSZXR1cm5zIGFuIGV4Y2VwdGlvbiB0byBiZSB0aHJvd24gd2hlbiBhdHRlbXB0aW5nIHRvIGNoYW5nZSBhIHNlbGVjdCdzIGBtdWx0aXBsZWAgb3B0aW9uXG4gKiBhZnRlciBpbml0aWFsaXphdGlvbi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1jU2VsZWN0RHluYW1pY011bHRpcGxlRXJyb3IoKTogRXJyb3Ige1xuICAgIHJldHVybiBFcnJvcignQ2Fubm90IGNoYW5nZSBgbXVsdGlwbGVgIG1vZGUgb2Ygc2VsZWN0IGFmdGVyIGluaXRpYWxpemF0aW9uLicpO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gZXhjZXB0aW9uIHRvIGJlIHRocm93biB3aGVuIGF0dGVtcHRpbmcgdG8gYXNzaWduIGEgbm9uLWFycmF5IHZhbHVlIHRvIGEgc2VsZWN0XG4gKiBpbiBgbXVsdGlwbGVgIG1vZGUuIE5vdGUgdGhhdCBgdW5kZWZpbmVkYCBhbmQgYG51bGxgIGFyZSBzdGlsbCB2YWxpZCB2YWx1ZXMgdG8gYWxsb3cgZm9yXG4gKiByZXNldHRpbmcgdGhlIHZhbHVlLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWNTZWxlY3ROb25BcnJheVZhbHVlRXJyb3IoKTogRXJyb3Ige1xuICAgIHJldHVybiBFcnJvcignVmFsdWUgbXVzdCBiZSBhbiBhcnJheSBpbiBtdWx0aXBsZS1zZWxlY3Rpb24gbW9kZS4nKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIGV4Y2VwdGlvbiB0byBiZSB0aHJvd24gd2hlbiBhc3NpZ25pbmcgYSBub24tZnVuY3Rpb24gdmFsdWUgdG8gdGhlIGNvbXBhcmF0b3JcbiAqIHVzZWQgdG8gZGV0ZXJtaW5lIGlmIGEgdmFsdWUgY29ycmVzcG9uZHMgdG8gYW4gb3B0aW9uLiBOb3RlIHRoYXQgd2hldGhlciB0aGUgZnVuY3Rpb25cbiAqIGFjdHVhbGx5IHRha2VzIHR3byB2YWx1ZXMgYW5kIHJldHVybnMgYSBib29sZWFuIGlzIG5vdCBjaGVja2VkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWNTZWxlY3ROb25GdW5jdGlvblZhbHVlRXJyb3IoKTogRXJyb3Ige1xuICAgIHJldHVybiBFcnJvcignYGNvbXBhcmVXaXRoYCBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG59XG4iXX0=