import { DateAdapter } from '@ptsecurity/cdk/datetime';
import * as i0 from "@angular/core";
/**
 * interface for absolute date or datetime formatter template
 */
export interface FormatterAbsoluteTemplate {
    variables?: {
        [name: string]: string;
    };
    DATE: string;
    DATETIME: string;
}
/**
 * interface for range date or datetime formatter template
 */
export interface FormatterRangeTemplate {
    variables?: {
        [name: string]: string;
    };
    START_DATE: string;
    END_DATE: string;
    DATE: string;
    START_DATETIME: string;
    END_DATETIME: string;
    DATETIME: string;
}
/**
 * interface for relative date or datetime formatter template
 */
export interface FormatterRelativeTemplate {
    variables?: {
        [name: string]: string;
    };
    BEFORE_YESTERDAY: string;
    YESTERDAY: string;
    TODAY: string;
    TOMORROW: string;
    AFTER_TOMORROW: string;
}
export interface AbsoluteDateTimeOptions {
    milliseconds?: boolean;
}
export interface FormatterConfig {
    relativeTemplates: {
        short: FormatterRelativeTemplate;
        long: FormatterRelativeTemplate;
    };
    absoluteTemplates: {
        short: FormatterAbsoluteTemplate;
        long: FormatterAbsoluteTemplate;
    };
    rangeTemplates: {
        closedRange: {
            short: FormatterRangeTemplate;
            middle: FormatterRangeTemplate;
            long: FormatterRangeTemplate;
        };
        openedRange: {
            short: FormatterRangeTemplate;
            long: FormatterRangeTemplate;
        };
    };
}
export declare class DateFormatter<D> {
    private readonly adapter;
    config: FormatterConfig;
    private readonly invalidDateErrorText;
    private messageFormat;
    constructor(adapter: DateAdapter<D>, locale: string);
    setLocale(locale: string): void;
    /**
     * @param date - date
     * @param template - template
     * @returns relative date by template
     */
    relativeDate(date: D, template: FormatterRelativeTemplate): string;
    /**
     * @param date - date
     * @returns relative date in short format
     */
    relativeShortDate(date: D): string;
    /**
     * @param date - date
     * @returns relative date in long format
     */
    relativeLongDate(date: D): string;
    /**
     * @param date - date
     * @param params - parameters
     * @param datetime - should time be shown as well
     * @param milliseconds - should time with milliseconds be shown as well
     * @returns absolute date in common format
     */
    absoluteDate(date: D, params: FormatterAbsoluteTemplate, datetime?: boolean, milliseconds?: boolean): string;
    /**
     * @param date - date
     * @returns absolute date in short format
     */
    absoluteShortDate(date: D): string;
    /**
     * @param date - date
     * @param options - AbsoluteDateTimeOptions
     * @returns absolute date in short format with time
     */
    absoluteShortDateTime(date: D, options?: AbsoluteDateTimeOptions): string;
    /**
     * @param date - date
     * @returns absolute date in long format
     */
    absoluteLongDate(date: D): string;
    /**
     * @param date - date
     * @param options - AbsoluteDateTimeOptions
     * @returns absolute date in long format with time
     */
    absoluteLongDateTime(date: D, options?: AbsoluteDateTimeOptions): string;
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @param template - template
     * @returns opened date
     */
    openedRangeDate(startDate: D | null, endDate: D | null, template: FormatterRangeTemplate): string;
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @param template - template
     * @returns opened date
     */
    openedRangeDateTime(startDate: D | null, endDate: D | null, template: FormatterRangeTemplate): string;
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @param template - template
     * @returns range date in template format
     */
    rangeDate(startDate: D, endDate: D, template: FormatterRangeTemplate): string;
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @param template - template
     * @returns range date in template format with time
     */
    rangeDateTime(startDate: D, endDate: D, template: FormatterRangeTemplate): string;
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @returns range date in short format
     */
    rangeShortDate(startDate: D | null, endDate?: D): string;
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @returns range date in short format with time
     */
    rangeShortDateTime(startDate: D | null, endDate?: D): string;
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @returns range date in long format
     */
    rangeLongDate(startDate: D | null, endDate?: D): string;
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @returns range date in long format with time
     */
    rangeLongDateTime(startDate: D | null, endDate?: D): string;
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @returns range middle date with time
     */
    rangeMiddleDateTime(startDate: D, endDate: D): string;
    private compileVariables;
    private isBeforeYesterday;
    private isYesterday;
    private isToday;
    private isTomorrow;
    private isAfterTomorrow;
    private hasSame;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateFormatter<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DateFormatter<any>>;
}
