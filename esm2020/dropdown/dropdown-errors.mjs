/**
 * Throws an exception for the case when dropdown trigger doesn't have a valid mc-dropdown instance
 * @docs-private
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
 * @docs-private
 */
export function throwMcDropdownInvalidPositionX() {
    throw Error(`xPosition value must be either 'before' or after'.
      Example: <mc-dropdown [xPosition]="'before'" #dropdown="mcDropdown"></mc-dropdown>`);
}
/**
 * Throws an exception for the case when dropdown's y-position value isn't valid.
 * In other words, it doesn't match 'above' or 'below'.
 * @docs-private
 */
export function throwMcDropdownInvalidPositionY() {
    throw Error(`yPosition value must be either 'above' or below'.
      Example: <mc-dropdown [yPosition]="'above'" #dropdown="mcDropdown"></mc-dropdown>`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2Ryb3Bkb3duL2Ryb3Bkb3duLWVycm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsMkJBQTJCO0lBQ3ZDLE1BQU0sS0FBSyxDQUFDOzs7MERBRzBDLENBQUMsQ0FBQztBQUM1RCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSwrQkFBK0I7SUFDM0MsTUFBTSxLQUFLLENBQUM7eUZBQ3lFLENBQUMsQ0FBQztBQUMzRixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSwrQkFBK0I7SUFDM0MsTUFBTSxLQUFLLENBQUM7d0ZBQ3dFLENBQUMsQ0FBQztBQUMxRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUaHJvd3MgYW4gZXhjZXB0aW9uIGZvciB0aGUgY2FzZSB3aGVuIGRyb3Bkb3duIHRyaWdnZXIgZG9lc24ndCBoYXZlIGEgdmFsaWQgbWMtZHJvcGRvd24gaW5zdGFuY2VcbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRocm93TWNEcm9wZG93bk1pc3NpbmdFcnJvcigpIHtcbiAgICB0aHJvdyBFcnJvcihgbWNEcm9wZG93blRyaWdnZXJGb3I6IG11c3QgcGFzcyBpbiBhbiBtYy1kcm9wZG93biBpbnN0YW5jZS5cbiAgICBFeGFtcGxlOlxuICAgICAgPG1jLWRyb3Bkb3duICNkcm9wZG93bj1cIm1jRHJvcGRvd25cIj48L21jLWRyb3Bkb3duPlxuICAgICAgPGJ1dHRvbiBbbWNEcm9wZG93blRyaWdnZXJGb3JdPVwiZHJvcGRvd25cIj48L2J1dHRvbj5gKTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYW4gZXhjZXB0aW9uIGZvciB0aGUgY2FzZSB3aGVuIGRyb3Bkb3duJ3MgeC1wb3NpdGlvbiB2YWx1ZSBpc24ndCB2YWxpZC5cbiAqIEluIG90aGVyIHdvcmRzLCBpdCBkb2Vzbid0IG1hdGNoICdiZWZvcmUnIG9yICdhZnRlcicuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0aHJvd01jRHJvcGRvd25JbnZhbGlkUG9zaXRpb25YKCkge1xuICAgIHRocm93IEVycm9yKGB4UG9zaXRpb24gdmFsdWUgbXVzdCBiZSBlaXRoZXIgJ2JlZm9yZScgb3IgYWZ0ZXInLlxuICAgICAgRXhhbXBsZTogPG1jLWRyb3Bkb3duIFt4UG9zaXRpb25dPVwiJ2JlZm9yZSdcIiAjZHJvcGRvd249XCJtY0Ryb3Bkb3duXCI+PC9tYy1kcm9wZG93bj5gKTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYW4gZXhjZXB0aW9uIGZvciB0aGUgY2FzZSB3aGVuIGRyb3Bkb3duJ3MgeS1wb3NpdGlvbiB2YWx1ZSBpc24ndCB2YWxpZC5cbiAqIEluIG90aGVyIHdvcmRzLCBpdCBkb2Vzbid0IG1hdGNoICdhYm92ZScgb3IgJ2JlbG93Jy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRocm93TWNEcm9wZG93bkludmFsaWRQb3NpdGlvblkoKSB7XG4gICAgdGhyb3cgRXJyb3IoYHlQb3NpdGlvbiB2YWx1ZSBtdXN0IGJlIGVpdGhlciAnYWJvdmUnIG9yIGJlbG93Jy5cbiAgICAgIEV4YW1wbGU6IDxtYy1kcm9wZG93biBbeVBvc2l0aW9uXT1cIidhYm92ZSdcIiAjZHJvcGRvd249XCJtY0Ryb3Bkb3duXCI+PC9tYy1kcm9wZG93bj5gKTtcbn1cbiJdfQ==