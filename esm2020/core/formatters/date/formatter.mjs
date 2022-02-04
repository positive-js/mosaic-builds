// tslint:disable:no-magic-numbers
import { Inject, Injectable } from '@angular/core';
// tslint:disable:import-name
import MessageFormat from '@messageformat/core';
import { DateAdapter, MC_DATE_LOCALE } from '@ptsecurity/cdk/datetime';
import { enUS } from './templates/en-US';
import { ruRU } from './templates/ru-RU';
import * as i0 from "@angular/core";
import * as i1 from "@ptsecurity/cdk/datetime";
export class DateFormatter {
    constructor(adapter, locale) {
        this.adapter = adapter;
        this.invalidDateErrorText = 'Invalid date';
        this.config = locale === 'en' ? enUS : ruRU;
        this.messageFormat = new MessageFormat(locale);
    }
    setLocale(locale) {
        this.config = locale === 'en' ? enUS : ruRU;
        this.adapter.setLocale(locale);
    }
    /**
     * @param date - date
     * @param template - template
     * @returns relative date by template
     */
    relativeDate(date, template, seconds = false, milliseconds = false) {
        if (!this.adapter.isDateInstance(date)) {
            throw new Error(this.invalidDateErrorText);
        }
        let newTemplate;
        const templateVariables = { ...this.adapter.config.variables, ...template.variables };
        if (this.isBeforeYesterday(date)) {
            newTemplate = template.BEFORE_YESTERDAY;
        }
        else if (this.isYesterday(date)) {
            newTemplate = template.YESTERDAY;
        }
        else if (this.isToday(date)) {
            newTemplate = template.TODAY;
        }
        else if (this.isTomorrow(date)) {
            newTemplate = template.TOMORROW;
        }
        else if (this.isAfterTomorrow(date)) {
            newTemplate = template.AFTER_TOMORROW;
        }
        const variables = this.compileVariables(date, templateVariables);
        variables.SHOW_SECONDS = seconds ? 'yes' : 'no';
        variables.SHOW_MILLISECONDS = milliseconds ? 'yes' : 'no';
        return this.messageFormat.compile(newTemplate)(variables);
    }
    /**
     * @param date - date
     * @returns relative date in short format
     */
    relativeShortDate(date) {
        return this.relativeDate(date, this.config.relativeTemplates.short);
    }
    /**
     * @param date - date
     * @returns relative date in long format
     */
    relativeLongDate(date) {
        return this.relativeDate(date, this.config.relativeTemplates.long);
    }
    /**
     * @param date - date
     * @param options - DateTimeOptions
     * @returns relative date in short format with time
     */
    relativeShortDateTime(date, options) {
        return this.relativeDate(date, this.config.relativeTemplates.short, options?.seconds, options?.milliseconds);
    }
    /**
     * @param date - date
     * @param options - DateTimeOptions
     * @returns relative date in long format with time
     */
    relativeLongDateTime(date, options) {
        return this.relativeDate(date, this.config.relativeTemplates.long, options?.seconds, options?.milliseconds);
    }
    /**
     * @param date - date
     * @param params - parameters
     * @param datetime - should time be shown as well
     * @param seconds - should time with seconds be shown as well
     * @param milliseconds - should time with milliseconds be shown as well
     * @returns absolute date in common format
     */
    absoluteDate(date, params, datetime = false, seconds = false, milliseconds = false) {
        if (!this.adapter.isDateInstance(date)) {
            throw new Error(this.invalidDateErrorText);
        }
        const variables = this.compileVariables(date, { ...this.adapter.config.variables, ...params.variables });
        variables.SHOW_SECONDS = seconds ? 'yes' : 'no';
        variables.SHOW_MILLISECONDS = milliseconds ? 'yes' : 'no';
        const template = datetime ? params.DATETIME : params.DATE;
        return this.messageFormat.compile(template)(variables);
    }
    /**
     * @param date - date
     * @returns absolute date in short format
     */
    absoluteShortDate(date) {
        return this.absoluteDate(date, this.config.absoluteTemplates.short);
    }
    /**
     * @param date - date
     * @param options - DateTimeOptions
     * @returns absolute date in short format with time
     */
    absoluteShortDateTime(date, options) {
        return this.absoluteDate(date, this.config.absoluteTemplates.short, true, options?.seconds, options?.milliseconds);
    }
    /**
     * @param date - date
     * @returns absolute date in long format
     */
    absoluteLongDate(date) {
        return this.absoluteDate(date, this.config.absoluteTemplates.long);
    }
    /**
     * @param date - date
     * @param options - DateTimeOptions
     * @returns absolute date in long format with time
     */
    absoluteLongDateTime(date, options) {
        return this.absoluteDate(date, this.config.absoluteTemplates.long, true, options?.seconds, options?.milliseconds);
    }
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @param template - template
     * @returns opened date
     */
    openedRangeDate(startDate, endDate, template) {
        if (!this.adapter.isDateInstance(startDate) && !this.adapter.isDateInstance(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        const variables = { ...this.adapter.config.variables, ...template.variables };
        let params = {};
        if (startDate) {
            const startDateVariables = this.compileVariables(startDate, variables);
            params = {
                ...variables,
                START_DATE: this.messageFormat.compile(template.START_DATE)(startDateVariables),
                RANGE_TYPE: 'onlyStart'
            };
        }
        else if (endDate) {
            const endDateVariables = this.compileVariables(endDate, variables);
            params = {
                ...variables,
                END_DATE: this.messageFormat.compile(template.END_DATE)(endDateVariables),
                RANGE_TYPE: 'onlyEnd'
            };
        }
        return this.messageFormat.compile(template.DATE)(params);
    }
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @param template - template
     * @param seconds - should time with seconds be shown as well
     * @param milliseconds - should time with milliseconds be shown as well
     * @returns opened date
     */
    openedRangeDateTime(startDate, endDate, template, seconds = false, milliseconds = false) {
        if (!this.adapter.isDateInstance(startDate) && !this.adapter.isDateInstance(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        const variables = { ...this.adapter.config.variables, ...template.variables };
        let params = {};
        if (startDate) {
            const startDateVariables = this.compileVariables(startDate, variables);
            startDateVariables.SHOW_SECONDS = seconds ? 'yes' : 'no';
            startDateVariables.SHOW_MILLISECONDS = milliseconds ? 'yes' : 'no';
            params = {
                ...variables,
                START_DATETIME: this.messageFormat.compile(template.START_DATETIME)(startDateVariables),
                RANGE_TYPE: 'onlyStart'
            };
        }
        else if (endDate) {
            const endDateVariables = this.compileVariables(endDate, variables);
            endDateVariables.SHOW_SECONDS = seconds ? 'yes' : 'no';
            endDateVariables.SHOW_MILLISECONDS = milliseconds ? 'yes' : 'no';
            params = {
                ...variables,
                END_DATETIME: this.messageFormat.compile(template.END_DATETIME)(endDateVariables),
                RANGE_TYPE: 'onlyEnd'
            };
        }
        return this.messageFormat.compile(template.DATETIME)(params);
    }
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @param template - template
     * @returns range date in template format
     */
    rangeDate(startDate, endDate, template) {
        if (!this.adapter.isDateInstance(startDate) || !this.adapter.isDateInstance(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        const variables = { ...this.adapter.config.variables, ...template.variables };
        const sameMonth = this.hasSame(startDate, endDate, 'month');
        const startDateVariables = this.compileVariables(startDate, variables);
        startDateVariables.SAME_MONTH = sameMonth;
        const endDateVariables = this.compileVariables(endDate, variables);
        endDateVariables.SAME_MONTH = sameMonth;
        const bothCurrentYear = startDateVariables.CURRENT_YEAR === 'yes' && endDateVariables.CURRENT_YEAR === 'yes';
        startDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        endDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        const params = {
            ...variables,
            START_DATE: this.messageFormat.compile(template.START_DATE)(startDateVariables),
            END_DATE: this.messageFormat.compile(template.END_DATE)(endDateVariables),
            SAME_MONTH: sameMonth
        };
        return this.messageFormat.compile(template.DATE)(params);
    }
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @param template - template
     * @returns range date in template format with time
     */
    rangeDateTime(startDate, endDate, template, seconds = false, milliseconds = false) {
        if (!this.adapter.isDateInstance(startDate) || !this.adapter.isDateInstance(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        const variables = { ...this.adapter.config.variables, ...template.variables };
        const sameMonth = this.hasSame(startDate, endDate, 'month');
        const sameDay = this.hasSame(startDate, endDate, 'day');
        const startDateVariables = this.compileVariables(startDate, variables);
        startDateVariables.SAME_MONTH = sameMonth;
        startDateVariables.SAME_DAY = sameDay;
        startDateVariables.SHOW_SECONDS = seconds ? 'yes' : 'no';
        startDateVariables.SHOW_MILLISECONDS = milliseconds ? 'yes' : 'no';
        const endDateVariables = this.compileVariables(endDate, variables);
        endDateVariables.SAME_MONTH = sameMonth;
        endDateVariables.SAME_DAY = sameDay;
        endDateVariables.SHOW_SECONDS = seconds ? 'yes' : 'no';
        endDateVariables.SHOW_MILLISECONDS = milliseconds ? 'yes' : 'no';
        const bothCurrentYear = startDateVariables.CURRENT_YEAR === 'yes' && endDateVariables.CURRENT_YEAR === 'yes';
        startDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        endDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        const params = {
            ...variables,
            START_DATETIME: this.messageFormat.compile(template.START_DATETIME)(startDateVariables),
            END_DATETIME: this.messageFormat.compile(template.END_DATETIME)(endDateVariables),
            SAME_MONTH: sameMonth,
            SAME_DAY: sameDay
        };
        return this.messageFormat.compile(template.DATETIME)(params);
    }
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @returns range date in short format
     */
    rangeShortDate(startDate, endDate) {
        const rangeTemplates = this.config.rangeTemplates;
        if (startDate && endDate) {
            return this.rangeDate(startDate, endDate, rangeTemplates.closedRange.short);
        }
        return this.openedRangeDate(startDate, endDate || null, rangeTemplates.openedRange.short);
    }
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @param options - DateTimeOptions
     * @returns range date in short format with time
     */
    rangeShortDateTime(startDate, endDate, options) {
        const rangeTemplates = this.config.rangeTemplates;
        if (startDate && endDate) {
            return this.rangeDateTime(startDate, endDate, rangeTemplates.closedRange.short, options?.seconds, options?.milliseconds);
        }
        return this.openedRangeDateTime(startDate, endDate || null, rangeTemplates.openedRange.short, options?.seconds, options?.milliseconds);
    }
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @returns range date in long format
     */
    rangeLongDate(startDate, endDate) {
        const rangeTemplates = this.config.rangeTemplates;
        if (startDate && endDate) {
            return this.rangeDate(startDate, endDate, rangeTemplates.closedRange.long);
        }
        return this.openedRangeDate(startDate, endDate || null, rangeTemplates.openedRange.long);
    }
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @param options - DateTimeOptions
     * @returns range date in long format with time
     */
    rangeLongDateTime(startDate, endDate, options) {
        const rangeTemplates = this.config.rangeTemplates;
        if (startDate && endDate) {
            return this.rangeDateTime(startDate, endDate, rangeTemplates.closedRange.long, options?.seconds, options?.milliseconds);
        }
        return this.openedRangeDateTime(startDate, endDate || null, rangeTemplates.openedRange.long);
    }
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @param options - DateTimeOptions
     * @returns range middle date with time
     */
    rangeMiddleDateTime(startDate, endDate, options) {
        return this.rangeDateTime(startDate, endDate, this.config.rangeTemplates.closedRange.middle, options?.seconds, options?.milliseconds);
    }
    compileVariables(date, variables) {
        const compiledVariables = {};
        // tslint:disable-next-line:no-for-in
        for (const key in variables) {
            if (!variables.hasOwnProperty(key)) {
                continue;
            }
            const value = variables[key];
            compiledVariables[key] = this.adapter.format(date, value);
        }
        compiledVariables.CURRENT_YEAR = this.hasSame(date, this.adapter.today(), 'year');
        return compiledVariables;
    }
    isBeforeYesterday(date) {
        return this.adapter.daysFromToday(date) <= -2;
    }
    isYesterday(date) {
        const interval = this.adapter.daysFromToday(date);
        return interval > -2 && interval <= -1;
    }
    isToday(date) {
        return this.adapter.daysFromToday(date) === 0;
    }
    isTomorrow(date) {
        const interval = this.adapter.daysFromToday(date);
        return interval >= 1 && interval < 2;
    }
    isAfterTomorrow(date) {
        return this.adapter.daysFromToday(date) >= 2;
    }
    hasSame(startDate, endDate, unit) {
        return this.adapter.hasSame(startDate, endDate, unit) ? 'yes' : 'no';
    }
}
/** @nocollapse */ /** @nocollapse */ DateFormatter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: DateFormatter, deps: [{ token: i1.DateAdapter }, { token: MC_DATE_LOCALE }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ /** @nocollapse */ DateFormatter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: DateFormatter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: DateFormatter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.DateAdapter }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_DATE_LOCALE]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2NvcmUvZm9ybWF0dGVycy9kYXRlL2Zvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxrQ0FBa0M7QUFDbEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsNkJBQTZCO0FBQzdCLE9BQU8sYUFBYSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFdkUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7O0FBdUV6QyxNQUFNLE9BQU8sYUFBYTtJQU90QixZQUNxQixPQUF1QixFQUNoQixNQUFjO1FBRHJCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBTDNCLHlCQUFvQixHQUFXLGNBQWMsQ0FBQztRQVEzRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRTVDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFjO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxZQUFZLENBQ1IsSUFBTyxFQUNQLFFBQW1DLEVBQ25DLE9BQU8sR0FBRyxLQUFLLEVB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Q0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTyxPQUFPLENBQUMsU0FBWSxFQUFFLE9BQVUsRUFBRSxJQUFZO1FBQ2xELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDekUsQ0FBQzs7Z0pBdmJRLGFBQWEsNkNBU1YsY0FBYztvSkFUakIsYUFBYTsyRkFBYixhQUFhO2tCQUR6QixVQUFVOzswQkFVRixNQUFNOzJCQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTpuby1tYWdpYy1udW1iZXJzXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIHRzbGludDpkaXNhYmxlOmltcG9ydC1uYW1lXG5pbXBvcnQgTWVzc2FnZUZvcm1hdCBmcm9tICdAbWVzc2FnZWZvcm1hdC9jb3JlJztcbmltcG9ydCB7IERhdGVBZGFwdGVyLCBNQ19EQVRFX0xPQ0FMRSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9kYXRldGltZSc7XG5cbmltcG9ydCB7IGVuVVMgfSBmcm9tICcuL3RlbXBsYXRlcy9lbi1VUyc7XG5pbXBvcnQgeyBydVJVIH0gZnJvbSAnLi90ZW1wbGF0ZXMvcnUtUlUnO1xuXG5cbi8qKlxuICogaW50ZXJmYWNlIGZvciBhYnNvbHV0ZSBkYXRlIG9yIGRhdGV0aW1lIGZvcm1hdHRlciB0ZW1wbGF0ZVxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWF0dGVyQWJzb2x1dGVUZW1wbGF0ZSB7XG4gICAgdmFyaWFibGVzPzogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH07XG4gICAgREFURTogc3RyaW5nO1xuICAgIERBVEVUSU1FOiBzdHJpbmc7XG59XG5cbi8qKlxuICogaW50ZXJmYWNlIGZvciByYW5nZSBkYXRlIG9yIGRhdGV0aW1lIGZvcm1hdHRlciB0ZW1wbGF0ZVxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWF0dGVyUmFuZ2VUZW1wbGF0ZSB7XG4gICAgdmFyaWFibGVzPzogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH07XG4gICAgU1RBUlRfREFURTogc3RyaW5nO1xuICAgIEVORF9EQVRFOiBzdHJpbmc7XG4gICAgREFURTogc3RyaW5nO1xuICAgIFNUQVJUX0RBVEVUSU1FOiBzdHJpbmc7XG4gICAgRU5EX0RBVEVUSU1FOiBzdHJpbmc7XG4gICAgREFURVRJTUU6IHN0cmluZztcbn1cblxuLyoqXG4gKiBpbnRlcmZhY2UgZm9yIHJlbGF0aXZlIGRhdGUgb3IgZGF0ZXRpbWUgZm9ybWF0dGVyIHRlbXBsYXRlXG4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBGb3JtYXR0ZXJSZWxhdGl2ZVRlbXBsYXRlIHtcbiAgICB2YXJpYWJsZXM/OiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfTtcbiAgICBCRUZPUkVfWUVTVEVSREFZOiBzdHJpbmc7XG4gICAgWUVTVEVSREFZOiBzdHJpbmc7XG4gICAgVE9EQVk6IHN0cmluZztcbiAgICBUT01PUlJPVzogc3RyaW5nO1xuICAgIEFGVEVSX1RPTU9SUk9XOiBzdHJpbmc7XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBEYXRlVGltZU9wdGlvbnMge1xuICAgIHNlY29uZHM/OiBib29sZWFuO1xuICAgIG1pbGxpc2Vjb25kcz86IGJvb2xlYW47XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBGb3JtYXR0ZXJDb25maWcge1xuICAgIHJlbGF0aXZlVGVtcGxhdGVzOiB7XG4gICAgICAgIHNob3J0OiBGb3JtYXR0ZXJSZWxhdGl2ZVRlbXBsYXRlO1xuICAgICAgICBsb25nOiBGb3JtYXR0ZXJSZWxhdGl2ZVRlbXBsYXRlO1xuICAgIH07XG4gICAgYWJzb2x1dGVUZW1wbGF0ZXM6IHtcbiAgICAgICAgc2hvcnQ6IEZvcm1hdHRlckFic29sdXRlVGVtcGxhdGU7XG4gICAgICAgIGxvbmc6IEZvcm1hdHRlckFic29sdXRlVGVtcGxhdGU7XG4gICAgfTtcbiAgICByYW5nZVRlbXBsYXRlczoge1xuICAgICAgICBjbG9zZWRSYW5nZToge1xuICAgICAgICAgICAgc2hvcnQ6IEZvcm1hdHRlclJhbmdlVGVtcGxhdGU7XG4gICAgICAgICAgICBtaWRkbGU6IEZvcm1hdHRlclJhbmdlVGVtcGxhdGU7XG4gICAgICAgICAgICBsb25nOiBGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlO1xuICAgICAgICB9O1xuICAgICAgICBvcGVuZWRSYW5nZToge1xuICAgICAgICAgICAgc2hvcnQ6IEZvcm1hdHRlclJhbmdlVGVtcGxhdGU7XG4gICAgICAgICAgICBsb25nOiBGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlO1xuICAgICAgICB9O1xuICAgIH07XG59XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGVGb3JtYXR0ZXI8RD4ge1xuICAgIGNvbmZpZzogRm9ybWF0dGVyQ29uZmlnO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBpbnZhbGlkRGF0ZUVycm9yVGV4dDogc3RyaW5nID0gJ0ludmFsaWQgZGF0ZSc7XG5cbiAgICBwcml2YXRlIG1lc3NhZ2VGb3JtYXQ6IE1lc3NhZ2VGb3JtYXQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBhZGFwdGVyOiBEYXRlQWRhcHRlcjxEPixcbiAgICAgICAgQEluamVjdChNQ19EQVRFX0xPQ0FMRSkgbG9jYWxlOiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgdGhpcy5jb25maWcgPSBsb2NhbGUgPT09ICdlbicgPyBlblVTIDogcnVSVTtcblxuICAgICAgICB0aGlzLm1lc3NhZ2VGb3JtYXQgPSBuZXcgTWVzc2FnZUZvcm1hdChsb2NhbGUpO1xuICAgIH1cblxuICAgIHNldExvY2FsZShsb2NhbGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGxvY2FsZSA9PT0gJ2VuJyA/IGVuVVMgOiBydVJVO1xuXG4gICAgICAgIHRoaXMuYWRhcHRlci5zZXRMb2NhbGUobG9jYWxlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0ZSAtIGRhdGVcbiAgICAgKiBAcGFyYW0gdGVtcGxhdGUgLSB0ZW1wbGF0ZVxuICAgICAqIEByZXR1cm5zIHJlbGF0aXZlIGRhdGUgYnkgdGVtcGxhdGVcbiAgICAgKi9cbiAgICByZWxhdGl2ZURhdGUoXG4gICAgICAgIGRhdGU6IEQsXG4gICAgICAgIHRlbXBsYXRlOiBGb3JtYXR0ZXJSZWxhdGl2ZVRlbXBsYXRlLFxuICAgICAgICBzZWNvbmRzID0gZmFsc2UsXG4gICAgICAgIG1pbGxpc2Vjb25kcyA9IGZhbHNlXG4gICAgKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF0aGlzLmFkYXB0ZXIuaXNEYXRlSW5zdGFuY2UoZGF0ZSkpIHsgdGhyb3cgbmV3IEVycm9yKHRoaXMuaW52YWxpZERhdGVFcnJvclRleHQpOyB9XG5cbiAgICAgICAgbGV0IG5ld1RlbXBsYXRlO1xuXG4gICAgICAgIGNvbnN0IHRlbXBsYXRlVmFyaWFibGVzID0gey4uLnRoaXMuYWRhcHRlci5jb25maWcudmFyaWFibGVzLCAuLi50ZW1wbGF0ZS52YXJpYWJsZXN9O1xuXG4gICAgICAgIGlmICh0aGlzLmlzQmVmb3JlWWVzdGVyZGF5KGRhdGUpKSB7XG4gICAgICAgICAgICBuZXdUZW1wbGF0ZSA9IHRlbXBsYXRlLkJFRk9SRV9ZRVNURVJEQVk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1llc3RlcmRheShkYXRlKSkge1xuICAgICAgICAgICAgbmV3VGVtcGxhdGUgPSB0ZW1wbGF0ZS5ZRVNURVJEQVk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1RvZGF5KGRhdGUpKSB7XG4gICAgICAgICAgICBuZXdUZW1wbGF0ZSA9IHRlbXBsYXRlLlRPREFZO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNUb21vcnJvdyhkYXRlKSkge1xuICAgICAgICAgICAgbmV3VGVtcGxhdGUgPSB0ZW1wbGF0ZS5UT01PUlJPVztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzQWZ0ZXJUb21vcnJvdyhkYXRlKSkge1xuICAgICAgICAgICAgbmV3VGVtcGxhdGUgPSB0ZW1wbGF0ZS5BRlRFUl9UT01PUlJPVztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhkYXRlLCB0ZW1wbGF0ZVZhcmlhYmxlcyk7XG5cbiAgICAgICAgdmFyaWFibGVzLlNIT1dfU0VDT05EUyA9IHNlY29uZHMgPyAneWVzJyA6ICdubyc7XG4gICAgICAgIHZhcmlhYmxlcy5TSE9XX01JTExJU0VDT05EUyA9IG1pbGxpc2Vjb25kcyA/ICd5ZXMnIDogJ25vJztcblxuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlRm9ybWF0LmNvbXBpbGUobmV3VGVtcGxhdGUpKHZhcmlhYmxlcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGUgLSBkYXRlXG4gICAgICogQHJldHVybnMgcmVsYXRpdmUgZGF0ZSBpbiBzaG9ydCBmb3JtYXRcbiAgICAgKi9cbiAgICByZWxhdGl2ZVNob3J0RGF0ZShkYXRlOiBEKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVsYXRpdmVEYXRlKGRhdGUsIHRoaXMuY29uZmlnLnJlbGF0aXZlVGVtcGxhdGVzLnNob3J0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0ZSAtIGRhdGVcbiAgICAgKiBAcmV0dXJucyByZWxhdGl2ZSBkYXRlIGluIGxvbmcgZm9ybWF0XG4gICAgICovXG4gICAgcmVsYXRpdmVMb25nRGF0ZShkYXRlOiBEKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVsYXRpdmVEYXRlKGRhdGUsIHRoaXMuY29uZmlnLnJlbGF0aXZlVGVtcGxhdGVzLmxvbmcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gRGF0ZVRpbWVPcHRpb25zXG4gICAgICogQHJldHVybnMgcmVsYXRpdmUgZGF0ZSBpbiBzaG9ydCBmb3JtYXQgd2l0aCB0aW1lXG4gICAgICovXG4gICAgcmVsYXRpdmVTaG9ydERhdGVUaW1lKGRhdGU6IEQsIG9wdGlvbnM/OiBEYXRlVGltZU9wdGlvbnMpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWxhdGl2ZURhdGUoZGF0ZSwgdGhpcy5jb25maWcucmVsYXRpdmVUZW1wbGF0ZXMuc2hvcnQsIG9wdGlvbnM/LnNlY29uZHMsIG9wdGlvbnM/Lm1pbGxpc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGUgLSBkYXRlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBEYXRlVGltZU9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyByZWxhdGl2ZSBkYXRlIGluIGxvbmcgZm9ybWF0IHdpdGggdGltZVxuICAgICAqL1xuICAgIHJlbGF0aXZlTG9uZ0RhdGVUaW1lKGRhdGU6IEQsIG9wdGlvbnM/OiBEYXRlVGltZU9wdGlvbnMpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWxhdGl2ZURhdGUoZGF0ZSwgdGhpcy5jb25maWcucmVsYXRpdmVUZW1wbGF0ZXMubG9uZywgb3B0aW9ucz8uc2Vjb25kcywgb3B0aW9ucz8ubWlsbGlzZWNvbmRzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0ZSAtIGRhdGVcbiAgICAgKiBAcGFyYW0gcGFyYW1zIC0gcGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSBkYXRldGltZSAtIHNob3VsZCB0aW1lIGJlIHNob3duIGFzIHdlbGxcbiAgICAgKiBAcGFyYW0gc2Vjb25kcyAtIHNob3VsZCB0aW1lIHdpdGggc2Vjb25kcyBiZSBzaG93biBhcyB3ZWxsXG4gICAgICogQHBhcmFtIG1pbGxpc2Vjb25kcyAtIHNob3VsZCB0aW1lIHdpdGggbWlsbGlzZWNvbmRzIGJlIHNob3duIGFzIHdlbGxcbiAgICAgKiBAcmV0dXJucyBhYnNvbHV0ZSBkYXRlIGluIGNvbW1vbiBmb3JtYXRcbiAgICAgKi9cbiAgICBhYnNvbHV0ZURhdGUoXG4gICAgICAgIGRhdGU6IEQsXG4gICAgICAgIHBhcmFtczogRm9ybWF0dGVyQWJzb2x1dGVUZW1wbGF0ZSxcbiAgICAgICAgZGF0ZXRpbWUgPSBmYWxzZSxcbiAgICAgICAgc2Vjb25kcyA9IGZhbHNlLFxuICAgICAgICBtaWxsaXNlY29uZHMgPSBmYWxzZVxuICAgICk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdGhpcy5hZGFwdGVyLmlzRGF0ZUluc3RhbmNlKGRhdGUpKSB7IHRocm93IG5ldyBFcnJvcih0aGlzLmludmFsaWREYXRlRXJyb3JUZXh0KTsgfVxuXG4gICAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhkYXRlLCB7IC4uLnRoaXMuYWRhcHRlci5jb25maWcudmFyaWFibGVzLCAuLi5wYXJhbXMudmFyaWFibGVzIH0pO1xuXG4gICAgICAgIHZhcmlhYmxlcy5TSE9XX1NFQ09ORFMgPSBzZWNvbmRzID8gJ3llcycgOiAnbm8nO1xuICAgICAgICB2YXJpYWJsZXMuU0hPV19NSUxMSVNFQ09ORFMgPSBtaWxsaXNlY29uZHMgPyAneWVzJyA6ICdubyc7XG5cbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBkYXRldGltZSA/IHBhcmFtcy5EQVRFVElNRSA6IHBhcmFtcy5EQVRFO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VGb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZSkodmFyaWFibGVzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0ZSAtIGRhdGVcbiAgICAgKiBAcmV0dXJucyBhYnNvbHV0ZSBkYXRlIGluIHNob3J0IGZvcm1hdFxuICAgICAqL1xuICAgIGFic29sdXRlU2hvcnREYXRlKGRhdGU6IEQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5hYnNvbHV0ZURhdGUoZGF0ZSwgdGhpcy5jb25maWcuYWJzb2x1dGVUZW1wbGF0ZXMuc2hvcnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gRGF0ZVRpbWVPcHRpb25zXG4gICAgICogQHJldHVybnMgYWJzb2x1dGUgZGF0ZSBpbiBzaG9ydCBmb3JtYXQgd2l0aCB0aW1lXG4gICAgICovXG4gICAgYWJzb2x1dGVTaG9ydERhdGVUaW1lKGRhdGU6IEQsIG9wdGlvbnM/OiBEYXRlVGltZU9wdGlvbnMpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5hYnNvbHV0ZURhdGUoZGF0ZSwgdGhpcy5jb25maWcuYWJzb2x1dGVUZW1wbGF0ZXMuc2hvcnQsIHRydWUsIG9wdGlvbnM/LnNlY29uZHMsIG9wdGlvbnM/Lm1pbGxpc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGUgLSBkYXRlXG4gICAgICogQHJldHVybnMgYWJzb2x1dGUgZGF0ZSBpbiBsb25nIGZvcm1hdFxuICAgICAqL1xuICAgIGFic29sdXRlTG9uZ0RhdGUoZGF0ZTogRCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmFic29sdXRlRGF0ZShkYXRlLCB0aGlzLmNvbmZpZy5hYnNvbHV0ZVRlbXBsYXRlcy5sb25nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0ZSAtIGRhdGVcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIERhdGVUaW1lT3B0aW9uc1xuICAgICAqIEByZXR1cm5zIGFic29sdXRlIGRhdGUgaW4gbG9uZyBmb3JtYXQgd2l0aCB0aW1lXG4gICAgICovXG4gICAgYWJzb2x1dGVMb25nRGF0ZVRpbWUoZGF0ZTogRCwgb3B0aW9ucz86IERhdGVUaW1lT3B0aW9ucyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmFic29sdXRlRGF0ZShkYXRlLCB0aGlzLmNvbmZpZy5hYnNvbHV0ZVRlbXBsYXRlcy5sb25nLCB0cnVlLCBvcHRpb25zPy5zZWNvbmRzLCBvcHRpb25zPy5taWxsaXNlY29uZHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzdGFydERhdGUgLSBzdGFydCBkYXRlXG4gICAgICogQHBhcmFtIGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgICAqIEBwYXJhbSB0ZW1wbGF0ZSAtIHRlbXBsYXRlXG4gICAgICogQHJldHVybnMgb3BlbmVkIGRhdGVcbiAgICAgKi9cbiAgICBvcGVuZWRSYW5nZURhdGUoc3RhcnREYXRlOiBEIHwgbnVsbCwgZW5kRGF0ZTogRCB8IG51bGwsIHRlbXBsYXRlOiBGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlKSB7XG4gICAgICAgIGlmICghdGhpcy5hZGFwdGVyLmlzRGF0ZUluc3RhbmNlKHN0YXJ0RGF0ZSkgJiYgIXRoaXMuYWRhcHRlci5pc0RhdGVJbnN0YW5jZShlbmREYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuaW52YWxpZERhdGVFcnJvclRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0geyAuLi50aGlzLmFkYXB0ZXIuY29uZmlnLnZhcmlhYmxlcywgLi4udGVtcGxhdGUudmFyaWFibGVzIH07XG4gICAgICAgIGxldCBwYXJhbXMgPSB7fTtcblxuICAgICAgICBpZiAoc3RhcnREYXRlKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoc3RhcnREYXRlLCB2YXJpYWJsZXMpO1xuXG4gICAgICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgLi4udmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIFNUQVJUX0RBVEU6IHRoaXMubWVzc2FnZUZvcm1hdC5jb21waWxlKHRlbXBsYXRlLlNUQVJUX0RBVEUpKHN0YXJ0RGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICAgICAgUkFOR0VfVFlQRTogJ29ubHlTdGFydCdcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoZW5kRGF0ZSkge1xuICAgICAgICAgICAgY29uc3QgZW5kRGF0ZVZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhlbmREYXRlLCB2YXJpYWJsZXMpO1xuXG4gICAgICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgLi4udmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIEVORF9EQVRFOiB0aGlzLm1lc3NhZ2VGb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5FTkRfREFURSkoZW5kRGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICAgICAgUkFOR0VfVFlQRTogJ29ubHlFbmQnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZUZvcm1hdC5jb21waWxlKHRlbXBsYXRlLkRBVEUpKHBhcmFtcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICAgKiBAcGFyYW0gZW5kRGF0ZSAtIGVuZCBkYXRlXG4gICAgICogQHBhcmFtIHRlbXBsYXRlIC0gdGVtcGxhdGVcbiAgICAgKiBAcGFyYW0gc2Vjb25kcyAtIHNob3VsZCB0aW1lIHdpdGggc2Vjb25kcyBiZSBzaG93biBhcyB3ZWxsXG4gICAgICogQHBhcmFtIG1pbGxpc2Vjb25kcyAtIHNob3VsZCB0aW1lIHdpdGggbWlsbGlzZWNvbmRzIGJlIHNob3duIGFzIHdlbGxcbiAgICAgKiBAcmV0dXJucyBvcGVuZWQgZGF0ZVxuICAgICAqL1xuICAgIG9wZW5lZFJhbmdlRGF0ZVRpbWUoXG4gICAgICAgIHN0YXJ0RGF0ZTogRCB8IG51bGwsXG4gICAgICAgIGVuZERhdGU6IEQgfCBudWxsLFxuICAgICAgICB0ZW1wbGF0ZTogRm9ybWF0dGVyUmFuZ2VUZW1wbGF0ZSxcbiAgICAgICAgc2Vjb25kcyA9IGZhbHNlLFxuICAgICAgICBtaWxsaXNlY29uZHMgPSBmYWxzZVxuICAgICkge1xuICAgICAgICBpZiAoIXRoaXMuYWRhcHRlci5pc0RhdGVJbnN0YW5jZShzdGFydERhdGUpICYmICF0aGlzLmFkYXB0ZXIuaXNEYXRlSW5zdGFuY2UoZW5kRGF0ZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmludmFsaWREYXRlRXJyb3JUZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IHsgLi4udGhpcy5hZGFwdGVyLmNvbmZpZy52YXJpYWJsZXMsIC4uLnRlbXBsYXRlLnZhcmlhYmxlcyB9O1xuICAgICAgICBsZXQgcGFyYW1zID0ge307XG5cbiAgICAgICAgaWYgKHN0YXJ0RGF0ZSkge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKHN0YXJ0RGF0ZSwgdmFyaWFibGVzKTtcbiAgICAgICAgICAgIHN0YXJ0RGF0ZVZhcmlhYmxlcy5TSE9XX1NFQ09ORFMgPSBzZWNvbmRzID8gJ3llcycgOiAnbm8nO1xuICAgICAgICAgICAgc3RhcnREYXRlVmFyaWFibGVzLlNIT1dfTUlMTElTRUNPTkRTID0gbWlsbGlzZWNvbmRzID8gJ3llcycgOiAnbm8nO1xuXG4gICAgICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgLi4udmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIFNUQVJUX0RBVEVUSU1FOiB0aGlzLm1lc3NhZ2VGb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5TVEFSVF9EQVRFVElNRSkoc3RhcnREYXRlVmFyaWFibGVzKSxcbiAgICAgICAgICAgICAgICBSQU5HRV9UWVBFOiAnb25seVN0YXJ0J1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChlbmREYXRlKSB7XG4gICAgICAgICAgICBjb25zdCBlbmREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKGVuZERhdGUsIHZhcmlhYmxlcyk7XG4gICAgICAgICAgICBlbmREYXRlVmFyaWFibGVzLlNIT1dfU0VDT05EUyA9IHNlY29uZHMgPyAneWVzJyA6ICdubyc7XG4gICAgICAgICAgICBlbmREYXRlVmFyaWFibGVzLlNIT1dfTUlMTElTRUNPTkRTID0gbWlsbGlzZWNvbmRzID8gJ3llcycgOiAnbm8nO1xuXG4gICAgICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgLi4udmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIEVORF9EQVRFVElNRTogdGhpcy5tZXNzYWdlRm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuRU5EX0RBVEVUSU1FKShlbmREYXRlVmFyaWFibGVzKSxcbiAgICAgICAgICAgICAgICBSQU5HRV9UWVBFOiAnb25seUVuZCdcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlRm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuREFURVRJTUUpKHBhcmFtcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICAgKiBAcGFyYW0gZW5kRGF0ZSAtIGVuZCBkYXRlXG4gICAgICogQHBhcmFtIHRlbXBsYXRlIC0gdGVtcGxhdGVcbiAgICAgKiBAcmV0dXJucyByYW5nZSBkYXRlIGluIHRlbXBsYXRlIGZvcm1hdFxuICAgICAqL1xuICAgIHJhbmdlRGF0ZShzdGFydERhdGU6IEQsIGVuZERhdGU6IEQsIHRlbXBsYXRlOiBGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF0aGlzLmFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uoc3RhcnREYXRlKSB8fCAhdGhpcy5hZGFwdGVyLmlzRGF0ZUluc3RhbmNlKGVuZERhdGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5pbnZhbGlkRGF0ZUVycm9yVGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB7IC4uLnRoaXMuYWRhcHRlci5jb25maWcudmFyaWFibGVzLCAuLi50ZW1wbGF0ZS52YXJpYWJsZXMgfTtcbiAgICAgICAgY29uc3Qgc2FtZU1vbnRoID0gdGhpcy5oYXNTYW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgJ21vbnRoJyk7XG5cbiAgICAgICAgY29uc3Qgc3RhcnREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKHN0YXJ0RGF0ZSwgdmFyaWFibGVzKTtcbiAgICAgICAgc3RhcnREYXRlVmFyaWFibGVzLlNBTUVfTU9OVEggPSBzYW1lTW9udGg7XG5cbiAgICAgICAgY29uc3QgZW5kRGF0ZVZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhlbmREYXRlLCB2YXJpYWJsZXMpO1xuICAgICAgICBlbmREYXRlVmFyaWFibGVzLlNBTUVfTU9OVEggPSBzYW1lTW9udGg7XG5cbiAgICAgICAgY29uc3QgYm90aEN1cnJlbnRZZWFyID0gc3RhcnREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9PT0gJ3llcycgJiYgZW5kRGF0ZVZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPT09ICd5ZXMnO1xuICAgICAgICBzdGFydERhdGVWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID0gYm90aEN1cnJlbnRZZWFyID8gJ3llcycgOiAnbm8nO1xuICAgICAgICBlbmREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9IGJvdGhDdXJyZW50WWVhciA/ICd5ZXMnIDogJ25vJztcblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAuLi52YXJpYWJsZXMsXG4gICAgICAgICAgICBTVEFSVF9EQVRFOiB0aGlzLm1lc3NhZ2VGb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5TVEFSVF9EQVRFKShzdGFydERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgRU5EX0RBVEU6IHRoaXMubWVzc2FnZUZvcm1hdC5jb21waWxlKHRlbXBsYXRlLkVORF9EQVRFKShlbmREYXRlVmFyaWFibGVzKSxcbiAgICAgICAgICAgIFNBTUVfTU9OVEg6IHNhbWVNb250aFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VGb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5EQVRFKShwYXJhbXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzdGFydERhdGUgLSBzdGFydCBkYXRlXG4gICAgICogQHBhcmFtIGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgICAqIEBwYXJhbSB0ZW1wbGF0ZSAtIHRlbXBsYXRlXG4gICAgICogQHJldHVybnMgcmFuZ2UgZGF0ZSBpbiB0ZW1wbGF0ZSBmb3JtYXQgd2l0aCB0aW1lXG4gICAgICovXG4gICAgcmFuZ2VEYXRlVGltZShzdGFydERhdGU6IEQsIGVuZERhdGU6IEQsIHRlbXBsYXRlOiBGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlLCBzZWNvbmRzID0gZmFsc2UsIG1pbGxpc2Vjb25kcyA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF0aGlzLmFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uoc3RhcnREYXRlKSB8fCAhdGhpcy5hZGFwdGVyLmlzRGF0ZUluc3RhbmNlKGVuZERhdGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5pbnZhbGlkRGF0ZUVycm9yVGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB7Li4udGhpcy5hZGFwdGVyLmNvbmZpZy52YXJpYWJsZXMsIC4uLnRlbXBsYXRlLnZhcmlhYmxlc307XG5cbiAgICAgICAgY29uc3Qgc2FtZU1vbnRoID0gdGhpcy5oYXNTYW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgJ21vbnRoJyk7XG4gICAgICAgIGNvbnN0IHNhbWVEYXkgPSB0aGlzLmhhc1NhbWUoc3RhcnREYXRlLCBlbmREYXRlLCAnZGF5Jyk7XG5cbiAgICAgICAgY29uc3Qgc3RhcnREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKHN0YXJ0RGF0ZSwgdmFyaWFibGVzKTtcbiAgICAgICAgc3RhcnREYXRlVmFyaWFibGVzLlNBTUVfTU9OVEggPSBzYW1lTW9udGg7XG4gICAgICAgIHN0YXJ0RGF0ZVZhcmlhYmxlcy5TQU1FX0RBWSA9IHNhbWVEYXk7XG4gICAgICAgIHN0YXJ0RGF0ZVZhcmlhYmxlcy5TSE9XX1NFQ09ORFMgPSBzZWNvbmRzID8gJ3llcycgOiAnbm8nO1xuICAgICAgICBzdGFydERhdGVWYXJpYWJsZXMuU0hPV19NSUxMSVNFQ09ORFMgPSBtaWxsaXNlY29uZHMgPyAneWVzJyA6ICdubyc7XG5cbiAgICAgICAgY29uc3QgZW5kRGF0ZVZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhlbmREYXRlLCB2YXJpYWJsZXMpO1xuICAgICAgICBlbmREYXRlVmFyaWFibGVzLlNBTUVfTU9OVEggPSBzYW1lTW9udGg7XG4gICAgICAgIGVuZERhdGVWYXJpYWJsZXMuU0FNRV9EQVkgPSBzYW1lRGF5O1xuICAgICAgICBlbmREYXRlVmFyaWFibGVzLlNIT1dfU0VDT05EUyA9IHNlY29uZHMgPyAneWVzJyA6ICdubyc7XG4gICAgICAgIGVuZERhdGVWYXJpYWJsZXMuU0hPV19NSUxMSVNFQ09ORFMgPSBtaWxsaXNlY29uZHMgPyAneWVzJyA6ICdubyc7XG5cbiAgICAgICAgY29uc3QgYm90aEN1cnJlbnRZZWFyID0gc3RhcnREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9PT0gJ3llcycgJiYgZW5kRGF0ZVZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPT09ICd5ZXMnO1xuICAgICAgICBzdGFydERhdGVWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID0gYm90aEN1cnJlbnRZZWFyID8gJ3llcycgOiAnbm8nO1xuICAgICAgICBlbmREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9IGJvdGhDdXJyZW50WWVhciA/ICd5ZXMnIDogJ25vJztcblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAuLi52YXJpYWJsZXMsXG4gICAgICAgICAgICBTVEFSVF9EQVRFVElNRTogdGhpcy5tZXNzYWdlRm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuU1RBUlRfREFURVRJTUUpKHN0YXJ0RGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICBFTkRfREFURVRJTUU6IHRoaXMubWVzc2FnZUZvcm1hdC5jb21waWxlKHRlbXBsYXRlLkVORF9EQVRFVElNRSkoZW5kRGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICBTQU1FX01PTlRIOiBzYW1lTW9udGgsXG4gICAgICAgICAgICBTQU1FX0RBWTogc2FtZURheVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VGb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5EQVRFVElNRSkocGFyYW1zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhcnREYXRlIC0gc3RhcnQgZGF0ZVxuICAgICAqIEBwYXJhbSBlbmREYXRlIC0gZW5kIGRhdGVcbiAgICAgKiBAcmV0dXJucyByYW5nZSBkYXRlIGluIHNob3J0IGZvcm1hdFxuICAgICAqL1xuICAgIHJhbmdlU2hvcnREYXRlKHN0YXJ0RGF0ZTogRCB8IG51bGwsIGVuZERhdGU/OiBEKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcmFuZ2VUZW1wbGF0ZXMgPSB0aGlzLmNvbmZpZy5yYW5nZVRlbXBsYXRlcztcblxuICAgICAgICBpZiAoc3RhcnREYXRlICYmIGVuZERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhbmdlRGF0ZShzdGFydERhdGUsIGVuZERhdGUsIHJhbmdlVGVtcGxhdGVzLmNsb3NlZFJhbmdlLnNob3J0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5lZFJhbmdlRGF0ZShzdGFydERhdGUsIGVuZERhdGUgfHwgbnVsbCwgcmFuZ2VUZW1wbGF0ZXMub3BlbmVkUmFuZ2Uuc2hvcnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzdGFydERhdGUgLSBzdGFydCBkYXRlXG4gICAgICogQHBhcmFtIGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gRGF0ZVRpbWVPcHRpb25zXG4gICAgICogQHJldHVybnMgcmFuZ2UgZGF0ZSBpbiBzaG9ydCBmb3JtYXQgd2l0aCB0aW1lXG4gICAgICovXG4gICAgcmFuZ2VTaG9ydERhdGVUaW1lKHN0YXJ0RGF0ZTogRCB8IG51bGwsIGVuZERhdGU/OiBEIHwgbnVsbCwgb3B0aW9ucz86IERhdGVUaW1lT3B0aW9ucyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHJhbmdlVGVtcGxhdGVzID0gdGhpcy5jb25maWcucmFuZ2VUZW1wbGF0ZXM7XG5cbiAgICAgICAgaWYgKHN0YXJ0RGF0ZSAmJiBlbmREYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgcmFuZ2VUZW1wbGF0ZXMuY2xvc2VkUmFuZ2Uuc2hvcnQsIG9wdGlvbnM/LnNlY29uZHMsIG9wdGlvbnM/Lm1pbGxpc2Vjb25kcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5vcGVuZWRSYW5nZURhdGVUaW1lKFxuICAgICAgICAgICAgc3RhcnREYXRlLFxuICAgICAgICAgICAgZW5kRGF0ZSB8fCBudWxsLFxuICAgICAgICAgICAgcmFuZ2VUZW1wbGF0ZXMub3BlbmVkUmFuZ2Uuc2hvcnQsXG4gICAgICAgICAgICBvcHRpb25zPy5zZWNvbmRzLFxuICAgICAgICAgICAgb3B0aW9ucz8ubWlsbGlzZWNvbmRzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICAgKiBAcGFyYW0gZW5kRGF0ZSAtIGVuZCBkYXRlXG4gICAgICogQHJldHVybnMgcmFuZ2UgZGF0ZSBpbiBsb25nIGZvcm1hdFxuICAgICAqL1xuICAgIHJhbmdlTG9uZ0RhdGUoc3RhcnREYXRlOiBEIHwgbnVsbCwgZW5kRGF0ZT86IEQgfCBudWxsKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcmFuZ2VUZW1wbGF0ZXMgPSB0aGlzLmNvbmZpZy5yYW5nZVRlbXBsYXRlcztcblxuICAgICAgICBpZiAoc3RhcnREYXRlICYmIGVuZERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhbmdlRGF0ZShzdGFydERhdGUsIGVuZERhdGUsIHJhbmdlVGVtcGxhdGVzLmNsb3NlZFJhbmdlLmxvbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3BlbmVkUmFuZ2VEYXRlKHN0YXJ0RGF0ZSwgZW5kRGF0ZSB8fCBudWxsLCByYW5nZVRlbXBsYXRlcy5vcGVuZWRSYW5nZS5sb25nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhcnREYXRlIC0gc3RhcnQgZGF0ZVxuICAgICAqIEBwYXJhbSBlbmREYXRlIC0gZW5kIGRhdGVcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIERhdGVUaW1lT3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHJhbmdlIGRhdGUgaW4gbG9uZyBmb3JtYXQgd2l0aCB0aW1lXG4gICAgICovXG4gICAgcmFuZ2VMb25nRGF0ZVRpbWUoc3RhcnREYXRlOiBEIHwgbnVsbCwgZW5kRGF0ZT86IEQsIG9wdGlvbnM/OiBEYXRlVGltZU9wdGlvbnMpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCByYW5nZVRlbXBsYXRlcyA9IHRoaXMuY29uZmlnLnJhbmdlVGVtcGxhdGVzO1xuXG4gICAgICAgIGlmIChzdGFydERhdGUgJiYgZW5kRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmFuZ2VEYXRlVGltZShzdGFydERhdGUsIGVuZERhdGUsIHJhbmdlVGVtcGxhdGVzLmNsb3NlZFJhbmdlLmxvbmcsIG9wdGlvbnM/LnNlY29uZHMsIG9wdGlvbnM/Lm1pbGxpc2Vjb25kcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5vcGVuZWRSYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSB8fCBudWxsLCByYW5nZVRlbXBsYXRlcy5vcGVuZWRSYW5nZS5sb25nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhcnREYXRlIC0gc3RhcnQgZGF0ZVxuICAgICAqIEBwYXJhbSBlbmREYXRlIC0gZW5kIGRhdGVcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIERhdGVUaW1lT3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHJhbmdlIG1pZGRsZSBkYXRlIHdpdGggdGltZVxuICAgICAqL1xuICAgIHJhbmdlTWlkZGxlRGF0ZVRpbWUoc3RhcnREYXRlOiBELCBlbmREYXRlOiBELCBvcHRpb25zPzogRGF0ZVRpbWVPcHRpb25zKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmFuZ2VEYXRlVGltZShcbiAgICAgICAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgICAgICAgIGVuZERhdGUsXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5yYW5nZVRlbXBsYXRlcy5jbG9zZWRSYW5nZS5taWRkbGUsXG4gICAgICAgICAgICBvcHRpb25zPy5zZWNvbmRzLFxuICAgICAgICAgICAgb3B0aW9ucz8ubWlsbGlzZWNvbmRzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb21waWxlVmFyaWFibGVzKGRhdGU6IEQsIHZhcmlhYmxlczogYW55KTogYW55IHtcbiAgICAgICAgY29uc3QgY29tcGlsZWRWYXJpYWJsZXM6IGFueSA9IHt9O1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mb3ItaW5cbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdmFyaWFibGVzKSB7XG4gICAgICAgICAgICBpZiAoIXZhcmlhYmxlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdmFyaWFibGVzW2tleV07XG4gICAgICAgICAgICBjb21waWxlZFZhcmlhYmxlc1trZXldID0gdGhpcy5hZGFwdGVyLmZvcm1hdChkYXRlLCB2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb21waWxlZFZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPSB0aGlzLmhhc1NhbWUoZGF0ZSwgdGhpcy5hZGFwdGVyLnRvZGF5KCksICd5ZWFyJyk7XG5cbiAgICAgICAgcmV0dXJuIGNvbXBpbGVkVmFyaWFibGVzO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNCZWZvcmVZZXN0ZXJkYXkoZGF0ZTogRCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmRheXNGcm9tVG9kYXkoZGF0ZSkgPD0gLTI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1llc3RlcmRheShkYXRlOiBEKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGludGVydmFsID0gdGhpcy5hZGFwdGVyLmRheXNGcm9tVG9kYXkoZGF0ZSk7XG5cbiAgICAgICAgcmV0dXJuIGludGVydmFsID4gLTIgJiYgaW50ZXJ2YWwgPD0gLTE7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1RvZGF5KGRhdGU6IEQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRhcHRlci5kYXlzRnJvbVRvZGF5KGRhdGUpID09PSAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNUb21vcnJvdyhkYXRlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSB0aGlzLmFkYXB0ZXIuZGF5c0Zyb21Ub2RheShkYXRlKTtcblxuICAgICAgICByZXR1cm4gaW50ZXJ2YWwgPj0gMSAmJiBpbnRlcnZhbCA8IDI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0FmdGVyVG9tb3Jyb3coZGF0ZTogRCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmRheXNGcm9tVG9kYXkoZGF0ZSkgPj0gMjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhc1NhbWUoc3RhcnREYXRlOiBELCBlbmREYXRlOiBELCB1bml0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmhhc1NhbWUoc3RhcnREYXRlLCBlbmREYXRlLCB1bml0KSA/ICd5ZXMnIDogJ25vJztcbiAgICB9XG59XG4iXX0=