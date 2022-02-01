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
    relativeDate(date, template) {
        if (!this.adapter.isDateInstance(date)) {
            throw new Error(this.invalidDateErrorText);
        }
        let newTemplate;
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
        const templateVariables = { ...this.adapter.config.variables, ...template.variables };
        const variables = this.compileVariables(date, templateVariables);
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
     * @param params - parameters
     * @param datetime - should time be shown as well
     * @param milliseconds - should time with milliseconds be shown as well
     * @returns absolute date in common format
     */
    absoluteDate(date, params, datetime = false, milliseconds = false) {
        if (!this.adapter.isDateInstance(date)) {
            throw new Error(this.invalidDateErrorText);
        }
        const variables = this.compileVariables(date, { ...this.adapter.config.variables, ...params.variables });
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
     * @param options - AbsoluteDateTimeOptions
     * @returns absolute date in short format with time
     */
    absoluteShortDateTime(date, options) {
        return this.absoluteDate(date, this.config.absoluteTemplates.short, true, options?.milliseconds);
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
     * @param options - AbsoluteDateTimeOptions
     * @returns absolute date in long format with time
     */
    absoluteLongDateTime(date, options) {
        return this.absoluteDate(date, this.config.absoluteTemplates.long, true, options?.milliseconds);
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
     * @returns opened date
     */
    openedRangeDateTime(startDate, endDate, template) {
        if (!this.adapter.isDateInstance(startDate) && !this.adapter.isDateInstance(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        const variables = { ...this.adapter.config.variables, ...template.variables };
        let params = {};
        if (startDate) {
            const startDateVariables = this.compileVariables(startDate, variables);
            params = {
                ...variables,
                START_DATETIME: this.messageFormat.compile(template.START_DATETIME)(startDateVariables),
                RANGE_TYPE: 'onlyStart'
            };
        }
        else if (endDate) {
            const endDateVariables = this.compileVariables(endDate, variables);
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
    rangeDateTime(startDate, endDate, template) {
        if (!this.adapter.isDateInstance(startDate) || !this.adapter.isDateInstance(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        const variables = { ...this.adapter.config.variables, ...template.variables };
        const sameMonth = this.hasSame(startDate, endDate, 'month');
        const sameDay = this.hasSame(startDate, endDate, 'day');
        const startDateVariables = this.compileVariables(startDate, variables);
        startDateVariables.SAME_MONTH = sameMonth;
        startDateVariables.SAME_DAY = sameDay;
        const endDateVariables = this.compileVariables(endDate, variables);
        endDateVariables.SAME_MONTH = sameMonth;
        endDateVariables.SAME_DAY = sameDay;
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
     * @returns range date in short format with time
     */
    rangeShortDateTime(startDate, endDate) {
        const rangeTemplates = this.config.rangeTemplates;
        if (startDate && endDate) {
            return this.rangeDateTime(startDate, endDate, rangeTemplates.closedRange.short);
        }
        return this.openedRangeDateTime(startDate, endDate || null, rangeTemplates.openedRange.short);
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
     * @returns range date in long format with time
     */
    rangeLongDateTime(startDate, endDate) {
        const rangeTemplates = this.config.rangeTemplates;
        if (startDate && endDate) {
            return this.rangeDateTime(startDate, endDate, rangeTemplates.closedRange.long);
        }
        return this.openedRangeDateTime(startDate, endDate || null, rangeTemplates.openedRange.long);
    }
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @returns range middle date with time
     */
    rangeMiddleDateTime(startDate, endDate) {
        return this.rangeDateTime(startDate, endDate, this.config.rangeTemplates.closedRange.middle);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2NvcmUvZm9ybWF0dGVycy9kYXRlL2Zvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxrQ0FBa0M7QUFDbEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsNkJBQTZCO0FBQzdCLE9BQU8sYUFBYSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFdkUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7O0FBc0V6QyxNQUFNLE9BQU8sYUFBYTtJQU90QixZQUNxQixPQUF1QixFQUNoQixNQUFjO1FBRHJCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBTDNCLHlCQUFvQixHQUFXLGNBQWMsQ0FBQztRQVEzRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRTVDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFjO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxZQUFZLENBQUMsSUFBTyxFQUFFLFFBQW1DO1FBQ3JELElBQUksQ0FBQyxJQUFJLENB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QVM7UUFDeEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbEQsT0FBTyxRQUFRLElBQUksQ0FBQyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVPLGVBQWUsQ0FBQyxJQUFPO1FBQzNCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTyxPQUFPLENBQUMsU0FBWSxFQUFFLE9BQVUsRUFBRSxJQUFZO1FBQ2xELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDekUsQ0FBQzs7Z0pBelhRLGFBQWEsNkNBU1YsY0FBYztvSkFUakIsYUFBYTsyRkFBYixhQUFhO2tCQUR6QixVQUFVOzswQkFVRixNQUFNOzJCQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTpuby1tYWdpYy1udW1iZXJzXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIHRzbGludDpkaXNhYmxlOmltcG9ydC1uYW1lXG5pbXBvcnQgTWVzc2FnZUZvcm1hdCBmcm9tICdAbWVzc2FnZWZvcm1hdC9jb3JlJztcbmltcG9ydCB7IERhdGVBZGFwdGVyLCBNQ19EQVRFX0xPQ0FMRSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9kYXRldGltZSc7XG5cbmltcG9ydCB7IGVuVVMgfSBmcm9tICcuL3RlbXBsYXRlcy9lbi1VUyc7XG5pbXBvcnQgeyBydVJVIH0gZnJvbSAnLi90ZW1wbGF0ZXMvcnUtUlUnO1xuXG5cbi8qKlxuICogaW50ZXJmYWNlIGZvciBhYnNvbHV0ZSBkYXRlIG9yIGRhdGV0aW1lIGZvcm1hdHRlciB0ZW1wbGF0ZVxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWF0dGVyQWJzb2x1dGVUZW1wbGF0ZSB7XG4gICAgdmFyaWFibGVzPzogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH07XG4gICAgREFURTogc3RyaW5nO1xuICAgIERBVEVUSU1FOiBzdHJpbmc7XG59XG5cbi8qKlxuICogaW50ZXJmYWNlIGZvciByYW5nZSBkYXRlIG9yIGRhdGV0aW1lIGZvcm1hdHRlciB0ZW1wbGF0ZVxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWF0dGVyUmFuZ2VUZW1wbGF0ZSB7XG4gICAgdmFyaWFibGVzPzogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH07XG4gICAgU1RBUlRfREFURTogc3RyaW5nO1xuICAgIEVORF9EQVRFOiBzdHJpbmc7XG4gICAgREFURTogc3RyaW5nO1xuICAgIFNUQVJUX0RBVEVUSU1FOiBzdHJpbmc7XG4gICAgRU5EX0RBVEVUSU1FOiBzdHJpbmc7XG4gICAgREFURVRJTUU6IHN0cmluZztcbn1cblxuLyoqXG4gKiBpbnRlcmZhY2UgZm9yIHJlbGF0aXZlIGRhdGUgb3IgZGF0ZXRpbWUgZm9ybWF0dGVyIHRlbXBsYXRlXG4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBGb3JtYXR0ZXJSZWxhdGl2ZVRlbXBsYXRlIHtcbiAgICB2YXJpYWJsZXM/OiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfTtcbiAgICBCRUZPUkVfWUVTVEVSREFZOiBzdHJpbmc7XG4gICAgWUVTVEVSREFZOiBzdHJpbmc7XG4gICAgVE9EQVk6IHN0cmluZztcbiAgICBUT01PUlJPVzogc3RyaW5nO1xuICAgIEFGVEVSX1RPTU9SUk9XOiBzdHJpbmc7XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBBYnNvbHV0ZURhdGVUaW1lT3B0aW9ucyB7XG4gICAgbWlsbGlzZWNvbmRzPzogYm9vbGVhbjtcbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1hdHRlckNvbmZpZyB7XG4gICAgcmVsYXRpdmVUZW1wbGF0ZXM6IHtcbiAgICAgICAgc2hvcnQ6IEZvcm1hdHRlclJlbGF0aXZlVGVtcGxhdGU7XG4gICAgICAgIGxvbmc6IEZvcm1hdHRlclJlbGF0aXZlVGVtcGxhdGU7XG4gICAgfTtcbiAgICBhYnNvbHV0ZVRlbXBsYXRlczoge1xuICAgICAgICBzaG9ydDogRm9ybWF0dGVyQWJzb2x1dGVUZW1wbGF0ZTtcbiAgICAgICAgbG9uZzogRm9ybWF0dGVyQWJzb2x1dGVUZW1wbGF0ZTtcbiAgICB9O1xuICAgIHJhbmdlVGVtcGxhdGVzOiB7XG4gICAgICAgIGNsb3NlZFJhbmdlOiB7XG4gICAgICAgICAgICBzaG9ydDogRm9ybWF0dGVyUmFuZ2VUZW1wbGF0ZTtcbiAgICAgICAgICAgIG1pZGRsZTogRm9ybWF0dGVyUmFuZ2VUZW1wbGF0ZTtcbiAgICAgICAgICAgIGxvbmc6IEZvcm1hdHRlclJhbmdlVGVtcGxhdGU7XG4gICAgICAgIH07XG4gICAgICAgIG9wZW5lZFJhbmdlOiB7XG4gICAgICAgICAgICBzaG9ydDogRm9ybWF0dGVyUmFuZ2VUZW1wbGF0ZTtcbiAgICAgICAgICAgIGxvbmc6IEZvcm1hdHRlclJhbmdlVGVtcGxhdGU7XG4gICAgICAgIH07XG4gICAgfTtcbn1cblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0ZUZvcm1hdHRlcjxEPiB7XG4gICAgY29uZmlnOiBGb3JtYXR0ZXJDb25maWc7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IGludmFsaWREYXRlRXJyb3JUZXh0OiBzdHJpbmcgPSAnSW52YWxpZCBkYXRlJztcblxuICAgIHByaXZhdGUgbWVzc2FnZUZvcm1hdDogTWVzc2FnZUZvcm1hdDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxuICAgICAgICBASW5qZWN0KE1DX0RBVEVfTE9DQUxFKSBsb2NhbGU6IHN0cmluZ1xuICAgICkge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGxvY2FsZSA9PT0gJ2VuJyA/IGVuVVMgOiBydVJVO1xuXG4gICAgICAgIHRoaXMubWVzc2FnZUZvcm1hdCA9IG5ldyBNZXNzYWdlRm9ybWF0KGxvY2FsZSk7XG4gICAgfVxuXG4gICAgc2V0TG9jYWxlKGxvY2FsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29uZmlnID0gbG9jYWxlID09PSAnZW4nID8gZW5VUyA6IHJ1UlU7XG5cbiAgICAgICAgdGhpcy5hZGFwdGVyLnNldExvY2FsZShsb2NhbGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZVxuICAgICAqIEBwYXJhbSB0ZW1wbGF0ZSAtIHRlbXBsYXRlXG4gICAgICogQHJldHVybnMgcmVsYXRpdmUgZGF0ZSBieSB0ZW1wbGF0ZVxuICAgICAqL1xuICAgIHJlbGF0aXZlRGF0ZShkYXRlOiBELCB0ZW1wbGF0ZTogRm9ybWF0dGVyUmVsYXRpdmVUZW1wbGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdGhpcy5hZGFwdGVyLmlzRGF0ZUluc3RhbmNlKGRhdGUpKSB7IHRocm93IG5ldyBFcnJvcih0aGlzLmludmFsaWREYXRlRXJyb3JUZXh0KTsgfVxuXG4gICAgICAgIGxldCBuZXdUZW1wbGF0ZTtcblxuICAgICAgICBpZiAodGhpcy5pc0JlZm9yZVllc3RlcmRheShkYXRlKSkge1xuICAgICAgICAgICAgbmV3VGVtcGxhdGUgPSB0ZW1wbGF0ZS5CRUZPUkVfWUVTVEVSREFZO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNZZXN0ZXJkYXkoZGF0ZSkpIHtcbiAgICAgICAgICAgIG5ld1RlbXBsYXRlID0gdGVtcGxhdGUuWUVTVEVSREFZO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNUb2RheShkYXRlKSkge1xuICAgICAgICAgICAgbmV3VGVtcGxhdGUgPSB0ZW1wbGF0ZS5UT0RBWTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzVG9tb3Jyb3coZGF0ZSkpIHtcbiAgICAgICAgICAgIG5ld1RlbXBsYXRlID0gdGVtcGxhdGUuVE9NT1JST1c7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0FmdGVyVG9tb3Jyb3coZGF0ZSkpIHtcbiAgICAgICAgICAgIG5ld1RlbXBsYXRlID0gdGVtcGxhdGUuQUZURVJfVE9NT1JST1c7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0ZW1wbGF0ZVZhcmlhYmxlcyA9IHsuLi50aGlzLmFkYXB0ZXIuY29uZmlnLnZhcmlhYmxlcywgLi4udGVtcGxhdGUudmFyaWFibGVzfTtcbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKGRhdGUsIHRlbXBsYXRlVmFyaWFibGVzKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlRm9ybWF0LmNvbXBpbGUobmV3VGVtcGxhdGUpKHZhcmlhYmxlcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGUgLSBkYXRlXG4gICAgICogQHJldHVybnMgcmVsYXRpdmUgZGF0ZSBpbiBzaG9ydCBmb3JtYXRcbiAgICAgKi9cbiAgICByZWxhdGl2ZVNob3J0RGF0ZShkYXRlOiBEKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVsYXRpdmVEYXRlKGRhdGUsIHRoaXMuY29uZmlnLnJlbGF0aXZlVGVtcGxhdGVzLnNob3J0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0ZSAtIGRhdGVcbiAgICAgKiBAcmV0dXJucyByZWxhdGl2ZSBkYXRlIGluIGxvbmcgZm9ybWF0XG4gICAgICovXG4gICAgcmVsYXRpdmVMb25nRGF0ZShkYXRlOiBEKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVsYXRpdmVEYXRlKGRhdGUsIHRoaXMuY29uZmlnLnJlbGF0aXZlVGVtcGxhdGVzLmxvbmcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZVxuICAgICAqIEBwYXJhbSBwYXJhbXMgLSBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIGRhdGV0aW1lIC0gc2hvdWxkIHRpbWUgYmUgc2hvd24gYXMgd2VsbFxuICAgICAqIEBwYXJhbSBtaWxsaXNlY29uZHMgLSBzaG91bGQgdGltZSB3aXRoIG1pbGxpc2Vjb25kcyBiZSBzaG93biBhcyB3ZWxsXG4gICAgICogQHJldHVybnMgYWJzb2x1dGUgZGF0ZSBpbiBjb21tb24gZm9ybWF0XG4gICAgICovXG4gICAgYWJzb2x1dGVEYXRlKFxuICAgICAgICBkYXRlOiBELFxuICAgICAgICBwYXJhbXM6IEZvcm1hdHRlckFic29sdXRlVGVtcGxhdGUsXG4gICAgICAgIGRhdGV0aW1lID0gZmFsc2UsXG4gICAgICAgIG1pbGxpc2Vjb25kcyA9IGZhbHNlXG4gICAgKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF0aGlzLmFkYXB0ZXIuaXNEYXRlSW5zdGFuY2UoZGF0ZSkpIHsgdGhyb3cgbmV3IEVycm9yKHRoaXMuaW52YWxpZERhdGVFcnJvclRleHQpOyB9XG5cbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKGRhdGUsIHsgLi4udGhpcy5hZGFwdGVyLmNvbmZpZy52YXJpYWJsZXMsIC4uLnBhcmFtcy52YXJpYWJsZXMgfSk7XG5cbiAgICAgICAgdmFyaWFibGVzLlNIT1dfTUlMTElTRUNPTkRTID0gbWlsbGlzZWNvbmRzID8gJ3llcycgOiAnbm8nO1xuXG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gZGF0ZXRpbWUgPyBwYXJhbXMuREFURVRJTUUgOiBwYXJhbXMuREFURTtcblxuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlRm9ybWF0LmNvbXBpbGUodGVtcGxhdGUpKHZhcmlhYmxlcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGUgLSBkYXRlXG4gICAgICogQHJldHVybnMgYWJzb2x1dGUgZGF0ZSBpbiBzaG9ydCBmb3JtYXRcbiAgICAgKi9cbiAgICBhYnNvbHV0ZVNob3J0RGF0ZShkYXRlOiBEKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWJzb2x1dGVEYXRlKGRhdGUsIHRoaXMuY29uZmlnLmFic29sdXRlVGVtcGxhdGVzLnNob3J0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0ZSAtIGRhdGVcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFic29sdXRlRGF0ZVRpbWVPcHRpb25zXG4gICAgICogQHJldHVybnMgYWJzb2x1dGUgZGF0ZSBpbiBzaG9ydCBmb3JtYXQgd2l0aCB0aW1lXG4gICAgICovXG4gICAgYWJzb2x1dGVTaG9ydERhdGVUaW1lKGRhdGU6IEQsIG9wdGlvbnM/OiBBYnNvbHV0ZURhdGVUaW1lT3B0aW9ucyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmFic29sdXRlRGF0ZShkYXRlLCB0aGlzLmNvbmZpZy5hYnNvbHV0ZVRlbXBsYXRlcy5zaG9ydCwgdHJ1ZSwgb3B0aW9ucz8ubWlsbGlzZWNvbmRzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0ZSAtIGRhdGVcbiAgICAgKiBAcmV0dXJucyBhYnNvbHV0ZSBkYXRlIGluIGxvbmcgZm9ybWF0XG4gICAgICovXG4gICAgYWJzb2x1dGVMb25nRGF0ZShkYXRlOiBEKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWJzb2x1dGVEYXRlKGRhdGUsIHRoaXMuY29uZmlnLmFic29sdXRlVGVtcGxhdGVzLmxvbmcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gQWJzb2x1dGVEYXRlVGltZU9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyBhYnNvbHV0ZSBkYXRlIGluIGxvbmcgZm9ybWF0IHdpdGggdGltZVxuICAgICAqL1xuICAgIGFic29sdXRlTG9uZ0RhdGVUaW1lKGRhdGU6IEQsIG9wdGlvbnM/OiBBYnNvbHV0ZURhdGVUaW1lT3B0aW9ucyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmFic29sdXRlRGF0ZShkYXRlLCB0aGlzLmNvbmZpZy5hYnNvbHV0ZVRlbXBsYXRlcy5sb25nLCB0cnVlLCBvcHRpb25zPy5taWxsaXNlY29uZHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzdGFydERhdGUgLSBzdGFydCBkYXRlXG4gICAgICogQHBhcmFtIGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgICAqIEBwYXJhbSB0ZW1wbGF0ZSAtIHRlbXBsYXRlXG4gICAgICogQHJldHVybnMgb3BlbmVkIGRhdGVcbiAgICAgKi9cbiAgICBvcGVuZWRSYW5nZURhdGUoc3RhcnREYXRlOiBEIHwgbnVsbCwgZW5kRGF0ZTogRCB8IG51bGwsIHRlbXBsYXRlOiBGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlKSB7XG4gICAgICAgIGlmICghdGhpcy5hZGFwdGVyLmlzRGF0ZUluc3RhbmNlKHN0YXJ0RGF0ZSkgJiYgIXRoaXMuYWRhcHRlci5pc0RhdGVJbnN0YW5jZShlbmREYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuaW52YWxpZERhdGVFcnJvclRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0geyAuLi50aGlzLmFkYXB0ZXIuY29uZmlnLnZhcmlhYmxlcywgLi4udGVtcGxhdGUudmFyaWFibGVzIH07XG4gICAgICAgIGxldCBwYXJhbXMgPSB7fTtcblxuICAgICAgICBpZiAoc3RhcnREYXRlKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoc3RhcnREYXRlLCB2YXJpYWJsZXMpO1xuXG4gICAgICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgLi4udmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIFNUQVJUX0RBVEU6IHRoaXMubWVzc2FnZUZvcm1hdC5jb21waWxlKHRlbXBsYXRlLlNUQVJUX0RBVEUpKHN0YXJ0RGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICAgICAgUkFOR0VfVFlQRTogJ29ubHlTdGFydCdcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoZW5kRGF0ZSkge1xuICAgICAgICAgICAgY29uc3QgZW5kRGF0ZVZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhlbmREYXRlLCB2YXJpYWJsZXMpO1xuXG4gICAgICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgLi4udmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIEVORF9EQVRFOiB0aGlzLm1lc3NhZ2VGb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5FTkRfREFURSkoZW5kRGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICAgICAgUkFOR0VfVFlQRTogJ29ubHlFbmQnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZUZvcm1hdC5jb21waWxlKHRlbXBsYXRlLkRBVEUpKHBhcmFtcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICAgKiBAcGFyYW0gZW5kRGF0ZSAtIGVuZCBkYXRlXG4gICAgICogQHBhcmFtIHRlbXBsYXRlIC0gdGVtcGxhdGVcbiAgICAgKiBAcmV0dXJucyBvcGVuZWQgZGF0ZVxuICAgICAqL1xuICAgIG9wZW5lZFJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlOiBEIHwgbnVsbCwgZW5kRGF0ZTogRCB8IG51bGwsIHRlbXBsYXRlOiBGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlKSB7XG4gICAgICAgIGlmICghdGhpcy5hZGFwdGVyLmlzRGF0ZUluc3RhbmNlKHN0YXJ0RGF0ZSkgJiYgIXRoaXMuYWRhcHRlci5pc0RhdGVJbnN0YW5jZShlbmREYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuaW52YWxpZERhdGVFcnJvclRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0geyAuLi50aGlzLmFkYXB0ZXIuY29uZmlnLnZhcmlhYmxlcywgLi4udGVtcGxhdGUudmFyaWFibGVzIH07XG4gICAgICAgIGxldCBwYXJhbXMgPSB7fTtcblxuICAgICAgICBpZiAoc3RhcnREYXRlKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoc3RhcnREYXRlLCB2YXJpYWJsZXMpO1xuXG4gICAgICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgLi4udmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIFNUQVJUX0RBVEVUSU1FOiB0aGlzLm1lc3NhZ2VGb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5TVEFSVF9EQVRFVElNRSkoc3RhcnREYXRlVmFyaWFibGVzKSxcbiAgICAgICAgICAgICAgICBSQU5HRV9UWVBFOiAnb25seVN0YXJ0J1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChlbmREYXRlKSB7XG4gICAgICAgICAgICBjb25zdCBlbmREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKGVuZERhdGUsIHZhcmlhYmxlcyk7XG5cbiAgICAgICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAuLi52YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgRU5EX0RBVEVUSU1FOiB0aGlzLm1lc3NhZ2VGb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5FTkRfREFURVRJTUUpKGVuZERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgICAgIFJBTkdFX1RZUEU6ICdvbmx5RW5kJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VGb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5EQVRFVElNRSkocGFyYW1zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhcnREYXRlIC0gc3RhcnQgZGF0ZVxuICAgICAqIEBwYXJhbSBlbmREYXRlIC0gZW5kIGRhdGVcbiAgICAgKiBAcGFyYW0gdGVtcGxhdGUgLSB0ZW1wbGF0ZVxuICAgICAqIEByZXR1cm5zIHJhbmdlIGRhdGUgaW4gdGVtcGxhdGUgZm9ybWF0XG4gICAgICovXG4gICAgcmFuZ2VEYXRlKHN0YXJ0RGF0ZTogRCwgZW5kRGF0ZTogRCwgdGVtcGxhdGU6IEZvcm1hdHRlclJhbmdlVGVtcGxhdGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXRoaXMuYWRhcHRlci5pc0RhdGVJbnN0YW5jZShzdGFydERhdGUpIHx8ICF0aGlzLmFkYXB0ZXIuaXNEYXRlSW5zdGFuY2UoZW5kRGF0ZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmludmFsaWREYXRlRXJyb3JUZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IHsgLi4udGhpcy5hZGFwdGVyLmNvbmZpZy52YXJpYWJsZXMsIC4uLnRlbXBsYXRlLnZhcmlhYmxlcyB9O1xuICAgICAgICBjb25zdCBzYW1lTW9udGggPSB0aGlzLmhhc1NhbWUoc3RhcnREYXRlLCBlbmREYXRlLCAnbW9udGgnKTtcblxuICAgICAgICBjb25zdCBzdGFydERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoc3RhcnREYXRlLCB2YXJpYWJsZXMpO1xuICAgICAgICBzdGFydERhdGVWYXJpYWJsZXMuU0FNRV9NT05USCA9IHNhbWVNb250aDtcblxuICAgICAgICBjb25zdCBlbmREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKGVuZERhdGUsIHZhcmlhYmxlcyk7XG4gICAgICAgIGVuZERhdGVWYXJpYWJsZXMuU0FNRV9NT05USCA9IHNhbWVNb250aDtcblxuICAgICAgICBjb25zdCBib3RoQ3VycmVudFllYXIgPSBzdGFydERhdGVWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID09PSAneWVzJyAmJiBlbmREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9PT0gJ3llcyc7XG4gICAgICAgIHN0YXJ0RGF0ZVZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPSBib3RoQ3VycmVudFllYXIgPyAneWVzJyA6ICdubyc7XG4gICAgICAgIGVuZERhdGVWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID0gYm90aEN1cnJlbnRZZWFyID8gJ3llcycgOiAnbm8nO1xuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgIC4uLnZhcmlhYmxlcyxcbiAgICAgICAgICAgIFNUQVJUX0RBVEU6IHRoaXMubWVzc2FnZUZvcm1hdC5jb21waWxlKHRlbXBsYXRlLlNUQVJUX0RBVEUpKHN0YXJ0RGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICBFTkRfREFURTogdGhpcy5tZXNzYWdlRm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuRU5EX0RBVEUpKGVuZERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgU0FNRV9NT05USDogc2FtZU1vbnRoXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZUZvcm1hdC5jb21waWxlKHRlbXBsYXRlLkRBVEUpKHBhcmFtcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICAgKiBAcGFyYW0gZW5kRGF0ZSAtIGVuZCBkYXRlXG4gICAgICogQHBhcmFtIHRlbXBsYXRlIC0gdGVtcGxhdGVcbiAgICAgKiBAcmV0dXJucyByYW5nZSBkYXRlIGluIHRlbXBsYXRlIGZvcm1hdCB3aXRoIHRpbWVcbiAgICAgKi9cbiAgICByYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZTogRCwgZW5kRGF0ZTogRCwgdGVtcGxhdGU6IEZvcm1hdHRlclJhbmdlVGVtcGxhdGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXRoaXMuYWRhcHRlci5pc0RhdGVJbnN0YW5jZShzdGFydERhdGUpIHx8ICF0aGlzLmFkYXB0ZXIuaXNEYXRlSW5zdGFuY2UoZW5kRGF0ZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmludmFsaWREYXRlRXJyb3JUZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IHsuLi50aGlzLmFkYXB0ZXIuY29uZmlnLnZhcmlhYmxlcywgLi4udGVtcGxhdGUudmFyaWFibGVzfTtcbiAgICAgICAgY29uc3Qgc2FtZU1vbnRoID0gdGhpcy5oYXNTYW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgJ21vbnRoJyk7XG4gICAgICAgIGNvbnN0IHNhbWVEYXkgPSB0aGlzLmhhc1NhbWUoc3RhcnREYXRlLCBlbmREYXRlLCAnZGF5Jyk7XG5cbiAgICAgICAgY29uc3Qgc3RhcnREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKHN0YXJ0RGF0ZSwgdmFyaWFibGVzKTtcbiAgICAgICAgc3RhcnREYXRlVmFyaWFibGVzLlNBTUVfTU9OVEggPSBzYW1lTW9udGg7XG4gICAgICAgIHN0YXJ0RGF0ZVZhcmlhYmxlcy5TQU1FX0RBWSA9IHNhbWVEYXk7XG5cbiAgICAgICAgY29uc3QgZW5kRGF0ZVZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhlbmREYXRlLCB2YXJpYWJsZXMpO1xuICAgICAgICBlbmREYXRlVmFyaWFibGVzLlNBTUVfTU9OVEggPSBzYW1lTW9udGg7XG4gICAgICAgIGVuZERhdGVWYXJpYWJsZXMuU0FNRV9EQVkgPSBzYW1lRGF5O1xuXG4gICAgICAgIGNvbnN0IGJvdGhDdXJyZW50WWVhciA9IHN0YXJ0RGF0ZVZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPT09ICd5ZXMnICYmIGVuZERhdGVWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID09PSAneWVzJztcbiAgICAgICAgc3RhcnREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9IGJvdGhDdXJyZW50WWVhciA/ICd5ZXMnIDogJ25vJztcbiAgICAgICAgZW5kRGF0ZVZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPSBib3RoQ3VycmVudFllYXIgPyAneWVzJyA6ICdubyc7XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICAgICAgLi4udmFyaWFibGVzLFxuICAgICAgICAgICAgU1RBUlRfREFURVRJTUU6IHRoaXMubWVzc2FnZUZvcm1hdC5jb21waWxlKHRlbXBsYXRlLlNUQVJUX0RBVEVUSU1FKShzdGFydERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgRU5EX0RBVEVUSU1FOiB0aGlzLm1lc3NhZ2VGb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5FTkRfREFURVRJTUUpKGVuZERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgU0FNRV9NT05USDogc2FtZU1vbnRoLFxuICAgICAgICAgICAgU0FNRV9EQVk6IHNhbWVEYXlcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlRm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuREFURVRJTUUpKHBhcmFtcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICAgKiBAcGFyYW0gZW5kRGF0ZSAtIGVuZCBkYXRlXG4gICAgICogQHJldHVybnMgcmFuZ2UgZGF0ZSBpbiBzaG9ydCBmb3JtYXRcbiAgICAgKi9cbiAgICByYW5nZVNob3J0RGF0ZShzdGFydERhdGU6IEQgfCBudWxsLCBlbmREYXRlPzogRCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHJhbmdlVGVtcGxhdGVzID0gdGhpcy5jb25maWcucmFuZ2VUZW1wbGF0ZXM7XG5cbiAgICAgICAgaWYgKHN0YXJ0RGF0ZSAmJiBlbmREYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYW5nZURhdGUoc3RhcnREYXRlLCBlbmREYXRlLCByYW5nZVRlbXBsYXRlcy5jbG9zZWRSYW5nZS5zaG9ydCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5vcGVuZWRSYW5nZURhdGUoc3RhcnREYXRlLCBlbmREYXRlIHx8IG51bGwsIHJhbmdlVGVtcGxhdGVzLm9wZW5lZFJhbmdlLnNob3J0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhcnREYXRlIC0gc3RhcnQgZGF0ZVxuICAgICAqIEBwYXJhbSBlbmREYXRlIC0gZW5kIGRhdGVcbiAgICAgKiBAcmV0dXJucyByYW5nZSBkYXRlIGluIHNob3J0IGZvcm1hdCB3aXRoIHRpbWVcbiAgICAgKi9cbiAgICByYW5nZVNob3J0RGF0ZVRpbWUoc3RhcnREYXRlOiBEIHwgbnVsbCwgZW5kRGF0ZT86IEQpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCByYW5nZVRlbXBsYXRlcyA9IHRoaXMuY29uZmlnLnJhbmdlVGVtcGxhdGVzO1xuXG4gICAgICAgIGlmIChzdGFydERhdGUgJiYgZW5kRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmFuZ2VEYXRlVGltZShzdGFydERhdGUsIGVuZERhdGUsIHJhbmdlVGVtcGxhdGVzLmNsb3NlZFJhbmdlLnNob3J0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5lZFJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlLCBlbmREYXRlIHx8IG51bGwsIHJhbmdlVGVtcGxhdGVzLm9wZW5lZFJhbmdlLnNob3J0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhcnREYXRlIC0gc3RhcnQgZGF0ZVxuICAgICAqIEBwYXJhbSBlbmREYXRlIC0gZW5kIGRhdGVcbiAgICAgKiBAcmV0dXJucyByYW5nZSBkYXRlIGluIGxvbmcgZm9ybWF0XG4gICAgICovXG4gICAgcmFuZ2VMb25nRGF0ZShzdGFydERhdGU6IEQgfCBudWxsLCBlbmREYXRlPzogRCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHJhbmdlVGVtcGxhdGVzID0gdGhpcy5jb25maWcucmFuZ2VUZW1wbGF0ZXM7XG5cbiAgICAgICAgaWYgKHN0YXJ0RGF0ZSAmJiBlbmREYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYW5nZURhdGUoc3RhcnREYXRlLCBlbmREYXRlLCByYW5nZVRlbXBsYXRlcy5jbG9zZWRSYW5nZS5sb25nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5lZFJhbmdlRGF0ZShzdGFydERhdGUsIGVuZERhdGUgfHwgbnVsbCwgcmFuZ2VUZW1wbGF0ZXMub3BlbmVkUmFuZ2UubG9uZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICAgKiBAcGFyYW0gZW5kRGF0ZSAtIGVuZCBkYXRlXG4gICAgICogQHJldHVybnMgcmFuZ2UgZGF0ZSBpbiBsb25nIGZvcm1hdCB3aXRoIHRpbWVcbiAgICAgKi9cbiAgICByYW5nZUxvbmdEYXRlVGltZShzdGFydERhdGU6IEQgfCBudWxsLCBlbmREYXRlPzogRCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHJhbmdlVGVtcGxhdGVzID0gdGhpcy5jb25maWcucmFuZ2VUZW1wbGF0ZXM7XG5cbiAgICAgICAgaWYgKHN0YXJ0RGF0ZSAmJiBlbmREYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgcmFuZ2VUZW1wbGF0ZXMuY2xvc2VkUmFuZ2UubG9uZyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5vcGVuZWRSYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSB8fCBudWxsLCByYW5nZVRlbXBsYXRlcy5vcGVuZWRSYW5nZS5sb25nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhcnREYXRlIC0gc3RhcnQgZGF0ZVxuICAgICAqIEBwYXJhbSBlbmREYXRlIC0gZW5kIGRhdGVcbiAgICAgKiBAcmV0dXJucyByYW5nZSBtaWRkbGUgZGF0ZSB3aXRoIHRpbWVcbiAgICAgKi9cbiAgICByYW5nZU1pZGRsZURhdGVUaW1lKHN0YXJ0RGF0ZTogRCwgZW5kRGF0ZTogRCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlLCBlbmREYXRlLCB0aGlzLmNvbmZpZy5yYW5nZVRlbXBsYXRlcy5jbG9zZWRSYW5nZS5taWRkbGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29tcGlsZVZhcmlhYmxlcyhkYXRlOiBELCB2YXJpYWJsZXM6IGFueSk6IGFueSB7XG4gICAgICAgIGNvbnN0IGNvbXBpbGVkVmFyaWFibGVzOiBhbnkgPSB7fTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZm9yLWluXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHZhcmlhYmxlcykge1xuICAgICAgICAgICAgaWYgKCF2YXJpYWJsZXMuaGFzT3duUHJvcGVydHkoa2V5KSkgeyBjb250aW51ZTsgfVxuXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZhcmlhYmxlc1trZXldO1xuICAgICAgICAgICAgY29tcGlsZWRWYXJpYWJsZXNba2V5XSA9IHRoaXMuYWRhcHRlci5mb3JtYXQoZGF0ZSwgdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29tcGlsZWRWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID0gdGhpcy5oYXNTYW1lKGRhdGUsIHRoaXMuYWRhcHRlci50b2RheSgpLCAneWVhcicpO1xuXG4gICAgICAgIHJldHVybiBjb21waWxlZFZhcmlhYmxlcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzQmVmb3JlWWVzdGVyZGF5KGRhdGU6IEQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRhcHRlci5kYXlzRnJvbVRvZGF5KGRhdGUpIDw9IC0yO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNZZXN0ZXJkYXkoZGF0ZTogRCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBpbnRlcnZhbCA9IHRoaXMuYWRhcHRlci5kYXlzRnJvbVRvZGF5KGRhdGUpO1xuXG4gICAgICAgIHJldHVybiBpbnRlcnZhbCA+IC0yICYmIGludGVydmFsIDw9IC0xO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNUb2RheShkYXRlOiBEKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuZGF5c0Zyb21Ub2RheShkYXRlKSA9PT0gMDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzVG9tb3Jyb3coZGF0ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGludGVydmFsID0gdGhpcy5hZGFwdGVyLmRheXNGcm9tVG9kYXkoZGF0ZSk7XG5cbiAgICAgICAgcmV0dXJuIGludGVydmFsID49IDEgJiYgaW50ZXJ2YWwgPCAyO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNBZnRlclRvbW9ycm93KGRhdGU6IEQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRhcHRlci5kYXlzRnJvbVRvZGF5KGRhdGUpID49IDI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYXNTYW1lKHN0YXJ0RGF0ZTogRCwgZW5kRGF0ZTogRCwgdW5pdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRhcHRlci5oYXNTYW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgdW5pdCkgPyAneWVzJyA6ICdubyc7XG4gICAgfVxufVxuIl19