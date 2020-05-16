export declare enum TimeParts {
    hours = 0,
    minutes = 1,
    seconds = 2
}
export declare enum TimeFormats {
    HHmmss = "HH:mm:ss",
    HHmm = "HH:mm"
}
export declare const TIMEFORMAT_PLACEHOLDERS: {
    [timeFormat: string]: string;
};
export declare const DEFAULT_TIME_FORMAT: TimeFormats;
export declare const HOURS_MINUTES_SECONDS_REGEXP: RegExp;
export declare const HOURS_MINUTES_REGEXP: RegExp;
export declare const HOURS_ONLY_REGEXP: RegExp;
export declare const AM_PM_FORMAT_REGEXP: RegExp;
export declare const SECONDS_PER_MINUTE: number;
export declare const MINUTES_PER_HOUR: number;
export declare const HOURS_PER_DAY: number;
