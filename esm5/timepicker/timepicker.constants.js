var _a;
/**
 * @fileoverview added by tsickle
 * Generated from: timepicker.constants.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var TimeParts = {
    hours: 0,
    minutes: 1,
    seconds: 2,
};
export { TimeParts };
TimeParts[TimeParts.hours] = 'hours';
TimeParts[TimeParts.minutes] = 'minutes';
TimeParts[TimeParts.seconds] = 'seconds';
/** @enum {string} */
var TimeFormats = {
    HHmmss: "HH:mm:ss",
    HHmm: "HH:mm",
};
export { TimeFormats };
/** @type {?} */
export var TIMEFORMAT_PLACEHOLDERS = (_a = {},
    _a[TimeFormats.HHmmss] = '  :  :  ',
    _a[TimeFormats.HHmm] = '  :  ',
    _a);
/** @type {?} */
export var DEFAULT_TIME_FORMAT = TimeFormats.HHmm;
/** @type {?} */
export var HOURS_MINUTES_SECONDS_REGEXP = /^([0-1][0-9]|2[0-3]):?([0-5][0-9]):?([0-5][0-9])?$/;
/** @type {?} */
export var HOURS_MINUTES_REGEXP = /^([0-1][0-9]|2[0-3]):?([0-5][0-9])?$/;
/** @type {?} */
export var HOURS_ONLY_REGEXP = /^([0-1][0-9]|2[0-3]):?$/;
/** @type {?} */
export var AM_PM_FORMAT_REGEXP = /^([0-1]?[0-9]):([0-5]?[0-9]) ([ap][m]?$)/i;
/** @type {?} */
export var SECONDS_PER_MINUTE = 59;
/** @type {?} */
export var MINUTES_PER_HOUR = 59;
/** @type {?} */
export var HOURS_PER_DAY = 23;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5jb25zdGFudHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInRpbWVwaWNrZXIuY29uc3RhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSxJQUFZLFNBQVM7SUFDakIsS0FBSyxHQUFBO0lBQ0wsT0FBTyxHQUFBO0lBQ1AsT0FBTyxHQUFBO0VBQ1Y7Ozs7OztBQUVELElBQVksV0FBVztJQUNuQixNQUFNLFlBQWE7SUFDbkIsSUFBSSxTQUFVO0VBQ2pCOzs7QUFFRCxNQUFNLEtBQU8sdUJBQXVCO0lBQ2hDLEdBQUMsV0FBVyxDQUFDLE1BQU0sSUFBRyxVQUFVO0lBQ2hDLEdBQUMsV0FBVyxDQUFDLElBQUksSUFBRyxPQUFPO09BQzlCOztBQUVELE1BQU0sS0FBTyxtQkFBbUIsR0FBZ0IsV0FBVyxDQUFDLElBQUk7O0FBRWhFLE1BQU0sS0FBTyw0QkFBNEIsR0FBRyxvREFBb0Q7O0FBQ2hHLE1BQU0sS0FBTyxvQkFBb0IsR0FBRyxzQ0FBc0M7O0FBQzFFLE1BQU0sS0FBTyxpQkFBaUIsR0FBRyx5QkFBeUI7O0FBQzFELE1BQU0sS0FBTyxtQkFBbUIsR0FBRywyQ0FBMkM7O0FBRTlFLE1BQU0sS0FBTyxrQkFBa0IsR0FBVyxFQUFFOztBQUM1QyxNQUFNLEtBQU8sZ0JBQWdCLEdBQVcsRUFBRTs7QUFDMUMsTUFBTSxLQUFPLGFBQWEsR0FBVyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBlbnVtIFRpbWVQYXJ0cyB7XG4gICAgaG91cnMsXG4gICAgbWludXRlcyxcbiAgICBzZWNvbmRzXG59XG5cbmV4cG9ydCBlbnVtIFRpbWVGb3JtYXRzIHtcbiAgICBISG1tc3MgPSAnSEg6bW06c3MnLFxuICAgIEhIbW0gPSAnSEg6bW0nXG59XG5cbmV4cG9ydCBjb25zdCBUSU1FRk9STUFUX1BMQUNFSE9MREVSUzogeyBbdGltZUZvcm1hdDogc3RyaW5nXTogc3RyaW5nIH0gPSB7XG4gICAgW1RpbWVGb3JtYXRzLkhIbW1zc106ICcgIDogIDogICcsXG4gICAgW1RpbWVGb3JtYXRzLkhIbW1dOiAnICA6ICAnXG59O1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9USU1FX0ZPUk1BVDogVGltZUZvcm1hdHMgPSBUaW1lRm9ybWF0cy5ISG1tO1xuXG5leHBvcnQgY29uc3QgSE9VUlNfTUlOVVRFU19TRUNPTkRTX1JFR0VYUCA9IC9eKFswLTFdWzAtOV18MlswLTNdKTo/KFswLTVdWzAtOV0pOj8oWzAtNV1bMC05XSk/JC87XG5leHBvcnQgY29uc3QgSE9VUlNfTUlOVVRFU19SRUdFWFAgPSAvXihbMC0xXVswLTldfDJbMC0zXSk6PyhbMC01XVswLTldKT8kLztcbmV4cG9ydCBjb25zdCBIT1VSU19PTkxZX1JFR0VYUCA9IC9eKFswLTFdWzAtOV18MlswLTNdKTo/JC87XG5leHBvcnQgY29uc3QgQU1fUE1fRk9STUFUX1JFR0VYUCA9IC9eKFswLTFdP1swLTldKTooWzAtNV0/WzAtOV0pIChbYXBdW21dPyQpL2k7XG5cbmV4cG9ydCBjb25zdCBTRUNPTkRTX1BFUl9NSU5VVEU6IG51bWJlciA9IDU5O1xuZXhwb3J0IGNvbnN0IE1JTlVURVNfUEVSX0hPVVI6IG51bWJlciA9IDU5O1xuZXhwb3J0IGNvbnN0IEhPVVJTX1BFUl9EQVk6IG51bWJlciA9IDIzO1xuIl19