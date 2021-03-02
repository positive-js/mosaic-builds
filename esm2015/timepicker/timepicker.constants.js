/**
 * @fileoverview added by tsickle
 * Generated from: timepicker.constants.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const TimeParts = {
    hours: 0,
    minutes: 1,
    seconds: 2,
};
export { TimeParts };
TimeParts[TimeParts.hours] = 'hours';
TimeParts[TimeParts.minutes] = 'minutes';
TimeParts[TimeParts.seconds] = 'seconds';
/** @enum {string} */
const TimeFormats = {
    HHmmss: "HH:mm:ss",
    HHmm: "HH:mm",
};
export { TimeFormats };
/** @type {?} */
export const TIMEFORMAT_PLACEHOLDERS = {
    [TimeFormats.HHmmss]: 'чч:мм:сс',
    [TimeFormats.HHmm]: 'чч:мм'
};
/** @type {?} */
export const DEFAULT_TIME_FORMAT = TimeFormats.HHmm;
/** @type {?} */
export const HOURS_MINUTES_SECONDS_REGEXP = /^([0-1][0-9]|2[0-3]):?([0-5][0-9]):?([0-5][0-9])?$/;
/** @type {?} */
export const HOURS_MINUTES_REGEXP = /^([0-1][0-9]|2[0-3]):?([0-5][0-9])?$/;
/** @type {?} */
export const HOURS_ONLY_REGEXP = /^([0-1][0-9]|2[0-3]):?$/;
/** @type {?} */
export const AM_PM_FORMAT_REGEXP = /^([0-1]?[0-9]):([0-5]?[0-9]) ([ap][m]?$)/i;
/** @type {?} */
export const SECONDS_PER_MINUTE = 59;
/** @type {?} */
export const MINUTES_PER_HOUR = 59;
/** @type {?} */
export const HOURS_PER_DAY = 23;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5jb25zdGFudHMuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy90aW1lcGlja2VyLyIsInNvdXJjZXMiOlsidGltZXBpY2tlci5jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsTUFBWSxTQUFTO0lBQ2pCLEtBQUssR0FBQTtJQUNMLE9BQU8sR0FBQTtJQUNQLE9BQU8sR0FBQTtFQUNWOzs7Ozs7QUFFRCxNQUFZLFdBQVc7SUFDbkIsTUFBTSxZQUFhO0lBQ25CLElBQUksU0FBVTtFQUNqQjs7O0FBRUQsTUFBTSxPQUFPLHVCQUF1QixHQUFxQztJQUNyRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxVQUFVO0lBQ2hDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU87Q0FDOUI7O0FBRUQsTUFBTSxPQUFPLG1CQUFtQixHQUFnQixXQUFXLENBQUMsSUFBSTs7QUFFaEUsTUFBTSxPQUFPLDRCQUE0QixHQUFHLG9EQUFvRDs7QUFDaEcsTUFBTSxPQUFPLG9CQUFvQixHQUFHLHNDQUFzQzs7QUFDMUUsTUFBTSxPQUFPLGlCQUFpQixHQUFHLHlCQUF5Qjs7QUFDMUQsTUFBTSxPQUFPLG1CQUFtQixHQUFHLDJDQUEyQzs7QUFFOUUsTUFBTSxPQUFPLGtCQUFrQixHQUFXLEVBQUU7O0FBQzVDLE1BQU0sT0FBTyxnQkFBZ0IsR0FBVyxFQUFFOztBQUMxQyxNQUFNLE9BQU8sYUFBYSxHQUFXLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGVudW0gVGltZVBhcnRzIHtcbiAgICBob3VycyxcbiAgICBtaW51dGVzLFxuICAgIHNlY29uZHNcbn1cblxuZXhwb3J0IGVudW0gVGltZUZvcm1hdHMge1xuICAgIEhIbW1zcyA9ICdISDptbTpzcycsXG4gICAgSEhtbSA9ICdISDptbSdcbn1cblxuZXhwb3J0IGNvbnN0IFRJTUVGT1JNQVRfUExBQ0VIT0xERVJTOiB7IFt0aW1lRm9ybWF0OiBzdHJpbmddOiBzdHJpbmcgfSA9IHtcbiAgICBbVGltZUZvcm1hdHMuSEhtbXNzXTogJ9GH0Yc60LzQvDrRgdGBJyxcbiAgICBbVGltZUZvcm1hdHMuSEhtbV06ICfRh9GHOtC80LwnXG59O1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9USU1FX0ZPUk1BVDogVGltZUZvcm1hdHMgPSBUaW1lRm9ybWF0cy5ISG1tO1xuXG5leHBvcnQgY29uc3QgSE9VUlNfTUlOVVRFU19TRUNPTkRTX1JFR0VYUCA9IC9eKFswLTFdWzAtOV18MlswLTNdKTo/KFswLTVdWzAtOV0pOj8oWzAtNV1bMC05XSk/JC87XG5leHBvcnQgY29uc3QgSE9VUlNfTUlOVVRFU19SRUdFWFAgPSAvXihbMC0xXVswLTldfDJbMC0zXSk6PyhbMC01XVswLTldKT8kLztcbmV4cG9ydCBjb25zdCBIT1VSU19PTkxZX1JFR0VYUCA9IC9eKFswLTFdWzAtOV18MlswLTNdKTo/JC87XG5leHBvcnQgY29uc3QgQU1fUE1fRk9STUFUX1JFR0VYUCA9IC9eKFswLTFdP1swLTldKTooWzAtNV0/WzAtOV0pIChbYXBdW21dPyQpL2k7XG5cbmV4cG9ydCBjb25zdCBTRUNPTkRTX1BFUl9NSU5VVEU6IG51bWJlciA9IDU5O1xuZXhwb3J0IGNvbnN0IE1JTlVURVNfUEVSX0hPVVI6IG51bWJlciA9IDU5O1xuZXhwb3J0IGNvbnN0IEhPVVJTX1BFUl9EQVk6IG51bWJlciA9IDIzO1xuIl19