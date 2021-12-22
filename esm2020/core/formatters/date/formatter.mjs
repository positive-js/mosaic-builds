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
        const isBeforeYesterday = this.adapter.diffNow(date, 'days') < -2;
        const isYesterday = this.adapter.diffNow(date, 'days') <= -1 && this.adapter.diffNow(date, 'days') > -2;
        const isToday = this.adapter.hasSame(this.adapter.today(), date, 'days');
        const isTomorrow = this.adapter.diffNow(date, 'days') >= 1 && this.adapter.diffNow(date, 'days') < 2;
        const isAfterTomorrow = this.adapter.diffNow(date, 'days') > 1;
        const templateVariables = { ...this.adapter.config.variables, ...template.variables };
        const variables = this.compileVariables(date, templateVariables);
        let newTemplate;
        if (isBeforeYesterday) {
            newTemplate = template.BEFORE_YESTERDAY;
        }
        else if (isYesterday) {
            newTemplate = template.YESTERDAY;
        }
        else if (isToday) {
            newTemplate = template.TODAY;
        }
        else if (isTomorrow) {
            newTemplate = template.TOMORROW;
        }
        else if (isAfterTomorrow) {
            newTemplate = template.AFTER_TOMORROW;
        }
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
    hasSame(startDate, endDate, unit) {
        return this.adapter.hasSame(startDate, endDate, unit) ? 'yes' : 'no';
    }
}
/** @nocollapse */ /** @nocollapse */ DateFormatter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: DateFormatter, deps: [{ token: i1.DateAdapter }, { token: MC_DATE_LOCALE }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ /** @nocollapse */ DateFormatter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: DateFormatter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: DateFormatter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.DateAdapter }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_DATE_LOCALE]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2NvcmUvZm9ybWF0dGVycy9kYXRlL2Zvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxrQ0FBa0M7QUFDbEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsNkJBQTZCO0FBQzdCLE9BQU8sYUFBYSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFdkUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7O0FBc0V6QyxNQUFNLE9BQU8sYUFBYTtJQU90QixZQUNxQixPQUF1QixFQUNoQixNQUFjO1FBRHJCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBTDNCLHlCQUFvQixHQUFXLGNBQWMsQ0FBQztRQVEzRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRTVDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFjO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxZQUFZLENBQUMsSUFBTyxFQUFFLFFBQW1DO1FBQ3JELElBQUksQ0FBQyxJQUFJLENB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TyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWxGLE9BQU8saUJBQWlCLENBQUM7SUFDN0IsQ0FBQztJQUVPLE9BQU8sQ0FBQyxTQUFZLEVBQUUsT0FBVSxFQUFFLElBQVk7UUFDbEQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN6RSxDQUFDOztnSkF0V1EsYUFBYSw2Q0FTVixjQUFjO29KQVRqQixhQUFhOzJGQUFiLGFBQWE7a0JBRHpCLFVBQVU7OzBCQVVGLE1BQU07MkJBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOm5vLW1hZ2ljLW51bWJlcnNcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gdHNsaW50OmRpc2FibGU6aW1wb3J0LW5hbWVcbmltcG9ydCBNZXNzYWdlRm9ybWF0IGZyb20gJ0BtZXNzYWdlZm9ybWF0L2NvcmUnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIsIE1DX0RBVEVfTE9DQUxFIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2RhdGV0aW1lJztcblxuaW1wb3J0IHsgZW5VUyB9IGZyb20gJy4vdGVtcGxhdGVzL2VuLVVTJztcbmltcG9ydCB7IHJ1UlUgfSBmcm9tICcuL3RlbXBsYXRlcy9ydS1SVSc7XG5cblxuLyoqXG4gKiBpbnRlcmZhY2UgZm9yIGFic29sdXRlIGRhdGUgb3IgZGF0ZXRpbWUgZm9ybWF0dGVyIHRlbXBsYXRlXG4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBGb3JtYXR0ZXJBYnNvbHV0ZVRlbXBsYXRlIHtcbiAgICB2YXJpYWJsZXM/OiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfTtcbiAgICBEQVRFOiBzdHJpbmc7XG4gICAgREFURVRJTUU6IHN0cmluZztcbn1cblxuLyoqXG4gKiBpbnRlcmZhY2UgZm9yIHJhbmdlIGRhdGUgb3IgZGF0ZXRpbWUgZm9ybWF0dGVyIHRlbXBsYXRlXG4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlIHtcbiAgICB2YXJpYWJsZXM/OiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfTtcbiAgICBTVEFSVF9EQVRFOiBzdHJpbmc7XG4gICAgRU5EX0RBVEU6IHN0cmluZztcbiAgICBEQVRFOiBzdHJpbmc7XG4gICAgU1RBUlRfREFURVRJTUU6IHN0cmluZztcbiAgICBFTkRfREFURVRJTUU6IHN0cmluZztcbiAgICBEQVRFVElNRTogc3RyaW5nO1xufVxuXG4vKipcbiAqIGludGVyZmFjZSBmb3IgcmVsYXRpdmUgZGF0ZSBvciBkYXRldGltZSBmb3JtYXR0ZXIgdGVtcGxhdGVcbiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1hdHRlclJlbGF0aXZlVGVtcGxhdGUge1xuICAgIHZhcmlhYmxlcz86IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9O1xuICAgIEJFRk9SRV9ZRVNURVJEQVk6IHN0cmluZztcbiAgICBZRVNURVJEQVk6IHN0cmluZztcbiAgICBUT0RBWTogc3RyaW5nO1xuICAgIFRPTU9SUk9XOiBzdHJpbmc7XG4gICAgQUZURVJfVE9NT1JST1c6IHN0cmluZztcbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIEFic29sdXRlRGF0ZVRpbWVPcHRpb25zIHtcbiAgICBtaWxsaXNlY29uZHM/OiBib29sZWFuO1xufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWF0dGVyQ29uZmlnIHtcbiAgICByZWxhdGl2ZVRlbXBsYXRlczoge1xuICAgICAgICBzaG9ydDogRm9ybWF0dGVyUmVsYXRpdmVUZW1wbGF0ZTtcbiAgICAgICAgbG9uZzogRm9ybWF0dGVyUmVsYXRpdmVUZW1wbGF0ZTtcbiAgICB9O1xuICAgIGFic29sdXRlVGVtcGxhdGVzOiB7XG4gICAgICAgIHNob3J0OiBGb3JtYXR0ZXJBYnNvbHV0ZVRlbXBsYXRlO1xuICAgICAgICBsb25nOiBGb3JtYXR0ZXJBYnNvbHV0ZVRlbXBsYXRlO1xuICAgIH07XG4gICAgcmFuZ2VUZW1wbGF0ZXM6IHtcbiAgICAgICAgY2xvc2VkUmFuZ2U6IHtcbiAgICAgICAgICAgIHNob3J0OiBGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlO1xuICAgICAgICAgICAgbWlkZGxlOiBGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlO1xuICAgICAgICAgICAgbG9uZzogRm9ybWF0dGVyUmFuZ2VUZW1wbGF0ZTtcbiAgICAgICAgfTtcbiAgICAgICAgb3BlbmVkUmFuZ2U6IHtcbiAgICAgICAgICAgIHNob3J0OiBGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlO1xuICAgICAgICAgICAgbG9uZzogRm9ybWF0dGVyUmFuZ2VUZW1wbGF0ZTtcbiAgICAgICAgfTtcbiAgICB9O1xufVxuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRlRm9ybWF0dGVyPEQ+IHtcbiAgICBjb25maWc6IEZvcm1hdHRlckNvbmZpZztcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgaW52YWxpZERhdGVFcnJvclRleHQ6IHN0cmluZyA9ICdJbnZhbGlkIGRhdGUnO1xuXG4gICAgcHJpdmF0ZSBtZXNzYWdlRm9ybWF0OiBNZXNzYWdlRm9ybWF0O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgYWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXG4gICAgICAgIEBJbmplY3QoTUNfREFURV9MT0NBTEUpIGxvY2FsZTogc3RyaW5nXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY29uZmlnID0gbG9jYWxlID09PSAnZW4nID8gZW5VUyA6IHJ1UlU7XG5cbiAgICAgICAgdGhpcy5tZXNzYWdlRm9ybWF0ID0gbmV3IE1lc3NhZ2VGb3JtYXQobG9jYWxlKTtcbiAgICB9XG5cbiAgICBzZXRMb2NhbGUobG9jYWxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb25maWcgPSBsb2NhbGUgPT09ICdlbicgPyBlblVTIDogcnVSVTtcblxuICAgICAgICB0aGlzLmFkYXB0ZXIuc2V0TG9jYWxlKGxvY2FsZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGUgLSBkYXRlXG4gICAgICogQHBhcmFtIHRlbXBsYXRlIC0gdGVtcGxhdGVcbiAgICAgKiBAcmV0dXJucyByZWxhdGl2ZSBkYXRlIGJ5IHRlbXBsYXRlXG4gICAgICovXG4gICAgcmVsYXRpdmVEYXRlKGRhdGU6IEQsIHRlbXBsYXRlOiBGb3JtYXR0ZXJSZWxhdGl2ZVRlbXBsYXRlKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF0aGlzLmFkYXB0ZXIuaXNEYXRlSW5zdGFuY2UoZGF0ZSkpIHsgdGhyb3cgbmV3IEVycm9yKHRoaXMuaW52YWxpZERhdGVFcnJvclRleHQpOyB9XG5cbiAgICAgICAgY29uc3QgaXNCZWZvcmVZZXN0ZXJkYXkgPSB0aGlzLmFkYXB0ZXIuZGlmZk5vdyhkYXRlLCAnZGF5cycpIDwgLTI7XG4gICAgICAgIGNvbnN0IGlzWWVzdGVyZGF5ID0gdGhpcy5hZGFwdGVyLmRpZmZOb3coZGF0ZSwgJ2RheXMnKSA8PSAtMSAmJiB0aGlzLmFkYXB0ZXIuZGlmZk5vdyhkYXRlLCAnZGF5cycpID4gLTI7XG4gICAgICAgIGNvbnN0IGlzVG9kYXkgPSB0aGlzLmFkYXB0ZXIuaGFzU2FtZSh0aGlzLmFkYXB0ZXIudG9kYXkoKSwgZGF0ZSwgJ2RheXMnKTtcbiAgICAgICAgY29uc3QgaXNUb21vcnJvdyA9IHRoaXMuYWRhcHRlci5kaWZmTm93KGRhdGUsICdkYXlzJykgPj0gMSAmJiB0aGlzLmFkYXB0ZXIuZGlmZk5vdyhkYXRlLCAnZGF5cycpIDwgMjtcbiAgICAgICAgY29uc3QgaXNBZnRlclRvbW9ycm93ID0gdGhpcy5hZGFwdGVyLmRpZmZOb3coZGF0ZSwgJ2RheXMnKSA+IDE7XG5cbiAgICAgICAgY29uc3QgdGVtcGxhdGVWYXJpYWJsZXMgPSB7Li4udGhpcy5hZGFwdGVyLmNvbmZpZy52YXJpYWJsZXMsIC4uLnRlbXBsYXRlLnZhcmlhYmxlc307XG4gICAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhkYXRlLCB0ZW1wbGF0ZVZhcmlhYmxlcyk7XG4gICAgICAgIGxldCBuZXdUZW1wbGF0ZTtcblxuICAgICAgICBpZiAoaXNCZWZvcmVZZXN0ZXJkYXkpIHtcbiAgICAgICAgICAgIG5ld1RlbXBsYXRlID0gdGVtcGxhdGUuQkVGT1JFX1lFU1RFUkRBWTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1llc3RlcmRheSkge1xuICAgICAgICAgICAgbmV3VGVtcGxhdGUgPSB0ZW1wbGF0ZS5ZRVNURVJEQVk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNUb2RheSkge1xuICAgICAgICAgICAgbmV3VGVtcGxhdGUgPSB0ZW1wbGF0ZS5UT0RBWTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1RvbW9ycm93KSB7XG4gICAgICAgICAgICBuZXdUZW1wbGF0ZSA9IHRlbXBsYXRlLlRPTU9SUk9XO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQWZ0ZXJUb21vcnJvdykge1xuICAgICAgICAgICAgbmV3VGVtcGxhdGUgPSB0ZW1wbGF0ZS5BRlRFUl9UT01PUlJPVztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VGb3JtYXQuY29tcGlsZShuZXdUZW1wbGF0ZSkodmFyaWFibGVzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0ZSAtIGRhdGVcbiAgICAgKiBAcmV0dXJucyByZWxhdGl2ZSBkYXRlIGluIHNob3J0IGZvcm1hdFxuICAgICAqL1xuICAgIHJlbGF0aXZlU2hvcnREYXRlKGRhdGU6IEQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWxhdGl2ZURhdGUoZGF0ZSwgdGhpcy5jb25maWcucmVsYXRpdmVUZW1wbGF0ZXMuc2hvcnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZVxuICAgICAqIEByZXR1cm5zIHJlbGF0aXZlIGRhdGUgaW4gbG9uZyBmb3JtYXRcbiAgICAgKi9cbiAgICByZWxhdGl2ZUxvbmdEYXRlKGRhdGU6IEQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWxhdGl2ZURhdGUoZGF0ZSwgdGhpcy5jb25maWcucmVsYXRpdmVUZW1wbGF0ZXMubG9uZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGUgLSBkYXRlXG4gICAgICogQHBhcmFtIHBhcmFtcyAtIHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gZGF0ZXRpbWUgLSBzaG91bGQgdGltZSBiZSBzaG93biBhcyB3ZWxsXG4gICAgICogQHBhcmFtIG1pbGxpc2Vjb25kcyAtIHNob3VsZCB0aW1lIHdpdGggbWlsbGlzZWNvbmRzIGJlIHNob3duIGFzIHdlbGxcbiAgICAgKiBAcmV0dXJucyBhYnNvbHV0ZSBkYXRlIGluIGNvbW1vbiBmb3JtYXRcbiAgICAgKi9cbiAgICBhYnNvbHV0ZURhdGUoXG4gICAgICAgIGRhdGU6IEQsXG4gICAgICAgIHBhcmFtczogRm9ybWF0dGVyQWJzb2x1dGVUZW1wbGF0ZSxcbiAgICAgICAgZGF0ZXRpbWUgPSBmYWxzZSxcbiAgICAgICAgbWlsbGlzZWNvbmRzID0gZmFsc2VcbiAgICApOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXRoaXMuYWRhcHRlci5pc0RhdGVJbnN0YW5jZShkYXRlKSkgeyB0aHJvdyBuZXcgRXJyb3IodGhpcy5pbnZhbGlkRGF0ZUVycm9yVGV4dCk7IH1cblxuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoZGF0ZSwgeyAuLi50aGlzLmFkYXB0ZXIuY29uZmlnLnZhcmlhYmxlcywgLi4ucGFyYW1zLnZhcmlhYmxlcyB9KTtcblxuICAgICAgICB2YXJpYWJsZXMuU0hPV19NSUxMSVNFQ09ORFMgPSBtaWxsaXNlY29uZHMgPyAneWVzJyA6ICdubyc7XG5cbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBkYXRldGltZSA/IHBhcmFtcy5EQVRFVElNRSA6IHBhcmFtcy5EQVRFO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VGb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZSkodmFyaWFibGVzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0ZSAtIGRhdGVcbiAgICAgKiBAcmV0dXJucyBhYnNvbHV0ZSBkYXRlIGluIHNob3J0IGZvcm1hdFxuICAgICAqL1xuICAgIGFic29sdXRlU2hvcnREYXRlKGRhdGU6IEQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5hYnNvbHV0ZURhdGUoZGF0ZSwgdGhpcy5jb25maWcuYWJzb2x1dGVUZW1wbGF0ZXMuc2hvcnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gQWJzb2x1dGVEYXRlVGltZU9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyBhYnNvbHV0ZSBkYXRlIGluIHNob3J0IGZvcm1hdCB3aXRoIHRpbWVcbiAgICAgKi9cbiAgICBhYnNvbHV0ZVNob3J0RGF0ZVRpbWUoZGF0ZTogRCwgb3B0aW9ucz86IEFic29sdXRlRGF0ZVRpbWVPcHRpb25zKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWJzb2x1dGVEYXRlKGRhdGUsIHRoaXMuY29uZmlnLmFic29sdXRlVGVtcGxhdGVzLnNob3J0LCB0cnVlLCBvcHRpb25zPy5taWxsaXNlY29uZHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZVxuICAgICAqIEByZXR1cm5zIGFic29sdXRlIGRhdGUgaW4gbG9uZyBmb3JtYXRcbiAgICAgKi9cbiAgICBhYnNvbHV0ZUxvbmdEYXRlKGRhdGU6IEQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5hYnNvbHV0ZURhdGUoZGF0ZSwgdGhpcy5jb25maWcuYWJzb2x1dGVUZW1wbGF0ZXMubG9uZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGUgLSBkYXRlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBBYnNvbHV0ZURhdGVUaW1lT3B0aW9uc1xuICAgICAqIEByZXR1cm5zIGFic29sdXRlIGRhdGUgaW4gbG9uZyBmb3JtYXQgd2l0aCB0aW1lXG4gICAgICovXG4gICAgYWJzb2x1dGVMb25nRGF0ZVRpbWUoZGF0ZTogRCwgb3B0aW9ucz86IEFic29sdXRlRGF0ZVRpbWVPcHRpb25zKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWJzb2x1dGVEYXRlKGRhdGUsIHRoaXMuY29uZmlnLmFic29sdXRlVGVtcGxhdGVzLmxvbmcsIHRydWUsIG9wdGlvbnM/Lm1pbGxpc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICAgKiBAcGFyYW0gZW5kRGF0ZSAtIGVuZCBkYXRlXG4gICAgICogQHBhcmFtIHRlbXBsYXRlIC0gdGVtcGxhdGVcbiAgICAgKiBAcmV0dXJucyBvcGVuZWQgZGF0ZVxuICAgICAqL1xuICAgIG9wZW5lZFJhbmdlRGF0ZShzdGFydERhdGU6IEQgfCBudWxsLCBlbmREYXRlOiBEIHwgbnVsbCwgdGVtcGxhdGU6IEZvcm1hdHRlclJhbmdlVGVtcGxhdGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uoc3RhcnREYXRlKSAmJiAhdGhpcy5hZGFwdGVyLmlzRGF0ZUluc3RhbmNlKGVuZERhdGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5pbnZhbGlkRGF0ZUVycm9yVGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB7IC4uLnRoaXMuYWRhcHRlci5jb25maWcudmFyaWFibGVzLCAuLi50ZW1wbGF0ZS52YXJpYWJsZXMgfTtcbiAgICAgICAgbGV0IHBhcmFtcyA9IHt9O1xuXG4gICAgICAgIGlmIChzdGFydERhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0RGF0ZVZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhzdGFydERhdGUsIHZhcmlhYmxlcyk7XG5cbiAgICAgICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAuLi52YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgU1RBUlRfREFURTogdGhpcy5tZXNzYWdlRm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuU1RBUlRfREFURSkoc3RhcnREYXRlVmFyaWFibGVzKSxcbiAgICAgICAgICAgICAgICBSQU5HRV9UWVBFOiAnb25seVN0YXJ0J1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChlbmREYXRlKSB7XG4gICAgICAgICAgICBjb25zdCBlbmREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKGVuZERhdGUsIHZhcmlhYmxlcyk7XG5cbiAgICAgICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAuLi52YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgRU5EX0RBVEU6IHRoaXMubWVzc2FnZUZvcm1hdC5jb21waWxlKHRlbXBsYXRlLkVORF9EQVRFKShlbmREYXRlVmFyaWFibGVzKSxcbiAgICAgICAgICAgICAgICBSQU5HRV9UWVBFOiAnb25seUVuZCdcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlRm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuREFURSkocGFyYW1zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhcnREYXRlIC0gc3RhcnQgZGF0ZVxuICAgICAqIEBwYXJhbSBlbmREYXRlIC0gZW5kIGRhdGVcbiAgICAgKiBAcGFyYW0gdGVtcGxhdGUgLSB0ZW1wbGF0ZVxuICAgICAqIEByZXR1cm5zIG9wZW5lZCBkYXRlXG4gICAgICovXG4gICAgb3BlbmVkUmFuZ2VEYXRlVGltZShzdGFydERhdGU6IEQgfCBudWxsLCBlbmREYXRlOiBEIHwgbnVsbCwgdGVtcGxhdGU6IEZvcm1hdHRlclJhbmdlVGVtcGxhdGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uoc3RhcnREYXRlKSAmJiAhdGhpcy5hZGFwdGVyLmlzRGF0ZUluc3RhbmNlKGVuZERhdGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5pbnZhbGlkRGF0ZUVycm9yVGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB7IC4uLnRoaXMuYWRhcHRlci5jb25maWcudmFyaWFibGVzLCAuLi50ZW1wbGF0ZS52YXJpYWJsZXMgfTtcbiAgICAgICAgbGV0IHBhcmFtcyA9IHt9O1xuXG4gICAgICAgIGlmIChzdGFydERhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0RGF0ZVZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhzdGFydERhdGUsIHZhcmlhYmxlcyk7XG5cbiAgICAgICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAuLi52YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgU1RBUlRfREFURVRJTUU6IHRoaXMubWVzc2FnZUZvcm1hdC5jb21waWxlKHRlbXBsYXRlLlNUQVJUX0RBVEVUSU1FKShzdGFydERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgICAgIFJBTkdFX1RZUEU6ICdvbmx5U3RhcnQnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKGVuZERhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGVuZERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoZW5kRGF0ZSwgdmFyaWFibGVzKTtcblxuICAgICAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIC4uLnZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICBFTkRfREFURVRJTUU6IHRoaXMubWVzc2FnZUZvcm1hdC5jb21waWxlKHRlbXBsYXRlLkVORF9EQVRFVElNRSkoZW5kRGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICAgICAgUkFOR0VfVFlQRTogJ29ubHlFbmQnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZUZvcm1hdC5jb21waWxlKHRlbXBsYXRlLkRBVEVUSU1FKShwYXJhbXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzdGFydERhdGUgLSBzdGFydCBkYXRlXG4gICAgICogQHBhcmFtIGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgICAqIEBwYXJhbSB0ZW1wbGF0ZSAtIHRlbXBsYXRlXG4gICAgICogQHJldHVybnMgcmFuZ2UgZGF0ZSBpbiB0ZW1wbGF0ZSBmb3JtYXRcbiAgICAgKi9cbiAgICByYW5nZURhdGUoc3RhcnREYXRlOiBELCBlbmREYXRlOiBELCB0ZW1wbGF0ZTogRm9ybWF0dGVyUmFuZ2VUZW1wbGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdGhpcy5hZGFwdGVyLmlzRGF0ZUluc3RhbmNlKHN0YXJ0RGF0ZSkgfHwgIXRoaXMuYWRhcHRlci5pc0RhdGVJbnN0YW5jZShlbmREYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuaW52YWxpZERhdGVFcnJvclRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0geyAuLi50aGlzLmFkYXB0ZXIuY29uZmlnLnZhcmlhYmxlcywgLi4udGVtcGxhdGUudmFyaWFibGVzIH07XG4gICAgICAgIGNvbnN0IHNhbWVNb250aCA9IHRoaXMuaGFzU2FtZShzdGFydERhdGUsIGVuZERhdGUsICdtb250aCcpO1xuXG4gICAgICAgIGNvbnN0IHN0YXJ0RGF0ZVZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhzdGFydERhdGUsIHZhcmlhYmxlcyk7XG4gICAgICAgIHN0YXJ0RGF0ZVZhcmlhYmxlcy5TQU1FX01PTlRIID0gc2FtZU1vbnRoO1xuXG4gICAgICAgIGNvbnN0IGVuZERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoZW5kRGF0ZSwgdmFyaWFibGVzKTtcbiAgICAgICAgZW5kRGF0ZVZhcmlhYmxlcy5TQU1FX01PTlRIID0gc2FtZU1vbnRoO1xuXG4gICAgICAgIGNvbnN0IGJvdGhDdXJyZW50WWVhciA9IHN0YXJ0RGF0ZVZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPT09ICd5ZXMnICYmIGVuZERhdGVWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID09PSAneWVzJztcbiAgICAgICAgc3RhcnREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9IGJvdGhDdXJyZW50WWVhciA/ICd5ZXMnIDogJ25vJztcbiAgICAgICAgZW5kRGF0ZVZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPSBib3RoQ3VycmVudFllYXIgPyAneWVzJyA6ICdubyc7XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICAgICAgLi4udmFyaWFibGVzLFxuICAgICAgICAgICAgU1RBUlRfREFURTogdGhpcy5tZXNzYWdlRm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuU1RBUlRfREFURSkoc3RhcnREYXRlVmFyaWFibGVzKSxcbiAgICAgICAgICAgIEVORF9EQVRFOiB0aGlzLm1lc3NhZ2VGb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5FTkRfREFURSkoZW5kRGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICBTQU1FX01PTlRIOiBzYW1lTW9udGhcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlRm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuREFURSkocGFyYW1zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhcnREYXRlIC0gc3RhcnQgZGF0ZVxuICAgICAqIEBwYXJhbSBlbmREYXRlIC0gZW5kIGRhdGVcbiAgICAgKiBAcGFyYW0gdGVtcGxhdGUgLSB0ZW1wbGF0ZVxuICAgICAqIEByZXR1cm5zIHJhbmdlIGRhdGUgaW4gdGVtcGxhdGUgZm9ybWF0IHdpdGggdGltZVxuICAgICAqL1xuICAgIHJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlOiBELCBlbmREYXRlOiBELCB0ZW1wbGF0ZTogRm9ybWF0dGVyUmFuZ2VUZW1wbGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdGhpcy5hZGFwdGVyLmlzRGF0ZUluc3RhbmNlKHN0YXJ0RGF0ZSkgfHwgIXRoaXMuYWRhcHRlci5pc0RhdGVJbnN0YW5jZShlbmREYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuaW52YWxpZERhdGVFcnJvclRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0gey4uLnRoaXMuYWRhcHRlci5jb25maWcudmFyaWFibGVzLCAuLi50ZW1wbGF0ZS52YXJpYWJsZXN9O1xuICAgICAgICBjb25zdCBzYW1lTW9udGggPSB0aGlzLmhhc1NhbWUoc3RhcnREYXRlLCBlbmREYXRlLCAnbW9udGgnKTtcbiAgICAgICAgY29uc3Qgc2FtZURheSA9IHRoaXMuaGFzU2FtZShzdGFydERhdGUsIGVuZERhdGUsICdkYXknKTtcblxuICAgICAgICBjb25zdCBzdGFydERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoc3RhcnREYXRlLCB2YXJpYWJsZXMpO1xuICAgICAgICBzdGFydERhdGVWYXJpYWJsZXMuU0FNRV9NT05USCA9IHNhbWVNb250aDtcbiAgICAgICAgc3RhcnREYXRlVmFyaWFibGVzLlNBTUVfREFZID0gc2FtZURheTtcblxuICAgICAgICBjb25zdCBlbmREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKGVuZERhdGUsIHZhcmlhYmxlcyk7XG4gICAgICAgIGVuZERhdGVWYXJpYWJsZXMuU0FNRV9NT05USCA9IHNhbWVNb250aDtcbiAgICAgICAgZW5kRGF0ZVZhcmlhYmxlcy5TQU1FX0RBWSA9IHNhbWVEYXk7XG5cbiAgICAgICAgY29uc3QgYm90aEN1cnJlbnRZZWFyID0gc3RhcnREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9PT0gJ3llcycgJiYgZW5kRGF0ZVZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPT09ICd5ZXMnO1xuICAgICAgICBzdGFydERhdGVWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID0gYm90aEN1cnJlbnRZZWFyID8gJ3llcycgOiAnbm8nO1xuICAgICAgICBlbmREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9IGJvdGhDdXJyZW50WWVhciA/ICd5ZXMnIDogJ25vJztcblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAuLi52YXJpYWJsZXMsXG4gICAgICAgICAgICBTVEFSVF9EQVRFVElNRTogdGhpcy5tZXNzYWdlRm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuU1RBUlRfREFURVRJTUUpKHN0YXJ0RGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICBFTkRfREFURVRJTUU6IHRoaXMubWVzc2FnZUZvcm1hdC5jb21waWxlKHRlbXBsYXRlLkVORF9EQVRFVElNRSkoZW5kRGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICBTQU1FX01PTlRIOiBzYW1lTW9udGgsXG4gICAgICAgICAgICBTQU1FX0RBWTogc2FtZURheVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VGb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5EQVRFVElNRSkocGFyYW1zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhcnREYXRlIC0gc3RhcnQgZGF0ZVxuICAgICAqIEBwYXJhbSBlbmREYXRlIC0gZW5kIGRhdGVcbiAgICAgKiBAcmV0dXJucyByYW5nZSBkYXRlIGluIHNob3J0IGZvcm1hdFxuICAgICAqL1xuICAgIHJhbmdlU2hvcnREYXRlKHN0YXJ0RGF0ZTogRCB8IG51bGwsIGVuZERhdGU/OiBEKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcmFuZ2VUZW1wbGF0ZXMgPSB0aGlzLmNvbmZpZy5yYW5nZVRlbXBsYXRlcztcblxuICAgICAgICBpZiAoc3RhcnREYXRlICYmIGVuZERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhbmdlRGF0ZShzdGFydERhdGUsIGVuZERhdGUsIHJhbmdlVGVtcGxhdGVzLmNsb3NlZFJhbmdlLnNob3J0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5lZFJhbmdlRGF0ZShzdGFydERhdGUsIGVuZERhdGUgfHwgbnVsbCwgcmFuZ2VUZW1wbGF0ZXMub3BlbmVkUmFuZ2Uuc2hvcnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzdGFydERhdGUgLSBzdGFydCBkYXRlXG4gICAgICogQHBhcmFtIGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgICAqIEByZXR1cm5zIHJhbmdlIGRhdGUgaW4gc2hvcnQgZm9ybWF0IHdpdGggdGltZVxuICAgICAqL1xuICAgIHJhbmdlU2hvcnREYXRlVGltZShzdGFydERhdGU6IEQgfCBudWxsLCBlbmREYXRlPzogRCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHJhbmdlVGVtcGxhdGVzID0gdGhpcy5jb25maWcucmFuZ2VUZW1wbGF0ZXM7XG5cbiAgICAgICAgaWYgKHN0YXJ0RGF0ZSAmJiBlbmREYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgcmFuZ2VUZW1wbGF0ZXMuY2xvc2VkUmFuZ2Uuc2hvcnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3BlbmVkUmFuZ2VEYXRlVGltZShzdGFydERhdGUsIGVuZERhdGUgfHwgbnVsbCwgcmFuZ2VUZW1wbGF0ZXMub3BlbmVkUmFuZ2Uuc2hvcnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzdGFydERhdGUgLSBzdGFydCBkYXRlXG4gICAgICogQHBhcmFtIGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgICAqIEByZXR1cm5zIHJhbmdlIGRhdGUgaW4gbG9uZyBmb3JtYXRcbiAgICAgKi9cbiAgICByYW5nZUxvbmdEYXRlKHN0YXJ0RGF0ZTogRCB8IG51bGwsIGVuZERhdGU/OiBEKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcmFuZ2VUZW1wbGF0ZXMgPSB0aGlzLmNvbmZpZy5yYW5nZVRlbXBsYXRlcztcblxuICAgICAgICBpZiAoc3RhcnREYXRlICYmIGVuZERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhbmdlRGF0ZShzdGFydERhdGUsIGVuZERhdGUsIHJhbmdlVGVtcGxhdGVzLmNsb3NlZFJhbmdlLmxvbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3BlbmVkUmFuZ2VEYXRlKHN0YXJ0RGF0ZSwgZW5kRGF0ZSB8fCBudWxsLCByYW5nZVRlbXBsYXRlcy5vcGVuZWRSYW5nZS5sb25nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhcnREYXRlIC0gc3RhcnQgZGF0ZVxuICAgICAqIEBwYXJhbSBlbmREYXRlIC0gZW5kIGRhdGVcbiAgICAgKiBAcmV0dXJucyByYW5nZSBkYXRlIGluIGxvbmcgZm9ybWF0IHdpdGggdGltZVxuICAgICAqL1xuICAgIHJhbmdlTG9uZ0RhdGVUaW1lKHN0YXJ0RGF0ZTogRCB8IG51bGwsIGVuZERhdGU/OiBEKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcmFuZ2VUZW1wbGF0ZXMgPSB0aGlzLmNvbmZpZy5yYW5nZVRlbXBsYXRlcztcblxuICAgICAgICBpZiAoc3RhcnREYXRlICYmIGVuZERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlLCBlbmREYXRlLCByYW5nZVRlbXBsYXRlcy5jbG9zZWRSYW5nZS5sb25nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5lZFJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlLCBlbmREYXRlIHx8IG51bGwsIHJhbmdlVGVtcGxhdGVzLm9wZW5lZFJhbmdlLmxvbmcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzdGFydERhdGUgLSBzdGFydCBkYXRlXG4gICAgICogQHBhcmFtIGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgICAqIEByZXR1cm5zIHJhbmdlIG1pZGRsZSBkYXRlIHdpdGggdGltZVxuICAgICAqL1xuICAgIHJhbmdlTWlkZGxlRGF0ZVRpbWUoc3RhcnREYXRlOiBELCBlbmREYXRlOiBEKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmFuZ2VEYXRlVGltZShzdGFydERhdGUsIGVuZERhdGUsIHRoaXMuY29uZmlnLnJhbmdlVGVtcGxhdGVzLmNsb3NlZFJhbmdlLm1pZGRsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb21waWxlVmFyaWFibGVzKGRhdGU6IEQsIHZhcmlhYmxlczogYW55KTogYW55IHtcbiAgICAgICAgY29uc3QgY29tcGlsZWRWYXJpYWJsZXM6IGFueSA9IHt9O1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mb3ItaW5cbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdmFyaWFibGVzKSB7XG4gICAgICAgICAgICBpZiAoIXZhcmlhYmxlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdmFyaWFibGVzW2tleV07XG4gICAgICAgICAgICBjb21waWxlZFZhcmlhYmxlc1trZXldID0gdGhpcy5hZGFwdGVyLmZvcm1hdChkYXRlLCB2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb21waWxlZFZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPSB0aGlzLmhhc1NhbWUoZGF0ZSwgdGhpcy5hZGFwdGVyLnRvZGF5KCksICd5ZWFyJyk7XG5cbiAgICAgICAgcmV0dXJuIGNvbXBpbGVkVmFyaWFibGVzO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFzU2FtZShzdGFydERhdGU6IEQsIGVuZERhdGU6IEQsIHVuaXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuaGFzU2FtZShzdGFydERhdGUsIGVuZERhdGUsIHVuaXQpID8gJ3llcycgOiAnbm8nO1xuICAgIH1cbn1cbiJdfQ==