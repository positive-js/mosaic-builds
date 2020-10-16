/**
 * @fileoverview added by tsickle
 * Generated from: dropdown-errors.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tZXJyb3JzLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvZHJvcGRvd24vIiwic291cmNlcyI6WyJkcm9wZG93bi1lcnJvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUlBLE1BQU0sVUFBVSwyQkFBMkI7SUFDdkMsTUFBTSxLQUFLLENBQUM7OzswREFHMEMsQ0FBQyxDQUFDO0FBQzVELENBQUM7Ozs7Ozs7QUFPRCxNQUFNLFVBQVUsK0JBQStCO0lBQzNDLE1BQU0sS0FBSyxDQUFDO3FGQUNxRSxDQUFDLENBQUM7QUFDdkYsQ0FBQzs7Ozs7OztBQU9ELE1BQU0sVUFBVSwrQkFBK0I7SUFDM0MsTUFBTSxLQUFLLENBQUM7b0ZBQ29FLENBQUMsQ0FBQztBQUN0RixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUaHJvd3MgYW4gZXhjZXB0aW9uIGZvciB0aGUgY2FzZSB3aGVuIGRyb3Bkb3duIHRyaWdnZXIgZG9lc24ndCBoYXZlIGEgdmFsaWQgbWMtZHJvcGRvd24gaW5zdGFuY2VcbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRocm93TWNEcm9wZG93bk1pc3NpbmdFcnJvcigpIHtcbiAgICB0aHJvdyBFcnJvcihgbWNEcm9wZG93blRyaWdnZXJGb3I6IG11c3QgcGFzcyBpbiBhbiBtYy1kcm9wZG93biBpbnN0YW5jZS5cbiAgICBFeGFtcGxlOlxuICAgICAgPG1jLWRyb3Bkb3duICNkcm9wZG93bj1cIm1jRHJvcGRvd25cIj48L21jLWRyb3Bkb3duPlxuICAgICAgPGJ1dHRvbiBbbWNEcm9wZG93blRyaWdnZXJGb3JdPVwiZHJvcGRvd25cIj48L2J1dHRvbj5gKTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYW4gZXhjZXB0aW9uIGZvciB0aGUgY2FzZSB3aGVuIGRyb3Bkb3duJ3MgeC1wb3NpdGlvbiB2YWx1ZSBpc24ndCB2YWxpZC5cbiAqIEluIG90aGVyIHdvcmRzLCBpdCBkb2Vzbid0IG1hdGNoICdiZWZvcmUnIG9yICdhZnRlcicuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0aHJvd01jRHJvcGRvd25JbnZhbGlkUG9zaXRpb25YKCkge1xuICAgIHRocm93IEVycm9yKGB4UG9zaXRpb24gdmFsdWUgbXVzdCBiZSBlaXRoZXIgJ2JlZm9yZScgb3IgYWZ0ZXInLlxuICAgICAgRXhhbXBsZTogPG1jLWRyb3Bkb3duIHhQb3NpdGlvbj1cImJlZm9yZVwiICNkcm9wZG93bj1cIm1jRHJvcGRvd25cIj48L21jLWRyb3Bkb3duPmApO1xufVxuXG4vKipcbiAqIFRocm93cyBhbiBleGNlcHRpb24gZm9yIHRoZSBjYXNlIHdoZW4gZHJvcGRvd24ncyB5LXBvc2l0aW9uIHZhbHVlIGlzbid0IHZhbGlkLlxuICogSW4gb3RoZXIgd29yZHMsIGl0IGRvZXNuJ3QgbWF0Y2ggJ2Fib3ZlJyBvciAnYmVsb3cnLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhyb3dNY0Ryb3Bkb3duSW52YWxpZFBvc2l0aW9uWSgpIHtcbiAgICB0aHJvdyBFcnJvcihgeVBvc2l0aW9uIHZhbHVlIG11c3QgYmUgZWl0aGVyICdhYm92ZScgb3IgYmVsb3cnLlxuICAgICAgRXhhbXBsZTogPG1jLWRyb3Bkb3duIHlQb3NpdGlvbj1cImFib3ZlXCIgI2Ryb3Bkb3duPVwibWNEcm9wZG93blwiPjwvbWMtZHJvcGRvd24+YCk7XG59XG4iXX0=