// tslint:disable:naming-convention
export var TimeParts;
(function (TimeParts) {
    TimeParts[TimeParts["hours"] = 0] = "hours";
    TimeParts[TimeParts["minutes"] = 1] = "minutes";
    TimeParts[TimeParts["seconds"] = 2] = "seconds";
})(TimeParts || (TimeParts = {}));
export var TimeFormats;
(function (TimeFormats) {
    TimeFormats["HHmmss"] = "HH:mm:ss";
    TimeFormats["HHmm"] = "HH:mm";
})(TimeFormats || (TimeFormats = {}));
export const TIMEFORMAT_PLACEHOLDERS = {
    [TimeFormats.HHmmss]: 'чч:мм:сс',
    [TimeFormats.HHmm]: 'чч:мм'
};
export const DEFAULT_TIME_FORMAT = TimeFormats.HHmm;
export const HOURS_MINUTES_SECONDS_REGEXP = /^([0-1][0-9]|2[0-3]):?([0-5][0-9]):?([0-5][0-9])?$/;
export const HOURS_MINUTES_REGEXP = /^([0-1][0-9]|2[0-3]):?([0-5][0-9])?$/;
export const HOURS_ONLY_REGEXP = /^([0-1][0-9]|2[0-3]):?$/;
export const AM_PM_FORMAT_REGEXP = /^([0-1]?[0-9]):([0-5]?[0-9]) ([ap][m]?$)/i;
export const SECONDS_PER_MINUTE = 59;
export const MINUTES_PER_HOUR = 59;
export const HOURS_PER_DAY = 23;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5jb25zdGFudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdGltZXBpY2tlci90aW1lcGlja2VyLmNvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxtQ0FBbUM7QUFDbkMsTUFBTSxDQUFOLElBQVksU0FJWDtBQUpELFdBQVksU0FBUztJQUNqQiwyQ0FBSyxDQUFBO0lBQ0wsK0NBQU8sQ0FBQTtJQUNQLCtDQUFPLENBQUE7QUFDWCxDQUFDLEVBSlcsU0FBUyxLQUFULFNBQVMsUUFJcEI7QUFFRCxNQUFNLENBQU4sSUFBWSxXQUdYO0FBSEQsV0FBWSxXQUFXO0lBQ25CLGtDQUFtQixDQUFBO0lBQ25CLDZCQUFjLENBQUE7QUFDbEIsQ0FBQyxFQUhXLFdBQVcsS0FBWCxXQUFXLFFBR3RCO0FBRUQsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQXFDO0lBQ3JFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFVBQVU7SUFDaEMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTztDQUM5QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQWdCLFdBQVcsQ0FBQyxJQUFJLENBQUM7QUFFakUsTUFBTSxDQUFDLE1BQU0sNEJBQTRCLEdBQUcsb0RBQW9ELENBQUM7QUFDakcsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsc0NBQXNDLENBQUM7QUFDM0UsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcseUJBQXlCLENBQUM7QUFDM0QsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsMkNBQTJDLENBQUM7QUFFL0UsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQVcsRUFBRSxDQUFDO0FBQzdDLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFXLEVBQUUsQ0FBQztBQUMzQyxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQVcsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBlbnVtIFRpbWVQYXJ0cyB7XG4gICAgaG91cnMsXG4gICAgbWludXRlcyxcbiAgICBzZWNvbmRzXG59XG5cbmV4cG9ydCBlbnVtIFRpbWVGb3JtYXRzIHtcbiAgICBISG1tc3MgPSAnSEg6bW06c3MnLFxuICAgIEhIbW0gPSAnSEg6bW0nXG59XG5cbmV4cG9ydCBjb25zdCBUSU1FRk9STUFUX1BMQUNFSE9MREVSUzogeyBbdGltZUZvcm1hdDogc3RyaW5nXTogc3RyaW5nIH0gPSB7XG4gICAgW1RpbWVGb3JtYXRzLkhIbW1zc106ICfRh9GHOtC80Lw60YHRgScsXG4gICAgW1RpbWVGb3JtYXRzLkhIbW1dOiAn0YfRhzrQvNC8J1xufTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfVElNRV9GT1JNQVQ6IFRpbWVGb3JtYXRzID0gVGltZUZvcm1hdHMuSEhtbTtcblxuZXhwb3J0IGNvbnN0IEhPVVJTX01JTlVURVNfU0VDT05EU19SRUdFWFAgPSAvXihbMC0xXVswLTldfDJbMC0zXSk6PyhbMC01XVswLTldKTo/KFswLTVdWzAtOV0pPyQvO1xuZXhwb3J0IGNvbnN0IEhPVVJTX01JTlVURVNfUkVHRVhQID0gL14oWzAtMV1bMC05XXwyWzAtM10pOj8oWzAtNV1bMC05XSk/JC87XG5leHBvcnQgY29uc3QgSE9VUlNfT05MWV9SRUdFWFAgPSAvXihbMC0xXVswLTldfDJbMC0zXSk6PyQvO1xuZXhwb3J0IGNvbnN0IEFNX1BNX0ZPUk1BVF9SRUdFWFAgPSAvXihbMC0xXT9bMC05XSk6KFswLTVdP1swLTldKSAoW2FwXVttXT8kKS9pO1xuXG5leHBvcnQgY29uc3QgU0VDT05EU19QRVJfTUlOVVRFOiBudW1iZXIgPSA1OTtcbmV4cG9ydCBjb25zdCBNSU5VVEVTX1BFUl9IT1VSOiBudW1iZXIgPSA1OTtcbmV4cG9ydCBjb25zdCBIT1VSU19QRVJfREFZOiBudW1iZXIgPSAyMztcbiJdfQ==