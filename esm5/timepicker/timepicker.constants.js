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
export var HOURS_MINUTES_SECONDS_REGEXP = new RegExp(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]|[0-9]):([0-5][0-9]|[0-9])?$/);
/** @type {?} */
export var HOURS_MINUTES_REGEXP = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]|[0-9])?$/;
/** @type {?} */
export var HOURS_ONLY_REGEXP = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):?$/;
/** @type {?} */
export var SECONDS_PER_MINUTE = 59;
/** @type {?} */
export var MINUTES_PER_HOUR = 59;
/** @type {?} */
export var HOURS_PER_DAY = 23;
// TODO Move it to common CDK
/** @type {?} */
export var ARROW_UP_KEYCODE = 'ArrowUp';
/** @type {?} */
export var ARROW_DOWN_KEYCODE = 'ArrowDown';
/** @type {?} */
export var ARROW_LEFT_KEYCODE = 'ArrowLeft';
/** @type {?} */
export var ARROW_RIGHT_KEYCODE = 'ArrowRight';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5jb25zdGFudHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInRpbWVwaWNrZXIuY29uc3RhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSxJQUFZLFNBQVM7SUFDakIsS0FBSyxHQUFBO0lBQ0wsT0FBTyxHQUFBO0lBQ1AsT0FBTyxHQUFBO0VBQ1Y7Ozs7OztBQUVELElBQVksV0FBVztJQUNuQixNQUFNLFlBQWE7SUFDbkIsSUFBSSxTQUFVO0VBQ2pCOzs7QUFFRCxNQUFNLEtBQU8sdUJBQXVCO0lBQ2hDLEdBQUMsV0FBVyxDQUFDLE1BQU0sSUFBRyxVQUFVO0lBQ2hDLEdBQUMsV0FBVyxDQUFDLElBQUksSUFBRyxPQUFPO09BQzlCOztBQUVELE1BQU0sS0FBTyxtQkFBbUIsR0FBZ0IsV0FBVyxDQUFDLElBQUk7O0FBRWhFLE1BQU0sS0FBTyw0QkFBNEIsR0FDckMsSUFBSSxNQUFNLENBQUMsdUVBQXVFLENBQUM7O0FBQ3ZGLE1BQU0sS0FBTyxvQkFBb0IsR0FBRyxvREFBb0Q7O0FBQ3hGLE1BQU0sS0FBTyxpQkFBaUIsR0FBRyxrQ0FBa0M7O0FBRW5FLE1BQU0sS0FBTyxrQkFBa0IsR0FBVyxFQUFFOztBQUM1QyxNQUFNLEtBQU8sZ0JBQWdCLEdBQVcsRUFBRTs7QUFDMUMsTUFBTSxLQUFPLGFBQWEsR0FBVyxFQUFFOzs7QUFHdkMsTUFBTSxLQUFPLGdCQUFnQixHQUFXLFNBQVM7O0FBQ2pELE1BQU0sS0FBTyxrQkFBa0IsR0FBVyxXQUFXOztBQUNyRCxNQUFNLEtBQU8sa0JBQWtCLEdBQVcsV0FBVzs7QUFDckQsTUFBTSxLQUFPLG1CQUFtQixHQUFXLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGVudW0gVGltZVBhcnRzIHtcbiAgICBob3VycyxcbiAgICBtaW51dGVzLFxuICAgIHNlY29uZHNcbn1cblxuZXhwb3J0IGVudW0gVGltZUZvcm1hdHMge1xuICAgIEhIbW1zcyA9ICdISDptbTpzcycsXG4gICAgSEhtbSA9ICdISDptbSdcbn1cblxuZXhwb3J0IGNvbnN0IFRJTUVGT1JNQVRfUExBQ0VIT0xERVJTOiB7IFt0aW1lRm9ybWF0OiBzdHJpbmddOiBzdHJpbmcgfSA9IHtcbiAgICBbVGltZUZvcm1hdHMuSEhtbXNzXTogJyAgOiAgOiAgJyxcbiAgICBbVGltZUZvcm1hdHMuSEhtbV06ICcgIDogICdcbn07XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1RJTUVfRk9STUFUOiBUaW1lRm9ybWF0cyA9IFRpbWVGb3JtYXRzLkhIbW07XG5cbmV4cG9ydCBjb25zdCBIT1VSU19NSU5VVEVTX1NFQ09ORFNfUkVHRVhQID1cbiAgICBuZXcgUmVnRXhwKC9eKFswLTldfDBbMC05XXwxWzAtOV18MlswLTNdKTooWzAtNV1bMC05XXxbMC05XSk6KFswLTVdWzAtOV18WzAtOV0pPyQvKTtcbmV4cG9ydCBjb25zdCBIT1VSU19NSU5VVEVTX1JFR0VYUCA9IC9eKFswLTldfDBbMC05XXwxWzAtOV18MlswLTNdKTooWzAtNV1bMC05XXxbMC05XSk/JC87XG5leHBvcnQgY29uc3QgSE9VUlNfT05MWV9SRUdFWFAgPSAvXihbMC05XXwwWzAtOV18MVswLTldfDJbMC0zXSk6PyQvO1xuXG5leHBvcnQgY29uc3QgU0VDT05EU19QRVJfTUlOVVRFOiBudW1iZXIgPSA1OTtcbmV4cG9ydCBjb25zdCBNSU5VVEVTX1BFUl9IT1VSOiBudW1iZXIgPSA1OTtcbmV4cG9ydCBjb25zdCBIT1VSU19QRVJfREFZOiBudW1iZXIgPSAyMztcblxuLy8gVE9ETyBNb3ZlIGl0IHRvIGNvbW1vbiBDREtcbmV4cG9ydCBjb25zdCBBUlJPV19VUF9LRVlDT0RFOiBzdHJpbmcgPSAnQXJyb3dVcCc7XG5leHBvcnQgY29uc3QgQVJST1dfRE9XTl9LRVlDT0RFOiBzdHJpbmcgPSAnQXJyb3dEb3duJztcbmV4cG9ydCBjb25zdCBBUlJPV19MRUZUX0tFWUNPREU6IHN0cmluZyA9ICdBcnJvd0xlZnQnO1xuZXhwb3J0IGNvbnN0IEFSUk9XX1JJR0hUX0tFWUNPREU6IHN0cmluZyA9ICdBcnJvd1JpZ2h0JztcbiJdfQ==